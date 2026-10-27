---
title: "Build Warnings Reference"
version: 3.8.52
lastUpdated: 2026-10-18
---

# Build Warnings Reference

`npm run build` and `npm run build:release` print a handful of warnings that are
**expected** and do not mean the artifact is broken. This page catalogs them, says
whether each one is actionable, and points at the code that owns it — so an operator can
tell known build-time noise from a real regression.

If a message you see is not listed here, treat it as new and investigate it.

## Webpack "Critical dependency" for `open-sse/executors/codex.ts`

```
./open-sse/executors/codex.ts
Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
```

**Expected — intentional.** `open-sse/executors/codex/wreqLoader.ts` loads the optional
`wreq-js` native helper through a `createRequire()`-returned function whose specifier is
kept as a **variable** on purpose (`Reflect.apply(requireFn, undefined, [moduleName])`). A
literal specifier is statically rewritten by Turbopack into a hashed `.next`-relative
require that does not exist in the standalone Docker runtime, so the dynamic form is
required (#12491). The warning is the price of that pattern; the module still resolves at
runtime and is not a missing dependency.

Because the loader is imported by the Codex quota service, instrumentation, and the
internal Codex WebSocket route, webpack reports the same warning once per import path.

## Fumadocs MDX "build dependencies" cache warning

```
[webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo] Parsing of
.../fumadocs-mdx/dist/eval-*.js for build dependencies failed at 'import(pathToFileURL(outfile).href)'.
Build dependencies behind this expression are ignored and might cause incorrect cache invalidation.
```

**Upstream `fumadocs-mdx`, not actionable.** The package emits a dynamic `import()` of a
generated module that webpack's `FileSystemInfo` pass cannot statically follow. The only
consequence is that webpack may invalidate its build cache more often for that dependency;
the **emitted output is unaffected**. OmniRoute suppresses the known benign form in
`next.config.mjs` via `scripts/build/knownBuildWarnings.mjs`, which allow-lists the whole
`node_modules/fumadocs-mdx/dist/` directory (both the `load-from-file-*.js` and
`eval-*.js` bundles).

## Runtime configuration messages during static generation

`next build` imports application modules while collecting page data, so a few
runtime-oriented log lines appear during the build as well. They are **not** build errors.

| Message                                                                                       | Owner                                 | Meaning                                                                                                                                          |
| --------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `[DB] Build phase detected — using no-op SQLite stub (never queried)`                         | `src/lib/db/core.ts`                  | The build never opens the real database. Expected.                                                                                               |
| `[REDIS] REDIS_URL is not set in production. Using in-memory rate limiting.`                  | `src/shared/utils/rateLimiter.ts`     | Redis is optional; without it rate limiting falls back to memory. Set it only if you run Redis in production — see `REDIS_PRODUCTION_CONFIG.md`. |
| `[CREDENTIALS] No external credentials file found, using defaults.`                           | `open-sse/config/credentialLoader.ts` | Expected unless you ship an external credentials file.                                                                                           |
| `[INFO] [PLUGIN_SCANNER] scanner.dir_resolved` / `[INFO] [MEMORY_MANAGER] Registered backend` | plugin + memory registries            | Informational.                                                                                                                                   |

### `[SECURITY] FATAL: JWT_SECRET is not set`

`JWT_SECRET` is **required at runtime** — without it, login fails closed and the dashboard
is unreachable. Set it in your environment before starting the server (see
`../reference/ENVIRONMENT.md`).

During `next build` the login route module used to be imported while collecting page data
with no `JWT_SECRET`, and printed the same `FATAL` line, which reads like a live security
failure. That message is now skipped during the build phase: the module-level warning in
`src/app/api/auth/login/route.ts` is gated on `isNextBuildPhase()`
(`src/lib/buildPhase.ts`), which matches `NEXT_PHASE=phase-production-build`,
`OMNIROUTE_BUILDING=1`, and `npm_lifecycle_event=build`. The request handler still returns
`500` when the secret is missing at runtime, so runtime behavior is unchanged.

## Bun and dependency installation

OmniRoute is built and run with **Node.js** (`engines.node` in `package.json`). Install
dependencies with `npm ci` (or `npm install`):

```bash
npm ci
npm run build:release
```

**`bun install` is not a supported way to install OmniRoute's dependencies** for this
branch. Bun `1.4.2` is pinned as a devDependency and is used only to run a small,
allow-listed set of gate/generator scripts. If you install with Bun you may see:

- `warn: Bun currently only supports one level of nested "overrides"` — Bun's support for
  `package.json` `overrides` is shallower than npm's; npm applies the full tree.
- **Blocked lifecycle scripts** for native packages (ONNX Runtime, Playwright Chromium,
  SWC, protobufjs, Parcel Watcher, unrs-resolver). Bun blocks install scripts by default;
  the supported `npm ci` path runs them, and `npm run check:native-deps` verifies that
  every externalized package resolves afterward.

### Bun script-runner failures

Bun runs only the allow-listed gate/generator scripts (`check:provider-consistency`,
`check:compression-budget`, `check:known-symbols`, `gen:provider-reference`,
`bench:compression`) plus the `test:bun:db` smoke suite — see `AGENTS.md` → Environment.
After pulling the lockfile change, run `npm install` so `bun` resolves locally (a stale
`node_modules` will fail those scripts with `bun: not found`).

**Two distinct Bun failures, two different fixes — do not confuse them.**

- **(a) `bun: not found`** → the tree is stale; `npm install`.
- **(b) Bun exists but refuses to run** → `node_modules/bun/bin/bun.exe` is still the
  ~450-byte **bash placeholder** the package ships, because its `postinstall` was skipped
  (`npm install --ignore-scripts`, or a package manager that skips lifecycle scripts). The real
  binary is already on disk in the platform package (e.g.
  `node_modules/@oven/bun-windows-x64/bin/bun.exe`, ~86 MB), so nothing is missing and
  re-running `npm install` on an already-satisfied tree may not fix it. Fix:
  `cd node_modules/bun && node install.js`.

**On Windows the error is actively misleading** — `cmd.exe` asks the loader to run a bash
script, which reports `This version of … is not compatible with the version of Windows you're running`,
which reads like an OS/architecture problem but means "this is not a Windows executable".
Confirm the real cause with `ls -l node_modules/bun/bin/bun.exe` (a few hundred bytes =
placeholder). Either way `node --import tsx <script>` is the validated byte-identical fallback
for all four scripts.
