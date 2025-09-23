import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    submitted: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  function validate() {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // mark as submitted
    const payload = {
      username: formData.username,
      password: formData.password,
      submitted: true,
    };

    setStatus(payload); // return the typed JSON
    console.log('Form data JSON:', payload);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className='login'>
        <div className='title'>লগইন করুন</div>
      <div>
          <input
            type="text"
            value={formData.username}
            placeholder='ইউজারনেম বা ই-মেইল'
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />
      </div>

      <div>
          <div className="wrapper">
            <input
                type="password"
                value={formData.password}
                placeholder='পাসওয়ার্ড'
                onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        {errors.password && <div role="alert">{errors.password}</div>}
        {errors.username && <div role="alert">{errors.username}</div>}
      </div>

      <button type="submit">Submit</button>

      {status && (
        <div>
          <h4>Returned JSON:</h4>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}