# SkillSwap

A student skill-exchange project. Phase 1 establishes a small, easy-to-read React
frontend and Express backend. Authentication and MongoDB are deferred.

## Requirements

- Node.js 22.12 or newer (verified locally with Node.js 24.14.0).
- npm (included with Node.js).
- Two terminals, one for each application.

## Run the backend

In PowerShell:

```powershell
cd C:\Users\Sanu\Desktop\SkillSwap\backend
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run dev
```

API: **http://127.0.0.1:4000/api/health**.
The ignored `backend/.env` sets `PORT=4000`. Nodemon restarts the backend when
JavaScript files change. Restart manually after changing `.env`.

## Run the frontend

In a second PowerShell terminal:

```powershell
cd C:\Users\Sanu\Desktop\SkillSwap\frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally **http://127.0.0.1:5173**.
If that port is busy, Vite chooses the next available port.
`npm start` also starts the frontend development server.
Home, Login, Register, Forgot Password, and About use React Router.
The frontend runs independently of the API in this phase.
The account forms provide input validation and clear unavailable messages; they
do not create accounts, sign users in, or send password-reset emails yet.
Stop each application with Ctrl+C in its terminal.

## Structure

```text
SkillSwap/
  frontend/
    public/
      favicon.svg
    src/
      pages/
        HomePage.jsx
        AboutPage.jsx
        LoginPage.jsx
        RegisterPage.jsx
        ForgotPasswordPage.jsx
      App.jsx
      main.jsx
      index.css
    .gitignore
    index.html
    package.json
    package-lock.json
    vite.config.js
  backend/
    src/
      app.js
      server.js
      app.test.js
    .env.example
    .gitignore
    package.json
    package-lock.json
  docs/
    setup/
    architecture/
    api/
    README.md
    phase-1.md
    verification.md
  README.md
  .gitignore
```

See the [file-by-file guide](docs/architecture/project-structure.md) and
[documentation index](docs/README.md).

## Test and build

From the project root, after installing both apps:

```powershell
npm --prefix backend test
npm --prefix frontend run build
```

The backend test checks the real HTTP health response. The frontend build checks
that JSX and imports compile for production. See [verification results](docs/verification.md)
for the checks performed during implementation and their limits.

To preview a frontend build, run `npm run preview` inside `frontend` and open the
printed URL. Run `npm start` inside `backend` to start the API without nodemon.
There is no root npm command or combined production server.

## Cleanup

The obsolete local project backup and root Vite cache have been removed.
The previous tracked implementation remains in Git history.
The active Phase 1 code has no authentication, database, or connection features.

Development stops at Phase 1 until the next phase is confirmed.

## References

- [Vite guide](https://vite.dev/guide/)
- [React Router declarative setup](https://reactrouter.com/start/declarative/installation)
- [Express basic server](https://expressjs.com/en/starter/hello-world/)
