# Quality Gates Reference (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

این سند مرجع رسمی تمام دروازههای کیفیت CI در OmniRoute است.
این سند هر دروازه، مواردی که اعتبارسنجی میکند، job مربوط به CI که در آن اجرا میشود، اینکه آیا از
خط مبنای ratchet یا سیاست قبول/رد استفاده میکند، و اینکه آیا build را مسدود میکند یا صرفاً جنبه مشورتی دارد، شرح میدهد.

برای مشاهده خلاصهای کوتاه و سیاست allowlist، به بخش «دروازههای کیفیت و Ratchetها»
در `AGENTS.md` مراجعه کنید. برای ارزیابی انتقادی، طبقهبندی بلوغ و برنامه مستقل از ابزار
برای بازتولید همین سیستم، به
[راهنمای دروازه کیفیت](../ops/QUALITY_GATE_PLAYBOOK.md) مراجعه کنید.

---

## فهرست گیتها و پروفایلهای اجرا

### پذیرش کاندیدا

گردشکارهای CI و Quality Gates هرکدام یک نتیجهٔ پایدار تولید میکنند: `Gate / CI` و
`Gate / Quality`. خطمشی پذیرش نسخهبندیشدهٔ آنها، همهٔ کارهای بالادستی را بهعنوان
الزامی یا مشورتی فهرست میکند. هر کار الزامیِ قابلاعمال باید با موفقیت انجام شود:
نتایج مفقود، لغوشده، ردشده، در انتظار و ناشناخته نمیتوانند وضعیت PASS را اثبات کنند.
یک طبقهبندی معتبرِ فقط مستندات یا فقط کاتالوگ میتواند یک مسیر کد را غیرقابلاعمال کند؛
PR پیشنویس بهعنوان کاندیدای پذیرفتهشده محسوب نمیشود. برچسب `hotfix` الزام ارائهٔ شواهد را لغو نمیکند.

هر دو گردشکار، PRهای واردشونده به شاخههای main/release، پوشها به `main`، اجرای دستی
و رویدادهای merge-group را پوشش میدهند. push، dispatch و merge-group مجموعهٔ کامل را اجرا میکنند.
پوشها به `release/**` آنها را آغاز نمیکنند (2026-10-18): هر تغییر پیشتر ماتریس را در PR خود اجرا کرده
و ترکیب ادغامشده بر عهدهٔ Release-Green است (`docs/ops/RUNNER_BOX.md` → مسیر Hosted). فورکها
و گروههای ادغام برای کارهایی که در حالت عادی اجراکنندههای self-hosted را انتخاب میکنند، از
اجراکنندههای hosted استفاده میکنند؛ پیش از عرضه باید ظرفیت کافی hosted تأیید شود.

هر رسید JSON، SHA مربوط به checkout، اجرای گردشکار و تلاش اجرا را مشخص میکند.
CLI عدم تطابق SHA میان checkout و رویداد را رد میکند. آزمونهای گردشکار، عضویت در خطمشی را
به فهرست `needs` کار نتیجه متصل میکنند تا یک مسیر جدید یا حذفشده نتواند بیسروصدا ناپدید شود.
رسیدها گردشکار خودشان را پوشش میدهند، نه انتشار، استقرار یا جزئیات داخلی یک اسکنر مشورتی موجود را. الزامیکردن بررسیهای قابلاعمال در قوانین شاخه، یک تغییر مدیریتی جداگانه است؛ تعریف jobهای آنها بهخودیخود از یک شاخه محافظت نمیکند.

`API Route Typecheck` یک بررسی گردشکار مستقل است که خارج از هر دو نتیجه تجمیعی و نمایه ایستای ناظر کامل محلی قرار دارد. نتیجه آن را برای candidate دقیق، جداگانه بررسی کنید. `.github/workflows/api-route-typecheck.yml` برای PRهای ورودی به `main` یا `release/**`، pushها به هر یک از این خانوادههای شاخه و اجرای دستی اجرا میشود. این گردشکار هیچ فیلتر مسیری ندارد. تغییر مجدد شاخه پایه PR، یک بررسی جدید درخواست میکند؛ ویرایشهای بدنه/عنوان از نام صرفاً نظارتی `Admission not requested / API Route Typecheck` استفاده میکنند و نمیتوانند جایگزین بررسی پذیرش شوند. این گردشکار هیچ trigger مربوط به merge-group تعریف نمیکند. هر rollout مربوط به merge queue که این بررسی را الزامی میکند، باید ابتدا اجرای آن را برای آن event برقرار کند.

### ظرفیت اجرای UI

CI کل فهرست UI را در قالب چهار شارد ماتریسی `test-vitest` اجرا میکند که هرکدام حداکثر
دو worker و مهلت فعلی ۱۵ دقیقهای برای کار دارند. شارد نخست همچنین مجموعهٔ Vitest مربوط به
MCP/autoCombo را اجرا میکند. نتیجهٔ کار الزامی، همهٔ بخشهای ماتریس را پوشش میدهد؛ شکست
یا لغو یک شارد نمیتواند پذیرش کاندیدا را اثبات کند.

ناظر شبانه برای هر شارد UI یک رسید جداگانه و دقیقاً مربوط به همان کاندیدا نگه میدارد
که اجرای MCP نیز در رسید نخست گنجانده شده است. هر چهار رسید، لاگها و
هویتهای اجرایی منطبق الزامی هستند. اجرای محلی `npm run test:vitest:ui` همچنان
مجموعهٔ کامل را انتخاب میکند؛ یک اجرای `--shard` تنها شواهد جزئی ارائه میدهد.

### گردآوری پوشش unit

دوازده شارد unit در طول اجرای آزمونهای موجود خود، پوشش V8 را گردآوری میکنند. یک
شارد موفق، `scripts/ci/compact-v8-coverage.mjs` را برای فشردهسازی فایلهای اصلی بدون تولید
گزارش میانی Istanbul اجرا میکند. سپس کار نهایی Coverage هر دوازده manifest را با
SHA کاندیدا، runtime، ریشهٔ منبع و هشهای داده تطبیق میدهد و پس از آن گزارشسازهای c8
و آستانههای پوشش موجود را اجرا میکند. ورودیها ترتیب سراسری نام فایلهای c8 را حفظ میکنند؛
پیشادغام در سطح هر شارد برای پوشش ترکیبی function/block ایمن نیست. شاردهای مفقود،
بدشکل یا ناسازگار باعث شکست پذیرش میشوند. شاردهای آزمون ناموفق، پوشش تشخیصی خام را
جداگانه نگه میدارند؛ این دادهها نمیتوانند وارد ادغام نهایی شوند.

### رسیدهای پیشرفت اجرای تستهای واحد

دستور مشترک `test:unit:ci:shard` فازهای `primary`، `dashboard` و `serial` را از طریق
`scripts/ci/unit-progress-reporter.mjs` ثبت میکند. گزارش عادی تست همچنان در دسترس
است. یک رسید جداگانه که فقط شامل فراداده است، شروع و تکمیل هر فایل را ثبت میکند
و یک ضربان حیات ۳۰ ثانیهای، فایلهایی را که همچنان فعال هستند و زمان سپریشده آنها را فهرست میکند. این رسید
فقط فراداده اجرایی فهرست مجاز را ثبت میکند؛ توضیحات تست، خروجی، بدنه خطاها و کل
محیط سریالسازی نمیشوند.

CI و Quality فایلهای JSONL را با نامهای `unit-progress-ci-<run>-<attempt>-<shard>` و
`unit-progress-quality-<run>-<attempt>-<shard>` نگه میدارند. پایان مهلت زمانی یک job ممکن است مانع بارگذاری بعدی شود؛
ضربانهای حیاتی که پیشتر منتشر شدهاند، بهعنوان شواهد تشخیصی باقی میمانند. نبود ضربان حیات همچنین میتواند نشاندهنده
مسدود یا خاتمهیافته بودن فرایند runner باشد. این رسیدها انتخاب تست، همروندی،
مهلتها و وضعیت خروج موجود را حفظ میکنند؛ آنها حکم پذیرش نامزدها نیستند.

### شواهد نگه‌داری‌شده در تجمیع‌کنندهٔ پذیرش

`scripts/quality/validate-release-acceptance.mjs` طرح ارائه‌شده و مانیفست‌های آن را تجمیع می‌کند؛ ثابت نمی‌کند که طرح، کل خط لولهٔ انتشار را پوشش می‌دهد. گزارش‌های آن صریحاً `releaseAcceptance: false` را تنظیم می‌کنند، حتی اگر طرح `VERIFIED` باشد. گردش‌کار `release-acceptance.yml` همچنان از داده‌های آزمون سایه استفاده می‌کند، نه رسیدهای واقعی ساخت، بسته‌بندی، راه‌اندازی یا ارتقا.

CLI برای بررسی شواهد نگه‌داری‌شده به `--evidence-root` نیاز دارد. فایل‌ها در مسیر `<evidence-root>/<artifact_id>/<member>` پیدا می‌شوند و هش SHA-256 آن‌ها محاسبه می‌شود. رکورد PASS بدون شواهد، فایل مفقود یا تغییریافته، مسیر ناامن یا پیوند نمادین مانع تأیید می‌شود. فایل‌های مفقود معادل لاگ‌های خالیِ اجرای موفق نیستند. بررسی‌های موجود SHA/run/attempt مستقل باقی می‌مانند: تطابق بایت‌ها نمی‌تواند رسید قدیمی را معتبر کند. یکپارچگی فایل اثبات‌کنندهٔ اصالت اجرا یا ارتقای آرتیفکت نیست.

### فهرست اسکن استاتیک

فهرست npm-alias نسخهبندیشده و عضویت در اسکن استاتیک در
`config/quality/gate-manifest.json` قرار دارند. برای اعتبارسنجی نام اسکریپتها و فرمانهای دقیق
در برابر `package.json`، دستور `npm run check:gate-manifest` را اجرا کنید؛ افزودن، حذف
و تغییر فرمان باعث شکست هم hook محلی و هم کارهای طبقهبندی تغییرات در CI میشود.
یک alias معادل کار گردشکار، نمونهٔ ماتریس یا مورد آزمون نیست: این تعدادها نباید
بهعنوان مفاهیم قابلجایگزینی ارائه شوند.

برای بررسی aliasهای انتخابشده بدون اجرای آنها، از `npm run quality:scan -- --list` یا
`npm run quality:scan:fast -- --list` استفاده کنید. اجراکننده، نقطهٔ ورود npm را فراخوانی میکند؛
بنابراین runtime آن، از جمله Bun در محلهایی که پیکربندی شده، حفظ میشود.
manifest، aliasهای خارج از این پروفایلها را بهعنوان مواردی که جداگانه فراخوانی میشوند ثبت میکند و
فرمانهای نگهداری در پروفایلهای اسکن فقطخواندنی ممنوع هستند.

این پروفایلها فقط اسکن استاتیک را پوشش میدهند. آنها آزمونهای محصول،
پوشش، بستهبندی، بررسیهای خارجی یا پذیرش کامل انتشار یک کاندیدا را تأیید نمیکنند.
پذیرش گردشکار از `config/quality/admission-policy.json` پیوندشده و
`scripts/quality/admission-verdict.mjs` استفاده میکند. پروفایلهای ناظر انتشار جدا باقی میمانند؛
بررسیها و رسیدهای قابلاعمال آنها را بهطور مستقل بررسی کنید. فرمانهای استاتیک ناظر کامل
در `config/quality/release-green-static-profile.json` اعلام شدهاند، از جمله
`audit:deps`، انتخاب آزمون جهش و بررسیهای ترجمه. loader فرمانهای npm را در برابر
package.json و اعلانهای مدلسازیشدهٔ CI/Quality اعتبارسنجی میکند؛ بهجای اجرای توکنهای shell
بهعنوان آرگومان، تغییرات ناسازگار را رد میکند. خروجی SKIP/INCOMPLETE اسکنر الزامی
نمیتواند وضعیت PASS را اثبات کند. پروفایل، موارد مستثنای خارجی خود را ثبت میکند و جایگزین
شواهد پوشش hosted، ماتریسهای آزمون، بسته یا استقرار نمیشود. فهرست متنی زیر
صرفاً یک مرجع است، نه مدرکی مبنی بر اینکه یک گیت واقعاً اجرا شده است.

اسکریپتها در `scripts/check/` (گیتهای خطمشی) و `scripts/quality/` (موتور ratchet) قرار دارند.
منبع حقیقت CI فایل `.github/workflows/ci.yml` است.

### سلامت مستندات پایهٔ منتشرشده

`.github/workflows/i18n-base-health.yml` پس از pushهای منتخب به `main` و `release/v*` و نیز هنگام اجرای دستی، سلامت مستندات را پایش میکند. فیلترهای آن مستندات،
Markdown ریشه، `llm.txt`، وضعیت/پیکربندی ترجمه و ابزارهای مرتبط i18n را پوشش میدهند.
job واحد `Published base documentation health` از Ubuntu میزبانیشده استفاده میکند و
مهلت آن پنج دقیقه است. این job اعتبارسنجی فقطخواندنی انجام میدهد و بدون نصب
وابستگی، ترجمه یا پذیرش وضعیت، یک رسید تشخیصی مینویسد.

`scripts/i18n/check-base-health.mjs` مستلزم نبود هرگونه ناسازگاری در source-hash، missing-target، target-hash،
stale-translation و section-cache است. همچنین دامنهٔ فعلی سند/locale اصلی و منشأ
ثبتشدهٔ آن را اعتبارسنجی میکند. زمینهٔ نامعتبر، پوشش ناقص یا اجرای متوقفشدهٔ
بررسیکننده، نتیجهٔ `INCOMPLETE` را ایجاد میکند؛ انحراف تأییدشده نیز نتیجهٔ `FAIL` را ایجاد میکند. هر دو
یک وضعیت خروج ناموفق برمیگردانند. رسید به SHA مربوط به checkout، workflow، run و
attempt مقید است و با نام `i18n-base-health-<sha>-<run>-<attempt>` نگهداری میشود.

این یک مشاهدهٔ مستقل از پایهٔ منتشرشده است. این فرایند هیچ رویداد PR یا
merge-group، بررسی الزامی PR، alias مربوط به npm یا عضو پروفایل static-scan اضافه نمیکند.
سیاست تفاضلی موجود برای PR و طبقهبندیهای مشورتی بررسیکنندهٔ زیرین
مستقل باقی میمانند. upload موفق نمیتواند نتیجهٔ ناموفق سلامت را به PASS تبدیل کند.

### مسیر سریع PR انتشار (`quality.yml`)

`.github/workflows/quality.yml` در PRهای main/release، پوشها به `main`،
dispatch و گروههای ادغام، مکمل CI است. PRها از بررسیهای سریع فیلترشده بر اساس مسیر استفاده میکنند.
build تکراری که برای همیشه غیرفعال بود حذف شده است؛ بررسیهای واقعی build/package/boot در CI باقی میمانند.

| کار                                              | دامنه                                                                                                                                                                                     | مسدودکننده       |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | PRهای مستندات/کد؛ ارجاعات مستندات API و docs-all                                                                                                                                          | بله              |
| `Fast Quality Gates`                             | PRهای کد؛ بررسیهای ایستا، بررسی نوع، بررسی نوع داشبورد و تستهای واحد تحتتأثیر                                                                                                             | بله              |
| `Forgotten sibling tests`                        | PRهای کد؛ ردیابی ماژولهای تغییریافته تا مصرفکنندگان ایستا و تستهای همردهٔ کاندید؛ مسیرهای barrel و import پویا بهصورت عیبیابی مشورتی گزارش میشوند، همراه با استثناهای فهرست مجاز ارجاعشده | **مشورتی**       |
| `Vitest (fast-path)`                             | PRهای کد؛ مجموعهٔ سریع vitest                                                                                                                                                             | بله              |
| `Unit Tests fast-path`                           | PRهای کد؛ مجموعهٔ تست واحد ۴-shard                                                                                                                                                        | بله              |
| `No new ESLint warnings`                         | PRهای کد؛ محافظ lint آگاه از suppressionها                                                                                                                                                | بله، شامل forkها |
| `Merge integrity (changelog + generated skills)` | PRهای غیردرنویس؛ همگامسازی changelog و skillهای تولیدشده                                                                                                                                  | بله، شامل forkها |

#### گزارش تستهای همردهٔ فراموششده

`npm run check:forgotten-sibling-tests` از تحلیلگر import مورد استفاده در نگاشت تأثیر تست دوباره استفاده میکند.
برای هر ماژول production تغییریافته، زنجیرههای قطعی
`changed module/symbol -> static consumer -> candidate sibling test` را زمانی گزارش میکند که تست کاندید
در diff درخواست pull وجود نداشته باشد. خلاصهٔ Markdown و نتیجهٔ JSON بهعنوان artifact گردشکار
`forgotten-sibling-tests` برای تنظیم پیش از هرگونه عرضهٔ مسدودکننده نگهداری میشوند.

بازصادراتهای barrel و importهای پویا فقط عیبیابیهای resolution هستند؛ آنها هرگز یافتهای
مسدودکننده ایجاد نمیکنند. استثناهای بازبینیشده در
`config/quality/forgotten-sibling-allowlist.json` قرار دارند. هر ورودی باید نام مصرفکننده و تست کاندید
را مشخص کند، دلیل مشخصی ارائه دهد و به یک issue یا درخواست pull در GitHub پیوند دهد. ورودیهای نامعتبر بهصورت
بسته شکست میخورند. استثناها نمیتوانند یک تست کاندید حذفشده یا diffای را که `.skip`/`.todo` اضافه میکند، سرکوب کنند؛
تضعیف assertion و سایر روشهای پنهانسازی همچنان بر عهدهٔ gate مسدودکننده و مستقل
`check:test-masking` است.

### کار: `lint`

در هر PR به `main` اجرا میشود. در صورت شکست، ادغام را مسدود میکند.

| اسکریپت (`npm run ...`)           | اعتبارسنجی میکند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | مسدودکننده                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | نسخهٔ Node.js در محدودهٔ پشتیبانیشده قرار دارد                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | بله                                    |
| `check:test-tla-order`            | هیچ فایل `node:test` در `tests/unit` ابتدا آزمونی ثبت نمیکند، سپس به یک `await` در سطح بالا نمیرسد و بعد آزمونهای بیشتری ثبت نمیکند (#18045؛ سازوکار جغجغهای: `test-tla-order-allowlist.json` فقط میتواند کوچکتر شود)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                    |
| `check:cycles`                    | importهای دوری در سراسر `src/` + `open-sse/` (مبتنی بر AST، با resolve شدن `paths` مربوط به tsconfig). نسخهٔ خام هرگاه چرخهای وجود داشته باشد با کد 1 خارج میشود (از #15281 بهصورت fail-closed) و SCCها را فهرست میکند. `check:cycles:ratchet` (آنچه CI اجرا میکند) زمانی مسدود میکند که تعداد از سقف `metrics.cycles` در `quality-baseline.json` فراتر رود — در حال حاضر 14، با `direction: down`، بنابراین فقط میتواند کاهش یابد (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله (سازوکار جغجغهای)                  |
| `check:boundary`                  | وابستگی `open-sse → src`: importهای منحصربهفرد فایلبهفایل از موتور به برنامه (`scripts/quality/measure-boundary.mjs`؛ فهرست یالها، کارهای معوقهٔ اصلاحی برای هستهٔ v4/تفکیک ماژول است). نسخهٔ خام = گزارش مشورتی (همانند `quality:boundary`). `check:boundary:ratchet` (آنچه CI اجرا میکند و در حلقهٔ جغجغهای fast-gates مربوط به `quality.yml` نیز قرار دارد) زمانی مسدود میکند که تعداد از سقف `metrics.boundaryOpenSseToSrc` در `quality-baseline.json` فراتر رود — مقدار اولیه برابر با عدد اندازهگیریشدهٔ 771، با `direction: down`؛ `--update` فقط آن را کاهش میدهد؛ در PRها نسبت به شاخهٔ مبنا محاسبه میشود (`--base-ref`، پایین را ببینید)                                                                                                                                                                                                                                                      | بله (سازوکار جغجغهای)                  |
| `check:route-validation:t06`      | وجود Zod schema در همهٔ مسیرها (سیاست سطح 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | بله                                    |
| `check:any-budget:t11`            | تعداد `@ts-expect-error // any` از سقف مجاز فراتر نمیرود (گیت کنترلی سطح 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | بله                                    |
| `check:provider-consistency`      | هر ارائهدهنده در `providers.ts` یک ورودی متناظر در `providerRegistry.ts` دارد (و بالعکس، در محدودهٔ فهرست مجاز)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | بله                                    |
| `check:model-lifecycle`           | سه جدول مسیریابی که بهصورت دستی نگهداری میشوند، با اسنپشات چرخهٔ عمر ثبتشده در مخزن (#11503) سازگار باقی میمانند: `FITNESS_TABLE` (`taskFitness.ts`) به هیچ شناسهٔ بازنشستهای که `REGISTRY` بتواند به آن مسیریابی کند امتیاز نمیدهد؛ هر مقصد `BUILT_IN_ALIASES` در `REGISTRY` وجود دارد و در اسنپشات شناسههای بازنشسته نیست؛ هر شناسهٔ بازنشستهای که همچنان در `REGISTRY` است، هدایت میشود یا در `allowedRetiredInCatalog` فهرست شده است؛ و هیچ مبدأ یا مقصدی از `DEFAULT_DEGRADATION_MAP` در آن اسنپشات بازنشسته محسوب نمیشود. این بررسی ثابت نمیکند که یک مدل در حال حاضر توسط یک بالادست فعال سرویسدهی میشود. آفلاین — با `config/quality/model-lifecycle.json` مقایسه میکند که بهصورت دستی با `npm run quality:refresh-model-lifecycle` بهروزرسانی میشود (نیازمند شبکه؛ به CI متصل نیست). `allowedRetiredInCatalog` یک ضامن کاهش تدریجی است: فقط همراه با یک مسئلهٔ رهگیری، ورودی جدیدی اضافه کنید. | بله                                    |
| `check:fetch-targets`             | هر `fetch("/api/...")` در `src/` سمت کلاینت به یک `route.ts` واقعی منتهی میشود                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | بله                                    |
| `check:deps`                      | همهٔ وابستگیهای قابل نصب با `npm install` در تمام فایلهای `package.json` مخزن، در `dependency-allowlist.json` قرار دارند؛ بستههای جدیدِ بدون نسخهٔ ثابت یا دارای نام مشابه برای جعل بسته علامتگذاری میشوند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | بله                                    |
| `audit:deps`                      | ممیزی npm برای هر پنج lockfile مستقل (ریشه، Electron، افزونههای OpenCode نسخههای v1/v2 و ارائهدهنده). هشدارهای بحرانی باعث توقف میشوند؛ هشدارهای سطح بالا بهصورت اخطارهای قابلمشاهده باقی میمانند. ممیزیهای مفقود/ناموفق INCOMPLETE محسوب شده و باعث توقف میشوند؛ هشهای قفل و گزارشهای هر محدوده نگهداری میشوند.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | بله                                    |
| `check:lockfile`                  | یکپارچگی `package-lock.json` — رجیستری https، هشهای یکپارچگی، بدون بازنویسی میزبان                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                    |
| `check:licenses`                  | فهرست مجاز مجوزهای SPDX برای وابستگیهای محیط تولید                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                    |
| `check:tracked-artifacts`         | بدون مصنوعات ساخت / پیوندهای نمادین `node_modules` ثبتشده (در pre-commit مربوط به husky نیز اجرا میشود؛ pre-push عمداً سبک است — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله                                    |
| `check:ai-attribution`            | بدون تریلر `Co-Authored-By` مربوط به هوش مصنوعی/بات یا پانوشت تولیدشده توسط هوش مصنوعی در commitها، عنوان یا بدنه PR — قانون سختگیرانه شماره ۱۶ (در حلقه fast-gates فایل `quality.yml` برای PR→`release/**` — payload رویداد را میخواند و خارج از PRها هیچ عملی انجام نمیدهد — و یک مرحله مختص PR در lint فایل `ci.yml` برای PR→`main`؛ همچنین hook مربوط به `commit-msg` در husky؛ همنویسندگان انسانی مجازند؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | هر مورد استثنای Vitest یک issue پیگیری را مشخص میکند و در `config/quality/vitest-exclusions.json` ظاهر میشود (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                    |
| `check:file-size`                 | فایلهای منبع (`.ts`/`.tsx` در `src/`، `open-sse/`، `electron/`، `bin/`) باید در محدوده `cap` و فایلهای آزمون (`*.test.ts(x)`) در محدوده `testCap` باقی بمانند؛ فایلهای تثبیتشده در `file-size-baseline.json` (`frozen` / `testFrozen`) نباید از اندازه ثبتشده خود بزرگتر شوند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | بله                                    |
| `check:error-helper`              | پاسخهای خطا در اجراکنندهها/مدیریتکنندهها از `buildErrorBody()` / `sanitizeErrorMessage()` استفاده میکنند (قانون سختگیرانه شماره ۱۲)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | بله                                    |
| `check:migration-numbering`       | فایلهای SQL مهاجرت بهصورت متوالی شمارهگذاری شدهاند و هیچ فاصله یا شماره تکراری ندارند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                    |
| `check:public-creds`              | هیچ مقدار صریح OAuth برای `client_id`/`client_secret` یا کلید وب Firebase خارج از `publicCreds.ts` وجود ندارد (قانون سختگیرانه شماره ۱۱)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | بله                                    |
| `check:db-rules`                  | هیچ SQL خامی خارج از ماژولهای `src/lib/db/` وجود ندارد؛ هیچ درونریزی تجمیعی از `localDb.ts` انجام نمیشود (قوانین سختگیرانه شماره ۲/۵)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                    |
| `check:known-symbols`             | اجراکنندههای ارائهدهندگان، راهبردهای مسیریابی و مترجمهای ثبتشده در جدولهای توزیع مربوطه با فایلهای روی دیسک مطابقت دارند — هیچ نماد یتیم یا تعریفنشدهای وجود ندارد                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                    |
| `check:route-guard-membership`    | هر مسیری که یک فرایند فرزند ایجاد میکند، توسط `isLocalOnlyPath()` طبقهبندی میشود (قواعد سختگیرانه #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | بله                                    |
| `check:test-discovery`            | هر فایل `*.test.ts` / `*.spec.ts` در مخزن توسط حداقل یک اجراکنندهٔ آزمون جمعآوری میشود (سازوکار ضامندار: فهرست فایلهای یتیم در `test-discovery-baseline.json` فقط میتواند کوچکتر شود)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                    |
| `check:agent-skills-sync`         | مصنوعات تولیدشدهٔ مهارتهای عامل با فهرست منبع خود مطابقت دارند (بدون انحراف)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | لوگوها/داراییهای ارائهدهنده دارای مدخل ثبتشدهٔ منشأ هستند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | فایلهای پیکربندی JSON تجزیه میشوند و قواعد لینت مخزن را رعایت میکنند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | کامپایل TypeScript بدون خطا (فقط هشدارهای مشورتی)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | بله                                    |
| `typecheck:noimplicit:core`       | `noImplicitAny` سختگیرانه — آیندهنگر؛ بسیاری از محلهای فراخوانی از پیش موجود همچنان به حاشیهنویسی نوع نیاز دارند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **مشورتی** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | اجرای `tsc` محدود به `src/app/(dashboard)/**` (#7033) — فهرست مجاز دستچینشدهٔ ۲۷ فایلیِ `typecheck:core` هیچ فایل TSX داشبوردی را شامل نمیشود و `next build` نیز هرگز نوعهای آن را بررسی نمیکند (`next.config.mjs` مقدار `ignoreBuildErrors: true` را تنظیم میکند)، بنابراین پسرفتهای شناسههای بدون مرجع در آنجا (#6625/#6909) برای CI نامرئی بودند. تفاوتها نسبت به یک خط مبنای ثابت از تعداد خطاها بهازای هر فایل/کد TS (`config/quality/dashboard-typecheck-baseline.json`، با همان الگوی اعمال کهنگیِ `check:known-symbols`) سنجیده میشوند — فقط خطاهای جدیدی که از تعداد ثبتشده در خط مبنا فراتر روند باعث شکست دروازه میشوند؛ هنگامی که یک خطای ازپیشموجود رفع شد، با `--update` خط مبنا را کاهش دهید.                                                                                                                                                                                            | بله                                    |

### کار: `quality-gate`

پس از `test-coverage` اجرا میشود. در صورت شکست، ادغام را مسدود میکند.

| اسکریپت                      | اعتبارسنجی                                                                                                                                                                                      | مسدودکننده                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | فایل `quality-metrics.json` را تولید میکند (تعداد هشدارهای ESLint و پوشش از گزارش ادغامشدهٔ بخشها)                                                                                              | بله (پیشنیاز سازوکار جغجغهای) |
| `quality:ratchet`            | هیچیک از معیارهای `quality-baseline.json` پسرفت نکرده باشد (هشدارهای ESLint ≤ خط مبنا؛ پوشش ≥ خط مبنا)                                                                                          | بله                           |
| `check:duplication`          | میزان تکرار کد (jscpd@4) از خط مبنای موجود در `quality-baseline.json` فراتر نرود                                                                                                                | بله                           |
| `check:complexity`           | پیچیدگی دوری در سطح فایل از سقف تعیینشده فراتر نرود (`complexity` اصلی ESLint بههمراه `max-lines-per-function`)                                                                                 | بله                           |
| `check:cognitive-complexity` | سازوکار جغجغهای پیچیدگی شناختی (`eslint-plugin-sonarjs`) — یک اجرای جداگانهٔ ESLint؛ CI هر دو را بهصورت یک مرحلهٔ واحد `check:complexity-ratchets` اجرا میکند                                   | بله                           |
| `check:dead-code`            | سازوکار جغجغهای صادرات/فایلهای استفادهنشده (knip) نسبت به خط مبنا پسرفت نکند                                                                                                                    | بله                           |
| `check:compression-budget`   | بودجهٔ بنچمارک فشردهسازی — حداقل صرفهجویی توکن برای هر موتور نباید پسرفت کند                                                                                                                    | بله                           |
| `check:type-coverage`        | سازوکار جغجغهای درصد کد نوعدار (`type-coverage`) پسرفت نکند؛ تا حد زیادی `typecheck:noimplicit:core` را پوشش میدهد                                                                              | بله                           |
| `check:codeql-ratchet`       | تعداد هشدارهای باز CodeQL پسرفت نکند (از طریق `gh api` خوانده میشود؛ بدون توکن، بهشکلی کنترلشده رد میشود) — برای تناوب بهروزرسانی و اجرای دستی، بخش «سازوکار جغجغهای CodeQL» در ادامه را ببینید | بله                           |

### کار: `quality-extended`

این کار گزینههای قابلاعمال را مسدود میکند. اندازهٔ بسته، یافتههای مربوط به اسرار، یافتههای آسیبپذیری،
یافتههای گردشکار و تغییرات OpenAPI با سازوکارهای جغجغهای الزامی بررسی میشوند.
عیبیابی وابستگیهای دوری همچنان جنبهٔ توصیهای دارد. نصب اسکنر الزامی است:
`scripts/ci/install-quality-scanners.sh` نسخههای ثابتشده را فراهم میکند و
شکستهای نصب را منتشر میکند. ابزارهای مفقود، گزارشهای نامعتبر یا خطوط مبنای مفقود باعث میشوند
دروازهٔ اسکنر الزامی در وضعیت INCOMPLETE باقی بماند.

| اسکریپت                  | اعتبارسنجی                                                                                                                                                                                                                     | مسدودکنندگی                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `check:circular-deps`    | نبود وابستگیهای چرخهای (dpdm)                                                                                                                                                                                                  | **توصیهای**                                                   |
| `check:bundle-size`      | اندازهٔ بسته از سقف تعیینشده فراتر نمیرود؛ در دسترس نبودن اندازهگیری باعث شکست میشود                                                                                                                                           | **مسدودکننده با --ratchet**                                   |
| `check:secrets`          | یافتههای Gitleaks پسرفت نمیکنند؛ اسکنهای الزامی، ابزار/منبع/خط مبنای مفقود، اسکنهای ناموفق و گزارشهای نامعتبر را رد میکنند                                                                                                     | **مسدودکننده با --ratchet**                                   |
| `check:vuln-ratchet`     | آسیبپذیریهای وابستگیها پسرفت نمیکنند؛ اسکنهای الزامی، ابزارهای مفقود، گزارشهای نامعتبر یا خطوط مبنای مفقود را رد میکنند                                                                                                        | **مسدودکننده با --ratchet**                                   |
| `check:workflows`        | لینت گردشکار (actionlint + zizmor)؛ اسکنرهای مفقود/خراب، گزارشهای نامعتبر یا خط مبنای ratchet مفقود با وضعیت INCOMPLETE شکست میخورند. یافتههای معتبر از سیاست strict/advisory/ratchet انتخابشده پیروی میکنند                   | اجرا الزامی است؛ ratchet مربوط به zizmor در CI مسدودکننده است |
| `check:openapi-breaking` | قرارداد API عمومی در برابر کامیتهای سنجاقشدهٔ رویداد (merge-base درخواست PR، مقدار before برای push، پایهٔ merge-group؛ برای اجرای زمانبندیشده/دستی، والد اول checkout)؛ اندازهگیری الزامی در صورت خطا بهصورت بسته شکست میخورد | **مسدودکننده با --ratchet**                                   |

### کار: `docs-sync-strict`

برای pull requestهای به `main` یا `release/**`، این کار فقط برای نامزدهایی اجرا می‌شود که پیش‌نویس نیستند (یا در صف مورد اعتماد قرار دارند) و به‌عنوان تغییرات مستندات یا کد دسته‌بندی شده‌اند. این کار در رویدادهای CI غیر از PR نیز اجرا می‌شود؛ محرک push این گردش‌کار فقط `main` را پوشش می‌دهد، نه `release/**` را. مرحله‌ای که با کد خروج غیرصفر پایان یابد، کار را مسدود می‌کند؛ یافته‌های صرفاً گزارشی و استثناهای مستندشده در زیر آن را مسدود نمی‌کنند.

| اسکریپت                        | اعتبارسنجی                                                                                                                                                                                                                                                                                                                                                                                                                                    | مسدودکنندگی                                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | دروازهٔ جامعی که ۷ زیردروازهٔ زیر را بهترتیب اجرا میکند                                                                                                                                                                                                                                                                                                                                                                                       | بله                                                                                                                                  |
| ↳ `check:docs-sync`            | سازگاری نسخه‌های بسته/OpenAPI/CHANGELOG، نسخه‌های آینه‌ای دقیق `llm.txt`، ناورداهای بخش‌ها و اندازهٔ CHANGELOG ترجمه‌شده و نبود مستندات تکراری که جایگزین شده‌اند                                                                                                                                                                                                                                                                             | بله                                                                                                                                  |
| ↳ `check:docs-frontmatter`     | صفحات مستندات کامپایلشده دارای عنوانهای frontmatter معتبر هستند                                                                                                                                                                                                                                                                                                                                                                               | بله                                                                                                                                  |
| ↳ `check:docs-counts`          | ناورداهای شمارش با اطمینان بالا به‌صورت سخت‌گیرانه اعمال می‌شوند؛ بررسی‌های ابتکاری تعداد فایل‌ها فقط هشدار می‌دهند، مگر آنکه اسکریپت `--strict` را دریافت کند (دروازهٔ جامع CI آن را ارسال نمی‌کند)                                                                                                                                                                                                                                          | لایهٔ سخت‌گیرانه مسدودکننده است؛ لایهٔ نرم صرفاً هشدار می‌دهد                                                                        |
| ↳ `check:env-doc-sync`         | خواندن متغیرهای محیطی در کد منبع، `.env.example` و `docs/reference/ENVIRONMENT.md` پس از اعمال فهرست‌های صریح استثنا برای موارد نادیده‌گرفته‌شده، موارد فقط در مستندات و موارد فقط در محیط، با یکدیگر سازگارند                                                                                                                                                                                                                                | بله، خارج از فهرست‌های استثنای مستندشده                                                                                              |
| ↳ `check:deprecated-versions`  | نسخه‌های احتمالاً قدیمی خارج از زمینه‌های تاریخی بی‌اشکال و تاریخ‌های به‌روزرسانی قدیمی را گزارش می‌کند و مستندات نادیده‌گرفته‌شده را کنار می‌گذارد                                                                                                                                                                                                                                                                                           | در پیکربندی فعلی CI صرفاً هشدار می‌دهد (`--strict` ارسال نمی‌شود)                                                                    |
| ↳ `check:doc-links`            | پیوندهای داخلی markdown در مستندات به فایلهای واقعی resolve میشوند (قالب `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                   | بله                                                                                                                                  |
| ↳ `check:fabricated-docs`      | مسیرها، متغیرهای محیطی، فرمانهای CLI، نام hookها و مسیرهای فایل ذکرشده در مستندات، در پایگاه کد وجود دارند. دروازهٔ سخت از طریق `--strict`؛ بدون این فلگ، شکست نرم است.                                                                                                                                                                                                                                                                       | بله (از طریق `--strict` در CI)                                                                                                       |
| `check:cli-i18n`               | کلیدهای `t()` مورداستفادهٔ CLI در `en` وجود دارند؛ `pt-BR` همهٔ بخش‌های سطح بالا را حفظ می‌کند؛ `zh-CN` و `zh-TW` همهٔ کلیدهای `en` را در بر دارند                                                                                                                                                                                                                                                                                            | بله                                                                                                                                  |
| `check:openapi-coverage`       | مشخصات OpenAPI دستکم یک کف ratchetشده از مسیرهای واقعی را پوشش میدهد                                                                                                                                                                                                                                                                                                                                                                          | بله                                                                                                                                  |
| `check:openapi-security-tiers` | حاشیه‌نویسی‌های اعلام‌شدهٔ `x-loopback-only`/`x-always-protected` باید پشتوانه‌ای در `routeGuard.ts` داشته باشند؛ خطاهای تجزیه‌گر و ناسازگاری‌های بررسی رو به جلو مسدودکننده‌اند. بررسی معکوس برای نبود `x-loopback-only` در زیر پیشوندهای مخصوص دسترسی محلی هشدار می‌دهد و مسیرهایی که صرفاً با الگو تعریف شده‌اند از این بررسی معکوس کنار گذاشته می‌شوند.                                                                                   | بررسی‌های تجزیه‌گر و رو به جلو مسدودکننده‌اند؛ بررسی معکوس صرفاً هشدار می‌دهد                                                        |
| `check:openapi-routes`         | پس از اعمال فهرست استثنای موجه `KNOWN_STALE_SPEC`، هر مسیر `/api...` در `openapi.yaml` بدون حساسیت به پارامترها به یک مسیر واقعی منطبق می‌شود؛ ورودی‌های قدیمی فهرست استثنا نیز باعث شکست می‌شوند                                                                                                                                                                                                                                             | بله                                                                                                                                  |
| `check:docs-symbols`           | ارجاع‌های URL داخلی `/api/...` در مستندات مرجعِ غیرآینه‌ای با یک مسیر واقعی یا خانواده‌ای از مسیرها منطبق می‌شوند؛ ارجاع‌های پروکسی/بالادستی/جای‌نگهدار/فایل و ورودی‌های موجه `KNOWN_STALE_DOC_REFS` کنار گذاشته می‌شوند و ورودی‌های قدیمی فهرست استثنا باعث شکست می‌شوند                                                                                                                                                                     | بله                                                                                                                                  |
| `i18n translation drift`       | هش‌های مبدأ/مقصد اسناد اصلی و منشأ ترجمه را بررسی می‌کند. مقایسهٔ PR فقط خطاهای به‌ارث‌رسیدهٔ کاملاً یکسان را مجاز می‌داند؛ ناسازگاری‌های جدید یا تأییدنشدهٔ مبدأ، مقصدِ مفقود، هش مقصد، ترجمهٔ قدیمی یا حافظهٔ نهان بخش‌ها مسدودکننده‌اند. خارج از مقایسهٔ PR، خطاهای مبدأ/مقصدِ مفقود/هش مقصد مسدودکننده‌اند، اما ترجمه‌های قدیمی و حافظه‌های نهان ناسازگار بخش‌ها همچنان فقط هشدار هستند. نبودِ حافظهٔ نهان بخش‌ها با قالب قدیمی خطا نیست. | انحراف جدید/تأییدنشده در PR مسدودکننده است؛ انحراف به‌ارث‌رسیدهٔ کاملاً یکسان فقط هشدار است؛ قواعد خارج از PR به نوع خطا بستگی دارند |

### کار: `i18n-ui-coverage`

| اسکریپت                            | اعتبارسنجی                                                                                                                                                                                     | مسدودکننده     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (درونخطی) | پوشش کلیدهای i18n رابط کاربری ≥ ۶۵٪ است                                                                                                                                                        | بله            |
| `check-ui-value-drift` (درونخطی)   | بازنویسی یک **مقدار** انگلیسی هیچ ترجمهٔ منسوخی باقی نمیگذارد                                                                                                                                  | بله            |
| `check-new-key-coverage` (درونخطی) | یک کلید انگلیسی **جدید** در همهٔ زبانها ترجمه شده است — نشانگر `__MISSING__:` رد میشود                                                                                                         | بله            |
| `check-translation-ratio`          | نسبت ترجمهٔ واقعی بهازای هر زبان (موارد یکسان با انگلیسی / جاینگهدار / موارد مفقود خارج از فهرست مجاز) نباید از `config/quality/i18n-translation-baseline.json` بهعلاوهٔ حاشیهٔ مجاز فراتر رود | **مسدودکننده** |

به `fetch-depth: 0` نیاز دارد — دروازهٔ انحراف مقدار، `en.json` را با مبنای ادغام مقایسه میکند.

#### `check-ui-value-drift` — دروازهٔ ترجمههای منسوخ

آن دسته از پسرفتهای i18n را شناسایی میکند که سایر دروازهها از نظر ساختاری قادر به دیدنشان نیستند: یک مقدار انگلیسی
بازنویسی میشود و ترجمههای برگرفته از نسخهٔ _قبلی_ انگلیسی باقی میمانند؛ در نتیجه،
کاربران غیرفارسیزبان همچنان متنی با لحنی مطمئن اما اکنون نادرست میخوانند.

این مشکل واقعاً منتشر شد. `oauthModal.googleOAuthWarning` هنگام اضافهشدن ابزار کمکی ورود Antigravity
بازنویسی شد (#5203)؛ **۳۹ مورد از ۴۳ زبان** همچنان متنی داشتند که به اپراتورها میگفت «نشانی اینترنتی کامل را کپی کرده
و در پایین جایگذاری کنید» — فرایندی که برای آن ارائهدهنده قابل تکمیل نیست. این مشکل
تا #8463 شناسایی نشد، زیرا:

- `sync-ui-keys` فقط کلیدهایی را تکمیل میکند که **وجود ندارند**، نه کلیدهایی که **منسوخ** شدهاند؛
- `check-ui-keys-coverage` _وجود_ کلید را میشمارد، بنابراین یک ترجمهٔ منسوخ بهعنوان پوششدادهشده محاسبه میشود؛
- `check-translation-drift` نسخههای همگامشدهٔ مستندات در `docs/i18n/<locale>/**.md` را ردیابی میکند —
  این ابزار هرگز `src/i18n/messages/*.json` را نمیخواند. از زمان همگامسازی مجدد 2026-09 در کار `docs-sync-strict` مسدودکننده است:
  یک سند اصلی را ویرایش کنید ← `npm run i18n:run -- --files=<doc>` (در سطح بخش و کمهزینه).

**آگاه از تفاوتها، بدون اتکا به خط مبنا.** این دروازه `en.json` را در مبنای ادغام با
درخت کاری مقایسه میکند؛ برای هر کلیدی که مقدار انگلیسی آن تغییر کرده است، هر زبانی که همچنان
ترجمهای دستنخورده دارد منسوخ محسوب میشود. این کار عمداً **بدهی ازپیشموجود را ثابت نگه میدارد** — یک تفاوت
نمیتواند مشخص کند که یک ترجمهٔ قدیمی از کدام متن انگلیسی قدیمی گرفته شده است؛ بنابراین دروازه
فقط مواردی را ارزیابی میکند که تغییر فعلی به آنها دست زده است. گزینهٔ جایگزین (یک خط مبنای هش بهازای هر کلید)
به یک فایل تولیدشدهٔ تقریباً ۶۰۰ کیلوبایتی نیاز دارد که ۳ برابر بزرگترین خط مبنای موجود است و با هر PR مربوط به i18n تغییر میکند.

دو راه برای برآوردهکردن آن وجود دارد:

1. ترجمههای تحتتأثیر را بهروزرسانی کنید، یا
2. آنها را روی `__MISSING__:<new english>` تنظیم کنید — در این صورت زمان اجرا، متن انگلیسی اصلاحشده را ارائه میدهد
   (`src/i18n/request.ts::deepMergeFallback`، #7258) و کلید برای ترجمه در صف قرار میگیرد.

اگر **معنای** رشته تغییر کرده است، **تغییر نام کلید** را ترجیح دهید: یک کلید جدید نمیتواند
ترجمهای منسوخ را به ارث ببرد. این همان الگویی است که #8463 استفاده کرد.

```bash
npm run i18n:check-value-drift          # سختگیرانه (حالتی که CI اجرا میکند)
npm run i18n:check-value-drift:warn     # فقط گزارش
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

دروازههای انحراف مقدار و کلید جدید، یک مقایسهٔ تغییرناپذیر را از
`scripts/i18n/resolve-ui-diff-base.mjs` به اشتراک میگذارند. گردشکار، همان SHAهای مبنا، نوک مبنا و
کاندیدا را به هر دو بررسی ارسال میکند. اجراهای PR/هدفگذاری مجدد مبنا، push و merge-group از زمینهٔ رویداد
خود استفاده میکنند. اجرای دستی برای یک شاخهٔ کاندیدا، مستلزم PR باز دقیقاً متناظر با آن یا ورودی صریح
`i18n_base_sha` است. مشاهدهٔ دستی یا زمانبندیشدهٔ `main` یا `release/vX.Y.Z`
بدون آن ورودی، آخرین commit را با والد اول آن مقایسه میکند؛ این کار ممیزی
تمام بدهی ترجمهٔ بهارثرسیده نیست. فراخوانی محلی به یک مبنای مقایسهٔ صریح نیاز دارد؛
برای مثال، فرمان `BASE_REF` در بالا.

نبودن یا مبهمبودن زمینهٔ مقایسه، کاتالوگ الزامیِ ناخوانا یا نامعتبر، و
تغییر کاندیدا، حتی در حالت هشدار، به وضعیت `INCOMPLETE` با کد خروج **2** منجر میشوند.
خواندن کاتالوگها با استفاده از `scripts/i18n/read-ui-catalog.mjs` انجام میشود؛ خطاهای خواندن
با اشیای خالی جایگزین نمیشوند. نه در دسترس نبودن مبنا و نه ورودی ناقص، وضعیت PASS را اثبات نمیکند.

### کار: `i18n`

ماتریس کامل اعتبارسنجی i18n (یک کار بهازای هر زبان). کل کار مشورتی است.

| اسکریپت                         | اعتبارسنجی                    | مسدودکننده                                         |
| ------------------------------- | ----------------------------- | -------------------------------------------------- |
| `validate_translation.py quick` | کاملبودن ترجمه بهازای هر زبان | **مشورتی** (`continue-on-error: true` برای کل کار) |

### کار: `pr-test-policy`

فقط روی درخواستهای ادغام اجرا میشود.

| اسکریپت                | اعتبارسنجی                                                                                                                                                                           | مسدودکننده |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:pr-test-policy` | درخواستهای ادغامی که کد تولید را در `src/`، `open-sse/`، `electron/` یا `bin/` تغییر میدهند، باید شامل تستهای جدید یا بهروزشده باشند (قانون سختگیرانهٔ شمارهٔ ۸)                     | بله        |
| `check:test-masking`   | فایلهای تست تغییرکرده، تعداد خالص ادعاها را کاهش نمیدهند یا همانگوییهای `assert.ok(true)` اضافه نمیکنند                                                                              | بله        |
| `check:pr-evidence`    | بدنهٔ درخواست ادغام، شواهد تست/VPS مربوط به تغییر را ذکر میکند (قانون سختگیرانهٔ شمارهٔ ۱۸ را با جستوجو در متن درخواست ادغام مکانیزه میکند — شکننده است؛ فهرست کارهای آتی را ببینید) | بله        |

### کار: `test-vitest`

به کار `changes` برای طبقهبندی نیاز دارد. شکست در شاردهای قابلاعمال ماتریس، ادغام را مسدود میکند.

| مجموعه           | موارد اعتبارسنجیشده                                    | مسدودکننده                                                                                                            |
| ---------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | سرور MCP (۱۱۰ ابزار)، autoCombo، کش — اجراکننده vitest | بله                                                                                                                   |
| `test:vitest:ui` | آزمونهای مؤلفههای UI — اجراکننده vitest                | **مسدودکننده** — شکستهای ازپیشموجود بهطور صریح در `vitest.config.ts` مستثنا شدهاند؛ شکستهای جدید باعث شکست کار میشوند |

### گردشکارهای شبانه (زمانبندیشده، مشورتی)

این گردشکارها طبق برنامه cron (و `workflow_dispatch`) اجرا میشوند و هرگز روی PRها اجرا نمیشوند. همگی مشورتی هستند.

| گردشکار                | موارد اعتبارسنجیشده                                                                                                                                              | مسدودکننده |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | آزمونهای مبتنی بر ویژگی fast-check با یک seed تصادفی و تعداد اجرای بالا                                                                                          | **مشورتی** |
| `nightly-resilience`   | دروازه رشد heap، تزریق خطای آشوب، بارگذاری/اجرای طولانیمدت k6                                                                                                    | **مشورتی** |
| `nightly-llm-security` | محافظ تزریق promptfoo (حالت مسدودسازی) + کاوشهای garak (بدون secret ارائهدهنده نادیده گرفته میشوند)                                                              | **مشورتی** |
| `nightly-schemathesis` | فازینگ قرارداد OpenAPI (schemathesis) در برابر یک OmniRoute فعال با استفاده از `docs/openapi.yaml` — آشکارسازی نقضهای مشخصات / خطاهای 500 مدیریتنشده (فاز ۸ B.4) | **مشورتی** |
| `nightly-mutation`     | امتیاز آزمون جهش Stryker روی مسیر سریع آزمون واحد — mutantهای باقیمانده، assertهای ضعیف را آشکار میکنند                                                          | **مشورتی** |
| `nightly-compat`       | ماتریس سازگاری موتور Node در محدودههای پشتیبانیشده `engines.node`                                                                                                | **مشورتی** |

خطوط مبنای عملکرد (heap، TTFB، زمان build) ثبت میشوند، اما مشمول دروازه نیستند: به [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) مراجعه کنید.

---

## فاز سرعت (2026-08-30 → v4.0 LTS): تمام خطوط مبنا 20٪ آسانگیرانهتر شدند

تصمیم مالک (2026-08-30): تا زمان ماژولارسازی v4.0، سرعت انتشار از حفظ خط بدهی
مهمتر است. تمام خطوط مبنای **عددی** جغجغهای، طی یک مرحله قابل ممیزی 20٪ آسانگیرانهتر
شدند و این فاز در `config/quality/quality-baseline.json` اعلام شده است:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| چه چیزی تغییر کرد                                                                                                                                                                                                 | کجا                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — تعدادهایی که کمتر بودنشان بهتر است ×1.2، درصدهایی که بیشتر بودنشان بهتر است ÷1.2 (کف پوشش 60 حفظ شد، `eslintErrors` برابر 0 باقی میماند، `eslintWarnings` از 0 → 20٪ تعداد سرکوبهای منجمدشده) | `quality-baseline.json` (یادداشت `_relax_velocity_2026_08_30` تمام مقادیر قبل → بعد را فهرست میکند)    |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                  | `complexity-baseline.json`، `duplication-baseline.json`                                                |
| `cap`، `testCap`، سقف تعداد خطوط هر `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                            | `file-size-baseline.json`                                                                              |
| تعدادهای هر فایل / هر کد TS ×1.2                                                                                                                                                                                  | `api-typecheck-baseline.json`، `dashboard-typecheck-baseline.json`، `open-sse-typecheck-baseline.json` |
| `THRESHOLD` از 36 → 30                                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                             |
| هنگامی که `_policy.requireTighten === false` باشد، `--require-tighten` به حالت توصیهای درمیآید                                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| اجرای شبانه `bank-ratchet-shrinks` متوقف میشود (زیرا کاهش اندازهگیریشده را ثبت و فضای آزاد ایجادشده را خنثی میکند)                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

فهرستهای مجاز (`eslint-suppressions.json`، `test-masking-allowlist.json`، `test-discovery-baseline.json`،
…) **بودجه** نیستند و تغییری نکردهاند. گیتهای سیاستی قبولی/ردی (اسرار، قواعد SQL،
قرارداد مستندات/محیط، همترازی i18n، آزمونهای واحد) بدون تغییر باقی ماندهاند — آزمون قرمز همچنان قرمز است.

**ابزارها**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — آسانسازی
  یکباره (`scripts/quality/relax-baselines.mjs`)؛ از اجرای دوباره با یادداشت یکسان خودداری میکند.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  هر گیت عددی را به همان شیوه CI اندازهگیری میکند و فضای آزاد باقیمانده برای هر گیت را
  نمایش میدهد (`scripts/quality/baseline-headroom.mjs`). کار شبانه `baseline-headroom`
  جدول را در خلاصه اجرای گردشکار منتشر میکند و گزارش JSON/Markdown آن را با نام
  `baseline-headroom-<run_id>` بارگذاری میکند که بهمدت 90 روز نگهداری میشود. ردیفهای
  هشدار و بحرانی، گیتهایی را مشخص میکنند که در فاصله 10٪ از سقف خود قرار دارند یا از آن
  عبور کردهاند. این گزارشها را بهعنوان هشدار زودهنگام مصرفشدن بودجهها بررسی کنید؛
  یادداشتهای `_rebaseline_*` گیت متخلف را بازبینی کنید. این کار دیگر یک issue دائمی ایجاد
  یا بهروزرسانی نمیکند؛ #12149 تاریخچه گزارشهای قبلی را حفظ میکند.

**حالت کد جدید (Clean-as-You-Code) — از 2026-08-30، فقط مسیر سریع PR**

در رویدادهای `pull_request`، فایل `quality.yml` گزینه `--base-ref <PR base SHA>` را به
`check:file-size`، `check:complexity-ratchets` و `check:dead-code` ارسال میکند. برای
`check:complexity-ratchets` و `check:dead-code`، گیت HEAD را با merge-base مقایسه میکند،
اما این مقایسه **فقط به فایلهایی محدود است که PR تغییر داده است**
(`scripts/check/newCodeMode.mjs`: ‏merge-base در یک `git worktree` موقت ایجاد میشود،
ESLint/knip در آنجا و روی HEAD اجرا میشوند و تعدادهای هر فایل با هم تفاضلگیری میشوند):

- **مسدودکننده** — ‏PR در فایلهایی که تغییر داده، تخلفهای پیچیدگی دوری/شناختی یا exportهای مرده اضافه کرده است
  (`complexityNewCode=`، `cognitiveComplexityNewCode=`، `deadExportsNewCode=` در گزارش)؛
- **مشورتی** — مجموع سراسری در مقایسه با خط مبنای ثابتشده. انحراف بهارثرسیده هرگز یک
  PR بیتقصیر را قرمز نمیکند؛ این انحراف برای اصلاح در زمان تطبیق انتشار ردیابی میشود و
  job ظرفیت آزاد آن را زیر نظر دارد.

`check:file-size` از ارجاع پایه مطابق قواعد خودش استفاده میکند (`scripts/check/check-file-size.mjs`، #8522):
تمام فایلهای منبع و آزمون موجود در درخت را بررسی میکند، تعداد خطوط هرکدام را در پایه PR
با `git show` میخواند و تنها زمانی یک فایل را رد میکند که اندازه آن از مقدار بزرگتر میان
سقف خط مبنایش (`frozen` / `testFrozen`، یا `cap` / `testCap` برای فایلی خارج از خط مبنا)
و اندازه پایهاش فراتر رود. بنابراین، فایلی که از قبل در پایه دچار انحراف شده باشد هرگز یک
PR بیتقصیر را قرمز نمیکند.

`check:boundary:ratchet` همین قاعده را بر عدد واحد خود اعمال میکند
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): در رویدادهای PR، هم گیتهای سریع `quality.yml` و هم job مربوط به lint در `ci.yml`، SHA شاخهٔ پایهٔ PR را ارسال میکنند؛ commit پایه از یک خروجی `git archive` اندازهگیری میشود و PR فقط زمانی شکست میخورد که تعداد یالهای `open-sse → src` آن از مقدار بزرگتر بین `metrics.boundaryOpenSseToSrc` و تعداد موجود در پایه فراتر برود. انحراف پایه به بالاتر از سقف گزارش میشود (`base drift herdado`)، اما هرگز یک PR بیتقصیر را قرمز نمیکند؛ push → main همچنان سقف مطلق را حفظ میکند و اگر SHA پایه قابل حل نباشد، همراه با یک هشدار به آن سقف بازمیگردد.

اجراهای `workflow_dispatch`، پایش release-green و job شبانهٔ headroom هیچ پایهٔ PRای ندارند و مقایسهٔ مطلق (سراسری) را حفظ میکنند. پوشش، تکرار و پوشش نوع فعلاً سراسری باقی میمانند (ابزارهای آنها diff بهازای هر فایل را با هزینهٔ کم تولید نمیکنند) — اینها نامزدهایی برای همین رویکرد هستند.

**بستن این فاز در v4.0 (LTS = سختگیرانهتر از قبل، نه «بازگشت به حالت عادی»)**

1. روی tip خالص `release/v4.0.0`: برای ثبت، `npm run quality:headroom --json` را اجرا کنید، سپس
   `npm run quality:ratchet -- --update`، `check:file-size --update`،
   `check:complexity-ratchets --update`، `check:dead-code --update` و `--update` مربوط به هر گیت typecheck را اجرا کنید — هر baseline به مقدار اندازهگیریشده کاهش مییابد.
2. `_policy` را از `quality-baseline.json` حذف کنید (`--require-tighten` و ذخیرهسازی شبانه را دوباره فعال میکند) و `THRESHOLD = 36` (یا بالاتر) را در `check-openapi-coverage.mjs` بازگردانید.
3. در بخشهایی که ماژولارسازی نتیجه داده است، محدودیتها را از مقدار اندازهگیریشده نیز سختگیرانهتر کنید: `cap` اندازهٔ فایل را دوباره روی 1000 (یا 800) قرار دهید، کفهای پوشش را 5 واحد افزایش دهید و تعداد exportهای مرده را برای packageهای ماژولارسازیشده روی 0 بگذارید.

## خط مبنای Ratchet (`quality-baseline.json`)

موتور ratchet (`scripts/quality/check-quality-ratchet.mjs`) فایل `quality-baseline.json`
را میخواند و آن را با `quality-metrics.json` که بهتازگی جمعآوری شده مقایسه میکند. هر معیاری که بیش از
اپسیلون خود پسرفت کند، باعث شکست build میشود.

معیارهای فعلی تحت پایش:

| معیار                 | جهت    | معنا                                    |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | تعداد هشدارهای ESLint نباید افزایش یابد |
| `coverage.statements` | `up`   | پوشش دستورها نباید کاهش یابد            |
| `coverage.lines`      | `up`   | پوشش خطوط نباید کاهش یابد               |
| `coverage.functions`  | `up`   | پوشش توابع نباید کاهش یابد              |
| `coverage.branches`   | `up`   | پوشش شاخهها نباید کاهش یابد             |

برای بهروزرسانی خط مبنا پس از یک بهبود واقعی:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

پرچم `--update` مقادیر اندازهگیریشده فعلی را در `quality-baseline.json` مینویسد.
این فایل را همراه با تغییری که معیار را بهبود داده است commit کنید. PRای که یک
معیار را بدون بهروزرسانی خط مبنا بهبود دهد، توسط `--require-tighten` شناسایی خواهد شد (فاز 6A.5،
در انتظار پیادهسازی).

### ratchet مربوط به CodeQL: تناوب نوسازی و اجرای دستی

`check:codeql-ratchet` **وضعیت repo را میخواند که طبق یک زمانبندی نوسازی میشود — نه بهازای هر PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` مقادیر
`state: configured` و `schedule: weekly` را گزارش میکند: اسکن default-setup گیتهاب، نه تحلیلی بهازای هر push.
نتیجه: پس از merge شدن PRای که هشدارها را رفع میکند، ratchet تا زمان اجرای اسکن زمانبندیشده بعدی
همچنان تعداد قدیمی و بالاتر را میخواند — بنابراین تا زمانی که اسکن بهروز شود، در هر PR باز،
از جمله PRهای تکمیلی مربوط به همان PR اصلاحکننده، یک پسرفت گزارش میکند.

**نوسازی دستی**: دستور `gh workflow run codeql.yml --ref release/vX.Y.Z`
تحلیل را دوباره اجرا میکند و هشدارها را ظرف چند دقیقه مجدداً منتشر میکند. ابتدا `.github/workflows/codeql.yml`
را بخوانید — سرآیند آن توضیح میدهد که این workflow فقط برای `workflow_dispatch` است، **زیرا با
"default setup" گیتهاب تداخل دارد** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). بازگرداندن triggerهای `push`/`pull_request`/
`schedule` ابتدا به **اقدام مالک** نیاز دارد: Settings → Code security →
CodeQL: Default → Advanced. بدون انجام این تغییر، trigger مربوط به `schedule:` را اضافه نکنید — این کار
فقط اجراهای ناموفق ایجاد خواهد کرد.

**پس از کاهش تعداد، خط مبنا را سختگیرانهتر کنید** — دستور `node scripts/check/check-codeql-ratchet.mjs
--update` تعداد اندازهگیریشده جدید را در `quality-baseline.json` →
`metrics.codeqlAlerts.value` مینویسد تا ratchet بهطور بیسروصدا پسرفت به سقف قدیمی را مجاز نکند.
نمونه عملی (2026-09-02/03): PR #12502 تعداد 7 هشدار واقعی را رفع کرد
(تعداد هشدارهای باز اندازهگیریشده از 13 به 6 رسید)؛ PR #12530 خط مبنای ثابتشده را از 11 به 6 سختگیرانهتر کرد تا مطابقت داشته باشد؛
سپس 6 هشدار باقیمانده با ارائه توجیه جداگانه برای هر هشدار رد شدند و تعداد هشدارهای باز به 0 رسید.

**رد کردن هشدارها بر عهده اپراتور است (قانون سختگیرانه #14)** — هرگز یک هشدار CodeQL را
بدون ثبت توجیه فنی در نظر رد کردن آن، رد نکنید: `won't fix` برای
الزامی ناشی از پروتکل بالادستی، `used in tests` برای fixture آزمایشی، و `false positive`
برای sanitizerای که CodeQL قادر به تشخیص آن نیست (سابقه: `docs/security/ERROR_SANITIZATION.md`).

---

## سیاست تلاش مجدد آزمونها (WS5.4، v3.8.49)

تلاش مجدد برای هر اجراکننده بهصورت جداگانه تعریف میشود و هرگز یک سیاست سراسری نیست — تلاش مجدد سراسری، پسرفتهای واقعی را به آزمونهای ناپایدار نامرئی تبدیل میکند:

| اجراکننده        | سیاست                                                                                                                                               | دلیل                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | فقط در CI، مقدار `retries: 1` همراه با `trace: on-first-retry`                                                                                      | زمانبندی مرورگر/شبکه واقعاً غیرقطعی است؛ یک تلاش مجدد همراه با ردیابی، آزمون ناپایدار را به یک خروجی قابلتشخیص تبدیل میکند |
| Vitest           | بدون تلاش مجدد سراسری. آزمونی که ناپایداری آن اثبات شده است، تلاش مجدد صریح مختص همان آزمون دریافت میکند (در diff قابلمشاهده و در PR بازبینی میشود) | فهرست قرنطینه را در مخزن و بهصورت شفاف نگه میدارد                                                                          |
| node:test (unit) | هرگز تلاش مجدد انجام نمیشود                                                                                                                         | آزمون واحد ناپایدار، یک اشکال در خود آزمون است — آن را اصلاح کنید، نه اینکه دوباره بخت خود را امتحان کنید                  |

SLOهای هدف پس از راهاندازی تلهمتری آزمونهای ناپایدار (WS5.2/5.3): نرخ ناپایداری کمتر از 1% برای هر آزمون
(آستانه «همین حالا اصلاح شود»)، و نرخ موفقیت حداقل 95% برای هر خط لوله. اینها مقادیر مرجع صنعت هستند —
آنها را بر اساس اندازهگیریهای خودمان دوباره تنظیم کنید.

## انحراف جغجغهای در سطح انتشار (WS5.5، v3.8.49)

وقتی یک جغجغه (اندازه فایل، پیچیدگی، هشدارهای eslint) در رأس خالص انتشار پسرفت میکند
— یعنی **ترکیب** ادغامها باعث پسرفت شده است و هیچ PR منفردی بهتنهایی روی شاخه خودش
آن را بازتولید نمیکند — مسئولیت اصلاح، **برای یک بار و روی شاخه انتشار، بر عهده راهبر انتشار است**:
استخراج/بازآرایی را ترجیح دهید؛ فقط همراه با ثبت توجیه مستند، خط مبنا را دوباره تنظیم کنید.
هرگز انحراف ناشی از ترکیب را به PR یک مشارکتکننده تحمیل نکنید و هرگز برای هر PR بهصورت جداگانه
خط مبنا را دوباره تنظیم نکنید (این کار پسرفتهای واقعی را پنهان میکند). ابتدا علت را تفکیک کنید:
پیش از آنکه فرض کنید PR شما عامل آن بوده است، وضعیت قرمز را در یک worktree آزمایشی و روی رأس خالص بازتولید کنید.

## ذخیرهسازی کاهشهای جغجغه — جهت نزولی (#8584)

جغجغه فقط نیمهخودکار است، و آن هم نیمه اشتباه. **افزایش** یک سقف، ویرایش دستی JSON است
که ده ثانیه زمان میبرد و سریعترین راه برای رفع انسداد یک PR قرمز است.
**کاهش** سقف مستلزم آن است که شخصی `--update` را اجرا و نتیجه را commit کند — و تا پیش از
راهاندازی job مربوط به `bank-ratchet-shrinks`، هیچ workflowای آن را اجرا نمیکرد. پیامد اندازهگیریشده
(2026-07-25): تعداد 18 فایل منجمد از قبل روی سقف 800 خطی فایل جدید یا پایینتر از آن بودند؛ بدترین مورد
132 برابر بود (`src/shared/validation/schemas.ts`، فایلی 19 خطی با سقف 2,523)؛ سقف پیچیدگی طی حدود
37 یادداشت بازتنظیم خط مبنا از `1794 → 2169` افزایش یافت و دقیقاً یک کاهش (−1) داشت؛ و عبارت
«در چرخه بعدی از طریق `--update` محدودتر شود» 31 بار نوشته شد و فقط یک بار رعایت شد. سقفی که
پس از حذف کدی که آن را توجیه میکرد همچنان باقی بماند، بیسروصدا هر تجزیه تکمیلشده را به مجوزی
برای رشد در اختیار فرد بعدی که فایل را ویرایش میکند تبدیل میکند.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** این چرخه را کامل میکند:

|            |                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------- |
| اجرا در    | `schedule` (3 بار در روز) + `workflow_dispatch` — عمداً **نه** در `push`                        |
| اندازهگیری | بالاترین `release/vX.Y.Z`، با همان guard مربوط به resolution + injection در `release-green`     |
| نوشتن      | `check:file-size --update` و `check:complexity-ratchets --update` (هر دو ذاتاً فقط کاهشی هستند) |
| اعتبارسنجی | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                        |
| تحویل      | یک PR همیشه بهروز علیه شاخه انتشار — با بهروزرسانی اجباری و بدون هرزنگاری                       |

ذخیرهسازی بهجای انجام در هر push، بهصورت دستهای انجام میشود، زیرا هیچ الزام تأخیری ندارد
(ذخیرهشدن یک کاهش ظرف 8 ساعت قابلقبول است)، در حالی که اجرای آن برای هر ادغام، طی کارزارهای
ادغام بارها شاخه PR را بازسازی میکند و هر بار هزینه پیمایش کامل ESLint را تحمیل میکند.
تشخیص همچنان هنگام push (`release-green`) انجام میشود؛ فقط ذخیرهسازی بهصورت دستهای است.

### اعتبارسنج ایمنی

این job بدون نظارت انسانی در خطوط مبنا مینویسد، بنابراین `verify-ratchet-bank.mjs` همان چیزی است
که این کار را قابلقبول میکند. این ابزار درخت پس از `--update` را با `HEAD` مقایسه میکند و
**پیش از ایجاد هرگونه commit، job را متوقف میکند** — بدون بازکردن هیچ PR — مگر آنکه هر تغییر
یکی از موارد زیر باشد:

- یک ورودی عددی `frozen` / `testFrozen` که **کاهش یافته** یا **حذف شده** باشد
- `complexity-baseline.json` → مقدار `count` **کاهش یافته** باشد
- `quality-baseline.json` → مقدار `metrics.cognitiveComplexity.value` **کاهش یافته** باشد

هر چیز دیگری ناموفق تلقی میشود: افزایش یک عدد، افزودن یک ورودی، تغییر `cap`/`testCap`، یا
حذف/بازنویسی یادداشت `_rebaseline_*` (این یادداشتها سابقه ممیزی دلیل وجود هر سقف هستند و در
همان شیء `frozen` حاوی ورودیهای فایل ذخیره میشوند). باتی که بتواند سقفی را افزایش دهد، قطعاً
از وضعیت موجود بدتر خواهد بود. guard پسرفت: `tests/unit/verify-ratchet-bank.test.ts`.

این job هرگز چیزی را به `release/*` push نمیکند — یک انسان PR را ادغام میکند، بنابراین یک
اندازهگیری نادرست نمیتواند بدون بازبینی وارد شود.

## سیاست فهرست مجاز

هر گیتی که نباید بهدلیل تخلفهای ازپیشموجود شکست بخورد، از یک فهرست مجاز ثابت استفاده میکند
(برای مثال، `KNOWN_STALE_DOC_REFS`، `KNOWN_MISSING`، `KNOWN_RAW_SQL`). سیاست به این صورت است:

**علت ریشهای را برطرف کنید؛ تنها زمانی از فهرست مجاز استفاده کنید که تخلف از قبل وجود داشته باشد و
در همان PR قابل رفع نباشد.**

هنگام افزودن یک ورودی به فهرست مجاز:

1. یک توضیح حاوی توجیه آن اضافه کنید.
2. به مسئلهٔ پیگیری مربوطه ارجاع دهید (برای مثال، `// #3498 — Phase 2 feature, not yet implemented`).
3. ورودی را در همان PRای که تخلف را برطرف میکند حذف کنید — ورودی منقضیشدهای که دیگر
   تخلف فعالی را نادیده نمیگیرد، خود یک نقص است (پس از پیادهسازی بررسی اعمال قواعد منقضیشده در 6A.3،
   وجود یک ورودی بدون مرجع در فهرست مجاز باعث شکست گیت خواهد شد).

برای سریعتر موفقشدن تستها، ورودی جدیدی به فهرست مجاز اضافه **نکنید**. یک گیت سبز همراه با فهرست
مجازی که مدام در حال رشد است، حس کاذبی از کیفیت ایجاد میکند.

### وقتی یک گیت روی PR شما شکست میخورد

1. **خروجی گیت را با دقت بخوانید** — دقیقاً مشخص میکند کدام فایل یا نماد قانون را نقض کرده است.
2. **تخلف را برطرف کنید** — بیشتر گیتها بررسیهای قطعی سیستم فایل هستند که بهمحض درستشدن
   کد با موفقیت اجرا میشوند.
3. **اگر تخلف از قبل وجود داشته است** (یعنی شما آن را ایجاد نکردهاید، اما اکنون گیت
   آن را پوشش میدهد): یک ورودی به فهرست مجاز اضافه کنید که شامل توضیح توجیهی و ارجاع به مسئلهٔ پیگیری باشد.
4. **اگر گیت از نوع ضامندار است** (پوشش تست، هشدارهای ESLint، تکرار یا پیچیدگی):
   تغییر شما معیار را بدتر کرده است. مشکل زیربنایی را برطرف کنید یا، در موارد نادر، اگر تغییر
   عمدی است و افت معیار قابل قبول است، `npm run quality:ratchet -- --update` را اجرا کنید —
   اما دلیل آن را در توضیحات PR مستند کنید.
5. **گیتهای مشورتی** (`continue-on-error: true`) صرفاً اطلاعرسانی هستند — ادغام را مسدود
   نمیکنند، اما در خلاصهٔ CI نمایش داده میشوند. بااینحال، آنها را نیز برطرف کنید.

---

## افزودن یک دروازهٔ جدید

1. `scripts/check/check-<name>.mjs` (یا `.ts`) را ایجاد کنید. دروازههای خطمشی با 0/1 خارج میشوند.
   دروازههای ضامندار از طریق `collect-metrics.mjs` یک معیار را در `quality-metrics.json` منتشر میکنند.
2. `"check:<name>": "node scripts/check/check-<name>.mjs"` را به `package.json` اضافه کنید و
   نام مستعار و فرمان دقیق آن را در `config/quality/gate-manifest.json` همگامسازی کنید.
   هنگام تغییر یا حذف یک نام مستعار اعتبارسنجی موجود نیز همین همگامسازی را انجام دهید.
   `npm run check:gate-manifest` را اجرا کنید؛ هوک pre-commit و طبقهبندی تغییرات CI
   این قرارداد را اعمال میکنند.
3. آن را در `.github/workflows/ci.yml` و زیر کار مناسب متصل کنید
   (خطمشی → `lint` یا `docs-sync-strict`؛ ضامندار → `quality-gate`).
4. اگر دارای فهرست مجاز است، `reportStaleEntries()` را از
   `scripts/check/lib/allowlist.mjs` اعمال کنید تا ورودیهای منسوخ بهطور خودکار شناسایی شوند.
5. آزمونی در `tests/unit/build/` بنویسید که منطق تشخیص دروازه را پوشش دهد.
6. این سند را بهروزرسانی کنید (یک ردیف به جدول کار مرتبط اضافه کنید).

---

## ابزارهای عامل: LSP-in-the-loop (اختیاری)

فراتر از دروازههای CI، OmniRoute یک چارچوب `agent-lsp` **اختیاری** ارائه میکند
(یک `.mcp.json` در سطح پروژه، فاز ۷ وظیفهٔ ۱۵). `.mcp.json` را ایجاد کنید
تا یک سرور زبان TypeScript را در اختیار عاملهای کدنویسی قرار دهد و آنها نمادها /
عیبیابیها را **پیش از** نوشتن کد بررسی کنند — مکملی برای کامپایل پیش از ادعا در کنار
`typecheck:core` که خطاهای «نماد ساختگی» را از مبدأ کاهش میدهد. این چارچوب عمداً
بهصورت خودکار بارگذاری نمیشود (شما پل MCP↔LSP را انتخاب و تأیید میکنید)؛ یک ورودی خراب فقط
یک خطای اتصال را ثبت میکند و هرگز نشستها را مختل نمیکند.

---

## فهرست معوقه منطقیسازی (بازبینی ROI — فاز 9 موج 3)

این فهرست در 2026-06-17 با `ci.yml` تطبیق داده شد (نسخه قبلی
`audit:deps`، `check:tracked-artifacts`، `check:lockfile`، `check:licenses`،
`check:dead-code`، `check:cognitive-complexity`، `check:type-coverage`،
`check:codeql-ratchet` و `check:pr-evidence` را از قلم انداخته بود). بازبینی ROI مجموعه تطبیقیافته،
گزینههای زیر را برای منطقیسازی شناسایی کرد. **ادغامها تغییرات مکانیکی CI
هستند؛ تغییر وضعیتها/حذفها تصمیمهای سیاستی هستند که به اپراتور واگذار شدهاند.** هنوز هیچیک از موارد
زیر اعمال نشده است.

**همچنین در بالا مستند نشدهاند** (راهنمایی، با سیگنال ضعیف): job مربوط به `docs-lint`
(markdownlint + Vale، با `continue-on-error` برای کل job) و workflowهای مستقل اسکنر
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. مقدار `semgrepFindings: 0` در
`quality-baseline.json` وجود دارد، اما به یک ratchet مسدودکننده در `ci.yml` متصل نیست — این معیار
در حال حاضر یتیم است.

### ادغام / حذف موارد تکراری (مکانیکی، با ریسک کمتر)

هر گزینه در 2026-06-17 در برابر وضعیت فعال gate اعتبارسنجی شد (اعتماد کن، اما راستیآزمایی کن)؛
مشخص شد چندین ادغام «بدیهی» بدهی پنهانی دارند و جایگزینهای آماده و بیدردسری **نیستند**.

- **`check:docs-sync` دو بار اجرا میشود** — یک بار بهصورت مستقل در job مربوط به `lint` و بار دیگر درون `check:docs-all` (`docs-sync-strict`) و hook مربوط به husky pre-commit. ✅ **انجام شد** — فراخوانی مستقل `lint` حذف شد.
- **اسکن CVE** — ❌ **ادغام تمیزی نیست.** `audit:deps` هشدارهای بحرانی و auditهای ناقص را در هر پنج lockfile مسدود میکند، در حالی که طبق سیاست فعلی، هشدارهای سطح بالا را بهصورت warning گزارش میدهد؛ `check:vuln-ratchet` (osv) فقط در صورت وجود یک _پسرفت_ نسبت به baseline ثبتشده در مخزن شکست میخورد و در صورت الزامی بودن اندازهگیریها، نبود آنها را رد میکند. معناشناسی این دو متفاوت است — حذف `audit:deps` باعث از دست رفتن gate مطلق سطح بحرانی و رسیدهای مستقل audit پکیجها میشود. هر دو حفظ شوند.
- **تشخیص چرخه** — ✅ **انجام شد** (#15159 G-01/G-02). متن قدیمی این بخش، `check:cycles` را gate «سبز و گزینششده» مینامید و مسدودکننده ماندن آن را با این استدلال توجیه میکرد که `check:circular-deps` (dpdm) تعداد 91 چرخه گزارش کرده است. آن وضعیت سبز، یک **سبز کاذب** بود: `check:cycles` تعداد 5 زیرشاخه (450 فایل) را اسکن میکرد، فقط `import|export … from` ایستا را مطابقت میداد و تمام specifierهای `@/` و `@omniroute/open-sse/` را کنار میگذاشت؛ بنابراین نمیتوانست چرخههای dynamic-import + alias را که در مخزن غالب بودند ببیند. اصلاح شد: اکنون gate در `src` + `open-sse` پیمایش میکند (5023 فایل)، specifierها را از TypeScript AST جمعآوری میکند (بنابراین `import("…")` محاسبه میشود و `typeof import("…")` در موقعیت type محاسبه نمیشود) و `paths` مربوط به tsconfig را resolve میکند. این gate **14** چرخه پیدا میکند، نه 0. از آنجا که 14 چرخه ازپیشموجود را نمیتوان در یک PR مربوط به gate برطرف کرد، اکنون `check:cycles` یک **ratchet** است (`--ratchet`، سقف `metrics.cycles.value = 14` در `quality-baseline.json`، با `direction: down`) — هرگونه _پسرفت_ را مسدود میکند و تعداد فقط میتواند کاهش یابد. CI دستور `npm run check:cycles:ratchet` را اجرا میکند. کاهش تدریجی همراه با **A-01** پیش میرود. `check:circular-deps` (dpdm) بهعنوان دیدگاه دوم و گستردهتر، در حالت راهنمایی باقی میماند.
- **پیچیدگی** — ✅ **انجام شد** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): یک پیمایش ESLint، با شمارش بر اساس ruleId تا baselineهای cyclomatic+max-lines و cognitive مستقل بمانند؛ `check:complexity` / `check:cognitive-complexity` مجزا برای اجرای محلی با `--update` باقی میمانند.
- **ضدتوهم `/api`** — ✅ **انجام شد** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): یک inventory از FS برای `src/app/api`؛ openapi-routes + docs-symbols همچنان بهطور مستقل گزارش میدهند؛ موارد مجزا برای اجرای محلی باقی میمانند.
- **`check:node-runtime` در 11 job اجرا میشود** — ⚠️ **ROI پایین.** هرکدام runner جداگانهای دارند و بررسی کمتر از 1 ثانیه طول میکشد؛ صرفهجویی کل حدود 10 ثانیه است، در برابر از دست دادن یک محافظ ارزان بهازای هر job. ارزش این آشفتگی را ندارد.
- **`typecheck:noimplicit:core` در lint مربوط به CI** — ✅ **از job مربوط به lint حذف شد** (قبلاً با `continue-on-error` در حالت راهنمایی بود)؛ سطح type مسدودکننده عبارت است از `typecheck:core` + `check:type-coverage`. اسکریپت محلی حفظ شد.

### تغییر وضعیت / تصمیمگیری (سیاست اپراتور)

- `check:openapi-security-tiers` (راهنمایی) — ❌ **نمیتوان آن را بهسادگی تغییر وضعیت داد.** با کد 0 خارج میشود، اما هشدار میدهد که چندین route مربوط به `traffic-inspector` زیر `LOCAL_ONLY_API_PREFIXES` فاقد annotation مربوط به `x-loopback-only: true` هستند. اعمال اجباری آن ابتدا مستلزم افزودن این annotationها به `openapi.yaml` است.
- `typecheck:noimplicit:core` (راهنمایی) — تا حد زیادی توسط ratchet مسدودکننده `check:type-coverage` پوشش داده میشود. آن را به ratchet تبدیل کنید یا دومین pass اضافی `tsc` را حذف کنید.
- `test:vitest:ui` (اکنون **مسدودکننده**) — failureهای ازپیشموجود در `vitest.config.ts` با commentهای ردیابی `// #8618` صراحتاً مستثنا شدهاند؛ failureهای جدید باعث شکست job میشوند.
- `check:secrets` (gitleaks، ratchet مسدودکننده) — سقف فعلی `metrics.secretFindings` در `quality-baseline.json` است. هرگونه استثنا به یک entry موجه در `.gitleaks.toml` نیاز دارد؛ اندازهگیری دردسترسنبودنی برابر با INCOMPLETE است. این اسکن مکمل secret scanning بومی GitHub و `check:public-creds` است.
- `check:pr-evidence` (مسدودکننده، متن نثر PR body را با grep بررسی میکند) — ریسک false-positive بالایی دارد؛ حذف آن اجرای Hard Rule #18 را تضعیف میکند، بنابراین این یک تصمیم سیاستی واقعی است.
- `semgrep` (مستقل و راهنمایی) — برای خانوادههای OWASP با CodeQL همپوشانی دارد؛ baseline آن را به یک ratchet متصل کنید یا حذفش کنید.

---

## مستندات مرتبط

- زنجیرهٔ تأمین (منشأ، SBOM، Trivy، Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — گیت برابری مجموعهٔ کلیدها

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`، کار `i18n-ui-coverage`).
مجموعهٔ کلیدهای برگِ هر فایل `src/i18n/messages/<locale>.json` را با `en.json` مقایسه میکند و
در صورت وجود هر برگِ مفقود یا اضافی، صرفنظر از زمان افزودهشدن کلید، شکست میخورد. جاینگهدارهای
`__MISSING__:` موجود محسوب میشوند (محتوای آنها در حوزهٔ مسئولیت گیت نسبت است). این گیت مکمل مطلق
دو گیت مبتنی بر تفاوت/درصد است: `check-ui-keys-coverage` حداقل پوشش 80 % را برای هر
زبان اعمال میکند (43 کلید مفقود از حدود ~13,000 همچنان 99.7 % نشان داده میشود) و `check-new-key-coverage`
فقط کلیدهایی را ارزیابی میکند که یک PR به `en.json` میافزاید. یک دستهٔ زبانی از نسخهٔ روزِ
`en.json` که شاخهاش از آن جدا شده تولید میشود و در حالی که پایه همچنان کلیدهای جدید میافزاید، ترجمهٔ آن
چند روز ادامه پیدا میکند؛ خود PR دسته هیچ کلیدی اضافه نمیکند، بنابراین هنگام ادغام دستهٔ 1 (#13044) با کمبود
43 کلید در نه زبان و دستهٔ 2 (#13660) با کمبود 10 کلید در هشت زبان (2026-09-15)، هر دو گیت همرده
ساکت ماندند. خطای قرمز را با
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` برطرف کنید؛ یک برگِ `extra`
یعنی منبع آن را حذف کرده است — آن را از زبان مربوطه حذف کنید. `--warn` بدون شکستدادن گزارش میدهد.
`--catalog=cli` همین مقایسه را روی `bin/cli/locales` اجرا میکند (`npm run i18n:check-keys:cli`)؛
هر دو مرحله در کار `i18n-ui-coverage` قرار دارند.

#### `check-new-key-coverage` — گیت i18n برای کلیدهای جدید

گیت همردهٔ `check-ui-value-drift` است. آن گیت زمانی را تشخیص میدهد که یک مقدار انگلیسی **بازنویسی**
شده اما ترجمههایش بهروزرسانی نشدهاند؛ این گیت زمانی را تشخیص میدهد که یک کلید انگلیسی **افزوده**
شده اما برخی زبانها هرگز آن را دریافت نکردهاند.

`check-ui-keys-coverage` نمیتواند این نوع مشکل را ببیند: این گیت حداقل درصدی را برای هر زبان اعمال میکند و
نبود یازده کلید از حدود ~13,000 کلید برگ، پوشش را روی 99.9% نگه میدارد. درصد بهازای هر زبان نمیتواند
بیان کند که «این قابلیت بدون ترجمه منتشر شده است» — ممکن است یک قابلیت کامل بدون هیچ متنی وارد یک زبان جدید
شود، بیآنکه عدد هرگز تغییر کند.

رخدادی که این گیت ثبت میکند: فاز 3 از Orchestration Canvas یازده کلید خود را در 42 زبانی که آن زمان
وجود داشتند ترجمه کرد. چند ساعت بعد، دستهٔ زبانهای اتحادیهٔ اروپا (#13044) تعداد زبانهای مخزن را
به 51 رساند و نه زبان تازهوارد (`el`، `et`، `ga`، `hr`، `lt`، `lv`، `mt`، `sl`، `sr`) هرگز
آن کلیدها را دریافت نکردند. `deepMergeFallback` برای کلید مفقود از انگلیسی استفاده میکند، بنابراین
حالت خرابی بهجای رابط کاربری خالی، رابط کاربری ترجمهنشده بود — مشکلی واقعی که ذاتاً بیصدا بود.

این گیت نیز مانند همردهٔ خود **از تفاوتها آگاه است** و نسخهٔ انگلیسی در پایهٔ ادغام را با درخت کاری
مقایسه میکند؛ بنابراین شکافهای از پیش موجود ثابت میمانند و فعالکردن گیت به مهاجرت نیازی نداشت.

**نشانگر `__MISSING__:<english>` آن را برآورده نمیکند (از 2026-09-17).** این نشانگر قبلاً روش مستندشدهٔ
تعویق بود — محیط اجرا به انگلیسی صحیح بازمیگردد — تا اینکه هشت PR مربوط به قابلیتها در
2026-09-16 تعداد 61 کلید افزودند و بهجای ترجمه، نشانگر را در تمام 65 زبان درج کردند: این گیت همهٔ آنها
را پذیرفت، هیچچیز PRها را مسدود نکرد و سپس گیت مسدودکنندهٔ نسبت ترجمهٔ واقعی در نوک انتشار برای همه
شکست خورد (pt-BR 3.2 % > 2.5 % + 0.5). اکنون نشانگر بهعنوان ترجمهٔ مفقود ارزیابی میشود.
خطای قرمز را با
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` برطرف کنید، یا
همهٔ زبانها را بهصورت موازی با `npm run i18n:translate-new-keys` اجرا کنید (`scripts/i18n/translate-new-keys.sh`،
ایمن برای حالت detached و بدون متغیرهای محیطی `OMNIROUTE_TRANSLATION_*` از شروع خودداری میکند).
کلیدی که باید انگلیسی بماند (نام ثابتشدهٔ محصول/موتور/پرچم) باید در `scripts/i18n/untranslatable-keys.json`
قرار گیرد، نه پشت یک نشانگر. `vi` نشانگرها را بهطور کامل ممنوع میکند
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — گیت تستهای کنارگذاشتهشده

فایلی که در فهرست `exclude` متعلق به `vitest.config.ts` قرار دارد، تستی است که اجرا نمیشود و برای هرکس
که درخت را میخواند، ظاهری شبیه پوشش تست دارد. شصتودو فایل پشت توضیح
`// #8618 — pre-existing failure; remove this exclusion when fixed` انباشته شدند. مسئلهٔ #8618 در
2026-08-11 بسته شد، در حالی که فهرست تحت پیگیری آن از 45 ورودی به 62 ورودی افزایش یافت و هر ورودی جدید
توضیحی را به ارث برد که به مسئلهای بستهشده اشاره میکرد. وقتی سرانجام فهرست فایلبهفایل اندازهگیری شد
(#13204)، **51 مورد از 62 فایل بدون هیچ تغییری در کد منبع، در برابر درخت فعلی موفق شدند**.

این گیت الزام میکند هر مورد مستثناشدهای که به فایلی واقعی منتهی میشود، (الف) یک مسئلهٔ رهگیری را نام ببرد و
(ب) با وضعیت اندازهگیریشدهٔ خود در `config/quality/vitest-exclusions.json` ظاهر شود؛ در نتیجه افزودن یک مورد
بهجای آنکه صرفاً خط دیگری در آرایهای 60ورودی باشد، به تفاوتی قابلبازبینی در فایلی اختصاصی تبدیل میشود.
این گیت عمداً تستهای مستثناشده را دوباره اجرا نمیکند — این کار حدود ~10 دقیقه زمان میبرد و متعلق به یک کار
دورهای است؛ فهرست موجودی ثبت میکند که هر مورد آخرین بار چه زمانی اندازهگیری شده است.
