# Authorization Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Pinagmulan ng katotohanan:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Huling na-update:** 2026-09-22 — ang mga namespace ng saklaw ay tumuturo sa MCP-SERVER.md

Ang OmniRoute ay may pipeline ng awtorisasyon na may kamalayan sa ruta na nagbabantay sa bawat kahilingan ng API. Ang klasipikasyon ay **deterministic** at **fail-closed** — anumang hindi maiklasipika ay nagtatapos bilang `MANAGEMENT` at nangangailangan ng session o token na pang-pamamahala. Ipinaliliwanag ng pahinang ito ang modelo para sa mga inhinyero na nagpapanatili ng mga ruta o nagdidisenyo ng mga bagong endpoint.

![AuthZ pipeline (3 klase ng ruta + pagsusuri ng patakaran)](../diagrams/exported/authz-pipeline.svg)

> Pinagmulan: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 2 Mode ng Auth

### 1. API Key (Bearer)

Ginagamit para sa mga client API na compatible sa OpenAI/Anthropic/Gemini at ilang management route kapag may `manage` scope ang key.

```
Authorization: Bearer <api-key>
```

Bine-validate ng `isValidApiKey()` / `extractApiKey()` sa `src/sse/services/auth.ts` at muling ini-export sa pamamagitan ng `src/shared/utils/apiAuth.ts`. Tinatanggap din ng validator ang mga env var na `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` bilang mga persistent passthrough key (issue #1350).

### 2. Session ng Dashboard (auth_token cookie)

Para sa mga page ng dashboard at mga admin operation.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Session lamang ang isang cookie kapag nagbe-verify ang JWT **at** taglay nito ang `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Lahat ng
consumer ng cookie (dashboard route guard (`isDashboardSessionAuthenticated()`), refresh ng authz
pipeline, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`) ay dumadaan sa helper na iyon.
May iba pang JWT na nilagdaan gamit ang `JWT_SECRET` — ang Cursor CLI passthrough ay gumagawa
ng mga token na may `iss "omniroute" / aud "cursor-cli"` para sa mga may key — at hindi kailanman mga session
(#13298).

Bine-verify ng `isDashboardSessionAuthenticated()` sa `src/shared/utils/apiAuth.ts`. Awtomatikong nire-refresh ng pipeline ang JWT kapag wala na itong 7 araw bago mag-expire sa loob ng 30-araw na lifetime nito.

Maaari ring magtapos ang isang session bago matapos ang 30 araw nito, dahil lahat ng minter ay dumadaan sa `mintDashboardSessionToken` (isang issue time na `iat` at isang id na `jti`) at sinusuri ng verifier ang dalawang setting: `sessionsValidAfter`, na itinatakda kapag nagpapalit ng password upang hindi na mag-verify ang bawat session na ginawa bago nito (nakakakuha ng bagong cookie ang browser na nagpalit ng password), at `revokedDashboardSessions`, kung saan idinaragdag ng `POST /api/auth/logout` ang `jti` ng na-sign-out na session. Ang mga session na ginawa ng mas lumang release ay walang alinman sa mga claim na ito at mananatiling valid hanggang sa unang pagpapalit ng password. Kung hindi mabasa ang mga setting, hindi pagkakatiwalaan ang session.

Tumatanggap ang ilang management route ng **alinman** sa dalawang mode: cookie O `Bearer <key>` kapag may `manage` (o `admin`) scope ang API key. Ito ang nagpapagana sa workflow na “configurable via API calls” na idinagdag sa v3.8.

#### Opsyonal na OIDC login gate (#6973)

Sinusuportahan din ng dashboard admin login ang isang **opt-in** na OIDC (OpenID Connect) flow
kasabay ng default na pag-login gamit ang password — hindi kailanman inaalis ang pag-login gamit ang password, dinaragdagan
lamang ito:

- Naka-disable maliban kung `settings.oidcEnabled === true` **at** naka-configure ang lahat ng `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` (Settings → Auth).
  Nagbabalik ang `GET /api/auth/oidc/login` ng `400` kung hindi.
- Tinutuklas ng `GET /api/auth/oidc/login` ang `authorization_endpoint` mula sa
  `/.well-known/openid-configuration` ng issuer (bumabagsak sa
  `<issuer>/authorize`), binubuo ang redirect URI mula sa papasok na request
  (may pagsasaalang-alang sa `x-forwarded-proto`), at nagre-redirect sa IdP gamit ang random na `state`
  na naka-store sa isang `httpOnly` na `oidc_state` cookie.
- Bine-validate ng `GET /api/auth/oidc/callback` ang `state`, ipinagpapalit ang authorization
  code, at bine-verify ang signature ng ID token sa pamamagitan ng JWKS ng issuer
  (`createRemoteJWKSet` ng `jose`, naka-cache bawat JWKS URI), kasama ang mga pagsusuri sa
  `issuer`/`audience`. Para makapasok sa dashboard, kinakailangan ang hindi walang-lamang
  `oidcAllowedSubjects` list, isang `oidcAdmissionClaim` policy, o pareho. Tinutugma ng subject list
  ang `sub` o `email` lamang kapag `email_verified === true`. Ang optional na claim policy ay
  tumatanggap ng dot-separated na ID-token claim path (halimbawa, `realm_access.roles`) at
  array ng mga tinatanggap na value; dapat array ng mga string ang na-resolve na claim na
  naglalaman ng kahit isang tinatanggap na value. Kung parehong naka-configure ang mga policy,
  kapwa dapat pumasa. Kapag nawawala o mali ang format ng mga claim, awtomatikong nabibigo ang
  pagsusuri, at kapag wala ang alinmang policy, tinatanggihan ng callback ang pag-login
  (`not_configured`). Patuloy na gumagana nang hindi nagbabago ang mga kasalukuyang
  subject-only configuration.
- Karaniwang mina-map ng Keycloak ang mga realm role sa access token, at hindi palaging sa ID
  token. Para hilingin ang realm role na `admin`, mag-configure ng protocol mapper para sa
  client na ito na magsama ng `realm_access.roles` sa **ID token**, pagkatapos ay itakda ang
  `oidcAdmissionClaim` sa `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Suriin ang aktuwal na ID-token claim para sa client na ito bago paganahin ang role-only
  admission; hindi binabasa ng application ang mga role sa access token. Maaaring idagdag ang
  pagtanggi ng token sa panig ng IdP, ngunit hindi nito napapalitan ang pagsusuring ito sa panig
  ng application.
- Kapag matagumpay, miniminte nito ang **eksaktong parehong** 30-araw na `auth_token` JWT na
  ibinibigay ng password login (`src/app/api/auth/login/route.ts`), kaya hindi nagbabago ang
  natitirang dashboard session pipeline (awtomatikong pag-refresh, mga flag ng cookie) —
  pinapalitan lamang ng OIDC kung paano ginagawa ang cookie, hindi kung ano ang mga pahintulot
  na ibinibigay nito. Hindi pinapawalang-bisa ng mga pagbabago sa mga role/group ng IdP ang
  mga kasalukuyang OmniRoute session; logout, pagpapalit ng password, o pag-expire ng session
  pa rin ang tumutukoy sa tagal ng mga ito.
- Ang bawat `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) ay nasa
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): Nagbabalik ang `PATCH /api/settings`
  ng `400 PASSWORD_REQUIRED` maliban kung dala ng body ang management password bilang
  `currentPassword` (`401 PASSWORD_MISMATCH` kapag mali ito).
  Tinatanggihan ng `oidcDisablePasswordLogin` ang password _login_ (`POST /api/auth/login`)
  ngunit pinananatili ang naka-store na password hash, at sinusuri pa rin ng re-auth ang
  `currentPassword` laban dito.
- Nasa `SECURITY_IMPACTING_SETTINGS_KEYS` din ang `corsOrigins` at
  `bruteForceProtection`: dahil pinahihina ng pagpapaluwag sa alinman sa mga ito ang mga
  depensa sa pag-login, kinakailangan din nila ang parehong `currentPassword` re-auth
  (hinihingi ito ng Security tab), at inaalis sila ng JSON import.
- Ang bawat security-policy key — ang mga entry sa `SECURITY_IMPACTING_SETTINGS_KEYS`,
  bawat `oidc*` key, at ang estado ng dashboard session — ay **operator-only** sa
  `PATCH /api/settings`: tinatanggihan ang isang manage-scoped API key o `oma_` access token
  na magamit nito na may `403` kahit ipinapadala nito ang tamang `currentPassword`, at
  ina-audit ang pagtanggi bilang `settings.update_failed` na may
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` sa `src/lib/api/operatorCredential.ts`).
  Nananatiling maaaring baguhin ang mga ordinaryong setting (theme, mga preference sa display)
  gamit ang `manage` key o `admin` access token. Ang bawat mutation ng `/api/settings` mismo
  (at ng `/api/settings/require-login`) ay nangangailangan din ng `admin` access-token scope
  (`ADMIN_MUTATION_EXACT_PATHS` sa `src/server/authz/accessScopes.ts`, exact-path
  match); nananatiling `read` ang `GET`, at pinananatili ng iba pang `/api/settings/*`
  sub-route (mga proxy, combo default, model alias, compression, purge, at iba pa) ang
  method-inferred na `write` scope.
- Nilalaktawan ng `POST /api/settings/import-json` ang re-auth na iyon, kaya inaalis nito ang
  bawat key sa `IMPORT_STRIPPED_SETTINGS_KEYS` (parehong file) bago magsulat: ang password at
  `currentPassword`, bawat entry ng `SECURITY_IMPACTING_SETTINGS_KEYS`, at ang estado ng
  dashboard session (`sessionsValidAfter`, `revokedDashboardSessions`).
  Kaya hindi maaaring muling buhayin ng pag-import ng mas lumang backup ang isang session na
  winakasan na ng pagpapalit ng password o pag-sign out.

#### Opsyonal na TOTP two-factor login (#16619)

Ini-enroll mula sa Settings → Security; naka-off hanggang sa paganahin ito ng operator
(`src/server/auth/dashboardMfa.ts`).

- **Saklaw nito:** pag-login gamit ang password (`POST /api/auth/login`, na nangangailangan
  pagkatapos ng `POST /api/auth/mfa/verify`) at `omniroute connect` (`POST /api/cli/connect`,
  na tumatanggi sa palitang password lamang at ginagamit ang code bilang `totp`).
- **Hindi nito saklaw:** ang pag-sign in gamit ang OIDC / SSO (`/api/auth/oidc/callback`) ay hindi
  humihingi ng OmniRoute TOTP. Umaasa ito sa sariling second factor ng identity provider, kaya
  ipatupad ang MFA sa IdP kung naka-enable ang OIDC.
- **Pagbawi** (nawalang device, wala nang natitirang recovery code, o isang factor na hindi na
  ma-verify, halimbawa pagkatapos magbago ang `STORAGE_ENCRYPTION_KEY`):
  1. I-restart ang server gamit ang `OMNIROUTE_DISABLE_MFA=true`.
  2. Sa mismong host (loopback peer at loopback na `Host`, gaya ng
     `http://localhost:20128`), mag-sign in gamit ang password. Lalaktawan ang second factor
     para lamang sa origin na iyon; kailangan pa rin ng code ang lahat ng iba pang origin.
  3. Sa Mga Setting → Seguridad → I-disable, ilagay ang password at iwanang blangko ang code. Ang `POST /api/auth/mfa/disable` ay tumatanggap ng body na walang `code` kapag nakatakda lamang ang variable at nagmumula ang request sa host; kailangan pa rin nito ang dashboard session at kasalukuyang password, at itinatala ito sa audit bilang `auth.mfa.disabled` na may `secondFactor: "recovery_switch"`.
  4. I-unset ang `OMNIROUTE_DISABLE_MFA`, i-restart, at mag-enroll muli kung kinakailangan.

## Mga Klase ng Route

Tinutukoy ng `src/server/authz/types.ts` ang tatlong klase; anumang route na hindi matukoy nang tiyak ay awtomatikong napapabilang sa `MANAGEMENT`.

| Klase        | Paglalarawan                                                                                                                                                               | Kinakailangang Auth                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `PUBLIC`     | Mga route na tahasang ligtas — pag-login, pag-logout, status, health, at bootstrap ng onboarding.                                                                          | Wala                                                                          |
| `CLIENT_API` | Mga endpoint na naghahatid ng modelo — `/api/v1/*`, `/api/v1beta/*`, pati ang mga alias na `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer key kapag naka-enable ang epektibong feature flag na `REQUIRE_API_KEY` |
| `MANAGEMENT` | Mga pahina ng dashboard, settings, provider, key, admin, at mga endpoint ng diagnostics.                                                                                   | Session ng dashboard O Bearer na may saklaw na `manage`                       |

Ang ilang aksyon ng `MANAGEMENT` ay **para lamang sa operator**: hindi sapat ang isang key na may `manage`. Ang pag-export ng mga nakaimbak na kredensyal (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), pagpapanumbalik ng backup sa live na data
(`POST /api/db-backups/import` kasama ang `dryRun=true`, `POST /api/db-backups` na pagpapanumbalik ayon sa id,
`POST /api/settings/import-json`), at pagbura ng mga restore point (`DELETE /api/db-backups` para sa cleanup,
at `PATCH /api/db-backups` dahil ang retention na sine-save nito ang nagtutulak sa awtomatikong pruning pagkatapos ng
bawat backup) ay nangangailangan ng session ng dashboard, lokal na subject ng CLI, o naka-disable ang pag-login. Ang pag-isyu ng
sync token (`POST /api/sync/tokens`) at paglikha ng `admin` CLI access token
(`POST /api/cli/tokens`) ay nangangailangan ng session ng dashboard o lokal na subject ng CLI sa bawat mode ng pag-login.
Ang mga API key na may anumang saklaw at mga access token na `oma_` ay hindi kredensyal ng operator: nakatatanggap ang mga ito ng `403`
kapag kinakailangan ang ganitong kredensyal. Nasa
`src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` /
`requireOperatorCredential()`) ang pagsusuring ito. Para lamang din sa operator ang pagbabago ng mga setting ng pag-login:
Ang `POST /api/settings/require-login` (pagtatakda ng password sa pamamahala / pag-toggle sa `requireLogin`) ay tumatanggap
lamang ng mga kredensyal na iyon kapag may password na — hindi nagbabago ang bootstrap window sa unang pagtakbo (wala pang
password) — at dapat magpadala ang session ng dashboard ng `currentPassword` upang mapalitan ang password
(`403` kapag wala ito o mali, at itinatala sa audit bilang `settings.update_failed`). Pinananatili ng lokal na CLI at ng isang
instance na naka-disable ang pag-login ang recovery path at maaari silang magtakda ng password nang wala nito, dahil kapwa
nakaugnay ang mga ito sa host na nagmamay-ari ng direktoryo ng data.

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

Ang mga pinagkakatiwalaang panloob na header (tinukoy sa `src/server/authz/headers.ts`) ay** inalis sa mga papasok na kahilingan** bago ang pag-uuri — client ay hindi maaaring pre-populate `x-omniroute-auth-*` upang gayahin ang isang paksa.

### Mga kontrata sa patakaran

Ang bawat klase ng ruta ay may patakaran sa `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) palaging nagbabalik ng `allow({ kind: "anonymous", id: "anonymous" })` —.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extracts Bearer, nagpapatunay sa pamamagitan ng `validateApiKey()`. Nahulog sa anonymous lamang kapag ang epektibong `REQUIRE_API_KEY` feature flag ay hindi pinagana. Ang epektibong flag ay nareresolba sa pamamagitan ng `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) kaya ang Dashboard Feature Flags at environment variable ay patuloy na namamahala `/api/v1/*`, `/api/v1beta/*`, at mga alias; Ang mga pagkabigo sa solver ay nabigo na sarado. Pinapayagan ang mga kahilingan sa dashboard-session sa mga ruta API ng kliyente (kabilang ang `/api/v1/models`, na ginagamit ng catalog ng modelo ng dashboard). Kapag ang Entra ID SSO ay pinagana, ang isang Bearer na structurally ay isang Entra token (tatlong base64url segment, `RS*` alg, `kid`) ay pinangangasiwaan ng SSO branch** dati** `validateApiKey()` at ang hatol nito ay pangwakas na — hindi ito nahuhulog sa API-key path o sa degrade-to-anonymous na sangay, kaya hindi maaaring maging bukas na access ang pagkawala ng identity-provider. Ang mga static API key ay hindi naaapektuhan. Tingnan [ang Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) tumatanggap ang — ng sesyon ng dashboard, mga kahilingan sa panloob na pag-sync ng modelo (itinugma laban sa `/api/providers/[name]/(sync-models|models)`), o ganap na lumalaktaw kung nagbabalik ng false `isAuthRequired()`. Ibinabalik ang 403 (`AUTH_001`) kapag may Bearer token ngunit invalid, 401 kung hindi. Ipinapatupad din ang mga tier ng route-guard (LOCAL_ONLY / ALWAYS_PROTECTED) bago ang anumang auth branch — tingnan [ang Mga Tier ng Route Guard](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY path sa `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ngayon: `/api/mcp/`) ay maaaring ma-access mula sa non-loopback kapag ang Bearer key ay nagdadala ng `manage` scope; lahat ng iba pang mga LOCAL_ONLY path ay nananatiling mahigpit-loopback anuman ang saklaw.

Ang isang matagumpay na patakaran ay nagbabalik `AuthSubject` na may `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Mababasa ito ng mga humahawak sa downstream sa pamamagitan ng `assertAuth(request, "CLIENT_API")` sa `src/server/authz/assertAuth.ts` sa halip na muling patakbuhin ang logic ng auth.

## Listahan ng mga Pampublikong Ruta

Ang `src/shared/constants/publicApiRoutes.ts` ang tahasang allowlist:

Hinahati ang listahan ayon sa **hugis**, at mahalaga ang paghahating ito (GHSA-74g9-q8f6-793h): ang isang prefix ay
tinitugma gamit ang `startsWith()`, kaya tinutugma rin nito ang bawat katabing path na nagsisimula sa parehong mga character.
Ang `/api/usage/om-usage` bilang prefix ay minamarkahan ang `/api/usage/om-usage<anything>` bilang PUBLIC, at nireresolba iyon ng Next
sa `/api/usage/[connectionId]` — isang handler na walang sariling authentication.

```ts
// Mga tunay na subtree. DAPAT magtapos sa "/" ang bawat entry (sinusuri ito ng isang unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // itinuturing bilang CLIENT_API sa classify, hindi bilang "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Mga iisang ruta, eksaktong tinutugma (may trailing slash man o wala).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // hakbang 2 ng pag-login para sa opt-in na TOTP; kailangan ang MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Mga iisang read-only na ruta na gumagamit din ng pagpapaluwag sa origin ng CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Iisang read-only na ruta NA WALANG pagpapaluwag sa CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Pampubliko lamang ang mga read-only na ruta para sa mga ligtas na method. Paalala: ibinubukod ng `classifyRoute()` ang `/api/v1/*` at `/api/v1beta/*` mula sa PUBLIC fall-through — palagi silang `CLIENT_API`, kaya nalalapat pa rin ang patakaran para sa Bearer key.

## Pagdaragdag ng Bagong Route

### Pattern 1 — Pampublikong client API endpoint (Bearer-auth)

Awtomatikong inuuri bilang `CLIENT_API` ang mga route sa ilalim ng `/api/v1/` at `/api/v1beta/`. Ipinapatupad ng middleware ang Bearer check; hindi na ito kailangang ulitin ng mga route handler, ngunit maaari nilang basahin ang subject kung kapaki-pakinabang.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... lohika ng handler
}
```

### Pattern 2 — Management endpoint (session o Bearer + manage)

Gamitin ang `requireManagementAuth()` mula sa `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lohika ng handler
}
```

Nagbabalik ang `requireManagementAuth()` ng `null` kapag matagumpay, o ng JSON error na `Response`:

- 401 `AUTH_001` "Kailangan ang pagpapatotoo" — walang anumang credential
- 403 — hindi wastong Bearer **o** may Bearer ngunit walang `manage` / `admin` scope ang key

Nagbabalik ng true ang `hasManageScope(scopes)` para sa `"manage"` o `"admin"`.

### Pattern 3 — Pagdaragdag sa pampublikong allowlist

Piliin ang set ayon sa hugis, hindi ayon sa kaginhawaan. Ang isang route ay inilalagay sa `PUBLIC_API_ROUTES_EXACT` (o sa `PUBLIC_READONLY_CORS_API_ROUTES` kung GET-only); isang tunay na subtree lamang ang inilalagay sa `PUBLIC_API_ROUTE_PREFIXES`, at **dapat itong magtapos sa `/`**. Kapag naglagay ng isang indibidwal na route sa listahan ng prefix, nailalantad din sa publiko ang bawat katabing path na may kaparehong mga panimulang character — kabilang ang mga kapatid na dynamic-segment na idadagdag sa hinaharap (GHSA-74g9-q8f6-793h). I-update ang mga unit test sa `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, at `tests/unit/authz/classify.test.ts`.

## Mga Saklaw

Tatlong namespace. Bawat checker ay nagbabasa lamang ng sarili nitong string. Ang paghahambing, kasama ang dahilan kung bakit nabigo ang `manage` sa `scopeMatches` para sa `read:compression` at kung bakit ang isang `read` access token ay hindi maaaring `PATCH /api/keys/{id}`, ay [Tatlong namespace ng saklaw](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Ang mga API key ay nagdadala ng `scopes` array (nakaimbak bilang JSON sa `api_keys.scopes`, tingnan ang `src/lib/db/apiKeys.ts`).

### Saklaw ng Pamamahala

- `manage` / `admin` — `hasManageScope`. Bearer access sa mga ruta ng management API.
- Ang `mcp:connect`, `self:usage`, `self:account-quota`, at `policy:bypass-provider-quota` ay mga additive exact-match scope. Ang mga ito ay nasa labas ng `MANAGEMENT_API_KEY_SCOPES`. Binubuksan lamang ng `mcp:connect` ang `/api/mcp/` non-loopback carve-out.

### Mga saklaw ng tool ng MCP

Katalogo at mga panuntunan sa pagtutugma (magkaparehong string, o isang ibinigay na scope na nagtatapos sa `*`): [Mga saklaw ng tool ng MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes). Ang `MCP_SCOPE_LIST` sa `src/shared/constants/mcpScopes.ts` ay ang orihinal na typed subset, hindi ang buong katalogo. Ang pagpapatupad ay tumatakbo sa `open-sse/mcp-server/scopeEnforcement.ts` pagkatapos ma-resolve ng `resolveCallerScopeContext()` ang mga scope mula sa MCP auth info, request metadata, o `OMNIROUTE_MCP_SCOPES`. Mananatili itong naka-off maliban kung `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Mga saklaw ng access-token

`read` / `write` / `admin` sa `oma_live_…` na mga token, na niraranggo ng `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`). Ang ranggong ito ay nalalapat lamang sa credential ng access-token. Tingnan ang [Pagpapatunay ng Pamamahala](../guides/MANAGEMENT-AUTH.md).

## Toggle ng Kinakailangang Auth

Tinutukoy ng `isAuthRequired()` sa `src/shared/utils/apiAuth.ts` kung ipinapatupad ang **anumang auth** para sa isang request:

- `settings.requireLogin === false` → pandaigdigang naka-disable ang auth, maliban sa palaging pinoprotektahang tier (tingnan ang [Mga Tier ng Route Guard](../security/ROUTE_GUARD_TIERS.md)) at sa mga tawag na namimigay ng credential na tinatanggap nito, na nangangailangan ng parehong credential gaya kapag naka-on ang login: pag-isyu ng mga sync token, pag-mint ng mga CLI access token sa anumang scope, at paggawa ng API key na may scope na `manage`/`admin`, pagbibigay ng scope na iyon sa isang key, o muling pag-generate o paglalantad ng naturang key (`requireCredentialForManagementScopedKey()` sa `src/lib/api/requireManagementAuth.ts`).
  Nananatiling bukas ang mga inference-only key. Kailangan pa rin ng credential ang pagsusulat ng protected feature flag (`REQUIRE_API_KEY`, iba pang Security flag, at mga SSRF / TLS / MCP-scope / sandbox flag na nakalista sa [Mga Feature Flag](../reference/FEATURE_FLAGS.md#rest-api)) at ang pag-save ng mga setting ng PII masking (`PUT /api/settings/pii`).
- Walang naka-configure na password **at** walang `INITIAL_PASSWORD` env var → pinapahintulutan ng bootstrap mode ang onboarding wizard at mga loopback request, ngunit kailangan pa rin ng credential ang mga exposed network request. Eksepsyon: kailangan ng credential kahit mula sa loopback ang pagsusulat ng protected feature flag at pag-save ng mga setting ng PII masking (`PUT /api/settings/pii`), kaya hindi sapat ang loopback lamang sa mga ito.
- Anumang error sa DB → awtomatikong tumatanggi (secure-by-default).

Ginagamit ng pagpapatupad ng client API key ang `isRequireApiKeyEnabled()` sa `src/shared/utils/featureFlags.ts`, hindi ang direktang pagbasa sa `process.env.REQUIRE_API_KEY`. Mahalaga ito para sa mga naka-deploy na instance: ang pag-toggle sa `REQUIRE_API_KEY` sa Dashboard → Feature Flags ay nagse-save ng DB override at agad na nakaaapekto sa `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, at iba pang client-API auth check na gumagamit ng helper na ito. Kung hindi mabasa ang feature flag store, awtomatikong tumatanggi ang client API auth at nangangailangan ng key.

## Breaking Change — v3.8.0

Ang mga endpoint na `/api/v1/agents/tasks/*` at `/api/resilience/model-cooldowns` ay **nangangailangan na ngayon ng management auth** (commit `588a0333`). Ang mga client na dati ay nagpapadala ng karaniwang API key na walang `manage` scope ay makatatanggap ng `403`. Pag-migrate: italaga sa key ang `manage` scope sa API Keys dashboard, o gumamit ng naka-log-in na dashboard session.

## Pagbabago sa Gawi — v3.8.2

Ang `/api/mcp/*` (ang remote MCP server) ay LOCAL_ONLY pa rin bilang default ngunit tumatanggap na ngayon ng mga non-loopback request kapag ang `Authorization: Bearer <api-key>` header ay may `manage` scope. Tahasang nililimitahan ang eksepsiyon sa bawat path sa pamamagitan ng `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` sa `src/server/authz/routeGuard.ts`; sadyang HINDI maaaring i-bypass ang kapatid na LOCAL_ONLY prefix na `/api/cli-tools/runtime/*` dahil maaari itong magsimula ng anumang subprocess. Patuloy na magbabalik ng `403 LOCAL_ONLY` ang mga anonymous na request sa `/api/mcp/*` mula sa non-loopback — nananatiling strict-loopback ang default para sa anumang bagong LOCAL_ONLY path. Tingnan ang [Mga Antas ng Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pagsubok

- Mga unit test: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Pampublikong allowlist: `tests/unit/public-api-routes.test.ts`.
- Patakbuhin nang nakatuon: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Pag-debug

Palaging tinatatak ng pipeline ang mga tugon ng:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para sa mga napatunayang kahilingan, kasama rin sa upstream (handler-side) na mga header ng kahilingan ang:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Gumamit `assertAuth(req, expectedClass)` inside handlers — it throws `AuthzAssertionError` with code `AUTHZ_NOT_INITIALIZED` if the middleware was bypassed (helpful for catching configuration regressions in tests).

## Tingnan Din

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pananda ng pagpapatunay bawat endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — audit log para sa mga kaganapan ng pagpapatunay
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tatlong scope namespace at MCP tool-scope catalog
- Pinagmulan: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
