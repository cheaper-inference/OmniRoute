# Plugin Marketplace (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Джерело істини:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` та
> `src/app/(dashboard)/dashboard/plugins/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute постачається із системою плагінів у стилі WordPress. Плагіни — це самодостатні
каталоги, кожен із маніфестом `plugin.json` і вхідним файлом, які підключаються
до конвеєра запитів (`onRequest` / `onResponse` / `onError`) і до
подій життєвого циклу (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Маркетплейс плагінів** — це рівень пошуку й огляду поверх цієї системи. Він
надає каталог доступних для встановлення плагінів із можливістю перегляду. За замовчуванням каталогом є
невеликий вбудований початковий реєстр; оператор може вказати URL власного віддаленого
реєстру, і в такому разі отримання даних захищається SSRF-запобіжником із перевіркою DNS
(див. [Безпека](#security)).

Кожен маршрут плагінів доступний **лише через loopback** (рівень 1 — `LOCAL_ONLY`): плагіни завантажують
і виконують код у дочірніх процесах, тому маршрути недоступні з джерел,
що не є loopback, незалежно від автентифікації. Див.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Як це підходить Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Рівень реєстру** — `src/lib/plugins/marketplace.ts`: перераховує / шукає в каталозі, повертаючись до початкового реєстру в разі будь-якої помилки.
- **Рівень життєвого циклу** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): встановлення, оновлення, активація, дезактивація, видалення, сканування, завантаження під час запуску.
- **Маніфестний шар** — `src/lib/plugins/manifest.ts`: схема Zod + за замовчуванням для `plugin.json`.
- **Сканер** — `src/lib/plugins/scanner.ts`: виявляє плагіни на диску в каталозі плагінів.
- **Навантажувач** — `src/lib/plugins/loader.ts`: створює кожен плагін в окремому дочірньому процесі Node.js, а брокери підключають виклики через IPC. Дочірній елемент не є пісочницею (див. «Ізоляція виконання плагіна» нижче).

## Каталог маркетплейсу

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) повертає список
об’єктів `MarketplaceEntry`:

| Поле          | Тип      | Примітки                                      |
| ------------- | -------- | --------------------------------------------- |
| `name`        | string   | Назва плагіна в kebab-case                    |
| `version`     | string   | semver                                        |
| `description` | string   | Короткий опис                                 |
| `author`      | string   | Автор / організація                           |
| `license`     | string   | Ідентифікатор ліцензії у стилі SPDX           |
| `downloadUrl` | string   | URL завантаження джерела (може бути порожнім) |
| `repository`  | string?  | Необов’язковий URL репозиторію                |
| `tags`        | string[] | Теги для пошуку/фільтрації                    |
| `downloads`   | number   | Кількість завантажень                         |
| `rating`      | number   | 0–5                                           |
| `verified`    | boolean  | Чи позначено запис як перевірений             |
| `lastUpdated` | string   | Рядок дати у форматі, подібному до ISO        |

Якщо URL власного реєстру не налаштовано, каталогом є вбудований
`SEED_REGISTRY` (наразі `request-logger`, `rate-limiter`, `cost-tracker` і
`theme-manager`). Початковий реєстр доступний завжди — якщо налаштований віддалений
реєстр недоступний, повертає статус, відмінний від `200`, або повертає нерозпізнане
тіло відповіді, `listMarketplacePlugins()` записує попередження до журналу та повертається до початкового списку.

> Примітка: **каталог** маркетплейсу (перегляд/пошук) повністю інтегровано, але
> встановлення з каталогу одним натисканням у маркетплейсі ще не реалізовано —
> кнопка "Встановити" для запису маркетплейсу на панелі керування наразі показує
> повідомлення "незабаром". Нині встановлення виконується через процес установлення
> з локального шляху (`POST /api/plugins`) і виявлення на диску (`POST /api/plugins/scan`).

## REST API

Для всіх кінцевих точок потрібна автентифікація керування (`requireManagementAuth`)** і** є лише петлевими — `/api/plugins` і `/api/plugins/` перераховані в `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Кінцева точка                      | метод  | опис                                                                 |
| ---------------------------------- | ------ | -------------------------------------------------------------------- |
| `/api/plugins`                     | GET    | Список встановлених плагінів (додатковий фільтр `?status=` )         |
| `/api/plugins`                     | POST   | Встановіть плагін із каталогу джерел плагінів                        |
| `/api/plugins/scan`                | POST   | Проскануйте каталог плагінів і зареєструйте нові плагіни             |
| `/api/plugins/marketplace`         | GET    | Перелік записів каталогу ринку                                       |
| `/api/plugins/marketplace/install` | POST   | Встановіть плагін Marketplace за назвою                              |
| `/api/plugins/[name]`              | GET    | Отримайте деталі встановленого плагіна                               |
| `/api/plugins/[name]`              | DELETE | Видаліть плагін                                                      |
| `/api/plugins/[name]/activate`     | POST   | Активувати (завантажити хуки реєстру + )                             |
| `/api/plugins/[name]/deactivate`   | POST   | Дезактивувати (запустити `onDeactivate`, скасувати реєстрацію хуків) |
| `/api/plugins/[name]/config`       | GET    | Отримати схему конфігурації плагіна +                                |
| `/api/plugins/[name]/config`       | PUT    | Оновити конфігурацію плагіна (перевірено за схемою)                  |

Фільтр `GET /api/plugins` `status` приймає один із `installed` / `active` / `inactive` / `error`. Недійсне значення повертає `400`.

### Список встановлених плагінів

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Встановити з локального шляху

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` має бути an** абсолютний** шлях до каталогу** у каталозі джерел плагіна** : `plugin-sources` поруч із коренем плагіна, тому `~/.omniroute/plugin-sources/` за замовчуванням або `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` коли цю змінну встановлено (`getPluginSourcesDir()` у `src/lib/plugins/installSource.ts`). Спершу скопіюйте або клонуйте туди плагін. У встановленні відмовляється за допомогою `400` якщо шлях містить `..` або нульовий байт, лежить за межами цього каталогу, розв’язується за його межами через символічне посилання, містить символічне посилання, мета якого знаходиться поза ним, або коли каталог не існує. Вихідний каталог має містити дійсний `plugin.json` (або бути батьківським). У разі успіху відповіддю буде `201` із встановленим рядком плагіна.

На відміну від інших маршрутів плагінів, для цього потрібні облікові дані керування (сеанс інформаційної панелі або ключ API з областю керування), навіть якщо вхід вимкнено (`requireLogin=false`): встановлення коду ніколи не є анонімною дією. Те саме стосується `POST /api/plugins/marketplace/install` (body `{ "name": "<plugin>" }`).

### Перегляньте ринок

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Оновити конфігурацію плагіна

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` перевіряє тіло на відповідність `configSchema` плагіна (заявленому в маніфесті) за допомогою `validatePluginConfig()` із `src/lib/plugins/manifest.ts`: кожен ключ має бути оголошено в схемі, значення мають відповідати заявленому типу, поля `number` відповідають `min`/`max`, а поля `select` мають відповідати заявленому `enum`. Будь-яке порушення повертає `400` і нічого не зберігається. Плагін, який не оголошує `configSchema` не має конфігурованих ключів, тому запит відхиляється за допомогою `400` («Плагін не оголошує жодних конфігурованих ключів»).

## Конфігурація

### Каталог плагінів

Плагіни зберігаються в каталозі даних OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (або файл, на який указує manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) визначає цей каталог у
три етапи:

1. **`OMNIROUTE_PLUGINS_DIR`**, якщо задано — використовується без змін, незалежно від значення `HOME`. Це
   явний параметр для Docker/K8s, де дерево плагінів монтується через bind mount за шляхом,
   який зазвичай не має жодного стосунку до домашнього каталогу контейнера (#11827).
2. `<home>/.omniroute/plugins`, де `<home>` визначається зі змінних середовища `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, якщо процес узагалі не експортує домашній каталог.

Визначений каталог один раз записується до журналу під час запуску як `scanner.dir_resolved`
із зазначенням використаного вхідного параметра (`OMNIROUTE_PLUGINS_DIR`, `home` або
`no-home-fallback`) — тому образ, який непомітно переходить до етапу 3, повідомляє про це,
а не лише про порожній список плагінів. `POST /api/plugins/scan` виявляє всі підкаталоги
в ньому, що містять дійсний `plugin.json`, і реєструє їх; цей самий каталог є кореневим
каталогом, до якого `pluginManager.install()` копіює плагіни, тому перевизначення одночасно
переміщує місце виявлення та встановлення.

> **`OMNIROUTE_PLUGINS_DIR` — це не `OMNIROUTE_PLUGIN_PATH`.** Останню змінну читає лише
> завантажувач командних плагінів CLI (`bin/cli/plugins.mjs`), щоб знаходити npm-пакети
> `omniroute-cmd-*`, які додають підкоманди `omniroute`, — вона не впливає на описаний
> тут сканер середовища виконання. Докладніше про це див. у [PLUGINS.md](./PLUGINS.md).

### Власна URL-адреса реєстру маркетплейсу

Джерело каталогу маркетплейсу зчитується з параметра `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` читає `settings.pluginMarketplaceUrl`). Якщо
йому задано URL-адресу `http(s)`, `listMarketplacePlugins()` отримує дані із цієї
адреси та приймає або JSON-масив записів верхнього рівня, або об’єкт із масивом
`plugins`; записи без рядкового значення `name` відфільтровуються. Якщо параметр
не задано (або якщо отримання даних не проходить захист від SSRF / повертає
некоректну відповідь), використовується вбудований початковий реєстр.

Вкладка панелі керування «Маркетплейс» містить поле для цієї URL-адреси (значення
зчитується через `GET /api/settings`).

> Примітка щодо реалізації: дія «Зберегти» на панелі керування надсилає
> `pluginMarketplaceUrl` до `PATCH /api/settings`. На момент написання цього
> документа цей ключ не оголошено в `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), тому перш ніж покладатися на нього,
> перевірте збереження у своєму випуску — шлях **читання** (`getSettings()` →
> `listMarketplacePlugins()`) враховує цей ключ, щойно він з’являється у сховищі
> налаштувань.

## Безпека

### Лише зворотний зв’язок рівня маршруту —

Плагіни виконують код у породжених дочірніх процесах, тому вся поверхня `/api/plugins` класифікується як `LOCAL_ONLY` (рівень 1). Примусова петля виконується безумовно** раніше** будь-яка перевірка автентифікації, тож витік маркера керування, який досягає ящика через тунель, все одно не може встановити, активувати чи видалити плагін. Див. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) і жорсткі правила #15 / #17.

### Реєстр торгової площадки SSRF guard

Користувацький реєстр URL — це конфігурація, на яку може впливати зловмисник, тому перед його отриманням `listMarketplacePlugins()` перевіряє його на двох рівнях:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Відкидає все, що не є `http:` / `https:`.
   - Відхиляє буквальні хости private/loopback/link-local/ULA (IPv4** і** IPv6, включаючи IPv4-mapped) через канонічний `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Вирішує** обидва** `A` та `AAAA` записує та відхиляє if** будь-який** дозволена адреса є приватною — закриття публічного імені хоста → обхід приватного IP.
   - **Не вдається закрити** : помилка вирішення DNS відхиляє URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): повторно застосовує лише загальнодоступний захист URL під час отримання та** блокує перенаправлення** (немає публічного → приватного `30x` pivot).

URL, який не відповідає жодному з рівнів, не перериває запит — ринок мовчки повертається до вбудованого початкового реєстру та реєструє попередження.

> Цей захист був посилений у PR #3774 спеціально для вирішення A + AAAA і використання канонічної `isPrivateHost` замість перевірки IPv4-only.

### Ізоляція виконання плагіна

> **За замовчуванням плагіни не знаходяться в ізольованому програмному середовищі.** Дочірній процес — це звичайний процес Node.js, який виконується від імені користувача OmniRoute, без контексту VM і прапорів дозволу Node.js, тому код плагіна може читати та писати будь-який файл, який може користувач, запускати програми та виходити в мережу. `requires.permissions` лише вирішує, які змінні середовища отримує дитина; інші дозволи не застосовуються. Прапор функції opt-in `PLUGIN_PERMISSION_MODEL_ENABLED` (вимкнено за замовчуванням) запускає кожен плагін відповідно до моделі дозволів Node.js, створеної з цих дозволів, за винятком `network`, який Node.js не може обмежити (див. [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0-%D0%B4%D0%BE%D0%B7%D0%B2%D0%BE%D0%BB%D1%96%D0%B2) ). Встановлюйте лише плагіни, яким довіряєте. Границя процесу нижче містить збої та зависання; це не кордон безпеки.

- **Ізоляція процесу** — `loadPlugin()` (`src/lib/plugins/loader.ts`) створює кожен плагін в окремому дочірньому процесі Node.js і спілкується через IPC. Виклики-перехоплювачі мають тайм-аут із ескалацією `SIGTERM` → `SIGKILL`.
- **Env дозволений список** — дитина отримує лише дозволений набір змінних середовища; ширший набір надається лише тоді, коли маніфест запитує дозвіл `env`.
- **Встановіть захист від джерела** — `POST /api/plugins` читає лише з каталогу вихідних кодів плагіна (див. «Встановлення з локального шляху»): шлях канонізується за допомогою `realpath`, має залишатися суворо всередині цього каталогу, а дерево вихідних кодів із символічним посиланням, яке його виходить, відхиляється до того, як щось буде скопійовано.
- **Контейнмент шляху** — install/upgrade/uninstall стверджує, що каталог плагіна та `manifest.main` вирішують** в межах** керований корінь плагіна перед будь-яким копіюванням або рекурсивним видаленням (захищає від змінених шляхів DB і проходження `../` у `manifest.main`). Активація вирішує символічні посилання через `realpath` і відмовляється завантажувати точку входу, яка виходить із каталогу плагіна.
- **Додатковий контакт цілісності** — маніфест може декларувати поле `integrity` (формат `sha256-<base64>`, SRI ). За наявності завантажувач перевіряє хеш файлу входу під час завантаження та відмовляється активувати у разі невідповідності. Це опціональне виявлення втручання,** ні** межа безпеки: вона не обмежує можливості завантаженого плагіна.
- **Немає облікових даних клієнта в хуках** — контекст, переданий до `onRequest`, `onResponse` і `onError` має видалені заголовки `authorization`, `x-api-key`, `proxy-authorization` і `cookie`, а запис ключа API не містить значення ключа (`redactPluginContext()` у `src/lib/plugins/hooks.ts`).

## Маніфест (`plugin.json`)

Перевірено `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Поле               | Тип       | Примітки                                                           |
| ------------------ | --------- | ------------------------------------------------------------------ |
| `name`             | рядок     | обов'язковий; кебаб-корпус (`^[a-z0-9-]+$`), 1–100 знаків          |
| `version`          | рядок     | обов'язковий; semver (`MAJOR.MINOR.PATCH`)                         |
| `description`      | рядок?    | ≤ 500 символів                                                     |
| `author`           | рядок?    | ≤ 200 символів                                                     |
| `license`          | рядок?    | За замовчуванням `MIT`                                             |
| `main`             | рядок?    | Вхідний файл; за замовчуванням `index.js`                          |
| `source`           | перелік?  | `local` \| `marketplace` (за замовчуванням `local`)                |
| `tags`             | рядок []? | Пошук тегів                                                        |
| `requires`         | об'єкт?   | `{ omniroute?, permissions[] }`                                    |
| `hooks`            | об'єкт?   | Логічні значення, які оголошують, які перехоплення реалізує плагін |
| `skills`           | об'єкт[]? | Додаткові визначення навичок                                       |
| `enabledByDefault` | логічний? | Автоматична активація під час встановлення                         |
| `configSchema`     | об'єкт?   | Карта конфігураційних полів (`string`/`number`/`boolean`/`select`) |
| `integrity`        | рядок?    | Додатковий PIN-код файлу запису `sha256-<base64>`                  |

Дозволи беруться з переліку `network` / `file-read` / `file-write` / `env` / `exec`. Лише `env` має ефект виконання (трохи більший список дозволених змінних середовища для дитини); інші є деклараціями і не виконуються.

## Життєвий цикл

```
install (POST /api/plugins, шлях)
  → сканування/перевірка маніфесту → копіювання до проміжного каталогу → перевірка, що main розташований у каталозі
  → атомарне перейменування в ~/.omniroute/plugins/<name> → вставлення рядка до БД
  → виклик onInstall → якщо enabledByDefault: активація

activate (POST /api/plugins/{name}/activate)
  → перевірка належності realpath → loadPlugin() (запуск дочірнього процесу)
  → реєстрація оголошених хуків → status = "active" → виклик onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → виклик onDeactivate (ПЕРЕД скасуванням реєстрації) → скасування реєстрації хуків
  → завершення дочірнього процесу → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → деактивація, якщо активний → виклик onUninstall
  → рекурсивне видалення каталогу плагіна з перевіркою належності → видалення рядка з БД
```

Повторний запуск `install` для каталогу, версія в маніфесті якого **строго
новіша** за встановлену версію, автоматично виконує оновлення (чисте повторне встановлення; конфігурація скидається
до значень за замовчуванням). Та сама або старіша версія відхиляється.

## База даних

Таблиця `plugins` (міграція `076_create_plugins.sql`):

| Стовпець        | Тип     | Примітки                                                     |
| --------------- | ------- | ------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                         |
| `name`          | TEXT    | Унікальне значення                                           |
| `version`       | TEXT    | semver; за замовчуванням `1.0.0`                             |
| `description`   | TEXT    | Необов'язкове значення                                       |
| `author`        | TEXT    | Необов'язкове значення                                       |
| `license`       | TEXT    | За замовчуванням `MIT`                                       |
| `main`          | TEXT    | Вхідний файл; за замовчуванням `index.js`                    |
| `source`        | TEXT    | За замовчуванням `local`                                     |
| `tags`          | TEXT    | Масив JSON; за замовчуванням `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`             |
| `enabled`       | INT     | 0/1; за замовчуванням 0                                      |
| `manifest`      | TEXT    | Повний JSON маніфесту                                        |
| `config`        | TEXT    | JSON; за замовчуванням `{}`                                  |
| `config_schema` | TEXT    | JSON; за замовчуванням `{}`                                  |
| `hooks`         | TEXT    | Масив JSON з іменами оголошених хуків; за замовчуванням `[]` |
| `permissions`   | TEXT    | Масив JSON; за замовчуванням `[]`                            |
| `plugin_dir`    | TEXT    | Абсолютний шлях до каталогу встановлення                     |
| `error_message` | TEXT    | Задається, коли `status = "error"`                           |
| `installed_at`  | TEXT    | `datetime('now')`                                            |
| `updated_at`    | TEXT    | `datetime('now')`                                            |
| `activated_at`  | TEXT    | Задається під час активації                                  |

Метрики й аналітика плагінів відстежуються в додаткових таблицях
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Приладова панель

Сторінка інформаційної панелі на `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) містить дві вкладки:

- **встановлено** — містить список встановлених плагінів із заявленими хуками, перемикачем activate/deactivate, кнопкою видалення та дією «Сканувати плагіни» (`POST /api/plugins/scan`).
- **Ринок** — показує каталог із `GET /api/plugins/marketplace` із полем для встановлення спеціального реєстру URL.

На сторінці завжди відображається попередження про те, що плагіни працюють із повними привілеями процесу OmniRoute.

Сторінка конфігурації кожного плагіна знаходиться в `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Див. також

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  чому `/api/plugins` доступний лише через loopback (рівень 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — пов’язаний фреймворк навичок
  (`src/lib/skills/`); плагіни можуть оголошувати навички у своєму маніфесті
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — вихідні інтеграції,
  керовані подіями
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  шаблон `buildErrorBody()`, який кожен маршрут плагіна використовує для відповідей про помилки
