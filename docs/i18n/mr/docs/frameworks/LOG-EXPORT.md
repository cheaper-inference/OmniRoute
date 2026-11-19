# Log export (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute कॉल लॉगचे बाह्य विश्लेषणात्मक डेटा स्टोअरमध्ये सातत्यपूर्ण, वाढीव निर्यात.

लॉग डॅशबोर्डचा टॅब विनंत्यांचा इतिहास SQLite (`call_logs`) मध्ये ठेवतो, ज्याला
रोटेशन आणि धारणा कालावधीच्या मर्यादा लागू होतात. लॉग निर्यात हाच रेकॉर्ड संच नियोजित वेळापत्रकानुसार बाहेर पाठवते, जेणेकरून तो
स्थानिक डेटाबेसपेक्षा अधिक काळ टिकू शकेल आणि इतर डेटासोबत जोडता येईल. BigQuery हे पहिले गंतव्य आहे;
पाइपलाइन ही एक रजिस्ट्री असल्यामुळे, अधिक गंतव्ये विद्यमान व्यवस्थेत भर म्हणून जोडता येतात.

---

## 1. हे कसे कार्य करते

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **वेळापत्रक** — एक `JobRegistry` cron जॉब, `log_export`, ज्याचे डीफॉल्ट मूल्य `0 * * * *` आहे (दर तासाला,
  UTC). याची नोंदणी `src/lib/initCloudSync.ts` मध्ये होते; `OMNIROUTE_LOG_EXPORT_CRON` वापरून ते बदलता येते.
  प्रत्येक नियोजित आवर्तनात सर्व **सक्षम** गंतव्यांचा प्रलंबित डेटा क्रमाने निर्यात केला जातो.
- **कर्सर** — SQLite चा अप्रत्यक्ष `call_logs.rowid`, जो प्रत्येक गंतव्यासाठी
  `log_export_destinations.cursor_row_id` मध्ये जतन केला जातो. `timestamp` जाणीवपूर्वक कर्सर म्हणून वापरलेला नाही: कॉल करणारे
  स्वतःचे मूल्य देऊ शकतात, त्यामुळे एखादी संथ विनंती तिच्यानंतर सुरू झालेल्या जलद विनंतीनंतर लिहिली जाऊ शकते,
  आणि टाइमस्टॅम्प कर्सर वापरल्यास ती वगळली जाईल.
- **बॅचिंग** — प्रत्येक विनंतीत `batch_size` ओळी (डीफॉल्ट 500), प्रत्येक रनमध्ये `max_rows_per_run` ओळी
  (डीफॉल्ट 10000), जेणेकरून मोठा अनुशेष एकाच आवर्तनाला अडवण्याऐवजी अनेक आवर्तनांत निर्यात होईल.
- **वितरण** — `send()` यशस्वीरीत्या पूर्ण झाल्यानंतरच कर्सर पुढे जातो. एखादी बॅच अयशस्वी झाल्यास
  कर्सर आधीच्याच जागी राहतो, त्यामुळे पुढील रनमध्ये त्याच ओळी पुन्हा पाठवण्याचा प्रयत्न होतो. यामध्ये
  किमान एकदा वितरण आणि गंतव्याकडील डुप्लिकेट निर्मूलन यांची हमी आहे, खऱ्या अर्थाने नेमके एकदाच वितरणाची नाही: BigQuery प्रत्येक
  ओळीसाठी कॉल-लॉग आयडी कळ म्हणून वापरतो आणि स्वतःच्या डुप्लिकेट निर्मूलन कालावधीत शक्य तितक्या प्रयत्नाने त्याचा मान राखतो.
- **एकाचवेळी चालण्यापासून संरक्षण** — cron आवर्तन आणि `POST .../run` एकाचवेळी सुरू होऊ शकतात. एखाद्या गंतव्याचा
  डेटा आधीच निर्यात होत असल्यास, त्याची पुन्हा निर्यात करण्याऐवजी ते वगळले जाते (रनच्या निकालात `skipped: true`),
  त्यामुळे समांतर रन बॅच पुन्हा पाठवू शकत नाही किंवा कर्सर मागे नेऊ शकत नाही.
- **संपूर्ण डेटा साफ केल्यानंतर पुनर्प्राप्ती** — `cursor_row_id` चे मूल्य `MAX(rowid)` पेक्षा जास्त झाल्यास (संपूर्ण टेबल
  साफ केले गेले आणि rowid पुन्हा सुरुवातीपासून सुरू झाले), रनर कायमचा नवीन डेटा पाहू न शकण्याऐवजी कर्सर 0 वर परत नेतो.

### विलग रनर आणि मर्यादा

Node वरील प्रत्येक गंतव्याचा रन स्वतंत्र, अल्पकाळ चालणारी OS चाइल्ड प्रक्रिया सुरू करतो (IPC सह `child_process`,
`worker_threads` नव्हे). बॉडी वाचन, पेलोड JSON पार्सिंग/सीरियलायझेशन, गंतव्याचे
`prepare()` आणि गंतव्याचे नेटवर्क I/O हे सर्व तिथे चालते, सर्व्हरच्या इव्हेंट लूपवर नाही.
फक्त कॉन्फिगरेशन आणि लहान प्रगती संदेश IPC मधून जातात; निर्यात केलेले रेकॉर्ड कधीही
सर्व्हरवर परत येत नाहीत. cron जॉब आणि आता चालवा रूट यांचा सार्वजनिक निकाल आणि एकाचवेळी चालण्यापासूनचे संरक्षण पूर्वीप्रमाणेच राहते.

चाइल्ड प्रक्रिया `node:sqlite` वापरून सर्व्हरचा निर्धारित `DATA_DIR/storage.sqlite` केवळ-वाचन मोडमध्ये उघडते,
आणि `busy_timeout=5000` व `query_only=ON` वापरते. ती कोणताही DB सिंगलटन आयात करत नाही आणि
मायग्रेशन, बॅकअप किंवा SQLite अपडेट करत नाही. गहाळ/दूषित आर्टिफॅक्टचे व्यवस्थापन (दूषित आर्टिफॅक्टच्या
UPDATE सह) फक्त डॅशबोर्डच्या तपशील मार्गातच राहते. दोन्ही मार्ग एकच शुद्ध
तपशील रिझॉल्वर वापरतात; निर्यात असिंक्रोनस फाइलसिस्टम वाचन आणि तोच आर्टिफॅक्ट → जुने
इनलाइन → जुने डिस्क → काहीही नाही असा शोधक्रम वापरते. चाइल्ड प्रक्रिया आपला रीडर उघडते तेव्हा रन कमाल समावेश rowid चा स्नॅपशॉट घेतो;
त्यानंतर समाविष्ट केलेल्या नोंदी पुढील रनपर्यंत थांबतात. ही समावेशाची
सीमा आहे, दीर्घकाळ चालणारा SQLite व्यवहार नाही: नेटवर्क प्रतिसादाची वाट पाहताना WAL रायटर्स आणि चेकपॉइंट्स मोकळे राहतात.
विद्यमान ओळींमधील अपडेट/हटवणे या सीमेमुळे गोठवले जात नाही.

प्रत्येक बॅच स्वीकारल्यानंतर, चाइल्ड प्रक्रिया पोचपावतीची वाट पाहते. सर्व्हर प्रथम
`advanceLogExportCursor` वापरून कर्सर जतन करतो, त्यानंतर `ack` पाठवतो; त्यापूर्वी पुढील बॅच सुरू होत नाही.
पाठवण्यातील अपयश, क्रॅश किंवा टाइमआउट आल्यास, त्या बॅचचा कर्सर पुढे न नेता अपयश नोंदवले जाते. आधी
पोचपावती मिळालेल्या बॅचेस कायम राहतात; जास्तीत जास्त पोचपावती न मिळालेली एकच बॅच पुन्हा पाठवली जाऊ शकते.
`done` मिळाल्यानंतर आणि चाइल्ड प्रक्रिया व्यवस्थित बंद झाल्यानंतरच यश नोंदवले जाते. अपयश आल्यास चाइल्ड प्रक्रिया
SIGTERM ने बंद केली जाते, 500 ms नंतर आवश्यक असल्यास SIGKILL वापरले जाते, आणि रनर प्रक्रिया पूर्णपणे बंद होईपर्यंत थांबतो.

| पर्यावरण चल                                   | डीफॉल्ट | उद्देश                                           |
| --------------------------------------------- | ------- | ------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | प्रत्येक गंतव्यासाठी प्रत्यक्ष कालावधीची मर्यादा |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | चाइल्ड प्रक्रियेची V8 old-space मर्यादा MB मध्ये |

अवैध/धन नसलेली/पूर्णांक नसलेली मूल्ये दिल्यास डीफॉल्ट मूल्ये वापरली जातात. हीप सेटिंग म्हणजे एकूण
RSS मर्यादा नाही; खूप मोठ्या बॅचमुळे चाइल्ड प्रक्रियेची मेमरी तरीही संपुष्टात येऊ शकते आणि रन सुरक्षितपणे अयशस्वी होऊ शकतो.
1024 MB चे डीफॉल्ट मूल्य, बॉडी सक्षम असताना 512 KiB आर्टिफॅक्टच्या डीफॉल्ट 500-ओळींच्या बॅचसाठी,
BigQuery च्या बाइट-खंडित JSON सीरियलायझेशनसह, अतिरिक्त जागा उपलब्ध ठेवते. यामुळे
10000-ओळींची बॉडी असलेली बॅच सुरक्षित होत नाही. V8 हीप संपुष्टात आल्यास उपाय करता येईल असे अपयश नोंदवले जाते: बॅचचा
आकार कमी करा किंवा `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` वाढवा; कर्सर शेवटच्या
पोचपावती मिळालेल्या बॅचवरच राहतो. जुन्या इनलाइन/डिस्क बॉडींना आधुनिक आर्टिफॅक्ट मर्यादा लागू होत नाही.
ऑपरेटरनी RSS साठी स्वतंत्रपणे मेमरीचे नियोजन केले पाहिजे, विशेषतः मर्यादित मेमरी असलेल्या कंटेनरमध्ये.

चाइल्ड प्रक्रियेला केवळ निराकरण केलेले `DATA_DIR`, `NODE_ENV`, स्पष्टपणे दिलेले `TZ` (जुन्या फाइलनावांसाठी
स्थानिक वेळेचे निराकरण), उपस्थित असल्यास `ELECTRON_RUN_AS_NODE`, आणि पुढील आउटबाउंड इनपुट वारशाने मिळतात:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (आणि त्यांची लघुअक्षरी रूपे),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
जागतिक Undici डिस्पॅचर सर्व्हरचे केवळ पर्यावरणावर आधारित प्रॉक्सी निराकरण आणि स्थानिक होस्ट
वगळण्याचे नियम सामायिक करतो, ज्यात `NO_PROXY` समाविष्ट आहे; तो `proxyFetch.ts` किंवा त्याचे DB/वैशिष्ट्य फ्लॅग आयात करत नाही.
पुढे पाठवलेल्या आउटपुटमधून आणि नोंदवलेल्या त्रुटींमधून प्रॉक्सीची प्रमाणीकरण माहिती लपवली जाते. गंतव्यस्थानाची प्रमाणीकरण माहिती
केवळ एका प्रारंभिक IPC संदेशातून पाठवली जाते, argv किंवा पर्यावरणातून कधीही नाही; आउटपुट/त्रुटी पुढे पाठवताना
उपसर्ग जोडला जातो आणि संवेदनशील माहिती काढून टाकली जाते. प्रत्येक cron रनमध्ये Node च्या SQLite चेतावणीची पुनरावृत्ती टाळण्यासाठी
चाइल्ड exec आर्ग्युमेंटमध्ये केवळ `ExperimentalWarning` अक्षम केले जाते; इतर प्रकारच्या चेतावण्या दिसत राहतात.

गंतव्यस्थान मॉड्यूल Next.js/server-only अवलंबित्वांशिवाय आयात करता येणे आवश्यक आहे. विद्यमान
BigQuery अंमलबजावणी आधीच ही अट पूर्ण करते. ॲक्सेस-टोकन कॅश केवळ चाइल्ड
रनपुरते टिकतात, अनेक रनमध्ये टिकत नाहीत. Node हा समर्थित रनटाइम आहे (`package.json` engines), परंतु README मधील Bun
स्थापना विभाग आणि `Dockerfile.bun` हेही
`bun:sqlite` (`src/lib/db/core.ts` / अडॅप्टर) वापरून उत्पादनासाठी सुसंगततेचा मार्ग दर्शवतात. त्यामुळे Bun अंतर्गत, निर्यातींसाठी पूर्वीचा
प्रक्रियेतच चालणारा मार्ग कायम ठेवला जातो आणि एकदाच चेतावणी दिली जाते: चाइल्ड हीप/टाइमआउट विलगीकरण उपलब्ध नाही. इव्हेंट-लूप आणि OOM विलगीकरणासाठी
Node वापरा; येथे Bun ला केवळ विकासापुरते मानलेले नाही.

`includeBodies` सक्षम असताना, तासाभराच्या पेलोडचा अनुशेष साचू देण्याऐवजी
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` सारखी मिनिटांच्या पातळीवरील वारंवारता वापरण्यास प्राधान्य द्या.
बॅच आणि ओळींच्या मर्यादा तरीही प्रत्येक रनला मर्यादित ठेवतात. प्रत्येक रनमध्ये प्रत्येक गंतव्यस्थानासाठी प्रक्रिया सुरू करण्याचा खर्च येतो;
एकूण CPU वापर कमी करण्याऐवजी, सर्व्हरच्या इव्हेंट-लूप विलगीकरणासाठी हा छोटासा प्रारंभिक खर्च स्वीकारला जातो.

### पेलोड (प्रॉम्प्ट आणि पूर्णत्वे)

डीफॉल्टनुसार, निर्यातीत केवळ लॉगच्या **यादीत** दिसणारी सारांश फील्ड असतात.
**प्रॉम्प्ट आणि प्रतिसाद निर्यात करा** (`includeBodies`) सुरू केल्यास, प्रत्येक कॉलसाठी लॉगच्या **तपशील**
पटलात दिसणारी पुढील माहितीही पाठवली जाते:

| फील्ड                            | त्यात काय असते                                                     |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | डॅशबोर्डवर जसे दाखवले जातात तसे कॉलचे पेलोड                        |
| `pipeline_route_decision`        | राउटरने निवडलेले लक्ष्य आणि मॉडेल                                  |
| `pipeline_client_request`        | क्लायंटने पाठवली तशीच मूळ विनंती                                   |
| `pipeline_openai_request`        | अंतर्गत OpenAI स्वरूपात रूपांतरित केल्यानंतरची विनंती              |
| `pipeline_provider_request`      | प्रदात्याच्या विशिष्ट स्वरूपात प्रत्यक्ष अपस्ट्रीम पाठवलेली विनंती |
| `pipeline_provider_response`     | मूळ अपस्ट्रीम प्रतिसाद                                             |
| `pipeline_client_response`       | कॉल करणाऱ्याला परत दिलेली माहिती                                   |
| `pipeline_error`                 | अयशस्वी कॉलसाठी पाइपलाइन-स्तरीय त्रुटीचा तपशील                     |
| `bodies_truncated`               | वरील कोणतेही फील्ड `maxBodyBytes` मर्यादेपर्यंत पोहोचल्यास True    |

हा प्रॉम्प्टमधील मजकूर असल्यामुळे, हे **डीफॉल्टनुसार बंद** असते आणि जाणीवपूर्वक प्रत्येक गंतव्यस्थानासाठी स्वतंत्र निवड असते.
डॅशबोर्डवर जे दिसते तेच पाठवले जाते, कारण निर्यात आणि `getCallLogById` तपशील
निराकरणाची समान पद्धत वापरतात: पेलोड
लिहितानाच त्यांमधून वैयक्तिक ओळख पटवणारी माहिती (PII) काढलेली आणि गुप्त माहिती लपवलेली असते, आणि
`noLog` API की वापरून केलेला कॉल कोणताही पेलोड साठवत नाही, त्यामुळे निर्यात करण्यासारखे काहीही नसते.

पेलोड प्रत्येक ओळीसाठी फाइलसिस्टम आर्टिफॅक्टमधून वाचले जातात, त्यामुळे ही माहिती भरण्याची प्रक्रिया केवळ
ती मागितलेल्या गंतव्यस्थानांसाठीच चालते. आर्टिफॅक्ट गहाळ किंवा खराब असल्यास, बॅच अयशस्वी करून कर्सर अडकवण्याऐवजी
त्याचा सारांश null पेलोडसह निर्यात केला जातो.

`maxBodyBytes` (डीफॉल्ट 262144) प्रत्येक फील्डच्या आकारावर मर्यादा घालते. मोठे पेलोड **वगळण्याऐवजी
कापले जातात** — कापलेला प्रॉम्प्टही "काय विचारले होते" याचे उत्तर देतो — आणि त्या ओळीला
`bodies_truncated` ने चिन्हांकित केले जाते. प्रवाहित केलेले तुकड्या-तुकड्यांतील बदल निर्यात केले जात नाहीत; एकत्रित प्रतिसाद
आधीच `pipeline_provider_response` आणि `pipeline_client_response` मध्ये असतो.

---

## 2. फाइल्स

| घटक                   | स्थान                                        |
| --------------------- | -------------------------------------------- |
| गंतव्य करार           | `src/lib/logExport/types.ts`                 |
| नोंदणी                | `src/lib/logExport/registry.ts`              |
| गुपितांची हाताळणी     | `src/lib/logExport/secrets.ts`               |
| रनर (पालक IPC)        | `src/lib/logExport/runner.ts`                |
| प्रक्रियेचे जीवनचक्र  | `src/lib/logExport/childRunner.ts`           |
| चाइल्ड प्रवेशबिंदू    | `src/lib/logExport/exportChild.ts`           |
| केवळ-वाचन उघडणारा घटक | `src/lib/db/logExportReadOnly.ts`            |
| सामायिक क्वेरी/मॅपिंग | `src/lib/usage/callLogExportQueries.ts`      |
| तपशील निराकरणकर्ता    | `src/lib/usage/callLogDetailResolver.ts`     |
| API प्रक्षेपण         | `src/lib/logExport/presenter.ts`             |
| BigQuery गंतव्य       | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA प्रमाणीकरण  | `src/lib/logExport/googleServiceAccount.ts`  |
| कॉल-लॉग स्रोत         | `src/lib/usage/callLogExportSource.ts`       |
| कायमस्वरूपी साठवण     | `src/lib/db/logExportDestinations.ts`        |
| Cron कार्य            | `src/lib/jobs/logExportJob.ts`               |
| REST स्तर             | `src/app/api/log-export/`                    |
| डॅशबोर्ड पृष्ठ        | `src/app/(dashboard)/dashboard/log-export/`  |

स्कीमा: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

सर्व मार्गांसाठी व्यवस्थापन प्रमाणीकरण केले जाते (`requireManagementAuth`). गुपिते कधीही परत केली जात नाहीत:
साठवलेले गुपित अक्षरशः `__stored__` या मूल्यासह परत येते आणि अद्यतन करताना तेच मूल्य परत पाठवल्यास
साठवलेले क्रेडेन्शियल कायम राहते.

ज्या गंतव्याच्या प्रकारात गुपित घोषित केलेले आहे, ते तयार किंवा अद्यतनित करण्यासाठी **`STORAGE_ENCRYPTION_KEY`
आवश्यक आहे**. त्याशिवाय `encrypt()` कोणताही बदल न करता डेटा पुढे पाठवते, त्यामुळे क्रेडेन्शियल SQLite मध्ये साध्या मजकुरात साठवण्याऐवजी
लेखन 400 प्रतिसादासह नाकारले जाते (Telegram webhook मध्येही हाच सुरक्षा प्रतिबंध
लागू केला जातो).

| पद्धत    | पथ                                       | उद्देश                                                                |
| -------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | गंतव्य प्रकार + त्यांच्या कॉन्फिगरेशन फील्डची यादी                    |
| `GET`    | `/api/log-export/destinations`           | गंतव्यांची यादी (गुपिते लपवलेली)                                      |
| `POST`   | `/api/log-export/destinations`           | गंतव्य तयार करणे                                                      |
| `GET`    | `/api/log-export/destinations/{id}`      | एक गंतव्य वाचणे                                                       |
| `PUT`    | `/api/log-export/destinations/{id}`      | नाव / सक्षम स्थिती / कॉन्फिगरेशन / बॅचिंग अद्यतनित करणे               |
| `DELETE` | `/api/log-export/destinations/{id}`      | हटवणे                                                                 |
| `POST`   | `/api/log-export/destinations/{id}/test` | क्रेडेन्शियल तपासणे, काहीही न लिहिणे                                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | प्रलंबित डेटा आत्ताच पाठवणे, नियोजित अंमलबजावणीप्रमाणेच मार्ग वापरून  |
| `GET`    | `/api/log-export/status`                 | Cron स्थिती, अलीकडील अंमलबजावण्या, प्रत्येक लक्ष्यासाठी प्रलंबित डेटा |

`GET /api/log-export/types` मुळे UI सर्वसाधारण स्वरूपाचा राहतो: परत मिळालेल्या
फील्ड वर्णनांवरून डॅशबोर्ड फॉर्म तयार केला जातो, त्यामुळे नवीन गंतव्यासाठी UI मध्ये बदल करण्याची गरज नसते.

---

## 4. BigQuery गंतव्य

कॉन्फिगरेशन की (`type: "bigquery"`):

| Key                  | Notes                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `projectId`          | डेटासेट असलेला GCP प्रोजेक्ट                                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                                            |
| `location`           | डेटासेट तयार करणे आवश्यक असतानाच वापरले जाते (डीफॉल्ट `EU`)                                |
| `serviceAccountJson` | सेवा-खाते की. गुप्त: स्थिर स्थितीत एन्क्रिप्ट केलेली, कधीही परत केली जात नाही              |
| `autoCreate`         | नसलेले डेटासेट/टेबल तयार करा; nullable usage-evidence स्तंभ सशर्तपणे जोडा (डीफॉल्ट `true`) |

सेवा खात्याला लक्ष्य टेबलवर `bigquery.tables.updateData` परवानगी आवश्यक आहे. `autoCreate`
सुरू असल्यास `bigquery.datasets.create` / `bigquery.tables.create` परवानग्याही आवश्यक आहेत.
अस्तित्वात असलेल्या टेबलमध्ये दोन nullable usage-evidence फील्ड जोडण्यासाठी
`bigquery.tables.update` देखील आवश्यक आहे. आवश्यक परवानगी नसल्यास export अयशस्वी होतो आणि
त्याचा कर्सर पुढे सरकत नाही.

कॉन्फिगर केलेला बॅच हा HTTP युनिट नसून **कर्सर युनिट** आहे: `send()` त्याचे जास्तीत जास्त
500 पंक्तींच्या insertAll कॉल्समध्ये भाग करते, त्यामुळे मोठे `batch_size` BigQuery ची 10 MB
विनंती मर्यादा ओलांडू शकत नाही. तात्पुरत्या स्थितींसाठी (408/429/500/502/503/504) समान
insertIds पुन्हा वापरून exponential backoff सह जास्तीत जास्त तीन वेळा पुन्हा प्रयत्न केले जातात;
प्रमाणीकरण आणि स्कीमा त्रुटी पहिल्याच प्रयत्नात अपवाद निर्माण करतात आणि रनचा वेळ वाया घालवत नाहीत.

काही क्षणांपूर्वी तयार केलेले टेबल streaming endpoint ला लगेच दिसत नाही आणि काही सेकंदांसाठी
404 उत्तर देतो. त्या 404 साठी पुन्हा प्रयत्न केला जातो, पण **फक्त या रनने टेबल तयार केले
असल्यास** — खरोखर नसलेले टेबल त्वरित अयशस्वी होते. लक्षात ठेवा, अलीकडे हटवलेल्या टेबलच्या
नावाखाली पुन्हा टेबल तयार केल्यास BigQuery काही मिनिटांसाठी streaming inserts नाकारतो; ही
delete-then-recreate ची वैशिष्ट्यपूर्ण बाब आहे, त्यामुळे एखादे टेबल हटवून पुन्हा जोडण्याऐवजी
नवीन टेबलचे नाव वापरणे अधिक योग्य आहे.

**आंशिक अपयश HTTP 200 आणि रिकाम्या नसलेल्या `insertErrors[]` सह येते.** हे अपयश म्हणून
हाताळले जाते आणि अपवाद निर्माण करते. त्यामुळे BigQuery ने स्वीकारलेल्या नसलेल्या पंक्तींपुढे
कर्सर पुढे जाणे थांबते; `tests/unit/log-export-bigquery.test.ts` हे वर्तन निश्चित करते.

ट्रान्सपोर्ट साधा REST आहे — स्व-स्वाक्षरी केलेले RS256 assertion
`https://oauth2.googleapis.com/token` येथे access token साठी बदलले जाते, त्यानंतर पंक्ती
`tabledata.insertAll` कडे पाठवल्या जातात. कोणतेही Google SDK समाविष्ट केले जात नाही.
Access tokens प्रक्रिया-स्तरावर प्रत्येक (सेवा खाते, scope) साठी कॅश केले जातात.

तयार केलेल्या टेबलमध्ये Logs-tab मधील प्रत्येक फील्डसाठी एक स्तंभ आणि `exported_at` असतो,
आणि प्रत्यक्षात call logs ज्या प्रकारे क्वेरी केल्या जातात त्यासाठी त्याची रचना केलेली असते:

- **`timestamp` वर दिवसानुसार partition केलेले**, त्यामुळे तारखेने मर्यादित केलेली क्वेरी
  फक्त त्या दिवसांचे स्कॅन करते.
- **`api_key_name`, `provider`, `model`, `status` नुसार (याच क्रमाने) clustered**, त्यामुळे
  ते कोणी चालवले, ते कुठे पाठवले गेले किंवा ते अयशस्वी झाले की नाही यानुसार केलेले फिल्टर
  प्रत्येक partition मधील ब्लॉक्स कमी करतात. BigQuery जास्तीत जास्त चार clustering स्तंभांना
  परवानगी देते आणि क्रम महत्त्वाचा असतो: केवळ `api_key_name` वरील फिल्टर pruning करतो,
  तर केवळ `status` वरील फिल्टर तसे करत नाही.
- `partitionExpirationDays` द्वारे **ऐच्छिक partition retention** (`0` सर्वकाही ठेवते),
  टेबल तयार केले जाते तेव्हा लागू केली जाते.

दोन्ही सेटिंग्ज निर्मितीच्या वेळी लागू होतात. अस्तित्वात असलेले टेबल आधीचीच रचना ठेवते, त्यामुळे
ती स्वीकारायची असल्यास गंतव्य नवीन table id कडे निर्देशित करा.

`tests/unit/log-export-bigquery.test.ts` mapper आणि टेबल स्कीमा यांचा समन्वय कायम असल्याचे
तपासते, त्यामुळे नवीन call-log स्तंभ बाहेर पाठवताना शांतपणे गाळला जाऊ शकत नाही.

बॅचेस **पंक्तींची संख्या आणि serialised bytes या दोन्हींनुसार** विभागले जातात. payloads export
केल्यानंतर केवळ पंक्तींची संख्या पुरेशी राहत नाही: prompts असलेल्या 500 पंक्तींचे आकारमान
दहा मेगाबाइट्सपर्यंत पोहोचू शकते आणि insertAll 10 MB पेक्षा मोठी विनंती नाकारते. जे आधी
येईल त्यानुसार, 500 पंक्तींवर किंवा 9 MB वर chunks बंद होतात.

---

## 5. OTLP/HTTP ट्रेसेस गंतव्य

कॉन्फिगरेशनमध्ये `type: "otlp-http"` वापरले जाते. हा जतन केलेल्या कॉल लॉग्सचा नियोजित,
कर्सर-आधारित एक्सपोर्ट आहे; `open-sse/services/routing/otel.ts` मधील सर्वोत्तम-प्रयत्न
लाइव्ह रूटिंग-इव्हेंट सिंक नाही. हे त्या सिंकचे पर्यावरणीय चल, टाइमर किंवा बफर्स वाचत
किंवा बदलत नाही. दोन्ही सक्षम केल्यास दोन स्वतंत्र प्रकारचे स्पॅन्स तयार होऊ शकतात;
हे कॉल-लॉग स्पॅन्स वेगळे ओळखण्यासाठी `omniroute.log-export` इन्स्ट्रुमेंटेशन स्कोप
वापरा.

| Key                      | Default / purpose                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `endpoint`               | आवश्यक पूर्ण HTTP(S) ट्रेसेस URL; शेवटी `/v1/traces` जोडले जात नाही                   |
| `headers`                | पर्यायी `Name: value` ओळी किंवा स्ट्रिंग्सचा JSON ऑब्जेक्ट; एन्क्रिप्टेड              |
| `requestHeaderAllowlist` | रिकामी (बंद); स्पॅन अॅट्रिब्यूट्स म्हणून कॅप्चर करण्यासाठी क्लायंट हेडरची नावे/उपसर्ग |
| `serviceName`            | `omniroute`; रिसोर्स `service.name`                                                   |
| `langfuseMapping`        | `false`; Langfuse generation/session/user अॅट्रिब्यूट्स जोडते                         |
| `identity`               | `pseudonymous`, `keyName`, किंवा `none`                                               |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                               |
| `timeoutMs`              | प्रत्येक HTTP प्रयत्नासाठी `30000`                                                    |
| `environment`            | सेट केलेले नाही; पर्यायी `langfuse.environment`                                       |

सामान्य डॅशबोर्ड ही फील्ड्स रेंडर करतो. `paths` API अॅरे किंवा अचूक पाथ
नवीन ओळी/स्वल्पविरामांनी वेगळे केलेल्या टेक्स्टएरियाच्या स्वरूपात स्वीकारते. Embeddings,
rerank आणि इतर पाथ्स स्पष्टपणे अनुमती दिल्याशिवाय वगळले जातात. वगळलेल्या ओळी तरीही
कर्सर पुढे नेतात; विद्यमान रनरचे `exported`/`exportedTotal` काउंटर स्वीकारलेल्या
स्पॅन्सऐवजी प्रक्रिया केलेल्या स्रोत ओळी मोजतात, ज्यामध्ये फिल्टर केलेल्या ओळींचाही
समावेश असतो. फिल्टरिंग चाइल्डमध्ये केले जाते आणि त्याचा IPC/कर्सर करार बदलला जात नाही.

URL प्रमाणीकरण `src/shared/network/outboundUrlGuard.ts` मधील DB-विरहित
`parseAndValidateNonMetadataUrl` हेल्पर वापरते: `block-metadata` धोरण. वेबहुक
व्हॅलिडेटरप्रमाणेच मेटाडेटा/प्रोटोकॉल/एम्बेडेड-क्रेडेन्शियल तपासण्या नेहमी केल्या जातात,
परंतु खाजगी URL साठी अनुमती देण्यात येते; तसेच जागतिक फीचर-फ्लॅग ओव्हरराइडशिवाय
localhost/LAN लक्ष्यांना जाणीवपूर्वक अनुमती दिली जाते. यामुळे खाजगी HTTP एंडपॉइंट्ससह
स्वतः-होस्ट केलेले Langfuse, Phoenix, Tempo आणि Collector एंडपॉइंट्स वापरता येतात.
क्लाउड-मेटाडेटा होस्ट्स नेहमी ब्लॉक केले जातात. रीडायरेक्ट्सचे अनुसरण केले जात नाही,
त्यामुळे कलेक्टर क्रेडेन्शियल्स वेगळ्या होस्टकडे रीडायरेक्ट करू शकत नाही. विद्यमान
लेक्सिकल URL गार्डप्रमाणेच, हा DNS रिझोल्यूशन पिन करत नाही; त्यामुळे ऑपरेटरच्या
नियंत्रणातील होस्ट्सच कॉन्फिगर करा. एंडपॉइंट विश्वसनीय नेटवर्कवर नसल्यास HTTPS ला
प्राधान्य द्या.

### पेलोड आणि वितरण

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) प्रत्येक
अनुमत ओळीसाठी एक CLIENT स्पॅन पाठवते; त्याचे नाव अचूक रिक्वेस्ट पाथवरून दिले जाते.
पाथचे नामकरण Chat Completions, Responses आणि Messages यांमध्ये फरक करते आणि स्पॅन
नावामध्ये मॉडेल किंवा ओळखविषयक डेटा एम्बेड करत नाही. रिसोर्स अॅट्रिब्यूट्समध्ये
`service.name` आणि पॅकेजचा `service.version` समाविष्ट असतो.

सामान्य चॅट प्रयत्न लॉगर (`open-sse/handlers/chatCore/attemptLogging.ts`) पूर्णतेच्या
वेळी `duration = Date.now() - startTime` लिहितो आणि टाइमस्टॅम्प देत नाही;
`src/lib/usage/callLogs.ts` मधील `saveCallLogOperation` टाइमस्टॅम्पला लेखनाच्या
(पूर्णतेच्या) वेळेवर डीफॉल्ट करते. त्यामुळे एक्सपोर्टमध्ये end = ओळीचा टाइमस्टॅम्प आणि
start = end − duration असे सेट केले जाते (मिलिसेकंदांचे दशांश नॅनोसेकंदांमध्ये रूपांतर
करून). कॉलरने दिलेले ऐतिहासिक टाइमस्टॅम्पदेखील end time म्हणून जतन केले जातात; प्रत्येक
ओळीसाठी start/completion वेगळे ओळखण्याची सुविधा नाही. Null duration चे मूल्य शून्य
होते. अवैध/गहाळ टाइमस्टॅम्पमुळे अनिश्चित स्पॅन्स तयार करण्याऐवजी बॅच अयशस्वी होते.
`ttftMs` nullable आहे आणि ते `omniroute.ttft_ms` शी मॅप केले जाते.

अॅट्रिब्यूट्समध्ये `gen_ai.operation.name="chat"`, provider, विनंती केलेले/प्रतिसादाचे
मॉडेल, इनपुट/आउटपुट टोकन्स, पर्यायी cache-read/cache-creation/reasoning टोकन्स,
HTTP स्थिती, combo, cache source, session tag आणि correlation id समाविष्ट असतात.
पूर्णांक OTLP मूल्ये आणि टाइमस्टॅम्प दशांश स्ट्रिंग्स असतात; स्ट्रिंग्स, बुलियन्स आणि
अपूर्णांक संख्या त्यांच्या मूळ OTLP value variants वापरतात. एरर स्पॅन्समध्ये ERROR
स्थिती आणि स्वच्छ केलेला status message असतो. कॅनॉनिकल रेकॉर्डमध्ये upstream host URL
नसल्यामुळे `server.address` वगळले जाते; त्यामुळे कलेक्टरला चुकीने मॉडेल सर्व्हर म्हणून
ओळखले जात नाही. Cost एक्सपोर्ट केली जात नाही.

केवळ `includeBodies=true` असल्यासच कंटेंट हायड्रेट केला जातो. `langfuseMapping=false`
असताना, `gen_ai.input.messages` / `gen_ai.output.messages` मध्ये OmniRoute ने जतन
केलेला स्वच्छ केलेला request/response body JSON असतो (पार्स करता आल्यास कॅनॉनिकलाइज्ड);
तो पुन्हा आकार दिलेला semconv messages array नसतो. कापलेले/JSON नसलेले body raw text
म्हणूनच राहतात. `langfuseMapping=true` असताना, bodies केवळ
`langfuse.observation.input` / `langfuse.observation.output` म्हणून उत्सर्जित केले
जातात; `gen_ai.*.messages` अॅट्रिब्यूट्स वगळले जातात, जेणेकरून प्रत्येक body एकदाच
पाठवला जाईल. दोन्ही मोड विद्यमान hydration path मधील `maxBodyBytes` वारशाने घेतात;
कापलेले कंटेंट दर्शवण्यासाठी `omniroute.bodies_truncated=true` वापरले जाते.
या गंतव्यामुळे कोणतेही अतिरिक्त pipeline snapshots किंवा स्वच्छ न केलेल्या artifact
reads जोडले जात नाहीत; पर्यायी request-header capture खाली वर्णन केलेल्या विद्यमान
hydrated client snapshot चा वापर करते. bodies एक्सपोर्ट करताना तासाभराचा backlog
साठवण्याऐवजी `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` सारखी मिनिट-स्तरीय वारंवारता
वापरा.

### पर्यायी क्लायंट रिक्वेस्ट हेडर्स

हेडर कॅप्चर **डीफॉल्टनुसार बंद** असते. गंतव्य कॉन्फिगरेशनमध्ये
`requestHeaderAllowlist` सेट करा आणि **Export prompts and responses** सक्षम करा
(गंतव्यावर `includeBodies: true`).

ही allowlist API array किंवा नवीन ओळी/स्वल्पविरामांनी विभक्त केलेली नावे असलेल्या
textarea च्या स्वरूपात स्वीकारली जाते:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

नावे केस-असंवेदनशील पद्धतीने आणि तंतोतंत जुळतात, जोपर्यंत एकच शेवटचा `*` नॉन-एम्प्टी
header-name prefix निवडत नाही. स्वतंत्र `*`, एम्बेडेड वाइल्डकार्ड आणि अमान्य HTTP header नावे
नाकारली जातात. जास्तीत जास्त 64 selectors असू शकतात; प्रत्येक selector चे नाव/prefix जास्तीत
जास्त 256 ASCII bytes चे असते. ही सेटिंग `headers` पेक्षा स्वतंत्र आहे; `headers` exporter ला
collector कडे authenticate करते.

Capture केवळ `pipeline_client_request` वाचते; ते जतन केलेल्या detailed pipeline मधील
`clientRawRequest` (किंवा legacy `clientRequest`) मधून भरले जाते. ते provider request headers कडे
कधीही fallback होत नाही. Request नोंदवला गेला तेव्हा detailed pipeline logging सक्षम असणे आवश्यक
होते. `includeBodies` अक्षम असल्यास, किंवा client-snapshot JSON अनुपस्थित, दूषित किंवा clipped
असल्यास, कोणतेही header attributes emit केले जात नाहीत. `maxBodyBytes` वाढवल्याने export-time
snapshot clipping टाळता येऊ शकते; परंतु कधीही जतन न केलेला तपशील पुनर्संचयित करता येत नाही.
1 MiB पेक्षा मोठा किंवा 256 पेक्षा अधिक header entries असलेला snapshot दुर्लक्षित केला जातो.
विद्यमान prompt/response export header capture सोबत सक्षमच राहतो; allowlist headers-only
hydration mode पुरवत नाही.

निवडलेली मूल्ये `http.request.header.<full lowercase header name>` OTLP string arrays म्हणून
रूपांतरित होतात, एकच string असला तरीही. उदाहरणार्थ, `X-OmniRoute-Meta-Team: example-team`
हे `http.request.header.x-omniroute-meta-team` बनते आणि
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` असे असते.
संपूर्ण prefix जतन केला जातो: ही सामान्य headers आहेत; त्यांचे business-field parsing किंवा
`omniroute.metadata.*` / Langfuse metadata conversion केले जात नाही. `langfuseMapping` header
semantics बदलत नाही. निवडलेला single-valued `User-Agent` standard scalar
`user_agent.original` देखील सेट करतो. एका value मधील स्वल्पविरामांवर split केले जात नाही.
Case variants जतन केलेल्या entry order मध्ये merge होतात; कोणताही अमान्य variant आढळल्यास
तो संपूर्ण header वगळला जातो. Attributes lowercase name नुसार क्रमबद्ध केले जातात.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headers, auth/token/secret/password/credential
markers असलेली नावे आणि internal gateway credentials नेहमी वगळली जातात, जरी ती निवडलेली
असोत किंवा storage मध्ये अंशतः masked असोत. ज्ञात credential patterns साठी shared credential
detector पुन्हा वापरला जातो; redaction markers वगळले जातात, safe values म्हणून export केले जात
नाहीत. फक्त strings आणि nonempty string arrays स्वीकारले जातात; numbers किंवा objects coerce
केले जात नाहीत. अमान्य नावे, prototype keys, control characters (horizontal tab वगळता) आणि
malformed Unicode दुर्लक्षित केले जातात; यामुळे batch fail होत नाही किंवा त्यांचा content errors
मध्ये reflect होत नाही.

प्रत्येक span मध्ये जास्तीत जास्त 32 headers, प्रत्येक header साठी 16 values, प्रत्येक value
साठी 4096 UTF-8 bytes आणि captured header names व values मिळून एकूण 16384 UTF-8 bytes असू
शकतात. आकाराने मोठे/अमान्य headers पूर्णपणे वगळले जातात, clipped केले जात नाहीत. Selection हा
operator privacy decision आहे: सुरक्षित दिसणाऱ्या नावांमध्येही personal data असू शकतो, आणि या
मर्यादा/detectors सामान्य PII scrubber नाहीत.

### Delivery limits

Requests 500 spans आणि envelope सहित 4 MiB UTF-8 JSON पर्यंत मर्यादित आहेत. Cursor batch च्या
पहिल्या request पूर्वी प्रत्येक allowed span चा size-check केला जातो. मर्यादेपेक्षा मोठा
individual span त्या batch चा कोणताही भाग पाठवत नाही आणि `maxBodyBytes` कमी करण्याचे guidance
देऊन fail होतो; तो शांतपणे drop केला जात नाही. Preflight मध्ये केवळ record references आणि
byte counts ठेवले जातात; प्रत्येक temporary span/JSON टाकून दिले जाते. Batch ची दुसरी
serialized copy memory मध्ये ठेवण्याऐवजी bounded chunks साठी spans पुन्हा बांधले जातात.
HTTP 408/429/5xx, network failures आणि timeouts साठी जास्तीत जास्त तीन attempts मिळतात आणि
250/500 ms exponential backoff वापरला जातो. `Retry-After` seconds किंवा HTTP dates मुळे delay
5 seconds पर्यंत वाढू शकतो. इतर statuses त्वरित fail होतात. OTLP 2xx partial rejection देखील
lost span acknowledge करण्याऐवजी throw करते; empty किंवा valid JSON acknowledgements स्वीकारले
जातात आणि response-read cap 64 KiB असतो.

Errors मध्ये केवळ exporter-owned facts असतात: HTTP status, retry class, attempts आणि sent span
counts, किंवा fixed acknowledgement/network failure wording. Collector response bodies,
partial-success counts आणि response headers errors, logs किंवा dashboard मध्ये कधीही copy केले
जात नाहीत. Failed किंवा partially accepted batch acknowledge केला जात नाही: destination त्या
statusसह Failing दाखवते, cursor शेवटच्या acknowledged batch वरच राहतो आणि पुढील run त्याच rows
पुन्हा पाठवतो. Permanent statuses collector किंवा configuration दुरुस्त होईपर्यंत failing
राहतात. Response details साठी collector चे स्वतःचे logs वापरा. Call-log error summaries मध्ये
त्यांची स्वतंत्र redaction कायम राहते.
`prepare()` काहीही provision करत नाही; Test नेमके `{"resourceSpans":[]}` post करते आणि
call-log spans लिहिल्याशिवाय HTTP status report करते.

Trace ids आणि span ids हे SHA-256 मधील अनुक्रमे पहिले 32/16 hex digits आहेत; SHA-256 साठी
`"omniroute.trace\\0" + callLogId` आणि `"omniroute.span\\0" + callLogId` वापरले जाते. Re-sends
मध्ये समान ids असतात. ही deduplication ची हमी नाही: Langfuse v4 ingestion सहित काही backends
समान-id spans deduplicate करत नाहीत. Crash किंवा partial chunk failure मुळे जास्तीत जास्त एक
unacknowledged cursor batch पुन्हा पाठवला जाऊ शकतो; केवळ शेवटचा HTTP chunk नव्हे, तर तो संपूर्ण
batch duplicate होऊ शकतो. हा tradeoff लक्षात घेऊन cursor batch size निवडा.

### Langfuse example

Self-hosted Langfuse instance साठी ही fields configure करा:

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

Authorization value स्थानिक पातळीवर literal `public-key:secret-key` string चे Base64 म्हणून
बांधा (उदाहरणार्थ `Buffer.from(publicKey + ":" + secretKey).toString("base64")` वापरून).
प्रत्यक्ष credentials logs, screenshots किंवा issues मध्ये paste करू नका. Mapping आपोआप
`x-langfuse-ingestion-version: 4` सेट करते; Authorization तरीही `headers` मध्ये पुरवले जाते.
Headers आणि generated identity salt दोन्ही विद्यमान encrypted secret-field mechanism आणि API
placeholders वापरतात; `STORAGE_ENCRYPTION_KEY` आवश्यक आहे.

मॅपिंगमध्ये जनरेशन प्रकार/मॉडेल, JSON वापराचे तपशील (इनपुट/आउटपुट/एकूण आणि उपलब्ध
कॅशे की), JSON इनपुट/आउटपुट स्नॅपशॉट्स, ERROR/DEFAULT स्तर, स्वच्छ केलेला
स्थिती संदेश, ट्रेस नाव, सेशन आयडी, तसेच प्रदाता, विनंती केलेले मॉडेल, पथ, कॉम्बो, कॅशे
स्रोत आणि स्थितीसाठी पर्यायी पर्यावरण व फिल्टर करता येणारे
`langfuse.observation.metadata.<key>` जोडले जातात. `langfuse.observation.completion_start_time` हे
ISO 8601 स्वरूपात असते; TTFT माहीत असल्यास आणि तो कालावधीच्या आत असल्यासच
सुरुवातीच्या वेळेत TTFT जोडले जाते. कोणतीही खर्च-संबंधित attributes पाठवली जात नाहीत.

ओळख मोड `langfuse.user.id` वर लागू होतात:

- `pseudonymous` (डीफॉल्ट): API कीच्या अंतर्गत आयडीचा HMAC-SHA256, प्रत्येक गंतव्याकरिता यादृच्छिक
  32-बाइट salt वापरून. salt अनुपस्थित असल्यास निर्मितीच्या वेळी तयार केला जातो,
  `identitySalt` म्हणून एन्क्रिप्ट केला जातो, कधीही परत केला जात नाही आणि संपादनांदरम्यान
  जतन केला जातो. कच्चे की आयडी span attributes मध्ये कधीही ठेवले जात नाहीत. गंतव्याचा salt
  पुन्हा तयार करणे/फिरवणे यामुळे ओळखी बदलतात.
- `keyName`: कॉन्फिगर केलेले API की नाव; ऑपरेटरचा तो लेबल जाणूनबुजून उघड करते.
- `none`: कोणताही user id नाही. उपलब्ध असल्यास सेशन टॅग्स तरीही एक्सपोर्ट केले जातात; हे मोड
  अनियंत्रित प्रॉम्प्ट मजकूर किंवा ऑपरेटरने दिलेले सेशन/सहसंबंध लेबल अनामित करत नाहीत.

### बॅकफिलशिवाय सुरुवात करणे

फक्त निर्मितीच्या वेळी **सध्याच्या स्थानापासून सुरू करा (विद्यमान लॉग वगळा)** सक्षम करा किंवा
create API payload च्या शीर्ष स्तरावर
`startFromCurrentPosition: true` पास करा. हे विद्यमान cursor helpers वापरून, migration शिवाय,
`cursor_row_id` चे मूल्य सध्या राखून ठेवलेल्या call-log मधील कमाल rowid वर आरंभ करते.
डीफॉल्ट false आहे (cursor 0 आणि राखून ठेवलेल्या इतिहासाचा बॅकफिल).
ही अपडेटच्या वेळी cursor रीसेट करण्याची सेटिंग नाही.

सामायिक `ttftMs` जोडणीमुळे BigQuery mapper आणि नवीन-टेबल schema मध्ये nullable
`ttft_ms` column देखील जोडला जातो: त्याच्या schema चाचणीसाठी प्रत्येक canonical record field साठी
एक column असणे आवश्यक आहे. विद्यमान टेबल्समधून एक्सपोर्ट अपरिवर्तित राहतो:
`prepare()` टेबल schema वाचते आणि तो column अनुपस्थित असल्यास फक्त `ttft_ms` वगळते.
पुढील रनमध्ये TTFT मिळवण्यासाठी nullable INT64 column जोडा किंवा नवीन टेबल वापरा.
पर्यायी TTFT column मुळे schema update सुरू होत नाही. Usage-evidence columns खालील
सशर्त, निवडकपणे-सक्षम compatibility flow चे अनुसरण करतात; इतर row fields साठी strict
schema checking कायम राहते.

---

## 6. गंतव्यस्थान जोडणे

1. `LogExportDestinationType` एक्सपोर्ट करणारी `src/lib/logExport/destinations/<name>.ts` फाइल तयार करा:
   एक Zod `configSchema`, UI साठी `fields` वर्णनकर्ता अ‍ॅरे, `secretFields`, आणि
   `test()` / `prepare()` / `send(records)` परत करणारे `createClient(config)`.
2. ते `src/lib/logExport/registry.ts` मधील `DESTINATIONS` अ‍ॅरेमध्ये जोडा.
3. `tests/unit/` अंतर्गत चाचण्या लिहा.

एवढाच संपूर्ण बदल आहे: कायमस्वरूपी संचयन, cron जॉब, REST स्तर, गुपितांचे एन्क्रिप्शन आणि
डॅशबोर्ड फॉर्म हे सर्व रजिस्ट्री वाचतात.

नवीन गंतव्यस्थानासाठी दोन नियम:

- अंशतः अपयश आल्यास `send()` ने **अपवाद फेकलाच पाहिजे**. यशस्वीरीत्या पूर्ण होणे म्हणजे "गंतव्यस्थानाकडे या पंक्ती आहेत",
  आणि कर्सर कायमचा त्यांच्या पुढे सरकतो.
- वापरकर्त्याने दिलेला URL स्वीकारणाऱ्या गंतव्यस्थानाने फेच करण्यापूर्वी
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) द्वारे त्याची पडताळणी केली पाहिजे,
  जशी वेबहुक्स करतात. BigQuery ला याची गरज नाही: त्याचे होस्ट स्थिर आहेत.

---

## ७. ते चालवणे

- **डॅशबोर्ड**: एकत्रीकरणे → लॉग निर्यात. गंतव्यस्थान जोडा, क्रेडेन्शियल्स तपासण्यासाठी **चाचणी** चालवा
  (पंक्ती लिहिल्याशिवाय), त्यानंतर ते सक्षम करा.
- **अनुशेष**: प्रत्येक गंतव्यस्थान कार्डमध्ये प्रलंबित पंक्ती आणि कर्सर दिसतो; `GET
/api/log-export/status` समान आकडेवारी तसेच शेवटच्या २० जॉब रन परत करते.
- **अपयशी गंतव्यस्थानामुळे इतर गंतव्यस्थाने अपयशी होत नाहीत** — रन सारांशात प्रत्येक गंतव्यस्थानाची
  स्थिती `last_status` / `last_error` मध्ये नोंदवली जाते आणि जॉब रन इतिहास एकत्रित स्थिती ठेवतो.
- **गंतव्यस्थान हटवल्याने त्याचा कर्सर हटतो.** ते पुन्हा जोडल्यास सर्वांत जुना जतन केलेला
  कॉल लॉगपासून सुरुवात होते, त्यामुळे गंतव्यस्थानाकडे आधीपासून असलेल्या पंक्ती पुन्हा पाठवल्या जाऊ शकतात. BigQuery वर प्रत्येक पंक्तीचा
  `insertId` हे फक्त BigQuery च्या स्वतःच्या डुप्लिकेट-वगळण्याच्या कालावधीतच परिणाम शोषून घेतो, त्यामुळे
  गंतव्यस्थान हटवण्याऐवजी ते अक्षम करणे पसंत करा.

### वापर-पुरावा स्कीमा सुसंगतता

नवीन BigQuery सारण्यांमध्ये nullable `usage_evidence` (JSON असलेली STRING) आणि
`usage_estimated` (BOOL) समाविष्ट असतात. `autoCreate` सक्षम असल्यास, विद्यमान सारणीमध्ये
फक्त ही गहाळ nullable स्तंभ जोडले जाऊ शकतात. निर्यातकर्ता फील्ड मेटाडेटासह संपूर्ण विद्यमान
स्कीमा जतन करतो आणि परत मिळालेल्या etag चा वापर करून सशर्त PATCH सादर करतो. एकाच वेळी झालेला स्कीमा बदल
निर्यात अयशस्वी करतो, त्यावर अधिलिखित करत नाही; पुढील रनमध्ये सारणी पुन्हा वाचली जाते.

`autoCreate` अक्षम असल्यास, वापर-पुरावा असलेले रेकॉर्ड निर्यात करण्यापूर्वी हे स्तंभ स्वतः जोडा.
गहाळ स्कीमा/etag मेटाडेटा किंवा अयशस्वी अपडेटमुळे पुरावा असलेली इन्सर्ट्स देखील थांबतात. त्या अपयशावर
निर्यात कर्सर पुढे सरकत नाही आणि पुरावा कधीही शांतपणे टाकून दिला जात नाही. निर्यात अडवलेले असतानाही
स्थानिक लॉग जतन नियम लागू राहतात, त्यामुळे जतन केलेल्या स्रोत पंक्ती कालबाह्य होण्यापूर्वी अपयशाचे निराकरण करा.
