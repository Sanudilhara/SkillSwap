# SkillSwap

A student skill exchange platform built with React, Express, and MongoDB. Discover students, share teaching and learning skills, find reciprocal matches, and send or respond to connection requests.

## Run locally

Requires Node.js 22.12+.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Open **http://127.0.0.1:5173**. Vite proxies `/api` to Express on port 4000.

Without `MONGODB_URI`, the app starts in a labeled, in-memory demo workspace with six sample students and an automatically created demo profile. Registration, login, profile editing, searching, matching, and requests all use the real REST API. Data resets when the server restarts, and the generated signing secret invalidates previous demo tokens. Seed profiles use external avatar images with initials as a fallback.

## Use MongoDB

Set these values in `.env`:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/skillswap
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_ORIGIN=http://127.0.0.1:5173
PORT=4000
```

Restart the app and create accounts. MongoDB mode stores users and requests durably and does not create sample users or enable demo login. To try the complete request lifecycle, register two accounts, send a request from one, then sign in to the recipient to accept or decline it. Sessions last seven days. Passwords are hashed with bcrypt; API requests use signed bearer tokens.

## Build and test

```powershell
npm test
npm run build
npm start
```

The production server serves the React build and API together at **http://127.0.0.1:4000**. The integration test verifies authentication, profile validation, reciprocal matching, duplicate requests, and recipient-only request responses in demo storage. MongoDB connectivity requires your own running database and is not covered by this test.

## Core behavior

- Search by student name, university, teaching skills, or learning skills; filter by skill category and university.
- A reciprocal match requires at least one skill you want to learn that the student teaches, plus one skill you teach that they want to learn. Skill comparisons ignore case.
- Edit your name, university, field, introduction, HTTPS profile picture URL, and comma-separated teaching and learning skills.
- Send one request per student pair. Recipients can accept or decline pending requests.
- Profiles and connection data require authentication. Passwords and email addresses are excluded from student API responses.

Session scheduling and reviews are reserved for a later release, as described in the project scope. Public deployment still needs HTTPS, environment secrets, an accessible MongoDB service, and operational protections such as authentication rate limiting.

## Frontend code structure

The frontend uses plain React function components, props, `useState`, and `useEffect`.

```text
src/
  main.jsx          Mounts the app and loads CSS
  App.jsx           Account state, API actions, and page navigation
  api.js            Shared fetch helper
  components/       Sidebar, header, student card, modal, and forms
  pages/            Discovery, connections, and your profile
  styles.css        Responsive styles
```

Start with `App.jsx` to follow the application flow. Page components receive data and event handlers through props. Discovery keeps its search and filter state locally. Forms use native HTML inputs and `FormData`; submitting a form calls the corresponding handler in `App.jsx`. The modal keeps keyboard focus and scroll handling in one place.

Run `npm run format` to keep the frontend formatting consistent.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Health and storage mode |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Start a session |
| POST | `/api/auth/demo` | Create a temporary demo session (demo mode only) |
| GET / PUT | `/api/me` | Read or update your profile |
| GET | `/api/students` | List students with match metadata |
| GET / POST | `/api/connections` | Read or send requests |
| PATCH | `/api/connections/:id` | Accept or decline a received request |
