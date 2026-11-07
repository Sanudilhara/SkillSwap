# Phase 1: project foundation

## Included

- Separate frontend, backend, and documentation folders.
- React with Vite, JavaScript, plain CSS, and declarative React Router.
- Home, About, and missing-page views.
- Node.js with Express and ES modules.
- GET /api/health returning JSON.
- Environment configuration with dotenv and a committed example.
- Nodemon for backend development.
- Dependency lockfiles, ignore rules, setup instructions, and verification.

## Deferred

Authentication, MongoDB, user profiles, skill matching, connection requests,
frontend API integration, and deployment are outside Phase 1. No next-phase work
should begin until the user confirms it.

## Existing project

The project originally had a root Vite frontend and an Express `server/` directory
containing authentication, MongoDB, and connection features. An initial local backup
was removed during the requested cleanup. The previous tracked code remains in Git
history. Only frontend/, backend/, and docs/ are used by the new foundation.
