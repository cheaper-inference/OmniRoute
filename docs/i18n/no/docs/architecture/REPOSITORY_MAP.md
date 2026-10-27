# Repository Map (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Énlinjebeskrivelse for hver mappe og rotfil.**
> Sist oppdatert: 2026-06-28 — OmniRoute v3.8.40
>
> Bruk dette kartet til å navigere raskt i kodebasen. Følg lenkene til den dedikerte dokumentasjonen for mer inngående informasjon.

## Toppnivåtre

```
OmniRoute/
├── src/                  # Next.js 16-applikasjon (brukergrensesnitt + API-ruter + biblioteker + domene + server)
├── open-sse/             # Arbeidsområde for strømmemotoren (håndterere, utførere, oversetter, MCP-server)
├── packages/            # npm-arbeidsområder: ui-kit (inkludert Keak CI UI Kit) og browser-pool
├── electron/             # Skrivebordsinnpakning (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI-inngangspunkt og kommandohåndterere
├── scripts/              # Skript for bygging, kontroll, synkronisering og engangsoppgaver
├── docs/                 # Offentlig dokumentasjon (du er her)
├── tests/                # Alle testpakker (enhets-, integrasjons- og e2e-tester samt protokollklienter)
├── public/               # Statiske Next.js-ressurser, PWA-manifest, service worker, ikoner
├── config/               # Statisk konfigurasjon + tilstand for kvalitetsporter (i18n, payloadRules, quality/)
├── images/               # Bilderessurser for markedsføring / README
├── @omniroute/           # Publiserbare tilleggspakker (opencode-plugin, opencode-provider)
├── skills/               # Ferdighetspakker for CLI/agenter (cli-* + omni-* + config-codex-cli)
├── examples/             # Eksempelprogramtillegg + omniroute-cmd-hello-startmal
├── contrib/              # Bidrag fra fellesskapet (podman/)
├── .source/              # Fumadocs-kildekonfigurasjon (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-arbeidsflyter + saksmaler + PR-mal
├── .husky/               # Git-hooks (pre-commit, pre-push)
├── .claude/              # Claude Code-skråstrekkommandoer (prosjektspesifikke)
├── .agents/              # Arbeidsflyter + ferdigheter for Codex / generiske agenter (speiling av .claude/)
├── .vscode/              # Innstillinger for VS Code-arbeidsområdet
├── _ideia/               # Planleggingsnotater (uformelle; distribueres ikke)
├── _mono_repo/           # Historiske delprosjekter (cloud, site, vscode-extension)
├── _references/          # Skrivebeskyttede referansekloner fra relaterte OSS-prosjekter
├── _tasks/               # Oppgavefiler per utgivelse (uformelle)
├── .build/ .worktrees/ dist/   # Lokalt arbeidsområde for bygging / git-worktree / byggresultater (gitignored)
├── .issues/              # Lokal saksbuffer (gitignored)
├── .playwright-mcp/      # Playwright MCP-testartefakter
├── coverage/             # c8-dekningsresultater (gitignored)
├── logs/                 # Kjøretidslogger (gitignored)
├── node_modules/         # Avhengigheter (gitignored)
├── package/              # Oppsamlingsområde for npm pack (byggartefakt)
├── .next/                # Next.js-byggresultater (gitignored)
└── (rotfiler — se nedenfor)
```

---

## Rotfiler

| File                                        | Formål                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **README.md**                               | Landingsside for markedsføring + hurtigstart + funksjonsmatrise (se også `llm.txt`)               |
| **CHANGELOG.md**                            | Endringslogg per utgivelse (automatisk generert av ferdigheten `/version-bump-cc`)                |
| **LICENSE**                                 | MIT-lisenstekst                                                                                   |
| **CLAUDE.md**                               | Prosjektregler for Claude Code-agenter (ufravikelige regler, konvensjoner, scenarioer)            |
| **AGENTS.md**                               | Samme som CLAUDE.md, men for AI-agenter som ikke er basert på Claude (Codex, Cursor osv.)         |
| **GEMINI.md**                               | Kortfattede regler for Gemini-baserte agenter (delmengde av CLAUDE.md)                            |
| **CONTRIBUTING.md**                         | Bidragsyterveiledning: oppsett, konvensjonelle commits, testing, PR-flyt                          |
| **SECURITY.md**                             | Retningslinjer for rapportering av sårbarheter, støttede versjoner, trusselmodell                 |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — forventninger til oppførsel i fellesskapet                                 |
| **llm.txt**                                 | Landingsside i ren tekst, optimalisert for LLM-gjennomsøkere (SEO for AI-assistenter)             |
| **package.json**                            | npm-manifest, skript, avhengigheter, motorer, c8-dekningsport                                     |
| **package-lock.json**                       | Låst avhengighetstre                                                                              |
| **tsconfig.json**                           | TypeScript-rotkonfigurasjon                                                                       |
| **tsconfig.typecheck-core.json**            | Typesjekk-konfigurasjon for kjernen i `src/`                                                      |
| **tsconfig.typecheck-noimplicit-core.json** | Streng (`noImplicitAny`) typesjekk                                                                |
| **tsconfig.tsbuildinfo**                    | Hurtigbuffer for inkrementell TS-bygging (ignorert av Git)                                        |
| **next.config.mjs**                         | Byggekonfigurasjon for Next.js 16 (frittstående utdata)                                           |
| **next-env.d.ts**                           | Automatisk genererte miljøtyper for Next.js                                                       |
| **eslint.config.mjs**                       | Flat ESLint-konfigurasjon (regler per prosjektområde)                                             |
| **prettier.config.mjs**                     | Formateringsregler for Prettier                                                                   |
| **postcss.config.mjs**                      | PostCSS-konfigurasjon for Tailwind/CSS-pipelinen                                                  |
| **playwright.config.ts**                    | Konfigurasjon for Playwright E2E-tester                                                           |
| **vitest.config.ts**                        | Vitest-konfigurasjon (standard testpakke)                                                         |
| **vitest.mcp.config.ts**                    | Vitest-konfigurasjon for MCP-server / autoCombo / hurtigbuffertestpakker                          |
| **sonar-project.properties**                | SonarQube/SonarCloud-konfigurasjon (kodekvalitet)                                                 |
| **Dockerfile**                              | Flertrinns Docker-bygging (builder → runner-base → runner-cli)                                    |
| **docker-compose.yml**                      | Compose-oppsett for utvikling med 4 profiler (base, cli, host, cliproxyapi) + redis-sidecontainer |
| **docker-compose.prod.yml**                 | Compose-oppsett for produksjon (port 20130, redis, navngitte volumer)                             |
| **.dockerignore**                           | Filer som er ekskludert fra Docker-konteksten                                                     |
| **fly.toml**                                | Distribusjonskonfigurasjon for Fly.io (region `sin`, port 20128, /data-volum)                     |
| **.env.example**                            | Mal for miljøfil (kopieres automatisk til `.env` ved første installasjon)                         |
| **.gitignore**                              | Ignoreringsmønstre for Git                                                                        |
| **.npmignore**                              | Ekskluderingsliste for npm-publisering                                                            |
| **.npmrc**                                  | npm-konfigurasjon (register, retningslinjer for låsefil)                                          |
| **.node-version**                           | Fastlåst Node-versjon (brukes av nvm-kompatible verktøy)                                          |
| **.nvmrc**                                  | Fastlåst Node-versjon for nvm                                                                     |
| **eslint.complexity.config.mjs**            | ESLint-konfigurasjon for kompleksitetssperren (`scripts/check/check-complexity.mjs --config`)     |
| **eslint.sonarjs.config.mjs**               | ESLint-konfigurasjon for SonarJS-regler (kognitiv kompleksitet / duplisering)                     |
| **source.config.ts**                        | Fumadocs `defineDocs`-kildekonfigurasjon (leverer data til `.source/`)                            |
| **knip.json**                               | Knip-konfigurasjon — ubrukte filer/eksporter/avhengigheter (leverer data til død-kode-sperren)    |
| **stryker.conf.json**                       | Konfigurasjon for mutasjonstesting med Stryker                                                    |
| **.size-limit.json**                        | Konfigurasjon av størrelsesbudsjett for size-limit                                                |
| **promptfooconfig.yaml**                    | Konfigurasjon av promptfoo-evaluering                                                             |
| **.gitleaks.toml**                          | Regelsett for hemmelighetsskanning med gitleaks                                                   |
| **.zizmor.yml**                             | Konfigurasjon av sikkerhetslinting for GitHub Actions med zizmor                                  |
| **socket.yml**                              | Konfigurasjon av forsyningskjedesikkerhet for Socket.dev                                          |
| **news.json**                               | Lokalisert kunngjøringsstrøm for v2; Radar-lanseringselementet leveres inaktivt                   |
| **flake.nix** / **flake.lock**              | Definisjon og låsefil for Nix-utviklingsskall                                                     |
| **.env**                                    | Lokale hemmeligheter (ignorert av git – generert fra `.env.example`)                              |

> **Flyttet ut av roten i v3.8.26 (opprydding):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` og den genererte `quality-metrics.json` (ignorert av git). Se [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-applikasjon

```
src/
├── app/                 # App Router (sider + API-ruter + statussider + landingsside)
├── lib/                 # Kjernebiblioteker/domene-moduler (80 undermapper + ~70 filer på toppnivå)
├── domain/              # Ren domenelogikk (policy-motor, reserveløsning, kostnad, sperring, comboResolver, vurdering)
├── server/              # Moduler kun for server (autorisasjonsflyt, CORS, autentiseringsmellomvare) — kan ikke importeres fra klienten
├── shared/              # Deles mellom server og klient der det er trygt (konstanter, typer, validering, kontrakter, verktøy)
├── i18n/                # next-intl-konfigurasjon + meldings-JSON per språkinnstilling (67 språkinnstillinger)
├── middleware/          # Next.js-mellomvare (berikelse av forespørsler, gjenkjenning av språkinnstilling)
├── mitm/                # Kjerne for MITM-proxy: generering/installasjon av sertifikater, håndterere, mål, inspektør, masker, direkte videresending
│   ├── handlers/        # 9 håndtererklasser for IDE-agenter som utvider MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Lag for trafikkregistrering: buffer (ringbuffer i minnet), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Koblingskode for modelladaptere (eldre kompatibilitetslag)
├── scripts/             # Vedlikeholdsskript i kildetreet (f.eks. backfillAggregation)
├── sse/                 # Eldre SSE-håndterere/-tjenester (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Eldre minnelager (fases ut til fordel for src/lib/db)
├── types/               # Delte TS-typefiler
├── instrumentation.ts   # Next.js-hook for telemetri (nettleser + edge)
├── instrumentation-node.ts  # Instrumentering kun for Node
└── proxy.ts             # Inngangskompatibilitetslag for HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Bane                                                                         | Formål                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Offentlig OpenAI-kompatibelt API (~25 underruter: chat, fullføringer, innebygginger, filer, batcher, lyd, bilder, videoer, musikk, omrangering, moderering, søk, ws, agenter, kontoer, leverandører osv.)                                                                                                                |
| `app/api/v1beta/`                                                            | API-endepunkter i Gemini-stil                                                                                                                                                                                                                                                                                            |
| `app/api/playground/`                                                        | Ruter for Playground Studio: `improve-prompt/` (POST — LLM-basert omskriving av ledetekster), `presets/` (GET liste / POST opprett), `presets/[id]/` (GET / PUT / DELETE) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                    |
| `app/api/` (ikke-v1)                                                         | Administrasjonsruter (~60 kataloger: leverandører, kombinasjoner, innstillinger, mcp, a2a, evalueringer, minne, ferdigheter, webhooks, samsvar, robusthet, overvåking, tunneler, CLI-verktøy osv.)                                                                                                                       |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST-API — 12 ruter (serverkontroll, agentstatus/DNS/tilordninger, omgåelse, sertifikat, oppstrøms-CA). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST- og WS-API — 16+ ruter (forespørsler, økter, verter, opptaksmoduser, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                      |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0-inngangspunkt (`POST /a2a`)                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | A2A-agentkort (oppdagelse)                                                                                                                                                                                                                                                                                               |
| `app/(dashboard)/dashboard/`                                                 | Sider i kontrollpanelgrensesnittet (50+ seksjoner, ~118 page.tsx-filer: leverandører, kombinasjoner, innstillinger, minne, ferdigheter, webhooks, evalueringer, revisjon, batch, hurtigbuffer, kostnader, tilstand, system, aktivitet osv.)                                                                              |
| `app/(dashboard)/dashboard/search-tools/`                                    | Brukergrensesnitt for Search Tools Studio (3 faner: Søk/Innhenting/Sammenligning + SearchConceptCard + ProviderCatalog) — se `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                    |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (skall med 3 faner), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge-kontrollpanelside — serverkort, 9 agentkort, oppsettsveiviser, modelltilordning, omgåelsesliste. i18n PT-BR + EN. Se `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                       |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector-kontrollpanelside — delt DevTools-visning, 7 detaljfaner, 4 brytere for opptaksmodus, øktopptaker, kontekstfargelegging. i18n PT-BR + EN. Se `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                                   |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitetsstrømside (gruppe B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Side for kvotedeling (gruppe B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfigurasjonsside for leverandørplaner (gruppe B): `page.tsx` + `ProviderPlanConfigClient.tsx` — overstyring av kvotedimensjoner per tilkobling                                                                                                                                                                         |
| `app/docs/`                                                                  | Innebygd dokumentasjonsvisning (gjengir `docs/*.md`)                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | Markedsføringsside                                                                                                                                                                                                                                                                                                       |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Autentiseringsrelaterte sider                                                                                                                                                                                                                                                                                            |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-feilsider                                                                                                                                                                                                                                                                                                           |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statiske sider/statussider                                                                                                                                                                                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Rotoppsett, startside, PWA-manifest, global CSS                                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Feilgrenser                                                                                                                                                                                                                                                                                                              |

### `src/lib/` — Kjernebiblioteker (~50 moduler)

| Modul                                    | Formål                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Oppgavebehandling for A2A-protokollen, ferdigheter (5), strømming                                                                                                                                                                                                                                                         |
| `acp/`                                   | CLI-agentregister (lokal CLI-oppdagelse — se `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                  |
| `api/`                                   | Delte API-hjelpere (`requireManagementAuth`, validering)                                                                                                                                                                                                                                                                  |
| `auth/`                                  | Økt, hashing av passord, validering av token                                                                                                                                                                                                                                                                              |
| `batches/`                               | Behandlere for OpenAI Batches API                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Zod-validering av leverandørkatalog + avklaring av funksjonalitet                                                                                                                                                                                                                                                         |
| `cloudAgent/`                            | Skyagenter (Codex Cloud, Devin, Jules) — se `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                              |
| `combos/`                                | Avklaring av kombinasjoner + hjelpere for endring av rekkefølge                                                                                                                                                                                                                                                           |
| `audit/`                                 | Hjelpere for aktivitetsstrøm: `highLevelActions.ts` (tillatelsesliste + `isHighLevelAction()`), `activityIcons.ts` (handling → ikon-/verbkart), `timeline.ts` (groupByDay/relativeTime) — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                   |
| `compliance/`                            | Revisjonslogg + leverandørrevisjon — se `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                     |
| `compression/`                           | Integrasjonslag for komprimeringsmotoren (motorene ligger i `open-sse/services/compression/`)                                                                                                                                                                                                                             |
| `config/`                                | Hjelpere for kjøretidskonfigurasjon                                                                                                                                                                                                                                                                                       |
| `db/`                                    | Over 120 domenespesifikke DB-moduler + 168 migreringer (bruk alltid disse for SQLite)                                                                                                                                                                                                                                     |
| `quota/`                                 | Motor for kvotedeling: `dimensions.ts` (typer/Zod), `types.ts` (QuotaStore-grensesnitt), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — se `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klient for Radars katalog over gratis modeller: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — se `docs/frameworks/RADAR.md`                                                                                                                                |
| `display/`                               | Hjelpefunksjoner for UI-formatering (kostnad, ventetid osv.)                                                                                                                                                                                                                                                              |
| `embeddings/`                            | Hjelpefunksjoner for embedding-tjenesten                                                                                                                                                                                                                                                                                  |
| `env/`                                   | Tolking og validering av miljøvariabler                                                                                                                                                                                                                                                                                   |
| `evals/`                                 | Rammeverk for evalueringer (samlinger, kjører, kjøretidsmiljø) — se `docs/frameworks/EVALS.md`                                                                                                                                                                                                                            |
| `guardrails/`                            | Maskering av personopplysninger, promptinjeksjon, bildebro — se `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                             |
| `jobs/`                                  | Bakgrunnsjobber (cron-lignende)                                                                                                                                                                                                                                                                                           |
| `memory/`                                | Samtaleminne (hybrid RRF med SQLite FTS5 + sqlite-vec samt Qdrant-nivå 2) — se `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                |
| `memory/embedding/`                      | Embedding-lag med flere kilder: `index.ts` (løser), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                              |
| `memory/vectorStore.ts`                  | Wrapper for sqlite-vec v0.1.9 — KNN-råstyrkesøk + hybrid RRF (FTS5 + vektor, k=60). Utsatt initialisering, degraderes kontrollert når sqlite-vec ikke er tilgjengelig. (plan 21)                                                                                                                                          |
| `memory/reindex.ts`                      | `runReindexBatch()` — behandler minner med `needs_reindex=1` i bakgrunnen; kalles av `POST /api/memory/reindex` og banen for utsatt tilbakefylling. (plan 21)                                                                                                                                                             |
| `monitoring/`                            | Helsesjekker, utsending av måledata                                                                                                                                                                                                                                                                                       |
| `oauth/`                                 | OAuth-/importflyter for 22 leverandørmoduler (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                  |
| `plugins/`                               | Register over programtillegg                                                                                                                                                                                                                                                                                              |
| `promptCache/`                           | Anthropic-lignende bruddpunkter for prompt-hurtigbuffer                                                                                                                                                                                                                                                                   |
| `skills/`                                | Rammeverk for ferdigheter (innebygde + markedsplass + SkillsSH) — se `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                          |
| `playground/`                            | Delte hjelpeverktøy for Playground Studio: `codeExport.ts` (curl-/Python-/TS-generator), `promptImprover.ts` (metapromptbygger), `streamMetrics.ts` (ren TTFT/TPS), `types.ts` (pristabell) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                   |
| `webhookDispatcher.ts`                   | HMAC-webhooklevering — se `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                   |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunneladministratorer — se `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                    |
| `cloudSync.ts`, `initCloudSync.ts`       | Valgfri skysynkronisering av tilstand                                                                                                                                                                                                                                                                                     |
| `localDb.ts`                             | Samlemodul for videreeksport av databasemoduler (ingen logikk — kun videreeksport)                                                                                                                                                                                                                                        |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Forespørselsbufring + idempotens                                                                                                                                                                                                                                                                                          |
| (~30 flere filer på toppnivå)            | Spesialiserte hjelpeverktøy (logEnv, modelsDevSync, piiSanitizer osv.)                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Database (147 moduler + 208 migreringer)

| Underkatalog              | Formål                                                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()`-singleton med WAL-journalføring                                                                                                                                       |
| `db/migrations/`          | Versjonerte SQL-filer (idempotente, transaksjonelle). `073_memory_vec.sql` legger til `memory_vec_meta` + kolonnen `needs_reindex` (plan 21).                                           |
| `db/playgroundPresets.ts` | CRUD-modul for forhåndsinnstillinger i Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD for `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` osv. (plan 21)                              |
| `db/<domain>.ts`          | Én modul per domene: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache osv.                 |

### `src/domain/`

| Modul                  | Formål                                                 |
| ---------------------- | ------------------------------------------------------ |
| `policy.ts`            | Regelmotor                                             |
| `fallbackPolicy.ts`    | Beslutningstre for reservevalg                         |
| `costRules.ts`         | Regler for kostnadsberegning                           |
| `lockoutPolicy.ts`     | Utestengingspolicy for modell/tilkobling               |
| `tagRouter.ts`         | Taggbasert ruting                                      |
| `comboResolver.ts`     | Kombinasjonsoppløsning (brukes av kombinasjonsmotoren) |
| `modelAvailability.ts` | Tilgjengelighetskontroll per modell                    |
| `assessment/`          | Modellvurdering (fase 1 av RFC-AUTO-ASSESSMENT )       |

### `src/server/`

| Modul    | Formål                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------- |
| `authz/` | Autorisasjonskjede: `classify` → `policies` → `enforce` — se `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-konfigurasjon                                                                              |
| `auth/`  | Mellomvare for økter                                                                            |

### `src/shared/`

| Modul                            | Formål                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `components/`                    | API for kontrollpanelkomponenter: adaptere over `packages/ui-kit` — se `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: ikonnavn som brukes av skjermbildene → Lucide-komponenter (`<Icon>`)                            |
| `constants/providers.ts`         | **376 leverandører** med Zod-validering (autoritativ kilde)                                                 |
| `constants/cliTools.ts`          | Register over eksterne CLI-verktøy                                                                          |
| `constants/routingStrategies.ts` | **20 rutingsstrategier** med prioriteter                                                                    |
| `constants/publicApiRoutes.ts`   | Ruter som krever Bearer-autentisering (i motsetning til administrasjonsautentisering)                       |
| `constants/upstreamHeaders.ts`   | Blokkeringsliste for headere i oppstrømsforespørsler                                                        |
| `validation/schemas.ts`          | ~80 Zod-skjemaer (én autoritativ kilde for API-kontrakter)                                                  |
| `validation/helpers.ts`          | Hjelpefunksjoner for Zod-validering (`validateBody` osv.)                                                   |
| `types/`                         | Delte TS-typer                                                                                              |
| `contracts/`                     | Offentlige API-kontrakter (brukt av `files:` i `package.json`)                                              |
| `utils/circuitBreaker.ts`        | Sikringsmekanisme for leverandører (se `docs/architecture/RESILIENCE_GUIDE.md`)                             |
| `utils/apiAuth.ts`               | Validering av API-nøkler og kontroll av tilgangsomfang                                                      |
| `utils/fetchTimeout.ts`          | Innkapslinger for tidsavbrudd/avbrytelse ved oppstrøms fetch                                                |
| `utils/releaseNotes.ts`          | Parser for lukkede v2-/legacy-kunngjøringer, lokalisering og ID-basert avvisning                            |

---

## `open-sse/` — arbeidsområde for strømmemotoren

Separat npm-arbeidsområde (`@omniroute/open-sse`). Håndterer behandling av forespørsler og kjøring mot leverandører.

```
open-sse/
├── handlers/            # 16 filer (12 håndterere + 4 hjelpefiler): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search osv.
├── executors/           # 150 kjøringsmoduler (klasser som utvider BaseExecutor + leverandørspesifikke hjelpefiler)
├── translator/          # Formatkonverterere (9 for forespørsler, 9 for svar, 9 hjelpefiler)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ tjenestemoduler (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt i skjult modus, modelDeprecation, taskAwareRouter, workflowFSM osv.)
├── mcp-server/          # MCP-server (110 verktøy, 3 transporter, 33 omfang)
├── config/              # Leverandør-/modellregistre, headerkonfigurasjon, modellaliaser
├── utils/               # TLS-klient, proxyhenting/-dispatcher, nettverkshjelpere
├── index.ts             # Arbeidsområdets inngangspunkt
├── package.json         # Arbeidsområdets manifest
├── tsconfig.json        # Arbeidsområdets TS-konfigurasjon
└── types.d.ts           # Arbeidsområdets typedeklarasjoner
```

### `open-sse/mcp-server/`

| Bane                        | Formål                                                                           |
| --------------------------- | -------------------------------------------------------------------------------- |
| `server.ts`                 | MCP-serverens livssyklus (stdio- + HTTP-transporter)                             |
| `httpTransport.ts`          | HTTP Streamable- + SSE-transporter (`/api/mcp/sse`, `/api/mcp/stream`)           |
| `audit.ts`                  | Revisjonslogging til tabellen `mcp_tool_audit`                                   |
| `scopeEnforcement.ts`       | Omfangsvalidering per verktøy                                                    |
| `runtimeHeartbeat.ts`       | Helsepuls til `DATA_DIR/runtime/mcp-heartbeat.json`                              |
| `descriptionCompressor.ts`  | Komprimerer metadata for verktøybeskrivelser for å spare kontekst                |
| `schemas/tools.ts`          | 36 grunnleggende verktøydefinisjoner + omfang                                    |
| `tools/advancedTools.ts`    | Avanserte verktøyimplementasjoner                                                |
| `tools/memoryTools.ts`      | 3 minneverktøy (søk/legg til/tøm)                                                |
| `tools/skillTools.ts`       | 4 ferdighetsverktøy (liste/aktiver/kjør/kjøringer)                               |
| `tools/compressionTools.ts` | 5 komprimeringsverktøy                                                           |
| `README.md`                 | Intern README for MCP-serveren (krysslenket fra `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — arbeidsområder

| Bane                     | Formål                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — leverandørkopiert øyeblikksbilde av Keak CI UI Kit (`private`, `UNLICENSED`), brukt direkte som kildekode (ingen bygging). `UPSTREAM.md` låser oppstrømscommiten og dokumenterer lisensautorisasjonen; `PATCHES.md` viser lokale patcher (ingen); `src/` synkroniseres bare av `scripts/dev/sync-ui-kit.sh` og beskyttes av `npm run check:ui-kit-snapshot`. Se `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — valgfri tjeneste for nettleserpool (CloakBrowser og Playwright-basert chat)                                                                                                                                                                                                                                                                                                                    |

---

## `electron/` — Skrivebordsinnpakning

| Fil              | Formål                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `main.js`        | Electron-hovedprosess (BrowserWindow, innebygd Next.js-server, systemstatusfelt, automatisk oppdatering) |
| `preload.js`     | IPC-bro (`contextBridge` → `window.omniroute`)                                                           |
| `package.json`   | electron-builder-konfigurasjon + avhengigheter for Electron 41 + electron-builder 26.10                  |
| `assets/`        | Appikoner (Windows .ico, macOS .icns, Linux .png)                                                        |
| `dist-electron/` | Byggresultat (ignorert av git)                                                                           |
| `types.d.ts`     | Typedeklarasjoner for renderer-broen                                                                     |
| `README.md`      | Intern README for Electron (se også `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| Fil                                                                                                         | Formål                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Hovedinngangspunkt for CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` osv. |
| `reset-password.mjs`                                                                                        | Frittstående CLI for tilbakestilling av passord                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Interaktiv + ikke-interaktiv konfigurasjonsveiviser                                                                                   |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostikk av systemtilstand (8+ kontroller)                                                                                         |
| `cli/commands/providers.mjs`                                                                                | Liste over / testing / validering av leverandører                                                                                     |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Hjelpemoduler for CLI                                                                                                                 |
| `cli/tray/tray.ts`                                                                                          | Integrasjon med systemstatusfeltet (på tvers av plattformer: NotifyIcon på Windows, systray2 på macOS/Linux)                          |
| `cli/tray/tray.ps1`                                                                                         | PowerShell-basert NotifyIcon-bakstykke (Windows, ingen nye binærfiler)                                                                |
| `cli/tray/autostart.ts`                                                                                     | Automatisk oppstart på tvers av plattformer (LaunchAgent / .desktop / register)                                                       |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-trinns kjede for å finne SQLite-driver (medfølgende → kjøretid → utsatt installasjon → node:sqlite → sql.js)                        |
| `cli/runtime/magicBytes.mjs`                                                                                | Validering av binære signaturbyte (ELF / Mach-O / Mach-O fat / PE)                                                                    |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — forhåndsfinner drivere ved etterinstallasjon / første oppstart                                                   |
| `nodeRuntimeSupport.mjs`                                                                                    | Validerer støttet Node.js-versjon ved installasjon                                                                                    |

---

## `skills/` — Offentlige agentferdigheter

| Fil                          | Formål                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 ferdighetsmanifester for eksterne KI-agenter (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Bygge- og kontrollskript

| Skript                              | Formål                                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Utviklings-/oppstartskjøring med innlasting av miljøvariabler                                            |
| `build-next-isolated.mjs`           | Frittstående bygg (frittstående Next.js 16)                                                              |
| `prepublish.ts`                     | Klargjøring av pakke før `npm pack`                                                                      |
| `postinstall.mjs`                   | Opprett `.env` automatisk fra `.env.example` ved første installasjon                                     |
| `sync-env.mjs`                      | Synkroniser nøklene i `.env` på nytt med `.env.example`                                                  |
| `check-cycles.mjs`                  | Oppdag sirkulære avhengigheter                                                                           |
| `check-route-validation.mjs`        | Kontroller at alle API-ruter har Zod-validering                                                          |
| `check-t11-any-budget.mjs`          | Håndhev eksplisitt budsjett for `any` per fil                                                            |
| `check-docs-sync.mjs`               | Kontroller versjonssynkronisering i dokumentasjonen (eksisterende pre-commit-kontroll)                   |
| **`check-env-doc-sync.mjs`**        | NY: kryssjekk miljøvariabler i kode mot `.env.example` og `ENVIRONMENT.md`                               |
| **`check-docs-counts-sync.mjs`**    | NY: kontroller at antall (eksekutører, strategier, OAuth, A2A-ferdigheter) samsvarer med dokumentasjonen |
| **`check-deprecated-versions.mjs`** | NY: marker utdaterte versjoner/datoer i dokumentasjonen                                                  |
| `check-supported-node-runtime.ts`   | Kontroller at gjeldende Node-versjon støttes                                                             |
| `check-pr-test-policy.mjs`          | Håndhev regelen «tester kreves» ved endringer i produksjonskode                                          |
| **`gen-provider-reference.ts`**     | NY: generer `docs/reference/PROVIDER_REFERENCE.md` automatisk fra katalogen                              |
| `i18n/generate-multilang.mjs`       | Oversett UI-strenger og dokumentasjon via Google Translate                                               |
| `i18n_autotranslate.py`             | LLM-basert pipeline for oversettelse av dokumentasjon                                                    |
| `validate_translation.py`           | Validering av oversettelser per språkvariant                                                             |
| `check_translations.py`             | Kontroll av i18n-nøkler på kodesiden                                                                     |
| `run-playwright-tests.mjs`          | Playwright E2E-testkjører                                                                                |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-testkjører                                                                                   |
| `run-ecosystem-tests.mjs`           | Tester av økosystemet (leverandørintegrasjon)                                                            |
| `test-report-summary.mjs`           | Generer Markdown-sammendrag av testdekning                                                               |
| `smoke-electron-packaged.mjs`       | Røyktest av pakket Electron-bygg                                                                         |
| `native-binary-compat.mjs`          | Kontroller at systemspesifikke avhengigheter (`better-sqlite3`) samsvarer med Node-versjonen i Electron  |
| `validate-pack-artifact.ts`         | Valider utdata fra npm-pakking                                                                           |
| `responses-ws-proxy.mjs`            | WebSocket-bro for Codex Responses API                                                                    |
| `v1-ws-bridge.mjs`                  | WebSocket-bro for endepunktet `/api/v1/ws`                                                               |
| `standalone-server-ws.mjs`          | Frittstående WS-serverkjører                                                                             |
| `system-info.mjs`                   | Skriv ut system-/kjøretidsinformasjon for brukerstøtte                                                   |
| `healthcheck.mjs`                   | Engangshelsesjekk (brukes av Docker HEALTHCHECK)                                                         |
| `uninstall.mjs`                     | Skript for fullstendig avinstallering                                                                    |
| `dev/sync-ui-kit.sh`                | Kopier `src/` fra CI UI Kit ved en låst commit til `packages/ui-kit/src`                                 |
| `check/check-ui-kit-snapshot.mjs`   | Pre-commit-kontroll: `packages/ui-kit/src` samsvarer med den låste oppstrøms-commiten                    |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — ikonnavn i bruk som `ICON_MAP` ikke tilordner                                   |
| `dev/codemod-material-icons.mjs`    | Skriv om literale Material Symbols-spans til `<Icon>` (migreringsverktøy)                                |

---

## `docs/` — Offentlig dokumentasjon (7 rotfiler + 17 undermapper)

### Veiledninger på toppnivå

| Dok                         | Formål                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Overordnet arkitektur, delsystemkart, dashbordflate                                       |
| `CODEBASE_DOCUMENTATION.md` | Teknisk referanse: kataloger, moduler, konvensjoner                                       |
| `FEATURES.md`               | Funksjonsmatrise med høydepunkter fra v3.8                                                |
| `USER_GUIDE.md`             | Brukerhåndbok (oppsett, modeller, kombinasjoner, CLI-er, lyd osv.)                        |
| `API_REFERENCE.md`          | API-endepunktreferanse med autentiseringsmodell                                           |
| `openapi.yaml`              | OpenAPI 3.0-spesifikasjon (121 stier)                                                     |
| `SETUP_GUIDE.md`            | Installasjonsmetoder (npm, npx, Docker, Electron, Termux, kildekode)                      |
| `ENVIRONMENT.md`            | Alle miljøvariabler (~800 dokumentert, ~3 050 linjer i `.env.example`)                    |
| `TROUBLESHOOTING.md`        | Vanlige feil + kjente problemer i v3.8.0                                                  |
| `RELEASE_CHECKLIST.md`      | Full utgivelsesflyt (skills, husky, conventional commits, utrulling)                      |
| `COVERAGE_PLAN.md`          | Dekningsmål og nåværende status                                                           |
| `FREE_TIERS.md`             | Kuraterte gratistilbydere (48+ gratis + 11 OAuth)                                         |
| `CLI-TOOLS.md`              | Eksterne CLI-integrasjoner + internt OmniRoute-CLI                                        |
| `I18N.md`                   | i18n-arkitektur, legge til et språk, 67 språkversjoner                                    |
| `UNINSTALL.md`              | Trinn for ren avinstallasjon                                                              |
| `PROVIDER_REFERENCE.md`     | **Autogenerert** katalog over 376 tilbydere (regenerer: `npm run gen:provider-reference`) |

### Dybdegående gjennomgang av delsystemer

| Dok                                        | Formål                                                                     |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | MCP-server: 110 verktøy, 3 transporter, 33 scopes, REST-endepunkter        |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 skills, REST-hjelpere, agentkort                     |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Samlet veiledning: A2A vs ACP vs Cloud Agents                              |
| `CLOUD_AGENT.md`                           | Codex Cloud / Devin / Jules-orkestrering                                   |
| `SKILLS.md`                                | Skills-rammeverk (innebygd + markedsplass + SkillsSH + sandkasse)          |
| `RADAR.md`                                 | Radar-overlegg for gratismodellkatalog (`RADAR_ENABLED`, av som standard)  |
| `MEMORY.md`                                | Minnesystem (SQLite FTS5 + Qdrant)                                         |
| `EVALS.md`                                 | Eval-rammeverk (suiter, kjøringer, vurderingsmatriser)                     |
| `GUARDRAILS.md`                            | PII-maskering, prompt-injeksjon, vision-bro                                |
| `COMPLIANCE.md`                            | Revisjonslogg, oppbevaring, noLog-opt-out                                  |
| `WEBHOOKS.md`                              | HMAC-signert webhook-levering                                              |
| `REASONING_REPLAY.md`                      | Hybrid minne-/SQLite-cache for `reasoning_content`                         |
| `AUTHZ_GUIDE.md`                           | Autorisasjonspipeline (`classify` → `policies` → `enforce`)                |
| `RESILIENCE_GUIDE.md`                      | Circuit breaker + nedkjøling + modellutestengelse                          |
| `docs/security/STEALTH_GUIDE.md` (kun git) | TLS-fingeravtrykk (JA3/JA4), Claude Code CCH, MITM-sertifikat              |
| `AUTO-COMBO.md`                            | Auto Combo-motor (16-faktor poengsetting, 6 moduspakker, virtuell fabrikk) |

### Komprimering

| Dok                             | Formål                                       |
| ------------------------------- | -------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Oversikt over komprimeringsmoduser + veikart |
| `COMPRESSION_ENGINES.md`        | Caveman- og RTK-motorer, registerkontrakt    |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-skjema for Caveman-regelpakke           |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventar over regelpakker per språk          |
| `RTK_COMPRESSION.md`            | RTK deklarativ pipeline (56 filtre)          |

### Utrulling

| Dokument                     | Formål                                                           |
| ---------------------------- | ---------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker-bygg, profiler (base/cli/host/cliproxyapi), Redis-sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Generisk VM/VPS-distribusjon (Ubuntu/Debian + nginx + systemd)   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-distribusjon (foreløpig kun på kinesisk)                  |
| `TERMUX_GUIDE.md`            | Headless Android via Termux                                      |
| `PWA_GUIDE.md`               | Installasjon av Progressive Web App + service worker             |
| `ELECTRON_GUIDE.md`          | Bygg + signering + distribusjon av skrivebordsapp                |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                           |
| `PROXY_GUIDE.md`             | 4-nivås utgående proxy + 1proxy-markedsplass                     |

### Underkataloger

| Underkatalog          | Formål                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | Lokaliserte oversettelser av dokumentasjonen (41 språk)                                                                                                                                                      |
| `docs/screenshots/`   | Bilderessurser for veiledninger                                                                                                                                                                              |
| `_tasks/superpowers/` | Planer/spesifikasjoner fra superpowers (`writing-plans`/`brainstorming`) + forskning — isolert, separat versjonert repo, git-ignorert av hovedtreet. Se CLAUDE.md → «Planleggings- og forskningsartefakter». |

---

## `tests/` — Testpakker

| Undermappe                           | Type                                      | Testkjører                                 |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------ |
| `tests/unit/`                        | Enhetstester (~4 800 filer, raskest)      | Nodes innebygde testkjører                 |
| `tests/integration/`                 | Integrasjonstester for flere moduler + DB | Nodes innebygde testkjører (samtidighet 1) |
| `tests/e2e/`                         | E2E for brukergrensesnitt + arbeidsflyt   | Playwright                                 |
| `tests/e2e/protocol-clients.test.ts` | EE med ekte MCP- og A2A-klienter          | Egendefinerte protokollklienter            |
| `tests/e2e/ecosystem.test.ts`        | Leverandørintegrasjon (bruker nettverk)   | Nodes innebygde testkjører                 |

---

## `public/` — Statiske ressurser

| Sti                 | Formål                                                                     |
| ------------------- | -------------------------------------------------------------------------- |
| `public/` (rot)     | Favorittikoner, robots.txt, manifest, service worker, markedsføringsbilder |
| `public/providers/` | Leverandørlogoer i PNG/SVG-format (brukes i kontrollpanelet)               |

---

## `config/` — Statiske konfigurasjoner + status for kvalitetsport

Medfølgende konfigurasjonsmaler samt versjonslagrede referanseverdier for kvalitetsporten
(flyttet hit fra rotmappen i v3.8.26 for å holde roten oversiktlig).

| Sti                                           | Formål                                                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Liste over språkinnstillinger + metadata (autoritativ kilde for antallet på 42 språkinnstillinger) |
| `config/i18n-schema.json`                     | JSON-skjema som validerer `i18n.json`                                                              |
| `config/payloadRules.json`                    | Regler for rensing av nyttelast fra oppstrømskilder                                                |
| `config/quality/quality-baseline.json`        | Trinnvis referanseverdi for flere måleverdier (`scripts/quality/check-quality-ratchet.mjs`)        |
| `config/quality/complexity-baseline.json`     | Fastlåst referanseverdi for ESLint-kompleksitet (`check-complexity.mjs`)                           |
| `config/quality/duplication-baseline.json`    | Fastlåst referanseverdi for jscpd-duplisering (`check-duplication.mjs`)                            |
| `config/quality/file-size-baseline.json`      | Fastlåst referanseverdi for filstørrelse per fil (`check-file-size.mjs`)                           |
| `config/quality/test-discovery-baseline.json` | Fastlåst referanseverdi for foreldreløse tester (`check-test-discovery.mjs`)                       |
| `config/quality/dependency-allowlist.json`    | Tillatelsesliste for godkjente avhengigheter (`check-deps.mjs`)                                    |
| `config/quality/.license-allowlist.json`      | Tillatelsesliste for SPDX-lisenser (`check-licenses.mjs`)                                          |
| `config/quality/quality-metrics.json`         | Midlertidig innsamlede måleverdier (generert av `collect-metrics.mjs`; **ignorert av git**)        |

---

## `.github/` — GitHub-integrasjon

| Bane                               | Formål                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD-arbeidsflyter (linting, testing, dekning, utgivelse) |
| `.github/ISSUE_TEMPLATE/`          | Maler for feil- og funksjonsforespørsler                                  |
| `.github/pull_request_template.md` | PR-mal                                                                    |
| `.github/dependabot.yml`           | Konfigurasjon for avhengighetsoppdateringer                               |

---

## `.husky/` — Git-hooks

| Fil          | Formål                                                                       |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | Kjører `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | For øyeblikket deaktivert (kommentert ut). Kjør `npm run test:unit` manuelt. |
| `_/`         | Husky-internfiler                                                            |

---

## `.claude/` — Claude Code-skråstrekkommandoer

| Fil                                                 | Formål                                                         |
| --------------------------------------------------- | -------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — øk versjonen + automatisk endringslogg    |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fullstendig arbeidsflyt for utgivelse |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Distribuer til VPS                                             |
| `commands/capture-release-evidences-cc.md`          | Nettleseropptak av nye funksjoner som WebP                     |
| `commands/review-{prs,discussions}-cc.md`           | Sorter GitHub-PR-er/-diskusjoner                               |
| `commands/{review-issues,implement-features}-cc.md` | Arbeidsflyter for saker                                        |
| `settings.local.json`                               | Prosjektspesifikke Claude Code-innstillinger                   |

---

## `.agents/` — Generiske agentarbeidsflyter (Codex / Cursor / osv.)

| Bane                     | Formål                                                       |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 arbeidsflytdefinisjoner (speiling av `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 ferdighetsdefinisjoner med Codex-kjøringsmerknader         |

> **Merk:** Arbeidsflyter og kommandoer er for øyeblikket identiske byte for byte. Hvis `.agents/` er ment for et annet kjøretidsmiljø for agenter (Codex), må variantene avvike på en meningsfull måte.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Utenfor treet

Disse katalogene med understrekprefiks inneholder innhold som ikke leveres:

- **`_ideia/`** — designnotater (kategoriene utsett / ikke egnet / levedyktig)
- **`_mono_repo/`** — historiske underprosjekter (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — skrivebeskyttede kloner av relaterte OSS-prosjekter (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api osv.) for kryssreferanser under utvikling
- **`_tasks/`** — filer for oppgavesporing per utgivelse (uformelt)

Ikke inkludert i resultatet fra `npm pack`. Se `.npmignore`.

---

## Generert / ignorert av Git

| Bane                   | Formål                            |
| ---------------------- | --------------------------------- |
| `node_modules/`        | npm-avhengigheter                 |
| `.next/`               | Byggresultat fra Next.js          |
| `coverage/`            | c8-dekningsrapporter              |
| `logs/`                | Kjøretidslogger                   |
| `package/`             | Klargjøring for npm-pakking       |
| `.playwright-mcp/`     | Testartefakter fra Playwright MCP |
| `.issues/`             | Lokal hurtigbuffer for saker      |
| `tsconfig.tsbuildinfo` | Inkrementell TS-hurtigbuffer      |

---

## Navigasjonstips

- **Ny bidragsyter?** Les `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Legge til en leverandør?** Følg `docs/architecture/ARCHITECTURE.md § Adding a New Provider` og kryssjekk med `docs/reference/PROVIDER_REFERENCE.md`.
- **Legge til en rute?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` og `src/shared/validation/schemas.ts`.
- **Legge til et MCP-verktøy?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Legge til en A2A-ferdighet?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Kjøre lokalt?** `docs/guides/SETUP_GUIDE.md`.
- **Distribuere?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Publisere en versjon?** `docs/ops/RELEASE_CHECKLIST.md` (og Claude Code-ferdigheten `/generate-release-cc`).
