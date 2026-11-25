import { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from '../components/AuthLayout.jsx';
import { authRequest } from '../utils/auth.js';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    const email = event.currentTarget.elements.email.value;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await authRequest('forgot-password', { email });
      setMessage(result.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <section aria-labelledby="forgot-password-title">
        <span
          className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-100 to-pink-100 text-2xl text-orange-600"
          aria-hidden="true"
        >
          ↻
        </span>
        <p className="section-label mt-6">A little help getting back</p>
        <h1
          id="forgot-password-title"
          className="mt-3 text-3xl leading-tight font-bold tracking-tight"
        >
          Forgot your
          <br />
          <span className="gradient-text">password?</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          It happens to the best of us. Enter your account's email address to
          request a fresh start.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="reset-email">
              Email address
            </label>
            <input
              className="form-input"
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            className="btn-primary w-full text-sm"
            type="submit"
            disabled={busy}
          >
            {busy ? 'Sending…' : 'Send reset link'}
          </button>
          {error && (
            <p className="form-notice" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="form-notice" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="mt-7 text-center text-sm">
          <Link className="auth-link" to="/login">
            <span aria-hidden="true">← </span>Back to login
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
}
