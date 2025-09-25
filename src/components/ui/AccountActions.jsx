import React from "react";
import "@/assets/styles/AccountActions.css";

const AccountActions = ({ onSignOut }) => {
  return (
    <div className="accountactions-card">
      <button className="signout-btn" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default AccountActions;