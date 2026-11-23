# Authorization Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Ճշմարտության աղբյուր.** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Վերջին թարմացումը.** 2026-09-22 — scope namespaces-ը ցույց են տալիս MCP-SERVER.md

OmniRoute-ն ունի երթուղիներին տեղյակ թույլտվության խողովակաշար, որը պաշտպանում է API-ի յուրաքանչյուր հարցում: Դասակարգումը **դետերմինիստական** է և **փակ-ձախողված** — այն ամենը, ինչը չի կարող դասակարգվել, դառնում է `MANAGEMENT` և պահանջում է նիստ կամ կառավարման մակարդակի թոքեն: Այս էջը բացատրում է մոդելը ինժեներների համար, ովքեր պահպանում են երթուղիներ կամ նախագծում նոր վերջնակետեր:

![AuthZ խողովակաշար (3 երթուղու դասեր + քաղաքականության գնահատում)](../diagrams/exported/authz-pipeline.svg)

> Աղբյուր՝ [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Երկու նույնականացման ռեժիմ

### 1. API բանալի (Bearer)

Օգտագործվում է OpenAI/Anthropic/Gemini-համատեղելի client API-ների և մի քանի կառավարման երթուղիների համար, երբ բանալին ունի `manage` scope։

```
Authorization: Bearer <api-key>
```

Վավերացվում է `src/sse/services/auth.ts`-ի `isValidApiKey()` / `extractApiKey()` ֆունկցիաներով և վերաէքսպորտվում է `src/shared/utils/apiAuth.ts`-ի միջոցով։ Վավերացնողը նաև ընդունում է `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` միջավայրի փոփոխականները որպես երկարաժամկետ passthrough բանալիներ (issue #1350)։

### 2. Վահանակի սեսիա (cookie `auth_token`)

Վահանակի էջերի և ադմինիստրատորի գործողությունների համար։

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie-ն սեսիա է միայն այն դեպքում, երբ JWT-ն վավերանում է **և** պարունակում է `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)։ Cookie-ի յուրաքանչյուր սպառող (վահանակի երթուղու guard-ը (`isDashboardSessionAuthenticated()`), authz pipeline-ի թարմացումը, WebSocket handshake-ը, live server-ը, `/api/settings/require-login`, `/api/auth/status`) անցնում է այս օգնականի միջով։
Կան նաև այլ JWT-ներ, որոնք ստորագրված են `JWT_SECRET`-ով․ Cursor CLI passthrough-ը բանալու տերերի համար թողարկում է `iss "omniroute" / aud "cursor-cli"` token-ներ, և դրանք երբեք սեսիա չեն (#13298)։

Վավերացվում է `src/shared/utils/apiAuth.ts`-ի `isDashboardSessionAuthenticated()` ֆունկցիայով։ Pipeline-ը ավտոմատ թարմացնում է JWT-ն, երբ նրա 30-օրյա կյանքից մնացել է 7 օրից պակաս։

Սեսիան կարող է ավարտվել նաև իր 30 օրը լրանալուց առաջ, քանի որ յուրաքանչյուր թողարկող անցնում է `mintDashboardSessionToken`-ով (թողարկման ժամանակ `iat` և նույնացուցիչ `jti`), իսկ վավերացնողը ստուգում է երկու կարգավորում. `sessionsValidAfter`-ը, որը սահմանվում է գաղտնաբառի փոփոխությամբ, որպեսզի դրանից առաջ թողարկված ամեն սեսիա դադարի վավերանալ (գաղտնաբառը փոխած զննարկիչը նոր cookie է ստանում), և `revokedDashboardSessions`-ը, որին `POST /api/auth/logout`-ը ավելացնում է դուրս եկած սեսիայի `jti`-ն։ Ավելի վաղ թողարկման սեսիաները չունեն ոչ մեկ այս պահանջներից և մնում են վավեր մինչև առաջին գաղտնաբառի փոփոխությունը։ Եթե կարգավորումները չեն կարող կարդացվել, սեսիան չի վստահվում։

Որոշ կառավարման երթուղիներ ընդունում են **կա՛մ** մեկ, **կա՛մ** մյուս ռեժիմը. cookie ԿԱՄ `Bearer <key>`, երբ API բանալին ունի `manage` (կամ `admin`) scope։ Հենց սա է հնարավորացնում v3.8-ում ավելացված «կարգավորվող API կանչերով» աշխատանքային հոսքը։

#### Ընտրովի OIDC մուտքի դարպաս (#6973)

Վահանակի ադմինի մուտքը աջակցում է նաև **ընտրովի** OIDC (OpenID Connect) հոսք՝ լռելյայն գաղտնաբառով մուտքի կողքին. գաղտնաբառով մուտքը երբեք չի հեռացվում, միայն լրացվում է․

- Անջատված է, եթե `settings.oidcEnabled === true` **և** `oidcIssuer` / `oidcClientId` /
  `oidcClientSecret`-ը բոլորը կարգավորված չեն (Settings → Auth)։ `GET /api/auth/oidc/login`-ը
  հակառակ դեպքում վերադարձնում է `400`։
- `GET /api/auth/oidc/login`-ը `authorization_endpoint`-ը հայտնաբերում է issuer-ի
  `/.well-known/openid-configuration`-ից (հետադարձ տարբերակը՝ `<issuer>/authorize`), կառուցում
  է redirect URI-ը մուտքային հարցումից (հաշվի առնելով `x-forwarded-proto`-ն) և վերահղում է
  IdP-ին՝ պատահական `state`-ով, որը պահվում է `httpOnly` `oidc_state` cookie-ում։
- `GET /api/auth/oidc/callback`-ը ստուգում է `state`-ը, փոխանակում է թույլտվության կոդը և
  ստուգում է ID token-ի ստորագրությունը issuer-ի JWKS-ով (`jose`-ի `createRemoteJWKSet`,
  յուրաքանչյուր JWKS URI-ի համար cache-ավորված)՝ `issuer`/`audience` ստուգումներով։
  `oidcAllowedSubjects` թույլատրելի ցանկը պարտադիր է․ այն համընկնում է token-ի `sub` պահանջի
  կամ նրա `email` պահանջի հետ — email պահանջը ընդունվում է միայն երբ `email_verified === true`,
  որպեսզի IdP-ում չստուգված email-ը երբեք չանցնի դարպասը — իսկ առանց գրառումների callback-ը
  մերժում է ամեն մուտք (`not_configured`)։
- Հաջողության դեպքում այն թողարկում է **նույն** 30-օրյա `auth_token` JWT-ն, որ թողարկում է
  գաղտնաբառով մուտքը (`src/app/api/auth/login/route.ts`), այնպես որ վահանակի սեսիայի մնացած
  pipeline-ը (ավտոմատ թարմացում, cookie դրոշներ) անփոփոխ է․ OIDC-ն փոխում է միայն cookie-ի
  թողարկման եղանակը, ոչ այն, ինչ այն տալիս է։
- Յուրաքանչյուր `oidc*` կարգավորում (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`,
  `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`)
  գտնվում է `SECURITY_IMPACTING_SETTINGS_KEYS`-ում (`src/shared/constants/securityImpactingSettings.ts`)․
  `PATCH /api/settings`-ը պատասխանում է `400 PASSWORD_REQUIRED`-ով, եթե մարմինը չի պարունակում
  կառավարման գաղտնաբառը որպես `currentPassword` (`401 PASSWORD_MISMATCH`, երբ սխալ է)։
  `oidcDisablePasswordLogin`-ը արգելում է գաղտնաբառով _մուտքը_ (`POST /api/auth/login`), բայց
  պահպանում է գաղտնաբառի պահված hash-ը, և վերա-նույնականացումը դեռ ստուգում է
  `currentPassword`-ը դրա դեմ։
- `corsOrigins`-ը և `bruteForceProtection`-ը նույնպես `SECURITY_IMPACTING_SETTINGS_KEYS`-ում են․
  դրանցից որևէ մեկի թուլացումը նվազեցնում է մուտքի պաշտպանությունները, ուստի դրանք պահանջում
  են նույն վերա-նույնականացումը `currentPassword`-ով (Security ներդիրը դա հարցնում է), իսկ JSON
  ներմուծումը դրանք հեռացնում է։
- Անվտանգության քաղաքականության յուրաքանչյուր բանալի — `SECURITY_IMPACTING_SETTINGS_KEYS`-ի
  գրառումները, յուրաքանչյուր `oidc*` բանալի և վահանակի սեսիայի վիճակը — **միայն օպերատորի**
  համար է `PATCH /api/settings`-ում․ `manage` scope-ով API բանալին կամ `oma_` access token-ը
  մերժվում է `403`-ով, նույնիսկ եթե ուղարկում է ճիշտ `currentPassword`, և մերժումը գրանցվում է
  որպես `settings.update_failed` `reason: OPERATOR_REQUIRED`-ով (`requireOperatorCredential()`,
  `src/lib/api/operatorCredential.ts`)։ Սովորական կարգավորումները (թեմա, ցուցադրման
  նախընտրություններ) մնում են գրվող `manage` բանալու կամ `admin` access token-ի համար։
  `/api/settings`-ի յուրաքանչյուր փոփոխություն (և `/api/settings/require-login`-ինը) նույնպես
  պահանջում է `admin` access token scope (`ADMIN_MUTATION_EXACT_PATHS`, `src/server/authz/accessScopes.ts`,
  ճշգրիտ ուղու համընկնում)․ `GET`-ը մնում է `read`, իսկ `/api/settings/*` մյուս ենթաերթուղիները
  (proxies, combo լռելյայն արժեքներ, մոդելների անուններ, սեղմում, մաքրումներ…) պահպանում են
  մեթոդից ածանցված `write` scope-ը։
- `POST /api/settings/import-json`-ը շրջանցում է այս վերա-նույնականացումը, ուստի գրելուց առաջ
  հեռացնում է `IMPORT_STRIPPED_SETTINGS_KEYS`-ի (նույն ֆայլում) յուրաքանչյուր բանալի՝ գաղտնաբառը
  և `currentPassword`-ը, `SECURITY_IMPACTING_SETTINGS_KEYS`-ի յուրաքանչյուր գրառում և վահանակի
  սեսիայի վիճակը (`sessionsValidAfter`, `revokedDashboardSessions`)։ Այսպիսով հին պահուստային
  պատճենի ներմուծումը չի կարող վերակենդանացնել սեսիա, որը գաղտնաբառի փոփոխությունը կամ
  դուրս գալը ավարտել է։

## Երթուղիների դասեր

`src/server/authz/types.ts`-ը սահմանում է երեք դաս. ցանկացած երթուղի, որը չի կարող որոշակիորեն դասակարգվել, վերադառնում է `MANAGEMENT`-ին։

| Դաս          | Նկարագրություն                                                                                                                                                         | Պահանջվող նույնականացում                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `PUBLIC`     | Բացահայտ անվտանգ երթուղիներ — մուտք, դուրս գալ, կարգավիճակ, սկզբնավորում, առողջություն, onboarding-ի bootstrap։                                                        | Չկա                                                         |
| `CLIENT_API` | Մոդելների սպասարկման endpoint-ներ — `/api/v1/*`, `/api/v1beta/*`, ինչպես նաև անունները `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`։ | Bearer բանալի, երբ ակտիվ է `REQUIRE_API_KEY` feature flag-ը |
| `MANAGEMENT` | Վահանակի էջեր, կարգավորումներ, providers, բանալիներ, ադմինիստրատորի և ախտորոշման endpoint-ներ։                                                                         | Վահանակի սեսիա Կամ Bearer `manage` scope-ով                 |

`MANAGEMENT`-ի որոշ գործողություններ **միայն օպերատորի** համար են. `manage` բանալին բավարար չէ։ Պահված հավատարմագրերի արտահանումը (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), պահուստային պատճենի վերականգնումը կենդանի տվյալների վրա (`POST /api/db-backups/import`՝ ներառյալ `dryRun=true`-ը, `POST /api/db-backups`՝ վերականգնում id-ով, `POST /api/settings/import-json`), վերականգնման կետերի ոչնչացումը (`DELETE /api/db-backups`՝ մաքրում, և `PATCH /api/db-backups`, քանի որ այն պահպանվող պահպանման քաղաքականությունը վարում է յուրաքանչյուր պահուստից հետո ավտոմատ ջնջումը) պահանջում են վահանակի սեսիա, տեղական CLI սուբյեկտ կամ անջատված մուտք։ Սինխրոնիզացիայի token-ի թողարկումը (`POST /api/sync/tokens`) և `admin` CLI access token-ի ստեղծումը (`POST /api/cli/tokens`) պահանջում են վահանակի սեսիա կամ տեղական CLI սուբյեկտ՝ մուտքի ցանկացած ռեժիմում։ API բանալիները՝ ցանկացած scope-ով, և `oma_` access token-ները օպերատորի հավատարմագրեր չեն. երբ դրանք պահանջվում են, դրանք ստանում են `403`։ Ստուգումն ապրում է `src/lib/api/operatorCredential.ts`-ում (`resolveOperatorCredential()` / `requireOperatorCredential()`)։ Մուտքի կարգավորումների փոփոխությունը նույնպես միայն օպերատորի համար է. `POST /api/settings/require-login`-ը (կառավարման գաղտնաբառի սահմանում / `requireLogin`-ի փոխանջատում) գաղտնաբառի առկայության դեպքում ընդունում է միայն այս հավատարմագրերը. առաջին գործարկման bootstrap պատուհանը (երբ գաղտնաբառ դեռ չկա) մնում է անփոփոխ, իսկ վահանակի սեսիան գաղտնաբառը փոխելու համար պետք է ուղարկի `currentPassword` (`403`, երբ այն բացակայում է կամ սխալ է, գրանցվում է որպես `settings.update_failed`)։ Տեղական CLI-ն և մուտքն անջատված ունեցող տեղադրումը պահպանում են վերականգնման ուղին և կարող են գաղտնաբառ սահմանել առանց դրա, քանի որ երկուսն էլ կապված են այն հոսթին, որը տիրապետում է տվյալների գրացուցակին։

## Խողովակաշար

```
Մուտքային հարցում → src/proxy.ts
  → runAuthzPipeline() src/server/authz/pipeline.ts ֆայլում
    1. Հեռացնել վստահելի ներքին վերնագրերը (x-omniroute-auth-*, x-omniroute-route-class)
    2. Ստեղծել հարցման ID, դասակարգել երթուղին classifyRoute() ֆունկցիայի միջոցով
    3. Եթե pathname == "/" → վերահղում /dashboard
    4. Եթե ցամաքեցում (կարճատև անջատում) և /api/* → 503
    5. Եթե ոչ-GET /api/* → checkBodySize() պաշտպանություն
    6. Եթե OPTIONS → CORS նախնական ստուգում 204
    7. Եթե options.enforce == false → անցում երթուղու դասի վերնագրերով
    8. Հակառակ դեպքում՝ POLICIES[routeClass].evaluate(ctx)
       - թույլատրել → դրոշմել x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - մերժել → JSON սխալ՝ correlation_id-ով (կառավարման վահանակի էջեր → 302 /login)
```

Վստահելի ներքին վերնագրերը (սահմանված `src/server/authz/headers.ts`-ում) **հեռացվում են մուտքային հարցումներից** մինչև դասակարգումը. հաճախորդները չեն կարող նախապես լրացնել `x-omniroute-auth-*`՝ սուբյեկտին ներկայացնելու համար:

### Քաղաքականության պայմանագրեր

Յուրաքանչյուր երթուղու դաս ունի քաղաքականություն `src/server/authz/policies/` ֆայլում:

- **`publicPolicy`** (`policies/public.ts`) — միշտ վերադարձնում է `allow({ kind: "anonymous", id: "anonymous" })`:
- **`clientApiPolicy`** (`policies/clientApi.ts`) — արդյունահանում է Bearer-ը, վավերացնում է `validateApiKey()`-ի միջոցով: Անցնում է անանունի միայն այն դեպքում, երբ `REQUIRE_API_KEY` ֆունկցիոնալ դրոշը անջատված է: Արդյունավետ դրոշը լուծվում է `isRequireApiKeyEnabled()`-ի միջոցով (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), այնպես որ Dashboard Feature Flags-ը և միջավայրի փոփոխականները հետևողականորեն կառավարում են `/api/v1/*`, `/api/v1beta/*` և կեղծանունները. լուծիչի ձախողումները ձախողվում են փակ: Թույլատրում է կառավարման վահանակի նիստի հարցումները հաճախորդի API երթուղիներում (ներառյալ `/api/v1/models`, որն օգտագործվում է կառավարման վահանակի մոդելների կատալոգի կողմից):
- **`managementPolicy`** (`policies/management.ts`) — ընդունում է կառավարման վահանակի նիստը, ներքին մոդելների համաժամացման հարցումները (համապատասխանեցված `/api/providers/[name]/(sync-models|models)`-ին), կամ ամբողջությամբ բաց է թողնում, եթե `isAuthRequired()`-ը վերադարձնում է false: Վերադարձնում է 403 (`AUTH_001`), երբ Bearer թոքենը առկա է, բայց անվավեր է, հակառակ դեպքում՝ 401: Նաև կիրառում է երթուղու պաշտպանության մակարդակները (LOCAL_ONLY / ALWAYS_PROTECTED) մինչև ցանկացած վավերացման ճյուղ՝ տե՛ս [Երթուղու պաշտպանության մակարդակներ](../security/ROUTE_GUARD_TIERS.md): `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ում (այսօր՝ `/api/mcp/`) LOCAL_ONLY ուղիները կարող են մուտք գործել ոչ-loopback-ից, երբ Bearer բանալին կրում է `manage` տիրույթը. բոլոր մյուս LOCAL_ONLY ուղիները մնում են խիստ-loopback՝ անկախ տիրույթից:

Հաջող քաղաքականությունը վերադարձնում է `AuthSubject`՝ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`: Հետագա մշակողները կարող են այն կարդալ `assertAuth(request, "CLIENT_API")`-ի միջոցով `src/server/authz/assertAuth.ts`-ում՝ վավերացման տրամաբանությունը նորից գործարկելու փոխարեն:

## Հանրային երթուղիների ցուցակ

`src/shared/constants/publicApiRoutes.ts`-ը բացահայտ թույլատրված ցուցակն է:

Ցուցակը բաժանված է ըստ **ձևի**, և բաժանումը բեռնվածք կրող է (GHSA-74g9-q8f6-793h). նախածանցը համընկնում է `startsWith()`-ի հետ, ուստի այն համընկնում է նաև յուրաքանչյուր հարակից ուղու հետ, որը կիսում է իր առաջատար նիշերը: `/api/usage/om-usage`-ը որպես նախածանց նշում է `/api/usage/om-usage<anything>`-ը որպես ՀԱՆՐԱՅԻՆ, և Next-ը դա լուծում է որպես `/api/usage/[connectionId]`՝ առանց սեփական նույնականացման մշակող:

```ts
// Իսկական ենթածառեր: Յուրաքանչյուր մուտք ՊԵՏՔ է ավարտվի "/" նշանով (հաստատված է միավոր թեստով):
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ում դիտարկվում է որպես CLIENT_API, ոչ թե որպես "առանց նույնականացման հանրային"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Միակ երթուղիներ, որոնք համընկնում են ՃՇԳՐԻՏ (վերջում թեք գիծով կամ առանց դրա):
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

// Միայն ընթերցման համար նախատեսված միակ երթուղիներ, որոնք նաև օգտվում են CORS ծագման թուլացումից:
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Միայն ընթերցման համար նախատեսված միակ երթուղի՝ ԱՌԱՆՑ CORS թուլացման:
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Միայն ընթերցման համար նախատեսված երթուղիները հանրային են **միայն** անվտանգ մեթոդների համար: Նշում. `classifyRoute()`-ը բացառում է `/api/v1/*`-ը և `/api/v1beta/*`-ը ՀԱՆՐԱՅԻՆ անցումից. դրանք միշտ `CLIENT_API` են, ուստի Bearer-key քաղաքականությունը դեռ կիրառելի է:

## Նոր երթուղու ավելացում

### Օրինակ 1 — Հանրային հաճախորդի API վերջնակետ (Bearer-auth)

`/api/v1/` և `/api/v1beta/` տակ գտնվող երթուղիները ավտոմատ կերպով դասակարգվում են որպես `CLIENT_API`: Միջանկյալ ծրագիրը կիրառում է Bearer ստուգումը. երթուղու մշակողները կարիք չունեն այն կրկնելու, բայց կարող են կարդալ սուբյեկտը, եթի դա օգտակար է:

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... մշակողի տրամաբանություն
}
```

### Օրինակ 2 — Կառավարման վերջնակետ (սեսիա կամ Bearer + manage)

Օգտագործեք `requireManagementAuth()`-ը `src/lib/api/requireManagementAuth.ts`-ից:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... մշակողի տրամաբանություն
}
```

`requireManagementAuth()`-ը հաջողության դեպքում վերադարձնում է `null` կամ JSON սխալ `Response`:

- 401 `AUTH_001` "Authentication required" — ընդհանրապես հավատարմագրեր չկան
- 403 — անվավեր Bearer **կամ** Bearer առկա է, բայց բանալին չունի `manage` / `admin` տիրույթը

`hasManageScope(scopes)`-ը վերադարձնում է true `"manage"` կամ `"admin"`-ի համար:

### Օրինակ 3 — Ավելացում հանրային թույլատրված ցուցակին

Ընտրեք հավաքածուն ըստ ձևի, ոչ թե հարմարության: Մեկ երթուղի մտնում է `PUBLIC_API_ROUTES_EXACT` (կամ `PUBLIC_READONLY_CORS_API_ROUTES` միայն GET-ի համար). միայն իսկական ենթածառ է մտնում `PUBLIC_API_ROUTE_PREFIXES`, և այն **պետք է ավարտվի `/` նշանով**: Միակ երթուղին նախածանցների ցուցակում տեղադրելը նաև հրապարակում է յուրաքանչյուր հարակից ուղի, որը կիսում է իր առաջատար նիշերը, ներառյալ ավելի ուշ ավելացված դինամիկ սեգմենտի քույրերը (GHSA-74g9-q8f6-793h): Թարմացրեք միավոր թեստերը `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` և `tests/unit/authz/classify.test.ts` հասցեներում:

## Ծավալներ

Երեք անվանատարածք։ Յուրաքանչյուր ստուգիչ կարդում է միայն իր սեփական տողերը։ Կողք կողքի,
ներառյալ, թե ինչու է `manage`-ը ձախողում `scopeMatches`-ը `read:compression`-ի համար, և ինչու է
`read` մուտքի թոքենը չի կարող `PATCH /api/keys/{id}`, գտնվում է
[Երեք ծավալի անվանատարածքներ](../frameworks/MCP-SERVER.md#three-scope-namespaces) հղումով։

API բանալիները կրում են `scopes` զանգված (պահվում է որպես JSON `api_keys.scopes`-ում, տես `src/lib/db/apiKeys.ts`)։

### Կառավարման ծավալ

- `manage` / `admin` — `hasManageScope`։ Կառավարման API երթուղիների Bearer մուտք։
- `mcp:connect`, `self:usage`, `self:account-quota` և
  `policy:bypass-provider-quota` ավելացվող ճշգրիտ համընկնող ծավալներ են։ Դրանք գտնվում են
  `MANAGEMENT_API_KEY_SCOPES`-ից դուրս։ `mcp:connect`-ը բացում է միայն
  `/api/mcp/` ոչ-loopback հատվածը։

### MCP գործիքի ծավալներ

Կատալոգ և համընկնող կանոններ (նույնական տող, կամ տրված ծավալ, որն ավարտվում է `*`-ով)։
[MCP գործիքի ծավալներ](../frameworks/MCP-SERVER.md#mcp-tool-scopes)։
`MCP_SCOPE_LIST`-ը `src/shared/constants/mcpScopes.ts`-ում սկզբնական տիպավորված
ենթաբազմությունն է, ոչ թե ամբողջական կատալոգը։ Իրականացումը գործում է
`open-sse/mcp-server/scopeEnforcement.ts`-ում այն բանից հետո, երբ `resolveCallerScopeContext()`-ը
լուծում է ծավալները MCP աուտենտիֆիկացիայի տվյալներից, հարցման մետատվյալներից կամ `OMNIROUTE_MCP_SCOPES`-ից։
Այն անջատված է մնում, եթե `OMNIROUTE_MCP_ENFORCE_SCOPES=true` չէ։

### Մուտքի թոքենի ծավալներ

`read` / `write` / `admin` `oma_live_…` թոքենների վրա, դասակարգված ըստ `scopeSatisfies`-ի
(`src/lib/accessTokens/scopes.ts`)։ Այս դասակարգումը վերաբերում է միայն մուտքի թոքենի
հավատարմագրին։ Տես [Կառավարման աուտենտիֆիկացիա](../guides/MANAGEMENT-AUTH.md)։

## Նույնականացման պահանջի անջատիչ

`src/shared/utils/apiAuth.ts`-ի `isAuthRequired()`-ը որոշում է, թե արդյոք **որևէ** նույնականացում է պարտադրվում հարցումի համար․

- `settings.requireLogin === false` → նույնականացումն ընդհանրապես անջատված է, բացի միշտ պաշտպանված շերտից (տե՛ս [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) և այն կանչերից, որոնք տալիս են հավատարմագիր, որը այն ընդունում է. դրանց պահանջվում է նույն հավատարմագիրը, ինչ մուտքի միացված ժամանակ՝ սինխրոնիզացիայի token-ների թողարկում, CLI access token-ների ստեղծում ցանկացած scope-ով, և `manage`/`admin` scope ունեցող API բանալու ստեղծում, այդ scope-ի տրամադրում բանալուն, կամ այդպիսի բանալու վերագեներացում կամ բացահայտում (`requireCredentialForManagementScopedKey()`, `src/lib/api/requireManagementAuth.ts`)։ Միայն inference բանալիները բաց են մնում։
- Գաղտնաբառ կարգավորված չէ **և** `INITIAL_PASSWORD` միջավայրի փոփոխական չկա → bootstrap ռեժիմը թույլ է տալիս onboarding wizard-ը և loopback հարցումները, մինչդեռ ցանցից եկող բաց հարցումներին դեռ անհրաժեշտ են հավատարմագրեր։
- Ցանկացած DB սխալ → փակ վիճակում ձախողվում է (secure-by-default)։

Client API բանալու պարտադրումն օգտագործում է `src/shared/utils/featureFlags.ts`-ի `isRequireApiKeyEnabled()`-ը, այլ ոչ թե ուղղակի `process.env.REQUIRE_API_KEY` ընթերցում։ Սա կարևոր է տեղադրված ինստանսների համար. Dashboard → Feature Flags-ում `REQUIRE_API_KEY`-ի փոխելը պահում է DB-ի վերագրանցում և անմիջապես ազդում է `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` և client API-ի մյուս նույնականացման ստուգումների վրա, որոնք կիսում են այս օգնականը։ Եթե feature flag-ների պահոցը չի կարող կարդացվել, client API-ի նույնականացումը փակ վիճակում ձախողվում է և պահանջում է բանալի։

## Փոփոխություն, որը խախտում է համատեղելիությունը — v3.8.0

`/api/v1/agents/tasks/*` և `/api/resilience/model-cooldowns` էնդփոյնթերը **այժմ պահանջում են կառավարման աուտենտիֆիկացիա** (կոմիտ `588a0333`)։ Հաճախորդները, որոնք նախկինում ուղարկում էին սովորական API բանալի՝ առանց `manage` ծավալի, ստանում են `403`։ Միգրացիա. կամ տրամադրել բանալուն `manage` ծավալը API Keys վահանակում, կամ օգտագործել մուտք գործած վահանակի սեսիա։

## Վարքագծի փոփոխություն — v3.8.2

`/api/mcp/*` (հեռավոր MCP սերվերը) դեռևս LOCAL_ONLY է լռելյայն, բայց այժմ ընդունում է ոչ-loopback հարցումներ, երբ `Authorization: Bearer <api-key>` վերնագիրը կրում է `manage` ծավալը։ Հատվածը հստակորեն սահմանափակված է յուրաքանչյուր ուղու համար `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ի միջոցով `src/server/authz/routeGuard.ts`-ում. քույր LOCAL_ONLY նախածանցը `/api/cli-tools/runtime/*` դիտավորյալ չի շրջանցվում, քանի որ այն կարող է ստեղծել կամայական ենթապրոցեսներ։ Անանուն հարցումները `/api/mcp/*`-ին ոչ-loopback-ից շարունակում են վերադարձնել `403 LOCAL_ONLY` — ցանկացած նոր LOCAL_ONLY ուղու համար լռելյայնը մնում է խիստ-loopback։ Տես [Երթուղու պաշտպանության մակարդակներ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)։

## Թեստավորում

- Միավորային թեստեր (Unit tests): `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`:
- Հանրային թույլատրված ցուցակ (Public allowlist): `tests/unit/public-api-routes.test.ts`:
- Կենտրոնացված գործարկում (Run focused): `node --import tsx/esm --test tests/unit/authz/classify.test.ts`:

## Վրիպազերծում

Խողովակաշարը միշտ պատասխանները նշում է հետևյալով.

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Նույնականացված հարցումների համար վերին հոսանքի (մշակողի կողմից) հարցման վերնագրերը ներառում են նաև.

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Օգտագործեք `assertAuth(req, expectedClass)` մշակողների ներսում — այն նետում է `AuthzAssertionError` `AUTHZ_NOT_INITIALIZED` կոդով, եթե միջանկյալ ծրագիրը շրջանցվել է (օգտակար է թեստերում կոնֆիգուրացիայի ռեգրեսիաները բռնելու համար):

## Տես նաև

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — նույնականացման նշիչ յուրաքանչյուր վերջնակետի համար
- [COMPLIANCE.md](../security/COMPLIANCE.md) — աուդիտի մատյան նույնականացման իրադարձությունների համար
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — երեք տիրույթի անվանատարածքներ և MCP գործիքի տիրույթի կատալոգ
- Աղբյուր: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
