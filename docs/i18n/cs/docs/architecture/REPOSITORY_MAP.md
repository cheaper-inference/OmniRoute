# Repository Map (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Co kde žije: každý sledovaný adresář a kořenový soubor nejvyšší úrovně s jednořádkovým účelem.** Poslední aktualizace: 2026-11-13 (OmniRoute v3.8.54)
>
> Pomocí této mapy se zorientujte v kódové základně a poté postupujte podle odkazů na vyhrazené dokumenty. Počty souborů byly měřeny pomocí `git ls-files` k výše uvedenému datu. Mění se téměř s každým vydáním, takže s nimi zacházejte jako s řády.

## Strom nejvyšší úrovně

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

Místní, generované nebo soukromé cesty (všechny gitignorované, nikdy potvrzené, nejsou dále popsány):

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

## Kořenové soubory

Všechny sledované soubory v kořenovém adresáři úložiště (`git ls-files | grep -v /`), seskupené podle funkce.

### Projektová dokumentace

| Soubor                   | Účel                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `README.md`              | Vstupní stránka: přehled funkcí, rychlý start, způsoby instalace                    |
| `CHANGELOG.md`           | Protokol změn podle vydání (fragmenty z `changelog.d/` jsou složeny zde)            |
| `ROADMAP.md`             | Veřejná cestovní mapa                                                               |
| `LICENSE`                | licence MIT                                                                         |
| `THIRD_PARTY_NOTICES.md` | Upozornění k přibalenému kódu třetích stran (například vazby wreq-js)               |
| `CONTRIBUTING.md`        | Průvodce pro přispěvatele: nastavení, konvenční odevzdání, testovací matice, tok PR |
| `SECURITY.md`            | Zásady hlášení zranitelnosti                                                        |
| `CODE_OF_CONDUCT.md`     | Očekávání chování komunity                                                          |
| `llm.txt`                | Shrnutí projektu ve formátu prostého textu pro prohledávače a asistenty LLM         |

### Pokyny pro asistenta AI

| Soubor      | Účel                                                                                    |
| ----------- | --------------------------------------------------------------------------------------- |
| `AGENTS.md` | Jediný zdroj pravdy pro každého asistenta AI : konvence, kvalitní brány, tvrdá pravidla |
| `CLAUDE.md` | delty specifické pro Claude Code; dovoz `AGENTS.md`                                     |
| `GEMINI.md` | delty specifické pro Blížence; ukazuje zpět na `AGENTS.md`                              |

Vedle kódu, který popisují, existují také vnořené průvodce: `open-sse/services/AGENTS.md` a `src/lib/db/AGENTS.md`.

### Manifesty balíčků a Toolchain Node

| Soubor                     | Účel                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `package.json`             | npm manifest: skripty, závislosti, `engines`, `workspaces`, publikované `files`                      |
| `package-lock.json`        | Uzamčený strom závislostí                                                                            |
| `pnpm-workspace.yaml`      | seznam pracovních prostorů pnpm (`packages/*`, `open-sse`) a seznam povolených pro nativní sestavení |
| `.npmrc` / `.npmignore`    | npm konfigurace a vyloučení publikování                                                              |
| `.node-version` / `.nvmrc` | Piny verze uzlu pro správce verzí                                                                    |
| `flake.nix` / `flake.lock` | Nix dev shell a jeho zámek                                                                           |
| `Makefile`                 | `make` zkratky, které delegují na skripty npm                                                        |

### sestavení TypeScript, Next.js a docs

| Soubor                                    | Účel                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Základní konfigurace TypeScript a aliasy cesty (`@/*`, `@omniroute/open-sse`)    |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` plátek                                                  |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (přísné `noImplicitAny`) plátek              |
| `tsconfig.typecheck-api.json`             | Slice pro kontrolu typu rozhraní API (`scripts/check/check-api-typecheck.mjs`)   |
| `tsconfig.typecheck-dashboard.json`       | Řez kontroly typu řídicího panelu (`npm run check:dashboard-typecheck`)          |
| `tsconfig.build.json`                     | Typová kontrola výroby (`npm run typecheck:build`, `check:build-typecheck`)      |
| `tsconfig.mitm.json`                      | MITM build config používaný `scripts/build/buildMitm.mjs`                        |
| `next.config.mjs`                         | Next.js 16 config (samostatný výstup, aliasy sestavení profilu)                  |
| `source.config.ts`                        | Konfigurace Fumadocs `defineDocs` : které sekce `docs/` se zkompilují do `/docs` |
| `postcss.config.mjs`                      | potrubí PostCSS / Tailwind                                                       |

### Lint a formátování

| Soubor                                    | Účel                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `eslint.config.mjs`                       | Hlavní konfigurace plochého ESLint (`npm run lint`, se `config/quality/eslint-suppressions.json`)      |
| `eslint.complexity-ratchets.config.mjs`   | Samostatná konfigurace používaná ratchetem složitosti a kognitivní složitosti v jednom průchodu ESLint |
| `eslint.complexity.config.mjs`            | Samostatná konfigurace pouze s jádrem `complexity` + `max-lines-per-function` (používané testy)        |
| `prettier.config.mjs` / `.prettierignore` | pravidla a výjimky Prettier                                                                            |
| `.editorconfig`                           | Výchozí nastavení editoru (odsazení 2 mezerami)                                                        |
| `.markdownlint.json`                      | Poradenské srážky (`npm run lint:md`)                                                                  |
| `.vale.ini`                               | Poradenská próza lint (`npm run lint:prose`), slovní zásoba v `.vale/`                                 |

### Testy, hodnocení a pokrytí

| Soubor                        | Účel                                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` ( `.tsx` řídicího panelu, háčky, testy memory/skills ) |
| `vitest.mcp.config.ts`        | Sada uzlu Vitest : `npm run test:vitest` (server MCP, autoCombo, combo, API `.spec.ts`)             |
| `vitest.quarantine.config.ts` | Spustí soubory v karanténě uvedené v `config/quality/vitest-exclusions.json`                        |
| `vitest.e2e-live.config.ts`   | Suity Vitest na živém serveru (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                       |
| `stryker.conf.mjs`            | Testování mutace Stryker (`npm run test:mutation`; vypočítá `tap.testFiles` z `mutate`)             |
| `stryker.disablebail.mjs`     | Varianta Stryker bez třmenu, pro měření redundance testu                                            |
| `promptfooconfig.yaml`        | promptfoo LLM-bezpečnostní sada                                                                     |
| `codecov.yml`                 | Nastavení pokrytí záplat Codecov                                                                    |

### Docker a nasazení

| Soubor                            | Účel                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| `Dockerfile`                      | Vícefázový obrázek (`builder` → `runner-base` → `runner-web` / `runner-cli*`)              |
| `Dockerfile.bun`                  | Alternativní obrázek v běhovém prostředí Bun (vytvořen `docker-publish.yml`)               |
| `docker-compose.yml`              | Výchozí skládání s profily (základní, web, cli, hostitel, paměť, cliproxyapi, …)           |
| `docker-compose.prod.yml`         | Samostatná instance produkčního snímku na portu 20130                                      |
| `docker-compose.selfhost.yml`     | Samostatný hostitel zpětné smyčky s jedním příkazem (spáruje se s `.env.selfhost.example`) |
| `docker-compose.ollama-local.yml` | Docker OmniRoute mluví s hostitelem Ollama                                                 |
| `.dockerignore`                   | Docker vyloučení kontextu sestavení                                                        |
| `fly.toml`                        | Konfigurace aplikace Fly.io (port 20128, hlasitost `/data` )                               |

### Boti zabezpečení, dodavatelského řetězce a úložiště

| Soubor                                       | Účel                                                                                |
| -------------------------------------------- | ----------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks tajná pravidla a seznamy povolených                                        |
| `.trivyignore`                               | Potlačení akceptovaného rizika pro skenování obrazu kontejneru                      |
| `.zizmor.yml`                                | zizmor GitHub Akce konfigurace security-audit                                       |
| `socket.yml`                                 | Konfigurace aplikace Socket.dev (cesta ignoruje, ne brána CI )                      |
| `sonar-project.properties`                   | konfigurace projektu SonarQube/SonarCloud                                           |
| `knip.json`                                  | Knip nepoužívanou konfiguraci files/exports/deps (zdroje `npm run check:dead-code`) |
| `.size-limit.json`                           | Balíčkové rozpočty                                                                  |
| `.mergify.yml`                               | Sloučit konfiguraci slučovací fronty                                                |
| `.coderabbit.yaml`                           | konfigurace kontroly CodeRabbit                                                     |
| `.cbmignore`                                 | Ignorovat seznam pro index kódu codebase-memory-mcp                                 |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorovat pravidla, konce řádků LF pro skripty, kanonické identity autorů           |

### Šablony prostředí, stav a kanály

| Soubor                      | Účel                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- |
| `.env.example`              | Šablona zkopírována do `.env` při první instalaci; referenční seznam env vars |
| `.env.selfhost.example`     | Šablona pro `docker-compose.selfhost.yml`                                     |
| `.env.homolog.example`      | Šablona pro homologačního běžce (`npm run homolog`)                           |
| `.env.devin-bridge.example` | Příklad souboru env pro nastavení mostu Devin                                 |
| `.i18n-state.json`          | Stav přírůstkového překladu (zdrojové hash pro dokument a národní prostředí)  |
| `news.json`                 | Zdroj lokalizovaných oznámení (schéma v2) čtený řídicím panelem               |

---

## aplikace `src/` — Next.js

Asi 4 550 sledovaných souborů. Cesta alias `@/*` → `src/*`.

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

| Cesta                                                               | Účel                                                                                                                                                                             |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | Veřejné API kompatibilní s OpenAI: chat, dokončení, odpovědi, zprávy, vložení, obrázky, zvuk, videa, hudba, přehodnocení, moderování, vyhledávání, soubory, dávky, ws, modely, … |
| `app/api/v1beta/`                                                   | Koncové body ve stylu Gemini                                                                                                                                                     |
| `app/api/` (jiné složky)                                            | Správa a administrační cesty: poskytovatelé, komba, nastavení, klíče, použití, protokoly, mcp, a2a, acp, paměť, dovednosti, evals, webhooky, tunely, pluginy, radar, nástroje, … |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — viz [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                        |
| `app/api/tools/traffic-inspector/`                                  | Dopravní inspektor REST API — viz [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                     |
| `app/(dashboard)/dashboard/`                                        | Jedna složka na sekci řídicího panelu (poskytovatelé, komba, protokoly, využití, náklady, mezipaměť, komprese, paměť, hřiště, vyhledávací nástroje, nastavení, nástroje, …)      |
| `app/(dashboard)/home/`                                             | Domovská obrazovka a její widgety                                                                                                                                                |
| `app/docs/`                                                         | Prohlížeč dokumentů vykreslující sekce Fumadocs uvedené v `source.config.ts`                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Root layout, root entry (přesměrování), PWA manifest, globální CSS                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Hranice chyb a nouzová řešení                                                                                                                                                    |

API trasy sledují `Route → CORS → Zod validation → optional auth → policy → handler`; viz [ARCHITECTURE.md](ARCHITECTURE.md) a [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — serverové knihovny

Zhruba 90 podsložek plus asi 90 modulů nejvyšší úrovně. Hlavní skupiny:

| Plocha                   | Složky / soubory                                                                                                    | Hluboký ponor                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Databáze                 | `db/` — doménové moduly, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                            | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Využití, kvóta a útrata  | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Poskytovatelé a modely   | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth a pověření         | `oauth/` (poskytovatelé/, služby/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`                | `resolvePublicCred()` (dokument operátora, nezobrazuje se veřejně)                                                                             |
| Bezpečnost a řízení      | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Funkce agenta            | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Pluginy a služby         | `plugins/`, `services/` (instalátoři a supervizor vestavěných služeb)                                               | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Směrování a odolnost     | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxy a vytváření sítí   | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, tunelové moduly                                | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Práce a plánování        | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Pozorovatelnost a export | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| integrace CLI a IDE      | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Kontextové zdroje        | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Další vlastnosti         | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Moduly nejvyšší úrovně, které stojí za to znát:

| Soubor                                                         | Účel                                                             |
| -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Ukládání odezvy do mezipaměti a idempotence                      |
| `webhookDispatcher.ts`                                         | Doručení webhooku podepsaného HMAC                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Správci tunelů                                                   |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Kontrola stavu přihlašovacích údajů na pozadí a obnovovací okruh |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Dezinfekční prostředky s odezvou na streamování                  |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Životní cyklus procesu                                           |
| `*.stub.ts`                                                    | Build-profil stubs zaměněné aliasy v `next.config.mjs`           |

### databáze `src/lib/db/` —

| Cesta                 | Účel                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL journaling)                                                                          |
| `db/migrations/`      | Číslované, idempotentní migrace `.sql` (236 souborů v době psaní; číslování strážců `check-migration-numbering.mjs` ) |
| `db/migrationRunner/` | Migrační běžec                                                                                                        |
| `db/adapters/`        | adaptéry ovladačů SQLite (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                            |
| `db/repositories/`    | implementace úložiště SQLite (komba, přednastavení hřiště, konfigurace směrování)                                     |
| `db/<domain>.ts`      | Asi 175 doménových modulů (poskytovatelé, komba, apiKeys, nastavení, použití, …) — je vždy importuje přímo            |

### `src/domain/`, `src/server/`, `src/shared/`

| Cesta                                                          | Účel                                                                                                                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Modul zásad                                                                                                                                             |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Záložní rozhodnutí, politika blokování, nákladová pravidla                                                                                              |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Kvóta mezipaměti a stálost snímků                                                                                                                       |
| `domain/assessment/`                                           | Hodnocení modelu (hodnotitel, kategorizátor, samoléčitel)                                                                                               |
| `server/authz/`                                                | Strážce autorizačního kanálu a trasy (`routeGuard.ts`) — viz [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | rozlišení původu Public/MCP/WS a CORS — viz [CORS.md](../security/CORS.md)                                                                              |
| `server/ws/`                                                   | Živý server dashboard WebSocket                                                                                                                         |
| `shared/components/`                                           | Komponenty palubní desky a adaptéry přes `packages/ui-kit` — viz [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                   |
| `shared/constants/`                                            | Katalog poskytovatelů (`providers.ts`), strategie směrování, nástroje CLI, mapa ikon, upstream záhlaví denylist, …                                      |
| `shared/validation/`                                           | schémata Zod a pomocníci pro ověřování                                                                                                                  |
| `shared/utils/`                                                | Jistič, ověření klíče API, časové limity načítání, příznaky funkcí, …                                                                                   |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Middleware pro přístup k chatu, síťoví pomocníci, klientské služby, háčky React                                                                         |

---

## `open-sse/` — pracovní prostor streamovacího motoru

npm pracovní prostor `@omniroute/open-sse` (asi 2 390 sledovaných souborů). Provádí zpracování požadavku a realizaci poskytovatele. Přehled: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Cesta                                                                                          | Účel                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Kombinované strategie směrování — viz [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                |
| `autoCombo/`                                                                                   | Auto-Combo bodování a balíčky režimů                                                                                                                           |
| `accountFallback.ts` + `accountFallback/`                                                      | Cooldown připojení a uzamčení modelu — viz [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                          |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Sledování limitu rychlosti a analýza záhlaví                                                                                                                   |
| `compression/`                                                                                 | Kompresní motory (`engines/`), balíčky pravidel (`rules/`), `eval/`, `harness/`, `riskGate/` — viz [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Obnovení tokenu, účtování využití, ukládání do mezipaměti, vstupní pruhy, fondy relací, účty Codex, pomocníci pro směrování                                    |
| `__tests__/`                                                                                   | Společně umístěné sady Vitest (shromážděné konfiguracemi Vitest )                                                                                              |
| `AGENTS.md`                                                                                    | Průvodce agenta pro tuto složku                                                                                                                                |

Vzor: velký modul `X.ts` vedle složky `X/` znamená, že modul byl rozdělen na menší soubory (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Cesta                 | Účel                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `server.ts`           | životní cyklus serveru MCP                                                                      |
| `httpTransport.ts`    | Streamovatelné přenosy HTTP a SSE                                                               |
| `scopeEnforcement.ts` | Kontroly rozsahu jednotlivých nástrojů                                                          |
| `audit.ts`            | Protokolování auditu volání nástroje                                                            |
| `schemas/`            | Definice nástrojů a rozsahy                                                                     |
| `tools/`              | Implementace nástrojů (paměť, dovednosti, komprese, …)                                          |
| `toolSearch/`         | Hledání nástroje                                                                                |
| `README.md`           | Poznámky k vnitřní architektuře; celý katalog je v [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm pracovní prostory

| Cesta                    | Účel                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: prodávaný snímek sady Keak CI UI Kit, použitý jako zdroj. `UPSTREAM.md` připíná upstream potvrzení, `PATCHES.md` uvádí místní patche. `src/` je synchronizován pouze pomocí `scripts/dev/sync-ui-kit.sh` a chráněn pomocí `npm run check:ui-kit-snapshot`. Viz [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: rozhraní a implementace fondu prohlížečů (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Uvedeno v `workspaces`; fond běhového prohlížeče používaný bránou žije v `open-sse/services/`                                                                     |

## `@omniroute/` — samostatně publikované balíčky

Toto nejsou pracovní prostory npm. Každý má svůj vlastní `package.json` a lockfile; složka se odesílá v tarballu `omniroute` (`files: ["@omniroute/"]`).

| Cesta                            | Účel                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | OpenCode plugin (objevení modelu, `/connect` auth); používá `omniroute setup-opencode` — viz [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin pro v2 Promise API — viz [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                     |
| `@omniroute/opencode-provider/`  | generátor statické konfigurace; označeno zavržené ve vlastním `package.json` ve prospěch `opencode-plugin`                            |

---

## skripty `bin/` — CLI a ops

| Cesta                                                                       | Účel                                                                                                           |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Hlavní položka CLI (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                             |
| `reset-password.mjs`                                                        | binární `omniroute-reset-password`                                                                             |
| `mcp-server.mjs`                                                            | vstupní bod MCP stdio                                                                                          |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Pomocný most / vstupní body MCP                                                                                |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM resolve hook, který mapuje aliasy cesty tsconfig pro globální instalace                                    |
| `nodeRuntimeSupport.mjs`                                                    | Podporovaná kontrola verze Node.js                                                                             |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Samohostitelské skripty pro obnovu incidentů (share `_ops-common.sh`)                                          |
| `cold-start-bench.sh`                                                       | Benchmark studeného startu — viz [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                   |
| `cli/commands/`                                                             | Jeden modul na příkaz CLI (asi 100, včetně integrací `setup-*` )                                               |
| `cli/api-commands/`                                                         | Generováno z `docs/openapi.yaml` pomocí `npm run build:cli-api` — neupravujte                                  |
| `cli/locales/`                                                              | katalogy zpráv CLI (67 národních prostředí)                                                                    |
| `cli/tui/`, `cli/tui-components/`                                           | Terminál UI                                                                                                    |
| `cli/tray/`                                                                 | System tray a autostart (Windows PowerShell backend, systray na macOS/Linux)                                   |
| `cli/runtime/`                                                              | Nativní runtime rozlišení (`sqliteRuntime.mjs`, `magicBytes.mjs`), supervizor procesu                          |
| `cli/*.mjs`                                                                 | Sdílení pomocníci (args, API klient, datový adresář, šifrování, úložiště poskytovatelů, úložiště nastavení, …) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | vnitřnosti a konvence CLI                                                                                      |

Viz [CLI-TOOLS.md](../reference/CLI-TOOLS.md) a [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## desktopová aplikace `electron/` —

| Cesta                                                      | Účel                                                                                   |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `main.js`                                                  | hlavní proces Electron (okno, vestavěný server, zásobník, aktualizace)                 |
| `preload.js`                                               | IPC most vystaven rendereru                                                            |
| `lib/`                                                     | Životní cyklus oken, připravenost serveru, hlídač stavu, preference vzdáleného serveru |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Okno výzvy vzdáleného serveru                                                          |
| `processTree.js`, `sqlite-inspection.js`                   | Pomocníci pro čištění dětského procesu a inspekci SQLite                               |
| `package.json` / `package-lock.json`                       | electron-builder config a závislosti Electron                                          |
| `assets/`                                                  | Ikony aplikací a panelu (`.ico`, `.icns`, `.png`)                                      |
| `README.md`                                                | Interní poznámky — viz [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                |

## `public/` — statická aktiva

| Cesta                                       | Účel                                                                                                                          |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Loga poskytovatelů načtená pomocí id (`/providers/<id>.svg`); provenience v `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Ikony prohlížeče a PWA                                                                                                        |
| `sw.js`                                     | Servisní pracovník — viz [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                               |
| `openapi.yaml`                              | Kopie `docs/openapi.yaml` generovaná `npm run gen:public-openapi`                                                             |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flow diagramy, sponzorský banner, README umělecká díla                                                                   |

## `skills/` — dovednosti agenta

46 dovedností, každá složka se `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` je čte za běhu a zpřístupňuje je prostřednictvím `/api/agent-skills`, MCP a A2A. Většina manifestů je generována `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` kontroluje drift). Viz [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — sestavení, brány a nástroje

Asi 435 sledovaných souborů. Nové skripty se ukládají do jedné z podsložek povolených `AGENTS.md`; jednorázový kód jde v `scripts/ad-hoc/`.

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

Často používané vstupní body:

| Skript                                                              | Účel                                                                                                  |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` běžec                                                                     |
| `build/build-next-isolated.mjs`                                     | `npm run build` (samostatné sestavení Next.js )                                                       |
| `build/prepublish.ts`                                               | `npm run build:cli`: sestaví npm `dist/`                                                              |
| `build/postinstall.mjs`                                             | npm `postinstall` hák                                                                                 |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                          |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regeneruje PROVIDER_REFERENCE.md)                                   |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (generuje `src/app/docs/lib/openapi.generated.ts`)                                    |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (zrcadla dokumentů)                                                                |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                             |
| `release/aggregate-changelog.mjs`                                   | Složí fragmenty `changelog.d/` do `CHANGELOG.md`                                                      |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (brána přesnosti dokumentu)                                           |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blokuje sledované kořenové cesty `_*` )                            |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrická ráčna proti `config/quality/`)                                    |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                    |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                |
| `dev/new-worktree.sh`                                               | Vytvoří izolovaný vývojový pracovní strom — viz [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Synchronizuje `packages/ui-kit/src` s připnutým upstreamem                                            |

Inventář a zásady brány: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — verzovaná konfigurace a stav brány

| Cesta                                    | Účel                                                                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Podporovaná národní prostředí (zdroj počtu lokalit) a jejich schéma                                                           |
| `payloadRules.json`                      | Upstream pravidla užitečného zatížení (`open-sse/services/payloadRules.ts`)                                                   |
| `cli-tools-manifest.json`                | Manifest integrovatelných nástrojů CLI (`bin/cli/cli-manifest.mjs`)                                                           |
| `alibaba-free-tier-allowlist.json`       | Alibaba seznam povolených modelů volné úrovně                                                                                 |
| `ci/toolchain.json`                      | verze CI toolchain                                                                                                            |
| `quality/quality-baseline.json`          | Multimetrická základní ráčna (pokrytí, varování, duplikace, …)                                                                |
| `quality/*-baseline.json`                | Zmrazené základní linie pro jednotlivé brány (složitost, duplikace, velikost souboru, řezy pro kontrolu typu, objev testu, …) |
| `quality/*-allowlist.json`               | Seznam povolených bran (závislosti, licence, atribuce AI, testy zapomenutých sourozenců, …)                                   |
| `quality/eslint-suppressions.json`       | Zmrazené potlačení ESLint aplikované pomocí `npm run lint`                                                                    |
| `quality/gate-manifest.json`             | Manifest brány zkontrolovaný `scripts/quality/gate-manifest.mjs`                                                              |
| `quality/vitest-exclusions.json`         | Karanténní inventář pro `vitest.quarantine.config.ts`                                                                         |
| `quality/skill-templates/`               | Kanonické šablony SKILL.md kontrolované `scripts/quality/check-skill-contract.mjs`                                            |
| `quality/release-acceptance.schema.json` | Schéma důkazů o uvolnění a přijetí — viz [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                         |
| `release/`                               | Odsouhlasení protokolu změn a nativní manifest wreq-js, inventář licencí a upozornění                                         |

## `changelog.d/` — fragmenty protokolu změn

PR přidá jeden fragment místo úpravy `CHANGELOG.md`: `features/`, `fixes/` nebo `maintenance/`, pojmenované `<PR-number>-<slug>.md`. V době uvolnění je `scripts/release/aggregate-changelog.mjs` složí do `CHANGELOG.md` a odstraní je; `npm run check:changelog-integrity` je potvrzuje. Podrobnosti v `changelog.d/README.md`.

---

## `docs/` — veřejná dokumentace

Sekce uvedené v `source.config.ts` se zkompilují do webu `/docs` (s vyloučením několika stránek zabezpečení pouze pro operátory); `docs/meta.json` nastavuje pořadí postranního panelu. Začněte na [README.md](../README.md).

| Cesta                  | Obsah                                                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`     | Rychlý start, vlastní hostitel, poskytovatelé, bezplatné úrovně, Auto-Combo a průvodce webovými soubory cookie                                                        |
| `guides/`              | Příručky pro operátory a vývojáře: setup, Docker, Electron, PWA, Termux, CLIs, i18n, odstraňování problémů, uživatelská příručka                                      |
| `architecture/`        | Architektura, reference codebase, modifikační receptury, authz, odolnost, kvalitní brány, designový systém, tato mapa                                                 |
| `reference/`           | reference API, proměnné prostředí, příznaky funkcí, nástroje CLI, bezplatné úrovně, vygenerovaná reference poskytovatele, odstranění poskytovatelé                    |
| `frameworks/`          | MCP, A2A, ACP, dovednosti, paměť, pluginy, cloudové agenty, webhooky, evals, export logu, Radar, Playground, …                                                        |
| `routing/`             | Auto-Combo, uvažování replay/routing, podíl na kvótě, žebříček předplatného, striktní nulové náklady, …                                                               |
| `security/`            | Zábradlí, dezinfekce chyb, CORS, SSO, výstupní politika, úrovně ochrany trasy, dodavatelský řetězec, …                                                                |
| `compression/`         | Průvodce kompresí, motory, RTK, formát pravidel, jazykové balíčky, kontextové úpravy                                                                                  |
| `ops/`                 | Tok vydání, větvení, slučovací vlak, nasazení (VM, Fly.io, Kubernetes), databáze, proxy, pracovní stromy, detail tvrdých pravidel                                     |
| `providers/`           | Příručky pro poskytovatele (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                                      |
| `comparison/`          | OmniRoute ve srovnání s alternativami                                                                                                                                 |
| `integrations/`        | Integrační poznámky (fal.ai native, MarkItDown MCP); není zkompilován do `/docs`                                                                                      |
| `openapi.yaml`         | zdroj OpenAPI ; zdroje `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` a `bin/cli/api-commands/`                                                       |
| `diagrams/`            | Zdroje mořské panny (`.mmd`), vykreslené SVGs (`exported/`) a README SVGs z `scripts/docs/gen-readme-*`                                                               |
| `assets/`              | SVGs s příznakem jazyka a další aktiva README                                                                                                                         |
| `screenshots/`         | Snímky obrazovky používané README a průvodci                                                                                                                          |
| `i18n/`                | Přeložená zrcadla: jedna složka na národní prostředí (66) s kořenovými dokumenty a podmnožinou `docs/` ; vyrábí `npm run i18n:run` — viz [I18N.md](../guides/I18N.md) |
| `*.md` nejvyšší úrovně | `README.md` (index dokumentu), `DEVELOPER-ENVIRONMENT.md` a několik samostatných poznámek                                                                             |

Klíčové vstupní body: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generováno `npm run gen:provider-reference`).

---

## testovací sady `tests/` —

Asi 9 670 sledovaných souborů. Testovací soubory patří sem, ne do kořenového adresáře projektu. Výjimky: společně umístěné složky `__tests__/` v `src/` a `open-sse/`, které shromažďují konfigurace Vitest.

| Cesta                                                  | Obsah                                                                                                                                                                                   | Běžec                                                                                   |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Testy jednotek (více než 9 000 souborů): mnoho na nejvyšší úrovni plus složky domény (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Node testovací běžec (`npm run test:unit`); `*.tsx` přes `test:vitest:ui`               |
| `tests/unit/serial/`                                   | Testy citlivé na CPU běží souběžně 1                                                                                                                                                    | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suites uvnitř stromu jednotek                                                                                                                                                    | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Vícemodulové a integrační testy DB ; `combo-matrix/`, `combo-live/`, `services/`                                                                                                        | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + živé apartmá `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                   | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` proti běžící instanci                                                                                                                                                  | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologační sady (`api/`, `ui/` s vlastní konfigurací Playwright )                                                                                                                      | `npm run homolog` — viz [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                       |
| `tests/load/`                                          | Načíst a namočit skripty (k6)                                                                                                                                                           | Noční pracovní postup odolnosti                                                         |
| `tests/_setup/`                                        | `--import` / setup soubory (izolovaný datový adresář, ochrana výstupu, Vitest UI polyfills)                                                                                             | Nabito běžci                                                                            |
| `tests/_helpers/`, `tests/helpers/`                    | Sdílení pomocníci pro testování (zlaté snímky, relace správy, …)                                                                                                                        | Dovezeno testy                                                                          |
| `tests/fixtures/`                                      | Data příslušenství a příslušenství podřízeného procesu                                                                                                                                  | Dovezeno testy                                                                          |
| `tests/snapshots/`                                     | Zlaté soubory pro `tests/helpers/goldenSnapshot.ts`                                                                                                                                     | Dovezeno testy                                                                          |
| `tests/manual/`                                        | soubory `.http` pro ruční volání REST                                                                                                                                                   | Manuál                                                                                  |
| `tests/security/`                                      | Bezpečnostní shell skripty                                                                                                                                                              | Manuální / unit-test přípravky                                                          |
| `tests/types/`                                         | Upevnění smlouvy na typové úrovni                                                                                                                                                       | —                                                                                       |

Úplná matice: `CONTRIBUTING.md` → "Probíhající testy" a [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Cesta                                              | Účel                                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `deploy/helm/omniroute/`                           | Helm chart (`Chart.yaml`, `values.yaml`, šablony pro nasazení, služba, vstup, PVC, tajné, konfigurační mapa) |
| `deploy/kubernetes/base/`                          | Přizpůsobit základnu (namespace, deployment, service, PVC, configmap, `secret.example.yaml`)                 |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Překryvy specifické pro klastr (vstup, třída úložiště, prostředky, sondy)                                    |

Viz [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — pomocné obrázky

| Cesta                               | Účel                                                                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Bezhlavý obrázek prohlížeče s proxy CDP pro ChatGPT Web exekutor — viz [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Obrázek mostu Devin, skládání souboru, simulace a ochrana sítě                                                       |
| `docker/vnc-browser/`               | Chromium se VNC pro interaktivní relace prohlížeče                                                                   |

Hlavní obrázek je kořen `Dockerfile`; viz [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## recepty komunity `contrib/` — (oficiálně nepodporované)

| Cesta                   | Účel                                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman kvadlety (kontejner, objem, síť, Redis)                                                                                               |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                          |
| `contrib/windows/`      | spouštěče `.bat` pro spouštění z pokladny Windows                                                                                            |
| `contrib/session-sync/` | README pro rozšíření prohlížeče pro synchronizaci relací třetí strany — viz [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Cesta                           | Účel                                                                      |
| ------------------------------- | ------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Minimální příkazový plugin — viz [PLUGINS.md](../frameworks/PLUGINS.md)   |
| `examples/plugins/`             | Příklady pluginů: langfuse, request-logger, theme-manager, welcome-banner |
| `examples/quickstart/`          | Úryvky klienta: curl, Node.js (axios), PHP, Python                        |

---

## `.github/` — GitHub integrace

| Cesta                                                        | Účel                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), bezpečnostní skenování (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), plánované sady `nightly-*.yml`, publikování (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), pracovní postupy uvolňování a údržby |
| `.github/actions/npm-ci-retry/`                              | Složená akce: `npm ci` s mezipamětí a opakování                                                                                                                                                                                                                                         |
| `.github/actions/prepare-unit-storage/`                      | Složená akce: uvolní místo na disku runner a poté nainstaluje závislosti                                                                                                                                                                                                                |
| `.github/ISSUE_TEMPLATE/`                                    | Formuláře problémů s chybami, vlastnostmi a testováním                                                                                                                                                                                                                                  |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Výchozí šablona PR plus varianty bugfix/feature                                                                                                                                                                                                                                         |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Vlastníci kódu, sponzorské odkazy, aktualizace závislostí                                                                                                                                                                                                                               |
| `.github/labels.yml`                                         | Definice štítků použité `npm run labels:sync`                                                                                                                                                                                                                                           |
| `.github/copilot-instructions.md`                            | instrukce GitHub Copilot (povrch pro instrukce agenta)                                                                                                                                                                                                                                  |

CI pracovní mapa: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git háčky

| Soubor       | Účel                                                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Kontrola identity Git, lint-staged, gate manifest, synchronizace dokumentů, jakýkoli rozpočet, typová stupnice, sledování artefaktů a kontrola snímků sady ui-kit |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` ve zprávě odevzdání                                                                                                      |
| `pre-push`   | Záměrně lehké: kontrola zdravého rozumu PATH/npm, která končí 0                                                                                                   |

Hák runtime v `.husky/_/` je generován při instalaci a není sledován.

---

## Navigační tipy

- **Nový přispěvatel?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Změna něčeho běžného** (poskytovatel, trasa, modul DB, nástroj MCP, dovednost A2A )? Sledujte [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Přidáte poskytovatele?** Nejprve zkontrolujte [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) a poté křížově [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Běh lokálně?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Nasazení?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Uvolnění?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **Selhala kvalitní brána?** [QUALITY_GATES.md](QUALITY_GATES.md) a [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
