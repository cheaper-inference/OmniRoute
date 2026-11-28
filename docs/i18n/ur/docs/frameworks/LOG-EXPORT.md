# Log export (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute کال لاگز کا کسی بیرونی تجزیاتی اسٹور میں مسلسل، تدریجی ایکسپورٹ۔

لاگز ڈیش بورڈ کا ٹیب درخواستوں کی تاریخ SQLite (`call_logs`) میں رکھتا ہے، جو
روٹیشن اور برقرار رکھنے کی مدت کے تحت محدود ہوتی ہے۔ لاگ ایکسپورٹ اسی ریکارڈ سیٹ کو ایک شیڈول کے مطابق باہر بھیجتا ہے تاکہ وہ
مقامی ڈیٹابیس سے زیادہ عرصے تک محفوظ رہے اور اسے دوسرے ڈیٹا کے ساتھ جوڑا جا سکے۔ BigQuery پہلی منزل ہے؛
پائپ لائن ایک رجسٹری ہے، اس لیے مزید منزلیں اضافی طور پر شامل کی جا سکتی ہیں۔

---

## 1. یہ کیسے کام کرتا ہے۔

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **شیڈول** — one `JobRegistry` cron job, `log_export`، `0 * * * *` (گھنٹہ وار، UTC) کو ڈیفالٹ کرنا۔ `src/lib/initCloudSync.ts` میں رجسٹرڈ؛ `OMNIROUTE_LOG_EXPORT_CRON` کے ساتھ اوور رائیڈ ایبل ہر ٹک نالی ہر** فعال** منزل، ترتیب وار۔
- **Cursor** — SQLite کی مضمر `call_logs.rowid`، `log_export_destinations.cursor_row_id` میں فی منزل برقرار ہے۔ `timestamp` جان بوجھ کر کرسر نہیں ہے: کال کرنے والے اپنی قیمت خود فراہم کر سکتے ہیں، اس لیے بعد میں شروع ہونے والی تیز رفتار کے بعد ایک سست درخواست لکھی جا سکتی ہے، اور ٹائم اسٹیمپ کرسر اسے چھوڑ دے گا۔
- **بیچنگ** — `batch_size` قطاریں فی درخواست (پہلے سے طے شدہ 500)، `max_rows_per_run` قطاریں فی رن (پہلے سے طے شدہ 10000) لہذا ایک بڑا بیک لاگ ایک کو بلاک کرنے کے بجائے کئی ٹکوں پر نکل جاتا ہے۔
- **ڈیلیوری** — کرسر `send()` کے حل ہونے کے بعد ہی آگے بڑھتا ہے۔ ایک ناکام بیچ کرسر کو وہیں چھوڑ دیتا ہے جہاں وہ تھا، لہذا اگلی رن پر وہی قطاریں دوبارہ آزمائی جاتی ہیں۔ گارنٹی کم از کم ایک بار پلس ڈیسٹینیشن سائیڈ ڈی ڈپلیکیشن ہے، بالکل ایک بار درست نہیں: BigQuery کال لاگ آئی ڈی کے ذریعے ہر قطار کو کیز کرتا ہے، جسے وہ اپنی ڈیڈ اپ ونڈو کے اندر بہترین کوشش کی بنیاد پر اعزاز دیتا ہے۔
- **اوورلیپ گارڈ** — دی کرون ٹک اور `POST .../run` ایک ساتھ فائر کر سکتے ہیں۔ پہلے سے نکلنے والی منزل کو دو بار نکالنے کے بجائے چھوڑ دیا جاتا ہے ( رن کے نتیجے میں `skipped: true` )، لہذا ایک ساتھ رن بیچ کو دوبارہ نہیں بھیج سکتا یا کرسر کو پیچھے کی طرف نہیں لکھ سکتا۔
- **بازیابی کو صاف کریں۔** — اگر `cursor_row_id` `MAX(rowid)` کے اوپر ختم ہوتا ہے (پوری میز صاف کی گئی تھی اور رووڈز دوبارہ شروع کی گئی تھیں)، رنر مستقل طور پر نابینا ہونے کے بجائے 0 پر پلٹ جاتا ہے۔

### الگ تھلگ رنر اور حدود

نوڈ پر چلنے والی ہر منزل ایک الگ، قلیل المدتی OS چائلڈ پروسیس شروع کرتی ہے (`child_process` کے ساتھ IPC، نہیں `worker_threads`)۔ باڈی ریڈز، پے لوڈ JSON parsing/serialization، destination `prepare()` اور destination network I/O سبھی وہاں چلتے ہیں، سرور کے ایونٹ لوپ پر نہیں۔ صرف کنفیگریشن اور چھوٹے پروگریس میسیجز کراس IPC; برآمد شدہ ریکارڈ کبھی بھی سرور پر واپس نہیں آتے۔ کرون جاب اور رن ناؤ روٹ ایک ہی عوامی نتیجہ اور اوورلیپ گارڈ کو برقرار رکھتے ہیں۔

بچہ سرور کے حل شدہ `DATA_DIR/storage.sqlite` صرف پڑھنے کے لیے `node:sqlite` کا استعمال کرتے ہوئے `busy_timeout=5000` اور `query_only=ON` کے ساتھ کھولتا ہے۔ یہ کوئی DB سنگلٹن درآمد نہیں کرتا ہے اور کوئی منتقلی، بیک اپ یا SQLite اپ ڈیٹ نہیں کرتا ہے۔ Missing/corrupt آرٹفیکٹ بک کیپنگ (بشمول کرپٹ-آرٹیفیکٹ UPDATE) صرف ڈیش بورڈ کی تفصیل کے راستے میں رہتی ہے۔ دونوں راستے ایک خالص تفصیل حل کرنے والے کا اشتراک کرتے ہیں۔ ایکسپورٹ غیر مطابقت پذیر فائل سسٹم ریڈز کا استعمال کرتا ہے اور وہی آرٹفیکٹ → legacy inline → legacy disk → none ریزولوشن آرڈر۔ جب بچہ اپنے ریڈر کو کھولتا ہے تو ایک رن زیادہ سے زیادہ اندراج رووڈ کو اسنیپ شاٹ کرتا ہے۔ بعد میں داخل اگلے رن کا انتظار کریں۔ یہ اندراج کی حد ہے، طویل عرصے تک جاری رہنے والی SQLite ٹرانزیکشن نہیں: نیٹ ورک کے انتظار کے دوران WAL مصنفین اور چوکیاں مفت رہتی ہیں۔ موجودہ قطاروں کے Updates/deletions اس حد سے منجمد نہیں ہیں۔

ہر ایک منظور شدہ بیچ کے بعد، بچہ ایک اعتراف کا انتظار کرتا ہے۔ سرور پہلے `advanceLogExportCursor` کے ساتھ کرسر کو برقرار رکھتا ہے، پھر `ack` بھیجتا ہے؛ اس سے پہلے کوئی اگلا بیچ شروع نہیں ہوتا۔ بھیجنے میں ناکامی، کریش یا ٹائم آؤٹ ریکارڈ کی ناکامی اس بیچ کو آگے بڑھائے بغیر۔ پہلے تسلیم شدہ بیچز پرعزم رہیں؛ زیادہ سے زیادہ ایک غیر تسلیم شدہ بیچ کو دوبارہ بھیجا جا سکتا ہے۔ کامیابی صرف `done` اور کلین چائلڈ ایگزٹ کے بعد ریکارڈ کی جاتی ہے۔ ناکامیاں بچے کو SIGTERM کے ساتھ ختم کر دیتی ہیں، 500 ms کے بعد SIGKILL تک بڑھ جاتی ہیں، اور رنر عمل کے بند ہونے کا انتظار کرتا ہے۔

| ماحولیاتی متغیر                               | طے شدہ | مقصد                            |
| --------------------------------------------- | ------ | ------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | فی منزل دیوار گھڑی کی حد        |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | MB میں چائلڈ V8 پرانی جگہ کی حد |

Invalid/non-positive/non-integer اقدار ڈیفالٹس استعمال کرتی ہیں۔ ہیپ سیٹنگ کل RSS حد نہیں ہے۔ بہت بڑے بیچ اب بھی بچوں کی یادداشت کو ختم کر سکتے ہیں اور محفوظ طریقے سے دوڑ میں ناکام ہو سکتے ہیں۔ 1024 MB ڈیفالٹ 512 KiB آرٹفیکٹس کے ڈیفالٹ 500 قطار والے بیچ کے لیے ہیڈ روم چھوڑتا ہے جس میں باڈیز فعال ہیں، بشمول BigQuery کی بائٹ چنکڈ JSON سیریلائزیشن۔ یہ 10000 قطاروں والی باڈی بیچ کو محفوظ نہیں بناتا ہے۔ V8 ہیپ تھکن ایک قابل عمل ناکامی کو ریکارڈ کرتی ہے: بیچ کا سائز کم کرنا یا `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` بڑھانا؛ کرسر آخری تسلیم شدہ بیچ پر رہتا ہے۔ تاریخی inline/disk لاشیں جدید نمونے کی ٹوپی سے ڈھکی نہیں ہیں۔ آپریٹرز کو RSS الگ سے بجٹ کرنا چاہیے، خاص طور پر میموری محدود کنٹینرز کے اندر۔

بچے کو صرف حل شدہ `DATA_DIR`, `NODE_ENV`, واضح `TZ` (میراثی فائل کا `NODE_EXTRA_CA_CERTS` لوکل ٹائم ریزولوشن)، `ELECTRON_RUN_AS_NODE` جب موجود ہو، اور درج ذیل آؤٹ باؤنڈ ان پٹس: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (اور ان کی چھوٹی شکلیں)، `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `SSL_CERT_FILE` `SSL_CERT_DIR` ایک عالمی Undici ڈسپیچر سرور کے خالص ماحول پراکسی ریزولیوشن اور مقامی میزبان بائی پاس کے قوانین بشمول `NO_PROXY` کا اشتراک کرتا ہے۔ یہ `proxyFetch.ts` یا اس کے DB/feature جھنڈے درآمد نہیں کرتا ہے۔ پراکسی اسناد کو فارورڈ شدہ آؤٹ پٹ اور ریکارڈ شدہ غلطیوں سے درست کیا جاتا ہے۔ منزل کی اسناد صرف ایک سٹارٹ IPC پیغام میں سفر کرتی ہیں، کبھی بھی argv یا ماحول میں نہیں۔ output/error فارورڈنگ پریفکسڈ اور سینیٹائزڈ ہے۔ چائلڈ ایگزیک آرگیومنٹس میں صرف `ExperimentalWarning` ہی غیر فعال کیا جاتا ہے تاکہ نوڈ کے SQLite ہر کرون رن کی وارننگ کو دہرانے سے بچا جا سکے۔ دیگر انتباہی اقسام نظر آتی ہیں۔

ڈیسٹینیشن ماڈیولز Next.js/server-only انحصار کے بغیر قابل درآمد ہونے چاہئیں۔ موجودہ BigQuery نفاذ پہلے ہی اس معاہدے پر پورا اترتا ہے۔ رسائی ٹوکن کیشز صرف بچوں کی دوڑ کے لیے چلتی ہیں، رنز کے پار نہیں۔ نوڈ تعاون یافتہ رن ٹائم (`package.json` انجن) ہے۔ ایک بہترین کوشش، غیر تعاون یافتہ Bun مطابقت کا راستہ موجود ہے (`bun:sqlite` in `src/lib/db/core.ts` / adapters، اور `Dockerfile.bun`)، لہذا برآمدات کو اس کے تحت نہیں ٹوٹنا چاہیے۔ Bun کے تحت، برآمدات عمل کے پچھلے راستے کو برقرار رکھتی ہیں اور ایک بار کی وارننگ جاری کرتی ہیں: چائلڈ heap/timeout تنہائی دستیاب نہیں ہے۔ ایونٹ لوپ اور OOM تنہائی کے لیے نوڈ استعمال کریں۔

جب `includeBodies` فعال ہو تو، ایک گھنٹہ پے لوڈ بیک لاگ جمع کرنے کے بجائے منٹ لیول کیڈنس جیسے `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` کو ترجیح دیں۔ بیچ اور قطار کی حدود اب بھی ہر رن کے پابند ہیں۔ عمل کی شروعات فی منزل فی رن ادا کی جاتی ہے۔ یہ سرور ایونٹ-لوپ آئسولیشن کے لیے ایک چھوٹی اسٹارٹ اپ لاگت کا سودا کرتا ہے، CPU کل استعمال میں کمی نہیں۔

### پے لوڈز (پرامپٹس اور تکمیلات)

پہلے سے طے شدہ طور پر ایکسپورٹ میں صرف سمری والے فیلڈز ہوتے ہیں۔** فہرست** دکھاتا ہے آن کر رہا ہے۔** اشارے اور جوابات برآمد کریں۔** (`includeBodies`) اس کے علاوہ بحری جہاز کیا لاگز کرتا ہے۔** تفصیل** ہر کال کے لیے پین شوز:

| میدان                            | یہ کیا رکھتا ہے۔                                             |
| -------------------------------- | ------------------------------------------------------------ |
| `request_body` / `response_body` | کال پے لوڈ ہوتی ہے جیسا کہ ڈیش بورڈ انہیں پیش کرتا ہے۔       |
| `pipeline_route_decision`        | راؤٹر نے کون سا ہدف اور ماڈل منتخب کیا۔                      |
| `pipeline_client_request`        | خام درخواست بالکل اسی طرح جیسے کلائنٹ نے بھیجی ہے۔           |
| `pipeline_openai_request`        | اندرونی OpenAI شکل میں ترجمہ کے بعد                          |
| `pipeline_provider_request`      | جیسا کہ اصل میں اپ اسٹریم بھیجا گیا، فراہم کنندہ کی بولی میں |
| `pipeline_provider_response`     | اپ اسٹریم کا خام جواب                                        |
| `pipeline_client_response`       | جو واپس کال کرنے والے کو دیا گیا تھا۔                        |
| `pipeline_error`                 | ناکام کال کے لیے پائپ لائن کی سطح کی خرابی کی تفصیل          |
| `bodies_truncated`               | درست ہے جب اوپر کا کوئی بھی فیلڈ `maxBodyBytes` مارتا ہے۔    |

یہ فوری مواد ہے، تو ایسا ہے۔** ڈیفالٹ کی طرف سے بند** اور جان بوجھ کر فی منزل کا انتخاب۔ ڈیش بورڈ کیا بحری جہاز دکھاتا ہے، کیونکہ ایکسپورٹ اور `getCallLogById` تفصیلی قرارداد کا اشتراک کرتے ہیں: پے لوڈز پہلے سے ہی PII سے صاف کیے جاتے ہیں اور جب وہ لکھے جاتے ہیں تو خفیہ طور پر ریڈیکٹ ہوتے ہیں، اور `noLog` API کلید کے ساتھ کی گئی کال میں کوئی پے لوڈ نہیں ہوتا، اس لیے برآمد کرنے کے لیے کچھ بھی نہیں ہے۔

پے لوڈز کو فائل سسٹم آرٹفیکٹ سے فی قطار پڑھا جاتا ہے، لہذا ہائیڈریشن صرف ان منزلوں کے لیے چلتی ہے جنہوں نے اس کے لیے کہا تھا۔ ایک گمشدہ یا کرپٹ آرٹفیکٹ بیچ کو ناکام کرنے اور کرسر کو اسٹرینڈ کرنے کے بجائے null پے لوڈز کے ساتھ اپنی سمری برآمد کرتا ہے۔

`maxBodyBytes` (پہلے سے طے شدہ 262144) ہر فیلڈ کیپس کرتا ہے۔ طویل پے لوڈز ہیں۔** گرنے کے بجائے کٹا ہوا** — ایک کلپ شدہ پرامپٹ اب بھی جواب دیتا ہے "کیا پوچھا گیا تھا" — اور قطار کو `bodies_truncated` کے ساتھ جھنڈا لگایا گیا ہے۔ سٹریم شدہ ٹکڑا بہ حصہ ڈیلٹا برآمد نہیں کیا جاتا ہے۔ جمع جواب پہلے ہی `pipeline_provider_response` اور `pipeline_client_response` میں ہے۔

---

## 2. فائلیں

| جزو                         | مقام                                         |
| --------------------------- | -------------------------------------------- |
| منزل کا معاہدہ              | `src/lib/logExport/types.ts`                 |
| رجسٹری                      | `src/lib/logExport/registry.ts`              |
| رازوں کی ہینڈلنگ            | `src/lib/logExport/secrets.ts`               |
| رنر (پیرنٹ IPC)             | `src/lib/logExport/runner.ts`                |
| پراسیس کا دورِ حیات         | `src/lib/logExport/childRunner.ts`           |
| چائلڈ کا داخلی نقطہ         | `src/lib/logExport/exportChild.ts`           |
| صرف پڑھنے کے لیے اوپنر      | `src/lib/db/logExportReadOnly.ts`            |
| مشترکہ کوئری/میپنگ          | `src/lib/usage/callLogExportQueries.ts`      |
| تفصیل حل کرنے والا          | `src/lib/usage/callLogDetailResolver.ts`     |
| API پروجیکشن                | `src/lib/logExport/presenter.ts`             |
| BigQuery منزل               | `src/lib/logExport/destinations/bigquery.ts` |
| Google سروس اکاؤنٹ کی توثیق | `src/lib/logExport/googleServiceAccount.ts`  |
| کال لاگ کا ماخذ             | `src/lib/usage/callLogExportSource.ts`       |
| مستقل ذخیرہ                 | `src/lib/db/logExportDestinations.ts`        |
| Cron جاب                    | `src/lib/jobs/logExportJob.ts`               |
| REST پرت                    | `src/app/api/log-export/`                    |
| ڈیش بورڈ صفحہ               | `src/app/(dashboard)/dashboard/log-export/`  |

اسکیما: `src/lib/db/migrations/170_log_export_destinations.sql`۔

---

## 3. REST API

تمام روٹس پر مینجمنٹ کی توثیق لازم ہے (`requireManagementAuth`)۔ راز کبھی واپس نہیں کیے جاتے:
ذخیرہ شدہ راز کی جگہ لفظی قدر `__stored__` واپس آتی ہے، اور اپ ڈیٹ کے دوران یہی قدر واپس بھیجنے سے
ذخیرہ شدہ سند برقرار رہتی ہے۔

ایسی منزل بنانے یا اپ ڈیٹ کرنے کے لیے جس کی قسم کسی راز کا اعلان کرتی ہو، **`STORAGE_ENCRYPTION_KEY`
لازمی ہے**۔ اس کے بغیر `encrypt()` خاموشی سے ان پٹ کو جوں کا توں آگے منتقل کرتا ہے، اس لیے سند کو
SQLite میں سادہ متن کی صورت میں رکھنے کے بجائے لکھنے کی درخواست 400 کے ساتھ مسترد کر دی جاتی ہے (یہی حفاظتی جانچ
Telegram ویب ہک بھی نافذ کرتا ہے)۔

| طریقہ    | پاتھ                                     | مقصد                                                                                 |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | منزل کی اقسام + ان کے کنفیگریشن فیلڈز کی فہرست                                       |
| `GET`    | `/api/log-export/destinations`           | منزلوں کی فہرست (راز چھپائے ہوئے)                                                    |
| `POST`   | `/api/log-export/destinations`           | منزل بنائیں                                                                          |
| `GET`    | `/api/log-export/destinations/{id}`      | ایک منزل پڑھیں                                                                       |
| `PUT`    | `/api/log-export/destinations/{id}`      | نام / فعال حالت / کنفیگریشن / بیچنگ اپ ڈیٹ کریں                                      |
| `DELETE` | `/api/log-export/destinations/{id}`      | حذف کریں                                                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | اسناد کی جانچ کریں، کچھ نہ لکھیں                                                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ابھی تمام زیرِ التوا ڈیٹا منتقل کریں، شیڈول شدہ اجرا والا ہی راستہ استعمال کرتے ہوئے |
| `GET`    | `/api/log-export/status`                 | Cron کی حالت، حالیہ اجرا، ہر ہدف کا زیرِ التوا ڈیٹا                                  |

`GET /api/log-export/types` ہی UI کو عمومی بناتا ہے: ڈیش بورڈ کا فارم واپس آنے والے
فیلڈ ڈسکرپٹرز سے تیار ہوتا ہے، لہٰذا نئی منزل کے لیے UI میں کسی تبدیلی کی ضرورت نہیں ہوتی۔

---

## 4. BigQuery منزل

ترتیبی کلیدیں (`type: "bigquery"`):

| کلید                 | نوٹس                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `projectId`          | ڈیٹاسیٹ رکھنے والا GCP پروجیکٹ                                                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                      |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                      |
| `location`           | صرف اس وقت استعمال ہوتا ہے جب ڈیٹاسیٹ بنانا ہو (طے شدہ قدر `EU`)                                     |
| `serviceAccountJson` | سروس اکاؤنٹ کی کلید۔ راز: آرام کی حالت میں خفیہ کردہ، کبھی واپس نہیں کی جاتی                         |
| `autoCreate`         | غیر موجود ڈیٹاسیٹ/ٹیبل بنائیں؛ قابلِ قبول usage-evidence کالم مشروط طور پر شامل کریں (طے شدہ `true`) |

سروس اکاؤنٹ کو ہدف ٹیبل پر `bigquery.tables.updateData` کی اجازت درکار ہے، جبکہ
`autoCreate` فعال ہونے پر `bigquery.datasets.create` / `bigquery.tables.create` بھی درکار ہیں۔
موجودہ ٹیبل میں دو nullable usage-evidence فیلڈز شامل کرنے کے لیے
`bigquery.tables.update` بھی ضروری ہے۔ اجازت نہ ہونے کی صورت میں ایکسپورٹ ناکام ہو جاتا ہے اور
اس کا کرسر آگے نہیں بڑھتا۔

ترتیب دیا گیا بیچ HTTP یونٹ نہیں بلکہ **کرسر** یونٹ ہے: `send()` اسے زیادہ سے زیادہ 500 قطاروں
والی insertAll کالز میں تقسیم کرتا ہے، اس لیے بڑا `batch_size` BigQuery کی 10 MB درخواست کی
حد سے تجاوز نہیں کر سکتا۔ عارضی اسٹیٹس (408/429/500/502/503/504) کو exponential
backoff کے ساتھ زیادہ سے زیادہ تین مرتبہ دوبارہ آزمایا جاتا ہے، اور وہی insertIds دوبارہ استعمال
ہوتے ہیں؛ توثیق اور اسکیما کی ناکامیاں پہلی کوشش پر ہی throw ہو جاتی ہیں، بجائے اس کے کہ رن
ضائع ہو۔

ابھی ابھی بنایا گیا ٹیبل streaming endpoint کو فوراً نظر نہیں آتا، جو چند سیکنڈ تک 404 واپس
کرتا ہے۔ اس 404 کو دوبارہ آزمایا جاتا ہے، لیکن **صرف اس وقت جب یہ رن ٹیبل بنا چکا ہو** —
حقیقتاً غیر موجود ٹیبل کی صورت میں فوری طور پر ناکامی ہوتی ہے۔ یاد رکھیں کہ حال ہی میں حذف کیے
گئے ٹیبل کے نام سے دوبارہ ٹیبل بنانا BigQuery کو کئی منٹ تک streaming inserts مسترد کرنے پر
مجبور کرتا ہے؛ یہ delete-then-recreate کی خاصیت ہے، اس لیے کسی ٹیبل کو حذف کر کے دوبارہ شامل
کرنے کے بجائے نیا ٹیبل نام استعمال کرنا بہتر ہے۔

**جزوی ناکامی HTTP 200 کے ساتھ غیر خالی `insertErrors[]` کی صورت میں آتی ہے۔** اسے ناکامی
سمجھا جاتا ہے اور throw کیا جاتا ہے، جس سے کرسر ان قطاروں سے آگے نہیں بڑھتا جنہیں BigQuery نے
قبول نہیں کیا؛ `tests/unit/log-export-bigquery.test.ts` اس رویے کو یقینی بناتا ہے۔

ٹرانسپورٹ سادہ REST ہے — ایک self-signed RS256 assertion کو
`https://oauth2.googleapis.com/token` پر access token کے بدلے بھیجا جاتا ہے، پھر قطاریں
`tabledata.insertAll` کو بھیجی جاتی ہیں۔ کوئی Google SDK شامل نہیں کیا جاتا۔ Access tokens
عمل کے اندر فی (سروس اکاؤنٹ، scope) کی بنیاد پر کیش کیے جاتے ہیں۔

بنائے گئے ٹیبل میں Logs ٹیب کے ہر فیلڈ کے لیے ایک کالم، نیز `exported_at` شامل ہوتا ہے، اور
اس کی ترتیب اس لحاظ سے بنائی جاتی ہے کہ call logs کو حقیقت میں کس طرح query کیا جاتا ہے:

- **`timestamp` پر دن کے لحاظ سے partitioned**، تاکہ تاریخ کے ذریعے محدود query صرف ان دنوں
  کو scan کرے۔
- **`api_key_name`, `provider`, `model`, `status` کے لحاظ سے clustered** (اسی ترتیب میں)،
  تاکہ یہ معلوم کرنے کے لیے filtering کہ اسے کس نے چلایا، کہاں بھیجا گیا، یا ناکام ہوا یا نہیں،
  ہر partition کے اندر موجود blocks کو prune کرے۔ BigQuery زیادہ سے زیادہ چار clustering
  columns کی اجازت دیتا ہے اور ترتیب اہم ہے: صرف `api_key_name` پر filter blocks کو prune
  کرتا ہے، صرف `status` پر filter ایسا نہیں کرتا۔
- **اختیاری partition retention** بذریعہ `partitionExpirationDays` (`0` ہر چیز محفوظ رکھتا ہے)،
  جس کا اطلاق ٹیبل بناتے وقت ہوتا ہے۔

دونوں ترتیبات کا اطلاق تخلیق کے وقت ہوتا ہے۔ موجودہ ٹیبل اپنی پہلے سے موجود ترتیب برقرار رکھتا
ہے، اس لیے اگر آپ انہیں اپنانا چاہتے ہیں تو منزل کو ایک نئی ٹیبل ID پر بھیجیں۔

`tests/unit/log-export-bigquery.test.ts` اس بات کی تصدیق کرتا ہے کہ mapper اور ٹیبل اسکیما
ہم قدم رہیں، تاکہ نیا call-log کالم راستے میں خاموشی سے خارج نہ ہو جائے۔

بیچوں کو **قطاروں کی تعداد اور serialised bytes دونوں** کے لحاظ سے تقسیم کیا جاتا ہے۔ صرف قطاروں
کی تعداد کافی نہیں، کیونکہ payloads ایکسپورٹ ہونے کے بعد 500 قطاروں میں دسیوں میگا بائٹس ہو سکتی
ہیں، اور insertAll، 10 MB سے بڑی درخواست مسترد کر دیتا ہے۔ Chunks 500 قطاروں یا 9 MB پر،
جو بھی پہلے ہو، بند ہو جاتے ہیں۔

---

## 5. OTLP/HTTP ٹریسز کی منزل

کنفیگ `type: "otlp-http"` استعمال کرتی ہے۔ یہ محفوظ شدہ کال لاگز کا ایک شیڈول شدہ، کرسر پر مبنی ایکسپورٹ ہے، نہ کہ `open-sse/services/routing/otel.ts` میں موجود بہترین کوشش کے ساتھ لائیو روٹنگ-ایونٹ سنک۔ یہ سنک کے ماحول کے متغیرات، ٹائمرز یا بفرز کو نہ پڑھتا ہے نہ تبدیل کرتا ہے۔ دونوں کو فعال کرنے سے اسپینز کی دو آزاد اقسام پیدا ہو سکتی ہیں؛ ان کال-لاگ اسپینز کو الگ شناخت کرنے کے لیے `omniroute.log-export` انسٹرومنٹیشن اسکوپ استعمال کریں۔

| Key                      | Default / purpose                                                               |
| ------------------------ | ------------------------------------------------------------------------------- |
| `endpoint`               | مکمل HTTP(S) ٹریسز URL درکار ہے؛ آخر میں `/v1/traces` لاحقہ شامل نہیں کیا جاتا  |
| `headers`                | اختیاری `Name: value` لائنیں یا اسٹرنگز کا JSON آبجیکٹ؛ خفیہ کردہ               |
| `requestHeaderAllowlist` | خالی (بند)؛ اسپین ایٹریبیوٹس کے طور پر محفوظ کرنے کے لیے کلائنٹ ہیڈر نام/پریفکس |
| `serviceName`            | `omniroute`؛ ریسورس `service.name`                                              |
| `langfuseMapping`        | `false`؛ Langfuse جنریشن/سیشن/صارف ایٹریبیوٹس شامل کرتا ہے                      |
| `identity`               | `pseudonymous`، `keyName`، یا `none`                                            |
| `paths`                  | `/v1/chat/completions`، `/v1/responses`، `/v1/messages`                         |
| `timeoutMs`              | ہر HTTP کوشش کے لیے `30000`                                                     |
| `environment`            | غیر متعین؛ اختیاری `langfuse.environment`                                       |

عمومی ڈیش بورڈ ان فیلڈز کو دکھاتا ہے۔ `paths` ایک API array یا نئی لائنوں/کوما سے الگ کیے گئے عین paths پر مشتمل textarea قبول کرتا ہے۔ Embeddings، rerank اور دیگر paths کو چھوڑ دیا جاتا ہے، جب تک کہ انہیں واضح طور پر اجازت نہ دی جائے۔ چھوڑی گئی rows پھر بھی کرسر کو آگے بڑھاتی ہیں؛ موجودہ runner کے `exported`/`exportedTotal` کاؤنٹرز قبول کیے گئے spans کے بجائے پراسیس کی گئی source rows شمار کرتے ہیں، جن میں فلٹر کی گئی rows بھی شامل ہیں۔ فلٹرنگ child میں کی جاتی ہے، اس کے IPC/cursor معاہدے میں کوئی تبدیلی کیے بغیر۔

URL کی توثیق `src/shared/network/outboundUrlGuard.ts` کے DB سے آزاد `parseAndValidateNonMetadataUrl` helper کا استعمال کرتی ہے: `block-metadata` پالیسی۔ اس میں webhook validator جیسی غیر مشروط metadata/protocol/embedded-credential جانچیں شامل ہیں، جبکہ private URLs کو اجازت دی گئی ہے؛ تاہم یہ جان بوجھ کر localhost/LAN targets کو کسی عالمی feature-flag override کے بغیر اجازت دیتی ہے۔ اس سے self-hosted Langfuse، Phoenix، Tempo اور Collector endpoints، بشمول private HTTP endpoints، استعمال کیے جا سکتے ہیں۔ Cloud-metadata hosts کو ہمیشہ بلاک کیا جاتا ہے۔ Redirects کی پیروی نہیں کی جاتی، اس لیے کوئی collector credentials کو کسی مختلف host پر redirect نہیں کر سکتا۔ موجودہ lexical URL guard کی طرح یہ DNS resolution کو pin نہیں کرتا؛ صرف operator-controlled hosts کنفیگر کریں۔ جب endpoint قابلِ اعتماد نیٹ ورک پر نہ ہو تو HTTPS کو ترجیح دیں۔

### Payload اور delivery

OTLP/HTTP JSON (`ExportTraceServiceRequest`، `Content-Type: application/json`) ہر اجازت یافتہ row کے لیے ایک CLIENT span بھیجتا ہے، جس کا نام اس کے عین request path کے مطابق ہوتا ہے۔ Path naming، span name میں model یا identity data شامل کیے بغیر، Chat Completions، Responses اور Messages میں فرق واضح کرتی ہے۔ Resource attributes میں `service.name` اور package کا `service.version` شامل ہوتے ہیں۔

عام chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) تکمیل کے وقت `duration = Date.now() - startTime` لکھتا ہے اور timestamp فراہم نہیں کرتا؛ `src/lib/usage/callLogs.ts` میں `saveCallLogOperation` timestamp کو write (completion) کے وقت پر default کرتا ہے۔ اس لیے export میں end کو row timestamp اور start کو end − duration مقرر کیا جاتا ہے (milliseconds کو decimal nanoseconds میں تبدیل کر کے)۔ Caller کی جانب سے فراہم کیے گئے historical timestamps کو بھی end time کے طور پر محفوظ رکھا جاتا ہے؛ ہر row کے لیے start/completion کی کوئی علیحدہ شناخت موجود نہیں ہے۔ Null duration صفر بن جاتا ہے۔ غلط یا غائب timestamps batch کو ناکام بناتے ہیں، غیر متعین spans تخلیق نہیں کرتے۔ `ttftMs` nullable ہے اور اسے `omniroute.ttft_ms` سے map کیا جاتا ہے۔

Attributes میں `gen_ai.operation.name="chat"`، provider، requested/response model، input/output tokens، اختیاری cache-read/cache-creation/reasoning tokens، HTTP status، combo، cache source، session tag اور correlation id شامل ہیں۔ Integer OTLP values اور timestamps decimal strings ہوتے ہیں؛ strings، booleans اور fractional numbers اپنی native OTLP value variants استعمال کرتے ہیں۔ Error spans کا status ERROR اور sanitized status message ہوتا ہے۔ Canonical record میں upstream host URL موجود نہیں ہوتا، اس لیے `server.address` کو شامل نہیں کیا جاتا، تاکہ collector کو غلطی سے model server کے طور پر شناخت نہ کیا جائے۔ Cost export نہیں کی جاتی۔

صرف `includeBodies=true` content کو hydrate کرتا ہے۔ `langfuseMapping=false` کے ساتھ `gen_ai.input.messages` / `gen_ai.output.messages` میں OmniRoute کے ذریعے محفوظ کردہ sanitized request/response body JSON شامل ہوتا ہے (اگر parseable ہو تو canonicalized)، نہ کہ نئے ڈھانچے میں ڈھالا ہوا semconv messages array۔ Clipped/non-JSON bodies خام text کے طور پر برقرار رہتے ہیں۔ `langfuseMapping=true` کے ساتھ bodies صرف `langfuse.observation.input` / `langfuse.observation.output` کے طور پر بھیجے جاتے ہیں؛ `gen_ai.*.messages` attributes کو چھوڑ دیا جاتا ہے تاکہ ہر body ایک ہی بار بھیجی جائے۔ دونوں modes موجودہ hydration path سے `maxBodyBytes` حاصل کرتے ہیں؛ `omniroute.bodies_truncated=true` clipping کی نشان دہی کرتا ہے۔ اس destination کے ذریعے کوئی اضافی pipeline snapshots یا unsanitized artifact reads شامل نہیں کیے جاتے؛ اختیاری request-header capture ذیل میں بیان کردہ موجودہ hydrated client snapshot استعمال کرتا ہے۔ Bodies export کرتے وقت hourly backlog جمع کرنے کے بجائے منٹ کی سطح کی cadence استعمال کریں، مثلاً `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`۔

### اختیاری client request headers

Header capture **بطورِ ڈیفالٹ بند** ہے۔ destination config میں `requestHeaderAllowlist` سیٹ کریں اور **Export prompts and responses** فعال کریں (destination پر `includeBodies: true`)۔ Allowlist ایک API array یا نئی لائنوں/کوما سے الگ کیے گئے ناموں والا textarea قبول کرتی ہے:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

ناموں کا موازنہ کیس سے غیر حساس اور عین مطابق ہوتا ہے، الا یہ کہ آخر میں موجود واحد `*` غیر خالی
header-name سابقہ منتخب کرے۔ عریاں `*`، شامل شدہ وائلڈ کارڈز اور غلط HTTP ہیڈر نام مسترد کر دیے جاتے ہیں۔
زیادہ سے زیادہ 64 سلیکٹرز ہو سکتے ہیں، اور ہر ایک کا نام/سابقہ زیادہ سے زیادہ 256 ASCII بائٹس کا ہو سکتا ہے۔
یہ ترتیب `headers` سے الگ ہے، جو ایکسپورٹر کو کلیکٹر کے سامنے تصدیق کرتا ہے۔

کیپچر صرف `pipeline_client_request` سے پڑھتا ہے، جو محفوظ کردہ تفصیلی پائپ لائن کے
`clientRawRequest` (یا پرانے `clientRequest`) سے پُر کیا جاتا ہے۔ یہ کبھی بھی پرووائیڈر کے request headers پر واپس نہیں جاتا۔
درخواست ریکارڈ کیے جانے کے وقت تفصیلی پائپ لائن لاگنگ فعال ہونا ضروری تھا۔ `includeBodies` غیر فعال ہونے کی صورت میں،
یا کلائنٹ-اسنیپ شاٹ JSON غائب، خراب یا کٹا ہوا ہونے کی صورت میں، کوئی ہیڈر attributes جاری نہیں کیے جاتے۔
`maxBodyBytes` بڑھانے سے ایکسپورٹ کے وقت اسنیپ شاٹ کے کٹنے سے بچا جا سکتا ہے؛
لیکن جو تفصیل کبھی محفوظ ہی نہ ہوئی ہو اسے بحال نہیں کیا جا سکتا۔ 1 MiB سے بڑا اسنیپ شاٹ
یا 256 سے زیادہ ہیڈر اندراجات رکھنے والا اسنیپ شاٹ نظر انداز کر دیا جاتا ہے۔ موجودہ prompt/response ایکسپورٹ
ہیڈر کیپچر کے ساتھ فعال رہتا ہے؛ allowlist صرف ہیڈرز کے لیے hydration موڈ فراہم نہیں کرتی۔

منتخب قدریں `http.request.header.<full lowercase header name>` کے بطور OTLP string arrays بن جاتی ہیں،
حتیٰ کہ ایک واحد string کے لیے بھی۔ مثال کے طور پر، `X-OmniRoute-Meta-Team: example-team` اس میں تبدیل ہو جاتا ہے:
`http.request.header.x-omniroute-meta-team`، جس کی قدر
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` ہوتی ہے۔
پورا سابقہ برقرار رہتا ہے: یہ عام ہیڈرز ہیں، جن پر کاروباری فیلڈ کی parsing یا
`omniroute.metadata.*` / Langfuse metadata conversion لاگو نہیں ہوتی۔ `langfuseMapping` ہیڈر semantics تبدیل نہیں کرتا۔
منتخب کردہ single-valued `User-Agent` معیاری scalar `user_agent.original` بھی سیٹ کرتا ہے۔
ایک قدر کے اندر موجود کوما کو الگ نہیں کیا جاتا۔ کیس کی مختلف صورتیں محفوظ شدہ اندراجی ترتیب میں ضم ہوتی ہیں؛
کسی بھی غلط صورت کی موجودگی میں پورا ہیڈر خارج کر دیا جاتا ہے۔ attributes کو lowercase نام کے اعتبار سے ترتیب دیا جاتا ہے۔

Authorization، Proxy-Authorization، Cookie، Set-Cookie، API-key ہیڈرز، ایسے نام جن میں
auth/token/secret/password/credential markers شامل ہوں، اور اندرونی gateway credentials ہمیشہ خارج کیے جاتے ہیں،
خواہ انہیں منتخب کیا گیا ہو یا storage میں جزوی طور پر mask کیا گیا ہو۔ معلوم credential patterns مشترکہ credential detector
دوبارہ استعمال کرتے ہیں؛ redaction markers کو خارج کیا جاتا ہے، محفوظ قدروں کے طور پر ایکسپورٹ نہیں کیا جاتا۔
صرف strings اور غیر خالی string arrays قبول کیے جاتے ہیں؛ numbers یا objects کو coerce نہیں کیا جاتا۔
غلط نام، prototype keys، control characters (horizontal tab کے علاوہ) اور malformed Unicode کو نظر انداز کیا جاتا ہے،
بغیر batch کو ناکام کیے یا ان کے مواد کو errors میں ظاہر کیے۔

ہر span زیادہ سے زیادہ 32 ہیڈرز، ہر ہیڈر کے لیے 16 قدریں، فی قدر 4096 UTF-8 بائٹس،
اور کیپچر کیے گئے ہیڈر ناموں اور قدروں کے لیے مجموعی طور پر 16384 UTF-8 بائٹس رکھ سکتا ہے۔
حد سے بڑے/غلط ہیڈرز کو مکمل طور پر خارج کیا جاتا ہے، کاٹا نہیں جاتا۔ Selection ایک operator privacy فیصلہ ہے:
بظاہر محفوظ ناموں میں بھی ذاتی ڈیٹا شامل ہو سکتا ہے، اور یہ حدود/detectors عمومی PII scrubber نہیں ہیں۔

### ترسیل کی حدود

درخواستیں 500 spans اور 4 MiB UTF-8 JSON تک محدود ہیں، envelope سمیت۔
cursor batch کی پہلی درخواست سے پہلے ہر allowed span کا سائز چیک کیا جاتا ہے۔ حد سے بڑا انفرادی
span اس batch کا کوئی حصہ نہیں بھیجتا اور `maxBodyBytes` کم کرنے کی ہدایت کے ساتھ ناکام ہو جاتا ہے؛
اسے خاموشی سے خارج نہیں کیا جاتا۔ Preflight صرف record references اور byte counts برقرار رکھتا ہے،
ہر عارضی span/JSON کو خارج کر دیتا ہے؛ spans کو bounded chunks کے لیے دوبارہ بنایا جاتا ہے،
تاکہ batch کی دوسری serialized copy برقرار نہ رکھنی پڑے۔ HTTP 408/429/5xx، network failures اور timeouts کو زیادہ سے زیادہ
تین کوششیں ملتی ہیں، جن کے لیے 250/500 ms کی exponential backoff استعمال ہوتی ہے۔ `Retry-After` کے seconds یا HTTP dates
تاخیر کو 5 seconds تک بڑھا سکتے ہیں۔ دیگر statuses فوراً ناکام ہو جاتے ہیں۔ OTLP 2xx partial rejection بھی
exception پھینکتی ہے، بجائے اس کے کہ ضائع شدہ span کو acknowledge کیا جائے؛ خالی یا درست JSON acknowledgements قبول کیے جاتے ہیں،
اور response-read کی حد 64 KiB ہے۔

Errors میں صرف exporter کے زیر ملکیت حقائق شامل ہوتے ہیں: HTTP status، retry class، attempts اور بھیجے گئے span
counts، یا acknowledgement/network failure کی مقررہ wording۔ Collector response bodies،
partial-success counts اور response headers کو errors، logs یا dashboard میں کبھی نقل نہیں کیا جاتا۔
ناکام یا جزوی طور پر قبول شدہ batch کو acknowledge نہیں کیا جاتا: destination اس status کے ساتھ
Failing دکھاتا ہے، cursor آخری acknowledged batch پر برقرار رہتا ہے، اور اگلی run
انہی rows کو دوبارہ بھیجتی ہے۔ مستقل statuses اس وقت تک failing رہتے ہیں جب تک collector یا configuration درست نہ کی جائے۔
response کی تفصیلات کے لیے collector کے اپنے logs استعمال کریں۔ Call-log error summaries اپنی الگ redaction برقرار رکھتے ہیں۔
`prepare()` کچھ provision نہیں کرتا؛ Test عین `{"resourceSpans":[]}` پوسٹ کرتا ہے اور
call-log spans لکھے بغیر HTTP status رپورٹ کرتا ہے۔

Trace ids اور span ids، SHA-256 کے پہلے 32/16 hex digits ہوتے ہیں، جو
`"omniroute.trace\\0" + callLogId` اور `"omniroute.span\\0" + callLogId` پر لاگو کیا جاتا ہے۔
دوبارہ بھیجے گئے spans میں یہی ids برقرار رہتی ہیں۔ یہ deduplication کی ضمانت نہیں ہے: کچھ backends،
جن میں Langfuse v4 ingestion بھی شامل ہے، ایک ہی id والے spans کو deduplicate نہیں کرتے۔
کسی crash یا جزوی chunk failure کی صورت میں زیادہ سے زیادہ ایک غیر acknowledged cursor batch دوبارہ بھیجا جا سکتا ہے؛
پورا batch duplicate ہو سکتا ہے، صرف اس کا آخری HTTP chunk نہیں۔ اس tradeoff کو مدنظر رکھتے ہوئے
cursor batch size منتخب کریں۔

### Langfuse کی مثال

Self-hosted Langfuse instance کے لیے یہ fields ترتیب دیں:

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

Authorization value مقامی طور پر literal `public-key:secret-key`
string کے Base64 کے طور پر بنائیں (مثال کے طور پر `Buffer.from(publicKey + ":" + secretKey).toString("base64")` کے ساتھ)۔
حقیقی credentials کو logs، screenshots یا issues میں paste نہ کریں۔ یہ mapping خودکار طور پر
`x-langfuse-ingestion-version: 4` سیٹ کرتی ہے؛ Authorization اب بھی `headers` میں فراہم کرنا ضروری ہے۔
دونوں headers اور تیار کردہ identity salt، موجودہ encrypted secret-field mechanism اور API placeholders استعمال کرتے ہیں؛
`STORAGE_ENCRYPTION_KEY` درکار ہے۔

میپنگ میں جنریشن کی قسم/ماڈل، JSON استعمال کی تفصیلات (input/output/total اور دستیاب
cache keys)، JSON input/output اسنیپ شاٹس، ERROR/DEFAULT لیول، صاف کیا گیا اسٹیٹس میسج،
trace name، session id، اختیاری environment، اور provider، requested model، path، combo، cache
source اور status کے لیے filterable
`langfuse.observation.metadata.<key>` شامل کیے جاتے ہیں۔ `langfuse.observation.completion_start_time`،
شروع ہونے کے وقت + TTFT، صرف اسی وقت ISO 8601 میں ہوتا ہے جب TTFT معلوم ہو اور دورانیے کے اندر
ہو۔ لاگت سے متعلق کوئی attributes نہیں بھیجے جاتے۔

شناخت کے موڈز `langfuse.user.id` پر لاگو ہوتے ہیں:

- `pseudonymous` (پہلے سے طے شدہ): API key کے اندرونی id کا HMAC-SHA256، جس میں ہر destination کے
  لیے بے ترتیب 32-byte salt استعمال ہوتا ہے۔ اگر salt موجود نہ ہو تو creation کے وقت تیار کیا جاتا ہے،
  `identitySalt` کے طور پر encrypt کیا جاتا ہے، کبھی واپس نہیں کیا جاتا، اور edits کے دوران برقرار رہتا ہے۔
  خام key ids کبھی بھی span attributes میں شامل نہیں کیے جاتے۔ کسی destination کا salt دوبارہ بنانا/rotate
  کرنا identities تبدیل کر دیتا ہے۔
- `keyName`: configured API key name، جس سے operator label جان بوجھ کر ظاہر ہوتا ہے۔
- `none`: کوئی user id نہیں۔ موجود ہونے پر session tags پھر بھی export کیے جاتے ہیں؛ یہ موڈز من مانے
  prompt content یا operator کی فراہم کردہ session/correlation labels کو anonymize نہیں کرتے۔

### بیک فل کے بغیر آغاز

صرف creation کے وقت **Start from current position (skip existing logs)** فعال کریں، یا create API payload
کی top level پر `startFromCurrentPosition: true` پاس کریں۔ یہ موجودہ محفوظ شدہ call-log rowid کی زیادہ سے
زیادہ قدر کے لیے موجودہ cursor helpers استعمال کرتے ہوئے `cursor_row_id` کو initialize کرتا ہے، اور اس کے
لیے migration درکار نہیں ہوتی۔ پہلے سے طے شدہ قدر false ہے (cursor 0 اور محفوظ شدہ تاریخ کا backfill)۔
یہ update-time cursor reset setting نہیں ہے۔

مشترکہ `ttftMs` کا اضافہ BigQuery mapper اور new-table schema میں nullable `ttft_ms` column بھی شامل کرتا ہے:
اس کے schema test کے لیے ضروری ہے کہ ہر canonical record field کے لیے ایک column موجود ہو۔ موجودہ tables
بغیر تبدیلی کے export ہوتی رہتی ہیں: `prepare()` table schema پڑھتا ہے اور صرف اس وقت `ttft_ms` کو خارج کرتا ہے
جب وہ column موجود نہ ہو۔ اگلی run میں TTFT حاصل کرنے کے لیے nullable INT64 column شامل کریں، یا نئی table
استعمال کریں۔ اختیاری TTFT column schema update شروع نہیں کرتا۔ Usage-evidence columns ذیل میں دیے گئے
conditional، opt-in compatibility flow کی پیروی کرتے ہیں؛ دیگر row fields کے لیے strict schema checking برقرار
رہتی ہے۔

---

## 6. منزل شامل کرنا

1. `src/lib/logExport/destinations/<name>.ts` بنائیں جو ایک `LogExportDestinationType` ایکسپورٹ کرے:
   ایک Zod `configSchema`، UI کے لیے `fields` کی وضاحتی صف، `secretFields`، اور ایک
   `createClient(config)` جو `test()` / `prepare()` / `send(records)` واپس کرے۔
2. اسے `src/lib/logExport/registry.ts` میں موجود `DESTINATIONS` صف میں شامل کریں۔
3. `tests/unit/` کے تحت ٹیسٹ لکھیں۔

بس یہی پوری تبدیلی ہے: مستقل ذخیرہ کاری، cron جاب، REST تہہ، خفیہ معلومات کی رمزکاری اور
ڈیش بورڈ فارم سب رجسٹری سے پڑھتے ہیں۔

نئی منزل کے لیے دو اصول:

- جزوی ناکامی پر `send()` **کو لازماً استثنا پھینکنا چاہیے**۔ کامیابی سے مکمل ہونے کا مطلب ہے کہ "منزل کے پاس یہ قطاریں موجود ہیں"،
  اور کرسر مستقل طور پر ان سے آگے بڑھ جاتا ہے۔
- ایسی منزل جو صارف کا فراہم کردہ URL قبول کرتی ہو، اسے درخواست بھیجنے سے پہلے
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) کے ذریعے اس کی توثیق کرنی چاہیے،
  بالکل ویسے ہی جیسے ویب ہُکس کرتے ہیں۔ BigQuery کو اس کی ضرورت نہیں: اس کے میزبان مستقل ہیں۔

---

## 7. اسے چلانا

- **ڈیش بورڈ**: انضمامات → لاگ برآمد۔ ایک منزل شامل کریں، اسناد جانچنے کے لیے **جانچ** چلائیں
  بغیر قطاریں لکھے، پھر اسے فعال کریں۔
- **بیک لاگ**: ہر منزل کا کارڈ زیر التوا قطاریں اور کرسر دکھاتا ہے؛ `GET
/api/log-export/status` وہی اعداد و شمار نیز آخری 20 جاب رنز واپس کرتا ہے۔
- **کسی ایک ناکام منزل سے دوسری منزلیں ناکام نہیں ہوتیں** — رن کا خلاصہ `last_status` /
  `last_error` میں فی منزل اسٹیٹس درج کرتا ہے، جبکہ جاب رن کی تاریخ مجموعی اسٹیٹس محفوظ رکھتی ہے۔
- **کسی منزل کو حذف کرنے سے اس کا کرسر بھی حذف ہو جاتا ہے۔** اسے دوبارہ شامل کرنے پر یہ محفوظ شدہ
  قدیم ترین کال لاگ سے شروع ہوتا ہے، جس سے وہ قطاریں دوبارہ بھیجی جاتی ہیں جو منزل کے پاس پہلے ہی
  موجود ہو سکتی ہیں۔ BigQuery میں فی قطار `insertId` صرف BigQuery کی اپنی نقل ختم کرنے کی مدت کے
  اندر اس صورتِ حال کو سنبھالتا ہے، اس لیے منزل کو حذف کرنے کے بجائے اسے غیر فعال کرنا بہتر ہے۔

### استعمال کے ثبوت کے اسکیما کی مطابقت

نئی BigQuery ٹیبلز میں nullable `usage_evidence` (JSON پر مشتمل STRING) اور
`usage_estimated` (BOOL) شامل ہوتے ہیں۔ `autoCreate` فعال ہونے پر، موجودہ ٹیبل میں صرف یہ
غائب nullable کالم شامل کیے جا سکتے ہیں۔ ایکسپورٹر فیلڈ میٹا ڈیٹا سمیت پورے موجودہ اسکیما کو
برقرار رکھتا ہے، اور واپس کیے گئے etag کا استعمال کرتے ہوئے مشروط PATCH بھیجتا ہے۔ بیک وقت
ہونے والی اسکیما تبدیلی ایکسپورٹ کو ناکام بنا دیتی ہے، بجائے اس کے کہ اسے اوور رائٹ کیا جائے؛
اگلا رن ٹیبل دوبارہ پڑھتا ہے۔

`autoCreate` غیر فعال ہونے پر، استعمال کے ثبوت والے ریکارڈز ایکسپورٹ کرنے سے پہلے یہ کالم خود
شامل کریں۔ اسکیما/etag میٹا ڈیٹا کا غائب ہونا یا ناکام اپ ڈیٹ ثبوت پر مشتمل انسرٹس کو بھی روک
دیتا ہے۔ اس ناکامی پر ایکسپورٹ کرسر آگے نہیں بڑھتا اور ثبوت کبھی خاموشی سے ضائع نہیں ہوتا۔
ایکسپورٹ رکے ہونے کے دوران بھی مقامی لاگ برقرار رکھنے کی پالیسی نافذ رہتی ہے، اس لیے محفوظ شدہ
ماخذ قطاروں کے ختم ہونے سے پہلے ناکامی حل کریں۔
