# Repository Map (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Однострочное описание каждого каталога и файла в корне.**
> Последнее обновление: 2026-06-28 — OmniRoute v3.8.40
>
> Используйте эту карту для быстрой навигации по кодовой базе. Для подробного изучения переходите по ссылкам на специализированную документацию.

## Дерево верхнего уровня

```
OmniRoute/
├── src/                  # Приложение Next.js 16 (интерфейс + маршруты API + библиотеки + доменная логика + сервер)
├── open-sse/             # Рабочее пространство потокового движка (обработчики, исполнители, транслятор, сервер MCP)
├── packages/            # Рабочие пространства npm: ui-kit (встроенный Keak CI UI Kit) и browser-pool
├── electron/             # Оболочка для настольного приложения (Electron 41 + electron-builder 26.10)
├── bin/                  # Точка входа CLI и обработчики команд
├── scripts/              # Скрипты сборки, проверки, синхронизации и одноразовых задач
├── docs/                 # Публичная документация (вы находитесь здесь)
├── tests/                # Все наборы тестов (модульные, интеграционные, e2e, клиенты протоколов)
├── public/               # Статические ресурсы Next.js, манифест PWA, сервис-воркер, значки
├── config/               # Статическая конфигурация + состояние контроля качества (i18n, payloadRules, quality/)
├── images/               # Изображения для маркетинговых материалов и README
├── @omniroute/           # Публикуемые сопутствующие пакеты (opencode-plugin, opencode-provider)
├── skills/               # Наборы навыков для CLI/агентов (cli-* + omni-* + config-codex-cli)
├── examples/             # Примеры плагинов + стартовый проект omniroute-cmd-hello
├── contrib/              # Материалы сообщества (podman/)
├── .source/              # Конфигурация источников Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Рабочие процессы GitHub Actions + шаблоны задач + шаблон PR
├── .husky/               # Git-хуки (pre-commit, pre-push)
├── .claude/              # Slash-команды Claude Code (на уровне проекта)
├── .agents/              # Рабочие процессы и навыки Codex / универсальных агентов (зеркало .claude/)
├── .vscode/              # Настройки рабочего пространства VS Code
├── _ideia/               # Заметки по планированию (неформальные; не входят в поставку)
├── _mono_repo/           # Исторические подпроекты (cloud, site, vscode-extension)
├── _references/          # Доступные только для чтения клоны связанных OSS-проектов
├── _tasks/               # Неформальные файлы отслеживания задач для каждого выпуска
├── .build/ .worktrees/ dist/   # Локальные временные данные сборки / git-worktree / результаты сборки (игнорируются Git)
├── .issues/              # Локальный кеш задач (игнорируется Git)
├── .playwright-mcp/      # Артефакты тестирования Playwright MCP
├── coverage/             # Результаты покрытия c8 (игнорируются Git)
├── logs/                 # Журналы выполнения (игнорируются Git)
├── node_modules/         # Зависимости (игнорируются Git)
├── package/              # Промежуточная область npm pack (артефакт сборки)
├── .next/                # Результаты сборки Next.js (игнорируются Git)
└── (корневые файлы — см. ниже)
```

---

## Корневые файлы

| Файл                                        | Назначение                                                                                    |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **README.md**                               | Маркетинговая целевая страница + быстрый старт + матрица функций (см. также `llm.txt`)        |
| **CHANGELOG.md**                            | Журнал изменений для каждого выпуска (автоматически создаётся навыком `/version-bump-cc`)     |
| **LICENSE**                                 | Текст лицензии MIT                                                                            |
| **CLAUDE.md**                               | Правила проекта для агентов Claude Code (строгие правила, соглашения, сценарии)               |
| **AGENTS.md**                               | То же, что и CLAUDE.md, но для ИИ-агентов не на базе Claude (Codex, Cursor и т. д.)           |
| **GEMINI.md**                               | Краткие правила для агентов на базе Gemini (подмножество CLAUDE.md)                           |
| **CONTRIBUTING.md**                         | Руководство для участников: настройка, conventional commits, тестирование, процесс PR         |
| **SECURITY.md**                             | Политика сообщения об уязвимостях, поддерживаемые версии, модель угроз                        |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — требования к поведению участников сообщества                           |
| **llm.txt**                                 | Текстовая целевая страница, оптимизированная для краулеров LLM (SEO для ИИ-ассистентов)       |
| **package.json**                            | Манифест npm, скрипты, зависимости, движки, порог покрытия c8                                 |
| **package-lock.json**                       | Зафиксированное дерево зависимостей                                                           |
| **tsconfig.json**                           | Корневая конфигурация TypeScript                                                              |
| **tsconfig.typecheck-core.json**            | Конфигурация проверки типов для ядра `src/`                                                   |
| **tsconfig.typecheck-noimplicit-core.json** | Строгая проверка типов (`noImplicitAny`)                                                      |
| **tsconfig.tsbuildinfo**                    | Кеш инкрементальной сборки TS (игнорируется Git)                                              |
| **next.config.mjs**                         | Конфигурация сборки Next.js 16 (автономный вывод)                                             |
| **next-env.d.ts**                           | Автоматически сгенерированные Next.js типы переменных окружения                               |
| **eslint.config.mjs**                       | Плоская конфигурация ESLint (правила для каждой области проекта)                              |
| **prettier.config.mjs**                     | Правила форматирования Prettier                                                               |
| **postcss.config.mjs**                      | Конфигурация PostCSS для конвейера Tailwind/CSS                                               |
| **playwright.config.ts**                    | Конфигурация сквозных тестов Playwright                                                       |
| **vitest.config.ts**                        | Конфигурация Vitest (набор тестов по умолчанию)                                               |
| **vitest.mcp.config.ts**                    | Конфигурация Vitest для наборов MCP-сервера / autoCombo / кеша                                |
| **sonar-project.properties**                | Конфигурация SonarQube/SonarCloud (качество кода)                                             |
| **Dockerfile**                              | Многоэтапная сборка Docker (builder → runner-base → runner-cli)                               |
| **docker-compose.yml**                      | Конфигурация Compose для разработки с 4 профилями (base, cli, host, cliproxyapi) + redis      |
| **docker-compose.prod.yml**                 | Конфигурация Compose для рабочей среды (порт 20130, redis, именованные тома)                  |
| **.dockerignore**                           | Файлы, исключённые из контекста Docker                                                        |
| **fly.toml**                                | Конфигурация развёртывания Fly.io (регион `sin`, порт 20128, том /data)                       |
| **.env.example**                            | Шаблон файла переменных окружения (при первой установке автоматически копируется в `.env`)    |
| **.gitignore**                              | Шаблоны игнорирования Git                                                                     |
| **.npmignore**                              | Список исключений при публикации npm                                                          |
| **.npmrc**                                  | Конфигурация npm (реестр, политика lock-файлов)                                               |
| **.node-version**                           | Закреплённая версия Node (используется инструментами, совместимыми с nvm)                     |
| **.nvmrc**                                  | Закреплённая версия Node для nvm                                                              |
| **eslint.complexity.config.mjs**            | Конфигурация ESLint для ограничения сложности (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Конфигурация ESLint для правил SonarJS (когнитивная сложность / дублирование)                 |
| **source.config.ts**                        | Конфигурация источника Fumadocs `defineDocs` (формирует `.source/`)                           |
| **knip.json**                               | Конфигурация Knip — неиспользуемые файлы/экспорты/зависимости (для проверки мёртвого кода)    |
| **stryker.conf.json**                       | Конфигурация мутационного тестирования Stryker                                                |
| **.size-limit.json**                        | конфигурация бюджета размера бандла size-limit                                                |
| **promptfooconfig.yaml**                    | конфигурация оценок promptfoo                                                                 |
| **.gitleaks.toml**                          | набор правил gitleaks для сканирования секретов                                               |
| **.zizmor.yml**                             | конфигурация zizmor для проверки безопасности GitHub Actions                                  |
| **socket.yml**                              | конфигурация Socket.dev для безопасности цепочки поставок                                     |
| **news.json**                               | локализованная лента объявлений v2; элемент запуска Radar поставляется неактивным             |
| **flake.nix** / **flake.lock**              | определение dev-окружения Nix + файл блокировки                                               |
| **.env**                                    | локальные секреты (игнорируется Git — генерируется из `.env.example`)                         |

> **Перемещено из корневого каталога в v3.8.26 (для уменьшения загромождённости):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` и генерируемый файл `quality-metrics.json` (игнорируется Git). См. [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — приложение Next.js

```
src/
├── app/                 # App Router (страницы + маршруты API + страницы состояния + лендинг)
├── lib/                 # Основные библиотеки / доменные модули (80 подкаталогов + ~70 файлов верхнего уровня)
├── domain/              # Чистая доменная логика (движок политик, откат, стоимость, блокировка, comboResolver, оценка)
├── server/              # Только серверные модули (конвейер авторизации, cors, промежуточное ПО аутентификации) — нельзя импортировать на клиенте
├── shared/              # Совместно используется сервером и клиентом, где это безопасно (константы, типы, валидация, контракты, утилиты)
├── i18n/                # Конфигурация next-intl + JSON с сообщениями для каждой локали (67 локалей)
├── middleware/          # Промежуточное ПО Next.js (обогащение запросов, определение локали)
├── mitm/                # Ядро MITM-прокси: генерация/установка сертификатов, обработчики, цели, инспектор, маски, сквозная передача
│   ├── handlers/        # 9 классов обработчиков IDE-агентов, расширяющих MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Уровень перехвата трафика: буфер (кольцевой, в памяти), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Связующий код адаптеров моделей (устаревший слой совместимости)
├── scripts/             # Внутренние скрипты обслуживания (например, backfillAggregation)
├── sse/                 # Устаревшие обработчики/сервисы SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Устаревшее хранилище в памяти (постепенно заменяется на src/lib/db)
├── types/               # Общие файлы типов TS
├── instrumentation.ts   # Хук телеметрии Next.js (браузер + edge-среда)
├── instrumentation-node.ts  # Инструментирование только для Node
└── proxy.ts             # Входной слой совместимости HTTP-прокси
```

### `src/app/` — App Router (Next.js 16)

| Путь                                                                         | Назначение                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Публичный API, совместимый с OpenAI (~25 подмаршрутов: чат, дополнения, эмбеддинги, файлы, пакетная обработка, аудио, изображения, видео, музыка, переранжирование, модерация, поиск, ws, агенты, учётные записи, провайдеры и т. д.)                                                                                         |
| `app/api/v1beta/`                                                            | Конечные точки API в стиле Gemini                                                                                                                                                                                                                                                                                             |
| `app/api/playground/`                                                        | Маршруты Playground Studio: `improve-prompt/` (POST — переформулировка промптов с помощью LLM), `presets/` (GET списка / POST для создания), `presets/[id]/` (GET / PUT / DELETE) — см. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                |
| `app/api/` (не v1)                                                           | Маршруты управления/администрирования (~60 каталогов: провайдеры, комбинации, настройки, mcp, a2a, оценки, память, навыки, вебхуки, соответствие требованиям, отказоустойчивость, мониторинг, туннели, инструменты CLI и т. д.)                                                                                               |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 маршрутов (управление сервером, состояние/DNS/сопоставления агентов, обход, сертификат, вышестоящий CA). LOCAL_ONLY + SPAWN_CAPABLE. См. `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                       |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API Traffic Inspector — более 16 маршрутов (запросы, сеансы, хосты, режимы захвата, экспорт, ws). LOCAL_ONLY + SPAWN_CAPABLE. См. `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                        |
| `app/a2a/`                                                                   | Точка входа A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                    |
| `app/.well-known/agent.json/`                                                | Карточка агента A2A (обнаружение)                                                                                                                                                                                                                                                                                             |
| `app/(dashboard)/dashboard/`                                                 | Страницы интерфейса панели управления (более 50 разделов, ~118 файлов page.tsx: провайдеры, комбинации, настройки, память, навыки, вебхуки, оценки, аудит, пакетная обработка, кеш, затраты, состояние, система, активность и т. д.)                                                                                          |
| `app/(dashboard)/dashboard/search-tools/`                                    | Интерфейс Search Tools Studio (3 вкладки: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — см. `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                         |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (план 21): `page.tsx` (оболочка с 3 вкладками), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Страница AgentBridge в панели управления — карточка сервера, 9 карточек агентов, мастер настройки, сопоставление моделей, список обхода. i18n PT-BR + EN. См. `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                               |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Страница Traffic Inspector в панели управления — разделённый интерфейс DevTools, 7 вкладок с подробностями, 4 переключателя режимов захвата, средство записи сеансов, цветовая маркировка контекста. i18n PT-BR + EN. См. `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Страница ленты активности (группа B): `page.tsx` (сервер) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — см. `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Страница совместного использования квот (группа B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                               |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Страница конфигурации тарифного плана провайдера (группа B): `page.tsx` + `ProviderPlanConfigClient.tsx` — переопределение измерений квоты для каждого подключения                                                                                                                                                            |
| `app/docs/`                                                                  | Встроенное средство просмотра документации (отображает `docs/*.md`)                                                                                                                                                                                                                                                           |
| `app/landing/`                                                               | Маркетинговая целевая страница                                                                                                                                                                                                                                                                                                |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Страницы, связанные с аутентификацией                                                                                                                                                                                                                                                                                         |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Страницы ошибок HTTP                                                                                                                                                                                                                                                                                                          |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Статические страницы и страницы состояния                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Корневой макет, главная страница, манифест PWA, глобальные стили CSS                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Границы ошибок                                                                                                                                                                                                                                                                                                                |

### `src/lib/` — Основные библиотеки (~50 модулей)

| Модуль                                   | Назначение                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Менеджер задач протокола A2A, навыки (5), потоковая передача                                                                                                                                                                                                                                                                              |
| `acp/`                                   | Реестр CLI-агентов (локальное обнаружение CLI — см. `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                           |
| `api/`                                   | Общие вспомогательные средства API (`requireManagementAuth`, валидация)                                                                                                                                                                                                                                                                   |
| `auth/`                                  | Сессии, хеширование паролей, проверка токенов                                                                                                                                                                                                                                                                                             |
| `batches/`                               | Обработчики OpenAI Batches API                                                                                                                                                                                                                                                                                                            |
| `catalog/`                               | Валидация каталога провайдеров с помощью Zod + определение возможностей                                                                                                                                                                                                                                                                   |
| `cloudAgent/`                            | Облачные агенты (Codex Cloud, Devin, Jules) — см. `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                        |
| `combos/`                                | Вспомогательные средства для разрешения и изменения порядка комбинаций                                                                                                                                                                                                                                                                    |
| `audit/`                                 | Вспомогательные средства ленты активности: `highLevelActions.ts` (список разрешённых действий + `isHighLevelAction()`), `activityIcons.ts` (сопоставление действия со значком/глаголом), `timeline.ts` (groupByDay/relativeTime) — см. `docs/architecture/MONITORING_SECTIONS.md`                                                         |
| `compliance/`                            | Журнал аудита + аудит провайдеров — см. `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                                     |
| `compression/`                           | Связующий код движка сжатия (движки находятся в `open-sse/services/compression/`)                                                                                                                                                                                                                                                         |
| `config/`                                | Вспомогательные средства конфигурации среды выполнения                                                                                                                                                                                                                                                                                    |
| `db/`                                    | Более 120 модулей БД для предметных областей + 168 миграций (для SQLite всегда обращайтесь через этот модуль)                                                                                                                                                                                                                             |
| `quota/`                                 | Механизм совместного использования квот: `dimensions.ts` (типы/Zod), `types.ts` (интерфейс QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — см. `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Клиент каталога бесплатных моделей Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — см. `docs/frameworks/RADAR.md`                                                                                                                                                     |
| `display/`                               | Вспомогательные средства форматирования UI (стоимость, задержка и т. д.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Вспомогательные средства сервиса эмбеддингов                                                                                                                                                                                                                                                                                              |
| `env/`                                   | Разбор и валидация переменных окружения                                                                                                                                                                                                                                                                                                   |
| `evals/`                                 | Фреймворк оценивания (наборы тестов, исполнитель, среда выполнения) — см. `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                      |
| `guardrails/`                            | Маскирование персональных данных, защита от инъекций в промпты, мост для обработки изображений — см. `docs/security/GUARDRAILS.md`                                                                                                                                                                                                        |
| `jobs/`                                  | Фоновые задания (подобные cron)                                                                                                                                                                                                                                                                                                           |
| `memory/`                                | Диалоговая память (гибридный RRF на основе SQLite FTS5 + sqlite-vec, а также Qdrant второго уровня) — см. `docs/frameworks/MEMORY.md`                                                                                                                                                                                                     |
| `memory/embedding/`                      | Многоресурсный слой эмбеддингов: `index.ts` (преобразователь), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (план 21)                                                                                                                                                                                   |
| `memory/vectorStore.ts`                  | Обёртка для sqlite-vec v0.1.9 — полный перебор KNN + гибридный RRF (FTS5 + векторы, k=60). Ленивая инициализация, корректное снижение функциональности при недоступности sqlite-vec. (план 21)                                                                                                                                            |
| `memory/reindex.ts`                      | `runReindexBatch()` — обрабатывает в фоновом режиме записи памяти с `needs_reindex=1`; вызывается из `POST /api/memory/reindex` и пути ленивого заполнения. (план 21)                                                                                                                                                                     |
| `monitoring/`                            | Проверки работоспособности, публикация метрик                                                                                                                                                                                                                                                                                             |
| `oauth/`                                 | Потоки OAuth/импорта для 22 модулей провайдеров (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                               |
| `plugins/`                               | Реестр плагинов                                                                                                                                                                                                                                                                                                                           |
| `promptCache/`                           | Точки разделения кеша промптов в стиле Anthropic                                                                                                                                                                                                                                                                                          |
| `skills/`                                | Фреймворк навыков (встроенные навыки + маркетплейс + SkillsSH) — см. `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                          |
| `playground/`                            | Общие вспомогательные модули Playground Studio: `codeExport.ts` (генератор curl/Python/TS), `promptImprover.ts` (конструктор метапромптов), `streamMetrics.ts` (чистые TTFT/TPS), `types.ts` (таблица цен) — см. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                   |
| `webhookDispatcher.ts`                   | Доставка вебхуков с HMAC — см. `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Менеджеры туннелей — см. `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                      |
| `cloudSync.ts`, `initCloudSync.ts`       | Необязательная облачная синхронизация состояния                                                                                                                                                                                                                                                                                           |
| `localDb.ts`                             | Модуль реэкспорта для модулей БД (без логики — только реэкспорты)                                                                                                                                                                                                                                                                         |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Кэширование запросов + идемпотентность                                                                                                                                                                                                                                                                                                    |
| (ещё ~30 файлов верхнего уровня)         | Специализированные вспомогательные модули (logEnv, modelsDevSync, piiSanitizer и т. д.)                                                                                                                                                                                                                                                   |

### `src/lib/db/` — База данных (147 модулей + 208 миграций)

| Подкаталог                | Назначение                                                                                                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Синглтон `getDbInstance()` с журналированием WAL                                                                                                                                 |
| `db/migrations/`          | Версионированные SQL-файлы (идемпотентные, транзакционные). `073_memory_vec.sql` добавляет `memory_vec_meta` + столбец `needs_reindex` (план 21).                                |
| `db/playgroundPresets.ts` | CRUD-модуль для предустановок Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)   |
| `db/memoryVec.ts`         | CRUD для `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` и т. д. (план 21)                    |
| `db/<domain>.ts`          | По одному модулю на домен: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache и т. д. |

### `src/domain/`

| Модуль                 | Назначение                                                 |
| ---------------------- | ---------------------------------------------------------- |
| `policy.ts`            | Механизм политик                                           |
| `fallbackPolicy.ts`    | Дерево решений для резервного переключения                 |
| `costRules.ts`         | Правила расчёта стоимости                                  |
| `lockoutPolicy.ts`     | Политика блокировки модели/подключения                     |
| `tagRouter.ts`         | Маршрутизация на основе тегов                              |
| `comboResolver.ts`     | Разрешение комбинаций (используется механизмом комбинаций) |
| `modelAvailability.ts` | Проверка доступности для каждой модели                     |
| `assessment/`          | Оценка модели (этап 1 RFC-AUTO-ASSESSMENT)                 |

### `src/server/`

| Модуль   | Назначение                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Конвейер авторизации: `classify` → `policies` → `enforce` — см. `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Конфигурация CORS                                                                                  |
| `auth/`  | Промежуточное ПО для сессий                                                                        |

### `src/shared/`

| Модуль                           | Назначение                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `components/`                    | API компонентов панели управления: адаптеры над `packages/ui-kit` — см. `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: имена значков, используемые экранами → компоненты Lucide (`<Icon>`)                              |
| `constants/providers.ts`         | **376 провайдеров** с валидацией Zod (источник истины)                                                       |
| `constants/cliTools.ts`          | Реестр внешних CLI-инструментов                                                                              |
| `constants/routingStrategies.ts` | **20 стратегий маршрутизации** с приоритетами                                                                |
| `constants/publicApiRoutes.ts`   | Маршруты, требующие аутентификации Bearer (в отличие от management)                                          |
| `constants/upstreamHeaders.ts`   | Список запрещённых заголовков для восходящих запросов                                                        |
| `validation/schemas.ts`          | ~80 схем Zod (единый источник истины для контрактов API)                                                     |
| `validation/helpers.ts`          | Вспомогательные средства валидации Zod (`validateBody` и т. д.)                                              |
| `types/`                         | Общие типы TS                                                                                                |
| `contracts/`                     | Контракты публичного API (используются `files:` в `package.json`)                                            |
| `utils/circuitBreaker.ts`        | Автоматический выключатель провайдеров (см. `docs/architecture/RESILIENCE_GUIDE.md`)                         |
| `utils/apiAuth.ts`               | Проверка ключей API и областей доступа                                                                       |
| `utils/fetchTimeout.ts`          | Обёртки тайм-аута/прерывания для восходящих запросов fetch                                                   |
| `utils/releaseNotes.ts`          | Парсер закрытых объявлений v2/legacy, локализация и отклонение по ID                                         |

---

## `open-sse/` — Рабочее пространство потокового движка

Отдельное рабочее пространство npm (`@omniroute/open-sse`). Обрабатывает запросы и выполняет вызовы провайдеров.

```
open-sse/
├── handlers/            # 16 файлов (12 обработчиков + 4 вспомогательных модуля): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search и т. д.
├── executors/           # 150 модулей-исполнителей (классы, расширяющие BaseExecutor, и вспомогательные модули для отдельных провайдеров)
├── translator/          # Конвертеры форматов (9 для запросов, 9 для ответов, 9 вспомогательных)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ сервисных модулей (combo, accountFallback, autoCombo, reasoningCache, скрытый режим claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM и т. д.)
├── mcp-server/          # MCP-сервер (110 инструментов, 3 транспорта, 33 области доступа)
├── config/              # Реестры провайдеров/моделей, конфигурация заголовков, псевдонимы моделей
├── utils/               # TLS-клиент, получение данных/диспетчер через прокси, вспомогательные сетевые модули
├── index.ts             # Точка входа рабочего пространства
├── package.json         # Манифест рабочего пространства
├── tsconfig.json        # Конфигурация TS рабочего пространства
└── types.d.ts           # Объявления типов рабочего пространства
```

### `open-sse/mcp-server/`

| Путь                        | Назначение                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `server.ts`                 | Жизненный цикл MCP-сервера (транспорты stdio + HTTP)                                      |
| `httpTransport.ts`          | Потоковый HTTP + SSE-транспорты (`/api/mcp/sse`, `/api/mcp/stream`)                       |
| `audit.ts`                  | Журналирование аудита в таблицу `mcp_tool_audit`                                          |
| `scopeEnforcement.ts`       | Проверка областей доступа для каждого инструмента                                         |
| `runtimeHeartbeat.ts`       | Отправка сигнала работоспособности в `DATA_DIR/runtime/mcp-heartbeat.json`                |
| `descriptionCompressor.ts`  | Сжатие метаданных описаний инструментов для экономии контекста                            |
| `schemas/tools.ts`          | 36 базовых определений инструментов + области доступа                                     |
| `tools/advancedTools.ts`    | Реализации расширенных инструментов                                                       |
| `tools/memoryTools.ts`      | 3 инструмента памяти (поиск/добавление/очистка)                                           |
| `tools/skillTools.ts`       | 4 инструмента навыков (список/включение/выполнение/выполнения)                            |
| `tools/compressionTools.ts` | 5 инструментов сжатия                                                                     |
| `README.md`                 | Внутренний README MCP-сервера (с перекрёстной ссылкой из `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Рабочие пространства

| Путь                     | Назначение                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — встроенный снимок Keak CI UI Kit (`private`, `UNLICENSED`), используемый напрямую как исходный код (без сборки). `UPSTREAM.md` фиксирует коммит исходного репозитория и документирует разрешение по лицензии; `PATCHES.md` перечисляет локальные исправления (отсутствуют); `src/` синхронизируется только с помощью `scripts/dev/sync-ui-kit.sh` и контролируется командой `npm run check:ui-kit-snapshot`. См. `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — необязательный сервис пула браузеров (чат на базе CloakBrowser и Playwright)                                                                                                                                                                                                                                                                                                                                                                    |

---

## `electron/` — Обёртка для настольных систем

| Файл             | Назначение                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `main.js`        | Основной процесс Electron (BrowserWindow, встроенный сервер Next.js, трей, автоматическое обновление) |
| `preload.js`     | Мост IPC (contextBridge → `window.omniroute`)                                                         |
| `package.json`   | Конфигурация electron-builder + зависимости Electron 41 и electron-builder 26.10                      |
| `assets/`        | Значки приложения (Windows .ico, macOS .icns, Linux .png)                                             |
| `dist-electron/` | Выходные данные сборки (игнорируются Git)                                                             |
| `types.d.ts`     | Объявления типов для моста процесса рендеринга                                                        |
| `README.md`      | Внутренний README для Electron (см. также `docs/guides/ELECTRON_GUIDE.md`)                            |

---

## `bin/` — CLI

| Файл                                                                                                        | Назначение                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Основная точка входа CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` и т. д. |
| `reset-password.mjs`                                                                                        | Автономный CLI для сброса пароля                                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Интерактивный и неинтерактивный мастер настройки                                                                                       |
| `cli/commands/doctor.mjs`                                                                                   | Диагностика состояния системы (более 8 проверок)                                                                                       |
| `cli/commands/providers.mjs`                                                                                | Просмотр списка, тестирование и проверка провайдеров                                                                                   |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Вспомогательные модули CLI                                                                                                             |
| `cli/tray/tray.ts`                                                                                          | Интеграция с системным треем (кроссплатформенная: NotifyIcon в Windows, systray2 в macOS/Linux)                                        |
| `cli/tray/tray.ps1`                                                                                         | Бэкенд NotifyIcon на PowerShell (Windows, без новых бинарных файлов)                                                                   |
| `cli/tray/autostart.ts`                                                                                     | Кроссплатформенный автозапуск (LaunchAgent / .desktop / реестр)                                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Пятиэтапная цепочка разрешения драйвера SQLite (встроенный → среда выполнения → отложенная установка → node:sqlite → sql.js)           |
| `cli/runtime/magicBytes.mjs`                                                                                | Проверка магических байтов бинарных файлов (ELF / Mach-O / Mach-O fat / PE)                                                            |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — предварительно разрешает драйверы при postinstall / первом запуске                                                |
| `nodeRuntimeSupport.mjs`                                                                                    | Проверка поддерживаемой версии Node.js при установке                                                                                   |

---

## `skills/` — Публичные навыки агентов

| Файл                         | Назначение                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 манифестов навыков для внешних ИИ-агентов (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Скрипты сборки и проверки

| Скрипт                              | Назначение                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Запуск разработки/приложения с загрузкой переменных окружения                                                  |
| `build-next-isolated.mjs`           | Автономная сборка (Next.js 16 standalone)                                                                      |
| `prepublish.ts`                     | Подготовка пакета перед `npm pack`                                                                             |
| `postinstall.mjs`                   | Автоматическое создание `.env` из `.env.example` при первой установке                                          |
| `sync-env.mjs`                      | Повторная синхронизация ключей `.env` с `.env.example`                                                         |
| `check-cycles.mjs`                  | Обнаружение циклических зависимостей                                                                           |
| `check-route-validation.mjs`        | Проверка наличия валидации Zod во всех маршрутах API                                                           |
| `check-t11-any-budget.mjs`          | Обеспечение соблюдения явного лимита `any` для каждого файла                                                   |
| `check-docs-sync.mjs`               | Проверка синхронизации версий документации (существующая проверка перед коммитом)                              |
| **`check-env-doc-sync.mjs`**        | НОВОЕ: перекрёстная проверка переменных окружения в коде, `.env.example` и `ENVIRONMENT.md`                    |
| **`check-docs-counts-sync.mjs`**    | НОВОЕ: проверка соответствия количества исполнителей, стратегий, OAuth и навыков A2A документации              |
| **`check-deprecated-versions.mjs`** | НОВОЕ: выявление устаревших версий/дат в документации                                                          |
| `check-supported-node-runtime.ts`   | Проверка поддержки текущей версии Node                                                                         |
| `check-pr-test-policy.mjs`          | Обеспечение соблюдения правила «тесты обязательны» при изменениях рабочего кода                                |
| **`gen-provider-reference.ts`**     | НОВОЕ: автоматическое создание `docs/reference/PROVIDER_REFERENCE.md` из каталога                              |
| `i18n/generate-multilang.mjs`       | Перевод строк пользовательского интерфейса и документации через Google Translate                               |
| `i18n_autotranslate.py`             | Конвейер перевода документации на основе LLM                                                                   |
| `validate_translation.py`           | Проверка перевода для каждой локали                                                                            |
| `check_translations.py`             | Проверка ключей i18n в коде                                                                                    |
| `run-playwright-tests.mjs`          | Средство запуска E2E-тестов Playwright                                                                         |
| `run-protocol-clients-tests.mjs`    | Средство запуска E2E-тестов MCP/A2A                                                                            |
| `run-ecosystem-tests.mjs`           | Тесты экосистемы (интеграции с провайдерами)                                                                   |
| `test-report-summary.mjs`           | Создание сводки покрытия в формате Markdown                                                                    |
| `smoke-electron-packaged.mjs`       | Дымовое тестирование упакованной сборки Electron                                                               |
| `native-binary-compat.mjs`          | Проверка соответствия нативных зависимостей (`better-sqlite3`) версии Node в Electron                          |
| `validate-pack-artifact.ts`         | Проверка выходного артефакта npm pack                                                                          |
| `responses-ws-proxy.mjs`            | Мост WebSocket для API Codex Responses                                                                         |
| `v1-ws-bridge.mjs`                  | Мост WebSocket для конечной точки `/api/v1/ws`                                                                 |
| `standalone-server-ws.mjs`          | Средство запуска автономного сервера WS                                                                        |
| `system-info.mjs`                   | Вывод информации о системе/среде выполнения для службы поддержки                                               |
| `healthcheck.mjs`                   | Однократная проверка работоспособности (используется Docker HEALTHCHECK)                                       |
| `uninstall.mjs`                     | Скрипт полной деинсталляции                                                                                    |
| `dev/sync-ui-kit.sh`                | Копирование `src/` из CI UI Kit на зафиксированном коммите в `packages/ui-kit/src`                             |
| `check/check-ui-kit-snapshot.mjs`   | Проверка перед коммитом: `packages/ui-kit/src` соответствует зафиксированному коммиту вышестоящего репозитория |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — используемые имена значков, для которых отсутствует сопоставление в `ICON_MAP`        |
| `dev/codemod-material-icons.mjs`    | Замена литеральных элементов span Material Symbols на `<Icon>` (инструмент миграции)                           |

---

## `docs/` — Публичная документация (7 корневых файлов + 17 подкаталогов)

### Руководства верхнего уровня

| Документ                    | Назначение                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Высокоуровневая архитектура, карта подсистем, поверхность дашборда                                          |
| `CODEBASE_DOCUMENTATION.md` | Инженерный справочник: каталоги, модули, соглашения                                                         |
| `FEATURES.md`               | Матрица функций с ключевыми нововведениями v3.8                                                             |
| `USER_GUIDE.md`             | Руководство конечного пользователя (установка, модели, комбо, CLI, аудио и т. д.)                           |
| `API_REFERENCE.md`          | Справочник по эндпоинтам API с моделью аутентификации                                                       |
| `openapi.yaml`              | Спецификация OpenAPI 3.0 (121 путь)                                                                         |
| `SETUP_GUIDE.md`            | Способы установки (npm, npx, Docker, Electron, Termux, из исходников)                                       |
| `ENVIRONMENT.md`            | Все переменные окружения (~800 задокументировано, ~3 050 строк `.env.example`)                              |
| `TROUBLESHOOTING.md`        | Распространённые ошибки + известные проблемы v3.8.0                                                         |
| `RELEASE_CHECKLIST.md`      | Полный процесс релиза (скиллы, husky, conventional commits, деплой)                                         |
| `COVERAGE_PLAN.md`          | Цели по покрытию и текущее состояние                                                                        |
| `FREE_TIERS.md`             | Подобранные провайдеры с бесплатным тарифом (48+ бесплатных + 11 OAuth)                                     |
| `CLI-TOOLS.md`              | Интеграции внешних CLI + внутренний OmniRoute CLI                                                           |
| `I18N.md`                   | Архитектура i18n, добавление языка, 67 локалей                                                              |
| `UNINSTALL.md`              | Шаги чистого удаления                                                                                       |
| `PROVIDER_REFERENCE.md`     | **Автоматически сгенерированный** каталог 376 провайдеров (перегенерация: `npm run gen:provider-reference`) |

### Подробные описания подсистем

| Документ                                        | Назначение                                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                 | Сервер MCP: 110 инструментов, 3 транспорта, 33 области, REST-эндпоинты             |
| `A2A-SERVER.md`                                 | A2A v0.3: JSON-RPC, 6 скиллов, REST-хелперы, карточка агента                       |
| `AGENT_PROTOCOLS_GUIDE.md`                      | Единое руководство: A2A против ACP против Cloud Agents                             |
| `CLOUD_AGENT.md`                                | Оркестрация Codex Cloud / Devin / Jules                                            |
| `SKILLS.md`                                     | Фреймворк скиллов (встроенные + маркетплейс + SkillsSH + песочница)                |
| `RADAR.md`                                      | Оверлей каталога бесплатных моделей Radar (`RADAR_ENABLED`, по умолчанию выключен) |
| `MEMORY.md`                                     | Система памяти (SQLite FTS5 + Qdrant)                                              |
| `EVALS.md`                                      | Фреймворк оценки (наборы, прогоны, рубрики)                                        |
| `GUARDRAILS.md`                                 | Маскировка PII, внедрение промптов, мост для vision                                |
| `COMPLIANCE.md`                                 | Журнал аудита, хранение, отказ от логирования через noLog                          |
| `WEBHOOKS.md`                                   | Доставка вебхуков с подписью HMAC                                                  |
| `REASONING_REPLAY.md`                           | Гибридный кэш в памяти/SQLite для `reasoning_content`                              |
| `AUTHZ_GUIDE.md`                                | Конвейер авторизации (`classify` → `policies` → `enforce`)                         |
| `RESILIENCE_GUIDE.md`                           | Circuit breaker + кулдаун + блокировка модели                                      |
| `docs/security/STEALTH_GUIDE.md` (только в git) | Фингерпринтинг TLS (JA3/JA4), Claude Code CCH, сертификат MITM                     |
| `AUTO-COMBO.md`                                 | Движок Auto Combo (16-факторная оценка, 6 пакетов режимов, виртуальная фабрика)    |

### Сжатие

| Документ                        | Назначение                               |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Обзор режимов сжатия + дорожная карта    |
| `COMPRESSION_ENGINES.md`        | Движки Caveman + RTK, контракт реестра   |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-схема пакета правил Caveman         |
| `COMPRESSION_LANGUAGE_PACKS.md` | Инвентаризация пакетов правил по языкам  |
| `RTK_COMPRESSION.md`            | Декларативный конвейер RTK (56 фильтров) |

### Развёртывание

| Документ                     | Назначение                                                                  |
| ---------------------------- | --------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Сборка Docker, профили (base/cli/host/cliproxyapi), sidecar-контейнер Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Развёртывание на обычной VM/VPS (Ubuntu/Debian + nginx + systemd)           |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Развёртывание на Fly.io (пока доступно только на китайском)                 |
| `TERMUX_GUIDE.md`            | Headless-режим на Android через Termux                                      |
| `PWA_GUIDE.md`               | Установка Progressive Web App + service worker                              |
| `ELECTRON_GUIDE.md`          | Сборка, подписание и распространение десктопного приложения                 |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                      |
| `PROXY_GUIDE.md`             | 4-уровневый исходящий прокси + маркетплейс 1proxy                           |

### Подкаталоги

| Подкаталог            | Назначение                                                                                                                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Переводы документации (41 локаль)                                                                                                                                                                                                              |
| `docs/screenshots/`   | Изображения для руководств                                                                                                                                                                                                                     |
| `_tasks/superpowers/` | Планы/спецификации от superpowers (`writing-plans`/`brainstorming`) + исследования — изолированный репозиторий с отдельным версионированием, исключённый из основного дерева через gitignore. См. CLAUDE.md → «Planning & Research Artifacts». |

---

## `tests/` — Наборы тестов

| Подкаталог                           | Тип                                              | Средство запуска                                        |
| ------------------------------------ | ------------------------------------------------ | ------------------------------------------------------- |
| `tests/unit/`                        | Модульные тесты (~4 800 файлов, самые быстрые)   | Встроенное средство запуска тестов Node                 |
| `tests/integration/`                 | Интеграционные тесты нескольких модулей и БД     | Встроенное средство запуска тестов Node (concurrency 1) |
| `tests/e2e/`                         | Сквозные тесты интерфейса и рабочих процессов    | Playwright                                              |
| `tests/e2e/protocol-clients.test.ts` | Сквозные тесты MCP и A2A с реальными клиентами   | Пользовательские клиенты протоколов                     |
| `tests/e2e/ecosystem.test.ts`        | Интеграция с провайдерами (с сетевыми запросами) | Встроенное средство запуска тестов Node                 |

---

## `public/` — Статические ресурсы

| Путь                | Назначение                                                                |
| ------------------- | ------------------------------------------------------------------------- |
| `public/` (корень)  | Фавиконы, robots.txt, манифест, service worker, маркетинговые изображения |
| `public/providers/` | Логотипы провайдеров в формате PNG/SVG (используются в панели управления) |

---

## `config/` — Статические конфигурации и состояние проверок качества

Поставляемые шаблоны конфигурации и зафиксированные базовые показатели проверок качества
(перемещены сюда из корня репозитория в v3.8.26, чтобы не перегружать корень).

| Путь                                          | Назначение                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Список локалей и метаданные (канонический источник количества из 42 локалей)                      |
| `config/i18n-schema.json`                     | Схема JSON для проверки `i18n.json`                                                               |
| `config/payloadRules.json`                    | Правила очистки входящих полезных данных                                                          |
| `config/quality/quality-baseline.json`        | Пороговые базовые показатели по нескольким метрикам (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Зафиксированные базовые показатели сложности ESLint (`check-complexity.mjs`)                      |
| `config/quality/duplication-baseline.json`    | Зафиксированные базовые показатели дублирования jscpd (`check-duplication.mjs`)                   |
| `config/quality/file-size-baseline.json`      | Зафиксированные базовые показатели размера для каждого файла (`check-file-size.mjs`)              |
| `config/quality/test-discovery-baseline.json` | Зафиксированные базовые показатели потерянных тестов (`check-test-discovery.mjs`)                 |
| `config/quality/dependency-allowlist.json`    | Список разрешённых зависимостей (`check-deps.mjs`)                                                |
| `config/quality/.license-allowlist.json`      | Список разрешённых лицензий SPDX (`check-licenses.mjs`)                                           |
| `config/quality/quality-metrics.json`         | Временные собранные метрики (создаются `collect-metrics.mjs`; **игнорируются Git**)               |

---

## `.github/` — Интеграция с GitHub

| Путь                               | Назначение                                                                |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `.github/workflows/`               | Рабочие процессы CI/CD в GitHub Actions (линтинг, тесты, покрытие, релиз) |
| `.github/ISSUE_TEMPLATE/`          | Шаблоны сообщений об ошибках и запросов функций                           |
| `.github/pull_request_template.md` | Шаблон PR                                                                 |
| `.github/dependabot.yml`           | Конфигурация обновления зависимостей                                      |

---

## `.husky/` — Git-хуки

| Файл         | Назначение                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| `pre-commit` | Запускает `lint-staged + check-docs-sync + check:any-budget:t11`           |
| `pre-push`   | Сейчас отключён (закомментирован). Запускайте `npm run test:unit` вручную. |
| `_/`         | Внутренние компоненты Husky                                                |

---

## `.claude/` — Slash-команды Claude Code

| Файл                                                | Назначение                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — повышение версии + автоматический список изменений |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — полный процесс выпуска релиза                  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Развёртывание на VPS                                                    |
| `commands/capture-release-evidences-cc.md`          | Запись новых функций в браузере в формате WebP                          |
| `commands/review-{prs,discussions}-cc.md`           | Сортировка PR и обсуждений GitHub                                       |
| `commands/{review-issues,implement-features}-cc.md` | Рабочие процессы для задач                                              |
| `settings.local.json`                               | Настройки Claude Code для конкретного проекта                           |

---

## `.agents/` — Универсальные рабочие процессы агентов (Codex / Cursor / и т. д.)

| Путь                     | Назначение                                                              |
| ------------------------ | ----------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 определений рабочих процессов (зеркальная копия `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 определений навыков с примечаниями по выполнению в Codex              |

> **Примечание:** Сейчас рабочие процессы и команды побайтово идентичны. Если `.agents/` предназначен для другой среды выполнения агентов (Codex), варианты должны иметь существенные различия.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Вне основного дерева

Эти каталоги с префиксом подчёркивания содержат материалы, не включаемые в поставку:

- **`_ideia/`** — заметки по проектированию (категории defer / notfit / viable)
- **`_mono_repo/`** — исторические подпроекты (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — доступные только для чтения клоны связанных OSS-проектов (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api и т. д.) для перекрёстного анализа во время разработки
- **`_tasks/`** — неформальные файлы отслеживания задач для каждого релиза

Не включаются в вывод `npm pack`. См. `.npmignore`.

---

## Генерируемые / игнорируемые Git

| Путь                   | Назначение                        |
| ---------------------- | --------------------------------- |
| `node_modules/`        | зависимости npm                   |
| `.next/`               | результаты сборки Next.js         |
| `coverage/`            | отчёты о покрытии c8              |
| `logs/`                | журналы выполнения                |
| `package/`             | промежуточные файлы npm pack      |
| `.playwright-mcp/`     | тестовые артефакты Playwright MCP |
| `.issues/`             | локальный кеш задач               |
| `tsconfig.tsbuildinfo` | кеш инкрементальной компиляции TS |

---

## Советы по навигации

- **Новый участник проекта?** Прочитайте `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Добавляете провайдер?** Следуйте разделу `docs/architecture/ARCHITECTURE.md § Adding a New Provider` и сверьтесь с `docs/reference/PROVIDER_REFERENCE.md`.
- **Добавляете маршрут?** См. `docs/architecture/ARCHITECTURE.md § Adding a New API Route` и `src/shared/validation/schemas.ts`.
- **Добавляете инструмент MCP?** См. `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Добавляете навык A2A?** См. `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Запускаете локально?** См. `docs/guides/SETUP_GUIDE.md`.
- **Выполняете развёртывание?** См. `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Выпускаете релиз?** См. `docs/ops/RELEASE_CHECKLIST.md` (а также навык Claude Code `/generate-release-cc`).
