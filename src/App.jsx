import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/nav";
import Footer from "./component/footer";
import HeroSection from "./component/HeroSection";
import ProductDetails from "./component/ProductDetails";
import TrandingProducts from "./component/TrandingProducts";
import HowItWorks from "./component/HowItWorks";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Register from "./pages/signup";
import Login from "./pages/login";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token"); // Check if token exists
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function HomePageContent() {
  return (
    <main>
      <HeroSection />
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
          {/* Public Routes */}
          <Route path="/" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePageContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-details"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/features"
            element={
              <ProtectedRoute>
                <Features />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
