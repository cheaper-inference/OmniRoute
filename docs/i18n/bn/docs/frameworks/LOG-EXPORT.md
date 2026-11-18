# Log export (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute কল লগ ধারাবাহিকভাবে, ক্রমবর্ধমান পদ্ধতিতে একটি বাহ্যিক অ্যানালিটিক্স স্টোরে এক্সপোর্ট।

ড্যাশবোর্ডের লগ ট্যাব SQLite-এ (`call_logs`) অনুরোধের ইতিহাস সংরক্ষণ করে, যা
রোটেশন ও রিটেনশনের সীমার মধ্যে থাকে। লগ এক্সপোর্ট নির্ধারিত সময়সূচি অনুযায়ী একই রেকর্ডসমষ্টি বাইরে পাঠায়, যাতে তা
স্থানীয় ডেটাবেসের চেয়ে বেশি সময় টিকে থাকতে পারে এবং অন্যান্য ডেটার সঙ্গে জয়েন করা যায়। BigQuery হলো প্রথম গন্তব্য;
পাইপলাইনটি একটি রেজিস্ট্রি, তাই আরও গন্তব্য যোগ করা যায়।

---

## 1. এটি যেভাবে কাজ করে

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **সময়সূচি** — একটি `JobRegistry` cron জব, `log_export`, যার ডিফল্ট `0 * * * *` (প্রতি ঘণ্টায়,
  UTC)। এটি `src/lib/initCloudSync.ts`-এ নিবন্ধিত; `OMNIROUTE_LOG_EXPORT_CRON` দিয়ে ওভাররাইড করা যায়।
  প্রতিটি টিকে সব **সক্রিয়** গন্তব্য থেকে ক্রমানুসারে এক্সপোর্ট সম্পন্ন করা হয়।
- **কার্সর** — SQLite-এর অন্তর্নিহিত `call_logs.rowid`, যা প্রতিটি গন্তব্যের জন্য
  `log_export_destinations.cursor_row_id`-এ স্থায়ীভাবে সংরক্ষিত থাকে। ইচ্ছাকৃতভাবেই `timestamp`-কে কার্সর করা হয়নি: কলাররা
  নিজেদের মান দিতে পারে, ফলে পরে শুরু হওয়া দ্রুত অনুরোধের পরেও কোনো ধীর অনুরোধ লেখা হতে পারে,
  এবং টাইমস্ট্যাম্প কার্সর সেটি বাদ দিয়ে দিত।
- **ব্যাচিং** — প্রতি অনুরোধে `batch_size` সারি (ডিফল্ট 500), প্রতি রানে `max_rows_per_run` সারি
  (ডিফল্ট 10000), যাতে বড় ব্যাকলগ একটি টিক আটকে না রেখে কয়েকটি টিক জুড়ে এক্সপোর্ট হয়।
- **ডেলিভারি** — `send()` সফলভাবে সম্পন্ন হওয়ার পরেই কার্সর এগোয়। কোনো ব্যাচ ব্যর্থ হলে
  কার্সর আগের অবস্থানেই থাকে, ফলে পরবর্তী রানে একই সারিগুলো আবার চেষ্টা করা হয়। এখানে নিশ্চয়তা হলো
  অন্তত একবার ডেলিভারি এবং গন্তব্যে ডি-ডুপ্লিকেশন, প্রকৃত অর্থে ঠিক একবার ডেলিভারি নয়: BigQuery প্রতিটি
  সারির কী হিসেবে কল-লগ আইডি ব্যবহার করে, যা তার নিজস্ব ডিডুপ উইন্ডোর মধ্যে যথাসাধ্য কার্যকর করে।
- **ওভারল্যাপ প্রতিরোধ** — cron টিক এবং `POST .../run` একসঙ্গে চালু হতে পারে। কোনো গন্তব্যের
  এক্সপোর্ট ইতিমধ্যে চললে সেটি দুবার চালানোর বদলে বাদ দেওয়া হয় (রানের ফলে `skipped: true`),
  তাই সমসাময়িক কোনো রান একই ব্যাচ আবার পাঠাতে বা কার্সরকে পেছনে লিখতে পারে না।
- **পার্জ থেকে পুনরুদ্ধার** — যদি `cursor_row_id`, `MAX(rowid)`-এর চেয়ে বড় হয়ে যায় (পুরো টেবিল
  পার্জ করা হয়েছে এবং rowid আবার শুরু হয়েছে), রানার স্থায়ীভাবে নতুন রেকর্ড দেখতে ব্যর্থ না হয়ে 0-তে ফিরে যায়।

### বিচ্ছিন্ন রানার ও সীমা

Node-এ প্রতিটি গন্তব্যের রান একটি পৃথক, স্বল্পস্থায়ী OS চাইল্ড প্রসেস চালু করে (IPC-সহ `child_process`,
`worker_threads` নয়)। বডি পড়া, পেলোড JSON পার্সিং/সিরিয়ালাইজেশন, গন্তব্যের
`prepare()` এবং গন্তব্যের নেটওয়ার্ক I/O—সবই সেখানে চলে, সার্ভারের ইভেন্ট লুপে নয়।
শুধু কনফিগারেশন ও ছোট অগ্রগতির বার্তা IPC পার হয়; এক্সপোর্ট করা রেকর্ড কখনো
সার্ভারে ফিরে আসে না। cron জব ও এখনই চালানোর রুট একই পাবলিক ফলাফল এবং ওভারল্যাপ প্রতিরোধ বজায় রাখে।

চাইল্ড প্রসেস `node:sqlite` ব্যবহার করে সার্ভারের রিজলভ করা `DATA_DIR/storage.sqlite` শুধু-পঠন মোডে খোলে,
সঙ্গে থাকে `busy_timeout=5000` এবং `query_only=ON`। এটি কোনো DB সিঙ্গলটন ইমপোর্ট করে না এবং কোনো
মাইগ্রেশন, ব্যাকআপ বা SQLite আপডেটও করে না। অনুপস্থিত/ক্ষতিগ্রস্ত আর্টিফ্যাক্টের হিসাবরক্ষণ (ক্ষতিগ্রস্ত আর্টিফ্যাক্টের
UPDATE-সহ) শুধু ড্যাশবোর্ডের বিস্তারিত দেখার পথেই থাকে। উভয় পথই একটি বিশুদ্ধ
ডিটেইল রিজলভার ব্যবহার করে; এক্সপোর্টে অ্যাসিঙ্ক্রোনাস ফাইলসিস্টেম রিড এবং একই আর্টিফ্যাক্ট → লেগ্যাসি
ইনলাইন → লেগ্যাসি ডিস্ক → কিছুই নয় রিজলিউশন ক্রম ব্যবহৃত হয়। চাইল্ড তার রিডার খোলার সময় একটি রান সর্বোচ্চ ইনসার্শন rowid-এর
স্ন্যাপশট নেয়; পরে ইনসার্ট হওয়া রেকর্ড পরবর্তী রানের জন্য অপেক্ষা করে। এটি একটি ইনসার্শন
সীমানা, দীর্ঘস্থায়ী SQLite ট্রানজ্যাকশন নয়: নেটওয়ার্কের জন্য অপেক্ষার সময় WAL রাইটার ও চেকপয়েন্ট অবাধে কাজ করতে পারে।
এই সীমানা বিদ্যমান সারির আপডেট/ডিলিশন স্থগিত করে না।

প্রতিটি গৃহীত ব্যাচের পর চাইল্ড একটি স্বীকৃতির জন্য অপেক্ষা করে। সার্ভার প্রথমে
`advanceLogExportCursor` দিয়ে কার্সর স্থায়ীভাবে সংরক্ষণ করে, তারপর `ack` পাঠায়; তার আগে পরবর্তী ব্যাচ শুরু হয় না।
পাঠানো ব্যর্থ হলে, ক্র্যাশ হলে বা টাইমআউট হলে সেই ব্যাচের কার্সর না এগিয়েই ব্যর্থতা রেকর্ড করা হয়। আগে
স্বীকৃত ব্যাচগুলো কমিট করা অবস্থায় থাকে; সর্বোচ্চ শুধু একটি অস্বীকৃত ব্যাচই আবার পাঠানো হতে পারে।
`done` এবং চাইল্ডের স্বাভাবিক প্রস্থানের পরেই সফলতা রেকর্ড করা হয়। ব্যর্থ হলে SIGTERM দিয়ে চাইল্ড বন্ধ করা হয়,
500 ms পরে প্রয়োজনে SIGKILL ব্যবহার করা হয়, এবং রানার প্রসেস বন্ধ হওয়া পর্যন্ত অপেক্ষা করে।

| এনভায়রনমেন্ট ভেরিয়েবল                       | ডিফল্ট | উদ্দেশ্য                                   |
| --------------------------------------------- | ------ | ------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | প্রতি গন্তব্যে প্রকৃত অতিবাহিত সময়ের সীমা |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | MB-তে চাইল্ডের V8 old-space সীমা           |

অবৈধ/অ-ধনাত্মক/অ-পূর্ণসংখ্যা মানের ক্ষেত্রে ডিফল্ট ব্যবহৃত হয়। হিপ সেটিংটি মোট
RSS-এর সীমা নয়; খুব বড় ব্যাচ তবুও চাইল্ডের মেমরি নিঃশেষ করতে পারে এবং রানকে নিরাপদে ব্যর্থ করতে পারে।
1024 MB ডিফল্টটি বডি সক্রিয় থাকা অবস্থায় 512 KiB আর্টিফ্যাক্টের ডিফল্ট 500-সারির ব্যাচের জন্য অতিরিক্ত জায়গা রাখে,
যার মধ্যে BigQuery-এর বাইট-চাঙ্কভিত্তিক JSON সিরিয়ালাইজেশনও অন্তর্ভুক্ত। এটি
বডিসহ 10000-সারির ব্যাচকে নিরাপদ করে না। V8 হিপ নিঃশেষ হলে করণীয় নির্দেশনাসহ ব্যর্থতা রেকর্ড করা হয়: ব্যাচের
আকার কমান অথবা `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` বাড়ান; কার্সর সর্বশেষ
স্বীকৃত ব্যাচেই থাকে। পুরোনো ইনলাইন/ডিস্ক বডিগুলো আধুনিক আর্টিফ্যাক্টের আকারসীমার আওতায় পড়ে না।
অপারেটরদের আলাদাভাবে RSS-এর জন্য মেমরি বরাদ্দের পরিকল্পনা করতে হবে, বিশেষত মেমরি-সীমিত কনটেইনারের মধ্যে।

চাইল্ড প্রক্রিয়া শুধু রিজলভ করা `DATA_DIR`, `NODE_ENV`, স্পষ্টভাবে নির্ধারিত `TZ` (লিগ্যাসি ফাইলনামের
স্থানীয় সময় রিজলিউশন), উপস্থিত থাকলে `ELECTRON_RUN_AS_NODE`, এবং নিচের আউটবাউন্ড ইনপুটগুলো উত্তরাধিকারসূত্রে পায়:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (এবং এগুলোর ছোট হাতের রূপ),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`।
একটি গ্লোবাল Undici ডিসপ্যাচার সার্ভারের সম্পূর্ণ এনভায়রনমেন্ট-ভিত্তিক প্রক্সি রিজলিউশন এবং স্থানীয় হোস্ট
বাইপাসের নিয়মগুলো ব্যবহার করে, যার মধ্যে `NO_PROXY`-ও রয়েছে; এটি `proxyFetch.ts` বা তার DB/ফিচার ফ্ল্যাগ ইমপোর্ট করে না।
ফরোয়ার্ড করা আউটপুট এবং রেকর্ড করা ত্রুটি থেকে প্রক্সির ক্রেডেনশিয়াল আড়াল করা হয়। গন্তব্যের ক্রেডেনশিয়াল
শুধু একটি প্রারম্ভিক IPC বার্তায় পাঠানো হয়, কখনো argv বা এনভায়রনমেন্টে নয়; আউটপুট/ত্রুটি ফরোয়ার্ড করার সময়
প্রিফিক্স যোগ করা হয় এবং সংবেদনশীল তথ্য সরানো হয়। প্রতিবার cron চলার সময় Node-এর SQLite সতর্কতা পুনরাবৃত্তি
এড়াতে চাইল্ডের exec আর্গুমেন্টে শুধু `ExperimentalWarning` নিষ্ক্রিয় করা হয়; অন্য ধরনের সতর্কতা দৃশ্যমান থাকে।

গন্তব্য মডিউলগুলো অবশ্যই Next.js/server-only নির্ভরতা ছাড়াই ইমপোর্টযোগ্য হতে হবে। বিদ্যমান
BigQuery ইমপ্লিমেন্টেশন ইতিমধ্যেই এই শর্ত পূরণ করে। অ্যাক্সেস-টোকেন ক্যাশ শুধু চাইল্ডের
একবার চলার সময় পর্যন্ত থাকে, একাধিক রানজুড়ে নয়। Node হলো সমর্থিত রানটাইম (`package.json` engines), তবে README-এর Bun
ইনস্টলেশন বিভাগ এবং `Dockerfile.bun`-ও `bun:sqlite` (`src/lib/db/core.ts` / অ্যাডাপ্টার) ব্যবহার করে
প্রোডাকশন সামঞ্জস্যের একটি পথের কথা জানায়। তাই Bun-এর অধীনে এক্সপোর্ট আগের
ইন-প্রসেস পদ্ধতি বজায় রাখে এবং একবার সতর্কতা দেখায়: চাইল্ড হিপ/টাইমআউট আইসোলেশন উপলভ্য নয়। ইভেন্ট-লুপ
এবং OOM আইসোলেশনের জন্য Node ব্যবহার করুন; এখানে Bun-কে শুধু ডেভেলপমেন্টের জন্য বিবেচনা করা হয় না।

`includeBodies` সক্রিয় থাকলে, ঘণ্টাভিত্তিক পেলোডের ব্যাকলগ জমতে না দিয়ে
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`-এর মতো মিনিট-ভিত্তিক সময়সূচি বেছে নিন।
ব্যাচ এবং সারির সীমা তখনও প্রতিটি রানকে সীমাবদ্ধ রাখে। প্রতি রানে প্রতিটি গন্তব্যের জন্য প্রক্রিয়া চালুর খরচ হয়;
এতে সামান্য স্টার্টআপ খরচের বিনিময়ে সার্ভারের ইভেন্ট-লুপ আইসোলেশন পাওয়া যায়, মোট CPU ব্যবহার কমে না।

### পেলোড (প্রম্পট এবং কমপ্লিশন)

ডিফল্টভাবে এক্সপোর্টে শুধু সেই সারসংক্ষেপ ফিল্ডগুলো থাকে, যা লগের **তালিকা** দেখায়।
**প্রম্পট এবং রেসপন্স এক্সপোর্ট করুন** (`includeBodies`) চালু করলে প্রতিটি কলের জন্য লগের **বিস্তারিত**
প্যানেলে দেখানো তথ্যও পাঠানো হয়:

| ফিল্ড                            | এতে যা থাকে                                            |
| -------------------------------- | ------------------------------------------------------ |
| `request_body` / `response_body` | ড্যাশবোর্ডে যেভাবে দেখানো হয়, সেই কল পেলোডগুলো        |
| `pipeline_route_decision`        | রাউটার কোন টার্গেট এবং মডেল বেছে নিয়েছে               |
| `pipeline_client_request`        | ক্লায়েন্টের পাঠানো হুবহু অপরিবর্তিত রিকোয়েস্ট        |
| `pipeline_openai_request`        | অভ্যন্তরীণ OpenAI কাঠামোতে রূপান্তরের পরের রূপ         |
| `pipeline_provider_request`      | প্রোভাইডারের ফরম্যাটে আসলে আপস্ট্রিমে যা পাঠানো হয়েছে |
| `pipeline_provider_response`     | অপরিবর্তিত আপস্ট্রিম রেসপন্স                           |
| `pipeline_client_response`       | কলারকে যা ফেরত দেওয়া হয়েছে                           |
| `pipeline_error`                 | ব্যর্থ কলের পাইপলাইন-স্তরের ত্রুটির বিস্তারিত          |
| `bodies_truncated`               | উপরের কোনো ফিল্ড `maxBodyBytes` সীমায় পৌঁছালে True    |

এটি প্রম্পটের বিষয়বস্তু, তাই এটি **ডিফল্টভাবে বন্ধ** এবং ইচ্ছাকৃতভাবেই প্রতিটি গন্তব্যের জন্য আলাদাভাবে বেছে নিতে হয়।
ড্যাশবোর্ডে যা দেখানো হয়, সেটিই পাঠানো হয়, কারণ এক্সপোর্ট এবং `getCallLogById` একই বিস্তারিত তথ্য
রিজলিউশন ব্যবহার করে: পেলোড
লেখার সময়ই ব্যক্তিগতভাবে শনাক্তযোগ্য তথ্য (PII) স্যানিটাইজ করা হয় এবং গোপন তথ্য আড়াল করা হয়, আর
`noLog` API কী দিয়ে করা কলে কোনো পেলোডই সংরক্ষিত হয় না, তাই এক্সপোর্ট করার মতো কিছু থাকে না।

প্রতিটি সারির পেলোড ফাইলসিস্টেম আর্টিফ্যাক্ট থেকে পড়া হয়, তাই শুধু যেসব গন্তব্য
এটি চেয়েছে, সেগুলোর জন্যই হাইড্রেশন চলে। কোনো আর্টিফ্যাক্ট অনুপস্থিত বা ক্ষতিগ্রস্ত হলে ব্যাচ ব্যর্থ করে
কার্সর আটকে দেওয়ার বদলে null পেলোডসহ তার সারসংক্ষেপ এক্সপোর্ট করা হয়।

`maxBodyBytes` (ডিফল্ট 262144) প্রতিটি ফিল্ডের আকার সীমিত করে। বড় পেলোড **বাদ না দিয়ে
ছেঁটে দেওয়া হয়** — ছাঁটা প্রম্পটও "কী জিজ্ঞেস করা হয়েছিল" তার উত্তর দেয় — এবং সারিটিকে
`bodies_truncated` দিয়ে চিহ্নিত করা হয়। স্ট্রিম করা খণ্ডভিত্তিক ডেল্টা এক্সপোর্ট করা হয় না; একত্রিত রেসপন্স
ইতিমধ্যেই `pipeline_provider_response` এবং `pipeline_client_response`-এ থাকে।

---

## 2. ফাইলসমূহ

| অংশ                     | অবস্থান                                      |
| ----------------------- | -------------------------------------------- |
| গন্তব্যের চুক্তি        | `src/lib/logExport/types.ts`                 |
| রেজিস্ট্রি              | `src/lib/logExport/registry.ts`              |
| গোপন তথ্য ব্যবস্থাপনা   | `src/lib/logExport/secrets.ts`               |
| রানার (প্যারেন্ট IPC)   | `src/lib/logExport/runner.ts`                |
| প্রসেসের জীবনচক্র       | `src/lib/logExport/childRunner.ts`           |
| চাইল্ড এন্ট্রি          | `src/lib/logExport/exportChild.ts`           |
| শুধু-পঠন ওপেনার         | `src/lib/db/logExportReadOnly.ts`            |
| ভাগ করা কোয়েরি/ম্যাপিং | `src/lib/usage/callLogExportQueries.ts`      |
| বিস্তারিত তথ্য রিজলভার  | `src/lib/usage/callLogDetailResolver.ts`     |
| API প্রজেকশন            | `src/lib/logExport/presenter.ts`             |
| BigQuery গন্তব্য        | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA প্রমাণীকরণ    | `src/lib/logExport/googleServiceAccount.ts`  |
| কল-লগের উৎস             | `src/lib/usage/callLogExportSource.ts`       |
| স্থায়ী সংরক্ষণ         | `src/lib/db/logExportDestinations.ts`        |
| Cron জব                 | `src/lib/jobs/logExportJob.ts`               |
| REST স্তর               | `src/app/api/log-export/`                    |
| ড্যাশবোর্ড পৃষ্ঠা       | `src/app/(dashboard)/dashboard/log-export/`  |

স্কিমা: `src/lib/db/migrations/170_log_export_destinations.sql`।

---

## 3. REST API

সব রুটে ম্যানেজমেন্ট প্রমাণীকরণ প্রয়োজন (`requireManagementAuth`)। গোপন তথ্য কখনো ফেরত দেওয়া হয় না:
সংরক্ষিত গোপন তথ্যের পরিবর্তে আক্ষরিক `__stored__` ফেরত আসে, এবং আপডেটের সময় সেই মান ফেরত পাঠালে
সংরক্ষিত ক্রেডেনশিয়াল অপরিবর্তিত থাকে।

যে গন্তব্যের টাইপে গোপন তথ্য ঘোষিত আছে, সেটি তৈরি বা আপডেট করতে **`STORAGE_ENCRYPTION_KEY`
প্রয়োজন**। এটি ছাড়া `encrypt()` নীরবে ইনপুট অপরিবর্তিত রাখে, তাই SQLite-এ প্লেইনটেক্সটে ক্রেডেনশিয়াল রাখার পরিবর্তে
400 দিয়ে লেখার অনুরোধ প্রত্যাখ্যান করা হয় (Telegram webhook-ও একই সুরক্ষা
প্রয়োগ করে)।

| পদ্ধতি   | পাথ                                      | উদ্দেশ্য                                                           |
| -------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | গন্তব্যের টাইপ + সেগুলোর কনফিগারেশন ফিল্ডের তালিকা                 |
| `GET`    | `/api/log-export/destinations`           | গন্তব্যগুলোর তালিকা (গোপন তথ্য আড়াল করা)                          |
| `POST`   | `/api/log-export/destinations`           | একটি গন্তব্য তৈরি করা                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | একটি গন্তব্য পড়া                                                  |
| `PUT`    | `/api/log-export/destinations/{id}`      | নাম / সক্রিয় অবস্থা / কনফিগারেশন / ব্যাচিং আপডেট করা              |
| `DELETE` | `/api/log-export/destinations/{id}`      | মুছে ফেলা                                                          |
| `POST`   | `/api/log-export/destinations/{id}/test` | ক্রেডেনশিয়াল যাচাই করা, কিছু না লেখা                              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | এখনই জমে থাকা লগ রপ্তানি করা, নির্ধারিত রানের মতো একই প্রক্রিয়ায় |
| `GET`    | `/api/log-export/status`                 | Cron-এর অবস্থা, সাম্প্রতিক রান, প্রতি গন্তব্যে জমে থাকা কাজ        |

`GET /api/log-export/types`-ই UI-কে সাধারণভাবে ব্যবহারযোগ্য করে: ফেরত পাওয়া ফিল্ডের বিবরণ থেকে
ড্যাশবোর্ড ফর্ম রেন্ডার করা হয়, তাই নতুন গন্তব্যের জন্য UI পরিবর্তনের প্রয়োজন হয় না।

---

## ৪. BigQuery গন্তব্য

কনফিগারেশন কী (`type: "bigquery"`):

| কী                   | নোট                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `projectId`          | ডেটাসেট ধারণকারী GCP প্রজেক্ট                                                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                     |
| `location`           | কেবল ডেটাসেট তৈরি করার সময় ব্যবহৃত হয় (ডিফল্ট `EU`)                                               |
| `serviceAccountJson` | সার্ভিস-অ্যাকাউন্ট কী। গোপনীয়: স্থির অবস্থায় এনক্রিপ্ট করা থাকে, কখনও ফেরত দেওয়া হয় না          |
| `autoCreate`         | অনুপস্থিত ডেটাসেট/টেবিল তৈরি করে; শর্তসাপেক্ষে nullable usage-evidence কলাম যোগ করে (ডিফল্ট `true`) |

সার্ভিস অ্যাকাউন্টটির টার্গেট টেবিলে `bigquery.tables.updateData` অনুমতি প্রয়োজন, আর
`autoCreate` চালু থাকলে `bigquery.datasets.create` / `bigquery.tables.create` অনুমতিও
প্রয়োজন। বিদ্যমান টেবিলে দুটি nullable usage-evidence ফিল্ড যোগ করতে
`bigquery.tables.update`-ও প্রয়োজন। কোনো অনুমতি অনুপস্থিত থাকলে কার্সার এগিয়ে না দিয়েই
এক্সপোর্ট ব্যর্থ হয়।

একটি কনফিগার করা ব্যাচ হলো একটি **কার্সার ইউনিট**, HTTP ইউনিট নয়: `send()` এটিকে সর্বাধিক
৫০০টি সারির `insertAll` কলে ভাগ করে, তাই বড় `batch_size` BigQuery-এর ১০ MB রিকোয়েস্ট সীমা
অতিক্রম করাতে পারে না। সাময়িক স্ট্যাটাস (408/429/500/502/503/504) একই `insertIds` পুনর্ব্যবহার
করে exponential backoff সহ সর্বোচ্চ তিনবার পুনরায় চেষ্টা করা হয়; অথেনটিকেশন ও স্কিমা ব্যর্থতা
প্রথম প্রচেষ্টাতেই থ্রো হয়, ফলে রানটি অপ্রয়োজনীয়ভাবে চালানো হয় না।

কিছুক্ষণ আগে তৈরি করা একটি টেবিল streaming endpoint-এ এখনও দৃশ্যমান নাও হতে পারে, যা কয়েক
সেকেন্ডের জন্য 404 উত্তর দেয়। সেই 404 পুনরায় চেষ্টা করা হয়, তবে **শুধু তখনই যখন এই রান
টেবিলটি তৈরি করেছে** — সত্যিই অনুপস্থিত টেবিল হলে দ্রুত ব্যর্থ হয়। মনে রাখবেন, সম্প্রতি
ডিলিট করা টেবিলের নামেই পুনরায় টেবিল তৈরি করলে BigQuery কয়েক মিনিট streaming insert প্রত্যাখ্যান
করে; এটি delete-then-recreate-এর বৈশিষ্ট্য। তাই কোনো টেবিল ড্রপ করে পুনরায় যোগ করার বদলে নতুন
টেবিলের নাম ব্যবহার করাই ভালো।

**আংশিক ব্যর্থতা HTTP 200 এবং একটি non-empty `insertErrors[]` হিসেবে আসে।** এটিকে ব্যর্থতা
হিসেবে গণ্য করে থ্রো করা হয়, যার ফলে BigQuery গ্রহণ করেনি এমন সারিগুলোর পর কার্সার এগিয়ে যেতে
পারে না; `tests/unit/log-export-bigquery.test.ts` এই আচরণটি নিশ্চিত করে।

ট্রান্সপোর্ট সরল REST — একটি self-signed RS256 assertion
`https://oauth2.googleapis.com/token`-এ পাঠিয়ে একটি access token নেওয়া হয়, এরপর সারিগুলো
`tabledata.insertAll`-এ পাঠানো হয়। কোনো Google SDK আনা হয় না। অ্যাক্সেস টোকেনগুলো প্রতি
(সার্ভিস অ্যাকাউন্ট, scope) অনুযায়ী প্রসেসের ভেতরে ক্যাশ করা হয়।

তৈরি করা টেবিলে Logs ট্যাবের প্রতিটি ফিল্ডের জন্য একটি করে কলাম এবং `exported_at` থাকে, এবং
বাস্তবে কল লগ যেভাবে কোয়েরি করা হয় তার জন্য এটি নিম্নরূপ বিন্যস্ত:

- **`timestamp` অনুযায়ী দিনভিত্তিক পার্টিশন করা**, তাই তারিখ দিয়ে সীমাবদ্ধ কোনো কোয়েরি শুধু
  সেই দিনগুলোই স্ক্যান করে।
- **`api_key_name`, `provider`, `model`, `status` অনুযায়ী ক্লাস্টার করা** (এই ক্রমে), তাই
  কে এটি চালিয়েছে, কোথায় পাঠানো হয়েছে, অথবা এটি ব্যর্থ হয়েছে কি না—এসব দিয়ে ফিল্টার করলে
  প্রতিটি পার্টিশনের ভেতরের ব্লকগুলো বাদ দেওয়া যায়। BigQuery সর্বোচ্চ চারটি ক্লাস্টারিং কলাম
  অনুমোদন করে এবং ক্রম গুরুত্বপূর্ণ: শুধু `api_key_name`-এ ফিল্টার করলে প্রুনিং হয়, শুধু
  `status`-এ ফিল্টার করলে হয় না।
- `partitionExpirationDays`-এর মাধ্যমে **ঐচ্ছিক পার্টিশন রিটেনশন** (0 হলে সবকিছু রাখা হয়),
  যা টেবিল তৈরি করার সময় প্রয়োগ করা হয়।

উভয় সেটিংস তৈরির সময় প্রয়োগ করা হয়। বিদ্যমান টেবিল তার বর্তমান বিন্যাসই ধরে রাখে, তাই
আপনি এগুলো গ্রহণ করতে চাইলে গন্তব্যটি নতুন টেবিল আইডিতে নির্দেশ করুন।

`tests/unit/log-export-bigquery.test.ts` নিশ্চিত করে যে mapper এবং টেবিল স্কিমা পরস্পরের সঙ্গে
সামঞ্জস্যপূর্ণ থাকে, যাতে নতুন কোনো কল-লগ কলাম পথে নীরবে বাদ না পড়ে।

ব্যাচগুলো **সারি সংখ্যা এবং সিরিয়ালাইজ করা বাইট—উভয়** অনুযায়ী ভাগ করা হয়। পেলোড এক্সপোর্ট
করার পর শুধু সারি সংখ্যা যথেষ্ট নয়: prompt বহনকারী ৫০০টি সারির আকার কয়েক দশ মেগাবাইট হতে
পারে, আর ১০ MB-এর বেশি রিকোয়েস্ট `insertAll` প্রত্যাখ্যান করে। ৫০০টি সারি অথবা ৯ MB—যেটি
আগে আসে—সেখানে খণ্ড বন্ধ হয়।

---

## 5. OTLP/HTTP ট্রেস গন্তব্য

কনফিগারেশনে `type: "otlp-http"` ব্যবহার করা হয়। এটি সংরক্ষিত কল লগের একটি নির্ধারিত, কার্সর-সমর্থিত এক্সপোর্ট; এটি
`open-sse/services/routing/otel.ts`-এ থাকা সর্বোত্তম-প্রচেষ্টা ভিত্তিক লাইভ রাউটিং-ইভেন্ট সিঙ্ক নয়। এটি ওই সিঙ্কের পরিবেশ
ভেরিয়েবল, টাইমার বা বাফার পড়ে না এবং পরিবর্তনও করে না। উভয়টি সক্রিয় করলে দুই ধরনের স্বতন্ত্র স্প্যান তৈরি হতে পারে;
এই কল-লগ স্প্যানগুলো আলাদা করতে `omniroute.log-export` ইনস্ট্রুমেন্টেশন স্কোপ ব্যবহার করুন।

| Key                      | Default / purpose                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `endpoint`               | সম্পূর্ণ HTTP(S) ট্রেস URL আবশ্যক; কোনো `/v1/traces` সাফিক্স যুক্ত করা হয় না         |
| `headers`                | ঐচ্ছিক `Name: value` লাইন অথবা স্ট্রিংয়ের JSON অবজেক্ট; এনক্রিপ্ট করা হয়            |
| `requestHeaderAllowlist` | খালি (বন্ধ); স্প্যান অ্যাট্রিবিউট হিসেবে ক্যাপচার করার ক্লায়েন্ট হেডার নাম/প্রিফিক্স |
| `serviceName`            | `omniroute`; রিসোর্স `service.name`                                                   |
| `langfuseMapping`        | `false`; Langfuse generation/session/user অ্যাট্রিবিউট যুক্ত করে                      |
| `identity`               | `pseudonymous`, `keyName`, অথবা `none`                                                |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                               |
| `timeoutMs`              | প্রতি HTTP প্রচেষ্টায় `30000`                                                        |
| `environment`            | সেট করা নেই; ঐচ্ছিক `langfuse.environment`                                            |

জেনেরিক ড্যাশবোর্ড এই ফিল্ডগুলো রেন্ডার করে। `paths` একটি API অ্যারে অথবা
নতুন লাইন/কমা দিয়ে আলাদা করা সঠিক path-সমৃদ্ধ একটি textarea গ্রহণ করে। Embeddings, rerank এবং অন্যান্য path
স্পষ্টভাবে অনুমোদিত না হলে বাদ দেওয়া হয়। বাদ দেওয়া সারিগুলোও কার্সর এগিয়ে দেয়; বিদ্যমান
runner-এর `exported`/`exportedTotal` কাউন্টার গ্রহণ করা স্প্যান নয়, বরং ফিল্টার করা সারিসহ প্রক্রিয়াকৃত
সোর্স সারির সংখ্যা গণনা করে। ফিল্টারিং child-এ করা হয়, তার IPC/কার্সর কনট্রাক্ট পরিবর্তন না করেই।

URL যাচাইকরণ `src/shared/network/outboundUrlGuard.ts`-এর DB-মুক্ত
`parseAndValidateNonMetadataUrl` হেল্পার ব্যবহার করে: `block-metadata` নীতি। private URL অনুমোদিত থাকা
অবস্থায় webhook validator-এর মতো একই নিঃশর্ত metadata/protocol/embedded-credential পরীক্ষা এতে রয়েছে,
তবে ইচ্ছাকৃতভাবে কোনো global feature-flag override ছাড়াই localhost/LAN target অনুমোদন করে। এর ফলে
self-hosted Langfuse, Phoenix, Tempo এবং Collector endpoint, private HTTP endpoint-সহ, ব্যবহার করা যায়।
Cloud-metadata host সবসময় ব্লক করা হয়। Redirect অনুসরণ করা হয় না, তাই কোনো collector credential-কে
অন্য host-এ redirect করতে পারে না। বিদ্যমান lexical URL guard-এর মতো এটিও DNS resolution pin করে না;
শুধু অপারেটর-নিয়ন্ত্রিত host কনফিগার করুন। Endpoint trusted network-এ না থাকলে HTTPS ব্যবহার করাই শ্রেয়।

### Payload এবং delivery

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) অনুমোদিত প্রতি সারির জন্য একটি
CLIENT span বহন করে, যার নাম নির্দিষ্ট request path অনুযায়ী দেওয়া হয়। Path naming span name-এ model বা
identity data অন্তর্ভুক্ত না করেই Chat Completions, Responses এবং Messages আলাদা করে। Resource attribute-এ
`service.name` এবং package-এর `service.version` অন্তর্ভুক্ত থাকে।

সাধারণ chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) completion-এর সময়
`duration = Date.now() - startTime` লেখে এবং কোনো timestamp সরবরাহ করে না;
`src/lib/usage/callLogs.ts`-এর `saveCallLogOperation` timestamp-এর default হিসেবে write
(completion) time ব্যবহার করে। তাই export end = row timestamp এবং start = end − duration
(মিলিসেকেন্ডকে decimal nanoseconds-এ রূপান্তর করে) সেট করে। Caller-প্রদত্ত historical timestamp-ও end time
হিসেবে সংরক্ষিত হয়; প্রতি row-তে start/completion আলাদা করার কোনো নির্দেশক নেই। Null duration শূন্যে
রূপান্তরিত হয়। Invalid/missing timestamp batch ব্যর্থ করে, non-deterministic span তৈরি করে না। `ttftMs` nullable
এবং `omniroute.ttft_ms`-এ ম্যাপ হয়।

Attribute-এ `gen_ai.operation.name="chat"`, provider, requested/response model,
input/output tokens, ঐচ্ছিক cache-read/cache-creation/reasoning tokens, HTTP status,
combo, cache source, session tag এবং correlation id অন্তর্ভুক্ত থাকে। Integer OTLP value এবং timestamp
decimal string হিসেবে থাকে; string, boolean এবং fractional number তাদের native OTLP value
variant ব্যবহার করে। Error span-এর status ERROR এবং sanitized status message থাকে। Canonical
record-এ upstream host URL নেই, তাই model server হিসেবে collector-কে ভুলভাবে শনাক্ত না করে
`server.address` বাদ দেওয়া হয়। Cost export করা হয় না।

শুধু `includeBodies=true` content hydrate করে। `langfuseMapping=false` হলে,
`gen_ai.input.messages` / `gen_ai.output.messages` OmniRoute-এ সংরক্ষিত sanitized request/response
body JSON বহন করে (parse করা গেলে canonicalized), re-shaped semconv messages array নয়। Clipped/non-JSON
body raw text হিসেবেই থাকে। `langfuseMapping=true` হলে body কেবল
`langfuse.observation.input` / `langfuse.observation.output` হিসেবে emit করা হয়;
`gen_ai.*.messages` attribute বাদ দেওয়া হয়, যাতে প্রতিটি body একবারই পাঠানো হয়। উভয় mode-ই
বিদ্যমান hydration path থেকে `maxBodyBytes` গ্রহণ করে;
clipping নির্দেশ করতে `omniroute.bodies_truncated=true` সেট করা হয়।
এই destination-এর মাধ্যমে কোনো অতিরিক্ত pipeline snapshot বা unsanitized artifact read যোগ করা হয় না;
ঐচ্ছিক request-header capture নিচে বর্ণিত বিদ্যমান hydrated client snapshot ব্যবহার করে।
Body export করার সময় প্রতি ঘণ্টায় backlog জমা করার বদলে
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`-এর মতো minute-level cadence ব্যবহার করুন।

### ঐচ্ছিক client request headers

Header capture **ডিফল্টভাবে বন্ধ**। Destination config-এ `requestHeaderAllowlist` সেট করুন এবং
**Export prompts and responses** সক্রিয় করুন (`includeBodies: true` on the destination)।
Allowlist একটি API array অথবা newline/comma-separated name-সমৃদ্ধ textarea গ্রহণ করে:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

নামগুলো case-insensitive এবং হুবহু মেলে, যদি না একটি একক terminal `*` nonempty
header-name prefix নির্বাচন করে। Bare `*`, embedded wildcards এবং অবৈধ HTTP header name প্রত্যাখ্যাত হয়।
সর্বাধিক 64টি selector থাকতে পারে, প্রতিটির name/prefix সর্বাধিক 256 ASCII byte।
এই সেটিংটি `headers` থেকে আলাদা, যা exporter-কে collector-এর কাছে authenticate করে।

Capture কেবল `pipeline_client_request` পড়ে, যা সংরক্ষিত detailed pipeline-এর
`clientRawRequest` (অথবা legacy `clientRequest`) থেকে পূরণ করা হয়। এটি কখনো provider request header-এ
fallback করে না। Request রেকর্ড করার সময় detailed pipeline logging সক্রিয় থাকতে হবে। `includeBodies` নিষ্ক্রিয় থাকলে,
অথবা client-snapshot JSON অনুপস্থিত, corrupt বা clipped হলে কোনো header attribute নির্গত হয় না। `maxBodyBytes`
বাড়ালে export-time snapshot clipping এড়ানো যেতে পারে; কিন্তু কখনো সংরক্ষিত না হওয়া detail পুনরুদ্ধার করা যায় না।
1 MiB-এর বেশি বা 256টির বেশি header entry-যুক্ত snapshot উপেক্ষা করা হয়। বিদ্যমান prompt/response export
header capture-এর পাশাপাশি সক্রিয় থাকে; allowlist headers-only hydration mode প্রদান করে না।

নির্বাচিত value-গুলো `http.request.header.<full lowercase header name>` OTLP string array হয়ে যায়,
এমনকি একটি মাত্র string হলেও। উদাহরণস্বরূপ, `X-OmniRoute-Meta-Team: example-team` হয়ে যায়
`http.request.header.x-omniroute-meta-team` এবং
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`।
সম্পূর্ণ prefix সংরক্ষিত থাকে: এগুলো সাধারণ header, এখানে কোনো business-field parsing বা
`omniroute.metadata.*` / Langfuse metadata conversion হয় না। `langfuseMapping` header semantics পরিবর্তন করে না।
নির্বাচিত single-valued `User-Agent` standard scalar `user_agent.original`-ও সেট করে। একটি value-এর
ভেতরের comma split করা হয় না। Case variant-গুলো saved entry order-এ merge হয়; কোনো invalid variant থাকলে
সেই সম্পূর্ণ header বাদ দেওয়া হয়। Attribute-গুলো lowercase name অনুযায়ী ordered থাকে।

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key header, auth/token/secret/password/credential
marker-যুক্ত name এবং internal gateway credential সবসময় বাদ দেওয়া হয়, এমনকি সেগুলো নির্বাচিত বা storage-এ
আংশিক masked হলেও। পরিচিত credential pattern-গুলো shared credential detector পুনর্ব্যবহার করে; redaction marker
বাদ দেওয়া হয়, নিরাপদ value হিসেবে export করা হয় না। কেবল string এবং nonempty string array গ্রহণ করা হয়;
number বা object coerce করা হয় না। Invalid name, prototype key, control character (horizontal tab ছাড়া) এবং
malformed Unicode batch ব্যর্থ না করেই উপেক্ষা করা হয় এবং error-এ তাদের content প্রতিফলিত হয় না।

প্রতিটি span সর্বাধিক 32টি header, প্রতি header-এ 16টি value, প্রতি value-তে 4096 UTF-8 byte এবং
captured header name ও value জুড়ে মোট 16384 UTF-8 byte ধারণ করে। Oversized/invalid header সম্পূর্ণ বাদ দেওয়া হয়,
clipped করা হয় না। Selection একটি operator privacy decision: নিরাপদ দেখানো name-এও personal data থাকতে পারে,
এবং এই সীমা/detector সাধারণ PII scrubber নয়।

### Delivery limits

Request envelope-সহ সর্বাধিক 500টি span এবং 4 MiB UTF-8 JSON-এ সীমাবদ্ধ। Cursor batch-এর প্রথম request-এর
আগে প্রতিটি allowed span-এর size পরীক্ষা করা হয়। সীমার চেয়ে বড় কোনো individual span পুরো batch-এর কোনো অংশ
পাঠায় না এবং `maxBodyBytes` কমানোর নির্দেশসহ ব্যর্থ হয়; এটি নীরবে বাদ দেওয়া হয় না। Preflight কেবল record reference
ও byte count রেখে প্রতিটি temporary span/JSON বাদ দেয়; batch-এর দ্বিতীয় serialized copy ধরে না রেখে bounded chunk-এর
জন্য span পুনর্নির্মাণ করা হয়। HTTP 408/429/5xx, network failure এবং timeout-এ সর্বাধিক
তিনটি attempt হয়, 250/500 ms exponential backoff-সহ। `Retry-After` seconds বা HTTP date delay সর্বাধিক
5 seconds পর্যন্ত বাড়াতে পারে। অন্যান্য status সঙ্গে সঙ্গে ব্যর্থ হয়। OTLP 2xx partial rejection-ও throw করে,
হারিয়ে যাওয়া span acknowledge করার পরিবর্তে; empty বা valid JSON acknowledgement গ্রহণ করা হয়, response-read
সীমা 64 KiB।

Error-এ কেবল exporter-owned fact থাকে: HTTP status, retry class, attempt এবং sent span count, অথবা fixed
acknowledgement/network failure wording। Collector response body, partial-success count এবং response header
কখনো error, log বা dashboard-এ কপি করা হয় না। Failed বা partially accepted batch acknowledge করা হয় না:
destination সেই status-সহ Failing দেখায়, cursor শেষ acknowledged batch-এ থাকে, এবং পরবর্তী run একই row পুনরায়
পাঠায়। Permanent status collector বা configuration ঠিক না করা পর্যন্ত ব্যর্থ হতে থাকে। Response detail-এর জন্য
collector-এর নিজস্ব log ব্যবহার করুন। Call-log error summary-তে তাদের আলাদা redaction বজায় থাকে।
`prepare()` কোনো কিছু provision করে না; Test ঠিক `{"resourceSpans":[]}` post করে এবং call-log span না লিখে
HTTP status report করে।

Trace id এবং span id হলো
`"omniroute.trace\\0" + callLogId` এবং `"omniroute.span\\0" + callLogId`-এর উপর SHA-256-এর প্রথম 32/16টি
hex digit। Re-send-এ অভিন্ন id থাকে। এটি deduplication-এর নিশ্চয়তা নয়: Langfuse v4 ingestion-সহ কিছু backend
একই-id span deduplicate করে না। Crash বা partial chunk failure-এর কারণে সর্বাধিক একটি unacknowledged cursor batch
পুনরায় পাঠানো হতে পারে; কেবল তার শেষ HTTP chunk নয়, পুরো batch duplicate হতে পারে। এই tradeoff বিবেচনা করে
cursor batch size নির্বাচন করুন।

### Langfuse example

Self-hosted Langfuse instance-এর জন্য এই field-গুলো configure করুন:

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

Authorization value স্থানীয়ভাবে literal `public-key:secret-key`
string-এর Base64 হিসেবে তৈরি করুন (উদাহরণস্বরূপ `Buffer.from(publicKey + ":" + secretKey).toString("base64")` দিয়ে)।
বাস্তব credential log, screenshot বা issue-এ paste করবেন না। Mapping স্বয়ংক্রিয়ভাবে
`x-langfuse-ingestion-version: 4` সেট করে; Authorization এখনও `headers`-এ সরবরাহ করতে হবে।
উভয় header এবং generated identity salt বিদ্যমান encrypted secret-field mechanism ও API placeholder ব্যবহার করে;
`STORAGE_ENCRYPTION_KEY` আবশ্যক।

ম্যাপিংয়ে generation type/model, JSON ব্যবহারের বিবরণ (input/output/total এবং উপলভ্য cache keys), JSON input/output snapshots, ERROR/DEFAULT level, sanitized status message, trace name, session id, ঐচ্ছিক environment এবং provider, requested model, path, combo, cache source ও status-এর জন্য filterable
`langfuse.observation.metadata.<key>` যোগ করা হয়। `langfuse.observation.completion_start_time` হলো ISO 8601 ফরম্যাটে start + TTFT, তবে কেবল তখনই যখন TTFT জানা থাকে এবং তা duration-এর মধ্যে থাকে। কোনো cost attributes পাঠানো হয় না।

Identity modes `langfuse.user.id`-এ প্রযোজ্য:

- `pseudonymous` (default): API key-এর internal id-এর HMAC-SHA256, যেখানে প্রতি destination-এর জন্য একটি random 32-byte salt ব্যবহৃত হয়। salt অনুপস্থিত থাকলে creation-এর সময় তৈরি হয়, `identitySalt` হিসেবে encrypted থাকে, কখনো ফেরত দেওয়া হয় না এবং edits-এর সময় সংরক্ষিত থাকে। Raw key ids কখনো span attributes-এ রাখা হয় না। কোনো destination-এর salt পুনরায় তৈরি বা rotate করলে identities পরিবর্তিত হয়।
- `keyName`: configured API key name, যা ইচ্ছাকৃতভাবে সেই operator label প্রকাশ করে।
- `none`: কোনো user id নেই। উপস্থিত থাকলে session tags তবুও export করা হয়; এই modes-গুলো arbitrary prompt content বা operator-supplied session/correlation labels anonymize করে না।

### Backfill ছাড়া শুরু করা

শুধু creation-এর সময় **বর্তমান অবস্থান থেকে শুরু করুন (বিদ্যমান logs বাদ দিন)** enable করুন অথবা create API payload-এর top level-এ
`startFromCurrentPosition: true` পাঠান। এটি কোনো migration ছাড়াই বিদ্যমান cursor helpers ব্যবহার করে
`cursor_row_id`-কে বর্তমানে retained call-log rowid-এর সর্বোচ্চ মানে initialize করে। Default হলো false (cursor 0 এবং retained-history backfill)।
এটি update-time cursor reset setting নয়।

Shared `ttftMs` addition BigQuery mapper এবং new-table schema-তে একটি nullable `ttft_ms` column-ও যোগ করে: এর schema test-এ প্রতিটি canonical record field-এর জন্য একটি column থাকা আবশ্যক। Existing tables অপরিবর্তিতভাবেই export করা চালিয়ে যায়: `prepare()` table schema পড়ে এবং কেবল সেই table-এ `ttft_ms` column না থাকলে তা বাদ দেয়। পরবর্তী run-এ TTFT পেতে nullable INT64 column যোগ করুন, অথবা একটি new table ব্যবহার করুন। ঐচ্ছিক TTFT column schema update trigger করে না। Usage-evidence columns নিচের conditional, opt-in compatibility flow অনুসরণ করে; অন্যান্য row fields-এর ক্ষেত্রে strict schema checking বজায় থাকে।

---

## 6. একটি গন্তব্য যোগ করা

1. `src/lib/logExport/destinations/<name>.ts` তৈরি করুন, যা একটি `LogExportDestinationType` এক্সপোর্ট করবে:
   একটি Zod `configSchema`, UI-এর জন্য একটি `fields` বর্ণনাকারী অ্যারে, `secretFields`, এবং একটি
   `createClient(config)` যা `test()` / `prepare()` / `send(records)` ফেরত দেয়।
2. এটিকে `src/lib/logExport/registry.ts`-এর `DESTINATIONS` অ্যারেতে যোগ করুন।
3. `tests/unit/`-এর অধীনে টেস্ট লিখুন।

এটুকুই সম্পূর্ণ পরিবর্তন: স্থায়ী সংরক্ষণ, cron জব, REST স্তর, গোপন তথ্যের এনক্রিপশন এবং
ড্যাশবোর্ড ফর্ম—সবই রেজিস্ট্রি থেকে পড়ে।

নতুন গন্তব্যের জন্য দুটি নিয়ম:

- আংশিক ব্যর্থতার ক্ষেত্রে `send()` **অবশ্যই এক্সসেপশন থ্রো করবে**। সফলভাবে সম্পন্ন হওয়ার অর্থ হলো "গন্তব্যে এই সারিগুলো রয়েছে",
  এবং কার্সর স্থায়ীভাবে সেগুলো পেরিয়ে এগিয়ে যায়।
- ব্যবহারকারীর দেওয়া URL গ্রহণ করে এমন গন্তব্যকে ফেচ করার আগে
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`)-এর মাধ্যমে সেটি যাচাই করতে হবে,
  ঠিক যেভাবে ওয়েবহুক করে। BigQuery-এর এটি প্রয়োজন নেই: এর হোস্টগুলো ধ্রুবক।

---

## ৭. এটি পরিচালনা করা

- **ড্যাশবোর্ড**: Integrations → Log export। একটি গন্তব্য যোগ করুন, শংসাপত্র পরীক্ষা করতে **Test** চালান
  (কোনো সারি না লিখেই), তারপর এটি সক্রিয় করুন।
- **ব্যাকলগ**: প্রতিটি গন্তব্য কার্ডে অপেক্ষমাণ সারি এবং কার্সর দেখা যায়; `GET
/api/log-export/status` একই পরিসংখ্যানের পাশাপাশি শেষ ২০টি কাজ চালানোর তথ্য ফেরত দেয়।
- **একটি ব্যর্থ গন্তব্য অন্যগুলোর কাজ ব্যর্থ করে না** — রান সারাংশে `last_status` / `last_error`-এ
  প্রতি-গন্তব্যের অবস্থা রেকর্ড করা হয় এবং কাজ চালানোর ইতিহাসে সমষ্টিগত তথ্য রাখা হয়।
- **কোনো গন্তব্য মুছে ফেললে তার কার্সরও মুছে যায়।** এটি আবার যোগ করলে সংরক্ষিত সবচেয়ে পুরোনো
  কল লগ থেকে শুরু হয়, ফলে গন্তব্যে আগে থেকেই থাকা সারিগুলো পুনরায় পাঠানো হতে পারে। BigQuery-তে প্রতি-সারির
  `insertId` কেবল BigQuery-এর নিজস্ব ডি-ডুপ্লিকেশন সময়সীমার মধ্যে এটিকে সামাল দেয়, তাই কোনো গন্তব্য
  মুছে ফেলার পরিবর্তে নিষ্ক্রিয় করাই পছন্দনীয়।

### ব্যবহার-প্রমাণ স্কিমা সামঞ্জস্যতা

নতুন BigQuery টেবিলে nullable `usage_evidence` (JSON ধারণকারী STRING) এবং
`usage_estimated` (BOOL) অন্তর্ভুক্ত থাকে। `autoCreate` সক্রিয় থাকলে, একটি বিদ্যমান টেবিলে
শুধু এই অনুপস্থিত nullable কলামগুলো যোগ হতে পারে। এক্সপোর্টারটি field metadata-সহ বিদ্যমান
সম্পূর্ণ স্কিমা সংরক্ষণ করে এবং ফেরত পাওয়া etag ব্যবহার করে একটি শর্তসাপেক্ষ PATCH পাঠায়। সমসাময়িক
স্কিমা পরিবর্তন হলে সেটি ওভাররাইট না করে এক্সপোর্ট ব্যর্থ হয়; পরবর্তী রান টেবিলটি আবার পড়ে।

`autoCreate` নিষ্ক্রিয় থাকলে usage evidence-সহ রেকর্ড এক্সপোর্ট করার আগে এই কলামগুলো নিজে যোগ করুন। অনুপস্থিত
স্কিমা/etag metadata অথবা ব্যর্থ আপডেট evidence-সহ insert-ও প্রতিরোধ করে। এই ব্যর্থতার সময়
এক্সপোর্ট কার্সর এগিয়ে যায় না এবং evidence কখনো নীরবে বাদ পড়ে না। কোনো এক্সপোর্ট আটকে থাকলেও
স্থানীয় লগ সংরক্ষণ প্রযোজ্য থাকে, তাই সংরক্ষিত source rows-এর মেয়াদ শেষ হওয়ার আগে ব্যর্থতার
সমাধান করুন।
