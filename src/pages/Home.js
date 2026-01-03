import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px", textAlign: "center" }}>
        <h1>Welcome to Dhol Tasha Pathak 🎶</h1>
        <p>Join us and be part of the rhythm!</p>

        <img
          src="/dhol-banner.jpg"
          alt="Dhol Tasha"
          style={{ width: "60%", marginTop: "20px" }}
        />
      </div>
    </>
  );
};

export default Home;
