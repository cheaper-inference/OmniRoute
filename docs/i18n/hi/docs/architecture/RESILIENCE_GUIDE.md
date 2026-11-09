# Resilience Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute में तीन विशिष्ट लेकिन संबंधित लचीलापन तंत्र हैं। प्रत्येक का एक अलग दायरा और उद्देश्य है। रूटिंग व्यवहार को डीबग करते समय उन्हें अलग रखें।

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **लचीलेपन टॉगल के लिए Env-बनाम-डैशबोर्ड प्राथमिकता।** ऑप्ट-इन लचीलापन पर्यावरण — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — से वरीयता प्राप्त टॉगल केवल _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) की आपूर्ति करता है। एक बूलियन `resilienceSettings` (डैशबोर्ड → में कायम रहा** सेटिंग्स → लचीलापन** / `PATCH /api/resilience`, `key_value` में संग्रहीत) env मान पर जीत हासिल करता है: सामान्यीकरण (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) जब भी मौजूद होता है तो संग्रहीत बूलियन रखता है। परिनियोजन पर ऐसे env var को `true` पर सेट करना जहां डैशबोर्ड पहले से ही `false` सहेजता है इसलिए कुछ भी नहीं बदलता है — टॉगल को फ्लिप करता है** सेटिंग्स → लचीलापन** (या संग्रहीत फ़ील्ड साफ़ करें) इसके बजाय।

## 1. प्रोवाइडर सर्किट ब्रेकर

**दायरा:** पूरा प्रोवाइडर (जैसे, `glm`, `openai`, `anthropic`)।

**उद्देश्य:** ऐसे प्रोवाइडर को ट्रैफ़िक भेजना रोकना जो अपस्ट्रीम/सेवा स्तर पर बार-बार विफल हो रहा है।

**कार्यान्वयन:**

- कोर क्लास: `src/shared/utils/circuitBreaker.ts`
- वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- स्टेटस API: `GET /api/monitoring/health`
- रीसेट API: `POST /api/resilience/reset`
- रैपर: `open-sse/services/accountFallback.ts`
- DB टेबल: `domain_circuit_breakers`

**स्थितियाँ:**

- `CLOSED` — सामान्य ट्रैफ़िक की अनुमति है
- `DEGRADED` — ट्रैफ़िक अभी भी अनुमत है, लेकिन प्रोवाइडर की बढ़ी हुई विफलताएँ ट्रैक की जा रही हैं; पर्याप्त सफलताओं पर, किसी मान्य कनेक्शन टेस्ट पर, या बिना किसी नई विफलता के अंतिम विफलता प्रकार के लिए सबसे लंबे `OPEN` होल्ड के बाद (उसका `cooldownByKind` मान, अन्यथा `resetTimeout`, × `maxBackoffMultiplier`, कम से कम एक कूलडाउन) यह `CLOSED` में लौटता है
- `OPEN` — प्रोवाइडर अस्थायी रूप से अवरुद्ध है; कॉम्बो रूटिंग इसे छोड़ देती है
- `HALF_OPEN` — रीसेट टाइमआउट बीत गया; प्रोब अनुरोध की अनुमति है

**कॉन्फ़िगर करने योग्य डिफ़ॉल्ट (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience में एक्सपोज़ किए गए):**

| क्लास   | डिग्रेडेड कब | खुलता है कब | रीसेट टाइमआउट |
| ------- | ------------ | ----------- | ------------- |
| OAuth   | 5 विफलताएँ   | 8 विफलताएँ  | 60s           |
| API-key | 7 विफलताएँ   | 12 विफलताएँ | 30s           |
| लोकल    | व्युत्पन्न   | 2 विफलताएँ  | 15s           |

`degradationThreshold` नियंत्रित करता है कि कोई प्रोवाइडर कब `DEGRADED` में प्रवेश करता है; `failureThreshold` नियंत्रित करता है कि यह कब खुलता है और छोड़ दिया जाता है। लोकल प्रोवाइडर प्रोफ़ाइल अभी तक Resilience सेटिंग्स पेज पर एक्सपोज़ नहीं किए गए हैं।

**ट्रिप कोड:** केवल प्रोवाइडर-स्तरीय स्टेटस `[408, 500, 502, 503, 504]`। अकाउंट-स्तरीय त्रुटियों के लिए ट्रिप न करें (अधिकांश 401/403/429 — वे कूलडाउन या लॉकआउट के अंतर्गत आते हैं)।

**लेज़ी रिकवरी:** जब `OPEN` समाप्त हो जाता है, तो `getStatus()`, `canExecute()`, `getRetryAfterMs()` स्थिति को `HALF_OPEN` में रीफ़्रेश करते हैं। वही रीड्स (और अगली विफलता) एक पुराने `DEGRADED` को वापस `CLOSED` में ले जाती हैं। किसी बैकग्राउंड टाइमर की आवश्यकता नहीं है।

---

### ऑप्ट-इन ग्लोबल प्रोवाइडर कूलडाउन (विंडो गेट)

एक चौथी, **ऑप्ट-इन** परत (`PROVIDER_COOLDOWN_ENABLED`, डिफ़ॉल्ट **बंद**) विफल प्रोवाइडर्स की
क्रॉस-रिक्वेस्ट मेमोरी
`open-sse/services/providerCooldownTracker.ts` में रखती है, जिसे कॉम्बो टारगेट
रिज़ॉल्यूशन द्वारा देखा जाता है ताकि लगातार कॉम्बो रिक्वेस्ट उस प्रोवाइडर पर दोबारा न जाएँ जो अभी
विफल हुआ है। प्रोवाइडर-स्तरीय एंट्रियाँ `PROVIDER_PROFILES` विंडो गेट का पालन करती हैं:

| प्रोफ़ाइल | कितने बाद ट्रिप (`providerFailureThreshold`) | अंदर (`providerFailureWindowMs`) | कितने समय कूल (`providerCooldownMs`) |
| --------- | -------------------------------------------: | -------------------------------: | -----------------------------------: |
| OAuth     |                                         `10` |                          `15min` |                               `5min` |
| API key   |                                         `15` |                          `30min` |                              `10min` |

सीमा से नीचे प्रोवाइडर को कूलिंग में **नहीं** माना जाता; एक सफलता विंडो को साफ़ कर देती है। कनेक्शन-स्तरीय एंट्रियाँ (`provider:connectionId`) इसके बजाय एक्सपोनेंशियल `minRetryCooldownMs → maxRetryCooldownMs` बैकऑफ़ रखती हैं। ओवरराइड:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
रिग्रेशन गार्ड: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. कनेक्शन कूलडाउन

**स्कोप:** एकल प्रदाता कनेक्शन/खाता/कुंजी।

**उद्देश्य:** एक खराब कुंजी को छोड़ना, जबकि उसी प्रदाता के अन्य कनेक्शन सेवा देते रहें।

**कार्यान्वयन:**

- अनुपलब्ध के रूप में चिह्नित करें: `src/sse/services/auth.ts::markAccountUnavailable()`
- चयन: उसी फ़ाइल में `getProviderCredentials*`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्स: `src/lib/resilience/settings.ts`

**प्रत्येक कनेक्शन के फ़ील्ड:**

- `rateLimitedUntil` — कूलडाउन समाप्त होने तक का टाइमस्टैम्प
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — एक्सपोनेंशियल बैकऑफ़ काउंटर

**डिफ़ॉल्ट कूलडाउन:**

- OAuth बेस: 5s
- API-key बेस: 3s
- API-key 429: अपस्ट्रीम `Retry-After`/रीसेट हेडर/पार्स किए जा सकने वाले रीसेट टेक्स्ट को प्राथमिकता देता है
- बैकऑफ़: `baseCooldownMs * 2 ** failureIndex`

**प्रति-प्रदाता पुनःप्रयास विलंब।** प्रदाता विवरण पृष्ठ में **पुनःप्रयास विलंब** चयन मौजूद है (Auto,
15s से 1h तक)। यह `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, `PATCH /api/resilience` के माध्यम से) में सहेजा जाता है। जब किसी रेट-लिमिट त्रुटि में कोई अपस्ट्रीम पुनःप्रयास संकेत नहीं होता, तो यह मान प्रदाता के लिए स्केल किए गए बैकऑफ़ को प्रतिस्थापित करता है और `backoffLevel` को 0 पर रीसेट करता है (`open-sse/services/rotationConfig.ts::overrideFor`)। रेट-लिमिट वाली त्रुटि के लिए प्राथमिकता, उच्चतम से निम्नतम: अपस्ट्रीम पुनःप्रयास संकेत, फिर प्रति-कनेक्शन `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, फिर प्रति-प्रदाता पुनःप्रयास विलंब, फिर env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, और अंत में स्केल किया गया बैकऑफ़। Auto फ़ील्ड को हटा देता है। यह केवल रेट-लिमिट कारण को प्रभावित करता है, टर्मिनल स्थितियों को कभी नहीं।

**एंटी-थंडरिंग-हर्ड सुरक्षा:** समवर्ती विफलताओं को कूलडाउन को आवश्यकता से अधिक बढ़ाने या `backoffLevel` को दो बार बढ़ाने से रोकती है।

**कनकरेंसी-लिमिट 429 बैकऑफ़ सीढ़ी पर नहीं बढ़ते।** ऐसा `429` जिसका बॉडी कनकरेंसी लिमिट ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) बताता है, इसका अर्थ है कि खाता स्वस्थ है लेकिन व्यस्त है।
`checkFallbackError()` `concurrency_limited` कारण लौटाता है: तुरंत अगले कनेक्शन पर फ़ेलओवर करें, इस कनेक्शन को एक निश्चित `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) या अपस्ट्रीम पुनःप्रयास संकेत के लिए कूल करें, `backoffLevel` को अपरिवर्तित रखें और `skipProviderBreaker` सेट करें।
स्पष्ट कोटा बॉडी को अभी भी प्राथमिकता मिलती है, इसलिए ऐसी बॉडी जो कोटा पैटर्न से भी मेल खाती है, कोटा निर्णय ही बनी रहती है। पहचान: `src/shared/utils/classify429.ts` में `looksLikeConcurrencyLimit()`; निर्णय: `open-sse/services/accountFallback/concurrencyLimit429.ts`। `classify429()` (ब्रेकर का `FailureKind`) अपरिवर्तित रहता है और इन बॉडी के लिए अभी भी `rate_limit` पढ़ता है।

**स्ट्रीम कंटेंट स्टॉल खाते को कूल नहीं करते।** जब कंटेंट-स्टॉल वॉचडॉग
(`open-sse/utils/streamHandler.ts`) ऐसी स्ट्रीम को छोड़ देता है जिसने समय पर कोई मॉडल आउटपुट नहीं भेजा, तो `markAccountUnavailable()` कनेक्शन पर त्रुटि दर्ज करता है, लेकिन कोई कूलडाउन सेट नहीं करता: स्टॉल उस अनुरोध से संबंधित होता है, जो प्रायः बिना आउटपुट के चलने वाला लंबा रीजनिंग टर्न होता है। ऑपरेटर `resilienceSettings.streamStallCooldown.enabled` (डिफ़ॉल्ट `false`) के माध्यम से इसे वैकल्पिक रूप से सक्षम कर सकते हैं।

**`p2c` खाता चयन के लिए वैकल्पिक लेटेंसी सिग्नल।** प्रत्येक भेजे गए प्रयास का टाइम-टू-फर्स्ट-बाइट और परिणाम प्रति कनेक्शन (और प्रति कनेक्शन + मॉडल) इन-मेमोरी रोलिंग विंडो में दर्ज किया जाता है: 15 मिनट के भीतर के अंतिम 20 नमूने
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` में
`safeLogEvents()` से रिकॉर्ड किए जाते हैं)। जब `resilienceSettings.p2cLatency.weight` `0`
से अधिक हो (सीमा 0-20, डिफ़ॉल्ट `0` = बंद), तो `src/sse/services/auth.ts` में `compareP2CConnections()` प्रत्येक उम्मीदवार-युग्म के उम्मीदवार को अधिकतम `weight` अंक जोड़ता है। इसका आधा भाग तेज़ उम्मीदवार के अनुपात के रूप में लेटेंसी से आता है (दोगुना धीमा होने पर पूरा आधा मिलता है) और आधा रोलिंग त्रुटि दर से।
यह पद तभी लागू होता है जब दोनों उम्मीदवारों के पास कम से कम 3 नमूने हों, इसलिए नए खातों को दंडित नहीं किया जाता और इसकी अधिकतम सीमा कोटा-ब्लॉक तथा कोटा-समाप्त दंड से कम रहती है। यह अपना कोई सर्किट नहीं जोड़ता: विफल खातों को अभी भी कूलडाउन, लॉकआउट और ब्रेकर परतों द्वारा संभाला जाता है। इसे `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` के साथ सेट करें।

**रीजनिंग फ़्रेम कंटेंट-स्टॉल बजट को पुनः आरंभ करते हैं।** कोई रीजनिंग मॉडल अपना पहला दृश्यमान टोकन देने से पहले कई मिनट तक सोच सकता है: Claude ऐसे `thinking_delta` फ़्रेम स्ट्रीम करता है जिनका thinking टेक्स्ट खाली हो सकता है, और Responses API एक के बाद एक रीजनिंग आइटम स्ट्रीम करती है। `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) इन फ़्रेम को पहचानता है और वॉचडॉग टर्न रद्द करने के बजाय प्रत्येक फ़्रेम पर अपना बजट पुनः आरंभ करता है। वे अभी भी मॉडल आउटपुट नहीं हैं, इसलिए केवल रीजनिंग के साथ समाप्त होने वाला टर्न अभी भी खाली रिपोर्ट किया जाता है और जो टर्न रीजनिंग रोककर केवल हार्टबीट भेजता है, वह अभी भी वॉचडॉग ट्रिगर करता है।

गैर-खाली सिग्नेचर वाले Kiro के बाइनरी `reasoningContentEvent` फ़्रेम इस रीजनिंग गतिविधि को एक खाली `reasoning_content` डेल्टा के रूप में एक्ज़ीक्यूटर के माध्यम से बनाए रखते हैं। सिग्नेचर फ़ॉरवर्ड नहीं किया जाता। मेटाडेटा, अधूरे फ़्रेम और खाली सिग्नेचर कंटेंट बजट को पुनः आरंभ नहीं करते; स्वतंत्र सक्रिय-स्ट्रीम टाइमआउट और क्लाइंट रद्दीकरण अभी भी लागू होते हैं (`open-sse/executors/kiro/reasoning.ts`)।

**टर्मिनल स्थितियाँ (कूलडाउन नहीं):**

- `banned` — प्रतिबंधित-कीवर्ड / खाता-बैन पहचान द्वारा सेट किया जाता है (देखें [BAN_DETECTION](../security/BAN_DETECTION.md))। अपस्ट्रीम प्रति-अनुरोध अस्वीकृतियाँ (`request_rejected`, जैसे Anthropic OAuth 403 "Request not allowed") इसे कभी सेट नहीं करतीं: इन्हें प्रति कनेक्शन और मॉडल गिना जाता है और बढ़ते कूलडाउन के साथ उस मॉडल को रोटेशन से हटा दिया जाता है, जिसकी अधिकतम सीमा `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) है; या जब कोई मॉडल ज्ञात न हो, तो कनेक्शन को कूल किया जाता है — `open-sse/services/requestRejectedStreak.ts`
- `expired` (सीमित पुनःप्रयासों के बाद टर्मिनल स्थिति में बदलता है — एक्सपोनेंशियल बैकऑफ़ के साथ `EXPIRED_RETRY_MAX = 3` — ताकि अस्थायी OAuth त्रुटियाँ खाता स्थायी रूप से निष्क्रिय होने से पहले स्वयं ठीक हो सकें)
- `credits_exhausted`

ये तब तक बने रहते हैं जब तक क्रेडेंशियल बदल नहीं जाते या कोई ऑपरेटर उन्हें रीसेट नहीं करता। टर्मिनल स्थितियों को अस्थायी कूलडाउन स्थिति से ओवरराइट न करें।

**Lazy recovery:** जब `rateLimitedUntil` बीत जाता है, तो कनेक्शन फिर से योग्य हो जाता है। सफल उपयोग पर, `clearAccountError()` सभी त्रुटि फ़ील्ड साफ़ कर देता है।

### Claude OAuth उपयोग सीमा: कम-प्राथमिकता लेन + सत्र-सीमा रीसेट

**दायरा:** एक Claude सदस्यता (OAuth) कनेक्शन। दोनों सुविधाएँ **प्रति कनेक्शन वैकल्पिक** हैं
(Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in
`providerSpecificData`, दोनों डिफ़ॉल्ट रूप से बंद) और Claude Code के `/low-priority` तथा `/limit-reset` कमांड का
अनुकरण करती हैं (वायर कॉन्ट्रैक्ट Claude Code 2.1.263 से लिया गया है)।

**कार्यान्वयन:**

- स्थिति मशीन + प्रतिक्रिया वर्गीकरण: `open-sse/services/claudeLowPriority.ts`
- रीसेट स्थिति/क्लेम क्लाइंट: `open-sse/services/claudeLimitReset.ts`
- एक्ज़ीक्यूटर हुक (हेडर इंजेक्शन + उसी खाते पर पुनः प्रयास): `open-sse/executors/base.ts::execute()`
- वैकल्पिकता का स्थायीकरण: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ट्रिगर:** 5-घंटे की उपयोग सीमा — एक `429` जिसकी हेडर में
`anthropic-ratelimit-unified-status: rejected` हो और, जब खाता योग्य हो,
`anthropic-ratelimit-unified-slow-offer: treatment` हो। उस पहली सीमा वाली
`429` से पहले कुछ भी नहीं भेजा जाता; एकीकृत हेडर के बिना आने वाली बर्स्ट `429` सामान्य कूलडाउन पथ से गुजरती है।

**कम-प्राथमिकता लेन** (`lowPriorityMode`):

- सीमा वाली `429` पर एक्ज़ीक्यूटर ऑफ़र स्वीकार करता है और तुरंत उसी खाते पर
  `anthropic-usage-limit: slow` के साथ पुनः प्रयास करता है; घोषित
  `anthropic-ratelimit-unified-reset` (+60s ग्रेस अवधि) तक लेन सक्रिय रहती है और उस विंडो में
  प्रत्येक अनुरोध यह हेडर भेजता है। इंटरसेप्ट की गई `429` `handleChatCore` तक नहीं पहुँचती, इसलिए कनेक्शन
  कूलडाउन में नहीं डाला जाता और न ही उसे दूसरे कनेक्शन पर घुमाया जाता है।
- बाद की प्रतिक्रियाओं में `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  लेन को बनाए रखते हैं; `slot_busy` (429) या `529` सर्वर के
  `anthropic-ratelimit-unified-slow-retry-after` (डिफ़ॉल्ट 20s, सीमा 5–600s, ±30% जिटर) के अनुसार प्रतीक्षा करते हैं
  और पुनः प्रयास करते हैं। यह प्रतीक्षा `anthropic-ratelimit-unified-slow-max-wait` (डिफ़ॉल्ट 20 मिनट, सीमा
  1 मिनट–6 घंटे) से सीमित होती है — इसके बाद लेन समाप्त हो जाती है और 10-मिनट का कूल-ऑफ पुनः-स्वीकृति को रोकता है। यह
  प्रतीक्षा अनुरोध के अपने अपस्ट्रीम-स्टार्ट टाइमआउट (`resolveFetchStartTimeout`, डिफ़ॉल्ट 10 मिनट) में बचे समय से,
  5 सेकंड की मार्जिन घटाने के बाद, अतिरिक्त रूप से सीमित होती है: इस सीमा के बिना 20-मिनट का डिफ़ॉल्ट max-wait
  अनुरोध से अधिक लंबा हो जाता और स्लीप बीच में रद्द होकर, सुगम `max_wait` समाप्ति + कूल-ऑफ के बजाय,
  `TimeoutError` सामने आता।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-घंटे की विंडो का रोलओवर, या
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (जो किसी भी स्थिति पर इसे
  `extra_usage` के रूप में समाप्त करता है, क्योंकि सशुल्क ओवरएज अब सीमा को कवर करता है) लेन को समाप्त कर देते हैं;
  इसके बाद प्रतिक्रिया सामान्य कूलडाउन पथ से गुजरती है। `budget_exhausted` को घोषित बजट रीसेट (≤ 8 दिन) तक याद रखा जाता है।
- सीमा जाँच एक्ज़ीक्यूटर के अपने 400-आधारित प्रयास-के-अंदर पुनः प्रयासों (कॉन्टेक्स्ट एडिटिंग,
  थिंकिंग/एफ़र्ट क्लैम्प, पैरामीटर ऑटो-लर्न) के बाद चलती है, इसलिए उन पुनः प्रयासों में से किसी एक पर सामने आने वाली
  सीमा वाली `429` भी कूलडाउन पथ तक पहुँचने के बजाय इंटरसेप्ट की जाती है।
- स्थिति प्रति कनेक्शन मेमोरी में रहती है (रीस्टार्ट होने पर पुनः-स्वीकृति के लिए एक अतिरिक्त सीमा वाली `429` लगती है)।

**सत्र-सीमा रीसेट** (`autoLimitReset`, दोनों सक्रिय होने पर लेन से पहले आज़माया जाता है):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ब्लॉक; जब `arm: "reset"` और `available: true` हो,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` के साथ
  `{ "program": "juniper_tide" }` भेजा जाता है (`providerSpecificData.organizationUUID` से संगठन UUID,
  बूटस्ट्रैप फ़ॉलबैक)।
- `result: reset|not_limited` → अनुरोध को पूर्ण गति पर पुनः आज़माया जाता है (slow हेडर के बिना)।
  `already_used` / `not_offered` `next_available_at` (डिफ़ॉल्ट एक सप्ताह) को मेमोाइज़ करते हैं; किसी भी
  विफलता पर 15 मिनट का बैकऑफ़ होता है। रीसेट सप्ताह में एक बार होता है और साप्ताहिक सीमा में फिर भी गिना जाता है।

रीग्रेशन सुरक्षा: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### सत्र संबद्धता (#7274)

**दायरा:** कोई एक क्लाइंट सत्र (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` हेडर)
किसी एक कनेक्शन से पिन किया जाता है, **किसी भी** प्रदाता के लिए।

**उद्देश्य:** बहु-टर्न एजेंट (Claude Code, aider, कस्टम एजेंट) को अनुरोधों के बीच उसी खाते पर बनाए रखना,
जिससे प्रति-खाता सत्र स्थिति वाले प्रदाताओं पर अलग-अलग खातों के बीच कॉन्टेक्स्ट खोने और बार-बार होने वाली
कोल्ड-स्टार्ट `429` प्रतिक्रियाओं में कमी आए।

**कार्यान्वयन:**

- TTL समाधान: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन चयन/निर्माण: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर निष्कर्षण (सामान्य, कोई भी प्रदाता): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- स्थायी पिन तालिका: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिंग: `sessionAffinityTtlMs` (मिलीसेकंड में वैश्विक TTL, `0` अक्षम करता है) — `src/lib/db/settings.ts`।
  Codex-केवल `codexSessionAffinityTtlMs` से नाम बदला गया, माइग्रेशन
  `124_generic_session_affinity_ttl.sql` द्वारा, जो पहले से कॉन्फ़िगर किए गए किसी भी Codex TTL को नए डिफ़ॉल्ट के रूप में
  आगे ले जाता है।

#7274 से पहले, `resolveSessionAffinityTtlMs()` `codex` को छोड़कर प्रत्येक प्रदाता के लिए जल्द ही `0` लौटा देता था,
इसलिए TTL सेटिंग (और सत्र हेडर) कहीं और प्रभावी नहीं होते थे, जबकि पिनिंग तंत्र और हेडर निष्कर्षण पहले से ही
प्रदाता-स्वतंत्र थे। सुधार ने वह शुरुआती रिटर्न हटा दिया; अब वैश्विक रूप से `0` से अधिक सेट किए जाने पर TTL
सभी प्रदाताओं पर समान रूप से लागू होता है।

तीनों सत्र-संबद्धता हेडर कभी भी अपस्ट्रीम फ़ॉरवर्ड नहीं किए जाते — एक्ज़ीक्यूटर क्लाइंट हेडर को आगे भेजने के बजाय
अपने अपस्ट्रीम हेडर शुरू से बनाते हैं, इसलिए यह केवल एक आंतरिक सहसंबंध आईडी बनी रहती है।

### विशिष्ट रूप से प्रबंधित सत्र कनेक्शन लीज़

**दायरा:** एक सक्रिय managed HTTP क्लाइंट/सत्र एक योग्य OmniRoute कनेक्शन का स्वामी होता है।

**उद्देश्य:** उन क्लाइंट्स के लिए टिकाऊ विशिष्ट कनेक्शन स्वामित्व प्रदान करना जिन्हें अनुरोधों के बीच कठोर रूटिंग सीमा चाहिए। यह सत्र affinity से अलग है, जो एक नरम निरंतरता प्राथमिकता है:
एक विशिष्ट लीज़ SQLite में लाइफ़साइकल स्थिति बनाए रखती है, वैश्विक सक्रिय-स्वामी और
सक्रिय-कनेक्शन विशिष्टता लागू करती है, और provider dispatch से पहले बासी generation को
अस्वीकार करती है।

यह सुविधा प्रति API कुंजी opt-in है। किसी managed कुंजी के पास `lease:exclusive` scope और
एक स्पष्ट, गैर-रिक्त `allowedConnections` सूची होनी चाहिए। कोई भी HTTP क्लाइंट लाइफ़साइकल endpoint का
उपयोग कर सकता है; किसी क्लाइंट नाम, user-agent, provider, OAuth विधि या model की आवश्यकता नहीं है। लीज़ किसी
model की नहीं, बल्कि एक कनेक्शन की स्वामी होती है, इसलिए कनेक्शन सामान्य रूप से योग्य रहने तक
model बदलने पर binding बनी रहती है। सामान्य model, quota, health, cooldown और allowlist नियम
अधिकृत बने रहते हैं और उसी generation को किसी अन्य मुक्त योग्य कनेक्शन में स्थानांतरित कर सकते हैं।

लाइफ़साइकल `POST /api/v1/session-leases` है, जिसमें JSON actions `acquire`, `renew` और `release` होते हैं।
Managed inference अनुरोध opaque `X-OmniRoute-Lease-Owner` मान और सटीक
`X-OmniRoute-Lease-Generation` प्रस्तुत करते हैं। owner `vlo_` के बाद 43 base64url वर्णों का उपयोग करता है; केवल
उसका SHA-256 hash संग्रहीत किया जाता है। प्रत्येक अंतिम dispatch fence प्रमाणित API कुंजी ID और
सक्रिय कनेक्शन ID से भी बंधी होती है। लीज़ नियंत्रण headers को logs, बनाए रखे गए अनुरोध snapshots और
upstream executor headers से हटा दिया जाता है।

यदि सामान्य रूटिंग में योग्य managed candidates मौजूद हों, लेकिन प्रत्येक मुक्त candidate किसी
अन्य स्वामी की सक्रिय लीज़ द्वारा अधिगृहीत हो, तो OmniRoute HTTP `429`, lease-capacity-unavailable code,
waiting-for-capacity state और सबसे पहले समाप्त होने वाली प्रासंगिक लीज़ से निकाला गया सीमित
`Retry-After` लौटाता है। सामान्य रूप से योग्य candidates का खाली होना लीज़ contention नहीं है और
रूटिंग त्रुटि की मौजूदा semantics बनाए रखता है।

संबंधित mechanisms अलग-अलग बने रहते हैं:

- OAuth session occupancy, OAuth खातों के लिए process-local soft distribution है।
- Account semaphores अनुरोध-concurrency permits प्रदान करते हैं और अनुरोध पूरा होने पर समाप्त हो जाते हैं।
- Exclusive managed session leases generation fence के साथ टिकाऊ लाइफ़साइकल स्वामित्व हैं।

## 3. मॉडल लॉकआउट

**दायरा:** प्रदाता + कनेक्शन + मॉडल ट्रिपल।

**स्थिति के अनुसार मुख्य दायरा:** विफल स्थिति यह तय करती है कि लॉकआउट किस कुंजी पर लिखा जाएगा
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — कोटा या अधिकार-संबंधी संकेत — **कोटा परिवार** को लॉक करें:
  codex के लिए पूरा `codex` / `spark` दायरा (कनेक्शन का प्रत्येक `gpt-5*` मॉडल), अन्य प्रदाताओं के लिए `getQuotaScopedModelForProvider()`.
- `404` बेयर मॉडल को लॉक करता है (`getModelLockKey()` `not_found` को संकीर्ण करता है)।
- कोई भी अन्य स्थिति — `5xx` ट्रांसपोर्ट/सर्वर विफलताएँ और गुणवत्ता सत्यापन से OmniRoute द्वारा संश्लेषित
  `502` — केवल सटीक प्रदाता/कनेक्शन/मॉडल ट्यूपल को लॉक करती है। किसी एक मॉडल पर खराब स्ट्रीम होना
  खाते के कोटा के बारे में प्रमाण नहीं है; इस नियम से पहले `codex/gpt-5.6-luna` पर एक खाली प्रतिक्रिया
  उस कनेक्शन के प्रत्येक `gpt-5*` मॉडल को 2–30 मिनट (बढ़ते हुए) रूटिंग से हटा देती थी, जबकि उसका कोटा
  अप्रभावित रहता था।
- कॉलर का स्पष्ट `scope` विकल्प हमेशा प्रभावी होता है (Antigravity `"exact"` पास करता है)।

**उद्देश्य:** जब केवल एक मॉडल अनुपलब्ध या कोटा-सीमित हो, तब पूरे कनेक्शन को अक्षम करने से बचना।

**उदाहरण:**

- 429 लौटाने वाले प्रति-मॉडल कोटा प्रदाता
- किसी एक अनुपलब्ध मॉडल के लिए 404 लौटाने वाले स्थानीय प्रदाता
- प्रदाता-विशिष्ट मोड/मॉडल अनुमति विफलताएँ (जैसे, Grok मोड)

**कार्यान्वयन:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### मॉडल कूलडाउन डैशबोर्ड (v3.8.0)

UI: सेटिंग्स → मॉडल कूलडाउन (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

सक्रिय लॉकआउट की सूची प्रदर्शित करता है: प्रदाता, कनेक्शन, मॉडल, कारण, expiresAt। ऑपरेटर कार्ड से किसी मॉडल को मैन्युअल रूप से फिर से सक्षम कर सकते हैं।

**REST API:**

- `GET /api/resilience/model-cooldowns` — सक्रिय लॉकआउट की सूची
- `DELETE /api/resilience/model-cooldowns` — मैन्युअल रूप से फिर से सक्षम करना। बॉडी: `{provider, connection, model}`। प्रमाणीकरण: management।

### कूलडाउन प्रबंधक

UI: मॉनिटरिंग → कूलडाउन प्रबंधक (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

हर उस कनेक्शन के लिए एक पृष्ठ, जो किसी अस्थायी कारण से रूटिंग से बाहर है, ताकि
हर प्रदाता का पृष्ठ अलग-अलग खोलने की आवश्यकता न हो। यह कनेक्शन कूलडाउन, मॉडल लॉकआउट और टर्मिनल
स्थितियों की सूची प्रदर्शित करता है, उन्हें प्रति कनेक्शन, किसी चयन के लिए, या किसी प्रदाता के सभी
कनेक्शनों के लिए साफ़ करता है, और सबसे अधिक समायोजित की जाने वाली कूलडाउन नियमों को संपादित करता है:
`streamStallCooldown.enabled` और OAuth / API-key `connectionCooldown` का बेस कूलडाउन तथा अधिकतम
बैकऑफ़ चरण (इन्हें `PATCH /api/resilience` के माध्यम से सहेजा जाता है)। टर्मिनल स्थितियाँ
(`banned`, `expired`, `credits_exhausted`) सूचीबद्ध की जाती हैं, लेकिन यहाँ कभी साफ़ नहीं की जातीं।

उसी पृष्ठ पर मौजूद **त्रुटि कूलडाउन नियम** कार्ड ऑपरेटर त्रुटि नियमों
(`settings.providerErrorRules`) और प्रति-प्रदाता कैच-ऑल डिफ़ॉल्ट
(`settings.providerErrorDefaults`) को `PATCH /api/settings` के माध्यम से संपादित करता है — इनके
मिलान का तरीका जानने के लिए §7 के अंतर्गत "ऑपरेटर द्वारा घोषित नियम" देखें। अवधि Default (कोई स्पष्ट कूलडाउन नहीं),
30 मिनट, 1 घंटा, 5 घंटे, 24 घंटे, या 1 से 43,200 मिनट (30 दिन) का कस्टम मान हो सकती है।

**REST API** (`src/lib/resilience/cooldownManager.ts`, प्रमाणीकरण: management):

- `GET /api/resilience/cooldowns[?provider=]` — स्थिति, शेष कूलडाउन,
  बैकऑफ़ स्तर, अंतिम त्रुटि प्रकार और मॉडल लॉकआउट वाले कनेक्शन (कोई क्रेडेंशियल नहीं)
- `POST /api/resilience/cooldowns` — बॉडी `{connectionIds: string[]}` या
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` लौटाता है

### लॉकआउट सेटिंग्स UI + सफलता-क्षय रिकवरी (v3.8.23)

मॉडल लॉकआउट हमेशा-सक्रिय हार्डकोडेड व्यवहार से बदलकर पूरी तरह कॉन्फ़िगर करने योग्य,
ऑप्ट-इन सुविधा बन गया है, जिसमें इसका अपना सेटिंग्स कार्ड और स्वयं-सुधार रिकवरी पथ है।

**सेटिंग्स कार्ड:** सेटिंग्स → मॉडल लॉकआउट
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
यह ऊपर दिए गए केवल-पठन `ModelCooldownsCard` से **अलग** है (जो केवल सक्रिय लॉकआउट की
_सूची_ प्रदर्शित करता है) — नया कार्ड _पैरामीटर कॉन्फ़िगर_ करता है। डिफ़ॉल्ट
`DEFAULT_MODEL_LOCKOUT_SETTINGS` (`src/lib/resilience/modelLockoutSettings.ts`) में रहते हैं:

| सेटिंग                  | डिफ़ॉल्ट                         | अर्थ                                                              |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | मास्टर टॉगल — मॉडल लॉकआउट **डिफ़ॉल्ट रूप से बंद** है।             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | अपस्ट्रीम स्थितियाँ जिन्हें मॉडल-स्कोप वाली विफलता माना जाता है।  |
| `baseCooldownMs`        | `120_000` (120 सेकंड)            | पहली विफलता के लिए प्रारंभिक लॉकआउट अवधि।                         |
| `maxCooldownMs`         | `1_800_000` (30 मिनट)            | बढ़ाए गए कूलडाउन की अधिकतम सीमा।                                  |
| `maxBackoffSteps`       | `10`                             | घातीय-बैकऑफ़ वृद्धि के अधिकतम चरण।                                |
| `useExponentialBackoff` | `true`                           | क्या बार-बार होने वाली विफलताएँ कूलडाउन को घातीय रूप से बढ़ाएँगी। |

सेटिंग्स सामान्य सेटिंग्स स्टोर के माध्यम से स्थायी की जाती हैं और resilience settings schema के
माध्यम से सत्यापित होती हैं; कार्ड `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` के साथ) और `maxBackoffSteps` की सीमाएँ निर्धारित करता है।

**सफलता-क्षय रिकवरी:** रिकवरी केवल टाइमर समाप्त होने पर निर्भर नहीं है। स्वस्थ
प्रतिक्रिया मॉडल की विफलता संख्या को धीरे-धीरे कम करती है, ताकि जो मॉडल
मध्य-अवधि में ठीक हो गया है, वह बढ़ना बंद कर दे (और साफ़ हो जाए)
टाइमर समाप्त होने से पहले। सफल कॉम्बो लक्ष्य पर, `open-sse/services/combo.ts`
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`) को कॉल करता है,
जो संग्रहीत `failureCount` को आधा करता है (`Math.floor(failureCount / 2)`); जब यह `0` पर पहुँचता है,
तो लॉकआउट प्रविष्टि पूरी तरह हटा दी जाती है। इसका समकक्ष `recordModelLockoutFailure()`
विफलताओं पर संख्या बढ़ाता है (और कूलडाउन को बढ़ाता है) जो वृद्धि विंडो के भीतर होती हैं।
यह सफलता-क्षय साधारण टाइमर समाप्ति के अतिरिक्त है — दोनों में से कोई भी पथ मॉडल को फिर से सक्षम कर सकता है।

**स्थिति:** लॉकआउट `Map`s में **मेमोरी में** (प्रति-प्रोसेस
`ModelLockoutEntry`, जिन्हें `provider:connectionId:model` के आधार पर कुंजीबद्ध किया गया है, और सटीक-स्कोप लॉक को
`provider:connectionId:exact:model` के आधार पर कुंजीबद्ध किया गया है) रखे जाते हैं, इन्हें
DB में स्थायी रूप से संग्रहीत नहीं किया जाता — रीस्टार्ट होने पर ये खो जाते हैं। _सेटिंग्स_ स्थायी रूप से संग्रहीत की जाती हैं; सक्रिय
लॉकआउट _स्थिति_ अस्थायी होती है।

---

## 4. कोटा-शेयर समवर्तीता नियंत्रण (v3.8.36)

सब्सक्रिप्शन खाते (GLM, MiniMax आदि) अक्सर केवल ~1–3 समवर्ती
अनुरोध स्वीकार करते हैं; इससे अधिक होने पर 429 और कूलडाउन ट्रिगर होते हैं। यह
**कोटा-शेयर** (`qtSd/…`) कॉम्बो के अंतर्गत विशेष रूप से गंभीर है, जहाँ कई API कुंजियाँ
एक ही अपस्ट्रीम खाते को साझा करती हैं। साझा खाते को अत्यधिक अनुरोधों से बचाने के लिए
तीन स्तर काम करते हैं।

### प्रति-कनेक्शन समवर्तीता सीमा (`max_concurrent`)

प्रत्येक प्रोवाइडर कनेक्शन एक `max_concurrent` सीमा घोषित कर सकता है
(`provider_connections.max_concurrent`, जिसे कनेक्शन मोडल / API / DB में सेट किया जाता है)।
बिना सीमा के लिए इसे खाली छोड़ें। यही एकमात्र नियंत्रण नीचे दी गई
सीरियलाइज़ेशन परत को संचालित करता है — इसे खाते की वास्तविक समवर्तीता पर सेट करें
(जैसे GLM ~1, MiniMax ~2)।

### प्रति-मॉडल समवर्तीता सीमाएँ (`modelConcurrency`)

एक कनेक्शन अपने `rateLimitOverrides` मैप के अंदर सटीक प्रति-मॉडल समवर्तीता सीमाएँ
भी घोषित कर सकता है:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

इसे कनेक्शन मोडल में (**Rate limit overrides → Per-model
concurrency caps**, प्रति पंक्ति एक `model=cap`) या
`PATCH /api/providers/[id]` के माध्यम से उसी JSON संरचना के साथ सेट करें। मुख्य
अर्थ-विज्ञान:

- **कनेक्शन-व्यापी बनाम मॉडल-विशिष्ट:** `maxConcurrent` साझा
  कनेक्शन-व्यापी सीमा बनी रहती है। जब दोनों लागू हों, तो दोनों गेट एक ही
  कंपोज़िट गेट (`global → provider → account → model`) में परमाणु रूप से
  प्राप्त किए जाते हैं; प्रभावी व्यवहार लागू सीमाओं में से अधिक कठोर सीमा का होता है।
- **सटीक मॉडल-कुंजी मिलान:** कुंजी वह मॉडल स्ट्रिंग है जो रूटिंग समाधान के बाद
  एक्जीक्यूटर को दी जाती है — सामान्यतः केवल अपस्ट्रीम मॉडल आईडी
  (`glm-5`), न कि क्लाइंट-साइड `provider/model` उपनाम (`zai/glm-5`,
  `glm-5` से मेल नहीं खाता)। मान धनात्मक-पूर्णांक समवर्ती अनुरोध सीमाएँ होते हैं।
- **स्थानीय कतारबद्धता, कोई खोज नहीं:** अतिरिक्त अनुरोध मौजूदा
  कतार/टाइमआउट अर्थ-विज्ञान के साथ स्थानीय रूप से कतार में प्रतीक्षा करते हैं
  (टाइप किए गए `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` प्रवेश त्रुटियाँ)। OmniRoute अपस्ट्रीम नीति की
  खोज या अनुमान नहीं लगाता — यह ऑपरेटर द्वारा कॉन्फ़िगर की गई सटीक सीमाओं को
  लागू करता है। संतृप्त मॉडल गेट कभी प्रोवाइडर को अक्षम नहीं करता और न ही
  स्थायी मॉडल लॉकआउट बनाता है; अपस्ट्रीम 429/कूलडाउन/फॉलबैक व्यवहार त्रुटि
  बैकस्टॉप बना रहता है।
- **प्रति-कनेक्शन, प्रति-प्रोसेस दायरा:** सीमाएँ प्रति डेटाबेस कनेक्शन होती हैं
  और मेमोरी में रखी जाती हैं, इसलिए एक ही अपस्ट्रीम API कुंजी का पुनः उपयोग करने
  वाले दो कनेक्शन एक-दूसरे के साथ समन्वय नहीं करते।
- **कॉन्फ़िगर न होने पर व्यवहार अपरिवर्तित:** मैप को छोड़ देने (या
  डैशबोर्ड फ़ील्ड को खाली छोड़ने) पर कोई मॉडल गेट नहीं जोड़ा जाता। किसी
  सार्वभौमिक प्रोवाइडर सीमा का दावा किए बिना उदाहरण कॉन्फ़िगरेशन:

```text
glm-5=1
glm-4.7=3
```

### कोटा-शेयर अनुरोध सीरियलाइज़ेशन

जब कोई कोटा-शेयर डिस्पैच ऐसे कनेक्शन को लक्षित करता है जो धनात्मक
`max_concurrent` घोषित करता है, तो उस **खाते** के समवर्ती अनुरोध प्रति-कनेक्शन
सेमाफोर (`qsconn:<connectionId>`) के माध्यम से सीरियलाइज़ किए जाते हैं:
अतिरिक्त अनुरोध खाते पर बाढ़ लाने के बजाय **कतार में प्रतीक्षा करते हैं**। यह
**फेल-ओपन** है — संतृप्त कतार या टाइमआउट स्लॉट के बिना आगे बढ़ता है और कभी भी
डिस्पैचेबल अनुरोध को अस्वीकार नहीं करता। इसे **Settings → Resilience →
Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, डिफ़ॉल्ट
on) में टॉगल करें। `max_concurrent` सीमा के बिना व्यवहार अपरिवर्तित रहता है।

> कोटा-शेयर रूटिंग गेट (`selectQuotaShareTarget`, DRR + P2C) स्वयं
> फेल-ओपन है और सीमा पर पहुँच चुके कनेक्शन को केवल _कम प्राथमिकता_ देता है —
> एकल-कनेक्शन पूल में यह कठोर सीमा लागू नहीं कर सकता, इसलिए यही सेमाफोर वास्तव में
> बाढ़ को नियंत्रित करता है।

### कॉम्बो कूलडाउन-जागरूक पुनःप्रयास

प्रत्येक कॉम्बो रणनीति के लिए (सक्षम होने पर), ऐसा अनुरोध जो SHORT ट्रांज़िएंट
कूलडाउन के लिए 429 उत्पन्न करता, उसे लौटाने के बजाय कूलडाउन समाप्त होने तक
प्रतीक्षा करता है और फिर पुनः डिस्पैच होता है — इसमें बहु-मॉडल कॉम्बो पर
Gemini-क्लास TPM/RPM विंडो (~60s retry-after) भी शामिल हैं, जैसे 2-मॉडल
कॉम्बो के दोनों लक्ष्य प्रति-मॉडल दर सीमा तक पहुँच जाएँ। यह
**Settings → Resilience** में `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) द्वारा सीमित है। यह `quota_exhausted` (मध्यरात्रि तक
लॉक) या auth/not-found कारणों पर कभी प्रतीक्षा नहीं करता।

कोई कॉम्बो `config.comboCooldownWaitEnabled: false` के साथ इससे बाहर निकल सकता है। केवल
literal `false` इन साझा कॉम्बो प्रतीक्षाओं (पोस्ट-डिस्पैच कूलडाउन और
प्री-डिस्पैच सर्किट-ओपन/मॉडल-लॉक प्रतीक्षाएँ) तथा उनके wait-budget timeout-floor
विस्तार को अक्षम करता है। अनुपस्थित या `true` होने पर वैश्विक नीति बनी रहती है;
`true` वैश्विक रूप से अक्षम प्रतीक्षा को सक्षम नहीं कर सकता। स्पष्ट
`targetTimeoutMs` अभी भी प्रभावी रहता है। यह ऑप्ट-आउट अलग native-Codex
turn-pin प्री-डिस्पैच प्रतीक्षा को नहीं बदलता।

यही गेट प्री-डिस्पैच स्थिति (#16319) को भी कवर करता है: जब किसी कॉम्बो के प्रत्येक
लक्ष्य को कोई प्रयास किए जाने से पहले छोड़ दिया जाता है क्योंकि उसका मॉडल एक
छोटे ट्रांज़िएंट लॉकआउट में है, तो शून्य-प्रयास पथ उसी सीमाओं के अंतर्गत
लॉकआउट समाप्त होने तक प्रतीक्षा करता है और फिर पुनः डिस्पैच होता है, बजाय
hint-less `503 ALL_TARGETS_SKIPPED` उत्तर देने के। जब कोई प्रतीक्षा अनुमत नहीं
हो (सीमा, प्रयास या बजट समाप्त हो गया हो, या सुविधा बंद हो), तो टर्मिनल उत्तर
सबसे शुरुआती ट्रांज़िएंट लॉक समाप्ति से `retry_after` / `reset_at` लेकर
`429 rate_limit_error` में अपग्रेड हो जाता है; quota, auth और not-found लॉक
hint-less 503 बनाए रखते हैं।

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

## 5. अनुरोध कतार प्रवेश नियंत्रण (v3.8.49 · समस्या #6593)

**दायरा**: स्थानीय प्रति-प्रदाता+कनेक्शन दर-सीमा कतार (`open-sse/services/rateLimitManager.ts`,
Bottleneck द्वारा समर्थित), ऊपर दिए गए तीन तंत्रों से एक स्तर नीचे।

**`maxWaitMs` कतार-प्रतीक्षा को सीमित करता है; `executionMaxWaitMs` निष्पादन को सीमित करता है।**
दोनों जानबूझकर अलग हैं, और इनमें से कोई भी दूसरे के मान को प्रभावित नहीं करता।

`resilienceSettings.requestQueue.maxWaitMs` **कतार-प्रतीक्षा बजट** है: यह
प्रदाता स्लॉट की प्रतीक्षा करने और फिर QUEUED अवस्था में रहने, दोनों को
कवर करता है, और इसका टाइमर उसी क्षण साफ़ हो जाता है जब जॉब QUEUED से बाहर निकलकर निष्पादन शुरू करता है
(`rateLimitManager.ts`, `wrappedFn`)। जो अनुरोध इसे पार कर जाता है, वह कभी अपस्ट्रीम तक नहीं पहुँचता। डिफ़ॉल्ट 30000ms है, जो
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` द्वारा `src/lib/resilience/settings.ts` में दिया जाता है और
`tests/unit/ratelimit-admission-control-6593.test.ts` द्वारा निश्चित किया गया है, इसलिए
इसमें बदलाव करने पर यह परीक्षण लाल हो जाएगा, न कि यह अनुच्छेद चुपचाप पुराना पड़ा रहेगा।

`resilienceSettings.requestQueue.executionMaxWaitMs` वह मान है जो Bottleneck को जॉब के
`expiration` के रूप में मिलता है; इसका टाइमर केवल डिस्पैच के बाद शुरू होता है। यह ऐसे निष्पादकों के लिए
अंतिम सुरक्षा-सीमा है जिनका अपना अपस्ट्रीम टाइमआउट नहीं है, और जब निष्पादक का अपना फ़ेच-आरंभ टाइमआउट अधिक लंबा हो, तो इसे उसी तक बढ़ा दिया जाता है, ताकि यह स्वस्थ रूप से चल रही प्रतिक्रिया को बीच में समाप्त न कर सके। डिफ़ॉल्ट 600000ms (10 min) है।

कतार बजट को `expiration` में देना ही पहले नॉन-इन्क्रिमेंटल गेटवे को बीच में समाप्त कर देता था — वे पहले बाइट मिलने से पहले वैध रूप से कई मिनट तक चलते हैं — और इसी वजह से expiration को
`code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) के रूप में दिखाया जाता है, जबकि कतार बजट कतार-टाइमआउट कोड देता है। दोनों में से किसी को `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) या डैशबोर्ड
(**सेटिंग्स → रेज़िलिएंस**) के ज़रिए ओवरराइड करें। सामान्यीकृत किए जाने पर दोनों को
1ms–24h तक सीमित किया जाता है।

दोनों के लिए प्राथमिकता: पर्यावरण चर केवल _डिफ़ॉल्ट_ प्रदान करता है। `resilienceSettings.requestQueue` में
सहेजा गया मान (डैशबोर्ड / API पैच, `key_value` में संग्रहीत) उस पर प्राथमिकता रखता है, और प्रति-कनेक्शन
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` उससे भी ऊपर होता है। पहले से सहेजा गया मान रखने वाले
डिप्लॉयमेंट पर पर्यावरण चर सेट करने से इसलिए कुछ नहीं बदलता — इसके बजाय सहेजी गई सेटिंग हटाएँ या अपडेट करें।

कतार में रहने की अवधि `maxWaitMs` से सीमित है; नीचे दिया गया `maxQueueDepth` यह सीमित करता है कि एक बार में कितने कॉलर कतार में रखे जा सकते हैं।

**बॉडी में बताए गए रिट्राई: गति-नियमन बनाम लॉकआउट।** 429 बॉडी अपनी प्रतीक्षा-अवधि बता सकती है
(Gemini `RetryInfo.retryDelay`, "retry after Ns" पाठ), जिसे
`updateFromResponseBody` पढ़ता है। कनेक्शन के `maxWaitMs` में समाने वाली प्रतीक्षा गति-नियमन है: लिमिटर
उतनी अवधि के लिए अपना रिज़र्वॉयर खाली कर देता है और उसके फिर भरने पर कतारबद्ध कॉल डिस्पैच होती हैं। `maxWaitMs`
से लंबी प्रतीक्षा ऐसी नहीं है जिसे कतार में बैठकर काटा जा सके — दैनिक कोटा समाप्त होने पर Gemini
`retryDelay: "86399s"` के साथ जवाब देता है। पुनर्निर्मित 429 (#16528) में रिले किया गया `Retry-After`
पहले ही फ़ॉलबैक इंजन को उस अवधि के लिए मॉडल लॉक कर देता है, लेकिन उसके लिए लिमिटर को भी रोकने पर
कुंजी तक जल्दी पहुँचने वाली कोई भी कॉल (उदाहरण के लिए रेज़िलिएंस रीसेट के बाद) पूरे `maxWaitMs` तक फिर भी अटकी रहेगी। जब ऐसी प्रतीक्षा टाइप किए गए Google `RetryInfo`
विवरण से आती है (`google_rpc_retry_info` स्रोत-सूचना) और कुंजी का लिमिटर पहले से मॉडल तक सीमित है
(`getLimiterKey` देखें), तो 429 इसके बजाय उस कनेक्शन पर मॉडल लॉकआउट बन जाता है
(`lockModelForLongBodyRetry` in `open-sse/services/rateLimitManager/bodyRetryPause.ts`, अधिकतम 24h तक सीमित), और लिमिटर को बिना रोके छोड़ दिया जाता है। खाता चयन
`isModelLocked()` के ज़रिए ऐसे लॉक किए गए मॉडल को छोड़ देता है, और कनेक्शन पर पिन किए गए लक्ष्यों के लिए कॉम्बो प्री-डिस्पैच गेट भी ऐसा ही करता है। antigravity में, जहाँ लिमिटर प्रति कोटा-परिवार है, लॉक ठीक उसी मॉडल पर लगता है, जैसे उसके अन्य कोटा लॉक में। जब कोई अलियास उस मॉडल में resolve हो जाता है, तो क्लाइंट द्वारा माँगा गया नाम भी लॉक हो जाता है, क्योंकि ये जाँचें अनुरोधित नाम का उपयोग करती हैं; इसे सटीक रूप से (`lockExactModel`) लॉक किया जाता है, इसलिए antigravity के किसी कोटा-परिवार या codex scope को पार करने वाला अलियास अपना नाम कभी लॉक नहीं करता। साधारण-पाठ संकेत, अनटाइप्ड `retryDelay`, या पूरे कनेक्शन के साथ साझा किया गया लिमिटर इस विराम को बनाए रखता है। जब 429 पथ द्वारा अभी-अभी पुनर्निर्मित लिमिटर रुकता है, तो जिस कॉलर का शेष कतार-समय उस विराम के समाप्त होने से पहले समाप्त हो जाता है, उसे उस अवधि के समाप्त होने तक प्रतीक्षा कराने के बजाय कतार-टाइमआउट कोड (`checkLimiterPause`) के साथ तुरंत अस्वीकार कर दिया जाता है; दर्ज किया गया समाप्ति-बिंदु लिमिटर बनाए जाने से पहले तय किया जाता है, वहीं जहाँ Bottleneck अपना रिफ्रेश क्लॉक शुरू करता है, और रिज़र्वॉयर में बाद का कोई भी बदलाव उस समाप्ति-बिंदु को भुला देता है। इसका परीक्षण
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` और
`tests/unit/rate-limit-body-retry-pause.test.ts` में किया गया है।

**`maxQueueDepth` — ऑप्ट-इन प्रवेश सीमा (नया)।** `resilienceSettings.requestQueue.maxQueueDepth`
यह सीमा तय करता है कि एक प्रदाता+कनेक्शन के लिए एक समय में कितने अनुरोध कतार में
(अभी डिस्पैच न किए गए) रह सकते हैं। जब कतार में पहले से `maxQueueDepth`
अनुरोध हों, तो नया अनुरोध टाइप की गई
`code: "RATE_LIMIT_QUEUE_FULL"` त्रुटि के साथ तुरंत अस्वीकार कर दिया जाता है **इससे पहले** कि वह कभी `limiter.schedule()` तक पहुँचे
— इसलिए यह अस्वीकृति कम लागत में होती है और उस अनुरोध के लिए होने वाले किसी भी डाउनस्ट्रीम प्रॉम्प्ट-संपीड़न / अनुवाद कार्य से पहले हो जाती है। डिफ़ॉल्ट `0` = अक्षम, जिससे मौजूदा असीमित-कतार व्यवहार बना रहता है; मान
0–100000 तक सीमित है। इसे `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) या
`resilienceSettings.requestQueue.maxQueueDepth` (डैशबोर्ड/API पैच) के ज़रिए ओवरराइड करें।

प्रवेश-जाँच स्वयं एक शुद्ध फ़ंक्शन है
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), इसलिए वास्तविक Bottleneck लिमिटर के बिना भी इसका यूनिट परीक्षण किया जा सकता है।

> #6593 को खोलने वाले RFC ने एक `bypassCompressionOnRateLimit`
> फ़्लैग भी प्रस्तावित किया था। इस रेपो की `open-sse/services/compression/` पाइपलाइन
> आउटबाउंड LLM रिक्वेस्ट (`chatCore.ts`,
> लगभग `resolveCompressionSettings`/`selectCompressionStrategy` ब्लॉक के आसपास) पर
> प्रॉम्प्ट/कॉन्टेक्स्ट कम्प्रेशन है — सिंथेसाइज़ किए गए 429 बॉडी पर HTTP रिस्पॉन्स कम्प्रेशन नहीं —
> इसलिए शाब्दिक बाईपास फ़्लैग के लिए कोई मेल खाता कोड पाथ मौजूद नहीं है। वह प्रॉम्प्ट-कम्प्रेशन चरण
> भी वर्तमान में रिक्वेस्ट पाइपलाइन में `withRateLimit()` से _पहले_ चलता है, इसलिए
> क्यू-फुल अस्वीकार (queue-full rejection) पर इसे छोड़ने के लिए पुनःक्रमित करना
> इस issue के दायरे से अलग, एक बड़ा बदलाव है; इसे जानबूझकर यहाँ लागू **नहीं** किया गया
> और यदि CPU-बचत का लाभ पुनःक्रमण जोखिम के लायक हो, तो इसे फ़ॉलो-अप के रूप में छोड़ दिया गया है।

### रेट-लिमिट ऑटो-एनेबल सेफ़्टी नेट और कनेक्शन सुरक्षा (`rateLimitProtection`)

**ऑटो-एनेबल सेफ़्टी नेट** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, डिफ़ॉल्ट `true`):
डिफ़ॉल्ट रूप से, OmniRoute सभी सक्रिय API-key प्रोवाइडर कनेक्शन (`getProviderCategory(provider) === "apikey"`) के लिए रेट-लिमिट क्यू सुरक्षा को स्वचालित रूप से सक्षम करता है। यह सुनिश्चित करता है कि रेट-संवेदनशील अपस्ट्रीम API keys पर आने वाले अनुरोध अपस्ट्रीम 429 त्रुटियों में बर्स्ट होने के बजाय Bottleneck के माध्यम से कतारबद्ध और थ्रॉटल किए जाएँ। सेफ़्टी नेट को `RATE_LIMIT_AUTO_ENABLE` एनवायरनमेंट वेरिएबल (`false`/`0`/`off` अक्षम करता है, `true`/`1`/`on` चालू करने के लिए बाध्य करता है) के माध्यम से ओवरराइड किया जा सकता है, जो सहेजी गई डैशबोर्ड सेटिंग (**सेटिंग्स → रेज़िलिएंस** / `PATCH /api/resilience`) पर प्राथमिकता लेता है।

**प्रति-कनेक्शन `rateLimitProtection` की सेमेंटिक्स:**
प्रति-कनेक्शन रेट-लिमिट सुरक्षा प्रोवाइडर कनेक्शन पर `rateLimitProtection` बूलियन फ़ील्ड के माध्यम से ट्रैक की जाती है (SQLite में `rate_limit_protection` के रूप में सहेजी जाती है):

- **स्पष्ट रूप से चालू (`rateLimitProtection === true`)**: इस कनेक्शन के लिए रेट-लिमिट सुरक्षा स्पष्ट रूप से सक्षम है, चाहे प्रोवाइडर श्रेणी कुछ भी हो या ऑटो-एनेबल सेफ़्टी नेट चालू हो या न हो।
- **स्पष्ट रूप से बंद (`rateLimitProtection === false`)**: स्पष्ट सुरक्षा को अक्षम करता है, लेकिन किसी सक्रिय API-key कनेक्शन को वैश्विक ऑटो-एनेबल सेफ़्टी नेट से ऑप्ट-आउट **नहीं** कराता। `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) में, `false` और `undefined` समतुल्य हैं: केवल `rateLimitProtection === true` को ही स्पष्ट ओवरराइड माना जाता है। यदि `rateLimitProtection` `false` है (या सेट नहीं है), तो कोई सक्रिय API-key कनेक्शन फिर भी ऑटो-एनेबल शर्त से मेल खाता है और रेट-लिमिट संरक्षित बना रहता है।
- **प्रति-कनेक्शन ऑप्ट-आउट नहीं**: कोई ऑपरेटर वर्तमान में यह व्यक्त नहीं कर सकता कि "यह एकल सक्रिय API-key कनेक्शन रेट-लिमिट क्यू सुरक्षा के बिना चलना चाहिए", जबकि अन्य कनेक्शनों के लिए ऑटो-एनेबल सक्रिय रखा जाए। API-key कनेक्शनों को पूरी तरह से रेट-लिमिट कतारों के बिना चलाने के लिए, सेफ़्टी नेट को विश्व स्तर पर बंद करना होगा (`RATE_LIMIT_AUTO_ENABLE=false` या `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)।

**समर्थित राइट पाथ:**

- **`POST /api/rate-limits`**: किसी कनेक्शन के लिए `rateLimitProtection` टॉगल करने का समर्थित प्रबंधन राइट पाथ (`{ connectionId: string, enabled: boolean }`)। इसे `enabled: true` के साथ कॉल करने से स्पष्ट सुरक्षा चालू हो जाती है; इसे `enabled: false` के साथ कॉल करने से स्पष्ट सुरक्षा हट जाती है (हालांकि सक्रिय API-key कनेक्शन, यदि ऑटो-एनेबल चालू है, तो वैश्विक सेफ़्टी नेट के अंतर्गत कवर बने रहते हैं)।
- **`PUT /api/providers/[id]`**: जानबूझकर `rateLimitProtection` को स्वीकार या फ़्लिप **नहीं** करता (#11278)। `PUT /api/providers/[id]` के माध्यम से प्रोवाइडर कनेक्शन मेटाडेटा अपडेट करने से सहेजी गई रेट-लिमिट सुरक्षा स्थिति कभी नहीं बदलेगी।

---

## 6. स्लो-स्ट्रीम थ्रूपुट वॉचडॉग (#9709)

वैकल्पिक `resilienceSettings.streamRecovery.throughputWatchdog` गार्ड एक अपस्ट्रीम का पता लगाता है जो अभी भी टुकड़े भेज रहा है लेकिन कॉन्फ़िगर किए गए उपयोगी-आउटपुट दर के नीचे सहायक आउटपुट का उत्पादन कर रहा है। यह जानबूझकर निष्क्रिय टाइमआउट से अलग है: दिल की धड़कन और मेटाडेटा न तो टाइमर को रीसेट करते हैं और न ही प्रगति के रूप में गिने जाते हैं। यह कठिन प्रयास की समय सीमा (#9153) से भी अलग है, जो आउटपुट गुणवत्ता की परवाह किए बिना एक पूर्ण सुरक्षा सीमा बनी हुई है।

वॉचडॉग को गर्भपात करने से पहले वार्म-अप अवधि की आवश्यकता होती है, जिसके बाद पूरी तरह से रोलिंग विंडो होती है। यह चैट पूर्णताओं और प्रतिक्रियाओं API आउटपुट इवेंट (एक रूढ़िवादी UTF-8 बाइट प्रॉक्सी) से टेक्स्ट डेल्टा की गणना करता है, केवल-उपयोग और खाली घटनाओं को अनदेखा करता है, और टूल-कॉल या रीज़निंग इवेंट उड़ान के दौरान निर्णय को निलंबित कर देता है। यह डिफ़ॉल्ट रूप से अक्षम है और इसे `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` के साथ सक्षम किया जा सकता है (वह env मान केवल डिफ़ॉल्ट — सहेजे गए `resilienceSettings.streamRecovery.throughputWatchdog.enabled` बूलियन जीतता है; इस गाइड के शीर्ष पर env-बनाम-डैशबोर्ड प्राथमिकता नोट देखें); विंडो, वार्म-अप, न्यूनतम दर और न्यूनतम मापने योग्य आउटपुट सामान्य लचीलापन-सेटिंग्स सामान्यीकरण परत से बंधे हैं।

सक्षम होने पर, वॉचडॉग गर्भपात केवल सक्रिय अपस्ट्रीम प्रयास पर लागू होता है। किसी भी क्लाइंट-दृश्यमान बाइट्स से पहले, मौजूदा समान-खाता शीघ्र-पुनर्प्राप्ति पथ प्रयास को फिर से खोल सकता है। प्रतिबद्ध होने के बाद, स्ट्रीम को कभी भी आँख बंद करके दोबारा नहीं चलाया जाता है; केवल मौजूदा सुरक्षित मध्य-धारा निरंतरता अनुबंध ही प्रत्यय सिल सकता है। अंतिम रूप एकल-शॉट रहता है, इसलिए उपयोग लेखांकन और सेमाफोर रिलीज़ को दोहराया नहीं जाता है।

---

## 7. अपस्ट्रीम स्थिति का पुनर्कथन (गलत बताए गए कोटा त्रुटियाँ)

**दायरा:** एक अपस्ट्रीम गेटवे, जो अस्थायी कोटा समाप्ति की सूचना गलत HTTP स्थिति के साथ देता है।

**उद्देश्य:** वर्गीकरण से **पहले** भ्रामक स्थिति को सही करना, ताकि डाउनस्ट्रीम उपभोक्ताओं (फ़ॉलबैक इंजन, कॉम्बो एग्रीगेशन, क्लाइंट-सामना करने वाली प्रतिक्रिया) को विफलता की वास्तविक पुनःप्रयास-योग्य प्रकृति दिखाई दे।

कुछ गेटवे अस्थायी कोटा समाप्ति का संकेत गैर-पुनःप्रयास-योग्य HTTP
स्थिति के साथ देते हैं। `agentrouter.org` मानक `429` के बजाय चीनी बॉडी
(`用户额度不足` / `额度不足`) के साथ `403` (कभी-कभी `400`) लौटाता है। Claude
Code जैसे क्लाइंट `403` को स्थायी मानकर सत्र समाप्त कर देते हैं, और सुधार के
बिना फ़ॉलबैक इंजन इसे कोटा घटना के बजाय `AUTH_ERROR` के रूप में वर्गीकृत करता।

**कार्यान्वयन:**

- रजिस्ट्री + मैचर: `open-sse/config/upstreamStatusRestatement.ts` — प्रति-प्रदाता नियमों की
  सूची (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), जिसका
  मिलान `applyStatusRestatement()` के माध्यम से किया जाता है।
- कॉल साइट: `open-sse/handlers/chatCore.ts` के `providerFailure:` ब्लॉक में
  (लगभग पंक्ति 3654), ठीक उस समय जब `parseUpstreamError()` किसी अपस्ट्रीम
  प्रतिक्रिया को त्रुटि HTTP स्थिति (`!providerResponse.ok`) के साथ पार्स करता है,
  और किसी भी वर्गीकरण के चलने से पहले, ताकि प्रत्येक डाउनस्ट्रीम उपभोक्ता को
  सुधरी हुई स्थिति दिखाई दे। `200` SSE स्ट्रीम के अंदर एम्बेड की गई त्रुटियाँ
  एक अलग, बाद के स्ट्रीम-पार्सिंग पथ का अनुसरण करती हैं और आज इस हुक से
  **कवर नहीं होतीं** — यह एक ज्ञात सीमा है, जिसकी अभी आवश्यकता नहीं है क्योंकि
  agentrouter की गलत स्थिति त्रुटि HTTP स्थिति के रूप में सामने आती है।
- पुनःप्रयास पात्रता: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES` में शामिल है
  (`open-sse/services/combo/unavailableRetryGate.ts`), इसलिए पुनर्कथित त्रुटि
  निष्क्रिय `403` के रूप में सामने आने के बजाय वास्तविक पुनःप्रयास विंडो लेकर
  आती है।
- सिंथेटिक `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  केवल वही है जो पुनर्कथित प्रतिक्रिया **क्लाइंट** को बताती है; यह स्वयं
  कनेक्शन की आंतरिक कूलडाउन/लॉकआउट अवधि नहीं है — वह अलग से उस तंत्र द्वारा
  निर्धारित होती है जो वास्तव में पुनर्कथित त्रुटि को संभालता है
  (Connection Cooldown का बढ़ता बैकऑफ़, §2, API-key प्रदाताओं के लिए बेस
  `3s`; या प्रति-मॉडल-कोटा प्रदाताओं, जैसे agentrouter, के लिए Model Lockout,
  §3)। राउटर आंतरिक रूप से क्लाइंट को बताई गई 60s विंडो से पहले पुनःप्रयास
  करने के लिए पात्र हो सकता है — यह जानबूझकर रखा गया अतिरिक्त अंतर है, बग नहीं।

स्थायी त्रुटियों (`无权访问模型` — इस मॉडल तक पहुँच नहीं) को कभी भी पुनर्कथित
नहीं किया जाता: `excludeMarkers` नियम को वीटो करता है, भले ही `textMarkers`
मिल जाएँ, इसलिए त्रुटि अपनी मूल स्थिति बनाए रखती है और कोई चीज़ इसे हमेशा
पुनःप्रयास नहीं करती। संबंधित प्रदाता वर्गीकरण नियम
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, घोषित `6h` बेस कूलडाउन) को
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
सामान्य apikey-श्रेणी के `FORBIDDEN` early-return से _पहले_ देखा जाता है,
और यह `honorsRuleLockScope(provider)` (#10334 — वर्तमान में
`providerErrorRules.ts` में `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist के
माध्यम से केवल agentrouter तक सीमित) पर निर्भर है। नियम का घोषित 6h कूलडाउन
`fallbackResult.baseCooldownMs` के रूप में आगे जाता है, लेकिन यह अभी भी
पहले से मौजूद प्रति-मॉडल-कोटा लॉकआउट पथ
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, जिसमें #10334 ने कूलडाउन स्रोत के अलावा कोई
परिवर्तन नहीं किया) को ही इनपुट देता है: इसे ऑपरेटर की
`mlSettings.maxCooldownMs` (डिफ़ॉल्ट `1_800_000ms` / 30min) तक सीमित किया
जाता है, जैसा कि हर अन्य मॉडल लॉकआउट के साथ होता है, और _संग्रहीत लॉकआउट
कारण_ पहले से हार्डकोड किए गए `"forbidden"` पर ही रहता है, नियम के
`"auth_error"` पर नहीं — अंत तक केवल कूलडाउन अवधि का सम्मान किया जाता है,
कारण स्ट्रिंग का नहीं। कनेक्शन स्वयं सक्रिय रहता है; उसी कनेक्शन पर मौजूद
सहोदर मॉडल प्रभावित नहीं होते।

पुनर्कथित कोटा त्रुटियाँ (`额度不足`) उत्पादन में एक प्रदाता नियम तक पहुँचती हैं
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, अपना कोई घोषित कूलडाउन नहीं — persistence layer का स्केल किया
हुआ डिफ़ॉल्ट बैकऑफ़ लागू होता है)। #10334 के बाद से,
`ProviderErrorRuleMatch` पर `scope` का अंत-से-अंत उपयोग किया जाता है, लेकिन
**केवल** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist में मौजूद प्रदाताओं के
लिए (`providerErrorRules.ts` — आज केवल `"agentrouter"`, जिसे
`honorsRuleLockScope()` के माध्यम से नियंत्रित किया जाता है)। प्रत्येक अन्य
प्रदाता के लिए `scope` सूचनात्मक ही रहता है, ठीक #10334 से पहले की तरह।
`checkFallbackError` मिलान किए गए नियम के scope को
`fallbackResult.ruleScope` के रूप में सामने लाता है;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) साझा गार्ड है, जो पुष्टि करता है कि
`ruleScope` को वास्तव में कनेक्शन-व्यापी, स्वयं-पुनर्प्राप्त होने वाले संकेत के
रूप में सुरक्षित रूप से सम्मानित किया जा सकता है (scope `"connection"`,
कारण `quota_exhausted`, कभी भी `permanent` नहीं, कभी भी `creditsExhausted`
नहीं — यह भविष्य में scope `"connection"` को स्थायी अकाउंट स्थिति के साथ
जोड़े जाने से बचाव है)। दो उपभोक्ता इसका उपयोग करते हैं:

- **स्थायित्व** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider के **प्रति-मॉडल** लॉकआउट
  ब्रांच में जाने के बजाय (agentrouter में `passthroughModels: true` है → `hasPerModelQuota()`
  `true` लौटाता है), यह एक **अस्थायी कनेक्शन कूलडाउन** लागू करता है —
  `testStatus: "unavailable"` + `rateLimitedUntil`, कभी भी कोई टर्मिनल स्थिति
  (`credits_exhausted`/`banned`/`expired`) नहीं — ताकि कूलडाउन समाप्त होते ही
  कनेक्शन स्वयं पुनर्प्राप्त हो जाए और मैन्युअल क्रेडेंशियल रीसेट की आवश्यकता न पड़े।
  `disableCooling: true` वाले कनेक्शनों के लिए इसे छोड़ दिया जाता है (#2997):
  यह ऑप्ट-आउट इसके बजाय प्रति-मॉडल लॉकआउट में जाता है (एक दस्तावेजीकृत समझौता —
  ब्रांच के ऊपर दिए गए कोड कमेंट को देखें)।
- **उसी अनुरोध में कॉम्बो रूटिंग** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): वही गार्ड कनेक्शन को
  मेमोरी में मौजूद `exhaustedConnections` सेट में `${provider}:${connectionId}` कुंजी के
  साथ चिह्नित करता है। यह केवल ऐसे शेष SAME-REQUEST लक्ष्य को छोड़ता है, जो
  _अपने लक्ष्य ऑब्जेक्ट पर स्वयं वही सटीक `connectionId` रखता हो_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` `exhaustedConnections` लुकअप से पहले) — एक सामान्य
  मॉडल-लिस्ट कॉम्बो, जिसमें सहोदर लक्ष्यों के अपने `connectionId` पिन नहीं होते
  और प्रत्येक को डिस्पैच के समय प्रतिक्रिया के
  `X-OmniRoute-Selected-Connection-Id` हेडर से ही हल किया जाता है, इस कुंजी मिलान
  तक कभी नहीं पहुँचता। इस सामान्य स्थिति में, शेष लेग को अभी-अभी समाप्त हुए खाते
  का पुनः उपयोग करने से रोकने वाली वास्तविक सुरक्षा यह Set नहीं है — बल्कि ऊपर की
  स्थायित्व परत है (कनेक्शन का `rateLimitedUntil` अब भविष्य में है), और इसके साथ
  यही गार्ड विफलता के लिए `transientRateLimitedProviders` को दबाता है (देखें
  "दो-चरणीय डिज़ाइन" और `targetExhaustion.ts` में
  `isAgentrouterConnectionQuotaScope` ब्रांच पर दिया गया कोड कमेंट): Set को
  बिना चिह्नित छोड़ने पर, `combo.ts` का
  `allowRateLimitedConnection` फ़ोर्स-अलाउ
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) प्रदाता के शेष लेगों के
  लिए सक्रिय नहीं होता, इसलिए क्रेडेंशियल चयन का `rateLimitedUntil`
  फ़िल्टर (`src/sse/services/auth.ts:1238`) सामान्य रूप से लागू होता है और
  शेष लेग या तो कोई दूसरा, अभी भी योग्य agentrouter कनेक्शन चुनता है या
  उपलब्ध क्रेडेंशियल न होने पर विफल होता है — यह इस ब्रांच द्वारा अभी कूलडाउन में
  डाले गए कनेक्शन पर वापस जाने के लिए ज़बरदस्ती नहीं करता।

### दो-चरणीय डिज़ाइन: स्थिति का पुनर्कथन, फिर वर्गीकरण

स्थिति का पुनर्कथन (`upstreamStatusRestatement.ts`) और प्रदाता
वर्गीकरण नियम (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) अलग-अलग रजिस्ट्रियाँ हैं, जो दोनों प्रदाता आईडी
और टेक्स्ट मार्करों पर आधारित हैं, लेकिन अलग-अलग स्थानों पर चलते हैं और
अलग-अलग उद्देश्यों की पूर्ति करते हैं: पुनर्कथन `chatCore.ts` में HTTP स्थिति को
आरंभ में पुनर्लिखता है; वर्गीकरण नियम `checkFallbackError()` के अंदर
फ़ॉलबैक `reason` चुनते हैं और `scope`
(`model` / `provider` / `connection`) लॉक करते हैं
(`open-sse/services/accountFallback.ts`)।

वर्गीकरण नियम केवल उन प्रदाताओं के लिए पूर्ण त्रुटि **टेक्स्ट** देखते हैं
(बॉडी मार्कर जैसे `额度不足` से मिलान करने के लिए आवश्यक), जो
`providerErrorRules.ts` में `FULL_TEXT_RULE_PROVIDERS` की अनुमति-सूची में
दिए गए हैं — वर्तमान में केवल `"agentrouter"`। हर दूसरे **बिल्ट-इन कैटलॉग**
प्रदाता के लिए, `checkFallbackError`, `getProviderErrorRuleMatch` को केवल
संरचित त्रुटि (`{code, type}`) देता है, जो हेडर/स्थिति/कोड-आधारित नियमों के लिए
पर्याप्त है, लेकिन बॉडी-टेक्स्ट मार्करों को नहीं देख सकता।
सहायक `resolveRuleMatchBody()` यह चयन करता है: अनुमति-सूची वाले प्रदाताओं के लिए
पूर्ण त्रुटि टेक्स्ट, और अन्य प्रदाताओं के लिए संरचित त्रुटि। किसी
**बिल्ट-इन** प्रदाता को `FULL_TEXT_RULE_PROVIDERS` में जोड़ना एक स्पष्ट
प्रति-प्रदाता ऑप्ट-इन है — इसका उद्देश्य यह सुनिश्चित करना है कि सूची में
न होने वाले प्रत्येक प्रदाता का डिफ़ॉल्ट पथ बाइट-प्रति-बाइट अपरिवर्तित रहे।

किसी नियम का `scope` (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS` से अलग एक ऑप्ट-इन है:
`checkFallbackError` इसे केवल `fallbackResult.ruleScope` के रूप में सामने लाता है,
और डाउनस्ट्रीम उपभोक्ता इसे सूचनात्मक लेबल के अलावा किसी अन्य रूप में केवल
उसी फ़ाइल में मौजूद `HONORS_RULE_LOCK_SCOPE_PROVIDERS` की अनुमति-सूची में
शामिल प्रदाताओं के लिए मानते हैं (`honorsRuleLockScope()` के माध्यम से नियंत्रित —
आज केवल `"agentrouter"`)। प्रदाता के उस अनुमति-सूची में शामिल होने के बाद
`scope: "connection"` मिलान वास्तव में क्या करता है, इसके लिए ऊपर
"पुनर्कथित कोटा त्रुटियाँ" देखें।

**#11104 — ऑपरेटर द्वारा घोषित नियम दोनों अनुमति-सूचियों को बायपास करते हैं।**
ऑपरेटर `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) के
माध्यम से रनटाइम पर प्रति-प्रदाता नियम घोषित कर सकता है, इस फ़ाइल को संपादित
किए बिना। किसी ऑपरेटर नियम को `FULL_TEXT_RULE_PROVIDERS`/
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` के पीछे नियंत्रित करना — जो अनुमति-सूचियाँ
**डिफ़ॉल्ट** बिल्ट-इन कैटलॉग नियमों की सुरक्षा के लिए हैं — सेटिंग्स तंत्र को
पहले से सूचीबद्ध प्रदाताओं के अलावा हर प्रदाता के लिए निष्क्रिय कर देगा, क्योंकि
नियम घोषित करना अपने-आप में ऑपरेटर का स्पष्ट ऑप्ट-इन है।
`resolveRuleMatchBody()` और `honorsRuleLockScope()` दोनों पहले
`hasOperatorRuleForProvider()` की जाँच करते हैं: ऑपरेटर नियम वाले प्रदाता को
कच्चा त्रुटि टेक्स्ट मिलता है और उसका घोषित `scope` मान्य किया जाता है, चाहे वह
किसी भी अनुमति-सूची में शामिल हो या नहीं।

**ऑपरेटर द्वारा घोषित नियम** (`OperatorProviderErrorRule`): प्रत्येक नियम में
एक वैकल्पिक `status` और एक वैकल्पिक `match` होता है (`match` त्रुटि टेक्स्ट का
साधारण, केस-असंवेदी सबस्ट्रिंग है, कभी भी RegExp नहीं, इसलिए यह ReDoS उत्पन्न
नहीं कर सकता), और दोनों में से कम-से-कम एक सेट होना चाहिए। दोनों सेट होने पर
उनका AND किया जाता है; छोड़ा गया फ़ील्ड किसी भी मान से मिलान करता है, इसलिए
`{match: "insufficient_quota"}` उस कोड वाली किसी भी स्थिति से मेल खाता है।
पहला मिलान करने वाला नियम प्रभावी होता है। `cooldownMs` अधिकतम 30 दिनों तक
स्वीकार करता है; कुल मिलाकर अधिकतम 50 नियम।

**सभी के लिए लागू डिफ़ॉल्ट** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` के माध्यम से सेट): `{[provider]: {cooldownMs, scope?, reason?}}`
जहाँ `cooldownMs` 1 मिनट से 30 दिनों तक हो सकता है। डिफ़ॉल्ट केवल तब लागू होता है जब कोई ऑपरेटर नियम और कोई अंतर्निहित कैटलॉग नियम मेल न खाया हो, और केवल 402, 403, 408,
429 तथा 5xx त्रुटियों पर लागू होता है। अनुरोध-आकार से संबंधित त्रुटियाँ (400, 404, 409, 413, 422) और बिना किसी अतिरिक्त जानकारी वाले
401 अपने मौजूदा हैंडलिंग को बनाए रखते हैं। स्पष्ट `reason` न होने पर, कारण स्टेटस से लिया जाता है, उसी तरह जैसे
`classifyError` करता है। डिफ़ॉल्ट घोषित करना `hasOperatorRuleForProvider()` के लिए ऑपरेटर नियम के समान माना जाता है, इसलिए उसका
`scope` (डिफ़ॉल्ट `"connection"`) लागू होता है। डिफ़ॉल्ट का प्रभावी कूलडाउन उसके `cooldownMs` और प्रदाता के अपने retry hint
(`Retry-After`, `x-ratelimit-reset` या बॉडी में मौजूद reset hint — वही hint जिसे इंजन तब मानता है जब connection-cooldown सेटिंग
"upstream retry hints का उपयोग करें" चालू हो) में से अधिक लंबा होगा। इसलिए डिफ़ॉल्ट छोटे upstream hint को बढ़ा सकता है, लेकिन वास्तविक reset को
कभी छोटा नहीं कर सकता। स्पष्ट ऑपरेटर नियम अपने सटीक `cooldownMs` को बनाए रखता है। न तो कोई नियम और न ही कोई डिफ़ॉल्ट
`markAccountUnavailable` में मौजूद connection-cooldown guards को दरकिनार करता है: सक्रिय, अधिक लंबा कूलडाउन कभी छोटा नहीं किया जाता और terminal status को कभी ओवरराइट नहीं किया जाता। `checkFallbackError` में पहले चलने वाले अंतर्निहित text detectors (credits exhausted, daily quota, account deactivated) अपने संबंधित वाक्यांशों के लिए अब भी प्राथमिकता रखते हैं।

**ज्ञात कमी — `providerRuleRegistry` को HTTP 400 के लिए कभी परामर्श नहीं किया जाता।**
`checkFallbackError` की `BAD_REQUEST` branch status 400 को पूरी तरह अपने pattern arrays
(`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, आदि `accountFallback.ts` में) के माध्यम से classify करती है और ऊपर मौजूद
`configuredRule`/`getProviderErrorRuleMatch` branch तक पहुँचने से पहले ही लौट जाती है।
`status: 400` वाला अंतर्निहित कैटलॉग नियम (या ऑपरेटर नियम) syntactically valid है, लेकिन कभी सक्रिय नहीं होगा।
आज कोई मौजूदा नियम 400 को लक्षित नहीं करता, इसलिए production में कुछ प्रभावित नहीं होता — लेकिन भविष्य के 400 नियम के लिए
पहले इस branch को बदलना होगा। यह केवल कोई नियम जोड़ने से बड़ा बदलाव है (क्योंकि इससे उन सभी providers के लिए 400 का पुनर्वर्गीकरण होगा
जो पहले से pattern-array behavior पर निर्भर हैं) और एकल-provider नियम जोड़ने के दायरे से बाहर है।

### नया quota-misstating gateway जोड़ना

1. `statusRestatementRegistry` में एक rule array पंजीकृत करें
   (`open-sse/config/upstreamStatusRestatement.ts`)। `textMarkers`
   को provider-specific रखें; कभी भी ऐसे generic English phrases का पुनः उपयोग न करें जो
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) से टकराते हों।
2. सही lock scope चुनने के लिए वैकल्पिक रूप से
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) में classification rules पंजीकृत करें
   (account-wide quota के लिए `connection`, per-model errors के लिए `model`)। यह चरण production में केवल उन
   providers के लिए प्रभावी होता है जिनके नियमों को पूरा error text (body markers) चाहिए: उसी फ़ाइल में
   provider id को `FULL_TEXT_RULE_PROVIDERS` में जोड़ें — अन्यथा `checkFallbackError` नियम को केवल structured
   `{code, type}` error देता है और body-text rule live traffic से कभी मेल नहीं खाएगा।
   केवल `status`/`headers` पर मेल खाने वाले नियमों (जैसे Opencode या Minimax के नियमों) को इस opt-in की आवश्यकता नहीं है।
   अलग से, यदि नियम `scope: "connection"` घोषित करता है और उद्देश्य वास्तविक connection-wide cooldown के साथ same-request combo skip
   है (न कि केवल informational label), तो उसी फ़ाइल में provider id को `HONORS_RULE_LOCK_SCOPE_PROVIDERS` में जोड़ें —
   यही `markAccountUnavailable()` (`src/sse/services/auth.ts`) में
   `isAgentrouterConnectionQuotaScope()`-style consumption और
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) को नियंत्रित करता है; इसके बिना `scope`
   `fallbackResult.ruleScope` के माध्यम से आगे तो जाता है, लेकिन उस पर कोई कार्रवाई नहीं होती।
3. `tests/unit/upstream-status-restatement.test.ts`
   और `tests/unit/agentrouter-error-rules.test.ts` के अनुरूप unit tests जोड़ें (इनमें
   not-permanent / not-creditsExhausted guards भी शामिल हों, और — यदि provider को allowlist की आवश्यकता हो —
   यह assert करने वाला test भी हो कि `resolveRuleMatchBody()` केवल उस provider के लिए पूरा text लौटाता है)।

`chatCore.ts`, `classifyError` या combo में किसी बदलाव की आवश्यकता नहीं है।

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) में शामिल providers को IP-bucketed upstream के रूप में माना जाता है
(opencode free tier account-bucketed नहीं, बल्कि IP-bucketed है — #9611 देखें): status-429 को
`quota_exhausted`
**या** `rate_limit_exceeded` के रूप में classify किए जाने पर, rotation द्वारा उन्हें आज़माने से पहले
हर उस allowlisted-family connection को cooldown किया जाता है
जिसका अंतिम ज्ञात egress IP विफल connection के IP से मेल खाता है
— इस तरह N-1 ऐसे upstream calls से बचा जाता है जो निश्चित रूप से विफल होंगे ( #10460/#10525 जैसा ही स्वरूप)।
`rate_limit_exceeded` को जानबूझकर शामिल किया गया है: `markAccountUnavailable` path पर opencode-specific rules कभी मेल नहीं खाते
(`checkFallbackError` को कोई headers/body नहीं दिया जाता, opencode `FULL_TEXT_RULE_PROVIDERS` में नहीं है), इसलिए
जिस 429 की body में subscription-quota text ("monthly usage limit reached") होता है, उसे
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) द्वारा
`quota_exhausted` के रूप में classify किया जाता है, और `status_429` rule तक पहुँचने से पहले ही — जबकि quota-text-विहीन 429
(plain rate limiting) `status_429` rule के माध्यम से `rate_limit_exceeded` के रूप में classify होता है और फिर भी IP family को cooldown करता है। Allowlisted provider के लिए IP-bucketed rate limit exhausted quota के समान ही signal है। ईमानदार सीमाएँ:

- **सर्वोत्तम-प्रयास**: लॉक `proxy_logs` से कनेक्शन के अंतिम ज्ञात `egress_ip`
  को हल करता है (24 घंटे की विंडो, सिंक्रोनस, बिना कैश)। कोल्ड कैश (`egress`
  IP की कभी जाँच नहीं हुई) या कोई पंक्ति न मिलने पर → विफल कनेक्शन को शाखा द्वारा
  फिर भी कूल किया जाता है (आज की तरह रिकॉर्ड किया जाता है), केवल किसी सिब्लिंग पर
  लॉक नहीं लगाया जाता।
- **कभी टर्मिनल नहीं**: कूलडाउन एक नवीनीकृत कोटा विंडो है
  (`testStatus: "unavailable"`); IP-स्तरीय सिग्नल से कभी स्थायी स्थिति व्युत्पन्न
  नहीं की जाती। `disableCooling` कनेक्शन इस शाखा को पूरी तरह छोड़ देते हैं।
- **अनुमत परिवार के लिए लॉक की ग्रैन्युलैरिटी बदलती है**: यह केवल सिब्लिंग
  ऑप्टिमाइज़ेशन नहीं, बल्कि स्कोप में बदलाव है। opencode एक `passthroughModels`
  प्रदाता है, इसलिए इस शाखा से पहले 429 प्रति-MODEL लॉकआउट उत्पन्न करता था; अब
  यह कनेक्शन कूलडाउन उत्पन्न करता है — यहाँ तक कि ऐसे ऑपरेटर के लिए भी जो बिना
  किसी सिब्लिंग के केवल एक कनेक्शन चला रहा हो। यही वह ग्रैन्युलैरिटी है जिसे
  opencode नियम तालिका पहले से सही घोषित करती है (`scope: "connection"`,
  `providerErrorRules.ts`), लेकिन अब तक इसे लागू नहीं किया गया था क्योंकि
  opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` में नहीं है। शाखा विफल
  कनेक्शन का कूलडाउन + `backoffLevel` स्वयं लिखती है, कनेक्शन-स्कोप वाली
  agentrouter शाखा की तरह, और लौट आती है — प्रति-मॉडल ब्लॉक तथा नीचे का
  सामान्य पथ कभी नहीं पहुँचते।
- **कॉम्बो शामिल है**: agentrouter शाखा की तरह, स्कोप जानबूझकर उस
  `persistUnavailableState`/`isCombo` डाउनग्रेड को अनदेखा करता है जिसे कॉम्बो
  कॉलर 429 पर लागू करता है। प्रति-मॉडल लॉकआउट इस स्कोप का कमजोर रूप नहीं है,
  बल्कि गलत इकाई है: वह समाप्त हो चुके IP के बारे में कुछ नहीं बताता, इसलिए
  कॉम्बो रोटेशन प्रत्येक सिब्लिंग के लिए एक निश्चित रूप से विफल कॉल करता रहेगा।
- **सिब्लिंग सुरक्षा**: जो सिब्लिंग पहले से टर्मिनल (banned/credits_exhausted)
  स्थिति में है या पहले से लंबे कूलडाउन में है, उसे कभी ओवरराइट नहीं किया जाता।
- **विशिष्ट अनुमति-सूची**: `EGRESS_BUCKETED_LOCK_PROVIDERS` को विस्तृत करना
  एक स्पष्ट स्वामी का निर्णय है; कोई सामान्य वायरिंग नहीं (पैटर्न
  #10334/#10419)। सिब्लिंग क्वेरी उसी अनुमति-सूची को बाइंड करती है, उसे SQL
  लिटरल के रूप में दोहराती नहीं, इसलिए इसे विस्तृत करना एक-पंक्ति का बदलाव बना
  रहता है।
- **दोनों दिशाओं में एग्रेस IP रोटेशन**: लुकअप विंडो (24 घंटे), एग्रेस-IP कैश
  TTL (5 मिनट) से काफी बड़ी है, इसलिए "अंतिम ज्ञात IP" इतिहास है, वर्तमान स्थिति
  नहीं। यदि किसी कनेक्शन का प्रॉक्सी विंडो के भीतर रोटेट हुआ हो, तो लॉक किसी
  वास्तव में साझा IP को **चूक** सकता है (रिकॉर्ड किया गया IP नया और अभी समाप्त
  न हुआ हो) — और सममित रूप से यह ऐसे सिब्लिंग को **कूल** कर सकता है जो तब से
  समाप्त IP से रोटेट होकर दूर जा चुका हो। दूसरे मामले में उस सिब्लिंग को एक
  कूलडाउन विंडो का नुकसान होता है; दोनों इतिहास-आधारित लुकअप की स्वीकार्य
  सर्वोत्तम-प्रयास सीमाएँ हैं।
- **लागत**: `proxy_logs` के दो सीमित स्कैन (विंडो-फ़िल्टर किए गए,
  `idx_pl_timestamp` के माध्यम से), केवल 429 की आवृत्ति पर। कोई नया इंडेक्स नहीं
  (माइग्रेशन 134 YAGNI)। वास्तविक ट्रैफ़िक वाले मध्यम आकार के DB कॉपी पर मापा
  गया; उच्च-थ्रूपुट इंस्टेंस उसी विंडो में अनुपातिक रूप से अधिक पंक्तियाँ रखता है।

## अन्य रेज़िलिएन्स सुविधाएँ

- **20 रूटिंग रणनीतियाँ** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — देखें [AUTO-COMBO.md](../routing/AUTO-COMBO.md)।
- **रीसेट-अवेयर रूटिंग** (v3.8.0) — कोटा रीसेट समय के अनुसार कनेक्शनों को प्राथमिकता देता है।
- **बैकग्राउंड मोड डिग्रेडेशन** — Responses API का `background: true` चेतावनी के साथ सिंक मोड में डिग्रेड कर दिया जाता है।
- **डायनामिक टूल लिमिट डिटेक्शन** — टूल संख्या सीमा पूरी होने पर प्रोवाइडर को बैक-ऑफ करता है।
- **इमरजेंसी फ़ॉलबैक** — `OMNIROUTE_EMERGENCY_FALLBACK` द्वारा नियंत्रित; ऑपरेटर इसे बिना रीस्टार्ट किए Feature Flags पेज से ओवरराइड कर सकते हैं।

---

## डिबगिंग

- Weighted combo `503 all_targets_cooling_down` लौटाता है (`Retry-After` सेट, `diagnostics.excluded` हर टारगेट को `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` के साथ सूचीबद्ध करता है) → पूल कॉन्फ़िगर और कनेक्टेड है, हर टारगेट बस किसी रेज़िलिएन्स टाइमर द्वारा बाहर किया गया है; `[COMBO] Weighted selection: every target excluded before dispatch — …` चेतावनी कारणों और शेष सेकंडों को बताती है। उसी combo से `404 no_executable_targets` का मतलब है कि कोई रेज़िलिएन्स टाइमर शामिल नहीं था (चलाने के लिए कुछ नहीं, या हर अकाउंट उपलब्धता जाँच में विफल रहा)। यह `targetResolution.ts` में एकत्रित exclusions से `open-sse/services/combo/pinRecovery.ts` में बनाया गया है।
- किसी प्रोवाइडर की सभी keys स्किप हो जाएँ → सर्किट ब्रेकर स्थिति और प्रत्येक कनेक्शन की `rateLimitedUntil`/`testStatus` दोनों जाँचें।
- रीसेट विंडो के बाद भी प्रोवाइडर स्थायी रूप से बाहर रहे → कोड `getStatus()`/`canExecute()` के बजाय कच्चा `state` पढ़ रहा है।
- एक key विफल हो, बाकी काम करें → सर्किट ब्रेकर के बजाय कनेक्शन कूलडाउन को प्राथमिकता दें।
- केवल एक मॉडल विफल हो → कनेक्शन कूलडाउन के बजाय मॉडल लॉकआउट को प्राथमिकता दें।
- स्थिति को स्वयं ठीक हो जानी चाहिए लेकिन नहीं होती → भविष्य का टाइमस्टैम्प और expired स्थिति को रिफ्रेश करने वाला read path जाँचें। स्थायी स्थितियों के लिए मैन्युअल बदलाव आवश्यक हैं।

---

## रनटाइम स्थिति — एजेंट त्वरित संदर्भ

> `AGENTS.md` → "Resilience Runtime State" (PR #12743) से यथावत स्थानांतरित, ताकि एजेंट
> गाइड 40k कॉन्टेक्स्ट बजट के अंदर रहे। यह ऊपर के सेक्शनों का संक्षिप्त, एजेंट-उन्मुख
> दृश्य है; क्रमांकित सेक्शन ही पूर्ण संदर्भ बने रहते हैं।

OmniRoute में तीन परस्पर संबंधित लेकिन अलग-अलग अस्थायी-विफलता तंत्र हैं। रूटिंग व्यवहार
डिबग करते समय इनके दायरे को अलग रखें। एक नज़र में समझने के लिए
[3-लेयर रेज़िलिएन्स डायग्राम](../diagrams/exported/resilience-3layers.svg)
(स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)) देखें।

### प्रोवाइडर सर्किट ब्रेकर

**दायरा**: पूरा प्रोवाइडर, जैसे `glm`, `openai`, `anthropic`।

**उद्देश्य**: उस प्रोवाइडर को ट्रैफ़िक भेजना रोकना जो अपस्ट्रीम/सेवा स्तर पर बार-बार
विफल हो रहा है, ताकि एक अस्वस्थ प्रोवाइडर हर अनुरोध को धीमा न कर दे।

**कार्यान्वयन**:

- कोर क्लास: `src/shared/utils/circuitBreaker.ts`
- चैट गेट/एक्ज़ीक्यूशन वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- रनटाइम स्थिति API: `src/app/api/monitoring/health/route.ts`
- साझा रैपर: `open-sse/services/accountFallback.ts`
- स्थायी स्थिति तालिका: `domain_circuit_breakers`

**स्थितियाँ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: सामान्य ट्रैफ़िक की अनुमति है।
- `DEGRADED`: प्रारंभिक चेतावनी क्षेत्र — विफलताएँ डिग्रेडेशन थ्रेशोल्ड पार कर चुकी हैं
  लेकिन अभी ब्रेकर थ्रेशोल्ड नहीं; ट्रैफ़िक अभी भी बहता है, डैशबोर्ड चेतावनी दिखाते हैं।
  एक मान्य कनेक्शन परीक्षण या बिना नई विफलता की शांत विंडो इसे वापस `CLOSED` पर ला देती है
  (`docs/architecture/RESILIENCE_GUIDE.md` में विंडो दी गई है)।
- `OPEN`: प्रोवाइडर अस्थायी रूप से ब्लॉक है; कॉलर को provider-circuit-open प्रतिक्रिया
  मिलती है या कॉम्बो रूटिंग किसी दूसरे टारगेट पर चली जाती है।
- `HALF_OPEN`: रीसेट टाइमआउट बीत चुका है; एक probe अनुरोध की अनुमति दें। सफलता ब्रेकर को
  बंद कर देती है, विफलता इसे फिर से खोल देती है।

**डिफ़ॉल्ट** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, जिसे
`src/lib/resilience/settings.ts` में `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` के माध्यम से →
`src/sse/handlers/chatHelpers.ts` में `getCircuitBreaker(provider, …)` उपभोग करता है)। पूरे-प्रोवाइडर
ब्रेकर `circuitBreakerThreshold` / `circuitBreakerReset` पर चलता है:

| प्रोफ़ाइल | डिग्रेड होता है | खुलता है (`circuitBreakerThreshold`) | रीसेट (`circuitBreakerReset`) |
| --------- | --------------: | -----------------------------------: | ----------------------------: |
| OAuth     |             `5` |                                  `8` |                         `60s` |
| API key   |             `7` |                                 `12` |                         `30s` |
| Local     |    (व्युत्पन्न) |                                  `2` |                         `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 मिनट) और `providerCooldownMs` (5/10/1 मिनट) भी परिभाषित करता है:
ये **opt-in ग्लोबल Provider Cooldown के विंडो गेट** को चलाते हैं (`PROVIDER_COOLDOWN_ENABLED`,
डिफ़ॉल्ट रूप से बंद) — `open-sse/services/providerCooldownTracker.ts` में कोई प्रोवाइडर-स्तरीय एंट्री
तभी कूलिंग मानी जाती है जब `providerFailureWindowMs` के भीतर `providerFailureThreshold` विफलताएँ
हों, और फिर वह `providerCooldownMs` के लिए कूल होती है। ये लाइव ब्रेकर के थ्रेशोल्ड नहीं हैं —
इन्हें ब्रेकर व्यवहार की अपेक्षा करते हुए ट्यून न करें। हर डिफ़ॉल्ट को
`OMNIROUTE_PROVIDER_BREAKER_*` और `OMNIROUTE_CIRCUIT_BREAKER_*` env vars से ओवरराइड किया जा सकता है;
रनटाइम-सटीक संदर्भ तालिका `docs/architecture/RESILIENCE_GUIDE.md` में है।

केवल प्रोवाइडर-स्तरीय विफलता स्थितियाँ ही प्रोवाइडर ब्रेकर को ट्रिप करनी चाहिए:

```ts
(408, 500, 502, 503, 504);
```

सामान्य अकाउंट/key/मॉडल त्रुटियों — जैसे अधिकांश `401`, `403`, या `429` मामले — के लिए
पूरे-प्रोवाइडर ब्रेकर को ट्रिप न करें। वे आमतौर पर कनेक्शन कूलडाउन या मॉडल लॉकआउट से
संबंधित होते हैं। किसी सामान्य API-key प्रोवाइडर की `403` तब तक रिकवरेबल होनी चाहिए
जब तक उसे टर्मिनल प्रोवाइडर/अकाउंट त्रुटि के रूप में वर्गीकृत न किया जाए।

ब्रेकर बैकग्राउंड टाइमर के बजाय lazy recovery का उपयोग करता है। जब `OPEN` की अवधि समाप्त हो जाती है, तो `getStatus()`, `canExecute()` और `getRetryAfterMs()` जैसे रीड ऑपरेशन स्टेट को `HALF_OPEN` में रिफ्रेश कर देते हैं, जिससे डैशबोर्ड और कॉम्बो कैंडिडेट बिल्डर किसी समाप्त हो चुके प्रोवाइडर को हमेशा के लिए बाहर नहीं रखते।

### कनेक्शन कूलडाउन

**दायरा**: एक प्रोवाइडर कनेक्शन/अकाउंट/की।

**उद्देश्य**: एक खराब की/अकाउंट को अस्थायी रूप से स्किप करना, जबकि उसी प्रोवाइडर के अन्य कनेक्शन अनुरोधों को संभालते रहें।

**कार्यान्वयन**:

- लिखने/अपडेट करने का पथ: `src/sse/services/auth.ts::markAccountUnavailable()`
- अकाउंट चयन/फ़िल्टरिंग: `src/sse/services/auth.ts::getProviderCredentials...`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्स: `src/lib/resilience/settings.ts`

प्रोवाइडर कनेक्शन पर महत्वपूर्ण फ़ील्ड:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

अकाउंट चयन के दौरान, एक कनेक्शन को तब तक स्किप किया जाता है जब तक:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

कूलडाउन भी lazy होते हैं: जब `rateLimitedUntil` बीते समय में हो जाता है, तो कनेक्शन फिर से योग्य बन जाता है। सफल उपयोग पर, `clearAccountError()` `testStatus`, `rateLimitedUntil`, एरर फ़ील्ड और `backoffLevel` को साफ़ कर देता है।

डिफ़ॉल्ट कनेक्शन कूलडाउन व्यवहार:

- OAuth बेस कूलडाउन: `5s`।
- API-key बेस कूलडाउन: `3s`।
- API-key `429` के लिए, उपलब्ध होने पर अपस्ट्रीम रिट्राई संकेतों (`Retry-After`, रीसेट हेडर, या पार्स किए जा सकने वाले रीसेट टेक्स्ट) को प्राथमिकता दी जानी चाहिए।
- बार-बार होने वाली रिकवरेबल विफलताओं के लिए एक्सपोनेंशियल बैकऑफ़ का उपयोग होता है:

```ts
baseCooldownMs * 2 ** failureIndex;
```

एंटी-थंडरिंग-हर्ड गार्ड एक ही कनेक्शन पर समवर्ती विफलताओं को कूलडाउन को बार-बार बढ़ाने या `backoffLevel` को दोगुना इंक्रीमेंट करने से रोकता है।

टर्मिनल स्टेट कूलडाउन नहीं होते। `banned`, `expired` (जो केवल `EXPIRED_RETRY_MAX` के माध्यम से N सीमित रिट्राई के बाद टर्मिनल बनता है), और `credits_exhausted` तब तक अनुपलब्ध रहने के लिए होते हैं जब तक क्रेडेंशियल/सेटिंग्स न बदलें या कोई ऑपरेटर उन्हें रीसेट न करे। टर्मिनल स्टेट को ट्रांज़िएंट कूलडाउन स्टेट से ओवरराइट न करें।

### मॉडल लॉकआउट

**दायरा**: प्रोवाइडर + कनेक्शन + मॉडल।

**उद्देश्य**: जब किसी कनेक्शन के लिए केवल एक मॉडल अनुपलब्ध या कोटा-सीमित हो, तो पूरे कनेक्शन को अक्षम करने से बचना।

उदाहरण:

- प्रति-मॉडल कोटा वाले प्रोवाइडर जो `429` लौटाते हैं।
- लोकल प्रोवाइडर जो किसी गायब मॉडल के लिए `404` लौटाते हैं।
- प्रोवाइडर-विशिष्ट मोड/मॉडल अनुमति विफलताएँ, जैसे चयनित Grok मोड।

मॉडल लॉकआउट `open-sse/services/accountFallback.ts` में रहता है और उसी कनेक्शन को अन्य मॉडलों की सेवा जारी रखने देता है।

### डिबगिंग दिशानिर्देश

- यदि किसी प्रोवाइडर की सभी की स्किप हो रही हैं, तो प्रोवाइडर ब्रेकर स्टेट और प्रत्येक कनेक्शन के `rateLimitedUntil`/`testStatus` दोनों की जाँच करें।
- यदि रीसेट विंडो के बाद भी कोई प्रोवाइडर स्थायी रूप से बाहर दिखता है, तो जाँचें कि कहीं कोड `getStatus()`/`canExecute()` का उपयोग करने के बजाय कच्चा `state` तो नहीं पढ़ रहा।
- यदि किसी प्रोवाइडर की एक की विफल होती है लेकिन अन्य को काम करना चाहिए, तो प्रोवाइडर ब्रेकर के बजाय कनेक्शन कूलडाउन को प्राथमिकता दें।
- यदि केवल एक मॉडल विफल होता है, तो कनेक्शन कूलडाउन के बजाय मॉडल लॉकआउट को प्राथमिकता दें।
- यदि किसी स्टेट को स्वयं रिकवर होना चाहिए, तो उसमें भविष्य का टाइमस्टैम्प/रीसेट टाइमआउट और एक ऐसा रीड पथ होना चाहिए जो समाप्त हुई स्टेट को रिफ्रेश करे। स्थायी स्टेटस के लिए मैनुअल क्रेडेंशियल या कॉन्फ़िग परिवर्तन आवश्यक होते हैं।

---

## TLS फ़िंगरप्रिंटिंग और स्टील्थ

प्रोवाइडर-विशिष्ट स्टील्थ (JA3/JA4, CCH, ऑब्फस्केशन) अलग से दस्तावेज़ित है — `docs/security/STEALTH_GUIDE.md` देखें (git; `/docs` में कंपाइल नहीं किया गया)।

---

## रेज़िलियंस परीक्षण (Phase 8 · Block C)

रेज़िलियंस लॉजिक के यूनिट टेस्टों के अलावा, तीन टेस्ट वास्तविक स्ट्रेस/विफलता
परिस्थितियों में रनटाइम का प्रयोग करते हैं (सभी इंटीग्रेशन/नाइटली — कोई भी PR को ब्लॉक नहीं करता):

| टेस्ट       | क्या                                                                                                                                                                                                        | चलाएँ                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Chaos       | फेक-अपस्ट्रीम नोड वास्तविक latency/reset/timeout/503 इंजेक्ट करता है; यह सत्यापित करता है कि सर्किट ब्रेकर खुलता/रिकवर होता है और `checkFallbackError` 503 को रिकवरेबल फ़ॉलबैक के रूप में वर्गीकृत करता है। | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-growth | `--expose-gc` के तहत प्रत्येक `createSSEStream` पर ~500 स्ट्रीम; यदि हीप निर्धारित सीमा से अधिक बढ़ती है तो विफल होता है (OOM गार्ड #3069)।                                                                 | `npm run test:heap`                     |
| k6 soak     | `/api/monitoring/health` के विरुद्ध निरंतर लोड; p95/एरर थ्रेशोल्ड।                                                                                                                                          | `k6 run tests/load/k6-soak.js` (नाइटली) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) द्वारा ऑर्केस्ट्रेटेड।
डिफ़ॉल्ट `test:integration` में, chaos और heap स्वयं-स्किप हो जाते हैं (`RUN_CHAOS_INT`/`--expose-gc` के बिना)।

---

## यह भी देखें

- [आर्किटेक्चर गाइड](./ARCHITECTURE.md) — सिस्टम आर्किटेक्चर और इंटरनल्स
- [उपयोगकर्ता गाइड](../guides/USER_GUIDE.md) — प्रोवाइडर, कॉम्बो, CLI इंटीग्रेशन
- [Auto-Combo इंजन](../routing/AUTO-COMBO.md) — 16-फ़ैक्टर स्कोरिंग, मोड पैक
