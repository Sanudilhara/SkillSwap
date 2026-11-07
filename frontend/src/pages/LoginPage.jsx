import { useState } from 'react';
import { Link } from 'react-router';

export default function LoginPage() {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Login is not available yet. Please try again later.');
  }

  return (
    <section className="auth-card" aria-labelledby="login-title">
      <p className="eyebrow">Welcome back</p>
      <h1 id="login-title">Log in to SkillSwap</h1>
      <p>Keep learning. Keep sharing.</p>
      <p className="form-note">Account access is not available yet.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email address</label>
        <input id="login-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" name="password" type="password" autoComplete="current-password" required />
        <Link className="forgot-link" to="/forgot-password">Forgot password?</Link>
        <button className="button" type="submit">Log in</button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
      <p className="auth-switch">New to SkillSwap? <Link to="/register">Create an account</Link></p>
    </section>
  );
}
