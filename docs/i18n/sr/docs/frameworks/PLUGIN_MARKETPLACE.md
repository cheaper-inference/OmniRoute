# Plugin Marketplace (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Извор истине:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` и
> `src/app/(dashboard)/dashboard/plugins/`
> **Последње ажурирање:** 2026-06-28 — v3.8.40

OmniRoute се испоручује са системом додатака налик WordPress-овом. Додаци су
самостални директоријуми — сваки са манифестом `plugin.json` и улазном датотеком —
који се повезују са током обраде захтева (`onRequest` / `onResponse` / `onError`)
и догађајима животног циклуса (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`).

**Тржиште додатака** представља слој за откривање изнад тог система. Оно нуди
каталог доступних додатака који се може прегледати. Каталог подразумевано чини
мали уграђени почетни регистар; оператер га може усмерити на прилагођени URL
удаљеног регистра, при чему је преузимање заштићено SSRF контролом која разрешава
DNS (погледајте [Безбедност](#security)).

Све руте додатака су **доступне само преко loopback интерфејса** (ниво 1 —
`LOCAL_ONLY`): додаци учитавају и извршавају кôд у подређеним процесима, па су
руте недоступне са извора који није loopback, без обзира на аутентификацију.
Погледајте [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Како се уклапа Together

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

- **Слој регистра** — `src/lib/plugins/marketplace.ts`: листа / претражује каталог, враћајући се у почетни регистар у случају било каквог неуспеха.
- **Слој животног циклуса** — `src/lib/plugins/manager.ts` (`pluginManager` синглетон): инсталирање, надоградња, активирање, деактивирање, деинсталирање, скенирање, учитавање при покретању.
- **Манифестни слој** — `src/lib/plugins/manifest.ts`: Zod шема + подразумевана за `plugin.json`.
- **Сцаннер** — `src/lib/plugins/scanner.ts`: открива додатке на диску у директоријуму додатака.
- **Лоадер** — `src/lib/plugins/loader.ts`: покреће сваки додатак у засебном Node.js подређеном процесу и брокери пребацују позиве преко IPC. Дете није заштићено окружење (погледајте „Изолација извршавања додатака“ у наставку).

## Каталог тржишта

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) враћа листу
објеката `MarketplaceEntry`:

| Поље          | Тип      | Напомене                                    |
| ------------- | -------- | ------------------------------------------- |
| `name`        | string   | Назив додатка у kebab-case формату          |
| `version`     | string   | semver                                      |
| `description` | string   | Кратак опис                                 |
| `author`      | string   | Аутор / организација                        |
| `license`     | string   | Идентификатор лиценце у SPDX стилу          |
| `downloadUrl` | string   | URL за преузимање извора (може бити празан) |
| `repository`  | string?  | Опциони URL репозиторијума                  |
| `tags`        | string[] | Ознаке за претрагу/филтрирање               |
| `downloads`   | number   | Број преузимања                             |
| `rating`      | number   | 0–5                                         |
| `verified`    | boolean  | Да ли је унос означен као проверен          |
| `lastUpdated` | string   | Ниска датума приближно у ISO формату        |

Када није конфигурисан прилагођени URL регистра, каталог користи уграђени
`SEED_REGISTRY` (тренутно `request-logger`, `rate-limiter`, `cost-tracker` и
`theme-manager`). Почетни регистар је увек доступан — ако је конфигурисани
удаљени регистар недоступан, врати статус који није `200` или врати непрепознато
тело, `listMarketplacePlugins()` бележи упозорење и враћа се на почетну листу.

> Напомена: **каталог** тржишта (прегледање/претрага) повезан је од почетка до
> краја, али инсталација са тржишта **једним кликом** из каталога још није
> имплементирана — дугме „Инсталирај“ на контролној табли за унос са тржишта
> тренутно приказује обавештење „ускоро доступно“. Инсталација се тренутно обавља
> путем тока инсталације са локалне путање (`POST /api/plugins`) и откривања на
> диску (`POST /api/plugins/scan`).

## REST API

Све крајње тачке захтевају потврду управљања (`requireManagementAuth`)** и** су — `/api/plugins` и `/api/plugins/` само за повратну петљу наведени су у `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Крајња тачка                       | Метод  | Опис                                                        |
| ---------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/plugins`                     | GET    | Листа инсталираних додатака (опциони `?status=` филтер)     |
| `/api/plugins`                     | POST   | Инсталирајте додатак из директоријума извора додатака       |
| `/api/plugins/scan`                | POST   | Скенирајте директоријум додатака и региструјте нове додатке |
| `/api/plugins/marketplace`         | GET    | Наведите уносе у каталогу тржишта                           |
| `/api/plugins/marketplace/install` | POST   | Инсталирајте додатак за тржиште по имену                    |
| `/api/plugins/[name]`              | GET    | Преузмите детаље о инсталираном додатку                     |
| `/api/plugins/[name]`              | DELETE | Деинсталирајте додатак                                      |
| `/api/plugins/[name]/activate`     | POST   | Активирај (учитај + регистар куке)                          |
| `/api/plugins/[name]/deactivate`   | POST   | Деактивирај (отпусти `onDeactivate`, одјави куке)           |
| `/api/plugins/[name]/config`       | GET    | Набавите конфигурацију додатка + конфигурациону шему        |
| `/api/plugins/[name]/config`       | PUT    | Ажурирајте конфигурацију додатка (потврђено према шеми)     |

Филтер `GET /api/plugins` `status` прихвата један од `installed` / `active` / `inactive` / `error`. Неважећа вредност враћа `400`.

### Листа инсталираних додатака

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Инсталирајте са локалне путање

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` мора бити ан** апсолутна** пут до директоријума** унутар директоријума извора додатака** : `plugin-sources` поред корена додатка, дакле `~/.omniroute/plugin-sources/` подразумевано, или `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` када је та променљива подешена (`getPluginSourcesDir()` у `src/lib/plugins/installSource.ts`). Прво копирајте или клонирајте додатак тамо. Инсталација се одбија са `400` када путања садржи `..` или нулти бајт, лежи изван тог директоријума, решава се ван њега преко симболичне везе, садржи симболичку везу чији је циљ изван ње или када директоријум не постоји. Изворни директоријум мора да садржи важећи `plugin.json` (или да буде његов родитељ). По успеху одговор је `201` са инсталираним редом додатка.

За разлику од других рута додатака, ова захтева акредитиве за управљање (сесија контролне табле или API кључ са опсегом управљања) чак и када је пријава онемогућена (`requireLogin=false`): инсталирање кода никада није анонимна радња. Исто важи и за `POST /api/plugins/marketplace/install` (тело `{ "name": "<plugin>" }`).

### Прегледајте тржиште

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Ажурирајте конфигурацију додатка

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` проверава тело у односу на `configSchema` додатка (декларисан у манифесту) са `validatePluginConfig()` из `src/lib/plugins/manifest.ts`: сваки кључ мора бити декларисан у шеми, вредности морају одговарати декларисаном типу, `number` поља поштују `min`/`max`, а `select` поља морају одговарати декларисаном `enum`. Свако кршење враћа `400` и ништа се не чува. Додатак који декларише да нема `configSchema` нема кључеве који се могу конфигурисати, тако да се захтев одбија са `400` („Плугин не декларише ниједан конфигурабилни кључ“).

## Конфигурација

### Директоријум додатака

Додаци се налазе у OmniRoute директоријуму података:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (или било шта на шта manifest.main упућује)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) одређује тај директоријум у
три корака:

1. **`OMNIROUTE_PLUGINS_DIR`**, када је постављен — користи се дословно, без обзира на вредност `HOME`. Ово је
   експлицитно подешавање за Docker/K8s, где је стабло додатака монтирано преко bind mount-а на путању
   која обично нема никакве везе са матичним директоријумом контејнера (#11827).
2. `<home>/.omniroute/plugins`, где се `<home>` добија из променљивих окружења `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, када процес уопште не извози матични директоријум.

Одређени директоријум се једном евидентира при покретању као `scanner.dir_resolved`, уз навођење
изабраног улаза (`OMNIROUTE_PLUGINS_DIR`, `home` или `no-home-fallback`) — тако слика
која неприметно заврши на 3. кораку то и пријављује, уместо да само прикаже празну листу додатака.
`POST /api/plugins/scan` открива сваки поддиректоријум у њему који садржи важећи
`plugin.json` и региструје га; исти директоријум представља корен у који
`pluginManager.install()` копира додатке, тако да замена путање заједно премешта и откривање и
инсталацију.

> **`OMNIROUTE_PLUGINS_DIR` није `OMNIROUTE_PLUGIN_PATH`.** Ово друго чита искључиво
> учитавач додатака за CLI команде (`bin/cli/plugins.mjs`) како би пронашао `omniroute-cmd-*` npm
> пакете који додају `omniroute` подкоманде — оно нема утицаја на runtime скенер
> описан овде. За ту страну погледајте [PLUGINS.md](./PLUGINS.md).

### Прилагођени URL регистра продавнице

Извор каталога продавнице чита се из подешавања `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` чита `settings.pluginMarketplaceUrl`). Када је
постављено на `http(s)` URL, `listMarketplacePlugins()` преузима тај URL и прихвата
или JSON низ ставки највишег нивоа или објекат са низом `plugins`;
ставке без поља `name` типа string се филтрирају. Када вредност није постављена (или када преузимање
не прође SSRF заштиту / врати неисправан одговор), користи се уграђени почетни регистар.

Картица „Продавница“ на контролној табли садржи поље за овај URL (вредност се поново чита преко
`GET /api/settings`).

> Напомена о имплементацији: радња „Сачувај“ на контролној табли шаље
> `pluginMarketplaceUrl` на `PATCH /api/settings`. У тренутку писања, овај
> кључ није декларисан у `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), па проверите трајност чувања у свом
> издању пре него што се ослоните на њу — путања за **читање** (`getSettings()` →
> `listMarketplacePlugins()`) поштује кључ када се он нађе у складишту
> подешавања.

## Безбедност

### Рута само — лоопбацк

Додаци извршавају код у подређеним процесима, тако да је цела `/api/plugins` површина класификована као `LOCAL_ONLY` (Тиер 1). Спровођење повратне петље ради безусловно** пре** било какву проверу аутентификације, тако да процурели токен за управљање који стиже до кутије преко тунела и даље не може да инсталира, активира или деинсталира додатак. Погледајте [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) и чврста правила #15 / #17.

### Маркетплаце регистри SSRF гуард

Прилагођени регистар URL је конфигурација на коју може утицати нападач, тако да пре него што га преузме, `listMarketplacePlugins()` га покреће кроз два слоја:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Одбацује све што није `http:` / `https:`.
   - Одбацује дословне private/loopback/link-local/ULA хостове (IPv4** и** IPv6, укључујући IPv4-mapped) преко канонског `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Решава** обоје** `A` и `AAAA` евидентира и одбацује ако** било који** решена адреса је приватна — која затвара јавно име хоста → заобилазницу приватног ИП-а.
   - **Неуспешно затворено** : грешка резолуције DNS одбија URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): поново примењује URL заштиту само за јавност у време преузимања и** блокира преусмеравања** (нема јавног → приватног `30x` пивота).

URL који не успе у било ком слоју не прекида захтев — тржиште се тихо враћа у уграђени почетни регистар и бележи упозорење.

> Овај чувар је ојачан у PR #3774 посебно да би решио А + AAAA и користио канонски `isPrivateHost` уместо IPv4-only провере.

### Изолација извршења додатака

> **Додаци нису подразумевано заштићени у заштићеном окружењу.** Дете је обичан Node.js процес који се покреће као OmniRoute корисник, без VM контекста и без Node.js ознака дозволе, тако да код додатка може да чита и пише било коју датотеку коју корисник може, покреће програме и долази до мреже. `requires.permissions` само одлучује које променљиве окружења дете прима; остале дозволе се не примењују. Ознака функције `PLUGIN_PERMISSION_MODEL_ENABLED` за омогућавање (подразумевано искључена) покреће сваки додатак под Node.js моделом дозвола направљеним од тих дозвола, осим `network`, који Node.js не може да ограничи (погледајте [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#permission-system) ). Инсталирајте само додатке у које верујете. Граница процеса испод садржи падове и виси; то није безбедносна граница.

- **Изолација процеса** — `loadPlugin()` (`src/lib/plugins/loader.ts`) покреће сваки додатак у посебном Node.js подређеном процесу и комуницира преко IPC. Прекид позива има временско ограничење са `SIGTERM` → `SIGKILL` ескалацијом.
- **Енв листа дозвољених** — дете прима само дозвољени скуп варијабли окружења; шири скуп се додељује само када манифест захтева `env` дозволу.
- **Инсталирајте задржавање извора** — `POST /api/plugins` чита само из директоријума извора додатака (погледајте „Инсталирање са локалне путање“): путања је каноникализована са `realpath`, мора да остане стриктно унутар тог директоријума, а изворно стабло које носи симболичку везу која му избегава се одбија пре него што се било шта копира.
- **Задржавање путање** — install/upgrade/uninstall потврђује да се директоријум додатака и `manifest.main` решавају** унутар** корен управљаног додатка пре било каквог копирања или рекурзивног брисања (штити од неовлашћених DB путања и `../` преласка у `manifest.main`). Активација разрешава симболичке везе преко `realpath` и одбија да учита улазну тачку која излази из директоријума додатака.
- **Опциони пин интегритета** — манифест може да прогласи поље `integrity` (`sha256-<base64>`, SRI формат). Када је присутан, учитавач верификује хеш улазне датотеке у време учитавања и одбија да се активира у случају неподударања. То је детекција неовлашћеног приступа,** не** безбедносна граница: не ограничава шта учитани додатак може да уради.
- **Нема клијентских акредитива у кукицама** — контекст прослеђен на `onRequest`, `onResponse` и `onError` има уклоњена заглавља `authorization`, `x-api-key`, `proxy-authorization` и `cookie`, а запис кључа API не носи вредност кључа (`redactPluginContext()` у `src/lib/plugins/hooks.ts`).

## Манифест (`plugin.json`)

Потврдио `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Поље               | Тип        | Напомене                                                         |
| ------------------ | ---------- | ---------------------------------------------------------------- |
| `name`             | стринг     | Обавезно; кутија за ћевап (`^[a-z0-9-]+$`), 1–100 знакова        |
| `version`          | стринг     | Обавезно; семвер (`MAJOR.MINOR.PATCH`)                           |
| `description`      | стринг?    | ≤ 500 знакова                                                    |
| `author`           | стринг?    | ≤ 200 знакова                                                    |
| `license`          | стринг?    | Подразумевано је `MIT`                                           |
| `main`             | стринг?    | Ентри филе; подразумевано је `index.js`                          |
| `source`           | енум?      | `local` \| `marketplace` (подразумевано је `local`)              |
| `tags`             | стринг[]?  | Претражите ознаке                                                |
| `requires`         | објекат?   | `{ omniroute?, permissions[] }`                                  |
| `hooks`            | објекат?   | Бооленови који декларишу које закачице имплементира додатак      |
| `skills`           | објекат[]? | Опционе дефиниције вештина                                       |
| `enabledByDefault` | боолеан?   | Аутоматско активирање приликом инсталације                       |
| `configSchema`     | објекат?   | Мапа конфигурационих поља (`string`/`number`/`boolean`/`select`) |
| `integrity`        | стринг?    | Опциони `sha256-<base64>` пин за унос датотеке                   |

Дозволе се извлаче из енума `network` / `file-read` / `file-write` / `env` / `exec`. Само `env` има ефекат времена извршавања (нешто већа листа дозвољених променљивих окружења за дете); остали су декларације и не спроводе се.

## Ток животног циклуса

```
install (POST /api/plugins, путања)
  → скенирање/валидација манифеста → копирање у привремени директоријум → провера да ли је main унутар директоријума
  → атомско преименовање у ~/.omniroute/plugins/<name> → уметање реда у базу података
  → покретање onInstall → ако је enabledByDefault: активирање

activate (POST /api/plugins/{name}/activate)
  → провера ограничења путање помоћу realpath → loadPlugin() (покретање подређеног процеса)
  → регистровање декларисаних кука → status = "active" → покретање onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → покретање onDeactivate (ПРЕ одјављивања) → одјављивање кука
  → заустављање подређеног процеса → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → деактивирање ако је активан → покретање onUninstall
  → рекурзивно брисање директоријума додатка уз проверу ограничења путање → брисање реда из базе података
```

Поновно покретање `install` над директоријумом чија је верзија манифеста **строго
новија** од инсталиране верзије аутоматски врши надоградњу (чиста поновна инсталација; конфигурација се враћа
на подразумеване вредности). Иста или старија верзија се одбија.

## База података

Табела `plugins` (миграција `076_create_plugins.sql`):

| Колона          | Тип     | Напомене                                              |
| --------------- | ------- | ----------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                  |
| `name`          | TEXT    | Јединствено                                           |
| `version`       | TEXT    | semver; подразумевано `1.0.0`                         |
| `description`   | TEXT    | Опционо                                               |
| `author`        | TEXT    | Опционо                                               |
| `license`       | TEXT    | Подразумевано `MIT`                                   |
| `main`          | TEXT    | Улазна датотека; подразумевано `index.js`             |
| `source`        | TEXT    | Подразумевано `local`                                 |
| `tags`          | TEXT    | JSON низ; подразумевано `[]`                          |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`      |
| `enabled`       | INT     | 0/1; подразумевано 0                                  |
| `manifest`      | TEXT    | Комплетан JSON манифеста                              |
| `config`        | TEXT    | JSON; подразумевано `{}`                              |
| `config_schema` | TEXT    | JSON; подразумевано `{}`                              |
| `hooks`         | TEXT    | JSON низ назива декларисаних кука; подразумевано `[]` |
| `permissions`   | TEXT    | JSON низ; подразумевано `[]`                          |
| `plugin_dir`    | TEXT    | Апсолутни инсталациони директоријум                   |
| `error_message` | TEXT    | Поставља се када је `status = "error"`                |
| `installed_at`  | TEXT    | `datetime('now')`                                     |
| `updated_at`    | TEXT    | `datetime('now')`                                     |
| `activated_at`  | TEXT    | Поставља се приликом активације                       |

Метрике/аналитика додатака прате се у додатним табелама
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Дасхбоард

Страница контролне табле на `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) садржи две картице:

- **Инсталиран** — наводи инсталиране додатке са њиховим декларисаним кукицама, activate/deactivate прекидачем, дугметом за деинсталирање и акцијом „Скенирај додатке“ (`POST /api/plugins/scan`).
- **Маркетплаце** — приказује каталог из `GET /api/plugins/marketplace` са пољем за постављање прилагођеног регистра URL.

Страница увек приказује упозорење да се додаци покрећу са пуним привилегијама OmniRoute процеса.

Конфигурациона страница по додатку се налази на `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Погледајте и

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  зашто је `/api/plugins` доступан само преко loopback интерфејса (ниво 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — сродни оквир за вештине
  (`src/lib/skills/`); додаци могу да декларишу вештине у свом манифесту
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — излазне интеграције
  засноване на догађајима
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  образац `buildErrorBody()` који свака рута додатка користи за одговоре о грешкама
