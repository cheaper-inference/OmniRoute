# Windows helpers — run OmniRoute from a source checkout

Double-clickable `.bat` files for Windows users who cloned the repo instead of
installing the npm package. All of them resolve the repo root from their own location, so they
work from any checkout path.

| File                           | What it does                                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start-omniroute-prod.bat`     | `npm run start:fast`: production-mode Next server (not the standalone bundle) on a build made with `npm run build:fast`. Background services stay on |
| `start-omniroute-light.bat`    | `npm run dev` with `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true` (see the trade-off below)                                                            |
| `start-omniroute-headless.bat` | `npm run dev` with `OMNIROUTE_HEADLESS=1` and `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true`: `/v1/*` only, no dashboard                               |
| `start-omniroute.bat`          | `npm run dev`: dev server + dashboard on `http://localhost:20128`                                                                                    |
| `launch-claude.bat`            | `node bin\omniroute.mjs launch`: opens Claude Code pointed at the local OmniRoute                                                                    |

Usage:

1. `npm install` once (see the note below if you are on npm ≥ 11).
2. Double-click your chosen startup script. `start-omniroute-prod.bat` needs `npm run build:fast`
   first; the others compile on demand, as any dev server does.
3. Wait for `server listening on http://0.0.0.0:20128`.
4. Open the dashboard (not in headless mode) at `http://localhost:20128`, connect a provider, copy
   an API key from **Endpoints**.
5. Double-click `launch-claude.bat`. Extra arguments are forwarded, e.g.
   `launch-claude.bat --profile glm52` after `node bin\omniroute.mjs setup-claude`.

## What the light and headless launchers turn off

`OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true` saves work by stopping every background service, which
has a cost on a long-running install:

- Connections in cooldown are not re-validated in the background (connection recovery is off), and
  quota data and provider limits are not refreshed.
- Cloud, model, free-proxy and proxy-health sync do not run.
- Retention cleanup and scheduled VACUUM do not run, so the database keeps growing.
- Credential health checks do not run, and the 5-second settings poll is off. Settings changes are
  still picked up through the SQLite file watch when it is available.

Use `start-omniroute-prod.bat` or `start-omniroute.bat` for an install you rely on day to day. See
[`docs/reference/ENVIRONMENT.md`](../../docs/reference/ENVIRONMENT.md) for the flag.

## npm ≥ 11 skips `better-sqlite3` on Windows

`better-sqlite3` is an `optionalDependency`. npm 11 blocks install scripts of optional
dependencies by default, so on a fresh clone `node_modules/better-sqlite3/` may simply not
exist. The server still boots (it falls back to `node:sqlite`, which Node marks
experimental), but `npm run dev` logs `Module not found: Can't resolve 'better-sqlite3'`
and `[DB] Driver: node:sqlite`.

Since `better-sqlite3@13` ships prebuilt binaries inside the package
(`prebuilds/win32-x64.node`), no compiler is needed — just put the package in place:

```powershell
cd node_modules
npm pack better-sqlite3@13.0.3
tar -xzf better-sqlite3-13.0.3.tgz
Remove-Item -Recurse -Force better-sqlite3 -ErrorAction SilentlyContinue
Rename-Item package better-sqlite3
Remove-Item better-sqlite3-13.0.3.tgz
```

Restart the server; the log should now read `[DB] Driver: better-sqlite3`.

> If you do need to compile a native addon and `python` resolves to the Microsoft Store
> build, `node-gyp` fails with `common.gypi not found` even after downloading headers — the
> Store Python sandboxes `%LOCALAPPDATA%`. Pass `--devdir` pointing outside `AppData\Local`
> (or install python.org Python).
