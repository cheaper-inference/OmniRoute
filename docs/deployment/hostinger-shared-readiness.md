# OmniRoute on Hostinger shared Node.js — deployment readiness

Target: `agente.fitowaylabs.com.br`. Compatibility work lives only on branch `hostinger-build-compatibility`; **do not merge or deploy automatically**.

## Verified
- Hostinger SSH: CloudLinux/EL8, glibc 2.28, GCC 8.5; Node/npm were not exposed in the SSH shell. The Hostinger Node.js application builder separately reported Node 22.23.4 / npm 10.9.9.
- The upstream app is Next.js 16 and uses `better-sqlite3` (SQLite); a MySQL database is **not** a drop-in replacement.
- `next.config.mjs` defaults to `NEXT_DIST_DIR=.build/next`. Hostinger's earlier output-directory setting `.next` was inconsistent.
- The isolated Rocky Linux 8 probe built `better-sqlite3@13.0.3` using GCC Toolset 12 and Python 3.9 and passed a SQLite query when explicitly loading the compiled native addon.
- The standalone Ubuntu GitHub build passes, but its native dependencies are **not automatically compatible** with glibc 2.28.

## Outstanding checks (blocking deployment)
1. Confirm the native SQLite binding also works through the **default** `require("better-sqlite3")` resolution path on glibc 2.28; the compatibility workflow now tests this.
2. Check that the compiled addon does not depend on unavailable `GLIBCXX` / `libstdc++` versions on the real Hostinger runtime.
3. Test a **complete Next.js runtime** on a glibc 2.28-compatible image. A SQLite-only probe and an Ubuntu build do not prove the application will start.
4. Confirm the Hostinger Node.js app supports the required startup command, persistent SQLite storage, outbound provider API requests, WebSockets/streaming, and long-running background workers. Features requiring unavailable services must be disabled explicitly rather than silently assumed to work.
5. Inspect and resolve CI/Quality Gates. Some upstream admission checks skip most jobs for this compatibility branch; do not interpret those failures as successful tests or bypass required checks.
6. Determine the application's real data-directory environment variable from source before setting a persistent path; **do not** place database files under a build-output directory.
7. Determine the precise Node engine constraint in `package.json` (currently `>=22.22.2 <23 || >=24.0.0 <27`) and verify it matches the deployed builder/runtime, not merely the SSH shell.

## Deployment configuration — preliminary, not yet executable
- Domain: `agente.fitowaylabs.com.br`
- Runtime: Node.js 22.23.4, **subject to Hostinger runtime verification**
- Build output: `.build/next` (or set `NEXT_DIST_DIR` consistently at build and runtime)
- Application build: `npm run build` (must run with native SQLite installed for the target)
- Start command: `npm run start` (subject to actual Hostinger builder configuration)
- SQLite: persist outside any directory replaced on each deployment; take a backup before upgrades
- Credentials: use Hostinger environment-variable settings; never commit `.env`, passwords, OAuth secrets or provider keys

## Safety
Do not overwrite the existing subdomain, delete its files, create database schemas, change DNS, or merge the PR until the application-level smoke test and backup plan pass. No Hostinger credentials are stored in this document.

## Hostinger preflight (added on compatibility branch)

Run only after Node.js dependencies, the matching compiled SQLite native addon, the Next build, and environment variables are present:

```sh
node scripts/ops/hostinger-preflight.mjs
```

The preflight is non-destructive: its SQLite CRUD check uses `:memory:`. It checks Node engine, build output, `DATA_DIR` and writable permissions, key environment variables and default SQLite native binding. A passing result is **necessary but not sufficient**: it does not prove the web server, WebSockets, proxy, streaming or scheduled tasks will work.

Hostinger Node.js runtime settings must be checked in the application builder. Use a persistent, absolute `DATA_DIR` outside deploy/build folders. Set `JWT_SECRET` and `API_KEY_SECRET` to independent cryptographically random values and set a strong `INITIAL_PASSWORD` for first boot. Keep all secrets in Hostinger environment settings, never in GitHub.

**Important:** `better-sqlite3` from the npm package defaults to a binary requiring GLIBC 2.29 on this target. The Rocky Linux 8 compatibility test compiles a GLIBC 2.28-compatible binary and substitutes it at the expected prebuild location. A regular `npm install` on Hostinger may replace that binary, so the production packaging process must preserve and verify it.

### Readiness decision

- Native SQLite probe: PASS in isolated Rocky Linux 8 container.
- Full application startup on Hostinger: NOT YET VERIFIED.
- GitHub CI / Quality Gates: FAIL under draft PR admission policy; full tests skipped.
- Actual Hostinger deployment: NOT PERFORMED.

Do not mark this release ready until a real Node.js runtime preflight and HTTP health smoke test pass.
