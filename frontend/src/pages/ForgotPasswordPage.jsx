import { useState } from 'react';
import { Link } from 'react-router';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Password reset is not available yet. No email has been sent.');
  }

  return (
    <section className="auth-card" aria-labelledby="forgot-password-title">
      <p className="eyebrow">Let us help you get back</p>
      <h1 id="forgot-password-title">Forgot your password?</h1>
      <p>Enter the email address associated with your SkillSwap account.</p>
      <p className="form-note">Password reset is not available yet.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reset-email">Email address</label>
        <input id="reset-email" name="email" type="email" autoComplete="email" required />
        <button className="button" type="submit">Send reset link</button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
      <p className="auth-switch"><Link to="/login">Back to login</Link></p>
    </section>
  );
}
