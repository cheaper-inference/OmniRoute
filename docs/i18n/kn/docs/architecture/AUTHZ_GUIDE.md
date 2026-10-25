# Authorization Guide (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ಸತ್ಯದ ಮೂಲ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ:** 2026-09-22 — ಸ್ಕೋಪ್ ನೇಮ್ಸ್ಪೇಸ್ಗಳು MCP-SERVER.md ಅನ್ನು ಸೂಚಿಸುತ್ತವೆ

ಓಮ್ನಿರೂಟ್ ಪ್ರತಿ API ವಿನಂತಿಯನ್ನು ನಿಯಂತ್ರಿಸುವ ರೂಟ್-ಅರಿವಿನ ದೃಢೀಕರಣ ಪೈಪ್ಲೈನ್ ಅನ್ನು ಹೊಂದಿದೆ. ವರ್ಗೀಕರಣವು **ನಿರ್ಣಾಯಕ** ಮತ್ತು **ಫೇಲ್-ಕ್ಲೋಸ್ಡ್** ಆಗಿದೆ — ವರ್ಗೀಕರಿಸಲಾಗದ ಯಾವುದೇ ವಿಷಯವು `MANAGEMENT` ಆಗಿ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ ಮತ್ತು ಸೆಷನ್ ಅಥವಾ ಮ್ಯಾನೇಜ್ಮೆಂಟ್-ಗ್ರೇಡ್ ಟೋಕನ್ ಅನ್ನು ಬೇಡುತ್ತದೆ. ಈ ಪುಟವು ರೂಟ್ಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಅಥವಾ ಹೊಸ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸುವ ಎಂಜಿನಿಯರ್ಗಳಿಗೆ ಮಾದರಿಯನ್ನು ವಿವರಿಸುತ್ತದೆ.

![AuthZ ಪೈಪ್ಲೈನ್ (3 ರೂಟ್ ವರ್ಗಗಳು + ನೀತಿ ಮೌಲ್ಯಮಾಪನ)](../diagrams/exported/authz-pipeline.svg)

> ಮೂಲ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ಎರಡು ದೃಢೀಕರಣ ಮೋಡ್‌ಗಳು

### 1. API ಕೀ (Bearer)

OpenAI/Anthropic/Gemini-ಹೊಂದಾಣಿಕೆಯ ಕ್ಲೈಂಟ್ API ಗಳಿಗೆ ಮತ್ತು ಕೀಗೆ `manage` ಸ್ಕೋಪ್ ಇದ್ದಾಗ ಕೆಲವು ನಿರ್ವಹಣಾ ರೂಟ್‌ಗಳಿಗೆ ಇದನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ನಲ್ಲಿರುವ `isValidApiKey()` / `extractApiKey()` ಮೂಲಕ ಇದನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ ಮತ್ತು `src/shared/utils/apiAuth.ts` ಮೂಲಕ ಮರು-ಎಕ್ಸ್‌ಪೋರ್ಟ್ ಮಾಡಲಾಗುತ್ತದೆ. ಪರಿಶೀಲಕವು `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ಎನ್ವಿರಾನ್ಮೆಂಟ್ ವೇರಿಯಬಲ್‌ಗಳನ್ನು ಶಾಶ್ವತ ಪಾಸ್‌ಥ್ರೂ ಕೀಗಳಾಗಿ ಸಹ ಸ್ವೀಕರಿಸುತ್ತದೆ (ಸಮಸ್ಯೆ #1350).

### 2. ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್ (auth_token ಕುಕೀ)

ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪುಟಗಳು ಮತ್ತು ಆಡಳಿತ ಕಾರ್ಯಾಚರಣೆಗಳಿಗಾಗಿ.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ಪರಿಶೀಲನೆ ಯಶಸ್ವಿಯಾಗಿದ್ದು **ಮತ್ತು** ಅದರಲ್ಲಿ `authenticated: true` ಇದ್ದಾಗ ಮಾತ್ರ ಕುಕೀ ಸೆಷನ್ ಆಗುತ್ತದೆ (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). ಕುಕೀಯನ್ನು ಬಳಸುವ ಪ್ರತಿಯೊಂದು ಘಟಕವೂ — ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ರೂಟ್ ಗಾರ್ಡ್ (`isDashboardSessionAuthenticated()`), authz ಪೈಪ್‌ಲೈನ್ ರಿಫ್ರೆಶ್, WebSocket ಹ್ಯಾಂಡ್‌ಶೇಕ್, ಲೈವ್ ಸರ್ವರ್, `/api/settings/require-login`, `/api/auth/status` — ಆ ಸಹಾಯಕ ಫಂಕ್ಷನ್ ಮೂಲಕವೇ ಹೋಗುತ್ತದೆ. `JWT_SECRET` ನಿಂದ ಸಹಿ ಮಾಡಲಾದ ಇತರ JWT ಗಳೂ ಇವೆ — Cursor CLI passthrough ಕೀ ಹೊಂದಿರುವವರಿಗೆ `iss "omniroute" / aud "cursor-cli"` ಟೋಕನ್‌ಗಳನ್ನು ನೀಡುತ್ತದೆ — ಅವು ಎಂದಿಗೂ ಸೆಷನ್ ಆಗುವುದಿಲ್ಲ (#13298).

`src/shared/utils/apiAuth.ts` ನಲ್ಲಿರುವ `isDashboardSessionAuthenticated()` ಮೂಲಕ ಇದನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ. JWT ನ 30-ದಿನದ ಜೀವಿತಾವಧಿಯಲ್ಲಿ 7 ದಿನಗಳಿಗಿಂತ ಕಡಿಮೆ ಉಳಿದಿದ್ದರೆ ಪೈಪ್‌ಲೈನ್ ಅದನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಿಫ್ರೆಶ್ ಮಾಡುತ್ತದೆ.

ಸೆಷನ್ 30 ದಿನಗಳು ಮುಗಿಯುವ ಮೊದಲೇ ಕೊನೆಗೊಳ್ಳಬಹುದು: ಪ್ರತಿಯೊಂದು ಮಿಂಟರ್ `mintDashboardSessionToken` ಮೂಲಕ ಹೋಗುತ್ತದೆ (ವಿತರಣಾ ಸಮಯ `iat` ಮತ್ತು ಗುರುತು `jti` ಸಹಿತ), ಮತ್ತು ಪರಿಶೀಲಕ ಎರಡು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ: ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾವಣೆಯಿಂದ ಹೊಂದಿಸಲಾಗುವ `sessionsValidAfter` (ಅದಕ್ಕಿಂತ ಮೊದಲು ನೀಡಲಾದ ಪ್ರತಿ ಸೆಷನ್ ಮಾನ್ಯವಾಗುವುದಿಲ್ಲ — ಪಾಸ್‌ವರ್ಡ್ ಬದಲಿಸಿದ ಬ್ರೌಸರ್ ಹೊಸ ಕುಕೀ ಪಡೆಯುತ್ತದೆ), ಮತ್ತು `POST /api/auth/logout` ಸೈನ್-ಔಟ್ ಆದ ಸೆಷನ್‌ನ `jti` ಅನ್ನು ಸೇರಿಸುವ `revokedDashboardSessions`. ಹಳೆಯ ಬಿಡುಗಡೆಯಿಂದ ನೀಡಲಾದ ಸೆಷನ್‌ಗಳಲ್ಲಿ ಈ ಕ್ಲೇಮ್‌ಗಳಿರುವುದಿಲ್ಲ ಮತ್ತು ಮೊದಲ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾವಣೆಯವರೆಗೆ ಮಾನ್ಯವಾಗಿರುತ್ತವೆ. ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಓದಲಾಗದಿದ್ದರೆ ಸೆಷನ್ ನಂಬಲಾಗುವುದಿಲ್ಲ.

ಕೆಲವು ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ರೂಟ್‌ಗಳು **ಯಾವುದಾದರೂ** ಒಂದು ಮೋಡ್ ಅನ್ನು ಒಪ್ಪುತ್ತವೆ: API ಕೀಗೆ `manage` (ಅಥವಾ `admin`) ಸ್ಕೋಪ್ ಇದ್ದರೆ ಕುಕೀ ಅಥವಾ `Bearer <key>`. v3.8 ರಲ್ಲಿ ಸೇರಿಸಲಾದ "API ಕರೆಗಳ ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದಾದ" ಕಾರ್ಯಪ್ರವಾಹವನ್ನು ಇದು ಸಾಧ್ಯವಾಗಿಸುತ್ತದೆ.

#### ಐಚ್ಛಿಕ OIDC ಲಾಗಿನ್ ಗೇಟ್ (#6973)

ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಆಡಳಿತ ಲಾಗಿನ್ ಡೀಫಾಲ್ಟ್ ಪಾಸ್‌ವರ್ಡ್ ಲಾಗಿನ್‌ನ ಜೊತೆಗೆ **ಐಚ್ಛಿಕ** OIDC (OpenID Connect) ಹರಿವನ್ನೂ ಬೆಂಬಲಿಸುತ್ತದೆ — ಪಾಸ್‌ವರ್ಡ್ ಲಾಗಿನ್ ಎಂದಿಗೂ ತೆಗೆದುಹಾಕಲ್ಪಡುವುದಿಲ್ಲ, ಕೇವಲ ಪೂರಕವಾಗಿರುತ್ತದೆ:

- `settings.oidcEnabled === true` **ಮತ್ತು** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` ಎಲ್ಲವೂ ಕಾನ್ಫಿಗರ್ ಆಗಿದ್ದರೆ ಮಾತ್ರ ಇದು ಸಕ್ರಿಯವಾಗಿರುತ್ತದೆ (Settings → Auth). ಇಲ್ಲದಿದ್ದರೆ `GET /api/auth/oidc/login` `400` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.
- `GET /api/auth/oidc/login` ಎಂಬುದು issuer ನ `/.well-known/openid-configuration` ನಿಂದ `authorization_endpoint` ಅನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ (ಇಲ್ಲದಿದ್ದರೆ `<issuer>/authorize` ಗೆ ಹಿಂದಿರುಗುತ್ತದೆ), ಒಳಬರುವ ವಿನಂತಿಯಿಂದ redirect URI ಅನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ (`x-forwarded-proto` ಅರಿವಿನೊಂದಿಗೆ), ಮತ್ತು `httpOnly` `oidc_state` ಕುಕೀಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ ಯಾದೃಚ್ಛಿಕ `state` ನೊಂದಿಗೆ IdP ಗೆ ರೀಡೈರೆಕ್ಟ್ ಮಾಡುತ್ತದೆ.
- `GET /api/auth/oidc/callback` `state` ಅನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ, ದೃಢೀಕರಣ ಕೋಡ್ ಅನ್ನು ವಿನಿಮಯ ಮಾಡುತ್ತದೆ, ಮತ್ತು issuer ನ JWKS ಮೂಲಕ ID ಟೋಕನ್‌ನ ಸಹಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ (`jose` ನ `createRemoteJWKSet`, ಪ್ರತಿ JWKS URI ಗೆ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ) ಮತ್ತು `issuer`/`audience` ಪರಿಶೀಲನೆ ನಡೆಸುತ್ತದೆ. `oidcAllowedSubjects` ಅನುಮತಿ ಪಟ್ಟಿ ಕಡ್ಡಾಯ: ಇದು ಟೋಕನ್‌ನ `sub` ಕ್ಲೇಮ್ ಅಥವಾ `email` ಕ್ಲೇಮ್‌ಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ — `email` ಕ್ಲೇಮ್ ಕೇವಲ `email_verified === true` ಆದಾಗ ಮಾತ್ರ ಪರಿಗಣಿಸಲ್ಪಡುತ್ತದೆ, ಆದ್ದರಿಂದ IdP ಯಲ್ಲಿನ ಪರಿಶೀಲಿಸದ ಇಮೇಲ್ ಎಂದಿಗೂ ಗೇಟ್ ದಾಟಲಾರದು — ಮತ್ತು ನಮೂದುಗಳಿಲ್ಲದಿದ್ದರೆ ಕಾಲ್‌ಬ್ಯಾಕ್ ಪ್ರತಿ ಲಾಗಿನ್ ಅನ್ನು ನಿರಾಕರಿಸುತ್ತದೆ (`not_configured`).
- ಯಶಸ್ವಿಯಾದರೆ ಪಾಸ್‌ವರ್ಡ್ ಲಾಗಿನ್ ನೀಡುವಂತೆಯೇ **ಅದೇ** 30-ದಿನದ `auth_token` JWT ಅನ್ನು ವಿತರಿಸುತ್ತದೆ (`src/app/api/auth/login/route.ts`), ಆದ್ದರಿಂದ ಉಳಿದ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್ ಪೈಪ್‌ಲೈನ್ (ಸ್ವಯಂ-ರಿಫ್ರೆಶ್, ಕುಕೀ ಫ್ಲ್ಯಾಗ್‌ಗಳು) ಬದಲಾಗುವುದಿಲ್ಲ — OIDC ಕುಕೀ ಹೇಗೆ ಪಡೆಯಲ್ಪಡುತ್ತದೆ ಎನ್ನುವುದನ್ನು ಮಾತ್ರ ಬದಲಾಯಿಸುತ್ತದೆ, ಅದು ನೀಡುವ ಅನುಮತಿಗಳನ್ನಲ್ಲ.
- ಪ್ರತಿಯೊಂದು `oidc*` ಸೆಟ್ಟಿಂಗ್ (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS` ನಲ್ಲಿದೆ (`src/shared/constants/securityImpactingSettings.ts`): ದೇಹದಲ್ಲಿ ಆಡಳಿತ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು `currentPassword` ಆಗಿ ಕಳುಹಿಸದ ಹೊರತು `PATCH /api/settings` `400 PASSWORD_REQUIRED` ಅನ್ನು ನೀಡುತ್ತದೆ (ಅದು ತಪ್ಪಾಗಿದ್ದರೆ `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` ಪಾಸ್‌ವರ್ಡ್ _ಲಾಗಿನ್_ (`POST /api/auth/login`) ಅನ್ನು ನಿರಾಕರಿಸುತ್ತದೆ ಆದರೆ ಸಂಗ್ರಹಿತ ಪಾಸ್‌ವರ್ಡ್ ಹ್ಯಾಶ್ ಅನ್ನು ಉಳಿಸುತ್ತದೆ, ಮತ್ತು ಮರು-ದೃಢೀಕರಣವು ಇನ್ನೂ `currentPassword` ಅನ್ನು ಅದರ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸುತ್ತದೆ.
- `corsOrigins` ಮತ್ತು `bruteForceProtection` ಕೂಡ `SECURITY_IMPACTING_SETTINGS_KEYS` ನಲ್ಲಿವೆ: ಇವುಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿದರೆ ಲಾಗಿನ್ ರಕ್ಷಣೆಗಳು ದುರ್ಬಲಗೊಳ್ಳುತ್ತವೆ, ಆದ್ದರಿಂದ ಅವೂ ಅದೇ `currentPassword` ಮರು-ದೃಢೀಕರಣವನ್ನು ಬಯಸುತ್ತವೆ (Security ಟ್ಯಾಬ್ ಅದನ್ನು ಕೇಳುತ್ತದೆ) ಮತ್ತು JSON ಆಮದು ಅವುಗಳನ್ನು ಬಿಟ್ಟುಬಿಡುತ್ತದೆ.
- ಪ್ರತಿಯೊಂದು ಭದ್ರತಾ-ನೀತಿ ಕೀ — `SECURITY_IMPACTING_SETTINGS_KEYS` ನ ನಮೂದುಗಳು, ಪ್ರತಿ `oidc*` ಕೀ ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್ ಸ್ಥಿತಿ — `PATCH /api/settings` ನಲ್ಲಿ **ಆಪರೇಟರ್-ಮಾತ್ರ**: `manage` ಸ್ಕೋಪ್‌ನ API ಕೀ ಅಥವಾ `oma_` ಪ್ರವೇಶ ಟೋಕನ್ ಸರಿಯಾದ `currentPassword` ಕಳುಹಿಸಿದರೂ `403` ನೊಂದಿಗೆ ನಿರಾಕರಿಸಲ್ಪಡುತ್ತದೆ, ಮತ್ತು ಆ ನಿರಾಕರಣೆಯನ್ನು `reason: OPERATOR_REQUIRED` ನೊಂದಿಗೆ `settings.update_failed` ಎಂದು ಆಡಿಟ್ ಮಾಡಲಾಗುತ್ತದೆ (`src/lib/api/operatorCredential.ts` ನಲ್ಲಿರುವ `requireOperatorCredential()`). ಸಾಮಾನ್ಯ ಸೆಟ್ಟಿಂಗ್‌ಗಳು (ಥೀಮ್, ಪ್ರದರ್ಶನ ಆದ್ಯತೆಗಳು) `manage` ಕೀ ಅಥವಾ `admin` ಪ್ರವೇಶ ಟೋಕನ್‌ಗೆ ಬರೆಯಬಹುದಾದವಾಗಿಯೇ ಉಳಿಯುತ್ತವೆ. `/api/settings` ನ ಪ್ರತಿಯೊಂದು ಬದಲಾವಣೆಗೆ (ಮತ್ತು `/api/settings/require-login` ಗೆ) `admin` ಪ್ರವೇಶ-ಟೋಕನ್ ಸ್ಕೋಪ್ ಕೂಡ ಬೇಕು (`src/server/authz/accessScopes.ts` ನಲ್ಲಿರುವ `ADMIN_MUTATION_EXACT_PATHS`, ನಿಖರ-ಮಾರ್ಗ ಹೊಂದಾಣಿಕೆ); `GET` `read` ಆಗಿಯೇ ಉಳಿಯುತ್ತದೆ, ಮತ್ತು ಇತರ `/api/settings/*` ಉಪ-ರೂಟ್‌ಗಳು (ಪ್ರಾಕ್ಸಿಗಳು, combo ಡೀಫಾಲ್ಟ್‌ಗಳು, ಮಾದರಿ ಅಲಿಯಾಸ್‌ಗಳು, ಕಂಪ್ರೆಷನ್, ಶುದ್ಧೀಕರಣಗಳು…) ವಿಧಾನದಿಂದ ಊಹಿಸಲಾದ `write` ಸ್ಕೋಪ್ ಅನ್ನೇ ಉಳಿಸಿಕೊಳ್ಳುತ್ತವೆ.
- `POST /api/settings/import-json` ಈ ಮರು-ದೃಢೀಕರಣವನ್ನು ಬಿಟ್ಟುಬಿಡುತ್ತದೆ, ಆದ್ದರಿಂದ ಬರೆಯುವ ಮೊದಲು `IMPORT_STRIPPED_SETTINGS_KEYS` (ಅದೇ ಫೈಲ್) ನಲ್ಲಿರುವ ಪ್ರತಿ ಕೀಯನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ: ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು `currentPassword`, ಪ್ರತಿ `SECURITY_IMPACTING_SETTINGS_KEYS` ನಮೂದು, ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸೆಷನ್ ಸ್ಥಿತಿ (`sessionsValidAfter`, `revokedDashboardSessions`). ಹಳೆಯ ಬ್ಯಾಕಪ್ ಅನ್ನು ಆಮದು ಮಾಡುವುದರಿಂದ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾವಣೆ ಅಥವಾ ಸೈನ್-ಔಟ್ ಈಗಾಗಲೇ ಕೊನೆಗೊಳಿಸಿದ ಸೆಷನ್ ಮರುಜೀವ ಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ.

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
ಒಳಬರುವ ವಿನಂತಿ → src/proxy.ts
  → src/server/authz/pipeline.ts ನಲ್ಲಿರುವ runAuthzPipeline()
    1. ವಿಶ್ವಾಸಾರ್ಹ ಆಂತರಿಕ ಹೆಡರ್ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ (x-omniroute-auth-*, x-omniroute-route-class)
    2. ವಿನಂತಿ id ರಚಿಸಿ, classifyRoute() ಮೂಲಕ ರೂಟ್ ಅನ್ನು ವರ್ಗೀಕರಿಸಿ
    3. pathname == "/" ಆಗಿದ್ದರೆ → /dashboard ಗೆ ಮರುನಿರ್ದೇಶಿಸಿ
    4. ಡ್ರೇನಿಂಗ್ (ಸಮರ್ಪಕ ಸ್ಥಗಿತಗೊಳಿಸುವಿಕೆ) ಸ್ಥಿತಿಯಲ್ಲಿದ್ದು /api/* ಆಗಿದ್ದರೆ → 503
    5. GET ಅಲ್ಲದ /api/* ಆಗಿದ್ದರೆ → checkBodySize() ಗಾರ್ಡ್
    6. OPTIONS ಆಗಿದ್ದರೆ → CORS ಪ್ರೀಫ್ಲೈಟ್ 204
    7. options.enforce == false ಆಗಿದ್ದರೆ → ರೂಟ್-ವರ್ಗದ ಹೆಡರ್ಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಮುಂದಕ್ಕೆ ಕಳುಹಿಸಿ
    8. ಇಲ್ಲದಿದ್ದರೆ: POLICIES[routeClass].evaluate(ctx)
       - ಅನುಮತಿಸಿ → x-omniroute-auth-{kind,id,label,scopes} ಮುದ್ರಿಸಿ → NextResponse.next()
       - ತಿರಸ್ಕರಿಸಿ → correlation_id ಹೊಂದಿರುವ JSON ದೋಷ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟಗಳು → 302 /login)
```

ವಿಶ್ವಾಸಾರ್ಹ ಆಂತರಿಕ ಹೆಡರ್ಗಳನ್ನು (`src/server/authz/headers.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ) ವರ್ಗೀಕರಣಕ್ಕೂ ಮೊದಲು **ಒಳಬರುವ ವಿನಂತಿಗಳಿಂದ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ** — ಒಂದು ಸಬ್ಜೆಕ್ಟ್ನಂತೆ ಸೋಗು ಹಾಕಲು ಕ್ಲೈಂಟ್ಗಳು `x-omniroute-auth-*` ಅನ್ನು ಮುಂಚಿತವಾಗಿ ತುಂಬಲು ಸಾಧ್ಯವಿಲ್ಲ.

### ಪಾಲಿಸಿ ಒಪ್ಪಂದಗಳು

ಪ್ರತಿಯೊಂದು ರೂಟ್ ವರ್ಗವು `src/server/authz/policies/` ನಲ್ಲಿ ಒಂದು ಪಾಲಿಸಿಯನ್ನು ಹೊಂದಿದೆ:

- **`publicPolicy`** (`policies/public.ts`) — ಯಾವಾಗಲೂ `allow({ kind: "anonymous", id: "anonymous" })` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ಅನ್ನು ಹೊರತೆಗೆದು, `validateApiKey()` ಮೂಲಕ ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ. ಪರಿಣಾಮಕಾರಿ `REQUIRE_API_KEY` ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ನಿಷ್ಕ್ರಿಯವಾಗಿರುವಾಗ ಮಾತ್ರ ಅನಾಮಧೇಯ ಬಳಕೆಗೆ ಮುಂದುವರಿಯುತ್ತದೆ. ಪರಿಣಾಮಕಾರಿ ಫ್ಲ್ಯಾಗ್ ಅನ್ನು `isRequireApiKeyEnabled()` (`DB ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ಓವರ್ರೈಡ್ > process.env.REQUIRE_API_KEY > ಡೀಫಾಲ್ಟ್`) ಮೂಲಕ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ; ಆದ್ದರಿಂದ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ಗಳು ಮತ್ತು ಎನ್ವಿರಾನ್ಮೆಂಟ್ ವೇರಿಯಬಲ್ಗಳು `/api/v1/*`, `/api/v1beta/*`, ಮತ್ತು ಅಲಿಯಾಸ್ಗಳನ್ನು ಏಕರೂಪವಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತವೆ; ರಿಸಲ್ವರ್ ವೈಫಲ್ಯಗಳ ಸಂದರ್ಭದಲ್ಲಿ ಪ್ರವೇಶವನ್ನು ನಿರಾಕರಿಸಲಾಗುತ್ತದೆ. ಕ್ಲೈಂಟ್ API ರೂಟ್ಗಳಲ್ಲಿ ಡ್ಯಾಶ್ಬೋರ್ಡ್-ಸೆಷನ್ ವಿನಂತಿಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮಾಡೆಲ್ ಕ್ಯಾಟಲಾಗ್ ಬಳಸುವ `/api/v1/models` ಸೇರಿದಂತೆ).
- **`managementPolicy`** (`policies/management.ts`) — ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್, ಆಂತರಿಕ ಮಾಡೆಲ್-ಸಿಂಕ್ ವಿನಂತಿಗಳನ್ನು (`/api/providers/[name]/(sync-models|models)` ಗೆ ಹೊಂದಾಣಿಕೆ ಮಾಡಲಾಗುತ್ತದೆ) ಸ್ವೀಕರಿಸುತ್ತದೆ, ಅಥವಾ `isAuthRequired()` false ಅನ್ನು ಹಿಂದಿರುಗಿಸಿದರೆ ಸಂಪೂರ್ಣವಾಗಿ ಬಿಟ್ಟುಬಿಡುತ್ತದೆ. Bearer ಟೋಕನ್ ಇದ್ದರೂ ಅದು ಅಮಾನ್ಯವಾಗಿದ್ದರೆ 403 (`AUTH_001`), ಇಲ್ಲದಿದ್ದರೆ 401 ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಯಾವುದೇ ದೃಢೀಕರಣ ಶಾಖೆಗೂ ಮೊದಲು ರೂಟ್-ಗಾರ್ಡ್ ಶ್ರೇಣಿಗಳನ್ನೂ (LOCAL_ONLY / ALWAYS_PROTECTED) ಜಾರಿಗೊಳಿಸುತ್ತದೆ — [ರೂಟ್ ಗಾರ್ಡ್ ಶ್ರೇಣಿಗಳು](../security/ROUTE_GUARD_TIERS.md) ನೋಡಿ. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ನಲ್ಲಿರುವ LOCAL_ONLY ಪಥಗಳನ್ನು (ಪ್ರಸ್ತುತ: `/api/mcp/`) Bearer ಕೀ `manage` ಸ್ಕೋಪ್ ಹೊಂದಿರುವಾಗ ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ಮೂಲದಿಂದ ಪ್ರವೇಶಿಸಬಹುದು; ಸ್ಕೋಪ್ ಯಾವುದೇ ಆಗಿರಲಿ, ಉಳಿದ ಎಲ್ಲ LOCAL_ONLY ಪಥಗಳು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಲೂಪ್ಬ್ಯಾಕ್ಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗಿರುತ್ತವೆ.

ಯಶಸ್ವಿಯಾದ ಪಾಲಿಸಿಯು `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ಹೊಂದಿರುವ `AuthSubject` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಡೌನ್ಸ್ಟ್ರೀಮ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು ದೃಢೀಕರಣ ಲಾಜಿಕ್ ಅನ್ನು ಮರುಚಾಲನೆ ಮಾಡುವ ಬದಲು `src/server/authz/assertAuth.ts` ನಲ್ಲಿರುವ `assertAuth(request, "CLIENT_API")` ಮೂಲಕ ಅದನ್ನು ಓದಬಹುದು.

## ಸಾರ್ವಜನಿಕ ರೂಟ್ಗಳ ಪಟ್ಟಿ

`src/shared/constants/publicApiRoutes.ts` ಸ್ಪಷ್ಟವಾದ ಅನುಮತಿ ಪಟ್ಟಿಯಾಗಿದೆ:

ಪಟ್ಟಿಯನ್ನು **ಆಕಾರದ** ಆಧಾರದ ಮೇಲೆ ವಿಭಜಿಸಲಾಗಿದೆ ಮತ್ತು ಈ ವಿಭಜನೆ ಅತ್ಯಗತ್ಯವಾಗಿದೆ (GHSA-74g9-q8f6-793h): ಪ್ರಿಫಿಕ್ಸ್ ಅನ್ನು
`startsWith()` ಬಳಸಿ ಹೊಂದಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಅದು ತನ್ನ ಆರಂಭಿಕ ಅಕ್ಷರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ಪಕ್ಕದ ಪಥಕ್ಕೂ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.
`/api/usage/om-usage` ಅನ್ನು ಪ್ರಿಫಿಕ್ಸ್ ಆಗಿ ಬಳಸಿದಾಗ `/api/usage/om-usage<anything>` ಅನ್ನು PUBLIC ಎಂದು ಗುರುತಿಸಲಾಗುತ್ತಿತ್ತು ಮತ್ತು Next ಅದನ್ನು
`/api/usage/[connectionId]` ಗೆ ಪರಿಹರಿಸುತ್ತದೆ — ತನ್ನದೇ ಆದ auth ಇಲ್ಲದ ಹ್ಯಾಂಡ್ಲರ್.

```ts
// ನಿಜವಾದ ಉಪವೃಕ್ಷಗಳು. ಪ್ರತಿಯೊಂದು ನಮೂದು "/" ನೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಲೇಬೇಕು (ಯೂನಿಟ್ ಪರೀಕ್ಷೆಯಿಂದ ದೃಢಪಡಿಸಲಾಗಿದೆ).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify ನಲ್ಲಿ CLIENT_API ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ, "no-auth public" ಎಂದು ಅಲ್ಲ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ಒಂದೇ ರೂಟ್ಗಳು, ನಿಖರವಾಗಿ ಹೊಂದಿಸಲಾಗುತ್ತದೆ (ಕೊನೆಯಲ್ಲಿ ಸ್ಲ್ಯಾಶ್ ಇದ್ದರೂ ಅಥವಾ ಇಲ್ಲದಿದ್ದರೂ).
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

// CORS ಮೂಲದ ಸಡಿಲಿಕೆಯನ್ನೂ ಪಡೆಯುವ ಓದಲು-ಮಾತ್ರದ ಒಂದೇ ರೂಟ್ಗಳು.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ಸಡಿಲಿಕೆ ಇಲ್ಲದ ಓದಲು-ಮಾತ್ರದ ಒಂದೇ ರೂಟ್.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ಓದಲು-ಮಾತ್ರದ ರೂಟ್ಗಳು ಸುರಕ್ಷಿತ ವಿಧಾನಗಳಿಗೆ **ಮಾತ್ರ** ಸಾರ್ವಜನಿಕವಾಗಿರುತ್ತವೆ. ಗಮನಿಸಿ: `classifyRoute()` PUBLIC ಫಾಲ್-ಥ್ರೂನಿಂದ `/api/v1/*` ಮತ್ತು `/api/v1beta/*` ಅನ್ನು ಹೊರತುಪಡಿಸುತ್ತದೆ — ಇವು ಯಾವಾಗಲೂ `CLIENT_API` ಆಗಿರುವುದರಿಂದ Bearer-ಕೀ ನೀತಿಯು ಇನ್ನೂ ಅನ್ವಯಿಸುತ್ತದೆ.

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

## ದೋಷ ನಿವಾರಣೆ

ಪೈಪ್ಲೈನ್ ಯಾವಾಗಲೂ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಇವುಗಳನ್ನು ಮುದ್ರಿಸುತ್ತದೆ:

```
x-request-id:               <ಸಹಸಂಬಂಧ ಐಡಿ, ದೋಷದ ಬಾಡಿಗಳಲ್ಲಿ ಪ್ರತಿಧ್ವನಿಸಲಾಗುತ್ತದೆ>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ದೃಢೀಕೃತ ವಿನಂತಿಗಳಿಗಾಗಿ ಅಪ್ಸ್ಟ್ರೀಮ್ (ಹ್ಯಾಂಡ್ಲರ್-ಬದಿಯ) ವಿನಂತಿ ಹೆಡರ್ಗಳು ಇವುಗಳನ್ನೂ ಒಳಗೊಂಡಿರುತ್ತವೆ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ಕೊನೆಯ-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ಐಚ್ಛಿಕ)
x-omniroute-auth-scopes:    ಅಲ್ಪವಿರಾಮದಿಂದ-ಬೇರ್ಪಡಿಸಿದ ಪಟ್ಟಿ
```

ಹ್ಯಾಂಡ್ಲರ್ಗಳ ಒಳಗೆ `assertAuth(req, expectedClass)` ಬಳಸಿ — ಮಿಡಲ್ವೇರ್ ಅನ್ನು ಬದಿಗೊತ್ತಿದ್ದರೆ, ಇದು `AUTHZ_NOT_INITIALIZED` ಕೋಡ್ನೊಂದಿಗೆ `AuthzAssertionError` ಅನ್ನು ಎಸೆಯುತ್ತದೆ (ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಕಾನ್ಫಿಗರೇಶನ್ ರಿಗ್ರೆಷನ್ಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಹಾಯಕವಾಗಿದೆ).

## ಸಹ ನೋಡಿ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ಪ್ರತಿ ಎಂಡ್ಪಾಯಿಂಟ್ಗೆ ದೃಢೀಕರಣ ಮಾರ್ಕರ್
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ದೃಢೀಕರಣ ಘಟನೆಗಳಿಗಾಗಿ ಆಡಿಟ್ ಲಾಗ್
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ಮೂರು ಸ್ಕೋಪ್ ನೇಮ್ಸ್ಪೇಸ್ಗಳು ಮತ್ತು MCP ಟೂಲ್-ಸ್ಕೋಪ್ ಕ್ಯಾಟಲಾಗ್
- ಮೂಲ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
