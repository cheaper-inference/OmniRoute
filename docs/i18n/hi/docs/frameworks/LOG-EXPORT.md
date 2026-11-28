# Log export (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute कॉल लॉग का किसी बाहरी एनालिटिक्स स्टोर में निरंतर, वृद्धिशील निर्यात।

लॉग डैशबोर्ड टैब अनुरोधों का इतिहास SQLite (`call_logs`) में रखता है, जो
रोटेशन और रिटेंशन से सीमित होता है। लॉग निर्यात उसी रिकॉर्ड सेट को तय समय-सारणी पर बाहर भेजता है, ताकि वह
स्थानीय डेटाबेस से अधिक समय तक उपलब्ध रह सके और अन्य डेटा के साथ जोड़ा जा सके। BigQuery पहला गंतव्य है;
पाइपलाइन एक रजिस्ट्री है, इसलिए इसमें और गंतव्य जोड़े जा सकते हैं।

---

## 1. यह कैसे काम करता है

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **अनुसूची** — एक `JobRegistry` क्रॉन जॉब, `log_export`, `0 * * * *` पर डिफ़ॉल्ट (प्रति घंटा, UTC)। `src/lib/initCloudSync.ts` में पंजीकृत; `OMNIROUTE_LOG_EXPORT_CRON` के साथ ओवररिडेबल। प्रत्येक टिक प्रत्येक को ख़त्म कर देती है** सक्रिय** गंतव्य, क्रमिक रूप से.
- **Cursor** — SQLite का अंतर्निहित `call_logs.rowid`, `log_export_destinations.cursor_row_id` में प्रति गंतव्य तक कायम रहता है। `timestamp` जानबूझकर कर्सर नहीं है: कॉल करने वाले अपने स्वयं के मूल्य की आपूर्ति कर सकते हैं, इसलिए एक तेज़ अनुरोध के बाद एक धीमा अनुरोध लिखा जा सकता है जो बाद में शुरू हुआ, और एक टाइमस्टैम्प कर्सर इसे छोड़ देगा।
- **बैचिंग** — `batch_size` पंक्तियाँ प्रति अनुरोध (डिफ़ॉल्ट 500), `max_rows_per_run` पंक्तियाँ प्रति रन (डिफ़ॉल्ट 10000) इसलिए एक बड़ा बैकलॉग एक को अवरुद्ध करने के बजाय कई टिकों पर खत्म हो जाता है।
- **वितरण** — `send()` समाधान के बाद ही कर्सर आगे बढ़ता है। एक विफल बैच कर्सर को वहीं छोड़ देता है जहां वह था, इसलिए अगले रन पर उन्हीं पंक्तियों का पुन: प्रयास किया जाता है। गारंटी कम से कम एक बार प्लस डेस्टिनेशन-साइड डी-डुप्लीकेशन है, बिल्कुल सही नहीं-एक बार: कॉल-लॉग आईडी द्वारा प्रत्येक पंक्ति को BigQuery कुंजी, जिसे यह अपने स्वयं के डिडअप विंडो के भीतर सर्वोत्तम प्रयास के आधार पर सम्मान देता है।
- **ओवरलैप गार्ड** — क्रॉन टिक और `POST .../run` एक साथ फायर कर सकते हैं। पहले से ही खाली हो रहे गंतव्य को दो बार खाली करने के बजाय छोड़ दिया जाता है (रन परिणाम में`skipped: true` ), इसलिए एक समवर्ती रन बैच को दोबारा नहीं भेज सकता है या कर्सर को पीछे की ओर नहीं लिख सकता है।
- **पुनर्प्राप्ति शुद्ध करें** — यदि `cursor_row_id` `MAX(rowid)` से ऊपर समाप्त हो जाता है (पूरी तालिका को शुद्ध कर दिया गया था और पंक्तियां फिर से शुरू हो गईं), तो धावक स्थायी रूप से अंधा होने के बजाय 0 पर वापस आ जाता है।

### पृथक धावक और सीमाएँ

नोड पर चलने वाला प्रत्येक गंतव्य एक अलग, अल्पकालिक OS चाइल्ड प्रक्रिया शुरू करता है (`child_process` IPC के साथ, `worker_threads` नहीं)। बॉडी रीड्स, पेलोड JSON parsing/serialization, गंतव्य `prepare()` और गंतव्य नेटवर्क I/O सभी वहां चलते हैं, सर्वर के इवेंट लूप पर नहीं। केवल कॉन्फ़िगरेशन और छोटे प्रगति संदेश IPC को पार करते हैं; निर्यात किए गए रिकॉर्ड कभी भी सर्वर पर वापस नहीं आते। क्रॉन जॉब और रन नाउ रूट समान सार्वजनिक परिणाम और ओवरलैप गार्ड रखते हैं।

बच्चा `node:sqlite` का उपयोग करके, `busy_timeout=5000` और `query_only=ON` के साथ सर्वर के हल किए गए `DATA_DIR/storage.sqlite` केवल पढ़ने के लिए खोलता है। यह कोई DB सिंगलटन आयात नहीं करता है और कोई माइग्रेशन, बैकअप या SQLite अपडेट नहीं करता है। Missing/corrupt विरूपण साक्ष्य बहीखाता (भ्रष्ट-विरूपण साक्ष्य UPDATE सहित) केवल डैशबोर्ड विवरण पथ में रहता है। दोनों पथ एक शुद्ध विवरण रिज़ॉल्वर साझा करते हैं; निर्यात एसिंक्रोनस फ़ाइल सिस्टम रीड्स और समान आर्टिफैक्ट → लिगेसी इनलाइन → लिगेसी डिस्क → कोई भी रिज़ॉल्यूशन ऑर्डर का उपयोग नहीं करता है। जब बच्चा अपना रीडर खोलता है तो रन अधिकतम सम्मिलन पंक्ति का स्नैपशॉट लेता है; बाद के इंसर्ट अगले रन की प्रतीक्षा करते हैं। यह एक सम्मिलन सीमा है, लंबे समय तक चलने वाला SQLite लेनदेन नहीं: WAL लेखक और चेकपॉइंट नेटवर्क प्रतीक्षा के दौरान मुक्त रहते हैं। मौजूदा पंक्तियों का Updates/deletions इस सीमा से स्थिर नहीं है।

प्रत्येक स्वीकृत बैच के बाद, बच्चा पावती की प्रतीक्षा करता है। सर्वर पहले कर्सर को `advanceLogExportCursor` के साथ रखता है, फिर `ack` भेजता है; इससे पहले कोई अगला बैच शुरू नहीं होता. भेजने में विफलता, क्रैश या टाइमआउट उस बैच को आगे बढ़ाए बिना विफलता को रिकॉर्ड करता है। पहले स्वीकृत बैच प्रतिबद्ध रहते हैं; अधिक से अधिक एक अस्वीकृत बैच को पुनः भेजा जा सकता है। सफलता `done` और क्लीन चाइल्ड एग्जिट के बाद ही दर्ज की जाती है। विफलताओं के कारण बच्चा SIGTERM के साथ समाप्त हो जाता है, जो 500 एमएस के बाद SIGKILL तक बढ़ जाता है, और धावक प्रक्रिया बंद होने की प्रतीक्षा करता है।

| पर्यावरणपरिवर्ती तारक                         | गलती करना | उद्देश्य                              |
| --------------------------------------------- | --------- | ------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000    | प्रति-गंतव्य दीवार-घड़ी की सीमा       |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024      | MB में चाइल्ड V8 पुरानी-अंतरिक्ष सीमा |

Invalid/non-positive/non-integer मान डिफ़ॉल्ट का उपयोग करते हैं। हीप सेटिंग कुल RSS सीमा नहीं है; बहुत बड़े बैच अभी भी बच्चे की स्मृति को समाप्त कर सकते हैं और रन को सुरक्षित रूप से विफल कर सकते हैं। 1024 MB डिफ़ॉल्ट 512 KiB कलाकृतियों के डिफ़ॉल्ट 500-पंक्ति बैच के लिए हेडरूम छोड़ता है जिसमें बॉडी सक्षम होती है, जिसमें BigQuery का बाइट-चंक्ड JSON क्रमबद्धता भी शामिल है। यह 10000-पंक्ति वाले बॉडी बैच को सुरक्षित नहीं बनाता है। V8 हीप थकावट एक कार्रवाई योग्य विफलता को रिकॉर्ड करती है: बैच का आकार कम करना या `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` बढ़ाना; कर्सर अंतिम स्वीकृत बैच पर रहता है। ऐतिहासिक inline/disk निकाय आधुनिक आर्टिफैक्ट कैप द्वारा कवर नहीं किए गए हैं। ऑपरेटरों को RSS बजट अलग से रखना चाहिए, विशेष रूप से मेमोरी-सीमित कंटेनरों के अंदर।

बच्चे को केवल हल किए गए `DATA_DIR`, `NODE_ENV`, स्पष्ट `TZ` (विरासत फ़ाइल नाम स्थानीय-समय रिज़ॉल्यूशन), `ELECTRON_RUN_AS_NODE` जब मौजूद हो, और निम्नलिखित आउटबाउंड इनपुट विरासत में मिलते हैं: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (और उनके लोअरकेस रूप), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`। एक वैश्विक अंडरसी डिस्पैचर सर्वर के शुद्ध पर्यावरण-प्रॉक्सी रिज़ॉल्यूशन और स्थानीय-होस्ट बाईपास नियमों को साझा करता है, जिसमें `NO_PROXY` भी शामिल है; यह `proxyFetch.ts` या इसके DB/feature झंडे आयात नहीं करता है। प्रॉक्सी क्रेडेंशियल अग्रेषित आउटपुट और रिकॉर्ड की गई त्रुटियों से संपादित किए जाते हैं। गंतव्य क्रेडेंशियल केवल एक प्रारंभ IPC संदेश में यात्रा करते हैं, कभी भी argv या वातावरण में नहीं; output/error फ़ॉरवर्डिंग को प्रीफ़िक्स और सैनिटाइज़ किया गया है। प्रत्येक क्रॉन रन में नोड की SQLite चेतावनी को दोहराने से बचने के लिए चाइल्ड एक्ज़ीक्यूटिव तर्कों में केवल `ExperimentalWarning` अक्षम किया गया है; अन्य चेतावनी प्रकार दृश्यमान रहते हैं।

गंतव्य मॉड्यूल Next.js/server-only निर्भरता के बिना आयात योग्य होने चाहिए। मौजूदा BigQuery कार्यान्वयन पहले से ही उस अनुबंध को पूरा करता है। एक्सेस-टोकन कैश केवल चाइल्ड रन के लिए रहता है, रन के पार नहीं। नोड समर्थित रनटाइम (`package.json` इंजन) है। एक सर्वोत्तम प्रयास, असमर्थित Bun संगतता पथ मौजूद है (`bun:sqlite` `src/lib/db/core.ts` / एडाप्टर और `Dockerfile.bun` में), इसलिए निर्यात को इसके अंतर्गत नहीं तोड़ना चाहिए। Bun के तहत, निर्यात पिछले इन-प्रोसेस पथ को बनाए रखता है और एक बार की चेतावनी देता है: चाइल्ड heap/timeout अलगाव अनुपलब्ध है। इवेंट-लूप और OOM आइसोलेशन के लिए नोड का उपयोग करें।

जब `includeBodies` सक्षम होता है, तो प्रति घंटा पेलोड बैकलॉग जमा करने के बजाय `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` जैसे मिनट-स्तरीय ताल को प्राथमिकता दें। बैच और पंक्ति सीमाएँ अभी भी प्रत्येक रन से बंधी हैं। प्रक्रिया स्टार्टअप को प्रति गंतव्य प्रति रन के हिसाब से भुगतान किया जाता है; यह सर्वर इवेंट-लूप अलगाव के लिए एक छोटी स्टार्टअप लागत का व्यापार करता है, कुल CPU उपयोग को कम नहीं करता है।

### पेलोड (संकेत और पूर्णता)

डिफ़ॉल्ट रूप से निर्यात में केवल सारांश फ़ील्ड लॉग होते हैं** सूची** दिखाता है. पर मोड़** निर्यात संकेत और प्रतिक्रियाएँ** (`includeBodies`) अतिरिक्त रूप से लॉग्स को शिप करता है** विवरण** प्रत्येक कॉल के लिए फलक दिखाता है:

| मैदान                            | यह क्या रखता है                                                |
| -------------------------------- | -------------------------------------------------------------- |
| `request_body` / `response_body` | जैसे ही डैशबोर्ड उन्हें प्रस्तुत करता है, कॉल पेलोड हो जाती है |
| `pipeline_route_decision`        | राउटर ने कौन सा लक्ष्य और मॉडल चुना                            |
| `pipeline_client_request`        | कच्चा अनुरोध बिल्कुल वैसा ही जैसा ग्राहक ने भेजा था            |
| `pipeline_openai_request`        | आंतरिक OpenAI आकार में अनुवाद के बाद                           |
| `pipeline_provider_request`      | जैसा कि वास्तव में प्रदाता बोली में अपस्ट्रीम भेजा गया है      |
| `pipeline_provider_response`     | कच्ची अपस्ट्रीम प्रतिक्रिया                                    |
| `pipeline_client_response`       | जो कॉल करने वाले को वापस सौंप दिया गया                         |
| `pipeline_error`                 | विफल कॉल के लिए पाइपलाइन-स्तरीय त्रुटि विवरण                   |
| `bodies_truncated`               | यह सच है जब ऊपर का कोई भी फ़ील्ड `maxBodyBytes` टकराता है      |

यह त्वरित सामग्री है, इसलिए ऐसा है** डिफ़ॉल्ट रूप से बंद** और जानबूझकर प्रति-गंतव्य विकल्प। डैशबोर्ड वही दिखाता है जो जहाज करता है, क्योंकि निर्यात और `getCallLogById` विवरण रिज़ॉल्यूशन साझा करते हैं: पेलोड लिखे जाने पर पहले से ही पीआईआई-सैनिटाइज़ और गुप्त-संपादित होते हैं, और `noLog` API कुंजी के साथ किया गया कॉल कोई पेलोड संग्रहीत नहीं करता है, इसलिए निर्यात करने के लिए कुछ भी नहीं है।

पेलोड फ़ाइल सिस्टम आर्टिफैक्ट से प्रति पंक्ति पढ़ा जाता है, इसलिए हाइड्रेशन केवल उन गंतव्यों के लिए चलता है जिन्होंने इसके लिए कहा था। एक गुम या भ्रष्ट आर्टिफैक्ट बैच को विफल करने और कर्सर को फंसाने के बजाय अपने सारांश को शून्य पेलोड के साथ निर्यात करता है।

`maxBodyBytes` (डिफ़ॉल्ट 262144) प्रत्येक फ़ील्ड को कैप करता है। लंबे पेलोड हैं** गिराने के बजाय काट दिया गया** — एक क्लिप किया गया प्रॉम्प्ट अभी भी "क्या पूछा गया था" — उत्तर देता है और पंक्ति को `bodies_truncated` के साथ चिह्नित किया गया है। स्ट्रीम किए गए खंड-दर-खंड डेल्टा का निर्यात नहीं किया जाता है; एकत्रित प्रतिक्रिया पहले से ही `pipeline_provider_response` और `pipeline_client_response` में है।

---

## 2. फ़ाइलें

| घटक                  | स्थान                                        |
| -------------------- | -------------------------------------------- |
| गंतव्य अनुबंध        | `src/lib/logExport/types.ts`                 |
| रजिस्ट्री            | `src/lib/logExport/registry.ts`              |
| सीक्रेट प्रबंधन      | `src/lib/logExport/secrets.ts`               |
| रनर (पैरेंट IPC)     | `src/lib/logExport/runner.ts`                |
| प्रक्रिया जीवनचक्र   | `src/lib/logExport/childRunner.ts`           |
| चाइल्ड प्रवेश बिंदु  | `src/lib/logExport/exportChild.ts`           |
| केवल-पठन ओपनर        | `src/lib/db/logExportReadOnly.ts`            |
| साझा क्वेरी/मैपिंग   | `src/lib/usage/callLogExportQueries.ts`      |
| विवरण रिज़ॉल्वर      | `src/lib/usage/callLogDetailResolver.ts`     |
| API प्रोजेक्शन       | `src/lib/logExport/presenter.ts`             |
| BigQuery गंतव्य      | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA प्रमाणीकरण | `src/lib/logExport/googleServiceAccount.ts`  |
| कॉल-लॉग स्रोत        | `src/lib/usage/callLogExportSource.ts`       |
| स्थायी संग्रहण       | `src/lib/db/logExportDestinations.ts`        |
| Cron जॉब             | `src/lib/jobs/logExportJob.ts`               |
| REST परत             | `src/app/api/log-export/`                    |
| डैशबोर्ड पृष्ठ       | `src/app/(dashboard)/dashboard/log-export/`  |

स्कीमा: `src/lib/db/migrations/170_log_export_destinations.sql`।

---

## 3. REST API

सभी रूट प्रबंधन प्रमाणीकरण (`requireManagementAuth`) द्वारा सुरक्षित हैं। सीक्रेट कभी वापस नहीं किए जाते:
संग्रहीत सीक्रेट की जगह लिटरल `__stored__` वापस आता है, और अपडेट में उसी मान को वापस भेजने पर
संग्रहीत क्रेडेंशियल बना रहता है।

ऐसा गंतव्य बनाने या अपडेट करने के लिए, जिसका प्रकार किसी सीक्रेट को घोषित करता है, **`STORAGE_ENCRYPTION_KEY`
आवश्यक है**। इसके बिना `encrypt()` बिना किसी चेतावनी के डेटा को ज्यों का त्यों आगे भेज देता है, इसलिए क्रेडेंशियल को
SQLite में प्लेनटेक्स्ट में रखने के बजाय लेखन को 400 के साथ अस्वीकार कर दिया जाता है (यही सुरक्षा जाँच
Telegram वेबहुक भी लागू करता है)।

| विधि     | पथ                                       | उद्देश्य                                                        |
| -------- | ---------------------------------------- | --------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | गंतव्य प्रकार + उनके कॉन्फ़िगरेशन फ़ील्ड की सूची                |
| `GET`    | `/api/log-export/destinations`           | गंतव्यों की सूची (सीक्रेट छिपाए गए)                             |
| `POST`   | `/api/log-export/destinations`           | गंतव्य बनाना                                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | एक गंतव्य पढ़ना                                                 |
| `PUT`    | `/api/log-export/destinations/{id}`      | नाम / सक्षम स्थिति / कॉन्फ़िगरेशन / बैचिंग अपडेट करना           |
| `DELETE` | `/api/log-export/destinations/{id}`      | हटाना                                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | क्रेडेंशियल जाँचना, कुछ भी न लिखना                              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | अभी लंबित डेटा निर्यात करना, निर्धारित रन वाला ही पथ उपयोग करना |
| `GET`    | `/api/log-export/status`                 | Cron की स्थिति, हाल के रन, प्रत्येक लक्ष्य का लंबित डेटा        |

`GET /api/log-export/types` ही UI को सामान्य-उद्देश्य वाला बनाता है: डैशबोर्ड फ़ॉर्म वापस मिले
फ़ील्ड विवरणकों से रेंडर किया जाता है, इसलिए नए गंतव्य के लिए UI में किसी बदलाव की आवश्यकता नहीं होती।

---

## 4. BigQuery गंतव्य

कॉन्फ़िगरेशन कुंजियाँ (`type: "bigquery"`):

| कुंजी                | विवरण                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `projectId`          | डेटासेट रखने वाला GCP प्रोजेक्ट                                                                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                    |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                    |
| `location`           | केवल तब उपयोग किया जाता है जब डेटासेट बनाना हो (डिफ़ॉल्ट `EU`)                                                     |
| `serviceAccountJson` | सेवा-अकाउंट कुंजी। सीक्रेट: विश्राम-अवस्था में एन्क्रिप्टेड, कभी वापस नहीं की जाती                                 |
| `autoCreate`         | अनुपलब्ध डेटासेट/टेबल बनाएँ; शून्य मान स्वीकार करने वाले usage-evidence कॉलम सशर्त रूप से जोड़ें (डिफ़ॉल्ट `true`) |

सेवा-अकाउंट को लक्षित टेबल पर `bigquery.tables.updateData` की आवश्यकता होती है, और
`autoCreate` चालू होने पर `bigquery.datasets.create` / `bigquery.tables.create` की भी आवश्यकता होती है।
मौजूदा टेबल को अपडेट करके दो शून्य मान स्वीकार करने वाले usage-evidence फ़ील्ड जोड़ने के लिए
`bigquery.tables.update` भी आवश्यक है। कोई अनुमति अनुपलब्ध होने पर export विफल हो जाता है और
उसका cursor आगे नहीं बढ़ता।

कॉन्फ़िगर किया गया batch HTTP इकाई नहीं, बल्कि **cursor** इकाई है: `send()` इसे अधिकतम 500
rows वाले insertAll कॉल में विभाजित करता है, इसलिए बड़ा `batch_size` BigQuery की 10 MB request
सीमा को पार नहीं कर सकता। अस्थायी status (408/429/500/502/503/504) को exponential
backoff के साथ अधिकतम तीन बार दोबारा आज़माया जाता है और उसी insertIds का पुनः उपयोग होता है; auth
और schema विफलताएँ पहले प्रयास में ही throw होती हैं, run को अनावश्यक रूप से खर्च किए बिना।

अभी-अभी बनाई गई टेबल streaming endpoint को तुरंत दिखाई नहीं देती, जो कुछ सेकंड तक
404 लौटाती है। उस 404 को दोबारा आज़माया जाता है, लेकिन **केवल तब जब इस run ने टेबल बनाई हो** —
वास्तव में अनुपलब्ध टेबल तुरंत विफल हो जाती है। ध्यान दें कि हाल ही में हटाई गई टेबल को उसी
नाम से दोबारा बनाने पर BigQuery कई मिनट तक streaming inserts अस्वीकार करता है; यह
delete-then-recreate की विशेषता है, इसलिए किसी टेबल को हटाकर फिर जोड़ने के बजाय नया टेबल नाम
पसंद करें।

**आंशिक विफलता HTTP 200 के साथ गैर-रिक्त `insertErrors[]` के रूप में आती है।** इसे
विफलता माना जाता है और throw किया जाता है, जिससे cursor उन rows से आगे नहीं बढ़ता जिन्हें
BigQuery ने कभी स्वीकार नहीं किया; `tests/unit/log-export-bigquery.test.ts` इस व्यवहार को
पक्का करता है।

Transport plain REST है — एक self-signed RS256 assertion को
`https://oauth2.googleapis.com/token` पर access token के लिए बदला जाता है, फिर rows
`tabledata.insertAll` पर भेजी जाती हैं। कोई Google SDK शामिल नहीं किया जाता। Access tokens
प्रक्रिया के भीतर प्रति (service account, scope) कैश किए जाते हैं।

बनाई गई टेबल में Logs-टैब के प्रत्येक फ़ील्ड के लिए एक कॉलम और `exported_at` होता है, और इसे
इस आधार पर व्यवस्थित किया जाता है कि call logs को वास्तव में कैसे query किया जाता है:

- **`timestamp` पर day-partitioned**, ताकि तारीख से सीमित query केवल उन्हीं दिनों को स्कैन करे।
- **`api_key_name`, `provider`, `model`, `status` के अनुसार clustered** (इसी क्रम में), ताकि
  किसने इसे चलाया, यह कहाँ गया, या यह विफल हुआ या नहीं—इनके आधार पर filtering प्रत्येक
  partition के भीतर blocks को prune कर सके। BigQuery अधिकतम चार clustering columns की अनुमति
  देता है और क्रम महत्वपूर्ण है: केवल `api_key_name` पर filter blocks को prune करता है,
  केवल `status` पर filter ऐसा नहीं करता।
- **`partitionExpirationDays` के माध्यम से वैकल्पिक partition retention** (`0` सब कुछ
  सुरक्षित रखता है), जिसे टेबल बनाते समय लागू किया जाता है।

दोनों सेटिंग्स केवल creation time पर लागू होती हैं। मौजूदा टेबल अपना पहले से मौजूद layout
बनाए रखती है, इसलिए यदि आप इन्हें अपनाना चाहते हैं तो destination को किसी नए table id पर
निर्देशित करें।

`tests/unit/log-export-bigquery.test.ts` सुनिश्चित करता है कि mapper और table schema
सदैव एक-दूसरे के अनुरूप रहें, ताकि कोई नया call-log कॉलम बाहर भेजे जाते समय चुपचाप छूट न जाए।

Batches को **row count और serialised bytes दोनों** के आधार पर विभाजित किया जाता है। Payloads
export किए जाने के बाद केवल row count पर्याप्त नहीं है: prompts वाली 500 rows कई दसियों
megabytes की हो सकती हैं, और insertAll 10 MB से बड़े request को अस्वीकार करता है। Chunks
500 rows या 9 MB पर बंद होते हैं—जो भी पहले आए।

---

## 5. OTLP/HTTP ट्रेसेज़ गंतव्य

कॉन्फ़िगरेशन में `type: "otlp-http"` का उपयोग होता है। यह persisted कॉल लॉग का
शेड्यूल किया गया, कर्सर-समर्थित निर्यात है, न कि
`open-sse/services/routing/otel.ts` में मौजूद best-effort live routing-event sink।
यह उस sink के environment variables, timers या buffers को पढ़ता या बदलता नहीं है।
दोनों को सक्षम करने पर दो स्वतंत्र प्रकार के spans उत्पन्न हो सकते हैं;
इन call-log spans को अलग पहचानने के लिए `omniroute.log-export` instrumentation scope
का उपयोग करें।

| Key                      | Default / purpose                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `endpoint`               | आवश्यक पूर्ण HTTP(S) traces URL; कोई `/v1/traces` suffix नहीं जोड़ा जाता                   |
| `headers`                | वैकल्पिक `Name: value` पंक्तियाँ या strings का JSON object; encrypted                      |
| `requestHeaderAllowlist` | Empty (off); span attributes के रूप में capture किए जाने वाले client header names/prefixes |
| `serviceName`            | `omniroute`; resource `service.name`                                                       |
| `langfuseMapping`        | `false`; Langfuse generation/session/user attributes जोड़ता है                             |
| `identity`               | `pseudonymous`, `keyName`, या `none`                                                       |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                    |
| `timeoutMs`              | प्रति HTTP प्रयास `30000`                                                                  |
| `environment`            | Unset; वैकल्पिक `langfuse.environment`                                                     |

सामान्य dashboard इन fields को render करता है। `paths` एक API array या
newline/comma से अलग किए गए exact paths वाले textarea को स्वीकार करता है। Embeddings,
rerank और अन्य paths को तब तक skip किया जाता है जब तक उन्हें स्पष्ट रूप से allow न किया जाए।
Skipped rows फिर भी cursor को आगे बढ़ाती हैं; मौजूदा runner के
`exported`/`exportedTotal` counters accepted spans के बजाय processed source rows की
गिनती करते हैं, जिनमें filtered rows भी शामिल हैं। Filtering child में की जाती है,
इसके IPC/cursor contract में कोई बदलाव किए बिना।

URL validation, `src/shared/network/outboundUrlGuard.ts` के DB-free
`parseAndValidateNonMetadataUrl` helper का उपयोग करती है: `block-metadata` policy।
इसमें webhook validator जैसी ही unconditional metadata/protocol/embedded-credential checks
होती हैं, private URLs को opt-in किया गया है, लेकिन यह जानबूझकर localhost/LAN targets को
किसी global feature-flag override के बिना अनुमति देती है। इससे self-hosted Langfuse,
Phoenix, Tempo और Collector endpoints, जिनमें private HTTP endpoints भी शामिल हैं,
अनुमत होते हैं। Cloud-metadata hosts हमेशा block किए जाते हैं।
Redirects follow नहीं किए जाते, इसलिए कोई collector credentials को किसी अलग host पर
redirect नहीं कर सकता। मौजूदा lexical URL guard की तरह, यह DNS resolution को pin नहीं करता;
केवल operator-controlled hosts configure करें। जब endpoint किसी trusted network पर न हो,
तो HTTPS को प्राथमिकता दें।

### Payload और delivery

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) प्रत्येक
allowed row के लिए एक CLIENT span भेजता है, जिसका नाम उसके exact request path पर आधारित होता है।
Path naming, span name में model या identity data embed किए बिना, Chat Completions,
Responses और Messages के बीच अंतर बताती है। Resource attributes में `service.name` और
package का `service.version` शामिल होते हैं।

सामान्य chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) completion पर
`duration = Date.now() - startTime` लिखता है और कोई timestamp प्रदान नहीं करता;
`src/lib/usage/callLogs.ts` में `saveCallLogOperation` timestamp को write
(completion) time पर default करता है। इसलिए export में end = row timestamp और
start = end − duration सेट किया जाता है (milliseconds को decimal nanoseconds में बदला जाता है)।
Caller द्वारा दिए गए historical timestamps को भी end time के रूप में सुरक्षित रखा जाता है;
प्रति-row start/completion discriminator मौजूद नहीं है। Null duration शून्य बन जाता है।
Invalid/missing timestamps batch को fail कर देते हैं, न कि non-deterministic spans बनाते हैं।
`ttftMs` nullable है और `omniroute.ttft_ms` पर map होता है।

Attributes में `gen_ai.operation.name="chat"`, provider, requested/response model,
input/output tokens, वैकल्पिक cache-read/cache-creation/reasoning tokens, HTTP status,
combo, cache source, session tag और correlation id शामिल होते हैं। Integer OTLP values और
timestamps decimal strings होते हैं; strings, booleans और fractional numbers अपने native
OTLP value variants का उपयोग करते हैं। Error spans में ERROR status और sanitized status
message होता है। Canonical record में upstream host URL नहीं होता, इसलिए
`server.address` को omit किया जाता है, जिससे collector की model server के रूप में
गलत पहचान न हो। Cost export नहीं किया जाता।

केवल `includeBodies=true` content को hydrate करता है। `langfuseMapping=false` के साथ,
`gen_ai.input.messages` / `gen_ai.output.messages` में OmniRoute द्वारा stored
sanitized request/response body JSON होता है (यदि parseable हो तो canonicalized),
न कि re-shaped semconv messages array। Clipped/non-JSON bodies raw text के रूप में बने रहते हैं।
`langfuseMapping=true` के साथ, bodies केवल `langfuse.observation.input` /
`langfuse.observation.output` के रूप में emit किए जाते हैं; `gen_ai.*.messages`
attributes omit कर दिए जाते हैं, ताकि प्रत्येक body एक ही बार भेजा जाए। दोनों modes
मौजूदा hydration path से `maxBodyBytes` inherit करते हैं;
`omniroute.bodies_truncated=true` clipping को चिह्नित करता है।
इस destination द्वारा कोई अतिरिक्त pipeline snapshots या unsanitized artifact reads
नहीं जोड़े जाते; optional request-header capture नीचे वर्णित मौजूदा hydrated client
snapshot का उपयोग करता है। Bodies export करते समय hourly backlog जमा करने के बजाय
minute-level cadence का उपयोग करें, जैसे
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`।

### Optional client request headers

Header capture **डिफ़ॉल्ट रूप से बंद** है। Destination config में `requestHeaderAllowlist`
सेट करें और **Export prompts and responses** सक्षम करें
(destination पर `includeBodies: true`)।
Allowlist API array या newline/comma-separated names वाले textarea को स्वीकार करती है:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

नाम केस की परवाह किए बिना और सटीक रूप से मिलते हैं, जब तक कि अकेला अंतिम `*` किसी गैर-रिक्त
header-name प्रीफ़िक्स का चयन न करे। अकेला `*`, एम्बेडेड वाइल्डकार्ड और अमान्य HTTP हेडर नाम
अस्वीकृत किए जाते हैं। अधिकतम 64 चयनकर्ता हो सकते हैं, और प्रत्येक का नाम/प्रीफ़िक्स अधिकतम
256 ASCII बाइट का हो सकता है। यह सेटिंग `headers` से अलग है, जो एक्सपोर्टर को कलेक्टर के
साथ प्रमाणित करती है।

कैप्चर केवल `pipeline_client_request` को पढ़ता है, जिसे सहेजे गए विस्तृत पाइपलाइन के
`clientRawRequest` (या लेगेसी `clientRequest`) से भरा जाता है। यह कभी भी प्रोवाइडर अनुरोध
हेडर पर फ़ॉलबैक नहीं करता। अनुरोध रिकॉर्ड किए जाने के समय विस्तृत पाइपलाइन लॉगिंग सक्षम
होनी चाहिए थी। `includeBodies` अक्षम होने पर, या क्लाइंट-स्नैपशॉट JSON के अनुपस्थित,
दूषित या कटे हुए होने पर, कोई हेडर एट्रिब्यूट उत्सर्जित नहीं किए जाते। `maxBodyBytes` बढ़ाने
से एक्सपोर्ट-समय स्नैपशॉट कटने से बचा जा सकता है; यह उस विवरण को पुनर्स्थापित नहीं कर सकता
जो कभी सहेजा ही नहीं गया। 1 MiB से बड़ा या 256 से अधिक हेडर प्रविष्टियों वाला स्नैपशॉट
अनदेखा कर दिया जाता है। मौजूदा प्रॉम्प्ट/रिस्पॉन्स एक्सपोर्ट हेडर कैप्चर के साथ सक्षम रहता है;
अनुमतिसूची केवल हेडर-आधारित हाइड्रेशन मोड प्रदान नहीं करती।

चयनित मान OTLP स्ट्रिंग ऐरे के रूप में `http.request.header.<full lowercase header name>` बन
जाते हैं, एकल स्ट्रिंग के लिए भी। उदाहरण के लिए, `X-OmniRoute-Meta-Team: example-team`,
`http.request.header.x-omniroute-meta-team` को इस रूप में बनाता है:
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
पूरा प्रीफ़िक्स सुरक्षित रखा जाता है: ये सामान्य हेडर हैं, इनमें कोई बिज़नेस-फ़ील्ड पार्सिंग या
`omniroute.metadata.*` / Langfuse मेटाडेटा रूपांतरण नहीं होता। `langfuseMapping` हेडर के
अर्थ को नहीं बदलता। चयनित एकल-मान वाला `User-Agent` मानक स्केलर
`user_agent.original` भी सेट करता है। किसी एक मान के भीतर के कॉमा अलग नहीं किए जाते। केस
वेरिएंट सहेजी गई प्रविष्टि के क्रम में मर्ज होते हैं; कोई भी अमान्य वेरिएंट उस पूरे हेडर को
हटा देता है। एट्रिब्यूट लोअरकेस नाम के अनुसार क्रमबद्ध होते हैं।

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, API-कुंजी हेडर, auth/token/secret/password/credential
मार्कर वाले नाम और आंतरिक गेटवे क्रेडेंशियल हमेशा बाहर रखे जाते हैं, भले ही उनका चयन किया गया
हो या स्टोरेज में आंशिक रूप से मास्क किया गया हो। ज्ञात क्रेडेंशियल पैटर्न साझा क्रेडेंशियल
डिटेक्टर का पुन: उपयोग करते हैं; रिडैक्शन मार्कर हटा दिए जाते हैं, सुरक्षित मानों के रूप में
एक्सपोर्ट नहीं किए जाते। केवल स्ट्रिंग और गैर-रिक्त स्ट्रिंग ऐरे स्वीकार किए जाते हैं; संख्याओं
या ऑब्जेक्ट को कोअर्स नहीं किया जाता। अमान्य नाम, प्रोटोटाइप कुंजियाँ, कंट्रोल कैरेक्टर
(हॉरिज़ॉन्टल टैब को छोड़कर) और विकृत Unicode को बैच विफल किए बिना या उनकी सामग्री को त्रुटियों
में प्रतिबिंबित किए बिना अनदेखा कर दिया जाता है।

प्रत्येक स्पैन में अधिकतम 32 हेडर, प्रति हेडर 16 मान, प्रति मान 4096 UTF-8 बाइट और कैप्चर
किए गए हेडर नामों व मानों में कुल 16384 UTF-8 बाइट हो सकते हैं। आकार से बड़े/अमान्य हेडर
को पूरा हटा दिया जाता है, काटा नहीं जाता। चयन ऑपरेटर का गोपनीयता संबंधी निर्णय है: सुरक्षित
दिखने वाले नामों में भी व्यक्तिगत डेटा हो सकता है, और ये सीमाएँ/डिटेक्टर सामान्य PII स्क्रबर
नहीं हैं।

### डिलीवरी सीमाएँ

अनुरोध अधिकतम 500 स्पैन और 4 MiB UTF-8 JSON तक सीमित हैं, जिसमें एनवेलप भी शामिल है।
कर्सर बैच के पहले अनुरोध से पहले प्रत्येक अनुमत स्पैन का आकार जाँचा जाता है। सीमा से बड़ा
कोई व्यक्तिगत स्पैन उस बैच का कोई भाग नहीं भेजता और `maxBodyBytes` कम करने के निर्देश के
साथ विफल होता है; उसे चुपचाप नहीं हटाया जाता। प्रीफ़्लाइट केवल रिकॉर्ड संदर्भ और बाइट गणना
रखता है तथा प्रत्येक अस्थायी स्पैन/JSON को हटा देता है; दूसरे सीरियलाइज़ किए गए बैच की कॉपी
रखने के बजाय सीमित खंडों के लिए स्पैन फिर से बनाए जाते हैं। HTTP 408/429/5xx, नेटवर्क विफलताओं
और टाइमआउट पर अधिकतम तीन प्रयास किए जाते हैं, जिनमें 250/500 ms का घातीय बैकऑफ़ होता है।
`Retry-After` सेकंड या HTTP तारीखें देरी को अधिकतम 5 सेकंड तक बढ़ा सकती हैं। अन्य स्टेटस
तुरंत विफल हो जाते हैं। OTLP 2xx आंशिक अस्वीकृति भी थ्रो करती है, खोए हुए स्पैन को स्वीकार
नहीं करती; खाली या मान्य JSON स्वीकृतियाँ स्वीकार की जाती हैं, और रिस्पॉन्स-पठन सीमा
64 KiB है।

त्रुटियों में केवल एक्सपोर्टर-स्वामित्व वाले तथ्य होते हैं: HTTP स्टेटस, रिट्राई वर्ग, प्रयासों
और भेजे गए स्पैन की गणना, या स्थिर स्वीकृति/नेटवर्क विफलता संदेश। कलेक्टर रिस्पॉन्स बॉडी,
आंशिक-सफलता गणना और रिस्पॉन्स हेडर कभी भी त्रुटियों, लॉग या डैशबोर्ड में कॉपी नहीं किए जाते।
विफल या आंशिक रूप से स्वीकार किया गया बैच स्वीकार नहीं किया जाता: डेस्टिनेशन उस स्टेटस के
साथ Failing दिखाता है, कर्सर अंतिम स्वीकृत बैच पर रहता है और अगला रन उन्हीं पंक्तियों को फिर
भेजता है। स्थायी स्टेटस तब तक विफल रहते हैं जब तक कलेक्टर या कॉन्फ़िगरेशन ठीक नहीं किया जाता।
रिस्पॉन्स विवरण के लिए कलेक्टर के अपने लॉग का उपयोग करें। कॉल-लॉग त्रुटि सारांशों में उनका
अलग रिडैक्शन बना रहता है।
`prepare()` कुछ भी प्रोविज़न नहीं करता; Test ठीक `{"resourceSpans":[]}` पोस्ट करता है और
कॉल-लॉग स्पैन लिखे बिना HTTP स्टेटस रिपोर्ट करता है।

ट्रेस आईडी और स्पैन आईडी SHA-256 के पहले 32/16 हेक्स अंकों से बनते हैं, जो
`"omniroute.trace\\0" + callLogId` और `"omniroute.span\\0" + callLogId` पर लागू किया जाता है।
फिर से भेजे गए अनुरोधों में समान आईडी रहती हैं। यह डी-डुप्लिकेशन की गारंटी नहीं है: Langfuse
v4 ingestion सहित कुछ बैकएंड समान-आईडी वाले स्पैन को डी-डुप्लिकेट नहीं करते। क्रैश या आंशिक
खंड विफलता अधिकतम उस एक अनस्वीकृत कर्सर बैच को फिर भेज सकती है; केवल उसके अंतिम HTTP खंड
को नहीं, बल्कि पूरा बैच डुप्लिकेट हो सकता है। इस समझौते को ध्यान में रखकर कर्सर बैच आकार
चुनें।

### Langfuse उदाहरण

स्व-होस्टेड Langfuse इंस्टेंस के लिए इन फ़ील्ड को कॉन्फ़िगर करें:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Authorization मान को स्थानीय रूप से शाब्दिक `public-key:secret-key` स्ट्रिंग के Base64 के रूप
में बनाएँ (उदाहरण के लिए `Buffer.from(publicKey + ":" + secretKey).toString("base64")` से)।
वास्तविक क्रेडेंशियल को लॉग, स्क्रीनशॉट या इश्यू में पेस्ट न करें। मैपिंग अपने-आप
`x-langfuse-ingestion-version: 4` सेट करती है; Authorization अभी भी `headers` में दिया जाता है।
हेडर और जेनरेट की गई पहचान सॉल्ट, दोनों मौजूदा एन्क्रिप्टेड सीक्रेट-फ़ील्ड मैकेनिज़्म और API
प्लेसहोल्डर का उपयोग करते हैं; `STORAGE_ENCRYPTION_KEY` आवश्यक है।

मैपिंग में जनरेशन प्रकार/मॉडल, JSON उपयोग विवरण (इनपुट/आउटपुट/कुल और उपलब्ध
कैश कुंजियाँ), JSON इनपुट/आउटपुट स्नैपशॉट, ERROR/DEFAULT स्तर, सैनिटाइज़ किया गया
स्थिति संदेश, ट्रेस नाम, सेशन आईडी, वैकल्पिक पर्यावरण और प्रदाता, अनुरोधित मॉडल, पथ,
कॉम्बो, कैश स्रोत और स्थिति के लिए फ़िल्टर किए जा सकने वाले
`langfuse.observation.metadata.<key>` को जोड़ा जाता है। `langfuse.observation.completion_start_time` प्रारंभ
समय पर ISO 8601 होता है और केवल तभी TTFT जोड़ा जाता है, जब TTFT ज्ञात हो और अवधि के
भीतर हो। कोई लागत एट्रिब्यूट नहीं भेजे जाते।

पहचान मोड `langfuse.user.id` पर लागू होते हैं:

- `pseudonymous` (डिफ़ॉल्ट): API key के आंतरिक id का HMAC-SHA256, जिसमें प्रति-गंतव्य एक रैंडम
  32-बाइट salt उपयोग होता है। salt निर्माण के समय, यदि अनुपस्थित हो, जनरेट किया जाता है,
  `identitySalt` के रूप में एन्क्रिप्ट किया जाता है, कभी लौटाया नहीं जाता और संपादनों के दौरान
  सुरक्षित रखा जाता है। raw key ids को कभी भी span attributes में नहीं रखा जाता। किसी गंतव्य के
  salt को फिर से बनाने/घुमाने पर पहचान बदल जाती है।
- `keyName`: कॉन्फ़िगर किया गया API key नाम, जिससे उस ऑपरेटर लेबल को जानबूझकर उजागर किया जाता है।
- `none`: कोई user id नहीं। मौजूद होने पर session tags फिर भी एक्सपोर्ट किए जाते हैं; ये मोड
  मनमानी prompt सामग्री या ऑपरेटर द्वारा दिए गए session/correlation labels को अनाम नहीं बनाते।

### बैकफ़िल के बिना प्रारंभ करना

केवल निर्माण के समय **वर्तमान स्थिति से प्रारंभ करें (मौजूदा लॉग छोड़ें)** सक्षम करें या
create API payload के शीर्ष स्तर पर `startFromCurrentPosition: true` पास करें। यह मौजूदा
cursor helpers का उपयोग करके `cursor_row_id` को वर्तमान में रखी गई call-log rowid के अधिकतम
मान पर आरंभ करता है, बिना migration के। डिफ़ॉल्ट false है (cursor 0 और रखे गए इतिहास का
बैकफ़िल)। यह update-time cursor reset सेटिंग नहीं है।

साझा `ttftMs` जोड़ने से BigQuery mapper और new-table schema में एक nullable `ttft_ms` कॉलम भी
जुड़ता है: इसके schema test के लिए आवश्यक है कि प्रत्येक canonical record field का एक कॉलम
हो। मौजूदा टेबल अपरिवर्तित रूप से एक्सपोर्ट होती रहती हैं: `prepare()` टेबल schema पढ़ता है और
केवल `ttft_ms` को तब छोड़ता है, जब वह कॉलम अनुपस्थित हो। अगले run में TTFT प्राप्त करने के लिए
nullable INT64 कॉलम जोड़ें या नई टेबल का उपयोग करें। वैकल्पिक TTFT कॉलम schema update को
ट्रिगर नहीं करता। usage-evidence कॉलम नीचे दिए गए conditional, opt-in compatibility flow का
अनुसरण करते हैं; अन्य row fields में strict schema checking जारी रहती है।

---

## 6. डेस्टिनेशन जोड़ना

1. `src/lib/logExport/destinations/<name>.ts` बनाएँ, जो एक `LogExportDestinationType` एक्सपोर्ट करे:
   एक Zod `configSchema`, UI के लिए एक `fields` डिस्क्रिप्टर ऐरे, `secretFields`, और एक
   `createClient(config)` जो `test()` / `prepare()` / `send(records)` लौटाए।
2. इसे `src/lib/logExport/registry.ts` में `DESTINATIONS` ऐरे में जोड़ें।
3. `tests/unit/` के अंतर्गत टेस्ट लिखें।

बस इतना ही बदलाव करना है: पर्सिस्टेंस, क्रॉन जॉब, REST लेयर, सीक्रेट एन्क्रिप्शन और
डैशबोर्ड फ़ॉर्म, सभी रजिस्ट्री को पढ़ते हैं।

नए डेस्टिनेशन के लिए दो नियम:

- आंशिक विफलता होने पर `send()` को **अनिवार्य रूप से अपवाद थ्रो करना चाहिए**। सफलतापूर्वक पूरा होने का अर्थ है कि "डेस्टिनेशन में ये पंक्तियाँ मौजूद हैं",
  और कर्सर स्थायी रूप से उनसे आगे बढ़ जाता है।
- उपयोगकर्ता द्वारा दिया गया URL स्वीकार करने वाले डेस्टिनेशन को फ़ेच करने से पहले
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) के ज़रिए उसे सत्यापित करना चाहिए,
  ठीक वैसे ही जैसे वेबहुक करते हैं। BigQuery को इसकी ज़रूरत नहीं है: इसके होस्ट स्थिर हैं।

---

## 7. इसे संचालित करना

- **डैशबोर्ड**: Integrations → Log export पर जाएँ। एक गंतव्य जोड़ें, क्रेडेंशियल जाँचने के लिए
  **Test** चलाएँ, बिना पंक्तियाँ लिखे, फिर इसे सक्षम करें।
- **बैकलॉग**: प्रत्येक गंतव्य कार्ड लंबित पंक्तियाँ और कर्सर दिखाता है; `GET
/api/log-export/status` वही आँकड़े और साथ ही पिछली 20 जॉब रन लौटाता है।
- **किसी एक गंतव्य की विफलता से अन्य गंतव्य विफल नहीं होते** — रन सारांश `last_status` /
  `last_error` में प्रति-गंतव्य स्थिति दर्ज करता है और जॉब रन इतिहास समग्र स्थिति रखता है।
- **किसी गंतव्य को हटाने से उसका कर्सर हट जाता है।** उसे फिर से जोड़ने पर यह सबसे पुराने
  संरक्षित कॉल लॉग से शुरू होता है, जिससे वे पंक्तियाँ दोबारा भेजी जाती हैं जो गंतव्य में पहले से
  मौजूद हो सकती हैं। BigQuery पर प्रति-पंक्ति `insertId` केवल BigQuery की अपनी डुप्लिकेट-निरोध
  अवधि के भीतर ही इसे संभालता है, इसलिए किसी गंतव्य को हटाने के बजाय उसे अक्षम करना बेहतर है।

### उपयोग-साक्ष्य स्कीमा संगतता

नई BigQuery तालिकाओं में nullable `usage_evidence` (JSON युक्त STRING) और
`usage_estimated` (BOOL) शामिल होते हैं। `autoCreate` सक्षम होने पर, किसी मौजूदा तालिका में
केवल ये अनुपस्थित nullable कॉलम जोड़े जा सकते हैं। एक्सपोर्टर फ़ील्ड मेटाडेटा सहित मौजूदा
पूर्ण स्कीमा को सुरक्षित रखता है और लौटाए गए etag का उपयोग करके सशर्त PATCH भेजता है।
एक साथ होने वाला स्कीमा परिवर्तन एक्सपोर्ट को विफल कर देता है, उसे ओवरराइट नहीं करता; अगली
रन तालिका को फिर से पढ़ती है।

`autoCreate` अक्षम होने पर, usage evidence वाले रिकॉर्ड एक्सपोर्ट करने से पहले ये कॉलम
स्वयं जोड़ें। अनुपस्थित स्कीमा/etag मेटाडेटा या विफल अपडेट भी evidence वाले इंसर्ट को रोकता है।
उस विफलता पर एक्सपोर्ट कर्सर आगे नहीं बढ़ता और evidence कभी चुपचाप हटाया नहीं जाता। एक्सपोर्ट
रुके रहने के दौरान भी स्थानीय लॉग रिटेंशन लागू रहती है, इसलिए संरक्षित स्रोत पंक्तियों की
समय-सीमा समाप्त होने से पहले विफलता का समाधान करें।
