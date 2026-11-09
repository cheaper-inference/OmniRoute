# CORS Configuration & Security (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ਜਿਸਨੂੰ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ**ਬ੍ਰਾਊਜ਼ਰ ਮੂਲ** ਇੱਕ ਸਿੰਗਲ, ਕੇਂਦਰੀ ਅਨੁਮਤੀ ਸੂਚੀ ਤੋਂ ਅੰਤਰ-ਮੂਲ ਜਵਾਬ ਪੜ੍ਹ ਸਕਦਾ ਹੈ। ਮਾਡਲ ਹੈ**ਮੂਲ ਰੂਪ ਵਿੱਚ ਅਸਫਲ-ਬੰਦ** : ਜਦੋਂ ਤੱਕ ਤੁਸੀਂ ਇੱਕ ਦੀ ਚੋਣ ਨਹੀਂ ਕਰਦੇ, ਉਦੋਂ ਤੱਕ ਕਿਸੇ ਮੂਲ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ। ਇਹ ਪੰਨਾ ਦਸਤਾਵੇਜ਼ੀ ਤੌਰ 'ਤੇ ਮਨਜ਼ੂਰੀ ਸੂਚੀ ਨੂੰ ਕਿਵੇਂ ਹੱਲ ਕਰਦਾ ਹੈ, `CORS_ALLOW_ALL=true` ਅਸਲ ਵਿੱਚ ਕੀ ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ (ਅਤੇ, ਮਹੱਤਵਪੂਰਨ ਤੌਰ 'ਤੇ, ਇਹ ਕੀ ਕਰਦਾ ਹੈ)**ਨਹੀਂ** , dev ਬਨਾਮ ਉਤਪਾਦਨ ਨੂੰ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਕਿਵੇਂ ਕੌਂਫਿਗਰ ਕਰਨਾ ਹੈ, ਅਤੇ ਡੈਸ਼ਬੋਰਡ ਦੀ ਰਨਟਾਈਮ ਚੇਤਾਵਨੀ ਦਿਖਾਉਂਦਾ ਹੈ ਜਦੋਂ ਇੱਕ ਵਾਈਲਡਕਾਰਡ ਲਾਈਵ ਹੁੰਦਾ ਹੈ।

**ਸੱਚ ਦਾ ਸਰੋਤ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`)। ਅਨੁਮਤੀ ਸੂਚੀ ਨੂੰ ਇੱਕ ਵਾਰ ਲਾਗੂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਮਿਡਲਵੇਅਰ (`src/server/authz/pipeline.ts`) ਵਿੱਚ — ਪ੍ਰਤੀ-ਰੂਟ ਹੈਂਡਲਰ ਆਪਣੇ ਆਪ `Access-Control-Allow-Origin` ਸੈੱਟ ਨਹੀਂ ਕਰਦੇ ਹਨ।

## ਇੱਕ ਮੂਲ ਕਿਵੇਂ ਹੱਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ

ਹਰੇਕ ਬੇਨਤੀ ਲਈ ਮਿਡਲਵੇਅਰ ਇਸ ਕ੍ਰਮ ਵਿੱਚ `Access-Control-Allow-Origin` ਮੁੱਲ ਦੀ ਗਣਨਾ ਕਰਦਾ ਹੈ:

1. **`CORS_ALLOW_ALL=true`** (ਜਾਂ ਪੁਰਾਤਨ `CORS_ORIGIN=*`) → `Vary: Origin` ਦੇ ਨਾਲ ਕਾਲਰ ਦੇ `Origin` ਵਾਪਸ (ਜਾਂ `*` ਜਦੋਂ ਕੋਈ `Origin` ਸਿਰਲੇਖ ਨਹੀਂ ਹੁੰਦਾ) ਨੂੰ ਈਕੋ ਕਰਦਾ ਹੈ ਤਾਂ ਕਿ ਕੈਚ ਸਹੀ ਰਹੇ। ਉਹੀ `applyCorsHeaders()` ਚੋਕਪੁਆਇੰਟ ਵੀ `Vary: Accept-Encoding` ਟੋਕਨ-ਪ੍ਰਮਾਣਿਤ `/v1*`/`/v1beta*` ਸਤਹ (`relaxForTokenAuth`, RFC 9110 §12.5.5, ਮੁੱਦਾ #6737) 'ਤੇ ਹਰੇਕ 2xx-ਵਿਦ-ਬਾਡੀ ਜਵਾਬ ਨਾਲ ਜੋੜਦਾ ਹੈ, ਇਸਲਈ downstream/shared ਕੈਚ ਸੰਕੁਚਿਤ ਬਨਾਮ ਅਣਕੰਪਰੈੱਸਡ ਵੇਰੀਐਂਟ ਨੂੰ ਸਹੀ ਢੰਗ ਨਾਲ ਵੱਖ ਕਰ ਸਕਦੇ ਹਨ।
2. ਨਹੀਂ ਤਾਂ, ਬੇਨਤੀ `Origin` ਸਧਾਰਣ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ (ਲੋਅਰ-ਕੇਸਡ, ਟ੍ਰੇਲਿੰਗ ਸਲੈਸ਼ ਸਟ੍ਰਿਪਡ) ਅਤੇ ਇਸਦੇ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ**ਵਿਲੀਨ ਅਨੁਮਤੀ ਸੂਚੀ** :
   - env **`CORS_ALLOWED_ORIGINS`** — ਕੌਮੇ ਨਾਲ ਵੱਖ ਕੀਤੀ ਸੂਚੀ, ਅਤੇ
   - ਰਨਟਾਈਮ **`corsOrigins`** ਸੈਟਿੰਗ (ਡੈਸ਼ਬੋਰਡ → ਸੁਰੱਖਿਆ → _CORS ਆਗਿਆਸ਼ੁਦਾ ਮੂਲ_), `src/lib/config/runtimeSettings.ts` ਤੋਂ `setRuntimeAllowedOrigins()` ਰਾਹੀਂ ਇੰਜੈਕਟ ਕੀਤਾ ਗਿਆ।
3. → ਕੋਈ ਮੇਲ ਨਹੀਂ**ਕੋਈ `Access-Control-Allow-Origin` ਸਿਰਲੇਖ ਨਹੀਂ ਕੱਢਿਆ ਗਿਆ ਹੈ** . ਬ੍ਰਾਊਜ਼ਰ ਕਰਾਸ-ਓਰਿਜਨ ਰੀਡ ਨੂੰ ਬਲੌਕ ਕਰਦਾ ਹੈ। ਇਹ ਇਰਾਦਾ ਫੇਲ-ਬੰਦ ਡਿਫਾਲਟ ਹੈ।

| Env var                | ਭਾਵ                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | ਇਜਾਜ਼ਤ ਦੇਣ ਲਈ ਸਹੀ ਮੂਲ ਦਾCSV (ਸਿਫਾਰਿਸ਼ ਕੀਤਾ ਗਿਆ)।                                                 |
| `CORS_ALLOW_ALL`       | `true`/`1` → ਕੋਈ ਵੀ ਮੂਲ (ਵਾਈਲਡਕਾਰਡ) ਈਕੋ। ਦੇਵ ਹੀ।                                                 |
| `CORS_ORIGIN`          | ਵਿਰਾਸਤ. `*` `CORS_ALLOW_ALL` ਵਾਂਗ ਵਿਹਾਰ ਕਰਦਾ ਹੈ; ਅਨੁਮਤੀ ਸੂਚੀ ਵਿੱਚ ਇੱਕ ਸਿੰਗਲ ਮੁੱਲ ਜੋੜਿਆ ਜਾਂਦਾ ਹੈ। |

## ਧਮਕੀ ਮਾਡਲ — ਜੋ `CORS_ALLOW_ALL=true` ਅਸਲ ਵਿੱਚ ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ

ਆਮ OWASP ਚੇਤਾਵਨੀ ("ਵਾਈਲਡਕਾਰਡ CORS = ਕੋਈ ਵੀ ਸਾਈਟ ਤੁਹਾਡੇ API ਕਾਲ ਕਰ ਸਕਦੀ ਹੈ") ਨੂੰ ਗੰਭੀਰਤਾ ਨਾਲ ਲੈਣ ਯੋਗ ਹੈ, ਪਰ OmniRoute ਦਾ ਐਕਸਪੋਜਰ **ਆਮ ਕੇਸ ਨਾਲੋਂ ਛੋਟਾ** , ਇੱਕ ਠੋਸ ਲਾਗੂ ਕਰਨ ਦੇ ਤੱਥ ਦੇ ਕਾਰਨ:

> **ਕੇਂਦਰੀ `applyCorsHeaders()` ਕਦੇ ਵੀ `Access-Control-Allow-Credentials` ਨਹੀਂ ਛੱਡਦਾ ਹੈ।** ਇੱਕ ਬ੍ਰਾਊਜ਼ਰ ਇੱਕ _credentialed_ (ਕੂਕੀ-ਬੇਅਰਿੰਗ) ਕ੍ਰਾਸ-ਓਰੀਜਨ ਜਵਾਬ ਨੂੰ ਉਜਾਗਰ ਨਹੀਂ ਕਰੇਗਾ ਜਦੋਂ ਤੱਕ ਸਰਵਰ `Access-Control-Allow-Credentials: true` ਨਹੀਂ ਭੇਜਦਾ। OmniRoute ਦਾ ਸਾਂਝਾ CORS ਮਾਰਗ ਕਦੇ ਨਹੀਂ ਕਰਦਾ।

`CORS_ALLOW_ALL=true` ਦੇ ਨਾਲ ਵੀ, ਪ੍ਰਤੀ ਸਤਹ ਦਾ ਕੀ ਮਤਲਬ ਹੈ:

| ਸਤ੍ਹਾ                             | ਪ੍ਰਮਾਣਿਕਤਾ ਵਿਧੀ          | ਵਾਈਲਡਕਾਰਡ CORS ਦਾ ਪ੍ਰਭਾਵ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ਡੈਸ਼ਬੋਰਡ / MANAGEMENT `/api/*`    | ਕੂਕੀ ਸੈਸ਼ਨ               | ਮੂਲ ਗੂੰਜਦਾ ਹੈ, ਪਰ **`Allow-Credentials` ਤੋਂ ਬਿਨਾਂ** ਬਰਾਊਜ਼ਰ **ਬਲਾਕ** ਪ੍ਰਮਾਣਿਤ ਪੜ੍ਹਿਆ ਗਿਆ। ਇੱਕ ਖਤਰਨਾਕ ਕਰਾਸ-ਓਰੀਜਨ ਸਾਈਟ **ਪੜ੍ਹ ਨਹੀਂ ਸਕਦੇ** ਤੁਹਾਡੇ ਪ੍ਰਮਾਣਿਤ ਡੈਸ਼ਬੋਰਡ ਜਵਾਬ, ਅਤੇ ਸੈਸ਼ਨ ਕੂਕੀ ਸਾਹਮਣੇ ਨਹੀਂ ਆਈ ਹੈ।                                                                                                                                                                                                                                                                                                                    |
| ਕਲਾਇੰਟ API `/v1/*`, `/v1beta/*`   | ਬੇਅਰਰ / `x-api-key` ਹੈਡਰ | ਪਹਿਲਾਂ ਹੀ ਇਜਾਜ਼ਤ ਹੈ**ਡਿਜ਼ਾਈਨ ਦੁਆਰਾ** (`relaxForTokenAuth`): ਬ੍ਰਾਊਜ਼ਰ ਕਦੇ ਵੀ `Authorization`/`x-api-key` ਨੂੰ ਸਵੈ-ਨੱਥੀ ਨਹੀਂ ਕਰਦੇ, ਇਸਲਈ ਹਮਲਾਵਰ ਦਾ ਪੰਨਾ ਤੁਹਾਡੀ ਕੁੰਜੀ ਦੀ ਸਪਲਾਈ ਨਹੀਂ ਕਰ ਸਕਦਾ ਹੈ। ਆਰਾਮਦਾਇਕ ਈਕੋ ਲਈ ਇੱਕ ਪ੍ਰਮਾਣਿਤ ਵਿਸ਼ੇ (ਇੱਕ ਪ੍ਰਮਾਣਿਤ API ਕੁੰਜੀ ਜਾਂ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ) ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਨਾ ਕਿ ਸਿਰਫ਼ ਇੱਕ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਹੈਡਰ, ਅਤੇ ਕਦੇ ਵੀ `Access-Control-Allow-Credentials` ਸ਼ਾਮਲ ਨਹੀਂ ਹੁੰਦਾ। ਅਗਿਆਤ ਜਵਾਬ (`REQUIRE_API_KEY=false`) ਇੱਕ ਸਪਸ਼ਟ `CORS_ALLOW_ALL=true` ਔਪਟ-ਇਨ ਸਮੇਤ ਕੌਂਫਿਗਰ ਕੀਤੀ ਮੂਲ ਆਗਿਆ ਸੂਚੀ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ। |
| ਪਬਲਿਕ ਰੀਡ-ਓਨਲੀ (`/api/health`, …) | ਕੋਈ ਨਹੀਂ                 | ਗੈਰ-ਸੰਵੇਦਨਸ਼ੀਲ; ਵਾਈਲਡਕਾਰਡ ਨੁਕਸਾਨ ਰਹਿਤ ਹੈ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

ਇਸ ਲਈ ਦ **ਬਕਾਇਆ** `CORS_ALLOW_ALL=true` ਦਾ ਐਕਸਪੋਜਰ ਇਸ ਤੱਕ ਸੀਮਿਤ ਹੈ: (a) ਗੈਰ-ਪ੍ਰਮਾਣਿਤ ਕਰਾਸ-ਓਰੀਜਨ **ਪੜ੍ਹਦਾ ਹੈ** ਪਹਿਲਾਂ ਤੋਂ-ਅਪ੍ਰਮਾਣਿਤ ਡੇਟਾ ਦਾ, ਅਤੇ (ਬੀ) CORS ਨੂੰ ਦੇਣਾ**ਪ੍ਰੀਫਲਾਈਟ ਪਾਸ** ਪ੍ਰਬੰਧਨ ਰੂਟਾਂ 'ਤੇ — ਜਿਸ ਲਈ ਅਜੇ ਵੀ ਪ੍ਰਮਾਣਿਕਤਾ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ ਜੋ ਇੱਕ ਕਰਾਸ-ਓਰੀਜਨ ਪੰਨਾ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕਰ ਸਕਦਾ ਹੈ। ਇਹ ਹੈ**ਨਹੀਂ** ਸ਼ੇਅਰਡ CORS ਮਾਰਗ 'ਤੇ ਸੈਸ਼ਨ-ਹਾਈਜੈਕ ਜਾਂ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ-ਚੋਰੀ ਵੈਕਟਰ।

### ਇੱਕ ਅਸਲੀ ਅਪਵਾਦ — `/api/v1/agents/`

ਕਲਾਉਡ-ਏਜੰਟ ਰੂਟ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ਨੇ ਉਹਨਾਂ ਦੇ ਸੈਟ ਕੀਤੇ**ਆਪਣੇ** CORS ਸਿਰਲੇਖ (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ਅਤੇ**ਕਰਦੇ ਹਨ** `Access-Control-Allow-Credentials: true` ਦੇ ਨਾਲ ਮਿਲ ਕੇ `Access-Control-Allow-Origin: <origin>|*` ਕੱਢੋ। ਇਹ ਇਕੋ ਸਤਹ ਹੈ ਜਿੱਥੇ ਮੂਲ-ਈਕੋ ਅਤੇ ਪ੍ਰਮਾਣ-ਪੱਤਰ ਇਕੱਠੇ ਹੁੰਦੇ ਹਨ, ਅਤੇ ਇਹ ਹੈ**`CORS_ALLOW_ALL` ਤੋਂ ਸੁਤੰਤਰ** . ਇਹ ਰੂਟ ਪ੍ਰਬੰਧਨ-ਪ੍ਰਮਾਣਿਤ (`requireManagementAuth`) ਹਨ; ਓਪਰੇਟਰ ਜੋ ਡੈਸ਼ਬੋਰਡ ਆਫ-ਹੋਸਟ ਦਾ ਪਰਦਾਫਾਸ਼ ਕਰਦੇ ਹਨ ਉਹਨਾਂ ਨੂੰ ਇਸ ਗੱਲ ਤੋਂ ਜਾਣੂ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ ਕਿ ਜਵਾਬ ਸਿਰਲੇਖਾਂ ਦੁਆਰਾ ਕ੍ਰਾਸ-ਓਰੀਜਨ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਰੀਡ ਦੀ ਇਹ ਇੱਕ ਥਾਂ ਹੈ। ਇਸ ਨੂੰ ਇੱਕ ਸਪਸ਼ਟ ਅਨੁਮਤੀ ਸੂਚੀ ਵਿੱਚ ਕੱਸਣਾ ਇਸ CORS ਮਾਰਗਦਰਸ਼ਨ ਤੋਂ ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਟ੍ਰੈਕ ਕੀਤਾ ਗਿਆ ਹੈ।

## ਉਤਪਾਦਨ ਚੈੱਕਲਿਸਟ

- **ਉਤਪਾਦਨ ਵਿੱਚ ਕਦੇ ਵੀ `CORS_ALLOW_ALL=true` ਸੈਟ ਨਾ ਕਰੋ।** ਇਸਨੂੰ ਬਿਨਾਂ ਸੈੱਟ ਕੀਤੇ ਛੱਡੋ।
- ਇੱਕ ਸੈੱਟ ਕਰੋ**ਸਪਸ਼ਟ** ਮੂਲ ਸੂਚੀ — ਜਾਂ ਤਾਂ env var ਜਾਂ ਸੁਰੱਖਿਆ-ਟੈਬ ਖੇਤਰ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- ਜੇਕਰ OmniRoute ਇੱਕ ਰਿਵਰਸ ਪ੍ਰੌਕਸੀ / ਸੁਰੰਗ (nginx, Caddy, Cloudflare ਟਨਲ, Tailscale) ਦੇ ਪਿੱਛੇ ਚਲਦਾ ਹੈ, ਤਾਂ CORS ਹੈ**ਨਹੀਂ** ਤੁਹਾਡਾ ਸਿਰਫ਼ ਕੰਟਰੋਲ — ਲੂਪਬੈਕ ਰੂਟ ਗਾਰਡ ਅਜੇ ਵੀ ਸਪੌਨ-ਸਮਰੱਥ ਰੂਟਾਂ ਦੀ ਰੱਖਿਆ ਕਰਦਾ ਹੈ (ਵੇਖੋ [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) )। ਇੱਕ 403 ਨੂੰ "ਫਿਕਸ" ਕਰਨ ਲਈ `X-Forwarded-For: 127.0.0.1` ਜਾਅਲੀ ਨਾ ਬਣਾਓ; ਜੋ ਰੂਟ ਗਾਰਡ ਬੰਦ ਹੋਣ ਵਾਲੇ RCE ਕਲਾਸ ਨੂੰ ਦੁਬਾਰਾ ਖੋਲ੍ਹਦਾ ਹੈ।
- ਰਨਟਾਈਮ ਸਥਿਤੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ: ਡੈਸ਼ਬੋਰਡ ਦਿਖਾਉਂਦਾ ਹੈ a **ਸਥਾਈ ਅੰਬਰ ਬੈਨਰ** ਜਦੋਂ ਵੀ `CORS_ALLOW_ALL=true` ਲਾਈਵ ਹੁੰਦਾ ਹੈ, ਡੈਸ਼ਬੋਰਡ → ਸੁਰੱਖਿਆ → ਅਧਿਕਾਰ ਸੂਚੀ ਦੇ ਅਧੀਨ, ਅਤੇ `/api/settings/authz-inventory` ਇੱਕ `cors: { allowAll, allowedOrigins }` ਲਿਫਾਫੇ ਨਿਗਰਾਨੀ ਟੂਲ ਪੋਲ ਕਰ ਸਕਦਾ ਹੈ ਵਾਪਸ ਕਰਦਾ ਹੈ।

## ਵਿਕਾਸ ਸਹੂਲਤ — ਖਾਸ ਸਥਾਨਕ ਮੂਲ ਦੀ ਆਗਿਆ ਦਿੰਦੀ ਹੈ

ਤੁਹਾਨੂੰ dev ਵਿੱਚ ਵੀ ਵਾਈਲਡਕਾਰਡ ਦੀ ਘੱਟ ਹੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। ਸਿਰਫ਼ ਉਹਨਾਂ dev ਸਰਵਰਾਂ ਨੂੰ ਇਜਾਜ਼ਤ ਦਿਓ ਜੋ ਤੁਸੀਂ ਵਰਤਦੇ ਹੋ:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ਸ਼ੁਰੂਆਤੀ ਸਲੈਸ਼ ਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕੀਤੇ ਜਾਣ ਨਾਲ ਕੇਸ-ਸੰਵੇਦਨਸ਼ੀਲਤਾ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ, ਇਸਲਈ `http://localhost:3000` ਅਤੇ `http://localhost:3000/` ਬਰਾਬਰ ਹਨ। ਉਸੇ CSV ਰਨਟਾਈਮ ਵਿੱਚ ਸੈੱਟ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ**ਡੈਸ਼ਬੋਰਡ → ਸੁਰੱਖਿਆ → CORS ਮਨਜ਼ੂਰ ਮੂਲ** ਮੁੜ ਚਾਲੂ ਕੀਤੇ ਬਿਨਾਂ.

## API ਕੁੰਜੀਆਂ ਬਨਾਮ ਕੂਕੀ ਸੈਸ਼ਨ

- **ਬੇਅਰਰ / `x-api-key` ( `/v1/*` ਅਨੁਮਾਨ ਸਤਹ):** ਬ੍ਰਾਊਜ਼ਰ ਇਹਨਾਂ ਨੂੰ ਕਦੇ ਵੀ ਆਪਣੇ ਆਪ ਨੱਥੀ ਨਹੀਂ ਕਰਦੇ। CORS ਇੱਥੇ ਇੱਕ ਅਰਥਪੂਰਨ ਰੁਕਾਵਟ ਨਹੀਂ ਹੈ — API ਕੁੰਜੀ ਬੈਰੀਅਰ — ਹੈ ਜਿਸ ਕਾਰਨ ਉਹ ਸਤਹ ਜਾਣਬੁੱਝ ਕੇ ਮਨਜ਼ੂਰ ਹੈ ਤਾਂ ਕਿ ਬ੍ਰਾਊਜ਼ਰ ਅਤੇ Electron ਕਲਾਇੰਟ ਉਹਨਾਂ ਜਵਾਬਾਂ ਨੂੰ ਪੜ੍ਹ ਸਕਣ ਜਿਨ੍ਹਾਂ ਦੇ ਉਹ ਪਹਿਲਾਂ ਹੀ ਹੱਕਦਾਰ ਹਨ। ਅਰਾਮਦੇਹ ਈਕੋ ਲਈ ਇੱਕ ਪ੍ਰਮਾਣਿਤ ਵਿਸ਼ੇ (ਇੱਕ ਪ੍ਰਮਾਣਿਤ API ਕੁੰਜੀ ਜਾਂ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ) ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਨਾ ਕਿ ਸਿਰਫ਼ ਇੱਕ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਹੈਡਰ, ਅਤੇ ਕਦੇ ਵੀ `Access-Control-Allow-Credentials` ਸ਼ਾਮਲ ਨਹੀਂ ਹੁੰਦਾ। ਅਗਿਆਤ ਜਵਾਬ (`REQUIRE_API_KEY=false`) ਇੱਕ ਸਪਸ਼ਟ `CORS_ALLOW_ALL=true` ਔਪਟ-ਇਨ ਸਮੇਤ ਕੌਂਫਿਗਰ ਕੀਤੀ ਮੂਲ ਆਗਿਆ ਸੂਚੀ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ। ਪ੍ਰਮਾਣੀਕਰਣ ਅਸਵੀਕਾਰ (401) ਪੜ੍ਹਨਯੋਗ ਰਹਿੰਦੇ ਹਨ ਤਾਂ ਕਿ ਕਲਾਇੰਟ ਇੱਕ ਰੱਦ ਕੀਤੀ ਜਾਂ ਗਲਤ ਟਾਈਪ ਕੀਤੀ ਕੁੰਜੀ (#5242) ਨੂੰ ਪੇਸ਼ ਕਰ ਸਕਣ: ਪਾਈਪਲਾਈਨ ਦਾ ਆਪਣਾ 401 ਈਕੋ ਰੱਖਦਾ ਹੈ, ਅਤੇ ਇੱਕ ਰਸਤਾ ਜੋ ਪਾਈਪਲਾਈਨ ਦੁਆਰਾ ਇਸਨੂੰ ਅਗਿਆਤ ਵਜੋਂ ਸੇਵਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਕੁੰਜੀ ਨੂੰ ਆਪਣੇ ਆਪ ਤੋਂ ਇਨਕਾਰ ਕਰਦਾ ਹੈ (ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣਿਕਤਾ ਸੰਰਚਿਤ ਦੇ ਨਾਲ `/v1/models` ਅਤੇ `/v1beta/models`, ਮਾਲਕ-ਸਕੋਪਡ `/v1/files`, `/v1/batches`, ਆਟੋਮੈਟਿਕ `/v1/media`, `/v1/session-leases` ਉਮੀਦਵਾਰ ਰੂਟਸ) `credentialRejectionHeaders()` ਦੁਆਰਾ ਉਸ 401 ਵਿੱਚ echo ਜੋੜਦਾ ਹੈ। ਈਕੋ ਇੱਕ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਸਿਰਲੇਖ (`Authorization`, `x-api-key`, `x-goog-api-key` ਜਾਂ `auth_token` ਕੂਕੀ) ਵਾਲੀ ਬੇਨਤੀ 'ਤੇ ਕੁੰਜੀ ਰੱਖਦਾ ਹੈ, ਨਾ ਕਿ ਉਹਨਾਂ ਵਿੱਚੋਂ ਕਿਸ ਰੂਟ 'ਤੇ ਜਾਂਚ ਕੀਤੀ ਗਈ ਹੈ, ਅਤੇ ਕਦੇ ਵੀ `Access-Control-Allow-Credentials` ਨਾਲ ਜੋੜਾ ਨਹੀਂ ਬਣਾਇਆ ਗਿਆ ਹੈ; ਸਰੀਰ ਇੱਕ ਸਥਿਰ ਗਲਤੀ ਵਾਲਾ ਲਿਫਾਫਾ ਹੈ। `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ਦੁਆਰਾ ਸੁਰੱਖਿਆ ਵਾਲੇ `/api/v1/` ਅਧੀਨ ਪ੍ਰਬੰਧਨ ਰੂਟ ਇਸ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ-ਅਸਵੀਕਾਰ ਅਪਵਾਦ ਦੀ ਵਰਤੋਂ ਨਹੀਂ ਕਰਦੇ ਹਨ: `REQUIRE_API_KEY=false` ਦੇ ਨਾਲ, ਉਹਨਾਂ ਦੇ 401/403 ਜਵਾਬ ਸੰਰੂਪਿਤ CORS ਮੂਲ ਨੀਤੀ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹਨ।
- **ਕੂਕੀ ਸੈਸ਼ਨ (ਡੈਸ਼ਬੋਰਡ):** ਫੇਲ-ਬੰਦ ਡਿਫਾਲਟ ਦੁਆਰਾ ਸੁਰੱਖਿਅਤ **ਅਤੇ** ਸਾਂਝੇ ਮਾਰਗ 'ਤੇ `Access-Control-Allow-Credentials` ਦੀ ਗੈਰਹਾਜ਼ਰੀ ਦੁਆਰਾ। management/dashboard ਮੂਲ ਨੂੰ ਕਿਸੇ ਵੀ ਇਜਾਜ਼ਤ ਦੇਣ ਵਾਲੀ ਸੰਰਚਨਾ ਤੋਂ ਬਾਹਰ ਰੱਖੋ; ਉਹਨਾਂ ਨੂੰ ਬਿਲਕੁਲ ਫੇਲ-ਬੰਦ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ।

## WebSocket ਹੈਂਡਸ਼ੇਕਸ (`/v1/responses`, `/v1/ws`)

ਬ੍ਰਾਊਜ਼ਰ WebSocket'ਤੇ CORS ਨੂੰ ਲਾਗੂ ਨਹੀਂ ਕਰਦੇ ਹਨ, ਇਸਲਈ WebSocket ਟ੍ਰਾਂਸਪੋਰਟ ਕਰਦਾ ਹੈ ਜੋ ਅਨੁਮਾਨ ਆਉਟਪੁੱਟ ਵਾਪਸ ਕਰਦੇ ਹਨ ਹੈਂਡਸ਼ੇਕ `Origin` ਖੁਦ ਜਾਂਚ ਕਰਦੇ ਹਨ (`src/server/origin/wsOrigin.ts`): ਜਵਾਬ WebSocket (`/v1/responses`) ਅਤੇ, ਜਦੋਂ OmniRoute `npm start` / `npm run dev`, `/v1/ws` ਅਤੇ `/api/v1/ws` ਬ੍ਰਿਜ, ਜੋ ਕਿ `/v1/chat/completions`, `/v1/messages` ਅਤੇ `/v1/responses` ਨੂੰ ਸਟ੍ਰੀਮ ਕਰਦਾ ਹੈ, ਦੁਆਰਾ ਚਲਦਾ ਹੈ। ਪੁਲ `/api/v1/ws?handshake=1` ਫੈਸਲੇ ਲਈ ਪੁੱਛਦਾ ਹੈ ਅਤੇ ਅੱਪਗ੍ਰੇਡ ਕਰਨ ਤੋਂ ਇਨਕਾਰ ਕਰਦਾ ਹੈ ਜਦੋਂ ਤੱਕ ਉਹ ਰੂਟ ਜਾਂਚ ਨਹੀਂ ਕਰਦਾ। ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜਾਂ ਅਜੇ ਵੀ ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਲਾਗੂ ਹੁੰਦੀਆਂ ਹਨ। ਮੂਲ ਜਾਂਚ ਉਦੋਂ ਪਾਸ ਹੁੰਦੀ ਹੈ ਜਦੋਂ:

- ਇਸਦਾ ਕੋਈ `Origin` ਸਿਰਲੇਖ ਨਹੀਂ ਹੈ (Codex CLI, SDKs ਅਤੇ ਹੋਰ ਗੈਰ-ਬ੍ਰਾਊਜ਼ਰ ਕਲਾਇੰਟਸ);
- `Origin` ਉਪਰੋਕਤ ਅਨੁਮਤੀ ਸੂਚੀ ਦੁਆਰਾ ਦਾਖਲ ਕੀਤਾ ਗਿਆ ਹੈ (`CORS_ALLOWED_ORIGINS`, `corsOrigins` ਸੈਟਿੰਗ, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute ਦੇ ਆਪਣੇ ਜਨਤਕ ਮੂਲ ਵਿੱਚੋਂ ਇੱਕ ਹੈ (ਸੰਰਚਿਤ ਜਨਤਕ ਅਧਾਰ URL, ਇੱਕ ਭਰੋਸੇਯੋਗ ਪ੍ਰੌਕਸੀ ਦਾ ਫਾਰਵਰਡ ਮੂਲ, ਜਾਂ ਇੱਕ IP ਲਿਟਰਲ ਜਾਂ `localhost` — ਦੇ ਤੌਰ 'ਤੇ ਦਿੱਤਾ ਗਿਆ ਇੱਕ ਸਿੱਧਾ loopback/LAN ਹੋਸਟ ਜੋ ਡੈਸ਼ਬੋਰਡ ਪਰਿਵਰਤਨ ਜਾਂਚ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ); ਜਾਂ
- ਇਹ ਇੱਕ ਵੈਧ API ਕੁੰਜੀ ਰੱਖਦਾ ਹੈ, ਜਿਵੇਂ ਕਿ HTTP `/v1/*` ਸਤਹ 'ਤੇ ਹੈ।

ਹੋਰ ਕੁਝ ਵੀ `403 ws_origin_forbidden` ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ। ਇੱਕ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਕੂਕੀ ਇੱਕ ਵਿਦੇਸ਼ੀ `Origin` ਛੋਟ ਨਹੀਂ ਦਿੰਦੀ, ਕਿਉਂਕਿ ਬ੍ਰਾਊਜ਼ਰ ਇਸਨੂੰ ਕਿਸੇ ਵੀ ਪੰਨੇ ਦੇ ਸਾਕਟ ਨਾਲ ਜੋੜਦਾ ਹੈ। ਕਿਸੇ ਹੋਰ ਪੋਰਟ 'ਤੇ `localhost` ਸਮਾਨ-ਮੂਲ ਨਹੀਂ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ; ਅਜਿਹੇ dev ਮੂਲ ਨੂੰ `CORS_ALLOWED_ORIGINS` ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ।

## ਉਦਾਹਰਨ: OmniRoute ਦੇ ਸਾਹਮਣੇ ਰਿਵਰਸ ਪ੍ਰੌਕਸੀ

CORS ਖੁਦ OmniRoute ਦੁਆਰਾ ਲਾਗੂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਇਸਲਈ ਪ੍ਰੌਕਸੀ ਆਮ ਤੌਰ 'ਤੇ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ**ਨਹੀਂ** `Access-Control-*` ਸਿਰਲੇਖਾਂ ਨੂੰ ਜੋੜੋ ਜਾਂ ਦੁਬਾਰਾ ਲਿਖੋ (ਡਬਲ ਹੈਡਰ ਬਰੇਕ ਬ੍ਰਾਊਜ਼ਰ)। TLS ਨੂੰ ਖਤਮ ਕਰੋ ਅਤੇ — ਅੱਗੇ OmniRoute ਨੂੰ ਪ੍ਰੀਫਲਾਈਟ ਦਾ ਜਵਾਬ ਦਿਓ:

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

ਪ੍ਰੌਕਸੀ ਵਿੱਚ ਨਹੀਂ, OmniRoute (`CORS_ALLOWED_ORIGINS` ਜਾਂ ਸੁਰੱਖਿਆ ਟੈਬ) ਵਿੱਚ ਮਨਜ਼ੂਰ ਬ੍ਰਾਊਜ਼ਰ ਮੂਲ ਸੈੱਟ ਕਰੋ।

## ਸਰੋਤ ਫਾਈਲਾਂ

| ਚਿੰਤਾ                                    | ਫਾਈਲ                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------- |
| ਅਲੋਲਿਸਟ ਰੈਜ਼ੋਲਿਊਸ਼ਨ + `getCorsStatus()`  | `src/server/cors/origins.ts`                                         |
| ਮਿਡਲਵੇਅਰ ਐਪਲੀਕੇਸ਼ਨ (ਸੱਚਾਈ ਦਾ ਸਿੰਗਲ ਸਰੋਤ) | `src/server/authz/pipeline.ts`                                       |
| ਸੈਟਿੰਗਾਂ → ਰਨਟਾਈਮ ਮੂਲ ਇੰਜੈਕਸ਼ਨ           | `src/lib/config/runtimeSettings.ts`                                  |
| ਡੈਸ਼ਬੋਰਡ ਲਈ ਰਨਟਾਈਮ ਸਥਿਤੀ                 | `src/app/api/settings/authz-inventory/route.ts`                      |
| ਡੈਸ਼ਬੋਰਡ ਚੇਤਾਵਨੀ ਬੈਨਰ                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਮੂਲ ਖੇਤਰ                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ਕਲਾਉਡ-ਏਜੰਟ ਪ੍ਰਤੀ-ਰੂਟ CORS (ਅਪਵਾਦ)        | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ਹੈਂਡਸ਼ੇਕ `Origin` ਜਾਂਚ         | `src/server/origin/wsOrigin.ts`                                      |

## ਇਹ ਵੀ ਵੇਖੋ

- ਸਪੌਨ-ਸਮਰੱਥ ਰੂਟਾਂ ਲਈ [ਰੂਟ ਗਾਰਡ ਟੀਅਰਜ਼](./ROUTE_GUARD_TIERS.md) — ਲੂਪਬੈਕ ਇਨਫੋਰਸਮੈਂਟ (ਇੱਕ ਵੱਖਰਾ, ਪੂਰਕ ਨਿਯੰਤਰਣ)।
- [ਅਧਿਕਾਰ ਗਾਈਡ](../architecture/AUTHZ_GUIDE.md) — ਪੂਰੀ ਪ੍ਰਮਾਣਿਕਤਾ ਪਾਈਪਲਾਈਨ।
