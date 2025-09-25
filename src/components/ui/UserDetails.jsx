import React from "react";
import "@/assets/styles/UserDetails.css";
import AvatarIcon from "@/assets/IconComponents/AvatarIcon";

const UserDetails = ({ name, email, username, followers, following, online }) => {
  return (
    <div className="userdetails-card">
      <div className="userdetails-avatar">
        <AvatarIcon />
      </div>
      <div className="userdetails-info">
        <h2 className="userdetails-name">{name}</h2>
        <p className="userdetails-email">{email}</p>
        <p className="userdetails-username">@{username}</p>
        <div className="userdetails-stats">
          <div>
            <div className="count">{followers}</div>
            <div className="label">Followers</div>
          </div>
          <div>
            <div className="count">{following}</div>
            <div className="label">Following</div>
          </div>
          <div>
            <div className={`status ${online ? "online" : "offline"}`}>
              {online ? "●" : "○"}
            </div>
            <div className="label">Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;