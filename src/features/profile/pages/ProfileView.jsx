import React from "react";
import "@/assets/styles/ProfileView.css";

import UserDetails from "@/components/ui/UserDetails";
import ProfileInfo from "@/components/ui/ProfileInfo";
import ChangePassword from "@/components/ui/ChangePassword";
import Appearance from "@/components/ui/Appearance";
import AccountActions from "@/components/ui/AccountActions";

const ProfileView = () => {
  const handleSave = (data) => {
    console.log("Profile Saved:", data);
  };

  const handlePasswordChange = (data) => {
    console.log("Password Change:", data);
  };

  const handleThemeChange = (theme) => {
    console.log("Theme Changed:", theme);
  };

  const handleSignOut = () => {
    console.log("Signed Out");
  };

  return (
    <div className="profileview-layout">
      <UserDetails
        name="John Doe"
        email="john@example.com"
        username="johndoe"
        followers={0}
        following={3}
        online={true}
      />
      <ProfileInfo onSave={handleSave} />
      <ChangePassword onChangePassword={handlePasswordChange} />
      <Appearance onThemeChange={handleThemeChange} />
      <AccountActions onSignOut={handleSignOut} />
    </div>
  );
};

export default ProfileView;