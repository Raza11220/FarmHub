import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Grid2x2, List, Heart, ArrowLeftRight, X } from "lucide-react";
import LivestockCard from "../components/LivestockCard";
import { livestock } from "../data/livestock";
import Navbar from "../components/Navbar";
import "./Livestock.css";

const pageSize = 8;

function parseAgeMonths(ageText) {
  if (!ageText) return 0;

  const match = ageText.match(/(\d+(?:\.\d+)?)\s*(yrs?|yr|months?|mo)/i);

  if (!match) return 0;

  const value = Number(match[1]);
  const unit = match[2].toLowerCase();

  if (unit.startsWith("yr")) return value * 12;
  return value;
}

function parseWeightKg(weightText) {
  if (!weightText) return 0;

  const match = weightText.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function Livestock() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [priceLimit, setPriceLimit] = useState(Math.max(...livestock.map((item) => item.price)));
  const [ageLimit, setAgeLimit] = useState(Math.max(...livestock.map((item) => parseAgeMonths(item.age))));
  const [weightLimit, setWeightLimit] = useState(Math.max(...livestock.map((item) => parseWeightKg(item.weight))));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [compareIds, setCompareIds] = useState([]);

  const categories = ["All", "Bull", "Chicken", "Cow", "Goat", "Sheep"];
  const breeds = ["All", ...new Set(livestock.map((item) => item.breed))];
  const genders = ["All", ...new Set(livestock.map((item) => item.gender))];
  const availabilityOptions = ["All", "Available", "Sold"];

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, [selectedCategory, selectedBreed, selectedGender, selectedAvailability, searchTerm, sortBy, priceLimit, ageLimit, weightLimit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBreed, selectedGender, selectedAvailability, searchTerm, sortBy, priceLimit, ageLimit, weightLimit]);

  const filteredLivestock = useMemo(() => {
    let result = livestock.filter((animal) => {
      const matchesCategory = selectedCategory === "All" || animal.category === selectedCategory;
      const matchesBreed = selectedBreed === "All" || animal.breed === selectedBreed;
      const matchesGender = selectedGender === "All" || animal.gender === selectedGender;
      const matchesAvailability = selectedAvailability === "All" || animal.status === selectedAvailability;
      const matchesPrice = animal.price <= priceLimit;
      const matchesAge = parseAgeMonths(animal.age) <= ageLimit;
      const matchesWeight = parseWeightKg(animal.weight) <= weightLimit;

      const searchText = searchTerm.toLowerCase();
      const matchesSearch =
        animal.name.toLowerCase().includes(searchText) ||
        animal.breed.toLowerCase().includes(searchText) ||
        animal.category.toLowerCase().includes(searchText) ||
        animal.id.toLowerCase().includes(searchText);

      return (
        matchesCategory &&
        matchesBreed &&
        matchesGender &&
        matchesAvailability &&
        matchesPrice &&
        matchesAge &&
        matchesWeight &&
        matchesSearch
      );
    });

    if (sortBy === "low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "age") result.sort((a, b) => parseAgeMonths(b.age) - parseAgeMonths(a.age));
    if (sortBy === "weight") result.sort((a, b) => parseWeightKg(b.weight) - parseWeightKg(a.weight));

    return result;
  }, [selectedCategory, selectedBreed, selectedGender, selectedAvailability, searchTerm, sortBy, priceLimit, ageLimit, weightLimit]);

  const totalPages = Math.max(1, Math.ceil(filteredLivestock.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedLivestock = filteredLivestock.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleFavorite = (animalId) => {
    setFavoriteIds((prev) =>
      prev.includes(animalId) ? prev.filter((id) => id !== animalId) : [...prev, animalId]
    );
  };

  const toggleCompare = (animalId) => {
    setCompareIds((prev) => {
      if (prev.includes(animalId)) {
        return prev.filter((id) => id !== animalId);
      }

      if (prev.length >= 3) {
        return [...prev.slice(1), animalId];
      }

      return [...prev, animalId];
    });
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBreed("All");
    setSelectedGender("All");
    setSelectedAvailability("All");
    setSearchTerm("");
    setSortBy("default");
    setPriceLimit(Math.max(...livestock.map((item) => item.price)));
    setAgeLimit(Math.max(...livestock.map((item) => parseAgeMonths(item.age))));
    setWeightLimit(Math.max(...livestock.map((item) => parseWeightKg(item.weight))));
  };

  return (
    <>
      <Navbar />

      <main className="livestock-page">
        <section className="livestock-page-header">
          <div>
            <span className="section-label">FARMHUB MARKETPLACE</span>
            <h1>
              Explore Our
              <br />
              <span>Livestock.</span>
            </h1>
            <p>Find healthy and carefully selected animals from trusted farms.</p>
          </div>

          <div className="livestock-count">
            <strong>{filteredLivestock.length}</strong>
            <span>Animals Found</span>
          </div>
        </section>

        <div className="livestock-shell">
          <aside className="filter-panel">
            <div className="filter-panel-header">
              <SlidersHorizontal size={18} />
              <h3>Filters</h3>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <div className="chip-row">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={selectedCategory === category ? "category-btn active" : "category-btn"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="breedFilter">Breed</label>
              <select id="breedFilter" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="genderFilter">Gender</label>
              <select id="genderFilter" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="availabilityFilter">Availability</label>
              <select id="availabilityFilter" value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)}>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="priceRange">Max Price: PKR {Number(priceLimit).toLocaleString()}</label>
              <input
                id="priceRange"
                type="range"
                min={0}
                max={Math.max(...livestock.map((item) => item.price))}
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="ageRange">Max Age: {ageLimit} months</label>
              <input
                id="ageRange"
                type="range"
                min={0}
                max={Math.max(...livestock.map((item) => parseAgeMonths(item.age)))}
                value={ageLimit}
                onChange={(e) => setAgeLimit(Number(e.target.value))}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="weightRange">Max Weight: {weightLimit} kg</label>
              <input
                id="weightRange"
                type="range"
                min={0}
                max={Math.max(...livestock.map((item) => parseWeightKg(item.weight)))}
                value={weightLimit}
                onChange={(e) => setWeightLimit(Number(e.target.value))}
              />
            </div>

            <button type="button" className="clear-filter-btn" onClick={clearFilters}>
              <X size={16} />
              Clear Filters
            </button>
          </aside>

          <section className="results-panel">
            <div className="livestock-toolbar">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by name, breed or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="toolbar-actions">
                <div className="sort-box">
                  <SlidersHorizontal size={18} />
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Sort by</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                    <option value="age">Age: Highest First</option>
                    <option value="weight">Weight: Highest First</option>
                  </select>
                </div>

                <div className="view-toggle">
                  <button type="button" className={viewMode === "grid" ? "view-btn active" : "view-btn"} onClick={() => setViewMode("grid")}>
                    <Grid2x2 size={16} />
                  </button>
                  <button type="button" className={viewMode === "list" ? "view-btn active" : "view-btn"} onClick={() => setViewMode("list")}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {compareIds.length > 0 && (
              <div className="compare-bar">
                <div className="compare-label">
                  <ArrowLeftRight size={15} />
                  Compare ({compareIds.length}/3)
                </div>
                <div className="compare-items">
                  {compareIds.map((id) => {
                    const matchedAnimal = livestock.find((item) => item.id === id);
                    return matchedAnimal ? <span key={id}>{matchedAnimal.name}</span> : null;
                  })}
                </div>
              </div>
            )}

            {isLoading ? (
              <div className={viewMode === "grid" ? "livestock-grid" : "livestock-list"}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="skeleton-card">
                    <div className="skeleton-image" />
                    <div className="skeleton-line short" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line medium" />
                  </div>
                ))}
              </div>
            ) : filteredLivestock.length > 0 ? (
              <>
                <div className={viewMode === "grid" ? "livestock-grid" : "livestock-list"}>
                  {paginatedLivestock.map((animal) => (
                    <LivestockCard
                      key={animal.id}
                      animal={animal}
                      isFavorite={favoriteIds.includes(animal.id)}
                      isCompared={compareIds.includes(animal.id)}
                      onToggleFavorite={() => toggleFavorite(animal.id)}
                      onToggleCompare={() => toggleCompare(animal.id)}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button type="button" disabled={safePage === 1} onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}>
                      Previous
                    </button>
                    <span>
                      Page {safePage} of {totalPages}
                    </span>
                    <button type="button" disabled={safePage === totalPages} onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}>
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-livestock">
                <div>🔎</div>
                <h2>No animals found</h2>
                <p>Try another search term or filter combination.</p>
                <button type="button" onClick={clearFilters}>Clear Filters</button>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default Livestock;