import assert from 'node:assert/strict';
import { test } from 'node:test';
import app from './app.js';

test('GET /api/health returns HTTP 200 and the API status', async () => {
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const response = await fetch(
      `http://127.0.0.1:${server.address().port}/api/health`,
    );

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /application\/json/);
    assert.deepEqual(await response.json(), {
      status: 'ok',
      message: 'SkillSwap API is running',
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
});
