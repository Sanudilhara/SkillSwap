import { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from '../components/AuthLayout.jsx';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Password reset is not available yet. No email has been sent.');
  }

  return (
    <AuthLayout>
      <section aria-labelledby="forgot-password-title">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-100 to-pink-100 text-2xl text-orange-600" aria-hidden="true">↻</span>
        <p className="section-label mt-6">A little help getting back</p>
        <h1 id="forgot-password-title" className="mt-3 text-3xl leading-tight font-bold tracking-tight">Forgot your<br /><span className="gradient-text">password?</span></h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">It happens to the best of us. Enter your account's email address to request a fresh start.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="reset-email">Email address</label>
            <input className="form-input" id="reset-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
          <button className="btn-primary w-full text-sm" type="submit">Send reset link <span aria-hidden="true">→</span></button>
          {message && <p className="form-notice" role="status">{message}</p>}
        </form>

        <p className="mt-7 text-center text-sm"><Link className="auth-link" to="/login"><span aria-hidden="true">← </span>Back to login</Link></p>
        <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-500">Password reset is not available yet.</p>
      </section>
    </AuthLayout>
  );
}
