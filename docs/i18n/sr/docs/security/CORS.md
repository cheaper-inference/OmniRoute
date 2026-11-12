# CORS Configuration & Security (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute контролише које **порекло претраживача** може да чита одговоре са више извора са једне, централизоване листе дозвољених. Модел је **неуспешно затворено подразумевано** : није дозвољено порекло док га не изаберете. Ова страница документује како се листа дозвољених решава, шта `CORS_ALLOW_ALL=true` заправо открива (и, што је још важније, шта ради **не** ), како безбедно конфигурисати дев у односу на производњу, а упозорење о времену извођења на контролној табли приказује када је џокер ознака активан.

**Извор истине:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Листа дозвољених места се примењује једном, у средњем софтверу (`src/server/authz/pipeline.ts`) — руковаоци по рути не постављају сами `Access-Control-Allow-Origin`.

## Како се решава порекло

За сваки захтев средњи софтвер израчунава вредност `Access-Control-Allow-Origin` овим редоследом:

1. **`CORS_ALLOW_ALL=true`** (или застарели `CORS_ORIGIN=*`) → ехо враћа `Origin` позиваоца (или `*` када нема `Origin` заглавља), са `Vary: Origin` тако да кешови остају исправни. Иста `applyCorsHeaders()` цхокепоинт такође додаје `Vary: Accept-Encoding` сваком одговору 2кк-витх-боди на површини `/v1*`/`/v1beta*` са аутентификацијом токеном (`relaxForTokenAuth`, RFC 9110 §12.5.5, издање #6737), тако да downstream/shared кешови могу исправно разликовати компримоване и некомпримоване варијанте.
2. У супротном, захтев `Origin` се нормализује (мала слова, задња коса црта уклоњена) и упарује се са **спојена листа дозвољених** :
   - енв **`CORS_ALLOWED_ORIGINS`** — листа раздвојена зарезима и
   - време извођења **`corsOrigins`** подешавање (Дасхбоард → Сецурити → _ЦОРС Алловед Оригинс_), убризгано преко `setRuntimeAllowedOrigins()` из `src/lib/config/runtimeSettings.ts`.
3. Нема подударања →**не емитује се `Access-Control-Allow-Origin` заглавље** . Прегледач блокира читање са више извора. Ово је предвиђено подразумевано затварање без грешке.

| Енв вар                | Значење                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV тачног порекла да се дозволи (препоручује се).                                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → ехо било ког порекла (џокер). Само за програмере.                            |
| `CORS_ORIGIN`          | Легаци. `*` се понаша као `CORS_ALLOW_ALL`; једна вредност се додаје на листу дозвољених. |

## Модел претње — оно што `CORS_ALLOW_ALL=true` заиста разоткрива

Генеричко OWASP упозорење („вилдцард CORS = било који сајт може да позове ваш API“) вреди схватити озбиљно, али OmniRoute-ова изложеност је **ужи од генеричког падежа** , због једне конкретне чињенице о имплементацији:

> **Централни `applyCorsHeaders()` никада не емитује `Access-Control-Allow-Credentials`.** Прегледач неће изложити одговор _цредентиалед_ (који садржи колачиће) са више извора осим ако сервер не пошаље `Access-Control-Allow-Credentials: true`. OmniRoute-ов заједничка CORS путања никада не ради.

Шта то значи по површини, чак и са `CORS_ALLOW_ALL=true`:

| Површина                                | Аутх механизам                 | Ефекат замене CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Контролна табла / MANAGEMENT `/api/*`   | Цоокие сессион                 | Порекло се понавља, али **без `Allow-Credentials`** претраживач **блокова** акредитовани чита. Злонамерни сајт са више извора **не може да чита** ваше проверене одговоре на контролној табли, а колачић сесије није изложен.                                                                                                                                                                                                                                                                                          |
| Клијент API `/v1/*`, `/v1beta/*`        | Носилац / `x-api-key` заглавље | Већ допуштено **по дизајну** (`relaxForTokenAuth`): претраживачи никада не причвршћују аутоматски `Authorization`/`x-api-key`, тако да страница нападача не може да достави ваш кључ. Опуштени ехо захтева аутентификовану тему (потврђен API кључ или сесију контролне табле), а не само заглавље акредитива и никада не укључује `Access-Control-Allow-Credentials`. Анонимни одговори (`REQUIRE_API_KEY=false`) користе конфигурисану листу дозвољених извора, укључујући експлицитну `CORS_ALLOW_ALL=true` опцију. |
| Јавно само за читање (`/api/health`, …) | Ниједан                        | Нонсенситиве; џокер је безопасан.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

Дакле,**преостали** изложеност `CORS_ALLOW_ALL=true` ограничена је на: (а) унакрсно порекло без акредитива **чита** већ неутврђених података и (б) препуштање CORS у **префлигхт пасс** на рутама управљања — које и даље захтевају ауторизацију коју страница са више порекла не може да обезбеди. јесте **не** вектор за отмицу сесије или крађу акредитива на дељеној CORS путањи.

### Један прави изузетак — `/api/v1/agents/`

Руте Цлоуд-Агент (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) постављају своје **сопствени** CORS заглавља (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) и **учинити** емитују `Access-Control-Allow-Origin: <origin>|*` заједно са `Access-Control-Allow-Credentials: true`. Ово је једина површина на којој коегзистирају изворни ехо и акредитиви, и јесте **независно од `CORS_ALLOW_ALL`** . Ове руте су потврђене за управљање (`requireManagementAuth`); оператери који излажу контролну таблу ван хоста треба да буду свесни да је ово једно место где заглавља одговора дозвољавају читање акредитива са више порекла. Пооштравање на експлицитну листу дозвољених прати се одвојено од ових CORS упутстава.

## Контролна листа производње

- **Никада не постављајте `CORS_ALLOW_ALL=true` у производњу.** Оставите га неподешеним.
- Подесите ан **експлицитна** изворна листа — или енв вар или поље Сецурити-таб:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ако OmniRoute ради иза обрнутог проксија/тунела (нгинк, Цадди, Cloudflare тунел, Tailscale), CORS је **не** ваша једина контролна — заштита руте повратне петље и даље штити руте које су способне за покретање (погледајте [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Немојте фалсификовати `X-Forwarded-For: 127.0.0.1` да "поправи" 403; који поново отвара класу RCE чувар руте затвара.
- Потврдите стање времена рада: контролна табла приказује а **упорна ћилибарска застава** у оквиру Дасхбоард → Сецурити → ауторизациони инвентар кад год је `CORS_ALLOW_ALL=true` активан, а `/api/settings/authz-inventory` враћа `cors: { allowAll, allowedOrigins }` алатке за надгледање коверте које могу анкетирати.

## Погодност развоја — дозвољава специфично локално порекло

Ретко вам је потребан џокер знак чак и у дев. Дозволите само дев сервере које користите:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Порекло се упарује без обзира на велика и мала слова, а задња коса црта се занемарује, тако да су `http://localhost:3000` и `http://localhost:3000/` еквивалентни. Исти CSV се може подесити у току рада у **Контролна табла → безбедност → CORS Дозвољено порекло** без поновног покретања.

## API кључеви у односу на сесије колачића

- **Носилац/ `x-api-key` ( `/v1/*` површина закључивања):** прегледачи их никада не прилажу аутоматски. CORS овде није значајна препрека — API кључ је баријера — због чега је та површина намерно дозвољена тако да клијенти претраживача и Electron могу читати одговоре на које већ имају право. Опуштени ехо захтева аутентификовану тему (потврђен API кључ или сесију контролне табле), а не само заглавље акредитива и никада не укључује `Access-Control-Allow-Credentials`. Анонимни одговори (`REQUIRE_API_KEY=false`) користе конфигурисану листу дозвољених извора, укључујући експлицитну `CORS_ALLOW_ALL=true` опцију. Одбацивања аутентификације (401) остају читљиви тако да клијенти могу да открију опозвани или погрешно укуцани кључ (#5242): сопствени 401 цевовода задржава ехо, а рута која одбија сам кључ након што му је цевовод послужио као анонимни (`/v1/models` и `/v1beta/models` са конфигурисаним ауторизацијом за управљање, `/v1/files` `/v1/batches` и `/v1/media`-ом у домену власника, ЗК-КО-кандидатом, `/v1/session-leases` ауто руте) додаје ехо том 401 преко `credentialRejectionHeaders()`. Ехо се укуцава на захтев који носи заглавље акредитива (`Authorization`, `x-api-key`, `x-goog-api-key` или `auth_token` колачић), а не на који од њих је рута проверена, и никада није упарен са `Access-Control-Allow-Credentials`; тело је фиксни омотач грешке. Руте управљања под `/api/v1/` које чува `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) не користе овај изузетак одбацивања акредитива: са `REQUIRE_API_KEY=false`, њихови 401/403 одговори прате конфигурисану политику порекла CORS.
- **Сесија колачића (контролна табла):** заштићено подразумеваним затварањем без грешке **и** одсуством `Access-Control-Allow-Credentials` на заједничком путу. Држите management/dashboard порекло ван било које дозвољене конфигурације; морају остати тачно затворене.

## WebSocket руковања (`/v1/responses`, `/v1/ws`)

Претраживачи не примењују CORS на WebSocket, тако да WebSocket транспорти који враћају излаз закључивања сами проверавају руковање `Origin` (`src/server/origin/wsOrigin.ts`): одговоре WebSocket (`/v1/responses`) и, када OmniRoute пролази кроз `npm start` / `npm run dev`, `/v1/ws` и `/api/v1/ws` мост, који стримује `/v1/chat/completions`, `/v1/messages` као оквире `/v1/responses`. Мост тражи од `/api/v1/ws?handshake=1` пресуду и одбија надоградњу осим ако та рута није прошла проверу. Захтеви за аутентификацију се и даље примењују засебно. Провера порекла пролази када:

- нема `Origin` заглавље (Codex CLI, SDKs и други клијенти који нису претраживачи);
- `Origin` је прихваћен на горњој листи дозвољених (`CORS_ALLOWED_ORIGINS`, `corsOrigins` поставка, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` је једно од OmniRoute сопствених јавних извора (конфигурисана јавна база URL, проследјено порекло поузданог проксија или директни loopback/LAN хост дат као IP литерал или `localhost` — исти кандидати које користи провера мутације на контролној табли); или
- носи важећи API кључ, као на површини HTTP `/v1/*`.

Све остало добија `403 ws_origin_forbidden`. Колачић сесије контролне табле не изузима страни `Origin`, јер га прегледач прикачује на утичницу било које странице. `localhost` на другом порту се не третира као истог порекла; додајте такве дев оригине у `CORS_ALLOWED_ORIGINS`.

## Пример: обрнути прокси испред OmniRoute

CORS спроводи сам OmniRoute, тако да би прокси генерално требао **не** додајте или препишите `Access-Control-*` заглавља (двострука заглавља разбијају претраживаче). Прекините TLS и проследите — нека OmniRoute одговори пре лета:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Поставите дозвољено порекло претраживача у OmniRoute (`CORS_ALLOWED_ORIGINS` или картица Безбедност), а не у проксију.

## Изворне датотеке

| Забринутост                                      | Филе                                                                 |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Резолуција листе дозвољених + `getCorsStatus()`  | `src/server/cors/origins.ts`                                         |
| Апликација средњег софтвера (један извор истине) | `src/server/authz/pipeline.ts`                                       |
| Подешавања → рунтиме оригин ињецтион             | `src/lib/config/runtimeSettings.ts`                                  |
| Статус времена рада за контролну таблу           | `src/app/api/settings/authz-inventory/route.ts`                      |
| Банер упозорења на контролној табли              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS поље дозвољено порекло                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Цлоуд-Агент по рути CORS (изузетак)              | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket руковање `Origin` провера              | `src/server/origin/wsOrigin.ts`                                      |

## Види такође

- [Роуте Гуард Тиерс](./ROUTE_GUARD_TIERS.md) — лоопбацк примена за руте које су способне за покретање (засебна, комплементарна контрола).
- [Водич за ауторизацију](../architecture/AUTHZ_GUIDE.md) — потпуни цевовод за аутентификацију.
