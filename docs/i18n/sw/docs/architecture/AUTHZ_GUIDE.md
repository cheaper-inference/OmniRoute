# Authorization Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Chanzo cha ukweli:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Iliyosasishwa mwisho:** 2026-09-22 — majina ya nafasi za wigo yanaelekeza kwenye MCP-SERVER.md

OmniRoute ina bomba la uidhinishaji linalozingatia njia ambalo huzuia kila ombi la API. Uainishaji ni **hakika** na **hufeli-hufungwa** — chochote kisichoweza kuainishwa huishia kama `MANAGEMENT` na huhitaji kipindi au tokeni ya kiwango cha usimamizi. Ukurasa huu unaeleza mfumo kwa wahandisi wanaosimamia njia au kubuni vituo vipya.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> Chanzo: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Njia Mbili za Uthibitishaji

### 1. Ufunguo wa API (Bearer)

Hutumika kwa API za mteja zinazooana na OpenAI/Anthropic/Gemini na baadhi ya njia za usimamizi wakati ufunguo una wigo wa `manage`.

```
Authorization: Bearer <api-key>
```

Huthibitishwa na `isValidApiKey()` / `extractApiKey()` katika `src/sse/services/auth.ts` na kusafirishwa upya kupitia `src/shared/utils/apiAuth.ts`. Kithibitishaji pia hukubali vigezo vya mazingira vya `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kama funguo za kudumu za kupitisha moja kwa moja (tatizo #1350).

### 2. Sesheni ya Dashibodi (kuki ya auth_token)

Kwa kurasa za dashibodi na shughuli za msimamizi.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kuki huwa sesheni tu wakati JWT inathibitishwa **na** ina `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kila
mtumiaji wa kuki (kinga ya njia ya dashibodi (`isDashboardSessionAuthenticated()`), uonyeshaji upya wa mkondo wa udhibiti wa ruhusa, mchakato wa kuanzisha WebSocket, seva ya moja kwa moja,
`/api/settings/require-login`, `/api/auth/status`) hupitia kwenye msaidizi huyo.
Kuna JWT nyingine zilizotiwa saini kwa `JWT_SECRET` — CLI ya Cursor hutengeneza
tokeni za `iss "omniroute" / aud "cursor-cli"` kwa wenye funguo — na hazijawahi kuwa sesheni
(#13298).

Huthibitishwa na `isDashboardSessionAuthenticated()` katika `src/shared/utils/apiAuth.ts`. Mkondo huo huonyesha upya JWT kiotomatiki inapokuwa imesalia chini ya siku 7 katika muda wake wa siku 30.

Sesheni inaweza pia kuisha kabla ya siku 30 kukamilika, kwa sababu kila mtengenezaji hupitia kwenye `mintDashboardSessionToken` (muda wa kutolewa `iat` na kitambulisho `jti`) na kithibitishaji hukagua mipangilio miwili: `sessionsValidAfter`, unaowekwa baada ya kubadilisha nenosiri ili kila sesheni iliyotolewa kabla yake ikome kuthibitishwa (kivinjari kilichobadilisha nenosiri hupata kuki mpya), na `revokedDashboardSessions`, ambamo `POST /api/auth/logout` huongeza `jti` ya sesheni iliyotolewa. Sesheni zilizotengenezwa na toleo la zamani hazina dai lolote kati ya hayo na hubaki halali hadi mabadiliko ya kwanza ya nenosiri. Mipangilio haiwezi kusomwa, sesheni hiyo haiaminiki.

Baadhi ya njia za usimamizi hukubali **njia yoyote**: kuki AU `Bearer <key>` wakati ufunguo wa API una wigo wa `manage` (au `admin`). Hiki ndicho kinachowezesha mtiririko wa "configurable via API calls" ulioongezwa katika v3.8.

#### Kizuizi cha hiari cha kuingia kwa OIDC (#6973)

Kuingia kwa msimamizi wa dashibodi pia kunaunga mkono mtiririko wa OIDC (OpenID Connect) wa **hiari ya kujiunga**
pamoja na kuingia kwa nenosiri kwa kawaida — kuingia kwa nenosiri hakuondolewi kamwe, bali
huongezewa:

- Huzima isipokuwa `settings.oidcEnabled === true` **na** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` zote zimesanidiwa (Mipangilio → Uthibitishaji).
  `GET /api/auth/oidc/login` hurejesha `400` vinginevyo.
- `GET /api/auth/oidc/login` hugundua `authorization_endpoint` kutoka
  `/.well-known/openid-configuration` ya mtoaji, (hutumia `<issuer>/authorize`
  kama njia mbadala), huunda URI ya uelekezaji upya kutoka kwenye ombi linaloingia
  (inayotambua `x-forwarded-proto`), na kuelekeza kwenye IdP ikiwa na `state`
  ya nasibu iliyohifadhiwa katika kidakuzi cha `oidc_state` cha `httpOnly`.
- `GET /api/auth/oidc/callback` huthibitisha `state`, hubadilisha msimbo wa
  uidhinishaji, na huthibitisha sahihi ya tokeni ya kitambulisho kupitia JWKS ya
  mtoaji (`createRemoteJWKSet` ya `jose`, iliyohifadhiwa kwa kila URI ya JWKS)
  pamoja na ukaguzi wa `issuer`/`audience`. Kuingizwa kwenye dashibodi kunahitaji
  orodha ya `oidcAllowedSubjects` isiyo tupu, sera ya `oidcAdmissionClaim`, au
  vyote viwili. Orodha ya mada hulinganisha `sub` au `email` tu wakati
  `email_verified === true`. Sera ya hiari ya dai hutumia njia ya dai la tokeni
  ya kitambulisho iliyotenganishwa kwa nukta (kwa mfano,
  `realm_access.roles`) na safu ya thamani zinazokubalika; dai lililotatuliwa
  lazima liwe safu ya mifuatano iliyo na angalau thamani moja inayokubalika.
  Ikiwa sera zote mbili zimesanidiwa, zote mbili lazima zipite. Madayi
  yanayokosekana au yenye muundo usio sahihi hukataliwa kwa usalama, na bila
  sera yoyote kati ya hizo callback hukataa kuingia (`not_configured`).
  Mipangilio iliyopo ya mada pekee inaendelea kufanya kazi bila mabadiliko.
- Keycloak kwa kawaida huweka ramani ya majukumu ya realm kwenye tokeni za
  ufikiaji, si lazima kwenye tokeni za kitambulisho. Ili kuhitaji jukumu la
  realm `admin`, sanidi kipanga ramani cha itifaki kwa mteja huyu ambacho
  kinajumuisha `realm_access.roles` katika **tokeni yake ya kitambulisho**, kisha
  weka `oidcAdmissionClaim` kuwa `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Kagua dai halisi la tokeni ya kitambulisho ya mteja huyu kabla ya kuwezesha
  uidhinishaji wa majukumu pekee; programu haisomi majukumu ya tokeni za ufikiaji.
  Kukataliwa kwa tokeni upande wa IdP kunaweza kuongeza ukaguzi huu, lakini
  hakuwezi kuchukua nafasi ya ukaguzi wa upande wa programu.
- Ikifaulu, hutengeneza JWT ya `auth_token` ya siku 30 **iliyo sawa kabisa** na
  ile inayotolewa na kuingia kwa nenosiri (`src/app/api/auth/login/route.ts`),
  hivyo mchakato uliosalia wa kipindi cha dashibodi (usasaishaji kiotomatiki,
  bendera za vidakuzi) hubaki bila mabadiliko — OIDC hubadilisha tu jinsi
  kidakuzi kinavyotengenezwa, si kile kinachoruhusu. Mabadiliko ya majukumu au
  makundi ya IdP hayabatili vipindi vilivyopo vya OmniRoute; kutoka, kubadilisha
  nenosiri, au kuisha kwa kipindi bado ndiko kunakodhibiti muda wake wa uhai.
- Kila mpangilio wa `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) uko katika
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  hujibu `400 PASSWORD_REQUIRED` isipokuwa mwili wa ombi ubebe nenosiri la
  usimamizi kama `currentPassword` (`401 PASSWORD_MISMATCH` linapokuwa si sahihi).
  `oidcDisablePasswordLogin` hukataa _kuingia_ kwa nenosiri
  (`POST /api/auth/login`) lakini huhifadhi heshi ya nenosiri, na uthibitishaji
  upya bado hukagua `currentPassword` dhidi yake.
- `corsOrigins` na `bruteForceProtection` pia ziko katika
  `SECURITY_IMPACTING_SETTINGS_KEYS`: kulegeza mojawapo hudhoofisha ulinzi wa
  kuingia, kwa hiyo hutumia uthibitishaji upya wa `currentPassword` (kichupo cha
  Usalama huomba nenosiri hilo) na uagizaji wa JSON huziondoa.
- Kila ufunguo wa sera ya usalama — maingizo ya
  `SECURITY_IMPACTING_SETTINGS_KEYS`, kila ufunguo wa `oidc*` na hali ya kipindi
  cha dashibodi — ni wa **mendeshaji pekee** kwenye `PATCH /api/settings`:
  ufunguo wa API wenye wigo wa manage au tokeni ya ufikiaji ya `oma_` hukataliwa
  kwa `403` hata inapotuma `currentPassword` sahihi, na kukataliwa huko
  hukaguliwa kama `settings.update_failed` ikiwa na
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` katika `src/lib/api/operatorCredential.ts`).
  Mipangilio ya kawaida (mandhari, mapendeleo ya kuonyesha) bado inaweza kuandikwa
  kwa ufunguo wa `manage` au tokeni ya ufikiaji ya `admin`. Kila mabadiliko ya
  `/api/settings` yenyewe (na ya `/api/settings/require-login`) pia yanahitaji
  wigo wa tokeni ya ufikiaji ya `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` katika `src/server/authz/accessScopes.ts`,
  ulinganishaji wa njia kamili); `GET` hubaki `read`, na njia nyingine ndogo za
  `/api/settings/*` (proksi, chaguo-msingi za mchanganyiko, lakabu za modeli,
  ukandamizaji, ufutaji wa data…) hubaki na wigo wa `write` unaotokana na mbinu.
- `POST /api/settings/import-json` huruka uthibitishaji huo upya, kwa hiyo
  huondoa kila ufunguo katika `IMPORT_STRIPPED_SETTINGS_KEYS` (faili hiyo hiyo)
  kabla ya kuandika: nenosiri na `currentPassword`, kila ingizo la
  `SECURITY_IMPACTING_SETTINGS_KEYS`, na hali ya kipindi cha dashibodi
  (`sessionsValidAfter`, `revokedDashboardSessions`). Kwa hiyo kuagiza nakala
  ya zamani hakuwezi kufufua kipindi ambacho tayari kilimalizwa na mabadiliko ya
  nenosiri au kutoka.

#### Kuingia kwa hiari kwa uthibitishaji wa hatua mbili wa TOTP (#16619)

Huandikishwa kutoka Mipangilio → Usalama; huwa imezimwa hadi mendeshaji
aiwashe (`src/server/auth/dashboardMfa.ts`).

- **Inachoshughulikia:** kuingia kwa nenosiri (`POST /api/auth/login`, ambayo baadaye inahitaji
  `POST /api/auth/mfa/verify`) na `omniroute connect` (`POST /api/cli/connect`,
  ambayo inakataa ubadilishanaji wa nenosiri pekee na hutumia msimbo kama `totp`).
- **Isichoshughulikia:** kuingia kwa OIDC / SSO (`/api/auth/oidc/callback`) hakut
  ulizi TOTP ya OmniRoute. Hutegemea kipengele cha pili cha mtoa huduma wa utambulisho,
  kwa hiyo tekeleza MFA katika IdP ikiwa OIDC imewashwa.
- **Urejeshaji** (kifaa kimepotea, hakuna misimbo ya urejeshaji iliyobaki, au kipengele
  hakiwezi tena kuthibitishwa, kwa mfano baada ya `STORAGE_ENCRYPTION_KEY` kubadilika):
  1. Anzisha tena seva kwa `OMNIROUTE_DISABLE_MFA=true`.
  2. Kwenye mwenyeji wenyewe (mwenza wa loopback na `Host` ya loopback, kama vile
     `http://localhost:20128`), ingia kwa nenosiri. Kipengele cha pili kitarukwa kwa asili hiyo pekee; kila asili nyingine bado inahitaji msimbo.
  3. Katika Mipangilio → Usalama → Lemaza, weka nenosiri na uache msimbo wazi. `POST /api/auth/mfa/disable` hukubali mwili bila `code` tu wakati
     kigezo kimewekwa na ombi limetoka kwa mwenyeji; bado inahitaji kipindi cha dashibodi
     na nenosiri la sasa, na hukaguliwa kama `auth.mfa.disabled` yenye
     `secondFactor: "recovery_switch"`.
  4. Ondoa `OMNIROUTE_DISABLE_MFA`, anzisha tena, na ujiandikishe upya ikihitajika.

## Madarasa ya Njia

`src/server/authz/types.ts` inafafanua madarasa matatu; njia yoyote ambayo haiwezi kuainishwa kwa uhakika hurejeshwa kwenye `MANAGEMENT`.

| Darasa       | Maelezo                                                                                                                                                                | Uthibitishaji unaohitajika                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `PUBLIC`     | Njia zilizo salama waziwazi — kuingia, kutoka, hali, afya, uanzishaji wa mwanzo.                                                                                       | Hakuna                                                                             |
| `CLIENT_API` | Vituo vya mwisho vya kuhudumia modeli — `/api/v1/*`, `/api/v1beta/*`, pamoja na lakabu `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ufunguo wa Bearer wakati alama tekelezi ya `REQUIRE_API_KEY` inayotumika imewashwa |
| `MANAGEMENT` | Kurasa za dashibodi, mipangilio, watoa huduma, funguo, pamoja na vituo vya mwisho vya usimamizi na uchunguzi.                                                          | Kikao cha dashibodi AU Bearer yenye wigo wa `manage`                               |

Baadhi ya vitendo vya `MANAGEMENT` ni vya **mwendeshaji pekee**: ufunguo wa `manage` hautoshi. Kuhamisha vitambulisho
vilivyohifadhiwa (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), kurejesha nakala rudufu juu ya data inayotumika
(`POST /api/db-backups/import` ikijumuisha `dryRun=true`, urejeshaji wa `POST /api/db-backups` kwa kitambulisho,
`POST /api/settings/import-json`), kuharibu sehemu za urejeshaji (`DELETE /api/db-backups` kwa usafishaji,
na `PATCH /api/db-backups` kwa sababu muda wa uhifadhi unaodumishwa nao huendesha upogoaji wa kiotomatiki baada ya
kila nakala rudufu) kunahitaji kikao cha dashibodi, mhusika wa CLI wa ndani, au kuingia kuzimwa. Kutoa
tokeni ya ulandanishi (`POST /api/sync/tokens`) na kuunda tokeni ya ufikiaji ya CLI ya `admin`
(`POST /api/cli/tokens`) kunahitaji kikao cha dashibodi au mhusika wa CLI wa ndani katika kila hali ya kuingia.
Funguo za API za wigo wowote na tokeni za ufikiaji za `oma_` si vitambulisho vya mwendeshaji: hupata `403`
wakati wowote vinapohitajika. Ukaguzi huu
unapatikana katika `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` /
`requireOperatorCredential()`). Kubadilisha mipangilio ya kuingia pia ni kwa mwendeshaji pekee:
`POST /api/settings/require-login` (kuweka nenosiri la usimamizi / kugeuza `requireLogin`) hukubali
vitambulisho hivyo pekee baada ya nenosiri kuwepo — dirisha la uanzishaji wa matumizi ya kwanza (wakati hakuna nenosiri bado)
halijabadilika — na kikao cha dashibodi lazima kitume `currentPassword` ili kubadilisha nenosiri
(`403` linapokosekana au kuwa si sahihi, na kurekodiwa katika ukaguzi kama `settings.update_failed`). CLI ya ndani na
mfano ambao kuingia kumezimwa hudumisha njia ya urejeshaji na unaweza kuweka nenosiri bila hilo, kwa kuwa zote
zimefungamanishwa na seva inayomiliki saraka ya data.

## Bomba

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

Vijajuu vya ndani vinavyoaminika (vilivyofafanuliwa katika `src/server/authz/headers.ts`) ni** kuondolewa kutoka kwa maombi yanayoingia** kabla ya uainishaji wateja wa — hawawezi kujaza `x-omniroute-auth-*` mapema ili kuiga somo.

### Mikataba ya sera

Kila darasa la njia lina sera katika `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — daima inarudi `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — inadondosha Mbebaji, inathibitisha kupitia `validateApiKey()`. Huanguka hadi kutokujulikana wakati tu alama ya kipengele `REQUIRE_API_KEY` bora imezimwa. Bendera inayotumika hutatuliwa kupitia `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) kwa hivyo Bendera za Kipengele cha Dashibodi na vigeu vya mazingira vinatawala `/api/v1/*`, `/api/v1beta/*`, na lakabu mfululizo; kushindwa kwa kisuluhishi kushindwa kufungwa. Huruhusu maombi ya kikao cha dashibodi kwenye njia za API za mteja (pamoja na `/api/v1/models`, inayotumiwa na katalogi ya muundo wa dashibodi). Wakati Entra ID SSO imewashwa, Mbeba ambayo kimuundo ni ishara ya Entra (sehemu tatu za base64url, `RS*` alg, `kid`) hushughulikiwa na tawi la SSO** kabla** `validateApiKey()` na uamuzi wake ni — ya mwisho kamwe haianguki kwenye njia ya ufunguo wa API au tawi la kushusha hadhi hadi lisilojulikana, kwa hivyo hitilafu ya mtoaji kitambulisho haiwezi kuwa ufikiaji wazi. Vifunguo tuli vya API hazijaathiriwa. Tazama [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — inakubali kipindi cha dashibodi, maombi ya kusawazisha ya ndani ya kielelezo (yanayolingana na `/api/providers/[name]/(sync-models|models)`), au huruka kabisa ikiwa `isAuthRequired()` itarejesha sivyo. Hurejesha 403 (`AUTH_001`) wakati ishara ya Bearer iko lakini ni batili, 401 vinginevyo. Pia hutekeleza viwango vya walinzi wa njia (LOCAL_ONLY / ALWAYS_PROTECTED) kabla ya tawi lolote la mwandishi — kuona [Viwango vya Walinzi wa Njia](../security/ROUTE_GUARD_TIERS.md). njia za LOCAL_ONLY katika `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (leo: `/api/mcp/`) zinaweza kufikiwa kutoka kwa njia zisizo za nyuma wakati kitufe cha Bearer kinapobeba upeo wa `manage` ; njia zingine zote LOCAL_ONLY hubaki nyuma-kitanzi madhubuti bila kujali wigo.

Sera iliyofanikiwa inarudisha `AuthSubject` kwa `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Washughulikiaji wa mkondo wa chini wanaweza kuisoma kupitia `assertAuth(request, "CLIENT_API")` katika `src/server/authz/assertAuth.ts` badala ya kuendesha tena mantiki ya uandishi.

## Orodha ya Njia za Umma

`src/shared/constants/publicApiRoutes.ts` ni allowlist iliyoainishwa wazi:

Orodha imegawanywa kwa **umbo**, na mgawanyo huo ni muhimu kwa utekelezaji (GHSA-74g9-q8f6-793h): kiambishi awali
hulinganishwa kwa kutumia `startsWith()`, kwa hiyo pia hulinganisha kila njia iliyo karibu inayoshiriki herufi zake za mwanzo.
`/api/usage/om-usage` kama kiambishi awali huwekwa alama ya `/api/usage/om-usage<anything>` kuwa PUBLIC, na Next hutatua
hilo kuwa `/api/usage/[connectionId]` — handler ambayo haina uthibitishaji wake.

```ts
// Miti ndogo halisi. Kila ingizo LAZIMA liishie kwa "/" (huthibitishwa na jaribio la unit).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // huchukuliwa kama CLIENT_API katika classify, si kama "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Njia moja moja, zinazolinganishwa HASA (zikiwa na au bila slash ya mwisho).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // hatua ya 2 ya kuingia kwa TOTP ya hiari; inahitaji cookie ya MFA-pending
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Njia moja moja za kusoma pekee ambazo pia hupokea kulegezwa kwa asili ya CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Njia moja ya kusoma pekee ISIYOPATA kulegezwa kwa CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Njia za kusoma pekee ni za umma **kwa mbinu salama pekee**. Kumbuka: `classifyRoute()` huondoa `/api/v1/*` na `/api/v1beta/*` kwenye njia ya PUBLIC fall-through — hizo daima ni `CLIENT_API`, kwa hiyo sera ya ufunguo wa Bearer bado inatumika.

## Kuongeza Njia Mpya

### Muundo wa 1 — Endpoint ya API ya mteja ya umma (uthibitishaji wa Bearer)

Njia zilizo chini ya `/api/v1/` na `/api/v1beta/` huainishwa kiotomatiki kama `CLIENT_API`. Middleware hutekeleza ukaguzi wa Bearer; vishughulikiaji vya njia havihitaji kuurudia lakini vinaweza kusoma mhusika ikiwa ni muhimu.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... mantiki ya kishughulikiaji
}
```

### Muundo wa 2 — Endpoint ya usimamizi (kikao au Bearer + manage)

Tumia `requireManagementAuth()` kutoka `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... mantiki ya kishughulikiaji
}
```

`requireManagementAuth()` hurudisha `null` ikifaulu au `Response` ya hitilafu ya JSON:

- 401 `AUTH_001` "Uthibitishaji unahitajika" — hakuna vitambulisho kabisa
- 403 — Bearer batili **au** Bearer ipo lakini ufunguo hauna upeo wa `manage` / `admin`

`hasManageScope(scopes)` hurudisha true kwa `"manage"` au `"admin"`.

### Muundo wa 3 — Kuongeza kwenye orodha ya umma ya zinazoruhusiwa

Chagua seti kulingana na muundo, si urahisi. Njia moja huwekwa katika `PUBLIC_API_ROUTES_EXACT` (au `PUBLIC_READONLY_CORS_API_ROUTES` ikiwa ni ya GET pekee); ni kitawi halisi pekee kinachowekwa katika `PUBLIC_API_ROUTE_PREFIXES`, na **lazima kiishie kwa `/`**. Kuweka njia moja katika orodha ya viambishi awali pia hufanya kila njia iliyo karibu inayoshiriki herufi zake za mwanzo kuwa ya umma — ikijumuisha njia zinazohusiana zenye sehemu zinazobadilika ambazo zitaongezwa baadaye (GHSA-74g9-q8f6-793h). Sasisha majaribio ya kitengo katika `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` na `tests/unit/authz/classify.test.ts`.

## Wigo

Nafasi tatu za majina. Kila kikagua husoma tu nyuzi zake. Ulinganisho wa kando-kando,
ikiwemo kwa nini `manage` inashindwa `scopeMatches` kwa `read:compression` na kwa nini tokeni ya ufikiaji ya `read` haiwezi `PATCH /api/keys/{id}`, unapatikana hapa:
[Nafasi tatu za majina ya wigo](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Funguo za API hubeba safu ya `scopes` (iliyohifadhiwa kama JSON katika `api_keys.scopes`, angalia `src/lib/db/apiKeys.ts`).

### Wigo wa usimamizi

- `manage` / `admin` — `hasManageScope`. Ufikiaji wa mbebaji kwa njia za API za usimamizi.
- `mcp:connect`, `self:usage`, `self:account-quota`, na
  `policy:bypass-provider-quota` ni wigo wa nyongeza unaolingana hasa. Ziko
  nje ya `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` hufungua tu
  sehemu ya `/api/mcp/` isiyo ya loopback.

### Wigo wa zana za MCP

Katalogi na sheria za kulinganisha (nyuzi zinazofanana, au wigo uliotolewa unaoishia na `*`):
[Wigo wa zana za MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` katika `src/shared/constants/mcpScopes.ts` ni sehemu ndogo
iliyoandikwa asili, si katalogi kamili. Utekelezaji huendeshwa katika
`open-sse/mcp-server/scopeEnforcement.ts` baada ya `resolveCallerScopeContext()`
kutatua wigo kutoka kwa maelezo ya uthibitishaji wa MCP, metadata ya ombi, au
`OMNIROUTE_MCP_SCOPES`. Inabaki imezimwa isipokuwa `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Wigo wa tokeni ya ufikiaji

`read` / `write` / `admin` kwenye tokeni za `oma_live_…`, zilizopangwa kwa `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Cheo hiki kinatumika tu kwa kitambulisho cha
tokeni ya ufikiaji. Angalia [Uthibitishaji wa Usimamizi](../guides/MANAGEMENT-AUTH.md).

## Kigeuzi cha Kuhitaji Uthibitishaji

`isAuthRequired()` katika `src/shared/utils/apiAuth.ts` huamua ikiwa **uthibitishaji wowote** unahitajika kwa ombi:

- `settings.requireLogin === false` → uthibitishaji umezimwa kimataifa, isipokuwa kwa kiwango kinacholindwa kila wakati (tazama [Viwango vya Walinzi wa Njia](../security/ROUTE_GUARD_TIERS.md)) na miito inayotoa kitambulisho kinachokubali, ambayo inahitaji kitambulisho kilekile kama kuingia kumewezeshwa: kutoa tokeni za usawazishaji, kutengeneza tokeni za ufikiaji za CLI katika wigo wowote, na kuunda ufunguo wa API wenye wigo wa `manage`/`admin`, kutoa wigo huo kwa ufunguo, au kutengeneza upya au kufichua ufunguo huo
  (`requireCredentialForManagementScopedKey()` katika `src/lib/api/requireManagementAuth.ts`).
  Vifunguo vya inference-only hubaki wazi. Kuandika alama ya kipengele inayolindwa (`REQUIRE_API_KEY`, alama nyingine za Usalama, na alama za SSRF / TLS / wigo wa MCP / sandbox zilizoorodheshwa katika
  [Alama za Vipengele](../reference/FEATURE_FLAGS.md#rest-api)) na kuhifadhi mipangilio ya kuficha PII
  (`PUT /api/settings/pii`) bado kunahitaji kitambulisho.
- Hakuna nenosiri lililowekwa **na** hakuna kigezo cha mazingira cha `INITIAL_PASSWORD` → hali ya kuanzisha huruhusu kichawi cha kuanza na maombi ya loopback, lakini maombi ya mtandao yaliyo wazi bado yanahitaji vitambulisho. Isipokuwa: kuandika alama ya kipengele inayolindwa na kuhifadhi mipangilio ya kuficha PII (`PUT /api/settings/pii`) kunahitaji kitambulisho hata kutoka kwa loopback, kwa hivyo loopback pekee haitoshi katika hali hizo.
- Hitilafu yoyote ya DB → hufeli kwa kufunga (usalama kwa chaguo-msingi).

Utekelezaji wa mahitaji ya ufunguo wa API wa mteja hutumia `isRequireApiKeyEnabled()` katika `src/shared/utils/featureFlags.ts`, si usomaji wa moja kwa moja wa `process.env.REQUIRE_API_KEY`. Hili ni muhimu kwa matukio yaliyowekwa kwenye uzalishaji: kubadilisha `REQUIRE_API_KEY` katika Dashibodi → Alama za Vipengele huhifadhi ubatilishaji wa DB na huathiri mara moja `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, na ukaguzi mwingine wa uthibitishaji wa API ya mteja unaotumia msaidizi huyu. Ikiwa hifadhi ya alama za vipengele haiwezi kusomwa, uthibitishaji wa API ya mteja hufeli kwa kufunga na huhitaji ufunguo.

## Mabadiliko Yasiyooana — v3.8.0

Vituo vya mwisho vya `/api/v1/agents/tasks/*` na `/api/resilience/model-cooldowns` **sasa vinahitaji uthibitishaji wa usimamizi** (commit `588a0333`). Wateja ambao hapo awali walituma funguo ya kawaida ya API bila wigo wa `manage` hupokea `403`. Uhamishaji: ama ipe funguo wigo wa `manage` katika dashibodi ya API Keys, au tumia kipindi cha dashibodi ambacho kimeingia katika akaunti.

## Mabadiliko ya Tabia — v3.8.2

`/api/mcp/*` (seva ya mbali ya MCP) bado ni LOCAL_ONLY kwa chaguo-msingi lakini sasa inakubali maombi yasiyo ya loopback wakati kichwa cha `Authorization: Bearer <api-key>` kina wigo wa `manage`. Ruhusa hii maalum inadhibitiwa wazi kwa kila njia kupitia `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` katika `src/server/authz/routeGuard.ts`; kiambishi awali kingine cha LOCAL_ONLY, `/api/cli-tools/runtime/*`, kwa makusudi hakiwezi kurukwa kwa sababu kinaweza kuanzisha michakato-tanzu kiholela. Maombi yasiyojulikana kwenda `/api/mcp/*` kutoka mahali pasipo loopback yanaendelea kurudisha `403 LOCAL_ONLY` — chaguo-msingi kwa njia yoyote mpya ya LOCAL_ONLY hubaki kuwa loopback pekee kwa masharti makali. Angalia [Viwango vya Kilinzi cha Njia](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Majaribio

- Majaribio ya vipengele: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Orodha ya umma inayoruhusiwa: `tests/unit/public-api-routes.test.ts`.
- Endesha jaribio lengwa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Utatuzi

Bomba daima huweka muhuri wa majibu na:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Kwa maombi yaliyothibitishwa vichwa vya ombi vya juu (upande wa kushughulikia) pia ni pamoja na:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Tumia `assertAuth(req, expectedClass)` ndani ya vishikizi — inatupa `AuthzAssertionError` na msimbo `AUTHZ_NOT_INITIALIZED` ikiwa programu ya kati ilipitwa (inasaidia kupata rejista za usanidi katika majaribio).

## Tazama Pia

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — alama ya uthibitishaji kwa kila sehemu ya mwisho
- [COMPLIANCE.md](../security/COMPLIANCE.md) — kumbukumbu ya ukaguzi kwa matukio ya uthibitishaji
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — nafasi tatu za majina ya wigo na katalogi ya wigo wa zana ya MCP
- Chanzo: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
