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
├── app/                 # App Router (strony + trasy API + strony statusu + strona docelowa)
├── lib/                 # Główne biblioteki / moduły domenowe (80 podkatalogów + około 70 plików najwyższego poziomu)
├── domain/              # Czysta logika domenowa (silnik zasad, mechanizm rezerwowy, koszt, blokada, comboResolver, ocena)
├── server/              # Moduły wyłącznie serwerowe (potok autoryzacji, cors, middleware uwierzytelniania) — nie można ich importować po stronie klienta
├── shared/              # Elementy współdzielone między serwerem a klientem, gdy jest to bezpieczne (stałe, typy, walidacja, kontrakty, narzędzia)
├── i18n/                # Konfiguracja next-intl + pliki JSON z komunikatami dla poszczególnych ustawień regionalnych (67 ustawień regionalnych)
├── middleware/          # Middleware Next.js (wzbogacanie żądań, wykrywanie ustawień regionalnych)
├── mitm/                # Rdzeń proxy MITM: generowanie/instalowanie certyfikatów, procedury obsługi, cele, inspektor, maski, przekazywanie bez zmian
│   ├── handlers/        # 9 klas procedur obsługi agentów IDE rozszerzających MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Warstwa przechwytywania ruchu: bufor (pierścieniowy w pamięci), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Kod integracyjny adaptera modelu (starsza warstwa zgodności)
├── scripts/             # Skrypty konserwacyjne przechowywane w drzewie źródeł (np. backfillAggregation)
├── sse/                 # Starsze procedury obsługi/usługi SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Starszy magazyn w pamięci (stopniowo zastępowany przez src/lib/db)
├── types/               # Współdzielone pliki typów TS
├── instrumentation.ts   # Hak telemetrii Next.js (przeglądarka + środowisko edge)
├── instrumentation-node.ts  # Instrumentacja wyłącznie dla Node
└── proxy.ts             # Wejściowa warstwa zgodności proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Ścieżka                                                                      | Przeznaczenie                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Publiczny interfejs API zgodny z OpenAI (~25 podtras: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers itd.)                                                                                                                       |
| `app/api/v1beta/`                                                            | Punkty końcowe API w stylu Gemini                                                                                                                                                                                                                                                                                           |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — przepisywanie promptów przez LLM), `presets/` (GET lista / POST tworzenie), `presets/[id]/` (GET / PUT / DELETE) — zobacz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                         |
| `app/api/` (poza v1)                                                         | Trasy zarządzania/administracyjne (~60 katalogów: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools itd.)                                                                                                                                      |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 tras (sterowanie serwerem, stan/DNS/mapowania agentów, obejścia, certyfikat, nadrzędny urząd certyfikacji). LOCAL_ONLY + SPAWN_CAPABLE. Zobacz `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                               |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API Traffic Inspector — ponad 16 tras (żądania, sesje, hosty, tryby przechwytywania, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Zobacz `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                  |
| `app/a2a/`                                                                   | Punkt wejścia A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                |
| `app/.well-known/agent.json/`                                                | Karta agenta A2A (wykrywanie)                                                                                                                                                                                                                                                                                               |
| `app/(dashboard)/dashboard/`                                                 | Strony interfejsu panelu (ponad 50 sekcji, ~118 plików page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity itd.)                                                                                                                                   |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interfejs Search Tools Studio (3 karty: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — zobacz `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                      |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (szkielet z 3 kartami), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Strona panelu AgentBridge — karta serwera, 9 kart agentów, kreator konfiguracji, mapowanie modeli, lista obejść. i18n PT-BR + EN. Zobacz `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                  |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Strona panelu Traffic Inspector — dzielony widok DevTools, 7 kart szczegółów, 4 przełączniki trybów przechwytywania, rejestrator sesji, kolorowanie kontekstu. i18n PT-BR + EN. Zobacz `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                              |
| `app/(dashboard)/dashboard/activity/`                                        | Strona kanału aktywności (Grupa B): `page.tsx` (serwer) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — zobacz `docs/architecture/MONITORING_SECTIONS.md`                                                                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Strona współdzielenia limitów (Grupa B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Strona konfiguracji planu dostawcy (Grupa B): `page.tsx` + `ProviderPlanConfigClient.tsx` — nadpisywanie wymiarów limitów dla poszczególnych połączeń                                                                                                                                                                       |
| `app/docs/`                                                                  | Osadzona przeglądarka dokumentacji (renderuje `docs/*.md`)                                                                                                                                                                                                                                                                  |
| `app/landing/`                                                               | Marketingowa strona docelowa                                                                                                                                                                                                                                                                                                |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Strony związane z uwierzytelnianiem                                                                                                                                                                                                                                                                                         |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Strony błędów HTTP                                                                                                                                                                                                                                                                                                          |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Strony statyczne i strony stanu                                                                                                                                                                                                                                                                                             |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Główny układ, strona główna, manifest PWA, globalny CSS                                                                                                                                                                                                                                                                     |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Granice błędów                                                                                                                                                                                                                                                                                                              |

### `src/lib/` — Biblioteki podstawowe (~50 modułów)

| Moduł                                        | Przeznaczenie                                                                                                                                                                                                                                                                                                                      |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                       | Menedżer zadań protokołu A2A, umiejętności (5), strumieniowanie                                                                                                                                                                                                                                                                    |
| `acp/`                                       | Rejestr agentów CLI (lokalne wykrywanie CLI — zobacz `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                   |
| `api/`                                       | Współdzielone funkcje pomocnicze API (`requireManagementAuth`, walidacja)                                                                                                                                                                                                                                                          |
| `auth/`                                      | Sesja, haszowanie haseł, walidacja tokenów                                                                                                                                                                                                                                                                                         |
| `batches/`                                   | Procedury obsługi interfejsu OpenAI Batches API                                                                                                                                                                                                                                                                                    |
| `catalog/`                                   | Walidacja katalogu dostawców za pomocą Zod + ustalanie możliwości                                                                                                                                                                                                                                                                  |
| `cloudAgent/`                                | Agenci chmurowi (Codex Cloud, Devin, Jules) — zobacz `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                              |
| `combos/`                                    | Ustalanie kombinacji + funkcje pomocnicze do zmiany kolejności                                                                                                                                                                                                                                                                     |
| `audit/`                                     | Funkcje pomocnicze kanału aktywności: `highLevelActions.ts` (lista dozwolonych elementów + `isHighLevelAction()`), `activityIcons.ts` (mapowanie działania → ikona/czasownik), `timeline.ts` (groupByDay/relativeTime) — zobacz `docs/architecture/MONITORING_SECTIONS.md`                                                         |
| `compliance/`                                | Dziennik audytu + audyt dostawców — zobacz `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                           |
| `compression/`                               | Warstwa integracyjna silnika kompresji (silniki znajdują się w `open-sse/services/compression/`)                                                                                                                                                                                                                                   |
| `config/`                                    | Funkcje pomocnicze konfiguracji środowiska uruchomieniowego                                                                                                                                                                                                                                                                        |
| `db/`                                        | Ponad 120 domenowych modułów bazy danych + 168 migracji (w przypadku SQLite zawsze korzystaj z tej warstwy)                                                                                                                                                                                                                        |
| `quota/`                                     | Silnik współdzielenia limitów: `dimensions.ts` (typy/Zod), `types.ts` (interfejs QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — zobacz `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                     | Klient katalogu bezpłatnych modeli Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — zobacz `docs/frameworks/RADAR.md`                                                                                                                                           |
| `display/`                                   | Funkcje pomocnicze formatowania interfejsu użytkownika (koszt, opóźnienie itp.)                                                                                                                                                                                                                                                    |
| `embeddings/`                                | Funkcje pomocnicze usługi embeddingów                                                                                                                                                                                                                                                                                              |
| `env/`                                       | Parsowanie i walidacja zmiennych środowiskowych                                                                                                                                                                                                                                                                                    |
| `evals/`                                     | Framework ewaluacji (zestawy, runner, środowisko uruchomieniowe) — zobacz `docs/frameworks/EVALS.md`                                                                                                                                                                                                                               |
| `guardrails/`                                | Maskowanie danych osobowych, ochrona przed wstrzykiwaniem promptów, most dla przetwarzania obrazu — zobacz `docs/security/GUARDRAILS.md`                                                                                                                                                                                           |
| `jobs/`                                      | Zadania w tle (podobne do crona)                                                                                                                                                                                                                                                                                                   |
| `memory/`                                    | Pamięć konwersacyjna (hybrydowe RRF SQLite FTS5 + sqlite-vec oraz Qdrant jako warstwa 2) — zobacz `docs/frameworks/MEMORY.md`                                                                                                                                                                                                      |
| `memory/embedding/`                          | Wieloźródłowa warstwa embeddingów: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                                 |
| `memory/vectorStore.ts`                      | Wrapper sqlite-vec v0.1.9 — pełne przeszukiwanie KNN + hybrydowe RRF (FTS5 + wektor, k=60). Inicjalizowany leniwie; działa w trybie ograniczonym, gdy sqlite-vec jest niedostępny. (plan 21)                                                                                                                                       |
| `memory/reindex.ts`                          | `runReindexBatch()` — przetwarza w tle wpisy pamięci z `needs_reindex=1`; wywoływane przez `POST /api/memory/reindex` oraz ścieżkę leniwego uzupełniania. (plan 21)                                                                                                                                                                |
| `monitoring/`                                | Kontrole kondycji, emitowanie metryk                                                                                                                                                                                                                                                                                               |
| `oauth/`                                     | Przepływy OAuth/importu dla 22 modułów dostawców (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                       |
| `plugins/`                                   | Rejestr wtyczek                                                                                                                                                                                                                                                                                                                    |
| `promptCache/`                               | Punkty podziału pamięci podręcznej promptów w stylu Anthropic                                                                                                                                                                                                                                                                      |
| `skills/`                                    | Framework umiejętności (wbudowane + marketplace + SkillsSH) — zobacz `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                   |
| `playground/`                                | Współdzielone narzędzia pomocnicze Playground Studio: `codeExport.ts` (generator curl/Python/TS), `promptImprover.ts` (konstruktor metapromptów), `streamMetrics.ts` (czyste metryki TTFT/TPS), `types.ts` (tabela cen) — zobacz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                            |
| `webhookDispatcher.ts`                       | Dostarczanie webhooków z użyciem HMAC — zobacz `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                       |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`     | Menedżery tuneli — zobacz `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                              |
| `cloudSync.ts`, `initCloudSync.ts`           | Opcjonalna synchronizacja stanu z chmurą                                                                                                                                                                                                                                                                                           |
| `localDb.ts`                                 | Moduł zbiorczy ponownie eksportujący moduły bazy danych (bez logiki — tylko ponowne eksporty)                                                                                                                                                                                                                                      |
| `cacheLayer.ts`, `idempotencyLayer.ts`       | Buforowanie żądań + idempotentność                                                                                                                                                                                                                                                                                                 |
| (~30 dodatkowych plików najwyższego poziomu) | Specjalistyczne narzędzia pomocnicze (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Baza danych (147 modułów + 208 migracji)

| Podkatalog                | Przeznaczenie                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` z rejestrowaniem WAL                                                                                                                                   |
| `db/migrations/`          | Wersjonowane pliki SQL (idempotentne, transakcyjne). `073_memory_vec.sql` dodaje kolumny `memory_vec_meta` + `needs_reindex` (plan 21).                                            |
| `db/playgroundPresets.ts` | Moduł CRUD dla ustawień wstępnych Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | Operacje CRUD dla `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (plan 21)                |
| `db/<domain>.ts`          | Jeden moduł na domenę: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache itd.          |

### `src/domain/`

| Moduł                  | Przeznaczenie                                              |
| ---------------------- | ---------------------------------------------------------- |
| `policy.ts`            | Silnik zasad                                               |
| `fallbackPolicy.ts`    | Drzewo decyzyjne mechanizmu rezerwowego                    |
| `costRules.ts`         | Reguły obliczania kosztów                                  |
| `lockoutPolicy.ts`     | Zasady blokowania modelu/połączenia                        |
| `tagRouter.ts`         | Routing oparty na tagach                                   |
| `comboResolver.ts`     | Rozwiązywanie kombinacji (używane przez silnik kombinacji) |
| `modelAvailability.ts` | Sprawdzanie dostępności poszczególnych modeli              |
| `assessment/`          | Ocena modelu (faza 1 dokumentu RFC-AUTO-ASSESSMENT)        |

### `src/server/`

| Moduł    | Przeznaczenie                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Potok autoryzacji: `classify` → `policies` → `enforce` — zobacz `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfiguracja CORS                                                                                  |
| `auth/`  | Oprogramowanie pośredniczące sesji                                                                 |

### `src/shared/`

| Moduł                            | Przeznaczenie                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `components/`                    | API komponentów panelu: adaptery dla `packages/ui-kit` — zobacz `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nazwy ikon używane przez ekrany → komponenty Lucide (`<Icon>`)                           |
| `constants/providers.ts`         | **376 dostawców** z walidacją Zod (źródło prawdy)                                                    |
| `constants/cliTools.ts`          | Rejestr zewnętrznych narzędzi CLI                                                                    |
| `constants/routingStrategies.ts` | **20 strategii routingu** z priorytetami                                                             |
| `constants/publicApiRoutes.ts`   | Trasy wymagające uwierzytelniania Bearer (w odróżnieniu od uwierzytelniania zarządzającego)          |
| `constants/upstreamHeaders.ts`   | Lista niedozwolonych nagłówków dla żądań do usług nadrzędnych                                        |
| `validation/schemas.ts`          | Około 80 schematów Zod (pojedyncze źródło prawdy dla kontraktów API)                                 |
| `validation/helpers.ts`          | Funkcje pomocnicze walidacji Zod (`validateBody` itd.)                                               |
| `types/`                         | Współdzielone typy TS                                                                                |
| `contracts/`                     | Publiczne kontrakty API (używane przez `files:` w `package.json`)                                    |
| `utils/circuitBreaker.ts`        | Wyłącznik automatyczny dostawcy (zobacz `docs/architecture/RESILIENCE_GUIDE.md`)                     |
| `utils/apiAuth.ts`               | Walidacja klucza API, sprawdzanie zakresu                                                            |
| `utils/fetchTimeout.ts`          | Mechanizmy obsługi limitu czasu i przerywania dla żądań `fetch` do usług nadrzędnych                 |
| `utils/releaseNotes.ts`          | Parser zamkniętych ogłoszeń v2/starszego typu, lokalizacja i odrzucanie według identyfikatora        |

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

### Przewodniki najwyższego poziomu

| Dokument                    | Przeznaczenie                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architektura wysokiego poziomu, mapa podsystemów, obszar pulpitu nawigacyjnego                     |
| `CODEBASE_DOCUMENTATION.md` | Dokumentacja inżynieryjna: katalogi, moduły, konwencje                                             |
| `FEATURES.md`               | Macierz funkcji z najważniejszymi zmianami w v3.8                                                  |
| `USER_GUIDE.md`             | Podręcznik użytkownika końcowego (konfiguracja, modele, combo, CLI, audio itp.)                    |
| `API_REFERENCE.md`          | Dokumentacja punktów końcowych API z modelem uwierzytelniania                                      |
| `openapi.yaml`              | Specyfikacja OpenAPI 3.0 (121 ścieżek)                                                             |
| `SETUP_GUIDE.md`            | Metody instalacji (npm, npx, Docker, Electron, Termux, ze źródeł)                                  |
| `ENVIRONMENT.md`            | Wszystkie zmienne środowiskowe (~800 udokumentowanych, ~3050 linii `.env.example`)                 |
| `TROUBLESHOOTING.md`        | Typowe błędy + znane problemy w v3.8.0                                                             |
| `RELEASE_CHECKLIST.md`      | Pełny proces wydania (skills, husky, conventional commits, wdrożenie)                              |
| `COVERAGE_PLAN.md`          | Cele pokrycia i stan bieżący                                                                       |
| `FREE_TIERS.md`             | Wyselekcjonowani dostawcy darmowych planów (48+ darmowych + 11 OAuth)                              |
| `CLI-TOOLS.md`              | Integracje zewnętrznych CLI + wewnętrzne CLI OmniRoute                                             |
| `I18N.md`                   | Architektura i18n, dodawanie języka, 67 wersji językowych                                          |
| `UNINSTALL.md`              | Kroki czystej dezinstalacji                                                                        |
| `PROVIDER_REFERENCE.md`     | **Generowany automatycznie** katalog 376 dostawców (regeneracja: `npm run gen:provider-reference`) |

### Szczegółowe opisy podsystemów

| Dokument                                     | Przeznaczenie                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                              | Serwer MCP: 110 narzędzi, 3 transporty, 33 zakresy, punkty końcowe REST           |
| `A2A-SERVER.md`                              | A2A v0.3: JSON-RPC, 6 skills, funkcje pomocnicze REST, karta agenta               |
| `AGENT_PROTOCOLS_GUIDE.md`                   | Ujednolicony przewodnik: A2A vs ACP vs Cloud Agents                               |
| `CLOUD_AGENT.md`                             | Orkiestracja Codex Cloud / Devin / Jules                                          |
| `SKILLS.md`                                  | Framework Skills (wbudowane + marketplace + SkillsSH + sandbox)                   |
| `RADAR.md`                                   | Nakładka katalogu darmowych modeli Radar (`RADAR_ENABLED`, domyślnie wyłączona)   |
| `MEMORY.md`                                  | System pamięci (SQLite FTS5 + Qdrant)                                             |
| `EVALS.md`                                   | Framework ewaluacji (zestawy, przebiegi, kryteria oceny)                          |
| `GUARDRAILS.md`                              | Maskowanie PII, prompt injection, mostek wizyjny                                  |
| `COMPLIANCE.md`                              | Dziennik audytu, retencja, rezygnacja z noLog (opt-out)                           |
| `WEBHOOKS.md`                                | Dostarczanie webhooków podpisanych HMAC                                           |
| `REASONING_REPLAY.md`                        | Hybrydowa pamięć podręczna memory/SQLite dla `reasoning_content`                  |
| `AUTHZ_GUIDE.md`                             | Potok autoryzacji (`classify` → `policies` → `enforce`)                           |
| `RESILIENCE_GUIDE.md`                        | Circuit breaker + cooldown + blokada modelu                                       |
| `docs/security/STEALTH_GUIDE.md` (tylko git) | TLS fingerprinting (JA3/JA4), Claude Code CCH, certyfikat MITM                    |
| `AUTO-COMBO.md`                              | Silnik Auto Combo (punktacja 16-czynnikowa, 6 pakietów trybów, wirtualna fabryka) |

### Kompresja

| Dokument                        | Przeznaczenie                            |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Przegląd trybów kompresji + plan rozwoju |
| `COMPRESSION_ENGINES.md`        | Silniki Caveman + RTK, kontrakt rejestru |
| `COMPRESSION_RULES_FORMAT.md`   | Schemat JSON pakietu reguł Caveman       |
| `COMPRESSION_LANGUAGE_PACKS.md` | Wykaz pakietów reguł według języka       |
| `RTK_COMPRESSION.md`            | Deklaratywny potok RTK (56 filtrów)      |

### Wdrażanie

| Dokument                     | Przeznaczenie                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Budowa obrazów Docker, profile (base/cli/host/cliproxyapi), kontener pomocniczy Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Ogólne wdrożenie na VM/VPS (Ubuntu/Debian + nginx + systemd)                          |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Wdrożenie na Fly.io (obecnie tylko po chińsku)                                        |
| `TERMUX_GUIDE.md`            | Praca headless na Androidzie przez Termux                                             |
| `PWA_GUIDE.md`               | Instalacja Progressive Web App + service worker                                       |
| `ELECTRON_GUIDE.md`          | Budowa aplikacji desktopowej + podpisywanie + dystrybucja                             |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                                |
| `PROXY_GUIDE.md`             | 4-poziomowe proxy wychodzące + marketplace 1proxy                                     |

### Podkatalogi

| Podkatalog            | Przeznaczenie                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Zlokalizowane tłumaczenia dokumentacji (41 wersji językowych)                                                                                                                                                                      |
| `docs/screenshots/`   | Zasoby graficzne do przewodników                                                                                                                                                                                                   |
| `_tasks/superpowers/` | Plany/specyfikacje z superpowers (`writing-plans`/`brainstorming`) + materiały badawcze — izolowane, osobno wersjonowane repozytorium, ignorowane przez git w głównym drzewie. Zobacz CLAUDE.md → „Planning & Research Artifacts”. |

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
