# Authorization Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Isi iyi nke eziokwu:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Emelitere ikpeazụ:** 2026-09-22 — oghere aha oghere na-atụ aka na MCP-SERVER.md

OmniRoute nwere usoro ikike nwere ike ịmata ụzọ nke na-echebe arịrịọ API ọ bụla. Nchịkọta bụ **nke doro anya** na **nke na-ada ada** — ihe ọ bụla a na-apụghị ịhazi na-ejedebe dị ka `MANAGEMENT` ma na-achọ nnọkọ ma ọ bụ akara ngosi ọkwa njikwa. Ibe a na-akọwa ụdị maka ndị injinia na-elekọta ụzọ ma ọ bụ na-emepụta ebe njedebe ọhụrụ.

![AuthZ pipeline (3 ụdị ụzọ + nyocha amụma)](../diagrams/exported/authz-pipeline.svg)

> Isi iyi: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Ụdị Nyocha Abụọ

### 1. Igodo API (Bearer)

A na-eji ya maka API ndị ahịa dakọtara na OpenAI/Anthropic/Gemini yana ụfọdụ ụzọ njikwa mgbe igodo ahụ nwere scope `manage`.

```
Authorization: Bearer <api-key>
```

`isValidApiKey()` / `extractApiKey()` dị na `src/sse/services/auth.ts` na-enyocha ya, a na-ebupụkwa ha ọzọ site na `src/shared/utils/apiAuth.ts`. Onye na-enyocha ya na-anabatakwa mgbanwe gburugburu `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` dị ka igodo passthrough na-adịgide adịgide (issue #1350).

### 2. Seshọn Dashboard (kuki auth_token)

Maka ibe dashboard na ọrụ nchịkwa.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kuki na-abụ seshọn naanị mgbe JWT ahụ nyochara nke ọma **ma** nwee `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Onye
ọ bụla na-eji kuki ahụ (onye na-echekwa ụzọ dashboard (`isDashboardSessionAuthenticated()`), pipeline authz refresh, njikọ aka WebSocket, sava na-arụ ọrụ ozugbo, `/api/settings/require-login`, `/api/auth/status`) na-agafe helper ahụ.
JWT ndị ọzọ ejiri `JWT_SECRET` bịanye aka dịkwa — Cursor CLI passthrough na-emepụta
tokens `iss "omniroute" / aud "cursor-cli"` maka ndị nwere igodo — ha adịghị abụkwa seshọn
(#13298).

`isDashboardSessionAuthenticated()` dị na `src/shared/utils/apiAuth.ts` na-enyocha ya. Pipeline ahụ na-emegharị JWT ahụ na-akpaghị aka mgbe ụbọchị fọdụrụ ya erughị 7 n’ime ndụ ya nke ụbọchị 30.

Seshọn nwekwara ike ịkwụsị tupu ụbọchị 30 ya agwụ, n’ihi na onye ọ bụla na-emepụta ya na-agafe `mintDashboardSessionToken` (oge mbipụta `iat` na id `jti`), onye na-enyochakwa ntọala abụọ: `sessionsValidAfter`, nke mgbanwe paswọọdụ na-edobe ka seshọn ọ bụla e nyere tupu ya gharazi ịgafe nyocha (browser nke gbanwere paswọọdụ na-enweta kuki ọhụrụ), na `revokedDashboardSessions`, nke `POST /api/auth/logout` na-etinye `jti` seshọn e ji pụọ. Seshọn ndị e mepụtara na mwepụta ochie enweghị claim abụọ a, ha na-adịkwa irè ruo mgbe mgbanwe paswọọdụ mbụ. Ọ bụrụ na enweghị ike ịgụ ntọala ndị ahụ, a naghị atụkwasị seshọn ahụ obi.

Ụfọdụ ụzọ njikwa na-anabata **ụdị abụọ ahụ**: kuki MA ọ bụ `Bearer <key>` mgbe igodo API nwere scope `manage` (ma ọ bụ `admin`). Nke a bụ ihe na-eme ka usoro “configurable via API calls” agbakwunyere na v3.8 nwee ike ịrụ ọrụ.

#### Ọnụ ụzọ nbanye OIDC nhọrọ (#6973)

Nbanye nchịkwa dashboard na-akwadokwa usoro OIDC (OpenID Connect) nke onye ọrụ họọrọ
tinyere nbanye paswọọdụ nke ndabara — a naghị ewepụ nbanye paswọọdụ, kama a na-agbakwunye naanị:

- A na-ewepụ ya ruo mgbe `settings.oidcEnabled === true` **na** hazie `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` niile (Ntọala → Nyocha). `GET /api/auth/oidc/login` na-eweghachi `400` ma ọ bụghị otú ahụ.
- `GET /api/auth/oidc/login` na-achọpụta `authorization_endpoint` site na `/.well-known/openid-configuration` nke issuer (ọ bụrụ na nke ahụ adịghị, ọ na-eji `<issuer>/authorize`), na-ewulite redirect URI site na arịrịọ na-abata (`x-forwarded-proto`-aware), ma na-eziga redirect na IdP site na `state` random echekwara n’ime kuki `oidc_state` nke bụ `httpOnly`.
- `GET /api/auth/oidc/callback` na-enyocha `state`, na-agbanwe koodu ikike, ma na-enyocha mbinye aka ID token site na JWKS nke issuer (`jose`'s `createRemoteJWKSet`, nke a na-echekwa kwa JWKS URI) yana nlele `issuer`/`audience`. Ịbanye na dashboard chọrọ ndepụta `oidcAllowedSubjects` na-enweghị oghere, iwu `oidcAdmissionClaim`, ma ọ bụ ha abụọ. Ndepụta subject na-adaba naanị na `sub` ma ọ bụ `email` mgbe `email_verified === true` gasịrị. Iwu claim nhọrọ na-ewere ụzọ claim ID-token nke kewara site na ntụpọ (dịka ọmụmaatụ, `realm_access.roles`) na nhazi ụkpụrụ ndị a nabatara; claim a chọtara ga-abụrịrị array nke strings nwere opekata mpe otu ụkpụrụ a nabatara. Ọ bụrụ na ahaziela iwu abụọ ahụ, ha abụọ ga-agafe. Claim ndị na-efu ma ọ bụ ndị e haziri n’ụzọ na-adịghị mma na-ada n’ụzọ nchekwa, ma ọ bụrụ na enweghị iwu ọ bụla, callback na-ajụ nbanye (`not_configured`). Nhazi ndị dịbu naanị maka subject na-aga n’ihu n’enweghị mgbanwe.
- Keycloak na-etinyekarị ọrụ realm n’ime access tokens, ọ bụghị mgbe niile n’ime ID tokens. Iji chọọ ọrụ realm `admin`, hazie protocol mapper maka client a nke na-etinye `realm_access.roles` n’ime **ID token** ya, ma debe `oidcAdmissionClaim` ka ọ bụrụ `{ "path": "realm_access.roles", "values": ["admin"] }`. Lelee claim ID-token n’ezie maka client a tupu ịgbalite nnabata dabere naanị n’ọrụ; ngwa ahụ anaghị agụ ọrụ access-token. Ịjụ token n’akụkụ IdP nwere ike ịgbakwunye nlele a, mana ọ naghị anọchi nlele ngwa a.
- Mgbe ọ gara nke ọma, ọ na-emepụta JWT `auth_token` nke ụbọchị 30 **kachasị otu** nke nbanye okwuntughe na-emepụta (`src/app/api/auth/login/route.ts`), ya mere pipeline nnọkọ dashboard ndị ọzọ (imegharị onwe ya, flags kuki) anaghị agbanwe — OIDC na-agbanwe naanị otu esi emepụta kuki ahụ, ọ bụghị ihe ọ na-enye ohere ime. Mgbanwe n’ọrụ/otu IdP anaghị emebi nnọkọ OmniRoute ndị dị adị; ịpụ, ịgbanwe okwuntughe, ma ọ bụ ngafe nnọkọ ka na-achịkwa ogologo ndụ ha.
- Ntọala `oidc*` niile (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) dị na `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  na-aza `400 PASSWORD_REQUIRED` belụsọ na ahụ ahụ nwere okwuntughe njikwa dị ka `currentPassword` (`401 PASSWORD_MISMATCH` mgbe ọ na-ezighi ezi). `oidcDisablePasswordLogin` na-ajụ nbanye okwuntughe (_login_ `POST /api/auth/login`) mana ọ na-edobe hash okwuntughe echekwara, re-auth ka na-enyochakwa `currentPassword` megide ya.
- `corsOrigins` na `bruteForceProtection` dịkwa na `SECURITY_IMPACTING_SETTINGS_KEYS`
  kwa: ime ka nke ọ bụla ghara isi ike na-eme ka nchebe nbanye daa, ya mere ha na-achọkwa re-auth `currentPassword` (taabụ Security na-arịọ ya), JSON import na-ewepụkwa ha.
- Igodo iwu nchebe ọ bụla — ntinye ndị dị na `SECURITY_IMPACTING_SETTINGS_KEYS`,
  igodo `oidc*` niile na ọnọdụ nnọkọ dashboard — bụ **naanị maka onye ọrụ** na `PATCH /api/settings`: igodo API nwere scope manage ma ọ bụ access token `oma_` ka a na-ajụ ya na `403` ọbụna mgbe o zitere `currentPassword` ziri ezi, a na-edekwa ajụjụ ahụ n’akwụkwọ ndekọ dị ka `settings.update_failed` nke nwere `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` na `src/lib/api/operatorCredential.ts`).
  Ntọala nkịtị (isiokwu, mmasị ngosi) ka igodo `manage` ma ọ bụ access token `admin` nwere ike idegharị. Mgbanwe ọ bụla nke `/api/settings` n’onwe ya (na nke `/api/settings/require-login`) chọkwara scope access-token `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` na `src/server/authz/accessScopes.ts`, nke na-adaba naanị na exact path); `GET` ka bụ `read`, sub-route ndị ọzọ nke `/api/settings/*` (proxies, combo defaults, model aliases, compression, purges…) na-ejigide scope `write` nke a na-enweta site na method.
- `POST /api/settings/import-json` na-awụpụ re-auth ahụ, ya mere ọ na-ewepụ igodo niile dị na `IMPORT_STRIPPED_SETTINGS_KEYS` (faịlụ ahụ), tupu o dee ha: okwuntughe na `currentPassword`, ntinye `SECURITY_IMPACTING_SETTINGS_KEYS` niile, na ọnọdụ nnọkọ dashboard (`sessionsValidAfter`, `revokedDashboardSessions`).
  Ya mere, ibubata nkwado ochie enweghị ike ịkpọlite nnọkọ nke mgbanwe okwuntughe ma ọ bụ ịpụla kwụsịrị.

#### Nbanye TOTP nwere ihe abụọ nke nhọrọ (#16619)

A na-edebanye ya site na Ntọala → Nchebe; ọ na-anọchi anya ya ruo mgbe onye ọrụ ga-agbanye ya
(`src/server/auth/dashboardMfa.ts`).

- **Ihe ọ na-ekpuchi:** nbanye site na okwuntughe (`POST /api/auth/login`, nke chọrọzi
  `POST /api/auth/mfa/verify`) na `omniroute connect` (`POST /api/cli/connect`,
  nke na-ajụ mgbanwe okwuntughe naanị ma were koodu ahụ dị ka `totp`).
- **Ihe ọ naghị ekpuchi:** nbanye OIDC / SSO (`/api/auth/oidc/callback`) adịghị
  arịọ OmniRoute TOTP. Ọ na-adabere n’ihe nke abụọ nke onye na-enye njirimara n’onwe ya,
  yabụ manye MFA na IdP ma ọ bụrụ na agbanyere OIDC.
- **Nweghachi** (ngwaọrụ furu efu, enweghị koodu mweghachi fọdụrụ, ma ọ bụ ihe nkwenye
  a na-apụghịzi ịchọpụta, dịka mgbe `STORAGE_ENCRYPTION_KEY` gbanwere):
  1. Malite sava ahụ ọzọ site na `OMNIROUTE_DISABLE_MFA=true`.
  2. N’ime host ahụ n’onwe ya (onye mmekọ loopback na `Host` loopback, dịka
     `http://localhost:20128`), jiri okwuntughe banye. A na-awụpụ ihe nke abụọ naanị maka
     mmalite ahụ; mmalite ọ bụla ọzọ ka chọrọ koodu ahụ.
  3. Na Ntọala → Nchekwa → Gbanyụọ, tinye okwuntughe ma hapụ koodu ahụ
     oghere. `POST /api/auth/mfa/disable` na-anabata ahụ na-enweghị `code` naanị mgbe
     edobere mgbanwe ahụ nakwa mgbe arịrịọ ahụ si na host bịa; ọ ka na-achọ nnọkọ dashboard
     na okwuntughe dị ugbu a, a na-edekwa ya n’akwụkwọ ndekọ dị ka
     `auth.mfa.disabled` na `secondFactor: "recovery_switch"`.
  4. Wepụ `OMNIROUTE_DISABLE_MFA`, malite ọzọ, ma debanye aha ọzọ ma ọ dị mkpa.

## Klas ụzọ

`src/server/authz/types.ts` na-akọwa klas atọ; Ụzọ ọ bụla a na-apụghị ikewa nkewa na-adaghachi azụ na `MANAGEMENT`.

| Klas         | Nkọwa                                                                                                                                                      | Achọrọ nkwenye                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `PUBLIC`     | Ụzọ adịghị mma nke ọma — nbanye, ọpụpụ, ọkwa, ahụike, nbanye akpụkpọ ụkwụ.                                                                                 | Ọ dịghị                                                                    |
| `CLIENT_API` | Ihe njedebe na-eje ozi — `/api/v1/*`, `/api/v1beta/*`, gbakwunyere utu aha `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Igodo ihe na-ebu mgbe agbanyere ọkọlọtọ njirimara `REQUIRE_API_KEY` dị irè |
| `MANAGEMENT` | Ibe dashboard, ntọala, ndị na-eweta, igodo, nchịkwa na njedebe nyocha.                                                                                     | Oge dashboard OR bearer nwere oke `manage`                                 |

Omume `MANAGEMENT` ole na ole bụ** onye ọrụ naanị** : igodo `manage` ezughi oke. Mbupụ nzere echekwara (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), iweghachi nkwado ndabere na mpaghara data dị ndụ (`POST /api/db-backups/import` gụnyere `dryRun=true`, `POST /api/db-backups` weghachi site na id, `POST /api/settings/import-json`), na-ebibi ihe nrụghachi (`DELETE /api/db-backups` cleanup, na `PATCH /api/db-backups` n'ihi na njide ọ na-adịgide na-akpali ịkwachaa akpaka mgbe nkwado ndabere ọ bụla) chọrọ nnọkọ dashboard, ma ọ bụ mpaghara CLI distribution. Ịwepụta akara mmekọrịta (`POST /api/sync/tokens`) na ịmepụta akara ohere CLI `admin` (`POST /api/cli/tokens`) chọrọ nnọkọ dashboard ma ọ bụ isiokwu CLI mpaghara na ụdị nbanye ọ bụla. igodo API nke ụdị ọ bụla yana akara ohere `oma_` abụghị nzere ndị ọrụ: ha na-enweta `403` mgbe ọ bụla achọrọ. Nyocha ahụ na-ebi na `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Ịgbanwe ntọala nbanye bụ naanị onye na-arụ ọrụ: `POST /api/settings/require-login` (tọọ paswọọdụ njikwa / toggle `requireLogin`) na-anabata naanị nzere ndị ahụ ozugbo paswọọdụ dị — windo bootstrap nke mbụ na-agba ọsọ (enweghị paswọọdụ ugbu a) agbanwebeghị — na nnọkọ dashboard ga-eziga `currentPassword` iji dochie paswọọdụ (`403` mgbe ọ na-efu ma ọ bụ na-ezighi ezi, nyochaa dị ka `settings.update_failed`). CLI mpaghara na ihe atụ nwere nkwarụ nbanye na-edobe ụzọ mgbake ma nwee ike ịtọ paswọọdụ na-enweghị ya, ebe ha abụọ jikọtara ya na onye ọbịa nwere ndekọ data.

## Pipeline

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

Ndị nkụnye eji isi mee ntụkwasị obi (akọwapụtara na `src/server/authz/headers.ts`) bụ** wepụrụ arịrịọ mbata** tupu nhazi — ndị ahịa enweghị ike ibu ụzọ buo `x-omniroute-auth-*` ka ha yie isiokwu.

### Nkwekọrịta iwu

Klas ụzọ ọ bụla nwere amụma na `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — na-alaghachi `allow({ kind: "anonymous", id: "anonymous" })` mgbe niile.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — wepụ ihe na-ebu, kwadoro site na `validateApiKey()`. Ọ ga-adaba na onye na-amaghị aha naanị mgbe enwere nkwarụ njirimara `REQUIRE_API_KEY` dị irè. A na-edozi ọkọlọtọ dị irè site na `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ya mere Dashboard Njirimara ọkọlọtọ na mgbanwe gburugburu ebe obibi na-achịkwa `/api/v1/*`, `/api/v1beta/*`, na aliases mgbe niile; Ọdịda nke solver ada emechie. Na-enye ohere arịrịọ dashboard na ụzọ API onye ahịa (gụnyere `/api/v1/models`, nke katalọgụ ụdị dashboard na-eji). Mgbe etinyere Entra ID SSO, ngalaba SSO na-elekọta onye na-ebu nke bụ ahaziri aha Entra token (ngalaba base64url atọ, `RS*` alg, `kid`).** mbụ** `validateApiKey()` na mkpebi ya bụ — ikpeazụ ọ dịghị mgbe ọ ga-adaba na ụzọ igodo API ma ọ bụ ngalaba na-eweda ya na-amaghị aha, yabụ nkwụsị onye na-enye njirimara enweghị ike ịghọ oghere mepere emepe. Igodo API kwụ ọtọ emetụtaghị ya. Lee [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — na-anabata nnọkọ dashboard, arịrịọ imekọrịta ihe n'ime ime (dakọtara na `/api/providers/[name]/(sync-models|models)`), ma ọ bụ na-amafe kpamkpam ma ọ bụrụ na `isAuthRequired()` lọghachite ụgha. Na-eweghachi 403 (`AUTH_001`) mgbe ihe nrịbama onye na-ebu dị ugbu a mana adịghị mma, 401 ma ọ bụghị. Na-amanyekwa usoro ndị nche ụzọ (LOCAL_ONLY / ALWAYS_PROTECTED) tupu alaka ụlọ ọrụ auth — hụ [Tiers Nchekwa okporo ụzọ](../security/ROUTE_GUARD_TIERS.md). ụzọ LOCAL_ONLY na `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ( taa: `/api/mcp/`) nwere ike ịnweta site na-abụghị loopback mgbe igodo bearer na-ebu oke `manage` ; Ụzọ LOCAL_ONLY ndị ọzọ na-anọgidesi ike-loopback n'agbanyeghị oke.

Amụma na-aga nke ọma na-eji `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` weghachi `AuthSubject`. Ndị na-ahụ maka mgbada nwere ike ịgụ ya site na `assertAuth(request, "CLIENT_API")` na `src/server/authz/assertAuth.ts` kama ịmegharị mgbagha nyocha.

## Ndepụta Ụzọ Ọha

`src/shared/constants/publicApiRoutes.ts` bụ ndepụta ikike doro anya:

E kewara ndepụta ahụ site na** udi** , na nkewa ahụ na-ebu ibu (GHSA-74g9-q8f6-793h): prefix dakọtara na `startsWith()`, ya mere ọ dakọtara na ụzọ ọ bụla dị n'akụkụ na-ekerịta ihe odide ya. `/api/usage/om-usage` dị ka prefix akara `/api/usage/om-usage<anything>` PUBLIC, na-esote kpebiri na `/api/usage/[connectionId]` — onye njikwa na-enweghị nyocha nke ya.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Ụzọ na-agụ naanị bụ ọha** naanị** maka ụzọ nchekwa. Mara: `classifyRoute()` na-ewepu `/api/v1/*` na `/api/v1beta/*` na PUBLIC ọdịda-site na — ndị ahụ na-abụkarị `CLIENT_API` yabụ amụma igodo bearer ka na-emetụta.

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

## Ntụgharị chọrọ nkwenye

`isAuthRequired()` na `src/shared/utils/apiAuth.ts` na-ekpebi ma** nke ọ bụla** na-amanye auth maka arịrịọ:

- `settings.requireLogin === false` → auth nwere nkwarụ zuru ụwa ọnụ, ma e wezụga maka ọkwa a na-echekwa mgbe niile (lee [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) na oku na-enye nzere ọ na-anabata, nke chọrọ otu nzere dị ka nbanye na: inye sync tokens, mining CLI access tokens na ọ bụla, na ịmepụta igodo API /`admin` nwere oke nke `manage`. imeghari ma ọ bụ ikpughe igodo dị otú ahụ (`requireCredentialForManagementScopedKey()` na `src/lib/api/requireManagementAuth.ts`). Naanị igodo ntinye aka na-emeghe. Ide ọkọlọtọ njirimara echedoro (`REQUIRE_API_KEY`, ọkọlọtọ nchekwa ndị ọzọ, yana ọkọlọtọ SSRF / TLS / MCP-scope / igbe igbe e depụtara na [Flags Feature](../reference/FEATURE_FLAGS.md#rest-api) ) yana ịchekwa ntọala nkpuchi PII (`PUT /api/settings/pii`) na-achọkwa nzere.
- Ọ nweghị okwuntughe ahaziri** na** no `INITIAL_PASSWORD` env var → bootstrap mode na-enye ohere ọkachamara n'ụgbọ mmiri na arịrịọ loopback, mana arịrịọ netwọk ekpughere ka chọrọ nzere. Ewezuga: ide ọkọlọtọ njirimara echedoro na ịchekwa ntọala nkpuchi PII (`PUT /api/settings/pii`) chọrọ nzere ọbụlagodi na loopback, yabụ loopback n'onwe ya ezughị ebe ahụ.
- Njehie DB ọ bụla → ada ada mechiri (echekwara-site na ndabara).

Ndị mmanye igodo API ndị ahịa na-eji `isRequireApiKeyEnabled()` na `src/shared/utils/featureFlags.ts`, ọ bụghị ịgụ `process.env.REQUIRE_API_KEY` kpọmkwem. Nke a dị mkpa maka oge ebugara: toggling `REQUIRE_API_KEY` na Dashboard → Njirimara ọkọlọtọ na-echekwa DB ngafe wee na-emetụta `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, na ndị ahịa-API auth nlele na-ekekọrịta onye enyemaka a. Ọ bụrụ na enweghị ike ịgụ ụlọ ahịa ọkọlọtọ njirimara, onye ahịa API auth agaghị emechi wee chọọ igodo.

## Mgbanwe Na-emebi Ndakọrịta — v3.8.0

Ebe njedebe `/api/v1/agents/tasks/*` na `/api/resilience/model-cooldowns` **chọrọ ugbu a nyocha njirimara njikwa** (commit `588a0333`). Ndị ahịa na-ezibu igodo API nkịtị na-enweghị oke ikike `manage` ga-enweta `403`. Mbugharị: nye igodo ahụ oke ikike `manage` na dashboard API Keys, ma ọ bụ jiri session dashboard nke abanyela.

## Mgbanwe Omume — v3.8.2

`/api/mcp/*` (sava MCP dịpụrụ adịpụ) ka bụ LOCAL_ONLY na ndabara mana ugbu a ọ na-anabata arịrịọ na-abụghị loopback mgbe header `Authorization: Bearer <api-key>` nwere oke ikike `manage`. A na-achịkwa mwepu a kpọmkwem n'ụzọ ọ bụla site na `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dị na `src/server/authz/routeGuard.ts`; a kpachaara anya mee ka prefix LOCAL_ONLY ibe ya `/api/cli-tools/runtime/*` ghara inwe ike ịgafe mmachi n'ihi na ọ nwere ike ịmalite subprocess ọ bụla. Arịrịọ na-enweghị njirimara e zigara `/api/mcp/*` site na ebe na-abụghị loopback ka ga-enwetakwa `403 LOCAL_ONLY` — ndabara maka ụzọ LOCAL_ONLY ọhụrụ ọ bụla ka bụ naanị-loopback siri ike. Lee [Ọkwa Nchekwa Ụzọ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Nnwale

- Nnwale unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Ndepụta ohere ọha: `tests/unit/public-api-routes.test.ts`.
- Gbaa nnwale lekwasịrị anya: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Ndozigharị

Pipeline na-eji stampụ nzaghachi mgbe niile:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Maka arịrịọ ekwenyesiri ike ndị isi arịrịọ nke elu (handler-side) gụnyekwara:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Jiri `assertAuth(req, expectedClass)` n'ime njikwa — ọ na-atụba `AuthzAssertionError` na koodu `AUTHZ_NOT_INITIALIZED` ma ọ bụrụ na agafere middleware (na-enyere aka ijide nhazi nhazi na ule).

## Hụkwa

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — akara nkwenye maka njedebe ọ bụla
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ndekọ nyocha maka ihe omume nkwenye
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — oghere aha atọ na katalọgụ ngwaọrụ MCP
- Isi mmalite: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
