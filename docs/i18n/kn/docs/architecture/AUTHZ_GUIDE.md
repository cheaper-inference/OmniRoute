# Authorization Guide (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ಸತ್ಯದ ಮೂಲ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ:** 2026-09-22 — ಸ್ಕೋಪ್ ನೇಮ್ಸ್ಪೇಸ್ಗಳು MCP-SERVER.md ಅನ್ನು ಸೂಚಿಸುತ್ತವೆ

ಓಮ್ನಿರೂಟ್ ಪ್ರತಿ API ವಿನಂತಿಯನ್ನು ನಿಯಂತ್ರಿಸುವ ರೂಟ್-ಅರಿವಿನ ದೃಢೀಕರಣ ಪೈಪ್ಲೈನ್ ಅನ್ನು ಹೊಂದಿದೆ. ವರ್ಗೀಕರಣವು **ನಿರ್ಣಾಯಕ** ಮತ್ತು **ಫೇಲ್-ಕ್ಲೋಸ್ಡ್** ಆಗಿದೆ — ವರ್ಗೀಕರಿಸಲಾಗದ ಯಾವುದೇ ವಿಷಯವು `MANAGEMENT` ಆಗಿ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ ಮತ್ತು ಸೆಷನ್ ಅಥವಾ ಮ್ಯಾನೇಜ್ಮೆಂಟ್-ಗ್ರೇಡ್ ಟೋಕನ್ ಅನ್ನು ಬೇಡುತ್ತದೆ. ಈ ಪುಟವು ರೂಟ್ಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಅಥವಾ ಹೊಸ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸುವ ಎಂಜಿನಿಯರ್ಗಳಿಗೆ ಮಾದರಿಯನ್ನು ವಿವರಿಸುತ್ತದೆ.

![AuthZ ಪೈಪ್ಲೈನ್ (3 ರೂಟ್ ವರ್ಗಗಳು + ನೀತಿ ಮೌಲ್ಯಮಾಪನ)](../diagrams/exported/authz-pipeline.svg)

> ಮೂಲ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ಎರಡು ದೃಢೀಕರಣ ವಿಧಾನಗಳು

### 1. API ಕೀ (Bearer)

OpenAI/Anthropic/Gemini-ಹೊಂದಾಣಿಕೆಯ ಕ್ಲೈಂಟ್ APIಗಳು ಮತ್ತು ಕೀಗೆ `manage` ಸ್ಕೋಪ್ ಇದ್ದಾಗ ಕೆಲವು ನಿರ್ವಹಣಾ ಮಾರ್ಗಗಳಿಗಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ನಲ್ಲಿರುವ `isValidApiKey()` / `extractApiKey()` ಇವುಗಳಿಂದ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ ಮತ್ತು `src/shared/utils/apiAuth.ts` ಮೂಲಕ ಮರು-ರಫ್ತು ಮಾಡಲಾಗುತ್ತದೆ. ಪರಿಶೀಲಕವು ನಿರಂತರ passthrough ಕೀಗಳಾಗಿ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars ಗಳನ್ನೂ ಸ್ವೀಕರಿಸುತ್ತದೆ (issue #1350).

### 2. ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್ (auth_token cookie)

ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟಗಳು ಮತ್ತು ನಿರ್ವಾಹಕ ಕಾರ್ಯಾಚರಣೆಗಳಿಗಾಗಿ.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ಪರಿಶೀಲನೆಯಾಗುತ್ತದೆ **ಮತ್ತು** ಅದರಲ್ಲಿ `authenticated: true` ಇರುತ್ತದೆ ಎಂದಷ್ಟೇ cookie ಒಂದು ಸೆಷನ್ ಆಗಿರುತ್ತದೆ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). cookie ಅನ್ನು ಬಳಸುವ ಪ್ರತಿಯೊಂದು ಘಟಕವೂ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮಾರ್ಗ ರಕ್ಷಕ (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) ಆ helper ಮೂಲಕವೇ ಸಾಗುತ್ತದೆ.
`JWT_SECRET` ನಿಂದ ಸಹಿ ಮಾಡಲಾದ ಇತರ JWTಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿವೆ — ಕೀ ಹೊಂದಿರುವವರಿಗೆ Cursor CLI passthrough `iss "omniroute" / aud "cursor-cli"` ಟೋಕನ್ಗಳನ್ನು ರಚಿಸುತ್ತದೆ — ಮತ್ತು ಅವು ಎಂದಿಗೂ ಸೆಷನ್ಗಳಾಗಿರುವುದಿಲ್ಲ
(#13298).

`src/shared/utils/apiAuth.ts` ನಲ್ಲಿರುವ `isDashboardSessionAuthenticated()` ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ. 30 ದಿನಗಳ ಜೀವಿತಾವಧಿಯಲ್ಲಿ ಇನ್ನೂ 7 ದಿನಗಳಿಗಿಂತ ಕಡಿಮೆ ಸಮಯ ಉಳಿದಿದ್ದರೆ pipeline JWT ಅನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ refresh ಮಾಡುತ್ತದೆ.

ಪ್ರತಿ minter `mintDashboardSessionToken` ಮೂಲಕ ಸಾಗುವುದರಿಂದ (ಒಂದು issue time `iat` ಮತ್ತು ಒಂದು id `jti` ಜೊತೆಗೆ) ಸೆಷನ್ ತನ್ನ 30 ದಿನಗಳು ಪೂರ್ಣಗೊಳ್ಳುವ ಮೊದಲು ಕೂಡ ಕೊನೆಗೊಳ್ಳಬಹುದು. verifier ಎರಡು ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ: `sessionsValidAfter`, ಇದನ್ನು ಪಾಸ್ವರ್ಡ್ ಬದಲಾವಣೆಯ ಮೂಲಕ ಹೊಂದಿಸಲಾಗುತ್ತದೆ; ಇದರ ಪರಿಣಾಮವಾಗಿ ಅದಕ್ಕೂ ಮೊದಲು ನೀಡಲಾದ ಪ್ರತಿಯೊಂದು ಸೆಷನ್ ಪರಿಶೀಲನೆಯಲ್ಲಿ ವಿಫಲವಾಗುತ್ತದೆ (ಪಾಸ್ವರ್ಡ್ ಬದಲಿಸಿದ ಬ್ರೌಸರ್ಗೆ ಹೊಸ cookie ಸಿಗುತ್ತದೆ), ಮತ್ತು `revokedDashboardSessions`, ಇದಕ್ಕೆ `POST /api/auth/logout` ಸೈನ್ಔಟ್ ಮಾಡಲಾದ ಸೆಷನ್ನ `jti` ಅನ್ನು ಸೇರಿಸುತ್ತದೆ. ಹಳೆಯ release ಮೂಲಕ mint ಮಾಡಲಾದ ಸೆಷನ್ಗಳಲ್ಲಿ ಈ ಎರಡೂ claimಗಳಿರುವುದಿಲ್ಲ ಮತ್ತು ಮೊದಲ ಪಾಸ್ವರ್ಡ್ ಬದಲಾವಣೆಯವರೆಗೆ ಅವು ಮಾನ್ಯವಾಗಿರುತ್ತವೆ. ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಓದಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ, ಸೆಷನ್ ಅನ್ನು ವಿಶ್ವಾಸಾರ್ಹವೆಂದು ಪರಿಗಣಿಸಲಾಗುವುದಿಲ್ಲ.

ಕೆಲವು ನಿರ್ವಹಣಾ ಮಾರ್ಗಗಳು **ಎರಡರಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ** ಸ್ವೀಕರಿಸುತ್ತವೆ: API ಕೀಗೆ `manage` (ಅಥವಾ `admin`) ಸ್ಕೋಪ್ ಇದ್ದಾಗ cookie ಅಥವಾ `Bearer <key>`. v3.8 ರಲ್ಲಿ ಸೇರಿಸಲಾದ "API calls ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದಾದ" workflow ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವುದೇ ಇದು.

#### ಐಚ್ಛಿಕ OIDC login gate (#6973)

ಡ್ಯಾಶ್ಬೋರ್ಡ್ ನಿರ್ವಾಹಕ login, ಡೀಫಾಲ್ಟ್ ಪಾಸ್ವರ್ಡ್ login ಜೊತೆಗೆ opt-in OIDC (OpenID Connect) flow ಅನ್ನು ಸಹ ಬೆಂಬಲಿಸುತ್ತದೆ
— ಪಾಸ್ವರ್ಡ್ login ಅನ್ನು ಎಂದಿಗೂ ತೆಗೆದುಹಾಕಲಾಗುವುದಿಲ್ಲ, ಕೇವಲ ಪೂರಕವಾಗಿ ಸೇರಿಸಲಾಗುತ್ತದೆ:

- `settings.oidcEnabled === true` **ಮತ್ತು** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ಎಲ್ಲವೂ ಕಾನ್ಫಿಗರ್ ಆಗಿರುವಾಗ ಮಾತ್ರ ಸಕ್ರಿಯವಾಗಿರುತ್ತದೆ (Settings → Auth).
  ಇಲ್ಲದಿದ್ದರೆ `GET /api/auth/oidc/login` `400` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.
- `GET /api/auth/oidc/login`, issuerನ `/.well-known/openid-configuration` ನಿಂದ
  `authorization_endpoint` ಅನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ (`<issuer>/authorize` ಗೆ fallback ಆಗುತ್ತದೆ), ಒಳಬರುವ
  ವಿನಂತಿಯಿಂದ redirect URI ಅನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ (`x-forwarded-proto`-aware), ಮತ್ತು
  `httpOnly` `oidc_state` cookie ಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ ಯಾದೃಚ್ಛಿಕ `state` ಜೊತೆಗೆ IdP ಗೆ redirect ಮಾಡುತ್ತದೆ.
- `GET /api/auth/oidc/callback`, `state` ಅನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ, authorization
  code ಅನ್ನು ವಿನಿಮಯ ಮಾಡುತ್ತದೆ, ಮತ್ತು issuerನ JWKS ಮೂಲಕ ID tokenನ ಸಹಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ
  (`jose`'s `createRemoteJWKSet`, ಪ್ರತಿ JWKS URI ಗೆ cache ಮಾಡಲಾಗುತ್ತದೆ), ಜೊತೆಗೆ
  `issuer`/`audience` ಪರಿಶೀಲನೆಗಳನ್ನು ನಡೆಸುತ್ತದೆ. Dashboard ಪ್ರವೇಶಕ್ಕೆ ಖಾಲಿಯಲ್ಲದ
  `oidcAllowedSubjects` ಪಟ್ಟಿ, `oidcAdmissionClaim` ನೀತಿ, ಅಥವಾ ಎರಡೂ ಅಗತ್ಯವಿರುತ್ತವೆ.
  `email_verified === true` ಆಗಿದ್ದಾಗ ಮಾತ್ರ subject ಪಟ್ಟಿ `sub` ಅಥವಾ `email` ಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.
  ಐಚ್ಛಿಕ claim ನೀತಿಯು dot-separated ID-token claim path (ಉದಾಹರಣೆಗೆ,
  `realm_access.roles`) ಮತ್ತು ಸ್ವೀಕರಿಸಬಹುದಾದ ಮೌಲ್ಯಗಳ array ಅನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ;
  ಪರಿಹರಿಸಲಾದ claim ಒಂದು strings array ಆಗಿದ್ದು, ಕನಿಷ್ಠ ಒಂದು ಸ್ವೀಕರಿಸಲಾದ ಮೌಲ್ಯವನ್ನು
  ಹೊಂದಿರಬೇಕು. ಎರಡೂ ನೀತಿಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿದರೆ, ಎರಡೂ ಯಶಸ್ವಿಯಾಗಬೇಕು. ಕಾಣೆಯಾಗಿರುವ/
  ತಪ್ಪು ರೂಪದಲ್ಲಿರುವ claims ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ನಿರಾಕರಿಸಲಾಗುತ್ತದೆ, ಮತ್ತು ಯಾವುದೂ ನೀತಿ
  ಇಲ್ಲದಿದ್ದರೆ callback login ಅನ್ನು ನಿರಾಕರಿಸುತ್ತದೆ (`not_configured`). ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ
  subject-only ಕಾನ್ಫಿಗರೇಶನ್ಗಳು ಬದಲಾವಣೆಯಿಲ್ಲದೆ ಮುಂದುವರಿಯುತ್ತವೆ.
- Keycloak ಸಾಮಾನ್ಯವಾಗಿ realm roles ಅನ್ನು access tokens ಗೆ map ಮಾಡುತ್ತದೆ, ID tokens ಗೆ
  ಅಗತ್ಯವಿಲ್ಲ. Realm role `admin` ಅನ್ನು ಅಗತ್ಯವಿರಿಸಿಕೊಳ್ಳಲು, ಈ client ಗಾಗಿ
  `realm_access.roles` ಅನ್ನು ಅದರ **ID token** ನಲ್ಲಿ ಸೇರಿಸುವ protocol mapper ಅನ್ನು
  ಕಾನ್ಫಿಗರ್ ಮಾಡಿ, ನಂತರ `oidcAdmissionClaim` ಅನ್ನು
  `{ "path": "realm_access.roles", "values": ["admin"] }` ಗೆ ಹೊಂದಿಸಿ.
  Role-only admission ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವ ಮೊದಲು ಈ client ಗಾಗಿ ನಿಜವಾದ ID-token claim ಅನ್ನು
  ಪರಿಶೀಲಿಸಿ; application access-token roles ಅನ್ನು ಓದುವುದಿಲ್ಲ. IdP-side token ನಿರಾಕರಣೆ
  ಇದಕ್ಕೆ ಪೂರಕವಾಗಬಹುದು, ಆದರೆ ಈ application-side ಪರಿಶೀಲನೆಯ ಬದಲಿಯಾಗುವುದಿಲ್ಲ.
- ಯಶಸ್ವಿಯಾದಾಗ ಇದು password login ನೀಡುವ ಅದೇ **ನಿಖರವಾದ** 30-ದಿನಗಳ `auth_token` JWT ಅನ್ನು
  mint ಮಾಡುತ್ತದೆ (`src/app/api/auth/login/route.ts`), ಆದ್ದರಿಂದ ಉಳಿದ dashboard session
  pipeline (auto-refresh, cookie flags) ಬದಲಾಗುವುದಿಲ್ಲ —
  OIDC cookie ಹೇಗೆ mint ಆಗುತ್ತದೆ ಎಂಬುದನ್ನು ಮಾತ್ರ ಬದಲಿಸುತ್ತದೆ, ಅದು ಏನು ಅನುಮತಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಅಲ್ಲ.
  IdP roles/groups ಗೆ ಬದಲಾವಣೆಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ OmniRoute sessions ಅನ್ನು ಅಮಾನ್ಯಗೊಳಿಸುವುದಿಲ್ಲ;
  logout, password rotation, ಅಥವಾ session expiry ಇನ್ನೂ ಅವುಗಳ ಅವಧಿಯನ್ನು ನಿರ್ಧರಿಸುತ್ತವೆ.
- ಪ್ರತಿಯೊಂದು `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`
  ನಲ್ಲಿ ಇದೆ (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings`, body ಯಲ್ಲಿ management password ಅನ್ನು `currentPassword` ಆಗಿ
  ನೀಡದಿದ್ದರೆ `400 PASSWORD_REQUIRED` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ (ತಪ್ಪಾಗಿದ್ದರೆ
  `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin`, password _login_ ಅನ್ನು
  (`POST /api/auth/login`) ನಿರಾಕರಿಸುತ್ತದೆ, ಆದರೆ ಸಂಗ್ರಹಿಸಲಾದ password hash ಅನ್ನು ಉಳಿಸುತ್ತದೆ,
  ಮತ್ತು re-auth ಇನ್ನೂ ಅದರ ವಿರುದ್ಧ `currentPassword` ಅನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.
- `corsOrigins` ಮತ್ತು `bruteForceProtection` ಕೂಡ `SECURITY_IMPACTING_SETTINGS_KEYS` ನಲ್ಲಿ
  ಇವೆ: ಇವೆರಡರಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಸಡಿಲಿಸುವುದು login ರಕ್ಷಣೆಯನ್ನು ದುರ್ಬಲಗೊಳಿಸುವುದರಿಂದ,
  ಅವುಗಳಿಗೆ ಅದೇ `currentPassword` re-auth ಅಗತ್ಯವಿರುತ್ತದೆ (Security tab ಇದನ್ನು ಕೇಳುತ್ತದೆ)
  ಮತ್ತು JSON import ಅವುಗಳನ್ನು ಕೈಬಿಡುತ್ತದೆ.
- ಪ್ರತಿಯೊಂದು security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS` entries,
  ಪ್ರತಿಯೊಂದು `oidc*` key ಮತ್ತು dashboard session state — `PATCH /api/settings` ನಲ್ಲಿ
  **operator-only** ಆಗಿದೆ: manage-scoped API key ಅಥವಾ `oma_` access token ಅನ್ನು ಸರಿಯಾದ
  `currentPassword` ಕಳುಹಿಸಿದರೂ `403` ಜೊತೆಗೆ ನಿರಾಕರಿಸಲಾಗುತ್ತದೆ, ಮತ್ತು ಈ ನಿರಾಕರಣೆಯನ್ನು
  `settings.update_failed` ಆಗಿ `reason: OPERATOR_REQUIRED` ಸಹಿತ audit ಮಾಡಲಾಗುತ್ತದೆ
  (`src/lib/api/operatorCredential.ts` ನಲ್ಲಿ `requireOperatorCredential()`).
  ಸಾಮಾನ್ಯ settings (theme, display preferences) ಗಳು `manage` key ಅಥವಾ
  `admin` access token ಗಾಗಿ ಬರೆಯಬಹುದಾಗಿಯೇ ಇರುತ್ತವೆ. `/api/settings` ನ ಪ್ರತಿಯೊಂದು mutation
  (ಮತ್ತು `/api/settings/require-login` ನದ್ದೂ) ಕೂಡ `admin` access-token scope ಅನ್ನು
  ಅಗತ್ಯವಿರಿಸುತ್ತದೆ (`src/server/authz/accessScopes.ts` ನಲ್ಲಿರುವ
  `ADMIN_MUTATION_EXACT_PATHS`, exact-path match); `GET` `read` ಆಗಿಯೇ ಉಳಿಯುತ್ತದೆ,
  ಮತ್ತು ಇತರ `/api/settings/*` sub-routes (proxies, combo defaults, model aliases,
  compression, purges…) method-inferred `write` scope ಅನ್ನು ಮುಂದುವರಿಸುತ್ತವೆ.
- `POST /api/settings/import-json` ಆ re-auth ಅನ್ನು ಬಿಟ್ಟುಬಿಡುತ್ತದೆ, ಆದ್ದರಿಂದ ಬರೆಯುವ ಮೊದಲು
  `IMPORT_STRIPPED_SETTINGS_KEYS` ನಲ್ಲಿ (ಅದೇ file) ಇರುವ ಪ್ರತಿಯೊಂದು key ಅನ್ನು ಕೈಬಿಡುತ್ತದೆ:
  password ಮತ್ತು `currentPassword`, ಪ್ರತಿಯೊಂದು `SECURITY_IMPACTING_SETTINGS_KEYS` entry,
  ಮತ್ತು dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`).
  ಹಳೆಯ backup ಅನ್ನು import ಮಾಡುವುದರಿಂದ password change ಅಥವಾ sign-out ಈಗಾಗಲೇ ಅಂತ್ಯಗೊಳಿಸಿದ
  session ಅನ್ನು ಮತ್ತೆ ಸಕ್ರಿಯಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ.

#### ಐಚ್ಛಿಕ TOTP ದ್ವಿ-ಘಟಕ login (#16619)

Settings → Security ನಿಂದ enroll ಮಾಡಲಾಗುತ್ತದೆ; operator ಅದನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವವರೆಗೆ
ನಿಷ್ಕ್ರಿಯವಾಗಿರುತ್ತದೆ (`src/server/auth/dashboardMfa.ts`).

- **ಇದು ಒಳಗೊಂಡಿರುವುದು:** ಪಾಸ್ವರ್ಡ್ ಲಾಗಿನ್ (`POST /api/auth/login`, ಇದಕ್ಕೆ ನಂತರ
  `POST /api/auth/mfa/verify` ಅಗತ್ಯವಿರುತ್ತದೆ) ಮತ್ತು `omniroute connect` (`POST /api/cli/connect`,
  ಇದು ಪಾಸ್ವರ್ಡ್-ಮಾತ್ರದ ವಿನಿಮಯವನ್ನು ನಿರಾಕರಿಸುತ್ತದೆ ಮತ್ತು ಕೋಡ್ ಅನ್ನು `totp` ಆಗಿ ಸ್ವೀಕರಿಸುತ್ತದೆ).
- **ಇದು ಒಳಗೊಂಡಿಲ್ಲ:** OIDC / SSO ಸೈನ್-ಇನ್ (`/api/auth/oidc/callback`) OmniRoute TOTP ಅನ್ನು
  ಕೇಳುವುದಿಲ್ಲ. ಇದು ಗುರುತು ಪೂರೈಕೆದಾರರ ಸ್ವಂತ ಎರಡನೇ ಅಂಶವನ್ನು ಅವಲಂಬಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ OIDC ಸಕ್ರಿಯವಾಗಿದ್ದರೆ
  IdP ನಲ್ಲಿ MFA ಅನ್ನು ಜಾರಿಗೊಳಿಸಿ.
- **ಮರುಪಡೆಯುವಿಕೆ** (ಸಾಧನ ಕಳೆದುಹೋದಾಗ, ಯಾವುದೇ ಮರುಪಡೆಯುವಿಕೆ ಕೋಡ್ಗಳು ಉಳಿದಿಲ್ಲದಾಗ, ಅಥವಾ ಒಂದು ಅಂಶವನ್ನು
  ಇನ್ನು ಮುಂದೆ ಪರಿಶೀಲಿಸಲಾಗದಾಗ, ಉದಾಹರಣೆಗೆ `STORAGE_ENCRYPTION_KEY` ಬದಲಾದ ನಂತರ):
  1. `OMNIROUTE_DISABLE_MFA=true` ಜೊತೆಗೆ ಸರ್ವರ್ ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸಿ.
  2. ಹೋಸ್ಟ್ನಲ್ಲಿಯೇ (ಲೂಪ್ಬ್ಯಾಕ್ ಪೀರ್ ಮತ್ತು ಲೂಪ್ಬ್ಯಾಕ್ `Host`, ಉದಾಹರಣೆಗೆ
     `http://localhost:20128`) ಪಾಸ್ವರ್ಡ್ ಬಳಸಿ ಸೈನ್ ಇನ್ ಮಾಡಿ. ಆ ಮೂಲಕ್ಕೆ ಮಾತ್ರ ಎರಡನೇ ಅಂಶವನ್ನು
     ಬಿಟ್ಟುಹೋಗಲಾಗುತ್ತದೆ; ಪ್ರತಿಯೊಂದು ಇತರ ಮೂಲಕ್ಕೂ ಕೋಡ್ ಇನ್ನೂ ಅಗತ್ಯವಿರುತ್ತದೆ.
  3. ಸೆಟ್ಟಿಂಗ್ಗಳು → ಭದ್ರತೆ → ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ ನಲ್ಲಿ, ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ ಮತ್ತು ಕೋಡ್ ಅನ್ನು ಖಾಲಿ ಬಿಡಿ. `POST /api/auth/mfa/disable` `code` ಇಲ್ಲದ ಬಾಡಿಯನ್ನು, ಚರವನ್ನು ಹೊಂದಿಸಿರುವಾಗ ಮತ್ತು ವಿನಂತಿಯು ಹೋಸ್ಟ್ನಿಂದ ಬಂದಾಗ ಮಾತ್ರ ಸ್ವೀಕರಿಸುತ್ತದೆ; ಇದಕ್ಕೆ ಇನ್ನೂ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್ ಮತ್ತು ಪ್ರಸ್ತುತ ಪಾಸ್ವರ್ಡ್ ಅಗತ್ಯವಿರುತ್ತದೆ, ಮತ್ತು ಇದನ್ನು `auth.mfa.disabled` ಜೊತೆಗೆ `secondFactor: "recovery_switch"` ಎಂದು ಆಡಿಟ್ ಮಾಡಲಾಗುತ್ತದೆ.
  4. `OMNIROUTE_DISABLE_MFA` ಅನ್ನು ಅನ್ಸೆಟ್ ಮಾಡಿ, ಮರುಪ್ರಾರಂಭಿಸಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಮತ್ತೆ ನೋಂದಾಯಿಸಿ.

## ರೂಟ್ ವರ್ಗಗಳು

`src/server/authz/types.ts` ಮೂರು ವರ್ಗಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತದೆ; ನಿರ್ಧಾರಾತ್ಮಕವಾಗಿ ವರ್ಗೀಕರಿಸಲಾಗದ ಯಾವುದೇ ರೂಟ್ `MANAGEMENT` ಗೆ ಹಿಂದಿರುಗುತ್ತದೆ.

| ವರ್ಗ         | ವಿವರಣೆ                                                                                                                                                        | ದೃಢೀಕರಣ ಅಗತ್ಯ                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | ಸ್ಪಷ್ಟವಾಗಿ ಸುರಕ್ಷಿತ ರೂಟ್‌ಗಳು — ಲಾಗಿನ್, ಲಾಗೌಟ್, ಸ್ಥಿತಿ, ಆರಂಭ, ಆರೋಗ್ಯ, ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಬೂಟ್‌ಸ್ಟ್ರ್ಯಾಪ್.                                                           | ಯಾವುದೂ ಇಲ್ಲ                                                           |
| `CLIENT_API` | ಮಾದರಿ-ಸೇವೆ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು — `/api/v1/*`, `/api/v1beta/*`, ಮತ್ತು ಅಲಿಯಾಸ್‌ಗಳು `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | ಪರಿಣಾಮಕಾರಿ `REQUIRE_API_KEY` ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ಸಕ್ರಿಯವಾಗಿದ್ದಾಗ Bearer ಕೀ |
| `MANAGEMENT` | ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪುಟಗಳು, ಸೆಟ್ಟಿಂಗ್‌ಗಳು, ಪೂರೈಕೆದಾರರು, ಕೀಗಳು, ಆಡಳಿತ ಮತ್ತು ರೋಗನಿರ್ಣಯ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು.                                                              | ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್ ಅಥವಾ `manage` ಸ್ಕೋಪ್‌ನ Bearer                     |

ಕೆಲವು `MANAGEMENT` ಕ್ರಿಯೆಗಳು **ಆಪರೇಟರ್-ಮಾತ್ರ**: `manage` ಕೀ ಸಾಕಾಗುವುದಿಲ್ಲ. ಸಂಗ್ರಹಿತ ಕ್ರೆಡೆನ್ಶಿಯಲ್‌ಗಳನ್ನು ರಫ್ತು ಮಾಡುವುದು (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), ಲೈವ್ ಡೇಟಾದ ಮೇಲೆ ಬ್ಯಾಕಪ್ ಮರುಸ್ಥಾಪಿಸುವುದು (`dryRun=true` ಸಹಿತ `POST /api/db-backups/import`, ID ಮೂಲಕ ಮರುಸ್ಥಾಪನೆಯ `POST /api/db-backups`, `POST /api/settings/import-json`), ಮರುಸ್ಥಾಪನೆ ಬಿಂದುಗಳನ್ನು ನಾಶಪಡಿಸುವುದು (`DELETE /api/db-backups` ಕ್ಲೀನಪ್, ಮತ್ತು `PATCH /api/db-backups` ಏಕೆಂದರೆ ಅದು ಉಳಿಸುವ ಧಾರಣ ನೀತಿಯು ಪ್ರತಿ ಬ್ಯಾಕಪ್ ನಂತರದ ಸ್ವಯಂಚಾಲಿತ ಕ್ಲೀನಪ್ ಅನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ) ಇವೆಲ್ಲವಕ್ಕೂ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್, ಸ್ಥಳೀಯ CLI ವಿಷಯ, ಅಥವಾ ಲಾಗಿನ್ ನಿಷ್ಕ್ರಿಯವಾಗಿರುವುದು ಬೇಕು. ಸಿಂಕ್ ಟೋಕನ್ ನೀಡುವುದು (`POST /api/sync/tokens`) ಮತ್ತು `admin` CLI ಪ್ರವೇಶ ಟೋಕನ್ ರಚಿಸುವುದು (`POST /api/cli/tokens`) ಪ್ರತಿ ಲಾಗಿನ್ ಮೋಡ್‌ನಲ್ಲೂ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್ ಅಥವಾ ಸ್ಥಳೀಯ CLI ವಿಷಯ ಬೇಕು. ಯಾವುದೇ ಸ್ಕೋಪ್‌ನ API ಕೀಗಳು ಮತ್ತು `oma_` ಪ್ರವೇಶ ಟೋಕನ್‌ಗಳು ಆಪರೇಟರ್ ಕ್ರೆಡೆನ್ಶಿಯಲ್‌ಗಳಲ್ಲ: ಅಗತ್ಯವಿರುವಾಗೆಲ್ಲ ಅವು `403` ಪಡೆಯುತ್ತವೆ. ಈ ಪರಿಶೀಲನೆ `src/lib/api/operatorCredential.ts` ನಲ್ಲಿದೆ (`resolveOperatorCredential()` / `requireOperatorCredential()`). ಲಾಗಿನ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಬದಲಿಸುವುದೂ ಆಪರೇಟರ್-ಮಾತ್ರ: ಪಾಸ್‌ವರ್ಡ್ ಇದ್ದ ನಂತರ `POST /api/settings/require-login` (ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸುವುದು / `requireLogin` ಟಾಗಲ್ ಮಾಡುವುದು) ಈ ಕ್ರೆಡೆನ್ಶಿಯಲ್‌ಗಳನ್ನು ಮಾತ್ರ ಸ್ವೀಕರಿಸುತ್ತದೆ — ಮೊದಲ-ರನ್ ಬೂಟ್‌ಸ್ಟ್ರ್ಯಾಪ್ ವಿಂಡೋ (ಇನ್ನೂ ಪಾಸ್‌ವರ್ಡ್ ಇಲ್ಲದಿರುವಾಗ) ಬದಲಾಗುವುದಿಲ್ಲ — ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಿಸಲು `currentPassword` ಕಳುಹಿಸಬೇಕು (ಇಲ್ಲದಿದ್ದರೆ ಅಥವಾ ತಪ್ಪಾಗಿದ್ದರೆ `403`, `settings.update_failed` ಎಂದು ಆಡಿಟ್). ಸ್ಥಳೀಯ CLI ಮತ್ತು ಲಾಗಿನ್ ನಿಷ್ಕ್ರಿಯವಾಗಿರುವ ನಿದರ್ಶನವು ಮರುಪಡೆಯುವಿಕೆ ಮಾರ್ಗವನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ಅದಿಲ್ಲದೆಯೂ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಬಹುದು, ಏಕೆಂದರೆ ಎರಡೂ ಡೇಟಾ ಡೈರೆಕ್ಟರಿಯನ್ನು ಹೊಂದಿರುವ ಹೋಸ್ಟ್‌ಗೆ ಬದ್ಧವಾಗಿವೆ.

## ಪೈಪ್ಲೈನ್

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

ವಿಶ್ವಾಸಾರ್ಹ ಆಂತರಿಕ ಹೆಡರ್ಗಳು ( `src/server/authz/headers.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ).** ಒಳಬರುವ ವಿನಂತಿಗಳಿಂದ ತೆಗೆದುಹಾಕಲಾಗಿದೆ** ವರ್ಗೀಕರಣದ ಮೊದಲು — ಕ್ಲೈಂಟ್ಗಳು ವಿಷಯವನ್ನು ಸೋಗು ಹಾಕಲು `x-omniroute-auth-*` ಪೂರ್ವ-ಜನಪ್ರಿಯಗೊಳಿಸುವಂತಿಲ್ಲ.

### ನೀತಿ ಒಪ್ಪಂದಗಳು

ಪ್ರತಿಯೊಂದು ಮಾರ್ಗ ವರ್ಗವು `src/server/authz/policies/` ನಲ್ಲಿ ನೀತಿಯನ್ನು ಹೊಂದಿದೆ:

- **`publicPolicy`** (`policies/public.ts`) — ಯಾವಾಗಲೂ `allow({ kind: "anonymous", id: "anonymous" })` ಹಿಂದಿರುಗಿಸುತ್ತದೆ.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ಸಾರಗಳು ಬೇರರ್, `validateApiKey()` ಮೂಲಕ ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ. ಪರಿಣಾಮಕಾರಿ `REQUIRE_API_KEY` ವೈಶಿಷ್ಟ್ಯದ ಫ್ಲ್ಯಾಗ್ ಅನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದಾಗ ಮಾತ್ರ ಅನಾಮಧೇಯರಿಗೆ ಬರುತ್ತದೆ. ಪರಿಣಾಮಕಾರಿ ಫ್ಲ್ಯಾಗ್ ಅನ್ನು `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ಮೂಲಕ ಪರಿಹರಿಸಲಾಗುತ್ತದೆ ಆದ್ದರಿಂದ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ವೈಶಿಷ್ಟ್ಯ ಫ್ಲ್ಯಾಗ್ಗಳು ಮತ್ತು ಪರಿಸರ ವೇರಿಯಬಲ್ಗಳು `/api/v1/*`, `/api/v1beta/*` ಮತ್ತು ಅಲಿಯಾಸ್ಗಳನ್ನು ಸ್ಥಿರವಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತವೆ; ಪರಿಹಾರಕ ವೈಫಲ್ಯಗಳು ವಿಫಲವಾಗಿವೆ ಮುಚ್ಚಲಾಗಿದೆ. ಕ್ಲೈಂಟ್ API ಮಾರ್ಗಗಳಲ್ಲಿ ಡ್ಯಾಶ್ಬೋರ್ಡ್-ಸೆಷನ್ ವಿನಂತಿಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮಾದರಿ ಕ್ಯಾಟಲಾಗ್ನಿಂದ ಬಳಸಲಾಗುವ `/api/v1/models` ಸೇರಿದಂತೆ). Entra ID SSO ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ, ರಚನಾತ್ಮಕವಾಗಿ ಎಂಟ್ರಾ ಟೋಕನ್ ಆಗಿರುವ ಬೇರರ್ (ಮೂರು base64url ವಿಭಾಗಗಳು, `RS*` alg, `kid`) SSO ಶಾಖೆಯಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುತ್ತದೆ** ಮೊದಲು** `validateApiKey()` ಮತ್ತು ಅದರ ತೀರ್ಪು ಅಂತಿಮ — ಆಗಿದೆ, ಅದು ಎಂದಿಗೂ API-ಕೀ ಪಥ ಅಥವಾ ಅನಾಮಧೇಯ ಶಾಖೆಗೆ ಬೀಳುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ ಗುರುತನ್ನು ಒದಗಿಸುವವರ ಸ್ಥಗಿತವು ಮುಕ್ತ ಪ್ರವೇಶವಾಗುವುದಿಲ್ಲ. ಸ್ಥಿರ API ಕೀಗಳು ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ. [Entra ID SSO](../security/ENTRA_SSO.md) ನೋಡಿ.
- **`managementPolicy`** (`policies/management.ts`) — ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್, ಆಂತರಿಕ ಮಾದರಿ-ಸಿಂಕ್ ವಿನಂತಿಗಳನ್ನು ( `/api/providers/[name]/(sync-models|models)` ವಿರುದ್ಧ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ) ಸ್ವೀಕರಿಸುತ್ತದೆ ಅಥವಾ `isAuthRequired()` ತಪ್ಪನ್ನು ಹಿಂತಿರುಗಿಸಿದರೆ ಸಂಪೂರ್ಣವಾಗಿ ಬಿಟ್ಟುಬಿಡುತ್ತದೆ. ಬೇರರ್ ಟೋಕನ್ ಇರುವಾಗ 403 (`AUTH_001`) ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ ಆದರೆ ಅಮಾನ್ಯವಾಗಿದೆ, ಇಲ್ಲದಿದ್ದರೆ 401. ಯಾವುದೇ auth ಶಾಖೆಯ ಮೊದಲು ಮಾರ್ಗ-ರಕ್ಷಕ ಶ್ರೇಣಿಗಳನ್ನು (LOCAL_ONLY / ALWAYS_PROTECTED) ಜಾರಿಗೊಳಿಸುತ್ತದೆ — [ರೂಟ್ ಗಾರ್ಡ್ ಶ್ರೇಣಿಗಳನ್ನು](../security/ROUTE_GUARD_TIERS.md) ನೋಡಿ. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ನಲ್ಲಿ LOCAL_ONLY ಮಾರ್ಗಗಳು (ಇಂದು: `/api/mcp/`) ಬೇರರ್ ಕೀ `manage` ಸ್ಕೋಪ್ ಅನ್ನು ಹೊಂದಿರುವಾಗ ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ಮೂಲಕ ಪ್ರವೇಶಿಸಬಹುದು; ಎಲ್ಲಾ ಇತರ LOCAL_ONLY ಮಾರ್ಗಗಳು ವ್ಯಾಪ್ತಿಯನ್ನು ಲೆಕ್ಕಿಸದೆ ಕಟ್ಟುನಿಟ್ಟಾದ-ಲೂಪ್ಬ್ಯಾಕ್ ಆಗಿರುತ್ತವೆ.

ಯಶಸ್ವಿ ನೀತಿಯು `AuthSubject` `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ನೊಂದಿಗೆ ಹಿಂತಿರುಗಿಸುತ್ತದೆ. ಡೌನ್ಸ್ಟ್ರೀಮ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು ದೃಢೀಕರಣ ತರ್ಕವನ್ನು ಮರು-ಚಾಲನೆ ಮಾಡುವ ಬದಲು `src/server/authz/assertAuth.ts` ನಲ್ಲಿ `assertAuth(request, "CLIENT_API")` ಮೂಲಕ ಓದಬಹುದು.

## ಸಾರ್ವಜನಿಕ ಮಾರ್ಗಗಳ ಪಟ್ಟಿ

`src/shared/constants/publicApiRoutes.ts` ಸ್ಪಷ್ಟವಾದ ಅನುಮತಿಪಟ್ಟಿ ಆಗಿದೆ:

ಪಟ್ಟಿಯನ್ನು **ಆಕಾರ**ದ ಆಧಾರದ ಮೇಲೆ ವಿಭಜಿಸಲಾಗಿದೆ, ಮತ್ತು ಈ ವಿಭಜನೆ ಅತ್ಯಂತ ಪ್ರಮುಖವಾಗಿದೆ (GHSA-74g9-q8f6-793h): ಒಂದು prefix ಅನ್ನು
`startsWith()` ಬಳಸಿ ಹೊಂದಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಆರಂಭಿಕ ಅಕ್ಷರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ಪಕ್ಕದ ಮಾರ್ಗಕ್ಕೂ ಅದು ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.
`/api/usage/om-usage` ಅನ್ನು prefix ಆಗಿ ಗುರುತಿಸುವುದರಿಂದ `/api/usage/om-usage<anything>` PUBLIC ಆಗುತ್ತದೆ, ಮತ್ತು Next ಅದನ್ನು
`/api/usage/[connectionId]` ಗೆ resolve ಮಾಡುತ್ತದೆ — ತನ್ನದೇ ಆದ auth ಇಲ್ಲದ handler.

```ts
// ನಿಜವಾದ ಉಪವೃಕ್ಷಗಳು. ಪ್ರತಿಯೊಂದು ನಮೂದಿನ ಕೊನೆಯಲ್ಲಿ "/" ಇರಲೇಬೇಕು (unit test ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify ನಲ್ಲಿ CLIENT_API ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ, "no-auth public" ಎಂದು ಅಲ್ಲ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ಒಂದೇ ಮಾರ್ಗಗಳು, trailing slash ಇದ್ದರೂ ಇಲ್ಲದಿದ್ದರೂ EXACT ಆಗಿ ಹೊಂದಿಸಲಾಗುತ್ತವೆ.
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP ಗಾಗಿ login ಹಂತ 2; MFA-pending cookie ಅಗತ್ಯವಿದೆ
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin ಸಡಿಲಿಕೆಯನ್ನೂ ಪಡೆಯುವ, ಓದಲು-ಮಾತ್ರದ ಒಂದೇ ಮಾರ್ಗಗಳು.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ಸಡಿಲಿಕೆ ಇಲ್ಲದ, ಓದಲು-ಮಾತ್ರದ ಒಂದೇ ಮಾರ್ಗ.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ಓದಲು-ಮಾತ್ರದ ಮಾರ್ಗಗಳು ಸುರಕ್ಷಿತ ವಿಧಾನಗಳಿಗೆ ಮಾತ್ರ public ಆಗಿರುತ್ತವೆ. ಗಮನಿಸಿ: `classifyRoute()` PUBLIC fall-through ನಿಂದ `/api/v1/*` ಮತ್ತು `/api/v1beta/*` ಅನ್ನು ಹೊರಗಿಡುತ್ತದೆ — ಆದ್ದರಿಂದ ಅವು ಯಾವಾಗಲೂ `CLIENT_API` ಆಗಿರುತ್ತವೆ ಮತ್ತು Bearer-key ನೀತಿ ಅನ್ವಯಿಸುತ್ತದೆ.

## ಹೊಸ ರೂಟ್ ಸೇರಿಸುವುದು

### ಮಾದರಿ 1 — ಸಾರ್ವಜನಿಕ ಕ್ಲೈಂಟ್ API ಎಂಡ್ಪಾಯಿಂಟ್ (Bearer-auth)

`/api/v1/` ಮತ್ತು `/api/v1beta/` ಅಡಿಯಲ್ಲಿರುವ ರೂಟ್ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ `CLIENT_API` ಎಂದು ವರ್ಗೀಕರಿಸಲಾಗುತ್ತದೆ. ಮಿಡಲ್ವೇರ್ Bearer ಪರಿಶೀಲನೆಯನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತದೆ; ರೂಟ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು ಅದನ್ನು ಮರುಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ, ಆದರೆ ಉಪಯುಕ್ತವಾಗಿದ್ದರೆ subject ಅನ್ನು ಓದಬಹುದು.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ಹ್ಯಾಂಡ್ಲರ್ ತರ್ಕ
}
```

### ಮಾದರಿ 2 — ನಿರ್ವಹಣಾ ಎಂಡ್ಪಾಯಿಂಟ್ (ಸೆಷನ್ ಅಥವಾ Bearer + manage)

`src/lib/api/requireManagementAuth.ts` ನಿಂದ `requireManagementAuth()` ಅನ್ನು ಬಳಸಿ:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ಹ್ಯಾಂಡ್ಲರ್ ತರ್ಕ
}
```

ಯಶಸ್ವಿಯಾದಾಗ `requireManagementAuth()` `null` ಅನ್ನು ಅಥವಾ JSON ದೋಷದ `Response` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ:

- 401 `AUTH_001` "ದೃಢೀಕರಣ ಅಗತ್ಯವಿದೆ" — ಯಾವುದೇ ರುಜುವಾತುಗಳಿಲ್ಲ
- 403 — ಅಮಾನ್ಯ Bearer **ಅಥವಾ** Bearer ಇದೆ, ಆದರೆ ಕೀ `manage` / `admin` ಸ್ಕೋಪ್ ಅನ್ನು ಹೊಂದಿಲ್ಲ

`hasManageScope(scopes)` `"manage"` ಅಥವಾ `"admin"` ಗೆ true ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

### ಮಾದರಿ 3 — ಸಾರ್ವಜನಿಕ ಅನುಮತಿ ಪಟ್ಟಿಗೆ ಸೇರಿಸುವುದು

ಅನುಕೂಲತೆಯ ಆಧಾರದ ಮೇಲೆ ಅಲ್ಲ, ಆಕಾರದ ಆಧಾರದ ಮೇಲೆ ಸೆಟ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಒಂದೇ ರೂಟ್ ಅನ್ನು `PUBLIC_API_ROUTES_EXACT` ನಲ್ಲಿ (ಅಥವಾ GET-ಮಾತ್ರಕ್ಕಾಗಿ `PUBLIC_READONLY_CORS_API_ROUTES` ನಲ್ಲಿ) ಇರಿಸಬೇಕು; ನಿಜವಾದ ಉಪವೃಕ್ಷವನ್ನು ಮಾತ್ರ `PUBLIC_API_ROUTE_PREFIXES` ನಲ್ಲಿ ಇರಿಸಬೇಕು ಮತ್ತು ಅದು **`/` ನೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಲೇಬೇಕು**. ಒಂದೇ ರೂಟ್ ಅನ್ನು ಪ್ರಿಫಿಕ್ಸ್ ಪಟ್ಟಿಯಲ್ಲಿ ಇರಿಸುವುದರಿಂದ ಅದರ ಆರಂಭಿಕ ಅಕ್ಷರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ಪಕ್ಕದ ಪಥವೂ ಪ್ರಕಟವಾಗುತ್ತದೆ — ನಂತರ ಸೇರಿಸಲಾದ ಡೈನಾಮಿಕ್-ಸೆಗ್ಮೆಂಟ್ ಸಿಬ್ಲಿಂಗ್ಗಳೂ ಇದರಲ್ಲಿ ಸೇರಿವೆ (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ಮತ್ತು `tests/unit/authz/classify.test.ts` ನಲ್ಲಿರುವ ಯೂನಿಟ್ ಪರೀಕ್ಷೆಗಳನ್ನು ನವೀಕರಿಸಿ.

## ಸ್ಕೋಪ್ಗಳು

ಮೂರು ನೇಮ್ಸ್ಪೇಸ್ಗಳು. ಪ್ರತಿ ಚೆಕರ್ ತನ್ನದೇ ಆದ ಸ್ಟ್ರಿಂಗ್ಗಳನ್ನು ಮಾತ್ರ ಓದುತ್ತದೆ. ಪಕ್ಕಪಕ್ಕದಲ್ಲಿ,
`read:compression` ಗಾಗಿ `manage` ಏಕೆ `scopeMatches` ಅನ್ನು ವಿಫಲಗೊಳಿಸುತ್ತದೆ ಮತ್ತು `read` ಪ್ರವೇಶ ಟೋಕನ್ ಏಕೆ `PATCH /api/keys/{id}` ಅನ್ನು ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ ಎಂಬುದನ್ನು ಒಳಗೊಂಡಂತೆ,
[ಮೂರು ಸ್ಕೋಪ್ ನೇಮ್ಸ್ಪೇಸ್ಗಳು](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API ಕೀಗಳು `scopes` ಅರೇ ಅನ್ನು ಹೊಂದಿರುತ್ತವೆ (`api_keys.scopes` ನಲ್ಲಿ JSON ಆಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ, `src/lib/db/apiKeys.ts` ನೋಡಿ).

### ನಿರ್ವಹಣಾ ಸ್ಕೋಪ್

- `manage` / `admin` — `hasManageScope`. ನಿರ್ವಹಣಾ API ಮಾರ್ಗಗಳಿಗೆ ಬೇರರ್ ಪ್ರವೇಶ.
- `mcp:connect`, `self:usage`, `self:account-quota`, ಮತ್ತು
  `policy:bypass-provider-quota` ಇವುಗಳು ಸಂಯೋಜಕ ನಿಖರ-ಹೊಂದಾಣಿಕೆಯ ಸ್ಕೋಪ್ಗಳು. ಅವು
  `MANAGEMENT_API_KEY_SCOPES` ಹೊರಗಿವೆ. `mcp:connect` ಕೇವಲ
  `/api/mcp/` ನಾನ್-ಲೂಪ್ಬ್ಯಾಕ್ ಕಾರ್ವ್-ಔಟ್ ಅನ್ನು ತೆರೆಯುತ್ತದೆ.

### MCP ಟೂಲ್ ಸ್ಕೋಪ್ಗಳು

ಕ್ಯಾಟಲಾಗ್ ಮತ್ತು ಹೊಂದಾಣಿಕೆಯ ನಿಯಮಗಳು (ಒಂದೇ ಸ್ಟ್ರಿಂಗ್, ಅಥವಾ `*` ನಲ್ಲಿ ಕೊನೆಗೊಳ್ಳುವ ಅನುಮತಿಸಲಾದ ಸ್ಕೋಪ್):
[MCP ಟೂಲ್ ಸ್ಕೋಪ್ಗಳು](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`src/shared/constants/mcpScopes.ts` ನಲ್ಲಿರುವ `MCP_SCOPE_LIST` ಮೂಲ ಟೈಪ್ ಮಾಡಿದ
ಉಪವಿಭಾಗವಾಗಿದೆ, ಆ ಪೂರ್ಣ ಕ್ಯಾಟಲಾಗ್ ಅಲ್ಲ. ಜಾರಿಗೊಳಿಸುವಿಕೆಯು
`open-sse/mcp-server/scopeEnforcement.ts` ನಲ್ಲಿ `resolveCallerScopeContext()`
MCP ದೃಢೀಕರಣ ಮಾಹಿತಿ, ವಿನಂತಿ ಮೆಟಾಡೇಟಾ, ಅಥವಾ `OMNIROUTE_MCP_SCOPES` ನಿಂದ ಸ್ಕೋಪ್ಗಳನ್ನು ಪರಿಹರಿಸಿದ ನಂತರ ನಡೆಯುತ್ತದೆ.
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` ಆಗುವವರೆಗೆ ಇದು ಆಫ್ ಆಗಿರುತ್ತದೆ.

### ಪ್ರವೇಶ-ಟೋಕನ್ ಸ್ಕೋಪ್ಗಳು

`oma_live_…` ಟೋಕನ್ಗಳಲ್ಲಿ `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) ಮೂಲಕ ಶ್ರೇಣೀಕರಿಸಲಾಗಿದೆ. ಈ ಶ್ರೇಣಿಯು ಪ್ರವೇಶ-ಟೋಕನ್
ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ. [ನಿರ್ವಹಣಾ ದೃಢೀಕರಣ](../guides/MANAGEMENT-AUTH.md) ನೋಡಿ.

## ದೃಢೀಕರಣ-ಅಗತ್ಯ ಟಾಗಲ್

`src/shared/utils/apiAuth.ts` ನಲ್ಲಿರುವ `isAuthRequired()` ಒಂದು ವಿನಂತಿಗೆ **ಯಾವುದಾದರೂ** ದೃಢೀಕರಣ ಜಾರಿಗೊಳ್ಳಬೇಕೆ ಎಂದು ನಿರ್ಧರಿಸುತ್ತದೆ:

- `settings.requireLogin === false` → ದೃಢೀಕರಣ ಜಾಗತಿಕವಾಗಿ ನಿಷ್ಕ್ರಿಯ, ಆದರೆ ಯಾವಾಗಲೂ-ರಕ್ಷಿತ ಶ್ರೇಣಿ (ನೋಡಿ [ರೂಟ್ ಗಾರ್ಡ್ ಶ್ರೇಣಿಗಳು](../security/ROUTE_GUARD_TIERS.md)) ಮತ್ತು ಅದು ಸ್ವೀಕರಿಸುವ ಕ್ರೆಡೆನ್ಶಿಯಲ್ ನೀಡುವ ಕರೆಗಳ ಹೊರತಾಗಿ — ಇವಕ್ಕೆ ಲಾಗಿನ್ ಆನ್ ಇದ್ದಾಗ ಬೇಕಾದ ಅದೇ ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಬೇಕು: ಸಿಂಕ್ ಟೋಕನ್‌ಗಳನ್ನು ನೀಡುವುದು, ಯಾವುದೇ ಸ್ಕೋಪ್‌ನಲ್ಲಿ CLI ಪ್ರವೇಶ ಟೋಕನ್‌ಗಳನ್ನು ರಚಿಸುವುದು, ಮತ್ತು `manage`/`admin` ಸ್ಕೋಪ್‌ನ API ಕೀಯನ್ನು ರಚಿಸುವುದು, ಆ ಸ್ಕೋಪ್ ಅನ್ನು ಕೀಗೆ ನೀಡುವುದು, ಅಥವಾ ಅಂತಹ ಕೀಯನ್ನು ಮರು-ಉತ್ಪಾದಿಸುವುದು ಅಥವಾ ಬಹಿರಂಗಪಡಿಸುವುದು (`src/lib/api/requireManagementAuth.ts` ನಲ್ಲಿರುವ `requireCredentialForManagementScopedKey()`). ಇನ್‌ಫರೆನ್ಸ್-ಮಾತ್ರ ಕೀಗಳು ತೆರೆದೇ ಉಳಿಯುತ್ತವೆ.
- ಯಾವುದೇ ಪಾಸ್‌ವರ್ಡ್ ಕಾನ್ಫಿಗರ್ ಆಗಿಲ್ಲ **ಮತ್ತು** `INITIAL_PASSWORD` ಎನ್ವಿರಾನ್ಮೆಂಟ್ ವೇರಿಯಬಲ್ ಇಲ್ಲ → ಬೂಟ್‌ಸ್ಟ್ರ್ಯಾಪ್ ಮೋಡ್ ಆನ್‌ಬೋರ್ಡಿಂಗ್ ವಿಝಾರ್ಡ್ ಮತ್ತು ಲೂಪ್‌ಬ್ಯಾಕ್ ವಿನಂತಿಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ, ಆದರೆ ಬಹಿರಂಗ ನೆಟ್‌ವರ್ಕ್ ವಿನಂತಿಗಳಿಗೆ ಇನ್ನೂ ಕ್ರೆಡೆನ್ಶಿಯಲ್‌ಗಳು ಬೇಕು.
- ಯಾವುದೇ DB ದೋಷ → ವಿಫಲ-ಮುಚ್ಚು (ಸುರಕ್ಷಿತ-ಡೀಫಾಲ್ಟ್).

ಕ್ಲೈಂಟ್ API ಕೀ ಜಾರಿಯು `src/shared/utils/featureFlags.ts` ನಲ್ಲಿರುವ `isRequireApiKeyEnabled()` ಅನ್ನು ಬಳಸುತ್ತದೆ, ನೇರ `process.env.REQUIRE_API_KEY` ಓದಿಕೆಯನ್ನಲ್ಲ. ಇದು ನಿಯೋಜಿತ ನಿದರ್ಶನಗಳಿಗೆ ಮುಖ್ಯ: ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ → ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್‌ಗಳಲ್ಲಿ `REQUIRE_API_KEY` ಟಾಗಲ್ ಮಾಡಿದರೆ DB ಓವರ್‌ರೈಡ್ ಸಂಗ್ರಹವಾಗುತ್ತದೆ ಮತ್ತು ತಕ್ಷಣ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ಮತ್ತು ಈ ಸಹಾಯಕವನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಇತರ ಕ್ಲೈಂಟ್-API ದೃಢೀಕರಣ ಪರಿಶೀಲನೆಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ. ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ಸಂಗ್ರಹವನ್ನು ಓದಲಾಗದಿದ್ದರೆ ಕ್ಲೈಂಟ್ API ದೃಢೀಕರಣ ವಿಫಲ-ಮುಚ್ಚುತ್ತದೆ ಮತ್ತು ಕೀ ಅಗತ್ಯವಿರುತ್ತದೆ.

## ಹೊಂದಾಣಿಕೆಯನ್ನು ಮುರಿಯುವ ಬದಲಾವಣೆ — v3.8.0

`/api/v1/agents/tasks/*` ಮತ್ತು `/api/resilience/model-cooldowns` ಎಂಡ್ಪಾಯಿಂಟ್ಗಳಿಗೆ **ಈಗ ನಿರ್ವಹಣಾ ದೃಢೀಕರಣ ಅಗತ್ಯವಿದೆ** (ಕಮಿಟ್ `588a0333`). ಈ ಹಿಂದೆ `manage` ಸ್ಕೋಪ್ ಇಲ್ಲದ ಸಾಮಾನ್ಯ API ಕೀಯನ್ನು ಕಳುಹಿಸುತ್ತಿದ್ದ ಕ್ಲೈಂಟ್ಗಳು `403` ಸ್ವೀಕರಿಸುತ್ತವೆ. ಮೈಗ್ರೇಶನ್: API Keys ಡ್ಯಾಶ್ಬೋರ್ಡ್ನಲ್ಲಿ ಕೀಗೆ `manage` ಸ್ಕೋಪ್ ನೀಡಿ, ಅಥವಾ ಲಾಗಿನ್ ಆಗಿರುವ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್ ಬಳಸಿ.

## ವರ್ತನೆಯ ಬದಲಾವಣೆ — v3.8.2

`/api/mcp/*` (ರಿಮೋಟ್ MCP ಸರ್ವರ್) ಇನ್ನೂ ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ LOCAL_ONLY ಆಗಿದೆ, ಆದರೆ `Authorization: Bearer <api-key>` ಹೆಡರ್ `manage` ಸ್ಕೋಪ್ ಹೊಂದಿರುವಾಗ ಈಗ ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ವಿನಂತಿಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ. ಈ ವಿನಾಯಿತಿಯನ್ನು `src/server/authz/routeGuard.ts` ನಲ್ಲಿನ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ಮೂಲಕ ಪ್ರತಿ ಪಾಥ್ಗೆ ಸ್ಪಷ್ಟವಾಗಿ ನಿಯಂತ್ರಿಸಲಾಗಿದೆ; ಸಮಾನ ಮಟ್ಟದ LOCAL_ONLY ಪ್ರಿಫಿಕ್ಸ್ `/api/cli-tools/runtime/*` ಅನಿಯಂತ್ರಿತ ಉಪಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಪ್ರಾರಂಭಿಸಬಹುದಾದ ಕಾರಣ ಅದನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಬೈಪಾಸ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ಮೂಲಗಳಿಂದ `/api/mcp/*` ಗೆ ಬರುವ ಅನಾಮಧೇಯ ವಿನಂತಿಗಳು `403 LOCAL_ONLY` ಅನ್ನು ಮರಳಿಸುವುದನ್ನು ಮುಂದುವರಿಸುತ್ತವೆ — ಯಾವುದೇ ಹೊಸ LOCAL_ONLY ಪಾಥ್ನ ಪೂರ್ವನಿಯೋಜಿತ ವರ್ತನೆಯು ಕಟ್ಟುನಿಟ್ಟಾದ ಲೂಪ್ಬ್ಯಾಕ್ ಆಗಿಯೇ ಉಳಿಯುತ್ತದೆ. [ರೂಟ್ ಗಾರ್ಡ್ ಹಂತಗಳು](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ನೋಡಿ.

## ಪರೀಕ್ಷೆ

- ಯೂನಿಟ್ ಪರೀಕ್ಷೆಗಳು: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- ಸಾರ್ವಜನಿಕ ಅನುಮತಿ ಪಟ್ಟಿ: `tests/unit/public-api-routes.test.ts`.
- ಕೇಂದ್ರೀಕೃತವಾಗಿ ಚಲಾಯಿಸಲು: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## ಡೀಬಗ್ ಮಾಡಲಾಗುತ್ತಿದೆ

ಪೈಪ್ಲೈನ್ ಯಾವಾಗಲೂ ಇದರೊಂದಿಗೆ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಮುದ್ರೆ ಮಾಡುತ್ತದೆ:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ದೃಢೀಕೃತ ವಿನಂತಿಗಳಿಗಾಗಿ ಅಪ್ಸ್ಟ್ರೀಮ್ (ಹ್ಯಾಂಡ್ಲರ್-ಸೈಡ್) ವಿನಂತಿ ಹೆಡರ್ಗಳು ಸಹ ಸೇರಿವೆ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ಹ್ಯಾಂಡ್ಲರ್ಗಳ ಒಳಗೆ `assertAuth(req, expectedClass)` ಬಳಸಿ — ಇದು ಮಿಡಲ್ವೇರ್ ಅನ್ನು ಬೈಪಾಸ್ ಮಾಡಿದರೆ ಕೋಡ್ `AUTHZ_NOT_INITIALIZED` ಜೊತೆಗೆ `AuthzAssertionError` ಎಸೆಯುತ್ತದೆ (ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಕಾನ್ಫಿಗರೇಶನ್ ರಿಗ್ರೆಷನ್ಗಳನ್ನು ಹಿಡಿಯಲು ಸಹಾಯಕವಾಗಿದೆ).

## ಸಹ ನೋಡಿ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ಪ್ರತಿ ಎಂಡ್ಪಾಯಿಂಟ್ಗೆ ದೃಢೀಕರಣ ಮಾರ್ಕರ್
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ದೃಢೀಕರಣ ಘಟನೆಗಳಿಗಾಗಿ ಆಡಿಟ್ ಲಾಗ್
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ಮೂರು ಸ್ಕೋಪ್ ನೇಮ್ಸ್ಪೇಸ್ಗಳು ಮತ್ತು MCP ಟೂಲ್-ಸ್ಕೋಪ್ ಕ್ಯಾಟಲಾಗ್
- ಮೂಲ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
