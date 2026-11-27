# Repository Map (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Cosa vive dove: ogni directory di livello superiore e file root monitorati, con uno scopo di una riga.** Ultimo aggiornamento: 2026-11-13 (OmniRoute v3.8.54)
>
> Utilizza questa mappa per orientarti nel codebase, quindi segui i collegamenti ai documenti dedicati. I conteggi dei file sono stati misurati con `git ls-files` nella data sopra indicata. Cambiano con quasi ogni versione, quindi trattali come ordini di grandezza.

## Albero di primo livello

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

Percorsi locali, generati o privati (tutti gitignorati, mai impegnati, non descritti ulteriormente):

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

## File root

Tutti i file tracciati nella root del repository (`git ls-files | grep -v /`), raggruppati per funzione.

### Documentazione del progetto

| File                     | Scopo                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `README.md`              | Pagina di destinazione: panoramica delle funzionalità, avvio rapido, metodi di installazione |
| `CHANGELOG.md`           | Log delle modifiche per ogni release (i frammenti di `changelog.d/` sono ripiegati qui)      |
| `ROADMAP.md`             | Roadmap pubblica                                                                             |
| `LICENSE`                | licenza MIT                                                                                  |
| `THIRD_PARTY_NOTICES.md` | Avvisi per codice di terze parti in bundle (ad esempio i collegamenti wreq-js)               |
| `CONTRIBUTING.md`        | Guida per il collaboratore: configurazione, commit convenzionali, matrice di test, flusso PR |
| `SECURITY.md`            | Politica di segnalazione delle vulnerabilità                                                 |
| `CODE_OF_CONDUCT.md`     | Aspettative di comportamento della comunità                                                  |
| `llm.txt`                | Riepilogo del progetto in testo semplice per crawler e assistenti LLM                        |

### Istruzioni dell'assistente AI

| File        | Scopo                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Un'unica fonte di verità per ogni assistente AI : convenzioni, cancelli di qualità, regole dure |
| `CLAUDE.md` | Delta specifici del Codice Claude; importa `AGENTS.md`                                          |
| `GEMINI.md` | Delta specifici dei Gemelli; rimanda a `AGENTS.md`                                              |

Esistono anche guide annidate accanto al codice che descrivono: `open-sse/services/AGENTS.md` e `src/lib/db/AGENTS.md`.

### Manifesti del pacchetto e toolchain del nodo

| File                       | Scopo                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| `package.json`             | manifest npm: script, dipendenze, `engines`, `workspaces`, `files` pubblicato                      |
| `package-lock.json`        | Albero delle dipendenze bloccato                                                                   |
| `pnpm-workspace.yaml`      | Elenco delle aree di lavoro pnpm (`packages/*`, `open-sse`) e lista consentita di creazione nativa |
| `.npmrc` / `.npmignore`    | configurazione di npm e pubblicazione delle esclusioni                                             |
| `.node-version` / `.nvmrc` | Pin di versione del nodo per i gestori di versione                                                 |
| `flake.nix` / `flake.lock` | Nix dev shell e il suo blocco                                                                      |
| `Makefile`                 | scorciatoie `make` che delegano agli script npm                                                    |

### TypeScript, Next.js e documenti build

| File                                      | Scopo                                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Configurazione TypeScript di base e alias del percorso (`@/*`, `@omniroute/open-sse`)    |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` fetta                                                           |
| `tsconfig.typecheck-noimplicit-core.json` | fetta `npm run typecheck:noimplicit:core` ( `noImplicitAny` rigorosa).                   |
| `tsconfig.typecheck-api.json`             | Sezione di controllo del tipo del percorso API (`scripts/check/check-api-typecheck.mjs`) |
| `tsconfig.typecheck-dashboard.json`       | Sezione di controllo del tipo di dashboard (`npm run check:dashboard-typecheck`)         |
| `tsconfig.build.json`                     | Controllo del tipo di produzione (`npm run typecheck:build`, `check:build-typecheck`)    |
| `tsconfig.mitm.json`                      | MITM build config utilizzata da `scripts/build/buildMitm.mjs`                            |
| `next.config.mjs`                         | Next.js 16 config (output autonomo, alias del profilo di build)                          |
| `source.config.ts`                        | Fumadocs `defineDocs` config: quali sezioni `docs/` vengono compilate in `/docs`         |
| `postcss.config.mjs`                      | gasdotto PostCSS / Tailwind                                                              |

### Lanugine e formattazione

| File                                      | Scopo                                                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Configurazione principale ESLint flat (`npm run lint`, con `config/quality/eslint-suppressions.json`)           |
| `eslint.complexity-ratchets.config.mjs`   | Configurazione autonoma utilizzata dai cricchetti di complessità e complessità cognitiva in un passaggio ESLint |
| `eslint.complexity.config.mjs`            | Configurazione autonoma con solo core `complexity` + `max-lines-per-function` (utilizzato dai test)             |
| `prettier.config.mjs` / `.prettierignore` | Prettier regole ed esclusioni                                                                                   |
| `.editorconfig`                           | Impostazioni predefinite dell'editor (rientro di 2 spazi)                                                       |
| `.markdownlint.json`                      | Lint di ribasso consultivo (`npm run lint:md`)                                                                  |
| `.vale.ini`                               | Lint consultivo in prosa (`npm run lint:prose`), vocabolario in `.vale/`                                        |

### Test, valutazione e copertura

| File                          | Scopo                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | suite jsdom Vitest : `npm run test:vitest:ui` (dashboard `.tsx`, hook, test memory/skills )    |
| `vitest.mcp.config.ts`        | Suite Vitest del nodo: `npm run test:vitest` (MCP server, autoCombo, combo, API `.spec.ts`)    |
| `vitest.quarantine.config.ts` | Esegue i file in quarantena elencati in `config/quality/vitest-exclusions.json`                |
| `vitest.e2e-live.config.ts`   | Suite Vitest server live (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                  |
| `stryker.conf.mjs`            | Test di mutazione Stryker (`npm run test:mutation`; calcola `tap.testFiles` da `mutate`)       |
| `stryker.disablebail.mjs`     | Variante Stryker senza staffa, per la misurazione della ridondanza del test                    |
| `promptfooconfig.yaml`        | promptfoo LLM-suite di sicurezza                                                               |
| `codecov.yml`                 | Impostazioni di copertura delle patch Codecov                                                  |

### Docker e distribuzione

| File                              | Scopo                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `Dockerfile`                      | Immagine multistadio (`builder` → `runner-base` → `runner-web` / `runner-cli*`)      |
| `Dockerfile.bun`                  | Immagine alternativa sul runtime Bun (creata da `docker-publish.yml`)                |
| `docker-compose.yml`              | Composizione predefinita con profili (base, web, cli, host, memoria, cliproxyapi, …) |
| `docker-compose.prod.yml`         | Istanza di snapshot di produzione separata sulla porta 20130                         |
| `docker-compose.selfhost.yml`     | Host autonomo di loopback a un comando (si accoppia con `.env.selfhost.example`)     |
| `docker-compose.ollama-local.yml` | Docker OmniRoute che parla con uno Ollama nativo dell'host                           |
| `.dockerignore`                   | Docker esclusioni del contesto di build                                              |
| `fly.toml`                        | Configurazione dell'app Fly.io (porta 20128, volume `/data` )                        |

### Bot di sicurezza, supply chain e repository

| File                                         | Scopo                                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `.gitleaks.toml`                             | regole di scansione segreta e liste consentite di Gitleaks                                 |
| `.trivyignore`                               | Eliminazioni dei rischi accettati per la scansione dell'immagine del contenitore           |
| `.zizmor.yml`                                | zizmor GitHub Azioni configurazione controllo sicurezza                                    |
| `socket.yml`                                 | Configurazione dell'app Socket.dev (il percorso ignora; non un gate CI )                   |
| `sonar-project.properties`                   | configurazione del progetto SonarQube/SonarCloud                                           |
| `knip.json`                                  | Elimina la configurazione files/exports/deps inutilizzata (feed `npm run check:dead-code`) |
| `.size-limit.json`                           | Budget a pacchetto                                                                         |
| `.mergify.yml`                               | Unisci la configurazione della coda di unione                                              |
| `.coderabbit.yaml`                           | CodeRabbit revisione configurazione                                                        |
| `.cbmignore`                                 | Elenco da ignorare per l'indice del codice codebase-memory-mcp                             |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignora regole, terminazioni di riga LF per gli script, identità canoniche dell'autore      |

### Modelli di ambiente, stato e feed

| File                        | Scopo                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `.env.example`              | Modello copiato su `.env` alla prima installazione; elenco di riferimento di env var |
| `.env.selfhost.example`     | Modello per `docker-compose.selfhost.yml`                                            |
| `.env.homolog.example`      | Modello per il corridore di omologazione (`npm run homolog`)                         |
| `.env.devin-bridge.example` | File env di esempio per la configurazione del bridge Devin                           |
| `.i18n-state.json`          | Stato della traduzione incrementale (hash di origine per documento e locale)         |
| `news.json`                 | Feed di annunci localizzati (schema v2) letto dalla dashboard                        |

---

## applicazione `src/` — Next.js

Circa 4.550 file tracciati. Alias del percorso `@/*` → `src/*`.

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

### Router dell'app `src/app/` —

| Sentiero                                                            | Scopo                                                                                                                                                                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | API pubblica compatibile con OpenAI: chat, completamenti, risposte, messaggi, incorporamenti, immagini, audio, video, musica, riclassificazione, moderazioni, ricerca, file, batch, ws, modelli, … |
| `app/api/v1beta/`                                                   | Endpoint in stile Gemini                                                                                                                                                                           |
| `app/api/` (altre cartelle)                                         | Percorsi di gestione e amministrazione: provider, combo, impostazioni, chiavi, utilizzo, log, mcp, a2a, acp, memoria, competenze, valutazioni, webhook, tunnel, plugin, radar, strumenti, …        |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — vedi [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                         |
| `app/api/tools/traffic-inspector/`                                  | Ispettore del traffico REST API — vedi [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                  |
| `app/(dashboard)/dashboard/`                                        | Una cartella per sezione del dashboard (fornitori, combo, registri, utilizzo, costi, cache, compressione, memoria, parco giochi, strumenti di ricerca, impostazioni, strumenti, ...)               |
| `app/(dashboard)/home/`                                             | Schermata iniziale e relativi widget                                                                                                                                                               |
| `app/docs/`                                                         | Visualizzatore di documenti che esegue il rendering delle sezioni Fumadocs elencate in `source.config.ts`                                                                                          |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Layout root, voce root (reindirizzamenti), manifest PWA, CSS globale                                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Confini degli errori e fallback                                                                                                                                                                    |

i percorsi API seguono `Route → CORS → Zod validation → optional auth → policy → handler`; vedere [ARCHITECTURE.md](ARCHITECTURE.md) e [API_REFERENCE.md](../reference/API_REFERENCE.md).

### Librerie server `src/lib/` —

Circa 90 sottocartelle più circa 90 moduli di livello superiore. Gruppi principali:

| Zona                          | Cartelle/file                                                                                                       | Immersione profonda                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Banca dati                    | moduli di dominio `db/` —, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                          | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE](../ops/DATABASE_GUIDE.md)                                            |
| Utilizzo, quota e spesa       | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE](../routing/QUOTA_SHARE.md), [COST_TRACKING](../guides/COST_TRACKING.md)                                                       |
| Fornitori e modelli           | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                    |
| OAuth e credenziali           | `oauth/` (fornitori/, servizi/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`                   | `resolvePublicCred()` (doc dell'operatore, non reso pubblico)                                                                               |
| Sicurezza e governance        | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                      |
| Funzionalità dell'agente      | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plugin e servizi              | `plugins/`, `services/` (installatori e supervisore di servizi integrati)                                           | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                          |
| Routing e resilienza          | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxy e reti                  | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, moduli tunnel                                  | [PROXY_GUIDE](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE](../ops/TUNNELS_GUIDE.md)                                                              |
| Lavori e pianificazione       | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                             |
| Osservabilità ed esportazione | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                      |
| Integrazione CLI e IDE        | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                 |
| Fonti di contesto             | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Altre caratteristiche         | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Moduli di primo livello che vale la pena conoscere:

| File                                                           | Scopo                                                                             |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Caching delle risposte e idempotenza                                              |
| `webhookDispatcher.ts`                                         | Consegna del webhook firmato HMAC                                                 |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Gestori delle gallerie                                                            |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Controlli sullo stato delle credenziali in background e circuito di aggiornamento |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Disinfettanti di risposta in streaming                                            |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Ciclo di vita del processo                                                        |
| `*.stub.ts`                                                    | Stub del profilo di build scambiati dagli alias in `next.config.mjs`              |

### database `src/lib/db/` —

| Sentiero              | Scopo                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`          | `getDbInstance()` singleton (WAL journaling)                                                                                               |
| `db/migrations/`      | Migrazioni `.sql` numerate e idempotenti (236 file al momento della scrittura; numerazione delle guardie `check-migration-numbering.mjs` ) |
| `db/migrationRunner/` | Corridore di migrazione                                                                                                                    |
| `db/adapters/`        | adattatori driver SQLite (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                                 |
| `db/repositories/`    | Implementazioni del repository SQLite (combo, preimpostazioni del parco giochi, configurazione del routing)                                |
| `db/<domain>.ts`      | Circa 175 moduli di dominio (provider, combo, apiKeys, impostazioni, utilizzo, ...) — li importa sempre direttamente                       |

### `src/domain/`, `src/server/`, `src/shared/`

| Sentiero                                                       | Scopo                                                                                                                                                                   |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Motore politico                                                                                                                                                         |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Decisioni di fallback, politica di lockout, regole di costo                                                                                                             |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Cache delle quote e persistenza degli snapshot                                                                                                                          |
| `domain/assessment/`                                           | Valutazione del modello (valutatore, classificatore, auto-guaritore)                                                                                                    |
| `server/authz/`                                                | Autorizzazione pipeline e protezione del percorso (`routeGuard.ts`) — vedere [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS risoluzione dell'origine e CORS — vedere [CORS.md](../security/CORS.md)                                                                                   |
| `server/ws/`                                                   | Server WebSocket dashboard live                                                                                                                                         |
| `shared/components/`                                           | Componenti e adattatori del dashboard su `packages/ui-kit` — vedere [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                                |
| `shared/constants/`                                            | Catalogo dei provider (`providers.ts`), strategie di routing, strumenti CLI, mappa delle icone, lista negata di intestazioni upstream,...                               |
| `shared/validation/`                                           | Schemi Zod e aiutanti di convalida                                                                                                                                      |
| `shared/utils/`                                                | Interruttore automatico, autenticazione chiave API, timeout di recupero, flag di funzionalità,...                                                                       |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Middleware per l'ammissione alla chat, assistenti di rete, servizi client, hook React                                                                                   |

---

## `open-sse/` — area di lavoro del motore di streaming

npm workspace `@omniroute/open-sse` (circa 2.390 file tracciati). Esegue l'elaborazione della richiesta e l'esecuzione del provider. Panoramica: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Sentiero                                                                                       | Scopo                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Strategie di routing combinate — vedere [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                          |
| `autoCombo/`                                                                                   | Punteggio Auto-Combo e pacchetti modalità                                                                                                                                  |
| `accountFallback.ts` + `accountFallback/`                                                      | Raffreddamento della connessione e blocco del modello — vedere [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                  |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Monitoraggio del limite di velocità e analisi dell'intestazione                                                                                                            |
| `compression/`                                                                                 | Motori di compressione (`engines/`), pacchetti di regole (`rules/`), `eval/`, `harness/`, `riskGate/` — vedere [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Aggiornamento dei token, contabilità dell'utilizzo, memorizzazione nella cache, corsie di ammissione, pool di sessioni, account Codex, assistenti di routing               |
| `__tests__/`                                                                                   | Suite Vitest co-localizzate (raccolte dalle configurazioni Vitest )                                                                                                        |
| `AGENTS.md`                                                                                    | Guida dell'agente per questa cartella                                                                                                                                      |

Modello: un modulo grande `X.ts` accanto a una cartella `X/` significa che il modulo è stato suddiviso in file più piccoli (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Sentiero              | Scopo                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `server.ts`           | Ciclo di vita del server MCP                                                                           |
| `httpTransport.ts`    | Trasporti HTTP e SSE streaming                                                                         |
| `scopeEnforcement.ts` | Controlli dell'ambito per strumento                                                                    |
| `audit.ts`            | Registrazione di controllo delle chiamate agli strumenti                                               |
| `schemas/`            | Definizioni e ambiti degli strumenti                                                                   |
| `tools/`              | Implementazioni degli strumenti (memoria, competenze, compressione, ...)                               |
| `toolSearch/`         | Ricerca degli strumenti                                                                                |
| `README.md`           | Note sull'architettura interna; il catalogo completo è in [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## spazi di lavoro `packages/` — npm

| Sentiero                 | Scopo                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: snapshot fornito dal fornitore del kit Keak CI UI, utilizzato come sorgente. `UPSTREAM.md` blocca il commit upstream, `PATCHES.md` elenca le patch locali. `src/` è sincronizzato solo da `scripts/dev/sync-ui-kit.sh` e custodito da `npm run check:ui-kit-snapshot`. Vedi [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: interfacce e implementazione del pool di browser (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Elencato in `workspaces`; il pool di browser di runtime utilizzato dal gateway risiede in `open-sse/services/`                                                         |

## `@omniroute/` — pacchetti pubblicati separatamente

Queste non sono aree di lavoro npm. Ognuno ha il proprio `package.json` e il proprio file di blocco; la cartella viene fornita nel tarball `omniroute` (`files: ["@omniroute/"]`).

| Sentiero                         | Scopo                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@omniroute/opencode-plugin/`    | plugin OpenCode (rilevamento modelli, autenticazione `/connect` ); usato da `omniroute setup-opencode` — vedi [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin per v2 Promise API — vedi [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                                     |
| `@omniroute/opencode-provider/`  | Generatore di configurazioni statiche; contrassegnato come deprecato nella propria `package.json` a favore di `opencode-plugin`                        |

---

## `bin/` — CLI e script ops

| Sentiero                                                                    | Scopo                                                                                                                 |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Voce principale CLI (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                                   |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binario                                                                                    |
| `mcp-server.mjs`                                                            | punto di ingresso MCP stdio                                                                                           |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Punti di ingresso ponte ausiliario/ MCP                                                                               |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM risolve l'hook che mappa gli alias del percorso tsconfig per le installazioni globali                             |
| `nodeRuntimeSupport.mjs`                                                    | Controllo della versione Node.js supportato                                                                           |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Script di ripristino degli incidenti self-host (condividi `_ops-common.sh`)                                           |
| `cold-start-bench.sh`                                                       | Benchmark di avvio a freddo — vedere [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                      |
| `cli/commands/`                                                             | Un modulo per comando CLI (circa 100, comprese le integrazioni `setup-*` )                                            |
| `cli/api-commands/`                                                         | Generato da `docs/openapi.yaml` da `npm run build:cli-api` — non modificare                                           |
| `cli/locales/`                                                              | Cataloghi di messaggi CLI (67 lingue)                                                                                 |
| `cli/tui/`, `cli/tui-components/`                                           | Terminale UI                                                                                                          |
| `cli/tray/`                                                                 | Vassoio di sistema e avvio automatico (backend Windows PowerShell, vassoio di sistema su macOS/Linux)                 |
| `cli/runtime/`                                                              | Risoluzione runtime nativa (`sqliteRuntime.mjs`, `magicBytes.mjs`), supervisore del processo                          |
| `cli/*.mjs`                                                                 | Helper condivisi (argomenti, client API, directory dati, crittografia, archivio provider, archivio impostazioni, ...) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI interni e convenzioni                                                                                             |

Vedi [CLI-TOOLS.md](../reference/CLI-TOOLS.md) e [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## Applicazione desktop `electron/` —

| Sentiero                                                   | Scopo                                                                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `main.js`                                                  | processo principale Electron (finestra, server incorporato, vassoio, aggiornamenti)                           |
| `preload.js`                                               | IPC bridge esposto al renderer                                                                                |
| `lib/`                                                     | Ciclo di vita delle finestre, disponibilità del server, watchdog dell'integrità, preferenze del server remoto |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Finestra di prompt del server remoto                                                                          |
| `processTree.js`, `sqlite-inspection.js`                   | Aiutanti per la pulizia dei processi secondari e l'ispezione SQLite                                           |
| `package.json` / `package-lock.json`                       | Configurazione del generatore di elettroni e dipendenze Electron                                              |
| `assets/`                                                  | Icone dell'app e della barra delle applicazioni (`.ico`, `.icns`, `.png`)                                     |
| `README.md`                                                | Note interne — vedere [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                                        |

## `public/` — risorse statiche

| Sentiero                                    | Scopo                                                                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Loghi dei fornitori caricati da id (`/providers/<id>.svg`); provenienza in `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Icone del browser e PWA                                                                                                      |
| `sw.js`                                     | L'addetto ai servizi — vede [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                           |
| `openapi.yaml`                              | Copia di `docs/openapi.yaml` generata da `npm run gen:public-openapi`                                                        |
| `images/`, `sponsors/`, `deyin.svg`         | Diagrammi di flusso per livelli, banner dello sponsor, grafica README                                                        |

## `skills/` — Competenze dell'agente

46 abilità, una cartella ciascuna con uno `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), più `skills/README.md`. `src/lib/agentSkills/catalog.ts` li legge in fase di runtime e li espone tramite `/api/agent-skills`, MCP e A2A. La maggior parte dei manifest sono generati da `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` controlla la deriva). Vedi [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — costruzione, cancelli e attrezzature

Circa 435 file tracciati. I nuovi script vanno in una delle sottocartelle consentite da `AGENTS.md`; il codice una tantum va in `scripts/ad-hoc/`.

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

Punti di ingresso utilizzati frequentemente:

| Copione                                                             | Scopo                                                                                                       |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | corridore `npm run dev` / `npm start`                                                                       |
| `build/build-next-isolated.mjs`                                     | `npm run build` (costruzione autonoma Next.js )                                                             |
| `build/prepublish.ts`                                               | `npm run build:cli`: assembla il npm `dist/`                                                                |
| `build/postinstall.mjs`                                             | gancio npm `postinstall`                                                                                    |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                                |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (rigenera PROVIDER_REFERENCE.md)                                           |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (genera `src/app/docs/lib/openapi.generated.ts`)                                            |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (mirror dei documenti)                                                                   |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                                   |
| `release/aggregate-changelog.mjs`                                   | Piega i frammenti `changelog.d/` in `CHANGELOG.md`                                                          |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (cancello di precisione doc)                                                |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blocca i percorsi root `_*` tracciati)                                   |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (cricchetto metrico contro `config/quality/`)                                     |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                          |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                      |
| `dev/new-worktree.sh`                                               | Crea un albero di lavoro di sviluppo isolato — vedere [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Sincronizza `packages/ui-kit/src` con un commit upstream bloccato                                           |

Inventario e politiche dei cancelli: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — configurazione con versione e stato del gate

| Sentiero                                 | Scopo                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Località supportate (origine del conteggio delle impostazioni locali) e relativo schema                                                                  |
| `payloadRules.json`                      | Regole sul carico utile a monte (`open-sse/services/payloadRules.ts`)                                                                                    |
| `cli-tools-manifest.json`                | Manifesto degli strumenti CLI integrabili (`bin/cli/cli-manifest.mjs`)                                                                                   |
| `alibaba-free-tier-allowlist.json`       | Alibaba lista consentita del modello di livello gratuito                                                                                                 |
| `ci/toolchain.json`                      | versioni della toolchain CI                                                                                                                              |
| `quality/quality-baseline.json`          | Linea di base del cricchetto multimetrico (copertura, avvertenze, duplicazione, …)                                                                       |
| `quality/*-baseline.json`                | Linee di base congelate per porte individuali (complessità, duplicazione, dimensione del file, sezioni di controllo del tipo, rilevamento dei test, ...) |
| `quality/*-allowlist.json`               | Liste consentite di gate (dipendenze, licenze, attribuzione AI, test sui fratelli dimenticati, ...)                                                      |
| `quality/eslint-suppressions.json`       | Soppressione ESLint congelata applicata da `npm run lint`                                                                                                |
| `quality/gate-manifest.json`             | Manifesto del gate controllato da `scripts/quality/gate-manifest.mjs`                                                                                    |
| `quality/vitest-exclusions.json`         | Inventario di quarantena per `vitest.quarantine.config.ts`                                                                                               |
| `quality/skill-templates/`               | Modelli SKILL.md canonici controllati da `scripts/quality/check-skill-contract.mjs`                                                                      |
| `quality/release-acceptance.schema.json` | Schema di prova di rilascio-accettazione — vedere [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                                           |
| `release/`                               | Riconciliazioni del log delle modifiche e manifest nativo wreq-js, inventario delle licenze e avvisi                                                     |

## Frammenti del log delle modifiche `changelog.d/` —

Uno PR aggiunge un frammento invece di modificare `CHANGELOG.md`: `features/`, `fixes/` o `maintenance/`, chiamato `<PR-number>-<slug>.md`. Al momento del rilascio `scripts/release/aggregate-changelog.mjs` li ripiega in `CHANGELOG.md` e li cancella; `npm run check:changelog-integrity` li convalida. Dettagli in `changelog.d/README.md`.

---

## `docs/` — documentazione pubblica

Le sezioni elencate in `source.config.ts` vengono compilate nel sito `/docs` (escluse alcune pagine di sicurezza riservate agli operatori); `docs/meta.json` imposta l'ordine della barra laterale. Inizia da [README.md](../README.md).

| Sentiero                | Contenuto                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`      | Avvio rapido, host autonomo, fornitori, livelli gratuiti, Auto-Combo e guide sui cookie Web                                                                     |
| `guides/`               | Guide per operatori e sviluppatori: installazione, Docker, Electron, PWA, Termux, CLIs, i18n, risoluzione dei problemi, guida per l'utente                      |
| `architecture/`         | Architettura, riferimento alla base di codice, ricette di modifica, autorizzazione, resilienza, porte di qualità, sistema di progettazione, questa mappa        |
| `reference/`            | Riferimento API, variabili di ambiente, flag di funzionalità, strumenti CLI, livelli gratuiti, riferimento al provider generato, provider rimossi               |
| `frameworks/`           | MCP, A2A, ACP, competenze, memoria, plugin, agenti cloud, webhook, valutazioni, esportazione di log, Radar, Playground, …                                       |
| `routing/`              | Auto-Combo, ragionamento replay/routing, quota share, scala di abbonamento, rigoroso costo zero, …                                                              |
| `security/`             | Guardrail, sanificazione degli errori, CORS, SSO, politica di uscita, livelli di protezione del percorso, catena di fornitura,...                               |
| `compression/`          | Guida alla compressione, motori, RTK, formato delle regole, pacchetti lingua, modifica del contesto                                                             |
| `ops/`                  | Flusso di rilascio, ramificazione, merge train, distribuzione (VM, Fly.io, Kubernetes), database, proxy, alberi di lavoro, dettagli sulle regole rigide         |
| `providers/`            | Guide per fornitore (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                                       |
| `comparison/`           | OmniRoute rispetto alle alternative                                                                                                                             |
| `integrations/`         | Note di integrazione (fal.ai nativo, MarkItDown MCP); non compilato in `/docs`                                                                                  |
| `openapi.yaml`          | fonte OpenAPI ; alimenta `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` e `bin/cli/api-commands/`                                               |
| `diagrams/`             | Fonti della sirena (`.mmd`), resi SVGs (`exported/`) e README SVGs da `scripts/docs/gen-readme-*`                                                               |
| `assets/`               | Flag linguistico SVGs e altre risorse README                                                                                                                    |
| `screenshots/`          | Schermate utilizzate da README e guide                                                                                                                          |
| `i18n/`                 | Mirror tradotti: una cartella per locale (66) con documenti root e un sottoinsieme `docs/` ; prodotto da `npm run i18n:run` — vedi [I18N.md](../guides/I18N.md) |
| `*.md` di primo livello | `README.md` (indice dei documenti), `DEVELOPER-ENVIRONMENT.md` e alcune note autonome                                                                           |

Punti di ingresso chiave: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generato da `npm run gen:provider-reference`).

---

## suite di test `tests/` —

Circa 9.670 file tracciati. I file di test appartengono qui, non nella root del progetto. Eccezioni: le cartelle `__tests__/` co-localizzate in `src/` e `open-sse/` raccolte dalle configurazioni Vitest.

| Sentiero                                               | Contenuto                                                                                                                                                                           | Corridore                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Unit test (oltre 9.000 file): molti al livello più alto, più cartelle di dominio (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Test runner del nodo (`npm run test:unit`); `*.tsx` tramite `test:vitest:ui`            |
| `tests/unit/serial/`                                   | I test sensibili alla CPU vengono eseguiti con la concorrenza 1                                                                                                                     | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suite all'interno dell'albero delle unità                                                                                                                                    | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Test di integrazione multimodulo e DB ; `combo-matrix/`, `combo-live/`, `services/`                                                                                                 | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + suite dal vivo `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                             | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` contro un'istanza in esecuzione                                                                                                                                    | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Suite di omologazione (`api/`, `ui/` con la propria configurazione Playwright )                                                                                                     | `npm run homolog` — vedi [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                      |
| `tests/load/`                                          | Caricare e assorbire gli script (k6)                                                                                                                                                | Flusso di lavoro di resilienza notturna                                                 |
| `tests/_setup/`                                        | `--import` /file di installazione (dir dati isolata, guardia di uscita, polyfill Vitest UI )                                                                                        | Caricato dai corridori                                                                  |
| `tests/_helpers/`, `tests/helpers/`                    | Supporti di test condivisi (golden snapshot, sessioni di gestione,...)                                                                                                              | Importato dai test                                                                      |
| `tests/fixtures/`                                      | Dati delle attrezzature e attrezzature del processo figlio                                                                                                                          | Importato dai test                                                                      |
| `tests/snapshots/`                                     | Lime d'oro per `tests/helpers/goldenSnapshot.ts`                                                                                                                                    | Importato dai test                                                                      |
| `tests/manual/`                                        | `.http` per le chiamate REST manuali                                                                                                                                                | Manuale                                                                                 |
| `tests/security/`                                      | Script della shell di sicurezza                                                                                                                                                     | Dispositivi manuali/per test unitari                                                    |
| `tests/types/`                                         | Infissi contract a livello di tipologia                                                                                                                                             | —                                                                                       |

Matrice completa: `CONTRIBUTING.md` → "Running Tests" e [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Sentiero                                           | Scopo                                                                                                                |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Grafico timone (`Chart.yaml`, `values.yaml`, modelli per distribuzione, servizio, ingresso, PVC, segreto, configmap) |
| `deploy/kubernetes/base/`                          | Base Kustomize (spazio dei nomi, distribuzione, servizio, PVC, configmap, `secret.example.yaml`)                     |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Overlay specifici del cluster (ingresso, classe di archiviazione, risorse, sonde)                                    |

Vedi [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — immagini ausiliarie

| Sentiero                            | Scopo                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Immagine del browser headless con un proxy CDP per l'esecutore Web ChatGPT — vedere [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Immagine del bridge Devin, composizione del file, mock e protezione della rete                                                    |
| `docker/vnc-browser/`               | Chromium con VNC per sessioni browser interattive                                                                                 |

L'immagine principale è la radice `Dockerfile`; vedere [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md)

## `contrib/` — ricette della community (non ufficialmente supportate)

| Sentiero                | Scopo                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Quadlet Podman (contenitore, volume, rete, Redis)                                                                                                                |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                                              |
| `contrib/windows/`      | Lanciatori `.bat` per l'esecuzione da un checkout Windows                                                                                                        |
| `contrib/session-sync/` | README per un'estensione del browser di sincronizzazione della sessione di terze parti — vedere [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Sentiero                        | Scopo                                                                      |
| ------------------------------- | -------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Plugin di comando minimo — vedi [PLUGINS.md](../frameworks/PLUGINS.md)     |
| `examples/plugins/`             | Plugin di esempio: langfuse, request-logger, theme-manager, Welcome-banner |
| `examples/quickstart/`          | Snippet client: curl, Node.js (axios), PHP, Python                         |

---

## `.github/` — GitHub integrazione

| Sentiero                                                     | Scopo                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), scansioni di sicurezza (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), suite `nightly-*.yml` pianificate, pubblicazione (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), flussi di lavoro di rilascio e manutenzione |
| `.github/actions/npm-ci-retry/`                              | Azione composita: `npm ci` con cache e riprova                                                                                                                                                                                                                                                      |
| `.github/actions/prepare-unit-storage/`                      | Azione composita: libera spazio su disco del runner, quindi installa le dipendenze                                                                                                                                                                                                                  |
| `.github/ISSUE_TEMPLATE/`                                    | Moduli per problemi relativi a bug, funzionalità e copertura dei test                                                                                                                                                                                                                               |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Modello PR predefinito più varianti bugfix/feature                                                                                                                                                                                                                                                  |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Proprietari del codice, collegamenti di sponsorizzazione, aggiornamenti delle dipendenze                                                                                                                                                                                                            |
| `.github/labels.yml`                                         | Definizioni delle etichette applicate da `npm run labels:sync`                                                                                                                                                                                                                                      |
| `.github/copilot-instructions.md`                            | istruzioni GitHub Copilot (una superficie di istruzioni dell'agente)                                                                                                                                                                                                                                |

mappa del lavoro CI : [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git hook

| File         | Scopo                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Controllo dell'identità Git, lint-staged, gate manifest, sincronizzazione dei documenti, qualsiasi budget, scala di tipo, controlli degli artefatti tracciati e degli snapshot ui-kit |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` sul messaggio di commit                                                                                                                      |
| `pre-push`   | Intenzionalmente leggero: un controllo di integrità PATH/npm che esce da 0                                                                                                            |

Il runtime dell'hook in `.husky/_/` viene generato al momento dell'installazione e non viene tracciato.

---

## Suggerimenti per la navigazione

- **Nuovo collaboratore?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Cambiare qualcosa di comune** (provider, percorso, modulo DB, strumento MCP, competenza A2A )? Segui [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Aggiungere un fornitore?** Controllare prima [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md), quindi effettuare un controllo incrociato [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Correre localmente?** [SETUP_GUIDE](../guides/SETUP_GUIDE.md)
- **Distribuzione?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Rilasciare?** [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- **Un cancello di qualità ha fallito?** [QUALITY_GATES.md](QUALITY_GATES.md) e [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
