# Authorization Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Tushen gaskiya:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **An sabunta ta ƙarshe:** 2026-09-22 — sararin samaniya na iyakoki suna nuni zuwa MCP-SERVER.md

OmniRoute yana da tsarin izini mai sanin hanya wanda ke hana kowane buƙatar API. Rarraba yana da **ƙayyadaddun** kuma **mai rufe-kuskure** — duk abin da ba za a iya rarraba shi ba yana ƙarewa a matsayin `MANAGEMENT` kuma yana buƙatar zama ko alamar matakin gudanarwa. Wannan shafin yana bayyana tsarin ga injiniyoyi masu kula da hanyoyi ko masu tsara sabbin wuraren ƙarshe.

![Tsarin AuthZ (ajiye hanyoyi 3 + kimanta manufofi)](../diagrams/exported/authz-pipeline.svg)

> Tushe: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Hanyoyin Tabbatarwa Guda Biyu

### 1. Maɓallin API (Bearer)

Ana amfani da shi don APIs na abokan ciniki masu dacewa da OpenAI/Anthropic/Gemini da kuma wasu hanyoyin gudanarwa idan maɓallin yana da ikon `manage`.

```
Authorization: Bearer <api-key>
```

Ana tabbatar da ingancinsa ta `isValidApiKey()` / `extractApiKey()` a cikin `src/sse/services/auth.ts`, sannan a sake fitar da su ta `src/shared/utils/apiAuth.ts`. Mai tabbatarwar yana kuma karɓar masu canjin muhalli `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` a matsayin maɓallan wucewa na dindindin (issue #1350).

### 2. Zaman Dashboard (kuk ɗin auth_token)

Don shafukan dashboard da ayyukan gudanarwa.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kuk ɗin zama ne kawai idan JWT ya inganta **kuma yana ɗauke da `authenticated: true`**
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Duk
masu amfani da kuk ɗin (mai tsaron hanyar dashboard
(`isDashboardSessionAuthenticated()`), sabunta bututun izini, musayar WebSocket, uwar garken
kai tsaye, `/api/settings/require-login`, `/api/auth/status`) suna bi ta wannan mataimaki.
Akwai wasu JWT da aka sanya hannu da `JWT_SECRET` — CLI na Cursor yana ƙirƙirar
`iss "omniroute" / aud "cursor-cli"` tokens don masu riƙe da maɓalli — kuma ba su taɓa zama zaman shiga ba
(#13298).

Ana tabbatar da shi ta `isDashboardSessionAuthenticated()` a cikin `src/shared/utils/apiAuth.ts`. Bututun yana sabunta JWT ta atomatik idan ya rage masa ƙasa da kwanaki 7 a cikin rayuwarsa ta kwanaki 30.

Zaman shiga na iya ƙarewa kafin kwanaki 30 su cika, saboda duk mai ƙirƙirar token yana bi ta `mintDashboardSessionToken` (lokacin bayarwa `iat` da ID `jti`), kuma mai tabbatarwa yana duba saituna biyu: `sessionsValidAfter`, wanda canjin kalmar sirri ke saita shi domin duk zaman da aka bayar kafin lokacin su daina ingantawa (mai binciken da ya canja kalmar sirri yana samun sabon kuk), da `revokedDashboardSessions`, wanda `POST /api/auth/logout` ke ƙara `jti` na zaman da aka fita daga ciki. Zaman da tsohuwar sigar ta ƙirƙira ba su ɗauke da ɗaya daga cikin waɗannan claims ba, kuma za su ci gaba da aiki har sai an fara canja kalmar sirri. Idan ba a iya karanta saitunan ba, ba a amince da zaman ba.

Wasu hanyoyin gudanarwa suna karɓar **ɗaya daga cikin** hanyoyin biyu: kuk ko `Bearer <key>` idan maɓallin API yana da ikon `manage` (ko `admin`). Wannan ne ke ba da damar tsarin aikin “ana iya daidaita shi ta kiran API” da aka ƙara a v3.8.

#### Ƙofar shiga ta OIDC ta zaɓi (#6973)

Shigar mai gudanar da dashboard yana kuma tallafa wa tsarin OIDC (OpenID Connect) na **zaɓi** tare da tsohuwar hanyar shiga da kalmar sirri — ba a taɓa cire
shigar da kalmar sirri ba, ana ƙara masa wannan zaɓi ne kawai:

- Yana kashe ne sai idan `settings.oidcEnabled === true` **kuma** an saita
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` duka (Saituna → Tantancewa).
  `GET /api/auth/oidc/login` yana mayar da `400` idan ba haka ba.
- `GET /api/auth/oidc/login` yana gano `authorization_endpoint` daga
  `/.well-known/openid-configuration` na mai bayarwa (idan ba haka ba, yana koma wa
  `<issuer>/authorize`), yana gina URI ɗin turawa daga buƙatar da ta shigo
  (yana kula da `x-forwarded-proto`), sannan yana tura zuwa IdP tare da wani
  `state` bazuwar da aka adana a cikin kuki `oidc_state` mai `httpOnly`.
- `GET /api/auth/oidc/callback` yana tabbatar da `state`, yana musanya lambar
  izini, sannan yana tabbatar da sa hannun ID token ta JWKS na mai bayarwa
  (`createRemoteJWKSet` na `jose`, wanda ake adanawa bisa ga URI na JWKS) tare da
  binciken `issuer`/`audience`. Shigar da dashboard yana buƙatar jerin
  `oidcAllowedSubjects` marar komai, manufar `oidcAdmissionClaim`, ko duka biyun.
  Jerin batutuwa yana daidaita `sub` ko `email` ne kawai idan
  `email_verified === true`. Manufar da'awar zaɓi tana karɓar hanyar da'awar ID
  token mai rabe da digo (misali, `realm_access.roles`) da kuma jerin ƙimomin da
  aka yarda da su; da'awar da aka warware dole ta kasance jerin rubutu kuma ta
  ƙunshi aƙalla ƙima guda daga cikin waɗanda aka yarda da su. Idan an saita
  manufofin biyu, dole ne duka su yi nasara. Da'awoyin da suka ɓace ko suka lalace
  suna sa tsarin ya ƙi amincewa, kuma idan babu wata manufa daga cikin biyun,
  callback ɗin yana ƙin shiga (`not_configured`). Saitunan da ke amfani da
  batun kawai na da suke ci gaba ba tare da canji ba.
- Keycloak yawanci yana sanya rawunan realm cikin access tokens, ba lallai cikin
  ID tokens ba. Don buƙatar rawar realm `admin`, saita protocol mapper na wannan
  client wanda zai haɗa da `realm_access.roles` cikin **ID token** ɗinsa, sannan ka
  saita `oidcAdmissionClaim` zuwa `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Bincika ainihin da'awar ID token na wannan client kafin kunna shigarwa bisa rawa
  kawai; manhajar ba ta karanta rawunan access-token ba. Ƙin bayar da token daga
  ɓangaren IdP na iya ƙara kariya, amma ba ya maye gurbin wannan binciken na
  ɓangaren manhajar.
- Idan an yi nasara, yana ƙirƙirar **ainihin** JWT `auth_token` na kwanaki 30 da
  shigar kalmar sirri ke bayarwa (`src/app/api/auth/login/route.ts`), saboda haka
  sauran tsarin zaman dashboard (sabunta kai-tsaye, tutocin kuki) ba su canza ba —
  OIDC yana maye gurbin yadda ake ƙirƙirar kukin ne kawai, ba abin da yake ba da
  izini ba. Canje-canje ga rawuna/ƙungiyoyin IdP ba sa soke zaman OmniRoute da ake
  da su; fita, sauya kalmar sirri, ko ƙarewar zaman ne har yanzu ke ƙayyade
  tsawon rayuwarsu.
- Kowane saitin `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) yana cikin
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  yana amsa `400 PASSWORD_REQUIRED` sai idan jikin buƙatar yana ɗauke da kalmar
  sirrin gudanarwa a matsayin `currentPassword` (`401 PASSWORD_MISMATCH` idan ba
  daidai ba ce). `oidcDisablePasswordLogin` yana ƙin shigar da kalmar sirri
  (`POST /api/auth/login`) amma yana riƙe hash ɗin kalmar sirrin da aka adana,
  kuma sake tantancewa har yanzu yana duba `currentPassword` da shi.
- `corsOrigins` da `bruteForceProtection` su ma suna cikin
  `SECURITY_IMPACTING_SETTINGS_KEYS`: sassauta ɗayansu yana raunana kariyar
  shiga, saboda haka suna buƙatar sake tantancewa da `currentPassword` iri ɗaya
  (shafin Tsaro yana neman sa), kuma shigo da JSON yana cire su.
- Kowace maɓallin manufar tsaro — shigarwar `SECURITY_IMPACTING_SETTINGS_KEYS`,
  kowace maɓallin `oidc*`, da yanayin zaman dashboard — **na mai gudanarwa
  kawai** ne a `PATCH /api/settings`: ana ƙin maɓallin API mai ikon manage ko
  token ɗin samun dama na `oma_` da `403` ko da ya aika da `currentPassword` daidai,
  kuma ana rubuta ƙin amincewar a duba-aiki a matsayin `settings.update_failed`
  tare da `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` a `src/lib/api/operatorCredential.ts`).
  Saitunan yau da kullum (jigo, zaɓuɓɓukan nuni) suna ci gaba da kasancewa masu
  rubutu ga maɓallin `manage` ko token ɗin samun dama na `admin`. Kowace gyara ta
  `/api/settings` kanta (da ta `/api/settings/require-login`) ita ma tana buƙatar
  ikon `admin` na token ɗin samun dama
  (`ADMIN_MUTATION_EXACT_PATHS` a `src/server/authz/accessScopes.ts`, daidaitawar
  ainihin hanya); `GET` yana ci gaba da zama `read`, yayin da sauran ƙananan
  hanyoyin `/api/settings/*` (proxies, tsoffin combo, laƙaban model, matsawa,
  sharewa…) suke ci gaba da amfani da ikon `write` da ake ƙayyade bisa ga hanyar.
- `POST /api/settings/import-json` yana tsallake wannan sake tantancewa, saboda haka
  yana cire kowace maɓalli da ke cikin `IMPORT_STRIPPED_SETTINGS_KEYS` (a fayil ɗin
  nan) kafin rubutawa: kalmar sirri da `currentPassword`, kowace shigarwa ta
  `SECURITY_IMPACTING_SETTINGS_KEYS`, da yanayin zaman dashboard
  (`sessionsValidAfter`, `revokedDashboardSessions`). Saboda haka, shigo da tsohon
  madadin ba zai iya dawo da zaman da canjin kalmar sirri ko fita ya riga ya ƙare
  ba.

#### Shigar TOTP na zaɓi mai tabbatarwa matakai biyu (#16619)

Ana yi masa rajista daga Saituna → Tsaro; yana kashe har sai mai gudanarwa ya
kunna shi (`src/server/auth/dashboardMfa.ts`).

- **Abin da ya ƙunsa:** shiga ta kalmar sirri (`POST /api/auth/login`, wanda daga nan yake buƙatar
  `POST /api/auth/mfa/verify`) da `omniroute connect` (`POST /api/cli/connect`,
  wanda ya ƙi musayar kalmar sirri kawai kuma yake karɓar lambar a matsayin `totp`).
- **Abin da bai ƙunsa ba:** shiga ta OIDC / SSO (`/api/auth/oidc/callback`) ba ya
  neman TOTP na OmniRoute. Yana dogara ne da mataki na biyu na mai ba da shaidar kansa,
  don haka a tilasta MFA a cikin IdP idan an kunna OIDC.
- **Farfadowa** (na'ura ta ɓace, babu sauran lambobin farfadowa, ko kuma wani abu na
  tabbatarwa da ba za a iya tabbatar da shi ba, misali bayan an canza
  `STORAGE_ENCRYPTION_KEY`):
  1. Sake kunna uwar garken tare da `OMNIROUTE_DISABLE_MFA=true`.
  2. A kan host ɗin da kansa (abokin loopback da `Host` na loopback, kamar
     `http://localhost:20128`), shiga da kalmar sirri. Ana tsallake mataki na biyu
     ne kawai don wannan asalin; kowane sauran asali har yanzu yana buƙatar lambar.
  3. A cikin Saituna → Tsaro → Kashe, shigar da kalmar sirri kuma bar lambar
     babu komai. `POST /api/auth/mfa/disable` yana karɓar jiki ba tare da `code` ba
     ne kawai yayin da aka saita wannan canjin kuma buƙatar ta fito daga host; har yanzu
     yana buƙatar zaman dashboard da kalmar sirri ta yanzu, kuma ana rubuta shi a
     kundin duba-audit a matsayin `auth.mfa.disabled` tare da `secondFactor: "recovery_switch"`.
  4. Cire saitin `OMNIROUTE_DISABLE_MFA`, sake kunnawa, sannan a sake yin rajista idan ya zama dole.

## Nau'ikan Route

`src/server/authz/types.ts` yana bayyana azuzuwa uku; duk route da ba za a iya rarraba shi da tabbaci ba yana komawa zuwa `MANAGEMENT`.

| Aji          | Bayani                                                                                                                                                         | Tabbatarwar da ake buƙata                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `PUBLIC`     | Hanyoyi masu aminci a bayyane: shiga, fita, matsayi, init, health, bootstrap na onboarding.                                                                    | Babu                                                                |
| `CLIENT_API` | Ƙarshen hidimar samfuri: `/api/v1/*`, `/api/v1beta/*`, tare da sunayen madadin `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer key idan feature flag na `REQUIRE_API_KEY` mai aiki ya kunna |
| `MANAGEMENT` | Shafukan dashboard, saituna, masu bayarwa, maɓalli, ƙarshen admin da bincike.                                                                                  | Zaman dashboard KO Bearer mai iyakar `manage`                       |

Wasu ayyukan `MANAGEMENT` **na operator ne kawai**: maɓallin `manage` bai isa ba. Fitar da credentials da aka adana (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), mayar da backup a kan live data (`POST /api/db-backups/import` har da `dryRun=true`, `POST /api/db-backups` restore ta id, `POST /api/settings/import-json`), da lalata wuraren mayarwa (`DELETE /api/db-backups` cleanup, da `PATCH /api/db-backups` domin retention ɗin da yake ajiyewa shi ne ke tafiyar da pruning na atomatik bayan kowane backup) suna buƙatar zaman dashboard, asusun CLI na gida, ko shiga da aka kashe. Bayar da sync token (`POST /api/sync/tokens`) da ƙirƙirar `admin` CLI access token (`POST /api/cli/tokens`) suna buƙatar zaman dashboard ko asusun CLI na gida a kowane yanayin shiga. Maɓallan API na kowane iyaka da `oma_` access tokens ba credentials na operator ba ne: suna samun `403` duk lokacin da ake buƙatar ɗaya. Ana duba haka a `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Canza saitunan shiga ma na operator ne kawai: `POST /api/settings/require-login` (saita kalmar sirrin gudanarwa / kunna ko kashe `requireLogin`) yana karɓar waɗannan credentials ne kawai da zarar kalmar sirri ta wanzu. Taga bootstrap na farkon gudu (babu kalmar sirri tukuna) ba ta canzawa, kuma zaman dashboard dole ne ya aika `currentPassword` don maye gurbin kalmar sirri (`403` idan ba ta nan ko ba daidai ba ce, kuma ana rubuta ta a matsayin `settings.update_failed`). CLI na gida da instance mai shiga da aka kashe suna riƙe hanyar dawowa kuma suna iya saita kalmar sirri ba tare da ita ba, domin dukkansu an ɗaure su da host ɗin da ke mallakar data directory.

## Bututu

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

Amintattun masu kai na ciki (wanda aka bayyana a cikin `src/server/authz/headers.ts`) sune** cire daga buƙatun masu shigowa** kafin rarraba — abokan ciniki ba za su iya riga-kafin `x-omniroute-auth-*` don kwaikwayi wani batu ba.

### Kwangilolin siyasa

Kowane ajin hanya yana da manufa a cikin `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — kullum yana dawowa `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — yana fitar da Mai ɗaukar nauyi, yana inganta ta hanyar `validateApiKey()`. Faɗuwa zuwa ga wanda ba a san sunansa ba kawai lokacin da aka kashe ingantaccen tutar fasalin `REQUIRE_API_KEY`. Tuta mai inganci ana warware ta ta hanyar `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) don haka Tutoci Siffofin Dashboard da masu canjin yanayi suna sarrafa `/api/v1/*`, `/api/v1beta/*`, da laƙabi akai-akai; gazawar warwarewa ta kasa rufe. Yana ba da damar buƙatun-zaman dashboard akan hanyoyin API abokin ciniki (ciki har da `/api/v1/models`, ke amfani da kundin ƙirar dashboard). Lokacin da aka kunna Entra ID SSO, reshen SSO ne ke kula da mai ɗaukar kaya wanda shine tsarin Entra token (bangaren tushe64url uku, `RS*` alg, `kid`).** kafin** `validateApiKey()` kuma hukuncinsa shine — na ƙarshe ba zai taɓa shiga hanyar API-key ba ko reshe-zuwa-wanda ba a san shi ba, don haka ƙaddamarwar mai ba da shaida ba zai iya zama buɗe hanyar shiga ba. Maɓallan API na tsaye ba su shafa ba. Duba [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — yana karɓar zaman dashboard, buƙatun ƙirar ƙira na ciki (wanda ya dace da `/api/providers/[name]/(sync-models|models)`), ko kuma ya tsallake gaba ɗaya idan `isAuthRequired()` ya dawo ƙarya. Yana dawo da 403 (`AUTH_001`) lokacin da alamar Mai ɗauka ta kasance amma bata aiki, 401 in ba haka ba. Hakanan yana tilasta matakan tsaro na hanya (LOCAL_ONLY / ALWAYS_PROTECTED) kafin kowane reshe na auth — duba [Tiers Guard Route](../security/ROUTE_GUARD_TIERS.md). hanyoyin LOCAL_ONLY a cikin `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (yau: `/api/mcp/`) ana iya samun dama daga waɗanda ba a dawo da su ba lokacin da maɓalli na Bearer ke ɗauke da iyakar `manage` ; duk sauran hanyoyin LOCAL_ONLY sun kasance masu tsattsauran ra'ayi ba tare da la'akari da iyaka ba.

Manufar nasara tana mayar da `AuthSubject` da `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Masu kula da ƙasa za su iya karanta ta ta `assertAuth(request, "CLIENT_API")` a cikin `src/server/authz/assertAuth.ts` maimakon sake gudanar da dabaru na gaskiya.

## Jerin Hanyoyin Jama'a

`src/shared/constants/publicApiRoutes.ts` shi ne jerin izinin da aka fayyace:

An raba jerin bisa **tsari**, kuma wannan rabawar tana da muhimmiyar rawa (GHSA-74g9-q8f6-793h): ana daidaita prefix ta amfani da `startsWith()`, don haka yana kuma dacewa da kowace hanya makwabta da ke raba haruffan farkonta.
`/api/usage/om-usage` a matsayin prefix yana sanya `/api/usage/om-usage<anything>` PUBLIC, kuma Next yana warware hakan zuwa `/api/usage/[connectionId]` — handler da ba shi da nasa tantancewar izini.

```ts
// Rukunonin hanyoyi na gaske. Kowane abu DOLE ne ya ƙare da "/" (gwajin unit yana tabbatar da hakan).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // ana ɗaukarsa CLIENT_API a cikin classify, ba "no-auth public" ba
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Hanyoyi guda ɗaya, ana daidaita su EXACTLY (tare da ko ba tare da slash na ƙarshe ba).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // mataki na 2 na login don TOTP da aka zaɓa; yana buƙatar kukin MFA-pending
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Hanyoyi guda ɗaya masu karantawa kawai waɗanda kuma suke amfani da sassaucin origin na CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Hanya guda ɗaya mai karantawa kawai BA tare da sassaucin CORS ba.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Hanyoyin karantawa kawai na jama'a ne **kawai** ga hanyoyin da ba su da haɗari. Lura: `classifyRoute()` yana cire `/api/v1/*` da `/api/v1beta/*` daga faɗuwar PUBLIC — waɗannan koyaushe `CLIENT_API` ne, saboda haka manufar maɓallin Bearer tana ci gaba da aiki.

## Ƙara Sabuwar Hanya

### Tsari na 1 — Endpoint na API na abokin ciniki na jama'a (Bearer-auth)

Hanyoyin da ke ƙarƙashin `/api/v1/` da `/api/v1beta/` ana rarraba su a matsayin `CLIENT_API` ta atomatik. Middleware yana tilasta binciken Bearer; route handlers ba sa buƙatar sake yin sa, amma za su iya karanta subject idan hakan yana da amfani.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... dabarun handler
}
```

### Tsari na 2 — Endpoint na gudanarwa (session ko Bearer + manage)

Yi amfani da `requireManagementAuth()` daga `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... dabarun handler
}
```

`requireManagementAuth()` yana mayar da `null` idan an yi nasara ko kuma kuskuren JSON `Response`:

- 401 `AUTH_001` "Ana buƙatar tantancewa" — babu bayanan tantancewa kwata-kwata
- 403 — Bearer mara inganci **ko** Bearer yana nan amma key ba shi da scope na `manage` / `admin`

`hasManageScope(scopes)` yana mayar da true ga `"manage"` ko `"admin"`.

### Tsari na 3 — Ƙarawa cikin jerin izinin jama'a

Zaɓi set bisa ga siffa, ba bisa ga sauƙi ba. Hanya guda tana shiga `PUBLIC_API_ROUTES_EXACT` (ko `PUBLIC_READONLY_CORS_API_ROUTES` idan GET-kawai ce); babban reshen hanyoyi na ainihi ne kawai zai shiga `PUBLIC_API_ROUTE_PREFIXES`, kuma **dole ne ya ƙare da `/`**. Sanya hanya guda a jerin prefix yana kuma wallafa kowace hanya da ke kusa wadda take da haruffan farko iri ɗaya — har da 'yan'uwan dynamic-segment da za a ƙara daga baya (GHSA-74g9-q8f6-793h). Sabunta gwaje-gwajen unit a `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` da `tests/unit/authz/classify.test.ts`.

## Fadukan Aiki

Fadukan suna uku. Kowane mai dubawa yana karanta nasa zaren ne kawai. Kwatancen,
ciki har da dalilin da yasa `manage` ke kasa `scopeMatches` don `read:compression` da kuma dalilin da yasa alamar shiga `read` ba zai iya `PATCH /api/keys/{id}` ba, yana nan a
[Fadukan suna uku](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Mabudan API suna ɗauke da jeri na `scopes` (an adana su a matsayin JSON a `api_keys.scopes`, duba `src/lib/db/apiKeys.ts`).

### Fadukan Aiki na Gudanarwa

- `manage` / `admin` — `hasManageScope`. Samun damar shiga hanyoyin API na gudanarwa.
- `mcp:connect`, `self:usage`, `self:account-quota`, da
  `policy:bypass-provider-quota` fadukan aiki ne masu ƙari, masu daidai-daidai. Suna waje da `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` yana buɗe kawai `/api/mcp/` wanda ba na madauki ba.

### Fadukan Aiki na Kayan Aikin MCP

Katalog da ka'idojin daidaitawa (zaren daidai, ko fadukan aiki da aka bayar wanda ya ƙare da `*`):
[Fadukan Aiki na Kayan Aikin MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` a `src/shared/constants/mcpScopes.ts` shine ainihin ƙaramin saitin da aka rubuta, ba cikakken katalog ɗin ba. Aiwatarwa yana gudana a
`open-sse/mcp-server/scopeEnforcement.ts` bayan `resolveCallerScopeContext()` ya warware fadukan aiki daga bayanan shiga na MCP, metadata na buƙata, ko `OMNIROUTE_MCP_SCOPES`.
Yana kashe sai dai idan `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Fadukan Aiki na Alamar Shiga

`read` / `write` / `admin` akan alamomin `oma_live_…`, an jera su ta `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Wannan matsayi yana aiki ne kawai ga takardar shaidar alamar shiga. Duba [Tabbatar da Gudanarwa](../guides/MANAGEMENT-AUTH.md).

## Maɓallin Buƙatar Tabbatarwa

`isAuthRequired()` a cikin `src/shared/utils/apiAuth.ts` ne ke yanke shawara ko ana tilasta **kowane** tabbatarwa ga buƙata:

- `settings.requireLogin === false` → an kashe tabbatarwa gaba ɗaya, sai dai matakin kariya koyaushe (duba [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) da kiran da ke ba da takardar shaidar da yake karɓa, waɗanda ke buƙatar takardar shaida ɗaya kamar yadda ake yi lokacin da shiga ke kunne: bayar da sync tokens, ƙirƙirar CLI access tokens a kowane iyaka, da ƙirƙirar maɓallin API mai iyakar `manage`/`admin`, ba da wannan iyaka ga maɓalli, ko sake samar ko nuna irin wannan maɓalli (`requireCredentialForManagementScopedKey()` a `src/lib/api/requireManagementAuth.ts`). Maɓallan inference kawai suna zama a buɗe.
- Babu kalmar sirri da aka saita **kuma** babu env var na `INITIAL_PASSWORD` → yanayin bootstrap: yana barin onboarding wizard da buƙatun loopback, amma buƙatun hanyar sadarwa da aka fallasa har yanzu suna buƙatar takardun shaida.
- Duk kuskuren DB → yana gazawa a rufe (secure-by-default).

Tilasta maɓallin API na abokin ciniki yana amfani da `isRequireApiKeyEnabled()` a `src/shared/utils/featureFlags.ts`, ba karanta `process.env.REQUIRE_API_KEY` kai tsaye ba. Wannan yana da muhimmanci ga instances da aka tura: canza `REQUIRE_API_KEY` a Dashboard → Feature Flags yana adana DB override kuma nan take yana shafar `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, da sauran duba tabbatarwar client-API da ke raba wannan mataimaki. Idan ba a iya karanta feature flag store ba, tabbatarwar client API tana gazawa a rufe kuma tana buƙatar maɓalli.

## Sauyin da ke Karya Daidaituwa — v3.8.0

Wuraren ƙarshen `/api/v1/agents/tasks/*` da `/api/resilience/model-cooldowns` **yanzu suna buƙatar tantancewar gudanarwa** (commit `588a0333`). Abokan ciniki waɗanda a baya suke aika maɓallin API na yau da kullum ba tare da iyakar izinin `manage` ba za su karɓi `403`. Ƙaura: ko dai a bai wa maɓallin iyakar izinin `manage` a cikin dashboard na API Keys, ko kuma a yi amfani da zaman dashboard da aka shiga.

## Sauyin Halayya — v3.8.2

`/api/mcp/*` (uwar garken MCP mai nisa) har yanzu LOCAL_ONLY ne ta tsohuwa, amma yanzu yana karɓar buƙatun da ba na loopback ba idan header na `Authorization: Bearer <api-key>` yana ɗauke da iyakar izinin `manage`. An kayyade wannan keɓancewar a sarari ga kowace hanya ta hanyar `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` a cikin `src/server/authz/routeGuard.ts`; da gangan ba za a iya tsallake ƙawancen prefix na LOCAL_ONLY mai suna `/api/cli-tools/runtime/*` ba, saboda yana iya ƙaddamar da subprocesses na kowace iri. Buƙatun da ba a tantance ba zuwa `/api/mcp/*` daga wajen loopback za su ci gaba da dawo da `403 LOCAL_ONLY` — tsohon ƙa'ida ga kowace sabuwar hanyar LOCAL_ONLY ita ce tsauraran loopback kawai. Duba [Matakan Tsaron Hanya](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Gwaji

- Gwaje-gwajen unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Jerin hanyoyin jama'a da aka amince da su: `tests/unit/public-api-routes.test.ts`.
- Gudanar da gwaji takamaimai: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Gyara kurakurai

Bututun yana yin tambari koyaushe tare da:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Don ingantattun buƙatun masu kan buƙatun buƙatun na sama (handler-gefen) suma sun haɗa da:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Yi amfani da `assertAuth(req, expectedClass)` a cikin masu kula da — yana jefa `AuthzAssertionError` tare da lambar `AUTHZ_NOT_INITIALIZED` idan an ketare na'urar tsakiya (taimaka don kama koma bayan daidaitawa a cikin gwaje-gwaje).

## Duba Kuma

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — alama ta izini ga kowane maƙasudi
- [COMPLIANCE.md](../security/COMPLIANCE.md) — rajistan bincike na abubuwan izini
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — sararin suna mai iyakoki uku da kundin kayan aikin MCP
- Tushe: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
