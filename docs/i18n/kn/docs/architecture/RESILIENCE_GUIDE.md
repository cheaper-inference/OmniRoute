# Resilience Guide (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ಮೂರು ವಿಭಿನ್ನ ಆದರೆ ಸಂಬಂಧಿತ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ಕಾರ್ಯವಿಧಾನಗಳನ್ನು ಹೊಂದಿದೆ. ಪ್ರತಿಯೊಂದಕ್ಕೂ ವಿಭಿನ್ನ ವ್ಯಾಪ್ತಿ ಮತ್ತು ಉದ್ದೇಶವಿದೆ. ರೂಟಿಂಗ್ ನಡವಳಿಕೆಯನ್ನು ಡೀಬಗ್ ಮಾಡುವಾಗ ಅವುಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಇರಿಸಿ.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> ಮೂಲ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ಟಾಗಲ್ಗಳಿಗೆ Env-vs-ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪ್ರಾಶಸ್ತ್ಯ.** ಆಯ್ಕೆಯ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವವು ಪರಿಸರದಿಂದ — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — ಅನ್ನು ಟಾಗಲ್ ಮಾಡುತ್ತದೆ _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) ಅನ್ನು ಮಾತ್ರ ಪೂರೈಸುತ್ತದೆ. ಒಂದು ಬೂಲಿಯನ್ `resilienceSettings` (ಡ್ಯಾಶ್ಬೋರ್ಡ್ →** ಸೆಟ್ಟಿಂಗ್ಗಳು → ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ** / `PATCH /api/resilience`, `key_value` ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ ) env ಮೌಲ್ಯದ ಮೇಲೆ ಗೆಲ್ಲುತ್ತದೆ: ಸಾಮಾನ್ಯೀಕರಣವು (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) ಒಂದು ಅಸ್ತಿತ್ವದಲ್ಲಿದ್ದಾಗ ಸಂಗ್ರಹಿಸಲಾದ ಬೂಲಿಯನ್ ಅನ್ನು ಇರಿಸುತ್ತದೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಈಗಾಗಲೇ `false` ಉಳಿಸಿರುವ ನಿಯೋಜನೆಯಲ್ಲಿ ಅಂತಹ env var ಅನ್ನು `true` ಗೆ ಹೊಂದಿಸುವುದರಿಂದ ಏನನ್ನೂ ಬದಲಾಯಿಸುವುದಿಲ್ಲ — ಟಾಗಲ್ ಅನ್ನು ಫ್ಲಿಪ್ ಇನ್ ಮಾಡಿ** ಸೆಟ್ಟಿಂಗ್ಗಳು → ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ** (ಅಥವಾ ಸಂಗ್ರಹಿಸಿದ ಕ್ಷೇತ್ರವನ್ನು ತೆರವುಗೊಳಿಸಿ) ಬದಲಿಗೆ.

## 1. ಪ್ರೊವೈಡರ್ ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್

**ವ್ಯಾಪ್ತಿ:** ಇಡೀ ಪ್ರೊವೈಡರ್ (ಉದಾ., `glm`, `openai`, `anthropic`).

**ಉದ್ದೇಶ:** ಅಪ್ಸ್ಟ್ರೀಮ್/ಸೇವಾ ಮಟ್ಟದಲ್ಲಿ ಪದೇ ಪದೇ ವಿಫಲವಾಗುತ್ತಿರುವ ಪ್ರೊವೈಡರ್ಗೆ ಟ್ರಾಫಿಕ್ ಕಳುಹಿಸುವುದನ್ನು ನಿಲ್ಲಿಸುವುದು.

**ಅನುಷ್ಠಾನ:**

- ಪ್ರಧಾನ ಕ್ಲಾಸ್: `src/shared/utils/circuitBreaker.ts`
- ವೈರಿಂಗ್: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ಸ್ಥಿತಿ API: `GET /api/monitoring/health`
- ರಿಸೆಟ್ API: `POST /api/resilience/reset`
- ರ್ಯಾಪರ್ಗಳು: `open-sse/services/accountFallback.ts`
- DB ಟೇಬಲ್: `domain_circuit_breakers`

**ಸ್ಥಿತಿಗಳು:**

- `CLOSED` — ಸಾಮಾನ್ಯ ಟ್ರಾಫಿಕ್ ಅನುಮತಿಸಲಾಗಿದೆ
- `DEGRADED` — ಟ್ರಾಫಿಕ್ ಇನ್ನೂ ಅನುಮತಿಸಲಾಗಿದೆ, ಆದರೆ ಹೆಚ್ಚುತ್ತಿರುವ ಪ್ರೊವೈಡರ್ ವಿಫಲತೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ; ಸಾಕಷ್ಟು ಯಶಸ್ಸುಗಳಾದಾಗ, ಮಾನ್ಯ ಸಂಪರ್ಕ ಪರೀಕ್ಷೆಯಾದಾಗ, ಅಥವಾ ಕೊನೆಯ ವಿಫಲತೆಯ ಪ್ರಕಾರದ ಅತ್ಯುದ್ದನೆಯ `OPEN` ಹೋಲ್ಡ್ ಅವಧಿಯ ನಂತರ (ಅದರ `cooldownByKind` ಮೌಲ್ಯ, ಇಲ್ಲದಿದ್ದರೆ `resetTimeout`, × `maxBackoffMultiplier`, ಕನಿಷ್ಠ ಒಂದು ಕೂಲ್ಡೌನ್) ಹೊಸ ವಿಫಲತೆಯಾಗದಿದ್ದರೆ `CLOSED` ಗೆ ಹಿಂತಿರುಗುತ್ತದೆ
- `OPEN` — ಪ್ರೊವೈಡರ್ ತಾತ್ಕಾಲಿಕವಾಗಿ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ; ಕಾಂಬೊ ರೂಟಿಂಗ್ ಅದನ್ನು ಬಿಟ್ಟುಬಿಡುತ್ತದೆ
- `HALF_OPEN` — ರಿಸೆಟ್ ಟೈಮ್ಔಟ್ ಮುಗಿದಿದೆ; ಪ್ರೋಬ್ ವಿನಂತಿಯನ್ನು ಅನುಮತಿಸಲಾಗಿದೆ

**ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದಾದ ಡೀಫಾಲ್ಟ್ಗಳು (`open-sse/config/constants.ts`, ಡ್ಯಾಶ್ಬೋರ್ಡ್ → ಸೆಟ್ಟಿಂಗ್ಗಳು → ರೆಸಿಲಿಯನ್ಸ್ ನಲ್ಲಿ ಅನಾವರಣಗೊಂಡಿವೆ):**

| ವರ್ಗ    | ಡಿಗ್ರೇಡ್ ಆಗುವುದು | ಓಪನ್ ಆಗುವುದು | ರಿಸೆಟ್ ಟೈಮ್ಔಟ್ |
| ------- | ---------------- | ------------ | -------------- |
| OAuth   | 5 ವಿಫಲತೆಗಳು      | 8 ವಿಫಲತೆಗಳು  | 60s            |
| API-key | 7 ವಿಫಲತೆಗಳು      | 12 ವಿಫಲತೆಗಳು | 30s            |
| Local   | ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ   | 2 ವಿಫಲತೆಗಳು  | 15s            |

`degradationThreshold` ಪ್ರೊವೈಡರ್ ಯಾವಾಗ `DEGRADED` ಗೆ ಪ್ರವೇಶಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ; `failureThreshold` ಅದು ಯಾವಾಗ ಓಪನ್ ಆಗುತ್ತದೆ ಮತ್ತು ಬಿಟ್ಟುಬಿಡಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಸ್ಥಳೀಯ ಪ್ರೊವೈಡರ್ ಪ್ರೊಫೈಲ್ಗಳನ್ನು ಇನ್ನೂ ರೆಸಿಲಿಯನ್ಸ್ ಸೆಟ್ಟಿಂಗ್ಗಳ ಪುಟದಲ್ಲಿ ಅನಾವರಣಗೊಳಿಸಲಾಗಿಲ್ಲ.

**ಟ್ರಿಪ್ ಕೋಡ್ಗಳು:** ಕೇವಲ ಪ್ರೊವೈಡರ್-ಮಟ್ಟದ ಸ್ಥಿತಿಗಳು `[408, 500, 502, 503, 504]`. ಖಾತೆ-ಮಟ್ಟದ ದೋಷಗಳಿಗೆ ಟ್ರಿಪ್ ಮಾಡಬೇಡಿ (ಹೆಚ್ಚಿನ 401/403/429 — ಅವು ಕೂಲ್ಡೌನ್ ಅಥವಾ ಲಾಕ್ಔಟ್ಗೆ ಸೇರಿದವು).

**ಲೇಜಿ ರಿಕವರಿ:** `OPEN` ಅವಧಿ ಮುಗಿದಾಗ, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ಸ್ಥಿತಿಯನ್ನು `HALF_OPEN` ಗೆ ರಿಫ್ರೆಶ್ ಮಾಡುತ್ತವೆ. ಅದೇ ಓದುವಿಕೆಗಳು (ಮತ್ತು ಮುಂದಿನ ವಿಫಲತೆ) ಹಳೆಯಾದ `DEGRADED` ಅನ್ನು ಮತ್ತೆ `CLOSED` ಗೆ ಕ್ಷಯಿಸುತ್ತವೆ. ಬ್ಯಾಕ್ಗ್ರೌಂಡ್ ಟೈಮರ್ ಅಗತ್ಯವಿಲ್ಲ.

---

### ಆಪ್ಟ್-ಇನ್ ಜಾಗತಿಕ ಪ್ರೊವೈಡರ್ ಕೂಲ್ಡೌನ್ (ವಿಂಡೋ ಗೇಟ್)

ನಾಲ್ಕನೆಯ, **ಆಪ್ಟ್-ಇನ್** ಪದರ (`PROVIDER_COOLDOWN_ENABLED`, ಡೀಫಾಲ್ಟ್ **ಆಫ್**) `open-sse/services/providerCooldownTracker.ts` ನಲ್ಲಿ ವಿಫಲವಾಗುತ್ತಿರುವ ಪ್ರೊವೈಡರ್ಗಳ ಕ್ರಾಸ್-ರಿಕ್ವೆಸ್ಟ್ ಮೆಮೊರಿಯನ್ನು ಇರಿಸುತ್ತದೆ; ಕಾಂಬೊ ಟಾರ್ಗೆಟ್ ರೆಸಲ್ಯೂಶನ್ ಇದನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಸತತ ಕಾಂಬೊ ವಿನಂತಿಗಳು ಈಗಷ್ಟೇ ವಿಫಲವಾದ ಪ್ರೊವೈಡರ್ ಅನ್ನು ಮತ್ತೆ ಹಾದುಹೋಗುವುದನ್ನು ನಿಲ್ಲಿಸುತ್ತವೆ. ಪ್ರೊವೈಡರ್-ಮಟ್ಟದ ಎಂಟ್ರಿಗಳು `PROVIDER_PROFILES` ವಿಂಡೋ ಗೇಟ್ ಅನ್ನು ಗೌರವಿಸುತ್ತವೆ:

| ಪ್ರೊಫೈಲ್ | ಟ್ರಿಪ್ ಆಗುವುದು (`providerFailureThreshold`) | ಅವಧಿಯೊಳಗೆ (`providerFailureWindowMs`) | ಕೂಲ್ ಆಗುವ ಅವಧಿ (`providerCooldownMs`) |
| -------- | ------------------------------------------: | ------------------------------------: | ------------------------------------: |
| OAuth    |                                        `10` |                               `15min` |                                `5min` |
| API key  |                                        `15` |                               `30min` |                               `10min` |

ಮಿತಿಗಿಂತ ಕೆಳಗೆ ಪ್ರೊವೈಡರ್ ಕೂಲಿಂಗ್ನಲ್ಲಿ **ಇಲ್ಲ** ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ; ಯಶಸ್ಸು ವಿಂಡೋವನ್ನು ತೆರವುಗೊಳಿಸುತ್ತದೆ. ಸಂಪರ್ಕ-ಮಟ್ಟದ ಎಂಟ್ರಿಗಳು (`provider:connectionId`) ಬದಲಾಗಿ ಘಾತಾಂಕೀಯ `minRetryCooldownMs → maxRetryCooldownMs` ಬ್ಯಾಕ್ಆಫ್ ಅನ್ನು ಇರಿಸುತ್ತವೆ. ಓವರ್ರೈಡ್ಗಳು: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. ರಿಗ್ರೆಶನ್ ಗಾರ್ಡ್: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. ಸಂಪರ್ಕ ಕೂಲ್ಡೌನ್

**ವ್ಯಾಪ್ತಿ:** ಒಂದೇ ಪ್ರೊವೈಡರ್ ಸಂಪರ್ಕ/ಖಾತೆ/ಕೀ.

**ಉದ್ದೇಶ:** ಅದೇ ಪ್ರೊವೈಡರ್ನ ಇತರ ಸಂಪರ್ಕಗಳು ಸೇವೆ ನೀಡುತ್ತಿರಲು, ಕಾರ್ಯನಿರ್ವಹಿಸದ ಒಂದು ಕೀಯನ್ನು ಬಿಟ್ಟುಬಿಡುವುದು.

**ಅನುಷ್ಠಾನ:**

- ಲಭ್ಯವಿಲ್ಲ ಎಂದು ಗುರುತಿಸುವುದು: `src/sse/services/auth.ts::markAccountUnavailable()`
- ಆಯ್ಕೆ: ಅದೇ ಫೈಲ್ನಲ್ಲಿರುವ `getProviderCredentials*`
- ಕೂಲ್ಡೌನ್ ಲೆಕ್ಕಾಚಾರ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ಸೆಟ್ಟಿಂಗ್ಗಳು: `src/lib/resilience/settings.ts`

**ಪ್ರತಿ ಸಂಪರ್ಕದ ಫೀಲ್ಡ್ಗಳು:**

- `rateLimitedUntil` — ಕೂಲ್ಡೌನ್ ಮುಗಿಯುವವರೆಗಿನ ಟೈಮ್ಸ್ಟಾಂಪ್
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ಎಕ್ಸ್ಪೋನೆನ್ಷಿಯಲ್ ಬ್ಯಾಕ್ಆಫ್ ಕೌಂಟರ್

**ಡೀಫಾಲ್ಟ್ ಕೂಲ್ಡೌನ್ಗಳು:**

- OAuth ಮೂಲ ಮೌಲ್ಯ: 5s
- API-key ಮೂಲ ಮೌಲ್ಯ: 3s
- API-key 429: ಅಪ್ಸ್ಟ್ರೀಮ್ `Retry-After`/reset ಹೆಡರ್ಗಳು/ಪಾರ್ಸ್ ಮಾಡಬಹುದಾದ reset ಪಠ್ಯಕ್ಕೆ ಆದ್ಯತೆ ನೀಡುತ್ತದೆ
- ಬ್ಯಾಕ್ಆಫ್: `baseCooldownMs * 2 ** failureIndex`

**ಪ್ರತಿ-ಪ್ರೊವೈಡರ್ ಮರುಪ್ರಯತ್ನ ವಿಳಂಬ.** ಪ್ರೊವೈಡರ್ ವಿವರಗಳ ಪುಟದಲ್ಲಿ **Retry delay** ಆಯ್ಕೆ ಇದೆ (Auto,
15s ರಿಂದ 1h ವರೆಗೆ). ಇದು `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, `PATCH /api/resilience` ಮೂಲಕ) ಅನ್ನು ಉಳಿಸುತ್ತದೆ. ದರ-ಮಿತಿ ದೋಷದಲ್ಲಿ ಯಾವುದೇ ಅಪ್ಸ್ಟ್ರೀಮ್ ಮರುಪ್ರಯತ್ನ
ಸೂಚನೆ ಇಲ್ಲದಿದ್ದಾಗ, ಆ ಮೌಲ್ಯವು ಪ್ರೊವೈಡರ್ಗಾಗಿ ಸ್ಕೇಲ್ ಮಾಡಲಾದ ಬ್ಯಾಕ್ಆಫ್ ಅನ್ನು ಬದಲಿಸುತ್ತದೆ ಮತ್ತು
`backoffLevel` ಅನ್ನು 0 ಗೆ ಮರುಹೊಂದಿಸುತ್ತದೆ (`open-sse/services/rotationConfig.ts::overrideFor`). ದರ-ಮಿತಿಗೊಳಿಸಲಾದ
ದೋಷಕ್ಕಾಗಿ ಆದ್ಯತೆಯ ಕ್ರಮ, ಹೆಚ್ಚಿನದರಿಂದ ಕಡಿಮೆಯವರೆಗೆ: ಅಪ್ಸ್ಟ್ರೀಮ್ ಮರುಪ್ರಯತ್ನ ಸೂಚನೆ, ನಂತರ ಪ್ರತಿ-ಸಂಪರ್ಕ
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`, ನಂತರ ಪ್ರತಿ-ಪ್ರೊವೈಡರ್ ಮರುಪ್ರಯತ್ನ ವಿಳಂಬ, ನಂತರ
env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, ನಂತರ ಸ್ಕೇಲ್ ಮಾಡಲಾದ ಬ್ಯಾಕ್ಆಫ್. Auto ಫೀಲ್ಡ್ ಅನ್ನು
ತೆಗೆದುಹಾಕುತ್ತದೆ. ಇದು ದರ-ಮಿತಿಯ ಕಾರಣಕ್ಕೆ ಮಾತ್ರ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ, ಅಂತಿಮ ಸ್ಥಿತಿಗಳಿಗೆ ಎಂದಿಗೂ ಅಲ್ಲ.

**ಆಂಟಿ-ಥಂಡರಿಂಗ್-ಹರ್ಡ್ ಗಾರ್ಡ್:** ಸಮಕಾಲೀನ ವಿಫಲತೆಗಳಿಂದ ಕೂಲ್ಡೌನ್ ಅತಿಯಾಗಿ ವಿಸ್ತರಿಸುವುದು ಅಥವಾ
`backoffLevel` ಎರಡು ಬಾರಿ ಹೆಚ್ಚಿಸುವುದನ್ನು ತಡೆಯುತ್ತದೆ.

**ಕನ್ಕರೆನ್ಸಿ-ಮಿತಿ 429ಗಳು ಬ್ಯಾಕ್ಆಫ್ ಮೆಟ್ಟಿಲೇರಿಕೆಯನ್ನು ಹೆಚ್ಚಿಸುವುದಿಲ್ಲ.** ದೇಹದಲ್ಲಿ ಕನ್ಕರೆನ್ಸಿ ಮಿತಿಯನ್ನು
("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`)
ತಿಳಿಸುವ `429`, ಖಾತೆ ಆರೋಗ್ಯವಾಗಿದ್ದರೂ ಕಾರ್ಯನಿರತವಾಗಿದೆ ಎಂದರ್ಥ.
`checkFallbackError()` `concurrency_limited` ಕಾರಣವನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ: ತಕ್ಷಣ ಮುಂದಿನ ಸಂಪರ್ಕಕ್ಕೆ
ಫೇಲ್ಓವರ್ ಮಾಡಿ, ಈ ಸಂಪರ್ಕವನ್ನು ನಿಗದಿತ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ಅಥವಾ ಅಪ್ಸ್ಟ್ರೀಮ್ ಮರುಪ್ರಯತ್ನ
ಸೂಚನೆಯಷ್ಟು ಸಮಯ ಕೂಲ್ ಮಾಡಿ, `backoffLevel` ಅನ್ನು ಬದಲಾಗದಂತೆ ಇರಿಸಿ, ಮತ್ತು `skipProviderBreaker` ಅನ್ನು
ಸೆಟ್ ಮಾಡಿ. ಸ್ಪಷ್ಟವಾದ ಕೋಟಾ ದೇಹಕ್ಕೆ ಇನ್ನೂ ಆದ್ಯತೆ ಇರುತ್ತದೆ; ಆದ್ದರಿಂದ ಕೋಟಾ ಪ್ಯಾಟರ್ನ್ಗೆ ಹೊಂದಿಕೆಯಾಗುವ
ದೇಹವು ಕೋಟಾ ತೀರ್ಪಾಗಿಯೇ ಉಳಿಯುತ್ತದೆ. ಪತ್ತೆ: `src/shared/utils/classify429.ts`ನಲ್ಲಿನ
`looksLikeConcurrencyLimit()`; ತೀರ್ಪು: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (ಬ್ರೇಕರ್ನ `FailureKind`) ಬದಲಾಗುವುದಿಲ್ಲ ಮತ್ತು ಈ ದೇಹಗಳಿಗೆ ಇನ್ನೂ `rate_limit` ಅನ್ನು
ಓದುತ್ತದೆ.

**ಸ್ಟ್ರೀಮ್ ವಿಷಯದ ಸ್ಥಗಿತಗಳು ಖಾತೆಯನ್ನು ಕೂಲ್ ಮಾಡುವುದಿಲ್ಲ.** ವಿಷಯ-ಸ್ಥಗಿತ ವಾಚ್ಡಾಗ್
(`open-sse/utils/streamHandler.ts`) ಸಮಯಕ್ಕೆ ಯಾವುದೇ ಮಾದರಿ ಔಟ್ಪುಟ್ ಕಳುಹಿಸದ ಸ್ಟ್ರೀಮ್ ಅನ್ನು ಕೈಬಿಟ್ಟಾಗ,
`markAccountUnavailable()` ಸಂಪರ್ಕದ ಮೇಲೆ ದೋಷವನ್ನು ದಾಖಲಿಸುತ್ತದೆ, ಆದರೆ ಯಾವುದೇ ಕೂಲ್ಡೌನ್ ಅನ್ನು ಸೆಟ್ ಮಾಡುವುದಿಲ್ಲ:
ಈ ಸ್ಥಗಿತವು ಆ ವಿನಂತಿಗೆ ಮಾತ್ರ ಸೇರಿದ್ದು, ಹೆಚ್ಚಾಗಿ ಯಾವುದೇ ಔಟ್ಪುಟ್ ಇನ್ನೂ ಇಲ್ಲದ ದೀರ್ಘ reasoning turn ಆಗಿರುತ್ತದೆ.
`resilienceSettings.streamStallCooldown.enabled` ಮೂಲಕ ಆಪರೇಟರ್ಗಳು ಇದನ್ನು ಐಚ್ಛಿಕವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಬಹುದು
(ಡೀಫಾಲ್ಟ್ `false`).

**`p2c` ಖಾತೆ ಆಯ್ಕೆಗಾಗಿ ಐಚ್ಛಿಕ ಲ್ಯಾಟೆನ್ಸಿ ಸಿಗ್ನಲ್.** ಪ್ರತಿ ಡಿಸ್ಪ್ಯಾಚ್ ಮಾಡಿದ ಪ್ರಯತ್ನವು ಪ್ರತಿ ಸಂಪರ್ಕಕ್ಕೆ
(ಮತ್ತು ಪ್ರತಿ ಸಂಪರ್ಕ + ಮಾದರಿಗೆ) ಅದರ time-to-first-byte ಮತ್ತು ಫಲಿತಾಂಶವನ್ನು ಇನ್-ಮೆಮೊರಿ ರೋಲಿಂಗ್ ವಿಂಡೋದಲ್ಲಿ
ದಾಖಲಿಸುತ್ತದೆ: 15 ನಿಮಿಷಗಳೊಳಗಿನ ಕೊನೆಯ 20 ಮಾದರಿಗಳು
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts`ನಲ್ಲಿನ
`safeLogEvents()` ಮೂಲಕ ದಾಖಲಾಗುತ್ತದೆ). `resilienceSettings.p2cLatency.weight` `0`ಕ್ಕಿಂತ ಹೆಚ್ಚಿದ್ದಾಗ
(ಶ್ರೇಣಿ 0-20, ಡೀಫಾಲ್ಟ್ `0` = ಆಫ್), `src/sse/services/auth.ts`ನಲ್ಲಿನ
`compareP2CConnections()` ಜೋಡಿಯ ಪ್ರತಿಯೊಂದು ಅಭ್ಯರ್ಥಿಗೆ ಗರಿಷ್ಠ `weight` ಪಾಯಿಂಟ್ಗಳನ್ನು ಸೇರಿಸುತ್ತದೆ.
ಅದರ ಅರ್ಧವು ವೇಗವಾದ ಅಭ್ಯರ್ಥಿಗೆ ಅನುಪಾತವಾಗಿ ಲ್ಯಾಟೆನ್ಸಿಯಿಂದ (ಎರಡು ಪಟ್ಟು ನಿಧಾನವಾಗಿದ್ದರೆ ಪೂರ್ಣ ಅರ್ಧ)
ಮತ್ತು ಅರ್ಧವು ರೋಲಿಂಗ್ ದೋಷ ದರದಿಂದ ಬರುತ್ತದೆ. ಎರಡೂ ಅಭ್ಯರ್ಥಿಗಳು ಕನಿಷ್ಠ 3 ಮಾದರಿಗಳನ್ನು ಹೊಂದಿರುವಾಗ ಮಾತ್ರ
ಈ ಪದ ಅನ್ವಯಿಸುತ್ತದೆ; ಆದ್ದರಿಂದ ಹೊಸ ಖಾತೆಗಳಿಗೆ ದಂಡ ವಿಧಿಸಲಾಗುವುದಿಲ್ಲ, ಮತ್ತು ಇದರ ಗರಿಷ್ಠ ಮೌಲ್ಯವು
ಕೋಟಾ-ಬ್ಲಾಕ್ ಮಾಡಿದ ಹಾಗೂ ಕೋಟಾ-ಪೂರ್ಣಗೊಂಡ ದಂಡಗಳಿಗಿಂತ ಕಡಿಮೆಯಾಗಿಯೇ ಇರುತ್ತದೆ. ಇದು ತನ್ನದೇ ಆದ ಯಾವುದೇ
ಸರ್ಕ್ಯೂಟ್ ಅನ್ನು ಸೇರಿಸುವುದಿಲ್ಲ: ವಿಫಲ ಖಾತೆಗಳನ್ನು ಇನ್ನೂ ಕೂಲ್ಡೌನ್, ಲಾಕ್ಔಟ್ ಮತ್ತು ಬ್ರೇಕರ್ ಪದರಗಳು
ನಿರ್ವಹಿಸುತ್ತವೆ. ಇದನ್ನು `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ಮೂಲಕ ಸೆಟ್ ಮಾಡಿ.

**Reasoning ಫ್ರೇಮ್ಗಳು ವಿಷಯ-ಸ್ಥಗಿತ ಬಜೆಟ್ ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸುತ್ತವೆ.** Reasoning ಮಾದರಿಯು ತನ್ನ ಮೊದಲ
ಗೋಚರ ಟೋಕನ್ಗಿಂತ ಮೊದಲು ನಿಮಿಷಗಳ ಕಾಲ ಯೋಚಿಸಬಹುದು: Claude `thinking_delta` ಫ್ರೇಮ್ಗಳನ್ನು ಸ್ಟ್ರೀಮ್ ಮಾಡುತ್ತದೆ,
ಅವುಗಳ thinking ಪಠ್ಯ ಖಾಲಿಯಾಗಿರಬಹುದು, ಮತ್ತು Responses API ಒಂದರ ನಂತರ ಮತ್ತೊಂದು reasoning item ಅನ್ನು
ಸ್ಟ್ರೀಮ್ ಮಾಡುತ್ತದೆ. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ಈ ಫ್ರೇಮ್ಗಳನ್ನು
ಗುರುತಿಸುತ್ತದೆ ಮತ್ತು turn ಅನ್ನು ರದ್ದುಪಡಿಸುವ ಬದಲು ಪ್ರತಿಯೊಂದರಲ್ಲೂ ವಾಚ್ಡಾಗ್ ತನ್ನ ಬಜೆಟ್ ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸುತ್ತದೆ.
ಅವು ಇನ್ನೂ ಮಾದರಿ ಔಟ್ಪುಟ್ ಅಲ್ಲ; ಆದ್ದರಿಂದ reasoning ಮಾತ್ರದೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳುವ turn ಅನ್ನು ಇನ್ನೂ ಖಾಲಿ ಎಂದು
ವರದಿ ಮಾಡಲಾಗುತ್ತದೆ, ಮತ್ತು reasoning ನಿಂತು ಕೇವಲ heartbeats ಕಳುಹಿಸುವ turn ವಾಚ್ಡಾಗ್ ಅನ್ನು ಇನ್ನೂ
ಟ್ರಿಗರ್ ಮಾಡುತ್ತದೆ.

ಖಾಲಿಯಲ್ಲದ signature ಹೊಂದಿರುವ Kiro ನ ಬೈನರಿ `reasoningContentEvent` ಫ್ರೇಮ್ಗಳು ಈ reasoning ಚಟುವಟಿಕೆಯನ್ನು
executor ಮೂಲಕ ಖಾಲಿ `reasoning_content` delta ಆಗಿ ಉಳಿಸುತ್ತವೆ. Signature ಅನ್ನು ಫಾರ್ವರ್ಡ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ.
ಮೆಟಾಡೇಟಾ, ಅಪೂರ್ಣ ಫ್ರೇಮ್ಗಳು ಮತ್ತು ಖಾಲಿ signatureಗಳು ವಿಷಯ ಬಜೆಟ್ ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸುವುದಿಲ್ಲ; ಸ್ವತಂತ್ರ
active-stream timeout ಮತ್ತು ಕ್ಲೈಂಟ್ ರದ್ದತಿ ಇನ್ನೂ ಅನ್ವಯಿಸುತ್ತವೆ (`open-sse/executors/kiro/reasoning.ts`).

**ಅಂತಿಮ ಸ್ಥಿತಿಗಳು (ಕೂಲ್ಡೌನ್ಗಳಲ್ಲ):**

- `banned` — banned-keyword / account-ban ಪತ್ತೆಯಿಂದ ಸೆಟ್ ಮಾಡಲಾಗುತ್ತದೆ ([BAN_DETECTION](../security/BAN_DETECTION.md) ನೋಡಿ). ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರತಿ-ವಿನಂತಿ ನಿರಾಕರಣೆಗಳು (`request_rejected`, ಉದಾ. Anthropic OAuth 403 "Request not allowed") ಇದನ್ನು ಎಂದಿಗೂ ಸೆಟ್ ಮಾಡುವುದಿಲ್ಲ: ಅವುಗಳನ್ನು ಪ್ರತಿ ಸಂಪರ್ಕ ಮತ್ತು ಮಾದರಿಗೆ ಎಣಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಹೆಚ್ಚುತ್ತಿರುವ ಕೂಲ್ಡೌನ್ನೊಂದಿಗೆ ಆ ಮಾದರಿಯನ್ನು ರೋಟೇಶನ್ನಿಂದ ಹೊರತೆಗೆದುಕೊಳ್ಳಲಾಗುತ್ತದೆ; ಈ ಕೂಲ್ಡೌನ್ `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) ನಲ್ಲಿ ಗರಿಷ್ಠಗೊಳ್ಳುತ್ತದೆ, ಅಥವಾ ಯಾವುದೇ ಮಾದರಿ ತಿಳಿದಿಲ್ಲದಾಗ ಸಂಪರ್ಕವನ್ನು ಕೂಲ್ ಮಾಡುತ್ತದೆ — `open-sse/services/requestRejectedStreak.ts`
- `expired` (ಮಿತಿಗೊಳಿಸಿದ ಮರುಪ್ರಯತ್ನಗಳ ನಂತರ ಅಂತಿಮ ಸ್ಥಿತಿಗೆ ಪರಿವರ್ತನೆಗೊಳ್ಳುತ್ತದೆ — ಎಕ್ಸ್ಪೋನೆನ್ಷಿಯಲ್ ಬ್ಯಾಕ್ಆಫ್ನೊಂದಿಗೆ `EXPIRED_RETRY_MAX = 3` — ಆದ್ದರಿಂದ ಖಾತೆಯನ್ನು ಶಾಶ್ವತವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವ ಮೊದಲು ತಾತ್ಕಾಲಿಕ OAuth ದೋಷಗಳು ಸ್ವಯಂ-ಚೇತರಿಸಿಕೊಳ್ಳಬಹುದು)
- `credits_exhausted`

ಇವು ರುಜುವಾತುಗಳು ಬದಲಾಗುವವರೆಗೆ ಅಥವಾ ಆಪರೇಟರ್ ಅವುಗಳನ್ನು ಮರುಹೊಂದಿಸುವವರೆಗೆ ಮುಂದುವರಿಯುತ್ತವೆ. ತಾತ್ಕಾಲಿಕ cooldown ಸ್ಥಿತಿಯಿಂದ terminal ಸ್ಥಿತಿಗಳನ್ನು ಓವರ್ರೈಟ್ ಮಾಡಬೇಡಿ.

**ವಿಳಂಬಿತ ಮರುಪಡೆಯುವಿಕೆ:** `rateLimitedUntil` ಅವಧಿ ಕಳೆದಾಗ, ಸಂಪರ್ಕವು ಮತ್ತೆ ಅರ್ಹವಾಗುತ್ತದೆ. ಯಶಸ್ವಿ ಬಳಕೆಯಾದಾಗ, `clearAccountError()` ಎಲ್ಲಾ ದೋಷ ಕ್ಷೇತ್ರಗಳನ್ನು ತೆರವುಗೊಳಿಸುತ್ತದೆ.

### Claude OAuth ಬಳಕೆಯ ಮಿತಿ: ಕಡಿಮೆ-ಆದ್ಯತೆಯ ಲೇನ್ + ಸೆಷನ್-ಮಿತಿ ಮರುಹೊಂದಿಕೆ

**ವ್ಯಾಪ್ತಿ:** ಒಂದು Claude subscription (OAuth) ಸಂಪರ್ಕ. ಎರಡೂ ವೈಶಿಷ್ಟ್ಯಗಳು **ಪ್ರತಿ ಸಂಪರ್ಕಕ್ಕೆ ಐಚ್ಛಿಕ** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, ಎರಡೂ ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಆಫ್) ಮತ್ತು Claude Code ನ `/low-priority` ಮತ್ತು `/limit-reset` ಆಜ್ಞೆಗಳನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತವೆ (ವೈರ್ ಒಪ್ಪಂದವನ್ನು Claude Code 2.1.263 ನಿಂದ ದಾಖಲಿಸಲಾಗಿದೆ).

**ಅಮಲು:**

- ಸ್ಥಿತಿ ಯಂತ್ರ + ಪ್ರತಿಕ್ರಿಯೆ ವರ್ಗೀಕರಣ: `open-sse/services/claudeLowPriority.ts`
- ಮರುಹೊಂದಿಕೆ ಸ್ಥಿತಿ/ಕ್ಲೇಮ್ ಕ್ಲೈಂಟ್: `open-sse/services/claudeLimitReset.ts`
- ಎಕ್ಸಿಕ್ಯೂಟರ್ ಹೂಕ್ (ಹೆಡರ್ ಇಂಜೆಕ್ಷನ್ + ಅದೇ ಖಾತೆಯ ಮರುಪ್ರಯತ್ನ): `open-sse/executors/base.ts::execute()`
- ಐಚ್ಛಿಕ ಸ್ಥಿರೀಕರಣ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ಪ್ರಚೋದಕ:** 5-ಗಂಟೆಗಳ ಬಳಕೆ ಮಿತಿ — ಹೆಡರ್ಗಳಲ್ಲಿ
`anthropic-ratelimit-unified-status: rejected` ಮತ್ತು, ಖಾತೆಯು ಅರ್ಹವಾಗಿದ್ದಾಗ,
`anthropic-ratelimit-unified-slow-offer: treatment` ಹೊಂದಿರುವ `429`. ಆ ಮೊದಲ ಮಿತಿ
`429` ಗಿಂತ ಮೊದಲು ಯಾವುದನ್ನೂ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ; unified ಹೆಡರ್ಗಳಿಲ್ಲದ burst 429 ಸಾಮಾನ್ಯ cooldown ಮಾರ್ಗದ ಮೂಲಕ ಸಾಗುತ್ತದೆ.

**ಕಡಿಮೆ-ಆದ್ಯತೆಯ ಲೇನ್** (`lowPriorityMode`):

- ಮಿತಿ 429 ಬಂದಾಗ ಎಕ್ಸಿಕ್ಯೂಟರ್ ಆಫರ್ ಅನ್ನು ಸ್ವೀಕರಿಸಿ, ಅದೇ ಖಾತೆಯೊಂದಿಗೆ ತಕ್ಷಣವೇ ಅದೇ
  ವಿನಂತಿಯನ್ನು `anthropic-usage-limit: slow` ಬಳಸಿ ಮರುಪ್ರಯತ್ನಿಸುತ್ತದೆ; ಘೋಷಿಸಲಾದ
  `anthropic-ratelimit-unified-reset` (+60s grace) ವರೆಗೆ ಲೇನ್ ಸಕ್ರಿಯವಾಗಿರುತ್ತದೆ ಮತ್ತು ಆ ವಿಂಡೋದಲ್ಲಿನ ಪ್ರತಿಯೊಂದು ವಿನಂತಿಯೂ ಈ ಹೆಡರ್ ಅನ್ನು ಹೊಂದಿರುತ್ತದೆ. ಮಧ್ಯಸ್ಥಿಕೆ ಮಾಡಿದ 429 `handleChatCore` ಗೆ ಎಂದಿಗೂ ತಲುಪುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ ಸಂಪರ್ಕವನ್ನು **cooldown ಗೆ ಸೇರಿಸಲಾಗುವುದಿಲ್ಲ ಮತ್ತು ಬೇರೆ ಸಂಪರ್ಕಕ್ಕೆ ತಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ**.
- ನಂತರದ ಪ್ರತಿಕ್ರಿಯೆಗಳಲ್ಲಿನ `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` ಲೇನ್ ಅನ್ನು ಮುಂದುವರಿಸುತ್ತವೆ; `slot_busy` (429) ಅಥವಾ `529` ಸಂದರ್ಭದಲ್ಲಿ ಸರ್ವರ್ನ `anthropic-ratelimit-unified-slow-retry-after` (ಪೂರ್ವನಿಯೋಜಿತ 20s, 5–600s ಮಿತಿಯೊಳಗೆ, ±30% jitter) ವರೆಗೆ ಕಾಯ್ದು ಮರುಪ್ರಯತ್ನಿಸುತ್ತದೆ. ಇದನ್ನು `anthropic-ratelimit-unified-slow-max-wait` (ಪೂರ್ವನಿಯೋಜಿತ 20 min, 1 min–6 h ಮಿತಿಯೊಳಗೆ) ಮಿತಿಗೊಳಿಸುತ್ತದೆ — ಅದನ್ನು ದಾಟಿದಾಗ ಲೇನ್ ಮುಗಿದು, 10-ನಿಮಿಷಗಳ cool-off ಮರುಸ್ವೀಕಾರವನ್ನು ತಡೆಯುತ್ತದೆ. ವಿನಂತಿಯ ಸ್ವಂತ upstream-start timeout (`resolveFetchStartTimeout`, ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ 10 min) ನಲ್ಲಿ ಉಳಿದಿರುವ ಅವಧಿಯಿಂದ 5 s margin ಕಡಿತಗೊಳಿಸಿದ ಮಿತಿಯೂ ಕಾಯುವಿಕೆಗೆ ಅನ್ವಯಿಸುತ್ತದೆ: ಈ ಮಿತಿ ಇಲ್ಲದಿದ್ದರೆ, 20-ನಿಮಿಷಗಳ ಪೂರ್ವನಿಯೋಜಿತ max-wait ವಿನಂತಿಗಿಂತ ದೀರ್ಘವಾಗುತ್ತದೆ ಮತ್ತು ನಿದ್ರೆ ಮಧ್ಯದಲ್ಲೇ ರದ್ದುಗೊಂಡು, graceful `max_wait` ಅಂತ್ಯ + cool-off ಬದಲು `TimeoutError` ಹೊರಹೊಮ್ಮುತ್ತದೆ.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-window rollover, ಅಥವಾ
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ಪಾವತಿಸಿದ overage ಈಗ ಮಿತಿಯನ್ನು ಆವರಿಸುವುದರಿಂದ, ಯಾವುದೇ ಸ್ಥಿತಿಯಲ್ಲೂ ಇದನ್ನು `extra_usage` ಎಂದು ಅಂತ್ಯಗೊಳಿಸುತ್ತದೆ) ಲೇನ್ ಅನ್ನು ಮುಗಿಸುತ್ತವೆ; ನಂತರ ಪ್ರತಿಕ್ರಿಯೆ ಸಾಮಾನ್ಯ cooldown ಮಾರ್ಗದ ಮೂಲಕ ಸಾಗುತ್ತದೆ. `budget_exhausted` ಅನ್ನು ಘೋಷಿಸಲಾದ budget reset ವರೆಗೆ (≤ 8 ದಿನಗಳು) ನೆನಪಿನಲ್ಲಿ ಇಡಲಾಗುತ್ತದೆ.
- ಎಕ್ಸಿಕ್ಯೂಟರ್ನ ಸ್ವಂತ 400-ಚಾಲಿತ intra-attempt ಮರುಪ್ರಯತ್ನಗಳ (context editing, thinking/effort clamps, param auto-learn) ನಂತರ wall check ನಡೆಯುತ್ತದೆ. ಆದ್ದರಿಂದ ಆ ಮರುಪ್ರಯತ್ನಗಳಲ್ಲಿ ಒಂದರಲ್ಲಷ್ಟೇ wall 429 ಕಾಣಿಸಿಕೊಂಡರೂ, ಅದು cooldown ಮಾರ್ಗಕ್ಕೆ ತಲುಪುವ ಬದಲು ಮಧ್ಯಸ್ಥಿಕೆಗೊಳಪಡುತ್ತದೆ.
- ಸ್ಥಿತಿಯು ಪ್ರತಿ ಸಂಪರ್ಕಕ್ಕೆ in-memory ಆಗಿರುತ್ತದೆ (ಮರುಪ್ರಾರಂಭಿಸಿದರೆ ಮರುಸ್ವೀಕರಿಸಲು ಒಂದು ಹೆಚ್ಚುವರಿ wall 429 ಅಗತ್ಯವಾಗುತ್ತದೆ).

**ಸೆಷನ್-ಮಿತಿ ಮರುಹೊಂದಿಕೆ** (`autoLimitReset`, ಎರಡೂ ಆನ್ ಆಗಿದ್ದರೆ ಲೇನ್ಗಿಂತ ಮೊದಲು ಪ್ರಯತ್ನಿಸಲಾಗುತ್ತದೆ):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ಬ್ಲಾಕ್; `arm: "reset"` ಮತ್ತು `available: true` ಆಗಿದ್ದಾಗ,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ಜೊತೆಗೆ
  `{ "program": "juniper_tide" }` (`providerSpecificData.organizationUUID` ನಿಂದ organization UUID, bootstrap fallback).
- `result: reset|not_limited` → ವಿನಂತಿಯನ್ನು ಪೂರ್ಣ ವೇಗದಲ್ಲಿ (slow header ಇಲ್ಲದೆ) ಮರುಪ್ರಯತ್ನಿಸಲಾಗುತ್ತದೆ.
  `already_used` / `not_offered` `next_available_at` ಅನ್ನು (ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಒಂದು ವಾರ) memoise ಮಾಡುತ್ತವೆ; ಯಾವುದೇ ವೈಫಲ್ಯವಾದರೆ 15 ನಿಮಿಷಗಳ backoff ಅನ್ವಯಿಸುತ್ತದೆ. ಮರುಹೊಂದಿಕೆಯನ್ನು ವಾರಕ್ಕೆ ಒಮ್ಮೆ ಮಾತ್ರ ಮಾಡಬಹುದು ಮತ್ತು ಅದು weekly limit ಗೆ ಇನ್ನೂ ಎಣಿಕೆಯಾಗುತ್ತದೆ.

ರಿಗ್ರೆಶನ್ ಗಾರ್ಡ್ಗಳು: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### ಬ್ಯಾಂಕಿನ ಮರುಹೊಂದಿಕೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅನ್ವಯಿಸಿ

**ವ್ಯಾಪ್ತಿ:** Codex ಮತ್ತು Claude ಚಂದಾದಾರಿಕೆ (OAuth) ಸಂಪರ್ಕಗಳು.**ಆಯ್ಕೆ** : `bankedResetAutoApply` ಸೆಟ್ಟಿಂಗ್ ಆಫ್ ಆಗಿದೆ ಮತ್ತು ಡೀಫಾಲ್ಟ್ ಆಗಿ `dry-run` ಮೋಡ್ನಲ್ಲಿದೆ (ಸೆಟ್ಟಿಂಗ್ಗಳು → AI → ಸ್ವಯಂ-ಅನ್ವಯಿಕ ಬ್ಯಾಂಕಿನ ಮರುಹೊಂದಿಕೆಗಳು).

**ಉದ್ದೇಶ:** ಪೂರೈಕೆದಾರರ ಮಿತಿಗಳ ಪುಟದಲ್ಲಿ "ರಿಡೀಮ್" ಅನ್ನು ಒತ್ತಲು ಆಪರೇಟರ್ಗಾಗಿ ಕಾಯುವ ಬದಲು ಖಾತೆಯು ಬಳಕೆಯ ಗೋಡೆಯನ್ನು ಹೊಡೆದಾಗ ಬ್ಯಾಂಕಿನ ಮರುಹೊಂದಿಕೆಗಳನ್ನು ಸ್ವಂತವಾಗಿ ಖರ್ಚು ಮಾಡಿ.

| ಕ್ರೆಡಿಟ್ ಪ್ರಕಾರ (`creditTypes`) | ಏನನ್ನು ರಿಡೀಮ್ ಮಾಡಲಾಗಿದೆ                             | ಅದು ಎಲ್ಲಿ ಓಡುತ್ತದೆ                                    |
| ------------------------------- | --------------------------------------------------- | ----------------------------------------------------- |
| `codexCredits`                  | Codex ಮರುಹೊಂದಿಸುವ ಕ್ರೆಡಿಟ್ಗಳು                       | ಹಿನ್ನೆಲೆ ಕೆಲಸ, ಪ್ರತಿ 60 ಸೆ                            |
| `claudeCredits`                 | Claude ಬ್ಯಾಂಕಿನ ಅನುದಾನಗಳು (`GRANT` ಕ್ರೆಡಿಟ್ಗಳು)     | ಹಿನ್ನೆಲೆ ಕೆಲಸ, ಪ್ರತಿ 60 ಸೆ                            |
| `claudeSessionReset`            | Claude ಸಾಪ್ತಾಹಿಕ ಅಧಿವೇಶನ-ಮಿತಿ ಮರುಹೊಂದಿಸುವಿಕೆ (ಮೇಲೆ) | ಪ್ರತಿ ಖಾತೆಗೆ ಟಾಗಲ್ ಮಾಡುವ ಅದೇ ನೀತಿಯ ಮೂಲಕ ವಿನಂತಿಯ ಮಾರ್ಗ |

**ಅನುಷ್ಠಾನ:**

- ಶುದ್ಧ ನಿರ್ಧಾರ (ಎರಡೂ ಮಾರ್ಗಗಳಿಗೆ ಒಂದು ನಿಯಮವನ್ನು ಹೊಂದಿಸಲಾಗಿದೆ): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- ಹಿನ್ನೆಲೆ ಕೆಲಸ: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` ನಲ್ಲಿ ಪ್ರಾರಂಭವಾಗಿದೆ)
- Claude ವಿನಂತಿ-ಪಾತ್ ಗೇಟ್: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` ನಲ್ಲಿ `setClaudeLimitResetPolicy()` ಮೂಲಕ ನೋಂದಾಯಿಸಲಾಗಿದೆ
- ಇತಿಹಾಸ, ಕ್ಯಾಪ್ಗಳು ಮತ್ತು ವೆಬ್ಹೂಕ್: `src/lib/usage/bankedResetAudit.ts`
- ಇತಿಹಾಸ API: `GET /api/settings/banked-reset-auto/history?limit=50` (ನಿರ್ವಹಣೆ ದೃಢೀಕರಣ)

**ನಿರ್ಧಾರದ ಆದೇಶ** (ಮೊದಲ ವಿಫಲ ನಿಯಮವು ದಾಖಲಾದ ಕಾರಣ):

1. ವೈಶಿಷ್ಟ್ಯ ಆಫ್, ಕ್ರೆಡಿಟ್ ಟೈಪ್ ಆಫ್ ಅಥವಾ ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿರುವ ಖಾತೆ (`accountScope` `all` / `selected` ಜೊತೆಗೆ ಪ್ರತಿ ಖಾತೆಯ `connections` ನಕ್ಷೆ).
2. ಐಚ್ಛಿಕ UTC ವೇಳಾಪಟ್ಟಿಯ ಹೊರಗೆ (`startHourUtc` > `endHourUtc` ಮಧ್ಯರಾತ್ರಿ ದಾಟುತ್ತದೆ).
3. ಕಳೆದ 24 ಗಂಟೆಗಳಲ್ಲಿ ಕ್ಯಾಪ್ಸ್: ಯಾವುದೇ ಎರಡು ರಿಡೆಂಪ್ಶನ್ಗಳ ನಡುವೆ `maxPerAccountPerDay` (1), `maxPerDay` (3), ಮತ್ತು `minSpacingMinutes` (30).
4. ಟ್ರಿಗ್ಗರ್: ಗೋಡೆಯ `session` ಅಥವಾ `weekly` ವಿಂಡೋ ( `getQuotaWindowStatus().reachedThreshold` ನಿಂದ ಓದಿ, `isAccountQuotaExhausted()` ಅಲ್ಲ, ಇದು ಖರ್ಚು ಮಾಡಿದ ಪ್ರತಿ ವಿಂಡೋದೊಂದಿಗೆ ಖಾತೆಯನ್ನು ಮಾತ್ರ ವರದಿ ಮಾಡುತ್ತದೆ), ಅಥವಾ ಕನಿಷ್ಠ `expiringCreditMinUsedPercent` (50) ಅನ್ನು ಬಳಸಿದ ಖಾತೆಯಲ್ಲಿ `expiringCreditHours` (24) ಒಳಗೆ ಮುಕ್ತಾಯಗೊಳ್ಳುವ ಕ್ರೆಡಿಟ್.
5. ನೈಸರ್ಗಿಕ-ಮರುಹೊಂದಿಸುವ ಸಿಬ್ಬಂದಿ: `sessionResetGuardMinutes` (90) ಒಳಗೆ ಗೋಡೆಯ 5-ಗಂಟೆಗಳ ವಿಂಡೋ ಮರುಹೊಂದಿಸಿದಾಗ ಅಥವಾ `weeklyResetGuardHours` (12) ಒಳಗೆ ಗೋಡೆಯ ಸಾಪ್ತಾಹಿಕ ವಿಂಡೋವನ್ನು ಮರುಹೊಂದಿಸಿದಾಗ ಬಿಟ್ಟುಬಿಡಿ.
6. ಸಾಪ್ತಾಹಿಕ ಮಹಡಿ: ಸಾಪ್ತಾಹಿಕ ಉಳಿದವು `weeklyFloorPercent` (10) ಗಿಂತ ಕಡಿಮೆ ಇದ್ದಾಗ 5-ಗಂಟೆಗಳ ಮರುಹೊಂದಿಕೆಯನ್ನು ಬಿಟ್ಟುಬಿಡಿ.
7. `last-resort` ಮೋಡ್: ಒಂದೇ ಪೂರೈಕೆದಾರರ ಮತ್ತೊಂದು ಇನ್-ಸ್ಕೋಪ್ ಖಾತೆಯು ಎರಡೂ ವಿಂಡೋಗಳಲ್ಲಿ ಕನಿಷ್ಠ `poolHeadroomPercent` (10) ಉಳಿದಿರುವಾಗ ಬಿಟ್ಟುಬಿಡಿ. ಎಕ್ಸ್ಪೈರಿಂಗ್-ಕ್ರೆಡಿಟ್ ಟ್ರಿಗ್ಗರ್ಗಳು ಇದನ್ನು ಬೈಪಾಸ್ ಮಾಡುತ್ತದೆ.
8. `dry-run` ಸಾಲನ್ನು ದಾಖಲಿಸುತ್ತದೆ ಮತ್ತು ಏನನ್ನೂ ಪಡೆದುಕೊಳ್ಳುವುದಿಲ್ಲ; `last-resort` ಮತ್ತು `eager` ರಿಡೀಮ್.

ಕಾಣೆಯಾದ ಕೋಟಾ ಡೇಟಾವು ಎಂದಿಗೂ ರಿಡೆಂಪ್ಶನ್ ಅನ್ನು ಅನ್ಲಾಕ್ ಮಾಡುವುದಿಲ್ಲ: ಅಜ್ಞಾತ ಮರುಹೊಂದಿಸುವ ಸಮಯ ಅಥವಾ ಸಾಪ್ತಾಹಿಕ ಬಳಕೆಯ ಸ್ಕಿಪ್ಗಳು.

**Claude ಸೆಷನ್ ರೀಸೆಟ್:** ವೈಶಿಷ್ಟ್ಯವನ್ನು ಆಫ್ ಅಥವಾ `claudeSessionReset` ಆಫ್ನೊಂದಿಗೆ, ಪ್ರತಿ ಖಾತೆಯ `autoLimitReset` ಟಾಗಲ್ ಮೊದಲಿನಂತೆಯೇ ನಿರ್ಧರಿಸುತ್ತದೆ. ಎರಡನ್ನೂ ಆನ್ ಮಾಡಿದಾಗ, ವೈಶಿಷ್ಟ್ಯವು ಪ್ರತಿ ಖಾತೆಯ ಟಾಗಲ್ಗಳನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ: ನೀತಿಯು ಅನುಮತಿಸಿದಾಗ ಮಾತ್ರ ಇನ್-ಸ್ಕೋಪ್ ಖಾತೆಯು ಕ್ಲೈಮ್ ಮಾಡಬಹುದು ಮತ್ತು `dry-run` ಮೋಡ್ನಲ್ಲಿ ಯಾವುದೇ ಕ್ಲೈಮ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ.

**ಸುರಕ್ಷತೆ:** ಉದ್ಯೋಗವು ಪ್ರತಿ ಟಿಕ್ಗೆ ಹೆಚ್ಚೆಂದರೆ ಒಂದು ಕ್ರೆಡಿಟ್ ಅನ್ನು ರಿಡೀಮ್ ಮಾಡುತ್ತದೆ, ಕ್ರೆಡಿಟ್ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುವ ಮೊದಲು ನಿರ್ಧರಿಸುತ್ತದೆ (ಸ್ಕಿಪ್ ಮಾಡಿದ ಖಾತೆಯನ್ನು ಎಂದಿಗೂ ಪಟ್ಟಿ ಮಾಡಲಾಗುವುದಿಲ್ಲ), ಐಡೆಂಪೊಟೆನ್ಸಿ ಕೀಗಳನ್ನು `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ಬಳಸುತ್ತದೆ ಮತ್ತು ವಿಫಲವಾದ ಪಟ್ಟಿ ಅಥವಾ ರಿಡೆಂಪ್ಶನ್ ನಂತರ ಖಾತೆಯನ್ನು 1 ಗಂಟೆಯವರೆಗೆ ಬ್ಯಾಕ್ ಮಾಡುತ್ತದೆ. ಪ್ರತಿ ವಿಮೋಚನೆ, ವೈಫಲ್ಯ ಮತ್ತು ಡ್ರೈ-ರನ್ ನಿರ್ಧಾರವನ್ನು `audit_log` ಗೆ ಬರೆಯಲಾಗುತ್ತದೆ (`action: "bankedReset.redeem"`, ಟೋಕನ್ಗಳು ಅಥವಾ ಕ್ರೆಡಿಟ್ ಐಡಿಗಳಿಲ್ಲ); ಕ್ಯಾಪ್ಗಳನ್ನು ಆ ಸಾಲುಗಳಿಂದ ಎಣಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಅವು ಮರುಪ್ರಾರಂಭಿಸುವಿಕೆಯಿಂದ ಬದುಕುಳಿಯುತ್ತವೆ. ಯಶಸ್ವಿ ವಿಮೋಚನೆಗಳು `provider.reset_redeemed` ವೆಬ್ಹೂಕ್ ಅನ್ನು ಸಹ ಹಾರಿಸುತ್ತವೆ.

ರಿಗ್ರೆಶನ್ ಗಾರ್ಡ್ಗಳು: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### ಸೆಷನ್ ಅಫಿನಿಟಿ (#7274)

**ವ್ಯಾಪ್ತಿ:** ಯಾವುದೇ provider ಗಾಗಿ, ಒಂದು client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) ಅನ್ನು ಒಂದು ಸಂಪರ್ಕಕ್ಕೆ ಪಿನ್ ಮಾಡುವುದು.

**ಉದ್ದೇಶ:** ಬಹು-ತಿರುವಿನ agent (Claude Code, aider, custom agents) ವಿನಂತಿಗಳಾದ್ಯಂತ ಅದೇ ಖಾತೆಯಲ್ಲಿ ಮುಂದುವರಿಯುವಂತೆ ಮಾಡುವುದು. ಇದರಿಂದ cross-account context ನಷ್ಟ ಮತ್ತು ಪ್ರತಿ-ಖಾತೆ session state ಹೊಂದಿರುವ providers ನಲ್ಲಿ ಮರುಕಳಿಸುವ cold-start 429ಗಳು ಕಡಿಮೆಯಾಗುತ್ತವೆ.

**ಅಮಲು:**

- TTL ಪರಿಹಾರ: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ಪಿನ್ ಆಯ್ಕೆ/ರಚನೆ: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ಹೆಡರ್ ಹೊರತೆಗೆಯುವಿಕೆ (generic, ಯಾವುದೇ provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- ಸ್ಥಿರೀಕೃತ ಪಿನ್ ಟೇಬಲ್: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ಸೆಟ್ಟಿಂಗ್: `sessionAffinityTtlMs` (ms ನಲ್ಲಿ global TTL, `0` ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ) — `src/lib/db/settings.ts`. `124_generic_session_affinity_ttl.sql` migration ಮೂಲಕ Codex-only `codexSessionAffinityTtlMs` ನಿಂದ ಮರುಹೆಸರಿಸಲಾಗಿದೆ; ಹಿಂದೆ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ ಯಾವುದೇ Codex TTL ಅನ್ನು ಹೊಸ default ಆಗಿ ಮುಂದುವರಿಸುತ್ತದೆ.

#7274 ಕ್ಕಿಂತ ಮೊದಲು, `resolveSessionAffinityTtlMs()` `codex` ಹೊರತುಪಡಿಸಿ ಪ್ರತಿಯೊಂದು provider ಗಾಗಿ `0` ಗೆ ತಕ್ಷಣವೇ ಮರಳುತ್ತಿತ್ತು. ಆದ್ದರಿಂದ pinning mechanism ಮತ್ತು header extraction ಈಗಾಗಲೇ provider-agnostic ಆಗಿದ್ದರೂ, TTL setting (ಮತ್ತು session headers) ಬೇರೆಡೆ ಯಾವುದೇ ಪರಿಣಾಮ ಬೀರಲಿಲ್ಲ. ಈ ಪರಿಹಾರವು ಆ early-return ಅನ್ನು ತೆಗೆದುಹಾಕಿದೆ; ಈಗ globally `0` ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಮೌಲ್ಯಕ್ಕೆ ಸೆಟ್ ಮಾಡಿದಾಗ TTL ಪ್ರತಿಯೊಂದು provider ಗೆ ಸಮಾನವಾಗಿ ಅನ್ವಯಿಸುತ್ತದೆ.

ಮೂರು session-affinity headers ಗಳನ್ನೂ upstream ಗೆ ಎಂದಿಗೂ ಫಾರ್ವರ್ಡ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ — executors client headers ಅನ್ನು ನೇರವಾಗಿ ಹಾದುಹೋಗಿಸುವ ಬದಲು ತಮ್ಮದೇ upstream headers ಅನ್ನು ಪ್ರಾರಂಭದಿಂದಲೇ ನಿರ್ಮಿಸುತ್ತವೆ. ಆದ್ದರಿಂದ ಇದು internal correlation id ಆಗಿಯೇ ಉಳಿಯುತ್ತದೆ.

### ವಿಶೇಷ ನಿರ್ವಹಿತ ಸೆಷನ್ ಸಂಪರ್ಕ ಲೀಸ್ಗಳು

**ವ್ಯಾಪ್ತಿ:** ಒಂದು ಸಕ್ರಿಯ managed HTTP client/session ಒಂದು ಅರ್ಹ OmniRoute ಸಂಪರ್ಕವನ್ನು ಹೊಂದಿರುತ್ತದೆ.

**ಉದ್ದೇಶ:** ವಿನಂತಿಗಳಾದ್ಯಂತ ಕಠಿಣ ರೂಟಿಂಗ್ ಗಡಿಯನ್ನು ಅಗತ್ಯವಿರುವ ಕ್ಲೈಂಟ್ಗಳಿಗೆ ದೀರ್ಘಕಾಲಿಕ, ಏಕೈಕ ಸಂಪರ್ಕ ಮಾಲೀಕತ್ವವನ್ನು ಒದಗಿಸುವುದು. ಇದು session affinityಗಿಂತ ಭಿನ್ನವಾಗಿದೆ; session affinity ಒಂದು ಮೃದು ನಿರಂತರತಾ ಆದ್ಯತೆಯಾಗಿದೆ:
exclusive lease ಜೀವನಚಕ್ರ ಸ್ಥಿತಿಯನ್ನು SQLiteನಲ್ಲಿ ಉಳಿಸುತ್ತದೆ, ಜಾಗತಿಕ ಸಕ್ರಿಯ-ಮಾಲೀಕ ಮತ್ತು
ಸಕ್ರಿಯ-ಸಂಪರ್ಕ ಏಕೈಕತೆಯನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತದೆ, ಹಾಗೂ provider dispatchಗೆ ಮುನ್ನ ಹಳೆಯ generation ಅನ್ನು
ತಿರಸ್ಕರಿಸುತ್ತದೆ.

ಈ ವೈಶಿಷ್ಟ್ಯವು ಪ್ರತಿ API keyಗೆ opt-in ಆಗಿರುತ್ತದೆ. managed keyಗೆ `lease:exclusive` scope ಮತ್ತು
ಸ್ಪಷ್ಟವಾದ, ಖಾಲಿಯಲ್ಲದ `allowedConnections` ಪಟ್ಟಿಯಿರಬೇಕು. ಯಾವುದೇ HTTP client lifecycle endpoint ಅನ್ನು ಬಳಸಬಹುದು; ಯಾವುದೇ
client ಹೆಸರು, user-agent, provider, OAuth ವಿಧಾನ ಅಥವಾ model ಅಗತ್ಯವಿಲ್ಲ. lease ಒಂದು connectionನ ಮಾಲೀಕತ್ವವನ್ನು ಹೊಂದಿರುತ್ತದೆ,
modelನದ್ದಲ್ಲ; ಆದ್ದರಿಂದ connection ಸಾಮಾನ್ಯವಾಗಿ ಅರ್ಹವಾಗಿರುವವರೆಗೆ model ಬದಲಾವಣೆಯು binding ಅನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ. ಸಾಮಾನ್ಯ
model, quota, health, cooldown ಮತ್ತು allowlist ನಿಯಮಗಳು ಪ್ರಾಮುಖ್ಯತೆಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ಅದೇ generation ಅನ್ನು
ಮತ್ತೊಂದು ಮುಕ್ತ ಅರ್ಹ connectionಗೆ ವರ್ಗಾಯಿಸಬಹುದು.

ಜೀವನಚಕ್ರವು JSON actions `acquire`, `renew` ಮತ್ತು `release`ಗಳೊಂದಿಗೆ `POST /api/v1/session-leases` ಆಗಿದೆ.
Managed inference requests ಅಪಾರದರ್ಶಕ `X-OmniRoute-Lease-Owner` ಮೌಲ್ಯ ಮತ್ತು ನಿಖರವಾದ
`X-OmniRoute-Lease-Generation` ಅನ್ನು ಒದಗಿಸುತ್ತವೆ. owner `vlo_` ನಂತರದ 43 base64url ಅಕ್ಷರಗಳನ್ನು ಬಳಸುತ್ತದೆ; ಅದರ
SHA-256 hash ಮಾತ್ರ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಅಂತಿಮ dispatch fence ಕೂಡ authenticated API key ID ಮತ್ತು
ಸಕ್ರಿಯ connection IDಗೆ binding ಮಾಡುತ್ತದೆ. Lease ನಿಯಂತ್ರಣ headers ಅನ್ನು logs, ಉಳಿಸಿಕೊಳ್ಳಲಾದ request snapshots ಮತ್ತು
upstream executor headersನಿಂದ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.

ಸಾಮಾನ್ಯ routingನಲ್ಲಿ ಅರ್ಹ managed candidates ಇದ್ದರೂ ಪ್ರತಿಯೊಂದು ಮುಕ್ತ candidate ಕೂಡ foreign active leaseನಿಂದ
ಆಕ್ರಮಿತವಾಗಿದ್ದರೆ, OmniRoute HTTP `429`, lease-capacity-unavailable code, capacityಗಾಗಿ ಕಾಯುವ ಸ್ಥಿತಿ ಮತ್ತು
ಮೊದಲ ಸಂಬಂಧಿತ expiryಯಿಂದ ಲೆಕ್ಕಹಾಕಲಾದ ಮಿತಿಯೊಳಗಿನ `Retry-After` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.
ಸಾಮಾನ್ಯವಾಗಿ ಯಾವುದೇ ಅರ್ಹತೆ ಇಲ್ಲದಿರುವುದು lease contention ಅಲ್ಲ ಮತ್ತು ಅದರ ಪ್ರಸ್ತುತ routing error semantics ಅನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ.

ಸಂಬಂಧಿತ mechanisms ಪ್ರತ್ಯೇಕವಾಗಿಯೇ ಉಳಿಯುತ್ತವೆ:

- OAuth session occupancy ಎಂಬುದು OAuth accountsಗಾಗಿ process-local soft distribution ಆಗಿದೆ.
- Account semaphores request-concurrency permits ಅನ್ನು ನೀಡುತ್ತವೆ ಮತ್ತು request ಪೂರ್ಣಗೊಂಡಾಗ ಮುಕ್ತಾಯಗೊಳ್ಳುತ್ತವೆ.
- Exclusive managed session leases ಎಂಬುದು generation fence ಹೊಂದಿರುವ ದೀರ್ಘಕಾಲಿಕ lifecycle ownership ಆಗಿದೆ.

---

## 3. ಮಾದರಿ ಲಾಕ್ಔಟ್

**ವ್ಯಾಪ್ತಿ:** provider + connection + model ಟ್ರಿಪಲ್.

**ಸ್ಥಿತಿಯ ಪ್ರಕಾರ ಪ್ರಮುಖ ವ್ಯಾಪ್ತಿ:** ವಿಫಲವಾದ ಸ್ಥಿತಿಯೇ ಲಾಕ್ಔಟ್ ಯಾವ ಕೀಗೆ ಬರೆಯಬೇಕು ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ
(`open-sse/services/accountFallback/exactModelLock.ts` ನಲ್ಲಿ `resolveLockoutScope()`):

- `429` / `403` / `402` — ಕೋಟಾ ಅಥವಾ ಅರ್ಹತೆಯ ಸಂಕೇತ — **quota family** ಅನ್ನು ಲಾಕ್ ಮಾಡುತ್ತದೆ:
  codex ಗಾಗಿ ಸಂಪೂರ್ಣ `codex` / `spark` ವ್ಯಾಪ್ತಿ (connectionನ ಪ್ರತಿಯೊಂದು `gpt-5*` ಮಾದರಿ), ಇತರ providerಗಳಿಗಾಗಿ `getQuotaScopedModelForProvider()`.
- `404` bare model ಅನ್ನು ಲಾಕ್ ಮಾಡುತ್ತದೆ (`getModelLockKey()` `not_found` ಅನ್ನು ಸಂಕುಚಿತಗೊಳಿಸುತ್ತದೆ).
- ಇತರ ಯಾವುದೇ ಸ್ಥಿತಿ — `5xx` ಸಾರಿಗೆ/ಸರ್ವರ್ ವೈಫಲ್ಯಗಳು ಮತ್ತು quality validationನಿಂದ OmniRoute ಸ್ವತಃ ಸೃಷ್ಟಿಸುವ `502` — **ನಿಖರವಾದ**
  provider/connection/model ಟಪಲ್ ಅನ್ನು ಮಾತ್ರ ಲಾಕ್ ಮಾಡುತ್ತದೆ. ಒಂದು ಮಾದರಿಯಲ್ಲಿನ ಕೆಟ್ಟ stream ಆ accountನ ಕೋಟಾ ಕುರಿತು ಸಾಕ್ಷ್ಯವಲ್ಲ; ಈ ನಿಯಮಕ್ಕಿಂತ ಮೊದಲು
  `codex/gpt-5.6-luna` ನಲ್ಲಿ ಬಂದ ಒಂದು ಖಾಲಿ ಪ್ರತಿಕ್ರಿಯೆಯು ಆ connectionನ ಪ್ರತಿಯೊಂದು `gpt-5*` ಮಾದರಿಯನ್ನು
  2–30 ನಿಮಿಷಗಳವರೆಗೆ (ಹೆಚ್ಚುತ್ತಾ) routingನಿಂದ ತೆಗೆದುಹಾಕುತ್ತಿತ್ತು, ಆದರೆ ಅದರ ಕೋಟಾ ಬದಲಾಗದೆ ಇತ್ತು.
- callerನ ಸ್ಪಷ್ಟವಾದ `scope` ಆಯ್ಕೆಯು ಯಾವಾಗಲೂ ಆದ್ಯತೆ ಪಡೆಯುತ್ತದೆ (Antigravity `"exact"` ಅನ್ನು ಕಳುಹಿಸುತ್ತದೆ).

**ಉದ್ದೇಶ:** ಕೇವಲ ಒಂದು ಮಾದರಿ ಲಭ್ಯವಿಲ್ಲದಿರುವಾಗ ಅಥವಾ ಕೋಟಾ-ಮಿತಿಗೊಳಗಾದಾಗ ಸಂಪೂರ್ಣ connection ಅನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವುದನ್ನು ತಪ್ಪಿಸುವುದು.

**ಉದಾಹರಣೆಗಳು:**

- `429` ಹಿಂತಿರುಗಿಸುವ ಪ್ರತಿ-ಮಾದರಿ ಕೋಟಾ providerಗಳು
- ಒಂದು ಕಾಣೆಯಾದ ಮಾದರಿಗಾಗಿ `404` ಹಿಂತಿರುಗಿಸುವ ಸ್ಥಳೀಯ providerಗಳು
- Provider-ನಿರ್ದಿಷ್ಟ mode/model ಅನುಮತಿ ವೈಫಲ್ಯಗಳು (ಉದಾ., Grok modes)

**ಅನುಷ್ಠಾನ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### ಮಾದರಿ Cooldowns ಡ್ಯಾಶ್ಬೋರ್ಡ್ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ಸಕ್ರಿಯ ಲಾಕ್ಔಟ್ಗಳನ್ನು ಇವುಗಳೊಂದಿಗೆ ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ: provider, connection, model, ಕಾರಣ, expiresAt. Operators ಕಾರ್ಡ್ನಿಂದ ಮಾದರಿಯನ್ನು ಕೈಯಾರೆ ಮರು-ಸಕ್ರಿಯಗೊಳಿಸಬಹುದು.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ಸಕ್ರಿಯ ಲಾಕ್ಔಟ್ಗಳ ಪಟ್ಟಿ
- `DELETE /api/resilience/model-cooldowns` — ಕೈಯಾರೆ ಮರು-ಸಕ್ರಿಯಗೊಳಿಸುವುದು. Body: `{provider, connection, model}`. Auth: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

ತಾತ್ಕಾಲಿಕ ಕಾರಣದಿಂದ routingನಿಂದ ಹೊರಗಿರುವ ಪ್ರತಿಯೊಂದು connectionಗಾಗಿ ಒಂದು ಪುಟ; ಪ್ರತಿಯೊಂದು provider ಪುಟವನ್ನು ತೆರೆಯುವ ಅಗತ್ಯವಿಲ್ಲ. ಇದು connection cooldownಗಳು, model lockoutಗಳು ಮತ್ತು terminal stateಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ, ಅವುಗಳನ್ನು ಪ್ರತಿ connectionಗೆ, ಆಯ್ಕೆಯೊಂದಕ್ಕೆ ಅಥವಾ providerನ ಎಲ್ಲಾ connectionಗಳಿಗೆ ತೆರವುಗೊಳಿಸುತ್ತದೆ ಮತ್ತು ಹೆಚ್ಚು ಹೊಂದಿಸಲಾಗುವ cooldown ನಿಯಮಗಳನ್ನು ಸಂಪಾದಿಸುತ್ತದೆ: `streamStallCooldown.enabled` ಮತ್ತು OAuth / API-key `connectionCooldown` ಮೂಲ cooldown ಹಾಗೂ ಗರಿಷ್ಠ backoff ಹಂತಗಳು (`PATCH /api/resilience` ಮೂಲಕ ಉಳಿಸಲಾಗುತ್ತದೆ). Terminal stateಗಳು (`banned`, `expired`, `credits_exhausted`) ಪಟ್ಟಿಯಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ, ಆದರೆ ಇಲ್ಲಿ ಎಂದಿಗೂ ತೆರವುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ.

ಅದೇ ಪುಟದಲ್ಲಿರುವ **Error cooldown rules** ಕಾರ್ಡ್ operator error ನಿಯಮಗಳನ್ನು (`settings.providerErrorRules`) ಮತ್ತು ಪ್ರತಿ-provider catch-all ಡೀಫಾಲ್ಟ್ಗಳನ್ನು (`settings.providerErrorDefaults`) `PATCH /api/settings` ಮೂಲಕ ಸಂಪಾದಿಸುತ್ತದೆ — ಅವು ಹೇಗೆ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತವೆ ಎಂಬುದಕ್ಕಾಗಿ §7 ಅಡಿಯಲ್ಲಿ "Operator-declared rules" ನೋಡಿ. ಅವಧಿಗಳು Default (ಸ್ಪಷ್ಟವಾದ cooldown ಇಲ್ಲ), 30 min, 1 h, 5 h, 24 h ಅಥವಾ 1 ರಿಂದ 43,200 ನಿಮಿಷಗಳವರೆಗೆ (30 ದಿನಗಳು) ಕಸ್ಟಮ್ ಆಗಿರಬಹುದು.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — ಸ್ಥಿತಿ, ಉಳಿದ cooldown, backoff ಮಟ್ಟ, ಕೊನೆಯ error type ಮತ್ತು model lockoutಗಳೊಂದಿಗೆ connectionಗಳು (credentials ಇಲ್ಲದೆ)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` ಅಥವಾ `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ

### ಲಾಕ್ಔಟ್ settings UI + success-decay recovery (v3.8.23)

Model lockout ಯಾವಾಗಲೂ ಸಕ್ರಿಯವಾಗಿರುವ hardcoded ವರ್ತನೆಯಿಂದ, ತನ್ನದೇ settings ಕಾರ್ಡ್ ಮತ್ತು self-healing recovery ಮಾರ್ಗವನ್ನು ಹೊಂದಿರುವ ಸಂಪೂರ್ಣವಾಗಿ configurable, opt-in ವೈಶಿಷ್ಟ್ಯವಾಗಿ ಬದಲಾಗಿದೆ.

**Settings ಕಾರ್ಡ್:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ಇದು ಮೇಲಿನ read-only `ModelCooldownsCard`ಗಿಂತ **ವಿಭಿನ್ನವಾಗಿದೆ** (ಅದು ಸಕ್ರಿಯ lockoutಗಳನ್ನು ಮಾತ್ರ
_ಪಟ್ಟಿಮಾಡುತ್ತದೆ_) — ಹೊಸ ಕಾರ್ಡ್ _ಪ್ಯಾರಾಮೀಟರ್ಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡುತ್ತದೆ_. ಡೀಫಾಲ್ಟ್ಗಳು `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ನಲ್ಲಿ ಇರುತ್ತವೆ:

| Setting                 | Default                          | Meaning                                                                        |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Master toggle — model lockout ಡೀಫಾಲ್ಟ್ ಆಗಿ **ಆಫ್** ಆಗಿರುತ್ತದೆ.                 |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | model-scoped failure ಎಂದು ಪರಿಗಣಿಸುವ upstream statuses.                         |
| `baseCooldownMs`        | `120_000` (120 s)                | ಮೊದಲ ವೈಫಲ್ಯಕ್ಕೆ ಆರಂಭಿಕ lockout ಅವಧಿ.                                           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ಹೆಚ್ಚಿಸಲಾದ cooldownನ ಗರಿಷ್ಠ ಮಿತಿ.                                              |
| `maxBackoffSteps`       | `10`                             | ಗರಿಷ್ಠ exponential-backoff escalation ಹಂತಗಳು.                                  |
| `useExponentialBackoff` | `true`                           | ಪುನರಾವರ್ತಿತ ವೈಫಲ್ಯಗಳು cooldown ಅನ್ನು exponential ರೀತಿಯಲ್ಲಿ ಹೆಚ್ಚಿಸಬೇಕೇ ಎಂಬುದು. |

Settings ಸಾಮಾನ್ಯ settings store ಮೂಲಕ ಉಳಿಯುತ್ತವೆ ಮತ್ತು resilience settings schema ಮೂಲಕ validate ಆಗುತ್ತವೆ; ಕಾರ್ಡ್
`baseCooldownMs`/`maxCooldownMs` ಅನ್ನು clamp ಮಾಡುತ್ತದೆ (`maxCooldownMs ≥ baseCooldownMs` ಜೊತೆಗೆ) ಮತ್ತು `maxBackoffSteps`ನ್ನೂ clamp ಮಾಡುತ್ತದೆ.

**Success-decay recovery:** recovery ಕೇವಲ timer expiry ಆಧಾರಿತವಲ್ಲ. ಆರೋಗ್ಯಕರ
ಪ್ರತಿಕ್ರಿಯೆಯು ಮಾದರಿಯ failure count ಅನ್ನು ಕ್ರಮೇಣ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ, ಹೀಗಾಗಿ
ಮಧ್ಯಂತರದಲ್ಲಿ ಚೇತರಿಸಿಕೊಂಡ ಮಾದರಿಯ escalation ನಿಲ್ಲುತ್ತದೆ (ಮತ್ತು lockout ತೆರವುಗೊಳ್ಳುತ್ತದೆ)
ಅದರ timer ಮುಗಿಯುವ ಮೊದಲು. ಯಶಸ್ವಿ combo targetನಲ್ಲಿ, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ಅನ್ನು ಕರೆಯುತ್ತದೆ, ಇದು ಸಂಗ್ರಹಿತ
`failureCount` ಅನ್ನು ಅರ್ಧಕ್ಕೆ ಇಳಿಸುತ್ತದೆ (`Math.floor(failureCount / 2)`); ಅದು `0` ತಲುಪಿದಾಗ lockout
entry ಸಂಪೂರ್ಣವಾಗಿ ಅಳಿಸಲಾಗುತ್ತದೆ. ಇದರ counterpart `recordModelLockoutFailure()`
escalation window ಒಳಗಿನ ವೈಫಲ್ಯಗಳಲ್ಲಿ count ಅನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ (ಮತ್ತು cooldown ಅನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ). ಈ success-decay, ಸರಳ timer expiryಗೆ ಹೆಚ್ಚುವರಿಯಾಗಿದೆ —
ಯಾವುದೇ ಒಂದು ಮಾರ್ಗವು ಮಾದರಿಯನ್ನು ಮರು-ಸಕ್ರಿಯಗೊಳಿಸಬಹುದು.

**ಸ್ಥಿತಿ:** ಲಾಕ್ಔಟ್ಗಳನ್ನು **ಮೆಮೊರಿಯಲ್ಲೇ** ಇರಿಸಲಾಗುತ್ತದೆ (ಪ್ರತಿ ಪ್ರಕ್ರಿಯೆಯ `Map`s ನಲ್ಲಿ `ModelLockoutEntry`, ಇವುಗಳನ್ನು
`provider:connectionId:model` ಕೀ ಮೂಲಕ ಗುರುತಿಸಲಾಗುತ್ತದೆ; ನಿಖರ-ಸ್ಕೋಪ್ ಲಾಕ್ಗಳನ್ನು
`provider:connectionId:exact:model` ಕೀ ಮೂಲಕ ಗುರುತಿಸಲಾಗುತ್ತದೆ), ಇವು DB ಯಲ್ಲಿ
ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ — ಮರುಪ್ರಾರಂಭಿಸಿದಾಗ ಅವು ಕಳೆದುಹೋಗುತ್ತವೆ. _ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು_ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ; ಸಕ್ರಿಯ
ಲಾಕ್ಔಟ್ _ಸ್ಥಿತಿ_ ಕ್ಷಣಿಕವಾಗಿರುತ್ತದೆ.

---

## 4. ಕೋಟಾ-ಹಂಚಿಕೆ ಸಮಕಾಲಿಕತೆ ನಿಯಂತ್ರಣ (v3.8.36)

ಚಂದಾದಾರಿಕೆ ಖಾತೆಗಳು (GLM, MiniMax ಇತ್ಯಾದಿ) ಸಾಮಾನ್ಯವಾಗಿ ಕೇವಲ ~1–3 ಸಮಕಾಲಿಕ
ವಿನಂತಿಗಳನ್ನು ಮಾತ್ರ ಸ್ವೀಕರಿಸುತ್ತವೆ; ಮಿತಿಯನ್ನು ಮೀರಿದರೆ 429ಗಳು ಮತ್ತು ಕೂಲ್ಡೌನ್ಗಳು
ಪ್ರಚೋದಿತವಾಗುತ್ತವೆ. **quota-share** (`qtSd/…`) ಕಾಂಬೋಗಳಲ್ಲಿ ಇದು ಇನ್ನಷ್ಟು ತೀವ್ರವಾಗಿರುತ್ತದೆ,
ಏಕೆಂದರೆ ಹಲವಾರು API ಕೀಗಳು ಒಂದೇ ಅಪ್ಸ್ಟ್ರೀಮ್ ಖಾತೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತವೆ. ಹಂಚಿಕೆಯ
ಖಾತೆಗೆ ಪ್ರವಾಹದಂತೆ ವಿನಂತಿಗಳು ಸೇರುವುದನ್ನು ತಡೆಯಲು ಮೂರು ಪದರಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.

### ಪ್ರತಿ-ಕನೆಕ್ಷನ್ ಸಮಕಾಲಿಕತೆ ಮಿತಿ (`max_concurrent`)

ಪ್ರತಿ ಪ್ರೊವೈಡರ್ ಕನೆಕ್ಷನ್ `max_concurrent` ಗರಿಷ್ಠ ಮಿತಿಯನ್ನು ಘೋಷಿಸಬಹುದು
(`provider_connections.max_concurrent`, ಇದನ್ನು ಕನೆಕ್ಷನ್ ಮೋಡಲ್ / API / DB ನಲ್ಲಿ
ಹೊಂದಿಸಲಾಗುತ್ತದೆ). ಯಾವುದೇ ಮಿತಿ ಬೇಡವಾದರೆ ಇದನ್ನು ಖಾಲಿ ಬಿಡಿ. ಕೆಳಗಿನ ಸೀರಿಯಲೈಸೇಶನ್
ಪದರವನ್ನು ನಿಯಂತ್ರಿಸುವ ಏಕೈಕ ಸೆಟ್ಟಿಂಗ್ ಇದಾಗಿದೆ — ಖಾತೆಯ ನಿಜವಾದ ಸಮಕಾಲಿಕತೆಗೆ
ಹೊಂದಿಸಿ (ಉದಾ. GLM ~1, MiniMax ~2).

### ಪ್ರತಿ-ಮಾದರಿ ಸಮಕಾಲಿಕತೆ ಮಿತಿಗಳು (`modelConcurrency`)

ಕನೆಕ್ಷನ್ ತನ್ನ `rateLimitOverrides` ಮ್ಯಾಪ್ನಲ್ಲಿ ನಿಖರವಾದ ಪ್ರತಿ-ಮಾದರಿ ಸಮಕಾಲಿಕತೆ
ಮಿತಿಗಳನ್ನು ಹೆಚ್ಚುವರಿಯಾಗಿ ಘೋಷಿಸಬಹುದು:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

ಇದನ್ನು ಕನೆಕ್ಷನ್ ಮೋಡಲ್ನಲ್ಲಿ (**Rate limit overrides → Per-model
concurrency caps**, ಪ್ರತಿ ಸಾಲಿಗೆ ಒಂದು `model=cap`) ಅಥವಾ ಅದೇ JSON ಆಕಾರದೊಂದಿಗೆ
`PATCH /api/providers/[id]` ಮೂಲಕ ಹೊಂದಿಸಿ. ಮುಖ್ಯ ಅರ್ಥಗಳು:

- **ಕನೆಕ್ಷನ್-ವ್ಯಾಪಿ ಮತ್ತು ಮಾದರಿ-ನಿರ್ದಿಷ್ಟ:** `maxConcurrent` ಹಂಚಿಕೆಯ
  ಕನೆಕ್ಷನ್-ವ್ಯಾಪಿ ಮಿತಿಯಾಗಿಯೇ ಉಳಿಯುತ್ತದೆ. ಎರಡೂ ಅನ್ವಯಿಸಿದಾಗ, ಎರಡೂ ಗೇಟ್ಗಳನ್ನು ಒಂದೇ
  ಕಾಂಪೋಸಿಟ್ ಗೇಟ್ನಲ್ಲಿ ಪರಮಾಣು ರೀತಿಯಲ್ಲಿ ಪಡೆದುಕೊಳ್ಳಲಾಗುತ್ತದೆ
  (`global → provider → account → model`); ಅನ್ವಯಿಸುವ ಮಿತಿಗಳಲ್ಲಿ ಹೆಚ್ಚು ಕಠಿಣವಾದ
  ಮಿತಿಯೇ ಪರಿಣಾಮಕಾರಿ ವರ್ತನೆಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.
- **ನಿಖರ ಮಾದರಿ-ಕೀ ಹೊಂದಾಣಿಕೆ:** ರೂಟಿಂಗ್ ಪರಿಹಾರವಾದ ನಂತರ ಎಕ್ಸಿಕ್ಯೂಟರ್ಗೆ
  ಕಳುಹಿಸಲಾಗುವ ಮಾದರಿ ಸ್ಟ್ರಿಂಗ್ವೇ ಕೀ ಆಗಿರುತ್ತದೆ — ಸಾಮಾನ್ಯವಾಗಿ ಮೂಲ ಅಪ್ಸ್ಟ್ರೀಮ್
  ಮಾದರಿ ID (`glm-5`), ಕ್ಲೈಂಟ್-ಬದಿಯ `provider/model` ಅಲಿಯಾಸ್ ಅಲ್ಲ
  (`zai/glm-5` ಎಂಬುದು `glm-5` ಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ). ಮೌಲ್ಯಗಳು ಧನಾತ್ಮಕ-ಪೂರ್ಣಾಂಕ
  ಸಮಕಾಲಿಕ ವಿನಂತಿ ಮಿತಿಗಳಾಗಿರಬೇಕು.
- **ಸ್ಥಳೀಯ ಕ್ಯೂಯಿಂಗ್, ಯಾವುದೇ ಡಿಸ್ಕವರಿ ಇಲ್ಲ:** ಹೆಚ್ಚುವರಿ ವಿನಂತಿಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ
  ಕ್ಯೂ/ಟೈಮ್ಔಟ್ ಸೆಮ್ಯಾಂಟಿಕ್ಸ್ನೊಂದಿಗೆ ಸ್ಥಳೀಯವಾಗಿ ಸರದಿಯಲ್ಲಿ ಕಾಯುತ್ತವೆ (ಟೈಪ್ ಮಾಡಲಾದ
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ಪ್ರವೇಶ ದೋಷಗಳು). OmniRoute
  ಅಪ್ಸ್ಟ್ರೀಮ್ ನೀತಿಯನ್ನು ಕಂಡುಹಿಡಿಯುವುದಿಲ್ಲ ಅಥವಾ ಊಹಿಸುವುದಿಲ್ಲ — ಆಪರೇಟರ್
  ಕಾನ್ಫಿಗರ್ ಮಾಡಿದ ನಿಖರ ಮಿತಿಗಳನ್ನು ಮಾತ್ರ ಜಾರಿಗೊಳಿಸುತ್ತದೆ. ತುಂಬಿದ ಮಾದರಿ ಗೇಟ್
  ಎಂದಿಗೂ ಪ್ರೊವೈಡರ್ ಅನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವುದಿಲ್ಲ ಮತ್ತು ಶಾಶ್ವತ ಮಾದರಿ ನಿರ್ಬಂಧವನ್ನೂ
  ಸೃಷ್ಟಿಸುವುದಿಲ್ಲ; ಅಪ್ಸ್ಟ್ರೀಮ್ 429/ಕೂಲ್ಡೌನ್/ಫಾಲ್ಬ್ಯಾಕ್ ವರ್ತನೆಯೇ ದೋಷಕ್ಕೆ ಅಂತಿಮ
  ರಕ್ಷಣೆಯಾಗಿರುತ್ತದೆ.
- **ಪ್ರತಿ-ಕನೆಕ್ಷನ್, ಪ್ರತಿ-ಪ್ರೊಸೆಸ್ ವ್ಯಾಪ್ತಿ:** ಮಿತಿಗಳು ಪ್ರತಿ ಡೇಟಾಬೇಸ್ ಕನೆಕ್ಷನ್ಗೆ
  ಅನ್ವಯಿಸುತ್ತವೆ ಮತ್ತು ಮೆಮೊರಿಯಲ್ಲಿ ಹಿಡಿದಿಡಲಾಗುತ್ತವೆ; ಆದ್ದರಿಂದ ಒಂದೇ ಅಪ್ಸ್ಟ್ರೀಮ್
  API ಕೀಯನ್ನು ಮರುಬಳಕೆ ಮಾಡುವ ಎರಡು ಕನೆಕ್ಷನ್ಗಳು ಪರಸ್ಪರ ಸಮನ್ವಯಗೊಳ್ಳುವುದಿಲ್ಲ.
- **ಕಾನ್ಫಿಗರ್ ಮಾಡದಿದ್ದರೆ ಬದಲಾವಣೆ ಇಲ್ಲ:** ಮ್ಯಾಪ್ ಅನ್ನು ಬಿಟ್ಟುಬಿಟ್ಟರೆ (ಅಥವಾ
  ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಕ್ಷೇತ್ರವನ್ನು ಖಾಲಿ ಬಿಟ್ಟರೆ) ಯಾವುದೇ ಮಾದರಿ ಗೇಟ್ ಸೇರ್ಪಡೆಯಾಗುವುದಿಲ್ಲ.
  ಯಾವುದೇ ಸಾರ್ವತ್ರಿಕ ಪ್ರೊವೈಡರ್ ಮಿತಿಯನ್ನು ಪ್ರತಿಪಾದಿಸದ ಉದಾಹರಣೆಯ ಕಾನ್ಫಿಗರೇಶನ್:

```text
glm-5=1
glm-4.7=3
```

### ಕೋಟಾ-ಹಂಚಿಕೆ ವಿನಂತಿ ಸೀರಿಯಲೈಸೇಶನ್

ಕೋಟಾ-ಹಂಚಿಕೆ ಡಿಸ್ಪ್ಯಾಚ್ ಧನಾತ್ಮಕ `max_concurrent` ಘೋಷಿಸಿರುವ ಕನೆಕ್ಷನ್ ಅನ್ನು ಗುರಿಯಾಗಿಸಿಕೊಂಡಾಗ,
ಆ **ಖಾತೆಗೆ** ಹೋಗುವ ಸಮಕಾಲಿಕ ವಿನಂತಿಗಳು ಪ್ರತಿ-ಕನೆಕ್ಷನ್ ಸೆಮಾಫೋರ್
(ಕೀ `qsconn:<connectionId>`) ಮೂಲಕ ಸೀರಿಯಲೈಸ್ ಆಗುತ್ತವೆ: ಹೆಚ್ಚುವರಿ ವಿನಂತಿಗಳು
ಖಾತೆಯ ಮೇಲೆ ಪ್ರವಾಹದಂತೆ ಸೇರುವ ಬದಲು **ಕ್ಯೂನಲ್ಲಿ ಕಾಯುತ್ತವೆ**. ಇದು
**ಫೇಲ್-ಓಪನ್** ಆಗಿದೆ — ತುಂಬಿದ ಕ್ಯೂ ಅಥವಾ ಟೈಮ್ಔಟ್ ಸಂಭವಿಸಿದರೂ ಸ್ಲಾಟ್ ಇಲ್ಲದೆ
ಮುಂದುವರಿಯುತ್ತದೆ; ಡಿಸ್ಪ್ಯಾಚ್ ಮಾಡಬಹುದಾದ ವಿನಂತಿಯನ್ನು ಎಂದಿಗೂ ತಿರಸ್ಕರಿಸುವುದಿಲ್ಲ.
**Settings → Resilience → Quota-share per-connection
concurrency** ನಲ್ಲಿ ಇದನ್ನು ಟಾಗಲ್ ಮಾಡಿ
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ಡೀಫಾಲ್ಟ್
ಆನ್). `max_concurrent` ಮಿತಿ ಇಲ್ಲದಿದ್ದರೆ ವರ್ತನೆ ಬದಲಾಗುವುದಿಲ್ಲ.

> ಕೋಟಾ-ಹಂಚಿಕೆ ರೂಟಿಂಗ್ ಗೇಟ್ (`selectQuotaShareTarget`, DRR + P2C) ಸ್ವತಃ
> ಫೇಲ್-ಓಪನ್ ಆಗಿದ್ದು, ಮಿತಿಯನ್ನು ತಲುಪಿದ ಕನೆಕ್ಷನ್ಗೆ ಕೇವಲ _ಕಡಿಮೆ ಆದ್ಯತೆ_ ನೀಡುತ್ತದೆ —
> ಒಂದೇ-ಕನೆಕ್ಷನ್ ಪೂಲ್ನಲ್ಲಿ ಇದು ಕಠಿಣ ಮಿತಿಯನ್ನು ವಿಧಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ; ಆದ್ದರಿಂದ
> ನಿಜವಾಗಿ ಪ್ರವಾಹವನ್ನು ನಿಯಂತ್ರಿಸುವುದು ಈ ಸೆಮಾಫೋರ್ ಆಗಿದೆ.

### ಕಾಂಬೋ ಕೂಲ್ಡೌನ್-ಅರಿವು ಹೊಂದಿದ ಮರುಪ್ರಯತ್ನ

ಪ್ರತಿ ಕಾಂಬೋ ತಂತ್ರದಲ್ಲಿಯೂ (ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ), SHORT ತಾತ್ಕಾಲಿಕ ಕೂಲ್ಡೌನ್ಗೆ 429
ಉಂಟಾಗುವಂತಿರುವ ವಿನಂತಿಯು 429 ಅನ್ನು ಹಿಂತಿರುಗಿಸುವ ಬದಲು ಕೂಲ್ಡೌನ್ ಮುಗಿಯುವವರೆಗೆ
ಕಾಯುತ್ತದೆ ಮತ್ತು ಮರು-ಡಿಸ್ಪ್ಯಾಚ್ ಆಗುತ್ತದೆ — ಇದು ಬಹು-ಮಾದರಿ ಕಾಂಬೋಗಳಲ್ಲಿ Gemini-ವರ್ಗದ
TPM/RPM ವಿಂಡೋಗಳನ್ನು (~60s retry-after) ಒಳಗೊಂಡಿರುತ್ತದೆ; ಉದಾಹರಣೆಗೆ 2-ಮಾದರಿ
ಕಾಂಬೋದ ಎರಡೂ ಗುರಿಗಳು ಪ್ರತಿ-ಮಾದರಿ ದರ ಮಿತಿಯನ್ನು ತಲುಪಿದಾಗ. ಇದಕ್ಕೆ
**Settings → Resilience** ನಲ್ಲಿರುವ `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) ಮಿತಿಯಾಗಿರುತ್ತದೆ. ಇದು `quota_exhausted` (ಅರ್ಧರಾತ್ರಿವರೆಗೆ
ಲಾಕ್ ಆಗಿರುವ) ಅಥವಾ auth/not-found ಕಾರಣಗಳಿಗಾಗಿ ಎಂದಿಗೂ ಕಾಯುವುದಿಲ್ಲ.

ಕಾಂಬೋ `config.comboCooldownWaitEnabled: false` ಮೂಲಕ ಹೊರಗುಳಿಯಬಹುದು. ಅಕ್ಷರಶಃ
`false` ಮಾತ್ರ ಈ ಹಂಚಿಕೆಯ ಕಾಂಬೋ ಕಾಯುವಿಕೆಗಳನ್ನು (ಡಿಸ್ಪ್ಯಾಚ್ ನಂತರದ ಕೂಲ್ಡೌನ್ ಮತ್ತು
ಡಿಸ್ಪ್ಯಾಚ್-ಪೂರ್ವ ಸರ್ಕ್ಯೂಟ್-ಓಪನ್/ಮಾದರಿ-ಲಾಕ್ ಕಾಯುವಿಕೆಗಳು) ಮತ್ತು ಅವುಗಳ ಕಾಯುವಿಕೆ-ಬಜೆಟ್
ಟೈಮ್ಔಟ್-ಫ್ಲೋರ್ ವಿಸ್ತರಣೆಯನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ. ಇಲ್ಲದಿರುವುದು ಅಥವಾ `true`
ಜಾಗತಿಕ ನೀತಿಯನ್ನು ಉಳಿಸುತ್ತದೆ; ಜಾಗತಿಕವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದ ಕಾಯುವಿಕೆಯನ್ನು `true`
ಸಕ್ರಿಯಗೊಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಸ್ಪಷ್ಟವಾದ `targetTimeoutMs` ಗೆ ಇನ್ನೂ ಆದ್ಯತೆ ಇರುತ್ತದೆ.
ಈ ಹೊರಗುಳಿಯುವಿಕೆ ಪ್ರತ್ಯೇಕ native-Codex turn-pin ಡಿಸ್ಪ್ಯಾಚ್-ಪೂರ್ವ ಕಾಯುವಿಕೆಯನ್ನು
ಬದಲಾಯಿಸುವುದಿಲ್ಲ.

ಇದೇ ಗೇಟ್ ಡಿಸ್ಪ್ಯಾಚ್-ಪೂರ್ವ ಸಂದರ್ಭವನ್ನೂ (#16319) ಒಳಗೊಂಡಿದೆ: ಪ್ರಯತ್ನ ಮಾಡುವ
ಮೊದಲುಲೇ ಕಾಂಬೋದ ಪ್ರತಿಯೊಂದು ಗುರಿಯ ಮಾದರಿಯೂ ಕಿರು ತಾತ್ಕಾಲಿಕ ಲಾಕ್ಔಟ್ನಲ್ಲಿರುವುದರಿಂದ
ಸ್ಕಿಪ್ ಆದಾಗ, ಶೂನ್ಯ-ಪ್ರಯತ್ನ ಮಾರ್ಗವು ಅದೇ ಮಿತಿಗಳ ಅಡಿಯಲ್ಲಿ ಲಾಕ್ಔಟ್ ಮುಗಿಯುವವರೆಗೆ
ಕಾಯುತ್ತದೆ ಮತ್ತು ಮರು-ಡಿಸ್ಪ್ಯಾಚ್ ಮಾಡುತ್ತದೆ; ಸೂಚನೆರಹಿತ
`503 ALL_TARGETS_SKIPPED` ನೀಡುವುದಿಲ್ಲ. ಕಾಯುವಿಕೆಗೆ ಅನುಮತಿ ಇಲ್ಲದಿದ್ದರೆ (ಮಿತಿ,
ಪ್ರಯತ್ನ ಅಥವಾ ಬಜೆಟ್ ಮುಗಿದಿದ್ದರೆ, ಅಥವಾ ವೈಶಿಷ್ಟ್ಯ ಆಫ್ ಆಗಿದ್ದರೆ), ಅಂತಿಮ ಪ್ರತಿಕ್ರಿಯೆಯು
`429 rate_limit_error` ಆಗಿ ಅಪ್ಗ್ರೇಡ್ ಆಗುತ್ತದೆ ಮತ್ತು ಅತಿ ಶೀಘ್ರದ ತಾತ್ಕಾಲಿಕ ಲಾಕ್
ಅವಧಿ ಮುಗಿಯುವ ಸಮಯದಿಂದ `retry_after` / `reset_at` ಅನ್ನು ಹೊಂದಿರುತ್ತದೆ; ಕೋಟಾ, auth
ಮತ್ತು not-found ಲಾಕ್ಗಳು ಸೂಚನೆರಹಿತ 503 ಆಗಿಯೇ ಉಳಿಯುತ್ತವೆ.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. ರಿಕ್ವೆಸ್ಟ್ ಕ್ಯೂ ಅಡ್ಮಿಷನ್ ಕಂಟ್ರೋಲ್ (v3.8.49 · issue #6593)

**ವ್ಯಾಪ್ತಿ**: ಪ್ರತಿ-ಪ್ರೊವೈಡರ್+ಕನೆಕ್ಷನ್ ಸ್ಥಳೀಯ ರೇಟ್-ಲಿಮಿಟ್ ಕ್ಯೂ (`open-sse/services/rateLimitManager.ts`, Bottleneck ಮೂಲಕ ಬೆಂಬಲಿತ), ಮೇಲಿನ ಮೂರು ಕ್ರಮಗಳಿಗಿಂತ ಒಂದು ಪದರ ಕೆಳಗಿನದ್ದು.

**`maxWaitMs` ಕ್ಯೂ ಕಾಯುವಿಕೆಯನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತದೆ; `executionMaxWaitMs` ಎಕ್ಸಿಕ್ಯೂಶನ್ ಅನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತದೆ.** ಈ ಎರಡನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ, ಮತ್ತು ಯಾವುದೂ ಇನ್ನೊಂದಕ್ಕೆ ಪೂರೈಕೆ ನೀಡುವುದಿಲ್ಲ.

`resilienceSettings.requestQueue.maxWaitMs` ಎಂದರೆ **ಕ್ಯೂ-ಕಾಯುವಿಕೆ ಬಜೆಟ್**: ಇದು ಪ್ರೊವೈಡರ್ ಸ್ಲಾಟ್ಗಾಗಿ ಕಾಯುವುದನ್ನು ಮತ್ತು ನಂತರ QUEUED ಸ್ಥಿತಿಯಲ್ಲಿ ಕುಳಿತಿರುವುದನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ, ಮತ್ತು ಜಾಬ್ QUEUED ಸ್ಥಿತಿಯನ್ನು ಬಿಟ್ಟು ಎಕ್ಸಿಕ್ಯೂಟ್ ಆಗಲಾರಂಭಿಸಿದ ಕ್ಷಣವೇ ಅದರ ಟೈಮರ್ ತೆರವುಗೊಳ್ಳುತ್ತದೆ (`rateLimitManager.ts`, `wrappedFn`). ಇದನ್ನು ಮೀರಿದ ರಿಕ್ವೆಸ್ಟ್ ಎಂದಿಗೂ ಅಪ್ಸ್ಟ್ರೀಮ್ ತಲುಪುವುದಿಲ್ಲ. ಡೀಫಾಲ್ಟ್ 30000ms, ಇದನ್ನು `src/lib/resilience/settings.ts` ನಲ್ಲಿ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ಪೂರೈಸುತ್ತದೆ ಮತ್ತು `tests/unit/ratelimit-admission-control-6593.test.ts` ಪಿನ್ ಮಾಡುತ್ತದೆ — ಆದ್ದರಿಂದ ಇದನ್ನು ಬದಲಾಯಿಸಿದರೆ ಆ ಟೆಸ್ಟ್ ಕೆಂಪಾಗುತ್ತದೆ, ಈ ಪ್ಯಾರಾಗ್ರಾಫ್ ಮೌನವಾಗಿ ಹಳೆಯದಾಗಿ ಉಳಿಯುವುದಿಲ್ಲ.

`resilienceSettings.requestQueue.executionMaxWaitMs` ಅನ್ನು Bottleneck ಜಾಬ್ `expiration` ಆಗಿ ಸ್ವೀಕರಿಸುತ್ತದೆ, ಇದರ ಟೈಮರ್ ಡಿಸ್ಪ್ಯಾಚ್ ನಂತರ ಮಾತ್ರ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ತಮ್ಮದೇ ಆದ ಅಪ್ಸ್ಟ್ರೀಮ್ ಟೈಮ್ಔಟ್ ಇಲ್ಲದ ಎಕ್ಸಿಕ್ಯೂಟರ್ಗಳಿಗೆ ಇದು ಬ್ಯಾಕ್ಸ್ಟಾಪ್ ಆಗಿದೆ, ಮತ್ತು ಎಕ್ಸಿಕ್ಯೂಟರ್ನ ಸ್ವಂತ fetch-start ಟೈಮ್ಔಟ್ ಇದಕ್ಕಿಂತ ಉದ್ದವಾಗಿದ್ದಾಗ ಅದರ ಮಟ್ಟಕ್ಕೆ ಏರಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಇದು ಆರೋಗ್ಯಕರ ಇನ್-ಫ್ಲೈಟ್ ರೆಸ್ಪಾನ್ಸ್ ಅನ್ನು ಕತ್ತರಿಸುವುದಿಲ್ಲ. ಡೀಫಾಲ್ಟ್ 600000ms (10 ನಿಮಿಷ).

ಕ್ಯೂ ಬಜೆಟ್ ಅನ್ನು `expiration` ಗೆ ಪೂರೈಸುವುದೇ ಹಿಂದೆ ನಾನ್-ಇಂಕ್ರಿಮೆಂಟಲ್ ಗೇಟ್ವೇಗಳನ್ನು ಮಿಡ್-ಫ್ಲೈಟ್ನಲ್ಲಿ ಕೊಲ್ಲುತ್ತಿದ್ದದ್ದು — ಅವು ಮೊದಲ ಬೈಟ್ಗಳಿಗೆ ಮೊದಲು ನಿಮಿಷಗಳ ಕಾಲ ಕಾನೂನುಬದ್ಧವಾಗಿ ರನ್ ಆಗುತ್ತವೆ — ಮತ್ತು ಅದಕ್ಕಾಗಿಯೇ expiration ಅನ್ನು `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ಆಗಿ ಮೇಲ್ಮೈಗೆ ತರಲಾಗುತ್ತದೆ, ಆದರೆ ಕ್ಯೂ ಬಜೆಟ್ ಕ್ಯೂ-ಟೈಮ್ಔಟ್ ಕೋಡ್ ಅನ್ನು ಹೊಂದಿರುತ್ತದೆ. ಎರಡನ್ನೂ `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ಅಥವಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್ (**Settings → Resilience**) ಮೂಲಕ ಓವರ್ರೈಡ್ ಮಾಡಬಹುದು. ಎರಡನ್ನೂ ನಾರ್ಮಲೈಜ್ ಮಾಡಿದಾಗ 1ms–24h ಗೆ ಕ್ಲಾಂಪ್ ಮಾಡಲಾಗುತ್ತದೆ.

**ಎರಡಕ್ಕೂ ಆದ್ಯತೆ:** env var ಕೇವಲ _ಡೀಫಾಲ್ಟ್_ ಅನ್ನು ಪೂರೈಸುತ್ತದೆ. `resilienceSettings.requestQueue` ನಲ್ಲಿ ಪರ್ಸಿಸ್ಟ್ ಮಾಡಲಾದ ಮೌಲ್ಯ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ / API patch, `key_value` ನಲ್ಲಿ ಸಂಗ್ರಹ) ಅದನ್ನು ಗೆಲ್ಲುತ್ತದೆ, ಮತ್ತು ಪ್ರತಿ-ಕನೆಕ್ಷನ್ `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ಅದನ್ನೂ ಗೆಲ್ಲುತ್ತದೆ. ಆದ್ದರಿಂದ ಈಗಾಗಲೇ ಪರ್ಸಿಸ್ಟ್ ಮಾಡಲಾದ ಮೌಲ್ಯವಿರುವ ಡಿಪ್ಲಾಯ್ಮೆಂಟ್ನಲ್ಲಿ env var ಹೊಂದಿಸಿದರೆ ಏನೂ ಬದಲಾಗುವುದಿಲ್ಲ — ಬದಲಿಗೆ ಪರ್ಸಿಸ್ಟ್ ಮಾಡಲಾದ ಸೆಟ್ಟಿಂಗ್ ಅನ್ನು ತೆರವುಗೊಳಿಸಿ ಅಥವಾ ಅಪ್ಡೇಟ್ ಮಾಡಿ.

ಕ್ಯೂ ನಿವಾಸ ಅವಧಿಯನ್ನು `maxWaitMs` ಮಿತಿಗೊಳಿಸುತ್ತದೆ; ಕೆಳಗಿನ `maxQueueDepth` ಒಮ್ಮೆ ಎಷ್ಟು ಕಾಲರ್ಗಳು ಕ್ಯೂನಲ್ಲಿರಬಹುದು ಎಂಬುದನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತದೆ.

**ಬಾಡಿ-ಸೂಚಿತ ರಿಟ್ರೈಗಳು: ಪೇಸಿಂಗ್ vs ಲಾಕ್ಔಟ್.** 429 ಬಾಡಿ ತನ್ನದೇ ಕಾಯುವಿಕೆಯನ್ನು ಹೆಸರಿಸಬಹುದು (Gemini `RetryInfo.retryDelay`, "retry after Ns" ಪಠ್ಯ), ಇದನ್ನು `updateFromResponseBody` ಓದುತ್ತದೆ. ಕನೆಕ್ಷನ್ನ `maxWaitMs` ಗೆ ಹೊಂದುವ ಕಾಯುವಿಕೆ ಪೇಸಿಂಗ್ ಆಗಿದೆ: ಲಿಮಿಟರ್ ಆ ಅವಧಿಗೆ ತನ್ನ ರಿಸರ್ವಾಯರ್ ಅನ್ನು ಖಾಲಿ ಮಾಡುತ್ತದೆ ಮತ್ತು ಅದು ಮತ್ತೆ ತುಂಬಿದಾಗ ಕ್ಯೂನಲ್ಲಿರುವ ಕಾಲ್ಗಳು ಡಿಸ್ಪ್ಯಾಚ್ ಆಗುತ್ತವೆ. `maxWaitMs` ಗಿಂತ ಉದ್ದವಾದ ಕಾಯುವಿಕೆಯನ್ನು ಕ್ಯೂ ಕುಳಿತು ಕಾಯಲು ಸಾಧ್ಯವಿಲ್ಲ — Gemini ಖಾಲಿಯಾದ ದೈನಂದಿನ ಕೋಟಾಕ್ಕೆ `retryDelay: "86399s"` ನೊಂದಿಗೆ ಉತ್ತರಿಸುತ್ತದೆ. ಮರುನಿರ್ಮಿತ 429 ರ ಮೇಲಿನ ರಿಲೇ ಆಗಿರುವ `Retry-After` (#16528) ಈಗಾಗಲೇ ಫಾಲ್ಬ್ಯಾಕ್ ಎಂಜಿನ್ ಆ ವಿಂಡೋಗೆ ಮಾಡೆಲ್ ಅನ್ನು ಲಾಕ್ ಮಾಡುವಂತೆ ಮಾಡುತ್ತದೆ, ಆದರೆ ಅದಕ್ಕಾಗಿ ಲಿಮಿಟರ್ ಅನ್ನೂ ಪಾಜ್ ಮಾಡುವುದು ಕೀಯನ್ನು ಮುಂಚಿತವಾಗಿ ತಲುಪುವ ಯಾವುದೇ ಕಾಲ್ ಅನ್ನು (ಉದಾಹರಣೆಗೆ ರೆಸಿಲಿಯನ್ಸ್ ರಿಸೆಟ್ ನಂತರ) ಇಡೀ `maxWaitMs` ಅವಧಿಗೆ ನಿಲ್ಲಿಸುತ್ತದೆ. ಅಂಥ ಕಾಯುವಿಕೆ ಟೈಪ್ಡ್ Google `RetryInfo` ವಿವರದಿಂದ (`google_rpc_retry_info` ಪ್ರೊವೆನೆನ್ಸ್) ಬಂದಾಗ ಮತ್ತು ಕೀಯ ಲಿಮಿಟರ್ ಈಗಾಗಲೇ ಮಾಡೆಲ್ಗೆ ಸ್ಕೋಪ್ ಆಗಿದ್ದಾಗ (`getLimiterKey` ನೋಡಿ), 429 ಬದಲಿಗೆ ಆ ಕನೆಕ್ಷನ್ನಲ್ಲಿ ಮಾಡೆಲ್ ಲಾಕ್ಔಟ್ ಆಗುತ್ತದೆ (`open-sse/services/rateLimitManager/bodyRetryPause.ts` ನಲ್ಲಿರುವ `lockModelForLongBodyRetry`, 24h ಗೆ ಕ್ಯಾಪ್), ಮತ್ತು ಲಿಮಿಟರ್ ಅನ್ನು ಪಾಜ್ ಮಾಡದೆ ಬಿಡಲಾಗುತ್ತದೆ. ಅಕೌಂಟ್ ಸಿಲೆಕ್ಷನ್ ಆ ಲಾಕ್ ಮೂಲಕ `isModelLocked()` ನಿಂದ ಸ್ಕಿಪ್ ಆಗುತ್ತದೆ, ಮತ್ತು ಕನೆಕ್ಷನ್ಗೆ ಪಿನ್ ಆದ ಟಾರ್ಗೆಟ್ಗಳಿಗಾಗಿ ಕಾಂಬೊ ಪ್ರಿ-ಡಿಸ್ಪ್ಯಾಚ್ ಗೇಟ್ ಕೂಡ ಹಾಗೆಯೇ ಸ್ಕಿಪ್ ಆಗುತ್ತದೆ. antigravity ನಲ್ಲಿ, ಅದರ ಲಿಮಿಟರ್ ಪ್ರತಿ ಕೋಟಾ ಕುಟುಂಬಕ್ಕೆ ಇರುವುದರಿಂದ, ಲಾಕ್ ನಿಖರವಾದ ಮಾಡೆಲ್ ಮೇಲಿರುತ್ತದೆ — ಅದರ ಇತರ ಕೋಟಾ ಲಾಕ್ಗಳಂತೆಯೇ. ಅಲಿಯಾಸ್ ಅದನ್ನು ಆ ಮಾಡೆಲ್ಗೆ ರಿಸಾಲ್ವ್ ಮಾಡಿದಾಗ ಕ್ಲಯಂಟ್ ಕೇಳಿದ ಹೆಸರನ್ನೂ ಲಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ, ಏಕೆಂದರೆ ಆ ಚೆಕ್ಗಳು ರಿಕ್ವೆಸ್ಟ್ ಮಾಡಲಾದ ಹೆಸರನ್ನು ಬಳಸುತ್ತವೆ; ಅದನ್ನು ನಿಖರವಾಗಿ ಲಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ (`lockExactModel`), ಆದ್ದರಿಂದ antigravity ಕೋಟಾ ಕುಟುಂಬವನ್ನೋ ಅಥವಾ codex ಸ್ಕೋಪ್ ಅನ್ನೋ ದಾಟುವ ಅಲಿಯಾಸ್ ಎಂದಿಗೂ ತನ್ನದನ್ನೇ ಲಾಕ್ ಮಾಡುವುದಿಲ್ಲ. ಪ್ರೋಸ್ ಹಿಂಟ್, ಟೈಪ್ ಮಾಡದ `retryDelay`, ಅಥವಾ ಇಡೀ ಕನೆಕ್ಷನ್ನಿಂದ ಹಂಚಿಕೊಂಡ ಲಿಮಿಟರ್ ಪಾಜ್ ಅನ್ನು ಉಳಿಸುತ್ತದೆ. 429 ಪಾತ್ ಈಗಷ್ಟೇ ಮರುನಿರ್ಮಿಸಿದ ಲಿಮಿಟರ್ ಪಾಜ್ ಆದಾಗ, ಉಳಿದ ಕ್ಯೂ ಸಮಯವು ಪಾಜ್ ಮುಗಿಯುವ ಮೊದಲೇ ಮುಗಿಯುವ ಕಾಲರ್ ಅನ್ನು ಕೂಡಲೇ ಕ್ಯೂ-ಟೈಮ್ಔಟ್ ಕೋಡ್ನೊಂದಿಗೆ (`checkLimiterPause`) ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ — ಆ ಸಮಯವನ್ನು ಕಾಯುವ ಬದಲು; ದಾಖಲಾದ ಅಂತ್ಯವನ್ನು ಲಿಮಿಟರ್ ನಿರ್ಮಾಣಕ್ಕೆ ಮೊದಲು ಆಂಕರ್ ಮಾಡಲಾಗುತ್ತದೆ, ಅಲ್ಲಿ Bottleneck ತನ್ನ ರಿಫ್ರೆಶ್ ಕ್ಲಾಕ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತದೆ, ಮತ್ತು ರಿಸರ್ವಾಯರ್ಗೆ ನಂತರದ ಯಾವುದೇ ಬದಲಾವಣೆ ಅದನ್ನು ಮರೆತುಬಿಡುತ್ತದೆ. `tests/unit/rate-limit-long-body-retry-lockout.test.ts` ಮತ್ತು `tests/unit/rate-limit-body-retry-pause.test.ts` ಮೂಲಕ ಕವರ್ ಆಗಿದೆ.

**`maxQueueDepth` — ಆಪ್ಟ್-ಇನ್ ಅಡ್ಮಿಷನ್ ಕ್ಯಾಪ್ (ಹೊಸದು).** `resilienceSettings.requestQueue.maxQueueDepth` ಒಂದು ಪ್ರೊವೈಡರ್+ಕನೆಕ್ಷನ್ಗೆ ಒಮ್ಮೆ ಎಷ್ಟು ರಿಕ್ವೆಸ್ಟ್ಗಳು ಕ್ಯೂನಲ್ಲಿ ಕುಳಿತಿರಬಹುದು (ಇನ್ನೂ ಡಿಸ್ಪ್ಯಾಚ್ ಆಗಿಲ್ಲದಿರುವವು) ಎಂಬುದನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತದೆ. ಕ್ಯೂ ಈಗಾಗಲೇ `maxQueueDepth` ರಿಕ್ವೆಸ್ಟ್ಗಳನ್ನು ಹೊಂದಿದ್ದಾಗ, ಹೊಸ ರಿಕ್ವೆಸ್ಟ್ `limiter.schedule()` ಅನ್ನು ತಲುಪುವ **ಮೊದಲೇ** ಟೈಪ್ಡ್ `code: "RATE_LIMIT_QUEUE_FULL"` ಎರರ್ನೊಂದಿಗೆ ಫಾಸ್ಟ್-ರಿಜೆಕ್ಟ್ ಆಗುತ್ತದೆ — ಆದ್ದರಿಂದ ತಿರಸ್ಕಾರವು ಅಗ್ಗದಾಗಿದ್ದು, ಆ ರಿಕ್ವೆಸ್ಟ್ಗಾಗಿ ಯಾವುದೇ ಡೌನ್ಸ್ಟ್ರೀಮ್ ಪ್ರಾಂಪ್ಟ್-ಕಂಪ್ರೆಶನ್ / ಟ್ರಾನ್ಸ್ಲೇಶನ್ ಕೆಲಸಕ್ಕಿಂತ ಮೊದಲು ನಡೆಯುತ್ತದೆ. ಡೀಫಾಲ್ಟ್ `0` = ಡಿಸೇಬಲ್ಡ್, ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಅನ್ಬೌಂಡಡ್-ಕ್ಯೂ ಬಿಹೇವಿಯರ್ ಅನ್ನು ಉಳಿಸುತ್ತದೆ; 0–100000 ಗೆ ಬೌಂಡ್ ಮಾಡಲಾಗಿದೆ. `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ಅಥವಾ `resilienceSettings.requestQueue.maxQueueDepth` (ಡ್ಯಾಶ್ಬೋರ್ಡ್/API patch) ಮೂಲಕ ಓವರ್ರೈಡ್ ಮಾಡಬಹುದು.

ಅಡ್ಮಿಷನ್ ಚೆಕ್ ಸ್ವತಃ ಒಂದು ಪ್ಯೂರ್ ಫಂಕ್ಷನ್ ಆಗಿದೆ (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), ಆದ್ದರಿಂದ ನಿಜವಾದ Bottleneck ಲಿಮಿಟರ್ ಇಲ್ಲದೆಯೂ ಅದನ್ನು ಯುನಿಟ್-ಟೆಸ್ಟ್ ಮಾಡಬಹುದು.

> #6593 ಅನ್ನು ತೆರೆದ RFC, `bypassCompressionOnRateLimit`
> ಫ್ಲ್ಯಾಗ್ ಅನ್ನೂ ಪ್ರಸ್ತಾಪಿಸಿತ್ತು. ಈ repo ಯ `open-sse/services/compression/` ಪೈಪ್ಲೈನ್
> ಹೊರಹೋಗುವ LLM ವಿನಂತಿಯ ಮೇಲಿನ ಪ್ರಾಂಪ್ಟ್/ಕಾಂಟೆಕ್ಸ್ಟ್ ಸಂಕುಚನವಾಗಿದೆ (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ಬ್ಲಾಕ್ನ ಆಸುಪಾಸಿನಲ್ಲಿ),
> ಸಂಶ್ಲೇಷಿತ 429 ಬಾಡಿಗಳ ಮೇಲಿನ HTTP ಪ್ರತಿಕ್ರಿಯೆ ಸಂಕುಚನವಲ್ಲ — ನೇರವಾದ bypass ಫ್ಲ್ಯಾಗ್ಗೆ
> ಹೊಂದುವ ಯಾವುದೇ ಕೋಡ್ ಪಥವಿಲ್ಲ. ಆ ಪ್ರಾಂಪ್ಟ್-ಸಂಕುಚನ ಹಂತವು ಪ್ರಸ್ತುತ ವಿನಂತಿ ಪೈಪ್ಲೈನ್ನಲ್ಲಿ
> `withRateLimit()` ಗಿಂತ _ಮೊದಲು_ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಕ್ಯೂ-ತುಂಬಿದೆ ಎಂಬ ನಿರಾಕರಣೆಯ
> ಸಂದರ್ಭದಲ್ಲಿ ಅದನ್ನು ಬಿಟ್ಟುಬಿಡಲು ಕ್ರಮವನ್ನು ಬದಲಿಸುವುದು ಈ ಸಮಸ್ಯೆಯ ವ್ಯಾಪ್ತಿಗಿಂತ ಪ್ರತ್ಯೇಕವಾದ,
> ದೊಡ್ಡ ಬದಲಾವಣೆಯಾಗಿದೆ; ಇದನ್ನು ಇಲ್ಲಿ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ **ಅನುಷ್ಠಾನಗೊಳಿಸಲಾಗಿಲ್ಲ** ಮತ್ತು CPU
> ಉಳಿತಾಯದ ಲಾಭವು ಕ್ರಮ ಬದಲಾವಣೆಯ ಅಪಾಯಕ್ಕೆ ತಕ್ಕದ್ದಾಗಿದ್ದರೆ, ಅದನ್ನು ಅನುಸರಣಾ ಕಾರ್ಯವಾಗಿ ಬಿಡಲಾಗಿದೆ.

### ದರ-ಮಿತಿ ಸ್ವಯಂ-ಸಕ್ರಿಯಗೊಳಿಸುವ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಸಂಪರ್ಕ ರಕ್ಷಣೆ (`rateLimitProtection`)

**ಸ್ವಯಂ-ಸಕ್ರಿಯಗೊಳಿಸುವ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ಡೀಫಾಲ್ಟ್ `true`):
ಡೀಫಾಲ್ಟ್ ಆಗಿ, OmniRoute ಎಲ್ಲಾ ಸಕ್ರಿಯ API-key ಪೂರೈಕೆದಾರರ ಸಂಪರ್ಕಗಳಿಗೆ (`getProviderCategory(provider) === "apikey"`) ದರ-ಮಿತಿ ಕ್ಯೂ ರಕ್ಷಣೆಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ. ಇದು ದರಕ್ಕೆ ಸೂಕ್ಷ್ಮವಾಗಿರುವ ಅಪ್ಸ್ಟ್ರೀಮ್ API ಕೀಗಳಿಗೆ ಬರುವ ವಿನಂತಿಗಳು ಅಪ್ಸ್ಟ್ರೀಮ್ 429 ದೋಷಗಳಾಗಿ ಏಕಾಏಕಿ ಹೆಚ್ಚಾಗುವ ಬದಲು Bottleneck ಮೂಲಕ ಕ್ಯೂಗೆ ಸೇರಿಸಲ್ಪಟ್ಟು ನಿಯಂತ್ರಿಸಲ್ಪಡುವುದನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. `RATE_LIMIT_AUTO_ENABLE` ಪರಿಸರ ಚರದ ಮೂಲಕ ಈ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆಯನ್ನು ಅತಿಕ್ರಮಿಸಬಹುದು (`false`/`0`/`off` ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ, `true`/`1`/`on` ಬಲವಂತವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ); ಇದು ಉಳಿಸಲಾದ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಟ್ಟಿಂಗ್ಗಿಂತ (**Settings → Resilience** / `PATCH /api/resilience`) ಆದ್ಯತೆ ಪಡೆಯುತ್ತದೆ.

**ಪ್ರತಿ-ಸಂಪರ್ಕದ `rateLimitProtection` ನ ಅರ್ಥವ್ಯಾಪ್ತಿ:**
ಪೂರೈಕೆದಾರರ ಸಂಪರ್ಕಗಳಲ್ಲಿನ `rateLimitProtection` ಬೂಲಿಯನ್ ಕ್ಷೇತ್ರದ ಮೂಲಕ ಪ್ರತಿ-ಸಂಪರ್ಕದ ದರ-ಮಿತಿ ರಕ್ಷಣೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ (SQLite ನಲ್ಲಿ `rate_limit_protection` ಆಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ):

- **ಸ್ಪಷ್ಟವಾಗಿ ಆನ್ (`rateLimitProtection === true`)**: ಪೂರೈಕೆದಾರರ ವರ್ಗ ಅಥವಾ ಸ್ವಯಂ-ಸಕ್ರಿಯಗೊಳಿಸುವ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆ ಆನ್ ಆಗಿದೆಯೇ ಎಂಬುದನ್ನು ಲೆಕ್ಕಿಸದೆ, ಈ ಸಂಪರ್ಕಕ್ಕೆ ದರ-ಮಿತಿ ರಕ್ಷಣೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತದೆ.
- **ಸ್ಪಷ್ಟವಾಗಿ ಆಫ್ (`rateLimitProtection === false`)**: ಸ್ಪಷ್ಟ ರಕ್ಷಣೆಯನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ, ಆದರೆ ಸಕ್ರಿಯ API-key ಸಂಪರ್ಕವನ್ನು ಜಾಗತಿಕ ಸ್ವಯಂ-ಸಕ್ರಿಯಗೊಳಿಸುವ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆಯಿಂದ **ಹೊರಗಿಡುವುದಿಲ್ಲ**. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) ನಲ್ಲಿ `false` ಮತ್ತು `undefined` ಸಮಾನವಾಗಿವೆ: `rateLimitProtection === true` ಅನ್ನು ಮಾತ್ರ ಸ್ಪಷ್ಟ ಅತಿಕ್ರಮಣವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. `rateLimitProtection` `false` ಆಗಿದ್ದರೆ (ಅಥವಾ ಹೊಂದಿಸದಿದ್ದರೆ), ಸಕ್ರಿಯ API-key ಸಂಪರ್ಕವು ಇನ್ನೂ ಸ್ವಯಂ-ಸಕ್ರಿಯಗೊಳಿಸುವ ಷರತ್ತಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ ಮತ್ತು ದರ-ಮಿತಿ ರಕ್ಷಣೆಯ ಅಡಿಯಲ್ಲೇ ಉಳಿಯುತ್ತದೆ.
- **ಪ್ರತಿ-ಸಂಪರ್ಕದ ಹೊರಗುಳಿಯುವಿಕೆ ಇಲ್ಲ**: ಇತರ ಸಂಪರ್ಕಗಳಿಗೆ ಸ್ವಯಂ-ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆಯನ್ನು ಚಾಲ್ತಿಯಲ್ಲಿಟ್ಟುಕೊಂಡೇ, "ಈ ಒಂದು ಸಕ್ರಿಯ API-key ಸಂಪರ್ಕವು ದರ-ಮಿತಿ ಕ್ಯೂ ರಕ್ಷಣೆಯಿಲ್ಲದೆ ಕಾರ್ಯನಿರ್ವಹಿಸಬೇಕು" ಎಂದು ಆಪರೇಟರ್ ಪ್ರಸ್ತುತ ಸೂಚಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. API-key ಸಂಪರ್ಕಗಳನ್ನು ದರ-ಮಿತಿ ಕ್ಯೂಗಳಿಲ್ಲದೆ ಸಂಪೂರ್ಣವಾಗಿ ಚಲಾಯಿಸಲು, ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆಯನ್ನು ಜಾಗತಿಕವಾಗಿ ಆಫ್ ಮಾಡಬೇಕು (`RATE_LIMIT_AUTO_ENABLE=false` ಅಥವಾ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**ಬೆಂಬಲಿತ ಬರವಣಿಗೆ ಪಥಗಳು:**

- **`POST /api/rate-limits`**: ಸಂಪರ್ಕಕ್ಕಾಗಿ `rateLimitProtection` ಅನ್ನು ಟಾಗಲ್ ಮಾಡಲು ಬೆಂಬಲಿತ ನಿರ್ವಹಣಾ ಬರವಣಿಗೆ ಪಥ (`{ connectionId: string, enabled: boolean }`). ಇದನ್ನು `enabled: true` ಜೊತೆಗೆ ಕರೆ ಮಾಡುವುದರಿಂದ ಸ್ಪಷ್ಟ ರಕ್ಷಣೆ ಆನ್ ಆಗುತ್ತದೆ; `enabled: false` ಜೊತೆಗೆ ಕರೆ ಮಾಡುವುದರಿಂದ ಸ್ಪಷ್ಟ ರಕ್ಷಣೆ ತೆಗೆದುಹಾಕಲ್ಪಡುತ್ತದೆ (ಆದರೂ ಸ್ವಯಂ-ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ ಆನ್ ಆಗಿದ್ದರೆ, ಸಕ್ರಿಯ API-key ಸಂಪರ್ಕಗಳು ಜಾಗತಿಕ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆಯ ಅಡಿಯಲ್ಲೇ ಉಳಿಯುತ್ತವೆ).
- **`PUT /api/providers/[id]`**: ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ `rateLimitProtection` ಅನ್ನು ಸ್ವೀಕರಿಸುವುದಿಲ್ಲ ಅಥವಾ ಬದಲಿಸುವುದಿಲ್ಲ (#11278). `PUT /api/providers/[id]` ಮೂಲಕ ಪೂರೈಕೆದಾರರ ಸಂಪರ್ಕದ ಮೆಟಾಡೇಟಾವನ್ನು ನವೀಕರಿಸುವುದರಿಂದ ಉಳಿಸಲಾದ ದರ-ಮಿತಿ ರಕ್ಷಣೆಯ ಸ್ಥಿತಿ ಎಂದಿಗೂ ಬದಲಾಗುವುದಿಲ್ಲ.

---

## 6. ಸ್ಲೋ-ಸ್ಟ್ರೀಮ್ ಥ್ರೋಪುಟ್ ವಾಚ್ಡಾಗ್ (#9709)

ಐಚ್ಛಿಕ `resilienceSettings.streamRecovery.throughputWatchdog` ಸಿಬ್ಬಂದಿ ಅಪ್ಸ್ಟ್ರೀಮ್ ಅನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ, ಅದು ಇನ್ನೂ ಭಾಗಗಳನ್ನು ಕಳುಹಿಸುತ್ತಿದೆ ಆದರೆ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ ಉಪಯುಕ್ತ-ಔಟ್ಪುಟ್ ದರಕ್ಕಿಂತ ಕಡಿಮೆ ಸಹಾಯಕ ಔಟ್ಪುಟ್ ಅನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ. ಇದು ಐಡಲ್ ಟೈಮ್ಔಟ್ನಿಂದ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಭಿನ್ನವಾಗಿದೆ: ಹೃದಯ ಬಡಿತಗಳು ಮತ್ತು ಮೆಟಾಡೇಟಾ ಟೈಮರ್ ಅನ್ನು ಮರುಹೊಂದಿಸುವುದಿಲ್ಲ ಮತ್ತು ಪ್ರಗತಿ ಎಂದು ಪರಿಗಣಿಸುವುದಿಲ್ಲ. ಇದು ಹಾರ್ಡ್ ಅಟೆಂಪ್ಟ್ ಡೆಡ್ಲೈನ್ನಿಂದ (#9153) ಭಿನ್ನವಾಗಿದೆ, ಇದು ಔಟ್ಪುಟ್ ಗುಣಮಟ್ಟವನ್ನು ಲೆಕ್ಕಿಸದೆ ಸಂಪೂರ್ಣ ಸುರಕ್ಷತಾ ಸೀಲಿಂಗ್ ಆಗಿ ಉಳಿದಿದೆ.

ವಾಚ್ಡಾಗ್ಗೆ ವಾರ್ಮ್-ಅಪ್ ಅವಧಿಯ ಅಗತ್ಯವಿರುತ್ತದೆ, ನಂತರ ಅದು ಸ್ಥಗಿತಗೊಳ್ಳುವ ಮೊದಲು ಸಂಪೂರ್ಣ ರೋಲಿಂಗ್ ವಿಂಡೋದ ಅಗತ್ಯವಿದೆ. ಇದು ಚಾಟ್ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಗಳು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಗಳ API ಔಟ್ಪುಟ್ ಈವೆಂಟ್ಗಳಿಂದ ಪಠ್ಯ ಡೆಲ್ಟಾಗಳನ್ನು ಎಣಿಕೆ ಮಾಡುತ್ತದೆ (ಸಂಪ್ರದಾಯವಾದಿ UTF-8 ಬೈಟ್ ಪ್ರಾಕ್ಸಿ), ಬಳಕೆ-ಮಾತ್ರ ಮತ್ತು ಖಾಲಿ ಈವೆಂಟ್ಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ ಮತ್ತು ಟೂಲ್-ಕಾಲ್ ಅಥವಾ ತಾರ್ಕಿಕ ಘಟನೆಗಳು ಹಾರಾಟದಲ್ಲಿರುವಾಗ ತೀರ್ಪನ್ನು ಅಮಾನತುಗೊಳಿಸುತ್ತದೆ. ಇದನ್ನು ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ ಮತ್ತು `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ನೊಂದಿಗೆ ಸಕ್ರಿಯಗೊಳಿಸಬಹುದು (ಆ env ಮೌಲ್ಯವು ಡೀಫಾಲ್ಟ್ — ಉಳಿಸಿದ `resilienceSettings.streamRecovery.throughputWatchdog.enabled` ಬೂಲಿಯನ್ ಗೆಲ್ಲುತ್ತದೆ; ಈ ಮಾರ್ಗದರ್ಶಿಯ ಮೇಲ್ಭಾಗದಲ್ಲಿರುವ env-vs-ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಆದ್ಯತೆಯ ಟಿಪ್ಪಣಿಯನ್ನು ನೋಡಿ); ವಿಂಡೋ, ವಾರ್ಮ್-ಅಪ್, ಕನಿಷ್ಠ ದರ ಮತ್ತು ಕನಿಷ್ಠ ಅಳೆಯಬಹುದಾದ ಔಟ್ಪುಟ್ ಅನ್ನು ಸಾಮಾನ್ಯ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ-ಸೆಟ್ಟಿಂಗ್ಗಳ ಸಾಮಾನ್ಯೀಕರಣ ಪದರದಿಂದ ಮಿತಿಗೊಳಿಸಲಾಗುತ್ತದೆ.

ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ, ಸಕ್ರಿಯ ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರಯತ್ನಕ್ಕೆ ಮಾತ್ರ ವಾಚ್ಡಾಗ್ ಸ್ಥಗಿತವನ್ನು ಅನ್ವಯಿಸಲಾಗುತ್ತದೆ. ಯಾವುದೇ ಕ್ಲೈಂಟ್-ಗೋಚರ ಬೈಟ್ಗಳ ಮೊದಲು, ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಅದೇ ಖಾತೆಯ ಆರಂಭಿಕ ಮರುಪಡೆಯುವಿಕೆ ಮಾರ್ಗವು ಪ್ರಯತ್ನವನ್ನು ಪುನಃ ತೆರೆಯಬಹುದು. ಬದ್ಧತೆಯ ನಂತರ, ಸ್ಟ್ರೀಮ್ ಅನ್ನು ಎಂದಿಗೂ ಕುರುಡಾಗಿ ಮರುಪ್ಲೇ ಮಾಡಲಾಗುವುದಿಲ್ಲ; ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಸುರಕ್ಷಿತ ಮಧ್ಯ-ಸ್ಟ್ರೀಮ್ ಮುಂದುವರಿಕೆ ಒಪ್ಪಂದವು ಮಾತ್ರ ಪ್ರತ್ಯಯವನ್ನು ಹೊಲಿಯಬಹುದು. ಅಂತಿಮಗೊಳಿಸುವಿಕೆಯು ಏಕ-ಶಾಟ್ ಆಗಿ ಉಳಿದಿದೆ, ಆದ್ದರಿಂದ ಬಳಕೆಯ ಲೆಕ್ಕಪತ್ರ ನಿರ್ವಹಣೆ ಮತ್ತು ಸೆಮಾಫೋರ್ ಬಿಡುಗಡೆಯು ನಕಲು ಮಾಡಲಾಗಿಲ್ಲ.

---

## 7. ಅಪ್ಸ್ಟ್ರೀಮ್ ಸ್ಥಿತಿ ಮರುನಿರೂಪಣೆ (ತಪ್ಪಾಗಿ ಸೂಚಿಸಲಾದ ಕೋಟಾ ದೋಷಗಳು)

**ವ್ಯಾಪ್ತಿ:** ತಾತ್ಕಾಲಿಕ ಕೋಟಾ ಖಾಲಿಯಾಗಿರುವುದನ್ನು ತಪ್ಪಾದ HTTP ಸ್ಥಿತಿಯೊಂದಿಗೆ ವರದಿ ಮಾಡುವ ಒಂದು ಅಪ್ಸ್ಟ್ರೀಮ್ ಗೇಟ್ವೇ.

**ಉದ್ದೇಶ:** ವರ್ಗೀಕರಣದ BEFORE ತಪ್ಪು ದಾರಿಗೆಳೆಯುವ ಸ್ಥಿತಿಯನ್ನು ಸರಿಪಡಿಸುವುದು, ಇದರಿಂದ ಡೌನ್ಸ್ಟ್ರೀಮ್ ಗ್ರಾಹಕರು (ಫಾಲ್ಬ್ಯಾಕ್ ಎಂಜಿನ್, ಕಾಂಬೋ ಒಟ್ಟುಗೂಡಿಸುವಿಕೆ, ಕ್ಲೈಂಟ್ಗೆ ತೋರಿಸುವ ಪ್ರತಿಕ್ರಿಯೆ) ವೈಫಲ್ಯದ ನಿಜವಾದ ಮರುಪ್ರಯತ್ನಿಸಬಹುದಾದ ಸ್ವರೂಪವನ್ನು ಕಾಣುತ್ತಾರೆ.

ಕೆಲವು ಗೇಟ್ವೇಗಳು TEMPORARY ಕೋಟಾ ಖಾಲಿಯಾಗಿರುವುದನ್ನು ಮರುಪ್ರಯತ್ನಿಸಲಾಗದ HTTP
ಸ್ಥಿತಿಯೊಂದಿಗೆ ಸೂಚಿಸುತ್ತವೆ. `agentrouter.org` ಪ್ರಮಾಣಿತ `429` ಬದಲಿಗೆ
ಚೀನೀ ಬಾಡಿಯೊಂದಿಗೆ (`用户额度不足` / `额度不足`) `403` (ಕೆಲವೊಮ್ಮೆ `400`) ಅನ್ನು
ಹಿಂತಿರುಗಿಸುತ್ತದೆ. Claude Code ನಂತಹ ಕ್ಲೈಂಟ್ಗಳು `403` ಅನ್ನು ಶಾಶ್ವತವೆಂದು ಪರಿಗಣಿಸಿ
ಸೆಷನ್ ಅನ್ನು ಸ್ಥಗಿತಗೊಳಿಸುತ್ತವೆ; ಸರಿಪಡಿಸುವಿಕೆ ಇಲ್ಲದೆ ಫಾಲ್ಬ್ಯಾಕ್ ಎಂಜಿನ್ ಇದನ್ನು ಕೋಟಾ
ಈವೆಂಟ್ ಬದಲಿಗೆ `AUTH_ERROR` ಎಂದು ವರ್ಗೀಕರಿಸುತ್ತದೆ.

**ಅನುಷ್ಠಾನ:**

- ರಿಜಿಸ್ಟ್ರಿ + ಮ್ಯಾಚರ್: `open-sse/config/upstreamStatusRestatement.ts` — ಪ್ರತಿ
  ಪ್ರೊವೈಡರ್ಗೆ ನಿಯಮಗಳ ಪಟ್ಟಿ (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), ಇದನ್ನು `applyStatusRestatement()` ಮೂಲಕ
  ಹೊಂದಿಸಲಾಗುತ್ತದೆ.
- ಕಾಲ್ ಸೈಟ್: `open-sse/handlers/chatCore.ts` ನಲ್ಲಿನ
  `providerFailure:` ಬ್ಲಾಕ್ (ಸುಮಾರು ಸಾಲು 3654), `parseUpstreamError()` ಅಪ್ಸ್ಟ್ರೀಮ್
  ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ದೋಷ HTTP ಸ್ಥಿತಿಯೊಂದಿಗೆ (`!providerResponse.ok`) ಪಾರ್ಸ್ ಮಾಡಿದ
  ತಕ್ಷಣ, ಮತ್ತು ಯಾವುದೇ ವರ್ಗೀಕರಣ ನಡೆಯುವ ಮೊದಲು; ಆದ್ದರಿಂದ ಪ್ರತಿಯೊಬ್ಬ ಡೌನ್ಸ್ಟ್ರೀಮ್
  ಗ್ರಾಹಕರಿಗೂ ಸರಿಪಡಿಸಿದ ಸ್ಥಿತಿ ಕಾಣುತ್ತದೆ. `200` SSE ಸ್ಟ್ರೀಮ್ ಒಳಗೆ ಎಂಬೆಡ್ ಮಾಡಲಾದ
  ದೋಷಗಳು ಪ್ರತ್ಯೇಕವಾದ, ನಂತರದ ಸ್ಟ್ರೀಮ್-ಪಾರ್ಸಿಂಗ್ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸುತ್ತವೆ ಮತ್ತು
  ಇಂದು ಈ ಹೂಕ್ನ ವ್ಯಾಪ್ತಿಗೆ **ಬರುವುದಿಲ್ಲ** — ಇದು ತಿಳಿದಿರುವ ಮಿತಿಯಾಗಿದೆ, ಆದರೆ
  agentrouter ನ ತಪ್ಪಾದ ಸ್ಥಿತಿಗೆ ಇನ್ನೂ ಅಗತ್ಯವಿಲ್ಲ (ಅದು ದೋಷ HTTP ಸ್ಥಿತಿಯಾಗಿ
  ಮೇಲ್ಮೈಗೊಳ್ಳುತ್ತದೆ).
- ಮರುಪ್ರಯತ್ನ ಅರ್ಹತೆ: `429` ಎಂಬುದು
  `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`)
  ನಲ್ಲಿ ಇದೆ; ಆದ್ದರಿಂದ ಮರುನಿರೂಪಿತ ದೋಷವು ಸತ್ತ `403` ಆಗಿ ಮೇಲ್ಮೈಗೊಳ್ಳುವ ಬದಲು ನಿಜವಾದ
  ಮರುಪ್ರಯತ್ನ ವಿಂಡೋವನ್ನು ಹೊಂದಿರುತ್ತದೆ.
- ಕೃತಕ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) ಎಂಬುದು
  ಮರುನಿರೂಪಿತ ಪ್ರತಿಕ್ರಿಯೆಯು **ಕ್ಲೈಂಟ್ಗೆ** ತಿಳಿಸುವ ಅವಧಿ ಮಾತ್ರ; ಇದು ಕನೆಕ್ಷನ್ನ
  ಆಂತರಿಕ cooldown/lockout ಅವಧಿಯಲ್ಲ — ಮರುನಿರೂಪಿತ ದೋಷವನ್ನು ವಾಸ್ತವವಾಗಿ ನಿರ್ವಹಿಸುವ
  ಯಾಂತ್ರಿಕತೆಯೇ ಅದನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತದೆ (Connection Cooldown ನ
  ಹೆಚ್ಚಾಗುವ backoff, §2, API-key ಪ್ರೊವೈಡರ್ಗಳಿಗೆ ಮೂಲ `3s`; ಅಥವಾ per-model-quota
  ಪ್ರೊವೈಡರ್ಗಳಾದ agentrouter ಗಾಗಿ Model Lockout, §3). ಕ್ಲೈಂಟ್ಗೆ ಪ್ರಕಟಿಸುವ 60s
  ವಿಂಡೋಗಿಂತ ಮುಂಚೆಯೇ ರೌಟರ್ ಆಂತರಿಕವಾಗಿ ಮರುಪ್ರಯತ್ನಿಸಲು ಅರ್ಹವಾಗಬಹುದು — ಇದು
  ಉದ್ದೇಶಿತ ಹೆಚ್ಚುವರಿ ಅವಕಾಶ, ದೋಷವಲ್ಲ.

ಶಾಶ್ವತ ದೋಷಗಳನ್ನು (agentrouter ನ `无权访问模型` — ಈ ಮಾದರಿಗೆ ಪ್ರವೇಶವಿಲ್ಲ)
ಎಂದಿಗೂ ಮರುನಿರೂಪಿಸಲಾಗುವುದಿಲ್ಲ: `textMarkers` ಹೊಂದಿದರೂ `excludeMarkers` ನಿಯಮವನ್ನು
ರದ್ದುಪಡಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ದೋಷವು ತನ್ನ ಮೂಲ ಸ್ಥಿತಿಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ ಮತ್ತು
ಯಾವುದೂ ಅದನ್ನು ಶಾಶ್ವತವಾಗಿ ಮರುಪ್ರಯತ್ನಿಸುವುದಿಲ್ಲ. ಹೊಂದಾಣಿಕೆಯಾಗುವ ಪ್ರೊವೈಡರ್
ವರ್ಗೀಕರಣ ನಿಯಮ
(`open-sse/config/providerErrorRules.ts` ನಲ್ಲಿನ
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
ಘೋಷಿತ `6h` ಮೂಲ cooldown) ಅನ್ನು `checkFallbackError`
(`open-sse/services/accountFallback.ts`) ಸಾಮಾನ್ಯ apikey-category `FORBIDDEN`
early-return ಗಿಂತ _ಮೊದಲು_ ಪರಿಶೀಲಿಸುತ್ತದೆ; ಇದು
`honorsRuleLockScope(provider)` ಗೆ ಒಳಪಟ್ಟಿದ್ದು (#10334 — ಪ್ರಸ್ತುತ
`providerErrorRules.ts` ನಲ್ಲಿನ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ಮೂಲಕ
agentrouter ಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ). ನಿಯಮದ ಘೋಷಿತ 6h cooldown
`fallbackResult.baseCooldownMs` ಮೂಲಕ ಹರಿಯುತ್ತದೆ, ಆದರೆ ಅದು ಇನ್ನೂ
ಈಗಿರುವ per-model-quota lockout ಮಾರ್ಗವನ್ನೇ
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, cooldown ಮೂಲವನ್ನು ಹೊರತುಪಡಿಸಿ #10334 ಮೂಲಕ
ಬದಲಾಗಿಲ್ಲ) ಬಳಸುತ್ತದೆ: ಪ್ರತಿಯೊಂದು ಇತರ model lockout ನಂತೆಯೇ ಅದನ್ನು ಆಪರೇಟರ್ನ
`mlSettings.maxCooldownMs` (ಡೀಫಾಲ್ಟ್ `1_800_000ms` / 30min) ಗೆ ಇಳಿಸಲಾಗುತ್ತದೆ,
ಮತ್ತು _persisted lockout reason_ ಈಗಿರುವ hardcoded `"forbidden"` ಆಗಿಯೇ ಇರುತ್ತದೆ,
ನಿಯಮದ `"auth_error"` ಅಲ್ಲ — cooldown ಅವಧಿಯನ್ನು ಮಾತ್ರ end-to-end ಗೌರವಿಸಲಾಗುತ್ತದೆ,
reason string ಅನ್ನು ಅಲ್ಲ. ಕನೆಕ್ಷನ್ ಸ್ವತಃ ಸಕ್ರಿಯವಾಗಿಯೇ ಇರುತ್ತದೆ; ಅದೇ ಕನೆಕ್ಷನ್ನಲ್ಲಿರುವ
ಸಹೋದರ ಮಾದರಿಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.

ಮರುನಿರೂಪಿತ ಕೋಟಾ ದೋಷಗಳು (`额度不足`) ಉತ್ಪಾದನೆಯಲ್ಲಿ ಪ್ರೊವೈಡರ್ ನಿಯಮವನ್ನು
ತಲುಪುತ್ತವೆ (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, ಸ್ವಂತವಾಗಿ ಯಾವುದೇ ಘೋಷಿತ cooldown ಇಲ್ಲ — persistence
ಲೇಯರ್ನ scaled backoff ಡೀಫಾಲ್ಟ್ ಅನ್ವಯಿಸುತ್ತದೆ). #10334 ರಿಂದ,
`ProviderErrorRuleMatch` ಮೇಲಿನ `scope` ಅನ್ನು end-to-end ಬಳಸಲಾಗುತ್ತದೆ, ಆದರೆ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ನಲ್ಲಿರುವ ಪ್ರೊವೈಡರ್ಗಳಿಗೆ ಮಾತ್ರ
(`providerErrorRules.ts` — ಇಂದು `"agentrouter"` ಮಾತ್ರ, `honorsRuleLockScope()`
ಮೂಲಕ gated). ಇತರ ಪ್ರತಿಯೊಂದು ಪ್ರೊವೈಡರ್ಗೆ `scope` ಹಿಂದಿನಂತೆಯೇ
ಮಾಹಿತಿಪ್ರದವಾಗಿಯೇ ಉಳಿಯುತ್ತದೆ, #10334 ಕ್ಕಿಂತ ಮೊದಲು ಇದ್ದಂತೆಯೇ.
`checkFallbackError` ಹೊಂದಾಣಿಕೆಯಾದ ನಿಯಮದ scope ಅನ್ನು
`fallbackResult.ruleScope` ಆಗಿ ಮೇಲ್ಮೈಗೊಳಿಸುತ್ತದೆ;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ಎಂಬುದು `ruleScope` ಅನ್ನು ಕನೆಕ್ಷನ್-ವ್ಯಾಪಕ,
ಸ್ವಯಂ-ಚೇತರಿಸಿಕೊಳ್ಳುವ signal ಆಗಿ ಗೌರವಿಸುವುದು ನಿಜವಾಗಿಯೂ ಸುರಕ್ಷಿತವೇ ಎಂಬುದನ್ನು
ದೃಢೀಕರಿಸುವ ಹಂಚಿಕೆಯ guard ಆಗಿದೆ (scope `"connection"`, reason
`quota_exhausted`, ಎಂದಿಗೂ `permanent` ಅಲ್ಲ, ಎಂದಿಗೂ `creditsExhausted` ಅಲ್ಲ —
scope `"connection"` ಅನ್ನು permanent account state ಜೊತೆಗೆ ಜೋಡಿಸುವ ಭವಿಷ್ಯದ
ನಿಯಮದ ವಿರುದ್ಧದ ರಕ್ಷಣೆ). ಇದನ್ನು ಇಬ್ಬರು ಗ್ರಾಹಕರು ಕರೆಯುತ್ತಾರೆ:

- **ಸ್ಥಿರ ಸಂಗ್ರಹಣೆ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider ನ **ಪ್ರತಿ-ಮಾದರಿ** ಲಾಕ್ಔಟ್
  ಶಾಖೆಗೆ ಬೀಳುವ ಬದಲು (agentrouter ಎಂಬುದು `passthroughModels: true` →
  `hasPerModelQuota()` `true` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ), ಇದು **ತಾತ್ಕಾಲಿಕ
  ಸಂಪರ್ಕ ಕೂಲ್ಡೌನ್** ಅನ್ನು ಅನ್ವಯಿಸುತ್ತದೆ —
  `testStatus: "unavailable"` + `rateLimitedUntil`; ಎಂದಿಗೂ ಅಂತಿಮ ಸ್ಥಿತಿ
  (`credits_exhausted`/`banned`/`expired`) ಅಲ್ಲ — ಹೀಗಾಗಿ ಕೈಯಾರೆ ಕ್ರೆಡೆನ್ಶಿಯಲ್
  ಮರುಹೊಂದಿಸುವ ಅಗತ್ಯವಿಲ್ಲದೆ ಕೂಲ್ಡೌನ್ ಮುಗಿದ ಬಳಿಕ ಸಂಪರ್ಕವು ಸ್ವತಃ ಚೇತರಿಸಿಕೊಳ್ಳುತ್ತದೆ.
  `disableCooling: true` ಇರುವ ಸಂಪರ್ಕಗಳಿಗೆ ಇದನ್ನು ಬಿಟ್ಟುಬಿಡಲಾಗುತ್ತದೆ (#2997):
  ಈ opt-out ಬದಲಿಗೆ ಪ್ರತಿ-ಮಾದರಿ ಲಾಕ್ಔಟ್ಗೆ ಮುಂದುವರಿಯುತ್ತದೆ (ದಾಖಲಿಸಲಾದ
  trade-off — ಶಾಖೆಯ ಮೇಲಿರುವ ಕೋಡ್ ಕಾಮೆಂಟ್ ನೋಡಿ).
- **ಅದೇ-ವಿನಂತಿಯ ಕಾಂಬೋ ರೂಟಿಂಗ್** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ಅದೇ ಗಾರ್ಡ್ ಸಂಪರ್ಕವನ್ನು
  ಮೆಮೊರಿಯಲ್ಲಿರುವ `exhaustedConnections` ಸೆಟ್ಗೆ ಸೇರಿಸುತ್ತದೆ, ಇದರ ಕೀ
  `${provider}:${connectionId}`. ಇದು ತನ್ನದೇ target object ನಲ್ಲಿ ಆ ನಿಖರ
  `connectionId` ಅನ್ನು ಈಗಾಗಲೇ ಹೊಂದಿರುವ ಉಳಿದ SAME-REQUEST ಗುರಿಯನ್ನು ಮಾತ್ರ
  ಬಿಟ್ಟುಬಿಡುತ್ತದೆ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  lookup ಗೆ ಮುನ್ನ `if (provider &&
connectionId)`) — ಸರಳ model-list combo ಯಲ್ಲಿ sibling targets ತಮ್ಮದೇ
  pinned `connectionId` ಹೊಂದಿರುವುದಿಲ್ಲ ಮತ್ತು ಪ್ರತಿ dispatchನಲ್ಲಿ responseನ
  `X-OmniRoute-Selected-Connection-Id` header ನಿಂದ ಒಂದನ್ನು ಮಾತ್ರ resolve
  ಮಾಡಲಾಗುತ್ತದೆ; ಆದ್ದರಿಂದ ಅದು ಎಂದಿಗೂ ಆ key match ಅನ್ನು ತಲುಪುವುದಿಲ್ಲ. ಈ ಸಾಮಾನ್ಯ
  ಸಂದರ್ಭಕ್ಕೆ, ಉಳಿದ leg ಈಗಷ್ಟೇ exhausted ಆದ account ಅನ್ನು ಮರುಬಳಸದಿರುವ ನಿಜವಾದ
  ರಕ್ಷಣೆ ಈ Set ಅಲ್ಲ — ಮೇಲಿನ persistence layer (connection ನ
  `rateLimitedUntil` ಈಗ ಭವಿಷ್ಯದಲ್ಲಿದೆ) ಮತ್ತು ಈ failure ಗಾಗಿ
  `transientRateLimitedProviders` ಅನ್ನು ಅದೇ ಗಾರ್ಡ್ suppress ಮಾಡುವುದೇ
  (`targetExhaustion.ts` ನಲ್ಲಿರುವ "Two-stage design" ಮತ್ತು
  `isAgentrouterConnectionQuotaScope` branch ಮೇಲಿನ ಕೋಡ್ ಕಾಮೆಂಟ್ ನೋಡಿ):
  Set ಅನ್ನು ಗುರುತಿಸದೆ ಬಿಟ್ಟಿರುವುದರಿಂದ, `combo.ts` ನ
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider ನ ಉಳಿದ
  legs ಗಾಗಿ ಸಕ್ರಿಯವಾಗುವುದಿಲ್ಲ; ಹೀಗಾಗಿ credential selection ನ
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) ಸಾಮಾನ್ಯವಾಗಿ
  ಅನ್ವಯಿಸುತ್ತದೆ ಮತ್ತು ಉಳಿದ leg ಬೇರೆ, ಇನ್ನೂ-ಅರ್ಹ agentrouter ಸಂಪರ್ಕವನ್ನು ಆಯ್ಕೆ
  ಮಾಡುತ್ತದೆ ಅಥವಾ credentials ಲಭ್ಯವಿಲ್ಲ ಎಂಬ ದೋಷದೊಂದಿಗೆ ವಿಫಲವಾಗುತ್ತದೆ — ಈ ಶಾಖೆಯು
  ಇದೀಗ ಕೂಲ್ಡೌನ್ಗೆ ಒಳಪಡಿಸಿದ ಸಂಪರ್ಕದ ಮೇಲೆ ಬಲವಂತವಾಗಿ ಮರಳಿ ಹೋಗುವುದಿಲ್ಲ.

### ಎರಡು-ಹಂತದ ವಿನ್ಯಾಸ: ಸ್ಥಿತಿ ಮರುಹೇಳಿಕೆ, ನಂತರ ವರ್ಗೀಕರಣ

ಸ್ಥಿತಿ ಮರುಹೇಳಿಕೆ (`upstreamStatusRestatement.ts`) ಮತ್ತು provider
ವರ್ಗೀಕರಣ ನಿಯಮಗಳು (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ಎರಡೂ provider id ಮತ್ತು ಪಠ್ಯ ಗುರುತುಗಳ ಆಧಾರದ ಮೇಲೆ
ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಪ್ರತ್ಯೇಕ registry ಗಳಾಗಿವೆ; ಆದರೆ ಅವು ಬೇರೆ ಬೇರೆ ಸ್ಥಳಗಳಲ್ಲಿ
ಚಾಲನೆಯಾಗುತ್ತವೆ ಮತ್ತು ಬೇರೆ ಬೇರೆ ಉದ್ದೇಶಗಳನ್ನು ಪೂರೈಸುತ್ತವೆ: restatement,
`chatCore.ts` ನಲ್ಲಿ HTTP status ಅನ್ನು ಆರಂಭದಲ್ಲೇ ಮರುಬರೆಯುತ್ತದೆ;
classification rules, `checkFallbackError()` ಒಳಗೆ
(`open-sse/services/accountFallback.ts`), fallback `reason` ಅನ್ನು ಆಯ್ಕೆ
ಮಾಡುತ್ತವೆ ಮತ್ತು `scope` (`model` / `provider` / `connection`) ಅನ್ನು
ಲಾಕ್ ಮಾಡುತ್ತವೆ.

`providerErrorRules.ts` ನಲ್ಲಿರುವ `FULL_TEXT_RULE_PROVIDERS`
allowlistನಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಿರುವ provider ಗಳಿಗೆ ಮಾತ್ರ classification rules
ಪೂರ್ಣ error **text** ಅನ್ನು ನೋಡುತ್ತವೆ (body markers ಗಳಾದ `额度不足` ಅನ್ನು
ಹೊಂದಿಸಲು ಇದು ಅಗತ್ಯ) — ಪ್ರಸ್ತುತ `"agentrouter"` ಮಾತ್ರ. ಇತರೆ ಪ್ರತಿಯೊಂದು
**built-in catalog** provider ಗಾಗಿ, `checkFallbackError`,
`getProviderErrorRuleMatch` ಗೆ ಕೇವಲ structured error (`{code, type}`) ಅನ್ನು
ನೀಡುತ್ತದೆ; ಇದು header/status/code ಆಧಾರಿತ ನಿಯಮಗಳಿಗೆ ಸಾಕಾಗುತ್ತದೆ, ಆದರೆ
body-text markers ಅನ್ನು ನೋಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ಸಹಾಯಕವಾದ `resolveRuleMatchBody()`
ಈ ಆಯ್ಕೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ: allowlistನಲ್ಲಿರುವ provider ಗಳಿಗೆ ಪೂರ್ಣ error
text, ಇತರರಿಗೆ structured error. **built-in** provider ಅನ್ನು
`FULL_TEXT_RULE_PROVIDERS` ಗೆ ಸೇರಿಸುವುದು ಸ್ಪಷ್ಟವಾದ ಪ್ರತಿ-provider opt-in —
ಪಟ್ಟಿಯಲ್ಲಿ ಇಲ್ಲದ ಪ್ರತಿಯೊಂದು provider ಗಾಗಿ default path byte-for-byte ಬದಲಾಗದೆ
ಇರಲು ಇದನ್ನು ಉದ್ದೇಶಿಸಲಾಗಿದೆ.

ಒಂದು ನಿಯಮದ `scope` (`model` / `provider` / `connection`) ಎಂಬುದು
`FULL_TEXT_RULE_PROVIDERS` ನಿಂದ ಪ್ರತ್ಯೇಕವಾದ opt-in ಆಗಿದೆ:
`checkFallbackError` ಇದನ್ನು `fallbackResult.ruleScope` ಆಗಿ ಮಾತ್ರ
ಹೊರಹಾಕುತ್ತದೆ, ಮತ್ತು downstream consumers ಇದನ್ನು ಮಾಹಿತಿಗಾಗಿ ತೋರಿಸುವ label
ಗಿಂತ ಹೆಚ್ಚಿನದಾಗಿ, ಅದೇ file ನಲ್ಲಿರುವ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistನ provider ಗಳಿಗೆ ಮಾತ್ರ
ಗೌರವಿಸುತ್ತವೆ (`honorsRuleLockScope()` ಮೂಲಕ ನಿಯಂತ್ರಿತ — ಇಂದು
`"agentrouter"` ಮಾತ್ರ). provider ಆ allowlistನಲ್ಲಿದ್ದಾಗ
`scope: "connection"` match ನಿಜವಾಗಿ ಏನು ಮಾಡುತ್ತದೆ ಎಂಬುದಕ್ಕಾಗಿ ಮೇಲಿನ
"Restated quota errors" ನೋಡಿ.

**#11104 — operator-declared rules ಎರಡೂ allowlist ಗಳನ್ನು bypass ಮಾಡುತ್ತವೆ.**
ಒಬ್ಬ operator, ಈ file ಅನ್ನು ಸಂಪಾದಿಸದೆ, runtime ನಲ್ಲಿ
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ಮೂಲಕ ಪ್ರತಿ-provider rule ಅನ್ನು ಘೋಷಿಸಬಹುದು. **default** built-in catalog
rules ನ ವರ್ತನೆಯನ್ನು ರಕ್ಷಿಸಲು ಉದ್ದೇಶಿಸಲಾದ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
allowlist ಗಳ ಹಿಂದೆ operator rule ಅನ್ನು gating ಮಾಡಿದರೆ, rule ಘೋಷಿಸುವುದೇ
operator ನ ಸ್ಪಷ್ಟ opt-in ಆಗಿರುವುದರಿಂದ, ಈಗಾಗಲೇ ಅಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಿರುವ provider
ಗಳನ್ನು ಹೊರತುಪಡಿಸಿ ಪ್ರತಿಯೊಂದು provider ಗಾಗಿ settings mechanism ನಿಷ್ಕ್ರಿಯವಾಗುತ್ತದೆ.
`resolveRuleMatchBody()` ಮತ್ತು `honorsRuleLockScope()` ಎರಡೂ ಮೊದಲು
`hasOperatorRuleForProvider()` ಅನ್ನು ಪರಿಶೀಲಿಸುತ್ತವೆ: operator rule ಹೊಂದಿರುವ
provider ಗೆ raw error text ದೊರೆಯುತ್ತದೆ ಮತ್ತು ಅದರ ಘೋಷಿಸಲಾದ `scope` ಅನ್ನು
ಗೌರವಿಸಲಾಗುತ್ತದೆ; ಅದು ಯಾವುದಾದರೂ allowlist ನಲ್ಲಿ ಕಾಣಿಸಿಕೊಂಡಿದೆಯೇ ಎಂಬುದನ್ನು
ಲೆಕ್ಕಿಸದೆ.

**Operator-declared rules** (`OperatorProviderErrorRule`): ಪ್ರತಿಯೊಂದು rule ಗೆ
ಐಚ್ಛಿಕ `status` ಮತ್ತು ಐಚ್ಛಿಕ `match` ಇರುತ್ತವೆ (`match` error text ನ ಸರಳ,
case-insensitive substring ಆಗಿರಬೇಕು, ಎಂದಿಗೂ RegExp ಅಲ್ಲ; ಆದ್ದರಿಂದ ಅದು ReDoS
ಗೆ ಕಾರಣವಾಗಲು ಸಾಧ್ಯವಿಲ್ಲ), ಮತ್ತು ಇವೆರಡರಲ್ಲಿ ಕನಿಷ್ಠ ಒಂದನ್ನು ಹೊಂದಿರಬೇಕು.
ಎರಡನ್ನೂ ಹೊಂದಿದ್ದರೆ ಅವುಗಳನ್ನು AND ಮಾಡಲಾಗುತ್ತದೆ; ಬಿಟ್ಟ field ಯಾವುದನ್ನಾದರೂ
match ಮಾಡುತ್ತದೆ, ಆದ್ದರಿಂದ `{match: "insufficient_quota"}` ಆ code ಹೊಂದಿರುವ
ಯಾವುದೇ status ಅನ್ನು match ಮಾಡುತ್ತದೆ. ಮೊದಲು ಹೊಂದುವ rule ಗೆ ಆದ್ಯತೆ ಸಿಗುತ್ತದೆ.
`cooldownMs` ಗರಿಷ್ಠ 30 ದಿನಗಳವರೆಗೆ ಸ್ವೀಕರಿಸುತ್ತದೆ; ಒಟ್ಟು ಗರಿಷ್ಠ 50 rules.

**ಎಲ್ಲಕ್ಕೂ ಅನ್ವಯಿಸುವ ಡೀಫಾಲ್ಟ್ಗಳು** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` ಮೂಲಕ ಹೊಂದಿಸಲಾಗುತ್ತದೆ): `{[provider]: {cooldownMs, scope?, reason?}}`
ಇಲ್ಲಿ `cooldownMs` 1 ನಿಮಿಷದಿಂದ 30 ದಿನಗಳವರೆಗೆ ಇರಬಹುದು. ಯಾವುದೇ operator ನಿಯಮ ಮತ್ತು ಯಾವುದೇ built-in catalog ನಿಯಮ ಹೊಂದಿಕೆಯಾಗದಿದ್ದಾಗ ಮಾತ್ರ, ಹಾಗೆಯೇ 402, 403, 408, 429 ಮತ್ತು 5xx ದೋಷಗಳಿಗೆ ಮಾತ್ರ ಡೀಫಾಲ್ಟ್ ಅನ್ವಯಿಸುತ್ತದೆ. Request-shape ದೋಷಗಳು (400, 404, 409, 413, 422) ಮತ್ತು bare 401 ದೋಷಗಳು ತಮ್ಮದೇ ನಿರ್ವಹಣೆಯನ್ನು ಮುಂದುವರಿಸುತ್ತವೆ. ಸ್ಪಷ್ಟವಾದ `reason` ಇಲ್ಲದಿದ್ದರೆ, `classifyError` ಮಾಡುವ ರೀತಿಯಲ್ಲೇ reason status ನಿಂದ ಬರುತ್ತದೆ. ಡೀಫಾಲ್ಟ್ ಘೋಷಿಸುವುದು `hasOperatorRuleForProvider()` ಗಾಗಿ operator ನಿಯಮವಾಗಿ ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಅದರ `scope` (ಡೀಫಾಲ್ಟ್ `"connection"`) ಗೌರವಿಸಲ್ಪಡುತ್ತದೆ. ಡೀಫಾಲ್ಟ್ನ ಪರಿಣಾಮಕಾರಿ cooldown, ಅದರ `cooldownMs` ಮತ್ತು provider ನ ಸ್ವಂತ retry hint (`Retry-After`, `x-ratelimit-reset` ಅಥವಾ body ಯಲ್ಲಿನ reset hint — connection-cooldown setting "use upstream retry hints" ಆನ್ ಆಗಿರುವಾಗ engine ಗೌರವಿಸುವ ಅದೇ hint) ಇವೆರಡರಲ್ಲಿ ದೀರ್ಘವಾದದ್ದಾಗಿರುತ್ತದೆ. ಆದ್ದರಿಂದ ಡೀಫಾಲ್ಟ್ ಚಿಕ್ಕ upstream hint ಅನ್ನು ವಿಸ್ತರಿಸಬಹುದು, ಆದರೆ ನಿಜವಾದ reset ಅನ್ನು ಎಂದಿಗೂ ಕಡಿಮೆ ಮಾಡಲಾಗುವುದಿಲ್ಲ. ಸ್ಪಷ್ಟವಾದ operator ನಿಯಮವು ತನ್ನ ನಿಖರವಾದ `cooldownMs` ಅನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ. `markAccountUnavailable` ನಲ್ಲಿನ connection-cooldown guards ಅನ್ನು ಯಾವುದೇ ನಿಯಮ ಅಥವಾ ಡೀಫಾಲ್ಟ್ bypass ಮಾಡುವುದಿಲ್ಲ: ಸಕ್ರಿಯವಾಗಿರುವ, ದೀರ್ಘವಾದ cooldown ಅನ್ನು ಎಂದಿಗೂ ಕಡಿಮೆ ಮಾಡಲಾಗುವುದಿಲ್ಲ ಮತ್ತು terminal status ಅನ್ನು ಎಂದಿಗೂ overwrite ಮಾಡಲಾಗುವುದಿಲ್ಲ. `checkFallbackError` ನಲ್ಲಿ ಮೊದಲೇ ನಡೆಯುವ built-in text detectors (credits exhausted, daily quota, account deactivated) ತಮ್ಮದೇ phrases ಗಾಗಿ ಇನ್ನೂ ಆದ್ಯತೆ ಪಡೆಯುತ್ತವೆ.

**ತಿಳಿದಿರುವ ಕೊರತೆ — `providerRuleRegistry` ಅನ್ನು HTTP 400 ಗಾಗಿ ಎಂದಿಗೂ ಪರಿಶೀಲಿಸಲಾಗುವುದಿಲ್ಲ.**
`checkFallbackError` ನ `BAD_REQUEST` branch status 400 ಅನ್ನು ತನ್ನದೇ pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, ಇತ್ಯಾದಿ `accountFallback.ts` ನಲ್ಲಿ) ಮೂಲಕ ಸಂಪೂರ್ಣವಾಗಿ classify ಮಾಡುತ್ತದೆ ಮತ್ತು ಅದರ ಮೇಲಿರುವ `configuredRule`/`getProviderErrorRuleMatch` branch ತಲುಪುವ ಮೊದಲು return ಮಾಡುತ್ತದೆ. `status: 400` ಹೊಂದಿರುವ built-in catalog ನಿಯಮ (ಅಥವಾ operator ನಿಯಮ) syntax ದೃಷ್ಟಿಯಿಂದ ಮಾನ್ಯವಾದರೂ ಎಂದಿಗೂ ಕಾರ್ಯಗತವಾಗುವುದಿಲ್ಲ. ಇಂದು ಯಾವುದೇ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ನಿಯಮವು 400 ಅನ್ನು ಗುರಿಯಾಗಿಸಿಕೊಂಡಿಲ್ಲ, ಆದ್ದರಿಂದ production ನಲ್ಲಿ ಯಾವುದೂ ಪರಿಣಾಮಕ್ಕೊಳಗಾಗುವುದಿಲ್ಲ — ಆದರೆ ಭವಿಷ್ಯದ 400 ನಿಯಮಕ್ಕೆ ಮೊದಲು ಈ branch ಅನ್ನು ಬದಲಾಯಿಸಬೇಕಾಗುತ್ತದೆ. ಇದು ಕೇವಲ ನಿಯಮ ಸೇರಿಸುವುದಕ್ಕಿಂತ ದೊಡ್ಡ ಬದಲಾವಣೆಯಾಗಿದೆ, ಏಕೆಂದರೆ pattern-array ವರ್ತನೆಯನ್ನು ಈಗಾಗಲೇ ಅವಲಂಬಿಸಿರುವ ಪ್ರತಿಯೊಂದು provider ಗಾಗಿ 400 ಅನ್ನು ಮರು-classify ಮಾಡುತ್ತದೆ; ಆದ್ದರಿಂದ single-provider ನಿಯಮ ಸೇರ್ಪಡೆಗೆ ಇದು scope ಹೊರಗಿದೆ.

### ಹೊಸ quota-misstating gateway ಸೇರಿಸುವುದು

1. `statusRestatementRegistry` ನಲ್ಲಿ ಒಂದು rule array ನೋಂದಾಯಿಸಿ
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` ಅನ್ನು provider-specific ಆಗಿಯೇ ಇರಿಸಿ; `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ಜೊತೆ ಸಂಘರ್ಷಿಸುವ generic English phrases ಅನ್ನು ಎಂದಿಗೂ ಮರುಬಳಕೆ ಮಾಡಬೇಡಿ.
2. ಸರಿಯಾದ lock scope ಆಯ್ಕೆ ಮಾಡಲು classification rules ಅನ್ನು
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ನಲ್ಲಿ ಐಚ್ಛಿಕವಾಗಿ ನೋಂದಾಯಿಸಿ (`connection` account-wide quota ಗಾಗಿ, `model` ಪ್ರತಿ-model ದೋಷಗಳಿಗಾಗಿ). ಪೂರ್ಣ error text ಅಗತ್ಯವಿರುವ providers ಗಳಲ್ಲಿ (body markers) ಮಾತ್ರ ಈ ಹಂತವು production ನಲ್ಲಿ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ: ಅದೇ file ನಲ್ಲಿ `FULL_TEXT_RULE_PROVIDERS` ಗೆ provider id ಸೇರಿಸಿ — ಇಲ್ಲದಿದ್ದರೆ `checkFallbackError` structured `{code, type}` error ಅನ್ನು ಮಾತ್ರ rule ಗೆ ನೀಡುತ್ತದೆ ಮತ್ತು body-text rule live traffic ನಲ್ಲಿ ಎಂದಿಗೂ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.
   ಕೇವಲ `status`/`headers` ಆಧಾರಿತವಾಗಿ ಹೊಂದಿಕೆಯಾಗುವ rules (Opencode ಅಥವಾ Minimax ನವುಗಳಂತೆ) ಗೆ ಈ opt-in ಅಗತ್ಯವಿಲ್ಲ. ಪ್ರತ್ಯೇಕವಾಗಿ, rule `scope: "connection"` ಅನ್ನು ಘೋಷಿಸಿದರೆ ಮತ್ತು ಉದ್ದೇಶವು ನಿಜವಾದ connection-wide cooldown ಜೊತೆಗೆ same-request combo skip ಆಗಿದ್ದರೆ (ಕೇವಲ informational label ಅಲ್ಲ), ಅದೇ file ನಲ್ಲಿ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ಗೆ provider id ಸೇರಿಸಿ — ಇದು `markAccountUnavailable()` (`src/sse/services/auth.ts`) ಮತ್ತು
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ನಲ್ಲಿ `isAgentrouterConnectionQuotaScope()`-style consumption ಅನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ; ಇದಿಲ್ಲದೆ `scope` ಇನ್ನೂ `fallbackResult.ruleScope` ಮೂಲಕ ಹರಿಯುತ್ತದೆ, ಆದರೆ ಅದರ ಮೇಲೆ ಯಾವುದೂ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದಿಲ್ಲ.
3. `tests/unit/upstream-status-restatement.test.ts`
   ಮತ್ತು `tests/unit/agentrouter-error-rules.test.ts` ಗೆ ಹೋಲುವ unit tests ಸೇರಿಸಿ (ಇವುಗಳಲ್ಲಿ not-permanent / not-creditsExhausted guards ಇರಬೇಕು; ಮತ್ತು provider ಗೆ allowlist ಅಗತ್ಯವಿದ್ದರೆ, `resolveRuleMatchBody()` ಆ provider ಗಾಗಿ ಮಾತ್ರ full text ಹಿಂತಿರುಗಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ದೃಢೀಕರಿಸುವ test ಕೂಡ ಇರಬೇಕು).

`chatCore.ts`, `classifyError` ಅಥವಾ combo ನಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆ ಅಗತ್ಯವಿಲ್ಲ.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) ನಲ್ಲಿರುವ providers ಗಳನ್ನು IP-bucketed upstream ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ (opencode free tier account-bucketed ಅಲ್ಲ, IP-bucketed ಆಗಿದೆ — #9611 ನೋಡಿ): `quota_exhausted`
**ಅಥವಾ** `rate_limit_exceeded` ಎಂದು classify ಮಾಡಲಾದ status-429, ವಿಫಲವಾದ connection ನ ಕೊನೆಯದಾಗಿ ತಿಳಿದಿರುವ egress IP ಗೆ ಹೊಂದಿಕೆಯಾಗುವ, allowlisted-family ಯ ಪ್ರತಿಯೊಂದು connection ಅನ್ನು rotation ಅವುಗಳನ್ನು ಪ್ರಯತ್ನಿಸುವ ಮೊದಲು cooldown ಮಾಡುತ್ತದೆ
— ಇದರಿಂದ N-1 ಖಚಿತವಾಗಿ ವಿಫಲವಾಗುವ upstream calls ತಪ್ಪುತ್ತವೆ (#10460/#10525 ರಂತೆಯೇ). `rate_limit_exceeded` ಅನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಸೇರಿಸಲಾಗಿದೆ: `markAccountUnavailable` path ನಲ್ಲಿ opencode-specific rules ಎಂದಿಗೂ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ (`checkFallbackError` ಗೆ headers/body ನೀಡಲಾಗುವುದಿಲ್ಲ, ಮತ್ತು opencode `FULL_TEXT_RULE_PROVIDERS` ನಲ್ಲಿ ಇಲ್ಲ). ಆದ್ದರಿಂದ subscription-quota text ("monthly usage limit reached") ಹೊಂದಿರುವ body ಇರುವ 429 ಅನ್ನು `status_429` rule ತಲುಪುವ ಮೊದಲು quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) ಮೂಲಕ `quota_exhausted` ಎಂದು classify ಮಾಡಲಾಗುತ್ತದೆ — ಆದರೆ quota-text ಇಲ್ಲದ 429 (ಸಾಮಾನ್ಯ rate limiting) `status_429` rule ಮೂಲಕ `rate_limit_exceeded` ಎಂದು classify ಆಗುತ್ತದೆ ಮತ್ತು IP family ಯನ್ನೂ cooldown ಮಾಡುತ್ತದೆ. Allowlisted provider ಗಾಗಿ IP-bucketed rate limit ಎಂದರೆ exhausted quota ಗೆ ಸಮಾನ signal. ಪ್ರಾಮಾಣಿಕ ಮಿತಿಗಳು:

- **ಸಾಧ್ಯವಾದಷ್ಟು ಉತ್ತಮ ಪ್ರಯತ್ನ**: ಲಾಕ್ `proxy_logs` ನಿಂದ ಸಂಪರ್ಕದ ಕೊನೆಯದಾಗಿ ತಿಳಿದಿರುವ `egress_ip` ಅನ್ನು ಪರಿಹರಿಸುತ್ತದೆ (24 ಗಂಟೆಗಳ ವಿಂಡೋ, ಸಿಂಕ್ರೋನಸ್, ಕ್ಯಾಶ್ ಇಲ್ಲ). ಕ್ಯಾಶ್ ಖಾಲಿಯಾಗಿದ್ದರೆ (`egress IP` ಅನ್ನು ಎಂದಿಗೂ ಪರಿಶೀಲಿಸದಿದ್ದರೆ) ಅಥವಾ ಯಾವುದೇ ಸಾಲು ಇಲ್ಲದಿದ್ದರೆ → ವಿಫಲವಾದ ಸಂಪರ್ಕವನ್ನು ಬ್ರಾಂಚ್ನಿಂದಲೇ ಇನ್ನೂ ಕೂಲ್ ಮಾಡಲಾಗುತ್ತದೆ (ಇಂದಿನಂತೆಯೇ ದಾಖಲಿಸಲಾಗುತ್ತದೆ), ಆದರೆ ಯಾವುದೇ ಸಹೋದರ ಸಂಪರ್ಕಕ್ಕೆ ಲಾಕ್ ವಿಧಿಸಲಾಗುವುದಿಲ್ಲ.
- **ಎಂದಿಗೂ ಅಂತಿಮ ಸ್ಥಿತಿ ಅಲ್ಲ**: ಕೂಲ್ಡೌನ್ ನವೀಕರಿಸಬಹುದಾದ ಕೋಟಾ ವಿಂಡೋ ಆಗಿದೆ (`testStatus: "unavailable"`); IP-ಮಟ್ಟದ ಸಿಗ್ನಲ್ನಿಂದ ಶಾಶ್ವತ ಸ್ಥಿತಿಯನ್ನು ಎಂದಿಗೂ ಪಡೆಯಲಾಗುವುದಿಲ್ಲ. `disableCooling` ಸಂಪರ್ಕಗಳು ಈ ಬ್ರಾಂಚ್ ಅನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಬಿಟ್ಟುಹೋಗುತ್ತವೆ.
- **ಅನುಮತಿಸಲಾದ ಕುಟುಂಬಕ್ಕಾಗಿ ಲಾಕ್ನ ಗ್ರ್ಯಾನ್ಯುಲಾರಿಟಿ ಬದಲಾಗುತ್ತದೆ**: ಇದು ಕೇವಲ ಸಹೋದರ ಸಂಪರ್ಕಗಳ ಆಪ್ಟಿಮೈಸೇಶನ್ ಅಲ್ಲ, ಸ್ಕೋಪ್ ಬದಲಾವಣೆಯಾಗಿದೆ. opencode ಒಂದು `passthroughModels` ಪ್ರೊವೈಡರ್ ಆಗಿರುವುದರಿಂದ, ಈ ಬ್ರಾಂಚ್ಗಿಂತ ಮೊದಲು 429 ಪ್ರತಿ-MODEL ಲಾಕ್ಔಟ್ ಉಂಟುಮಾಡುತ್ತಿತ್ತು; ಈಗ ಅದು ಸಂಪರ್ಕ ಕೂಲ್ಡೌನ್ ಉಂಟುಮಾಡುತ್ತದೆ — ಯಾವುದೇ ಸಹೋದರ ಸಂಪರ್ಕವಿಲ್ಲದೆ ಒಂದೇ ಸಂಪರ್ಕವನ್ನು ನಡೆಸುತ್ತಿರುವ ಆಪರೇಟರ್ಗೂ ಸಹ. opencode ನಿಯಮಗಳ ಟೇಬಲ್ ಈಗಾಗಲೇ ಸರಿಯೆಂದು ಘೋಷಿಸಿರುವ ಗ್ರ್ಯಾನ್ಯುಲಾರಿಟಿ ಇದೇ (`scope: "connection"`, `providerErrorRules.ts`); ಆದರೆ opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ನಲ್ಲಿ ಇಲ್ಲದ ಕಾರಣ ಇದುವರೆಗೆ ಎಂದಿಗೂ ಅನ್ವಯಿಸಲ್ಪಟ್ಟಿರಲಿಲ್ಲ. ಈ ಬ್ರಾಂಚ್ ವಿಫಲವಾದ ಸಂಪರ್ಕದ ಕೂಲ್ಡೌನ್ + `backoffLevel` ಅನ್ನು ತಾನೇ ಬರೆಯುತ್ತದೆ, ಸಂಪರ್ಕ-ಸ್ಕೋಪ್ agentrouter ಬ್ರಾಂಚ್ನ ಮಾದರಿಯನ್ನು ಅನುಸರಿಸಿ, ನಂತರ ಮರಳುತ್ತದೆ — ಪ್ರತಿ-ಮಾಡೆಲ್ ಬ್ಲಾಕ್ ಮತ್ತು ಕೆಳಗಿನ ಸಾಮಾನ್ಯ ಪಾತ್ ಎಂದಿಗೂ ತಲುಪುವುದಿಲ್ಲ.
- **ಕಾಂಬೊ ಒಳಗೊಂಡಿದೆ**: agentrouter ಬ್ರಾಂಚ್ನಂತೆಯೇ, 429 ಗೆ ಕಾಂಬೊ ಕಾಲರ್ ಅನ್ವಯಿಸುವ `persistUnavailableState`/`isCombo` ಡೌನ್ಗ್ರೇಡ್ ಅನ್ನು ಈ ಸ್ಕೋಪ್ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ. ಪ್ರತಿ-ಮಾಡೆಲ್ ಲಾಕ್ಔಟ್ ಈ ಸ್ಕೋಪ್ನ ದುರ್ಬಲ ರೂಪವಲ್ಲ; ಅದು ತಪ್ಪಾದ ಘಟಕವಾಗಿದೆ: ಅದು ಖಾಲಿಯಾದ IP ಬಗ್ಗೆ ಏನನ್ನೂ ಹೇಳುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ ಕಾಂಬೊ ರೊಟೇಶನ್ ಪ್ರತಿ ಸಹೋದರ ಸಂಪರ್ಕಕ್ಕೆ ಖಚಿತವಾಗಿ ವಿಫಲವಾಗುವ ಒಂದು ಕಾಲ್ ಅನ್ನು ವ್ಯರ್ಥವಾಗಿ ಮಾಡುತ್ತಲೇ ಇರುತ್ತದೆ.
- **ಸಹೋದರ ಸಂಪರ್ಕಗಳ ಸುರಕ್ಷತೆ**: ಈಗಾಗಲೇ ಅಂತಿಮ ಸ್ಥಿತಿಯಲ್ಲಿರುವ (banned/credits_exhausted) ಅಥವಾ ಈಗಾಗಲೇ ಹೆಚ್ಚು ದೀರ್ಘವಾದ ಕೂಲ್ಡೌನ್ನಲ್ಲಿರುವ ಸಹೋದರ ಸಂಪರ್ಕವನ್ನು ಎಂದಿಗೂ ಓವರ್ರೈಟ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ.
- **ವಿಶೇಷ ಅನುಮತಿ ಪಟ್ಟಿ**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ಅನ್ನು ವಿಸ್ತರಿಸುವುದು ಸ್ಪಷ್ಟ ಮಾಲೀಕರ ನಿರ್ಧಾರವಾಗಿದೆ; ಯಾವುದೇ ಸಾಮಾನ್ಯ ವೈರಿಂಗ್ ಇಲ್ಲ (ಪ್ಯಾಟರ್ನ್ #10334/#10419). ಸಹೋದರ ಸಂಪರ್ಕಗಳ ಕ್ವೆರಿಯು ಅದೇ ಅನುಮತಿ ಪಟ್ಟಿಗೆ ಬಿಂಡ್ ಆಗುತ್ತದೆ, ಅದನ್ನು SQL ಲಿಟರಲ್ ಆಗಿ ಪುನರಾವರ್ತಿಸುವುದಿಲ್ಲ; ಆದ್ದರಿಂದ ಅದನ್ನು ವಿಸ್ತರಿಸುವುದು ಒಂದೇ ಸಾಲಿನ ಬದಲಾವಣೆಯಾಗಿ ಉಳಿಯುತ್ತದೆ.
- **ಎಗ್ರೆಸ್ IP ರೊಟೇಶನ್, ಎರಡೂ ದಿಕ್ಕುಗಳಲ್ಲಿ**: ಲುಕ್ಅಪ್ ವಿಂಡೋ (24 ಗಂಟೆಗಳು) ಎಗ್ರೆಸ್-IP ಕ್ಯಾಶ್ TTL (5 ನಿಮಿಷಗಳು) ಗಿಂತ ಬಹಳ ವಿಶಾಲವಾಗಿದೆ, ಆದ್ದರಿಂದ "ಕೊನೆಯದಾಗಿ ತಿಳಿದಿರುವ IP" ಪ್ರಸ್ತುತ ಸ್ಥಿತಿಯಲ್ಲ, ಇತಿಹಾಸವಾಗಿದೆ. ವಿಂಡೋ ಒಳಗೆ ಸಂಪರ್ಕದ ಪ್ರಾಕ್ಸಿ ರೊಟೇಟ್ ಆಗಿದ್ದರೆ, ಲಾಕ್ ನಿಜವಾಗಿಯೂ ಹಂಚಿಕೊಂಡಿರುವ IP ಅನ್ನು **ತಪ್ಪಿಸಿಕೊಳ್ಳಬಹುದು** (ದಾಖಲಾದ IP ಹೊಸದು ಮತ್ತು ಇನ್ನೂ ಖಾಲಿಯಾಗಿರುತ್ತದೆ) — ಮತ್ತು ಸಮಮಿತಿಯಾಗಿ, ಖಾಲಿಯಾದ IP ಯಿಂದ ನಂತರ ರೊಟೇಟ್ ಆಗಿ ದೂರ ಸರಿದಿರುವ ಸಹೋದರ ಸಂಪರ್ಕವನ್ನೂ **ಕೂಲ್ ಮಾಡಬಹುದು**. ಎರಡನೇ ಪ್ರಕರಣದಲ್ಲಿ ಆ ಸಹೋದರ ಸಂಪರ್ಕಕ್ಕೆ ಒಂದು ಕೂಲ್ಡೌನ್ ವಿಂಡೋ ವೆಚ್ಚವಾಗುತ್ತದೆ; ಇವೆರಡೂ ಇತಿಹಾಸ-ಆಧಾರಿತ ಲುಕ್ಅಪ್ನ ಸ್ವೀಕರಿಸಲಾದ ಸಾಧ್ಯವಾದಷ್ಟು ಉತ್ತಮ ಪ್ರಯತ್ನದ ಮಿತಿಗಳಾಗಿವೆ.
- **ವೆಚ್ಚ**: `proxy_logs` ನ ಎರಡು ಮಿತಿಗೊಳಿಸಿದ ಸ್ಕ್ಯಾನ್ಗಳು (`idx_pl_timestamp` ಮೂಲಕ ವಿಂಡೋ-ಫಿಲ್ಟರ್ ಮಾಡಲ್ಪಟ್ಟ), ಕೇವಲ 429 ಸಂಭವಿಸುವ ಆವೃತ್ತಿಯಲ್ಲಿ. ಯಾವುದೇ ಹೊಸ ಇಂಡೆಕ್ಸ್ ಇಲ್ಲ (ಮೈಗ್ರೇಶನ್ 134 YAGNI). ಮಧ್ಯಮ ಗಾತ್ರದ ನೈಜ-ಟ್ರಾಫಿಕ್ DB ಪ್ರತಿಯಲ್ಲಿ ಅಳೆಯಲಾಗಿದೆ; ಹೆಚ್ಚಿನ ಥ್ರೂಪುಟ್ ಇರುವ ಇನ್ಸ್ಟನ್ಸ್ ಅದೇ ವಿಂಡೋದಲ್ಲಿ ಅನುಪಾತಿಕವಾಗಿ ಹೆಚ್ಚು ಸಾಲುಗಳನ್ನು ಹೊಂದಿರುತ್ತದೆ.

## ಇತರ ಸ್ಥೈರ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು

- **20 ರೌಟಿಂಗ್ ತಂತ್ರಗಳು** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ನೋಡಿ.
- **ರೀಸೆಟ್-ಅವೇರ್ ರೌಟಿಂಗ್** (v3.8.0) — ಕೋಟಾ ಮರುಹೊಂದಿಸುವ ಸಮಯದ ಮೂಲಕ ಸಂಪರ್ಕಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತದೆ.
- **ಹಿನ್ನೆಲೆ ಮೋಡ್ ಡಿಗ್ರಡೇಶನ್** — Responses API `background: true` ಅನ್ನು ಎಚ್ಚರಿಕೆಯೊಂದಿಗೆ ಸಿಂಕ್ ಗೆ ಇಳಿಸಲಾಗುತ್ತದೆ.
- **ಡೈನಾಮಿಕ್ ಟೂಲ್ ಲಿಮಿಟ್ ಪತ್ತೆ** — ಟೂಲ್ ಸಂಖ್ಯೆಯ ಮಿತಿಗಳನ್ನು ತಲುಪಿದಾಗ ಪ್ರೊವೈಡರ್ಗಳನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸುತ್ತದೆ.
- **ತುರ್ತು ಫಾಲ್ಬ್ಯಾಕ್** — `OMNIROUTE_EMERGENCY_FALLBACK` ಮೂಲಕ ನಿಯಂತ್ರಿಸಲಾಗುತ್ತದೆ; ಆಪರೇಟರ್ಗಳು ಮರುಪ್ರಾರಂಭವಿಲ್ಲದೆ Feature Flags ಪುಟದಿಂದ ಅದನ್ನು ಅಧಿಕ್ರಮಿಸಬಹುದು.

---

## ಡೀಬಗ್ಗಿಂಗ್

- Weighted combo `503 all_targets_cooling_down` ಎಂದು ಉತ್ತರಿಸಿದಾಗ (`Retry-After` ಸೆಟ್ ಮಾಡಲಾಗಿದೆ, `diagnostics.excluded` ಪ್ರತಿ ಟಾರ್ಗೆಟ್ ಅನ್ನು `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ನೊಂದಿಗೆ ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ) → ಪೂಲ್ ಕಾನ್ಫಿಗರ್ ಆಗಿದೆ ಮತ್ತು ಸಂಪರ್ಕಗೊಂಡಿದೆ, ಪ್ರತಿ ಟಾರ್ಗೆಟ್ ಕೇವಲ ಸ್ಥೈರ್ಯ ಟೈಮರ್ ಮೂಲಕ ಹೊರಗಿಡಲಾಗಿದೆ; `[COMBO] Weighted selection: every target excluded before dispatch — …` ಎಚ್ಚರಿಕೆಯು ಕಾರಣಗಳು ಮತ್ತು ಉಳಿದ ಸೆಕೆಂಡುಗಳನ್ನು ಹೆಸರಿಸುತ್ತದೆ. ಅದೇ ಕಾಂಬೊದಿಂದ ಬಂದ `404 no_executable_targets` ಎಂದರೆ ಯಾವುದೇ ಸ್ಥೈರ್ಯ ಟೈಮರ್ ಭಾಗವಹಿಸಿಲ್ಲ (ಚಲಾಯಿಸಲು ಏನೂ ಇಲ್ಲ, ಅಥವಾ ಪ್ರತಿ ಖಾತೆಯು ಲಭ್ಯತೆ ಪರೀಕ್ಷೆಯಲ್ಲಿ ವಿಫಲವಾಗಿದೆ). `targetResolution.ts` ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ ಹೊರತಾಕಿಕೆಗಳಿಂದ `open-sse/services/combo/pinRecovery.ts` ನಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.
- ಪ್ರೊವೈಡರ್ಗೆ ಎಲ್ಲಾ ಕೀಲಿಗಳನ್ನು ಸ್ಕಿಪ್ ಮಾಡಲಾಗಿದೆ → circuit breaker ಸ್ಥಿತಿ ಮತ್ತು ಪ್ರತಿ ಸಂಪರ್ಕದ `rateLimitedUntil`/`testStatus` ಎರಡನ್ನೂ ಪರಿಶೀಲಿಸಿ.
- ಮರುಹೊಂದಿಸುವ ವಿಂಡೋ ನಂತರ ಪ್ರೊವೈಡರ್ ಶಾಶ್ವತವಾಗಿ ಹೊರಗಿಡಲಾಗಿದೆ → `getStatus()`/`canExecute()` ಬದಲಿಗೆ ಕಚ್ಚಾ `state` ಓದುವ ಕೋಡ್.
- ಒಂದು ಕೀಲಿ ವಿಫಲವಾಗಿದೆ, ಇತರವು ಕೆಲಸ ಮಾಡಬೇಕು → circuit breaker ಗಿಂತ connection cooldown ಅನ್ನು ಆದ್ಯತೆ ನೀಡಿ.
- ಕೇವಲ ಒಂದು ಮಾಡೆಲ್ ವಿಫಲವಾಗಿದೆ → connection cooldown ಗಿಂತ model lockout ಅನ್ನು ಆದ್ಯತೆ ನೀಡಿ.
- ಸ್ಥಿತಿ ಸ್ವಯಂ-ಚೇತರಿಸಿಕೊಳ್ಳಬೇಕು ಆದರೆ ಆಗುತ್ತಿಲ್ಲ → ಭವಿಷ್ಯದ ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್ + ಅವಧಿ ಮೀರಿದ ಸ್ಥಿತಿಯನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡುವ ಓದುವ ಮಾರ್ಗವನ್ನು ಪರಿಶೀಲಿಸಿ. ಶಾಶ್ವತ ಸ್ಥಿತಿಗಳಿಗೆ ಕೈಯಾರೆ ಬದಲಾವಣೆಗಳು ಅಗತ್ಯ.

---

## ರನ್ಟೈಮ್ ಸ್ಥಿತಿ — ಏಜೆಂಟ್ ತ್ವರಿತ ಉಲ್ಲೇಖ

> `AGENTS.md` → "Resilience Runtime State" (PR #12743) ಇಂದ ಅಕ್ಷರಶಃ ಸರಿಸಲಾಗಿದೆ, ಆದ್ದರಿಂದ ಏಜೆಂಟ್
> ಮಾರ್ಗದರ್ಶಿಯು 40k ಸಂದರ್ಭ ಬಜೆಟ್ಗಿಂತ ಕೆಳಗೆ ಉಳಿಯುತ್ತದೆ. ಇದು ಮೇಲಿನ ವಿಭಾಗಗಳ ಸಂಕ್ಷಿಪ್ತ,
> ಏಜೆಂಟ್-ಮುಖೀ ನೋಟವಾಗಿದೆ; ಸಂಖ್ಯಾತ್ಮಕ ವಿಭಾಗಗಳು ಸಂಪೂರ್ಣ ಉಲ್ಲೇಖವಾಗಿ ಉಳಿಯುತ್ತವೆ.

OmniRoute ಮೂರು ಪರಸ್ಪರ ಸಂಬಂಧಿತ ಆದರೆ ಭಿನ್ನವಾದ ತಾತ್ಕಾಲಿಕ-ವಿಫಲತೆ ಕ್ರಮಗಳನ್ನು ಹೊಂದಿದೆ. ರೌಟಿಂಗ್
ನಡವಳಿಕೆಯನ್ನು ಡೀಬಗ್ ಮಾಡುವಾಗ ಅವುಗಳ ವ್ಯಾಪ್ತಿಯನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿಡಿ. ಒಟ್ಟುನೋಟದ
ನಕ್ಷೆಗಾಗಿ
[3-ಪದರ ಸ್ಥೈರ್ಯ ರೇಖಾಚಿತ್ರ](../diagrams/exported/resilience-3layers.svg)
(ಮೂಲ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
ನೋಡಿ.

### ಪ್ರೊವೈಡರ್ ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್

**ವ್ಯಾಪ್ತಿ**: ಇಡೀ ಪ್ರೊವೈಡರ್, ಉದಾ. `glm`, `openai`, `anthropic`.

**ಉದ್ದೇಶ**: ಅಪ್ಸ್ಟ್ರೀಮ್/ಸೇವಾ ಮಟ್ಟದಲ್ಲಿ ಪದೇ ಪದೇ ವಿಫಲವಾಗುತ್ತಿರುವ ಪ್ರೊವೈಡರ್ಗೆ ಟ್ರಾಫಿಕ್ ಕಳುಹಿಸುವುದನ್ನು
ನಿಲ್ಲಿಸುವುದು, ಇದರಿಂದ ಒಂದು ಅನಾರೋಗ್ಯಕರ ಪ್ರೊವೈಡರ್ ಪ್ರತಿ ವಿನಂತಿಯನ್ನು ನಿಧಾನಗೊಳಿಸುವುದಿಲ್ಲ.

**ಅನುಷ್ಠಾನ**:

- ಕೋರ್ ಕ್ಲಾಸ್: `src/shared/utils/circuitBreaker.ts`
- ಚಾಟ್ ಗೇಟ್/ಎಕ್ಸಿಕ್ಯೂಶನ್ ವೈರಿಂಗ್: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ರನ್ಟೈಮ್ ಸ್ಥಿತಿ API: `src/app/api/monitoring/health/route.ts`
- ಹಂಚಿಕೊಂಡ ರ್ಯಾಪರ್ಗಳು: `open-sse/services/accountFallback.ts`
- ಶೇಖರಿಸಲಾದ ಸ್ಥಿತಿ ಟೇಬಲ್: `domain_circuit_breakers`

**ಸ್ಥಿತಿಗಳು** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ಸಾಮಾನ್ಯ ಟ್ರಾಫಿಕ್ ಅನ್ನು ಅನುಮತಿಸಲಾಗಿದೆ.
- `DEGRADED`: ಮುಂಚಿನ-ಎಚ್ಚರಿಕೆ ಬ್ಯಾಂಡ್ — ವಿಫಲತೆಗಳು ಡಿಗ್ರಡೇಶನ್ ಮಿತಿಯನ್ನು ದಾಟಿವೆ ಆದರೆ ಇನ್ನೂ
  ಬ್ರೇಕರ್ ಮಿತಿಯನ್ನು ದಾಟಿಲ್ಲ; ಟ್ರಾಫಿಕ್ ಇನ್ನೂ ಹರಿಯುತ್ತದೆ, ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳು ಎಚ್ಚರಿಕೆಯನ್ನು ತೋರಿಸುತ್ತವೆ. ಮಾನ್ಯ
  ಸಂಪರ್ಕ ಪರೀಕ್ಷೆ ಅಥವಾ ಹೊಸ ವಿಫಲತೆಯಿಲ್ಲದ ಶಾಂತ ವಿಂಡೋ ಅದನ್ನು `CLOSED` ಗೆ
  ಹಿಂತಿರುಗಿಸುತ್ತದೆ (`docs/architecture/RESILIENCE_GUIDE.md` ನಲ್ಲಿ ವಿಂಡೋ ಇದೆ).
- `OPEN`: ಪ್ರೊವೈಡರ್ ತಾತ್ಕಾಲಿಕವಾಗಿ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ; ಕರೆದವರಿಗೆ ಪ್ರೊವೈಡರ್-ಸರ್ಕ್ಯೂಟ್-ತೆರೆದ
  ಪ್ರತಿಕ್ರಿಯೆ ಸಿಗುತ್ತದೆ ಅಥವಾ ಕಾಂಬೊ ರೌಟಿಂಗ್ ಬೇರೆ ಟಾರ್ಗೆಟ್ಗೆ ಸ್ಕಿಪ್ ಮಾಡುತ್ತದೆ.
- `HALF_OPEN`: ಮರುಹೊಂದಿಸುವ ಸಮಯಮಿತಿ ಕಳೆದಿದೆ; ಪರೀಕ್ಷಾ ವಿನಂತಿಯನ್ನು ಅನುಮತಿಸಿ. ಯಶಸ್ಸು
  ಬ್ರೇಕರ್ ಅನ್ನು ಮುಚ್ಚುತ್ತದೆ, ವಿಫಲತೆಯು ಅದನ್ನು ಮತ್ತೆ ತೆರೆಯುತ್ತದೆ.

**ಡೀಫಾಲ್ಟ್ಗಳು** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
`src/lib/resilience/settings.ts` ನಲ್ಲಿರುವ `DEFAULT_RESILIENCE_SETTINGS.providerBreaker`
ಮೂಲಕ ಬಳಸಲಾಗುತ್ತದೆ → `src/sse/handlers/chatHelpers.ts` ನಲ್ಲಿ
`getCircuitBreaker(provider, …)`). ಇಡೀ-ಪ್ರೊವೈಡರ್ ಬ್ರೇಕರ್ `circuitBreakerThreshold` /
`circuitBreakerReset` ಮೇಲೆ ಚಲಿಸುತ್ತದೆ:

| ಪ್ರೊಫೈಲ್ | ಡಿಗ್ರೇಡ್ ಆಗುವ ಸ್ಥಾನ | ತೆರೆಯುವ ಸ್ಥಾನ (`circuitBreakerThreshold`) | ಮರುಹೊಂದಿಸುವುದು (`circuitBreakerReset`) |
| -------- | ------------------: | ----------------------------------------: | -------------------------------------: |
| OAuth    |                 `5` |                                       `8` |                                  `60s` |
| API key  |                 `7` |                                      `12` |                                  `30s` |
| Local    |       (ಲೆಕ್ಕಹಾಕಲಾದ) |                                       `2` |                                  `15s` |

`PROVIDER_PROFILES` ಸಹ `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 ನಿಮಿಷ) ಮತ್ತು `providerCooldownMs` (5/10/1 ನಿಮಿಷ) ಅನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತದೆ: ಇವು
**ಆಪ್ಟ್-ಇನ್ ಗ್ಲೋಬಲ್ Provider Cooldown ನ ವಿಂಡೋ ಗೇಟ್** ಅನ್ನು ಚಾಲಾಯಿಸುತ್ತವೆ (`PROVIDER_COOLDOWN_ENABLED`, ಡೀಫಾಲ್ಟ್
ಆಫ್) — `open-sse/services/providerCooldownTracker.ts` ನಲ್ಲಿನ ಪ್ರೊವೈಡರ್-ಮಟ್ಟದ ಎಂಟ್ರಿಯು
`providerFailureWindowMs` ಒಳಗೆ `providerFailureThreshold` ವಿಫಲತೆಗಳ ನಂತರ ಮಾತ್ರ
ಕೂಲಿಂಗ್ ಆಗುತ್ತಿದೆ ಎಂದು ಎಣಿಸಲಾಗುತ್ತದೆ, ಮತ್ತು ನಂತರ `providerCooldownMs` ಗಾಗಿ ಕೂಲ್ ಆಗುತ್ತದೆ. ಇವು
ಲೈವ್ ಬ್ರೇಕರ್ನ ಮಿತಿಗಳಲ್ಲ — ಬ್ರೇಕರ್ ನಡವಳಿಕೆಯನ್ನು ನಿರೀಕ್ಷಿಸಿ ಅವುಗಳನ್ನು ಟ್ಯೂನ್ ಮಾಡಬೇಡಿ. ಪ್ರತಿ ಡೀಫಾಲ್ಟ್ ಅನ್ನು
`OMNIROUTE_PROVIDER_BREAKER_*` ಮತ್ತು `OMNIROUTE_CIRCUIT_BREAKER_*` ಎನ್ವಿ ವೇರಿಯೇಬಲ್ಗಳ ಮೂಲಕ
ಅಧಿಕ್ರಮಿಸಬಹುದು; ರನ್ಟೈಮ್-ನಿಖರ ಉಲ್ಲೇಖ ಟೇಬಲ್ `docs/architecture/RESILIENCE_GUIDE.md`
ನಲ್ಲಿ ಇದೆ.

ಪ್ರೊವೈಡರ್-ಮಟ್ಟದ ವಿಫಲತೆ ಸ್ಥಿತಿಗಳು ಮಾತ್ರ ಪ್ರೊವೈಡರ್ ಬ್ರೇಕರ್ ಅನ್ನು ಟ್ರಿಪ್ ಮಾಡಬೇಕು:

```ts
(408, 500, 502, 503, 504);
```

ಹೆಚ್ಚಿನ `401`, `403`, ಅಥವಾ `429` ಸಂದರ್ಭಗಳಂತಹ ಸಾಮಾನ್ಯ ಖಾತೆ/ಕೀಲಿ/ಮಾಡೆಲ್ ದೋಷಗಳಿಗೆ
ಇಡೀ-ಪ್ರೊವೈಡರ್ ಬ್ರೇಕರ್ ಅನ್ನು ಟ್ರಿಪ್ ಮಾಡಬೇಡಿ. ಅವು ಸಾಮಾನ್ಯವಾಗಿ connection cooldown ಅಥವಾ
model lockout ಗೆ ಸೇರಿವೆ. ಸಾಮಾನ್ಯ API-ಕೀಲಿ ಪ್ರೊವೈಡರ್ `403` ಅನ್ನು ಟರ್ಮಿನಲ್
ಪ್ರೊವೈಡರ್/ಖಾತೆ ದೋಷವೆಂದು ವರ್ಗೀಕರಿಸದ ಹೊರತು ಚೇತರಿಸಿಕೊಳ್ಳಬಹುದಾದುದಾಗಿರಬೇಕು.

ಬ್ರೇಕರ್ ಹಿನ್ನೆಲೆ ಟೈಮರ್ ಬಳಸದೆ, ಸೋಮಾರಿ ಚೇತರಿಕೆಯನ್ನು (lazy recovery) ಬಳಸುತ್ತದೆ. `OPEN` ಅವಧಿ ಮುಗಿದಾಗ, `getStatus()`, `canExecute()`, ಮತ್ತು `getRetryAfterMs()` ನಂತಹ ಓದುವಿಕೆಗಳು ಸ್ಥಿತಿಯನ್ನು `HALF_OPEN` ಗೆ ರಿಫ್ರೆಶ್ ಮಾಡುತ್ತವೆ, ಆದ್ದರಿಂದ ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳು ಮತ್ತು ಕಾಂಬೊ ಅಭ್ಯರ್ಥಿ ನಿರ್ಮಾಪಕರು ಅವಧಿ ಮೀರಿದ ಪ್ರೊವೈಡರ್ ಅನ್ನು ಶಾಶ್ವತವಾಗಿ ಹೊರಗಿಡುತ್ತಲೇ ಇರುವುದಿಲ್ಲ.

### ಸಂಪರ್ಕ ಕೂಲ್ಡೌನ್

**ವ್ಯಾಪ್ತಿ**: ಒಂದು ಪ್ರೊವೈಡರ್ ಸಂಪರ್ಕ/ಖಾತೆ/ಕೀ.

**ಉದ್ದೇಶ**: ಅದೇ ಪ್ರೊವೈಡರ್ಗಾಗಿ ಇತರ ಸಂಪರ್ಕಗಳು ವಿನಂತಿಗಳನ್ನು ಸೇವಿಸುತ್ತಲೇ ಇರಲು ಅವಕಾಶ ನೀಡುತ್ತಾ, ಒಂದು ಕೆಟ್ಟ ಕೀ/ಖಾತೆಯನ್ನು ತಾತ್ಕಾಲಿಕವಾಗಿ ಬಿಟ್ಟುಬಿಡುವುದು.

**ಅನುಷ್ಠಾನ**:

- ಬರಹ/ನವೀಕರಣ ಮಾರ್ಗ: `src/sse/services/auth.ts::markAccountUnavailable()`
- ಖಾತೆ ಆಯ್ಕೆ/ಶೋಧನೆ: `src/sse/services/auth.ts::getProviderCredentials...`
- ಕೂಲ್ಡೌನ್ ಲೆಕ್ಕಾಚಾರ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ಸೆಟ್ಟಿಂಗ್ಗಳು: `src/lib/resilience/settings.ts`

ಪ್ರೊವೈಡರ್ ಸಂಪರ್ಕಗಳ ಮೇಲಿನ ಪ್ರಮುಖ ಫೀಲ್ಡ್ಗಳು:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ಖಾತೆ ಆಯ್ಕೆಯ ಸಮಯದಲ್ಲಿ, ಈ ಕೆಳಗಿನ ಸ್ಥಿತಿಯಿದ್ದಾಗ ಸಂಪರ್ಕವನ್ನು ಬಿಟ್ಟುಬಿಡಲಾಗುತ್ತದೆ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

ಕೂಲ್ಡೌನ್ಗಳು ಸಹ ಸೋಮಾರಿಯಾಗಿವೆ: `rateLimitedUntil` ಹಿಂದಿನ ಸಮಯದಲ್ಲಿದ್ದಾಗ, ಸಂಪರ್ಕವು ಮತ್ತೆ ಅರ್ಹವಾಗುತ್ತದೆ. ಯಶಸ್ವಿ ಬಳಕೆಯ ನಂತರ, `clearAccountError()` `testStatus`, `rateLimitedUntil`, ದೋಷ ಫೀಲ್ಡ್ಗಳು ಮತ್ತು `backoffLevel` ಅನ್ನು ತೆರವುಗೊಳಿಸುತ್ತದೆ.

ಡೀಫಾಲ್ಟ್ ಸಂಪರ್ಕ ಕೂಲ್ಡೌನ್ ನಡವಳಿಕೆ:

- OAuth ಮೂಲ ಕೂಲ್ಡೌನ್: `5s`.
- API-ಕೀ ಮೂಲ ಕೂಲ್ಡೌನ್: `3s`.
- API-ಕೀ `429` ಲಭ್ಯವಿದ್ದಾಗ ಅಪ್ಸ್ಟ್ರೀಮ್ ಮರುಪ್ರಯತ್ನ ಸುಳಿವುಗಳಿಗೆ (`Retry-After`, ರೀಸೆಟ್ ಹೆಡರ್ಗಳು, ಅಥವಾ ಪಾರ್ಸ್ ಮಾಡಬಹುದಾದ ರೀಸೆಟ್ ಪಠ್ಯ) ಆದ್ಯತೆ ನೀಡಬೇಕು.
- ಪುನರಾವರ್ತಿತ ಚೇತರಿಸಿಕೊಳ್ಳಬಹುದಾದ ವಿಫಲತೆಗಳು ಘಾತಾಂಕೀಯ ಬ್ಯಾಕ್ಆಫ್ ಅನ್ನು ಬಳಸುತ್ತವೆ:

```ts
baseCooldownMs * 2 ** failureIndex;
```

ಆಂಟಿ-ಥಂಡರಿಂಗ್-ಹರ್ಡ್ ರಕ್ಷಣೆಯು (anti-thundering-herd guard) ಅದೇ ಸಂಪರ್ಕದ ಮೇಲಿನ ಏಕಕಾಲಿಕ ವಿಫಲತೆಗಳು ಕೂಲ್ಡೌನ್ ಅನ್ನು ಪದೇ ಪದೇ ವಿಸ್ತರಿಸುವುದನ್ನು ಅಥವಾ `backoffLevel` ಅನ್ನು ಎರಡು ಬಾರಿ ಹೆಚ್ಚಿಸುವುದನ್ನು ತಡೆಯುತ್ತದೆ.

ಟರ್ಮಿನಲ್ ಸ್ಥಿತಿಗಳು ಕೂಲ್ಡೌನ್ಗಳಲ್ಲ. `banned`, `expired` (`EXPIRED_RETRY_MAX` ಮೂಲಕ N ಸೀಮಿತ ಮರುಪ್ರಯತ್ನಗಳ ನಂತರ ಮಾತ್ರ ಟರ್ಮಿನಲ್ ಆಗುತ್ತದೆ), ಮತ್ತು `credits_exhausted` ಗಳು ರುಜುವಾತುಗಳು/ಸೆಟ್ಟಿಂಗ್ಗಳು ಬದಲಾಗುವವರೆಗೆ ಅಥವಾ ಆಪರೇಟರ್ ಅವುಗಳನ್ನು ರೀಸೆಟ್ ಮಾಡುವವರೆಗೆ ಲಭ್ಯವಿಲ್ಲದಂತೆಯೇ ಉಳಿಯುವುದು ಉದ್ದೇಶ. ತಾತ್ಕಾಲಿಕ ಕೂಲ್ಡೌನ್ ಸ್ಥಿತಿಯೊಂದಿಗೆ ಟರ್ಮಿನಲ್ ಸ್ಥಿತಿಗಳನ್ನು ಬದಲಾಯಿಸಬೇಡಿ.

### ಮಾದರಿ ಲಾಕ್ಔಟ್

**ವ್ಯಾಪ್ತಿ**: ಪ್ರೊವೈಡರ್ + ಸಂಪರ್ಕ + ಮಾದರಿ.

**ಉದ್ದೇಶ**: ಆ ಸಂಪರ್ಕಕ್ಕೆ ಕೇವಲ ಒಂದು ಮಾದರಿ ಲಭ್ಯವಿಲ್ಲದಿದ್ದಾಗ ಅಥವಾ ಕೋಟಾ-ಸೀಮಿತವಾಗಿದ್ದಾಗ, ಇಡೀ ಸಂಪರ್ಕವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವುದನ್ನು ತಪ್ಪಿಸುವುದು.

ಉದಾಹರಣೆಗಳು:

- ಪ್ರತಿ-ಮಾದರಿ ಕೋಟಾ ಪ್ರೊವೈಡರ್ಗಳು `429` ಹಿಂತಿರುಗಿಸುವುದು.
- ಒಂದು ಕಾಣೆಯಾದ ಮಾದರಿಗಾಗಿ ಸ್ಥಳೀಯ ಪ್ರೊವೈಡರ್ಗಳು `404` ಹಿಂತಿರುಗಿಸುವುದು.
- ಆಯ್ದ Grok ಮೋಡ್ಗಳಂತಹ ಪ್ರೊವೈಡರ್-ನಿರ್ದಿಷ್ಟ ಮೋಡ್/ಮಾದರಿ ಅನುಮತಿ ವಿಫಲತೆಗಳು.

ಮಾದರಿ ಲಾಕ್ಔಟ್ `open-sse/services/accountFallback.ts` ನಲ್ಲಿ ಇದೆ ಮತ್ತು ಅದೇ ಸಂಪರ್ಕವು ಇತರ ಮಾದರಿಗಳಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಲೇ ಇರಲು ಅನುಮತಿಸುತ್ತದೆ.

### ಡಿಬಗ್ಗಿಂಗ್ ಮಾರ್ಗದರ್ಶನ

- ಪ್ರೊವೈಡರ್ಗಾಗಿ ಎಲ್ಲಾ ಕೀಗಳನ್ನು ಬಿಟ್ಟುಬಿಡಲಾಗಿದ್ದರೆ, ಪ್ರೊವೈಡರ್ ಬ್ರೇಕರ್ ಸ್ಥಿತಿ ಮತ್ತು ಪ್ರತಿ ಸಂಪರ್ಕದ `rateLimitedUntil`/`testStatus` ಎರಡನ್ನೂ ಪರಿಶೀಲಿಸಿ.
- ರೀಸೆಟ್ ವಿಂಡೋ ನಂತರ ಪ್ರೊವೈಡರ್ ಶಾಶ್ವತವಾಗಿ ಹೊರಗಿಡಲಾಗಿರುವಂತೆ ತೋಚಿದರೆ, `getStatus()`/`canExecute()` ಬಳಸುವ ಬದಲು ಕೋಡ್ ಕಚ್ಚಾ `state` ಅನ್ನು ಓದುತ್ತಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.
- ಒಂದು ಪ್ರೊವೈಡರ್ ಕೀ ವಿಫಲವಾದರೆ ಆದರೆ ಇತರವು ಕೆಲಸ ಮಾಡಬೇಕಾದರೆ, ಪ್ರೊವೈಡರ್ ಬ್ರೇಕರ್ಗಿಂತ ಸಂಪರ್ಕ ಕೂಲ್ಡೌನ್ ಅನ್ನು ಆದ್ಯತೆ ನೀಡಿ.
- ಕೇವಲ ಒಂದು ಮಾದರಿ ವಿಫಲವಾದರೆ, ಸಂಪರ್ಕ ಕೂಲ್ಡೌನ್ಗಿಂತ ಮಾದರಿ ಲಾಕ್ಔಟ್ ಅನ್ನು ಆದ್ಯತೆ ನೀಡಿ.
- ಒಂದು ಸ್ಥಿತಿ ತಾನಾಗಿ ಚೇತರಿಸಿಕೊಳ್ಳಬೇಕಾದರೆ, ಅದು ಭವಿಷ್ಯದ ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್/ರೀಸೆಟ್ ಟೈಮ್ಔಟ್ ಮತ್ತು ಅವಧಿ ಮೀರಿದ ಸ್ಥಿತಿಯನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡುವ ಓದುವ ಮಾರ್ಗವನ್ನು ಹೊಂದಿರಬೇಕು. ಶಾಶ್ವತ ಸ್ಥಿತಿಗಳಿಗೆ ಹಸ್ತಚಾಲಿತ ರುಜುವಾತು ಅಥವಾ ಕಾನ್ಫಿಗ್ ಬದಲಾವಣೆಗಳು ಅಗತ್ಯವಿರುತ್ತವೆ.

---

## TLS ಫಿಂಗರ್ಪ್ರಿಂಟಿಂಗ್ & ಸ್ಟೆಲ್ತ್

ಪ್ರೊವೈಡರ್-ನಿರ್ದಿಷ್ಟ ಸ್ಟೆಲ್ತ್ (JA3/JA4, CCH, ಅಸ್ಪಷ್ಟೀಕರಣ) ಪ್ರತ್ಯೇಕವಾಗಿ ದಾಖಲೀಕರಿಸಲಾಗಿದೆ — `docs/security/STEALTH_GUIDE.md` ಅನ್ನು ನೋಡಿ (git; `/docs` ಗೆ ಕಂಪೈಲ್ ಮಾಡಲಾಗಿಲ್ಲ).

---

## ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ಪರೀಕ್ಷೆ (ಹಂತ 8 · ಬ್ಲಾಕ್ C)

ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ತರ್ಕದ ಯೂನಿಟ್ ಟೆಸ್ಟ್ಗಳಿಗೆ ಹೆಚ್ಚುವರಿಯಾಗಿ, ಮೂರು ಟೆಸ್ಟ್ಗಳು ನಿಜವಾದ ಒತ್ತಡ/ವೈಫಲ್ಯ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ ರನ್ಟೈಮ್ ಅನ್ನು ಚಲಾಯಿಸುತ್ತವೆ (ಎಲ್ಲವೂ integration/nightly — ಯಾವುದೂ PR ಗಳನ್ನು ನಿರ್ಬಂಧಿಸುವುದಿಲ್ಲ):

| ಟೆಸ್ಟ್      | ಏನು                                                                                                                                                                                                                                    | ರನ್                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | ನಕಲಿ-ಅಪ್ಸ್ಟ್ರೀಮ್ ನೋಡ್ ನಿಜವಾದ latency/reset/timeout/503 ಅನ್ನು ಇಂಜೆಕ್ಟ್ ಮಾಡುತ್ತದೆ; ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ ತೆರೆಯುತ್ತದೆ/ಮರುಪಡೆಯುತ್ತದೆ ಮತ್ತು `checkFallbackError` 503 ಅನ್ನು ಮರುಪಡೆಯಬಹುದಾದ ಫಾಲ್ಬ್ಯಾಕ್ ಎಂದು ವರ್ಗೀಕರಿಸುತ್ತದೆ ಎಂದು ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` ಅಡಿಯಲ್ಲಿ `createSSEStream` ಗೆ ಸುಮಾರು 500 ಸ್ಟ್ರೀಮ್ಗಳು; ಹೀಪ್ ಮಿತಿಯನ್ನು ಮೀರಿ ಬೆಳದರೆ ವಿಫಲವಾಗುತ್ತದೆ (OOM ಗಾರ್ಡ್ #3069).                                                                                                       | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` ವಿರುದ್ಧ ನಿರಂತರ ಲೋಡ್; p95/ದೋಷ ಮಿತಿಗಳು.                                                                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` ಮೂಲಕ ಸಂಯೋಜಿಸಲಾಗಿದೆ (cron + dispatch). ಡೀಫಾಲ್ಟ್ `test:integration` ನಲ್ಲಿ, chaos ಮತ್ತು heap ಸ್ವಯಂ-ಸ್ಕಿಪ್ ಆಗುತ್ತವೆ (`RUN_CHAOS_INT`/`--expose-gc` ಇಲ್ಲದೆ).

---

## ಇದನ್ನೂ ನೋಡಿ

- [ಆರ್ಕಿಟೆಕ್ಚರ್ ಮಾರ್ಗದರ್ಶಿ](./ARCHITECTURE.md) — ಸಿಸ್ಟಮ್ ಆರ್ಕಿಟೆಕ್ಚರ್ ಮತ್ತು ಆಂತರಿಕಗಳು
- [ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ](../guides/USER_GUIDE.md) — ಪ್ರೊವೈಡರ್ಗಳು, ಕಾಂಬೊಗಳು, CLI ಏಕೀಕರಣ
- [Auto-Combo ಎಂಜಿನ್](../routing/AUTO-COMBO.md) — 16-ಅಂಶದ ಸ್ಕೋರಿಂಗ್, ಮೋಡ್ ಪ್ಯಾಕ್ಗಳು
