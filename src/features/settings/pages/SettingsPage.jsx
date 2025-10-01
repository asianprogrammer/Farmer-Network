import { useState, useEffect } from "react";
import { fetchMe } from "@/api/authApi";

import "../styles/common.css";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";
import Appearance from "../components/Appearance";
import AccountActions from "../components/AccountActions";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formValues, setFormValues] = useState(null);

  function loagout() {
    localStorage.removeItem("accessToken");
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetchMe();
        const me = res?.data ?? res;

        if (!alive) return;


        setProfile({
          profile: me?.profileImage,
          name: me?.name,
          email: me?.email,
          username: me?.username,
          followers: 0,   // TODO: not in API; keep simple defaults
          following: 0,
          status: true
        });

        setFormValues({
          fullName: me?.name,
          username: me?.username,
          bio: "",        // TODO: not in API
          phone: me?.phone,
          address: me?.address
        });
      } catch (e) {
        console.error("Failed to fetch profile:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <h1>Loading Profile</h1>;

  return (
    <div className="container">
      <ProfileCard
        data={profile}
        onChangePhoto={() => console.log("change profile photo")}
      />

      <div className="grid-2 mt-24">
        <ProfileForm
          values={formValues}
          onChange={(e) =>
            setFormValues((v) => ({ ...v, [e.target.name]: e.target.value }))
          }
          onSubmit={(e) => {
            e.preventDefault();
            console.log("save profile", formValues);
          }}
        />
        <PasswordForm
          onSubmit={(e) => {
            e.preventDefault();
            console.log("change password");
          }}
        />
      </div>

      <div className="grid-2 mt-24">
        <Appearance />
        <AccountActions onSignOut={() => loagout} />
      </div>
    </div>
  );
}