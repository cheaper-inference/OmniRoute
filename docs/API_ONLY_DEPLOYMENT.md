# API-only deployment profile

This fork adds explicit commands for running OmniRoute as an authenticated API gateway
without serving its dashboard UI.

## Runtime requirements

Use a supported Node.js version: `>=22.22.2 <23` or `>=24.0.0 <27`, matching
the range declared in `package.json`. Use a Linux host for the `start:api-only`
script, which sets the headless environment variable with POSIX shell syntax.

## Commands

- `npm run build:api-only` — uses the project's existing backend-only Next.js build profile.
- `npm run start:api-only` — starts the production server with `OMNIROUTE_HEADLESS=1`.

For Docker or another process manager, set `OMNIROUTE_HEADLESS=1` in the server
environment instead of relying on the npm start script.

## Required security settings

Set these before exposing the service to a network:

- `REQUIRE_API_KEY=true` — API-key enforcement is **off by default** in a fresh install,
  so do not expose the service before enabling it. The database feature-flag override
  takes precedence over the environment variable; on an existing data volume, verify
  the saved `REQUIRE_API_KEY` value too.
- `JWT_SECRET` — a long, random secret.
- `API_KEY_SECRET` — a separate long, random secret.
- `STORAGE_ENCRYPTION_KEY` — a separate encryption key for stored data.
- `INITIAL_PASSWORD` — set a unique initial management password if the management
  authentication flow requires it.

Never commit real secrets or provider credentials. Keep API keys private and send them
from your bot/backend using the Authorization Bearer header.

## Persistence

OmniRoute stores provider connections, settings, keys and usage data in SQLite. Mount a
persistent data directory and configure `DATA_DIR` for it. A host with ephemeral storage
can lose these records after restart/redeploy; do not treat an ephemeral filesystem as
durable storage.

## What API-only means

The backend-only build stubs dashboard page modules during build while retaining API route
handlers. Headless runtime mode disables dashboard pages and optional dashboard-oriented
startup subsystems. The core proxy, authentication, database, provider credential handling
and request-serving routes remain enabled.

This is not a dependency-pruned distribution: package dependencies and server-side modules
are not wholesale deleted. Do not remove packages based only on their dashboard use; some
may also be imported by API handlers.

Background work needed for provider quota refresh, token renewal, connection recovery and
routing remains enabled unless a separately reviewed configuration says otherwise.

## Smoke-test checklist

After building and starting with a persistent data directory:

1. `GET /api/monitoring/health` should return a healthy response. This read-only health
   endpoint is intentionally public and is not proof that inference routes require a key.
2. `GET /v1/models` should enforce the configured API-key policy.
3. `POST /v1/chat/completions` with a valid key and a configured test provider should
   return a valid OpenAI-compatible response.
4. A request without a key should be rejected when `REQUIRE_API_KEY=true`.
5. Dashboard paths should be unavailable in headless mode.
6. Restart the service and confirm provider connections/settings persist.

Do not use real provider credentials in automated tests. Use a local mock provider and
throwaway test secrets.
