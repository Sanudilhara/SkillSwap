import { useState } from 'react';
import { Link } from 'react-router';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    const form = event.currentTarget;
    if (form.elements.password.value !== form.elements.confirmPassword.value) {
      setError('Passwords do not match. Please enter the same password in both fields.');
      form.elements.confirmPassword.focus();
      return;
    }

    setMessage('Registration is not available yet. No account has been created.');
  }

  return (
    <section className="auth-card" aria-labelledby="register-title">
      <p className="eyebrow">Your next skill starts here</p>
      <h1 id="register-title">Join SkillSwap</h1>
      <p>Meet people who are curious, just like you.</p>
      <p className="form-note">Registration is not available yet.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="register-name">Full name</label>
        <input id="register-name" name="fullName" type="text" autoComplete="name" maxLength={100} required />
        <label htmlFor="register-email">Email address</label>
        <input id="register-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="register-password">Password</label>
        <input id="register-password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} aria-describedby="password-help" required />
        <small id="password-help">Use at least 8 characters.</small>
        <label htmlFor="register-confirm-password">Confirm password</label>
        <input id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} maxLength={128} aria-invalid={error ? true : undefined} aria-describedby={error ? 'register-error' : undefined} onChange={() => setError('')} required />
        {error && <p id="register-error" className="form-error" role="alert">{error}</p>}
        <button className="button" type="submit">Create account</button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
    </section>
  );
}
