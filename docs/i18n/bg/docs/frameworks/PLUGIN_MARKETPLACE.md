# Plugin Marketplace (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Източник на достоверна информация:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` и
> `src/app/(dashboard)/dashboard/plugins/`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute включва система за плъгини в стила на WordPress. Плъгините представляват самостоятелни
директории — всяка с манифест `plugin.json` и входен файл — които се включват
в конвейера за обработка на заявки (`onRequest` / `onResponse` / `onError`) и в
събитията от жизнения цикъл (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Пазарът за плъгини** е слоят за откриване, изграден върху тази система. Той
предоставя каталог за преглед с плъгини, които могат да бъдат инсталирани. По подразбиране каталогът е
малък вграден начален регистър; операторът може да го насочи към персонализиран отдалечен
URL адрес на регистър, като в този случай извличането е защитено чрез предпазен механизъм срещу SSRF,
който извършва DNS преобразуване (вижте [Сигурност](#security)).

Всеки маршрут за плъгини е достъпен **само през loopback** (ниво 1 — `LOCAL_ONLY`): плъгините зареждат
и изпълняват код в дъщерни процеси, затова маршрутите са недостъпни от
източник извън loopback независимо от удостоверяването. Вижте
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Как се вписва Together

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

- **Слой на регистъра** — `src/lib/plugins/marketplace.ts`: изброява/търси в каталога, връщайки се към началния регистър при всяка грешка.
- **Слой жизнен цикъл** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): инсталиране, надграждане, активиране, деактивиране, деинсталиране, сканиране, зареждане при стартиране.
- **Манифестен слой** — `src/lib/plugins/manifest.ts`: Zod схема + по подразбиране за `plugin.json`.
- **Скенер** — `src/lib/plugins/scanner.ts`: открива плъгини на диск под директорията на плъгини.
- **Товарач** — `src/lib/plugins/loader.ts`: ражда всеки плъгин в отделен дъщерен процес Node.js и брокерите закачат повиквания през IPC. Детето не е пясъчна кутия (вижте „Изолация при изпълнение на плъгини“ по-долу).

## Каталог на пазара

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) връща списък от
обекти `MarketplaceEntry`:

| Поле          | Тип      | Бележки                                          |
| ------------- | -------- | ------------------------------------------------ |
| `name`        | string   | Име на плъгина във формат kebab-case             |
| `version`     | string   | semver                                           |
| `description` | string   | Кратко описание                                  |
| `author`      | string   | Автор / организация                              |
| `license`     | string   | Идентификатор на лиценз в стил SPDX              |
| `downloadUrl` | string   | URL за изтегляне на източника (може да е празен) |
| `repository`  | string?  | Незадължителен URL на хранилището                |
| `tags`        | string[] | Етикети за търсене/филтриране                    |
| `downloads`   | number   | Брой изтегляния                                  |
| `rating`      | number   | 0–5                                              |
| `verified`    | boolean  | Дали записът е отбелязан като проверен           |
| `lastUpdated` | string   | Низ за дата във формат, подобен на ISO           |

Когато не е конфигуриран персонализиран URL адрес на регистър, каталогът използва вградения
`SEED_REGISTRY` (понастоящем `request-logger`, `rate-limiter`, `cost-tracker` и
`theme-manager`). Началният регистър е винаги достъпен — ако конфигуриран отдалечен
регистър е недостъпен, върне състояние, различно от `200`, или върне неразпознато
тяло, `listMarketplacePlugins()` регистрира предупреждение и се връща към началния списък.

> Забележка: **каталогът** на пазара (преглед/търсене) е свързан от край до край, но
> инсталирането с едно щракване **от пазара** чрез каталога все още не е реализирано —
> бутонът „Инсталиране“ в таблото за управление за запис от пазара в момента показва
> известие „очаквайте скоро“. Понастоящем инсталирането се извършва чрез процеса за инсталиране
> от локален път (`POST /api/plugins`) и откриването на диска (`POST /api/plugins/scan`).

## REST API

Всички крайни точки изискват удостоверяване за управление (`requireManagementAuth`)** и** са само за обратна връзка — `/api/plugins` и `/api/plugins/` са изброени в `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Крайна точка                     | Метод  | Описание                                                                |
| -------------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Избройте инсталираните плъгини (опционален `?status=` филтър)           |
| `/api/plugins`                   | POST   | Инсталирайте плъгин от директорията с източници на плъгини              |
| `/api/plugins/scan`              | POST   | Сканирайте директорията на добавките и регистрирайте нови добавки       |
| `/api/plugins/marketplace`       | GET    | Избройте записи в каталога на пазара                                    |
| `/api/plugins/[name]`            | GET    | Получете подробности за инсталирания плъгин                             |
| `/api/plugins/[name]`            | DELETE | Деинсталирайте плъгин                                                   |
| `/api/plugins/[name]/activate`   | POST   | Активиране (зареждане на + регистрационни куки)                         |
| `/api/plugins/[name]/deactivate` | POST   | Деактивиране (задействане на `onDeactivate`, дерегистриране на куки)    |
| `/api/plugins/[name]/config`     | GET    | Вземете схема за конфигурация на плъгин +                               |
| `/api/plugins/[name]/config`     | PUT    | Актуализиране на конфигурацията на приставката (проверена спрямо схема) |

Филтърът `GET /api/plugins` `status` приема един от `installed` / `active` / `inactive` / `error`. Невалидна стойност връща `400`.

### Избройте инсталираните добавки

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Инсталирайте от локален път

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` трябва да бъде an** абсолютен** път към директория** в директорията с източници на плъгини** : `plugin-sources` до корена на приставката, така че `~/.omniroute/plugin-sources/` по подразбиране или `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` когато тази променлива е зададена (`getPluginSourcesDir()` в `src/lib/plugins/installSource.ts`). Първо копирайте или клонирайте приставката там. Инсталирането се отказва с `400`, когато пътят съдържа `..` или нулев байт, се намира извън тази директория, разрешава извън нея чрез символна връзка, съдържа символна връзка, чиято цел е извън нея, или когато директорията не съществува. Директорията източник трябва да съдържа валиден `plugin.json` (или да бъде родител на такъв). При успех отговорът е `201` с реда с инсталирания плъгин.

За разлика от другите маршрути на плъгини, този изисква идентификационни данни за управление (сесия на таблото или API ключ с обхват на управление) дори когато влизането е деактивирано (`requireLogin=false`): инсталирането на код никога не е анонимно действие.

### Разгледайте пазара

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Актуализиране на конфигурацията на приставката

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` валидира всяка предоставена стойност спрямо `configSchema` на плъгина (деклариран в манифеста): полетата `number` зачитат `min`/`max`, полетата `select` трябва да съответстват на декларирания `enum`. Разрешени са ключове, които не присъстват в схемата.

## Конфигурация

### Директория за плъгини

Плъгините се намират в директорията за данни на OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (или към каквото сочи manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) определя тази директория в
три стъпки:

1. **`OMNIROUTE_PLUGINS_DIR`**, когато е зададена — използва се дословно, независимо от стойността на `HOME`. Това е
   изричната настройка за Docker/K8s, където дървото с плъгини е монтирано чрез bind mount на път,
   който обикновено няма нищо общо с началната директория на контейнера (#11827).
2. `<home>/.omniroute/plugins`, където `<home>` идва от променливите на средата `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, когато процесът изобщо не експортира начална директория.

Определената директория се записва еднократно в регистрационния файл при стартиране като `scanner.dir_resolved`, като се посочва
избраният вход (`OMNIROUTE_PLUGINS_DIR`, `home` или `no-home-fallback`) — така образ,
който неусетно стига до стъпка 3, го посочва изрично, вместо само да отчете празен списък с плъгини.
`POST /api/plugins/scan` открива всяка поддиректория в нея, която съдържа валиден
`plugin.json`, и я регистрира; същата директория е коренът, в който
`pluginManager.install()` копира плъгините, така че замяната премества откриването и
инсталирането заедно.

> **`OMNIROUTE_PLUGINS_DIR` не е `OMNIROUTE_PLUGIN_PATH`.** Последната се чете само от
> механизма за зареждане на командни плъгини на CLI (`bin/cli/plugins.mjs`), за да намира `omniroute-cmd-*` npm
> пакети, които добавят подкоманди към `omniroute` — тя не влияе върху механизма за сканиране по време на изпълнение,
> описан тук. Вижте [PLUGINS.md](./PLUGINS.md) за тази част.

### Персонализиран URL адрес на регистъра на пазара

Източникът на каталога на пазара се прочита от настройката `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` чете `settings.pluginMarketplaceUrl`). Когато
е зададен `http(s)` URL адрес, `listMarketplacePlugins()` извлича този URL адрес и приема
или JSON масив от записи на най-горно ниво, или обект с масив `plugins`;
записите без `name` от тип низ се филтрират. Когато настройката не е зададена (или когато заявката
не премине SSRF защитата / върне невалиден отговор), се използва вграденият начален регистър.

Разделът „Marketplace“ на таблото за управление предоставя поле за този URL адрес (прочита се обратно от
`GET /api/settings`).

> Бележка за реализацията: действието „Save“ на таблото за управление изпраща
> `pluginMarketplaceUrl` към `PATCH /api/settings`. Към момента на писане този
> ключ не е деклариран в `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), затова проверете устойчивото му съхранение във вашата
> версия, преди да разчитате на него — пътят за **четене** (`getSettings()` →
> `listMarketplacePlugins()`) използва ключа, след като той присъства в хранилището
> за настройки.

## сигурност

### Ниво на маршрут — само обратна връзка

Добавките изпълняват код в създадени дъщерни процеси, така че цялата повърхност `/api/plugins` е класифицирана като `LOCAL_ONLY` (Ниво 1). Налагането на loopback се изпълнява безусловно** преди** всяка проверка за удостоверяване, така че изтекъл токен за управление, достигащ кутията през тунел, все още не може да инсталира, активира или деинсталира плъгин. Вижте [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) и твърдите правила #15 / #17.

### Защита на регистъра на пазара SSRF

Персонализираният регистър URL е конфигурация, която може да повлияе от нападателя, така че преди да го извлече, `listMarketplacePlugins()` го пуска през два слоя:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Отхвърля всичко, което не е `http:` / `https:`.
   - Отхвърля буквални private/loopback/link-local/ULA хостове (IPv4** и** IPv6, включително IPv4-mapped) чрез каноничния `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Разрешава** и двете** `A` и `AAAA` записва и отхвърля if** всякакви** разрешеният адрес е частен — затваряне на public-hostname → private-IP байпас.
   - **Неуспешно затворен** : грешка при разрешаване на DNS отхвърля URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): повторно прилага защитата URL само за обществеността по време на извличане и** блокира пренасочванията** (няма публичен → частен `30x` пивот).

URL, който не успее на нито един слой, не прекъсва заявката — пазарът тихо се връща към вградения начален регистър и записва предупреждение.

> Тази защита беше подсилена в PR #3774 специално за разрешаване на A + AAAA и използване на каноничния `isPrivateHost` вместо IPv4-only проверка.

### Изолация при изпълнение на плъгини

> **Приставките не са в пясъчна среда.** Детето е обикновен Node.js процес, работещ като OmniRoute потребител, без VM контекст и без Node.js флагове за разрешение, така че кодът на приставката може да чете и пише всеки файл, който потребителят може, да изпълнява програми и да достига до мрежата. `requires.permissions` решава само кои променливи на средата да получава детето; другите разрешения не се прилагат. Инсталирайте само добавки, на които имате доверие. Границата на процеса по-долу съдържа сривове и увисвания; това не е граница на сигурност.

- **Изолация на процеса** — `loadPlugin()` (`src/lib/plugins/loader.ts`) създава всеки плъгин в отделен дъщерен Node.js процес и комуникира през IPC. Извикванията на кука имат изчакване с ескалация `SIGTERM` → `SIGKILL`.
- **Env разрешен списък** — детето получава само разрешен набор от променливи на средата; по-широкият набор се предоставя само когато манифестът изисква разрешението `env`.
- **Инсталирайте защита на източника** — `POST /api/plugins` чете само от директорията с източници на плъгина (вижте „Инсталиране от локален път“): пътят е канонизиран с `realpath`, трябва да остане стриктно вътре в тази директория и дървото на източника, носещо символна връзка, което избягва, се отказва, преди да бъде копирано нещо.
- **Ограничаване на пътя** — install/upgrade/uninstall твърди, че директорията на плъгина и `manifest.main` разрешават** в рамките на** управлявания корен на приставката преди всяко копиране или рекурсивно изтриване (предпазва от подправени DB пътища и `../` преминаване в `manifest.main`). Активирането разрешава символни връзки чрез `realpath` и отказва да зареди входна точка, която избягва директорията на плъгина.
- **Допълнителен щифт за целостта** — манифест може да декларира `integrity` (`sha256-<base64>`, SRI формат) поле. Когато е наличен, товарачът проверява хеша на входния файл по време на зареждане и отказва да активира при несъответствие. Това е опция за откриване на фалшифициране,** не** граница на сигурността: тя не ограничава какво може да прави зареден плъгин.
- **Няма клиентски идентификационни данни в куките** — контекстът, предаден на `onRequest`, `onResponse` и `onError` има премахнати заглавки `authorization`, `x-api-key`, `proxy-authorization` и `cookie`, а записът на ключ API не носи стойност на ключ (`redactPluginContext()` в `src/lib/plugins/hooks.ts`).

## Манифест (`plugin.json`)

Потвърдено от `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Поле               | Тип         | Бележки                                                                  |
| ------------------ | ----------- | ------------------------------------------------------------------------ |
| `name`             | низ         | Задължително; кутия за кебап (`^[a-z0-9-]+$`), 1–100 знака               |
| `version`          | низ         | Задължително; semver (`MAJOR.MINOR.PATCH`)                               |
| `description`      | низ?        | ≤ 500 знака                                                              |
| `author`           | низ?        | ≤ 200 знака                                                              |
| `license`          | низ?        | По подразбиране е `MIT`                                                  |
| `main`             | низ?        | Входен файл; по подразбиране е `index.js`                                |
| `source`           | изброяване? | `local` \| `marketplace` (по подразбиране е `local`)                     |
| `tags`             | низ []?     | Етикети за търсене                                                       |
| `requires`         | обект?      | `{ omniroute?, permissions[] }`                                          |
| `hooks`            | обект?      | Булеви стойности, деклариращи кои кукички изпълнява приставката          |
| `skills`           | обект []?   | Незадължителни дефиниции на умения                                       |
| `enabledByDefault` | булево?     | Автоматично активиране при инсталиране                                   |
| `configSchema`     | обект?      | Карта на полетата за конфигурация (`string`/`number`/`boolean`/`select`) |
| `integrity`        | низ?        | Допълнителен щифт за входен файл `sha256-<base64>`                       |

Разрешенията се извличат от enum `network` / `file-read` / `file-write` / `env` / `exec`. Само `env` има ефект на изпълнение (малко по-голям списък с разрешени променливи на средата за детето); другите са декларации и не се изпълняват.

## Поток на жизнения цикъл

```
install (POST /api/plugins, път)
  → сканиране/валидиране на манифеста → копиране във временна директория → проверка, че main е в директорията
  → атомарно преименуване в ~/.omniroute/plugins/<name> → вмъкване на ред в БД
  → задействане на onInstall → ако enabledByDefault: активиране

activate (POST /api/plugins/{name}/activate)
  → проверка за принадлежност чрез realpath → loadPlugin() (стартиране на дъщерен процес)
  → регистриране на декларираните куки → status = "active" → задействане на onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → задействане на onDeactivate (ПРЕДИ дерегистрирането) → дерегистриране на куките
  → прекратяване на дъщерния процес → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → деактивиране, ако е активен → задействане на onUninstall
  → рекурсивно изтриване на директорията на приставката с проверка за принадлежност → изтриване на реда от БД
```

Повторното изпълнение на `install` за директория, чиято версия в манифеста е **строго
по-нова** от инсталираната версия, извършва автоматично надграждане (чиста преинсталация; конфигурацията се връща
към стойностите по подразбиране). Същата или по-стара версия се отхвърля.

## База данни

Таблица `plugins` (миграция `076_create_plugins.sql`):

| Колона          | Тип     | Бележки                                                          |
| --------------- | ------- | ---------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                             |
| `name`          | TEXT    | Уникално                                                         |
| `version`       | TEXT    | semver; по подразбиране `1.0.0`                                  |
| `description`   | TEXT    | Незадължително                                                   |
| `author`        | TEXT    | Незадължително                                                   |
| `license`       | TEXT    | По подразбиране `MIT`                                            |
| `main`          | TEXT    | Входен файл; по подразбиране `index.js`                          |
| `source`        | TEXT    | По подразбиране `local`                                          |
| `tags`          | TEXT    | JSON масив; по подразбиране `[]`                                 |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                 |
| `enabled`       | INT     | 0/1; по подразбиране 0                                           |
| `manifest`      | TEXT    | Пълният JSON на манифеста                                        |
| `config`        | TEXT    | JSON; по подразбиране `{}`                                       |
| `config_schema` | TEXT    | JSON; по подразбиране `{}`                                       |
| `hooks`         | TEXT    | JSON масив с имената на декларираните куки; по подразбиране `[]` |
| `permissions`   | TEXT    | JSON масив; по подразбиране `[]`                                 |
| `plugin_dir`    | TEXT    | Абсолютна инсталационна директория                               |
| `error_message` | TEXT    | Задава се, когато `status = "error"`                             |
| `installed_at`  | TEXT    | `datetime('now')`                                                |
| `updated_at`    | TEXT    | `datetime('now')`                                                |
| `activated_at`  | TEXT    | Задава се при активиране                                         |

Метриките/анализите на приставките се проследяват в допълнителни таблици
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Табло

Страницата на таблото за управление в `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) предоставя два раздела:

- **Инсталиран** — изброява инсталираните плъгини с техните декларирани кукички, activate/deactivate превключвател, бутон за деинсталиране и действие „Сканиране за плъгини“ (`POST /api/plugins/scan`).
- **Пазар** — показва каталога от `GET /api/plugins/marketplace` с поле за задаване на персонализирания регистър URL.

Страницата винаги показва предупреждение, че плъгините работят с пълните привилегии на OmniRoute процеса.

Страница за конфигуриране на плъгини съществува в `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Вижте също

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  защо `/api/plugins` е достъпен само през loopback (Ниво 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — свързаната рамка за умения
  (`src/lib/skills/`); плъгините могат да декларират умения в своя манифест
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — изходящи интеграции,
  управлявани от събития
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  шаблонът `buildErrorBody()`, който всеки маршрут на плъгин използва за отговори при грешки
