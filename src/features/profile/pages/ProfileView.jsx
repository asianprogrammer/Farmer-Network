import React, { useEffect, useState } from "react";
import { fetchMe } from "@/api/authApi";

import Profile from "../components/Profile";

const ProfileView = () => {

  const userData = {
    profile: "https://example.com/avatar.png",
    name: "John Doe",
    gmail: "john@example.com",
    username: "johndoe",
    followers: 120,
    following: 80,
    status: true,
  };

  const handleProfileChange = () => {
    console.log("Profile picture change clicked");
  };

  return (
    <>
      <Profile data={userData} changeProfile={handleProfileChange} />
    </>
  );
};

export default ProfileView;
