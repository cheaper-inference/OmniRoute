# Log export (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute कल लगहरूको बाह्य एनालिटिक्स भण्डारमा निरन्तर, वृद्धिशील निर्यात।

लग ड्यासबोर्ड ट्याबले अनुरोध इतिहास SQLite (`call_logs`) मा राख्छ, जुन
रोटेसन र अवधारणद्वारा सीमित हुन्छ। लग निर्यातले त्यही रेकर्ड समूहलाई निर्धारित तालिकाअनुसार बाहिर पठाउँछ, जसले गर्दा यो
स्थानीय डेटाबेसभन्दा लामो समयसम्म रहन सक्छ र अन्य डेटासँग जोड्न सकिन्छ। BigQuery पहिलो गन्तव्य हो;
पाइपलाइन रजिस्ट्रीमा आधारित भएकाले थप गन्तव्यहरू थप्दै जान सकिन्छ।

---

## 1. यसले कसरी काम गर्छ

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **तालिका** — एउटा `JobRegistry` cron कार्य, `log_export`, जसको पूर्वनिर्धारित मान `0 * * * *` (हरेक घण्टा,
  UTC) हो। यो `src/lib/initCloudSync.ts` मा दर्ता गरिएको छ; `OMNIROUTE_LOG_EXPORT_CRON` बाट ओभरराइड गर्न सकिन्छ।
  प्रत्येक टिकले सबै **सक्षम पारिएका** गन्तव्यका बाँकी रेकर्डहरू क्रमशः पठाउँछ।
- **कर्सर** — SQLite को अन्तर्निहित `call_logs.rowid`, जुन प्रत्येक गन्तव्यका लागि
  `log_export_destinations.cursor_row_id` मा सुरक्षित गरिन्छ। जानाजानी `timestamp` लाई कर्सर बनाइएको छैन: कल गर्ने पक्षले
  आफ्नै मान दिन सक्छन्, त्यसैले ढिलो अनुरोध पछि सुरु भएको छिटो अनुरोधभन्दा पछि लेखिन सक्छ,
  र टाइमस्ट्याम्प कर्सरले त्यसलाई छुटाउन सक्छ।
- **ब्याचिङ** — प्रत्येक अनुरोधमा `batch_size` पङ्क्ति (पूर्वनिर्धारित 500), प्रत्येक रनमा `max_rows_per_run` पङ्क्ति
  (पूर्वनिर्धारित 10000), जसले गर्दा ठूलो ब्याकलगले एउटै टिक अवरुद्ध गर्नुको सट्टा धेरै टिकमा क्रमशः खाली हुन्छ।
- **डेलिभरी** — `send()` सफलतापूर्वक पूरा भएपछि मात्र कर्सर अगाडि बढ्छ। ब्याच असफल भएमा
  कर्सर पहिलेकै स्थानमा रहन्छ, त्यसैले अर्को रनमा उही पङ्क्तिहरू पुनः प्रयास गरिन्छ। यसले दिने प्रत्याभूति
  कम्तीमा एक पटक डेलिभरी र गन्तव्यतर्फ दोहोरिएका रेकर्ड हटाउने व्यवस्था हो, वास्तविक ठ्याक्कै एक पटक डेलिभरी होइन: BigQuery ले प्रत्येक
  पङ्क्तिको कुञ्जीका रूपमा कल-लग id प्रयोग गर्छ, जसलाई उसले आफ्नै डुप्लिकेट हटाउने समयसीमाभित्र सकेसम्म पालना गर्छ।
- **ओभरल्याप सुरक्षा** — cron टिक र `POST .../run` एकै समयमा सक्रिय हुन सक्छन्। पहिले नै
  रेकर्ड पठाइरहेको गन्तव्यलाई दोहोर्‍याएर पठाउनुको सट्टा छोडिन्छ (रनको नतिजामा `skipped: true`),
  त्यसैले समवर्ती रनले ब्याच पुनः पठाउन वा कर्सर पछाडि लेख्न सक्दैन।
- **पूर्ण मेटाइपछिको पुनःस्थापना** — यदि `cursor_row_id`, `MAX(rowid)` भन्दा माथि पुग्यो भने (सम्पूर्ण तालिका
  मेटाइयो र rowid हरू फेरि सुरु भए), रनर स्थायी रूपमा नयाँ रेकर्ड देख्न नसक्ने हुनुको सट्टा 0 मा फर्कन्छ।

### पृथक रनर र सीमाहरू

Node मा प्रत्येक गन्तव्य रनले छुट्टै, छोटो समय चल्ने OS चाइल्ड प्रक्रिया सुरु गर्छ (IPC सहितको `child_process`,
`worker_threads` होइन)। बडी पढ्ने, पेलोड JSON पार्सिङ/सिरियलाइजेसन, गन्तव्यको
`prepare()` र गन्तव्यको नेटवर्क I/O सबै त्यहीँ चल्छन्, सर्भरको इभेन्ट लुपमा होइन।
कन्फिगरेसन र साना प्रगति सन्देशहरू मात्र IPC मार्फत आदानप्रदान हुन्छन्; निर्यात गरिएका रेकर्डहरू कहिल्यै
सर्भरमा फर्कँदैनन्। cron कार्य र अहिले चलाउने रुटले उही सार्वजनिक नतिजा र ओभरल्याप सुरक्षा कायम राख्छन्।

चाइल्डले `node:sqlite` प्रयोग गरी सर्भरले निर्धारण गरेको `DATA_DIR/storage.sqlite` पढ्न-मात्र मिल्ने गरी खोल्छ,
जसमा `busy_timeout=5000` र `query_only=ON` हुन्छ। यसले कुनै DB सिङ्गलटन इम्पोर्ट गर्दैन र कुनै
माइग्रेसन, ब्याकअप वा SQLite अद्यावधिक गर्दैन। हराएका/बिग्रिएका आर्टिफ्याक्टको हिसाबकिताब (बिग्रिएको आर्टिफ्याक्टसम्बन्धी
UPDATE सहित) ड्यासबोर्डको विवरण पथमा मात्र रहन्छ। दुवै पथले शुद्ध
विवरण रिजल्भर साझा गर्छन्; निर्यातले एसिन्क्रोनस फाइलप्रणाली पढाइ र उही आर्टिफ्याक्ट → पुरानो
इनलाइन → पुरानो डिस्क → केही छैन भन्ने समाधान क्रम प्रयोग गर्छ। चाइल्डले आफ्नो रिडर खोल्दा रनले अधिकतम इन्सर्सन rowid को
स्न्यापसट लिन्छ; त्यसपछि थपिएका रेकर्डहरू अर्को रनसम्म पर्खन्छन्। यो इन्सर्सनको
सीमा हो, लामो समय चल्ने SQLite ट्रान्ज्याक्सन होइन: नेटवर्कको प्रतीक्षाका बेला WAL राइटर र चेकपोइन्टहरू
स्वतन्त्र रहन्छन्। यस सीमाले विद्यमान पङ्क्तिहरूको अद्यावधिक/मेटाइलाई स्थिर राख्दैन।

प्रत्येक स्वीकृत ब्याचपछि चाइल्डले पुष्टिको प्रतीक्षा गर्छ। सर्भरले पहिले
`advanceLogExportCursor` मार्फत कर्सर सुरक्षित गर्छ, त्यसपछि `ack` पठाउँछ; त्यसभन्दा अघि अर्को ब्याच सुरु हुँदैन।
पठाउन असफल हुँदा, क्र्यास हुँदा वा टाइमआउट हुँदा त्यो ब्याचको कर्सर अगाडि नबढाई असफलता रेकर्ड गरिन्छ। पहिले
पुष्टि भएका ब्याचहरू कमिट भएकै रहन्छन्; बढीमा पुष्टि नभएको एउटा ब्याच मात्र पुनः पठाइन सक्छ।
`done` र चाइल्डको सामान्य समापनपछि मात्र सफलता रेकर्ड गरिन्छ। असफलतामा चाइल्डलाई
SIGTERM द्वारा बन्द गरिन्छ, 500 ms पछि आवश्यक परे SIGKILL प्रयोग गरिन्छ, र रनरले प्रक्रिया बन्द हुने प्रतीक्षा गर्छ।

| वातावरण चर                                    | पूर्वनिर्धारित | उद्देश्य                                           |
| --------------------------------------------- | -------------- | -------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000         | प्रत्येक गन्तव्यका लागि वास्तविक बितेको समयको सीमा |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024           | चाइल्डको V8 old-space सीमा MB मा                   |

अमान्य/गैर-धनात्मक/गैर-पूर्णाङ्क मानहरूका लागि पूर्वनिर्धारित मान प्रयोग हुन्छन्। हिप सेटिङ कुल
RSS सीमा होइन; धेरै ठूला ब्याचले अझै पनि चाइल्डको मेमोरी समाप्त पार्न र रनलाई सुरक्षित रूपमा असफल गराउन सक्छन्।
1024 MB को पूर्वनिर्धारित मानले बडी सक्षम हुँदा 512 KiB आर्टिफ्याक्टहरूको पूर्वनिर्धारित 500-पङ्क्तिको ब्याचका लागि,
BigQuery को बाइट-खण्डित JSON सिरियलाइजेसनसहित, अतिरिक्त क्षमता छोड्छ। यसले
10000-पङ्क्तिको बडी ब्याचलाई सुरक्षित बनाउँदैन। V8 हिप समाप्त हुँदा सुधारात्मक कदम चाल्न सकिने असफलता रेकर्ड हुन्छ: ब्याचको
आकार घटाउनुहोस् वा `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` बढाउनुहोस्; कर्सर अन्तिम
पुष्टि भएको ब्याचमै रहन्छ। पुराना इनलाइन/डिस्क बडीहरू आधुनिक आर्टिफ्याक्ट सीमामा समेटिँदैनन्।
सञ्चालकहरूले RSS का लागि छुट्टै बजेट निर्धारण गर्नुपर्छ, विशेष गरी मेमोरी-सीमित कन्टेनरहरूभित्र।

चाइल्डले समाधान गरिएको `DATA_DIR`, `NODE_ENV`, स्पष्ट रूपमा दिइएको `TZ` (पुरानो फाइलनामको
स्थानीय-समय निर्धारण), उपस्थित भएमा `ELECTRON_RUN_AS_NODE`, र निम्न आउटबाउन्ड इनपुटहरू मात्र प्राप्त गर्छ:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (र तिनका साना अक्षरका रूपहरू),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`।
विश्वव्यापी Undici डिस्प्याचरले `NO_PROXY` सहित सर्भरको पूर्णतः वातावरणमा आधारित प्रोक्सी निर्धारण र स्थानीय-होस्ट
बाइपास नियमहरू साझा गर्छ; यसले `proxyFetch.ts` वा त्यसका DB/सुविधा फ्ल्यागहरू आयात गर्दैन।
फर्वार्ड गरिएको आउटपुट र अभिलेख गरिएका त्रुटिहरूबाट प्रोक्सी प्रमाणिकरण विवरणहरू लुकाइन्छन्। गन्तव्यका प्रमाणिकरण विवरणहरू
एउटा मात्र सुरुवाती IPC सन्देशमा पठाइन्छन्, argv वा वातावरणमा कहिल्यै पठाइँदैनन्; आउटपुट/त्रुटि फर्वार्डिङमा
उपसर्ग थपिन्छ र संवेदनशील जानकारी हटाइन्छ। हरेक cron रनमा Node को SQLite चेतावनी
दोहोरिन नदिन चाइल्ड exec आर्गुमेन्टहरूमा `ExperimentalWarning` मात्र निष्क्रिय गरिन्छ; अन्य प्रकारका चेतावनीहरू देखिइरहन्छन्।

गन्तव्य मोड्युलहरू Next.js/server-only निर्भरताहरू बिना आयात गर्न सकिने हुनुपर्छ। विद्यमान
BigQuery कार्यान्वयनले यो सर्त पहिले नै पूरा गर्छ। पहुँच-टोकन क्यासहरू चाइल्ड
रनको अवधिसम्म मात्र रहन्छन्, विभिन्न रनहरूबीच रहँदैनन्। Node समर्थित रनटाइम हो (`package.json` engines), तर README को Bun
स्थापना खण्ड र `Dockerfile.bun` ले पनि
`bun:sqlite` (`src/lib/db/core.ts` / एडाप्टरहरू) प्रयोग गर्ने उत्पादन-संगतता मार्ग उपलब्ध भएको बताउँछन्। त्यसैले Bun अन्तर्गत, एक्सपोर्टहरूले अघिल्लो
इन-प्रोसेस मार्ग कायम राख्छन् र एक पटक चेतावनी दिन्छन्: चाइल्ड हिप/टाइमआउट पृथकीकरण उपलब्ध छैन।
इभेन्ट-लुप र OOM पृथकीकरणका लागि Node प्रयोग गर्नुहोस्; यहाँ Bun लाई विकासका लागि मात्र मानिएको छैन।

`includeBodies` सक्षम हुँदा, हरेक घण्टाको पेलोड थुप्रो जम्मा गर्नुभन्दा
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` जस्तो मिनेट-स्तरको आवृत्तिलाई प्राथमिकता दिनुहोस्।
ब्याच र पङ्क्ति सीमाहरूले अझै पनि प्रत्येक रनलाई सीमित गर्छन्। प्रत्येक रनमा प्रत्येक गन्तव्यका लागि प्रक्रिया सुरु गर्ने लागत लाग्छ;
यसले सानो सुरुवाती लागतको सट्टामा सर्भर इभेन्ट-लुप पृथकीकरण प्रदान गर्छ, कुल CPU प्रयोग घटाउँदैन।

### पेलोडहरू (प्रम्प्ट र पूर्णताहरू)

पूर्वनिर्धारित रूपमा एक्सपोर्टमा लगहरूको **सूची** मा देखिने सारांश फिल्डहरू मात्र समावेश हुन्छन्।
**प्रम्प्ट र प्रतिक्रियाहरू एक्सपोर्ट गर्नुहोस्** (`includeBodies`) सक्रिय गर्दा प्रत्येक कलका लागि लगहरूको **विवरण**
प्यानमा देखिने सामग्री पनि पठाइन्छ:

| फिल्ड                            | यसमा के हुन्छ                                           |
| -------------------------------- | ------------------------------------------------------- |
| `request_body` / `response_body` | ड्यासबोर्डले प्रस्तुत गरेअनुसार कलका पेलोडहरू           |
| `pipeline_route_decision`        | राउटरले छानेको लक्ष्य र मोडेल                           |
| `pipeline_client_request`        | क्लाइन्टले पठाएजस्ताको तस्तै कच्चा अनुरोध               |
| `pipeline_openai_request`        | आन्तरिक OpenAI ढाँचामा रूपान्तरण गरेपछिको अनुरोध        |
| `pipeline_provider_request`      | प्रदायकको ढाँचामा अपस्ट्रिममा वास्तवमै पठाइएको अनुरोध   |
| `pipeline_provider_response`     | कच्चा अपस्ट्रिम प्रतिक्रिया                             |
| `pipeline_client_response`       | कल गर्नेलाई फिर्ता दिइएको सामग्री                       |
| `pipeline_error`                 | असफल कलको पाइपलाइन-स्तरको त्रुटि विवरण                  |
| `bodies_truncated`               | माथिका कुनै पनि फिल्ड `maxBodyBytes` सीमामा पुगेमा सत्य |

यो प्रम्प्ट सामग्री हो, त्यसैले यो **पूर्वनिर्धारित रूपमा बन्द हुन्छ** र जानाजानी प्रत्येक गन्तव्यका लागि छुट्टै छनोट हो।
ड्यासबोर्डमा देखिने सामग्री नै पठाइन्छ, किनभने एक्सपोर्ट र `getCallLogById` ले विवरण
प्राप्त गर्ने एउटै प्रक्रिया साझा गर्छन्: पेलोडहरू
लेखिँदा नै व्यक्तिगत पहिचानयोग्य जानकारी (PII) सफा गरिसकिएको र गोप्य जानकारी लुकाइसकिएको हुन्छ, र
`noLog` API कुञ्जीबाट गरिएको कलले कुनै पेलोड भण्डारण गर्दैन, त्यसैले एक्सपोर्ट गर्न केही हुँदैन।

पेलोडहरू फाइलसिस्टम आर्टिफ्याक्टबाट प्रत्येक पङ्क्तिका लागि पढिन्छन्, त्यसैले हाइड्रेसन यो माग गर्ने
गन्तव्यहरूका लागि मात्र चल्छ। आर्टिफ्याक्ट हराएको वा बिग्रिएको भए ब्याच असफल पारेर कर्सर अड्काउनुको सट्टा
शून्य पेलोडहरूसहित त्यसको सारांश एक्सपोर्ट गरिन्छ।

`maxBodyBytes` (पूर्वनिर्धारित 262144) ले प्रत्येक फिल्डको सीमा तोक्छ। लामा पेलोडहरू **हटाउनुको सट्टा
छाँटिन्छन्** — छाँटिएको प्रम्प्टले पनि "के सोधिएको थियो" भन्ने उत्तर दिन्छ — र पङ्क्तिलाई
`bodies_truncated` द्वारा चिन्ह लगाइन्छ। स्ट्रिम गरिएका खण्ड-खण्डका परिवर्तनहरू एक्सपोर्ट गरिँदैनन्; संयोजित प्रतिक्रिया
पहिले नै `pipeline_provider_response` र `pipeline_client_response` मा हुन्छ।

---

## 2. फाइलहरू

| अंश                        | स्थान                                        |
| -------------------------- | -------------------------------------------- |
| गन्तव्य सम्झौता            | `src/lib/logExport/types.ts`                 |
| रजिस्ट्री                  | `src/lib/logExport/registry.ts`              |
| गोप्य जानकारीको व्यवस्थापन | `src/lib/logExport/secrets.ts`               |
| रनर (मूल IPC)              | `src/lib/logExport/runner.ts`                |
| प्रक्रियाको जीवनचक्र       | `src/lib/logExport/childRunner.ts`           |
| चाइल्ड प्रवेश बिन्दु       | `src/lib/logExport/exportChild.ts`           |
| पढ्न-मात्र खोल्ने घटक      | `src/lib/db/logExportReadOnly.ts`            |
| साझा क्वेरी/म्यापिङ        | `src/lib/usage/callLogExportQueries.ts`      |
| विवरण रिजल्भर              | `src/lib/usage/callLogDetailResolver.ts`     |
| API प्रक्षेपण              | `src/lib/logExport/presenter.ts`             |
| BigQuery गन्तव्य           | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA प्रमाणीकरण       | `src/lib/logExport/googleServiceAccount.ts`  |
| कल-लग स्रोत                | `src/lib/usage/callLogExportSource.ts`       |
| स्थायी भण्डारण             | `src/lib/db/logExportDestinations.ts`        |
| Cron कार्य                 | `src/lib/jobs/logExportJob.ts`               |
| REST तह                    | `src/app/api/log-export/`                    |
| ड्यासबोर्ड पृष्ठ           | `src/app/(dashboard)/dashboard/log-export/`  |

स्किमा: `src/lib/db/migrations/170_log_export_destinations.sql`।

---

## 3. REST API

सबै रुटहरूमा व्यवस्थापन प्रमाणीकरण गरिन्छ (`requireManagementAuth`)। गोप्य जानकारी कहिल्यै फर्काइँदैन:
भण्डारण गरिएको गोप्य जानकारी शाब्दिक मान `__stored__` का रूपमा फर्किन्छ, र अद्यावधिक गर्दा त्यही मान फिर्ता पठाउँदा
भण्डारण गरिएको प्रमाणिकरण विवरण यथावत् रहन्छ।

गोप्य जानकारी घोषणा गर्ने प्रकारको गन्तव्य सिर्जना वा अद्यावधिक गर्न **`STORAGE_ENCRYPTION_KEY`
आवश्यक हुन्छ**। यो नभएमा `encrypt()` ले कुनै सूचना नदिई डाटा जस्ताको तस्तै पार गर्छ, त्यसैले प्रमाणिकरण विवरणलाई SQLite मा सादा पाठका रूपमा राख्नुको सट्टा
लेखनलाई 400 सहित अस्वीकार गरिन्छ (Telegram webhook ले पनि यही
सुरक्षा जाँच लागू गर्छ)।

| विधि     | पथ                                       | उद्देश्य                                                        |
| -------- | ---------------------------------------- | --------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | गन्तव्यका प्रकारहरू + तिनका कन्फिगरेसन फिल्डहरूको सूची          |
| `GET`    | `/api/log-export/destinations`           | गन्तव्यहरूको सूची (गोप्य जानकारी लुकाइएको)                      |
| `POST`   | `/api/log-export/destinations`           | गन्तव्य सिर्जना गर्ने                                           |
| `GET`    | `/api/log-export/destinations/{id}`      | एउटा गन्तव्य पढ्ने                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | नाम / सक्षम स्थिति / कन्फिगरेसन / ब्याचिङ अद्यावधिक गर्ने       |
| `DELETE` | `/api/log-export/destinations/{id}`      | मेटाउने                                                         |
| `POST`   | `/api/log-export/destinations/{id}/test` | प्रमाणिकरण विवरण जाँच्ने, केही नलेख्ने                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | निर्धारित कार्यान्वयनकै मार्गबाट अहिले बाँकी सबै निर्यात गर्ने  |
| `GET`    | `/api/log-export/status`                 | Cron स्थिति, हालैका कार्यान्वयनहरू, प्रत्येक लक्ष्यका बाँकी काम |

`GET /api/log-export/types` ले नै UI लाई साझा प्रयोजनका लागि उपयुक्त बनाउँछ: ड्यासबोर्ड फारम
फर्काइएका फिल्ड विवरणहरूबाट रेन्डर गरिन्छ, त्यसैले नयाँ गन्तव्यका लागि UI परिवर्तन आवश्यक पर्दैन।

---

## 4. BigQuery गन्तव्य

कन्फिगरेसन कुञ्जीहरू (`type: "bigquery"`):

| Key                  | Notes                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `projectId`          | डेटासेट राख्ने GCP project                                                                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                  |
| `location`           | डेटासेट सिर्जना गर्नुपर्ने अवस्थामा मात्र प्रयोग हुन्छ (पूर्वनिर्धारित `EU`)                                     |
| `serviceAccountJson` | Service-account कुञ्जी। गोप्य: स्थिर अवस्थामा इन्क्रिप्ट गरिएको, कहिल्यै फिर्ता गरिँदैन                          |
| `autoCreate`         | हराइरहेको डेटासेट/टेबल सिर्जना गर्ने; nullable usage-evidence स्तम्भहरू सर्तअनुसार थप्ने (पूर्वनिर्धारित `true`) |

Service account लाई लक्षित टेबलमा `bigquery.tables.updateData` आवश्यक हुन्छ, साथै
`autoCreate` सक्रिय हुँदा `bigquery.datasets.create` / `bigquery.tables.create` पनि आवश्यक हुन्छ।
पहिल्यै रहेको टेबलमा दुईवटा nullable usage-evidence field थप्न `bigquery.tables.update` पनि
आवश्यक हुन्छ। अनुमति हराएमा export असफल हुन्छ र यसको cursor अगाडि बढ्दैन।

कन्फिगर गरिएको batch HTTP एकाइ होइन, **cursor** एकाइ हो: `send()` ले यसलाई बढीमा 500
row भएका insertAll call हरूमा विभाजन गर्छ, त्यसैले ठूलो `batch_size` ले BigQuery को 10 MB request
सीमा पार्न सक्दैन। अस्थायी status (408/429/500/502/503/504) लाई exponential
backoff सहित बढीमा तीन पटक पुनःप्रयास गरिन्छ र उही insertIds पुनःप्रयोग गरिन्छ; auth र schema
सम्बन्धी असफलतामा run अनावश्यक रूपमा खर्च नगरी पहिलो प्रयासमै त्रुटि फ्याँकिन्छ।

भर्खरै सिर्जना गरिएको टेबल streaming endpoint मा तुरुन्तै देखिँदैन, जसले केही सेकेन्डसम्म
404 जवाफ दिन्छ। त्यो 404 मा पुनःप्रयास गरिन्छ, तर **यो run ले टेबल सिर्जना गरेको अवस्थामा मात्र** —
वास्तवमै हराइरहेको टेबलमा तुरुन्तै असफल हुन्छ। हालसालै मेटाइएको टेबलको नाममा पुनः टेबल
सिर्जना गर्दा BigQuery ले केही मिनेटसम्म streaming inserts अस्वीकार गर्छ भन्ने कुरा ध्यान दिनुहोस्;
यो delete-then-recreate को विशेषता हो, त्यसैले टेबल हटाएर पुनः थप्नुको सट्टा नयाँ टेबल नाम
प्रयोग गर्नु राम्रो हुन्छ।

**आंशिक असफलता HTTP 200 सँग non-empty `insertErrors[]` का रूपमा आउँछ।** यसलाई
असफलता मानेर त्रुटि फ्याँकिन्छ, जसले BigQuery ले स्वीकार नगरेका row हरूभन्दा अगाडि cursor
बढ्नबाट रोक्छ; `tests/unit/log-export-bigquery.test.ts` ले यस व्यवहारलाई सुनिश्चित गर्छ।

Transport plain REST हो — self-signed RS256 assertion लाई
`https://oauth2.googleapis.com/token` मा access token का लागि साटिन्छ, त्यसपछि row हरू
`tabledata.insertAll` मा पठाइन्छ। कुनै Google SDK समावेश गरिँदैन। Access token हरूलाई
process भित्र (service account, scope) अनुसार cache गरिन्छ।

सिर्जना गरिएको टेबलमा Logs-tab का प्रत्येक field का लागि एउटा column र `exported_at` हुन्छ, र
वास्तवमा call logs कसरी query गरिन्छ भन्नेअनुसार यसको संरचना तयार गरिएको हुन्छ:

- **`timestamp` मा day-partitioned**, त्यसैले मितिद्वारा सीमित गरिएको query ले ती दिनहरू मात्र scan गर्छ।
- **`api_key_name`, `provider`, `model`, `status` द्वारा clustered** (यसै क्रममा), त्यसैले
  कसले चलायो, कहाँ पठाइयो वा असफल भयो कि भएन भनेर filter गर्दा प्रत्येक partition भित्रका
  block हरू prune हुन्छन्। BigQuery ले बढीमा चारवटा clustering column अनुमति दिन्छ र क्रम
  महत्त्वपूर्ण हुन्छ: `api_key_name` मा मात्र गरिएको filter ले prune गर्छ, `status` मा मात्र गरिएको
  filter ले गर्दैन।
- `partitionExpirationDays` मार्फत **वैकल्पिक partition retention** (0 ले सबै कुरा राख्छ),
  टेबल सिर्जना गर्दा लागू हुन्छ।

दुवै सेटिङ सिर्जना गर्ने समयमा मात्र लागू हुन्छन्। पहिल्यै रहेको टेबलले त्यसमा पहिल्यै भएको
layout नै राख्छ, त्यसैले यी सेटिङ अपनाउन चाहनुहुन्छ भने गन्तव्यलाई नयाँ table id तर्फ
निर्देश गर्नुहोस्।

`tests/unit/log-export-bigquery.test.ts` ले mapper र table schema एकआपसमा सुसंगत रहेको
सुनिश्चित गर्छ, त्यसैले नयाँ call-log column पठाउने क्रममा चुपचाप छुट्न सक्दैन।

Batch हरू **row count र serialised bytes दुवै** का आधारमा विभाजन गरिन्छ। payload हरू export
गरिएपछि row count मात्र पर्याप्त हुँदैन: prompt बोकेका 500 row को आकार दसौँ megabytes हुन
सक्छ, र insertAll ले 10 MB भन्दा ठूलो request अस्वीकार गर्छ। Chunk हरू 500 row वा 9 MB,
जुन पहिले पुग्छ, त्यहीँ बन्द हुन्छन्।

---

## ५. OTLP/HTTP ट्रेस गन्तव्य

कन्फिगरेसनले `type: "otlp-http"` प्रयोग गर्छ। यो persisted call logs को scheduled, cursor-backed export हो, `open-sse/services/routing/otel.ts` मा रहेको best-effort live routing-event sink होइन। यसले उक्त sink का environment variables, timers वा buffers पढ्दैन वा परिवर्तन गर्दैन। दुवै सक्षम गर्दा spans का दुई स्वतन्त्र प्रकार उत्पन्न हुन सक्छन्; यी call-log spans छुट्याउन `omniroute.log-export` instrumentation scope प्रयोग गर्नुहोस्।

| Key                      | Default / purpose                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `endpoint`               | आवश्यक पूर्ण HTTP(S) traces URL; `/v1/traces` suffix थपिँदैन                          |
| `headers`                | वैकल्पिक `Name: value` lines वा strings को JSON object; encrypted                     |
| `requestHeaderAllowlist` | खाली (बन्द); span attributes का रूपमा capture गर्नुपर्ने client header names/prefixes |
| `serviceName`            | `omniroute`; resource `service.name`                                                  |
| `langfuseMapping`        | `false`; Langfuse generation/session/user attributes थप्छ                             |
| `identity`               | `pseudonymous`, `keyName`, वा `none`                                                  |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                               |
| `timeoutMs`              | प्रत्येक HTTP प्रयासका लागि `30000`                                                   |
| `environment`            | सेट नगरिएको; वैकल्पिक `langfuse.environment`                                          |

सामान्य dashboard ले यी fields render गर्छ। `paths` ले API array वा newline/commas द्वारा छुट्याइएका exact paths भएको textarea स्वीकार गर्छ। Embeddings, rerank र अन्य paths स्पष्ट रूपमा अनुमति नदिइएसम्म skip गरिन्छन्। Skip गरिएका rows ले cursor अगाडि बढाउन जारी राख्छन्; विद्यमान runner का `exported`/`exportedTotal` counters ले स्वीकार गरिएका spans होइन, filter गरिएका rows समेत समेटिएका processed source rows गणना गर्छन्। Filtering child मा गरिन्छ, यसको IPC/cursor contract परिवर्तन नगरी।

URL validation ले `src/shared/network/outboundUrlGuard.ts` बाट DB-free `parseAndValidateNonMetadataUrl` helper प्रयोग गर्छ: `block-metadata` policy। यसमा webhook validator का जस्तै unconditional metadata/protocol/embedded-credential checks हुन्छन्, private URLs opt-in गरिएका हुन्छन्, तर global feature-flag override बिना localhost/LAN targets लाई जानाजानी अनुमति दिइन्छ। यसले self-hosted Langfuse, Phoenix, Tempo र Collector endpoints, private HTTP endpoints समेत, प्रयोग गर्न अनुमति दिन्छ। Cloud-metadata hosts सधैँ block गरिन्छन्। Redirects follow गरिँदैनन्, त्यसैले collector ले credentials लाई फरक host मा redirect गर्न सक्दैन। विद्यमान lexical URL guard जस्तै, यसले DNS resolution pin गर्दैन; operator-controlled hosts मात्र configure गर्नुहोस्। Endpoint trusted network मा नभएको अवस्थामा HTTPS प्रयोग गर्न प्राथमिकता दिनुहोस्।

### Payload र delivery

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) ले प्रत्येक अनुमति दिइएको row का लागि एउटा CLIENT span पठाउँछ, जसको नाम exact request path द्वारा राखिन्छ। Path naming ले span name मा model वा identity data समावेश नगरी Chat Completions, Responses र Messages छुट्याउँछ। Resource attributes मा `service.name` र package को `service.version` समावेश हुन्छन्।

सामान्य chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) ले completion हुँदा `duration = Date.now() - startTime` लेख्छ र timestamp उपलब्ध गराउँदैन; `src/lib/usage/callLogs.ts` मा रहेको `saveCallLogOperation` ले timestamp लाई write (completion) time मा default गर्छ। त्यसैले export ले end लाई row timestamp र start लाई end − duration का रूपमा सेट गर्छ (milliseconds लाई decimal nanoseconds मा रूपान्तरण गरेर)। Caller-supplied historical timestamps पनि end time का रूपमा सुरक्षित राखिन्छन्; प्रत्येक row का लागि start/completion छुट्याउने कुनै discriminator छैन। Null duration शून्यमा परिणत हुन्छ। Invalid/missing timestamps ले गैर-निश्चयात्मक spans सिर्जना गर्नुको सट्टा batch असफल बनाउँछन्। `ttftMs` nullable हुन्छ र `omniroute.ttft_ms` मा map हुन्छ।

Attributes मा `gen_ai.operation.name="chat"`, provider, requested/response model, input/output tokens, वैकल्पिक cache-read/cache-creation/reasoning tokens, HTTP status, combo, cache source, session tag र correlation id समावेश हुन्छन्। Integer OTLP values र timestamps decimal strings हुन्छन्; strings, booleans र fractional numbers ले आफ्ना native OTLP value variants प्रयोग गर्छन्। Error spans को status ERROR हुन्छ र status message sanitized हुन्छ। Canonical record मा upstream host URL हुँदैन, त्यसैले collector लाई model server का रूपमा गलत पहिचान नगर्न `server.address` omit गरिन्छ। Cost export गरिँदैन।

`includeBodies=true` हुँदा मात्र content hydrate गरिन्छ। `langfuseMapping=false` हुँदा, `gen_ai.input.messages` / `gen_ai.output.messages` ले OmniRoute ले store गरेको sanitized request/response body JSON बोक्छन् (parse गर्न मिल्ने अवस्थामा canonicalized), re-shaped semconv messages array होइन। Clipped/non-JSON bodies raw text कै रूपमा रहन्छन्। `langfuseMapping=true` हुँदा bodies केवल `langfuse.observation.input` / `langfuse.observation.output` का रूपमा emit गरिन्छन्; प्रत्येक body एकपटक मात्र पठाइयोस् भनेर `gen_ai.*.messages` attributes omit गरिन्छन्। दुवै modes ले विद्यमान hydration path बाट `maxBodyBytes` inherit गर्छन्; clipping चिनाउन `omniroute.bodies_truncated=true` सेट हुन्छ।
यस destination ले कुनै अतिरिक्त pipeline snapshots वा unsanitized artifact reads थप्दैन; वैकल्पिक request-header capture ले तल वर्णन गरिएको विद्यमान hydrated client snapshot प्रयोग गर्छ।
Bodies export गर्दा hourly backlog जम्मा गर्नुको सट्टा
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` जस्तो minute-level cadence प्रयोग गर्नुहोस्।

### वैकल्पिक client request headers

Header capture **पूर्वनिर्धारित रूपमा बन्द** हुन्छ। Destination config मा `requestHeaderAllowlist` सेट गर्नुहोस् र **प्रम्प्ट र प्रतिक्रियाहरू निर्यात गर्नुहोस्** सक्षम गर्नुहोस् (destination मा `includeBodies: true`)।
Allowlist ले API array वा newline/comma-separated names भएको textarea स्वीकार गर्छ:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

नामहरू case-insensitive र ठ्याक्कै मिल्नुपर्छ, जबसम्म अन्त्यमा रहेको एकल `*` ले गैर-रिक्त
header-name prefix चयन गर्दैन। खाली `*`, बीचमा रहेका wildcards र अमान्य HTTP header नामहरू
अस्वीकार गरिन्छन्। बढीमा 64 वटा selector हुन सक्छन्, र प्रत्येक selector को नाम/prefix बढीमा
256 ASCII bytes को हुन सक्छ।
यो सेटिङ `headers` बाट अलग हो, जसले exporter लाई collector समक्ष authenticate गर्छ।

Capture ले केवल `pipeline_client_request` पढ्छ, जुन सुरक्षित गरिएको detailed pipeline को
`clientRawRequest` (वा legacy `clientRequest`) बाट भरिएको हुन्छ। यसले provider request
headers मा कहिल्यै fallback गर्दैन।
Request रेकर्ड गरिँदा detailed pipeline logging सक्षम गरिएको हुनुपर्छ। `includeBodies` disabled
भएमा, वा client-snapshot JSON हराएको, बिग्रिएको वा काटिएको भएमा, कुनै header attributes
उत्पन्न हुँदैनन्। `maxBodyBytes` बढाउँदा export-time snapshot clipping रोक्न सकिन्छ;
तर कहिल्यै सुरक्षित नगरिएको detail पुनर्स्थापित गर्न सकिँदैन। 1 MiB भन्दा ठूलो वा
256 भन्दा बढी header entries भएको snapshot लाई बेवास्ता गरिन्छ। विद्यमान prompt/response
export header capture सँगै सक्षम रहन्छ; allowlist ले headers-only hydration mode प्रदान गर्दैन।

चयन गरिएका values हरू `http.request.header.<full lowercase header name>` OTLP string arrays
बन्छन्, एउटै string भए पनि। उदाहरणका लागि, `X-OmniRoute-Meta-Team: example-team` ले
`http.request.header.x-omniroute-meta-team` बनाउँछ, जसको मान
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` हुन्छ।
पूरा prefix सुरक्षित रहन्छ: यी साधारण headers हुन्, business-field parsing वा
`omniroute.metadata.*` / Langfuse metadata conversion हुँदैन। `langfuseMapping` ले header
semantics परिवर्तन गर्दैन। चयन गरिएको single-valued `User-Agent` ले standard scalar
`user_agent.original` पनि सेट गर्छ। एउटै value भित्रका commas विभाजन गरिँदैनन्। Case variants
सुरक्षित गरिएको entry order मा merge हुन्छन्; कुनै invalid variant भएमा त्यो पूरा header
हटाइन्छ। Attributes lowercase नामअनुसार क्रमबद्ध हुन्छन्।

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headers, auth/token/secret/password/credential
markers भएका नामहरू, र internal gateway credentials सधैँ excluded हुन्छन्, चयन गरिएका वा
storage मा आंशिक रूपमा masked भए पनि। परिचित credential patterns ले shared credential
detector पुनः प्रयोग गर्छन्; redaction markers हटाइन्छन्, safe values का रूपमा export गरिँदैनन्।
Strings र nonempty string arrays मात्र स्वीकार गरिन्छन्; numbers वा objects लाई coerce गरिँदैन।
Invalid names, prototype keys, control characters (horizontal tab बाहेक) र malformed Unicode लाई
batch fail नगरी वा तिनको content errors मा प्रतिबिम्बित नगरी बेवास्ता गरिन्छ।

प्रत्येक span ले बढीमा 32 headers, प्रत्येक header का 16 values, प्रत्येक value का
4096 UTF-8 bytes, र captured header names तथा values का जम्मा 16384 UTF-8 bytes
समेट्न सक्छ। आकार नाघेका/अमान्य headers लाई पूरै हटाइन्छ, काटिँदैन। Selection operator को
privacy decision हो: सुरक्षित देखिने नामहरूमा पनि व्यक्तिगत data हुन सक्छ, र यी सीमाहरू/
detectors सामान्य PII scrubber होइनन्।

### Delivery limits

Requests बढीमा 500 spans र 4 MiB UTF-8 JSON मा सीमित हुन्छन्, envelope सहित।
Cursor batch को पहिलो request अघि प्रत्येक allowed span को size जाँच गरिन्छ। सीमाभन्दा ठूलो
individual span ले त्यस batch को कुनै भाग पठाउँदैन र `maxBodyBytes` घटाउन निर्देशनसहित
fail हुन्छ; यसलाई चुपचाप drop गरिँदैन। Preflight ले record references र byte counts मात्र
राख्छ, प्रत्येक temporary span/JSON हटाउँछ; batch को दोस्रो serialized copy memory मा नराखी
bounded chunks का लागि spans पुनर्निर्माण गरिन्छ। HTTP 408/429/5xx, network failures र timeouts मा
बढीमा तीन attempts हुन्छन्, 250/500 ms exponential backoff सहित। `Retry-After` seconds वा HTTP dates
ले delay लाई 5 seconds सम्म बढाउन सक्छन्। अन्य statuses तुरुन्त fail हुन्छन्। OTLP 2xx partial
rejection ले पनि throw गर्छ, हराएको span लाई acknowledge गर्नुको सट्टा; empty वा valid JSON
acknowledgements स्वीकार गरिन्छन्, response-read cap 64 KiB सहित।

Errors मा exporter-owned facts मात्र हुन्छन्: HTTP status, retry class, attempts र sent span
counts, वा fixed acknowledgement/network failure wording। Collector response bodies,
partial-success counts र response headers errors, logs वा dashboard मा कहिल्यै copy गरिँदैनन्।
Failed वा partially accepted batch acknowledge गरिँदैन: destination ले त्यस status सहित
Failing देखाउँछ, cursor अन्तिम acknowledged batch मा रहन्छ, र अर्को run ले उही rows पुनः पठाउँछ।
Permanent statuses ले collector वा configuration ठीक नगरिएसम्म failing नै राख्छन्। Response
details का लागि collector का आफ्नै logs प्रयोग गर्नुहोस्। Call-log error summaries ले तिनको
छुट्टै redaction कायम राख्छ।
`prepare()` ले केही provision गर्दैन; Test ले ठ्याक्कै `{"resourceSpans":[]}` post गर्छ र
call-log spans लेखिन नदिई HTTP status report गर्छ।

Trace ids र span ids क्रमशः
`"omniroute.trace\\0" + callLogId` र `"omniroute.span\\0" + callLogId` माथि गरिएको SHA-256 का
पहिला 32/16 hex digits हुन्। Re-sends मा उही ids हुन्छन्। यो deduplication guarantee होइन:
Langfuse v4 ingestion लगायत केही backends ले समान-id spans लाई deduplicate गर्दैनन्। Crash वा
partial chunk failure ले बढीमा acknowledge नभएको एउटा cursor batch पुनः पठाउन सक्छ; त्यो
सम्पूर्ण batch duplicate हुन सक्छ, यसको अन्तिम HTTP chunk मात्र होइन। यो tradeoff ध्यानमा राखी
cursor batch size चयन गर्नुहोस्।

### Langfuse example

Self-hosted Langfuse instance का लागि यी fields configure गर्नुहोस्:

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

Authorization value स्थानीय रूपमा literal `public-key:secret-key`
string को Base64 बनाएर तयार गर्नुहोस् (उदाहरणका लागि
`Buffer.from(publicKey + ":" + secretKey).toString("base64")` प्रयोग गरेर)।
वास्तविक credentials logs, screenshots वा issues मा paste नगर्नुहोस्। Mapping ले स्वचालित रूपमा
`x-langfuse-ingestion-version: 4` सेट गर्छ; Authorization भने अझै `headers` मा supply गर्नुपर्छ।
Headers र generated identity salt दुवैले विद्यमान encrypted secret-field mechanism र API
placeholders प्रयोग गर्छन्; `STORAGE_ENCRYPTION_KEY` आवश्यक छ।

म्यापिङले generation type/model, JSON usage विवरणहरू (input/output/total र उपलब्ध
cache keys), JSON input/output snapshots, ERROR/DEFAULT level, sanitized status message,
trace name, session id, provider, requested model, path, combo, cache
source र status का लागि वैकल्पिक environment र filterable
`langfuse.observation.metadata.<key>` थप्छ। `langfuse.observation.completion_start_time` मा
सुरुवातको समय + TTFT लाई ISO 8601 ढाँचामा राखिन्छ, तर TTFT ज्ञात भएको र अवधि भित्र परेको
अवस्थामा मात्र। कुनै cost attributes पठाइँदैन।

Identity modes `langfuse.user.id` मा लागू हुन्छन्:

- `pseudonymous` (default): API key को internal id लाई random
  प्रति-destination 32-byte salt प्रयोग गरी HMAC-SHA256 गरिन्छ। Salt सिर्जना गर्दा
  अनुपस्थित भए उत्पन्न गरिन्छ, `identitySalt` का रूपमा encrypted गरिन्छ, कहिल्यै
  फिर्ता गरिँदैन, र सम्पादनका क्रममा कायम रहन्छ। Raw key ids लाई span attributes मा
  कहिल्यै राखिँदैन। Destination को salt पुनः सिर्जना वा rotate गर्दा identities परिवर्तन हुन्छन्।
- `keyName`: कन्फिगर गरिएको API key name, जसले operator label जानाजानी खुलासा गर्छ।
- `none`: कुनै user id हुँदैन। उपलब्ध हुँदा session tags अझै export गरिन्छन्; यी modes ले
  arbitrary prompt content वा operator-supplied session/correlation labels लाई anonymize गर्दैनन्।

### Backfill बिना सुरु गर्ने

सिर्जना गर्दा मात्र **हालको position बाट सुरु गर्नुहोस् (अवस्थित logs छोड्नुहोस्)** enable गर्नुहोस् वा
create API payload को top level मा `startFromCurrentPosition: true` पास गर्नुहोस्। यसले
कुनै migration बिना विद्यमान cursor helpers प्रयोग गरेर
`cursor_row_id` लाई हाल कायम रहेको call-log rowid को अधिकतम मानमा initialize गर्छ। Default false
हो (cursor 0 र retained-history backfill)। यो update-time cursor reset setting होइन।

साझा `ttftMs` addition ले BigQuery mapper र new-table schema मा nullable `ttft_ms` column पनि थप्छ:
यसको schema test मा प्रत्येक canonical record field का लागि column हुनैपर्ने हुन्छ। Existing tables ले
अपरिवर्तित रूपमा export गर्न जारी राख्छन्: `prepare()` ले table schema पढ्छ र त्यो column
अनुपस्थित हुँदा मात्र `ttft_ms` हटाउँछ। अर्को run मा TTFT प्राप्त गर्न nullable INT64 column थप्नुहोस्,
वा नयाँ table प्रयोग गर्नुहोस्। Optional TTFT column ले schema update trigger गर्दैन। Usage-evidence columns
तलको conditional, opt-in compatibility flow पालना गर्छन्; अन्य row fields ले strict
schema checking कायम राख्छन्।

---

## 6. गन्तव्य थप्ने

1. `LogExportDestinationType` निर्यात गर्ने `src/lib/logExport/destinations/<name>.ts` सिर्जना गर्नुहोस्:
   एउटा Zod `configSchema`, UI का लागि `fields` विवरणक एरे, `secretFields`, र
   `test()` / `prepare()` / `send(records)` फर्काउने `createClient(config)`।
2. यसलाई `src/lib/logExport/registry.ts` को `DESTINATIONS` एरेमा थप्नुहोस्।
3. `tests/unit/` अन्तर्गत परीक्षणहरू लेख्नुहोस्।

सम्पूर्ण परिवर्तन यति नै हो: स्थायी भण्डारण, cron कार्य, REST तह, गोप्य जानकारीको इन्क्रिप्सन र
ड्यासबोर्ड फाराम सबैले रजिस्ट्रीबाट पढ्छन्।

नयाँ गन्तव्यका लागि दुई नियम:

- आंशिक विफलता भएमा `send()` ले **अनिवार्य रूपमा अपवाद फ्याँक्नुपर्छ**। सफलतापूर्वक पूरा हुनुको अर्थ "गन्तव्यमा यी पङ्क्तिहरू छन्" भन्ने हो,
  र कर्सर तिनलाई स्थायी रूपमा पार गरेर अगाडि बढ्छ।
- प्रयोगकर्ताले दिएको URL लिने गन्तव्यले डेटा ल्याउनुअघि त्यसलाई
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) मार्फत प्रमाणीकरण गर्नुपर्छ,
  जसरी वेबहुकहरूले गर्छन्। BigQuery लाई यो आवश्यक पर्दैन: यसका होस्टहरू स्थिर छन्।

---

## ७. सञ्चालन

- **ड्यासबोर्ड**: Integrations → Log export। गन्तव्य थप्नुहोस्, प्रमाणहरू जाँच गर्न **Test** चलाउनुहोस्
  पङ्क्तिहरू नलेखी, त्यसपछि यसलाई सक्षम गर्नुहोस्।
- **ब्याकलग**: प्रत्येक गन्तव्य कार्डले बाँकी पङ्क्तिहरू र कर्सर देखाउँछ; `GET
/api/log-export/status` ले अन्तिम २० कार्य सञ्चालनसहित उही तथ्याङ्कहरू फर्काउँछ।
- **एउटा असफल गन्तव्यले अरूलाई असफल बनाउँदैन** — सञ्चालनको सारांशले प्रत्येक गन्तव्यको
  स्थिति `last_status` / `last_error` मा रेकर्ड गर्छ, र कार्य सञ्चालन इतिहासले समग्र स्थिति
  राख्छ।
- **गन्तव्य मेटाउँदा त्यसको कर्सर मेटिन्छ।** त्यसलाई पुनः थप्दा सबैभन्दा पुरानो सुरक्षित
  कल लगबाट सुरु हुन्छ, जसले गन्तव्यमा पहिले नै रहेका पङ्क्तिहरू पुनः पठाउन सक्छ। BigQuery मा
  प्रति-पङ्क्तिको `insertId` ले BigQuery को आफ्नै डि-डुप्लिकेसन अवधिभित्र मात्र यसलाई सम्हाल्छ,
  त्यसैले गन्तव्य मेटाउनुभन्दा असक्षम गर्नु उपयुक्त हुन्छ।

### प्रयोग-प्रमाण स्किमा अनुकूलता

नयाँ BigQuery तालिकाहरूमा nullable `usage_evidence` (JSON समावेश गर्ने STRING) र
`usage_estimated` (BOOL) समावेश हुन्छन्। `autoCreate` सक्षम हुँदा, विद्यमान तालिकाले यी
नभएका nullable स्तम्भहरू मात्र प्राप्त गर्न सक्छ। एक्सपोर्टरले field metadata सहितको
सम्पूर्ण विद्यमान स्किमा सुरक्षित राख्छ र फर्काइएको etag प्रयोग गरी ससर्त PATCH पठाउँछ।
समकालीन स्किमा परिवर्तनले त्यसलाई अधिलेखन गर्नुको सट्टा एक्सपोर्ट असफल बनाउँछ; अर्को
सञ्चालनले तालिका पुनः पढ्छ।

`autoCreate` असक्षम हुँदा, प्रयोग-प्रमाणसहितका रेकर्डहरू एक्सपोर्ट गर्नुअघि यी स्तम्भहरू
आफैं थप्नुहोस्। स्किमा/etag मेटाडाटा हराइरहेको वा अद्यावधिक असफल भएको अवस्थामा पनि
प्रमाणसहितका insert हरू रोकिन्छन्। यस्तो असफलतामा एक्सपोर्ट कर्सर अगाडि बढ्दैन र प्रमाण
कहिल्यै चुपचाप हटाइँदैन। एक्सपोर्ट अवरुद्ध रहँदा स्थानीय लग अवधारण लागू भइरहन्छ, त्यसैले
स्रोतका सुरक्षित पङ्क्तिहरूको म्याद समाप्त हुनुअघि असफलता समाधान गर्नुहोस्।
