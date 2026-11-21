# Repository Map (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Mi hol él: minden nyomon követett legfelső szintű könyvtár és gyökérfájl, egysoros céllal.** Utolsó frissítés: 2026-11-13 (OmniRoute v3.8.54)
>
> Használja ezt a térképet a kódbázisban való eligazodáshoz, majd kövesse a dedikált dokumentumokra mutató hivatkozásokat. A fájlszámokat `git ls-files` mértük a fenti napon. Szinte minden kiadásnál változnak, ezért kezeld őket nagyságrendekként.

## Legfelső szintű fa

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

Helyi, generált vagy privát elérési utak (minden gitignorált, soha nem véglegesített, nincs részletesebben leírva):

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

## Root fájlok

Minden nyomon követett fájl a lerakat gyökerében (`git ls-files | grep -v /`), funkció szerint csoportosítva.

### Projekt dokumentáció

| Fájl                     | Cél                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `README.md`              | Céloldal: funkciók áttekintése, gyorsindítás, telepítési módszerek                                 |
| `CHANGELOG.md`           | Kiadásonkénti változásnapló ( `changelog.d/` töredékei itt vannak behajtva)                        |
| `ROADMAP.md`             | Nyilvános útiterv                                                                                  |
| `LICENSE`                | MIT jogosítvány                                                                                    |
| `THIRD_PARTY_NOTICES.md` | Figyelmeztetések a csomagban lévő harmadik féltől származó kódokhoz (például a wreq-js kötésekhez) |
| `CONTRIBUTING.md`        | Útmutató a közreműködők számára: beállítás, hagyományos véglegesítés, tesztmátrix, PR áramlás      |
| `SECURITY.md`            | Sebezhetőségi jelentési szabályzat                                                                 |
| `CODE_OF_CONDUCT.md`     | Közösségi viselkedési elvárások                                                                    |
| `llm.txt`                | Egyszerű szöveges projekt-összefoglaló LLM bejáróknak és asszisztenseknek                          |

### AI-asszisztens utasítások

| Fájl        | Cél                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Az igazság egyetlen forrása minden AI asszisztens számára: konvenciók, minőségi kapuk, kemény szabályok |
| `CLAUDE.md` | Claude Code-specifikus delták; import `AGENTS.md`                                                       |
| `GEMINI.md` | Gemini-specifikus delták; `AGENTS.md` mutat vissza                                                      |

Beágyazott útmutatók is léteznek az általuk leírt kód mellett: `open-sse/services/AGENTS.md` és `src/lib/db/AGENTS.md`.

### Csomagjegyzékek és csomóponti eszközlánc

| Fájl                       | Cél                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `package.json`             | npm jegyzék: szkriptek, függőségek, `engines`, `workspaces`, közzétett `files`              |
| `package-lock.json`        | Zárolt függőségi fa                                                                         |
| `pnpm-workspace.yaml`      | pnpm munkaterület lista (`packages/*`, `open-sse`) és natív felépítés engedélyezési listája |
| `.npmrc` / `.npmignore`    | npm config és közzétételi kizárások                                                         |
| `.node-version` / `.nvmrc` | Csomópont-verziótűk a verziókezelők számára                                                 |
| `flake.nix` / `flake.lock` | Nix dev shell és annak zárja                                                                |
| `Makefile`                 | `make` parancsikonok, amelyek az npm szkriptekre delegálnak                                 |

### TypeScript, Next.js és docs build

| Fájl                                      | Cél                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Alap TypeScript konfiguráció és elérési út álnevek (`@/*`, `@omniroute/open-sse`) |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` szelet                                                   |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (szigorú `noImplicitAny`) szelet              |
| `tsconfig.typecheck-api.json`             | API-útvonal típusellenőrző szelet (`scripts/check/check-api-typecheck.mjs`)       |
| `tsconfig.typecheck-dashboard.json`       | Irányítópult típusellenőrző szelet (`npm run check:dashboard-typecheck`)          |
| `tsconfig.build.json`                     | Gyártási típusellenőrzés (`npm run typecheck:build`, `check:build-typecheck`)     |
| `tsconfig.mitm.json`                      | `scripts/build/buildMitm.mjs` által használt MITM build konfigurációt             |
| `next.config.mjs`                         | Next.js 16 konfiguráció (önálló kimenet, beépítési profil álnevek)                |
| `source.config.ts`                        | Fumadocs `defineDocs` config: mely `docs/` szakaszok fordítják le `/docs`         |
| `postcss.config.mjs`                      | PostCSS / Tailwind csővezeték                                                     |

### Szösz és formázás

| Fájl                                      | Cél                                                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Fő ESLint lapos konfiguráció (`npm run lint`, `config/quality/eslint-suppressions.json`-vel)                  |
| `eslint.complexity-ratchets.config.mjs`   | Önálló konfiguráció, amelyet a komplexitás és a kognitív-komplexitás racsnijai használnak egy ESLint lépésben |
| `eslint.complexity.config.mjs`            | Önálló konfiguráció csak mag `complexity` + `max-lines-per-function` (tesztek használják)                     |
| `prettier.config.mjs` / `.prettierignore` | Prettier szabályok és kizárások                                                                               |
| `.editorconfig`                           | A szerkesztő alapértelmezett beállításai (2 szóközű behúzás)                                                  |
| `.markdownlint.json`                      | Tanácsadó leértékelési szösz (`npm run lint:md`)                                                              |
| `.vale.ini`                               | Tanácsadó prózaszál (`npm run lint:prose`), szókincs `.vale/` ben                                             |

### Tesztek, értékelés és lefedettség

| Fájl                          | Cél                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest csomag: `npm run test:vitest:ui` (műszerfali `.tsx`, horgok, memory/skills tesztek)  |
| `vitest.mcp.config.ts`        | Csomópont Vitest csomag: `npm run test:vitest` (MCP szerver, autoCombo, combo, API `.spec.ts`)    |
| `vitest.quarantine.config.ts` | Futtatja a `config/quality/vitest-exclusions.json` felsorolt karanténba helyezett fájlokat        |
| `vitest.e2e-live.config.ts`   | Élő szerver Vitest csomagok (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                     |
| `stryker.conf.mjs`            | Stryker mutációs tesztelés (`npm run test:mutation`; `tap.testFiles` `mutate` ből számítja ki )   |
| `stryker.disablebail.mjs`     | Stryker változat kaució nélkül, teszt-redundancia méréshez                                        |
| `promptfooconfig.yaml`        | promptfoo LLM-biztonsági csomag                                                                   |
| `codecov.yml`                 | Codecov patch-lefedettségi beállítások                                                            |

### Docker és telepítés

| Fájl                              | Cél                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `Dockerfile`                      | Többlépcsős kép (`builder` → `runner-base` → `runner-web` / `runner-cli*`)                |
| `Dockerfile.bun`                  | Alternatív kép a Bun futtatókörnyezeten ( `docker-publish.yml` által épített)             |
| `docker-compose.yml`              | Alapértelmezett levélírás profilokkal (alap, web, klip, gazdagép, memória, cliproxyapi,…) |
| `docker-compose.prod.yml`         | Külön termelési pillanatkép példány a 20130-as porton                                     |
| `docker-compose.selfhost.yml`     | Egyparancsos loopback önkiszolgáló (páros `.env.selfhost.example`)                        |
| `docker-compose.ollama-local.yml` | Docker OmniRoute gazda-natív Ollama vel beszélget                                         |
| `.dockerignore`                   | Docker build-kontextus-kizárások                                                          |
| `fly.toml`                        | Fly.io alkalmazás konfigurációja (20128-as port, `/data` kötet)                           |

### Biztonsági, ellátási lánc és adattár botok

| Fájl                                         | Cél                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks titkos keresési szabályokat és engedélyezési listákat                               |
| `.trivyignore`                               | Elfogadott kockázatelnyomások a tárolókép-beolvasáshoz                                       |
| `.zizmor.yml`                                | zizmor GitHub Műveletek security-audit config                                                |
| `socket.yml`                                 | Socket.dev alkalmazás konfigurációja (az elérési út figyelmen kívül hagyja; nem CI kapu)     |
| `sonar-project.properties`                   | SonarQube/SonarCloud projekt konfig                                                          |
| `knip.json`                                  | Knip unused files/exports/deps config (feeds `npm run check:dead-code`)                      |
| `.size-limit.json`                           | Csomag méretű költségvetések                                                                 |
| `.mergify.yml`                               | Mergify merge-queue config                                                                   |
| `.coderabbit.yaml`                           | CodeRabbit felülvizsgálati konfig                                                            |
| `.cbmignore`                                 | Figyelmen kívül hagyja a kódbázis-memória-mcp kódindex listáját                              |
| `.gitignore` / `.gitattributes` / `.mailmap` | Szabályok figyelmen kívül hagyása, szkriptek LF sorvégződései, kanonikus szerzői azonosságok |

### Környezeti sablonok, állapotok és hírcsatornák

| Fájl                        | Cél                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `.env.example`              | A sablon az első telepítéskor `.env` másolva; env vars hivatkozási listája                 |
| `.env.selfhost.example`     | Sablon `docker-compose.selfhost.yml` hoz                                                   |
| `.env.homolog.example`      | Sablon a homologizációs futóhoz (`npm run homolog`)                                        |
| `.env.devin-bridge.example` | Példa env fájlra a Devin híd beállításához                                                 |
| `.i18n-state.json`          | Növekményes fordítási állapot (forráskivonatok dokumentumonként és nyelvi beállításonként) |
| `news.json`                 | Lokalizált bejelentési hírcsatorna (séma v2), amelyet az irányítópult olvas be             |

---

## `src/` — Next.js alkalmazás

Körülbelül 4550 nyomon követett fájl. Útvonal alias `@/*` → `src/*`.

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

| Útvonal                                                             | Cél                                                                                                                                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | Nyilvános OpenAI-kompatibilis API: csevegés, kiegészítések, válaszok, üzenetek, beágyazások, képek, hangok, videók, zene, áthelyezés, moderálás, keresés, fájlok, kötegek, ws, modellek,…                   |
| `app/api/v1beta/`                                                   | Gemini-stílusú végpontok                                                                                                                                                                                    |
| `app/api/` (egyéb mappák)                                           | Felügyeleti és adminisztrátori útvonalak: szolgáltatók, kombinációk, beállítások, kulcsok, használat, naplók, mcp, a2a, acp, memória, készségek, evals, webhookok, alagutak, bővítmények, radar, eszközök,… |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                                       |
| `app/api/tools/traffic-inspector/`                                  | Traffic Inspector REST API — lásd [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                                |
| `app/(dashboard)/dashboard/`                                        | Irányítópult-szakaszonként egy mappa (szolgáltatók, kombinációk, naplók, használat, költségek, gyorsítótár, tömörítés, memória, játszótér, keresőeszközök, beállítások, eszközök stb.)                      |
| `app/(dashboard)/home/`                                             | Kezdőképernyő és widgetjei                                                                                                                                                                                  |
| `app/docs/`                                                         | Dokumentummegjelenítő, amely `source.config.ts` ban felsorolt Fumadocs-szakaszokat jeleníti meg                                                                                                             |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Gyökérelrendezés, gyökérbejegyzés (átirányítások), PWA manifest, globális CSS                                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Hibahatárok és visszaesések                                                                                                                                                                                 |

API útvonalak követik `Route → CORS → Zod validation → optional auth → policy → handler`; lásd [ARCHITECTURE.md](ARCHITECTURE.md) és [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — szerver könyvtárak

Körülbelül 90 almappa plusz körülbelül 90 legfelső szintű modul. Főbb csoportok:

| Terület                           | Mappák / fájlok                                                                                                      | Mély merülés                                                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Adatbázis                         | `db/` — tartománymodulok, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                            | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Felhasználás, kvóta és ráfordítás | `usage/`, `quota/`, `spend/`                                                                                         | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Szolgáltatók és modellek          | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                     | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth és hitelesítő adatok        | `oauth/` (szolgáltatók/, szolgáltatások/, segédprogramok/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/` | `resolvePublicCred()` (operátori dokumentum, nem szolgálják ki nyilvánosan)                                                                    |
| Biztonság és kormányzás           | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                    | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Az ügynök jellemzői               | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                  | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Pluginok és szolgáltatások        | `plugins/`, `services/` (beágyazott szolgáltatás telepítői és felügyelői)                                            | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Útválasztás és rugalmasság        | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                            | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxy-k és hálózatépítés          | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, alagút modulok                                  | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Munkák és ütemezés                | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                          |                                                                                                                                                |
| Megfigyelhetőség és export        | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                        | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| CLI és IDE integráció             | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                               | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Kontextus források                | `localCorpus/`, `notion/`, `obsidian/`                                                                               | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Egyéb jellemzők                   | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, …  | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Felső szintű modulok, amelyeket érdemes tudni:

| Fájl                                                           | Cél                                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Válasz gyorsítótár és idempotencia                                             |
| `webhookDispatcher.ts`                                         | HMAC aláírt webhook szállítás                                                  |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Alagútkezelők                                                                  |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Háttérben lévő hitelesítő adatok állapotának ellenőrzése és frissítési áramkör |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Streaming válaszfertőtlenítők                                                  |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | A folyamat életciklusa                                                         |
| `*.stub.ts`                                                    | A beépítési profil csonkjait álnevek cserélték fel a `next.config.mjs`         |

### `src/lib/db/` — adatbázis

| Útvonal               | Cél                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL naplózás)                                                                                             |
| `db/migrations/`      | Számozott, idempotens `.sql` migrációk (236 fájl a cikk írásakor; `check-migration-numbering.mjs` őrök számozása)                      |
| `db/migrationRunner/` | Migrációs futó                                                                                                                         |
| `db/adapters/`        | SQLite illesztőprogram-adapterek (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                     |
| `db/repositories/`    | SQLite repository implementációk (kombók, játszóterek előbeállításai, útválasztási konfigurációk)                                      |
| `db/<domain>.ts`      | Körülbelül 175 tartománymodul (szolgáltatók, kombinációk, apiKeys, beállítások, használat stb.) — ezeket mindig közvetlenül importálja |

### `src/domain/`, `src/server/`, `src/shared/`

| Útvonal                                                        | Cél                                                                                                                                                        |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Politikai motor                                                                                                                                            |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Tartalék döntések, kizárási politika, költségszabályok                                                                                                     |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | A kvóta gyorsítótár és a pillanatfelvételek megmaradása                                                                                                    |
| `domain/assessment/`                                           | Modellértékelés (értékelő, kategorizáló, öngyógyító)                                                                                                       |
| `server/authz/`                                                | Engedélyezési csővezeték és útvonal őr (`routeGuard.ts`) — lásd [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS eredetfelbontás és CORS — lásd [CORS.md](../security/CORS.md)                                                                                |
| `server/ws/`                                                   | Élő irányítópult WebSocket szerver                                                                                                                         |
| `shared/components/`                                           | `packages/ui-kit` — feletti irányítópult-összetevők és adapterek lásd [DESIGN_SYSTEM.md fájlt](DESIGN_SYSTEM.md)                                           |
| `shared/constants/`                                            | Szolgáltatói katalógus (`providers.ts`), útválasztási stratégiák, CLI -eszközök, ikontérkép, upstream fejlécek tiltólistája,…                              |
| `shared/validation/`                                           | Zod sémák és érvényesítési segítők                                                                                                                         |
| `shared/utils/`                                                | Áramkör megszakító, API-kulcs hitelesítés, lekérési időtúllépések, funkciójelzők,…                                                                         |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Chat-belépő köztes szoftverek, hálózati segítők, ügyfélszolgálatok, React hookok                                                                           |

---

## `open-sse/` — adatfolyam-motor munkaterület

npm munkaterület `@omniroute/open-sse` (körülbelül 2390 nyomon követett fájl). Elvégzi a kérés feldolgozását és a szolgáltató végrehajtását. Áttekintés: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Útvonal                                                                                        | Cél                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Kombinált útválasztási stratégiák — lásd [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                  |
| `autoCombo/`                                                                                   | Auto-Combo pontozás és mód csomagok                                                                                                                                 |
| `accountFallback.ts` + `accountFallback/`                                                      | Csatlakozás lehűtés és modellzárás — lásd [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Rate-limit követés és fejléc elemzése                                                                                                                               |
| `compression/`                                                                                 | Kompressziós motorok (`engines/`), szabálycsomagok (`rules/`), `eval/`, `harness/`, `riskGate/` — lásd: [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Token frissítés, használati elszámolás, gyorsítótár, belépési sávok, munkamenet-készletek, Codex -fiókok, útválasztási segédek                                      |
| `__tests__/`                                                                                   | Együtt található Vitest lakosztályok (a Vitest konfigurációk gyűjtötték össze)                                                                                      |
| `AGENTS.md`                                                                                    | Ügynöki útmutató ehhez a mappához                                                                                                                                   |

Minta: egy nagy `X.ts` modul a `X/` mappa mellett azt jelenti, hogy a modult kisebb fájlokra osztották (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Útvonal               | Cél                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `server.ts`           | MCP szerver életciklusa                                                                                          |
| `httpTransport.ts`    | Streamálható HTTP és SSE transzportok                                                                            |
| `scopeEnforcement.ts` | Szerszámonkénti hatókör ellenőrzések                                                                             |
| `audit.ts`            | Eszközhívásos ellenőrzési naplózás                                                                               |
| `schemas/`            | Eszközdefiníciók és hatókörök                                                                                    |
| `tools/`              | Eszközmegvalósítások (memória, készségek, tömörítés stb.)                                                        |
| `toolSearch/`         | Szerszám keresés                                                                                                 |
| `README.md`           | Belső építészeti megjegyzések; a teljes katalógus [MCP-SERVER.md](../frameworks/MCP-SERVER.md) nyelven található |

---

## `packages/` — npm munkaterületek

| Útvonal                  | Cél                                                                                                                                                                                                                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: a Keak CI UI Kit forgalmazott pillanatképe, forrásként felhasználva. `UPSTREAM.md` rögzíti az upstream véglegesítést, `PATCHES.md` a helyi javításokat listázza ki. `src/` csak `scripts/dev/sync-ui-kit.sh` szinkronizálja, és `npm run check:ui-kit-snapshot` védi. Lásd: [DESIGN_SYSTEM](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: böngésző-készlet interfészek és megvalósítás (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). `workspaces`; az átjáró által használt futásidejű böngészőkészlet `open-sse/services/`-ben található                                                                    |

## `@omniroute/` — külön közzétett csomagok

Ezek nem npm munkaterületek. Mindegyiknek saját `package.json` és zárolási fájlja van; a mappa a `omniroute` tarballban (`files: ["@omniroute/"]`) érkezik.

| Útvonal                          | Cél                                                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | OpenCode plugin (model discovery, `/connect` auth); used by `omniroute setup-opencode` — see [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin a v2 Promise API — lásd [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                      |
| `@omniroute/opencode-provider/`  | Statikus konfigurációs generátor; a saját `package.json` jában elavultként jelölve `opencode-plugin` javára                           |

---

## `bin/` — CLI és ops szkriptek

| Útvonal                                                                     | Cél                                                                                                             |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Fő CLI bejegyzés (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                                |
| `reset-password.mjs`                                                        | `omniroute-reset-password` bináris                                                                              |
| `mcp-server.mjs`                                                            | MCP stdio belépési pont                                                                                         |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Segédhíd / MCP belépési pontok                                                                                  |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM Resolution Hook, amely leképezi a tsconfig elérési út álneveit a globális telepítésekhez                    |
| `nodeRuntimeSupport.mjs`                                                    | Támogatott Node.js verzióellenőrzés                                                                             |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Önkiszolgáló esemény-helyreállítási szkriptek ( `_ops-common.sh` megosztása)                                    |
| `cold-start-bench.sh`                                                       | Hidegindítás benchmark — lásd [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                       |
| `cli/commands/`                                                             | Egy modul CLI parancsonként (kb. 100, beleértve a `setup-*` integrációkat)                                      |
| `cli/api-commands/`                                                         | `docs/openapi.yaml` generálta `npm run build:cli-api` — ne szerkessze                                           |
| `cli/locales/`                                                              | CLI üzenetkatalógusok (67 nyelven)                                                                              |
| `cli/tui/`, `cli/tui-components/`                                           | UI terminál                                                                                                     |
| `cli/tray/`                                                                 | Rendszertálca és automatikus indítás (Windows PowerShell backend, macOS/Linux rendszertálcája)                  |
| `cli/runtime/`                                                              | Natív futásidejű felbontás (`sqliteRuntime.mjs`, `magicBytes.mjs`), folyamatfelügyelő                           |
| `cli/*.mjs`                                                                 | Megosztott segítők (args, API kliens, adatkönyvtár, titkosítás, szolgáltatói tároló, beállítások tárolója stb.) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI belső elemek és konvenciók                                                                                  |

Lásd [CLI-TOOLS.md](../reference/CLI-TOOLS.md) és [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — asztali alkalmazás

| Útvonal                                                    | Cél                                                                              |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `main.js`                                                  | Electron fő folyamat (ablak, beágyazott szerver, tálca, frissítések)             |
| `preload.js`                                               | IPC híd ki van téve a renderernek                                                |
| `lib/`                                                     | Ablak életciklusa, szerver készenlét, állapotfigyelő, távoli szerver beállításai |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Távoli szerver prompt ablak                                                      |
| `processTree.js`, `sqlite-inspection.js`                   | Gyermek-folyamat takarítás és SQLite ellenőrzés segítők                          |
| `package.json` / `package-lock.json`                       | elektronépítő konfig és Electron függőségek                                      |
| `assets/`                                                  | Alkalmazás- és tálcaikonok (`.ico`, `.icns`, `.png`)                             |
| `README.md`                                                | Belső megjegyzések — lásd [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)       |

## `public/` — statikus eszközök

| Útvonal                                     | Cél                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Az id (`/providers/<id>.svg`) által betöltött szolgáltatói logók; eredet a `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Böngésző és PWA ikonok                                                                                                       |
| `sw.js`                                     | Szervizmunkás — Lásd: [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                                 |
| `openapi.yaml`                              | `docs/openapi.yaml` másolata `npm run gen:public-openapi` által generált                                                     |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flow diagramok, szponzori szalaghirdetés, README grafika                                                                |

## `skills/` — ügynöki készségek

46 készség, egy-egy mappa `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plusz `skills/README.md` vel. `src/lib/agentSkills/catalog.ts` beolvassa őket futás közben, és `/api/agent-skills`, MCP és A2A keresztül teszi közzé őket. A legtöbb jegyzéket `src/lib/agentSkills/generator.ts` hozza létre (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` ellenőrzi az eltolódást). Lásd: [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — építés, kapuk és szerszámok

Körülbelül 435 nyomon követett fájl. Az új szkriptek `AGENTS.md` által engedélyezett almappák egyikébe kerülnek; egyszeri kód megy a `scripts/ad-hoc/`.

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

Gyakran használt belépési pontok:

| Forgatókönyv                                                        | Cél                                                                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` futó                                                                        |
| `build/build-next-isolated.mjs`                                     | `npm run build` (Next.js önálló build)                                                                  |
| `build/prepublish.ts`                                               | `npm run build:cli`: összeállítja az npm `dist/`                                                        |
| `build/postinstall.mjs`                                             | npm `postinstall` horog                                                                                 |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                            |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenerálja PROVIDER_REFERENCE.md fájlt)                              |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` ( `src/app/docs/lib/openapi.generated.ts` t generál)                                    |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (dokumentumtükrök)                                                                   |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                               |
| `release/aggregate-changelog.mjs`                                   | A `changelog.d/` töredékeket `CHANGELOG.md`-vé hajtja                                                   |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (doc pontossági kapu)                                                   |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blokkolja a nyomon követett gyökér `_*` útvonalakat)                 |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrikus racsnis `config/quality/` vel szemben)                              |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                      |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                  |
| `dev/new-worktree.sh`                                               | Elszigetelt fejlesztési munkafát hoz létre — lásd [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Szinkronizálja `packages/ui-kit/src` egy rögzített upstream véglegesítéssel                             |

Kapukészlet és szabályzatok: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — verziójú konfiguráció és kapu állapota

| Útvonal                                  | Cél                                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Támogatott területi beállítások (a területi beállítások forrása) és sémájuk                                                       |
| `payloadRules.json`                      | Felfelé irányuló hasznos terhelés szabályai (`open-sse/services/payloadRules.ts`)                                                 |
| `cli-tools-manifest.json`                | Az integrálható CLI szerszámok jegyzéke (`bin/cli/cli-manifest.mjs`)                                                              |
| `alibaba-free-tier-allowlist.json`       | Alibaba szabadszintű modell engedélyezési listája                                                                                 |
| `ci/toolchain.json`                      | CI szerszámlánc verziók                                                                                                           |
| `quality/quality-baseline.json`          | Több metrikus racsnis alapvonal (lefedettség, figyelmeztetések, megkettőzés stb.)                                                 |
| `quality/*-baseline.json`                | Rögzített alapvonalak az egyes kapukhoz (bonyolultság, sokszorosítás, fájlméret, típusellenőrzési szeletek, tesztfelderítés stb.) |
| `quality/*-allowlist.json`               | Kapu engedélyezési listák (függőségek, licencek, AI hozzárendelés, elfelejtett testvértesztek stb.)                               |
| `quality/eslint-suppressions.json`       | `npm run lint` által alkalmazott fagyott ESLint -elnyomások                                                                       |
| `quality/gate-manifest.json`             | A `scripts/quality/gate-manifest.mjs` ellenőrizte a kapujegyzéket                                                                 |
| `quality/vitest-exclusions.json`         | Karantén leltár `vitest.quarantine.config.ts` számára                                                                             |
| `quality/skill-templates/`               | `scripts/quality/check-skill-contract.mjs` által ellenőrzött kanonikus SKILL.md -sablonok                                         |
| `quality/release-acceptance.schema.json` | Kiadási-elfogadási bizonyíték séma — lásd [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                            |
| `release/`                               | Változásnapló-egyeztetések és a wreq-js natív jegyzéke, licencleltár és értesítések                                               |

## `changelog.d/` — változásnapló töredékek

A PR `CHANGELOG.md` szerkesztése helyett egy töredéket ad hozzá: `features/`, `fixes/` vagy `maintenance/`, `<PR-number>-<slug>.md` néven. A kiadás időpontjában `scripts/release/aggregate-changelog.mjs` összehajtja őket `CHANGELOG.md` és törli őket; `npm run check:changelog-integrity` érvényesíti őket. Részletek a `changelog.d/README.md`.

---

## `docs/` — nyilvános dokumentáció

`source.config.ts` -ban felsorolt szakaszok a `/docs` webhelyre fordítódnak (néhány csak kezelői biztonsági oldal kivételével); `docs/meta.json` beállítja az oldalsáv sorrendjét. Kezdje a [README.md](../README.md).

| Útvonal             | Tartalom                                                                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`  | Gyors indítás, saját szolgáltató, szolgáltatók, ingyenes szintek, automatikus kombinálás és web-cookie-útmutatók                                                                   |
| `guides/`           | Kezelői és fejlesztői útmutatók: beállítás, Docker, Electron, PWA, Termux, CLIs, i18n, hibaelhárítás, használati útmutató                                                          |
| `architecture/`     | Építészet, kódbázis hivatkozás, módosítási receptek, hitelesítés, rugalmasság, minőségi kapuk, tervezési rendszer, ez a térkép                                                     |
| `reference/`        | API hivatkozás, környezeti változók, funkciójelzők, CLI eszközök, ingyenes szintek, generált szolgáltatói hivatkozás, eltávolított szolgáltatók                                    |
| `frameworks/`       | MCP, A2A, ACP, készségek, memória, bővítmények, felhőügynökök, webhookok, evals, naplóexport, radar, játszótér,…                                                                   |
| `routing/`          | Auto-Combo, replay/routing érvelés, kvótamegosztás, előfizetési létra, szigorú nulla költség,…                                                                                     |
| `security/`         | Korlátok, hibaelhárítás, CORS, SSO, kilépési politika, útvonal-őrzési szintek, ellátási lánc,…                                                                                     |
| `compression/`      | Tömörítési útmutató, motorok, RTK, szabályformátum, nyelvi csomagok, kontextus szerkesztése                                                                                        |
| `ops/`              | Kiadási folyamat, elágazás, összevonási vonat, telepítés (VM, Fly.io, Kubernetes), adatbázis, proxy-k, munkafák, szigorú szabályok részletei                                       |
| `providers/`        | Szolgáltatónkénti útmutatók (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                                                  |
| `comparison/`       | OmniRoute alternatívákkal összehasonlítva                                                                                                                                          |
| `integrations/`     | Integrációs megjegyzések (fal.ai natív, MarkItDown MCP); nincs `/docs`-be fordítva                                                                                                 |
| `openapi.yaml`      | OpenAPI forrás; `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` és `bin/cli/api-commands/` táplálja                                                                 |
| `diagrams/`         | Mermaid források (`.mmd`), renderelt SVGs (`exported/`) és README SVGs `scripts/docs/gen-readme-*` ből                                                                             |
| `assets/`           | Nyelvjelző SVGs és egyéb README eszközök                                                                                                                                           |
| `screenshots/`      | A README és az útmutatók által használt képernyőképek                                                                                                                              |
| `i18n/`             | Lefordított tükrök: területi beállításonként egy mappa (66) gyökérdokumentumokkal és egy `docs/` részhalmazzal; készítette: `npm run i18n:run` — lásd [I18N.md](../guides/I18N.md) |
| felső szintű `*.md` | `README.md` (doc index), `DEVELOPER-ENVIRONMENT.md` és néhány önálló jegyzet                                                                                                       |

Legfontosabb belépési pontok: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) ( `npm run gen:provider-reference` által generált).

---

## `tests/` — tesztcsomagok

Körülbelül 9670 nyomon követett fájl. A tesztfájlok ide tartoznak, nem a projektgyökérbe. Kivételek: a `src/` ben és `open-sse/` egy helyen található `__tests__/` mappák, amelyeket a Vitest konfigurációk gyűjtenek.

| Útvonal                                                | Tartalom                                                                                                                                                                               | Futó                                                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Egységtesztek (több mint 9000 fájl): sok a legfelső szinten, plusz tartományi mappák (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`,…) | Node tesztfutó (`npm run test:unit`); `*.tsx` `test:vitest:ui` n keresztül              |
| `tests/unit/serial/`                                   | A CPU-érzékeny tesztek az 1-es párhuzamossággal futnak                                                                                                                                 | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest lakosztályok az egységfán belül                                                                                                                                                 | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Többmodulos és DB integrációs tesztek; `combo-matrix/`, `combo-live/`, `services/`                                                                                                     | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + élő lakosztályok `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                              | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` egy futó példány ellen                                                                                                                                                | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologációs csomagok (`api/`, `ui/` saját Playwright konfigurációval)                                                                                                                 | `npm run homolog` — lásd [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                      |
| `tests/load/`                                          | Szkriptek betöltése és betöltése (k6)                                                                                                                                                  | Éjszakai rugalmassági munkafolyamat                                                     |
| `tests/_setup/`                                        | `--import` / beállítási fájlok (izolált adatkönyvtár, kilépési védelem, Vitest UI polifills)                                                                                           | A futók töltik be                                                                       |
| `tests/_helpers/`, `tests/helpers/`                    | Megosztott tesztsegítők (arany pillanatképek, menedzsment munkamenet,…)                                                                                                                | Tesztekkel importálva                                                                   |
| `tests/fixtures/`                                      | Létesítményadatok és gyermekfolyamatok rögzítései                                                                                                                                      | Tesztekkel importálva                                                                   |
| `tests/snapshots/`                                     | Arany reszelők `tests/helpers/goldenSnapshot.ts` hoz                                                                                                                                   | Tesztekkel importálva                                                                   |
| `tests/manual/`                                        | `.http` fájlok kézi REST hívásokhoz                                                                                                                                                    | Kézikönyv                                                                               |
| `tests/security/`                                      | Biztonsági shell szkriptek                                                                                                                                                             | Kézi / egységteszt lámpatestek                                                          |
| `tests/types/`                                         | Típusszintű szerződéses felszerelések                                                                                                                                                  | —                                                                                       |

Teljes mátrix: `CONTRIBUTING.md` → "Running Tests" és [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Útvonal                                            | Cél                                                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Helm chart (`Chart.yaml`, `values.yaml`, sablonok a telepítéshez, szolgáltatáshoz, belépéshez, PVC, titkos, konfigurációs térkép) |
| `deploy/kubernetes/base/`                          | Kustomize alap (névtér, telepítés, szolgáltatás, PVC, configmap, `secret.example.yaml`)                                           |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Fürtspecifikus átfedések (belépés, tárolási osztály, erőforrások, próbák)                                                         |

Lásd: [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)

## `docker/` — segédképek

| Útvonal                             | Cél                                                                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Fej nélküli böngészőkép CDP proxyval a ChatGPT webes végrehajtóhoz — lásd [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin híd kép, fájl összeállítása, gúnyok és hálózati őr                                                                |
| `docker/vnc-browser/`               | Chromium VNC val az interaktív böngészőmunkamenetekhez                                                                  |

A főkép a `Dockerfile` gyök; lásd [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## `contrib/` — közösségi receptek (hivatalosan nem támogatott)

| Útvonal                 | Cél                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman quadletek (tároló, kötet, hálózat, Redis)                                                                                               |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                            |
| `contrib/windows/`      | `.bat` indítók a Windows pénztárból való futáshoz                                                                                              |
| `contrib/session-sync/` | README a harmadik fél munkamenet-szinkronizáló böngészőbővítményéhez. — lásd: [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Útvonal                         | Cél                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Minimális parancsbővítmény — lásd [PLUGINS.md](../frameworks/PLUGINS.md)     |
| `examples/plugins/`             | Példa bővítményekre: langfuse, request-logger, theme-manager, welcome-banner |
| `examples/quickstart/`          | Kliens kódrészletek: curl, Node.js (axios), PHP, Python                      |

---

## `.github/` — GitHub integráció

| Útvonal                                                      | Cél                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), biztonsági ellenőrzések (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), ütemezett `nightly-*.yml` csomagok, közzététel (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), kiadási és karbantartási munkafolyamatok |
| `.github/actions/npm-ci-retry/`                              | Összetett művelet: `npm ci` gyorsítótárral és újrapróbálkozás                                                                                                                                                                                                                                   |
| `.github/actions/prepare-unit-storage/`                      | Összetett művelet: felszabadítja a futó lemezterületet, majd telepíti a függőségeket                                                                                                                                                                                                            |
| `.github/ISSUE_TEMPLATE/`                                    | Hiba-, szolgáltatás- és tesztlefedettségi űrlapok                                                                                                                                                                                                                                               |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Alapértelmezett PR sablon és bugfix/feature -változatok                                                                                                                                                                                                                                         |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Kódtulajdonosok, szponzori linkek, függőségi frissítések                                                                                                                                                                                                                                        |
| `.github/labels.yml`                                         | `npm run labels:sync` által alkalmazott címkedefiníciók                                                                                                                                                                                                                                         |
| `.github/copilot-instructions.md`                            | GitHub Copilot utasítások (ügynök-utasítás felület)                                                                                                                                                                                                                                             |

CI állástérkép: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git horgok

| Fájl         | Cél                                                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Git-azonosság-ellenőrzés, szöszszegény, kapujegyzék, dokumentumok szinkronizálása, tetszőleges költségvetés, típusméretű racsnis, nyomon követett műtermékek és UI-kit pillanatkép-ellenőrzések |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` a commit üzeneten                                                                                                                                      |
| `pre-push`   | Szándékosan könnyű: egy PATH/npm józansági ellenőrzés, amely kilép a 0-ból                                                                                                                      |

A `.husky/_/` hook futásideje telepítéskor jön létre, és nem követi nyomon.

---

## Navigációs tippek

- **Új közreműködő?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Valami közös megváltoztatása** (szolgáltató, útvonal, DB modul, MCP eszköz, A2A készség)? Kövesse [MODIFICATION_SCENARIOS.md fájlt](MODIFICATION_SCENARIOS.md).
- **Szolgáltató hozzáadása?** Először ellenőrizze [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) fájlt, majd [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) fájlt.
- **Helyben fut?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Telepítés?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Felszabadító?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **Egy minőségi kapu tönkrement?** [QUALITY_GATES.md](QUALITY_GATES.md) és [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
