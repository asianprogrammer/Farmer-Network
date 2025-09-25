import "../styles/common.css";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";
import Appearance from "../components/Appearance";
import AccountActions from "../components/AccountActions";
import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=1758799099862",
    name: "error",
    mail: "pawakin995@bitfami.com",
    username: "error",
    followers: 0,
    following: 3,
    status: true
  });

  const [formValues, setFormValues] = useState({
    fullName: "error",
    username: "error",
    bio: "",
    phone: "01569859875",
    address: "error"
  });

  const [mode, setMode] = useState("Dark");

  return (
    <div className="container">
      <ProfileCard
        data={profile}
        onChangePhoto={() => console.log("change profile photo")}
      />

      <div className="grid-2 mt-24">
        <ProfileForm
          values={formValues}
          onChange={(e)=>setFormValues(v=>({ ...v, [e.target.name]: e.target.value }))}
          onSubmit={(e)=>{ e.preventDefault(); console.log("save profile", formValues); }}
        />
        <PasswordForm
          onSubmit={(e)=>{ e.preventDefault(); console.log("change password"); }}
        />
      </div>

      <div className="grid-2 mt-24">
        <Appearance
          mode={mode}
          onToggle={()=>setMode(m=>m === "Dark" ? "Light" : "Dark")}
        />
        <AccountActions onSignOut={()=>console.log("sign out")} />
      </div>
    </div>
  );
}