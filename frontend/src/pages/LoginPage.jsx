import { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from '../components/AuthLayout.jsx';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Login is not available yet. Please try again later.');
  }

  return (
    <AuthLayout>
      <section aria-labelledby="login-title">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 to-pink-100 text-2xl text-violet-600" aria-hidden="true">↗</span>
        <p className="section-label mt-6">Good to see you again</p>
        <h1 id="login-title" className="mt-3 text-3xl font-bold tracking-tight">Welcome back<span className="text-violet-500">.</span></h1>
        <p className="mt-3 text-sm text-slate-500">Your next little breakthrough is waiting.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="login-email">Email address</label>
            <input className="form-input" id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="form-label" htmlFor="login-password">Password</label>
            <div className="relative">
              <input className="form-input pr-16" id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" required />
              <button className="absolute inset-y-0 right-3 text-xs font-semibold text-violet-600" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>
          <div className="text-right"><Link className="auth-link text-xs" to="/forgot-password">Forgot password?</Link></div>
          <button className="btn-primary w-full text-sm" type="submit">Log in <span aria-hidden="true">→</span></button>
          {message && <p className="form-notice" role="status">{message}</p>}
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">New around here? <Link className="auth-link" to="/register">Create an account</Link></p>
        <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-500">Account access is not available yet.</p>
      </section>
    </AuthLayout>
  );
}
