import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthLayout from '../components/AuthLayout.jsx';
import { authRequest } from '../utils/auth.js';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setMessage('');
    setBusy(true);
    try {
      await authRequest('login', {
        email: form.elements.email.value,
        password: form.elements.password.value,
      });
      navigate('/app/dashboard', { replace: true });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <section aria-labelledby="login-title">
        <span
          className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 to-pink-100 text-2xl text-violet-600"
          aria-hidden="true"
        >
          ↗
        </span>
        <p className="section-label mt-6">Good to see you again</p>
        <h1 id="login-title" className="mt-3 text-3xl font-bold tracking-tight">
          Welcome back<span className="text-violet-500">.</span>
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Your next little breakthrough is waiting.
        </p>

        {location.state?.registered && (
          <p className="form-notice mt-5" role="status">
            Your account is ready. Log in to open your dashboard.
          </p>
        )}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="login-email">
              Email address
            </label>
            <input
              className="form-input"
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <div className="relative">
              <input
                className="form-input pr-16"
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
              <button
                className="absolute inset-y-0 right-3 text-xs font-semibold text-violet-600"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="text-right">
            <Link className="auth-link text-xs" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
          <button
            className="btn-primary w-full text-sm"
            type="submit"
            disabled={busy}
          >
            {busy ? 'Logging in…' : 'Log in'} <span aria-hidden="true">→</span>
          </button>
          {message && (
            <p className="form-notice" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          New around here?{' '}
          <Link className="auth-link" to="/register">
            Create an account
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
}
