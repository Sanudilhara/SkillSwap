import { useState } from 'react';
import { Link } from 'react-router';
import { authRequest } from '../utils/auth.js';

export default function PasswordForm({ reset = false, token = '' }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setError('');
    setMessage('');
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      const result = await authRequest(
        reset ? 'reset-password' : 'change-password',
        { ...values, token },
      );
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      className={reset ? 'mt-7 space-y-5' : 'panel max-w-xl space-y-5'}
      onSubmit={submit}
    >
      {!reset && (
        <div>
          <label className="form-label" htmlFor="current-password">
            Current password
          </label>
          <input
            className="form-input"
            id="current-password"
            type="password"
            name="currentPassword"
            autoComplete="current-password"
            required
            maxLength={128}
          />
        </div>
      )}
      <div>
        <label className="form-label" htmlFor="new-password">
          New password
        </label>
        <input
          className="form-input"
          id="new-password"
          type="password"
          name="password"
          minLength={8}
          maxLength={128}
          autoComplete="new-password"
          required
        />
        <p className="mt-2 text-xs text-slate-400">
          Use at least 8 characters.
        </p>
      </div>
      <div>
        <label className="form-label" htmlFor="confirm-new-password">
          Confirm new password
        </label>
        <input
          className="form-input"
          id="confirm-new-password"
          type="password"
          name="confirmPassword"
          minLength={8}
          maxLength={128}
          autoComplete="new-password"
          required
        />
      </div>
      {error && (
        <p
          className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
          role="alert"
        >
          {error}
        </p>
      )}
      {message && (
        <p className="form-notice" role="status">
          {message}{' '}
          {reset && (
            <Link className="auth-link" to="/login">
              Log in →
            </Link>
          )}
        </p>
      )}
      <button
        className="btn-primary text-sm"
        disabled={busy || (reset && (!token || Boolean(message)))}
      >
        {busy
          ? 'Updating password…'
          : reset
            ? 'Reset password'
            : 'Update password'}
      </button>
    </form>
  );
}
