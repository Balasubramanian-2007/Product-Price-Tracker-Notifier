import React, { useEffect, useState } from "react";

function TrandingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="trending-products">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} className="product-img" />
          <h3 className="product-name">{product.name}</h3>
          <div className="product-prices">
            <span className="product-price">₹{product.price}</span>
            <span className="product-old-price">₹{product.oldPrice}</span>
          </div>
          <div className="product-rating">
            <span>⭐ {product.rating}</span>
            <span className="product-reviews">({product.reviews} reviews)</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrandingProducts;
