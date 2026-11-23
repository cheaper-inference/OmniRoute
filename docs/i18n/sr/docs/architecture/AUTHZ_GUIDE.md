# Authorization Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Izvor istine:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Poslednje ažurirano:** 2026-09-22 — prostori imena opsega ukazuju na MCP-SERVER.md

OmniRoute ima autorizacionu cevovodnu liniju svesnu ruta koja kontroliše svaki API zahtev. Klasifikacija je **deterministička** i **fail-closed** — sve što se ne može klasifikovati završava kao `MANAGEMENT` i zahteva sesiju ili token menadžerskog nivoa. Ova stranica objašnjava model za inženjere koji održavaju rute ili dizajniraju nove krajnje tačke.

![AuthZ cevovodna linija (3 klase ruta + evaluacija politike)](../diagrams/exported/authz-pipeline.svg)

> Izvor: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режима аутентификације

### 1. API кључ (Bearer)

Користи се за клијентске API-је компатибилне са OpenAI/Anthropic/Gemini и за неке руте управљања када кључ има опсег `manage`.

```
Authorization: Bearer <api-key>
```

Проверава га `isValidApiKey()` / `extractApiKey()` у `src/sse/services/auth.ts` и реекспортује се преко `src/shared/utils/apiAuth.ts`. Валидатор такође прихвата променљиве окружења `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` као трајне кључеве за проследјивање (issue #1350).

### 2. Сесија контролне табле (колачић auth_token)

За странице контролне табле и административне операције.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Колачић је сесија само када JWT се проверава **и** садржи `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Сваки
корисник колачића (заштита рута контролне табле (`isDashboardSessionAuthenticated()`), освежавање у authz конвејеру, WebSocket руковање, live
server, `/api/settings/require-login`, `/api/auth/status`) пролази кроз ову помоћну функцију.
Постоје и други JWT-ови потписани са `JWT_SECRET`: проксi Cursor CLI-ја издаје
токене `iss "omniroute" / aud "cursor-cli"` за држаоце кључева и они никада нису сесије
(#13298).

Проверава га `isDashboardSessionAuthenticated()` у `src/shared/utils/apiAuth.ts`. Конвејер аутоматски освежава JWT када му је остало мање од 7 дана од његовог 30-дневног века трајања.

Сесија може да престане и пре истека 30 дана, јер сваки издавач пролази кроз `mintDashboardSessionToken` (време издавања `iat` и идентификатор `jti`), а верификатор проверава два подешавања: `sessionsValidAfter`, које се поставља при промени лозинке, тако да све сесије издате пре ње престају да се верификују (прегледач који је променио лозинку добија нови колачић), и `revokedDashboardSessions`, у коју `POST /api/auth/logout` додаје `jti` одјављене сесије. Сесије издате у старијем издању немају ниједно од ова два поља и остају важеће до прве промене лозинке. Ако подешавања не могу да се прочитају, сесија се не сматра поузданом.

Неке руте управљања прихватају **било који** од два режима: колачић ИЛИ `Bearer <key>`, када API кључ има опсег `manage` (или `admin`). Управо то омогућава радни ток „подешавање путем API позива“ додат у v3.8.

#### Опциони OIDC улаз (#6973)

Пријава администратора у контролну таблу такође подржава **опциони** OIDC (OpenID Connect)
ток, поред подразумеване пријаве лозинком. Пријава лозинком се никада не уклања, већ се само допуњује:

- Искључено, осим ако није `settings.oidcEnabled === true` **и** ако нису сви `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` подешени (Settings → Auth). `GET /api/auth/oidc/login` враћа `400` у супротном.
- `GET /api/auth/oidc/login` открива `authorization_endpoint` из `/.well-known/openid-configuration` издаваоца
  (ако га нема, користи се `<issuer>/authorize`), gradi redirect URI из долазног захтева
  (уз поштовање `x-forwarded-proto`) и преусмерава на IdP са насумичним `state`-ом сачуваним у `httpOnly`
  колачићу `oidc_state`.
- `GET /api/auth/oidc/callback` проверава `state`, мења код за ауторизацију и проверава потпис ID токена
  преко JWKS-а издаваоца (`jose`'s `createRemoteJWKSet`, кешира се по JWKS URI-ју) уз провере `issuer`
  и `audience`. Листа `oidcAllowedSubjects` је обавезна: упоређује се са `sub` claim-ом токена или са `email`
  claim-ом. Claim `email` се узима у обзир само када је `email_verified === true`, тако да непотврђена адреса
  код IdP-а никада не може проћи капију. Без уноса callback одбија сваку пријаву (`not_configured`).
- При успеху се издаје **исти** 30-дневни JWT `auth_token` који издаје и пријава лозинком
  (`src/app/api/auth/login/route.ts`), тако да остатак конвејера сесије контролне табле (аутоматско освежавање,
  заставице колачића) остаје непромењен. OIDC мења само начин на који се колачић издаје, а не оно што он даје.
- Свако подешавање `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`,
  `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) налази се у
  `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  одговара са `400 PASSWORD_REQUIRED`, осим ако тело не садржи лозинку за управљање као `currentPassword`
  (при погрешној лозинки одговор је `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` забрањује _пријаву_
  лозинком (`POST /api/auth/login`), али задржава сачувани хеш лозинке, а поновна аутентификација и даље проверава
  `currentPassword` према њему.
- `corsOrigins` и `bruteForceProtection` такође су у `SECURITY_IMPACTING_SETTINGS_KEYS`: слабљење било којег од њих
  смањује одбрану пријаве, па за њих важи иста поновна аутентификација преко `currentPassword`-а (картица Security то
  тражи), а увоз JSON-а их одбацује.
- Сваки кључ безбедносне политике — уноси у `SECURITY_IMPACTING_SETTINGS_KEYS`, сви `oidc*` кључеви и стање
  сесије контролне табле — доступан је **само оператору** у `PATCH /api/settings`: API кључ са опсегом `manage`
  или токен за приступ `oma_` добијају `403`, чак и када пошаљу тачан `currentPassword`, а одбијање се бележи у
  ревизији као `settings.update_failed` са `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` у
  `src/lib/api/operatorCredential.ts`). Уобичајена подешавања (тема, поставке приказа) и даље су доступна за
  упис кључу `manage` или токену за приступ `admin`. Свака измена самог `/api/settings` (и
  `/api/settings/require-login`) такође захтева опсег `admin` токена за приступ (`ADMIN_MUTATION_EXACT_PATHS` у
  `src/server/authz/accessScopes.ts`, тачно поклапање путање). `GET` остаје са `read`, а остале подрутe
  `/api/settings/*` (проксији, подразумеване вредности комбинација, алијаси модела, компресија, чишћења…) задржавају
  опсег `write` који се изводи из метода.
- `POST /api/settings/import-json` прескаче ову поновну аутентификацију, па пре уписа одбацује све кључеве из
  `IMPORT_STRIPPED_SETTINGS_KEYS` (исти фајл): лозинку и `currentPassword`, сваки унос из
  `SECURITY_IMPACTING_SETTINGS_KEYS` и стање сесије контролне табле (`sessionsValidAfter`,
  `revokedDashboardSessions`). Зато увоз старије резервне копије не може да оживи сесију коју су већ окончали
  промена лозинке или одјава.

## Класе рута

`src/server/authz/types.ts` дефинише три класе; свака рута која не може да се класификује детерминистички подразумевано припада класи `MANAGEMENT`.

| Класа        | Опис                                                                                                                                                           | Потребна аутентификација                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `PUBLIC`     | Изричито безбедне руте: пријава, одјава, статус, иницијализација, провера здравља, почетно подешавање при уводу.                                               | Није потребна                                                                   |
| `CLIENT_API` | Крајње тачке за услуживање модела: `/api/v1/*`, `/api/v1beta/*`, као и алијаси `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer кључ када је укључена ефективна функционална заставица `REQUIRE_API_KEY` |
| `MANAGEMENT` | Странице контролне табле, подешавања, провајдери, кључеви, административне и дијагностичке крајње тачке.                                                       | Сесија контролне табле ИЛИ Bearer са опсегом `manage`                           |

Неке радње `MANAGEMENT` су **само за оператора**: кључ са опсегом `manage` није довољан.
Извоз сачуваних акредитива (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), враћање резервне копије преко актуелних података
(`POST /api/db-backups/import`, укључујући `dryRun=true`, `POST /api/db-backups` враћање по id-ју,
`POST /api/settings/import-json`), као и уклањање тачака за враћање (чишћење преко `DELETE /api/db-backups`
и `PATCH /api/db-backups`, јер задржавање које овај метод чува покреће аутоматско брисање после
сваке резервне копије) захтевају сесију контролне табле, локални CLI субјект или искључену пријаву.
Издавање токена за синхронизацију (`POST /api/sync/tokens`) и прављење CLI токена за приступ са опсегом `admin`
(`POST /api/cli/tokens`) захтевају сесију контролне табле или локални CLI субјект у сваком режиму пријаве.
API кључеви било ког опсега и токени за приступ `oma_` нису операторски акредитиви: кад се захтева оператор,
добијају `403`. Провера се налази у `src/lib/api/operatorCredential.ts`
(`resolveOperatorCredential()` / `requireOperatorCredential()`). Промена подешавања пријаве такође је само за оператора:
`POST /api/settings/require-login` (постављање лозинке за управљање / укључивање или искључивање `requireLogin`)
прихвата само те акредитиве када лозинка већ постоји. Прозор почетног подешавања (лозинка још не постоји)
не мења се, а сесија контролне табле мора да пошаље `currentPassword` да би заменила лозинку (`403` ако недостаје
или је погрешна; бележи се у ревизији као `settings.update_failed`). Локални CLI и инстанца са искљученом пријавом
задржавају путању за опоравак и могу да поставе лозинку без ње, јер су обе везане за хост који поседује
директоријум са подацима.

## Ток обраде

```
Долазни захтев → src/proxy.ts
  → runAuthzPipeline() у src/server/authz/pipeline.ts
    1. Уклони поуздана интерна заглавља (x-omniroute-auth-*, x-omniroute-route-class)
    2. Генериши идентификатор захтева, класификуј руту преко classifyRoute()
    3. Ако је pathname == "/" → преусмери на /dashboard
    4. Ако је у току пражњење (контролисано гашење) и /api/* → 503
    5. Ако је non-GET /api/* → примени checkBodySize() заштиту
    6. Ако је OPTIONS → CORS preflight 204
    7. Ако је options.enforce == false → проследи са заглављима класе руте
    8. У супротном: POLICIES[routeClass].evaluate(ctx)
       - allow  → постави x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON грешка са correlation_id (странице контролне табле → 302 /login)
```

Поуздана интерна заглавља (дефинисана у `src/server/authz/headers.ts`) се **уклањају из долазних захтева** пре класификације — клијенти не могу унапред поставити `x-omniroute-auth-*` како би се представили као други субјект.

### Уговори смерница

Свака класа руте има смерницу у `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — увек враћа `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — издваја Bearer и проверава га преко `validateApiKey()`. Прелази на анонимни приступ само када је ефективна заставица функције `REQUIRE_API_KEY` онемогућена. Ефективна заставица се одређује преко `isRequireApiKeyEnabled()` (`DB замена заставице функције > process.env.REQUIRE_API_KEY > подразумевана вредност`), тако да заставице функција на контролној табли и променљиве окружења доследно управљају рутама `/api/v1/*`, `/api/v1beta/*` и алијасима; грешке механизма за одређивање доводе до одбијања приступа. Дозвољава захтеве са сесијом контролне табле на клијентским API рутама (укључујући `/api/v1/models`, коју користи каталог модела на контролној табли).
- **`managementPolicy`** (`policies/management.ts`) — прихвата сесију контролне табле, интерне захтеве за синхронизацију модела (који се подударају са `/api/providers/[name]/(sync-models|models)`) или у потпуности прескаче проверу ако `isAuthRequired()` врати false. Враћа 403 (`AUTH_001`) када је Bearer токен присутан, али неважећи, а у супротном 401. Такође примењује нивое заштите рута (LOCAL_ONLY / ALWAYS_PROTECTED) пре било које гране аутентификације — погледајте [Нивои заштите рута](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY путањама у `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (тренутно: `/api/mcp/`) може се приступити ван loopback интерфејса када Bearer кључ садржи опсег `manage`; све остале LOCAL_ONLY путање остају строго ограничене на loopback без обзира на опсег.

Успешна смерница враћа `AuthSubject` са `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Накнадни обрађивачи могу да га прочитају преко `assertAuth(request, "CLIENT_API")` у `src/server/authz/assertAuth.ts`, уместо да поново извршавају логику аутентификације.

## Листа јавних рута

`src/shared/constants/publicApiRoutes.ts` представља експлицитну листу дозвољених рута:

Листа је подељена према **облику**, а ова подела је безбедносно критична (GHSA-74g9-q8f6-793h): префикс се
подудара помоћу `startsWith()`, па се такође подудара са сваком суседном путањом која дели његове почетне знакове.
Префикс `/api/usage/om-usage` означио је `/api/usage/om-usage<anything>` као PUBLIC, а Next то разрешава
као `/api/usage/[connectionId]` — обрађивач који нема сопствену аутентификацију.

```ts
// Стварна подстабла. Свака ставка МОРА да се завршава са „/“ (што се проверава јединичним тестом).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // у classify се третира као CLIENT_API, а не као јавна рута „без аутентификације“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Појединачне руте које се подударају ТАЧНО (са завршном косом цртом или без ње).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Појединачне руте само за читање на које се такође примењује ублажавање CORS ограничења порекла.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Појединачна рута само за читање БЕЗ ублажавања CORS ограничења.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Руте само за читање су јавне **само** за безбедне методе. Напомена: `classifyRoute()` искључује `/api/v1/*` и `/api/v1beta/*` из резервне PUBLIC класификације — оне су увек `CLIENT_API`, тако да се политика Bearer кључева и даље примењује.

## Додавање нове руте

### Образац 1 — Јавна крајња тачка клијентског API-ја (Bearer аутентификација)

Руте под `/api/v1/` и `/api/v1beta/` аутоматски се класификују као `CLIENT_API`. Посреднички софтвер спроводи Bearer проверу; обрађивачи рута не морају да је понављају, али могу да прочитају субјекат ако је то корисно.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логика обрађивача
}
```

### Образац 2 — Управљачка крајња тачка (сесија или Bearer + manage)

Користите `requireManagementAuth()` из `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логика обрађивача
}
```

`requireManagementAuth()` враћа `null` у случају успеха или JSON грешку типа `Response`:

- 401 `AUTH_001` „Аутентификација је обавезна“ — акредитиви уопште нису наведени
- 403 — неважећи Bearer **или** је Bearer присутан, али кључ нема опсег `manage` / `admin`

`hasManageScope(scopes)` враћа true за `"manage"` или `"admin"`.

### Образац 3 — Додавање на јавну листу дозвољених рута

Изаберите скуп према облику, а не према погодности. Једна рута иде у `PUBLIC_API_ROUTES_EXACT` (или у `PUBLIC_READONLY_CORS_API_ROUTES` ако је намењена само за GET); само стварно подстабло иде у `PUBLIC_API_ROUTE_PREFIXES` и оно **мора да се завршава са `/`**. Стављање једне руте на листу префикса такође објављује сваку суседну путању која дели њене почетне знакове — укључујући сродне руте са динамичким сегментима које се додају касније (GHSA-74g9-q8f6-793h). Ажурирајте јединичне тестове у `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` и `tests/unit/authz/classify.test.ts`.

## Opsezi

Tri imenska prostora. Svaki proveravač čita samo sopstvene stringove. Uporedni prikaz,
uključujući zašto `manage` ne uspeva `scopeMatches` za `read:compression` i zašto
`read` pristupni token ne može `PATCH /api/keys/{id}`, nalazi se u
[Tri imenska prostora opsega](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API ključevi sadrže niz `scopes` (sačuvan kao JSON u `api_keys.scopes`, pogledajte `src/lib/db/apiKeys.ts`).

### Opseg upravljanja

- `manage` / `admin` — `hasManageScope`. Pristup upravljačkim API rutama putem Bearer tokena.
- `mcp:connect`, `self:usage`, `self:account-quota` i
  `policy:bypass-provider-quota` su aditivni opsezi sa tačnim podudaranjem. Oni se nalaze
  izvan `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` otvara samo
  `/api/mcp/` ne-povratni izuzetak.

### MCP alatni opsezi

Katalog i pravila podudaranja (identičan string, ili dodeljeni opseg koji se završava sa `*`):
[MCP alatni opsezi](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` u `src/shared/constants/mcpScopes.ts` je originalni tipizirani
podskup, a ne taj puni katalog. Sprovođenje se vrši u
`open-sse/mcp-server/scopeEnforcement.ts` nakon što `resolveCallerScopeContext()`
razreši opsege iz MCP informacija o autentifikaciji, metapodataka zahteva ili `OMNIROUTE_MCP_SCOPES`.
Ostaje isključeno osim ako `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Opsezi pristupnog tokena

`read` / `write` / `admin` na `oma_live_…` tokenima, rangirani po `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Ovaj rang se primenjuje samo na akreditive
pristupnog tokena. Pogledajte [Autentifikacija upravljanja](../guides/MANAGEMENT-AUTH.md).

## Прекидач обавезне аутентификације

`isAuthRequired()` у `src/shared/utils/apiAuth.ts` одлучује да ли се за захтев примењује **било каква** аутентификација:

- `settings.requireLogin === false` → аутентификација је глобално искључена, осим за увек заштићени ниво
  (видети [Нивои заштите рута](../security/ROUTE_GUARD_TIERS.md)) и позиве који издају акредитив који систем прихвата.
  За њих важе исти акредитиви као и при укљученој пријави: издавање токена за синхронизацију, издавање CLI токена за приступ
  са било којим опсегом, као и прављење API кључа са опсегом `manage`/`admin`, додељивање таквог опсега кључу,
  регенерисање или приказивање таквог кључа (`requireCredentialForManagementScopedKey()` у
  `src/lib/api/requireManagementAuth.ts`). Кључеви само за инференцију остају отворени.
- Лозинка није подешена **и** не постоји променљива окружења `INITIAL_PASSWORD` → режим почетног подешавања дозвољава
  чаробњака за увод и захтеве са loopback адресе, али захтеви из мреже и даље захтевају акредитиве.
- Било каква грешка у бази → одбијање (безбедно подразумевано, fail closed).

Провера клијентских API кључева користи `isRequireApiKeyEnabled()` у `src/shared/utils/featureFlags.ts`,
а не директно читање `process.env.REQUIRE_API_KEY`. То је важно за распоређене инстанце: укључивање или искључивање
`REQUIRE_API_KEY` у Dashboard → Feature Flags чува перегазивање у бази и одмах утиче на `/v1/*`, `/v1beta/*`, `/models`,
`/responses`, `/chat/completions`, `/codex/*` и друге провере клијентског API-ја које користе ову помоћну функцију.
Ако складиште заставица не може да се прочита, аутентификација клијентског API-ја одбија захтев и тражи кључ.

## Promena koja narušava kompatibilnost — v3.8.0

Krajnje tačke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtevaju upravljačku autentifikaciju** (izmena `588a0333`). Klijenti koji su ranije slali običan API ključ bez opsega `manage` dobijaju `403`. Migracija: dodelite ključu opseg `manage` na kontrolnoj tabli API ključeva ili koristite prijavljenu sesiju kontrolne table.

## Promena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP server) je i dalje podrazumevano LOCAL_ONLY, ali sada prihvata zahteve koji ne dolaze sa povratne sprege kada zaglavlje `Authorization: Bearer <api-key>` sadrži opseg `manage`. Izuzetak se eksplicitno omogućava za svaku putanju putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; srodni prefiks LOCAL_ONLY `/api/cli-tools/runtime/*` namerno nije moguće zaobići jer može da pokrene proizvoljne potprocese. Anonimni zahtevi ka `/api/mcp/*` koji ne dolaze sa povratne sprege i dalje vraćaju `403 LOCAL_ONLY` — podrazumevano ponašanje za svaku novu LOCAL_ONLY putanju ostaje strogo ograničeno na povratnu spregu. Pogledajte [Nivoi zaštite ruta](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javna lista dozvoljenih ruta: `tests/unit/public-api-routes.test.ts`.
- Pokretanje ciljanog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Отклањање грешака

Систем за обраду увек означава одговоре следећим заглављима:

```
x-request-id:               <идентификатор корелације, поновљен у телима грешака>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

За аутентификоване захтеве, заглавља захтева прослеђеног узводној страни (руковаоцу) такође садрже:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<последње 4 цифре> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (опционо)
x-omniroute-auth-scopes:    листа раздвојена зарезима
```

Користите `assertAuth(req, expectedClass)` унутар руковалаца — баца `AuthzAssertionError` са кодом `AUTHZ_NOT_INITIALIZED` ако је посреднички софтвер заобиђен (корисно за откривање регресија конфигурације у тестовима).

## Pogledajte takođe

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka za autentifikaciju po krajnjoj tački
- [COMPLIANCE.md](../security/COMPLIANCE.md) — dnevnik revizije za događaje autentifikacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tri imenska prostora opsega i MCP katalog opsega alata
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
