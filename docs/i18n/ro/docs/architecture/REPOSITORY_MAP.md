# Repository Map (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Ce trăiește unde: fiecare director de nivel superior urmărit și fișier rădăcină, cu un scop de o singură linie.** Ultima actualizare: 2026-11-13 (OmniRoute v3.8.54)
>
> Utilizați această hartă pentru a vă găsi drumul în baza de cod, apoi urmați linkurile către documentele dedicate. Numărările de fișiere au fost măsurate cu `git ls-files` la data de mai sus. Se schimbă cu aproape fiecare lansare, așa că tratați-le ca ordine de mărime.

## Arborele de nivel superior

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

Căi locale, generate sau private (toate gitignorate, niciodată comise, nedescrise în continuare):

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

## Fișierele rădăcină

Toate fișierele urmărite la rădăcina depozitului (`git ls-files | grep -v /`), grupate după funcție.

### Documentatia proiectului

| Fişier                   | Scop                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `README.md`              | Pagina de destinație: prezentare generală a caracteristicilor, pornire rapidă, metode de instalare |
| `CHANGELOG.md`           | Jurnalul de modificări per lansare (fragmentele din `changelog.d/` sunt pliate aici)               |
| `ROADMAP.md`             | Foaia de parcurs public                                                                            |
| `LICENSE`                | licență MIT                                                                                        |
| `THIRD_PARTY_NOTICES.md` | Notificări pentru codul grupat terță parte (de exemplu, legările wreq-js)                          |
| `CONTRIBUTING.md`        | Ghid pentru colaboratori: configurare, comiteri convenționale, matrice de testare, flux PR         |
| `SECURITY.md`            | Politica de raportare a vulnerabilităților                                                         |
| `CODE_OF_CONDUCT.md`     | Așteptările de comportament ale comunității                                                        |
| `llm.txt`                | Rezumat al proiectului în text simplu pentru crawlerele și asistenții LLM                          |

### Instrucțiuni pentru asistentul AI

| Fişier      | Scop                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Sursă unică de adevăr pentru fiecare asistent AI : convenții, porți de calitate, reguli stricte |
| `CLAUDE.md` | Claude Code-delte specifice; importuri `AGENTS.md`                                              |
| `GEMINI.md` | Delte specifice gemenilor; indică înapoi la `AGENTS.md`                                         |

Ghiduri imbricate există și lângă codul pe care îl descriu: `open-sse/services/AGENTS.md` și `src/lib/db/AGENTS.md`.

### Manifestele pachetului și lanțul de instrumente Node

| Fişier                     | Scop                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `package.json`             | Manifest npm: scripturi, dependențe, `engines`, `workspaces`, `files` publicat            |
| `package-lock.json`        | Arborele de dependență blocat                                                             |
| `pnpm-workspace.yaml`      | Lista de spațiu de lucru pnpm (`packages/*`, `open-sse`) și lista de permise native-build |
| `.npmrc` / `.npmignore`    | npm config și publică excluderi                                                           |
| `.node-version` / `.nvmrc` | Pinuri pentru versiunea nodului pentru managerii de versiuni                              |
| `flake.nix` / `flake.lock` | Nix dev shell și blocarea acestuia                                                        |
| `Makefile`                 | Comenzi rapide `make` care deleg script-urile npm                                         |

### TypeScript, Next.js și docs build

| Fişier                                    | Scop                                                                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Configurația TypeScript de bază și aliasurile de cale (`@/*`, `@omniroute/open-sse`)     |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` felie                                                           |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (strict `noImplicitAny`) felie                       |
| `tsconfig.typecheck-api.json`             | Secțiune de verificare a tipului rutei API (`scripts/check/check-api-typecheck.mjs`)     |
| `tsconfig.typecheck-dashboard.json`       | Secțiune de verificare a tipului tabloului de bord (`npm run check:dashboard-typecheck`) |
| `tsconfig.build.json`                     | Verificare tip producție (`npm run typecheck:build`, `check:build-typecheck`)            |
| `tsconfig.mitm.json`                      | MITM build config folosit de `scripts/build/buildMitm.mjs`                               |
| `next.config.mjs`                         | Next.js 16 config (ieșire independentă, aliasuri de profil de compilare)                 |
| `source.config.ts`                        | Fumadocs `defineDocs` config: care secțiuni `docs/` sunt compilate în `/docs`            |
| `postcss.config.mjs`                      | conductă PostCSS / Tailwind                                                              |

### Lint și formatare

| Fişier                                    | Scop                                                                                                                  |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Configurație plată principală ESLint (`npm run lint`, cu `config/quality/eslint-suppressions.json`)                   |
| `eslint.complexity-ratchets.config.mjs`   | Configurație autonomă utilizată de clichetele de complexitate și complexitate cognitivă într-o singură trecere ESLint |
| `eslint.complexity.config.mjs`            | Configurație autonomă cu numai `complexity` + `max-lines-per-function` de bază (utilizat de teste)                    |
| `prettier.config.mjs` / `.prettierignore` | regulile și excluderile Prettier                                                                                      |
| `.editorconfig`                           | Valori implicite ale editorului (indentație cu două spații)                                                           |
| `.markdownlint.json`                      | Reducere de scame (`npm run lint:md`)                                                                                 |
| `.vale.ini`                               | Advisory prose lint (`npm run lint:prose`), vocabular în `.vale/`                                                     |

### Teste, evaluare și acoperire

| Fişier                        | Scop                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (tabloul de bord `.tsx`, hooks, teste memory/skills ) |
| `vitest.mcp.config.ts`        | Suită Node Vitest : `npm run test:vitest` (server MCP, autoCombo, combo, API `.spec.ts`)           |
| `vitest.quarantine.config.ts` | Rulează fișierele puse în carantină listate în `config/quality/vitest-exclusions.json`             |
| `vitest.e2e-live.config.ts`   | Suite Vitest server live (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`)     |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                      |
| `stryker.conf.mjs`            | Testarea mutației Stryker (`npm run test:mutation`; calculează `tap.testFiles` din `mutate`)       |
| `stryker.disablebail.mjs`     | Varianta Stryker fără cauțiune, pentru măsurarea redundanței test                                  |
| `promptfooconfig.yaml`        | promptfoo LLM-suite de securitate                                                                  |
| `codecov.yml`                 | Setări de acoperire a patch-urilor Codecov                                                         |

### Docker și desfășurare

| Fişier                            | Scop                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `Dockerfile`                      | Imagine în mai multe etape (`builder` → `runner-base` → `runner-web` / `runner-cli*`) |
| `Dockerfile.bun`                  | Imagine alternativă pe Bun runtime (construită de `docker-publish.yml`)               |
| `docker-compose.yml`              | Compunere implicită cu profiluri (bază, web, cli, gazdă, memorie, cliproxyapi, …)     |
| `docker-compose.prod.yml`         | Instanță separată de instantaneu de producție pe portul 20130                         |
| `docker-compose.selfhost.yml`     | Auto-gazdă loopback cu o singură comandă (perechi cu `.env.selfhost.example`)         |
| `docker-compose.ollama-local.yml` | Docker OmniRoute vorbește cu un Ollama nativ gazdă                                    |
| `.dockerignore`                   | Docker excluderi de context de compilare                                              |
| `fly.toml`                        | Configurare aplicație Fly.io (port 20128, volum `/data` )                             |

### Securitate, lanț de aprovizionare și roboți de depozit

| Fişier                                       | Scop                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | regulile de scanare secretă și listele permise gitleaks                                           |
| `.trivyignore`                               | Suprimarea riscurilor acceptate pentru scanarea imaginii containerului                            |
| `.zizmor.yml`                                | zizmor GitHub Acțiuni config. audit de securitate                                                 |
| `socket.yml`                                 | Configurarea aplicației Socket.dev (calea ignoră; nu o poartă CI )                                |
| `sonar-project.properties`                   | Configurarea proiectului SonarQube/SonarCloud                                                     |
| `knip.json`                                  | Knip files/exports/deps config neutilizat (alimentează `npm run check:dead-code`)                 |
| `.size-limit.json`                           | Bugete de dimensiunea pachetului                                                                  |
| `.mergify.yml`                               | Îmbinați configurația cozii de îmbinare                                                           |
| `.coderabbit.yaml`                           | CodeRabbit review config                                                                          |
| `.cbmignore`                                 | Ignorați lista pentru indexul codului codebase-memory-mcp                                         |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorați regulile, sfârșiturile de linie LF pentru scripturi, identitățile canonice ale autorului |

### Șabloane de mediu, stare și fluxuri

| Fişier                      | Scop                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| `.env.example`              | Șablon copiat în `.env` la prima instalare; lista de referință a vars |
| `.env.selfhost.example`     | Șablon pentru `docker-compose.selfhost.yml`                           |
| `.env.homolog.example`      | Șablon pentru omologare alergător (`npm run homolog`)                 |
| `.env.devin-bridge.example` | Exemplu de fișier env pentru configurarea podului Devin               |
| `.i18n-state.json`          | Stare de traducere incrementală (hash sursă pe document și local)     |
| `news.json`                 | Flux de anunțuri localizat (schema v2) citit de tabloul de bord       |

---

## aplicație `src/` — Next.js

Aproximativ 4.550 de fișiere urmărite. Alias de cale `@/*` → `src/*`.

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

| Cale                                                                | Scop                                                                                                                                                                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | API public compatibil cu OpenAI: chat, completări, răspunsuri, mesaje, încorporare, imagini, audio, videoclipuri, muzică, reclasificare, moderare, căutare, fișiere, loturi, ws, modele, …           |
| `app/api/v1beta/`                                                   | Puncte finale în stil Gemeni                                                                                                                                                                         |
| `app/api/` (alte foldere)                                           | Rute de gestionare și administrare: furnizori, combo-uri, setări, chei, utilizare, jurnale, mcp, a2a, acp, memorie, competențe, evaluări, webhook-uri, tuneluri, plugin-uri, radar, instrumente, ... |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — vezi [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                           |
| `app/api/tools/traffic-inspector/`                                  | Inspector de trafic REST API — vezi [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                       |
| `app/(dashboard)/dashboard/`                                        | Un folder per secțiune de tablou de bord (furnizori, combo-uri, jurnale, utilizare, costuri, cache, compresie, memorie, loc de joacă, instrumente de căutare, setări, instrumente etc.)              |
| `app/(dashboard)/home/`                                             | Ecranul de pornire și widget-urile acestuia                                                                                                                                                          |
| `app/docs/`                                                         | Vizualizatorul de documente care redă secțiunile Fumadocs enumerate în `source.config.ts`                                                                                                            |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Aspect rădăcină, intrare rădăcină (redirecționări), manifest PWA, CSS global                                                                                                                         |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Limite de eroare și alternative                                                                                                                                                                      |

rutele API urmează `Route → CORS → Zod validation → optional auth → policy → handler`; vezi [ARCHITECTURE.md](ARCHITECTURE.md) si [API_REFERENCE.md](../reference/API_REFERENCE.md).

### biblioteci de server `src/lib/` —

Aproximativ 90 de subfoldere plus aproximativ 90 de module de nivel superior. Grupe principale:

| Zonă                          | Foldere / fișiere                                                                                                   | Scufundare adâncă                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Baza de date                  | module de domeniu `db/` —, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                          | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Utilizare, cotă și cheltuieli | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Furnizori și modele           | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth și acreditările         | `oauth/` (furnizori/, servicii/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`                  | `resolvePublicCred()` (document de operator, nu este difuzat public)                                                                           |
| Siguranță și guvernare        | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Caracteristicile agentului    | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Pluginuri și servicii         | `plugins/`, `services/` (instalatori și supervizor de servicii încorporate)                                         | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Rutare și rezistență          | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxy și rețele               | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, module tunel                                   | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Locuri de munca si programare | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Observabilitate și export     | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| integrarea CLI și IDE         | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Surse de context              | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Alte caracteristici           | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Module de nivel superior care merită cunoscute:

| Fişier                                                         | Scop                                                                          |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Cacheul de răspuns și idempotenta                                             |
| `webhookDispatcher.ts`                                         | Livrare webhook semnat HMAC                                                   |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Administratorii de tuneluri                                                   |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Verificări de sănătate a acreditărilor de fundal și circuit de reîmprospătare |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Dezinfectanți de răspuns în flux                                              |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Ciclul de viață al procesului                                                 |
| `*.stub.ts`                                                    | Stub-uri de profil de compilare schimbate prin aliasuri în `next.config.mjs`  |

### baza de date `src/lib/db/` —

| Cale                  | Scop                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (înregistrare WAL )                                                                                   |
| `db/migrations/`      | Migrații `.sql` numerotate, idempotente (236 de fișiere la momentul scrierii; numerotarea `check-migration-numbering.mjs` guards) |
| `db/migrationRunner/` | alergător de migrație                                                                                                             |
| `db/adapters/`        | adaptoare driver SQLite (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                         |
| `db/repositories/`    | Implementări ale depozitului SQLite (combo, presetări pentru teren de joacă, configurație de rutare)                              |
| `db/<domain>.ts`      | Aproximativ 175 de module de domeniu (furnizori, combo, apiKeys, setări, utilizare, …) — le importă întotdeauna direct            |

### `src/domain/`, `src/server/`, `src/shared/`

| Cale                                                           | Scop                                                                                                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `domain/policyEngine.ts`                                       | Motor de politici                                                                                                                                      |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Deciziile de rezervă, politica de blocare, regulile de cost                                                                                            |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Cote cache și persistență instantanee                                                                                                                  |
| `domain/assessment/`                                           | Evaluare model (evaluator, clasificator, auto-vindecător)                                                                                              |
| `server/authz/`                                                | Autorizare conductă și pază traseu (`routeGuard.ts`) — vezi [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | rezoluția originii Public/MCP/WS și CORS — vezi [CORS.md](../security/CORS.md)                                                                         |
| `server/ws/`                                                   | Tabloul de bord live WebSocket server                                                                                                                  |
| `shared/components/`                                           | Componentele tabloului de bord și adaptoarele peste `packages/ui-kit` — vezi [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                      |
| `shared/constants/`                                            | Catalog de furnizori (`providers.ts`), strategii de rutare, instrumente CLI, hartă cu pictograme, listă de respingere a antetului în amonte, …         |
| `shared/validation/`                                           | scheme Zod și ajutoare de validare                                                                                                                     |
| `shared/utils/`                                                | Întrerupător de circuit, autentificare cheie API, expirări de preluare, semnalizatoare de caracteristică,...                                           |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Middleware de admitere chat, ajutoare de rețea, servicii pentru clienți, cârlige React                                                                 |

---

## `open-sse/` — motor de streaming spațiu de lucru

npm workspace `@omniroute/open-sse` (aproximativ 2.390 de fișiere urmărite). Ea face procesarea cererii și executarea furnizorului. Prezentare generală: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Cale                                                                                           | Scop                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Strategii de rutare combinate — vezi [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                       |
| `autoCombo/`                                                                                   | Pachete de scoruri și moduri auto-combo                                                                                                                              |
| `accountFallback.ts` + `accountFallback/`                                                      | Răcirea conexiunii și blocarea modelului — vezi [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                           |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Urmărirea limitelor de rată și analizarea antetului                                                                                                                  |
| `compression/`                                                                                 | Motoare de compresie (`engines/`), pachete de reguli (`rules/`), `eval/`, `harness/`, `riskGate/` — vezi [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Reîmprospătare jetoane, contabilitate de utilizare, stocare în cache, benzi de admitere, grupuri de sesiuni, conturi Codex, ajutoare de rutare                       |
| `__tests__/`                                                                                   | Suite Vitest amplasate în comun (colectate de configurațiile Vitest )                                                                                                |
| `AGENTS.md`                                                                                    | Ghidul agentului pentru acest folder                                                                                                                                 |

Model: un modul mare `X.ts` lângă un folder `X/` înseamnă că modulul a fost împărțit în fișiere mai mici (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Cale                  | Scop                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| `server.ts`           | Ciclul de viață al serverului MCP                                                                   |
| `httpTransport.ts`    | Transporturi HTTP și SSE care pot fi transmise în flux                                              |
| `scopeEnforcement.ts` | Verificări ale domeniului per instrument                                                            |
| `audit.ts`            | Jurnalul de auditare a apelurilor de instrumente                                                    |
| `schemas/`            | Definiții și domenii de aplicare a instrumentelor                                                   |
| `tools/`              | Implementări de instrumente (memorie, abilități, compresie, ...)                                    |
| `toolSearch/`         | Căutare instrument                                                                                  |
| `README.md`           | Note de arhitectură internă; catalogul complet este în [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm spații de lucru

| Cale                     | Scop                                                                                                                                                                                                                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: instantaneu vândut al kit-ului Keak CI UI, consumat ca sursă. `UPSTREAM.md` fixează commit-ul din amonte, `PATCHES.md` listează patch-urile locale. `src/` este sincronizat numai de `scripts/dev/sync-ui-kit.sh` și protejat de `npm run check:ui-kit-snapshot`. Vezi [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: interfețe și implementare browser-pool (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Listate în `workspaces`; pool-ul de browser de rulare utilizat de gateway se află în `open-sse/services/`                                                                   |

## `@omniroute/` — pachete publicate separat

Acestea nu sunt spații de lucru npm. Fiecare are propriul `package.json` și fișierul de blocare; folderul este livrat în tarball-ul `omniroute` (`files: ["@omniroute/"]`).

| Cale                             | Scop                                                                                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | plugin OpenCode (descoperire model, autentificare `/connect` ); folosit de `omniroute setup-opencode` — vezi [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin pentru v2 Promise API — vezi [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                                 |
| `@omniroute/opencode-provider/`  | Generator de configurare statică; marcat ca depreciat în propria `package.json` în favoarea `opencode-plugin`                                         |

---

## `bin/` — CLI și scripturi ops

| Cale                                                                        | Scop                                                                                                        |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Intrarea principală CLI (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                     |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binar                                                                            |
| `mcp-server.mjs`                                                            | punctul de intrare MCP stdio                                                                                |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Pod auxiliar / puncte de intrare MCP                                                                        |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM resolve hook care mapează aliasurile căii tsconfig pentru instalări globale                             |
| `nodeRuntimeSupport.mjs`                                                    | Verificare versiune Node.js acceptată                                                                       |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Scripturi de recuperare a incidentelor de auto-găzduire (share `_ops-common.sh`)                            |
| `cold-start-bench.sh`                                                       | Benchmark la pornire la rece — vezi [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                             |
| `cli/commands/`                                                             | Un modul pentru fiecare comandă CLI (aproximativ 100, inclusiv integrările `setup-*` )                      |
| `cli/api-commands/`                                                         | Generat din `docs/openapi.yaml` de `npm run build:cli-api` — nu editați                                     |
| `cli/locales/`                                                              | cataloage de mesaje CLI (67 de localuri)                                                                    |
| `cli/tui/`, `cli/tui-components/`                                           | Terminalul UI                                                                                               |
| `cli/tray/`                                                                 | Tava de sistem și pornire automată (backend Windows PowerShell, systray pe macOS/Linux)                     |
| `cli/runtime/`                                                              | Rezoluție nativă de rulare (`sqliteRuntime.mjs`, `magicBytes.mjs`), supervizor de proces                    |
| `cli/*.mjs`                                                                 | Ajutoare partajate (args, client API, director de date, criptare, magazin furnizor, magazin de setări etc.) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI interne și convenții                                                                                    |

Vezi [CLI-TOOLS.md](../reference/CLI-TOOLS.md) și [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## aplicația desktop `electron/` —

| Cale                                                       | Scop                                                                                                                 |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `main.js`                                                  | Procesul principal Electron (fereastră, server încorporat, tavă, actualizări)                                        |
| `preload.js`                                               | IPC pod expus la redare                                                                                              |
| `lib/`                                                     | Ciclul de viață al ferestrei, pregătirea serverului, supravegherea sănătății, preferințele serverului de la distanță |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Fereastra de prompt pentru server la distanță                                                                        |
| `processTree.js`, `sqlite-inspection.js`                   | Ajutoare pentru curățarea procesului de copii și inspecția SQLite                                                    |
| `package.json` / `package-lock.json`                       | config. electron-builder și dependențele Electron                                                                    |
| `assets/`                                                  | Pictograme pentru aplicații și tavă (`.ico`, `.icns`, `.png`)                                                        |
| `README.md`                                                | Note interne — vezi [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                                                 |

## `public/` — active statice

| Cale                                        | Scop                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `providers/`                                | Siglele furnizorului încărcate de id (`/providers/<id>.svg`); proveniența în `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Pictogramele browser și PWA                                                                                                    |
| `sw.js`                                     | Lucrator service — vezi [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                                 |
| `openapi.yaml`                              | Copie a `docs/openapi.yaml` generată de `npm run gen:public-openapi`                                                           |
| `images/`, `sponsors/`, `deyin.svg`         | Diagrame de flux de niveluri, banner sponsor, opera de artă README                                                             |

## `skills/` — Abilități de agent

46 de abilități, câte un folder cu un `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` le citește în timpul execuției și le expune prin `/api/agent-skills`, MCP și A2A. Majoritatea manifestelor sunt generate de `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` verifică derive). Vezi [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — build, porți și scule

Aproximativ 435 de fișiere urmărite. Scripturile noi merg într-unul dintre subfolderele permise de `AGENTS.md`; codul unic merge în `scripts/ad-hoc/`.

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

Puncte de intrare utilizate frecvent:

| Scenariul                                                           | Scop                                                                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` alergător                                                                        |
| `build/build-next-isolated.mjs`                                     | `npm run build` (construcție independentă Next.js )                                                          |
| `build/prepublish.ts`                                               | `npm run build:cli`: asamblează npm `dist/`                                                                  |
| `build/postinstall.mjs`                                             | npm `postinstall` cârlig                                                                                     |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                                 |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenerează PROVIDER_REFERENCE.md)                                         |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (generează `src/app/docs/lib/openapi.generated.ts`)                                          |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (oglinzi documente)                                                                       |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                                    |
| `release/aggregate-changelog.mjs`                                   | Pliază fragmentele `changelog.d/` în `CHANGELOG.md`                                                          |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (poarta de precizie a documentului)                                          |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blochează căile `_*` rădăcină urmărite)                                   |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (clichet metric față de `config/quality/`)                                         |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                           |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                       |
| `dev/new-worktree.sh`                                               | Creează un arbore de lucru de dezvoltare izolat — vezi [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Sincronizează `packages/ui-kit/src` cu o comitere fixată în amonte                                           |

Inventar porți și politici: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — versiunea configurație și starea porții

| Cale                                     | Scop                                                                                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `i18n.json` / `i18n-schema.json`         | Localizări acceptate (sursa numărului de localități) și schema acestora                                                                                            |
| `payloadRules.json`                      | Reguli de încărcare utilă în amonte (`open-sse/services/payloadRules.ts`)                                                                                          |
| `cli-tools-manifest.json`                | Manifestul instrumentelor integrabile CLI (`bin/cli/cli-manifest.mjs`)                                                                                             |
| `alibaba-free-tier-allowlist.json`       | Lista permisă de modele de nivel gratuit Alibaba                                                                                                                   |
| `ci/toolchain.json`                      | versiuni CI toolchain                                                                                                                                              |
| `quality/quality-baseline.json`          | Linia de bază cu clichet multimetric (acoperire, avertismente, duplicare, …)                                                                                       |
| `quality/*-baseline.json`                | Linii de bază înghețate pentru porțile individuale (complexitate, duplicare, dimensiunea fișierului, secțiuni de verificare a tipului, descoperirea testului, ...) |
| `quality/*-allowlist.json`               | Listele permise de porți (dependențe, licențe, atribuire AI, teste de frați uitați, ...)                                                                           |
| `quality/eslint-suppressions.json`       | Suprimarea ESLint înghețată aplicată de `npm run lint`                                                                                                             |
| `quality/gate-manifest.json`             | Manifestul poarta verificat de `scripts/quality/gate-manifest.mjs`                                                                                                 |
| `quality/vitest-exclusions.json`         | Inventar de carantină pentru `vitest.quarantine.config.ts`                                                                                                         |
| `quality/skill-templates/`               | Șabloane canonice SKILL.md verificate de `scripts/quality/check-skill-contract.mjs`                                                                                |
| `quality/release-acceptance.schema.json` | Schema dovezi de eliberare-acceptare — vezi [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                                                           |
| `release/`                               | Reconcilieri din jurnalul de modificări și manifestul nativ wreq-js, inventarul de licențe și notificări                                                           |

## `changelog.d/` — fragmente de jurnal de modificări

Un PR adaugă un fragment în loc să editeze `CHANGELOG.md`: `features/`, `fixes/` sau `maintenance/`, numit `<PR-number>-<slug>.md`. La momentul lansării, `scripts/release/aggregate-changelog.mjs` le pliează în `CHANGELOG.md` și le șterge; `npm run check:changelog-integrity` le valideaza. Detalii în `changelog.d/README.md`.

---

## `docs/` — documentație publică

Secțiunile enumerate în `source.config.ts` se compilează pe site-ul `/docs` (cu excepția câtorva pagini de securitate numai pentru operator); `docs/meta.json` stabilește ordinea barei laterale. Începe de la [README.md](../README.md).

| Cale                     | Cuprins                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getting-started/`       | Pornire rapidă, auto-găzduire, furnizori, niveluri gratuite, Auto-Combo și ghiduri de cookie-uri web                                                         |
| `guides/`                | Ghiduri pentru operator și dezvoltatori: configurare, Docker, Electron, PWA, Termux, CLIs, i18n, depanare, ghid de utilizare                                 |
| `architecture/`          | Arhitectură, referință de bază de cod, rețete de modificare, authz, rezistență, porți de calitate, sistem de proiectare, această hartă                       |
| `reference/`             | referință API, variabile de mediu, semnalizatoare de caracteristică, instrumente CLI, niveluri gratuite, referință generată de furnizor, furnizori eliminați |
| `frameworks/`            | MCP, A2A, ACP, competențe, memorie, plugin-uri, agenți cloud, webhook-uri, evals, export jurnal, radar, teren de joacă, …                                    |
| `routing/`               | Combo automat, raționament replay/routing, cotă, scară de abonament, cost zero strict, …                                                                     |
| `security/`              | Balustrade, dezinfectare erori, CORS, SSO, politică de ieșire, niveluri de protecție a rutei, lanț de aprovizionare, …                                       |
| `compression/`           | Ghid de compresie, motoare, RTK, format de reguli, pachete de limbi, editare de context                                                                      |
| `ops/`                   | Flux de lansare, ramificare, tren de îmbinare, implementare (VM, Fly.io, Kubernetes), bază de date, proxy, arbori de lucru, detalii Hard Rules               |
| `providers/`             | Ghiduri pentru fiecare furnizor (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                        |
| `comparison/`            | OmniRoute în comparație cu alternative                                                                                                                       |
| `integrations/`          | Note de integrare (fal.ai native, MarkItDown MCP); nu este compilat în `/docs`                                                                               |
| `openapi.yaml`           | sursa OpenAPI ; furnizează `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` și `bin/cli/api-commands/`                                         |
| `diagrams/`              | Surse sirene (`.mmd`), redate SVGs (`exported/`) și README SVGs din `scripts/docs/gen-readme-*`                                                              |
| `assets/`                | Limbă-steagul SVGs și alte active README                                                                                                                     |
| `screenshots/`           | Capturi de ecran utilizate de README și ghiduri                                                                                                              |
| `i18n/`                  | Oglinzi traduse: un folder per local (66) cu documente rădăcină și un subset `docs/` ; produs de `npm run i18n:run` — vezi [I18N.md](../guides/I18N.md)      |
| `*.md` de nivel superior | `README.md` (index document), `DEVELOPER-ENVIRONMENT.md` și câteva note de sine stătătoare                                                                   |

Puncte cheie de intrare: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generat de `npm run gen:provider-reference`).

---

## suite de testare `tests/` —

Aproximativ 9.670 de fișiere urmărite. Fișierele de testare aparțin aici, nu în rădăcina proiectului. Excepții: folderele `__tests__/` colocate în `src/` și `open-sse/` pe care le colectează configurațiile Vitest.

| Cale                                                   | Cuprins                                                                                                                                                                                       | Alergător                                                                               |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Teste unitare (peste 9.000 de fișiere): multe la nivelul superior, plus foldere de domeniu (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Runner de testare nod (`npm run test:unit`); `*.tsx` prin `test:vitest:ui`              |
| `tests/unit/serial/`                                   | Testele sensibile la CPU rulează cu concurența 1                                                                                                                                              | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suites în interiorul arborelui unității                                                                                                                                                | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Teste de integrare multi-module și DB ; `combo-matrix/`, `combo-live/`, `services/`                                                                                                           | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + live suites `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                          | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` împotriva unei instanțe care rulează                                                                                                                                         | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Suite de omologare (`api/`, `ui/` cu propria configurație Playwright )                                                                                                                        | `npm run homolog` — vezi [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                      |
| `tests/load/`                                          | Încărcați și absorbiți scripturi (k6)                                                                                                                                                         | Flux de lucru de reziliență nocturn                                                     |
| `tests/_setup/`                                        | `--import` / fișiere de configurare (dir date izolate, gardă de ieșire, Vitest UI polyfills)                                                                                                  | Încărcat de alergători                                                                  |
| `tests/_helpers/`, `tests/helpers/`                    | Ajutoare de testare partajate (instantanee de aur, sesiune de management, …)                                                                                                                  | Importat prin teste                                                                     |
| `tests/fixtures/`                                      | Date de fixare și dispozitive de procesare copil                                                                                                                                              | Importat prin teste                                                                     |
| `tests/snapshots/`                                     | Fișiere de aur pentru `tests/helpers/goldenSnapshot.ts`                                                                                                                                       | Importat prin teste                                                                     |
| `tests/manual/`                                        | fișiere `.http` pentru apeluri manuale REST                                                                                                                                                   | Manual                                                                                  |
| `tests/security/`                                      | Scripturi shell de securitate                                                                                                                                                                 | Dispozitive manuale / test unitar                                                       |
| `tests/types/`                                         | Fixări contractuale la nivel de tip                                                                                                                                                           | —                                                                                       |

Matrice completă: `CONTRIBUTING.md` → „Running Tests” și [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Cale                                               | Scop                                                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Diagramă Helm (`Chart.yaml`, `values.yaml`, șabloane pentru implementare, service, ingress, PVC, secret, configmap) |
| `deploy/kubernetes/base/`                          | Personalizați baza (spațiu de nume, implementare, serviciu, PVC, configmap, `secret.example.yaml`)                  |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Suprapuneri specifice clusterului (intrare, clasă de stocare, resurse, sonde)                                       |

Vezi [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## imagini auxiliare `docker/` —

| Cale                                | Scop                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `docker/chatgpt-web-codex-browser/` | Imagine de browser fără cap cu un proxy CDP pentru executorul web ChatGPT — vezi [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin bridge imagine, compune fișier, mocks și network guard                                                                   |
| `docker/vnc-browser/`               | Chromium cu VNC pentru sesiuni interactive de browser                                                                          |

Imaginea principală este rădăcina `Dockerfile`; vezi [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## Rețete ale comunității `contrib/` — (nu sunt acceptate oficial)

| Cale                    | Scop                                                                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Cvadlete Podman (container, volum, rețea, Redis)                                                                                                         |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                                      |
| `contrib/windows/`      | Lansatoare `.bat` pentru rularea de la o casă Windows                                                                                                    |
| `contrib/session-sync/` | README pentru o extensie de browser de sincronizare a sesiunii terță parte — consultați [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Cale                            | Scop                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Plugin de comandă minim — vezi [PLUGINS.md](../frameworks/PLUGINS.md)         |
| `examples/plugins/`             | Exemple de pluginuri: langfuse, request-logger, theme-manager, welcome-banner |
| `examples/quickstart/`          | Fragmente de client: curl, Node.js (axios), PHP, Python                       |

---

## integrare `.github/` — GitHub

| Cale                                                         | Scop                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), scanări de securitate (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), suite `nightly-*.yml` programate, publicare (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), fluxuri de lucru de lansare și întreținere |
| `.github/actions/npm-ci-retry/`                              | Acțiune compusă: `npm ci` cu cache și reîncercați                                                                                                                                                                                                                                            |
| `.github/actions/prepare-unit-storage/`                      | Acțiune compusă: eliberează spațiu pe disc runner, apoi instalează dependențe                                                                                                                                                                                                                |
| `.github/ISSUE_TEMPLATE/`                                    | Formulare pentru erori, caracteristici și acoperire a testelor                                                                                                                                                                                                                               |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Șablon PR implicit plus variante bugfix/feature                                                                                                                                                                                                                                              |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Proprietari de coduri, linkuri de sponsorizare, actualizări de dependențe                                                                                                                                                                                                                    |
| `.github/labels.yml`                                         | Definițiile etichetelor aplicate de `npm run labels:sync`                                                                                                                                                                                                                                    |
| `.github/copilot-instructions.md`                            | GitHub Copilot instructions (o suprafață de instrucțiuni agent)                                                                                                                                                                                                                              |

Harta locurilor de munca CI : [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git hooks

| Fişier       | Scop                                                                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Verificare identității Git, cu scame, manifest de poartă, sincronizare documente, orice buget, clichet la scară de tip, artefacte urmărite și verificări instantanee ui-kit |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` pe mesajul de confirmare                                                                                                           |
| `pre-push`   | Lumină intenționată: o verificare a sanității PATH/npm care iese 0                                                                                                          |

Timpul de rulare a cârligului în `.husky/_/` este generat la instalare și nu este urmărit.

---

## Sfaturi de navigare

- **Colaborator nou?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Schimbarea a ceva comun** (furnizor, rută, modul DB, instrument MCP, abilitate A2A )? Urmăriți [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Adăugarea unui furnizor?** Verificați mai întâi [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md), apoi verificați [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Alergați la nivel local?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Desfășurare?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Eliberarea?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **O poartă de calitate a eșuat?** [QUALITY_GATES.md](QUALITY_GATES.md) și [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
