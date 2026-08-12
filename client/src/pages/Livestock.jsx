import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import LivestockCard from "../components/LivestockCard";
import { livestock } from "../data/livestock";
import Navbar from "../components/Navbar";
import "./Livestock.css";

function Livestock() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const categories = [
    "All",
    "Bull",
    "Chicken",
    "Cow",
    "Goat",
    "Sheep",
  ];

  const filteredLivestock = useMemo(() => {
    let result = livestock.filter((animal) => {
      const matchesCategory =
        selectedCategory === "All" ||
        animal.category === selectedCategory;

      const searchText = searchTerm.toLowerCase();

      const matchesSearch =
        animal.name.toLowerCase().includes(searchText) ||
        animal.breed.toLowerCase().includes(searchText) ||
        animal.category.toLowerCase().includes(searchText) ||
        animal.id.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <>
      <Navbar />

      <main className="livestock-page">

        {/* Header */}

        <section className="livestock-page-header">

          <div>
            <span className="section-label">
              FARMHUB MARKETPLACE
            </span>

            <h1>
              Explore Our
              <br />
              <span>Livestock.</span>
            </h1>

            <p>
              Find healthy and carefully selected
              animals from trusted farms.
            </p>
          </div>

          <div className="livestock-count">
            <strong>{filteredLivestock.length}</strong>
            <span>Animals Found</span>
          </div>

        </section>


        {/* Search + Sort */}

        <section className="livestock-toolbar">

          <div className="search-box">

            <Search size={20} />

            <input
              type="text"
              placeholder="Search by name, breed or ID..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>


          <div className="sort-box">

            <SlidersHorizontal size={18} />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="default">
                Sort by
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="name">
                Name: A-Z
              </option>

            </select>

          </div>

        </section>


        {/* Categories */}

        <div className="livestock-page-categories">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* Results */}

        {filteredLivestock.length > 0 ? (

          <div className="livestock-grid">

            {filteredLivestock.map((animal) => (

              <LivestockCard
                key={animal.id}
                animal={animal}
              />

            ))}

          </div>

        ) : (

          <div className="empty-livestock">

            <div>
              🔎
            </div>

            <h2>
              No animals found
            </h2>

            <p>
              Try another search term or category.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </button>

          </div>

        )}

      </main>
    </>
  );
}

export default Livestock;