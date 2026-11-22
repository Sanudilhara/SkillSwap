# MongoDB Atlas

The server connects and pings Atlas before accepting requests. Startup creates required indexes; it never seeds sample students. Set MONGODB_URI, MONGODB_DB and JWT_SECRET in backend/.env. Configure APP_URL to the frontend origin. Keep .env out of Git.

Collections: accounts, sessions (hashed JWT records with expiry), passwordResets, connections, messages, exchangeSessions, reviews and notifications. Account emails are unique. Expiry indexes clean up login and password reset records. Existing registered accounts remain usable; earlier opaque login cookies require logging in again.

The authenticated account determines profile and skill ownership. Private data is filtered by account ID or participant membership. Public student profiles exclude email and password fields. Undiscoverable profiles do not appear in search; related students can retain access through their connections.

Run npm --prefix backend run db:check from the root to verify connectivity without writing data. Set AUTH_TEST_MONGODB=1 before backend tests to verify registration, login, persistence, skill matching, connections, messaging, sessions, reviews and isolation against Atlas. Tests clean up only their own temporary accounts and related records.

## Optional dummy data

From the backend folder, run `npm run db:seed` to insert eight clearly labeled test students into the configured development database, together with complementary skills, connections, requests, sessions, messages, reviews and notifications. This is a manual development command; server startup never seeds data and the command refuses production mode.

Log in normally with `alex.test@example.test` and password `SkillSwapTest123!` to see a populated dashboard. Other test emails are maya, noah, aisha, leo, sofia, ethan and emma followed by `.test@example.test`; all initially use the same test password. These credentials are for dummy accounts only.

The script uses the existing password hashing and matching functions. It preserves existing accounts and does not reset records on repeated runs. All seed records have the marker `seedTag: skillswap-dummy-v1`. Test students also include `(Test)` in their names and a dummy-data description in their biographies.

Run `npm run db:unseed` to remove only the dummy accounts and records linked to them, including later exchanges involving those accounts. Other accounts and their unrelated private data remain intact. Seeded private sessions and messages are visible only to their participants; your own account sees dummy students in Discover Students but does not inherit their private records.
