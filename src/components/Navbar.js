import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h3>Dhol Tasha Pathak</h3>

      {!user ? (
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <span
            style={styles.profile}
            onClick={() => setShowMenu(!showMenu)}
          >
            👤 {user.email}
          </span>

          {showMenu && (
            <div style={styles.menu}>
              <p onClick={() => navigate("/dashboard")}>Profile</p>
              <p>Settings</p>
              <hr />
              <p style={{ color: "red" }} onClick={logout}>
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#111",
    color: "#fff",
  },
  profile: {
    cursor: "pointer",
  },
  menu: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "5px",
    width: "150px",
  },
};

export default Navbar;
