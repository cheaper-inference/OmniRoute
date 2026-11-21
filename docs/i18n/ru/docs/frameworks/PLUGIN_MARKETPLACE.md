# Plugin Marketplace (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Источник истины:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` и
> `src/app/(dashboard)/dashboard/plugins/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute поставляется с системой плагинов в стиле WordPress. Плагины представляют собой автономные
каталоги, каждый из которых содержит манифест `plugin.json` и входной файл. Они подключаются
к конвейеру обработки запросов (`onRequest` / `onResponse` / `onError`) и к
событиям жизненного цикла (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Маркетплейс плагинов** — это уровень обнаружения, работающий поверх этой системы. Он
предоставляет доступный для просмотра каталог плагинов, которые можно установить. По умолчанию каталог представляет собой
небольшой встроенный начальный реестр; оператор может указать URL собственного удалённого
реестра, и в этом случае запрос защищается от SSRF с помощью проверки, выполняющей разрешение DNS
(см. раздел [Безопасность](#security)).

Все маршруты плагинов доступны **только через loopback** (уровень 1 — `LOCAL_ONLY`): плагины загружают
и выполняют код в дочерних процессах, поэтому эти маршруты недоступны
с источников, не относящихся к loopback, независимо от аутентификации. См.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Как это подходит для Together

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

- **Уровень реестра** — `src/lib/plugins/marketplace.ts`: перечисляет/ищет каталог, возвращаясь к исходному реестру в случае сбоя.
- **Уровень жизненного цикла** — `src/lib/plugins/manager.ts` (`pluginManager` Singleton): установка, обновление, активация, деактивация, удаление, сканирование, загрузка при запуске.
- **Слой манифеста** — `src/lib/plugins/manifest.ts`: схема Zod + по умолчанию для `plugin.json`.
- **Сканер** — `src/lib/plugins/scanner.ts`: обнаруживает плагины на диске в каталоге плагинов.
- **Погрузчик** — `src/lib/plugins/loader.ts`: порождает каждый плагин в отдельном дочернем процессе Node.js и перехватывает вызовы через IPC. Дочерний элемент не является песочницей (см. «Изоляция выполнения плагина» ниже).

## Каталог маркетплейса

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) возвращает список
объектов `MarketplaceEntry`:

| Поле          | Тип      | Примечания                                            |
| ------------- | -------- | ----------------------------------------------------- |
| `name`        | string   | Имя плагина в kebab-case                              |
| `version`     | string   | semver                                                |
| `description` | string   | Краткое описание                                      |
| `author`      | string   | Автор / организация                                   |
| `license`     | string   | Идентификатор лицензии в стиле SPDX                   |
| `downloadUrl` | string   | URL для скачивания исходного кода (может быть пустым) |
| `repository`  | string?  | Необязательный URL репозитория                        |
| `tags`        | string[] | Теги для поиска/фильтрации                            |
| `downloads`   | number   | Количество скачиваний                                 |
| `rating`      | number   | 0–5                                                   |
| `verified`    | boolean  | Отмечена ли запись как проверенная                    |
| `lastUpdated` | string   | Строка даты в формате, близком к ISO                  |

Если URL собственного реестра не настроен, используется встроенный каталог
`SEED_REGISTRY` (в настоящее время: `request-logger`, `rate-limiter`, `cost-tracker` и
`theme-manager`). Начальный реестр доступен всегда: если настроенный удалённый
реестр недоступен, возвращает статус, отличный от `200`, или возвращает нераспознанное
тело ответа, `listMarketplacePlugins()` записывает предупреждение в журнал и возвращается к начальному списку.

> Примечание: **каталог** маркетплейса (просмотр/поиск) полностью интегрирован, однако
> установка из каталога маркетплейса **одним щелчком** пока не реализована: кнопка
> "Установить" для записи маркетплейса на панели управления в настоящее время отображает
> уведомление "скоро появится". Сейчас установка выполняется через процесс установки
> из локального пути (`POST /api/plugins`) и обнаружение на диске (`POST /api/plugins/scan`).

## REST API

Все конечные точки требуют аутентификации управления (`requireManagementAuth`).** и** только для обратной связи. — `/api/plugins` и `/api/plugins/` перечислены в `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Конечная точка                     | Метод  | Описание                                                                      |
| ---------------------------------- | ------ | ----------------------------------------------------------------------------- |
| `/api/plugins`                     | GET    | Список установленных плагинов (дополнительный фильтр `?status=` )             |
| `/api/plugins`                     | POST   | Установите плагин из каталога исходников плагина.                             |
| `/api/plugins/scan`                | POST   | Сканируйте каталог плагинов и регистрируйте новые плагины.                    |
| `/api/plugins/marketplace`         | GET    | Получение списка записей каталога торговой площадки                           |
| `/api/plugins/marketplace/install` | POST   | Установите плагин торговой площадки по имени                                  |
| `/api/plugins/[name]`              | GET    | Получить информацию об установленном плагине                                  |
| `/api/plugins/[name]`              | DELETE | Удалить плагин                                                                |
| `/api/plugins/[name]/activate`     | POST   | Активировать (загрузить перехватчики реестра + )                              |
| `/api/plugins/[name]/deactivate`   | POST   | Деактивировать (запустить `onDeactivate`, отменить регистрацию перехватчиков) |
| `/api/plugins/[name]/config`       | GET    | Получить конфигурацию плагина, схему конфигурации +                           |
| `/api/plugins/[name]/config`       | PUT    | Обновить конфигурацию плагина (проверено на соответствие схеме)               |

Фильтр `GET /api/plugins` `status` принимает один из `installed` / `active` / `inactive` / `error`. Недопустимое значение возвращает `400`.

### Список установленных плагинов

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Установить по локальному пути

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` должен быть** абсолютный** путь к каталогу** внутри каталога исходников плагина** : `plugin-sources` рядом с корнем плагина, поэтому `~/.omniroute/plugin-sources/` по умолчанию или `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` если эта переменная установлена (`getPluginSourcesDir()` в `src/lib/plugins/installSource.ts`). Сначала скопируйте или клонируйте плагин туда. Установка отклоняется с помощью `400` если путь содержит `..` или нулевой байт, находится за пределами этого каталога, разрешается за его пределами через символическую ссылку, содержит символическую ссылку, цель которой находится за его пределами, или когда каталог не существует. Исходный каталог должен содержать действительный `plugin.json` (или быть его родительским). В случае успеха ответом будет `201` с установленной строкой плагина.

В отличие от других маршрутов плагинов, для этого требуются учетные данные управления (сеанс информационной панели или ключ API с областью управления), даже если вход в систему отключен (`requireLogin=false`): установка кода никогда не является анонимным действием. То же самое относится и к `POST /api/plugins/marketplace/install` (тело `{ "name": "<plugin>" }`).

### Просмотрите торговую площадку

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Обновить конфигурацию плагина

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` проверяет тело на соответствие `configSchema` плагина (объявленному в манифесте) с помощью `validatePluginConfig()` из `src/lib/plugins/manifest.ts`: каждый ключ должен быть объявлен в схеме, значения должны соответствовать объявленному типу, поля `number` учитывают `min`/`max`, а поля `select` должны соответствовать объявленному `enum`. Любое нарушение возвращает `400` и ничего не сохраняется. Плагин, который не объявляет `configSchema` не имеет настраиваемых ключей, поэтому запрос с `400` отклоняется («Плагин не объявляет никаких настраиваемых ключей»).

## Конфигурация

### Каталог плагинов

Плагины находятся в каталоге данных OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (или другой файл, указанный в manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) определяет этот каталог
в три этапа:

1. **`OMNIROUTE_PLUGINS_DIR`**, если задана, — используется без изменений, независимо
   от значения `HOME`. Это явная настройка для Docker/K8s, где дерево плагинов
   монтируется по пути, который обычно никак не связан с домашним каталогом контейнера
   (#11827).
2. `<home>/.omniroute/plugins`, где `<home>` берётся из переменных окружения `HOME` /
   `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, если процесс вообще не экспортирует домашний каталог.

Определённый каталог однократно записывается в журнал при запуске как
`scanner.dir_resolved` с указанием выбранного источника (`OMNIROUTE_PLUGINS_DIR`,
`home` или `no-home-fallback`), поэтому образ, незаметно перешедший к этапу 3,
явно сообщает об этом, а не просто возвращает пустой список плагинов.
`POST /api/plugins/scan` обнаруживает в этом каталоге все подкаталоги, содержащие
допустимый `plugin.json`, и регистрирует их; этот же каталог служит корневым
каталогом, в который `pluginManager.install()` копирует плагины, поэтому переопределение
одновременно изменяет расположение как для обнаружения, так и для установки.

> **`OMNIROUTE_PLUGINS_DIR` — это не `OMNIROUTE_PLUGIN_PATH`.** Последняя читается
> только загрузчиком плагинов команд CLI (`bin/cli/plugins.mjs`) для поиска пакетов npm
> `omniroute-cmd-*`, добавляющих подкоманды `omniroute`, и не влияет на описанный здесь
> сканер среды выполнения. Подробнее об этом см. в [PLUGINS.md](./PLUGINS.md).

### Пользовательский URL реестра маркетплейса

Источник каталога маркетплейса считывается из настройки `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` считывает `settings.pluginMarketplaceUrl`). Если
указан URL с протоколом `http(s)`, `listMarketplacePlugins()` запрашивает этот URL
и принимает либо JSON-массив записей верхнего уровня, либо объект с массивом
`plugins`; записи без строкового поля `name` отфильтровываются. Если настройка
не задана (либо запрос не проходит защиту от SSRF или возвращает некорректный
ответ), используется встроенный исходный реестр.

На вкладке «Marketplace» панели управления доступно поле для этого URL
(значение считывается обратно через `GET /api/settings`).

> Примечание по реализации: действие «Save» на панели управления отправляет
> `pluginMarketplaceUrl` в `PATCH /api/settings`. На момент написания этот ключ
> не объявлен в `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), поэтому, прежде чем полагаться
> на него, проверьте сохранение значения в своей версии — путь **чтения**
> (`getSettings()` → `listMarketplacePlugins()`) учитывает ключ, как только он
> появляется в хранилище настроек.

## Безопасность

### Только петлевая проверка — на уровне маршрута

Плагины выполняют код в порожденных дочерних процессах, поэтому вся поверхность `/api/plugins` классифицируется как `LOCAL_ONLY` (уровень 1). Применение шлейфа выполняется безоговорочно** до** любая проверка аутентификации, поэтому просочившийся токен управления, достигающий коробки через туннель, по-прежнему не может установить, активировать или удалить плагин. См. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) и Жесткие правила #15 / #17.

### Реестр торговой площадки SSRF Guard

Пользовательский реестр URL представляет собой конфигурацию, на которую не может повлиять злоумышленник, поэтому перед его получением `listMarketplacePlugins()` пропускает его через два уровня:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Отклоняет все, что не является `http:` / `https:`.
   - Отклоняет буквальные хосты private/loopback/link-local/ULA (IPv4** и** IPv6, включая IPv4-mapped) через канонический `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Решает** оба** `A` и `AAAA` записывает и отклоняет, если** любой** разрешенный адрес является частным — закрывающим обход частного IP-адреса → общедоступным именем хоста.
   - **Не удалось закрыть** : ошибка разрешения DNS отклоняет URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): повторно применяет общедоступную защиту URL во время выборки и** блокирует перенаправления** (нет публичного → частного сводного `30x` ).

URL, которая терпит неудачу на любом из уровней, не отменяет запрос. — рынок автоматически возвращается к встроенному исходному реестру и регистрирует предупреждение.

> Эта защита была усилена в PR #3774 специально для разрешения A + AAAA и использования канонического `isPrivateHost` вместо проверки IPv4-only.

### Изоляция выполнения плагина

> **По умолчанию плагины не изолированы в песочнице.** Дочерний процесс — это обычный процесс Node.js, работающий от имени пользователя OmniRoute, без контекста VM и флагов разрешений Node.js, поэтому код плагина может читать и записывать любой файл, который может использовать пользователь, запускать программы и подключаться к сети. `requires.permissions` только решает, какие переменные среды получит дочерний элемент; другие разрешения не применяются. Флаг возможности включения `PLUGIN_PERMISSION_MODEL_ENABLED` (по умолчанию отключен) запускает каждый плагин в соответствии с моделью разрешений Node.js, созданной на основе этих разрешений, за исключением `network`, который Node.js не может ограничить (см. [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0-%D1%80%D0%B0%D0%B7%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B9) ). Устанавливайте только те плагины, которым вы доверяете. Граница процесса ниже содержит сбои и зависания; это не граница безопасности.

- **Изоляция процесса** — `loadPlugin()` (`src/lib/plugins/loader.ts`) порождает каждый плагин в отдельном дочернем процессе Node.js и взаимодействует через IPC. Вызовы перехвата имеют тайм-аут с эскалацией `SIGTERM` → `SIGKILL`.
- **Белый список конвертов** — дочерний элемент получает только разрешенный набор переменных среды; более широкий набор предоставляется только тогда, когда манифест запрашивает разрешение `env`.
- **Установить локализацию источника** — `POST /api/plugins` читает только из каталога исходного кода плагина (см. «Установка по локальному пути»): путь канонизируется с помощью `realpath`, должен оставаться строго внутри этого каталога, а дерево исходного кода, содержащее экранирующую его символическую ссылку, отклоняется перед копированием чего-либо.
- **Сдерживание пути** — install/upgrade/uninstall утверждает, что каталог плагина и `manifest.main` разрешают** в пределах** корень управляемого плагина перед копированием или рекурсивным удалением (защищает от подмены путей DB и обхода `../` в `manifest.main`). Активация разрешает символические ссылки через `realpath` и отказывается загружать точку входа, выходящую за пределы каталога плагина.
- **Дополнительный штифт целостности** — манифест может объявлять поле `integrity` (формат `sha256-<base64>`, SRI ). Если он присутствует, загрузчик проверяет хэш входного файла во время загрузки и отказывается активироваться в случае несоответствия. Это опция обнаружения несанкционированного доступа,** нет** граница безопасности: она не ограничивает возможности загруженного плагина.
- **В хуках нет учетных данных клиента** — контекста, переданного в `onRequest`, `onResponse` и `onError` заголовки `authorization`, `x-api-key`, `proxy-authorization` и `cookie` удалены, а запись ключа API не содержит значения ключа (`redactPluginContext()` в `src/lib/plugins/hooks.ts`).

## Манифест (`plugin.json`)

Проверено `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Поле               | Тип                  | Примечания                                                          |
| ------------------ | -------------------- | ------------------------------------------------------------------- |
| `name`             | нить                 | Необходимый; кебаб-кебаб (`^[a-z0-9-]+$`), 1–100 символов           |
| `version`          | нить                 | Необходимый; семвер (`MAJOR.MINOR.PATCH`)                           |
| `description`      | нить?                | ≤ 500 символов                                                      |
| `author`           | нить?                | ≤ 200 символов                                                      |
| `license`          | нить?                | По умолчанию `MIT`                                                  |
| `main`             | нить?                | Входной файл; по умолчанию — `index.js`                             |
| `source`           | перечислить?         | `local` \| `marketplace` (по умолчанию `local`)                     |
| `tags`             | нить[]?              | Поиск по тегам                                                      |
| `requires`         | объект?              | `{ omniroute?, permissions[] }`                                     |
| `hooks`            | объект?              | Логические значения, объявляющие, какие перехваты реализует плагин. |
| `skills`           | объект[]?            | Дополнительные определения навыков                                  |
| `enabledByDefault` | логическое значение? | Автоматическая активация при установке                              |
| `configSchema`     | объект?              | Карта полей конфигурации (`string`/`number`/`boolean`/`select`)     |
| `integrity`        | нить?                | Дополнительный PIN-код файла записи `sha256-<base64>`               |

Разрешения извлекаются из перечисления `network` / `file-read` / `file-write` / `env` / `exec`. Только `env` имеет эффект времени выполнения (немного больший список разрешенных переменных среды для дочернего элемента); остальные являются декларациями и не применяются.

## Поток жизненного цикла

```
установка (POST /api/plugins, путь)
  → сканирование/проверка манифеста → копирование во временный каталог → проверка нахождения main внутри каталога
  → атомарное переименование в ~/.omniroute/plugins/<name> → добавление строки в БД
  → вызов onInstall → если enabledByDefault: активация

активация (POST /api/plugins/{name}/activate)
  → проверка вхождения реального пути → loadPlugin() (запуск дочернего процесса)
  → регистрация объявленных хуков → status = "active" → вызов onActivate

деактивация (POST /api/plugins/{name}/deactivate)
  → вызов onDeactivate (ДО отмены регистрации) → отмена регистрации хуков
  → завершение дочернего процесса → status = "inactive"

удаление (DELETE /api/plugins/{name})
  → деактивация, если активен → вызов onUninstall
  → рекурсивное удаление каталога плагина с проверкой вхождения → удаление строки из БД
```

Повторный запуск `install` для каталога, версия манифеста которого **строго
новее** установленной версии, автоматически обновляет плагин (чистая переустановка;
конфигурация сбрасывается до значений по умолчанию). Такая же или более старая
версия отклоняется.

## База данных

Таблица `plugins` (миграция `076_create_plugins.sql`):

| Столбец         | Тип     | Примечания                                                 |
| --------------- | ------- | ---------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                       |
| `name`          | TEXT    | Уникальное значение                                        |
| `version`       | TEXT    | semver; по умолчанию `1.0.0`                               |
| `description`   | TEXT    | Необязательно                                              |
| `author`        | TEXT    | Необязательно                                              |
| `license`       | TEXT    | По умолчанию `MIT`                                         |
| `main`          | TEXT    | Входной файл; по умолчанию `index.js`                      |
| `source`        | TEXT    | По умолчанию `local`                                       |
| `tags`          | TEXT    | Массив JSON; по умолчанию `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`           |
| `enabled`       | INT     | 0/1; по умолчанию 0                                        |
| `manifest`      | TEXT    | Полный JSON манифеста                                      |
| `config`        | TEXT    | JSON; по умолчанию `{}`                                    |
| `config_schema` | TEXT    | JSON; по умолчанию `{}`                                    |
| `hooks`         | TEXT    | Массив JSON с именами объявленных хуков; по умолчанию `[]` |
| `permissions`   | TEXT    | Массив JSON; по умолчанию `[]`                             |
| `plugin_dir`    | TEXT    | Абсолютный путь к каталогу установки                       |
| `error_message` | TEXT    | Задаётся, когда `status = "error"`                         |
| `installed_at`  | TEXT    | `datetime('now')`                                          |
| `updated_at`    | TEXT    | `datetime('now')`                                          |
| `activated_at`  | TEXT    | Задаётся при активации                                     |

Метрики и аналитика плагинов отслеживаются в дополнительных таблицах
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Панель управления

Страница информационной панели `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) содержит две вкладки:

- **Установлено** — перечисляет установленные плагины с их объявленными крючками, переключателем activate/deactivate, кнопкой удаления и действием «Поиск плагинов» (`POST /api/plugins/scan`).
- **Торговая площадка** — показывает каталог из `GET /api/plugins/marketplace` с полем для установки пользовательского реестра URL.

На странице всегда отображается предупреждение о том, что плагины запускаются с полными привилегиями процесса OmniRoute.

Страница конфигурации каждого плагина находится по адресу `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## См. также

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  почему `/api/plugins` доступен только через loopback-интерфейс (уровень 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — связанный фреймворк навыков
  (`src/lib/skills/`); плагины могут объявлять навыки в своём манифесте
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — исходящие интеграции,
  управляемые событиями
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  шаблон `buildErrorBody()`, который каждый маршрут плагина использует для ответов об ошибках
