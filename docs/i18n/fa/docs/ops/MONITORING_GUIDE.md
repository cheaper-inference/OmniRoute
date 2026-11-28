# Monitoring & Observability Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **خلاصه**: OmniRoute بهصورت داخلی با قابلیتهای نظارت بر سلامت، هدایت خودکار ارائهدهندگان، ردیابی سهمیه و هوکهای مشاهدهپذیری عرضه میشود. این راهنما داشبورد، هشدارها و عیبیابی را پوشش میدهد.

**منابع:**

- `src/lib/monitoring/observability.ts` — اسنپشات مشاهدهپذیری
- `src/lib/monitoring/comboHealthAutopilot.ts` — هدایت خودکار سلامت ترکیبها
- `src/lib/monitoring/providerHealthAutopilot.ts` — هدایت خودکار ارائهدهندگان
- `src/lib/monitoring/providerHealthMatrix.ts` — ماتریس سلامت ارائهدهندگان
- `src/lib/localHealthCheck.ts` — بررسی سلامت محلی
- `src/lib/tokenHealthCheck.ts` — سلامت نوسازی توکن
- `src/lib/proxyHealth.ts` — کش سلامت پروکسی (در PROXY_GUIDE.md پوشش داده شده است)

---

## نمای کلی

OmniRoute دارای **۳ لایه نظارتی** است:

```
┌──────────────────────────────────────────────────────────────┐
│  لایه ۱: سلامت سیستم (در سطح سرور)                           │
│  ├─ localHealthCheck.ts — پایگاه داده، پورتها، وابستگیهای بومی │
│  ├─ db/healthCheck.ts — یکپارچگی، کلید خارجی، مصنوعات یتیم   │
│  └─ داشبورد: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  لایه ۲: سلامت ارائهدهنده (تابآوری بهازای هر ارائهدهنده) │
│  ├─ providerHealthAutopilot.ts — قطعکننده مدار، دورههای انتظار │
│  ├─ providerHealthMatrix.ts — امتیاز سلامت بر اساس ارائهدهنده/مدل │
│  └─ داشبورد: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  لایه ۳: مشاهدهپذیری زنده (اسنپشاتهای زمان اجرا)          │
│  ├─ observability.ts — قطعکنندههای مدار، نشستها، سهمیه     │
│  ├─ tokenHealthCheck.ts — سلامت نوسازی توکن OAuth            │
│  └─ ابزارهای MCP: omniroute_get_health، omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## صفحات داشبورد

### `/dashboard/health` (سلامت سیستم)

داشبورد سطحبالای سلامت موارد زیر را نمایش میدهد:

| بخش                    | آنچه نمایش میدهد                              |
| ---------------------- | --------------------------------------------- |
| **وضعیت سرور**         | زمان کارکرد، نسخه، پورت، اتصالهای فعال        |
| **پایگاه داده**        | اتصال، یکپارچگی، اندازه WAL، مهاجرتهای اخیر   |
| **خلاصه ارائهدهندگان** | تعداد فعال، تعداد سالم، تعداد قطعکنندههای باز |
| **نظارتگرهای سهمیه**   | نشستهای فعال، وضعیت هشدار، سهمیههای تمامشده   |
| **خطاهای اخیر**        | ۱۰ خطای آخر همراه با ردپای پشته               |
| **مصرف منابع**         | حافظه، CPU، نشانگر فشار هیپ                   |

### `/dashboard/providers` (سلامت ارائهدهندگان)

داشبورد بهازای هر ارائهدهنده:

| ستون       | توضیحات                                         |
| ---------- | ----------------------------------------------- |
| ارائهدهنده | شناسه ارائهدهنده + نام نمایشی                   |
| سلامت      | وضعیت سبز/زرد/قرمز                              |
| مدار       | وضعیت باز/بسته/نیمهباز                          |
| اتصالها    | تعداد اتصالها، آخرین نوسازی                     |
| مدلها      | مدلهای موجود، سلامت بهازای هر مدل               |
| هزینه      | هزینه امروز، روند ۷روزه                         |
| خطاها      | تعداد خطاهای ۲۴ ساعت اخیر، پرتکرارترین کلاس خطا |

برای مشاهده موارد زیر، روی یک ارائهدهنده کلیک کنید:

- درخواستهای اخیر همراه با تفکیک تأخیر
- امتیاز سلامت بهازای هر اتصال
- قفلهای هر مدل
- توصیههای هدایت خودکار

### `/dashboard/quota` (ردیابی سهمیه)

برای هر کلید API:

- مصرف فعلی در مقایسه با محدودیت (نوار پیشرفت)
- روند سهمیه (نمودار ۳۰روزه)
- زمان بازنشانی بعدی
- تاریخچه هشدارها

### `/dashboard/combos` (سلامت ترکیبها)

بهازای هر ترکیب:

- راهبرد + اهداف
- سلامت هر هدف
- رویدادهای اخیر بازگشت به گزینه جایگزین
- نرخ موفقیت (۲۴ساعته، ۷روزه، ۳۰روزه)

---

## بررسی سلامت API

OmniRoute افشا می کند** دو** سطوح سلامت HTTP. آنها برای ارکسترها قابل تعویض نیستند.

| مسیر                         | هدف                                                            | وزن                               | استفاده کنید برای                                                |
| ---------------------------- | -------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| `GET /healthz`               | چرخه زندگی liveness/readiness (`ok` / `starting` / `stopping`) | بی اهمیت (فقط پرچم فاز)           | کوبرنتیس** آمادگی** ; نرم** سرزندگی** اگر باید HTTP استفاده کنید |
| `GET /api/monitoring/health` | خلاصه ارائه دهنده سیستم عمیق + (DB، heap، تعداد کاتالوگ، …)    | سنگین (همگام سازی DB / کار نظارت) | داشبورد، چک های عمیق جعبه سیاه، بررسی سلامت داخلی Docker         |

> **توجه:** ماتریسهای سلامت ارائهدهنده، مسائل خلبان خودکار، مانیتورهای سهمیه، سلامت نشانه و جزئیات تأخیر فراتر از `/api/monitoring/health` از طریق** ابزار MCP** `observability_snapshot` یا** داشبورد** صفحات — هیچ مسیر اختصاصی REST برای این افراد وجود ندارد.

هر دو مسیر بر روی** همان حلقه رویداد Node** به عنوان رسیدگی به درخواست یک مسیر محدود به CPU (کار کاتالوگ `GET /v1/models` بزرگ، فشردهسازی متن طولانی / شمارش توکن) میتواند به تأخیر بیفتد.** همه** کنترل کننده های HTTP ، از جمله `/healthz`. فرآیند ≠ مشغول حلقه رویداد مرده است. ترجیح می دهند گراز را تعمیر کنند. تنظیم پروب فقط کشتارهای کاذب را کاهش می دهد.

### کاوشگر ارکستر سبک وزن

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` زمانی که فاز چرخه حیات سرور آماده است
- **503** + `starting` / `stopping` در هنگام بوت یا خاموش شدن
- پیاده سازی: `src/app/healthz/route.ts` (بدون پینگ DB )

### سلامت سیستم (عمیق)

```bash
GET /api/monitoring/health
```

پاسخ:

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

#### `credentialHealth`: probe-cache در مقابل SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` است** کاوشگر حافظه نهان سنج** , نه یک دامپ زنده از `provider_connections.test_status`. بعد از #12532 مسیر درخواست فقط `getCachedCredentialHealthSummary()` می خواند. کاوشگرهای پس زمینه حافظه پنهان را از حلقه رویداد تازه می کنند.

| لایه                | کجا                                                                   | معنی آن چیست                                                                                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| سنج کاوش کش         | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | آخرین نتایج کاوشگر سلامت اعتبار هنوز در حافظه فرآیند نگهداری می شود. `source` همیشه `probe-cache` است .                                                                                                                       |
| جزئیات اتصال ناموفق | `credentialHealth.failedConnections`                                  | حاضر شود** تنها زمانی که `failed > 0`** . فهرست محدود ردیفهای حافظه پنهان با `status=error` (`connectionId`، `status`، `lastError` / `lastErrorType` سالمسازیشده). `failedOmitted` زمانی تنظیم میشود که فهرست محدود شده باشد. |
| وضعیت چسبناک SQLite | `credentialHealth.staleDbNonOkCount`                                  | تعداد از** فعال** (`is_active=1`) ردیف های اتصالی که `test_status` ماندگار آن ها غیر اوکی شناخته شده است (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                   |

این دو لایه می توانند از نظر هدف با هم اختلاف داشته باشند:

- `failed=0` اندازه گیری کنید در حالی که `staleDbNonOkCount>0` — SQLite هنوز یک `test_status` چسبنده دارد (به عنوان مثال `expired` یا `credits_exhausted`) که آخرین عکس فوری کاوشگر-کش به عنوان `status=error` به حساب نمی آید.
- `failed>0` اندازه گیری کنید در حالی که SQLite سالم به نظر می رسد — یک کاوشگر اخیر شکست خورده و در حافظه پنهان ذخیره می شود. ردیف DB به روز نشده است یا بعداً پاک شد.

هنگام خراش دادن این نقطه پایانی، فقط در مورد `provider_connections.test_status` هشدار ندهید. `failed` + `failedConnections` برای خرابیهای کاوشگر زنده و `staleDbNonOkCount` در مواقعی که به تعداد ماندگاری وضعیت چسبنده نیاز دارید، استفاده کنید.

### توصیه های کاوشگر Kubernetes

OmniRoute یک است** فرآیند تک گره** (یک حلقه رویداد). سهام Docker `HEALTHCHECK` `/healthz` سبک وزن را هدف قرار می دهد. `/api/monitoring/health` است** خیلی سنگین** برای فواصل زنده بودن کوبلت.

| کاوشگر          | هدف پیشنهادی                                                              | یادداشت ها                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **راه اندازی**  | HTTP `GET /healthz` با `failureThreshold` بلند (یا `startPeriod` بزرگ)    | مهاجرت + SQLite شروع سرد می تواند از چند ثانیه تجاوز کند                                                                                                                                                                                                                                                                                                |
| **آمادگی**      | HTTP `GET /healthz`                                                       | چرخه حیات `ok` / `starting` / `stopping` (200 در مقابل 503). اگر حلقه توسط CPU مسدود شده باشد همچنان فلپ می شود. الف** 200 در چند ثانیه سالم نیست** (#10303) — به این معنی است که حلقه رویداد قبل از اجرا شدن کنترل کننده 3 بایت گرسنه بود                                                                                                              |
| **سرزندگی**     | HTTP `GET /livez`** یا TCP** در پورت سرویس اصلی (`PORT`، پیش فرض `20128`) | `/livez` فقط فرآیند زنده است (اگر کنترل کننده اجرا شود همیشه 200 است). همچنان حلقه رویداد — busy ≠ dead را به اشتراک می گذارد و گرسنگی حلقه رویداد (#10303) را بهتر از TCP تشخیص نمی دهد. ترجیح دادن**TCP** اگر زمان پروب های HTTP تحت بار catalog/compression به پایان برسد. انجام دهید** نه** به هر صورت، غلاف را در غرفه های حلقه رویداد کوتاه بکشید |
| **سلامتی عمیق** | `GET /api/monitoring/health` از یک چک کننده خارجی                         | نه برای kubelet `livenessProbe` / تنگ `readinessProbe`                                                                                                                                                                                                                                                                                                  |

شکل مثال (آستانه ها را با شروع سرد و بار فشرده سازی خود تنظیم کنید):

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

**نکن** نقطه کوبلت** سرزندگی** در `/api/monitoring/health`. آن مسیر کار DB/monitoring واقعی را انجام می دهد و تحت بارگذاری مثبت کاذب خواهد بود.

موارد مرتبط: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (کاوشگر در حالی که حلقه رویداد مشغول است)، [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (قیمت کاتالوگ hog)، [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (هوگ شمارش توکن فشرده سازی).

### systemd watchdog (حلقه رویداد منجمد)

در یک هاست systemd، OmniRoute به مدیر سرویس میگوید چه زمانی آماده است و به پینگ کردن آن ادامه میدهد، بنابراین سروری که حلقه رویداد آن گیر کرده است، بهجای بیصدا ماندن و خاموش ماندن، کشته شده و دوباره راهاندازی میشود. پینگها از حلقه رویداد خود سرور میآیند: وقتی مسدود میشود، متوقف میشوند و systemd پس از اتمام `WatchdogSec` بدون آن، سرویس را دوباره راهاندازی میکند.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) قبلاً یک واحد کاربری با این می نویسد. واحدی که خودتان مینویسید (پیشفرض `Type=simple`) هیچ نگهبانی دریافت نمیکند، بنابراین این خطوط را به بخش `[Service]` آن اضافه کنید:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

واحد تولید شده `Restart=on-failure` را تنظیم می کند، بنابراین آن خط را نیز اضافه کنید — بدون آن، نگهبان به جای راه اندازی مجدد، فقط سرویس گیر کرده را می کشد.

- `Type=notify`: زمانی که سرور `READY=1` را ارسال می کند، سرویس "شروع می شود" نه زمانی که فرآیند فوک می کند. `TimeoutStartSec` یک شروع آهسته را محدود می کند.
- `NotifyAccess=all`: پینگ ها توسط فرآیند سرور ارسال می شوند که فرزند سرپرست `omniroute serve` است.
- `WatchdogSec`: پینگ ها هر 60 ثانیه یکبار خاموش می شوند، بنابراین استفاده کنید** 120 یا بیشتر** . مقادیر کوچکتر باعث راه اندازی مجدد سرور سالم می شود.
- `omniroute serve` در پیش زمینه اجرا کنید. `--daemon` سرور را از cgroup واحد جدا می کند و اطلاع رسانی دست دادن هرگز کامل نمی شود.

بررسی کنید که پس از راه اندازی مجدد فعال است:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` تاخیر پیکربندی شده را نشان می دهد و `WatchdogTimestamp` هر دقیقه به جلو حرکت می کند. راه اندازی مجدد ایجاد شده توسط سازمان دیده بان به عنوان `Result=watchdog` ثبت می شود. برای خاموش کردن پینگ ها در حالی که دستگاه را همانطور که هست نگه دارید، `OMNIROUTE_DISABLE_SD_NOTIFY=1` را تنظیم کنید. بدون `NOTIFY_SOCKET` (ترمینال، Docker، Electron، Windows) چیزی ارسال نمی شود.

نگهبان فقط بررسی می کند که حلقه رویداد همچنان در حال اجرا باشد. سروری که کند است اما همچنان در حال چرخش است، راه اندازی مجدد نمی شود.

### کار اختیاری در مسیر درخواست (حافظه، مهارتها، نوسازی نشانه)

استخراج حافظه، تزریق مهارتها و نوسازی رمز OAuth به اشتراک گذاشته میشوند** حلقه رویداد اصلی گره** با `/healthz`. آنها ویژگی های جابجایی داشبورد (`memoryEnabled`، `skillsEnabled`) هستند، نه یک استخر کارگر. به [Environment — event-loop cost](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) مراجعه کنید.

### ارائه دهنده سلامت

> **نقطه پایانی REST وجود ندارد.** دادههای سلامت ارائهدهنده از طریق ابزار MCP `observability_snapshot` یا صفحه `/dashboard/providers` داشبورد در دسترس است.

### جزئیات ارائه دهنده

> **نقطه پایانی REST وجود ندارد.** جزئیات هر ارائه دهنده از طریق صفحه داشبورد `/dashboard/providers` در دسترس است.

---

## خلبان خودکار سلامت ارائهدهنده

ماژول `providerHealthAutopilot.ts` یک **سیستم خودترمیمشونده** است که:

1. مشکلات ارائهدهنده را شناسایی میکند (باز بودن مدار، دورههای انتظار، قفلشدگیها و هشدارهای سهمیه)
2. برای رفع آنها **اقدامات پیشنهادی** تولید میکند
3. در صورت تمایل، اقدامات کمخطر را **بهطور خودکار اجرا میکند**

### انواع مشکلات شناساییشده

| نوع مشکل                     | شدت      | نمونه وضعیت                                      |
| ---------------------------- | -------- | ------------------------------------------------ |
| `provider_circuit_open`      | بحرانی   | باز شدن قطعکننده مدار پس از 5 شکست               |
| `provider_circuit_half_open` | هشدار    | آزمایش بازیابی مدار                              |
| `connection_cooldown`        | هشدار    | قرار گرفتن اتصال در دوره انتظار پس از 429        |
| `stale_connection_error`     | هشدار    | آخرین نوسازی بیش از 30 دقیقه قبل ناموفق بوده است |
| `terminal_connection_error`  | بحرانی   | لغو OAuth یا نامعتبر بودن کلید                   |
| `inactive_connection`        | اطلاعاتی | غیرفعال بودن اتصال در تنظیمات                    |
| `model_lockout`              | هشدار    | قرار گرفتن مدل مشخص در قرنطینه                   |
| `quota_monitor_warning`      | هشدار    | مصرف 80٪ یا بیشتر از سهمیه                       |

### انواع اقدامات تولیدشده

| اقدام                          | ریسک  | توضیحات                             |
| ------------------------------ | ----- | ----------------------------------- |
| `clear_provider_breaker`       | متوسط | بازنشانی قطعکننده مدار به حالت بسته |
| `clear_connection_cooldown`    | کم    | حذف دوره انتظار از یک اتصال         |
| `clear_stale_connection_error` | کم    | پاک کردن پرچم خطای قدیمی            |
| `clear_model_lockout`          | کم    | فعالسازی مجدد یک مدل قرنطینهشده     |
| `reactivate_connection`        | متوسط | فعالسازی مجدد یک اتصال غیرفعالشده   |
| `deactivate_connection`        | زیاد  | غیرفعال کردن یک اتصال مشکلدار       |

### API

> **هیچ نقطه پایانی REST وجود ندارد.** مشکلات خلبان خودکار از طریق ابزار MCP با نام `observability_snapshot` یا داشبورد در دسترس هستند. خلبان خودکار بهصورت داخلی اجرا میشود؛ رفتار آن از طریق پایگاه داده تنظیمات (فیلد `autopilotMode` برای هر اتصال) پیکربندی میشود، نه متغیرهای محیطی — اجرای `grep -rn` برای یافتن یک متغیر محیطی مربوط به حالت خلبان خودکار هیچ نتیجهای برنمیگرداند.

### حالت خلبان خودکار

خلبان خودکار بهطور پیشفرض در **حالت دستی** کار میکند — مشکلات را شناسایی کرده و اقدامات پیشنهادی را تولید میکند، اما آنها را بهطور خودکار اعمال نمیکند. اقدامات را میتوان از طریق داشبورد اعمال کرد.

---

## خلبان خودکار سلامت ترکیب

`comboHealthAutopilot.ts` معادل **مختص ترکیب** خلبان خودکار ارائهدهنده است. این ماژول:

- ترکیبهای ناسالم را شناسایی میکند
- تغییر ترتیب مقصدها را پیشنهاد میدهد
- غیرفعال کردن مقصدهای خراب را پیشنهاد میکند
- مقصدهای ازکارافتاده را پس از N شکست بهطور خودکار حذف میکند

### نمونه مشکلات ترکیب

```
ترکیب "always-on" (راهبرد اولویت)
├─ مقصد 1: openai/gpt-5 (سالم)
├─ مقصد 2: anthropic/claude-opus-4-6 (⚠️ مدل تا ساعت 14:00 قفل است)
└─ مقصد 3: kiro/claude-sonnet-4-5 (سالم)

اقدام پیشنهادی: تغییر ترتیب — تا زمان پایان قفلشدگی، kiro را بالاتر از anthropic قرار دهید
```

---

## پایشگرهای سهمیه

`observability.ts` برای ارائهدهندگان اشتراکی (Claude Code، Codex و GitHub Copilot)، **پایشگرهای سهمیه بهازای هر نشست** ارائه میکند:

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

### معانی وضعیتها

| وضعیت       | زمان وقوع                        | اقدام رابط کاربری                           |
| ----------- | -------------------------------- | ------------------------------------------- |
| `starting`  | نظرسنجی اولیه در حال انجام است   | نشانگر چرخان                                |
| `idle`      | فعالیت اخیری وجود ندارد          | پنهان از داشبورد                            |
| `healthy`   | بیش از 50٪ سهمیه باقی مانده است  | نقطه سبز                                    |
| `warning`   | کمتر از 50٪ سهمیه باقی مانده است | هشدار زرد                                   |
| `exhausted` | سهمیه برابر با 0٪ است            | مسدودسازی قرمز، مسیریابی به ارائهدهنده بعدی |
| `error`     | نظرسنجی ناموفق بود               | نقطه قرمز، تلاش مجدد در آینده نزدیک         |

### API

> **هیچ نقطه پایانی REST وجود ندارد.** دادههای پایشگر سهمیه از طریق ابزار MCP با نام `observability_snapshot` یا داشبورد در دسترس هستند.

---

## نمای کلی مشاهدهپذیری

ابزار MCP با نام `observability_snapshot` یک **نمای کامل از وضعیت سیستم** را برای عاملهای هوش مصنوعی برمیگرداند:

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
  "quotaMonitors": {/* بالا را ببینید */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

عاملها از این اطلاعات برای **تصمیمگیری درباره مسیریابی** استفاده میکنند — برای مثال، «اگر مدار openai باز است، ابتدا درخواست را به anthropic هدایت کن».

---

## بررسی سلامت توکن

ارائهدهندگان OAuth‏ (Claude Code، GitHub Copilot، Cursor) به **نوسازی دورهای توکن** نیاز دارند. `src/lib/tokenHealthCheck.ts` یک زمانبند پسزمینه را اجرا میکند:

- **تیک پیمایش**: هر 60 ثانیه (پیمایش در `TICK_MS = 60 * 1000` در `src/lib/tokenHealthCheck.ts:30`)
- **فاصله زمانی بررسی سلامت هر اتصال**: بهطور پیشفرض 60 دقیقه (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`)؛ از طریق پایگاه داده تنظیمات قابل پیکربندی است
- **نوسازی پیشگیرانه هنگام دریافت 401**: توسط رهگیر هر اتصال مدیریت میشود

### وضعیت سلامت توکن

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

### پیکربندی

پیکربندی بررسی سلامت توکن بهصورت داخلی توسط `tokenHealthCheck.ts` مدیریت میشود.

### سلامت توکن

> **هیچ نقطه پایانی REST وجود ندارد.** دادههای سلامت توکن از طریق داشبورد یا ابزار MCP با نام `observability_snapshot` در دسترس هستند.

---

## هشداردهی

### کانالهای داخلی

OmniRoute از **3 کانال هشدار** پشتیبانی میکند:

| کانال       | راهاندازی    | مورد استفاده              |
| ----------- | ------------ | ------------------------- |
| بنر داشبورد | همیشه فعال   | اعلانهای درونبرنامهای     |
| Webhook     | پیکربندی URL | Slack، Discord، PagerDuty |
| گزارش       | پیشفرض       | برای تجمیع گزارشهای خارجی |

### پیکربندی Webhook

> **نکته:** پیکربندی هشداردهی Webhook از طریق صفحه تنظیمات داشبورد مدیریت میشود. برای URL وبهوک، فیلترکردن رویدادها و سفارشیسازی محموله، رابط کاربری تنظیمات را ببینید.

### انواع هشدار

| هشدار                        | زمان رخداد                                  | شدت پیشفرض |
| ---------------------------- | ------------------------------------------- | ---------- |
| `provider_circuit_open`      | مدار باز میشود                              | بحرانی     |
| `provider_circuit_half_open` | مدار در حال آزمایش بازیابی است              | اطلاعاتی   |
| `quota_warning`              | سهمیه به 80% یا بیشتر میرسد                 | هشدار      |
| `quota_exhausted`            | سهمیه به 100% میرسد                         | بحرانی     |
| `token_refresh_failed`       | 3 یا بیش از 3 شکست متوالی در نوسازی         | هشدار      |
| `token_expired`              | زمان انقضای توکن گذشته است                  | بحرانی     |
| `combo_target_unhealthy`     | هدف ترکیبی برای 1 ساعت یا بیشتر در وقفه است | هشدار      |
| `db_integrity_warning`       | تعداد نقضهای FK بیشتر از 0 است              | هشدار      |
| `heap_pressure`              | استفاده از heap بیش از 80% آستانه است       | هشدار      |

---

## معیارهای عملکرد

### معیارهای ردیابیشده

| معیار                   | نوع       | منبع                            |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | شمارنده   | `services/usage.ts`             |
| `request_latency_ms`    | هیستوگرام | `services/usage.ts`             |
| `tokens_consumed`       | شمارنده   | `services/usage.ts`             |
| `cost_usd`              | شمارنده   | `services/usage.ts`             |
| `provider_errors`       | شمارنده   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | شمارنده   | `services/resilience.ts`        |
| `cache_hits`            | شمارنده   | `services/signatureCache.ts`    |
| `compression_savings`   | هیستوگرام | `services/compression/stats.ts` |
| `quota_used`            | سنجه      | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | سنجه      | `observability.ts`              |

### صدکهای تأخیر (p50/p95/p99)

> **هیچ نقطه پایانی REST وجود ندارد.** دادههای صدک تأخیر از طریق صفحه `/dashboard/health` در داشبورد در دسترس است. خروجی Prometheus/OpenTelemetry برای v3.9 برنامهریزی شده است.

### خروجی Prometheus / OpenTelemetry (فاز ۲)

برای v3.9 برنامهریزی شده است: خروجی بومی به Prometheus، OpenTelemetry و Datadog.

در حال حاضر، با استفاده از هر سیستم پایش مبتنی بر HTTP (صادرکننده blackbox پرومتئوس، بررسی HTTP دیتاداگ و غیره)، `/api/monitoring/health` را پایش کنید.

---

## دستورالعملهای هشداردهی

### Slack

> **نکته:** هشداردهی از طریق Webhook در صفحه تنظیمات داشبورد پیکربندی میشود — هیچ متغیر محیطی اختصاصی برای Webhook وجود ندارد (`grep -rn` هیچ نتیجهای برنمیگرداند). برای URL وبهوک، فیلترکردن رویدادها و سفارشیسازی payload، رابط کاربری تنظیمات را ببینید.

### Discord

> هشداردهی از طریق Webhook از همان روند رابط کاربری تنظیمات در Slack استفاده میکند. Discord همان ساختار payload از نوع JSON را میپذیرد.

### PagerDuty

> هشداردهی از طریق Webhook از همان روند رابط کاربری تنظیمات استفاده میکند. کلیدهای مسیریابی PagerDuty Events API v2 در رابط کاربری تنظیمات پیکربندی میشوند.

### Webhook سفارشی (JSON)

> هر نقطه پایانی HTTP که درخواست POST با بدنه JSON را بپذیرد، کار خواهد کرد. URL را در رابط کاربری تنظیمات پیکربندی کنید.

---

## پیکربندی داشبورد

### سفارشیسازی داشبورد سلامت

یک فایل `~/.omniroute/dashboard.json` ایجاد کنید:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### سنجاقکردن یک ارائهدهنده در بالای فهرست

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## عیبیابی

### «ارائهدهنده سالم گزارش میشود، اما درخواستها شکست میخورند»

1. **مشکلات autopilot** را بررسی کنید — شاید یک مدل مسدود شده باشد
2. **خطاهای اخیر** را برای کلاس خطای مشخص بررسی کنید
3. **آزمایش اتصال** را در کارت ارائهدهنده امتحان کنید
4. بررسی کنید که آیا ارائهدهنده در بالادست **با محدودیت نرخ مواجه شده است** (بهصورت محلی قابل مشاهده نیست)

### «سهمیه سالم گزارش میشود، اما خطاهای 429 میبینم»

- 429 یعنی ارائهدهنده اعلام میکند که سهمیه خود را مصرف کردهاید
- ممکن است ردیابی سهمیه OmniRoute **قدیمی** باشد — مرجع نهایی، ارائهدهنده بالادست است
- دادههای سهمیه بهطور خودکار از طریق پایشگر داخلی سهمیه بهروزرسانی میشوند

### «Combo با شکست مواجه میشود، اما همه مقصدها سالم به نظر میرسند»

- داشبورد **سلامت combo** را برای مشکلات ترتیب مقصدها بررسی کنید
- **رویدادهای fallback** را بررسی کنید — شاید combo گزینهها را بیش از حد سریع تمام میکند
- اطمینان حاصل کنید که **راهبرد** با مورد استفاده شما مطابقت دارد (اولویت در برابر نوبتگردشی در برابر خودکار)

### «بررسی سلامت پایگاه داده ناموفق است»

- دستور `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` را اجرا کنید
- اگر نتیجه "ok" بود — هشدار کاذب است و بررسی سلامت بیش از حد سختگیرانه عمل میکند
- اگر نتیجه چیز دیگری بود — **OmniRoute را متوقف کنید** و [راهنمای بازیابی پس از فاجعه](./DATABASE_GUIDE.md#disaster-recovery) را دنبال کنید

### «فشار حافظه heap بحرانی است»

```bash
# heap فعلی را بررسی کنید
node -e "console.log(process.memoryUsage())"

# GC را بهصورت دستی فعال کنید (اگر --expose-gc وجود دارد)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# تعداد درخواستهای همزمان را کاهش دهید (از طریق صفحه تنظیمات داشبورد تنظیم کنید، نه یک متغیر محیطی)
# هیچ متغیر محیطی `MAX_CONCURRENT_REQUESTS` وجود ندارد — آن را در تنظیمات ← همزمانی پیکربندی کنید.
```

---

## همچنین ببینید

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — رهگیری میزان استفاده و هزینه
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — طرحوارهٔ پایگاه داده + سلامت
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — سلامت پراکسی (حافظهٔ نهان جداگانه)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — معماری سیستم
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — جزئیات قطعکنندهٔ مدار
- منبع: `src/lib/monitoring/` (۴ فایل، ۲۱۲۱ خط کد)
