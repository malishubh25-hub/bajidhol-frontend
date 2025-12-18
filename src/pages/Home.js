import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // You can call your Spring Boot API here for login
    console.log("Login attempted with:", email, password);
  };

  return (
    <div className="home-container">
      <div className="login-box">
        <h2>🎶 Dhol Tasha Pathak 🎶</h2>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="login-links">
          <a href="#">Forgot Password?</a>
          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Create New Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
