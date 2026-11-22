import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isAllowedOrigin } from './requestOrigin.js';

test('development accepts Vite origins through a backend proxy; production uses its configured origin', () => {
  const previousUrl = process.env.APP_URL;
  const previousMode = process.env.NODE_ENV;
  const request = (origin) => ({
    headers: { origin, 'sec-fetch-site': 'same-origin' },
    protocol: 'http',
    get: () => '127.0.0.1:4000',
  });
  try {
    delete process.env.APP_URL;
    process.env.NODE_ENV = 'development';
    assert.equal(isAllowedOrigin(request('http://127.0.0.1:5173')), true);
    assert.equal(isAllowedOrigin(request('http://localhost:5173')), true);
    assert.equal(isAllowedOrigin(request('https://elsewhere.example')), false);
    assert.equal(
      isAllowedOrigin(request('http://localhost:5173.evil.example')),
      false,
    );
    process.env.NODE_ENV = 'production';
    process.env.APP_URL = 'https://skillswap.example/';
    assert.equal(isAllowedOrigin(request('https://skillswap.example')), true);
    assert.equal(isAllowedOrigin(request('http://localhost:5173')), false);
    const crossSite = request('https://skillswap.example');
    crossSite.headers['sec-fetch-site'] = 'cross-site';
    assert.equal(isAllowedOrigin(crossSite), false);
  } finally {
    if (previousUrl === undefined) delete process.env.APP_URL;
    else process.env.APP_URL = previousUrl;
    if (previousMode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousMode;
  }
});
