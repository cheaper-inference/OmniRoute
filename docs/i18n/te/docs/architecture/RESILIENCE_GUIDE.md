# Resilience Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute మూడు విభిన్నమైన కానీ సంబంధిత స్థితిస్థాపకత విధానాలను కలిగి ఉంది. ప్రతిదానికి భిన్నమైన పరిధి మరియు ప్రయోజనం ఉంటుంది. రూటింగ్ ప్రవర్తనను డీబగ్ చేస్తున్నప్పుడు వాటిని వేరుగా ఉంచండి.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> మూలం: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **రెసిలెన్స్ టోగుల్ల కోసం Env-vs-డ్యాష్బోర్డ్ ప్రాధాన్యత.** ఎన్విరాన్మెంట్ — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — నుండి సీడ్ చేయబడిన ఆప్ట్-ఇన్ రెసిలెన్స్ _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`)ని మాత్రమే సరఫరా చేస్తుంది. ఒక బూలియన్ `resilienceSettings` (డ్యాష్బోర్డ్ →** సెట్టింగులు → స్థితిస్థాపకత** / `PATCH /api/resilience`, `key_value` లో నిల్వ చేయబడింది ) env విలువపై గెలుస్తుంది: సాధారణీకరణ (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) నిల్వ చేయబడిన బూలియన్ను ఉనికిలో ఉంచుతుంది. డ్యాష్బోర్డ్ ఇప్పటికే `false` ని సేవ్ చేసిన డిప్లాయ్మెంట్లో అటువంటి env varని `true` కి సెట్ చేయడం వలన ఏదీ మారదు — టోగుల్ ఇన్ని తిప్పండి** సెట్టింగులు → స్థితిస్థాపకత** (లేదా నిల్వ చేసిన ఫీల్డ్ను క్లియర్ చేయండి) బదులుగా.

## 1. ప్రొవైడర్ సర్క్యూట్ బ్రేకర్

**పరిధి:** మొత్తం ప్రొవైడర్ (ఉదా., `glm`, `openai`, `anthropic`).

**ఉద్దేశ్యం:** అప్స్ట్రీమ్/సర్వీస్ స్థాయిలో పదేపదే విఫలమవుతున్న ప్రొవైడర్కు ట్రాఫిక్ పంపడం ఆపడం.

**అమలు:**

- ప్రధాన క్లాస్: `src/shared/utils/circuitBreaker.ts`
- వైరింగ్: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- స్థితి API: `GET /api/monitoring/health`
- రీసెట్ API: `POST /api/resilience/reset`
- ర్యాపర్లు: `open-sse/services/accountFallback.ts`
- DB టేబుల్: `domain_circuit_breakers`

**స్థితులు:**

- `CLOSED` — సాధారణ ట్రాఫిక్ అనుమతించబడుతుంది
- `DEGRADED` — ట్రాఫిక్ ఇంకా అనుమతించబడుతుంది, కానీ పెరుగుతున్న ప్రొవైడర్ విఫలతలు ట్రాక్ చేయబడుతున్నాయి; తగినంత విజయాలు జరిగినప్పుడు, చెల్లుబాటు అయ్యే కనెక్షన్ టెస్ట్ జరిగినప్పుడు, లేదా చివరి విఫలత రకానికి సంబంధించిన అత్యంత సుదీర్ఘ `OPEN` నిలుపుదల (ఆ రకం యొక్క `cooldownByKind` విలువ, లేకపోతే `resetTimeout`, × `maxBackoffMultiplier`, కనీసం ఒక కూల్డౌన్ వ్యవధి) కొత్త విఫలత లేకుండా గడిచిన తర్వాత `CLOSED` కు తిరిగి వస్తుంది
- `OPEN` — ప్రొవైడర్ తాత్కాలికంగా బ్లాక్ చేయబడింది; కాంబో రూటింగ్ దానిని దాటవేస్తుంది
- `HALF_OPEN` — రీసెట్ టైమ్అవుట్ గడిచింది; ప్రోబ్ రిక్వెస్ట్ అనుమతించబడుతుంది

**కాన్ఫిగర్ చేయగల డిఫాల్ట్లు (`open-sse/config/constants.ts`, డ్యాష్బోర్డ్ → సెట్టింగ్లు → రెసిలియన్స్ లో బహిర్గతం):**

| క్లాస్  | డిగ్రేడ్ అవుతుంది | ఓపెన్ అవుతుంది | రీసెట్ టైమ్అవుట్ |
| ------- | ----------------- | -------------- | ---------------- |
| OAuth   | 5 విఫలతలు         | 8 విఫలతలు      | 60s              |
| API-key | 7 విఫలతలు         | 12 విఫలతలు     | 30s              |
| Local   | ఉద్భవించబడింది    | 2 విఫలతలు      | 15s              |

`degradationThreshold` ప్రొవైడర్ ఎప్పుడు `DEGRADED` లోకి ప్రవేశిస్తుందో నియంత్రిస్తుంది; `failureThreshold` అది ఎప్పుడు ఓపెన్ అవుతుందో మరియు దాటవేయబడుతుందో నియంత్రిస్తుంది. లోకల్ ప్రొవైడర్ ప్రొఫైల్లు ఇంకా రెసిలియన్స్ సెట్టింగ్ల పేజీలో బహిర్గతం కాలేదు.

**ట్రిప్ కోడ్లు:** ప్రొవైడర్-స్థాయి స్టేటస్లు `[408, 500, 502, 503, 504]` మాత్రమే. అకౌంట్-స్థాయి ఎర్రర్ల కోసం ట్రిప్ చేయకూడదు (చాలా 401/403/429 — అవి కూల్డౌన్ లేదా లాక్అవుట్ పరిధిలోకి వస్తాయి).

**లేజీ రికవరీ:** `OPEN` గడువు ముగిసినప్పుడు, `getStatus()`, `canExecute()`, `getRetryAfterMs()` స్థితిని `HALF_OPEN` కు రిఫ్రెష్ చేస్తాయి. అదే రీడ్లు (మరియు తదుపరి విఫలత) పాతకాలపు `DEGRADED` ను మళ్లీ `CLOSED` కు క్షయం చేస్తాయి. బ్యాక్గ్రౌండ్ టైమర్ అవసరం లేదు.

---

### ఆప్ట్-ఇన్ గ్లోబల్ ప్రొవైడర్ కూల్డౌన్ (విండో గేట్)

నాల్గవ, **ఆప్ట్-ఇన్** లేయర్ (`PROVIDER_COOLDOWN_ENABLED`, డిఫాల్ట్ **ఆఫ్**) విఫలమవుతున్న ప్రొవైడర్ల క్రాస్-రిక్వెస్ట్ మెమరీని `open-sse/services/providerCooldownTracker.ts` లో నిలుపుతుంది; కాంబో టార్గెట్ రిజల్యూషన్ దీనిని సంప్రదిస్తుంది, దాంతో వరుస కాంబో రిక్వెస్ట్లు ఇప్పుడే విఫలమైన ప్రొవైడర్ను మళ్లీ ప్రయత్నించడం ఆపుతాయి. ప్రొవైడర్-స్థాయి ఎంట్రీలు `PROVIDER_PROFILES` విండో గేట్ను అనుసరిస్తాయి:

| ప్రొఫైల్ | ట్రిప్ అయ్యే విఫలతల సంఖ్య (`providerFailureThreshold`) | విండో వ్యవధి (`providerFailureWindowMs`) | కూల్డౌన్ వ్యవధి (`providerCooldownMs`) |
| -------- | -----------------------------------------------------: | ---------------------------------------: | -------------------------------------: |
| OAuth    |                                                   `10` |                                  `15min` |                                 `5min` |
| API key  |                                                   `15` |                                  `30min` |                                `10min` |

థ్రెషోల్డ్ కంటే తక్కువగా ఉన్నప్పుడు, ప్రొవైడర్ కూలింగ్లో **లేనట్లు** పరిగణించబడుతుంది; ఒక విజయం విండోను క్లియర్ చేస్తుంది. కనెక్షన్-స్థాయి ఎంట్రీలు (`provider:connectionId`) దీనికి బదులుగా ఎక్స్పోనెన్షియల్ `minRetryCooldownMs → maxRetryCooldownMs` బ్యాక్ఆఫ్ను ఉంచుతాయి. ఓవర్రైడ్లు: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. రిగ్రెషన్ గార్డ్: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. కనెక్షన్ కూల్డౌన్

**పరిధి:** ఒకే ప్రొవైడర్ కనెక్షన్/ఖాతా/కీ.

**ఉద్దేశ్యం:** అదే ప్రొవైడర్కు చెందిన ఇతర కనెక్షన్లు సేవలు అందిస్తూనే ఉండగా, పనిచేయని ఒక కీని దాటవేయడం.

**అమలు:**

- అందుబాటులో లేనిదిగా గుర్తించడం: `src/sse/services/auth.ts::markAccountUnavailable()`
- ఎంపిక: అదే ఫైల్లోని `getProviderCredentials*`
- కూల్డౌన్ లెక్కింపు: `open-sse/services/accountFallback.ts::checkFallbackError()`
- సెట్టింగ్లు: `src/lib/resilience/settings.ts`

**ప్రతి కనెక్షన్కు సంబంధించిన ఫీల్డ్లు:**

- `rateLimitedUntil` — కూల్డౌన్ ముగిసే వరకు టైమ్స్టాంప్
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్ కౌంటర్

**డిఫాల్ట్ కూల్డౌన్లు:**

- OAuth ఆధారం: 5s
- API-key ఆధారం: 3s
- API-key 429: అప్స్ట్రీమ్ `Retry-After`/reset హెడర్లు/పార్స్ చేయగల reset టెక్స్ట్కు ప్రాధాన్యత ఇస్తుంది
- బ్యాక్ఆఫ్: `baseCooldownMs * 2 ** failureIndex`

**ప్రొవైడర్-వారీ రిట్రై ఆలస్యం.** ప్రొవైడర్ వివరాల పేజీలో **రిట్రై ఆలస్యం** సెలెక్ట్ (Auto, 15s నుండి 1h వరకు) ఉంటుంది. ఇది `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` ను (`PATCH /api/resilience` ద్వారా 1–21600) సేవ్ చేస్తుంది. రేట్-లిమిట్ లోపానికి అప్స్ట్రీమ్ రిట్రై సూచన ఏదీ లేనప్పుడు, ఆ విలువ ప్రొవైడర్కు స్కేల్ చేసిన బ్యాక్ఆఫ్ను భర్తీ చేసి, `backoffLevel` ను 0కి రీసెట్ చేస్తుంది (`open-sse/services/rotationConfig.ts::overrideFor`). రేట్-లిమిట్ చేయబడిన లోపానికి ప్రాధాన్యత క్రమం, అత్యధికం నుండి తక్కువ వరకు: అప్స్ట్రీమ్ రిట్రై సూచన, ఆపై కనెక్షన్-వారీ `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, ఆపై ప్రొవైడర్-వారీ రిట్రై ఆలస్యం, ఆపై env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, ఆపై స్కేల్ చేసిన బ్యాక్ఆఫ్. Auto ఫీల్డ్ను తొలగిస్తుంది. ఇది రేట్-లిమిట్ కారణాన్ని మాత్రమే ప్రభావితం చేస్తుంది; టెర్మినల్ స్థితులను ఎప్పుడూ ప్రభావితం చేయదు.

**యాంటీ-థండరింగ్-హెర్డ్ గార్డ్:** సమకాలీన వైఫల్యాల వల్ల కూల్డౌన్ అనవసరంగా పొడిగించబడకుండా లేదా `backoffLevel` రెండుసార్లు పెరగకుండా నిరోధిస్తుంది.

**కన్కరెన్సీ-లిమిట్ 429లు బ్యాక్ఆఫ్ మెట్టుపైకి ఎక్కవు.** బాడీలో కన్కరెన్సీ పరిమితి ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) ఉన్నట్లు నివేదించే `429`, ఖాతా ఆరోగ్యంగా ఉన్నప్పటికీ ప్రస్తుతం బిజీగా ఉందని అర్థం. `checkFallbackError()` `concurrency_limited` కారణాన్ని రిటర్న్ చేస్తుంది: వెంటనే తదుపరి కనెక్షన్కు ఫెయిల్ ఓవర్ చేయండి, ఈ కనెక్షన్ను స్థిరమైన `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) లేదా అప్స్ట్రీమ్ రిట్రై సూచన కోసం కూల్ చేయండి, `backoffLevel` ను మార్చకుండా ఉంచండి, మరియు `skipProviderBreaker` ను సెట్ చేయండి. స్పష్టమైన కోటా బాడీకి ఇప్పటికీ ప్రాధాన్యత ఉంటుంది; అందువల్ల కోటా ప్యాటర్న్కు కూడా సరిపడే బాడీ కోటా నిర్ణయంగానే ఉంటుంది. గుర్తింపు: `src/shared/utils/classify429.ts` లోని `looksLikeConcurrencyLimit()`; నిర్ణయం: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (బ్రేకర్కి చెందిన `FailureKind`) మారదు; ఈ బాడీల కోసం ఇది ఇప్పటికీ `rate_limit` ను చదువుతుంది.

**స్ట్రీమ్ కంటెంట్ స్టాల్లు ఖాతాను కూల్ చేయవు.** కంటెంట్-స్టాల్ వాచ్డాగ్ (`open-sse/utils/streamHandler.ts`) సమయానికి మోడల్ అవుట్పుట్ పంపని స్ట్రీమ్ను వదిలివేసినప్పుడు, `markAccountUnavailable()` కనెక్షన్పై లోపాన్ని నమోదు చేస్తుంది కానీ కూల్డౌన్ను సెట్ చేయదు: స్టాల్ ఆ రిక్వెస్ట్కు మాత్రమే సంబంధించినది; సాధారణంగా ఇది ఇంకా అవుట్పుట్ ఇవ్వని దీర్ఘమైన రీజనింగ్ టర్న్ వల్ల జరుగుతుంది. ఆపరేటర్లు `resilienceSettings.streamStallCooldown.enabled` (డిఫాల్ట్ `false`) ద్వారా దీన్ని ఐచ్ఛికంగా ప్రారంభించవచ్చు.

**`p2c` ఖాతా ఎంపిక కోసం ఐచ్ఛిక లేటెన్సీ సిగ్నల్.** డిస్పాచ్ చేసిన ప్రతి ప్రయత్నం, ప్రతి కనెక్షన్కు (మరియు ప్రతి కనెక్షన్ + మోడల్కు) దాని టైమ్-టు-ఫస్ట్-బైట్ మరియు ఫలితాన్ని ఇన్-మెమరీ రోలింగ్ విండోలో నమోదు చేస్తుంది: 15 నిమిషాల్లోని చివరి 20 నమూనాలు (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` లోని `safeLogEvents()` నుండి నమోదు చేయబడుతుంది). `resilienceSettings.p2cLatency.weight` `0` కంటే ఎక్కువగా ఉన్నప్పుడు (పరిధి 0-20, డిఫాల్ట్ `0` = ఆఫ్), `src/sse/services/auth.ts` లోని `compareP2CConnections()` జంటలోని ప్రతి అభ్యర్థికి గరిష్ఠంగా `weight` పాయింట్లను జోడిస్తుంది. అందులో సగం వేగవంతమైన అభ్యర్థితో పోల్చిన లేటెన్సీ నిష్పత్తి నుండి వస్తుంది (రెండింతలు నెమ్మదిగా ఉంటే పూర్తి సగం లభిస్తుంది), మిగిలిన సగం రోలింగ్ ఎర్రర్ రేట్ నుండి వస్తుంది. ఇద్దరు అభ్యర్థుల వద్ద కనీసం 3 నమూనాలు ఉన్నప్పుడు మాత్రమే ఈ పదం వర్తిస్తుంది; అందువల్ల కొత్త ఖాతాలకు శిక్ష ఉండదు. దీని గరిష్ఠ పరిమితి కోటా-బ్లాక్డ్ మరియు కోటా-ఎగ్జాస్టెడ్ పెనాల్టీల కంటే తక్కువగానే ఉంటుంది. ఇది స్వంతంగా ఎటువంటి సర్క్యూట్ను జోడించదు: విఫలమయ్యే ఖాతాలను కూల్డౌన్, లాక్అవుట్ మరియు బ్రేకర్ లేయర్లు ఇప్పటికీ నిర్వహిస్తాయి. దీన్ని `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` తో సెట్ చేయండి.

**రీజనింగ్ ఫ్రేమ్లు కంటెంట్-స్టాల్ బడ్జెట్ను పునఃప్రారంభిస్తాయి.** రీజనింగ్ మోడల్ తన మొదటి కనిపించే టోకెన్ను పంపే ముందు నిమిషాల పాటు ఆలోచించవచ్చు: Claude ఖాళీగా ఉండే thinking టెక్స్ట్తో కూడిన `thinking_delta` ఫ్రేమ్లను స్ట్రీమ్ చేస్తుంది, అలాగే Responses API వరుసగా ఒక రీజనింగ్ ఐటెమ్ తర్వాత మరొకదాన్ని స్ట్రీమ్ చేస్తుంది. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ఈ ఫ్రేమ్లను గుర్తిస్తుంది; వాచ్డాగ్ టర్న్ను రద్దు చేయకుండా, ప్రతి ఫ్రేమ్పై తన బడ్జెట్ను పునఃప్రారంభిస్తుంది. ఇవి ఇప్పటికీ మోడల్ అవుట్పుట్ కావు; అందువల్ల కేవలం రీజనింగ్తో ముగిసే టర్న్ ఖాళీగా రిపోర్ట్ అవుతుంది, అలాగే రీజనింగ్ ఆగిపోయి కేవలం హార్ట్బీట్లను పంపే టర్న్ వాచ్డాగ్ను ఇప్పటికీ ట్రిగ్గర్ చేస్తుంది.

ఖాళీ కాని సిగ్నేచర్తో కూడిన Kiro యొక్క బైనరీ `reasoningContentEvent` ఫ్రేమ్లు, ఖాళీ `reasoning_content` డెల్టాగా ఎగ్జిక్యూటర్ ద్వారా ఈ రీజనింగ్ కార్యకలాపాన్ని కొనసాగిస్తాయి. సిగ్నేచర్ ఫార్వర్డ్ చేయబడదు. మెటాడేటా, అసంపూర్ణ ఫ్రేమ్లు మరియు ఖాళీ సిగ్నేచర్లు కంటెంట్ బడ్జెట్ను పునఃప్రారంభించవు; స్వతంత్ర యాక్టివ్-స్ట్రీమ్ టైమ్అవుట్ మరియు క్లయెంట్ రద్దు ఇప్పటికీ వర్తిస్తాయి (`open-sse/executors/kiro/reasoning.ts`).

**టెర్మినల్ స్థితులు (కూల్డౌన్లు కావు):**

- `banned` — నిషేధిత-కీవర్డ్ / ఖాతా-నిషేధ గుర్తింపు ద్వారా సెట్ చేయబడుతుంది ([BAN_DETECTION](../security/BAN_DETECTION.md) చూడండి). అప్స్ట్రీమ్ ప్రతి-రిక్వెస్ట్ నిరాకరణలు (`request_rejected`, ఉదా. Anthropic OAuth 403 "Request not allowed") దీన్ని ఎప్పుడూ సెట్ చేయవు: అవి కనెక్షన్ మరియు మోడల్ ఆధారంగా లెక్కించబడతాయి; పెరుగుతున్న కూల్డౌన్తో ఆ మోడల్ను రొటేషన్ నుండి తొలగిస్తాయి, గరిష్ఠం `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), లేదా మోడల్ తెలియనప్పుడు కనెక్షన్ను కూల్ చేస్తాయి — `open-sse/services/requestRejectedStreak.ts`
- `expired` (పరిమిత రిట్రైల తర్వాత టెర్మినల్కు మారుతుంది — ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్తో `EXPIRED_RETRY_MAX = 3` — తద్వారా ఖాతా శాశ్వతంగా డీయాక్టివేట్ కావడానికి ముందు తాత్కాలిక OAuth లోపాలు స్వయంగా సరిదిద్దుకోగలవు)
- `credits_exhausted`

ఇవి ఆధారాలు మారే వరకు లేదా ఆపరేటర్ వాటిని రీసెట్ చేసే వరకు కొనసాగుతాయి. తాత్కాలిక cooldown స్థితితో terminal స్థితులను ఓవర్రైట్ చేయవద్దు.

**Lazy recovery:** `rateLimitedUntil` గడిచిన తర్వాత, కనెక్షన్ మళ్లీ అర్హత పొందుతుంది. విజయవంతమైన వినియోగంలో, `clearAccountError()` అన్ని ఎర్రర్ ఫీల్డ్లను క్లియర్ చేస్తుంది.

### Claude OAuth వినియోగ పరిమితి గోడ: తక్కువ-ప్రాధాన్యత లేన్ + సెషన్-పరిమితి రీసెట్

**పరిధి:** ఒక Claude subscription (OAuth) కనెక్షన్. రెండు ఫీచర్లు **ప్రతి కనెక్షన్కు opt-in** (Edit connection → Claude విభాగం → `providerSpecificData`లోని `lowPriorityMode` / `autoLimitReset`; రెండింటి default ఆఫ్) మరియు Claude Code యొక్క `/low-priority` మరియు `/limit-reset` కమాండ్లను అనుసరిస్తాయి (wire contract Claude Code 2.1.263 నుండి సంగ్రహించబడింది).

**అమలు:**

- స్థితి మెషీన్ + ప్రతిస్పందన వర్గీకరణ: `open-sse/services/claudeLowPriority.ts`
- రీసెట్ స్థితి/claim క్లయింట్: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + same-account retry): `open-sse/executors/base.ts::execute()`
- Opt-in నిల్వ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ట్రిగ్గర్:** 5-గంటల వినియోగ పరిమితి గోడ — headersలో
`anthropic-ratelimit-unified-status: rejected` మరియు, ఖాతా అర్హత కలిగి ఉన్నప్పుడు,
`anthropic-ratelimit-unified-slow-offer: treatment` ఉన్న `429`. మొదటి wall
429కు ముందు ఏదీ పంపబడదు; unified headers లేని burst 429 సాధారణ cooldown మార్గంలోకి వెళ్తుంది.

**తక్కువ-ప్రాధాన్యత లేన్** (`lowPriorityMode`):

- wall 429 వచ్చినప్పుడు executor offerను అంగీకరించి, అదే ఖాతాతో
  `anthropic-usage-limit: slow` పంపి వెంటనే retry చేస్తుంది; ప్రకటించిన
  `anthropic-ratelimit-unified-reset` (+60s grace) వరకు లేన్ సక్రియంగా ఉంటుంది మరియు ఆ
  windowలో ప్రతి request ఈ headerను కలిగి ఉంటుంది. Intercept చేసిన 429
  `handleChatCore`కు చేరదు, కాబట్టి కనెక్షన్ **cooldownలోకి వెళ్లదు** మరియు వేరే కనెక్షన్కు
  మార్చబడదు.
- తరువాతి responsesలోని `anthropic-ratelimit-unified-slow-status`: `active` /
  `not_needed` లేన్ను కొనసాగిస్తాయి; `slot_busy` (429) లేదా `529` వచ్చినప్పుడు server ఇచ్చిన
  `anthropic-ratelimit-unified-slow-retry-after` కోసం వేచి ఉంటుంది (default 20s, 5–600s
  పరిధిలో clamp, ±30% jitter) మరియు retry చేస్తుంది. ఇది
  `anthropic-ratelimit-unified-slow-max-wait` ద్వారా పరిమితం చేయబడుతుంది (default 20 min,
  1 min–6 h పరిధిలో clamp) — ఆ పరిమితి దాటితే లేన్ ముగుస్తుంది మరియు 10-minute cool-off
  మళ్లీ అంగీకరించడాన్ని అడ్డుకుంటుంది. వేచి ఉండే సమయం request యొక్క స్వంత
  upstream-start timeoutలో మిగిలిన సమయంతో కూడా పరిమితం చేయబడుతుంది
  (`resolveFetchStartTimeout`, default 10 min) — 5 s margin తీసివేసిన తర్వాత: ఈ పరిమితి
  లేకపోతే 20-minute default max-wait request కంటే ఎక్కువ కాలం కొనసాగుతుంది, sleep మధ్యలో
  abort అవుతుంది మరియు graceful `max_wait` ముగింపు + cool-off బదులు `TimeoutError`
  కనిపిస్తుంది.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-window rollover, లేదా
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (paid overage ఇప్పుడు
  wallను కవర్ చేస్తున్నందున ఇది ఏ statusలోనైనా `extra_usage`గా ముగుస్తుంది) లేన్ను
  ముగిస్తాయి; ఆ response తరువాత సాధారణ cooldown మార్గంలోకి వెళ్తుంది.
  `budget_exhausted` ప్రకటించిన budget reset వరకు (≤ 8 days) గుర్తుంచుకోబడుతుంది.
- executor స్వంత 400-driven intra-attempt retries (context editing, thinking/effort clamps,
  param auto-learn) పూర్తయిన తర్వాత wall check నడుస్తుంది, కాబట్టి ఆ retriesలో ఒకదానిపై
  మాత్రమే wall 429 కనిపించినా cooldown మార్గానికి చేరకుండా intercept చేయబడుతుంది.
- స్థితి ఒక్కో కనెక్షన్కు in-memoryలో ఉంటుంది (restart తర్వాత మళ్లీ అంగీకరించడానికి ఒక
  అదనపు wall 429 అవసరం).

**Session-limit reset** (`autoLimitReset`, రెండూ ఆన్లో ఉన్నప్పుడు లేన్కు ముందు ప్రయత్నించబడుతుంది):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block; `arm: "reset"` మరియు `available: true` ఉన్నప్పుడు,
  `providerSpecificData.organizationUUID`లోని organization UUIDను (bootstrap fallback)
  ఉపయోగించి `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  కు `{ "program": "juniper_tide" }` పంపబడుతుంది.
- `result: reset|not_limited` → request full speedలో retry చేయబడుతుంది (slow header లేదు).
  `already_used` / `not_offered` `next_available_at`ను memoise చేస్తాయి (default one week);
  ఏదైనా failure 15 minutes పాటు back off చేస్తుంది. Reset వారానికి ఒకసారి మాత్రమే జరుగుతుంది
  మరియు weekly limitలో లెక్కించబడుతుంది.

Regression guards: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### బ్యాంకింగ్ రీసెట్లను స్వయంచాలకంగా వర్తింపజేయండి

**పరిధి:** Codex మరియు Claude సబ్స్క్రిప్షన్ (OAuth) కనెక్షన్లు.**ఎంపిక** : `bankedResetAutoApply` సెట్టింగ్ ఆఫ్లో ఉంది మరియు డిఫాల్ట్గా `dry-run` మోడ్లో ఉంది (సెట్టింగ్లు → AI → స్వయంచాలకంగా బ్యాంకింగ్ రీసెట్లను వర్తింపజేయండి).

**ప్రయోజనం:** ఖాతా వినియోగ గోడను తాకినప్పుడు, ప్రొవైడర్ పరిమితుల పేజీలో "రిడీమ్" నొక్కడానికి ఆపరేటర్ కోసం వేచి ఉండటానికి బదులుగా, బ్యాంకింగ్ రీసెట్లను వారి స్వంతంగా ఖర్చు చేయండి.

| క్రెడిట్ రకం (`creditTypes`) | ఏమి రీడీమ్ చేయబడింది                             | అది ఎక్కడ నడుస్తుంది                                    |
| ---------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `codexCredits`               | Codex క్రెడిట్లను రీసెట్ చేయండి                  | నేపథ్య ఉద్యోగం, ప్రతి 60 సె                             |
| `claudeCredits`              | Claude బ్యాంకింగ్ గ్రాంట్లు (`GRANT` క్రెడిట్లు) | నేపథ్య ఉద్యోగం, ప్రతి 60 సె                             |
| `claudeSessionReset`         | Claude వారపు సెషన్-పరిమితి రీసెట్ (పైన)          | ప్రతి ఖాతా టోగుల్ వలె అదే విధానం ద్వారా అభ్యర్థన మార్గం |

**అమలు:**

- స్వచ్ఛమైన నిర్ణయం (రెండు మార్గాలకు ఒక నియమం సెట్ చేయబడింది): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- నేపథ్య ఉద్యోగం: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` లో ప్రారంభించబడింది)
- Claude అభ్యర్థన-మార్గం గేట్: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` లో `setClaudeLimitResetPolicy()` ద్వారా నమోదు చేయబడింది
- చరిత్ర, క్యాప్లు మరియు వెబ్హుక్: `src/lib/usage/bankedResetAudit.ts`
- చరిత్ర API: `GET /api/settings/banked-reset-auto/history?limit=50` (నిర్వహణ ప్రమాణీకరణ)

**నిర్ణయ క్రమం** (మొదటి విఫలమైన నియమం నమోదు చేయబడిన కారణం):

1. ఫీచర్ ఆఫ్, క్రెడిట్ టైప్ ఆఫ్ లేదా స్కోప్ లేదు (`accountScope` `all` / `selected` ప్లస్ పర్-ఖాతా `connections` మ్యాప్).
2. ఐచ్ఛిక UTC షెడ్యూల్ వెలుపల (`startHourUtc` > `endHourUtc` అర్ధరాత్రి దాటుతుంది).
3. గత 24 గంటలలో పరిమితులు: ఏవైనా రెండు రీడీమ్ల మధ్య `maxPerAccountPerDay` (1), `maxPerDay` (3), మరియు `minSpacingMinutes` (30).
4. ట్రిగ్గర్: గోడతో కూడిన `session` లేదా `weekly` విండో ( `getQuotaWindowStatus().reachedThreshold` నుండి చదవండి, `isAccountQuotaExhausted()` కాదు, ఇది ఖర్చు చేసిన ప్రతి విండోతో ఒక ఖాతాను మాత్రమే నివేదిస్తుంది), లేదా కనీసం `expiringCreditMinUsedPercent` (50)ని ఉపయోగించిన ఖాతాలో `expiringCreditHours` (24)లోపు గడువు ముగిసే క్రెడిట్.
5. సహజ-రీసెట్ గార్డ్: `sessionResetGuardMinutes` (90)లో గోడతో కూడిన 5-గంటల విండోను రీసెట్ చేసినప్పుడు లేదా `weeklyResetGuardHours` (12) లోపల వాల్డ్ వీక్లీ విండోను స్కిప్ చేయండి.
6. వీక్లీ ఫ్లోర్: వారానికొకసారి మిగిలి ఉన్న `weeklyFloorPercent` (10) కంటే తక్కువగా ఉన్నప్పుడు 5-గంటల రీసెట్ను దాటవేయండి.
7. `last-resort` మోడ్: ఒకే ప్రొవైడర్ యొక్క మరొక ఇన్-స్కోప్ ఖాతా రెండు విండోలలో కనీసం `poolHeadroomPercent` (10) మిగిలి ఉండగా దాటవేయి. గడువు ముగిసిన క్రెడిట్ ట్రిగ్గర్లు దీనిని దాటవేస్తాయి.
8. `dry-run` వరుసను రికార్డ్ చేస్తుంది మరియు దేనినీ రీడీమ్ చేయదు; `last-resort` మరియు `eager` రీడీమ్.

తప్పిపోయిన కోటా డేటా రిడెంప్షన్ను ఎప్పటికీ అన్లాక్ చేయదు: తెలియని రీసెట్ సమయం లేదా వారంవారీ వినియోగం దాటవేయబడుతుంది.

**Claude సెషన్ రీసెట్:** ఫీచర్ ఆఫ్లో లేదా `claudeSessionReset` ఆఫ్తో, ప్రతి-ఖాతా `autoLimitReset` టోగుల్ మునుపటిలానే నిర్ణయిస్తుంది. రెండూ ఆన్తో, ఫీచర్ ప్రతి ఖాతా టోగుల్లను భర్తీ చేస్తుంది: పాలసీ అనుమతించినప్పుడు మాత్రమే ఇన్-స్కోప్ ఖాతా క్లెయిమ్ చేయవచ్చు మరియు `dry-run` మోడ్లో ఎటువంటి దావా వేయబడదు.

**భద్రత:** జాబ్ ఒక్కో టిక్కు గరిష్టంగా ఒక క్రెడిట్ని రీడీమ్ చేస్తుంది, క్రెడిట్లను లిస్టింగ్ చేయడానికి ముందు నిర్ణయిస్తుంది (స్కిప్ చేయబడిన ఖాతా ఎప్పుడూ జాబితా చేయబడదు), ఐడెమ్పోటెన్సీ కీలను `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ఉపయోగిస్తుంది మరియు విఫలమైన జాబితా లేదా రిడెంప్షన్ తర్వాత 1 గం వరకు ఖాతాను బ్యాకప్ చేస్తుంది. ప్రతి విముక్తి, వైఫల్యం మరియు డ్రై-రన్ నిర్ణయం `audit_log` కి వ్రాయబడుతుంది (`action: "bankedReset.redeem"`, టోకెన్లు లేదా క్రెడిట్ ఐడిలు లేవు); టోపీలు ఆ వరుసల నుండి లెక్కించబడతాయి, కాబట్టి అవి పునఃప్రారంభించబడినప్పుడు మనుగడలో ఉంటాయి. విజయవంతమైన రీడెంప్షన్లు `provider.reset_redeemed` వెబ్హూక్ను కూడా తొలగించాయి.

రిగ్రెషన్ గార్డ్లు: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Session affinity (#7274)

**పరిధి:** ఏ providerకైనా, ఒక client session (`X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session` header)ను ఒక కనెక్షన్కు pin చేయడం.

**ఉద్దేశ్యం:** multi-turn agent (Claude Code, aider, custom agents)ను requests మధ్య అదే
ఖాతాపై ఉంచడం, తద్వారా cross-account context loss మరియు per-account session state ఉన్న
providersపై పునరావృతమయ్యే cold-start 429లను తగ్గించడం.

**అమలు:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL in ms, `0` disables) — `src/lib/db/settings.ts`.
  Migration `124_generic_session_affinity_ttl.sql` ద్వారా Codex-only
  `codexSessionAffinityTtlMs` పేరు మార్చబడింది; గతంలో కాన్ఫిగర్ చేసిన ఏదైనా Codex TTLను
  కొత్త defaultగా ఇది తీసుకువస్తుంది.

#7274కు ముందు, `resolveSessionAffinityTtlMs()` `codex` మినహా ప్రతి providerకు
`0` వద్ద hard-bail చేసేది. అందువల్ల pinning mechanism మరియు header extraction ఇప్పటికే
provider-agnosticగా ఉన్నప్పటికీ, TTL setting (మరియు session headers) మరెక్కడా ప్రభావం
చూపేవి కాదు. ఆ early-returnను తొలగించడం ద్వారా ఈ సమస్య పరిష్కరించబడింది; ఇప్పుడు globalగా
`0` కంటే ఎక్కువ విలువ సెట్ చేసినప్పుడు TTL ప్రతి providerకు సమానంగా వర్తిస్తుంది.

మూడు session-affinity headers ఎప్పుడూ upstreamకు forward చేయబడవు — executors client
headersను pass through చేయకుండా మొదటి నుంచే తమ స్వంత upstream headersను నిర్మిస్తాయి,
కాబట్టి ఇది internal correlation idగానే ఉంటుంది.

### Exclusive managed session connection leases

**పరిధి:** ఒక క్రియాశీల నిర్వహిత HTTP క్లయెంట్/సెషన్కు ఒక అర్హత కలిగిన OmniRoute కనెక్షన్ స్వంతంగా ఉంటుంది.

**ఉద్దేశ్యం:** అభ్యర్థనల మధ్య కఠినమైన రూటింగ్ సరిహద్దు అవసరమైన క్లయెంట్లకు దీర్ఘకాలిక ప్రత్యేక కనెక్షన్ యాజమాన్యాన్ని అందించడం. ఇది సెషన్ అఫినిటీకి భిన్నమైనది, ఎందుకంటే సెషన్ అఫినిటీ అనేది మృదువైన నిరంతరతా ప్రాధాన్యత మాత్రమే:
ప్రత్యేక లీజ్ జీవచక్ర స్థితిని SQLiteలో నిల్వ చేస్తుంది, గ్లోబల్ క్రియాశీల యజమాని మరియు
క్రియాశీల కనెక్షన్ ఏకైకత్వాన్ని అమలు చేస్తుంది, అలాగే ప్రొవైడర్ డిస్పాచ్కు ముందు పాత జనరేషన్ను
తిరస్కరిస్తుంది.

ఈ ఫీచర్ API కీకి ఐచ్ఛికంగా ప్రారంభించబడుతుంది. నిర్వహిత కీకి `lease:exclusive` స్కోప్ మరియు
స్పష్టంగా ఖాళీ కాని `allowedConnections` జాబితా తప్పనిసరిగా ఉండాలి. ఏ HTTP క్లయెంట్ అయినా జీవచక్ర
ఎండ్పాయింట్ను ఉపయోగించవచ్చు; క్లయెంట్ పేరు, user-agent, ప్రొవైడర్, OAuth పద్ధతి లేదా మోడల్
అవసరం లేదు. లీజ్ ఒక మోడల్ను కాదు, కనెక్షన్ను స్వంతం చేసుకుంటుంది; అందువల్ల కనెక్షన్ సాధారణంగా
అర్హత కలిగి ఉన్నంతకాలం మోడల్ మార్పు బైండింగ్ను కొనసాగిస్తుంది. సాధారణ మోడల్, కోటా, ఆరోగ్యం,
కూల్డౌన్ మరియు అనుమతి జాబితా నియమాలే అధికారికంగా కొనసాగుతాయి మరియు అదే జనరేషన్ను మరో
ఖాళీగా ఉన్న అర్హత కలిగిన కనెక్షన్కు మార్చవచ్చు.

జీవచక్రం `POST /api/v1/session-leases`, ఇందులో JSON చర్యలు `acquire`, `renew`, మరియు `release` ఉంటాయి.
నిర్వహిత ఇన్ఫరెన్స్ అభ్యర్థనలు అపారదర్శక `X-OmniRoute-Lease-Owner` విలువను మరియు ఖచ్చితమైన
`X-OmniRoute-Lease-Generation` విలువను అందిస్తాయి. యజమాని `vlo_`తో ప్రారంభమై 43 base64url
అక్షరాలను అనుసరిస్తుంది; దాని SHA-256 హ్యాష్ మాత్రమే నిల్వ చేయబడుతుంది. ప్రతి తుది డిస్పాచ్
ఫెన్స్ ప్రామాణీకరించిన API కీ ID మరియు క్రియాశీల కనెక్షన్ IDతో కూడా బైండ్ చేయబడుతుంది. లీజ్
నియంత్రణ హెడర్లు లాగ్ల నుండి, నిల్వ చేసిన అభ్యర్థన స్నాప్షాట్ల నుండి మరియు అప్స్ట్రీమ్
ఎగ్జిక్యూటర్ హెడర్ల నుండి తొలగించబడతాయి.

సాధారణ రూటింగ్లో అర్హత కలిగిన నిర్వహిత అభ్యర్థులు ఉన్నప్పటికీ, ప్రతి ఖాళీ అభ్యర్థి ఇతర యజమాని యొక్క
క్రియాశీల లీజ్తో ఆక్రమించబడి ఉంటే, OmniRoute HTTP `429`, లీజ్-సామర్థ్యం-అందుబాటులో-లేదు కోడ్,
సామర్థ్యం కోసం వేచి ఉన్న స్థితి మరియు సంబంధిత అత్యంత సమీప గడువు ఆధారంగా లెక్కించిన పరిమిత
`Retry-After`ను అందిస్తుంది. సాధారణంగా అర్హత కలిగిన అభ్యర్థులు లేకపోవడం లీజ్ పోటీ కాదు; అందువల్ల
అది ఇప్పటికే ఉన్న రూటింగ్ లోపం అర్థవిధానాన్నే కొనసాగిస్తుంది.

సంబంధిత విధానాలు వేరుగా కొనసాగుతాయి:

- OAuth సెషన్ ఆక్యుపెన్సీ అనేది OAuth ఖాతాల కోసం ప్రాసెస్-స్థాయి మృదువైన పంపిణీ.
- ఖాతా సెమాఫోర్లు అభ్యర్థన-సమాంతరత అనుమతులను మంజూరు చేస్తాయి మరియు అభ్యర్థన పూర్తయ్యే సమయంలో ముగుస్తాయి.
- ప్రత్యేక నిర్వహిత సెషన్ లీజ్లు జనరేషన్ ఫెన్స్తో కూడిన దీర్ఘకాలిక జీవచక్ర యాజమాన్యం.

## 3. మోడల్ లాక్అవుట్

**పరిధి:** ప్రొవైడర్ + కనెక్షన్ + మోడల్ ట్రిపుల్.

**స్థితి ఆధారిత పరిధి:** లాక్అవుట్ ఏ కీకి వ్రాయాలో విఫలమైన స్థితి నిర్ణయిస్తుంది
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — కోటా లేదా అర్హత సంకేతం — **కోటా కుటుంబాన్ని** లాక్ చేస్తుంది:
  codex కోసం మొత్తం `codex` / `spark` పరిధి (కనెక్షన్లోని ప్రతి `gpt-5*` మోడల్),
  ఇతర ప్రొవైడర్ల కోసం `getQuotaScopedModelForProvider()`.
- `404` బేర్ మోడల్ను లాక్ చేస్తుంది (`getModelLockKey()` `not_found` ను సంకుచితం చేస్తుంది).
- ఇతర ఏ స్థితి అయినా — `5xx` ట్రాన్స్పోర్ట్/సర్వర్ వైఫల్యాలు మరియు నాణ్యత ధృవీకరణ ద్వారా
  OmniRoute స్వయంగా రూపొందించిన `502` — ఖచ్చితమైన
  ప్రొవైడర్/కనెక్షన్/మోడల్ టపుల్ను మాత్రమే లాక్ చేస్తుంది. ఒక మోడల్లోని చెడు స్ట్రీమ్
  ఖాతా కోటా గురించి ఆధారం కాదు; ఈ నియమానికి ముందు
  `codex/gpt-5.6-luna` లో వచ్చిన ఒక ఖాళీ ప్రతిస్పందన ఆ కనెక్షన్లోని ప్రతి `gpt-5*`
  మోడల్ను 2–30 నిమిషాల పాటు (క్రమంగా పెరుగుతూ) రూటింగ్ నుంచి తొలగించేది,
  అయితే దాని కోటా ప్రభావితం కాలేదు.
- కాలర్ ఇచ్చే స్పష్టమైన `scope` ఎంపిక ఎల్లప్పుడూ ప్రాధాన్యం పొందుతుంది
  (Antigravity `"exact"` ను పంపుతుంది).

**ఉద్దేశ్యం:** ఒక మోడల్ మాత్రమే అందుబాటులో లేకపోయినా లేదా కోటా పరిమితికి లోనైనా,
మొత్తం కనెక్షన్ను నిలిపివేయకుండా చూడటం.

**ఉదాహరణలు:**

- `429` ను అందించే ప్రతి-మోడల్ కోటా ప్రొవైడర్లు
- లేని ఒక మోడల్ కోసం `404` ను అందించే లోకల్ ప్రొవైడర్లు
- ప్రొవైడర్-నిర్దిష్ట మోడ్/మోడల్ అనుమతి వైఫల్యాలు (ఉదా., Grok మోడ్లు)

**అమలు:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### మోడల్ కూల్డౌన్ల డ్యాష్బోర్డ్ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

క్రియాశీల లాక్అవుట్లను వీటితో జాబితా చేస్తుంది: ప్రొవైడర్, కనెక్షన్, మోడల్, కారణం, expiresAt.
ఆపరేటర్లు కార్డ్ నుంచే మోడల్ను మాన్యువల్గా మళ్లీ ప్రారంభించవచ్చు.

**REST API:**

- `GET /api/resilience/model-cooldowns` — క్రియాశీల లాక్అవుట్లను జాబితా చేస్తుంది
- `DELETE /api/resilience/model-cooldowns` — మాన్యువల్గా మళ్లీ ప్రారంభించడం. బాడీ: `{provider, connection, model}`. Auth: management.

### కూల్డౌన్ మేనేజర్

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

తాత్కాలిక కారణంతో రూటింగ్ నుంచి బయట ఉన్న ప్రతి కనెక్షన్ కోసం, ప్రతి ప్రొవైడర్ పేజీని
తెరవాల్సిన అవసరం లేకుండా, ఒకే పేజీని అందిస్తుంది. ఇది కనెక్షన్ కూల్డౌన్లు, మోడల్
లాక్అవుట్లు మరియు టెర్మినల్ స్థితులను జాబితా చేస్తుంది; వాటిని కనెక్షన్ వారీగా,
ఎంచుకున్న వాటి కోసం లేదా ఒక ప్రొవైడర్కు చెందిన అన్ని కనెక్షన్ల కోసం క్లియర్ చేస్తుంది;
అలాగే ఎక్కువగా సర్దుబాటు చేయబడే కూల్డౌన్ నియమాలను సవరించవచ్చు:
`streamStallCooldown.enabled` మరియు OAuth / API-key `connectionCooldown` బేస్ కూల్డౌన్
మరియు గరిష్ఠ బ్యాక్ఆఫ్ దశలు (`PATCH /api/resilience` ద్వారా సేవ్ చేయబడతాయి).
టెర్మినల్ స్థితులు (`banned`, `expired`, `credits_exhausted`) జాబితా చేయబడతాయి కానీ
ఇక్కడ ఎప్పుడూ క్లియర్ చేయబడవు.

అదే పేజీలోని **Error cooldown rules** కార్డ్ ఆపరేటర్ ఎర్రర్ నియమాలను
(`settings.providerErrorRules`) మరియు ప్రతి-ప్రొవైడర్ క్యాచ్-ఆల్ డిఫాల్ట్లను
(`settings.providerErrorDefaults`) `PATCH /api/settings` ద్వారా సవరిస్తుంది —
అవి ఎలా సరిపోలుతాయో §7 లోని "Operator-declared rules" చూడండి. వ్యవధులు Default
(స్పష్టమైన కూల్డౌన్ లేదు), 30 min, 1 h, 5 h, 24 h లేదా 1 నుండి 43,200 నిమిషాల
వరకు అనుకూల విలువ (30 రోజులు).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — స్థితి, మిగిలిన కూల్డౌన్, బ్యాక్ఆఫ్ స్థాయి,
  చివరి ఎర్రర్ రకం మరియు మోడల్ లాక్అవుట్లతో కూడిన కనెక్షన్లు (ఆధారాలు లేవు)
- `POST /api/resilience/cooldowns` — బాడీ `{connectionIds: string[]}` లేదా
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ను అందిస్తుంది

### లాక్అవుట్ సెట్టింగ్ల UI + విజయ-క్షీణత రికవరీ (v3.8.23)

మోడల్ లాక్అవుట్ ఎల్లప్పుడూ అమలయ్యే హార్డ్కోడ్ ప్రవర్తన నుంచి, స్వంత సెట్టింగ్ల కార్డ్
మరియు స్వీయ-సరిదిద్దుకునే రికవరీ మార్గం కలిగిన, పూర్తిగా కాన్ఫిగర్ చేయగల
ఆప్ట్-ఇన్ ఫీచర్గా మారింది.

**సెట్టింగ్ల కార్డ్:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ఇది పైన పేర్కొన్న చదవడానికి మాత్రమే ఉండే `ModelCooldownsCard` నుంచి **భిన్నమైనది**
(ఇది క్రియాశీల లాక్అవుట్లను మాత్రమే _జాబితా చేస్తుంది_) — కొత్త కార్డ్
_పారామీటర్లను కాన్ఫిగర్ చేస్తుంది_. డిఫాల్ట్లు
`DEFAULT_MODEL_LOCKOUT_SETTINGS` (`src/lib/resilience/modelLockoutSettings.ts`) లో ఉంటాయి:

| సెట్టింగ్               | డిఫాల్ట్                         | అర్థం                                                          |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| `enabled`               | `false`                          | మాస్టర్ టాగుల్ — మోడల్ లాక్అవుట్ **డిఫాల్ట్గా ఆఫ్లో ఉంటుంది**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | మోడల్-పరిధి వైఫల్యంగా పరిగణించే అప్స్ట్రీమ్ స్థితులు.          |
| `baseCooldownMs`        | `120_000` (120 s)                | మొదటి వైఫల్యానికి ప్రారంభ లాక్అవుట్ వ్యవధి.                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | పెంచబడిన కూల్డౌన్కు గరిష్ఠ పరిమితి.                            |
| `maxBackoffSteps`       | `10`                             | ఎక్స్పోనెన్షియల్-బ్యాక్ఆఫ్ పెరుగుదల దశల గరిష్ఠ సంఖ్య.          |
| `useExponentialBackoff` | `true`                           | పునరావృత వైఫల్యాలు కూల్డౌన్ను ఎక్స్పోనెన్షియల్గా పెంచాలా.      |

సెట్టింగ్లు సాధారణ సెట్టింగ్ల స్టోర్ ద్వారా నిల్వ చేయబడతాయి మరియు
రెసిలియెన్స్ సెట్టింగ్ల స్కీమా ద్వారా ధృవీకరించబడతాయి; కార్డ్
`baseCooldownMs`/`maxCooldownMs` విలువలను (`maxCooldownMs ≥ baseCooldownMs` తో)
మరియు `maxBackoffSteps` ను పరిమితిలో ఉంచుతుంది.

**విజయ-క్షీణత రికవరీ:** రికవరీ కేవలం టైమర్ ముగింపుపైనే ఆధారపడదు. ఆరోగ్యకరమైన
ప్రతిస్పందన మోడల్ వైఫల్యాల లెక్కను తగ్గిస్తుంది; అందువల్ల మధ్యలో పునరుద్ధరించబడిన
మోడల్ పెరుగుదలను ఆపి, టైమర్ ముగియకముందే లాక్అవుట్ను క్లియర్ చేయగలదు.
విజయవంతమైన కాంబో లక్ష్యంపై, `open-sse/services/combo.ts`
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`) ను పిలుస్తుంది;
ఇది నిల్వ చేసిన `failureCount` ను సగానికి తగ్గిస్తుంది
(`Math.floor(failureCount / 2)`); అది `0` కు చేరుకున్నప్పుడు లాక్అవుట్ ఎంట్రీ పూర్తిగా
తొలగించబడుతుంది. దీనికి ప్రతిరూపమైన `recordModelLockoutFailure()` వైఫల్యాలపై లెక్కను
పెంచుతుంది (మరియు పెరుగుదల విండోలో కూల్డౌన్ను పెంచుతుంది). ఈ విజయ-క్షీణత సాధారణ
టైమర్ ముగింపుకు అదనంగా పనిచేస్తుంది — ఈ రెండు మార్గాల్లో ఏదైనా మోడల్ను
మళ్లీ ప్రారంభించగలదు.

**స్థితి:** లాక్అవుట్లు **మెమరీలోనే** ఉంచబడతాయి (`ModelLockoutEntry` యొక్క
`provider:connectionId:model` కీతో కూడిన ప్రతి-ప్రాసెస్ `Map`లు, మరియు
`provider:connectionId:exact:model` కీతో కూడిన ఖచ్చిత-స్కోప్ లాక్లు), అవి
DBలో నిల్వ చేయబడవు — పునఃప్రారంభించినప్పుడు అవి కోల్పోతాయి. _సెట్టింగ్లు_ నిల్వ చేయబడతాయి; సక్రియ లాక్అవుట్ _స్థితి_ తాత్కాలికమైనది.

---

## 4. కోటా-షేర్ సమకాలీన నియంత్రణ (v3.8.36)

సబ్స్క్రిప్షన్ ఖాతాలు (GLM, MiniMax మొదలైనవి) తరచుగా ~1–3 సమకాలీన
అభ్యర్థనలను మాత్రమే స్వీకరిస్తాయి; ఈ పరిమితిని మించితే 429లు మరియు
కూల్డౌన్లు ప్రారంభమవుతాయి. ఇది **కోటా-షేర్** (`qtSd/…`) కాంబోలలో మరింత
తీవ్రంగా ఉంటుంది, ఎందుకంటే అనేక API కీలు ఒకే అప్స్ట్రీమ్ ఖాతాను పంచుకుంటాయి.
పంచుకున్న ఖాతా అధిక అభ్యర్థనలతో నిండిపోకుండా మూడు పొరలు నియంత్రిస్తాయి.

### ప్రతి-కనెక్షన్ సమకాలీన పరిమితి (`max_concurrent`)

ప్రతి ప్రొవైడర్ కనెక్షన్ ఒక `max_concurrent` గరిష్ఠ పరిమితిని ప్రకటించగలదు
(`provider_connections.max_concurrent`, ఇది కనెక్షన్ మోడల్ / API / DBలో సెట్
చేయబడుతుంది). పరిమితి వద్దనుకుంటే దీనిని ఖాళీగా ఉంచండి. దిగువ సీరియలైజేషన్
లేయర్ను నియంత్రించే ఏకైక సెట్టింగ్ ఇదే — ఖాతా యొక్క వాస్తవ సమకాలీనతకు
అనుగుణంగా దీన్ని సెట్ చేయండి (ఉదా. GLM ~1, MiniMax ~2).

### ప్రతి-మోడల్ సమకాలీన పరిమితులు (`modelConcurrency`)

కనెక్షన్ తన `rateLimitOverrides` మ్యాప్లో ఖచ్చితమైన ప్రతి-మోడల్ సమకాలీన
గరిష్ఠ పరిమితులను అదనంగా ప్రకటించగలదు:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

దీనిని కనెక్షన్ మోడల్లో (**Rate limit overrides → Per-model
concurrency caps**, ప్రతి లైన్కు ఒక `model=cap`) లేదా అదే JSON ఆకృతితో
`PATCH /api/providers/[id]` ద్వారా సెట్ చేయండి. ముఖ్యమైన అర్థాలు:

- **కనెక్షన్-వ్యాప్తి వర్సెస్ మోడల్-నిర్దిష్టం:** `maxConcurrent` షేర్డ్
  కనెక్షన్-వ్యాప్తి గరిష్ఠ పరిమితిగానే ఉంటుంది. రెండూ వర్తించినప్పుడు, రెండూ
  ఒకే కాంపోజిట్ గేట్లో
  (`global → provider → account → model`) అణు పద్ధతిలో పొందబడతాయి; వర్తించే
  పరిమితుల్లో మరింత కఠినమైనదే ప్రభావవంతంగా ఉంటుంది.
- **ఖచ్చితమైన మోడల్-కీ సరిపోలిక:** రూటింగ్ పరిష్కారమైన తర్వాత ఎగ్జిక్యూటర్కు
  పంపబడే మోడల్ స్ట్రింగ్నే కీగా ఉపయోగించాలి — సాధారణంగా క్లయింట్-సైడ్
  `provider/model` అలియాస్ (`zai/glm-5` `glm-5`తో సరిపోలదు) కాకుండా,
  నేరుగా అప్స్ట్రీమ్ మోడల్ ఐడి (`glm-5`). విలువలు పాజిటివ్-ఇంటిజర్
  సమకాలీన-అభ్యర్థన గరిష్ఠ పరిమితులు.
- **లోకల్ క్యూ, డిస్కవరీ లేదు:** అదనపు అభ్యర్థనలు ఇప్పటికే ఉన్న
  క్యూ/టైమ్అవుట్ అర్థాల ప్రకారం స్థానికంగా క్యూ అవుతాయి (టైప్ చేసిన
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` అడ్మిషన్ లోపాలు).
  OmniRoute అప్స్ట్రీమ్ విధానాన్ని కనుగొనదు లేదా ఊహించదు — ఆపరేటర్
  కాన్ఫిగర్ చేసిన ఖచ్చితమైన పరిమితులనే అమలు చేస్తుంది. సంతృప్తమైన మోడల్ గేట్
  ప్రొవైడర్ను ఎప్పుడూ డిసేబుల్ చేయదు, శాశ్వత మోడల్ లాక్అవుట్ను కూడా
  సృష్టించదు; అప్స్ట్రీమ్ 429/కూల్డౌన్/ఫాల్బ్యాక్ ప్రవర్తనే లోపానికి
  తుది రక్షణగా ఉంటుంది.
- **ప్రతి-కనెక్షన్, ప్రతి-ప్రాసెస్ పరిధి:** పరిమితులు ప్రతి డేటాబేస్
  కనెక్షన్కు వర్తిస్తాయి మరియు మెమరీలో ఉంచబడతాయి; కాబట్టి ఒకే అప్స్ట్రీమ్
  API కీని మళ్లీ ఉపయోగించే రెండు కనెక్షన్లు పరస్పరం సమన్వయం కావు.
- **కాన్ఫిగర్ చేయనిది అంటే మార్పు లేదు:** మ్యాప్ను వదిలేయడం (లేదా
  డాష్బోర్డ్ ఫీల్డ్ను ఖాళీగా ఉంచడం) ఏ మోడల్ గేట్ను జోడించదు. ఏ
  యూనివర్సల్ ప్రొవైడర్ పరిమితినీ ప్రకటించని ఉదాహరణ కాన్ఫిగరేషన్:

```text
glm-5=1
glm-4.7=3
```

### కోటా-షేర్ అభ్యర్థన సీరియలైజేషన్

కోటా-షేర్ డిస్పాచ్, పాజిటివ్ `max_concurrent` ప్రకటించిన కనెక్షన్ను లక్ష్యంగా
చేసినప్పుడు, ఆ **ఖాతా**కు సంబంధించిన సమకాలీన అభ్యర్థనలు ప్రతి-కనెక్షన్
సెమాఫోర్ (`qsconn:<connectionId>`) ద్వారా సీరియలైజ్ చేయబడతాయి: అదనపు
అభ్యర్థనలు ఖాతాపై అధిక భారం మోపకుండా **క్యూలో వేచి ఉంటాయి**. ఇది
**ఫెయిల్-ఓపెన్** — సంతృప్తమైన క్యూ లేదా టైమ్అవుట్ వచ్చినా స్లాట్ లేకుండానే
కొనసాగుతుంది; డిస్పాచ్ చేయగల అభ్యర్థనను ఎప్పుడూ తిరస్కరించదు. దీన్ని
**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
డిఫాల్ట్గా ఆన్)లో టాగుల్ చేయండి. `max_concurrent` పరిమితి లేకపోతే ప్రవర్తన
మారదు.

> కోటా-షేర్ రూటింగ్ గేట్ (`selectQuotaShareTarget`, DRR + P2C) కూడా
> ఫెయిల్-ఓపెన్గా ఉంటుంది మరియు పరిమితిని చేరిన కనెక్షన్కు కేవలం
> _తక్కువ ప్రాధాన్యత_ ఇస్తుంది — ఒకే కనెక్షన్ ఉన్న పూల్లో ఇది కఠిన పరిమితిని
> విధించలేడు; కాబట్టి వాస్తవానికి అధిక భారాన్ని నియంత్రించేది ఈ సెమాఫోరే.

### కాంబో కూల్డౌన్-అవగాహన రీట్రై

ప్రతి కాంబో వ్యూహానికి (ఎనేబుల్ చేసినప్పుడు), SHORT తాత్కాలిక కూల్డౌన్ కోసం
429ను నిర్ధారించే అభ్యర్థన, 429ను తిరిగి ఇవ్వకుండా ఆ కూల్డౌన్ ముగిసే వరకు
వేచి మళ్లీ డిస్పాచ్ అవుతుంది — ఇందులో బహుళ-మోడల్ కాంబోలపై Gemini-క్లాస్
TPM/RPM విండోలు (~60s retry-after) కూడా ఉంటాయి; ఉదాహరణకు 2-మోడల్ కాంబోలోని
రెండు లక్ష్యాలూ ప్రతి-మోడల్ రేట్ పరిమితిని తాకినప్పుడు. ఇది **Settings →
Resilience**లోని `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) ద్వారా పరిమితం చేయబడుతుంది. `quota_exhausted`పై (అర్ధరాత్రి వరకు
లాక్లో ఉండే) లేదా auth/not-found కారణాలపై ఇది ఎప్పుడూ వేచి ఉండదు.

కాంబో `config.comboCooldownWaitEnabled: false`తో దీనినుంచి తప్పుకోవచ్చు.
లిటరల్ `false` మాత్రమే ఈ షేర్డ్ కాంబో వేచి ఉండే చర్యలను (డిస్పాచ్ తర్వాత
కూల్డౌన్ మరియు డిస్పాచ్కు ముందు సర్క్యూట్-ఓపెన్/మోడల్-లాక్ వేచి ఉండటం)
మరియు వాటి వెయిట్-బడ్జెట్ టైమ్అవుట్-ఫ్లోర్ పొడిగింపును డిసేబుల్ చేస్తుంది.
గుర్తించని లేదా `true` విలువ గ్లోబల్ విధానాన్ని కొనసాగిస్తుంది; గ్లోబల్గా
డిసేబుల్ చేసిన వేచి ఉండటాన్ని `true` ఎనేబుల్ చేయదు. స్పష్టంగా ఇచ్చిన
`targetTimeoutMs`కే ఇప్పటికీ ప్రాధాన్యం ఉంటుంది. ఈ ఆప్ట్-అవుట్ వేరు అయిన
నేటివ్-Codex టర్న్-పిన్ ప్రీ-డిస్పాచ్ వేచి ఉండటాన్ని మార్చదు.

అదే గేట్ ప్రీ-డిస్పాచ్ సందర్భాన్నీ (#16319) కవర్ చేస్తుంది: ప్రయత్నం
చేయకముందే కాంబోలోని ప్రతి లక్ష్యాన్ని దాని మోడల్ స్వల్పకాలిక తాత్కాలిక
లాక్అవుట్లో ఉన్నందుకు స్కిప్ చేసినప్పుడు, సున్నా-ప్రయత్న మార్గం అదే
పరిమితుల కింద లాక్అవుట్ ముగిసే వరకు వేచి మళ్లీ డిస్పాచ్ అవుతుంది; సూచనలేని
`503 ALL_TARGETS_SKIPPED`ను సమాధానంగా ఇవ్వదు. వేచి ఉండటానికి అనుమతి లేనప్పుడు
(పరిమితి, ప్రయత్నాల సంఖ్య లేదా బడ్జెట్ ముగిసినప్పుడు, లేదా ఫీచర్ ఆఫ్లో
ఉన్నప్పుడు), టెర్మినల్ ప్రతిస్పందన `429 rate_limit_error`గా అప్గ్రేడ్ అవుతుంది;
అందులో తొలి తాత్కాలిక లాక్ ముగిసే సమయం నుంచి `retry_after` / `reset_at`
ఉంటాయి. కోటా, auth మరియు not-found లాక్లు సూచనలేని 503గానే ఉంటాయి.

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

## 5. రిక్వెస్ట్ క్యూ అడ్మిషన్ కంట్రోల్ (v3.8.49 · issue #6593)

**స్కోప్**: లోకల్ పెర్-ప్రొవైడర్+కనెక్షన్ రేట్-లిమిట్ క్యూ (`open-sse/services/rateLimitManager.ts`,
Bottleneck ఆధారంగా), పైన పేర్కొన్న మూడు మెకానిజమ్లకు ఒక లేయర్ క్రింద.

**`maxWaitMs` క్యూ నిరీక్షణకు హద్దు; `executionMaxWaitMs` ఎగ్జిక్యూషన్కు హద్దు.**
ఈ రెండూ ఉద్దేశపూర్వకంగానే వేరుగా ఉంటాయి, ఒకటి మరొకదానికి ఫీడ్ అవ్వదు.

`resilienceSettings.requestQueue.maxWaitMs` అనేది **క్యూ-వెయిట్ బడ్జెట్**: ఇది
ప్రొవైడర్ స్లాట్ కోసం ఎదురుచూడటం ఆపై QUEUED స్థితిలో కూర్చోవడం రెండింటినీ కవర్ చేస్తుంది, మరియు జాబ్ QUEUED నుండి బయలుదేరి ఎగ్జిక్యూట్ అవ్వడం ప్రారంభించిన క్షణంలోనే దాని టైమర్ క్లియర్ అవుతుంది
(`rateLimitManager.ts`, `wrappedFn`). దీన్ని మించిన రిక్వెస్ట్ ఎప్పటికీ అప్స్ట్రీమ్ను చేరుకోదు. డిఫాల్ట్ 30000ms, ఇది
`src/lib/resilience/settings.ts` లోని `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ద్వారా అందించబడుతుంది మరియు
`tests/unit/ratelimit-admission-control-6593.test.ts` ద్వారా పిన్ చేయబడింది, కాబట్టి దీన్ని మార్చితే ఈ పేరా నిశ్శబ్దంగా పాతబడిపోకుండా ఆ టెస్ట్ ఎరుపు రంగులో ఫెయిల్ అవుతుంది.

`resilienceSettings.requestQueue.executionMaxWaitMs` అనేది Bottleneck జాబ్ `expiration` గా స్వీకరించేది, దాని టైమర్ డిస్పాచ్ తర్వాత మాత్రమే ప్రారంభమవుతుంది. ఇది
తమ సొంత అప్స్ట్రీమ్ టైమౌట్ లేని ఎగ్జిక్యూటర్ల కోసం ఒక బ్యాక్స్టాప్, మరియు ఎగ్జిక్యూటర్ యొక్క సొంత fetch-start టైమౌట్ దానికంటే పొడవుగా ఉన్నప్పుడు దానికి పెంచబడుతుంది, కాబట్టి ఆరోగ్యకరమైన ఇన్-ఫ్లైట్ రెస్పాన్స్ను ఇది కత్తిరించలేదు. డిఫాల్ట్ 600000ms (10 నిమిషాలు).

క్యూ బడ్జెట్ను `expiration` లోకి ఫీడ్ చేయడమే గతంలో నాన్-ఇన్క్రిమెంటల్
గేట్వేలను మిడ్-ఫ్లైట్లో చంపేది — అవి మొదటి బైట్లకు ముందు నిమిషాల పాటు చట్టబద్ధంగా నడుస్తాయి —
మరియు అందుకే expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) గా వెల్లడి అవుతుంది, అయితే క్యూ బడ్జెట్ క్యూ-టైమౌట్ కోడ్ను కలిగి ఉంటుంది. వాటిలో దేనినైనా `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) లేదా డాష్బోర్డ్ ద్వారా ఓవర్రైడ్ చేయండి
(**Settings → Resilience**). సాధారణీకరించినప్పుడు రెండూ 1ms–24h మధ్య క్లాంప్ చేయబడతాయి.

**రెండింటికీ ప్రాధాన్యత:** env వేరియబుల్ _డిఫాల్ట్_ను మాత్రమే అందిస్తుంది. `resilienceSettings.requestQueue` లో
(డాష్బోర్డ్ / API ప్యాచ్ ద్వారా, `key_value` లో నిల్వ చేయబడినది) పర్సిస్ట్ చేయబడిన విలువ దానిని ఓడిస్తుంది, మరియు
పెర్-కనెక్షన్ `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` దానిని ఓడిస్తుంది. ఇప్పటికే పర్సిస్ట్ చేయబడిన విలువ ఉన్న డిప్లాయ్మెంట్పై env వేరియబుల్ను సెట్ చేయడం వల్ల ఏమీ మారదు — బదులుగా పర్సిస్ట్ చేయబడిన సెట్టింగ్ను క్లియర్ చేయండి లేదా అప్డేట్ చేయండి.

క్యూ నివాసం `maxWaitMs` ద్వారా హద్దు చేయబడుతుంది; క్రింది `maxQueueDepth` ఒకేసారి ఎంతమంది కాలర్లు క్యూలో ఉండవచ్చో హద్దు చేస్తుంది.

**బాడీలో పేర్కొన్న రీట్రైలు: పేసింగ్ vs లాకౌట్.** ఒక 429 బాడీ తన సొంత నిరీక్షణను పేర్కొనవచ్చు (Gemini `RetryInfo.retryDelay`, "retry after Ns" టెక్స్ట్), దాన్ని
`updateFromResponseBody` చదువుతుంది. కనెక్షన్ `maxWaitMs` కి సరిపోయే నిరీక్షణ అనేది పేసింగ్: లిమిటర్ ఆ సమయం పాటు తన రిజర్వాయర్ను ఖాళీ చేస్తుంది మరియు అది నిండుకున్నప్పుడు క్యూలో ఉన్న కాల్స్ డిస్పాచ్ అవుతాయి. `maxWaitMs` కంటే పొడవైన నిరీక్షణను క్యూ కూర్చొని గడపలేదు — Gemini నిండిపోయిన రోజువారీ కోటాకు
`retryDelay: "86399s"` తో జవాబిస్తుంది. పునర్నిర్మించిన 429 పై రిలే చేయబడిన `Retry-After` (#16528)
ఇప్పటికే ఫాల్బ్యాక్ ఇంజిన్ను ఆ విండో కోసం మోడల్ను లాక్ చేయిస్తుంది, కానీ దాని కోసం లిమిటర్ను కూడా పాజ్ చేయడం వల్ల, కీని ముందుగానే చేరుకునే ఏ కాల్ అయినా (ఉదాహరణకు రెసిలియన్స్ రీసెట్ తర్వాత) మొత్తం `maxWaitMs` పాటు నిలిచిపోతుంది. అలాంటి నిరీక్షణ టైప్ చేయబడిన Google `RetryInfo`
డీటెయిల్ నుండి వచ్చినప్పుడు (`google_rpc_retry_info` మూలం) మరియు కీ యొక్క లిమిటర్ ఇప్పటికే మోడల్కు స్కోప్ చేయబడి ఉన్నప్పుడు (`getLimiterKey` చూడండి), ఆ 429 ఆ కనెక్షన్పై మోడల్
లాకౌట్గా మారుతుంది (`open-sse/services/rateLimitManager/bodyRetryPause.ts` లోని `lockModelForLongBodyRetry`, గరిష్ఠంగా 24h క్యాప్), మరియు
లిమిటర్ పాజ్ చేయకుండా వదిలేయబడుతుంది. అకౌంట్ సెలెక్షన్ ఆ లాక్ను
`isModelLocked()` ద్వారా స్కిప్ చేస్తుంది, మరియు కనెక్షన్కు పిన్ చేయబడిన టార్గెట్ల కోసం కాంబో ప్రీ-డిస్పాచ్ గేట్ కూడా అలాగే చేస్తుంది. లిమిటర్ కోటా ఫ్యామిలీ వారీగా ఉండే antigravity పై, లాక్ ఇతర కోటా లాక్ల మాదిరిగానే సరిగ్గా మోడల్పై ఉంటుంది. ఒక అలియాస్ దానిని ఆ మోడల్కు రిజాల్వ్ చేసినప్పుడు క్లయింట్ అడిగిన పేరు కూడా లాక్ అవుతుంది, ఎందుకంటే ఆ చెక్లు అభ్యర్థించిన పేరును ఉపయోగిస్తాయి; ఇది సరిగ్గా (`lockExactModel`) లాక్ అవుతుంది, కాబట్టి antigravity కోటా ఫ్యామిలీని లేదా codex స్కోప్ను దాటే అలియాస్ తన సొంతదాన్ని ఎప్పుడూ లాక్ చేయదు. ఒక ప్రోస్ హింట్, టైప్ చేయని `retryDelay`, లేదా మొత్తం కనెక్షన్ పంచుకునే లిమిటర్ పాజ్ను కొనసాగిస్తుంది. 429 మార్గం ఇప్పుడే పునర్నిర్మించిన లిమిటర్ పాజ్ అయినప్పుడు, పాజ్ ముగిసేలోపే తన మిగిలిన క్యూ సమయం ముగిసిపోయే కాలర్, ఆ సమయాన్ని గడపడం బదులు వెంటనే క్యూ-టైమౌట్ కోడ్తో
(`checkLimiterPause`) తిరస్కరించబడుతుంది; నమోదు చేయబడిన ముగింపు లిమిటర్ నిర్మించబడే ముందే యాంకర్ చేయబడుతుంది, అక్కడే Bottleneck తన రిఫ్రెష్
క్లాక్ను ప్రారంభిస్తుంది, మరియు రిజర్వాయర్కు తర్వాత జరిగే ఏ మార్పు అయినా దాన్ని మర్చిపోతుంది. దీన్ని
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` మరియు
`tests/unit/rate-limit-body-retry-pause.test.ts` కవర్ చేస్తాయి.

**`maxQueueDepth` — ఆప్ట్-ఇన్ అడ్మిషన్ క్యాప్ (కొత్తది).** `resilienceSettings.requestQueue.maxQueueDepth`
ఒక పెర్-ప్రొవైడర్+కనెక్షన్కు ఒకేసారి ఎన్ని రిక్వెస్ట్లు క్యూలో (ఇంకా డిస్పాచ్ కానివి) ఉండవచ్చో హద్దు చేస్తుంది. క్యూ ఇప్పటికే `maxQueueDepth`
రిక్వెస్ట్లను కలిగి ఉన్నప్పుడు, కొత్త రిక్వెస్ట్ `limiter.schedule()` ను చేరుకోక**ముందే** టైప్ చేయబడిన
`code: "RATE_LIMIT_QUEUE_FULL"` ఎర్రర్తో ఫాస్ట్-రిజెక్ట్ చేయబడుతుంది
— కాబట్టి ఆ రిజెక్షన్ చవకైనది మరియు ఆ రిక్వెస్ట్ కోసం ఏదైనా డౌన్స్ట్రీమ్
ప్రాంప్ట్-కంప్రెషన్ / ట్రాన్స్లేషన్ పని జరగకముందే జరుగుతుంది. డిఫాల్ట్ `0` =
నిష్క్రియం, ఇప్పటికే ఉన్న అపరిమిత-క్యూ ప్రవర్తనను కాపాడుతుంది; హద్దు 0–100000. `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) లేదా
`resilienceSettings.requestQueue.maxQueueDepth` (డాష్బోర్డ్/API ప్యాచ్) ద్వారా ఓవర్రైడ్ చేయండి.

అడ్మిషన్ చెక్ తానే ఒక ప్యూర్ ఫంక్షన్
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) కాబట్టి నిజమైన Bottleneck లిమిటర్ లేకుండానే దీన్ని యూనిట్-టెస్ట్ చేయవచ్చు.

> #6593ను ఓపెన్ చేసిన RFC `bypassCompressionOnRateLimit` ఫ్లాగ్ను కూడా
> ప్రతిపాదించింది. ఈ రిపో యొక్క `open-sse/services/compression/` పైప్లైన్ అనేది
> అవుట్బౌండ్ LLM రిక్వెస్ట్పై ప్రాంప్ట్/కాంటెక్స్ట్ కంప్రెషన్ (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` బ్లాక్ చుట్టూ) — సింతసైజ్
> చేయబడిన 429 బాడీలపై HTTP రెస్పాన్స్ కంప్రెషన్ కాదు — లిటరల్ బైపాస్ ఫ్లాగ్ కోసం
> సరిపోయే కోడ్ పాత్ లేదు. ఆ ప్రాంప్ట్-కంప్రెషన్ స్టెప్ కూడా ప్రస్తుతం రిక్వెస్ట్
> పైప్లైన్లో `withRateLimit()` కంటే _ముందు_ నడుస్తుంది, కాబట్టి క్యూ-ఫుల్
> రిజెక్షన్పై దాన్ని స్కిప్ చేయడానికి రీఆర్డర్ చేయడం అనేది ఈ ఇష్యూ స్కోప్ కంటే
> ప్రత్యేకమైన, పెద్ద మార్పు; ఇది ఇక్కడ ఉద్దేశపూర్వకంగా అమలు చేయబడ**లేదు** మరియు
> CPU-ఆదా లాభం రీఆర్డరింగ్ రిస్క్కు విలువైనదైతే ఫాలో-అప్గా వదిలివేయబడింది.

### రేట్-లిమిట్ ఆటో-ఎనేబుల్ సేఫ్టీ నెట్ & కనెక్షన్ ప్రొటెక్షన్ (`rateLimitProtection`)

**ఆటో-ఎనేబుల్ సేఫ్టీ నెట్** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, డిఫాల్ట్ `true`):
డిఫాల్ట్గా, OmniRoute అన్ని యాక్టివ్ API-కీ ప్రొవైడర్ కనెక్షన్ల కోసం రేట్-లిమిట్ క్యూ ప్రొటెక్షన్ను స్వయంచాలకంగా ఎనేబుల్ చేస్తుంది (`getProviderCategory(provider) === "apikey"`). ఇది రేట్-సెన్సిటివ్ అప్స్ట్రీమ్ API కీలకు వచ్చే ఇన్కమింగ్ రిక్వెస్ట్లు అప్స్ట్రీమ్ 429 ఎర్రర్లలోకి బరస్ట్ అవ్వకుండా Bottleneck ద్వారా క్యూ చేయబడి థ్రాటిల్ చేయబడేలా నిర్ధారిస్తుంది. సేఫ్టీ నెట్ను `RATE_LIMIT_AUTO_ENABLE` ఎన్విరాన్మెంట్ వేరియబుల్ ద్వారా ఓవర్రైడ్ చేయవచ్చు (`false`/`0`/`off` డిజేబుల్ చేస్తుంది, `true`/`1`/`on` ఆన్గా ఫోర్స్ చేస్తుంది), ఇది పర్సిస్ట్ చేయబడిన డాష్బోర్డ్ సెట్టింగ్ (**సెట్టింగ్స్ → రెసిలియన్స్** / `PATCH /api/resilience`) కంటే ప్రాధాన్యత పొందుతుంది.

**పర్-కనెక్షన్ `rateLimitProtection` సిమాంటిక్స్:**
పర్-కనెక్షన్ రేట్-లిమిట్ ప్రొటెక్షన్ ప్రొవైడర్ కనెక్షన్లపైన `rateLimitProtection` బూలియన్ ఫీల్డ్ ద్వారా ట్రాక్ చేయబడుతుంది (SQLiteలో `rate_limit_protection`గా పర్సిస్ట్ చేయబడింది):

- **ఎక్స్ప్లిసిట్ ఆన్ (`rateLimitProtection === true`)**: ప్రొవైడర్ కేటగరీ లేదా ఆటో-ఎనేబుల్ సేఫ్టీ నెట్ ఆన్ చేయబడిందా లేదా అనే దానితో సంబంధం లేకుండా, ఈ కనెక్షన్ కోసం రేట్-లిమిట్ ప్రొటెక్షన్ స్పష్టంగా ఎనేబుల్ చేయబడింది.
- **ఎక్స్ప్లిసిట్ ఆఫ్ (`rateLimitProtection === false`)**: ఎక్స్ప్లిసిట్ ప్రొటెక్షన్ను డిజేబుల్ చేస్తుంది, కానీ యాక్టివ్ API-కీ కనెక్షన్ను గ్లోబల్ ఆటో-ఎనేబుల్ సేఫ్టీ నెట్ నుండి ఆప్ట్-అవుట్ **చేయదు**. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`)లో, `false` మరియు `undefined` సమానం: కేవలం `rateLimitProtection === true` మాత్రమే ఎక్స్ప్లిసిట్ ఓవర్రైడ్గా పరిగణించబడుతుంది. `rateLimitProtection` `false`గా ఉంటే (లేదా సెట్ చేయకపోతే), యాక్టివ్ API-కీ కనెక్షన్ ఇంకా ఆటో-ఎనేబుల్ కండిషన్కు మ్యాచ్ అవుతుంది మరియు రేట్-లిమిట్ ప్రొటెక్ట్ చేయబడి ఉంటుంది.
- **పర్-కనెక్షన్ ఆప్ట్-అవుట్ లేదు**: ఇతరుల కోసం ఆటో-ఎనేబుల్ను యాక్టివ్గా ఉంచుతూ, "ఈ ఒకే యాక్టివ్ API-కీ కనెక్షన్ రేట్-లిమిట్ క్యూ ప్రొటెక్షన్ లేకుండా నడవాలి" అని ఆపరేటర్ ప్రస్తుతం వ్యక్తపరచలేరు. API-కీ కనెక్షన్లను రేట్-లిమిట్ క్యూలు లేకుండా పూర్తిగా నడపడానికి, సేఫ్టీ నెట్ను గ్లోబల్గా ఆఫ్ చేయాలి (`RATE_LIMIT_AUTO_ENABLE=false` లేదా `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**సపోర్ట్ చేయబడిన రైట్ పాత్లు:**

- **`POST /api/rate-limits`**: కనెక్షన్ కోసం `rateLimitProtection`ను టాగుల్ చేయడానికి సపోర్ట్ చేయబడిన మేనేజ్మెంట్ రైట్ పాత్ (`{ connectionId: string, enabled: boolean }`). దీన్ని `enabled: true`తో కాల్ చేస్తే ఎక్స్ప్లిసిట్ ప్రొటెక్షన్ ఆన్ అవుతుంది; దీన్ని `enabled: false`తో కాల్ చేస్తే ఎక్స్ప్లిసిట్ ప్రొటెక్షన్ తొలగించబడుతుంది (అయితే ఆటో-ఎనేబుల్ ఆన్లో ఉంటే, యాక్టివ్ API-కీ కనెక్షన్లు గ్లోబల్ సేఫ్టీ నెట్ కింద కవర్ అవుతూనే ఉంటాయి).
- **`PUT /api/providers/[id]`**: ఉద్దేశపూర్వకంగా `rateLimitProtection`ను యాక్సెప్ట్ చేయ**దు** లేదా ఫ్లిప్ చేయ**దు** (#11278). `PUT /api/providers/[id]` ద్వారా ప్రొవైడర్ కనెక్షన్ మెటాడేటాను అప్డేట్ చేయడం పర్సిస్ట్ చేయబడిన రేట్-లిమిట్ ప్రొటెక్షన్ స్టేట్ను ఎప్పటికీ మార్చదు.

---

## 6. స్లో-స్ట్రీమ్ నిర్గమాంశ వాచ్డాగ్ (#9709)

ఐచ్ఛిక `resilienceSettings.streamRecovery.throughputWatchdog` గార్డ్ అప్స్ట్రీమ్ను గుర్తిస్తుంది, అది ఇప్పటికీ భాగాలను పంపుతోంది కానీ కాన్ఫిగర్ చేయబడిన ఉపయోగకరమైన-అవుట్పుట్ రేటు కంటే తక్కువ అసిస్టెంట్ అవుట్పుట్ను ఉత్పత్తి చేస్తుంది. ఇది నిష్క్రియ సమయం ముగిసే సమయానికి ఉద్దేశపూర్వకంగా భిన్నంగా ఉంటుంది: హృదయ స్పందనలు మరియు మెటాడేటా టైమర్ను రీసెట్ చేయవు మరియు పురోగతిగా పరిగణించబడవు. ఇది హార్డ్ అటెంప్ట్ డెడ్లైన్ (#9153) నుండి కూడా విభిన్నంగా ఉంటుంది, ఇది అవుట్పుట్ నాణ్యతతో సంబంధం లేకుండా సంపూర్ణ భద్రతా సీలింగ్గా ఉంటుంది.

వాచ్డాగ్కు వార్మ్-అప్ పీరియడ్ అవసరం, దాని తర్వాత పూర్తిగా రోలింగ్ విండో అవసరం. ఇది చాట్ పూర్తిలు మరియు ప్రతిస్పందనల నుండి టెక్స్ట్ డెల్టాలను గణిస్తుంది API అవుట్పుట్ ఈవెంట్లు (ఒక సాంప్రదాయిక UTF-8 బైట్ ప్రాక్సీ), వాడుక-మాత్రమే మరియు ఖాళీ ఈవెంట్లను విస్మరిస్తుంది మరియు టూల్-కాల్ లేదా రీజనింగ్ ఈవెంట్లు విమానంలో ఉన్నప్పుడు తీర్పును నిలిపివేస్తుంది. ఇది డిఫాల్ట్గా నిలిపివేయబడింది మరియు `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` తో ప్రారంభించబడుతుంది (ఆ env విలువ డిఫాల్ట్ — సేవ్ చేసిన `resilienceSettings.streamRecovery.throughputWatchdog.enabled` బూలియన్ గెలుస్తుంది; ఈ గైడ్ ఎగువన ఉన్న env-vs-డాష్బోర్డ్ ప్రాధాన్యత గమనికను చూడండి); విండో, వార్మప్, కనిష్ట రేటు మరియు కనిష్ట కొలవగల అవుట్పుట్ సాధారణ స్థితిస్థాపకత-సెట్టింగ్ల సాధారణీకరణ లేయర్తో కట్టుబడి ఉంటాయి.

ప్రారంభించబడినప్పుడు, యాక్టివ్ అప్స్ట్రీమ్ ప్రయత్నానికి మాత్రమే వాచ్డాగ్ అబార్ట్ వర్తించబడుతుంది. ఏదైనా క్లయింట్-కనిపించే బైట్లకు ముందు, ఇప్పటికే ఉన్న అదే-ఖాతా ముందస్తు పునరుద్ధరణ మార్గం ప్రయత్నాన్ని మళ్లీ తెరవవచ్చు. కమిట్ అయిన తర్వాత, స్ట్రీమ్ గుడ్డిగా రీప్లే చేయబడదు; ఇప్పటికే ఉన్న సురక్షితమైన మధ్య-ప్రవాహ కొనసాగింపు ఒప్పందం మాత్రమే ప్రత్యయాన్ని కుట్టగలదు. ఫైనలైజేషన్ ఒకే-షాట్గా మిగిలిపోయింది, కాబట్టి వినియోగ అకౌంటింగ్ మరియు సెమాఫోర్ విడుదల నకిలీవి కావు.

---

## 7. అప్స్ట్రీమ్ స్థితి పునఃప్రకటన (తప్పుగా నివేదించబడిన కోటా లోపాలు)

**పరిధి:** తాత్కాలిక కోటా పూర్తిగా వినియోగించబడిందని తప్పు HTTP స్థితితో నివేదించే ఒక అప్స్ట్రీమ్ గేట్వే.

**ఉద్దేశ్యం:** వర్గీకరణకు **ముందే** తప్పుదారి పట్టించే స్థితిని సరిచేయడం, తద్వారా దిగువ వినియోగదారులు (ఫాల్బ్యాక్ ఇంజిన్, కాంబో సమీకరణ, క్లయింట్కు కనిపించే ప్రతిస్పందన) వైఫల్య స్వభావం తిరిగి ప్రయత్నించదగినదని సరిగ్గా గుర్తించగలరు.

కొన్ని గేట్వేలు TEMPORARY quota exhaustionను తిరిగి ప్రయత్నించలేని HTTP
స్థితితో సూచిస్తాయి. `agentrouter.org` ప్రామాణిక `429`కు బదులుగా చైనీస్ బాడీ
(`用户额度不足` / `额度不足`)తో `403` (కొన్నిసార్లు `400`)ను అందిస్తుంది. Claude
Code వంటి క్లయింట్లు `403`ను శాశ్వతమైనదిగా పరిగణించి సెషన్ను నిలిపివేస్తాయి,
మరియు సవరణ లేకపోతే ఫాల్బ్యాక్ ఇంజిన్ దీనిని కోటా ఈవెంట్కు బదులుగా
`AUTH_ERROR`గా వర్గీకరిస్తుంది.

**అమలు:**

- రిజిస్ట్రీ + మ్యాచర్: `open-sse/config/upstreamStatusRestatement.ts` — ఒక్కో
  ప్రొవైడర్కు నియమాల జాబితా (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` ద్వారా
  సరిపోల్చబడుతుంది.
- కాల్ సైట్: `open-sse/handlers/chatCore.ts`లోని `providerFailure:` బ్లాక్
  (సుమారు 3654వ లైన్), `parseUpstreamError()` అప్స్ట్రీమ్ ప్రతిస్పందనను ఎర్రర్
  HTTP స్థితితో (`!providerResponse.ok`) పార్స్ చేసిన వెంటనే, అలాగే ఏదైనా
  వర్గీకరణ ప్రారంభమయ్యే ముందు. అందువల్ల ప్రతి దిగువ వినియోగదారుకూ సవరించిన
  స్థితి కనిపిస్తుంది. `200` SSE స్ట్రీమ్లో పొందుపరచబడిన ఎర్రర్లు ప్రత్యేకమైన,
  తరువాత జరిగే స్ట్రీమ్-పార్సింగ్ మార్గాన్ని అనుసరిస్తాయి; అవి ప్రస్తుతం ఈ
  హుక్ పరిధిలోకి రావు — ఇది తెలిసిన పరిమితి, ఇంకా agentrouter యొక్క తప్పు
  స్థితికి అవసరం రాలేదు (అది ఎర్రర్ HTTP స్థితిగా కనిపిస్తుంది).
- తిరిగి ప్రయత్నించే అర్హత: `429` అనేది
  `RETRY_AFTER_ELIGIBLE_STATUSES`లో (`open-sse/services/combo/unavailableRetryGate.ts`)
  ఉంది. అందువల్ల సవరించబడిన ఎర్రర్ చెల్లని `403`గా బయటపడకుండా నిజమైన
  తిరిగి-ప్రయత్న వ్యవధిని కలిగి ఉంటుంది.
- సింథటిక్ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) అనేది
  సవరించిన ప్రతిస్పందన **క్లయింట్కు** తెలియజేసేది మాత్రమే; అది కనెక్షన్కి
  సంబంధించిన అంతర్గత cooldown/lockout వ్యవధి కాదు — సవరించబడిన ఎర్రర్ను
  వాస్తవంగా నిర్వహించే యంత్రాంగం దానిని వేరుగా నియంత్రిస్తుంది (Connection
  Cooldown యొక్క పెరుగుతున్న backoff, §2, API-key ప్రొవైడర్లకు ప్రాథమిక
  `3s`; లేదా agentrouter వంటి ఒక్కో-మోడల్-కోటా ప్రొవైడర్లకు Model Lockout,
  §3). క్లయింట్కు ప్రకటించే 60s విండో కంటే ముందే రూటర్ అంతర్గతంగా మళ్లీ
  ప్రయత్నించడానికి అర్హత పొందవచ్చు — ఇది ఉద్దేశపూర్వకంగా ఉంచిన అదనపు
  వెసులుబాటు, బగ్ కాదు.

శాశ్వత ఎర్రర్లు (agentrouter యొక్క `无权访问模型` — ఈ మోడల్కు యాక్సెస్ లేదు)
ఎప్పటికీ పునఃప్రకటించబడవు: `textMarkers` సరిపోలినప్పటికీ `excludeMarkers`
నియమాన్ని తిరస్కరిస్తుంది. అందువల్ల ఎర్రర్ తన అసలు స్థితినే కొనసాగిస్తుంది,
మరియు ఏదీ ఎప్పటికీ తిరిగి ప్రయత్నించదు. సరిపోలిన ప్రొవైడర్ వర్గీకరణ నియమం
(`open-sse/config/providerErrorRules.ts`లోని
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
ప్రకటిత `6h` ప్రాథమిక cooldown)ను
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
_సాధారణ apikey-వర్గం `FORBIDDEN` ముందస్తు-రిటర్న్కు ముందు_ పరిశీలిస్తుంది.
ఇది `honorsRuleLockScope(provider)` (#10334 — ప్రస్తుతం
`providerErrorRules.ts`లోని `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ద్వారా
agentrouterకు మాత్రమే పరిమితం)పై ఆధారపడి ఉంటుంది. నియమంలో ప్రకటించిన 6h
cooldown `fallbackResult.baseCooldownMs`గా ప్రవహిస్తుంది, అయితే ఇది ఇప్పటికీ
ముందుగా ఉన్న ఒక్కో-మోడల్-కోటా lockout మార్గాన్నే
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`) ఉపయోగిస్తుంది
(#10334 ద్వారా cooldown మూలం తప్ప మరేదీ మార్చబడలేదు): ఇది ప్రతి ఇతర మోడల్
lockoutల మాదిరిగానే ఆపరేటర్ యొక్క `mlSettings.maxCooldownMs` (డిఫాల్ట్
`1_800_000ms` / 30min)కు తగ్గించబడుతుంది, మరియు _నిల్వ చేయబడిన lockout కారణం_
ముందుగా హార్డ్కోడ్ చేయబడిన `"forbidden"`గానే ఉంటుంది, నియమంలోని
`"auth_error"` కాదు — కారణం స్ట్రింగ్ కాదు, cooldown వ్యవధి మాత్రమే
మొదటి నుంచి చివరి వరకు గౌరవించబడుతుంది. కనెక్షన్ స్వయంగా సక్రియంగానే ఉంటుంది;
అదే కనెక్షన్లోని సహోదర మోడళ్లపై ప్రభావం ఉండదు.

సవరించబడిన కోటా ఎర్రర్లు (`额度不足`) ప్రొడక్షన్లో ఒక ప్రొవైడర్ నియమానికి
చేరుతాయి (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, స్వంతంగా ప్రకటించిన cooldown లేదు — persistence
లేయర్ యొక్క స్కేల్ చేయబడిన backoff డిఫాల్ట్ వర్తిస్తుంది). #10334 నుంచి,
`ProviderErrorRuleMatch`లోని `scope` మొదటి నుంచి చివరి వరకు వినియోగించబడుతుంది,
కానీ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistలో ఉన్న ప్రొవైడర్లకు మాత్రమే
(`providerErrorRules.ts` — ప్రస్తుతం `"agentrouter"` మాత్రమే,
`honorsRuleLockScope()` ద్వారా నియంత్రించబడుతుంది). మిగతా ప్రతి ప్రొవైడర్కు
`scope` #10334కు ముందు ఉన్నట్లే కేవలం సమాచారాత్మకంగానే ఉంటుంది.
`checkFallbackError` సరిపోలిన నియమంలోని scopeను `fallbackResult.ruleScope`గా
బయటపెడుతుంది; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) అనేది `ruleScope`ను కనెక్షన్-వ్యాప్త,
స్వయంగా పునరుద్ధరించుకునే సంకేతంగా గౌరవించడం నిజంగా సురక్షితమేనని నిర్ధారించే
సామూహిక గార్డ్ (scope `"connection"`, reason `quota_exhausted`, ఎప్పటికీ
`permanent` కాదు, ఎప్పటికీ `creditsExhausted` కాదు — భవిష్యత్తులో scope
`"connection"`ను శాశ్వత account స్థితితో జతచేసే నియమాన్ని నిరోధించే
రక్షణ). దీనిని రెండు వినియోగదారులు పిలుస్తారు:

- **స్థిరీకరణ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider యొక్క **per-model** లాక్అవుట్
  బ్రాంచ్లోకి వెళ్లడం బదులుగా (agentrouter వద్ద `passthroughModels: true` → `hasPerModelQuota()`
  `true`ని రిటర్న్ చేస్తుంది), ఇది **తాత్కాలిక కనెక్షన్ కూల్డౌన్**ను వర్తింపజేస్తుంది —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ఎప్పుడూ టెర్మినల్ స్థితి
  (`credits_exhausted`/`banned`/`expired`) కాదు — కాబట్టి మాన్యువల్ క్రెడెన్షియల్ రీసెట్ అవసరం లేకుండా,
  కూల్డౌన్ ముగిసిన తర్వాత కనెక్షన్ స్వయంగా తిరిగి పనిచేస్తుంది.
  `disableCooling: true` ఉన్న కనెక్షన్లకు ఇది వర్తించదు (#2997): ఆ opt-out బదులుగా
  per-model లాక్అవుట్లోకి వెళ్తుంది (ఇది డాక్యుమెంట్ చేసిన trade-off —
  బ్రాంచ్ పైన ఉన్న కోడ్ వ్యాఖ్యను చూడండి).
- **అదే అభ్యర్థనలో కాంబో రూటింగ్** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): అదే guard కనెక్షన్ను
  `${provider}:${connectionId}` కీతో, మెమరీలోని `exhaustedConnections` సెట్లోకి గుర్తిస్తుంది.
  ఇది ఇప్పటికే అదే `connectionId`ని తన స్వంత target objectలో కలిగి ఉన్న
  మిగిలిన SAME-REQUEST targetను మాత్రమే skip చేస్తుంది
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` lookupకు ముందు
  `if (provider && connectionId)`) — సాదా
  model-list comboలో sibling targets తమ స్వంత pinned `connectionId`ని కలిగి ఉండవు;
  ప్రతి dispatchకు responseలోని
  `X-OmniRoute-Selected-Connection-Id` header నుంచి ఒకటి మాత్రమే resolve అవుతుంది,
  కాబట్టి ఆ సాధారణ సందర్భంలో ఈ key match ఎప్పుడూ జరగదు. ఆ సందర్భంలో మిగిలిన leg
  తాజాగా exhausted అయిన accountను మళ్లీ ఉపయోగించకుండా చేసే వాస్తవ రక్షణ ఈ Set కాదు —
  పైన ఉన్న persistence layer (కనెక్షన్ యొక్క `rateLimitedUntil` ఇప్పుడు భవిష్యత్తులో ఉంది)
  మరియు ఈ same guard failure కోసం `transientRateLimitedProviders`ను suppress చేయడం
  కలిపిన ప్రభావమే ( "Two-stage design" మరియు `targetExhaustion.ts`లోని
  `isAgentrouterConnectionQuotaScope` branchపై ఉన్న కోడ్ వ్యాఖ్యను చూడండి): Setలో గుర్తు
  చేయకుండా ఉంచినందువల్ల, `combo.ts`లోని
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider యొక్క
  మిగిలిన legs కోసం అమలుకాదు. అందువల్ల credential selectionలోని
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) సాధారణంగా గౌరవించబడుతుంది;
  మిగిలిన leg వేరే, ఇంకా eligible అయిన agentrouter కనెక్షన్ను ఎంచుకుంటుంది లేదా
  credentials అందుబాటులో లేవని విఫలమవుతుంది — ఈ branch ఇప్పుడే cooldownలోకి పంపిన
  కనెక్షన్పైకి బలవంతంగా తిరిగి వెళ్లదు.

### రెండు-దశల రూపకల్పన: స్థితి పునర్వ్యాఖ్యానం, ఆపై వర్గీకరణ

స్థితి పునర్వ్యాఖ్యానం (`upstreamStatusRestatement.ts`) మరియు provider
వర్గీకరణ నియమాలు (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) రెండూ provider id మరియు text markers ఆధారంగా పనిచేసే
వేర్వేరు registries, కానీ అవి వేర్వేరు ప్రదేశాల్లో అమలై వేర్వేరు ప్రయోజనాలను అందిస్తాయి:
restatement `chatCore.ts`లో HTTP statusను ముందుగానే తిరిగి రాస్తుంది;
వర్గీకరణ నియమాలు `checkFallbackError()`లో fallback `reason`ను ఎంచుకుని
`scope` (`model` / `provider` / `connection`)ను lock చేస్తాయి
(`open-sse/services/accountFallback.ts`).

`providerErrorRules.ts`లోని `FULL_TEXT_RULE_PROVIDERS` allowlistలో
చేర్చిన providers కోసం మాత్రమే వర్గీకరణ నియమాలు పూర్తి error **text**ను
చూస్తాయి (body markers వంటి `额度不足`ను match చేయడానికి ఇది అవసరం) —
ప్రస్తుతం `"agentrouter"` మాత్రమే. మిగిలిన ప్రతి **built-in catalog** provider కోసం,
`checkFallbackError`, `getProviderErrorRuleMatch`కు structured error
(`{code, type}`)ను మాత్రమే అందిస్తుంది; ఇది header/status/code ఆధారిత నియమాలకు
సరిపోతుంది, కానీ body-text markersను చూడలేడు.
`resolveRuleMatchBody()` helper ఈ ఎంపికను నిర్వహిస్తుంది: allowlistలో ఉన్న
providersకు పూర్తి error text, మిగిలిన వాటికి structured error.
`FULL_TEXT_RULE_PROVIDERS`కు **built-in** providerను జోడించడం స్పష్టమైన
per-provider opt-in — జాబితాలో లేని ప్రతి provider కోసం default path
byte-for-byte మారకుండా ఉండటానికే ఇది ఉంది.

ఒక rule యొక్క `scope` (`model` / `provider` / `connection`) అనేది
`FULL_TEXT_RULE_PROVIDERS` నుంచి వేరు అయిన opt-in: `checkFallbackError` దాన్ని
`fallbackResult.ruleScope`గా మాత్రమే అందిస్తుంది, అలాగే downstream consumers
అదే fileలోని `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistలో ఉన్న providers కోసం
మాత్రమే దాన్ని informational label కంటే ఎక్కువగా గౌరవిస్తారు
(`honorsRuleLockScope()` ద్వారా gate చేయబడుతుంది — ప్రస్తుతం `"agentrouter"` మాత్రమే).
Provider ఆ allowlistలో ఉన్న తర్వాత `scope: "connection"` match వాస్తవంగా ఏమి
చేస్తుందో తెలుసుకోవడానికి పైన ఉన్న "Restated quota errors"ను చూడండి.

**#11104 — operator ప్రకటించిన rules రెండు allowlistsనూ దాటవేస్తాయి.** ఒక operator
`settings.providerErrorRules` ద్వారా runtimeలో ప్రతి providerకు ruleను ప్రకటించవచ్చు
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
ఈ fileను మార్చాల్సిన అవసరం లేదు. Operator ruleను
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — **default**
behaviorను రక్షించడానికి ఉద్దేశించిన built-in catalog rules యొక్క allowlists —
వెనుక gate చేస్తే, ఆ settings mechanismలో ఇప్పటికే జాబితాలో ఉన్న providers తప్ప
మిగిలిన ప్రతి providerకు అది పనిచేయదు; ఎందుకంటే ruleను ప్రకటించడమే operator యొక్క
స్పష్టమైన opt-in. `resolveRuleMatchBody()` మరియు `honorsRuleLockScope()` రెండూ
ముందుగా `hasOperatorRuleForProvider()`ను తనిఖీ చేస్తాయి: operator rule ఉన్న providerకు
raw error text లభిస్తుంది మరియు అది ఏ allowlistలో ఉన్నా లేకపోయినా, దాని ప్రకటించిన
`scope` గౌరవించబడుతుంది.

**Operator ప్రకటించిన rules** (`OperatorProviderErrorRule`): ప్రతి ruleకు
ఐచ్ఛిక `status` మరియు ఐచ్ఛిక `match` ఉంటాయి (`match` error textలోని
సాధారణ, case-insensitive substring; ఇది ఎప్పుడూ RegExp కాదు, కాబట్టి ReDoSకు
కారణం కాలేదు), మరియు ఈ రెండింటిలో కనీసం ఒకదాన్ని తప్పనిసరిగా సెట్ చేయాలి.
రెండూ సెట్ చేసినప్పుడు అవి AND చేయబడతాయి; ఒక field ఇవ్వకపోతే అది ఏదైనా విలువతో
match అవుతుంది, కాబట్టి `{match: "insufficient_quota"}` ఆ codeను కలిగి ఉన్న
ఏ statusనైనా match చేస్తుంది. ముందుగా match అయిన rule గెలుస్తుంది.
`cooldownMs` గరిష్ఠంగా 30 రోజులను అంగీకరిస్తుంది; మొత్తం rules గరిష్ఠంగా 50.

**అన్ని సందర్భాలకు వర్తించే డిఫాల్ట్లు** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` ద్వారా సెట్ చేయబడతాయి): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` 1 నిమిషం నుండి 30 రోజుల వరకు ఉండవచ్చు. ఆపరేటర్ నియమం మరియు అంతర్నిర్మిత కేటలాగ్ నియమం ఏదీ సరిపోలనప్పుడు మాత్రమే, అలాగే 402, 403, 408, 429 మరియు 5xx లోపాలకు మాత్రమే డిఫాల్ట్ వర్తిస్తుంది. Request-shape లోపాలు (400, 404, 409, 413, 422) మరియు ప్రత్యేకమైన 401లకు వాటి స్వంత నిర్వహణ కొనసాగుతుంది. స్పష్టమైన `reason` లేకపోతే, `classifyError` చేసే విధంగానే కారణం status నుండి వస్తుంది. డిఫాల్ట్ను ప్రకటించడం `hasOperatorRuleForProvider()` కోసం ఆపరేటర్ నియమంగా లెక్కించబడుతుంది, కాబట్టి దాని `scope` (డిఫాల్ట్గా `"connection"`) గౌరవించబడుతుంది. డిఫాల్ట్కు ప్రభావవంతమైన cooldown, దాని `cooldownMs` మరియు provider అందించిన స్వంత retry సూచన (`Retry-After`, `x-ratelimit-reset` లేదా bodyలోని reset సూచన — connection-cooldown సెట్టింగ్లో "use upstream retry hints" ఆన్లో ఉన్నప్పుడు engine గౌరవించే అదే సూచన) వీటిలో ఎక్కువదిగా ఉంటుంది. అందువల్ల డిఫాల్ట్ చిన్న upstream సూచనను పొడిగించగలదు, కానీ నిజమైన resetను ఎప్పటికీ ముందుగా ముగించదు. స్పష్టమైన ఆపరేటర్ నియమం దాని ఖచ్చితమైన `cooldownMs`ను కొనసాగిస్తుంది. `markAccountUnavailable`లోని connection-cooldown రక్షణలను నియమం లేదా డిఫాల్ట్ ఏదీ దాటవేయదు: సక్రియంగా ఉన్న, ఎక్కువ వ్యవధి కలిగిన cooldown ఎప్పటికీ తగ్గించబడదు మరియు terminal status ఎప్పటికీ ఓవర్రైట్ చేయబడదు. `checkFallbackError`లో ముందుగా అమలయ్యే అంతర్నిర్మిత text detectorలు (credits exhausted, daily quota, account deactivated) తమకు సంబంధించిన పదబంధాల విషయంలో ఇప్పటికీ ప్రాధాన్యత పొందుతాయి.

**తెలిసిన లోటు — `providerRuleRegistry` HTTP 400 కోసం ఎప్పుడూ పరిశీలించబడదు.**
`checkFallbackError`లోని `BAD_REQUEST` శాఖ status 400ను పూర్తిగా తన స్వంత pattern arrays (`accountFallback.ts`లోని `MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` మొదలైనవి) ద్వారా వర్గీకరిస్తుంది; దాని పైనున్న `configuredRule`/`getProviderErrorRuleMatch` శాఖకు చేరుకునేలోపే return అవుతుంది. `status: 400` కలిగిన అంతర్నిర్మిత కేటలాగ్ నియమం (లేదా ఆపరేటర్ నియమం) సింటాక్స్ పరంగా చెల్లుబాటు అయినప్పటికీ ఎప్పటికీ అమలుకాదు. ప్రస్తుతం ఏ నియమమూ 400ను లక్ష్యంగా చేసుకోలేదు, కాబట్టి productionలో ఏదీ ప్రభావితం కాదు — అయితే భవిష్యత్తులో 400 నియమం అవసరమైతే ముందుగా ఈ శాఖను మార్చాలి. ఇది నియమాన్ని జోడించడం కంటే పెద్ద మార్పు, ఎందుకంటే pattern-array ప్రవర్తనపై ఇప్పటికే ఆధారపడుతున్న ప్రతి provider కోసం 400 వర్గీకరణను ఇది మార్చుతుంది; అందువల్ల ఒకే provider నియమం జోడింపు పరిధికి ఇది బయట ఉంటుంది.

### కొత్త quota-misstating gatewayను జోడించడం

1. `statusRestatementRegistry`లో ఒక rule arrayను నమోదు చేయండి
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   provider-specificగా ఉంచండి; `CREDITS_EXHAUSTED_SIGNALS`తో ఢీకొనే
   సాధారణ English పదబంధాలను ఎప్పుడూ మళ్లీ ఉపయోగించవద్దు
   (`open-sse/services/accountFallback.ts`).
2. సరైన lock scopeను ఎంచుకోవడానికి classification rulesను
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)లో
   ఐచ్ఛికంగా నమోదు చేయవచ్చు (`connection` account-wide quota కోసం,
   `model` ప్రతి-model లోపాల కోసం). ఈ దశ productionలో పూర్తి error text
   అవసరమైన providersకే ప్రభావితం అవుతుంది (body markers): అదే ఫైల్లో
   provider idను `FULL_TEXT_RULE_PROVIDERS`కు జోడించండి — లేకపోతే
   `checkFallbackError` structured `{code, type}` errorనే నియమానికి
   అందిస్తుంది, మరియు body-text rule live trafficలో ఎప్పటికీ match కాదు.
   `status`/`headers`పై మాత్రమే match అయ్యే నియమాలకు (Opencode లేదా
   Minimax నియమాల వంటివి) ఈ opt-in అవసరం లేదు. అదనంగా, నియమం
   `scope: "connection"`ను ప్రకటించి, ఉద్దేశ్యం నిజమైన connection-wide
   cooldownతో పాటు same-request combo skip కావాలంటే (కేవలం
   informational label కాకుండా), అదే ఫైల్లో provider idను
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`కు జోడించండి — ఇదే
   `markAccountUnavailable()` (`src/sse/services/auth.ts`)లోని
   `isAgentrouterConnectionQuotaScope()`-శైలి consumptionను మరియు
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)ను నియంత్రిస్తుంది;
   ఇది లేకపోతే `scope` `fallbackResult.ruleScope`లో కొనసాగుతుంది, కానీ
   దాని ఆధారంగా ఏ చర్యా జరగదు.
3. `tests/unit/upstream-status-restatement.test.ts` మరియు
   `tests/unit/agentrouter-error-rules.test.ts`ను అనుసరించే unit testsను
   జోడించండి (అందులో not-permanent / not-creditsExhausted guards ఉండాలి;
   అలాగే providerకు allowlist అవసరమైతే, ఆ provider కోసం మాత్రమే
   `resolveRuleMatchBody()` పూర్తి textను తిరిగి ఇస్తుందని నిర్ధారించే testను
   జోడించాలి).

`chatCore.ts`, `classifyError` లేదా comboలో ఎలాంటి మార్పులూ అవసరం లేదు.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`లోని providers (opencode family)ను
IP-bucketed upstreamగా పరిగణిస్తారు (opencode free tier
account-bucketed కాకుండా IP-bucketed — #9611 చూడండి): status-429ను
`quota_exhausted` **లేదా** `rate_limit_exceeded`గా వర్గీకరించినప్పుడు,
rotation వాటిని ప్రయత్నించే ముందే, విఫలమైన connectionకు చివరిగా తెలిసిన
egress IPతో సరిపోలే allowlisted-family connections అన్నింటికీ cooldown
వర్తిస్తుంది — N-1 ఖచ్చితంగా విఫలమయ్యే upstream callsను నివారించడానికి
(#10460/#10525తో సమానమైన రూపం). `rate_limit_exceeded`ను ఉద్దేశపూర్వకంగా
చేర్చారు: `markAccountUnavailable` మార్గంలో opencode-specific నియమాలు
ఎప్పుడూ match కావు (`checkFallbackError`కు headers/body అందించబడవు,
opencode `FULL_TEXT_RULE_PROVIDERS`లో లేదు). అందువల్ల subscription-quota
text ("monthly usage limit reached") కలిగిన 429ను
`status_429` ruleకు చేరుకునేలోపే quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown)
ద్వారా `quota_exhausted`గా వర్గీకరిస్తారు — కాగా quota-text లేని 429
(సాధారణ rate limiting) `status_429` rule ద్వారా
`rate_limit_exceeded`గా వర్గీకరించబడుతుంది మరియు IP familyకి cooldown
ఇప్పటికీ వర్తిస్తుంది. Allowlisted provider కోసం IP-bucketed rate limit,
exhausted quotaకు సమానమైన signal. వాస్తవ పరిమితులు:

- **సాధ్యమైనంతవరకు**: లాక్ `proxy_logs` నుంచి కనెక్షన్కు తెలిసిన చివరి `egress_ip`ని
  పరిష్కరిస్తుంది (24గం. విండో, సింక్రోనస్, కాష్ లేదు). కాష్ ఖాళీగా ఉంటే (`egress
IP` ఎప్పుడూ పరిశీలించబడకపోతే) లేదా వరుస లేకపోతే → విఫలమైన కనెక్షన్ బ్రాంచ్ ద్వారా
  ఇప్పటికీ కూల్డౌన్ చేయబడుతుంది (ఈరోజు లాగానే రికార్డ్ అవుతుంది), అయితే ఏ
  సిబ్లింగ్కు లాక్ వేయబడదు.
- **ఎప్పుడూ టెర్మినల్ కాదు**: కూల్డౌన్ అనేది పునరుద్ధరించబడే కోటా విండో
  (`testStatus: "unavailable"`); IP-స్థాయి సిగ్నల్ నుంచి శాశ్వత స్థితి ఎప్పుడూ
  ఉత్పన్నం కాదు. `disableCooling` ఉన్న కనెక్షన్లు ఈ బ్రాంచ్ను పూర్తిగా
  దాటవేస్తాయి.
- **అనుమతించబడిన కుటుంబానికి లాక్ గ్రాన్యులారిటీ మారుతుంది**: ఇది కేవలం సిబ్లింగ్
  ఆప్టిమైజేషన్ కాదు, స్కోప్ మార్పు. opencode ఒక `passthroughModels`
  ప్రొవైడర్ కాబట్టి, ఈ బ్రాంచ్కు ముందు 429 ప్రతి MODELకు ప్రత్యేక లాక్అవుట్ను
  సృష్టించేది; ఇప్పుడు ఇది కనెక్షన్ కూల్డౌన్ను సృష్టిస్తుంది — సిబ్లింగ్ ఏదీ
  లేని ఒక్క కనెక్షన్ను ఆపరేటర్ నడుపుతున్న సందర్భానికీ ఇది వర్తిస్తుంది. ఇదే
  opencode నియమాల పట్టిక ఇప్పటికే సరైనదిగా ప్రకటించిన గ్రాన్యులారిటీ
  (`scope: "connection"`, `providerErrorRules.ts`); అయితే opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`లో లేకపోవడంతో ఇది ఇప్పటివరకు ఎప్పుడూ
  అమలు కాలేదు. ఈ బ్రాంచ్ విఫలమైన కనెక్షన్కి సంబంధించిన కూల్డౌన్ +
  `backoffLevel`ను స్వయంగా రాస్తుంది, కనెక్షన్-స్కోప్డ్ agentrouter బ్రాంచ్ను
  అనుకరిస్తుంది, ఆపై రిటర్న్ చేస్తుంది — ప్రతి-మోడల్ బ్లాక్ మరియు దిగువనున్న
  జెనరిక్ పాత్ ఎప్పుడూ చేరుకోబడవు.
- **కాంబో కూడా చేర్చబడింది**: agentrouter బ్రాంచ్లాగే, 429కి కాంబో కాలర్ వర్తించే
  `persistUnavailableState`/`isCombo` డౌన్గ్రేడ్ను ఈ స్కోప్ ఉద్దేశపూర్వకంగా
  పట్టించుకోదు. ప్రతి-మోడల్ లాక్అవుట్ ఈ స్కోప్కు బలహీనమైన రూపం కాదు; అది
  తప్పు యూనిట్: అది ఖాళీ అయిన IP గురించి ఏమీ చెప్పదు, కాబట్టి కాంబో రొటేషన్
  ప్రతి సిబ్లింగ్కు ఖచ్చితంగా విఫలమయ్యే ఒక కాల్ను ఖర్చు చేస్తూనే ఉంటుంది.
- **సిబ్లింగ్ భద్రత**: ఇప్పటికే టెర్మినల్ స్థితిలో ఉన్న సిబ్లింగ్
  (banned/credits_exhausted) లేదా ఇప్పటికే ఎక్కువకాల కూల్డౌన్లో ఉన్న సిబ్లింగ్
  ఎప్పుడూ ఓవర్రైట్ చేయబడదు.
- **ప్రత్యేక అనుమతి జాబితా**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ను విస్తరించడం
  స్పష్టమైన యజమాని నిర్ణయం; జెనరిక్ వైరింగ్ ఉండదు (ప్యాటర్న్ #10334/#10419).
  సిబ్లింగ్ క్వెరీ అదే అనుమతి జాబితాను బైండ్ చేస్తుంది, దాన్ని SQL లిటరల్గా
  మళ్లీ రాయదు; కాబట్టి దాన్ని విస్తరించడం ఒకే లైన్ మార్పుగా ఉంటుంది.
- **రెండు దిశల్లో Egress IP రొటేషన్**: లుకప్ విండో (24గం.) Egress-IP కాష్ TTL
  (5 నిమి.) కంటే చాలా పెద్దది, కాబట్టి "చివరిగా తెలిసిన IP" ప్రస్తుత స్థితి కాదు,
  చరిత్ర. కనెక్షన్కి చెందిన ప్రాక్సీ విండోలో రొటేట్ అయితే, లాక్ నిజంగా
  షేర్ చేయబడిన IPను **మిస్** చేయవచ్చు (రికార్డ్ అయిన IP కొత్తది, ఇంకా ఖాళీగా
  ఉన్నది) — అలాగే విఫలమైన IP నుంచి అప్పటికే రొటేట్ అయిపోయిన సిబ్లింగ్ను
  **కూల్** చేయవచ్చు. రెండవ సందర్భంలో ఆ సిబ్లింగ్కు ఒక కూల్డౌన్ విండో ఖర్చవుతుంది;
  చరిత్ర-ఆధారిత లుకప్కు ఇవి రెండూ అంగీకరించబడిన సాధ్యమైనంతవరకు పరిమితులు.
- **ఖర్చు**: `proxy_logs`పై రెండు పరిమిత స్కాన్లు
  (`idx_pl_timestamp` ద్వారా విండో-ఫిల్టర్ చేయబడినవి), 429 వచ్చినప్పుడే. కొత్త
  ఇండెక్స్ లేదు (మైగ్రేషన్ 134 YAGNI). మధ్యస్థ పరిమాణంలోని నిజమైన ట్రాఫిక్ DB
  కాపీపై కొలిచబడింది; అధిక-త్రూపుట్ ఇన్స్టాన్స్ అదే విండోలో అనుపాతంగా ఎక్కువ
  వరుసలను కలిగి ఉంటుంది.

## ఇతర స్థితిస్థాపకత లక్షణాలు

- **20 రూటింగ్ వ్యూహాలు** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — చూడండి [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **రీసెట్-అవేర్ రూటింగ్** (v3.8.0) — కోటా రీసెట్ సమయం ఆధారంగా కనెక్షన్లకు ప్రాధాన్యత ఇస్తుంది.
- **బ్యాక్గ్రౌండ్ మోడ్ క్షీణత** — Responses API `background: true` హెచ్చరికతో సింక్గా క్షీణించబడుతుంది.
- **డైనమిక్ టూల్ పరిమితి గుర్తింపు** — టూల్ సంఖ్య పరిమితులు చేరినప్పుడు ప్రొవైడర్లను వెనక్కి తగ్గిస్తుంది.
- **అత్యవసర ఫాల్బ్యాక్** — `OMNIROUTE_EMERGENCY_FALLBACK` ద్వారా నియంత్రించబడుతుంది; ఆపరేటర్లు రీస్టార్ట్ లేకుండా ఫీచర్ ఫ్లాగ్స్ పేజీ నుండి దాన్ని భర్తీ చేయవచ్చు.

---

## డీబగ్గింగ్

- వెయిటెడ్ కాంబో `503 all_targets_cooling_down` అని సమాధానం ఇస్తుంది (`Retry-After` సెట్ చేయబడింది, `diagnostics.excluded` ప్రతి లక్ష్యాన్ని `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`తో జాబితా చేస్తుంది) → పూల్ కాన్ఫిగర్ చేయబడి కనెక్ట్ చేయబడింది, ప్రతి లక్ష్యం కేవలం ఒక స్థితిస్థాపకత టైమర్ ద్వారా మినహాయించబడింది; `[COMBO] Weighted selection: every target excluded before dispatch — …` హెచ్చరిక కారణాలను మరియు మిగిలిన సెకన్లను పేర్కొంటుంది. అదే కాంబో నుండి వచ్చే `404 no_executable_targets` అంటే ఏ స్థితిస్థాపకత టైమర్ పాల్గోలేదని అర్థం (అమలు చేయడానికి ఏమీ లేదు, లేదా ప్రతి ఖాతా అందుబాటు పరీక్షలో విఫలమైంది). `targetResolution.ts`లో సేకరించిన మినహాయింపుల నుండి `open-sse/services/combo/pinRecovery.ts`లో నిర్మించబడింది.
- ఒక ప్రొవైడర్ యొక్క అన్ని కీలు దాటవేయబడ్డాయి → సర్క్యూట్ బ్రేకర్ స్థితిని మరియు ప్రతి కనెక్షన్ యొక్క `rateLimitedUntil`/`testStatus` రెండింటినీ తనిఖీ చేయండి.
- రీసెట్ విండో తర్వాత ప్రొవైడర్ శాశ్వతంగా మినహాయించబడింది → `getStatus()`/`canExecute()`కు బదులుగా ముడి `state`ను చదువుతున్న కోడ్.
- ఒక కీ విఫలమైంది, ఇతరులు పనిచేయాలి → సర్క్యూట్ బ్రేకర్ కంటే కనెక్షన్ కూల్డౌన్కు ప్రాధాన్యత ఇవ్వండి.
- ఒక్క మోడల్ మాత్రమే విఫలమవుతుంది → కనెక్షన్ కూల్డౌన్ కంటే మోడల్ లాక్అవుట్కు ప్రాధాన్యత ఇవ్వండి.
- స్థితి స్వయంచాలకంగా పునరుద్ధరించాలి కానీ పునరుద్ధరించడం లేదు → భవిష్యత్ టైమ్స్టాంప్ + గడువు ముగిసిన స్థితిని రిఫ్రెష్ చేసే రీడ్ పాత్ కోసం తనిఖీ చేయండి. శాశ్వత స్థితులకు మాన్యువల్ మార్పులు అవసరం.

---

## రన్టైమ్ స్థితి — ఏజెంట్ త్వరిత సూచన

> `AGENTS.md` → "Resilience Runtime State" (PR #12743) నుండి అక్షరాలా తరలించబడింది, తద్వారా ఏజెంట్
> గైడ్ 40k కాంటెక్స్ట్ బడ్జెట్ కిందే ఉంటుంది. ఇది పై విభాగాల యొక్క సంక్షిప్త, ఏజెంట్-ముఖమైన
> వీక్షణ; సంఖ్యిత విభాగాలు పూర్తి సూచనగా కొనసాగుతాయి.

OmniRoute మూడు పరస్పరం సంబంధం ఉన్న కానీ విభిన్నమైన తాత్కాలిక-వైఫల్య విధానాలను కలిగి ఉంది. రూటింగ్ ప్రవర్తనను డీబగ్ చేసేటప్పుడు వాటి
పరిధిని వేరుగా ఉంచండి. ఒకే చూపులో తెలిసే మ్యాప్ కోసం
[3-లేయర్ స్థితిస్థాపకత రేఖాచిత్రం](../diagrams/exported/resilience-3layers.svg)
(మూలం: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
చూడండి.

### ప్రొవైడర్ సర్క్యూట్ బ్రేకర్

**పరిధి**: మొత్తం ప్రొవైడర్, ఉదా. `glm`, `openai`, `anthropic`.

**ఉద్దేశ్యం**: అప్స్ట్రీమ్/సర్వీస్ స్థాయిలో పదేపదే విఫలమవుతున్న ప్రొవైడర్కు ట్రాఫిక్ పంపడం ఆపడం, తద్వారా ఒక అనారోగ్య ప్రొవైడర్ ప్రతి అభ్యర్థనను నెమ్మదించకూడదు.

**అమలు**:

- ప్రధాన క్లాస్: `src/shared/utils/circuitBreaker.ts`
- చాట్ గేట్/ఎక్సిక్యూషన్ వైరింగ్: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- రన్టైమ్ స్థితి API: `src/app/api/monitoring/health/route.ts`
- షేర్డ్ ర్యాపర్లు: `open-sse/services/accountFallback.ts`
- శాశ్వతంగా నిల్వ చేయబడిన స్థితి పట్టిక: `domain_circuit_breakers`

**స్థితులు** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: సాధారణ ట్రాఫిక్ అనుమతించబడుతుంది.
- `DEGRADED`: ముందస్తు-హెచ్చరిక పరిధి — వైఫల్యాలు క్షీణత పరిమితిని దాటాయి కానీ ఇంకా
  బ్రేకర్ పరిమితిని దాటలేదు; ట్రాఫిక్ ఇంకా ప్రవహిస్తుంది, డ్యాష్బోర్డ్లు హెచ్చరికను చూపిస్తాయి. చెల్లుబాటు అయ్యే కనెక్షన్
  పరీక్ష లేదా కొత్త వైఫల్యం లేని ప్రశాంత విండో దీన్ని తిరిగి `CLOSED`కు తీసుకువస్తుంది
  (విండో వివరాలు `docs/architecture/RESILIENCE_GUIDE.md`లో ఉన్నాయి).
- `OPEN`: ప్రొవైడర్ తాత్కాలికంగా నిరోధించబడింది; కాలర్లకు ప్రొవైడర్-సర్క్యూట్-ఓపెన్ ప్రతిస్పందన
  లభిస్తుంది లేదా కాంబో రూటింగ్ మరో లక్ష్యానికి దాటవేస్తుంది.
- `HALF_OPEN`: రీసెట్ గడువు ముగిసింది; ఒక పరీక్ష (ప్రోబ్) అభ్యర్థనను అనుమతిస్తుంది. విజయం బ్రేకర్ను
  మూసివేస్తుంది, వైఫల్యం దాన్ని మళ్లీ తెరుస్తుంది.

**డిఫాల్ట్లు** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts`లోని
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` ద్వారా వినియోగించబడుతుంది →
`src/sse/handlers/chatHelpers.ts`లోని `getCircuitBreaker(provider, …)`). మొత్తం-ప్రొవైడర్
బ్రేకర్ `circuitBreakerThreshold` / `circuitBreakerReset`పై నడుస్తుంది:

| ప్రొఫైల్ | క్షీణించే పరిమితి | తెరిచే పరిమితి (`circuitBreakerThreshold`) | రీసెట్ (`circuitBreakerReset`) |
| -------- | ----------------: | -----------------------------------------: | -----------------------------: |
| OAuth    |               `5` |                                        `8` |                          `60s` |
| API key  |               `7` |                                       `12` |                          `30s` |
| Local    |         (derived) |                                        `2` |                          `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 నిమి) మరియు `providerCooldownMs` (5/10/1 నిమి)లను కూడా నిర్వచిస్తుంది: ఇవి
**ఆప్ట్-ఇన్ గ్లోబల్ Provider Cooldown యొక్క విండో గేట్**ను శక్తివంతం చేస్తాయి (`PROVIDER_COOLDOWN_ENABLED`, డిఫాల్ట్
ఆఫ్) — `open-sse/services/providerCooldownTracker.ts`లోని ప్రొవైడర్-స్థాయి ఎంట్రీ
`providerFailureWindowMs` లోపల `providerFailureThreshold` వైఫల్యాల తర్వాత మాత్రమే
కూలింగ్గా పరిగణించబడుతుంది, ఆపై `providerCooldownMs` పాటు కూల్ అవుతుంది. ఇవి ప్రస్తుత బ్రేకర్ యొక్క
పరిమితులు కావు — బ్రేకర్ ప్రవర్తనను ఆశించి వాటిని ట్యూన్ చేయవద్దు. ప్రతి డిఫాల్ట్
`OMNIROUTE_PROVIDER_BREAKER_*` మరియు `OMNIROUTE_CIRCUIT_BREAKER_*` env వేరియబుల్స్ ద్వారా భర్తీ చేయబడవచ్చు;
రన్టైమ్-ఖచ్చితమైన సూచన పట్టిక `docs/architecture/RESILIENCE_GUIDE.md`లో ఉంది.

ప్రొవైడర్-స్థాయి వైఫల్య స్థితులు మాత్రమే ప్రొవైడర్ బ్రేకర్ను ట్రిప్ చేయాలి:

```ts
(408, 500, 502, 503, 504);
```

చాలా `401`, `403` లేదా `429` సందర్భాల వంటి సాధారణ ఖాతా/కీ/మోడల్ లోపాల కోసం మొత్తం-ప్రొవైడర్ బ్రేకర్ను
ట్రిప్ చేయవద్దు. అవి సాధారణంగా కనెక్షన్ కూల్డౌన్ లేదా మోడల్
లాక్అవుట్ పరిధికి చెందినవి. జనరిక్ API-కీ ప్రొవైడర్ `403` తుది
ప్రొవైడర్/ఖాతా లోపంగా వర్గీకరించబడకపోతే పునరుద్ధరించదగినదిగా ఉండాలి.

బ్రేకర్ బ్యాక్గ్రౌండ్ టైమర్ కాకుండా లేజీ రికవరీని ఉపయోగిస్తుంది. `OPEN` గడువు ముగిసినప్పుడు, `getStatus()`, `canExecute()`, మరియు `getRetryAfterMs()` వంటి రీడ్లు స్టేట్ను `HALF_OPEN` కు రిఫ్రెష్ చేస్తాయి, కాబట్టి డ్యాష్బోర్డ్లు మరియు కాంబో క్యాండిడేట్ బిల్డర్లు గడువు ముగిసిన ప్రొవైడర్ను ఎప్పటికీ మినహాయించడం కొనసాగించవు.

### కనెక్షన్ కూల్డౌన్

**స్కోప్**: ఒక ప్రొవైడర్ కనెక్షన్/అకౌంట్/కీ.

**ఉద్దేశ్యం**: అదే ప్రొవైడర్ కోసం ఇతర కనెక్షన్లు అభ్యర్థనలను అందించడం కొనసాగించడానికి అనుమతిస్తూ, ఒక చెడ్డ కీ/అకౌంట్ను తాత్కాలికంగా దాటవేయడం.

**ఇంప్లిమెంటేషన్**:

- రైట్/అప్డేట్ పాత్: `src/sse/services/auth.ts::markAccountUnavailable()`
- అకౌంట్ ఎంపిక/ఫిల్టరింగ్: `src/sse/services/auth.ts::getProviderCredentials...`
- కూల్డౌన్ లెక్కింపు: `open-sse/services/accountFallback.ts::checkFallbackError()`
- సెట్టింగ్లు: `src/lib/resilience/settings.ts`

ప్రొవైడర్ కనెక్షన్లపై ముఖ్యమైన ఫీల్డ్లు:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

అకౌంట్ ఎంపిక సమయంలో, కింది పరిస్థితిలో ఉన్నంతవరకు కనెక్షన్ దాటవేయబడుతుంది:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

కూల్డౌన్లు కూడా లేజీ: `rateLimitedUntil` గతంలో ఉన్నప్పుడు, కనెక్షన్ మళ్లీ అర్హత పొందుతుంది. విజయవంతమైన వినియోగంలో, `clearAccountError()` `testStatus`, `rateLimitedUntil`, ఎర్రర్ ఫీల్డ్లు మరియు `backoffLevel`ను క్లియర్ చేస్తుంది.

డిఫాల్ట్ కనెక్షన్ కూల్డౌన్ ప్రవర్తన:

- OAuth బేస్ కూల్డౌన్: `5s`.
- API-key బేస్ కూల్డౌన్: `3s`.
- API-key `429` అందుబాటులో ఉన్నప్పుడు అప్స్ట్రీమ్ రిట్రై హింట్లకు (`Retry-After`, రీసెట్ హెడర్లు, లేదా పార్స్ చేయగల రీసెట్ టెక్స్ట్) ప్రాధాన్యం ఇవ్వాలి.
- పునరావృత రికవరబుల్ వైఫల్యాలు ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్ ఉపయోగిస్తాయి:

```ts
baseCooldownMs * 2 ** failureIndex;
```

యాంటీ-థండరింగ్-హెర్డ్ గార్డ్ అదే కనెక్షన్పై జరిగే ఏకకాల వైఫల్యాలు కూల్డౌన్ను పదేపదే పొడిగించడం లేదా `backoffLevel`ను డబుల్-ఇన్క్రిమెంట్ చేయడం నివారిస్తుంది.

టెర్మినల్ స్టేట్లు కూల్డౌన్లు కావు. `banned`, `expired` (`EXPIRED_RETRY_MAX` ద్వారా N బౌండెడ్ రిట్రైల తర్వాత మాత్రమే టెర్మినల్ అవుతుంది), మరియు `credits_exhausted` క్రెడెన్షియల్స్/సెట్టింగ్లు మారే వరకు లేదా ఒపరేటర్ వాటిని రీసెట్ చేసే వరకు అందుబాటులో లేకుండా ఉండాలని ఉద్దేశించబడ్డాయి. టెర్మినల్ స్టేట్లను తాత్కాలిక కూల్డౌన్ స్టేట్తో ఓవర్రైట్ చేయవద్దు.

### మోడల్ లాక్అవుట్

**స్కోప్**: ప్రొవైడర్ + కనెక్షన్ + మోడల్.

**ఉద్దేశ్యం**: ఆ కనెక్షన్ కోసం ఒకే మోడల్ మాత్రమే అందుబాటులో లేనప్పుడు లేదా కోటా-పరిమితం చేయబడినప్పుడు మొత్తం కనెక్షన్ను డిసేబుల్ చేయడం నివారించడం.

ఉదాహరణలు:

- `429` రిటర్న్ చేసే పర్-మోడల్ కోటా ప్రొవైడర్లు.
- ఒక మిస్సింగ్ మోడల్ కోసం `404` రిటర్న్ చేసే లోకల్ ప్రొవైడర్లు.
- ఎంచుకున్న Grok మోడ్లు వంటి ప్రొవైడర్-నిర్దిష్ట మోడ్/మోడల్ అనుమతి వైఫల్యాలు.

మోడల్ లాక్అవుట్ `open-sse/services/accountFallback.ts`లో ఉంటుంది మరియు అదే కనెక్షన్ ఇతర మోడల్లను అందించడం కొనసాగించడానికి అనుమతిస్తుంది.

### డీబగ్గింగ్ మార్గదర్శకత్వం

- ప్రొవైడర్ కోసం అన్ని కీలు దాటవేయబడినట్లయితే, ప్రొవైడర్ బ్రేకర్ స్టేట్ మరియు ప్రతి కనెక్షన్ యొక్క `rateLimitedUntil`/`testStatus` రెండింటినీ పరిశీలించండి.
- రీసెట్ విండో తర్వాత ప్రొవైడర్ శాశ్వతంగా మినహాయించబడినట్లు కనిపిస్తే, కోడ్ `getStatus()`/`canExecute()` ఉపయోగించడానికి బదులుగా రా `state`ను చదువుతోందో లేదో తనిఖీ చేయండి.
- ఒక ప్రొవైడర్ కీ విఫలమై కానీ ఇతరులు పని చేయాల్సి ఉంటే, ప్రొవైడర్ బ్రేకర్ కంటే కనెక్షన్ కూల్డౌన్కు ప్రాధాన్యం ఇవ్వండి.
- ఒకే మోడల్ మాత్రమే విఫలమైతే, కనెక్షన్ కూల్డౌన్ కంటే మోడల్ లాక్అవుట్కు ప్రాధాన్యం ఇవ్వండి.
- ఒక స్టేట్ స్వయంచాలకంగా రికవర్ అవ్వాల్సి ఉంటే, దానికి భవిష్యత్ టైమ్స్టాంప్/రీసెట్ టైమ్అవుట్ మరియు గడువు ముగిసిన స్టేట్ను రిఫ్రెష్ చేసే రీడ్ పాత్ ఉండాలి. శాశ్వత స్టేటస్లకు మాన్యువల్ క్రెడెన్షియల్ లేదా కాన్ఫిగ్ మార్పులు అవసరం.

---

## TLS ఫింగర్ప్రింటింగ్ & స్టెల్త్

ప్రొవైడర్-నిర్దిష్ట స్టెల్త్ (JA3/JA4, CCH, అస్పష్టీకరణ) విడిగా డాక్యుమెంట్ చేయబడింది — `docs/security/STEALTH_GUIDE.md` చూడండి (git; `/docs`లోకి కంపైల్ చేయబడలేదు).

---

## రెసిలియన్స్ టెస్టింగ్ (దశ 8 · బ్లాక్ C)

రెసిలియన్స్ లాజిక్ కోసం యూనిట్ టెస్ట్లకు మించి, మూడు టెస్ట్లు నిజమైన స్ట్రెస్/వైఫల్య పరిస్థితుల్లో రన్టైమ్ను పరీక్షిస్తాయి (అన్నీ ఇంటిగ్రేషన్/నైట్లీ — ఏదీ PRలను బ్లాక్ చేయవు):

| టెస్ట్      | ఏమిటి                                                                                                                                                                                                              | రన్                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Chaos       | ఫేక్-అప్స్ట్రీమ్ నోడ్ నిజమైన లేటెన్సీ/రీసెట్/టైమ్అవుట్/503ను ఇంజెక్ట్ చేస్తుంది; సర్క్యూట్ బ్రేకర్ ఓపెన్/రికవర్ అవుతుందని మరియు `checkFallbackError` 503ను రికవరబుల్ ఫాల్బ్యాక్గా వర్గీకరిస్తుందని ధృవీకరిస్తుంది. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-growth | `--expose-gc` కింద `createSSEStream`కి ~500 స్ట్రీమ్లు; హీప్ పరిమితిని దాటి పెరిగితే ఫెయిల్ అవుతుంది (OOM గార్డ్ #3069).                                                                                           | `npm run test:heap`                     |
| k6 soak     | `/api/monitoring/health`పై నిరంతర లోడ్; p95/ఎర్రర్ థ్రెష్హోల్డ్లు.                                                                                                                                                 | `k6 run tests/load/k6-soak.js` (నైట్లీ) |

`.github/workflows/nightly-resilience.yml` ద్వారా ఆర్కెస్ట్రేట్ చేయబడింది (cron + dispatch). డిఫాల్ట్ `test:integration`లో, chaos మరియు heap సెల్ఫ్-స్కిప్ అవుతాయి (`RUN_CHAOS_INT`/`--expose-gc` లేకుండా).

---

## ఇవి కూడా చూడండి

- [ఆర్కిటెక్చర్ గైడ్](./ARCHITECTURE.md) — సిస్టమ్ ఆర్కిటెక్చర్ మరియు ఇంటర్నల్స్
- [యూజర్ గైడ్](../guides/USER_GUIDE.md) — ప్రొవైడర్లు, కాంబోలు, CLI ఇంటిగ్రేషన్
- [ఆటో-కాంబో ఇంజిన్](../routing/AUTO-COMBO.md) — 16-ఫ్యాక్టర్ స్కోరింగ్, మోడ్ ప్యాక్లు
