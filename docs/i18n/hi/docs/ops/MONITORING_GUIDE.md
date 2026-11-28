# Monitoring & Observability Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute अंतर्निहित स्वास्थ्य निगरानी, प्रदाता ऑटोपायलट, कोटा ट्रैकिंग और ऑब्ज़र्वेबिलिटी हुक्स के साथ आता है। यह गाइड डैशबोर्ड, अलर्ट और समस्या निवारण को कवर करती है।

**स्रोत:**

- `src/lib/monitoring/observability.ts` — ऑब्ज़र्वेबिलिटी स्नैपशॉट
- `src/lib/monitoring/comboHealthAutopilot.ts` — कॉम्बो स्वास्थ्य ऑटोपायलट
- `src/lib/monitoring/providerHealthAutopilot.ts` — प्रदाता ऑटोपायलट
- `src/lib/monitoring/providerHealthMatrix.ts` — प्रदाता स्वास्थ्य मैट्रिक्स
- `src/lib/localHealthCheck.ts` — स्थानीय स्वास्थ्य जाँच
- `src/lib/tokenHealthCheck.ts` — टोकन रिफ़्रेश स्वास्थ्य
- `src/lib/proxyHealth.ts` — प्रॉक्सी स्वास्थ्य कैश (PROXY_GUIDE.md में कवर किया गया है)

---

## अवलोकन

OmniRoute में निगरानी की **3 परतें** हैं:

```
┌──────────────────────────────────────────────────────────────┐
│  परत 1: सिस्टम स्वास्थ्य (सर्वर-स्तर)                        │
│  ├─ localHealthCheck.ts — DB, पोर्ट, नेटिव निर्भरताएँ         │
│  ├─ db/healthCheck.ts — अखंडता, FK, अनाथ आर्टिफ़ैक्ट्स        │
│  └─ डैशबोर्ड: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  परत 2: प्रदाता स्वास्थ्य (प्रति-प्रदाता लचीलापन)             │
│  ├─ providerHealthAutopilot.ts — सर्किट ब्रेकर, कूलडाउन       │
│  ├─ providerHealthMatrix.ts — प्रदाता/मॉडल के अनुसार स्वास्थ्य स्कोर │
│  └─ डैशबोर्ड: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  परत 3: लाइव ऑब्ज़र्वेबिलिटी (रनटाइम स्नैपशॉट)               │
│  ├─ observability.ts — सर्किट ब्रेकर, सेशन, कोटा              │
│  ├─ tokenHealthCheck.ts — OAuth टोकन रिफ़्रेश स्वास्थ्य       │
│  └─ MCP टूल्स: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## डैशबोर्ड पेज

### `/dashboard/health` (सिस्टम स्वास्थ्य)

शीर्ष-स्तरीय स्वास्थ्य डैशबोर्ड यह दिखाता है:

| अनुभाग               | यह क्या दिखाता है                                     |
| -------------------- | ----------------------------------------------------- |
| **सर्वर स्थिति**     | अपटाइम, संस्करण, पोर्ट, सक्रिय कनेक्शन                |
| **डेटाबेस**          | कनेक्शन, अखंडता, WAL आकार, हालिया माइग्रेशन           |
| **प्रदाता सारांश**   | सक्रिय संख्या, स्वस्थ संख्या, खुले ब्रेकरों की संख्या |
| **कोटा मॉनिटर**      | सक्रिय सेशन, अलर्टिंग, समाप्त कोटा                    |
| **हालिया त्रुटियाँ** | स्टैक ट्रेस सहित अंतिम 10 त्रुटियाँ                   |
| **संसाधन उपयोग**     | मेमोरी, CPU, हीप दबाव संकेतक                          |

### `/dashboard/providers` (प्रदाता स्वास्थ्य)

प्रति-प्रदाता डैशबोर्ड:

| कॉलम      | विवरण                                         |
| --------- | --------------------------------------------- |
| प्रदाता   | प्रदाता ID + प्रदर्शन नाम                     |
| स्वास्थ्य | हरी/पीली/लाल स्थिति                           |
| सर्किट    | खुली/बंद/आधी-खुली स्थिति                      |
| कनेक्शन   | कनेक्शनों की संख्या, अंतिम रिफ़्रेश           |
| मॉडल      | उपलब्ध मॉडल, प्रति मॉडल स्वास्थ्य             |
| लागत      | आज की लागत, 7-दिन का रुझान                    |
| त्रुटियाँ | पिछले 24h की त्रुटि संख्या, शीर्ष त्रुटि वर्ग |

किसी प्रदाता पर क्लिक करके यह देखें:

- विलंबता विवरण सहित हालिया अनुरोध
- प्रति-कनेक्शन स्वास्थ्य स्कोर
- प्रति-मॉडल लॉकआउट
- ऑटोपायलट अनुशंसाएँ

### `/dashboard/quota` (कोटा ट्रैकिंग)

प्रत्येक API कुंजी के लिए:

- वर्तमान उपयोग बनाम सीमा (प्रगति बार)
- कोटा रुझान (30-दिन का चार्ट)
- अगला रीसेट समय
- अलर्ट इतिहास

### `/dashboard/combos` (कॉम्बो स्वास्थ्य)

प्रति-कॉम्बो:

- रणनीति + लक्ष्य
- प्रति लक्ष्य स्वास्थ्य
- हालिया फ़ॉलबैक घटनाएँ
- सफलता दर (24h, 7d, 30d)

---

## स्वास्थ्य जांच API

OmniRoute उजागर करता है** दो** HTTP स्वास्थ्य सतहें। वे ऑर्केस्ट्रेटर्स के लिए विनिमेय नहीं हैं।

| पथ                           | उद्देश्य                                                     | वज़न                          | के लिए उपयोग करें                                                        |
| ---------------------------- | ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------ |
| `GET /healthz`               | जीवनचक्र liveness/readiness (`ok` / `starting` / `stopping`) | तुच्छ (केवल चरण ध्वज)         | कुबेरनेट्स** तत्परता** ; कोमल** जीवंतता** यदि आपको HTTP उपयोग करना चाहिए |
| `GET /api/monitoring/health` | डीप सिस्टम + प्रदाता सारांश (DB, ढेर, कैटलॉग गिनती,…)        | भारी (सिंक DB /निगरानी कार्य) | डैशबोर्ड, ब्लैकबॉक्स डीप चेक, Docker की अंतर्निहित स्वास्थ्य जांच        |

> **टिप्पणी:** प्रदाता स्वास्थ्य मैट्रिक्स, ऑटोपायलट मुद्दे, कोटा मॉनिटर, टोकन स्वास्थ्य और `/api/monitoring/health` से परे विलंबता विवरण उपलब्ध हैं**MCP उपकरण** `observability_snapshot` या** डैशबोर्ड** पेज — उनके लिए कोई समर्पित REST मार्ग नहीं हैं।

दोनों रूट पर चलते हैं** वही नोड इवेंट लूप** अनुरोध प्रबंधन के रूप में। एक सीपीयू-बाउंड पथ (बड़े `GET /v1/models` कैटलॉग कार्य, लंबे-संदर्भ संपीड़न/टोकन गिनती) में देरी हो सकती है** सभी** HTTP हैंडलर, `/healthz` सहित। इवेंट-लूप व्यस्त ≠ प्रक्रिया मृत। सूअर को ठीक करना पसंद करें; जांच ट्यूनिंग केवल झूठी हत्याओं को कम करती है।

### हल्के ऑर्केस्ट्रेटर जांच

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + बॉडी `ok` जब सर्वर जीवनचक्र चरण तैयार हो जाता है
- **503** बूट या शटडाउन के दौरान + `starting` / `stopping`
- कार्यान्वयन: `src/app/healthz/route.ts` (कोई DB पिंग नहीं)

### सिस्टम स्वास्थ्य (गहरा)

```bash
GET /api/monitoring/health
```

प्रतिक्रिया:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: जांच-कैश बनाम SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` है** इन-मेमोरी जांच-कैश गेज** , `provider_connections.test_status` का लाइव डंप नहीं। #12532 के बाद अनुरोध पथ केवल `getCachedCredentialHealthSummary()` पढ़ता है; पृष्ठभूमि जांच इवेंट लूप से कैश को ताज़ा करती है।

| परत                   | कहाँ                                                                  | इसका क्या मतलब है                                                                                                                                                                                                      |
| --------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| जांच-कैश गेज          | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | अंतिम क्रेडेंशियल-स्वास्थ्य जांच परिणाम अभी भी प्रक्रिया मेमोरी में रखे हुए हैं। `source` हमेशा `probe-cache` है।                                                                                                      |
| विफल कनेक्शन विवरण    | `credentialHealth.failedConnections`                                  | उपस्थित** केवल जब `failed > 0`** . `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`) के साथ कैश पंक्तियों की बंधी हुई सूची। `failedOmitted` तब सेट किया जाता है जब सूची कैप की गई थी। |
| SQLite चिपचिपा स्थिति | `credentialHealth.staleDbNonOkCount`                                  | की गिनती** सक्रिय** (`is_active=1`) कनेक्शन पंक्तियाँ जिनका कायम `test_status` एक ज्ञात गैर-ठीक है (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)।                                  |

दोनों परतें उद्देश्य पर असहमत हो सकती हैं:

- गेज `failed=0` जबकि `staleDbNonOkCount>0` — SQLite में अभी भी एक चिपचिपा `test_status` है (उदाहरण के लिए `expired` या `credits_exhausted`) कि नवीनतम जांच-कैश स्नैपशॉट को `status=error` के रूप में नहीं गिना जाता है।
- गेज `failed>0` जबकि SQLite स्वस्थ दिखता है — एक हालिया जांच विफल रही और कैश किया गया है; DB पंक्ति अद्यतन नहीं की गई है, या बाद में साफ़ कर दी गई है।

इस समापन बिंदु को स्क्रैप करते समय केवल `provider_connections.test_status` पर सचेत न करें। लाइव जांच विफलताओं के लिए `failed` + `failedConnections` उपयोग करें, और जब आपको लगातार स्टिकी-स्टेटस गणना की आवश्यकता हो तो `staleDbNonOkCount` उपयोग करें।

### कुबेरनेट्स अनुशंसाओं की जांच करता है

OmniRoute एक है** एकल नोड प्रक्रिया** (एक इवेंट लूप)। स्टॉक Docker `HEALTHCHECK` हल्के `/healthz` को लक्षित करता है। `/api/monitoring/health` है** बहुत भारी** क्यूबलेट जीवंतता अंतराल के लिए।

| जांच               | अनुशंसित लक्ष्य                                                              | टिप्पणियाँ                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **चालू होना**      | लंबे `failureThreshold` (या बड़े `startPeriod`) के साथ HTTP `GET /healthz`   | कोल्ड स्टार्ट + SQLite माइग्रेशन कुछ सेकंड से अधिक हो सकता है                                                                                                                                                                                                                                                                                       |
| **तत्परता**        | HTTP `GET /healthz`                                                          | जीवनचक्र `ok` / `starting` / `stopping` (200 बनाम 503)। यदि लूप सीपीयू-अवरुद्ध है तो भी फ़्लैप होता है। ए** एकाधिक सेकंड में 200 स्वस्थ नहीं है** (#10303) — इसका मतलब है कि 3-बाइट हैंडलर चलने से पहले ईवेंट लूप भूखा रह गया था                                                                                                                    |
| **जीवंतता**        | HTTP `GET /livez`,** या TCP** मुख्य सेवा पोर्ट पर (`PORT`, डिफ़ॉल्ट `20128`) | `/livez` केवल प्रक्रिया-जीवित है (यदि हैंडलर चलता है तो हमेशा 200)। यह अभी भी इवेंट लूप — व्यस्त ≠ डेड को साझा करता है, और यह इवेंट-लूप भुखमरी (#10303) का TCP से बेहतर पता नहीं लगाता है। पसंद करना**TCP** यदि HTTP जांच catalog/compression लोड के तहत समय समाप्त हो जाती है; करना** नहीं** किसी भी तरह से छोटे इवेंट-लूप स्टालों पर पॉड को मारें |
| **गहरा स्वास्थ्य** | एक बाहरी चेकर से`GET /api/monitoring/health`                                 | क्यूबलेट `livenessProbe` /टाइट `readinessProbe` के लिए नहीं                                                                                                                                                                                                                                                                                         |

उदाहरण आकार (थ्रेसहोल्ड को अपने कोल्ड-स्टार्ट और कम्प्रेशन लोड के अनुसार समायोजित करें):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**ऐसा न करें** बिंदु क्यूबलेट** जीवंतता** `/api/monitoring/health` पर। वह पथ वास्तविक DB/monitoring कार्य करता है और लोड के तहत गलत-सकारात्मक होगा।

संबंधित: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (इवेंट लूप व्यस्त होने पर जांच), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (कैटलॉग प्राइसिंग हॉग), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (संपीड़न टोकन-काउंट हॉग)।

### सिस्टमडी वॉचडॉग (फ्रोजन इवेंट लूप)

सिस्टमड होस्ट पर, OmniRoute सेवा प्रबंधक को बताता है कि यह कब तैयार है और इसे पिंग करता रहता है, इसलिए एक सर्वर जिसका ईवेंट लूप अटक गया है वह चालू और चुप रहने के बजाय बंद हो जाता है और पुनरारंभ हो जाता है। पिंग सर्वर के स्वयं के ईवेंट लूप से आते हैं: जब यह ब्लॉक हो जाता है, तो वे रुक जाते हैं, और एक बार `WatchdogSec` के बिना समाप्त हो जाने पर सिस्टमडी सेवा को पुनरारंभ कर देता है।

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) पहले से ही इसके साथ एक उपयोगकर्ता इकाई लिखता है। एक इकाई जिसे आप स्वयं लिखते हैं (डिफ़ॉल्ट `Type=simple`) को कोई निगरानी नहीं मिलती है, इसलिए इन पंक्तियों को इसके `[Service]` अनुभाग में जोड़ें:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

उत्पन्न इकाई `Restart=on-failure` सेट करती है, इसलिए उस पंक्ति को — भी जोड़ें, इसके बिना वॉचडॉग केवल अटकी हुई सेवा को पुनरारंभ करने के बजाय उसे समाप्त कर देता है।

- `Type=notify`: सेवा "प्रारंभ" होती है जब सर्वर `READY=1` भेजता है, न कि जब प्रक्रिया फोर्क करती है। `TimeoutStartSec` शुरुआत धीमी रही।
- `NotifyAccess=all`: पिंग सर्वर प्रक्रिया द्वारा भेजे जाते हैं, जो `omniroute serve` पर्यवेक्षक का एक बच्चा है।
- `WatchdogSec`: हर 60 सेकंड में पिंग निकल जाती है, इसलिए उपयोग करें** 120 या अधिक** . छोटे मान एक स्वस्थ सर्वर को पुनः आरंभ करेंगे।
- अग्रभूमि में `omniroute serve` चलाएँ. `--daemon` सर्वर को यूनिट के cgroup से अलग कर देता है और नोटिफाई हैंडशेक कभी पूरा नहीं होता है।

जाँचें कि पुनः आरंभ करने के बाद यह सक्रिय है:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` कॉन्फ़िगर विलंब दिखाता है और `WatchdogTimestamp` हर मिनट आगे बढ़ता है। वॉचडॉग द्वारा किया गया पुनरारंभ `Result=watchdog` के रूप में दर्ज किया गया है। यूनिट को वैसे ही रखते हुए पिंग को बंद करने के लिए, `OMNIROUTE_DISABLE_SD_NOTIFY=1` सेट करें; `NOTIFY_SOCKET` (टर्मिनल, Docker, Electron, Windows) के बिना कुछ भी नहीं भेजा जाता है।

वॉचडॉग केवल यह जाँचता है कि ईवेंट लूप चलता रहे। एक सर्वर जो धीमा है लेकिन फिर भी घूम रहा है वह पुनः प्रारंभ नहीं होता है।

### वैकल्पिक अनुरोध-पथ कार्य (स्मृति, कौशल, टोकन ताज़ा)

मेमोरी निष्कर्षण, कौशल इंजेक्शन, और OAuth टोकन रिफ्रेश साझा करें** मुख्य नोड इवेंट लूप** `/healthz` के साथ। वे डैशबोर्ड-टॉगल सुविधाएं (`memoryEnabled`, `skillsEnabled`) हैं, वर्कर पूल नहीं। [पर्यावरण — इवेंट-लूप लागत](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) देखें।

### प्रदाता स्वास्थ्य

> **कोई REST समापन बिंदु नहीं.** प्रदाता स्वास्थ्य डेटा MCP टूल `observability_snapshot` या डैशबोर्ड `/dashboard/providers` पेज के माध्यम से उपलब्ध है।

### प्रदाता विवरण

> **कोई REST समापन बिंदु नहीं.** प्रति-प्रदाता विवरण डैशबोर्ड `/dashboard/providers` पृष्ठ के माध्यम से उपलब्ध है।

---

## प्रदाता स्वास्थ्य ऑटोपायलट

`providerHealthAutopilot.ts` मॉड्यूल एक **स्वतः सुधार करने वाली प्रणाली** है, जो:

1. प्रदाता संबंधी समस्याओं का पता लगाती है (सर्किट खुलना, कूलडाउन, लॉकआउट, कोटा चेतावनियाँ)
2. उन्हें हल करने के लिए **अनुशंसित कार्रवाइयाँ** उत्पन्न करती है
3. वैकल्पिक रूप से कम जोखिम वाली कार्रवाइयों को **स्वतः निष्पादित** करती है

### पता लगाए गए समस्या प्रकार

| समस्या का प्रकार             | गंभीरता | उदाहरण स्थिति                         |
| ---------------------------- | ------- | ------------------------------------- |
| `provider_circuit_open`      | गंभीर   | 5 विफलताओं के बाद सर्किट ब्रेकर खुला  |
| `provider_circuit_half_open` | चेतावनी | सर्किट द्वारा रिकवरी का परीक्षण       |
| `connection_cooldown`        | चेतावनी | 429 के बाद कनेक्शन कूलडाउन में        |
| `stale_connection_error`     | चेतावनी | अंतिम रीफ़्रेश 30+ मिनट पहले विफल हुआ |
| `terminal_connection_error`  | गंभीर   | OAuth निरस्त, कुंजी अमान्य            |
| `inactive_connection`        | जानकारी | सेटिंग्स में कनेक्शन अक्षम            |
| `model_lockout`              | चेतावनी | विशिष्ट मॉडल क्वारंटीन में            |
| `quota_monitor_warning`      | चेतावनी | कोटा उपयोग 80%+ पर                    |

### उत्पन्न किए गए कार्रवाई प्रकार

| कार्रवाई                       | जोखिम | विवरण                                       |
| ------------------------------ | ----- | ------------------------------------------- |
| `clear_provider_breaker`       | मध्यम | सर्किट ब्रेकर को बंद स्थिति में रीसेट करें  |
| `clear_connection_cooldown`    | कम    | किसी कनेक्शन से कूलडाउन हटाएँ               |
| `clear_stale_connection_error` | कम    | पुराना त्रुटि फ़्लैग हटाएँ                  |
| `clear_model_lockout`          | कम    | क्वारंटीन किए गए मॉडल को पुनः सक्षम करें    |
| `reactivate_connection`        | मध्यम | निष्क्रिय किए गए कनेक्शन को पुनः सक्षम करें |
| `deactivate_connection`        | उच्च  | समस्याग्रस्त कनेक्शन को अक्षम करें          |

### API

> **कोई REST एंडपॉइंट नहीं है।** ऑटोपायलट समस्याएँ MCP टूल `observability_snapshot` या डैशबोर्ड के माध्यम से उपलब्ध हैं। ऑटोपायलट आंतरिक रूप से चलता है; इसका व्यवहार पर्यावरण वेरिएबल के बजाय सेटिंग्स DB (प्रति-कनेक्शन `autopilotMode` फ़ील्ड) के माध्यम से कॉन्फ़िगर किया जाता है — ऑटोपायलट-मोड पर्यावरण वेरिएबल के लिए `grep -rn` चलाने पर कोई परिणाम नहीं मिलता।

### ऑटोपायलट मोड

ऑटोपायलट डिफ़ॉल्ट रूप से **मैन्युअल मोड** में कार्य करता है — यह समस्याओं का पता लगाता है और अनुशंसित कार्रवाइयाँ उत्पन्न करता है, लेकिन उन्हें स्वतः लागू नहीं करता। कार्रवाइयों को डैशबोर्ड के माध्यम से लागू किया जा सकता है।

---

## कॉम्बो स्वास्थ्य ऑटोपायलट

`comboHealthAutopilot.ts`, प्रदाता ऑटोपायलट का **कॉम्बो-विशिष्ट** समकक्ष है। यह:

- अस्वस्थ कॉम्बो का पता लगाता है
- लक्ष्यों का क्रम बदलने की अनुशंसा करता है
- खराब लक्ष्यों को अक्षम करने का सुझाव देता है
- N विफलताओं के बाद निष्क्रिय लक्ष्यों को स्वतः हटा देता है

### कॉम्बो समस्या के उदाहरण

```
कॉम्बो "always-on" (प्राथमिकता रणनीति)
├─ लक्ष्य 1: openai/gpt-5 (स्वस्थ)
├─ लक्ष्य 2: anthropic/claude-opus-4-6 (⚠️ 14:00 तक मॉडल लॉकआउट)
└─ लक्ष्य 3: kiro/claude-sonnet-4-5 (स्वस्थ)

अनुशंसित कार्रवाई: क्रम बदलें — लॉकआउट समाप्त होने तक kiro को anthropic से ऊपर ले जाएँ
```

---

## कोटा मॉनिटर

`observability.ts`, सदस्यता प्रदाताओं (Claude Code, Codex, GitHub Copilot) के लिए **प्रति-सत्र कोटा मॉनिटर** उपलब्ध कराता है:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### स्थितियों के अर्थ

| स्थिति      | कब                       | UI कार्रवाई                         |
| ----------- | ------------------------ | ----------------------------------- |
| `starting`  | प्रारंभिक पोल जारी है    | स्पिनर                              |
| `idle`      | हाल में कोई गतिविधि नहीं | डैशबोर्ड से छिपा हुआ                |
| `healthy`   | 50% से अधिक कोटा शेष     | हरा बिंदु                           |
| `warning`   | 50% से कम कोटा शेष       | पीली चेतावनी                        |
| `exhausted` | कोटा = 0%                | लाल अवरोध, अगले प्रदाता पर रूट करें |
| `error`     | पोलिंग विफल हुई          | लाल बिंदु, शीघ्र पुनः प्रयास करें   |

### API

> **कोई REST एंडपॉइंट नहीं है।** कोटा मॉनिटर डेटा MCP टूल `observability_snapshot` या डैशबोर्ड के माध्यम से उपलब्ध है।

---

## ऑब्ज़र्वेबिलिटी स्नैपशॉट

MCP टूल `observability_snapshot` AI एजेंटों के लिए एक **संपूर्ण सिस्टम स्नैपशॉट** लौटाता है:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ऊपर देखें */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

एजेंट इसका उपयोग **रूटिंग निर्णय** लेने के लिए करते हैं — उदाहरण के लिए, "यदि openai का सर्किट खुला है, तो पहले anthropic पर रूट करें"।

---

## टोकन स्वास्थ्य जाँच

OAuth प्रदाताओं (Claude Code, GitHub Copilot, Cursor) को **समय-समय पर टोकन रीफ़्रेश** करने की आवश्यकता होती है। `src/lib/tokenHealthCheck.ts` एक बैकग्राउंड शेड्यूलर चलाता है:

- **स्वीप टिक**: हर 60 सेकंड में (`src/lib/tokenHealthCheck.ts:30` पर `TICK_MS = 60 * 1000` में स्वीप)
- **प्रति-कनेक्शन स्वास्थ्य जाँच अंतराल**: डिफ़ॉल्ट रूप से 60 मिनट (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); सेटिंग्स DB के माध्यम से कॉन्फ़िगर किया जा सकता है
- **401 पर पूर्व-सक्रिय रीफ़्रेश**: प्रति-कनेक्शन इंटरसेप्टर द्वारा संभाला जाता है

### टोकन स्वास्थ्य स्थिति

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### कॉन्फ़िगरेशन

टोकन स्वास्थ्य जाँच कॉन्फ़िगरेशन को `tokenHealthCheck.ts` द्वारा आंतरिक रूप से संभाला जाता है।

### टोकन स्वास्थ्य

> **कोई REST एंडपॉइंट नहीं।** टोकन स्वास्थ्य डेटा डैशबोर्ड या MCP टूल `observability_snapshot` के माध्यम से उपलब्ध है।

---

## अलर्टिंग

### अंतर्निर्मित चैनल

OmniRoute **3 अलर्ट चैनलों** का समर्थन करता है:

| चैनल          | सेटअप              | उपयोग का मामला             |
| ------------- | ------------------ | -------------------------- |
| डैशबोर्ड बैनर | हमेशा चालू         | इन-ऐप सूचनाएँ              |
| वेबहुक        | URL कॉन्फ़िगर करें | Slack, Discord, PagerDuty  |
| लॉग           | डिफ़ॉल्ट           | बाहरी लॉग एग्रीगेशन के लिए |

### वेबहुक कॉन्फ़िगरेशन

> **नोट:** वेबहुक अलर्टिंग कॉन्फ़िगरेशन को डैशबोर्ड के Settings पृष्ठ के माध्यम से संभाला जाता है। वेबहुक URL, इवेंट फ़िल्टरिंग और पेलोड कस्टमाइज़ेशन के लिए Settings UI देखें।

### अलर्ट प्रकार

| अलर्ट                        | कब                                      | डिफ़ॉल्ट गंभीरता |
| ---------------------------- | --------------------------------------- | ---------------- |
| `provider_circuit_open`      | सर्किट खुलता है                         | गंभीर            |
| `provider_circuit_half_open` | सर्किट रिकवरी का परीक्षण करता है        | जानकारी          |
| `quota_warning`              | कोटा 80%+ पर हो                         | चेतावनी          |
| `quota_exhausted`            | कोटा 100% पर हो                         | गंभीर            |
| `token_refresh_failed`       | लगातार 3+ रीफ़्रेश विफलताएँ             | चेतावनी          |
| `token_expired`              | टोकन की समय-सीमा समाप्त हो चुकी हो      | गंभीर            |
| `combo_target_unhealthy`     | कॉम्बो लक्ष्य 1 घंटे+ से कूलडाउन में हो | चेतावनी          |
| `db_integrity_warning`       | FK उल्लंघन > 0 हों                      | चेतावनी          |
| `heap_pressure`              | हीप उपयोग थ्रेशोल्ड के 80% से अधिक हो   | चेतावनी          |

---

## प्रदर्शन मेट्रिक्स

### ट्रैक किए गए मेट्रिक्स

| मेट्रिक                 | प्रकार      | स्रोत                           |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | काउंटर      | `services/usage.ts`             |
| `request_latency_ms`    | हिस्टोग्राम | `services/usage.ts`             |
| `tokens_consumed`       | काउंटर      | `services/usage.ts`             |
| `cost_usd`              | काउंटर      | `services/usage.ts`             |
| `provider_errors`       | काउंटर      | `services/errorClassifier.ts`   |
| `circuit_state_changes` | काउंटर      | `services/resilience.ts`        |
| `cache_hits`            | काउंटर      | `services/signatureCache.ts`    |
| `compression_savings`   | हिस्टोग्राम | `services/compression/stats.ts` |
| `quota_used`            | गेज         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | गेज         | `observability.ts`              |

### लेटेंसी परसेंटाइल (p50/p95/p99)

> **कोई REST एंडपॉइंट नहीं है।** लेटेंसी परसेंटाइल डेटा डैशबोर्ड के `/dashboard/health` पेज पर उपलब्ध है। Prometheus/OpenTelemetry एक्सपोर्ट v3.9 के लिए नियोजित है।

### Prometheus / OpenTelemetry एक्सपोर्ट (चरण 2)

v3.9 के लिए नियोजित: Prometheus, OpenTelemetry और Datadog में नेटिव एक्सपोर्ट।

फ़िलहाल, किसी भी HTTP-आधारित मॉनिटरिंग सिस्टम (Prometheus blackbox exporter, Datadog HTTP check आदि) से `/api/monitoring/health` को स्क्रैप करें।

---

## अलर्टिंग विधियाँ

### Slack

> **नोट:** Webhook अलर्टिंग को डैशबोर्ड के Settings पेज के माध्यम से कॉन्फ़िगर किया जाता है—इसके लिए कोई समर्पित webhook env vars नहीं हैं (`grep -rn` से कोई परिणाम नहीं मिलता)। Webhook URL, इवेंट फ़िल्टरिंग और पेलोड कस्टमाइज़ेशन के लिए Settings UI देखें।

### Discord

> Webhook अलर्टिंग Slack के समान Settings UI प्रवाह का उपयोग करती है। Discord समान JSON पेलोड संरचना स्वीकार करता है।

### PagerDuty

> Webhook अलर्टिंग समान Settings UI प्रवाह का उपयोग करती है। PagerDuty Events API v2 रूटिंग कुंजियाँ Settings UI में कॉन्फ़िगर की जाती हैं।

### कस्टम Webhook (JSON)

> JSON बॉडी के साथ POST स्वीकार करने वाला कोई भी HTTP एंडपॉइंट काम करेगा। URL को Settings UI में कॉन्फ़िगर करें।

---

## डैशबोर्ड कॉन्फ़िगरेशन

### हेल्थ डैशबोर्ड को कस्टमाइज़ करें

एक `~/.omniroute/dashboard.json` बनाएँ:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### किसी प्रोवाइडर को सबसे ऊपर पिन करें

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## समस्या निवारण

### "प्रोवाइडर स्वस्थ बताता है, लेकिन अनुरोध विफल होते हैं"

1. **ऑटोपायलट समस्याएँ** जाँचें—हो सकता है कोई मॉडल लॉक हो गया हो
2. विशिष्ट त्रुटि वर्ग के लिए **हाल की त्रुटियाँ** देखें
3. प्रोवाइडर कार्ड में **कनेक्शन परीक्षण** आज़माएँ
4. जाँचें कि क्या प्रोवाइडर **अपस्ट्रीम पर रेट-लिमिटेड** है (स्थानीय रूप से दिखाई नहीं देता)

### "कोटा स्वस्थ बताता है, लेकिन मुझे 429 त्रुटियाँ दिखाई देती हैं"

- 429 का अर्थ है कि प्रोवाइडर के अनुसार आपने अपना कोटा इस्तेमाल कर लिया है
- OmniRoute की कोटा ट्रैकिंग **पुरानी** हो सकती है—प्रोवाइडर का अपस्ट्रीम डेटा ही प्रामाणिक है
- आंतरिक कोटा मॉनिटर के माध्यम से कोटा डेटा स्वतः रीफ़्रेश होता है

### "कॉम्बो विफल हो रहा है, लेकिन सभी टारगेट स्वस्थ दिखाई देते हैं"

- टारगेट क्रम संबंधी समस्याओं के लिए **कॉम्बो हेल्थ** डैशबोर्ड जाँचें
- **फ़ॉलबैक इवेंट** देखें—हो सकता है कॉम्बो बहुत तेज़ी से सभी विकल्पों का उपयोग कर रहा हो
- सत्यापित करें कि **रणनीति** आपके उपयोग के मामले से मेल खाती है (प्राथमिकता बनाम राउंड-रॉबिन बनाम स्वचालित)

### "डेटाबेस हेल्थ जाँच विफल हो रही है"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` चलाएँ
- यदि "ok" मिले—यह गलत चेतावनी है, हेल्थ जाँच आवश्यकता से अधिक सख़्त है
- यदि कुछ और मिले—**OmniRoute रोकें** और [आपदा पुनर्प्राप्ति मार्गदर्शिका](./DATABASE_GUIDE.md#disaster-recovery) का पालन करें

### "मेमोरी हीप का दबाव गंभीर है"

```bash
# वर्तमान हीप जाँचें
node -e "console.log(process.memoryUsage())"

# मैन्युअल GC ट्रिगर करें (यदि --expose-gc हो)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# समवर्ती अनुरोध कम करें (इसे डैशबोर्ड के Settings पेज से सेट करें, env var से नहीं)
# कोई `MAX_CONCURRENT_REQUESTS` env var नहीं है—इसे Settings → Concurrency में कॉन्फ़िगर करें।
```

---

## यह भी देखें

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — उपयोग और लागत ट्रैकिंग
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB स्कीमा + स्वास्थ्य
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — प्रॉक्सी स्वास्थ्य (अलग कैश)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — सिस्टम आर्किटेक्चर
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकर का विवरण
- स्रोत: `src/lib/monitoring/` (4 फ़ाइलें, 2121 LOC)
