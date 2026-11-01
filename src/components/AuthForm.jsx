import { ArrowRight, ArrowLeftRight } from 'lucide-react';

export default function AuthForm({
  mode,
  busy,
  error,
  demo,
  onSubmit,
  onChangeMode,
}) {
  const isLogin = mode === 'login';
  let submitLabel = isLogin ? 'Sign in' : 'Create account';
  if (busy === 'auth') submitLabel = 'One moment…';

  return (
    <form onSubmit={onSubmit}>
      <span className="brand-icon">
        <ArrowLeftRight size={23} />
      </span>
      <h2 id="modal-title">
        {mode === 'login' ? 'Good to see you.' : 'Find your kind of curious.'}
      </h2>
      <p className="form-description">
        {mode === 'login'
          ? 'Sign in to keep learning and sharing.'
          : 'Join a community where everyone has something to share.'}
      </p>
      {mode === 'register' && (
        <>
          <label>
            Your name
            <input name="name" autoComplete="name" required maxLength={80} />
          </label>
          <label>
            University
            <input
              name="university"
              autoComplete="organization"
              maxLength={120}
            />
          </label>
        </>
      )}
      <label>
        Email address
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          required
          minLength={8}
          maxLength={128}
        />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="primary full-width" disabled={busy === 'auth'}>
        {submitLabel}
        <ArrowRight size={16} />
      </button>
      <p className="auth-switch">
        {mode === 'login'
          ? 'New to SkillSwap?'
          : 'Already part of the community?'}{' '}
        <button
          type="button"
          className="text-button"
          onClick={() => {
            onChangeMode(mode === 'login' ? 'register' : 'login');
          }}
        >
          {mode === 'login' ? 'Join us' : 'Sign in'}
        </button>
      </p>
      {demo && (
        <p className="demo-note">
          Demo mode · Accounts are temporary until MongoDB is configured.
        </p>
      )}
    </form>
  );
}
