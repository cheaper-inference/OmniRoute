# Repository Map (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Was lebt wo: jedes verfolgte Verzeichnis der obersten Ebene und jede Stammdatei mit einem einzeiligen Zweck.** Letzte Aktualisierung: 13.11.2026 (OmniRoute v3.8.54)
>
> Verwenden Sie diese Karte, um sich in der Codebasis zurechtzufinden, und folgen Sie dann den Links zu den entsprechenden Dokumenten. Die Dateianzahl wurde mit `git ls-files` am oben genannten Datum gemessen. Sie ändern sich mit fast jeder Veröffentlichung. Behandeln Sie sie daher als Größenordnungen.

## Baum der obersten Ebene

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

Lokale, generierte oder private Pfade (alle ignoriert, nie festgeschrieben, nicht weiter beschrieben):

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

## Root-Dateien

Alle verfolgten Dateien im Repository-Stamm (`git ls-files | grep -v /`), gruppiert nach Funktion.

### Projektdokumentation

| Datei                    | Zweck                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `README.md`              | Landingpage: Funktionsübersicht, Schnellstart, Installationsmethoden                 |
| `CHANGELOG.md`           | Änderungsprotokoll pro Release (Fragmente von `changelog.d/` sind hier eingefügt)    |
| `ROADMAP.md`             | Öffentliche Roadmap                                                                  |
| `LICENSE`                | MIT -Lizenz                                                                          |
| `THIRD_PARTY_NOTICES.md` | Hinweise für gebündelten Code von Drittanbietern (z. B. die wreq-js-Bindungen)       |
| `CONTRIBUTING.md`        | Leitfaden für Mitwirkende: Einrichtung, herkömmliche Commits, Testmatrix, PR -Ablauf |
| `SECURITY.md`            | Richtlinie zur Meldung von Sicherheitslücken                                         |
| `CODE_OF_CONDUCT.md`     | Erwartungen an das Gemeinschaftsverhalten                                            |
| `llm.txt`                | Klartext-Projektzusammenfassung für LLM Crawler und -Assistenten                     |

### Anweisungen des KI-Assistenten

| Datei       | Zweck                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Eine einzige Quelle der Wahrheit für jeden AI Assistenten: Konventionen, Quality Gates, harte Regeln |
| `CLAUDE.md` | Claude-Code-spezifische Deltas; importiert `AGENTS.md`                                               |
| `GEMINI.md` | Zwillingsspezifische Deltas; zeigt zurück auf `AGENTS.md`                                            |

Neben dem Code, den sie beschreiben, gibt es auch verschachtelte Anleitungen: `open-sse/services/AGENTS.md` und `src/lib/db/AGENTS.md`.

### Paketmanifeste und Knoten-Toolchain

| Datei                      | Zweck                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `package.json`             | npm-Manifest: Skripte, Abhängigkeiten, `engines`, `workspaces`, veröffentlichtes `files` |
| `package-lock.json`        | Gesperrter Abhängigkeitsbaum                                                             |
| `pnpm-workspace.yaml`      | pnpm-Arbeitsbereichsliste (`packages/*`, `open-sse`) und Native-Build-Zulassungsliste    |
| `.npmrc` / `.npmignore`    | NPM-Konfigurations- und Veröffentlichungsausschlüsse                                     |
| `.node-version` / `.nvmrc` | Knotenversionspins für Versionsmanager                                                   |
| `flake.nix` / `flake.lock` | Nix-Entwickler-Shell und ihre Sperre                                                     |
| `Makefile`                 | `make` Verknüpfungen, die an die NPM-Skripte delegieren                                  |

### TypeScript, Next.js und docs build

| Datei                                     | Zweck                                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Basis- TypeScript -Konfiguration und Pfad-Aliase (`@/*`, `@omniroute/open-sse`)               |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` Scheibe                                                              |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (strenges `noImplicitAny`) Slice                          |
| `tsconfig.typecheck-api.json`             | API-Route-Typecheck-Slice (`scripts/check/check-api-typecheck.mjs`)                           |
| `tsconfig.typecheck-dashboard.json`       | Dashboard-Typprüfungsabschnitt (`npm run check:dashboard-typecheck`)                          |
| `tsconfig.build.json`                     | Produktionstypprüfung (`npm run typecheck:build`, `check:build-typecheck`)                    |
| `tsconfig.mitm.json`                      | MITM Build-Konfiguration, die von `scripts/build/buildMitm.mjs` verwendet wird                |
| `next.config.mjs`                         | Next.js 16-Konfiguration (eigenständige Ausgabe, Build-Profil-Aliase)                         |
| `source.config.ts`                        | Fumadocs `defineDocs` -Konfiguration: Welche `docs/` Abschnitte werden in `/docs` kompiliert? |
| `postcss.config.mjs`                      | PostCSS / Tailwind -Pipeline                                                                  |

### Flusen und Formatierung

| Datei                                     | Zweck                                                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `eslint.config.mjs`                       | Haupt ESLint Flat-Konfiguration (`npm run lint`, mit `config/quality/eslint-suppressions.json`)                                      |
| `eslint.complexity-ratchets.config.mjs`   | Eigenständige Konfiguration, die von den Ratschen für Komplexität und kognitive Komplexität in einem ESLint Durchgang verwendet wird |
| `eslint.complexity.config.mjs`            | Eigenständige Konfiguration mit nur Kern `complexity` + `max-lines-per-function` (wird von Tests verwendet)                          |
| `prettier.config.mjs` / `.prettierignore` | Prettier -Regeln und Ausschlüsse                                                                                                     |
| `.editorconfig`                           | Editor-Standardeinstellungen (Einrückung um zwei Leerzeichen)                                                                        |
| `.markdownlint.json`                      | Beratender Markdown-Lint (`npm run lint:md`)                                                                                         |
| `.vale.ini`                               | Beratender Prosa-Lint (`npm run lint:prose`), Vokabular in `.vale/`                                                                  |

### Tests, Bewertung und Abdeckung

| Datei                         | Zweck                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (Dashboard `.tsx`, Hooks, memory/skills -Tests)     |
| `vitest.mcp.config.ts`        | Knoten- Vitest Suite: `npm run test:vitest` (MCP Server, autoCombo, Combo, API `.spec.ts`)       |
| `vitest.quarantine.config.ts` | Führt die in `config/quality/vitest-exclusions.json` aufgeführten Quarantänedateien aus          |
| `vitest.e2e-live.config.ts`   | Live-Server- Vitest Suiten (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                    |
| `stryker.conf.mjs`            | Stryker-Mutationstest (`npm run test:mutation`; berechnet `tap.testFiles` aus `mutate`)          |
| `stryker.disablebail.mjs`     | Stryker-Variante ohne Bügel, für Test-Redundanzmessung                                           |
| `promptfooconfig.yaml`        | promptfoo LLM-Sicherheitssuite                                                                   |
| `codecov.yml`                 | Codecov-Patch-Abdeckungseinstellungen                                                            |

### Docker und Bereitstellung

| Datei                             | Zweck                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `Dockerfile`                      | Mehrstufiges Bild (`builder` → `runner-base` → `runner-web` / `runner-cli*`)             |
| `Dockerfile.bun`                  | Alternatives Image auf der Bun -Laufzeit (erstellt von `docker-publish.yml`)             |
| `docker-compose.yml`              | Standardmäßiges Verfassen mit Profilen (Basis, Web, CLI, Host, Speicher, Cliproxyapi, …) |
| `docker-compose.prod.yml`         | Separate Production-Snapshot-Instanz auf Port 20130                                      |
| `docker-compose.selfhost.yml`     | Ein-Befehl-Loopback-Selbsthost (gepaart mit `.env.selfhost.example`)                     |
| `docker-compose.ollama-local.yml` | Docker OmniRoute spricht mit einem Host-nativen Ollama                                   |
| `.dockerignore`                   | Docker -Build-Kontext-Ausschlüsse                                                        |
| `fly.toml`                        | Fly.io-App-Konfiguration (Port 20128, `/data` Volume)                                    |

### Sicherheits-, Lieferketten- und Repository-Bots

| Datei                                        | Zweck                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | Gitleaks-Secret-Scan-Regeln und Zulassungslisten                                             |
| `.trivyignore`                               | Akzeptierte Risikounterdrückung für den Container-Image-Scan                                 |
| `.zizmor.yml`                                | zizmor GitHub Actions security-audit config                                                  |
| `socket.yml`                                 | Socket.dev-App-Konfiguration (Pfad wird ignoriert; kein CI Gate)                             |
| `sonar-project.properties`                   | SonarQube/SonarCloud -Projektkonfiguration                                                   |
| `knip.json`                                  | Nicht verwendete files/exports/deps -Konfiguration knipsen (Feeds `npm run check:dead-code`) |
| `.size-limit.json`                           | Budgets in Bundle-Größe                                                                      |
| `.mergify.yml`                               | Merge-Queue-Konfiguration zusammenführen                                                     |
| `.coderabbit.yaml`                           | CodeRabbit -Überprüfungskonfiguration                                                        |
| `.cbmignore`                                 | Ignorierliste für den Codeindex codebase-memory-mcp                                          |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorieren Sie Regeln, LF -Zeilenenden für Skripte und kanonische Autorenidentitäten         |

### Umgebungsvorlagen, Status und Feeds

| Datei                       | Zweck                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `.env.example`              | Vorlage bei der ersten Installation nach `.env` kopiert; Referenzliste der Umgebungsvariablen |
| `.env.selfhost.example`     | Vorlage für `docker-compose.selfhost.yml`                                                     |
| `.env.homolog.example`      | Vorlage für den Homologationsläufer (`npm run homolog`)                                       |
| `.env.devin-bridge.example` | Beispiel-Env-Datei für das Devin -Bridge-Setup                                                |
| `.i18n-state.json`          | Inkrementeller Übersetzungsstatus (Quell-Hashes pro Dokument und Gebietsschema)               |
| `news.json`                 | Lokalisierter Ankündigungs-Feed (Schema v2), der vom Dashboard gelesen wird                   |

---

## `src/` — Next.js Anwendung

Ungefähr 4.550 verfolgte Dateien. Pfadalias `@/*` → `src/*`.

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

| Weg                                                                 | Zweck                                                                                                                                                                                                  |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                       | Öffentliches OpenAI-kompatibles API: Chat, Vervollständigungen, Antworten, Nachrichten, Einbettungen, Bilder, Audio, Videos, Musik, Neubewertung, Moderationen, Suche, Dateien, Stapel, WS, Modelle, … |
| `app/api/v1beta/`                                                   | Endpunkte im Gemini-Stil                                                                                                                                                                               |
| `app/api/` (andere Ordner)                                          | Verwaltungs- und Admin-Routen: Anbieter, Kombinationen, Einstellungen, Schlüssel, Nutzung, Protokolle, MCP, A2A, ACP, Speicher, Fähigkeiten, Auswertungen, Webhooks, Tunnel, Plugins, Radar, Tools, …  |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                  | Verkehrsinspektor REST API — siehe [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                          |
| `app/(dashboard)/dashboard/`                                        | Ein Ordner pro Dashboard-Abschnitt (Anbieter, Kombinationen, Protokolle, Nutzung, Kosten, Cache, Komprimierung, Speicher, Spielplatz, Suchtools, Einstellungen, Tools, …)                              |
| `app/(dashboard)/home/`                                             | Startbildschirm und seine Widgets                                                                                                                                                                      |
| `app/docs/`                                                         | Docs Viewer, der die in `source.config.ts` aufgeführten Fumadocs-Abschnitte darstellt                                                                                                                  |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Root-Layout, Root-Eintrag (Weiterleitungen), PWA -Manifest, globales CSS                                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Fehlergrenzen und Fallbacks                                                                                                                                                                            |

API Routen folgen `Route → CORS → Zod validation → optional auth → policy → handler`; siehe [ARCHITECTURE.md](ARCHITECTURE.md) und [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — -Serverbibliotheken

Ungefähr 90 Unterordner plus ungefähr 90 Module der obersten Ebene. Hauptgruppen:

| Bereich                        | Ordner/Dateien                                                                                                      | Tiefer Tauchgang                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Datenbank                      | `db/` — Domänenmodule, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                              | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Nutzung, Quote und Ausgaben    | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Anbieter und Modelle           | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth und Anmeldeinformationen | `oauth/` (Anbieter/, Dienste/, Dienstprogramme/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`          | `resolvePublicCred()` (Betreiberdokument, nicht öffentlich bereitgestellt)                                                                     |
| Sicherheit und Governance      | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Agentenfunktionen              | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plugins und Dienste            | `plugins/`, `services/` (Installateure und Supervisor für eingebettete Dienste)                                     | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Routing und Belastbarkeit      | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxys und Netzwerke           | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, Tunnelmodule                                   | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Jobs und Terminplanung         | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Beobachtbarkeit und Export     | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| CLI und IDE Integration        | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Kontextquellen                 | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Weitere Funktionen             | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Wissenswerte Top-Level-Module:

| Datei                                                          | Zweck                                                                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Antwort-Caching und Idempotenz                                                            |
| `webhookDispatcher.ts`                                         | HMAC-signierte Webhook-Zustellung                                                         |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Tunnelmanager                                                                             |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Integritätsprüfungen der Anmeldeinformationen im Hintergrund und Aktualisierungsschaltung |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Desinfektionsmittel für Streaming-Antworten                                               |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Prozesslebenszyklus                                                                       |
| `*.stub.ts`                                                    | Build-Profil-Stubs, die durch Aliase in `next.config.mjs` eingefügt wurden                |

### `src/lib/db/` — Datenbank

| Weg                   | Zweck                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` Singleton (WAL Journaling)                                                                                                 |
| `db/migrations/`      | Nummerierte, idempotente `.sql` Migrationen (236 Dateien zum Zeitpunkt des Schreibens; `check-migration-numbering.mjs` -Guards-Nummerierung) |
| `db/migrationRunner/` | Migrationsläufer                                                                                                                             |
| `db/adapters/`        | SQLite -Treiberadapter (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                                     |
| `db/repositories/`    | SQLite -Repository-Implementierungen (Combos, Playground-Voreinstellungen, Routing-Konfiguration)                                            |
| `db/<domain>.ts`      | Etwa 175 Domänenmodule (Anbieter, Combos, apiKeys, Einstellungen, Nutzung, …) — importiert diese immer direkt                                |

### `src/domain/`, `src/server/`, `src/shared/`

| Weg                                                            | Zweck                                                                                                                                                       |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Richtlinien-Engine                                                                                                                                          |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Fallback-Entscheidungen, Sperrpolitik, Kostenregeln                                                                                                         |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Kontingent-Cache und Snapshot-Persistenz                                                                                                                    |
| `domain/assessment/`                                           | Modellbewertung (Beurteiler, Kategorisierer, Selbstheiler)                                                                                                  |
| `server/authz/`                                                | Autorisierungspipeline und Route Guard (`routeGuard.ts`) — siehe [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS Ursprungsauflösung und CORS — siehe [CORS.md](../security/CORS.md)                                                                            |
| `server/ws/`                                                   | Live-Dashboard WebSocket Server                                                                                                                             |
| `shared/components/`                                           | Dashboard-Komponenten und Adapter über `packages/ui-kit` — siehe [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                       |
| `shared/constants/`                                            | Anbieterkatalog (`providers.ts`), Routing-Strategien, CLI Tools, Icon Map, Upstream-Header-Denylist, …                                                      |
| `shared/validation/`                                           | Zod -Schemas und Validierungshelfer                                                                                                                         |
| `shared/utils/`                                                | Leistungsschalter, API-Schlüsselauthentifizierung, Abruf-Timeouts, Feature-Flags, …                                                                         |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Chat-Zugangs-Middleware, Netzwerk-Helfer, Client-Services, React Hooks                                                                                      |

---

## Arbeitsbereich `open-sse/` — -Streaming-Engine

npm workspace `@omniroute/open-sse` (ca. 2.390 verfolgte Dateien). Es übernimmt die Anforderungsverarbeitung und die Ausführung durch den Anbieter. Übersicht: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Weg                                                                                            | Zweck                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Combo-Routing-Strategien — siehe [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                        |
| `autoCombo/`                                                                                   | Auto-Combo-Wertung und Moduspakete                                                                                                                                |
| `accountFallback.ts` + `accountFallback/`                                                      | Verbindungsabklingzeit und Modellsperre — siehe [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                        |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Ratenbegrenzungsverfolgung und Header-Analyse                                                                                                                     |
| `compression/`                                                                                 | Komprimierungs-Engines (`engines/`), Regelpakete (`rules/`), `eval/`, `harness/`, `riskGate/` — siehe [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Token-Aktualisierung, Nutzungsabrechnung, Caching, Zulassungsspuren, Sitzungspools, Codex -Konten, Routing-Helfer                                                 |
| `__tests__/`                                                                                   | Gemeinsam angeordnete Vitest Suiten (von den Vitest Konfigurationen gesammelt)                                                                                    |
| `AGENTS.md`                                                                                    | Agentenhandbuch für diesen Ordner                                                                                                                                 |

Muster: Ein großes Modul `X.ts` neben einem Ordner `X/` bedeutet, dass das Modul in kleinere Dateien aufgeteilt wurde (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Weg                   | Zweck                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `server.ts`           | Lebenszyklus MCP Servers                                                                                                  |
| `httpTransport.ts`    | Streambare HTTP und SSE -Transporte                                                                                       |
| `scopeEnforcement.ts` | Überprüfung des Umfangs pro Werkzeug                                                                                      |
| `audit.ts`            | Audit-Protokollierung von Tool-Aufrufen                                                                                   |
| `schemas/`            | Werkzeugdefinitionen und -bereiche                                                                                        |
| `tools/`              | Tool-Implementierungen (Speicher, Fähigkeiten, Komprimierung, …)                                                          |
| `toolSearch/`         | Werkzeugsuche                                                                                                             |
| `README.md`           | Hinweise zur internen Architektur; Der vollständige Katalog befindet sich in [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm-Arbeitsbereiche

| Weg                      | Zweck                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: verkaufter Schnappschuss des Keak CI UI Kits, der als Quelle verwendet wird. `UPSTREAM.md` pinnt den Upstream-Commit, `PATCHES.md` listet lokale Patches auf. `src/` wird nur von `scripts/dev/sync-ui-kit.sh` synchronisiert und von `npm run check:ui-kit-snapshot` geschützt. Siehe [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: Browser-Pool-Schnittstellen und Implementierung (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Gelistet in `workspaces`; Der vom Gateway verwendete Laufzeitbrowserpool befindet sich in `open-sse/services/`                                                                     |

## `@omniroute/` — veröffentlichte separat Pakete

Dies sind keine NPM-Arbeitsbereiche. Jeder hat seine eigene `package.json` und Sperrdatei; Der Ordner wird im `omniroute` Tarball (`files: ["@omniroute/"]`) geliefert.

| Weg                              | Zweck                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@omniroute/opencode-plugin/`    | OpenCode -Plugin (Modellerkennung, `/connect` -Authentifizierung); Wird von `omniroute setup-opencode` — verwendet, siehe [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode Plugin für das v2 Promise API — siehe [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                                            |
| `@omniroute/opencode-provider/`  | Statischer Konfigurationsgenerator; in seinem eigenen `package.json` zugunsten von `opencode-plugin` als veraltet markiert                                         |

---

## `bin/` — CLI und OPS-Skripte

| Weg                                                                         | Zweck                                                                                                                   |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Haupt CLI -Eintrag (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                                      |
| `reset-password.mjs`                                                        | `omniroute-reset-password` Binärdatei                                                                                   |
| `mcp-server.mjs`                                                            | MCP stdio-Einstiegspunkt                                                                                                |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Hilfsbrücken-/ MCP -Einstiegspunkte                                                                                     |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM Auflösungs-Hook, der tsconfig-Pfadaliase für globale Installationen zuordnet                                        |
| `nodeRuntimeSupport.mjs`                                                    | Unterstützte Node.js -Versionsprüfung                                                                                   |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Selbsthostende Skripts zur Wiederherstellung von Vorfällen ( `_ops-common.sh` teilen)                                   |
| `cold-start-bench.sh`                                                       | Kaltstart-Benchmark — siehe [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                                 |
| `cli/commands/`                                                             | Ein Modul pro CLI -Befehl (ca. 100, einschließlich der `setup-*` Integrationen)                                         |
| `cli/api-commands/`                                                         | Generiert aus `docs/openapi.yaml` von `npm run build:cli-api` — nicht bearbeiten                                        |
| `cli/locales/`                                                              | CLI -Nachrichtenkataloge (67 Gebietsschemas)                                                                            |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                                             |
| `cli/tray/`                                                                 | Taskleiste und Autostart (Windows PowerShell Backend, Systray auf macOS/Linux)                                          |
| `cli/runtime/`                                                              | Native Laufzeitauflösung (`sqliteRuntime.mjs`, `magicBytes.mjs`), Prozess-Supervisor                                    |
| `cli/*.mjs`                                                                 | Gemeinsame Helfer (Argumente, API Client, Datenverzeichnis, Verschlüsselung, Anbieterspeicher, Einstellungsspeicher, …) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI Interna und Konventionen                                                                                            |

Siehe [CLI-TOOLS.md](../reference/CLI-TOOLS.md) und [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — Desktop-App

| Weg                                                        | Zweck                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `main.js`                                                  | Electron -Hauptprozess (Fenster, eingebetteter Server, Taskleiste, Updates)                  |
| `preload.js`                                               | IPC -Brücke für den Renderer verfügbar gemacht                                               |
| `lib/`                                                     | Fensterlebenszyklus, Serverbereitschaft, Integritätsüberwachung, Remote-Server-Einstellungen |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Eingabeaufforderungsfenster für den Remote-Server                                            |
| `processTree.js`, `sqlite-inspection.js`                   | Helfer für die Bereinigung von untergeordneten Prozessen und SQLite Inspektion               |
| `package.json` / `package-lock.json`                       | Electron-Builder-Konfiguration und Electron Abhängigkeiten                                   |
| `assets/`                                                  | App- und Tray-Symbole (`.ico`, `.icns`, `.png`)                                              |
| `README.md`                                                | Interne Hinweise — siehe [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                    |

## statische Assets `public/` —

| Weg                                         | Zweck                                                                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Von id (`/providers/<id>.svg`) geladene Anbieterlogos; Herkunft in `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Browser- und PWA -Symbole                                                                                            |
| `sw.js`                                     | Servicemitarbeiter — siehe [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                    |
| `openapi.yaml`                              | Von `npm run gen:public-openapi` generierte Kopie von `docs/openapi.yaml`                                            |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-Flow-Diagramme, Sponsorenbanner, README Artwork                                                                 |

## `skills/` — Agentenfähigkeiten

46 Fertigkeiten, jeweils ein Ordner mit einem `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`) plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` liest sie zur Laufzeit und macht sie über `/api/agent-skills`, MCP und A2A verfügbar. Die meisten Manifeste werden von `src/lib/agentSkills/generator.ts` generiert (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` prüft auf Drift). Siehe [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — Bau, Tore und Werkzeuge

Ungefähr 435 verfolgte Dateien. Neue Skripte werden in einem der von `AGENTS.md` zugelassenen Unterordner abgelegt. Einmaliger Code geht in `scripts/ad-hoc/`.

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

Häufig genutzte Einstiegspunkte:

| Skript                                                              | Zweck                                                                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` -Läufer                                                                             |
| `build/build-next-isolated.mjs`                                     | `npm run build` (Next.js eigenständiger Build)                                                                  |
| `build/prepublish.ts`                                               | `npm run build:cli`: stellt den npm `dist/` zusammen                                                            |
| `build/postinstall.mjs`                                             | npm `postinstall` Hook                                                                                          |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                                    |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regeneriert PROVIDER_REFERENCE.md)                                            |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (erzeugt `src/app/docs/lib/openapi.generated.ts`)                                               |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (Dokumentenspiegel)                                                                          |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                                       |
| `release/aggregate-changelog.mjs`                                   | Faltet `changelog.d/` -Fragmente zu `CHANGELOG.md`                                                              |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (Doc Accuracy Gate)                                                             |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blockiert verfolgte Root- `_*` Pfade)                                        |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrische Ratsche gegen `config/quality/`)                                           |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                              |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                          |
| `dev/new-worktree.sh`                                               | Erstellt einen isolierten Entwicklungsarbeitsbaum — siehe [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Synchronisiert `packages/ui-kit/src` mit einem angehefteten Upstream-Commit                                     |

Gate-Inventar und Richtlinien: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — versionierte Konfiguration und Gate-Status

| Weg                                      | Zweck                                                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Unterstützte Gebietsschemas (Quelle der Gebietsschemaanzahl) und ihr Schema                                           |
| `payloadRules.json`                      | Upstream-Payload-Regeln (`open-sse/services/payloadRules.ts`)                                                         |
| `cli-tools-manifest.json`                | Manifest integrierbarer CLI Tools (`bin/cli/cli-manifest.mjs`)                                                        |
| `alibaba-free-tier-allowlist.json`       | Zulassungsliste für Alibaba Free-Tier-Modelle                                                                         |
| `ci/toolchain.json`                      | CI Toolchain-Versionen                                                                                                |
| `quality/quality-baseline.json`          | Multimetrische Ratchet-Basislinie (Abdeckung, Warnungen, Duplikate usw.)                                              |
| `quality/*-baseline.json`                | Eingefrorene Baselines für einzelne Gates (Komplexität, Duplizierung, Dateigröße, Typecheck-Slices, Testerkennung, …) |
| `quality/*-allowlist.json`               | Gate-Zulassungslisten (Abhängigkeiten, Lizenzen, AI Zuordnung, Tests auf vergessene Geschwister, …)                   |
| `quality/eslint-suppressions.json`       | Von `npm run lint` angewendete eingefrorene ESLint -Unterdrückungen                                                   |
| `quality/gate-manifest.json`             | Gate-Manifest von `scripts/quality/gate-manifest.mjs` überprüft                                                       |
| `quality/vitest-exclusions.json`         | Quarantäneinventar für `vitest.quarantine.config.ts`                                                                  |
| `quality/skill-templates/`               | Von `scripts/quality/check-skill-contract.mjs` geprüfte kanonische SKILL.md -Vorlagen                                 |
| `quality/release-acceptance.schema.json` | Freigabe-Annahme-Beweisschema — siehe [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                    |
| `release/`                               | Änderungsprotokollabgleiche und das native Manifest von wreq-js, Lizenzinventar und Hinweise                          |

## `changelog.d/` — Changelog-Fragmente

Ein PR fügt ein Fragment hinzu, anstatt `CHANGELOG.md` zu bearbeiten: `features/`, `fixes/` oder `maintenance/` mit dem Namen `<PR-number>-<slug>.md`. Zum Zeitpunkt der Veröffentlichung faltet `scripts/release/aggregate-changelog.mjs` sie in `CHANGELOG.md` ein und löscht sie; `npm run check:changelog-integrity` validiert sie. Details in `changelog.d/README.md`.

---

## öffentliche Dokumentation `docs/` —

In `source.config.ts` aufgeführte Abschnitte werden auf der `/docs` Site kompiliert (mit Ausnahme einiger Sicherheitsseiten, die nur für Bediener bestimmt sind). `docs/meta.json` legt die Reihenfolge der Seitenleiste fest. Beginnen Sie bei [README.md](../README.md).

| Weg                       | Inhalt                                                                                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`        | Schnellstart, Selbsthosting, Anbieter, kostenlose Stufen, Auto-Combo und Web-Cookie-Anleitungen                                                                               |
| `guides/`                 | Bediener- und Entwicklerhandbücher: Setup, Docker, Electron, PWA, Termux, CLIs, I18N, Fehlerbehebung, Benutzerhandbuch                                                        |
| `architecture/`           | Architektur, Codebasisreferenz, Änderungsrezepte, Authentifizierung, Ausfallsicherheit, Qualitätstore, Designsystem, diese Karte                                              |
| `reference/`              | API -Referenz, Umgebungsvariablen, Feature-Flags, CLI Tools, kostenlose Stufen, generierte Anbieterreferenz, entfernte Anbieter                                               |
| `frameworks/`             | MCP, A2A, ACP, Fähigkeiten, Speicher, Plugins, Cloud-Agenten, Webhooks, Auswertungen, Protokollexport, Radar, Playground, …                                                   |
| `routing/`                | Auto-Combo, Argumentation replay/routing, Quotenanteil, Abonnementleiter, strikte Nullkosten, …                                                                               |
| `security/`               | Leitplanken, Fehlerbereinigung, CORS, SSO, Ausgangsrichtlinie, Route-Guard-Ebenen, Lieferkette, …                                                                             |
| `compression/`            | Komprimierungsleitfaden, Engines, RTK, Regelformat, Sprachpakete, Kontextbearbeitung                                                                                          |
| `ops/`                    | Release-Flow, Verzweigung, Merge-Train, Bereitstellung (VM, Fly.io, Kubernetes), Datenbank, Proxys, Arbeitsbäume, Details zu harten Regeln                                    |
| `providers/`              | Anbieterspezifische Leitfäden (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                                           |
| `comparison/`             | OmniRoute im Vergleich mit Alternativen                                                                                                                                       |
| `integrations/`           | Integrationshinweise (fal.ai native, MarkItDown MCP); nicht in `/docs` kompiliert                                                                                             |
| `openapi.yaml`            | OpenAPI -Quelle; speist `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` und `bin/cli/api-commands/`                                                            |
| `diagrams/`               | Mermaid-Quellen (`.mmd`), gerendertes SVGs (`exported/`) und README SVGs aus `scripts/docs/gen-readme-*`                                                                      |
| `assets/`                 | Sprachkennzeichnung von SVGs und anderen README Assets                                                                                                                        |
| `screenshots/`            | Von der README und den Guides verwendete Screenshots                                                                                                                          |
| `i18n/`                   | Übersetzte Spiegel: ein Ordner pro Gebietsschema (66) mit Root-Dokumenten und einer `docs/` Teilmenge; produziert von `npm run i18n:run` — siehe [I18N.md](../guides/I18N.md) |
| `*.md` der obersten Ebene | `README.md` (Dokumentindex), `DEVELOPER-ENVIRONMENT.md` und ein paar eigenständige Notizen                                                                                    |

Wichtige Einstiegspunkte: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generiert von `npm run gen:provider-reference`).

---

## `tests/` — -Testsuiten

Ungefähr 9.670 verfolgte Dateien. Testdateien gehören hierher, nicht in das Projektstammverzeichnis. Ausnahmen: die gemeinsam gespeicherten `__tests__/` Ordner in `src/` und `open-sse/`, die von den Vitest Konfigurationen erfasst werden.

| Weg                                                    | Inhalt                                                                                                                                                                               | Läufer                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Unit-Tests (über 9.000 Dateien): viele auf der obersten Ebene, plus Domänenordner (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Knotentestläufer (`npm run test:unit`); `*.tsx` über `test:vitest:ui`                   |
| `tests/unit/serial/`                                   | CPU-empfindliche Tests werden mit Parallelität 1 ausgeführt                                                                                                                          | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest Suiten innerhalb des Einheitenbaums                                                                                                                                           | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Multimodul- und DB Integrationstests; `combo-matrix/`, `combo-live/`, `services/`                                                                                                    | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + Live-Suiten `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                 | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` gegen eine laufende Instanz                                                                                                                                         | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologationssuiten (`api/`, `ui/` mit eigener Playwright Konfiguration)                                                                                                             | `npm run homolog` — siehe [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                     |
| `tests/load/`                                          | Skripte laden und einweichen (k6)                                                                                                                                                    | Nächtlicher Resilienz-Workflow                                                          |
| `tests/_setup/`                                        | `--import` /Setup-Dateien (isoliertes Datenverzeichnis, Egress Guard, Vitest UI Polyfills)                                                                                           | Beladen von den Läufern                                                                 |
| `tests/_helpers/`, `tests/helpers/`                    | Gemeinsame Testhelfer (Golden Snapshots, Management Session, …)                                                                                                                      | Durch Tests importiert                                                                  |
| `tests/fixtures/`                                      | Vorrichtungsdaten und untergeordnete Prozessvorrichtungen                                                                                                                            | Durch Tests importiert                                                                  |
| `tests/snapshots/`                                     | Goldene Dateien für `tests/helpers/goldenSnapshot.ts`                                                                                                                                | Durch Tests importiert                                                                  |
| `tests/manual/`                                        | `.http` Dateien für manuelle REST Aufrufe                                                                                                                                            | Handbuch                                                                                |
| `tests/security/`                                      | Sicherheits-Shell-Skripte                                                                                                                                                            | Manuelle / Unit-Test-Vorrichtungen                                                      |
| `tests/types/`                                         | Vertragsbestandteile auf Typebene                                                                                                                                                    | —                                                                                       |

Vollständige Matrix: `CONTRIBUTING.md` → „Running Tests“ und [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Weg                                                | Zweck                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `deploy/helm/omniroute/`                           | Helm-Diagramm (`Chart.yaml`, `values.yaml`, Vorlagen für Bereitstellung, Service, Ingress, PVC, Secret, Configmap) |
| `deploy/kubernetes/base/`                          | Kustomize-Basis (Namespace, Bereitstellung, Dienst, PVC, configmap, `secret.example.yaml`)                         |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Clusterspezifische Overlays (Eingang, Speicherklasse, Ressourcen, Sonden)                                          |

Siehe [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — Hilfsbilder

| Weg                                 | Zweck                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `docker/chatgpt-web-codex-browser/` | Headless-Browser-Image mit einem CDP -Proxy für den ChatGPT Web-Executor — siehe [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin -Bridge-Image, Datei erstellen, Mocks und Netzwerkschutz                                                                 |
| `docker/vnc-browser/`               | Chromium mit VNC für interaktive Browsersitzungen                                                                              |

Das Hauptbild ist die Wurzel `Dockerfile`; siehe [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## `contrib/` — -Community-Rezepte (nicht offiziell unterstützt)

| Weg                     | Zweck                                                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman-Quadlets (Container, Volumen, Netzwerk, Redis)                                                                                                      |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                                        |
| `contrib/windows/`      | `.bat` Launcher zum Ausführen von einer Windows -Kasse                                                                                                     |
| `contrib/session-sync/` | README für eine Sitzungssynchronisierungs-Browsererweiterung eines Drittanbieters — siehe [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Weg                             | Zweck                                                                     |
| ------------------------------- | ------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Minimales Befehls-Plugin — siehe [PLUGINS.md](../frameworks/PLUGINS.md)   |
| `examples/plugins/`             | Beispiel-Plugins: Langfuse, Request-Logger, Theme-Manager, Welcome-Banner |
| `examples/quickstart/`          | Client-Snippets: Curl, Node.js (Axios), PHP, Python                       |

---

## `.github/` — GitHub Integration

| Weg                                                          | Zweck                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), Sicherheitsscans (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), geplante `nightly-*.yml` Suites, Veröffentlichung (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), Release- und Wartungsworkflows |
| `.github/actions/npm-ci-retry/`                              | Zusammengesetzte Aktion: `npm ci` mit Cache und Wiederholung                                                                                                                                                                                                                      |
| `.github/actions/prepare-unit-storage/`                      | Zusammengesetzte Aktion: Gibt den Speicherplatz des Läufers frei und installiert dann Abhängigkeiten                                                                                                                                                                              |
| `.github/ISSUE_TEMPLATE/`                                    | Formulare für Bug-, Feature- und Test-Coverage-Probleme                                                                                                                                                                                                                           |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Standard- PR -Vorlage plus bugfix/feature -Varianten                                                                                                                                                                                                                              |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Codebesitzer, Sponsoring-Links, Abhängigkeitsaktualisierungen                                                                                                                                                                                                                     |
| `.github/labels.yml`                                         | Von `npm run labels:sync` angewendete Etikettendefinitionen                                                                                                                                                                                                                       |
| `.github/copilot-instructions.md`                            | GitHub Copilot Anweisungen (eine Agent-Anweisungsoberfläche)                                                                                                                                                                                                                      |

CI Jobkarte: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — Git-Hooks

| Datei        | Zweck                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Git-Identitätsprüfung, Lint-Staging, Gate-Manifest, Dokumentensynchronisierung, Any-Budget, Type-Scale Ratchet, verfolgte Artefakte und UI-Kit-Snapshot-Prüfungen |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` zur Commit-Nachricht                                                                                                     |
| `pre-push`   | Absichtlich leicht: eine PATH/npm -Gesundheitsprüfung, die 0 verlässt                                                                                             |

Die Hook-Laufzeit in `.husky/_/` wird bei der Installation generiert und nicht nachverfolgt.

---

## Navigationstipps

- **Neuer Mitwirkender?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Etwas Gemeinsames ändern** (Anbieter, Route, DB Modul, MCP Tool, A2A Skill)? Folgen Sie [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Anbieter hinzufügen?** Überprüfen Sie zuerst [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) und dann [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) gegen.
- **Lokal laufen?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Bereitstellen?** [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)
- **Freigeben?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **Ein Quality Gate ist fehlgeschlagen?** [QUALITY_GATES.md](QUALITY_GATES.md) und [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
