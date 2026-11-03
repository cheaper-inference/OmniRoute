---
title: "Headless Mode — run only the proxy engine"
version: 3.8.53
lastUpdated: 2026-11-02
---

# Headless Mode

Headless mode boots OmniRoute as a plain LLM proxy: the OpenAI-compatible API under `/v1/*`
keeps working, but the dashboard is switched off and the optional subsystems that only feed
the dashboard (or add opt-in features on top of the proxy) are not started at boot.

Use it for servers, containers and CI boxes where nobody opens the dashboard and you want a
lighter, quieter process. Nothing is uninstalled or removed: unset the variable and restart to
get the full server back.

## Turning it on

Either set the environment variable:

```bash
OMNIROUTE_HEADLESS=1 omniroute serve
```

or pass the CLI flag, which sets `OMNIROUTE_HEADLESS=1` on the server process for you:

```bash
omniroute serve --headless
omniroute serve --headless --port 20128 --daemon
```

Accepted truthy values are `1`, `true`, `yes` and `on` (case-insensitive). Any other value,
or an unset variable, keeps the full server. The flag is implemented in
`bin/cli/commands/serve.mjs`; the single source of truth for the mode is
`src/lib/system/headless.ts`.

With `--headless` the CLI does not open a browser and the startup banner prints
`Dashboard: disabled (headless)`. `--headless` cannot be combined with `--tray` (the tray menu
exists to open the dashboard).

## What stays on

| Surface                                                                     | Headless |
| --------------------------------------------------------------------------- | -------- |
| `/v1/*` (chat completions, responses, models, embeddings, …)                | on       |
| `/api/monitoring/health`                                                    | on       |
| `/api/auth/*` and the API-key / `REQUIRE_API_KEY` checks                    | on       |
| Every other `/api/*` route (management API, used by the `omniroute` CLI)    | on       |
| Proxy core at boot: DB, secrets, quota fetchers, settings hydration         | on       |
| Background proxy work: quota refresh, token auto-refresh, cooldown recovery | on       |
| API bridge port, cleanup/VACUUM schedulers, backup schedule                 | on       |
| Memory: configured memory backends + typed-memory decay sweep               | on       |

Authentication is unchanged: if `/v1/*` needs an API key on the full server, it needs one in
headless mode too.

## What is switched off

**Dashboard pages.** `/dashboard`, `/dashboard/*`, `/home` and `/home/*` answer
`404` with the JSON body `{"error":"dashboard disabled (headless)"}`. The gate runs in
`src/proxy.ts` before the authorization pipeline, so no other route is affected.

**Optional boot subsystems.** `registerNodejs()` in `src/instrumentation-node.ts` skips:

| Subsystem name              | What it does on the full server                                        |
| --------------------------- | ---------------------------------------------------------------------- |
| `free-proxy-sync`           | Re-fetches free-proxy source lists on an interval                      |
| `cloud-sync`                | Cloud / model sync background bootstrap                                |
| `embedded-services`         | Auto-starts embedded services marked auto-start                        |
| `embed-ws-proxy`            | WebSocket proxy for embedded service UIs                               |
| `conductor-bridge`          | Mirrors OmniConductor hub tasks into A2A (opt-in, `CONDUCTOR_HUB_URL`) |
| `arena-elo-sync`            | Arena ELO leaderboard sync for the Free Provider Rankings page         |
| `radar-sync`                | Radar daily feed sync (opt-in)                                         |
| `pricing-sync`              | External pricing data sync (opt-in, `PRICING_SYNC_ENABLED`)            |
| `openrouter-provider-stats` | Provider directory / popularity enrichment for the dashboard           |
| `models-dev-sync`           | models.dev capability sync (opt-in in settings)                        |
| `live-dashboard-ws`         | Real-time dashboard WebSocket daemon (port 20132)                      |

Each skip is logged once at startup, for example:

```
[STARTUP] Headless mode: skipping free-proxy-sync
[STARTUP] Headless mode: skipping cloud-sync
[STARTUP] Headless mode: skipping optional subsystems: embedded-services, embed-ws-proxy, …
```

## Checking it with curl

```bash
# Health — 200 (public by design, so it says nothing about API-key enforcement)
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:20128/api/monitoring/health

# Models — 200, or 401 when the login posture requires a credential; then add
# -H "Authorization: Bearer $OMNIROUTE_KEY". This route does not follow REQUIRE_API_KEY.
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:20128/v1/models

# Dashboard — 404 with the headless error body
curl -s -w "\n%{http_code}\n" http://localhost:20128/dashboard
# {"error":"dashboard disabled (headless)"}
# 404
```

## Deploying as an API-only gateway

Headless mode does not add any protection of its own. Before exposing the service to a network,
go through the settings, the persistence note and the checks below.

### Running from a source checkout

```bash
npm run build:backend          # optional: see "Backend-only build"
OMNIROUTE_HEADLESS=1 npm start
```

That inline variable uses POSIX shell syntax. On Docker or under another process manager, set
`OMNIROUTE_HEADLESS=1` in the server environment instead. The supported Node.js versions are the
`engines.node` range in `package.json`.

### Security settings

- `REQUIRE_API_KEY=true`: API-key enforcement on the client API routes is **off by default**
  (`src/shared/constants/featureFlagDefinitions.ts`), so turn it on first. A feature flag saved in
  the database takes precedence over the environment variable (`resolveFeatureFlag()` in
  `src/shared/utils/featureFlags.ts`), so on an existing data volume check the saved value too:
  `GET /api/settings/feature-flags` is available with the dashboard off.
- `JWT_SECRET`: required, a long random secret (`openssl rand -base64 48`).
- `API_KEY_SECRET`: required, a separate random secret that encrypts stored API keys
  (`openssl rand -hex 32`).
- `STORAGE_ENCRYPTION_KEY`: optional, encrypts the SQLite database at rest
  (`openssl rand -hex 32`). Empty disables it. Back up the key: losing it means losing the data.
- `INITIAL_PASSWORD`: sets the management password at startup while none is saved. The `CHANGEME`
  value in `.env.example` is publicly known, so replace it. The management API stays reachable in
  headless mode (see [Limits](#limits)).

Never commit real secrets or provider credentials. Keep API keys private and send them from your
backend in the `Authorization: Bearer` header.

### Persistence

Provider connections, settings, API keys and usage data live in SQLite under `DATA_DIR` (default
`~/.omniroute/`). Mount a persistent directory and point `DATA_DIR` at it: a host with ephemeral
storage can lose these records on restart or redeploy.

### Backend-only build

`npm run build:backend` sets `OMNIROUTE_BUILD_BACKEND_ONLY=1`, which makes
`scripts/build/build-next-isolated.mjs` replace the App Router UI files with stubs for the duration
of `next build` and restore them afterwards (`scripts/build/backendOnlyPages.mjs`). Every `route.ts`
handler stays intact, so the build serves the complete API, and it skips the dashboard's client
bundles and prerender pass.

- It is independent of headless mode. The build only makes the dashboard render nothing; the `404`
  answers and the skipped boot subsystems come from `OMNIROUTE_HEADLESS=1` at runtime.
- It is not a dependency-pruned distribution. Package dependencies and server-side modules stay in
  place, and some packages used by the dashboard are also imported by API handlers, so do not remove
  packages based only on their dashboard use.
- The stubs temporarily overwrite tracked files. If a hard kill leaves them behind, recover with
  `git checkout -- src/app`.

### Smoke-test checklist

After building and starting with a persistent data directory:

1. `GET /api/monitoring/health` answers `200`.
2. `POST /v1/chat/completions` without a key answers `401` when `REQUIRE_API_KEY` is on. Probe an
   inference route for this: `/v1/models` follows a different setting and a junk key is not a valid
   probe. See [INFERENCE_AUTH_POSTURE.md](../security/INFERENCE_AUTH_POSTURE.md).
3. `POST /v1/chat/completions` with a valid key and a configured test provider returns an
   OpenAI-compatible response. In automated tests use a local mock provider and throwaway secrets,
   not real provider credentials.
4. `GET /dashboard` answers `404` with the headless error body.
5. After a restart, provider connections and settings are still there.

## Limits

- **Set before start.** The server process reads `OMNIROUTE_HEADLESS` from its own environment;
  switching modes means restarting the server with the variable set or unset.
- **Management API stays reachable.** Headless mode only closes the dashboard pages. The
  `/api/*` management routes keep their normal authorization tiers, so the `omniroute` CLI
  (and remote mode) keep working. It is not a security boundary — keep using
  `REQUIRE_API_KEY` and a loopback bind (`OMNIROUTE_SERVER_HOST`) where appropriate.
- **Route-loaded features still load on demand.** MCP, A2A, evals, gamification, webhooks and
  cloud agents have no boot-time init; they start lazily when their routes are called, in both
  modes.
- **Memory stays on.** Memory is cross-cutting to the request pipeline (`/v1` injects and
  queries it), so the configured memory backends and the typed-memory decay sweep start at boot
  in headless mode exactly as on the full server.
- **Code still ships.** This mode changes what runs, not what is installed — the package size
  and the build are identical. To leave the dashboard pages out of a source build, see
  [Backend-only build](#backend-only-build).

## See also

- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `OMNIROUTE_HEADLESS` and
  `OMNIROUTE_DISABLE_BACKGROUND_SERVICES` (a separate switch that stops background schedulers
  but keeps the dashboard).
- [REMOTE-MODE.md](REMOTE-MODE.md) — drive a remote (for example, headless) OmniRoute from
  your laptop with the `omniroute` CLI.
