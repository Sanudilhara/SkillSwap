export async function authRequest(path, body) {
  let response;
  try {
    response = await fetch(`/api/auth/${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error(
      'Cannot reach the server. Make sure the backend is running on port 4000.',
    );
  }
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error(
      'Cannot reach the API. Start or restart the backend on port 4000.',
    );
  }
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(
      result.error || 'Something went wrong. Please try again.',
    );
    error.status = response.status;
    throw error;
  }
  return result;
}
