# SkillSwap

SkillSwap is a React and Express application for registered students to exchange skills. MongoDB Atlas stores accounts, profiles, connections, messages, sessions, reviews and notifications. There is no demo mode or student switcher.

## Run locally

Use Node.js 22.12 or newer. Install dependencies in frontend and backend with npm install. Configure backend/.env using backend/.env.example:

- MONGODB_URI: your Atlas connection string.
- MONGODB_DB: your database name (defaults to skillswap).
- JWT_SECRET: a random secret of at least 32 characters. Generate with node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))".
- APP_URL: the browser origin, normally http://127.0.0.1:5173. Keep the host and port consistent with the browser.
- SMTP settings: optional, required to send password recovery emails.

Allow your IP in Atlas Network Access. Keep .env private. From separate terminals at the project root run:

~~~powershell
npm --prefix backend run dev
npm --prefix frontend run dev
~~~

Open http://127.0.0.1:5173. Restart the backend after changing .env. Vite proxies /api to port 4000.

## Student journey

1. Register, then log in using your credentials.
2. Your personal dashboard opens at /app/dashboard.
3. Complete My Profile and add teaching and learning interests in My Skills.
4. Discover Students lists actual discoverable registered accounts, excluding yourself. Empty results are expected until other students register.
5. My Matches shows students with complementary skills. Send a connection request.
6. The recipient accepts or declines from Connection Requests.
7. Accepted connections can exchange messages and schedule sessions.
8. After a session's scheduled end, either participant can mark it completed and leave one review.
9. Logout revokes the current login. Opening /app without authentication redirects to Login.

## Authentication and privacy

JWTs are signed with HS256 and checked for issuer, audience and expiry, following the [jsonwebtoken documentation](https://github.com/auth0/node-jsonwebtoken). They are stored in HttpOnly, SameSite cookies, with Secure enabled in production. MongoDB keeps a hashed token record for logout and password-change revocation. Passwords use salted scrypt hashes. Private resources are scoped to the authenticated account or session participants; client-supplied account IDs cannot change the acting user. Mutations reject cross-site requests. Production requires HTTPS and a same-origin /api reverse proxy.

## Matching

Students match when each teaches at least one skill the other wants. Names ignore case and surrounding whitespace; duplicate skills count once. The score is 50 times the sum of each student's wishlist coverage by the other. Empty wishlists contribute zero; one-way overlap does not qualify as a mutual exchange. The shared rule is in shared/matching.js.

## Optional development data

Run `npm --prefix backend run db:seed` to add eight labeled dummy students and example exchanges to the configured development database. Use the normal login with `alex.test@example.test` / `SkillSwapTest123!` to view a populated account. Your own account can discover the test students but retains its own private data. Run `npm --prefix backend run db:unseed` to remove the dummy accounts and their related records. Details are in [the database guide](backend/DATABASE.md).

## Checks

~~~powershell
npm --prefix backend test
npm --prefix frontend test
npm --prefix frontend run build
~~~

To include real Atlas tests:

~~~powershell
$env:AUTH_TEST_MONGODB='1'
npm --prefix backend test
Remove-Item Env:AUTH_TEST_MONGODB
~~~

Atlas tests create randomly named temporary accounts and clean up their records. The frontend test uses fixture responses only inside the test; application data always comes from the authenticated API.

See [API](docs/api/README.md), [architecture](docs/architecture/project-structure.md), and [verification](docs/verification.md). Deployment has not been performed.
