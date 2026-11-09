# Authorization Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Ճշմարտության աղբյուր.** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Վերջին թարմացումը.** 2026-09-22 — scope namespaces-ը ցույց են տալիս MCP-SERVER.md

OmniRoute-ն ունի երթուղիներին տեղյակ թույլտվության խողովակաշար, որը պաշտպանում է API-ի յուրաքանչյուր հարցում: Դասակարգումը **դետերմինիստական** է և **փակ-ձախողված** — այն ամենը, ինչը չի կարող դասակարգվել, դառնում է `MANAGEMENT` և պահանջում է նիստ կամ կառավարման մակարդակի թոքեն: Այս էջը բացատրում է մոդելը ինժեներների համար, ովքեր պահպանում են երթուղիներ կամ նախագծում նոր վերջնակետեր:

![AuthZ խողովակաշար (3 երթուղու դասեր + քաղաքականության գնահատում)](../diagrams/exported/authz-pipeline.svg)

> Աղբյուր՝ [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Auth-ի երկու ռեժիմ

### 1. API բանալի (Bearer)

Օգտագործվում է OpenAI/Anthropic/Gemini-ի հետ համատեղելի client API-ների և կառավարման որոշ երթուղիների համար, երբ բանալին ունի `manage` scope։

```
Authorization: Bearer <api-key>
```

Վավերացվում է `src/sse/services/auth.ts`-ում գտնվող `isValidApiKey()` / `extractApiKey()` ֆունկցիաների միջոցով և վերարտահանվում է `src/shared/utils/apiAuth.ts`-ի միջոցով։ Վավերացնողը նաև ընդունում է `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars-ը՝ որպես մշտական passthrough բանալիներ (issue #1350)։

### 2. Dashboard-ի սեսիա (`auth_token` cookie)

Dashboard-ի էջերի և ադմինիստրատիվ գործողությունների համար։

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie-ն սեսիա է համարվում միայն այն դեպքում, երբ JWT-ն վավերացվում է **և** պարունակում է `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)։ Cookie-ի յուրաքանչյուր սպառող (dashboard-ի երթուղու պաշտպանիչը (`isDashboardSessionAuthenticated()`), authz pipeline-ի թարմացումը, WebSocket handshake-ը, live server-ը, `/api/settings/require-login`, `/api/auth/status`) անցնում է այդ helper-ի միջով։
`JWT_SECRET`-ով ստորագրված այլ JWT-ներ նույնպես գոյություն ունեն — Cursor CLI passthrough-ը բանալիներ ունեցող օգտատերերի համար ստեղծում է
`iss "omniroute" / aud "cursor-cli"` token-ներ — և դրանք երբեք սեսիաներ չեն
(#13298)։

Վավերացվում է `src/shared/utils/apiAuth.ts`-ում գտնվող `isDashboardSessionAuthenticated()` ֆունկցիայի միջոցով։ Pipeline-ն ավտոմատ թարմացնում է JWT-ն, երբ դրա 30-օրյա գործողության ժամկետից մնում է 7 օրից պակաս։

Սեսիան կարող է ավարտվել նաև մինչև իր 30 օրը լրանալը, քանի որ յուրաքանչյուր minter անցնում է `mintDashboardSessionToken`-ի միջով (`iat`-ի ստեղծման ժամանակը և `jti` նույնացուցիչը), իսկ verifier-ը ստուգում է երկու կարգավորում՝ `sessionsValidAfter`, որը սահմանվում է գաղտնաբառի փոփոխության ժամանակ, որպեսզի դրանից առաջ տրված յուրաքանչյուր սեսիա դադարի վավերացվել (գաղտնաբառը փոխած browser-ը ստանում է նոր cookie), և `revokedDashboardSessions`, որին `POST /api/auth/logout`-ը ավելացնում է դուրս եկած սեսիայի `jti`-ն։ Ավելի հին release-ի կողմից ստեղծված սեսիաները չեն պարունակում այդ claim-երից ոչ մեկը և մնում են վավեր մինչև գաղտնաբառի առաջին փոփոխությունը։ Եթե կարգավորումները հնարավոր չէ կարդալ, սեսիան վստահելի չի համարվում։

Կառավարման որոշ երթուղիներ ընդունում են **ցանկացած** ռեժիմ՝ cookie ԿԱՄ `Bearer <key>`, երբ API բանալին ունի `manage` (կամ `admin`) scope։ Սա հնարավորություն է տալիս v3.8-ում ավելացված «configurable via API calls» workflow-ին։

#### Ընտրովի OIDC մուտքի արգելափակում (#6973)

Dashboard-ի ադմինիստրատիվ մուտքը, լռելյայն գաղտնաբառով մուտքի կողքին, աջակցում է նաև **միայն միացված լինելու դեպքում** OIDC (OpenID Connect) հոսքին — գաղտնաբառով մուտքը երբեք չի հեռացվում, այլ միայն
լրացվում է։

- Անջատված է, եթե միայն `settings.oidcEnabled === true` **և** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret`-ը բոլորը կազմաձևված են (Կարգավորումներ → Նույնականացում)։
  `GET /api/auth/oidc/login` հակառակ դեպքում վերադարձնում է `400`։
- `GET /api/auth/oidc/login`-ը հայտնաբերում է `authorization_endpoint`-ը
  issuer-ի `/.well-known/openid-configuration` հասցեից (հետ է ընկնում
  `<issuer>/authorize`-ի վրա), վերահղման URI-ն կազմում է մուտքային հարցումից
  (`x-forwarded-proto`-ի աջակցությամբ) և վերահղում է դեպի IdP՝ պատահական
  `state`-ով, որը պահվում է `httpOnly` `oidc_state` cookie-ում։
- `GET /api/auth/oidc/callback`-ը վավերացնում է `state`-ը, փոխանակում է authorization
  code-ը և ստուգում է ID token-ի ստորագրությունը issuer-ի JWKS-ի միջոցով
  (`jose`-ի `createRemoteJWKSet`-ով, որը պահվում է քեշում ըստ JWKS URI-ի)՝
  `issuer`/`audience` ստուգումներով։ Dashboard մուտքի թույլտվության համար պահանջվում է
  ոչ դատարկ `oidcAllowedSubjects` ցանկ, `oidcAdmissionClaim` քաղաքականություն կամ երկուսն էլ։
  Subject-ների ցանկը համընկնում է `sub`-ի կամ `email`-ի հետ միայն այն դեպքում, երբ
  `email_verified === true`։ Ընտրովի claim-ի քաղաքականությունը ընդունում է կետերով
  բաժանված ID-token claim-ի ուղի (օրինակ՝ `realm_access.roles`) և ընդունելի արժեքների
  զանգված. լուծված claim-ը պետք է լինի տողերի զանգված, որը պարունակում է առնվազն մեկ
  ընդունելի արժեք։ Եթե երկու քաղաքականություններն էլ կազմաձևված են, երկուսն էլ պետք է
  անցնեն ստուգումը։ Բացակայող կամ սխալ ձևաչափով claim-ները մերժվում են լռելյայն,
  իսկ առանց որևէ քաղաքականության callback-ը մերժում է մուտքը (`not_configured`)։
  Միայն subject-ով գործող առկա կազմաձևումները շարունակում են աշխատել անփոփոխ։
- Keycloak-ը սովորաբար realm դերերը քարտեզավորում է access token-ներում, և դրանք
  պարտադիր չէ, որ լինեն ID token-ներում։ `admin` realm դերը պահանջելու համար այս
  client-ի համար կազմաձևեք protocol mapper, որը `realm_access.roles`-ը ներառում է
  **ID token**-ում, ապա `oidcAdmissionClaim`-ը սահմանեք որպես
  `{ "path": "realm_access.roles", "values": ["admin"] }`։
  Դերերով միայն մուտքի թույլտվությունը միացնելուց առաջ ստուգեք այս client-ի փաստացի
  ID-token claim-ը. հավելվածը չի կարդում access-token դերերը։ IdP-ի կողմից token-ի
  մերժումը կարող է լրացնել, բայց չի փոխարինում հավելվածի կողմից կատարվող այս ստուգմանը։
- Հաջողության դեպքում այն ստեղծում է գաղտնաբառով մուտքի կողմից տրվող **ճիշտ նույն**
  30-օրյա `auth_token` JWT-ն (`src/app/api/auth/login/route.ts`), ուստի dashboard-ի
  մնացած session pipeline-ը (ավտոմատ թարմացում, cookie դրոշներ) մնում է անփոփոխ —
  OIDC-ն փոխում է միայն cookie-ի ստեղծման եղանակը, ոչ թե այն, ինչ է այն թույլատրում։
  IdP-ի դերերի կամ խմբերի փոփոխությունները չեն անվավերացնում առկա OmniRoute session-ները։
  Դրանց գործողության տևողությունը շարունակում են կարգավորել logout-ը, գաղտնաբառի
  փոփոխությունը կամ session-ի ժամկետի ավարտը։
- Յուրաքանչյուր `oidc*` կարգավորում (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) ներառված է
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ում
  (`src/shared/constants/securityImpactingSettings.ts`)։ `PATCH /api/settings`-ը
  պատասխանում է `400 PASSWORD_REQUIRED`, եթե մարմինը չի պարունակում կառավարման
  գաղտնաբառը որպես `currentPassword` (`401 PASSWORD_MISMATCH`, երբ այն սխալ է)։
  `oidcDisablePasswordLogin`-ը մերժում է գաղտնաբառով _մուտքը_
  (`POST /api/auth/login`), սակայն պահպանում է պահված գաղտնաբառի hash-ը, և
  վերահաստատումը դեռ ստուգում է `currentPassword`-ը դրա դեմ։
- `corsOrigins`-ը և `bruteForceProtection`-ը նույնպես ներառված են
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ում. դրանց թուլացումը նվազեցնում է մուտքի
  պաշտպանության մակարդակը, ուստի դրանք պահանջում են նույն `currentPassword`
  վերահաստատումը (Security ներդիրը պահանջում է այն), իսկ JSON ներմուծումը դրանք
  հեռացնում է։
- Անվտանգության քաղաքականության յուրաքանչյուր բանալի՝
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ի գրառումները, յուրաքանչյուր `oidc*` բանալի
  և dashboard session-ի վիճակը, `PATCH /api/settings`-ում **միայն օպերատորի
  համար** են. manage շրջանակով API key-ը կամ `oma_` access token-ը մերժվում է
  `403`-ով, նույնիսկ եթե ուղարկում է ճիշտ `currentPassword`-ը, իսկ մերժումը
  գրանցվում է որպես `settings.update_failed`՝ `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()`՝ `src/lib/api/operatorCredential.ts`-ում)։
  Սովորական կարգավորումները (թեմա, ցուցադրման նախապատվություններ) շարունակում են
  հասանելի լինել `manage` key-ի կամ `admin` access token-ի համար։ `/api/settings`-ի
  յուրաքանչյուր փոփոխություն (և `/api/settings/require-login`-ի փոփոխությունը)
  նույնպես պահանջում է `admin` access-token scope-ը
  (`ADMIN_MUTATION_EXACT_PATHS`՝ `src/server/authz/accessScopes.ts`-ում, ճշգրիտ
  ուղու համընկմամբ)։ `GET`-ը շարունակում է մնալ `read`, իսկ `/api/settings/*`-ի
  մյուս ենթաուղիները (proxies, combo defaults, model aliases, compression,
  purges…) պահպանում են մեթոդով որոշվող `write` scope-ը։
- `POST /api/settings/import-json`-ը բաց է թողնում այդ վերահաստատումը, ուստի
  գրելուց առաջ հեռացնում է `IMPORT_STRIPPED_SETTINGS_KEYS`-ում նշված յուրաքանչյուր
  բանալի (նույն ֆայլում)՝ գաղտնաբառը և `currentPassword`-ը,
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ի յուրաքանչյուր գրառում և dashboard session-ի
  վիճակը (`sessionsValidAfter`, `revokedDashboardSessions`)։ Հին պահուստի ներմուծումը
  հետևաբար չի կարող վերականգնել session-ը, որն արդեն ավարտվել է գաղտնաբառի
  փոփոխությամբ կամ sign-out-ով։

#### Ընտրովի TOTP երկգործոն մուտք (#16619)

Գրանցվում է Կարգավորումներ → Անվտանգություն բաժնից, իսկ անջատված է այնքան ժամանակ,
մինչև օպերատորը չմիացնի այն
(`src/server/auth/dashboardMfa.ts`)։

- **Ինչ է ներառում․** գաղտնաբառով մուտք (`POST /api/auth/login`, որից հետո անհրաժեշտ է
  `POST /api/auth/mfa/verify`) և `omniroute connect` (`POST /api/cli/connect`,
  որը մերժում է միայն գաղտնաբառով փոխանակումը և կոդը ընդունում է որպես `totp`)։
- **Ինչ չի ներառում․** OIDC / SSO մուտքը (`/api/auth/oidc/callback`) չի պահանջում
  OmniRoute TOTP։ Այն հիմնվում է նույնականացման մատակարարի սեփական երկրորդ գործոնի վրա,
  ուստի OIDC-ի միացված լինելու դեպքում MFA-ն պարտադրեք IdP-ում։
- **Վերականգնում** (սարքը կորել է, վերականգնման կոդեր այլևս չկան կամ գործոնը հնարավոր չէ
  այլևս հաստատել, օրինակ՝ `STORAGE_ENCRYPTION_KEY`-ի փոփոխությունից հետո)․
  1. Վերագործարկեք սերվերը՝ `OMNIROUTE_DISABLE_MFA=true` պարամետրով։
  2. Հենց հոսթում (loopback գործընկեր և loopback `Host`, օրինակ՝
     `http://localhost:20128`) մուտք գործեք գաղտնաբառով։ Երկրորդ գործոնը բաց է թողնվում
     միայն այդ origin-ի համար․ յուրաքանչյուր այլ origin-ի դեպքում կոդը դեռ անհրաժեշտ է։
  3. Կարգավորումներ → Անվտանգություն → Անջատել բաժնում մուտքագրեք գաղտնաբառը և կոդը
     թողեք դատարկ։ `POST /api/auth/mfa/disable`-ը առանց `code`-ի մարմին ընդունում է միայն
     այն ժամանակ, երբ փոփոխականը սահմանված է, և հարցումը գալիս է հոսթից․ այն դեռ պահանջում է
     dashboard-ի սեսիան և ընթացիկ գաղտնաբառը, իսկ գործողությունը գրանցվում է որպես
     `auth.mfa.disabled`՝ `secondFactor: "recovery_switch"` արժեքով։
  4. Չսահմանեք `OMNIROUTE_DISABLE_MFA`-ն, վերագործարկեք սերվերը և անհրաժեշտության դեպքում
     կրկին գրանցեք գործոնը։

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

Վստահելի ներքին վերնագրերը (սահմանված են `src/server/authz/headers.ts` ում):** զրկված է մուտքային հարցումներից** Նախքան դասակարգումը — հաճախորդները չեն կարող նախապես լրացնել `x-omniroute-auth-*` սուբյեկտի նմանակման համար:

### Քաղաքական պայմանագրեր

Յուրաքանչյուր երթուղու դաս ունի `src/server/authz/policies/` ի քաղաքականություն.

- **`publicPolicy`** (`policies/public.ts`) — միշտ վերադարձնում է `allow({ kind: "anonymous", id: "anonymous" })`:
- **`clientApiPolicy`** (`policies/clientApi.ts`) — քաղվածքները կրող, վավերացվում է `validateApiKey()` միջոցով: Անանուն է դառնում միայն այն դեպքում, երբ արդյունավետ `REQUIRE_API_KEY` հատկանիշի դրոշակն անջատված է: Արդյունավետ դրոշը լուծվում է `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) միջոցով, այնպես որ վահանակի առանձնահատկությունների դրոշները և շրջակա միջավայրի փոփոխականները հետևողականորեն կառավարում են `/api/v1/*`, `/api/v1beta/*` և կեղծանունները. լուծիչի ձախողումները փակ են: Թույլ է տալիս dashboard-sesion հարցումներ կատարել հաճախորդի API երթուղիներում (ներառյալ `/api/v1/models`, որն օգտագործվում է վահանակի մոդելների կատալոգում): Երբ Entra ID SSO միացված է, կրողը, որը կառուցվածքային առումով Entra նշան է (երեք base64url հատվածներ, `RS*` alg, `kid`) մշակվում է SSO մասնաճյուղի կողմից:** առաջ** `validateApiKey()` և դրա վճիռը վերջնական է — այն երբեք չի անցնում API-բանալու ուղին կամ դեգրադացիայից մինչև անանուն ճյուղը, ուստի նույնականացման մատակարարի խափանումը չի կարող դառնալ բաց մուտք: Ստատիկ API ստեղները չեն ազդում: Տես [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — ընդունում է վահանակի նիստը, մոդելի համաժամացման ներքին հարցումները (համընկնում է `/api/providers/[name]/(sync-models|models)` հետ) կամ ամբողջությամբ բաց է թողնում, եթե `isAuthRequired()` վերադարձնում է false: Վերադարձնում է 403 (`AUTH_001`), երբ կրող նշանն առկա է, բայց անվավեր, հակառակ դեպքում՝ 401: Նաև պարտադրում է երթուղու պահպանության մակարդակները (LOCAL_ONLY / ALWAYS_PROTECTED) նախքան որևէ auth մասնաճյուղ — տես [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) : LOCAL_ONLY ուղիները `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ում (այսօր՝ `/api/mcp/`) կարող են մուտք գործել ոչ հանգույցից, երբ կրող ստեղնը կրում է `manage` շրջանակը; բոլոր մյուս LOCAL_ONLY ուղիները մնում են խիստ-loopback՝ անկախ շրջանակից:

Հաջող քաղաքականությունը `AuthSubject` ին վերադարձնում է `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ով: Ներքևում գտնվող կառավարիչները կարող են այն կարդալ `assertAuth(request, "CLIENT_API")` միջոցով `src/server/authz/assertAuth.ts` ում՝ վավերացման տրամաբանությունը նորից գործարկելու փոխարեն:

## Հանրային երթուղիների ցանկ

`src/shared/constants/publicApiRoutes.ts`-ը բացահայտ թույլատրված ցանկն է.

Ցանկը բաժանված է ըստ **ձևաչափի**, և այս բաժանումը կարևոր է (GHSA-74g9-q8f6-793h). Նախածանցը
համապատասխանեցվում է `startsWith()`-ով, ուստի այն նաև համապատասխանում է նույն սկզբնական նիշերը
կիսող յուրաքանչյուր հարակից ուղու։
`/api/usage/om-usage`-ը որպես նախածանց նշում է `/api/usage/om-usage<anything>`-ը որպես PUBLIC, իսկ Next-ը դա լուծում է
որպես `/api/usage/[connectionId]` — մշակիչ, որն ինքնուրույն նույնականացում չունի։

```ts
// Իրական ենթածառեր։ Յուրաքանչյուր գրառում ՊԵՏՔ է ավարտվի "/"-ով (ստուգվում է միավորային թեստով)։
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ում դիտարկվում է որպես CLIENT_API, ոչ թե որպես "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Առանձին երթուղիներ՝ համապատասխանեցվում են ՃՇԳՐԻՏ (վերջում թեք գծով կամ առանց դրա)։
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // մուտքի 2-րդ քայլը՝ միացված TOTP-ի համար. պահանջվում է MFA-pending cookie-ն
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Միայն ընթերցման համար նախատեսված առանձին երթուղիներ, որոնք նույնպես ստանում են CORS origin-ի թուլացումը։
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Միայն ընթերցման համար նախատեսված առանձին երթուղի՝ ԱՌԱՆՑ CORS-ի թուլացման։
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Միայն ընթերցման համար նախատեսված երթուղիները հանրային են **միայն անվտանգ մեթոդների** համար։ Նշում. `classifyRoute()`-ը `/api/v1/*` և `/api/v1beta/*` երթուղիները բացառում է PUBLIC-ի պահուստային համապատասխանեցումից — դրանք միշտ `CLIENT_API` են, ուստի Bearer-key քաղաքականությունը շարունակում է կիրառվել։

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

Խողովակաշարը միշտ նշում է պատասխանները հետևյալով.

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Հավաստագրված հարցումների համար վերին հոսանքով (կառավարողի կողմից) հարցումների վերնագրերը ներառում են նաև.

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Օգտագործեք `assertAuth(req, expectedClass)` կարգավորիչների ներսում — այն նետում է `AuthzAssertionError` `AUTHZ_NOT_INITIALIZED` կոդով, եթե միջնակարգ ծրագիրը շրջանցված է (օգտակար է թեստերում կազմաձևման ռեգրեսիաները որսալու համար):

## Տես նաև

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — նույնականացման նշիչ յուրաքանչյուր վերջնակետի համար
- [COMPLIANCE.md](../security/COMPLIANCE.md) — աուդիտի մատյան նույնականացման իրադարձությունների համար
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — երեք տիրույթի անվանատարածքներ և MCP գործիքի տիրույթի կատալոգ
- Աղբյուր: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
