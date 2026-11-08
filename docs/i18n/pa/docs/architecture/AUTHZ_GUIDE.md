# Authorization Guide (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ਸੱਚ ਦਾ ਸਰੋਤ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ਆਖਰੀ ਵਾਰ ਅੱਪਡੇਟ ਕੀਤਾ ਗਿਆ:** 2026-09-22 — ਸਕੋਪ ਨੇਮਸਪੇਸ MCP-SERVER.md ਵੱਲ ਇਸ਼ਾਰਾ ਕਰਦੇ ਹਨ

OmniRoute ਕੋਲ ਇੱਕ ਰੂਟ-ਜਾਣੂ ਅਧਿਕਾਰ ਪਾਈਪਲਾਈਨ ਹੈ ਜੋ ਹਰ API ਬੇਨਤੀ ਨੂੰ ਗੇਟ ਕਰਦੀ ਹੈ। ਵਰਗੀਕਰਨ **ਨਿਰਧਾਰਤ** ਅਤੇ **ਫੇਲ-ਕਲੋਜ਼ਡ** ਹੈ — ਕੋਈ ਵੀ ਚੀਜ਼ ਜਿਸਨੂੰ ਵਰਗੀਕ੍ਰਿਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਉਹ `MANAGEMENT` ਦੇ ਰੂਪ ਵਿੱਚ ਖਤਮ ਹੁੰਦੀ ਹੈ ਅਤੇ ਇੱਕ ਸੈਸ਼ਨ ਜਾਂ ਪ੍ਰਬੰਧਨ-ਗ੍ਰੇਡ ਟੋਕਨ ਦੀ ਮੰਗ ਕਰਦੀ ਹੈ। ਇਹ ਪੰਨਾ ਰੂਟਾਂ ਨੂੰ ਬਣਾਈ ਰੱਖਣ ਵਾਲੇ ਜਾਂ ਨਵੇਂ ਐਂਡਪੁਆਇੰਟ ਡਿਜ਼ਾਈਨ ਕਰਨ ਵਾਲੇ ਇੰਜੀਨੀਅਰਾਂ ਲਈ ਮਾਡਲ ਦੀ ਵਿਆਖਿਆ ਕਰਦਾ ਹੈ।

![AuthZ ਪਾਈਪਲਾਈਨ (3 ਰੂਟ ਕਲਾਸਾਂ + ਨੀਤੀ ਮੁਲਾਂਕਣ)](../diagrams/exported/authz-pipeline.svg)

> ਸਰੋਤ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ਦੋ ਪ੍ਰਮਾਣੀਕਰਨ ਮੋਡ

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-ਅਨੁਕੂਲ ਕਲਾਇੰਟ APIs ਅਤੇ ਕੁਝ ਪ੍ਰਬੰਧਨ ਰੂਟਾਂ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ, ਜਦੋਂ key ਕੋਲ `manage` scope ਹੋਵੇ।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ਵਿੱਚ `isValidApiKey()` / `extractApiKey()` ਦੁਆਰਾ ਵੈਧਤਾ ਜਾਂਚੀ ਜਾਂਦੀ ਹੈ ਅਤੇ `src/shared/utils/apiAuth.ts` ਰਾਹੀਂ ਦੁਬਾਰਾ export ਕੀਤੀ ਜਾਂਦੀ ਹੈ। Validator `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars ਨੂੰ ਸਥਾਈ passthrough keys ਵਜੋਂ ਵੀ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ (issue #1350)।

### 2. Dashboard Session (auth_token cookie)

Dashboard ਪੰਨਿਆਂ ਅਤੇ admin ਕਾਰਵਾਈਆਂ ਲਈ।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie ਸਿਰਫ਼ ਉਦੋਂ session ਹੁੰਦੀ ਹੈ ਜਦੋਂ JWT ਦੀ ਪੁਸ਼ਟੀ ਹੋਵੇ **ਅਤੇ** ਉਸ ਵਿੱਚ `authenticated: true` ਮੌਜੂਦ ਹੋਵੇ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। Cookie ਦੇ ਹਰ consumer (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) ਇਸ helper ਰਾਹੀਂ ਜਾਂਦਾ ਹੈ।
`JWT_SECRET` ਨਾਲ sign ਕੀਤੇ ਹੋਰ JWTs ਵੀ ਮੌਜੂਦ ਹਨ — Cursor CLI passthrough key holders ਲਈ
`iss "omniroute" / aud "cursor-cli"` tokens ਬਣਾਉਂਦਾ ਹੈ — ਅਤੇ ਉਹ ਕਦੇ ਵੀ sessions ਨਹੀਂ ਹੁੰਦੇ
(#13298)।

`src/shared/utils/apiAuth.ts` ਵਿੱਚ `isDashboardSessionAuthenticated()` ਦੁਆਰਾ ਪੁਸ਼ਟੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। Pipeline 30 ਦਿਨਾਂ ਦੀ lifetime ਵਿੱਚ 7 ਦਿਨਾਂ ਤੋਂ ਘੱਟ ਸਮਾਂ ਬਾਕੀ ਹੋਣ 'ਤੇ JWT ਨੂੰ ਆਪਣੇ-ਆਪ refresh ਕਰਦਾ ਹੈ।

Session ਆਪਣੇ 30 ਦਿਨ ਪੂਰੇ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਵੀ ਖਤਮ ਹੋ ਸਕਦੀ ਹੈ, ਕਿਉਂਕਿ ਹਰ minter `mintDashboardSessionToken` ਰਾਹੀਂ ਜਾਂਦਾ ਹੈ (ਇੱਕ issue time `iat` ਅਤੇ ਇੱਕ id `jti` ਦੇ ਨਾਲ) ਅਤੇ verifier ਦੋ settings ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ: `sessionsValidAfter`, ਜੋ password ਬਦਲਣ 'ਤੇ set ਹੁੰਦੀ ਹੈ ਤਾਂ ਜੋ ਇਸ ਤੋਂ ਪਹਿਲਾਂ ਜਾਰੀ ਕੀਤੀ ਹਰ session ਦੀ verification ਰੁਕ ਜਾਵੇ (password ਬਦਲਣ ਵਾਲੇ browser ਨੂੰ ਨਵੀਂ cookie ਮਿਲਦੀ ਹੈ), ਅਤੇ `revokedDashboardSessions`, ਜਿਸ ਵਿੱਚ `POST /api/auth/logout` sign-out ਕੀਤੀ session ਦਾ `jti` ਜੋੜਦਾ ਹੈ। ਪੁਰਾਣੇ release ਦੁਆਰਾ mint ਕੀਤੀਆਂ sessions ਵਿੱਚ ਕੋਈ ਵੀ claim ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਉਹ ਪਹਿਲੇ password change ਤੱਕ valid ਰਹਿੰਦੀਆਂ ਹਨ। ਜੇ settings ਪੜ੍ਹੀਆਂ ਨਾ ਜਾ ਸਕਣ, ਤਾਂ session 'ਤੇ ਭਰੋਸਾ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ।

ਕੁਝ management routes ਦੋਵਾਂ ਵਿੱਚੋਂ ਕਿਸੇ ਇੱਕ mode ਨੂੰ ਸਵੀਕਾਰ ਕਰਦੇ ਹਨ: cookie **ਜਾਂ** `Bearer <key>`, ਜਦੋਂ API key ਕੋਲ `manage` (ਜਾਂ `admin`) scope ਹੋਵੇ। ਇਹੀ v3.8 ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤੇ "configurable via API calls" workflow ਨੂੰ ਸਮਰੱਥ ਬਣਾਉਂਦਾ ਹੈ।

#### Optional OIDC login gate (#6973)

Dashboard admin login, default password login ਦੇ ਨਾਲ **opt-in** OIDC (OpenID Connect) flow ਨੂੰ ਵੀ support ਕਰਦਾ ਹੈ — password login ਨੂੰ ਕਦੇ ਹਟਾਇਆ ਨਹੀਂ ਜਾਂਦਾ, ਸਿਰਫ਼ ਇਸ ਵਿੱਚ ਵਾਧਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ:

- ਅਸਮਰੱਥ ਰਹਿੰਦਾ ਹੈ ਜਦੋਂ ਤੱਕ `settings.oidcEnabled === true` **ਅਤੇ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ਤਿੰਨੇ ਕੌਂਫਿਗਰ ਨਾ ਹੋਣ (Settings → Auth)।
  `GET /api/auth/oidc/login` ਹੋਰ ਸਥਿਤੀਆਂ ਵਿੱਚ `400` ਵਾਪਸ ਕਰਦਾ ਹੈ।
- `GET /api/auth/oidc/login` issuer ਦੀ
  `/.well-known/openid-configuration` ਤੋਂ `authorization_endpoint` ਖੋਜਦਾ ਹੈ
  (`<issuer>/authorize` ਤੇ ਵਾਪਸ ਆ ਜਾਂਦਾ ਹੈ), ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ ਤੋਂ ਰੀਡਾਇਰੈਕਟ URI
  ਬਣਾਉਂਦਾ ਹੈ (`x-forwarded-proto` ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖਦੇ ਹੋਏ), ਅਤੇ ਇੱਕ ਯਾਦ੍ਰਿਚਛਿਕ
  `state` ਨਾਲ IdP ਵੱਲ ਰੀਡਾਇਰੈਕਟ ਕਰਦਾ ਹੈ, ਜੋ `httpOnly` `oidc_state` ਕੁਕੀ ਵਿੱਚ
  ਸਟੋਰ ਹੁੰਦਾ ਹੈ।
- `GET /api/auth/oidc/callback` `state` ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ, authorization code
  ਦਾ ਅਦਲਾ-ਬਦਲੀ ਕਰਦਾ ਹੈ, ਅਤੇ issuer ਦੇ JWKS ਰਾਹੀਂ ID token ਦੇ ਦਸਤਖ਼ਤ ਦੀ ਪੁਸ਼ਟੀ
  ਕਰਦਾ ਹੈ (`jose` ਦਾ `createRemoteJWKSet`, ਜੋ ਹਰ JWKS URI ਲਈ ਕੈਸ਼ ਹੁੰਦਾ ਹੈ),
  ਨਾਲ ਹੀ `issuer`/`audience` ਜਾਂਚਾਂ ਵੀ ਕਰਦਾ ਹੈ। ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਦਾਖ਼ਲੇ ਲਈ ਇੱਕ
  ਗੈਰ-ਖਾਲੀ `oidcAllowedSubjects` ਸੂਚੀ, ਇੱਕ `oidcAdmissionClaim` ਨੀਤੀ, ਜਾਂ ਦੋਵੇਂ
  ਲਾਜ਼ਮੀ ਹਨ। ਵਿਸ਼ਾ-ਸੂਚੀ `sub` ਜਾਂ `email` ਨਾਲ ਤਦ ਹੀ ਮੇਲ ਖਾਂਦੀ ਹੈ ਜਦੋਂ
  `email_verified === true` ਹੋਵੇ। ਵਿਕਲਪਿਕ claim ਨੀਤੀ ਬਿੰਦੀ-ਵੱਖ ਕੀਤੇ ID-token
  claim ਮਾਰਗ (ਉਦਾਹਰਨ ਲਈ, `realm_access.roles`) ਅਤੇ ਸਵੀਕਾਰ ਕੀਤੀਆਂ ਕੀਮਤਾਂ ਦੀ
  ਇੱਕ ਐਰੇ ਲੈਂਦੀ ਹੈ; ਹੱਲ ਕੀਤਾ ਗਿਆ claim strings ਦੀ ਇੱਕ ਐਰੇ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ ਜਿਸ
  ਵਿੱਚ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਸਵੀਕਾਰ ਕੀਤੀ ਕੀਮਤ ਹੋਵੇ। ਜੇ ਦੋਵੇਂ ਨੀਤੀਆਂ ਕੌਂਫਿਗਰ ਕੀਤੀਆਂ ਹੋਣ,
  ਤਾਂ ਦੋਵੇਂ ਦਾ ਪਾਸ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ। ਗੁੰਮ ਜਾਂ ਗਲਤ-ਰੂਪ claims ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ
  ਅਸਫਲ ਹੁੰਦੇ ਹਨ, ਅਤੇ ਦੋਵਾਂ ਵਿੱਚੋਂ ਕੋਈ ਵੀ ਨੀਤੀ ਨਾ ਹੋਣ ਤੇ callback ਲੌਗਇਨ
  (`not_configured`) ਨੂੰ ਅਸਵੀਕਾਰ ਕਰਦਾ ਹੈ। ਮੌਜੂਦਾ ਸਿਰਫ਼-ਵਿਸ਼ਾ ਕੌਂਫਿਗਰੇਸ਼ਨਾਂ
  ਬਿਨਾਂ ਕਿਸੇ ਬਦਲਾਅ ਦੇ ਜਾਰੀ ਰਹਿੰਦੀਆਂ ਹਨ।
- Keycloak ਆਮ ਤੌਰ ਤੇ realm roles ਨੂੰ access tokens ਵਿੱਚ ਮੈਪ ਕਰਦਾ ਹੈ, ID tokens
  ਵਿੱਚ ਲਾਜ਼ਮੀ ਤੌਰ ਤੇ ਨਹੀਂ। Realm role `admin` ਲਾਜ਼ਮੀ ਕਰਨ ਲਈ ਇਸ client ਲਈ ਇੱਕ
  protocol mapper ਕੌਂਫਿਗਰ ਕਰੋ ਜੋ `realm_access.roles` ਨੂੰ ਇਸਦੇ **ID token** ਵਿੱਚ
  ਸ਼ਾਮਲ ਕਰੇ, ਫਿਰ `oidcAdmissionClaim` ਨੂੰ
  `{ "path": "realm_access.roles", "values": ["admin"] }` ਤੇ ਸੈੱਟ ਕਰੋ।
  Role-only admission ਚਾਲੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇਸ client ਲਈ ਅਸਲ ID-token claim ਦੀ
  ਜਾਂਚ ਕਰੋ; ਐਪਲੀਕੇਸ਼ਨ access-token roles ਨਹੀਂ ਪੜ੍ਹਦੀ। IdP-ਪਾਸੇ token refusal
  ਵਾਧੂ ਸੁਰੱਖਿਆ ਦੇ ਸਕਦਾ ਹੈ, ਪਰ ਐਪਲੀਕੇਸ਼ਨ-ਪਾਸੇ ਦੀ ਇਸ ਜਾਂਚ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈ ਸਕਦਾ।
- ਸਫਲਤਾ ਤੇ ਇਹ ਬਿਲਕੁਲ ਉਹੀ 30-ਦਿਨਾਂ ਵਾਲਾ `auth_token` JWT ਜਾਰੀ ਕਰਦਾ ਹੈ ਜੋ
  password login ਜਾਰੀ ਕਰਦਾ ਹੈ (`src/app/api/auth/login/route.ts`), ਇਸ ਲਈ
  ਬਾਕੀ ਡੈਸ਼ਬੋਰਡ session pipeline (auto-refresh, cookie flags) ਵਿੱਚ ਕੋਈ ਬਦਲਾਅ
  ਨਹੀਂ ਹੁੰਦਾ — OIDC ਸਿਰਫ਼ ਇਹ ਬਦਲਦਾ ਹੈ ਕਿ ਕੁਕੀ ਕਿਵੇਂ ਜਾਰੀ ਹੁੰਦੀ ਹੈ, ਇਹ ਨਹੀਂ ਕਿ
  ਉਹ ਕੀ ਅਧਿਕਾਰ ਦਿੰਦੀ ਹੈ। IdP roles/groups ਵਿੱਚ ਬਦਲਾਅ ਮੌਜੂਦਾ OmniRoute sessions
  ਨੂੰ ਅਵੈਧ ਨਹੀਂ ਕਰਦੇ; logout, password rotation, ਜਾਂ session expiry ਅਜੇ ਵੀ
  ਉਨ੍ਹਾਂ ਦੀ ਮਿਆਦ ਨਿਰਧਾਰਤ ਕਰਦੇ ਹਨ।
- ਹਰ `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) ਵਿੱਚ
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) ਸ਼ਾਮਲ ਹੈ:
  `PATCH /api/settings` `400 PASSWORD_REQUIRED` ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਦੋਂ ਤੱਕ body ਵਿੱਚ
  management password `currentPassword` ਵਜੋਂ ਨਾ ਦਿੱਤਾ ਗਿਆ ਹੋਵੇ
  (`401 PASSWORD_MISMATCH` ਜਦੋਂ ਇਹ ਗਲਤ ਹੋਵੇ)। `oidcDisablePasswordLogin`
  password _login_ (`POST /api/auth/login`) ਨੂੰ ਅਸਵੀਕਾਰ ਕਰਦਾ ਹੈ, ਪਰ ਸਟੋਰ ਕੀਤਾ
  password hash ਕਾਇਮ ਰੱਖਦਾ ਹੈ, ਅਤੇ re-auth ਅਜੇ ਵੀ `currentPassword` ਦੀ ਉਸ ਨਾਲ
  ਜਾਂਚ ਕਰਦਾ ਹੈ।
- `corsOrigins` ਅਤੇ `bruteForceProtection` ਵੀ
  `SECURITY_IMPACTING_SETTINGS_KEYS` ਵਿੱਚ ਹਨ: ਕਿਸੇ ਵੀ ਇੱਕ ਨੂੰ ਢਿੱਲਾ ਕਰਨਾ
  login defenses ਨੂੰ ਕਮਜ਼ੋਰ ਕਰਦਾ ਹੈ, ਇਸ ਲਈ ਇਹ ਵੀ ਉਹੀ `currentPassword`
  re-auth ਲਾਜ਼ਮੀ ਕਰਦੇ ਹਨ (Security tab ਇਸਦੀ ਮੰਗ ਕਰਦਾ ਹੈ), ਅਤੇ JSON import
  ਇਨ੍ਹਾਂ ਨੂੰ ਹਟਾ ਦਿੰਦਾ ਹੈ।
- ਹਰ security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS` ਦੀਆਂ entries,
  ਹਰ `oidc*` key ਅਤੇ dashboard session state — `PATCH /api/settings` ਤੇ
  **operator-only** ਹੈ: manage-scoped API key ਜਾਂ `oma_` access token ਨੂੰ
  `403` ਨਾਲ ਅਸਵੀਕਾਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਭਾਵੇਂ ਉਹ ਸਹੀ `currentPassword` ਭੇਜੇ, ਅਤੇ
  ਇਸ ਅਸਵੀਕਾਰਤਾ ਦਾ audit `settings.update_failed` ਵਜੋਂ
  `reason: OPERATOR_REQUIRED` ਨਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ
  (`requireOperatorCredential()` in `src/lib/api/operatorCredential.ts`)।
  ਆਮ settings (theme, display preferences) `manage` key ਜਾਂ `admin` access token
  ਲਈ ਲਿਖਣਯੋਗ ਰਹਿੰਦੀਆਂ ਹਨ। `/api/settings` ਖੁਦ (ਅਤੇ
  `/api/settings/require-login`) ਦੀ ਹਰ mutation ਲਈ ਵੀ `admin` access-token
  scope ਲਾਜ਼ਮੀ ਹੈ (`ADMIN_MUTATION_EXACT_PATHS` in
  `src/server/authz/accessScopes.ts`, exact-path match); `GET` ਲਈ `read` ਹੀ
  ਰਹਿੰਦਾ ਹੈ, ਅਤੇ ਹੋਰ `/api/settings/*` sub-routes (proxies, combo defaults,
  model aliases, compression, purges…) method-inferred `write` scope ਹੀ
  ਵਰਤਦੀਆਂ ਹਨ।
- `POST /api/settings/import-json` ਉਹ re-auth ਛੱਡ ਦਿੰਦਾ ਹੈ, ਇਸ ਲਈ ਲਿਖਣ ਤੋਂ
  ਪਹਿਲਾਂ ਇਹ `IMPORT_STRIPPED_SETTINGS_KEYS` (ਉਸੇ file) ਵਿੱਚ ਦਿੱਤੀ ਹਰ key ਨੂੰ
  ਹਟਾ ਦਿੰਦਾ ਹੈ: password ਅਤੇ `currentPassword`, ਹਰ
  `SECURITY_IMPACTING_SETTINGS_KEYS` entry, ਅਤੇ dashboard session state
  (`sessionsValidAfter`, `revokedDashboardSessions`)। ਇਸ ਲਈ ਪੁਰਾਣੇ backup ਨੂੰ
  import ਕਰਨ ਨਾਲ ਉਹ session ਮੁੜ ਸਰਗਰਮ ਨਹੀਂ ਹੋ ਸਕਦਾ ਜਿਸਨੂੰ password ਬਦਲਾਅ ਜਾਂ
  sign-out ਪਹਿਲਾਂ ਹੀ ਸਮਾਪਤ ਕਰ ਚੁੱਕਾ ਹੈ।

#### ਵਿਕਲਪਿਕ TOTP ਦੋ-ਕਾਰਕ login (#16619)

Settings → Security ਤੋਂ enroll ਕੀਤਾ ਜਾਂਦਾ ਹੈ; operator ਵੱਲੋਂ ਇਸਨੂੰ ਚਾਲੂ ਕਰਨ ਤੱਕ
ਬੰਦ ਰਹਿੰਦਾ ਹੈ (`src/server/auth/dashboardMfa.ts`)।

- **ਇਸ ਵਿੱਚ ਕੀ ਸ਼ਾਮਲ ਹੈ:** ਪਾਸਵਰਡ ਲੌਗਇਨ (`POST /api/auth/login`, ਜਿਸ ਤੋਂ ਬਾਅਦ
  `POST /api/auth/mfa/verify` ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ) ਅਤੇ `omniroute connect` (`POST /api/cli/connect`,
  ਜੋ ਸਿਰਫ਼ ਪਾਸਵਰਡ ਵਾਲੇ ਅਦਾਨ-ਪ੍ਰਦਾਨ ਨੂੰ ਅਸਵੀਕਾਰ ਕਰਦਾ ਹੈ ਅਤੇ ਕੋਡ ਨੂੰ `totp` ਵਜੋਂ ਲੈਂਦਾ ਹੈ)।
- **ਇਸ ਵਿੱਚ ਕੀ ਸ਼ਾਮਲ ਨਹੀਂ ਹੈ:** OIDC / SSO ਸਾਈਨ-ਇਨ (`/api/auth/oidc/callback`) ਲਈ
  OmniRoute TOTP ਨਹੀਂ ਮੰਗਿਆ ਜਾਂਦਾ। ਇਹ ਪਛਾਣ ਪ੍ਰਦਾਤਾ ਦੇ ਆਪਣੇ ਦੂਜੇ ਕਾਰਕ 'ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ,
  ਇਸ ਲਈ ਜੇ OIDC ਸਮਰੱਥ ਹੈ ਤਾਂ IdP ਵਿੱਚ MFA ਲਾਗੂ ਕਰੋ।
- **ਰਿਕਵਰੀ** (ਡਿਵਾਈਸ ਗੁੰਮ ਹੋਣ, ਕੋਈ ਰਿਕਵਰੀ ਕੋਡ ਬਾਕੀ ਨਾ ਰਹਿਣ, ਜਾਂ ਕਿਸੇ ਅਜਿਹੇ ਕਾਰਕ ਦੀ
  ਪੁਸ਼ਟੀ ਨਾ ਹੋ ਸਕਣ ਦੀ ਸਥਿਤੀ ਵਿੱਚ, ਉਦਾਹਰਨ ਲਈ `STORAGE_ENCRYPTION_KEY` ਬਦਲਣ ਤੋਂ ਬਾਅਦ):
  1. ਸਰਵਰ ਨੂੰ `OMNIROUTE_DISABLE_MFA=true` ਨਾਲ ਮੁੜ ਚਾਲੂ ਕਰੋ।
  2. ਖੁਦ ਹੋਸਟ 'ਤੇ (ਲੂਪਬੈਕ ਪੀਅਰ ਅਤੇ ਲੂਪਬੈਕ `Host`, ਜਿਵੇਂ
     `http://localhost:20128`), ਪਾਸਵਰਡ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ। ਦੂਜਾ ਕਾਰਕ ਸਿਰਫ਼ ਉਸ origin ਲਈ
     ਛੱਡਿਆ ਜਾਂਦਾ ਹੈ; ਹਰ ਹੋਰ origin ਲਈ ਹਾਲੇ ਵੀ ਕੋਡ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।
  3. ਸੈਟਿੰਗਾਂ → ਸੁਰੱਖਿਆ → ਅਯੋਗ ਕਰੋ ਵਿੱਚ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ ਅਤੇ ਕੋਡ ਖਾਲੀ ਛੱਡੋ।
     `POST /api/auth/mfa/disable` ਸਿਰਫ਼ ਉਸ ਵੇਲੇ `code` ਤੋਂ ਬਿਨਾਂ ਬਾਡੀ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ ਜਦੋਂ
     ਵੇਰੀਏਬਲ ਸੈੱਟ ਹੋਵੇ ਅਤੇ ਬੇਨਤੀ ਹੋਸਟ ਤੋਂ ਆਈ ਹੋਵੇ; ਇਸ ਲਈ ਹਾਲੇ ਵੀ
     ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਅਤੇ ਮੌਜੂਦਾ ਪਾਸਵਰਡ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਇਸਨੂੰ
     `auth.mfa.disabled` ਵਜੋਂ `secondFactor: "recovery_switch"` ਦੇ ਨਾਲ ਆਡਿਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
  4. `OMNIROUTE_DISABLE_MFA` ਨੂੰ ਅਨਸੈੱਟ ਕਰੋ, ਮੁੜ ਚਾਲੂ ਕਰੋ, ਅਤੇ ਲੋੜ ਪੈਣ 'ਤੇ ਦੁਬਾਰਾ ਨਾਮਾਂਕਨ ਕਰੋ।

## ਰੂਟ ਕਲਾਸਾਂ

`src/server/authz/types.ts` ਤਿੰਨ ਕਲਾਸਾਂ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦਾ ਹੈ; ਕੋਈ ਵੀ ਰੂਟ ਜਿਸਨੂੰ ਨਿਰਣਾਇਕ ਤੌਰ 'ਤੇ ਵਰਗੀਕ੍ਰਿਤ ਨਾ ਕੀਤਾ ਜਾ ਸਕੇ, `MANAGEMENT` 'ਤੇ ਡਿੱਗ ਜਾਂਦਾ ਹੈ।

| ਕਲਾਸ         | ਵੇਰਵਾ                                                                                                                                        | ਲੋੜੀਂਦਾ ਪ੍ਰਮਾਣੀਕਰਨ                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | ਸਪੱਸ਼ਟ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਰੂਟ — ਲੌਗਇਨ, ਲੌਗਆਉਟ, ਸਥਿਤੀ, ਸ਼ੁਰੂਆਤ, ਹੈਲਥ, ਔਨਬੋਰਡਿੰਗ ਬੂਟਸਟ੍ਰੈਪ।                                                      | ਕੋਈ ਨਹੀਂ                                                        |
| `CLIENT_API` | ਮਾਡਲ-ਸੇਵਾ ਐਂਡਪੌਇੰਟ — `/api/v1/*`, `/api/v1beta/*`, ਅਤੇ ਉਪਨਾਮ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | Bearer ਕੁੰਜੀ ਜਦੋਂ ਪ੍ਰਭਾਵੀ `REQUIRE_API_KEY` ਫੀਚਰ ਫਲੈਗ ਚਾਲੂ ਹੋਵੇ |
| `MANAGEMENT` | ਡੈਸ਼ਬੋਰਡ ਪੰਨੇ, ਸੈਟਿੰਗਾਂ, ਪ੍ਰਦਾਤਾ, ਕੁੰਜੀਆਂ, ਐਡਮਿਨ ਅਤੇ ਡਾਇਗਨੌਸਟਿਕ ਐਂਡਪੌਇੰਟ।                                                                    | ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਜਾਂ `manage` ਸਕੋਪ ਵਾਲਾ Bearer                    |

ਕੁਝ `MANAGEMENT` ਕਾਰਵਾਈਆਂ **ਸਿਰਫ਼ ਓਪਰੇਟਰ** ਲਈ ਹਨ: `manage` ਕੁੰਜੀ ਕਾਫ਼ੀ ਨਹੀਂ। ਸਟੋਰ ਕੀਤੇ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਐਕਸਪੋਰਟ ਕਰਨਾ (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), ਲਾਈਵ ਡੇਟਾ ਉੱਤੇ ਬੈਕਅੱਪ ਰੀਸਟੋਰ ਕਰਨਾ (`dryRun=true` ਸਮੇਤ `POST /api/db-backups/import`, ਆਈਡੀ ਰਾਹੀਂ ਰੀਸਟੋਰ `POST /api/db-backups`, `POST /api/settings/import-json`), ਅਤੇ ਰੀਸਟੋਰ ਪੌਇੰਟ ਨਸ਼ਟ ਕਰਨਾ (`DELETE /api/db-backups` ਸਫਾਈ, ਅਤੇ `PATCH /api/db-backups` ਕਿਉਂਕਿ ਇਹ ਜੋ ਰੱਖ-ਰਖਾਵ ਸੰਭਾਲਦਾ ਹੈ ਉਹ ਹਰ ਬੈਕਅੱਪ ਤੋਂ ਬਾਅਦ ਆਟੋਮੈਟਿਕ ਛਾਂਟੀ ਚਲਾਉਂਦਾ ਹੈ) ਲਈ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ, ਲੋਕਲ CLI ਸਬਜੈਕਟ, ਜਾਂ ਲੌਗਇਨ ਬੰਦ ਹੋਣਾ ਲੋੜੀਂਦਾ ਹੈ। ਸਿੰਕ ਟੋਕਨ ਜਾਰੀ ਕਰਨਾ (`POST /api/sync/tokens`) ਅਤੇ `admin` CLI ਐਕਸੈੱਸ ਟੋਕਨ ਬਣਾਉਣਾ (`POST /api/cli/tokens`) ਹਰ ਲੌਗਇਨ ਮੋਡ ਵਿੱਚ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਜਾਂ ਲੋਕਲ CLI ਸਬਜੈਕਟ ਮੰਗਦੇ ਹਨ। ਕਿਸੇ ਵੀ ਸਕੋਪ ਦੀਆਂ API ਕੁੰਜੀਆਂ ਅਤੇ `oma_` ਐਕਸੈੱਸ ਟੋਕਨ ਓਪਰੇਟਰ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਨਹੀਂ ਹਨ: ਜਦੋਂ ਵੀ ਇਹ ਲੋੜੀਂਦਾ ਹੋਵੇ, ਉਹਨਾਂ ਨੂੰ `403` ਮਿਲਦਾ ਹੈ। ਇਹ ਜਾਂਚ `src/lib/api/operatorCredential.ts` ਵਿੱਚ ਹੈ (`resolveOperatorCredential()` / `requireOperatorCredential()`)। ਲੌਗਇਨ ਸੈਟਿੰਗਾਂ ਬਦਲਣਾ ਵੀ ਸਿਰਫ਼ ਓਪਰੇਟਰ ਲਈ ਹੈ: `POST /api/settings/require-login` (ਪ੍ਰਬੰਧਨ ਪਾਸਵਰਡ ਸੈੱਟ ਕਰਨਾ / `requireLogin` ਟੌਗਲ ਕਰਨਾ) ਇੱਕ ਵਾਰ ਪਾਸਵਰਡ ਮੌਜੂਦ ਹੋਣ 'ਤੇ ਸਿਰਫ਼ ਉਹੀ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ — ਪਹਿਲੀ-ਵਾਰ ਬੂਟਸਟ੍ਰੈਪ ਵਿੰਡੋ (ਅਜੇ ਪਾਸਵਰਡ ਨਹੀਂ) ਨਹੀਂ ਬਦਲਦੀ — ਅਤੇ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਨੂੰ ਪਾਸਵਰਡ ਬਦਲਣ ਲਈ `currentPassword` ਭੇਜਣਾ ਪੈਂਦਾ ਹੈ (ਗੈਰ-ਮੌਜੂਦ ਜਾਂ ਗਲਤ ਹੋਣ 'ਤੇ `403`, `settings.update_failed` ਵਜੋਂ ਆਡਿਟ ਹੁੰਦਾ ਹੈ)। ਲੋਕਲ CLI ਅਤੇ ਲੌਗਇਨ ਬੰਦ ਵਾਲਾ ਇੰਸਟੈਂਸ ਰਿਕਵਰੀ ਰਸਤਾ ਰੱਖਦੇ ਹਨ ਅਤੇ ਇਸ ਤੋਂ ਬਿਨਾਂ ਪਾਸਵਰਡ ਸੈੱਟ ਕਰ ਸਕਦੇ ਹਨ, ਕਿਉਂਕਿ ਦੋਵੇਂ ਉਸ ਹੋਸਟ ਨਾਲ ਬੱਝੇ ਹਨ ਜੋ ਡੇਟਾ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਲਕ ਹੈ।

## ਪਾਈਪਲਾਈਨ

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

ਭਰੋਸੇਯੋਗ ਅੰਦਰੂਨੀ ਸਿਰਲੇਖ ( `src/server/authz/headers.ts` ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ) ਹਨ** ਆਉਣ ਵਾਲੀਆਂ ਬੇਨਤੀਆਂ ਤੋਂ ਹਟਾ ਦਿੱਤਾ ਗਿਆ** ਵਰਗੀਕਰਨ ਤੋਂ ਪਹਿਲਾਂ — ਕਲਾਇੰਟ ਕਿਸੇ ਵਿਸ਼ੇ ਦੀ ਨਕਲ ਕਰਨ ਲਈ `x-omniroute-auth-*` ਪਹਿਲਾਂ ਤੋਂ ਤਿਆਰ ਨਹੀਂ ਕਰ ਸਕਦੇ ਹਨ।

### ਨੀਤੀ ਦੇ ਠੇਕੇ

ਹਰੇਕ ਰੂਟ ਕਲਾਸ ਦੀ `src/server/authz/policies/` ਵਿੱਚ ਇੱਕ ਨੀਤੀ ਹੈ:

- **`publicPolicy`** (`policies/public.ts`) — ਹਮੇਸ਼ਾ `allow({ kind: "anonymous", id: "anonymous" })` ਵਾਪਸ ਕਰਦਾ ਹੈ।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ਬੇਅਰਰ ਨੂੰ ਕੱਢਦਾ ਹੈ, `validateApiKey()` ਰਾਹੀਂ ਪ੍ਰਮਾਣਿਤ ਕਰਦਾ ਹੈ। ਉਦੋਂ ਹੀ ਗੁਮਨਾਮ 'ਤੇ ਡਿੱਗਦਾ ਹੈ ਜਦੋਂ ਪ੍ਰਭਾਵੀ `REQUIRE_API_KEY` ਵਿਸ਼ੇਸ਼ਤਾ ਫਲੈਗ ਅਸਮਰੱਥ ਹੁੰਦਾ ਹੈ। ਪ੍ਰਭਾਵੀ ਫਲੈਗ ਨੂੰ `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ਦੁਆਰਾ ਹੱਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਇਸਲਈ ਡੈਸ਼ਬੋਰਡ ਫੀਚਰ ਫਲੈਗ ਅਤੇ ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲ `/api/v1/*`, `/api/v1beta/*`, ਅਤੇ ਉਪਨਾਮਾਂ ਨੂੰ ਲਗਾਤਾਰ ਨਿਯੰਤਰਿਤ ਕਰਦੇ ਹਨ; ਰਿਜ਼ੋਲਵਰ ਅਸਫਲਤਾਵਾਂ ਬੰਦ ਹੋ ਜਾਂਦੀਆਂ ਹਨ। ਕਲਾਇੰਟ API ਰੂਟਾਂ ( `/api/v1/models` ਸਮੇਤ, ਡੈਸ਼ਬੋਰਡ ਮਾਡਲ ਕੈਟਾਲਾਗ ਦੁਆਰਾ ਵਰਤੇ ਗਏ) 'ਤੇ ਡੈਸ਼ਬੋਰਡ-ਸ਼ੈਸ਼ਨ ਬੇਨਤੀਆਂ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ। ਜਦੋਂ Entra ID SSO ਸਮਰਥਿਤ ਹੁੰਦਾ ਹੈ, ਤਾਂ ਇੱਕ ਬੇਅਰਰ ਜੋ ਕਿ ਢਾਂਚਾਗਤ ਤੌਰ 'ਤੇ ਇੱਕ Entra ਟੋਕਨ ਹੁੰਦਾ ਹੈ (ਤਿੰਨ base64url ਖੰਡ, `RS*` alg, `kid`) ਨੂੰ SSO ਸ਼ਾਖਾ ਦੁਆਰਾ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ।** ਅੱਗੇ** `validateApiKey()` ਅਤੇ ਇਸਦਾ ਫੈਸਲਾ ਅੰਤਿਮ — ਹੈ ਇਹ ਕਦੇ ਵੀ API-ਕੁੰਜੀ ਮਾਰਗ ਜਾਂ ਡੀਗਰੇਡ-ਟੂ-ਅਨਾਮ ਬ੍ਰਾਂਚ ਵਿੱਚ ਨਹੀਂ ਆਉਂਦਾ ਹੈ, ਇਸਲਈ ਇੱਕ ਪਛਾਣ-ਪ੍ਰਦਾਤਾ ਆਊਟੇਜ ਖੁੱਲ੍ਹੀ ਪਹੁੰਚ ਨਹੀਂ ਬਣ ਸਕਦਾ। ਸਥਿਰ API ਕੁੰਜੀਆਂ ਪ੍ਰਭਾਵਿਤ ਨਹੀਂ ਹੁੰਦੀਆਂ ਹਨ। [Entra ID SSO](../security/ENTRA_SSO.md) ਦੇਖੋ।
- **`managementPolicy`** (`policies/management.ts`) — ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ, ਅੰਦਰੂਨੀ ਮਾਡਲ-ਸਿੰਕ ਬੇਨਤੀਆਂ ਨੂੰ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ ( `/api/providers/[name]/(sync-models|models)` ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ), ਜਾਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਛੱਡ ਦਿੰਦਾ ਹੈ ਜੇਕਰ `isAuthRequired()` ਗਲਤ ਵਾਪਸ ਕਰਦਾ ਹੈ। 403 (`AUTH_001`) ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਦੋਂ ਇੱਕ ਬੇਅਰਰ ਟੋਕਨ ਮੌਜੂਦ ਹੁੰਦਾ ਹੈ ਪਰ ਅਵੈਧ ਹੁੰਦਾ ਹੈ, ਨਹੀਂ ਤਾਂ 401। ਕਿਸੇ ਵੀ ਪ੍ਰਮਾਣਿਤ ਸ਼ਾਖਾ — [ਰੂਟ ਗਾਰਡ ਟੀਅਰਜ਼ ਨੂੰ](../security/ROUTE_GUARD_TIERS.md) ਦੇਖਣ ਤੋਂ ਪਹਿਲਾਂ ਰੂਟ-ਗਾਰਡ ਟੀਅਰਜ਼ (LOCAL_ONLY / ALWAYS_PROTECTED) ਨੂੰ ਵੀ ਲਾਗੂ ਕਰਦਾ ਹੈ। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ਅੱਜ: `/api/mcp/`) ਵਿੱਚ LOCAL_ONLY ਮਾਰਗਾਂ ਨੂੰ ਗੈਰ-ਲੂਪਬੈਕ ਤੋਂ ਐਕਸੈਸ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ ਜਦੋਂ ਬੇਅਰਰ ਕੁੰਜੀ `manage` ਸਕੋਪ ਨੂੰ ਲੈ ਕੇ ਜਾਂਦੀ ਹੈ; ਹੋਰ ਸਾਰੇ LOCAL_ONLY ਮਾਰਗ ਸਕੋਪ ਦੀ ਪਰਵਾਹ ਕੀਤੇ ਬਿਨਾਂ ਸਖਤ-ਲੂਪਬੈਕ ਰਹਿੰਦੇ ਹਨ।

ਇੱਕ ਸਫਲ ਨੀਤੀ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ਨਾਲ `AuthSubject` ਵਾਪਸ ਕਰਦੀ ਹੈ। ਡਾਊਨਸਟ੍ਰੀਮ ਹੈਂਡਲਰ ਇਸ ਨੂੰ `src/server/authz/assertAuth.ts` ਵਿੱਚ `assertAuth(request, "CLIENT_API")` ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ ਤਰਕ ਨੂੰ ਮੁੜ ਚਲਾਉਣ ਦੀ ਬਜਾਏ ਪੜ੍ਹ ਸਕਦੇ ਹਨ।

## ਜਨਤਕ ਰੂਟਾਂ ਦੀ ਸੂਚੀ

`src/shared/constants/publicApiRoutes.ts` ਸਪਸ਼ਟ allowlist ਹੈ:

ਸੂਚੀ ਨੂੰ **ਆਕਾਰ** ਅਨੁਸਾਰ ਵੰਡਿਆ ਗਿਆ ਹੈ, ਅਤੇ ਇਹ ਵੰਡ ਬਹੁਤ ਮਹੱਤਵਪੂਰਨ ਹੈ (GHSA-74g9-q8f6-793h): ਇੱਕ prefix ਨੂੰ
`startsWith()` ਨਾਲ ਮਿਲਾਇਆ ਜਾਂਦਾ ਹੈ, ਇਸ ਲਈ ਇਹ ਉਸੇ ਸ਼ੁਰੂਆਤੀ ਅੱਖਰਾਂ ਨੂੰ ਸਾਂਝਾ ਕਰਨ ਵਾਲੇ ਹਰ ਨਾਲ ਲੱਗਦੇ path ਨਾਲ ਵੀ ਮਿਲਦਾ ਹੈ।
`/api/usage/om-usage` ਨੂੰ prefix ਵਜੋਂ `/api/usage/om-usage<anything>` PUBLIC ਚਿੰਨ੍ਹਿਤ ਕਰਦਾ ਹੈ, ਅਤੇ Next ਇਸਨੂੰ
`/api/usage/[connectionId]` ਵਜੋਂ resolve ਕਰਦਾ ਹੈ — ਇੱਕ ਅਜਿਹਾ handler ਜਿਸਦੀ ਆਪਣੀ ਕੋਈ auth ਨਹੀਂ ਹੈ।

```ts
// ਅਸਲ subtrees। ਹਰ entry ਦਾ ਅੰਤ "/" ਨਾਲ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ (ਇੱਕ unit test ਦੁਆਰਾ assert ਕੀਤਾ ਜਾਂਦਾ ਹੈ)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify ਵਿੱਚ CLIENT_API ਵਜੋਂ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ, "no-auth public" ਵਜੋਂ ਨਹੀਂ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ਇਕੱਲੇ routes, ਜਿਨ੍ਹਾਂ ਦਾ ਮਿਲਾਨ EXACTLY ਹੁੰਦਾ ਹੈ (trailing slash ਦੇ ਨਾਲ ਜਾਂ ਬਿਨਾਂ)।
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP ਲਈ login ਪੜਾਅ 2; MFA-pending cookie ਦੀ ਲੋੜ ਹੈ
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// ਸਿਰਫ਼ ਪੜ੍ਹਨ ਲਈ ਇਕੱਲੇ routes, ਜਿਨ੍ਹਾਂ ਨੂੰ CORS origin relaxation ਵੀ ਮਿਲਦੀ ਹੈ।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// ਸਿਰਫ਼ ਪੜ੍ਹਨ ਲਈ ਇਕੱਲਾ route, ਜਿਸਨੂੰ CORS relaxation ਨਹੀਂ ਮਿਲਦੀ।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ਸਿਰਫ਼ safe methods ਲਈ read-only routes ਜਨਤਕ ਹਨ। ਧਿਆਨ ਦਿਓ: `classifyRoute()` PUBLIC fall-through ਵਿੱਚੋਂ `/api/v1/*` ਅਤੇ `/api/v1beta/*` ਨੂੰ ਬਾਹਰ ਰੱਖਦਾ ਹੈ — ਇਹ ਹਮੇਸ਼ਾਂ `CLIENT_API` ਹੁੰਦੇ ਹਨ, ਇਸ ਲਈ Bearer-key policy ਲਾਗੂ ਰਹਿੰਦੀ ਹੈ।

## ਨਵਾਂ ਰੂਟ ਜੋੜਨਾ

### ਪੈਟਰਨ 1 — ਸਰਵਜਨਿਕ ਕਲਾਇੰਟ API ਐਂਡਪੌਇੰਟ (Bearer-auth)

`/api/v1/` ਅਤੇ `/api/v1beta/` ਹੇਠਲੇ ਰੂਟ ਆਪਣੇ-ਆਪ `CLIENT_API` ਵਜੋਂ ਵਰਗੀਕ੍ਰਿਤ ਹੁੰਦੇ ਹਨ। ਮਿਡਲਵੇਅਰ Bearer ਜਾਂਚ ਲਾਗੂ ਕਰਦਾ ਹੈ; ਰੂਟ ਹੈਂਡਲਰਾਂ ਨੂੰ ਇਸਨੂੰ ਦੁਬਾਰਾ ਕਰਨ ਦੀ ਲੋੜ ਨਹੀਂ, ਪਰ ਲਾਭਦਾਇਕ ਹੋਣ 'ਤੇ ਉਹ ਸਬਜੈਕਟ ਪੜ੍ਹ ਸਕਦੇ ਹਨ।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ਹੈਂਡਲਰ ਲਾਜਿਕ
}
```

### ਪੈਟਰਨ 2 — ਪ੍ਰਬੰਧਨ ਐਂਡਪੌਇੰਟ (ਸੈਸ਼ਨ ਜਾਂ Bearer + manage)

`src/lib/api/requireManagementAuth.ts` ਤੋਂ `requireManagementAuth()` ਵਰਤੋ:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ਹੈਂਡਲਰ ਲਾਜਿਕ
}
```

ਸਫਲਤਾ 'ਤੇ `requireManagementAuth()` `null` ਵਾਪਸ ਕਰਦਾ ਹੈ, ਨਹੀਂ ਤਾਂ JSON ਗਲਤੀ `Response`:

- 401 `AUTH_001` "ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜੀਂਦਾ ਹੈ" — ਕੋਈ ਵੀ ਕਰੈਡੈਂਸ਼ਲ ਮੌਜੂਦ ਨਹੀਂ
- 403 — ਅਵੈਧ Bearer **ਜਾਂ** Bearer ਮੌਜੂਦ ਹੈ ਪਰ ਕੀ ਕੋਲ `manage` / `admin` ਸਕੋਪ ਨਹੀਂ ਹੈ

`hasManageScope(scopes)` `"manage"` ਜਾਂ `"admin"` ਲਈ true ਵਾਪਸ ਕਰਦਾ ਹੈ।

### ਪੈਟਰਨ 3 — ਸਰਵਜਨਿਕ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੂਚੀ ਵਿੱਚ ਜੋੜਨਾ

ਸਹੂਲਤ ਦੇ ਆਧਾਰ 'ਤੇ ਨਹੀਂ, ਸਗੋਂ ਆਕਾਰ ਦੇ ਆਧਾਰ 'ਤੇ ਸੈੱਟ ਚੁਣੋ। ਇੱਕ ਰੂਟ `PUBLIC_API_ROUTES_EXACT` ਵਿੱਚ ਜਾਂਦਾ ਹੈ (ਜਾਂ ਕੇਵਲ-GET ਲਈ `PUBLIC_READONLY_CORS_API_ROUTES` ਵਿੱਚ); ਕੇਵਲ ਇੱਕ ਅਸਲ ਸਬਟ੍ਰੀ ਹੀ `PUBLIC_API_ROUTE_PREFIXES` ਵਿੱਚ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਇਸਦਾ ਅੰਤ `/` ਨਾਲ ਹੋਣਾ **ਲਾਜ਼ਮੀ ਹੈ**। ਪ੍ਰੀਫਿਕਸ ਸੂਚੀ ਵਿੱਚ ਇੱਕ ਇਕੱਲਾ ਰੂਟ ਪਾਉਣ ਨਾਲ ਉਹ ਸਾਰੇ ਨਾਲ ਲੱਗਦੇ ਪਾਥ ਵੀ ਸਰਵਜਨਿਕ ਹੋ ਜਾਂਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਦੇ ਸ਼ੁਰੂਆਤੀ ਅੱਖਰ ਇੱਕੋ ਹਨ — ਇਸ ਵਿੱਚ ਬਾਅਦ ਵਿੱਚ ਜੋੜੇ ਗਏ ਡਾਇਨਾਮਿਕ-ਸੈਗਮੈਂਟ ਸਿਬਲਿੰਗ ਵੀ ਸ਼ਾਮਲ ਹਨ (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ਅਤੇ `tests/unit/authz/classify.test.ts` ਵਿੱਚ ਯੂਨਿਟ ਟੈਸਟ ਅੱਪਡੇਟ ਕਰੋ।

## ਸਕੋਪਸ

ਤਿੰਨ ਨਾਮਸਪੇਸ। ਹਰੇਕ ਚੈਕਰ ਸਿਰਫ਼ ਆਪਣੀਆਂ ਸਤਰਾਂ ਪੜ੍ਹਦਾ ਹੈ। ਨਾਲ-ਨਾਲ, ਜਿਸ ਵਿੱਚ ਇਹ ਵੀ ਸ਼ਾਮਲ ਹੈ ਕਿ `manage` `read:compression` ਲਈ `scopeMatches` ਵਿੱਚ ਕਿਉਂ ਫੇਲ੍ਹ ਹੁੰਦਾ ਹੈ ਅਤੇ ਇੱਕ `read` ਐਕਸੈਸ ਟੋਕਨ `PATCH /api/keys/{id}` ਕਿਉਂ ਨਹੀਂ ਕਰ ਸਕਦਾ, ਉਹ ਹੈ [ਤਿੰਨ ਸਕੋਪ ਨਾਮਸਪੇਸ](../frameworks/MCP-SERVER.md#three-scope-namespaces)।

API ਕੁੰਜੀਆਂ ਇੱਕ `scopes` ਐਰੇ ਰੱਖਦੀਆਂ ਹਨ (ਜੋ `api_keys.scopes` ਵਿੱਚ JSON ਵਜੋਂ ਸਟੋਰ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ, ਦੇਖੋ `src/lib/db/apiKeys.ts`)।

### ਪ੍ਰਬੰਧਨ ਸਕੋਪ

- `manage` / `admin` — `hasManageScope`। ਪ੍ਰਬੰਧਨ API ਰੂਟਾਂ ਤੱਕ ਬੀਅਰਰ ਪਹੁੰਚ।
- `mcp:connect`, `self:usage`, `self:account-quota`, ਅਤੇ
  `policy:bypass-provider-quota` ਐਡਿਟਿਵ ਐਗਜ਼ੈਕਟ-ਮੈਚ ਸਕੋਪ ਹਨ। ਉਹ
  `MANAGEMENT_API_KEY_SCOPES` ਤੋਂ ਬਾਹਰ ਹਨ। `mcp:connect` ਸਿਰਫ਼
  `/api/mcp/` ਨਾਨ-ਲੂਪਬੈਕ ਕਾਰਵ-ਆਊਟ ਖੋਲ੍ਹਦਾ ਹੈ।

### MCP ਟੂਲ ਸਕੋਪਸ

ਕੈਟਾਲਾਗ ਅਤੇ ਮੈਚਿੰਗ ਨਿਯਮ (ਇੱਕੋ ਜਿਹੀ ਸਤਰ, ਜਾਂ ਇੱਕ ਗ੍ਰਾਂਟਡ ਸਕੋਪ ਜੋ `*` ਨਾਲ ਖਤਮ ਹੁੰਦਾ ਹੈ):
[MCP ਟੂਲ ਸਕੋਪਸ](../frameworks/MCP-SERVER.md#mcp-tool-scopes)।
`src/shared/constants/mcpScopes.ts` ਵਿੱਚ `MCP_SCOPE_LIST` ਅਸਲੀ ਟਾਈਪਡ
ਸਬਸੈੱਟ ਹੈ, ਨਾ ਕਿ ਉਹ ਪੂਰਾ ਕੈਟਾਲਾਗ। ਲਾਗੂਕਰਨ
`open-sse/mcp-server/scopeEnforcement.ts` ਵਿੱਚ ਚੱਲਦਾ ਹੈ ਜਦੋਂ `resolveCallerScopeContext()`
MCP ਪ੍ਰਮਾਣਿਕਤਾ ਜਾਣਕਾਰੀ, ਬੇਨਤੀ ਮੈਟਾਡੇਟਾ, ਜਾਂ `OMNIROUTE_MCP_SCOPES` ਤੋਂ ਸਕੋਪਾਂ ਨੂੰ ਹੱਲ ਕਰਦਾ ਹੈ।
ਇਹ ਉਦੋਂ ਤੱਕ ਬੰਦ ਰਹਿੰਦਾ ਹੈ ਜਦੋਂ ਤੱਕ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` ਨਹੀਂ ਹੁੰਦਾ।

### ਐਕਸੈਸ-ਟੋਕਨ ਸਕੋਪਸ

`oma_live_…` ਟੋਕਨਾਂ 'ਤੇ `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) ਦੁਆਰਾ ਦਰਜਾਬੰਦੀ ਕੀਤੀ ਗਈ। ਇਹ ਰੈਂਕ ਸਿਰਫ਼ ਐਕਸੈਸ-ਟੋਕਨ
ਪ੍ਰਮਾਣ ਪੱਤਰ 'ਤੇ ਲਾਗੂ ਹੁੰਦਾ ਹੈ। ਦੇਖੋ [ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣਿਕਤਾ](../guides/MANAGEMENT-AUTH.md)।

## ਔਥ ਲੋੜੀਂਦਾ ਟੌਗਲ

`src/shared/utils/apiAuth.ts` ਵਿੱਚ `isAuthRequired()` ਫੈਸਲਾ ਕਰਦਾ ਹੈ ਕਿ ਕਿਸੇ ਬੇਨਤੀ ਲਈ **ਕੋਈ ਵੀ** ਪ੍ਰਮਾਣੀਕਰਨ ਲਾਗੂ ਹੋਵੇਗਾ ਜਾਂ ਨਹੀਂ:

- `settings.requireLogin === false` → ਪ੍ਰਮਾਣੀਕਰਨ ਵਿਸ਼ਵ-ਪੱਧਰ 'ਤੇ ਬੰਦ ਹੈ, ਸਿਵਾਏ ਹਮੇਸ਼ਾ-ਸੁਰੱਖਿਅਤ ਟੀਅਰ (ਵੇਖੋ [ਰੂਟ ਗਾਰਡ ਟੀਅਰ](../security/ROUTE_GUARD_TIERS.md)) ਅਤੇ ਉਹਨਾਂ ਕਾਲਾਂ ਦੇ ਜੋ ਉਹ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਦਿੰਦੀਆਂ ਹਨ ਜੋ ਇਹ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ — ਇਹਨਾਂ ਨੂੰ ਉਹੀ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਚਾਹੀਦਾ ਹੈ ਜਿਵੇਂ ਲੌਗਇਨ ਚਾਲੂ ਹੋਣ 'ਤੇ: ਸਿੰਕ ਟੋਕਨ ਜਾਰੀ ਕਰਨਾ, ਕਿਸੇ ਵੀ ਸਕੋਪ 'ਤੇ CLI ਐਕਸੈੱਸ ਟੋਕਨ ਬਣਾਉਣਾ, ਅਤੇ `manage`/`admin` ਸਕੋਪ ਵਾਲੀ API ਕੁੰਜੀ ਬਣਾਉਣਾ, ਉਸ ਸਕੋਪ ਨੂੰ ਕਿਸੇ ਕੁੰਜੀ ਨੂੰ ਦੇਣਾ, ਜਾਂ ਅਜਿਹੀ ਕੁੰਜੀ ਨੂੰ ਮੁੜ-ਬਣਾਉਣਾ ਜਾਂ ਦਿਖਾਉਣਾ (`src/lib/api/requireManagementAuth.ts` ਵਿੱਚ `requireCredentialForManagementScopedKey()`)। ਇਨਫਰੈਂਸ-ਸਿਰਫ਼ ਕੁੰਜੀਆਂ ਖੁੱਲ੍ਹੀਆਂ ਰਹਿੰਦੀਆਂ ਹਨ।
- ਕੋਈ ਪਾਸਵਰਡ ਸੰਰਚਿਤ ਨਹੀਂ **ਅਤੇ** ਕੋਈ `INITIAL_PASSWORD` ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲ ਨਹੀਂ → ਬੂਟਸਟ੍ਰੈਪ ਮੋਡ ਔਨਬੋਰਡਿੰਗ ਵਿਜ਼ਾਰਡ ਅਤੇ ਲੋਕਲ ਬੇਨਤੀਆਂ ਦੀ ਇਜਾਜ਼ਤ ਦਿੰਦਾ ਹੈ, ਪਰ ਬਾਹਰੀ ਨੈੱਟਵਰਕ ਬੇਨਤੀਆਂ ਨੂੰ ਅਜੇ ਵੀ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਚਾਹੀਦੇ ਹਨ।
- ਕੋਈ ਵੀ DB ਗਲਤੀ → ਬੰਦ ਹੋ ਕੇ ਫੇਲ੍ਹ ਹੁੰਦਾ ਹੈ (ਡਿਫਾਲਟ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ)।

ਕਲਾਇੰਟ API ਕੁੰਜੀ ਲਾਗੂਕਰਨ `src/shared/utils/featureFlags.ts` ਵਿੱਚ `isRequireApiKeyEnabled()` ਵਰਤਦਾ ਹੈ, ਨਾ ਕਿ ਸਿੱਧਾ `process.env.REQUIRE_API_KEY` ਪੜ੍ਹਨਾ। ਇਹ ਤਾਇਨਾਤ ਇੰਸਟੈਂਸਾਂ ਲਈ ਮਾਇਨੇ ਰੱਖਦਾ ਹੈ: ਡੈਸ਼ਬੋਰਡ → Feature Flags ਵਿੱਚ `REQUIRE_API_KEY` ਬਦਲਣ ਨਾਲ DB ਓਵਰਰਾਈਡ ਸਟੋਰ ਹੁੰਦਾ ਹੈ ਅਤੇ ਤੁਰੰਤ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ਅਤੇ ਹੋਰ ਕਲਾਇੰਟ-API ਪ੍ਰਮਾਣੀਕਰਨ ਜਾਂਚਾਂ 'ਤੇ ਅਸਰ ਪਾਉਂਦਾ ਹੈ, ਜੋ ਇਸ ਹੈਲਪਰ ਨੂੰ ਸਾਂਝਾ ਕਰਦੀਆਂ ਹਨ। ਜੇ ਫੀਚਰ ਫਲੈਗ ਸਟੋਰ ਪੜ੍ਹਿਆ ਨਾ ਜਾ ਸਕੇ, ਤਾਂ ਕਲਾਇੰਟ API ਪ੍ਰਮਾਣੀਕਰਨ ਬੰਦ ਹੋ ਕੇ ਫੇਲ੍ਹ ਹੁੰਦਾ ਹੈ ਅਤੇ ਕੁੰਜੀ ਲਾਜ਼ਮੀ ਕਰਦਾ ਹੈ।

## ਅਸੰਗਤ ਤਬਦੀਲੀ — v3.8.0

`/api/v1/agents/tasks/*` ਅਤੇ `/api/resilience/model-cooldowns` ਐਂਡਪੌਇੰਟਾਂ ਲਈ **ਹੁਣ ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜੀਂਦਾ ਹੈ** (ਕਮਿਟ `588a0333`)। ਪਹਿਲਾਂ `manage` ਸਕੋਪ ਤੋਂ ਬਿਨਾਂ ਆਮ API ਕੁੰਜੀ ਭੇਜਣ ਵਾਲੇ ਕਲਾਇੰਟਾਂ ਨੂੰ `403` ਪ੍ਰਾਪਤ ਹੁੰਦਾ ਹੈ। ਮਾਈਗ੍ਰੇਸ਼ਨ: ਜਾਂ ਤਾਂ API Keys ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਕੁੰਜੀ ਨੂੰ `manage` ਸਕੋਪ ਦਿਓ, ਜਾਂ ਲੌਗ-ਇਨ ਕੀਤੇ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਦੀ ਵਰਤੋਂ ਕਰੋ।

## ਵਿਵਹਾਰ ਤਬਦੀਲੀ — v3.8.2

`/api/mcp/*` (ਰਿਮੋਟ MCP ਸਰਵਰ) ਹਾਲੇ ਵੀ ਮੂਲ ਰੂਪ ਵਿੱਚ LOCAL_ONLY ਹੈ, ਪਰ ਹੁਣ ਇਹ ਗੈਰ-ਲੂਪਬੈਕ ਬੇਨਤੀਆਂ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ ਜਦੋਂ `Authorization: Bearer <api-key>` ਹੈਡਰ ਵਿੱਚ `manage` ਸਕੋਪ ਮੌਜੂਦ ਹੋਵੇ। ਇਸ ਛੋਟ ਨੂੰ `src/server/authz/routeGuard.ts` ਵਿੱਚ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ਰਾਹੀਂ ਹਰੇਕ ਪਾਥ ਲਈ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਨਿਯੰਤਰਿਤ ਕੀਤਾ ਗਿਆ ਹੈ; ਸਮਾਨ LOCAL_ONLY ਪ੍ਰੀਫਿਕਸ `/api/cli-tools/runtime/*` ਨੂੰ ਜਾਣ-ਬੁੱਝ ਕੇ ਬਾਈਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਕਿਉਂਕਿ ਇਹ ਮਨਮਾਨੀਆਂ ਸਬ-ਪ੍ਰਕਿਰਿਆਵਾਂ ਸ਼ੁਰੂ ਕਰ ਸਕਦਾ ਹੈ। ਗੈਰ-ਲੂਪਬੈਕ ਤੋਂ `/api/mcp/*` ਲਈ ਅਗਿਆਤ ਬੇਨਤੀਆਂ ਨੂੰ ਅਜੇ ਵੀ `403 LOCAL_ONLY` ਮਿਲਦਾ ਹੈ — ਕਿਸੇ ਵੀ ਨਵੇਂ LOCAL_ONLY ਪਾਥ ਲਈ ਮੂਲ ਨੀਤੀ ਸਖ਼ਤ-ਲੂਪਬੈਕ ਹੀ ਰਹਿੰਦੀ ਹੈ। [ਰੂਟ ਗਾਰਡ ਪੱਧਰ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ਵੇਖੋ।

## ਟੈਸਟਿੰਗ

- ਯੂਨਿਟ ਟੈਸਟ: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- ਜਨਤਕ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੂਚੀ: `tests/unit/public-api-routes.test.ts`।
- ਕੇਂਦ੍ਰਿਤ ਟੈਸਟ ਚਲਾਓ: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## ਡੀਬੱਗਿੰਗ

ਪਾਈਪਲਾਈਨ ਹਮੇਸ਼ਾ ਜਵਾਬਾਂ 'ਤੇ ਮੋਹਰ ਲਗਾਉਂਦੀ ਹੈ:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ਪ੍ਰਮਾਣਿਤ ਬੇਨਤੀਆਂ ਲਈ ਅੱਪਸਟ੍ਰੀਮ (ਹੈਂਡਲਰ-ਸਾਈਡ) ਬੇਨਤੀ ਸਿਰਲੇਖਾਂ ਵਿੱਚ ਇਹ ਵੀ ਸ਼ਾਮਲ ਹਨ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ਹੈਂਡਲਰਜ਼ — ਦੇ ਅੰਦਰ `assertAuth(req, expectedClass)` ਵਰਤੋਂ ਕਰੋ ਇਹ ਕੋਡ `AUTHZ_NOT_INITIALIZED` ਨਾਲ `AuthzAssertionError` ਸੁੱਟਦਾ ਹੈ ਜੇਕਰ ਮਿਡਲਵੇਅਰ ਨੂੰ ਬਾਈਪਾਸ ਕੀਤਾ ਗਿਆ ਸੀ (ਟੈਸਟਾਂ ਵਿੱਚ ਸੰਰਚਨਾ ਰੀਗਰੈਸ਼ਨ ਨੂੰ ਫੜਨ ਲਈ ਮਦਦਗਾਰ)।

## ਇਹ ਵੀ ਵੇਖੋ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ਪ੍ਰਤੀ ਐਂਡਪੁਆਇੰਟ ਪ੍ਰਮਾਣਿਕਤਾ ਮਾਰਕਰ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ਪ੍ਰਮਾਣਿਕਤਾ ਇਵੈਂਟਾਂ ਲਈ ਆਡਿਟ ਲੌਗ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ਤਿੰਨ ਸਕੋਪ ਨਾਮਸਥਾਨ ਅਤੇ MCP ਟੂਲ-ਸਕੋਪ ਕੈਟਾਲਾਗ
- ਸਰੋਤ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
