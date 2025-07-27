import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [notifyMsg, setNotifyMsg] = useState("");

  if (!state) {
    return (
      <div className="product-details">
        <h2>No Product Data</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const { title, price, image, category, description, status } = state;

  const handleNotify = async () => {
    if (!email.trim()) {
      setNotifyMsg("Please enter your email.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/notify", {
        email,
        title,
        price,
      });
      setNotifyMsg(res.data?.message || "You will be notified!");
    } catch (err) {
      setNotifyMsg("Failed to set notification. Try again.");
    }
  };

  return (
    <div className="product-details">
      <h2>{title || "No Title Found"}</h2>
      {image && <img src={image} alt={title} />}
      <p>
        <strong>Price:</strong> {price || "N/A"}
      </p>
      <p>
        <strong>Category:</strong> {category || "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {description || "N/A"}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {status === false ? "Available" : "Out of Stock"}
      </p>
      
      <div className="notify-section">
        <input
          type="email"
          placeholder="Enter your email for alerts"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="notify-input"
        />
        <button className="notify-btn" onClick={handleNotify}>
          Notify Me
        </button>
      </div>
      {notifyMsg && <div className="notify-msg">{notifyMsg}</div>}
    </div>
  );
}

export default ProductDetails;
// Note: Ensure that the server endpoint for notifications is correctly set up to handle the email and product details.