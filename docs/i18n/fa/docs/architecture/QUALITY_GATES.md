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

## موجودی دروازه و پروفایل های اجرایی

### پذیرش نامزد

گردشهای کاری CI و Quality Gates هر کدام یک حکم پایدار صادر میکنند: `Gate / CI` و `Gate / Quality`. خط مشی پذیرش نسخه شده آنها هر شغل بالادستی را به عنوان مورد نیاز یا مشاوره برمی شمارد. یک کار مورد نیاز قابل اجرا باید موفق شود: نتایج گمشده، لغو شده، نادیده گرفته شده، در انتظار و ناشناخته نمی تواند PASS ایجاد کند. یک طبقهبندی معتبر فقط برای اسناد یا کاتالوگ میتواند خط کد را غیرقابل اجرا کند. یک پیش نویس PR نامزد پذیرفته نشده است. برچسب `hotfix` از شواهد چشم پوشی نمی کند.

هر دو گردش کار PRs به شاخههای main/release ، فشار به `main`، ارسال دستی و رویدادهای ادغام گروه پوشش میدهند. فشار، اعزام و ادغام گروهی انتخاب کامل را اجرا کنید. فشار به `release/**` آنها را شروع نمی کند (18-10-2026): هر تغییر قبلاً ماتریس را روی PR خود اجرا می کرد و ترکیب ادغام شده وظیفه Release-Green است (`docs/ops/RUNNER_BOX.md` → Hosted lane). گروههای فورک و ادغام از دوندههای میزبانیشده برای کارهایی استفاده میکنند که در غیر این صورت دوندههای خود میزبان را انتخاب میکنند. ظرفیت میزبانی کافی باید قبل از عرضه تأیید شود.

یک PR معمولی انتخاب سریع را اجرا می کند. خطوط `full-code` و `full-code-e2e` خطمشی پذیرش (E2E، ادغام، مصنوع بسته، Electron smoke، Bun SQLite، اکوسیستم و مشتریان پروتکل) فقط روی پیشنویس صف Mergify یا در اجرای کامل: `gh workflow run ci.yml --ref <branch>` اجرا میشوند.

هر رسید JSON SHA چکشده، اجرای گردش کار و تلاش را مشخص میکند. CLI عدم تطابق checkout/event SHA را رد می کند. آزمایشهای گردش کار، عضویت خطمشی را به فهرست `needs` کار حکم متصل میکند، بنابراین یک خط جدید یا حذف شده نمیتواند بیصدا ناپدید شود. رسیدها گردش کار خود را پوشش می دهند، نه انتشار، استقرار، یا داخلی یک اسکنر مشاوره موجود. فعال کردن هر دو نام چک در قوانین شعبه یک تغییر اداری جداگانه است. افزودن این مشاغل به خودی خود از یک شاخه محافظت نمی کند.

### صف ادغام

برچسب `queue` یک PR را به صف Mergify ارسال می کند (`.mergify.yml`). Mergify یک پیش نویس PR را در یک شاخه `mergify/merge-queue/` باز می کند، CI انتخاب کامل را در آنجا اجرا می کند، و PR اصلی با عبور `Gate / CI`، `Gate / Quality` و `Merge integrity (changelog + generated skills)` ادغام می شود.

Mergify خلاصه صف خود را در توضیحات پیش نویس می نویسد و سایر برنامه ها نیز می توانند آن را ویرایش کنند. یک رویداد `pull_request` `edited` در چنین پیش نویسی گروه همزمانی خود را می گیرد (`-queue-edit-<run_id>`) بنابراین نمی تواند اجرای واقعی پیش نویس را لغو کند و از گیت و ماتریس می گذرد. فقط `Merge integrity` هنوز اجرا می شود. کار دروازه رد شده دارای یک نام چک متفاوت است، زیرا Mergify یک `Gate / CI` نادیده گرفته شده را به عنوان یک چک ناموفق می خواند و PR را حذف می کند.

پس از dequeue، فشار همیشه PR را درخواست نمی کند. نظر `@mergifyio queue` را در مورد آن.

### شواهد حفظ شده در کاهنده پذیرش

`scripts/quality/validate-release-acceptance.mjs` یک طرح عرضه شده و جلوه های آن را کاهش می دهد. مشخص نمی کند که این طرح خط لوله آزادسازی کامل را پوشش می دهد. گزارش های آن به صراحت `releaseAcceptance: false` را تنظیم می کند، حتی زمانی که آن طرح `VERIFIED` باشد. جریان کاری `release-acceptance.yml` همچنان از وسایل سایه استفاده میکند، نه رسیدهای ساخت، بسته، بوت یا تبلیغات واقعی.

CLI به `--evidence-root` برای تأیید شواهد حفظ شده نیاز دارد. فایل ها به صورت `<evidence-root>/<artifact_id>/<member>` حل می شوند و به صورت SHA-256 هش می شوند. یک رکورد PASS بدون مدرک، یک فایل گم شده یا تغییر یافته، یک مسیر ناامن یا یک پیوند نمادین مانع از تأیید می شود. فایل های از دست رفته معادل لاگ های خالی خالی نیستند. چکهای SHA/run/attempt موجود مستقل باقی میمانند: بایتهای تطبیق نمیتوانند یک رسید قدیمی را نجات دهند. یکپارچگی فایل دلیلی بر اصالت اجرا یا ارتقای مصنوع نیست.

### موجودی اسکن استاتیک

موجودی npm-نام مستعار نسخه شده و عضویت در اسکن استاتیکی در `config/quality/gate-manifest.json` زنده است. `npm run check:gate-manifest` برای اعتبارسنجی نام اسکریپت ها و دستورات دقیق در برابر `package.json` اجرا کنید. اضافهها، حذفها و جابجایی فرمانها هم در قلاب محلی و هم کارهای تغییر طبقهبندی در CI با شکست مواجه میشوند. نام مستعار یک کار گردش کار، نمونه ماتریسی یا مورد آزمایشی نیست: این تعداد نباید به عنوان قابل تعویض ارائه شود.

`npm run quality:scan -- --list` یا `npm run quality:scan:fast -- --list` برای بازرسی نام مستعار انتخاب شده بدون اجرای آنها استفاده کنید. رانر نقطه ورودی npm را فراخوانی می کند، بنابراین زمان اجرا آن (از جمله Bun در جایی که پیکربندی شده است) حفظ می شود. مانیفست نامهای مستعار خارج از آن نمایهها را بهصورت مجزا فراخوانی میکند و دستورات نگهداری در پروفایلهای اسکن فقط خواندنی ممنوع است.

این پروفایل ها فقط اسکن استاتیک را پوشش می دهند. آنها آزمایشهای محصول، پوشش، بستهبندی، بررسیهای خارجی یا پذیرش کامل نامزد را تأیید نمیکنند. پذیرش گردش کار از `config/quality/admission-policy.json` و `scripts/quality/admission-verdict.mjs` مرتبط استفاده می کند. نمایههای ناظر انتشار جداگانه باقی میمانند. چک ها و رسیدهای مربوطه خود را به طور مستقل بررسی کنید. دستورات استاتیک ناظر کامل در `config/quality/release-green-static-profile.json` اعلان شده است، از جمله `audit:deps`، انتخاب آزمون جهش و بررسی ترجمه. لودر دستورات npm را در برابر اعلانهای package.json و مدلسازی شده CI/Quality تأیید میکند. به جای اجرای توکن های پوسته به عنوان آرگومان، دریفت را رد می کند. خروجی SKIP/INCOMPLETE اسکنر مورد نیاز نمی تواند PASS ایجاد کند. نمایه استثناهای خارجی خود را ثبت می کند و جایگزین پوشش میزبانی شده، ماتریس های آزمایشی، بسته یا شواهد استقرار نمی شود. فهرست نثر زیر یک مرجع است، نه دلیلی بر اینکه یک دروازه واقعاً اجرا شده است.

اسکریپت ها زیر `scripts/check/` (دروازه های خط مشی) و `scripts/quality/` (موتور ضامن دار) زندگی می کنند. منبع CI حقیقت `.github/workflows/ci.yml` است.

### انتشار سریع PR (`quality.yml`)

`.github/workflows/quality.yml` مکمل CI در main/release PRs است، به `main` فشار میآورد، گروهها را اعزام و ادغام میکند. PRs از چک های سریع فیلتر شده با مسیر استفاده می کند. ساخت تکراری غیرفعال شده برای همیشه حذف شد. چک های build/package/boot واقعی در CI باقی می مانند. مجموعه واحد و ویتست فقط در CI (`Unit Tests (N/8)` و `Vitest`) اجرا می شود.

| شغل                                              | دامنه                                                                                                        | مسدود کردن         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs و docs-all                                                                      | بله                |
| `Fast Quality Gates`                             | کد PRs; چکهای استاتیک، تایپچک، تایپ داشبورد، تستهای واحد ضربهخورده، تستهای خواهر و برادر فراموش شده (مشاوره) |
| `No new ESLint warnings`                         | کد PRs; محافظ پرز آگاه از سرکوب                                                                              | بله، از جمله چنگال |
| `Merge integrity (changelog + generated skills)` | غیر پیش نویس PRs; تغییرات و همگام سازی مهارت تولید شده                                                       | بله، از جمله چنگال |

#### گزارش تست های فراموش شده خواهر و برادر

`npm run check:forgotten-sibling-tests` به عنوان یک گام مشاوره ای از `Fast Quality Gates` اجرا می شود و از حل کننده واردات در پشت نقشه تست ضربه مجدد استفاده می کند. برای هر ماژول تولید تغییر یافته، زمانی که آزمون کاندید در تفاوت درخواست کشش وجود نداشته باشد، زنجیرههای `changed module/symbol -> static consumer -> candidate sibling test` قطعی را گزارش میکند. خلاصه Markdown و نتیجه JSON بهعنوان مصنوع گردش کار `forgotten-sibling-tests` برای کالیبراسیون قبل از هرگونه عرضه مسدود نگهداری میشوند.

صادرات مجدد بشکه و واردات پویا فقط تشخیص قطعنامه است. آنها هرگز یک یافته مسدود کننده ایجاد نمی کنند. استثناهای بررسی شده در `config/quality/forgotten-sibling-allowlist.json` زندگی می کنند. هر ورودی باید نام تست مصرف کننده و داوطلب را ذکر کند، دلیل خاصی را ارائه دهد، و یک مشکل GitHub یا درخواست کشش را پیوند دهد. ورودی های نادرست بسته نشدند. استثناها نمی توانند آزمون داوطلب حذف شده یا تفاوتی را که `.skip`/`.todo` اضافه می کند سرکوب کند. تضعیف ادعا و سایر پوششها متعلق به دروازه `check:test-masking` است که به طور مستقل مسدود میشود.

### شغل: `lint`

اجرا بر روی هر PR به `main`. بلوک ها در صورت شکست ادغام می شوند.

| اسکریپت (`npm run ...`)           | اعتبار سنجی می کند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | مسدود کردن                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | نسخه Node.js در محدوده پشتیبانی شده است                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله                                       |
| `check:cycles`                    | واردات دایره ای در تمام `src/` + `open-sse/` (بر اساس AST، tsconfig `paths` حل شد). هر زمان که چرخه ای وجود داشته باشد، Bare از 1 خارج می شود (از زمان #15281 بسته شده است) و SCCs را لیست می کند. `check:cycles:ratchet` (آنچه CI اجرا میشود) وقتی تعداد از سقف `metrics.cycles` در `quality-baseline.json` — در حال حاضر 14، `direction: down` بیشتر شود بلوک میکند، بنابراین فقط میتواند سقوط کند (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله (زاغه دار)                            |
| `check:boundary`                  | جفت `open-sse → src` : وارد کردن فایل به فایل منحصر به فرد از موتور به برنامه (`scripts/quality/measure-boundary.mjs`؛ لیست لبه، بک لاگ اصلاح v4 core/module-split است). گزارش مشورتی بره = (همان `quality:boundary`). `check:boundary:ratchet` (آنچه CI اجرا میشود، همچنین در حلقه ضامن دار سریع دروازههای `quality.yml` ) وقتی تعداد از سقف `metrics.boundaryOpenSseToSrc` در `quality-baseline.json` — در 771 `direction: down` اندازهگیری شده بیشتر شود، بلوک میکند. `--update` فقط آن را پایین می آورد. نسبی پایه در PRs (`--base-ref`، در زیر ببینید)                                                                                                                                                                                                                                                                                                                                                             | بله (زاغه دار)                            |
| `check:route-validation:t06`      | طرحوارههای Zod موجود در همه مسیرها (خطمشی ردیف 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | بله                                       |
| `check:any-budget:t11`            | تعداد `@ts-expect-error // any` از بودجه تجاوز نمی کند (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | بله                                       |
| `check:provider-consistency`      | هر ارائه دهنده در `providers.ts` دارای یک ورودی منطبق در `providerRegistry.ts` است (و بالعکس، در لیست مجاز)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | بله                                       |
| `check:model-lifecycle`           | سه جدول مسیریابی که بهصورت دستی نگهداری میشوند، با عکس فوری چرخه حیات ثبتشده (#11503) سازگار هستند: `FITNESS_TABLE` (`taskFitness.ts`) هیچ شناسه بازنشستهای را که `REGISTRY` بتواند مسیریابی کند، به دست نمیآورد. هر هدف `BUILT_IN_ALIASES` در `REGISTRY` وجود دارد و در عکس فوری شناسه بازنشسته وجود ندارد. هر شناسه بازنشسته هنوز در `REGISTRY` ارسال می شود یا در `allowedRetiredInCatalog` فهرست می شود. و هیچ منبع یا هدف `DEFAULT_DEGRADATION_MAP` در آن عکس فوری بازنشسته به نظر نمی رسد. این ثابت نمی کند که یک مدل در حال حاضر توسط یک بالادست زنده ارائه می شود. — آفلاین با `config/quality/model-lifecycle.json` مقایسه میشود، با دست با `npm run quality:refresh-model-lifecycle` (شبکه؛ به CI سیمکشی نشده) تازهسازی میشود. `allowedRetiredInCatalog` یک جغجغه سوخته است: فقط یک ورودی با مشکل ردیابی اضافه کنید.                                                                                          | بله                                       |
| `check:fetch-targets`             | هر `fetch("/api/...")` در `src/` سمت مشتری به یک `route.ts` واقعی تبدیل می شود                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | بله                                       |
| `check:deps`                      | همه `npm install` -able deps در هر `package.json` موجود در مخزن به `dependency-allowlist.json` هستند. بسته های جدید بدون پین یا slopsquatted پرچم گذاری شده اند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | بله                                       |
| `audit:deps`                      | ممیزی npm هر پنج فایل قفل مستقل (روت، Electron، پلاگین OpenCode v1/v2 و ارائه دهنده). بلوک توصیه های حیاتی؛ توصیه های بالا همچنان هشدارهای قابل مشاهده است. ممیزی Missing/failed INCOMPLETE و block هستند. هشها و گزارشهای قفل در هر دامنه حفظ میشوند.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | بله                                       |
| `check:lockfile`                  | یکپارچگی `package-lock.json` رجیستری — https، هش یکپارچگی، بدون لغو میزبان                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | بله                                       |
| `check:licenses`                  | لیست مجوز SPDX برای وابستگی های تولید                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                       |
| `check:tracked-artifacts`         | بدون ساخت مصنوعات / پیوندهای نمادین `node_modules` متعهد (همچنین در pre-commit هاسکی اجرا می شود؛ پیش فشار عمدا — #6716 سبک است)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | بله                                       |
| `check:ai-attribution`            | هیچ تریلر AI/bot `Co-Authored-By` یا پاورقی نسل هوش مصنوعی در PR commits، عنوان یا بدنه — قانون سخت #16 `commit-msg` در حلقه `quality.yml` fast-gates برای PR→ `release/**` — بار رویداد را میخواند، no-op off PRs — و یک گام فقط PR در `ci.yml` PR lint → `main`; نویسندگان مشترک #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | هر حذف Vitest یک مشکل ردیابی را نامگذاری می کند و در `config/quality/vitest-exclusions.json` (#13204) ظاهر می شود.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                       |
| `check:file-size`                 | فایل های منبع (`.ts`/`.tsx` در `src/`, `open-sse/`, `electron/`, `bin/`) در `cap` و فایل های تست (`*.test.ts(x)`) در `testCap` باقی می مانند . فایل های منجمد شده در `file-size-baseline.json` (`frozen` / `testFrozen`) نباید از اندازه ثبت شده خود بیشتر شوند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | بله                                       |
| `check:error-helper`              | پاسخ های خطا در executors/handlers `buildErrorBody()` / `sanitizeErrorMessage()` استفاده می کنند (قانون سخت #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | بله                                       |
| `check:migration-numbering`       | نام فایل های مهاجرت: سری های قدیمی `001`–`241` فریز شده و فایل های جدید `YYYYMMDDHHMMSS_<description>.sql` هستند. در مقابل پایه PR ، انتقال حذف شده، تغییر نام بدون ورودی سازگاری، و خارج از نظم یا ویرایش شده که طرح نهایی آن تغییر نمی کند را رد می کند.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:public-creds`              | بدون OAuth `client_id`/`client_secret` یا کلیدهای وب Firebase در خارج از `publicCreds.ts` (قاعده سخت #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | بله                                       |
| `check:db-rules`                  | بدون SQL خام خارج از ماژول های `src/lib/db/`. بدون واردات بشکه از `localDb.ts` (قوانین سخت #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | بله                                       |
| `check:known-symbols`             | مجریان ارائهدهنده، استراتژیهای مسیریابی، و مترجمهای ثبتشده در جداول ارسال آنها با فایلهای موجود در دیسک — بدون نمادهای یتیم یا اعلامنشده مطابقت دارند.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | بله                                       |
| `check:route-guard-membership`    | هر مسیری که یک فرآیند فرزند ایجاد می کند توسط `isLocalOnlyPath()` طبقه بندی می شود (قوانین سخت #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله                                       |
| `check:test-discovery`            | هر فایل `*.test.ts` / `*.spec.ts` در مخزن حداقل توسط یک دونده آزمایشی جمعآوری میشود `test-discovery-baseline.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                       |
| `check:test-tla-order`            | هیچ فایل `node:test` زیر `tests/unit` آزمایشی را ثبت نمیکند، `await` سطح بالایی را وارد میکند، سپس موارد بیشتری را ثبت میکند (#18045؛ ضامن دار: `test-tla-order-allowlist.json` فقط میتواند کوچک شود)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                       |
| `check:agent-skills-sync`         | مصنوعات مهارت های عامل تولید شده با کاتالوگ منبع خود مطابقت دارند (بدون رانش). حالت انتشار هر مهارت را بررسی می کند. یک ویژگی PR (حالت `pr` ) فقط مهارتهایی را که متن تولید شده آنها را ویرایش میکند بررسی میکند — [فایلهای تولید شده و خطوط پایه مشتق شده را](#generated-files-and-derived-baselines-written-at-release) ببینید.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | ارائهدهنده logos/assets یک ورودی منشأ ثبت شده دارد                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | فایل های پیکربندی JSON قوانین repo lint را تجزیه و برآورده می کنند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | تدوین TypeScript بدون خطا (فقط هشدارهای مشاوره ای)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                       |
| `typecheck:noimplicit:core`       | سخت `noImplicitAny` — آینده نگر; بسیاری از سایت های تماس از قبل موجود هنوز به حاشیه نویسی نیاز دارند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **مشاوره ای** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` با محدوده `src/app/(dashboard)/**` (#7033) — فهرست مجاز 27 فایلی انتخاب شده `typecheck:core` شامل هیچ داشبوردی TSX نمیشود، و `next build` هرگز آن را تایپ نمیکند (`next.config.mjs` `ignoreBuildErrors: true` را تنظیم میکند)، بنابراین رگرسیونهای شناسه یتیم در آنجا (#6625/#6909) برای CI نامرئی بودند. تفاوتها در برابر خط پایه شمارش per-file/per-TS-code منجمد (`config/quality/dashboard-typecheck-baseline.json`، همان الگوی اجرای قدیمی `check:known-symbols`) — فقط خطاهای NEW فراتر از شمارش خط پایه، دروازه را با شکست مواجه میکند. هنگامی که یک خطای قبلی برطرف شد، با `--update` پایین بیاورید.                                                                                                                                                                                                                                                                                                      | بله                                       |
| `check:build-typecheck`           | نوع تولید کل برنامه را بررسی کنید `tsconfig.build.json` (`src`، `open-sse`، `packages`، `bin`، `scripts`، `electron/**/*.d.ts`)، لیست مجاز 27 فایل سطح `typecheck:core` و گیت داشبورد را پوشش نمیدهد. تفاوت در مقابل `config/quality/build-typecheck-baseline.json`; یک تعداد جدید یا افزایش یافته در هر (فایل، کد) با شکست مواجه می شود، یک تعداد کمتر از شما می خواهد که جغجغه کنید. `--update` امتناع میکند در حالی که اجرا شامل یک جفت جدید یا افزایشیافته است، مگر اینکه `--force-regressions` پاس شود، و فایل تازه خاموششده را رد میکند مگر اینکه `--force-nocheck` پاس داده شود، بنابراین گسترش خط پایه برای سبز شدن و اعطای سکوت دائمی دو اقدام عمدی جداگانه هستند. `--force` برهنه مردود است. همچنین محدوده ساخت `@ts-nocheck` را در برابر `config/quality/ts-nocheck-baseline.json` اسکن میکند، زیرا فایلی که از آن استفاده میکند هیچ عیبیابی را گزارش نمیکند و در غیر این صورت برای هر گیت نامرئی خواهد بود. | بله                                       |

#### دو برنامه تایپ چک متفاوت جواب می دهند

`typecheck:core` و `check:build-typecheck` برنامه های مختلف را تحت گزینه های مختلف کامپایل می کنند و یک فایل می تواند در یکی تمیز و در دیگری پر از خطا باشد.

`tsconfig.build.json` `"strict": false` را تنظیم می کند، بنابراین `noImplicitAny` خاموش است. پیکربندی هسته یک لیست مجاز 27 فایلی با گزینههای سختگیرانهتر جمعآوری میکند و از نمودار واردات هر ورودی پیروی میکند، بنابراین فایلهایی که هرگز در برنامه ساخت ظاهر نمیشوند همچنان در آنجا بررسی میشوند.

نتیجه هنگام قضاوت در مورد تایپ شدن یک فایل مهم است:** تشخیص صفر تحت `check:build-typecheck` به معنای صفر نیست** . حذف `@ts-nocheck` از 26 فایل، 23 مورد از آنها را در برنامه ساخت تمیز نشان داد. 16 نفر از آن ها حدود 120 خطای ضمنی را در خطای دقیق نشان دادند. قبل از فراخوانی یک فایل تمیز، هر دو را بررسی کنید.

### شغل: `quality-gate`

دنبال `test-coverage` می دود . بلوک ها در صورت شکست ادغام می شوند.

| اسکریپت                      | اعتبار سنجی می کند                                                                                                                                               | مسدود کردن              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | `quality-metrics.json` منتشر می کند (تعداد هشدار ESLint ، پوشش از گزارش ادغام شده خردهای)                                                                        | بله (بالا دست ضامن دار) |
| `quality:ratchet`            | هر معیار در `quality-baseline.json` پسرفت نکرده است (خط پایه ≤ هشدار ESLint ؛ خط مبنا ≥ پوشش)                                                                    | بله                     |
| `check:duplication`          | تکرار کد (jscpd@4) در `quality-baseline.json` از خط پایه تجاوز نمی کند                                                                                           | بله                     |
| `check:complexity`           | پیچیدگی سیکلوماتیک در سطح فایل از سقف تجاوز نمی کند (core ESLint `complexity` + `max-lines-per-function`)                                                        | بله                     |
| `check:cognitive-complexity` | پیچیدگی شناختی جغجغه (`eslint-plugin-sonarjs`) — جداگانه ESLint pass; CI هر دو را به عنوان یک مرحله `check:complexity-ratchets` ادغام شده اجرا می کند            | بله                     |
| `check:dead-code`            | صادرات / فایل های استفاده نشده ضامن دار (knip) در مقابل خط پایه پسرفت نمی کند                                                                                    | بله                     |
| `check:compression-budget`   | بودجه معیار تراکم — به ازای هر موتور، طبقات پس انداز نباید پسرفت کنند                                                                                            | بله                     |
| `check:type-coverage`        | جغجغه تایپ درصد (`type-coverage`) پسرفت نمی کند. تا حد زیادی `typecheck:noimplicit:core` را در بر می گیرد                                                        | بله                     |
| `check:codeql-ratchet`       | تعداد هشدارهای باز CodeQL پسرفت نمی کند (خوانش از طریق `gh api`؛ رد شدن برازنده بدون نشانه) آهنگ تازه سازی — و ماشه دستی: به "CodeQL ratchet" در زیر مراجعه کنید | بله                     |
| `check:type-scale-ratchet`   | مقیاس نوع کیت: اندازههای زیر 12 پیکسل و `font-bold` در `src/` فقط پایین میآیند (`typeScaleSubFloorSizes`، `typeScaleFontBold`). همچنین در قلاب pre-commit        | بله                     |

### شغل: `quality-extended`

کار مختلط، بدون `continue-on-error` در سطح شغل: مرحلهای که از `--ratchet` عبور میکند، در یک رگرسیون اندازهگیری شده در مقابل `quality-baseline.json` کار را با شکست مواجه میکند. فقط `check:circular-deps` و مرحله نصب اسکنر مشاوره ای هستند ( `continue-on-error: true` در سطح مرحله). نصب اسکنرهای خارجی از طریق `gh release download`. هنگامی که gitleaks وجود ندارد `check:secrets` خود پرش میشود (خروج 0)، در حالی که `check:vuln-ratchet`، `check:workflows` و `check:openapi-breaking` زمانی که اندازهگیری آنها وجود ندارد بسته میشوند.

| اسکریپت                  | اعتبار سنجی می کند                                                                                                                                                                                                  | مسدود کردن                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | بدون وابستگی دایره ای (dpdm)                                                                                                                                                                                        | **مشاوره ای**                               |
| `check:bundle-size`      | اندازه بسته نرم افزاری از کلاهک تجاوز نمی کند. اندازه غیر قابل اندازه گیری نیز شکست می خورد                                                                                                                         | **مسدود کردن با --ratchet**                 |
| `check:secrets`          | اسکن مخفی (gitleaks) — در صورت عدم وجود باینری انجام می شود                                                                                                                                                         | **مسدود کردن با --ratchet**                 |
| `check:vuln-ratchet`     | آسیبپذیریهای وابستگی (osv-scanner) اگر اندازهگیری نشود `--ratchet` — INCOMPLETE مواجه نمیشود (خروج 2)                                                                                                               | **مسدود کردن با --ratchet**                 |
| `check:workflows`        | لینت گردش کار (اکشن لینت + زیزمور); اسکنرهای missing/broken ، گزارشهای نامعتبر یا خط پایه جغجغهای گمشده بهعنوان INCOMPLETE ناموفق هستند. یافته های معتبر از خط مشی strict/advisory/ratchet انتخاب شده پیروی می کنند | اجرا لازم است؛ انسداد ضامن دار zizmor در CI |
| `check:openapi-breaking` | قرارداد عمومی API در برابر تعهدات رویداد پین شده (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); اندازه گیری مورد نیاز بسته نمی شود                                         | **مسدود کردن با --ratchet**                 |

### شغل: `docs-sync-strict`

اجرا بر روی هر PR به `main`. بلوک ها در صورت شکست ادغام می شوند.

| اسکریپت                        | اعتبار سنجی می کند                                                                                                                                    | مسدود کردن                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | متا گیت که 6 گیت فرعی زیر را به صورت متوالی اجرا می کند                                                                                               | بله                            |
| ↳ `check:docs-sync`            | قوام نسخه CHANGELOG / OpenAPI ; حالت آزادسازی نیز 66 آینه `llm.txt` و بخشهای CHANGELOG ترجمه شده (حالت PR : آینهها موافق هستند)                       | بله                            |
| ↳ `check:docs-counts`          | شمارش در نثر (تعداد ارائه دهنده، تعداد مهاجرت و غیره). دو حالت: `pr` در ویژگی PRs، `release` در جاهای دیگر — "مقادیر مشتق شده" را در زیر ببینید       | بله                            |
| ↳ `check:env-doc-sync`         | هر env var در `.env.example` در یک جدول اسناد مستند شده است و بالعکس                                                                                  | بله                            |
| ↳ `check:deprecated-versions`  | هیچ رشته نسخه منسوخ شده در اسناد وجود ندارد                                                                                                           | بله                            |
| ↳ `check:doc-links`            | پیوندهای نشانه گذاری داخلی در اسناد به فایل های واقعی (فرم `[text]`/`(path)` )                                                                        | بله                            |
| ↳ `check:fabricated-docs`      | مسیرها، env vars، دستورات CLI ، نام قلاب و مسیرهای فایل ذکر شده در اسناد در پایگاه کد وجود دارند. دروازه سخت از طریق `--strict`; soft-fail بدون پرچم. | بله (از طریق `--strict` در CI) |
| `check:cli-i18n`               | کلیدهای CLI `t()` در `bin/cli/locales/en.json` (هر دو حالت) وجود دارند. برابری pt-BR / zh-CN / zh-TW با `en.json` فقط در حالت انتشار                  | بله                            |
| `check:openapi-coverage`       | مشخصات OpenAPI حداقل یک طبقه از مسیرهای واقعی را پوشش می دهد                                                                                          | بله                            |
| `check:openapi-security-tiers` | حاشیه نویسی های لایه امنیتی در `openapi.yaml` با طبقه بندی `routeGuard.ts` سازگار است                                                                 | **مشاوره ای**                  |
| `check:openapi-routes`         | هر مسیر در `openapi.yaml` به یک `route.ts` واقعی (ضد توهم) منتهی می شود.                                                                              | بله                            |
| `check:docs-symbols`           | هر مرجع `/api/...` در `docs/**/*.md` به یک `route.ts` واقعی (ضد توهم) حل می شود.                                                                      | بله                            |
| `i18n translation drift`       | مشاوره `docs/i18n/**` mirrors vs `.i18n-state.json` — در PRs (آینه ها با موج ترجمه تازه می شوند)، سختگیرانه در فشار و شبانه                           | **مشاوره ای** روی PRs          |

#### آینه های ترجمه فایل های مشتق شده هستند (حالت PR در مقابل حالت انتشار)

ویژگی PR فقط منابع انگلیسی را ویرایش می کند. آینههای `docs/i18n/<locale>/**` (شامل 66 نسخه `llm.txt` و فایلهای `CHANGELOG.md` ترجمه شده) و `.i18n-state.json` در یک مرحله توسط موج ترجمه (شاخههای `docs/i18n-*` / `chore/i18n-*` ، `i18n-mirror-refresh.yml` زمانبندیشده) و با انتشار (`npm run release:sync-changelog-i18n`) بازنویسی میشوند. بنابراین دروازههای آینهای در دو حالت اجرا میشوند که با `scripts/check/lib/gateMode.mjs` حل میشوند (`--mode=pr|release`، سپس `OMNIROUTE_GATE_MODE`، سپس رویداد Actions؛ یک اجرای محلی `release` است):

- حالت انتشار `check:docs-sync` — هر بررسی را اجرا می کند. حالت PR نسخه package.json/OpenAPI ، سرفصلهای ریشه CHANGELOG و محافظ جایگزین اسناد را نگه میدارد، و `SKIP reason=pr-mode` برای کپیهای آینه `llm.txt` و بخشهای CHANGELOG ترجمه — چاپ میکند، مگر اینکه PR آینهها را بنویسد: یک شاخه سر که بهعنوان نویسنده خانواده `docs/i18n/**` در `config/quality/derived-paths/*.json` اعلام شده است، هر دو را بررسی میکند، و زمانی که diffdit خود را بررسی میکند، یا زمانی که diffqm خود را بررسی میکند `CHANGELOG.md` `docs/i18n/<locale>/llm.txt` می کند که به شدت چک می کند. پایه تفاوت در پرداخت depth-1 (کار `docs-sync-strict` ) حل نمیشود، بنابراین حالت PR یک بررسی را نیز اجرا میکند که نیازی به پایه ندارد: هر آینه `llm.txt` باید وجود داشته باشد، جداکننده `---` خود را حفظ کند و یا بدنه ریشه یا بدنه مشترک اکثر آینهها را حمل کند. پایه ای که حرکت می کند همه آینه ها را به یک اندازه کهنه می کند و می گذرد. ویرایش دستی در یک آینه با شکست مواجه می شود. فایلهای `CHANGELOG.md` ترجمهشده چنین چکی در پرداخت depth-1 PR ندارند.
- قلاب pre-commit `check-docs-sync.mjs --mode=pr` را اجرا می کند: یک commit بر اساس آنچه انجام می دهد مورد قضاوت قرار می گیرد. بدون پرچم، یک اجرای محلی حالت انتشار است و یک PR ادغام شده که `llm.txt` ریشه را ویرایش میکند، هر commit بعدی را در آن پایه تا زمانی که موج اجرا شود مسدود میکند. همین قانون برای هر دروازه آگاه از حالت، یک هوسک هاسکی اجرا میشود: قلاب از `--mode=pr` عبور میکند، و حکم سختگیرانه در اجرای حالت آزاد باقی میماند (بازسازی PR، به `main` فشار میدهد، یک اجرای محلی ساده).
- آزمایشهای واحد محتوای آینهای (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`، `resilience-pre-dispatch-docs-mirrors`، `cli-env-quality-docs-mirrors`، `docs/*-locales`) حالت انتشار — هر محلی را تأیید میکند. حالت PR فقط آینههایی را تأیید میکند که با منبع انگلیسی مطابق `.i18n-state.json` (هش کل فایل، یا هش بخش ضبطشده قسمت پینهای آزمایشی) جاری هستند و از آینههای قدیمی با دلیل میگذرد. بررسی منشأ `target_hash` برای هر محلی در هر دو حالت اجرا می شود. طراوت در هر بخش `## ` ، واحد `run-translation.mjs` هش است. یک بخش طولانی (موجودی گیت این فایل تقریباً نیمی از آن است) به این معنی است که هر ویرایشی در آن آینه ها را کهنه می کند و ادعاهای حالت PR آنها تا موج بعدی رد می شود. لنگری که منبع انگلیسی دیگر حاوی آن نیست، به مقایسه کل فایل بازمی گردد.
- مشاوره `i18n translation drift` — در مورد PRs، سختگیرانه در مورد فشار، شبانه و برش رهاسازی، بنابراین یک آینه کهنه نمی تواند در آزادسازی ارسال شود.

`scripts/i18n/sync-llm-mirrors.mjs` (همچنین به عنوان `syncLlmMirrors()` صادر می شود، با `--dry-run`) آینه های `llm.txt` را بازنویسی می کند. بازخوانی انتشار، موج ترجمه و `i18n-mirror-refresh.yml` زمانبندیشده آن را اجرا میکنند (بازسازی آینههای کهنه `llm.txt` را با اجرای خشک شناسایی میکند، زیرا گزارش رانش آنها را فهرست نمیکند و آنها را قبل از `check:docs-all` همگامسازی میکند).

دوازده README SVGs تحت `docs/diagrams/` تولید می شوند (`scripts/docs/gen-readme-<name>.mjs`؛ `npm run docs:readme-diagrams` همه آنها را بازسازی می کند). هر کدام یک تست واحد مقایسه بایت (`tests/unit/docs/readme-*-svg.test.ts`، job `test-unit`) دارند که وقتی فایل متعهد در حالت انتشار بیات است، با شکست مواجه میشود. در یک PR، `check:generated-artifacts` درباره SVG ویرایشهای PR را قضاوت میکند و دریفت پایه به تازهسازی انتشار واگذار میشود (به [فایلهای تولید شده و خطوط پایه مشتق شده](#generated-files-and-derived-baselines-written-at-release) مراجعه کنید) — و `check:docs-counts` اعداد متعارف را از گرههای `<text>` خود — میخواند، به همین دلیل است که مرحله ترسیم، هر رشته مشخص شده در فایل `<text>` را بهصورت visvis نگه میدارد. چک اعداد متعارف SVG فایل های فهرست شده در `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) را می خواند: `docs/diagrams/readme-hero.svg`، `free-tier-budget.svg`، `promise-pillars.svg`، `comparison-table.svg`، `cli-terminal.svg`، `tier-cascade.svg`، به علاوه `public/images/tier-flow-dark.svg` و `tier-flow-light.svg`. ادعاهای رایگان برای همیشه، کاتالوگ ورودی، استخر تکرارشونده و فاکتورهای امتیازدهی نیز `promise-pillars.svg`، `free-tier-budget.svg` و `strategies-grid.svg` را میخوانند. شمارشهایی که این ژنراتورها ترسیم میکنند (کل ارائهدهنده، ابزارهای MCP ، استراتژیهای مسیریابی، ارائهدهندههای رایگان برای همیشه، ...) از تصاویر واقعی `docs/reference/derived-facts.json` تا `scripts/docs/readmeFacts.mjs` میآیند، نه از لفظها، بنابراین بازسازی یک نمودار در هر شاخه، فایل متعهد را بازتولید میکند. `free-tier-budget.svg` ردیفهای خود را از همان عکس فوری ترسیم میکند (`code.freeTierBudget`، خلاصه کاتالوگ ثبتهای کاوشگر حقایق)، بنابراین تغییر به `FREE_MODEL_BUDGETS` به جای اینکه CI قرمز شود، در رفرش بعدی به کارت میرسد.

### مقادیر مشتق شده: حالت های دروازه `pr` و `release`

یک ویژگی PR هرگز مقداری را نمی نویسد که به وضعیت پایگاه آن بستگی دارد: ارائه دهنده، مهاجرت، MCP-ابزار و شمارش استراتژی، اعداد README SVG ، عکس فوری حقایق. یک مرحله همه آنها را مجدداً محاسبه می کند، `npm run release:refresh-derived`، که توسط انتشار و توسط شبانه مشتق شده-رفرش PR اجرا می شوند. بنابراین** بین نسخه ها پایه پشت کد زنده با طراحی قرار دارد** و یک دروازه یا آزمایشی که درخت را با کد زنده مقایسه میکند، پس از افزودن یک ارائهدهنده توسط خواهر و برادر، روی هر PR قرمز میشود. بنابراین، دروازههایی که مقادیر مشتق شده را قضاوت میکنند در یکی از دو حالت اجرا میشوند که با `scripts/check/lib/gateMode.mjs` (برندههای مسابقه اول) حل میشوند:

1. `--mode=pr|release` در خط فرمان؛
2. متغیر محیط `OMNIROUTE_GATE_MODE` (`pr` یا `release`)؛
3. خودکار، از رویداد GitHub Actions: یک `pull_request` که سر آن `release/v*`، `merge_group` یا فشار به `omni-queue/**` → `pr` نیست. هر چیز دیگری (فشار، برنامه، ارسال، انتشار PR `release/v* → main`، هر اجرا محلی) → `release`.

کدام `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) در هر حالت شکست میخورد:

| حالت      | شکست می خورد                                                                                                                                                                                                                                                                                                                                                                                       | به حقایق زنده نیاز دارد |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `release` | هر چک، برابری دقیق در برابر حقایق جمعآوریشده از درخت (رفتاری که دروازه همیشه داشت): تعداد قدیمی، نسخه، طبقه پوشش یا عدد SVG یک رانش STRICT است.                                                                                                                                                                                                                                                    | بله                     |
| `pr`      | تنها کاری که این تغییر انجام داد، با همان استخراجکنندههای ادعا، با پایه PR تفاوت داشت: (1) یک مقدار مدیریتشده که در پایه آن چک و فایل وجود نداشت ("PR یک عدد مدیریتشده را ویرایش کرد — خط را به متن اصلی بازگرداند"). (2) ادعای الزامی که پایه حمل کرده و سر گم شده است. متغیرهای محتوایی که نیازی به واقعیت ندارند مانند حالت انتشار اجرا می شوند. چکهای فقط آزاد فهرست شده و نادیده گرفته میشوند | خیر                     |

فایل های عامل دستورالعمل حمل می شوند** نه** اصلاً شمارش مشتق شده: `AGENTS.md`، `llm.txt` (و نسخههای `docs/i18n/*/llm.txt` آن)، bs `AGENTS.md` fork، `open-sse/services/AGENTS.md`، `src/shared/constants/agentSkills.ts`، `skills/README.md` و هر `skills/*/SKILL.md` به منبع (مثلا `ROUTING_STRATEGY_VALUES` در `src/shared/constants/routingStrategies.ts`) و در عوض به `npm run facts` اشاره میکنند. ثابت "بدون تعداد مشتق شده (فایل دستورالعمل ...)" در هر دو حالت شمارش نمی شود (ارائه دهندگان، مهاجرت ها، ابزارها و دامنه های MCP ، استراتژی های مسیریابی، فاکتورهای امتیازدهی، بسته های حالت) در هر دو حالت، بنابراین بازخوانی انتشار هرگز نیازی به بازنویسی یک فایل دستورالعمل ندارد.

در حالت `pr` شاخه های نویسنده ممکن است مقادیر مدیریت شده را ویرایش کنند: `chore/derived-*` (بازسازی شبانه PR)، `release/v*`، و امواج ترجمه `docs/i18n-*` و `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). دستههای صف (`merge_group`، پیشنویسهای Mergify، `omni-queue/**`) دوباره مورد قضاوت قرار نمیگیرند: آنها PRs دروازهای را که قبلاً یک به یک قضاوت شده است، جمع میکنند.

کدهای خروج: `0` clean · `1` STRICT drift (یا دریفت نرم با `--strict`) یا نقض ارزش مدیریت شده · زیرساخت `2` — حقایق کد جمعآوری نشد (کاوشگر tsx ناموفق یا به پایان رسید؛ مهلت زمانی `OMNIROUTE_FACTS_TIMEOUT_MS` است، پیشفرض 600000 میلیثانیه است) یا، در CI نمیتوان بر اساس PR ، آن را حل کرد. خروجی 2 هرگز یک واگرایی مستندات نیست: کار را دوباره اجرا کنید یا محیط را اصلاح کنید.

جایی که هر حالت اجرا می شود:

| کجا                                                                                                     | حالت                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ویژگی PR — `ci.yml` job `docs-sync-strict`, `quality.yml` step "Docs accuracy"                          | `pr` (اتوماتیک)؛ کار از پایه به عنوان `BASE_SHA` عبور می کند و با `fetch-depth: 2` بررسی می شود                                                                                                              |
| `merge_group`، نامزدهای `omni-queue/**` ، فهرست دروازه کامل قطار ادغام                                  | `pr`                                                                                                                                                                                                         |
| PR (`release/v* → main`)، فشارها، اجرای برنامه ریزی شده و دستی را آزاد کنید                             | `release`                                                                                                                                                                                                    |
| انتشار-سبز (`scripts/quality/validate-release-green.mjs`)                                               | آیتم های HARD با `OMNIROUTE_GATE_MODE=pr` اجرا می شوند ("آیا پایه شکست؟"); مورد DRIFT `derived-refresh` `npm run release:refresh-derived -- --check` را اجرا میکند (نمای دقیق، هرگز پایه قرمز را باز نمیکند) |
| انتشار (فازهای `/generate-release` 0a و 1؛ سیمکشی مهارت تغییر جداگانهای است که توسط مالک تأیید شده است) | `npm run release:refresh-derived` فایل های مشتق شده را می نویسد. چک های خود PR را آزاد کنید سپس در حالت `release` اجرا کنید                                                                                  |
| `nightly-derived-refresh.yml` (روزانه، بالاترین `release/vX.Y.Z`، حذف شده در زمان انتشار-انجماد)        | `npm run release:refresh-derived -- --profile=nightly`; در یک تفاوت، ONE PR از `chore/derived-refresh` باز نگه میدارد. هرگز ادغام نمی شود                                                                    |

دستورات پشت آن:

- `npm run facts` هر عدد مشتق شده را به صورت JSON (`scripts/release/facts.mjs`) چاپ می کند. `--key=code.mcpTools` یک مقدار را چاپ می کند، `--snapshot` عکس فوری متعهد را به جای درخت زنده می خواند. هنگامی که حقایق جمع آوری نمی شوند، از 2 خارج شوید.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) فایلهای مشتق شده را در یک گذر مجدداً محاسبه میکند، به این ترتیب (شناسههای مرحله برای `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`)، `facts` (عکس فوری)، `numbers` (طرح بازنویسی دروازه شمارشها روی اسناد اعمال میشود، سپس به آینههای `docs/i18n/` آنها منتقل میشود)، `readme-diagrams`، `skills` ( `SKILL.md`) میشود. `syncE2eTimings`)، `e2e-timings` (کلیدهای `en.json` `ui-keys` شدند و با `--rewritten-since=<ref>` — پیشفرض `origin/main` — مقادیر انگلیسی را که از آخرین نسخه بازنویسی شدهاند، دوباره در صف قرار میدهد؛ مقادیر در همان اجرا توسط backend پیکربندیشده در محیط یا در `.env` ترجمه میشوند (`OMNIROUTE_TRANSLATION_*`، فقط آن کلیدها خوانده نمیشوند) یا با موتور Google `__MISSING__` شده به عقب هرگز نمیخوانند. از کار میافتد، شبانه کلیدها را رد میکند، و `--allow-untranslated` آنها را عمدا مینویسد)، `llm-mirrors` و `verify-generated` (پس از نوشتن، `check:generated-artifacts` و `check:agent-skills-sync` در حالت آزاد باید بگذرند؛ در `--check` پرش میشوند و وقتی `--only` آن را کنار میگذارد؛ خرابی خروجی 2 است). مرحله `changelog` انتخاب شده است (`--with-changelog`، فقط نمایه انتشار). `--profile=nightly` هرگز ادعای نسخه را لمس نمی کند. با `-- --check` چیزی نمی نویسد و زمانی که هر فایلی تغییر کند یا یک مقدار مدیریت شده نیاز به ویرایش دستی داشته باشد از عدد 1 خارج می شود. خروج 2 در مورد خرابی زیرساخت. `--json` نتیجه را به صورت JSON چاپ می کند.
- `docs/reference/derived-facts.json` عکس فوری از حقایق است که آخرین رفرش استفاده شده است. فقط رفرش مینویسه ژنراتورهای README SVG آن را میخوانند و آزمایشهای واحد PR-time اسناد متعهد و فایلهای تولید شده را با آن — هرگز با کد زنده مقایسه نمیکنند. تنها مقایسه زنده مجموعه این است که "بازسازی انتشار چرخه را می بندد" در `tests/unit/check-docs-counts-sync.test.ts`: با حقایق زنده، طرح بازنویسی تازه سازی که در حافظه اعمال می شود هیچ تغییری در STRICT باقی نمی گذارد و آن را گزارش نمی کند، و برنامه ریزی مجدد چیزی را تغییر نمی دهد.

برای بازتولید محلی (یک اجرای محلی به صورت پیش فرض `release` است):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

بدون یک پایه قابل حل (بدون `BASE_SHA`/`BASE_REF`، بدون `origin/release/v<version>` محلی) یک اجرای `pr` محلی یک اخطار چاپ میکند و بهجای شکست، تفاوت را رد میکند.

### شغل: `i18n-ui-coverage`

| اسکریپت                          | اعتبار سنجی می کند                                                                                                                                                    | مسدود کردن            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `check-ui-keys-coverage` (داخلی) | پوشش کلید UI i18n ≥ 65٪ است                                                                                                                                           | بله (هر دو حالت)      |
| `check:ui-icu`                   | هر پیام از هر کاتالوگ UI با `IntlMessageFormat` جمع آوری می شود                                                                                                       | بله (هر دو حالت)      |
| `check-ui-value-drift` (داخلی)   | یک انگلیسی بازنویسی شده** ارزش** ترجمه ای کهنه باقی نمی گذارد                                                                                                         | بله (فقط حالت انتشار) |
| `check-new-key-coverage` (داخلی) | الف** جدید** کلید انگلیسی در هر محلی ترجمه می شود — یک نشانگر `__MISSING__:` رد می شود                                                                                | بله (فقط حالت انتشار) |
| `check-key-completeness` (داخلی) | هر کاتالوگ UI (و با `--catalog=cli`، هر کاتالوگ CLI ) دقیقاً مجموعه کلید `en.json` خود را دارد. در حالت `pr` ، هر کاتالوگ PR در برابر خودش در پایه ادغام تغییر کرد    | بله (هر دو حالت)      |
| `check-translation-ratio`        | نسبت ترجمه واقعی به ازای هر منطقه (یکسان به انگلیسی / جای جای / برگهای خارج از فهرست مجاز) نباید از `config/quality/i18n-translation-baseline.json` + slack تجاوز کند | بله (فقط حالت انتشار) |

`fetch-depth: 0` — نیاز دارد که دروازه ارزش رانش `en.json` را با پایه ادغام متفاوت می کند.

**دو حالت (از 13-11-2026).** یک ویژگی PR کلیدها را در `en.json` (و `bin/cli/locales/en.json`) اضافه یا بازنویسی میکند و هیچ محلی دیگر را لمس نمیکند. `check:pr-derived-paths` (شغل `pr-test-policy`، خانواده `config/quality/derived-paths/translation.json`) یک ویژگی PR که انجام میدهد با شکست مواجه میشود. سایر زبانها یک بار در هر نسخه توسط `release:refresh-derived` تکمیل میشوند، که `syncUiKeys()` را به `scripts/i18n/sync-ui-keys.mjs` میخواند (کلیدهای گمشده را اضافه کنید، کلیدهای حذف شده را هرس کنید، ترجمههای انگلیسی بازنویسی شده را با `rewrittenSinceRef` علامتگذاری کنید، ترجمه کنید)، یا با موج ترجمه. گیتها حالت را از `scripts/check/lib/gateMode.mjs` میخوانند: در حالت `pr` (ویژگی PRs، `merge_group`، `omni-queue/**`) گیتهای حالت انتشار در بالای `SKIP reason=pr-mode` چاپ میشوند و 0 خارج میشوند. در حالت `release` (انتشار PR، فشار به `main`، `workflow_dispatch`، اجراهای محلی) مانند قبل سختگیر هستند، و در انتشار PR افراد آگاه از تفاوت `BASE_REF=origin/main` دریافت میکنند، بنابراین هر کلیدی را که چرخه اضافه یا بازنویسی شده قضاوت میکنند. پیش نمایش حکم ویژگی-PR به صورت محلی با `--mode=pr`.

PR که همچنان کاتالوگهای محلی را در حالت `pr` تغییر میدهد (موج ترجمه، تازهسازی انتشار، اصلاح فقط ترجمه) نادیده گرفته نمیشود: `check-key-completeness` هر کاتالوگی را که تغییر داده است بر اساس همان کاتالوگ در پایه ادغام (`scripts/i18n/lib/touched-catalogs.mjs`) قضاوت میکند و روی کلیدی که کاتالوگ گم شده است، کلید `en.json` فاقد آن است، یک متن واقعی که به یک مقدار تبدیل نمیشود یا به `__MISSING__:` تبدیل میشود. placeholders/tags از یک رشته انگلیسی PR لمس نکرد. یک کاتالوگ جدید در PR باید کل مجموعه کلید `en.json` را داشته باشد. که برای کاتالوگها که PR لمس میکند، آنچه را که گیتهای نسبت و برابری CLI مشاهده میکنند، پوشش میدهد.

آزمونهای واحد برابری محلی (`cli-i18n-catalog`، `i18n-pt-br`، `i18n-vi-completeness`، `i18n-placeholder-parity`) از حالتهای مشابهی از طریق `tests/_helpers/localeParityMode.ts` پیروی میکنند: در حالت `pr` از اظهارات برابری کلید صرفنظر میکنند و به انتشار میگذارند برابری مکانبان کلیدهایی که انگلیسیشان از زمان پایه ادغام تغییر کرده است (هر کلید زمانی که کار آزمون واحد نمیتواند آن را بررسی کند، بازخوانی کند). آن کمک کننده است** فقط** حالت تحریمی-پرش مشروط: `check:test-masking` `.skip(` و `{ skip: true }` را میشمارد اما `{ skip: "<reason>" }` محاسبهشده را که برمیگرداند نمیداند، بنابراین `tests/unit/locale-parity-mode.test.ts` لیست آزمایشهایی را که مجاز به استفاده از آن هستند پین میکند — اضافه کردن یک ویرایش بازبینی شده به آن فهرست است.

#### دروازه کهنه-ترجمه `check-ui-value-drift` —

یک رگرسیون i18n را میگیرد که دروازههای دیگر از نظر ساختاری نمیتوانند ببینند: یک مقدار انگلیسی بازنویسی میشود و ترجمههای مشتقشده از انگلیسی _قبلی باقی میمانند، بنابراین کاربران غیرانگلیسی به خواندن نسخهای با اعتماد به نفس و اکنون اشتباه ادامه میدهند.

این به صورت واقعی ارسال شد. `oauthModal.googleOAuthWarning` هنگامی که کمک کننده ورود به سیستم Antigravity فرود آمد بازنویسی شد (#5203).** 39 از 43 منطقه** متنی را نگه داشت و به اپراتورها میگفت که " URL کامل را کپی کرده و آن را در زیر بچسبانند" — جریانی که نمیتواند برای آن ارائهدهنده کامل شود. تا زمان #8463 مورد توجه قرار نگرفت زیرا:

- `sync-ui-keys` فقط کلیدهایی را که هستند پر می کند** غایب** ، هرگز آنهایی که نیستند** کهنه** ;
- `check-ui-keys-coverage` کلید _presence_ را می شمارد، بنابراین یک ترجمه کهنه به عنوان پوشش داده می شود.
- `check-translation-drift` tracks the `docs/i18n/<locale>/**.md` documentation mirrors — it never reads `src/i18n/messages/*.json`. It runs in job `docs-sync-strict`: advisory on PRs, strict on push and nightly; the translation wave refreshes the mirrors, not the feature PR.

**آگاه از تفاوت، نه با پشتوانه پایه.** `en.json` در پایه ادغام با درخت کار مقایسه می کند. برای هر کلیدی که مقدار انگلیسی آن تغییر کرده است، هر محلی که هنوز ترجمه دست نخورده آن را نگه دارد، قدیمی است. این عمدا** بدهی های قبلی را مسدود می کند** — a diff نمی تواند آشکار کند که یک ترجمه قدیمی از کدام انگلیسی قدیمی آمده است، بنابراین دروازه فقط آنچه را که تغییر فعلی لمس می کند قضاوت می کند. جایگزین (خط پایه هش به ازای هر کلید) یک فایل تولید شده ~ 600 KB هزینه خواهد داشت، که 3 × بزرگترین خط پایه موجود است که در هر i18n PR ایجاد می شود.

دو راه برای ارضای آن:

1. به روز رسانی ترجمه های تحت تاثیر، یا
2. آنها را در زمان اجرا روی `__MISSING__:<new english>` — تنظیم کنید سپس انگلیسی تصحیح شده (`src/i18n/request.ts::deepMergeFallback`، #7258) و صف های کلیدی را برای ترجمه ارائه می دهد.

اگر رشته است** معنی** تغییر کرد، ترجیح داد** تغییر نام کلید** : یک کلید جدید نمی تواند ترجمه قدیمی را به ارث ببرد. این همان الگوی #8463 است که استفاده می شود.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

زمانی که کاتالوگ پایه قابل خواندن نباشد، با `SKIP reason=base-unresolved` از 0 خارج می شود (کلون کم عمق بدون بازخوانی پایه)، بازتاب `check-openapi-breaking`. فقط حالت انتشار: یک ویژگی PR انگلیسی را بازنویسی می کند و در آنجا متوقف می شود. تازه سازی انتشار، ترجمه هایی را که پشت سر گذاشته است نشان می دهد (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`، همان `findStaleTranslations`).

### شغل: `i18n`

ماتریس اعتبار سنجی کامل i18n (یک کار در هر منطقه). کل کار مشاوره ای است

| اسکریپت                         | اعتبار سنجی می کند          | مسدود کردن                                          |
| ------------------------------- | --------------------------- | --------------------------------------------------- |
| `validate_translation.py quick` | کامل بودن ترجمه در هر منطقه | **مشاوره ای** (`continue-on-error: true` در کل کار) |

### شغل: `pr-test-policy`

فقط با درخواست های کششی اجرا می شود.

| اسکریپت                | اعتبار سنجی می کند                                                                                                                 | مسدود کردن |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs که کد تولید را در `src/`، `open-sse/`، `electron/`، یا `bin/` تغییر میدهد باید شامل تستها یا بهروزرسانی باشد (Hard Rule #8)    | بله        |
| `check:test-masking`   | فایلهای آزمایشی تغییر یافته تعداد خالص ادعاها را کاهش نمیدهند یا توتولوژیهای `assert.ok(true)` را اضافه نمیکنند                    | بله        |
| `check:pr-evidence`    | بدن PR شواهد test/VPS را برای این تغییر ذکر میکند (قاعده سخت #18 با برداشتن PR نثر — شکننده مکانیزه میکند، به Backlog مراجعه کنید) | بله        |

### شغل: `test-vitest`

دنبال `build` می دود . بلوک ها در صورت شکست ادغام می شوند.

| سوئیت            | اعتبار سنجی می کند                                  | مسدود کردن                                                                                                               |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | سرور MCP (110 ابزار)، autoCombo، کش — vitest runner | بله                                                                                                                      |
| `test:vitest:ui` | کامپوننت UI رانر — vitest را تست می کند             | **مسدود کردن** خرابی های از قبل موجود — به صراحت در `vitest.config.ts` مستثنی شده اند. شکست های جدید کار را شکست می دهند |

### گردش کار شبانه (برنامه ریزی شده، مشاوره ای)

اینها بر اساس برنامه cron (و `workflow_dispatch`) اجرا می شوند، هرگز روی PRs. همه مشاوره ای هستند

| گردش کار               | اعتبار سنجی می کند                                                                                                                              | مسدود کردن    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | بررسی سریع تستهای دارایی با تعداد اجرای بالا + دانه تصادفی                                                                                      | **مشاوره ای** |
| `nightly-resilience`   | دروازه رشد پشته، گسل آشوب-تزریق، k6 load/soak                                                                                                   | **مشاوره ای** |
| `nightly-llm-security` | محافظ تزریق promptfoo (حالت بلوک) کاوشگرهای + garak (بدون راز ارائه دهنده حذف شد)                                                               | **مشاوره ای** |
| `nightly-schemathesis` | فازبندی قرارداد OpenAPI (طرحواره) در برابر یک OmniRoute زنده با استفاده از نقض مشخصات سطوح `docs/openapi.yaml` — / 500s کنترل نشده (Fase 8 B.4) | **مشاوره ای** |
| `nightly-mutation`     | امتیاز تست جهش استرایکر بر روی خط واحد سریع — جهش یافته های بازمانده سطح ادعاهای ضعیف                                                           | **مشاوره ای** |
| `nightly-compat`       | ماتریس سازگاری موتور گره در محدوده های پشتیبانی شده `engines.node`                                                                              | **مشاوره ای** |

خطوط پایه عملکرد (هپ، TTFB، زمان ساخت) ثبت می شوند، نه دروازه ای: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) را ببینید.

---

## فاز سرعت (30/08/2026 → v4.0 LTS): هر خط پایه 20٪ شل می شود

تصمیم مالک (30-08-2026): تا زمانی که نسخه 4.0 مدولار شود، سرعت حمل و نقل بیشتر از حفظ خط بدهی مهم است. هر** عددی** خط پایه جغجغه در یک پاس قابل بازرسی 20٪ شل شد و فاز در `config/quality/quality-baseline.json` اعلام می شود:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| چه چیزی تغییر کرد                                                                                                                                                                      | کجا                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — کمتر بهتر است × 1.2، درصدهای بیشتر بهتر ÷ 1.2 را میشمارد (طبقه پوشش 60 حفظ میشود، `eslintErrors` 0 باقی میماند، `eslintWarnings` 0 → 20٪ از تعداد دفعات منجمد شده) | `quality-baseline.json` ( یادداشت `_relax_velocity_2026_08_30` هر قبل از → بعد لیست میشود)             |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, هر `frozen[*]` / `testFrozen[*]` line cap × 1.2                                                                                                                      | `file-size-baseline.json`                                                                              |
| در هر فایل / کد TS × 1.2 را میشمارد                                                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` نصیحت می شود در حالی که `_policy.requireTighten === false`                                                                                                         | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| مکث های شبانه `bank-ratchet-shrinks` (کوچک اندازه گیری شده را جمع می کند و فضای سر را باز می کند)                                                                                      | `.github/workflows/nightly-release-green.yml`                                                          |

لیست های مجاز (`eslint-suppressions.json`، `test-masking-allowlist.json`، `test-discovery-baseline.json`، …) هستند** نه** بودجه و مورد توجه قرار نگرفت. گیتهای سیاست Pass/fail (اسرار، قوانین SQL ، قرارداد docs/env ، برابری i18n، تستهای واحد) بدون تغییر هستند — تست قرمز همچنان یک تست قرمز است.

**ابزار سازی**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — آرامش یک شات (`scripts/quality/relax-baselines.mjs`); از اجرای دوبار با یک نت خودداری می کند.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — هر گیت عددی را به روش CI اندازهگیری میکند و فضای سر باقی مانده در هر گیت (`scripts/quality/baseline-headroom.mjs`) را چاپ میکند. کار شبانه `baseline-headroom` جدول را در خلاصه اجرای گردش کار منتشر می کند و گزارش JSON/Markdown خود را به صورت `baseline-headroom-<run_id>` آپلود می کند که به مدت 90 روز نگهداری می شود. ردیفهای اخطار و بحرانی گیتها را در 10 درصد سقف خود یا از قبل بالای آن شناسایی میکنند. این گزارش ها را به عنوان هشدار اولیه برای بودجه های در حال مصرف بررسی کنید. یادداشت های `_rebaseline_*` دروازه متخلف را بازرسی کنید. کار دیگر مشکل دائمی ایجاد یا به روز نمی کند. #12149 تاریخچه گزارش قبلی را حفظ می کند.

**حالت کد جدید (Clean-as-You-Code) — از 30-08-2026، فقط مسیر سریع PR**

در وقایع `pull_request` `quality.yml` به `--base-ref <PR base SHA>` `check:file-size` `check:complexity-ratchets` و `check:dead-code` می گذرد. برای `check:complexity-ratchets` و `check:dead-code` دروازه HEAD با merge-base مقایسه میکند** محدود به فایل هایی است که PR لمس کرده است** (`scripts/check/newCodeMode.mjs`: پایه ادغام در یک `git worktree` دور ریختنی تحقق می یابد، ESLint/knip در آنجا اجرا می شود و در HEAD، تعداد هر فایل متفاوت است):

- **مسدود کردن** — the PR نقض cyclomatic/cognitive یا صادرات مرده را در فایلهایی که تغییر داده اضافه کرده است (`complexityNewCode=`، `cognitiveComplexityNewCode=`، `deadExportsNewCode=` در گزارش).
- **مشاوره ای** — کل جهانی در مقابل خط پایه منجمد. رانش ارثی هرگز PR بی گناه را قرمز نمی کند ; رانش در آشتی رهاسازی مجدداً منجمد می شود و توسط کار اتاق زیر نظر گرفته می شود.

`check:file-size` از ref پایه بر اساس شرایط خاص خود استفاده می کند (`scripts/check/check-file-size.mjs`، #8522): هر منبع و فایل آزمایشی را در درخت بررسی می کند، تعداد خطوط هر یک را در پایه PR با `git show` می خواند، و فایل را تنها زمانی که از سقف بزرگتر خط پایه خود (`frozen` / `testFrozen`، یا `cap` / `testCap` ) و فایلی خارج از اندازه پایه آن بزرگتر شود، ناموفق می شود. بنابراین، فایلی که قبلاً روی پایه قرار گرفته است، هرگز PR بی گناه را قرمز نمی کند.

`check:boundary:ratchet` همان قاعده را برای عدد واحد خود (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`) اعمال میکند: در رویدادهای PR ، هم دروازههای سریع `quality.yml` و هم کار lint `ci.yml` از SHA پایه PR عبور میکنند، تعهد پایه از صادرات `git archive` اندازهگیری میشود، و PR تنها زمانی از کار میافتد که تعداد لبه `open-sse → src` آن از بزرگتر `metrics.boundaryOpenSseToSrc` و تعداد روی پایه بیشتر شود. رانش پایه بالای سقف گزارش شده است (`base drift herdado`) اما هرگز PR بی گناه را قرمز نمی کند . فشار → اصلی سقف مطلق را نگه می دارد و یک SHA پایه غیرقابل حل با یک اخطار به آن باز می گردد.

یک کاندید omni-queue (فشار به `omni-queue/**`، به [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) مراجعه کنید) همان رفتار را با درخواست کشش دریافت میکند: هر دو گردش کار از پایه نامزد (`needs.changes.outputs.candidateBase`) به عنوان `--base-ref` عبور میکنند، و `check:ts7-diagnostics-ratchet` نیز در مقابل آن اجرا میشود. برای دو گیت کد جدید، مبنای مقایسه این است که خود SHA ، نه اولین والد ادغام بالا، بنابراین هر درخواست کششی دسته قضاوت می شود.

`workflow_dispatch` اجرا میشود، جارو کردن سبز آزاد و کار فضای سر شبانه هیچ پایه PR ندارند و مقایسه مطلق (جهانی) را حفظ میکنند. پوشش، تکثیر و پوشش نوع در حال حاضر جهانی باقی میماند (ابزارهای آنها تفاوت در هر فایل را ارزان تولید نمیکنند) — کاندیدای درمان مشابه هستند.

**بستن فاز در نسخه 4.0 (LTS = محکم تر از قبل، نه "بازگشت به حالت عادی")**

1. در نکته `release/v4.0.0` خالص: `npm run quality:headroom --json` برای ثبت، سپس `npm run quality:ratchet -- --update`، `check:file-size --update`، `check:complexity-ratchets --update`، `check:dead-code --update`، `--update` — هر دروازه تایپ چک هر خط پایه به مقدار اندازهگیری شده کاهش مییابد.
2. `_policy` از `quality-baseline.json` حذف کنید ( `--require-tighten` مجدداً مسلح کنید و بانکداری شبانه)، `THRESHOLD = 36` (یا بالاتر) را در `check-openapi-coverage.mjs` بازیابی کنید.
3. از جایی که ماژولارسازی نتیجه داد فراتر از اندازه گیری شده سفت شوید: اندازه فایل `cap` به 1000 (یا 800)، طبقات پوشش + 5، صادرات مرده 0 برای بسته های مدولار شده.

## خط پایه جغجغه دار (`quality-baseline.json`)

موتور جغجغه ای (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` می خواند و آن را با `quality-metrics.json` تازه جمع آوری شده مقایسه می کند. هر معیاری که فراتر از اپسیلون خود پسرفت کند، در ساخت شکست می خورد.

معیارهای ردیابی کنونی:

| متریک                 | جهت    | معنی                                 |
| --------------------- | ------ | ------------------------------------ |
| `eslintWarnings`      | `down` | تعداد هشدار ESLint نباید افزایش یابد |
| `coverage.statements` | `up`   | پوشش بیانیه نباید کاهش یابد          |
| `coverage.lines`      | `up`   | پوشش خط نباید سقوط کند               |
| `coverage.functions`  | `up`   | پوشش عملکرد نباید سقوط کند           |
| `coverage.branches`   | `up`   | پوشش شعبه نباید کاهش یابد            |

برای به روز رسانی خط پایه پس از یک بهبود واقعی:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

پرچم `--update` مقادیر اندازه گیری شده فعلی را در `quality-baseline.json` می نویسد. بانکداری یک بهبود کار release/nightly است، نه یک ویژگی PR: `--require-tighten` (فاز 6A.5) تنها در حالت انتشار (فشار، زمانبندی، انتشار PR، اجراهای محلی) یک بهبود غیربانکی را با شکست مواجه میکند. در یک ویژگی PR (حالت دروازه `pr` ) بهبود را به عنوان اطلاعات چاپ می کند و پاس می دهد. یک رگرسیون در هر دو حالت شکست می خورد. در طول مرحله سرعت در همه جا توصیه می شود (`_policy.requireTighten: false`). [فایل های تولید شده و خطوط پایه مشتق شده را](#generated-files-and-derived-baselines-written-at-release) ببینید.

### ضامن دار CodeQL : آهنگ تازه و ماشه دستی

`check:codeql-ratchet` می خواند** وضعیت مخزن، بر اساس برنامه زمانبندی — نه به ازای PR به روز شده است.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` گزارش `state: configured`، `schedule: weekly`: اسکن تنظیم پیش فرض GitHub، نه تجزیه و تحلیل هر فشار. نتیجه: پس از یک PR که هشدار FIXES ادغام شد، جغجغه به خواندن تعداد قدیمی و بالاتر ادامه میدهد تا زمانی که اسکن برنامهریزیشده بعدی — اجرا شود، بنابراین یک رگرسیون در هر PR باز، از جمله پیگیریهای خود PR ثابت، گزارش میکند تا زمانی که اسکن به پایان برسد.

**بازخوانی دستی** : `gh workflow run codeql.yml --ref release/vX.Y.Z` تجزیه و تحلیل را دوباره اجرا می کند و هشدارها را در عرض چند دقیقه بازنشر می کند. ابتدا `.github/workflows/codeql.yml` بخوانید — هدر آن توضیح میدهد که `workflow_dispatch` -only است** زیرا با "تنظیم پیش فرض" GitHub در تضاد است.** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). بازیابی تریگرهای `push`/`pull_request`/ `schedule` به یک نیاز دارد** ابتدا اقدام مالک** : تنظیمات → کد امنیتی → CodeQL: پیش فرض → پیشرفته. یک تریگر `schedule:` را بدون آن سوئیچ — اضافه نکنید، فقط اجرای ناموفق ایجاد می کند.

**پس از کاهش تعداد، خط پایه را سفت کنید** — `node scripts/check/check-codeql-ratchet.mjs --update` شمارش اندازهگیریشده جدید را به `quality-baseline.json` → `metrics.codeqlAlerts.value` مینویسد، بنابراین جغجغه بیصدا اجازه بازگشت به سقف قدیمی را نمیدهد. مثال کار شده (2026-09-02/03): PR #12502 ثابت 7 هشدار واقعی (13 → 6 اندازه گیری باز). PR #12530 خط پایه منجمد 11 → 6 را سفت کرد تا مطابقت داشته باشد. سپس 6 باقیمانده با توجیه هر هشدار تا 0 باز کنار گذاشته شدند.

**اخراج ها تماس اپراتور است (Hard Rule #14)** — هرگز هشدار CodeQL را بدون ثبت توجیه فنی در نظر اخراج رد نمیکند: `won't fix` برای الزامات پروتکل بالادست، `used in tests` برای یک دستگاه آزمایشی، `false positive` برای ضدعفونیکننده CodeQL نمیتواند ببیند (سابقه: `docs/security/ERROR_SANITIZATION.md`).

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

## فایل های تولید شده و خطوط پایه مشتق شده (نوشته شده در زمان انتشار)

Plan 2026-11-13 ("اعداد و متون مشتق شده فقط در زمان انتشار حل می شوند"): یک ویژگی PR تغییر می کند** منبع** — `src/shared/constants/providers.ts`، `docs/openapi.yaml`، کاتالوگ مهارت، کاتالوگ سطح آزاد، مشخصات جدید e2e. فایلهای محاسبهشده از آن منبع را بازسازی نمیکند، و بهبود اندازهگیریشده را در خط مبنا ذخیره نمیکند. آن فایلها یک بار بازنویسی میشوند، با انتشار refresh (`release:refresh-derived`) یا بهروزرسانی شبانه PR. قبل از این، هر خواهر و برادر PR نسخه بازسازی شده خود را حمل می کرد و با ادغام بعدی در تضاد بود (13/11/2026: 30 از 321 بازنویسی PRs بازنویسی `PROVIDER_REFERENCE.md`, 26-28 بازنویسی نمودارهای README ).

**نگهبان.** `check:pr-derived-paths` (job `pr-test-policy`) ویژگی PR را که فایل یک خانواده را در `config/quality/derived-paths/` لمس میکند، از بین میبرد:

| خانواده     | فایل ها                                                                                                                                                                    | بازنویسی شده توسط                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; دوازده تولید README SVGs; `skills/*/references/**`; فایل های `SKILL.md` که بلوک سفارشی ندارند | `release:refresh-derived` (حقایق)، `gen:provider-reference`، `docs:readme-diagrams`، `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                          | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

نویسندگان (`release/v*`، `chore/derived-*`، و `chore/bank-ratchet-*` برای خطوط پایه) مستثنی هستند. همچنین یک PR است که فقط یک خانواده به اضافه همراهانش را تغییر میدهد (برای `generated`: اسکریپتهای مولد، تستهای آنها، ورودیهای مهارت عامل — `src/shared/constants/agentSkills.ts`، اسناد `skills/**` دستنویس، `docs/openapi.yaml` — و `changelog.d/**`)، بهعنوان مثال، طرحبندی قهرمان با تغییر طرحبندی قهرمان با آن تغییر میکند که فایلهای SVG بازسازیشده آن، فایلهای `SKILL.md` را ثابت میکند. یک `SKILL.md` با بلوک `<!-- skill:custom-start -->` دستنویس در خانواده نیست: بلوک سفارشی آن در کنار یک ویژگی قابل ویرایش میماند.

پاکسازی یتیم نیز توسط خانوادهها قضاوت نمیشود: یک PR ممکن است `docs/i18n/<locale>/<doc>` حذف کند زمانی که پایه ادغام آن آینه را داشت و `<doc>` دیگر در سر PR وجود ندارد، و ممکن است `.i18n-state.json` فقط برای حذف چنین اسنادی از `sources` ویرایش کند. نگهبان آن فایل ها را تحت `orphan-cleanup` فهرست می کند. حذف آینه سندی که هنوز وجود دارد یک تخلف باقی میماند: هیچ خط لوله دیگری در این حالت وجود ندارد، و آینههای `llm.txt` و `CHANGELOG.md` نویسندههای خود را دارند.

**چک ها، در هر حالت دروازه** (`scripts/check/lib/gateMode.mjs`؛ یاور `scripts/check/lib/derivedArtifactScope.mjs`):

| بررسی کنید                                                                           | `release` (فشار، زمانبندی، انتشار PR، محلی)                    | `pr` (ویژگی PR، دسته صف)                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                            | هر مهارت باید برابر با خروجی ژنراتور باشد                      | فقط مهارت هایی که متن تولید شده (خارج از بلوک سفارشی) یا `references/` PR آنها را ویرایش می کند. در غیر این صورت `SKIP reason=pr-mode`                                                                         |
| `check:generated-artifacts` (زمان بندی README SVGs + e2e؛ نیاز به تاریخچه کامل دارد) | هر SVG برابر با مولد آن است. هر مشخصات یک ورودی زمان بندی دارد | فقط مصنوعاتی که PR ویرایش می کند. بقیه `SKIP reason=pr-mode`; بدون پایه تفاوت → هر مصنوع مورد قضاوت (شکست-بسته)                                                                                                |
| تستهای مقایسه بایت README SVG (`tests/unit/docs/readme-*-svg.test.ts`)               | هر SVG                                                         | فقط یک SVG که PR ویرایش می کند، زمانی که پایه حل شود. تسویه حساب PR کم عمق `test-unit` هیچ پایه ای ندارد، بنابراین در آنجا آزمون با `SKIP reason=base-unresolved` و `check:generated-artifacts` مقایسه نمی شود |
| کامل بودن زمانبندی e2e (`tests/unit/balance-e2e-shards.test.ts`)                     | هر مشخصات یک ورودی دارد                                        | همان قانون تست SVG (مشخصات جدید با وزن متوسط اجرا می شود)                                                                                                                                                      |
| `check-quality-ratchet.mjs --require-tighten`                                        | بهبود غیر بانکی با شکست مواجه می شود (مگر اینکه `_policy`)     | بهبود گزارش شده، هرگز شکست. یک رگرسیون هنوز شکست می خورد                                                                                                                                                       |

حالت انتشار، احکام، کدهای خروج و پیامهایی را که این چکها قبل از تقسیم داشتند، حفظ میکند. حداکثر یک خط اضافه می شود و حالت حل شده (`[agent-skills-sync] mode=release (auto: local run)`) را نامگذاری می کند. تستها از گزینه `{ skip: releaseOnlyUnlessTouched(...) }` node:test عبور میکنند، که `check:test-masking` آن را در یک بلوک فقط گزارش فهرست میکند (نه `.skip(` است و نه `{ skip: true }`، بنابراین به عنوان یک پرش سخت حساب نمیشود). `check:generated-artifacts` در جایی اجرا میشود که پایه قابل حل است: job `lint` (`fetch-depth: 0`)، درست بعد از `check:agent-skills-sync`. به صورت محلی، `npm run check:generated-artifacts -- --mode=pr` نشان می دهد که آن مرحله چه چیزی را در PR قضاوت می کند. بررسی متقاطع مجموع ارائهدهنده `check:docs-counts` ("کل مرجع ارائه دهنده (doc در مقابل ماژولهای زنده)") بخشی از گیت شمارش است و از حالتهای خود دروازه پیروی میکند.

نه در یک خانواده، عمداً: فایلهای خطمشی تصمیمگیری شده توسط افراد (`gate-manifest.json`، لیستهای مجاز، `admission-policy.json`، `provider-assets-provenance.jsonl`، `model-lifecycle.json`) و سقفها، یک ویژگی PR ممکن است مجبور به ویرایش همراه با کد باشد (ورودیهای متریک `quality-baseline.json` ، خطوط مبنا typecheck/file-size/complexity ، `eslint-suppressions.json` — که توسط اجرای ESLint قبل از PR در صورت رفع یک نقض ثابت شده است). `src/i18n/routeNamespaces.generated.json` نیز تولید میشود اما در ویژگی PRs باقی میماند: برنامه آن را در زمان اجرا وارد میکند، بنابراین نمیتواند منتظر بهروزرسانی بماند.

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

## خط مشی لیست مجاز

هر دروازهای که نمیتواند در مورد نقضهای قبلی شکست بخورد، از یک لیست مجاز ثابت استفاده میکند (مثلا `KNOWN_STALE_DOC_REFS`، `KNOWN_MISSING`، `KNOWN_RAW_SQL`). سیاست این است:

**رفع علت اصلی؛ فقط زمانی از لیست مجاز استفاده کنید که نقض از قبل وجود داشته باشد و در همان PR قابل رفع نباشد.**

هنگام افزودن ورودی به لیست مجاز:

1. یک نظر با توجیه وارد کنید.
2. به موضوع ردیابی اشاره کنید (به عنوان مثال، `// #3498 — Phase 2 feature, not yet implemented`).
3. حذف ورودی در همان PR که نقض را برطرف میکند — ورودی قدیمی که دیگر نقض فعال را سرکوب نمیکند، خود یک نقص است (6A.3 stale-enforcement پس از اجرا، دروازه ورودی لیست مجاز یتیم را با شکست مواجه میکند).

انجام دهید** نه** ورودی های لیست مجاز را اضافه کنید تا تست ها سریعتر بگذرد. یک دروازه سبز با لیست مجاز در حال رشد یک حس نادرست از کیفیت است.

### هنگامی که یک دروازه در PR شما شکست

1. **خروجی گیت را با دقت بخوانید** — دقیقاً به شما می گوید که کدام فایل یا نماد قانون را نقض کرده است.
2. **تخلف را رفع کنید** اکثر گیتهای — ، بررسیهای قطعی سیستم فایل هستند که به محض درست شدن کد انجام میشوند.
3. **اگر تخلف از قبل وجود داشته باشد** (یعنی شما آن را معرفی نکردید اما دروازه اکنون آن را پوشش می دهد): یک ورودی لیست مجاز با یک نظر توجیهی و یک مشکل ردیابی اضافه کنید.
4. **اگر دروازه جغجغه ای باشد** (پوشش، هشدارهای ESLint ، تکراری، پیچیدگی): تغییر شما معیار را بدتر کرد. مشکل اساسی را برطرف کنید، یا (به ندرت) `npm run quality:ratchet -- --update` را اجرا کنید اگر تغییر عمدی است و کاهش متریک — قابل قبول است، اما دلیل آن را در توضیحات PR مستند کنید.
5. **دروازه های مشاوره** (`continue-on-error: true`) — اطلاعاتی هستند که ادغام را مسدود نمی کنند اما در خلاصه CI ظاهر می شوند. به هر حال آنها را اصلاح کنید.

---

## افزودن یک دروازهٔ جدید

1. `scripts/check/check-<name>.mjs` (یا `.ts`) را ایجاد کنید. دروازههای خطمشی با 0/1 خارج میشوند.
   دروازههای ضامندار از طریق `collect-metrics.mjs` یک معیار را در `quality-metrics.json` منتشر میکنند.
2. `"check:<name>": "node scripts/check/check-<name>.mjs"` را به `package.json` اضافه کنید.
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

## بک لاگ منطقی سازی (بررسی ROI — Fase 9 Onda 3)

این موجودی با `ci.yml` در 2026-06-17 تطبیق شد (نسخه قبلی `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`) را حذف کرده است. بررسی ROI مجموعه آشتیشده، نامزدهای منطقیسازی زیر را شناسایی کرد.** ادغام ها تغییرات CI مکانیکی هستند. flips/drops تصمیمات سیاستی هستند که برای اپراتور محفوظ است.** هیچ مورد زیر هنوز اعمال نشده است.

**همچنین بدون سند در بالا** (مشاوره، سیگنال کم): کار `docs-lint` (markdownlint + Vale، کل کار `continue-on-error`) و گردش کار اسکنر مستقل `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` به `quality-baseline.json` است اما به یک ضامن دار مسدود کننده در `ci.yml` — سیم کشی نشده است. متریک در حال حاضر یتیم است.

### ادغام / حذف (مکانیکی، خطر کمتر)

هر نامزد در تاریخ 17/06/2026 در برابر وضعیت دروازههای زنده تأیید شد (اعتماد کنید اما تأیید کنید). چندین ادغام "بدیهی" برای پنهان کردن بدهی ها مشخص شد** نه** قطره های تمیز

- **`check:docs-sync` دو بار اجرا می شود** — مستقل در کار `lint` و دوباره داخل `check:docs-all` (`docs-sync-strict`) و قلاب پیش متعهد هاسکی. ✅**DONE** احضار `lint` مستقل — حذف شد.
- **اسکن CVE** — ❌**NOT یک ادغام تمیز.** `audit:deps` توصیه های مهم و ممیزی های ناقص را در تمام پنج فایل قفل مسدود می کند، در حالی که توصیه های بالا را به عنوان هشدار تحت خط مشی فعلی گزارش می دهد. `check:vuln-ratchet` (osv) فقط در یک _regression_ در مقابل خط پایه بررسی شده با شکست مواجه می شود و در صورت لزوم اندازه گیری های از دست رفته را رد می کند. معانی مختلف — حذف `audit:deps` دروازه بحرانی مطلق و رسیدهای حسابرسی بسته مستقل را از دست می دهد. هر دو را نگه دارید.
- **تشخیص چرخه** — ✅**DONE** (#15159 G-01/G-02). متن قدیمی در اینجا `check:cycles` "دروازه سبز، سرپرستی" نامید و مسدود نگه داشتن آن را توجیه کرد زیرا `check:circular-deps` (dpdm) 91 چرخه را گزارش کرد. آن سبز یک بود** سبز کاذب** : `check:cycles` 5 زیر شاخه (450 فایل) را اسکن کرد، فقط `import|export … from` ثابت را مطابقت داد، و هر مشخص کننده `@/` و `@omniroute/open-sse/` را حذف کرد، بنابراین نمیتوانست چرخههای نام مستعار + وارداتی پویا را که بر مخزن غالب بودند، ببیند. رفع شد: گیت اکنون `src` + `open-sse` (5023 فایل) را راه میاندازد، مشخصکنندهها را از TypeScript AST جمعآوری میکند (بنابراین `import("…")` شمارش میشود و `typeof import("…")` موقعیت تایپ نمیشود)، و tsconfig `paths` را حل میکند. پیدا می کند** 14** چرخه ها، نه 0. از آنجا که 14 چرخه از قبل موجود را نمی توان در یک دروازه PR ثابت کرد، `check:cycles` اکنون یک** جغجغه دار** (`--ratchet`, سقف `metrics.cycles.value = 14` در `quality-baseline.json`, `direction: down`) — هر رگرسیونی را مسدود می کند و تعداد فقط می تواند کاهش یابد. CI `npm run check:cycles:ratchet` را اجرا می کند. سوختگی سواری با**A-01** . `check:circular-deps` (dpdm) به عنوان نظر دوم گسترده تر، توصیه می شود.
- **پیچیدگی** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): یک پیاده روی ESLint ، با ruleId شمارش می شود، بنابراین حداکثر خطوط چرخه ای + و خطوط پایه شناختی مستقل می مانند. فردی `check:complexity` / `check:cognitive-complexity` باقی می ماند برای `--update` محلی .
- **`/api` ضد توهم** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): یک موجودی FS از `src/app/api`، openapi-routes + docs-symbols هنوز به طور مستقل گزارش می دهند. افراد برای اجراهای محلی باقی می مانند.
- **`check:node-runtime` در 11 شغل فعال است** — ⚠️** ROI کم .** هر یک رانر جداگانه است و چک < 1s است. صرفه جویی کل ~ 10s، در مقابل از دست دادن یک نگهبان ارزان برای هر شغل. ارزش آن را ندارد
- **`typecheck:noimplicit:core` روی CI لینت** — ✅** از کار پرز حذف شده است** ( `continue-on-error` مشورتی بود); سطح مسدود کننده نوع `typecheck:core` + `check:type-coverage` است. اسکریپت محلی حفظ شد.

### تلنگر / تصمیم گیری (خط مشی اپراتور)

- `check:openapi-security-tiers` (مشاوره) — ❌**NOT کاملا قابل چرخش.** از 0 خارج می شود اما هشدار می دهد که چندین مسیر `traffic-inspector` تحت `LOCAL_ONLY_API_PREFIXES` فاقد حاشیه نویسی `x-loopback-only: true` هستند. اجرای آن مستلزم افزودن آن حاشیه نویسی به `openapi.yaml` است.
- `typecheck:noimplicit:core` (مشاوره) — تا حد زیادی توسط جغجغه مسدود کننده `check:type-coverage` درج می شود. به یک ضامن دار بچرخانید یا پاس دوم `tsc` اضافی را رها کنید.
- `test:vitest:ui` (اکنون** مسدود کردن** ) خرابیهای از قبل موجود — به صراحت در `vitest.config.ts` با نظرات ردیابی `// #8618` حذف میشوند. شکست های جدید کار را شکست می دهند.
- `check:secrets` (gitleaks، مسدود کردن جغجغه ثابت در 3 مثبت کاذب مستند شده) — مجاز 3 را برای رسیدن به 0 یا تنزل به توصیهای فهرست میکند. همپوشانی GitHub بومی راز اسکن + `check:public-creds`.
- `check:pr-evidence` (مسدود کننده، greps PR-body proses) — high false-positive risk; در صورت حذف، اجرای Hard Rule #18 را تضعیف می کند، بنابراین این یک فراخوان سیاست واقعی است.
- `semgrep` (مستقل مشورتی) — با CodeQL برای خانوادههای OWASP همپوشانی دارد. خط پایه آن را به یک جغجغه یا قطره سیم کشی کنید.

---

## مستندات مرتبط

- زنجیره تامین (منشا، SBOM، تروی، کارت امتیازی): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### دروازه برابری مجموعه کلید `check-key-completeness` —

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, شغل `i18n-ui-coverage`). مجموعه کلیدهای برگ هر `src/i18n/messages/<locale>.json` را با `en.json` مقایسه میکند و بدون توجه به اینکه چه زمانی کلید اضافه شده است، در هر برگ وجود ندارد یا اضافی شکست میخورد. متغیرهای `__MISSING__:` موجود به حساب میآیند (محتوای آنها مربوط به دروازه نسبت است). این مکمل مطلق دو دروازه diff-based/percentage است: `check-ui-keys-coverage` یک طبقه 80٪ در هر منطقه را اعمال می کند (43 کلید از ~ وجود ندارد 13000 هنوز 99.7٪ خوانده می شود) و `check-new-key-coverage` فقط کلیدهایی را که PR به `en.json` اضافه می کند قضاوت می کند. یک دسته محلی از `en.json` روزی که شاخه آن بریده می شود تولید می شود و برای روزها ترجمه می شود در حالی که پایه همچنان کلیدها را اضافه می کند. دسته PR خود هیچ کلیدی اضافه نمی کند، بنابراین هر دو خواهر و برادر هنگامی که دسته 1 (#13044) 43 کلید کوتاه در 9 منطقه و دسته 2 (#13660) 10 کلید در هشت (15/09/2026) فرود آمد، ساکت ماندند. رفع قرمزی با `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; یک برگ `extra` به این معنی است که منبع آن را رها کرده است — `sync-ui-keys` آن را رها می کند (`--prune-extra`، پیش فرض). `--warn` بدون شکست گزارش می دهد. `--catalog=cli` همان مقایسه را روی `bin/cli/locales` (`npm run i18n:check-keys:cli`) انجام می دهد. هر دو مرحله در شغل `i18n-ui-coverage` زندگی می کنند. بررسی مطلق فقط حالت انتشار است: یک ویژگی PR `SKIP reason=pr-mode` را میبیند و اصلاح در بازخوانی انتشار یا موج ترجمه اجرا میشود، هرگز در ویژگی PR. یک PR که کاتالوگ های محلی را تغییر می دهد، هر یک از آنها را بر اساس پایه ادغام ارزیابی می کند (به "دو حالت" زیر job `i18n-ui-coverage` مراجعه کنید).

#### دروازه i18n با کلید جدید `check-new-key-coverage` —

خواهر و برادر `check-ui-value-drift`. آن یک ارزش انگلیسی را می گیرد که بود** بازنویسی شده است** در حالی که ترجمه های آن به جا مانده بود. این یکی کلید انگلیسی را می گیرد که بود** اضافه شده است** در حالی که برخی از محلی ها هرگز آن را دریافت نکردند.

`check-ui-keys-coverage` نمیتواند این کلاس را ببیند: در هر منطقه یک درصد طبقه را اعمال میکند، و یازده کلید موجود از ~ 13000 پوشش را در 99.9 درصد نشان میدهد. درصدی برای هر زبان نمیتواند بیانگر «این ویژگی ترجمه نشده ارسال شده است» — یک ویژگی میتواند در محلی جدید بدون متن قرار بگیرد و هرگز عدد را جابهجا نکند.

حادثه ای که رمزگذاری می کند: فاز 3 بوم ارکستراسیون یازده کلید خود را در 42 منطقه ای که در آن زمان وجود داشت ترجمه کرد. ساعاتی بعد گروه زبان اتحادیه اروپا (#13044) مخزن را به 51 منطقه برد و 9 تازه وارد (`el`، `et`، `ga`، `hr`، `lt`، `lv`، `mt`، `sl`، `sr`) هرگز آنها را دریافت نکردند. `deepMergeFallback` انگلیسی را جایگزین کلید غایب میکند، بنابراین حالت خرابی به جای UI — واقعی، UI ترجمه نشده بود و با ساخت بیصدا.

مثل خواهر و برادرش است** تفاوت آگاه** ، انگلیسی را در پایه ادغام با درخت کار مقایسه می کند، بنابراین شکاف های از قبل موجود ثابت می مانند و دروازه برای روشن شدن نیازی به مهاجرت ندارد.

**یک نشانگر `__MISSING__:<english>` آن را برآورده نمی کند (از 17/09/2026).** قبلاً به تعویق انداختن مستند — بود که زمان اجرا به تصحیح — انگلیسی بازمیگردد تا زمانی که هشت ویژگی PRs در 16/09/2026 61 کلید اضافه کردند و نشانگر را به جای ترجمه در تمام 65 زبان نوشتند: این دروازه هر یک را میپذیرفت، هیچ چیزی PRs را مسدود نمیکرد، و مسدود کردن g-pt برای هر ترجمه %2 روی rat شکست خورد. > 2.5٪ + 0.5). اکنون یک نشانگر به عنوان ترجمه غایب ارزیابی می شود. حالت انتشار فقط از 13-11-2026: یک ویژگی PR `SKIP reason=pr-mode` را می بیند، و در آزادسازی PR (`BASE_REF=origin/main`) دروازه هر کلیدی را که چرخه اضافه شده قضاوت می کند. یک قرمز را در بازخوانی انتشار یا یک موج ترجمه با `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`، یا همه محلیها به موازات `npm run i18n:translate-new-keys` برطرف کنید (`scripts/i18n/translate-new-keys.sh`، جداشده-ایمن، از شروع بدون `OMNIROUTE_TRANSLATION_*` env خودداری میکند). کلیدی که باید انگلیسی بماند (نام product/engine/flag پین شده) به `scripts/i18n/untranslatable-keys.json` تعلق دارد و هرگز پشت یک نشانگر نیست. `vi` نشانگرها را کاملاً ممنوع می کند (`tests/unit/i18n-vi-completeness.test.ts`).

#### دروازه تست پارک شده `check-vitest-exclusions` —

یک فایل در لیست `vitest.config.ts` `exclude` آزمایشی است که اجرا نمیشود و برای هر کسی که درخت را میخواند پوششی به نظر میرسد. شصت و دو فایل پشت نظر `// #8618 — pre-existing failure; remove this exclusion when fixed` جمع شده است. شماره #8618 در 11/08/2026 بسته شد، در حالی که فهرستی که آن را ردیابی میکرد از 45 ورودی به 62 مورد افزایش یافت، که هر مورد جدید نظری را به ارث میبرد که به یک موضوع مرده اشاره میکرد. هنگامی که لیست در نهایت فایل به فایل (#13204) اندازه گیری شد،** 51 مورد از 62 مورد در برابر درخت فعلی بدون تغییر منبع تصویب شد** .

گیت مستلزم هر حذفی است که برای یک فایل واقعی حل میشود تا (الف) یک مشکل ردیابی را نامگذاری کند و (ب) در `config/quality/vitest-exclusions.json` با وضعیت اندازهگیریشده آن ظاهر شود، بنابراین اضافه کردن یک تفاوت قابل بازبینی در یک فایل اختصاصی به جای یک خط بیشتر در یک آرایه 60 ورودی است. عمداً تستهای حذف شده — که ~ 10 دقیقه هزینه دارد و به یک کار دورهای تعلق دارد، دوباره اجرا نمیکند. آخرین زمان اندازهگیری هر کدام را ثبت میکند.
