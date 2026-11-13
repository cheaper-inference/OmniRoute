---
title: "Repository Map"
version: 3.8.54
lastUpdated: 2026-11-13
---

# Repository Map

> **What lives where: every tracked top-level directory and root file, with a one-line purpose.**
> Last updated: 2026-11-13 (OmniRoute v3.8.54)
>
> Use this map to find your way around the codebase, then follow the links to the dedicated docs.
> File counts were measured with `git ls-files` on the date above. They change with almost every
> release, so treat them as orders of magnitude.

## Top-level tree

```
OmniRoute/
├── src/              # Next.js 16 app: dashboard, /api and /v1 routes, server libs, domain, i18n
├── open-sse/         # Streaming engine workspace (@omniroute/open-sse): handlers, executors, translator, services, MCP server
├── packages/         # npm workspaces: ui-kit (vendored Keak CI UI Kit) and browser-pool
├── @omniroute/       # Separately published npm packages (OpenCode plugins and provider)
├── bin/              # Published `omniroute` CLI, MCP/bridge entry points, self-host ops scripts (*.sh)
├── electron/         # Desktop app (Electron main/preload + helpers + icons)
├── public/           # Static assets served by Next.js (provider logos, PWA icons, sw.js, openapi.yaml copy)
├── skills/           # Agent Skills (SKILL.md) served by /api/agent-skills, MCP and A2A
├── tests/            # All test suites: unit, integration, e2e, homolog, fixtures, snapshots
├── scripts/          # Build, quality gates, i18n, release, ops, perf and one-off scripts (allow-listed subfolders)
├── config/           # Versioned config: i18n, payload rules, CLI manifest, quality-gate baselines, release inventories
├── changelog.d/      # Per-PR changelog fragments, aggregated into CHANGELOG.md at release time
├── docs/             # Public documentation (served at /docs via Fumadocs) + translated mirrors in docs/i18n/
├── examples/         # Example plugins and quickstart clients
├── deploy/           # Kubernetes deployment: Helm chart + Kustomize base/overlays
├── docker/           # Auxiliary container images (not the main image, which is the root Dockerfile)
├── contrib/          # Community recipes: Podman quadlets, VPS compose, Windows launchers, session-sync note
├── .github/          # GitHub Actions workflows, composite actions, issue/PR templates, CODEOWNERS, labels
├── .husky/           # Tracked git hooks: commit-msg, pre-commit, pre-push
├── .vale/            # Vale prose-lint vocabulary (styles/Vocab/OmniRoute/accept.txt)
├── .vscode/          # Shared VS Code workspace settings (settings.json)
└── (root files — see below)
```

Local, generated or private paths (all gitignored, never committed, not described further):

```
node_modules/            # npm dependencies
.build/                  # Next.js build output (default distDir .build/next, see next.config.mjs)
dist/                    # npm staging directory assembled by scripts/build/prepublish.ts
.source/                 # fumadocs-mdx output that feeds the /docs viewer
.husky/_/                # Husky runtime generated on install (core.hooksPath target)
coverage/ logs/ test-results/ playwright-report/   # coverage, runtime logs, Playwright output
.env                     # local secrets generated from .env.example
_*/                      # private local-only folders (anchored /_* ignore); never tracked
.claude/ .agents/        # local AI-assistant state and skills; never tracked
```

---

## Root files

All tracked files at the repository root (`git ls-files | grep -v /`), grouped by function.

### Project documentation

| File                     | Purpose                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| `README.md`              | Landing page: feature overview, quick start, install methods             |
| `CHANGELOG.md`           | Per-release changelog (fragments from `changelog.d/` are folded in here) |
| `ROADMAP.md`             | Public roadmap                                                           |
| `LICENSE`                | MIT license                                                              |
| `THIRD_PARTY_NOTICES.md` | Notices for bundled third-party code (for example the wreq-js bindings)  |
| `CONTRIBUTING.md`        | Contributor guide: setup, conventional commits, test matrix, PR flow     |
| `SECURITY.md`            | Vulnerability reporting policy                                           |
| `CODE_OF_CONDUCT.md`     | Community behavior expectations                                          |
| `llm.txt`                | Plain-text project summary for LLM crawlers and assistants               |

### AI-assistant instructions

| File        | Purpose                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| `AGENTS.md` | Single source of truth for every AI assistant: conventions, quality gates, Hard Rules |
| `CLAUDE.md` | Claude Code–specific deltas; imports `AGENTS.md`                                      |
| `GEMINI.md` | Gemini-specific deltas; points back to `AGENTS.md`                                    |

Nested guides also exist next to the code they describe: `open-sse/services/AGENTS.md` and
`src/lib/db/AGENTS.md`.

### Package manifests and Node toolchain

| File                       | Purpose                                                                         |
| -------------------------- | ------------------------------------------------------------------------------- |
| `package.json`             | npm manifest: scripts, dependencies, `engines`, `workspaces`, published `files` |
| `package-lock.json`        | Locked dependency tree                                                          |
| `pnpm-workspace.yaml`      | pnpm workspace list (`packages/*`, `open-sse`) and native-build allowlist       |
| `.npmrc` / `.npmignore`    | npm config and publish exclusions                                               |
| `.node-version` / `.nvmrc` | Node version pins for version managers                                          |
| `flake.nix` / `flake.lock` | Nix dev shell and its lock                                                      |
| `Makefile`                 | `make` shortcuts that delegate to the npm scripts                               |

### TypeScript, Next.js and docs build

| File                                      | Purpose                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `tsconfig.json`                           | Base TypeScript config and path aliases (`@/*`, `@omniroute/open-sse`)    |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` slice                                            |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (strict `noImplicitAny`) slice        |
| `tsconfig.typecheck-api.json`             | API-route typecheck slice (`scripts/check/check-api-typecheck.mjs`)       |
| `tsconfig.typecheck-dashboard.json`       | Dashboard typecheck slice (`npm run check:dashboard-typecheck`)           |
| `tsconfig.build.json`                     | Production typecheck (`npm run typecheck:build`, `check:build-typecheck`) |
| `tsconfig.mitm.json`                      | MITM build config used by `scripts/build/buildMitm.mjs`                   |
| `next.config.mjs`                         | Next.js 16 config (standalone output, build-profile aliases)              |
| `source.config.ts`                        | Fumadocs `defineDocs` config: which `docs/` sections compile into `/docs` |
| `postcss.config.mjs`                      | PostCSS / Tailwind pipeline                                               |

### Lint and formatting

| File                                      | Purpose                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Main ESLint flat config (`npm run lint`, with `config/quality/eslint-suppressions.json`)      |
| `eslint.complexity-ratchets.config.mjs`   | Standalone config used by the complexity and cognitive-complexity ratchets in one ESLint pass |
| `eslint.complexity.config.mjs`            | Standalone config with only core `complexity` + `max-lines-per-function` (used by tests)      |
| `prettier.config.mjs` / `.prettierignore` | Prettier rules and exclusions                                                                 |
| `.editorconfig`                           | Editor defaults (2-space indentation)                                                         |
| `.markdownlint.json`                      | Advisory markdown lint (`npm run lint:md`)                                                    |
| `.vale.ini`                               | Advisory prose lint (`npm run lint:prose`), vocabulary in `.vale/`                            |

### Tests, evaluation and coverage

| File                          | Purpose                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (dashboard `.tsx`, hooks, memory/skills tests)     |
| `vitest.mcp.config.ts`        | Node Vitest suite: `npm run test:vitest` (MCP server, autoCombo, combo, API `.spec.ts`)         |
| `vitest.quarantine.config.ts` | Runs the quarantined files listed in `config/quality/vitest-exclusions.json`                    |
| `vitest.e2e-live.config.ts`   | Live-server Vitest suites (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                   |
| `stryker.conf.json`           | Stryker mutation testing (`npm run test:mutation`)                                              |
| `stryker.disablebail.json`    | Stryker variant without bail, for test-redundancy measurement                                   |
| `promptfooconfig.yaml`        | promptfoo LLM-security suite                                                                    |
| `codecov.yml`                 | Codecov patch-coverage settings                                                                 |

### Docker and deployment

| File                              | Purpose                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `Dockerfile`                      | Multi-stage image (`builder` → `runner-base` → `runner-web` / `runner-cli*`) |
| `Dockerfile.bun`                  | Alternative image on the Bun runtime (built by `docker-publish.yml`)         |
| `docker-compose.yml`              | Default compose with profiles (base, web, cli, host, memory, cliproxyapi, …) |
| `docker-compose.prod.yml`         | Separate production-snapshot instance on port 20130                          |
| `docker-compose.selfhost.yml`     | One-command loopback self-host (pairs with `.env.selfhost.example`)          |
| `docker-compose.ollama-local.yml` | Docker OmniRoute talking to a host-native Ollama                             |
| `.dockerignore`                   | Docker build-context exclusions                                              |
| `fly.toml`                        | Fly.io app config (port 20128, `/data` volume)                               |

### Security, supply chain and repository bots

| File                                         | Purpose                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks secret-scan rules and allowlists                               |
| `.trivyignore`                               | Accepted-risk suppressions for the container image scan                 |
| `.zizmor.yml`                                | zizmor GitHub Actions security-audit config                             |
| `socket.yml`                                 | Socket.dev app config (path ignores; not a CI gate)                     |
| `sonar-project.properties`                   | SonarQube/SonarCloud project config                                     |
| `knip.json`                                  | Knip unused files/exports/deps config (feeds `npm run check:dead-code`) |
| `.size-limit.json`                           | Bundle-size budgets                                                     |
| `.mergify.yml`                               | Mergify merge-queue config                                              |
| `.coderabbit.yaml`                           | CodeRabbit review config                                                |
| `.cbmignore`                                 | Ignore list for the codebase-memory-mcp code index                      |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignore rules, LF line endings for scripts, canonical author identities  |

### Environment templates, state and feeds

| File                        | Purpose                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| `.env.example`              | Template copied to `.env` on first install; reference list of env vars |
| `.env.selfhost.example`     | Template for `docker-compose.selfhost.yml`                             |
| `.env.homolog.example`      | Template for the homologation runner (`npm run homolog`)               |
| `.env.devin-bridge.example` | Example env file for the Devin bridge setup                            |
| `.i18n-state.json`          | Incremental translation state (source hashes per doc and locale)       |
| `news.json`                 | Localized announcement feed (schema v2) read by the dashboard          |

---

## `src/` — Next.js application

About 4,550 tracked files. Path alias `@/*` → `src/*`.

```
src/
├── app/                  # App Router: pages, layouts and route handlers (file-convention loaded)
│   ├── (dashboard)/      # Route group for the dashboard: dashboard/<section>/ pages + home widgets
│   ├── api/              # HTTP routes: v1/ (OpenAI-compatible), v1beta/ (Gemini-style), management routes
│   ├── docs/             # Embedded docs viewer (lib/openapi.generated.ts is generated)
│   ├── a2a/ .well-known/ # A2A JSON-RPC entry point and Agent Card discovery
│   ├── healthz/ livez/ readyz/ status/   # Health probes and status page
│   ├── landing/ login/ auth/ authorize/ callback/ connect/   # Public, auth and OAuth pages
│   ├── miniapp/          # Telegram Mini App page
│   └── 400/ … 503/       # Static HTTP error pages
├── lib/                  # Server-side libraries and domain modules (largest folder)
├── shared/               # Code shared by server and client: components, constants, validation, utils
├── sse/                  # Next.js side of the SSE pipeline: handlers/ (chat*), services/ (auth, leases, quotas)
├── mitm/                 # MITM / TPROXY capture: cert/, dns/, handlers/, targets/, inspector/, tproxy/ (C addon)
├── server/               # Server-only: authz/ (route guard pipeline), auth/, cors/, origin/, ws/
├── domain/               # Policy engine, fallback, cost rules, lockout, quota cache, assessment/
├── i18n/                 # next-intl: messages/ (67 locales), global-error-messages/ (generated), routeNamespaces.generated.json
├── store/                # Zustand client stores (theme, notifications, …)
├── hooks/                # Client hooks (live dashboard, compression preview, breaker health)
├── types/                # Ambient and shared type declarations
├── models/               # Compatibility barrel re-exporting db functions
├── middleware/           # promptInjectionGuard.ts (facade over the guardrail system)
├── scripts/              # backfillAggregation.ts (`npm run backfill-aggregation`)
├── proxy.ts              # Next.js 16 proxy: headless gate + authz pipeline for dashboard, /api and /v1-style paths
├── instrumentation.ts    # Next.js instrumentation hook (delegates Node-only work)
└── instrumentation-node.ts   # Node-only startup work
```

### `src/app/` — App Router

| Path                                                                | Purpose                                                                                                                                                                    |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | Public OpenAI-compatible API: chat, completions, responses, messages, embeddings, images, audio, videos, music, rerank, moderations, search, files, batches, ws, models, … |
| `app/api/v1beta/`                                                   | Gemini-style endpoints                                                                                                                                                     |
| `app/api/` (other folders)                                          | Management and admin routes: providers, combos, settings, keys, usage, logs, mcp, a2a, acp, memory, skills, evals, webhooks, tunnels, plugins, radar, tools, …             |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — see [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                  |
| `app/api/tools/traffic-inspector/`                                  | Traffic Inspector REST API — see [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                |
| `app/(dashboard)/dashboard/`                                        | One folder per dashboard section (providers, combos, logs, usage, costs, cache, compression, memory, playground, search-tools, settings, tools, …)                         |
| `app/(dashboard)/home/`                                             | Home screen and its widgets                                                                                                                                                |
| `app/docs/`                                                         | Docs viewer rendering the Fumadocs sections listed in `source.config.ts`                                                                                                   |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Root layout, root entry (redirects), PWA manifest, global CSS                                                                                                              |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Error boundaries and fallbacks                                                                                                                                             |

API routes follow `Route → CORS → Zod validation → optional auth → policy → handler`; see
[ARCHITECTURE.md](ARCHITECTURE.md) and [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — server libraries

Roughly 90 subfolders plus about 90 top-level modules. Main groups:

| Area                     | Folders / files                                                                                                     | Deep dive                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Database                 | `db/` — domain modules, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                             | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Usage, quota and spend   | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Providers and models     | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth and credentials    | `oauth/` (providers/, services/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`                  | [PUBLIC_CREDS.md](../security/PUBLIC_CREDS.md)                                                                                                 |
| Safety and governance    | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Agent features           | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plugins and services     | `plugins/`, `services/` (embedded-service installers and supervisor)                                                | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Routing and resilience   | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxies and networking   | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, tunnel modules                                 | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Jobs and scheduling      | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Observability and export | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| CLI and IDE integration  | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Context sources          | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Other features           | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Top-level modules worth knowing:

| File                                                           | Purpose                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Response caching and idempotency                               |
| `webhookDispatcher.ts`                                         | HMAC-signed webhook delivery                                   |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Tunnel managers                                                |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Background credential health checks and refresh circuit        |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Streaming response sanitizers                                  |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Process lifecycle                                              |
| `*.stub.ts`                                                    | Build-profile stubs swapped in by aliases in `next.config.mjs` |

### `src/lib/db/` — database

| Path                  | Purpose                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL journaling)                                                                                |
| `db/migrations/`      | Numbered, idempotent `.sql` migrations (236 files at the time of writing; `check-migration-numbering.mjs` guards numbering) |
| `db/migrationRunner/` | Migration runner                                                                                                            |
| `db/adapters/`        | SQLite driver adapters (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                    |
| `db/repositories/`    | SQLite repository implementations (combos, playground presets, routing config)                                              |
| `db/<domain>.ts`      | About 175 domain modules (providers, combos, apiKeys, settings, usage, …) — always import these directly                    |

### `src/domain/`, `src/server/`, `src/shared/`

| Path                                                           | Purpose                                                                                                                                                   |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Policy engine                                                                                                                                             |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Fallback decisions, lockout policy, cost rules                                                                                                            |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Quota cache and snapshot persistence                                                                                                                      |
| `domain/assessment/`                                           | Model assessment (assessor, categorizer, self-healer)                                                                                                     |
| `server/authz/`                                                | Authorization pipeline and route guard (`routeGuard.ts`) — see [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS origin resolution and CORS — see [CORS.md](../security/CORS.md)                                                                             |
| `server/ws/`                                                   | Live dashboard WebSocket server                                                                                                                           |
| `shared/components/`                                           | Dashboard components and adapters over `packages/ui-kit` — see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                       |
| `shared/constants/`                                            | Provider catalog (`providers.ts`), routing strategies, CLI tools, icon map, upstream header denylist, …                                                   |
| `shared/validation/`                                           | Zod schemas and validation helpers                                                                                                                        |
| `shared/utils/`                                                | Circuit breaker, API-key auth, fetch timeouts, feature flags, …                                                                                           |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Chat admission middleware, network helpers, client services, React hooks                                                                                  |

---

## `open-sse/` — streaming engine workspace

npm workspace `@omniroute/open-sse` (about 2,390 tracked files). It does the request processing
and provider execution. Overview: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

```
open-sse/
├── handlers/       # Request handlers: chatCore.ts + chatCore/, responses, embeddings, audio, imageGeneration/,
│                   #   videoGeneration/, search/, fal/, mediaGeneration/, sseParser/, responseSanitizer/, …
├── executors/      # Provider-specific HTTP dispatch, registered in executors/registry.ts; base/ holds shared recovery helpers
├── translator/     # Format conversion: request/, response/, helpers/, image/, registry.ts, bootstrap.ts
├── transformer/    # responsesTransformer.ts (Responses API ↔ Chat Completions TransformStream)
├── services/       # Combo routing, rate limits, fallback, caching, usage, token refresh, compression (see below)
├── config/         # Provider registry (config/providers/registry/<id>/), constants, model/media registries
├── mcp-server/     # MCP server: tools/, schemas/, toolSearch/, transports, audit, scopes, __tests__/
├── utils/          # Stream, error, TLS, proxy-fetch and logging utilities
├── vendor/         # codex-chatgpt-web/ — vendored adapter (provenance in vendor.json)
├── lib/            # DeepSeek proof-of-work worker and hash
├── shared/         # zedAuth.ts
├── index.ts        # Workspace entry
└── package.json · tsconfig.json · types.d.ts
```

### `open-sse/services/`

| Path                                                                                           | Purpose                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Combo routing strategies — see [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                    |
| `autoCombo/`                                                                                   | Auto-Combo scoring and mode packs                                                                                                                           |
| `accountFallback.ts` + `accountFallback/`                                                      | Connection cooldown and model lockout — see [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                      |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Rate-limit tracking and header parsing                                                                                                                      |
| `compression/`                                                                                 | Compression engines (`engines/`), rule packs (`rules/`), `eval/`, `harness/`, `riskGate/` — see [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Token refresh, usage accounting, caching, admission lanes, session pools, Codex accounts, routing helpers                                                   |
| `__tests__/`                                                                                   | Co-located Vitest suites (collected by the Vitest configs)                                                                                                  |
| `AGENTS.md`                                                                                    | Agent guide for this folder                                                                                                                                 |

Pattern: a large module `X.ts` next to a folder `X/` means the module was split into smaller files
(`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Path                  | Purpose                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `server.ts`           | MCP server lifecycle                                                                             |
| `httpTransport.ts`    | Streamable HTTP and SSE transports                                                               |
| `scopeEnforcement.ts` | Per-tool scope checks                                                                            |
| `audit.ts`            | Tool-call audit logging                                                                          |
| `schemas/`            | Tool definitions and scopes                                                                      |
| `tools/`              | Tool implementations (memory, skills, compression, …)                                            |
| `toolSearch/`         | Tool search                                                                                      |
| `README.md`           | Internal architecture notes; the full catalog is in [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm workspaces

| Path                     | Purpose                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: vendored snapshot of the Keak CI UI Kit, consumed as source. `UPSTREAM.md` pins the upstream commit, `PATCHES.md` lists local patches. `src/` is synced only by `scripts/dev/sync-ui-kit.sh` and guarded by `npm run check:ui-kit-snapshot`. See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: browser-pool interfaces and implementation (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Listed in `workspaces`; the runtime browser pool used by the gateway lives in `open-sse/services/`                                                |

## `@omniroute/` — separately published packages

These are not npm workspaces. Each has its own `package.json` and lockfile; the folder ships in the
`omniroute` tarball (`files: ["@omniroute/"]`).

| Path                             | Purpose                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | OpenCode plugin (model discovery, `/connect` auth); used by `omniroute setup-opencode` — see [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin for the v2 Promise API — see [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                 |
| `@omniroute/opencode-provider/`  | Static config generator; marked deprecated in its own `package.json` in favor of `opencode-plugin`                                    |

---

## `bin/` — CLI and ops scripts

| Path                                                                        | Purpose                                                                                    |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                             | Main CLI entry (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)             |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binary                                                          |
| `mcp-server.mjs`                                                            | MCP stdio entry point                                                                      |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Auxiliary bridge / MCP entry points                                                        |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM resolve hook that maps tsconfig path aliases for global installs                       |
| `nodeRuntimeSupport.mjs`                                                    | Supported Node.js version check                                                            |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Self-host incident-recovery scripts (share `_ops-common.sh`)                               |
| `cold-start-bench.sh`                                                       | Cold-start benchmark — see [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                     |
| `cli/commands/`                                                             | One module per CLI command (about 100, including the `setup-*` integrations)               |
| `cli/api-commands/`                                                         | Generated from `docs/openapi.yaml` by `npm run build:cli-api` — do not edit                |
| `cli/locales/`                                                              | CLI message catalogs (67 locales)                                                          |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                |
| `cli/tray/`                                                                 | System tray and autostart (Windows PowerShell backend, systray on macOS/Linux)             |
| `cli/runtime/`                                                              | Native runtime resolution (`sqliteRuntime.mjs`, `magicBytes.mjs`), process supervisor      |
| `cli/*.mjs`                                                                 | Shared helpers (args, API client, data dir, encryption, provider store, settings store, …) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI internals and conventions                                                              |

See [CLI-TOOLS.md](../reference/CLI-TOOLS.md) and [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — desktop app

| Path                                                       | Purpose                                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `main.js`                                                  | Electron main process (window, embedded server, tray, updates)                 |
| `preload.js`                                               | IPC bridge exposed to the renderer                                             |
| `lib/`                                                     | Window lifecycle, server readiness, health watchdog, remote-server preferences |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Remote-server prompt window                                                    |
| `processTree.js`, `sqlite-inspection.js`                   | Child-process cleanup and SQLite inspection helpers                            |
| `package.json` / `package-lock.json`                       | electron-builder config and Electron dependencies                              |
| `assets/`                                                  | App and tray icons (`.ico`, `.icns`, `.png`)                                   |
| `README.md`                                                | Internal notes — see [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)          |

## `public/` — static assets

| Path                                        | Purpose                                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Provider logos loaded by id (`/providers/<id>.svg`); provenance in `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Browser and PWA icons                                                                                                |
| `sw.js`                                     | Service worker — see [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                          |
| `openapi.yaml`                              | Copy of `docs/openapi.yaml` generated by `npm run gen:public-openapi`                                                |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flow diagrams, sponsor banner, README artwork                                                                   |

## `skills/` — Agent Skills

46 skills, one folder each with a `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`),
plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` reads them at runtime and exposes them
through `/api/agent-skills`, MCP and A2A. Most manifests are generated by
`src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`;
`npm run check:agent-skills-sync` checks for drift). See
[AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — build, gates and tooling

About 435 tracked files. New scripts go in one of the subfolders allowed by `AGENTS.md`; one-off code goes in `scripts/ad-hoc/`.

```
scripts/
├── check-permissions.sh   # Container ENTRYPOINT (copied to /app by the Dockerfile)
├── postinstall.mjs        # Native-runtime warm-up run after scripts/build/postinstall.mjs
├── start-ws-server.mjs    # Starts the live-dashboard WebSocket server as a separate process
├── build/                 # Build, standalone assembly, npm pack/publish, postinstall, MITM, Electron prep
├── check/                 # Quality gates behind most `npm run check:*` scripts; lib/ holds shared helpers
├── quality/               # Ratchets, gate manifest, impact map, mutation tooling, release acceptance
├── ci/                    # Steps invoked only by workflows (Docker publish, Release-Green, scanners)
├── dev/                   # Dev runners (run-next, Playwright/protocol/ecosystem runners) and runtime helpers shipped in the package
├── docs/                  # README SVG/diagram generators, OpenAPI module, provider reference, wiki sync
├── i18n/                  # UI and docs translation pipeline, coverage checks, glossary/, lib/
├── release/               # Changelog aggregation, contributors, merge train, LTS cut, publish verification
├── ops/                   # Canary deploy, OpenCode free relay, runner janitor, allowlist sync
├── perf/                  # Benchmarks and one-off performance A/B scripts
├── cli/                   # CLI tooling (API-command generator, SSO, CLI smoke tests, media MCP)
├── homolog/               # Homologation against a running instance + promptfoo config generation
├── features/              # Feature-triage engine and its lib/
├── router-eval/           # Offline router evaluation (`npm run eval:router*`)
├── compression/           # Compression benchmark (`npm run bench:compression`, runs on Bun)
├── compression-eval/      # Compression quality evaluation (`npm run eval:compression`)
├── devin-bridge/          # Shell entry points for the Devin bridge (build, launch, tests)
├── docker/                # Base-path patching for the standalone server inside containers
├── integrations/          # MarkItDown MCP launchers — see docs/integrations/MARKITDOWN_MCP.md
├── launchers/             # Double-click launchers and desktop-shortcut creators (Windows/macOS/Linux)
├── packs/                 # Optional-pack manifest and installer (shipped in the npm package)
├── test/                  # Live smoke scripts (combo-live, OpenCode/ChatGPT Web)
├── sre/                   # On-call rotation, log redaction, TCP close analyzer
├── vps/                   # Start/stop the release runner
├── skills/                # Agent Skills generator CLI
├── research/              # Free-tier budget card SVG generator
└── ad-hoc/                # One-shot diagnostics and migrations
```

Frequently used entry points:

| Script                                                              | Purpose                                                                                              |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` runner                                                                   |
| `build/build-next-isolated.mjs`                                     | `npm run build` (Next.js standalone build)                                                           |
| `build/prepublish.ts`                                               | `npm run build:cli`: assembles the npm `dist/`                                                       |
| `build/postinstall.mjs`                                             | npm `postinstall` hook                                                                               |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                         |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenerates PROVIDER_REFERENCE.md)                                 |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (generates `src/app/docs/lib/openapi.generated.ts`)                                  |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (docs mirrors)                                                                    |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                            |
| `release/aggregate-changelog.mjs`                                   | Folds `changelog.d/` fragments into `CHANGELOG.md`                                                   |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (doc accuracy gate)                                                  |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blocks tracked root `_*` paths)                                   |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metric ratchet against `config/quality/`)                                 |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                   |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                               |
| `dev/new-worktree.sh`                                               | Creates an isolated development worktree — see [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Syncs `packages/ui-kit/src` to a pinned upstream commit                                              |

Gate inventory and policies: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — versioned configuration and gate state

| Path                                     | Purpose                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Supported locales (source of the locale count) and their schema                                                 |
| `payloadRules.json`                      | Upstream payload rules (`open-sse/services/payloadRules.ts`)                                                    |
| `cli-tools-manifest.json`                | Manifest of integrable CLI tools (`bin/cli/cli-manifest.mjs`)                                                   |
| `alibaba-free-tier-allowlist.json`       | Alibaba free-tier model allowlist                                                                               |
| `ci/toolchain.json`                      | CI toolchain versions                                                                                           |
| `quality/quality-baseline.json`          | Multi-metric ratchet baseline (coverage, warnings, duplication, …)                                              |
| `quality/*-baseline.json`                | Frozen baselines for individual gates (complexity, duplication, file size, typecheck slices, test discovery, …) |
| `quality/*-allowlist.json`               | Gate allowlists (dependencies, licenses, AI attribution, forgotten-sibling tests, …)                            |
| `quality/eslint-suppressions.json`       | Frozen ESLint suppressions applied by `npm run lint`                                                            |
| `quality/gate-manifest.json`             | Gate manifest checked by `scripts/quality/gate-manifest.mjs`                                                    |
| `quality/vitest-exclusions.json`         | Quarantine inventory for `vitest.quarantine.config.ts`                                                          |
| `quality/skill-templates/`               | Canonical SKILL.md templates checked by `scripts/quality/check-skill-contract.mjs`                              |
| `quality/release-acceptance.schema.json` | Release-acceptance evidence schema — see [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)           |
| `release/`                               | Changelog reconciliations and the wreq-js native manifest, license inventory and notices                        |

## `changelog.d/` — changelog fragments

A PR adds one fragment instead of editing `CHANGELOG.md`: `features/`, `fixes/` or `maintenance/`,
named `<PR-number>-<slug>.md`. At release time `scripts/release/aggregate-changelog.mjs` folds
them into `CHANGELOG.md` and deletes them; `npm run check:changelog-integrity` validates them.
Details in `changelog.d/README.md`.

---

## `docs/` — public documentation

Sections listed in `source.config.ts` compile into the `/docs` site (with a few operator-only
security pages excluded); `docs/meta.json` sets the sidebar order. Start at [README.md](../README.md).

| Path               | Contents                                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/` | Quick start, self-host, providers, free tiers, Auto-Combo and web-cookie guides                                                                       |
| `guides/`          | Operator and developer guides: setup, Docker, Electron, PWA, Termux, CLIs, i18n, troubleshooting, user guide                                          |
| `architecture/`    | Architecture, codebase reference, modification recipes, authz, resilience, quality gates, design system, this map                                     |
| `reference/`       | API reference, environment variables, feature flags, CLI tools, free tiers, generated provider reference, removed providers                           |
| `frameworks/`      | MCP, A2A, ACP, skills, memory, plugins, cloud agents, webhooks, evals, log export, Radar, Playground, …                                               |
| `routing/`         | Auto-Combo, reasoning replay/routing, quota share, subscription ladder, strict zero-cost, …                                                           |
| `security/`        | Guardrails, error sanitization, CORS, SSO, egress policy, route-guard tiers, supply chain, …                                                          |
| `compression/`     | Compression guide, engines, RTK, rule format, language packs, context editing                                                                         |
| `ops/`             | Release flow, branching, merge train, deployment (VM, Fly.io, Kubernetes), database, proxies, worktrees, Hard Rules detail                            |
| `providers/`       | Per-provider guides (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                             |
| `comparison/`      | OmniRoute compared with alternatives                                                                                                                  |
| `integrations/`    | Integration notes (fal.ai native, MarkItDown MCP); not compiled into `/docs`                                                                          |
| `openapi.yaml`     | OpenAPI source; feeds `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` and `bin/cli/api-commands/`                                      |
| `diagrams/`        | Mermaid sources (`.mmd`), rendered SVGs (`exported/`) and README SVGs from `scripts/docs/gen-readme-*`                                                |
| `assets/`          | Language-flag SVGs and other README assets                                                                                                            |
| `screenshots/`     | Screenshots used by the README and guides                                                                                                             |
| `i18n/`            | Translated mirrors: one folder per locale (66) with root docs and a `docs/` subset; produced by `npm run i18n:run` — see [I18N.md](../guides/I18N.md) |
| top-level `*.md`   | `README.md` (doc index), `DEVELOPER-ENVIRONMENT.md` and a few standalone notes                                                                        |

Key entry points: [ARCHITECTURE.md](ARCHITECTURE.md),
[CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md),
[MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md),
[ENVIRONMENT.md](../reference/ENVIRONMENT.md),
[PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generated by
`npm run gen:provider-reference`).

---

## `tests/` — test suites

About 9,670 tracked files. Test files belong here, not in the project root. Exceptions: the
co-located `__tests__/` folders in `src/` and `open-sse/` that the Vitest configs collect.

| Path                                                   | Contents                                                                                                                                                                     | Runner                                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Unit tests (over 9,000 files): many at the top level, plus domain folders (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Node test runner (`npm run test:unit`); `*.tsx` via `test:vitest:ui`                    |
| `tests/unit/serial/`                                   | CPU-sensitive tests run with concurrency 1                                                                                                                                   | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suites inside the unit tree                                                                                                                                           | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Multi-module and DB integration tests; `combo-matrix/`, `combo-live/`, `services/`                                                                                           | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + live suites `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                         | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` against a running instance                                                                                                                                  | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologation suites (`api/`, `ui/` with its own Playwright config)                                                                                                           | `npm run homolog` — see [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                       |
| `tests/load/`                                          | Load and soak scripts (k6)                                                                                                                                                   | Nightly resilience workflow                                                             |
| `tests/_setup/`                                        | `--import` / setup files (isolated data dir, egress guard, Vitest UI polyfills)                                                                                              | Loaded by the runners                                                                   |
| `tests/_helpers/`, `tests/helpers/`                    | Shared test helpers (golden snapshots, management session, …)                                                                                                                | Imported by tests                                                                       |
| `tests/fixtures/`                                      | Fixture data and child-process fixtures                                                                                                                                      | Imported by tests                                                                       |
| `tests/snapshots/`                                     | Golden files for `tests/helpers/goldenSnapshot.ts`                                                                                                                           | Imported by tests                                                                       |
| `tests/manual/`                                        | `.http` files for manual REST calls                                                                                                                                          | Manual                                                                                  |
| `tests/security/`                                      | Security shell scripts                                                                                                                                                       | Manual / unit-test fixtures                                                             |
| `tests/types/`                                         | Type-level contract fixtures                                                                                                                                                 | —                                                                                       |

Full matrix: `CONTRIBUTING.md` → "Running Tests" and [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Path                                               | Purpose                                                                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `deploy/helm/omniroute/`                           | Helm chart (`Chart.yaml`, `values.yaml`, templates for deployment, service, ingress, PVC, secret, configmap) |
| `deploy/kubernetes/base/`                          | Kustomize base (namespace, deployment, service, PVC, configmap, `secret.example.yaml`)                       |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Cluster-specific overlays (ingress, storage class, resources, probes)                                        |

See [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — auxiliary images

| Path                                | Purpose                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `docker/chatgpt-web-codex-browser/` | Headless browser image with a CDP proxy for the ChatGPT Web executor — see [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin bridge image, compose file, mocks and network guard                                                                |
| `docker/vnc-browser/`               | Chromium with VNC for interactive browser sessions                                                                       |

The main image is the root `Dockerfile`; see [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## `contrib/` — community recipes (not officially supported)

| Path                    | Purpose                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `contrib/podman/`       | Podman quadlets (container, volume, network, Redis)                                                                            |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                            |
| `contrib/windows/`      | `.bat` launchers for running from a Windows checkout                                                                           |
| `contrib/session-sync/` | README for a third-party session-sync browser extension — see [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Path                            | Purpose                                                                  |
| ------------------------------- | ------------------------------------------------------------------------ |
| `examples/omniroute-cmd-hello/` | Minimal command plugin — see [PLUGINS.md](../frameworks/PLUGINS.md)      |
| `examples/plugins/`             | Example plugins: langfuse, request-logger, theme-manager, welcome-banner |
| `examples/quickstart/`          | Client snippets: curl, Node.js (axios), PHP, Python                      |

---

## `.github/` — GitHub integration

| Path                                                         | Purpose                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), security scans (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), scheduled `nightly-*.yml` suites, publishing (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), release and maintenance workflows |
| `.github/actions/npm-ci-retry/`                              | Composite action: `npm ci` with cache and retry                                                                                                                                                                                                                               |
| `.github/actions/prepare-unit-storage/`                      | Composite action: frees runner disk space, then installs dependencies                                                                                                                                                                                                         |
| `.github/ISSUE_TEMPLATE/`                                    | Bug, feature and test-coverage issue forms                                                                                                                                                                                                                                    |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Default PR template plus bugfix/feature variants                                                                                                                                                                                                                              |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Code owners, sponsorship links, dependency updates                                                                                                                                                                                                                            |
| `.github/labels.yml`                                         | Label definitions applied by `npm run labels:sync`                                                                                                                                                                                                                            |
| `.github/copilot-instructions.md`                            | GitHub Copilot instructions (an agent-instruction surface)                                                                                                                                                                                                                    |

CI job map: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git hooks

| File         | Purpose                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Git identity check, lint-staged, gate manifest, docs sync, any-budget, type-scale ratchet, tracked-artifacts and ui-kit snapshot checks |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` on the commit message                                                                          |
| `pre-push`   | Intentionally light: a PATH/npm sanity check that exits 0                                                                               |

The hook runtime in `.husky/_/` is generated on install and is not tracked.

---

## Navigation tips

- **New contributor?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Changing something common** (provider, route, DB module, MCP tool, A2A skill)? Follow [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Adding a provider?** Check [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) first, then cross-check [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Running locally?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Deploying?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Releasing?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **A quality gate failed?** [QUALITY_GATES.md](QUALITY_GATES.md) and [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
