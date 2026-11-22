import { isAllowedOrigin } from '../requestOrigin.js';

// Each application instance keeps its own rate-limit counters, as before.
export function createAuthRequestChecks() {
  const attempts = new Map();
  return (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    if (!req.app.locals.db)
      return res
        .status(503)
        .json({ error: 'Database unavailable. Please try again shortly.' });
    if (req.method === 'POST') {
      if (!isAllowedOrigin(req)) {
        return res
          .status(403)
          .json({ error: 'Please submit this form from SkillSwap.' });
      }
      if (!req.is('application/json'))
        return res.status(415).json({ error: 'Send a JSON request.' });
      if (
        [
          '/register',
          '/login',
          '/forgot-password',
          '/reset-password',
          '/change-password',
        ].includes(req.path)
      ) {
        const now = Date.now();
        for (const [key, entry] of attempts)
          if (entry.until <= now) attempts.delete(key);
        const entry = attempts.get(req.ip) || {
          count: 0,
          until: now + 15 * 60 * 1000,
        };
        attempts.set(req.ip, entry);
        if (++entry.count > 30)
          return res.status(429).json({
            error: 'Too many attempts. Please try again in 15 minutes.',
          });
      }
    }
    next();
  };
}

export function checkPortalRequests(req, res, next) {
  res.set('Cache-Control', 'no-store');
  if (!req.app.locals.db)
    return res.status(503).json({ error: 'Database unavailable.' });
  if (req.method !== 'GET') {
    if (!isAllowedOrigin(req))
      return res
        .status(403)
        .json({ error: 'Use SkillSwap to submit changes.' });
    if (!req.is('application/json'))
      return res.status(415).json({ error: 'Send a JSON request.' });
  }
  next();
}
