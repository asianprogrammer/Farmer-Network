import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    // Generic validation: both fields required + password length
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

    setIsSubmitting(true); // disable button
    const payload = {
      username: formData.username,
      password: formData.password,
      submitted: true,
    };

    console.log("Processing login...", payload);

    // Simulate server processing delay (e.g., 2 seconds)
    await new Promise((res) => setTimeout(res, 2000));

    // Return JSON
    setStatus(payload);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="login">
      <div className="title">লগইন করুন</div>

      <div>
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

      <div>
        <div className="wrapper">
          <input
            type="password"
            value={formData.password}
            placeholder="পাসওয়ার্ড"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isSubmitting}
          />
          <button type="button" className="showHide">
            Show
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="error">
          {error}
        </div>
      )}

      <button type="submit" className="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div class="spinner"></div> লগইন হচ্ছে...
          </>
        ) : (
          "লগইন করুন"
        )}
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
