import React, { useState } from "react";
import "@/assets/styles/Appearance.css";

const Appearance = ({ onThemeChange }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="appearance-card">
      <div className="appearance-info">
        <h3>Theme</h3>
        <p>{theme === "dark" ? "Dark mode is active" : "Light mode is active"}</p>
      </div>
      <button className="appearance-btn" onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Appearance;