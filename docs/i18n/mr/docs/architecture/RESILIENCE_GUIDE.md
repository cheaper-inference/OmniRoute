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

**व्याप्ती:** एकल प्रदाता connection/account/key.

**उद्देश:** त्याच प्रदात्यासाठी इतर कनेक्शन सेवा देत असताना एक खराब की वगळा.

**अंमलबजावणी:**

- अनुपलब्ध चिन्हांकित करा: `src/sse/services/auth.ts::markAccountUnavailable()`
- निवड: त्याच फाइलमध्ये `getProviderCredentials*`
- कूलडाउन कॅल्क: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्ज: `src/lib/resilience/settings.ts`

**प्रति कनेक्शन फील्ड:**

- कूलडाउन कालबाह्य होईपर्यंत `rateLimitedUntil` — टाइमस्टॅम्प
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — घातांकीय बॅकऑफ काउंटर

**डीफॉल्ट कूलडाउन्स:**

- OAuth बेस: 5s
- API-की बेस: 3s
- API-की 429: अपस्ट्रीम `Retry-After`/ headers/parseable रीसेट मजकूर रीसेट करण्यास प्राधान्य देते
- बॅकऑफ: `baseCooldownMs * 2 ** failureIndex`

**प्रति-प्रदाता पुन्हा प्रयत्न विलंब.** प्रदाता तपशील पृष्ठावर a आहे** विलंब पुन्हा प्रयत्न करा** निवडा (स्वयं, 15s पर्यंत 1h पर्यंत). हे `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, `PATCH /api/resilience` द्वारे) वाचवते. जेव्हा दर-मर्यादा त्रुटीमध्ये अपस्ट्रीम पुन्हा प्रयत्न करण्याचा इशारा नसतो, तेव्हा ते मूल्य प्रदात्यासाठी स्केल केलेले बॅकऑफ बदलते आणि `backoffLevel` 0 (`open-sse/services/rotationConfig.ts::overrideFor`) वर रीसेट करते. दर-मर्यादित त्रुटीसाठी प्राधान्य, प्रथम सर्वोच्च: अपस्ट्रीम पुन्हा प्रयत्न संकेत, नंतर प्रति-कनेक्शन `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, नंतर प्रति-प्रदाता पुन्हा प्रयत्न विलंब, नंतर env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, नंतर स्केल केलेला बॅकऑफ. ऑटो फील्ड काढून टाकते. हे केवळ दर-मर्यादेच्या कारणावर परिणाम करते, कधीही टर्मिनल स्थितींवर नाही.

**मेघगर्जनाविरोधी-कळप रक्षक:** अति-विस्तारित कूलडाउन किंवा दुहेरी-वाढीव `backoffLevel` पासून समवर्ती अपयशांना प्रतिबंधित करते.

**कॉन्करन्सी-लिमिट 429 बॅकऑफ शिडीवर चढत नाहीत.** एक `429` ज्याचे शरीर समवर्ती मर्यादा नोंदवते ("बर्याच समवर्ती विनंत्या", "समांतर मर्यादा", "समांतर विनंती मर्यादा", GLM `并发数过高`) म्हणजे खाते निरोगी परंतु व्यस्त आहे. `checkFallbackError()` रिटर्न कारण `concurrency_limited`: आता पुढील कनेक्शनवर अयशस्वी व्हा, हे निश्चित `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) किंवा अपस्ट्रीम पुन्हा प्रयत्न संकेतासाठी थंड करा, `backoffLevel` अपरिवर्तित ठेवा आणि `skipProviderBreaker` सेट करा. स्पष्ट कोटा बॉडी अजूनही जिंकते, त्यामुळे कोटा पॅटर्नशी देखील जुळणारी बॉडी कोटा निर्णयच राहते. शोध: `looksLikeConcurrencyLimit()` मध्ये `src/shared/utils/classify429.ts`; निर्णय: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (ब्रेकरचा `FailureKind`) अपरिवर्तित आहे आणि तरीही या शरीरांसाठी `rate_limit` वाचतो.

**प्रवाह सामग्रीचे स्टॉल खाते थंड करत नाहीत.** जेव्हा कंटेंट-स्टॉल वॉचडॉग (`open-sse/utils/streamHandler.ts`) स्ट्रीम सोडतो ज्याने वेळेत कोणतेही मॉडेल आउटपुट पाठवले नाही, तेव्हा `markAccountUnavailable()` कनेक्शनवर त्रुटी नोंदवते परंतु कूलडाउन सेट करत नाही: स्टॉल त्या विनंतीचा असतो, बहुतेकदा अद्याप कोणतेही आउटपुट नसताना दीर्घ तर्क वळण असते. ऑपरेटर `resilienceSettings.streamStallCooldown.enabled` (डिफॉल्ट `false`) सह पुन्हा निवड करू शकतात.

**`p2c` खाते निवडीसाठी ऑप्ट-इन लेटन्सी सिग्नल.** प्रत्येक डिस्पॅच केलेला प्रयत्न टाइम-टू-फर्स्ट-बाइट आणि परिणाम प्रति कनेक्शन (आणि प्रति कनेक्शन + मॉडेल) इन-मेमरी रोलिंग विंडोमध्ये रेकॉर्ड करतो: शेवटचे 20 नमुने 15 मिनिटांत (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` मध्ये `safeLogEvents()` वरून रेकॉर्ड केलेले). जेव्हा `resilienceSettings.p2cLatency.weight` `0` वर असते (श्रेणी 0-20, डीफॉल्ट `0` = ऑफ), `src/sse/services/auth.ts` मधील `compareP2CConnections()` जोडीच्या प्रत्येक उमेदवाराला `weight` पॉइंट्स पर्यंत जोडते. त्यातील अर्धा भाग वेगवान उमेदवाराच्या गुणोत्तराच्या रूपात लेटन्सीमधून येतो (धीमी पूर्ण अर्धा घेते त्यापेक्षा दुप्पट) आणि अर्धा रोलिंग एरर रेटमधून येतो. जेव्हा दोन्ही उमेदवारांचे किमान 3 नमुने असतील तेव्हाच ही संज्ञा लागू होते, त्यामुळे नवीन खात्यांवर दंड आकारला जात नाही आणि त्याची कमाल मर्यादा कोटा-अवरोधित आणि कोटा-थकवलेल्या दंडाच्या खाली राहते. हे स्वतःचे कोणतेही सर्किट जोडत नाही: अपयशी खाती अजूनही कूलडाउन, लॉकआउट आणि ब्रेकर लेयरद्वारे हाताळली जातात. ते `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` सह सेट करा.

**रिझनिंग फ्रेम्स सामग्री-स्टॉल बजेट रीस्टार्ट करतात.** तर्क मॉडेल त्याच्या पहिल्या दृश्यमान टोकनच्या काही मिनिटांपूर्वी विचार करू शकते: Claude `thinking_delta` फ्रेम्स ज्यांचा विचार मजकूर रिक्त असू शकतो, आणि प्रतिसाद API एकामागून एक तर्क आयटम प्रवाहित करतो. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) या फ्रेम्स ओळखतो आणि वॉचडॉग वळण रद्द करण्याऐवजी प्रत्येकावर त्याचे बजेट पुन्हा सुरू करतो. ते अद्याप मॉडेल आउटपुट नाहीत, म्हणून केवळ तर्काने समाप्त होणारे वळण अजूनही रिक्त म्हणून नोंदवले जाते आणि एक वळण जे तर्क थांबवते आणि फक्त हृदयाचे ठोके पाठवते ते अजूनही वॉचडॉगला ट्रिप करते.

रिकाम्या स्वाक्षरीसह Kiro च्या बायनरी `reasoningContentEvent` फ्रेम्स एक्झिक्युटरद्वारे रिकाम्या `reasoning_content` डेल्टा म्हणून ही तर्क क्रिया जतन करतात. स्वाक्षरी पुढे पाठवली जात नाही. मेटाडेटा, अपूर्ण फ्रेम्स आणि रिकाम्या स्वाक्षर्या सामग्री बजेट रीस्टार्ट करत नाहीत; स्वतंत्र सक्रिय-प्रवाह कालबाह्य आणि क्लायंट रद्द करणे अद्याप लागू होते (`open-sse/executors/kiro/reasoning.ts`).

**टर्मिनल अवस्था (NOT cooldowns):**

- `banned` — set by banned-keyword / account-ban detection (see [BAN_DETECTION](../security/BAN_DETECTION.md)), and by three consecutive upstream per-request refusals (`request_rejected`, e.g. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); a single refusal only cools the connection down
- `expired` (बाऊंड केलेल्या पुन्हा प्रयत्नांनंतर टर्मिनलवर संक्रमण — `EXPIRED_RETRY_MAX = 3` घातांकीय बॅकऑफ — सह त्यामुळे खाते कायमचे निष्क्रिय होण्यापूर्वी क्षणिक OAuth त्रुटी स्वतःच बरे होऊ शकतात)
- `credits_exhausted`

क्रेडेन्शियल बदलेपर्यंत किंवा ऑपरेटर त्यांना रीसेट करेपर्यंत हे टिकून राहतात. क्षणिक कूलडाउन स्थितीसह टर्मिनल स्थिती अधिलिखित करू नका.

**आळशी पुनर्प्राप्ती:** `rateLimitedUntil` गेल्यावर, कनेक्शन पुन्हा पात्र होते. यशस्वी वापरावर, `clearAccountError()` सर्व त्रुटी फील्ड साफ करते.

### Claude OAuth वापर भिंत: निम्न-प्राधान्य लेन + सत्र-मर्यादा रीसेट

**व्याप्ती:** एक Claude सबस्क्रिप्शन (OAuth) कनेक्शन. दोन्ही वैशिष्ट्ये आहेत** प्रति कनेक्शन निवड** ( `providerSpecificData` मध्ये कनेक्शन → Claude विभाग → `lowPriorityMode` / `autoLimitReset` संपादित करा, दोन्ही डीफॉल्ट बंद) आणि मिरर Claude कोडचे `/low-priority` आणि `/limit-reset` कमांड्स (वायर कॉन्ट्रॅक्ट Claude कोड 2.1.263 वरून कॅप्चर केलेले).

**अंमलबजावणी:**

- राज्य मशीन + प्रतिसाद वर्गीकरण: `open-sse/services/claudeLowPriority.ts`
- status/claim क्लायंट रीसेट करा: `open-sse/services/claudeLimitReset.ts`
- एक्झिक्युटर हुक (हेडर इंजेक्शन + समान-खाते पुन्हा प्रयत्न): `open-sse/executors/base.ts::execute()`
- निवड चिकाटी: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ट्रिगर:** 5-तास वापर वॉल — a `429` ज्याच्या शीर्षलेखांमध्ये `anthropic-ratelimit-unified-status: rejected` असते आणि खाते पात्र असताना, `anthropic-ratelimit-unified-slow-offer: treatment`. त्या पहिल्या भिंतीपूर्वी काहीही पाठवले जात नाही 429; युनिफाइड हेडरशिवाय बर्स्ट 429 सामान्य कूलडाउन मार्गावरून जातो.

**निम्न-प्राधान्य लेन** (`lowPriorityMode`):

- वॉल 429 वर एक्झिक्युटर ऑफर स्वीकारतो आणि लगेच पुन्हा प्रयत्न करतो** समान** `anthropic-usage-limit: slow` सह खाते; घोषित `anthropic-ratelimit-unified-reset` (+ 60s कृपा) होईपर्यंत लेन सक्रिय राहते आणि त्या विंडोमधील प्रत्येक विनंती शीर्षलेख घेऊन जाते. इंटरसेप्टेड 429 कधीही `handleChatCore` वर पोहोचत नाही, म्हणून कनेक्शन आहे** नाही** कूलडाउनमध्ये ठेवा आणि फिरवले जात नाही.
- नंतरच्या प्रतिसादांवर `anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` लेन ठेवा; `slot_busy` (429) किंवा `529` सर्व्हरच्या `anthropic-ratelimit-unified-slow-retry-after` प्रतीक्षा करा (डीफॉल्ट 20s, क्लॅम्प 5–600s, ± 30% जिटर) आणि पुन्हा प्रयत्न करा, `anthropic-ratelimit-unified-slow-max-wait` द्वारे बांधलेले (डिफॉल्ट 20 मि, क्लॅम्प 1 मिनिट–6 h) — नंतर कूल ऑफ 10 मिनिटे पूर्ण झाले. पुन्हा स्वीकृती. विनंतीच्या स्वतःच्या अपस्ट्रीम-स्टार्ट टाइमआउट (`resolveFetchStartTimeout`, 10 मिनिटे बाय डीफॉल्ट) वजा 5 s मार्जिन: त्या कॅपशिवाय 20-मिनिटांची डीफॉल्ट कमाल-प्रतीक्षा विनंतीपेक्षा जास्त काळ राहते आणि झोपेची मध्य-प्रतीक्षा रद्द केली जाईल, त्याऐवजी `TimeoutError` एन्डफुल `max_wait` + ऐवजी थांबेल.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, एक 5h-विंडो रोलओव्हर, किंवा `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (जे कोणत्याही स्थितीवर `extra_usage` म्हणून समाप्त करते, कारण पेड ओव्हरेज आता भिंत व्यापते) लेन समाप्त करा; प्रतिसाद नंतर सामान्य कूलडाउन मार्गाकडे वाहतो. घोषित बजेट रीसेट होईपर्यंत `budget_exhausted` लक्षात ठेवले जाते (≤ 8 दिवस).
- वॉल चेक एक्झिक्युटरच्या स्वतःच्या 400-चालित इंट्रा-प्रयत्नांच्या प्रयत्नांनंतर चालते (संदर्भ संपादन, thinking/effort क्लॅम्प्स, पॅराम ऑटो-लर्न), त्यामुळे एक वॉल 429 जी केवळ त्या प्रयत्नांपैकी एकावर दिसते ती अजूनही कूलडाउन मार्गावर पोहोचण्याऐवजी रोखली जाते.
- स्थिती प्रति कनेक्शन मेमरीमध्ये आहे (पुन्हा स्वीकारण्यासाठी रीस्टार्टसाठी एक अतिरिक्त भिंत 429 लागते).

**सत्र-मर्यादा रीसेट** (`autoLimitReset`, दोन्ही चालू असताना लेनच्या आधी प्रयत्न केला):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ब्लॉक; जेव्हा `arm: "reset"` आणि `available: true`, `{ "program": "juniper_tide" }` सह `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` वरून UUID, बूटस्ट्रॅप फॉलबॅक).
- `result: reset|not_limited` → विनंती पूर्ण गतीने पुन्हा प्रयत्न केली जाते (मंद शीर्षलेख नाही). `already_used` / `not_offered` memoise `next_available_at` (डिफॉल्ट एक आठवडा); कोणतीही अपयश 15 मिनिटांनी परत येते. रीसेट आठवड्यातून एकदा आहे आणि तरीही साप्ताहिक मर्यादेत मोजले जाते.

प्रतिगमन रक्षक: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### सत्र आत्मीयता (#7274)

**व्याप्ती:** एक क्लायंट सत्र (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` शीर्षलेख) एका कनेक्शनवर पिन केले, यासाठी** कोणतेही** प्रदाता

**उद्देश:** विनंत्यांदरम्यान एकाच खात्यावर मल्टी-टर्न एजंट (Claude कोड, सहाय्यक, कस्टम एजंट्स) ठेवा, क्रॉस-खाते संदर्भ हानी कमी करा आणि प्रति-खाते सत्र स्थिती असलेल्या प्रदात्यांवर कोल्ड-स्टार्ट 429 पुन्हा करा.

**अंमलबजावणी:**

- TTL ठराव: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर एक्सट्रॅक्शन (जेनेरिक, कोणताही प्रदाता): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- पर्सिस्टेड पिन टेबल: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिंग: `sessionAffinityTtlMs` (ms मध्ये जागतिक TTL, `0` अक्षम करते) — `src/lib/db/settings.ts`. माइग्रेशन `124_generic_session_affinity_ttl.sql` द्वारे Codex-only `codexSessionAffinityTtlMs` वरून पुनर्नामित केले, जे नवीन डीफॉल्ट म्हणून पूर्वी कॉन्फिगर केलेल्या Codex TTL वर नेले जाते.

#7274 पूर्वी, `resolveSessionAffinityTtlMs()` `codex` वगळता प्रत्येक प्रदात्यासाठी `0` ला हार्ड-बेल्ड केले होते, म्हणून TTL सेटिंग (आणि सत्र शीर्षलेख) वर कुठेही परिणाम झाला नाही जरी पिनिंग यंत्रणा आणि शीर्षलेख काढणे आधीच प्रदाता-अज्ञेयवादी होते. निराकरण ते लवकर-रिटर्न काढले; TTL आता `0` वर जागतिक स्तरावर सेट केल्यानंतर प्रत्येक प्रदात्याला एकसमान लागू होते.

तीन सत्र-ॲफिनिटी शीर्षलेख कधीही अग्रेषित केले जात नाहीत अपस्ट्रीम — एक्झिक्युटर्स क्लायंट हेडर पास करण्याऐवजी स्क्रॅचमधून त्यांचे स्वतःचे अपस्ट्रीम शीर्षलेख तयार करतात, त्यामुळे हे केवळ अंतर्गत सहसंबंध आयडी राहते.

### अनन्य व्यवस्थापित सत्र कनेक्शन लीज

**व्याप्ती:** एक सक्रिय व्यवस्थापित HTTP client/session कडे एक पात्र OmniRoute कनेक्शन आहे.

**उद्देश:** ज्या क्लायंटला विनंत्यांवर कठोर राउटिंग कुंपण आवश्यक आहे त्यांच्यासाठी टिकाऊ अनन्य कनेक्शन मालकी प्रदान करा. हे सेशन ॲफिनिटीपेक्षा वेगळे आहे, जे एक मऊ सातत्य प्राधान्य आहे: एक अनन्य लीज SQLite मध्ये जीवनचक्र स्थिती कायम ठेवते, जागतिक सक्रिय-मालक आणि सक्रिय-कनेक्शन विशिष्टता लागू करते आणि प्रदाता पाठवण्यापूर्वी एक जुनी पिढी नाकारते.

वैशिष्ट्य प्रति API की निवडणे आहे. व्यवस्थापित कीमध्ये `lease:exclusive` स्कोप आणि स्पष्ट नॉन-रिक्त `allowedConnections` सूची असणे आवश्यक आहे. कोणताही HTTP क्लायंट लाइफसायकल एंडपॉइंट वापरू शकतो; क्लायंटचे नाव, वापरकर्ता-एजंट, प्रदाता, OAuth पद्धत किंवा मॉडेल आवश्यक नाही. लीजच्या मालकीचे कनेक्शन आहे, मॉडेल नाही, त्यामुळे कनेक्शन सामान्यतः पात्र असताना मॉडेल बदल बंधनकारक ठेवते. सामान्य मॉडेल, कोटा, हेल्थ, कूलडाउन आणि अनुमती असलेले नियम अधिकृत राहतील आणि त्याच पिढीला दुसऱ्या विनामूल्य पात्र कनेक्शनवर संक्रमित करू शकतात.

जीवनचक्र `POST /api/v1/session-leases` आहे JSON क्रिया `acquire`, `renew`, आणि `release`. व्यवस्थापित अनुमान विनंत्या अपारदर्शक `X-OmniRoute-Lease-Owner` मूल्य आणि अचूक `X-OmniRoute-Lease-Generation` सादर करतात. मालक `vlo_` वापरतो त्यानंतर 43 base64url वर्ण; फक्त त्याची SHA-256 हॅश साठवली जाते. प्रत्येक अंतिम डिस्पॅच कुंपण प्रमाणीकृत API की ID आणि सक्रिय कनेक्शन ID देखील बांधते. लीज कंट्रोल हेडर लॉगमधून काढून टाकले जातात, रिक्वेस्ट स्नॅपशॉट्स आणि अपस्ट्रीम एक्झिक्यूटर हेडर.

सामान्य राउटिंगमध्ये पात्र व्यवस्थापित उमेदवार असल्यास परंतु प्रत्येक मुक्त उमेदवार परदेशी सक्रिय लीजने व्यापलेला असल्यास, OmniRoute HTTP `429`, लीज-क्षमता-अनुपलब्ध कोड, प्रतीक्षेसाठी-क्षमतेची स्थिती आणि लवकरात लवकर संबंधित कालबाह्यतेपासून व्युत्पन्न केलेली `Retry-After` परत करते. सामान्य रिक्त पात्रता ही लीज विवाद नाही आणि तिचे विद्यमान रूटिंग त्रुटी शब्दार्थ ठेवते.

संबंधित यंत्रणा स्वतंत्र राहतात:

- OAuth सत्र वहिवाट ही OAuth खात्यांसाठी प्रक्रिया-स्थानिक सॉफ्ट वितरण आहे.
- खाते सेमाफोर्स विनंती-समस्या परवानगी देतात आणि विनंती पूर्ण झाल्यावर समाप्त होतात.
- अनन्य व्यवस्थापित सत्र लीज हे पिढीच्या कुंपणासह टिकाऊ जीवनचक्र मालकी आहेत.

---

## 3. मॉडेल लॉकआउट

**स्कोप:** provider + connection + model त्रिकुट.

**स्टेटसनुसार कीचा स्कोप:** अपयशी स्टेटस ठरवतो की लॉकआउट कोणत्या कीवर लिहितो (`open-sse/services/accountFallback/exactModelLock.ts` मधील `resolveLockoutScope()`):

- `429` / `403` / `402` — कोटा किंवा हक्काचा (entitlement) संकेत — **कोटा कुटुंब** लॉक करा: codex साठी संपूर्ण `codex` / `spark` स्कोप (त्या कनेक्शनचे प्रत्येक `gpt-5*` मॉडेल), इतर प्रोव्हायडर्ससाठी `getQuotaScopedModelForProvider()`.
- `404` केवळ ते मॉडेल लॉक करते (`getModelLockKey()` `not_found` ला अरुंद करते).
- इतर कोणताही स्टेटस — `5xx` ट्रान्सपोर्ट/सर्व्हर अपयशे आणि क्वालिटी व्हॅलिडेशनमधून OmniRoute ने स्वतः तयार केलेला `502` — फक्त **अचूक** provider/connection/model टपल लॉक करतो. एका मॉडेलवरील खराब स्ट्रीम हा अकाउंटच्या कोटाबद्दलचा पुरावा नसतो; हा नियम येण्यापूर्वी `codex/gpt-5.6-luna` वरील एका रिकाम्या प्रतिसादाने त्या कनेक्शनचे प्रत्येक `gpt-5*` मॉडेल 2–30 मिनिटांसाठी (वाढत्या कालावधीने) रूटिंगमधून काढून टाकले, तरीही त्याचा कोटा अबाधित होता.
- कॉलरचा स्पष्ट `scope` पर्याय नेहमी जिंकतो (Antigravity `"exact"` पास करतो).

**उद्देश:** फक्त एकच मॉडेल अनुपलब्ध किंवा कोटा-मर्यादित असताना संपूर्ण कनेक्शन अक्षम करणे टाळणे.

**उदाहरणे:**

- 429 परत करणारे प्रति-मॉडेल कोटा प्रोव्हायडर्स
- एका गहाळ मॉडेलसाठी 404 परत करणारे स्थानिक प्रोव्हायडर्स
- प्रोव्हायडर-विशिष्ट मोड/मॉडेल परवानगी अपयशे (उदा., Grok मोड्स)

**अंमलबजावणी:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### मॉडेल कूलडाउन्स डॅशबोर्ड (v3.8.0)

UI: सेटिंग्ज → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

कार्यसक्रिय लॉकआउट्स यासह सूचीबद्ध करते: provider, connection, model, reason, expiresAt. ऑपरेटर्स कार्डमधून मॉडेल स्वतः पुन्हा सक्षम करू शकतात.

**REST API:**

- `GET /api/resilience/model-cooldowns` — कार्यसक्रिय लॉकआउट्सची यादी
- `DELETE /api/resilience/model-cooldowns` — स्वतः पुन्हा सक्षम करणे. बॉडी: `{provider, connection, model}`. ऑथ: management.

### कूलडाउन मॅनेजर

UI: मॉनिटरिंग → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

प्रत्येक प्रोव्हायडर पृष्ठ उघडण्याऐवजी, तात्पुरत्या कारणामुळे रूटिंगच्या बाहेर असलेल्या प्रत्येक कनेक्शनसाठी एकच पृष्ठ. ते कनेक्शन कूलडाउन्स, मॉडेल लॉकआउट्स आणि टर्मिनल स्थिती सूचीबद्ध करते, ते प्रति कनेक्शन, निवडीनुसार किंवा एखाद्या प्रोव्हायडरच्या सर्व कनेक्शनसाठी साफ करते, आणि सर्वात जास्त ट्यून केलेले कूलडाउन नियम संपादित करते: `streamStallCooldown.enabled` आणि OAuth / API-key `connectionCooldown` बेस कूलडाउन व कमाल बॅकऑफ पायऱ्या (`PATCH /api/resilience` द्वारे सेव्ह केल्या जातात). टर्मिनल स्थिती (`banned`, `expired`, `credits_exhausted`) सूचीबद्ध केल्या जातात पण येथे कधीही साफ केल्या जात नाहीत.

**REST API** (`src/lib/resilience/cooldownManager.ts`, ऑथ: management):

- `GET /api/resilience/cooldowns[?provider=]` — स्टेटस, उरलेला कूलडाउन, बॅकऑफ पातळी, शेवटचा एरर प्रकार आणि मॉडेल लॉकआउट्स असलेली कनेक्शन्स (क्रेडेन्शियल्स नाहीत)
- `POST /api/resilience/cooldowns` — बॉडी `{connectionIds: string[]}` किंवा `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` परत करते

### लॉकआउट सेटिंग्ज UI + सक्सेस-डिके रिकव्हरी (v3.8.23)

मॉडेल लॉकआउट नेहमी-चालू हार्डकोड केलेल्या वर्तनातून, स्वतःच्या सेटिंग्ज कार्ड आणि सेल्फ-हीलिंग रिकव्हरी मार्गासह पूर्णपणे कॉन्फिगर करण्यायोग्य, ऑप्ट-इन वैशिष्ट्यात रूपांतरित झाले.

**सेटिंग्ज कार्ड:** सेटिंग्ज → Model Lockout (`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`). हे वरील फक्त-वाचनीय `ModelCooldownsCard` पासून **वेगळे** आहे (जे फक्त कार्यसक्रिय लॉकआउट्स _सूचीबद्ध_ करते) — नवीन कार्ड _पॅरामीटर्स कॉन्फिगर करते_. डीफॉल्ट्स `DEFAULT_MODEL_LOCKOUT_SETTINGS` मध्ये आहेत (`src/lib/resilience/modelLockoutSettings.ts`):

| सेटिंग                  | डीफॉल्ट                          | अर्थ                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------- |
| `enabled`               | `false`                          | मास्टर टॉगल — मॉडेल लॉकआउट **डीफॉल्टनुसार बंद** आहे.    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | मॉडेल-स्कोप अपयश म्हणून गणले जाणारे अपस्ट्रीम स्टेटसेस. |
| `baseCooldownMs`        | `120_000` (120 सेकंद)            | पहिल्या अपयशासाठी प्रारंभिक लॉकआउट कालावधी.             |
| `maxCooldownMs`         | `1_800_000` (30 मिनिटे)          | वाढवलेल्या कूलडाउनची कमाल मर्यादा.                      |
| `maxBackoffSteps`       | `10`                             | कमाल एक्स्पोनेंशियल-बॅकऑफ एस्कलेशन पायऱ्या.             |
| `useExponentialBackoff` | `true`                           | वारंवार अपयशे कूलडाउन एक्स्पोनेंशियली वाढवतात की नाही.  |

सेटिंग्ज सामान्य सेटिंग्ज स्टोअरद्वारे टिकतात आणि रेझिलियन्स सेटिंग्ज स्कीमाद्वारे व्हॅलिडेट होतात; कार्ड `baseCooldownMs`/`maxCooldownMs` (`maxCooldownMs ≥ baseCooldownMs` सह) आणि `maxBackoffSteps` क्लॅम्प करते.

**सक्सेस-डिके रिकव्हरी:** रिकव्हरी ही **केवळ** टायमर समाप्ती नसते. निरोगी प्रतिसाद मॉडेलची अपयश-संख्या परत खाली आणतो, जेणेकरून मध्याच कालखंडात सावरलेले मॉडेल त्याचा टायमर संपण्यापूर्वीच एस्कलेट होणे थांबवते (आणि साफ होते). यशस्वी कॉम्बो टार्गेटवर, `open-sse/services/combo.ts` `decayModelFailureCount()` ला कॉल करते (`open-sse/services/accountFallback.ts`), जे साठवलेली `failureCount` **निम्मी** करते (`Math.floor(failureCount / 2)`); ती `0` वर पोहोचल्यावर लॉकआउट एंट्री पूर्णपणे डिलीट केली जाते. त्याची जोडीदार `recordModelLockoutFailure()` एस्कलेशन कालखंडातील अपयशांवर संख्या वाढवते (आणि कूलडाउन एस्कलेट करते). हे सक्सेस-डिके साध्या टायमर समाप्तीच्या व्यतिरिक्त आहे — दोन्हीपैकी कोणताही मार्ग मॉडेल पुन्हा सक्षम करू शकतो.

**स्थिती:** लॉकआउट्स **इन-मेमरी** ठेवले जातात (`provider:connectionId:model` की असलेल्या `ModelLockoutEntry` च्या प्रति-प्रोसेस `Map`s मध्ये, अचूक-स्कोप लॉक्स `provider:connectionId:exact:model` कीने), DB मध्ये टिकवले जात नाहीत — ते रीस्टार्टवर हरवतात. _सेटिंग्ज_ टिकवल्या जातात; कार्यसक्रिय लॉकआउट _स्थिती_ क्षणभंगुर असते.

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

## 7. अपस्ट्रीम स्थिती पुनःविधान (चुकीच्या स्थितीच्या कोटा एरर)

**व्याप्ती:** एक अपस्ट्रीम गेटवे जो तात्पुरती कोटा समाप्ती चुकीच्या HTTP स्थितीने नोंदवतो.

**उद्देश:** वर्गीकरणाआधीच (BEFORE) दिशाभूल करणारी स्थिती दुरुस्त करणे, जेणेकरून डाउनस्ट्रीम ग्राहकांना (fallback engine, combo aggregation, क्लायंट-समोरील प्रतिसाद) अपयशाचे खरे retryable स्वरूप दिसेल.

काही गेटवे तात्पुरती (TEMPORARY) कोटा समाप्ती non-retryable HTTP स्थितीने सूचित करतात. `agentrouter.org` मानक `429` ऐवजी चिनी बॉडीसह (`用户额度不足` / `额度不足`) `403` (कधीकधी `400`) परत करतो. Claude Code सारखे क्लायंट `403` ला कायमस्वरूपी समजतात आणि सत्र थांबवतात, आणि दुरुस्ती केली नाही तर fallback engine ती कोटा इव्हेंटऐवजी `AUTH_ERROR` म्हणून वर्गीकृत करेल.

**अंमलबजावणी:**

- रजिस्ट्री + मॅचर: `open-sse/config/upstreamStatusRestatement.ts` — प्रत्येक प्रोव्हायडरसाठी नियमांची यादी (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` द्वारे जुळवली जाते.
- कॉल साइट: `open-sse/handlers/chatCore.ts` मधील `providerFailure:` ब्लॉक
  (अंदाजे ओळ 3654), `parseUpstreamError()` एरर HTTP स्थितीसह (`!providerResponse.ok`) असलेला अपस्ट्रीम प्रतिसाद पार्स केल्यानंतर लगेच, आणि कोणतेही वर्गीकरण चालण्यापूर्वी, जेणेकरून प्रत्येक डाउनस्ट्रीम ग्राहक दुरुस्त केलेली स्थिती पाहतो. `200` SSE स्ट्रीममध्ये एम्बेड केलेल्या एरर वेगळ्या, नंतरच्या स्ट्रीम-पार्सिंग मार्गाने जातात आणि आज या हुकद्वारे त्या कव्हर होत **नाहीत** — ही एक ज्ञात मर्यादा आहे, जी agentrouter च्या misstatus साठी अजून आवश्यक नाही (ती एरर HTTP स्थिती म्हणूनच समोर येते).
- Retry पात्रता: `429` हा `RETRY_AFTER_ELIGIBLE_STATUSES` मध्ये आहे
  (`open-sse/services/combo/unavailableRetryGate.ts`), त्यामुळे पुनःविधान केलेली एरर मृत `403` म्हणून दिसण्याऐवजी खरी retry विंडो सोबत घेऊन जाते.
- कृत्रिम `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  हे फक्त पुनःविधान केलेला प्रतिसाद **क्लायंट**ला काय सांगतो तेवढेच आहे; ते स्वतः कनेक्शनचा अंतर्गत cooldown/lockout कालावधी नाही — तो पुनःविधान केलेली एरर प्रत्यक्षात हाताळणाऱ्या यंत्रणेद्वारे वेगळ्या पद्धतीने नियंत्रित केला जातो (Connection Cooldown चा escalating backoff, §2, API-key प्रोव्हायडर्ससाठी base `3s`; किंवा Model Lockout, §3, agentrouter सारख्या per-model-quota प्रोव्हायडर्ससाठी). राउटर क्लायंटला जाहीर केलेल्या 60s विंडोपेक्षा आत लवकर retry साठी पात्र होऊ शकतो — हे जाणीवपूर्वक ठेवलेले headroom आहे, बग नाही.

कायमस्वरूपी एरर (agentrouter चा `无权访问模型` — या मॉडेलमध्ये प्रवेश नाही) कधीही (NEVER) पुनःविधान केले जात नाहीत: `textMarkers` जुळले तरीही `excludeMarkers` नियमाला व्हीटो करतात, त्यामुळे एरर त्याची मूळ स्थितीच ठेवते आणि काहीही तिला कायमचे retry करत नाही. जुळणारा प्रोव्हायडर वर्गीकरण नियम
(`open-sse/config/providerErrorRules.ts` मधील `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, `6h` घोषित base cooldown) `checkFallbackError` (`open-sse/services/accountFallback.ts`) द्वारे सामान्य apikey-श्रेणीच्या `FORBIDDEN` early-return _पूर्वी_ तपासला जातो, `honorsRuleLockScope(provider)` वर गेट केलेला (#10334 — सध्या `providerErrorRules.ts` मधील `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मुळे केवळ agentrouter-साठी). नियमाचा घोषित 6h cooldown `fallbackResult.baseCooldownMs` म्हणून पुढे वाहतो, परंतु तो अजूनही आधीपासूनच्या per-model-quota lockout मार्गालाच पुरवला जातो (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, cooldown स्रोत वगळता #10334 ने बदललेले नाही): तो इतर प्रत्येक model lockout प्रमाणेच ऑपरेटरच्या `mlSettings.maxCooldownMs` (डीफॉल्ट `1_800_000ms` / 30min) पर्यंत खाली clamp केला जातो, आणि _persist केलेले lockout कारण_ आधीपासूनचे hardcoded `"forbidden"` राहते, नियमाचे `"auth_error"` नाही — end-to-end फक्त cooldown कालावधीच स्वीकारला जातो, कारण स्ट्रिंग नाही. कनेक्शन स्वतः सक्रिय राहते; त्याच कनेक्शनवरील sibling मॉडेल्सवर परिणाम होत नाही.

पुनःविधान केलेल्या कोटा एरर (`额度不足`) प्रोडक्शनमध्ये एका प्रोव्हायडर नियमापर्यंत पोहोचतात
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, स्वतःचा कोणताही घोषित cooldown नाही — persistence layer चा scaled backoff डीफॉल्ट लागू होतो). #10334 पासून, `ProviderErrorRuleMatch` वरील `scope` end-to-end वापरला (consumed) जातो, परंतु **फक्त** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मधील प्रोव्हायडर्ससाठी (`providerErrorRules.ts` — आज केवळ `"agentrouter"`, `honorsRuleLockScope()` द्वारे गेट केलेले). इतर प्रत्येक प्रोव्हायडरसाठी `scope` #10334 पूर्वीप्रमाणेच केवळ माहितीपुरता राहतो.
`checkFallbackError` जुळलेल्या नियमाचा scope `fallbackResult.ruleScope` म्हणून समोर आणतो; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) हा सामायिक गार्ड आहे जो `ruleScope` connection-wide, self-recovering सिग्नल म्हणून स्वीकारणे खरोखरच सुरक्षित आहे याची पुष्टी करतो (scope `"connection"`, reason `quota_exhausted`, कधीही `permanent` नाही, कधीही `creditsExhausted` नाही — भविष्यात एखाद्या नियमाने scope `"connection"` ला कायमस्वरूपी खाते स्थितीशी जोडू नये यासाठीचा बचाव). दोन ग्राहक त्याला कॉल करतात:

- **पर्सिस्टन्स** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  पासथ्रू-प्रोव्हायडर **प्रति-मॉडेल** लॉकआउट
  ब्रांचमध्ये जाण्याऐवजी (agentrouter हा `passthroughModels: true` आहे →
  `hasPerModelQuota()` `true` परत करते), तो **तात्पुरता कनेक्शन कूलडाउन**
  लागू करतो — `testStatus: "unavailable"` + `rateLimitedUntil`, कधीही अंतिम
  स्थिती नाही (`credits_exhausted`/`banned`/`expired`) — म्हणून कूलडाउन
  संपल्यानंतर कनेक्शन स्वतः पुनर्प्राप्त होते, मॅन्युअल क्रेडेन्शियल
  रीसेटची आवश्यकता राहात नाही. `disableCooling: true` असलेल्या कनेक्शनसाठी
  हे वगळले जाते (#2997): तो ऑप्ट-आउट त्याऐवजी प्रति-मॉडेल लॉकआउटकडे पुढे
  जातो (दस्तऐवजीकृत तडजोड — ब्रांचच्या वरील कोड कमेंट पाहा).
- **त्याच-विनंतीचे कॉम्बो राउटिंग** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): तोच गार्ड कनेक्शनला
  इन-मेमरी `exhaustedConnections` सेटमध्ये चिन्हांकित करतो, ज्याची की
  `${provider}:${connectionId}` अशी असते. हे फक्त उरलेल्या त्याच-विनंतीच्या
  टारगेटला वगळते जे _स्वतःच्या टारगेट ऑब्जेक्टवर आधीच तेच `connectionId`
  वाहत असते_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  लुकअपपूर्वी `if (provider &&
connectionId)`) — साधे मॉडेल-लिस्ट कॉम्बो, जिथे
  सिब्लिंग टारगेट्सकडे स्वतःचे पिन केलेले `connectionId` नसते आणि एक फक्त
  रिस्पॉन्सच्या `X-OmniRoute-Selected-Connection-Id` हेडरवरून प्रति-डिस्पॅच
  रिझॉल्व्ह होते, ते त्या की मॅचला कधीही भेटत नाही. त्या सामान्य प्रकरणासाठी,
  उरलेला लेग नुकताच-एक्झॉस्ट झालेले अकाउंट पुन्हा वापरण्यापासून खरे संरक्षण
  हा सेट नाही — ते वरील पर्सिस्टन्स लेयर आहे (कनेक्शनचे `rateLimitedUntil`
  आता भविष्यात आहे) आणि त्याच गार्डने त्या अपयशासाठी
  `transientRateLimitedProviders` दाबल्यामुळे ("दोन-टप्प्यांची डिझाइन" आणि
  `targetExhaustion.ts` मधील `isAgentrouterConnectionQuotaScope` ब्रांचवरील
  कोड कमेंट पाहा): तो सेट अनमार्क ठेवल्यामुळे, `combo.ts` चे
  `allowRateLimitedConnection` फोर्स-अलाऊ (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`) प्रोव्हायडरच्या उरलेल्या लेग्ससाठी कार्यान्वित होत नाही,
  म्हणून क्रेडेन्शियल सिलेक्शनचा `rateLimitedUntil` फिल्टर
  (`src/sse/services/auth.ts:1238`) सामान्यपणे मानला जातो आणि उरलेला लेग एकतर
  वेगळे, अजूनही पात्र agentrouter कनेक्शन निवडतो किंवा कोणतीही क्रेडेन्शियल
  उपलब्ध नसल्याने अयशस्वी होतो — ते या ब्रांचने नुकत्याच थंड केलेल्या
  कनेक्शनवर जबरदस्तीने परत येत नाही.

### दोन-टप्प्यांची डिझाइन: स्थिती पुनर्कथन, नंतर वर्गीकरण

स्थिती पुनर्कथन (`upstreamStatusRestatement.ts`) आणि प्रोव्हायडर
वर्गीकरण नियम (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) हे स्वतंत्र रजिस्ट्री आहेत जे दोन्ही प्रोव्हायडर id
आणि टेक्स्ट मार्करवर आधारित असतात, परंतु ते वेगवेगळ्या ठिकाणी चालतात आणि
वेगवेगळ्या उद्देशांसाठी असतात: पुनर्कथन `chatCore.ts` मध्ये लवकर HTTP स्थिती
पुन्हा लिहिते; वर्गीकरण नियम `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) मध्ये फॉलबॅक `reason` निवडतात आणि
`scope` लॉक करतात (`model` / `provider` / `connection`).

वर्गीकरण नियमांना फक्त पूर्ण एरर **टेक्स्ट** दिसते (`额度不足` सारख्या बॉडी
मार्करशी जुळण्यासाठी आवश्यक) जे प्रोव्हायडर `providerErrorRules.ts` मधील
`FULL_TEXT_RULE_PROVIDERS` अलाऊलिस्टमध्ये सूचीबद्ध आहेत — सध्या फक्त
`"agentrouter"`. इतर प्रत्येक **बिल्ट-इन कॅटलॉग** प्रोव्हायडरसाठी,
`checkFallbackError` `getProviderErrorRuleMatch` ला फक्त स्ट्रक्चर्ड एरर
(`{code, type}`) देते, जे हेडर/स्टेटस/कोड-आधारित नियमांसाठी पुरेसे आहे परंतु
बॉडी-टेक्स्ट मार्करांसाठी अंध आहे. हेल्पर `resolveRuleMatchBody()` ही निवड
करते: अलाऊलिस्ट केलेल्या प्रोव्हायडरसाठी पूर्ण एरर टेक्स्ट, अन्यथा स्ट्रक्चर्ड
एरर. `FULL_TEXT_RULE_PROVIDERS` मध्ये **बिल्ट-इन** प्रोव्हायडर जोडणे हे
स्पष्ट प्रति-प्रोव्हायडर ऑप्ट-इन आहे — ते अस्तित्वात आहे जेणेकरून सूचीमध्ये
नसलेल्या प्रत्येक प्रोव्हायडरसाठी डीफॉल्ट मार्ग बाइट-फॉर-बाइट अबदलित राहील.

नियमाचा `scope` (`model` / `provider` / `connection`) हा
`FULL_TEXT_RULE_PROVIDERS` पासून वेगळा ऑप्ट-इन आहे: `checkFallbackError` तो
फक्त `fallbackResult.ruleScope` म्हणून उघडतो, आणि डाउनस्ट्रीम ग्राहक त्याचा
सन्मान फक्त त्याच फाइलमधील `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
अलाऊलिस्टमधील प्रोव्हायडरसाठीच माहितीपूर्ण लेबलव्यतिरिक्त इतर काही म्हणून
करतात (`honorsRuleLockScope()` द्वारे गेट केलेले — आज फक्त `"agentrouter"`).
प्रोव्हायडर त्या अलाऊलिस्टवर आल्यानंतर `scope: "connection"` मॅच खरोखर काय
करते यासाठी वरील "पुनर्कथित कोटा एरर" पाहा.

**#11104 — ऑपरेटर-घोषित नियम दोन्ही अलाऊलिस्ट बायपास करतात.** ऑपरेटर
`settings.providerErrorRules` द्वारे
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) ही
फाइल संपादित न करता रनटाइमवर प्रति-प्रोव्हायडर नियम घोषित करू शकतो. ऑपरेटर
नियमाला `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` —
बिल्ट-इन कॅटलॉग नियमांच्या **डीफॉल्ट** वर्तनाचे संरक्षण करण्यासाठी असलेल्या
अलाऊलिस्ट — मागे गेट करणे, तेथे आधीच सूचीबद्ध असलेल्या प्रोव्हायडरव्यतिरिक्त
प्रत्येक प्रोव्हायडरसाठी सेटिंग्ज यंत्रणा निष्क्रिय करेल, कारण नियम घोषित करणे
हे आधीच ऑपरेटरचे स्पष्ट ऑप्ट-इन आहे. `resolveRuleMatchBody()` आणि
`honorsRuleLockScope()` दोन्ही प्रथम `hasOperatorRuleForProvider()` तपासतात:
ऑपरेटर नियम असलेल्या प्रोव्हायडरला कच्चा एरर टेक्स्ट मिळतो आणि त्याचा घोषित
`scope` मानला जातो, तो दोन्हीपैकी कोणत्याही अलाऊलिस्टमध्ये आहे की नाही याची
पर्वा न करता.

**ज्ञात तफावत — HTTP 400 साठी `providerRuleRegistry` चा कधीही सल्ला घेतला
जात नाही.** `checkFallbackError` ची `BAD_REQUEST` ब्रांच स्थिती 400 चे
वर्गीकरण पूर्णपणे स्वतःच्या पॅटर्न अॅरेद्वारे करते
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` इ.
`accountFallback.ts` मध्ये) आणि तिच्यावरील
`configuredRule`/`getProviderErrorRuleMatch` ब्रांचमध्ये पोहोचण्यापूर्वी परत
येते. `status: 400` असलेला बिल्ट-इन कॅटलॉग नियम (किंवा ऑपरेटर नियम)
वाक्यरचनेने वैध आहे परंतु तो कधीही कार्यान्वित होणार नाही. आज कोणताही विद्यमान
नियम 400 ला लक्ष्य करत नाही, म्हणून प्रोडक्शनमध्ये काहीही प्रभावित होत नाही —
परंतु भविष्यातील 400 नियमाला प्रथम ही ब्रांच स्पर्श करणे आवश्यक आहे, जे नियम
जोडण्यापेक्षा मोठा बदल आहे (ते पॅटर्न-अॅरे वर्तनावर आधीच अवलंबून असलेल्या
प्रत्येक प्रोव्हायडरसाठी 400 चे पुनर्वर्गीकरण करते) आणि ते एकल-प्रोव्हायडर
नियम जोडणीच्या व्याप्तीच्या बाहेर आहे.

### नवीन कोटा-चूक दर्शवणारा (quota-misstating) गेटवे जोडणे

1. `statusRestatementRegistry` मध्ये एक नियम अॅरे नोंदवा
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   प्रदाता-विशिष्ट ठेवा; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) शी टक्कर खाणारे सामान्य इंग्रजी वाक्यांश कधीही पुन्हा वापरू नका.
2. योग्य लॉक स्कोप निवडण्यासाठी ऐच्छिकपणे
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) मध्ये वर्गीकरण नियम नोंदवा
   (खाते-व्यापी कोटासाठी `connection`, प्रति-मॉडेल त्रुटींसाठी `model`). ही पायरी प्रॉडक्शनमध्ये
   केवळ त्याच प्रदात्यांसाठी प्रभावी होते ज्यांच्या नियमांना संपूर्ण एरर मजकूर (बॉडी मार्कर्स)
   आवश्यक असतो: त्याच फाइलमधील `FULL_TEXT_RULE_PROVIDERS` मध्ये प्रदाता आयडी जोडा — अन्यथा
   `checkFallbackError` नियमाला नेहमी फक्त स्ट्रक्चर्ड `{code, type}` एरर देतो आणि
   बॉडी-मजकूर नियम लाइव्ह ट्रॅफिकशी कधीही जुळणार नाही. केवळ `status`/`headers` वर जुळणारे नियम
   (Opencode चे किंवा Minimax चे) यासाठी opt-in आवश्यक नसते. स्वतंत्रपणे, जर नियम
   `scope: "connection"` घोषित करतो आणि हेतू प्रत्यक्ष कनेक्शन-व्यापी कूलडाउन
   आणि त्याच विनंतीतील combo skip (फक्त माहितीपर लेबल नव्हे) असेल, तर त्याच फाइलमधील
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मध्ये प्रदाता आयडी जोडा — हेच
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) आणि
   `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`) मधील
   `isAgentrouterConnectionQuotaScope()`-शैलीच्या वापराला नियंत्रित करते; त्याशिवाय,
   `scope` अजूनही `fallbackResult.ruleScope` मधून वाहतो पण त्यावर काहीही कृती होत नाही.
3. `tests/unit/upstream-status-restatement.test.ts` आणि
   `tests/unit/agentrouter-error-rules.test.ts` यांच्या आधारे युनिट टेस्ट जोडा
   (not-permanent / not-creditsExhausted गार्ड्ससह, आणि — प्रदात्याला allowlist
   आवश्यक असल्यास — `resolveRuleMatchBody()` फक्त त्या प्रदात्यासाठीच संपूर्ण मजकूर
   परत करते याची खात्री करणारी टेस्ट).

`chatCore.ts`, `classifyError` किंवा combo मध्ये कोणतेही बदल आवश्यक नाहीत.

#### Egress-bucketed लॉक (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` मधील प्रदात्यांना (opencode कुटुंब) IP-bucketed
अपस्ट्रीम म्हणून वागवले जाते (opencode फ्री टियर IP-bucketed आहे,
account-bucketed नाही — #9611 पहा): status-429 वर्गीकृत `quota_exhausted`
**किंवा** `rate_limit_exceeded`, रोटेशन त्यांना वापरण्याचा प्रयत्न करण्यापूर्वी,
अयशस्वी कनेक्शनच्या शेवटच्या ज्ञात egress IP शी जुळणाऱ्या प्रत्येक allowlisted-कुटुंब
कनेक्शनला कूलडाउन करते — N-1 हमखास अयशस्वी अपस्ट्रीम कॉल टाळून
(#10460/#10525 प्रमाणेच आकार). `rate_limit_exceeded` जाणीवपूर्वक समाविष्ट केले आहे:
`markAccountUnavailable` मार्गावर opencode-विशिष्ट नियम कधीही जुळत नाहीत
(`checkFallbackError` ला headers/body दिले जात नाहीत, opencode
`FULL_TEXT_RULE_PROVIDERS` मध्ये नाही), त्यामुळे ज्या 429 च्या बॉडीमध्ये
सबस्क्रिप्शन-कोटा मजकूर ("monthly usage limit reached") असतो तो कोटा-मजकूर
फॉलबॅकद्वारे (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 तास कूलडाउन)
`quota_exhausted` म्हणून वर्गीकृत होतो — `status_429` नियमापर्यंत पोहोचण्यापूर्वीच —
तर कोटा-मजकूर-विरहित 429 (साधे रेट लिमिटिंग) `status_429` नियमाद्वारे
`rate_limit_exceeded` म्हणून वर्गीकृत होते आणि तरीही IP कुटुंबाला कूलडाउन करते.
allowlisted प्रदात्यासाठी IP-bucketed रेट लिमिट हा संपलेल्या कोटाइतकाच संकेत असतो.
प्रामाणिक मर्यादा:

- **बेस्ट-एफर्ट**: लॉक कनेक्शनचा शेवटचा ज्ञात `egress_ip` `proxy_logs` मधून रिझॉल्व्ह करते (24h विंडो, सिंक्रोनस, कॅशे नाही). कोल्ड कॅशे (egress IP कधीही प्रोब केलेला नाही) किंवा रो नसेल → अयशस्वी कनेक्शन तरीही ब्रांचद्वारे कूल केले जाते (आजप्रमाणेच रेकॉर्ड केले जाते), फक्त कोणताही सिबलिंग लॉक होत नाही.
- **कधीही टर्मिनल नाही**: कूलडाउन हे नूतनीकरण होणारे कोटा विंडो आहे (`testStatus: "unavailable"`); IP-स्तरीय सिग्नलमधून कायमस्वरूपी स्थिती कधीही तयार केली जात नाही. `disableCooling` कनेक्शन्स ब्रांच पूर्णपणे वगळतात.
- **अलाउलिस्ट केलेल्या फॅमिलीसाठी लॉक ग्रॅन्युलॅरिटी बदलते**: हा स्कोप बदल आहे, केवळ सिबलिंग ऑप्टिमायझेशन नाही. opencode हा `passthroughModels` प्रोव्हायडर आहे, म्हणून या ब्रांचपूर्वी 429 ने प्रति-MODEL लॉकआउट तयार केले; आता ते कनेक्शन कूलडाउन तयार करते — यामध्ये एकच कनेक्शन चालवणारा आणि कोणताही सिबलिंग नसलेला ऑपरेटर देखील समाविष्ट आहे. opencode रूल टेबल ती ग्रॅन्युलॅरिटी आधीच योग्य असल्याचे घोषित करते (`scope: "connection"`, `providerErrorRules.ts`), पण opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मध्ये नसल्यामुळे आजपर्यंत ते कधीही मान्य केले गेले नाही. ब्रांच अयशस्वी कनेक्शनचे कूलडाउन + `backoffLevel` स्वतः लिहिते, कनेक्शन-स्कोप्ड agentrouter ब्रांचचे अनुकरण करते, आणि रिटर्न करते — प्रति-मॉडेल ब्लॉक आणि खालील जेनेरिक पाथ कधीही गाठला जात नाही.
- **कॉम्बो समाविष्ट**: agentrouter ब्रांचप्रमाणे, स्कोप जाणीवपूर्वक `persistUnavailableState`/`isCombo` डाउनग्रेड दुर्लक्षित करतो जो कॉम्बो कॉलर 429 ला लागू करतो. प्रति-मॉडेल लॉकआउट हे या स्कोपचे कमकुवत रूप नाही, ते चुकीचे युनिट आहे: ते एग्झॉस्टेड IP बद्दल काहीही सांगत नाही, म्हणून कॉम्बो रोटेशन प्रत्येक सिबलिंगसाठी एक हमखास-अयशस्वी कॉल बर्न करत राहील.
- **सिबलिंग सेफ्टी**: आधीच टर्मिनल (banned/credits_exhausted) असलेला किंवा आधीच लांब कूलडाउनमध्ये असलेला सिबलिंग कधीही ओव्हरराइट केला जात नाही.
- **एक्सक्लूझिव्ह अलाउलिस्ट**: `EGRESS_BUCKETED_LOCK_PROVIDERS` रुंद करणे हा स्पष्ट मालकाचा निर्णय आहे; जेनेरिक वायरिंग नाही (पॅटर्न #10334/#10419). सिबलिंग क्वेरी SQL लिटरल म्हणून ती पुन्हा लिहिण्याऐवजी त्याच अलाउलिस्टला बाइंड करते, म्हणून ती रुंद करणे हा एका-ओळीचा बदल राहतो.
- **Egress IP रोटेशन, दोन्ही दिशांनी**: लूकअप विंडो (24h) egress-IP कॅशे TTL (5 min) पेक्षा खूप रुंद आहे, म्हणून "शेवटचा ज्ञात IP" हा इतिहास आहे, वर्तमान स्थिती नाही. जर कनेक्शनचा प्रॉक्सी विंडोमध्ये रोटेट झाला असेल तर लॉक खरोखर शेअर केलेला IP **मिस** करू शकते (रेकॉर्ड केलेला IP हा नवीन, अनएग्झॉस्टेड आहे) — आणि सममितीने ते **अशा सिबलिंगला कूल करू शकते जो एग्झॉस्टेड IP पासून आता रोटेट होऊन दूर गेला आहे**. दुसऱ्या केसमध्ये त्या सिबलिंगला एक कूलडाउन विंडोची किंमत मोजावी लागते; दोन्ही हे इतिहास-आधारित लूकअपच्या स्वीकृत बेस्ट-एफर्ट मर्यादा आहेत.
- **खर्च**: `proxy_logs` चे दोन बाउंडेड स्कॅन (`idx_pl_timestamp` द्वारे विंडो-फिल्टर्ड), फक्त 429 फ्रिक्वेन्सीवर. नवीन इंडेक्स नाही (मायग्रेशन 134 YAGNI). मध्यम आकाराच्या रिअल-ट्रॅफिक DB कॉपीवर मोजले गेले; हाय-थ्रूपुट इन्स्टन्स त्याच विंडोमध्ये प्रमाणानुसार अधिक रो धरते.

---

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
