import { useState } from "react";
import EyeIcon from '@/assets/IconComponents/Eye';
import EyeOffIcon from '@/assets/IconComponents/EyeOff';
import { NavLink } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    mobile: "",
    division: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const divisions = [
    "ঢাকা",
    "চট্টগ্রাম",
    "সিলেট",
    "রাজশাহী",
    "খুলনা",
    "বরিশাল",
    "রংপুর",
    "ময়মনসিংহ",
  ];

  function validate() {
    if (Object.values(formData).some(value => !value.trim())) {
      setError("সবগুলো ফিল্ড পূরণ করা আবশ্যক।");
      return false;
    }
    if (formData.password.length < 8) {
      setError("পাসওয়ার্ড সর্বনিম্ন ৮ অক্ষরের হতে হবে।");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return false;
    }
    return true;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...formData,
      submitted: true,
    };

    console.log("Processing registration...", payload);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 2000));

    setStatus(payload);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="signup">
      <div className="title">নিবন্ধন করুন</div>

      <section className="signup-group">
        <section className="left">
          <div className="gap">
            <label htmlFor="fullName">নাম</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              placeholder="আপনার নাম লিখুন"
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="gap">
            <label htmlFor="username">ইউজারনেম</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              placeholder="username123"
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="gap">
            <label htmlFor="mobile">মোবাইল নম্বর</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              value={formData.mobile}
              placeholder="+8801XXXXXXXXX"
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="gap">
            <label htmlFor="division">বিভাগ</label>
            <select
              id="division"
              name="division"
              value={formData.division}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="right">
          <div className="gap">
            <label htmlFor="address">বর্তমান ঠিকানা</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              placeholder="বর্তমান ঠিকানা লিখুন"
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="gap">
            <label htmlFor="email">ই-মেইল</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="example@gmail.com"
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="gap">
            <div className="wrapper">
              <label htmlFor="password">পাসওয়ার্ড</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                placeholder="............"
                onChange={handleChange}
                disabled={isSubmitting}
                required
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

          <div className="gap">
            <div className="wrapper">
              <label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                onChange={handleChange}
                onPaste={(e) => {
                  e.preventDefault();
                  alert("পাসওয়ার্ড নিশ্চিত করার জন্য পেস্ট করা যাবে না। অনুগ্রহ করে হাতে লিখুন।");
                }}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
        </section>
      </section>

      {error && (
        <div role="alert" className="error">
          {error}
        </div>
      )}

      <button type="submit" className="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="spinner"></div> নিবন্ধন হচ্ছে...
          </>
        ) : (
          "নিবন্ধন করুন"
        )}
      </button>

      <section className="text-center">
        আপনি কি আগে নিবন্ধন করেছেন?&nbsp;
        <NavLink to="/auth/login" className="nav-link">
          লগইন করুন
        </NavLink>
      </section>

      {status && (
        <div>
          <h4>Returned JSON:</h4>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}