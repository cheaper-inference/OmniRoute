# Resilience Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ର ତିନୋଟି ପୃଥକ କିନ୍ତୁ ସମ୍ବନ୍ଧୀୟ ସ୍ଥିରତା ପ୍ରଣାଳୀ ଅଛି \| ପ୍ରତ୍ୟେକର ଭିନ୍ନ ପରିସର ଏବଂ ଉଦ୍ଦେଶ୍ୟ ଅଛି \| ରାଉଟିଙ୍ଗ ଆଚରଣ ତ୍ରୁଟି ନିବାରଣ କରିବା ସମୟରେ ସେମାନଙ୍କୁ ଅଲଗା ରଖନ୍ତୁ \|

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> ଉତ୍ସ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **ସ୍ଥିରତା ଟୋଗଲ୍ ପାଇଁ Env-vs-dashboard ପ୍ରାଥମିକତା \|** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — ପରିବେଶରୁ ବିହନଯୁକ୍ତ ଅପ୍ଟ-ଇନ୍ ସ୍ଥିରତା ଟୋଗଲ୍ କେବଳ _ ଡିଫଲ୍ଟ_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) ଯୋଗାଏ \| `resilienceSettings` (ଡ୍ୟାସବୋର୍ଡ → ରେ ଏକ ବୁଲିଅନ୍ ରହିଲା \|** ସେଟିଂସମୂହ → ସ୍ଥିରତା \|** / `PATCH /api/resilience`, `key_value` ରେ ଗଚ୍ଛିତ) env ମୂଲ୍ୟ ଉପରେ ଜିତେ: ଯେତେବେଳେ ବି ବିଦ୍ୟମାନ ଥାଏ, ସାଧାରଣକରଣ (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) ସଂରକ୍ଷିତ ବୁଲିଅନ୍ ରଖେ \| ଏପରି ଏକ env var କୁ `true` କୁ ଏକ ନିୟୋଜନରେ ସେଟ କରିବା ଯେଉଁଠାରେ ଡ୍ୟାସବୋର୍ଡ `false` ପୂର୍ବରୁ ସଞ୍ଚୟ କରିସାରିଛି ତେଣୁ — ଟୋଗଲକୁ ଫ୍ଲିପ୍ କରୁଥିବା କିଛି ପରିବର୍ତ୍ତନ କରେ ନାହିଁ \|** ସେଟିଂସମୂହ → ସ୍ଥିରତା \|** (କିମ୍ବା ସଂରକ୍ଷିତ କ୍ଷେତ୍ରକୁ ସଫା କରନ୍ତୁ) ଏହା ପରିବର୍ତ୍ତେ \|

## 1. ପ୍ରୋଭାଇଡର ସର୍କିଟ ବ୍ରେକର

**ପରିସର:** ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରୋଭାଇଡର (ଯେପରିକି `glm`, `openai`, `anthropic`)।

**ଉଦ୍ଦେଶ୍ୟ:** ଅପଷ୍ଟ୍ରିମ/ସେବା ସ୍ତରରେ ବାରମ୍ବାର ବିଫଳ ହେଉଥିବା ପ୍ରୋଭାଇଡରକୁ ଟ୍ରାଫିକ ପଠାଇବା ବନ୍ଦ କରିବା।

**କାର୍ଯ୍ୟାନ୍ବୟନ:**

- ମୂଳ କ୍ଲାସ: `src/shared/utils/circuitBreaker.ts`
- ୱାୟରିଂ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ସ୍ଥିତି API: `GET /api/monitoring/health`
- ରିସେଟ API: `POST /api/resilience/reset`
- ର୍ୟାପର: `open-sse/services/accountFallback.ts`
- DB ଟେବୁଲ: `domain_circuit_breakers`

**ଅବସ୍ଥାଗୁଡ଼ିକ:**

- `CLOSED` — ସାଧାରଣ ଟ୍ରାଫିକ ଅନୁମତିପ୍ରାପ୍ତ
- `DEGRADED` — ଟ୍ରାଫିକ ଏବେ ବି ଅନୁମତିପ୍ରାପ୍ତ, କିନ୍ତୁ ବଢୁଥିବା ପ୍ରୋଭାଇଡର ବିଫଳତାଗୁଡ଼ିକୁ ଟ୍ରାକ୍ କରାଯାଉଛି; ଯଥେଷ୍ଟ ସଫଳତା ମିଳିଲେ, ବୈଧ ସଂଯୋଗ ପରୀକ୍ଷା ହେଲେ, କିମ୍ବା ଶେଷ ବିଫଳତା ପ୍ରକାର ପାଇଁ ସବୁଠାରୁ ଦୀର୍ଘ `OPEN` ଧାରଣ ସମୟ (ଏହାର `cooldownByKind` ମୂଲ୍ୟ, ନଚେତ୍ `resetTimeout`, × `maxBackoffMultiplier`, ଅତିକମରେ ଗୋଟିଏ କୁଲଡାଉନ) ପରେ ନୂତନ ବିଫଳତା ନ ଥିଲେ `CLOSED` କୁ ଫେରିଥାଏ
- `OPEN` — ପ୍ରୋଭାଇଡର ଅସ୍ଥାୟୀ ଭାବେ ଅବରୁଦ୍ଧ; କମ୍ବୋ ରାଉଟିଂ ଏହାକୁ ଏଡ଼ାଇ ଯାଏ
- `HALF_OPEN` — ରିସେଟ ଟାଇମଆଉଟ ସମାପ୍ତ ହୋଇଛି; ପ୍ରୋବ ଅନୁରୋଧ ଅନୁମତିପ୍ରାପ୍ତ

**ବିନ୍ୟାସଯୋଗ୍ୟ ଡିଫଲ୍ଟ (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience ରେ ଦୃଶ୍ୟମାନ):**

| ଶ୍ରେଣୀ  | DEGRADED ହେବା | OPEN ହେବା | ରିସେଟ ଟାଇମଆଉଟ |
| ------- | ------------- | --------- | ------------- |
| OAuth   | 5 ବିଫଳତା      | 8 ବିଫଳତା  | 60s           |
| API-key | 7 ବିଫଳତା      | 12 ବିଫଳତା | 30s           |
| Local   | ଉଦ୍ଭୂତ        | 2 ବିଫଳତା  | 15s           |

`degradationThreshold` ନିୟନ୍ତ୍ରଣ କରେ ଯେ ପ୍ରୋଭାଇଡର କେବେ `DEGRADED` ରେ ପ୍ରବେଶ କରିବ; `failureThreshold` ନିୟନ୍ତ୍ରଣ କରେ ଯେ ଏହା କେବେ ଖୋଲିବ ଏବଂ ଏଡ଼ାଯିବ। ସ୍ଥାନୀୟ ପ୍ରୋଭାଇଡର ପ୍ରୋଫାଇଲଗୁଡ଼ିକ ଏପର୍ଯ୍ୟନ୍ତ Resilience ସେଟିଂସ ପୃଷ୍ଠାରେ ଉପଲବ୍ଧ ନାହିଁ।

**ଟ୍ରିପ କୋଡ:** କେବଳ ପ୍ରୋଭାଇଡର-ସ୍ତରୀୟ ସ୍ଥିତି `[408, 500, 502, 503, 504]`। ଆକାଉଣ୍ଟ-ସ୍ତରୀୟ ତ୍ରୁଟି ପାଇଁ ଟ୍ରିପ କରନ୍ତୁ ନାହିଁ (ଅଧିକାଂଶ 401/403/429 — ସେଗୁଡ଼ିକ କୁଲଡାଉନ କିମ୍ବା ଲକଆଉଟ ଅନ୍ତର୍ଗତ)।

**ଧୀର ପୁନରୁଦ୍ଧାର:** ଯେତେବେଳେ `OPEN` ସମାପ୍ତ ହୁଏ, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ଅବସ୍ଥାକୁ `HALF_OPEN` କୁ ତାଜା କରନ୍ତି। ସେହି ପଠନଗୁଡ଼ିକ (ଏବଂ ପରବର୍ତ୍ତୀ ବିଫଳତା) ପୁରୁଣା `DEGRADED` କୁ ପୁଣି `CLOSED` କୁ ଫେରାଇଥାଏ। ବ୍ୟାକଗ୍ରାଉଣ୍ଡ ଟାଇମର ଆବଶ୍ୟକ ନାହିଁ।

---

### ଅପ୍ଟ-ଇନ ଗ୍ଲୋବାଲ ପ୍ରୋଭାଇଡର କୁଲଡାଉନ (ୱିଣ୍ଡୋ ଗେଟ)

ଚତୁର୍ଥ, **ଅପ୍ଟ-ଇନ** ସ୍ତର (`PROVIDER_COOLDOWN_ENABLED`, ଡିଫଲ୍ଟ **ବନ୍ଦ**) ବିଫଳ ପ୍ରୋଭାଇଡରଗୁଡ଼ିକର କ୍ରସ-ରିକ୍ୱେଷ୍ଟ ମେମୋରି `open-sse/services/providerCooldownTracker.ts` ରେ ରଖେ, ଯାହାକୁ କମ୍ବୋ ଟାର୍ଗେଟ ରିଜୋଲ୍ୟୁସନ ଦ୍ୱାରା ପରାମର୍ଶ କରାଯାଏ, ଯାହାଦ୍ୱାରା କ୍ରମାଗତ କମ୍ବୋ ଅନୁରୋଧଗୁଡ଼ିକ ହଇଁ ବିଫଳ ହୋଇଥିବା ପ୍ରୋଭାଇଡରକୁ ପୁଣି ଥରେ ଚାଲିବା ବନ୍ଦ କରନ୍ତି। ପ୍ରୋଭାଇଡର-ସ୍ତରୀୟ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକ `PROVIDER_PROFILES` ୱିଣ୍ଡୋ ଗେଟ ଅନୁସରଣ କରନ୍ତି:

| ପ୍ରୋଫାଇଲ | ପରେ ଟ୍ରିପ ହୁଏ (`providerFailureThreshold`) | ଭିତରେ (`providerFailureWindowMs`) | ପାଇଁ କୁଲ ହୁଏ (`providerCooldownMs`) |
| -------- | -----------------------------------------: | --------------------------------: | ----------------------------------: |
| OAuth    |                                       `10` |                           `15min` |                              `5min` |
| API key  |                                       `15` |                           `30min` |                             `10min` |

ଥ୍ରେସହୋଲ୍ଡ ତଳେ ପ୍ରୋଭାଇଡରକୁ କୁଲିଂ ଭାବେ ବିବେଚନା କରାଯାଏ **ନାହିଁ**; ଗୋଟିଏ ସଫଳତା ୱିଣ୍ଡୋକୁ ଖାଲି କରିଦିଏ। ସଂଯୋଗ-ସ୍ତରୀୟ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକ (`provider:connectionId`) ଏକ୍ସପୋନେନସିଆଲ `minRetryCooldownMs → maxRetryCooldownMs` ବ୍ୟାକଅଫ ବଜାୟ ରଖନ୍ତି। ଓଭରରାଇଡ: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`। ରିଗ୍ରେସନ ଗାର୍ଡ: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. ସଂଯୋଗ କୁଲଡାଉନ୍

**ପରିସର:** ଏକକ ପ୍ରଦାତା ସଂଯୋଗ/ଆକାଉଣ୍ଟ/କି।

**ଉଦ୍ଦେଶ୍ୟ:** ସେହି ପ୍ରଦାତା ପାଇଁ ଅନ୍ୟ ସଂଯୋଗଗୁଡ଼ିକ ସେବା ଜାରି ରଖୁଥିବାବେଳେ ଗୋଟିଏ ତ୍ରୁଟିପୂର୍ଣ୍ଣ କିକୁ ଏଡ଼ାଇବା।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ଅନୁପଲବ୍ଧ ଭାବେ ଚିହ୍ନଟ: `src/sse/services/auth.ts::markAccountUnavailable()`
- ଚୟନ: ସେହି ଫାଇଲ୍ରେ `getProviderCredentials*`
- କୁଲଡାଉନ୍ ଗଣନା: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ସେଟିଂସ୍: `src/lib/resilience/settings.ts`

**ପ୍ରତ୍ୟେକ ସଂଯୋଗ ପାଇଁ ଫିଲ୍ଡଗୁଡ଼ିକ:**

- `rateLimitedUntil` — କୁଲଡାଉନ୍ ସମାପ୍ତ ହେବା ପର୍ଯ୍ୟନ୍ତ ଟାଇମ୍ଷ୍ଟାମ୍ପ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ଏକ୍ସପୋନେନ୍ସିଆଲ୍ ବ୍ୟାକଅଫ୍ କାଉଣ୍ଟର୍

**ଡିଫଲ୍ଟ କୁଲଡାଉନ୍:**

- OAuth ଆଧାର: 5s
- API-key ଆଧାର: 3s
- API-key 429: upstream `Retry-After`/reset ହେଡର୍ଗୁଡ଼ିକ/ପାର୍ସ କରିହେବା ଯୋଗ୍ୟ reset ଟେକ୍ସଟ୍କୁ ପ୍ରାଥମିକତା ଦିଏ
- ବ୍ୟାକଅଫ୍: `baseCooldownMs * 2 ** failureIndex`

**ପ୍ରଦାତା-ଭିତ୍ତିକ ପୁନଃଚେଷ୍ଟା ବିଳମ୍ବ।** ପ୍ରଦାତା ବିବରଣୀ ପୃଷ୍ଠାରେ ଏକ **Retry delay** ଚୟନ ଅଛି (Auto, 15s ରୁ 1h ପର୍ଯ୍ୟନ୍ତ)। ଏହା `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`-ରେ ସଞ୍ଚୟ ହୁଏ (1–21600, `PATCH /api/resilience` ମାଧ୍ୟମରେ)। ଯେତେବେଳେ ଏକ rate-limit ତ୍ରୁଟିରେ upstream ପୁନଃଚେଷ୍ଟା ସଙ୍କେତ ନଥାଏ, ସେତେବେଳେ ଏହି ମୂଲ୍ୟ ପ୍ରଦାତା ପାଇଁ scaled backoffକୁ ପ୍ରତିସ୍ଥାପିତ କରେ ଏବଂ `backoffLevel`କୁ 0ରେ reset କରେ (`open-sse/services/rotationConfig.ts::overrideFor`)। Rate-limited ତ୍ରୁଟି ପାଇଁ ପ୍ରାଥମିକତା, ସର୍ବୋଚ୍ଚରୁ ଆରମ୍ଭ କରି: upstream retry hint, ତାପରେ ପ୍ରତି-ସଂଯୋଗ `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, ତାପରେ ପ୍ରଦାତା-ଭିତ୍ତିକ retry delay, ତାପରେ env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, ଏବଂ ଶେଷରେ scaled backoff। Auto ଫିଲ୍ଡଟିକୁ ହଟାଇଦିଏ। ଏହା କେବଳ rate-limit କାରଣକୁ ପ୍ରଭାବିତ କରେ, terminal stateଗୁଡ଼ିକୁ କେବେ ନୁହେଁ।

**Anti-thundering-herd ଗାର୍ଡ:** ସମକାଳୀନ ବିଫଳତାଗୁଡ଼ିକ କୁଲଡାଉନ୍କୁ ଅତ୍ୟଧିକ ବଢ଼ାଇବା କିମ୍ବା `backoffLevel`କୁ ଦୁଇଥର ବୃଦ୍ଧି କରିବାରୁ ପ୍ରତିରୋଧ କରେ।

**Concurrency-limit 429ଗୁଡ଼ିକ ବ୍ୟାକଅଫ୍ ଧାପରେ ବଢ଼େ ନାହିଁ।** ଯେଉଁ `429`ର bodyରେ ଏକ concurrency limit ରିପୋର୍ଟ ହୁଏ ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`), ତାହାର ଅର୍ଥ ହେଉଛି ଆକାଉଣ୍ଟଟି ସୁସ୍ଥ ଅଛି କିନ୍ତୁ ବ୍ୟସ୍ତ। `checkFallbackError()` `concurrency_limited` କାରଣ ଫେରାଇଦିଏ: ବର୍ତ୍ତମାନ ଅଗ୍ରଗାମୀ ସଂଯୋଗକୁ fail over କରେ, ଏହି ସଂଯୋଗକୁ ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) କିମ୍ବା upstream retry hint ପାଇଁ କୁଲ୍ କରେ, `backoffLevel`କୁ ଅପରିବର୍ତ୍ତିତ ରଖେ ଏବଂ `skipProviderBreaker` ସେଟ୍ କରେ। ଏକ ସ୍ପଷ୍ଟ quota body ଏବେ ମଧ୍ୟ ପ୍ରାଧାନ୍ୟ ପାଏ, ତେଣୁ quota pattern ସହିତ ମଧ୍ୟ ମେଳ ଖାଉଥିବା body quota verdict ଭାବେ ରହେ। ଚିହ୍ନଟ: `src/shared/utils/classify429.ts`ରେ `looksLikeConcurrencyLimit()`; verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`। `classify429()` (breakerର `FailureKind`) ଅପରିବର୍ତ୍ତିତ ରହେ ଏବଂ ଏହି bodyଗୁଡ଼ିକ ପାଇଁ ଏବେ ମଧ୍ୟ `rate_limit` ପଢ଼େ।

**Stream content stall ଆକାଉଣ୍ଟକୁ କୁଲ୍ କରେ ନାହିଁ।** ଯେତେବେଳେ content-stall watchdog (`open-sse/utils/streamHandler.ts`) ସମୟ ମଧ୍ୟରେ କୌଣସି model output ପଠାଇନଥିବା ଏକ streamକୁ ଛାଡ଼ିଦିଏ, `markAccountUnavailable()` ସଂଯୋଗରେ ତ୍ରୁଟିଟି ରେକର୍ଡ କରେ କିନ୍ତୁ କୌଣସି କୁଲଡାଉନ୍ ସେଟ୍ କରେ ନାହିଁ: stallଟି ସେହି requestର ଅଂଶ, ସାଧାରଣତଃ ଏକ ଦୀର୍ଘ reasoning turn ଯେଉଁଥିରେ ଏପର୍ଯ୍ୟନ୍ତ output ଆସିନାହିଁ। ଅପରେଟରମାନେ `resilienceSettings.streamStallCooldown.enabled` (ଡିଫଲ୍ଟ `false`) ମାଧ୍ୟମରେ ଏହାକୁ ପୁନଃସକ୍ରିୟ କରିପାରିବେ।

**`p2c` ଆକାଉଣ୍ଟ ଚୟନ ପାଇଁ ଅପ୍ଟ-ଇନ୍ latency signal।** ପ୍ରତ୍ୟେକ dispatched attempt ପ୍ରତ୍ୟେକ ସଂଯୋଗ ପାଇଁ (ଏବଂ ସଂଯୋଗ + model ପାଇଁ) ତାହାର time-to-first-byte ଏବଂ outcomeକୁ ଏକ in-memory rolling windowରେ ରେକର୍ଡ କରେ: 15 ମିନିଟ୍ ମଧ୍ୟରେ ଶେଷ 20ଟି sample (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts`ର `safeLogEvents()`ରୁ ରେକର୍ଡ କରାଯାଏ)। ଯେତେବେଳେ `resilienceSettings.p2cLatency.weight` `0` ଠାରୁ ଅଧିକ ଥାଏ (range 0-20, ଡିଫଲ୍ଟ `0` = off), `src/sse/services/auth.ts`ର `compareP2CConnections()` ଯୁଗଳର ପ୍ରତ୍ୟେକ candidateକୁ ସର୍ବାଧିକ `weight` ପଏଣ୍ଟ ଯୋଗ କରେ। ଏଥିରୁ ଅଧା faster candidate ସହିତ latency ଅନୁପାତରୁ ଆସେ (ଦୁଇଗୁଣ ଧୀର ହେଲେ ସମ୍ପୂର୍ଣ୍ଣ ଅଧା ମିଳେ) ଏବଂ ଅଧା rolling error rateରୁ ଆସେ। ଏହି term କେବଳ ସେତେବେଳେ ପ୍ରୟୋଗ ହୁଏ ଯେତେବେଳେ ଉଭୟ candidateରେ ଅତିକମରେ 3ଟି sample ଥାଏ, ତେଣୁ ନୂତନ ଆକାଉଣ୍ଟଗୁଡ଼ିକୁ ଦଣ୍ଡିତ କରାଯାଏ ନାହିଁ, ଏବଂ ଏହାର ceiling quota-blocked ଏବଂ quota-exhausted penaltyଗୁଡ଼ିକଠାରୁ କମ୍ ରହେ। ଏହା ନିଜସ୍ୱ କୌଣସି circuit ଯୋଗ କରେ ନାହିଁ: ବିଫଳ ଆକାଉଣ୍ଟଗୁଡ଼ିକୁ cooldown, lockout ଏବଂ breaker layerଗୁଡ଼ିକ ଦ୍ୱାରା ଏବେ ମଧ୍ୟ ପରିଚାଳନା କରାଯାଏ। ଏହାକୁ `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ମାଧ୍ୟମରେ ସେଟ୍ କରନ୍ତୁ।

**Reasoning frameଗୁଡ଼ିକ content-stall budgetକୁ ପୁନଃଆରମ୍ଭ କରେ।** ଏକ reasoning model ତାହାର ପ୍ରଥମ ଦୃଶ୍ୟମାନ token ପୂର୍ବରୁ କିଛି ମିନିଟ୍ ଚିନ୍ତା କରିପାରେ: Claude `thinking_delta` frame stream କରେ ଯାହାର thinking text ଖାଲି ହୋଇପାରେ, ଏବଂ Responses API ଗୋଟିଏ reasoning item ପରେ ଆଉ ଗୋଟିଏ reasoning item stream କରେ। `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ଏହି frameଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରେ, ଏବଂ watchdog ପ୍ରତ୍ୟେକ frameରେ ଏହାର budgetକୁ ପୁନଃଆରମ୍ଭ କରେ, turnକୁ cancel କରେ ନାହିଁ। ଏଗୁଡ଼ିକ ଏବେ ମଧ୍ୟ model output ନୁହେଁ, ତେଣୁ କେବଳ reasoningରେ ଶେଷ ହେଉଥିବା turnକୁ ଏବେ ମଧ୍ୟ empty ଭାବେ ରିପୋର୍ଟ କରାଯାଏ, ଏବଂ reasoning ବନ୍ଦ କରି କେବଳ heartbeat ପଠାଉଥିବା turn ଏବେ ମଧ୍ୟ watchdogକୁ trigger କରେ।

ଖାଲି ନଥିବା signature ସହିତ Kiroର binary `reasoningContentEvent` frameଗୁଡ଼ିକ executor ମାଧ୍ୟମରେ ଏହି reasoning activityକୁ ଏକ ଖାଲି `reasoning_content` delta ଭାବେ ସଂରକ୍ଷଣ କରେ। Signatureଟି forward କରାଯାଏ ନାହିଁ। Metadata, ଅସମ୍ପୂର୍ଣ୍ଣ frame ଏବଂ ଖାଲି signatureଗୁଡ଼ିକ content budgetକୁ ପୁନଃଆରମ୍ଭ କରେ ନାହିଁ; ସ୍ୱାଧୀନ active-stream timeout ଏବଂ client cancellation ଏବେ ମଧ୍ୟ ପ୍ରୟୋଗ ହୁଏ (`open-sse/executors/kiro/reasoning.ts`)।

**Terminal stateଗୁଡ଼ିକ (କୁଲଡାଉନ୍ ନୁହେଁ):**

- `banned` — banned-keyword / account-ban detection ଦ୍ୱାରା ସେଟ୍ ହୁଏ ([BAN_DETECTION](../security/BAN_DETECTION.md) ଦେଖନ୍ତୁ)। Upstream per-request refusal (`request_rejected`, ଯଥା Anthropic OAuth 403 "Request not allowed") କେବେ ମଧ୍ୟ ଏହାକୁ ସେଟ୍ କରେ ନାହିଁ: ଏଗୁଡ଼ିକୁ ସଂଯୋଗ ଏବଂ model ଅନୁସାରେ ଗଣନା କରାଯାଏ ଏବଂ ବଢ଼ୁଥିବା କୁଲଡାଉନ୍ ସହିତ ସେହି modelକୁ rotationରୁ ବାହାର କରାଯାଏ, ଯାହା `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h)ରେ ସୀମିତ ରହେ; କିମ୍ବା କୌଣସି model ଜଣା ନଥିଲେ ସଂଯୋଗକୁ କୁଲ୍ କରାଯାଏ — `open-sse/services/requestRejectedStreak.ts`
- `expired` (ସୀମିତ ପୁନଃଚେଷ୍ଟା ପରେ terminalକୁ ପରିବର୍ତ୍ତିତ ହୁଏ — exponential backoff ସହିତ `EXPIRED_RETRY_MAX = 3` — ଯାହା ଦ୍ୱାରା ଆକାଉଣ୍ଟଟି ସ୍ଥାୟୀ ଭାବେ deactivated ହେବା ପୂର୍ବରୁ transient OAuth ତ୍ରୁଟିଗୁଡ଼ିକ ସ୍ୱୟଂ ସୁସ୍ଥ ହୋଇପାରେ)
- `credits_exhausted`

ଏଗୁଡ଼ିକ ପ୍ରମାଣପତ୍ର ପରିବର୍ତ୍ତନ ହେବା କିମ୍ବା କୌଣସି ଅପରେଟର ସେଗୁଡ଼ିକୁ ରିସେଟ୍ କରିବା ପର୍ଯ୍ୟନ୍ତ ରହିଥାଏ। ଟର୍ମିନାଲ୍ ଅବସ୍ଥାଗୁଡ଼ିକୁ ଅସ୍ଥାୟୀ କୁଲ୍ଡାଉନ୍ ଅବସ୍ଥାରେ ଓଭରରାଇଟ୍ କରନ୍ତୁ ନାହିଁ।

**ଲେଜି ପୁନରୁଦ୍ଧାର:** `rateLimitedUntil` ଅତୀତରେ ଥିଲେ, ସଂଯୋଗ ପୁଣି ଯୋଗ୍ୟ ହୋଇଯାଏ। ସଫଳ ବ୍ୟବହାର ପରେ, `clearAccountError()` ସମସ୍ତ ତ୍ରୁଟି କ୍ଷେତ୍ରକୁ ସଫା କରେ।

### Claude OAuth ବ୍ୟବହାର ସୀମା: ନିମ୍ନ-ପ୍ରାଥମିକତା ଲେନ୍ + ସେସନ୍-ସୀମା ରିସେଟ୍

**ପରିସର:** ଗୋଟିଏ Claude ସବ୍ସକ୍ରିପ୍ସନ୍ (OAuth) ସଂଯୋଗ। ଉଭୟ ବୈଶିଷ୍ଟ୍ୟ **ପ୍ରତି ସଂଯୋଗ ଅପ୍ଟ-ଇନ୍** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, ଉଭୟର ଡିଫଲ୍ଟ ବନ୍ଦ) ଏବଂ Claude Code ର `/low-priority` ଓ `/limit-reset` କମାଣ୍ଡଗୁଡ଼ିକୁ ଅନୁସରଣ କରେ (ୱାୟାର୍ କନ୍ଟ୍ରାକ୍ଟ Claude Code 2.1.263 ରୁ ଗ୍ରହଣ କରାଯାଇଛି)।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ଷ୍ଟେଟ୍ ମେସିନ୍ + ପ୍ରତିକ୍ରିୟା ବର୍ଗୀକରଣ: `open-sse/services/claudeLowPriority.ts`
- ରିସେଟ୍ ସ୍ଥିତି/କ୍ଲେମ୍ କ୍ଲାଏଣ୍ଟ: `open-sse/services/claudeLimitReset.ts`
- ଏକ୍ସିକ୍ୟୁଟର୍ ହୁକ୍ (ହେଡର୍ ଇଞ୍ଜେକ୍ସନ୍ + ସମାନ-ଆକାଉଣ୍ଟ ପୁନଃଚେଷ୍ଟା): `open-sse/executors/base.ts::execute()`
- ଅପ୍ଟ-ଇନ୍ ପର୍ସିଷ୍ଟେନ୍ସ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ଟ୍ରିଗର୍:** 5-ଘଣ୍ଟିଆ ବ୍ୟବହାର ସୀମା — ଏକ `429`, ଯାହାର ହେଡର୍ଗୁଡ଼ିକରେ
`anthropic-ratelimit-unified-status: rejected` ଏବଂ, ଯେତେବେଳେ ଆକାଉଣ୍ଟ ଯୋଗ୍ୟ ଥାଏ,
`anthropic-ratelimit-unified-slow-offer: treatment` ରହେ। ପ୍ରଥମ ସୀମା
`429` ପୂର୍ବରୁ କିଛି ପଠାଯାଏ ନାହିଁ; unified ହେଡର୍ ବିନା ଆସିଥିବା burst `429` ସାଧାରଣ କୁଲ୍ଡାଉନ୍ ପଥ ଦେଇ ଯାଏ।

**ନିମ୍ନ-ପ୍ରାଥମିକତା ଲେନ୍** (`lowPriorityMode`):

- ସୀମା `429` ରେ ଏକ୍ସିକ୍ୟୁଟର୍ ଅଫର୍କୁ ଗ୍ରହଣ କରେ ଏବଂ ତୁରନ୍ତ ସେହି **ସମାନ**
  ଆକାଉଣ୍ଟକୁ `anthropic-usage-limit: slow` ସହିତ ପୁନଃଚେଷ୍ଟା କରେ; ଘୋଷିତ
  `anthropic-ratelimit-unified-reset` (+60s grace) ପର୍ଯ୍ୟନ୍ତ ଲେନ୍ ସକ୍ରିୟ ରହେ ଏବଂ ସେହି ସମୟସୀମାରେ ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଏହି ହେଡର୍ ବହନ କରେ। ଅବରୋଧିତ `429` `handleChatCore` ପର୍ଯ୍ୟନ୍ତ ପହଞ୍ଚେ ନାହିଁ, ତେଣୁ ସଂଯୋଗକୁ କୁଲ୍ଡାଉନ୍ରେ ରଖାଯାଏ ନାହିଁ ଏବଂ ଅନ୍ୟ ସଂଯୋଗକୁ ଘୁରାଇ ଦିଆଯାଏ ନାହିଁ।
- ପରବର୍ତ୍ତୀ ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକରେ `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` ଲେନ୍କୁ ଜାରି ରଖେ; `slot_busy` (429) କିମ୍ବା `529` ମିଳିଲେ ସର୍ଭର୍ର `anthropic-ratelimit-unified-slow-retry-after` ଅନୁସାରେ ଅପେକ୍ଷା କରି ପୁନଃଚେଷ୍ଟା କରେ (ଡିଫଲ୍ଟ 20s, 5–600s ସୀମା, ±30% ଜିଟର୍), ଏବଂ `anthropic-ratelimit-unified-slow-max-wait` ଦ୍ୱାରା ସୀମିତ ରହେ (ଡିଫଲ୍ଟ 20 ମିନିଟ୍, 1 ମିନିଟ୍–6 ଘଣ୍ଟା ସୀମା) — ଏହା ଅତିକ୍ରମ ହେଲେ ଲେନ୍ ସମାପ୍ତ ହୁଏ ଏବଂ 10 ମିନିଟ୍ର କୁଲ୍-ଅଫ୍ ପୁନଃଗ୍ରହଣକୁ ଅବରୋଧ କରେ। ଅପେକ୍ଷା ସମୟ ଅନୁରୋଧର ନିଜସ୍ୱ upstream-start timeout (`resolveFetchStartTimeout`, ଡିଫଲ୍ଟ 10 ମିନିଟ୍) ରେ ଅବଶିଷ୍ଟ ସମୟରୁ 5s ମାର୍ଜିନ୍ କମାଇ ଯେତେ ରହେ, ସେଥିରେ ମଧ୍ୟ ସୀମିତ ହୁଏ: ଏହି ସୀମା ନଥିଲେ ଡିଫଲ୍ଟ 20-ମିନିଟ୍ max-wait ଅନୁରୋଧଠାରୁ ଅଧିକ ସମୟ ଚାଲିଯାଇଥାନ୍ତା ଏବଂ sleep ମଝିରେ ବାତିଲ୍ ହୋଇ, ସୁଗମ `max_wait` ସମାପ୍ତି + କୁଲ୍-ଅଫ୍ର ବଦଳରେ `TimeoutError` ପ୍ରକାଶ ପାଇଥାନ୍ତା।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-window rollover, କିମ୍ବା
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ଯାହା ଏବେ paid overage ଦ୍ୱାରା ସୀମା ଆବୃତ ହେଉଥିବାରୁ ଯେକୌଣସି ସ୍ଥିତିରେ ଏହାକୁ `extra_usage` ଭାବେ ସମାପ୍ତ କରେ) ଲେନ୍କୁ ସମାପ୍ତ କରେ; ତାପରେ ପ୍ରତିକ୍ରିୟା ସାଧାରଣ କୁଲ୍ଡାଉନ୍ ପଥକୁ ଯାଏ। ଘୋଷିତ ବଜେଟ୍ ରିସେଟ୍ (≤ 8 ଦିନ) ପର୍ଯ୍ୟନ୍ତ `budget_exhausted` ମନେ ରଖାଯାଏ।
- ଏକ୍ସିକ୍ୟୁଟର୍ର ନିଜସ୍ୱ 400-ଚାଳିତ intra-attempt ପୁନଃଚେଷ୍ଟାଗୁଡ଼ିକ (context editing, thinking/effort clamps, param auto-learn) ପରେ wall check ଚାଲେ, ତେଣୁ ସେହି ପୁନଃଚେଷ୍ଟାଗୁଡ଼ିକ ମଧ୍ୟରୁ କେବଳ ଗୋଟିଏରେ ପ୍ରକାଶ ପାଇଥିବା wall `429` ମଧ୍ୟ cooldown ପଥକୁ ପହଞ୍ଚିବା ପରିବର୍ତ୍ତେ ଅବରୋଧିତ ହୁଏ।
- ସ୍ଥିତି ପ୍ରତି ସଂଯୋଗ ମେମୋରିରେ ରହେ (ରିଷ୍ଟାର୍ଟ କଲେ ପୁନଃଗ୍ରହଣ ପାଇଁ ଗୋଟିଏ ଅତିରିକ୍ତ wall `429` ଆବଶ୍ୟକ ହୁଏ)।

**ସେସନ୍-ସୀମା ରିସେଟ୍** (`autoLimitReset`, ଉଭୟ ସକ୍ରିୟ ଥିଲେ ଲେନ୍ ପୂର୍ବରୁ ଚେଷ୍ଟା କରାଯାଏ):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ବ୍ଲକ୍; ଯେତେବେଳେ `arm: "reset"` ଏବଂ `available: true` ଥାଏ,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ସହିତ
  `{ "program": "juniper_tide" }` (ସଂଗଠନ UUID `providerSpecificData.organizationUUID` ରୁ, bootstrap fallback)।
- `result: reset|not_limited` → ଅନୁରୋଧକୁ ପୂର୍ଣ୍ଣ ଗତିରେ ପୁନଃଚେଷ୍ଟା କରାଯାଏ (slow header ବିନା)।
  `already_used` / `not_offered` `next_available_at` କୁ ମେମୋ କରେ (ଡିଫଲ୍ଟ ଏକ ସପ୍ତାହ); ଯେକୌଣସି ବିଫଳତା 15 ମିନିଟ୍ ପାଇଁ back off କରେ। ରିସେଟ୍ ସପ୍ତାହକୁ ଥରେ ହୁଏ ଏବଂ ତଥାପି ସାପ୍ତାହିକ ସୀମାରେ ଗଣାଯାଏ।

ରିଗ୍ରେସନ୍ ଗାର୍ଡ୍: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### ସେସନ୍ ଆଫିନିଟି (#7274)

**ପରିସର:** ଯେକୌଣସି ପ୍ରୋଭାଇଡର୍ ପାଇଁ ଗୋଟିଏ କ୍ଲାଏଣ୍ଟ ସେସନ୍ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) ଗୋଟିଏ ସଂଯୋଗରେ ପିନ୍ କରାଯାଏ।

**ଉଦ୍ଦେଶ୍ୟ:** ଏକ ମଲ୍ଟି-ଟର୍ନ୍ ଏଜେଣ୍ଟ୍ (Claude Code, aider, custom agents) କୁ ଅନୁରୋଧଗୁଡ଼ିକ ମଧ୍ୟରେ ସମାନ ଆକାଉଣ୍ଟରେ ରଖିବା, ଯାହାଦ୍ୱାରା ପ୍ରତି-ଆକାଉଣ୍ଟ ସେସନ୍ ସ୍ଥିତି ଥିବା ପ୍ରୋଭାଇଡର୍ଗୁଡ଼ିକରେ ଆକାଉଣ୍ଟ-ପରିବର୍ତ୍ତନ ଯୋଗୁଁ context loss ଏବଂ ପୁନରାବୃତ୍ତ cold-start 429 କମିଥାଏ।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ପିନ୍ ଚୟନ/ସୃଷ୍ଟି: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ହେଡର୍ ନିଷ୍କାଷଣ (ସାଧାରଣ, ଯେକୌଣସି ପ୍ରୋଭାଇଡର୍): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- ପର୍ସିଷ୍ଟେଡ୍ ପିନ୍ ଟେବୁଲ୍: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ସେଟିଂ: `sessionAffinityTtlMs` (ମିଲିସେକେଣ୍ଡରେ ଗ୍ଲୋବାଲ୍ TTL, `0` ଅକ୍ଷମ କରେ) — `src/lib/db/settings.ts`। ମାଇଗ୍ରେସନ୍ `124_generic_session_affinity_ttl.sql` ଦ୍ୱାରା କେବଳ Codex ପାଇଁ ଥିବା `codexSessionAffinityTtlMs` ରୁ ନାମ ପରିବର୍ତ୍ତନ କରାଯାଇଛି; ପୂର୍ବରୁ କନ୍ଫିଗର୍ କରାଯାଇଥିବା Codex TTL କୁ ନୂତନ ଡିଫଲ୍ଟ ଭାବେ ରଖାଯାଏ।

#7274 ପୂର୍ବରୁ, `resolveSessionAffinityTtlMs()` `codex` ବ୍ୟତୀତ ପ୍ରତ୍ୟେକ ପ୍ରୋଭାଇଡର୍ ପାଇଁ `0` କୁ ତୁରନ୍ତ ଫେରାଇ ଦେଉଥିଲା, ତେଣୁ ପିନିଂ ବ୍ୟବସ୍ଥା ଏବଂ ହେଡର୍ ନିଷ୍କାଷଣ ପୂର୍ବରୁ ପ୍ରୋଭାଇଡର୍-ଅଗ୍ନୋଷ୍ଟିକ୍ ଥିଲେ ମଧ୍ୟ TTL ସେଟିଂ (ଏବଂ ସେସନ୍ ହେଡର୍ଗୁଡ଼ିକ) ଅନ୍ୟ କୌଣସି ସ୍ଥାନରେ ପ୍ରଭାବ ପକାଉନଥିଲା। ଏହି ସୁଧାରଣା ସେହି early-return କୁ ହଟାଇ ଦେଇଛି; ଗ୍ଲୋବାଲ୍ ଭାବେ `0` ଠାରୁ ଅଧିକ ସେଟ୍ କରାଗଲେ TTL ଏବେ ପ୍ରତ୍ୟେକ ପ୍ରୋଭାଇଡର୍ରେ ସମାନ ଭାବରେ ଲାଗୁ ହୁଏ।

ତିନୋଟି session-affinity ହେଡର୍ କେବେ ମଧ୍ୟ upstream କୁ ଫରୱାର୍ଡ ହୁଏ ନାହିଁ — ଏକ୍ସିକ୍ୟୁଟର୍ଗୁଡ଼ିକ କ୍ଲାଏଣ୍ଟ ହେଡର୍ଗୁଡ଼ିକୁ ପାସ୍ କରିବା ପରିବର୍ତ୍ତେ ନିଜସ୍ୱ upstream ହେଡର୍ ଶୂନ୍ୟରୁ ତିଆରି କରନ୍ତି, ତେଣୁ ଏହା କେବଳ ଏକ ଆଭ୍ୟନ୍ତରୀଣ correlation id ଭାବେ ରହେ।

### ସ୍ୱତନ୍ତ୍ର ପରିଚାଳିତ ସେସନ୍ ସଂଯୋଗ ଲିଜ୍ଗୁଡ଼ିକ

**ପରିସର:** ଗୋଟିଏ ସକ୍ରିୟ managed HTTP client/session ଗୋଟିଏ ଯୋଗ୍ୟ OmniRoute ସଂଯୋଗର ମାଲିକ ହୁଏ।

**ଉଦ୍ଦେଶ୍ୟ:** ଅନୁରୋଧଗୁଡ଼ିକ ମଧ୍ୟରେ କଠୋର routing ସୀମା ଆବଶ୍ୟକ କରୁଥିବା clientମାନଙ୍କ ପାଇଁ ସ୍ଥାୟୀ ଏକାଧିକାରୀ ସଂଯୋଗ ମାଲିକାନା ପ୍ରଦାନ କରିବା। ଏହା session affinity ଠାରୁ ଭିନ୍ନ, ଯାହା ଏକ ନରମ ନିରନ୍ତରତା ପସନ୍ଦ:
ଏକ exclusive lease ଜୀବନଚକ୍ର ଅବସ୍ଥାକୁ SQLiteରେ ସ୍ଥାୟୀ କରେ, ସମସ୍ତ ସକ୍ରିୟ-ମାଲିକ ଏବଂ
ସକ୍ରିୟ-ସଂଯୋଗ ଏକକତାକୁ ବାଧ୍ୟତାମୂଳକ କରେ, ଏବଂ provider dispatch ପୂର୍ବରୁ ଏକ ପୁରୁଣା generationକୁ
ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ।

ଏହି ବୈଶିଷ୍ଟ୍ୟଟି ପ୍ରତି API key ପାଇଁ opt-in ଅଟେ। ଏକ managed keyରେ `lease:exclusive` scope ଏବଂ
ସ୍ପଷ୍ଟ ଭାବରେ ଖାଲି ନଥିବା `allowedConnections` ତାଲିକା ଥିବା ଆବଶ୍ୟକ। ଯେକୌଣସି HTTP client lifecycle endpoint ବ୍ୟବହାର କରିପାରେ; କୌଣସି
client ନାମ, user-agent, provider, OAuth ପଦ୍ଧତି, କିମ୍ବା model ଆବଶ୍ୟକ ନୁହେଁ। Lease ଗୋଟିଏ ସଂଯୋଗର ମାଲିକ ହୁଏ,
modelର ନୁହେଁ, ତେଣୁ ସଂଯୋଗଟି ସାଧାରଣ ଭାବରେ ଯୋଗ୍ୟ ରହିଥିବା ପର୍ଯ୍ୟନ୍ତ model ପରିବର୍ତ୍ତନ bindingକୁ
ବଜାୟ ରଖେ। ସାଧାରଣ model, quota, health, cooldown, ଏବଂ allowlist ନିୟମଗୁଡ଼ିକ ଅଧିକାରୀ ରହନ୍ତି ଏବଂ
ସେହି generationକୁ ଅନ୍ୟ ଏକ ମୁକ୍ତ ଯୋଗ୍ୟ ସଂଯୋଗକୁ ସ୍ଥାନାନ୍ତର କରିପାରନ୍ତି।

ଜୀବନଚକ୍ରଟି ହେଉଛି `POST /api/v1/session-leases`, ଯେଉଁଥିରେ JSON actions `acquire`, `renew`, ଏବଂ `release` ରହେ।
Managed inference ଅନୁରୋଧଗୁଡ଼ିକ opaque `X-OmniRoute-Lease-Owner` ମୂଲ୍ୟ ଏବଂ ସଠିକ୍
`X-OmniRoute-Lease-Generation` ଉପସ୍ଥାପନ କରନ୍ତି। Owner `vlo_` ପରେ 43ଟି base64url ଅକ୍ଷର ବ୍ୟବହାର କରେ; କେବଳ
ଏହାର SHA-256 hash ସଂରକ୍ଷିତ ହୁଏ। ପ୍ରତ୍ୟେକ ଅନ୍ତିମ dispatch fence ମଧ୍ୟ authenticated API key ID ଏବଂ
ସକ୍ରିୟ ସଂଯୋଗ IDକୁ ବାନ୍ଧେ। Lease control headersଗୁଡ଼ିକ logs, ରଖାଯାଇଥିବା request snapshots, ଏବଂ
upstream executor headersରୁ ଅପସାରିତ ହୁଏ।

ଯଦି ସାଧାରଣ routingରେ ଯୋଗ୍ୟ managed candidates ରହିଥାନ୍ତି, କିନ୍ତୁ ପ୍ରତ୍ୟେକ ମୁକ୍ତ candidate ଏକ
ବିଦେଶୀ ସକ୍ରିୟ lease ଦ୍ୱାରା ଦଖଲ ହୋଇଥାଏ, ତେବେ OmniRoute HTTP `429`, lease-capacity-unavailable code,
waiting-for-capacity state, ଏବଂ ସବୁଠାରୁ ଶୀଘ୍ର ସମ୍ପର୍କିତ expiryରୁ ନିର୍ଦ୍ଧାରିତ ଏକ ସୀମିତ
`Retry-After` ଫେରାଇଥାଏ। ସାଧାରଣ ଖାଲି eligibility lease contention ନୁହେଁ ଏବଂ ଏହାର ବିଦ୍ୟମାନ routing
ତ୍ରୁଟି semanticsକୁ ବଜାୟ ରଖେ।

ସମ୍ପର୍କିତ ପ୍ରଣାଳୀଗୁଡ଼ିକ ପୃଥକ ରହନ୍ତି:

- OAuth session occupancy OAuth accountଗୁଡ଼ିକ ପାଇଁ process-local soft distribution ଅଟେ।
- Account semaphores request-concurrency permits ପ୍ରଦାନ କରନ୍ତି ଏବଂ ଗୋଟିଏ ଅନୁରୋଧ ସମାପ୍ତ ହେଲେ ଶେଷ ହୁଅନ୍ତି।
- Exclusive managed session leases durable lifecycle ownership ସହିତ ଏକ generation fence ଅଟେ।

## 3. ମଡେଲ୍ ଲକ୍ଆଉଟ୍

**ପରିସର:** ପ୍ରଦାନକାରୀ + ସଂଯୋଗ + ମଡେଲ୍ ତ୍ରୟୀ।

**ସ୍ଥିତି ଅନୁଯାୟୀ କୀ ପରିସର:** ବିଫଳ ହୋଇଥିବା ସ୍ଥିତି ନିର୍ଦ୍ଧାରଣ କରେ ଯେ ଲକ୍ଆଉଟ୍ କେଉଁ କୀରେ
ଲେଖିବ (`open-sse/services/accountFallback/exactModelLock.ts` ଭିତରେ `resolveLockoutScope()`):

- `429` / `403` / `402` — ଏକ କୋଟା କିମ୍ବା ଅଧିକାର ସଙ୍କେତ — **କୋଟା ପରିବାର**କୁ ଲକ୍ କରେ:
  codex ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ `codex` / `spark` ପରିସର (ସଂଯୋଗର ପ୍ରତ୍ୟେକ `gpt-5*` ମଡେଲ୍),
  ଅନ୍ୟ ପ୍ରଦାନକାରୀଙ୍କ ପାଇଁ `getQuotaScopedModelForProvider()`।
- `404` କେବଳ ମୂଳ ମଡେଲ୍କୁ ଲକ୍ କରେ (`getModelLockKey()` `not_found`କୁ ସଂକୁଚିତ କରେ)।
- ଅନ୍ୟ ଯେକୌଣସି ସ୍ଥିତି — `5xx` ପରିବହନ/ସର୍ଭର ବିଫଳତା ଏବଂ ଗୁଣବତ୍ତା ଯାଞ୍ଚରୁ
  OmniRoute ନିଜେ ସୃଷ୍ଟି କରିଥିବା `502` — କେବଳ **ସଠିକ୍**
  ପ୍ରଦାନକାରୀ/ସଂଯୋଗ/ମଡେଲ୍ ଟ୍ୟୁପଲ୍କୁ ଲକ୍ କରେ। ଗୋଟିଏ ମଡେଲ୍ର ଖରାପ ଷ୍ଟ୍ରିମ୍
  ଆକାଉଣ୍ଟର କୋଟା ସମ୍ପର୍କରେ ପ୍ରମାଣ ନୁହେଁ; ଏହି ନିୟମ ପୂର୍ବରୁ
  `codex/gpt-5.6-luna`ର ଗୋଟିଏ ଖାଲି ପ୍ରତିକ୍ରିୟା ସେହି ସଂଯୋଗର ପ୍ରତ୍ୟେକ `gpt-5*` ମଡେଲ୍କୁ
  2–30 ମିନିଟ୍ ପାଇଁ ରାଉଟିଂରୁ ହଟାଇ ଦେଉଥିଲା (କ୍ରମଶଃ ବୃଦ୍ଧି ପାଉଥିଲା), ଯେତେବେଳେ ତାହାର କୋଟା ଅପରିବର୍ତ୍ତିତ ରହୁଥିଲା।
- କଲର୍ର ସ୍ପଷ୍ଟ `scope` ବିକଳ୍ପ ସର୍ବଦା ପ୍ରାଧାନ୍ୟ ପାଏ (Antigravity `"exact"` ପଠାଏ)।

**ଉଦ୍ଦେଶ୍ୟ:** କେବଳ ଗୋଟିଏ ମଡେଲ୍ ଅନୁପଲବ୍ଧ କିମ୍ବା କୋଟା-ସୀମିତ ଥିବାବେଳେ ସମ୍ପୂର୍ଣ୍ଣ ସଂଯୋଗକୁ ଅକ୍ଷମ କରିବାରୁ ରକ୍ଷା କରିବା।

**ଉଦାହରଣ:**

- ପ୍ରତି-ମଡେଲ୍ କୋଟା ପ୍ରଦାନକାରୀଙ୍କ ଦ୍ୱାରା ଫେରାଯାଉଥିବା 429
- ଗୋଟିଏ ନଥିବା ମଡେଲ୍ ପାଇଁ ସ୍ଥାନୀୟ ପ୍ରଦାନକାରୀଙ୍କ ଦ୍ୱାରା ଫେରାଯାଉଥିବା 404
- ପ୍ରଦାନକାରୀ-ନିର୍ଦ୍ଦିଷ୍ଟ ମୋଡ୍/ମଡେଲ୍ ଅନୁମତି ବିଫଳତା (ଯଥା, Grok ମୋଡ୍ଗୁଡ଼ିକ)

**କାର୍ଯ୍ୟାନ୍ୱୟନ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### ମଡେଲ୍ କୁଲ୍ଡାଉନ୍ ଡ୍ୟାସ୍ବୋର୍ଡ (v3.8.0)

UI: ସେଟିଂସ୍ → ମଡେଲ୍ କୁଲ୍ଡାଉନ୍ (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ସକ୍ରିୟ ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକୁ ଏହି ସୂଚନା ସହିତ ତାଲିକାଭୁକ୍ତ କରେ: ପ୍ରଦାନକାରୀ, ସଂଯୋଗ, ମଡେଲ୍, କାରଣ, expiresAt। ଅପରେଟର୍ମାନେ କାର୍ଡରୁ ମାନୁଆଲ୍ ଭାବରେ ଏକ ମଡେଲ୍କୁ ପୁନଃସକ୍ଷମ କରିପାରିବେ।

**REST API:**

- `GET /api/resilience/model-cooldowns` — ସକ୍ରିୟ ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରେ
- `DELETE /api/resilience/model-cooldowns` — ମାନୁଆଲ୍ ପୁନଃସକ୍ଷମୀକରଣ। ବଡି: `{provider, connection, model}`। ପ୍ରମାଣୀକରଣ: ପରିଚାଳନା।

### କୁଲ୍ଡାଉନ୍ ପରିଚାଳକ

UI: ମନିଟରିଂ → କୁଲ୍ଡାଉନ୍ ପରିଚାଳକ (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପୃଷ୍ଠା ଖୋଲିବା ପରିବର୍ତ୍ତେ, ଅସ୍ଥାୟୀ କାରଣରୁ ରାଉଟିଂରୁ ବାହାରେ ଥିବା ପ୍ରତ୍ୟେକ ସଂଯୋଗ ପାଇଁ
ଗୋଟିଏ ପୃଷ୍ଠା। ଏହା ସଂଯୋଗ କୁଲ୍ଡାଉନ୍, ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ଏବଂ ଅନ୍ତିମ
ସ୍ଥିତିଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରେ; ସଂଯୋଗ ପିଛା, ଏକ ଚୟନ ପାଇଁ, କିମ୍ବା ଗୋଟିଏ ପ୍ରଦାନକାରୀର ସମସ୍ତ ସଂଯୋଗ ପାଇଁ ସେଗୁଡ଼ିକୁ ସଫା କରେ;
ଏବଂ ସର୍ବାଧିକ ସମନ୍ୱୟ କରାଯାଉଥିବା କୁଲ୍ଡାଉନ୍ ନିୟମଗୁଡ଼ିକୁ ସମ୍ପାଦନା କରେ: `streamStallCooldown.enabled` ଏବଂ OAuth / API-key
`connectionCooldown`ର ମୂଳ କୁଲ୍ଡାଉନ୍ ଓ ସର୍ବାଧିକ ବ୍ୟାକ୍ଅଫ୍ ପଦକ୍ଷେପଗୁଡ଼ିକ (`PATCH /api/resilience` ମାଧ୍ୟମରେ
ସଞ୍ଚିତ)। ଅନ୍ତିମ ସ୍ଥିତିଗୁଡ଼ିକ (`banned`, `expired`, `credits_exhausted`) ତାଲିକାଭୁକ୍ତ ହୁଏ,
କିନ୍ତୁ ଏଠାରେ କେବେ ମଧ୍ୟ ସଫା କରାଯାଏ ନାହିଁ।

**REST API** (`src/lib/resilience/cooldownManager.ts`, ପ୍ରମାଣୀକରଣ: ପରିଚାଳନା):

- `GET /api/resilience/cooldowns[?provider=]` — ସ୍ଥିତି, ଅବଶିଷ୍ଟ କୁଲ୍ଡାଉନ୍,
  ବ୍ୟାକ୍ଅଫ୍ ସ୍ତର, ଶେଷ ତ୍ରୁଟି ପ୍ରକାର ଏବଂ ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ସହିତ ସଂଯୋଗଗୁଡ଼ିକ (କୌଣସି ପ୍ରମାଣପତ୍ର ନାହିଁ)
- `POST /api/resilience/cooldowns` — ବଡି `{connectionIds: string[]}` କିମ୍ବା
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ଫେରାଏ

### ଲକ୍ଆଉଟ୍ ସେଟିଂସ୍ UI + ସଫଳତା-କ୍ଷୟ ପୁନରୁଦ୍ଧାର (v3.8.23)

ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ସର୍ବଦା-ସକ୍ରିୟ ହାର୍ଡକୋଡ୍ ଆଚରଣରୁ ଏକ ସମ୍ପୂର୍ଣ୍ଣ ବିନ୍ୟାସଯୋଗ୍ୟ,
ନିଜସ୍ୱ ସେଟିଂସ୍ କାର୍ଡ ଓ ସ୍ୱୟଂ-ପୁନରୁଦ୍ଧାର ପଥ ସହିତ ଅପ୍ଟ-ଇନ୍ ବୈଶିଷ୍ଟ୍ୟରେ ପରିଣତ ହୋଇଛି।

**ସେଟିଂସ୍ କାର୍ଡ:** ସେଟିଂସ୍ → ମଡେଲ୍ ଲକ୍ଆଉଟ୍
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
ଏହା ଉପରୋକ୍ତ କେବଳ-ପଠନୀୟ `ModelCooldownsCard`ଠାରୁ **ପୃଥକ** (ଯାହା କେବଳ
ସକ୍ରିୟ ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକୁ _ତାଲିକାଭୁକ୍ତ_ କରେ) — ନୂଆ କାର୍ଡଟି _ପାରାମିଟର୍ଗୁଡ଼ିକୁ ବିନ୍ୟାସ କରେ_। ଡିଫଲ୍ଟଗୁଡ଼ିକ
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)ରେ ରହିଛି:

| ସେଟିଂ                   | ଡିଫଲ୍ଟ                           | ଅର୍ଥ                                                               |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | ମୁଖ୍ୟ ଟଗଲ୍ — ମଡେଲ୍ ଲକ୍ଆଉଟ୍ **ଡିଫଲ୍ଟ ଭାବରେ ବନ୍ଦ**।                  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | ମଡେଲ୍-ପରିସରଭୁକ୍ତ ବିଫଳତା ଭାବରେ ଗଣାଯାଉଥିବା ଅପ୍ଷ୍ଟ୍ରିମ୍ ସ୍ଥିତିଗୁଡ଼ିକ। |
| `baseCooldownMs`        | `120_000` (120 ସେକେଣ୍ଡ)          | ପ୍ରଥମ ବିଫଳତା ପାଇଁ ପ୍ରାରମ୍ଭିକ ଲକ୍ଆଉଟ୍ ଅବଧି।                         |
| `maxCooldownMs`         | `1_800_000` (30 ମିନିଟ୍)          | ବୃଦ୍ଧି କରାଯାଇଥିବା କୁଲ୍ଡାଉନ୍ର ସର୍ବୋଚ୍ଚ ସୀମା।                        |
| `maxBackoffSteps`       | `10`                             | ସର୍ବାଧିକ ଘାତୀୟ-ବ୍ୟାକ୍ଅଫ୍ ବୃଦ୍ଧି ପଦକ୍ଷେପ।                           |
| `useExponentialBackoff` | `true`                           | ପୁନରାବୃତ୍ତ ବିଫଳତା କୁଲ୍ଡାଉନ୍କୁ ଘାତୀୟ ଭାବେ ବଢ଼ାଇବ କି ନାହିଁ।          |

ସେଟିଂସ୍ଗୁଡ଼ିକ ସାଧାରଣ ସେଟିଂସ୍ ଷ୍ଟୋର୍ ମାଧ୍ୟମରେ ସ୍ଥାୟୀ ରହେ ଏବଂ
ରେଜିଲିଏନ୍ସ ସେଟିଂସ୍ ସ୍କିମା ମାଧ୍ୟମରେ ବୈଧତା ଯାଞ୍ଚ ହୁଏ; କାର୍ଡଟି `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` ସହିତ) ଏବଂ `maxBackoffSteps`କୁ ସୀମାବଦ୍ଧ କରେ।

**ସଫଳତା-କ୍ଷୟ ପୁନରୁଦ୍ଧାର:** ପୁନରୁଦ୍ଧାର **କେବଳ** ଟାଇମର୍ର ମିଆଦ ଶେଷ ହେବା ଉପରେ ନିର୍ଭରଶୀଳ ନୁହେଁ। ଏକ ସୁସ୍ଥ
ପ୍ରତିକ୍ରିୟା ମଡେଲ୍ର ବିଫଳତା ଗଣନାକୁ ଧୀରେ ଧୀରେ କମାଏ, ଯାହାଦ୍ୱାରା ମଧ୍ୟବର୍ତ୍ତୀ ସମୟରେ ସୁସ୍ଥ ହୋଇଥିବା ମଡେଲ୍
ତାହାର ଟାଇମର୍ ଶେଷ ହେବା ପୂର୍ବରୁ ବୃଦ୍ଧି ପାଇବା ବନ୍ଦ କରେ (ଏବଂ ସଫା ହୋଇଯାଏ)। ଏକ ସଫଳ
କମ୍ବୋ ଟାର୍ଗେଟ୍ରେ, `open-sse/services/combo.ts` `decayModelFailureCount()`କୁ କଲ୍ କରେ
(`open-sse/services/accountFallback.ts`), ଯାହା ସଞ୍ଚିତ
`failureCount`କୁ **ଅଧା** କରେ (`Math.floor(failureCount / 2)`); ଏହା `0`ରେ ପହଞ୍ଚିଲେ ଲକ୍ଆଉଟ୍
ଏଣ୍ଟ୍ରି ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ବିଲୋପ ହୁଏ। ଏହାର ପ୍ରତିପକ୍ଷ `recordModelLockoutFailure()`
ବୃଦ୍ଧି ୱିଣ୍ଡୋ ମଧ୍ୟରେ ବିଫଳତା ଘଟିଲେ ଗଣନା ବଢ଼ାଏ (ଏବଂ କୁଲ୍ଡାଉନ୍କୁ ବୃଦ୍ଧି କରେ)।
ଏହି ସଫଳତା-କ୍ଷୟ ସାଧାରଣ ଟାଇମର୍ ମିଆଦ ଶେଷ ହେବା ସହିତ ଅତିରିକ୍ତ ଭାବେ କାର୍ଯ୍ୟ କରେ —
ଯେକୌଣସି ପଥ ଏକ ମଡେଲ୍କୁ ପୁନଃସକ୍ଷମ କରିପାରେ।

**ସ୍ଥିତି:** ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକ **ଇନ୍-ମେମୋରି** ଭାବେ ରଖାଯାଏ (ପ୍ରତି-ପ୍ରକ୍ରିୟା `Map`ଗୁଡ଼ିକରେ
`provider:connectionId:model` ଦ୍ୱାରା କୀ କରାଯାଇଥିବା `ModelLockoutEntry`, ସଠିକ୍-ପରିସର ଲକ୍ଗୁଡ଼ିକ
`provider:connectionId:exact:model` ଦ୍ୱାରା କୀ କରାଯାଇଥାଏ), DBରେ ସ୍ଥାୟୀ ଭାବେ ସଞ୍ଚିତ ହୁଏ ନାହିଁ —
ପୁନରାରମ୍ଭ କଲେ ସେଗୁଡ଼ିକ ହଜିଯାଏ। _ସେଟିଂସ୍_ ସ୍ଥାୟୀ ଭାବେ ସଞ୍ଚିତ ହୁଏ; ସକ୍ରିୟ
ଲକ୍ଆଉଟ୍ _ସ୍ଥିତି_ ଅସ୍ଥାୟୀ।

---

## 4. କୋଟା-ଶେୟାର୍ ସମକାଳୀନତା ନିୟନ୍ତ୍ରଣ (v3.8.36)

ସବସ୍କ୍ରିପ୍ସନ୍ ଆକାଉଣ୍ଟଗୁଡ଼ିକ (GLM, MiniMax ଇତ୍ୟାଦି) ସାଧାରଣତଃ କେବଳ ~1–3ଟି ସମକାଳୀନ
ଅନୁରୋଧ ଗ୍ରହଣ କରନ୍ତି; ଏହାଠାରୁ ଅଧିକ ହେଲେ 429 ଏବଂ କୁଲ୍ଡାଉନ୍ ଟ୍ରିଗର୍ ହୁଏ। ଏହା
**quota-share** (`qtSd/…`) କମ୍ବୋଗୁଡ଼ିକରେ ଅଧିକ ଗୁରୁତର, ଯେଉଁଠାରେ ଅନେକ API କୀ ଗୋଟିଏ
ଅପ୍ଷ୍ଟ୍ରିମ୍ ଆକାଉଣ୍ଟ ଅଂଶୀଦାର କରନ୍ତି। ତିନୋଟି ସ୍ତର ମିଶି ଗୋଟିଏ ଅଂଶୀଦାର ଆକାଉଣ୍ଟକୁ
ଅତ୍ୟଧିକ ଅନୁରୋଧରୁ ସୁରକ୍ଷିତ ରଖେ।

### ପ୍ରତି-ସଂଯୋଗ ସମକାଳୀନତା ସୀମା (`max_concurrent`)

ପ୍ରତ୍ୟେକ ପ୍ରୋଭାଇଡର୍ ସଂଯୋଗ ଗୋଟିଏ `max_concurrent` ସୀମା
(`provider_connections.max_concurrent`, ସଂଯୋଗ ମୋଡାଲ୍ / API / DB ରେ ସେଟ୍ କରାଯାଏ)
ଘୋଷଣା କରିପାରେ। କୌଣସି ସୀମା ନଥିବା ପାଇଁ ଏହାକୁ ଖାଲି ରଖନ୍ତୁ। ଏହା ତଳେ ଥିବା
ସିରିଆଲାଇଜେସନ୍ ସ୍ତରକୁ ନିୟନ୍ତ୍ରଣ କରୁଥିବା ଏକମାତ୍ର ନିୟନ୍ତ୍ରକ — ଏହାକୁ ଆକାଉଣ୍ଟର
ପ୍ରକୃତ ସମକାଳୀନତା ଅନୁସାରେ ସେଟ୍ କରନ୍ତୁ (ଯଥା GLM ~1, MiniMax ~2)।

### ପ୍ରତି-ମଡେଲ୍ ସମକାଳୀନତା ସୀମା (`modelConcurrency`)

ଗୋଟିଏ ସଂଯୋଗ ଏହାର `rateLimitOverrides` ମାପ୍ ଭିତରେ ସଠିକ୍ ପ୍ରତି-ମଡେଲ୍ ସମକାଳୀନତା
ସୀମା ମଧ୍ୟ ଘୋଷଣା କରିପାରେ:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

ଏହାକୁ ସଂଯୋଗ ମୋଡାଲ୍ (**Rate limit overrides → Per-model
concurrency caps**, ପ୍ରତି ଲାଇନ୍ରେ ଗୋଟିଏ `model=cap`) କିମ୍ବା ସମାନ JSON ଆକୃତି ସହିତ
`PATCH /api/providers/[id]` ମାଧ୍ୟମରେ ସେଟ୍ କରନ୍ତୁ। ମୁଖ୍ୟ ନିୟମଗୁଡ଼ିକ:

- **ସଂଯୋଗ-ବ୍ୟାପୀ ବନାମ ମଡେଲ୍-ନିର୍ଦ୍ଦିଷ୍ଟ:** `maxConcurrent` ସଂଯୋଗ-ବ୍ୟାପୀ ଅଂଶୀଦାର
  ସୀମା ଭାବେ ରହିଥାଏ। ଉଭୟ ଲାଗୁ ହେଲେ, ଉଭୟ ଗେଟ୍କୁ ସମାନ କମ୍ପୋଜିଟ୍ ଗେଟ୍ରେ
  (`global → provider → account → model`) ପରମାଣୁଭାବେ ଅଧିଗ୍ରହଣ କରାଯାଏ; ପ୍ରଭାବୀ
  ବ୍ୟବହାର ହେଉଛି ଲାଗୁ ହେଉଥିବା କଠୋରତମ ସୀମା।
- **ନିର୍ଦ୍ଦିଷ୍ଟ ମଡେଲ୍-କୀ ମେଳ:** ରାଉଟିଂ ସମାଧାନ ପରେ ଏକ୍ସିକ୍ୟୁଟର୍କୁ ପଠାଯାଇଥିବା
  ମଡେଲ୍ ଷ୍ଟ୍ରିଙ୍ଗ୍ଟି ହେଉଛି କୀ — ସାଧାରଣତଃ ଖାଲି ଅପ୍ଷ୍ଟ୍ରିମ୍ ମଡେଲ୍ ID
  (`glm-5`), କ୍ଲାଏଣ୍ଟ-ସାଇଡ୍ `provider/model` ଏଲିଆସ୍ ନୁହେଁ (`zai/glm-5`,
  `glm-5` ସହିତ ମେଳ ଖାଏ ନାହିଁ)। ମୂଲ୍ୟଗୁଡ଼ିକ ଧନାତ୍ମକ-ପୂର୍ଣ୍ଣସଂଖ୍ୟା
  ସମକାଳୀନ-ଅନୁରୋଧ ସୀମା ହେବା ଆବଶ୍ୟକ।
- **ସ୍ଥାନୀୟ କ୍ୟୁଇଂ, କୌଣସି ଡିସ୍କଭରି ନାହିଁ:** ଅତିରିକ୍ତ ଅନୁରୋଧଗୁଡ଼ିକ ବର୍ତ୍ତମାନର
  କ୍ୟୁ/ଟାଇମ୍ଆଉଟ୍ ନିୟମ ଅନୁସାରେ ସ୍ଥାନୀୟ ଭାବେ କ୍ୟୁ ହୁଅନ୍ତି (ଟାଇପ୍ ହୋଇଥିବା
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ଆଡମିସନ୍ ତ୍ରୁଟିଗୁଡ଼ିକ)। OmniRoute
  ଅପ୍ଷ୍ଟ୍ରିମ୍ ନୀତି ଖୋଜେ କିମ୍ବା ଅନୁମାନ କରେ ନାହିଁ — ଅପରେଟର୍ କନଫିଗର୍ କରିଥିବା
  ସଠିକ୍ ସୀମାଗୁଡ଼ିକୁ ଏହା ଲାଗୁ କରେ। ଗୋଟିଏ ସନ୍ତୃପ୍ତ ମଡେଲ୍ ଗେଟ୍ କେବେ ମଧ୍ୟ
  ପ୍ରୋଭାଇଡର୍କୁ ନିଷ୍କ୍ରିୟ କରେ ନାହିଁ ଏବଂ ସ୍ଥାୟୀ ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ସୃଷ୍ଟି କରେ ନାହିଁ;
  ଅପ୍ଷ୍ଟ୍ରିମ୍ 429/କୁଲ୍ଡାଉନ୍/ଫଲ୍ବ୍ୟାକ୍ ବ୍ୟବହାର ତ୍ରୁଟି-ବ୍ୟାକ୍ଷ୍ଟପ୍ ଭାବେ ରହିଥାଏ।
- **ପ୍ରତି-ସଂଯୋଗ, ପ୍ରତି-ପ୍ରୋସେସ୍ ସ୍କୋପ୍:** ସୀମାଗୁଡ଼ିକ ପ୍ରତି ଡାଟାବେସ୍ ସଂଯୋଗ
  ଅନୁସାରେ ରହେ ଏବଂ ମେମୋରିରେ ଧରି ରଖାଯାଏ, ତେଣୁ ସମାନ ଅପ୍ଷ୍ଟ୍ରିମ୍ API କୀ
  ପୁନଃବ୍ୟବହାର କରୁଥିବା ଦୁଇଟି ସଂଯୋଗ ପରସ୍ପର ସହିତ ସମନ୍ୱୟ କରେ ନାହିଁ।
- **କନଫିଗର୍ ନକରିବା ଅର୍ଥ ଅପରିବର୍ତ୍ତିତ:** ମାପ୍ ଛାଡ଼ିଦେଲେ (କିମ୍ବା ଡ୍ୟାସ୍ବୋର୍ଡ୍
  ଫିଲ୍ଡ୍ ଖାଲି ରଖିଲେ) କୌଣସି ମଡେଲ୍ ଗେଟ୍ ଯୋଡ଼ାଯାଏ ନାହିଁ। କୌଣସି ସାର୍ବଜନୀନ
  ପ୍ରୋଭାଇଡର୍ ସୀମା ଦାବି ନକରିଥିବା ଉଦାହରଣ କନଫିଗରେସନ୍:

```text
glm-5=1
glm-4.7=3
```

### କୋଟା-ଶେୟାର୍ ଅନୁରୋଧ ସିରିଆଲାଇଜେସନ୍

ଯେତେବେଳେ ଗୋଟିଏ କୋଟା-ଶେୟାର୍ ଡିସ୍ପାଚ୍ ଏକ ଧନାତ୍ମକ
`max_concurrent` ଘୋଷଣା କରିଥିବା ସଂଯୋଗକୁ ଲକ୍ଷ୍ୟ କରେ, ସେତେବେଳେ ସେହି **ଆକାଉଣ୍ଟ**କୁ
ଯାଉଥିବା ସମକାଳୀନ ଅନୁରୋଧଗୁଡ଼ିକ ପ୍ରତି-ସଂଯୋଗ ସେମାଫୋର୍ ମାଧ୍ୟମରେ ସିରିଆଲାଇଜ୍ ହୁଅନ୍ତି
(କୀ `qsconn:<connectionId>`): ଅତିରିକ୍ତ ଅନୁରୋଧଗୁଡ଼ିକ ଆକାଉଣ୍ଟକୁ ବନ୍ୟାରେ
ଭରିଦେବା ପରିବର୍ତ୍ତେ **କ୍ୟୁରେ ଅପେକ୍ଷା କରନ୍ତି**। ଏହା **ଫେଲ୍-ଓପନ୍** — ସନ୍ତୃପ୍ତ
କ୍ୟୁ କିମ୍ବା ଟାଇମ୍ଆଉଟ୍ ହେଲେ ମଧ୍ୟ ଡିସ୍ପାଚ୍ କରିପାରୁଥିବା ଅନୁରୋଧକୁ କେବେ ଅସ୍ୱୀକାର
ନକରି, ସ୍ଲଟ୍ ବିନା ଆଗକୁ ବଢ଼େ। ଏହାକୁ **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ଡିଫଲ୍ଟ
on) ରେ ଟଗଲ୍ କରନ୍ତୁ। `max_concurrent` ସୀମା ନଥିଲେ ବ୍ୟବହାର ଅପରିବର୍ତ୍ତିତ ରହେ।

> କୋଟା-ଶେୟାର୍ ରାଉଟିଂ ଗେଟ୍ (`selectQuotaShareTarget`, DRR + P2C) ନିଜେ
> ଫେଲ୍-ଓପନ୍ ଏବଂ କ୍ୟାପ୍ରେ ଥିବା ସଂଯୋଗକୁ କେବଳ _କମ୍ ପ୍ରାଥମିକତା_ ଦିଏ — ଗୋଟିଏ
> ସଂଯୋଗ ଥିବା ପୁଲ୍ରେ ଏହା କଠୋର ସୀମା ଲଗାଇପାରେ ନାହିଁ, ତେଣୁ ପ୍ରକୃତରେ ଏହି
> ସେମାଫୋର୍ଟି ହିଁ ବନ୍ୟାକୁ ନିୟନ୍ତ୍ରଣ କରେ।

### କମ୍ବୋ କୁଲ୍ଡାଉନ୍-ସଚେତନ ପୁନଃଚେଷ୍ଟା

ପ୍ରତ୍ୟେକ କମ୍ବୋ କୌଶଳ ପାଇଁ (ସକ୍ରିୟ ଥିବାବେଳେ), ଗୋଟିଏ ଅନୁରୋଧ SHORT ଟ୍ରାନ୍ସିଏଣ୍ଟ
କୁଲ୍ଡାଉନ୍ ପାଇଁ 429 ସୃଷ୍ଟି କରିବାକୁ ଯାଉଥିଲେ, 429 ଫେରାଇବା ପରିବର୍ତ୍ତେ ଏହା ସେହି
ସମୟ ଅପେକ୍ଷା କରି ପୁନଃ ଡିସ୍ପାଚ୍ ହୁଏ — ଏଥିରେ ମଲ୍ଟି-ମଡେଲ୍ କମ୍ବୋରେ Gemini-ଶ୍ରେଣୀର
TPM/RPM ୱିଣ୍ଡୋ (~60s retry-after) ମଧ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ, ଯଥା 2-ମଡେଲ୍ କମ୍ବୋର
ଉଭୟ ଲକ୍ଷ୍ୟ ପ୍ରତି-ମଡେଲ୍ ରେଟ୍ ସୀମାରେ ପଡ଼ିବା। **Settings → Resilience** ରେ
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ଦ୍ୱାରା
ଏହାର ସୀମା ନିର୍ଦ୍ଧାରିତ ହୁଏ। `quota_exhausted` (ମଧ୍ୟରାତ୍ରି ପର୍ଯ୍ୟନ୍ତ ଲକ୍),
କିମ୍ବା auth/not-found କାରଣ ପାଇଁ ଏହା କେବେ ଅପେକ୍ଷା କରେ ନାହିଁ।

ଗୋଟିଏ କମ୍ବୋ `config.comboCooldownWaitEnabled: false` ସହିତ ଏଥିରୁ ବାହାରିପାରେ।
କେବଳ ଶାବ୍ଦିକ `false` ଏହି ଅଂଶୀଦାର କମ୍ବୋ ଅପେକ୍ଷାଗୁଡ଼ିକୁ (ଡିସ୍ପାଚ୍ ପରବର୍ତ୍ତୀ
କୁଲ୍ଡାଉନ୍ ଏବଂ ଡିସ୍ପାଚ୍-ପୂର୍ବ ସର୍କିଟ୍-ଓପନ୍/ମଡେଲ୍-ଲକ୍ ଅପେକ୍ଷା) ଏବଂ ସେମାନଙ୍କର
ୱେଟ୍-ବଜେଟ୍ ଟାଇମ୍ଆଉଟ୍-ଫ୍ଲୋର୍ ବୃଦ୍ଧିକୁ ନିଷ୍କ୍ରିୟ କରେ। ଅନୁପସ୍ଥିତ କିମ୍ବା `true`
ଥିଲେ ଗ୍ଲୋବାଲ୍ ନୀତି ଅବିକଳ ରହେ; `true` ଦ୍ୱାରା ଗ୍ଲୋବାଲ୍ ଭାବେ ନିଷ୍କ୍ରିୟ ଅପେକ୍ଷାକୁ
ସକ୍ରିୟ କରାଯାଇପାରେ ନାହିଁ। ଏକ ସ୍ପଷ୍ଟ `targetTimeoutMs` ଏବେ ମଧ୍ୟ ପ୍ରାଧାନ୍ୟ
ପାଏ। ଏହି ଅପ୍ଟ୍-ଆଉଟ୍ ପୃଥକ native-Codex turn-pin ଡିସ୍ପାଚ୍-ପୂର୍ବ ଅପେକ୍ଷାକୁ
ପରିବର୍ତ୍ତନ କରେ ନାହିଁ।

ସମାନ ଗେଟ୍ ଡିସ୍ପାଚ୍-ପୂର୍ବ ଘଟଣା (#16319) କୁ ମଧ୍ୟ ଆବୃତ କରେ: ଯେତେବେଳେ କୌଣସି
ଚେଷ୍ଟା ହେବା ପୂର୍ବରୁ ଗୋଟିଏ କମ୍ବୋର ପ୍ରତ୍ୟେକ ଲକ୍ଷ୍ୟକୁ ଛୋଟ ଟ୍ରାନ୍ସିଏଣ୍ଟ ଲକ୍ଆଉଟ୍ରେ
ଥିବା ମଡେଲ୍ ଯୋଗୁଁ ସ୍କିପ୍ କରାଯାଏ, ସେତେବେଳେ ଶୂନ୍ୟ-ଚେଷ୍ଟା ପଥ ସମାନ ସୀମା ଅନୁସାରେ
ଲକ୍ଆଉଟ୍ ସମୟ ଅପେକ୍ଷା କରି ପୁନଃ ଡିସ୍ପାଚ୍ କରେ, ଏବଂ ହିଣ୍ଟ୍-ବିହୀନ
`503 ALL_TARGETS_SKIPPED` ଉତ୍ତର ଦେଇ ନଥାଏ। ଯେତେବେଳେ କୌଣସି ଅପେକ୍ଷା ଅନୁମୋଦିତ
ନୁହେଁ (ସୀମା, ଚେଷ୍ଟା କିମ୍ବା ବଜେଟ୍ ଶେଷ ହୋଇଯାଇଛି, କିମ୍ବା ଫିଚର୍ ବନ୍ଦ ଅଛି),
ସେତେବେଳେ ଟର୍ମିନାଲ୍ ରେସ୍ପନ୍ସ୍ଟି `429 rate_limit_error` କୁ ଅପ୍ଗ୍ରେଡ୍ ହୁଏ ଏବଂ
ସବୁଠାରୁ ପ୍ରାରମ୍ଭିକ ଟ୍ରାନ୍ସିଏଣ୍ଟ ଲକ୍ ସମାପ୍ତିରୁ `retry_after` / `reset_at` ବହନ କରେ;
କୋଟା, auth ଏବଂ not-found ଲକ୍ଗୁଡ଼ିକ ହିଣ୍ଟ୍-ବିହୀନ 503 ରଖନ୍ତି।

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

## 5. ଅନୁରୋଧ ଧାଡ଼ି ପ୍ରବେଶ ନିୟନ୍ତ୍ରଣ (Request Queue Admission Control) (v3.8.49 · issue #6593)

**ପରିସର (Scope)**: ସ୍ଥାନୀୟ per-provider+connection rate-limit ଧାଡ଼ି (`open-sse/services/rateLimitManager.ts`,
Bottleneck ଦ୍ୱାରା ସମର୍ଥିତ), ଉପରୋକ୍ତ ତିନୋଟି ଯନ୍ତ୍ରଣା (mechanism)ଠାରୁ ଗୋଟିଏ ସ୍ତର ତଳେ।

**`maxWaitMs` ଧାଡ଼ିରେ ଅପେକ୍ଷାକୁ ସୀମିତ କରେ; `executionMaxWaitMs` କାର୍ଯ୍ୟକାରିତାକୁ (execution) ସୀମିତ କରେ।**
ଏହି ଦୁଇଟି ଜାଣିଶୁଣି ପୃଥକ ରଖାଯାଇଛି, ଏବଂ କୌଣସି ଗୋଟିଏ ଅନ୍ୟଟିକୁ ପରିପୋଷଣ କରେ ନାହିଁ।

`resilienceSettings.requestQueue.maxWaitMs` ହେଉଛି **ଧାଡ଼ି-ଅପେକ୍ଷା ବଜେଟ୍ (queue-wait budget)**: ଏହା
provider slot ପାଇଁ ଅପେକ୍ଷା କରିବା ଏବଂ ତାପରେ QUEUED ଅବସ୍ଥାରେ ରହିବାକୁ ଅନ୍ତର୍ଭୁକ୍ତ କରେ, ଏବଂ job QUEUED ଛାଡ଼ି
କାର୍ଯ୍ୟକାରି ହେବା ଆରମ୍ଭ କରିବା ମୂହୂର୍ତ୍ତରେ ଏହାର ଟାଇମର୍ ବନ୍ଦ ହୋଇଯାଏ
(`rateLimitManager.ts`, `wrappedFn`)। ଏହାକୁ ଅତିକ୍ରମ କରୁଥିବା ଅନୁରୋଧ କେବେବି
upstream ପର୍ଯ୍ୟନ୍ତ ପହଞ୍ଚେ ନାହିଁ। ଡିଫଲ୍ଟ 30000ms, ଯାହା `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ଦ୍ୱାରା `src/lib/resilience/settings.ts`ରେ ଯୋଗାଯାଏ ଏବଂ
`tests/unit/ratelimit-admission-control-6593.test.ts` ଦ୍ୱାରା ପିନ୍ ହୋଇଛି, ତେଣୁ ଏଥିରେ କୌଣସି ପରିବର୍ତ୍ତନ
ସେହି ଟେଷ୍ଟକୁ ଲାଲ (red) କରିଦିଏ, ଏହି ଅନୁଚ୍ଛେଦକୁ ନୀରବରେ ପୁରୁଣା (stale) ଛାଡ଼ିଦିଏ ନାହିଁ।

`resilienceSettings.requestQueue.executionMaxWaitMs` ହେଉଛି ଯାହା Bottleneck
job `expiration` ଭାବେ ଗ୍ରହଣ କରେ, ଯାହାର ଟାଇମର୍ କେବଳ dispatch ପରେ ଆରମ୍ଭ ହୁଏ। ଏହା
ନିଜର କୌଣସି upstream timeout ନଥିବା executorମାନଙ୍କ ପାଇଁ ଏକ ବ୍ୟାକଷ୍ଟପ୍ (backstop) ଅଟେ, ଏବଂ executorର ନିଜସ୍ୱ
fetch-start timeout ଅଧିକ ଲମ୍ବା ହେଲେ ଏହାକୁ ସେତିକିକୁ ବଢ଼ାଯାଏ, ଯେପରି ଏହା
ସୁସ୍ଥ ଚାଲୁଥିବା (in-flight) ପ୍ରତିକ୍ରିୟାକୁ କାଟିଦିଏ ନାହିଁ। ଡିଫଲ୍ଟ 600000ms (10 ମିନିଟ୍)।

ଧାଡ଼ି ବଜେଟ୍କୁ `expiration` ଭିତରକୁ ପରିପୋଷଣ କରିବା ହିଁ ଅତୀତରେ non-incremental
gatewayଗୁଡ଼ିକୁ ମଝିରେ (mid-flight) ବନ୍ଦ କରିଦେଉଥିଲା — ସେମାନେ ପ୍ରଥମ ବାଇଟ୍ ପୂର୍ବରୁ ବୈଧ ଭାବେ ମିନିଟ୍ ମିନିଟ୍ ଧରି
ଚାଲନ୍ତି — ଏବଂ ଏହିପାଇଁ ଏକ expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ଭାବେ ପ୍ରଦର୍ଶିତ ହୁଏ, ଯେତେବେଳେ ଧାଡ଼ି ବଜେଟ୍
queue-timeout code ବହନ କରେ। ଯେକୌଣସିଟିକୁ `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) କିମ୍ବା dashboard
(**Settings → Resilience**) ମାଧ୍ୟମରେ override କରନ୍ତୁ। ଉଭୟ ସ୍ୱାଭାବିକକରଣ (normalise) ସମୟରେ 1ms–24h ମଧ୍ୟରେ clamp ହୁଅନ୍ତି।

**ଉଭୟ ପାଇଁ ପ୍ରାଥମିକତା (precedence):** env var କେବଳ _ଡିଫଲ୍ଟ_ ଯୋଗାଏ।
`resilienceSettings.requestQueue`ରେ ସଂରକ୍ଷିତ (persisted) ଏକ ମୂଲ୍ୟ
(dashboard / API patch, `key_value`ରେ ସଞ୍ଚିତ) ଏହା ଉପରେ ବିଜୟୀ ହୁଏ, ଏବଂ ପ୍ରତି-ସଂଯୋଗ (per-connection)
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ତାହା ଉପରେ ବିଜୟୀ ହୁଏ।
ତେଣୁ, ଯେଉଁ deploymentରେ ପୂର୍ବରୁ ସଂରକ୍ଷିତ ମୂଲ୍ୟ ଅଛି, ସେଥିରେ env var ସେଟ୍ କରିବା
କିଛି ବଦଳାଏ ନାହିଁ — ତାହା ବଦଳରେ ସଂରକ୍ଷିତ ସେଟିଂକୁ ଖାଲି କରନ୍ତୁ (clear) କିମ୍ବା ଅଦ୍ୟତନ କରନ୍ତୁ।

ଧାଡ଼ିରେ ରହିବା (queue residence) `maxWaitMs` ଦ୍ୱାରା ସୀମିତ; ତଳେ ଥିବା `maxQueueDepth`
ଏକକାଳୀନ କେତେ ଜଣ caller ଧାଡ଼ିରେ ରହିପାରିବେ ତାହାକୁ ସୀମିତ କରେ।

**ବଡ଼ି-ଉଲ୍ଲେଖିତ ପୁନଃଚେଷ୍ଟା (body-stated retries): pacing ବନାମ lockout।** ଏକ 429 ବଡ଼ି ନିଜର ଅପେକ୍ଷା ସମୟ
ଉଲ୍ଲେଖ କରିପାରେ (Gemini `RetryInfo.retryDelay`, "retry after Ns" ପାଠ୍ୟ), ଯାହା
`updateFromResponseBody` ପଢ଼େ। ଯେଉଁ ଅପେକ୍ଷା ସଂଯୋଗର `maxWaitMs` ଭିତରେ ବସେ
ତାହା pacing ଅଟେ: limiter ସେତିକି ସମୟ ପାଇଁ ନିଜର reservoir ଖାଲି କରିଦିଏ ଏବଂ ଧାଡ଼ିରେ ଥିବା callଗୁଡ଼ିକ
ତାହା ପୁଣି ଭରିଲେ dispatch ହୁଅନ୍ତି। `maxWaitMs`ଠାରୁ ଅଧିକ ଅପେକ୍ଷା ଏପରି କିଛି ନୁହେଁ ଯାହା
ଧାଡ଼ି ଅପେକ୍ଷା କରି ରହିପାରିବ — Gemini ସମାପ୍ତ ଦୈନିକ quota ପାଇଁ
`retryDelay: "86399s"` ଉତ୍ତର ଦିଏ। ପୁନଃନିର୍ମିତ 429 ଉପରେ relay ହୋଇଥିବା `Retry-After` (#16528)
ପୂର୍ବରୁ fallback engineକୁ ସେହି ସମୟ ପାଇଁ modelକୁ lock କରିବାକୁ ବାଧ୍ୟ କରେ, କିନ୍ତୁ
ଏହା ପାଇଁ limiterକୁ ମଧ୍ୟ ବିରାମ (pause) ଦେଲେ ଯେକୌଣସି call ଯାହା key ନିକଟରେ ଶୀଘ୍ର ପହଞ୍ଚେ
(ଉଦାହରଣ ସ୍ୱରୂପ resilience reset ପରେ) ତାହାକୁ ପୂରା `maxWaitMs` ପାଇଁ ଅଟକାଇ ରଖିବ। ଯେତେବେଳେ ଏପରି ଅପେକ୍ଷା ଏକ typed Google `RetryInfo`
detailରୁ ଆସେ (`google_rpc_retry_info` ଉତ୍ପତ୍ତି/provenance) ଏବଂ keyର limiter
ପୂର୍ବରୁ model ପାଇଁ scoped ହୋଇଥାଏ (ଦେଖନ୍ତୁ `getLimiterKey`), ସେହି 429 ସେହି ସଂଯୋଗରେ
ଏକ model lockout ହୋଇଯାଏ (`lockModelForLongBodyRetry`,
`open-sse/services/rateLimitManager/bodyRetryPause.ts`ରେ, 24hରେ capped), ଏବଂ
limiterକୁ ବିରାମ ବିନା ଛାଡ଼ିଦିଆଯାଏ। Account selection ସେହି lock ଉପରେ
`isModelLocked()` ମାଧ୍ୟମରେ ଏଡ଼ାଏ (skip), ଏବଂ ସେହି ସଂଯୋଗ ସହିତ ବାନ୍ଧା (pinned) targetମାନଙ୍କ ପାଇଁ combo pre-dispatch
gate ମଧ୍ୟ ଏଡ଼ାଏ। antigravityରେ, ଯାହାର limiter quota family ଅନୁଯାୟୀ, ସେହି lock
ଠିକ୍ ସେହି model ଉପରେ ହୁଏ, ଏହାର ଅନ୍ୟ quota lockଗୁଡ଼ିକ ପରି। ଯେତେବେଳେ ଏକ alias ଏହାକୁ ସେହି
model ସହିତ ସମାଧାନ (resolve) କରେ, client ଯାହା ମାଗିଥିବା ନାମ ମଧ୍ୟ lock ହୁଏ,
କାରଣ ସେହି ଯାଞ୍ଚଗୁଡ଼ିକ ଅନୁରୋଧିତ ନାମ ବ୍ୟବହାର କରନ୍ତି; ଏହା ଠିକ୍ ଭାବେ lock ହୁଏ (`lockExactModel`), ତେଣୁ
ଯେଉଁ alias ଏକ antigravity quota family କିମ୍ବା codex scope ଅତିକ୍ରମ କରେ ତାହା ନିଜକୁ କେବେ ମଧ୍ୟ lock କରେ ନାହିଁ। ଏକ
ଗଦ୍ୟ ଇଙ୍ଗିତ (prose hint), ଏକ untyped `retryDelay`, କିମ୍ବା
ସମଗ୍ର ସଂଯୋଗ ଦ୍ୱାରା ଅଂଶୀଦାର ହୋଇଥିବା limiter ବିରାମ (pause)କୁ ବଜାୟ ରଖେ। ଯେତେବେଳେ 429 ପଥ ନୂଆ ନିର୍ମାଣ କରିଥିବା limiter
ବିରାମ ନେଏ, ଯେଉଁ callerର ବାକି ଧାଡ଼ି ସମୟ ବିରାମ ଶେଷ ପୂର୍ବରୁ ଶେଷ ହୁଏ, ତାହାକୁ ତୁରନ୍ତ
queue-timeout code ସହିତ ଫେରାଇଦିଆଯାଏ (`checkLimiterPause`), ସେହି ସମୟ ପାଇଁ ଅପେକ୍ଷା ନ କରାଇ; ରେକର୍ଡ ହୋଇଥିବା ଶେଷ ସମୟ
limiter ନିର୍ମାଣ ପୂର୍ବରୁ anchor ହୋଇଥାଏ, ଯେଉଁଠାରେ Bottleneck ନିଜର refresh
ଘଡ଼ି ଆରମ୍ଭ କରେ, ଏବଂ reservoirରେ ପରବର୍ତ୍ତୀ କୌଣସି ପରିବର୍ତ୍ତନ ଏହାକୁ ଭୁଲିଯାଏ।
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` ଏବଂ
`tests/unit/rate-limit-body-retry-pause.test.ts` ଦ୍ୱାରା ଆଚ୍ଛାଦିତ (covered)।

**`maxQueueDepth` — opt-in ପ୍ରବେଶ ସୀମା (ନୂତନ)।** `resilienceSettings.requestQueue.maxQueueDepth`
ଗୋଟିଏ provider+connection ପାଇଁ ଏକକାଳୀନ କେତେଗୁଡ଼ିଏ ଅନୁରୋଧ ଧାଡ଼ିରେ ରହିପାରିବେ (ଏପର୍ଯ୍ୟନ୍ତ dispatch ହୋଇନାହାନ୍ତି)
ତାହାକୁ ସୀମିତ କରେ। ଯେତେବେଳେ ଧାଡ଼ିରେ ପୂର୍ବରୁ `maxQueueDepth`ଟି
ଅନୁରୋଧ ରହିଛି, ନୂତନ ଅନୁରୋଧକୁ `limiter.schedule()`ରେ ପହଞ୍ଚିବା **ପୂର୍ବରୁ** ଏକ typed
`code: "RATE_LIMIT_QUEUE_FULL"` error ସହିତ ଶୀଘ୍ର-ପ୍ରତ୍ୟାଖ୍ୟାନ (fast-reject) କରାଯାଏ
— ତେଣୁ ପ୍ରତ୍ୟାଖ୍ୟାନ ସଶସ୍ତ୍ର (cheap) ହୁଏ ଏବଂ ସେହି ଅନୁରୋଧ ପାଇଁ ଯେକୌଣସି downstream
prompt-compression / translation କାର୍ଯ୍ୟ ପୂର୍ବରୁ ଘଟେ। ଡିଫଲ୍ଟ `0` =
ଅକ୍ଷମ (disabled), ବିଦ୍ୟମାନ ଅସୀମିତ-ଧାଡ଼ି ଆଚରଣକୁ ବଜାୟ ରଖେ; 0–100000 ମଧ୍ୟରେ ସୀମିତ।
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) କିମ୍ବା
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) ମାଧ୍ୟମରେ override କରନ୍ତୁ।

ପ୍ରବେଶ ଯାଞ୍ଚ ନିଜେ ଏକ ବିଶୁଦ୍ଧ ଫଙ୍କସନ୍ (pure function)
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), ତେଣୁ
ପ୍ରକୃତ Bottleneck limiter ବିନା ଏହା unit-test ହୋଇପାରିବ।

> #6593 କୁ ଖୋଲିଥିବା RFC ଏକ `bypassCompressionOnRateLimit`
> ଫ୍ଲାଗ୍ ମଧ୍ୟ ପ୍ରସ୍ତାବ ଦେଇଥିଲା। ଏହି repo ର `open-sse/services/compression/` ପାଇପଲାଇନ୍
> ହେଉଛି ଆଉଟବାଉଣ୍ଡ LLM ଅନୁରୋଧ ଉପରେ ପ୍ରମ୍ପ୍ଟ/କନ୍ଟେକ୍ସ୍ଟ କମ୍ପ୍ରେସନ୍ (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ବ୍ଲକ୍ ନିକଟରେ),
> ସିନ୍ଥେସାଇଜ୍ ହୋଇଥିବା 429 body ଗୁଡ଼ିକ ଉପରେ HTTP ରିସପନ୍ସ କମ୍ପ୍ରେସନ୍ ନୁହେଁ — ଏକ ଆକ୍ଷରିକ bypass ଫ୍ଲାଗ୍ ପାଇଁ କୌଣସି ମେଳ ହେଉଥିବା code path ନାହିଁ। ସେହି ପ୍ରମ୍ପ୍ଟ-କମ୍ପ୍ରେସନ୍ ପଦକ୍ଷେପ ମଧ୍ୟ ବର୍ତ୍ତମାନ ଅନୁରୋଧ ପାଇପଲାଇନରେ `withRateLimit()` _ପୂର୍ବରୁ_ ଚାଲେ, ତେଣୁ
> କ୍ୟୁ-ଫୁଲ୍ ପ୍ରତ୍ୟାଖ୍ୟାନରେ ଏହାକୁ ଏଡ଼ାଇବା ପାଇଁ ପୁନଃକ୍ରମଣ କରିବା ଏହି issue ର ପରିଧିଠାରୁ ଏକ ପୃଥକ, ବଡ଼
> ପରିବର୍ତ୍ତନ; ଏହା ଇଚ୍ଛାକୃତଭାବେ ଏଠାରେ କାର୍ଯ୍ୟକାରୀ କରାଯାଇ **ନାହିଁ** ଏବଂ ଯଦି CPU-ସଞ୍ଚୟ ଲାଭ ପୁନଃକ୍ରମଣ ଜୋଖିମ ଅପେକ୍ଷା ମୂଲ୍ୟବାନ ହୁଏ ତେବେ ଏହାକୁ follow-up ଭାବେ ଛଡ଼ା ଯାଇଛି।

### ରେଟ୍-ଲିମିଟ୍ ଅଟୋ-ଏନେବଲ୍ ସୁରକ୍ଷା ନେଟ୍ ଏବଂ କନେକସନ୍ ସୁରକ୍ଷା (`rateLimitProtection`)

**ଅଟୋ-ଏନେବଲ୍ ସୁରକ୍ଷା ନେଟ୍** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ଡିଫଲ୍ଟ `true`):
ଡିଫଲ୍ଟ ଅନୁଯାୟୀ, OmniRoute ସମସ୍ତ ସକ୍ରିୟ API-କି ପ୍ରୋଭାଇଡର୍ କନେକସନ୍ (`getProviderCategory(provider) === "apikey"`) ପାଇଁ ରେଟ୍-ଲିମିଟ୍ କ୍ୟୁ ସୁରକ୍ଷାକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ସକ୍ଷମ କରେ। ଏହା ନିଶ୍ଚିତ କରେ ଯେ rate-sensitive ଅପଷ୍ଟ୍ରିମ୍ API key ଗୁଡ଼ିକୁ ଆସୁଥିବା ଅନୁରୋଧଗୁଡ଼ିକ ଅପଷ୍ଟ୍ରିମ୍ 429 ତ୍ରୁଟିରେ burst ନ ହୋଇ Bottleneck ମାଧ୍ୟମରେ କ୍ୟୁ ଏବଂ ଥ୍ରୋଟଲ୍ ହୁଅନ୍ତି। ସୁରକ୍ଷା ନେଟକୁ `RATE_LIMIT_AUTO_ENABLE` ଏନଭାଏରନମେଣ୍ଟ ଭେରିଏବଲ୍ (`false`/`0`/`off` ଅକ୍ଷମ କରେ, `true`/`1`/`on` ଜୋରକରି ସକ୍ଷମ କରେ) ମାଧ୍ୟମରେ ଓଭରରାଇଡ୍ କରାଯାଇପାରେ, ଯାହା ସଂରକ୍ଷିତ ଡ୍ୟାସବୋର୍ଡ ସେଟିଂ (**ସେଟିଂସ୍ → ରେଜିଲିଏନ୍ସ୍** / `PATCH /api/resilience`) ଅପେକ୍ଷା ପ୍ରାଥମିକତା ପାଏ।

**ପ୍ରତି-କନେକସନ୍ `rateLimitProtection` ର ଅର୍ଥ (semantics):**
ପ୍ରତି-କନେକସନ୍ ରେଟ୍-ଲିମିଟ୍ ସୁରକ୍ଷା ପ୍ରୋଭାଇଡର୍ କନେକସନ୍ ଗୁଡ଼ିକରେ `rateLimitProtection` boolean ଫିଲ୍ଡ ମାଧ୍ୟମରେ ଟ୍ରାକ୍ କରାଯାଏ (SQLite ରେ `rate_limit_protection` ଭାବେ ସଂରକ୍ଷିତ):

- **ସ୍ପଷ୍ଟ ଅନ୍ (`rateLimitProtection === true`)**: ପ୍ରୋଭାଇଡର୍ ବର୍ଗ କିମ୍ବା ଅଟୋ-ଏନେବଲ୍ ସୁରକ୍ଷା ନେଟ୍ ଚାଲୁ ଅଛି କି ନାହିଁ ତାହା ନିର୍ବିଶେଷରେ, ଏହି କନେକସନ୍ ପାଇଁ ରେଟ୍-ଲିମିଟ୍ ସୁରକ୍ଷା ସ୍ପଷ୍ଟ ଭାବେ ସକ୍ଷମ କରାଯାଏ।
- **ସ୍ପଷ୍ଟ ଅଫ୍ (`rateLimitProtection === false`)**: ସ୍ପଷ୍ଟ ସୁରକ୍ଷାକୁ ଅକ୍ଷମ କରେ, କିନ୍ତୁ ସକ୍ରିୟ API-କି କନେକସନକୁ ଗ୍ଲୋବାଲ୍ ଅଟୋ-ଏନେବଲ୍ ସୁରକ୍ଷା ନେଟ୍ରୁ ବାଦ୍ ଦିଏ **ନାହିଁ**। `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) ରେ, `false` ଏବଂ `undefined` ସମାନ: କେବଳ `rateLimitProtection === true` କୁ ସ୍ପଷ୍ଟ ଓଭରରାଇଡ୍ ଭାବେ ଗଣାଯାଏ। ଯଦି `rateLimitProtection` `false` (କିମ୍ବା ସେଟ୍ ହୋଇନାହିଁ), ତେବେ ଏକ ସକ୍ରିୟ API-କି କନେକସନ୍ ତଥାପି ଅଟୋ-ଏନେବଲ୍ ସର୍ତ୍ତ ସହିତ ମେଳ ଖାଏ ଏବଂ ରେଟ୍-ଲିମିଟ୍ ସୁରକ୍ଷିତ ରହେ।
- **କୌଣସି ପ୍ରତି-କନେକସନ୍ ଅପ୍ଟ-ଆଉଟ୍ ନାହିଁ**: ଅନ୍ୟମାନଙ୍କ ପାଇଁ ଅଟୋ-ଏନେବଲ୍ ସକ୍ରିୟ ରଖି, ଜଣେ ଅପରେଟର୍ ବର୍ତ୍ତମାନ "ଏହି ଏକକ ସକ୍ରିୟ API-କି କନେକସନ୍ ରେଟ୍-ଲିମିଟ୍ କ୍ୟୁ ସୁରକ୍ଷା ବିନା ଚାଲିବା ଉଚିତ୍" ବୋଲି ବ୍ୟକ୍ତ କରିପାରିବେ ନାହିଁ। API-କି କନେକସନ୍ ଗୁଡ଼ିକୁ ରେଟ୍-ଲିମିଟ୍ କ୍ୟୁ ବିନା ସମ୍ପୂର୍ଣ୍ଣ ରୂପେ ଚଲାଇବା ପାଇଁ, ସୁରକ୍ଷା ନେଟକୁ ଗ୍ଲୋବାଲ୍ ଭାବେ ବନ୍ଦ କରିବାକୁ ପଡ଼ିବ (`RATE_LIMIT_AUTO_ENABLE=false` କିମ୍ବା `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)।

**ସମର୍ଥିତ ଲେଖା ପଥ (write paths):**

- **`POST /api/rate-limits`**: କୌଣସି କନେକସନ୍ ପାଇଁ `rateLimitProtection` ଟଗଲ୍ କରିବା ପାଇଁ ସମର୍ଥିତ ପରିଚାଳନା ଲେଖା ପଥ (`{ connectionId: string, enabled: boolean }`)। ଏହାକୁ `enabled: true` ସହିତ କଲ୍ କରିବା ସ୍ପଷ୍ଟ ସୁରକ୍ଷା ସକ୍ଷମ କରେ; `enabled: false` ସହିତ କଲ୍ କରିବା ସ୍ପଷ୍ଟ ସୁରକ୍ଷାକୁ ହଟାଏ (ଯଦିଓ ଅଟୋ-ଏନେବଲ୍ ଚାଲୁ ଥିଲେ ସକ୍ରିୟ API-କି କନେକସନ୍ ଗୁଡ଼ିକ ଗ୍ଲୋବାଲ୍ ସୁରକ୍ଷା ନେଟ୍ ଅଧୀନରେ ରହନ୍ତି)।
- **`PUT /api/providers/[id]`**: ଇଚ୍ଛାକୃତଭାବେ `rateLimitProtection` ଗ୍ରହଣ କରେ **ନାହିଁ** କିମ୍ବା ଫ୍ଲିପ୍ କରେ ନାହିଁ (#11278)। `PUT /api/providers/[id]` ମାଧ୍ୟମରେ ପ୍ରୋଭାଇଡର୍ କନେକସନ୍ ମେଟାଡେଟା ଅପଡେଟ୍ କରିବା ସଂରକ୍ଷିତ ରେଟ୍-ଲିମିଟ୍ ସୁରକ୍ଷା ଅବସ୍ଥାକୁ କେବେ ବଦଳାଏ ନାହିଁ।

---

## 6। ମନ୍ଥର-ଷ୍ଟ୍ରିମ୍ ଥ୍ରୋପପୁଟ୍ ୱାଚଡଗ୍ (# #9709)

ବ z କଳ୍ପିକ `resilienceSettings.streamRecovery.throughputWatchdog` ଗାର୍ଡ ଏକ ଅପଷ୍ଟ୍ରିମକୁ ଚିହ୍ନଟ କରେ ଯାହାକି ଏପର୍ଯ୍ୟନ୍ତ ପଠାଉଛି କିନ୍ତୁ ବିନ୍ୟାସିତ ଉପଯୋଗୀ-ଆଉଟପୁଟ ହାରଠାରୁ ସହାୟକ ଆଉଟପୁଟ୍ ଉତ୍ପାଦନ କରୁଛି \| ଏହା ଜାଣିଶୁଣି ନିଷ୍କ୍ରିୟ ସମୟ ସମାପ୍ତି ଠାରୁ ଭିନ୍ନ: ହୃଦସ୍ପନ୍ଦନ ଏବଂ ମେଟାଡାଟା ପୁନ tim ସେଟ୍ କରେ ନାହିଁ ଏବଂ ପ୍ରଗତି ଭାବରେ ଗଣନା କରେ ନାହିଁ \| ଏହା କଠିନ ପ୍ରୟାସ ସମୟସୀମା (# #9153) ଠାରୁ ମଧ୍ୟ ଭିନ୍ନ, ଯାହା ଆଉଟପୁଟ୍ ଗୁଣବତ୍ତାକୁ ଖାତିର ନକରି ଏକ ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷା ଛାତ ରହିଥାଏ \|

ୱାଚଡଗ୍ ଏକ ୱାର୍ମ ଅପ୍ ପିରିୟଡ୍ ଆବଶ୍ୟକ କରେ ଏବଂ ଏହା ବନ୍ଦ ହେବା ପୂର୍ବରୁ ଏକ ସମ୍ପୂର୍ଣ୍ଣ ଗାଡ଼ି ୱିଣ୍ଡୋ \| ଏହା ଚାଟ୍ ସମାପ୍ତି ଏବଂ ପ୍ରତିକ୍ରିୟା API ଆଉଟପୁଟ୍ ଇଭେଣ୍ଟଗୁଡିକ (ଏକ ରକ୍ଷଣଶୀଳ UTF-8 ବାଇଟ୍ ପ୍ରକ୍ସି) ରୁ ଟେକ୍ସଟ୍ ଡେଲ୍ଟା ଗଣନା କରେ, କେବଳ ବ୍ୟବହାର ଏବଂ ଖାଲି ଘଟଣାକୁ ଉପେକ୍ଷା କରେ, ଏବଂ ଟୁଲ୍ କଲ୍ କିମ୍ବା ଯୁକ୍ତିଯୁକ୍ତ ଘଟଣାଗୁଡ଼ିକ ଉଡ଼ାଣ ସମୟରେ ବିଚାରକୁ ସ୍ଥଗିତ କରେ \| ଏହା ଡିଫଲ୍ଟ ଭାବରେ ଅକ୍ଷମ ହୋଇଛି ଏବଂ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ସହିତ ସକ୍ଷମ ହୋଇପାରିବ (ଯାହା env ମୂଲ୍ୟ କେବଳ ଡିଫଲ୍ଟ — ଏକ ସଞ୍ଚିତ `resilienceSettings.streamRecovery.throughputWatchdog.enabled` ବୁଲିଅନ୍ ଜିତେ; ଏହି ଗାଇଡର ଉପରି ଭାଗରେ env-vs- ଡ୍ୟାସବୋର୍ଡ ପ୍ରାଥମିକତା ନୋଟ୍ ଦେଖନ୍ତୁ); ୱିଣ୍ଡୋ, ୱାର୍ମ ଅପ୍, ସର୍ବନିମ୍ନ ହାର, ଏବଂ ସର୍ବନିମ୍ନ ମାପଯୋଗ୍ୟ ଆଉଟପୁଟ୍ ସାଧାରଣ ସ୍ଥିରତା-ସେଟିଙ୍ଗ୍ ସ୍ normal ାଭାବିକ ସ୍ତର ଦ୍ୱାରା ସୀମିତ \|

ସକ୍ଷମ ହେଲେ, କେବଳ ଏକ ସକ୍ରିୟ ଅପଷ୍ଟ୍ରିମ ପ୍ରୟାସରେ ଏକ ୱାଚଡଗ୍ ଗର୍ଭପାତ ପ୍ରୟୋଗ କରାଯାଏ \| କ any ଣସି କ୍ଲାଏଣ୍ଟ-ଦୃଶ୍ୟମାନ ବାଇଟ୍ ପୂର୍ବରୁ, ବିଦ୍ୟମାନ ସମାନ-ଆକାଉଣ୍ଟ୍ ଶୀଘ୍ର ପୁନରୁଦ୍ଧାର ପଥ ପ୍ରୟାସକୁ ପୁନ op ଖୋଲିପାରେ \| ପ୍ରତିଶ୍ରୁତି ପରେ, stream ରଣା କଦାପି ଅନ୍ଧ ଭାବରେ ପୁନ play ଚିତ୍ରିତ ହୁଏ ନାହିଁ; କେବଳ ବିଦ୍ୟମାନ ସୁରକ୍ଷିତ ମିଡ୍-ଷ୍ଟ୍ରିମ୍ ଜାରି ଚୁକ୍ତିନାମା ଏକ ସଫିକ୍ସ ସିଲେଇ କରିପାରିବ \| ଫାଇନାଲାଇଜେସନ୍ ଏକକ-ସଟ ରହିଥାଏ, ତେଣୁ ବ୍ୟବହାର ଆକାଉଣ୍ଟିଂ ଏବଂ ସେମାଫୋର ରିଲିଜ୍ ନକଲ ନୁହେଁ \|

---

## 7. ଆପଷ୍ଟ୍ରିମ୍ ସ୍ଥିତି ପୁନର୍ବିବୃତ୍ତି (ଭୁଲ୍ ଦର୍ଶାଯାଇଥିବା quota ତ୍ରୁଟିଗୁଡ଼ିକ)

**ପରିସର:** ଗୋଟିଏ ଆପଷ୍ଟ୍ରିମ୍ ଗେଟୱେ ଯାହା ଅସ୍ଥାୟୀ quota ସମାପ୍ତିକୁ ଭୁଲ୍ HTTP ସ୍ଥିତି ସହିତ ରିପୋର୍ଟ କରେ।

**ଉଦ୍ଦେଶ୍ୟ:** ଶ୍ରେଣୀବିଭାଗ ପୂର୍ବରୁ ବିଭ୍ରାନ୍ତିକର ସ୍ଥିତିକୁ ସଂଶୋଧନ କରିବା, ଯାହାଫଳରେ ଡାଉନଷ୍ଟ୍ରିମ୍ ଉପଭୋକ୍ତାମାନେ (fallback engine, combo aggregation, କ୍ଲାଏଣ୍ଟ-ମୁଖୀ ପ୍ରତିକ୍ରିୟା) ବିଫଳତାର ପ୍ରକୃତ retry-ଯୋଗ୍ୟ ସ୍ୱଭାବ ଦେଖିପାରିବେ।

କିଛି ଗେଟୱେ ଅସ୍ଥାୟୀ quota ସମାପ୍ତିକୁ retry-ଅଯୋଗ୍ୟ HTTP ସ୍ଥିତି ସହିତ ସୂଚିତ କରନ୍ତି। `agentrouter.org` ମାନକ `429` ପରିବର୍ତ୍ତେ ଚୀନ୍ body (`用户额度不足` / `额度不足`) ସହିତ `403` (ବେଳେବେଳେ `400`) ଫେରାଇଥାଏ। Claude Code ପରି କ୍ଲାଏଣ୍ଟମାନେ `403` କୁ ସ୍ଥାୟୀ ବୋଲି ବିବେଚନା କରି ସେସନ୍ ବନ୍ଦ କରିଦିଅନ୍ତି, ଏବଂ ସଂଶୋଧନ ବିନା fallback engine ଏହାକୁ quota ଘଟଣା ପରିବର୍ତ୍ତେ `AUTH_ERROR` ଭାବରେ ଶ୍ରେଣୀଭୁକ୍ତ କରିବ।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — ପ୍ରତି-ପ୍ରୋଭାଇଡର ନିୟମଗୁଡ଼ିକର ଏକ ତାଲିକା (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` ମାଧ୍ୟମରେ ମିଳାନ ହୁଏ।
- କଲ୍ ସାଇଟ୍: `open-sse/handlers/chatCore.ts` ରେ `providerFailure:` ବ୍ଲକ୍ (ପ୍ରାୟ ଧାଡ଼ି 3654), `parseUpstreamError()` ଏକ error HTTP ସ୍ଥିତି (`!providerResponse.ok`) ସହିତ ଆପଷ୍ଟ୍ରିମ୍ ପ୍ରତିକ୍ରିୟାକୁ ପାର୍ସ କରିବା ଠିକ୍ ପରେ ଏବଂ ଯେକୌଣସି ଶ୍ରେଣୀବିଭାଗ ଚାଲିବା ପୂର୍ବରୁ, ଯାହାଫଳରେ ପ୍ରତ୍ୟେକ ଡାଉନଷ୍ଟ୍ରିମ୍ ଉପଭୋକ୍ତା ସଂଶୋଧିତ ସ୍ଥିତି ଦେଖନ୍ତି। `200` SSE ଷ୍ଟ୍ରିମ୍ ଭିତରେ ଏମ୍ବେଡ୍ ହୋଇଥିବା ତ୍ରୁଟିଗୁଡ଼ିକ ଏକ ପୃଥକ, ପରବର୍ତ୍ତୀ ଷ୍ଟ୍ରିମ୍-ପାର୍ସିଂ ପଥ ଅନୁସରଣ କରନ୍ତି ଏବଂ ଆଜି ଏହି hook ଦ୍ୱାରା ଆବୃତ୍ତ **ନୁହଁନ୍ତି** — ଏକ ଜଣାଶୁଣା ସୀମାବଦ୍ଧତା, ଯାହା agentrouter ର ଭୁଲ୍ ସ୍ଥିତି ପାଇଁ ଏପର୍ଯ୍ୟନ୍ତ ଆବଶ୍ୟକ ନାହିଁ (ଯାହା ଏକ error HTTP ସ୍ଥିତି ଭାବରେ ଦେଖାଯାଏ)।
- Retry ଯୋଗ୍ୟତା: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`) ରେ ଅଛି, ତେଣୁ ପୁନର୍ବିବୃତ୍ତ ତ୍ରୁଟି ମୃତ `403` ଭାବରେ ଦେଖାଯିବା ପରିବର୍ତ୍ତେ ଏକ ପ୍ରକୃତ retry ୱିଣ୍ଡୋ ବହନ କରେ।
- କୃତ୍ରିମ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) କେବଳ ପୁନର୍ବିବୃତ୍ତ ପ୍ରତିକ୍ରିୟା **କ୍ଲାଏଣ୍ଟ** କୁ କହୁଥିବା କଥା; ଏହା ନିଜେ ସଂଯୋଗର ଆଭ୍ୟନ୍ତରୀଣ cooldown/lockout ଅବଧି ନୁହେଁ — ତାହା ପୃଥକ ଭାବରେ ଯେକୌଣସି ପ୍ରକ୍ରିୟା ପ୍ରକୃତରେ ପୁନର୍ବିବୃତ୍ତ ତ୍ରୁଟିକୁ ସମାଳେ ତାହା ଦ୍ୱାରା ପରିଚାଳିତ ହୁଏ (Connection Cooldown ର ବର୍ଦ୍ଧିଷ୍ଣୁ backoff, §2, API-key ପ୍ରୋଭାଇଡରମାନଙ୍କ ପାଇଁ ଆଧାର `3s`; କିମ୍ବା Model Lockout, §3, agentrouter ପରି per-model-quota ପ୍ରୋଭାଇଡରମାନଙ୍କ ପାଇଁ)। ରାଉଟର୍ କ୍ଲାଏଣ୍ଟକୁ ଘୋଷଣା କରୁଥିବା 60s ୱିଣ୍ଡୋ ଠାରୁ ଶୀଘ୍ର ଆଭ୍ୟନ୍ତରୀଣ ଭାବରେ retry ପାଇଁ ଯୋଗ୍ୟ ହୋଇପାରେ — ଇଚ୍ଛାକୃତ headroom, ବଗ୍ ନୁହେଁ।

ସ୍ଥାୟୀ ତ୍ରୁଟିଗୁଡ଼ିକ (agentrouter ର `无权访问模型` — ଏହି ମଡେଲକୁ ପ୍ରବେଶାଧିକାର ନାହିଁ) କେବେବି ପୁନର୍ବିବୃତ୍ତ ହୁଅନ୍ତି ନାହିଁ: `textMarkers` ମିଳିଗଲେ ମଧ୍ୟ `excludeMarkers` ନିୟମକୁ ଭିଟୋ କରେ, ତେଣୁ ତ୍ରୁଟି ନିଜର ମୂଳ ସ୍ଥିତି ରଖେ ଏବଂ କିଛି ଏହାକୁ ଅନନ୍ତ କାଳ ପର୍ଯ୍ୟନ୍ତ retry କରେ ନାହିଁ। ମିଳୁଥିବା ପ୍ରୋଭାଇଡର ଶ୍ରେଣୀବିଭାଗ ନିୟମ (`open-sse/config/providerErrorRules.ts` ରେ `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, ଏକ `6h` ଘୋଷିତ ଆଧାର cooldown) ସାଧାରଣ apikey-ବର୍ଗ `FORBIDDEN` early-return _ପୂର୍ବରୁ_ `checkFallbackError` (`open-sse/services/accountFallback.ts`) ଦ୍ୱାରା ପରାମର୍ଶ କରାଯାଏ, `honorsRuleLockScope(provider)` ଉପରେ gated (#10334 — ବର୍ତ୍ତମାନ `providerErrorRules.ts` ରେ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ମାଧ୍ୟମରେ କେବଳ agentrouter ପାଇଁ)। ନିୟମର ଘୋଷିତ 6h cooldown `fallbackResult.baseCooldownMs` ଭାବରେ ପ୍ରବାହିତ ହୁଏ, କିନ୍ତୁ ଏହା ତଥାପି ପୂର୍ବ-ବିଦ୍ୟମାନ per-model-quota lockout ପଥକୁ ଯୋଗାଏ (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, cooldown ଉତ୍ସ ବ୍ୟତୀତ #10334 ଦ୍ୱାରା ଅପରିବର୍ତ୍ତିତ): ଏହା ଅପରେଟର୍ଙ୍କ `mlSettings.maxCooldownMs` (ଡିଫଲ୍ଟ `1_800_000ms` / 30min) କୁ clamp ହୁଏ, ଅନ୍ୟ ସମସ୍ତ model lockout ପରି, ଏବଂ _ସଂରକ୍ଷିତ lockout କାରଣ_ ପୂର୍ବ-ବିଦ୍ୟମାନ hardcoded `"forbidden"` ହିଁ ରହେ, ନିୟମର `"auth_error"` ନୁହେଁ — କେବଳ cooldown ଅବଧି end-to-end ମାନ୍ୟ ହୁଏ, କାରଣ ଷ୍ଟ୍ରିଙ୍ଗ ନୁହେଁ। ସଂଯୋଗ ନିଜେ ସକ୍ରିୟ ରହେ; ସମାନ ସଂଯୋଗରେ ଥିବା ସହୋଦର ମଡେଲଗୁଡ଼ିକ ପ୍ରଭାବିତ ହୁଅନ୍ତି ନାହିଁ।

ପୁନର୍ବିବୃତ୍ତ quota ତ୍ରୁଟିଗୁଡ଼ିକ (`额度不足`) ପ୍ରଡକ୍ସନ୍ରେ ଏକ ପ୍ରୋଭାଇଡର ନିୟମରେ ପହଞ୍ଚନ୍ତି (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ନିଜର କୌଣସି ଘୋଷିତ cooldown ନାହିଁ — persistence layer ର scaled backoff ଡିଫଲ୍ଟ ଲାଗୁ ହୁଏ)। #10334 ପରଠାରୁ, `ProviderErrorRuleMatch` ଉପରେ `scope` end-to-end ବ୍ୟବହୃତ ହୁଏ, କିନ୍ତୁ **କେବଳ** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ରେ ଥିବା ପ୍ରୋଭାଇଡରମାନଙ୍କ ପାଇଁ (`providerErrorRules.ts` — ଆଜି କେବଳ `"agentrouter"`, `honorsRuleLockScope()` ମାଧ୍ୟମରେ gated)। ଅନ୍ୟ ପ୍ରତ୍ୟେକ ପ୍ରୋଭାଇଡର ପାଇଁ `scope` ସୂଚନାମୂଳକ ରହେ, ଠିକ୍ #10334 ପୂର୍ବ ପରି। `checkFallbackError` ମିଳିଥିବା ନିୟମର scope କୁ `fallbackResult.ruleScope` ଭାବରେ ଦେଖାଏ; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) ହେଉଛି ସେହି ଅଂଶୀଦାର guard ଯାହା ନିଶ୍ଚିତ କରେ ଯେ ଏକ `ruleScope` connection-ବ୍ୟାପୀ, ସ୍ୱ-ପୁନରୁଦ୍ଧାରକାରୀ ସଙ୍କେତ ଭାବରେ ମାନ୍ୟତା ଦେବା ପ୍ରକୃତରେ ସୁରକ୍ଷିତ (scope `"connection"`, reason `quota_exhausted`, କେବେ `permanent` ନୁହେଁ, କେବେ `creditsExhausted` ନୁହେଁ — scope `"connection"` କୁ ସ୍ଥାୟୀ ଆକାଉଣ୍ଟ ଅବସ୍ଥା ସହ ଯୋଡ଼ୁଥିବା ଭବିଷ୍ୟତ ନିୟମ ବିରୁଦ୍ଧରେ ଏକ ପ୍ରତିରକ୍ଷା)। ଦୁଇଜଣ ଉପଭୋକ୍ତା ଏହାକୁ କଲ୍ କରନ୍ତି:

- **ସ୍ଥାୟୀକରଣ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-providerର **ପ୍ରତି-ମଡେଲ୍** ଲକ୍ଆଉଟ୍
  ଶାଖାକୁ ଯିବା ପରିବର୍ତ୍ତେ (agentrouter ହେଉଛି `passthroughModels: true` → `hasPerModelQuota()`
  `true` ଫେରାଏ), ଏହା ଏକ **ଅସ୍ଥାୟୀ ସଂଯୋଗ କୁଲଡାଉନ୍** ପ୍ରୟୋଗ କରେ —
  `testStatus: "unavailable"` + `rateLimitedUntil`, କେବେ ମଧ୍ୟ କୌଣସି ଚୂଡ଼ାନ୍ତ ସ୍ଥିତି
  (`credits_exhausted`/`banned`/`expired`) ନୁହେଁ — ତେଣୁ କୁଲଡାଉନ୍ ଅବଧି
  ଶେଷ ହେବା ପରେ ସଂଯୋଗଟି ମାନୁଆଲ୍ କ୍ରେଡେନ୍ସିଆଲ୍ ରିସେଟ୍ ଆବଶ୍ୟକ ନକରି
  ନିଜେ ପୁନରୁଦ୍ଧାର ହୁଏ।
  `disableCooling: true` ଥିବା ସଂଯୋଗଗୁଡ଼ିକ ପାଇଁ ଏହାକୁ ଏଡ଼ାଇ ଦିଆଯାଏ (#2997): ସେହି ବିକଳ୍ପ-ତ୍ୟାଗ
  ପରିବର୍ତ୍ତେ ପ୍ରତି-ମଡେଲ୍ ଲକ୍ଆଉଟ୍କୁ ଯାଏ (ଏକ ଡକ୍ୟୁମେଣ୍ଟ କରାଯାଇଥିବା ସମନ୍ୱୟ —
  ଶାଖାର ଉପରେ ଥିବା କୋଡ୍ ମନ୍ତବ୍ୟ ଦେଖନ୍ତୁ)।
- **ସମାନ-ଅନୁରୋଧ କମ୍ବୋ ରାଉଟିଂ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ସେହି ସୁରକ୍ଷା-ଶର୍ତ୍ତ ସଂଯୋଗଟିକୁ
  ଇନ୍-ମେମୋରି `exhaustedConnections` ସେଟ୍ରେ ଚିହ୍ନିତ କରେ, ଯାହାର କୀ
  `${provider}:${connectionId}`। ଏହା କେବଳ ଅବଶିଷ୍ଟ SAME-REQUEST
  ଟାର୍ଗେଟ୍କୁ ଏଡ଼ାଏ, ଯେତେବେଳେ _ସେହି ଟାର୍ଗେଟ୍ ନିଜେ ଠିକ୍ ସେହି `connectionId` ବହନ କରେ_ ତାହାର ନିଜସ୍ୱ
  ଟାର୍ଗେଟ୍ ଅବଜେକ୍ଟରେ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)`ଟି `exhaustedConnections` ଲୁକଅପ୍ ପୂର୍ବରୁ) — ଏକ ସାଧାରଣ
  ମଡେଲ୍-ତାଲିକା କମ୍ବୋରେ, ଯେଉଁଠାରେ ସହୋଦର ଟାର୍ଗେଟ୍ଗୁଡ଼ିକ ନିଜସ୍ୱ କୌଣସି ପିନ୍ କରାଯାଇଥିବା `connectionId`
  ବହନ କରନ୍ତି ନାହିଁ ଏବଂ ପ୍ରତି ଡିସ୍ପାଚ୍ରେ କେବଳ ଗୋଟିଏ ସଂଯୋଗ ରେସ୍ପନ୍ସର
  `X-OmniRoute-Selected-Connection-Id` ହେଡର୍ରୁ ସମାଧାନ କରାଯାଏ, ସେଠାରେ ସେହି କୀ ସହ କେବେ ମେଳ ହୁଏ ନାହିଁ। ସେହି
  ସାଧାରଣ ପରିସ୍ଥିତିରେ, ଅବଶିଷ୍ଟ କୌଣସି ଲେଗ୍ ଏମାତ୍ର ନିଃଶେଷ ହୋଇଥିବା ଆକାଉଣ୍ଟକୁ ପୁନଃବ୍ୟବହାର କରିବାରୁ
  ରୋକୁଥିବା ପ୍ରକୃତ ସୁରକ୍ଷା ଏହି ସେଟ୍ ନୁହେଁ — ଏହା ହେଉଛି ଉପରୋକ୍ତ ସ୍ଥାୟୀକରଣ ସ୍ତର
  (ସଂଯୋଗର `rateLimitedUntil` ବର୍ତ୍ତମାନ ଭବିଷ୍ୟତ ସମୟକୁ ସୂଚାଏ), ଯାହା
  ବିଫଳତା ପାଇଁ `transientRateLimitedProviders`କୁ ଦମନ କରୁଥିବା ଏହି ସମାନ
  ସୁରକ୍ଷା-ଶର୍ତ୍ତ ସହ ମିଶି କାମ କରେ (`targetExhaustion.ts`ରେ
  "ଦୁଇ-ପର୍ଯ୍ୟାୟ ଡିଜାଇନ୍" ଏବଂ `isAgentrouterConnectionQuotaScope` ଶାଖାର କୋଡ୍ ମନ୍ତବ୍ୟ
  ଦେଖନ୍ତୁ): ସେହି ସେଟ୍କୁ ଅଚିହ୍ନିତ ରଖିଲେ, `combo.ts`ର `allowRateLimitedConnection` ବାଧ୍ୟତାମୂଳକ-ଅନୁମତି
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ପ୍ରଦାନକାରୀର ଅବଶିଷ୍ଟ
  ଲେଗ୍ଗୁଡ଼ିକ ପାଇଁ ସକ୍ରିୟ ହୁଏ ନାହିଁ, ତେଣୁ କ୍ରେଡେନ୍ସିଆଲ୍ ଚୟନର `rateLimitedUntil`
  ଫିଲ୍ଟର୍ (`src/sse/services/auth.ts:1238`) ସାଧାରଣ ଭାବରେ ମାନ୍ୟ ହୁଏ ଏବଂ ଏକ
  ଅବଶିଷ୍ଟ ଲେଗ୍ ହୁଏ ଏକ ଭିନ୍ନ, ଏପର୍ଯ୍ୟନ୍ତ ଯୋଗ୍ୟ agentrouter
  ସଂଯୋଗ ବାଛେ, ନଚେତ୍ କୌଣସି କ୍ରେଡେନ୍ସିଆଲ୍ ଉପଲବ୍ଧ ନଥିବାରୁ ବିଫଳ ହୁଏ — ଏହି ଶାଖା ଏମାତ୍ର
  କୁଲଡାଉନ୍ କରିଥିବା ସଂଯୋଗକୁ ବାଧ୍ୟତାମୂଳକ ଭାବେ ପୁଣି ବ୍ୟବହାର କରେ ନାହିଁ।

### ଦୁଇ-ପର୍ଯ୍ୟାୟ ଡିଜାଇନ୍: ସ୍ଥିତି ପୁନଃନିର୍ଦ୍ଧାରଣ, ତା'ପରେ ବର୍ଗୀକରଣ

ସ୍ଥିତି ପୁନଃନିର୍ଦ୍ଧାରଣ (`upstreamStatusRestatement.ts`) ଏବଂ ପ୍ରଦାନକାରୀ
ବର୍ଗୀକରଣ ନିୟମଗୁଡ଼ିକ (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ହେଉଛି ପୃଥକ ରେଜିଷ୍ଟ୍ରି, ଯେଉଁଗୁଡ଼ିକ ଉଭୟ ପ୍ରଦାନକାରୀ id
ଏବଂ ଟେକ୍ସ୍ଟ ମାର୍କର୍ ଆଧାରରେ କୀ କରନ୍ତି, କିନ୍ତୁ ସେଗୁଡ଼ିକ ଭିନ୍ନ ସ୍ଥାନରେ ଚାଲନ୍ତି ଏବଂ ଭିନ୍ନ
ଉଦ୍ଦେଶ୍ୟ ପୂରଣ କରନ୍ତି: ପୁନଃନିର୍ଦ୍ଧାରଣ `chatCore.ts`ର ଆରମ୍ଭରେ HTTP ସ୍ଥିତିକୁ ପୁନଃଲେଖନ କରେ;
ବର୍ଗୀକରଣ ନିୟମଗୁଡ଼ିକ `checkFallbackError()` ଭିତରେ ଫଲ୍ବ୍ୟାକ୍ `reason` ଏବଂ ଲକ୍ `scope`
(`model` / `provider` / `connection`) ବାଛନ୍ତି
(`open-sse/services/accountFallback.ts`)।

ବର୍ଗୀକରଣ ନିୟମଗୁଡ଼ିକ କେବଳ `providerErrorRules.ts`ର `FULL_TEXT_RULE_PROVIDERS`
ଅନୁମୋଦିତ-ତାଲିକାରେ ଥିବା ପ୍ରଦାନକାରୀମାନଙ୍କ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ତ୍ରୁଟି **ଟେକ୍ସ୍ଟ** ଦେଖନ୍ତି (`额度不足` ପରି ବଡି
ମାର୍କର୍ଗୁଡ଼ିକ ସହ ମେଳ କରିବା ପାଇଁ ଆବଶ୍ୟକ) — ବର୍ତ୍ତମାନ କେବଳ `"agentrouter"`। ଅନ୍ୟ ପ୍ରତ୍ୟେକ
**ଅନ୍ତର୍ନିହିତ କ୍ୟାଟାଲଗ୍** ପ୍ରଦାନକାରୀ ପାଇଁ, `checkFallbackError`
`getProviderErrorRuleMatch`କୁ କେବଳ ସଂରଚିତ ତ୍ରୁଟି (`{code, type}`) ପ୍ରଦାନ କରେ, ଯାହା
ହେଡର୍/ସ୍ଥିତି/କୋଡ୍-ଆଧାରିତ ନିୟମଗୁଡ଼ିକ ପାଇଁ ପର୍ଯ୍ୟାପ୍ତ, କିନ୍ତୁ ବଡି-ଟେକ୍ସ୍ଟ ମାର୍କର୍ଗୁଡ଼ିକୁ ଦେଖିପାରେ ନାହିଁ।
ସହାୟକ `resolveRuleMatchBody()` ଏହି ଚୟନ କରେ: ଅନୁମୋଦିତ-ତାଲିକାର ପ୍ରଦାନକାରୀମାନଙ୍କ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ତ୍ରୁଟି ଟେକ୍ସ୍ଟ,
ଅନ୍ୟଥା ସଂରଚିତ ତ୍ରୁଟି। ଏକ **ଅନ୍ତର୍ନିହିତ** ପ୍ରଦାନକାରୀକୁ
`FULL_TEXT_RULE_PROVIDERS`ରେ ଯୋଡ଼ିବା ହେଉଛି ପ୍ରତି-ପ୍ରଦାନକାରୀ ସ୍ପଷ୍ଟ ସ୍ୱୀକୃତି — ତାଲିକାରେ
ନଥିବା ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ ଡିଫଲ୍ଟ ପଥଟି ବାଇଟ୍-ପ୍ରତି-ବାଇଟ୍ ଅପରିବର୍ତ୍ତିତ ରଖିବାକୁ ଏହା ରହିଛି।

ଗୋଟିଏ ନିୟମର `scope` (`model` / `provider` / `connection`) ହେଉଛି
`FULL_TEXT_RULE_PROVIDERS`ଠାରୁ ପୃଥକ ସ୍ୱୀକୃତି: `checkFallbackError` ଏହାକୁ କେବଳ
`fallbackResult.ruleScope` ଭାବେ ପ୍ରକାଶ କରେ, ଏବଂ ପରବର୍ତ୍ତୀ ଉପଭୋକ୍ତାମାନେ ସେହି ଫାଇଲ୍ର
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ଅନୁମୋଦିତ-ତାଲିକାରେ ଥିବା ପ୍ରଦାନକାରୀମାନଙ୍କ ପାଇଁ ମାତ୍ର
ଏହାକୁ ସୂଚନାମୂଳକ ଲେବଲ୍ଠାରୁ ଅଧିକ କିଛି ଭାବେ ସମ୍ମାନ କରନ୍ତି (`honorsRuleLockScope()` ମାଧ୍ୟମରେ ଗେଟ୍ କରାଯାଇଛି — ଆଜି କେବଳ `"agentrouter"`)। ଜଣେ
ପ୍ରଦାନକାରୀ ସେହି ଅନୁମୋଦିତ-ତାଲିକାରେ ଥିବାବେଳେ `scope: "connection"` ମେଳ ବାସ୍ତବରେ କ'ଣ କରେ, ତାହା ପାଇଁ ଉପରୋକ୍ତ "ପୁନଃନିର୍ଦ୍ଧାରିତ କୋଟା
ତ୍ରୁଟିଗୁଡ଼ିକ" ଦେଖନ୍ତୁ।

**#11104 — ଅପରେଟର୍-ଘୋଷିତ ନିୟମଗୁଡ଼ିକ ଉଭୟ ଅନୁମୋଦିତ-ତାଲିକାକୁ ବାଇପାସ୍ କରନ୍ତି।** ଜଣେ ଅପରେଟର୍
ଏହି ଫାଇଲ୍ ସମ୍ପାଦନା ନକରି ରନ୍ଟାଇମ୍ରେ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ମାଧ୍ୟମରେ ଏକ ପ୍ରତି-ପ୍ରଦାନକାରୀ ନିୟମ ଘୋଷଣା କରିପାରନ୍ତି। ଏକ ଅପରେଟର୍ ନିୟମକୁ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ପଛରେ ଗେଟ୍ କରିବା — ଯେଉଁ ଅନୁମୋଦିତ-ତାଲିକାଗୁଡ଼ିକ
ଅନ୍ତର୍ନିହିତ କ୍ୟାଟାଲଗ୍ ନିୟମଗୁଡ଼ିକର **ଡିଫଲ୍ଟ** ଆଚରଣ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ଉଦ୍ଦିଷ୍ଟ — ପୂର୍ବରୁ
ସେଠାରେ ତାଲିକାଭୁକ୍ତ ପ୍ରଦାନକାରୀମାନଙ୍କ ବ୍ୟତୀତ ଅନ୍ୟ ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ ସେଟିଂସ୍ ବ୍ୟବସ୍ଥାକୁ
ନିଷ୍କ୍ରିୟ କରିଦେବ, କାରଣ ନିୟମ ଘୋଷଣା କରିବାଟି ନିଜେ ଅପରେଟର୍ଙ୍କ ସ୍ପଷ୍ଟ
ସ୍ୱୀକୃତି। `resolveRuleMatchBody()` ଏବଂ `honorsRuleLockScope()` ଉଭୟ
ପ୍ରଥମେ `hasOperatorRuleForProvider()` ଯାଞ୍ଚ କରନ୍ତି: ଅପରେଟର୍ ନିୟମ ଥିବା ଜଣେ ପ୍ରଦାନକାରୀ
କଞ୍ଚା ତ୍ରୁଟି ଟେକ୍ସ୍ଟ ପାଏ ଏବଂ ତାହାର ଘୋଷିତ `scope` ସମ୍ମାନିତ ହୁଏ, ସେହି ପ୍ରଦାନକାରୀ
ଦୁଇଟି ଅନୁମୋଦିତ-ତାଲିକା ମଧ୍ୟରୁ କୌଣସିଟିରେ ମଧ୍ୟ ଦେଖାଯାଏ କି ନାହିଁ, ତାହା ନିର୍ବିଶେଷରେ।

**ଜଣାଶୁଣା ଅଭାବ — HTTP 400 ପାଇଁ `providerRuleRegistry`କୁ କେବେ ମଧ୍ୟ ପରାମର୍ଶ କରାଯାଏ ନାହିଁ।**
`checkFallbackError`ର `BAD_REQUEST` ଶାଖା ସ୍ଥିତି 400କୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ
ନିଜସ୍ୱ ପ୍ୟାଟର୍ନ ଆରେଗୁଡ଼ିକ (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, ଇତ୍ୟାଦି `accountFallback.ts`ରେ) ମାଧ୍ୟମରେ ବର୍ଗୀକୃତ କରେ ଏବଂ
ତାହାର ଉପରେ ଥିବା `configuredRule`/`getProviderErrorRuleMatch` ଶାଖାକୁ
ପହଞ୍ଚିବା ପୂର୍ବରୁ ଫେରିଯାଏ। `status: 400` ଥିବା ଏକ ଅନ୍ତର୍ନିହିତ କ୍ୟାଟାଲଗ୍ ନିୟମ
(କିମ୍ବା ଏକ ଅପରେଟର୍ ନିୟମ) ବାକ୍ୟବିନ୍ୟାସ ଦୃଷ୍ଟିରୁ ବୈଧ, କିନ୍ତୁ କେବେ ମଧ୍ୟ ସକ୍ରିୟ ହେବ ନାହିଁ। ବର୍ତ୍ତମାନ କୌଣସି
ବିଦ୍ୟମାନ ନିୟମ 400କୁ ଲକ୍ଷ୍ୟ କରେ ନାହିଁ, ତେଣୁ ପ୍ରଡକ୍ସନ୍ରେ କିଛି ପ୍ରଭାବିତ ହୁଏ ନାହିଁ — କିନ୍ତୁ ଭବିଷ୍ୟତର ଗୋଟିଏ 400 ନିୟମ ପାଇଁ
ପ୍ରଥମେ ଏହି ଶାଖାକୁ ପରିବର୍ତ୍ତନ କରିବାକୁ ପଡ଼ିବ, ଯାହା କେବଳ ଗୋଟିଏ ନିୟମ ଯୋଡ଼ିବାଠାରୁ ବଡ଼ ପରିବର୍ତ୍ତନ
(ଏହା ପୂର୍ବରୁ ପ୍ୟାଟର୍ନ-ଆରେ ଆଚରଣ ଉପରେ ନିର୍ଭର କରୁଥିବା ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ 400କୁ
ପୁନଃବର୍ଗୀକୃତ କରେ) ଏବଂ ଏକକ-ପ୍ରଦାନକାରୀ ନିୟମ ଯୋଗର ପରିସର ବାହାରେ।

### ନୂତନ quota-misstating gateway ଯୋଡ଼ିବା

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ରେ ଗୋଟିଏ rule array
   ପଞ୍ଜୀକରଣ କରନ୍ତୁ। `textMarkers` କୁ provider-specific ରଖନ୍ତୁ;
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ସହିତ
   ସଂଘର୍ଷ କରୁଥିବା ସାଧାରଣ ଇଂରାଜୀ ବାକ୍ୟାଂଶଗୁଡ଼ିକୁ କେବେବି ପୁନଃବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।
2. ସଠିକ୍ lock scope ବାଛିବା ପାଇଁ (account-wide quota ପାଇଁ `connection`,
   per-model errors ପାଇଁ `model`) ଐଚ୍ଛିକ ଭାବରେ
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ରେ
   ବର୍ଗୀକରଣ ନିୟମଗୁଡ଼ିକୁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ। ଏହି ପଦକ୍ଷେପ କେବଳ ସେହି provider
   ମାନଙ୍କ ପାଇଁ production ରେ ପ୍ରଭାବଶାଳୀ ହୁଏ ଯାହାଙ୍କ ନିୟମଗୁଡ଼ିକୁ ସମ୍ପୂର୍ଣ୍ଣ
   error text (body markers) ଆବଶ୍ୟକ: ସେହି ଫାଇଲରେ provider id କୁ
   `FULL_TEXT_RULE_PROVIDERS` ରେ ଯୋଡ଼ନ୍ତୁ — ଅନ୍ୟଥା `checkFallbackError`
   କେବଳ structured `{code, type}` error ଟିକୁ ହିଁ ନିୟମକୁ ଦେଇଥାଏ ଏବଂ ଗୋଟିଏ
   body-text ନିୟମ କେବେବି live traffic ସହିତ ମେଳ ଖାଏ ନାହିଁ। ଯେଉଁ ନିୟମଗୁଡ଼ିକ
   କେବଳ `status`/`headers` ଉପରେ ମେଳ ଖାଏ (Opencode କିମ୍ବା Minimax ପରି),
   ସେଗୁଡ଼ିକୁ ଏହି opt-in ଆବଶ୍ୟକ ନାହିଁ। ଅଲଗା ଭାବରେ, ଯଦି ନିୟମଟି
   `scope: "connection"` ଘୋଷଣା କରେ ଏବଂ ଉଦ୍ଦେଶ୍ୟ ହେଉଛି ପ୍ରକୃତ
   connection-wide cooldown ସହିତ same-request combo skip (କେବଳ ଗୋଟିଏ
   ସୂଚନାତ୍ମକ label ନୁହେଁ), ତେବେ ସେହି ଫାଇଲରେ provider id କୁ
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ରେ ଯୋଡ଼ନ୍ତୁ — ଏହାହିଁ
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ଏବଂ
   `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`)
   ରେ `isAgentrouterConnectionQuotaScope()`-ଶୈଳୀ ବ୍ୟବହାରକୁ gate କରେ; ଏହା ବିନା,
   `scope` ତଥାପି `fallbackResult.ruleScope` ଦେଇ ପ୍ରବାହିତ ହୁଏ କିନ୍ତୁ କିଛିବି
   ତାହା ଉପରେ କାର୍ଯ୍ୟ କରେ ନାହିଁ।
3. `tests/unit/upstream-status-restatement.test.ts` ଏବଂ
   `tests/unit/agentrouter-error-rules.test.ts` ଅନୁରୂପ unit tests ଯୋଡ଼ନ୍ତୁ
   (not-permanent / not-creditsExhausted guards ସମେତ, ଏବଂ — ଯଦି provider କୁ
   allowlist ଆବଶ୍ୟକ — ଗୋଟିଏ test ଯାହା ଦାବି କରେ ଯେ `resolveRuleMatchBody()`
   କେବଳ ସେହି provider ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ text ଫେରାଇଥାଏ)।

`chatCore.ts`, `classifyError`, କିମ୍ବା combo ରେ କୌଣସି ପରିବର୍ତ୍ତନ ଆବଶ୍ୟକ ନାହିଁ।

#### Egress-ବକେଟ୍ lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) ରେ ଥିବା provider ମାନଙ୍କୁ
IP-bucketed upstream ଭାବରେ ବିବେଚନା କରାଯାଏ (opencode free tier ଟି IP-bucketed,
account-bucketed ନୁହେଁ — #9611 ଦେଖନ୍ତୁ): status-429 ଦ୍ୱାରା ବର୍ଗୀକୃତ
`quota_exhausted` **କିମ୍ବା** `rate_limit_exceeded`, rotation ସେଗୁଡ଼ିକୁ ଚେଷ୍ଟା
କରିବା ପୂର୍ବରୁ, ପ୍ରତ୍ୟେକ allowlisted-family connection କୁ cool down କରେ ଯାହାର
ଶେଷ ଜଣା egress IP ବିଫଳ connection ର IP ସହିତ ମେଳ ଖାଏ
— N-1 ନିଶ୍ଚିତ-ବିଫଳ upstream calls କୁ ଏଡ଼ାଇବା ପାଇଁ (#10460/#10525 ସହିତ ସମାନ ଆକାର)।
`rate_limit_exceeded` କୁ ଇଚ୍ଛାକୃତ ଭାବରେ ଅନ୍ତର୍ଭୁକ୍ତ କରାଯାଇଛି:
`markAccountUnavailable` path ରେ opencode-specific ନିୟମଗୁଡ଼ିକ କେବେବି ମେଳ ଖାଏ
ନାହିଁ (`checkFallbackError` କୁ କୌଣସି headers/body ଦିଆଯାଏ ନାହିଁ, opencode
`FULL_TEXT_RULE_PROVIDERS` ରେ ନାହିଁ), ତେଣୁ ଗୋଟିଏ 429 ଯାହାର body ରେ
subscription-quota text ("monthly usage limit reached") ଥାଏ, ତାହା `status_429`
ନିୟମରେ ପହଞ୍ଚିବା ପୂର୍ବରୁ quota-text fallback (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1h cooldown) ଦ୍ୱାରା `quota_exhausted` ଭାବରେ ବର୍ଗୀକୃତ ହୁଏ
— ଯେତେବେଳେ ଗୋଟିଏ quota-text-ମୁକ୍ତ 429 (ସାଧାରଣ rate limiting) `status_429`
ନିୟମ ମାଧ୍ୟମରେ `rate_limit_exceeded` ଭାବରେ ବର୍ଗୀକୃତ ହୁଏ ଏବଂ ତଥାପି IP family
କୁ cool down କରେ। ଗୋଟିଏ allowlisted provider ପାଇଁ IP-bucketed rate limit
ହେଉଛି ସମାପ୍ତ quota ସହିତ ସମାନ ସଙ୍କେତ। ପ୍ରାମାଣିକ ସୀମାଗୁଡ଼ିକ:

- **ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ**: ଲକ୍ଟି `proxy_logs`ରୁ ସଂଯୋଗର ଶେଷ ଜଣାଶୁଣା `egress_ip`
  ନିର୍ଦ୍ଧାରଣ କରେ (24h ୱିଣ୍ଡୋ, ସିଙ୍କ୍ରୋନସ୍, କୌଣସି କ୍ୟାଶ୍ ନାହିଁ)। କୋଲ୍ଡ କ୍ୟାଶ୍ (egress
  IP କେବେ ପ୍ରୋବ୍ କରାଯାଇନାହିଁ) କିମ୍ବା କୌଣସି ରୋ ନଥିଲେ → ବିଫଳ ସଂଯୋଗଟିକୁ ତଥାପି ଏହି
  ବ୍ରାଞ୍ଚ ଦ୍ୱାରା କୁଲ୍ କରାଯାଏ (ଆଜି ପରି ରେକର୍ଡ କରାଯାଏ), କେବଳ କୌଣସି ସିବ୍ଲିଙ୍ଗ୍କୁ ଲକ୍ କରାଯାଏ ନାହିଁ।
- **କେବେ ମଧ୍ୟ ଟର୍ମିନାଲ୍ ନୁହେଁ**: କୁଲ୍ଡାଉନ୍ ହେଉଛି ଏକ ନବୀକରଣଶୀଳ କ୍ୱୋଟା ୱିଣ୍ଡୋ
  (`testStatus: "unavailable"`); ଏକ IP-ସ୍ତରୀୟ ସିଗ୍ନାଲ୍ରୁ କେବେ ମଧ୍ୟ ଏକ ସ୍ଥାୟୀ ଅବସ୍ଥା
  ନିର୍ଦ୍ଧାରଣ କରାଯାଏ ନାହିଁ। `disableCooling` ସଂଯୋଗଗୁଡ଼ିକ ବ୍ରାଞ୍ଚଟିକୁ ସମ୍ପୂର୍ଣ୍ଣ ଏଡ଼ାଇଯାଆନ୍ତି।
- **ଆଲାଉଲିଷ୍ଟ ହୋଇଥିବା ଫ୍ୟାମିଲି ପାଇଁ ଲକ୍ର ଗ୍ରାନ୍ୟୁଲାରିଟି ପରିବର୍ତ୍ତିତ ହୁଏ**: ଏହା ଏକ ସ୍କୋପ୍
  ପରିବର୍ତ୍ତନ, କେବଳ ଏକ ସିବ୍ଲିଙ୍ଗ୍ ଅପ୍ଟିମାଇଜେସନ୍ ନୁହେଁ। opencode ହେଉଛି ଏକ `passthroughModels`
  ପ୍ରୋଭାଇଡର୍, ତେଣୁ ଏହି ବ୍ରାଞ୍ଚ ପୂର୍ବରୁ ଏକ 429 ପ୍ରତି-MODEL ଲକ୍ଆଉଟ୍ ସୃଷ୍ଟି କରୁଥିଲା; ବର୍ତ୍ତମାନ ଏହା
  ଏକ ସଂଯୋଗ କୁଲ୍ଡାଉନ୍ ସୃଷ୍ଟି କରେ — ଏପରିକି କୌଣସି ସିବ୍ଲିଙ୍ଗ୍ ନଥିବା ଏକମାତ୍ର ସଂଯୋଗ
  ଚଳାଉଥିବା ଅପରେଟର୍ ପାଇଁ ମଧ୍ୟ। ଏହା ହେଉଛି ସେହି ଗ୍ରାନ୍ୟୁଲାରିଟି ଯାହାକୁ opencode ରୁଲ୍
  ଟେବୁଲ୍ ପୂର୍ବରୁ ସଠିକ୍ ବୋଲି ଘୋଷଣା କରିଛି (`scope: "connection"`,
  `providerErrorRules.ts`), କିନ୍ତୁ opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`ରେ ନଥିବାରୁ
  ଏପର୍ଯ୍ୟନ୍ତ ତାହାକୁ କେବେ ମଧ୍ୟ ସମ୍ମାନ ଦିଆଯାଇନାହିଁ। ବ୍ରାଞ୍ଚଟି ସଂଯୋଗ-ସ୍କୋପ୍ ଥିବା
  agentrouter ବ୍ରାଞ୍ଚକୁ ଅନୁକରଣ କରି, ବିଫଳ ସଂଯୋଗର କୁଲ୍ଡାଉନ୍ + `backoffLevel` ନିଜେ ଲେଖେ,
  ଏବଂ ଫେରିଯାଏ — ତଳେ ଥିବା ପ୍ରତି-ମଡେଲ୍ ବ୍ଲକ୍ ଏବଂ ଜେନେରିକ୍ ପାଥ୍ରେ କେବେ ମଧ୍ୟ ପହଞ୍ଚାଯାଏ ନାହିଁ।
- **Combo ଅନ୍ତର୍ଭୁକ୍ତ**: agentrouter ବ୍ରାଞ୍ଚ ପରି, ଏହି ସ୍କୋପ୍ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ
  `persistUnavailableState`/`isCombo` ଡାଉନ୍ଗ୍ରେଡ୍କୁ ଅଣଦେଖା କରେ, ଯାହାକୁ ଏକ combo କଲର୍
  429 ଉପରେ ପ୍ରୟୋଗ କରେ। ଏକ ପ୍ରତି-ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ଏହି ସ୍କୋପ୍ର ଏକ ଦୁର୍ବଳ ରୂପ ନୁହେଁ, ଏହା
  ଭୁଲ୍ ୟୁନିଟ୍: ଏହା ନିଃଶେଷିତ IP ବିଷୟରେ କିଛି କୁହେ ନାହିଁ, ତେଣୁ combo
  ରୋଟେସନ୍ ପ୍ରତ୍ୟେକ ସିବ୍ଲିଙ୍ଗ୍ ପିଛା ନିଶ୍ଚିତ ଭାବେ ବିଫଳ ହେବାକୁ ଥିବା ଗୋଟିଏ କଲ୍ ଅପଚୟ କରିଚାଲିବ।
- **ସିବ୍ଲିଙ୍ଗ୍ ସୁରକ୍ଷା**: ପୂର୍ବରୁ ଟର୍ମିନାଲ୍ (banned/credits_exhausted) ଥିବା
  କିମ୍ବା ପୂର୍ବରୁ ଅଧିକ ଦୀର୍ଘ କୁଲ୍ଡାଉନ୍ରେ ଥିବା ଏକ ସିବ୍ଲିଙ୍ଗ୍କୁ କେବେ ମଧ୍ୟ ଓଭର୍ରାଇଟ୍ କରାଯାଏ ନାହିଁ।
- **ଏକ୍ସକ୍ଲୁସିଭ୍ ଆଲାଉଲିଷ୍ଟ**: `EGRESS_BUCKETED_LOCK_PROVIDERS`କୁ ବିସ୍ତାର କରିବା
  ଏକ ସ୍ପଷ୍ଟ ଓନର୍ ନିଷ୍ପତ୍ତି; କୌଣସି ଜେନେରିକ୍ ୱାୟାରିଂ ନୁହେଁ (ପ୍ୟାଟର୍ନ #10334/#10419)। ସିବ୍ଲିଙ୍ଗ୍
  କ୍ୱେରୀ ସେହି ସମାନ ଆଲାଉଲିଷ୍ଟକୁ SQL ଲିଟେରାଲ୍ ଭାବେ ପୁନରାବୃତ୍ତି କରିବା ପରିବର୍ତ୍ତେ ବାଇଣ୍ଡ କରେ,
  ତେଣୁ ଏହାକୁ ବିସ୍ତାର କରିବା ଏକ-ଲାଇନ୍ ପରିବର୍ତ୍ତନ ହୋଇ ରହେ।
- **Egress IP ରୋଟେସନ୍, ଉଭୟ ଦିଗରେ**: ଲୁକ୍ଅପ୍ ୱିଣ୍ଡୋ (24h), egress-IP କ୍ୟାଶ୍ TTL
  (5 min) ଠାରୁ ବହୁତ ବିସ୍ତୃତ, ତେଣୁ "ଶେଷ ଜଣାଶୁଣା IP" ବର୍ତ୍ତମାନର ଅବସ୍ଥା ନୁହେଁ, ଏହା ଇତିହାସ।
  ଯଦି ୱିଣ୍ଡୋ ମଧ୍ୟରେ ଏକ ସଂଯୋଗର ପ୍ରକ୍ସି ରୋଟେଟ୍ ହୋଇଥାଏ, ତେବେ ଲକ୍ଟି ଏକ ବାସ୍ତବରେ
  ସେୟାର୍ ହୋଇଥିବା IPକୁ **ମିସ୍** କରିପାରେ (ରେକର୍ଡ ହୋଇଥିବା IPଟି ହେଉଛି ନୂଆ,
  ନିଃଶେଷିତ ହୋଇନଥିବା IP) — ଏବଂ ସମମିତ ଭାବେ ଏହା ନିଃଶେଷିତ IPରୁ ପରବର୍ତ୍ତୀ ସମୟରେ
  ରୋଟେଟ୍ ହୋଇ ଦୂରେଇଯାଇଥିବା **ଏକ ସିବ୍ଲିଙ୍ଗ୍କୁ କୁଲ୍ କରିପାରେ**। ଦ୍ୱିତୀୟ ଘଟଣାରେ ସେହି ସିବ୍ଲିଙ୍ଗ୍କୁ
  ଗୋଟିଏ କୁଲ୍ଡାଉନ୍ ୱିଣ୍ଡୋର ମୂଲ୍ୟ ଦେବାକୁ ପଡ଼େ; ଉଭୟକୁ ଇତିହାସ-ଭିତ୍ତିକ ଲୁକ୍ଅପ୍ର
  ଗ୍ରହଣୀୟ ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ ସୀମା ଭାବେ ଗ୍ରହଣ କରାଯାଇଛି।
- **ଖର୍ଚ୍ଚ**: `proxy_logs`ର ଦୁଇଟି ସୀମିତ ସ୍କାନ୍ (`idx_pl_timestamp` ମାଧ୍ୟମରେ
  ୱିଣ୍ଡୋ-ଫିଲ୍ଟର୍ କରାଯାଇଛି), କେବଳ 429 ଫ୍ରିକ୍ୱେନ୍ସିରେ। କୌଣସି ନୂଆ ଇଣ୍ଡେକ୍ସ ନାହିଁ (ମାଇଗ୍ରେସନ୍ 134
  YAGNI)। ମଧ୍ୟମ ଆକାରର ଏକ ବାସ୍ତବ-ଟ୍ରାଫିକ୍ DB କପିରେ ମାପ କରାଯାଇଛି; ଏକ
  ଉଚ୍ଚ-ଥ୍ରୁପୁଟ୍ ଇନ୍ଷ୍ଟାନ୍ସ ସେହି ୱିଣ୍ଡୋରେ ଆନୁପାତିକ ଭାବେ ଅଧିକ ରୋ ଧାରଣ କରେ।

---

## ଅନ୍ୟାନ୍ୟ Resilience ବୈଶିଷ୍ଟ୍ୟ

- **20ଟି routing strategy** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ଦେଖନ୍ତୁ।
- **Reset-aware routing** (v3.8.0) — quota reset ସମୟ ଅନୁସାରେ connectionଗୁଡ଼ିକୁ ପ୍ରାଥମିକତା ଦିଏ।
- **Background mode degradation** — `background: true` ଥିବା Responses APIକୁ warning ସହିତ sync modeକୁ ପରିବର୍ତ୍ତନ କରେ।
- **Dynamic tool limit detection** — tool count limit ପହଞ୍ଚିଲେ providerଗୁଡ଼ିକୁ back off କରେ।
- **Emergency fallback** — `OMNIROUTE_EMERGENCY_FALLBACK` ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ; restart ବିନା operatorsମାନେ Feature Flags pageରୁ ଏହାକୁ override କରିପାରିବେ।

---

## Debugging

- Weighted combo `503 all_targets_cooling_down` ଉତ୍ତର ଦିଏ (`Retry-After` ସେଟ୍ ହୋଇଥାଏ, `diagnostics.excluded`ରେ `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ସହିତ ପ୍ରତ୍ୟେକ target ତାଲିକାଭୁକ୍ତ ହୋଇଥାଏ) → poolଟି configured ଏବଂ connected ଅଛି, କିନ୍ତୁ resilience timer ଯୋଗୁଁ ପ୍ରତ୍ୟେକ targetକୁ କେବଳ exclude କରାଯାଇଛି; `[COMBO] Weighted selection: every target excluded before dispatch — …` warningରେ କାରଣଗୁଡ଼ିକ ଏବଂ ଅବଶିଷ୍ଟ seconds ଦିଆଯାଇଥାଏ। ସେହି comboରୁ ଆସୁଥିବା `404 no_executable_targets`ର ଅର୍ଥ ହେଉଛି କୌଣସି resilience timer ସମ୍ପୃକ୍ତ ନଥିଲା (ଚଳାଇବା ପାଇଁ କିଛି ନଥିଲା, କିମ୍ବା ପ୍ରତ୍ୟେକ account availability probeରେ ବିଫଳ ହୋଇଥିଲା)। `targetResolution.ts`ରୁ ସଂଗ୍ରହ କରାଯାଇଥିବା exclusions ଆଧାରରେ `open-sse/services/combo/pinRecovery.ts`ରେ ଏହା ନିର୍ମିତ ହୋଇଛି।
- କୌଣସି provider ପାଇଁ ସମସ୍ତ key skip ହୋଇଗଲେ → circuit breaker state ଏବଂ ପ୍ରତ୍ୟେକ connectionର `rateLimitedUntil`/`testStatus` ଉଭୟ ଯାଞ୍ଚ କରନ୍ତୁ।
- reset window ପରେ provider ସ୍ଥାୟୀ ଭାବେ excluded ହେଲେ → `getStatus()`/`canExecute()` ପରିବର୍ତ୍ତେ raw `state` ପଢ଼ୁଥିବା code ଯାଞ୍ଚ କରନ୍ତୁ।
- ଗୋଟିଏ key ବିଫଳ ହେଲେ, ଅନ୍ୟଗୁଡ଼ିକ କାମ କରିବା ଉଚିତ → circuit breaker ଠାରୁ connection cooldownକୁ ଅଗ୍ରାଧିକାର ଦିଅନ୍ତୁ।
- କେବଳ ଗୋଟିଏ model ବିଫଳ ହେଲେ → connection cooldown ଠାରୁ model lockoutକୁ ଅଗ୍ରାଧିକାର ଦିଅନ୍ତୁ।
- state ସ୍ୱୟଂ ପୁନରୁଦ୍ଧାର ହେବା ଉଚିତ କିନ୍ତୁ ହେଉନାହିଁ → future timestamp ସହିତ expired stateକୁ refresh କରୁଥିବା read path ଯାଞ୍ଚ କରନ୍ତୁ। Permanent statuses ପାଇଁ manual changes ଆବଶ୍ୟକ।

---

## Runtime state — agent quick reference

> `AGENTS.md` → "Resilience Runtime State" (PR #12743) ରୁ ଅବିକଳ ଭାବେ ନିଆଯାଇଛି, ଯାହାଦ୍ୱାରା agent
> guideଟି 40k context budget ମଧ୍ୟରେ ରହିପାରିବ। ଏହା ଉପରୋକ୍ତ
> sectionsଗୁଡ଼ିକର ସଂକ୍ଷିପ୍ତ, agent-facing ଦୃଷ୍ଟିକୋଣ; numbered sectionsଗୁଡ଼ିକ ସମ୍ପୂର୍ଣ୍ଣ reference ଭାବେ ରହିଛି।

OmniRouteରେ ତିନୋଟି ସମ୍ପର୍କିତ କିନ୍ତୁ ପୃଥକ temporary-failure mechanism ଅଛି। Routing behavior debug କରିବାବେଳେ ସେମାନଙ୍କର
scopeକୁ ପୃଥକ ରଖନ୍ତୁ। ଏକ ନଜରରେ ମାନଚିତ୍ର ପାଇଁ
[3-layer resilience diagram](../diagrams/exported/resilience-3layers.svg)
(source: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
ଦେଖନ୍ତୁ।

### Provider Circuit Breaker

**Scope**: ସମ୍ପୂର୍ଣ୍ଣ provider, ଯଥା `glm`, `openai`, `anthropic`।

**Purpose**: upstream/service levelରେ ବାରମ୍ବାର ବିଫଳ ହେଉଥିବା providerକୁ traffic ପଠାଇବା ବନ୍ଦ କରିବା, ଯାହାଦ୍ୱାରା ଗୋଟିଏ unhealthy provider ପ୍ରତ୍ୟେକ requestକୁ ଧୀର କରିନପାରେ।

**Implementation**:

- Core class: `src/shared/utils/circuitBreaker.ts`
- Chat gate/execution wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Shared wrappers: `open-sse/services/accountFallback.ts`
- Persisted state table: `domain_circuit_breakers`

**States** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ସାଧାରଣ traffic ଅନୁମୋଦିତ।
- `DEGRADED`: early-warning band — failures degradation threshold ଅତିକ୍ରମ କରିଛି କିନ୍ତୁ breaker threshold ଏପର୍ଯ୍ୟନ୍ତ ନୁହେଁ; traffic ଚାଲୁ ରହେ, dashboards warning ଦେଖାଏ। ଏକ valid connection test କିମ୍ବା କୌଣସି ନୂଆ failure ବିନା ଏକ quiet window ଏହାକୁ `CLOSED`କୁ ଫେରାଇଦିଏ
  (`docs/architecture/RESILIENCE_GUIDE.md`ରେ window ଦିଆଯାଇଛି)।
- `OPEN`: provider ସାମୟିକ ଭାବେ blocked; callers ଏକ provider-circuit-open response ପାଆନ୍ତି କିମ୍ବା combo routing ଅନ୍ୟ targetକୁ skip କରେ।
- `HALF_OPEN`: reset timeout ଶେଷ ହୋଇଛି; ଏକ probe requestକୁ ଅନୁମତି ଦିଏ। ସଫଳତା breakerକୁ close କରେ, ବିଫଳତା ଏହାକୁ ପୁଣି open କରେ।

**Defaults** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts`ରେ `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` ମାଧ୍ୟମରେ ବ୍ୟବହୃତ → `src/sse/handlers/chatHelpers.ts`ରେ `getCircuitBreaker(provider, …)`)। ସମ୍ପୂର୍ଣ୍ଣ-provider breaker `circuitBreakerThreshold` / `circuitBreakerReset` ଉପରେ ଚାଲେ:

| Profile | degrades at | opens at (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ----------: | -----------------------------------: | ----------------------------: |
| OAuth   |         `5` |                                  `8` |                         `60s` |
| API key |         `7` |                                 `12` |                         `30s` |
| Local   |   (derived) |                                  `2` |                         `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) ଏବଂ `providerCooldownMs` (5/10/1 min) ମଧ୍ୟ ନିର୍ଦ୍ଧାରଣ କରେ: ଏଗୁଡ଼ିକ
**opt-in global Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`, default
off)ର **window gate**କୁ ଚାଳନା କରେ — `open-sse/services/providerCooldownTracker.ts`ର provider-level entry କେବଳ ସେତେବେଳେ cooling ଭାବେ ଗଣନା ହୁଏ ଯେତେବେଳେ `providerFailureWindowMs` ମଧ୍ୟରେ `providerFailureThreshold` failures ହୁଏ, ଏବଂ ତାପରେ `providerCooldownMs` ପର୍ଯ୍ୟନ୍ତ cool ହୁଏ। ଏଗୁଡ଼ିକ live breakerର thresholds ନୁହେଁ — breaker behavior ଆଶା କରି ଏଗୁଡ଼ିକୁ tune କରନ୍ତୁ ନାହିଁ। ପ୍ରତ୍ୟେକ default `OMNIROUTE_PROVIDER_BREAKER_*` ଏବଂ `OMNIROUTE_CIRCUIT_BREAKER_*` env vars ମାଧ୍ୟମରେ override କରାଯାଇପାରେ; runtime-accurate reference table `docs/architecture/RESILIENCE_GUIDE.md`ରେ ରହିଛି।

କେବଳ provider-level failure statuses ହିଁ provider breakerକୁ trip କରିବା ଉଚିତ:

```ts
(408, 500, 502, 503, 504);
```

ସାଧାରଣ account/key/model errors, ଯଥା ଅଧିକାଂଶ
`401`, `403`, କିମ୍ବା `429` cases ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ-provider breakerକୁ trip କରନ୍ତୁ ନାହିଁ। ସେଗୁଡ଼ିକ ସାଧାରଣତଃ
connection cooldown କିମ୍ବା model lockoutର ଅଂଶ ହୋଇଥାଏ। ଏକ generic API-key provider `403` recoverable ହେବା ଉଚିତ, ଯେପର୍ଯ୍ୟନ୍ତ ଏହା terminal provider/account error ଭାବେ classified ହୋଇନଥାଏ।

ବ୍ରେକର୍ ଲେଜି ରିକଭରି (lazy recovery) ବ୍ୟବହାର କରେ, ବ୍ୟାକଗ୍ରାଉଣ୍ଡ ଟାଇମର ନୁହେଁ। ଯେତେବେଳେ `OPEN` ସମାପ୍ତ ହୁଏ, `getStatus()`, `canExecute()`, ଏବଂ `getRetryAfterMs()` ଭଳି ରିଡ୍ଗୁଡ଼ିକ ସ୍ଥିତିକୁ `HALF_OPEN`କୁ ରିଫ୍ରେସ୍ କରନ୍ତି, ଯାହା ଫଳରେ ଡ୍ୟାସବୋର୍ଡ ଏବଂ କମ୍ବୋ କ୍ୟାଣ୍ଡିଡେଟ୍ ବିଲ୍ଡରମାନେ ସମାପ୍ତ ହୋଇଥିବା ପ୍ରୋଭାଇଡରକୁ ଚିରଦିନ ବାଦ୍ ଦେଇ ରହନ୍ତି ନାହିଁ।

### କନେକସନ୍ କୁଲଡାଉନ୍

**ପରିସର**: ଗୋଟିଏ ପ୍ରୋଭାଇଡର କନେକସନ୍/ଆକାଉଣ୍ଟ/କି।

**ଉଦ୍ଦେଶ୍ୟ**: ସମାନ ପ୍ରୋଭାଇଡରର ଅନ୍ୟ କନେକସନଗୁଡ଼ିକୁ ଅନୁରୋଧଗୁଡ଼ିକୁ ସେବା ଦେବା ଜାରି ରଖିବାକୁ ଅନୁମତି ଦେଇ ଗୋଟିଏ ଖରାପ କି/ଆକାଉଣ୍ଟକୁ ଅସ୍ଥାୟୀ ଭାବେ ଏଡ଼ାଇ ଦେବା।

**କାର୍ଯ୍ୟକାରିତା**:

- ଲେଖା/ଅଦ୍ୟତନ ପଥ: `src/sse/services/auth.ts::markAccountUnavailable()`
- ଆକାଉଣ୍ଟ ଚୟନ/ଫିଲ୍ଟରିଂ: `src/sse/services/auth.ts::getProviderCredentials...`
- କୁଲଡାଉନ୍ ଗଣନା: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ସେଟିଂସ୍: `src/lib/resilience/settings.ts`

ପ୍ରୋଭାଇଡର କନେକସନଗୁଡ଼ିକରେ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଫିଲ୍ଡଗୁଡ଼ିକ:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ଆକାଉଣ୍ଟ ଚୟନ ସମୟରେ, ଗୋଟିଏ କନେକସନ୍ ଏଡ଼ାଯାଏ ଯେତେବେଳେ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

କୁଲଡାଉନଗୁଡ଼ିକ ମଧ୍ୟ ଲେଜି ଅଟେ: ଯେତେବେଳେ `rateLimitedUntil` ଅତୀତରେ ରହେ, କନେକସନ୍ ପୁଣି ଯୋଗ୍ୟ ହୋଇଯାଏ। ସଫଳ ବ୍ୟବହାର ପରେ, `clearAccountError()` `testStatus`, `rateLimitedUntil`, ଏରର୍ ଫିଲ୍ଡଗୁଡ଼ିକୁ ଏବଂ `backoffLevel`କୁ ଖାଲି କରେ।

ଡିଫଲ୍ଟ କନେକସନ୍ କୁଲଡାଉନ୍ ଆଚରଣ:

- OAuth ବେସ୍ କୁଲଡାଉନ୍: `5s`।
- API-key ବେସ୍ କୁଲଡାଉନ୍: `3s`।
- API-key `429` ଉପଲବ୍ଧ ଥିବାବେଳେ ଅପଷ୍ଟ୍ରିମ୍ ରିଟ୍ରାଏ ସୂଚନାଗୁଡ଼ିକୁ (`Retry-After`, ରିସେଟ୍ ହେଡର, କିମ୍ବା ପାର୍ସ ଯୋଗ୍ୟ ରିସେଟ୍ ଟେକ୍ସଟ) ପ୍ରାଥମିକତା ଦେବା ଉଚିତ।
- ବାରମ୍ବାର ପୁନରୁଦ୍ଧାର ଯୋଗ୍ୟ ବିଫଳତାଗୁଡ଼ିକ ଏକ୍ସପୋନେନସିଆଲ୍ ବ୍ୟାକଅଫ୍ ବ୍ୟବହାର କରନ୍ତି:

```ts
baseCooldownMs * 2 ** failureIndex;
```

ଆଣ୍ଟି-ଥଣ୍ଡରିଂ-ହାର୍ଡ ଗାର୍ଡ ସମାନ କନେକସନରେ ଏକାକାଳୀନ ବିଫଳତାଗୁଡ଼ିକୁ ବାରମ୍ବାର କୁଲଡାଉନ୍ ବଢ଼ାଇବାରୁ କିମ୍ବା `backoffLevel`କୁ ଦୁଇଥର ବୃଦ୍ଧି କରିବାରୁ ରୋକେ।

ଟର୍ମିନାଲ୍ ସ୍ଥିତିଗୁଡ଼ିକ କୁଲଡାଉନ୍ ନୁହଁନ୍ତି। `banned`, `expired` (ଯାହା `EXPIRED_RETRY_MAX` ମାଧ୍ୟମରେ N ସୀମିତ ପୁନଃପ୍ରୟାସ ପରେ ହିଁ ଟର୍ମିନାଲ୍ ହୁଏ), ଏବଂ `credits_exhausted` କ୍ରେଡେନସିଆଲ/ସେଟିଂସ୍ ପରିବର୍ତ୍ତନ ନ ହେବା ପର୍ଯ୍ୟନ୍ତ କିମ୍ବା ଜଣେ ଅପରେଟର ସେଗୁଡ଼ିକୁ ରିସେଟ୍ ନ କରିବା ପର୍ଯ୍ୟନ୍ତ ଅନୁପଲବ୍ଧ ରହିବା ଉଦ୍ଦିଷ୍ଟ। ଟର୍ମିନାଲ୍ ସ୍ଥିତିଗୁଡ଼ିକୁ କ୍ଷଣସ୍ଥାୟୀ କୁଲଡାଉନ୍ ସ୍ଥିତି ସହିତ ଓଭରରାଇଟ୍ କରନ୍ତୁ ନାହିଁ।

### ମଡେଲ୍ ଲକଆଉଟ୍

**ପରିସର**: ପ୍ରୋଭାଇଡର + କନେକସନ୍ + ମଡେଲ୍।

**ଉଦ୍ଦେଶ୍ୟ**: ଯେତେବେଳେ ସେହି କନେକସନ୍ ପାଇଁ କେବଳ ଗୋଟିଏ ମଡେଲ୍ ଅନୁପଲବ୍ଧ କିମ୍ବା କୋଟା-ସୀମିତ ଥାଏ, ସେତେବେଳେ ସମଗ୍ର କନେକସନକୁ ଅକ୍ଷମ କରିବା ଏଡ଼ାଇବା।

ଉଦାହରଣଗୁଡ଼ିକ:

- ପ୍ରତି-ମଡେଲ୍ କୋଟା ପ୍ରୋଭାଇଡରମାନେ `429` ଫେରାଉଥିବା।
- ଗୋଟିଏ ହଜିଯାଇଥିବା ମଡେଲ୍ ପାଇଁ `404` ଫେରାଉଥିବା ସ୍ଥାନୀୟ ପ୍ରୋଭାଇଡର।
- ଚୟନିତ Grok ମୋଡ୍ଗୁଡ଼ିକ ଭଳି ପ୍ରୋଭାଇଡର-ନିର୍ଦ୍ଦିଷ୍ଟ ମୋଡ୍/ମଡେଲ୍ ଅନୁମତି ବିଫଳତାଗୁଡ଼ିକ।

ମଡେଲ୍ ଲକଆଉଟ୍ `open-sse/services/accountFallback.ts`ରେ ରହେ ଏବଂ ସମାନ କନେକସନକୁ ଅନ୍ୟ ମଡେଲଗୁଡ଼ିକୁ ସେବା ଦେବା ଜାରି ରଖିବାକୁ ଦେଏ।

### ଡିବଗିଂ ନିର୍ଦ୍ଦେଶନା

- ଯଦି ଏକ ପ୍ରୋଭାଇଡର ପାଇଁ ସମସ୍ତ କି ଏଡ଼ାଯାଏ, ପ୍ରୋଭାଇଡର ବ୍ରେକର୍ ସ୍ଥିତି ଏବଂ ପ୍ରତ୍ୟେକ କନେକସନର `rateLimitedUntil`/`testStatus` ଉଭୟକୁ ଯାଞ୍ଚ କରନ୍ତୁ।
- ଯଦି ରିସେଟ୍ ୱିଣ୍ଡୋ ପରେ ପ୍ରୋଭାଇଡର ସ୍ଥାୟୀ ଭାବେ ବାଦ୍ ପଡ଼ିଥିବା ଜଣାଯାଏ, କୋଡ୍ `getStatus()`/`canExecute()` ବ୍ୟବହାର କରିବା ପରିବର୍ତ୍ତେ କଞ୍ଚା `state` ପଢ଼ୁଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ।
- ଯଦି ଗୋଟିଏ ପ୍ରୋଭାଇଡର କି ବିଫଳ ହୁଏ କିନ୍ତୁ ଅନ୍ୟମାନେ କାମ କରିବା ଉଚିତ, ତେବେ ପ୍ରୋଭାଇଡର ବ୍ରେକର୍ ପରିବର୍ତ୍ତେ କନେକସନ୍ କୁଲଡାଉନ୍କୁ ପ୍ରାଥମିକତା ଦିଅନ୍ତୁ।
- ଯଦି କେବଳ ଗୋଟିଏ ମଡେଲ୍ ବିଫଳ ହୁଏ, ତେବେ କନେକସନ୍ କୁଲଡାଉନ୍ ପରିବର୍ତ୍ତେ ମଡେଲ୍ ଲକଆଉଟ୍କୁ ପ୍ରାଥମିକତା ଦିଅନ୍ତୁ।
- ଯଦି ଏକ ସ୍ଥିତି ସ୍ୱୟଂ-ପୁନରୁଦ୍ଧାର ହେବା ଉଚିତ, ତେବେ ଏହାର ଏକ ଭବିଷ୍ୟତ ଟାଇମଷ୍ଟାମ୍ପ/ରିସେଟ୍ ଟାଇମଆଉଟ୍ ଏବଂ ଏକ ରିଡ୍ ପାଥ୍ ଥିବା ଉଚିତ ଯାହା ସମାପ୍ତ ସ୍ଥିତିକୁ ରିଫ୍ରେସ୍ କରେ। ସ୍ଥାୟୀ ସ୍ଥିତିଗୁଡ଼ିକ ମାନୁଆଲ୍ କ୍ରେଡେନସିଆଲ କିମ୍ବା କନଫିଗ୍ ପରିବର୍ତ୍ତନ ଆବଶ୍ୟକ କରନ୍ତି।

---

## TLS ଫିଙ୍ଗରପ୍ରିଣ୍ଟିଂ ଏବଂ ଷ୍ଟେଲ୍ଥ

ପ୍ରୋଭାଇଡର-ନିର୍ଦ୍ଦିଷ୍ଟ ଷ୍ଟେଲ୍ଥ (JA3/JA4, CCH, ଅବଫସ୍କେସନ୍) ପୃଥକ ଭାବେ ଡକ୍ୟୁମେଣ୍ଟ କରାଯାଇଛି — `docs/security/STEALTH_GUIDE.md` ଦେଖନ୍ତୁ (git; `/docs` ଭିତରକୁ କମ୍ପାଇଲ ହୋଇନାହିଁ)।

---

## ରେଜିଲିଏନ୍ସ ଟେଷ୍ଟିଂ (Phase 8 · Block C)

ରେଜିଲିଏନ୍ସ ଲଜିକ୍ ପାଇଁ ୟୁନିଟ୍ ଟେଷ୍ଟଗୁଡ଼ିକ ବ୍ୟତୀତ, ତିନୋଟି ଟେଷ୍ଟ ପ୍ରକୃତ ଷ୍ଟ୍ରେସ/ବିଫଳତା ପରିସ୍ଥିତି ଅଧୀନରେ ରନ୍ଟାଇମ୍କୁ ପରୀକ୍ଷା କରେ (ସମସ୍ତ integration/nightly — କୌଣସିଟି PR ଅଟକାଏ ନାହିଁ):

| ଟେଷ୍ଟ       | କଣ କରେ                                                                                                                                                                                              | ଚଲାଇବା                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | ନକଲି-ଅପଷ୍ଟ୍ରିମ୍ ନୋଡ୍ ପ୍ରକୃତ latency/reset/timeout/503 ଇଞ୍ଜେକ୍ଟ କରେ; ସର୍କିଟ ବ୍ରେକର ଖୋଲେ/ପୁନରୁଦ୍ଧାର ହୁଏ ଏବଂ `checkFallbackError` 503 କୁ ପୁନରୁଦ୍ଧାରଯୋଗ୍ୟ fallback ଭାବେ ଶ୍ରେଣୀଭୁକ୍ତ କରେ ବୋଲି ଯାଞ୍ଚ କରେ। | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` ଅଧୀନରେ ପ୍ରତି `createSSEStream` ପାଇଁ ~500 ଷ୍ଟ୍ରିମ୍; heap ସୀମା ଅତିକ୍ରମ କଲେ ବିଫଳ ହୁଏ (OOM guard #3069)।                                                                                  | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` ବିରୁଦ୍ଧରେ ନିରନ୍ତର ଲୋଡ୍; p95/error ଥ୍ରେସହୋଲ୍ଡ।                                                                                                                              | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) ଦ୍ୱାରା ପରିଚାଳିତ। ଡିଫଲ୍ଟ `test:integration` ରେ, chaos ଏବଂ heap ସ୍ୱୟଂ-ସ୍କିପ୍ ହୁଏ (`RUN_CHAOS_INT`/`--expose-gc` ବିନା)।

---

## ଆହୁରି ଦେଖନ୍ତୁ

- [ଆର୍କିଟେକ୍ଚର ଗାଇଡ୍](./ARCHITECTURE.md) — ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର ଏବଂ ଆଭ୍ୟନ୍ତରୀଣ ବିଷୟବସ୍ତୁ
- [ବ୍ୟବହାରକାରୀ ଗାଇଡ୍](../guides/USER_GUIDE.md) — ପ୍ରୋଭାଇଡର, କମ୍ବୋ, CLI ଇଣ୍ଟିଗ୍ରେସନ୍
- [ଅଟୋ-କମ୍ବୋ ଇଞ୍ଜିନ୍](../routing/AUTO-COMBO.md) — 16-ଫ୍ୟାକ୍ଟର ସ୍କୋରିଂ, ମୋଡ୍ ପ୍ୟାକ୍
