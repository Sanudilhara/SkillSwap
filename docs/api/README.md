# Phase 1 API

Local base URL: `http://127.0.0.1:4000`.

## GET /api/health

Confirms that the Express application is reachable. No request body is required.

Success: HTTP 200, `Content-Type: application/json`.

```json
{
  "status": "ok",
  "message": "SkillSwap API is running"
}
```

PowerShell check:

```powershell
Invoke-RestMethod http://127.0.0.1:4000/api/health
```

There are no database checks or authentication requirements. Other routes use
Express's default 404 response. Browser-to-API integration is reserved for a later phase.
