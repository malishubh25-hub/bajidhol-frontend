import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<UserRegistration />} />
    </Routes>
  );
}

export default App;
