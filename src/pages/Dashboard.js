import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <h2>Welcome, {user?.email} 👋</h2>
        <p>You are successfully logged in.</p>
      </div>
    </>
  );
};

export default Dashboard;
