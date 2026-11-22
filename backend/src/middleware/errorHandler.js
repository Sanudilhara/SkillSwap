export function apiNotFound(req, res) {
  res.status(404).json({ error: 'API route not found.' });
}

// Keep the four parameters: Express uses them to recognize error middleware.
export function errorHandler(error, req, res, next) {
  res.status(error.status || 500).json({
    error:
      error.publicMessage ||
      (error.status === 400
        ? 'Invalid JSON body.'
        : 'Unable to process request. Please try again.'),
  });
}
