import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";

import LivestockCard from "./components/LivestockCard";
import { livestock } from "./data/livestock";
import AnimalDetails from "./pages/AnimalDetails";
import Livestock from "./pages/Livestock";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./App.css";


// ========================================
// HOME PAGE
// ========================================

function Home() {
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Bull",
    "Chicken",
    "Cow",
    "Goat",
    "Sheep",
  ];

  const filteredLivestock =
    selectedCategory === "All"
      ? livestock
      : livestock.filter(
          (animal) => animal.category === selectedCategory
        );

  return (
    <div className="app">
      <Navbar />

      {/* ================= HERO ================= */}

      <main>

        <section className="hero">

          <div className="hero-content">

            <span className="hero-badge">
              TRUSTED LIVESTOCK MARKET
            </span>


            <h1>
              Quality Livestock.
              <br />

              <span>
                Trusted Farming.
              </span>
            </h1>


            <p>
              Discover healthy, quality livestock
              from trusted farms. Find the right
              animal at a fair price.
            </p>


            <div className="hero-buttons">

              <a
                href="#livestock"
                className="primary-btn"
              >
                Explore Livestock
              </a>


              <Link
                to="/contact"
                className="secondary-btn"
              >
                Contact Us
              </Link>

            </div>


            <div className="hero-stats">

              <div>
                <strong>500+</strong>
                <span>Animals</span>
              </div>


              <div>
                <strong>50+</strong>
                <span>Trusted Farms</span>
              </div>


              <div>
                <strong>100%</strong>
                <span>Quality</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="sun"></div>


            <div className="farm-card">

              <div className="farm-icon">
                🐄
              </div>

              <h3>
                Premium Livestock
              </h3>

              <p>
                Healthy • Verified • Trusted
              </p>

            </div>

          </div>

        </section>


        {/* ================= LIVESTOCK ================= */}

        <section
          className="livestock-section"
          id="livestock"
        >

          <div className="section-heading">

            <div>

              <span>
                OUR LIVESTOCK
              </span>


              <h2>
                Find Your Perfect
                <br />
                Farm Companion
              </h2>

            </div>


            <p>
              Browse our selection of healthy
              and carefully selected livestock
              from trusted farms.
            </p>

          </div>


          {/* CATEGORY FILTERS */}

          <div className="category-filters">

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


          {/* LIVESTOCK CARDS */}

          <div className="livestock-grid">

            {filteredLivestock.map((animal) => (

              <LivestockCard
                key={animal.id}
                animal={animal}
              />

            ))}

          </div>

        </section>


        {/* ================= ABOUT ================= */}

        <section
          id="about"
          className="about-section"
        >

          <div>

            <span className="section-label">
              ABOUT FARMHUB
            </span>

            <h2>
              Connecting people with
              quality livestock.
            </h2>

          </div>


          <p>
            FarmHub is a modern livestock marketplace
            designed to make finding and connecting
            with quality farm animals simple,
            transparent and reliable.
          </p>

        </section>

      </main>

    </div>
  );
}


// ========================================
// MAIN APP / ROUTER
// ========================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* Livestock */}
        <Route
          path="/livestock"
          element={<Livestock />}
        />


        {/* Animal Details */}
        <Route
          path="/livestock/:id"
          element={<AnimalDetails />}
        />


        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;