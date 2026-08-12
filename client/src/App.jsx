import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LivestockCard from "./components/LivestockCard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import ErrorBoundary from "./components/ErrorBoundary";
import { livestock } from "./data/livestock";
import AnimalDetails from "./pages/AnimalDetails";
import Livestock from "./pages/Livestock";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnimals from "./pages/AdminAnimals";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
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

          <div className="about-copy">

            <span className="section-label">
              ABOUT FARMHUB
            </span>

            <h2>
              Bringing trust, quality,
              and value to every livestock decision.
            </h2>

            <p>
              FarmHub is a modern livestock marketplace designed to help
              farmers, businesses, and buyers source healthy animals with
              confidence. We connect people to verified farms, transparent
              pricing, and dependable support from first inquiry to final
              delivery.
            </p>

            <div className="about-points">

              <div className="about-point">
                <span className="point-icon">✓</span>
                <div>
                  <strong>Verified Quality</strong>
                  <small>Carefully selected animals from trusted farm partners.</small>
                </div>
              </div>

              <div className="about-point">
                <span className="point-icon">✓</span>
                <div>
                  <strong>Transparent Process</strong>
                  <small>Clear guidance, honest pricing, and reliable communication.</small>
                </div>
              </div>

              <div className="about-point">
                <span className="point-icon">✓</span>
                <div>
                  <strong>Long-Term Support</strong>
                  <small>Built for better breeding, farming, and business growth.</small>
                </div>
              </div>

            </div>

          </div>

          <div className="about-visual">

            <div className="about-panel main-panel">
              <span className="about-badge">Trusted network</span>
              <h3>Healthy livestock from verified farms</h3>
              <ul>
                <li>On-farm quality checks</li>
                <li>Transparent animal profiles</li>
                <li>Professional buyer support</li>
              </ul>
            </div>

            <div className="about-panel mini-panel">
              <div className="metric-box">
                <strong>500+</strong>
                <span>Animals listed</span>
              </div>
              <div className="metric-box">
                <strong>50+</strong>
                <span>Trusted farms</span>
              </div>
              <div className="metric-box highlight">
                <strong>100%</strong>
                <span>Quality-focused</span>
              </div>
            </div>

          </div>

        </section>

        <FAQSection />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}


// ========================================
// MAIN APP / ROUTER
// ========================================

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/livestock/:id" element={<AnimalDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faq" element={<><Navbar /><main className="page-shell"><FAQSection /></main><Footer /></>} />
          <Route path="/privacy-policy" element={<><Navbar /><main className="page-shell"><PrivacyPolicy /></main><Footer /></>} />
          <Route path="/terms" element={<><Navbar /><main className="page-shell"><Terms /></main><Footer /></>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/animals" element={<ProtectedRoute><AdminAnimals /></ProtectedRoute>} />
          <Route path="/sign-in/*" element={<AuthLayout mode="sign-in" />} />
          <Route path="/sign-up/*" element={<AuthLayout mode="sign-up" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}


export default App;