# Authorization Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Isi iyi nke eziokwu:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Emelitere ikpeazụ:** 2026-09-22 — oghere aha oghere na-atụ aka na MCP-SERVER.md

OmniRoute nwere usoro ikike nwere ike ịmata ụzọ nke na-echebe arịrịọ API ọ bụla. Nchịkọta bụ **nke doro anya** na **nke na-ada ada** — ihe ọ bụla a na-apụghị ịhazi na-ejedebe dị ka `MANAGEMENT` ma na-achọ nnọkọ ma ọ bụ akara ngosi ọkwa njikwa. Ibe a na-akọwa ụdị maka ndị injinia na-elekọta ụzọ ma ọ bụ na-emepụta ebe njedebe ọhụrụ.

![AuthZ pipeline (3 ụdị ụzọ + nyocha amụma)](../diagrams/exported/authz-pipeline.svg)

> Isi iyi: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Ụdị Nyocha Njirimara Abụọ

### 1. Igodo API (Bearer)

A na-eji ya maka API ndị ahịa dakọtara na OpenAI/Anthropic/Gemini yana ụzọ njikwa ole na ole mgbe igodo ahụ nwere ikike `manage`.

```
Authorization: Bearer <api-key>
```

A na-enyocha ya site na `isValidApiKey()` / `extractApiKey()` dị na `src/sse/services/auth.ts`, ma na-ebupụkwa ya ọzọ site na `src/shared/utils/apiAuth.ts`. Onye nyocha ahụ na-anabatakwa env vars `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` dịka igodo passthrough na-adịgide adịgide (issue #1350).

### 2. Oge Njikọ Dashboard (kuki auth_token)

Maka ibe dashboard na ọrụ nchịkwa admin.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kuki bụ oge njikọ naanị mgbe JWT gafere nyocha **ma** nwee `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Onye ọ bụla
na-eji kuki ahụ (onye nche ụzọ dashboard (`isDashboardSessionAuthenticated()`), imegharị pipeline authz, njikọ mbido WebSocket, sava dị ndụ,
`/api/settings/require-login`, `/api/auth/status`) na-agafe n'enyemaka ahụ.
JWT ndị ọzọ e ji `JWT_SECRET` bịanye aka dị — passthrough Cursor CLI na-emepụta
token `iss "omniroute" / aud "cursor-cli"` maka ndị nwere igodo — ma ha anaghị abụ oge njikọ
(#13298).

A na-enyocha ya site na `isDashboardSessionAuthenticated()` dị na `src/shared/utils/apiAuth.ts`. Pipeline ahụ na-emegharị JWT na-akpaghị aka mgbe ụbọchị fọdụrụ erughị 7 n'ime oge ndụ ya nke ụbọchị 30.

Oge njikọ nwekwara ike ịkwụsị tupu ụbọchị 30 ya agwụ, n'ihi na onye ọ bụla na-emepụta ya na-agafe na `mintDashboardSessionToken` (oge e nyere ya `iat` na NJ `jti`), onye nyocha ahụ na-enyochakwa ntọala abụọ: `sessionsValidAfter`, nke mgbanwe okwuntughe na-ahazi ka oge njikọ niile e nyere tupu ya kwụsị ịgafe nyocha (ihe nchọgharị ahụ gbanwere okwuntughe na-enweta kuki ọhụrụ), na `revokedDashboardSessions`, ebe `POST /api/auth/logout` na-agbakwụnye `jti` nke oge njikọ e si na ya pụọ. Oge njikọ ụdị mwepụta ochie mepụtara enweghị nke ọ bụla n'ime claim ndị a, ha na-adịkwa ire ruo mgbe a gbanwere okwuntughe nke mbụ. Ọ bụrụ na enweghị ike ịgụ ntọala ndị ahụ, a naghị atụkwasị oge njikọ ahụ obi.

Ụfọdụ ụzọ njikwa na-anabata **nke ọ bụla** n'ime ụdị abụọ ahụ: kuki MA Ọ BỤ `Bearer <key>` mgbe igodo API nwere ikike `manage` (ma ọ bụ `admin`). Nke a bụ ihe na-eme ka usoro ọrụ “enwere ike ịhazi site na oku API” agbakwunyere na v3.8 kwe omume.

#### Ọnụ ụzọ nbanye OIDC nhọrọ (#6973)

Nbanye admin dashboard na-akwadokwa usoro OIDC (OpenID Connect) nke **a na-ahọrọ isonye na ya**
tinyere nbanye okwuntughe ndabara — anaghị ewepụ nbanye okwuntughe ma ọlị, naanị
na-agbakwụnye ihe na ya:

- A na-eme ka ọ ghara ịrụ ọrụ belụsọ ma `settings.oidcEnabled === true` **ma**
  ahazikwara `oidcIssuer` / `oidcClientId` / `oidcClientSecret` niile (Ntọala → Nnyocha njirimara).
  Ma ọ bụghị ya, `GET /api/auth/oidc/login` na-eweghachi `400`.
- `GET /api/auth/oidc/login` na-achọpụta `authorization_endpoint` site na
  `/.well-known/openid-configuration` nke issuer (ma ọ bụrụ na nke ahụ adịghị, ọ na-eji
  `<issuer>/authorize`), na-ewulite URI ntụgharị site na arịrịọ batara
  (na-eburu `x-forwarded-proto` n'uche), ma na-atụgharị gaa na IdP na `state`
  a họọrọ n'enweghị usoro, nke echekwara na kuki `oidc_state` nke `httpOnly`.
- `GET /api/auth/oidc/callback` na-enyocha `state`, na-agbanwe koodu ikike,
  ma na-enyocha mbinye aka token ID site na JWKS nke issuer
  (`createRemoteJWKSet` nke `jose`, nke a na-echekwa maka URI JWKS ọ bụla) yana
  nyocha `issuer`/`audience`. Nnabata na dashboard chọrọ ndepụta
  `oidcAllowedSubjects` na-adịghị efu, amụma `oidcAdmissionClaim`, ma ọ bụ ha abụọ.
  Ndepụta subject ahụ na-adaba na `sub` ma ọ bụ `email` naanị mgbe
  `email_verified === true`. Amụma claim nhọrọ ahụ na-anabata ụzọ claim token ID
  nke ntụpọ kewara (dịka ọmụmaatụ, `realm_access.roles`) na n'usoro nke ụkpụrụ
  anabatara; claim a chọpụtara ga-abụrịrị n'usoro nke eriri ederede nke nwere
  opekata mpe otu ụkpụrụ anabatara. Ọ bụrụ na ahaziri amụma abụọ ahụ, ha abụọ
  ga-agafe. Claim ndị na-efu ma ọ bụ ndị ahazighị nke ọma na-eme ka a jụ nnabata,
  ma callback ahụ na-ajụ nbanye (`not_configured`) ma ọ bụrụ na amụma abụọ ahụ
  adịghị. Nhazi ndị dịbu nke na-eji naanị subject na-aga n'ihu n'enweghị mgbanwe.
- Keycloak na-etinyekarị ọrụ realm n'ime token nnweta, ọ bụghị mgbe niile n'ime
  token ID. Iji mee ka ọrụ realm `admin` bụrụ ihe achọrọ, hazie protocol mapper
  maka client a nke na-etinye `realm_access.roles` n'ime **token ID** ya, wee tọọ
  `oidcAdmissionClaim` ka ọ bụrụ `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Lelee claim token ID n'ezie maka client a tupu ịgbanye nnabata dabere naanị na
  ọrụ; ngwa ahụ anaghị agụ ọrụ dị na token nnweta. Ọjụjụ token sitere n'akụkụ IdP
  nwere ike ịgbakwunye na nyocha a, mana ọ naghị anọchi anya nyocha a nke dị
  n'akụkụ ngwa ahụ.
- Mgbe ọ gara nke ọma, ọ na-emepụta **kpọmkwem otu** JWT `auth_token` nke ụbọchị
  30 nke nbanye okwuntughe na-ewepụta (`src/app/api/auth/login/route.ts`), ya mere
  usoro ndị ọzọ nke session dashboard (imegharị akpaka, ọkọlọtọ kuki) anaghị
  agbanwe — OIDC na-anọchi naanị ụzọ e si emepụta kuki ahụ, ọ bụghị ikike ọ
  na-enye. Mgbanwe e mere na ọrụ/òtù IdP anaghị eme ka session OmniRoute ndị
  dịbu ghara ịdị irè; ọpụpụ, mgbanwe okwuntughe, ma ọ bụ ngwụcha oge session
  ka na-achịkwa ogologo oge ha na-adị ndụ.
- Ntọala `oidc*` ọ bụla (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) dị na `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  na-aza `400 PASSWORD_REQUIRED` belụsọ ma body ahụ bu okwuntughe njikwa dị ka
  `currentPassword` (`401 PASSWORD_MISMATCH` mgbe ọ na-ezighi ezi).
  `oidcDisablePasswordLogin` na-ajụ _nbanye_ okwuntughe (`POST /api/auth/login`)
  mana ọ na-edowe hash okwuntughe ahụ echekwara, nyocha njirimara ọzọ ka na-eji
  ya enyocha `currentPassword`.
- `corsOrigins` na `bruteForceProtection` dịkwa na `SECURITY_IMPACTING_SETTINGS_KEYS`:
  ime ka nke ọ bụla n'ime ha dị mfe na-eme ka nchekwa nbanye daa mbà, ya mere
  ha chọrọ otu nyocha njirimara ọzọ site na `currentPassword` (taabụ Nchedo
  na-arịọ ya), mbubata JSON anaghịkwa etinye ha.
- Igodo amụma nchedo ọ bụla — ndenye `SECURITY_IMPACTING_SETTINGS_KEYS`,
  igodo `oidc*` ọ bụla na ọnọdụ session dashboard — bụ **naanị maka onye
  na-ahụ maka sistemụ** na `PATCH /api/settings`: a na-ajụ igodo API nwere scope
  `manage` ma ọ bụ token nnweta `oma_` na `403` ọbụna mgbe o zitere
  `currentPassword` ziri ezi, a na-edekọkwa ọjụjụ ahụ na audit dị ka
  `settings.update_failed` yana `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` dị na `src/lib/api/operatorCredential.ts`).
  Igodo `manage` ma ọ bụ token nnweta `admin` ka nwere ike idegharị ntọala nkịtị
  (isiokwu anya, mmasị ngosipụta). Mgbanwe ọ bụla na `/api/settings` n'onwe ya
  (na nke `/api/settings/require-login`) chọkwara scope token nnweta `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` dị na `src/server/authz/accessScopes.ts`, ndakọrịta
  kpọmkwem nke ụzọ); `GET` ka bụ `read`, ebe sub-route `/api/settings/*` ndị ọzọ
  (proxy, ndabara combo, alias model, mkpakọ, nhichapụ…) na-edowe scope `write`
  nke a na-achọpụta site na method.
- `POST /api/settings/import-json` na-amafe nyocha njirimara ọzọ ahụ, ya mere ọ
  na-ewepụ igodo ọ bụla dị na `IMPORT_STRIPPED_SETTINGS_KEYS` (otu faịlụ ahụ)
  tupu ide ihe: okwuntughe na `currentPassword`, ndenye `SECURITY_IMPACTING_SETTINGS_KEYS`
  niile, na ọnọdụ session dashboard (`sessionsValidAfter`, `revokedDashboardSessions`).
  N'ihi ya, ibubata backup ochie enweghị ike ime ka session nke mgbanwe okwuntughe
  ma ọ bụ ọpụpụ kwụsịrị malitekwa ịdị irè.

## Ụdị Route

`src/server/authz/types.ts` kọwapụtara klas atọ; route ọ bụla a na-enweghị ike ịkpebi ya nke ọma na-adabata na `MANAGEMENT`.

| Klas         | Nkọwa                                                                                                                                                          | Ntinye a chọrọ                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | Route nchekwa doro anya: ịbanye, ịpụ, ọnọdụ, init, health, onboarding bootstrap.                                                                               | Enweghị                                                          |
| `CLIENT_API` | Ọnụ ụzọ na-ejere ozi ihe ngosi: `/api/v1/*`, `/api/v1beta/*`, yana aha ndị ọzọ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer key mgbe feature flag `REQUIRE_API_KEY` dị irè na-arụ ọrụ |
| `MANAGEMENT` | Peeji dashboard, ntọala, ndị na-enye ọrụ, igodo, ọnụ ụzọ admin na nyocha.                                                                                      | Dashboard session MA ọ bụ Bearer nwere ókè `manage`              |

Omume `MANAGEMENT` ụfọdụ bụ **naanị maka operator**: igodo `manage` adịghị ezu. Ibupu credentials echekwara (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), iweghachi backup n'elu data dị ndụ (`POST /api/db-backups/import` gụnyere `dryRun=true`, `POST /api/db-backups` restore site na id, `POST /api/settings/import-json`), na ibibi ebe iweghachi (`DELETE /api/db-backups` cleanup, na `PATCH /api/db-backups` n'ihi na retention ọ na-echekwa bụ ihe na-eme pruning akpaaka mgbe backup ọ bụla gasịrị) chọrọ dashboard session, onye CLI nke ime ụlọ, ma ọ bụ login akwụsịla. Inye sync token (`POST /api/sync/tokens`) na imepụta `admin` CLI access token (`POST /api/cli/tokens`) chọrọ dashboard session ma ọ bụ onye CLI nke ime ụlọ n'ọnọdụ ịbanye ọ bụla. Igodo API nke ókè ọ bụla na `oma_` access tokens abụghị credentials nke operator: ha na-anata `403` mgbe ọ bụla a chọrọ ya. Nyocha a dị na `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Mgbanwe ntọala ịbanye bụkwa naanị maka operator: `POST /api/settings/require-login` (tọọ paswọọdụ njikwa / gbanwee `requireLogin`) na-anabata credentials ndị a naanị mgbe paswọọdụ dịrị. Oge bootstrap nke mbụ (paswọọdụ adịghị ugbu a) anọghị n'agbanwe, dashboard session ga-ezipụkwa `currentPassword` iji dochie paswọọdụ (`403` mgbe ọ dịghị ma ọ bụ ọ dị njọ, a na-edekọ ya dị ka `settings.update_failed`). CLI nke ime ụlọ na instance nke login akwụsịrị na-ejigide ụzọ nweghachi ma nwee ike itọ paswọọdụ na-enweghị ya, n'ihi na ha abụọ jikọtara na host nwere data directory.

## Usoro Nhazi

```
Arịrịọ na-abata → src/proxy.ts
  → runAuthzPipeline() n'ime src/server/authz/pipeline.ts
    1. Wepụ headers ime ndị a tụkwasịrị obi (x-omniroute-auth-*, x-omniroute-route-class)
    2. Mepụta id arịrịọ, jiri classifyRoute() kewaa ụzọ
    3. Ọ bụrụ na pathname == "/" → bugharịa gaa /dashboard
    4. Ọ bụrụ na a na-eme draining (mgbanyụ dị nro) ma bụrụ /api/* → 503
    5. Ọ bụrụ na ọ bụghị GET ma bụrụ /api/* → ihe nche checkBodySize()
    6. Ọ bụrụ na ọ bụ OPTIONS → CORS preflight 204
    7. Ọ bụrụ na options.enforce == false → hapụ ya ka ọ gafee na headers klas-ụzọ
    8. Ma ọ bụghị ya: POLICIES[routeClass].evaluate(ctx)
       - kwe → tinye x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - jụ → njehie JSON nwere correlation_id (peeji dashboard → 302 /login)
```

A na-**ewepụ headers ime ndị a tụkwasịrị obi n'arịrịọ na-abata** (akọwapụtara na `src/server/authz/headers.ts`) tupu nkewa — ndị ahịa enweghị ike ibu ụzọ tinye `x-omniroute-auth-*` iji mee ka à ga-asị na ha bụ subject ọzọ.

### Nkwekọrịta policy

Klas ụzọ ọ bụla nwere policy na `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — na-eweghachi `allow({ kind: "anonymous", id: "anonymous" })` mgbe niile.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — na-ewepụta Bearer, wee jiri `validateApiKey()` nyochaa ya. Ọ na-adaba na anonymous naanị mgbe agbanyụrụ ọkọlọtọ atụmatụ `REQUIRE_API_KEY` dị irè. A na-ekpebi ọkọlọtọ dị irè site na `isRequireApiKeyEnabled()` (`mgbanwe ọkọlọtọ atụmatụ DB > process.env.REQUIRE_API_KEY > uru ndabara`) ka Dashboard Feature Flags na environment variables nwee ike ịchịkwa `/api/v1/*`, `/api/v1beta/*`, na aha nnọchi n'otu ụzọ; ọdịda resolver na-eme ka usoro ahụ jụ arịrịọ. Ọ na-ekwe arịrịọ oge nnọkọ dashboard n'ụzọ client API (gụnyere `/api/v1/models`, nke katalọgụ model dashboard na-eji).
- **`managementPolicy`** (`policies/management.ts`) — na-anabata oge nnọkọ dashboard, arịrịọ model-sync ime (nke e jiri `/api/providers/[name]/(sync-models|models)` tụnyere), ma ọ bụ na-awụfe kpamkpam ma ọ bụrụ na `isAuthRequired()` weghachiri false. Ọ na-eweghachi 403 (`AUTH_001`) mgbe token Bearer dị mana ọ bụghị nke ziri ezi, ma ọ bụghị ya ọ na-eweghachi 401. Ọ na-amanyekwa ọkwa route-guard (LOCAL_ONLY / ALWAYS_PROTECTED) tupu ngalaba nkwenye njirimara ọ bụla — lee [Ọkwa Route Guard](../security/ROUTE_GUARD_TIERS.md). Enwere ike ịnweta ụzọ LOCAL_ONLY dị na `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ugbu a: `/api/mcp/`) site na ebe na-abụghị loopback mgbe igodo Bearer nwere scope `manage`; ụzọ LOCAL_ONLY ndị ọzọ niile ga-anọgide na-achọ loopback kpọmkwem n'agbanyeghị scope.

Policy gara nke ọma na-eweghachi `AuthSubject` nwere `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Ndị handler nọ n'okpuru nwere ike iji `assertAuth(request, "CLIENT_API")` dị na `src/server/authz/assertAuth.ts` gụọ ya kama ịmegharị logic nkwenye njirimara ọzọ.

## Ndepụta Ụzọ Ọha

`src/shared/constants/publicApiRoutes.ts` bụ ndepụta nnabata akọwapụtara kpọmkwem:

E kewara ndepụta ahụ dịka **ọdịdị** ya si dị, nkewa ahụ dịkwa oke mkpa (GHSA-74g9-q8f6-793h): a na-eji `startsWith()` atụnyere prefix, ya mere ọ na-adabakwa n’ụzọ niile dị ya n’akụkụ nke nwere mkpụrụedemede mmalite ndị ahụ. Iji `/api/usage/om-usage` dịka prefix mere ka `/api/usage/om-usage<anything>` bụrụ nke ỌHA, Next wee tụgharịa nke ahụ gaa na `/api/usage/[connectionId]` — handler na-enweghị nyocha njirimara nke ya.

```ts
// Ezi subtrees. Ntinye ọ bụla GA-EJEDebe na "/" (unit test na-enyocha nke a).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // a na-ewere ya dịka CLIENT_API na classify, ọ bụghị dịka ọha “na-enweghị auth”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Ụzọ ndị kwụụrụ onwe ha, a na-atụnyere ha KPỌMKWEM (ma ha nwere slash ikpeazụ ma ọ bụ na ha enweghị).
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

// Ụzọ ndị kwụụrụ onwe ha nke bụ naanị maka ịgụ ma na-enwetakwa mbelata mmachi origin nke CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Otu ụzọ kwụụrụ onwe ya nke bụ naanị maka ịgụ NA-ENWEGHỊ mbelata mmachi CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Ụzọ ndị bụ naanị maka ịgụ bụ nke ọha **naanị** maka method ndị dị nchebe. Rịba ama: `classifyRoute()` na-ewepụ `/api/v1/*` na `/api/v1beta/*` na PUBLIC fall-through — ndị ahụ na-abụ `CLIENT_API` mgbe niile ka iwu Bearer-key ka na-emetụta ha.

## Ịgbakwunye Ụzọ Ọhụrụ

### Ụkpụrụ 1 — Endpoint API client nke ọha (Bearer-auth)

A na-ekewa ụzọ ndị dị n’okpuru `/api/v1/` na `/api/v1beta/` dịka `CLIENT_API` na-akpaghị aka. Middleware na-amanye nyocha Bearer; route handlers adịghị mkpa imegharị ya, mana ha nwere ike ịgụ subject ma ọ bụrụ na ọ bara uru.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... loojik handler
}
```

### Ụkpụrụ 2 — Endpoint njikwa (session ma ọ bụ Bearer + manage)

Jiri `requireManagementAuth()` sitere na `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... loojik handler
}
```

`requireManagementAuth()` na-eweghachi `null` mgbe ọ gara nke ọma, ma ọ bụ `Response` njehie JSON:

- 401 `AUTH_001` "Achọrọ nkwenye njirimara" — enweghị credentials ọ bụla
- 403 — Bearer adịghị irè **ma ọ bụ** Bearer dị, mana key enweghị scope `manage` / `admin`

`hasManageScope(scopes)` na-eweghachi true maka `"manage"` ma ọ bụ `"admin"`.

### Ụkpụrụ 3 — Ịgbakwunye na ndepụta nnabata ọha

Họrọ set dịka ọdịdị si dị, ọ bụghị dịka mfe si dị. Otu ụzọ ga-abanye na `PUBLIC_API_ROUTES_EXACT` (ma ọ bụ `PUBLIC_READONLY_CORS_API_ROUTES` ma ọ bụrụ na ọ bụ naanị GET); naanị ezigbo subtree ga-abanye na `PUBLIC_API_ROUTE_PREFIXES`, ọ **ga-ejedebekwa na `/`**. Itinye otu ụzọ na ndepụta prefix na-emekwa ka ụzọ niile dị ya n’akụkụ nke nwere mkpụrụedemede mmalite ndị ahụ bụrụ nke ọha — gụnyere dynamic-segment siblings ndị a ga-agbakwunye n’ọdịnihu (GHSA-74g9-q8f6-793h). Melite unit tests dị na `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` na `tests/unit/authz/classify.test.ts`.

## Scopes

Oghere aha atọ. Nyocha ọ bụla na-agụ naanị eriri nke ya. N'akụkụ,
gụnyere ihe mere `manage` ji ada `scopeMatches` maka `read:compression` na ihe mere
akara ngosi nnweta `read` enweghị ike `PATCH /api/keys/{id}`, bụ
[Oghere aha atọ](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Igodo API na-ebu usoro `scopes` (echekwara dị ka JSON na `api_keys.scopes`, lee `src/lib/db/apiKeys.ts`).

### Oghere njikwa

- `manage` / `admin` — `hasManageScope`. Nnweta onye na-ebu ụzọ na ụzọ API njikwa.
- `mcp:connect`, `self:usage`, `self:account-quota`, na
  `policy:bypass-provider-quota` bụ oghere mgbakwunye kwekọrọ kpọmkwem. Ha nọ ọdụ
  na mpụga `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` na-emepe naanị
  `/api/mcp/` ihe osise na-abụghị loopback.

### Oghere ngwaọrụ MCP

Ndepụta na iwu dakọtara (eriri yiri ya, ma ọ bụ oghere enyere na-ejedebe na `*`):
[Oghere ngwaọrụ MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` na `src/shared/constants/mcpScopes.ts` bụ obere ụdị mbụ,
ọ bụghị ndepụta zuru ezu ahụ. Mmejuputa iwu na-agba ọsọ na
`open-sse/mcp-server/scopeEnforcement.ts` mgbe `resolveCallerScopeContext()`
doziri oghere site na ozi nkwenye MCP, metadata arịrịọ, ma ọ bụ `OMNIROUTE_MCP_SCOPES`.
Ọ na-anọgide na-agbanyụ ma ọ bụrụ na `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Oghere akara ngosi nnweta

`read` / `write` / `admin` na akara ngosi `oma_live_…`, nke `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) depụtara. Ọkwa a na-emetụta naanị
asambodo akara ngosi nnweta. Lee [Nkwenye Njikwa](../guides/MANAGEMENT-AUTH.md).

## Ihe Mgbanwe Chọrọ Ntinye

`isAuthRequired()` na `src/shared/utils/apiAuth.ts` bụ ihe na-ekpebi ma a ga-achịkwa **ntinye ọ bụla** maka ịrịọ:

- `settings.requireLogin === false` → ntinye akwụsịrị n'ozuzu ya, ma e wezụga ọkwa nchekwa mgbe niile (lee [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) na oku ndị na-enye credential ọ na-anabata, nke chọrọ otu credential ahụ dị ka mgbe ịbanye dị na-arụ ọrụ: inye sync tokens, imepụta CLI access tokens n'ókè ọ bụla, na ịmepụta igodo API nwere ókè `manage`/`admin`, ikenye ókè ahụ n'igodo, ma ọ bụ imegharị ma ọ bụ igosi igodo dị otu a (`requireCredentialForManagementScopedKey()` na `src/lib/api/requireManagementAuth.ts`). Igodo inference naanị na-anọ n'emeghe.
- Enweghị paswọọdụ edobere **na** enweghị env var `INITIAL_PASSWORD` → ọnọdụ bootstrap: na-ekwe onboarding wizard na ịrịọ loopback, mana ịrịọ netwọk e kpughere ka chọrọ credentials.
- Njehie DB ọ bụla → na-ada n'ihe mgbochi (secure-by-default).

Ntinye igodo API nke ahịa na-eji `isRequireApiKeyEnabled()` na `src/shared/utils/featureFlags.ts`, ọ bụghị ịgụ `process.env.REQUIRE_API_KEY` kpọm kpọm. Nke a dị mkpa maka instances e debere: ịgbanwe `REQUIRE_API_KEY` na Dashboard → Feature Flags na-echekwa DB override ma nwee mmetụta ozugbo na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, na nyocha ntinye client-API ndị ọzọ na-ekekọrịta onye enyemaka a. Ọ bụrụ na enweghị ike ịgụ feature flag store, ntinye client API na-ada n'ihe mgbochi ma chọrọ igodo.

## Mgbanwe Na-emebi Ndakọrịta — v3.8.0

Ebe njedebe `/api/v1/agents/tasks/*` na `/api/resilience/model-cooldowns` **chọrọ ugbu a nyocha njirimara njikwa** (commit `588a0333`). Ndị ahịa na-ezibu igodo API nkịtị na-enweghị oke ikike `manage` ga-enweta `403`. Mbugharị: nye igodo ahụ oke ikike `manage` na dashboard API Keys, ma ọ bụ jiri session dashboard nke abanyela.

## Mgbanwe Omume — v3.8.2

`/api/mcp/*` (sava MCP dịpụrụ adịpụ) ka bụ LOCAL_ONLY na ndabara mana ugbu a ọ na-anabata arịrịọ na-abụghị loopback mgbe header `Authorization: Bearer <api-key>` nwere oke ikike `manage`. A na-achịkwa mwepu a kpọmkwem n'ụzọ ọ bụla site na `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dị na `src/server/authz/routeGuard.ts`; a kpachaara anya mee ka prefix LOCAL_ONLY ibe ya `/api/cli-tools/runtime/*` ghara inwe ike ịgafe mmachi n'ihi na ọ nwere ike ịmalite subprocess ọ bụla. Arịrịọ na-enweghị njirimara e zigara `/api/mcp/*` site na ebe na-abụghị loopback ka ga-enwetakwa `403 LOCAL_ONLY` — ndabara maka ụzọ LOCAL_ONLY ọhụrụ ọ bụla ka bụ naanị-loopback siri ike. Lee [Ọkwa Nchekwa Ụzọ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Nnwale

- Nnwale unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Ndepụta ohere ọha: `tests/unit/public-api-routes.test.ts`.
- Gbaa nnwale lekwasịrị anya: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Nchọpụta nsogbu

Pipeline ahụ na-etinye ihe ndị a mgbe niile na nzaghachi:

```
x-request-id:               <NJ njikọ, a na-emegharị ya n'ime ahụ njehie>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Maka arịrịọ ndị enyochala njirimara ha, nkụnye isi arịrịọ upstream (n'akụkụ handler) na-agụnyekwa:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (nhọrọ)
x-omniroute-auth-scopes:    ndepụta e ji rikoma kewaa
```

Jiri `assertAuth(req, expectedClass)` n'ime handlers — ọ na-atụpụta `AuthzAssertionError` nwere koodu `AUTHZ_NOT_INITIALIZED` ma ọ bụrụ na agafere middleware ahụ (nke a bara uru maka ịchọpụta ndaghachi azụ na nhazi n'ime ule).

## Hụkwa

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — akara nkwenye maka njedebe ọ bụla
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ndekọ nyocha maka ihe omume nkwenye
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — oghere aha atọ na katalọgụ ngwaọrụ MCP
- Isi mmalite: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
