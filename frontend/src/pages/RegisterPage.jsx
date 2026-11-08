import { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from '../components/AuthLayout.jsx';

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
    <AuthLayout>
      <section aria-labelledby="register-title">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-pink-100 to-orange-100 text-2xl text-pink-600" aria-hidden="true">✦</span>
        <p className="section-label mt-6">A fresh start. A new connection.</p>
        <h1 id="register-title" className="mt-3 text-3xl font-bold tracking-tight">Join the <span className="gradient-text">possibilities.</span></h1>
        <p className="mt-3 text-sm text-slate-500">Create your SkillSwap account and find your people.</p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="register-name">Full name</label>
            <input className="form-input" id="register-name" name="fullName" type="text" autoComplete="name" maxLength={100} placeholder="Your name" required />
          </div>
          <div>
            <label className="form-label" htmlFor="register-email">Email address</label>
            <input className="form-input" id="register-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="form-label" htmlFor="register-password">Password</label>
            <input className="form-input" id="register-password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} placeholder="Create a password" aria-describedby="password-help" onChange={() => { setError(''); setMessage(''); }} required />
            <p id="password-help" className="mt-2 text-xs text-slate-500">A little security: use at least 8 characters.</p>
          </div>
          <div>
            <label className="form-label" htmlFor="register-confirm-password">Confirm password</label>
            <input className="form-input" id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} maxLength={128} placeholder="Enter your password again" aria-invalid={error ? true : undefined} aria-describedby={error ? 'register-error' : undefined} onChange={() => { setError(''); setMessage(''); }} required />
          </div>
          {error && <p id="register-error" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700" role="alert">{error}</p>}
          <button className="btn-primary w-full text-sm" type="submit">Create account <span aria-hidden="true">→</span></button>
          {message && <p className="form-notice" role="status">{message}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">Already part of the community? <Link className="auth-link" to="/login">Log in</Link></p>
        <p className="mt-5 border-t border-slate-100 pt-4 text-center text-xs text-slate-500">Registration is not available yet.</p>
      </section>
    </AuthLayout>
  );
}
