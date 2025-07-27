import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/nav";
import Footer from "./component/footer";
import HeroSection from "./component/HeroSection";
import ProductDetails from "./component/ProductDetails";
import TrandingProducts from "./component/TrandingProducts";
import HowItWorks from "./component/HowItWorks";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

function HomePageContent() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>

      <div className="section-divider"></div>
      <h2 className="section-title">
        <span role="img" aria-label="cart" className="section-title-icon">
          🛒
        </span>
        Discover Your Next Favorite Product
      </h2>
      <p className="section-subtitle">
        Handpicked deals & trending items, just for you!
      </p>
      <TrandingProducts />
      <HowItWorks />
    </main>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/*" element={<HomePageContent />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
