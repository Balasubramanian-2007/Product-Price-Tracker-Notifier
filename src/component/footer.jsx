import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <span>© {new Date().getFullYear()} PriceTracker</span>
        <span className="footer-tagline">
          Track prices. Save money. Shop smart.
        </span>
      </div>
      <div>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </a>
        <span className="footer-separator">|</span>
        <a href="mailto:support@pricetracker.com" className="footer-link">
          Contact Support
        </a>
      </div>
    </footer>
  );
}

export default Footer;
