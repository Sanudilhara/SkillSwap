import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { authRequest } from '../utils/auth.js';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    authRequest('me')
      .then(() => {
        if (active) setStatus('authenticated');
      })
      .catch((error) => {
        if (!active) return;
        setError(error.message);
        setStatus(error.status === 401 ? 'guest' : 'error');
      });
    return () => {
      active = false;
    };
  }, [retry]);

  if (status === 'guest') return <Navigate to="/login" replace />;
  if (status === 'error')
    return (
      <div className="panel m-6" role="alert">
        {error}{' '}
        <button className="auth-link" onClick={() => setRetry(retry + 1)}>
          Retry
        </button>
      </div>
    );
  if (status === 'loading')
    return (
      <p className="p-6" role="status">
        Checking your account…
      </p>
    );
  return children;
}
