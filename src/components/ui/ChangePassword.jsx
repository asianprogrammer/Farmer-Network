import React, { useState } from "react";
import "@/assets/styles/ChangePassword.css";
import SaveButton from "./SaveButton";

const ChangePassword = ({ onChangePassword }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangePassword(form);
  };

  return (
    <form className="changepassword-form" onSubmit={handleSubmit}>
      <label>
        Current Password
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
        />
      </label>
      <label>
        New Password
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <SaveButton text="Change Password" danger />
    </form>
  );
};

export default ChangePassword;