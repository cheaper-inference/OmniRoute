# Log export (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute کال لاگز کو مسلسل اور تدریجی طور پر ایک بیرونی اینالیٹکس اسٹور میں برآمد کرنا۔

Logs ڈیش بورڈ ٹیب درخواستوں کی تاریخ SQLite (`call_logs`) میں رکھتا ہے، جو
روٹیشن اور برقرار رکھنے کی پالیسی کے باعث محدود ہوتی ہے۔ لاگ ایکسپورٹ اسی ریکارڈ سیٹ کو ایک شیڈول کے مطابق باہر بھیجتا ہے تاکہ یہ
مقامی ڈیٹابیس سے زیادہ عرصے تک محفوظ رہ سکے اور اسے دوسرے ڈیٹا کے ساتھ جوڑا جا سکے۔ BigQuery پہلی منزل ہے؛
پائپ لائن ایک رجسٹری ہے، اس لیے مزید منزلیں اضافی طور پر شامل کی جا سکتی ہیں۔

---

## 1. یہ کیسے کام کرتا ہے

```
سرور (کنفیگریشن کو decrypt + validate کرنا، کرسر کو ہم آہنگ کرنا)
  → IPC شروع کریں → الگ تھلگ exportChild OS پراسیس
    → صرف پڑھنے کے لیے storage.sqlite → مشترکہ call-log query/mapping
      → غیر ہم وقت artifact hydration → منزل کا prepare()/send()
        → batch IPC → سرور کرسر محفوظ کرتا ہے → ack IPC
          → اگلا batch؛ done IPC → سرور کامیابی ریکارڈ کرتا ہے
```

- **شیڈول** — ایک `JobRegistry` cron جاب، `log_export`، جس کی طے شدہ قدر `0 * * * *` (ہر گھنٹے،
  UTC) ہے۔ یہ `src/lib/initCloudSync.ts` میں رجسٹرڈ ہے؛ اسے `OMNIROUTE_LOG_EXPORT_CRON` سے
  تبدیل کیا جا سکتا ہے۔ ہر tick تمام **فعال** منزلوں کو باری باری مکمل طور پر پراسیس کرتا ہے۔
- **کرسر** — SQLite کا ضمنی `call_logs.rowid`، جو ہر منزل کے لیے
  `log_export_destinations.cursor_row_id` میں محفوظ ہوتا ہے۔ جان بوجھ کر `timestamp` کو کرسر
  نہیں بنایا گیا: callers اپنی قدر فراہم کر سکتے ہیں، لہٰذا ایک سست درخواست اس تیز درخواست
  کے بعد لکھی جا سکتی ہے جو بعد میں شروع ہوئی تھی، اور timestamp کرسر اسے چھوڑ دے گا۔
- **بیچنگ** — ہر درخواست میں `batch_size` قطاریں (طے شدہ 500)، اور ہر run میں
  `max_rows_per_run` قطاریں (طے شدہ 10000)، تاکہ ایک بڑا backlog ایک ہی run کو روکنے کے بجائے
  کئی ticks میں مکمل ہو۔
- **ترسیل** — کرسر صرف `send()` کے resolve ہونے کے بعد آگے بڑھتا ہے۔ ناکام batch کرسر کو
  اسی جگہ چھوڑ دیتا ہے، لہٰذا اگلے run میں انہی قطاروں کی دوبارہ کوشش کی جاتی ہے۔ ضمانت
  at-least-once کے ساتھ منزل کی جانب de-duplication کی ہے، حقیقی exactly-once کی نہیں:
  BigQuery ہر قطار کی key call-log id سے بناتا ہے، جسے وہ اپنی dedup window کے اندر
  best-effort بنیاد پر ملحوظ رکھتا ہے۔
- **اوورلیپ سے تحفظ** — cron tick اور `POST .../run` ایک ساتھ شروع ہو سکتے ہیں۔ جو منزل
  پہلے ہی پراسیس ہو رہی ہو، اسے دو مرتبہ پراسیس کرنے کے بجائے چھوڑ دیا جاتا ہے (run کے نتیجے
  میں `skipped: true`)، لہٰذا ایک متوازی run نہ تو batch دوبارہ بھیج سکتا ہے اور نہ کرسر کو
  پیچھے لکھ سکتا ہے۔
- **Purge سے بازیابی** — اگر `cursor_row_id`، `MAX(rowid)` سے اوپر چلا جائے (پوری table
  purge کر دی گئی ہو اور rowids دوبارہ شروع ہوئے ہوں)، تو runner مستقل طور پر بے خبر رہنے
  کے بجائے واپس 0 پر آ جاتا ہے۔

### الگ تھلگ runner اور حدود

Node پر ہر منزل کا run ایک الگ، مختصر مدت کا OS child process (`child_process`
بذریعہ IPC، نہ کہ `worker_threads`) شروع کرتا ہے۔ Body reads، payload JSON
parsing/serialization، منزل کا `prepare()`، اور منزل کا network I/O سب اسی میں چلتے ہیں،
سرور کے event loop پر نہیں۔ IPC سے صرف کنفیگریشن اور چھوٹے progress messages گزرتے ہیں؛
export کیے گئے records کبھی سرور کو واپس نہیں آتے۔ cron جاب اور Run now route ایک ہی
عوامی نتیجہ اور overlap guard برقرار رکھتے ہیں۔

child، سرور کے resolve کردہ `DATA_DIR/storage.sqlite` کو `node:sqlite` کے ذریعے صرف پڑھنے
کے لیے کھولتا ہے، جس میں `busy_timeout=5000` اور `query_only=ON` ہوتے ہیں۔ یہ کوئی DB
singleton import نہیں کرتا اور نہ migrations، backups یا SQLite updates انجام دیتا ہے۔
غائب/خراب artifact کی bookkeeping (بشمول corrupt-artifact UPDATE) صرف dashboard detail
path میں رہتی ہے۔ دونوں paths ایک مشترکہ pure detail resolver استعمال کرتے ہیں؛ export
غیر ہم وقت filesystem reads اور یکساں artifact → legacy inline → legacy disk → none
resolution order استعمال کرتا ہے۔ جب child اپنا reader کھولتا ہے تو run زیادہ سے زیادہ
insertion rowid کا snapshot لیتا ہے؛ بعد میں ہونے والے inserts اگلے run کا انتظار کرتے ہیں۔
یہ insertion boundary ہے، طویل مدتی SQLite transaction نہیں: network کے انتظار کے دوران
WAL writers اور checkpoints آزاد رہتے ہیں۔ موجودہ قطاروں کی updates/deletions اس boundary
کے باعث منجمد نہیں ہوتیں۔

ہر قبول شدہ batch کے بعد child acknowledgement کا انتظار کرتا ہے۔ سرور پہلے
`advanceLogExportCursor` کے ذریعے کرسر محفوظ کرتا ہے، پھر `ack` بھیجتا ہے؛ اس سے پہلے کوئی
اگلا batch شروع نہیں ہوتا۔ send کی ناکامی، crash یا timeout اس batch کا کرسر آگے بڑھائے بغیر
ناکامی ریکارڈ کرتا ہے۔ پہلے acknowledge شدہ batches محفوظ رہتے ہیں؛ زیادہ سے زیادہ ایک
unacknowledged batch دوبارہ بھیجا جا سکتا ہے۔ کامیابی صرف `done` اور child کے صاف exit کے
بعد ریکارڈ کی جاتی ہے۔ ناکامیاں child کو SIGTERM کے ذریعے ختم کرتی ہیں، 500 ms بعد اسے
SIGKILL تک بڑھا دیتی ہیں، اور runner پراسیس کے مکمل بند ہونے کا انتظار کرتا ہے۔

| ماحولیاتی متغیر                               | طے شدہ قدر | مقصد                            |
| --------------------------------------------- | ---------- | ------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | فی منزل wall-clock حد           |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | MB میں child V8 old-space کی حد |

غلط/غیر مثبت/غیر صحیح عددی اقدار کی صورت میں طے شدہ اقدار استعمال ہوتی ہیں۔ heap کی ترتیب
مجموعی RSS حد نہیں ہے؛ بہت بڑے batches پھر بھی child کی memory ختم کر سکتے ہیں اور run
محفوظ طریقے سے ناکام ہو سکتا ہے۔ 1024 MB کی طے شدہ قدر، bodies فعال ہونے کے ساتھ 512 KiB
artifacts کے طے شدہ 500-row batch کے لیے گنجائش چھوڑتی ہے، جس میں BigQuery کی byte-chunked
JSON serialization بھی شامل ہے۔ یہ bodies والے 10000-row batch کو محفوظ نہیں بناتی۔
V8 heap exhaustion ایک قابلِ عمل ناکامی ریکارڈ کرتا ہے: batch size کم کریں یا
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` بڑھائیں؛ کرسر آخری acknowledged batch پر
برقرار رہتا ہے۔ تاریخی inline/disk bodies جدید artifact cap کے تحت نہیں آتیں۔ Operators
کو RSS کے لیے الگ گنجائش مختص کرنی چاہیے، خصوصاً محدود memory والے containers کے اندر۔

child صرف resolve کردہ `DATA_DIR`، `NODE_ENV`، واضح `TZ` (legacy filename کے مقامی وقت
کی resolution)، موجود ہونے کی صورت میں `ELECTRON_RUN_AS_NODE`، اور درج ذیل outbound inputs
وراثت میں لیتا ہے:
`HTTP_PROXY`، `HTTPS_PROXY`، `ALL_PROXY`، `NO_PROXY` (اور ان کی lowercase شکلیں)،
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`، `NODE_EXTRA_CA_CERTS`، `SSL_CERT_FILE`، `SSL_CERT_DIR`۔
ایک global Undici dispatcher سرور کی pure environment-proxy resolution اور local-host
bypass کے قواعد، بشمول `NO_PROXY`، مشترکہ طور پر استعمال کرتا ہے؛ یہ `proxyFetch.ts` یا
اس کے DB/feature flags کو import نہیں کرتا۔ Proxy credentials کو forward کیے گئے output
اور ریکارڈ شدہ errors سے redact کر دیا جاتا ہے۔ منزل کے credentials صرف ایک start IPC
message میں منتقل ہوتے ہیں، کبھی argv یا environment میں نہیں؛ output/error forwarding
کو prefix لگا کر sanitize کیا جاتا ہے۔ ہر cron run میں Node کی SQLite warning کو دہرانے
سے بچنے کے لیے child exec arguments میں صرف `ExperimentalWarning` غیر فعال ہے؛ warning
کی دیگر اقسام بدستور نظر آتی ہیں۔

منزل کے ماڈیولز Next.js/صرف-سرور انحصارات کے بغیر امپورٹ کیے جانے کے قابل ہونے چاہییں۔ موجودہ
BigQuery نفاذ پہلے ہی اس معاہدے پر پورا اترتا ہے۔ ایکسیس ٹوکن کیشز صرف چائلڈ
رن تک برقرار رہتے ہیں، مختلف رنز کے درمیان نہیں۔ Node معاونت یافتہ رن ٹائم ہے (`package.json` engines)، لیکن README کا Bun
انسٹالیشن سیکشن اور `Dockerfile.bun` بھی `bun:sqlite` (`src/lib/db/core.ts` / اڈاپٹرز) استعمال کرتے ہوئے
پروڈکشن مطابقت کا راستہ پیش کرتے ہیں۔ لہٰذا Bun کے تحت، ایکسپورٹس سابقہ
اِن-پروسیس راستہ برقرار رکھتے ہیں اور ایک مرتبہ انتباہ جاری کرتے ہیں: چائلڈ ہیپ/ٹائم آؤٹ آئسولیشن دستیاب نہیں ہے۔ ایونٹ لوپ
اور OOM آئسولیشن کے لیے Node استعمال کریں؛ یہاں Bun کو صرف ڈیولپمنٹ کے لیے مخصوص نہیں سمجھا جاتا۔

جب `includeBodies` فعال ہو تو فی گھنٹہ پے لوڈ کا بیک لاگ جمع کرنے کے بجائے منٹ کی سطح کا وقفہ ترجیح دیں، مثلاً
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`۔
بیچ اور قطار کی حدود اب بھی ہر رن کو محدود رکھتی ہیں۔ پروسیس اسٹارٹ اپ کی لاگت ہر منزل کے لیے، ہر رن میں ادا ہوتی ہے؛
یہ سرور ایونٹ لوپ آئسولیشن کے لیے معمولی اسٹارٹ اپ لاگت کا تبادلہ ہے، نہ کہ کل CPU استعمال میں کمی۔

### پے لوڈز (پرامپٹس اور تکمیلات)

بطور ڈیفالٹ، ایکسپورٹ صرف وہ خلاصہ فیلڈز لے جاتی ہے جو Logs کی **فہرست** دکھاتی ہے۔ **پرامپٹس اور جوابات ایکسپورٹ کریں**
(`includeBodies`) فعال کرنے سے مزید وہ معلومات بھی بھیجی جاتی ہیں جو Logs کا **تفصیل**
پین ہر کال کے لیے دکھاتا ہے:

| فیلڈ                             | اس میں کیا ہوتا ہے                                                     |
| -------------------------------- | ---------------------------------------------------------------------- |
| `request_body` / `response_body` | کال کے پے لوڈز، بالکل اسی طرح جیسے ڈیش بورڈ انہیں رینڈر کرتا ہے        |
| `pipeline_route_decision`        | راؤٹر نے کون سا ہدف اور ماڈل منتخب کیا                                 |
| `pipeline_client_request`        | خام درخواست، بالکل اسی طرح جیسے کلائنٹ نے بھیجی                        |
| `pipeline_openai_request`        | اندرونی OpenAI ساخت میں ترجمے کے بعد                                   |
| `pipeline_provider_request`      | جیسا حقیقتاً اپ اسٹریم بھیجا گیا، فراہم کنندہ کی بولی میں              |
| `pipeline_provider_response`     | خام اپ اسٹریم جواب                                                     |
| `pipeline_client_response`       | کال کرنے والے کو واپس دی گئی معلومات                                   |
| `pipeline_error`                 | ناکام کال کے لیے پائپ لائن کی سطح کی خرابی کی تفصیل                    |
| `bodies_truncated`               | جب اوپر دیے گئے کسی بھی فیلڈ نے `maxBodyBytes` کی حد چھو لی ہو تو درست |

یہ پرامپٹ کا مواد ہے، اس لیے یہ **بطور ڈیفالٹ غیر فعال** ہے اور دانستہ طور پر ہر منزل کے لیے الگ انتخاب ہے۔
وہی چیز بھیجی جاتی ہے جو ڈیش بورڈ دکھاتا ہے، کیونکہ ایکسپورٹ اور `getCallLogById` ایک ہی تفصیل
ریزولیوشن استعمال کرتے ہیں: پے لوڈز کو لکھے جاتے وقت ہی
PII سے صاف اور رازوں سے مخفی کر دیا جاتا ہے، اور `noLog` API کلید کے ساتھ کی گئی کال کوئی پے لوڈ محفوظ ہی نہیں کرتی،
اس لیے ایکسپورٹ کرنے کے لیے کچھ نہیں ہوتا۔

پے لوڈز فائل سسٹم آرٹیفیکٹ سے فی قطار پڑھے جاتے ہیں، اس لیے ہائیڈریشن صرف ان منزلوں کے لیے چلتی ہے
جنہوں نے اس کی درخواست کی ہو۔ غائب یا خراب آرٹیفیکٹ، بیچ کو ناکام کرنے اور کرسر کو پھنسانے کے بجائے،
اس کا خلاصہ null پے لوڈز کے ساتھ ایکسپورٹ کرتا ہے۔

`maxBodyBytes` (ڈیفالٹ 262144) ہر فیلڈ کی حد مقرر کرتا ہے۔ طویل پے لوڈز کو **حذف کرنے کے بجائے مختصر کیا جاتا ہے**
— کٹا ہوا پرامپٹ پھر بھی "کیا پوچھا گیا تھا" کا جواب دیتا ہے — اور قطار کو
`bodies_truncated` کے ساتھ نشان زد کیا جاتا ہے۔ ایک ایک کر کے اسٹریم کیے گئے چنکس کے ڈیلٹاز ایکسپورٹ نہیں کیے جاتے؛ مکمل طور پر جوڑا گیا جواب
پہلے ہی `pipeline_provider_response` اور `pipeline_client_response` میں موجود ہوتا ہے۔

---

## 2. فائلیں

| جزو                    | مقام                                         |
| ---------------------- | -------------------------------------------- |
| منزل کا کنٹریکٹ        | `src/lib/logExport/types.ts`                 |
| رجسٹری                 | `src/lib/logExport/registry.ts`              |
| رازوں کا انتظام        | `src/lib/logExport/secrets.ts`               |
| رنر (پیرنٹ IPC)        | `src/lib/logExport/runner.ts`                |
| پراسیس لائف سائیکل     | `src/lib/logExport/childRunner.ts`           |
| چائلڈ انٹری            | `src/lib/logExport/exportChild.ts`           |
| صرف پڑھنے کے لیے اوپنر | `src/lib/db/logExportReadOnly.ts`            |
| مشترکہ کوئری/میپنگ     | `src/lib/usage/callLogExportQueries.ts`      |
| تفصیلات ریزولوَر       | `src/lib/usage/callLogDetailResolver.ts`     |
| API پروجیکشن           | `src/lib/logExport/presenter.ts`             |
| BigQuery منزل          | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA تصدیق        | `src/lib/logExport/googleServiceAccount.ts`  |
| کال لاگ ماخذ           | `src/lib/usage/callLogExportSource.ts`       |
| مستقل ذخیرہ            | `src/lib/db/logExportDestinations.ts`        |
| Cron جاب               | `src/lib/jobs/logExportJob.ts`               |
| REST تہہ               | `src/app/api/log-export/`                    |
| ڈیش بورڈ صفحہ          | `src/app/(dashboard)/dashboard/log-export/`  |

اسکیما: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

تمام روٹس انتظامی توثیق (`requireManagementAuth`) کے تحت ہیں۔ راز کبھی واپس نہیں کیے جاتے:
ذخیرہ شدہ راز لفظ بہ لفظ `__stored__` کی صورت میں واپس آتا ہے، اور اپ ڈیٹ کرتے وقت یہی قدر واپس بھیجنے سے
ذخیرہ شدہ اسناد برقرار رہتی ہیں۔

ایسی منزل بنانا یا اپ ڈیٹ کرنا جس کی قسم کسی راز کی وضاحت کرتی ہو، **`STORAGE_ENCRYPTION_KEY`
کا تقاضا کرتا ہے**۔ اس کے بغیر `encrypt()` خاموشی سے قدر کو جوں کا توں گزار دیتا ہے، اس لیے اسناد کو
سادہ متن میں SQLite میں رکھنے کے بجائے تحریری کارروائی 400 کے ساتھ مسترد کر دی جاتی ہے (یہی حفاظتی شرط
Telegram webhook بھی لاگو کرتا ہے)۔

| طریقہ    | راستہ                                    | مقصد                                               |
| -------- | ---------------------------------------- | -------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | منزل کی اقسام + ان کے کنفیگ فیلڈز کی فہرست         |
| `GET`    | `/api/log-export/destinations`           | منزلوں کی فہرست (راز مخفی کیے گئے)                 |
| `POST`   | `/api/log-export/destinations`           | ایک منزل بنائیں                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | ایک منزل پڑھیں                                     |
| `PUT`    | `/api/log-export/destinations/{id}`      | نام / فعال حالت / کنفیگ / بیچنگ اپ ڈیٹ کریں        |
| `DELETE` | `/api/log-export/destinations/{id}`      | حذف کریں                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | اسناد کی جانچ کریں، کچھ تحریر نہ کریں              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ابھی مکمل اخراج کریں، وہی راستہ جو طے شدہ رن کا ہے |
| `GET`    | `/api/log-export/status`                 | Cron حالت، حالیہ رنز، ہر ہدف کا بیک لاگ            |

`GET /api/log-export/types` ہی UI کو عمومی بناتا ہے: ڈیش بورڈ فارم واپس کیے گئے
فیلڈ ڈسکرپٹرز سے رینڈر کیا جاتا ہے، اس لیے نئی منزل کے لیے UI میں کسی تبدیلی کی ضرورت نہیں۔

---

## 4. BigQuery منزل

کنفیگ کیز (`type: "bigquery"`):

| کلید                 | نوٹس                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| `projectId`          | وہ GCP پروجیکٹ جس میں ڈیٹاسیٹ موجود ہے                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                         |
| `location`           | صرف اس وقت استعمال ہوتا ہے جب ڈیٹاسیٹ بنانا ہو (ڈیفالٹ `EU`)            |
| `serviceAccountJson` | سروس اکاؤنٹ کلید۔ راز: ذخیرہ شدہ حالت میں مرموز، کبھی واپس نہیں کی جاتی |
| `autoCreate`         | پہلے ایکسپورٹ پر ڈیٹاسیٹ اور ٹیبل بنائیں (ڈیفالٹ `true`)                |

سروس اکاؤنٹ کو ہدف ٹیبل پر `bigquery.tables.updateData` کی ضرورت ہے، نیز
`autoCreate` فعال ہونے پر `bigquery.datasets.create` / `bigquery.tables.create` بھی درکار ہیں۔

کنفیگر کردہ بیچ ایک **کرسر** اکائی ہے، HTTP اکائی نہیں: `send()` اسے زیادہ سے زیادہ 500 قطاروں والی
insertAll کالز میں تقسیم کرتا ہے، اس لیے بڑا `batch_size` BigQuery کی 10 MB درخواست کی حد سے تجاوز
نہیں کر سکتا۔ عارضی اسٹیٹسز (408/429/500/502/503/504) کے لیے ایک ہی insertIds دوبارہ استعمال کرتے ہوئے،
ایکسپونینشل بیک آف کے ساتھ تین مرتبہ تک دوبارہ کوشش کی جاتی ہے؛ توثیق اور اسکیما کی ناکامیاں رن کو
ضائع کرنے کے بجائے پہلی ہی کوشش پر خطا دیتی ہیں۔

چند لمحے پہلے بنایا گیا ٹیبل ابھی اسٹریمنگ اینڈ پوائنٹ کو نظر نہیں آتا، جو چند سیکنڈ تک
404 کا جواب دیتا ہے۔ اس 404 پر دوبارہ کوشش کی جاتی ہے، لیکن **صرف اس وقت جب اسی رن نے ٹیبل بنایا ہو** —
حقیقتاً غیر موجود ٹیبل پھر بھی فوراً ناکام ہو جاتا ہے۔ یاد رکھیں کہ حال ہی میں حذف کیے گئے نام کے تحت
ٹیبل دوبارہ بنانے پر BigQuery کئی منٹ تک اسٹریمنگ inserts مسترد کرتا ہے؛ یہ حذف کرکے دوبارہ بنانے
کی خصوصیت ہے، اس لیے ٹیبل کو حذف کرکے دوبارہ شامل کرنے کے بجائے نیا ٹیبل نام استعمال کریں۔

**جزوی ناکامی HTTP 200 کے ساتھ غیر خالی `insertErrors[]` کی صورت میں آتی ہے۔** اسے ناکامی سمجھ کر
خطا دی جاتی ہے، اور یہی چیز کرسر کو ان قطاروں سے آگے بڑھنے سے روکتی ہے جنہیں BigQuery نے کبھی
قبول نہیں کیا؛ `tests/unit/log-export-bigquery.test.ts` اس رویے کو متعین کرتا ہے۔

ٹرانسپورٹ سادہ REST ہے — خود دستخط شدہ RS256 assertion کو
`https://oauth2.googleapis.com/token` پر access token کے بدلے تبدیل کیا جاتا ہے، پھر قطاریں
`tabledata.insertAll` کو بھیجی جاتی ہیں۔ کوئی Google SDK شامل نہیں کیا گیا۔ Access tokens کو
ہر (service account, scope) کے لیے دورانِ عمل کیش کیا جاتا ہے۔

بنائے گئے ٹیبل میں Logs ٹیب کے ہر فیلڈ کے لیے ایک کالم کے علاوہ `exported_at` بھی ہوتا ہے، اور اسے
اس طریقے کے مطابق ترتیب دیا جاتا ہے جس سے کال لاگز عملاً استفسار کیے جاتے ہیں:

- **`timestamp` پر روزانہ کی بنیاد پر تقسیم شدہ**، تاکہ تاریخ کی حد والی استفسار صرف انہی دنوں کو اسکین کرے۔
- **`api_key_name`، `provider`، `model`، `status` کے لحاظ سے کلسٹر شدہ** (اسی ترتیب میں)، تاکہ
  یہ فلٹر کرنا کہ اسے کس نے چلایا، یہ کہاں گیا، یا آیا یہ ناکام ہوا، ہر پارٹیشن کے اندر بلاکس کو محدود کرے۔ BigQuery
  زیادہ سے زیادہ چار کلسٹرنگ کالمز کی اجازت دیتا ہے اور ترتیب اہم ہے: صرف `api_key_name` پر فلٹر
  محدود کرتا ہے، جبکہ صرف `status` پر فلٹر ایسا نہیں کرتا۔
- **`partitionExpirationDays` کے ذریعے اختیاری پارٹیشن برقرار رکھنے کی مدت** (0 ہر چیز محفوظ رکھتا ہے)، جو
  ٹیبل بناتے وقت لاگو کی جاتی ہے۔

دونوں ترتیبات تخلیق کے وقت لاگو ہوتی ہیں۔ موجودہ ٹیبل اپنی موجودہ ترتیب برقرار رکھتا ہے، اس لیے
اگر آپ انہیں اپنانا چاہتے ہیں تو منزل کو کسی نئے ٹیبل id کی طرف اشارہ کریں۔

`tests/unit/log-export-bigquery.test.ts` یقینی بناتی ہے کہ میپر اور ٹیبل اسکیما مکمل ہم آہنگی میں
رہیں، تاکہ کسی نئے کال لاگ کالم کو برآمد کرتے وقت خاموشی سے حذف نہ کیا جا سکے۔

بیچز کو **دونوں**، قطاروں کی تعداد اور سیریلائز شدہ بائٹس، کی بنیاد پر حصوں میں تقسیم کیا جاتا ہے۔ پے لوڈز
برآمد ہونے کی صورت میں صرف قطاروں کی تعداد کافی نہیں ہوتی: پرامپٹس پر مشتمل 500 قطاریں دسیوں میگابائٹس
کی ہو سکتی ہیں، اور insertAll ایسی درخواست مسترد کر دیتا ہے جس کا حجم 10 MB سے زیادہ ہو۔ حصے 500
قطاروں یا 9 MB پر، ان میں سے جو حد پہلے آئے، مکمل کر دیے جاتے ہیں۔

---

## 5. منزل شامل کرنا

1. `src/lib/logExport/destinations/<name>.ts` بنائیں جو ایک `LogExportDestinationType` export کرے:
   ایک Zod `configSchema`، UI کے لیے ایک `fields` descriptor array، `secretFields`، اور ایک
   `createClient(config)` جو `test()` / `prepare()` / `send(records)` واپس کرے۔
2. اسے `src/lib/logExport/registry.ts` میں موجود `DESTINATIONS` array میں شامل کریں۔
3. `tests/unit/` کے تحت tests لکھیں۔

بس یہی مکمل تبدیلی ہے: persistence، cron job، REST layer، secret encryption، اور
dashboard form، سبھی registry کو پڑھتے ہیں۔

نئی منزل کے لیے دو اصول:

- جزوی ناکامی پر `send()` کو **لازماً throw کرنا چاہیے**۔ Resolve ہونے کا مطلب ہے کہ "منزل کے پاس یہ rows موجود ہیں"،
  اور cursor مستقل طور پر ان سے آگے بڑھ جاتا ہے۔
- صارف کا فراہم کردہ URL استعمال کرنے والی منزل کو fetch کرنے سے پہلے
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) کے ذریعے اس کی توثیق کرنی چاہیے،
  بالکل اسی طرح جیسے webhooks کرتے ہیں۔ BigQuery کو اس کی ضرورت نہیں ہے: اس کے hosts مستقل ہیں۔

---

## 6. اسے چلانا

- **Dashboard**: Integrations → Log export۔ ایک منزل شامل کریں، rows لکھے بغیر credentials
  کی جانچ کے لیے **Test** چلائیں، پھر اسے فعال کریں۔
- **Backlog**: ہر منزل کا card زیرِ التوا rows اور cursor دکھاتا ہے؛ `GET
/api/log-export/status` یہی اعداد و شمار، نیز آخری 20 job runs واپس کرتا ہے۔
- **ایک ناکام منزل دوسری منزلوں کو ناکام نہیں کرتی** — run summary ہر منزل کی
  status کو `last_status` / `last_error` میں درج کرتا ہے، اور job run history مجموعی نتیجہ محفوظ رکھتی ہے۔
- **منزل حذف کرنے سے اس کا cursor بھی حذف ہو جاتا ہے۔** اسے دوبارہ شامل کرنے پر عمل قدیم ترین محفوظ شدہ
  call log سے شروع ہوتا ہے، جس سے وہ rows دوبارہ بھیجی جاتی ہیں جو ممکن ہے منزل کے پاس پہلے سے موجود ہوں۔ BigQuery میں ہر row کا
  `insertId` صرف BigQuery کی اپنی de-duplication window کے اندر ہی اسے سنبھالتا ہے، اس لیے
  منزل کو حذف کرنے کے بجائے اسے غیر فعال کرنے کو ترجیح دیں۔
