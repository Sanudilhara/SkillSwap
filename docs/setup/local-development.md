# Local development

Install Node.js 22.12+ and npm. Commands below use PowerShell.

## Backend terminal

```powershell
cd C:\Users\Sanu\Desktop\SkillSwap\backend
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run dev
```

The API runs at http://127.0.0.1:4000. Nodemon restarts it after JavaScript changes.
`PORT` is read from `backend/.env`, with 4000 as the default. Restart after editing `.env`.

## Frontend terminal

```powershell
cd C:\Users\Sanu\Desktop\SkillSwap\frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally http://127.0.0.1:5173. If the port is busy,
Vite selects the next available port. `npm start` is an alias for `npm run dev`
in the frontend. Vite refreshes the page when source files change.
The Home and About pages run independently of the API in Phase 1.

## Verify

```powershell
Invoke-RestMethod http://127.0.0.1:4000/api/health
npm --prefix backend test
npm --prefix frontend run build
```

Run the last two commands from the SkillSwap root directory.
To preview the frontend production build, run `npm run preview` from `frontend`
and open the URL printed in the terminal. `npm start` in `backend` starts the API
without file watching. The backend does not serve the frontend build.

Press Ctrl+C in each server terminal to stop it.

## Troubleshooting

- Run commands in the correct application folder; there is no root package.json.
- Run one instance of each application. If the app is already running, open its
  URL rather than starting it again. Stop servers in their terminal with Ctrl+C.
- If port 5173 is busy, use the next available URL printed by Vite.
- If port 4000 is busy, stop the existing backend before starting it again, or
  choose a different PORT in backend/.env and restart the backend.
- If PowerShell blocks `npm.ps1`, use `npm.cmd` in place of `npm`.
- There is no database or account setup in this phase.
