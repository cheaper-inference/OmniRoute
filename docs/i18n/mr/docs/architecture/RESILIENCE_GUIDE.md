# Resilience Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute मध्ये तीन वेगळ्या परंतु संबंधित लवचिकता यंत्रणा आहेत. प्रत्येकाची व्याप्ती आणि उद्देश वेगळा असतो. राउटिंग वर्तन डीबग करताना त्यांना वेगळे ठेवा.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **लवचिकता टॉगलसाठी Env-vs-डॅशबोर्ड प्राधान्य.** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — फक्त _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) पुरवते. `resilienceSettings` (डॅशबोर्ड → मध्ये एक बुलियन कायम आहे** सेटिंग्ज → लवचिकता** / `PATCH /api/resilience`, `key_value` मध्ये संग्रहित ) env मूल्यावर विजय मिळवते: सामान्यीकरण (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) जेव्हा एखादे अस्तित्वात असते तेव्हा संचयित बुलियन ठेवते. अशा env var `true` वर सेट करणे जेथे डॅशबोर्डने आधीच `false` जतन केले आहे त्यामुळे काहीही बदलत नाही — टॉगल फ्लिप करा** सेटिंग्ज → लवचिकता** (किंवा संग्रहित फील्ड साफ करा) त्याऐवजी.

## 1. प्रोव्हायडर सर्किट ब्रेकर

**व्याप्ती:** संपूर्ण प्रोव्हायडर (उदा., `glm`, `openai`, `anthropic`).

**हेतू:** अपस्ट्रीम/सेवा स्तरावर वारंवार अपयशी होणाऱ्या प्रोव्हायडरकडे ट्रॅफिक पाठवणे थांबवणे.

**अंमलबजावणी:**

- मुख्य क्लास: `src/shared/utils/circuitBreaker.ts`
- वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- स्टेटस API: `GET /api/monitoring/health`
- रीसेट API: `POST /api/resilience/reset`
- रॅपर्स: `open-sse/services/accountFallback.ts`
- डेटाबेस टेबल: `domain_circuit_breakers`

**अवस्था:**

- `CLOSED` — सामान्य ट्रॅफिकला परवानगी
- `DEGRADED` — ट्रॅफिकला अजूनही परवानगी आहे, परंतु वाढलेल्या प्रोव्हायडर अपयशांचा मागोवा घेतला जात आहे; पुरेशी यशे मिळाल्यावर, वैध कनेक्शन चाचणी झाल्यावर, किंवा नवीन अपयश न घडता शेवटच्या अपयश-प्रकारासाठीची सर्वांत लांब `OPEN` धारणा पूर्ण झाल्यावर (त्याचे `cooldownByKind` मूल्य, नाहीतर `resetTimeout`, × `maxBackoffMultiplier`, किमान एक कूलडाउन) पुन्हा `CLOSED` वर परत येते
- `OPEN` — प्रोव्हायडर तात्पुरता अवरोधित; कॉम्बो राउटिंग त्याला वगळते
- `HALF_OPEN` — रीसेट टाइमआउट संपला; प्रोब विनंतीला परवानगी

**कॉन्फिगर करण्यायोग्य डीफॉल्ट्स (`open-sse/config/constants.ts`, डॅशबोर्ड → सेटिंग्ज → रेझिलियन्स मध्ये उपलब्ध):**

| वर्ग    | यावर DEGRADED | यावर OPEN | रीसेट टाइमआउट |
| ------- | ------------- | --------- | ------------- |
| OAuth   | 5 अपयशे       | 8 अपयशे   | 60 सेकंद      |
| API-key | 7 अपयशे       | 12 अपयशे  | 30 सेकंद      |
| Local   | व्युत्पन्न    | 2 अपयशे   | 15 सेकंद      |

`degradationThreshold` प्रोव्हायडर `DEGRADED` मध्ये कधी प्रवेश करेल हे नियंत्रित करते; `failureThreshold` तो कधी OPEN होईल आणि वगळला जाईल हे नियंत्रित करते. लोकल प्रोव्हायडर प्रोफाइल्स अजून रेझिलियन्स सेटिंग्ज पृष्ठावर उपलब्ध नाहीत.

**ट्रिप कोड:** फक्त प्रोव्हायडर-स्तरीय स्टेटसेस `[408, 500, 502, 503, 504]`. अकाउंट-स्तरीय एररसाठी (बहुतेक 401/403/429 — ते कूलडाउन किंवा लॉकआउट अंतर्गत येतात) ट्रिप करू नये.

**आळशी पुनर्प्राप्ती (lazy recovery):** `OPEN` कालबाह्य झाल्यावर, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ही स्थिती `HALF_OPEN` मध्ये ताजी करतात. तेच रीड्स (आणि पुढील अपयश) कालबाह्य झालेले `DEGRADED` पुन्हा `CLOSED` कडे घेऊन जातात. बॅकग्राउंड टाइमरची गरज नाही.

---

### ऑप्ट-इन ग्लोबल प्रोव्हायडर कूलडाउन (विंडो गेट)

चौथा, **ऑप्ट-इन** स्तर (`PROVIDER_COOLDOWN_ENABLED`, डीफॉल्ट **बंद**) अपयशी होणाऱ्या प्रोव्हायडर्सची क्रॉस-रिक्वेस्ट मेमरी `open-sse/services/providerCooldownTracker.ts` मध्ये ठेवतो; कॉम्बो टार्गेट रिझोल्यूशन तिचा वापर करते, जेणेकरून सलग कॉम्बो रिक्वेस्ट्स नुकत्याच अपयशी झालेल्या प्रोव्हायडरकडे पुन्हा-पुन्हा जाणे थांबवतात. प्रोव्हायडर-स्तरीय नोंदी `PROVIDER_PROFILES` विंडो गेटचे पालन करतात:

| प्रोफाइल | यानंतर ट्रिप (`providerFailureThreshold`) | या विंडोत (`providerFailureWindowMs`) | इतक्या काळ कूलडाउन (`providerCooldownMs`) |
| -------- | ----------------------------------------: | ------------------------------------: | ----------------------------------------: |
| OAuth    |                                      `10` |                               `15min` |                                    `5min` |
| API key  |                                      `15` |                               `30min` |                                   `10min` |

थ्रेशोल्डच्या खाली प्रोव्हायडर कूलिंग मानला जात **नाही**; यश आल्यावर विंडो साफ होते. कनेक्शन-स्तरीय नोंदी (`provider:connectionId`) त्याऐवजी एक्स्पोनेंशियल `minRetryCooldownMs → maxRetryCooldownMs` बॅकऑफ कायम ठेवतात. ओव्हरराइड्स: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. रिग्रेशन गार्ड: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. कनेक्शन कूलडाउन

**व्याप्ती:** एकल provider कनेक्शन/खाते/की.

**उद्देश:** त्याच provider साठीची इतर कनेक्शन्स सेवा देत असताना एक खराब की वगळणे.

**अंमलबजावणी:**

- अनुपलब्ध म्हणून चिन्हांकित करणे: `src/sse/services/auth.ts::markAccountUnavailable()`
- निवड: त्याच फाइलमधील `getProviderCredentials*`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्ज: `src/lib/resilience/settings.ts`

**प्रत्येक कनेक्शनसाठी फील्ड्स:**

- `rateLimitedUntil` — कूलडाउन संपेपर्यंतचा टाइमस्टॅम्प
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — घातांकीय बॅकऑफ काउंटर

**डीफॉल्ट कूलडाउन्स:**

- OAuth बेस: 5s
- API-key बेस: 3s
- API-key 429: upstream `Retry-After`/reset हेडर्स/parse करता येणाऱ्या reset मजकुराला प्राधान्य
- बॅकऑफ: `baseCooldownMs * 2 ** failureIndex`

**प्रति-provider retry विलंब.** Provider तपशील पृष्ठावर **Retry delay** निवड आहे (Auto,
15s ते 1h). हे `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, `PATCH /api/resilience` द्वारे) मध्ये सेव्ह होते. Rate-limit त्रुटीसोबत upstream retry
hint नसताना, ही किंमत provider साठीच्या scaled backoff ची जागा घेते आणि
`backoffLevel` ला 0 वर रीसेट करते (`open-sse/services/rotationConfig.ts::overrideFor`). Rate-limited त्रुटीसाठी
प्राधान्यक्रम, सर्वाधिक आधी: upstream retry hint, त्यानंतर प्रति-कनेक्शन
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`, त्यानंतर प्रति-provider retry
विलंब, त्यानंतर env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, आणि शेवटी
scaled backoff. Auto फील्ड काढून टाकते. याचा परिणाम फक्त rate-limit कारणावर होतो, terminal states वर
कधीही नाही.

**Anti-thundering-herd संरक्षण:** समांतर अपयशांमुळे कूलडाउन अनावश्यकपणे वाढू नये किंवा
`backoffLevel` दोनदा वाढू नये याची खात्री करते.

**Concurrency-limit 429s बॅकऑफ शिडीवर चढत नाहीत.** ज्या `429` च्या body मध्ये
concurrency limit ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) असल्याचे कळते, ते खाते निरोगी पण व्यस्त असल्याचे दर्शवते.
`checkFallbackError()` `concurrency_limited` कारण परत करते: त्वरित पुढील
कनेक्शनवर fail over करा, या कनेक्शनला स्थिर `CONCURRENCY_LIMIT_COOLDOWN_MS`
(1s) किंवा upstream retry hint इतका कूलडाउन द्या, `backoffLevel` अपरिवर्तित ठेवा आणि
`skipProviderBreaker` सेट करा. स्पष्ट quota body असल्यास त्यालाच प्राधान्य मिळते, त्यामुळे quota
pattern शी देखील जुळणारी body quota verdict म्हणूनच राहते. शोध:
`src/shared/utils/classify429.ts` मधील `looksLikeConcurrencyLimit()`; verdict:
`open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (breaker चे
`FailureKind`) अपरिवर्तित आहे आणि या bodies साठी अजूनही `rate_limit` वाचते.

**Stream content stalls मुळे खाते कूलडाउन होत नाही.** Content-stall watchdog
(`open-sse/utils/streamHandler.ts`) वेळेत कोणतेही model output न पाठवलेल्या stream वर
हार मानतो तेव्हा `markAccountUnavailable()` कनेक्शनवरील त्रुटी नोंदवते, पण कूलडाउन सेट
करत नाही: stall त्या request शी संबंधित असतो आणि बहुतेकदा output येण्यापूर्वीचा दीर्घ
reasoning turn असतो. Operators `resilienceSettings.streamStallCooldown.enabled`
(डीफॉल्ट `false`) द्वारे हे पर्यायाने पुन्हा सुरू करू शकतात.

**`p2c` account selection साठी opt-in latency signal.** प्रत्येक dispatched attempt मध्ये प्रत्येक
कनेक्शनसाठी (आणि प्रत्येक कनेक्शन + model साठी) त्याचा time-to-first-byte आणि outcome
in-memory rolling window मध्ये नोंदवला जातो: 15 मिनिटांमधील शेवटचे 20 samples
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` मधील
`safeLogEvents()` मधून नोंदवलेले). `resilienceSettings.p2cLatency.weight` हे
`0` पेक्षा जास्त असल्यास (range 0-20, default `0` = बंद), `src/sse/services/auth.ts` मधील
`compareP2CConnections()` जोडीतील प्रत्येक candidate ला `weight` पर्यंत points जोडते.
त्यातील अर्धे faster candidate च्या तुलनेतील latency ratio मधून येतात (दुप्पट धीमे असल्यास
पूर्ण अर्धा भाग मिळतो) आणि अर्धे rolling error rate मधून येतात. हा term फक्त दोन्ही
candidates कडे किमान 3 samples असतील तेव्हाच लागू होतो, त्यामुळे नवीन खात्यांना दंड होत
नाही आणि त्याची कमाल quota-blocked आणि quota-exhausted penalties पेक्षा कमीच राहते.
यामुळे स्वतःचे कोणतेही circuit जोडले जात नाही: अपयशी खाती अजूनही cooldown, lockout आणि
breaker layers द्वारे हाताळली जातात. हे `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` द्वारे सेट करा.

**Reasoning frames content-stall budget पुन्हा सुरू करतात.** Reasoning model ला पहिला
दृश्य token येण्यापूर्वी काही मिनिटे विचार करावा लागू शकतो: Claude `thinking_delta` frames
stream करते, ज्यांचा thinking text रिकामा असू शकतो, आणि Responses API एकामागोमाग एक
reasoning item stream करते. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
ही frames ओळखते आणि turn रद्द करण्याऐवजी watchdog प्रत्येक frame वर त्याचे budget पुन्हा
सुरू करते. तरीही हे model output नाही, त्यामुळे फक्त reasoning सह संपणारा turn अजूनही
empty म्हणून नोंदवला जातो आणि reasoning थांबवून फक्त heartbeats पाठवणारा turn अजूनही
watchdog ट्रिगर करतो.

Kiro चे binary `reasoningContentEvent` frames, non-empty signature सह, executor मधून ही
reasoning activity रिकाम्या `reasoning_content` delta म्हणून जतन करतात. Signature पुढे
forward केली जात नाही. Metadata, incomplete frames आणि empty signatures content budget
पुन्हा सुरू करत नाहीत; स्वतंत्र active-stream timeout आणि client cancellation अजूनही लागू
राहतात (`open-sse/executors/kiro/reasoning.ts`).

**Terminal states (कूलडाउन नाहीत):**

- `banned` — banned-keyword / account-ban detection द्वारे सेट केले जाते
  ([BAN_DETECTION](../security/BAN_DETECTION.md) पहा). Upstream per-request refusals
  (`request_rejected`, उदा. Anthropic OAuth 403 "Request not allowed") हे कधीही ते सेट
  करत नाहीत: त्यांची मोजणी प्रति कनेक्शन आणि model नुसार केली जाते आणि वाढत्या कूलडाउनसह
  त्या model ला rotation मधून बाहेर काढले जाते; हा कूलडाउन
  `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) पर्यंत मर्यादित असतो, किंवा model माहीत नसल्यास
  कनेक्शन कूल केले जाते — `open-sse/services/requestRejectedStreak.ts`
- `expired` (मर्यादित retries नंतर terminal स्थितीत रूपांतरित होते — exponential backoff सह
  `EXPIRED_RETRY_MAX = 3` — त्यामुळे खाते कायमचे निष्क्रिय होण्यापूर्वी transient OAuth errors
  स्वतः सुधारू शकतात)
- `credits_exhausted`

ही क्रेडेन्शियल्स बदलली जात नाहीत किंवा ऑपरेटर त्यांना रीसेट करत नाही तोपर्यंत कायम राहतात. टर्मिनल स्थितींवर क्षणिक कूलडाउन स्थितीने ओव्हरराइट करू नका.

**आळशी पुनर्प्राप्ती:** `rateLimitedUntil` ची वेळ उलटून गेल्यावर कनेक्शन पुन्हा पात्र होते. यशस्वी वापरानंतर, `clearAccountError()` सर्व त्रुटी फील्ड साफ करते.

### Claude OAuth वापर मर्यादा: कमी-प्राधान्य लेन + सत्र-मर्यादा रीसेट

**व्याप्ती:** एक Claude subscription (OAuth) कनेक्शन. दोन्ही वैशिष्ट्ये **प्रति कनेक्शन पर्यायी** आहेत (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in
`providerSpecificData`, दोन्ही डीफॉल्टनुसार बंद) आणि Claude Code च्या `/low-priority` आणि `/limit-reset` कमांड्सची प्रतिकृती आहेत (Claude Code 2.1.263 मधून घेतलेला वायर करार).

**अंमलबजावणी:**

- स्थिती मशीन + प्रतिसाद वर्गीकरण: `open-sse/services/claudeLowPriority.ts`
- रीसेट स्थिती/क्लेम क्लायंट: `open-sse/services/claudeLimitReset.ts`
- एक्झिक्युटर हुक (हेडर इंजेक्शन + त्याच खात्यावर पुनर्प्रयत्न): `open-sse/executors/base.ts::execute()`
- पर्यायी स्थायी संचयन: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ट्रिगर:** 5-तासांची वापर मर्यादा — `anthropic-ratelimit-unified-status: rejected` असलेले हेडर्स असलेला `429` आणि, खाते पात्र असल्यास,
`anthropic-ratelimit-unified-slow-offer: treatment`. पहिल्या मर्यादा
`429` पूर्वी काहीही पाठवले जात नाही; unified हेडर्स नसलेला burst 429 सामान्य कूलडाउन मार्गाने जातो.

**कमी-प्राधान्य लेन** (`lowPriorityMode`):

- मर्यादा 429 वर एक्झिक्युटर ऑफर स्वीकारतो आणि त्याच खात्यावर
  `anthropic-usage-limit: slow` सह त्वरित पुनर्प्रयत्न करतो; घोषित
  `anthropic-ratelimit-unified-reset` (+60s grace) पर्यंत लेन सक्रिय राहते आणि त्या विंडोमधील प्रत्येक विनंतीमध्ये हेडर असतो. इंटरसेप्ट केलेला 429 `handleChatCore` पर्यंत पोहोचत नाही, त्यामुळे कनेक्शन
  **कूलडाउनमध्ये ठेवले जात नाही** आणि दुसऱ्या कनेक्शनवर फिरवले जात नाही.
- नंतरच्या प्रतिसादांमधील `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  लेन सुरू ठेवतात; `slot_busy` (429) किंवा `529` सर्व्हरचा
  `anthropic-ratelimit-unified-slow-retry-after` कालावधी (डीफॉल्ट 20s, मर्यादा 5–600s, ±30% jitter)
  प्रतीक्षा करून पुनर्प्रयत्न करतात. हे `anthropic-ratelimit-unified-slow-max-wait` (डीफॉल्ट 20 min, मर्यादा
  1 min–6 h) द्वारे मर्यादित असते — त्यानंतर लेन संपते आणि 10-मिनिटांचा cool-off पुन्हा-स्वीकृती रोखतो. ही
  प्रतीक्षा विनंतीच्या स्वतःच्या upstream-start timeout मध्ये उरलेल्या वेळेने
  (`resolveFetchStartTimeout`, डीफॉल्ट 10 min) आणि 5 s मार्जिन वजा करून अतिरिक्तपणे मर्यादित असते: ही मर्यादा नसल्यास
  20-मिनिटांचा डीफॉल्ट max-wait विनंतीपेक्षा जास्त काळ चालला असता आणि प्रतीक्षा अर्धवट रद्द झाली असती, ज्यामुळे सुसंवादी
  `max_wait` समाप्ती + cool-off ऐवजी `TimeoutError` दिसला असता.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-तासांच्या विंडोचे रोलओव्हर, किंवा
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (जे कोणत्याही स्थितीवर
  `extra_usage` म्हणून लेन संपवते, कारण सशुल्क overage आता ही मर्यादा कव्हर करते) लेन संपवतात; त्यानंतर प्रतिसाद सामान्य कूलडाउन मार्गाने जातो. `budget_exhausted` घोषित बजेट रीसेट होईपर्यंत (≤ 8 दिवस) लक्षात ठेवले जाते.
- एक्झिक्युटरच्या स्वतःच्या 400-आधारित intra-attempt पुनर्प्रयत्नांनंतर (context
  editing, thinking/effort clamps, param auto-learn) मर्यादा तपासली जाते, त्यामुळे त्या पुनर्प्रयत्नांपैकी
  एखाद्यावर प्रथम दिसणारा मर्यादा 429 देखील कूलडाउन मार्गावर जाण्याऐवजी इंटरसेप्ट केला जातो.
- स्थिती प्रति कनेक्शन मेमरीमध्ये असते (रीस्टार्टनंतर पुन्हा-स्वीकारण्यासाठी एक अतिरिक्त मर्यादा 429 लागतो).

**सत्र-मर्यादा रीसेट** (`autoLimitReset`, दोन्ही सुरू असल्यास लेनपूर्वी प्रयत्न केला जातो):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ब्लॉक; जेव्हा `arm: "reset"` आणि `available: true` असते,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` सह
  `{ "program": "juniper_tide" }` पाठवले जाते (`providerSpecificData.organizationUUID` मधील
  organization UUID, bootstrap fallback).
- `result: reset|not_limited` → विनंती पूर्ण वेगाने (slow header शिवाय) पुन्हा केली जाते.
  `already_used` / `not_offered` `next_available_at` (डीफॉल्ट एक आठवडा) मेमोइझ करतात; कोणतीही
  त्रुटी 15 मिनिटांसाठी बॅकऑफ करते. रीसेट आठवड्यातून एकदाच करता येतो आणि तो साप्ताहिक मर्यादेत मोजला जातो.

रिग्रेशन गार्ड्स: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### सत्र संलग्नता (#7274)

**व्याप्ती:** कोणत्याही provider साठी, एक client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header)
एका कनेक्शनला पिन केले जाते.

**उद्देश:** बहु-टर्न एजंट (Claude Code, aider, custom agents) विनंत्यांदरम्यान त्याच खात्यावर ठेवणे, ज्यामुळे प्रति-खाते सत्र स्थिती असलेल्या provider वर cross-account संदर्भ गमावणे आणि वारंवार होणारे cold-start 429 कमी होतात.

**अंमलबजावणी:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन निवड/निर्मिती: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर एक्स्ट्रॅक्शन (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- स्थायी पिन सारणी: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिंग: `sessionAffinityTtlMs` (global TTL in ms, `0` disables) — `src/lib/db/settings.ts`. `124_generic_session_affinity_ttl.sql` या migration द्वारे Codex-only `codexSessionAffinityTtlMs` चे नाव बदलण्यात आले; यापूर्वी कॉन्फिगर केलेला कोणताही Codex TTL नवीन डीफॉल्ट म्हणून पुढे नेला जातो.

#7274 पूर्वी, `resolveSessionAffinityTtlMs()` ने `codex` वगळता प्रत्येक provider साठी `0` वर त्वरित परतण्याचा निर्णय घेतला होता, त्यामुळे पिनिंग यंत्रणा आणि हेडर एक्स्ट्रॅक्शन आधीपासून provider-agnostic असतानाही TTL सेटिंग (आणि सत्र हेडर्स) इतर कुठेही प्रभावी नव्हते. या दुरुस्तीने तो प्रारंभिक परतावा काढून टाकला; एकदा जागतिक स्तरावर TTL `0` पेक्षा अधिक सेट केल्यावर तो आता प्रत्येक provider वर समान रीतीने लागू होतो.

तीन session-affinity हेडर्स upstream कडे कधीही फॉरवर्ड केले जात नाहीत — executors client headers थेट पुढे पाठवण्याऐवजी स्वतःचे upstream headers सुरुवातीपासून तयार करतात, त्यामुळे हे केवळ अंतर्गत correlation id राहते.

### विशेष व्यवस्थापित सत्र कनेक्शन लीजेस

**व्याप्ती:** एक सक्रिय व्यवस्थापित HTTP क्लायंट/सत्र एका पात्र OmniRoute कनेक्शनची मालकी ठेवतो.

**उद्देश:** विनंत्यांदरम्यान कठोर रूटिंग सीमा आवश्यक असलेल्या क्लायंटसाठी टिकाऊ, अनन्य कनेक्शन-मालकी प्रदान करणे. हे सत्र-संलग्नतेपेक्षा वेगळे आहे, जी सौम्य सातत्याची पसंती असते:
अनन्य लीज SQLite मध्ये जीवनचक्र स्थिती टिकवून ठेवते, जागतिक सक्रिय-मालक आणि
सक्रिय-कनेक्शनची एकमेवता लागू करते आणि प्रदात्याकडे डिस्पॅच करण्यापूर्वी जुनी
जनरेशन नाकारते.

हे वैशिष्ट्य प्रत्येक API कीसाठी स्वतंत्रपणे सक्षम करता येते. व्यवस्थापित कीकडे `lease:exclusive` स्कोप आणि
स्पष्ट, रिकामी नसलेली `allowedConnections` यादी असणे आवश्यक आहे. कोणताही HTTP क्लायंट जीवनचक्र एंडपॉइंट वापरू शकतो; क्लायंटचे नाव, user-agent, प्रदाता, OAuth पद्धत किंवा मॉडेल यापैकी कशाचीही आवश्यकता नाही. लीजची मालकी कनेक्शनवर असते,
मॉडेलवर नाही; त्यामुळे कनेक्शन सामान्यतः पात्र राहिल्यास मॉडेल बदलल्यावरही बंधन कायम राहते. सामान्य मॉडेल, कोटा, आरोग्य, कूलडाउन आणि अनुमत-सूची नियम अधिकृत राहतात आणि त्याच जनरेशनला दुसऱ्या उपलब्ध पात्र कनेक्शनकडे संक्रमण करू शकतात.

जीवनचक्र `POST /api/v1/session-leases` असून त्यातील JSON क्रिया `acquire`, `renew` आणि `release` आहेत.
व्यवस्थापित इन्फरन्स विनंत्यांमध्ये अपारदर्शक `X-OmniRoute-Lease-Owner` मूल्य आणि अचूक
`X-OmniRoute-Lease-Generation` सादर केले जातात. मालक `vlo_` नंतर 43 base64url अक्षरे वापरतो; फक्त
त्याचा SHA-256 हॅश साठवला जातो. प्रत्येक अंतिम डिस्पॅच सीमा प्रमाणित API की ID आणि
सक्रिय कनेक्शन ID यांनाही बांधते. लीज नियंत्रण हेडर्स लॉगमधून, जतन केलेल्या विनंती स्नॅपशॉटमधून आणि
अपस्ट्रीम एक्झिक्युटर हेडर्समधून काढले जातात.

सामान्य रूटिंगमध्ये पात्र व्यवस्थापित उमेदवार उपलब्ध असतील, परंतु प्रत्येक मुक्त उमेदवार परकीय सक्रिय लीजने व्यापलेला असेल, तर OmniRoute HTTP `429`, lease-capacity-unavailable कोड, waiting-for-capacity स्थिती आणि सर्वात लवकर संबंधित कालबाह्यतेवरून ठरवलेला मर्यादित `Retry-After` परत करते.
सामान्य पात्रता रिकामी असणे हे लीज-विवाद नाही आणि त्याची विद्यमान रूटिंग-त्रुटी अर्थविषयकता कायम राहते.

संबंधित यंत्रणा स्वतंत्र राहतात:

- OAuth सत्र व्यापलेपणा हा OAuth खात्यांसाठी प्रक्रियास्थित सौम्य वितरण असतो.
- खाते सेमाफोर्स विनंती-समांतरता परवानग्या देतात आणि विनंती पूर्ण झाल्यावर समाप्त होतात.
- अनन्य व्यवस्थापित सत्र लीज म्हणजे जनरेशन सीमेसह टिकाऊ जीवनचक्र-मालकी होय.

## 3. मॉडेल लॉकआउट

**व्याप्ती:** provider + connection + model त्रिकूट.

**स्थितीनुसार मुख्य व्याप्ती:** कोणत्या key वर लॉकआउट लिहायचा हे अपयशी status ठरवतो
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — quota किंवा entitlement signal — **quota family** लॉक करा:
  codex साठी संपूर्ण `codex` / `spark` scope (connection मधील प्रत्येक
  `gpt-5*` model), इतर providers साठी `getQuotaScopedModelForProvider()`.
- `404` bare model लॉक करतो (`getModelLockKey()` `not_found` अरुंद करते).
- इतर कोणतेही status — `5xx` transport/server failures आणि quality validation मधून
  OmniRoute ने स्वतः तयार केलेला `502` — फक्त अचूक
  provider/connection/model tuple लॉक करतात. एका model वरील खराब stream हा account च्या
  quota बद्दल पुरावा नाही; या नियमापूर्वी `codex/gpt-5.6-luna` वरील एक रिकामा response
  त्या connection मधील प्रत्येक `gpt-5*` model ला routing मधून 2–30 मिनिटांसाठी
  (escalating) काढत असे, तर त्याचे quota अपरिवर्तित राहत असे.
- Caller चा स्पष्ट `scope` option नेहमी प्राधान्य घेतो (Antigravity `"exact"` पास करते).

**उद्देश:** केवळ एक model unavailable किंवा quota-limited असताना संपूर्ण connection
अक्षम करणे टाळणे.

**उदाहरणे:**

- 429 परत करणारे प्रति-model quota providers
- एका नसलेल्या model साठी 404 परत करणारे local providers
- Provider-specific mode/model permission failures (उदा., Grok modes)

**अंमलबजावणी:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### मॉडेल कूलडाउन्स डॅशबोर्ड (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

यामध्ये सक्रिय lockouts ची यादी असते: provider, connection, model, reason, expiresAt.
Operators कार्डमधून एखादे model मॅन्युअली पुन्हा सक्षम करू शकतात.

**REST API:**

- `GET /api/resilience/model-cooldowns` — सक्रिय lockouts ची यादी
- `DELETE /api/resilience/model-cooldowns` — मॅन्युअल पुन्हा-सक्षमीकरण. Body: `{provider, connection, model}`. Auth: management.

### कूलडाउन मॅनेजर

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

तात्पुरत्या कारणामुळे routing मधून बाहेर असलेल्या प्रत्येक connection साठी एकच पृष्ठ,
प्रत्येक provider चे पृष्ठ स्वतंत्रपणे उघडण्याऐवजी. यामध्ये connection cooldowns,
model lockouts आणि terminal states ची यादी असते; ते connection नुसार, निवडीनुसार किंवा
एखाद्या provider मधील सर्व connections साठी साफ करता येतात. तसेच सर्वाधिक समायोजित
केले जाणारे cooldown नियम संपादित करता येतात: `streamStallCooldown.enabled` आणि OAuth /
API-key `connectionCooldown` base cooldown तसेच maximum backoff steps (`PATCH /api/resilience`
द्वारे जतन केले जातात). Terminal states (`banned`, `expired`, `credits_exhausted`) यादीत
दाखवले जातात, परंतु येथे कधीही साफ केले जात नाहीत.

त्याच पृष्ठावरील **Error cooldown rules** कार्ड operator error rules
(`settings.providerErrorRules`) आणि प्रत्येक provider साठीचे catch-all defaults
(`settings.providerErrorDefaults`) `PATCH /api/settings` द्वारे संपादित करते — ते कसे
जुळतात यासाठी §7 अंतर्गत "Operator-declared rules" पहा. Durations Default (कोणताही
explicit cooldown नाही), 30 min, 1 h, 5 h, 24 h किंवा 1 ते 43,200 मिनिटांचा
custom कालावधी (30 दिवस) असू शकतो.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, उर्वरित cooldown, backoff level,
  शेवटचा error type आणि model lockouts असलेली connections (credentials नाहीत)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` किंवा
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` परत करते

### लॉकआउट settings UI + success-decay recovery (v3.8.23)

Model lockout नेहमी-सक्रिय hardcoded behavior मधून स्वतःच्या settings card आणि
self-healing recovery path असलेल्या पूर्णपणे configurable, opt-in feature मध्ये बदलले.

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
हे वरील read-only `ModelCooldownsCard` पेक्षा **वेगळे** आहे (जे फक्त सक्रिय lockouts
_यादीत नोंदवते_) — नवीन card _parameters configure करते_. Defaults
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) मध्ये असतात:

| Setting                 | Default                          | Meaning                                                            |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | Master toggle — model lockout **डीफॉल्टनुसार बंद** आहे.            |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model-scoped failure म्हणून गणले जाणारे upstream statuses.         |
| `baseCooldownMs`        | `120_000` (120 s)                | पहिल्या failure साठीचा प्रारंभिक lockout duration.                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | वाढवलेल्या cooldown ची कमाल मर्यादा.                               |
| `maxBackoffSteps`       | `10`                             | Exponential-backoff escalation steps ची कमाल संख्या.               |
| `useExponentialBackoff` | `true`                           | वारंवार होणाऱ्या failures मुळे cooldown exponentially वाढवायचा का. |

Settings सामान्य settings store द्वारे persist होतात आणि resilience settings schema
द्वारे validate होतात; card `baseCooldownMs`/`maxCooldownMs` ला
(`maxCooldownMs ≥ baseCooldownMs` सह) तसेच `maxBackoffSteps` ला मर्यादित करते.

**Success-decay recovery:** recovery ही केवळ timer expiry वर आधारित नाही. निरोगी
response model ची failure count कमी करत नेतो, त्यामुळे मधल्या कालावधीत recover झालेले
model escalation थांबवते (आणि साफ होते) — timer संपण्यापूर्वीच. यशस्वी combo target वर
`open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) कॉल करते, जे साठवलेली
`failureCount` (`Math.floor(failureCount / 2)`) **अर्धी** करते; ती `0` वर पोहोचल्यावर
lockout entry पूर्णपणे delete केली जाते. याउलट `recordModelLockoutFailure()` escalation
window मधील failures वर count वाढवते (आणि cooldown escalate करते). हे success-decay
साध्या timer expiry व्यतिरिक्त आहे — कोणत्याही मार्गाने model पुन्हा सक्षम होऊ शकते.

**स्थिती:** लॉकआउट्स **मेमरीमध्ये** ठेवले जातात (`Map`s प्रति-प्रक्रिया, `ModelLockoutEntry` द्वारे, `provider:connectionId:model` की केलेले; अचूक-स्कोप लॉक `provider:connectionId:exact:model` द्वारे), डेटाबेसमध्ये नाही — त्यामुळे रीस्टार्ट केल्यावर ते नष्ट होतात. _सेटिंग्ज_ कायमस्वरूपी जतन केल्या जातात; सक्रिय लॉकआउट _स्थिती_ तात्पुरती असते.

---

## 4. कोटा-शेअर समवर्तीपणा नियंत्रण (v3.8.36)

सब्स्क्रिप्शन खाती (GLM, MiniMax इ.) अनेकदा एकावेळी फक्त ~1–3
विनंत्याच स्वीकारतात; ही मर्यादा ओलांडल्यास 429 आणि कूलडाउन ट्रिगर होतात. हे
**कोटा-शेअर** (`qtSd/…`) कॉम्बोंमध्ये विशेषतः गंभीर असते, कारण अनेक API कीज
एकाच अपस्ट्रीम खात्याचा वापर करतात. शेअर केलेल्या खात्यावर पूर येऊ नये यासाठी
तीन स्तर वापरले जातात.

### प्रति-कनेक्शन समवर्तीपणा मर्यादा (`max_concurrent`)

प्रत्येक प्रोव्हायडर कनेक्शन `max_concurrent` कमाल मर्यादा घोषित करू शकते
(`provider_connections.max_concurrent`, कनेक्शन मोडल / API / DB मध्ये सेट केलेली).
मर्यादा नको असल्यास हे रिकामे ठेवा. खालील सीरियलायझेशन स्तर नियंत्रित करणारा हा
एकमेव नॉब आहे — खात्याच्या वास्तविक समवर्तीपणानुसार तो सेट करा (उदा. GLM ~1,
MiniMax ~2).

### प्रति-मॉडेल समवर्तीपणा मर्यादा (`modelConcurrency`)

कनेक्शन आपल्या `rateLimitOverrides` मॅपमध्ये अचूक प्रति-मॉडेल समवर्तीपणा
मर्यादा देखील घोषित करू शकते:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

हे कनेक्शन मोडलमध्ये (**Rate limit overrides → Per-model
concurrency caps**, प्रत्येक ओळीत एक `model=cap`) किंवा त्याच JSON
रचनेसह `PATCH /api/providers/[id]` द्वारे सेट करा. मुख्य अर्थ:

- **कनेक्शन-व्यापी विरुद्ध मॉडेल-विशिष्ट:** `maxConcurrent` ही शेअर केलेली
  कनेक्शन-व्यापी मर्यादा राहते. दोन्ही लागू असल्यास, दोन्ही गेट एकाच
  कॉम्पोझिट गेटमध्ये अणुकेंद्रीयरित्या मिळवले जातात
  (`global → provider → account → model`); लागू असलेली अधिक कडक मर्यादा
  परिणामकारक ठरते.
- **अचूक मॉडेल-की जुळणी:** रूटिंगचे निराकरण झाल्यानंतर एक्झिक्युटरला दिलेला
  मॉडेल स्ट्रिंग ही की असते — सामान्यतः बेअर अपस्ट्रीम मॉडेल आयडी
  (`glm-5`), क्लायंट-साइड `provider/model` उपनाव नाही
  (`zai/glm-5` हे `glm-5` शी जुळत नाही). मूल्ये सकारात्मक-पूर्णांक
  समवर्ती-विनंती मर्यादा असतात.
- **स्थानिक रांगेत ठेवणे, शोध नाही:** अतिरिक्त विनंत्या विद्यमान
  रांग/टाइमआउट अर्थानुसार स्थानिक पातळीवर रांगेत ठेवल्या जातात (टाइप केलेल्या
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` प्रवेश त्रुटी). OmniRoute
  अपस्ट्रीम धोरण शोधत किंवा अनुमानित करत नाही — ऑपरेटरने कॉन्फिगर केलेल्या
  अचूक मर्यादांचीच अंमलबजावणी करते. संतृप्त मॉडेल गेट प्रोव्हायडर कधीही
  अक्षम करत नाही आणि कायमस्वरूपी मॉडेल लॉकआउटही निर्माण करत नाही; अपस्ट्रीम
  429/कूलडाउन/फॉलबॅक वर्तन हे त्रुटी-प्रतिबंधक म्हणून कायम राहते.
- **प्रति-कनेक्शन, प्रति-प्रोसेस व्याप्ती:** मर्यादा प्रत्येक डेटाबेस
  कनेक्शनसाठी असतात आणि मेमरीमध्ये राखल्या जातात, त्यामुळे समान अपस्ट्रीम API
  की पुन्हा वापरणारी दोन कनेक्शने एकमेकांशी समन्वय साधत नाहीत.
- **कॉन्फिगर न केलेले म्हणजे कोणताही बदल नाही:** मॅप वगळल्यास (किंवा
  डॅशबोर्ड फील्ड रिकामे ठेवल्यास) कोणतेही मॉडेल गेट जोडले जात नाही. कोणतीही
  सार्वत्रिक प्रोव्हायडर मर्यादा गृहीत न धरणारे उदाहरण कॉन्फिगरेशन:

```text
glm-5=1
glm-4.7=3
```

### कोटा-शेअर विनंती सीरियलायझेशन

जेव्हा कोटा-शेअर डिस्पॅच अशा कनेक्शनला लक्ष्य करते ज्याने सकारात्मक
`max_concurrent` घोषित केले आहे, तेव्हा त्या **खात्याला** केलेल्या समवर्ती
विनंत्या प्रति-कनेक्शन सेमाफोरद्वारे सीरियलाइझ केल्या जातात (की
`qsconn:<connectionId>`): अतिरिक्त विनंत्या खात्यावर पूर आणण्याऐवजी
**रांगेत थांबतात**. हे **फेल-ओपन** आहे — संतृप्त रांग किंवा टाइमआउट झाल्यास
डिस्पॅच करता येणारी विनंती कधीही नाकारण्याऐवजी स्लॉटशिवाय पुढे जाते. हे
**Settings → Resilience → Quota-share per-connection
concurrency** मध्ये टॉगल करा
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, डीफॉल्ट
ऑन). `max_concurrent` मर्यादा नसल्यास वर्तन अपरिवर्तित राहते.

> कोटा-शेअर रूटिंग गेट (`selectQuotaShareTarget`, DRR + P2C) स्वतः
> फेल-ओपन आहे आणि मर्यादेवर असलेल्या कनेक्शनला फक्त _कमी प्राधान्य_ देते —
> एका-कनेक्शनच्या पूलमध्ये ते कठोर मर्यादा लागू करू शकत नाही, त्यामुळे प्रत्यक्ष
> पूर नियंत्रित करणारा घटक हा सेमाफोर आहे.

### कॉम्बो कूलडाउन-जाणकार पुनर्प्रयत्न

प्रत्येक कॉम्बो स्ट्रॅटेजीसाठी (सक्षम असल्यास), SHORT ट्रान्झियंट कूलडाउनसाठी
429 निर्माण होणार असलेली विनंती तो कूलडाउन संपेपर्यंत थांबते आणि 429 परत
करण्याऐवजी पुन्हा डिस्पॅच होते — यात मल्टी-मॉडेल कॉम्बोंवरील Gemini-वर्गातील
TPM/RPM विंडो (~60s retry-after) समाविष्ट आहेत, उदाहरणार्थ 2-मॉडेल कॉम्बोची
दोन्ही लक्ष्ये प्रति-मॉडेल रेट मर्यादेवर आदळल्यास. हे **Settings → Resilience**
मधील `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) द्वारे मर्यादित असते. `quota_exhausted` (मध्यरात्रीपर्यंत
लॉक असलेले) किंवा auth/not-found कारणांसाठी हे कधीही थांबत नाही.

कॉम्बो `config.comboCooldownWaitEnabled: false` वापरून यातून बाहेर पडू शकतो.
फक्त लिटरल `false` हे सामायिक कॉम्बो प्रतीक्षा (डिस्पॅचनंतरचे कूलडाउन आणि
डिस्पॅचपूर्व सर्किट-ओपन/मॉडेल-लॉक प्रतीक्षा) तसेच त्यांच्या प्रतीक्षा-बजेट
टाइमआउट-फ्लोअर विस्ताराला अक्षम करते. गहाळ किंवा `true` असल्यास जागतिक
धोरण कायम राहते; जागतिक पातळीवर प्रतीक्षा अक्षम असल्यास `true` ती सक्षम करू
शकत नाही. स्पष्ट `targetTimeoutMs` ला तरीही प्राधान्य मिळते. या
ऑप्ट-आउटमुळे स्वतंत्र नेटिव्ह-Codex टर्न-पिन डिस्पॅचपूर्व प्रतीक्षा बदलत नाही.

हाच गेट डिस्पॅचपूर्व प्रकरणालाही (#16319) लागू होतो: कोणताही प्रयत्न करण्यापूर्वी
कॉम्बोची प्रत्येक लक्ष्ये शॉर्ट ट्रान्झियंट लॉकआउटमुळे वगळली गेली असल्यास,
शून्य-प्रयत्न मार्ग त्याच मर्यादांनुसार लॉकआउट संपेपर्यंत थांबतो आणि पुन्हा
डिस्पॅच करतो, त्याऐवजी संकेत-विरहित `503 ALL_TARGETS_SKIPPED` उत्तर देत नाही.
प्रतीक्षेला परवानगी नसल्यास (मर्यादा, प्रयत्न किंवा बजेट संपले असल्यास, किंवा
फीचर बंद असल्यास), अंतिम प्रतिसाद `429 rate_limit_error` मध्ये अपग्रेड होतो
आणि सर्वात आधी संपणाऱ्या ट्रान्झियंट लॉकमधील `retry_after` / `reset_at`
सोबत येतो; quota, auth आणि not-found लॉक संकेत-विरहित 503 कायम ठेवतात.

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

## 5. विनंती रांग प्रवेश नियंत्रण (v3.8.49 · issue #6593)

**व्याप्ती**: स्थानिक प्रति-प्रदाता+कनेक्शन रेट-लिमिट रांग (`open-sse/services/rateLimitManager.ts`,
Bottleneck द्वारे समर्थित), वरील तीन यंत्रणांच्या एका स्तराखाली.

**`maxWaitMs` रांग-प्रतीक्षा मर्यादित करते; `executionMaxWaitMs` अंमलबजावणी मर्यादित करते.**
हे दोन्ही जाणीवपूर्वक वेगळे ठेवलेले आहेत, आणि एकमेकांना कोणताही पुरवठा करत नाहीत.

`resilienceSettings.requestQueue.maxWaitMs` हा **रांग-प्रतीक्षा बजेट** आहे: यात
प्रदाता स्लॉटची वाट पाहणे आणि नंतर QUEUED मध्ये बसणे समाविष्ट आहे, आणि
जॉब QUEUED सोडून अंमलबजावणी सुरू करताच त्याचा टाइमर साफ होतो
(`rateLimitManager.ts`, `wrappedFn`). हा बजेट ओलांडणारी विनंती अपस्ट्रीमपर्यंत
कधीच पोहोचत नाही. डीफॉल्ट 30000ms, `src/lib/resilience/settings.ts` मधील
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` द्वारे पुरवले जाते आणि
`tests/unit/ratelimit-admission-control-6593.test.ts` द्वारे पिन केले जाते, म्हणून
त्यात बदल झाल्यास ती चाचणी लाल होते — हा परिच्छेद शांतपणे कालबाह्य राहत नाही.

`resilienceSettings.requestQueue.executionMaxWaitMs` हे Bottleneck ला जॉब
`expiration` म्हणून मिळते, ज्याचा टाइमर फक्त डिस्पॅचनंतर सुरू होतो. हे
स्वतःचा अपस्ट्रीम टाइमआउट नसलेल्या एक्झिक्युटरसाठी बॅकस्टॉप आहे, आणि
एक्झिक्युटरचा स्वतःचा फेच-स्टार्ट टाइमआउट जास्त असल्यास ते त्या पातळीपर्यंत
वाढवले जाते, म्हणून ते निरोगी इन-फ्लाइट प्रतिसाद कापू शकत नाही. डीफॉल्ट
600000ms (10 मिनिटे).

रांग बजेट `expiration` मध्ये घालणे हेच नॉन-इन्क्रिमेंटल गेटवेना मधल्या
उड्डाणात मारणारे होते — ते पहिल्या बाइट्सपूर्वी अनेक मिनिटे चालणे पूर्णपणे
योग्य आहे — आणि म्हणूनच expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) म्हणून समोर येते, तर रांग बजेट
रांग-टाइमआउट कोड बाळगते. दोन्हींपैकी कोणतेही `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) किंवा डॅशबोर्ड
(**सेटिंग्ज → रेझिलियन्स**) द्वारे ओव्हरराइड करा. दोन्ही नॉर्मलाइझ करताना
1ms–24h पर्यंत क्लॅम्प केले जातात.

**दोन्हींसाठी प्राधान्यक्रम:** env var फक्त _डीफॉल्ट_ पुरवते.
`resilienceSettings.requestQueue` मध्ये टिकवलेले मूल्य (डॅशबोर्ड / API patch,
`key_value` मध्ये साठवलेले) त्यावर मात करते, आणि प्रति-कनेक्शन
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` त्यावर मात करते. त्यामुळे
आधीपासून टिकवलेले मूल्य असलेल्या डिप्लॉयमेंटवर env var सेट केल्याने काहीही
बदलत नाही — त्याऐवजी टिकवलेले सेटिंग साफ करा किंवा अपडेट करा.

रांगेतील वास्तव्य `maxWaitMs` द्वारे मर्यादित आहे; खालील `maxQueueDepth` एकाच
वेळी किती कॉलर्स रांगेत असू शकतात हे मर्यादित करते.

**बॉडी-नमूद रीट्राय: पेसिंग विरुद्ध लॉकआउट.** 429 बॉडी स्वतःची प्रतीक्षा नमूद
करू शकते (Gemini `RetryInfo.retryDelay`, "retry after Ns" मजकूर), जे
`updateFromResponseBody` वाचते. कनेक्शनच्या `maxWaitMs` मध्ये बसणारी प्रतीक्षा
म्हणजे पेसिंग: लिमिटर तोपर्यंत आपला रिझर्व्हॉयर रिकामा करते आणि तो पुन्हा
भरल्यावर रांगेतील कॉल डिस्पॅच होतात. `maxWaitMs` पेक्षा जास्त प्रतीक्षा रांगेत
बसून संपवता येत नाही — Gemini संपलेल्या दैनिक कोट्याला `retryDelay: "86399s"`
ने उत्तर देते. पुनर्निर्मित 429 वर रिले केलेला `Retry-After` (#16528) फॉलबॅक
इंजिनला त्या कालखंडासाठी मॉडेल लॉक करायला आधीच भाग पाडते, परंतु त्यासाठी
लिमिटरही पॉज केल्यास कीकडे लवकर पोहोचणारा कोणताही कॉल (उदाहरणार्थ, रेझिलियन्स
रीसेटनंतर) संपूर्ण `maxWaitMs` साठी अडेल. अशी प्रतीक्षा टाइप्ड Google `RetryInfo`
तपशिलातून (`google_rpc_retry_info` प्रोव्हनन्स) आल्यास आणि कीचा लिमिटर आधीच
मॉडेलपुरता स्कोप झालेला असल्यास (`getLimiterKey` पहा), 429 त्याऐवजी त्या
कनेक्शनवरील मॉडेल लॉकआउट बनते
(`open-sse/services/rateLimitManager/bodyRetryPause.ts` मधील
`lockModelForLongBodyRetry`, 24h वर कॅप), आणि लिमिटर पॉज न करता ठेवले जाते.
अकाउंट निवड `isModelLocked()` द्वारे त्या लॉकमुळे स्किप होते, आणि कनेक्शनला पिन
केलेल्या टार्गेटसाठीचा कॉम्बो प्री-डिस्पॅच गेटही तसाच स्किप होतो. antigravity वर,
जिथे लिमिटर प्रति कोटा-कुटुंब असतो, लॉक नेमक्या मॉडेलवर असते, त्याच्या इतर
कोटा लॉक्सप्रमाणेच. अलियासने क्लायंटने मागितलेले नाव त्या मॉडेलवर रिझॉल्व्ह
केल्यास ते नावही लॉक होते, कारण त्या तपासण्या विनंती केलेले नाव वापरतात; ते
नेमके लॉक केले जाते (`lockExactModel`), म्हणून antigravity कोटा-कुटुंब किंवा codex
स्कोप ओलांडणारा अलियास स्वतःचे नाव कधीही लॉक करत नाही. प्रोज हिंट, अनटाइप्ड
`retryDelay`, किंवा संपूर्ण कनेक्शनमध्ये शेअर केलेला लिमिटर असल्यास पॉज कायम
राहतो. 429 पथने नुकताच पुनर्निर्मित केलेला लिमिटर खरोखर पॉज होतो तेव्हा, ज्या
कॉलरचा उरलेला रांग वेळ पॉज संपण्यापूर्वीच संपतो, तो तो वेळ संपेपर्यंत वाट न
पाहता लगेच रांग-टाइमआउट कोडसह (`checkLimiterPause`) परत पाठवला जातो; नोंदवलेला
शेवट लिमिटर तयार होण्यापूर्वी अँकर केला जातो — जिथे Bottleneck आपली रिफ्रेश
घडी सुरू करते — आणि रिझर्व्हॉयरमधील कोणताही पुढील बदल तो विसरून जातो.
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` आणि
`tests/unit/rate-limit-body-retry-pause.test.ts` द्वारे कव्हर केलेले आहे.

**`maxQueueDepth` — ऑप्ट-इन प्रवेश कॅप (नवीन).**
`resilienceSettings.requestQueue.maxQueueDepth` एका प्रदाता+कनेक्शनसाठी एकाच वेळी
किती विनंत्या रांगेत (अजून डिस्पॅच न झालेल्या) असू शकतात हे मर्यादित करते.
रांगेत आधीच `maxQueueDepth` विनंत्या असताना, नवीन विनंती टाइप्ड
`code: "RATE_LIMIT_QUEUE_FULL"` त्रुटीसह फास्ट-रिजेक्ट केली जाते — ती
`limiter.schedule()` पर्यंत पोहोचण्याच्या **आधीच** — म्हणून रिजेक्शन स्वस्त असते
आणि त्या विनंतीसाठीच्या कोणत्याही डाउनस्ट्रीम प्रॉम्प्ट-कॉम्प्रेशन / भाषांतर
कार्याच्या आधी घडते. डीफॉल्ट `0` = अक्षम, विद्यमान अमर्यादित-रांग वर्तन
टिकवले जाते; मर्यादा 0–100000. `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) किंवा
`resilienceSettings.requestQueue.maxQueueDepth` (डॅशबोर्ड/API patch) द्वारे
ओव्हरराइड करा.

प्रवेश तपासणी स्वतः एक शुद्ध फंक्शन आहे
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) म्हणून
ती खऱ्या Bottleneck लिमिटरशिवाय युनिट-टेस्ट करता येते.

> #6593 उघडणाऱ्या RFC ने `bypassCompressionOnRateLimit`
> फ्लॅगचाही प्रस्ताव मांडला होता. या रेपोमधील `open-sse/services/compression/` पाइपलाइन ही
> आउटबाउंड LLM विनंतीवरील प्रॉम्प्ट/कॉन्टेक्स्ट कॉम्प्रेशन आहे (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ब्लॉकजवळ),
> संश्लेषित 429 बॉडीजवरील HTTP प्रतिसाद कॉम्प्रेशन नाही — शब्दशः बायपास फ्लॅगशी जुळणारा कोड पथ येथे नाही. ती प्रॉम्प्ट-कॉम्प्रेशन पायरी
> सध्या विनंती पाइपलाइनमध्ये `withRateLimit()` च्या _आधी_ चालते, त्यामुळे
> रांग-भरल्यामुळे नाकारणी झाल्यावर ती वगळण्यासाठीचे पुनःक्रमण हा या issue च्या व्याप्तीपेक्षा वेगळा, मोठा
> बदल आहे; तो येथे जाणीवपूर्वक लागू केला **गेला नाही** आणि CPU-बचतीचा फायदा
> पुनःक्रमणाच्या धोक्याइतका मोलाचा आहे का यावर तो फॉलो-अप म्हणून सोडला आहे.

### रेट-लिमिट ऑटो-एनेबल सेफ्टी नेट आणि कनेक्शन प्रोटेक्शन (`rateLimitProtection`)

**ऑटो-एनेबल सेफ्टी नेट** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, डीफॉल्ट `true`):
डीफॉल्टनुसार, OmniRoute सर्व सक्रिय API-की प्रोव्हायडर कनेक्शन्ससाठी (`getProviderCategory(provider) === "apikey"`) रेट-लिमिट रांग संरक्षण आपोआप सक्षम करतो. यामुळे रेट-संवेदनशील अपस्ट्रीम API कीजकडे येणाऱ्या विनंत्या अपस्ट्रीम 429 त्रुटींमध्ये झपाट्याने जाण्याऐवजी Bottleneck मधून रांगेत लावल्या जातात आणि थ्रॉटल केल्या जातात. सेफ्टी नेट `RATE_LIMIT_AUTO_ENABLE` एन्व्हायरन्मेंट व्हेरिएबलद्वारे ओव्हरराइड केले जाऊ शकते (`false`/`0`/`off` अक्षम करते, `true`/`1`/`on` सक्तीने चालू करते), जे टिकवलेल्या डॅशबोर्ड सेटिंगपेक्षा (**सेटिंग्ज → रेझिलियन्स** / `PATCH /api/resilience`) प्राधान्य घेते.

**प्रति-कनेक्शन `rateLimitProtection` चे सिमॅन्टिक्स:**
प्रति-कनेक्शन रेट-लिमिट संरक्षण प्रोव्हायडर कनेक्शन्सवरील `rateLimitProtection` बुलियन फील्डद्वारे ट्रॅक केले जाते (SQLite मध्ये `rate_limit_protection` म्हणून टिकवलेले):

- **स्पष्ट चालू (`rateLimitProtection === true`)**: प्रोव्हायडर श्रेणी किंवा ऑटो-एनेबल सेफ्टी नेट चालू आहे का याचा विचार न करता, या कनेक्शनसाठी रेट-लिमिट संरक्षण स्पष्टपणे सक्षम केले जाते.
- **स्पष्ट बंद (`rateLimitProtection === false`)**: स्पष्ट संरक्षण अक्षम करते, परंतु सक्रिय API-की कनेक्शनला जागतिक ऑटो-एनेबल सेफ्टी नेटमधून बाहेर काढत **नाही**. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) मध्ये, `false` आणि `undefined` समतुल्य आहेत: फक्त `rateLimitProtection === true` लाच स्पष्ट ओव्हरराइड मानले जाते. `rateLimitProtection` `false` असल्यास (किंवा सेट नसल्यास), सक्रिय API-की कनेक्शन तरीही ऑटो-एनेबल अटीशी जुळते आणि रेट-लिमिट संरक्षित राहते.
- **प्रति-कनेक्शन ऑप्ट-आउट नाही**: इतरांसाठी ऑटो-एनेबल सक्रिय ठेवताना ऑपरेटर सध्या "हे एकल सक्रिय API-की कनेक्शन रेट-लिमिट रांग संरक्षणाशिवाय चालले पाहिजे" असे व्यक्त करू शकत नाही. API-की कनेक्शन्स रेट-लिमिट रांगांशिवाय पूर्णपणे चालवण्यासाठी, सेफ्टी नेट जागतिक पातळीवर बंद केले पाहिजे (`RATE_LIMIT_AUTO_ENABLE=false` किंवा `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**समर्थित राइट पथ:**

- **`POST /api/rate-limits`**: कनेक्शनसाठी `rateLimitProtection` टॉगल करण्यासाठीचा समर्थित व्यवस्थापन राइट पथ (`{ connectionId: string, enabled: boolean }`). हे `enabled: true` सह कॉल केल्याने स्पष्ट संरक्षण चालू होते; हे `enabled: false` सह कॉल केल्याने स्पष्ट संरक्षण काढले जाते (जरी ऑटो-एनेबल चालू असल्यास सक्रिय API-की कनेक्शन्स जागतिक सेफ्टी नेट अंतर्गत संरक्षित राहतात).
- **`PUT /api/providers/[id]`**: जाणीवपूर्वक `rateLimitProtection` स्वीकारत नाही किंवा फ्लिप करत नाही (#11278). `PUT /api/providers/[id]` द्वारे प्रोव्हायडर कनेक्शन मेटाडेटा अपडेट केल्याने टिकवलेली रेट-लिमिट संरक्षण स्थिती कधीही बदलणार नाही.

---

## 6. स्लो-स्ट्रीम थ्रूपुट वॉचडॉग (#9709)

पर्यायी `resilienceSettings.streamRecovery.throughputWatchdog` गार्ड एक अपस्ट्रीम शोधतो जो अजूनही भाग पाठवत आहे परंतु कॉन्फिगर केलेल्या उपयुक्त-आउटपुट दर खाली असिस्टंट आउटपुट तयार करतो. हे निष्क्रिय कालबाह्यतेपासून जाणूनबुजून वेगळे आहे: हृदयाचे ठोके आणि मेटाडेटा टाइमर रीसेट करत नाहीत आणि प्रगती म्हणून गणले जात नाहीत. हे कठोर प्रयत्नांच्या अंतिम मुदती (#9153) पासून देखील वेगळे आहे, जे आउटपुट गुणवत्तेची पर्वा न करता परिपूर्ण सुरक्षा मर्यादा राहते.

वॉचडॉगला वॉर्म-अप कालावधी आवश्यक असतो आणि त्यानंतर संपूर्ण रोलिंग विंडो गर्भपात होण्यापूर्वी. हे चॅट पूर्णता आणि प्रतिसाद API आउटपुट इव्हेंट (एक पुराणमतवादी UTF-8 बाइट प्रॉक्सी) मधील मजकूर डेल्टाची गणना करते, केवळ-वापर आणि रिकाम्या इव्हेंट्सकडे दुर्लक्ष करते आणि टूल-कॉल किंवा रिजनिंग इव्हेंट फ्लाइटमध्ये असताना निर्णय निलंबित करते. हे डीफॉल्टनुसार अक्षम केले जाते आणि `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` सह सक्षम केले जाऊ शकते (ते env मूल्य केवळ डीफॉल्ट — जतन केलेल्या `resilienceSettings.streamRecovery.throughputWatchdog.enabled` बुलियन विजयांना सीड करते; या मार्गदर्शकाच्या शीर्षस्थानी env-vs-डॅशबोर्ड अग्रक्रम टिप पहा); विंडो, वॉर्म-अप, किमान दर आणि किमान मोजण्यायोग्य आउटपुट सामान्य लवचिकता-सेटिंग्ज नॉर्मलायझेशन लेयरने बांधलेले आहेत.

सक्षम केल्यावर, वॉचडॉग रद्द करणे केवळ सक्रिय अपस्ट्रीम प्रयत्नांवर लागू केले जाते. कोणत्याही क्लायंट-दृश्यमान बाइट्सपूर्वी, विद्यमान समान-खाते लवकर पुनर्प्राप्ती मार्ग प्रयत्न पुन्हा उघडू शकतो. कमिट केल्यानंतर, प्रवाह कधीही आंधळेपणाने पुन्हा प्ले केला जात नाही; फक्त विद्यमान सुरक्षित मिड-स्ट्रीम कंटिन्युएशन कॉन्ट्रॅक्ट प्रत्यय जोडू शकतो. अंतिमीकरण एकल-शॉट राहते, म्हणून वापर लेखांकन आणि सेमाफोर प्रकाशन डुप्लिकेट केले जात नाही.

---

## 7. अपस्ट्रीम स्थितीचे पुनर्लेखन (चुकीच्या quota त्रुटी)

**व्याप्ती:** तात्पुरती quota संपल्याचे चुकीचा HTTP status देणारा एक upstream gateway.

**उद्देश:** वर्गीकरणापूर्वी दिशाभूल करणारा status दुरुस्त करणे, जेणेकरून downstream consumers (fallback engine, combo aggregation, client-facing response) अपयशाचे खरे retryable स्वरूप पाहतील.

काही gateways TEMPORARY quota exhaustion दर्शवण्यासाठी non-retryable HTTP
status वापरतात. `agentrouter.org` मानक `429` ऐवजी Chinese body
(`用户额度不足` / `额度不足`) सह `403` (कधी कधी `400`) परत करते. Claude
Code सारखे clients `403` ला permanent मानून session रद्द करतात आणि दुरुस्तीशिवाय
fallback engine त्याचे वर्गीकरण `AUTH_ERROR` ऐवजी quota event म्हणून करेल.

**अंमलबजावणी:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — प्रत्येक
  provider साठी नियमांची यादी (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), जी `applyStatusRestatement()` द्वारे
  जुळवली जाते.
- Call site: `open-sse/handlers/chatCore.ts` मधील `providerFailure:` block
  (सुमारे line 3654), जिथे `parseUpstreamError()` upstream response चा error HTTP
  status (`!providerResponse.ok`) असलेला प्रतिसाद parse करते त्यानंतर लगेच आणि
  कोणतेही classification चालण्यापूर्वी, त्यामुळे प्रत्येक downstream consumer ला
  दुरुस्त केलेला status दिसतो. `200` SSE stream मध्ये embedded असलेल्या errors
  स्वतंत्र, नंतरच्या stream-parsing path चे अनुसरण करतात आणि आज या hook च्या
  कक्षेत **नाहीत** — ही ज्ञात मर्यादा आहे; agentrouter च्या misstatus साठी
  सध्या त्याची गरज नाही, कारण तो error HTTP status म्हणून दिसतो.
- Retry eligibility: `429` हे `RETRY_AFTER_ELIGIBLE_STATUSES` मध्ये आहे
  (`open-sse/services/combo/unavailableRetryGate.ts`), त्यामुळे restated error
  dead `403` म्हणून दिसण्याऐवजी वास्तविक retry window घेऊन येतो.
- Synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) हे
  फक्त restated response **client** ला सांगते; ते connection चा अंतर्गत
  cooldown/lockout duration नाही — तो restated error प्रत्यक्षात हाताळणाऱ्या
  mechanism नुसार स्वतंत्रपणे नियंत्रित केला जातो (Connection Cooldown चे
  escalating backoff, §2, API-key providers साठी base `3s`; किंवा Model Lockout,
  §3, agentrouter सारख्या per-model-quota providers साठी). Router client ला
  जाहीर केलेल्या 60s window पेक्षा लवकर अंतर्गतरीत्या retry करण्यास पात्र होऊ
  शकतो — हा हेतुपुरस्सर headroom आहे, bug नाही.

Permanent errors (agentrouter चे `无权访问模型` — या model ला प्रवेश नाही) कधीही
restated केले जात **नाहीत**: `textMarkers` जुळले तरी `excludeMarkers` नियमाला
veto करते, त्यामुळे error त्याचा मूळ status राखतो आणि त्यावर अनंतकाळ retry होत
नाही. जुळणारा provider classification rule
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, घोषित `6h` base cooldown) generic
apikey-category `FORBIDDEN` early-return च्या _आधी_ `checkFallbackError`
(`open-sse/services/accountFallback.ts`) द्वारे तपासला जातो,
`honorsRuleLockScope(provider)` (#10334 — सध्या
`providerErrorRules.ts` मधील `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist द्वारे
फक्त agentrouter साठी) या अटीवर. नियमाचा घोषित 6h cooldown
`fallbackResult.baseCooldownMs` म्हणून पुढे जातो, परंतु तो अद्याप पूर्वीपासून
असलेल्या per-model-quota lockout path
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`) मध्येच feed होतो
(`#10334` ने cooldown source वगळता यात बदल केलेला नाही): तो operator च्या
`mlSettings.maxCooldownMs` (`1_800_000ms` / 30min चे default) पर्यंत खाली
clamp केला जातो, प्रत्येक इतर model lockout प्रमाणेच, आणि _persisted lockout
reason_ पूर्वीपासून hardcoded असलेला `"forbidden"` राहतो, नियमातील
`"auth_error"` नाही — end-to-end फक्त cooldown duration मान्य केला जातो, reason
string नाही. Connection स्वतः active राहते; त्याच connection वरील sibling models
प्रभावित होत नाहीत.

Restated quota errors (`额度不足`) production मध्ये provider rule पर्यंत पोहोचतात
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, स्वतःचा घोषित cooldown नाही — persistence layer चा scaled backoff
default लागू होतो). #10334 पासून `ProviderErrorRuleMatch` वरील `scope`
end-to-end वापरला जातो, परंतु **फक्त** `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
allowlist मधील providers साठी (`providerErrorRules.ts` — आज फक्त
`"agentrouter"`, `honorsRuleLockScope()` द्वारे नियंत्रित). इतर प्रत्येक
provider साठी `scope` माहितीपरच राहतो, #10334 पूर्वीप्रमाणेच.
`checkFallbackError` जुळलेल्या rule चा scope `fallbackResult.ruleScope` म्हणून
दाखवते; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) हा shared guard आहे, जो `ruleScope` ला
connection-wide, self-recovering signal म्हणून वापरणे खरोखर सुरक्षित आहे याची
पुष्टी करतो (scope `"connection"`, reason `quota_exhausted`, कधीही `permanent`
नाही, कधीही `creditsExhausted` नाही — भविष्यातील एखाद्या rule ने scope
`"connection"` ला permanent account state सोबत जोडण्यापासून बचाव). दोन
consumers त्याला call करतात:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider च्या **per-model** lockout
  branch मध्ये जाण्याऐवजी (agentrouter मध्ये `passthroughModels: true` → `hasPerModelQuota()`
  `true` परत करते), हे **तात्पुरते connection cooldown** लागू करते —
  `testStatus: "unavailable"` + `rateLimitedUntil`, कधीही terminal status
  (`credits_exhausted`/`banned`/`expired`) नाही — त्यामुळे cooldown संपल्यानंतर
  connection स्वतः recover होते आणि manual credential reset ची गरज राहत नाही.
  `disableCooling: true` असलेल्या connections साठी हे वगळले जाते (#2997):
  हा opt-out त्याऐवजी per-model lockout कडे जातो (हा दस्तऐवजीकृत trade-off आहे —
  branch वरील code comment पहा).
- **त्याच request मधील combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): हाच guard connection ला
  `${provider}:${connectionId}` या key ने in-memory `exhaustedConnections` set मध्ये
  नोंदवतो. यामुळे फक्त असा उरलेला SAME-REQUEST target skip होतो, ज्याच्या स्वतःच्या
  target object वर तोच अचूक `connectionId` आधीपासून आहे
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` lookup पूर्वीचे
  `if (provider && connectionId)`) — साध्या
  model-list combo मध्ये sibling targets वर स्वतःचा pinned `connectionId` नसतो आणि प्रत्येक
  dispatch वेळी response मधील
  `X-OmniRoute-Selected-Connection-Id` header मधून तो resolve होतो; त्यामुळे त्या
  common case मध्ये हा key match कधीच होत नाही. त्या सामान्य प्रकरणात, उरलेल्या leg ने
  नुकतेच exhausted झालेले account पुन्हा वापरू नये याचे वास्तविक संरक्षण हे Set नाही —
  वरचा persistence layer (connection चे `rateLimitedUntil` आता भविष्यातील वेळ दर्शवते)
  आणि failure साठी `transientRateLimitedProviders` suppress करणारा हाच guard यांचे
  संयोजन आहे (`targetExhaustion.ts` मधील `isAgentrouterConnectionQuotaScope` branch वरील
  "Two-stage design" आणि code comment पहा): Set वर नोंद न केल्यामुळे
  `combo.ts` मधील `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider च्या उरलेल्या legs साठी
  लागू होत नाही; त्यामुळे credential selection मधील `rateLimitedUntil` filter
  (`src/sse/services/auth.ts:1238`) नेहमीप्रमाणे लागू राहतो आणि उरलेली leg वेगळी,
  अजूनही eligible असलेली agentrouter connection निवडते किंवा credentials उपलब्ध नसल्यामुळे
  fail होते — हा branch नुकताच cooldown केलेल्या connection वर परत जाण्यासाठी जबरदस्ती
  करत नाही.

### Two-stage design: status restatement, then classification

Status restatement (`upstreamStatusRestatement.ts`) आणि provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) हे दोन्ही provider id आणि text markers वर आधारित स्वतंत्र
registries आहेत; परंतु ते वेगवेगळ्या ठिकाणी चालतात आणि त्यांचे उद्देशही वेगळे आहेत:
restatement `chatCore.ts` मध्ये HTTP status लवकर rewrite करते;
classification rules `checkFallbackError()` मध्ये fallback `reason` निवडतात आणि
`scope` (`model` / `provider` / `connection`) lock करतात
(`open-sse/services/accountFallback.ts`).

Classification rules ना पूर्ण error **text** दिसतो (body markers जसे `额度不足`
जुळवण्यासाठी आवश्यक) फक्त `providerErrorRules.ts` मधील
`FULL_TEXT_RULE_PROVIDERS` allowlist मध्ये असलेल्या providers साठी — सध्या फक्त
`"agentrouter"`. इतर प्रत्येक **built-in catalog** provider साठी
`checkFallbackError`, `getProviderErrorRuleMatch` ला फक्त structured error
(`{code, type}`) देते; header/status/code-आधारित rules साठी हे पुरेसे आहे, परंतु
body-text markers साठी ते blind असते.
`resolveRuleMatchBody()` helper ही निवड करते: allowlisted providers साठी पूर्ण error
text, अन्यथा structured error. एखादा **built-in** provider
`FULL_TEXT_RULE_PROVIDERS` मध्ये जोडणे हा त्या provider साठी स्पष्ट opt-in आहे —
या यादीत नसलेल्या प्रत्येक provider साठी default path byte-for-byte अपरिवर्तित राहावा
यासाठी ही रचना आहे.

एखाद्या rule चे `scope` (`model` / `provider` / `connection`) हे
`FULL_TEXT_RULE_PROVIDERS` पासून स्वतंत्र opt-in आहे:
`checkFallbackError` ते फक्त `fallbackResult.ruleScope` म्हणून पुढे पाठवते आणि
downstream consumers ते informational label पेक्षा अधिक काही म्हणून फक्त
त्याच file मधील `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मधील providers साठीच
मान्य करतात (`honorsRuleLockScope()` द्वारे gating — आज फक्त `"agentrouter"`).
एखादा provider त्या allowlist मध्ये आल्यानंतर `scope: "connection"` match प्रत्यक्षात
काय करते, यासाठी वरील "Restated quota errors" पहा.

**#11104 — operator-declared rules दोन्ही allowlists ला bypass करतात.** Operator
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) द्वारे
runtime मध्ये प्रति-provider rule घोषित करू शकतो; या file मध्ये बदल करण्याची गरज नाही.
Operator rule ला `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
यांच्या मागे ठेवणे — या allowlists **default** built-in catalog rules चे संरक्षण
करण्यासाठी आहेत — यामुळे settings mechanism आधीच सूचीबद्ध असलेल्या providers व्यतिरिक्त
प्रत्येक provider साठी inert ठरेल, कारण rule घोषित करणे हा operator चा स्पष्ट opt-in
आधीच आहे. `resolveRuleMatchBody()` आणि `honorsRuleLockScope()` दोन्ही प्रथम
`hasOperatorRuleForProvider()` तपासतात: operator rule असलेल्या provider ला raw error
text मिळतो आणि त्याचा घोषित `scope` मानला जातो, तो provider कोणत्याही allowlist मध्ये
असला किंवा नसला तरी.

**Operator-declared rules** (`OperatorProviderErrorRule`): प्रत्येक rule मध्ये
optional `status` आणि optional `match` असतो (`match` हा error text मधील साधा,
case-insensitive substring असतो, कधीही RegExp नसतो; त्यामुळे ReDoS होऊ शकत नाही),
आणि दोन्हीपैकी किमान एक सेट केलेला असणे आवश्यक आहे. दोन्ही सेट असल्यास त्यांच्यात
AND केले जाते; एखादे field वगळले असल्यास ते कोणत्याही मूल्याशी match होते, त्यामुळे
`{match: "insufficient_quota"}` हा code असलेल्या कोणत्याही status शी match होतो.
पहिला match होणारा rule लागू होतो. `cooldownMs` कमाल 30 दिवस स्वीकारते; एकूण
जास्तीत जास्त 50 rules.

**सर्वसमावेशक डीफॉल्ट्स** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` द्वारे सेट केलेले): `{[provider]: {cooldownMs, scope?, reason?}}`
यामध्ये `cooldownMs` 1 मिनिटापासून 30 दिवसांपर्यंत असतो. कोणताही operator नियम आणि कोणताही built-in catalog नियम जुळला नसेल, तेव्हाच डीफॉल्ट लागू होतो; तसेच तो केवळ 402, 403, 408, 429 आणि 5xx त्रुटींना लागू होतो. Request-shape त्रुटी (400, 404, 409, 413, 422) आणि केवळ 401 असलेल्या त्रुटींची स्वतःची हाताळणी कायम राहते. स्पष्ट `reason` नसल्यास, `classifyError` ज्या पद्धतीने करते त्याच पद्धतीने status वरून reason घेतला जातो. डीफॉल्ट घोषित केल्यास `hasOperatorRuleForProvider()` साठी तो operator नियम मानला जातो; त्यामुळे त्याचा `scope` (डीफॉल्ट `"connection"`) लागू होतो. डीफॉल्टचा प्रभावी cooldown हा त्याच्या `cooldownMs` आणि provider च्या स्वतःच्या retry hint (`Retry-After`, `x-ratelimit-reset` किंवा body मधील reset hint — connection-cooldown setting "use upstream retry hints" चालू असताना engine ज्या hint चा सन्मान करते तोच hint) यांपैकी अधिक मोठा असतो. त्यामुळे डीफॉल्ट अल्प upstream hint वाढवू शकतो, पण वास्तविक reset लवकर संपवू शकत नाही. स्पष्ट operator नियम त्याचा अचूक `cooldownMs` कायम ठेवतो. `markAccountUnavailable` मधील connection-cooldown guards ला कोणताही नियम किंवा डीफॉल्ट वगळत नाही: सक्रिय, अधिक मोठा cooldown कधीही कमी केला जात नाही आणि terminal status कधीही बदलला जात नाही. `checkFallbackError` मध्ये आधी चालणारे built-in text detectors (credits exhausted, daily quota, account deactivated) त्यांच्या स्वतःच्या phrases साठी अजूनही प्राधान्य राखतात.

**ज्ञात उणीव — `providerRuleRegistry` चा HTTP 400 साठी कधीही सल्ला घेतला जात नाही.**
`checkFallbackError` ची `BAD_REQUEST` शाखा status 400 चे वर्गीकरण पूर्णपणे स्वतःच्या pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, इत्यादी `accountFallback.ts` मधील) द्वारे करते आणि तिच्या वरील `configuredRule`/`getProviderErrorRuleMatch` शाखेपर्यंत पोहोचण्यापूर्वीच परत येते.
`status: 400` असलेला built-in catalog नियम (किंवा operator नियम) syntactically valid असला तरी तो कधीही लागू होणार नाही. सध्या कोणताही विद्यमान नियम 400 ला लक्ष्य करत नाही, त्यामुळे production मध्ये काहीही प्रभावित होत नाही — परंतु भविष्यातील 400 नियमासाठी आधी ही शाखा बदलावी लागेल. हे केवळ नियम जोडण्यापेक्षा मोठे बदल आहे, कारण pattern-array वर्तनावर आधीपासून अवलंबून असलेल्या प्रत्येक provider साठी ते 400 चे वर्गीकरण बदलते; म्हणून एका provider साठी नियम जोडण्याच्या व्याप्तीबाहेर आहे.

### नवीन quota-misstating gateway जोडणे

1. `statusRestatementRegistry` मध्ये (`open-sse/config/upstreamStatusRestatement.ts`) एक rule array नोंदवा. `textMarkers` provider-specific ठेवा; `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) शी संघर्ष करणारी generic English phrases कधीही पुन्हा वापरू नका.
2. योग्य lock scope निवडण्यासाठी `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) मध्ये classification rules ऐच्छिकरीत्या नोंदवा (`connection` account-wide quota साठी, `model` प्रति-model त्रुटींसाठी). हा टप्पा production मध्ये केवळ अशा providers साठी प्रभावी होतो ज्यांच्या rules ना पूर्ण error text (body markers) आवश्यक असतो: त्याच file मधील `FULL_TEXT_RULE_PROVIDERS` मध्ये provider id जोडा — अन्यथा `checkFallbackError` rule ला structured `{code, type}` errorच देईल आणि body-text rule live traffic शी कधीही जुळणार नाही. केवळ `status`/`headers` वर जुळणाऱ्या rules ना (Opencode किंवा Minimax च्या rules प्रमाणे) या opt-in ची आवश्यकता नसते. स्वतंत्रपणे, जर rule ने `scope: "connection"` घोषित केले असेल आणि उद्देश प्रत्यक्ष connection-wide cooldown तसेच same-request combo skip हा असेल (फक्त माहितीपर label नव्हे), तर त्याच file मधील `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मध्ये provider id जोडा — `markAccountUnavailable()` (`src/sse/services/auth.ts`) आणि `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) मधील `isAgentrouterConnectionQuotaScope()`-style consumption याचद्वारे नियंत्रित होते; हे न केल्यास `scope` तरीही `fallbackResult.ruleScope` मधून पुढे जाते, परंतु त्यावर कोणतीही क्रिया होत नाही.
3. `tests/unit/upstream-status-restatement.test.ts`
   आणि `tests/unit/agentrouter-error-rules.test.ts` यांच्यासारख्या unit tests जोडा (यामध्ये not-permanent / not-creditsExhausted guards समाविष्ट करा; तसेच — provider ला allowlist आवश्यक असल्यास — `resolveRuleMatchBody()` त्या provider साठीच full text परत करते हे तपासणारी test जोडा).

`chatCore.ts`, `classifyError` किंवा combo मध्ये कोणतेही बदल आवश्यक नाहीत.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` मधील providers (opencode family) यांना IP-bucketed upstream म्हणून हाताळले जाते (opencode free tier account-bucketed नसून IP-bucketed आहे — #9611 पहा): `quota_exhausted`
**किंवा** `rate_limit_exceeded` म्हणून वर्गीकृत झालेला status-429, अपयशी connection च्या शेवटच्या ज्ञात egress IP शी जुळणाऱ्या प्रत्येक allowlisted-family connection ला rotation त्यांचा प्रयत्न करण्यापूर्वी cooldown मध्ये ठेवतो
— त्यामुळे N-1 हमखास-अयशस्वी upstream calls टाळल्या जातात (#10460/#10525 प्रमाणेच).
`rate_limit_exceeded` जाणीवपूर्वक समाविष्ट केले आहे: `markAccountUnavailable` path वर opencode-specific rules कधीही जुळत नाहीत (`checkFallbackError` ला headers/body दिले जात नाहीत आणि opencode `FULL_TEXT_RULE_PROVIDERS` मध्ये नाही), त्यामुळे subscription-quota text ("monthly usage limit reached") असलेला body असलेला 429, `status_429` rule पर्यंत पोहोचण्यापूर्वी quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) द्वारे `quota_exhausted` म्हणून वर्गीकृत होतो — तर quota-text नसलेला 429 (साधा rate limiting) `status_429` rule द्वारे `rate_limit_exceeded` म्हणून वर्गीकृत होतो आणि तरीही संपूर्ण IP family ला cooldown मध्ये ठेवतो. Allowlisted provider साठी IP-bucketed rate limit हा exhausted quota सारखाच signal असतो. प्रामाणिक मर्यादा:

- **सर्वोत्तम प्रयत्नाधारित**: लॉक `proxy_logs` मधून (24h विंडो, synchronous, cache शिवाय) कनेक्शनचा शेवटचा ज्ञात `egress_ip` शोधतो. Cold cache (`egress_ip` ची कधीही तपासणी झालेली नाही) किंवा कोणतीही row नसल्यास → अयशस्वी कनेक्शनला branch द्वारे तरीही cooldown दिला जातो (आजप्रमाणे नोंदवला जातो), फक्त कोणतेही sibling लॉक केले जात नाही.
- **कधीही terminal नाही**: cooldown ही नूतनीकरण होणारी quota window आहे
  (`testStatus: "unavailable"`); IP-level signal वरून permanent state कधीही
  derive केली जात नाही. `disableCooling` कनेक्शन्स branch पूर्णपणे वगळतात.
- **allowlisted family साठी लॉकची granularity बदलते**: हा केवळ sibling optimization नसून scope change आहे. opencode हा `passthroughModels` provider आहे, त्यामुळे या branch पूर्वी 429 मुळे per-MODEL lockout निर्माण होत असे; आता त्याऐवजी connection cooldown निर्माण होतो — एकही sibling नसलेल्या single connection वर operator चालवत असला तरीही. opencode rule table आधीपासून योग्य म्हणून घोषित करते तीच granularity (`scope: "connection"`,
  `providerErrorRules.ts`), परंतु opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मध्ये नसल्यामुळे ती आतापर्यंत कधीही लागू झाली नव्हती. हा branch अयशस्वी कनेक्शनचा cooldown + `backoffLevel` स्वतः लिहितो, connection-scoped agentrouter branch प्रमाणेच, आणि return करतो — per-model block आणि खालील generic path कधीही गाठले जात नाहीत.
- **Combo समाविष्ट**: agentrouter branch प्रमाणेच, हा scope combo caller 429 वर लागू करत असलेला `persistUnavailableState`/`isCombo` downgrade जाणीवपूर्वक दुर्लक्षित करतो. Per-model lockout हा या scope चा कमकुवत प्रकार नाही; तो चुकीचा unit आहे: तो exhausted IP बद्दल काहीही सांगत नाही, त्यामुळे combo rotation प्रत्येक sibling साठी हमखास अयशस्वी होणारा एक call करतच राहील.
- **Sibling safety**: आधीच terminal (banned/credits_exhausted) असलेला किंवा आधीपासून अधिक मोठ्या cooldown मध्ये असलेला sibling कधीही overwrite केला जात नाही.
- **Exclusive allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` विस्तृत करणे हा स्पष्ट owner decision आहे; कोणतेही generic wiring नाही (pattern #10334/#10419). Sibling query तीच allowlist पुन्हा SQL literal म्हणून लिहिण्याऐवजी bind करते, त्यामुळे ती विस्तृत करणे अजूनही one-line change राहते.
- **Egress IP rotation, दोन्ही दिशांनी**: lookup window (24h) ही egress-IP cache TTL (5 min) पेक्षा खूप मोठी आहे, त्यामुळे "last known IP" हा इतिहास आहे, सध्याची state नाही. एखाद्या कनेक्शनचा proxy या window मध्ये rotate झाला असल्यास लॉक खरोखर shared असलेला IP **चुकवू शकतो** (नोंदवलेला IP नवीन आणि अद्याप exhausted नसलेला असतो) — आणि त्याचप्रमाणे exhausted IP पासून नंतर rotate away झालेल्या sibling ला **cooldown देऊ शकतो**. दुसऱ्या प्रकरणात त्या sibling ला एक cooldown window सहन करावी लागते; history-based lookup च्या या दोन्ही best-effort मर्यादा स्वीकारल्या आहेत.
- **Cost**: `proxy_logs` चे दोन bounded scans (`idx_pl_timestamp` द्वारे window-filtered), आणि तेही केवळ 429 frequency वर. कोणताही नवीन index नाही (migration 134 YAGNI). मध्यम आकाराच्या, प्रत्यक्ष traffic असलेल्या DB copy वर मोजमाप केले; high-throughput instance त्याच window मध्ये प्रमाणानुसार अधिक rows ठेवते.

## इतर रेझिलियन्स वैशिष्ट्ये

- **20 राउटिंग स्ट्रॅटेजीज** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) पहा.
- **रीसेट-अवेअर राउटिंग** (v3.8.0) — कोटा रीसेट वेळेनुसार कनेक्शन्सना प्राधान्य देते.
- **बॅकग्राउंड मोड डिग्रेडेशन** — Responses API `background: true` इशाऱ्यासह सिंक मध्ये डिग्रेड केले जाते.
- **डायनॅमिक टूल लिमिट डिटेक्शन** — टूल संख्या मर्यादा गाठल्यावर प्रोव्हायडरना बॅक-ऑफ करते.
- **इमर्जन्सी फॉलबॅक** — `OMNIROUTE_EMERGENCY_FALLBACK` द्वारे नियंत्रित; ऑपरेटर रीस्टार्ट न करता Feature Flags पृष्ठावरून ते ओव्हरराइड करू शकतात.

---

## डीबगिंग

- वेटेड कॉम्बो `503 all_targets_cooling_down` उत्तर देते (`Retry-After` सेट, `diagnostics.excluded` प्रत्येक टार्गेट `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` सह सूचीबद्ध करते) → पूल कॉन्फिगर आणि कनेक्ट केलेला आहे, प्रत्येक टार्गेट फक्त रेझिलियन्स टायमरमुळे वगळलेला आहे; `[COMBO] Weighted selection: every target excluded before dispatch — …` हा इशारा कारणे आणि उरलेले सेकंद नमूद करतो. त्याच कॉम्बोकडून आलेला `404 no_executable_targets` म्हणजे कोणताही रेझिलियन्स टायमर सहभागी नव्हता (चालवण्यासारखे काही नाही, किंवा प्रत्येक अकाउंट अव्हेलेबिलिटी प्रोबमध्ये अयशस्वी). `targetResolution.ts` मध्ये गोळा केलेल्या एक्सक्लूझन्सपासून `open-sse/services/combo/pinRecovery.ts` मध्ये तयार केलेले.
- एखाद्या प्रोव्हायडरच्या सर्व की वगळल्या → सर्किट ब्रेकर स्टेट **आणि** प्रत्येक कनेक्शनचा `rateLimitedUntil`/`testStatus` दोन्ही तपासा.
- रीसेट विंडोनंतर प्रोव्हायडर कायमचा वगळला → `getStatus()`/`canExecute()` ऐवजी कच्चा `state` वाचणारा कोड.
- एक की अयशस्वी, इतर कार्य करायला हव्यात → सर्किट ब्रेकरऐवजी कनेक्शन कूलडाउनला प्राधान्य द्या.
- फक्त एक मॉडेल अयशस्वी → कनेक्शन कूलडाउनऐवजी मॉडेल लॉकआउटला प्राधान्य द्या.
- स्टेटने स्वतः रिकव्हर व्हायला हवे पण होत नाही → भविष्यातील टाइमस्टॅम्प + एक्सपायर्ड स्टेट रिफ्रेश करणारा रीड पाथ तपासा. कायमस्वरूपी स्टेटसना मॅन्युअल बदल आवश्यक असतात.

---

## रनटाइम स्टेट — एजंट क्विक रेफरन्स

> `AGENTS.md` → "Resilience Runtime State" (PR #12743) मधून शब्दशः हलवलेले, जेणेकरून एजंट
> मार्गदर्शक 40k कॉन्टेक्स्ट बजेटच्या आत राहील. हे वरील विभागांचे संक्षिप्त, एजंट-समोरील
> दृश्य आहे; क्रमांकित विभाग संपूर्ण संदर्भ म्हणून राहतात.

OmniRoute मध्ये तीन परस्पर संबंधित पण वेगळ्या तात्पुरत्या-अपयश यंत्रणा आहेत. राउटिंग
वर्तन डीबग करताना त्यांची व्याप्ती वेगळी ठेवा. एका दृष्टिक्षेपात नकाशा पाहण्यासाठी
[3-स्तर रेझिलियन्स आकृती](../diagrams/exported/resilience-3layers.svg)
(स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
पहा.

### प्रोव्हायडर सर्किट ब्रेकर

**व्याप्ती**: संपूर्ण प्रोव्हायडर, उदा. `glm`, `openai`, `anthropic`.

**उद्देश**: अपस्ट्रीम/सेवा स्तरावर वारंवार अयशस्वी होणाऱ्या प्रोव्हायडरकडे ट्रॅफिक पाठवणे
थांबवणे, जेणेकरून एका अस्वस्थ प्रोव्हायडरमुळे प्रत्येक विनंती मंदावत नाही.

**अंमलबजावणी**:

- मुख्य क्लास: `src/shared/utils/circuitBreaker.ts`
- चॅट गेट/एक्झिक्युशन वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- रनटाइम स्टेटस API: `src/app/api/monitoring/health/route.ts`
- शेअर्ड रॅपर्स: `open-sse/services/accountFallback.ts`
- कायमस्वरूपी स्टेट टेबल: `domain_circuit_breakers`

**स्टेट्स** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: सामान्य ट्रॅफिकला परवानगी आहे.
- `DEGRADED`: पूर्व-इशारा पट्टा — अपयशांनी डिग्रेडेशन थ्रेशोल्ड ओलांडला पण अजून
  ब्रेकर थ्रेशोल्ड ओलांडला नाही; ट्रॅफिक अजूनही वाहतो, डॅशबोर्ड इशारा दाखवतात. वैध कनेक्शन
  टेस्ट किंवा नवीन अपयश नसलेली शांत विंडो ते पुन्हा `CLOSED` वर आणते
  (`docs/architecture/RESILIENCE_GUIDE.md` मध्ये विंडो दिलेली आहे).
- `OPEN`: प्रोव्हायडर तात्पुरता ब्लॉक केलेला आहे; कॉलर्सना प्रोव्हायडर-सर्किट-ओपन प्रतिसाद
  मिळतो किंवा कॉम्बो राउटिंग दुसऱ्या टार्गेटकडे वळते.
- `HALF_OPEN`: रीसेट टाइमआउट संपला आहे; प्रोब विनंतीला परवानगी द्या. यश ब्रेकर बंद
  करते, अपयश तो पुन्हा उघडते.

**डीफॉल्ट्स** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` मधील
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` मार्फत वापरले जातात →
`src/sse/handlers/chatHelpers.ts` मधील `getCircuitBreaker(provider, …)`). संपूर्ण-प्रोव्हायडर
ब्रेकर `circuitBreakerThreshold` / `circuitBreakerReset` वर चालतो:

| प्रोफाइल | डिग्रेड होते | उघडते (`circuitBreakerThreshold`) | रीसेट (`circuitBreakerReset`) |
| -------- | -----------: | --------------------------------: | ----------------------------: |
| OAuth    |          `5` |                               `8` |                         `60s` |
| API की   |          `7` |                              `12` |                         `30s` |
| लोकल     | (व्युत्पन्न) |                               `2` |                         `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 मिनिटे) आणि `providerCooldownMs` (5/10/1 मिनिटे) देखील परिभाषित करते: हे
**ऑप्ट-इन ग्लोबल Provider Cooldown च्या विंडो गेटला** (`PROVIDER_COOLDOWN_ENABLED`, डीफॉल्ट
बंद) चालना देतात — `open-sse/services/providerCooldownTracker.ts` मधील प्रोव्हायडर-स्तरीय एंट्री
`providerFailureWindowMs` च्या आत `providerFailureThreshold` अपयशांनंतरच कूलिंग म्हणून मोजली जाते, आणि नंतर
`providerCooldownMs` इतक्या काळासाठी कूल होते. हे लाइव्ह ब्रेकरचे थ्रेशोल्ड्स **नाहीत** — ब्रेकर
वर्तनाची अपेक्षा ठेवून त्यांना ट्यून करू नका. प्रत्येक डीफॉल्ट
`OMNIROUTE_PROVIDER_BREAKER_*` आणि `OMNIROUTE_CIRCUIT_BREAKER_*` एन्व्ह व्हेअरमधून ओव्हरराइड
करता येतो; रनटाइम-अचूक संदर्भ तक्ता `docs/architecture/RESILIENCE_GUIDE.md` मध्ये आहे.

फक्त प्रोव्हायडर-स्तरीय अपयश स्टेटसने प्रोव्हायडर ब्रेकर ट्रिप केला पाहिजे:

```ts
(408, 500, 502, 503, 504);
```

बहुतेक `401`, `403` किंवा `429` प्रकरणांसारख्या सामान्य अकाउंट/की/मॉडेल एरर्ससाठी
संपूर्ण-प्रोव्हायडर ब्रेकर ट्रिप करू नका. ते सहसा कनेक्शन कूलडाउन किंवा मॉडेल
लॉकआउटमध्ये मोडतात. जेनेरिक API-की प्रोव्हायडरचा `403` रिकव्हर करण्यायोग्य असला पाहिजे,
जोपर्यंत त्याला टर्मिनल प्रोव्हायडर/अकाउंट एरर म्हणून वर्गीकृत केलेले नाही.

ब्रेकर बॅकग्राउंड टाइमर नाही, तर लेझी रिकव्हरी वापरतो. जेव्हा `OPEN` कालबाह्य होते, तेव्हा
`getStatus()`, `canExecute()` आणि `getRetryAfterMs()` यांसारखे रीड कॉल्स स्थिती
`HALF_OPEN` मध्ये रिफ्रेश करतात, त्यामुळे डॅशबोर्ड आणि कॉम्बो कँडिडेट बिल्डर्स
कालबाह्य झालेल्या प्रोव्हायडरला कायमचे वगळत राहत नाहीत.

### कनेक्शन कूलडाउन

**व्याप्ती**: एक प्रोव्हायडर कनेक्शन/खाते/की.

**उद्देश**: त्याच प्रोव्हायडरची इतर कनेक्शने विनंत्या पुरवत राहू देताना एका
समस्याग्रस्त की/खात्याला तात्पुरते वगळणे.

**अंमलबजावणी**:

- लेखन/अपडेट मार्ग: `src/sse/services/auth.ts::markAccountUnavailable()`
- खाते निवड/फिल्टरिंग: `src/sse/services/auth.ts::getProviderCredentials...`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्ज: `src/lib/resilience/settings.ts`

प्रोव्हायडर कनेक्शनवरील महत्त्वाची फील्ड्स:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

खाते निवडताना, खालील स्थिती असताना कनेक्शन वगळले जाते:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

कूलडाउन देखील लेझी असतात: जेव्हा `rateLimitedUntil` भूतकाळात असते, तेव्हा कनेक्शन पुन्हा
पात्र होते. यशस्वी वापरानंतर, `clearAccountError()` `testStatus`,
`rateLimitedUntil`, एरर फील्ड्स आणि `backoffLevel` साफ करते.

डीफॉल्ट कनेक्शन कूलडाउन वर्तन:

- OAuth बेस कूलडाउन: `5s`.
- API-की बेस कूलडाउन: `3s`.
- API-की `429` ने उपलब्ध असताना अपस्ट्रीम रिट्राय संकेतांना (`Retry-After`, रीसेट हेडर्स
  किंवा पार्स करण्यायोग्य रीसेट मजकूर) प्राधान्य दिले पाहिजे.
- वारंवार होणारी पुनर्प्राप्त करण्यायोग्य अपयशे एक्स्पोनेन्शियल बॅकऑफ वापरतात:

```ts
baseCooldownMs * 2 ** failureIndex;
```

अँटी-थंडरिंग-हर्ड गार्ड एकाच कनेक्शनवरील समवर्ती अपयशांमुळे कूलडाउन वारंवार वाढणे
किंवा `backoffLevel` दुहेरी इन्क्रिमेंट होणे रोखते.

टर्मिनल स्थिती म्हणजे कूलडाउन नाहीत. `banned`, `expired` (जी `EXPIRED_RETRY_MAX` मुळे N बाउंडेड रिट्रायनंतरच टर्मिनल बनते) आणि `credits_exhausted` या
स्थिती क्रेडेन्शियल्स/सेटिंग्ज बदलेपर्यंत किंवा ऑपरेटर त्यांना रीसेट करेपर्यंत
अनुपलब्ध राहण्यासाठीच असतात. टर्मिनल स्थिती क्षणिक कूलडाउन स्थितीने ओव्हरराइट करू नका.

### मॉडेल लॉकआउट

**व्याप्ती**: प्रोव्हायडर + कनेक्शन + मॉडेल.

**उद्देश**: त्या कनेक्शनसाठी फक्त एकच मॉडेल अनुपलब्ध किंवा कोटा-मर्यादित असताना
संपूर्ण कनेक्शन अक्षम होणे टाळणे.

उदाहरणे:

- `429` परत करणारे प्रति-मॉडेल कोटा प्रोव्हायडर.
- एका हरवलेल्या मॉडेलसाठी `404` परत करणारे स्थानिक प्रोव्हायडर.
- निवडलेल्या Grok मोड्ससारखी प्रोव्हायडर-विशिष्ट मोड/मॉडेल परवानगी अपयशे.

मॉडेल लॉकआउट `open-sse/services/accountFallback.ts` मध्ये आहे आणि तेच कनेक्शन इतर
मॉडेल्सना सेवा देत राहू देते.

### डीबगिंग मार्गदर्शन

- जर प्रोव्हायडरच्या सर्व की वगळल्या गेल्या असतील, तर प्रोव्हायडर ब्रेकर स्थिती आणि प्रत्येक
  कनेक्शनचे `rateLimitedUntil`/`testStatus` दोन्ही तपासा.
- जर रीसेट विंडोनंतर प्रोव्हायडर कायमचा वगळलेला दिसत असेल, तर कोड
  `getStatus()`/`canExecute()` वापरण्याऐवजी रॉ `state` वाचत आहे का ते तपासा.
- जर एक प्रोव्हायडर की अपयशी झाली पण इतर की काम करायला हव्यात, तर प्रोव्हायडर ब्रेकरऐवजी
  कनेक्शन कूलडाउन पसंत करा.
- जर फक्त एकच मॉडेल अपयशी झाले असेल, तर कनेक्शन कूलडाउनऐवजी मॉडेल लॉकआउट पसंत करा.
- जर एखादी स्थिती स्वतःच रिकव्हर व्हायला हवी असेल, तर तिला भविष्यातील
  टाइमस्टॅम्प/रीसेट टाइमआउट आणि कालबाह्य स्थिती रिफ्रेश करणारा रीड पथ असला पाहिजे.
  कायमस्वरूपी स्थितींसाठी मॅन्युअल क्रेडेन्शियल किंवा कॉन्फिग बदल आवश्यक असतात.

---

## TLS फिंगरप्रिंटिंग आणि स्टेल्थ

प्रोव्हायडर-विशिष्ट स्टेल्थ (JA3/JA4, CCH, ऑबफस्केशन) स्वतंत्रपणे दस्तऐवजीकृत आहे — `docs/security/STEALTH_GUIDE.md` पहा (git; `/docs` मध्ये कंपाइल केलेले नाही).

---

## रेझिलियन्स चाचणी (फेज 8 · ब्लॉक C)

रेझिलियन्स लॉजिकसाठीच्या युनिट टेस्ट्सच्या पलीकडे, तीन चाचण्या खऱ्या ताण/अपयश परिस्थितींखाली रनटाइमची कसोटी तपासतात (सर्व इंटिग्रेशन/नाइटली — त्यापैकी कोणतीही PR ब्लॉक करत नाही):

| चाचणी   | काय                                                                                                                                                                                                    | चालवा                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| केऑस    | फेक-अपस्ट्रीम नोड खरी लेटन्सी/रीसेट/टाइमआउट/503 इंजेक्ट करतो; सर्किट ब्रेकर उघडतो/पुनर्प्राप्त होतो आणि `checkFallbackError` 503 ला रिकव्हर करण्यायोग्य फॉलबॅक म्हणून वर्गीकृत करते याची पडताळणी करतो. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| हीप-वाढ | `--expose-gc` अंतर्गत प्रत्येक `createSSEStream` साठी ~500 स्ट्रीम्स; हीप मर्यादेच्या पलीकडे वाढल्यास अयशस्वी होते (OOM गार्ड #3069).                                                                  | `npm run test:heap`                     |
| k6 सोक  | `/api/monitoring/health` विरुद्ध सातत्यपूर्ण लोड; p95/एरर थ्रेशहोल्ड्स.                                                                                                                                | `k6 run tests/load/k6-soak.js` (नाइटली) |

`.github/workflows/nightly-resilience.yml` (cron + डिस्पॅच) द्वारे ऑर्केस्ट्रेट केलेले. डीफॉल्ट `test:integration` मध्ये, केऑस आणि हीप स्वतः-स्किप करतात (`RUN_CHAOS_INT`/`--expose-gc` शिवाय).

---

## आणखी पहा

- [आर्किटेक्चर मार्गदर्शक](./ARCHITECTURE.md) — सिस्टम आर्किटेक्चर आणि अंतर्गत बाबी
- [वापरकर्ता मार्गदर्शक](../guides/USER_GUIDE.md) — प्रोव्हायडर्स, कॉम्बो, CLI इंटिग्रेशन
- [ऑटो-कॉम्बो इंजिन](../routing/AUTO-COMBO.md) — 16-फॅक्टर स्कोअरिंग, मोड पॅक्स
