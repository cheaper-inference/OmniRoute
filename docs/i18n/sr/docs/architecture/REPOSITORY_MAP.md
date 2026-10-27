# Repository Map (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Једноредни опис сваког директоријума и датотеке у корену.**
> Последње ажурирање: 2026-06-28 — OmniRoute v3.8.40
>
> Користите ову мапу за брзо кретање кроз базу кода. За детаљнији увид пратите везе ка наменској документацији.

## Стабло највишег нивоа

```
OmniRoute/
├── src/                  # Next.js 16 апликација (кориснички интерфејс + API руте + библиотеке + домен + сервер)
├── open-sse/             # Радни простор механизма за стримовање (обрађивачи, извршиоци, преводилац, MCP сервер)
├── packages/            # npm радни простори: ui-kit (локално укључен Keak CI UI Kit) и browser-pool
├── electron/             # Омотач за десктоп апликацију (Electron 41 + electron-builder 26.10)
├── bin/                  # Улазна тачка CLI-ја и обрађивачи команди
├── scripts/              # Скрипте за изградњу, проверу, синхронизацију и једнократне задатке
├── docs/                 # Јавна документација (овде се налазите)
├── tests/                # Сви скупови тестова (јединични, интеграциони, e2e, клијенти протокола)
├── public/               # Статички ресурси за Next.js, PWA манифест, сервисни радник, иконе
├── config/               # Статичка конфигурација + стање контроле квалитета (i18n, payloadRules, quality/)
├── images/               # Сликовни ресурси за маркетинг / README
├── @omniroute/           # Пратећи пакети који се могу објавити (opencode-plugin, opencode-provider)
├── skills/               # Пакети вештина за CLI/агенте (cli-* + omni-* + config-codex-cli)
├── examples/             # Пример додатака + почетни пројекат omniroute-cmd-hello
├── contrib/              # Доприноси заједнице (podman/)
├── .source/              # Конфигурација извора за Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Токови рада за GitHub Actions + шаблони проблема + PR шаблон
├── .husky/               # Git куке (pre-commit, pre-push)
├── .claude/              # Команде са косом цртом за Claude Code (ограничене на пројекат)
├── .agents/              # Токови рада и вештине за Codex / генеричке агенте (копија .claude/)
├── .vscode/              # Подешавања радног простора за VS Code
├── _ideia/               # Белешке за планирање (неформалне; не испоручују се)
├── _mono_repo/           # Историјски потпројекти (cloud, site, vscode-extension)
├── _references/          # Референтни клонови повезаних OSS пројеката, само за читање
├── _tasks/               # Датотеке за праћење задатака по издању (неформалне)
├── .build/ .worktrees/ dist/   # Привремене датотеке локалне изградње / git-worktree-а / излаза изградње (игнорише их git)
├── .issues/              # Локални кеш проблема (игнорише га git)
├── .playwright-mcp/      # Артефакти Playwright MCP тестова
├── coverage/             # Излаз c8 покривености (игнорише га git)
├── logs/                 # Дневници извршавања (игнорише их git)
├── node_modules/         # Зависности (игнорише их git)
├── package/              # Привремена област за npm pack (артефакт изградње)
├── .next/                # Излаз Next.js изградње (игнорише га git)
└── (датотеке у корену — погледајте испод)
```

---

## Датотеке у корену

| Датотека                                    | Намена                                                                                                               |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Маркетиншка одредишна страница + брзи почетак + матрица функција (погледајте и `llm.txt`)                            |
| **CHANGELOG.md**                            | Дневник измена по издању (аутоматски генерисан вештином `/version-bump-cc`)                                          |
| **LICENSE**                                 | Текст MIT лиценце                                                                                                    |
| **CLAUDE.md**                               | Правила пројекта за Claude Code агенте (строга правила, конвенције, сценарији)                                       |
| **AGENTS.md**                               | Исто као CLAUDE.md, али за AI агенте који нису Claude (Codex, Cursor итд.)                                           |
| **GEMINI.md**                               | Сажета правила за агенте засноване на Gemini-ју (подскуп документа CLAUDE.md)                                        |
| **CONTRIBUTING.md**                         | Водич за сараднике: подешавање, конвенционални комитови, тестирање, ток PR-а                                         |
| **SECURITY.md**                             | Политика пријављивања рањивости, подржане верзије, модел претњи                                                      |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — очекивања у погледу понашања у заједници                                                      |
| **llm.txt**                                 | Одредишна страница у обичном тексту, оптимизована за LLM пописиваче (SEO за AI асистенте)                            |
| **package.json**                            | npm манифест, скрипте, зависности, механизми, c8 праг покривености                                                   |
| **package-lock.json**                       | Закључано стабло зависности                                                                                          |
| **tsconfig.json**                           | Коренска TypeScript конфигурација                                                                                    |
| **tsconfig.typecheck-core.json**            | Конфигурација провере типова за језгро у `src/`                                                                      |
| **tsconfig.typecheck-noimplicit-core.json** | Строга (`noImplicitAny`) провера типова                                                                              |
| **tsconfig.tsbuildinfo**                    | Кеш инкременталне TS изградње (игнорише га git)                                                                      |
| **next.config.mjs**                         | Конфигурација изградње за Next.js 16 (самостални излаз)                                                              |
| **next-env.d.ts**                           | Аутоматски генерисани Next.js типови окружења                                                                        |
| **eslint.config.mjs**                       | ESLint равна конфигурација (правила по областима пројекта)                                                           |
| **prettier.config.mjs**                     | Prettier правила форматирања                                                                                         |
| **postcss.config.mjs**                      | PostCSS конфигурација за Tailwind/CSS ток обраде                                                                     |
| **playwright.config.ts**                    | Конфигурација Playwright E2E тестова                                                                                 |
| **vitest.config.ts**                        | Vitest конфигурација (подразумевани пакет тестова)                                                                   |
| **vitest.mcp.config.ts**                    | Vitest конфигурација за MCP сервер / autoCombo / пакете тестова кеша                                                 |
| **sonar-project.properties**                | SonarQube/SonarCloud конфигурација (квалитет кода)                                                                   |
| **Dockerfile**                              | Вишефазна Docker изградња (builder → runner-base → runner-cli)                                                       |
| **docker-compose.yml**                      | Развојна compose конфигурација са 4 профила (base, cli, host, cliproxyapi) + redis пратећи контејнер                 |
| **docker-compose.prod.yml**                 | Продукциона compose конфигурација (порт 20130, redis, именовани волумени)                                            |
| **.dockerignore**                           | Датотеке изузете из Docker контекста                                                                                 |
| **fly.toml**                                | Конфигурација постављања на Fly.io (регион `sin`, порт 20128, волумен /data)                                         |
| **.env.example**                            | Шаблон датотеке окружења (аутоматски се копира у `.env` при првој инсталацији)                                       |
| **.gitignore**                              | Git обрасци за игнорисање                                                                                            |
| **.npmignore**                              | Листа изузетака при npm објављивању                                                                                  |
| **.npmrc**                                  | npm конфигурација (регистар, смернице за lockfile)                                                                   |
| **.node-version**                           | Фиксирана Node верзија (користе је алати компатибилни са nvm-ом)                                                     |
| **.nvmrc**                                  | Фиксирана Node верзија за nvm                                                                                        |
| **eslint.complexity.config.mjs**            | ESLint конфигурација за механизам постепеног ограничавања сложености (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint конфигурација за SonarJS правила (когнитивна сложеност / дуплирање)                                           |
| **source.config.ts**                        | Fumadocs `defineDocs` конфигурација извора (попуњава `.source/`)                                                     |
| **knip.json**                               | Knip конфигурација — некоришћене датотеке/извози/зависности (користи се за проверу мртвог кода)                      |
| **stryker.conf.json**                       | Конфигурација Stryker мутационог тестирања                                                                           |
| **.size-limit.json**                        | конфигурација ограничења величине пакета                                                                             |
| **promptfooconfig.yaml**                    | конфигурација promptfoo евалуације                                                                                   |
| **.gitleaks.toml**                          | скуп правила за gitleaks скенирање тајни                                                                             |
| **.zizmor.yml**                             | конфигурација zizmor безбедносне провере за GitHub Actions                                                           |
| **socket.yml**                              | Socket.dev конфигурација ланца снабдевања                                                                            |
| **news.json**                               | Локализовани ток v2 обавештења; ставка о покретању Radar-а испоручује се неактивна                                   |
| **flake.nix** / **flake.lock**              | дефиниција Nix развојног окружења + датотека за закључавање                                                          |
| **.env**                                    | Локалне тајне (игнорише их git — генерисане из `.env.example`)                                                       |

> **Премештено из кореног директоријума у v3.8.26 (ради прегледности):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` и генерисани `quality-metrics.json` (игнорише га git). Погледајте [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js апликација

```
src/
├── app/                 # App Router (странице + API руте + статусне странице + одредишна страница)
├── lib/                 # Основне библиотеке / доменски модули (80 поддиректоријума + ~70 датотека највишег нивоа)
├── domain/              # Чиста доменска логика (policy engine, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Модули само за сервер (authz процес, cors, auth посреднички слој) — не могу се увозити из клијента
├── shared/              # Дељено између сервера и клијента тамо где је безбедно (константе, типови, валидација, уговори, помоћни алати)
├── i18n/                # next-intl конфигурација + JSON поруке за сваки локалитет (67 локалитета)
├── middleware/          # Next.js посреднички слој (обогаћивање захтева, откривање локалитета)
├── mitm/                # Језгро MITM проксија: генерисање/инсталација сертификата, руковаоци, циљеви, инспектор, маске, директно прослеђивање
│   ├── handlers/        # 9 класа руковалаца IDE агената које проширују MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Слој за снимање саобраћаја: buffer (прстен у меморији), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Повезујући код адаптера модела (застарели слој компатибилности)
├── scripts/             # Скрипте за одржавање унутар стабла (нпр. backfillAggregation)
├── sse/                 # Застарели SSE руковаоци/сервиси (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Застарело складиште у меморији (постепено се замењује са src/lib/db)
├── types/               # Дељене датотеке TS типова
├── instrumentation.ts   # Next.js телеметријска спојница (прегледач + edge)
├── instrumentation-node.ts  # Инструментација само за Node
└── proxy.ts             # Улазни слој HTTP проксија
```

### `src/app/` — App Router (Next.js 16)

| Путања                                                                       | Намена                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Јавни API компатибилан са OpenAI-јем (~25 подрута: ћаскање, довршавања, угнежђивања, датотеке, пакети, аудио, слике, видео-снимци, музика, поновно рангирање, модерације, претрага, ws, агенти, налози, добављачи итд.)                                                                                                    |
| `app/api/v1beta/`                                                            | Крајње тачке API-ја у стилу Gemini-ја                                                                                                                                                                                                                                                                                      |
| `app/api/playground/`                                                        | Руте за Playground Studio: `improve-prompt/` (POST — LLM преписивач упита), `presets/` (GET листа / POST креирање), `presets/[id]/` (GET / PUT / DELETE) — погледајте `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                               |
| `app/api/` (изван v1)                                                        | Руте за управљање/администрацију (~60 директоријума: добављачи, комбинације, подешавања, mcp, a2a, евалуације, меморија, вештине, webhook-ови, усклађеност, отпорност, надзор, тунели, cli алати итд.)                                                                                                                     |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 рута (контрола сервера, стање агента/DNS/мапирања, заобилажење, сертификат, надређени CA). LOCAL_ONLY + SPAWN_CAPABLE. Погледајте `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                           |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ рута (захтеви, сесије, хостови, режими снимања, извоз, ws). LOCAL_ONLY + SPAWN_CAPABLE. Погледајте `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                        |
| `app/a2a/`                                                                   | Улазна тачка за A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | A2A картица агента (откривање)                                                                                                                                                                                                                                                                                             |
| `app/(dashboard)/dashboard/`                                                 | Странице корисничког интерфејса контролне табле (50+ одељака, ~118 page.tsx датотека: добављачи, комбинације, подешавања, меморија, вештине, webhook-ови, евалуације, ревизија, пакетна обрада, кеш, трошкови, стање, систем, активност итд.)                                                                              |
| `app/(dashboard)/dashboard/search-tools/`                                    | Кориснички интерфејс Search Tools Studio (3 картице: претрага/извлачење/поређење + SearchConceptCard + ProviderCatalog) — погледајте `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                              |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (план 21): `page.tsx` (омотач са 3 картице), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Страница AgentBridge контролне табле — картица сервера, 9 картица агената, чаробњак за подешавање, мапирање модела, листа заобилажења. i18n PT-BR + EN. Погледајте `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                       |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Страница Traffic Inspector контролне табле — подељени DevTools приказ, 7 картица са детаљима, 4 прекидача режима снимања, снимач сесија, бојење контекста. i18n PT-BR + EN. Погледајте `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Страница тока активности (Група Б): `page.tsx` (сервер) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — погледајте `docs/architecture/MONITORING_SECTIONS.md`                                                                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Страница за дељење квота (Група Б): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Страница за конфигурацију плана добављача (Група Б): `page.tsx` + `ProviderPlanConfigClient.tsx` — замена димензија квота по вези                                                                                                                                                                                          |
| `app/docs/`                                                                  | Уграђени приказивач документације (приказује `docs/*.md`)                                                                                                                                                                                                                                                                  |
| `app/landing/`                                                               | Маркетиншка одредишна страница                                                                                                                                                                                                                                                                                             |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Странице повезане са аутентификацијом                                                                                                                                                                                                                                                                                      |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Странице HTTP грешака                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Статичке/статусне странице                                                                                                                                                                                                                                                                                                 |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Коренски распоред, почетна страница, PWA манифест, глобални CSS                                                                                                                                                                                                                                                            |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Границе грешака                                                                                                                                                                                                                                                                                                            |

### `src/lib/` — Основне библиотеке (~50 модула)

| Модул                                    | Сврха                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`                                   | Менаџер задатака A2A протокола, вештине (5), стримовање                                                                                                                                                                                                                                                                              |
| `acp/`                                   | Регистар CLI агената (локално откривање CLI алата — погледајте `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                           |
| `api/`                                   | Дељени помоћни API алати (`requireManagementAuth`, валидација)                                                                                                                                                                                                                                                                       |
| `auth/`                                  | Сесија, хеширање лозинки, валидација токена                                                                                                                                                                                                                                                                                          |
| `batches/`                               | Обрађивачи за OpenAI Batches API                                                                                                                                                                                                                                                                                                     |
| `catalog/`                               | Zod валидација каталога добављача + разрешавање могућности                                                                                                                                                                                                                                                                           |
| `cloudAgent/`                            | Агенти у облаку (Codex Cloud, Devin, Jules) — погледајте `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                            |
| `combos/`                                | Разрешавање комбинација + помоћни алати за промену редоследа                                                                                                                                                                                                                                                                         |
| `audit/`                                 | Помоћни алати за ток активности: `highLevelActions.ts` (листа дозвољених вредности + `isHighLevelAction()`), `activityIcons.ts` (мапирање радње → икона/глагол), `timeline.ts` (groupByDay/relativeTime) — погледајте `docs/architecture/MONITORING_SECTIONS.md`                                                                     |
| `compliance/`                            | Дневник ревизије + ревизија добављача — погледајте `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                     |
| `compression/`                           | Интеграциони слој механизма за компресију (механизми се налазе у `open-sse/services/compression/`)                                                                                                                                                                                                                                   |
| `config/`                                | Помоћни алати за конфигурацију током извршавања                                                                                                                                                                                                                                                                                      |
| `db/`                                    | Више од 120 доменских DB модула + 168 миграција (за SQLite увек користите овај модул)                                                                                                                                                                                                                                                |
| `quota/`                                 | Механизам за дељење квота: `dimensions.ts` (типови/Zod), `types.ts` (QuotaStore интерфејс), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — погледајте `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Клијент каталога бесплатних модела Radar-а: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — погледајте `docs/frameworks/RADAR.md`                                                                                                                                       |
| `display/`                               | Помоћне функције за форматирање корисничког интерфејса (трошкови, кашњење итд.)                                                                                                                                                                                                                                                      |
| `embeddings/`                            | Помоћне функције сервиса за угнежђавања                                                                                                                                                                                                                                                                                              |
| `env/`                                   | Рашчлањивање и валидација променљивих окружења                                                                                                                                                                                                                                                                                       |
| `evals/`                                 | Оквир за евалуацију (скупови, покретач, извршно окружење) — погледајте `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                    |
| `guardrails/`                            | Маскирање PII података, убризгавање упита, мост за визуелне податке — погледајте `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                       |
| `jobs/`                                  | Позадински задаци (налик cron-у)                                                                                                                                                                                                                                                                                                     |
| `memory/`                                | Конверзациона меморија (хибридни RRF са SQLite FTS5 + sqlite-vec и Qdrant ниво 2) — погледајте `docs/frameworks/MEMORY.md`                                                                                                                                                                                                           |
| `memory/embedding/`                      | Слој за угнежђавање из више извора: `index.ts` (разрешивач), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (план 21)                                                                                                                                                                                |
| `memory/vectorStore.ts`                  | Омотач за sqlite-vec v0.1.9 — KNN претрага грубом силом + хибридни RRF (FTS5 + вектор, k=60). Лења иницијализација, постепено ограничава функционалност када sqlite-vec није доступан. (план 21)                                                                                                                                     |
| `memory/reindex.ts`                      | `runReindexBatch()` — обрађује меморије са `needs_reindex=1` у позадини; позивају га `POST /api/memory/reindex` и путања за лењо накнадно попуњавање. (план 21)                                                                                                                                                                      |
| `monitoring/`                            | Провере исправности, емитовање метрика                                                                                                                                                                                                                                                                                               |
| `oauth/`                                 | OAuth/увозни токови за 22 модула добављача (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                               |
| `plugins/`                               | Регистар додатака                                                                                                                                                                                                                                                                                                                    |
| `promptCache/`                           | Тачке прекида кеша упита у Anthropic стилу                                                                                                                                                                                                                                                                                           |
| `skills/`                                | Оквир за вештине (уграђене + тржиште + SkillsSH) — погледајте `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                            |
| `playground/`                            | Дељени помоћни модули за Playground Studio: `codeExport.ts` (генератор за curl/Python/TS), `promptImprover.ts` (креатор мета-упита), `streamMetrics.ts` (чисти TTFT/TPS), `types.ts` (табела цена) — погледајте `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                               |
| `webhookDispatcher.ts`                   | Испорука webhook-ова помоћу HMAC-а — погледајте `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                        |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Управљачи тунелима — погледајте `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                          |
| `cloudSync.ts`, `initCloudSync.ts`       | Опциона синхронизација стања са облаком                                                                                                                                                                                                                                                                                              |
| `localDb.ts`                             | Збирни модул за поновни извоз модула базе података (без логике — само поновни извоз)                                                                                                                                                                                                                                                 |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Кеширање захтева + идемпотентност                                                                                                                                                                                                                                                                                                    |
| (~30 још датотека највишег нивоа)        | Специјализовани помоћни модули (logEnv, modelsDevSync, piiSanitizer итд.)                                                                                                                                                                                                                                                            |

### `src/lib/db/` — База података (147 модула + 208 миграција)

| Потдиректоријум           | Намена                                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | `getDbInstance()` singleton са WAL евидентирањем                                                                                                                                           |
| `db/migrations/`          | Верзионисане SQL датотеке (идемпотентне, трансакционе). `073_memory_vec.sql` додаје `memory_vec_meta` + колону `needs_reindex` (план 21).                                                  |
| `db/playgroundPresets.ts` | CRUD модул за унапред подешене поставке Playground Studio-а (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD за `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` итд. (план 21)                                  |
| `db/<domain>.ts`          | По један модул за сваки домен: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache итд.          |

### `src/domain/`

| Модул                  | Намена                                                        |
| ---------------------- | ------------------------------------------------------------- |
| `policy.ts`            | Механизам за политике                                         |
| `fallbackPolicy.ts`    | Стабло одлучивања за резервни избор                           |
| `costRules.ts`         | Правила за израчунавање трошкова                              |
| `lockoutPolicy.ts`     | Политика блокирања модела/везе                                |
| `tagRouter.ts`         | Усмеравање засновано на ознакама                              |
| `comboResolver.ts`     | Разрешавање комбинација (користи га механизам за комбинације) |
| `modelAvailability.ts` | Провера доступности по моделу                                 |
| `assessment/`          | Процена модела (фаза 1 документа RFC-AUTO-ASSESSMENT )        |

### `src/server/`

| Модул    | Намена                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `authz/` | Ток ауторизације: `classify` → `policies` → `enforce` — погледајте `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS конфигурација                                                                                    |
| `auth/`  | Посреднички софтвер за сесије                                                                         |

### `src/shared/`

| Модул                            | Намена                                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `components/`                    | API компоненти контролне табле: адаптери за `packages/ui-kit` — погледајте `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: називи икона које користе екрани → Lucide компоненте (`<Icon>`)                                     |
| `constants/providers.ts`         | **376 провајдера** са Zod валидацијом (једини извор истине)                                                     |
| `constants/cliTools.ts`          | Регистар спољних CLI алата                                                                                      |
| `constants/routingStrategies.ts` | **20 стратегија рутирања** са приоритетима                                                                      |
| `constants/publicApiRoutes.ts`   | Руте које захтевају Bearer аутентификацију (уместо управљачке)                                                  |
| `constants/upstreamHeaders.ts`   | Листа забрањених заглавља за узводне захтеве                                                                    |
| `validation/schemas.ts`          | ~80 Zod шема (једини извор истине за API уговоре)                                                               |
| `validation/helpers.ts`          | Помоћне функције за Zod валидацију (`validateBody` итд.)                                                        |
| `types/`                         | Дељени TS типови                                                                                                |
| `contracts/`                     | Јавни API уговори (користи их `files:` у `package.json`)                                                        |
| `utils/circuitBreaker.ts`        | Заштитни прекидач провајдера (погледајте `docs/architecture/RESILIENCE_GUIDE.md`)                               |
| `utils/apiAuth.ts`               | Валидација API кључа, провера опсега                                                                            |
| `utils/fetchTimeout.ts`          | Омотачи за временско ограничење/прекид узводног fetch захтева                                                   |
| `utils/releaseNotes.ts`          | Парсер затворених v2/legacy обавештења, локализација и одбацивање по ID-у                                       |

---

## `open-sse/` — Радни простор механизма за стримовање

Засебан npm радни простор (`@omniroute/open-sse`). Обрађује захтеве и извршавање код добављача.

```
open-sse/
├── handlers/            # 16 датотека (12 обрађивача + 4 помоћна модула): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, итд.
├── executors/           # 150 извршних модула (класе које проширују BaseExecutor + помоћни модули за сваког добављача)
├── translator/          # Конвертори формата (9 за захтеве, 9 за одговоре, 9 помоћних)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ сервисних модула (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, итд.)
├── mcp-server/          # MCP сервер (110 алата, 3 транспорта, 33 опсега)
├── config/              # Регистри добављача/модела, конфигурација заглавља, алијаси модела
├── utils/               # TLS клијент, proxy fetch/dispatcher, мрежни помоћни модули
├── index.ts             # Улазна тачка радног простора
├── package.json         # Манифест радног простора
├── tsconfig.json        # TS конфигурација радног простора
└── types.d.ts           # Декларације типова радног простора
```

### `open-sse/mcp-server/`

| Путања                      | Намена                                                                           |
| --------------------------- | -------------------------------------------------------------------------------- |
| `server.ts`                 | Животни циклус MCP сервера (stdio + HTTP транспорти)                             |
| `httpTransport.ts`          | HTTP Streamable + SSE транспорти (`/api/mcp/sse`, `/api/mcp/stream`)             |
| `audit.ts`                  | Евидентирање ревизије у табелу `mcp_tool_audit`                                  |
| `scopeEnforcement.ts`       | Провера опсега за сваки алат                                                     |
| `runtimeHeartbeat.ts`       | Сигнал стања у `DATA_DIR/runtime/mcp-heartbeat.json`                             |
| `descriptionCompressor.ts`  | Компримује метаподатке описа алата ради уштеде контекста                         |
| `schemas/tools.ts`          | 36 основних дефиниција алата + опсези                                            |
| `tools/advancedTools.ts`    | Имплементације напредних алата                                                   |
| `tools/memoryTools.ts`      | 3 меморијска алата (претрага/додавање/брисање)                                   |
| `tools/skillTools.ts`       | 4 алата за вештине (листа/омогућавање/извршавање/извршавања)                     |
| `tools/compressionTools.ts` | 5 алата за компресију                                                            |
| `README.md`                 | Интерни README MCP сервера (унакрсно повезан из `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Радни простори

| Путања                   | Намена                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — локално увезен снимак Keak CI UI Kit-а (`private`, `UNLICENSED`), који се користи директно као изворни код (без изградње). `UPSTREAM.md` фиксира commit изворног репозиторијума и бележи одобрење лиценце; `PATCHES.md` наводи локалне закрпе (нема их); `src/` се синхронизује искључиво помоћу `scripts/dev/sync-ui-kit.sh`, а проверава се помоћу `npm run check:ui-kit-snapshot`. Погледајте `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — опциони сервис пула прегледача (CloakBrowser и чет заснован на Playwright-у)                                                                                                                                                                                                                                                                                                                                                    |

---

## `electron/` — Omotač za desktop aplikaciju

| Datoteka         | Namena                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `main.js`        | Glavni Electron proces (BrowserWindow, ugrađeni Next.js server, sistemska kaseta, automatsko ažuriranje) |
| `preload.js`     | IPC most (contextBridge → `window.omniroute`)                                                            |
| `package.json`   | electron-builder konfiguracija + Electron 41 + electron-builder 26.10 zavisnosti                         |
| `assets/`        | Ikone aplikacije (Windows .ico, macOS .icns, Linux .png)                                                 |
| `dist-electron/` | Izlazne datoteke izgradnje (gitignored)                                                                  |
| `types.d.ts`     | Deklaracije tipova za most renderer procesa                                                              |
| `README.md`      | Interni Electron README (pogledajte i `docs/guides/ELECTRON_GUIDE.md`)                                   |

---

## `bin/` — CLI

| Datoteka                                                                                                    | Namena                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Glavna CLI ulazna tačka — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` itd. |
| `reset-password.mjs`                                                                                        | Samostalni CLI za resetovanje lozinke                                                                                              |
| `cli/commands/setup.mjs`                                                                                    | Interaktivni + neinteraktivni čarobnjak za podešavanje                                                                             |
| `cli/commands/doctor.mjs`                                                                                   | Dijagnostika stanja sistema (8+ provera)                                                                                           |
| `cli/commands/providers.mjs`                                                                                | Prikaz/testiranje/validacija dobavljača                                                                                            |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI pomoćni moduli                                                                                                                 |
| `cli/tray/tray.ts`                                                                                          | Integracija sa sistemskom kasetom (više platformi: NotifyIcon na Windowsu, systray2 na macOS-u/Linuxu)                             |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon pozadinski sistem (Windows, bez novih binarnih datoteka)                                                     |
| `cli/tray/autostart.ts`                                                                                     | Automatsko pokretanje na više platformi (LaunchAgent / .desktop / registry)                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Lanac za pronalaženje SQLite drajvera u 5 koraka (uključeni → izvršno okruženje → naknadna instalacija → node:sqlite → sql.js)     |
| `cli/runtime/magicBytes.mjs`                                                                                | Validacija magičnih bajtova binarne datoteke (ELF / Mach-O / Mach-O fat / PE)                                                      |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — unapred pronalazi drajvere tokom postinstall faze / prvog pokretanja                                          |
| `nodeRuntimeSupport.mjs`                                                                                    | Validacija podržane verzije Node.js-a prilikom instalacije                                                                         |

---

## `skills/` — Јавне вештине агената

| Датотека                     | Намена                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 манифеста вештина за спољне AI агенте (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Скрипте за изградњу и проверу

| Скрипта                             | Намена                                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Покретач за развој/покретање са учитавањем окружења                                                  |
| `build-next-isolated.mjs`           | Самостална изградња (Next.js 16 standalone)                                                          |
| `prepublish.ts`                     | Припрема пакета пре `npm pack`                                                                       |
| `postinstall.mjs`                   | Аутоматско креирање `.env` из `.env.example` при првој инсталацији                                   |
| `sync-env.mjs`                      | Поновна синхронизација кључева у `.env` са `.env.example`                                            |
| `check-cycles.mjs`                  | Откривање кружних зависности                                                                         |
| `check-route-validation.mjs`        | Провера да све API руте имају Zod валидацију                                                         |
| `check-t11-any-budget.mjs`          | Спровођење изричитог ограничења за `any` по датотеци                                                 |
| `check-docs-sync.mjs`               | Провера синхронизације верзија документације (постојећа pre-commit провера)                          |
| **`check-env-doc-sync.mjs`**        | НОВО: унакрсна провера променљивих окружења у коду, `.env.example` и `ENVIRONMENT.md`                |
| **`check-docs-counts-sync.mjs`**    | НОВО: провера да се бројеви (извршиоци, стратегије, OAuth, A2A вештине) подударају са документацијом |
| **`check-deprecated-versions.mjs`** | НОВО: означавање застарелих верзија/датума у документацији                                           |
| `check-supported-node-runtime.ts`   | Провера да ли је тренутна верзија Node-а подржана                                                    |
| `check-pr-test-policy.mjs`          | Спровођење правила „тестови су обавезни“ за измене продукционог кода                                 |
| **`gen-provider-reference.ts`**     | НОВО: аутоматско генерисање `docs/reference/PROVIDER_REFERENCE.md` из каталога                       |
| `i18n/generate-multilang.mjs`       | Превођење UI ниски и документације помоћу Google Translate-а                                         |
| `i18n_autotranslate.py`             | Ток за превођење документације заснован на LLM-у                                                     |
| `validate_translation.py`           | Валидација превода за сваки локалитет                                                                |
| `check_translations.py`             | Провера i18n кључева на страни кода                                                                  |
| `run-playwright-tests.mjs`          | Покретач Playwright E2E тестова                                                                      |
| `run-protocol-clients-tests.mjs`    | Покретач MCP/A2A E2E тестова                                                                         |
| `run-ecosystem-tests.mjs`           | Тестови екосистема (интеграција добављача)                                                           |
| `test-report-summary.mjs`           | Генерисање Markdown резимеа покривености                                                             |
| `smoke-electron-packaged.mjs`       | Основно тестирање упаковане Electron изградње                                                        |
| `native-binary-compat.mjs`          | Провера да ли изворне зависности (`better-sqlite3`) одговарају Electron-овом Node-у                  |
| `validate-pack-artifact.ts`         | Валидација излаза npm паковања                                                                       |
| `responses-ws-proxy.mjs`            | WebSocket мост за Codex Responses API                                                                |
| `v1-ws-bridge.mjs`                  | WebSocket мост за крајњу тачку `/api/v1/ws`                                                          |
| `standalone-server-ws.mjs`          | Покретач самосталног WS сервера                                                                      |
| `system-info.mjs`                   | Испис информација о систему/извршном окружењу за потребе подршке                                     |
| `healthcheck.mjs`                   | Једнократна провера стања (користи је Docker HEALTHCHECK)                                            |
| `uninstall.mjs`                     | Скрипта за чисту деинсталацију                                                                       |
| `dev/sync-ui-kit.sh`                | Копирање CI UI Kit директоријума `src/` са фиксираног комита у `packages/ui-kit/src`                 |
| `check/check-ui-kit-snapshot.mjs`   | Pre-commit контрола: `packages/ui-kit/src` одговара фиксираном узводном комиту                       |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — називи икона у употреби које `ICON_MAP` не мапира                           |
| `dev/codemod-material-icons.mjs`    | Преписивање дословних Material Symbols span елемената у `<Icon>` (алати за миграцију)                |

---

## `docs/` — Javna dokumentacija (7 korenskih fajlova + 17 poddirektorijuma)

### Vodiči najvišeg nivoa

| Dokument                    | Namena                                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arhitektura visokog nivoa, mapa podsistema, površina kontrolne table                                       |
| `CODEBASE_DOCUMENTATION.md` | Inženjerska referenca: direktorijumi, moduli, konvencije                                                   |
| `FEATURES.md`               | Matrica funkcija sa istaknutim novitetima v3.8                                                             |
| `USER_GUIDE.md`             | Priručnik za krajnje korisnike (podešavanje, modeli, kombinacije, CLI alati, audio, itd.)                  |
| `API_REFERENCE.md`          | Referenca API krajnjih tačaka sa modelom autentifikacije                                                   |
| `openapi.yaml`              | OpenAPI 3.0 specifikacija (121 putanja)                                                                    |
| `SETUP_GUIDE.md`            | Metode instalacije (npm, npx, Docker, Electron, Termux, izvorni kod)                                       |
| `ENVIRONMENT.md`            | Sve promenljive okruženja (~800 dokumentovanih, ~3.050 linija `.env.example`)                              |
| `TROUBLESHOOTING.md`        | Uobičajene greške + poznati problemi u v3.8.0                                                              |
| `RELEASE_CHECKLIST.md`      | Kompletan tok izdavanja (veštine, husky, conventional commits, raspoređivanje)                             |
| `COVERAGE_PLAN.md`          | Ciljevi pokrivenosti i trenutno stanje                                                                     |
| `FREE_TIERS.md`             | Odabrani provajderi besplatnih nivoa (48+ besplatnih + 11 OAuth)                                           |
| `CLI-TOOLS.md`              | Integracije eksternih CLI alata + interni OmniRoute CLI                                                    |
| `I18N.md`                   | i18n arhitektura, dodavanje jezika, 67 lokaliteta                                                          |
| `UNINSTALL.md`              | Koraci za čistu deinstalaciju                                                                              |
| `PROVIDER_REFERENCE.md`     | **Automatski generisan** katalog od 376 provajdera (ponovno generisanje: `npm run gen:provider-reference`) |

### Detaljna analiza podsistema

| Dokument                                    | Namena                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCP server: 110 alata, 3 transporta, 33 opsega, REST krajnje tačke                 |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 veština, REST pomoćnici, kartica agenta                      |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Objedinjeni vodič: A2A vs ACP vs Cloud Agents                                      |
| `CLOUD_AGENT.md`                            | Orkestracija Codex Cloud / Devin / Jules                                           |
| `SKILLS.md`                                 | Okvir veština (ugrađene + marketplace + SkillsSH + sandbox)                        |
| `RADAR.md`                                  | Radar sloj kataloga besplatnih modela (`RADAR_ENABLED`, podrazumevano isključen)   |
| `MEMORY.md`                                 | Sistem memorije (SQLite FTS5 + Qdrant)                                             |
| `EVALS.md`                                  | Okvir za evaluaciju (paketi testova, izvršavanja, rubrike)                         |
| `GUARDRAILS.md`                             | Maskiranje PII podataka, prompt injection, vizuelni most                           |
| `COMPLIANCE.md`                             | Dnevnik revizije, zadržavanje podataka, noLog odjava                               |
| `WEBHOOKS.md`                               | Isporuka webhook-ova potpisana HMAC-om                                             |
| `REASONING_REPLAY.md`                       | Hibridni keš u memoriji/SQLite za `reasoning_content`                              |
| `AUTHZ_GUIDE.md`                            | Pipeline autorizacije (`classify` → `policies` → `enforce`)                        |
| `RESILIENCE_GUIDE.md`                       | Circuit breaker + cooldown + zaključavanje modela                                  |
| `docs/security/STEALTH_GUIDE.md` (samo git) | TLS fingerprinting (JA3/JA4), Claude Code CCH, MITM sertifikat                     |
| `AUTO-COMBO.md`                             | Auto Combo mehanizam (bodovanje po 16 faktora, 6 paketa režima, virtuelna fabrika) |

### Kompresija

| Dokument                        | Namena                                   |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Pregled režima kompresije + plan razvoja |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK mehanizmi, ugovor registra |
| `COMPRESSION_RULES_FORMAT.md`   | JSON šema Caveman paketa pravila         |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventar paketa pravila po jeziku        |
| `RTK_COMPRESSION.md`            | RTK deklarativni pipeline (56 filtera)   |

### Raspoređivanje

| Документ                     | Сврха                                                               |
| ---------------------------- | ------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker изградња, профили (base/cli/host/cliproxyapi), Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Генеричко постављање на VM/VPS (Ubuntu/Debian + nginx + systemd)    |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Постављање на Fly.io (тренутно само на кинеском)                    |
| `TERMUX_GUIDE.md`            | Android headless преко Termux-а                                     |
| `PWA_GUIDE.md`               | Инсталација Progressive Web App-а + service worker                  |
| `ELECTRON_GUIDE.md`          | Изградња десктоп апликације + потписивање + дистрибуција            |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                              |
| `PROXY_GUIDE.md`             | 4-нивоски одлазни прокси + 1proxy продавница                        |

### Поддиректоријуми

| Поддиректоријум       | Сврха                                                                                                                                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Локализовани преводи документације (41 локал)                                                                                                                                                                                                      |
| `docs/screenshots/`   | Сликовни ресурси за водиче                                                                                                                                                                                                                         |
| `_tasks/superpowers/` | Планови/спецификације из superpowers-а (`writing-plans`/`brainstorming`) + истраживање — изолован репозиторијум са засебним верзионисањем, изузет из главног stabла путем gitignore-а. Погледајте CLAUDE.md → „Планирање и артефакти истраживања". |

---

## `tests/` — Пакети тестова

| Потдиректоријум                      | Тип                                              | Покретач                                         |
| ------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `tests/unit/`                        | Јединични тестови (~4.800 датотека, најбржи)     | Уграђени Node покретач тестова                   |
| `tests/integration/`                 | Интеграциони тестови више модула и базе података | Уграђени Node покретач тестова (конкурентност 1) |
| `tests/e2e/`                         | E2E корисничког интерфејса и токова рада         | Playwright                                       |
| `tests/e2e/protocol-clients.test.ts` | E2E са стварним MCP + A2A клијентима             | Прилагођени клијенти протокола                   |
| `tests/e2e/ecosystem.test.ts`        | Интеграција добављача (користи мрежу)            | Уграђени Node покретач тестова                   |

---

## `public/` — Статички ресурси

| Путања              | Намена                                                             |
| ------------------- | ------------------------------------------------------------------ |
| `public/` (корен)   | Фавикони, robots.txt, манифест, сервисни радник, маркетиншке слике |
| `public/providers/` | PNG/SVG логотипи добављача (користе се на контролној табли)        |

---

## `config/` — Статичке конфигурације и стање контроле квалитета

Испоручени шаблони конфигурације и верзионисане основне вредности контроле квалитета
(премештене овде из корена репозиторијума у v3.8.26 како би корен остао растерећен).

| Путања                                        | Намена                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Листа локала и метаподаци (канонски извор за број од 42 локала)                          |
| `config/i18n-schema.json`                     | JSON шема за валидацију датотеке `i18n.json`                                             |
| `config/payloadRules.json`                    | Правила за пречишћавање долазног корисног садржаја                                       |
| `config/quality/quality-baseline.json`        | Основна вредност механизма са више метрика (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Замрзнута основна вредност ESLint сложености (`check-complexity.mjs`)                    |
| `config/quality/duplication-baseline.json`    | Замрзнута основна вредност jscpd дуплирања (`check-duplication.mjs`)                     |
| `config/quality/file-size-baseline.json`      | Замрзнута основна вредност величине по датотеци (`check-file-size.mjs`)                  |
| `config/quality/test-discovery-baseline.json` | Замрзнута основна вредност тестова без придруживања (`check-test-discovery.mjs`)         |
| `config/quality/dependency-allowlist.json`    | Листа одобрених зависности (`check-deps.mjs`)                                            |
| `config/quality/.license-allowlist.json`      | Листа дозвољених SPDX лиценци (`check-licenses.mjs`)                                     |
| `config/quality/quality-metrics.json`         | Привремено прикупљене метрике (генерише `collect-metrics.mjs`; **Git их игнорише**)      |

---

## `.github/` — GitHub интеграција

| Путања                             | Намена                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD токови рада (провера кода, тестирање, покривеност, издавање) |
| `.github/ISSUE_TEMPLATE/`          | Шаблони за пријаву грешака и захтеве за функције                                  |
| `.github/pull_request_template.md` | PR шаблон                                                                         |
| `.github/dependabot.yml`           | Конфигурација ажурирања зависности                                                |

---

## `.husky/` — Git куке

| Датотека     | Намена                                                                          |
| ------------ | ------------------------------------------------------------------------------- |
| `pre-commit` | Покреће `lint-staged + check-docs-sync + check:any-budget:t11`                  |
| `pre-push`   | Тренутно је онемогућено (закоментарисано). Ручно покрените `npm run test:unit`. |
| `_/`         | Husky интерни садржај                                                           |

---

## `.claude/` — Claude Code косе команде

| Датотека                                            | Намена                                                            |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — повећање верзије + аутоматски дневник измена |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — комплетан ток рада за издање             |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Примена на VPS                                                    |
| `commands/capture-release-evidences-cc.md`          | Снимање нових функција у прегледачу као WebP                      |
| `commands/review-{prs,discussions}-cc.md`           | Тријажа GitHub PR-ова/дискусија                                   |
| `commands/{review-issues,implement-features}-cc.md` | Токови рада за проблеме                                           |
| `settings.local.json`                               | Claude Code подешавања по пројекту                                |

---

## `.agents/` — Генерички токови рада агената (Codex / Cursor / итд.)

| Путања                   | Намена                                                     |
| ------------------------ | ---------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 дефиниција токова рада (копија `.claude/commands/`)     |
| `skills/<name>/SKILL.md` | 9 дефиниција вештина са напоменама за извршавање у Codex-у |

> **Напомена:** Токови рада и команде су тренутно идентични бајт по бајт. Ако је `.agents/` намењен другом окружењу за извршавање агената (Codex), варијанте морају суштински да се разликују.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Изван стабла

Ови директоријуми са доњом цртом као префиксом садрже материјал који се не испоручује:

- **`_ideia/`** — напомене о дизајну (категорије defer / notfit / viable)
- **`_mono_repo/`** — историјски потпројекти (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — клонови повезаних OSS пројеката само за читање (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, итд.) за унакрсно референцирање током развоја
- **`_tasks/`** — датотеке за неформално праћење задатака за свако издање

Није укључено у излаз команде `npm pack`. Погледајте `.npmignore`.

---

## Генерисано / игнорисано у Git-у

| Путања                 | Намена                              |
| ---------------------- | ----------------------------------- |
| `node_modules/`        | npm зависности                      |
| `.next/`               | Излаз Next.js изградње              |
| `coverage/`            | c8 извештаји о покривености         |
| `logs/`                | Дневници извршавања                 |
| `package/`             | Привремени простор за npm пакет     |
| `.playwright-mcp/`     | Артефакти Playwright MCP тестова    |
| `.issues/`             | Локални кеш проблема                |
| `tsconfig.tsbuildinfo` | TS кеш за инкременталну компилацију |

---

## Савети за навигацију

- **Нови сарадник?** Прочитајте `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Додајете добављача?** Пратите `docs/architecture/ARCHITECTURE.md § Adding a New Provider` и упоредите са `docs/reference/PROVIDER_REFERENCE.md`.
- **Додајете руту?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` и `src/shared/validation/schemas.ts`.
- **Додајете MCP алатку?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Додајете A2A вештину?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Покрећете локално?** `docs/guides/SETUP_GUIDE.md`.
- **Примењујете?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Објављујете издање?** `docs/ops/RELEASE_CHECKLIST.md` (и Claude Code вештина `/generate-release-cc`).
