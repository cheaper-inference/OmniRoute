# Authorization Guide (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ਸੱਚ ਦਾ ਸਰੋਤ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ਆਖਰੀ ਵਾਰ ਅੱਪਡੇਟ ਕੀਤਾ ਗਿਆ:** 2026-09-22 — ਸਕੋਪ ਨੇਮਸਪੇਸ MCP-SERVER.md ਵੱਲ ਇਸ਼ਾਰਾ ਕਰਦੇ ਹਨ

OmniRoute ਕੋਲ ਇੱਕ ਰੂਟ-ਜਾਣੂ ਅਧਿਕਾਰ ਪਾਈਪਲਾਈਨ ਹੈ ਜੋ ਹਰ API ਬੇਨਤੀ ਨੂੰ ਗੇਟ ਕਰਦੀ ਹੈ। ਵਰਗੀਕਰਨ **ਨਿਰਧਾਰਤ** ਅਤੇ **ਫੇਲ-ਕਲੋਜ਼ਡ** ਹੈ — ਕੋਈ ਵੀ ਚੀਜ਼ ਜਿਸਨੂੰ ਵਰਗੀਕ੍ਰਿਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਉਹ `MANAGEMENT` ਦੇ ਰੂਪ ਵਿੱਚ ਖਤਮ ਹੁੰਦੀ ਹੈ ਅਤੇ ਇੱਕ ਸੈਸ਼ਨ ਜਾਂ ਪ੍ਰਬੰਧਨ-ਗ੍ਰੇਡ ਟੋਕਨ ਦੀ ਮੰਗ ਕਰਦੀ ਹੈ। ਇਹ ਪੰਨਾ ਰੂਟਾਂ ਨੂੰ ਬਣਾਈ ਰੱਖਣ ਵਾਲੇ ਜਾਂ ਨਵੇਂ ਐਂਡਪੁਆਇੰਟ ਡਿਜ਼ਾਈਨ ਕਰਨ ਵਾਲੇ ਇੰਜੀਨੀਅਰਾਂ ਲਈ ਮਾਡਲ ਦੀ ਵਿਆਖਿਆ ਕਰਦਾ ਹੈ।

![AuthZ ਪਾਈਪਲਾਈਨ (3 ਰੂਟ ਕਲਾਸਾਂ + ਨੀਤੀ ਮੁਲਾਂਕਣ)](../diagrams/exported/authz-pipeline.svg)

> ਸਰੋਤ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ਦੋ ਪ੍ਰਮਾਣੀਕਰਨ ਮੋਡ

### 1. API ਕੁੰਜੀ (Bearer)

OpenAI/Anthropic/Gemini-ਅਨੁਕੂਲ ਕਲਾਇੰਟ APIs ਅਤੇ ਕੁਝ ਪ੍ਰਬੰਧਨ ਰੂਟਾਂ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ, ਜਦੋਂ ਕੁੰਜੀ ਕੋਲ `manage` ਸਕੋਪ ਹੁੰਦਾ ਹੈ।

```
Authorization: Bearer <api-key>
```

ਇਸਦੀ ਪੁਸ਼ਟੀ `src/sse/services/auth.ts` ਵਿੱਚ `isValidApiKey()` / `extractApiKey()` ਦੁਆਰਾ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਅਤੇ `src/shared/utils/apiAuth.ts` ਰਾਹੀਂ ਮੁੜ ਐਕਸਪੋਰਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਵੈਲੀਡੇਟਰ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲਾਂ ਨੂੰ ਸਥਾਈ ਪਾਸਥਰੂ ਕੁੰਜੀਆਂ ਵਜੋਂ ਵੀ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ (ਮਸਲਾ #1350)।

### 2. ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ (auth_token ਕੂਕੀ)

ਡੈਸ਼ਬੋਰਡ ਪੰਨਿਆਂ ਅਤੇ ਐਡਮਿਨ ਕਾਰਵਾਈਆਂ ਲਈ।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

ਕੂਕੀ ਕੇਵਲ ਉਦੋਂ ਹੀ ਸੈਸ਼ਨ ਹੁੰਦੀ ਹੈ ਜਦੋਂ JWT ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਜਾਂਦੀ ਹੈ **ਅਤੇ** ਉਸ ਵਿੱਚ `authenticated: true` ਮੌਜੂਦ ਹੁੰਦਾ ਹੈ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। ਕੂਕੀ ਦੀ ਵਰਤੋਂ ਕਰਨ ਵਾਲਾ ਹਰੇਕ
ਹਿੱਸਾ (ਡੈਸ਼ਬੋਰਡ ਰੂਟ ਗਾਰਡ (`isDashboardSessionAuthenticated()`), authz ਪਾਈਪਲਾਈਨ ਰਿਫ੍ਰੈਸ਼, WebSocket ਹੈਂਡਸ਼ੇਕ, ਲਾਈਵ
ਸਰਵਰ, `/api/settings/require-login`, `/api/auth/status`) ਇਸ ਹੈਲਪਰ ਰਾਹੀਂ ਲੰਘਦਾ ਹੈ।
`JWT_SECRET` ਨਾਲ ਸਾਈਨ ਕੀਤੇ ਹੋਰ JWT ਵੀ ਮੌਜੂਦ ਹਨ — Cursor CLI ਪਾਸਥਰੂ ਕੁੰਜੀ ਧਾਰਕਾਂ ਲਈ
`iss "omniroute" / aud "cursor-cli"` ਟੋਕਨ ਬਣਾਉਂਦਾ ਹੈ — ਅਤੇ ਉਹ ਕਦੇ ਵੀ ਸੈਸ਼ਨ ਨਹੀਂ ਹੁੰਦੇ
(#13298)।

ਇਸਦੀ ਪੁਸ਼ਟੀ `src/shared/utils/apiAuth.ts` ਵਿੱਚ `isDashboardSessionAuthenticated()` ਦੁਆਰਾ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਜਦੋਂ JWT ਦੀ 30-ਦਿਨਾਂ ਦੀ ਮਿਆਦ ਵਿੱਚ 7 ਦਿਨਾਂ ਤੋਂ ਘੱਟ ਸਮਾਂ ਬਾਕੀ ਰਹਿ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਪਾਈਪਲਾਈਨ ਇਸਨੂੰ ਆਪਣੇ-ਆਪ ਰਿਫ੍ਰੈਸ਼ ਕਰਦੀ ਹੈ।

ਕੋਈ ਸੈਸ਼ਨ ਆਪਣੇ 30 ਦਿਨ ਪੂਰੇ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਵੀ ਖਤਮ ਹੋ ਸਕਦਾ ਹੈ, ਕਿਉਂਕਿ ਹਰ ਟੋਕਨ ਬਣਾਉਣ ਵਾਲਾ `mintDashboardSessionToken` ਰਾਹੀਂ ਲੰਘਦਾ ਹੈ (ਇੱਕ ਜਾਰੀ ਕਰਨ ਦਾ ਸਮਾਂ `iat` ਅਤੇ ਇੱਕ id `jti`) ਅਤੇ ਵੈਰੀਫਾਇਰ ਦੋ ਸੈਟਿੰਗਾਂ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ: `sessionsValidAfter`, ਜੋ ਪਾਸਵਰਡ ਬਦਲਣ ਵੇਲੇ ਸੈੱਟ ਹੁੰਦੀ ਹੈ, ਤਾਂ ਜੋ ਇਸ ਤੋਂ ਪਹਿਲਾਂ ਜਾਰੀ ਕੀਤਾ ਹਰੇਕ ਸੈਸ਼ਨ ਪ੍ਰਮਾਣਿਤ ਹੋਣਾ ਬੰਦ ਕਰ ਦੇਵੇ (ਪਾਸਵਰਡ ਬਦਲਣ ਵਾਲੇ ਬ੍ਰਾਊਜ਼ਰ ਨੂੰ ਇੱਕ ਨਵੀਂ ਕੂਕੀ ਮਿਲਦੀ ਹੈ), ਅਤੇ `revokedDashboardSessions`, ਜਿਸ ਵਿੱਚ `POST /api/auth/logout` ਸਾਈਨ-ਆਉਟ ਕੀਤੇ ਸੈਸ਼ਨ ਦਾ `jti` ਜੋੜਦਾ ਹੈ। ਕਿਸੇ ਪੁਰਾਣੇ ਰਿਲੀਜ਼ ਦੁਆਰਾ ਬਣਾਏ ਗਏ ਸੈਸ਼ਨਾਂ ਵਿੱਚ ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕੋਈ ਵੀ ਕਲੇਮ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਉਹ ਪਹਿਲੀ ਵਾਰ ਪਾਸਵਰਡ ਬਦਲੇ ਜਾਣ ਤੱਕ ਵੈਧ ਰਹਿੰਦੇ ਹਨ। ਜੇ ਸੈਟਿੰਗਾਂ ਨੂੰ ਪੜ੍ਹਿਆ ਨਹੀਂ ਜਾ ਸਕਦਾ, ਤਾਂ ਸੈਸ਼ਨ ਨੂੰ ਭਰੋਸੇਯੋਗ ਨਹੀਂ ਮੰਨਿਆ ਜਾਂਦਾ।

ਕੁਝ ਪ੍ਰਬੰਧਨ ਰੂਟ **ਦੋਵਾਂ ਵਿੱਚੋਂ ਕੋਈ ਵੀ** ਮੋਡ ਸਵੀਕਾਰ ਕਰਦੇ ਹਨ: ਕੂਕੀ ਜਾਂ `Bearer <key>`, ਜਦੋਂ API ਕੁੰਜੀ ਕੋਲ `manage` (ਜਾਂ `admin`) ਸਕੋਪ ਹੁੰਦਾ ਹੈ। ਇਹੀ v3.8 ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤੇ ਗਏ "API ਕਾਲਾਂ ਰਾਹੀਂ ਸੰਰਚਨਾਯੋਗ" ਵਰਕਫ਼ਲੋ ਨੂੰ ਸਮਰੱਥ ਬਣਾਉਂਦਾ ਹੈ।

#### ਵਿਕਲਪਿਕ OIDC ਲੌਗਇਨ ਗੇਟ (#6973)

ਡੈਸ਼ਬੋਰਡ ਐਡਮਿਨ ਲੌਗਇਨ ਡਿਫਾਲਟ ਪਾਸਵਰਡ ਲੌਗਇਨ ਦੇ ਨਾਲ ਇੱਕ **ਆਪਟ-ਇਨ** OIDC (OpenID Connect) ਫ਼ਲੋ ਦਾ ਵੀ ਸਮਰਥਨ ਕਰਦਾ ਹੈ — ਪਾਸਵਰਡ ਲੌਗਇਨ ਕਦੇ ਹਟਾਇਆ ਨਹੀਂ ਜਾਂਦਾ, ਸਿਰਫ਼
ਇਸਦੀ ਪੂਰਤੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

- ਅਸਮਰੱਥ ਰਹਿੰਦਾ ਹੈ ਜਦੋਂ ਤੱਕ `settings.oidcEnabled === true` **ਅਤੇ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ਸਾਰੇ ਕੌਂਫਿਗਰ ਨਾ ਕੀਤੇ ਹੋਣ (ਸੈਟਿੰਗਾਂ → ਪ੍ਰਮਾਣੀਕਰਨ)।
  ਨਹੀਂ ਤਾਂ `GET /api/auth/oidc/login` ਵੱਲੋਂ `400` ਵਾਪਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
- `GET /api/auth/oidc/login` ਜਾਰੀਕਰਤਾ ਦੇ
  `/.well-known/openid-configuration` ਤੋਂ `authorization_endpoint` ਦੀ ਖੋਜ ਕਰਦਾ ਹੈ (`<issuer>/authorize`
  ਨੂੰ ਫਾਲਬੈਕ ਵਜੋਂ ਵਰਤਦਾ ਹੈ), ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ ਤੋਂ ਰੀਡਾਇਰੈਕਟ URI ਬਣਾਉਂਦਾ ਹੈ
  (`x-forwarded-proto` ਤੋਂ ਜਾਣੂ), ਅਤੇ ਇੱਕ ਬੇਤਰਤੀਬ `state` ਨਾਲ IdP ਵੱਲ ਰੀਡਾਇਰੈਕਟ ਕਰਦਾ ਹੈ,
  ਜਿਸਨੂੰ ਇੱਕ `httpOnly` `oidc_state` ਕੁਕੀ ਵਿੱਚ ਸਟੋਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
- `GET /api/auth/oidc/callback`, `state` ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਕਰਦਾ ਹੈ, ਪ੍ਰਮਾਣੀਕਰਨ
  ਕੋਡ ਦਾ ਵਟਾਂਦਰਾ ਕਰਦਾ ਹੈ, ਅਤੇ ਜਾਰੀਕਰਤਾ ਦੇ JWKS ਰਾਹੀਂ ID ਟੋਕਨ ਦੇ ਦਸਤਖਤ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ
  (`jose` ਦਾ `createRemoteJWKSet`, ਹਰ JWKS URI ਲਈ ਕੈਸ਼ ਕੀਤਾ ਹੋਇਆ), ਜਿਸ ਵਿੱਚ `issuer`/`audience`
  ਜਾਂਚਾਂ ਸ਼ਾਮਲ ਹਨ। ਡੈਸ਼ਬੋਰਡ ਦਾਖ਼ਲੇ ਲਈ ਇੱਕ ਗੈਰ-ਖਾਲੀ `oidcAllowedSubjects` ਸੂਚੀ,
  ਇੱਕ `oidcAdmissionClaim` ਨੀਤੀ, ਜਾਂ ਦੋਵੇਂ ਲੋੜੀਂਦੇ ਹਨ। ਵਿਸ਼ਾ ਸੂਚੀ ਸਿਰਫ਼ ਉਦੋਂ `sub` ਜਾਂ
  `email` ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ ਜਦੋਂ `email_verified === true` ਹੋਵੇ। ਵਿਕਲਪਿਕ ਕਲੇਮ ਨੀਤੀ
  ਬਿੰਦੀਆਂ ਨਾਲ ਵੱਖ ਕੀਤਾ ID-ਟੋਕਨ ਕਲੇਮ ਪਾਥ (ਉਦਾਹਰਨ ਲਈ, `realm_access.roles`) ਅਤੇ
  ਸਵੀਕਾਰ ਕੀਤੇ ਮੁੱਲਾਂ ਦੀ ਇੱਕ ਐਰੇ ਲੈਂਦੀ ਹੈ; ਹੱਲ ਕੀਤਾ ਕਲੇਮ ਸਤਰਿੰਗਾਂ ਦੀ ਇੱਕ ਐਰੇ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ
  ਜਿਸ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਸਵੀਕਾਰ ਕੀਤਾ ਮੁੱਲ ਸ਼ਾਮਲ ਹੋਵੇ। ਜੇ ਦੋਵੇਂ ਨੀਤੀਆਂ ਕੌਂਫਿਗਰ ਕੀਤੀਆਂ ਹਨ,
  ਤਾਂ ਦੋਵਾਂ ਦਾ ਪਾਸ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ। ਗੁੰਮ/ਗਲਤ-ਬਣਤਰ ਵਾਲੇ ਕਲੇਮ ਬੰਦ ਰੂਪ ਵਿੱਚ ਅਸਫਲ ਹੁੰਦੇ ਹਨ,
  ਅਤੇ ਕਿਸੇ ਵੀ ਨੀਤੀ ਦੇ ਬਿਨਾਂ ਕਾਲਬੈਕ ਲੌਗਇਨ ਤੋਂ ਇਨਕਾਰ ਕਰਦਾ ਹੈ (`not_configured`)।
  ਮੌਜੂਦਾ ਸਿਰਫ਼-ਵਿਸ਼ਾ ਕੌਂਫਿਗਰੇਸ਼ਨਾਂ ਬਿਨਾਂ ਬਦਲਾਅ ਜਾਰੀ ਰਹਿੰਦੀਆਂ ਹਨ।
- Keycloak ਆਮ ਤੌਰ 'ਤੇ ਰੀਅਲਮ ਭੂਮਿਕਾਵਾਂ ਨੂੰ ਐਕਸੈੱਸ ਟੋਕਨਾਂ ਵਿੱਚ ਮੈਪ ਕਰਦਾ ਹੈ, ਜ਼ਰੂਰੀ ਨਹੀਂ ਕਿ ID
  ਟੋਕਨਾਂ ਵਿੱਚ ਵੀ ਕਰੇ। ਰੀਅਲਮ ਭੂਮਿਕਾ `admin` ਲਾਜ਼ਮੀ ਕਰਨ ਲਈ, ਇਸ ਕਲਾਇੰਟ ਵਾਸਤੇ ਇੱਕ ਪ੍ਰੋਟੋਕੋਲ ਮੈਪਰ
  ਕੌਂਫਿਗਰ ਕਰੋ ਜੋ ਆਪਣੇ **ID ਟੋਕਨ** ਵਿੱਚ `realm_access.roles` ਸ਼ਾਮਲ ਕਰਦਾ ਹੋਵੇ, ਫਿਰ
  `oidcAdmissionClaim` ਨੂੰ `{ "path": "realm_access.roles", "values": ["admin"] }` 'ਤੇ ਸੈੱਟ ਕਰੋ।
  ਸਿਰਫ਼-ਭੂਮਿਕਾ ਦਾਖ਼ਲਾ ਸਮਰੱਥ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇਸ ਕਲਾਇੰਟ ਲਈ ਅਸਲ ID-ਟੋਕਨ ਕਲੇਮ ਦੀ ਜਾਂਚ ਕਰੋ;
  ਐਪਲੀਕੇਸ਼ਨ ਐਕਸੈੱਸ-ਟੋਕਨ ਭੂਮਿਕਾਵਾਂ ਨੂੰ ਨਹੀਂ ਪੜ੍ਹਦੀ। IdP-ਪਾਸੇ ਟੋਕਨ ਤੋਂ ਇਨਕਾਰ ਇਸ
  ਐਪਲੀਕੇਸ਼ਨ-ਪਾਸੇ ਜਾਂਚ ਨੂੰ ਪੂਰਕ ਕਰ ਸਕਦਾ ਹੈ, ਪਰ ਇਸਦੀ ਥਾਂ ਨਹੀਂ ਲੈ ਸਕਦਾ।
- ਸਫਲਤਾ ਉੱਤੇ ਇਹ **ਬਿਲਕੁਲ ਉਹੀ** 30-ਦਿਨਾਂ ਦਾ `auth_token` JWT ਬਣਾਉਂਦਾ ਹੈ ਜੋ ਪਾਸਵਰਡ
  ਲੌਗਇਨ ਜਾਰੀ ਕਰਦਾ ਹੈ (`src/app/api/auth/login/route.ts`), ਇਸ ਲਈ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ
  ਪਾਈਪਲਾਈਨ ਦਾ ਬਾਕੀ ਹਿੱਸਾ (ਆਟੋ-ਰਿਫ੍ਰੈਸ਼, ਕੁਕੀ ਫਲੈਗ) ਬਦਲਿਆ ਨਹੀਂ ਰਹਿੰਦਾ —
  OIDC ਸਿਰਫ਼ ਇਹ ਬਦਲਦਾ ਹੈ ਕਿ ਕੁਕੀ ਕਿਵੇਂ ਬਣਾਈ ਜਾਂਦੀ ਹੈ, ਇਹ ਨਹੀਂ ਕਿ ਉਹ ਕੀ ਅਧਿਕਾਰ ਦਿੰਦੀ ਹੈ।
  IdP ਭੂਮਿਕਾਵਾਂ/ਗਰੁੱਪਾਂ ਵਿੱਚ ਬਦਲਾਅ ਮੌਜੂਦਾ OmniRoute ਸੈਸ਼ਨਾਂ ਨੂੰ ਅਵੈਧ ਨਹੀਂ ਕਰਦੇ; ਲੌਗਆਉਟ,
  ਪਾਸਵਰਡ ਰੋਟੇਸ਼ਨ, ਜਾਂ ਸੈਸ਼ਨ ਦੀ ਮਿਆਦ ਸਮਾਪਤੀ ਅਜੇ ਵੀ ਉਨ੍ਹਾਂ ਦੀ ਉਮਰ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਦੇ ਹਨ।
- ਹਰ `oidc*` ਸੈਟਿੰਗ (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) ਵਿੱਚ ਹੈ: `PATCH /api/settings`
  `400 PASSWORD_REQUIRED` ਨਾਲ ਜਵਾਬ ਦਿੰਦਾ ਹੈ ਜਦੋਂ ਤੱਕ ਬਾਡੀ ਵਿੱਚ ਪ੍ਰਬੰਧਨ
  ਪਾਸਵਰਡ `currentPassword` ਵਜੋਂ ਸ਼ਾਮਲ ਨਾ ਹੋਵੇ (ਇਹ ਗਲਤ ਹੋਣ 'ਤੇ `401 PASSWORD_MISMATCH`)।
  `oidcDisablePasswordLogin` ਪਾਸਵਰਡ _ਲੌਗਇਨ_ (`POST /api/auth/login`) ਤੋਂ ਇਨਕਾਰ ਕਰਦਾ ਹੈ,
  ਪਰ ਸਟੋਰ ਕੀਤਾ ਪਾਸਵਰਡ ਹੈਸ਼ ਕਾਇਮ ਰੱਖਦਾ ਹੈ, ਅਤੇ ਮੁੜ-ਪ੍ਰਮਾਣੀਕਰਨ ਅਜੇ ਵੀ
  `currentPassword` ਨੂੰ ਇਸਦੇ ਮੁਕਾਬਲੇ ਜਾਂਚਦਾ ਹੈ।
- `corsOrigins` ਅਤੇ `bruteForceProtection` ਵੀ `SECURITY_IMPACTING_SETTINGS_KEYS`
  ਵਿੱਚ ਹਨ: ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕਿਸੇ ਨੂੰ ਵੀ ਢਿੱਲਾ ਕਰਨ ਨਾਲ ਲੌਗਇਨ ਸੁਰੱਖਿਆ ਕਮਜ਼ੋਰ ਹੁੰਦੀ ਹੈ, ਇਸ ਲਈ
  ਇਨ੍ਹਾਂ ਲਈ ਉਹੀ `currentPassword` ਮੁੜ-ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜੀਂਦਾ ਹੈ (ਸੁਰੱਖਿਆ ਟੈਬ ਇਸਦੀ ਮੰਗ ਕਰਦੀ ਹੈ)
  ਅਤੇ JSON ਆਯਾਤ ਇਨ੍ਹਾਂ ਨੂੰ ਹਟਾ ਦਿੰਦਾ ਹੈ।
- ਹਰ ਸੁਰੱਖਿਆ-ਨੀਤੀ ਕੁੰਜੀ — `SECURITY_IMPACTING_SETTINGS_KEYS` ਐਂਟਰੀਆਂ,
  ਹਰ `oidc*` ਕੁੰਜੀ ਅਤੇ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਸਥਿਤੀ — `PATCH /api/settings` ਉੱਤੇ
  **ਸਿਰਫ਼-ਓਪਰੇਟਰ** ਲਈ ਹੈ: ਪ੍ਰਬੰਧਨ-ਸਕੋਪ ਵਾਲੀ API ਕੁੰਜੀ ਜਾਂ ਇੱਕ `oma_` ਐਕਸੈੱਸ ਟੋਕਨ ਨੂੰ
  `403` ਨਾਲ ਇਨਕਾਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਭਾਵੇਂ ਇਹ ਸਹੀ `currentPassword` ਭੇਜਦਾ ਹੋਵੇ, ਅਤੇ ਇਸ
  ਇਨਕਾਰ ਦਾ ਆਡਿਟ `settings.update_failed` ਵਜੋਂ `reason: OPERATOR_REQUIRED` ਨਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ
  (`src/lib/api/operatorCredential.ts` ਵਿੱਚ `requireOperatorCredential()`)।
  ਆਮ ਸੈਟਿੰਗਾਂ (ਥੀਮ, ਡਿਸਪਲੇ ਤਰਜੀਹਾਂ) ਇੱਕ `manage` ਕੁੰਜੀ ਜਾਂ ਇੱਕ `admin` ਐਕਸੈੱਸ ਟੋਕਨ
  ਲਈ ਲਿਖਣਯੋਗ ਰਹਿੰਦੀਆਂ ਹਨ। `/api/settings` ਵਿੱਚ ਹਰ ਤਬਦੀਲੀ (ਅਤੇ
  `/api/settings/require-login` ਵਿੱਚ ਵੀ) ਲਈ `admin` ਐਕਸੈੱਸ-ਟੋਕਨ ਸਕੋਪ ਦੀ ਵੀ ਲੋੜ ਹੁੰਦੀ ਹੈ
  (`src/server/authz/accessScopes.ts` ਵਿੱਚ `ADMIN_MUTATION_EXACT_PATHS`, ਸਟੀਕ-ਪਾਥ
  ਮੇਲ); `GET`, `read` ਹੀ ਰਹਿੰਦਾ ਹੈ, ਅਤੇ ਹੋਰ `/api/settings/*` ਉਪ-ਰੂਟ (ਪ੍ਰੌਕਸੀ,
  ਕੌਂਬੋ ਡਿਫਾਲਟ, ਮਾਡਲ ਉਪਨਾਮ, ਕੰਪ੍ਰੈਸ਼ਨ, ਪਰਜ…) ਵਿਧੀ ਤੋਂ ਅਨੁਮਾਨਿਤ
  `write` ਸਕੋਪ ਕਾਇਮ ਰੱਖਦੇ ਹਨ।
- `POST /api/settings/import-json` ਉਸ ਮੁੜ-ਪ੍ਰਮਾਣੀਕਰਨ ਨੂੰ ਛੱਡ ਦਿੰਦਾ ਹੈ, ਇਸ ਲਈ ਇਹ ਲਿਖਣ ਤੋਂ
  ਪਹਿਲਾਂ `IMPORT_STRIPPED_SETTINGS_KEYS` (ਉਹੀ ਫਾਈਲ) ਦੀ ਹਰ ਕੁੰਜੀ ਹਟਾ ਦਿੰਦਾ ਹੈ: ਪਾਸਵਰਡ ਅਤੇ
  `currentPassword`, ਹਰ `SECURITY_IMPACTING_SETTINGS_KEYS` ਐਂਟਰੀ, ਅਤੇ
  ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਸਥਿਤੀ (`sessionsValidAfter`, `revokedDashboardSessions`)।
  ਇਸ ਲਈ ਕਿਸੇ ਪੁਰਾਣੇ ਬੈਕਅੱਪ ਨੂੰ ਆਯਾਤ ਕਰਨਾ ਉਸ ਸੈਸ਼ਨ ਨੂੰ ਮੁੜ ਸਰਗਰਮ ਨਹੀਂ ਕਰ ਸਕਦਾ ਜਿਸਨੂੰ
  ਪਾਸਵਰਡ ਬਦਲਾਅ ਜਾਂ ਸਾਈਨ-ਆਉਟ ਪਹਿਲਾਂ ਹੀ ਸਮਾਪਤ ਕਰ ਚੁੱਕਾ ਹੋਵੇ।

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
ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ → src/proxy.ts
  → src/server/authz/pipeline.ts ਵਿੱਚ runAuthzPipeline()
    1. ਭਰੋਸੇਯੋਗ ਅੰਦਰੂਨੀ ਹੈਡਰ ਹਟਾਓ (x-omniroute-auth-*, x-omniroute-route-class)
    2. ਬੇਨਤੀ ID ਬਣਾਓ, classifyRoute() ਰਾਹੀਂ ਰੂਟ ਦਾ ਵਰਗੀਕਰਨ ਕਰੋ
    3. ਜੇ pathname == "/" → /dashboard ਵੱਲ ਰੀਡਾਇਰੈਕਟ ਕਰੋ
    4. ਜੇ ਡਰੇਨਿੰਗ (ਸੁਚਾਰੂ ਸ਼ਟਡਾਊਨ) ਚੱਲ ਰਹੀ ਹੈ ਅਤੇ /api/* ਹੈ → 503
    5. ਜੇ non-GET /api/* ਹੈ → checkBodySize() ਗਾਰਡ
    6. ਜੇ OPTIONS ਹੈ → CORS ਪ੍ਰੀਫਲਾਈਟ 204
    7. ਜੇ options.enforce == false ਹੈ → ਰੂਟ-ਕਲਾਸ ਹੈਡਰਾਂ ਸਮੇਤ ਜਿਉਂ ਦਾ ਤਿਉਂ ਅੱਗੇ ਭੇਜੋ
    8. ਨਹੀਂ ਤਾਂ: POLICIES[routeClass].evaluate(ctx)
       - ਮਨਜ਼ੂਰ  → x-omniroute-auth-{kind,id,label,scopes} ਲਗਾਓ → NextResponse.next()
       - ਅਸਵੀਕਾਰ → correlation_id ਸਮੇਤ JSON ਗਲਤੀ (ਡੈਸ਼ਬੋਰਡ ਪੰਨੇ → 302 /login)
```

ਭਰੋਸੇਯੋਗ ਅੰਦਰੂਨੀ ਹੈਡਰ (`src/server/authz/headers.ts` ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ) ਵਰਗੀਕਰਨ ਤੋਂ ਪਹਿਲਾਂ **ਆਉਣ ਵਾਲੀਆਂ ਬੇਨਤੀਆਂ ਵਿੱਚੋਂ ਹਟਾ ਦਿੱਤੇ ਜਾਂਦੇ ਹਨ** — ਕਲਾਇੰਟ ਕਿਸੇ ਸਬਜੈਕਟ ਦੀ ਨਕਲ ਕਰਨ ਲਈ `x-omniroute-auth-*` ਨੂੰ ਪਹਿਲਾਂ ਤੋਂ ਭਰ ਨਹੀਂ ਸਕਦੇ।

### ਪਾਲਿਸੀ ਕਾਂਟ੍ਰੈਕਟ

ਹਰੇਕ ਰੂਟ ਕਲਾਸ ਲਈ `src/server/authz/policies/` ਵਿੱਚ ਇੱਕ ਪਾਲਿਸੀ ਹੈ:

- **`publicPolicy`** (`policies/public.ts`) — ਹਮੇਸ਼ਾ `allow({ kind: "anonymous", id: "anonymous" })` ਵਾਪਸ ਕਰਦੀ ਹੈ।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ਕੱਢਦੀ ਹੈ, `validateApiKey()` ਰਾਹੀਂ ਪ੍ਰਮਾਣਿਤ ਕਰਦੀ ਹੈ। ਸਿਰਫ਼ ਉਦੋਂ ਹੀ anonymous ਵੱਲ ਫਾਲ-ਥਰੂ ਕਰਦੀ ਹੈ ਜਦੋਂ ਪ੍ਰਭਾਵੀ `REQUIRE_API_KEY` ਫੀਚਰ ਫਲੈਗ ਅਸਮਰੱਥ ਹੋਵੇ। ਪ੍ਰਭਾਵੀ ਫਲੈਗ `isRequireApiKeyEnabled()` (`DB ਫੀਚਰ ਫਲੈਗ ਓਵਰਰਾਈਡ > process.env.REQUIRE_API_KEY > ਡਿਫਾਲਟ`) ਰਾਹੀਂ ਨਿਰਧਾਰਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਜੋ ਡੈਸ਼ਬੋਰਡ ਫੀਚਰ ਫਲੈਗ ਅਤੇ ਇਨਵਾਇਰਨਮੈਂਟ ਵੇਰੀਏਬਲ `/api/v1/*`, `/api/v1beta/*`, ਅਤੇ ਉਪਨਾਮਾਂ ਨੂੰ ਇਕਸਾਰ ਢੰਗ ਨਾਲ ਨਿਯੰਤ੍ਰਿਤ ਕਰਨ; ਰਿਜ਼ਾਲਵਰ ਦੀਆਂ ਅਸਫਲਤਾਵਾਂ ਵਿੱਚ ਪਹੁੰਚ ਬੰਦ ਰਹਿੰਦੀ ਹੈ। ਕਲਾਇੰਟ API ਰੂਟਾਂ 'ਤੇ ਡੈਸ਼ਬੋਰਡ-ਸੈਸ਼ਨ ਬੇਨਤੀਆਂ ਨੂੰ ਮਨਜ਼ੂਰ ਕਰਦੀ ਹੈ (ਇਸ ਵਿੱਚ `/api/v1/models` ਵੀ ਸ਼ਾਮਲ ਹੈ, ਜਿਸਨੂੰ ਡੈਸ਼ਬੋਰਡ ਮਾਡਲ ਕੈਟਾਲੌਗ ਵਰਤਦਾ ਹੈ)।
- **`managementPolicy`** (`policies/management.ts`) — ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ, ਅੰਦਰੂਨੀ ਮਾਡਲ-ਸਿੰਕ ਬੇਨਤੀਆਂ (`/api/providers/[name]/(sync-models|models)` ਨਾਲ ਮਿਲਾਈਆਂ ਜਾਂਦੀਆਂ), ਨੂੰ ਸਵੀਕਾਰ ਕਰਦੀ ਹੈ ਜਾਂ ਜੇ `isAuthRequired()` false ਵਾਪਸ ਕਰੇ ਤਾਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਛੱਡ ਦਿੰਦੀ ਹੈ। ਜਦੋਂ Bearer ਟੋਕਨ ਮੌਜੂਦ ਪਰ ਅਵੈਧ ਹੋਵੇ ਤਾਂ 403 (`AUTH_001`), ਨਹੀਂ ਤਾਂ 401 ਵਾਪਸ ਕਰਦੀ ਹੈ। ਇਹ ਕਿਸੇ ਵੀ ਪ੍ਰਮਾਣਿਕਤਾ ਸ਼ਾਖਾ ਤੋਂ ਪਹਿਲਾਂ ਰੂਟ-ਗਾਰਡ ਟੀਅਰਾਂ (LOCAL_ONLY / ALWAYS_PROTECTED) ਨੂੰ ਵੀ ਲਾਗੂ ਕਰਦੀ ਹੈ — [ਰੂਟ ਗਾਰਡ ਟੀਅਰ](../security/ROUTE_GUARD_TIERS.md) ਵੇਖੋ। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ਵਿੱਚ ਮੌਜੂਦ LOCAL_ONLY ਪਾਥਾਂ (ਵਰਤਮਾਨ ਵਿੱਚ: `/api/mcp/`) ਤੱਕ non-loopback ਤੋਂ ਪਹੁੰਚ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ, ਜਦੋਂ Bearer ਕੁੰਜੀ ਕੋਲ `manage` ਸਕੋਪ ਹੋਵੇ; ਹੋਰ ਸਾਰੇ LOCAL_ONLY ਪਾਥ ਸਕੋਪ ਦੀ ਪਰਵਾਹ ਕੀਤੇ ਬਿਨਾਂ ਸਖ਼ਤੀ ਨਾਲ loopback ਤੱਕ ਸੀਮਤ ਰਹਿੰਦੇ ਹਨ।

ਇੱਕ ਸਫਲ ਪਾਲਿਸੀ `AuthSubject` ਵਾਪਸ ਕਰਦੀ ਹੈ, ਜਿਸ ਵਿੱਚ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ਹੁੰਦਾ ਹੈ। ਡਾਊਨਸਟ੍ਰੀਮ ਹੈਂਡਲਰ ਪ੍ਰਮਾਣਿਕਤਾ ਤਰਕ ਨੂੰ ਮੁੜ ਚਲਾਉਣ ਦੀ ਬਜਾਏ `src/server/authz/assertAuth.ts` ਵਿੱਚ `assertAuth(request, "CLIENT_API")` ਰਾਹੀਂ ਇਸਨੂੰ ਪੜ੍ਹ ਸਕਦੇ ਹਨ।

## ਸਰਵਜਨਿਕ ਰੂਟਾਂ ਦੀ ਸੂਚੀ

`src/shared/constants/publicApiRoutes.ts` ਸਪਸ਼ਟ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੂਚੀ ਹੈ:

ਸੂਚੀ ਨੂੰ **ਆਕਾਰ** ਦੇ ਆਧਾਰ 'ਤੇ ਵੰਡਿਆ ਗਿਆ ਹੈ, ਅਤੇ ਇਹ ਵੰਡ ਅਤਿ-ਜ਼ਰੂਰੀ ਹੈ (GHSA-74g9-q8f6-793h): ਇੱਕ ਪ੍ਰੀਫਿਕਸ ਨੂੰ
`startsWith()` ਨਾਲ ਮਿਲਾਇਆ ਜਾਂਦਾ ਹੈ, ਇਸ ਲਈ ਇਹ ਉਹਨਾਂ ਸਾਰੇ ਨਾਲ ਲੱਗਦੇ ਪਾਥਾਂ ਨਾਲ ਵੀ ਮੇਲ ਖਾਂਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਦੇ ਸ਼ੁਰੂਆਤੀ ਅੱਖਰ ਇੱਕੋ ਹਨ।
ਪ੍ਰੀਫਿਕਸ ਵਜੋਂ `/api/usage/om-usage` ਨੇ `/api/usage/om-usage<anything>` ਨੂੰ PUBLIC ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਕੀਤਾ, ਅਤੇ Next ਇਸਨੂੰ
`/api/usage/[connectionId]` ਵਜੋਂ ਹੱਲ ਕਰਦਾ ਹੈ — ਇੱਕ ਅਜਿਹਾ ਹੈਂਡਲਰ ਜਿਸਦੀ ਆਪਣੀ ਕੋਈ ਪ੍ਰਮਾਣੀਕਰਨ ਵਿਵਸਥਾ ਨਹੀਂ ਹੈ।

```ts
// ਅਸਲ ਸਬਟ੍ਰੀਜ਼। ਹਰ ਐਂਟਰੀ ਦਾ ਅੰਤ "/" ਨਾਲ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ (ਇੱਕ ਯੂਨਿਟ ਟੈਸਟ ਦੁਆਰਾ ਪੁਸ਼ਟੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify ਵਿੱਚ CLIENT_API ਵਜੋਂ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ, "no-auth public" ਵਜੋਂ ਨਹੀਂ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ਇਕੱਲੇ ਰੂਟ, ਜਿਨ੍ਹਾਂ ਦਾ ਬਿਲਕੁਲ ਸਹੀ ਮੇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ (ਅੰਤਿਮ ਸਲੈਸ਼ ਦੇ ਨਾਲ ਜਾਂ ਬਿਨਾਂ)।
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

// ਸਿਰਫ਼-ਪੜ੍ਹਨਯੋਗ ਇਕੱਲੇ ਰੂਟ, ਜਿਨ੍ਹਾਂ 'ਤੇ CORS ਮੂਲ ਦੀ ਢਿੱਲ ਵੀ ਲਾਗੂ ਹੁੰਦੀ ਹੈ।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ਢਿੱਲ ਤੋਂ ਬਿਨਾਂ ਸਿਰਫ਼-ਪੜ੍ਹਨਯੋਗ ਇਕੱਲਾ ਰੂਟ।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ਸਿਰਫ਼-ਪੜ੍ਹਨਯੋਗ ਰੂਟ ਕੇਵਲ ਸੁਰੱਖਿਅਤ ਮੈਥਡਾਂ ਲਈ ਹੀ ਸਰਵਜਨਿਕ ਹਨ। ਧਿਆਨ ਦਿਓ: `classifyRoute()` `/api/v1/*` ਅਤੇ `/api/v1beta/*` ਨੂੰ PUBLIC ਫਾਲ-ਥਰੂ ਤੋਂ ਬਾਹਰ ਰੱਖਦਾ ਹੈ — ਇਹ ਹਮੇਸ਼ਾ `CLIENT_API` ਹੁੰਦੇ ਹਨ, ਤਾਂ ਜੋ Bearer-ਕੀ ਨੀਤੀ ਫਿਰ ਵੀ ਲਾਗੂ ਰਹੇ।

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

ਪਾਈਪਲਾਈਨ ਹਮੇਸ਼ਾ ਜਵਾਬਾਂ ਉੱਤੇ ਇਹ ਮੁਹਰ ਲਗਾਉਂਦੀ ਹੈ:

```
x-request-id:               <ਸਹਿ-ਸੰਬੰਧ ID, ਗਲਤੀ ਦੇ ਮੁੱਖ ਭਾਗਾਂ ਵਿੱਚ ਦੁਹਰਾਈ ਜਾਂਦੀ ਹੈ>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ਪ੍ਰਮਾਣਿਤ ਬੇਨਤੀਆਂ ਲਈ ਅੱਪਸਟ੍ਰੀਮ (ਹੈਂਡਲਰ-ਪਾਸੇ ਦੇ) ਬੇਨਤੀ ਹੈਡਰਾਂ ਵਿੱਚ ਇਹ ਵੀ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ਆਖਰੀ-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ਵਿਕਲਪਿਕ)
x-omniroute-auth-scopes:    ਕੌਮਿਆਂ ਨਾਲ ਵੱਖ ਕੀਤੀ ਸੂਚੀ
```

ਹੈਂਡਲਰਾਂ ਦੇ ਅੰਦਰ `assertAuth(req, expectedClass)` ਦੀ ਵਰਤੋਂ ਕਰੋ — ਜੇ ਮਿਡਲਵੇਅਰ ਨੂੰ ਬਾਈਪਾਸ ਕੀਤਾ ਗਿਆ ਹੋਵੇ, ਤਾਂ ਇਹ `AUTHZ_NOT_INITIALIZED` ਕੋਡ ਨਾਲ `AuthzAssertionError` ਸੁੱਟਦਾ ਹੈ (ਟੈਸਟਾਂ ਵਿੱਚ ਕੌਂਫਿਗਰੇਸ਼ਨ ਰਿਗ੍ਰੈਸ਼ਨਾਂ ਨੂੰ ਫੜਨ ਲਈ ਲਾਭਦਾਇਕ)।

## ਇਹ ਵੀ ਵੇਖੋ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ਪ੍ਰਤੀ ਐਂਡਪੁਆਇੰਟ ਪ੍ਰਮਾਣਿਕਤਾ ਮਾਰਕਰ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ਪ੍ਰਮਾਣਿਕਤਾ ਇਵੈਂਟਾਂ ਲਈ ਆਡਿਟ ਲੌਗ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ਤਿੰਨ ਸਕੋਪ ਨਾਮਸਥਾਨ ਅਤੇ MCP ਟੂਲ-ਸਕੋਪ ਕੈਟਾਲਾਗ
- ਸਰੋਤ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
