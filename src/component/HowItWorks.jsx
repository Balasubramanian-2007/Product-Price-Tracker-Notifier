import React from "react";
import { FaLink, FaClock, FaBell } from "react-icons/fa";

const steps = [
  {
    icon: <FaLink size={28} />,
    title: "Paste the Product Link",
    desc: "Copy and paste the URL of any product from Amazon to start tracking.",
  },
  {
    icon: <FaClock size={28} />,
    title: "We Monitor 24/7",
    desc: "Our system automatically checks the price round the clock, no effort needed!",
  },
  {
    icon: <FaBell size={28} />,
    title: "Get Notified Instantly",
    desc: "When the price drops, you'll receive a notification right away.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works-section" style={sectionStyle}>
      <h2 style={headingStyle}>How It Works</h2>
      <div style={gridStyle}>
        {steps.map((step, index) => (
          <div key={index} style={cardStyle}>
            <div style={iconWrapStyle}>{step.icon}</div>
            <h4 style={titleStyle}>{step.title}</h4>
            <p style={descStyle}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Inline styling 
const sectionStyle = {
  padding: "60px 20px",
  color: "#fff",
  textAlign: "center",
};

const headingStyle = {
  fontSize: "2.2rem",
  marginBottom: "40px",
};

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
};

const cardStyle = {
  background: "linear-gradient(135deg, #f26a5a, #3c70d0)",
  padding: "30px 20px",
  width: "280px",
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const iconWrapStyle = {
  background: "#fff",
  color: "#222",
  borderRadius: "50%",
  padding: "10px",
  marginBottom: "15px",
  display: "inline-block",
};

const titleStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "10px",
};

const descStyle = {
  fontSize: "0.95rem",
  opacity: 0.9,
};

export default HowItWorks;
