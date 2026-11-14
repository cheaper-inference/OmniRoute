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

گردشهای کاری CI و Quality Gates هر کدام یک حکم پایدار صادر میکنند: `Gate / CI` و `Gate / Quality`. خط مشی پذیرش نسخه شده آنها هر شغل بالادستی را به عنوان مورد نیاز یا مشاوره برمی شمارد. یک کار مورد نیاز قابل اجرا باید موفق شود: نتایج گمشده، لغو شده، نادیده گرفته شده، در انتظار و ناشناخته نمی تواند PASS ایجاد کند. یک طبقه بندی معتبر فقط برای اسناد یا فقط کاتالوگ می تواند یک خط کد را غیرقابل اجرا کند. یک پیش نویس PR نامزد پذیرفته نشده است. برچسب `hotfix` از شواهد چشم پوشی نمی کند.

هر دو جریان کاری PRs را به شاخههای main/release ، فشار به `main`، ارسال دستی و رویدادهای گروهبندی ادغام میکنند. فشار، اعزام و ادغام گروهی انتخاب کامل را اجرا کنید. فشار به `release/**` آنها را شروع نمی کند (18-10-2026): هر تغییر قبلاً ماتریس را روی PR خود اجرا می کرد و ترکیب ادغام شده وظیفه Release-Green است (`docs/ops/RUNNER_BOX.md` → Hosted lane). گروههای فورک و ادغام از دوندههای میزبانیشده برای کارهایی استفاده میکنند که در غیر این صورت دوندههای خود میزبان را انتخاب میکنند. ظرفیت میزبانی کافی باید قبل از عرضه تأیید شود.

یک PR معمولی انتخاب سریع را اجرا می کند. خطوط `full-code` و `full-code-e2e` خطمشی پذیرش (E2E، ادغام، مصنوع بسته، Electron smoke، Bun SQLite، اکوسیستم و مشتریان پروتکل) فقط روی پیشنویس صف Mergify یا در اجرای کامل: `gh workflow run ci.yml --ref <branch>` اجرا میشوند.

هر رسید JSON SHA چکشده، اجرای گردش کار و تلاش را مشخص میکند. CLI عدم تطابق checkout/event SHA را رد می کند. آزمایشهای گردش کار، عضویت خطمشی را به فهرست `needs` کار حکم متصل میکند، بنابراین یک خط جدید یا حذف شده نمیتواند بیصدا ناپدید شود. رسیدها گردش کار خود را پوشش می دهند، نه انتشار، استقرار، یا داخلی یک اسکنر مشاوره موجود. فعال کردن هر دو نام چک در قوانین شعبه یک تغییر اداری جداگانه است. افزودن این مشاغل به خودی خود از یک شاخه محافظت نمی کند.

### صف ادغام

برچسب `queue` یک PR را به صف Mergify ارسال می کند (`.mergify.yml`). Mergify یک پیش نویس PR را در یک شاخه `mergify/merge-queue/` باز می کند، CI انتخاب کامل را در آنجا اجرا می کند، و PR اصلی با عبور `Gate / CI`، `Gate / Quality` و `Merge integrity (changelog + generated skills)` ادغام می شود.

Mergify خلاصه صف خود را در توضیحات پیش نویس می نویسد و سایر برنامه ها نیز می توانند آن را ویرایش کنند. یک رویداد `pull_request` `edited` در چنین پیش نویسی گروه همزمانی خود را می گیرد (`-queue-edit-<run_id>`) بنابراین نمی تواند اجرای واقعی پیش نویس را لغو کند و از گیت و ماتریس می گذرد. فقط `Merge integrity` هنوز اجرا می شود. کار دروازه رد شده دارای یک نام چک متفاوت است، زیرا Mergify یک `Gate / CI` نادیده گرفته شده را به عنوان یک چک ناموفق می خواند و PR را حذف می کند.

پس از dequeue، فشار همیشه PR را درخواست نمی کند. نظر `@mergifyio queue` را در مورد آن.

### شواهد حفظ شده در کاهنده پذیرش

`scripts/quality/validate-release-acceptance.mjs` یک طرح عرضه شده و جلوه های آن را کاهش می دهد. مشخص نمی کند که این طرح خط لوله آزادسازی کامل را پوشش می دهد. گزارش های آن به صراحت `releaseAcceptance: false` را تنظیم می کند، حتی زمانی که آن طرح `VERIFIED` باشد. گردش کار `release-acceptance.yml` همچنان از وسایل سایه استفاده می کند، نه از رسیدهای ساخت، بسته، بوت یا تبلیغات واقعی.

CLI به `--evidence-root` برای تأیید شواهد حفظ شده نیاز دارد. فایل ها به صورت `<evidence-root>/<artifact_id>/<member>` حل می شوند و به صورت SHA-256 هش می شوند. یک رکورد PASS بدون مدرک، یک فایل گم شده یا تغییر یافته، یک مسیر ناامن یا یک پیوند نمادین مانع از تأیید می شود. فایل های از دست رفته معادل لاگ های خالی خالی نیستند. چکهای SHA/run/attempt موجود مستقل باقی میمانند: بایتهای تطبیق نمیتوانند یک رسید قدیمی را نجات دهند. یکپارچگی فایل دلیلی بر اصالت اجرا یا ارتقای مصنوع نیست.

### موجودی اسکن استاتیک

موجودی npm-نام مستعار نسخه شده و عضویت در اسکن استاتیکی در `config/quality/gate-manifest.json` زنده است. `npm run check:gate-manifest` برای اعتبارسنجی نام اسکریپت ها و دستورات دقیق در برابر `package.json` اجرا کنید. اضافهها، حذفها و جابجایی فرمانها هم در قلاب محلی و هم کارهای تغییر طبقهبندی در CI با شکست مواجه میشوند. نام مستعار یک کار گردش کار، نمونه ماتریسی یا مورد آزمایشی نیست: این تعداد نباید به عنوان قابل تعویض ارائه شود.

`npm run quality:scan -- --list` یا `npm run quality:scan:fast -- --list` برای بازرسی نام مستعار انتخاب شده بدون اجرای آنها استفاده کنید. رانر نقطه ورودی npm را فراخوانی می کند، بنابراین زمان اجرا آن (از جمله Bun در جایی که پیکربندی شده است) حفظ می شود. مانیفست نامهای مستعار را خارج از آن نمایهها بهصورت مجزا فراخوانی میکند و دستورات نگهداری در پروفایلهای اسکن فقط خواندنی ممنوع است.

این پروفایل ها فقط اسکن استاتیک را پوشش می دهند. آنها آزمایش های محصول، پوشش، بسته بندی، بررسی های خارجی یا پذیرش کامل یک نامزد را تأیید نمی کنند. پذیرش گردش کار از `config/quality/admission-policy.json` و `scripts/quality/admission-verdict.mjs` مرتبط استفاده می کند. نمایههای ناظر انتشار جداگانه باقی میمانند. چک ها و رسیدهای مربوطه خود را به طور مستقل بررسی کنید. دستورات استاتیک ناظر کامل در `config/quality/release-green-static-profile.json` اعلان شده است، از جمله `audit:deps`، انتخاب آزمون جهش و بررسی ترجمه. لودر دستورات npm را در برابر اعلانهای package.json و مدلسازی شده CI/Quality تأیید میکند. به جای اجرای توکن های پوسته به عنوان آرگومان، دریفت را رد می کند. خروجی SKIP/INCOMPLETE اسکنر مورد نیاز نمی تواند PASS ایجاد کند. نمایه استثناهای خارجی خود را ثبت میکند و جایگزین پوشش میزبان، ماتریسهای آزمایش، بسته یا شواهد استقرار نمیشود. فهرست نثر زیر یک مرجع است، نه دلیلی بر اینکه یک دروازه واقعاً اجرا شده است.

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

صادرات مجدد بشکه و واردات پویا فقط تشخیص قطعنامه است. آنها هرگز یک یافته مسدود کننده ایجاد نمی کنند. استثناهای بررسی شده در `config/quality/forgotten-sibling-allowlist.json` زندگی می کنند. هر ورودی باید نام تست مصرف کننده و داوطلب را ذکر کند، یک دلیل منطقی خاص ارائه دهد، و یک مسئله GitHub یا درخواست کشش را پیوند دهد. ورودی های نادرست بسته نشدند. استثناها نمی توانند آزمون داوطلب حذف شده یا تفاوتی را که `.skip`/`.todo` اضافه می کند سرکوب کند. تضعیف ادعا و سایر پوششها متعلق به دروازه `check:test-masking` است که به طور مستقل مسدود میشود.

### شغل: `lint`

اجرا بر روی هر PR به `main`. بلوک ها در صورت شکست ادغام می شوند.

| اسکریپت (`npm run ...`)           | اعتبار سنجی می کند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | مسدود کردن                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | نسخه Node.js در محدوده پشتیبانی شده است                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله                                       |
| `check:cycles`                    | واردات دایره ای در تمام `src/` + `open-sse/` (بر اساس AST، tsconfig `paths` حل شد). هر زمان که چرخه ای وجود داشته باشد، Bare از 1 خارج می شود (از زمان #15281 بسته شده است) و SCCs را لیست می کند. `check:cycles:ratchet` (آنچه CI اجرا میشود) وقتی تعداد از سقف `metrics.cycles` در `quality-baseline.json` — در حال حاضر 14، `direction: down` بیشتر شود بلوک میکند، بنابراین فقط میتواند سقوط کند (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله (زاغه دار)                            |
| `check:boundary`                  | جفت `open-sse → src` : وارد کردن فایل به فایل منحصر به فرد از موتور به برنامه (`scripts/quality/measure-boundary.mjs`؛ لیست لبه، بک لاگ اصلاح v4 core/module-split است). گزارش مشورتی بره = (همان `quality:boundary`). `check:boundary:ratchet` (آنچه CI اجرا میشود، همچنین در حلقه ضامن دار سریع دروازههای `quality.yml` ) وقتی تعداد از سقف `metrics.boundaryOpenSseToSrc` در `quality-baseline.json` — در 771 `direction: down` اندازهگیری شده بیشتر شود، بلوک میکند. `--update` فقط آن را پایین می آورد. نسبی پایه در PRs (`--base-ref`، در زیر ببینید)                                                                                                                                                                                                                                                                                                                                                             | بله (زاغه دار)                            |
| `check:route-validation:t06`      | طرحواره های Zod موجود در همه مسیرها (خط مشی سطح 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                       |
| `check:any-budget:t11`            | تعداد `@ts-expect-error // any` از بودجه تجاوز نمی کند (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | بله                                       |
| `check:provider-consistency`      | هر ارائه دهنده در `providers.ts` دارای یک ورودی منطبق در `providerRegistry.ts` است (و بالعکس، در لیست مجاز)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | بله                                       |
| `check:model-lifecycle`           | سه جدول مسیریابی که بهصورت دستی نگهداری میشوند، با عکس فوری چرخه حیات ثبتشده (#11503) سازگار هستند: `FITNESS_TABLE` (`taskFitness.ts`) هیچ شناسه بازنشستهای را که `REGISTRY` بتواند مسیریابی کند، به دست نمیآورد. هر هدف `BUILT_IN_ALIASES` در `REGISTRY` وجود دارد و در عکس فوری شناسه بازنشسته وجود ندارد. هر شناسه بازنشسته هنوز در `REGISTRY` ارسال می شود یا در `allowedRetiredInCatalog` فهرست می شود. و هیچ منبع یا هدف `DEFAULT_DEGRADATION_MAP` در آن عکس فوری بازنشسته به نظر نمی رسد. این ثابت نمی کند که یک مدل در حال حاضر توسط یک بالادست زنده ارائه می شود. — آفلاین با `config/quality/model-lifecycle.json` مقایسه میشود، با دست با `npm run quality:refresh-model-lifecycle` (شبکه؛ به CI سیمکشی نشده) تازهسازی میشود. `allowedRetiredInCatalog` یک جغجغه در حال سوختن است: فقط یک ورودی با مشکل ردیابی اضافه کنید.                                                                                   | بله                                       |
| `check:fetch-targets`             | هر `fetch("/api/...")` در `src/` سمت مشتری به یک `route.ts` واقعی تبدیل می شود                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | بله                                       |
| `check:deps`                      | همه `npm install` -able deps در هر `package.json` موجود در مخزن به `dependency-allowlist.json` هستند. بسته های جدید بدون پین یا slopsquatted پرچم گذاری شده اند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | بله                                       |
| `audit:deps`                      | ممیزی npm هر پنج فایل قفل مستقل (روت، Electron، پلاگین OpenCode v1/v2 و ارائه دهنده). بلوک توصیه های حیاتی؛ توصیه های بالا همچنان هشدارهای قابل مشاهده است. ممیزی Missing/failed INCOMPLETE و block هستند. هشها و گزارشهای قفل در هر دامنه حفظ میشوند.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | بله                                       |
| `check:lockfile`                  | یکپارچگی `package-lock.json` رجیستری — https، هش یکپارچگی، بدون لغو میزبان                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | بله                                       |
| `check:licenses`                  | لیست مجوز SPDX برای وابستگی های تولید                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                       |
| `check:tracked-artifacts`         | بدون ساخت مصنوعات / پیوندهای نمادین `node_modules` متعهد (همچنین در pre-commit هاسکی اجرا می شود؛ پیش از فشار عمدا — #6716 سبک است)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | بله                                       |
| `check:ai-attribution`            | هیچ تریلر AI/bot `Co-Authored-By` یا پاورقی نسل هوش مصنوعی در PR commits، عنوان یا بدنه — قانون سخت #16 `commit-msg` در حلقه `quality.yml` fast-gates برای PR→ `release/**` — بار رویداد را میخواند، no-op off PRs — و یک گام فقط PR در `ci.yml` PR lint → `main`; نویسندگان مشترک #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | هر حذف Vitest یک مشکل ردیابی را نامگذاری می کند و در `config/quality/vitest-exclusions.json` (#13204) ظاهر می شود.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                       |
| `check:file-size`                 | فایل های منبع (`.ts`/`.tsx` در `src/`, `open-sse/`, `electron/`, `bin/`) در `cap` و فایل های تست (`*.test.ts(x)`) در `testCap` باقی می مانند . فایل های منجمد شده در `file-size-baseline.json` (`frozen` / `testFrozen`) نباید از اندازه ثبت شده خود بیشتر شوند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | بله                                       |
| `check:error-helper`              | پاسخ های خطا در executors/handlers `buildErrorBody()` / `sanitizeErrorMessage()` استفاده می کنند (قانون سخت #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | بله                                       |
| `check:migration-numbering`       | فایل های مهاجرت SQL به ترتیب شماره گذاری می شوند، بدون شکاف یا تکراری                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                       |
| `check:public-creds`              | بدون OAuth `client_id`/`client_secret` یا کلیدهای وب Firebase در خارج از `publicCreds.ts` (قاعده سخت #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | بله                                       |
| `check:db-rules`                  | بدون SQL خام خارج از ماژول های `src/lib/db/`. بدون واردات بشکه از `localDb.ts` (قوانین سخت #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | بله                                       |
| `check:known-symbols`             | مجریان ارائهدهنده، استراتژیهای مسیریابی، و مترجمهای ثبتشده در جداول ارسال آنها با فایلهای موجود در دیسک — بدون نمادهای یتیم یا اعلامنشده مطابقت دارند.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | بله                                       |
| `check:route-guard-membership`    | هر مسیری که یک فرآیند فرزند ایجاد می کند توسط `isLocalOnlyPath()` طبقه بندی می شود (قوانین سخت #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله                                       |
| `check:test-discovery`            | هر فایل `*.test.ts` / `*.spec.ts` در مخزن حداقل توسط یک دونده آزمایشی جمعآوری میشود `test-discovery-baseline.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                       |
| `check:test-tla-order`            | هیچ فایل `node:test` زیر `tests/unit` آزمایشی را ثبت نمیکند، `await` سطح بالایی را وارد میکند، سپس موارد بیشتری را ثبت میکند (#18045؛ ضامن دار: `test-tla-order-allowlist.json` فقط میتواند کوچک شود)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                       |
| `check:agent-skills-sync`         | مصنوعات مهارتهای عامل تولید شده با کاتالوگ منبع خود مطابقت دارند (بدون جابجایی)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
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
| `quality:ratchet`            | هر متریک در `quality-baseline.json` پسرفت نکرده است (خط پایه ≤ هشدار ESLint ؛ خط مبنا ≥ پوشش)                                                                    | بله                     |
| `check:duplication`          | تکرار کد (jscpd@4) در `quality-baseline.json` از خط پایه تجاوز نمی کند                                                                                           | بله                     |
| `check:complexity`           | پیچیدگی سیکلوماتیک در سطح فایل از سقف تجاوز نمی کند (core ESLint `complexity` + `max-lines-per-function`)                                                        | بله                     |
| `check:cognitive-complexity` | پیچیدگی شناختی جغجغه (`eslint-plugin-sonarjs`) — جداگانه ESLint pass; CI هر دو را به عنوان یک مرحله `check:complexity-ratchets` ادغام شده اجرا می کند            | بله                     |
| `check:dead-code`            | صادرات / فایل های استفاده نشده ضامن دار (knip) در مقابل خط پایه پسرفت نمی کند                                                                                    | بله                     |
| `check:compression-budget`   | بودجه معیار تراکم — به ازای هر موتور، طبقات پس انداز نباید پسرفت کنند                                                                                            | بله                     |
| `check:type-coverage`        | جغجغه تایپ درصد (`type-coverage`) پسرفت نمی کند. تا حد زیادی `typecheck:noimplicit:core` را در بر می گیرد                                                        | بله                     |
| `check:codeql-ratchet`       | تعداد هشدارهای باز CodeQL پسرفت نمی کند (خوانش از طریق `gh api`؛ رد شدن برازنده بدون نشانه) آهنگ تازه سازی — و ماشه دستی: به "CodeQL ratchet" در زیر مراجعه کنید | بله                     |

### شغل: `quality-extended`

کل کار مشاوره است (`continue-on-error: true`). جغجغه های مبتنی بر npm به صورت واقعی اجرا می شوند. اسکنرهای خارجی از طریق `gh release download` نصب می شوند و زمانی که یک باینری هنوز وجود ندارد، خود رد می شوند (خروج 0).

| اسکریپت                  | اعتبار سنجی می کند                                                                                                                                                                                                  | مسدود کردن                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | بدون وابستگی دایره ای (dpdm)                                                                                                                                                                                        | **مشاوره ای**                               |
| `check:bundle-size`      | اندازه بسته از درپوش تجاوز نمی کند                                                                                                                                                                                  | **مشاوره ای**                               |
| `check:secrets`          | اسکن مخفی (gitleaks) — در صورت عدم وجود باینری انجام می شود                                                                                                                                                         | **مشاوره ای**                               |
| `check:vuln-ratchet`     | آسیبپذیریهای وابستگی (osv-scanner) در صورتی که اندازهگیری نشود `--ratchet` — بهعنوان INCOMPLETE شکست نمیخورد (خروج 2)                                                                                               | **مشاوره ای**                               |
| `check:workflows`        | لینت گردش کار (اکشن لینت + زیزمور); اسکنرهای missing/broken ، گزارشهای نامعتبر یا خط پایه جغجغهای گمشده بهعنوان INCOMPLETE ناموفق هستند. یافته های معتبر از خط مشی strict/advisory/ratchet انتخاب شده پیروی می کنند | اجرا لازم است؛ انسداد ضامن دار zizmor در CI |
| `check:openapi-breaking` | قرارداد عمومی API در برابر تعهدات رویداد پین شده (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); اندازه گیری مورد نیاز بسته نمی شود                                         | **مسدود کردن با --ratchet**                 |

### شغل: `docs-sync-strict`

اجرا بر روی هر PR به `main`. بلوک ها در صورت شکست ادغام می شوند.

| اسکریپت                        | اعتبار سنجی می کند                                                                                                                                    | مسدود کردن                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | متا گیت که 6 گیت فرعی زیر را به صورت متوالی اجرا می کند                                                                                               | بله                            |
| ↳ `check:docs-sync`            | قوام نسخه CHANGELOG / OpenAPI / llm.txt                                                                                                               | بله                            |
| ↳ `check:docs-counts`          | شمارش در نثر (تعداد ارائهدهنده، تعداد مهاجرت و غیره) در پنجره ضامن دار تعداد واقعی است.                                                               | بله                            |
| ↳ `check:env-doc-sync`         | هر env var در `.env.example` در یک جدول اسناد مستند شده است و بالعکس                                                                                  | بله                            |
| ↳ `check:deprecated-versions`  | هیچ رشته نسخه منسوخ شده در اسناد وجود ندارد                                                                                                           | بله                            |
| ↳ `check:doc-links`            | پیوندهای نشانه گذاری داخلی در اسناد به فایل های واقعی (فرم `[text]`/`(path)` )                                                                        | بله                            |
| ↳ `check:fabricated-docs`      | مسیرها، env vars، دستورات CLI ، نام قلاب و مسیرهای فایل ذکر شده در اسناد در پایگاه کد وجود دارند. دروازه سخت از طریق `--strict`; soft-fail بدون پرچم. | بله (از طریق `--strict` در CI) |
| `check:cli-i18n`               | رشته های دستور CLI در همه فایل های محلی i18n وجود دارد                                                                                                | بله                            |
| `check:openapi-coverage`       | مشخصات OpenAPI حداقل یک طبقه از مسیرهای واقعی را پوشش می دهد                                                                                          | بله                            |
| `check:openapi-security-tiers` | حاشیه نویسی های لایه امنیتی در `openapi.yaml` با طبقه بندی `routeGuard.ts` سازگار است                                                                 | **مشاوره ای**                  |
| `check:openapi-routes`         | هر مسیر در `openapi.yaml` به یک `route.ts` واقعی (ضد توهم) منتهی می شود.                                                                              | بله                            |
| `check:docs-symbols`           | هر مرجع `/api/...` در `docs/**/*.md` به یک `route.ts` واقعی (ضد توهم) حل می شود.                                                                      | بله                            |
| `i18n translation drift`       | کلیدهای ترجمه نشده در فایلهای محلی i18n فقط — هشدار میدهند                                                                                            | **مشاوره ای**                  |

دوازده README SVGs تحت `docs/diagrams/` تولید می شوند (`scripts/docs/gen-readme-<name>.mjs`؛ `npm run docs:readme-diagrams` همه آنها را بازسازی می کند). هر کدام یک تست واحد مقایسه بایتی دارند (`tests/unit/docs/readme-*-svg.test.ts`، job `test-unit`) که وقتی فایل متعهد قدیمی است، با شکست مواجه میشود، و `check:docs-counts` اعداد متعارف را از گرههای `<text>` خود — میخواند، به همین دلیل است که مرحله ترسیم، هر رشته مشخص شده در فایل را بهعنوان `<text>` نامرئی نگه میدارد. بررسی اعداد متعارف SVG فایل های فهرست شده در `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) را می خواند: `docs/diagrams/readme-hero.svg`، `free-tier-budget.svg`، `promise-pillars.svg`، `comparison-table.svg`، `cli-terminal.svg`، `tier-cascade.svg`، به علاوه `public/images/tier-flow-dark.svg` و `tier-flow-light.svg`. ادعاهای رایگان برای همیشه، کاتالوگ-ورود، استخر تکرارشونده و فاکتورهای امتیازدهی نیز `promise-pillars.svg`، `free-tier-budget.svg` و `strategies-grid.svg` را میخوانند. `free-tier-budget.svg` ارقام خود را از بارگذار کاتالوگ زنده میگیرد، بنابراین تغییر به `FREE_MODEL_BUDGETS` یا نام نمایش دهنده ارائهدهنده، CI قرمز میکند تا زمانی که آن فایل دوباره تولید شود.

### شغل: `i18n-ui-coverage`

| اسکریپت                          | اعتبار سنجی می کند                                                                                                                                                    | مسدود کردن    |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (داخلی) | پوشش کلید UI i18n ≥ 65٪ است                                                                                                                                           | بله           |
| `check-ui-value-drift` (داخلی)   | یک انگلیسی بازنویسی شده** ارزش** ترجمه ای کهنه باقی نمی گذارد                                                                                                         | بله           |
| `check-new-key-coverage` (داخلی) | الف** جدید** کلید انگلیسی در هر محلی ترجمه می شود — یک نشانگر `__MISSING__:` رد می شود                                                                                | بله           |
| `check-translation-ratio`        | نسبت ترجمه واقعی به ازای هر منطقه (یکسان به انگلیسی / جای جای / برگهای خارج از فهرست مجاز) نباید از `config/quality/i18n-translation-baseline.json` + slack تجاوز کند | **مشاوره ای** |

`fetch-depth: 0` — نیاز دارد که دروازه ارزش رانش `en.json` را با پایه ادغام متفاوت می کند.

#### دروازه کهنه-ترجمه `check-ui-value-drift` —

یک رگرسیون i18n را میگیرد که دروازههای دیگر از نظر ساختاری نمیتوانند ببینند: یک مقدار انگلیسی بازنویسی میشود و ترجمههای مشتقشده از انگلیسی _قبلی باقی میمانند، بنابراین کاربران غیرانگلیسی به خواندن نسخهای با اعتماد به نفس و اکنون اشتباه ادامه میدهند.

این به صورت واقعی ارسال شد. `oauthModal.googleOAuthWarning` هنگامی که کمک کننده ورود به سیستم Antigravity فرود آمد بازنویسی شد (#5203).** 39 از 43 منطقه** متنی را نگه داشت و به اپراتورها میگفت که " URL کامل را کپی کرده و آن را در زیر بچسبانند" — که نمیتواند برای آن ارائهدهنده کامل شود. تا زمان #8463 بی توجه بود زیرا:

- `sync-ui-keys` فقط کلیدهایی را که هستند پر می کند** غایب** ، هرگز آنهایی که نیستند** کهنه** ;
- `check-ui-keys-coverage` کلید _presence_ را می شمارد، بنابراین یک ترجمه کهنه به عنوان پوشش داده می شود.
- `check-translation-drift` tracks the `docs/i18n/<locale>/**.md` documentation mirrors — it never reads `src/i18n/messages/*.json`. Blocking in job `docs-sync-strict` since the 2026-09 re-sync: edit a core doc → `npm run i18n:run -- --files=<doc>` (section-level, cheap).

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

زمانی که کاتالوگ پایه قابل خواندن نباشد، با `SKIP reason=base-unresolved` از 0 خارج می شود (کلون کم عمق بدون بازخوانی پایه)، بازتاب `check-openapi-breaking`.

### شغل: `i18n`

ماتریس اعتبار سنجی کامل i18n (یک کار در هر منطقه). کل کار مشاوره ای است

| اسکریپت                         | اعتبار سنجی می کند          | مسدود کردن                                          |
| ------------------------------- | --------------------------- | --------------------------------------------------- |
| `validate_translation.py quick` | کامل بودن ترجمه در هر منطقه | **مشاوره ای** (`continue-on-error: true` در کل کار) |

### شغل: `pr-test-policy`

فقط با درخواست های کششی اجرا می شود.

| اسکریپت                | اعتبار سنجی می کند                                                                                                                 | مسدود کردن |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs که کد تولید را در `src/`، `open-sse/`، `electron/` یا `bin/` تغییر میدهد باید شامل یا بهروزرسانی تستها باشد (قانون سخت #8)     | بله        |
| `check:test-masking`   | فایلهای آزمایشی تغییر یافته تعداد خالص ادعاها را کاهش نمیدهند یا توتولوژیهای `assert.ok(true)` را اضافه نمیکنند                    | بله        |
| `check:pr-evidence`    | بدن PR شواهد test/VPS را برای این تغییر ذکر میکند (قاعده سخت #18 با برداشتن PR نثر — شکننده مکانیزه میکند، به Backlog مراجعه کنید) | بله        |

### شغل: `test-vitest`

دنبال `build` می دود . بلوک ها در صورت شکست ادغام می شوند.

| سوئیت            | اعتبار سنجی می کند                                  | مسدود کردن                                                                                                             |
| ---------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | سرور MCP (110 ابزار)، autoCombo، کش — vitest runner | بله                                                                                                                    |
| `test:vitest:ui` | کامپوننت UI رانر — vitest را تست می کند             | **مسدود کردن** خرابیهای از قبل موجود — به صراحت در `vitest.config.ts` مستثنی شدهاند. شکست های جدید کار را شکست می دهند |

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
- **توصیهای** — مجموع سراسری در مقایسه با خط مبنای منجمدشده. انحراف بهارثرسیده هرگز یک
  PR بیتقصیر را قرمز نمیکند؛ این انحراف هنگام تطبیق انتشار دوباره منجمد میشود و کار
  headroom آن را زیر نظر میگیرد.

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

## خط مشی لیست مجاز

هر دروازهای که نمیتواند در مورد نقضهای قبلی شکست بخورد، از یک لیست مجاز ثابت استفاده میکند (مثلا `KNOWN_STALE_DOC_REFS`، `KNOWN_MISSING`، `KNOWN_RAW_SQL`). سیاست این است:

**رفع علت اصلی؛ فقط زمانی از لیست مجاز استفاده کنید که نقض از قبل وجود داشته باشد و در همان PR قابل رفع نباشد.**

هنگام افزودن ورودی به لیست مجاز:

1. نظری را همراه با توجیه درج کنید.
2. به موضوع ردیابی اشاره کنید (به عنوان مثال، `// #3498 — Phase 2 feature, not yet implemented`).
3. حذف ورودی در همان PR که نقض را برطرف میکند — ورودی قدیمی که دیگر نقض فعال را سرکوب نمیکند، خود یک نقص است (6A.3 stale-enforcement پس از اجرا، دروازه ورودی لیست مجاز یتیم را با شکست مواجه میکند).

انجام دهید** نه** ورودی های لیست مجاز را اضافه کنید تا تست ها سریعتر بگذرد. یک دروازه سبز با لیست مجاز در حال رشد یک حس نادرست از کیفیت است.

### وقتی دروازه ای بر PR شما خراب می شود

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

- **`check:docs-sync` دو بار اجرا می شود** — مستقل در کار `lint` و دوباره داخل `check:docs-all` (`docs-sync-strict`) و قلاب پیش ارتکاب هاسکی. ✅**DONE** احضار `lint` مستقل — حذف شد.
- **اسکن CVE** — ❌**NOT یک ادغام تمیز.** `audit:deps` توصیه های مهم و ممیزی های ناقص را در تمام پنج فایل قفل مسدود می کند، در حالی که توصیه های بالا را به عنوان هشدار تحت خط مشی فعلی گزارش می دهد. `check:vuln-ratchet` (osv) فقط در یک _رگرسیون_ در مقابل خط پایه بررسی شده با شکست مواجه می شود و در صورت لزوم اندازه گیری های از دست رفته را رد می کند. معانی مختلف — حذف `audit:deps` دروازه بحرانی مطلق و رسیدهای حسابرسی بسته مستقل را از دست می دهد. هر دو را نگه دارید.
- **تشخیص چرخه** — ✅**DONE** (#15159 G-01/G-02). متن قدیمی در اینجا `check:cycles` "دروازه سبز، سرپرستی" نامید و مسدود نگه داشتن آن را توجیه کرد زیرا `check:circular-deps` (dpdm) 91 چرخه را گزارش کرد. آن سبز یک بود** سبز کاذب** : `check:cycles` 5 زیر شاخه (450 فایل) را اسکن کرد، فقط `import|export … from` ثابت را مطابقت داد، و هر مشخص کننده `@/` و `@omniroute/open-sse/` را حذف کرد، بنابراین نمیتوانست چرخههای نام مستعار + وارداتی پویا را که بر مخزن غالب بودند، ببیند. رفع شد: گیت اکنون `src` + `open-sse` (5023 فایل) را راه میاندازد، مشخصکنندهها را از TypeScript AST جمعآوری میکند (بنابراین `import("…")` شمارش میشود و `typeof import("…")` موقعیت تایپ نمیشود)، و tsconfig `paths` را حل میکند. پیدا می کند** 14** چرخه ها، نه 0. از آنجا که 14 چرخه از قبل موجود را نمی توان در یک دروازه PR ثابت کرد، `check:cycles` اکنون یک** جغجغه دار** (`--ratchet`, سقف `metrics.cycles.value = 14` در `quality-baseline.json`, `direction: down`) — هر رگرسیونی را مسدود می کند و تعداد فقط می تواند کاهش یابد. CI `npm run check:cycles:ratchet` را اجرا می کند. سوختگی سواری با**A-01** . `check:circular-deps` (dpdm) به عنوان نظر دوم گسترده تر، توصیه می شود.
- **پیچیدگی** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): یک پیاده روی ESLint ، با ruleId شمارش می شود، بنابراین حداکثر خطوط چرخه ای + و خطوط پایه شناختی مستقل می مانند. فردی `check:complexity` / `check:cognitive-complexity` باقی می ماند برای `--update` محلی .
- **`/api` ضد توهم** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): یک موجودی FS از `src/app/api`، openapi-routes + docs-symbols هنوز به طور مستقل گزارش می دهند. افراد برای اجراهای محلی باقی می مانند.
- **`check:node-runtime` در 11 شغل فعال است** — ⚠️** ROI کم .** هر یک رانر جداگانه است و چک < 1s است. صرفه جویی کل ~ 10s، در مقابل از دست دادن یک نگهبان ارزان برای هر شغل. ارزش آن را ندارد
- **`typecheck:noimplicit:core` روی CI لینت** — ✅** از کار پرز حذف شده است** ( `continue-on-error` مشورتی بود); سطح مسدود کننده نوع `typecheck:core` + `check:type-coverage` است. اسکریپت محلی حفظ شد.

### تلنگر / تصمیم گیری (خط مشی اپراتور)

- `check:openapi-security-tiers` (مشاوره) — ❌**NOT کاملا قابل چرخش** از 0 خارج می شود اما هشدار می دهد که چندین مسیر `traffic-inspector` تحت `LOCAL_ONLY_API_PREFIXES` فاقد حاشیه نویسی `x-loopback-only: true` هستند. برای اجرای آن ابتدا باید آن حاشیه نویسی ها را به `openapi.yaml` اضافه کنید.
- `typecheck:noimplicit:core` (مشاوره) — تا حد زیادی توسط جغجغه مسدود کننده `check:type-coverage` درج می شود. به یک ضامن دار بچرخانید یا پاس دوم `tsc` اضافی را رها کنید.
- `test:vitest:ui` (اکنون** مسدود کردن** ) خرابیهای از قبل موجود — به صراحت در `vitest.config.ts` با نظرات ردیابی `// #8618` حذف میشوند. شکست های جدید کار را شکست می دهند.
- `check:secrets` (gitleaks، مسدود کردن جغجغه ثابت در 3 مثبت کاذب مستند شده) — مجاز 3 را برای رسیدن به 0 یا تنزل به توصیهای فهرست میکند. همپوشانی GitHub بومی راز اسکن + `check:public-creds`.
- `check:pr-evidence` (مسدود کننده، greps PR-body proses) — high false-positive risk; در صورت حذف، اجرای Hard Rule #18 تضعیف می شود، بنابراین این یک خط مشی واقعی است.
- `semgrep` (مستقل مشورتی) — با CodeQL برای خانوادههای OWASP همپوشانی دارد. خط پایه آن را به یک جغجغه یا قطره سیم کشی کنید.

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
