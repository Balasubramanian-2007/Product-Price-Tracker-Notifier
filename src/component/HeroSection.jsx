import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function HeroSection() {
  const [productUrl, setProductUrl] = useState("");
  const navigate = useNavigate();

  const handleTrackNow = async () => {
    if (!productUrl.trim()) {
      alert("Please enter a product URL");
      return;
    }

      try {
  const response = await axios.post("http://localhost:3000/home-search", {
    productUrl: productUrl.trim(),
  });
  if (response.data && !response.data.error) {
    navigate("/product-details", { state: response.data });
  } else {
    alert("Failed to fetch product details. Please try again.");
  }
} 
catch (error) {
  alert("Failed to fetch product details. Please try again.");
}
  }

  return (
    <div className="hero-wrapper">
      <section className="hero-section">
        <h1>Track Online Store Prices. Save Big.</h1>
        <p>Get notified when your favorite products drop in price!</p>
        <div>
          <input
            type="text"
            placeholder="Paste an Amazon Product URL"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
          <button onClick={handleTrackNow}>Track Now</button>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
