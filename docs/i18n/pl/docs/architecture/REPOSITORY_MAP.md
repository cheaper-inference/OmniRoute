# Repository Map (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Jednowierszowy opis każdego katalogu i pliku głównego.**
> Ostatnia aktualizacja: 2026-06-28 — OmniRoute v3.8.40
>
> Użyj tej mapy, aby szybko poruszać się po bazie kodu. Aby uzyskać szczegółowe informacje, skorzystaj z odnośników do dedykowanej dokumentacji.

## Drzewo najwyższego poziomu

```
OmniRoute/
├── src/                  # Aplikacja Next.js 16 (interfejs użytkownika + trasy API + biblioteki + domena + serwer)
├── open-sse/             # Obszar roboczy silnika strumieniowego (procedury obsługi, moduły wykonawcze, translator, serwer MCP)
├── packages/            # Obszary robocze npm: ui-kit (dołączony kod Keak CI UI Kit) i browser-pool
├── electron/             # Aplikacja opakowująca na komputery stacjonarne (Electron 41 + electron-builder 26.10)
├── bin/                  # Punkt wejścia CLI i procedury obsługi poleceń
├── scripts/              # Skrypty kompilacji, sprawdzania, synchronizacji i jednorazowego użytku
├── docs/                 # Publiczna dokumentacja (jesteś tutaj)
├── tests/                # Wszystkie zestawy testów (jednostkowe, integracyjne, e2e, klienci protokołów)
├── public/               # Zasoby statyczne Next.js, manifest PWA, service worker, ikony
├── config/               # Konfiguracja statyczna + stan bramek jakości (i18n, payloadRules, quality/)
├── images/               # Zasoby graficzne do materiałów marketingowych i pliku README
├── @omniroute/           # Pakiety towarzyszące przeznaczone do publikacji (opencode-plugin, opencode-provider)
├── skills/               # Pakiety umiejętności CLI/agentów (cli-* + omni-* + config-codex-cli)
├── examples/             # Przykładowe wtyczki + projekt startowy omniroute-cmd-hello
├── contrib/              # Wkład społeczności (podman/)
├── .source/              # Konfiguracja źródłowa Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Przepływy pracy GitHub Actions + szablony zgłoszeń + szablon PR
├── .husky/               # Hooki Git (pre-commit, pre-push)
├── .claude/              # Polecenia ukośnikowe Claude Code (na poziomie projektu)
├── .agents/              # Przepływy pracy i umiejętności Codex / agentów ogólnego przeznaczenia (kopia .claude/)
├── .vscode/              # Ustawienia obszaru roboczego VS Code
├── _ideia/               # Notatki dotyczące planowania (nieformalne; niedołączane do wydania)
├── _mono_repo/           # Historyczne podprojekty (cloud, site, vscode-extension)
├── _references/          # Klony referencyjne tylko do odczytu z powiązanych projektów OSS
├── _tasks/               # Pliki śledzenia zadań dla poszczególnych wydań (nieformalne)
├── .build/ .worktrees/ dist/   # Lokalne dane robocze kompilacji / git-worktree / wyników kompilacji (ignorowane przez Git)
├── .issues/              # Lokalna pamięć podręczna zgłoszeń (ignorowana przez Git)
├── .playwright-mcp/      # Artefakty testowe Playwright MCP
├── coverage/             # Wyniki pokrycia kodu z c8 (ignorowane przez Git)
├── logs/                 # Dzienniki środowiska uruchomieniowego (ignorowane przez Git)
├── node_modules/         # Zależności (ignorowane przez Git)
├── package/              # Obszar przejściowy npm pack (artefakt kompilacji)
├── .next/                # Wyniki kompilacji Next.js (ignorowane przez Git)
└── (pliki główne — zobacz poniżej)
```

---

## Pliki główne

| Plik                                        | Przeznaczenie                                                                                              |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketingowa strona docelowa + szybki start + macierz funkcji (zobacz też `llm.txt`)                       |
| **CHANGELOG.md**                            | Dziennik zmian dla poszczególnych wydań (generowany automatycznie przez umiejętność `/version-bump-cc`)    |
| **LICENSE**                                 | Tekst licencji MIT                                                                                         |
| **CLAUDE.md**                               | Reguły projektu dla agentów Claude Code (zasady bezwzględne, konwencje, scenariusze)                       |
| **AGENTS.md**                               | To samo co CLAUDE.md, ale dla agentów AI innych niż Claude (Codex, Cursor itp.)                            |
| **GEMINI.md**                               | Zwięzłe reguły dla agentów opartych na Gemini (podzbiór CLAUDE.md)                                         |
| **CONTRIBUTING.md**                         | Przewodnik dla współtwórców: konfiguracja, konwencjonalne commity, testowanie, proces PR                   |
| **SECURITY.md**                             | Zasady zgłaszania podatności, obsługiwane wersje, model zagrożeń                                           |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — oczekiwania dotyczące zachowania społeczności                                       |
| **llm.txt**                                 | Strona docelowa w zwykłym tekście, zoptymalizowana pod roboty indeksujące LLM (SEO dla asystentów AI)      |
| **package.json**                            | Manifest npm, skrypty, zależności, silniki, próg pokrycia c8                                               |
| **package-lock.json**                       | Zablokowane drzewo zależności                                                                              |
| **tsconfig.json**                           | Główna konfiguracja TypeScript                                                                             |
| **tsconfig.typecheck-core.json**            | Konfiguracja sprawdzania typów dla rdzenia `src/`                                                          |
| **tsconfig.typecheck-noimplicit-core.json** | Rygorystyczne sprawdzanie typów (`noImplicitAny`)                                                          |
| **tsconfig.tsbuildinfo**                    | Pamięć podręczna kompilacji przyrostowej TS (ignorowana przez Git)                                         |
| **next.config.mjs**                         | Konfiguracja kompilacji Next.js 16 (samodzielne wyjście)                                                   |
| **next-env.d.ts**                           | Automatycznie generowane przez Next.js typy środowiska                                                     |
| **eslint.config.mjs**                       | Płaska konfiguracja ESLint (reguły dla poszczególnych obszarów projektu)                                   |
| **prettier.config.mjs**                     | Reguły formatowania Prettier                                                                               |
| **postcss.config.mjs**                      | Konfiguracja PostCSS dla potoku Tailwind/CSS                                                               |
| **playwright.config.ts**                    | Konfiguracja testów E2E Playwright                                                                         |
| **vitest.config.ts**                        | Konfiguracja Vitest (domyślny zestaw)                                                                      |
| **vitest.mcp.config.ts**                    | Konfiguracja Vitest dla serwera MCP / zestawów autoCombo / pamięci podręcznej                              |
| **sonar-project.properties**                | Konfiguracja SonarQube/SonarCloud (jakość kodu)                                                            |
| **Dockerfile**                              | Wieloetapowa kompilacja Docker (builder → runner-base → runner-cli)                                        |
| **docker-compose.yml**                      | Konfiguracja deweloperska Compose z 4 profilami (base, cli, host, cliproxyapi) + kontener pomocniczy Redis |
| **docker-compose.prod.yml**                 | Konfiguracja produkcyjna Compose (port 20130, Redis, nazwane wolumeny)                                     |
| **.dockerignore**                           | Pliki wykluczone z kontekstu Docker                                                                        |
| **fly.toml**                                | Konfiguracja wdrożenia Fly.io (region `sin`, port 20128, wolumen /data)                                    |
| **.env.example**                            | Szablon pliku zmiennych środowiskowych (automatycznie kopiowany do `.env` podczas pierwszej instalacji)    |
| **.gitignore**                              | Wzorce ignorowania Git                                                                                     |
| **.npmignore**                              | Lista wykluczeń podczas publikowania w npm                                                                 |
| **.npmrc**                                  | Konfiguracja npm (rejestr, zasady pliku blokady)                                                           |
| **.node-version**                           | Przypięta wersja Node (używana przez narzędzia zgodne z nvm)                                               |
| **.nvmrc**                                  | Przypięta wersja Node dla nvm                                                                              |
| **eslint.complexity.config.mjs**            | Konfiguracja ESLint dla mechanizmu zapadkowego złożoności (`scripts/check/check-complexity.mjs --config`)  |
| **eslint.sonarjs.config.mjs**               | Konfiguracja ESLint dla reguł SonarJS (złożoność poznawcza / duplikacja)                                   |
| **source.config.ts**                        | Konfiguracja źródła Fumadocs `defineDocs` (zasila `.source/`)                                              |
| **knip.json**                               | Konfiguracja Knip — nieużywane pliki/eksporty/zależności (zasila bramkę martwego kodu)                     |
| **stryker.conf.json**                       | Konfiguracja testów mutacyjnych Stryker                                                                    |
| **.size-limit.json**                        | Konfiguracja budżetu rozmiaru pakietu size-limit                                                           |
| **promptfooconfig.yaml**                    | Konfiguracja ewaluacji promptfoo                                                                           |
| **.gitleaks.toml**                          | Zestaw reguł skanowania sekretów gitleaks                                                                  |
| **.zizmor.yml**                             | Konfiguracja analizy bezpieczeństwa GitHub Actions za pomocą zizmor                                        |
| **socket.yml**                              | Konfiguracja bezpieczeństwa łańcucha dostaw Socket.dev                                                     |
| **news.json**                               | Zlokalizowany kanał ogłoszeń v2; wpis o uruchomieniu Radar jest dostarczany jako nieaktywny                |
| **flake.nix** / **flake.lock**              | Definicja powłoki deweloperskiej Nix + plik blokady                                                        |
| **.env**                                    | Lokalne dane poufne (ignorowane przez git — generowane z `.env.example`)                                   |

> **Przeniesiono z katalogu głównego w v3.8.26 (uporządkowanie):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` oraz wygenerowany plik `quality-metrics.json` (ignorowany przez git). Zobacz [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplikacja Next.js

```
src/
├── app/                 # App Router (pages + API routes + status pages + landing)
├── lib/                 # Core libraries / domain modules (80 subdirs + ~70 top-level files)
├── domain/              # Pure domain logic (policy engine, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Server-only modules (authz pipeline, cors, auth middleware) — cannot import from client
├── shared/              # Shared between server and client where safe (constants, types, validation, contracts, utils)
├── i18n/                # next-intl config + per-locale message JSON (67 locales)
├── middleware/          # Next.js middleware (request enrichment, locale detection)
├── mitm/                # MITM proxy core: cert gen/install, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 IDE-agent handler classes extending MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Traffic capture layer: buffer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model adapter glue (legacy shim)
├── scripts/             # In-tree maintenance scripts (e.g., backfillAggregation)
├── sse/                 # Legacy SSE handlers/services (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy in-memory store (being phased out for src/lib/db)
├── types/               # Shared TS type files
├── instrumentation.ts   # Next.js telemetry hook (browser + edge)
├── instrumentation-node.ts  # Node-only instrumentation
└── proxy.ts             # HTTP-proxy entry shim
```

### `src/app/` — router aplikacji (Next.js 16)

| Ścieżka                                                                      | Zamiar                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Publiczny API zgodny z OpenAI (~ 25 podtras: czat, uzupełnienia, osadzanie, pliki, partie, audio, obrazy, filmy, muzyka, reranking, moderacje, wyszukiwanie, ws, agenci, konta, dostawcy itp.)                                                                                                                                     |
| `app/api/v1beta/`                                                            | Punkty końcowe API w stylu Gemini                                                                                                                                                                                                                                                                                                  |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — LLM Prompt Rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — patrz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                                  |
| `app/api/` (nie-v1)                                                          | trasy Management/admin (katalogi ~ 60: dostawcy, kombinacje, ustawienia, mcp, a2a, evals, pamięć, umiejętności, webhooki, zgodność, odporność, monitorowanie, tunele, narzędzia cli itp.)                                                                                                                                          |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 tras (kontrola serwera, agent state/DNS/mappings, obejście, certyfikat, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Zobacz `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                            |
| `app/api/tools/traffic-inspector/`                                           | Inspektor ruchu REST + WS API — 16 tras + (żądania, sesje, hosty, tryby przechwytywania, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Zobacz `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                               |
| `app/a2a/`                                                                   | punkt wejścia A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                       |
| `app/.well-known/agent.json/`                                                | Karta Agenta A2A (odkrycie)                                                                                                                                                                                                                                                                                                        |
| `app/(dashboard)/dashboard/`                                                 | Strony UI panelu kontrolnego (50 sekcji +, pliki ~ 118 page.tsx : dostawcy, kombinacje, ustawienia, pamięć, umiejętności, webhooki, ewaluacje, audyt, wsad, pamięć podręczna, koszty, stan zdrowia, system, aktywność itp.)                                                                                                        |
| `app/(dashboard)/dashboard/search-tools/`                                    | Narzędzia wyszukiwania Studio UI (3 karty: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — zobacz `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                          |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (powłoka z trzema zakładkami), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | strona panelu AgentBridge — karta serwera, 9 kart agentów, kreator konfiguracji, mapowanie modeli, lista obejść. i18n PT-BR + EN. Zobacz `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                         |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Strona panelu kontrolnego Inspektora ruchu — podział DevTools, 7 zakładek szczegółów, 4 przełączniki trybu przechwytywania, rejestrator sesji, kolorowanie kontekstu. i18n PT-BR + EN. Zobacz `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                              |
| `app/(dashboard)/dashboard/activity/`                                        | Strona kanału aktywności (grupa B): `page.tsx` (serwer) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — patrz `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                     |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Strona udostępniania przydziałów (grupa B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Strona konfiguracji planu dostawcy (grupa B): `page.tsx` + `ProviderPlanConfigClient.tsx` — wymiary przydziału na zastąpienie połączenia                                                                                                                                                                                           |
| `app/docs/`                                                                  | Wbudowana przeglądarka dokumentacji (renderuje `docs/*.md`)                                                                                                                                                                                                                                                                        |
| `app/landing/`                                                               | Marketingowa strona docelowa                                                                                                                                                                                                                                                                                                       |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Strony związane z uwierzytelnianiem                                                                                                                                                                                                                                                                                                |
| `app/{400,401,403,408,429,500,502,503}/`                                     | strony błędów HTTP                                                                                                                                                                                                                                                                                                                 |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | strony Static/status                                                                                                                                                                                                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Układ główny, strona główna, manifest PWA, globalny CSS                                                                                                                                                                                                                                                                            |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Granice błędów                                                                                                                                                                                                                                                                                                                     |

### `src/lib/` — Biblioteki podstawowe (~ 50 modułów)

| Moduł                                    | Zamiar                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | menedżer zadań protokołu A2A, umiejętności (5), streaming                                                                                                                                                                                                                                                                         |
| `acp/`                                   | Rejestr agentów CLI (lokalne wykrywanie CLI — zobacz `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                  |
| `api/`                                   | Wspólne pomocniki API (`requireManagementAuth`, walidacja)                                                                                                                                                                                                                                                                        |
| `auth/`                                  | Sesja, hashowanie hasła, weryfikacja tokena                                                                                                                                                                                                                                                                                       |
| `batches/`                               | OpenAI Partie obsługi API                                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Sprawdzanie poprawności katalogu dostawcy Zod i rozpoznawanie możliwości +                                                                                                                                                                                                                                                        |
| `cloudAgent/`                            | Agenci w chmurze (Codex Cloud, Devin, Jules) — zobacz `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                            |
| `combos/`                                | Pomocnicy zmiany kolejności + w rozdzielczości kombinowanej                                                                                                                                                                                                                                                                       |
| `audit/`                                 | Pomocnicy kanału aktywności: `highLevelActions.ts` (lista dozwolonych + `isHighLevelAction()`), `activityIcons.ts` (mapa akcji → icon/verb ), `timeline.ts` (groupByDay/relativeTime) — zobacz `docs/architecture/MONITORING_SECTIONS.md`                                                                                         |
| `compliance/`                            | Dziennik audytu Audyt dostawcy + — patrz `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                            |
| `compression/`                           | Klej do silników kompresyjnych (silniki mieszkają w `open-sse/services/compression/`)                                                                                                                                                                                                                                             |
| `config/`                                | Pomocnicy konfiguracji środowiska wykonawczego                                                                                                                                                                                                                                                                                    |
| `db/`                                    | 120 modułów + domeny DB + 168 migracji (zawsze przechodź tutaj, aby uzyskać SQLite)                                                                                                                                                                                                                                               |
| `quota/`                                 | Silnik współdzielenia kwot: `dimensions.ts` (types/Zod), `types.ts` (interfejs QuotaStore ), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — zobacz `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klient katalogu swobodnego radaru: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — zobacz `docs/frameworks/RADAR.md`                                                                                                                                                 |
| `display/`                               | pomocnicy formatowania UI (koszt, opóźnienie itp.)                                                                                                                                                                                                                                                                                |
| `embeddings/`                            | Pomocnicy usług osadzania                                                                                                                                                                                                                                                                                                         |
| `env/`                                   | Sprawdzanie poprawności analizy zmiennej Env +                                                                                                                                                                                                                                                                                    |
| `evals/`                                 | Framework Eval (pakiety, runtime, runtime) — zobacz `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                    |
| `guardrails/`                            | PII masker, szybki wtrysk, mostek wizyjny — patrz `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                   |
| `jobs/`                                  | Zadania w tle (podobne do cron)                                                                                                                                                                                                                                                                                                   |
| `memory/`                                | Pamięć konwersacyjna (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant tier 2) — patrz `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                    |
| `memory/embedding/`                      | Warstwa osadzająca z wieloma źródłami: `index.ts` (rezolwer), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                            |
| `memory/vectorStore.ts`                  | opakowanie sqlite-vec v0.1.9 — hybryda KNN brute-force + RRF ( wektor FTS5 +, k = 60). Lazy-init, degraduje się z wdziękiem, gdy sqlite-vec jest niedostępne. (plan 21)                                                                                                                                                           |
| `memory/reindex.ts`                      | `runReindexBatch()` — przetwarza wspomnienia z `needs_reindex=1` w tle; wywoływana przez `POST /api/memory/reindex` i ścieżkę leniwego uzupełniania. (plan 21)                                                                                                                                                                    |
| `monitoring/`                            | Kontrole stanu, emisja metryk                                                                                                                                                                                                                                                                                                     |
| `oauth/`                                 | przepływy OAuth/import dla 22 modułów dostawców (agy, antigravity, claude, cline, codebuddy-cn, codex, kursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hostowany, zed)                                                    |
| `plugins/`                               | Rejestr wtyczek                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Punkty przerwania pamięci podręcznej w stylu antropicznym                                                                                                                                                                                                                                                                         |
| `skills/`                                | Ramy umiejętności (wbudowany rynek + + SkillsSH) — zobacz `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                             |
| `playground/`                            | Wspólne pomocniki Playground Studio: `codeExport.ts` (generator curl/Python/TS ), `promptImprover.ts` (kreator meta-podpowiedzi), `streamMetrics.ts` (czysty TTFT/TPS), `types.ts` (tabela cen) — zobacz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                   |
| `webhookDispatcher.ts`                   | dostarczanie webhooka HMAC — zobacz `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                 |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Zarządzający tunelami – zob `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                           |
| `cloudSync.ts`, `initCloudSync.ts`       | Opcjonalna synchronizacja stanu w chmurze                                                                                                                                                                                                                                                                                         |
| `localDb.ts`                             | Reeksport beczki dla modułów db (bez logiki — tylko reeksport)                                                                                                                                                                                                                                                                    |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Poproś o buforowanie idempotencji +                                                                                                                                                                                                                                                                                               |
| (~ 30 więcej plików najwyższego poziomu) | Wyspecjalizowani pomocnicy (logEnv, modelsDevSync, piiSanitizer itp.)                                                                                                                                                                                                                                                             |

### `src/lib/db/` — Baza danych (147 modułów + 208 migracji)

| Podkatalog                | Zamiar                                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton z dziennikiem WAL                                                                                                                                                                       |
| `db/migrations/`          | Wersjonowane pliki SQL (idempotentne, transakcyjne). `073_memory_vec.sql` dodaje kolumnę `memory_vec_meta` + `needs_reindex` (plan 21).                                                                             |
| `db/playgroundPresets.ts` | moduł CRUD dla presetów Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                                            |
| `db/memoryVec.ts`         | CRUD dla `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itp. (plan 21)                                                          |
| `db/<domain>.ts`          | Jeden moduł na domenę: dostawcy, kombinacje, apiKeys, użytkownicy, sesje, użycie, dziennik audytu, webhooki, umiejętności, wpisy w pamięci, zadania_agenta w chmurze, evals* \* , pamięć podręczna rozumowania itp. |

### `src/domain/`

| Moduł                  | Zamiar                                           |
| ---------------------- | ------------------------------------------------ |
| `policy.ts`            | Silnik polityki                                  |
| `fallbackPolicy.ts`    | Awaryjne drzewo decyzyjne                        |
| `costRules.ts`         | Zasady kalkulacji kosztów                        |
| `lockoutPolicy.ts`     | Polityka blokowania Model/connection             |
| `tagRouter.ts`         | Routing oparty na tagach                         |
| `comboResolver.ts`     | Rozdzielczość combo (używana przez silnik combo) |
| `modelAvailability.ts` | Sprawdzanie dostępności poszczególnych modeli    |
| `assessment/`          | Ocena modelu (faza 1 RFC-AUTO-ASSESSMENT)        |

### `src/server/`

| Moduł    | Zamiar                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `authz/` | Rurociąg autoryzacji: `classify` → `policies` → `enforce` — patrz `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | konfiguracja CORS                                                                                    |
| `auth/`  | Oprogramowanie pośredniczące sesji                                                                   |

### `src/shared/`

| Moduł                            | Zamiar                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `components/`                    | Komponent deski rozdzielczej API: adaptery na `packages/ui-kit` — patrz `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nazwy ikon używane na ekranach → Komponenty Lucide (`<Icon>`)                                    |
| `constants/providers.ts`         | **377 dostawców** z walidacją Zod (źródło prawdy)                                                            |
| `constants/cliTools.ts`          | Zewnętrzny rejestr narzędzi CLI                                                                              |
| `constants/routingStrategies.ts` | **20 strategii routingu** z priorytetami                                                                     |
| `constants/publicApiRoutes.ts`   | Trasy wymagające uwierzytelnienia okaziciela (w porównaniu z zarządzaniem).                                  |
| `constants/upstreamHeaders.ts`   | Lista odrzuconych nagłówków dla żądań nadrzędnych                                                            |
| `validation/schemas.ts`          | schematy ~ 80 Zod (pojedyncze źródło prawdy dla kontraktów API )                                             |
| `validation/helpers.ts`          | pomocnicy sprawdzania poprawności Zod (`validateBody` itp.)                                                  |
| `types/`                         | Wspólne typy TS                                                                                              |
| `contracts/`                     | Publiczne kontrakty API (konsumowane przez `files:` w `package.json`)                                        |
| `utils/circuitBreaker.ts`        | Wyłącznik automatyczny dostawcy (patrz `docs/architecture/RESILIENCE_GUIDE.md`)                              |
| `utils/apiAuth.ts`               | Walidacja klucza API, sprawdzanie zakresu                                                                    |
| `utils/fetchTimeout.ts`          | opakowania Timeout/abort do pobierania z góry                                                                |
| `utils/releaseNotes.ts`          | Zamknięty parser ogłoszeń v2/legacy, lokalizacja i zwolnienie ID                                             |

---

## `open-sse/` — Przestrzeń robocza silnika strumieniowego

Oddzielna przestrzeń robocza npm (`@omniroute/open-sse`). Obsługuje przetwarzanie żądań i wykonywanie operacji dostawców.

```
open-sse/
├── handlers/            # 16 plików (12 handlerów + 4 moduły pomocnicze): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search itd.
├── executors/           # 150 modułów wykonawczych (klasy rozszerzające BaseExecutor + moduły pomocnicze dla poszczególnych dostawców)
├── translator/          # Konwertery formatów (9 żądań, 9 odpowiedzi, 9 modułów pomocniczych)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ modułów usług (combo, accountFallback, autoCombo, reasoningCache, tryby niewykrywalne claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM itd.)
├── mcp-server/          # Serwer MCP (110 narzędzi, 3 transporty, 33 zakresy)
├── config/              # Rejestry dostawców/modeli, konfiguracja nagłówków, aliasy modeli
├── utils/               # Klient TLS, pobieranie/dyspozytor proxy, sieciowe moduły pomocnicze
├── index.ts             # Punkt wejścia przestrzeni roboczej
├── package.json         # Manifest przestrzeni roboczej
├── tsconfig.json        # Konfiguracja TS przestrzeni roboczej
└── types.d.ts           # Deklaracje typów przestrzeni roboczej
```

### `open-sse/mcp-server/`

| Ścieżka                     | Przeznaczenie                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `server.ts`                 | Cykl życia serwera MCP (transporty stdio + HTTP)                                          |
| `httpTransport.ts`          | Transporty HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                      |
| `audit.ts`                  | Rejestrowanie audytu w tabeli `mcp_tool_audit`                                            |
| `scopeEnforcement.ts`       | Walidacja zakresu dla każdego narzędzia                                                   |
| `runtimeHeartbeat.ts`       | Sygnał kondycji zapisywany w `DATA_DIR/runtime/mcp-heartbeat.json`                        |
| `descriptionCompressor.ts`  | Kompresowanie metadanych opisów narzędzi w celu oszczędzania kontekstu                    |
| `schemas/tools.ts`          | 36 bazowych definicji narzędzi + zakresy                                                  |
| `tools/advancedTools.ts`    | Implementacje zaawansowanych narzędzi                                                     |
| `tools/memoryTools.ts`      | 3 narzędzia pamięci (wyszukiwanie/dodawanie/czyszczenie)                                  |
| `tools/skillTools.ts`       | 4 narzędzia umiejętności (lista/włączanie/wykonywanie/wykonania)                          |
| `tools/compressionTools.ts` | 5 narzędzi do kompresji                                                                   |
| `README.md`                 | Wewnętrzny plik README serwera MCP (powiązany krzyżowo z `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Przestrzenie robocze

| Ścieżka                  | Przeznaczenie                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — dołączona migawka Keak CI UI Kit (`private`, `UNLICENSED`), używana bezpośrednio jako kod źródłowy (bez kompilacji). `UPSTREAM.md` przypina nadrzędny commit i dokumentuje autoryzację licencji; `PATCHES.md` zawiera listę lokalnych poprawek (brak); `src/` jest synchronizowany wyłącznie przez `scripts/dev/sync-ui-kit.sh` i chroniony przez `npm run check:ui-kit-snapshot`. Zobacz `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — opcjonalna usługa puli przeglądarek (czat oparty na CloakBrowser i Playwright)                                                                                                                                                                                                                                                                                                                                           |

---

## `electron/` — Wrapper aplikacji desktopowej

| Plik             | Przeznaczenie                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `main.js`        | Główny proces Electron (BrowserWindow, wbudowany serwer Next.js, zasobnik, automatyczne aktualizacje) |
| `preload.js`     | Most IPC (contextBridge → `window.omniroute`)                                                         |
| `package.json`   | Konfiguracja electron-builder + zależności Electron 41 i electron-builder 26.10                       |
| `assets/`        | Ikony aplikacji (Windows .ico, macOS .icns, Linux .png)                                               |
| `dist-electron/` | Dane wyjściowe kompilacji (ignorowane przez Git)                                                      |
| `types.d.ts`     | Deklaracje typów dla mostu procesu renderującego                                                      |
| `README.md`      | Wewnętrzny plik README dla Electron (zobacz także `docs/guides/ELECTRON_GUIDE.md`)                    |

---

## `bin/` — CLI

| Plik                                                                                                        | Przeznaczenie                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | Główny punkt wejścia CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` itd.  |
| `reset-password.mjs`                                                                                        | Samodzielne narzędzie CLI do resetowania hasła                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Interaktywny i nieinteraktywny kreator konfiguracji                                                                                  |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostyka stanu systemu (ponad 8 testów)                                                                                           |
| `cli/commands/providers.mjs`                                                                                | Wyświetlanie listy, testowanie i walidacja dostawców                                                                                 |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Moduły pomocnicze CLI                                                                                                                |
| `cli/tray/tray.ts`                                                                                          | Integracja z zasobnikiem systemowym (wieloplatformowa: NotifyIcon w Windows, systray2 w macOS/Linux)                                 |
| `cli/tray/tray.ps1`                                                                                         | Backend NotifyIcon w PowerShellu (Windows, bez nowych plików binarnych)                                                              |
| `cli/tray/autostart.ts`                                                                                     | Wieloplatformowe automatyczne uruchamianie (LaunchAgent / .desktop / rejestr)                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-etapowy łańcuch rozpoznawania sterownika SQLite (dołączony → środowisko uruchomieniowe → instalacja leniwa → node:sqlite → sql.js) |
| `cli/runtime/magicBytes.mjs`                                                                                | Walidacja bajtów magicznych plików binarnych (ELF / Mach-O / Mach-O fat / PE)                                                        |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — wstępnie rozpoznaje sterowniki po instalacji / podczas pierwszego uruchomienia                                  |
| `nodeRuntimeSupport.mjs`                                                                                    | Walidacja obsługiwanej wersji Node.js podczas instalacji                                                                             |

---

## `skills/` — publiczne umiejętności agentów

| Plik                         | Przeznaczenie                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestów umiejętności dla zewnętrznych agentów AI (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — skrypty kompilacji i kontroli

| Skrypt                              | Przeznaczenie                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Skrypt uruchamiający środowisko deweloperskie/aplikację z uzupełnianiem zmiennych środowiskowych           |
| `build-next-isolated.mjs`           | Samodzielna kompilacja (tryb standalone w Next.js 16)                                                      |
| `prepublish.ts`                     | Przygotowanie pakietu przed `npm pack`                                                                     |
| `postinstall.mjs`                   | Automatyczne tworzenie `.env` z `.env.example` podczas pierwszej instalacji                                |
| `sync-env.mjs`                      | Ponowna synchronizacja kluczy `.env` z `.env.example`                                                      |
| `check-cycles.mjs`                  | Wykrywanie zależności cyklicznych                                                                          |
| `check-route-validation.mjs`        | Sprawdzanie, czy wszystkie trasy API mają walidację Zod                                                    |
| `check-t11-any-budget.mjs`          | Egzekwowanie jawnego limitu użycia `any` dla każdego pliku                                                 |
| `check-docs-sync.mjs`               | Sprawdzanie synchronizacji wersji dokumentacji (istniejący mechanizm pre-commit)                           |
| **`check-env-doc-sync.mjs`**        | NOWOŚĆ: porównywanie zmiennych środowiskowych w kodzie, `.env.example` i `ENVIRONMENT.md`                  |
| **`check-docs-counts-sync.mjs`**    | NOWOŚĆ: sprawdzanie, czy liczby (wykonawców, strategii, OAuth i umiejętności A2A) są zgodne z dokumentacją |
| **`check-deprecated-versions.mjs`** | NOWOŚĆ: oznaczanie nieaktualnych wersji/dat w dokumentacji                                                 |
| `check-supported-node-runtime.ts`   | Sprawdzanie, czy bieżąca wersja Node jest obsługiwana                                                      |
| `check-pr-test-policy.mjs`          | Egzekwowanie reguły „testy są wymagane” w przypadku zmian w kodzie produkcyjnym                            |
| **`gen-provider-reference.ts`**     | NOWOŚĆ: automatyczne generowanie `docs/reference/PROVIDER_REFERENCE.md` z katalogu                         |
| `i18n/generate-multilang.mjs`       | Tłumaczenie ciągów interfejsu użytkownika i dokumentacji za pomocą Google Translate                        |
| `i18n_autotranslate.py`             | Potok tłumaczenia dokumentacji oparty na LLM                                                               |
| `validate_translation.py`           | Walidacja tłumaczeń dla poszczególnych ustawień regionalnych                                               |
| `check_translations.py`             | Sprawdzanie kluczy i18n po stronie kodu                                                                    |
| `run-playwright-tests.mjs`          | Skrypt uruchamiający testy E2E Playwright                                                                  |
| `run-protocol-clients-tests.mjs`    | Skrypt uruchamiający testy E2E MCP/A2A                                                                     |
| `run-ecosystem-tests.mjs`           | Testy ekosystemu (integracji dostawców)                                                                    |
| `test-report-summary.mjs`           | Generowanie podsumowania pokrycia testami w formacie Markdown                                              |
| `smoke-electron-packaged.mjs`       | Test dymny spakowanej kompilacji Electron                                                                  |
| `native-binary-compat.mjs`          | Sprawdzanie, czy zależności natywne (`better-sqlite3`) są zgodne z Node używanym przez Electron            |
| `validate-pack-artifact.ts`         | Walidacja wyniku pakowania npm                                                                             |
| `responses-ws-proxy.mjs`            | Most WebSocket dla interfejsu Codex Responses API                                                          |
| `v1-ws-bridge.mjs`                  | Most WebSocket dla punktu końcowego `/api/v1/ws`                                                           |
| `standalone-server-ws.mjs`          | Skrypt uruchamiający samodzielny serwer WS                                                                 |
| `system-info.mjs`                   | Wyświetlanie informacji o systemie/środowisku uruchomieniowym na potrzeby pomocy technicznej               |
| `healthcheck.mjs`                   | Jednorazowa kontrola stanu (używana przez Docker HEALTHCHECK)                                              |
| `uninstall.mjs`                     | Skrypt czystej dezinstalacji                                                                               |
| `dev/sync-ui-kit.sh`                | Kopiowanie `src/` zestawu CI UI Kit z przypiętego commitu do `packages/ui-kit/src`                         |
| `check/check-ui-kit-snapshot.mjs`   | Kontrola pre-commit: `packages/ui-kit/src` odpowiada przypiętemu commitowi w repozytorium nadrzędnym       |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — używane nazwy ikon, których `ICON_MAP` nie mapuje                                 |
| `dev/codemod-material-icons.mjs`    | Zamiana literałów elementów span Material Symbols na `<Icon>` (narzędzie migracyjne)                       |

---

## `docs/` — Dokumentacja publiczna (7 plików głównych + 17 podkatalogów)

### Przewodniki na najwyższym poziomie

| Doktor                      | Zamiar                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architektura wysokiego poziomu, mapa podsystemów, powierzchnia dashboardu                      |
| `CODEBASE_DOCUMENTATION.md` | Referencje inżynierskie: katalogi, moduły, konwencje                                           |
| `FEATURES.md`               | Matryca funkcji z najważniejszymi informacjami w wersji 3.8                                    |
| `USER_GUIDE.md`             | Instrukcja użytkownika końcowego (konfiguracja, modele, kombinacje, CLIs, audio itp.)          |
| `API_REFERENCE.md`          | Odniesienie do punktu końcowego API z modelem uwierzytelniania                                 |
| `openapi.yaml`              | specyfikacja OpenAPI 3.0 (121 ścieżek)                                                         |
| `SETUP_GUIDE.md`            | Metody instalacji (npm, npx, Docker, Electron, Termux, source)                                 |
| `ENVIRONMENT.md`            | Wszystkie env vars (udokumentowane ~ 800, ~ 3050 linii `.env.example`)                         |
| `TROUBLESHOOTING.md`        | Typowe błędy znane problemy + v3.8.0                                                           |
| `RELEASE_CHECKLIST.md`      | Pełny przepływ wersji (umiejętności, husky, konwencjonalne zatwierdzenia, wdrożenie)           |
| `COVERAGE_PLAN.md`          | Cele zasięgu i stan obecny                                                                     |
| `FREE_TIERS.md`             | Wybrani dostawcy darmowego poziomu (48 + za darmo + 11 OAuth)                                  |
| `CLI-TOOLS.md`              | Zewnętrzne integracje CLI + Wewnętrzne OmniRoute CLI                                           |
| `I18N.md`                   | Architektura i18n, dodanie języka, 67 lokalizacji                                              |
| `UNINSTALL.md`              | Wyczyść kroki dezinstalacji                                                                    |
| `PROVIDER_REFERENCE.md`     | **Wygenerowane automatycznie** katalog 377 dostawców (regen: `npm run gen:provider-reference`) |

### Głębokie nurkowanie w podsystemie

| Doktor                                       | Zamiar                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                              | serwer MCP : 110 narzędzi, 3 transporty, 33 zakresy, punkty końcowe REST         |
| `A2A-SERVER.md`                              | A2A v0.3: JSON-RPC, 6 umiejętności, pomocnicy REST, karta agenta                 |
| `AGENT_PROTOCOLS_GUIDE.md`                   | Ujednolicony przewodnik: A2A vs ACP vs agenci w chmurze                          |
| `CLOUD_AGENT.md`                             | Orkiestracja Codex Cloud / Devin / Jules                                         |
| `SKILLS.md`                                  | Framework umiejętności (wbudowany + marketplace + SkillsSH + sandbox)            |
| `RADAR.md`                                   | Nakładka katalogu dowolnego modelu radaru (`RADAR_ENABLED`, domyślnie wyłączona) |
| `MEMORY.md`                                  | System pamięci (SQLite FTS5 + Qdrant)                                            |
| `EVALS.md`                                   | Framework Eval (zestawy, przebiegi, rubryki)                                     |
| `GUARDRAILS.md`                              | masker PII, szybki wtrysk, mostek wizyjny                                        |
| `COMPLIANCE.md`                              | Dziennik audytu, przechowywanie, rezygnacja z noLog                              |
| `WEBHOOKS.md`                                | Dostarczanie webhooka podpisanego przez HMAC                                     |
| `REASONING_REPLAY.md`                        | Hybrydowa pamięć memory/SQLite dla `reasoning_content`                           |
| `AUTHZ_GUIDE.md`                             | Rurociąg autoryzacji (`classify` → `policies` → `enforce`)                       |
| `RESILIENCE_GUIDE.md`                        | Wyłącznik automatyczny + Cooldown + Blokada modelu                               |
| `docs/security/STEALTH_GUIDE.md` (tylko git) | TLS odcisk palca (JA3/JA4), kod CCHClaude, certyfikat MITM                       |
| `AUTO-COMBO.md`                              | Silnik Auto Combo (punktacja 16 czynników, 6 pakietów trybów, wirtualna fabryka) |

### Kompresja

| Doktor                          | Zamiar                                                   |
| ------------------------------- | -------------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Przegląd planów działania dotyczących trybów kompresji + |
| `COMPRESSION_ENGINES.md`        | Silniki Caveman + RTK, umowa rejestracyjna               |
| `COMPRESSION_RULES_FORMAT.md`   | Schemat pakietu reguł jaskiniowca JSON                   |
| `COMPRESSION_LANGUAGE_PACKS.md` | Zasoby pakietu reguł dla poszczególnych języków          |
| `RTK_COMPRESSION.md`            | deklaratywny potok RTK (56 filtrów)                      |

### Zastosowanie

| Doktor                       | Zamiar                                                                     |
| ---------------------------- | -------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | kompilacja Docker, profile (base/cli/host/cliproxyapi), wózek boczny Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Ogólne wdrożenie VM/VPS (Ubuntu/Debian + nginx + systemd)                  |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Wdrożenie Fly.io (obecnie tylko w języku chińskim)                         |
| `TERMUX_GUIDE.md`            | Android bezgłowy przez Termux                                              |
| `PWA_GUIDE.md`               | Progressive Web App zainstaluj pracownika serwisu +                        |
| `ELECTRON_GUIDE.md`          | Kompilacja aplikacji komputerowej + znak + dystrybucja                     |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Lejek                                      |
| `PROXY_GUIDE.md`             | 4-poziomowy rynek wychodzących proxy + 1proxy                              |

### Podkatalogi

| Podkatalog            | Zamiar                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Zlokalizowane tłumaczenia dokumentów (41 lokalizacji)                                                                                                                                                         |
| `docs/screenshots/`   | Zasoby graficzne dla przewodników                                                                                                                                                                             |
| `_tasks/superpowers/` | Plans/specs z supermocy (`writing-plans`/`brainstorming`) + research — izolowane, oddzielnie wersjonowane repozytorium, gitignorowane przez główne drzewo. Zobacz CLAUDE.md → „Artefakty planowania i badań”. |

---

## `tests/` — Zestawy testów

| Podkatalog                           | Typ                                                  | Narzędzie uruchamiające                          |
| ------------------------------------ | ---------------------------------------------------- | ------------------------------------------------ |
| `tests/unit/`                        | Testy jednostkowe (~4 800 plików, najszybsze)        | Natywne narzędzie testowe Node                   |
| `tests/integration/`                 | Wielomodułowe testy integracyjne + testy bazy danych | Natywne narzędzie testowe Node (współbieżność 1) |
| `tests/e2e/`                         | Testy E2E interfejsu użytkownika i przepływów pracy  | Playwright                                       |
| `tests/e2e/protocol-clients.test.ts` | Testy E2E MCP + A2A z rzeczywistymi klientami        | Niestandardowi klienci protokołów                |
| `tests/e2e/ecosystem.test.ts`        | Integracja z dostawcami (z dostępem do sieci)        | Natywne narzędzie testowe Node                   |

---

## `public/` — Zasoby statyczne

| Ścieżka                    | Przeznaczenie                                                       |
| -------------------------- | ------------------------------------------------------------------- |
| `public/` (katalog główny) | Favikony, robots.txt, manifest, service worker, obrazy marketingowe |
| `public/providers/`        | Logo dostawców w formacie PNG/SVG (używane w panelu)                |

---

## `config/` — Konfiguracje statyczne i stan bramek jakości

Dostarczane szablony konfiguracji oraz zatwierdzone wartości bazowe bramek jakości
(przeniesione tutaj z katalogu głównego repozytorium w wersji v3.8.26, aby zachować jego przejrzystość).

| Ścieżka                                       | Przeznaczenie                                                                                      |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista ustawień regionalnych i metadane (kanoniczne źródło liczby 42 ustawień regionalnych)         |
| `config/i18n-schema.json`                     | Schemat JSON służący do walidacji pliku `i18n.json`                                                |
| `config/payloadRules.json`                    | Reguły oczyszczania ładunków z systemów nadrzędnych                                                |
| `config/quality/quality-baseline.json`        | Wielometryczna wartość bazowa mechanizmu zapadkowego (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Zamrożona wartość bazowa złożoności ESLint (`check-complexity.mjs`)                                |
| `config/quality/duplication-baseline.json`    | Zamrożona wartość bazowa duplikacji jscpd (`check-duplication.mjs`)                                |
| `config/quality/file-size-baseline.json`      | Zamrożona wartość bazowa rozmiaru poszczególnych plików (`check-file-size.mjs`)                    |
| `config/quality/test-discovery-baseline.json` | Zamrożona wartość bazowa osieroconych testów (`check-test-discovery.mjs`)                          |
| `config/quality/dependency-allowlist.json`    | Lista dozwolonych zatwierdzonych zależności (`check-deps.mjs`)                                     |
| `config/quality/.license-allowlist.json`      | Lista dozwolonych licencji SPDX (`check-licenses.mjs`)                                             |
| `config/quality/quality-metrics.json`         | Tymczasowe zebrane metryki (generowane przez `collect-metrics.mjs`; **ignorowane przez git**)      |

---

## `.github/` — Integracja z GitHubem

| Ścieżka                            | Przeznaczenie                                                         |
| ---------------------------------- | --------------------------------------------------------------------- |
| `.github/workflows/`               | Przepływy pracy CI/CD GitHub Actions (lint, testy, pokrycie, wydanie) |
| `.github/ISSUE_TEMPLATE/`          | Szablony zgłoszeń błędów i propozycji funkcji                         |
| `.github/pull_request_template.md` | Szablon PR                                                            |
| `.github/dependabot.yml`           | Konfiguracja aktualizacji zależności                                  |

---

## `.husky/` — Hooki Git

| Plik         | Przeznaczenie                                                           |
| ------------ | ----------------------------------------------------------------------- |
| `pre-commit` | Uruchamia `lint-staged + check-docs-sync + check:any-budget:t11`        |
| `pre-push`   | Obecnie wyłączony (zakomentowany). Uruchom ręcznie `npm run test:unit`. |
| `_/`         | Wewnętrzne pliki Husky                                                  |

---

## `.claude/` — Polecenia ukośnikowe Claude Code

| Plik                                                | Przeznaczenie                                                    |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — zwiększenie wersji + automatyczny changelog |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — pełny proces wydania                    |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Wdrożenie na VPS                                                 |
| `commands/capture-release-evidences-cc.md`          | Nagrywanie nowych funkcji w przeglądarce w formacie WebP         |
| `commands/review-{prs,discussions}-cc.md`           | Klasyfikowanie PR-ów i dyskusji na GitHubie                      |
| `commands/{review-issues,implement-features}-cc.md` | Przepływy pracy dotyczące zgłoszeń                               |
| `settings.local.json`                               | Ustawienia Claude Code właściwe dla projektu                     |

---

## `.agents/` — Ogólne przepływy pracy agentów (Codex / Cursor / itd.)

| Ścieżka                  | Przeznaczenie                                                          |
| ------------------------ | ---------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definicji przepływów pracy (kopia `.claude/commands/`)              |
| `skills/<name>/SKILL.md` | 9 definicji umiejętności z uwagami dotyczącymi wykonywania przez Codex |

> **Uwaga:** Przepływy pracy i polecenia są obecnie identyczne bajt po bajcie. Jeśli `.agents/` ma być przeznaczony dla innego środowiska wykonawczego agenta (Codex), warianty powinny znacząco się różnić.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Poza drzewem projektu

Te katalogi z prefiksem podkreślenia zawierają treści niedostarczane w pakiecie:

- **`_ideia/`** — notatki projektowe (kategorie defer / notfit / viable)
- **`_mono_repo/`** — historyczne podprojekty (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klony powiązanych projektów OSS przeznaczone tylko do odczytu (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api itd.), służące jako materiały porównawcze podczas programowania
- **`_tasks/`** — nieformalne pliki do śledzenia zadań dla poszczególnych wydań

Nie są uwzględniane w wynikach `npm pack`. Zobacz `.npmignore`.

---

## Wygenerowane / ignorowane przez Git

| Ścieżka                | Przeznaczenie                            |
| ---------------------- | ---------------------------------------- |
| `node_modules/`        | Zależności npm                           |
| `.next/`               | Wynik kompilacji Next.js                 |
| `coverage/`            | Raporty pokrycia c8                      |
| `logs/`                | Logi środowiska wykonawczego             |
| `package/`             | Obszar przejściowy npm pack              |
| `.playwright-mcp/`     | Artefakty testowe Playwright MCP         |
| `.issues/`             | Lokalna pamięć podręczna zgłoszeń        |
| `tsconfig.tsbuildinfo` | Przyrostowa pamięć podręczna TypeScriptu |

---

## Wskazówki dotyczące nawigacji

- **Jesteś nowym współtwórcą?** Przeczytaj `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Dodajesz dostawcę?** Postępuj zgodnie z `docs/architecture/ARCHITECTURE.md § Adding a New Provider` i porównaj z `docs/reference/PROVIDER_REFERENCE.md`.
- **Dodajesz trasę?** Zobacz `docs/architecture/ARCHITECTURE.md § Adding a New API Route` oraz `src/shared/validation/schemas.ts`.
- **Dodajesz narzędzie MCP?** Zobacz `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Dodajesz umiejętność A2A?** Zobacz `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Uruchamiasz lokalnie?** Zobacz `docs/guides/SETUP_GUIDE.md`.
- **Wdrażasz?** Zobacz `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Przygotowujesz wydanie?** Zobacz `docs/ops/RELEASE_CHECKLIST.md` (oraz umiejętność Claude Code `/generate-release-cc`).
