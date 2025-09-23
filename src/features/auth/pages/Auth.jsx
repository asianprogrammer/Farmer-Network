import Login from '../components/Login';
import '@/assets/styles/auth.css';

function Auth() {
  return (
    <div className="auth-page">
      <h1>Authentication Page</h1>
      <Login />
    </div>
  );
}

export default Auth;