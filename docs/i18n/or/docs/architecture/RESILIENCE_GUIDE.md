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

## 2। ସଂଯୋଗ କୁଲଡାଉନ୍।

**ପରିସର:** ଏକକ ପ୍ରଦାନକାରୀ connection/account/key.

**ଉଦ୍ଦେଶ୍ୟ:** ସମାନ ପ୍ରଦାନକାରୀ ପାଇଁ ଅନ୍ୟ ସଂଯୋଗଗୁଡ଼ିକ ସେବା ଜାରି ରଖିବାବେଳେ ଗୋଟିଏ ଖରାପ ଚାବିକୁ ଏଡ଼ାଇଦିଅ।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ମାର୍କ ଉପଲବ୍ଧ ନାହିଁ: `src/sse/services/auth.ts::markAccountUnavailable()`
- ଚୟନ: ସମାନ ଫାଇଲରେ `getProviderCredentials*`
- କୁଲଡାଉନ୍ କାଲ୍କ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ସେଟିଂସମୂହ: `src/lib/resilience/settings.ts`

**ସଂଯୋଗ ପ୍ରତି କ୍ଷେତ୍ରଗୁଡିକ:**

- କୁଲଡାଉନ୍ ସମାପ୍ତ ନହେବା ପର୍ଯ୍ୟନ୍ତ `rateLimitedUntil` — ଟାଇମଷ୍ଟ୍ୟାମ୍ପ।
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ଏକ୍ସପୋନ୍ସନାଲ ବ୍ୟାକଅଫ୍ କାଉଣ୍ଟର।

**ଡିଫଲ୍ଟ କୁଲଡାଉନ୍:**

- OAuth ଆଧାର: 5s
- API- କି ଆଧାର: 3s
- API- କି 429: ଅପଷ୍ଟ୍ରିମ `Retry-After`/ headers/parseable ପୁନ res ସେଟ୍ ପାଠ୍ୟକୁ ପସନ୍ଦ କରେ।
- ବ୍ୟାକଅଫ୍: `baseCooldownMs * 2 ** failureIndex`

**ପ୍ରତି-ପ୍ରଦାନକାରୀ ବିଳମ୍ବ ପୁନ ry ଚେଷ୍ଟା କରନ୍ତୁ।** ପ୍ରଦାନକାରୀ ସବିଶେଷ ପୃଷ୍ଠାରେ a** ବିଳମ୍ବ ଚେଷ୍ଟା କରନ୍ତୁ।** ଚୟନ କରନ୍ତୁ (ଅଟୋ, 1s ପର୍ଯ୍ୟନ୍ତ 15s)। ଏହା `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1-21600, `PATCH /api/resilience` ମାଧ୍ୟମରେ) ସଞ୍ଚୟ କରେ। ଯେତେବେଳେ ଏକ ରେଟ୍-ସୀମା ତ୍ରୁଟି କ up ଣସି ଅପଷ୍ଟ୍ରିମ୍ ପୁନ ry ଚେଷ୍ଟା କରେ ନାହିଁ, ସେହି ମୂଲ୍ୟ ପ୍ରଦାନକାରୀଙ୍କ ପାଇଁ ମାପାଯାଇଥିବା ବ୍ୟାକଅଫ୍ କୁ ବଦଳାଇଥାଏ ଏବଂ `backoffLevel` କୁ 0 (`open-sse/services/rotationConfig.ts::overrideFor`) କୁ ପୁନ ets ସେଟ୍ କରେ। ଏକ ହାର-ସୀମିତ ତ୍ରୁଟି ପାଇଁ ପ୍ରାଧାନ୍ୟତା, ସର୍ବୋଚ୍ଚ: ଅପଷ୍ଟ୍ରିମ୍ ପୁନ ry ଚେଷ୍ଟା, ତାପରେ ପ୍ରତି-ସଂଯୋଗ `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, ତାପରେ ପ୍ରତି-ପ୍ରଦାନକାରୀ ପୁନର୍ବାର ବିଳମ୍ବ, ତାପରେ env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, ତାପରେ ମାପାଯାଇଥିବା ବ୍ୟାକଅଫ୍। ଅଟୋ ଫିଲ୍ଡ ଅପସାରଣ କରେ। ଏହା କେବଳ ହାର-ସୀମା କାରଣ ଉପରେ ପ୍ରଭାବ ପକାଇଥାଏ, ଟର୍ମିନାଲ୍ କଦାପି ନୁହେଁ।

**ଘଡ଼ଘଡ଼ି ବିରୋଧୀ ଗୋରୁ ରାକ୍ଷୀ:** ଅତ୍ୟଧିକ ବିସ୍ତାରିତ କୁଲଡାଉନ୍ କିମ୍ବା ଡବଲ୍-ବର୍ଦ୍ଧିତ `backoffLevel` ରୁ ଏକକାଳୀନ ବିଫଳତାକୁ ପ୍ରତିରୋଧ କରେ।

**ସମନ୍ୱୟ-ସୀମା 429s ବ୍ୟାକଅଫ୍ ସିଡ଼ି ଚ imb ନ୍ତି ନାହିଁ।** ଏକ `429` ଯାହାର ଶରୀର ଏକ ସମନ୍ୱୟ ସୀମା ରିପୋର୍ଟ କରେ ("ଅତ୍ୟଧିକ ସମକକ୍ଷ ଅନୁରୋଧ", "ସମନ୍ୱୟ ସୀମା", "ସମାନ୍ତରାଳ ଅନୁରୋଧ ସୀମା", GLM `并发数过高`) ଅର୍ଥ ହେଉଛି ଖାତା ସୁସ୍ଥ କିନ୍ତୁ ବ୍ୟସ୍ତ। `checkFallbackError()` ରିଟର୍ନ କାରଣ `concurrency_limited`: ବର୍ତ୍ତମାନ ପରବର୍ତ୍ତୀ ସଂଯୋଗକୁ ବିଫଳ କର, ଏହାକୁ ଏକ ସ୍ଥିର `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) କିମ୍ବା ଅପଷ୍ଟ୍ରିମ ପୁନ ry ଚେଷ୍ଟା ପାଇଁ ଥଣ୍ଡା କର, `backoffLevel` ଅପରିବର୍ତ୍ତିତ ରଖ, ଏବଂ `skipProviderBreaker` ସେଟ୍ କର। ଏକ ସ୍ପଷ୍ଟ କୋଟା ଶରୀର ତଥାପି ଜିତେ, ତେଣୁ ଏକ ଶରୀର ଯାହା କୋଟା ପ୍ୟାଟର୍ ସହିତ ମେଳ ହୁଏ, ଏକ କୋଟା ରାୟରେ ରହିଥାଏ। ଚିହ୍ନଟ: `looksLikeConcurrencyLimit()` ରେ `src/shared/utils/classify429.ts`; ନିଷ୍ପତ୍ତି: `open-sse/services/accountFallback/concurrencyLimit429.ts` `classify429()` (ବ୍ରେକରର `FailureKind`) ଅପରିବର୍ତ୍ତିତ ଏବଂ ଏପର୍ଯ୍ୟନ୍ତ ଏହି ଶରୀରଗୁଡ଼ିକ ପାଇଁ `rate_limit` ପ read େ।

**ଷ୍ଟ୍ରିମ୍ କଣ୍ଟେଣ୍ଟ୍ ଷ୍ଟଲ୍ ଖାତାକୁ ଥଣ୍ଡା କରେ ନାହିଁ।** ଯେତେବେଳେ କଣ୍ଟେଣ୍ଟ୍-ଷ୍ଟଲ୍ ୱାଚଡଗ୍ (`open-sse/utils/streamHandler.ts`) ଏକ ଷ୍ଟ୍ରିମ୍ ଛାଡିଦିଏ ଯାହା କ model ଣସି ମଡେଲ୍ ଆଉଟପୁଟ୍ ପଠାଇ ନଥାଏ, `markAccountUnavailable()` ସଂଯୋଗରେ ତ୍ରୁଟି ରେକର୍ଡ କରେ କିନ୍ତୁ କ co ଣସି କୁଲଡାଉନ୍ ସେଟ୍ କରେ ନାହିଁ: ଷ୍ଟଲ୍ ସେହି ଅନୁରୋଧର ଅଟେ, ପ୍ରାୟତ yet ଏପର୍ଯ୍ୟନ୍ତ କ output ଣସି ଆଉଟପୁଟ୍ ସହିତ ଏକ ଲମ୍ବା ଯୁକ୍ତିଯୁକ୍ତ ଟର୍ନ୍। ଅପରେଟର୍ସ `resilienceSettings.streamStallCooldown.enabled` (ଡିଫଲ୍ଟ `false`) ସହିତ ପୁନ opt ଚୟନ କରିପାରିବେ।

**`p2c` ଖାତା ଚୟନ ପାଇଁ ଅପ୍ଟ-ଇନ୍ ବିଳମ୍ବତା ସଙ୍କେତ।** ପ୍ରତ୍ୟେକ ପ୍ରେରିତ ପ୍ରୟାସ ଏହାର ସମୟ-ରୁ-ପ୍ରଥମ-ବାଇଟ୍ ଏବଂ ଏକ ସଂଯୋଗ (ଏବଂ ପ୍ରତି ସଂଯୋଗ + ମଡେଲ୍) କୁ ଏକ ଇନ-ମେମୋରୀ ରୋଲିଂ ୱିଣ୍ଡୋରେ ରେକର୍ଡ କରେ: ଶେଷ 20 ନମୁନା 15 ମିନିଟ୍ ମଧ୍ୟରେ (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` ରେ `safeLogEvents()` ରୁ ରେକର୍ଡ)। ଯେତେବେଳେ `resilienceSettings.p2cLatency.weight` `0` ଉପରେ ଥାଏ (ପରିସର 0-20, ଡିଫଲ୍ଟ `0` = ବନ୍ଦ), `src/sse/services/auth.ts` ରେ `compareP2CConnections()` ଏହି ଯୋଡିର ପ୍ରତ୍ୟେକ ପ୍ରାର୍ଥୀଙ୍କୁ `weight` ପଏଣ୍ଟ ପର୍ଯ୍ୟନ୍ତ ଯୋଗ କରିଥାଏ। ଏହାର ଅଧା ଦ୍ରୁତ ପ୍ରାର୍ଥୀଙ୍କ ଅନୁପାତ ଭାବରେ ବିଳମ୍ବରୁ ଆସିଥାଏ (ଦୁଇଗୁଣ ଧୀର ପୂର୍ଣ୍ଣ ଅଧା ନେଇଥାଏ) ଏବଂ ଅଧା ଗାଡ଼ି ତ୍ରୁଟି ହାରରୁ। ଏହି ଶବ୍ଦଟି କେବଳ ପ୍ରଯୁଜ୍ୟ ହେବ ଯେତେବେଳେ ଉଭୟ ପ୍ରାର୍ଥୀଙ୍କର ଅତି କମରେ 3 ଟି ନମୁନା ଥାଏ, ତେଣୁ ନୂତନ ଆକାଉଣ୍ଟଗୁଡିକ ଦଣ୍ଡିତ ହୁଏ ନାହିଁ, ଏବଂ ଏହାର ଛାତ କୋଟା-ଅବରୋଧିତ ଏବଂ କୋଟା-ନିଷ୍କାସିତ ଦଣ୍ଡ ତଳେ ରହିଥାଏ। ଏହା ନିଜସ୍ୱ କ circuit ଣସି ସର୍କିଟ ଯୋଗ କରେ ନାହିଁ: ବିଫଳ ଆକାଉଣ୍ଟଗୁଡିକ କୁଲଡାଉନ୍, ଲକଆଉଟ୍ ଏବଂ ବ୍ରେକର୍ ସ୍ତର ଦ୍ୱାରା ପରିଚାଳିତ। ଏହାକୁ `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ସହିତ ସେଟ୍ କରନ୍ତୁ।

**ଯୁକ୍ତିଯୁକ୍ତ ଫ୍ରେମ୍ଗୁଡ଼ିକ ବିଷୟବସ୍ତୁ-ଷ୍ଟଲ୍ ବଜେଟ୍ ପୁନ rest ଆରମ୍ଭ କରେ।** ଏକ ଯୁକ୍ତିଯୁକ୍ତ ମଡେଲ୍ ଏହାର ପ୍ରଥମ ଦୃଶ୍ୟମାନ ଟୋକେନ୍ ପୂର୍ବରୁ କିଛି ମିନିଟ୍ ପାଇଁ ଚିନ୍ତା କରିପାରିବ: Claude ଷ୍ଟ୍ରିମ୍ `thinking_delta` ଫ୍ରେମ୍ ଯାହାର ଚିନ୍ତାଧାରା ପାଠ୍ୟ ଖାଲି ହୋଇପାରେ, ଏବଂ ପ୍ରତିକ୍ରିୟା API ଗୋଟିଏ ପରେ ଗୋଟିଏ ଯୁକ୍ତିଯୁକ୍ତ ଆଇଟମ୍ ଷ୍ଟ୍ରିମ୍ କରେ। `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ଏହି ଫ୍ରେମ୍ଗୁଡ଼ିକୁ ଚିହ୍ନିଥାଏ, ଏବଂ ୱାଚଡଗ୍ ଟର୍ନ୍ ବାତିଲ୍ କରିବା ପରିବର୍ତ୍ତେ ପ୍ରତ୍ୟେକଙ୍କ ଉପରେ ଏହାର ବଜେଟ୍ ପୁନ rest ଆରମ୍ଭ କରେ। ସେଗୁଡ଼ିକ ଏପର୍ଯ୍ୟନ୍ତ ମଡେଲ ଆଉଟପୁଟ ନୁହଁନ୍ତି, ତେଣୁ ଏକ ଟର୍ନ ଯାହା କେବଳ ଯୁକ୍ତି ସହିତ ଶେଷ ହୁଏ ତଥାପି ଖାଲି ବୋଲି ଜଣାଯାଏ, ଏବଂ ଏକ ଟର୍ନ ଯାହା ଯୁକ୍ତି ବନ୍ଦ କରେ ଏବଂ କେବଳ ହୃଦସ୍ପନ୍ଦନ ପଠାଏ ତଥାପି ୱାଚଡଗକୁ ଭ୍ରମଣ କରେ।

ଏକ ଖାଲି ଦସ୍ତଖତ ସହିତ Kiro ର ବାଇନାରୀ `reasoningContentEvent` ଫ୍ରେମ୍ ଗୁଡିକ ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ `reasoning_content` ଡେଲଟା ଭାବରେ ଏକଜେକ୍ୟୁଟର ମାଧ୍ୟମରେ ଏହି ଯୁକ୍ତିଯୁକ୍ତ କାର୍ଯ୍ୟକଳାପକୁ ସଂରକ୍ଷଣ କରେ। ଦସ୍ତଖତ ଅଗ୍ରଗାମୀ ନୁହେଁ। ମେଟାଡାଟା, ଅସମ୍ପୂର୍ଣ୍ଣ ଫ୍ରେମ୍ ଏବଂ ଖାଲି ଦସ୍ତଖତ ବିଷୟବସ୍ତୁ ବଜେଟ୍ ପୁନ art ଆରମ୍ଭ କରେ ନାହିଁ; ସ୍ independent ାଧୀନ ସକ୍ରିୟ-ଷ୍ଟ୍ରିମ୍ ସମୟ ସମାପ୍ତ ଏବଂ କ୍ଲାଏଣ୍ଟ ବାତିଲ୍ ତଥାପି ପ୍ରୟୋଗ ହୁଏ (`open-sse/executors/kiro/reasoning.ts`)।

**ଟର୍ମିନାଲ୍ ରାଜ୍ୟଗୁଡିକ (NOT କୁଲଡାଉନ୍):**

- `banned` — ନିଷେଧ-କୀୱାର୍ଡ / ଆକାଉଣ୍ଟ-ବ୍ୟାନ ଚିହ୍ନଟ ଦ୍ୱାରା ସେଟ୍ ହୋଇଛି ( [BAN_DETECTION](../security/BAN_DETECTION.md) ଦେଖନ୍ତୁ)। ଅପଷ୍ଟ୍ରିମ ପ୍ରତି-ଅନୁରୋଧ ପ୍ରତ୍ୟାଖ୍ୟାନ (`request_rejected`, ଯଥା Anthropic OAuth 403 "ଅନୁରୋଧ ଅନୁମୋଦିତ ନୁହେଁ") ଏହାକୁ କେବେ ବି ସେଟ୍ କରେ ନାହିଁ: ସେଗୁଡିକ ପ୍ରତି ସଂଯୋଗ ଏବଂ ମଡେଲକୁ ଗଣନା କରାଯାଏ ଏବଂ `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 ଘଣ୍ଟା) ରେ ବ growing ୁଥିବା କୁଲଡାଉନ୍ ସହିତ ସେହି ମଡେଲକୁ ଘୂର୍ଣ୍ଣନରୁ ବାହାର କରିଦିଅ, କିମ୍ବା କ model ଣସି ମଡେଲ — `open-sse/services/requestRejectedStreak.ts` ଜଣା ନଥିଲେ ସଂଯୋଗକୁ ଥଣ୍ଡା କର।
- `expired` — `EXPIRED_RETRY_MAX = 3` — OAuth
- `credits_exhausted`

ପରିଚୟପତ୍ର ପରିବର୍ତ୍ତନ ନହେବା ପର୍ଯ୍ୟନ୍ତ କିମ୍ବା ଏକ ଅପରେଟର ସେମାନଙ୍କୁ ପୁନ res ସେଟ୍ ନକରିବା ପର୍ଯ୍ୟନ୍ତ ଏଗୁଡ଼ିକ ସ୍ଥିର ରହିଥାଏ। କ୍ଷଣସ୍ଥାୟୀ କୁଲଡାଉନ୍ ସ୍ଥିତି ସହିତ ଟର୍ମିନାଲ୍ ସ୍ଥିତିକୁ ଓଭର୍ ରାଇଟ୍ କରନ୍ତୁ ନାହିଁ।

**ଅଳସୁଆ ପୁନରୁଦ୍ଧାର:** ଯେତେବେଳେ `rateLimitedUntil` ଅତୀତ ହୋଇଗଲା, ସଂଯୋଗ ପୁନର୍ବାର ଯୋଗ୍ୟ ହୁଏ। ସଫଳ ବ୍ୟବହାରରେ, `clearAccountError()` ସମସ୍ତ ତ୍ରୁଟି କ୍ଷେତ୍ରକୁ ସଫା କରେ।

### Claude OAuth ବ୍ୟବହାର କାନ୍ଥ: ନିମ୍ନ-ପ୍ରାଥମିକତା ଗାଡ଼ି + ଅଧିବେଶନ-ସୀମା ପୁନ et ସେଟ୍।

**ପରିସର:** ଗୋଟିଏ Claude ସଦସ୍ୟତା (OAuth) ସଂଯୋଗ। ଉଭୟ ବ features ଶିଷ୍ଟ୍ୟଗୁଡିକ ହେଉଛି।** ସଂଯୋଗ ପାଇଁ ଅପ୍ଟ-ଇନ୍।** ( `providerSpecificData` ରେ → Claude ବିଭାଗ → `lowPriorityMode` / `autoLimitReset` ସଂପାଦନ କରନ୍ତୁ, ଉଭୟ ଡିଫଲ୍ଟ ଅଫ୍) ଏବଂ ଦର୍ପଣ Claude କୋଡର `/low-priority` ଏବଂ `/limit-reset` ନିର୍ଦ୍ଦେଶଗୁଡ଼ିକ ( Claude କୋଡ୍ 2.1.263 ରୁ କଏଦ ହୋଇଥିବା ତାର ଚୁକ୍ତି)।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ରାଜ୍ୟ ମେସିନ୍ + ପ୍ରତିକ୍ରିୟା ବର୍ଗୀକରଣ: `open-sse/services/claudeLowPriority.ts`
- status/claim କ୍ଲାଏଣ୍ଟ ପୁନ Res ସେଟ୍ କରନ୍ତୁ: `open-sse/services/claudeLimitReset.ts`
- ଏକଜେକ୍ୟୁଟର ହୁକ୍ (ହେଡର୍ ଇଞ୍ଜେକ୍ସନ୍ + ସମାନ ଆକାଉଣ୍ଟ୍ ପୁନ ry ଚେଷ୍ଟା): `open-sse/executors/base.ts::execute()`
- ଅପ୍ଟ-ଇନ୍ ସ୍ଥିରତା: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ଟ୍ରିଗର:** 5 ଘଣ୍ଟାର ବ୍ୟବହାର କାନ୍ଥ — a `429` ଯାହାର ହେଡର୍ `anthropic-ratelimit-unified-status: rejected` ବହନ କରେ ଏବଂ ଯେତେବେଳେ ଖାତା ଯୋଗ୍ୟ, `anthropic-ratelimit-unified-slow-offer: treatment`। ସେହି ପ୍ରଥମ କାନ୍ଥ 429 ପୂର୍ବରୁ କିଛି ପଠାଯାଇ ନାହିଁ; ୟୁନିଫାଏଡ୍ ହେଡର୍ ବିନା ଏକ ବିସ୍ଫୋରଣ 429 ସାଧାରଣ କୁଲଡାଉନ୍ ପଥ ଦେଇ ଗତି କରେ।

**ନିମ୍ନ-ପ୍ରାଥମିକତା ଗାଡ଼ି।** (`lowPriorityMode`):

- କାନ୍ଥରେ 429 କାର୍ଯ୍ୟନିର୍ବାହୀ ଅଫର୍ ଗ୍ରହଣ କରେ ଏବଂ ତୁରନ୍ତ ପୁନ ries ଚେଷ୍ଟା କରେ।** ସମାନ** `anthropic-usage-limit: slow` ସହିତ ଖାତା; ଘୋଷିତ `anthropic-ratelimit-unified-reset` (+ 60s ଅନୁଗ୍ରହ) ପର୍ଯ୍ୟନ୍ତ ସେହି ଗାଡ଼ି ସକ୍ରିୟ ରହିଥାଏ ଏବଂ ସେହି ୱିଣ୍ଡୋରେ ଥିବା ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ହେଡର୍ ବହନ କରେ। ବାଧାପ୍ରାପ୍ତ 429 କଦାପି `handleChatCore` ପହଞ୍ଚେ ନାହିଁ, ତେଣୁ ସଂଯୋଗଟି ହେଉଛି।** ନୁହେଁ** କୁଲଡାଉନରେ ରଖନ୍ତୁ ଏବଂ ଘୂର୍ଣ୍ଣନ କରାଯାଏ ନାହିଁ।
- ପରବର୍ତ୍ତୀ ପ୍ରତିକ୍ରିୟାରେ`anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` ଗାଡ଼ି ରଖ; `slot_busy` (429) କିମ୍ବା ଏକ `529` ସର୍ଭରର `anthropic-ratelimit-unified-slow-retry-after` (ଡିଫଲ୍ଟ 20s, କ୍ଲମ୍ପ 5–600s, ± 30% ଜିଟର୍) ଅପେକ୍ଷା କରନ୍ତୁ ଏବଂ `anthropic-ratelimit-unified-slow-max-wait` (ଡିଫଲ୍ଟ 20 ମିନିଟ୍, କ୍ଲମ୍ପ 1 ମିନିଟ୍ - 6 ଘ) — ଅତୀତରେ ଗାଡ଼ି ଶେଷ ହେବ ଏବଂ 10 ମିନିଟର କୁଲ୍ ଅଫ୍ ବ୍ଲକ୍ ପୁନ-ଗ୍ରହଣକୁ ଅପେକ୍ଷା କରନ୍ତୁ। ଅନୁରୋଧର ଅପଷ୍ଟ୍ରିମ-ଷ୍ଟାର୍ଟ ଟାଇମଆଉଟ୍ (`resolveFetchStartTimeout`, 10 ମିନିଟ୍ ଡିଫଲ୍ଟ ଭାବରେ) ମାଇନସ୍ 5 s ମାର୍ଜିନ୍ ବାକି ରହିଲା ଦ୍ୱାରା ଅପେକ୍ଷା ଅତିରିକ୍ତ କ୍ୟାପ୍ ହୋଇଛି: ସେହି କ୍ୟାପ୍ ବିନା 20 ମିନିଟର ଡିଫଲ୍ଟ ମ୍ୟାକ୍ସ-ୱେଟ୍ ଅନୁରୋଧକୁ ବଞ୍ଚାଇବ ଏବଂ ଶୋଇବା ମଧ୍ୟ-ଅପେକ୍ଷାକୁ ବନ୍ଦ କରିଦିଆଯିବ, ଦୟାକରି `max_wait` end + କୁଲ୍-ଅଫ୍ ପରିବର୍ତ୍ତେ ଏକ `TimeoutError` ସର୍ଫିଙ୍ଗ୍।
- `weekly_limit` `budget_exhausted` `off` `ineligible` `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` `extra_usage` ପ୍ରତିକ୍ରିୟା ତା’ପରେ ସାଧାରଣ କୁଲଡାଉନ୍ ପଥକୁ ପ୍ରବାହିତ ହୁଏ। ଘୋଷିତ ବଜେଟ୍ ପୁନ et ସେଟ୍ (≤ 8 ଦିନ) ପର୍ଯ୍ୟନ୍ତ `budget_exhausted` ମନେରଖାଯାଏ।
- କାନ୍ଥ ଯାଞ୍ଚ ଏକଜିକ୍ୟୁଟରଙ୍କ ନିଜସ୍ୱ 400-ଚାଳିତ ଇଣ୍ଟ୍ରା-ପ୍ରୟାସ ପୁନ ries ଚେଷ୍ଟା (ପ୍ରସଙ୍ଗ ଏଡିଟିଂ, thinking/effort କ୍ଲମ୍ପ୍ସ, ପାରାମ ଅଟୋ-ଲର୍ନ) ପରେ ଚାଲିଥାଏ, ତେଣୁ କାନ୍ଥ 429 ଯାହା କେବଳ ସେହି ପୁନ ries ଚେଷ୍ଟାଗୁଡ଼ିକ ମଧ୍ୟରୁ ଗୋଟିଏ ଉପରେ କୁଲଡାଉନ୍ ପଥରେ ପହଞ୍ଚିବା ପରିବର୍ତ୍ତେ ବାଧାପ୍ରାପ୍ତ।
- ସଂଯୋଗ ପ୍ରତି ରାଜ୍ୟ ମେମୋରୀ ଅଟେ (ପୁନ - ଗ୍ରହଣ କରିବାକୁ ଗୋଟିଏ ଅତିରିକ୍ତ କାନ୍ଥ 429 ଖର୍ଚ୍ଚ ହୁଏ)।

**ଅଧିବେଶନ-ସୀମା ପୁନ et ସେଟ୍।** (`autoLimitReset`, ଉଭୟ ଅନ୍ ଥିବାବେଳେ ଗାଡ଼ି ପୂର୍ବରୁ ଚେଷ୍ଟା କରାଯାଇଥିଲା):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ବ୍ଲକ; ଯେତେବେଳେ `arm: "reset"` ଏବଂ `available: true`, `{ "program": "juniper_tide" }` ସହିତ `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` ରୁ ସଂଗଠନ UUID, ବୁଟଷ୍ଟ୍ରାପ୍ ଫଲବ୍ୟାକ୍)।
- `result: reset|not_limited` → ଅନୁରୋଧ ପୂର୍ଣ୍ଣ ବେଗରେ ପୁନ ry ଚେଷ୍ଟା କରାଯାଏ (କ slow ଣସି ଧୀର ହେଡର୍ ନାହିଁ)। `already_used` / `not_offered` ସ୍ମୃତି `next_available_at` (ଡିଫଲ୍ଟ ଗୋଟିଏ ସପ୍ତାହ); ଯେକ any ଣସି ବିଫଳତା 15 ମିନିଟ୍ ବନ୍ଦ ହୋଇଯାଏ। ପୁନ et ସେଟ୍ ସପ୍ତାହରେ ଥରେ ଏବଂ ତଥାପି ସାପ୍ତାହିକ ସୀମାକୁ ଗଣନା କରେ।

ରେଗ୍ରେସନ୍ ଗାର୍ଡ: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`

### ବ୍ୟାଙ୍କ୍ ରିସେଟଗୁଡିକ ଅଟୋ-ପ୍ରୟୋଗ କରନ୍ତୁ।

**ପରିସର:** Codex ଏବଂ Claude ସଦସ୍ୟତା (OAuth) ସଂଯୋଗଗୁଡ଼ିକ।** ଅପ୍ଟ-ଇନ୍।** : `bankedResetAutoApply` ସେଟିଂ ବନ୍ଦ ଅଛି ଏବଂ ଡିଫଲ୍ଟ ଭାବରେ `dry-run` ମୋଡରେ (ସେଟିଂସମୂହ → AI → ବ୍ୟାଙ୍କ-ପୁନ ets ସେଟ୍ ଅଟୋ-ପ୍ରୟୋଗ କରନ୍ତୁ)।

**ଉଦ୍ଦେଶ୍ୟ:** ପ୍ରଦାନକାରୀ ସୀମା ପୃଷ୍ଠାରେ “ମୁକ୍ତି” ଦବାଇବା ପାଇଁ ଏକ ଅପରେଟର ଅପେକ୍ଷା କରିବା ପରିବର୍ତ୍ତେ ଏକ ଆକାଉଣ୍ଟ୍ ଏକ ବ୍ୟବହାର କାନ୍ଥକୁ ହିଟ୍ କଲାବେଳେ ନିଜେ ବ୍ୟାଙ୍କ୍ ରିସେଟ୍ ଖର୍ଚ୍ଚ କରନ୍ତୁ।

| କ୍ରେଡିଟ୍ ପ୍ରକାର (`creditTypes`) | ଯାହା ମୁକ୍ତ ହୋଇଛି                                 | ଯେଉଁଠାରେ ଏହା ଚାଲିଥାଏ।                                    |
| ------------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| `codexCredits`                  | Codex କ୍ରେଡିଟ୍ ପୁନ res ସେଟ୍ କରନ୍ତୁ।              | ପୃଷ୍ଠଭୂମି କାର୍ଯ୍ୟ, ପ୍ରତି 60 ସେକେଣ୍ଡ୍।                    |
| `claudeCredits`                 | Claude ବ୍ୟାଙ୍କ ଅନୁଦାନ (`GRANT` କ୍ରେଡିଟ୍)         | ପୃଷ୍ଠଭୂମି କାର୍ଯ୍ୟ, ପ୍ରତି 60 ସେକେଣ୍ଡ୍।                    |
| `claudeSessionReset`            | Claude ସାପ୍ତାହିକ ଅଧିବେଶନ-ସୀମା ପୁନ et ସେଟ୍ (ଉପରେ) | ଅନୁରୋଧ ଖାତା, ପ୍ରତି ଆକାଉଣ୍ଟ ଟୋଗଲ୍ ଭଳି ସମାନ ନୀତି ମାଧ୍ୟମରେ। |

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ଶୁଦ୍ଧ ନିଷ୍ପତ୍ତି (ଉଭୟ ପଥ ପାଇଁ ଗୋଟିଏ ନିୟମ ସେଟ୍): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- ପୃଷ୍ଠଭୂମି କାର୍ଯ୍ୟ: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` ରେ ଆରମ୍ଭ)
- Claude ଅନୁରୋଧ-ପଥ ଗେଟ୍: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` ରେ `setClaudeLimitResetPolicy()` ମାଧ୍ୟମରେ ପଞ୍ଜିକୃତ।
- ଇତିହାସ, କ୍ୟାପ୍ ଏବଂ ୱେବ୍ ହକ୍: `src/lib/usage/bankedResetAudit.ts`
- ଇତିହାସ API: `GET /api/settings/banked-reset-auto/history?limit=50` (ପରିଚାଳନା auth)

**ନିଷ୍ପତ୍ତି କ୍ରମ।** (ପ୍ରଥମ ବିଫଳ ନିୟମ ହେଉଛି ରେକର୍ଡ ହୋଇଥିବା କାରଣ):

1. ଫିଚର୍ ଅଫ୍, କ୍ରେଡିଟ୍ ପ୍ରକାର ଅଫ୍, କିମ୍ବା ଆକାଉଣ୍ଟ୍ ପରିସର ବାହାରେ (`accountScope` `all` / `selected` ପ୍ଲସ୍ ପ୍ରତି ଆକାଉଣ୍ଟ୍ `connections` ମାନଚିତ୍ର)।
2. ବ al କଳ୍ପିକ UTC କାର୍ଯ୍ୟସୂଚୀ ବାହାରେ (`startHourUtc` > `endHourUtc` ମଧ୍ୟରାତ୍ରି ଅତିକ୍ରମ କରେ)।
3. ଗତ 24 ଘଣ୍ଟା ଉପରେ କ୍ୟାପ୍ସ: `maxPerAccountPerDay` (1), `maxPerDay` (3), ଏବଂ `minSpacingMinutes` (30) ଯେକ any ଣସି ଦୁଇଟି ମୁକ୍ତି ମଧ୍ୟରେ।
4. ଟ୍ରିଗର: ଏକ ପାଚେରୀ `session` କିମ୍ବା `weekly` ୱିଣ୍ଡୋ ( `getQuotaWindowStatus().reachedThreshold` ରୁ ପ read ଼ନ୍ତୁ, `isAccountQuotaExhausted()` ନୁହେଁ, ଯାହା କେବଳ ଖର୍ଚ୍ଚ ହୋଇଥିବା ପ୍ରତ୍ୟେକ ୱିଣ୍ଡୋ ସହିତ ଏକ ଆକାଉଣ୍ଟ୍ ରିପୋର୍ଟ କରେ), କିମ୍ବା ଏକ ଖାତାରେ `expiringCreditHours` (24) ମଧ୍ୟରେ ମିଆଦ ପୂର୍ଣ୍ଣ କ୍ରେଡିଟ୍ ଯାହା ଅତି କମରେ `expiringCreditMinUsedPercent` (50) ବ୍ୟବହାର କରିଛି।
5. ପ୍ରାକୃତିକ-ପୁନ et ସେଟ୍ ଗାର୍ଡ: ପାଚେରୀ 5 ଘଣ୍ଟିଆ ୱିଣ୍ଡୋ `sessionResetGuardMinutes` (90) ମଧ୍ୟରେ ପୁନ ets ସେଟ୍ ହେବାବେଳେ କିମ୍ବା `weeklyResetGuardHours` (12) ମଧ୍ୟରେ ପାଚେରୀ ସାପ୍ତାହିକ ୱିଣ୍ଡୋକୁ ଛାଡିଦିଅ।
6. ସାପ୍ତାହିକ ଚଟାଣ: ସାପ୍ତାହିକ ଅବଶିଷ୍ଟ `weeklyFloorPercent` (10) ତଳେ ଥିବାବେଳେ 5 ଘଣ୍ଟିଆ ପୁନ et ସେଟ୍ ଛାଡିଦିଅ।
7. `last-resort` ମୋଡ୍: ସମାନ ପ୍ରଦାନକାରୀଙ୍କ ଅନ୍ୟ ଏକ ଇନ୍-ସ୍କୋପ୍ ଆକାଉଣ୍ଟ୍ ଉଭୟ ୱିଣ୍ଡୋରେ ଅତି କମରେ `poolHeadroomPercent` (10) ବାକି ଅଛି। ମିଆଦ ପୂର୍ଣ୍ଣ-କ୍ରେଡିଟ୍ ଟ୍ରିଗର ଏହାକୁ ବାଇପାସ୍ କରେ।
8. `dry-run` ଏକ ଧାଡି ରେକର୍ଡ କରେ ଏବଂ କିଛି ମୁକ୍ତ କରେ ନାହିଁ; `last-resort` ଏବଂ `eager` ମୁକ୍ତି।

ନିଖୋଜ କୋଟା ତଥ୍ୟ କଦାପି ମୁକ୍ତିକୁ ଖୋଲିବ ନାହିଁ: ଏକ ଅଜ୍ଞାତ ପୁନ et ସେଟ୍ ସମୟ କିମ୍ବା ସାପ୍ତାହିକ ବ୍ୟବହାର ସ୍କିପ୍।

**Claude ଅଧିବେଶନ ପୁନ et ସେଟ୍:** ବ feature ଶିଷ୍ଟ୍ୟ ବନ୍ଦ, କିମ୍ବା `claudeSessionReset` ବନ୍ଦ ସହିତ, ପ୍ରତି ଆକାଉଣ୍ଟ `autoLimitReset` ଟୋଗଲ୍ ପୂର୍ବ ପରି ସ୍ଥିର କରେ। ଉଭୟ ଅନ୍ ସହିତ, ବ feature ଶିଷ୍ଟ୍ୟ ପ୍ରତି-ଆକାଉଣ୍ଟ୍ ଟୋଗଲ୍ଗୁଡ଼ିକୁ ବଦଳାଇଥାଏ: ଏକ ଇନ୍-ସ୍କୋପ୍ ଆକାଉଣ୍ଟ୍ ଯେତେବେଳେ ପଲିସି ଅନୁମତି ଦିଏ ସେତେବେଳେ ଦାବି କରିପାରିବ ଏବଂ `dry-run` ମୋଡ୍ ରେ କ claim ଣସି ଦାବି କରାଯାଇ ନାହିଁ।

**ସୁରକ୍ଷା:** ଚାକିରି ଟିକ୍ ପ୍ରତି ସର୍ବାଧିକ ଏକ କ୍ରେଡିଟ୍ ମୁକ୍ତ କରେ, କ୍ରେଡିଟ୍ ତାଲିକାଭୁକ୍ତ କରିବା ପୂର୍ବରୁ ସ୍ଥିର କରେ (ଏକ ସ୍କିପ୍ ଆକାଉଣ୍ଟ୍ କେବେବି ତାଲିକାଭୁକ୍ତ ହୁଏ ନାହିଁ), idempotency କି `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ବ୍ୟବହାର କରେ, ଏବଂ ଏକ ବିଫଳ ତାଲିକା କିମ୍ବା ମୁକ୍ତି ପରେ 1 ଘଣ୍ଟା ପାଇଁ ଏକ ଆକାଉଣ୍ଟକୁ ବ୍ୟାକ୍ କରେ। ପ୍ରତ୍ୟେକ ମୁକ୍ତି, ବିଫଳତା ଏବଂ ଶୁଖିଲା ନିଷ୍ପତ୍ତି `audit_log` କୁ ଲେଖାଯାଇଛି (`action: "bankedReset.redeem"`, କ to ଣସି ଟୋକେନ୍ କିମ୍ବା କ୍ରେଡିଟ୍ ଆଇଡି); କ୍ୟାପଗୁଡିକ ସେହି ଧାଡିରୁ ଗଣନା କରାଯାଏ, ତେଣୁ ସେମାନେ ପୁନ art ଆରମ୍ଭରୁ ବଞ୍ଚନ୍ତି। ସଫଳ ମୁକ୍ତି ମଧ୍ୟ `provider.reset_redeemed` ୱେବହୋକ୍କୁ ନିଆଁ ଲଗାଇଥାଏ।

ରେଗ୍ରେସନ୍ ଗାର୍ଡ: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`

### ଅଧିବେଶନ ସମ୍ବନ୍ଧ (#7274)

**ପରିସର:** ଗୋଟିଏ କ୍ଲାଏଣ୍ଟ ଅଧିବେଶନ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ହେଡର୍) ଗୋଟିଏ ସଂଯୋଗ ପାଇଁ ପିନ୍ ହୋଇଛି।** ଯେକ any ଣସି** ପ୍ରଦାନକାରୀ।

**ଉଦ୍ଦେଶ୍ୟ:** ଅନୁରୋଧ ମଧ୍ୟରେ ସମାନ ଆକାଉଣ୍ଟରେ ଏକ ମଲ୍ଟି ଟର୍ନ ଏଜେଣ୍ଟ (Claude କୋଡ୍, ସହାୟକ, କଷ୍ଟମ୍ ଏଜେଣ୍ଟ) ରଖନ୍ତୁ, କ୍ରସ୍ ଆକାଉଣ୍ଟ୍ ପ୍ରସଙ୍ଗ ହ୍ରାସ ଏବଂ ପ୍ରତି ଆକାଉଣ୍ଟ୍ ଅଧିବେଶନ ସ୍ଥିତି ସହିତ ପ୍ରଦାନକାରୀଙ୍କ ଉପରେ ବାରମ୍ବାର ଥଣ୍ଡା-ଷ୍ଟାର୍ଟ 429s ରଖନ୍ତୁ।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- TTL ରେଜୋଲୁସନ: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- selection/creation ପିନ୍: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ହେଡର୍ ନିଷ୍କାସନ (ଜେନେରିକ୍, ଯେକ any ଣସି ପ୍ରଦାନକାରୀ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- ସ୍ଥାୟୀ ପିନ୍ ଟେବୁଲ୍: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ସେଟିଂ: `sessionAffinityTtlMs` (ms ରେ ଗ୍ଲୋବାଲ୍ TTL, `0` ଅକ୍ଷମ) — `src/lib/db/settings.ts`। କୋଡେକ୍ସ-କେବଳ `codexSessionAffinityTtlMs` ରୁ ସ୍ଥାନାନ୍ତରଣ `124_generic_session_affinity_ttl.sql` ଦ୍ୱାରା ପୁନ amed ନାମିତ ହୋଇଛି, ଯାହାକି ପୂର୍ବ-ବିନ୍ୟାସିତ Codex TTL ନୂତନ ଡିଫଲ୍ଟ ଭାବରେ ବହନ କରିଥାଏ।

#7274 ପୂର୍ବରୁ, `0` `codex` ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀଙ୍କ ପାଇଁ `resolveSessionAffinityTtlMs()` ହାର୍ଡ-ଜାମିନ ହୋଇଛି, ତେଣୁ TTL ସେଟିଂ (ଏବଂ ଅଧିବେଶନ ହେଡର୍) ଅନ୍ୟ କ anywhere ଣସି ସ୍ଥାନରେ ପ୍ରଭାବ ପକାଇ ନଥିଲା ଯଦିଓ ପିନିଂ ମେକାନିଜିମ୍ ଏବଂ ହେଡର୍ ନିଷ୍କାସନ ପୂର୍ବରୁ ପ୍ରଦାନକାରୀ-ଆଗ୍ନୋଷ୍ଟିକ୍ ଥିଲା। ଫିକ୍ସ ସେହି ଶୀଘ୍ର ପ୍ରତ୍ୟାବର୍ତ୍ତନକୁ ଅପସାରଣ କଲା; TTL ବର୍ତ୍ତମାନ ସର୍ବଭାରତୀୟ ସ୍ତରରେ `0` ଉପରେ ସେଟ୍ ହୋଇଥିବା ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀଙ୍କ ପାଇଁ ସମାନ ଭାବରେ ପ୍ରଯୁଜ୍ୟ।

ତିନୋଟି ଅଧିବେଶନ-ଆଫିନିଟି ହେଡର୍ ଗୁଡିକ କଦାପି ଅପଷ୍ଟ୍ରିମ୍ — ନିର୍ବାହକାରୀମାନେ କ୍ଲାଏଣ୍ଟ ହେଡର୍ ଦେଇ ଯିବା ପରିବର୍ତ୍ତେ ନିଜସ୍ୱ ଅପଷ୍ଟ୍ରିମ୍ ହେଡର୍ ଗଠନ କରନ୍ତି ନାହିଁ, ତେଣୁ ଏହା କେବଳ ଏକ ଆଭ୍ୟନ୍ତରୀଣ ସମ୍ପର୍କ ID ରହିଥାଏ।

### ଏକ୍ସକ୍ଲୁସିଭ୍ ପରିଚାଳିତ ଅଧିବେଶନ ସଂଯୋଗ ଲିଜ୍।

**ପରିସର:** ଗୋଟିଏ ସକ୍ରିୟ ପରିଚାଳିତ HTTP client/session ଗୋଟିଏ ଯୋଗ୍ୟ OmniRoute ସଂଯୋଗର ମାଲିକ।

**ଉଦ୍ଦେଶ୍ୟ:** କ୍ଲାଏଣ୍ଟମାନଙ୍କ ପାଇଁ ସ୍ଥାୟୀ ସ୍ୱତନ୍ତ୍ର ସଂଯୋଗ ମାଲିକାନା ପ୍ରଦାନ କରନ୍ତୁ ଯାହା ଅନୁରୋଧଗୁଡିକ ମଧ୍ୟରେ ଏକ କଠିନ ରାଉଟିଙ୍ଗ୍ ବାଡ଼ ଆବଶ୍ୟକ କରେ। ଏହା ଅଧିବେଶନ ସମ୍ବନ୍ଧଠାରୁ ଭିନ୍ନ, ଯାହା ଏକ ନରମ ନିରନ୍ତର ପସନ୍ଦ: ଏକ ସ୍ୱତନ୍ତ୍ର ଲିଜ୍ SQLite ରେ ଜୀବନଚକ୍ର ସ୍ଥିତିକୁ ବଜାୟ ରଖେ, ବିଶ୍ global ର ସକ୍ରିୟ-ମାଲିକ ଏବଂ ସକ୍ରିୟ-ସଂଯୋଗ ସ୍ୱତନ୍ତ୍ରତାକୁ ବାଧ୍ୟତାମୂଳକ କରେ ଏବଂ ପ୍ରଦାନକାରୀ ପଠାଇବା ପୂର୍ବରୁ ଏକ ପୁରୁଣା ପି generation ିକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ।

ବ z ଶିଷ୍ଟ୍ୟ ହେଉଛି API କି ପ୍ରତି ଅପ୍ଟ-ଇନ୍। ଏକ ପରିଚାଳିତ ଚାବିରେ `lease:exclusive` ପରିସର ଏବଂ ଏକ ଖାଲି ନଥିବା `allowedConnections` ତାଲିକା ଥିବା ଆବଶ୍ୟକ। ଯେକ z ଣସି HTTP କ୍ଲାଏଣ୍ଟ ଜୀବନଚକ୍ର ଶେଷ ପଏଣ୍ଟ ବ୍ୟବହାର କରିପାରିବ; କ client ଣସି ଗ୍ରାହକଙ୍କ ନାମ, ଉପଭୋକ୍ତା-ଏଜେଣ୍ଟ, ପ୍ରଦାନକାରୀ, OAuth ପଦ୍ଧତି, କିମ୍ବା ମଡେଲ ଆବଶ୍ୟକ ନାହିଁ। ଲିଜ୍ ଏକ ସଂଯୋଗର ମାଲିକ, ଏକ ମଡେଲ୍ ନୁହେଁ, ତେଣୁ ଏକ ମଡେଲ୍ ପରିବର୍ତ୍ତନ ବନ୍ଧନକୁ ବଜାୟ ରଖେ ଯେତେବେଳେ ସଂଯୋଗଟି ସାଧାରଣ ଭାବରେ ଯୋଗ୍ୟ ରହିଥାଏ। ସାଧାରଣ ମଡେଲ୍, କୋଟା, ସ୍ୱାସ୍ଥ୍ୟ, କୁଲଡାଉନ୍, ଏବଂ ଅନୁମତି ତାଲିକା ନିୟମ ପ୍ରାମାଣିକ ରହିଥାଏ ଏବଂ ସମାନ ପି generation ିକୁ ଅନ୍ୟ ଏକ ମାଗଣା ଯୋଗ୍ୟ ସଂଯୋଗକୁ ସ୍ଥାନାନ୍ତର କରିପାରେ।

ଜୀବନଚକ୍ର ହେଉଛି JSON କ୍ରିୟା `acquire`, `renew`, ଏବଂ `release` ସହିତ `POST /api/v1/session-leases`। ପରିଚାଳିତ ଇନଫେରେନ୍ସ ଅନୁରୋଧଗୁଡ଼ିକ ଅସ୍ପଷ୍ଟ `X-OmniRoute-Lease-Owner` ମୂଲ୍ୟ ଏବଂ ସଠିକ୍ `X-OmniRoute-Lease-Generation` ଉପସ୍ଥାପନ କରେ। ମାଲିକ `vlo_` ବ୍ୟବହାର କରନ୍ତି ଏବଂ ତା’ପରେ 43 base64url ଅକ୍ଷର; କେବଳ ଏହାର SHA-256 ହ୍ୟାସ୍ ଗଚ୍ଛିତ ଅଛି। ପ୍ରତ୍ୟେକ ଅନ୍ତିମ ପ୍ରେରଣ ବାଡ଼ ମଧ୍ୟ ପ୍ରାମାଣିକୃତ API କି ID ଏବଂ ସକ୍ରିୟ ସଂଯୋଗ ID ବାନ୍ଧେ। ଲିଜ୍ କଣ୍ଟ୍ରୋଲ୍ ହେଡର୍ ଗୁଡିକ ଲଗ୍, ରଖାଯାଇଥିବା ଅନୁରୋଧ ସ୍ନାପସଟ୍ ଏବଂ ଅପଷ୍ଟ୍ରିମ୍ ଏକଜିକ୍ୟୁଟର୍ ହେଡର୍ ଗୁଡିକରୁ ଅପସାରିତ ହୋଇଛି।

ଯଦି ସାଧାରଣ ରାଉଟିଙ୍ଗ୍ ଯୋଗ୍ୟ ପରିଚାଳିତ ପ୍ରାର୍ଥୀ ଥାଆନ୍ତି କିନ୍ତୁ ପ୍ରତ୍ୟେକ ମାଗଣା ପ୍ରାର୍ଥୀ ଏକ ବିଦେଶୀ ସକ୍ରିୟ ଲିଜ୍ ଦ୍ occupied ାରା ଦଖଲ କରନ୍ତି, OmniRoute HTTP `429`, ଲିଜ୍-କ୍ଷମତା-ଅନୁପଲବ୍ଧ କୋଡ୍, ଏକ ଅପେକ୍ଷା-କ୍ଷମତା ସ୍ଥିତି ଏବଂ ପ୍ରାଥମିକ ପ୍ରଯୁଜ୍ୟ ସମୟରୁ ଉତ୍ପନ୍ନ ଏକ ସୀମିତ `Retry-After` ଫେରସ୍ତ କରେ। ସାଧାରଣ ଖାଲି ଯୋଗ୍ୟତା ଲିଜ୍ ବିବାଦ ନୁହେଁ ଏବଂ ଏହାର ବିଦ୍ୟମାନ ରାଉଟିଙ୍ଗ୍ ତ୍ରୁଟି ସେମାଣ୍ଟିକ୍ସ ରଖେ।

ସମ୍ବନ୍ଧୀୟ ଯନ୍ତ୍ରକ separate ଶଳ ଅଲଗା ରହିଥାଏ:

- OAuth ଅଧିବେଶନ ସ୍ଥାନ ହେଉଛି OAuth ଖାତା ପାଇଁ ପ୍ରକ୍ରିୟା-ସ୍ଥାନୀୟ ସଫ୍ଟ ବଣ୍ଟନ।
- ଆକାଉଣ୍ଟ୍ ସେମାଫୋରସ୍ ଅନୁଦାନ ଅନୁରୋଧ-ସମନ୍ୱୟ ଅନୁମତି ଏବଂ ଏକ ଅନୁରୋଧ ସମାପ୍ତ ହେଲେ ଶେଷ ହୁଏ।
- ଏକ୍ସକ୍ଲୁସିଭ୍ ପରିଚାଳିତ ଅଧିବେଶନ ଲିଜ୍ ହେଉଛି ଏକ ପି generation ି ବାଡ଼ ସହିତ ସ୍ଥାୟୀ ଜୀବନଚକ୍ର ମାଲିକାନା।

---

## 3. ମଡେଲ୍ ଲକଆଉଟ୍

**ପରିସର:** ପ୍ରୋଭାଇଡର୍ + କନେକ୍ସନ୍ + ମଡେଲ୍ ଟ୍ରିପଲ୍।

**ସ୍ଥିତି ଅନୁସାରେ ପରିସର:** ବିଫଳତାର ସ୍ଥିତି ନିର୍ଦ୍ଧାରଣ କରେ ଯେ ଲକଆଉଟ୍ କେଉଁ କି ଉପରେ ଲେଖାଯିବ
(`open-sse/services/accountFallback/exactModelLock.ts` ରେ `resolveLockoutScope()`):

- `429` / `403` / `402` — କୋଟା କିମ୍ବା ଅଧିକାର ସଙ୍କେତ — **କୋଟା ପରିବାର**କୁ ଲକ୍ କରେ:
  codex ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ `codex` / `spark` ପରିସର (କନେକ୍ସନ୍ର ପ୍ରତ୍ୟେକ `gpt-5*` ମଡେଲ୍),
  ଅନ୍ୟ ପ୍ରୋଭାଇଡର୍ମାନଙ୍କ ପାଇଁ `getQuotaScopedModelForProvider()`।
- `404` ବେସିକ୍ ମଡେଲ୍କୁ ଲକ୍ କରେ (`getModelLockKey()` `not_found` କୁ ସଂକୁଚିତ କରେ)।
- ଅନ୍ୟ କୌଣସି ସ୍ଥିତି — `5xx` ଟ୍ରାନ୍ସପୋର୍ଟ/ସର୍ଭର ବିଫଳତା ଏବଂ ଗୁଣବତ୍ତା ଯାଞ୍ଚରୁ OmniRoute ନିଜେ ସୃଷ୍ଟି କରୁଥିବା
  `502` — କେବଳ ସଠିକ୍ ପ୍ରୋଭାଇଡର୍/କନେକ୍ସନ୍/ମଡେଲ୍ ଟ୍ରିପଲ୍କୁ ଲକ୍ କରେ। ଗୋଟିଏ ମଡେଲ୍ରେ ଥିବା ଖରାପ ଷ୍ଟ୍ରିମ୍ ଆକାଉଣ୍ଟର କୋଟା ବିଷୟରେ ପ୍ରମାଣ ନୁହେଁ; ଏହି ନିୟମ ପୂର୍ବରୁ `codex/gpt-5.6-luna` ରେ ଗୋଟିଏ ଖାଲି ରେସ୍ପନ୍ସ ସେହି କନେକ୍ସନ୍ର ପ୍ରତ୍ୟେକ `gpt-5*` ମଡେଲ୍କୁ 2–30 ମିନିଟ୍ ପାଇଁ (କ୍ରମେ ବଢ଼ୁଥିବା ସମୟ ସହ) ରାଉଟିଂରୁ ବାହାର କରିଦେଉଥିଲା, ଯେତେବେଳେ ଏହାର କୋଟା ଅସ୍ପୃଶ୍ୟ ରହୁଥିଲା।
- କଲର୍ର ସ୍ପଷ୍ଟ `scope` ବିକଳ୍ପ ସବୁବେଳେ ପ୍ରାଧାନ୍ୟ ପାଏ (Antigravity `"exact"` ପଠାଏ)।

**ଉଦ୍ଦେଶ୍ୟ:** କେବଳ ଗୋଟିଏ ମଡେଲ୍ ଉପଲବ୍ଧ ନଥିବା କିମ୍ବା କୋଟା-ସୀମିତ ଥିବାବେଳେ ସମ୍ପୂର୍ଣ୍ଣ କନେକ୍ସନ୍କୁ ନିଷ୍କ୍ରିୟ କରିବାରୁ ରୋକିବା।

**ଉଦାହରଣ:**

- `429` ଫେରାଉଥିବା ପ୍ରତି-ମଡେଲ୍ କୋଟା ପ୍ରୋଭାଇଡର୍ମାନେ
- ଗୋଟିଏ ଅନୁପସ୍ଥିତ ମଡେଲ୍ ପାଇଁ `404` ଫେରାଉଥିବା ଲୋକାଲ୍ ପ୍ରୋଭାଇଡର୍ମାନେ
- ପ୍ରୋଭାଇଡର୍-ନିର୍ଦ୍ଦିଷ୍ଟ ମୋଡ୍/ମଡେଲ୍ ଅନୁମତି ବିଫଳତା (ଯଥା Grok ମୋଡ୍ଗୁଡ଼ିକ)

**କାର୍ଯ୍ୟାନ୍ୱୟନ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### ମଡେଲ୍ କୁଲ୍ଡାଉନ୍ ଡ୍ୟାସ୍ବୋର୍ଡ୍ (v3.8.0)

UI: ସେଟିଂସ୍ → ମଡେଲ୍ କୁଲ୍ଡାଉନ୍ (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ସକ୍ରିୟ ଲକଆଉଟ୍ଗୁଡ଼ିକୁ ଏହି ସୂଚନା ସହିତ ତାଲିକାଭୁକ୍ତ କରେ: ପ୍ରୋଭାଇଡର୍, କନେକ୍ସନ୍, ମଡେଲ୍, କାରଣ, expiresAt। ଅପରେଟର୍ମାନେ କାର୍ଡ୍ରୁ ମାନୁଆଲ୍ ଭାବେ ଗୋଟିଏ ମଡେଲ୍କୁ ପୁନଃ-ସକ୍ରିୟ କରିପାରିବେ।

**REST API:**

- `GET /api/resilience/model-cooldowns` — ସକ୍ରିୟ ଲକଆଉଟ୍ଗୁଡ଼ିକର ତାଲିକା
- `DELETE /api/resilience/model-cooldowns` — ମାନୁଆଲ୍ ପୁନଃ-ସକ୍ରିୟକରଣ। ବଡି: `{provider, connection, model}`। ପ୍ରମାଣୀକରଣ: management।

### କୁଲ୍ଡାଉନ୍ ମ୍ୟାନେଜର୍

UI: ମନିଟରିଂ → କୁଲ୍ଡାଉନ୍ ମ୍ୟାନେଜର୍ (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

କ୍ଷଣସ୍ଥାୟୀ କାରଣରୁ ରାଉଟିଂରୁ ବାହାରେ ଥିବା ପ୍ରତ୍ୟେକ କନେକ୍ସନ୍ ପାଇଁ ଗୋଟିଏ ପୃଷ୍ଠା, ପ୍ରତ୍ୟେକ ପ୍ରୋଭାଇଡର୍ ପୃଷ୍ଠା ଖୋଲିବାର ପରିବର୍ତ୍ତେ।
ଏହା କନେକ୍ସନ୍ କୁଲ୍ଡାଉନ୍, ମଡେଲ୍ ଲକଆଉଟ୍ ଏବଂ ଟର୍ମିନାଲ୍ ସ୍ଥିତିଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରେ, ପ୍ରତି କନେକ୍ସନ୍ ପାଇଁ, ଚୟନିତ କନେକ୍ସନ୍ଗୁଡ଼ିକ ପାଇଁ, କିମ୍ବା ଗୋଟିଏ ପ୍ରୋଭାଇଡର୍ର ସମସ୍ତ କନେକ୍ସନ୍ ପାଇଁ ସେଗୁଡ଼ିକୁ ସଫା କରେ, ଏବଂ ସବୁଠାରୁ ଅଧିକ ଟ୍ୟୁନ୍ କରାଯାଇଥିବା କୁଲ୍ଡାଉନ୍ ନିୟମଗୁଡ଼ିକୁ ସମ୍ପାଦନ କରେ: `streamStallCooldown.enabled` ଏବଂ OAuth / API-key `connectionCooldown` ର ମୂଳ କୁଲ୍ଡାଉନ୍ ଏବଂ ସର୍ବାଧିକ ବ୍ୟାକଅଫ୍ ଧାପଗୁଡ଼ିକ ( `PATCH /api/resilience` ମାଧ୍ୟମରେ ସେଭ୍ ହୁଏ)। ଟର୍ମିନାଲ୍ ସ୍ଥିତିଗୁଡ଼ିକ (`banned`, `expired`, `credits_exhausted`) ତାଲିକାଭୁକ୍ତ ହୁଏ, କିନ୍ତୁ ଏଠାରେ କେବେବି ସଫା କରାଯାଏ ନାହିଁ।

ସେହି ପୃଷ୍ଠାର **ତ୍ରୁଟି କୁଲ୍ଡାଉନ୍ ନିୟମ** କାର୍ଡ୍ ଅପରେଟର୍ ତ୍ରୁଟି ନିୟମଗୁଡ଼ିକୁ
(`settings.providerErrorRules`) ଏବଂ ପ୍ରତି-ପ୍ରୋଭାଇଡର୍ catch-all ଡିଫଲ୍ଟଗୁଡ଼ିକୁ
(`settings.providerErrorDefaults`) `PATCH /api/settings` ମାଧ୍ୟମରେ ସମ୍ପାଦନ କରେ — ସେଗୁଡ଼ିକ କିପରି ମେଳ ଖାଏ ତାହା ପାଇଁ §7 ଅଧୀନରେ “ଅପରେଟର୍-ଘୋଷିତ ନିୟମ” ଦେଖନ୍ତୁ। ଅବଧିଗୁଡ଼ିକ ହେଉଛି ଡିଫଲ୍ଟ (କୌଣସି ସ୍ପଷ୍ଟ କୁଲ୍ଡାଉନ୍ ନାହିଁ), 30 ମିନିଟ୍, 1 ଘଣ୍ଟା, 5 ଘଣ୍ଟା, 24 ଘଣ୍ଟା, କିମ୍ବା 1 ରୁ 43,200 ମିନିଟ୍ (30 ଦିନ) ପର୍ଯ୍ୟନ୍ତ ଏକ କଷ୍ଟମ୍ ଅବଧି।

**REST API** (`src/lib/resilience/cooldownManager.ts`, ପ୍ରମାଣୀକରଣ: management):

- `GET /api/resilience/cooldowns[?provider=]` — ସ୍ଥିତି, ଅବଶିଷ୍ଟ କୁଲ୍ଡାଉନ୍, ବ୍ୟାକଅଫ୍ ସ୍ତର, ଶେଷ ତ୍ରୁଟି ପ୍ରକାର ଏବଂ ମଡେଲ୍ ଲକଆଉଟ୍ ସହିତ କନେକ୍ସନ୍ଗୁଡ଼ିକ (କୌଣସି ପ୍ରମାଣପତ୍ର ନାହିଁ)
- `POST /api/resilience/cooldowns` — ବଡି `{connectionIds: string[]}` କିମ୍ବା `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ଫେରାଏ

### ଲକଆଉଟ୍ ସେଟିଂସ୍ UI + ସଫଳତା-କ୍ଷୟ ପୁନରୁଦ୍ଧାର (v3.8.23)

ମଡେଲ୍ ଲକଆଉଟ୍ ସବୁବେଳେ ସକ୍ରିୟ ଥିବା ହାର୍ଡକୋଡେଡ୍ ବ୍ୟବହାରରୁ ନିଜସ୍ୱ ସେଟିଂସ୍ କାର୍ଡ୍ ଏବଂ ସ୍ୱୟଂ-ସୁସ୍ଥ ହେଉଥିବା ପୁନରୁଦ୍ଧାର ପଥ ସହିତ ସମ୍ପୂର୍ଣ୍ଣ ବିନ୍ୟାସଯୋଗ୍ୟ, ଅପ୍ଟ୍-ଇନ୍ ବୈଶିଷ୍ଟ୍ୟରେ ପରିଣତ ହୋଇଛି।

**ସେଟିଂସ୍ କାର୍ଡ୍:** ସେଟିଂସ୍ → ମଡେଲ୍ ଲକଆଉଟ୍
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
ଏହା ଉପରୋକ୍ତ କେବଳ-ପଠନୀୟ `ModelCooldownsCard` ଠାରୁ **ଭିନ୍ନ** (ଯାହା କେବଳ ସକ୍ରିୟ ଲକଆଉଟ୍ଗୁଡ଼ିକୁ
_ତାଲିକାଭୁକ୍ତ_ କରେ) — ନୂଆ କାର୍ଡ୍ଟି _ପାରାମିଟର୍ଗୁଡ଼ିକୁ ବିନ୍ୟାସ କରେ_। ଡିଫଲ୍ଟଗୁଡ଼ିକ `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ରେ ରହେ:

| ସେଟିଂ                   | ଡିଫଲ୍ଟ                           | ଅର୍ଥ                                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------------------- |
| `enabled`               | `false`                          | ମାଷ୍ଟର୍ ଟଗଲ୍ — ମଡେଲ୍ ଲକଆଉଟ୍ **ଡିଫଲ୍ଟ ଭାବେ ବନ୍ଦ**।             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | ମଡେଲ୍-ସ୍କୋପ୍ ବିଫଳତା ଭାବେ ଗଣାଯାଉଥିବା ଅପ୍ଷ୍ଟ୍ରିମ୍ ସ୍ଥିତିଗୁଡ଼ିକ। |
| `baseCooldownMs`        | `120_000` (120 s)                | ପ୍ରଥମ ବିଫଳତା ପାଇଁ ପ୍ରାରମ୍ଭିକ ଲକଆଉଟ୍ ଅବଧି।                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ବଢ଼ାଯାଇଥିବା କୁଲ୍ଡାଉନ୍ର ସୀମା।                                  |
| `maxBackoffSteps`       | `10`                             | ଘାତୀୟ-ବ୍ୟାକଅଫ୍ ବୃଦ୍ଧିର ସର୍ବାଧିକ ଧାପ।                          |
| `useExponentialBackoff` | `true`                           | ପୁନରାବୃତ୍ତି ବିଫଳତା କୁଲ୍ଡାଉନ୍କୁ ଘାତୀୟ ଭାବେ ବଢ଼ାଇବ କି ନାହିଁ।    |

ସେଟିଂସ୍ଗୁଡ଼ିକ ସାଧାରଣ ସେଟିଂସ୍ ଷ୍ଟୋର୍ ମାଧ୍ୟମରେ ସଂରକ୍ଷିତ ହୁଏ ଏବଂ ରେଜିଲିଏନ୍ସ ସେଟିଂସ୍ ସ୍କିମା ମାଧ୍ୟମରେ ବୈଧତା ଯାଞ୍ଚ ହୁଏ; କାର୍ଡ୍ଟି
`baseCooldownMs`/`maxCooldownMs` କୁ (`maxCooldownMs ≥ baseCooldownMs` ସହିତ) ଏବଂ `maxBackoffSteps` କୁ ସୀମିତ କରେ।

**ସଫଳତା-କ୍ଷୟ ପୁନରୁଦ୍ଧାର:** ପୁନରୁଦ୍ଧାର କେବଳ ଟାଇମର୍ ସମାପ୍ତି ଉପରେ ନିର୍ଭର କରେ ନାହିଁ। ଏକ ସୁସ୍ଥ ରେସ୍ପନ୍ସ ମଡେଲ୍ର ବିଫଳତା ଗଣନାକୁ ଧୀରେ ଧୀରେ କମାଏ, ଯାହାଫଳରେ ମଧ୍ୟ-ୱିଣ୍ଡୋରେ ପୁନରୁଦ୍ଧାର ହୋଇଥିବା ମଡେଲ୍ ବଢ଼ିବା ବନ୍ଦ କରେ (ଏବଂ ସଫା ହୋଇଯାଏ) ଏବଂ ଟାଇମର୍ ସମାପ୍ତ ହେବା ପୂର୍ବରୁ ମଧ୍ୟ ପୁନଃ-ସକ୍ରିୟ ହୋଇପାରେ। ସଫଳ କମ୍ବୋ ଟାର୍ଗେଟ୍ରେ, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) କୁ କଲ୍ କରେ, ଯାହା ସଂରକ୍ଷିତ
`failureCount` କୁ ଅଧା କରେ (`Math.floor(failureCount / 2)`); ଏହା `0` ରେ ପହଞ୍ଚିଲେ ଲକଆଉଟ୍ ଏଣ୍ଟ୍ରି ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଡିଲିଟ୍ ହୋଇଯାଏ। ଏହାର ପ୍ରତିପକ୍ଷ `recordModelLockoutFailure()` ବିଫଳତା ସମୟରେ ଗଣନା ବଢ଼ାଏ (ଏବଂ କୁଲ୍ଡାଉନ୍କୁ ବଢ଼ାଏ) ଯାହା ବୃଦ୍ଧି ୱିଣ୍ଡୋ ମଧ୍ୟରେ ଘଟେ। ଏହି ସଫଳତା-କ୍ଷୟ ସାଧାରଣ ଟାଇମର୍ ସମାପ୍ତି ସହିତ ଅତିରିକ୍ତ ଭାବେ କାମ କରେ — ଯେକୌଣସି ପଥ ମଡେଲ୍କୁ ପୁନଃ-ସକ୍ରିୟ କରିପାରେ।

**ସ୍ଥିତି:** ଲକଆଉଟଗୁଡ଼ିକ **ମେମୋରିରେ** (ପ୍ରତି-ପ୍ରୋସେସ୍ `Map`s, ଯେଉଁଥିରେ
`ModelLockoutEntry`ଗୁଡ଼ିକୁ `provider:connectionId:model` ଦ୍ୱାରା କୀ କରାଯାଇଛି; ସଠିକ୍-ସ୍କୋପ୍ ଲକଗୁଡ଼ିକୁ
`provider:connectionId:exact:model` ଦ୍ୱାରା କୀ କରାଯାଇଛି) ରଖାଯାଏ, ଏଗୁଡ଼ିକ
DBରେ ସଂରକ୍ଷିତ ହୁଏ ନାହିଁ — ପୁନଃଆରମ୍ଭ ସମୟରେ ଏଗୁଡ଼ିକ ହଜିଯାଏ। _ସେଟିଂଗୁଡ଼ିକ_ ସଂରକ୍ଷିତ ରହେ; ସକ୍ରିୟ
ଲକଆଉଟ _ସ୍ଥିତି_ ଅସ୍ଥାୟୀ।

---

## 4। କୋଟା-ସେୟାର ସମନ୍ୱୟ ନିୟନ୍ତ୍ରଣ (v3.8.36)

ସଦସ୍ୟତା ଖାତା (GLM, MiniMax, ଇତ୍ୟାଦି) ପ୍ରାୟତ z କେବଳ ~ 1–3 ଏକକାଳୀନ ଅନୁରୋଧ ଗ୍ରହଣ କରେ। ଏହାଠାରୁ ଅଧିକ ଯାହା 429 ଏବଂ କୁଲଡାଉନ୍ ଟ୍ରିଗର କରିଥାଏ। ଏହା ତୀବ୍ର ଅଟେ।** କୋଟା-ଅଂଶୀଦାର।** (`qtSd/…`) କମ୍ବୋ, ଯେଉଁଠାରେ ଅନେକ API କି ଗୋଟିଏ ଅପଷ୍ଟ୍ରିମ୍ ଆକାଉଣ୍ଟ୍ ଅଂଶୀଦାର କରନ୍ତି। ତିନୋଟି ସ୍ତର ଏକ ଅଂଶୀଦାର ଆକାଉଣ୍ଟକୁ ବନ୍ୟା ପରିସ୍ଥିତିରୁ ରକ୍ଷା କରେ।

### ପ୍ରତି-ସଂଯୋଗ ସମନ୍ୱୟ କ୍ୟାପ୍ (`max_concurrent`)

ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ସଂଯୋଗ ଏକ `max_concurrent` ଛାତ (`provider_connections.max_concurrent`, ସଂଯୋଗ ମୋଡାଲ / API / DB ରେ ସେଟ୍) ଘୋଷଣା କରିପାରିବ। କ limit ଣସି ସୀମା ପାଇଁ ଏହାକୁ ଖାଲି ଛାଡିଦିଅ। ଏହା ହେଉଛି ଏକକ ନବା ଯାହାକି — ତଳେ କ୍ରମିକୀକରଣ ସ୍ତରକୁ ଡ୍ରାଇଭ୍ କରେ ଏହାକୁ ଖାତାର ପ୍ରକୃତ ସମନ୍ୱୟ (ଯେପରିକି GLM ~ 1, MiniMax ~ 2) ରେ ସେଟ୍ କରେ।

### ପ୍ରତି-ମଡେଲ୍ ସମନ୍ୱୟ କ୍ୟାପ୍ (`modelConcurrency`)

ଏକ ସଂଯୋଗ ଅତିରିକ୍ତ ଭାବରେ ଏହାର `rateLimitOverrides` ମାନଚିତ୍ରରେ ପ୍ରତି ମଡେଲ୍ ସମନ୍ୱୟ ଛାତଗୁଡିକ ଘୋଷଣା କରିପାରିବ:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

ଏହାକୁ ସଂଯୋଗ ମୋଡାଲରେ ସେଟ୍ କରନ୍ତୁ (** ରେଟ୍ ସୀମା → ପ୍ରତି-ମଡେଲ୍ ସମନ୍ୱୟ କ୍ୟାପ୍ କୁ ଅତିକ୍ରମ କରେ।** , ପ୍ରତି ଧାଡିରେ ଗୋଟିଏ `model=cap` ) କିମ୍ବା ସମାନ JSON ଆକୃତି ସହିତ `PATCH /api/providers/[id]` ମାଧ୍ୟମରେ। ମୁଖ୍ୟ ଅର୍ଥ:

- **ସଂଯୋଗ-ପ୍ରଶସ୍ତ ବନାମ ମଡେଲ-ନିର୍ଦ୍ଦିଷ୍ଟ:** `maxConcurrent` ଅଂଶୀଦାର ସଂଯୋଗ-ପ୍ରଶସ୍ତ ଛାତ ହୋଇ ରହିଥାଏ। ଯେତେବେଳେ ଉଭୟ ପ୍ରୟୋଗ ହୁଏ, ଉଭୟ ଗେଟ୍ ପରମାଣୁ ଭାବରେ ସମାନ କମ୍ପୋଜିଟ୍ ଗେଟ୍ (`global → provider → account → model`) ରେ ଅର୍ଜନ ହୁଏ। ପ୍ରଭାବଶାଳୀ ଆଚରଣ ହେଉଛି କଠୋର ପ୍ରଯୁଜ୍ୟ ସୀମା।
- **ପ୍ରକୃତ ମଡେଲ-କି ମେଳ:** ଚାବି ହେଉଛି — ସାଧାରଣତ the ଖାଲି ଅପଷ୍ଟ୍ରିମ୍ ମଡେଲ୍ id (`glm-5`) ରାଉଟିଙ୍ଗ୍ ପରେ ଏକଜେକ୍ୟୁଟର୍ କୁ ପଠାଯାଇଥିବା ମଡେଲ୍ ଷ୍ଟ୍ରିଙ୍ଗ୍, କ୍ଲାଏଣ୍ଟ-ସାଇଡ୍ `provider/model` ଛଦ୍ମନାମ ନୁହେଁ (`zai/glm-5` `glm-5` ସହିତ ମେଳ ଖାଉ ନାହିଁ)। ମୂଲ୍ୟଗୁଡ଼ିକ ହେଉଛି ପଜିଟିଭ୍-ଇଣ୍ଟିଜର୍ ଏକକାଳୀନ-ଅନୁରୋଧ ଛାତ।
- **ସ୍ଥାନୀୟ ଧାଡି, କ no ଣସି ଆବିଷ୍କାର ନାହିଁ:** ବିଦ୍ୟମାନ queue/timeout ସେମାଣ୍ଟିକ୍ସ (ଟାଇପ୍ ହୋଇଥିବା `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ଆଡମିଶନ ତ୍ରୁଟି) ସହିତ ଅତିରିକ୍ତ ଅନୁରୋଧ ସ୍ଥାନୀୟ ଭାବରେ ଧାଡି। OmniRoute ଅପଷ୍ଟ୍ରିମ ପଲିସି ଆବିଷ୍କାର କରେ ନାହିଁ କିମ୍ବା ଅନୁମାନ କରେ ନାହିଁ — ଏହା ଅପରେଟର ବିନ୍ୟାସିତ ସଠିକ ଛାତକୁ କାର୍ଯ୍ୟକାରୀ କରିଥାଏ। ଏକ ସନ୍ତୁଳିତ ମଡେଲ୍ ଗେଟ୍ ପ୍ରଦାନକାରୀଙ୍କୁ କେବେ ବି ଅକ୍ଷମ କରେ ନାହିଁ ଏବଂ ସ୍ଥାୟୀ ମଡେଲ୍ ଲକଆଉଟ୍ ସୃଷ୍ଟି କରେ ନାହିଁ। ଅପଷ୍ଟ୍ରିମ 429/cooldown/fallback ଆଚରଣ ତ୍ରୁଟି ବ୍ୟାକଷ୍ଟପ୍ ରହିଥାଏ।
- **ପ୍ରତି-ସଂଯୋଗ, ପ୍ରତି-ପ୍ରକ୍ରିୟା ପରିସର:** କ୍ୟାପ୍ସ ଡାଟାବେସ୍ ସଂଯୋଗ ପ୍ରତି ଏବଂ ମେମୋରୀରେ ରଖାଯାଇଥାଏ, ତେଣୁ ସମାନ ଅପଷ୍ଟ୍ରିମ୍ API କି ବ୍ୟବହାର କରୁଥିବା ଦୁଇଟି ସଂଯୋଗ ପରସ୍ପର ସହିତ ସମନ୍ୱୟ କରନ୍ତି ନାହିଁ।
- **ଅସଂଗଠିତ ଅର୍ଥ ଅପରିବର୍ତ୍ତିତ:** ମାନଚିତ୍ରକୁ ବାଦ ଦେବା (କିମ୍ବା ଡ୍ୟାସବୋର୍ଡ ଫିଲ୍ଡକୁ ଖାଲି ଛାଡିବା) କ model ଣସି ମଡେଲ ଗେଟ୍ ଯୋଗ କରେ ନାହିଁ। କ universal ଣସି ସର୍ବଭାରତୀୟ ପ୍ରଦାନକାରୀ ସୀମା ନଦେଇ ଉଦାହରଣ ବିନ୍ୟାସ:

```text
glm-5=1
glm-4.7=3
```

### କୋଟା-ସେୟାର ଅନୁରୋଧ କ୍ରମିକୀକରଣ।

ଯେତେବେଳେ ଏକ କୋଟା-ସେୟାର ପ୍ରେରଣ ଏକ ସଂଯୋଗକୁ ଟାର୍ଗେଟ୍ କରେ ଯାହା ଏକ ସକାରାତ୍ମକ `max_concurrent` ଘୋଷଣା କରେ, ସେହି ସମୟରେ ଏକକାଳୀନ ଅନୁରୋଧ।** ଖାତା** ପ୍ରତି-ସଂଯୋଗ ସେମାଫୋର (କି `qsconn:<connectionId>`) ମାଧ୍ୟମରେ କ୍ରମିକ ହୋଇଛି: ଅତିରିକ୍ତ ଅନୁରୋଧ।** ଧାଡିରେ ଅପେକ୍ଷା କର।** ଖାତାକୁ ବନ୍ୟା କରିବା ପରିବର୍ତ୍ତେ। ଏହା ହେଉଛି।** ବିଫଳ-ଖୋଲା।** — ଏକ ପ୍ରେରିତ ଅନୁରୋଧକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରିବା ପରିବର୍ତ୍ତେ ଏକ ସ୍ଲଟ୍ ବିନା ଏକ ସନ୍ତୁଳିତ ଧାଡି କିମ୍ବା ସମୟ ସମାପ୍ତି। ଟୋଗଲ୍ କରନ୍ତୁ।** ସେଟିଂସମୂହ → ସ୍ଥିରତା → ପ୍ରତି ସଂଯୋଗ ସମନ୍ୱୟ କୋଟା-ଅଂଶୀଦାର।** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ଡିଫଲ୍ଟ ଅନ୍)। `max_concurrent` କ୍ୟାପ୍ ବିନା ଆଚରଣ ଅପରିବର୍ତ୍ତିତ।

> କୋଟା-ସେୟାର ରାଉଟିଙ୍ଗ୍ ଗେଟ୍ (`selectQuotaShareTarget`, DRR + P2C) ନିଜେ ବିଫଳ-ଖୋଲା ଏବଂ କେବଳ _deprioritizes_ ଏକ-କ୍ୟାପ୍ କନେକ୍ସନ୍ — ସହିତ ଏକ-ସଂଯୋଗ ପୁଲ୍ ସହିତ ଏହା କଠିନ ସୀମା କରିପାରିବ ନାହିଁ, ତେଣୁ ଏହି ସେମାଫୋର ପ୍ରକୃତରେ ବନ୍ୟା ଧାରଣ କରିଥାଏ।

### କମ୍ବୋ କୁଲଡାଉନ୍-ସଚେତନ ପୁନ ry ଚେଷ୍ଟା।

ପ୍ରତ୍ୟେକ କମ୍ବୋ ରଣନୀତି ପାଇଁ (ଯେତେବେଳେ ସକ୍ଷମ ହୁଏ), ଏକ ଅନୁରୋଧ ଯାହାକି ଏକ SHORT କ୍ଷଣସ୍ଥାୟୀ କୁଲଡାଉନ୍ ପାଇଁ ଏକ 429 ସ୍ଫଟିକ୍ କରେ ଏବଂ ଏହାକୁ ଅପେକ୍ଷା କରିଥାଏ ଏବଂ 429 — ଫେରାଇବା ପରିବର୍ତ୍ତେ ପୁନ-ପଠାଇଥାଏ, ଏହା ମିଥୁନ-ଶ୍ରେଣୀ TPM/RPM ୱିଣ୍ଡୋକୁ (~ 60s ପୁନ ry ଚେଷ୍ଟା ପରେ) ମଲ୍ଟି-ମଡେଲ୍ କମ୍ବୋ ଉପରେ ଧାରଣ କରିଥାଏ, ଯଥା 2-ମଡେଲ୍ କମ୍ବୋ ପ୍ରତି ଟାର୍ଗେଟ୍ ପ୍ରତି ମଡେଲ୍ ହାରରେ। `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ରେ ସୀମିତ।** ସେଟିଂସମୂହ → ସ୍ଥିରତା।** । ଏହା `quota_exhausted` (ମଧ୍ୟରାତ୍ରି ପର୍ଯ୍ୟନ୍ତ ଲକ୍) କିମ୍ବା auth/not-found କାରଣରୁ କେବେବି ଅପେକ୍ଷା କରେ ନାହିଁ। `comboTimeoutMs` ସେଟ୍ ସହିତ, ଏକ ଅପେକ୍ଷା ଯାହା ସେହି ସମୟସୀମା ଆରମ୍ଭ ହେବା ପୂର୍ବରୁ ଶେଷ ହୋଇପାରିବ ନାହିଁ (#18998): କମ୍ବୋ `COMBO_TIMEOUT` 504 ପରିବର୍ତ୍ତେ ଏହାର ଟର୍ମିନାଲ୍ ପ୍ରତିକ୍ରିୟା ସହିତ ଥରେ ଉତ୍ତର ଦେଇଥାଏ।

ଏକ କମ୍ବୋ `config.comboCooldownWaitEnabled: false` ସହିତ ଅପ୍ଟ ଆଉଟ୍ କରିପାରିବ। କେବଳ ଆକ୍ଷରିକ `false` ଏହି ଅଂଶୀଦାର କମ୍ବୋ ଅପେକ୍ଷା (ପୋଷ୍ଟ-ପଠାଇବା କୁଲଡାଉନ୍ ଏବଂ ପ୍ରି-ପଠାଇବା circuit-open/model-lock ଅପେକ୍ଷା) ଏବଂ ସେମାନଙ୍କର ଅପେକ୍ଷା-ବଜେଟ୍ ସମୟ ସମାପ୍ତ-ଚଟାଣ ବିସ୍ତାରକୁ ଅକ୍ଷମ କରିଥାଏ। ନିଖୋଜ କିମ୍ବା `true` ବିଶ୍ୱ ନୀତି ସଂରକ୍ଷଣ କରେ; `true` ସର୍ବଭାରତୀୟ ସ୍ତରରେ ଅକ୍ଷମତାକୁ ଅପେକ୍ଷା କରିପାରିବ ନାହିଁ। ଏକ ସ୍ପଷ୍ଟ `targetTimeoutMs` ତଥାପି ଜିତେ। ଏହି ଅପ୍ଟ-ଆଉଟ୍ ଅଲଗା ଦେଶୀ-କୋଡେକ୍ସ ଟର୍-ପିନ୍ ପ୍ରି-ପଠାଇବା ଅପେକ୍ଷା ପରିବର୍ତ୍ତନ କରେ ନାହିଁ।

ସମାନ ଗେଟ୍ ପ୍ରି-ପଠାଇବା ମାମଲା (#16319) କୁ ଆବୃତ କରେ: ଯେତେବେଳେ କ com ଣସି ପ୍ରୟାସ କରିବା ପୂର୍ବରୁ କମ୍ବୋ ର ପ୍ରତ୍ୟେକ ଟାର୍ଗେଟ୍ ଏଡ଼ାଇ ଦିଆଯାଏ କାରଣ ଏହାର ମଡେଲ୍ ଏକ ସ୍ୱଳ୍ପ କ୍ଷଣସ୍ଥାୟୀ ଲକଆଉଟ୍ ରେ ବସିଥାଏ, ଶୂନ-ପ୍ରୟାସ ପଥ ସମାନ ଛାତ ତଳେ ଲକ୍କୁ ଅପେକ୍ଷା କରିଥାଏ ଏବଂ `503 ALL_TARGETS_SKIPPED` ଉତ୍ତର ଦେବା ପରିବର୍ତ୍ତେ ପୁନ-ପଠାଇଥାଏ। ଯେତେବେଳେ କ wait ଣସି ଅପେକ୍ଷାକୁ ଅନୁମତି ଦିଆଯାଏ ନାହିଁ (ଛାତ, ପ୍ରୟାସ କିମ୍ବା ବଜେଟ୍ କ୍ଳାନ୍ତ, କିମ୍ବା ବ feature ଶିଷ୍ଟ୍ୟ ବନ୍ଦ), ଟର୍ମିନାଲ୍ ପ୍ରତିକ୍ରିୟା `429 rate_limit_error` କୁ `retry_after` / `reset_at` ବହନ କରୁଥିବା ପ୍ରାଥମିକ କ୍ଷଣସ୍ଥାୟୀ ଲକ୍ ସମାପ୍ତିରୁ ଅପଗ୍ରେଡ୍ କରେ। କୋଟା, auth ଏବଂ ମିଳିନଥିବା ଲକ୍ଗୁଡ଼ିକ ସୂଚକ -350 ରଖେ।

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

## 7. ଅପସ୍ଟ୍ରିମ୍ ସ୍ଥିତି ପୁନଃନିର୍ଦ୍ଧାରଣ (ଭୁଲ ଭାବେ ପ୍ରଦର୍ଶିତ quota ତ୍ରୁଟି)

**ପରିସର:** ଗୋଟିଏ ଅପସ୍ଟ୍ରିମ୍ gateway, ଯାହା ସାମୟିକ quota ଶେଷ ହେବାକୁ ଭୁଲ HTTP status ସହିତ ରିପୋର୍ଟ କରେ।

**ଉଦ୍ଦେଶ୍ୟ:** ବର୍ଗୀକରଣ ପୂର୍ବରୁ ଏକ ଭ୍ରମଜନକ status ସଠିକ କରିବା, ଯାହାଦ୍ୱାରା downstream consumerଗୁଡ଼ିକ (fallback engine, combo aggregation, client-facing response) ବିଫଳତାର ପ୍ରକୃତ retryable ସ୍ୱଭାବ ଦେଖିପାରିବେ।

କିଛି gateway TEMPORARY quota ଶେଷ ହେବାକୁ retry ନ କରିବାଯୋଗ୍ୟ HTTP
status ସହିତ ସଙ୍କେତ କରେ। `agentrouter.org` ମାନକ `429` ପରିବର୍ତ୍ତେ ଚୀନୀ body
(`用户额度不足` / `额度不足`) ସହିତ `403` (କେବେ କେବେ `400`) ଫେରାଏ। Claude
Code ପରି clientଗୁଡ଼ିକ `403`କୁ ସ୍ଥାୟୀ ଭାବେ ଗ୍ରହଣ କରି sessionକୁ ବନ୍ଦ କରିଦିଅନ୍ତି, ଏବଂ ସଂଶୋଧନ ବିନା
fallback engine ଏହାକୁ quota event ପରିବର୍ତ୍ତେ `AUTH_ERROR` ଭାବେ ବର୍ଗୀକୃତ କରିବ।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — ପ୍ରତ୍ୟେକ
  provider ପାଇଁ ନିୟମଗୁଡ଼ିକର ଏକ ତାଲିକା (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` ମାଧ୍ୟମରେ ମେଳ କରାଯାଏ।
- Call site: `open-sse/handlers/chatCore.ts`ର
  `providerFailure:` block (ପ୍ରାୟ line 3654), `parseUpstreamError()` ଏକ error HTTP
  status (`!providerResponse.ok`) ସହିତ upstream responseକୁ parse କରିବାର ଠିକ ପରେ,
  ଏବଂ କୌଣସି classification ଚାଲିବା ପୂର୍ବରୁ, ଯାହାଦ୍ୱାରା ପ୍ରତ୍ୟେକ downstream consumer
  ସଂଶୋଧିତ status ଦେଖିପାରିବ। `200` SSE stream ଭିତରେ ଥିବା errorଗୁଡ଼ିକ ଏକ ପୃଥକ,
  ପରବର୍ତ୍ତୀ stream-parsing path ଅନୁସରଣ କରନ୍ତି ଏବଂ ଆଜି ଏହି hook ଦ୍ୱାରା
  ଆବୃତ ନୁହନ୍ତି — ଏହା ଏକ ଜଣାଶୁଣା ସୀମାବଦ୍ଧତା, ଯାହା ଏପର୍ଯ୍ୟନ୍ତ agentrouterର
  misstatus ପାଇଁ ଆବଶ୍ୟକ ହୋଇନାହିଁ (ଯାହା error HTTP status ଭାବେ ପ୍ରକାଶ ପାଏ)।
- Retry eligibility: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`ରେ ଅଛି
  (`open-sse/services/combo/unavailableRetryGate.ts`), ତେଣୁ restated error ଏକ
  ନିଷ୍କ୍ରିୟ `403` ଭାବେ ପ୍ରକାଶ ପାଇବା ପରିବର୍ତ୍ତେ ପ୍ରକୃତ retry window ବହନ କରେ।
- Synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  କେବଳ restated response ଦ୍ୱାରା **client**କୁ କୁହାଯାଉଥିବା ସମୟ; ଏହା connectionର
  ଆଭ୍ୟନ୍ତରୀଣ cooldown/lockout ଅବଧି ନୁହେଁ — ତାହା restated errorକୁ ପ୍ରକୃତରେ
  ହାତଲ କରୁଥିବା ଯନ୍ତ୍ରଣା ଦ୍ୱାରା ପୃଥକ ଭାବେ ନିୟନ୍ତ୍ରିତ ହୁଏ
  (Connection Cooldownର ବଢ଼ୁଥିବା backoff, §2, API-key providerଗୁଡ଼ିକ ପାଇଁ base
  `3s`; କିମ୍ବା per-model-quota provider ଯଥା agentrouter ପାଇଁ Model Lockout, §3)।
  clientକୁ ଘୋଷଣା କରାଯାଇଥିବା 60s window ଠାରୁ router ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ ଶୀଘ୍ର
  retry ପାଇଁ eligible ହୋଇପାରେ — ଏହା ଇଚ୍ଛାକୃତ headroom, bug ନୁହେଁ।

ସ୍ଥାୟୀ errorଗୁଡ଼ିକ (`agentrouter`ର `无权访问模型` — ଏହି model ପାଇଁ କୌଣସି
access ନାହିଁ) କେବେବି restate କରାଯାଏ ନାହିଁ: `excludeMarkers` ନିୟମକୁ veto
କରେ, ଯଦିଓ `textMarkers` ମେଳ ଖାଏ, ତେଣୁ error ନିଜର ମୂଳ status ରଖେ ଏବଂ ଏହା
ଅନନ୍ତକାଳ ପାଇଁ retry ହୁଏ ନାହିଁ। ମେଳ ଖାଉଥିବା provider classification rule
(`open-sse/config/providerErrorRules.ts`ର
`agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, ଘୋଷିତ `6h` base cooldown)
`checkFallbackError` (`open-sse/services/accountFallback.ts`) ଦ୍ୱାରା
generic apikey-category `FORBIDDEN` early-return _ପୂର୍ବରୁ_ ପରୀକ୍ଷା କରାଯାଏ,
`honorsRuleLockScope(provider)` ଉପରେ ନିର୍ଭରଶୀଳ (#10334 — ବର୍ତ୍ତମାନ
`providerErrorRules.ts`ର `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ମାଧ୍ୟମରେ
କେବଳ agentrouter ପାଇଁ)। ନିୟମର ଘୋଷିତ 6h cooldown
`fallbackResult.baseCooldownMs` ଭାବେ ଆଗକୁ ପଠାଯାଏ, କିନ୍ତୁ ଏହା ତଥାପି ପୂର୍ବରୁ
ଥିବା per-model-quota lockout path
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`)କୁ feed କରେ (#10334 ଦ୍ୱାରା cooldown source
ଛଡ଼ା ଅନ୍ୟ କିଛି ପରିବର୍ତ୍ତିତ ହୋଇନାହିଁ): ପ୍ରତ୍ୟେକ ଅନ୍ୟ model lockout ପରି ଏହା
operatorର `mlSettings.maxCooldownMs` (default `1_800_000ms` / 30min) ପର୍ଯ୍ୟନ୍ତ
କମାଇ ଦିଆଯାଏ, ଏବଂ _persisted lockout reason_ ପୂର୍ବରୁ ଥିବା hardcoded
`"forbidden"` ହିଁ ରହେ, ନିୟମର `"auth_error"` ନୁହେଁ — end-to-end ଭାବେ କେବଳ
cooldown ଅବଧିକୁ ମାନ୍ୟତା ଦିଆଯାଏ, reason stringକୁ ନୁହେଁ। connection ନିଜେ
ସକ୍ରିୟ ରହେ; ସେହି connectionର sibling modelଗୁଡ଼ିକ ପ୍ରଭାବିତ ହୁଅନ୍ତି ନାହିଁ।

Restated quota errorଗୁଡ଼ିକ (`额度不足`) productionରେ ଏକ provider ruleରେ ପହଞ୍ଚେ
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ନିଜସ୍ୱ କୌଣସି ଘୋଷିତ cooldown ନାହିଁ — persistence layerର scaled
backoff default ପ୍ରୟୋଗ ହୁଏ)। #10334 ପରଠାରୁ,
`ProviderErrorRuleMatch`ର `scope` end-to-end ଭାବେ ବ୍ୟବହୃତ ହୁଏ, କିନ୍ତୁ
କେବଳ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistର providerଗୁଡ଼ିକ ପାଇଁ
(`providerErrorRules.ts` — ଆଜି କେବଳ `"agentrouter"`, `honorsRuleLockScope()`
ମାଧ୍ୟମରେ gated)। ଅନ୍ୟ ପ୍ରତ୍ୟେକ provider ପାଇଁ `scope` ପୂର୍ବପରି
informational ହିଁ ରହେ, #10334 ପୂର୍ବରୁ ଯେପରି ଥିଲା ସେହିପରି।
`checkFallbackError` ମେଳ ଖାଇଥିବା ruleର scopeକୁ `fallbackResult.ruleScope` ଭାବେ
ପ୍ରକାଶ କରେ; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ହେଉଛି ସାଧାରଣ guard, ଯାହା ନିଶ୍ଚିତ କରେ ଯେ
`ruleScope`କୁ connection-wide, self-recovering signal ଭାବେ ସୁରକ୍ଷିତ ଭାବେ
ମାନ୍ୟ କରାଯାଇପାରିବ (scope `"connection"`, reason `quota_exhausted`, କେବେବି
`permanent` ନୁହେଁ, କେବେବି `creditsExhausted` ନୁହେଁ — ଭବିଷ୍ୟତରେ
scope `"connection"`କୁ permanent account state ସହିତ ଯୋଡ଼ିଦିଆଯିବା ବିରୁଦ୍ଧରେ
ଏକ ସୁରକ୍ଷା)। ଦୁଇଟି consumer ଏହାକୁ ଡାକନ୍ତି:

- **ସ୍ଥାୟୀକରଣ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-providerର **ପ୍ରତି-ମଡେଲ୍** ଲକଆଉଟ୍
  ଶାଖାକୁ ଯିବା ପରିବର୍ତ୍ତେ (agentrouter ହେଉଛି
  `passthroughModels: true` → `hasPerModelQuota()` `true` ଫେରାଏ), ଏହା
  ଏକ **ଅସ୍ଥାୟୀ ସଂଯୋଗ କୁଲ୍ଡାଉନ୍** ପ୍ରୟୋଗ କରେ —
  `testStatus: "unavailable"` + `rateLimitedUntil`, କେବେ ମଧ୍ୟ ଏକ ଚୂଡ଼ାନ୍ତ ସ୍ଥିତି
  (`credits_exhausted`/`banned`/`expired`) ନୁହେଁ — ଯାହା ଫଳରେ ମାନୁଆଲ୍
  credential reset ଆବଶ୍ୟକ ନହୋଇ, କୁଲ୍ଡାଉନ୍ ସମାପ୍ତ ହେଲେ ସଂଯୋଗଟି
  ନିଜେ ପୁନରୁଦ୍ଧାର ହୁଏ।
  `disableCooling: true` ଥିବା ସଂଯୋଗଗୁଡ଼ିକ ପାଇଁ ଏହା ଛାଡ଼ି ଦିଆଯାଏ
  (#2997): ସେହି opt-out ପରିବର୍ତ୍ତେ ପ୍ରତି-ମଡେଲ୍ ଲକଆଉଟ୍କୁ ଯାଏ (ଏହା ଏକ
  ଡକ୍ୟୁମେଣ୍ଟ କରାଯାଇଥିବା trade-off — ଶାଖା ଉପରେ ଥିବା କୋଡ୍ କମେଣ୍ଟ
  ଦେଖନ୍ତୁ)।
- **ସମାନ-ଅନୁରୋଧ combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ସେହି guard ସଂଯୋଗକୁ
  memoryରେ ଥିବା `exhaustedConnections` setରେ
  `${provider}:${connectionId}` ଦ୍ୱାରା ଚିହ୍ନିତ କରେ। ଏହା କେବଳ ଅବଶିଷ୍ଟ
  SAME-REQUEST targetକୁ skip କରେ, ଯଦି _ସେହି target ନିଜେ ନିଜ target objectରେ
  ସେହି exact `connectionId` ବହନ କରେ_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` lookup
  ପୂର୍ବରୁ `if (provider && connectionId)`) — ଏକ ସାଧାରଣ
  model-list comboରେ, sibling targetଗୁଡ଼ିକ ନିଜସ୍ୱ pinned `connectionId`
  ବହନ କରନ୍ତି ନାହିଁ ଏବଂ ପ୍ରତ୍ୟେକଟି କେବଳ ପ୍ରତ୍ୟେକ dispatch ସମୟରେ responseର
  `X-OmniRoute-Selected-Connection-Id` headerରୁ resolve ହୁଏ, ତେଣୁ ସେହି key
  match କେବେ ହୁଏ ନାହିଁ। ସେହି ସାଧାରଣ କ୍ଷେତ୍ରରେ, ଅବଶିଷ୍ଟ leg ଦ୍ୱାରା
  ସଦ୍ୟ-exhausted account ପୁନଃବ୍ୟବହାର ନହେବାର ପ୍ରକୃତ ସୁରକ୍ଷା ଏହି Set ନୁହେଁ —
  ଏହା ଉପରୋକ୍ତ persistence layer (`rateLimitedUntil` ବର୍ତ୍ତମାନ ଭବିଷ୍ୟତ
  ସମୟରେ ଅଛି) ସହିତ ଏହି same guard failure ପାଇଁ
  `transientRateLimitedProviders`କୁ suppress କରିବାର ଫଳ ( `targetExhaustion.ts`ର
  `isAgentrouterConnectionQuotaScope` branch ଉପରେ ଥିବା code comment ଏବଂ
  "ଦୁଇ-ପର୍ଯ୍ୟାୟ ଡିଜାଇନ୍" ଦେଖନ୍ତୁ): Setକୁ ଚିହ୍ନିତ ନକରି ରଖିଲେ,
  `combo.ts`ର `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) providerର ଅବଶିଷ୍ଟ
  legଗୁଡ଼ିକ ପାଇଁ ସକ୍ରିୟ ହୁଏ ନାହିଁ। ତେଣୁ credential selectionର
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) ସାଧାରଣ ଭାବେ
  ମାନ୍ୟ ହୁଏ ଏବଂ ଅବଶିଷ୍ଟ leg ଅନ୍ୟ, ଏଯାବତ୍ eligible agentrouter
  connection ବାଛେ କିମ୍ବା credentials ଉପଲବ୍ଧ ନଥିବାରୁ ବିଫଳ ହୁଏ — ଏହି
  branch ଦ୍ୱାରା ଏମାତ୍ର cooled-down ହୋଇଥିବା connection ଉପରେ ଜୋରକରି
  ପୁନଃ ଯାଏ ନାହିଁ।

### ଦୁଇ-ପର୍ଯ୍ୟାୟ ଡିଜାଇନ୍: status restatement, ପରେ classification

Status restatement (`upstreamStatusRestatement.ts`) ଏବଂ provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ଦୁଇଟି ପୃଥକ registry, ଯେଉଁମାନେ provider id
ଏବଂ text markers ଉପରେ key କରନ୍ତି, କିନ୍ତୁ ଭିନ୍ନ ସ୍ଥାନରେ ଚାଲନ୍ତି ଏବଂ
ଭିନ୍ନ ଉଦ୍ଦେଶ୍ୟ ପୂରଣ କରନ୍ତି: restatement `chatCore.ts`ରେ ଶୀଘ୍ର HTTP
statusକୁ ପୁନଃଲେଖନ କରେ; classification rules
`checkFallbackError()` (`open-sse/services/accountFallback.ts`) ମଧ୍ୟରେ
fallback `reason` ବାଛନ୍ତି ଏବଂ `scope`
(`model` / `provider` / `connection`) lock କରନ୍ତି।

`providerErrorRules.ts`ର `FULL_TEXT_RULE_PROVIDERS` allowlistରେ ଥିବା
providerଗୁଡ଼ିକ ପାଇଁ classification rules କେବଳ ସମ୍ପୂର୍ଣ୍ଣ error
**text** ଦେଖନ୍ତି ( `额度不足` ପରି body markers ମେଳାଇବା ପାଇଁ ଏହା
ଆବଶ୍ୟକ) — ବର୍ତ୍ତମାନ କେବଳ `"agentrouter"`। ଅନ୍ୟ ପ୍ରତ୍ୟେକ
**built-in catalog** provider ପାଇଁ, `checkFallbackError`
`getProviderErrorRuleMatch`କୁ କେବଳ structured error (`{code, type}`) ଦିଏ,
ଯାହା header/status/code-ଆଧାରିତ rules ପାଇଁ ପର୍ଯ୍ୟାପ୍ତ, କିନ୍ତୁ
body-text markers ପାଇଁ ଅନ୍ଧ। Helper `resolveRuleMatchBody()` ଏହି
ଚୟନ କରେ: allowlistରେ ଥିବା provider ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ error text,
ଅନ୍ୟଥା structured error। ଏକ **built-in** providerକୁ
`FULL_TEXT_RULE_PROVIDERS`ରେ ଯୋଡ଼ିବା ହେଉଛି ପ୍ରତ୍ୟେକ provider ପାଇଁ ଏକ
ସ୍ପଷ୍ଟ opt-in — ଏହା ରହିଛି ଯାହାଦ୍ୱାରା listରେ ନଥିବା ପ୍ରତ୍ୟେକ providerର
default path byte-for-byte ଅପରିବର୍ତ୍ତିତ ରହେ।

ଏକ ruleର `scope` (`model` / `provider` / `connection`) ହେଉଛି
`FULL_TEXT_RULE_PROVIDERS`ଠାରୁ ପୃଥକ ଏକ opt-in:
`checkFallbackError` ଏହାକୁ କେବଳ `fallbackResult.ruleScope` ଭାବେ
ପ୍ରକାଶ କରେ, ଏବଂ downstream consumerମାନେ ଏହାକୁ ସୂଚନାମୂଳକ labelଠାରୁ
ଅଧିକ କିଛି ଭାବେ କେବଳ ସେହି fileର
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistରେ ଥିବା provider ପାଇଁ
ମାନନ୍ତି (`honorsRuleLockScope()` ମାଧ୍ୟମରେ gated — ବର୍ତ୍ତମାନ କେବଳ
`"agentrouter"`)। ଏକ provider ସେହି allowlistରେ ଥିଲେ
`scope: "connection"` match ପ୍ରକୃତରେ କଣ କରେ, ତାହା ପାଇଁ ଉପରୋକ୍ତ
"Restated quota errors" ଦେଖନ୍ତୁ।

**#11104 — operator-declared rules ଉଭୟ allowlistକୁ bypass କରେ।**
ଏକ operator `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ମାଧ୍ୟମରେ runtimeରେ ପ୍ରତ୍ୟେକ provider ପାଇଁ ଏକ rule declare କରିପାରେ,
ଏହି fileକୁ ସମ୍ପାଦନ ନକରି। ଏକ operator ruleକୁ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ଦ୍ୱାରା
gating କରିବା — ଯେଉଁ allowlistଗୁଡ଼ିକ **default** built-in catalog rulesର
ବ୍ୟବହାରକୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ଉଦ୍ଦିଷ୍ଟ — settings mechanismକୁ
ସେଠାରେ ପୂର୍ବରୁ ଥିବା provider ବ୍ୟତୀତ ପ୍ରତ୍ୟେକ provider ପାଇଁ ନିଷ୍କ୍ରିୟ
କରିଦେବ, କାରଣ rule declare କରିବା ନିଜେ operatorଙ୍କର ସ୍ପଷ୍ଟ opt-in।
`resolveRuleMatchBody()` ଏବଂ `honorsRuleLockScope()` ଉଭୟ
`hasOperatorRuleForProvider()`କୁ ପ୍ରଥମେ ଯାଞ୍ଚ କରନ୍ତି: operator rule
ଥିବା provider raw error text ପାଏ ଏବଂ ଏହାର declared `scope`କୁ ମାନେ,
ସେହି provider ଅନ୍ୟ କୌଣସି allowlistରେ ଥାଉ କିମ୍ବା ନଥାଉ।

**Operator-declared rules** (`OperatorProviderErrorRule`): ପ୍ରତ୍ୟେକ
ruleରେ ଏକ optional `status` ଏବଂ ଏକ optional `match` ଥାଏ
(`match` ହେଉଛି error textର ଏକ ସରଳ, case-insensitive substring, କେବେ
ମଧ୍ୟ RegExp ନୁହେଁ, ତେଣୁ ଏହା ReDoS ସୃଷ୍ଟି କରିପାରେ ନାହିଁ), ଏବଂ ଦୁଇଟି
ମଧ୍ୟରୁ ଅତିକମରେ ଗୋଟିଏ ସେଟ୍ କରିବା ଆବଶ୍ୟକ। ଉଭୟ ସେଟ୍ ଥିଲେ ସେମାନେ
AND ଭାବେ ମେଳନ୍ତି; ଛାଡ଼ିଦିଆ field ଯେକୌଣସି କିଛି ସହିତ ମେଳେ, ତେଣୁ
`{match: "insufficient_quota"}` ସେହି code ବହନ କରୁଥିବା ଯେକୌଣସି
status ସହିତ ମେଳେ। ପ୍ରଥମେ ମେଳୁଥିବା rule ଜିତେ।
`cooldownMs` ସର୍ବାଧିକ 30 ଦିନ ପର୍ଯ୍ୟନ୍ତ ଗ୍ରହଣ କରେ; ମୋଟ ସର୍ବାଧିକ
50ଟି rule ରହିପାରେ।

**ସମସ୍ତ ପାଇଁ ପ୍ରୟୋଜ୍ୟ ଡିଫଲ୍ଟ** (`settings.providerErrorDefaults`, ଇଚ୍ଛାଧୀନ, `setOperatorProviderErrorDefaults` ମାଧ୍ୟମରେ ସେଟ୍ କରାଯାଏ): `{[provider]: {cooldownMs, scope?, reason?}}`
ଯେଉଁଠାରେ `cooldownMs` 1 ମିନିଟ୍ରୁ 30 ଦିନ ପର୍ଯ୍ୟନ୍ତ ହୋଇପାରେ। କୌଣସି operator ନିୟମ ଏବଂ କୌଣସି built-in catalog ନିୟମ ମେଳ ନଖାଇଲେ ମାତ୍ର ଏକ ଡିଫଲ୍ଟ ପ୍ରୟୋଗ ହୁଏ, ଏବଂ କେବଳ 402, 403, 408, 429 ଓ 5xx ତ୍ରୁଟିଗୁଡ଼ିକ ପାଇଁ। Request-shape ତ୍ରୁଟିଗୁଡ଼ିକ (400, 404, 409, 413, 422) ଏବଂ ଖାଲି 401 ତ୍ରୁଟିଗୁଡ଼ିକ ନିଜସ୍ୱ handling ଜାରି ରଖେ। ସ୍ପଷ୍ଟ `reason` ନଥିଲେ, `classifyError` ଯେପରି କରେ ସେହିପରି status ଠାରୁ reason ଆସେ। ଏକ ଡିଫଲ୍ଟ ଘୋଷଣା କରିବା `hasOperatorRuleForProvider()` ପାଇଁ ଏକ operator ନିୟମ ଭାବେ ଗଣାଯାଏ, ତେଣୁ ଏହାର `scope` (ଡିଫଲ୍ଟ ଭାବେ `"connection"`) ମାନ୍ୟ ହୁଏ। ଏକ ଡିଫଲ୍ଟର ପ୍ରଭାବଶୀଳ cooldown ହେଉଛି ଏହାର `cooldownMs` ଏବଂ provider ର ନିଜସ୍ୱ retry hint (`Retry-After`, `x-ratelimit-reset` କିମ୍ବା body ଭିତରେ ଥିବା reset hint, ଅର୍ଥାତ୍ connection-cooldown ସେଟିଂ "use upstream retry hints" ଚାଲୁ ଥିବାବେଳେ engine ଯେଉଁ ସମାନ hint ମାନେ) ମଧ୍ୟରୁ ଅଧିକ ସମୟ; ତେଣୁ ଏକ ଡିଫଲ୍ଟ ଛୋଟ upstream hint କୁ ବଢ଼ାଇପାରେ, କିନ୍ତୁ ପ୍ରକୃତ reset କୁ କେବେ ମଧ୍ୟ କମାଇପାରେ ନାହିଁ। ଏକ ସ୍ପଷ୍ଟ operator ନିୟମ ଏହାର ସଠିକ୍ `cooldownMs` କୁ ରଖେ। `markAccountUnavailable` ରେ ଥିବା connection-cooldown guards କୁ କୌଣସି ନିୟମ କିମ୍ବା ଡିଫଲ୍ଟ ଅତିକ୍ରମ କରେ ନାହିଁ: ସକ୍ରିୟ, ଅଧିକ ସମୟର cooldown କେବେ ଛୋଟ କରାଯାଏ ନାହିଁ ଏବଂ terminal status କେବେ overwrite କରାଯାଏ ନାହିଁ। `checkFallbackError` ରେ ପୂର୍ବରୁ ଚାଲୁଥିବା built-in text detector ଗୁଡ଼ିକ (credits exhausted, daily quota, account deactivated) ନିଜସ୍ୱ phrase ପାଇଁ ଏବେ ମଧ୍ୟ ପ୍ରାଥମିକତା ପାଆନ୍ତି।

**ଜଣାଶୁଣା ଅଭାବ — `providerRuleRegistry` HTTP 400 ପାଇଁ କେବେ ପରାମର୍ଶ କରାଯାଏ ନାହିଁ।**
`checkFallbackError` ର `BAD_REQUEST` ଶାଖା ନିଜର pattern array (`accountFallback.ts` ରେ ଥିବା `MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` ଇତ୍ୟାଦି) ମାଧ୍ୟମରେ status 400 କୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବରେ classify କରେ ଏବଂ ଏହାର ଉପରେ ଥିବା `configuredRule`/`getProviderErrorRuleMatch` ଶାଖାକୁ ପହଞ୍ଚିବା ପୂର୍ବରୁ return କରେ। `status: 400` ଥିବା ଏକ built-in catalog ନିୟମ (କିମ୍ବା operator ନିୟମ) syntax ଦୃଷ୍ଟିରୁ ବୈଧ, କିନ୍ତୁ କେବେ ମଧ୍ୟ କାର୍ଯ୍ୟକାରୀ ହେବ ନାହିଁ। ଆଜି କୌଣସି ଅବସ୍ଥିତ ନିୟମ 400 କୁ target କରେ ନାହିଁ, ତେଣୁ production ରେ କିଛି ପ୍ରଭାବିତ ହୁଏ ନାହିଁ — କିନ୍ତୁ ଭବିଷ୍ୟତର 400 ନିୟମ ପାଇଁ ପ୍ରଥମେ ଏହି ଶାଖାକୁ ସ୍ପର୍ଶ କରିବା ଦରକାର, ଯାହା କେବଳ ଏକ ନିୟମ ଯୋଡ଼ିବାଠାରୁ ବଡ଼ ପରିବର୍ତ୍ତନ (pattern-array behavior ଉପରେ ନିର୍ଭର କରୁଥିବା ପ୍ରତ୍ୟେକ provider ପାଇଁ 400 କୁ ପୁନଃclassify କରିବ) ଏବଂ single-provider ନିୟମ ଯୋଡ଼ିବାର scope ବାହାରେ।

### ଏକ ନୂତନ quota-misstating gateway ଯୋଡ଼ିବା

1. `statusRestatementRegistry` ରେ (`open-sse/config/upstreamStatusRestatement.ts`) ଗୋଟିଏ ନିୟମ array ପଞ୍ଜୀକରଣ କରନ୍ତୁ। `textMarkers` କୁ provider-specific ରଖନ୍ତୁ; `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ସହିତ ଧକ୍କା ଖାଉଥିବା ସାଧାରଣ English phrase କେବେ ପୁନଃବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।
2. ସଠିକ୍ lock scope ବାଛିବା ପାଇଁ `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ରେ classification ନିୟମଗୁଡ଼ିକୁ ଇଚ୍ଛାଧୀନ ଭାବରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ (`connection` account-wide quota ପାଇଁ, `model` per-model ତ୍ରୁଟି ପାଇଁ)। ଏହି ପଦକ୍ଷେପ production ରେ କେବଳ ସେହି provider ମାନଙ୍କ ପାଇଁ କାର୍ଯ୍ୟକାରୀ ହୁଏ ଯାହାଙ୍କ ନିୟମ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ error text ଦରକାର (body markers): ସେହି file ରେ `FULL_TEXT_RULE_PROVIDERS` ରେ provider id ଯୋଡ଼ନ୍ତୁ — ନଚେତ୍ `checkFallbackError` ନିୟମକୁ କେବଳ structured `{code, type}` error ଦେଇଥାଏ ଏବଂ body-text ନିୟମ live traffic ରେ କେବେ ମେଳ ଖାଇବ ନାହିଁ। କେବଳ `status`/`headers` ଉପରେ match କରୁଥିବା ନିୟମଗୁଡ଼ିକ (ଯେପରିକି Opencode କିମ୍ବା Minimax ର) ପାଇଁ ଏହି opt-in ଦରକାର ନାହିଁ। ଏହାଠାରୁ ଅଲଗା ଭାବରେ, ଯଦି ନିୟମରେ `scope: "connection"` ଘୋଷିତ ହୋଇଛି ଏବଂ ଉଦ୍ଦେଶ୍ୟ ପ୍ରକୃତ connection-wide cooldown ସହିତ same-request combo skip (କେବଳ informational label ନୁହେଁ), ତେବେ ସେହି file ରେ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ରେ provider id ଯୋଡ଼ନ୍ତୁ — ଏହା `markAccountUnavailable()` (`src/sse/services/auth.ts`) ଏବଂ `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`) ରେ `isAgentrouterConnectionQuotaScope()`-style consumption କୁ gate କରେ; ଏହା ନଥିଲେ `scope` ଏବେ ମଧ୍ୟ `fallbackResult.ruleScope` ମାଧ୍ୟମରେ ପ୍ରବାହିତ ହୁଏ, କିନ୍ତୁ ଏହା ଉପରେ କୌଣସି କାର୍ଯ୍ୟ ହୁଏ ନାହିଁ।
3. `tests/unit/upstream-status-restatement.test.ts` ଏବଂ `tests/unit/agentrouter-error-rules.test.ts` ଅନୁସରଣ କରି unit test ଯୋଡ଼ନ୍ତୁ (ଏଥିରେ not-permanent / not-creditsExhausted guard ଗୁଡ଼ିକ ଏବଂ — provider ପାଇଁ allowlist ଦରକାର ହେଲେ — `resolveRuleMatchBody()` କେବଳ ସେହି provider ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ text ଫେରାଏ ବୋଲି ନିଶ୍ଚିତ କରୁଥିବା test ଅନ୍ତର୍ଭୁକ୍ତ ହେବା ଉଚିତ)।

`chatCore.ts`, `classifyError`, କିମ୍ବା combo ରେ କୌଣସି ପରିବର୍ତ୍ତନ ଦରକାର ନାହିଁ।

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` ରେ ଥିବା provider ମାନଙ୍କୁ (opencode family) IP-bucketed upstream ଭାବରେ ଧରାଯାଏ (opencode free tier account-bucketed ନୁହେଁ, IP-bucketed — #9611 ଦେଖନ୍ତୁ): `quota_exhausted`
**କିମ୍ବା** `rate_limit_exceeded` ଭାବରେ classify ହୋଇଥିବା status-429, rotation ସେମାନଙ୍କୁ ଚେଷ୍ଟା କରିବା ପୂର୍ବରୁ, failing connection ର ଶେଷ ଜଣାଶୁଣା egress IP ସହିତ ମେଳ ଖାଉଥିବା ପ୍ରତ୍ୟେକ allowlisted-family connection କୁ cooldown କରେ
— ଏହା N-1 ନିଶ୍ଚିତ ଭାବେ ବିଫଳ ହେବାକୁ ଥିବା upstream call କୁ ଏଡ଼ାଇଥାଏ (#10460/#10525 ପରି ସମାନ ଆକାର)। `rate_limit_exceeded` କୁ ଜାଣିଶୁଣି ଅନ୍ତର୍ଭୁକ୍ତ କରାଯାଇଛି: `markAccountUnavailable` path ରେ opencode-specific ନିୟମ କେବେ ମେଳ ଖାଏ ନାହିଁ (`checkFallbackError` କୁ କୌଣସି headers/body ଦିଆଯାଏ ନାହିଁ, opencode `FULL_TEXT_RULE_PROVIDERS` ରେ ନାହିଁ), ତେଣୁ subscription-quota text ("monthly usage limit
reached") ବହନ କରୁଥିବା 429 ର body କୁ quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) ମାଧ୍ୟମରେ `quota_exhausted` ଭାବରେ classify କରାଯାଏ, `status_429` ନିୟମ ପହଞ୍ଚିବା ପୂର୍ବରୁ — ଯେତେବେଳେ quota-text ନଥିବା 429 (ସାଧାରଣ rate limiting) `status_429` ନିୟମ ମାଧ୍ୟମରେ `rate_limit_exceeded` ଭାବରେ classify ହୁଏ ଏବଂ IP family କୁ ମଧ୍ୟ cooldown କରେ। ସୀମାଗୁଡ଼ିକ ସ୍ପଷ୍ଟ:

- **ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ**: ଲକ୍ `proxy_logs` ରୁ କନେକ୍ସନ୍ର ଶେଷ ଜଣା `egress_ip`
  (24 ଘଣ୍ଟିଆ ସମୟସୀମା, ସିଙ୍କ୍ରୋନସ୍, କ୍ୟାଶ୍ ବିନା) ସମାଧାନ କରେ। କ୍ୟାଶ୍ ଖାଲି ଥିଲେ
  (egress IP କେବେ ଯାଞ୍ଚ ହୋଇନାହିଁ) କିମ୍ବା କୌଣସି ରୋ ନଥିଲେ → ବିଫଳ ହୋଇଥିବା କନେକ୍ସନ୍କୁ
  ବ୍ରାଞ୍ଚ୍ ଦ୍ୱାରା ତଥାପି କୁଲ୍ଡାଉନ୍ କରାଯାଏ (ଆଜି ଯେପରି ରେକର୍ଡ ହୁଏ), କେବଳ କୌଣସି
  ସହୋଦରକୁ ଲକ୍ କରାଯାଏ ନାହିଁ।
- **କେବେ ମଧ୍ୟ ଟର୍ମିନାଲ୍ ନୁହେଁ**: କୁଲ୍ଡାଉନ୍ ଏକ ପୁନଃନବୀକରଣଶୀଳ କୋଟା ସମୟସୀମା
  (`testStatus: "unavailable"`) ଅଟେ; IP-ସ୍ତରୀୟ ସିଗ୍ନାଲ୍ରୁ କେବେ ମଧ୍ୟ ସ୍ଥାୟୀ ଅବସ୍ଥା
  ନିର୍ଣ୍ଣୟ ହୁଏ ନାହିଁ। `disableCooling` କନେକ୍ସନ୍ଗୁଡ଼ିକ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଏହି ବ୍ରାଞ୍ଚ୍କୁ
  ଏଡ଼ାଇଯାଆନ୍ତି।
- **ଅନୁମତି-ତାଲିକାଭୁକ୍ତ ପରିବାର ପାଇଁ ଲକ୍ର ଗ୍ରାନୁଲାରିଟି ପରିବର୍ତ୍ତିତ ହୁଏ**: ଏହା କେବଳ
  ସହୋଦର ଅପ୍ଟିମାଇଜେସନ୍ ନୁହେଁ, ଏକ ସ୍କୋପ୍ ପରିବର୍ତ୍ତନ। opencode ଏକ `passthroughModels`
  ପ୍ରୋଭାଇଡର୍, ତେଣୁ ଏହି ବ୍ରାଞ୍ଚ୍ ପୂର୍ବରୁ 429 ଏକ ପ୍ରତି-MODEL ଲକ୍ଆଉଟ୍ ସୃଷ୍ଟି କରୁଥିଲା;
  ବର୍ତ୍ତମାନ ଏହା ଏକ କନେକ୍ସନ୍ କୁଲ୍ଡାଉନ୍ ସୃଷ୍ଟି କରେ — ଏପରିକି କୌଣସି ସହୋଦର ନଥିବା
  ଏକମାତ୍ର କନେକ୍ସନ୍ ଚଲାଉଥିବା ଅପରେଟର୍ ପାଇଁ ମଧ୍ୟ। opencode ନିୟମ ଟେବୁଲ୍ ପୂର୍ବରୁ ଯେଉଁ
  ଗ୍ରାନୁଲାରିଟିକୁ ସଠିକ୍ ଘୋଷଣା କରିଛି (`scope: "connection"`,
  `providerErrorRules.ts`), ଏହା ସେହି ଗ୍ରାନୁଲାରିଟି — କିନ୍ତୁ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ଭିତରେ ନଥିବାରୁ ଏପର୍ଯ୍ୟନ୍ତ କେବେ ସମ୍ମାନିତ ହୋଇନଥିଲା।
  ଏହି ବ୍ରାଞ୍ଚ୍ ବିଫଳ ହୋଇଥିବା କନେକ୍ସନ୍ର କୁଲ୍ଡାଉନ୍ + `backoffLevel` ନିଜେ ଲେଖେ,
  connection-scoped agentrouter ବ୍ରାଞ୍ଚ୍ର ଅନୁକରଣ କରେ, ଏବଂ ଫେରିଯାଏ — ପ୍ରତି-ମଡେଲ୍
  ବ୍ଲକ୍ ଓ ତଳର ସାଧାରଣ ପଥ କେବେ ମଧ୍ୟ ପହଞ୍ଚାଯାଏ ନାହିଁ।
- **କମ୍ବୋ ଅନ୍ତର୍ଭୁକ୍ତ**: agentrouter ବ୍ରାଞ୍ଚ୍ ପରି, ଏହି ସ୍କୋପ୍ ଜାଣିଶୁଣି
  `persistUnavailableState`/`isCombo` ଡାଉନ୍ଗ୍ରେଡ୍କୁ ଅଣଦେଖା କରେ, ଯାହା ଏକ କମ୍ବୋ କଲର୍
  429 ଉପରେ ପ୍ରୟୋଗ କରେ। ଏକ ପ୍ରତି-ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ଏହି ସ୍କୋପ୍ର ଦୁର୍ବଳ ରୂପ ନୁହେଁ,
  ଏହା ଭୁଲ୍ ଏକକ: ଏହା ନିଷ୍ପତ୍ତି ହୋଇଯାଇଥିବା IP ବିଷୟରେ କିଛି କୁହେ ନାହିଁ, ତେଣୁ କମ୍ବୋ
  ରୋଟେସନ୍ ପ୍ରତ୍ୟେକ ସହୋଦର ପାଇଁ ଗ୍ୟାରାଣ୍ଟି ଭାବେ ବିଫଳ ହେବାକୁ ଥିବା ଗୋଟିଏ କଲ୍ ଜଳାଇ
  ଚାଲିଥାନ୍ତା।
- **ସହୋଦର ସୁରକ୍ଷା**: ପୂର୍ବରୁ ଟର୍ମିନାଲ୍ (banned/credits_exhausted) ଥିବା କିମ୍ବା ପୂର୍ବରୁ
  ଅଧିକ ଦୀର୍ଘ କୁଲ୍ଡାଉନ୍ରେ ଥିବା ସହୋଦରକୁ କେବେ ମଧ୍ୟ ଓଭର୍ରାଇଟ୍ କରାଯାଏ ନାହିଁ।
- **ଏକ୍ସକ୍ଲୁସିଭ୍ ଅନୁମତି-ତାଲିକା**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ବିସ୍ତାର କରିବା
  ଏକ ସ୍ପଷ୍ଟ ମାଲିକାନା ନିଷ୍ପତ୍ତି; କୌଣସି ସାଧାରଣ ୱାୟାରିଂ ନାହିଁ (pattern #10334/#10419)।
  ସହୋଦର କ୍ୱେରି ସେହି ଅନୁମତି-ତାଲିକାକୁ ବାନ୍ଧେ, ତାହାକୁ SQL ଲିଟେରାଲ୍ ଭାବେ ପୁନରାବୃତ୍ତି
  କରେ ନାହିଁ, ତେଣୁ ଏହାକୁ ବିସ୍ତାର କରିବା ଏକ-ଲାଇନ୍ ପରିବର୍ତ୍ତନ ହୋଇ ରହେ।
- **Egress IP ରୋଟେସନ୍, ଉଭୟ ଦିଗରେ**: ଲୁକ୍ଅପ୍ ସମୟସୀମା (24 ଘଣ୍ଟା) egress-IP କ୍ୟାଶ୍ TTL
  (5 ମିନିଟ୍) ଠାରୁ ବହୁତ ଅଧିକ, ତେଣୁ “ଶେଷ ଜଣା IP” ଇତିହାସ, ବର୍ତ୍ତମାନ ସ୍ଥିତି ନୁହେଁ। ଯଦି
  ସମୟସୀମା ମଧ୍ୟରେ କୌଣସି କନେକ୍ସନ୍ର ପ୍ରକ୍ସି ରୋଟେଟ୍ ହୋଇଥାଏ, ତେବେ ଲକ୍ ପ୍ରକୃତରେ
  ସେୟାର୍ ହୋଇଥିବା IPକୁ **ମିସ୍** କରିପାରେ (ରେକର୍ଡ ହୋଇଥିବା IPଟି ନୂଆ, ଅକ୍ଷୟ ହୋଇନଥିବା
  IP) — ଏବଂ ସମମାନ ଭାବେ exhausted IPଠାରୁ ପରେ ରୋଟେଟ୍ ହୋଇଯାଇଥିବା ସହୋଦରକୁ
  **କୁଲ୍** କରିପାରେ। ଦ୍ୱିତୀୟ ଘଟଣାରେ ସେହି ସହୋଦରର ଗୋଟିଏ କୁଲ୍ଡାଉନ୍ ସମୟସୀମା ଖର୍ଚ୍ଚ
  ହୁଏ; ଉଭୟକୁ ଇତିହାସ-ଆଧାରିତ ଲୁକ୍ଅପ୍ର ଗ୍ରହଣୀୟ ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ ସୀମା ଭାବେ
  ଗ୍ରହଣ କରାଯାଇଛି।
- **ଖର୍ଚ୍ଚ**: `idx_pl_timestamp` ମାଧ୍ୟମରେ ସମୟସୀମା-ଫିଲ୍ଟର୍ ହୋଇଥିବା `proxy_logs` ର
  ଦୁଇଟି ସୀମିତ ସ୍କାନ୍, କେବଳ 429 ଫ୍ରିକ୍ୱେନ୍ସିରେ। କୌଣସି ନୂଆ ଇଣ୍ଡେକ୍ସ ନାହିଁ
  (ମାଇଗ୍ରେସନ୍ 134 YAGNI)। ମଧ୍ୟମ ଆକାରର ପ୍ରକୃତ-ଟ୍ରାଫିକ୍ DB କପି ଉପରେ ମାପ କରାଯାଇଛି;
  ଏକ ଉଚ୍ଚ-ଥ୍ରୁପୁଟ୍ ଇନ୍ଷ୍ଟାନ୍ସ ସେହି ସମୟସୀମାରେ ଅନୁପାତିକ ଭାବେ ଅଧିକ ରୋ ଧାରଣ କରେ।

## ଅନ୍ୟାନ୍ୟ ସ୍ଥିରତା ବ Features ଶିଷ୍ଟ୍ୟଗୁଡିକ।

- **22 ରାଉଟିଙ୍ଗ୍ ରଣନୀତି।** — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)
- **ସଚେତନ ମାର୍ଗଦର୍ଶନ ପୁନ Res ସେଟ୍ କରନ୍ତୁ।** (v3.8.0) — କୋଟା ପୁନ et ସେଟ୍ ସମୟ ଦ୍ୱାରା ସଂଯୋଗକୁ ପ୍ରାଥମିକତା ଦେଇଥାଏ।
- **ପୃଷ୍ଠଭୂମି ମୋଡ୍ ଅବକ୍ଷୟ।** — ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକ API `background: true` ଚେତାବନୀ ସହିତ ସିଙ୍କ କରିବାକୁ ଖରାପ ହୋଇଛି।
- **ଗତିଶୀଳ ଉପକରଣ ସୀମା ଚିହ୍ନଟ।** ଟୁଲ୍ ଗଣନା ସୀମା ହିଟ୍ ହେଲେ — ପ୍ରଦାନକାରୀଙ୍କୁ ବନ୍ଦ କରିଥାଏ।
- **ଜରୁରୀକାଳୀନ ଅବନତି** — `OMNIROUTE_EMERGENCY_FALLBACK` ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ; ଅପରେଟର୍ସ ଏହାକୁ ପୁନ art ଆରମ୍ଭ ନକରି ଫିଚର୍ ଫ୍ଲାଗ୍ସ ପୃଷ୍ଠାରୁ ନବଲିଖନ କରିପାରିବେ।

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
