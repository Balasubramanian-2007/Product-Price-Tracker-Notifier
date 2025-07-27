// Description: This component displays the key features of the Amazon Price Tracker application.
import React from "react";

const Feature = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-white">🔍 Key Features</h2>
      <ul className="list-group">
        <li className="list-group-item">
          ✅ Track Amazon product prices in real-time
        </li>
        <li className="list-group-item">
          📈 Get notified when the price drops
        </li>
        <li className="list-group-item">🕒 Daily price history monitoring</li>
        <li className="list-group-item">📦 Add unlimited products</li>
        <li className="list-group-item">🌐 Supports all Amazon regions</li>
      </ul>
    </div>
  );
};

export default Feature;
