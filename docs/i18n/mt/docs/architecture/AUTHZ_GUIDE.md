# Authorization Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sors ta' verità:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Aġġornat l-aħħar:** 2026-09-22 — in-namespaces tal-iskop jindikaw MCP-SERVER.md

OmniRoute għandu pipeline ta' awtorizzazzjoni konxju mir-rotta li jikkontrolla kull talba tal-API. Il-klassifikazzjoni hija **deterministika** u **fail-closed** — kull ħaġa li ma tistax tiġi kklassifikata tispiċċa bħala `MANAGEMENT` u teħtieġ sessjoni jew token ta' grad ta' ġestjoni. Din il-paġna tispjega l-mudell għall-inġiniera li jżommu rotot jew jiddisinjaw endpoints ġodda.

![Pipeline ta' AuthZ (3 klassijiet ta' rotta + evalwazzjoni tal-politika)](../diagrams/exported/authz-pipeline.svg)

> Sors: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Żewġ Modi ta' Awtentikazzjoni

### 1. Ċavetta API (Bearer)

Jintuża għall-APIs tal-klijenti kompatibbli ma' OpenAI/Anthropic/Gemini u għal xi rotot ta' ġestjoni meta ċ-ċavetta jkollha l-ambitu `manage`.

```
Authorization: Bearer <api-key>
```

Ivvalidat minn `isValidApiKey()` / `extractApiKey()` f’`src/sse/services/auth.ts` u esportat mill-ġdid permezz ta’ `src/shared/utils/apiAuth.ts`. Il-validatur jaċċetta wkoll il-varjabbli tal-ambjent `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` bħala ċwievet persistenti ta' passthrough (kwistjoni #1350).

### 2. Sessjoni tad-Dashboard (cookie auth_token)

Għall-paġni tad-dashboard u l-operazzjonijiet amministrattivi.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie titqies bħala sessjoni biss meta l-JWT jiġi vverifikat **u** jkollu `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kull
konsumatur tal-cookie (il-kontroll tar-rotta tad-dashboard (`isDashboardSessionAuthenticated()`), l-aġġornament tal-pipeline tal-awtorizzazzjoni, il-handshake tal-WebSocket, is-server
live, `/api/settings/require-login`, `/api/auth/status`) jgħaddi minn dak il-helper.
Jeżistu JWTs oħra ffirmati b’`JWT_SECRET` — il-passthrough tas-CLI ta' Cursor joħloq
tokens `iss "omniroute" / aud "cursor-cli"` għad-detenturi taċ-ċwievet — u dawn qatt ma jitqiesu bħala sessjonijiet
(#13298).

Ivverifikat minn `isDashboardSessionAuthenticated()` f’`src/shared/utils/apiAuth.ts`. Il-pipeline jaġġorna awtomatikament il-JWT meta jkun fadallu inqas minn 7 ijiem mill-ħajja tiegħu ta' 30 jum.

Sessjoni tista' tintemm ukoll qabel ma jgħaddu t-30 jum tagħha, minħabba li kull komponent li joħroġha jgħaddi minn `mintDashboardSessionToken` (ħin tal-ħruġ `iat` u ID `jti`) u l-verifikatur jiċċekkja żewġ settings: `sessionsValidAfter`, li jiġi ssettjat meta tinbidel password sabiex kull sessjoni maħruġa qablu ma tibqax tiġi vverifikata (il-browser li biddel il-password jirċievi cookie ġdida), u `revokedDashboardSessions`, li miegħu `POST /api/auth/logout` iżid il-`jti` tas-sessjoni li tkun għamlet sign-out. Sessjonijiet maħruġa minn rilaxx eqdem ma jkollhom l-ebda waħda minn dawn id-dikjarazzjonijiet u jibqgħu validi sal-ewwel bidla tal-password. Jekk is-settings ma jkunux jistgħu jinqraw, is-sessjoni ma titqiesx affidabbli.

Xi rotot ta' ġestjoni jaċċettaw **kwalunkwe wieħed** miż-żewġ modi: cookie JEW `Bearer <key>` meta ċ-ċavetta API jkollha l-ambitu `manage` (jew `admin`). Dan huwa dak li jippermetti l-fluss tax-xogħol "konfigurabbli permezz ta' sejħiet API" miżjud f’v3.8.

#### Kontroll fakultattiv tal-login OIDC (#6973)

Il-login tal-amministratur tad-dashboard jappoġġja wkoll fluss OIDC (OpenID Connect) **fakultattiv**
flimkien mal-login standard permezz ta' password — il-login permezz ta' password qatt ma jitneħħa, iżda
jiġi biss issupplimentat:

- Diżattivat sakemm `settings.oidcEnabled === true` **u** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ma jkunux kollha kkonfigurati (Settings → Awtentikazzjoni).
  Inkella, `GET /api/auth/oidc/login` jirritorna `400`.
- `GET /api/auth/oidc/login` jiskopri l-`authorization_endpoint` mill-
  `/.well-known/openid-configuration` tal-emittent (jinqaleb għal
  `<issuer>/authorize` jekk dan ifalli), jibni l-URI tar-ridirezzjoni mit-talba
  li tkun dieħla (b'kunsiderazzjoni għal `x-forwarded-proto`), u jirridirezzjona lejn l-IdP bi `state`
  każwali maħżun f'cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` jivvalida `state`, jiskambja l-kodiċi tal-awtorizzazzjoni,
  u jivverifika l-firma tat-token tal-ID permezz tal-JWKS tal-emittent
  (`createRemoteJWKSet` ta' `jose`, maħżun fil-cache għal kull URI tal-JWKS) b'verifiki ta'
  `issuer`/`audience`. L-aċċess għad-dashboard jeħtieġ lista `oidcAllowedSubjects`
  mhux vojta, politika `oidcAdmissionClaim`, jew it-tnejn. Il-lista tas-suġġetti tqabbel `sub` jew
  `email` biss meta `email_verified === true`. Il-politika fakultattiva tal-claim tieħu
  mogħdija ta' claim tat-token tal-ID separata b'tikek (pereżempju, `realm_access.roles`) u
  array ta' valuri aċċettati; il-claim riżolta trid tkun array ta' strings
  li jkun fiha mill-inqas valur aċċettat wieħed. Jekk iż-żewġ politiki jkunu kkonfigurati,
  it-tnejn iridu jgħaddu. Claims neqsin jew ifformattjati ħażin jiġu miċħuda b'mod sikur, u mingħajr
  ebda waħda mill-politiki l-callback jirrifjuta l-login (`not_configured`). Konfigurazzjonijiet
  eżistenti bbażati biss fuq is-suġġett jibqgħu jaħdmu mingħajr tibdil.
- Keycloak normalment jimmappja r-rwoli tar-realm fit-tokens tal-aċċess, mhux neċessarjament fit-tokens
  tal-ID. Biex tirrikjedi r-rwol tar-realm `admin`, ikkonfigura protocol mapper għal
  dan il-client li jinkludi `realm_access.roles` fit-**token tal-ID** tiegħu, imbagħad issettja
  `oidcAdmissionClaim` għal `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Iċċekkja l-claim reali tat-token tal-ID għal dan il-client qabel tattiva aċċess ibbażat biss
  fuq ir-rwol; l-applikazzjoni ma taqrax ir-rwoli tat-token tal-aċċess. Ir-rifjut tat-token
  min-naħa tal-IdP jista' jissupplimenta din il-verifika min-naħa tal-applikazzjoni iżda ma jissostitwihiex.
- Meta jirnexxi, joħloq **eżattament l-istess** JWT `auth_token` ta' 30 jum li joħroġ il-login
  bil-password (`src/app/api/auth/login/route.ts`), għalhekk il-bqija tal-
  fluss tas-sessjoni tad-dashboard (aġġornament awtomatiku, flags tal-cookie) jibqa' l-istess —
  OIDC jissostitwixxi biss il-mod kif tinħoloq il-cookie, mhux dak li tagħti aċċess għalih. Tibdil
  fir-rwoli/gruppi tal-IdP ma jinvalidax sessjonijiet eżistenti ta' OmniRoute; il-logout,
  it-tibdil tal-password, jew l-iskadenza tas-sessjoni jibqgħu jiddeterminaw it-tul ta' ħajjithom.
- Kull setting `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) jinsab f'`SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  iwieġeb b'`400 PASSWORD_REQUIRED` sakemm il-body ma jkunx fih il-password tal-ġestjoni
  bħala `currentPassword` (`401 PASSWORD_MISMATCH` meta tkun ħażina).
  `oidcDisablePasswordLogin` jirrifjuta l-_login_ bil-password (`POST /api/auth/login`)
  iżda jżomm il-hash tal-password maħżun, u l-awtentikazzjoni mill-ġdid xorta tivverifika
  `currentPassword` miegħu.
- `corsOrigins` u `bruteForceProtection` jinsabu wkoll f'`SECURITY_IMPACTING_SETTINGS_KEYS`:
  jekk xi wieħed minnhom isir inqas restrittiv, id-difiżi tal-login jiddgħajfu, għalhekk jeħtieġu l-istess
  awtentikazzjoni mill-ġdid b'`currentPassword` (it-tab tas-Sigurtà titolbu) u l-importazzjoni tal-JSON
  tneħħihom.
- Kull ċavetta tal-politika tas-sigurtà — l-entrati ta' `SECURITY_IMPACTING_SETTINGS_KEYS`,
  kull ċavetta `oidc*` u l-istat tas-sessjoni tad-dashboard — hija **għall-operatur biss** fuq
  `PATCH /api/settings`: API key bl-ambitu `manage` jew access token `oma_`
  jiġi rrifjutat b'`403` anke meta jibgħat il-`currentPassword` korrett, u r-
  rifjut jiġi rreġistrat fl-awditjar bħala `settings.update_failed` b'`reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` f'`src/lib/api/operatorCredential.ts`).
  Settings ordinarji (tema, preferenzi tal-wiri) jibqgħu jistgħu jinkitbu minn ċavetta `manage`
  jew access token `admin`. Kull modifika ta' `/api/settings` innifsu (u ta'
  `/api/settings/require-login`) teħtieġ ukoll l-ambitu `admin` tal-access token
  (`ADMIN_MUTATION_EXACT_PATHS` f'`src/server/authz/accessScopes.ts`, tqabbil eżatt tal-path);
  `GET` jibqa' `read`, u s-subroutes l-oħra ta' `/api/settings/*` (proxies,
  defaults tal-combo, aliases tal-mudelli, kompressjoni, tindif…) iżommu l-ambitu
  `write` dedott mill-metodu.
- `POST /api/settings/import-json` jaqbeż dik l-awtentikazzjoni mill-ġdid, u għalhekk ineħħi kull ċavetta f'
  `IMPORT_STRIPPED_SETTINGS_KEYS` (l-istess fajl) qabel jikteb: il-password u
  `currentPassword`, kull entrata ta' `SECURITY_IMPACTING_SETTINGS_KEYS`, u l-
  istat tas-sessjoni tad-dashboard (`sessionsValidAfter`, `revokedDashboardSessions`).
  Għalhekk, l-importazzjoni ta' backup eqdem ma tistax terġa' tattiva sessjoni li tibdil
  fil-password jew sign-out kien diġà temm.

## Klassijiet tar-Rotot

`src/server/authz/types.ts` jiddefinixxi tliet klassijiet; kull rotta li ma tistax tiġi kklassifikata b'mod determinat tirrikorri għal `MANAGEMENT`.

| Klassi       | Deskrizzjoni                                                                                                                                                           | Awtentikazzjoni meħtieġa                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | Rotot tassew sikuri: login, logout, status, init, health, bootstrap tal-onboarding.                                                                                    | Xejn                                                                   |
| `CLIENT_API` | Endpoints għas-servizz tal-mudelli: `/api/v1/*`, `/api/v1beta/*`, flimkien mal-aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer key meta l-feature flag effettiv `REQUIRE_API_KEY` ikun attivat |
| `MANAGEMENT` | Paġni tad-dashboard, settings, providers, ċwievet, endpoints tal-amministrazzjoni u d-dijanjostika.                                                                    | Sessjoni tad-dashboard JEW Bearer bl-iskop `manage`                    |

Xi azzjonijiet ta' `MANAGEMENT` huma **tal-operatur biss**: ċavetta `manage` ma tibqax biżżejjed. L-esportazzjoni ta' credentials maħżuna (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), ir-restawr ta' backup fuq id-dejta ħajja (`POST /api/db-backups/import` inkluż `dryRun=true`, `POST /api/db-backups` restore permezz tal-id, `POST /api/settings/import-json`), u l-qerda ta' punti ta' restawr (`DELETE /api/db-backups` cleanup, u `PATCH /api/db-backups` għax ir-retention li jippersisti hija dik li tmexxi l-pruning awtomatiku wara kull backup) jeħtieġu sessjoni tad-dashboard, is-suġġett tas-CLI lokali, jew login diżattivat. Il-ħruġ ta' sync token (`POST /api/sync/tokens`) u l-minting ta' token ta' aċċess CLI `admin` (`POST /api/cli/tokens`) jeħtieġu sessjoni tad-dashboard jew is-suġġett tas-CLI lokali f'kull modalità ta' login. Iċ-ċwievet tal-API ta' kull skop u t-tokens ta' aċċess `oma_` mhumiex credentials tal-operatur: jirċievu `403` kull meta jkun meħtieġ wieħed. Il-verifika tinsab f'`src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Il-bidla tas-settings tal-login hija wkoll tal-operatur biss: `POST /api/settings/require-login` (issettja l-password tal-ġestjoni / ittoggle `requireLogin`) jaċċetta biss dawk il-credentials ladarba jkun hemm password. It-tieqa tal-bootstrap tal-ewwel tmexxija (għadha m'hemmx password) ma tinbidilx, u sessjoni tad-dashboard trid tibgħat `currentPassword` biex tissostitwixxi l-password (`403` meta tkun nieqsa jew ħażina, u tiġi awditjata bħala `settings.update_failed`). Is-CLI lokali u istanza b'login diżattivat iżommu r-rotta tar-rkupru u jistgħu jissettjaw password mingħajrha, għax it-tnejn huma marbuta mal-host li jippossjedi d-data directory.

## Pipeline

```
Talba deħlin → src/proxy.ts
  → runAuthzPipeline() f’src/server/authz/pipeline.ts
    1. Neħħi l-headers interni fdati (x-omniroute-auth-*, x-omniroute-route-class)
    2. Iġġenera l-id tat-talba, ikklassifika r-rotta permezz ta’ classifyRoute()
    3. Jekk pathname == "/" → idderieġi mill-ġdid lejn /dashboard
    4. Jekk qed isir draining (għeluq gradwali) u /api/* → 503
    5. Jekk mhux GET /api/* → gwardja checkBodySize()
    6. Jekk OPTIONS → preflight CORS 204
    7. Jekk options.enforce == false → għaddi direttament bil-headers tal-klassi tar-rotta
    8. Inkella: POLICIES[routeClass].evaluate(ctx)
       - allow  → żid x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → żball JSON b’correlation_id (paġni tad-dashboard → 302 /login)
```

Il-headers interni fdati (iddefiniti f’`src/server/authz/headers.ts`) **jitneħħew mit-talbiet deħlin** qabel il-klassifikazzjoni — il-klijenti ma jistgħux jimlew minn qabel `x-omniroute-auth-*` biex jimpersonaw suġġett.

### Kuntratti tal-politiki

Kull klassi ta’ rotta għandha politika f’`src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — dejjem tirritorna `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — testratta l-Bearer u tivvalidah permezz ta’ `validateApiKey()`. Tgħaddi għal aċċess anonimu biss meta l-feature flag effettiv `REQUIRE_API_KEY` ikun diżattivat. Il-flag effettiv jiġi riżolt permezz ta’ `isRequireApiKeyEnabled()` (`override tal-feature flag fid-DB > process.env.REQUIRE_API_KEY > valur predefinit`) sabiex il-Feature Flags tad-Dashboard u l-varjabbli tal-ambjent jirregolaw `/api/v1/*`, `/api/v1beta/*`, u l-aliases b’mod konsistenti; fallimenti tar-resolver iwasslu għal rifjut awtomatiku. Tippermetti talbiet b’sessjoni tad-dashboard fuq rotot tal-API tal-klijent (inkluża `/api/v1/models`, użata mill-katalgu tal-mudelli tad-dashboard).
- **`managementPolicy`** (`policies/management.ts`) — taċċetta sessjoni tad-dashboard, talbiet interni għas-sinkronizzazzjoni tal-mudelli (imqabbla ma’ `/api/providers/[name]/(sync-models|models)`), jew taqbeż il-verifika kompletament jekk `isAuthRequired()` tirritorna false. Tirritorna 403 (`AUTH_001`) meta jkun preżenti token Bearer iżda jkun invalidu, u 401 f’każijiet oħra. Tinforza wkoll il-livelli tal-gwardja tar-rotot (LOCAL_ONLY / ALWAYS_PROTECTED) qabel kwalunkwe fergħa tal-awtentikazzjoni — ara [Livelli tal-Gwardja tar-Rotot](../security/ROUTE_GUARD_TIERS.md). Il-paths LOCAL_ONLY f’`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (illum: `/api/mcp/`) jistgħu jiġu aċċessati minn indirizzi li mhumiex loopback meta ċ-ċavetta Bearer ikollha l-ambitu `manage`; il-paths LOCAL_ONLY l-oħra kollha jibqgħu limitati strettament għal loopback irrispettivament mill-ambitu.

Politika li tirnexxi tirritorna `AuthSubject` b’`kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Il-handlers downstream jistgħu jaqrawh permezz ta’ `assertAuth(request, "CLIENT_API")` f’`src/server/authz/assertAuth.ts` minflok jerġgħu jeżegwixxu l-loġika tal-awtentikazzjoni.

## Lista ta’ Rotot Pubbliċi

`src/shared/constants/publicApiRoutes.ts` hija l-lista espliċita ta’ permessi:

Il-lista hija maqsuma skont il-**forma**, u din il-qasma hija essenzjali (GHSA-74g9-q8f6-793h): prefiss jitqabbel permezz ta’ `startsWith()`, għalhekk jaqbel ukoll ma’ kull mogħdija biswitu li jkollha l-istess karattri inizjali.
Meta `/api/usage/om-usage` intuża bħala prefiss, dan immarka `/api/usage/om-usage<anything>` bħala PUBBLIKU, u Next jirriżolvi dan għal `/api/usage/[connectionId]` — handler mingħajr awtentikazzjoni tiegħu stess.

```ts
// Sottosiġar ġenwini. Kull entrata TRID tispiċċa b’"/" (ivverifikat minn test tal-unità).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // ittrattat bħala CLIENT_API fi classify, mhux bħala "pubbliku mingħajr awtentikazzjoni"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rotot individwali, imqabbla B'MOD EŻATT (bi jew mingħajr slash finali).
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

// Rotot individwali li jinqraw biss u li jieħdu wkoll ir-rilassament tal-oriġini CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rotta individwali li tinqara biss MINGĦAJR ir-rilassament CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Ir-rotot li jinqraw biss huma pubbliċi **biss** għal metodi sikuri. Nota: `classifyRoute()` jeskludi `/api/v1/*` u `/api/v1beta/*` mill-każ awtomatiku PUBLIC — dawn huma dejjem `CLIENT_API`, sabiex il-politika taċ-ċavetta Bearer tibqa’ tapplika.

## Kif Iżżid Rotta Ġdida

### Mudell 1 — Endpoint pubbliku tal-API tal-klijent (awtentikazzjoni Bearer)

Ir-rotot taħt `/api/v1/` u `/api/v1beta/` jiġu kklassifikati awtomatikament bħala `CLIENT_API`. Il-middleware jinforza l-verifika Bearer; il-handlers tar-rotta m’għandhomx għalfejn jerġgħu jagħmluha, iżda jistgħu jaqraw is-suġġett jekk ikun utli.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... il-loġika tal-handler
}
```

### Mudell 2 — Endpoint ta’ ġestjoni (sessjoni jew Bearer + manage)

Uża `requireManagementAuth()` minn `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... il-loġika tal-handler
}
```

`requireManagementAuth()` tirritorna `null` meta tirnexxi jew `Response` ta’ żball JSON:

- 401 `AUTH_001` "Awtentikazzjoni meħtieġa" — ebda kredenzjali
- 403 — Bearer invalidu **jew** Bearer preżenti iżda ċ-ċavetta m’għandhiex l-ambitu `manage` / `admin`

`hasManageScope(scopes)` tirritorna true għal `"manage"` jew `"admin"`.

### Mudell 3 — Żieda mal-lista pubblika ta’ permessi

Agħżel is-sett skont il-forma, mhux skont il-konvenjenza. Rotta waħda tidħol f’`PUBLIC_API_ROUTES_EXACT` (jew f’`PUBLIC_READONLY_CORS_API_ROUTES` jekk hija GET-only); sottosiġra ġenwina biss tidħol f’`PUBLIC_API_ROUTE_PREFIXES`, u **trid tispiċċa b’`/`**. Jekk tpoġġi rotta individwali fil-lista tal-prefissi, tkun qiegħed tippubblika wkoll kull mogħdija biswitu li taqsam magħha l-karattri inizjali — inklużi rotot aħwa b’segmenti dinamiċi li jiżdiedu aktar tard (GHSA-74g9-q8f6-793h). Aġġorna t-testijiet tal-unità f’`tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` u `tests/unit/authz/classify.test.ts`.

## Scopes

Tliet namespaces. Kull checker jaqra biss is-strings tiegħu stess. Il-paragun, inkluż għaliex `manage` ifalli `scopeMatches` għal `read:compression` u għaliex access token ta' `read` ma jistax `PATCH /api/keys/{id}`, jinsab f'[Tliet namespaces ta' scope](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API keys iġorru array ta' `scopes` (maħżun bħala JSON f'`api_keys.scopes`, ara `src/lib/db/apiKeys.ts`).

### Scope tal-ġestjoni

- `manage` / `admin` — `hasManageScope`. Aċċess bearer għar-rotot tal-API tal-ġestjoni.
- `mcp:connect`, `self:usage`, `self:account-quota`, u `policy:bypass-provider-quota` huma scopes addittivi ta' tqabbil eżatt. Dawn jinsabu barra `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` jiftaħ biss il-`/api/mcp/` carve-out mhux loopback.

### Scopes tal-għodda MCP

Katalogu u regoli ta' tqabbil (string identika, jew scope mogħti li jispiċċa b'`*`): [Scopes tal-għodda MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes). `MCP_SCOPE_LIST` f'`src/shared/constants/mcpScopes.ts` huwa s-subsett oriġinali tat-tip, mhux dak il-katalogu sħiħ. L-infurzar jaħdem f'`open-sse/mcp-server/scopeEnforcement.ts` wara li `resolveCallerScopeContext()` jsolvi l-scopes mill-informazzjoni tal-awtentikazzjoni tal-MCP, il-metadata tat-talba, jew `OMNIROUTE_MCP_SCOPES`. Jibqa' mitfi sakemm `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Scopes tal-access-token

`read` / `write` / `admin` fuq tokens `oma_live_…`, ikklassifikati minn `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`). Din il-klassifikazzjoni tapplika għall-kredenzjali tal-access token biss. Ara [Awtentikazzjoni tal-Ġestjoni](../guides/MANAGEMENT-AUTH.md).

## Toggle tal-Awtentikazzjoni Meħtieġa

`isAuthRequired()` f'`src/shared/utils/apiAuth.ts` hija dik li tiddeċiedi jekk awtentikazzjoni **kwalunkwe** tiġix infurzata għal talba:

- `settings.requireLogin === false` → l-awtentikazzjoni hija diżattivata globalment, ħlief għall-livell dejjem protett (ara [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) u s-sejħiet li jagħtu credential li hija taċċetta, li jeħtieġu l-istess credential bħal meta l-login ikun attivat: il-ħruġ ta' sync tokens, il-minting ta' tokens ta' aċċess CLI fi kwalunkwe skop, u l-ħolqien ta' ċavetta API bl-iskop `manage`/`admin`, l-għoti ta' dak l-iskop lil ċavetta, jew l-iġġenerar mill-ġdid jew l-uri ta' ċavetta bħal din (`requireCredentialForManagementScopedKey()` f'`src/lib/api/requireManagementAuth.ts`). Iċ-ċwievet inference biss jibqgħu miftuħa.
- Ebda password ma hi kkonfigurata **u** ebda varjabbli tal-ambjent `INITIAL_PASSWORD` → modalità bootstrap: tippermetti l-onboarding wizard u t-talbiet loopback, iżda t-talbiet tan-network esposti xorta jeħtieġu credentials.
- Kull DB error → jifalli fil-mod sikur (secure-by-default).

L-infurzar tač-ċavetta tal-API tal-klijent juża `isRequireApiKeyEnabled()` f'`src/shared/utils/featureFlags.ts`, mhux qari dirett ta' `process.env.REQUIRE_API_KEY`. Dan huwa importanti għal istanzi mqiegħda f'produzzjoni: it-tibdil ta' `REQUIRE_API_KEY` fid-Dashboard → Feature Flags jaħżen DB override u immedjatament jaffettwa `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, u l-kontrolli l-oħra tal-awtentikazzjoni tal-client-API li jaqsmu dan l-helper. Jekk il-feature flag store ma jkunx jista' jinqara, l-awtentikazzjoni tal-client API tifalli fil-mod sikur u titlob ċavetta.

## Bidla li Tkisser il-Kompatibbiltà — v3.8.0

L-endpoints `/api/v1/agents/tasks/*` u `/api/resilience/model-cooldowns` **issa jeħtieġu awtentikazzjoni tal-ġestjoni** (commit `588a0333`). Klijenti li qabel kienu jibagħtu ċavetta tal-API normali mingħajr l-ambitu `manage` jirċievu `403`. Migrazzjoni: jew assenja l-ambitu `manage` liċ-ċavetta fid-dashboard API Keys, jew uża sessjoni tad-dashboard illoggjata.

## Bidla fl-Imġiba — v3.8.2

`/api/mcp/*` (is-server remot tal-MCP) għadu LOCAL_ONLY b’mod awtomatiku, iżda issa jaċċetta talbiet mhux loopback meta l-header `Authorization: Bearer <api-key>` ikun fih l-ambitu `manage`. L-eċċezzjoni hija kkontrollata espliċitament għal kull path permezz ta’ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` f’`src/server/authz/routeGuard.ts`; il-prefiss LOCAL_ONLY relatat `/api/cli-tools/runtime/*` intenzjonalment ma jistax jiġi bypassed għax jista’ jniedi subproċessi arbitrarji. Talbiet anonimi lejn `/api/mcp/*` minn konnessjonijiet mhux loopback jibqgħu jirritornaw `403 LOCAL_ONLY` — l-imġiba awtomatika għal kull path LOCAL_ONLY ġdid tibqa’ strict-loopback. Ara [Livelli tal-Gwardja tar-Rotot](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Ittestjar

- Testijiet tal-unità: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista ta’ permessi pubbliċi: `tests/unit/public-api-routes.test.ts`.
- Ħaddem test speċifiku: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Dijanjostika

Il-pipeline dejjem iżid dawn l-intestaturi mat-tweġibiet:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Għal talbiet awtentikati, l-intestaturi tat-talba upstream (min-naħa tal-handler) jinkludu wkoll:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Uża `assertAuth(req, expectedClass)` ġewwa l-handlers — din tarmi `AuthzAssertionError` bil-kodiċi `AUTHZ_NOT_INITIALIZED` jekk il-middleware jkun ġie evitat (utli biex jinqabdu regressjonijiet fil-konfigurazzjoni waqt it-testijiet).

## Ara wkoll

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — markatur tal-awtentikazzjoni għal kull endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — reġistru tal-awditjar għall-avvenimenti tal-awtentikazzjoni
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tliet spazji tal-ismijiet tal-ambitu u katalgu tal-ambitu tal-għodda tal-MCP
- Sors: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
