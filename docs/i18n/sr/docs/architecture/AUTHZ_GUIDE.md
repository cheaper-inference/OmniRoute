# Authorization Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Izvor istine:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Poslednje ažurirano:** 2026-09-22 — prostori imena opsega ukazuju na MCP-SERVER.md

OmniRoute ima autorizacionu cevovodnu liniju svesnu ruta koja kontroliše svaki API zahtev. Klasifikacija je **deterministička** i **fail-closed** — sve što se ne može klasifikovati završava kao `MANAGEMENT` i zahteva sesiju ili token menadžerskog nivoa. Ova stranica objašnjava model za inženjere koji održavaju rute ili dizajniraju nove krajnje tačke.

![AuthZ cevovodna linija (3 klase ruta + evaluacija politike)](../diagrams/exported/authz-pipeline.svg)

> Izvor: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva režima autentifikacije

### 1. API ključ (Bearer)

Koristi se za klijentske API-je kompatibilne sa OpenAI/Anthropic/Gemini i nekoliko ruta za upravljanje kada ključ ima opseg `manage`.

```
Authorization: Bearer <api-key>
```

Validira ga `isValidApiKey()` / `extractApiKey()` u `src/sse/services/auth.ts`, a ponovo se izvozi kroz `src/shared/utils/apiAuth.ts`. Validator takođe prihvata promenljive okruženja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kao trajne prolazne ključeve (problem #1350).

### 2. Sesija nadzorne table (auth_token kolačić)

Za stranice nadzorne table i administratorske operacije.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kolačić predstavlja sesiju samo kada JWT prođe verifikaciju **i** sadrži `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Svaki
potrošač kolačića (čuvar rute nadzorne table (`isDashboardSessionAuthenticated()`), osvežavanje
authz cevovoda, WebSocket rukovanje, aktivni server,
`/api/settings/require-login`, `/api/auth/status`) prolazi kroz taj pomoćni element.
Postoje i drugi JWT-ovi potpisani pomoću `JWT_SECRET` — Cursor CLI prolaz izdaje
tokene `iss "omniroute" / aud "cursor-cli"` za nosioce ključeva — i oni nikada nisu sesije
(#13298).

Verifikaciju obavlja `isDashboardSessionAuthenticated()` u `src/shared/utils/apiAuth.ts`. Cevovod automatski osvežava JWT kada mu preostaje manje od 7 dana od njegovog životnog veka od 30 dana.

Sesija takođe može da se završi pre isteka 30 dana, zato što svaki izdavalac prolazi kroz `mintDashboardSessionToken` (vreme izdavanja `iat` i identifikator `jti`), a verifikator proverava dve postavke: `sessionsValidAfter`, koja se postavlja promenom lozinke, tako da svaka sesija izdata pre toga prestaje da prolazi verifikaciju (pregledač koji je promenio lozinku dobija novi kolačić), i `revokedDashboardSessions`, u koju `POST /api/auth/logout` dodaje `jti` odjavljene sesije. Sesije izdate starijom verzijom nemaju nijedan od tih zahteva i ostaju važeće do prve promene lozinke. Ako postavke ne mogu da se pročitaju, sesija se ne smatra pouzdanom.

Neke rute za upravljanje prihvataju **bilo koji** režim: kolačić ILI `Bearer <key>` kada API ključ ima opseg `manage` (ili `admin`). To omogućava radni tok „podesivo putem API poziva“, dodat u verziji v3.8.

#### Opciona OIDC prijavna kapija (#6973)

Prijavljivanje administratora na nadzornu tablu takođe podržava **opcionu** OIDC (OpenID Connect) prijavu
uz podrazumevano prijavljivanje lozinkom — prijavljivanje lozinkom se nikada ne uklanja, već se
samo dopunjuje:

- Онемогућено је осим ако је `settings.oidcEnabled === true` **и** ако су
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` конфигурисани (Settings → Auth).
  `GET /api/auth/oidc/login` иначе враћа `400`.
- `GET /api/auth/oidc/login` открива `authorization_endpoint` из
  `/.well-known/openid-configuration` издаваоца (враћа се на
  `<issuer>/authorize`), формира URI за преусмеравање на основу долазног захтева
  (уз подршку за `x-forwarded-proto`) и преусмерава на IdP са насумичним
  `state` параметром сачуваним у `httpOnly` колачићу `oidc_state`.
- `GET /api/auth/oidc/callback` проверава `state`, размењује ауторизациони
  код и потврђује потпис ID токена преко JWKS-а издаваоца
  (`createRemoteJWKSet` из библиотеке `jose`, кеширано по URI-ју JWKS-а), уз
  провере `issuer` и `audience`. Приступ контролној табли захтева непразну листу
  `oidcAllowedSubjects`, смерницу `oidcAdmissionClaim` или оба услова. Листа
  субјеката упоређује само `sub` или `email` када је `email_verified === true`.
  Опционална смерница за захтев преузима тачку у ID токену раздвојену тачкама
  (на пример, `realm_access.roles`) и низ прихваћених вредности; разрешена
  вредност мора бити низ ниски који садржи најмање једну прихваћену вредност.
  Ако су конфигурисане обе смернице, обе морају бити испуњене. Недостајући или
  неисправно обликовани захтеви подразумевано доводе до одбијања, а без иједне
  смернице повратни позив одбија пријављивање (`not_configured`). Постојеће
  конфигурације засноване само на субјекту настављају да раде непромењено.
- Keycloak обично мапира улоге realm-а у access токене, а не нужно у ID токене.
  Да бисте захтевали realm улогу `admin`, конфигуришите protocol mapper за овај
  клијент тако да укључује `realm_access.roles` у свој **ID токен**, а затим
  подесите `oidcAdmissionClaim` на `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Проверите стварни захтев ID токена за овај клијент пре него што омогућите
  приступ само на основу улоге; апликација не чита улоге из access токена.
  Одбијање токена на страни IdP-а може бити додатна провера, али не замењује
  ову проверу на страни апликације.
- По успешном завршетку издаје **потпуно исти** 30-дневни `auth_token` JWT
  који издаје пријављивање лозинком (`src/app/api/auth/login/route.ts`), па
  остатак процеса сесије контролне табле (аутоматско освежавање, ознаке
  колачића) остаје непромењен — OIDC само замењује начин на који се колачић
  издаје, а не и дозволе које он даје. Промене улога/група на IdP-у не
  поништавају постојеће OmniRoute сесије; одјава, промена лозинке или истек
  сесије и даље одређују њихово трајање.
- Свако подешавање `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) налази се у
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  одговара грешком `400 PASSWORD_REQUIRED` осим ако тело захтева садржи
  администраторску лозинку као `currentPassword` (`401 PASSWORD_MISMATCH` када
  је нетачна). `oidcDisablePasswordLogin` одбија пријављивање лозинком
  (`POST /api/auth/login`), али задржава сачувани хеш лозинке, а поновна
  аутентификација га и даље проверава преко `currentPassword`.
- `corsOrigins` и `bruteForceProtection` се такође налазе у
  `SECURITY_IMPACTING_SETTINGS_KEYS`: попуштање било ког од њих слаби заштиту
  пријављивања, па захтевају исту поновну аутентификацију помоћу
  `currentPassword` (картица Security је захтева), а JSON увоз их изоставља.
- Сваки кључ безбедносне политике — ставке у
  `SECURITY_IMPACTING_SETTINGS_KEYS`, сваки кључ `oidc*` и стање сесије
  контролне табле — има статус **само за оператера** на `PATCH /api/settings`:
  API кључ са опсегом manage или приступни токен `oma_` одбија се са `403` чак
  и када пошаље исправан `currentPassword`, а одбијање се бележи као
  `settings.update_failed` са `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` у `src/lib/api/operatorCredential.ts`).
  Обична подешавања (тема, поставке приказа) и даље могу да се мењају помоћу
  кључа `manage` или приступног токена `admin`. Свака измена самог
  `/api/settings` (као и `/api/settings/require-login`) такође захтева опсег
  приступног токена `admin` (`ADMIN_MUTATION_EXACT_PATHS` у
  `src/server/authz/accessScopes.ts`, подударање тачне путање); `GET` и даље
  остаје `read`, а остале подрутине `/api/settings/*` (проксији, подразумеване
  комбиноване вредности, алијаси модела, компресија, чишћења…) задржавају
  опсег `write`, изведен на основу HTTP методе.
- `POST /api/settings/import-json` прескаче ту поновну аутентификацију, па
  пре уписивања изоставља сваки кључ у `IMPORT_STRIPPED_SETTINGS_KEYS`
  (иста датотека): лозинку и `currentPassword`, сваку ставку из
  `SECURITY_IMPACTING_SETTINGS_KEYS` и стање сесије контролне табле
  (`sessionsValidAfter`, `revokedDashboardSessions`). Увоз старије резервне
  копије зато не може поново да активира сесију коју су промена лозинке или
  одјава већ окончале.

#### Опционално двофакторско пријављивање помоћу TOTP-а (#16619)

Подешава се у Settings → Security; искључено је док га оператер не укључи
(`src/server/auth/dashboardMfa.ts`).

- **Obuhvata:** prijavljivanje lozinkom (`POST /api/auth/login`, nakon čega je potreban
  `POST /api/auth/mfa/verify`) i `omniroute connect` (`POST /api/cli/connect`,
  koji odbija razmenu zasnovanu samo na lozinci i prihvata kod kao `totp`).
- **Ne obuhvata:** OIDC / SSO prijavljivanje (`/api/auth/oidc/callback`) ne
  zahteva OmniRoute TOTP. Oslanja se na drugi faktor samog dobavljača identiteta,
  zato nametnite MFA u IdP-u ako je OIDC omogućen.
- **Oporavak** (izgubljen uređaj, nema preostalih kodova za oporavak ili faktor više
  ne može da se verifikuje, na primer nakon promene `STORAGE_ENCRYPTION_KEY`):
  1. Ponovo pokrenite server sa `OMNIROUTE_DISABLE_MFA=true`.
  2. Na samom hostu (loopback peer i loopback `Host`, kao što je
     `http://localhost:20128`), prijavite se lozinkom. Drugi faktor se preskače
     samo za taj origin; svaki drugi origin i dalje zahteva kod.
  3. U Podešavanja → Bezbednost → Onemogući unesite lozinku, a polje za kod ostavite
     prazno. `POST /api/auth/mfa/disable` prihvata telo bez `code` samo dok je
     promenljiva postavljena i zahtev dolazi sa hosta; i dalje zahteva sesiju
     kontrolne table i trenutnu lozinku, a evidentira se kao
     `auth.mfa.disabled` sa vrednošću `secondFactor: "recovery_switch"`.
  4. Uklonite podešavanje `OMNIROUTE_DISABLE_MFA`, ponovo pokrenite server i ponovo
     se registrujte ako je potrebno.

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

## Цевовод

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Поуздана интерна заглавља (дефинисана у `src/server/authz/headers.ts`) су** скинут са долазних захтева** пре класификације — клијенти не могу унапред да попуне `x-omniroute-auth-*` да би имитирали субјект.

### Уговори о политици

Свака класа руте има политику у `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — увек враћа `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — издваја носиоца, проверава преко `validateApiKey()`. Прелази на анонимно само када је деактивирана заставица `REQUIRE_API_KEY` функције онемогућена. Ефективна заставица се решава преко `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) тако да заставице карактеристика контролне табле и променљиве окружења доследно управљају `/api/v1/*`, `/api/v1beta/*` и алиасима; неуспех разрешивача затворен. Дозвољава захтеве за сесијом контролне табле на клијентским API рутама (укључујући `/api/v1/models`, који користи каталог модела контролне табле). Када је Ентра ID SSO омогућен, носилац који је структурно Ентра токен (три басе64урл сегмента, `RS*` алг, `kid`) управља SSO грана** пре** `validateApiKey()` и његова пресуда је коначна — никада не пада на путању АПИ кључа или грану деградирања у анонимну, тако да прекид провајдера идентитета не може постати отворен приступ. Статични API кључеви нису погођени. Погледајте [Ентра ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — прихвата сесију контролне табле, интерне захтеве за синхронизацију модела (усклађене са `/api/providers/[name]/(sync-models|models)`) или у потпуности прескаче ако `isAuthRequired()` врати нетачно. Враћа 403 (`AUTH_001`) када је токен носиоца присутан, али неважећи, 401 у супротном. Такође примењује нивое чувања руте (LOCAL_ONLY / ALWAYS_PROTECTED) пре било које гране аутх — види [Нивое чувања руте](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY путањама у `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (данас: `/api/mcp/`) може се приступити из без повратне петље када кључ носиоца носи `manage` опсег; све остале LOCAL_ONLY путање остају стриктне петље без обзира на опсег.

Успешна политика враћа `AuthSubject` са `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Низводни руковаоци могу да га прочитају преко `assertAuth(request, "CLIENT_API")` у `src/server/authz/assertAuth.ts` уместо да поново покрећу аутх логику.

## Листа јавних рута

`src/shared/constants/publicApiRoutes.ts` је експлицитна листа дозвољених рута:

Листа је подељена према **облику**, а та подела је кључна за исправно функционисање (GHSA-74g9-q8f6-793h): префикс се
упоређује помоћу `startsWith()`, па се тиме подудара и са сваком суседном путањом која дели његове почетне знакове.
`/api/usage/om-usage` као префикс означава `/api/usage/om-usage<anything>` као PUBLIC, а Next то разрешава
на `/api/usage/[connectionId]` — обрађивач који нема сопствену аутентификацију.

```ts
// Праве подстабла. Сваки унос МОРА да се завршава знаком "/" (што потврђује unit тест).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // у classify се третира као CLIENT_API, а не као „no-auth public“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Појединачне руте, упоређују се ТАЧНО (са завршном косом цртом или без ње).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // корак 2 при пријављивању за опциони TOTP; потребан је MFA-pending колачић
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Појединачне руте само за читање које такође добијају ублажавање ограничења CORS origin-а.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Појединачна рута само за читање БЕЗ ублажавања ограничења CORS-а.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Руте само за читање су јавне **само** за безбедне методе. Напомена: `classifyRoute()` изузима `/api/v1/*` и `/api/v1beta/*` из PUBLIC пропуштања — оне су увек `CLIENT_API`, па се смернице за Bearer кључ и даље примењују.

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

Цевовод увек означава одговоре са:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

За проверене захтеве, заглавља захтева узводно (на страни руковаоца) такође укључују:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Користите `assertAuth(req, expectedClass)` унутар руковалаца — он избацује `AuthzAssertionError` са кодом `AUTHZ_NOT_INITIALIZED` ако је међуверзија заобиђена (корисно за хватање регресије конфигурације у тестовима).

## Pogledajte takođe

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka za autentifikaciju po krajnjoj tački
- [COMPLIANCE.md](../security/COMPLIANCE.md) — dnevnik revizije za događaje autentifikacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tri imenska prostora opsega i MCP katalog opsega alata
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
