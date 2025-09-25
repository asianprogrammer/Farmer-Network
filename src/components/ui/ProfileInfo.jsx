import React, { useState } from "react";
import "@/assets/styles/ProfileInfo.css";
import SaveButton from "./SaveButton";

const ProfileInfo = ({ onSave }) => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    bio: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="profileinfo-form" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} />
      </label>
      <label>
        Username
        <input name="username" value={form.username} onChange={handleChange} />
      </label>
      <label>
        Bio
        <textarea name="bio" value={form.bio} onChange={handleChange} />
      </label>
      <label>
        Phone
        <input name="phone" value={form.phone} onChange={handleChange} />
      </label>
      <label>
        Address
        <input name="address" value={form.address} onChange={handleChange} />
      </label>
      <SaveButton text="Save Changes" />
    </form>
  );
};

export default ProfileInfo;