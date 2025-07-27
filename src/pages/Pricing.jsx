// src/pages/Pricing.jsx
import React from "react";

const Pricing = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-white">💸 Pricing Plans</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🆓 Free</h5>
              <p className="card-text">
                Track up to 5 products. Basic alerts included.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">₹0/month</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⭐ Pro</h5>
              <p className="card-text">
                Track unlimited products. Priority alerts. Email support.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">₹199/month</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🏢 Business</h5>
              <p className="card-text">
                Bulk tracking. API Access. 24/7 Support.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">₹499/month</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
