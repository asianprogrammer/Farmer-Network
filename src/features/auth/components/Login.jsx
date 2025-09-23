import { useState } from "react";
import EyeIcon from '@/assets/IconComponents/Eye';
import EyeOffIcon from '@/assets/IconComponents/EyeOff';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validate() {
    if (!formData.username.trim() || !formData.password.trim()) return false;
    if (formData.password.length < 8) return false;
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    if (!validate()) {
      setError("Invalid username/email or password");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      username: formData.username,
      password: formData.password,
      submitted: true,
    };

    console.log("Processing login...", payload);

    await new Promise((res) => setTimeout(res, 2000));

    setStatus(payload);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="login">
      <div className="title">লগইন করুন</div>

      <div className="gap">
        <input
          type="text"
          value={formData.username}
          placeholder="ইউজারনেম বা ই-মেইল"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          disabled={isSubmitting}
        />
      </div>

      <div className="gap">
        <div className="wrapper">
          <input
            type={showPassword ? "text" : "password"} // Toggle type
            value={formData.password}
            placeholder="পাসওয়ার্ড"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isSubmitting}
          />
          <button
            type="button"
            className="showHide"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeIcon width={20} /> : <EyeOffIcon width={20} />}
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="error">
          {error}
        </div>
      )}

      <button type="submit" className="submit" disabled={isSubmitting}>
        {isSubmitting ? (<> <div className="spinner"></div> লগইন হচ্ছে... </>) : ("লগইন করুন")}
      </button>

      {status && (
        <div>
          <h4>Returned JSON:</h4>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}