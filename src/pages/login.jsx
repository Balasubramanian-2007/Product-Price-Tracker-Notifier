// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get(
        `http://localhost:5000/users?userId=${formData.userId}&password=${formData.password}`
      );

      if (res.data.length > 0) {
        localStorage.setItem("token", "fake-jwt-token");
        alert("Login successful!");
        navigate("/home");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>LOGIN</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          name="userId"
          placeholder="Enter User ID"
          value={formData.userId}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          LOGIN
        </button>

        <p style={styles.linkText}>
          New user?{" "}
          <Link to="/signup" style={{ color: "yellow" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#17a2b8",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    width: "300px",
    textAlign: "center",
  },
  title: { marginBottom: "1rem", color: "#fff" },
  error: { color: "yellow", marginBottom: "1rem" },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "1rem",
    padding: "0.5rem",
    borderRadius: "20px",
    border: "none",
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
  },
  linkText: { marginTop: "1rem", color: "#fff" },
};

export default Login;
