# Authorization Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Foinse na fírinne:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Nuashonraithe go deireanach:** 2026-09-22 — dírithe ar MCP-SERVER.md

Tá píblíne údaraithe atá feasach ar bhealaí ag OmniRoute a chuireann bac ar gach iarratas API. Tá an aicmiú **cinntitheach** agus **teip-dúnta** — críochnaíonn aon rud nach féidir a aicmiú mar `MANAGEMENT` agus éilíonn sé seisiún nó comhartha grád bainistíochta. Míníonn an leathanach seo an tsamhail d'innealtóirí a chothabhálann bealaí nó a dhearann críochphointí nua.

![Píblíne AuthZ (3 aicme bealaigh + meastóireacht beartais)](../diagrams/exported/authz-pipeline.svg)

> Foinse: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dhá Mhodh Fíordheimhnithe

### 1. API Key (Bearer)

Úsáidtear é le haghaidh API na gcliant atá comhoiriúnach le OpenAI/Anthropic/Gemini agus le roinnt bealaí bainistíochta nuair a bhíonn raon `manage` ag an eochair.

```
Authorization: Bearer <api-key>
```

Fíoraítear é trí `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` agus athchóirítear trí `src/shared/utils/apiAuth.ts`. Glacann an fíoraitheoir freisin leis na hathróga comhshaoil `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mar eochracha pasmhaithe buana (issue #1350).

### 2. Seisiún Dashboard (auth_token cookie)

Le haghaidh leathanaigh dashboard agus oibríochtaí riarthóra.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Is seisiún í an fianán ach amháin nuair a fhíoraítear an JWT **agus** nuair a iompraíonn sé `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Téann gach úsáideoir fianáin (dashboard route guard (`isDashboardSessionAuthenticated()`), athnuachan authz pipeline, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`) tríd an gcúntóir sin.
Tá JWTanna eile sínithe le `JWT_SECRET` ann: cruthaíonn passthrough Cursor CLI tokens `iss "omniroute" / aud "cursor-cli"` do dhaoine a bhfuil eochair acu, agus ní seisiúin iad riamh (#13298).

Fíoraítear é trí `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Athnuaíonn an pipeline an JWT go huathoibríoch nuair a fhágann níos lú ná 7 lá de a shaol 30 lá.

Is féidir go dtiocfadh deireadh le seisiún sula dtagann 30 lá chun críche, toisc go dtéann gach cruthaitheoir tríd an `mintDashboardSessionToken` (am eisiúna `iat` agus aitheantas `jti`), agus seiceálann an fíoraitheoir dhá shocrú: `sessionsValidAfter`, a shocraíonn athrú pasfhocail do gach seisiún a eisíodh roimhe sin chun nach bhfíoraítear iad a thuilleadh (faigheann an brabhsálaí a d'athraigh an pasfhocal fianán nua), agus `revokedDashboardSessions`, a chuireann `POST /api/auth/logout` `jti` an tseisiúin a dhúnadh leis. Ní bhíonn aon cheann de na héilimh sin ag seisiúin a cruthaíodh le scaoileadh níos sine, agus fanann siad bailí go dtí an chéad athrú pasfhocail. Mura féidir na socruithe a léamh, ní iontaofar an seisiún.

Ligeann roinnt bealaí bainistíochta **ceann acu** a ghlacadh: fianán NÓ `Bearer <key>` nuair a bhíonn raon `manage` (nó `admin`) ag an eochair API. Is é seo a chumasaíonn an sreabhadh oibre "configurable via API calls" a cuireadh le v3.8.

#### Logáil isteach OIDC roghnach (#6973)

Tacaíonn logáil isteach riarthóra an dashboard le sreabhadh **roghnach** OIDC (OpenID Connect) taobh le logáil isteach réamhshocraithe an phasfhocail. Ní baintear logáil isteach an phasfhocail riamh, ní chuirtear ach leis é:

- Díchumasaithe mura bhfuil `settings.oidcEnabled === true` **agus** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` go léir cumraithe (Settings → Auth). Freagraíonn `GET /api/auth/oidc/login` le `400` ina ndiaidh sin.
- Aimsíonn `GET /api/auth/oidc/login` an `authorization_endpoint` ó `/.well-known/openid-configuration` an eisitheora (titeann sé ar ais go `<issuer>/authorize`), tógann sé an redirect URI ón iarratas isteach (tá sé feasach ar `x-forwarded-proto`), agus treoraíonn sé chuig an IdP le `state` randamach atá stóráilte i bhfianán `httpOnly` `oidc_state`.
- Fíoraíonn `GET /api/auth/oidc/callback` an `state`, malartaíonn sé an authorization code, agus seiceálann sé síniú an ID token trí JWKS an eisitheora (`createRemoteJWKSet` ó `jose`, cuimhnithe in aghaidh gach JWKS URI) le seiceálacha `issuer`/`audience`. Tá liosta `oidcAllowedSubjects` riachtanach: meaitseálann sé éileamh `sub` an tokin nó a éileamh `email`. Ní ghlactar leis an éileamh email ach nuair a bhíonn `email_verified === true`, agus dá bhrí sin ní fhéadfaidh ríomhphost neamhfhíoraithe ag an IdP dul thar an ngeata riamh. Gan iontrálacha ar bith, diúltaíonn an callback do gach logáil isteach (`not_configured`).
- Ar éirí leis, cruthaíonn sé an **JWT `auth_token` 30 lá céanna** a eisíonn logáil isteach an phasfhocail (`src/app/api/auth/login/route.ts`), mar sin ní athraíonn an chuid eile de phíblíne seisiúin an dashboard (athnuachan uathoibríoch, bratacha fianán). Ní athraíonn OIDC ach an bealach a chruthaítear an fianán, ní an rud a dheonaíonn sé.
- Tá gach socrú `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) i `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): freagraíonn `PATCH /api/settings` le `400 PASSWORD_REQUIRED` mura n-iompraíonn an comhlacht an pasfhocal riaracháin mar `currentPassword` (`401 PASSWORD_MISMATCH` nuair a bhíonn sé mícheart). Cuireann `oidcDisablePasswordLogin` cosc ar _logáil isteach_ leis an bpasfhocal (`POST /api/auth/login`) ach coinníonn sé an hash pasfhocail stóráilte, agus seiceálann an athdheimhniú fós `currentPassword` ina aghaidh.
- Tá `corsOrigins` agus `bruteForceProtection` i `SECURITY_IMPACTING_SETTINGS_KEYS` freisin: laghdaíonn a scaoileadh cosaintí logála isteach, agus dá bhrí sin teastaíonn an athdheimhniú céanna `currentPassword` uathu (iarrann an Security tab é), agus baineann JSON import as iad.
- Is **oibreoir-amháin** gach eochair beartais slándála (iontrálacha `SECURITY_IMPACTING_SETTINGS_KEYS`, gach eochair `oidc*`, agus stát seisiúin an dashboard) ar `PATCH /api/settings`: diúltaítear do eochair API le scóip manage nó do thocán rochtana `oma_` le `403`, fiú nuair a sheolann siad `currentPassword` ceart, agus déantar an diúltú a iniúchadh mar `settings.update_failed` le `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`). Fanann socruithe gnácha (téama, roghanna taispeána) inscríofa do eochair `manage` nó tocán rochtana `admin`. Éilíonn gach athrú ar `/api/settings` féin (agus ar `/api/settings/require-login`) scóip tocáin rochtana `admin` freisin (`ADMIN_MUTATION_EXACT_PATHS` i `src/server/authz/accessScopes.ts`, meaitseáil cosain iomlán). Fanann `GET` mar `read`, agus coinníonn fo-bhealaí eile `/api/settings/*` (proxies, combo defaults, model aliases, compression, purges…) an scóip `write` a thagann ón modh.
- Léimeann `POST /api/settings/import-json` thar an athdheimhniú sin, agus dá bhrí sin baineann sé gach eochair in `IMPORT_STRIPPED_SETTINGS_KEYS` (comhad céanna) sula scríobhann sé: an pasfhocal agus `currentPassword`, gach iontráil `SECURITY_IMPACTING_SETTINGS_KEYS`, agus stát seisiúin an dashboard (`sessionsValidAfter`, `revokedDashboardSessions`). Dá bhrí sin ní féidir le haisghabháil chúltaca níos sine seisiún a athbheochan a chuir athrú pasfhocail nó logáil amach deireadh leis.

## Catagóirí Bealaí

Sainíonn `src/server/authz/types.ts` trí chatagóir; titeann aon bhealach nach féidir a aicmiú go cinntitheach ar ais go `MANAGEMENT`.

| Catagóir     | Cur síos                                                                                                                                                  | Fíordheimhniú riachtanach                                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `PUBLIC`     | Bealaí atá sábháilte go sainiúil: logáil isteach, logáil amach, stádas, init, sláinte, bootstrap onboarding.                                              | Dada                                                                               |
| `CLIENT_API` | Críochphointí freastail samhla: `/api/v1/*`, `/api/v1beta/*`, agus ailias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Eochair Bearer nuair a bhíonn bratach gné `REQUIRE_API_KEY` éifeachtach cumasaithe |
| `MANAGEMENT` | Leathanaigh dashboard, socruithe, soláthraithe, eochracha, críochphointí riaracháin agus diagnóisicí.                                                     | Seisiún dashboard NÓ Bearer le scóip `manage`                                      |

Is **gníomhartha oibreora-amháin** cuid de ghníomhartha `MANAGEMENT`: ní leor eochair `manage`. Éilíonn easpórtáil creidiúintí stóráilte (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), cúltaca a athchur os cionn na sonraí beo (`POST /api/db-backups/import` lena n-áirítear `dryRun=true`, `POST /api/db-backups` athchóiriú de réir aitheantais, `POST /api/settings/import-json`), agus pointí athchóirithe a scriosadh (`DELETE /api/db-backups` glanadh, agus `PATCH /api/db-backups` toisc go dtiomáineann an coinneáil a shábhálann sé an glanadh uathoibríoch tar éis gach cúltaca) seisiún dashboard, ábhar CLI áitiúil, nó logáil isteach díchumasaithe. Éilíonn tocán sioncrónaithe a eisiúint (`POST /api/sync/tokens`) agus tocán rochtana CLI `admin` a bhathú (`POST /api/cli/tokens`) seisiún dashboard nó ábhar CLI áitiúil i ngach modh logála isteach. Ní creidiúintí oibreora iad eochracha API de scóip ar bith ná tocáin rochtana `oma_`: faigheann siad `403` aon uair a éilítear ceann. Tá an seiceáil i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Is oibreora-amháin freisin athrú ar shocruithe logála isteach: glacann `POST /api/settings/require-login` (pasfhocal riaracháin a shocrú / `requireLogin` a scor/a chasadh) leis na creidiúintí sin amháin a luaithe a bhíonn pasfhocal ann. Fanann fuinneog bootstrap na chéad rite (gan pasfhocal fós) gan athrú, agus caithfidh seisiún dashboard `currentPassword` a sheoladh chun an pasfhocal a athsholáthar (`403` nuair a bhíonn sé ar iarraidh nó mícheart, agus iniúchtar mar `settings.update_failed` é). Coinníonn an CLI áitiúil agus ocáid a bhfuil logáil isteach díchumasaithe aici an bealach athshlánúcháin agus féadfaidh sí pasfhocal a shocrú gan é, toisc go bhfuil an bheirt acu faoi cheangal leis an óstach a bhfuil an data directory aige.

## Píblíne

```
Iarratas isteach → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Bain ceanntásca inmheánacha iontaofa (x-omniroute-auth-*, x-omniroute-route-class)
    2. Gin aitheantas iarratais, aicmigh an bealach trí classifyRoute()
    3. Má tá pathname == "/" → atreoraigh chuig /dashboard
    4. Má tá an córas ag folmhú (múchadh grástúil) agus /api/* → 503
    5. Más iarratas neamh-GET é ar /api/* → seiceáil an chosaint checkBodySize()
    6. Más OPTIONS é → réamheitilt CORS 204
    7. Má tá options.enforce == false → lig tríd le ceanntásca aicme bealaigh
    8. Seachas sin: POLICIES[routeClass].evaluate(ctx)
       - ceadaigh  → stampáil x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - diúltaigh → earráid JSON le correlation_id (leathanaigh deais → 302 /login)
```

Déantar ceanntásca inmheánacha iontaofa (a shainmhínítear in `src/server/authz/headers.ts`) a **bhaint ó iarratais isteach** roimh an aicmiú — ní féidir le cliaint `x-omniroute-auth-*` a réamhlíonadh chun aithris a dhéanamh ar shuibiacht.

### Conarthaí polasaí

Tá polasaí ag gach aicme bealaigh in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — tugann sé `allow({ kind: "anonymous", id: "anonymous" })` ar ais i gcónaí.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — baineann sé Bearer amach agus bailíochtaíonn sé é trí `validateApiKey()`. Ní théann sé ar aghaidh chuig rochtain anaithnid ach amháin nuair atá an bhratach ghné éifeachtach `REQUIRE_API_KEY` díchumasaithe. Réitítear an bhratach éifeachtach trí `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ionas go rialaíonn Bratacha Gné na Deaise agus athróga timpeallachta `/api/v1/*`, `/api/v1beta/*`, agus na hailiasanna ar bhealach comhsheasmhach; má theipeann ar an réiteoir, diúltaítear don rochtain. Ceadaíonn sé iarratais ó sheisiún deais ar bhealaí API cliaint (lena n-áirítear `/api/v1/models`, a úsáideann catalóg samhlacha na deaise).
- **`managementPolicy`** (`policies/management.ts`) — glacann sé le seisiún deais, iarratais inmheánacha sioncronaithe samhlacha (a mheaitseáiltear le `/api/providers/[name]/(sync-models|models)`), nó scipeálann sé go hiomlán má thugann `isAuthRequired()` false ar ais. Tugann sé 403 (`AUTH_001`) ar ais nuair atá comhartha Bearer i láthair ach neamhbhailí, agus 401 i ngach cás eile. Cuireann sé cisil chosanta na mbealaí (LOCAL_ONLY / ALWAYS_PROTECTED) i bhfeidhm freisin roimh aon bhrainse fíordheimhnithe — féach [Cisil Chosanta na mBealaí](../security/ROUTE_GUARD_TIERS.md). Is féidir rochtain a fháil ar chosáin LOCAL_ONLY in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (faoi láthair: `/api/mcp/`) ó sheoladh nach seoladh lúb-ais é nuair atá an scóip `manage` ag an eochair Bearer; fanann gach cosán LOCAL_ONLY eile teoranta go docht do sheoltaí lúb-ais, beag beann ar an scóip.

Tugann polasaí rathúil `AuthSubject` ar ais le `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Is féidir le láimhseálaithe iartheachtacha é a léamh trí `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` seachas an loighic fíordheimhnithe a rith arís.

## Liosta Bealaí Poiblí

Is é `src/shared/constants/publicApiRoutes.ts` an liosta ceada sainráite:

Roinntear an liosta de réir **crutha**, agus tá an deighilt ríthábhachtach (GHSA-74g9-q8f6-793h): déantar réimír a
mheaitseáil le `startsWith()`, mar sin meaitseálann sí gach cosán cóngarach a bhfuil na carachtair thosaigh chéanna aige freisin.
Nuair a úsáideadh `/api/usage/om-usage` mar réimír, marcáladh `/api/usage/om-usage<anything>` mar PUBLIC, agus réitíonn Next
é sin go `/api/usage/[connectionId]` — láimhseálaí nach bhfuil fíordheimhniú dá chuid féin aige.

```ts
// Fíorfhochrainn. NÍ MÓR do gach iontráil críochnú le "/" (deimhnithe le tástáil aonaid).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // caitear leis mar CLIENT_API in classify, ní mar "poiblí gan fíordheimhniú"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Bealaí aonair, meaitseáilte GO BEACHT (le slais deiridh nó gan í).
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

// Bealaí aonair inléite amháin a fhaigheann maolú tionscnaimh CORS freisin.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Bealach aonair inléite amháin GAN an maolú CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Ní bhíonn bealaí inléite amháin poiblí **ach amháin** i gcás modhanna sábháilte. Tabhair faoi deara: eisiann `classifyRoute()` `/api/v1/*` agus `/api/v1beta/*` ón gcúlrogha PUBLIC — is `CLIENT_API` iad sin i gcónaí, ionas go mbeidh feidhm fós ag beartas na heochrach Bearer.

## Bealach Nua a Chur Leis

### Patrún 1 — Críochphointe poiblí API cliaint (fíordheimhniú Bearer)

Aicmítear bealaí faoi `/api/v1/` agus `/api/v1beta/` mar `CLIENT_API` go huathoibríoch. Forfheidhmíonn an lárearraí an tseiceáil Bearer; ní gá do láimhseálaithe bealaigh í a dhéanamh arís, ach is féidir leo an t-ábhar a léamh más úsáideach é.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... loighic an láimhseálaí
}
```

### Patrún 2 — Críochphointe bainistíochta (seisiún nó Bearer + manage)

Úsáid `requireManagementAuth()` ó `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... loighic an láimhseálaí
}
```

Filleann `requireManagementAuth()` `null` ar éirigh leis, nó `Response` earráide JSON:

- 401 `AUTH_001` "Authentication required" — níl aon dintiúir ann ar chor ar bith
- 403 — Bearer neamhbhailí **nó** Bearer i láthair ach níl an raon feidhme `manage` / `admin` ag an eochair

Filleann `hasManageScope(scopes)` true i gcás `"manage"` nó `"admin"`.

### Patrún 3 — Cur leis an liosta ceada poiblí

Roghnaigh an tacar de réir crutha, ní de réir áisiúlachta. Cuirtear bealach aonair in `PUBLIC_API_ROUTES_EXACT` (nó in `PUBLIC_READONLY_CORS_API_ROUTES` más bealach GET-amháin é); ní chuirtear ach fíorfhochraobh in `PUBLIC_API_ROUTE_PREFIXES`, agus **ní mór di críochnú le `/`**. Má chuirtear bealach aonair sa liosta réimíreanna, foilsítear gach cosán cóngarach a bhfuil na carachtair thosaigh chéanna aige freisin — lena n-áirítear siblíní deighleoige dinimiciúla a chuirfear leis níos déanaí (GHSA-74g9-q8f6-793h). Nuashonraigh na tástálacha aonaid ag `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` agus `tests/unit/authz/classify.test.ts`.

## Scóip

Trí spásainm. Ní léann gach seiceálaí ach a shreanga féin. Tá an taobh le taobh,
lena n-áirítear cén fáth a dteipeann ar `manage` `scopeMatches` do `read:compression` agus cén fáth nach féidir le comhartha rochtana `read` `PATCH /api/keys/{id}`, le fáil anseo:
[Trí spásainm scóip](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Bíonn eochracha API ag iompar eagar `scopes` (stóráilte mar JSON i `api_keys.scopes`, féach `src/lib/db/apiKeys.ts`).

### Scóip bhainistíochta

- `manage` / `admin` — `hasManageScope`. Rochtain iompróra ar bhealaí API bainistíochta.
- `mcp:connect`, `self:usage`, `self:account-quota`, agus
  `policy:bypass-provider-quota` is scóip bhreise, chomhfhreagracha iad. Tá siad
  lasmuigh de `MANAGEMENT_API_KEY_SCOPES`. Ní osclaíonn `mcp:connect` ach an
  gearradh amach neamh-lúbchúlaithe `/api/mcp/`.

### Scóip uirlisí MCP

Catalóg agus rialacha meaitseála (sreangán comhionann, nó scóip deonaithe ag críochnú le `*`):
[Scóip uirlisí MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
Is é `MCP_SCOPE_LIST` i `src/shared/constants/mcpScopes.ts` an fochuid chlóscríofa bhunaidh,
ní an chatalóg iomlán sin. Ritheann forfheidhmiú i
`open-sse/mcp-server/scopeEnforcement.ts` tar éis do `resolveCallerScopeContext()`
scóip a réiteach ó fhaisnéis fíordheimhnithe MCP, meiteashonraí iarratais, nó `OMNIROUTE_MCP_SCOPES`.
Fanann sé múchta mura bhfuil `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Scóip chomhartha rochtana

`read` / `write` / `admin` ar chomharthaí `oma_live_…`, rangaithe de réir `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Ní bhaineann an rang seo ach leis an dintiúr
comhartha rochtana. Féach [Fíordheimhniú Bainistíochta](../guides/MANAGEMENT-AUTH.md).

## Aistriú Fíordheimhnithe Riachtanach

Socraíonn `isAuthRequired()` i `src/shared/utils/apiAuth.ts` an ndéanfar **aon** fhíordheimhniú a fhorfheidhmiú d'iarratas:

- `settings.requireLogin === false` → díchumasaítear fíordheimhniú go domhanda, ach amháin an leibhéal cosanta buan (féach [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) agus na glaonna a thugann creidiúint a nglacann sé léi, a éilíonn an creidiúint chéanna mar a éilítear nuair a bhíonn logáil isteach cumasaithe: tocáin sioncrónaithe a eisiúint, tocáin rochtana CLI a mhint ar scóip ar bith, agus eochair API le scóip `manage`/`admin` a chruthú, an scóip sin a thabhairt d'eochair, nó eochair den sórt sin a athghiniúint nó a nochtadh (`requireCredentialForManagementScopedKey()` i `src/lib/api/requireManagementAuth.ts`). Fanann eochracha inference-amháin oscailte.
- Gan pasfhocal cumraithe **agus** gan athraitheach comhshaoil `INITIAL_PASSWORD` → mód bootstrap: ceadaíonn sé an draoi onboarding agus iarratais loopback, ach éilíonn iarratais líonra nochtaithe creidiúintí fós.
- Aon earráid DB → teipeann sé ar dhúnadh (secure-by-default).

Úsáideann forfheidhmiú eochair API an chliaint `isRequireApiKeyEnabled()` i `src/shared/utils/featureFlags.ts`, ní léamh dhíreach ar `process.env.REQUIRE_API_KEY`. Tá sé seo tábhachtach d'ionstraimí a imscaoileadh: nuair a athraítear `REQUIRE_API_KEY` i Dashboard → Feature Flags, stórálann sé forshárú DB agus dar ndóigh bíonn tionchar aige ar `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, agus ar sheiceálacha fíordheimhnithe eile client-API a roinneann an cúntóir seo. Mura féidir stór na mbratach gné a léamh, teipeann ar fhíordheimhniú client API ar dhúnadh agus éilíonn sé eochair.

## Athrú Bristeach — v3.8.0

Teastaíonn fíordheimhniú bainistíochta **anois** ó na críochphointí `/api/v1/agents/tasks/*` agus `/api/resilience/model-cooldowns` (tiomantas `588a0333`). Faigheann cliaint a sheol eochair API ghnáth gan an scóip `manage` roimhe seo freagra `403`. Aistriú: tabhair an scóip `manage` don eochair i ndeais na nEochracha API, nó úsáid seisiún deaise ina bhfuil tú logáilte isteach.

## Athrú Iompraíochta — v3.8.2

Tá `/api/mcp/*` (an cianfhreastalaí MCP) fós LOCAL_ONLY de réir réamhshocraithe, ach glacann sé anois le hiarratais neamh-loopback nuair a bhíonn an scóip `manage` sa cheanntásc `Authorization: Bearer <api-key>`. Geataítear an díolúine go sainráite de réir conair trí `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts`; ní féidir dul timpeall ar an réimír ghaolmhar LOCAL_ONLY `/api/cli-tools/runtime/*` d’aon ghnó toisc gur féidir léi fophróisis threallacha a thosú. Leanann iarratais anaithnide chuig `/api/mcp/*` ó fhoinsí neamh-loopback de `403 LOCAL_ONLY` a thabhairt ar ais — is é dian-loopback an réamhshocrú i gcónaí d’aon chonair nua LOCAL_ONLY. Féach [Sraitheanna Garda Bealaigh](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tástáil

- Tástálacha aonaid: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Liosta ceada poiblí: `tests/unit/public-api-routes.test.ts`.
- Rith dírithe: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Dífhabhtú

Marcálann an phíblíne freagraí i gcónaí leis na ceanntásca seo:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

I gcás iarrataí fíordheimhnithe, áirítear na ceanntásca iarratais réamhtheachtacha (ar thaobh an láimhseálaí) seo freisin:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Úsáid `assertAuth(req, expectedClass)` laistigh de láimhseálaithe — caitheann sé `AuthzAssertionError` leis an gcód `AUTHZ_NOT_INITIALIZED` má seachnaíodh an meánearra (rud atá úsáideach chun cúlchéimnithe cumraíochta a bhrath i dtástálacha).

## Féach Freisin

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcóir fíordheimhnithe in aghaidh an cheannphointe
- [COMPLIANCE.md](../security/COMPLIANCE.md) — logáil iniúchta d'imeachtaí fíordheimhnithe
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trí spásainm scóip agus catalóg scóip uirlise MCP
- Foinse: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
