# Authorization Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ସତ୍ୟର ଉତ୍ସ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ଶେଷ ଅପଡେଟ୍:** 2026-09-22 — ସ୍କୋପ୍ ନାମସ୍ପେସ୍ MCP-SERVER.md କୁ ସୂଚାଏ

OmniRoute ରେ ଏକ ରୁଟ୍-ସଚେତନ ଅନୁମତି ପାଇପଲାଇନ୍ ଅଛି ଯାହା ପ୍ରତ୍ୟେକ API ଅନୁରୋଧକୁ ଗେଟ୍ କରେ। ବର୍ଗୀକରଣ **ନିର୍ଣ୍ଣାୟକ** ଏବଂ **ଫେଲ୍-କ୍ଲୋଜ୍ଡ** — ଯାହା ବର୍ଗୀକୃତ ହୋଇପାରିବ ନାହିଁ ତାହା `MANAGEMENT` ଭାବରେ ଶେଷ ହୁଏ ଏବଂ ଏକ ସେସନ୍ କିମ୍ବା ମ୍ୟାନେଜମେଣ୍ଟ-ଗ୍ରେଡ୍ ଟୋକେନ୍ ଆବଶ୍ୟକ କରେ। ଏହି ପୃଷ୍ଠାଟି ରୁଟ୍ ରକ୍ଷଣାବେକ୍ଷଣ କରୁଥିବା କିମ୍ବା ନୂତନ ଏଣ୍ଡପଏଣ୍ଟ୍ ଡିଜାଇନ୍ କରୁଥିବା ଇଞ୍ଜିନିୟରମାନଙ୍କ ପାଇଁ ମଡେଲ୍ ବ୍ୟାଖ୍ୟା କରେ।

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ଉତ୍ସ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ଦୁଇଟି Auth ମୋଡ୍

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-ସୁସଙ୍ଗତ client API ଏବଂ key-ରେ `manage` scope ଥିଲେ କିଛି management route ପାଇଁ ବ୍ୟବହୃତ ହୁଏ।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ରେ `isValidApiKey()` / `extractApiKey()` ଦ୍ୱାରା ଯାଞ୍ଚ କରାଯାଏ ଏବଂ `src/shared/utils/apiAuth.ts` ମାଧ୍ୟମରେ ପୁନଃ-ରପ୍ତାନି କରାଯାଏ। Validator `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars-କୁ persistent passthrough key ଭାବରେ ମଧ୍ୟ ଗ୍ରହଣ କରେ (issue #1350)।

### 2. Dashboard Session (auth_token cookie)

Dashboard ପୃଷ୍ଠା ଏବଂ admin operation ପାଇଁ।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ଯାଞ୍ଚ ହେବା **ଏବଂ** ଏଥିରେ `authenticated: true` ଥିବାବେଳେ ମାତ୍ର cookie ଏକ session ହୁଏ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। Cookie-ର ପ୍ରତ୍ୟେକ consumer (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) ସେହି helper ମାଧ୍ୟମରେ ଯାଏ।
`JWT_SECRET` ଦ୍ୱାରା sign ହୋଇଥିବା ଅନ୍ୟ JWT ମଧ୍ୟ ରହିଛି — key holder-ମାନଙ୍କ ପାଇଁ Cursor CLI passthrough
`iss "omniroute" / aud "cursor-cli"` token mint କରେ — ଏବଂ ସେଗୁଡ଼ିକ କେବେବି session ନୁହେଁ
(#13298)।

`src/shared/utils/apiAuth.ts` ରେ `isDashboardSessionAuthenticated()` ଦ୍ୱାରା ଯାଞ୍ଚ କରାଯାଏ। 30-ଦିନିଆ lifetime-ରେ 7 ଦିନରୁ କମ୍ ସମୟ ବାକି ଥିଲେ pipeline ସ୍ୱୟଂଚାଳିତ ଭାବରେ JWT-କୁ refresh କରେ।

ଏହାର 30 ଦିନ ପୂର୍ଣ୍ଣ ହେବା ପୂର୍ବରୁ ମଧ୍ୟ session ଶେଷ ହୋଇପାରେ, କାରଣ ପ୍ରତ୍ୟେକ minter `mintDashboardSessionToken` ମାଧ୍ୟମରେ ଯାଏ (ଏକ issue time `iat` ଏବଂ ଏକ id `jti` ସହିତ) ଏବଂ verifier ଦୁଇଟି setting ଯାଞ୍ଚ କରେ: `sessionsValidAfter`, ଯାହା password ପରିବର୍ତ୍ତନ ସମୟରେ set ହୁଏ, ତେଣୁ ଏହା ପୂର୍ବରୁ issue ହୋଇଥିବା ପ୍ରତ୍ୟେକ session ଯାଞ୍ଚରେ ବିଫଳ ହୁଏ (password ପରିବର୍ତ୍ତନ କରିଥିବା browser ଏକ ନୂତନ cookie ପାଏ), ଏବଂ `revokedDashboardSessions`, ଯେଉଁଥିରେ `POST /api/auth/logout` sign-out କରାଯାଇଥିବା session-ର `jti` ଯୋଡ଼େ। ପୁରୁଣା release ଦ୍ୱାରା mint ହୋଇଥିବା session-ମାନଙ୍କର କୌଣସି claim ନଥାଏ ଏବଂ ପ୍ରଥମ password ପରିବର୍ତ୍ତନ ପର୍ଯ୍ୟନ୍ତ ସେଗୁଡ଼ିକ valid ରହେ। Setting ପଢ଼ିହେବା ନଥିଲେ session-କୁ trust କରାଯାଏ ନାହିଁ।

କିଛି management route **ଯେକୌଣସି** mode ଗ୍ରହଣ କରେ: cookie କିମ୍ବା `Bearer <key>`, ଯେତେବେଳେ API key-ରେ `manage` (କିମ୍ବା `admin`) scope ଥାଏ। v3.8 ରେ ଯୋଡ଼ାଯାଇଥିବା "configurable via API calls" workflow-କୁ ଏହା ସକ୍ଷମ କରେ।

#### ବୈକଳ୍ପିକ OIDC login gate (#6973)

Dashboard admin login ଡିଫଲ୍ଟ password login ସହିତ ଏକ **opt-in** OIDC (OpenID Connect) flow-କୁ ମଧ୍ୟ ସମର୍ଥନ କରେ
— password login କେବେବି ହଟାଯାଏ ନାହିଁ, କେବଳ ଏହା ସହିତ ଯୋଡ଼ାଯାଏ:

- `settings.oidcEnabled === true` **ଏବଂ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ସମସ୍ତେ କନଫିଗର୍ ହୋଇନଥିଲେ ଏହା ନିଷ୍କ୍ରିୟ ରହେ (Settings → Auth)।
  ଅନ୍ୟଥା `GET /api/auth/oidc/login` `400` ଫେରାଏ।
- `GET /api/auth/oidc/login` issuerର `/.well-known/openid-configuration` ଠାରୁ
  `authorization_endpoint` ଖୋଜେ (`<issuer>/authorize` fallback ଭାବେ ବ୍ୟବହାର କରେ), ଆସୁଥିବା
  ଅନୁରୋଧରୁ redirect URI ତିଆରି କରେ (`x-forwarded-proto`-ସଚେତନ), ଏବଂ
  `httpOnly` `oidc_state` cookieରେ ସଞ୍ଚିତ ଏକ ରାଣ୍ଡମ୍ `state` ସହିତ IdPକୁ redirect କରେ।
- `GET /api/auth/oidc/callback` `state`କୁ ଯାଞ୍ଚ କରେ, authorization
  code ବଦଳାଏ, ଏବଂ issuerର JWKS ମାଧ୍ୟମରେ ID tokenର signature ଯାଞ୍ଚ କରେ
  (`jose`ର `createRemoteJWKSet`, ପ୍ରତ୍ୟେକ JWKS URI ପାଇଁ cached), ସହିତ
  `issuer`/`audience` ଯାଞ୍ଚ କରେ। Dashboardରେ ପ୍ରବେଶ ପାଇଁ ଏକ ଖାଲି ନଥିବା
  `oidcAllowedSubjects` ତାଲିକା, ଏକ `oidcAdmissionClaim` policy, କିମ୍ବା ଉଭୟ
  ଆବଶ୍ୟକ। Subject ତାଲିକା `sub` କିମ୍ବା `email` ସହିତ କେବଳ
  `email_verified === true` ଥିଲେ ମେଳ ଖାଏ। ଇଚ୍ଛାଧୀନ claim policy ଏକ
  dot-separated ID-token claim path (ଉଦାହରଣସ୍ୱରୂପ, `realm_access.roles`) ଏବଂ
  ଗ୍ରହଣଯୋଗ୍ୟ ମୂଲ୍ୟଗୁଡ଼ିକର ଏକ array ନିଏ; ନିର୍ଦ୍ଧାରିତ claimଟି stringsର ଏକ
  array ହୋଇଥିବା ସହିତ ଅତି କମରେ ଗୋଟିଏ ଗ୍ରହଣଯୋଗ୍ୟ ମୂଲ୍ୟ ଧାରଣ କରିଥିବା
  ଆବଶ୍ୟକ। ଉଭୟ policy କନଫିଗର୍ ହୋଇଥିଲେ, ଉଭୟ ସଫଳ ହେବା ଆବଶ୍ୟକ।
  ନଥିବା/ଭୁଲ ଆକୃତିର claimଗୁଡ଼ିକ ସୁରକ୍ଷା ଦୃଷ୍ଟିରୁ ବିଫଳ ହୁଅନ୍ତି, ଏବଂ
  ଉଭୟ policy ନଥିଲେ callback loginକୁ ଅସ୍ୱୀକାର କରେ (`not_configured`)।
  ପୂର୍ବରୁ ଥିବା କେବଳ-subject କନଫିଗରେସନଗୁଡ଼ିକ ଅପରିବର୍ତ୍ତିତ ଭାବେ ଚାଲୁ ରହେ।
- Keycloak ସାଧାରଣତଃ realm rolesକୁ access tokenରେ map କରେ, ID tokenରେ
  ଅବଶ୍ୟ ନୁହେଁ। realm role `admin` ଆବଶ୍ୟକ କରିବାକୁ, ଏହି client ପାଇଁ ଏକ
  protocol mapper କନଫିଗର୍ କରନ୍ତୁ ଯାହା `realm_access.roles`କୁ ଏହାର
  **ID token**ରେ ସାମିଲ କରେ, ତାପରେ `oidcAdmissionClaim`କୁ
  `{ "path": "realm_access.roles", "values": ["admin"] }` ଭାବେ ସେଟ୍ କରନ୍ତୁ।
  role-only admission ସକ୍ରିୟ କରିବା ପୂର୍ବରୁ ଏହି client ପାଇଁ ପ୍ରକୃତ ID-token
  claim ଯାଞ୍ଚ କରନ୍ତୁ; application access-token roles ପଢ଼େ ନାହିଁ। IdP-ପକ୍ଷର
  token ଅସ୍ୱୀକାର ଏହି application-ପକ୍ଷର ଯାଞ୍ଚକୁ ପୂରକ କରିପାରେ, କିନ୍ତୁ
  ଏହାର ପରିବର୍ତ୍ତେ ବ୍ୟବହୃତ ହୋଇପାରେ ନାହିଁ।
- ସଫଳତା ପରେ ଏହା password login ଦ୍ୱାରା ଜାରି ହେଉଥିବା **ଠିକ୍ ସେହି**
  30-ଦିନିଆ `auth_token` JWT (`src/app/api/auth/login/route.ts`) ତିଆରି କରେ,
  ତେଣୁ dashboard session pipelineର ଅନ୍ୟାନ୍ୟ ଅଂଶ (auto-refresh, cookie flags)
  ଅପରିବର୍ତ୍ତିତ ରହେ — OIDC କେବଳ cookie କିପରି ତିଆରି ହୁଏ ତାହାକୁ ବଦଳାଏ,
  ଏହା କଣ ଅନୁମତି ଦିଏ ତାହାକୁ ନୁହେଁ। IdP roles/groupsର ପରିବର୍ତ୍ତନ
  ପୂର୍ବରୁ ଥିବା OmniRoute sessionsକୁ ଅବୈଧ କରେ ନାହିଁ; logout, password
  rotation କିମ୍ବା session expiry ହିଁ ସେମାନଙ୍କର ଅବଧି ନିର୍ଦ୍ଧାରଣ କରେ।
- ପ୍ରତ୍ୟେକ `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`)କୁ
  `SECURITY_IMPACTING_SETTINGS_KEYS`ରେ ରଖାଯାଇଛି
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  `400 PASSWORD_REQUIRED` ଉତ୍ତର ଦିଏ, ଯଦିନା bodyରେ management password
  `currentPassword` ଭାବେ ରହିଥାଏ (`401 PASSWORD_MISMATCH` ଯେତେବେଳେ ଏହା
  ଭୁଲ ଥାଏ)। `oidcDisablePasswordLogin` password _login_କୁ
  (`POST /api/auth/login`) ଅସ୍ୱୀକାର କରେ, କିନ୍ତୁ ସଞ୍ଚିତ password hashକୁ
  ରଖିଥାଏ, ଏବଂ re-auth ଏହା ବିରୋଧରେ `currentPassword` ଯାଞ୍ଚ କରେ।
- `corsOrigins` ଏବଂ `bruteForceProtection` ମଧ୍ୟ
  `SECURITY_IMPACTING_SETTINGS_KEYS`ରେ ଅଛି: ଯେକୌଣସିଟିକୁ ଶିଥିଳ କରିବା
  login defensesକୁ ଦୁର୍ବଳ କରେ, ତେଣୁ ସେମାନଙ୍କ ପାଇଁ ମଧ୍ୟ ସମାନ
  `currentPassword` re-auth ଆବଶ୍ୟକ (Security tab ଏହା ମାଗେ) ଏବଂ JSON
  import ସେମାନଙ୍କୁ ଛାଡ଼ି ଦିଏ।
- ପ୍ରତ୍ୟେକ security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS`ର
  entries, ପ୍ରତ୍ୟେକ `oidc*` key ଏବଂ dashboard session state — `PATCH /api/settings`
  ଉପରେ **କେବଳ operator ପାଇଁ**: manage-scoped API key କିମ୍ବା `oma_` access
  token, ସଠିକ୍ `currentPassword` ପଠାଇଲେ ମଧ୍ୟ, `403` ସହିତ ଅସ୍ୱୀକୃତ ହୁଏ,
  ଏବଂ ଏହି ଅସ୍ୱୀକାରକୁ `reason: OPERATOR_REQUIRED` ସହିତ
  `settings.update_failed` ଭାବେ audit କରାଯାଏ
  (`requireOperatorCredential()` in `src/lib/api/operatorCredential.ts`)।
  ସାଧାରଣ settings (theme, display preferences) `manage` key କିମ୍ବା
  `admin` access token ପାଇଁ ଲେଖିବାଯୋଗ୍ୟ ରହେ। `/api/settings` ନିଜେ
  (ଏବଂ `/api/settings/require-login`)ର ପ୍ରତ୍ୟେକ mutation ପାଇଁ ମଧ୍ୟ
  `admin` access-token scope ଆବଶ୍ୟକ
  (`ADMIN_MUTATION_EXACT_PATHS` in `src/server/authz/accessScopes.ts`,
  exact-path match); `GET` ଏବେ ମଧ୍ୟ `read` ରହେ, ଏବଂ ଅନ୍ୟ
  `/api/settings/*` sub-routes (proxies, combo defaults, model aliases,
  compression, purges…) method-inferred `write` scope ରଖନ୍ତି।
- `POST /api/settings/import-json` ସେହି re-authକୁ ଏଡ଼ାଇଯାଏ, ତେଣୁ ଲେଖିବା
  ପୂର୍ବରୁ `IMPORT_STRIPPED_SETTINGS_KEYS`ରେ ଥିବା ପ୍ରତ୍ୟେକ keyକୁ (ସେହି
  fileରେ) ଛାଡ଼ି ଦିଏ: password ଏବଂ `currentPassword`,
  `SECURITY_IMPACTING_SETTINGS_KEYS`ର ପ୍ରତ୍ୟେକ entry, ଏବଂ dashboard
  session state (`sessionsValidAfter`, `revokedDashboardSessions`)।
  ତେଣୁ ପୁରୁଣା backup import କଲେ ମଧ୍ୟ password ପରିବର୍ତ୍ତନ କିମ୍ବା sign-out
  ଦ୍ୱାରା ପୂର୍ବରୁ ସମାପ୍ତ ହୋଇଥିବା sessionକୁ ପୁନର୍ଜୀବିତ କରିହେବ ନାହିଁ।

#### ଇଚ୍ଛାଧୀନ TOTP ଦୁଇ-ସ୍ତରୀୟ login (#16619)

Settings → Securityରୁ enroll କରାଯାଏ; operator ଏହାକୁ ସକ୍ରିୟ ନକରିବା ପର୍ଯ୍ୟନ୍ତ
ଏହା ବନ୍ଦ ରହେ (`src/server/auth/dashboardMfa.ts`)।

- **ଏଥିରେ ଅନ୍ତର୍ଭୁକ୍ତ:** ପାସୱାର୍ଡ ଲଗଇନ୍ (`POST /api/auth/login`, ଯାହା ପରେ
  `POST /api/auth/mfa/verify` ଆବଶ୍ୟକ କରେ) ଏବଂ `omniroute connect` (`POST /api/cli/connect`,
  ଯାହା କେବଳ ପାସୱାର୍ଡ ଆଧାରିତ ବିନିମୟକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ ଏବଂ କୋଡ୍କୁ `totp` ଭାବେ ଗ୍ରହଣ କରେ)।
- **ଏଥିରେ ଅନ୍ତର୍ଭୁକ୍ତ ନୁହେଁ:** OIDC / SSO ସାଇନ୍-ଇନ୍ (`/api/auth/oidc/callback`) OmniRoute TOTP
  ଚାହେଁ ନାହିଁ। ଏହା ପରିଚୟ ପ୍ରଦାନକାରୀଙ୍କ ନିଜସ୍ୱ ଦ୍ୱିତୀୟ ପ୍ରମାଣୀକରଣ ଉପରେ ନିର୍ଭର କରେ, ତେଣୁ OIDC ସକ୍ଷମ
  ଥିଲେ IdP ରେ MFA ବାଧ୍ୟତାମୂଳକ କରନ୍ତୁ।
- **ପୁନରୁଦ୍ଧାର** (ଡିଭାଇସ୍ ହଜିଗଲେ, କୌଣସି ପୁନରୁଦ୍ଧାର କୋଡ୍ ବାକି ନଥିଲେ, କିମ୍ବା ଯେପରିକି
  `STORAGE_ENCRYPTION_KEY` ପରିବର୍ତ୍ତନ ହେବା ପରେ କୌଣସି ଫ୍ୟାକ୍ଟର୍କୁ ଆଉ ପ୍ରମାଣିତ
  କରାଯାଇପାରୁ ନଥିଲେ):
  1. `OMNIROUTE_DISABLE_MFA=true` ସହ ସର୍ଭର୍କୁ ପୁନରାରମ୍ଭ କରନ୍ତୁ।
  2. ନିଜେ ହୋଷ୍ଟ୍ରେ (ଲୁପ୍ବ୍ୟାକ୍ ପିୟର୍ ଏବଂ ଲୁପ୍ବ୍ୟାକ୍ `Host`, ଯେପରିକି
     `http://localhost:20128`) ପାସୱାର୍ଡ ସହ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ। କେବଳ ସେହି ଅରିଜିନ୍ ପାଇଁ ଦ୍ୱିତୀୟ
     ଫ୍ୟାକ୍ଟର୍ ଛାଡ଼ି ଦିଆଯାଏ; ଅନ୍ୟ ପ୍ରତ୍ୟେକ ଅରିଜିନ୍ ପାଇଁ ଏବେ ମଧ୍ୟ କୋଡ୍ ଆବଶ୍ୟକ।
  3. ସେଟିଂସ୍ → ସୁରକ୍ଷା → ନିଷ୍କ୍ରିୟ କରନ୍ତୁକୁ ଯାଇ, ପାସୱାର୍ଡ ଦିଅନ୍ତୁ ଏବଂ କୋଡ୍କୁ ଖାଲି ରଖନ୍ତୁ।
     `POST /api/auth/mfa/disable` କେବଳ ଭେରିଏବଲ୍ ସେଟ୍ ଥିବାବେଳେ ଏବଂ ଅନୁରୋଧଟି ହୋଷ୍ଟ୍ରୁ
     ଆସିଥିଲେ `code` ବିନା ଏକ ବଡି ଗ୍ରହଣ କରେ; ଏଥିପାଇଁ ଡ୍ୟାସ୍ବୋର୍ଡ୍ ସେସନ୍ ଏବଂ ବର୍ତ୍ତମାନର
     ପାସୱାର୍ଡ ଏବେ ମଧ୍ୟ ଆବଶ୍ୟକ, ଏବଂ ଏହାକୁ `auth.mfa.disabled` ଭାବେ
     `secondFactor: "recovery_switch"` ସହ ଅଡିଟ୍ କରାଯାଏ।
  4. `OMNIROUTE_DISABLE_MFA` ଅନସେଟ୍ କରନ୍ତୁ, ପୁନରାରମ୍ଭ କରନ୍ତୁ ଏବଂ ଆବଶ୍ୟକ ହେଲେ ପୁଣିଥରେ
     ନିବନ୍ଧନ କରନ୍ତୁ।

## ମାର୍ଗ ଶ୍ରେଣୀଗୁଡିକ।

`src/server/authz/types.ts` ତିନୋଟି ଶ୍ରେଣୀକୁ ବ୍ୟାଖ୍ୟା କରେ; ଯେକ any ଣସି ମାର୍ଗ ଯାହା ନିର୍ଦ୍ଦିଷ୍ଟ ଭାବରେ ବର୍ଗୀକୃତ ହୋଇପାରିବ ନାହିଁ `MANAGEMENT` କୁ ଫେରିଯାଏ।

| କ୍ଲାସ୍       | ବର୍ଣ୍ଣନା                                                                                                                                                    | Auth ଆବଶ୍ୟକ।                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | ସ୍ପଷ୍ଟ ଭାବରେ ସୁରକ୍ଷିତ ମାର୍ଗ — ଲଗଇନ୍, ଲଗଆଉଟ୍, ସ୍ଥିତି, ସ୍ୱାସ୍ଥ୍ୟ, ଅନ୍ବୋର୍ଡିଂ ବୁଟ୍ ଷ୍ଟ୍ରାପ୍।                                                                   | କିଛି ନୁହେଁ।                                                                  |
| `CLIENT_API` | ମଡେଲ୍-ସର୍ଭିସିଂ ଏଣ୍ଡପଏଣ୍ଟଗୁଡିକ — `/api/v1/*`, `/api/v1beta/*`, ପ୍ଲସ୍ ଛଦ୍ମନାମ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | ପ୍ରଭାବଶାଳୀ `REQUIRE_API_KEY` feature ଶିଷ୍ଟ୍ୟ ପତାକା ସକ୍ଷମ ହେଲେ ଧାରଣକାରୀ ଚାବି। |
| `MANAGEMENT` | ଡ୍ୟାସବୋର୍ଡ ପୃଷ୍ଠାଗୁଡ଼ିକ, ସେଟିଂସମୂହ, ପ୍ରଦାନକାରୀ, କି, ଆଡମିନି ଏବଂ ଡାଇଗ୍ନୋଷ୍ଟିକ୍ ଏଣ୍ଡପଏଣ୍ଟ।                                                                     | `manage` ପରିସର ସହିତ ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ OR ଧାରକ।                              |

କିଛି `MANAGEMENT` କାର୍ଯ୍ୟଗୁଡ଼ିକ ହେଉଛି।** କେବଳ ଅପରେଟର୍।** : ଏକ `manage` କି ଯଥେଷ୍ଟ ନୁହେଁ। ଗଚ୍ଛିତ ପରିଚୟପତ୍ର (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`) ରପ୍ତାନି କରିବା, ଲାଇଭ ଡାଟା ଉପରେ`POST /api/db-backups/import` ( `dryRun=true`, `POST /api/db-backups` ପୁନ id ପୁନ id ସ୍ଥାପନ, `POST /api/settings/import-json` ଅନ୍ତର୍ଭୂକ୍ତ କରି), ପୁନ restore ସ୍ଥାପନ ପଏଣ୍ଟଗୁଡ଼ିକୁ ନଷ୍ଟ କରିବା (`DELETE /api/db-backups` କ୍ଲିନଅପ୍, ଏବଂ `PATCH /api/db-backups` କାରଣ ପ୍ରତ୍ୟେକ ବ୍ୟାକଅପ୍ ପରେ ସ୍ୱୟଂଚାଳିତ ଛେଦନକୁ ଡ୍ରାଇଭ୍ କରିଥାଏ) ଏକ ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ, କିମ୍ବା ସ୍ଥାନୀୟ CLI ବିଷୟ ଆବଶ୍ୟକ କରେ। ଏକ ସିଙ୍କ ଟୋକେନ୍ (`POST /api/sync/tokens`) ପ୍ରଦାନ କରିବା ଏବଂ ଏକ `admin` CLI ଆକସେସ୍ ଟୋକେନ୍ (`POST /api/cli/tokens`) ମେଣ୍ଟ କରିବା ପ୍ରତ୍ୟେକ ଲଗଇନ୍ ମୋଡ୍ ରେ ଏକ ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ କିମ୍ବା ସ୍ଥାନୀୟ CLI ବିଷୟ ଆବଶ୍ୟକ କରେ। ଯେକ scope ଣସି ପରିସରର API କି ଏବଂ `oma_` ଆକ୍ସେସ୍ ଟୋକେନ୍ ଅପରେଟର ପରିଚୟପତ୍ର ନୁହେଁ: ଯେତେବେଳେ ବି ଆବଶ୍ୟକ ହୁଏ ସେମାନେ `403` ପାଆନ୍ତି। ଚେକ୍ `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) ରେ ରୁହେ। ଲଗଇନ୍ ସେଟିଂସମୂହକୁ ପରିବର୍ତ୍ତନ କରିବା କେବଳ ଅପରେଟର୍ ଅଟେ: `POST /api/settings/require-login` (ପରିଚାଳନା ପାସୱାର୍ଡ ସେଟ୍ କରନ୍ତୁ / `requireLogin` ଟୋଗଲ୍ କରନ୍ତୁ) କେବଳ ସେହି ପରିଚୟପତ୍ର ଗ୍ରହଣ କରେ — ପ୍ରଥମ ପାସୱାର୍ଡ ବୁଟ୍ ଷ୍ଟ୍ରାପ୍ ୱିଣ୍ଡୋ (ଏପର୍ଯ୍ୟନ୍ତ କ password ଣସି ପାସୱାର୍ଡ ନାହିଁ) ଅପରିବର୍ତ୍ତିତ — ଅଟେ ଏବଂ ଏକ ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ `currentPassword` ପଠାଇବା ଉଚିତ ଯେତେବେଳେ`403` ଅନୁପସ୍ଥିତ କିମ୍ବା ଭୁଲ, `settings.update_failed` କରାଯାଇଥାଏ। ସ୍ଥାନୀୟ CLI ଏବଂ ଲଗଇନ୍ ଅକ୍ଷମ ଥିବା ଏକ ଉଦାହରଣ ପୁନରୁଦ୍ଧାର ପଥ ରଖେ ଏବଂ ଏହା ବିନା ପାସୱାର୍ଡ ସେଟ୍ କରିପାରେ, ଯେହେତୁ ଉଭୟ ଡାଟା ଡିରେକ୍ଟୋରୀର ମାଲିକ ସହିତ ବନ୍ଧା।

## ପାଇପଲାଇନ

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

ବିଶ୍ୱସ୍ତ ଆଭ୍ୟନ୍ତରୀଣ ଶୀର୍ଷଲେଖଗୁଡ଼ିକ ( `src/server/authz/headers.ts` ରେ ବ୍ୟାଖ୍ୟା କରାଯାଇଛି) \|** ଆସୁଥିବା ଅନୁରୋଧରୁ ଛଡ଼ାଯାଇଛି \|** ବର୍ଗୀକରଣ ପୂର୍ବରୁ — ଗ୍ରାହକମାନେ ଏକ ବିଷୟର ଛଦ୍ମନାମ କରିବାକୁ `x-omniroute-auth-*` ପୂର୍ବ-ଜନସଂଖ୍ୟା କରିପାରିବେ ନାହିଁ \|

### ନୀତି ଚୁକ୍ତି

ପ୍ରତ୍ୟେକ ରୁଟ୍ ଶ୍ରେଣୀର `src/server/authz/policies/` ରେ ଏକ ନୀତି ଅଛି:

- **`publicPolicy`** (`policies/public.ts`) — ସର୍ବଦା `allow({ kind: "anonymous", id: "anonymous" })` ଫେରସ୍ତ କରେ \|
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ନିର୍ବାହକାରୀ, `validateApiKey()` ମାଧ୍ୟମରେ ବ valid ଧ କରେ \| ପ୍ରଭାବଶାଳୀ `REQUIRE_API_KEY` feature ଶିଷ୍ଟ୍ୟ ପତାକା ଅକ୍ଷମ ହେଲେ ହିଁ ଅଜ୍ଞାତ ହୋଇଯାଏ \| ପ୍ରଭାବଶାଳୀ ପତାକା `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ମାଧ୍ୟମରେ ସମାଧାନ ହୋଇଛି ତେଣୁ ଡ୍ୟାସବୋର୍ଡ ବ ature ଶିଷ୍ଟ୍ୟ ଫ୍ଲାଗ ଏବଂ ପରିବେଶ ଭେରିଏବଲ୍ `/api/v1/*`, `/api/v1beta/*`, ଏବଂ ଛଦ୍ମନାମକୁ କ୍ରମାଗତ ଭାବରେ ପରିଚାଳନା କରେ \| ସମାଧାନକାରୀ ବିଫଳତା ବନ୍ଦ ହୋଇଯାଏ \| କ୍ଲାଏଣ୍ଟ API ରୁଟରେ ଡ୍ୟାସବୋର୍ଡ-ଅଧିବେଶନ ଅନୁରୋଧକୁ ଅନୁମତି ଦେଇଥାଏ ( `/api/v1/models` ଅନ୍ତର୍ଭୂକ୍ତ କରି, ଡ୍ୟାସବୋର୍ଡ ମଡେଲ କାଟାଲଗ୍ ଦ୍ୱାରା ବ୍ୟବହୃତ) \| ଯେତେବେଳେ ଏଣ୍ଟ୍ରା ID SSO ସକ୍ଷମ ହୁଏ, ଏକ ବିୟର ଯାହାକି ଗଠନମୂଳକ ଭାବରେ ଏକ ଏଣ୍ଟ୍ରା ଟୋକେନ୍ (ତିନୋଟି ଆଧାର 64url ସେଗମେଣ୍ଟ, `RS*` alg, `kid`) SSO ଶାଖା ଦ୍ୱାରା ପରିଚାଳିତ ହୋଇଥାଏ \|** ପୂର୍ବରୁ** `validateApiKey()` — ଷ୍ଟାଟିକ୍ API କିଗୁଡ଼ିକ ପ୍ରଭାବିତ ନୁହେଁ \| [Entra ID SSO](../security/ENTRA_SSO.md) ଦେଖନ୍ତୁ \|
- **`managementPolicy`** (`policies/management.ts`) — ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ, ଆଭ୍ୟନ୍ତରୀଣ ମଡେଲ-ସିଙ୍କ ଅନୁରୋଧ ( `/api/providers/[name]/(sync-models|models)` ସହିତ ମେଳ) ଗ୍ରହଣ କରେ, କିମ୍ବା ଯଦି `isAuthRequired()` ମିଥ୍ୟା ଫେରସ୍ତ କରେ ତେବେ ସଂପୂର୍ଣ୍ଣ ଛାଡିଦିଏ \| 403 (`AUTH_001`) ଫେରସ୍ତ କରେ ଯେତେବେଳେ ଏକ ବିୟର ଟୋକନ୍ ଉପସ୍ଥିତ କିନ୍ତୁ ଅବ alid ଧ, 401 ଅନ୍ୟଥା \| ଯେକ any ଣସି auth ଶାଖା — [ରୁଟ୍ ଗାର୍ଡ ଟାୟର୍](../security/ROUTE_GUARD_TIERS.md) ଦେଖିବା ପୂର୍ବରୁ ରୁଟ୍-ଗାର୍ଡ ସ୍ତରଗୁଡିକ (LOCAL_ONLY / ALWAYS_PROTECTED) କୁ ମଧ୍ୟ କାର୍ଯ୍ୟକାରୀ କରିଥାଏ \| `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ରେ LOCAL_ONLY ପଥ (ଆଜି: `/api/mcp/`) ଅଣ-ଲୁପବ୍ୟାକ୍ ରୁ ପ୍ରବେଶ କରାଯାଇପାରେ ଯେତେବେଳେ ବିୟର ଚାବି `manage` ପରିସର ବହନ କରେ; ଅନ୍ୟ ସମସ୍ତ LOCAL_ONLY ପଥଗୁଡିକ ପରିସରକୁ ଖାତିର ନକରି କଠୋର-ଲୁପବ୍ୟାକ୍ ରହିଥାଏ \|

ଏକ ସଫଳ ନୀତି `AuthSubject` ସହିତ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ଫେରସ୍ତ କରେ \| ଡାଉନ୍ଷ୍ଟ୍ରିମ୍ ହ୍ୟାଣ୍ଡେଲର୍ମାନେ auth ତର୍କକୁ ପୁନ running ଚଲାଇବା ପରିବର୍ତ୍ତେ `src/server/authz/assertAuth.ts` ରେ `assertAuth(request, "CLIENT_API")` ମାଧ୍ୟମରେ ପ read ିପାରିବେ \|

## ସର୍ବସାଧାରଣ ମାର୍ଗ ତାଲିକା।

`src/shared/constants/publicApiRoutes.ts` ହେଉଛି ସ୍ପଷ୍ଟ ଅନୁମତି ତାଲିକା:

ତାଲିକା ଦ୍ୱାରା ବିଭକ୍ତ।** ଆକୃତି।** , ଏବଂ ବିଭାଜନ ହେଉଛି ଭାର ଧାରଣକାରୀ (GHSA-74g9-q8f6-793h): ଏକ ଉପସର୍ଗ `startsWith()` ସହିତ ମେଳ ହୋଇଛି, ତେଣୁ ଏହା ଏହାର ଅଗ୍ରଣୀ ଅକ୍ଷରଗୁଡ଼ିକୁ ଅଂଶୀଦାର କରୁଥିବା ପ୍ରତ୍ୟେକ ସଂଲଗ୍ନ ପଥ ସହିତ ମଧ୍ୟ ମେଳ ଖାଉଛି। `/api/usage/om-usage` ଏକ ଉପସର୍ଗ ଭାବରେ `/api/usage/om-usage<anything>` PUBLIC ଚିହ୍ନିତ ହୋଇଛି, ଏବଂ ପରବର୍ତ୍ତୀ ସମାଧାନ କରେ ଯେ `/api/usage/[connectionId]` — କୁ ଏକ ହ୍ୟାଣ୍ଡେଲର୍ ନିଜର କ aut ଣସି auth ବିନା।

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

କେବଳ ପଠନ ମାର୍ଗଗୁଡ଼ିକ ସର୍ବସାଧାରଣ ଅଟେ।** କେବଳ** ସୁରକ୍ଷିତ ପଦ୍ଧତି ପାଇଁ। ଟିପନ୍ତୁ: `classifyRoute()` `/api/v1/*` ଏବଂ `/api/v1beta/*` PUBLIC fall-through — ରୁ ବାଦ ଦେଇଥାଏ ଯାହା ସର୍ବଦା `CLIENT_API` ଅଟେ ତେଣୁ ବିୟର-କି ନୀତି ପ୍ରଯୁଜ୍ୟ।

## ଏକ ନୂତନ ରୁଟ୍ ଯୋଡ଼ିବା

### ପ୍ୟାଟର୍ନ 1 — ସାର୍ବଜନୀନ କ୍ଲାଏଣ୍ଟ API ଏଣ୍ଡପଏଣ୍ଟ (Bearer-ପ୍ରମାଣୀକରଣ)

`/api/v1/` ଏବଂ `/api/v1beta/` ଅଧୀନରେ ଥିବା ରୁଟ୍ଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବରେ `CLIENT_API` ଭାବେ ବର୍ଗୀକୃତ କରାଯାଏ। ମିଡଲ୍ୱେର୍ Bearer ଯାଞ୍ଚକୁ ବାଧ୍ୟତାମୂଳକ କରେ; ରୁଟ୍ ହ୍ୟାଣ୍ଡଲର୍ଗୁଡ଼ିକୁ ଏହା ପୁନର୍ବାର କରିବାର ଆବଶ୍ୟକତା ନାହିଁ, କିନ୍ତୁ ଉପଯୋଗୀ ହେଲେ ସବ୍ଜେକ୍ଟକୁ ପଢ଼ିପାରିବେ।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ହ୍ୟାଣ୍ଡଲର୍ ତର୍କ
}
```

### ପ୍ୟାଟର୍ନ 2 — ପରିଚାଳନା ଏଣ୍ଡପଏଣ୍ଟ (ସେସନ୍ କିମ୍ବା Bearer + manage)

`src/lib/api/requireManagementAuth.ts`ରୁ `requireManagementAuth()` ବ୍ୟବହାର କରନ୍ତୁ:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ହ୍ୟାଣ୍ଡଲର୍ ତର୍କ
}
```

ସଫଳ ହେଲେ `requireManagementAuth()` `null` ଫେରାଏ, ନଚେତ୍ ଏକ JSON ତ୍ରୁଟି `Response` ଫେରାଏ:

- 401 `AUTH_001` "ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକ" — ଆଦୌ କୌଣସି ପରିଚୟପତ୍ର ନାହିଁ
- 403 — ଅବୈଧ Bearer **କିମ୍ବା** Bearer ଉପସ୍ଥିତ ଅଛି, କିନ୍ତୁ କୀ ପାଖରେ `manage` / `admin` ସ୍କୋପ୍ ନାହିଁ

`"manage"` କିମ୍ବା `"admin"` ପାଇଁ `hasManageScope(scopes)` true ଫେରାଏ।

### ପ୍ୟାଟର୍ନ 3 — ସାର୍ବଜନୀନ ଅନୁମୋଦିତ ତାଲିକାରେ ଯୋଡ଼ିବା

ସୁବିଧା ଅନୁସାରେ ନୁହେଁ, ଆକୃତି ଅନୁସାରେ ସେଟ୍ ବାଛନ୍ତୁ। ଗୋଟିଏ ରୁଟ୍ `PUBLIC_API_ROUTES_EXACT`ରେ ଯାଏ (କିମ୍ବା କେବଳ-GET ପାଇଁ `PUBLIC_READONLY_CORS_API_ROUTES`ରେ); କେବଳ ଏକ ପ୍ରକୃତ ଉପବୃକ୍ଷ `PUBLIC_API_ROUTE_PREFIXES`ରେ ଯାଏ, ଏବଂ ଏହା **`/`ରେ ଶେଷ ହେବା ଆବଶ୍ୟକ**। ଉପସର୍ଗ ତାଲିକାରେ ଗୋଟିଏ ଏକକ ରୁଟ୍ ରଖିବା ଦ୍ୱାରା ଏହାର ପ୍ରାରମ୍ଭିକ ଅକ୍ଷରଗୁଡ଼ିକ ସମାନ ଥିବା ପ୍ରତ୍ୟେକ ସଂଲଗ୍ନ ପଥ ମଧ୍ୟ ସାର୍ବଜନୀନ ହୋଇଯାଏ — ଏଥିରେ ପରେ ଯୋଡ଼ାଯାଇଥିବା ଡାଇନାମିକ୍-ସେଗମେଣ୍ଟ ସହୋଦର ରୁଟ୍ଗୁଡ଼ିକ ମଧ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ଏବଂ `tests/unit/authz/classify.test.ts`ରେ ଥିବା ୟୁନିଟ୍ ପରୀକ୍ଷାଗୁଡ଼ିକୁ ଅଦ୍ୟତନ କରନ୍ତୁ।

## ସ୍କୋପ୍ସ

ତିନୋଟି ନାମସ୍ପେସ୍। ପ୍ରତ୍ୟେକ ଚେକର୍ କେବଳ ନିଜର ଷ୍ଟ୍ରିଙ୍ଗ୍ ପଢ଼େ। `manage` କାହିଁକି `read:compression` ପାଇଁ `scopeMatches` ରେ ବିଫଳ ହୁଏ ଏବଂ `read` ଆକ୍ସେସ୍ ଟୋକେନ୍ କାହିଁକି `PATCH /api/keys/{id}` କରିପାରିବ ନାହିଁ, ତାହା ସହିତ ପାର୍ଶ୍ୱ-ପାର୍ଶ୍ୱ ତୁଳନା [ତିନୋଟି ସ୍କୋପ୍ ନାମସ୍ପେସ୍](../frameworks/MCP-SERVER.md#three-scope-namespaces) ରେ ଦିଆଯାଇଛି।

API କି'ଗୁଡ଼ିକ ଏକ `scopes` ଆରେ ଧାରଣ କରନ୍ତି (JSON ଭାବରେ `api_keys.scopes` ରେ ସଂରକ୍ଷିତ, `src/lib/db/apiKeys.ts` ଦେଖନ୍ତୁ)।

### ପରିଚାଳନା ସ୍କୋପ୍

- `manage` / `admin` — `hasManageScope`। ପରିଚାଳନା API ରୁଟ୍ଗୁଡ଼ିକୁ ବେୟରର୍ ଆକ୍ସେସ୍।
- `mcp:connect`, `self:usage`, `self:account-quota`, ଏବଂ
  `policy:bypass-provider-quota` ହେଉଛି ଯୋଗାତ୍ମକ ସଠିକ୍-ମେଳ ସ୍କୋପ୍ସ। ସେଗୁଡ଼ିକ
  `MANAGEMENT_API_KEY_SCOPES` ବାହାରେ ରୁହନ୍ତି। `mcp:connect` କେବଳ
  `/api/mcp/` ନନ୍-ଲୁପ୍ବ୍ୟାକ୍ କାର୍ଭ-ଆଉଟ୍ ଖୋଲିଥାଏ।

### MCP ଟୁଲ୍ ସ୍କୋପ୍ସ

କାଟାଲଗ୍ ଏବଂ ମେଳ ଖାଉଥିବା ନିୟମ (ସମାନ ଷ୍ଟ୍ରିଙ୍ଗ୍, କିମ୍ବା `*` ରେ ଶେଷ ହେଉଥିବା ଏକ ଅନୁମତିପ୍ରାପ୍ତ ସ୍କୋପ୍):
[MCP ଟୁଲ୍ ସ୍କୋପ୍ସ](../frameworks/MCP-SERVER.md#mcp-tool-scopes)।
`src/shared/constants/mcpScopes.ts` ରେ ଥିବା `MCP_SCOPE_LIST` ହେଉଛି ମୂଳ ଟାଇପ୍ କରାଯାଇଥିବା ସବ୍ସେଟ୍,
ସମ୍ପୂର୍ଣ୍ଣ କାଟାଲଗ୍ ନୁହେଁ। `resolveCallerScopeContext()` MCP ଅଥ୍ ସୂଚନା, ଅନୁରୋଧ ମେଟାଡାଟା,
କିମ୍ବା `OMNIROUTE_MCP_SCOPES` ରୁ ସ୍କୋପ୍ସ ସମାଧାନ କରିବା ପରେ
`open-sse/mcp-server/scopeEnforcement.ts` ରେ ଏନଫୋର୍ସମେଣ୍ଟ ଚାଲିଥାଏ।
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` ନହେବା ପର୍ଯ୍ୟନ୍ତ ଏହା ବନ୍ଦ ରୁହେ।

### ଆକ୍ସେସ୍-ଟୋକେନ୍ ସ୍କୋପ୍ସ

`oma_live_…` ଟୋକେନ୍ଗୁଡ଼ିକ ଉପରେ `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) ଦ୍ୱାରା ମାନ୍ୟତାପ୍ରାପ୍ତ। ଏହି ମାନ୍ୟତା କେବଳ
ଆକ୍ସେସ୍-ଟୋକେନ୍ କ୍ରେଡେନ୍ସିଆଲ୍ ପାଇଁ ପ୍ରଯୁଜ୍ୟ। [ପରିଚାଳନା ପ୍ରମାଣୀକରଣ](../guides/MANAGEMENT-AUTH.md) ଦେଖନ୍ତୁ।

## Auth ଟୋଗଲ୍ ଆବଶ୍ୟକ।

`src/shared/utils/apiAuth.ts` ରେ`isAuthRequired()` ସ୍ଥିର କରେ କି ନାହିଁ।** ଯେକ any ଣସି** ଏକ ଅନୁରୋଧ ପାଇଁ auth ବାଧ୍ୟତାମୂଳକ:

- `settings.requireLogin === false` → auth ସର୍ବଦା ସୁରକ୍ଷିତ ସ୍ତର ( [ରୁଟ୍ ଗାର୍ଡ ଟାୟର୍ସ](../security/ROUTE_GUARD_TIERS.md) ଦେଖନ୍ତୁ) ଏବଂ କଲ୍ ଗ୍ରହଣ କରୁଥିବା ଏକ ପ୍ରମାଣପତ୍ର ବ୍ୟତୀତ, ସର୍ବଭାରତୀୟ ସ୍ତରରେ ଅକ୍ଷମ ହୋଇଛି, ଯାହାକି ଲଗ୍ ଇନ୍ ସହିତ ସମାନ ପ୍ରମାଣପତ୍ର ଆବଶ୍ୟକ କରେ: ସିଙ୍କ ଟୋକେନ୍ ପ୍ରଦାନ, CLI ଆକ୍ସେସ୍ ଟୋକେନ୍ଗୁଡ଼ିକୁ ମେଣ୍ଟ କରିବା, କିମ୍ବା `manage`/`admin` ପରିସର ସହିତ ଏକ API ଚାବି ସୃଷ୍ଟି କରିବା। `src/lib/api/requireManagementAuth.ts` ରେ`requireCredentialForManagementScopedKey()` ) ସୂଚନା-କେବଳ ଚାବିଗୁଡ଼ିକ ଖୋଲା ରହିଥାଏ। ଏକ ସଂରକ୍ଷିତ ବ feature ଶିଷ୍ଟ୍ୟ ପତାକା ଲେଖିବା (`REQUIRE_API_KEY`, ଅନ୍ୟାନ୍ୟ ସୁରକ୍ଷା ପତାକା, ଏବଂ ବ [q ଶିଷ୍ଟ୍ୟ ଫ୍ଲାଗରେ](../reference/FEATURE_FLAGS.md#rest-api) ତାଲିକାଭୁକ୍ତ SSRF / TLS / MCP- ପରିସର / ସ୍ୟାଣ୍ଡବକ୍ସ ଫ୍ଲାଗ୍) ଏବଂ PII ମାସ୍କିଂ ସେଟିଂସମୂହ (`PUT /api/settings/pii`) ସଂରକ୍ଷଣ କରିବା ମଧ୍ୟ ଏକ ପ୍ରମାଣପତ୍ରର ଆବଶ୍ୟକତା ରଖେ।
- କ password ଣସି ପାସୱାର୍ଡ ବିନ୍ୟାସ ହୋଇନାହିଁ।** ଏବଂ** କ z `INITIAL_PASSWORD` env var → ବୁଟ୍ ଷ୍ଟ୍ରାପ୍ ମୋଡ୍ ଅନ୍ବୋର୍ଡିଂ ୱିଜାର୍ଡ ଏବଂ ଲୁପ୍ ବ୍ୟାକ୍ ଅନୁରୋଧକୁ ଅନୁମତି ଦିଏ, କିନ୍ତୁ ଉନ୍ମୋଚିତ ନେଟୱାର୍କ ଅନୁରୋଧଗୁଡ଼ିକ ତଥାପି ପ୍ରମାଣପତ୍ର ଆବଶ୍ୟକ କରେ। ବ୍ୟତିକ୍ରମ: ଏକ ସଂରକ୍ଷିତ ବ feature ଶିଷ୍ଟ୍ୟ ପତାକା ଲେଖିବା ଏବଂ PII ମାସ୍କିଂ ସେଟିଂସମୂହ (`PUT /api/settings/pii`) କୁ ଲୁପବ୍ୟାକ୍ ଠାରୁ ମଧ୍ୟ ଏକ ପ୍ରମାଣପତ୍ର ଆବଶ୍ୟକ କରେ, ତେଣୁ ନିଜେ ଲୁପ୍ ବ୍ୟାକ୍ ଯଥେଷ୍ଟ ନୁହେଁ।
- ଯେକ Any ଣସି DB ତ୍ରୁଟି → ବନ୍ଦ ହୋଇଯାଏ (ସୁରକ୍ଷିତ-ବାଇ-ଡିଫଲ୍ଟ)।

କ୍ଲାଏଣ୍ଟ API କି ପ୍ରୟୋଗ `src/shared/utils/featureFlags.ts` ରେ `isRequireApiKeyEnabled()` ବ୍ୟବହାର କରେ, ସିଧାସଳଖ `process.env.REQUIRE_API_KEY` ପଠନ ନୁହେଁ। ନିୟୋଜିତ ଉଦାହରଣଗୁଡିକ ପାଇଁ ଏହା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ: ଡ୍ୟାସବୋର୍ଡରେ `REQUIRE_API_KEY` ଟୋଗଲ୍ କରିବା → ବ ature ଶିଷ୍ଟ୍ୟ ଫ୍ଲାଗଗୁଡିକ ଏକ DB ଓଭରଡାଇଡ୍ ଗଚ୍ଛିତ କରେ ଏବଂ ତୁରନ୍ତ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, ଏବଂ ଅନ୍ୟ କ୍ଲାଏଣ୍ଟ- API auth ଯାଞ୍ଚଗୁଡ଼ିକୁ ଏହି ହେଲପର ଅଂଶୀଦାର କରିଥାଏ। ଯଦି ବ feature ଶିଷ୍ଟ୍ୟ ଫ୍ଲାଗ୍ ଷ୍ଟୋର୍ ପ read ିହେବ ନାହିଁ, କ୍ଲାଏଣ୍ଟ API auth ବନ୍ଦ ହୋଇଯାଏ ଏବଂ ଏକ ଚାବି ଆବଶ୍ୟକ କରେ।

## ବ୍ରେକିଂ ପରିବର୍ତ୍ତନ — v3.8.0

`/api/v1/agents/tasks/*` ଏବଂ `/api/resilience/model-cooldowns` ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ ପାଇଁ **ବର୍ତ୍ତମାନ ପରିଚାଳନା ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକ** (commit `588a0333`)। ପୂର୍ବରୁ `manage` ସ୍କୋପ୍ ବିନା ଏକ ସାଧାରଣ API କୀ ପଠାଉଥିବା କ୍ଲାଏଣ୍ଟଗୁଡ଼ିକ `403` ପାଇବେ। ମାଇଗ୍ରେସନ୍: API Keys ଡ୍ୟାସ୍ବୋର୍ଡ୍ରେ କୀକୁ `manage` ସ୍କୋପ୍ ଦିଅନ୍ତୁ, କିମ୍ବା ଏକ ଲଗ୍ଇନ୍ ହୋଇଥିବା ଡ୍ୟାସ୍ବୋର୍ଡ୍ ସେସନ୍ ବ୍ୟବହାର କରନ୍ତୁ।

## ଆଚରଣ ପରିବର୍ତ୍ତନ — v3.8.2

`/api/mcp/*` (ରିମୋଟ୍ MCP ସର୍ଭର୍) ଏବେ ମଧ୍ୟ ଡିଫଲ୍ଟ ଭାବେ LOCAL_ONLY ଅଟେ, କିନ୍ତୁ `Authorization: Bearer <api-key>` ହେଡର୍ରେ `manage` ସ୍କୋପ୍ ଥିଲେ ଏହା ବର୍ତ୍ତମାନ ଅଣ-ଲୁପ୍ବ୍ୟାକ୍ ଅନୁରୋଧଗୁଡ଼ିକୁ ଗ୍ରହଣ କରେ। ଏହି ବିଶେଷ ଛାଡ଼ `src/server/authz/routeGuard.ts`ରେ ଥିବା `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ମାଧ୍ୟମରେ ପ୍ରତ୍ୟେକ ପଥ ପାଇଁ ସ୍ପଷ୍ଟ ଭାବେ ନିୟନ୍ତ୍ରିତ; ସମାନ ସ୍ତରର LOCAL_ONLY ପ୍ରିଫିକ୍ସ `/api/cli-tools/runtime/*`କୁ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ ବାଇପାସ୍ଯୋଗ୍ୟ କରାଯାଇନାହିଁ, କାରଣ ଏହା ଇଚ୍ଛାମୁତାବକ ସବ୍ପ୍ରୋସେସ୍ଗୁଡ଼ିକୁ ସୃଷ୍ଟି କରିପାରେ। ଅଣ-ଲୁପ୍ବ୍ୟାକ୍ରୁ `/api/mcp/*`କୁ ଆସୁଥିବା ଅଜ୍ଞାତ ଅନୁରୋଧଗୁଡ଼ିକ `403 LOCAL_ONLY` ଫେରାଇବା ଜାରି ରଖେ — ଯେକୌଣସି ନୂତନ LOCAL_ONLY ପଥ ପାଇଁ ଡିଫଲ୍ଟ ନୀତି କଠୋର-ଲୁପ୍ବ୍ୟାକ୍ ହୋଇ ରହେ। [ରୁଟ୍ ଗାର୍ଡ୍ ସ୍ତରଗୁଡ଼ିକ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ଦେଖନ୍ତୁ।

## ପରୀକ୍ଷଣ

- ୟୁନିଟ୍ ପରୀକ୍ଷଣଗୁଡ଼ିକ: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- ସାର୍ବଜନୀନ ଅନୁମୋଦିତ ତାଲିକା: `tests/unit/public-api-routes.test.ts`।
- କେନ୍ଦ୍ରିତ ଭାବେ ଚଲାନ୍ତୁ: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## ତ୍ରୁଟି ନିବାରଣ

ପାଇପଲାଇନ ସର୍ବଦା ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକୁ ଷ୍ଟାମ୍ପ କରିଥାଏ:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ପ୍ରାମାଣିକ ଅନୁରୋଧ ପାଇଁ ଅପଷ୍ଟ୍ରିମ୍ (ହ୍ୟାଣ୍ଡେଲର୍-ସାଇଡ୍) ଅନୁରୋଧ ହେଡର୍ ଗୁଡିକ ମଧ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ କରେ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ହ୍ୟାଣ୍ଡଲର୍ ଭିତରେ `assertAuth(req, expectedClass)` ବ୍ୟବହାର କରନ୍ତୁ — ଏହା `AuthzAssertionError` `AUTHZ_NOT_INITIALIZED` ସହିତ ଫୋପାଡିଥାଏ ଯଦି ମଧ୍ୟମ ସଫ୍ଟୱେର୍ ବାଇପାସ୍ ହୋଇଥଲା (ପରୀକ୍ଷଣରେ ବିନ୍ୟାସକରଣ ରିଗ୍ରେସନ୍ ଧରିବାରେ ସାହାଯ୍ୟକାରୀ) \|

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ପ୍ରତି ଏଣ୍ଡପଏଣ୍ଟ ପାଇଁ ଅଥ୍ ମାର୍କର୍
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ଅଥ୍ ଇଭେଣ୍ଟଗୁଡ଼ିକ ପାଇଁ ଅଡିଟ୍ ଲଗ୍
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ତିନୋଟି ସ୍କୋପ୍ ନେମସ୍ପେସ୍ ଏବଂ MCP ଟୁଲ୍-ସ୍କୋପ୍ କାଟାଲଗ୍
- ଉତ୍ସ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
