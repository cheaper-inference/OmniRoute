# Authorization Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Източник на истина:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Последна актуализация:** 2026-09-22 — пространствата от имена на обхватите сочат към MCP-SERVER.md

OmniRoute разполага с ориентиран към маршрутите конвейер за оторизация, който контролира всяка API заявка. Класифицирането е **детерминистично** и **затворено при неуспех** — всичко, което не може да бъде класифицирано, се причислява към `MANAGEMENT` и изисква сесия или токен с управленско ниво на достъп. Тази страница обяснява модела за инженерите, които поддържат маршрути или проектират нови крайни точки.

![Конвейер за AuthZ (3 класа маршрути + оценяване на политики)](../diagrams/exported/authz-pipeline.svg)

> Източник: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режима на удостоверяване

### 1. API ключ (Bearer)

Използва се за клиентските API, съвместими с OpenAI/Anthropic/Gemini, и за някои маршрути за управление, когато ключът има обхват `manage`.

```
Authorization: Bearer <api-key>
```

Проверява се от `isValidApiKey()` / `extractApiKey()` в `src/sse/services/auth.ts` и се реекспортира през `src/shared/utils/apiAuth.ts`. Валидаторът приема и променливите на средата `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` като постоянни ключове за пропускане (issue #1350).

### 2. Сесия в таблото за управление (бисквитка auth_token)

За страниците на таблото за управление и административните операции.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Бисквитката е сесия само когато JWT се проверява **и** съдържа `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Всеки
потребител на бисквитката (защитата на маршрутите на таблото (`isDashboardSessionAuthenticated()`), обновяването в конвейера authz, ръкостискането на WebSocket, live
server, `/api/settings/require-login`, `/api/auth/status`) минава през този помощен модул.
Съществуват и други JWT, подписани с `JWT_SECRET`: проксито на Cursor CLI издава
токени `iss "omniroute" / aud "cursor-cli"` за притежателите на ключове и те никога не са сесии
(#13298).

Проверява се от `isDashboardSessionAuthenticated()` в `src/shared/utils/apiAuth.ts`. Конвейерът автоматично обновява JWT, когато до края на 30-дневния му живот остават по-малко от 7 дни.

Сесия може да приключи и преди изтичането на 30-те дни, защото всеки издател минава през `mintDashboardSessionToken` (време на издаване `iat` и идентификатор `jti`), а верификаторът проверява две настройки: `sessionsValidAfter`, която се задава при смяна на паролата, така че всички сесии, издадени преди нея, спират да се проверяват (браузърът, сменил паролата, получава нова бисквитка), и `revokedDashboardSessions`, към която `POST /api/auth/logout` добавя `jti` на излезлата сесия. Сесиите, издадени от по-стара версия, нямат нито едно от тези полета и остават валидни до първата смяна на паролата. Ако настройките не могат да се прочетат, сесията не се смята за доверена.

Някои маршрути за управление приемат **всеки** от двата режима: бисквитка ИЛИ `Bearer <key>`, когато API ключът има обхват `manage` (или `admin`). Именно това позволява работният процес „конфигуриране чрез API извиквания“, добавен във v3.8.

#### Незадължителен OIDC вход (#6973)

Входът на администратора в таблото поддържа и **незадължителен** OIDC (OpenID Connect)
поток, наред с обичайния вход с парола. Входът с парола никога не се премахва, а само се допълва:

- Деактивиран, освен ако `settings.oidcEnabled === true` **и** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` са всички конфигурирани (Settings → Auth). `GET /api/auth/oidc/login` връща `400` в противен случай.
- `GET /api/auth/oidc/login` открива `authorization_endpoint` от `/.well-known/openid-configuration` на издателя
  (при липса се използва `<issuer>/authorize`), изгражда redirect URI от входящата заявка
  (с отчитане на `x-forwarded-proto`) и пренасочва към IdP със случаен `state`, съхранен в `httpOnly`
  бисквитката `oidc_state`.
- `GET /api/auth/oidc/callback` проверява `state`, обменя кода за авторизация и проверява подписа на ID токена
  чрез JWKS на издателя (`jose`'s `createRemoteJWKSet`, кеширан по JWKS URI) с проверки за `issuer`
  и `audience`. Списъкът `oidcAllowedSubjects` е задължителен: той се сравнява с claim `sub` на токена или с claim
  `email`. Claim-ът email се приема само когато `email_verified === true`, така че непотвърдена поща при IdP
  никога не може да премине портата. Без записи callback-ът отхвърля всеки вход (`not_configured`).
- При успех се издава **същият** 30-дневен JWT `auth_token`, който издава и входът с парола
  (`src/app/api/auth/login/route.ts`), така че останалият конвейер на сесията на таблото (автоматично обновяване,
  флагове на бисквитката) не се променя. OIDC сменя само начина, по който се издава бисквитката, а не какво дава тя.
- Всяка настройка `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`,
  `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) е в
  `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  отговаря с `400 PASSWORD_REQUIRED`, освен ако тялото не съдържа паролата за управление като `currentPassword`
  (при грешна парола отговорът е `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` забранява _входа_ с парола
  (`POST /api/auth/login`), но запазва съхранения хеш на паролата, а повторното удостоверяване пак проверява
  `currentPassword` срещу него.
- `corsOrigins` и `bruteForceProtection` също са в `SECURITY_IMPACTING_SETTINGS_KEYS`: отслабването на което и да е
  от тях намалява защитите при вход, затова се изисква същото повторно удостоверяване с `currentPassword`
  (раздел Security го изисква), а импортът на JSON ги отхвърля.
- Всеки ключ на политиката за сигурност — записите в `SECURITY_IMPACTING_SETTINGS_KEYS`, всички ключове `oidc*` и
  състоянието на сесията на таблото — е достъпен **само за оператора** в `PATCH /api/settings`: API ключ с обхват
  `manage` или токен за достъп `oma_` получава `403`, дори да изпрати правилния `currentPassword`, а отказът се записва
  в одита като `settings.update_failed` с `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` в
  `src/lib/api/operatorCredential.ts`). Обикновените настройки (тема, визуални предпочитания) остават достъпни
  за запис за ключ `manage` или токен за достъп `admin`. Всяка промяна на самия `/api/settings` (и на
  `/api/settings/require-login`) също изисква обхват `admin` на токен за достъп (`ADMIN_MUTATION_EXACT_PATHS` в
  `src/server/authz/accessScopes.ts`, точно съвпадение на пътя). `GET` остава с `read`, а останалите подпътища
  на `/api/settings/*` (прокси, стандартни настройки на комбо, псевдоними на модели, компресия, изчистване…)
  запазват обхвата `write`, изведен от метода.
- `POST /api/settings/import-json` пропуска това повторно удостоверяване, затова преди запис изхвърля всички ключове
  от `IMPORT_STRIPPED_SETTINGS_KEYS` (същия файл): паролата и `currentPassword`, всеки запис от
  `SECURITY_IMPACTING_SETTINGS_KEYS` и състоянието на сесията на таблото (`sessionsValidAfter`,
  `revokedDashboardSessions`). Затова импортирането на по-стар архив не може да съживи сесия, която вече е
  прекратена със смяна на паролата или с излизане.

## Класове маршрути

`src/server/authz/types.ts` дефинира три класа; всеки маршрут, който не може да се класифицира детерминистично, се причислява по подразбиране към `MANAGEMENT`.

| Клас         | Описание                                                                                                                                                               | Изисквано удостоверяване                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `PUBLIC`     | Изрично безопасни маршрути: вход, изход, статус, инициализация, проверка на състоянието, начално настройване при онбординг.                                            | Не се изисква                                                                 |
| `CLIENT_API` | Крайни точки за обслужване на модели: `/api/v1/*`, `/api/v1beta/*`, както и псевдоними `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer ключ, когато е активирана ефективната флагче-функция `REQUIRE_API_KEY` |
| `MANAGEMENT` | Страници на таблото за управление, настройки, доставчици, ключове, крайни точки за администриране и диагностика.                                                       | Сесия в таблото ИЛИ Bearer с обхват `manage`                                  |

Някои действия `MANAGEMENT` са **само за оператора**: ключ с обхват `manage` не е достатъчен.
Износът на съхранените удостоверителни данни (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), възстановяването на архив върху текущите данни
(`POST /api/db-backups/import`, включително с `dryRun=true`, `POST /api/db-backups` с възстановяване по id,
`POST /api/settings/import-json`), както и премахването на точки за възстановяване (почистване с `DELETE /api/db-backups`
и `PATCH /api/db-backups`, защото запазената от този метод политика за съхранение задейства автоматичното изчистване
след всяко архивиране), изискват сесия в таблото, локалния CLI субект или изключен вход.
Издаването на токен за синхронизация (`POST /api/sync/tokens`) и създаването на CLI токен за достъп с обхват `admin`
(`POST /api/cli/tokens`) изискват сесия в таблото или локалния CLI субект при всеки режим на вход.
API ключовете с всякакъв обхват и токените за достъп `oma_` не са операторски удостоверителни данни: когато се изисква,
те получават `403`. Проверката се извършва в `src/lib/api/operatorCredential.ts`
(`resolveOperatorCredential()` / `requireOperatorCredential()`). Промяната на настройките за вход също е само за оператора:
`POST /api/settings/require-login` (задаване на паролата за управление / превключване на `requireLogin`) приема само
тези удостоверителни данни, след като вече има парола. Прозорецът за първоначално настройване (още няма парола)
не се променя, а сесията в таблото трябва да изпрати `currentPassword`, за да смени паролата (`403`, ако липсва или е
грешна; записва се в одита като `settings.update_failed`). Локалният CLI и инстанцията с изключен вход запазват
пътя за възстановяване и могат да зададат парола без нея, тъй като и двете са свързани с хоста, на който принадлежи
директорията с данни.

## Конвейер

```
Входяща заявка → src/proxy.ts
  → runAuthzPipeline() в src/server/authz/pipeline.ts
    1. Премахване на доверените вътрешни заглавки (x-omniroute-auth-*, x-omniroute-route-class)
    2. Генериране на идентификатор на заявката, класифициране на маршрута чрез classifyRoute()
    3. Ако pathname == "/" → пренасочване към /dashboard
    4. Ако се извършва изчакване за плавно спиране и /api/* → 503
    5. Ако методът не е GET и маршрутът е /api/* → проверка чрез защитата checkBodySize()
    6. Ако методът е OPTIONS → CORS предварителна заявка 204
    7. Ако options.enforce == false → пропускане със заглавки за класа на маршрута
    8. В противен случай: POLICIES[routeClass].evaluate(ctx)
       - разрешаване → задаване на x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - отхвърляне → JSON грешка с correlation_id (страници на таблото → 302 /login)
```

Доверените вътрешни заглавки (дефинирани в `src/server/authz/headers.ts`) се **премахват от входящите заявки** преди класифицирането — клиентите не могат предварително да задават `x-omniroute-auth-*`, за да се представят за друг субект.

### Договори на политиките

Всеки клас маршрут има политика в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — винаги връща `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — извлича Bearer и го валидира чрез `validateApiKey()`. Преминава към анонимен достъп само когато ефективният флаг за функционалност `REQUIRE_API_KEY` е деактивиран. Ефективният флаг се определя чрез `isRequireApiKeyEnabled()` (`замяна от флаг за функционалност в БД > process.env.REQUIRE_API_KEY > стойност по подразбиране`), така че флаговете за функционалност в таблото и променливите на средата да управляват последователно `/api/v1/*`, `/api/v1beta/*` и псевдонимите; при грешка в определянето достъпът се отказва. Разрешава заявки със сесия на таблото към клиентски API маршрути (включително `/api/v1/models`, използван от каталога с модели на таблото).
- **`managementPolicy`** (`policies/management.ts`) — приема сесия на таблото, вътрешни заявки за синхронизиране на модели (съпоставяни с `/api/providers/[name]/(sync-models|models)`) или пропуска изцяло проверката, ако `isAuthRequired()` върне false. Връща 403 (`AUTH_001`), когато е предоставен Bearer токен, но той е невалиден, и 401 във всички останали случаи. Освен това прилага нивата за защита на маршрутите (LOCAL_ONLY / ALWAYS_PROTECTED) преди който и да е клон за автентикация — вижте [Нива за защита на маршрутите](../security/ROUTE_GUARD_TIERS.md). Пътищата LOCAL_ONLY в `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (понастоящем: `/api/mcp/`) могат да бъдат достъпвани извън loopback интерфейса, когато Bearer ключът има обхват `manage`; всички останали пътища LOCAL_ONLY остават строго ограничени до loopback независимо от обхвата.

Успешната политика връща `AuthSubject` с `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Обработчиците надолу по веригата могат да го прочетат чрез `assertAuth(request, "CLIENT_API")` в `src/server/authz/assertAuth.ts`, вместо да изпълняват повторно логиката за автентикация.

## Списък с публични маршрути

`src/shared/constants/publicApiRoutes.ts` е изричният списък с разрешени маршрути:

Списъкът е разделен според **формата**, като това разделение е критично важно (GHSA-74g9-q8f6-793h): префиксът се съпоставя чрез `startsWith()`, така че съвпада и с всеки съседен път, който споделя началните му символи.
Използването на `/api/usage/om-usage` като префикс направи `/api/usage/om-usage<anything>` ПУБЛИЧЕН, а Next го преобразува до `/api/usage/[connectionId]` — обработчик без собствено удостоверяване.

```ts
// Реални поддървета. Всеки запис ТРЯБВА да завършва с "/" (проверява се от модулен тест).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // третира се като CLIENT_API в classify, а не като публичен маршрут „без удостоверяване“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Единични маршрути, съпоставяни ТОЧНО (със или без завършваща наклонена черта).
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

// Единични маршрути само за четене, за които се прилага и облекчаването на ограниченията за CORS origin.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Единичен маршрут само за четене БЕЗ облекчаване на ограниченията за CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршрутите само за четене са публични **единствено** за безопасни методи. Забележка: `classifyRoute()` изключва `/api/v1/*` и `/api/v1beta/*` от резервното класифициране като PUBLIC — те винаги са `CLIENT_API`, така че политиката за Bearer ключове продължава да се прилага.

## Добавяне на нов маршрут

### Шаблон 1 — Публична крайна точка на клиентския API (Bearer удостоверяване)

Маршрутите под `/api/v1/` и `/api/v1beta/` автоматично се класифицират като `CLIENT_API`. Middleware компонентът налага Bearer проверката; не е необходимо обработчиците на маршрути да я повтарят, но могат да прочетат субекта, ако това е полезно.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логика на обработчика
}
```

### Шаблон 2 — Крайна точка за управление (сесия или Bearer + manage)

Използвайте `requireManagementAuth()` от `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логика на обработчика
}
```

При успех `requireManagementAuth()` връща `null`, а при грешка — JSON `Response`:

- 401 `AUTH_001` „Изисква се удостоверяване“ — липсват каквито и да е идентификационни данни
- 403 — невалиден Bearer **или** е предоставен Bearer, но ключът няма обхват `manage` / `admin`

`hasManageScope(scopes)` връща true за `"manage"` или `"admin"`.

### Шаблон 3 — Добавяне към публичния списък с разрешени маршрути

Изберете множеството според формата, а не според удобството. Единичен маршрут се добавя в `PUBLIC_API_ROUTES_EXACT` (или в `PUBLIC_READONLY_CORS_API_ROUTES`, ако е само за GET); единствено реално поддърво се добавя в `PUBLIC_API_ROUTE_PREFIXES` и то **трябва да завършва с `/`**. Добавянето на единичен маршрут в списъка с префикси прави публичен и всеки съседен път, който споделя началните му символи — включително маршрути със сродни динамични сегменти, добавени по-късно (GHSA-74g9-q8f6-793h). Актуализирайте модулните тестове в `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` и `tests/unit/authz/classify.test.ts`.

## Обхвати

Три пространства от имена. Всяка проверка чете само собствените си низове. Съпоставката,
включително защо `manage` не преминава `scopeMatches` за `read:compression` и защо
токен за достъп с `read` не може да изпълни `PATCH /api/keys/{id}`, е описана в
[Три пространства от имена за обхвати](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API ключовете съдържат масив `scopes` (съхраняван като JSON в `api_keys.scopes`, вижте `src/lib/db/apiKeys.ts`).

### Обхват за управление

- `manage` / `admin` — `hasManageScope`. Bearer достъп до маршрутите на API за управление.
- `mcp:connect`, `self:usage`, `self:account-quota` и
  `policy:bypass-provider-quota` са допълващи обхвати с точно съвпадение. Те са
  извън `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` отваря само
  изключението за адреси извън loopback за `/api/mcp/`.

### Обхвати на MCP инструменти

Каталог и правила за съвпадение (идентичен низ или предоставен обхват, завършващ на `*`):
[Обхвати на MCP инструменти](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` в `src/shared/constants/mcpScopes.ts` е първоначалното типизирано
подмножество, а не пълният каталог. Налагането на ограниченията се извършва в
`open-sse/mcp-server/scopeEnforcement.ts`, след като `resolveCallerScopeContext()`
разреши обхватите от информацията за MCP удостоверяване, метаданните на заявката или `OMNIROUTE_MCP_SCOPES`.
То остава изключено, освен ако `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Обхвати на токени за достъп

`read` / `write` / `admin` при токени `oma_live_…`, подредени по ранг чрез `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Този ранг се прилага само към идентификационните
данни на токена за достъп. Вижте [Удостоверяване за управление](../guides/MANAGEMENT-AUTH.md).

## Превключвател за задължително удостоверяване

`isAuthRequired()` в `src/shared/utils/apiAuth.ts` решава дали за дадена заявка се прилага **някакво** удостоверяване:

- `settings.requireLogin === false` → удостоверяването е изключено глобално, с изключение на винаги защитеното ниво
  (вж. [Нива на защита на маршрутите](../security/ROUTE_GUARD_TIERS.md)) и извикванията, които издават удостоверителни данни,
  приемани от системата. За тях се изисква същото удостоверителни данни, както при включен вход: издаване на токени
  за синхронизация, издаване на CLI токени за достъп с всякакъв обхват, както и създаване на API ключ с обхват
  `manage`/`admin`, даване на такъв обхват на ключ, пренареждане или показване на такъв ключ
  (`requireCredentialForManagementScopedKey()` в `src/lib/api/requireManagementAuth.ts`). Ключовете само за инференция
  остават отворени.
- Не е конфигурирана парола **и** няма променлива на средата `INITIAL_PASSWORD` → режимът на начално настройване позволява
  съветника за онбординг и заявките от loopback, но заявките от мрежата все още изискват удостоверителни данни.
- Всяка грешка в БД → отказ (сигурно по подразбиране, fail closed).

Проверката на клиентските API ключове използва `isRequireApiKeyEnabled()` в `src/shared/utils/featureFlags.ts`,
а не директно четене на `process.env.REQUIRE_API_KEY`. Това е важно за разгърнатите инстанции: превключването на
`REQUIRE_API_KEY` в Dashboard → Feature Flags записва изключение в БД и веднага засяга `/v1/*`, `/v1beta/*`, `/models`,
`/responses`, `/chat/completions`, `/codex/*` и другите проверки на клиентското API, които използват този помощен модул.
Ако хранилището на флаговете не може да се прочете, удостоверяването на клиентското API отказва и изисква ключ.

## Несъвместима промяна — v3.8.0

Крайните точки `/api/v1/agents/tasks/*` и `/api/resilience/model-cooldowns` **вече изискват удостоверяване за управление** (commit `588a0333`). Клиентите, които преди са изпращали обикновен API ключ без обхвата `manage`, получават `403`. Миграция: или задайте на ключа обхвата `manage` в таблото API Keys, или използвайте сесия с влизане в таблото.

## Промяна в поведението — v3.8.2

`/api/mcp/*` (отдалеченият MCP сървър) все още е LOCAL_ONLY по подразбиране, но вече приема заявки, които не са loopback, когато заглавката `Authorization: Bearer <api-key>` съдържа обхвата `manage`. Изключението се управлява изрично за всеки път чрез `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` в `src/server/authz/routeGuard.ts`; сродният LOCAL_ONLY префикс `/api/cli-tools/runtime/*` умишлено НЕ може да бъде заобиколен, защото може да стартира произволни подпроцеси. Анонимните заявки към `/api/mcp/*`, които не са loopback, продължават да връщат `403 LOCAL_ONLY` — поведението по подразбиране за всеки нов LOCAL_ONLY път остава строго ограничено до loopback. Вижте [Нива на защита на маршрутите](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Тестване

- Модулни тестове: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Публичен списък с разрешени маршрути: `tests/unit/public-api-routes.test.ts`.
- Изпълнение на конкретен тест: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Отстраняване на грешки

Конвейерът винаги добавя към отговорите:

```
x-request-id:               <идентификатор за корелация, повтарян в телата на грешките>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

При удостоверени заявки заглавките на заявката към upstream (от страната на обработчика) включват също:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<последните-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (незадължително)
x-omniroute-auth-scopes:    списък, разделен със запетаи
```

Използвайте `assertAuth(req, expectedClass)` в обработчиците — тя хвърля `AuthzAssertionError` с код `AUTHZ_NOT_INITIALIZED`, ако междинният софтуер е бил заобиколен (полезно за откриване на регресии в конфигурацията при тестове).

## Вижте също

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер за удостоверяване за всяка крайна точка
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал за одит на събитията по удостоверяване
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — три пространства от имена за обхвати и каталог на обхватите на MCP инструментите
- Изходен код: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
