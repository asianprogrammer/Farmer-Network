import React from "react";
import "@/assets/styles/SaveButton.css";

const SaveButton = ({ text = "Save", danger = false, onClick, type = "submit" }) => {
  return (
    <button
      className={`savebutton ${danger ? "danger" : ""}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SaveButton;