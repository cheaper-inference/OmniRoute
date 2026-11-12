# CORS Configuration & Security (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ಯಾವುದನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ**ಬ್ರೌಸರ್ ಮೂಲಗಳು** ಏಕ, ಕೇಂದ್ರೀಕೃತ ಅನುಮತಿ ಪಟ್ಟಿಯಿಂದ ಅಡ್ಡ-ಮೂಲದ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಓದಬಹುದು. ಮಾದರಿಯಾಗಿದೆ**ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ವಿಫಲವಾಗಿದೆ-ಮುಚ್ಚಲಾಗಿದೆ** : ನೀವು ಒಂದನ್ನು ಆಯ್ಕೆ ಮಾಡುವವರೆಗೆ ಯಾವುದೇ ಮೂಲವನ್ನು ಅನುಮತಿಸಲಾಗುವುದಿಲ್ಲ. ಈ ಪುಟವು ಅನುಮತಿಪಟ್ಟಿ ಹೇಗೆ ಪರಿಹರಿಸುತ್ತದೆ, `CORS_ALLOW_ALL=true` ನಿಜವಾಗಿ ಏನನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ (ಮತ್ತು, ಮುಖ್ಯವಾಗಿ, ಅದು ಏನು ಮಾಡುತ್ತದೆ ಎಂಬುದನ್ನು ದಾಖಲಿಸುತ್ತದೆ.**ಅಲ್ಲ** ), dev vs ಉತ್ಪಾದನೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಹೇಗೆ ಕಾನ್ಫಿಗರ್ ಮಾಡುವುದು ಮತ್ತು ವೈಲ್ಡ್ಕಾರ್ಡ್ ಲೈವ್ ಆಗಿರುವಾಗ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೋರಿಸುವ ರನ್ಟೈಮ್ ಎಚ್ಚರಿಕೆ.

**ಸತ್ಯದ ಮೂಲ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). ಅನುಮತಿ ಪಟ್ಟಿಯನ್ನು ಒಮ್ಮೆ ಅನ್ವಯಿಸಲಾಗುತ್ತದೆ, ಮಿಡಲ್ವೇರ್ (`src/server/authz/pipeline.ts`) — ಪ್ರತಿ-ಮಾರ್ಗ ನಿರ್ವಾಹಕರು `Access-Control-Allow-Origin` ಸ್ವತಃ ಹೊಂದಿಸುವುದಿಲ್ಲ.

## ಮೂಲವನ್ನು ಹೇಗೆ ಪರಿಹರಿಸಲಾಗುತ್ತದೆ

ಪ್ರತಿ ವಿನಂತಿಗಾಗಿ ಮಿಡಲ್ವೇರ್ ಈ ಕ್ರಮದಲ್ಲಿ `Access-Control-Allow-Origin` ಮೌಲ್ಯವನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ:

1. **`CORS_ALLOW_ALL=true`** (ಅಥವಾ ಲೆಗಸಿ `CORS_ORIGIN=*`) → ಯೊಂದಿಗೆ `Vary: Origin` ಯೊಂದಿಗೆ ಕಾಲರ್ನ `Origin` ಬ್ಯಾಕ್ ಅನ್ನು ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ (ಅಥವಾ `Origin` ಹೆಡರ್ ಇಲ್ಲದಿದ್ದಾಗ `*` ). ಅದೇ `applyCorsHeaders()` ಚೋಕ್ಪಾಯಿಂಟ್ ಟೋಕನ್-ದೃಢೀಕೃತ `/v1*`/`/v1beta*` ಮೇಲ್ಮೈಯಲ್ಲಿನ ಪ್ರತಿ 2xx-ವಿತ್-ಬಾಡಿ ಪ್ರತಿಕ್ರಿಯೆಗೆ `Vary: Accept-Encoding` ಸಹ ಸೇರಿಸುತ್ತದೆ (`relaxForTokenAuth`, RFC 9110 §12.5.5, ಸಂಚಿಕೆ #6737), ಆದ್ದರಿಂದ downstream/shared ಕ್ಯಾಶ್ಗಳು ಸಂಕುಚಿತ ವೇರಿಗಳ ವಿರುದ್ಧ ಸಂಕುಚಿತ ವ್ಯತ್ಯಾಸಗಳನ್ನು ಸರಿಯಾಗಿ ಗುರುತಿಸಬಹುದು.
2. ಇಲ್ಲದಿದ್ದರೆ, ವಿನಂತಿಯನ್ನು `Origin` ಅನ್ನು ಸಾಮಾನ್ಯಗೊಳಿಸಲಾಗುತ್ತದೆ (ಲೋವರ್-ಕೇಸ್ಡ್, ಟ್ರೇಲಿಂಗ್ ಸ್ಲ್ಯಾಷ್ ಸ್ಟ್ರಿಪ್ಡ್) ಮತ್ತು ಅದಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ**ವಿಲೀನಗೊಂಡ ಅನುಮತಿಪಟ್ಟಿ** :
   - env **`CORS_ALLOWED_ORIGINS`** — ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿದ ಪಟ್ಟಿ, ಮತ್ತು
   - ರನ್ಟೈಮ್**`corsOrigins`** ಸೆಟ್ಟಿಂಗ್ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ → ಸೆಕ್ಯುರಿಟಿ → _CORS ಅನುಮತಿಸಲಾದ ಮೂಲಗಳು_), `src/lib/config/runtimeSettings.ts` ನಿಂದ `setRuntimeAllowedOrigins()` ಮೂಲಕ ಚುಚ್ಚಲಾಗುತ್ತದೆ.
3. ಯಾವುದೇ ಹೊಂದಾಣಿಕೆ → ಇಲ್ಲ **ಯಾವುದೇ `Access-Control-Allow-Origin` ಹೆಡರ್ ಹೊರಸೂಸಲಾಗಿಲ್ಲ** . ಬ್ರೌಸರ್ ಅಡ್ಡ-ಮೂಲ ಓದುವಿಕೆಯನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತದೆ. ಇದು ಉದ್ದೇಶಿತ ವಿಫಲ-ಮುಚ್ಚಿದ ಡೀಫಾಲ್ಟ್ ಆಗಿದೆ.

| ಎನ್ವಿ ವರ್              | ಅರ್ಥ                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ಅನುಮತಿಸಲು ನಿಖರವಾದ ಮೂಲದ CSV (ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → ಯಾವುದೇ ಮೂಲವನ್ನು ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ (ವೈಲ್ಡ್ಕಾರ್ಡ್). ದೇವ್ ಮಾತ್ರ.                     |
| `CORS_ORIGIN`          | ಪರಂಪರೆ. `*` `CORS_ALLOW_ALL` ನಂತೆ ವರ್ತಿಸುತ್ತದೆ; ಅನುಮತಿ ಪಟ್ಟಿಗೆ ಒಂದೇ ಮೌಲ್ಯವನ್ನು ಸೇರಿಸಲಾಗುತ್ತದೆ. |

## ಬೆದರಿಕೆ ಮಾದರಿ — `CORS_ALLOW_ALL=true` ನಿಜವಾಗಿಯೂ ಏನನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ

ಜೆನೆರಿಕ್ OWASP ಎಚ್ಚರಿಕೆ ("ವೈಲ್ಡ್ಕಾರ್ಡ್ CORS = ಯಾವುದೇ ಸೈಟ್ ನಿಮ್ಮ API ಕರೆ ಮಾಡಬಹುದು") ಗಂಭೀರವಾಗಿ ತೆಗೆದುಕೊಳ್ಳುವುದು ಯೋಗ್ಯವಾಗಿದೆ, ಆದರೆ OmniRoute ಯ ಮಾನ್ಯತೆ**ಸಾಮಾನ್ಯ ಪ್ರಕರಣಕ್ಕಿಂತ ಕಿರಿದಾಗಿದೆ** , ಒಂದು ಕಾಂಕ್ರೀಟ್ ಅನುಷ್ಠಾನದ ಅಂಶದಿಂದಾಗಿ:

> **ಕೇಂದ್ರೀಯ `applyCorsHeaders()` ಎಂದಿಗೂ `Access-Control-Allow-Credentials` ಹೊರಸೂಸುವುದಿಲ್ಲ.** ಸರ್ವರ್ `Access-Control-Allow-Credentials: true` ಕಳುಹಿಸದ ಹೊರತು ಬ್ರೌಸರ್ _credentialed_ (ಕುಕೀ-ಬೇರಿಂಗ್) ಅಡ್ಡ-ಮೂಲ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಬಹಿರಂಗಪಡಿಸುವುದಿಲ್ಲ. OmniRoute ನ ಹಂಚಿಕೊಂಡ CORS ಮಾರ್ಗವು ಎಂದಿಗೂ ಮಾಡುವುದಿಲ್ಲ.

`CORS_ALLOW_ALL=true` ಯೊಂದಿಗೆ ಸಹ ಪ್ರತಿ ಮೇಲ್ಮೈಗೆ ಇದರ ಅರ್ಥವೇನು:

| ಮೇಲ್ಮೈ                                  | ದೃಢೀಕರಣ ಕಾರ್ಯವಿಧಾನ        | ವೈಲ್ಡ್ಕಾರ್ಡ್ CORS ಪರಿಣಾಮ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ಡ್ಯಾಶ್ಬೋರ್ಡ್ / MANAGEMENT `/api/*`      | ಕುಕಿ ಸೆಷನ್                | ಮೂಲವು ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ, ಆದರೆ**`Allow-Credentials` ಇಲ್ಲದೆ** ಬ್ರೌಸರ್**ಬ್ಲಾಕ್ಗಳನ್ನು** ರುಜುವಾತು ಓದಿದೆ. ದುರುದ್ದೇಶಪೂರಿತ ಅಡ್ಡ-ಮೂಲ ಸೈಟ್**ಓದಲು ಸಾಧ್ಯವಿಲ್ಲ** ನಿಮ್ಮ ದೃಢೀಕೃತ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಮತ್ತು ಸೆಶನ್ ಕುಕೀಯನ್ನು ಬಹಿರಂಗಪಡಿಸಲಾಗಿಲ್ಲ.                                                                                                                                                                                                                                                                                                    |
| ಕ್ಲೈಂಟ್ API `/v1/*`, `/v1beta/*`        | ಬೇರರ್ / `x-api-key` ಹೆಡರ್ | ಈಗಾಗಲೇ ಅನುಮತಿಸಲಾಗಿದೆ**ವಿನ್ಯಾಸದ ಮೂಲಕ** (`relaxForTokenAuth`): ಬ್ರೌಸರ್ಗಳು ಎಂದಿಗೂ ಸ್ವಯಂ-ಲಗತ್ತಿಸುವುದಿಲ್ಲ `Authorization`/`x-api-key`, ಆದ್ದರಿಂದ ಆಕ್ರಮಣಕಾರರ ಪುಟವು ನಿಮ್ಮ ಕೀಲಿಯನ್ನು ಪೂರೈಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಶಾಂತವಾದ ಪ್ರತಿಧ್ವನಿಯು ದೃಢೀಕರಿಸಿದ ವಿಷಯದ ಅಗತ್ಯವಿದೆ (ಮೌಲ್ಯಮಾಪಕ API ಕೀ ಅಥವಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್), ಕೇವಲ ರುಜುವಾತು ಹೆಡರ್ ಅಲ್ಲ, ಮತ್ತು ಎಂದಿಗೂ `Access-Control-Allow-Credentials` ಒಳಗೊಂಡಿರುವುದಿಲ್ಲ. ಅನಾಮಧೇಯ ಪ್ರತಿಕ್ರಿಯೆಗಳು (`REQUIRE_API_KEY=false`) ಸ್ಪಷ್ಟವಾದ `CORS_ALLOW_ALL=true` ಆಯ್ಕೆ ಸೇರಿದಂತೆ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ ಮೂಲ ಅನುಮತಿ ಪಟ್ಟಿಯನ್ನು ಬಳಸುತ್ತವೆ. |
| ಸಾರ್ವಜನಿಕ ಓದಲು-ಮಾತ್ರ (`/api/health`, …) | ಯಾವುದೂ ಇಲ್ಲ               | ಸೂಕ್ಷ್ಮವಲ್ಲದ; ವೈಲ್ಡ್ಕಾರ್ಡ್ ನಿರುಪದ್ರವವಾಗಿದೆ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

ಆದ್ದರಿಂದ ದಿ**ಶೇಷ** `CORS_ALLOW_ALL=true` ಯ ಮಾನ್ಯತೆ ಇದಕ್ಕೆ ಸೀಮಿತವಾಗಿದೆ: (a) ರುಜುವಾತು ಮಾಡದ ಅಡ್ಡ-ಮೂಲ **ಓದುತ್ತಾನೆ** ಈಗಾಗಲೇ ದೃಢೀಕರಿಸದ ಡೇಟಾ, ಮತ್ತು (b) CORS ಅವಕಾಶ ನೀಡುತ್ತದೆ**ಪ್ರಿಫ್ಲೈಟ್ ಪಾಸ್** ನಿರ್ವಹಣಾ ಮಾರ್ಗಗಳಲ್ಲಿ — ಇನ್ನೂ ದೃಢೀಕರಣದ ಅಗತ್ಯವಿರುವ ಕ್ರಾಸ್-ಆರಿಜಿನ್ ಪುಟವನ್ನು ಒದಗಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಇದು**ಅಲ್ಲ** ಹಂಚಿಕೆಯ CORS ಹಾದಿಯಲ್ಲಿ ಸೆಷನ್-ಹೈಜಾಕ್ ಅಥವಾ ರುಜುವಾತು-ಕಳ್ಳತನ ವೆಕ್ಟರ್.

### ಒಂದು ನಿಜವಾದ ವಿನಾಯಿತಿ — `/api/v1/agents/`

ಕ್ಲೌಡ್-ಏಜೆಂಟ್ ಮಾರ್ಗಗಳು (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ಅನ್ನು ಹೊಂದಿಸಲಾಗಿದೆ**ಸ್ವಂತ** CORS ಹೆಡರ್ಗಳು (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ಮತ್ತು**ಮಾಡು** `Access-Control-Allow-Credentials: true` ಜೊತೆಗೆ `Access-Control-Allow-Origin: <origin>|*` ಹೊರಸೂಸುತ್ತವೆ. ಮೂಲ-ಪ್ರತಿಧ್ವನಿ ಮತ್ತು ರುಜುವಾತುಗಳು ಸಹಬಾಳ್ವೆ ಇರುವ ಏಕೈಕ ಮೇಲ್ಮೈ ಇದು, ಮತ್ತು ಅದು**`CORS_ALLOW_ALL` ಯಿಂದ ಸ್ವತಂತ್ರ** . ಈ ಮಾರ್ಗಗಳು ನಿರ್ವಹಣೆ-ದೃಢೀಕರಣ (`requireManagementAuth`); ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಆಫ್-ಹೋಸ್ಟ್ ಅನ್ನು ಬಹಿರಂಗಪಡಿಸುವ ನಿರ್ವಾಹಕರು, ಪ್ರತಿಕ್ರಿಯೆ ಹೆಡರ್ಗಳಿಂದ ಕ್ರಾಸ್-ಆರಿಜಿನ್ ರುಜುವಾತುಗಳನ್ನು ಓದಲು ಅನುಮತಿಸುವ ಒಂದೇ ಸ್ಥಳವಾಗಿದೆ ಎಂದು ತಿಳಿದಿರಬೇಕು. ಇದನ್ನು ಸ್ಪಷ್ಟವಾದ ಅನುಮತಿಪಟ್ಟಿಗೆ ಬಿಗಿಗೊಳಿಸುವುದನ್ನು ಈ CORS ಮಾರ್ಗದರ್ಶನದಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ.

## ಉತ್ಪಾದನಾ ಪರಿಶೀಲನಾಪಟ್ಟಿ

- **ಉತ್ಪಾದನೆಯಲ್ಲಿ `CORS_ALLOW_ALL=true` ಎಂದಿಗೂ ಹೊಂದಿಸಬೇಡಿ.** ಹೊಂದಿಸದೆ ಬಿಡಿ.
- ಒಂದು ಹೊಂದಿಸಿ**ಸ್ಪಷ್ಟ** ಮೂಲ ಪಟ್ಟಿ — env var ಅಥವಾ ಸೆಕ್ಯುರಿಟಿ-ಟ್ಯಾಬ್ ಕ್ಷೇತ್ರ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ರಿವರ್ಸ್ ಪ್ರಾಕ್ಸಿ / ಟನಲ್ (nginx, Caddy, Cloudflare ಟನಲ್, Tailscale) ಹಿಂದೆ ಓಡಿದರೆ, CORS**ಅಲ್ಲ** ನಿಮ್ಮ ಏಕೈಕ ನಿಯಂತ್ರಣ — ಲೂಪ್ಬ್ಯಾಕ್ ರೂಟ್ ಗಾರ್ಡ್ ಇನ್ನೂ ಸ್ಪಾನ್-ಸಾಮರ್ಥ್ಯದ ಮಾರ್ಗಗಳನ್ನು ರಕ್ಷಿಸುತ್ತದೆ (ನೋಡಿ [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). 403 ಅನ್ನು "ಸರಿಪಡಿಸಲು" `X-Forwarded-For: 127.0.0.1` ನಕಲಿಸಬೇಡಿ; ಅದು RCE ವರ್ಗವನ್ನು ಮರು-ತೆರೆಯುತ್ತದೆ ಮಾರ್ಗ ಸಿಬ್ಬಂದಿ ಮುಚ್ಚುತ್ತದೆ.
- ರನ್ಟೈಮ್ ಸ್ಥಿತಿಯನ್ನು ದೃಢೀಕರಿಸಿ: ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೋರಿಸುತ್ತದೆ a **ನಿರಂತರ ಅಂಬರ್ ಬ್ಯಾನರ್** `CORS_ALLOW_ALL=true` ಲೈವ್ ಆಗಿರುವಾಗ ಡ್ಯಾಶ್ಬೋರ್ಡ್ → ಸೆಕ್ಯುರಿಟಿ → ದೃಢೀಕರಣ ದಾಸ್ತಾನು ಅಡಿಯಲ್ಲಿ, ಮತ್ತು `/api/settings/authz-inventory` ಒಂದು `cors: { allowAll, allowedOrigins }` ಎನ್ವಲಪ್ ಮಾನಿಟರಿಂಗ್ ಪರಿಕರಗಳನ್ನು ಪೋಲ್ ಮಾಡಬಹುದು.

## ಅಭಿವೃದ್ಧಿ ಅನುಕೂಲಕ್ಕಾಗಿ — ನಿರ್ದಿಷ್ಟ ಸ್ಥಳೀಯ ಮೂಲಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ

ದೇವ್ನಲ್ಲಿಯೂ ಸಹ ವೈಲ್ಡ್ಕಾರ್ಡ್ ನಿಮಗೆ ವಿರಳವಾಗಿ ಬೇಕಾಗುತ್ತದೆ. ನೀವು ಬಳಸುವ ದೇವ್ ಸರ್ವರ್ಗಳನ್ನು ಮಾತ್ರ ಅನುಮತಿಸಿ:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ಟ್ರೇಲಿಂಗ್ ಸ್ಲ್ಯಾಷ್ ಅನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದರೊಂದಿಗೆ ಮೂಲಗಳು ಕೇಸ್-ಸೆನ್ಸಿಟಿವ್ ಆಗಿ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತವೆ, ಆದ್ದರಿಂದ `http://localhost:3000` ಮತ್ತು `http://localhost:3000/` ಸಮಾನವಾಗಿರುತ್ತದೆ. ಅದೇ CSV ರನ್ಟೈಮ್ನಲ್ಲಿ ಹೊಂದಿಸಬಹುದು**ಡ್ಯಾಶ್ಬೋರ್ಡ್ → ಭದ್ರತೆ → CORS ಅನುಮತಿಸಲಾದ ಮೂಲಗಳು** ಮರುಪ್ರಾರಂಭವಿಲ್ಲದೆ.

## API ಕೀಗಳು vs ಕುಕೀ ಅವಧಿಗಳು

- **ಬೇರರ್ / `x-api-key` ( `/v1/*` ನಿರ್ಣಯ ಮೇಲ್ಮೈ):** ಬ್ರೌಸರ್ಗಳು ಎಂದಿಗೂ ಇವುಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲಗತ್ತಿಸುವುದಿಲ್ಲ. CORS ಇಲ್ಲಿ ಅರ್ಥಪೂರ್ಣ ತಡೆಗೋಡೆಯಾಗಿಲ್ಲ — API ಕೀ ತಡೆಗೋಡೆ — ಆಗಿದ್ದು ಆ ಮೇಲ್ಮೈ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಅನುಮತಿಯಾಗಿದೆ ಆದ್ದರಿಂದ ಬ್ರೌಸರ್ ಮತ್ತು Electron ಕ್ಲೈಂಟ್ಗಳು ಅವರು ಈಗಾಗಲೇ ಅರ್ಹರಾಗಿರುವ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಓದಬಹುದು. ಶಾಂತವಾದ ಪ್ರತಿಧ್ವನಿಯು ದೃಢೀಕರಿಸಿದ ವಿಷಯದ ಅಗತ್ಯವಿದೆ (ಮೌಲ್ಯಮಾಪಕ API ಕೀ ಅಥವಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್), ಕೇವಲ ರುಜುವಾತು ಹೆಡರ್ ಅಲ್ಲ, ಮತ್ತು ಎಂದಿಗೂ `Access-Control-Allow-Credentials` ಒಳಗೊಂಡಿರುವುದಿಲ್ಲ. ಅನಾಮಧೇಯ ಪ್ರತಿಕ್ರಿಯೆಗಳು (`REQUIRE_API_KEY=false`) ಸ್ಪಷ್ಟವಾದ `CORS_ALLOW_ALL=true` ಆಯ್ಕೆಯನ್ನು ಒಳಗೊಂಡಂತೆ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ ಮೂಲ ಅನುಮತಿ ಪಟ್ಟಿಯನ್ನು ಬಳಸುತ್ತವೆ. ದೃಢೀಕರಣ ನಿರಾಕರಣೆಗಳು (401) ಓದಬಲ್ಲವು ಆದ್ದರಿಂದ ಕ್ಲೈಂಟ್ಗಳು ಹಿಂತೆಗೆದುಕೊಳ್ಳಲಾದ ಅಥವಾ ತಪ್ಪಾಗಿ ಟೈಪ್ ಮಾಡಿದ ಕೀ (#5242) ಅನ್ನು ಹೊರತೆಗೆಯಬಹುದು: ಪೈಪ್ಲೈನ್ನ ಸ್ವಂತ 401 ಪ್ರತಿಧ್ವನಿಯನ್ನು ಇರಿಸುತ್ತದೆ ಮತ್ತು ಪೈಪ್ಲೈನ್ ಅನಾಮಧೇಯವಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಿದ ನಂತರ ಕೀಲಿಯನ್ನು ನಿರಾಕರಿಸುವ ಮಾರ್ಗವು (`/v1/models` ಮತ್ತು `/v1beta/models` ಜೊತೆಗೆ ನಿರ್ವಹಣೆ ದೃಢೀಕರಣ, `/v1/files`, `/v1/batches` ಮತ್ತು `/v1/media` ವ್ಯಾಪ್ತಿ, ಸ್ವಯಂ ಕಾಂಬೊ ಅಭ್ಯರ್ಥಿ ಮಾರ್ಗಗಳು) `/v1/session-leases` ಮೂಲಕ ಆ 401 ಗೆ `credentialRejectionHeaders()` ಸೇರಿಸುತ್ತದೆ. ಪ್ರತಿಧ್ವನಿಯು ರುಜುವಾತು ಹೆಡರ್ (`Authorization`, `x-api-key`, `x-goog-api-key` ಅಥವಾ `auth_token` ಕುಕೀ) ಹೊಂದಿರುವ ವಿನಂತಿಯ ಮೇಲೆ ಕೀಲಿಯಾಗಿದೆ, ಅವುಗಳಲ್ಲಿ ಯಾವುದನ್ನು ಮಾರ್ಗವನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿಲ್ಲ ಮತ್ತು `Access-Control-Allow-Credentials` ನೊಂದಿಗೆ ಎಂದಿಗೂ ಜೋಡಿಯಾಗಿಲ್ಲ; ದೇಹವು ಸ್ಥಿರ ದೋಷದ ಹೊದಿಕೆಯಾಗಿದೆ. `/api/v1/` ಅಡಿಯಲ್ಲಿ ನಿರ್ವಹಣಾ ಮಾರ್ಗಗಳು `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ಮೂಲಕ ಈ ರುಜುವಾತು-ನಿರಾಕರಣೆ ವಿನಾಯಿತಿಯನ್ನು ಬಳಸುವುದಿಲ್ಲ: `REQUIRE_API_KEY=false` ನೊಂದಿಗೆ, ಅವರ 401/403 ಪ್ರತಿಕ್ರಿಯೆಗಳು ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ CORS ಮೂಲ ನೀತಿಯನ್ನು ಅನುಸರಿಸುತ್ತವೆ.
- **ಕುಕೀ ಸೆಷನ್ (ಡ್ಯಾಶ್ಬೋರ್ಡ್):** ವಿಫಲ-ಮುಚ್ಚಿದ ಡೀಫಾಲ್ಟ್ನಿಂದ ರಕ್ಷಿಸಲಾಗಿದೆ**ಮತ್ತು** ಹಂಚಿದ ಹಾದಿಯಲ್ಲಿ `Access-Control-Allow-Credentials` ಅನುಪಸ್ಥಿತಿಯಲ್ಲಿ. management/dashboard ಮೂಲಗಳನ್ನು ಯಾವುದೇ ಅನುಮತಿ ಸಂರಚನೆಯಿಂದ ಹೊರಗಿಡಿ; ಅವರು ನಿಖರವಾಗಿ ವಿಫಲ-ಮುಚ್ಚಿದ ಉಳಿಯಬೇಕು.

## WebSocket ಹ್ಯಾಂಡ್ಶೇಕ್ಗಳು (`/v1/responses`, `/v1/ws`)

WebSocket ಗೆ ಬ್ರೌಸರ್ಗಳು CORS ಅನ್ವಯಿಸುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ WebSocket ರವಾನೆಗಳು ಅನುಮಿತಿ ಔಟ್ಪುಟ್ ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ `Origin` ಹ್ಯಾಂಡ್ಶೇಕ್ ಅನ್ನು ಸ್ವತಃ ಪರಿಶೀಲಿಸುತ್ತದೆ (`src/server/origin/wsOrigin.ts`): ಪ್ರತಿಕ್ರಿಯೆಗಳು WebSocket (`/v1/responses`) ಮತ್ತು, OmniRoute `npm start` / `npm run dev`, `/v1/ws` ಮತ್ತು `/api/v1/ws` ಸೇತುವೆಯ ಮೂಲಕ ಚಲಿಸಿದಾಗ, `/v1/chat/completions`, `/v1/messages` ಮತ್ತು `/v1/responses` ಎಂದು ಸ್ಟ್ರೀಮ್ ಮಾಡುತ್ತದೆ. ಸೇತುವೆಯು ತೀರ್ಪಿಗಾಗಿ `/api/v1/ws?handshake=1` ಕೇಳುತ್ತದೆ ಮತ್ತು ಆ ಮಾರ್ಗವು ಪರಿಶೀಲನೆಯನ್ನು ನಡೆಸದ ಹೊರತು ನವೀಕರಿಸಲು ನಿರಾಕರಿಸುತ್ತದೆ. ದೃಢೀಕರಣದ ಅವಶ್ಯಕತೆಗಳು ಇನ್ನೂ ಪ್ರತ್ಯೇಕವಾಗಿ ಅನ್ವಯಿಸುತ್ತವೆ. ಮೂಲ ಪರಿಶೀಲನೆಯು ಯಾವಾಗ ಹಾದುಹೋಗುತ್ತದೆ:

- ಇದು ಯಾವುದೇ `Origin` ಹೆಡರ್ ಹೊಂದಿಲ್ಲ (Codex CLI, SDKs ಮತ್ತು ಇತರ ಬ್ರೌಸರ್ ಅಲ್ಲದ ಗ್ರಾಹಕರು);
- ಮೇಲಿನ ಅನುಮತಿ ಪಟ್ಟಿಯಿಂದ `Origin` ಅನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಲಾಗಿದೆ (`CORS_ALLOWED_ORIGINS`, `corsOrigins` ಸೆಟ್ಟಿಂಗ್, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute ಯ ಸ್ವಂತ ಸಾರ್ವಜನಿಕ ಮೂಲಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ (ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ ಸಾರ್ವಜನಿಕ ಮೂಲ URL, ವಿಶ್ವಾಸಾರ್ಹ ಪ್ರಾಕ್ಸಿಯ ಫಾರ್ವರ್ಡ್ ಮಾಡಲಾದ ಮೂಲ, ಅಥವಾ IP ಅಕ್ಷರಶಃ ಅಥವಾ `localhost` — ನಂತೆ ನೀಡಲಾದ ನೇರ loopback/LAN ಹೋಸ್ಟ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ರೂಪಾಂತರ ಪರಿಶೀಲನೆಯು ಬಳಸುವ ಅದೇ ಅಭ್ಯರ್ಥಿಗಳು); ಅಥವಾ
- ಇದು HTTP `/v1/*` ಮೇಲ್ಮೈಯಲ್ಲಿರುವಂತೆ ಮಾನ್ಯವಾದ API ಕೀಲಿಯನ್ನು ಹೊಂದಿರುತ್ತದೆ.

ಬೇರೆ ಯಾವುದಾದರೂ `403 ws_origin_forbidden` ಪಡೆಯುತ್ತದೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಶನ್ ಕುಕೀಯು ವಿದೇಶಿ `Origin` ವಿನಾಯಿತಿ ನೀಡುವುದಿಲ್ಲ ಏಕೆಂದರೆ ಬ್ರೌಸರ್ ಅದನ್ನು ಯಾವುದೇ ಪುಟದ ಸಾಕೆಟ್ಗೆ ಲಗತ್ತಿಸುತ್ತದೆ. ಮತ್ತೊಂದು ಪೋರ್ಟ್ನಲ್ಲಿ `localhost` ಒಂದೇ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಲಾಗುವುದಿಲ್ಲ; ಅಂತಹ ದೇವ್ ಮೂಲಗಳನ್ನು `CORS_ALLOWED_ORIGINS` ಗೆ ಸೇರಿಸಿ.

## ಉದಾಹರಣೆ: OmniRoute ಮುಂದೆ ರಿವರ್ಸ್ ಪ್ರಾಕ್ಸಿ

CORS ಅನ್ನು OmniRoute ಸ್ವತಃ ಜಾರಿಗೊಳಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಪ್ರಾಕ್ಸಿ ಸಾಮಾನ್ಯವಾಗಿ ಮಾಡಬೇಕು**ಅಲ್ಲ** `Access-Control-*` ಹೆಡರ್ಗಳನ್ನು ಸೇರಿಸಿ ಅಥವಾ ಪುನಃ ಬರೆಯಿರಿ (ಡಬಲ್ ಹೆಡರ್ ಬ್ರೇಕ್ ಬ್ರೌಸರ್ಗಳು). TLS ಕೊನೆಗೊಳಿಸಿ ಮತ್ತು — ಅನ್ನು ಫಾರ್ವರ್ಡ್ ಮಾಡಲು OmniRoute ಪೂರ್ವ ಫ್ಲೈಟ್ಗೆ ಉತ್ತರಿಸಲು ಅವಕಾಶ ಮಾಡಿಕೊಡಿ:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

ಅನುಮತಿಸಲಾದ ಬ್ರೌಸರ್ ಮೂಲಗಳನ್ನು OmniRoute (`CORS_ALLOWED_ORIGINS` ಅಥವಾ ಭದ್ರತಾ ಟ್ಯಾಬ್) ನಲ್ಲಿ ಹೊಂದಿಸಿ, ಪ್ರಾಕ್ಸಿಯಲ್ಲಿ ಅಲ್ಲ.

## ಮೂಲ ಕಡತಗಳು

| ಕಾಳಜಿ                                         | ಫೈಲ್                                                                 |
| --------------------------------------------- | -------------------------------------------------------------------- |
| + `getCorsStatus()` ರೆಸಲ್ಯೂಶನ್ ಅನ್ನು ಅನುಮತಿಸಿ | `src/server/cors/origins.ts`                                         |
| ಮಿಡಲ್ವೇರ್ ಅಪ್ಲಿಕೇಶನ್ (ಸತ್ಯದ ಏಕ ಮೂಲ)           | `src/server/authz/pipeline.ts`                                       |
| ಸೆಟ್ಟಿಂಗ್ಗಳು → ರನ್ಟೈಮ್ ಮೂಲ ಇಂಜೆಕ್ಷನ್          | `src/lib/config/runtimeSettings.ts`                                  |
| ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಾಗಿ ರನ್ಟೈಮ್ ಸ್ಥಿತಿ               | `src/app/api/settings/authz-inventory/route.ts`                      |
| ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಎಚ್ಚರಿಕೆ ಬ್ಯಾನರ್                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS ಅನುಮತಿಸಲಾದ ಮೂಲಗಳ ಕ್ಷೇತ್ರ                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ಕ್ಲೌಡ್-ಏಜೆಂಟ್ ಪ್ರತಿ-ಮಾರ್ಗ CORS (ವಿನಾಯಿತಿ)     | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ಹ್ಯಾಂಡ್ಶೇಕ್ `Origin` ಚೆಕ್           | `src/server/origin/wsOrigin.ts`                                      |

## ಇದನ್ನೂ ನೋಡಿ

- ಸ್ಪಾನ್-ಸಾಮರ್ಥ್ಯವಿರುವ ಮಾರ್ಗಗಳಿಗಾಗಿ [ರೂಟ್ ಗಾರ್ಡ್ ಶ್ರೇಣಿಗಳ](./ROUTE_GUARD_TIERS.md) — ಲೂಪ್ಬ್ಯಾಕ್ ಜಾರಿ (ಪ್ರತ್ಯೇಕ, ಪೂರಕ ನಿಯಂತ್ರಣ).
- [ದೃಢೀಕರಣ ಮಾರ್ಗದರ್ಶಿ](../architecture/AUTHZ_GUIDE.md) — ಪೂರ್ಣ ದೃಢೀಕರಣ ಪೈಪ್ಲೈನ್.
