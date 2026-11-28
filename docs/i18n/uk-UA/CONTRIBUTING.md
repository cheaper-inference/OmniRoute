# Contributing to OmniRoute (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Налаштування розробки

### передумови

- **Node.js** `>=22.22.2 <23` або `>=24.0.0 <27` (рекомендовано: 24 LTS)
- **npm** 10 +

> **Windows з вузлом 24:** використовуйте поточний випуск патча 24 LTS (принаймні 24.20.0). Попередні випуски можуть перериватися після успішних тестів, коли `--test-force-exit` закриває процес. [Виправлення Node Windows libuv](https://github.com/nodejs/node/pull/61999) усуває цей збій під час виконання; увімкніть тестові твердження та перевірки виходу з програми.

> **Користувачі npm v11 + (вузол 24 +):** Після `npm install` перевірте, чи встановлено власні модулі: `node -e "require('better-sqlite3')"`. Якщо це не вдається з `MODULE_NOT_FOUND`, запустіть `npm approve-scripts better-sqlite3 && npm install`. Див. [Усунення несправностей](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Клонувати та встановити

```bash
git clone https://github.com/cheaper-inference/OmniRoute.git
cd OmniRoute
npm install
```

### Змінні середовища

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ключові змінні для розвитку:

| змінна                 | Розробка за замовчуванням | опис                       |
| ---------------------- | ------------------------- | -------------------------- |
| `PORT`                 | `20128`                   | Порт сервера               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | База URL для інтерфейсу    |
| `JWT_SECRET`           | (згенерувати вище)        | секрет підпису JWT         |
| `INITIAL_PASSWORD`     | `CHANGEME`                | Перший пароль для входу    |
| `APP_LOG_LEVEL`        | `info`                    | Рівень докладності журналу |

### Налаштування інформаційної панелі

Інформаційна панель містить перемикачі UI для функцій, які також можна налаштувати за допомогою змінних середовища:

| Налаштування місцезнаходження | Перемикач               | опис                                        |
| ----------------------------- | ----------------------- | ------------------------------------------- |
| Налаштування → Advanced       | Режим налагодження      | Увімкнути журнали запитів налагодження (UI) |
| Налаштування → Загальні       | Видимість бічної панелі | розділи бічної панелі Show/hide             |

Ці параметри зберігаються в базі даних і зберігаються під час перезапусків, замінюючи значення за замовчуванням env var, якщо встановлено.

### Запуск локально

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Fast backend/API-only compile for contributor changes
npm run build:contributor

# Release build (clean rebuild + HEAD sentinel — required for deploy)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Збірка учасника виконує перевірку лише для компіляції: вона не збирає окремий дистрибутив і не збирає додаткові власні ресурси пакування. Використовуйте звичайну виробничу збірку, коли вам потрібно перевірити комплект для доставки.

### Побудувати вихідний макет

| Довідник  | Зміст                                                                     | Відстежується |
| --------- | ------------------------------------------------------------------------- | ------------- |
| `src/`    | Джерело програми (TypeScript / TSX)                                       | так           |
| `.build/` | Проміжні — `next build` вихід (gitignored, `distDir = .build/next`)       | немає         |
| `dist/`   | Пакет — який можна відправити, зібраний `assembleStandalone` (gitignored) | немає         |

Конвеєр збірки виконується за один прохід:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (copies standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` додатково спочатку очищає обидва каталоги та записує `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) як контроль цілісності розгортання.

`npm run build:contributor` використовує профіль збірки лише для серверної частини. Він тимчасово закриває файли UI панелі інструментів під час збирання, зберігає обробники маршрутів API і відновлює вихідні файли після збирання. Використовуйте `npm run build` для змін, які впливають на інформаційну панель UI, або для повної перевірки випуску; профіль учасника не є заміною збірки випуску.

> **примітка щодо розгортання VPS :** віддалений каталог зображень `/usr/lib/node_modules/omniroute/app/` не змінено. Навички розгортання rsync вміст `dist/` у нього. Переміщено лише вихідний шлях збірки в сховищі (`app/` → `dist/`).

Типовий URLs:

- **Приладова панель** : `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Робочий процес Git

> ⚠️ **НІКОЛИ не виконуйте коміти безпосередньо в `main`.** Завжди використовуйте гілки функціональності.
>
> **Базова гілка PR:** вибирайте активну гілку `release/vX.Y.Z` (а не `main`). Див.
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md), щоб дізнатися про
> модель з окремою гілкою для кожного випуску та створенням тегу під час випуску.

```bash
# Створіть гілку від останнього коміту активної гілки випуску (приклад: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... внесіть зміни ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Відкрийте Pull Request із базовою гілкою release/v3.8.49
```

### Іменування гілок

| Префікс     | Призначення                  |
| ----------- | ---------------------------- |
| `feat/`     | Нові функції                 |
| `fix/`      | Виправлення помилок          |
| `refactor/` | Реструктуризація коду        |
| `docs/`     | Зміни в документації         |
| `test/`     | Додавання/виправлення тестів |
| `chore/`    | Інструменти, CI, залежності  |

### Повідомлення комітів

Дотримуйтеся специфікації [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Області (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Запуск тестів

```bash
# Усі тести (модульні + vitest + екосистема + e2e)
npm run test:all

# Окремий тестовий файл (вбудований засіб запуску тестів Node.js — використовується для більшості тестів)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Лише модульні тести, на які вплинула ваша зміна (той самий селектор TIA, що й у перевірці CI, #8084)
npm run test:scoped            # зміни в останньому коміті (або в робочому дереві)
npm run test:scoped:staged     # лише індексовані зміни — добре поєднується із запуском перед комітом
npm run test:scoped:full       # спочатку перебудувати мапу графа імпортів (після додавання/переміщення файлів)
# Код завершення 1 + «запустіть повний набір» означає, що змінився центральний файл (tsconfig, package.json, …) або
# невідображене джерело — селектор безпечно завершується помилкою й ніколи мовчки нічого не пропускає.

# Vitest (сервер MCP, autoCombo, кеш)
npm run test:vitest

# Тести E2E (потребують Playwright)
npm run test:e2e

# E2E для клієнтів протоколів (транспорти MCP, A2A)
npm run test:protocols:e2e

# Тести сумісності з екосистемою
npm run test:ecosystem

# Поріг покриття: 60% операторів/рядків/функцій/гілок
npm run test:coverage
npm run coverage:report

# Перевірка лінтингу та форматування
npm run lint
npm run check

# Керована перевірка combo з реальними зовнішніми сервісами (потребує доступу до VPS і коштів у реальних провайдерів)
# Звертається до РЕАЛЬНИХ провайдерів — спричиняє невеликі витрати. НІКОЛИ не запускається в CI. Коректно пропускається без прапорця.
# Потрібно: доступ ssh root@192.168.0.15 (отримує з VPS знімок БД лише для читання).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Перевірка фази 3 на реальному VPS — звичайні скрипти Node ESM, які звертаються безпосередньо до робочого сервера .15.
# Потребує: доступу ssh root@192.168.0.15 (combo створюються/видаляються через SSH sqlite).
# Звертається до РЕАЛЬНИХ провайдерів (невеликі витрати). Створює/видаляє лише combo __live_test__*. НІКОЛИ не запускається в CI.
# На .15 установлено REQUIRE_API_KEY=false, тому ключ API не потрібен, але враховуються COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, якщо їх задано.
npm run test:combo:live:vps              # 7 сценаріїв HTTP (пріоритет/циклічний розподіл/зважування/вартість/об’єднання/авто + справність)
npm run test:combo:live:vps:failover     # додає реальний сценарій аварійного перемикання між провайдерами (усього 8)
```

Примітки щодо покриття:

- `npm run test:coverage` вимірює покриття вихідного коду для основного набору модульних тестів, виключає `tests/**` і включає `open-sse/**`
- Запити на злиття мають зберігати поріг покриття на рівні **60%+** операторів/рядків/функцій/гілок
- Якщо PR змінює робочий код у `src/`, `open-sse/`, `electron/` або `bin/`, у тому самому PR потрібно додати або оновити автоматизовані тести
- `npm run coverage:report` виводить докладний звіт по кожному файлу з останнього запуску перевірки покриття
- `npm run test:coverage:legacy` зберігає старішу метрику для історичного порівняння
- Поетапну дорожню карту покращення покриття дивіться в `docs/ops/COVERAGE_PLAN.md`

### Вимоги до запитів на злиття

Перед відкриттям PR скористайтеся
[рекомендованим процесом внесення змін](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), щоб виконати цільовий цикл перевірки
ваших змін. Повний набір модульних тестів (4 сегменти CI), Vitest, поріг покриття **60%+** і
робоче збирання належать до сфери відповідальності CI — їх локальний запуск не надає додаткової інформації,
якої ще не нададуть перевірки PR, а на слабших машинах він може повністю завантажити систему (#8084):

- Запустіть тестові файли, що охоплюють вашу зміну: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Запустіть `npm run lint`
- Щоразу, коли змінюється робочий код, додавайте або оновлюйте автоматизовані тести в тому самому PR
- У файлах `node:test` розміщуйте кожен `await` верхнього рівня (наприклад, `await import(...)`) перед першим `test()` / `describe()`: із `--test-force-exit` зареєстровані після нього тести можуть непомітно не запуститися (#18045; дотримання перевіряється командою `npm run check:test-tla-order`)
- Якщо змінювався робочий код, укажіть змінені або додані тестові файли в описі PR
- Перевірте результат SonarQube для PR, якщо секрети проєкту налаштовано в CI

Поточний стан тестів: **122 файли модульних тестів**, що охоплюють:

- Транслятори провайдерів і перетворення форматів
- Обмеження частоти запитів, автоматичний вимикач і відмовостійкість
- Семантичний кеш, ідемпотентність і відстеження прогресу
- Операції з базою даних і схему (21 модуль БД)
- Потоки OAuth і автентифікацію
- Валідацію кінцевих точок API (Zod v4)
- Інструменти сервера MCP і контроль областей доступу
- Системи пам’яті та навичок

---

## Стиль коду

- **ESLint** — запускайте `npm run lint` перед комітом
- **Prettier** — автоматичне форматування через `lint-staged` під час коміту (2 пробіли, крапки з комою, подвійні лапки, ширина 100 символів, кінцеві коми в стилі es5)
- **TypeScript** — увесь код у `src/` використовує `.ts`/`.tsx`; `open-sse/` використовує `.ts`/`.js`; документуйте за допомогою TSDoc (`@param`, `@returns`, `@throws`)
- **Без `eval()`** — ESLint застосовує правила `no-eval`, `no-implied-eval`, `no-new-func`
- **Валідація Zod** — використовуйте схеми Zod v4 для валідації всіх вхідних даних API
- **Іменування**: файли = camelCase/kebab-case, компоненти = PascalCase, константи = UPPER_SNAKE

### Обробка помилок / порожні блоки catch

Ніколи не залишайте `catch` без пояснення. Віднесіть його до однієї з двох категорій (це практичне втілення суворого правила «ніколи мовчки не ігнорувати помилки в потоках SSE»):

- **Навмисно (наше власне очищення/телеметрія за принципом best-effort)** — помилка тут очікувана й нешкідлива; додайте однорядковий коментар із поясненням, без журналювання (ця домовленість дає змогу уникнути шуму від журналювання кожного запиту).

  ```ts
  } catch {} // закриття вже закритого контролера після від’єднання клієнта є очікуваним
  ```

- **Слід журналювати (зовнішній/наданий викликачем код або ігнорування змінює потік керування)** — залиште `catch` (ніколи не дозволяйте йому перервати потік), але виведіть контекстне повідомлення через `console.debug`/`warn`, щоб помилку можна було виявити.

  ```ts
  } catch (e) {
    console.debug("[STREAM] помилка зворотного виклику onFailure:", e);
  }
  ```

Приклади застосування див. у `open-sse/utils/stream.ts` і `open-sse/utils/streamHandler.ts`.

---

## Структура проекту

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## Додавання нового провайдера

### Крок 1: Зареєструйте константи провайдера

Додайте їх до `src/shared/constants/providers.ts` — валідація за допомогою Zod виконується під час завантаження модуля.

### Крок 2: Додайте виконавець (якщо потрібна власна логіка)

Створіть виконавець у `open-sse/executors/your-provider.ts`, успадкувавши його від базового виконавця.

### Крок 3: Додайте транслятор (якщо формат відрізняється від OpenAI)

Створіть транслятори запитів і відповідей у `open-sse/translator/`.

### Крок 4: Додайте конфігурацію OAuth (якщо використовується OAuth)

Додайте облікові дані OAuth до `src/lib/oauth/constants/oauth.ts`, а сервіс — до `src/lib/oauth/services/`.

Якщо upstream-провайдер поширює публічний OAuth client_id/secret або ключ Firebase Web API у своєму публічному CLI / браузерному пакеті, **не** вбудовуйте його як рядковий літерал. Використовуйте `resolvePublicCred()` з `open-sse/utils/publicCreds.ts` і додайте запис із замаскованими байтами до `EMBEDDED_DEFAULTS`. Повний обов’язковий робочий процес задокументовано в [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Усередині обробників/виконавців повідомлення про помилки, що надходять клієнту, мають проходити через `buildErrorBody()` / `sanitizeErrorMessage()` з `open-sse/utils/error.ts` — ніколи не додавайте необроблені `err.stack` або `err.message` до тіла Response. Див. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Крок 5: Зареєструйте моделі

Додайте визначення моделей до `open-sse/config/providerRegistry.ts`.

### Крок 6: Додайте тести

Напишіть модульні тести в `tests/unit/`, які щонайменше охоплюють:

- Реєстрацію провайдера
- Трансляцію запитів і відповідей
- Обробку помилок

---

## Контрольний список запитів на отримання

- [ ] Тести пройдено (`npm test`)
- [ ] Лінтинг пропуски (`npm run lint`)
- [ ] Збірка успішна (`npm run build`)
- [ ] додано типи TypeScript для нових публічних функцій та інтерфейсів
- [ ] Жодних жорстко закодованих секретів чи резервних значень
- [ ] Загальнодоступні облікові дані, вбудовані через `resolvePublicCred()` (див. [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), ніколи не як літерали
- [ ] Відповіді про помилки маршрутизуються через `buildErrorBody()` / `sanitizeErrorMessage()` — без необроблених трас стека в тілах відповідей (див. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Команди оболонки (`exec` / `spawn`) передають значення часу виконання через `env`, а не через інтерполяцію рядків
- [ ] Усі вхідні дані перевірено за допомогою схем Zod
- [ ] Журнал змін** фрагмент** додано в `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` для змін, спрямованих на користувача (див. [`changelog.d/README.md`](./changelog.d/README.md) ) — do** ні** безпосередньо редагувати `CHANGELOG.md` ; фрагменти агрегуються під час випуску та ніколи не конфліктують між PRs
- [ ] Оновлена документація (якщо є)
- [ ] Нові сповіщення CodeQL /секретного сканування не відкриваються, або кожне з них відхилено з технічним обґрунтуванням із посиланням на відповідний документ `docs/security/`
- [ ] Маршрути, які породжують дочірні процеси (`/api/mcp/`, `/api/cli-tools/runtime/`), класифіковані як `isLocalOnlyPath()` у `src/server/authz/routeGuard.ts` — див. [жорстке правило #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Жодних трейлерів AI/bot `Co-authored-by` у повідомленнях комітів (Жорстке правило #16) Люди-співпрацювачі —, чия робота повторно використовується, зараховуються до стандартних трейлерів `Co-authored-by: Name <email>`

---

## Випуск релізів

Керування релізами здійснюється через робочий процес `/generate-release`. Коли створюється новий реліз GitHub, пакет **автоматично публікується в npm** за допомогою GitHub Actions.

Для розгортання на VPS використовуйте `npm run build:release` (не `npm run build`) — ця команда виконує чисту
повторну збірку, формує пакет у `dist/` і записує сигнальний файл `dist/BUILD_SHA`.
Потім використовуйте навички `/deploy-vps-*-cc`, які синхронізують `dist/` із віддаленим каталогом `app/` за допомогою rsync.

---

## Отримання допомоги

- **Архітектура** : див [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Довідник API** : див [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Документи безпеки** : [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Операційна документація** : [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Питання** : [github.com/cheaper-inference/OmniRoute/issues](https://github.com/cheaper-inference/OmniRoute/issues)
