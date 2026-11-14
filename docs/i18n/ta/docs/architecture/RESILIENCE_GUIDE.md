# Resilience Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute மூன்று வேறுபட்ட ஆனால் தொடர்புடைய பின்னடைவு வழிமுறைகளைக் கொண்டுள்ளது. ஒவ்வொன்றும் வெவ்வேறு நோக்கமும் நோக்கமும் கொண்டது. ரூட்டிங் நடத்தை பிழைத்திருத்தம் செய்யும் போது அவற்றை தனித்தனியாக வைத்திருங்கள்.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> ஆதாரம்: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **மீள்தன்மை நிலைமாற்றத்திற்கான Env-vs-டாஷ்போர்டு முன்னுரிமை.** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — க்கு மட்டுமே _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) ஐ மட்டுமே வழங்கும் தேர்வு-இன் மீள்தன்மை சூழலில் இருந்து விதைக்கப்படுகிறது. ஒரு பூலியன் `resilienceSettings` (டாஷ்போர்டு →** அமைப்புகள் → மீள்தன்மை** / `PATCH /api/resilience`, `key_value` இல் சேமிக்கப்பட்டது ) env மதிப்பை வெல்லும்: இயல்பாக்கம் (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) சேமிக்கப்பட்ட பூலியன் இருக்கும் போதெல்லாம் வைத்திருக்கும். டாஷ்போர்டு ஏற்கனவே `false` சேமித்து வைத்திருக்கும் ஒரு வரிசைப்படுத்தலில், அத்தகைய env var ஐ `true` ஆக அமைப்பதால், — எதையும் மாற்றாது** அமைப்புகள் → மீள்தன்மை** (அல்லது சேமிக்கப்பட்ட புலத்தை அழிக்கவும்) அதற்கு பதிலாக.

## 1. வழங்குநர் சுற்று முறிப்பான்

**செயல்பரப்பு:** முழு வழங்குநர் (எ.கா., `glm`, `openai`, `anthropic`).

**நோக்கம்:** மேல்நிலை/சேவை மட்டத்தில் தொடர்ந்து தோல்வியடையும் வழங்குநருக்குப் போக்குவரத்தை அனுப்புவதை நிறுத்துதல்.

**செயலாக்கம்:**

- மைய வகுப்பு: `src/shared/utils/circuitBreaker.ts`
- இணைப்பு அமைப்பு: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- நிலை API: `GET /api/monitoring/health`
- மீட்டமைப்பு API: `POST /api/resilience/reset`
- சுற்றுப்பொதிகள்: `open-sse/services/accountFallback.ts`
- DB அட்டவணை: `domain_circuit_breakers`

**நிலைகள்:**

- `CLOSED` — இயல்பான போக்குவரத்து அனுமதிக்கப்படும்
- `DEGRADED` — போக்குவரத்து இன்னும் அனுமதிக்கப்படும், ஆனால் அதிகரித்த வழங்குநர் தோல்விகள் கண்காணிக்கப்படும்; போதுமான வெற்றிகள் கிடைக்கும்போது, செல்லுபடியாகும் இணைப்புச் சோதனை நிகழும்போது, அல்லது கடைசி தோல்வி வகைக்கான மிக நீண்ட `OPEN` நிறுத்தக் காலம் (அதன் `cooldownByKind` மதிப்பு; அது இல்லையெனில் `resetTimeout`, × `maxBackoffMultiplier`, குறைந்தது ஒரு இடைநிறுத்தக் காலம்) புதிய தோல்வி இல்லாமல் கடந்த பின்னர் `CLOSED` நிலைக்குத் திரும்பும்
- `OPEN` — வழங்குநர் தற்காலிகமாகத் தடுக்கப்படுவார்; கூட்டுவழித்தடம் அவரைத் தவிர்க்கும்
- `HALF_OPEN` — மீட்டமைப்பு நேரக்கெடு முடிந்தது; சோதனைக் கோரிக்கை அனுமதிக்கப்படும்

**உள்ளமைக்கக்கூடிய இயல்புநிலைகள் (`open-sse/config/constants.ts`, கட்டுப்பாட்டுப் பலகம் → அமைப்புகள் → மீள்திறன் என்பதில் கிடைக்கும்):**

| வகுப்பு  | சீர்குன்றும் நிலை | திறக்கும் நிலை | மீட்டமைப்பு நேரக்கெடு |
| -------- | ----------------- | -------------- | --------------------- |
| OAuth    | 5 தோல்விகள்       | 8 தோல்விகள்    | 60s                   |
| API விசை | 7 தோல்விகள்       | 12 தோல்விகள்   | 30s                   |
| உள்ளூர்  | பெறப்பட்டது       | 2 தோல்விகள்    | 15s                   |

வழங்குநர் எப்போது `DEGRADED` நிலைக்குச் செல்கிறார் என்பதை `degradationThreshold` கட்டுப்படுத்துகிறது; அவர் எப்போது திறக்கப்பட்டுத் தவிர்க்கப்படுகிறார் என்பதை `failureThreshold` கட்டுப்படுத்துகிறது. உள்ளூர் வழங்குநர் சுயவிவரங்கள் மீள்திறன் அமைப்புகள் பக்கத்தில் இன்னும் காட்டப்படவில்லை.

**முறிப்பைத் தூண்டும் குறியீடுகள்:** வழங்குநர் மட்டத்திலான `[408, 500, 502, 503, 504]` நிலைகள் மட்டுமே. கணக்கு மட்டத்திலான பிழைகளுக்காக (பெரும்பாலான 401/403/429 — அவை இடைநிறுத்தம் அல்லது பூட்டுதலுக்குரியவை) முறிப்பைத் தூண்ட வேண்டாம்.

**தேவைக்கேற்ற மீட்பு:** `OPEN` காலாவதியாகும்போது, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ஆகியவை நிலையை `HALF_OPEN` ஆகப் புதுப்பிக்கும். இதே வாசிப்புகளும் (அடுத்த தோல்வியும்) காலாவதியான `DEGRADED` நிலையை மீண்டும் `CLOSED` ஆக மாற்றும். பின்னணி நேரக் கணிப்பான் தேவையில்லை.

---

### விருப்பத்தேர்வு உலகளாவிய வழங்குநர் இடைநிறுத்தம் (சாளரத் தடுப்பு)

நான்காவது, **விருப்பத்தேர்வு** அடுக்கு (`PROVIDER_COOLDOWN_ENABLED`, இயல்பாக **முடக்கப்பட்டுள்ளது**) தோல்வியடையும்
வழங்குநர்களைப் பற்றிய கோரிக்கைகளுக்கு இடையிலான நினைவகத்தை
`open-sse/services/providerCooldownTracker.ts` என்பதில் பராமரிக்கிறது; தொடர்ச்சியான கூட்டுக் கோரிக்கைகள், சற்றுமுன்
தோல்வியடைந்த வழங்குநரை மீண்டும் முயற்சிப்பதை நிறுத்தும் வகையில், கூட்டுத் இலக்கு
தீர்மானத்தின்போது இது பரிசீலிக்கப்படுகிறது. வழங்குநர் மட்ட உள்ளீடுகள் `PROVIDER_PROFILES` சாளரத் தடுப்பைப் பின்பற்றுகின்றன:

| சுயவிவரம் | இதற்குப் பிறகு தூண்டப்படும் (`providerFailureThreshold`) | இந்தக் காலத்திற்குள் (`providerFailureWindowMs`) | இடைநிறுத்தக் காலம் (`providerCooldownMs`) |
| --------- | -------------------------------------------------------: | -----------------------------------------------: | ----------------------------------------: |
| OAuth     |                                                     `10` |                                          `15min` |                                    `5min` |
| API விசை  |                                                     `15` |                                          `30min` |                                   `10min` |

வரம்புக்குக் கீழே வழங்குநர் **இடைநிறுத்தத்தில்** இருப்பதாகக் கருதப்படமாட்டார்; ஒரு வெற்றி
சாளரத்தை அழிக்கும். அதற்குப் பதிலாக, இணைப்பு மட்ட உள்ளீடுகள் (`provider:connectionId`)
அடுக்குக்குறி `minRetryCooldownMs → maxRetryCooldownMs` பின்னடைவைத் தொடர்ந்து பயன்படுத்தும். மேலெழுதல்கள்:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
பின்னடைவு பாதுகாப்புச் சோதனை: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. இணைப்பு கூல்டவுன்

**நோக்கம்:** ஒற்றை வழங்குநர் connection/account/key.

**நோக்கம்:** அதே வழங்குனருக்கான மற்ற இணைப்புகள் தொடர்ந்து சேவை செய்யும் போது ஒரு மோசமான விசையைத் தவிர்க்கவும்.

**செயல்படுத்தல்:**

- கிடைக்கவில்லை எனக் குறி: `src/sse/services/auth.ts::markAccountUnavailable()`
- தேர்வு: அதே கோப்பில் `getProviderCredentials*`
- கூல்டவுன் கணக்கீடு: `open-sse/services/accountFallback.ts::checkFallbackError()`
- அமைப்புகள்: `src/lib/resilience/settings.ts`

**ஒரு இணைப்பிற்கான புலங்கள்:**

- கூல்டவுன் காலாவதியாகும் வரை`rateLimitedUntil` — நேர முத்திரை
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — அதிவேக பேக்ஆஃப் கவுண்டர்

**இயல்புநிலை கூல்டவுன்கள்:**

- OAuth அடிப்படை: 5வி
- ஏபிஐ-விசை அடிப்படை: 3வி
- ஏபிஐ-விசை 429: அப்ஸ்ட்ரீம் `Retry-After`/reset headers/parseable ரீசெட் உரையை விரும்புகிறது
- பின்வாங்கல்: `baseCooldownMs * 2 ** failureIndex`

**ஒவ்வொரு வழங்குநருக்கும் மீண்டும் முயற்சி தாமதம்.** வழங்குநர் விவரம் பக்கத்தில் ஒரு உள்ளது** தாமதத்தை மீண்டும் முயற்சிக்கவும்** தேர்ந்தெடுக்கவும் (ஆட்டோ, 15 வி முதல் 1 மணிநேரம் வரை). இது `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, `PATCH /api/resilience` மூலம்) சேமிக்கிறது. விகித வரம்புப் பிழையானது அப்ஸ்ட்ரீம் மறுமுயற்சிக் குறிப்பைக் கொண்டிருக்கவில்லை என்றால், அந்த மதிப்பு வழங்குனருக்கான அளவிடப்பட்ட பின்னடைவை மாற்றுகிறது மற்றும் `backoffLevel` 0 (`open-sse/services/rotationConfig.ts::overrideFor`) க்கு மீட்டமைக்கிறது. விகித-வரையறுக்கப்பட்ட பிழைக்கான முன்னுரிமை, அதிகபட்சம் முதலில்: அப்ஸ்ட்ரீம் மறுமுயற்சி குறிப்பு, பின்னர் ஒவ்வொரு இணைப்புக்கும் `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, பின்னர் ஒவ்வொரு வழங்குநருக்கும் மறுமுயற்சி தாமதம், பின்னர் env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, பின்னர் அளவிடப்பட்ட பின்னடைவு. தானியங்கு புலத்தை நீக்குகிறது. இது விகித வரம்பு காரணத்தை மட்டுமே பாதிக்கிறது, ஒருபோதும் முனைய நிலைகளில் இருக்காது.

**இடி எதிர்ப்பு-மந்தை காவலர்:** கூல்டவுனை அதிகமாக நீட்டிப்பதில் இருந்தும் அல்லது `backoffLevel` இருமுறை அதிகரிப்பதிலிருந்தும் ஒரே நேரத்தில் ஏற்படும் தோல்விகளைத் தடுக்கிறது.

**ஒத்திசைவு-வரம்பு 429கள் பேக்ஆஃப் ஏணியில் ஏறாது.** ஒரு `429` அதன் உடல் ஒரு ஒத்திசைவு வரம்பைப் புகாரளிக்கும் ("மிக அதிகமான ஒரே நேரத்தில் கோரிக்கைகள்", "ஒத்திசைவு வரம்பு", "இணை கோரிக்கை வரம்பு", GLM `并发数过高`) என்றால் கணக்கு ஆரோக்கியமானது ஆனால் பிஸியாக உள்ளது. `checkFallbackError()` காரணம் `concurrency_limited` வழங்குகிறது: இப்போது அடுத்த இணைப்பில் தோல்வியடைந்து, நிலையான `CONCURRENCY_LIMIT_COOLDOWN_MS` (1வி) அல்லது அப்ஸ்ட்ரீம் மறுமுயற்சி குறிப்பிற்கு இதை குளிர்விக்கவும், `backoffLevel` மாற்றாமல் வைத்து, `skipProviderBreaker` அமைக்கவும். வெளிப்படையான ஒதுக்கீட்டு அமைப்பு இன்னும் வெற்றி பெறுகிறது, எனவே ஒதுக்கீட்டு முறையுடன் பொருந்தக்கூடிய அமைப்பும் ஒதுக்கீட்டுத் தீர்ப்பாகவே இருக்கும். கண்டறிதல்: `looksLikeConcurrencyLimit()` இல் `src/shared/utils/classify429.ts`; தீர்ப்பு: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (பிரேக்கரின் `FailureKind`) மாறாமல் உள்ளது மேலும் இந்த உடல்களுக்கு `rate_limit` படிக்கிறது.

**ஸ்ட்ரீம் உள்ளடக்க ஸ்டால்கள் கணக்கை குளிர்விக்காது.** சரியான நேரத்தில் மாதிரி வெளியீட்டை அனுப்பாத ஸ்ட்ரீமை உள்ளடக்க-ஸ்டால் கண்காணிப்புக் குழு (`open-sse/utils/streamHandler.ts`) கைவிடும்போது, `markAccountUnavailable()` இணைப்பில் பிழையைப் பதிவுசெய்கிறது, ஆனால் கூல்டவுனை அமைக்காது: ஸ்டால் அந்தக் கோரிக்கையைச் சார்ந்தது, பெரும்பாலும் இன்னும் வெளியீடு இல்லாமல் நீண்ட பகுத்தறிவு திருப்பமாக இருக்கும். ஆபரேட்டர்கள் `resilienceSettings.streamStallCooldown.enabled` (இயல்புநிலை `false`) உடன் மீண்டும் தேர்வு செய்யலாம்.

**`p2c` கணக்குத் தேர்வுக்கான தாமத சமிக்ஞையைத் தேர்வுசெய்யவும்.** ஒவ்வொரு அனுப்பப்பட்ட முயற்சியும் அதன் நேரத்திலிருந்து முதல் பைட் மற்றும் ஒரு இணைப்புக்கான விளைவை (மற்றும் ஒரு இணைப்பு + மாதிரி) நினைவகத்தில் உருளும் சாளரத்தில் பதிவு செய்கிறது: கடைசி 20 மாதிரிகள் 15 நிமிடங்களுக்குள் (`open-sse/services/connectionLatencyTracker.ts`, `safeLogEvents()` இலிருந்து `src/sse/handlers/chatHelpers.ts` இல் பதிவு செய்யப்பட்டது). `resilienceSettings.p2cLatency.weight` `0` மேல் இருக்கும் போது (வரம்பு 0-20, இயல்புநிலை `0` = ஆஃப்), `src/sse/services/auth.ts` இல் `compareP2CConnections()` ஜோடியின் ஒவ்வொரு வேட்பாளருக்கும் `weight` புள்ளிகள் வரை சேர்க்கிறது. அதில் பாதி வேகமான வேட்பாளருக்கான விகிதமாக தாமதத்திலிருந்து வருகிறது (இரண்டு மடங்கு மெதுவாக முழு பாதியை எடுக்கும்) மற்றும் பாதி உருட்டல் பிழை விகிதத்தில் இருந்து வருகிறது. இரண்டு விண்ணப்பதாரர்களும் குறைந்தபட்சம் 3 மாதிரிகள் இருந்தால் மட்டுமே இந்த சொல் பொருந்தும், எனவே புதிய கணக்குகளுக்கு அபராதம் விதிக்கப்படாது, மேலும் அதன் உச்சவரம்பு ஒதுக்கீடு-தடுக்கப்பட்ட மற்றும் ஒதுக்கீடு-தீர்ந்த அபராதங்களுக்கு கீழே இருக்கும். இது அதன் சொந்த சுற்றை சேர்க்கவில்லை: தோல்வியடைந்த கணக்குகள் இன்னும் கூல்டவுன், லாக்அவுட் மற்றும் பிரேக்கர் லேயர்களால் கையாளப்படுகின்றன. `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` உடன் அமைக்கவும்.

**ரீசனிங் பிரேம்கள் உள்ளடக்க-ஸ்டால் பட்ஜெட்டை மறுதொடக்கம் செய்கின்றன.** ஒரு பகுத்தறிவு மாதிரியானது அதன் முதல் புலப்படும் டோக்கனுக்கு முன் சில நிமிடங்களுக்கு சிந்திக்கலாம்: Claude `thinking_delta` பிரேம்களை ஸ்ட்ரீம் செய்கிறது, அதன் சிந்தனை உரை காலியாக இருக்கலாம், மற்றும் பதில்கள் API ஒரு நியாயமான உருப்படியை ஒன்றன் பின் ஒன்றாக ஸ்ட்ரீம் செய்கிறது. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) இந்த பிரேம்களை அங்கீகரிக்கிறது, மேலும் கண்காணிப்பு டாக் அதன் வரவுசெலவுத் திட்டத்தை ஒவ்வொன்றிலும் ரத்து செய்வதற்குப் பதிலாக மறுதொடக்கம் செய்கிறது. அவை இன்னும் மாதிரி வெளியீடு அல்ல, எனவே பகுத்தறிவுடன் முடிவடையும் ஒரு திருப்பம் இன்னும் காலியாக இருப்பதாகப் புகாரளிக்கப்படுகிறது, மேலும் பகுத்தறிவை நிறுத்தி இதயத் துடிப்பை மட்டுமே அனுப்பும் ஒரு திருப்பம் இன்னும் கண்காணிப்பாளரைப் பயணிக்கிறது.

Kiro இன் பைனரி `reasoningContentEvent` பிரேம்கள் காலியாக இல்லாத கையொப்பத்துடன் இந்த காரணத்தை செயல்படுத்துபவர் மூலம் வெற்று `reasoning_content` டெல்டாவாகப் பாதுகாக்கின்றன. கையெழுத்து அனுப்பப்படவில்லை. மெட்டாடேட்டா, முழுமையற்ற சட்டங்கள் மற்றும் வெற்று கையொப்பங்கள் உள்ளடக்க பட்ஜெட்டை மறுதொடக்கம் செய்யாது; சுயாதீனமான செயலில்-ஸ்ட்ரீம் காலக்கெடு மற்றும் கிளையன்ட் ரத்து இன்னும் பொருந்தும் (`open-sse/executors/kiro/reasoning.ts`).

**முனை நிலைகள் (NOT கூல்டவுன்கள்):**

- `banned` — தடை-திறவுச்சொல் / கணக்கு-தடை கண்டறிதல் மூலம் அமைக்கப்பட்டது (பார்க்க [BAN_DETECTION](../security/BAN_DETECTION.md) ). அப்ஸ்ட்ரீம் ஒரு கோரிக்கை நிராகரிப்புகள் (`request_rejected`, எ.கா. Anthropic OAuth 403 "கோரிக்கை அனுமதிக்கப்படவில்லை") அதை அமைக்கவே இல்லை: அவை ஒரு இணைப்பு மற்றும் மாதிரிக்கு கணக்கிடப்பட்டு, `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) இல் மூடப்பட்ட கூல்டவுன் மூலம் அந்த மாதிரியை சுழற்சிக்கு வெளியே எடுக்கவும் அல்லது — `open-sse/services/requestRejectedStreak.ts` மாதிரி தெரியாத போது இணைப்பை குளிர்விக்கவும்
- `expired` (அதிவேக பேக்ஆஃப் — உடன் — `EXPIRED_RETRY_MAX = 3` வரம்புக்குட்படுத்திய பிறகு முனையத்திற்கு மாறுகிறது, எனவே கணக்கை நிரந்தரமாக செயலிழக்கச் செய்வதற்கு முன் நிலையற்ற OAuth பிழைகள் சுயமாக குணமடையலாம்)
- `credits_exhausted`

நற்சான்றிதழ்கள் மாறும் வரை அல்லது ஒரு ஆபரேட்டர் அவற்றை மீட்டமைக்கும் வரை இவை தொடரும். நிலையற்ற கூல்டவுன் நிலையுடன் டெர்மினல் நிலைகளை மேலெழுத வேண்டாம்.

**சோம்பேறி மீட்பு:** `rateLimitedUntil` கடந்தால், இணைப்பு மீண்டும் தகுதி பெறும். வெற்றிகரமான பயன்பாட்டில், `clearAccountError()` அனைத்து பிழை புலங்களையும் அழிக்கிறது.

### Claude OAuth பயன்பாட்டு சுவர்: குறைந்த முன்னுரிமை லேன் + அமர்வு-வரம்பு மீட்டமைப்பு

**நோக்கம்:** ஒரு Claude சந்தா (OAuth) இணைப்பு. இரண்டு அம்சங்களும் உள்ளன** ஒரு இணைப்புக்கான தேர்வு** (இணைப்பு → Claude பிரிவில் → `lowPriorityMode` / `autoLimitReset` `providerSpecificData` இல் திருத்தவும், இரண்டும் இயல்புநிலை ஆஃப்) மற்றும் Claude குறியீட்டின் `/low-priority` மற்றும் `/limit-reset` கட்டளைகளை பிரதிபலிக்கவும் ( Claude குறியீடு 2.1.263 இலிருந்து கம்பி ஒப்பந்தம் கைப்பற்றப்பட்டது).

**செயல்படுத்தல்:**

- மாநில இயந்திரம் + பதில் வகைப்பாடு: `open-sse/services/claudeLowPriority.ts`
- status/claim கிளையண்டை மீட்டமைக்கவும்: `open-sse/services/claudeLimitReset.ts`
- எக்ஸிகியூட்டர் ஹூக் (தலைப்பு ஊசி + அதே கணக்கு மீண்டும் முயற்சி): `open-sse/executors/base.ts::execute()`
- விருப்ப நிலைத்தன்மை: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**தூண்டுதல்:** 5-மணிநேர பயன்பாட்டுச் சுவர் — a `429`, அதன் தலைப்புகளில் `anthropic-ratelimit-unified-status: rejected` மற்றும் கணக்குத் தகுதியிருந்தால், `anthropic-ratelimit-unified-slow-offer: treatment`. அந்த முதல் சுவருக்கு முன் எதுவும் அனுப்பப்படவில்லை 429; ஒரு பர்ஸ்ட் 429 ஒன்றுபட்ட தலைப்புகள் இல்லாமல் சாதாரண கூல்டவுன் பாதையில் செல்கிறது.

**குறைந்த முன்னுரிமைப் பாதை** (`lowPriorityMode`):

- சுவர் 429 இல் நிறைவேற்றுபவர் சலுகையை ஏற்றுக்கொண்டு உடனடியாக மீண்டும் முயற்சிக்கிறார்** அதே** `anthropic-usage-limit: slow` உடன் கணக்கு; அறிவிக்கப்பட்ட `anthropic-ratelimit-unified-reset` (+ 60s கிரேஸ்) வரை பாதை செயலில் இருக்கும் மற்றும் அந்த சாளரத்தில் உள்ள ஒவ்வொரு கோரிக்கையும் தலைப்பைக் கொண்டிருக்கும். இடைமறித்த 429 `handleChatCore` அடையாது, எனவே இணைப்பு** இல்லை** கூல்டவுனில் வைத்து சுழற்றப்படவில்லை.
- `anthropic-ratelimit-unified-slow-status` பிந்தைய பதில்களில்: `active` / `not_needed` பாதையை வைத்திருங்கள்; `slot_busy` (429) அல்லது ஒரு `529` சேவையகத்தின் `anthropic-ratelimit-unified-slow-retry-after` (இயல்புநிலை 20கள், கிளாம்ப் 5–600கள், ± 30% நடுக்கம்) காத்திருந்து மீண்டும் முயற்சிக்கவும், `anthropic-ratelimit-unified-slow-max-wait` (இயல்புநிலை 20 நிமிடம், கிளாம்ப் 1 நிமிடம்–6 மணிநேரம்) — கடந்த பிறகு la1-ஐ ப்ளாக் செய்து, la1 பிளாக் முடிவடைகிறது. மறு ஏற்பு. கோரிக்கையின் சொந்த அப்ஸ்ட்ரீம்-ஸ்டார்ட் காலக்கெடுவில் (`resolveFetchStartTimeout`, இயல்புநிலையாக 10 நிமிடம்) 5 வினாடிகள் மார்ஜினைக் கழித்தால் `TimeoutError` கூடுதலாக இருக்கும் `max_wait` - +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-window rollover, அல்லது `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (எந்த நிலையிலும் இது `extra_usage` என முடிவடைகிறது, ஏனெனில் பணம் செலுத்தும் அதிக கட்டணம் இப்போது சுவரை உள்ளடக்கியது) லேனை முடிக்கவும்; பதில் பின்னர் சாதாரண கூல்டவுன் பாதைக்கு செல்கிறது. அறிவிக்கப்பட்ட பட்ஜெட் மீட்டமைக்கும் வரை `budget_exhausted` நினைவில் இருக்கும் (≤ 8 நாட்கள்).
- செயல்படுத்துபவரின் சொந்த 400-உந்துதல் உள்-முயற்சிகளுக்குப் பிறகு சுவர் சரிபார்ப்பு இயங்குகிறது (சூழல் எடிட்டிங், thinking/effort கிளாம்ப்கள், பரம் ஆட்டோ-லேர்ன்), எனவே ஒரு சுவர் 429, அந்த மறுமுயற்சிகளில் ஒன்றின் மேற்பரப்பை மட்டுமே குளிர்விக்கும் பாதையை அடைவதற்குப் பதிலாக இடைமறிக்கப்படுகிறது.
- ஒவ்வொரு இணைப்பிற்கும் நிலை நினைவகத்தில் உள்ளது (மறுதொடக்கத்திற்கு ஒரு கூடுதல் சுவர் 429 செலவாகும்)

**அமர்வு-வரம்பு மீட்டமைப்பு** (`autoLimitReset`, இரண்டும் இயக்கத்தில் இருக்கும்போது லேனுக்கு முன் முயற்சித்தது):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` தொகுதி; போது `arm: "reset"` மற்றும் `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` உடன் `{ "program": "juniper_tide" }` ( `providerSpecificData.organizationUUID` இலிருந்து அமைப்பு UUID, பூட்ஸ்ட்ராப் ஃபால்பேக்).
- `result: reset|not_limited` → கோரிக்கை முழு வேகத்தில் மீண்டும் முயற்சிக்கப்படுகிறது (மெதுவான தலைப்பு இல்லை). `already_used` / `not_offered` memoise `next_available_at` (இயல்புநிலை ஒரு வாரம்); எந்த தோல்வியும் 15 நிமிடங்களில் பின்வாங்கும். மீட்டமைப்பு என்பது வாரத்திற்கு ஒரு முறை, இன்னும் வாராந்திர வரம்பில் கணக்கிடப்படும்.

பின்னடைவு காவலர்கள்: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### வங்கி மீட்டமைப்புகளைத் தானாகப் பயன்படுத்தவும்

**நோக்கம்:** Codex மற்றும் Claude சந்தா (OAuth) இணைப்புகள்.** தேர்வு** : `bankedResetAutoApply` அமைப்பு முடக்கப்பட்டுள்ளது மற்றும் இயல்புநிலையாக `dry-run` பயன்முறையில் உள்ளது (அமைப்புகள் → AI → தானாக விண்ணப்பிக்கும் வங்கி மீட்டமைப்புகள்).

**நோக்கம்:** ஒரு கணக்கு பயன்பாட்டுச் சுவரைத் தாக்கும் போது, வழங்குநர் வரம்புகள் பக்கத்தில் "ரிடீம்" என்பதை அழுத்துவதற்கு ஆபரேட்டருக்காகக் காத்திருப்பதற்குப் பதிலாக, சொந்தமாக வங்கி மீட்டமைப்புகளைச் செலவிடுங்கள்.

| கடன் வகை (`creditTypes`) | என்ன மீட்கப்பட்டது                                | எங்கே ஓடுகிறது                                               |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------------------ |
| `codexCredits`           | Codex வரவுகளை மீட்டமை                             | பின்னணி வேலை, ஒவ்வொரு 60 வி                                  |
| `claudeCredits`          | Claude வங்கி மானியங்கள் (`GRANT` வரவுகள்)         | பின்னணி வேலை, ஒவ்வொரு 60 வி                                  |
| `claudeSessionReset`     | Claude வாராந்திர அமர்வு-வரம்பு மீட்டமைப்பு (மேலே) | ஒவ்வொரு கணக்கிற்கும் மாற்றும் கொள்கையின் மூலம் கோரிக்கை பாதை |

**செயல்படுத்தல்:**

- தூய முடிவு (இரண்டு பாதைகளுக்கும் ஒரு விதி அமைக்கப்பட்டுள்ளது): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- பின்னணி வேலை: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` இல் தொடங்கியது)
- Claude கோரிக்கை-பாதை வாயில்: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` இல் `setClaudeLimitResetPolicy()` மூலம் பதிவு செய்யப்பட்டது
- வரலாறு, தொப்பிகள் மற்றும் வெப்ஹூக்: `src/lib/usage/bankedResetAudit.ts`
- வரலாறு API: `GET /api/settings/banked-reset-auto/history?limit=50` (மேலாண்மை அங்கீகாரம்)

**முடிவு உத்தரவு** (முதல் தோல்வி விதி பதிவு செய்யப்பட்ட காரணம்):

1. அம்சம் முடக்கப்பட்டது, கிரெடிட் வகை முடக்கம் அல்லது கணக்கு வரம்புக்கு அப்பாற்பட்டது (`accountScope` `all` / `selected` மற்றும் ஒவ்வொரு கணக்கிற்கும் `connections` வரைபடம்).
2. விருப்பமான UTC அட்டவணைக்கு வெளியே (`startHourUtc` > `endHourUtc` நள்ளிரவைக் கடக்கிறது).
3. கடந்த 24 மணிநேரத்தில் உள்ள வரம்புகள்: `maxPerAccountPerDay` (1), `maxPerDay` (3), மற்றும் `minSpacingMinutes` (30) ஏதேனும் இரண்டு மீட்டெடுப்புகளுக்கு இடையில்.
4. தூண்டுதல்: ஒரு சுவர் `session` அல்லது `weekly` சாளரம் ( `getQuotaWindowStatus().reachedThreshold` இலிருந்து படிக்கவும், `isAccountQuotaExhausted()` அல்ல, செலவழித்த ஒவ்வொரு சாளரத்திலும் ஒரு கணக்கை மட்டுமே தெரிவிக்கும்), அல்லது குறைந்தபட்சம் `expiringCreditMinUsedPercent` (50) ஐப் பயன்படுத்திய கணக்கில் `expiringCreditHours` (24) க்குள் காலாவதியாகும் கிரெடிட்.
5. நேச்சுரல்-ரீசெட் கார்டு: சுவர் 5 மணிநேர சாளரம் `sessionResetGuardMinutes` (90) க்குள் மீட்டமைக்கப்படும் போது அல்லது `weeklyResetGuardHours` (12) க்குள் சுவர் கொண்ட வாராந்திர சாளரத்தை தவிர்க்கவும்.
6. வாராந்திர தளம்: வாராந்திர மீதம் `weeklyFloorPercent` (10)க்குக் கீழே இருக்கும்போது 5 மணிநேர மீட்டமைப்பைத் தவிர்க்கவும்.
7. `last-resort` பயன்முறை: ஒரே வழங்குநரின் மற்றொரு இன்-ஸ்கோப் கணக்கில் இரண்டு சாளரங்களிலும் குறைந்தது `poolHeadroomPercent` (10) இருக்கும் போது தவிர்க்கவும். காலாவதியாகும்-கிரெடிட் தூண்டுதல்கள் இதைத் தவிர்க்கின்றன.
8. `dry-run` ஒரு வரிசையைப் பதிவுசெய்து எதையும் மீட்டெடுக்கவில்லை; `last-resort` மற்றும் `eager` மீட்டெடுக்கவும்.

விடுபட்ட ஒதுக்கீட்டுத் தரவு ஒருபோதும் மீட்பைத் திறக்காது: அறியப்படாத மீட்டமைப்பு நேரம் அல்லது வாராந்திர பயன்பாடு தவிர்க்கப்படும்.

**Claude அமர்வு மீட்டமைப்பு:** அம்சம் ஆஃப் அல்லது `claudeSessionReset` முடக்கத்தில், ஒவ்வொரு கணக்கிற்கும் `autoLimitReset` நிலைமாற்றம் முன்பு போலவே தீர்மானிக்கிறது. இரண்டும் ஆன் செய்யப்பட்டுள்ள நிலையில், இந்த அம்சம் ஒவ்வொரு கணக்கிற்கும் மாற்றங்களை மாற்றுகிறது: கொள்கை அனுமதிக்கும் போது மட்டுமே ஒரு இன்-ஸ்கோப் கணக்கு உரிமை கோரலாம், மேலும் `dry-run` பயன்முறையில் எந்த உரிமைகோரலும் செய்யப்படாது.

**பாதுகாப்பு:** ஒரு டிக் ஒன்றுக்கு அதிகபட்சம் ஒரு கிரெடிட்டை வேலை மீட்டெடுக்கிறது, கிரெடிட்களை பட்டியலிடுவதற்கு முன் முடிவு செய்கிறது (தவிர்க்கப்பட்ட கணக்கு ஒருபோதும் பட்டியலிடப்படவில்லை), ஐடெம்போடென்சி விசைகளைப் பயன்படுத்துகிறது `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, மற்றும் தோல்வியுற்ற பட்டியல் அல்லது மீட்டெடுப்பிற்குப் பிறகு 1 மணிநேரத்திற்கு ஒரு கணக்கை முடக்குகிறது. ஒவ்வொரு மீட்பு, தோல்வி மற்றும் உலர்-ரன் முடிவு `audit_log` (`action: "bankedReset.redeem"`, டோக்கன்கள் அல்லது கிரெடிட் ஐடிகள் இல்லை); அந்த வரிசைகளில் இருந்து தொப்பிகள் கணக்கிடப்படுகின்றன, எனவே அவை மறுதொடக்கம் செய்யப்படுகின்றன. வெற்றிகரமான மீட்புகளும் `provider.reset_redeemed` webhook ஐ இயக்குகின்றன.

பின்னடைவு காவலர்கள்: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### அமர்வு தொடர்பு (#7274)

**நோக்கம்:** ஒரு கிளையன்ட் அமர்வு (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` தலைப்பு) ஒரு இணைப்பில் பொருத்தப்பட்டது.** ஏதேனும்** வழங்குபவர்.

**நோக்கம்:** கோரிக்கைகள் முழுவதும் ஒரே கணக்கில் மல்டி-டர்ன் ஏஜென்ட் (Claude குறியீடு, உதவியாளர், தனிப்பயன் முகவர்கள்) வைத்திருக்கவும், குறுக்கு கணக்கு சூழல் இழப்பைக் குறைக்கவும் மற்றும் ஒரு கணக்கிற்கான அமர்வு நிலையுடன் வழங்குநர்களுக்கு மீண்டும் மீண்டும் குளிர்-தொடக்க 429s.

**செயல்படுத்தல்:**

- TTL தீர்மானம்: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- பின் selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- தலைப்பு பிரித்தெடுத்தல் (பொதுவான, ஏதேனும் வழங்குநர்): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- நிலைத்த பின் அட்டவணை: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- அமைப்பு: `sessionAffinityTtlMs` (MS இல் உலகளாவிய TTL, `0` முடக்குகிறது) — `src/lib/db/settings.ts`. இடம்பெயர்வு `124_generic_session_affinity_ttl.sql` மூலம் கோடெக்ஸ்-மட்டும் `codexSessionAffinityTtlMs` இலிருந்து மறுபெயரிடப்பட்டது, இது புதிய இயல்புநிலையாக முன்னர் உள்ளமைக்கப்பட்ட Codex TTL கொண்டு செல்கிறது.

#7274 க்கு முன், `codex` தவிர ஒவ்வொரு வழங்குநருக்கும் `resolveSessionAffinityTtlMs()` கடின பிணையில் `0` ஆனது, எனவே பின்னிங் பொறிமுறை மற்றும் தலைப்புப் பிரித்தெடுத்தல் வழங்குநர்-அஞ்ஞானமாக இருந்தாலும் TTL அமைப்பு (மற்றும் அமர்வு தலைப்புகள்) வேறு எங்கும் எந்த விளைவையும் ஏற்படுத்தவில்லை. சரிசெய்தல் அந்த ஆரம்ப-திரும்பலை நீக்கியது; உலகளவில் `0` க்கு மேல் அமைக்கப்படும் ஒவ்வொரு வழங்குநருக்கும் TTL இப்போது ஒரே மாதிரியாகப் பொருந்தும்.

மூன்று அமர்வு-தொடர்பு தலைப்புகள் ஒருபோதும் அனுப்பப்படுவதில்லை அப்ஸ்ட்ரீம் — எக்ஸிகியூட்டர்கள் கிளையன்ட் தலைப்புகளை அனுப்புவதை விட புதிதாக தங்கள் சொந்த அப்ஸ்ட்ரீம் தலைப்புகளை உருவாக்குகிறார்கள், எனவே இது ஒரு உள் தொடர்பு ஐடியாக மட்டுமே இருக்கும்.

### பிரத்தியேக நிர்வகிக்கப்பட்ட அமர்வு இணைப்பு குத்தகைகள்

**நோக்கம்:** ஒரு செயலில் நிர்வகிக்கப்படும் HTTP client/session ஒரு தகுதியான OmniRoute இணைப்பைக் கொண்டுள்ளது.

**நோக்கம்:** கோரிக்கைகள் முழுவதும் கடினமான ரூட்டிங் வேலி தேவைப்படும் வாடிக்கையாளர்களுக்கு நீடித்த பிரத்தியேக இணைப்பு உரிமையை வழங்கவும். இது அமர்வு உறவில் இருந்து வேறுபட்டது, இது ஒரு மென்மையான தொடர்ச்சி விருப்பம்: ஒரு பிரத்யேக குத்தகையானது SQLite இல் வாழ்க்கைச் சுழற்சி நிலையை நீடிக்கிறது, உலகளாவிய செயலில்-உரிமையாளர் மற்றும் செயலில்-இணைப்பு தனித்தன்மையை செயல்படுத்துகிறது, மேலும் வழங்குநரை அனுப்புவதற்கு முன் பழைய தலைமுறையை நிராகரிக்கிறது.

அம்சம் ஒரு API விசையைத் தேர்வுசெய்யும். நிர்வகிக்கப்படும் விசையானது `lease:exclusive` நோக்கமும் வெளிப்படையான காலியாக இல்லாத `allowedConnections` பட்டியலையும் கொண்டிருக்க வேண்டும். எந்த HTTP கிளையண்டும் லைஃப்சைக்கிள் எண்ட்பாயிண்ட்டைப் பயன்படுத்தலாம்; கிளையன்ட் பெயர், பயனர் முகவர், வழங்குநர், OAuth முறை அல்லது மாதிரி தேவையில்லை. குத்தகைக்கு ஒரு இணைப்பு உள்ளது, ஒரு மாதிரி அல்ல, எனவே இணைப்பு சாதாரணமாக தகுதியுடையதாக இருக்கும்போது ஒரு மாதிரி மாற்றம் பிணைப்பைத் தக்க வைத்துக் கொள்ளும். இயல்பான மாதிரி, ஒதுக்கீடு, உடல்நலம், கூல்டவுன் மற்றும் அனுமதிப்பட்டியல் விதிகள் அதிகாரப்பூர்வமாக இருக்கும் மேலும் அதே தலைமுறையை மற்றொரு இலவச தகுதியான இணைப்புக்கு மாற்றலாம்.

JSON செயல்கள் `acquire`, `renew` மற்றும் `release` உடன் வாழ்க்கைச் சுழற்சி `POST /api/v1/session-leases` ஆகும். நிர்வகிக்கப்பட்ட அனுமான கோரிக்கைகள் ஒளிபுகா `X-OmniRoute-Lease-Owner` மதிப்பு மற்றும் துல்லியமான `X-OmniRoute-Lease-Generation` வழங்குகின்றன. உரிமையாளர் `vlo_` தொடர்ந்து 43 base64url எழுத்துகளைப் பயன்படுத்துகிறார்; அதன் SHA-256 ஹாஷ் மட்டுமே சேமிக்கப்படுகிறது. ஒவ்வொரு இறுதி அனுப்பும் வேலியும் அங்கீகரிக்கப்பட்ட API விசை ID மற்றும் செயலில் உள்ள இணைப்பு ID பிணைக்கிறது. பதிவுகள், தக்கவைக்கப்பட்ட கோரிக்கை ஸ்னாப்ஷாட்கள் மற்றும் அப்ஸ்ட்ரீம் எக்ஸிகியூட்டர் தலைப்புகளில் இருந்து குத்தகைக் கட்டுப்பாட்டு தலைப்புகள் அகற்றப்படும்.

சாதாரண ரூட்டிங் தகுதியான நிர்வகிக்கப்பட்ட வேட்பாளர்களைக் கொண்டிருந்தாலும், ஒவ்வொரு இலவச வேட்பாளரும் வெளிநாட்டு செயல்பாட்டு குத்தகையால் ஆக்கிரமிக்கப்பட்டிருந்தால், OmniRoute HTTP `429`, குத்தகை-திறன்-கிடைக்காத குறியீடு, காத்திருப்பு-திறன் நிலை மற்றும் ஒரு வரம்புக்குட்பட்ட `Retry-After` ஆகியவற்றை முந்தைய தொடர்புடைய காலாவதியிலிருந்து பெறப்படும். சாதாரண வெற்று தகுதியானது குத்தகை சர்ச்சை அல்ல, மேலும் அதன் தற்போதைய ரூட்டிங் பிழை சொற்பொருளை வைத்திருக்கிறது.

தொடர்புடைய வழிமுறைகள் தனித்தனியாக உள்ளன:

- OAuth அமர்வு ஆக்கிரமிப்பு என்பது OAuth கணக்குகளுக்கான செயல்முறை-உள்ளூர் மென்மையான விநியோகமாகும்.
- கணக்கு செமாஃபோர்ஸ் கோரிக்கை-ஒத்திசைவு அனுமதிகளை வழங்குகிறது மற்றும் கோரிக்கை முடிந்ததும் முடிவடைகிறது.
- பிரத்தியேக நிர்வகிக்கப்பட்ட அமர்வு குத்தகைகள் ஒரு தலைமுறை வேலியுடன் நீடித்த வாழ்க்கைச் சுழற்சி உரிமையாகும்.

---

## 3. மாதிரி பூட்டல்

**வாய்ப்பு:** provider + connection + model மூன்றிணை.

**நிலையின் அடிப்படையிலான scope:** எந்த status தோல்வியடைந்ததோ, அந்த status எந்த key-க்கு lockout எழுதப்படும் என்பதைத் தீர்மானிக்கிறது
(`open-sse/services/accountFallback/exactModelLock.ts`-இல் உள்ள `resolveLockoutScope()`):

- `429` / `403` / `402` — quota அல்லது entitlement signal — **quota family**-ஐப் பூட்டும்:
  codex-க்கு முழு `codex` / `spark` scope (connection-இன் ஒவ்வொரு `gpt-5*` model-மும்), மற்ற providers-க்கு `getQuotaScopedModelForProvider()`.
- `404` bare model-ஐப் பூட்டும் (`getModelLockKey()` `not_found`-ஐக் குறுக்குகிறது).
- வேறு எந்த status-மும் — `5xx` transport/server தோல்விகள் மற்றும் quality validation மூலம் OmniRoute உருவாக்கும் சொந்த `502` — **exact**
  provider/connection/model tuple-ஐ மட்டுமே பூட்டும். ஒரு model-இல் ஏற்பட்ட மோசமான stream, account-இன் quota குறித்து எந்த ஆதாரமும் அல்ல; இந்த விதிக்கு முன்பு
  `codex/gpt-5.6-luna`-இல் வந்த ஒரு empty response, அந்த connection-இன் ஒவ்வொரு `gpt-5*` model-ஐயும் 2–30 நிமிடங்களுக்கு (அதிகரித்துக்கொண்டே) routing-இலிருந்து அகற்றியது, ஆனால் அதன் quota பாதிக்கப்படவில்லை.
- caller-இன் வெளிப்படையான `scope` option எப்போதும் முன்னுரிமை பெறும் (Antigravity `"exact"`-ஐ அனுப்புகிறது).

**நோக்கம்:** ஒரு model மட்டுமே கிடைக்காதபோது அல்லது quota வரம்புக்குட்பட்டிருக்கும்போது, முழு connection-ஐ முடக்குவதைத் தவிர்ப்பது.

**எடுத்துக்காட்டுகள்:**

- 429-ஐத் திருப்பியனுப்பும் per-model quota providers
- காணாமல் போன ஒரு model-க்கு 404-ஐத் திருப்பியனுப்பும் local providers
- Provider-specific mode/model permission தோல்விகள் (எ.கா., Grok modes)

**செயலாக்கம்:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

செயலில் உள்ள lockout-களை provider, connection, model, reason, expiresAt ஆகியவற்றுடன் பட்டியலிடுகிறது. Operators card-இலிருந்து ஒரு model-ஐ கைமுறையாக மீண்டும் இயக்கலாம்.

**REST API:**

- `GET /api/resilience/model-cooldowns` — செயலில் உள்ள lockout-களைப் பட்டியலிடுகிறது
- `DELETE /api/resilience/model-cooldowns` — கைமுறையாக மீண்டும் இயக்குதல். Body: `{provider, connection, model}`. Auth: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Transient காரணத்தால் routing-இலிருந்து வெளியேற்றப்பட்ட ஒவ்வொரு connection-க்கும், ஒவ்வொரு provider page-ஐத் திறப்பதற்குப் பதிலாக, ஒரே பக்கம் வழங்கப்படுகிறது.
இது connection cooldowns, model lockouts மற்றும் terminal states ஆகியவற்றைப் பட்டியலிடுகிறது; அவற்றை ஒவ்வொரு connection-க்கும், தேர்ந்தெடுக்கப்பட்டவற்றுக்கும் அல்லது ஒரு provider-இன் அனைத்து connections-க்கும் அழிக்கிறது; மேலும் அதிகம் மாற்றியமைக்கப்படும் cooldown விதிகளான `streamStallCooldown.enabled` மற்றும் OAuth / API-key `connectionCooldown`-இன் அடிப்படை cooldown மற்றும் அதிகபட்ச backoff steps-ஐத் திருத்துகிறது (`PATCH /api/resilience` மூலம் சேமிக்கப்படுகிறது). Terminal states (`banned`, `expired`, `credits_exhausted`) பட்டியலிடப்படுகின்றன, ஆனால் இங்கு ஒருபோதும் அழிக்கப்படுவதில்லை.

அதே பக்கத்தில் உள்ள **Error cooldown rules** card, operator error rules-ஐ (`settings.providerErrorRules`) மற்றும் ஒவ்வொரு provider-க்குமான catch-all defaults-ஐ (`settings.providerErrorDefaults`) `PATCH /api/settings` மூலம் திருத்துகிறது — அவை எவ்வாறு பொருந்துகின்றன என்பதை §7-இன் "Operator-declared
rules" பகுதியில் காண்க. கால அளவுகள் Default (வெளிப்படையான cooldown இல்லை), 30 min,
1 h, 5 h, 24 h அல்லது 1 முதல் 43,200 நிமிடங்கள் (30 நாட்கள்) வரையிலான தனிப்பயன் மதிப்பு ஆகியவையாகும்.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, மீதமுள்ள cooldown, backoff level, கடைசி error type மற்றும் model lockouts உடைய connections (credentials இல்லை)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` அல்லது
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}`-ஐத் திருப்பியனுப்புகிறது

### Lockout settings UI + success-decay recovery (v3.8.23)

Model lockout, எப்போதும் செயல்படும் hardcoded நடத்தையிலிருந்து, தனிப்பட்ட settings card மற்றும் self-healing recovery path கொண்ட முழுமையாக configurable, opt-in அம்சமாக மாறியுள்ளது.

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
இது மேலே உள்ள read-only `ModelCooldownsCard`-இலிருந்து **வேறுபட்டது** (அது செயலில் உள்ள lockout-களை மட்டும்
_பட்டியலிடுகிறது_) — புதிய card _அளவுருக்களை உள்ளமைக்கிறது_. Defaults `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)-இல் உள்ளன:

| Setting                 | Default                          | Meaning                                                                                            |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout **இயல்பாக முடக்கப்பட்டுள்ளது**.                                      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | model-scoped failure-ஆகக் கணக்கிடப்படும் upstream statuses.                                        |
| `baseCooldownMs`        | `120_000` (120 s)                | முதல் தோல்விக்கான ஆரம்ப lockout கால அளவு.                                                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | அதிகரிக்கப்பட்ட cooldown-க்கான உச்ச வரம்பு.                                                        |
| `maxBackoffSteps`       | `10`                             | அதிகபட்ச exponential-backoff escalation steps.                                                     |
| `useExponentialBackoff` | `true`                           | மீண்டும் நிகழும் தோல்விகள் cooldown-ஐ exponential முறையில் அதிகரிக்க வேண்டுமா என்பதைக் குறிக்கும். |

Settings வழக்கமான settings store மூலம் நிலைத்திருக்கின்றன; resilience settings schema மூலம் validate செய்யப்படுகின்றன; card `baseCooldownMs`/`maxCooldownMs`-ஐ
(`maxCooldownMs ≥ baseCooldownMs` என்ற நிபந்தனையுடன்) மற்றும் `maxBackoffSteps`-ஐ வரம்புக்குள் வைக்கிறது.

**Success-decay recovery:** recovery என்பது **timer expiry** மட்டுமே சார்ந்ததல்ல. ஆரோக்கியமான
response, model-இன் failure count-ஐக் குறைத்துக்கொண்டே செல்கிறது; இதனால் மீண்ட model ஒன்று
தொடர்ந்து escalation அடைவதை நிறுத்தி, அதன் timer முடிவதற்கு முன்பே lockout-ஐ அகற்றக்கூடும். வெற்றிகரமான
combo target-இல், `open-sse/services/combo.ts` `decayModelFailureCount()`-ஐ
(`open-sse/services/accountFallback.ts`) அழைக்கிறது; இது சேமிக்கப்பட்ட
`failureCount`-ஐ (`Math.floor(failureCount / 2)`) **பாதியாகக் குறைக்கிறது**; அது `0`-ஐ எட்டும்போது lockout
entry முழுமையாக நீக்கப்படுகிறது. இதற்கான counterpart `recordModelLockoutFailure()`,
escalation window-க்குள் ஏற்படும் தோல்விகளில் count-ஐ அதிகரிக்கிறது (மேலும் cooldown-ஐ அதிகரிக்கிறது). இந்த success-decay, சாதாரண timer expiry-க்கு கூடுதலாக செயல்படுகிறது —
இரு பாதைகளில் ஏதேனும் ஒன்று model-ஐ மீண்டும் இயக்கலாம்.

**நிலை:** முடக்கங்கள் **நினைவகத்தில்** (ஒரு செயல்முறைக்கு உரிய `Map`s-களில், `provider:connectionId:model` விசையால் `ModelLockoutEntry` உள்ளீடுகள், மேலும் `provider:connectionId:exact:model` விசையால் துல்லிய-வரம்பு முடக்கங்கள்) சேமிக்கப்படுகின்றன; அவை
DB-யில் நிலைத்ததாகச் சேமிக்கப்படுவதில்லை — மறுதொடக்கத்தின்போது அவை இழக்கப்படுகின்றன. _அமைப்புகள்_ நிலைத்ததாகச் சேமிக்கப்படுகின்றன; செயலில் உள்ள முடக்கத்தின் _நிலை_ தற்காலிகமானது.

---

## 4. ஒதுக்கீடு-பங்கு ஒத்திசைவு கட்டுப்பாடு (v3.8.36)

சந்தா கணக்குகள் (GLM, MiniMax, முதலியன) பெரும்பாலும் ~ 1-3 ஒரே நேரத்தில் கோரிக்கைகளை மட்டுமே ஏற்கும்; அதைத் தாண்டினால் 429கள் மற்றும் கூல்டவுன்கள் தூண்டுகிறது. இது கீழ் கடுமையானது** ஒதுக்கீடு-பங்கு** (`qtSd/…`) சேர்க்கைகள், இதில் பல API விசைகள் ஒரு அப்ஸ்ட்ரீம் கணக்கைப் பகிர்ந்து கொள்கின்றன. மூன்று அடுக்குகள் பகிரப்பட்ட கணக்கை வெள்ளத்தில் இருந்து பாதுகாக்கின்றன.

### ஒரு இணைப்புக்கான கன்கரன்சி கேப் (`max_concurrent`)

ஒவ்வொரு வழங்குநர் இணைப்பும் `max_concurrent` உச்சவரம்பு (`provider_connections.max_concurrent`, இணைப்பு மாதிரியில் அமைக்கப்பட்டுள்ளது / API / DB) அறிவிக்க முடியும். வரம்பு இல்லாமல் காலியாக விடவும். இது — க்குக் கீழே உள்ள வரிசைப்படுத்தல் அடுக்கை இயக்கும் ஒற்றைக் குமிழ் அதை கணக்கின் உண்மையான ஒத்திசைவுக்கு அமைக்கிறது (எ.கா. GLM ~ 1, MiniMax ~ 2).

### ஒரு மாதிரி கன்கரன்சி கேப்ஸ் (`modelConcurrency`)

ஒரு இணைப்பு, அதன் `rateLimitOverrides` வரைபடத்தில் ஒரு மாதிரியின் துல்லியமான ஒத்திசைவு உச்சவரம்புகளை கூடுதலாக அறிவிக்க முடியும்:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

இணைப்பு மாதிரியில் அமைக்கவும் (** விகித வரம்பு → ஒரு மாடல் கன்கரன்சி கேப்களை மீறுகிறது** , ஒரு வரிக்கு ஒரு `model=cap` ) அல்லது அதே JSON வடிவத்துடன் `PATCH /api/providers/[id]` வழியாக. முக்கிய சொற்பொருள்:

- **இணைப்பு-அளவு vs மாதிரி-குறிப்பிட்டது:** `maxConcurrent` பகிரப்பட்ட இணைப்பு-அகலமான உச்சவரம்பாக உள்ளது. இரண்டும் பொருந்தும் போது, இரண்டு வாயில்களும் ஒரே கலப்பு வாயிலில் (`global → provider → account → model`) அணு ரீதியாக பெறப்படும்; பயனுள்ள நடத்தை என்பது கடுமையான பொருந்தக்கூடிய வரம்பு.
- **சரியான மாதிரி-முக்கிய பொருத்தம்:** விசையானது — தெளிவுத்திறனை இயக்கிய பிறகு எக்ஸிகியூட்டருக்கு அனுப்பப்பட்ட மாதிரி சரம் பொதுவாக வெர் அப்ஸ்ட்ரீம் மாடல் ஐடி (`glm-5`), கிளையன்ட் பக்க `provider/model` மாற்றுப்பெயர் அல்ல (`zai/glm-5` `glm-5` உடன் பொருந்தவில்லை). மதிப்புகள் நேர்மறை-முழு ஒரே நேரத்தில்-கோரிக்கை உச்சவரம்புகள்.
- **Local queueing, no discovery:** excess requests queue locally with the existing queue/timeout semantics (typed `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` admission errors). OmniRoute does not discover or infer upstream policy — it enforces the exact ceilings the operator configured. A saturated model gate never disables the provider and never creates a permanent model lockout; upstream 429/cooldown/fallback behavior remains the error backstop.
- **ஒரு இணைப்பு, ஒவ்வொரு செயல்முறை நோக்கம்:** கேப்கள் ஒரு தரவுத்தள இணைப்பு மற்றும் நினைவகத்தில் வைக்கப்படுகின்றன, எனவே ஒரே அப்ஸ்ட்ரீம் API விசையை மீண்டும் பயன்படுத்தும் இரண்டு இணைப்புகள் ஒன்றுடன் ஒன்று ஒருங்கிணைவதில்லை.
- **Unconfigured என்றால் மாறாதது:** வரைபடத்தைத் தவிர்ப்பது (அல்லது டாஷ்போர்டு புலத்தை காலியாக விடுவது) மாதிரி வாயிலைச் சேர்க்காது. எந்தவொரு உலகளாவிய வழங்குநர் வரம்பையும் உறுதிப்படுத்தாமல் எடுத்துக்காட்டு உள்ளமைவு:

```text
glm-5=1
glm-4.7=3
```

### ஒதுக்கீடு-பகிர்வு கோரிக்கை வரிசைப்படுத்தல்

ஒரு கோட்டா-பங்கு அனுப்புதல் ஒரு நேர்மறை `max_concurrent` அறிவிக்கும் இணைப்பை இலக்காகக் கொண்டால், அதற்கான ஒரே நேரத்தில் கோரிக்கைகள்** கணக்கு** ஒரு இணைப்பு செமாஃபோர் (கீ `qsconn:<connectionId>`) மூலம் வரிசைப்படுத்தப்படுகின்றன: அதிகப்படியான கோரிக்கைகள்** வரிசையில் காத்திருக்கவும்** கணக்கை நிரப்புவதற்கு பதிலாக. அது** தோல்வி-திறந்த** — அனுப்பக்கூடிய கோரிக்கையை நிராகரிப்பதை விட ஒரு நிறைவுற்ற வரிசை அல்லது காலக்கெடு ஸ்லாட் இல்லாமல் தொடர்கிறது. மாறவும்** அமைப்புகள் → மீள்தன்மை → ஒதுக்கீடு-ஒவ்வொரு இணைப்பிற்கும் பகிர்வு ஒத்திசைவு** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, இயல்புநிலை ஆன்). `max_concurrent` தொப்பி இல்லாமல் நடத்தை மாறாது.

> ஒதுக்கீடு-பங்கு ரூட்டிங் கேட் (`selectQuotaShareTarget`, DRR + P2C) தானே தோல்வியடைகிறது, மேலும் ஒற்றை-இணைப்புக் குளத்துடன் கூடிய அட்-கேப் இணைப்பு — மட்டுமே _deprioritizes_ அது கடின-வரம்புக்குட்படுத்த முடியாது, எனவே இந்த செமாஃபோர் தான் உண்மையில் வெள்ளத்தைக் கொண்டுள்ளது.

### காம்போ கூல்டவுன்-அறிவு மீண்டும் முயற்சிக்கவும்

ஒவ்வொரு காம்போ உத்திக்கும் (இயக்கப்படும் போது), ஒரு SHORT தற்காலிக கூல்டவுனுக்கான 429 ஐ படிகமாக்கும் கோரிக்கை காத்திருக்கிறது மற்றும் 429 — ஐ திருப்பி அனுப்புவதற்குப் பதிலாக மீண்டும் அனுப்புகிறது, இது ஜெமினி-கிளாஸ் TPM/RPM சாளரங்களை (~ 60s retry-after) மல்டி-மாடல் ஹிட் காம்போஸ், மல்டி மாடல் 2 ஹிட் மோடல்களில் ஒவ்வொரு மாதிரி வீத வரம்பு. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) இல்** அமைப்புகள் → மீள்தன்மை** . இது ஒருபோதும் `quota_exhausted` (நள்ளிரவு வரை பூட்டப்பட்டுள்ளது) அல்லது auth/not-found காரணங்களில் காத்திருக்காது. `comboTimeoutMs` செட் மூலம், அந்த காலக்கெடுவுக்கு முன் முடிக்க முடியாத காத்திருப்பு தொடங்காது (#18998): காம்போ `COMBO_TIMEOUT` 504 க்கு பதிலாக அதன் முனைய பதிலுடன் ஒரே நேரத்தில் பதிலளிக்கிறது.

ஒரு சேர்க்கை `config.comboCooldownWaitEnabled: false` உடன் விலகலாம். நேரடியான `false` மட்டுமே இந்த பகிரப்பட்ட காம்போ காத்திருப்புகளையும் (போஸ்ட்-டிஸ்பாட்ச் கூல்டவுன் மற்றும் ப்ரீ-டிஸ்பாட்ச் circuit-open/model-lock காத்திருப்பு) மற்றும் அவற்றின் காத்திருப்பு-பட்ஜெட் காலக்கெடு-தள நீட்டிப்புகளையும் முடக்குகிறது. விடுபட்ட அல்லது `true` உலகளாவிய கொள்கையைப் பாதுகாக்கிறது; `true` உலகளவில் முடக்கப்பட்ட காத்திருப்பை இயக்க முடியாது. ஒரு வெளிப்படையான `targetTimeoutMs` இன்னும் வெற்றி பெறுகிறது. இந்த விலகல் தனி நேட்டிவ்-கோடெக்ஸ் டர்ன்-பின் ப்ரீ-டிஸ்பாட்ச் காத்திருப்பை மாற்றாது.

அதே கேட், ப்ரீ-டிஸ்பாட்ச் கேஸை உள்ளடக்கியது (#16319): ஒரு காம்போவின் ஒவ்வொரு இலக்கும் எந்த முயற்சியும் செய்யப்படுவதற்கு முன்பு, அதன் மாதிரியானது குறுகிய தற்காலிக லாக் அவுட்டில் இருப்பதால், பூஜ்ஜிய-முயற்சி பாதையானது, குறிப்பு-குறைவான `503 ALL_TARGETS_SKIPPED` பதிலளிப்பதற்குப் பதிலாக, அதே உச்சவரம்புகளின் கீழ் லாக் அவுட்டை காத்திருக்கிறது மற்றும் மீண்டும் அனுப்புகிறது. காத்திருப்பு அனுமதிக்கப்படாத போது (உச்சவரம்பு, முயற்சி அல்லது பட்ஜெட் தீர்ந்துவிட்டது, அல்லது அம்சம் முடக்கப்பட்டது), ஆரம்ப நிலையற்ற பூட்டு காலாவதியிலிருந்து `retry_after` / `reset_at` கொண்டு செல்லும் முனையப் பதில் `429 rate_limit_error` க்கு மேம்படுத்தப்படுகிறது; ஒதுக்கீடு, அங்கீகாரம் மற்றும் காணப்படாத பூட்டுகள் குறிப்பு-குறைவான 503 ஐ வைத்திருக்கின்றன.

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

## 5. கோரிக்கை வரிசை அனுமதிக் கட்டுப்பாடு (v3.8.49 · issue #6593)

**வரம்பு**: உள்ளூர், ஒவ்வொரு வழங்குநர்+இணைப்புக்குமான வீத-வரம்பு வரிசை (`open-sse/services/rateLimitManager.ts`,
Bottleneck-ஐ அடிப்படையாகக் கொண்டது), மேலுள்ள மூன்று செயல்முறைகளுக்கும் ஒரு அடுக்கு கீழே உள்ளது.

**`maxWaitMs` வரிசைக் காத்திருப்பை வரம்பிடுகிறது; `executionMaxWaitMs` செயலாக்கத்தை வரம்பிடுகிறது.**
இவை இரண்டும் திட்டமிட்டு தனித்தனியாக வைக்கப்பட்டுள்ளன; ஒன்று மற்றொன்றுக்குள் செலுத்தப்படுவதில்லை.

`resilienceSettings.requestQueue.maxWaitMs` என்பது **வரிசைக் காத்திருப்பு நேர ஒதுக்கீடு**:
இது வழங்குநர் இடத்திற்காகக் காத்திருப்பதையும், பின்னர் QUEUED நிலையில் இருப்பதையும்
உள்ளடக்கும்; பணி QUEUED நிலையிலிருந்து வெளியேறி செயலாக்கத்தைத் தொடங்கும் தருணத்திலேயே
அதன் நேரங்காட்டி அழிக்கப்படும் (`rateLimitManager.ts`, `wrappedFn`). இந்த வரம்பை மீறும்
கோரிக்கை upstream-ஐ ஒருபோதும் சென்றடையாது. இயல்புநிலை 30000ms; இது
`src/lib/resilience/settings.ts`-இல் உள்ள `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
மூலம் வழங்கப்பட்டு,
`tests/unit/ratelimit-admission-control-6593.test.ts` மூலம் நிலைநிறுத்தப்பட்டுள்ளது;
எனவே இதை மாற்றினால், இந்தப் பத்தி கவனிக்கப்படாமல் காலாவதியாக இருப்பதற்குப் பதிலாக
அந்தச் சோதனை தோல்வியடையும்.

`resilienceSettings.requestQueue.executionMaxWaitMs` என்பதே Bottleneck-க்கு பணியின்
`expiration` ஆக வழங்கப்படுகிறது; அதன் நேரங்காட்டி அனுப்பப்பட்ட பிறகே தொடங்குகிறது. இது
தங்களுக்கென upstream நேரமுடிவு இல்லாத செயலாக்கிகளுக்கான இறுதிப் பாதுகாப்பாகும்; மேலும்
செயலாக்கியின் சொந்த fetch-தொடக்க நேரமுடிவு இதைவிட நீளமாக இருந்தால், இது அந்த அளவுக்கு
உயர்த்தப்படும். ஆகவே நலமாகச் செயல்பட்டுக்கொண்டிருக்கும் பதிலை இது இடைநிறுத்தாது.
இயல்புநிலை 600000ms (10 நிமி).

வரிசை நேர ஒதுக்கீட்டை `expiration`-க்குள் செலுத்தியதால்தான் முன்பு அதிகரிப்பில்லா
நுழைவாயில்கள் செயல்பாட்டின் நடுவே நிறுத்தப்பட்டன — முதல் bytes கிடைப்பதற்கு முன் அவை
நியாயமாகவே பல நிமிடங்கள் இயங்கக்கூடும் — இதனால்தான் expiration ஒன்று `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ஆக வெளிப்படுத்தப்படுகிறது; வரிசை நேர
ஒதுக்கீடு வரிசை-நேரமுடிவுக் குறியீட்டைக் கொண்டிருக்கும். இவற்றில் ஏதேனும் ஒன்றை
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (சூழல் மாறி) அல்லது
கட்டுப்பாட்டுப் பலகையில் (**அமைப்புகள் → மீட்சித்திறன்**) மேலெழுதலாம். இயல்பாக்கப்படும்போது
இரண்டும் 1ms–24h வரம்பிற்குள் கட்டுப்படுத்தப்படும்.

**இரண்டிற்குமான முன்னுரிமை:** சூழல் மாறி _இயல்புநிலையை_ மட்டுமே வழங்குகிறது.
`resilienceSettings.requestQueue`-இல் நிலைத்துச் சேமிக்கப்பட்ட மதிப்பு
(கட்டுப்பாட்டுப் பலகை / API திருத்தம், `key_value`-இல் சேமிக்கப்பட்டது) அதைவிட
முன்னுரிமை பெறும்; மேலும் ஒவ்வொரு இணைப்புக்குமான `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` அதைவிட முன்னுரிமை பெறும். எனவே ஏற்கெனவே நிலைத்துச்
சேமிக்கப்பட்ட மதிப்புள்ள deployment-இல் சூழல் மாறியை அமைப்பது எதையும் மாற்றாது —
அதற்குப் பதிலாக நிலைத்துச் சேமிக்கப்பட்ட அமைப்பை அழிக்கவும் அல்லது புதுப்பிக்கவும்.

வரிசையில் தங்கும் காலம் `maxWaitMs` மூலம் வரம்பிடப்படுகிறது; கீழுள்ள
`maxQueueDepth`, ஒரே நேரத்தில் எத்தனை அழைப்பாளர்கள் வரிசையில் இருக்கலாம் என்பதை
வரம்பிடுகிறது.

**பதிலின் உடலில் குறிப்பிடப்படும் மறுமுயற்சிகள்: இடைவெளிக் கட்டுப்பாடு vs பூட்டல்.**
429 பதில் உடல் தனக்கான காத்திருப்பு நேரத்தைக் குறிப்பிடலாம்
(Gemini `RetryInfo.retryDelay`, "retry after Ns" உரை); இதை
`updateFromResponseBody` வாசிக்கிறது. இணைப்பின் `maxWaitMs`-க்குள் அடங்கும் காத்திருப்பு
இடைவெளிக் கட்டுப்பாடாகும்: அந்தக் காலத்திற்கு வரம்பி தனது கையிருப்பைக் காலியாக்கும்;
அது மீண்டும் நிரம்பியதும் வரிசையில் உள்ள அழைப்புகள் அனுப்பப்படும். `maxWaitMs`-ஐ விட
நீளமான காத்திருப்பை வரிசையால் காத்துக் கடக்க முடியாது — தீர்ந்துபோன தினசரி ஒதுக்கீட்டுக்கு
Gemini `retryDelay: "86399s"` என்று பதிலளிக்கிறது. மறுகட்டமைக்கப்பட்ட 429-இல்
(#16528) அனுப்பப்படும் `Retry-After`, அந்த நேரச் சாளரத்திற்கு மாற்றுவழி இயந்திரம்
மாதிரியைப் பூட்ட ஏற்கெனவே வழிவகுக்கிறது; ஆனால் அதற்காக வரம்பியையும் இடைநிறுத்துவது,
விசையை முன்கூட்டியே அடையும் எந்த அழைப்பையும் (உதாரணமாக, மீட்சித்திறன் மீட்டமைப்புக்குப்
பிறகு) முழு `maxWaitMs` காலத்திற்குத் தொடர்ந்து முடக்கிவிடும். அத்தகைய காத்திருப்பு,
வகைப்படுத்தப்பட்ட Google `RetryInfo` விவரத்திலிருந்து (`google_rpc_retry_info` மூலம்)
வரும்போதும், விசையின் வரம்பி ஏற்கெனவே மாதிரிக்கான வரம்பில் இருக்கும்போதும்
(`getLimiterKey`-ஐப் பார்க்கவும்), அந்த 429, அதற்குப் பதிலாக அந்த இணைப்பில் மாதிரிப்
பூட்டலாக மாறும் (`open-sse/services/rateLimitManager/bodyRetryPause.ts`-இல் உள்ள
`lockModelForLongBodyRetry`, அதிகபட்சம் 24h); வரம்பி இடைநிறுத்தப்படாமல் விடப்படும்.
அந்தப் பூட்டலின்போது கணக்குத் தேர்வு `isModelLocked()` வழியாகத் தவிர்க்கப்படும்;
இணைப்புடன் நிலையாகப் பிணைக்கப்பட்ட இலக்குகளுக்கான இணைவு முன்-அனுப்பல் வாயிலும்
அவ்வாறே தவிர்க்கும். ஒதுக்கீட்டுக் குடும்பம் ஒன்றுக்கு ஒரு வரம்பி கொண்ட antigravity-இல்,
அதன் மற்ற ஒதுக்கீட்டுப் பூட்டல்களைப் போலவே சரியான மாதிரியின் மீதே பூட்டு அமையும்.
ஒரு மாற்றுப்பெயர் அந்த மாதிரிக்குத் தீர்மானிக்கப்பட்டிருந்தால், வாடிக்கையாளர் கேட்ட பெயரும்
பூட்டப்படும்; ஏனெனில் அந்தச் சோதனைகள் கோரப்பட்ட பெயரைப் பயன்படுத்துகின்றன. அது
`lockExactModel` மூலம் துல்லியமாகப் பூட்டப்படுவதால், antigravity ஒதுக்கீட்டுக் குடும்பம்
அல்லது codex வரம்பைக் கடக்கும் மாற்றுப்பெயர் தனது சொந்தப் பெயரை ஒருபோதும் பூட்டாது.
உரைநடைக் குறிப்பு, வகைப்படுத்தப்படாத `retryDelay`, அல்லது முழு இணைப்பாலும் பகிரப்படும்
வரம்பி ஆகியவற்றில் இடைநிறுத்தம் தொடரும். 429 பாதை இப்போது மறுகட்டமைத்த வரம்பி
இடைநிறுத்தப்படும்போது, அந்த இடைநிறுத்தம் முடிவதற்கு முன்பே அழைப்பாளரின் மீதமுள்ள வரிசை
நேரம் முடிவடையுமானால், அவ்வளவு நேரம் காத்திருக்கச் செய்வதற்குப் பதிலாக வரிசை-நேரமுடிவுக்
குறியீட்டுடன் உடனடியாக நிராகரிக்கப்படும் (`checkLimiterPause`); பதிவுசெய்யப்பட்ட முடிவு,
Bottleneck தனது புதுப்பிப்பு நேரக்கணக்கைத் தொடங்கும் இடமான வரம்பி உருவாக்கப்படுவதற்கு
முன்பே நிலைநிறுத்தப்படுகிறது; கையிருப்பில் பின்னர் செய்யப்படும் எந்த மாற்றமும் அதை
மறந்துவிடும். இது `tests/unit/rate-limit-long-body-retry-lockout.test.ts` மற்றும்
`tests/unit/rate-limit-body-retry-pause.test.ts` ஆகியவற்றால் சோதிக்கப்படுகிறது.

**`maxQueueDepth` — விருப்பத் தேர்வான அனுமதி உச்சவரம்பு (புதியது).**
`resilienceSettings.requestQueue.maxQueueDepth`, ஒரு வழங்குநர்+இணைப்புக்காக ஒரே நேரத்தில்
எத்தனை கோரிக்கைகள் வரிசையில் (இன்னும் அனுப்பப்படாமல்) இருக்கலாம் என்பதை வரம்பிடுகிறது.
வரிசையில் ஏற்கெனவே `maxQueueDepth` கோரிக்கைகள் இருக்கும்போது, புதிய கோரிக்கை
`code: "RATE_LIMIT_QUEUE_FULL"` எனும் வகைப்படுத்தப்பட்ட பிழையுடன்
**`limiter.schedule()`-ஐ அடைவதற்கு முன்பே** விரைவாக நிராகரிக்கப்படும் — எனவே
நிராகரிப்புக்கான செலவு குறைவு; மேலும் அந்தக் கோரிக்கைக்கான எந்த downstream
prompt-compression / translation பணிக்கும் முன்பே இது நிகழும். இயல்புநிலை `0` =
முடக்கப்பட்டது; இது ஏற்கெனவே உள்ள வரம்பற்ற-வரிசை நடத்தையைப் பாதுகாக்கிறது;
வரம்பு 0–100000. `RATE_LIMIT_MAX_QUEUE_DEPTH` (சூழல் மாறி) அல்லது
`resilienceSettings.requestQueue.maxQueueDepth` (கட்டுப்பாட்டுப் பலகை/API திருத்தம்)
வழியாக மேலெழுதலாம்.

அனுமதிச் சோதனை தானே ஒரு தூய செயல்பாடு
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`); எனவே
உண்மையான Bottleneck வரம்பி இல்லாமலேயே அதை அலகுச் சோதனை செய்யலாம்.

> #6593-ஐத் தொடங்கிய RFC, `bypassCompressionOnRateLimit`
> கொடியையும் முன்மொழிந்தது. இந்த repo-இன்
> `open-sse/services/compression/` pipeline என்பது வெளிச்செல்லும் LLM கோரிக்கைக்கான
> prompt/context compression (`chatCore.ts`-இல்
> `resolveCompressionSettings`/`selectCompressionStrategy` தொகுதியைச் சுற்றியுள்ள பகுதி),
> உருவாக்கப்படும் 429 பதில்ப் பகுதிகளுக்கான HTTP response compression அல்ல — literal bypass
> கொடிக்கான பொருந்தும் code path எதுவும் இல்லை. மேலும், இந்த prompt-compression படி தற்போது
> கோரிக்கை pipeline-இல் `withRateLimit()`-க்கு _முன்பே_ இயங்குகிறது. ஆகவே, queue-full
> rejection ஏற்படும் போது அதைத் தவிர்க்கும் வகையில் மறுவரிசைப்படுத்துவது, இந்த issue-இன்
> scope-ஐ விடப் பெரிய தனி மாற்றமாகும்; CPU சேமிப்பு பலன், மறுவரிசைப்படுத்தலின்
> ஆபத்துக்கு மதிப்புள்ளதாக இருந்தால், அதை follow-up ஆகச் செய்யலாம் என்பதற்காக இது
> திட்டமிட்டே **இங்கு செயல்படுத்தப்படவில்லை**.

### Rate-Limit தானியக்கச் செயல்படுத்தல் பாதுகாப்பு வலை & இணைப்புப் பாதுகாப்பு (`rateLimitProtection`)

**தானியக்கச் செயல்படுத்தல் பாதுகாப்பு வலை** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, இயல்புநிலை `true`):
இயல்பாக, செயலில் உள்ள அனைத்து API-key provider இணைப்புகளுக்கும்
(`getProviderCategory(provider) === "apikey"`) OmniRoute rate-limit queue protection-ஐத்
தானாகச் செயல்படுத்துகிறது. இதனால் rate-sensitive upstream API keys-க்கான உள்வரும்
கோரிக்கைகள், upstream 429 பிழைகளாக ஒரே நேரத்தில் வெடிப்பதற்குப் பதிலாக, Bottleneck
வழியாக queue செய்யப்பட்டு throttle செய்யப்படும். இந்தப் பாதுகாப்பு வலையை
`RATE_LIMIT_AUTO_ENABLE` environment variable மூலம் மாற்றலாம் (`false`/`0`/`off`
முடக்கும்; `true`/`1`/`on` கட்டாயமாக இயக்கும்). இது சேமிக்கப்பட்ட dashboard அமைப்பை
(**அமைப்புகள் → மீள்திறன்** / `PATCH /api/resilience`) மீறி முன்னுரிமை பெறும்.

**ஒவ்வொரு இணைப்பிற்குமான `rateLimitProtection` இன் பொருள்:**
ஒவ்வொரு இணைப்பிற்குமான rate-limit protection, provider இணைப்புகளில் உள்ள
`rateLimitProtection` boolean field மூலம் கண்காணிக்கப்படுகிறது (SQLite-இல்
`rate_limit_protection` ஆகச் சேமிக்கப்படுகிறது):

- **வெளிப்படையாக இயக்கப்பட்டது (`rateLimitProtection === true`)**: provider category அல்லது auto-enable பாதுகாப்பு வலை இயக்கப்பட்டுள்ளதா என்பதைப் பொருட்படுத்தாமல், இந்த இணைப்பிற்கான rate-limit protection வெளிப்படையாக இயக்கப்படும்.
- **வெளிப்படையாக முடக்கப்பட்டது (`rateLimitProtection === false`)**: வெளிப்படையான protection-ஐ முடக்கும்; ஆனால் செயலில் உள்ள API-key இணைப்பை உலகளாவிய auto-enable பாதுகாப்பு வலையிலிருந்து விலக்காது. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`)-இல், `false` மற்றும் `undefined` சமமானவையாகக் கருதப்படுகின்றன: `rateLimitProtection === true` மட்டுமே வெளிப்படையான override ஆகக் கருதப்படுகிறது. `rateLimitProtection` `false` ஆக இருந்தாலும் (அல்லது அமைக்கப்படாமல் இருந்தாலும்), செயலில் உள்ள API-key இணைப்பு auto-enable நிபந்தனைக்கு இன்னும் பொருந்தி, rate-limit protection-இன் கீழ் தொடரும்.
- **ஒவ்வொரு இணைப்பிற்குமான opt-out இல்லை**: மற்ற இணைப்புகளுக்கு auto-enable செயல்பாட்டில் இருக்கும் போதே, "இந்த ஒற்றை செயலில் உள்ள API-key இணைப்பு rate-limit queue protection இல்லாமல் இயங்க வேண்டும்" என்பதை operator தற்போது குறிப்பிட முடியாது. API-key இணைப்புகளை rate-limit queues இல்லாமல் முழுமையாக இயக்க, பாதுகாப்பு வலையை உலகளவில் முடக்க வேண்டும் (`RATE_LIMIT_AUTO_ENABLE=false` அல்லது `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**ஆதரிக்கப்படும் write paths:**

- **`POST /api/rate-limits`**: ஒரு இணைப்பிற்கான `rateLimitProtection`-ஐ மாற்றுவதற்கான ஆதரிக்கப்படும் management write path (`{ connectionId: string, enabled: boolean }`). இதை `enabled: true` உடன் அழைப்பது வெளிப்படையான protection-ஐ இயக்கும்; `enabled: false` உடன் அழைப்பது வெளிப்படையான protection-ஐ அகற்றும் (ஆனால் auto-enable இயக்கப்பட்டிருந்தால், செயலில் உள்ள API-key இணைப்புகள் உலகளாவிய பாதுகாப்பு வலையின் கீழ் தொடர்ந்து பாதுகாக்கப்படும்).
- **`PUT /api/providers/[id]`**: திட்டமிட்டே `rateLimitProtection`-ஐ ஏற்கவோ மாற்றவோாது (#11278). `PUT /api/providers/[id]` மூலம் provider இணைப்பு metadata-ஐப் புதுப்பிப்பது, சேமிக்கப்பட்ட rate-limit protection நிலையை ஒருபோதும் மாற்றாது.

---

## 6. ஸ்லோ-ஸ்ட்ரீம் த்ரோபுட் வாட்ச்டாக் (#9709)

விருப்பமான `resilienceSettings.streamRecovery.throughputWatchdog` கார்டு இன்னும் துகள்களை அனுப்பும் ஆனால் உள்ளமைக்கப்பட்ட பயனுள்ள-வெளியீட்டு விகிதத்திற்குக் கீழே உதவி வெளியீட்டை உருவாக்கும் அப்ஸ்ட்ரீமைக் கண்டறிகிறது. இது செயலற்ற காலக்கெடுவிலிருந்து வேண்டுமென்றே வேறுபட்டது: இதயத் துடிப்புகள் மற்றும் மெட்டாடேட்டா ஆகியவை டைமரை மீட்டமைக்கவில்லை, மேலும் முன்னேற்றமாகக் கருதப்படாது. இது கடினமான முயற்சி காலக்கெடுவிலிருந்து (#9153) வேறுபட்டது, இது வெளியீட்டுத் தரத்தைப் பொருட்படுத்தாமல் முழுமையான பாதுகாப்பு உச்சவரம்பாக உள்ளது.

வாட்ச்டாக் கலைக்கப்படுவதற்கு முன் ஒரு முழுமையான உருட்டல் சாளரத்தைத் தொடர்ந்து வெப்பமயமாதல் காலம் தேவைப்படுகிறது. இது அரட்டை நிறைவுகள் மற்றும் பதில்கள் API வெளியீட்டு நிகழ்வுகளிலிருந்து உரை டெல்டாக்களைக் கணக்கிடுகிறது (ஒரு பழமைவாத UTF-8 பைட் ப்ராக்ஸி), பயன்பாடு-மட்டும் மற்றும் வெற்று நிகழ்வுகளை புறக்கணிக்கிறது, மேலும் கருவி அழைப்பு அல்லது பகுத்தறிவு நிகழ்வுகள் விமானத்தில் இருக்கும்போது தீர்ப்பை இடைநிறுத்துகிறது. இது முன்னிருப்பாக முடக்கப்பட்டுள்ளது மற்றும் `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` உடன் இயக்கப்படலாம் (என்வி மதிப்பு இயல்புநிலை — ஐ சேமித்த `resilienceSettings.streamRecovery.throughputWatchdog.enabled` பூலியன் வெற்றியை மட்டுமே விதைக்கிறது; இந்த வழிகாட்டியின் மேலே உள்ள env-vs-டாஷ்போர்டு முன்னுரிமைக் குறிப்பைப் பார்க்கவும்); சாளரம், வார்ம்-அப், குறைந்தபட்ச வீதம் மற்றும் குறைந்தபட்ச அளவிடக்கூடிய வெளியீடு ஆகியவை சாதாரண பின்னடைவு-அமைப்புகள் இயல்பாக்கம் அடுக்கு மூலம் கட்டுப்படுத்தப்படுகின்றன.

இயக்கப்பட்டால், செயலில் உள்ள அப்ஸ்ட்ரீம் முயற்சிக்கு மட்டுமே கண்காணிப்பு நிறுத்தம் பயன்படுத்தப்படும். கிளையன்ட்-பார்க்கும் பைட்டுகளுக்கு முன், ஏற்கனவே இருக்கும் அதே கணக்கின் ஆரம்ப-மீட்பு பாதை முயற்சியை மீண்டும் திறக்கலாம். உறுதியளித்த பிறகு, ஸ்ட்ரீம் ஒருபோதும் கண்மூடித்தனமாக மீண்டும் இயக்கப்படாது; தற்போதுள்ள பாதுகாப்பான மிட்-ஸ்ட்ரீம் தொடர்ச்சி ஒப்பந்தம் மட்டுமே பின்னொட்டை தைக்க முடியும். இறுதிப்படுத்தல் ஒற்றை-ஷாட் ஆகும், எனவே பயன்பாட்டு கணக்கியல் மற்றும் செமாஃபோர் வெளியீடு நகல் செய்யப்படவில்லை.

---

## 7. மேல்நிலை நிலை மறுஅறிவிப்பு (தவறாகக் குறிப்பிடப்பட்ட quota பிழைகள்)

**வரம்பு:** தற்காலிக quota தீர்ந்துவிட்டதாகத் தவறான HTTP status-ஐத் தெரிவிக்கும் ஒரு மேல்நிலை gateway.

**நோக்கம்:** வகைப்படுத்துவதற்கு முன் தவறாக வழிநடத்தும் status-ஐச் சரிசெய்தல்; இதனால் கீழ்நிலை நுகர்வோர் (fallback engine, combo aggregation, client-facing response) தோல்வியின் உண்மையான retry செய்யக்கூடிய தன்மையைப் பார்க்கின்றனர்.

சில gateway-கள் TEMPORARY quota தீர்ந்துவிட்டதை retry செய்ய முடியாத HTTP
status மூலம் தெரிவிக்கின்றன. `agentrouter.org` நிலையான `429`-க்குப் பதிலாக,
Chinese body (`用户额度不足` / `额度不足`) உடன் `403` (சில நேரங்களில் `400`)
ஐத் திருப்பி அனுப்புகிறது. Claude Code போன்ற client-கள் `403`-ஐ நிரந்தரப்
பிழையாகக் கருதி session-ஐ நிறுத்துகின்றன; மேலும் திருத்தம் இல்லையெனில்
fallback engine இதை quota நிகழ்வாக அல்லாமல் `AUTH_ERROR` ஆக வகைப்படுத்தும்.

**செயலாக்கம்:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — ஒரு
  provider-க்கு விதிகளின் பட்டியல் (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`); இவை `applyStatusRestatement()` மூலம்
  பொருத்தப்படுகின்றன.
- Call site: `open-sse/handlers/chatCore.ts`-இல் உள்ள
  `providerFailure:` block (சுமார் line 3654); `parseUpstreamError()` upstream
  response-ஐ error HTTP status (`!providerResponse.ok`) உடன் parse செய்த
  உடனேயே, எந்த classification இயங்குவதற்கும் முன் இது அழைக்கப்படுகிறது.
  ஆகவே ஒவ்வொரு downstream consumer-உம் திருத்தப்பட்ட status-ஐப் பார்க்கிறது.
  `200` SSE stream-க்குள் பதிக்கப்பட்ட errors தனியான, பின்னர் வரும்
  stream-parsing path-ஐப் பின்பற்றுகின்றன; அவை இன்று இந்த hook-ன்
  வரம்புக்குள் **வராது** — இது agentrouter-ன் misstatus-க்கு இன்னும்
  தேவையில்லாத, அறியப்பட்ட limitation ஆகும் (அது error HTTP status ஆக
  வெளிப்படுகிறது).
- Retry eligibility: `429` என்பது
  `RETRY_AFTER_ELIGIBLE_STATUSES`-இல்
  (`open-sse/services/combo/unavailableRetryGate.ts`) உள்ளது; எனவே restated
  error, செயலிழந்த `403` ஆக வெளிப்படுவதற்குப் பதிலாக உண்மையான retry window-ஐ
  கொண்டிருக்கும்.
- Synthetic `60s` `defaultRetryAfterMs`
  (`upstreamStatusRestatement.ts`) என்பது restated response
  **client**-க்கு தெரிவிப்பது மட்டுமே; அது connection-ன் உள்நிலைக்
  cooldown/lockout கால அளவு அல்ல — restated error-ஐ உண்மையில் கையாளும்
  mechanism-ஐப் பொறுத்து அது தனியாக நிர்ணயிக்கப்படுகிறது (Connection
  Cooldown-ன் அதிகரிக்கும் backoff, §2, API-key providers-க்கு base `3s`;
  அல்லது agentrouter போன்ற per-model-quota providers-க்கு Model Lockout,
  §3). Client-க்கு அறிவிக்கும் 60s window-வைக் காட்டிலும் router உள்நிலையில்
  மீண்டும் retry செய்யத் தகுதியானதாக மாறுவது விரைவாக இருக்கலாம் — இது
  நோக்கமுடைய headroom, bug அல்ல.

நிரந்தர errors (agentrouter-ன் `无权访问模型` — இந்த model-க்கு அணுகல் இல்லை)
ஒருபோதும் restate செய்யப்படாது: `textMarkers` பொருந்தினாலும்
`excludeMarkers` விதியைத் தடுக்கிறது; எனவே error தனது அசல் status-ஐத்
தக்கவைத்துக் கொண்டு, அது என்றென்றும் retry செய்யப்படாது. பொருந்தும் provider
classification rule
(`open-sse/config/providerErrorRules.ts`-இல் உள்ள
`agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, அறிவிக்கப்பட்ட `6h` base cooldown)
`checkFallbackError` (`open-sse/services/accountFallback.ts`) மூலம் generic
apikey-category `FORBIDDEN` early-return-க்கு _முன்_ பரிசீலிக்கப்படுகிறது;
`honorsRuleLockScope(provider)`-ஐ அடிப்படையாகக் கொண்டு
(#10334 — தற்போது `providerErrorRules.ts`-இல் உள்ள
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist மூலம் agentrouter-க்கு மட்டும்
செயல்படுத்தப்படுகிறது). Rule-ன் அறிவிக்கப்பட்ட 6h cooldown
`fallbackResult.baseCooldownMs` ஆகப் பரவுகிறது; ஆனால் அது ஏற்கெனவே உள்ள
per-model-quota lockout path-க்கே
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`) செல்கிறது (#10334 காரணமாக cooldown source
மட்டுமே மாறியுள்ளது): இது operator-ன் `mlSettings.maxCooldownMs`-க்கு
(default `1_800_000ms` / 30min) குறைக்கப்படுகிறது; மற்ற ஒவ்வொரு model
lockout-ஐப் போலவே. மேலும் _persisted lockout reason_ முன்பே hardcode
செய்யப்பட்ட `"forbidden"` ஆகவே இருக்கும்; rule-ன் `"auth_error"` அல்ல —
cooldown duration மட்டுமே end-to-end மதிக்கப்படுகிறது, reason string அல்ல.
Connection தானாகவே active-ஆக இருக்கும்; அதே connection-இல் உள்ள sibling
models பாதிக்கப்படாது.

Restated quota errors (`额度不足`) production-இல் provider rule-ஐ
அடைகின்றன (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, தனியாக அறிவிக்கப்பட்ட cooldown இல்லை — persistence
layer-ன் scaled backoff default பயன்படுத்தப்படுகிறது). #10334 முதல்,
`ProviderErrorRuleMatch`-இல் உள்ள `scope` end-to-end நுகரப்படுகிறது; ஆனால்
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-இல் உள்ள providers-க்கு மட்டும்
(`providerErrorRules.ts` — இன்று `"agentrouter"` மட்டுமே,
`honorsRuleLockScope()` வழியாக கட்டுப்படுத்தப்படுகிறது). மற்ற எல்லா
providers-க்கும் `scope` தகவல் அளிப்பதாக மட்டுமே இருக்கும்; #10334-க்கு
முன்பிருந்ததைப் போலவே. `checkFallbackError`, பொருந்திய rule-ன் scope-ஐ
`fallbackResult.ruleScope` ஆக வெளிப்படுத்துகிறது;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) என்பது `ruleScope` உண்மையில் connection-wide,
self-recovering signal ஆகப் பாதுகாப்பாக மதிக்கப்படுகிறதா என்பதை உறுதிசெய்யும்
பகிரப்பட்ட guard ஆகும் (scope `"connection"`, reason `quota_exhausted`,
`permanent` ஆக ஒருபோதும் இல்லை, `creditsExhausted` ஆக ஒருபோதும் இல்லை —
எதிர்காலத்தில் scope `"connection"`-ஐ permanent account state உடன்
இணைக்கும் rule-க்கு எதிரான பாதுகாப்பு). இதை இரண்டு consumers அழைக்கின்றன:

- **நிலைத்தன்மை** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider-ன் **ஒவ்வொரு மாடலுக்குமான** lockout கிளைக்குச் செல்லாமல்
  (agentrouter என்பது `passthroughModels: true` → `hasPerModelQuota()`
  `true` என்பதைத் தருகிறது), இது ஒரு **தற்காலிக இணைப்பு cooldown**-ஐப் பயன்படுத்துகிறது —
  `testStatus: "unavailable"` + `rateLimitedUntil`; ஒருபோதும் terminal status
  (`credits_exhausted`/`banned`/`expired`) அல்ல — எனவே கைமுறையாக credential-ஐ
  மீட்டமைக்க வேண்டியதற்குப் பதிலாக cooldown முடிந்ததும் இணைப்பு தானாகவே மீள்கிறது.
  `disableCooling: true` கொண்ட இணைப்புகளுக்கு இது தவிர்க்கப்படுகிறது (#2997):
  இந்த opt-out அதற்குப் பதிலாக per-model lockout-க்குச் செல்கிறது (ஆவணப்படுத்தப்பட்ட
  trade-off — branch-க்கு மேலுள்ள code comment-ஐப் பார்க்கவும்).
- **அதே கோரிக்கைக்குள் combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): இதே guard, இணைப்பை நினைவகத்தில் உள்ள
  `exhaustedConnections` set-க்குள், `${provider}:${connectionId}` என்ற key-ஆகக் குறிக்கிறது.
  இது ஏற்கனவே அதன் சொந்த target object-ல் அந்தத் துல்லியமான `connectionId`-ஐக் கொண்டிருக்கும்
  மீதமுள்ள SAME-REQUEST target-ஐ மட்டுமே தவிர்க்கிறது
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` lookup-க்கு முன்
  `if (provider && connectionId)`) — சாதாரண model-list combo-வில், sibling targets
  தங்களுக்கென pinned `connectionId` எதையும் கொண்டிருக்காது; ஒவ்வொரு dispatch-க்கும்
  response-இன் `X-OmniRoute-Selected-Connection-Id` header-இலிருந்து ஒன்று மட்டுமே
  resolve செய்யப்படும். ஆகவே அது ஒருபோதும் அந்த key match-ஐ அடையாது. இந்தப் பொதுவான
  சூழலில், மீதமுள்ள leg, இப்போது exhausted ஆன account-ஐ மீண்டும் பயன்படுத்தாததற்கான
  உண்மையான பாதுகாப்பு இந்த Set அல்ல — மேலுள்ள persistence layer
  (இணைப்பின் `rateLimitedUntil` இப்போது எதிர்கால நேரத்தில் உள்ளது) மற்றும் failure-க்கான
  `transientRateLimitedProviders`-ஐ இந்த same guard suppress செய்வது ஆகியவற்றின்
  சேர்க்கையே ஆகும் (`targetExhaustion.ts`-இல் உள்ள "Two-stage design" மற்றும்
  `isAgentrouterConnectionQuotaScope` branch-க்கு உட்பட்ட code comment-ஐப் பார்க்கவும்):
  அந்த Set குறியிடப்படாமல் இருப்பதால், `combo.ts`-இன்
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider-ன்
  மீதமுள்ள legs-க்கு செயல்படாது. ஆகவே credential selection-இன்
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) வழக்கம்போல்
  மதிக்கப்படும்; மீதமுள்ள leg வேறொரு, இன்னும் தகுதியுள்ள agentrouter இணைப்பைத்
  தேர்ந்தெடுக்கும் அல்லது credentials கிடைக்கவில்லை எனத் தோல்வியடையும் — இந்த branch
  இப்போது cooldown செய்த அதே இணைப்புக்குள் அது வலுக்கட்டாயமாகத் திரும்பாது.

### இரண்டு-நிலை வடிவமைப்பு: status restatement, பின்னர் classification

Status restatement (`upstreamStatusRestatement.ts`) மற்றும் provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ஆகியவை இரண்டும் provider id மற்றும் text markers-ஐ அடிப்படையாகக்
கொண்ட தனித்தனி registries ஆகும்; ஆனால் அவை வெவ்வேறு இடங்களில் இயங்கி வெவ்வேறு
நோக்கங்களுக்குச் சேவை செய்கின்றன: restatement, `chatCore.ts`-இல் HTTP status-ஐ
ஆரம்பத்திலேயே மாற்றுகிறது; classification rules, `checkFallbackError()`-க்குள்
(`open-sse/services/accountFallback.ts`) fallback `reason`-ஐத் தேர்ந்தெடுத்து,
`scope`-ஐ (`model` / `provider` / `connection`) lock செய்கின்றன.

`providerErrorRules.ts`-இல் உள்ள `FULL_TEXT_RULE_PROVIDERS` allowlist-ல்
பட்டியலிடப்பட்ட provider-களுக்கு மட்டுமே classification rules முழு error **text**-ஐப்
பார்க்கும் (உடலில் உள்ள `额度不足` போன்ற markers-ஐ match செய்ய இது தேவை) —
தற்போது `"agentrouter"` மட்டுமே உள்ளது. மற்ற ஒவ்வொரு **built-in catalog** provider-க்கும்,
`checkFallbackError`, `getProviderErrorRuleMatch`-க்கு structured error
(`{code, type}`) மட்டுமே வழங்குகிறது; header/status/code அடிப்படையிலான rules-க்கு இது
போதுமானது, ஆனால் body-text markers-ஐப் பார்க்க முடியாது. `resolveRuleMatchBody()`
helper இந்தத் தேர்வைச் செய்கிறது: allowlist-ல் உள்ள provider-களுக்கு முழு error text,
மற்றவற்றுக்கு structured error. ஒரு **built-in** provider-ஐ
`FULL_TEXT_RULE_PROVIDERS`-க்கு சேர்ப்பது, அந்த provider-க்கான வெளிப்படையான opt-in ஆகும் —
பட்டியலில் இல்லாத ஒவ்வொரு provider-க்கும் இயல்புநிலைப் பாதை byte-for-byte மாறாமல்
இருப்பதை உறுதி செய்வதற்காக இது உள்ளது.

ஒரு rule-ன் `scope` (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS`-இலிருந்து தனித்துவமான opt-in ஆகும்:
`checkFallbackError`, அதை `fallbackResult.ruleScope` ஆக மட்டுமே வெளிப்படுத்துகிறது;
மேலும் downstream consumers, அதே file-இல் உள்ள
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ல் இருக்கும் provider-களுக்கு மட்டுமே,
அதை informational label-ஐத் தாண்டிய வேறு பயனுள்ளதாகக் கருதுகின்றன
(`honorsRuleLockScope()` வழியாக gate செய்யப்படுகிறது — இன்று `"agentrouter"` மட்டுமே).
ஒரு provider அந்த allowlist-ல் இருந்த பிறகு, `scope: "connection"` match உண்மையில்
எதைச் செய்கிறது என்பதற்கு மேலுள்ள "Restated quota errors" பகுதியைப் பார்க்கவும்.

**#11104 — operator-declared rules இரண்டு allowlist-களையும் bypass செய்கின்றன.**
ஒரு operator, இந்த file-ஐத் திருத்தாமல்,
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) வழியாக
runtime-இல் provider-ஒன்றுக்கான rule-ஐ அறிவிக்கலாம்.
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — **default**
behavior-ஐப் பாதுகாக்கும் நோக்கமுடைய built-in catalog rules-க்கான allowlist-கள் —
மூலம் operator rule-ஐ gate செய்வது, ஏற்கனவே அங்கு பட்டியலிடப்பட்டுள்ள provider-களைத்
தவிர மற்ற ஒவ்வொரு provider-க்கும் settings mechanism-ஐ செயலற்றதாக்கிவிடும்; ஏனெனில்
rule-ஐ அறிவிப்பதே operator-ன் வெளிப்படையான opt-in ஆகும்.
`resolveRuleMatchBody()` மற்றும் `honorsRuleLockScope()` இரண்டும் முதலில்
`hasOperatorRuleForProvider()`-ஐச் சரிபார்க்கின்றன: operator rule கொண்ட provider,
இரண்டு allowlist-களில் ஏதேனும் ஒன்றில் இருந்தாலும் இல்லாவிட்டாலும், raw error text-ஐப்
பெற்று, அதில் அறிவிக்கப்பட்ட `scope`-ஐ மதிக்கும்.

**Operator-declared rules** (`OperatorProviderErrorRule`): ஒவ்வொரு rule-க்கும்
விருப்பத்தேர்வான `status` மற்றும் விருப்பத்தேர்வான `match` (error text-இன்
case-insensitive plain substring; ஒருபோதும் RegExp அல்ல, எனவே ReDoS ஏற்படுத்த
முடியாது) இருக்கும்; இவற்றில் குறைந்தது ஒன்றை அது அமைக்க வேண்டும். இரண்டும்
அமைக்கப்பட்டிருந்தால் அவை AND நிபந்தனையாகப் பயன்படுத்தப்படும்; விடுபட்ட field
எதையும் match செய்யும். எனவே `{match: "insufficient_quota"}` அந்த code-ஐக் கொண்ட
எந்த status-ஐயும் match செய்யும். முதலில் match ஆகும் rule வெற்றி பெறும்.
`cooldownMs` அதிகபட்சம் 30 நாட்கள் வரை ஏற்கப்படும்; மொத்தம் அதிகபட்சம் 50 rules.

**அனைத்திற்குமான இயல்புநிலைகள்** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` மூலம் அமைக்கப்படும்): `{[provider]: {cooldownMs, scope?, reason?}}`
இதில் `cooldownMs` 1 நிமிடத்திலிருந்து 30 நாட்கள் வரை இருக்கலாம். எந்த operator விதியும், எந்த built-in catalog விதியும் பொருந்தாதபோது மட்டுமே இயல்புநிலை செயல்படும்; மேலும் 402, 403, 408, 429 மற்றும் 5xx பிழைகளுக்கு மட்டுமே பொருந்தும். Request-shape பிழைகள் (400, 404, 409, 413, 422) மற்றும் தனித்த 401 பிழைகள் அவற்றின் சொந்த கையாளுதலைத் தொடரும். வெளிப்படையான `reason` இல்லையெனில், `classifyError` செய்வது போலவே status-இலிருந்து reason பெறப்படும். இயல்புநிலையை அறிவிப்பது `hasOperatorRuleForProvider()`-க்கான operator விதியாகக் கணக்கிடப்படும்; ஆகவே அதன் `scope` (இயல்புநிலை `"connection"`) மதிக்கப்படும். இயல்புநிலையின் effective cooldown என்பது அதன் `cooldownMs` மற்றும் provider-ன் சொந்த retry hint (`Retry-After`, `x-ratelimit-reset` அல்லது body-இல் உள்ள reset hint; connection-cooldown அமைப்பில் "use upstream retry hints" இயக்கப்பட்டிருக்கும்போது engine மதிக்கும் அதே hint) ஆகியவற்றில் நீளமானதாக இருக்கும். எனவே, இயல்புநிலை குறுகிய upstream hint-ஐ நீட்டிக்கலாம்; ஆனால் உண்மையான reset-ஐ ஒருபோதும் குறைக்காது. வெளிப்படையான operator விதி அதன் சரியான `cooldownMs`-ஐத் தக்கவைக்கும். `markAccountUnavailable`-இல் உள்ள connection-cooldown guards எதையும் விதியோ இயல்புநிலையோ மீறாது: செயலிலுள்ள, நீளமான cooldown ஒருபோதும் குறைக்கப்படாது; terminal status ஒருபோதும் மேலெழுதப்படாது. `checkFallbackError`-இல் முன்கூட்டியே இயங்கும் built-in text detectors (credits exhausted, daily quota, account deactivated) அவற்றுக்குரிய சொற்றொடர்களுக்கு இன்னும் முன்னுரிமை பெறும்.

**அறியப்பட்ட இடைவெளி — `providerRuleRegistry` HTTP 400-க்கு ஒருபோதும் ஆலோசிக்கப்படாது.**
`checkFallbackError`-ன் `BAD_REQUEST` branch, status 400-ஐ முழுமையாக அதன் சொந்த pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` போன்றவை `accountFallback.ts`-இல்) மூலம் வகைப்படுத்தி, அதற்கு மேலுள்ள `configuredRule`/`getProviderErrorRuleMatch` branch-ஐ அடையும் முன்பே திரும்பிவிடுகிறது.
`status: 400` கொண்ட built-in catalog rule (அல்லது operator rule) syntax ரீதியாகச் செல்லுபடியாக இருந்தாலும் ஒருபோதும் செயல்படாது. இப்போது எந்த existing rule-மும் 400-ஐ இலக்காகக் கொள்ளவில்லை; ஆகவே production-இல் எதுவும் பாதிக்கப்படவில்லை — ஆனால் எதிர்கால 400 rule-க்கு முதலில் இந்த branch-ஐ மாற்ற வேண்டும். இது rule ஒன்றைச் சேர்ப்பதைவிடப் பெரிய மாற்றமாகும் (pattern-array நடத்தையை ஏற்கனவே சார்ந்திருக்கும் ஒவ்வொரு provider-க்கும் 400-ஐ மறுவகைப்படுத்தும்), மேலும் single-provider rule addition-ன் scope-க்கு அப்பாற்பட்டது.

### புதிய quota-misstating gateway-ஐச் சேர்த்தல்

1. `statusRestatementRegistry`-இல் (`open-sse/config/upstreamStatusRestatement.ts`) ஒரு rule array-ஐப் பதிவு செய்யவும். `textMarkers`-ஐ provider-specific ஆக வைத்திருக்கவும்; `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) உடன் மோதக்கூடிய பொதுவான English சொற்றொடர்களை ஒருபோதும் மீண்டும் பயன்படுத்த வேண்டாம்.
2. சரியான lock scope-ஐத் தேர்வு செய்ய, classification rules-ஐ `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)-இல் விருப்பமாகப் பதிவு செய்யலாம் (`connection` என்பது account-wide quota-க்கு, `model` என்பது per-model errors-க்கு). முழு error text தேவைப்படும் providers-க்கு மட்டுமே இந்தப் படி production-இல் செயல்படும் (body markers): அதே கோப்பில் `FULL_TEXT_RULE_PROVIDERS`-க்கு provider id-ஐச் சேர்க்கவும் — இல்லையெனில் `checkFallbackError`, structured `{code, type}` error-ஐ மட்டுமே rule-க்கு வழங்கும்; body-text rule live traffic-இல் ஒருபோதும் பொருந்தாது.
   `status`/`headers` அடிப்படையில் மட்டும் பொருந்தும் rules-க்கு (Opencode அல்லது Minimax rules போன்றவை) இந்த opt-in தேவையில்லை. தனியாக, rule `scope: "connection"` என அறிவித்து, உண்மையான connection-wide cooldown மற்றும் same-request combo skip வேண்டும் என்ற நோக்கம் இருந்தால் (தகவல் label மட்டும் அல்ல), அதே கோப்பில் `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-க்கு provider id-ஐச் சேர்க்கவும் — இதுவே `markAccountUnavailable()` (`src/sse/services/auth.ts`) மற்றும் `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`) ஆகியவற்றில் `isAgentrouterConnectionQuotaScope()`-போன்ற consumption-ஐக் கட்டுப்படுத்துகிறது; இது இல்லையெனில் `scope`, `fallbackResult.ruleScope` வழியாகத் தொடர்ந்து செல்லும், ஆனால் அதன்படி எதுவும் செயல்படாது.
3. `tests/unit/upstream-status-restatement.test.ts` மற்றும் `tests/unit/agentrouter-error-rules.test.ts` ஆகியவற்றைப் பின்பற்றி unit tests-ஐச் சேர்க்கவும் (not-permanent / not-creditsExhausted guards உட்பட; மேலும் provider-க்கு allowlist தேவைப்பட்டால், `resolveRuleMatchBody()` அந்த provider-க்கு மட்டுமே full text-ஐத் திருப்புகிறது என்பதை உறுதிப்படுத்தும் test-ஐச் சேர்க்கவும்).

`chatCore.ts`, `classifyError` அல்லது combo-வில் எந்த மாற்றமும் தேவையில்லை.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-இல் உள்ள providers (opencode family), IP-bucketed upstream ஆகக் கருதப்படுகின்றன (opencode free tier account-bucketed அல்ல, IP-bucketed — #9611-ஐப் பார்க்கவும்): `quota_exhausted` **அல்லது** `rate_limit_exceeded` என வகைப்படுத்தப்பட்ட status-429, தோல்வியடைந்த connection-ன் last known egress IP-உடன் பொருந்தும் last known egress IP கொண்ட allowlisted-family connections அனைத்தையும் rotation அவற்றை முயற்சிப்பதற்கு முன் cooldown செய்யும்
— N-1 உறுதியாகத் தோல்வியடையும் upstream calls-ஐத் தவிர்க்கிறது (#10460/#10525 போன்ற அதே வடிவம்).
`rate_limit_exceeded` திட்டமிட்டு சேர்க்கப்பட்டுள்ளது: `markAccountUnavailable` path-இல் opencode-specific rules ஒருபோதும் பொருந்தாது (`checkFallbackError`-க்கு headers/body வழங்கப்படாது; opencode `FULL_TEXT_RULE_PROVIDERS`-இல் இல்லை). ஆகவே subscription-quota text ("monthly usage limit reached") கொண்ட body உடைய 429, `status_429` rule-ஐ அடைவதற்கு முன்பே quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) மூலம் `quota_exhausted` என வகைப்படுத்தப்படும் — அதே சமயம் quota-text இல்லாத 429 (plain rate limiting), `status_429` rule மூலம் `rate_limit_exceeded` என வகைப்படுத்தப்பட்டு, IP family-ஐயும் cooldown செய்யும். Allowlisted provider-க்கு IP-bucketed rate limit என்பது exhausted quota-வுக்குச் சமமான signal ஆகும். நியாயமான வரம்புகள்:

- **சிறந்த முயற்சி**: `proxy_logs` இலிருந்து இணைப்பின் கடைசியாக அறியப்பட்ட `egress_ip`-ஐ லாக் தீர்மானிக்கிறது (24 மணி நேரச் சாளரம், ஒத்திசைவானது, கேச் இல்லை). கேச் குளிர்நிலையில் இருந்தால் (`egress_ip` இதுவரை ஆய்வு செய்யப்படாதது) அல்லது வரிசை இல்லையெனில் → தோல்வியடைந்த இணைப்பு கிளையால் கூல்டவுன் செய்யப்படும் (இன்றையபடி பதிவு செய்யப்படும்); உடன்பிறப்பு இணைப்பு மட்டும் லாக் செய்யப்படாது.
- **ஒருபோதும் இறுதி நிலையாகாது**: கூல்டவுன் என்பது புதுப்பிக்கப்படும் ஒதுக்கீட்டுச் சாளரம் (`testStatus: "unavailable"`); IP-நிலை சிக்னலில் இருந்து நிரந்தர நிலை ஒருபோதும் பெறப்படாது. `disableCooling` இணைப்புகள் இந்தக் கிளையை முழுமையாகத் தவிர்க்கும்.
- **அனுமதிப்பட்டியலில் உள்ள குடும்பத்திற்கான லாக் நுணுக்கநிலை மாறுகிறது**: இது உடன்பிறப்பு மேம்படுத்தல் மட்டுமல்ல, ஒரு scope மாற்றமும் ஆகும். opencode ஒரு `passthroughModels` provider என்பதால், இந்தக் கிளைக்கு முன்பு 429 ஒரு per-MODEL lockout-ஐ உருவாக்கியது; இப்போது அது ஒரு connection cooldown-ஐ உருவாக்குகிறது — உடன்பிறப்பு எதுவும் இல்லாத ஒற்றை இணைப்பை இயக்கும் operator-க்கும் இது பொருந்தும். இந்த நுணுக்கநிலையே opencode விதி அட்டவணை ஏற்கனவே சரியானதாக அறிவிக்கிறது (`scope: "connection"`, `providerErrorRules.ts`); ஆனால் opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-இல் இல்லாததால் இதுவரை ஒருபோதும் மதிக்கப்படவில்லை. இந்தக் கிளை தோல்வியடைந்த இணைப்பின் cooldown + `backoffLevel`-ஐ தானாகவே எழுதுகிறது, connection-scoped agentrouter கிளையைப் பின்பற்றி, பின்னர் திரும்புகிறது — per-model block மற்றும் கீழேயுள்ள பொதுவான பாதை ஒருபோதும் அடையப்படாது.
- **Combo சேர்க்கப்பட்டுள்ளது**: agentrouter கிளையைப் போலவே, 429-க்கு combo caller பயன்படுத்தும் `persistUnavailableState`/`isCombo` downgrade-ஐ scope திட்டமிட்டு புறக்கணிக்கிறது. Per-model lockout என்பது இந்த scope-ன் பலவீனமான வடிவம் அல்ல; அது தவறான அலகாகும்: தீர்ந்து போன IP குறித்து அது எதுவும் கூறாது, எனவே combo rotation ஒவ்வொரு உடன்பிறப்புக்கும் உறுதியாகத் தோல்வியடையும் ஒரு call-ஐ தொடர்ந்து வீணடிக்கும்.
- **உடன்பிறப்பு பாதுகாப்பு**: ஏற்கனவே terminal நிலையில் (banned/credits_exhausted) இருக்கும் அல்லது ஏற்கனவே நீண்ட கூல்டவுனில் இருக்கும் உடன்பிறப்பு ஒருபோதும் மேலெழுதப்படாது.
- **பிரத்தியேக அனுமதிப்பட்டியல்**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-ஐ விரிவுபடுத்துவது வெளிப்படையான owner முடிவாகும்; பொதுவான wiring எதுவும் இல்லை (pattern #10334/#10419). உடன்பிறப்பு query அதே அனுமதிப்பட்டியலுடன் bind செய்யப்படுகிறது; அதை SQL literal ஆக மீண்டும் எழுதுவதில்லை. எனவே அதை விரிவுபடுத்துவது ஒரே வரி மாற்றமாகவே இருக்கும்.
- **Egress IP சுழற்சி, இரு திசைகளிலும்**: தேடல் சாளரம் (24 மணி நேரம்) egress-IP cache TTL-ஐ (5 நிமிடங்கள்) விட மிகவும் அகலமானது; ஆகவே "last known IP" என்பது வரலாறு, தற்போதைய நிலை அல்ல. ஒரு இணைப்பின் proxy சாளரத்திற்குள் சுழன்றிருந்தால், லாக் உண்மையில் பகிரப்பட்ட IP-ஐ **தவறவிடக்கூடும்** (பதிவுசெய்யப்பட்ட IP புதியது, இன்னும் தீர்ந்து போகாதது) — அதேபோல், தீர்ந்து போன IP-யிலிருந்து பின்னர் சுழன்று விலகிய உடன்பிறப்பையும் அது **கூல்டவுன் செய்யக்கூடும்**. இரண்டாவது நிகழ்வில் அந்த உடன்பிறப்பு ஒரு கூல்டவுன் சாளரத்தைச் செலவிடும்; இரண்டும் வரலாற்றை அடிப்படையாகக் கொண்ட தேடலின் ஏற்றுக்கொள்ளப்பட்ட சிறந்த-முயற்சி வரம்புகளாகும்.
- **செலவு**: `proxy_logs` மீது இரண்டு வரையறுக்கப்பட்ட ஸ்கேன்கள் (`idx_pl_timestamp` வழியாகச் சாளர வடிகட்டல்), 429 நிகழும் அதிர்வெண்ணில் மட்டுமே. புதிய index எதுவும் இல்லை (migration 134 YAGNI). மிதமான அளவிலான உண்மையான போக்குவரத்து DB நகலில் அளவிடப்பட்டது; அதிக throughput கொண்ட instance அதே சாளரத்தில் விகிதாசாரமாக அதிக வரிசைகளை வைத்திருக்கும்.

## மற்ற மீள்தன்மை அம்சங்கள்

- **22 ரூட்டிங் உத்திகள்** (முன்னுரிமை, எடையிடப்பட்ட, ரவுண்ட்-ராபின், சூழல்-ரிலே, நிரப்பு-முதலில், p2c, சீரற்ற, குறைந்த-பயன்படுத்தப்பட்ட, செலவு-உகந்த, மீட்டமை-அறிவு, மீட்டமை-சாளரம், காலாவதி-முதலில், ஹெட்ரூம், ஒதுக்கீடு-வெயிட்டட், கண்டிப்பான-ரேண்டம் [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ஆட்டோ, எல்.கே.ஜி.பி, சூழல்-உகந்த, கேச்-பியூஷன் பார்க்கவும்) —
- **ரீசெட்-அறிவு ரூட்டிங்** (v3.8.0) ஒதுக்கீட்டை மீட்டமைக்கும் நேரத்தின் மூலம் இணைப்புகளுக்கு — முன்னுரிமை அளிக்கிறது.
- **பின்னணி முறை சிதைவு** — பதில்கள் API `background: true` எச்சரிக்கையுடன் ஒத்திசைக்க சிதைக்கப்பட்டது.
- **டைனமிக் கருவி வரம்பு கண்டறிதல்** கருவி எண்ணிக்கை வரம்புகள் அடையும் போது — வழங்குநர்களை பின்வாங்குகிறது.
- **அவசர பின்னடைவு** — `OMNIROUTE_EMERGENCY_FALLBACK` ஆல் கட்டுப்படுத்தப்படுகிறது; ஆபரேட்டர்கள் மறுதொடக்கம் இல்லாமல் அம்சக் கொடிகள் பக்கத்திலிருந்து அதை மேலெழுதலாம்.

---

## பிழைத்திருத்தம்

- எடையிடப்பட்ட சேர்க்கை `503 all_targets_cooling_down` எனப் பதிலளிக்கிறது (`Retry-After` அமைக்கப்பட்டிருக்கும், `diagnostics.excluded` ஒவ்வொரு இலக்கையும் `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` உடன் பட்டியலிடும்) → தொகுப்பு உள்ளமைக்கப்பட்டும் இணைக்கப்பட்டும் உள்ளது; ஒவ்வொரு இலக்கும் மீட்சித்திறன் நேரங்காட்டி ஒன்றால் மட்டும் விலக்கப்பட்டுள்ளது; `[COMBO] Weighted selection: every target excluded before dispatch — …` எச்சரிக்கை காரணங்களையும் மீதமுள்ள விநாடிகளையும் குறிப்பிடுகிறது. அதே சேர்க்கையிலிருந்து வரும் `404 no_executable_targets` என்பது எந்த மீட்சித்திறன் நேரங்காட்டியும் இதில் ஈடுபடவில்லை என்பதைக் குறிக்கிறது (இயக்குவதற்கு எதுவுமில்லை அல்லது ஒவ்வொரு கணக்கும் கிடைப்புத்தன்மைச் சோதனையில் தோல்வியடைந்தது). `targetResolution.ts`-இல் சேகரிக்கப்பட்ட விலக்கல்களிலிருந்து `open-sse/services/combo/pinRecovery.ts`-இல் உருவாக்கப்பட்டுள்ளது.
- ஒரு வழங்குநருக்கான எல்லா விசைகளும் தவிர்க்கப்பட்டன → சர்க்யூட் பிரேக்கர் நிலை மற்றும் ஒவ்வொரு இணைப்பின் `rateLimitedUntil`/`testStatus` ஆகிய இரண்டையும் சரிபார்க்கவும்.
- மீட்டமைப்புச் சாளரத்திற்குப் பிறகு வழங்குநர் நிரந்தரமாக விலக்கப்படுகிறார் → `getStatus()`/`canExecute()` என்பவற்றுக்குப் பதிலாக மூல `state`-ஐப் படிக்கும் நிரல் குறியீடு.
- ஒரு விசை தோல்வியடைகிறது, மற்றவை செயல்பட வேண்டும் → சர்க்யூட் பிரேக்கரைவிட இணைப்பு குளிர்விப்பு காலத்தை விரும்பவும்.
- ஒரே ஒரு மாதிரி மட்டும் தோல்வியடைகிறது → இணைப்பு குளிர்விப்பு காலத்தைவிட மாதிரிப் பூட்டலை விரும்பவும்.
- நிலை தானாகவே மீள வேண்டும், ஆனால் மீளவில்லை → எதிர்கால நேரமுத்திரை + காலாவதியான நிலையைப் புதுப்பிக்கும் வாசிப்புப் பாதை உள்ளதா எனச் சரிபார்க்கவும். நிரந்தர நிலைகளுக்குக் கைமுறை மாற்றங்கள் தேவை.

---

## இயக்கநேர நிலை — முகவருக்கான விரைவுக் குறிப்பு

> முகவர் வழிகாட்டி 40k சூழல் வரவுசெலவுக்குள் நீடிப்பதற்காக, `AGENTS.md` → "Resilience Runtime State" (PR #12743)-இலிருந்து
> சொல்லுக்குச் சொல் நகர்த்தப்பட்டது. இது மேலுள்ள பிரிவுகளின் சுருக்கப்பட்ட, முகவரை நோக்கிய பார்வையாகும்;
> எண்ணிடப்பட்ட பிரிவுகள் முழுமையான குறிப்பாகத் தொடர்கின்றன.

OmniRoute-இல் ஒன்றுடன் ஒன்று தொடர்புடைய, ஆனால் தனித்துவமான மூன்று தற்காலிகத் தோல்வி வழிமுறைகள் உள்ளன. வழித்தட நடத்தையைப் பிழைத்திருத்தும்போது அவற்றின்
செயற்பரப்புகளைத் தனித்தனியாக வைத்திருக்கவும். ஒரே பார்வையில் புரிந்துகொள்ளக்கூடிய வரைபடத்திற்கு
[3-அடுக்கு மீட்சித்திறன் வரைபடம்](../diagrams/exported/resilience-3layers.svg)
(மூலம்: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
என்பதைப் பார்க்கவும்.

### வழங்குநர் சர்க்யூட் பிரேக்கர்

**செயற்பரப்பு**: முழு வழங்குநர், எ.கா. `glm`, `openai`, `anthropic`.

**நோக்கம்**: அப்ஸ்ட்ரீம்/சேவை நிலையில் மீண்டும் மீண்டும் தோல்வியடையும் ஒரு வழங்குநருக்கு போக்குவரத்தை அனுப்புவதை நிறுத்துவதன் மூலம், ஆரோக்கியமற்ற ஒரு வழங்குநர் ஒவ்வொரு கோரிக்கையையும் மெதுவாக்குவதைத் தடுப்பது.

**செயலாக்கம்**:

- மைய வகுப்பு: `src/shared/utils/circuitBreaker.ts`
- அரட்டை வாயில்/செயலாக்க இணைப்பு: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- இயக்கநேர நிலை API: `src/app/api/monitoring/health/route.ts`
- பகிரப்பட்ட உறைகள்: `open-sse/services/accountFallback.ts`
- நிலைத்துச் சேமிக்கப்பட்ட நிலை அட்டவணை: `domain_circuit_breakers`

**நிலைகள்** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: இயல்பான போக்குவரத்து அனுமதிக்கப்படுகிறது.
- `DEGRADED`: முன்கூட்டிய எச்சரிக்கை வரம்பு — தோல்விகள் தரக்குறைப்பு வரம்பைக் கடந்துவிட்டன, ஆனால் இன்னும்
  பிரேக்கர் வரம்பைக் கடக்கவில்லை; போக்குவரத்து தொடர்ந்து பாய்கிறது, கட்டுப்பாட்டுப் பலகைகள் எச்சரிக்கையைக் காட்டுகின்றன. செல்லுபடியாகும் இணைப்புச்
  சோதனை அல்லது புதிய தோல்வி இல்லாத அமைதியான சாளரம் இதை மீண்டும் `CLOSED` நிலைக்குக் கொண்டுவரும்
  (`docs/architecture/RESILIENCE_GUIDE.md`-இல் அந்தச் சாளரம் உள்ளது).
- `OPEN`: வழங்குநர் தற்காலிகமாகத் தடுக்கப்பட்டுள்ளார்; அழைப்பாளர்கள் வழங்குநர்-சர்க்யூட்-திறந்த பதிலைப் பெறுவர்
  அல்லது சேர்க்கை வழித்தடம் மற்றொரு இலக்கிற்குத் தாவும்.
- `HALF_OPEN`: மீட்டமைப்புக் காலாவதி முடிந்துவிட்டது; ஒரு சோதனைக் கோரிக்கையை அனுமதிக்கவும். வெற்றி
  பிரேக்கரை மூடும், தோல்வி அதை மீண்டும் திறக்கும்.

**இயல்புநிலைகள்** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
`src/lib/resilience/settings.ts`-இல் உள்ள `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` வழியாகப் பயன்படுத்தப்பட்டு →
`src/sse/handlers/chatHelpers.ts`-இல் உள்ள `getCircuitBreaker(provider, …)`-க்கு வழங்கப்படுகிறது). முழு வழங்குநருக்கான
பிரேக்கர் `circuitBreakerThreshold` / `circuitBreakerReset` அடிப்படையில் இயங்குகிறது:

| சுயவிவரம் |   தரக்குறைவது | திறப்பது (`circuitBreakerThreshold`) | மீட்டமைப்பு (`circuitBreakerReset`) |
| --------- | ------------: | -----------------------------------: | ----------------------------------: |
| OAuth     |           `5` |                                  `8` |                               `60s` |
| API விசை  |           `7` |                                 `12` |                               `30s` |
| உள்ளகம்   | (பெறப்பட்டது) |                                  `2` |                               `15s` |

`PROVIDER_PROFILES`, `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 நிமிடம்) மற்றும் `providerCooldownMs` (5/10/1 நிமிடம்) ஆகியவற்றையும் வரையறுக்கிறது: இவை
**விருப்பத்தேர்வு அடிப்படையிலான உலகளாவிய வழங்குநர் குளிர்விப்பின் சாளர வாயிலை** (`PROVIDER_COOLDOWN_ENABLED`, இயல்பாக
முடக்கப்பட்டிருக்கும்) இயக்குகின்றன — `open-sse/services/providerCooldownTracker.ts`-இல் உள்ள வழங்குநர்-நிலைப் பதிவு,
`providerFailureWindowMs`-க்குள் `providerFailureThreshold` தோல்விகள் ஏற்பட்ட பின்னரே குளிர்வதாகக் கணக்கிடப்படும்; பின்னர்
`providerCooldownMs` காலத்திற்குக் குளிர்விக்கப்படும். இவை நேரடி பிரேக்கரின் வரம்புகள் அல்ல — பிரேக்கர் நடத்தையை எதிர்பார்த்து அவற்றைச்
சரிசெய்ய வேண்டாம். ஒவ்வொரு இயல்புநிலையையும்
`OMNIROUTE_PROVIDER_BREAKER_*` மற்றும் `OMNIROUTE_CIRCUIT_BREAKER_*` சூழல் மாறிகள் வழியாக மேலெழுதலாம்;
இயக்கநேரத்துடன் துல்லியமாகப் பொருந்தும் குறிப்பு அட்டவணை `docs/architecture/RESILIENCE_GUIDE.md`-இல் உள்ளது.

வழங்குநர்-நிலைத் தோல்வி நிலைகள் மட்டுமே வழங்குநர் பிரேக்கரைத் தூண்ட வேண்டும்:

```ts
(408, 500, 502, 503, 504);
```

பெரும்பாலான `401`, `403` அல்லது `429` நிகழ்வுகள் போன்ற இயல்பான கணக்கு/விசை/மாதிரிப் பிழைகளுக்காக முழு வழங்குநர் பிரேக்கரைத்
தூண்ட வேண்டாம். அவை பொதுவாக இணைப்பு குளிர்விப்பு அல்லது மாதிரிப் பூட்டலுக்குச் சொந்தமானவை.
ஒரு பொதுவான API-விசை வழங்குநரின் `403`, முடிவான வழங்குநர்/கணக்குப் பிழையாக வகைப்படுத்தப்படாத வரை மீட்கக்கூடியதாக இருக்க வேண்டும்.

பிரேக்கர் பின்னணி டைமரைப் பயன்படுத்தாமல், தேவைக்கேற்ப மீட்பைப் பயன்படுத்துகிறது. `OPEN` காலாவதியாகும்போது, `getStatus()`, `canExecute()`, மற்றும் `getRetryAfterMs()` போன்ற வாசிப்புகள் நிலையை
`HALF_OPEN` ஆகப் புதுப்பிக்கின்றன; எனவே டாஷ்போர்டுகளும் சேர்க்கை வேட்பாளர் உருவாக்கிகளும் காலாவதியான
வழங்குநரைத் தொடர்ந்து நிரந்தரமாக விலக்கி வைக்காது.

### இணைப்பு கூல்டவுன்

**வரம்பு**: ஒரு வழங்குநர் இணைப்பு/கணக்கு/விசை.

**நோக்கம்**: அதே வழங்குநரின் மற்ற இணைப்புகள் கோரிக்கைகளைத் தொடர்ந்து வழங்க அனுமதித்தபடி,
சிக்கலான ஒரு விசை/கணக்கைத் தற்காலிகமாகத் தவிர்ப்பது.

**செயலாக்கம்**:

- எழுதுதல்/புதுப்பித்தல் பாதை: `src/sse/services/auth.ts::markAccountUnavailable()`
- கணக்குத் தேர்வு/வடிகட்டுதல்: `src/sse/services/auth.ts::getProviderCredentials...`
- கூல்டவுன் கணக்கீடு: `open-sse/services/accountFallback.ts::checkFallbackError()`
- அமைப்புகள்: `src/lib/resilience/settings.ts`

வழங்குநர் இணைப்புகளில் உள்ள முக்கியமான புலங்கள்:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

கணக்குத் தேர்வின்போது, கீழ்க்கண்ட நிபந்தனை நிலவும் வரை ஓர் இணைப்பு தவிர்க்கப்படும்:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

கூல்டவுன்களும் தேவைக்கேற்பவே செயல்படுகின்றன: `rateLimitedUntil` கடந்த காலத்தில் இருக்கும்போது, இணைப்பு மீண்டும்
தகுதிபெறுகிறது. வெற்றிகரமான பயன்பாட்டின்போது, `clearAccountError()` ஆனது `testStatus`,
`rateLimitedUntil`, பிழைப் புலங்கள் மற்றும் `backoffLevel` ஆகியவற்றை அழிக்கிறது.

இயல்புநிலை இணைப்புக் கூல்டவுன் நடத்தை:

- OAuth அடிப்படை கூல்டவுன்: `5s`.
- API-key அடிப்படை கூல்டவுன்: `3s`.
- API-key `429`, கிடைக்கும்போது மேல்நிலை மறுமுயற்சிக் குறிப்புகளுக்கு (`Retry-After`, மீட்டமைப்பு தலைப்புகள், அல்லது
  பகுக்கக்கூடிய மீட்டமைப்பு உரை) முன்னுரிமை அளிக்க வேண்டும்.
- மீண்டும் மீண்டும் ஏற்படும் மீட்டெடுக்கக்கூடிய தோல்விகள் அதிவேக அதிகரிப்புப் பின்னடைவைக் பயன்படுத்துகின்றன:

```ts
baseCooldownMs * 2 ** failureIndex;
```

கட்டுப்பாடற்ற ஒரேநேரக் கோரிக்கைகளைத் தடுக்கும் பாதுகாப்பு, ஒரே இணைப்பில் ஒரேநேரத்தில் ஏற்படும் தோல்விகள்
கூல்டவுனை மீண்டும் மீண்டும் நீட்டிப்பதையோ `backoffLevel`-ஐ இருமுறை அதிகரிப்பதையோ தடுக்கிறது.

இறுதி நிலைகள் கூல்டவுன்கள் அல்ல. `banned`, `expired` (`EXPIRED_RETRY_MAX` வழியாக N வரம்பிட்ட மறுமுயற்சிகளுக்குப் பிறகே இது இறுதி நிலையாகிறது), மற்றும் `credits_exhausted` ஆகியவை
நற்சான்றுகள்/அமைப்புகள் மாறும் வரை அல்லது ஓர் இயக்குநர் அவற்றை மீட்டமைக்கும் வரை கிடைக்காத நிலையிலேயே
இருக்க வேண்டும். இறுதி நிலைகளைத் தற்காலிகக் கூல்டவுன் நிலையால் மேலெழுத வேண்டாம்.

### மாதிரிப் பூட்டல்

**வரம்பு**: வழங்குநர் + இணைப்பு + மாதிரி.

**நோக்கம்**: ஓர் இணைப்புக்கு ஒரே ஒரு மாதிரி மட்டும் கிடைக்காதபோது அல்லது
ஒதுக்கீட்டு வரம்பை அடைந்திருக்கும்போது, முழு இணைப்பையும் முடக்குவதைத் தவிர்ப்பது.

எடுத்துக்காட்டுகள்:

- ஒவ்வொரு மாதிரிக்கும் தனித்தனி ஒதுக்கீட்டைக் கொண்ட வழங்குநர்கள் `429`-ஐத் திருப்புதல்.
- விடுபட்ட ஒரு மாதிரிக்காக உள்ளூர் வழங்குநர்கள் `404`-ஐத் திருப்புதல்.
- தேர்ந்தெடுக்கப்பட்ட Grok பயன்முறைகள் போன்ற, வழங்குநருக்கே உரிய பயன்முறை/மாதிரி அனுமதித் தோல்விகள்.

மாதிரிப் பூட்டல் `open-sse/services/accountFallback.ts`-இல் உள்ளது; அதே இணைப்பு மற்ற
மாதிரிகளுக்குத் தொடர்ந்து சேவை வழங்க இது அனுமதிக்கிறது.

### பிழைத்திருத்த வழிகாட்டுதல்

- ஒரு வழங்குநரின் அனைத்து விசைகளும் தவிர்க்கப்பட்டால், வழங்குநர் பிரேக்கர் நிலையையும் ஒவ்வொரு
  இணைப்பின் `rateLimitedUntil`/`testStatus` மதிப்புகளையும் சரிபார்க்கவும்.
- மீட்டமைப்புச் சாளரத்திற்குப் பிறகும் ஒரு வழங்குநர் நிரந்தரமாக விலக்கப்பட்டிருப்பதாகத் தோன்றினால், குறியீடு
  `getStatus()`/`canExecute()`-ஐப் பயன்படுத்துவதற்குப் பதிலாக மூல `state`-ஐ வாசிக்கிறதா எனச் சரிபார்க்கவும்.
- ஒரு வழங்குநர் விசை தோல்வியடைந்து மற்றவை செயல்பட வேண்டுமெனில், வழங்குநர் பிரேக்கருக்குப் பதிலாக
  இணைப்புக் கூல்டவுனுக்கு முன்னுரிமை அளிக்கவும்.
- ஒரே ஒரு மாதிரி மட்டும் தோல்வியடைந்தால், இணைப்புக் கூல்டவுனுக்குப் பதிலாக மாதிரிப் பூட்டலுக்கு முன்னுரிமை அளிக்கவும்.
- ஒரு நிலை தானாகவே மீள வேண்டுமெனில், அதற்கு எதிர்கால நேரமுத்திரை/மீட்டமைப்பு நேரமுடிவும்,
  காலாவதியான நிலையைப் புதுப்பிக்கும் வாசிப்புப் பாதையும் இருக்க வேண்டும். நிரந்தர நிலைகளுக்கு கைமுறையான நற்சான்று
  அல்லது கட்டமைப்பு மாற்றங்கள் தேவை.

---

## TLS கைரேகையிடல் & மறைநிலை

வழங்குநர்-குறிப்பிட்ட மறைநிலை (JA3/JA4, CCH, மறைத்தல்) தனியாக ஆவணப்படுத்தப்பட்டுள்ளது — `docs/security/STEALTH_GUIDE.md`-ஐப் பார்க்கவும் (git; `/docs`-இல் தொகுக்கப்படவில்லை).

---

## மீள்திறன் சோதனை (கட்டம் 8 · தொகுதி C)

மீள்திறன் தர்க்கத்திற்கான அலகுச் சோதனைகளுக்கு அப்பால், மூன்று சோதனைகள் உண்மையான
அழுத்தம்/தோல்வி நிலைமைகளின் கீழ் இயக்கச் சூழலைச் சோதிக்கின்றன (அனைத்தும் ஒருங்கிணைப்பு/இரவுநேரச் சோதனைகள் — எதுவும் PR-களைத் தடுக்காது):

| சோதனை            | என்ன                                                                                                                                                                                                                           | இயக்கம்                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| குழப்பம்         | போலி அப்ஸ்ட்ரீம் node உண்மையான தாமதம்/மீட்டமைப்பு/காலாவதி/503 ஆகியவற்றை உட்செலுத்துகிறது; சர்க்யூட் பிரேக்கர் திறந்து/மீள்வதையும், `checkFallbackError` 503-ஐ மீளக்கூடிய மாற்றுவழியாக வகைப்படுத்துவதையும் உறுதிப்படுத்துகிறது. | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| ஹீப் வளர்ச்சி    | `--expose-gc`-இன் கீழ் ஒவ்வொரு `createSSEStream`-க்கும் ~500 ஸ்ட்ரீம்கள்; ஹீப் உச்சவரம்பைத் தாண்டி வளர்ந்தால் தோல்வியடையும் (OOM பாதுகாப்பு #3069).                                                                            | `npm run test:heap`                        |
| k6 நீடித்த சோதனை | `/api/monitoring/health`-க்கு எதிரான தொடர்ச்சியான சுமை; p95/பிழை வரம்புகள்.                                                                                                                                                    | `k6 run tests/load/k6-soak.js` (இரவுநேரம்) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) மூலம் ஒருங்கிணைக்கப்படுகிறது. இயல்புநிலை
`test:integration`-இல், chaos மற்றும் heap தாமாகவே தவிர்க்கப்படுகின்றன (`RUN_CHAOS_INT`/`--expose-gc` இல்லாமல்).

---

## மேலும் பார்க்கவும்

- [கட்டமைப்பு வழிகாட்டி](./ARCHITECTURE.md) — கணினிக் கட்டமைப்பும் உள்செயல்பாடுகளும்
- [பயனர் வழிகாட்டி](../guides/USER_GUIDE.md) — வழங்குநர்கள், சேர்க்கைகள், CLI ஒருங்கிணைப்பு
- [தானியக்கச் சேர்க்கை இயந்திரம்](../routing/AUTO-COMBO.md) — 16-காரணி மதிப்பீடு, பயன்முறைத் தொகுப்புகள்
