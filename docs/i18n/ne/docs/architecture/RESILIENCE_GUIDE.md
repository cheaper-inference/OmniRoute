# Resilience Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute तीन अलग तर सम्बन्धित लचिलोपन संयन्त्रहरू छन्। प्रत्येकको फरक दायरा र उद्देश्य छ। राउटिङ व्यवहार डिबग गर्दा तिनीहरूलाई अलग राख्नुहोस्।

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **लचिलोपन टगलहरूको लागि Env-vs-ड्यासबोर्ड प्राथमिकता।** वातावरण — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — ले _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) लाई मात्र आपूर्ति गर्दछ। एक बुलियन `resilienceSettings` (ड्यासबोर्ड →** सेटिङहरू → लचिलोपन** / `PATCH /api/resilience`, `key_value` मा भण्डारण गरिएको ) env मानमा जित्छ: सामान्यीकरण (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) ले भण्डारण गरिएको बुलियनलाई राख्छ जब कुनै अवस्थित हुन्छ। डिप्लोयमेन्टमा `true` मा यस्तो env var सेट गर्दै जहाँ ड्यासबोर्डले पहिले नै `false` बचत गरेको छ त्यसैले — टगललाई फ्लिप गर्न केही परिवर्तन गर्दैन।** सेटिङ्हरू → लचिलोपन** (वा भण्डारण क्षेत्र खाली गर्नुहोस्) सट्टा।

## 1. प्रोभाइडर सर्किट ब्रेकर

**दायरा:** सम्पूर्ण प्रोभाइडर (जस्तै, `glm`, `openai`, `anthropic`)।

**उद्देश्य:** अपस्ट्रिम/सेवा स्तरमा बारम्बार असफल भइरहेको प्रोभाइडरमा ट्राफिक पठाउन रोक्नु।

**कार्यान्वयन:**

- मुख्य क्लास: `src/shared/utils/circuitBreaker.ts`
- वायरिङ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- स्थिति API: `GET /api/monitoring/health`
- रिसेट API: `POST /api/resilience/reset`
- र्यापरहरू: `open-sse/services/accountFallback.ts`
- DB तालिका: `domain_circuit_breakers`

**अवस्थाहरू:**

- `CLOSED` — सामान्य ट्राफिक अनुमति छ
- `DEGRADED` — ट्राफिक अझै अनुमति छ, तर बढेका प्रोभाइडर असफलताहरू ट्र्याक गरिँदैछ; पर्याप्त सफलतामा, मान्य कनेक्सन परीक्षणमा, वा अन्तिम असफलता प्रकारको लागि सबैभन्दा लामो `OPEN` होल्डपछि (यसको `cooldownByKind` मान, नभए `resetTimeout`, × `maxBackoffMultiplier`, कम्तीमा एउटा कुलडाउन) नयाँ असफलता बिना `CLOSED` मा फर्कन्छ
- `OPEN` — प्रोभाइडर अस्थायी रूपमा ब्लक गरिएको; कम्बो राउटिङले यसलाई छोड्छ
- `HALF_OPEN` — रिसेट समय सकिएको; प्रोब अनुरोध अनुमति छ

**कन्फिगर गर्न मिल्ने पूर्वनिर्धारित मानहरू (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience मा देखाइएको):**

| वर्ग    | Degraded हुने | खुल्ने (Opens) | रिसेट समय |
| ------- | ------------- | -------------- | --------- |
| OAuth   | 5 असफलता      | 8 असफलता       | 60s       |
| API-key | 7 असफलता      | 12 असफलता      | 30s       |
| Local   | व्युत्पन्न    | 2 असफलता       | 15s       |

`degradationThreshold` ले प्रोभाइडर कहिले `DEGRADED` मा प्रवेश गर्छ भनी नियन्त्रण गर्छ; `failureThreshold` ले कहिले खुल्छ र छोडिन्छ भनी नियन्त्रण गर्छ। Local प्रोभाइडर प्रोफाइलहरू अहिलेसम्म Resilience सेटिङ पेजमा देखाइएका छैनन्।

**ट्रिप कोडहरू:** केवल प्रोभाइडर-स्तरका स्थितिहरू `[408, 500, 502, 503, 504]`। खाता-स्तरका त्रुटिहरूका लागि ट्रिप नगर्नुहोस् (अधिकांश 401/403/429 — ती कुलडाउन वा लकआउट अन्तर्गत पर्छन्)।

**लेजी रिकभरी:** `OPEN` को समय सकिएपछि, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ले अवस्था `HALF_OPEN` मा ताजा गर्छन्। उही रिडहरू (र अर्को असफलता) ले पुरानो `DEGRADED` लाई `CLOSED` मा घटाउँछन्। ब्याकग्राउन्ड टाइमर आवश्यक छैन।

---

### अप्ट-इन ग्लोबल प्रोभाइडर कुलडाउन (विन्डो गेट)

चौथो, **अप्ट-इन** तह (`PROVIDER_COOLDOWN_ENABLED`, पूर्वनिर्धारित **बन्द**) ले असफल प्रोभाइडरहरूको क्रस-अनुरोध स्मृति `open-sse/services/providerCooldownTracker.ts` मा राख्छ, जुन कम्बो लक्ष्य रिजोलुसनले सन्दर्भ गर्छ, जसले गर्दा लगातारका कम्बो अनुरोधहरूले भर्खरै असफल भएको प्रोभाइडरलाई फेरि-फेरि हिँड्दैनन्। प्रोभाइडर-स्तरका एन्ट्रीहरूले `PROVIDER_PROFILES` विन्डो गेट मान्छन्:

| प्रोफाइल | ट्रिप हुने (`providerFailureThreshold`) | भित्र (`providerFailureWindowMs`) | कुल हुने (`providerCooldownMs`) |
| -------- | --------------------------------------: | --------------------------------: | ------------------------------: |
| OAuth    |                                    `10` |                           `15min` |                          `5min` |
| API key  |                                    `15` |                           `30min` |                         `10min` |

थ्रेसहोल्डभन्दा तल प्रोभाइडरलाई कुलिङमा रहेको मानिँदैन; सफलताले विन्डो खाली गर्छ। कनेक्सन-स्तरका एन्ट्रीहरू (`provider:connectionId`) ले यसको सट्टा घातांकीय `minRetryCooldownMs → maxRetryCooldownMs` ब्याकअफ राख्छन्। ओभरराइडहरू:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
रिग्रेसन गार्ड: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. जडान कूलडाउन

**दायरा:** एकल प्रदायक connection/account/key.

**उद्देश्य:** एउटै प्रदायकका लागि अन्य जडानहरू सेवा गरिरहँदा एउटा खराब कुञ्जी छोड्नुहोस्।

**कार्यान्वयन:**

- अनुपलब्ध चिन्ह लगाउनुहोस्: `src/sse/services/auth.ts::markAccountUnavailable()`
- चयन: एउटै फाइलमा `getProviderCredentials*`
- कूलडाउन क्याल्क: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिङहरू: `src/lib/resilience/settings.ts`

**प्रति जडान क्षेत्रहरू:**

- कूलडाउनको म्याद समाप्त नभएसम्म `rateLimitedUntil` — टाइमस्ट्याम्प
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — घातीय ब्याकअफ काउन्टर

**पूर्वनिर्धारित कूलडाउनहरू:**

- OAuth आधार: 5s
- API-कुञ्जी आधार: 3s
- API-key 429: upstream `Retry-After`/reset headers/parseable रिसेट पाठलाई प्राथमिकता दिन्छ
- ब्याकअफ: `baseCooldownMs * 2 ** failureIndex`

**प्रति-प्रदायक पुन: प्रयास ढिलाइ।** प्रदायक विवरण पृष्ठमा एक छ** ढिलाइ पुन: प्रयास गर्नुहोस्** चयन गर्नुहोस् (स्वतः, 15 सेकेन्ड सम्म 1 घन्टा सम्म)। यसले `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1-21600, `PATCH /api/resilience` मार्फत) बचत गर्छ। जब दर-सीमा त्रुटिले कुनै अपस्ट्रीम पुन: प्रयास सङ्केत गर्दैन, त्यो मानले प्रदायकको लागि स्केल गरिएको ब्याकअफलाई प्रतिस्थापन गर्छ र `backoffLevel` लाई 0 (`open-sse/services/rotationConfig.ts::overrideFor`) मा रिसेट गर्छ। दर-सीमित त्रुटिको लागि प्राथमिकता, सबैभन्दा पहिले: अपस्ट्रीम पुन: प्रयास सङ्केत, त्यसपछि प्रति-जडान `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, त्यसपछि प्रति-प्रदायक पुन: प्रयास विलम्ब, त्यसपछि env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, त्यसपछि स्केल गरिएको ब्याकअफ। स्वतः फिल्ड हटाउँछ। यसले दर-सीमा कारणलाई मात्र असर गर्छ, कहिले पनि टर्मिनल अवस्थाहरूमा हुँदैन।

**गर्जन विरोधी बथान गार्ड:** समवर्ती विफलताहरूलाई अति-विस्तारित कूलडाउन वा डबल-वृद्धि `backoffLevel` बाट रोक्छ।

**Concurrency-limit 429s ले ब्याकअफ सीढी चढ्दैन।** एक `429` जसको शरीरले समवर्ती सीमा रिपोर्ट गर्दछ ("धेरै समवर्ती अनुरोधहरू", "समस्या सीमा", "समानान्तर अनुरोध सीमा", GLM `并发数过高`) भनेको खाता स्वस्थ तर व्यस्त छ। `checkFallbackError()` कारण `concurrency_limited` फर्काउँछ : अब अर्को जडानमा असफल हुनुहोस्, यसलाई निश्चित `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) वा अपस्ट्रिम पुन: प्रयास सङ्केतको लागि चिसो गर्नुहोस्, `backoffLevel` अपरिवर्तित राख्नुहोस्, र `skipProviderBreaker` सेट गर्नुहोस्। स्पष्ट कोटा निकाय अझै पनि जित्छ, त्यसैले कोटा ढाँचासँग मिल्ने निकाय पनि कोटा निर्णय रहन्छ। पत्ता लगाउने: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; फैसला: `open-sse/services/accountFallback/concurrencyLimit429.ts`। `classify429()` (ब्रेकरको `FailureKind`) अपरिवर्तित छ र अझै पनि यी निकायहरूको लागि `rate_limit` पढ्छ।

**स्ट्रिम सामग्री स्टलहरूले खाता चिसो गर्दैनन्।** जब सामग्री-स्टल वाचडग (`open-sse/utils/streamHandler.ts`) ले स्ट्रिममा छोड्छ जुन समयमा कुनै मोडेल आउटपुट पठाइएको छैन, `markAccountUnavailable()` जडानमा त्रुटि रेकर्ड गर्दछ तर कुनै कूलडाउन सेट गर्दैन: स्टल त्यो अनुरोधसँग सम्बन्धित छ, प्राय: कुनै आउटपुट बिना लामो तर्कको मोड। अपरेटरहरूले `resilienceSettings.streamStallCooldown.enabled` (पूर्वनिर्धारित `false`) को साथ अप्ट इन गर्न सक्छन्।

**`p2c` खाता चयनको लागि अप्ट-इन विलम्बता संकेत।** प्रत्येक पठाइएको प्रयासले यसको समय-देखि-पहिलो-बाइट र परिणाम प्रति जडान (र प्रति जडान + मोडेल) इन-मेमोरी रोलिङ विन्डोमा रेकर्ड गर्दछ: अन्तिम 20 नमूनाहरू 15 मिनेट भित्र (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` मा `safeLogEvents()` बाट रेकर्ड गरिएको)। जब `resilienceSettings.p2cLatency.weight` `0` भन्दा माथि हुन्छ (दायरा 0-20, पूर्वनिर्धारित `0` = बन्द), `src/sse/services/auth.ts` मा `compareP2CConnections()` जोडीको प्रत्येक उम्मेद्वारलाई `weight` अंकहरू थप्छ। यसको आधा छिटो उम्मेद्वारको अनुपातको रूपमा विलम्बताबाट आउँछ (दोगुना ढिलोले पूरा आधा लिन्छ) र आधा रोलिङ त्रुटि दरबाट। दुबै उम्मेद्वारहरूसँग कम्तिमा 3 नमूनाहरू भएमा मात्र यो शब्द लागू हुन्छ, त्यसैले नयाँ खाताहरू दण्डित हुँदैनन्, र यसको छत कोटा-ब्लक गरिएको र कोटा-निकालिएको दण्डभन्दा तल रहन्छ। यसले आफ्नै कुनै सर्किट थप्दैन: असफल खाताहरू अझै पनि कूलडाउन, लकआउट र ब्रेकर तहहरूद्वारा ह्यान्डल हुन्छन्। यसलाई `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` सँग सेट गर्नुहोस्।

**तर्क फ्रेमहरू सामग्री-स्टल बजेट पुन: सुरु गर्नुहोस्।** तर्क मोडेलले आफ्नो पहिलो देखिने टोकन अघि मिनेटको लागि सोच्न सक्छ: Claude स्ट्रिम `thinking_delta` फ्रेमहरू जसको सोच पाठ खाली हुन सक्छ, र प्रतिक्रियाहरू API एक पछि अर्को तर्क वस्तु स्ट्रिम गर्दछ। `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ले यी फ्रेमहरू पहिचान गर्छ, र वाचडगले पालो रद्द गर्नुको सट्टा प्रत्येकमा आफ्नो बजेट पुन: सुरु गर्छ। तिनीहरू अझै पनि मोडेल आउटपुट छैनन्, त्यसैले तर्कको साथ मात्र समाप्त हुने पालो अझै पनि खाली रूपमा रिपोर्ट गरिएको छ, र एउटा पालो जसले तर्कलाई रोक्छ र केवल मुटुको धड्कन पठाउँछ भने अझै पनि वाचडगलाई यात्रा गर्दछ।

Kiro को बाइनरी `reasoningContentEvent` फ्रेमहरू गैर-खाली हस्ताक्षरको साथ एक खाली `reasoning_content` डेल्टाको रूपमा कार्यकारी मार्फत यस तर्क गतिविधिलाई सुरक्षित गर्दछ। हस्ताक्षर फर्वार्ड गरिएको छैन। मेटाडेटा, अपूर्ण फ्रेमहरू र खाली हस्ताक्षरहरूले सामग्री बजेट पुन: सुरु गर्दैन; स्वतन्त्र सक्रिय-स्ट्रिम टाइमआउट र ग्राहक रद्द अझै पनि लागू हुन्छ (`open-sse/executors/kiro/reasoning.ts`)।

**टर्मिनल अवस्थाहरू (NOT cooldowns):**

- `banned` — प्रतिबन्धित-कीवर्ड / खाता-प्रतिबन्ध पत्ता लगाउने ( [BAN_DETECTION](../security/BAN_DETECTION.md) हेर्नुहोस्) द्वारा सेट गरिएको छ। अपस्ट्रीम प्रति-अनुरोध अस्वीकारहरू (`request_rejected`, जस्तै Anthropic OAuth 403 "अनुरोध अनुमति छैन") यसलाई कहिले पनि सेट नगर्नुहोस्: तिनीहरू प्रति जडान र मोडेल गणना गरिन्छन् र `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) मा बढ्दो कूलडाउन क्याप गरी त्यो मोडेललाई रोटेशनबाट बाहिर लैजान्छ, वा कुनै मोडेल — `open-sse/services/requestRejectedStreak.ts` थाहा नभएको बेला जडानलाई चिसो पार्छ।
- `expired` (बाउन्डेड पुन: प्रयास पछि टर्मिनलमा ट्रान्जिसनहरू — `EXPIRED_RETRY_MAX = 3` घातांक ब्याकअफ — सँग हुन्छ त्यसैले खाता स्थायी रूपमा निष्क्रिय हुनु अघि क्षणिक OAuth त्रुटिहरू आफैं निको हुन सक्छन्)
- `credits_exhausted`

यी प्रमाणहरू परिवर्तन नभएसम्म वा अपरेटरले तिनीहरूलाई रिसेट नगरेसम्म कायम रहन्छ। क्षणिक कूलडाउन अवस्थाको साथ टर्मिनल अवस्थाहरू अधिलेखन नगर्नुहोस्।

**अल्छी रिकभरी:** जब `rateLimitedUntil` बितिसकेको छ, जडान फेरि योग्य हुन्छ। सफल प्रयोगमा, `clearAccountError()` सबै त्रुटि क्षेत्रहरू खाली गर्दछ।

### Claude OAuth उपयोग पर्खाल: तल्लो प्राथमिकता लेन + सत्र-सीमा रिसेट

**दायरा:** एक Claude सदस्यता (OAuth) जडान। दुवै विशेषताहरू छन्** प्रति जडान अप्ट-इन** (जडान → Claude खण्ड → `lowPriorityMode` / `autoLimitReset` लाई `providerSpecificData` मा सम्पादन गर्नुहोस्, दुबै पूर्वनिर्धारित बन्द) र मिरर Claude कोडको `/low-priority` र `/limit-reset` आदेशहरू (तार अनुबंध Claude कोड 2.1.263 बाट क्याप्चर गरिएको)।

**कार्यान्वयन:**

- राज्य मेसिन + प्रतिक्रिया वर्गीकरण: `open-sse/services/claudeLowPriority.ts`
- status/claim ग्राहक रिसेट गर्नुहोस्: `open-sse/services/claudeLimitReset.ts`
- एक्जिक्युटर हुक (हेडर इन्जेक्सन + समान-खाता पुन: प्रयास): `open-sse/executors/base.ts::execute()`
- अप्ट-इन दृढता: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ट्रिगर:** 5-घण्टा उपयोगको पर्खाल — a `429` जसको हेडरमा `anthropic-ratelimit-unified-status: rejected` हुन्छ र, जब खाता योग्य हुन्छ, `anthropic-ratelimit-unified-slow-offer: treatment`। त्यो पहिलो पर्खाल अघि केहि पठाइएको छैन 429; एकीकृत हेडर बिनाको बर्स्ट ४२९ सामान्य कूलडाउन पथमा जान्छ।

**तल्लो प्राथमिकता लेन** (`lowPriorityMode`):

- पर्खाल 429 मा कार्यकारीले प्रस्ताव स्वीकार गर्दछ र तुरुन्तै पुन: प्रयास गर्दछ** समान** `anthropic-usage-limit: slow` सँग खाता; लेन घोषित `anthropic-ratelimit-unified-reset` (+ 60s अनुग्रह) सम्म सक्रिय रहन्छ र त्यो विन्डोमा प्रत्येक अनुरोध हेडर बोक्छ। अवरोधित 429 कहिल्यै `handleChatCore` पुग्दैन, त्यसैले जडान हो** होइन** कूलडाउनमा राख्नुहोस् र टाढा घुमाइएको छैन।
- पछिका प्रतिक्रियाहरूमा`anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` लेन राख्नुहोस्; `slot_busy` (429) वा `529` सर्भरको `anthropic-ratelimit-unified-slow-retry-after` पर्खनुहोस् (पूर्वनिर्धारित 20s, क्ल्याम्प 5–600s, ± 30% jitter) र पुन: प्रयास गर्नुहोस्, `anthropic-ratelimit-unified-slow-max-wait` द्वारा बाउन्ड गरिएको (पूर्वनिर्धारित 20 मिनेट, क्ल्याम्प 1 मिनेट–6 h) — विगतमा र कूल अफ 10 मिनेटको अन्त्य हुन्छ। पुन: स्वीकृति। प्रतिक्षालाई अनुरोधको आफ्नै अपस्ट्रिम-स्टार्ट टाइमआउट (`resolveFetchStartTimeout`, 10 मिनेट पूर्वनिर्धारित रूपमा) माइनस 5 सेकेन्ड मार्जिनले पनि क्याप गरेको छ: त्यो क्याप बिना 20-मिनेटको पूर्वनिर्धारित अधिकतम-प्रतीक्षाले अनुरोधलाई जीवित राख्नेछ र निद्रा मिड-वेटलाई रद्द गरिनेछ, कूल `max_wait` को सट्टामा `TimeoutError` -endful + -off surfacing।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-सञ्झ्याल रोलओभर, वा `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (जसले कुनै पनि स्थितिमा `extra_usage` को रूपमा समाप्त गर्दछ, किनकि भुक्तान ओभरेजले अब पर्खाललाई ढाक्छ) लेनको अन्त्य गर्नुहोस्; प्रतिक्रिया त्यसपछि सामान्य कूलडाउन मार्गमा बग्छ। `budget_exhausted` घोषणा गरिएको बजेट रिसेट नभएसम्म सम्झिन्छ (≤ 8 दिन)।
- पर्खाल जाँच कार्यकर्ताको आफ्नै 400-संचालित अन्तर-प्रयास पुन: प्रयासहरू पछि चल्छ (सन्दर्भ सम्पादन, thinking/effort क्ल्याम्पहरू, परम स्वत-लर्न), त्यसैले एक पर्खाल 429 जुन ती पुन: प्रयासहरू मध्ये एकमा मात्र सतहमा छ, अझै पनि कूलडाउन पथमा पुग्नुको सट्टा रोकिन्छ।
- राज्य प्रति जडान मेमोरी इन-मेमोरी छ (पुन: सुरु गर्दा पुन: स्वीकार गर्न एक अतिरिक्त पर्खाल 429 खर्च हुन्छ)।

**सत्र-सीमा रिसेट** (`autoLimitReset`, लेन अघि प्रयास गरे जब दुबै अन छन्):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ब्लक; जब `arm: "reset"` र `available: true`, `{ "program": "juniper_tide" }` सँग `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` बाट संगठन UUID, बुटस्ट्र्याप फलब्याक)।
- `result: reset|not_limited` → अनुरोध पूर्ण गतिमा पुन: प्रयास गरिएको छ (कुनै ढिलो हेडर छैन)। `already_used` / `not_offered` memoise `next_available_at` (पूर्वनिर्धारित एक हप्ता); कुनै पनि असफलता 15 मिनेट बन्द हुन्छ। रिसेट हप्तामा एक पटक हो र अझै पनि साप्ताहिक सीमा तिर गणना हुन्छ।

रिग्रेसन गार्डहरू: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### स्वत: लागू बैंक रिसेटहरू

**दायरा:** Codex र Claude सदस्यता (OAuth) जडानहरू।** अप्ट-इन** : `bankedResetAutoApply` सेटिङ बन्द छ र पूर्वनिर्धारित रूपमा `dry-run` मोडमा छ (सेटिङहरू → AI → स्वत: लागू बैंक रिसेटहरू)।

**उद्देश्य:** प्रदायक सीमा पृष्ठमा "रिडिम" थिच्न अपरेटरको लागि पर्खनुको सट्टा, खाताले प्रयोगको पर्खालमा हिर्काउँदा बैंक रिसेटहरू आफैंमा खर्च गर्नुहोस्।

| क्रेडिट प्रकार (`creditTypes`) | के रिडिम गरिएको छ                       | जहाँ चल्छ                                            |
| ------------------------------ | --------------------------------------- | ---------------------------------------------------- |
| `codexCredits`                 | Codex रिसेट क्रेडिट                     | पृष्ठभूमि कार्य, प्रत्येक 60 सेकेन्ड                 |
| `claudeCredits`                | Claude बैंक अनुदान (`GRANT` क्रेडिट)    | पृष्ठभूमि कार्य, प्रत्येक 60 सेकेन्ड                 |
| `claudeSessionReset`           | Claude साप्ताहिक सत्र-सीमा रिसेट (माथि) | अनुरोध मार्ग, प्रति-खाता टगलको रूपमा उही नीति मार्फत |

**कार्यान्वयन:**

- शुद्ध निर्णय (दुवै मार्गको लागि एक नियम सेट): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- पृष्ठभूमि कार्य: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` मा सुरु भयो)
- Claude अनुरोध-मार्ग गेट: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` मा `setClaudeLimitResetPolicy()` मार्फत दर्ता
- इतिहास, क्याप्स र वेबहुक: `src/lib/usage/bankedResetAudit.ts`
- इतिहास API: `GET /api/settings/banked-reset-auto/history?limit=50` (व्यवस्थापन प्रमाणीकरण)

**निर्णय आदेश** (पहिलो असफल नियम रेकर्ड गरिएको कारण हो):

1. सुविधा बन्द, क्रेडिट प्रकार बन्द, वा दायरा बाहिर खाता (`accountScope` `all` / `selected` प्लस प्रति-खाता `connections` नक्सा)।
2. वैकल्पिक UTC तालिका बाहिर (`startHourUtc` > `endHourUtc` मध्यरात पार गर्दछ)।
3. पछिल्लो २४ घण्टामा क्याप्स: `maxPerAccountPerDay` (1), `maxPerDay` (3), र `minSpacingMinutes` (30) कुनै पनि दुई छुटकाराहरू बीच।
4. ट्रिगर: पर्खाल भएको `session` वा `weekly` सञ्झ्याल ( `getQuotaWindowStatus().reachedThreshold` बाट पढ्नुहोस्, `isAccountQuotaExhausted()` होइन, जसले प्रत्येक सञ्झ्याल खर्च भएको खाता रिपोर्ट गर्दछ), वा कम्तिमा `expiringCreditMinUsedPercent` (50) प्रयोग गरेको खातामा `expiringCreditHours` (24) भित्र समाप्त भएको क्रेडिट।
5. प्राकृतिक-रिसेट गार्ड: `sessionResetGuardMinutes` (90) भित्र पर्खालको 5-घण्टा सञ्झ्याल रिसेट हुँदा, वा `weeklyResetGuardHours` (12) भित्र पर्खालको साप्ताहिक विन्डो रिसेट हुँदा छोड्नुहोस्।
6. साप्ताहिक तल्ला: साप्ताहिक बाँकी `weeklyFloorPercent` (10) भन्दा कम हुँदा 5-घण्टा रिसेट छोड्नुहोस्।
7. `last-resort` मोड: उही प्रदायकको अर्को इन-स्कोप खाता दुबै विन्डोहरूमा कम्तिमा `poolHeadroomPercent` (10) बाँकी हुँदा छोड्नुहोस्। म्याद सकिने-क्रेडिट ट्रिगरहरूले यसलाई बाइपास गर्छन्।
8. `dry-run` पङ्क्ति रेकर्ड गर्दछ र केहि पनि रिडिम गर्दैन; `last-resort` र `eager` रिडिम।

छुटेको कोटा डेटाले कहिले पनि रिडेम्पशनलाई अनलक गर्दैन: अज्ञात रिसेट समय वा साप्ताहिक उपयोग स्किप।

**Claude सत्र रिसेट:** सुविधा बन्द, वा `claudeSessionReset` बन्द भएमा, प्रति-खाता `autoLimitReset` टगलले ठीक पहिले जस्तै निर्णय गर्छ। दुबै सक्रिय हुँदा, सुविधाले प्रति-खाता टगलहरूलाई प्रतिस्थापन गर्दछ: इन-स्कोप खाताले नीतिले अनुमति दिँदा मात्र दावी गर्न सक्छ, र `dry-run` मोडमा कुनै दाबी गरिँदैन।

**सुरक्षा:** कार्यले प्रति टिकमा बढीमा एक क्रेडिट रिडिम गर्छ, क्रेडिटहरू सूचीबद्ध गर्नु अघि निर्णय गर्दछ (छोडिएको खाता कहिल्यै सूचीबद्ध हुँदैन), idempotency कुञ्जीहरू `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` प्रयोग गर्दछ, र असफल सूची वा रिडेम्पसन पछि 1 घण्टाको लागि खाता बन्द गर्दछ। प्रत्येक छुटकारा, असफलता र ड्राई-रन निर्णय `audit_log` मा लेखिएको छ (`action: "bankedReset.redeem"`, कुनै टोकन वा क्रेडिट आईडी छैन); क्यापहरू ती पङ्क्तिहरूबाट गनिन्छन्, त्यसैले तिनीहरू पुन: सुरु गर्न बाँच्छन्। सफल छुटकाराले `provider.reset_redeemed` वेबहुकलाई पनि फायर गर्छ।

रिग्रेसन गार्डहरू: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`।

### सत्र आत्मीयता (#7274)

**दायरा:** एउटा ग्राहक सत्र (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` हेडर) एक जडानमा पिन गरियो, को लागी** कुनै पनि** प्रदायक।

**उद्देश्य:** अनुरोधहरूमा एउटै खातामा बहु-टर्न एजेन्ट (Claude कोड, एडर, कस्टम एजेन्टहरू) राख्नुहोस्, क्रस-खाता सन्दर्भ हानि कम गर्दै र प्रति-खाता सत्र अवस्था भएका प्रदायकहरूमा बारम्बार कोल्ड-स्टार्ट 429 हरू।

**कार्यान्वयन:**

- TTL संकल्प: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर निकासी (सामान्य, कुनै पनि प्रदायक): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- निरन्तर पिन तालिका: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिङ: `sessionAffinityTtlMs` (ms मा ग्लोबल TTL, `0` असक्षम पार्छ) — `src/lib/db/settings.ts`। माइग्रेसन `124_generic_session_affinity_ttl.sql` द्वारा कोडेक्स-मात्र `codexSessionAffinityTtlMs` बाट पुन: नामाकरण गरिएको छ, जसले कुनै पनि पहिले कन्फिगर गरिएको Codex TTL नयाँ पूर्वनिर्धारित रूपमा लिन्छ।

#7274 अघि, `codex` बाहेक प्रत्येक प्रदायकको लागि `resolveSessionAffinityTtlMs()` लाई `0` मा कडा जमानत गरिएको थियो, त्यसैले TTL सेटिङ (र सत्र हेडरहरू) ले अन्य कतै पनि प्रभाव पारेन तापनि पिनिङ मेकानिजम र हेडर निकासी पहिले नै प्रदायक-अज्ञेयवादी थिए। फिक्सले त्यो प्रारम्भिक रिटर्न हटायो; TTL अब विश्वव्यापी रूपमा `0` भन्दा माथि सेट गरेपछि प्रत्येक प्रदायकमा समान रूपमा लागू हुन्छ।

तीन सत्र-सम्बन्ध हेडरहरू कहिल्यै फर्वार्ड गरिँदैन अपस्ट्रीम — कार्यकारीहरूले ग्राहक हेडरहरू पास गर्नुको सट्टा स्क्र्याचबाट आफ्नै अपस्ट्रीम हेडरहरू निर्माण गर्छन्, त्यसैले यो आन्तरिक सहसंबंध आईडी मात्र रहन्छ।

### विशेष व्यवस्थित सत्र जडान पट्टाहरू

**दायरा:** एउटा सक्रिय व्यवस्थित HTTP client/session सँग एउटा योग्य OmniRoute जडान छ।

**उद्देश्य:** अनुरोधहरूमा कडा राउटिंग फेंस चाहिने ग्राहकहरूको लागि टिकाऊ अनन्य जडान स्वामित्व प्रदान गर्नुहोस्। यो सत्र सम्बद्धता भन्दा फरक छ, जुन एक नरम निरन्तरता प्राथमिकता हो: एक विशेष पट्टा SQLite मा जीवनचक्र अवस्था कायम रहन्छ, विश्वव्यापी सक्रिय-मालिक र सक्रिय-जडान विशिष्टता लागू गर्दछ, र प्रदायक प्रेषण अघि बासी पुस्तालाई अस्वीकार गर्दछ।

सुविधा अप्ट-इन प्रति API कुञ्जी हो। व्यवस्थित कुञ्जीमा `lease:exclusive` स्कोप र स्पष्ट गैर-खाली `allowedConnections` सूची हुनुपर्छ। कुनै पनि HTTP ग्राहकले जीवनचक्र अन्त्य बिन्दु प्रयोग गर्न सक्छ; कुनै ग्राहक नाम, प्रयोगकर्ता-एजेन्ट, प्रदायक, OAuth विधि, वा मोडेल आवश्यक छैन। पट्टामा जडानको स्वामित्व हुन्छ, मोडेल होइन, त्यसैले जडान सामान्यतया योग्य रहँदा मोडेल परिवर्तनले बाइन्डिङ कायम राख्छ। सामान्य मोडेल, कोटा, स्वास्थ्य, कूलडाउन, र अनुमति सूची नियमहरू आधिकारिक रहन्छन् र उही पुस्तालाई अर्को निःशुल्क योग्य जडानमा ट्रान्जिसन गर्न सक्छन्।

जीवनचक्र `POST /api/v1/session-leases` हो JSON कार्यहरू `acquire`, `renew`, र `release` सँग। व्यवस्थित अनुमान अनुरोधहरूले अपारदर्शी `X-OmniRoute-Lease-Owner` मान र सटीक `X-OmniRoute-Lease-Generation` प्रस्तुत गर्दछ। मालिकले 43 base64url वर्णहरू पछि `vlo_` प्रयोग गर्दछ; यसको SHA-256 ह्यास मात्र भण्डारण गरिएको छ। प्रत्येक अन्तिम प्रेषण फेंसले प्रमाणीकृत API कुञ्जी ID र सक्रिय जडान ID पनि बाँध्छ। पट्टा नियन्त्रण हेडरहरू लगहरू, राखिएको अनुरोध स्न्यापसटहरू, र अपस्ट्रीम कार्यकारी हेडरहरूबाट हटाइन्छ।

यदि सामान्य राउटिङमा योग्य व्यवस्थित उम्मेद्वारहरू छन् तर प्रत्येक स्वतन्त्र उम्मेद्वार विदेशी सक्रिय पट्टाले कब्जा गरेको छ भने, OmniRoute HTTP `429`, लीज-क्षमता-अनुपलब्ध कोड, क्षमताको लागि पर्खने अवस्था, र प्रारम्भिक सान्दर्भिक समयावधिबाट व्युत्पन्न एक बाउन्ड गरिएको `Retry-After` फिर्ता गर्दछ। साधारण खाली योग्यता पट्टा विवाद होइन र यसको अवस्थित राउटिंग त्रुटि सिमान्टिक्स राख्छ।

सम्बन्धित संयन्त्रहरू अलग रहन्छन्:

- OAuth सत्र कब्जा OAuth खाताहरूको लागि प्रक्रिया-स्थानीय सफ्ट वितरण हो।
- खाता सेमाफोरहरूले अनुरोध-समस्या अनुमतिहरू प्रदान गर्दछ र अनुरोध पूरा भएपछि समाप्त हुन्छ।
- विशेष व्यवस्थित सत्र पट्टाहरू एक पुस्ता बार संग टिकाऊ जीवन चक्र स्वामित्व हो।

---

## ३. मोडेल लकआउट

**दायरा:** प्रदायक + जडान + मोडेल ट्रिपल।

**स्थितिअनुसार मुख्य दायरा:** लकआउट लेख्दा कुन कुञ्जी प्रयोग गर्ने भन्ने कुरा असफल स्थितिले निर्धारण गर्छ
(`open-sse/services/accountFallback/exactModelLock.ts` मा `resolveLockoutScope()`):

- `429` / `403` / `402` — कोटा वा अधिकारसम्बन्धी सङ्केत — **कोटा परिवार** लक गर्नुहोस्:
  codex का लागि सम्पूर्ण `codex` / `spark` दायरा (जडानका प्रत्येक `gpt-5*` मोडेल), अन्य प्रदायकका लागि
  `getQuotaScopedModelForProvider()`।
- `404` ले आधारभूत मोडेल लक गर्छ (`getModelLockKey()` ले `not_found` लाई साँघुरो बनाउँछ)।
- अन्य कुनै पनि स्थिति — `5xx` ट्रान्सपोर्ट/सर्भर असफलता र गुणस्तर प्रमाणीकरणबाट OmniRoute ले आफैँ सिर्जना गरेको
  `502` — ले **ठ्याक्कै** प्रदायक/जडान/मोडेल टपल मात्र लक गर्छ। कुनै एउटा मोडेलमा खराब स्ट्रिम हुनु
  खाताको कोटाबारे प्रमाण होइन; यो नियम आउनुअघि `codex/gpt-5.6-luna` मा आएको एउटा खाली प्रतिक्रियाले
  2–30 मिनेट (क्रमशः बढ्दै जाने) का लागि उक्त जडानका प्रत्येक `gpt-5*` मोडेललाई रुटिङबाट हटाउँथ्यो,
  जबकि यसको कोटा अपरिवर्तित रहन्थ्यो।
- कलरको स्पष्ट `scope` विकल्पले सधैँ प्राथमिकता पाउँछ (Antigravity ले `"exact"` पठाउँछ)।

**उद्देश्य:** एउटा मात्र मोडेल अनुपलब्ध वा कोटा-सीमित हुँदा सम्पूर्ण जडानलाई निष्क्रिय हुनबाट रोक्नु।

**उदाहरणहरू:**

- `429` फर्काउने प्रति-मोडेल कोटा भएका प्रदायकहरू
- एउटा हराइरहेको मोडेलका लागि `404` फर्काउने स्थानीय प्रदायकहरू
- प्रदायक-विशिष्ट मोड/मोडेल अनुमति असफलताहरू (जस्तै, Grok मोडहरू)

**कार्यान्वयन:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### मोडेल कूलडाउन ड्यासबोर्ड (v3.8.0)

UI: सेटिङहरू → मोडेल कूलडाउनहरू (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

सक्रिय लकआउटहरू निम्न विवरणसहित सूचीबद्ध गर्छ: प्रदायक, जडान, मोडेल, कारण, expiresAt। सञ्चालकहरूले कार्डबाट
मोडेललाई म्यानुअल रूपमा पुनःसक्षम गर्न सक्छन्।

**REST API:**

- `GET /api/resilience/model-cooldowns` — सक्रिय लकआउटहरूको सूची
- `DELETE /api/resilience/model-cooldowns` — म्यानुअल रूपमा पुनःसक्षम गर्ने। Body: `{provider, connection, model}`। प्रमाणीकरण: management।

### कूलडाउन प्रबन्धक

UI: अनुगमन → कूलडाउन प्रबन्धक (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

क्षणिक कारणले रुटिङबाट बाहिर रहेका प्रत्येक जडानका लागि एउटै पृष्ठ, प्रत्येक प्रदायकको पृष्ठ खोलिरहनु नपर्ने गरी।
यसले जडान कूलडाउन, मोडेल लकआउट र अन्तिम अवस्थाहरू सूचीबद्ध गर्छ; तिनलाई प्रति-जडान, चयनका लागि, वा कुनै
प्रदायकका सबै जडानका लागि हटाउँछ; साथै धेरै पटक समायोजन गरिने कूलडाउन नियमहरू सम्पादन गर्छ:
`streamStallCooldown.enabled` र OAuth / API-key `connectionCooldown` को आधारभूत कूलडाउन तथा अधिकतम
ब्याकअफ चरणहरू (`PATCH /api/resilience` मार्फत सुरक्षित गरिन्छ)। अन्तिम अवस्थाहरू (`banned`, `expired`, `credits_exhausted`)
सूचीबद्ध गरिन्छन्, तर यहाँ कहिल्यै हटाइँदैनन्।

सोही पृष्ठको **त्रुटि कूलडाउन नियमहरू** कार्डले सञ्चालकका त्रुटि नियमहरू
(`settings.providerErrorRules`) र प्रति-प्रदायक क्याच-अल डिफल्टहरू
(`settings.providerErrorDefaults`) लाई `PATCH /api/settings` मार्फत सम्पादन गर्छ — तिनीहरू कसरी मिल्छन् भन्ने
जानकारीका लागि §7 अन्तर्गतको "सञ्चालकद्वारा घोषित नियमहरू" हेर्नुहोस्। अवधि Default (कुनै स्पष्ट कूलडाउन छैन),
30 min, 1 h, 5 h, 24 h, वा 1 देखि 43,200 मिनेट (30 दिन) सम्मको आफूअनुकूल अवधि हुन सक्छ।

**REST API** (`src/lib/resilience/cooldownManager.ts`, प्रमाणीकरण: management):

- `GET /api/resilience/cooldowns[?provider=]` — स्थिति, बाँकी कूलडाउन, ब्याकअफ स्तर, अन्तिम त्रुटि प्रकार र
  मोडेल लकआउट भएका जडानहरू (प्रमाणपत्रबिना)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` वा
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` फर्काउँछ

### लकआउट सेटिङ UI + सफलता-आधारित क्षय पुनर्बहाली (v3.8.23)

मोडेल लकआउट सधैँ सक्रिय रहने हार्डकोड गरिएको व्यवहारबाट आफ्नै सेटिङ कार्ड र स्व-मरम्मत हुने पुनर्बहाली मार्गसहित
पूर्ण रूपमा कन्फिगर गर्न मिल्ने, opt-in सुविधा बनेको छ।

**सेटिङ कार्ड:** सेटिङहरू → मोडेल लकआउट
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
यो माथिको read-only `ModelCooldownsCard` भन्दा **भिन्न** छ (यसले सक्रिय लकआउटहरू मात्र
_सूचीबद्ध_ गर्छ) — नयाँ कार्डले _प्यारामिटरहरू कन्फिगर_ गर्छ। डिफल्टहरू
`DEFAULT_MODEL_LOCKOUT_SETTINGS` (`src/lib/resilience/modelLockoutSettings.ts`) मा रहेका छन्:

| सेटिङ                   | डिफल्ट                           | अर्थ                                                         |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | मुख्य टगल — मोडेल लकआउट **डिफल्ट रूपमा बन्द** हुन्छ।         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | मोडेल-स्कोप गरिएको असफलताका रूपमा गनिने अपस्ट्रिम स्थिति।    |
| `baseCooldownMs`        | `120_000` (120 s)                | पहिलो असफलताका लागि प्रारम्भिक लकआउट अवधि।                   |
| `maxCooldownMs`         | `1_800_000` (30 min)             | क्रमशः बढाइएको कूलडाउनको सीमा।                               |
| `maxBackoffSteps`       | `10`                             | घातीय-ब्याकअफ बढोत्तरीका अधिकतम चरणहरू।                      |
| `useExponentialBackoff` | `true`                           | दोहोरिएका असफलताले कूलडाउनलाई घातीय रूपमा बढाउने कि नबढाउने। |

सेटिङहरू सामान्य सेटिङ स्टोरमार्फत सुरक्षित हुन्छन् र resilience सेटिङ स्किमामार्फत प्रमाणीकरण गरिन्छन्; कार्डले
`baseCooldownMs`/`maxCooldownMs` (`maxCooldownMs ≥ baseCooldownMs` सहित) र `maxBackoffSteps` को सीमाभित्र
मान राख्छ।

**सफलता-आधारित क्षय पुनर्बहाली:** पुनर्बहाली केवल टाइमर समाप्तिमा निर्भर हुँदैन। स्वस्थ प्रतिक्रियाले मोडेलको
असफलता गणना घटाउँदै लैजान्छ, त्यसैले बीचको अवधिमै पुनर्बहाली भएको मोडेलले बढोत्तरी रोक्छ (र लकआउट हटाउँछ)
र यसको टाइमर सकिनुअघि नै पुनःसक्षम हुन सक्छ। सफल combo target मा, `open-sse/services/combo.ts` ले
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`) बोलाउँछ, जसले सुरक्षित गरिएको
`failureCount` लाई आधा बनाउँछ (`Math.floor(failureCount / 2)`); यो `0` पुगेपछि लकआउट प्रविष्टि पूर्ण रूपमा
हटाइन्छ। यसको समकक्ष `recordModelLockoutFailure()` ले बढोत्तरी अवधिभित्र भएका असफलताहरूमा गणना बढाउँछ
(र कूलडाउन बढाउँछ)। यो सफलता-आधारित क्षय सामान्य टाइमर समाप्तिको अतिरिक्त हो — दुवैमध्ये कुनै पनि मार्गले
मोडेललाई पुनःसक्षम गर्न सक्छ।

**स्थिति:** लकआउटहरू **मेमोरीमा** राखिन्छन् (प्रति-प्रक्रिया `Map`s मा `ModelLockoutEntry`, जसको कुञ्जी `provider:connectionId:model` हुन्छ; र `provider:connectionId:exact:model` का आधारमा exact-scope लकहरू), र
DB मा स्थायी रूपमा भण्डारण गरिँदैनन् — पुनःसुरु गर्दा ती हराउँछन्। _सेटिङहरू_ स्थायी रूपमा सुरक्षित हुन्छन्; सक्रिय लकआउट _स्थिति_ अस्थायी हुन्छ।

---

## 4. कोटा-साझेदारी सहमति नियन्त्रण (v3.8.36)

सदस्यता खाताहरू (GLM, MiniMax, आदि) प्रायः ~ 1-3 समवर्ती अनुरोधहरू मात्र स्वीकार गर्छन्; त्यो भन्दा बढिले 429 र कूलडाउन ट्रिगर गर्दछ। यो अन्तर्गत तीव्र छ** कोटा-सेयर** (`qtSd/…`) कम्बोज, जहाँ धेरै API कुञ्जीहरूले एउटा अपस्ट्रिम खाता साझा गर्दछ। तीन तहले साझा खातालाई बाढी हुनबाट जोगाउँछ।

### प्रति-कनेक्सन कन्करन्सी क्याप (`max_concurrent`)

प्रत्येक प्रदायक जडानले `max_concurrent` छत घोषणा गर्न सक्छ (`provider_connections.max_concurrent`, जडान मोडल / API / DB मा सेट गरिएको)। कुनै सीमा को लागी खाली छोड्नुहोस्। यो एकल घुँडा हो जसले — तलको क्रमिक तहलाई ड्राइभ गर्छ यसलाई खाताको वास्तविक समरूपतामा सेट गर्दछ (जस्तै GLM ~ 1, MiniMax ~ 2)।

### प्रति-मोडेल कन्करन्सी क्याप्स (`modelConcurrency`)

एक जडानले यसको `rateLimitOverrides` नक्सा भित्र सटीक प्रति-मोडेल concurrency छत थप रूपमा घोषणा गर्न सक्छ:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

यसलाई जडान मोडलमा सेट गर्नुहोस् (** दर सीमाले → प्रति मोडेल कन्करन्सी क्याप्सलाई ओभरराइड गर्छ** , प्रति रेखा एक `model=cap` ) वा समान JSON आकारको साथ `PATCH /api/providers/[id]` मार्फत। कुञ्जी अर्थशास्त्र:

- **जडान-वाइड बनाम मोडेल-विशिष्ट:** `maxConcurrent` साझा जडान-चौडा छत रहन्छ। जब दुबै लागू हुन्छन्, दुबै गेटहरू एउटै कम्पोजिट गेटमा परमाणु रूपमा प्राप्त हुन्छन् (`global → provider → account → model`); प्रभावकारी व्यवहार कडा लागू सीमा हो।
- **सटीक मोडेल-कुञ्जी मिलान:** कुञ्जी भनेको रिजोल्युसन — सामान्यतया बेयर अपस्ट्रिम मोडेल आईडी (`glm-5`) लाई राउट गरेपछि एक्जिक्यूटरलाई पास गरिएको मोडेल स्ट्रिङ हो, क्लाइन्ट-साइड `provider/model` उपनाम (`zai/glm-5` `glm-5` सँग मेल खाँदैन)। मानहरू सकारात्मक-पूर्णांक समवर्ती-अनुरोध छतहरू हुन्।
- **स्थानीय कतार, कुनै खोज छैन:** अवस्थित queue/timeout सिमान्टिक्स (टाइप गरिएको `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` भर्ना त्रुटिहरू) सँग स्थानीय रूपमा अतिरिक्त अनुरोधहरू लामबद्ध हुन्छन्। OmniRoute अपस्ट्रिम नीति — पत्ता लगाउन वा अनुमान गर्दैन यसले अपरेटरले कन्फिगर गरेको सही छतलाई लागू गर्दछ। एक संतृप्त मोडेल गेटले प्रदायकलाई कहिल्यै असक्षम गर्दैन र स्थायी मोडेल लकआउट कहिल्यै सिर्जना गर्दैन; अपस्ट्रीम 429/cooldown/fallback व्यवहार त्रुटि ब्याकस्टप रहन्छ।
- **प्रति-जडान, प्रति-प्रक्रिया दायरा:** क्याप्सहरू प्रति डाटाबेस जडान हुन्छन् र मेमोरीमा राखिएको हुन्छ, त्यसैले एउटै अपस्ट्रिम API कुञ्जी पुन: प्रयोग गर्ने दुई जडानहरू एकअर्कासँग समन्वय गर्दैनन्।
- **कन्फिगर नगरिएको मतलब अपरिवर्तित:** नक्सा हटाउँदा (वा ड्यासबोर्ड फिल्ड खाली छोडेर) कुनै मोडेल गेट थप्दैन। कुनै पनि सार्वभौमिक प्रदायक सीमा दाबी नगरी उदाहरण कन्फिगरेसन:

```text
glm-5=1
glm-4.7=3
```

### कोटा-साझेदारी अनुरोध क्रमबद्ध

जब कोटा-सेयर प्रेषणले सकारात्मक `max_concurrent` घोषणा गर्ने जडानलाई लक्षित गर्दछ, त्यसमा समवर्ती अनुरोधहरू** खाता** प्रति-जडान सेमाफोर (कुञ्जी `qsconn:<connectionId>`) मार्फत क्रमबद्ध गरिन्छ: अतिरिक्त अनुरोधहरू** लाइनमा पर्खनुहोस्** खाता खोल्नुको सट्टा। यो छ** असफल-खुला** — एक संतृप्त लाम वा टाइमआउट एक स्लट बिना अगाडि बढ्छ बरु पठाउन मिल्ने अनुरोधलाई अस्वीकार गर्नुको सट्टा। टगल इन गर्नुहोस्** सेटिङहरू → लचिलोपन → कोटा-सेयर प्रति-कनेक्सन कन्करन्सी** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, पूर्वनिर्धारितमा)। `max_concurrent` क्याप बिना व्यवहार अपरिवर्तित छ।

> कोटा-सेयर राउटिङ गेट (`selectQuotaShareTarget`, DRR + P2C) आफैं असफल-खुला छ र केवल _deprioritizes_ एकल-जडान पूलको साथमा-क्याप जडान — कडा-सीमा गर्न सक्दैन, त्यसैले यो सेमाफोरले वास्तवमा बाढी समावेश गर्दछ।

### कम्बो कूलडाउन-सचेत पुन: प्रयास

प्रत्येक कम्बो रणनीतिको लागि (सक्षम हुँदा), SHORT ट्रान्जिन्ट कूलडाउनको लागि 429 लाई क्रिस्टलाइज गर्ने अनुरोधले यसलाई पर्खन्छ र 429 — फिर्ता गर्नुको सट्टा पुन: डिस्प्याच गर्दछ यसले जेमिनी-क्लास TPM/RPM विन्डोहरू (~ 60s retry-after) लाई कभर गर्दछ। प्रति मोडेल दर सीमा। `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) द्वारा बाँधिएको** सेटिङहरू → लचिलोपन** । यो `quota_exhausted` (आधा रात सम्म लक) वा auth/not-found कारणहरूमा पर्खदैन। `comboTimeoutMs` सेटको साथ, त्यो समयसीमा अघि समाप्त हुन नसक्ने प्रतीक्षा सुरु हुँदैन (#18998): कम्बोले `COMBO_TIMEOUT` 504 को सट्टा यसको टर्मिनल प्रतिक्रियाको साथ एकै पटक जवाफ दिन्छ।

कम्बोले `config.comboCooldownWaitEnabled: false` सँग अप्ट आउट गर्न सक्छ। केवल शाब्दिक `false` यी साझा कम्बो प्रतीक्षाहरू (पोस्ट-डिस्प्याच कूलडाउन र पूर्व-प्रेषण circuit-open/model-lock प्रतीक्षाहरू) र तिनीहरूको प्रतीक्षा-बजेट टाइमआउट-फ्लोर विस्तारलाई असक्षम गर्दछ। हराइरहेको वा `true` विश्वव्यापी नीतिलाई सुरक्षित गर्दछ; `true` विश्वव्यापी रूपमा असक्षम प्रतिक्षा सक्षम गर्न सक्दैन। एक स्पष्ट `targetTimeoutMs` अझै जित्छ। यो अप्ट-आउटले छुट्टै नेटिभ-कोडेक्स टर्न-पिन पूर्व-प्रेषण प्रतीक्षालाई परिवर्तन गर्दैन।

एउटै गेटले प्रि-डिस्प्याच केस (#16319) लाई कभर गर्दछ: जब कुनै प्रयास गर्नु अघि कम्बोको प्रत्येक लक्ष्य छोडिन्छ किनभने यसको मोडेल छोटो क्षणिक लकआउटमा बस्छ, शून्य-प्रयास मार्गले संकेत-रहित `503 ALL_TARGETS_SKIPPED` जवाफ दिनुको सट्टा उही छत मुनि लक आउट पर्खन्छ र पुन: प्रेषण गर्दछ। जब कुनै पर्खाइ अनुमति छैन (छत, प्रयास वा बजेट समाप्त, वा सुविधा बन्द), टर्मिनल प्रतिक्रिया प्रारम्भिक क्षणिक लक समाप्तिबाट `retry_after` / `reset_at` बोक्ने `429 rate_limit_error` मा अपग्रेड हुन्छ; कोटा, प्रमाणीकरण र नभेटिएका तालाहरूले सङ्केत-कम ५०३ राख्छन्।

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

## 5. अनुरोध क्यू एडमिसन नियन्त्रण (v3.8.49 · issue #6593)

**दायरा**: स्थानीय प्रति-प्रदायक+जडान रेट-लिमिट क्यू (`open-sse/services/rateLimitManager.ts`, Bottleneck द्वारा समर्थित), माथि उल्लेखित तीनवटा संयन्त्रहरूभन्दा एक तह तल।

**`maxWaitMs` ले क्यू प्रतीक्षा सीमाबद्ध गर्छ; `executionMaxWaitMs` ले कार्यान्वयन सीमाबद्ध गर्छ।**
यी दुवै जानाजान अलग राखिएका छन्, र कुनै पनि ले अर्कोलाई फिड गर्दैन।

`resilienceSettings.requestQueue.maxWaitMs` भनेको **क्यू-प्रतीक्षा बजेट** हो: यसले प्रदायक स्लटको लागि प्रतीक्षा गर्ने र त्यसपछि QUEUED मा बसिरहने समयलाई समेट्छ, र जबले QUEUED छोडेर कार्यान्वयन सुरु गर्छ, त्यही क्षण यसको टाइमर खारेज हुन्छ (`rateLimitManager.ts`, `wrappedFn`)। यो सीमा नाघेको अनुरोध कहिल्यै अपस्ट्रिमसम्म पुग्दैन। पूर्वनिर्धारित 30000ms, `src/lib/resilience/settings.ts` मा `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` द्वारा आपूर्ति गरिएको र `tests/unit/ratelimit-admission-control-6593.test.ts` द्वारा पिन गरिएको, त्यसैले यसमा भएको परिवर्तनले त्यो परीक्षणलाई रातो बनाउँछ, यो अनुच्छेदलाई चुपचाप पुरानो भएर बस्न दिँदैन।

`resilienceSettings.requestQueue.executionMaxWaitMs` भनेको Bottleneck ले जब `expiration` को रूपमा प्राप्त गर्ने मान हो, जसको टाइमर डिस्प्याचपछि मात्र सुरु हुन्छ। यो आफ्नै अपस्ट्रिम टाइमआउट नभएका एक्जिक्युटरहरूका लागि ब्याकस्टप हो, र जब एक्जिक्युटरको आफ्नै fetch-start टाइमआउट लामो हुन्छ, यसलाई त्यही बराबर बढाइन्छ, त्यसैले यसले स्वस्थ इन-फ्लाइट प्रतिक्रियालाई काट्न सक्दैन। पूर्वनिर्धारित 600000ms (10 मिनेट)।

क्यू बजेटलाई `expiration` मा फिड गर्नु नै पहिले non-incremental गेटवेहरूलाई मध्य-फ्लाइटमै मार्ने कुरा थियो — तिनीहरू पहिलो बाइट्सअघि वैध रूपमा मिनेटौंसम्म चल्छन् — र यही कारणले expiration लाई `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) को रूपमा देखाइन्छ, जबकि क्यू बजेटले क्यू-टाइमआउट कोड बोक्छ। जुनसुकैलाई `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) वा ड्यासबोर्ड (**सेटिङहरू → रिजिलियन्स**) मार्फत ओभरराइड गर्नुहोस्। सामान्यीकरण गर्दा दुवै 1ms–24h मा क्ल्याम्प गरिन्छन्।

**दुवैका लागि प्राथमिकता:** env var ले _पूर्वनिर्धारित_ मात्र आपूर्ति गर्छ। `resilienceSettings.requestQueue` मा पर्सिस्ट गरिएको मान (ड्यासबोर्ड / API patch, `key_value` मा भण्डारित) ले त्यसलाई जित्छ, र प्रति-जडान `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ले अझ त्यसलाई जित्छ। त्यसैले, पहिल्यै पर्सिस्ट गरिएको मान भएको डिप्लयमेन्टमा env var सेट गर्नुले केही पनि फर्कंदैन — त्यसको सट्टा पर्सिस्ट गरिएको सेटिङ हटाउनुहोस् वा अद्यावधिक गर्नुहोस्।

क्यूमा बसोबास `maxWaitMs` द्वारा सीमाबद्ध छ; तलको `maxQueueDepth` ले एकैपटक कति कलरहरू क्यूमा रहन पाउँछन् भनी सीमाबद्ध गर्छ।

**बडी-वर्णित पुनःप्रयासहरू: पेसिङ बनाम लकआउट।** 429 बडीले आफ्नै प्रतीक्षा समय तोक्न सक्छ (Gemini `RetryInfo.retryDelay`, "retry after Ns" पाठ), जुन `updateFromResponseBody` ले पढ्छ। जडानको `maxWaitMs` भित्र फिट हुने प्रतीक्षा भनेको पेसिङ हो: लिमिटरले त्यति अवधिभर आफ्नो रिजर्भोइर खाली गर्छ र रिफिल हुँदा क्यू गरिएका कलहरू डिस्प्याच हुन्छन्। `maxWaitMs` भन्दा लामो प्रतीक्षा भनेको क्यूले बसेर सक्ने कुरा होइन — Gemini ले सकिएको दैनिक कोटाको जवाफ `retryDelay: "86399s"` ले दिन्छ। पुनःनिर्मित 429 (#16528) मा रिले गरिएको `Retry-After` ले फलब्याक इन्जिनलाई त्यो विन्डोभरि मोडेल लक गराइसक्छ, तर त्यसका लागि लिमिटर पनि रोक्नुले कुञ्जीमा चाँडै पुग्ने कुनै पनि कललाई (उदाहरणतः रिजिलियन्स रिसेटपछि) सम्पूर्ण `maxWaitMs` भरि अल्झाउनेछ। जब त्यस्तो प्रतीक्षा टाइप गरिएको Google `RetryInfo` विवरणबाट (`google_rpc_retry_info` प्रोभेनन्स) आउँछ र कुञ्जीको लिमिटर पहिल्यै मोडेलमा स्कोप गरिएको हुन्छ (`getLimiterKey` हेर्नुहोस्), त्यसबेला 429 त्यो जडानमा मोडेल लकआउटमा बदलिन्छ (`open-sse/services/rateLimitManager/bodyRetryPause.ts` मा `lockModelForLongBodyRetry`, 24h मा क्याप गरिएको), र लिमिटर नरोकिएकै छोडिन्छ। एकाउन्ट चयनले त्यो लकमा `isModelLocked()` मार्फत स्किप गर्छ, र त्यो जडानमा पिन गरिएका लक्ष्यहरूका लागि कम्बो प्रि-डिस्प्याच गेटले पनि त्यस्तै गर्छ। antigravity मा, जहाँ लिमिटर प्रति कोटा परिवार हुन्छ, लक ठ्याक्कै मोडेलमै हुन्छ, यसका अन्य कोटा लकहरूजस्तै। एलियासले क्लाइन्टले मागेको नामलाई त्यो मोडेलमा रिजल्भ गरेको छ भने त्यो नाम पनि लक हुन्छ, किनकि ती जाँचहरूले मागिएको नाम प्रयोग गर्छन्; यो ठ्याक्कै लक गरिन्छ (`lockExactModel`), त्यसैले antigravity कोटा परिवार वा codex स्कोप क्रस गर्ने एलियासले आफ्नैलाई कहिल्यै लक गर्दैन। प्रोज संकेत, अनटाइप गरिएको `retryDelay`, वा सम्पूर्ण जडानद्वारा साझा गरिएको लिमिटरले भने पज नै कायम राख्छ। जब 429 पाथले भर्खरै पुनःनिर्मित गरेको लिमिटर पज हुन्छ, जस कलरको बाँकी क्यू समय पज सकिनुअघि नै सकिन्छ, त्यसलाई त्यो समय पर्खिएर होइन, तुरुन्तै क्यू-टाइमआउट कोडसहित (`checkLimiterPause`) फर्काइन्छ; रेकर्ड गरिएको अन्त्य लिमिटर बन्नुअघि नै एन्कर गरिएको हुन्छ, जहाँ Bottleneck ले आफ्नो रिफ्रेस घडी सुरु गर्छ, र रिजर्भोइरमा पछि भएको कुनै पनि परिवर्तनले त्यसलाई बिर्सन्छ। `tests/unit/rate-limit-long-body-retry-lockout.test.ts` र `tests/unit/rate-limit-body-retry-pause.test.ts` द्वारा कभर गरिएको।

**`maxQueueDepth` — अप्ट-इन एडमिसन क्याप (नयाँ)।** `resilienceSettings.requestQueue.maxQueueDepth` ले एक प्रदायक+जडानका लागि एकैपटक कति अनुरोधहरू क्यूमा (अझै डिस्प्याच नभएका) रहन सक्छन् भनी सीमाबद्ध गर्छ। क्यूमा पहिल्यै `maxQueueDepth` अनुरोधहरू भएको बेला, नयाँ अनुरोध `limiter.schedule()` सम्म पुग्नु **अघि** नै टाइप गरिएको `code: "RATE_LIMIT_QUEUE_FULL"` त्रुटिसहित छिटो-अस्वीकृत हुन्छ — त्यसैले अस्वीकार सस्तो हुन्छ र त्यो अनुरोधका लागि कुनै पनि डाउनस्ट्रिम प्रम्प्ट-कम्प्रेसन / अनुवाद कार्यभन्दा अघि हुन्छ। पूर्वनिर्धारित `0` = अक्षम, हालको अप्रतिबन्धित-क्यू व्यवहार कायम राख्दै; 0–100000 मा सीमित। `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) वा `resilienceSettings.requestQueue.maxQueueDepth` (ड्यासबोर्ड/API patch) मार्फत ओभरराइड गर्नुहोस्।

एडमिसन जाँच आफैमा शुद्ध फंक्सन हो (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), त्यसैले यो वास्तविक Bottleneck लिमिटर बिना नै युनिट-परीक्षणयोग्य छ।

> #6593 खोल्ने RFC ले `bypassCompressionOnRateLimit` फ्ल्याग पनि प्रस्ताव गरेको थियो। यस रिपोको `open-sse/services/compression/` पाइपलाइन आउटबाउन्ड LLM अनुरोधमा प्रम्प्ट/सन्दर्भ कम्प्रेसन हो (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy` ब्लक वरिपरि), synthesized 429 बडीहरूमा HTTP रेस्पोन्स कम्प्रेसन होइन — शाब्दिक bypass फ्ल्यागका लागि मेल खाने कुनै कोड पाथ छैन। त्यो प्रम्प्ट-कम्प्रेसन चरण हाल अनुरोध पाइपलाइनमा `withRateLimit()` भन्दा _अघि_ चल्छ, त्यसैले queue-full अस्वीकृतिमा यसलाई छोड्न पुनःक्रमण गर्नु यस इस्यूको दायराभन्दा फरक, ठूलो परिवर्तन हो; यसलाई जानाजानी यहाँ कार्यान्वयन गरिएको **छैन** र CPU-बचत लाभ पुनःक्रमण जोखिमभन्दा सार्थक छ कि भनेर follow-up को रूपमा छोडिएको छ।

### दर-सीमा स्वतः-सक्षम सुरक्षा जाल र जडान सुरक्षा (`rateLimitProtection`)

**स्वतः-सक्षम सुरक्षा जाल** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, डिफल्ट `true`):
डिफल्ट रूपमा, OmniRoute ले सबै सक्रिय API-key प्रोभाइडर जडानहरूका लागि दर-सीमा queue सुरक्षा स्वतः सक्षम गर्छ (`getProviderCategory(provider) === "apikey"`)। यसले दर-संवेदनशील अपस्ट्रिम API key हरूतर्फ आउने अनुरोधहरू अपस्ट्रिम 429 त्रुटिहरूमा burst हुनुको सट्टा Bottleneck मार्फत queue र throttle हुन्छन् भनी सुनिश्चित गर्छ। सुरक्षा जाललाई `RATE_LIMIT_AUTO_ENABLE` वातावरण चर मार्फत ओभरराइड गर्न सकिन्छ (`false`/`0`/`off` ले असक्षम गर्छ, `true`/`1`/`on` ले बलपूर्वक सक्षम गर्छ), जसले निरन्तर ड्यासबोर्ड सेटिङभन्दा प्राथमिकता लिन्छ (**सेटिङ → Resilience** / `PATCH /api/resilience`)।

**प्रति-जडान `rateLimitProtection` को शब्दार्थ:**
प्रति-जडान दर-सीमा सुरक्षा प्रोभाइडर जडानहरूमा `rateLimitProtection` बुलियन फिल्ड मार्फत ट्र्याक गरिन्छ (SQLite मा `rate_limit_protection` को रूपमा निरन्तर):

- **स्पष्ट सक्षम (`rateLimitProtection === true`)**: प्रोभाइडर कोटि वा स्वतः-सक्षम सुरक्षा जाल सक्रिय छ कि छैन भन्ने कुराबाहेक, यस जडानका लागि दर-सीमा सुरक्षा स्पष्ट रूपमा सक्षम गरिएको छ।
- **स्पष्ट असक्षम (`rateLimitProtection === false`)**: स्पष्ट सुरक्षा असक्षम गर्छ, तर सक्रिय API-key जडानलाई विश्वव्यापी स्वतः-सक्षम सुरक्षा जालबाट **बाहिर निकाल्दैन**। `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) मा, `false` र `undefined` समान हुन्: केवल `rateLimitProtection === true` लाई मात्र स्पष्ट ओभरराइडको रूपमा लिइन्छ। यदि `rateLimitProtection` `false` छ (वा सेट गरिएको छैन), सक्रिय API-key जडानले अझै स्वतः-सक्षम सर्त मेल खान्छ र दर-सीमा सुरक्षित नै रहन्छ।
- **कुनै प्रति-जडान opt-out छैन**: अपरेटरले हाल अरूका लागि स्वतः-सक्षम सक्रिय राख्दै "यो एकल सक्रिय API-key जडान दर-सीमा queue सुरक्षाबिना चल्नुपर्छ" भनी व्यक्त गर्न सक्दैन। API-key जडानहरूलाई दर-सीमा queue बिना पूर्ण रूपमा चलाउन, सुरक्षा जाल विश्वव्यापी रूपमा बन्द गर्नुपर्छ (`RATE_LIMIT_AUTO_ENABLE=false` वा `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)।

**समर्थित लेखन पाथहरू:**

- **`POST /api/rate-limits`**: कुनै जडानका लागि `rateLimitProtection` टगल गर्ने समर्थित व्यवस्थापन लेखन पाथ (`{ connectionId: string, enabled: boolean }`)। यसलाई `enabled: true` सँग कल गर्दा स्पष्ट सुरक्षा सक्षम हुन्छ; `enabled: false` सँग कल गर्दा स्पष्ट सुरक्षा हटाइन्छ (यद्यपि स्वतः-सक्षम सक्रिय भएमा सक्रिय API-key जडानहरू विश्वव्यापी सुरक्षा जालअन्तर्गत नै रहन्छन्)।
- **`PUT /api/providers/[id]`**: जानाजानी `rateLimitProtection` स्वीकार वा फ्लिप गर्दैन (#11278)। `PUT /api/providers/[id]` मार्फत प्रोभाइडर जडान मेटाडेटा अद्यावधिक गर्दा निरन्तर दर-सीमा सुरक्षा स्थिति कहिल्यै परिवर्तन हुँदैन।

---

## 6. ढिलो-स्ट्रिम थ्रुपुट वाचडग (#9709)

वैकल्पिक `resilienceSettings.streamRecovery.throughputWatchdog` गार्डले अपस्ट्रिम पत्ता लगाउँदछ जसले अझै पनि भागहरू पठाउँदैछ तर कन्फिगर गरिएको उपयोगी-आउटपुट दर तल सहायक उत्पादन उत्पादन गर्दैछ। यो जानाजानी निष्क्रिय टाइमआउटबाट अलग छ: हृदयघात र मेटाडेटा रिसेट न त टाइमर र प्रगतिको रूपमा गणना गर्दैन। यो कडा प्रयासको अन्तिम मिति (#9153) बाट पनि फरक छ, जुन आउटपुट गुणस्तरको पर्वाह नगरी पूर्ण सुरक्षा छत रहन्छ।

वाचडगले गर्भपतन गर्न सक्नु अघि पूर्ण रोलिङ विन्डो पछि वार्म-अप अवधि चाहिन्छ। यसले च्याट पूर्णता र प्रतिक्रियाहरू API आउटपुट घटनाहरू (एक रूढ़िवादी UTF-8 बाइट प्रोक्सी) बाट पाठ डेल्टा गणना गर्दछ, प्रयोग-मात्र र खाली घटनाहरूलाई बेवास्ता गर्छ, र उपकरण-कल वा तर्क घटनाहरू उडानमा हुँदा निर्णय निलम्बन गर्दछ। यो पूर्वनिर्धारित रूपमा असक्षम गरिएको छ र `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` सँग सक्षम गर्न सकिन्छ (त्यो env मानले पूर्वनिर्धारित — बचत गरिएको `resilienceSettings.streamRecovery.throughputWatchdog.enabled` बुलियन जीतहरू मात्र दिन्छ; यस गाइडको शीर्षमा env-vs-ड्यासबोर्ड प्राथमिकता नोट हेर्नुहोस्); सञ्झ्याल, वार्म-अप, न्यूनतम दर, र न्यूनतम मापनयोग्य आउटपुट सामान्य लचिलोपन-सेटिङहरू सामान्यीकरण तहद्वारा बाँधिएका छन्।

सक्षम हुँदा, एक वाचडग रद्द गर्ने सक्रिय अपस्ट्रीम प्रयासमा मात्र लागू हुन्छ। कुनै पनि क्लाइन्ट-दृश्य बाइट्स अघि, अवस्थित समान खाता प्रारम्भिक-रिकभरी मार्गले प्रयास पुन: खोल्न सक्छ। प्रतिबद्धता पछि, स्ट्रिम कहिल्यै अन्धाधुन्ध पुन: प्ले हुँदैन; अवस्थित सुरक्षित मध्य-स्ट्रिम निरन्तरता सम्झौताले मात्र प्रत्यय स्टिच गर्न सक्छ। फाइनलाइजेशन एकल-शट रहन्छ, त्यसैले उपयोग लेखा र सेमाफोर रिलीज दोहोरिएको छैन।

---

## 7. अपस्ट्रिम स्थिति पुनःनिर्धारण (गलत रूपमा बताइएका कोटा त्रुटिहरू)

**दायरा:** अस्थायी कोटा समाप्ति गलत HTTP स्थिति सहित रिपोर्ट गर्ने एउटा अपस्ट्रिम गेटवे।

**उद्देश्य:** वर्गीकरण हुनुअघि भ्रामक स्थिति सच्याउनु, ताकि डाउनस्ट्रिम उपभोक्ताहरू (फलब्याक इन्जिन, कम्बो एग्रिगेसन, क्लाइन्ट-सामना गर्ने प्रतिक्रिया) ले विफलताको वास्तविक पुनःप्रयासयोग्य प्रकृति देखून्।

केही गेटवेहरूले अस्थायी कोटा समाप्तिलाई पुनःप्रयास गर्न नमिल्ने HTTP
स्थितिसहित संकेत गर्छन्। `agentrouter.org` ले मानक `429` को सट्टा चिनियाँ
बडी (`用户额度不足` / `额度不足`) सहित `403` (कहिलेकाहीँ `400`) फर्काउँछ। Claude
Code जस्ता क्लाइन्टहरूले `403` लाई स्थायी मानेर सत्र रद्द गर्छन्, र सुधार
नगरेमा फलब्याक इन्जिनले यसलाई कोटा घटनाको सट्टा `AUTH_ERROR` का रूपमा वर्गीकरण
गर्नेछ।

**कार्यान्वयन:**

- रजिस्ट्री + म्याचर: `open-sse/config/upstreamStatusRestatement.ts` — नियमहरूको
  प्रति-प्रदायक सूची (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` मार्फत
  मिलान गरिन्छ।
- कल साइट: `open-sse/handlers/chatCore.ts` को `providerFailure:` ब्लक
  (करिब लाइन 3654), `parseUpstreamError()` ले त्रुटि HTTP स्थिति भएको अपस्ट्रिम
  प्रतिक्रिया (`!providerResponse.ok`) पार्स गरेलगत्तै, र कुनै पनि वर्गीकरण
  चल्नुअघि। यसरी हरेक डाउनस्ट्रिम उपभोक्ताले सच्याइएको स्थिति देख्छ। `200` SSE
  स्ट्रिमभित्र समावेश भएका त्रुटिहरू छुट्टै, पछिल्लो स्ट्रिम-पार्सिङ मार्गबाट
  जान्छन् र आज यो हुकअन्तर्गत **पर्दैनन्** — यो ज्ञात सीमा हो, र agentrouter को
  गलत स्थितिका लागि (जो त्रुटि HTTP स्थितिका रूपमा सतहमा आउँछ) हाल आवश्यक छैन।
- पुनःप्रयासयोग्यता: `429` `RETRY_AFTER_ELIGIBLE_STATUSES` मा
  (`open-sse/services/combo/unavailableRetryGate.ts`) समावेश छ, त्यसैले
  पुनःनिर्धारित त्रुटिले निष्क्रिय `403` का रूपमा सतहमा आउनुको सट्टा वास्तविक
  पुनःप्रयास समयखण्ड बोक्छ।
- कृत्रिम `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) ले
  पुनःनिर्धारित प्रतिक्रियाले **क्लाइन्ट**लाई बताउने कुरा मात्र जनाउँछ; यो
  आफैंमा कनेक्सनको आन्तरिक कूलडाउन/लकआउट अवधि होइन — त्यो पुनःनिर्धारित
  त्रुटिलाई वास्तवमा सम्हाल्ने संयन्त्रअनुसार छुट्टै नियन्त्रित हुन्छ
  (Connection Cooldown को बढ्दो ब्याकअफ, §2, API-key प्रदायकहरूका लागि आधार
  `3s`; वा प्रति-मोडेल-कोटा प्रदायकहरू, जस्तै agentrouter, का लागि Model
  Lockout, §3)। राउटरले क्लाइन्टलाई घोषणा गरेको 60s समयखण्डभन्दा चाँडै
  आन्तरिक रूपमा पुनःप्रयास गर्न योग्य हुन सक्छ — यो जानाजानी राखिएको अतिरिक्त
  समय हो, बग होइन।

स्थायी त्रुटिहरू (agentrouter को `无权访问模型` — यो मोडेलमा पहुँच छैन) लाई
**कहिल्यै पनि** पुनःनिर्धारित गरिँदैन: `textMarkers` मिल्दा पनि
`excludeMarkers` ले नियमलाई अस्वीकार गर्छ, त्यसैले त्रुटिले आफ्नो मूल स्थिति
कायम राख्छ र यसलाई कहिल्यै अनन्त रूपमा पुनःप्रयास गरिँदैन। मिल्दो प्रदायक
वर्गीकरण नियम (`open-sse/config/providerErrorRules.ts` मा
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
घोषित `6h` आधार कूलडाउन) लाई `checkFallbackError`
(`open-sse/services/accountFallback.ts`) ले सामान्य apikey-श्रेणीको
`FORBIDDEN` प्रारम्भिक फिर्ताअघि _हेर्छ_, र
`honorsRuleLockScope(provider)` (#10334 — हाल
`providerErrorRules.ts` मा रहेको `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
अनुमतिसूचीमार्फत agentrouter-मा मात्र लागू) द्वारा नियन्त्रित हुन्छ। नियमको
घोषित 6h कूलडाउन `fallbackResult.baseCooldownMs` का रूपमा प्रवाहित हुन्छ,
तर यसले अझै पहिलेदेखिकै प्रति-मोडेल-कोटा लकआउट मार्ग
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`) मा प्रवेश गर्छ
(#10334 ले कूलडाउनको स्रोतबाहेक यसमा कुनै परिवर्तन गरेको छैन): हरेक अन्य मोडेल
लकआउटझैँ यसलाई अपरेटरको `mlSettings.maxCooldownMs` (पूर्वनिर्धारित
`1_800_000ms` / 30 मिनेट) सम्म घटाइन्छ, र _स्थायी लकआउट कारण_ नियमको
`"auth_error"` होइन, पहिलेदेखि हार्डकोड गरिएको `"forbidden"` नै रहन्छ —
अर्थात् कूलडाउन अवधि मात्र सुरुदेखि अन्त्यसम्म मानिन्छ, कारण स्ट्रिङ होइन।
कनेक्सन आफैं सक्रिय रहन्छ; एउटै कनेक्सनका सहोदर मोडेलहरू प्रभावित हुँदैनन्।

पुनःनिर्धारित कोटा त्रुटिहरू (`额度不足`) उत्पादनमा प्रदायक नियममा
पुग्छन् (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, आफ्नै घोषित कूलडाउन छैन — persistence तहको मापन गरिएको
पूर्वनिर्धारित ब्याकअफ लागू हुन्छ)। #10334 देखि
`ProviderErrorRuleMatch` मा रहेको `scope` सुरुदेखि अन्त्यसम्म प्रयोग हुन्छ,
तर **`HONORS_RULE_LOCK_SCOPE_PROVIDERS` अनुमतिसूचीमा रहेका प्रदायकहरूका लागि
मात्र** (`providerErrorRules.ts` — आज `"agentrouter"` मात्र,
`honorsRuleLockScope()` मार्फत नियन्त्रित)। अन्य प्रत्येक प्रदायकका लागि
`scope` #10334 अघिजस्तै जानकारीमूलक मात्र रहन्छ।
`checkFallbackError` ले मिलेको नियमको scope लाई
`fallbackResult.ruleScope` का रूपमा सतहमा ल्याउँछ;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) साझा
गार्ड हो, जसले `ruleScope` लाई कनेक्सन-व्यापी, आफैं पुनःप्राप्त हुने सङ्केतका
रूपमा मान्न वास्तवमै सुरक्षित छ कि छैन पुष्टि गर्छ (scope `"connection"`,
reason `quota_exhausted`, कहिल्यै `permanent` होइन, कहिल्यै
`creditsExhausted` होइन — भविष्यमा scope `"connection"` लाई स्थायी खाता
अवस्थासँग जोडिने सम्भावनाविरुद्धको सुरक्षा)। यसलाई दुई उपभोक्ताहरूले
कल गर्छन्:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider को **per-model** lockout शाखामा जाने सट्टा (agentrouter मा `passthroughModels: true` → `hasPerModelQuota()`
  ले `true` फर्काउँछ), यसले **temporary connection cooldown** लागू गर्छ —
  `testStatus: "unavailable"` + `rateLimitedUntil`, कहिल्यै terminal status
  (`credits_exhausted`/`banned`/`expired`) होइन — त्यसैले म्यानुअल credential reset आवश्यक नपरी cooldown समाप्त भएपछि connection आफैँ पुनः
  सञ्चालनमा आउँछ।
  `disableCooling: true` भएका connections (#2997) का लागि यो छोडिन्छ: त्यो opt-out ले यसको सट्टा per-model lockout मा जान्छ (यो दस्तावेजीकृत trade-off हो —
  branch माथिको code comment हेर्नुहोस्)।
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): यही guard ले connection लाई memory भित्रको `exhaustedConnections` set मा पनि राख्छ, जसको key
  `${provider}:${connectionId}` हुन्छ। यसले आफ्नै target object मा ठ्याक्कै त्यही `connectionId` पहिले नै बोकेको बाँकी SAME-REQUEST target मात्र skip गर्छ
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` lookup अघि `if (provider &&
connectionId)`) — साधारण model-list combo मा sibling targets ले आफ्नै pinned `connectionId` नबोक्ने र प्रत्येकलाई response को
  `X-OmniRoute-Selected-Connection-Id` header बाट हरेक dispatch मा मात्र resolve गरिने भएकाले, त्यसले यो key match कहिल्यै भेट्दैन। यस्तो सामान्य अवस्थामा, बाँकी leg ले भर्खरै exhausted भएको account पुनः प्रयोग नगर्ने वास्तविक सुरक्षा यो Set होइन — माथिको persistence layer हो (connection को `rateLimitedUntil` अहिले भविष्यको समयमा छ), र failure का लागि यही guard ले `transientRateLimitedProviders` लाई suppress गर्नु पनि हो (`targetExhaustion.ts` मा "Two-stage design" र
  `isAgentrouterConnectionQuotaScope` branch माथिको code comment हेर्नुहोस्): Set लाई unmarked राखिएकाले, `combo.ts` को
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider का बाँकी legs का लागि सक्रिय हुँदैन। त्यसैले credential selection को
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) सामान्य रूपमा लागू हुन्छ, र बाँकी leg ले फरक, अझै eligible agentrouter
  connection रोज्छ वा credentials उपलब्ध नभएको कारण असफल हुन्छ — यस branch ले भर्खर cooldown मा राखेको connection मा जबर्जस्ती फर्किँदैन।

### दुई-चरणीय डिजाइन: status restatement, त्यसपछि classification

Status restatement (`upstreamStatusRestatement.ts`) र provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) provider id र text markers मा आधारित हुने छुट्टाछुट्टै registries हुन्, तर तिनीहरू फरक स्थानमा चल्छन् र फरक उद्देश्य पूरा गर्छन्: restatement ले `chatCore.ts` मा HTTP status लाई प्रारम्भमै पुनर्लेखन गर्छ;
classification rules ले `checkFallbackError()` (`open-sse/services/accountFallback.ts`) भित्र fallback `reason` चयन गर्छन् र `scope`
(`model` / `provider` / `connection`) lock गर्छन्।

Classification rules ले `providerErrorRules.ts` को
`FULL_TEXT_RULE_PROVIDERS` allowlist मा सूचीकृत providers का लागि मात्र पूरा error **text** देख्छन् (body markers जस्तै `额度不足` मिलाउन आवश्यक) — हाल `"agentrouter"` मात्र। अन्य सबै **built-in catalog** providers का लागि, `checkFallbackError` ले
`getProviderErrorRuleMatch` लाई structured error (`{code, type}`) मात्र दिन्छ, जुन header/status/code-आधारित rules का लागि पर्याप्त भए पनि body-text markers का लागि अन्धो हुन्छ।
सहायक `resolveRuleMatchBody()` ले यो छनोट गर्छ: allowlisted providers का लागि पूरा error text, अन्यथा structured error।
**built-in** provider लाई `FULL_TEXT_RULE_PROVIDERS` मा थप्नु स्पष्ट per-provider opt-in हो — सूचीमा नभएका प्रत्येक provider का लागि default path byte-for-byte अपरिवर्तित रहोस् भनेर यो व्यवस्था गरिएको हो।

कुनै rule को `scope` (`model` / `provider` / `connection`) `FULL_TEXT_RULE_PROVIDERS` बाट अलग opt-in हो: `checkFallbackError` ले यसलाई केवल `fallbackResult.ruleScope` का रूपमा बाहिर ल्याउँछ, र downstream consumers ले यसलाई informational label भन्दा बढीका रूपमा उही file को
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मा रहेका providers का लागि मात्र मान्छन् (`honorsRuleLockScope()` मार्फत gated — आज `"agentrouter"` मात्र)। Provider उक्त allowlist मा परेपछि `scope: "connection"` match ले वास्तवमा के गर्छ भन्ने विवरणका लागि माथिको "Restated quota
errors" हेर्नुहोस्।

**#11104 — operator-declared rules ले दुवै allowlists लाई bypass गर्छन्।** Operator ले यो file सम्पादन नगरी runtime मा `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
मार्फत per-provider rule घोषणा गर्न सक्छ। Operator rule लाई `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — **default** built-in catalog rules को व्यवहार सुरक्षित गर्न बनाइएका allowlists — पछाडि राख्दा, पहिले नै सूचीमा रहेका providers बाहेक सबैका लागि settings mechanism निष्क्रिय हुने थियो, किनकि rule घोषणा गर्नु नै operator को स्पष्ट opt-in हो।
`resolveRuleMatchBody()` र `honorsRuleLockScope()` दुवैले पहिले `hasOperatorRuleForProvider()` जाँच गर्छन्: operator rule भएको provider ले raw error text पाउँछ र त्यसको घोषित `scope` लाई मानिन्छ, त्यो दुवै allowlist मध्ये कुनैमा परे पनि नपरे पनि।

**Operator-declared rules** (`OperatorProviderErrorRule`): प्रत्येक rule मा वैकल्पिक `status` र वैकल्पिक `match` हुन्छ (error text को साधारण, case-insensitive substring; कहिल्यै RegExp होइन, त्यसैले ReDoS गराउन सक्दैन), र यी दुईमध्ये कम्तीमा एउटा सेट गरिएको हुनुपर्छ। दुवै सेट भए तिनीहरू AND गरिन्छन्; कुनै field नदिइएमा त्यसले जुनसुकै कुरासँग match गर्छ, त्यसैले `{match: "insufficient_quota"}` ले त्यो code बोकेको जुनसुकै status सँग match गर्छ। पहिलो match हुने rule लागू हुन्छ। `cooldownMs` ले बढीमा 30 दिनसम्म स्वीकार गर्छ; कुलमा बढीमा 50 rules हुन सक्छन्।

**सबैमा लागू हुने डिफल्टहरू** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` मार्फत सेट गरिने): `{[provider]: {cooldownMs, scope?, reason?}}`
जहाँ `cooldownMs` 1 मिनेटदेखि 30 दिनसम्म हुन्छ। कुनै operator नियम र कुनै built-in catalog नियम मेल नखाएपछि मात्र, र 402, 403, 408,
429 तथा 5xx त्रुटिहरूमा मात्र डिफल्ट लागू हुन्छ। Request-shape त्रुटिहरू (400, 404, 409, 413, 422) र खाली
401 हरूको आफ्नै handling कायम रहन्छ। स्पष्ट `reason` नदिइएमा, `classifyError` ले गरेजस्तै status बाट reason आउँछ। डिफल्ट घोषणा गर्दा
`hasOperatorRuleForProvider()` का लागि त्यो operator नियम मानिन्छ, त्यसैले यसको `scope` (डिफल्ट
`"connection"`) लागू हुन्छ। डिफल्टको प्रभावकारी cooldown यसको `cooldownMs` र provider को आफ्नै retry hint (`Retry-After`,
`x-ratelimit-reset` वा body मा रहेको reset hint — connection-cooldown setting "use upstream retry hints" सक्रिय हुँदा engine ले
मान्ने उही hint) मध्ये लामो हुने गरी निर्धारण हुन्छ। त्यसैले डिफल्टले छोटो upstream hint लाई लम्ब्याउन सक्छ, तर वास्तविक reset लाई
कहिल्यै छोट्याउन सक्दैन। स्पष्ट operator नियमले यसको ठ्याक्कै `cooldownMs` कायम राख्छ। कुनै नियम वा डिफल्टले
`markAccountUnavailable` का connection-cooldown guards लाई bypass गर्दैन: सक्रिय, लामो cooldown कहिल्यै छोट्याइँदैन र terminal status कहिल्यै
overwrite गरिँदैन। `checkFallbackError` मा पहिले चल्ने built-in text detectors (credits exhausted, daily quota, account deactivated) ले
आफ्ना phrase हरूका लागि अझै प्राथमिकता पाउँछन्।

**ज्ञात कमी — `providerRuleRegistry` HTTP 400 का लागि कहिल्यै consult गरिँदैन।**
`checkFallbackError` को `BAD_REQUEST` branch ले status 400 लाई पूर्ण रूपमा आफ्नै pattern arrays
(`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` आदि `accountFallback.ts` मा) मार्फत classify गर्छ र त्यसभन्दा माथि रहेको
`configuredRule`/`getProviderErrorRuleMatch` branch पुग्नुअघि नै return गर्छ।
`status: 400` भएको built-in catalog rule (वा operator rule) syntactically valid भए पनि कहिल्यै चल्दैन।
हाल कुनै existing rule ले 400 लाई target गरेको छैन, त्यसैले production मा केही प्रभावित हुँदैन — तर भविष्यको 400 rule का लागि
पहिले यो branch मा परिवर्तन आवश्यक हुनेछ। यो केवल rule थप्नुभन्दा ठूलो परिवर्तन हो, किनकि यसले pattern-array
behavior मा निर्भर प्रत्येक provider का लागि 400 को पुनःclassification गर्छ, र एउटै provider rule addition को scope बाहिर पर्छ।

### नयाँ quota-misstating gateway थप्ने

1. `statusRestatementRegistry` मा एउटा rule array दर्ता गर्नुहोस्
   (`open-sse/config/upstreamStatusRestatement.ts`)। `textMarkers` लाई provider-specific राख्नुहोस्; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) सँग ठोक्किने generic English phrases कहिल्यै पुनःप्रयोग नगर्नुहोस्।
2. सही lock scope रोज्नका लागि classification rules वैकल्पिक रूपमा
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) मा दर्ता गर्नुहोस्
   (account-wide quota का लागि `connection`, per-model errors का लागि `model`)। यो चरण production मा ती provider हरूका लागि मात्र प्रभावकारी
   हुन्छ जसका rules लाई full error text आवश्यक हुन्छ (body markers): सोही file मा `FULL_TEXT_RULE_PROVIDERS` मा provider id थप्नुहोस् —
   अन्यथा `checkFallbackError` ले rule लाई structured
   `{code, type}` error मात्र दिन्छ र body-text rule live traffic मा कहिल्यै match हुँदैन।
   `status`/`headers` मा मात्र match हुने rules (जस्तै Opencode का वा Minimax का) लाई यो opt-in आवश्यक पर्दैन। छुट्टै रूपमा, यदि rule ले
   `scope: "connection"` घोषणा गर्छ र उद्देश्य वास्तविक connection-wide cooldown साथै same-request combo skip हो (केवल informational label होइन) भने,
   सोही file मा `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मा provider id थप्नुहोस् — यही कुराले
   `isAgentrouterConnectionQuotaScope()`-शैलीको consumption लाई
   `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) र
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) मा gate गर्छ; यो बिना `scope`
   अझै `fallbackResult.ruleScope` मार्फत प्रवाह हुन्छ, तर त्यसमा आधारित कुनै कार्य हुँदैन।
3. `tests/unit/upstream-status-restatement.test.ts`
   र `tests/unit/agentrouter-error-rules.test.ts` लाई अनुकरण गर्दै unit tests थप्नुहोस् (यसमा
   not-permanent / not-creditsExhausted guards पनि समावेश गर्नुहोस्, र — यदि provider लाई allowlist आवश्यक छ भने —
   `resolveRuleMatchBody()` ले सो provider का लागि मात्र full text फर्काउँछ भन्ने test पनि थप्नुहोस्)।

`chatCore.ts`, `classifyError`, वा combo मा कुनै परिवर्तन आवश्यक छैन।

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) का provider हरूलाई IP-bucketed upstream का रूपमा व्यवहार गरिन्छ
(opencode free tier account-bucketed नभई IP-bucketed छ — #9611 हेर्नुहोस्): status-429 लाई
`quota_exhausted`
**वा** `rate_limit_exceeded` का रूपमा classify गरिएमा, rotation ले तिनीहरूलाई प्रयास गर्नुअघि
असफल connection को अन्तिम ज्ञात egress IP सँग मिल्ने last known egress IP भएका प्रत्येक allowlisted-family connection लाई cooldown गरिन्छ
— N-1 वटा निश्चित रूपमा असफल हुने upstream calls बाट बच्न ( #10460/#10525 जस्तै संरचना)।
`rate_limit_exceeded` जानाजानी समावेश गरिएको हो: `markAccountUnavailable` path मा opencode-specific rules कहिल्यै match हुँदैनन्
(`checkFallbackError` लाई headers/body दिइँदैन, opencode `FULL_TEXT_RULE_PROVIDERS` मा छैन), त्यसैले subscription-quota text
("monthly usage limit reached") भएको 429 को body लाई `status_429` rule पुग्नुअघि quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) ले `quota_exhausted` का रूपमा classify गर्छ — जबकि
quota-text नभएको 429 (साधारण rate limiting) `status_429` rule मार्फत `rate_limit_exceeded` का रूपमा classify हुन्छ र IP family लाई
अझै cooldown गर्छ। Allowlisted provider का लागि IP-bucketed rate limit exhausted quota कै समान signal हो। इमानदार सीमाहरू:

- **सर्वोत्तम प्रयास**: लकले `proxy_logs` बाट (24 घण्टाको विन्डो, synchronous, कुनै cache बिना) connection को अन्तिम ज्ञात `egress_ip` समाधान गर्छ। Cold cache (`egress_ip` कहिल्यै probe नगरिएको) वा कुनै row नभएमा → असफल connection लाई branch ले अझै cooldown गर्छ (आजजस्तै record गरिन्छ), केवल कुनै sibling लक हुँदैन।
- **कहिल्यै अन्तिम हुँदैन**: cooldown नवीकरण हुने quota window हो (`testStatus: "unavailable"`); IP-स्तरको signal बाट स्थायी state कहिल्यै निकालिँदैन। `disableCooling` भएका connections ले branch पूर्ण रूपमा छोड्छन्।
- **allowlisted family का लागि lock granularity परिवर्तन हुन्छ**: यो केवल sibling optimization होइन, scope परिवर्तन हो। opencode एउटा `passthroughModels` provider भएकाले, यो branch अघि 429 ले प्रति-MODEL lockout उत्पन्न गर्थ्यो; अब यसले connection cooldown उत्पन्न गर्छ — कुनै sibling नै नभएको एउटा connection मात्र चलाउने operator का लागि समेत। opencode को rule table ले पहिले नै सही भनेर घोषणा गरेको granularity यही हो (`scope: "connection"`, `providerErrorRules.ts`), तर opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मा नभएकाले अहिलेसम्म कहिल्यै लागू भएको थिएन। Branch ले असफल connection को cooldown + `backoffLevel` आफैं लेख्छ, connection-scoped agentrouter branch को अनुकरण गर्छ, र return गर्छ — त्यसपछि प्रति-model block र तलको generic path कहिल्यै पुगिँदैन।
- **Combo समावेश**: agentrouter branch जस्तै, scope ले combo caller ले 429 मा लागू गर्ने `persistUnavailableState`/`isCombo` downgrade लाई जानाजानी बेवास्ता गर्छ। प्रति-model lockout यो scope को कमजोर रूप होइन, गलत unit हो: यसले समाप्त भएको IP बारे केही बताउँदैन, त्यसैले combo rotation ले प्रत्येक sibling का लागि निश्चित रूपमा असफल हुने एउटा call गर्दै जानेछ।
- **Sibling सुरक्षा**: पहिले नै terminal (banned/credits_exhausted) भएको वा पहिले नै लामो cooldown मा रहेको sibling लाई कहिल्यै overwrite गरिँदैन।
- **विशेष allowlist मात्र**: `EGRESS_BUCKETED_LOCK_PROVIDERS` फराकिलो बनाउने निर्णय सम्बन्धित owner को स्पष्ट निर्णय हो; कुनै generic wiring छैन (pattern #10334/#10419)। Sibling query ले त्यही allowlist लाई bind गर्छ, SQL literal का रूपमा दोहोर्याउँदैन, त्यसैले यसलाई फराकिलो बनाउनु एक-पङ्क्तिको परिवर्तनमै सीमित रहन्छ।
- **Egress IP rotation, दुवै दिशामा**: lookup window (24 घण्टा) egress-IP cache TTL (5 मिनेट) भन्दा निकै फराकिलो छ, त्यसैले “अन्तिम ज्ञात IP” इतिहास हो, हालको state होइन। यदि window भित्र connection को proxy rotate भयो भने lock ले वास्तविक रूपमा साझा IP **छुटाउन सक्छ** (record गरिएको IP नयाँ र अझै exhausted नभएको हुन्छ) — र त्यसैगरी exhausted IP बाट त्यसपछि rotate भएर टाढा गइसकेको sibling लाई **cooldown गर्न सक्छ**। दोस्रो अवस्थाले त्यस sibling लाई एउटा cooldown window को लागत लगाउँछ; दुवै इतिहासमा आधारित lookup का स्वीकार्य best-effort सीमाहरू हुन्।
- **लागत**: `proxy_logs` का दुईवटा bounded scan ( `idx_pl_timestamp` मार्फत window-filtered), केवल 429 frequency मा। कुनै नयाँ index छैन (migration 134 YAGNI)। मध्यम आकारको वास्तविक-traffic DB copy मा मापन गरिएको; high-throughput instance ले उही window मा अनुपातिक रूपमा धेरै rows राख्छ।

## अन्य लचिलोपन सुविधाहरू

- **22 मार्ग रणनीतिहरू** (प्राथमिकता, भारित, राउन्ड-रोबिन, सन्दर्भ-रिले, फिल-फर्स्ट, p2c, अनियमित, कम से कम प्रयोग गरिएको, लागत-अनुकूलित, रिसेट-अवेयर, रिसेट-सञ्झ्याल, म्याद-पहिलो, हेडरूम, कोटा-भारित, कडा-यादृच्छिक, स्वत:, lkgp, सन्दर्भ-अनुकूलित, पाइपलाइन अप्टिमाइज्ड, पाइपलाइन अप्टिमाइज गरिएको) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) हेर्नुहोस्।
- **रिसेट-सचेत मार्ग** (v3.8.0) — ले कोटा रिसेट समयद्वारा जडानहरूलाई प्राथमिकता दिन्छ।
- **पृष्ठभूमि मोड गिरावट** — प्रतिक्रियाहरू API `background: true` चेतावनीसँग सिंक गर्नको लागि घटाइयो।
- **गतिशील उपकरण सीमा पत्ता लगाउने** — ले प्रदायकहरूलाई बन्द गर्छ जब उपकरण गणना सीमा हिट हुन्छ।
- **आपतकालीन गिरावट** — `OMNIROUTE_EMERGENCY_FALLBACK` द्वारा नियन्त्रित; अपरेटरहरूले यसलाई पुन: सुरु नगरी फिचर फ्ल्याग पृष्ठबाट ओभरराइड गर्न सक्छन्।

---

## डिबगिङ

- Weighted कम्बोले `503 all_targets_cooling_down` जवाफ दिन्छ (`Retry-After` सेट गरिएको, `diagnostics.excluded` ले प्रत्येक टार्गेटलाई `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` सहित सूचीबद्ध गर्छ) → पुल कन्फिगर र जडान भएकै छ, प्रत्येक टार्गेट रिजिलियन्स टाइमरले बहिष्कृत गरिएको मात्र हो; `[COMBO] Weighted selection: every target excluded before dispatch — …` चेतावनीले कारणहरू र बाँकी सेकेन्डहरू उल्लेख गर्छ। उही कम्बोबाट आएको `404 no_executable_targets` भनेको कुनै रिजिलियन्स टाइमर संलग्न थिएन (चलाउन केही छैन, वा प्रत्येक खाता उपलब्धता प्रोबमा असफल भयो)। `targetResolution.ts` मा संकलन गरिएका बहिष्करणहरूबाट `open-sse/services/combo/pinRecovery.ts` मा निर्मित।
- कुनै प्रोभाइडरका सबै कुञ्जीहरू छोडियो → सर्किट ब्रेकर स्थिति र प्रत्येक कनेक्सनको `rateLimitedUntil`/`testStatus` दुवै जाँच्नुहोस्।
- रिसेट विन्डोपछि प्रोभाइडर स्थायी रूपमा बहिष्कृत → `getStatus()`/`canExecute()` को सट्टा कच्चा `state` पढिरहेको कोड।
- एउटा कुञ्जी असफल भयो, अरूले काम गर्नुपर्ने → सर्किट ब्रेकरभन्दा कनेक्सन कुलडाउनलाई प्राथमिकता दिनुहोस्।
- एउटा मात्र मोडेल असफल भयो → कनेक्सन कुलडाउनभन्दा मोडेल लकआउटलाई प्राथमिकता दिनुहोस्।
- स्थिति आफैं रिकभर हुनुपर्ने तर हुँदैन → भविष्यको टाइमस्ट्याम्प + समाप्त भएको स्थिति रिफ्रेस गर्ने रिड पाथ जाँच्नुहोस्। स्थायी स्थितिहरूमा म्यानुअल परिवर्तन आवश्यक हुन्छ।

---

## रनटाइम स्थिति — एजेन्ट द्रुत सन्दर्भ

> एजेन्ट गाइड 40k कन्टेक्स्ट बजेटभित्र रहने गरी `AGENTS.md` → "Resilience Runtime State" (PR #12743)
> बाट हुबहु सारिएको। यो माथिका सेक्सनहरूको संक्षिप्त, एजेन्ट-उन्मुख दृश्य हो; क्रमांकित
> सेक्सनहरू नै पूर्ण सन्दर्भ हुन्।

OmniRoute मा तीनवटा सम्बन्धित तर भिन्न अस्थायी-असफलता संयन्त्रहरू छन्। राउटिङ व्यवहार डिबग गर्दा तिनीहरूको
स्कोप अलग राख्नुहोस्। एकै नजरमा नक्सा हेर्न
[3-तह रिजिलियन्स डायाग्राम](../diagrams/exported/resilience-3layers.svg)
(स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
हेर्नुहोस्।

### प्रोभाइडर सर्किट ब्रेकर

**स्कोप**: सम्पूर्ण प्रोभाइडर, जस्तै `glm`, `openai`, `anthropic`।

**उद्देश्य**: अपस्ट्रिम/सेवा स्तरमा बारम्बार असफल भइरहेको प्रोभाइडरमा ट्राफिक पठाउन
रोक्ने, जसरी एउटा अस्वस्थ प्रोभाइडरले हरेक अनुरोधलाई ढिलो नबनाओस्।

**कार्यान्वयन**:

- मुख्य क्लास: `src/shared/utils/circuitBreaker.ts`
- Chat गेट/एक्जिक्युसन वायरिङ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- रनटाइम स्थिति API: `src/app/api/monitoring/health/route.ts`
- साझा र्यापरहरू: `open-sse/services/accountFallback.ts`
- पर्सिस्ट गरिएको स्थिति तालिका: `domain_circuit_breakers`

**स्थितिहरू** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: सामान्य ट्राफिक अनुमति दिइन्छ।
- `DEGRADED`: प्रारम्भिक-चेतावनी ब्यान्ड — असफलताहरूले डिग्रेडेसन थ्रेसहोल्ड कटे तर अझै
  ब्रेकर थ्रेसहोल्ड कटेको छैन; ट्राफिक अझै बग्छ, ड्यासबोर्डहरूमा चेतावनी देखिन्छ। मान्य कनेक्सन
  परीक्षण वा नयाँ असफलता नभएको शान्त विन्डोले यसलाई `CLOSED` मा फर्काउँछ
  (विन्डो `docs/architecture/RESILIENCE_GUIDE.md` मा छ)।
- `OPEN`: प्रोभाइडर अस्थायी रूपमा ब्लक गरिएको छ; कलरहरूले प्रोभाइडर-सर्किट-खुला प्रतिक्रिया
  पाउँछन् वा कम्बो राउटिङले अर्को टार्गेटमा जान्छ।
- `HALF_OPEN`: रिसेट टाइमआउट सकिएको छ; प्रोब अनुरोधलाई अनुमति दिनुहोस्। सफलताले
  ब्रेकर बन्द गर्छ, असफलताले फेरि खोल्छ।

**डिफल्टहरू** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` मा रहेको
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` मार्फत उपभोग गरिन्छ →
`src/sse/handlers/chatHelpers.ts` मा रहेको `getCircuitBreaker(provider, …)`)। सम्पूर्ण-प्रोभाइडर
ब्रेकर `circuitBreakerThreshold` / `circuitBreakerReset` मा चल्छ:

| प्रोफाइल | डिग्रेड हुने | खुल्ने (`circuitBreakerThreshold`) | रिसेट (`circuitBreakerReset`) |
| -------- | -----------: | ---------------------------------: | ----------------------------: |
| OAuth    |          `5` |                                `8` |                         `60s` |
| API key  |          `7` |                               `12` |                         `30s` |
| Local    | (व्युत्पन्न) |                                `2` |                         `15s` |

`PROVIDER_PROFILES` ले `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 मिनेट) र `providerCooldownMs` (5/10/1 मिनेट) पनि परिभाषित गर्छ: यिनीहरूले
**अप्ट-इन ग्लोबल Provider Cooldown को विन्डो गेट** (`PROVIDER_COOLDOWN_ENABLED`, डिफल्ट
बन्द) चलाउँछन् — `open-sse/services/providerCooldownTracker.ts` मा रहेको प्रोभाइडर-स्तरीय इन्ट्री
`providerFailureWindowMs` भित्र `providerFailureThreshold` असफलताहरूपछि मात्र
कुलिङको रूपमा गणिन्छ, र त्यसपछि `providerCooldownMs` सम्म कुल हुन्छ। यी लाइभ ब्रेकरका थ्रेसहोल्डहरू
होइनन् — ब्रेकर व्यवहार अपेक्षा गरेर यिनीहरू ट्युन नगर्नुहोस्। हरेक डिफल्ट
`OMNIROUTE_PROVIDER_BREAKER_*` र `OMNIROUTE_CIRCUIT_BREAKER_*` env भेरिएबलहरूमार्फत ओभरराइड गर्न सकिन्छ;
रनटाइम-सटीक सन्दर्भ तालिका `docs/architecture/RESILIENCE_GUIDE.md` मा छ।

केवल प्रोभाइडर-स्तरीय असफलता स्थितिहरूले मात्र प्रोभाइडर ब्रेकर ट्रिप गर्नुपर्छ:

```ts
(408, 500, 502, 503, 504);
```

धेरैजसो `401`, `403`, वा `429` केसहरूजस्ता सामान्य खाता/कुञ्जी/मोडेल त्रुटिहरूका लागि
सम्पूर्ण-प्रोभाइडर ब्रेकर ट्रिप नगर्नुहोस्। ती सामान्यतया कनेक्सन कुलडाउन वा मोडेल
लकआउटसँग सम्बन्धित हुन्छन्। जेनेरिक API-कुञ्जी प्रोभाइडरको `403` रिकभर गर्न मिल्ने
हुनुपर्छ जबसम्म यसलाई टर्मिनल प्रोभाइडर/खाता त्रुटिको रूपमा वर्गीकृत गरिएको छैन।

ब्रेकरले lazy recovery प्रयोग गर्छ, ब्याकग्राउन्ड टाइमर होइन। जब `OPEN` समाप्त हुन्छ, `getStatus()`, `canExecute()`, र `getRetryAfterMs()` जस्ता रिडहरूले स्टेटलाई `HALF_OPEN` मा रिफ्रेस गर्छन्, त्यसैले ड्यासबोर्डहरू र कम्बो क्यान्डिडेट बिल्डरहरूले समाप्त भइसकेको प्रोभाइडरलाई सधैँभरि बाहिर राखिरहँदैनन्।

### कनेक्सन कुलडाउन

**दायरा**: एउटा प्रोभाइडर कनेक्सन/खाता/की।

**उद्देश्य**: एउटै प्रोभाइडरका अन्य कनेक्सनहरूले अनुरोधहरू सेवा दिइरहन दिँदै एउटा खराब की/खातालाई अस्थायी रूपमा छोड्नु।

**कार्यान्वयन**:

- लेख्ने/अपडेट गर्ने बाटो: `src/sse/services/auth.ts::markAccountUnavailable()`
- खाता छनोट/फिल्टरिङ: `src/sse/services/auth.ts::getProviderCredentials...`
- कुलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिङहरू: `src/lib/resilience/settings.ts`

प्रोभाइडर कनेक्सनहरूमा महत्वपूर्ण फिल्डहरू:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

खाता छनोटका क्रममा, कुनै कनेक्सनलाई यस्तो अवस्थामा छोडिन्छ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

कुलडाउनहरू पनि lazy छन्: जब `rateLimitedUntil` विगतमा हुन्छ, कनेक्सन फेरि योग्य बन्छ। सफल प्रयोगपछि, `clearAccountError()` ले `testStatus`, `rateLimitedUntil`, एरर फिल्डहरू, र `backoffLevel` खाली गर्छ।

डिफल्ट कनेक्सन कुलडाउन व्यवहार:

- OAuth आधार कुलडाउन: `5s`।
- API-key आधार कुलडाउन: `3s`।
- API-key `429` ले उपलब्ध हुँदा अपस्ट्रिम रिट्राइ संकेतहरू (`Retry-After`, रिसेट हेडरहरू, वा पार्स गर्न सकिने रिसेट टेक्स्ट) लाई प्राथमिकता दिनुपर्छ।
- दोहोरिने रिकभर गर्न सकिने फेलचरहरूले एक्स्पोनेन्सियल ब्याकअफ प्रयोग गर्छन्:

```ts
baseCooldownMs * 2 ** failureIndex;
```

एन्टि-थन्डरिङ-हर्ड गार्डले एउटै कनेक्सनमा एकसाथ हुने फेलचरहरूले कुलडाउनलाई बारम्बार लम्बाउने वा `backoffLevel` लाई दोहोरो-इन्क्रिमेन्ट गर्ने कुराबाट रोक्छ।

टर्मिनल स्टेटहरू कुलडाउन होइनन्। `banned`, `expired` (जो `EXPIRED_RETRY_MAX` मार्फत N वटा सीमित रिट्राइपछि मात्र टर्मिनल हुन्छ), र `credits_exhausted` क्रेडेन्सियल/सेटिङहरू नबदलिएसम्म वा अपरेटरले रिसेट नगरेसम्म अनुपलब्ध नै रहनका लागि हुन्। टर्मिनल स्टेटहरूलाई क्षणिक कुलडाउन स्टेटले अधिलेखन नगर्नुहोस्।

### मोडेल लकआउट

**दायरा**: प्रोभाइडर + कनेक्सन + मोडेल।

**उद्देश्य**: त्यस कनेक्सनका लागि एउटा मात्र मोडेल अनुपलब्ध वा कोटा-सीमित हुँदा सम्पूर्ण कनेक्सनलाई निस्क्रिय पार्नबाट बच्नु।

उदाहरणहरू:

- प्रति-मोडेल कोटा भएका प्रोभाइडरहरूले `429` फर्काउनु।
- एउटा हराइरहेको मोडेलका लागि लोकल प्रोभाइडरहरूले `404` फर्काउनु।
- छानिएका Grok मोडहरू जस्ता प्रोभाइडर-विशिष्ट मोड/मोडेल अनुमति फेलचरहरू।

मोडेल लकआउट `open-sse/services/accountFallback.ts` मा रहन्छ र उही कनेक्सनलाई अन्य मोडेलहरू सेवा दिइरहन दिन्छ।

### डिबगिङ मार्गदर्शन

- यदि कुनै प्रोभाइडरका सबै कीहरू छोडिएका छन् भने, प्रोभाइडर ब्रेकर स्टेट र प्रत्येक कनेक्सनको `rateLimitedUntil`/`testStatus` दुवै जाँच्नुहोस्।
- यदि रिसेट विन्डोपछि पनि कुनै प्रोभाइडर स्थायी रूपमा बाहिरिएको देखिन्छ भने, कोडले `getStatus()`/`canExecute()` प्रयोग गर्नुको सट्टा कच्चा `state` पढिरहेको छ कि जाँच्नुहोस्।
- यदि एउटा प्रोभाइडर की फेल हुन्छ तर अरूले काम गर्नुपर्ने हो भने, प्रोभाइडर ब्रेकरभन्दा कनेक्सन कुलडाउनलाई प्राथमिकता दिनुहोस्।
- यदि एउटा मात्र मोडेल फेल हुन्छ भने, कनेक्सन कुलडाउनभन्दा मोडेल लकआउटलाई प्राथमिकता दिनुहोस्।
- यदि कुनै स्टेट आफैँ रिकभर हुनुपर्ने हो भने, त्यससँग भविष्यको टाइमस्ट्याम्प/रिसेट टाइमआउट र समाप्त भएको स्टेट रिफ्रेस गर्ने रिड पाथ हुनुपर्छ। स्थायी स्ट्याटसहरूका लागि म्यानुअल क्रेडेन्सियल वा कन्फिग परिवर्तनहरू आवश्यक हुन्छन्।

---

## TLS फिंगरप्रिन्टिङ र स्टेल्थ

प्रोभाइडर-विशिष्ट स्टेल्थ (JA3/JA4, CCH, अस्पष्टीकरण) अलग्गै दस्तावेजीकरण गरिएको छ — `docs/security/STEALTH_GUIDE.md` हेर्नुहोस् (git; `/docs` मा कम्पाइल गरिएको छैन)।

---

## लचीलोपन परीक्षण (चरण 8 · ब्लक C)

लचीलोपन तर्कका लागि एकाइ परीक्षणहरूभन्दा बाहिर, तीनवटा परीक्षणहरूले वास्तविक
तनाव/विफलता अवस्थाहरूमा रनटाइमलाई परीक्षण गर्छन् (सबै integration/nightly — कुनै पनि
ले PR लाई ब्लक गर्दैनन्):

| परीक्षण     | के                                                                                                                                                                                                          | चलाउने तरिका                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | नक्कली-अपस्ट्रिम नोडले वास्तविक latency/reset/timeout/503 इन्जेक्ट गर्छ; सर्किट ब्रेकर खुल्ने/रिकभर हुने र `checkFallbackError` ले 503 लाई रिकभर हुन सक्ने फलब्याकको रूपमा वर्गीकृत गर्छ भनी प्रमाणित गर्छ। | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` अन्तर्गत प्रत्येक `createSSEStream` मा ~५०० स्ट्रिमहरू; हिप सीमा भन्दा माथि बढ्यो भने असफल हुन्छ (OOM गार्ड #3069)।                                                                           | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` विरुद्ध निरन्तर लोड; p95/त्रुटि थ्रेसहोल्डहरू।                                                                                                                                     | `k6 run tests/load/k6-soak.js` (nightly) |

यसलाई `.github/workflows/nightly-resilience.yml` (cron + dispatch) ले अर्केस्ट्रेट गर्छ।
डिफल्ट `test:integration` मा, chaos र heap आफैं स्किप हुन्छन् (`RUN_CHAOS_INT`/`--expose-gc` बिना)।

---

## यह पनि हेर्नुहोस्

- [आर्किटेक्चर गाइड](./ARCHITECTURE.md) — प्रणाली आर्किटेक्चर र आन्तरिक विवरणहरू
- [प्रयोगकर्ता गाइड](../guides/USER_GUIDE.md) — प्रोभाइडरहरू, कम्बोहरू, CLI एकीकरण
- [अटो-कम्बो इन्जिन](../routing/AUTO-COMBO.md) — १६-कारक स्कोरिङ, मोड प्याकहरू
