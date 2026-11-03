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

## فهرست دروازهها و پروفایلهای اجرا

### پذیرش نامزد

گردشکارهای CI و Quality Gates هرکدام یک verdict پایدار تولید میکنند: `Gate / CI` و
`Gate / Quality`. سیاست پذیرش نسخهگذاریشده، هر job بالادستی را بهعنوان الزامی یا
توصیهای فهرست میکند. یک job الزامیِ قابلاعمال باید موفق شود: نتایج مفقود،
لغوشده، ردشده، در انتظار و ناشناخته نمیتوانند PASS را برقرار کنند. طبقهبندی معتبر
فقط-مستندات یا فقط-کاتالوگ میتواند یک مسیر کد را غیرقابلاعمال کند؛ یک PR پیشنویس
نامزد پذیرفتهشده نیست. برچسب `hotfix` شواهد را لغو نمیکند.

هر دو گردشکار، PRهای واردشونده به شاخههای main/release، pushها به `main`،
dispatch دستی و رویدادهای merge-group را پوشش میدهند. Push، dispatch و merge-group
انتخاب کامل را اجرا میکنند. Pushها به `release/**` آنها را آغاز نمیکنند (2026-10-18):
هر تغییر پیشتر ماتریس را در PR خود اجرا کرده است و ترکیب ادغامشده وظیفه Release-Green
است (`docs/ops/RUNNER_BOX.md` → Hosted lane). فورکها و merge groupها برای jobهایی
که در حالت عادی runnerهای self-hosted را انتخاب میکنند، از runnerهای hosted استفاده
میکنند؛ پیش از انتشار باید کافیبودن ظرفیت hosted تأیید شود.

هر رسید JSON، SHA بررسیشده، اجرای گردشکار و تلاش را مشخص میکند.
CLI عدم تطابق SHA مربوط به checkout/event را رد میکند. آزمونهای گردشکار، عضویت
در سیاست را به فهرست `needs` مربوط به job مربوط به verdict متصل میکنند تا یک مسیر
جدید یا حذفشده نتواند بیسروصدا ناپدید شود. رسیدها فقط گردشکار خود را پوشش میدهند،
نه انتشار، استقرار یا درونمایه یک اسکنر توصیهای موجود را. فعالسازی هر دو نام بررسی
در قوانین شاخه، یک تغییر مدیریتی جداگانه است؛ افزودن این jobها بهخودیخود از یک
شاخه محافظت نمیکند.

### فهرست موجودی اسکن ایستا

فهرست موجودی npm-alias نسخهگذاریشده و عضویت اسکن ایستا در
`config/quality/gate-manifest.json` قرار دارند. برای اعتبارسنجی نام اسکریپتها و
دستورهای دقیق در برابر `package.json`، دستور `npm run check:gate-manifest` را اجرا
کنید؛ افزودنها، حذفها و انحراف دستور، هم hook محلی و هم jobهای طبقهبندی تغییر در CI
را ناموفق میکنند. یک alias، job گردشکار، نمونه ماتریس یا مورد آزمون نیست: این
شمارشها نباید بهصورت قابلجایگزین با یکدیگر ارائه شوند.

برای بررسی aliasهای انتخابشده بدون اجرای آنها، از
`npm run quality:scan -- --list` یا `npm run quality:scan:fast -- --list`
استفاده کنید. runner نقطه ورود npm را فراخوانی میکند، بنابراین runtime آن
(ازجمله Bun در صورت پیکربندی) حفظ میشود. manifest، aliasهای خارج از این پروفایلها
را بهعنوان مواردی که جداگانه فراخوانی میشوند ثبت میکند و دستورات نگهداری در
پروفایلهای اسکن فقطخواندنی ممنوع هستند.

این پروفایلها فقط اسکن ایستا را پوشش میدهند. آنها آزمونهای محصول، پوشش کد،
بستهبندی، بررسیهای خارجی یا پذیرش کامل انتشار یک نامزد را تأیید نمیکنند.
پذیرش گردشکار از `config/quality/admission-policy.json` پیروی میکند و
`scripts/quality/admission-verdict.mjs` آن را اجرا میکند. پروفایلهای
Release-observer جداگانه باقی میمانند؛ بررسیهای قابلاعمال و رسیدهای آنها را
بهطور مستقل بررسی کنید. موجودی نوشتاری زیر یک مرجع است، نه مدرکی مبنی بر اینکه
یک gate واقعاً اجرا شده است.

اسکریپتها در `scripts/check/` (gateهای سیاست) و `scripts/quality/` (موتور ratchet)
قرار دارند. منبع حقیقت CI، `.github/workflows/ci.yml` است.

### مسیر سریع PR انتشار (`quality.yml`)

`.github/workflows/quality.yml` در PRهای main/release، pushها به `main`،
dispatch و merge groupها مکمل CI است. PRها از بررسیهای سریعِ مبتنی بر فیلتر مسیر
استفاده میکنند. build تکراریِ دائماً غیرفعال حذف شده است؛ بررسیهای واقعی
build/package/boot در CI باقی میمانند.

| Job                                              | Scope                                                                                                                                                                                                     | Blocking             |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PRهای مستندات/کد؛ ارجاعهای مستندات API و docs-all                                                                                                                                                         | Yes                  |
| `Fast Quality Gates`                             | PRهای کد؛ بررسیهای ایستا، typecheck، typecheck داشبورد، آزمونهای واحد متأثر                                                                                                                               | Yes                  |
| `Forgotten sibling tests`                        | PRهای کد؛ ماژولهای تغییریافته ردیابیشده تا مصرفکنندگان ایستا و آزمونهای خواهرِ نامزد؛ مسیرهای barrel و dynamic-import بهعنوان تشخیصهای توصیهای گزارش میشوند و استثناهای allowlist ارجاعشده را شامل میشوند | **Advisory**         |
| `Vitest (fast-path)`                             | PRهای کد؛ مجموعه سریع vitest                                                                                                                                                                              | Yes                  |
| `Unit Tests fast-path`                           | PRهای کد؛ مجموعه آزمون واحد 4-تکهای                                                                                                                                                                       | Yes                  |
| `No new ESLint warnings`                         | PRهای کد؛ محافظ lint آگاه از suppressionها                                                                                                                                                                | Yes, including forks |
| `Merge integrity (changelog + generated skills)` | PRهای غیرپیشنویس؛ همگامسازی changelog و مهارتهای تولیدشده                                                                                                                                                 | Yes, including forks |

#### گزارش آزمونهای خواهرِ فراموششده

`npm run check:forgotten-sibling-tests` از حلکنندهٔ import مورد استفاده در نگاشت تأثیر آزمون استفادهٔ مجدد میکند.
برای هر ماژول تولیدی تغییریافته، زنجیرههای قطعی
`changed module/symbol -> static consumer -> candidate sibling test` را گزارش میکند، مشروط بر اینکه آزمون
نامزد در diff درخواست pull وجود نداشته باشد. خلاصهٔ Markdown و نتیجهٔ JSON بهعنوان
artifact گردشکار `forgotten-sibling-tests` نگهداری میشوند تا پیش از هرگونه عرضهٔ مسدودکننده، برای کالیبراسیون استفاده شوند.

بازصادراتهای Barrel و importهای پویا فقط تشخیصهای resolution هستند؛ آنها هرگز یک
یافتهٔ مسدودکننده ایجاد نمیکنند. استثناهای بررسیشده در
`config/quality/forgotten-sibling-allowlist.json` قرار دارند. هر ورودی باید مصرفکننده و آزمون
نامزد را مشخص کند، یک دلیل مشخص ارائه دهد و به یک issue یا pull request در GitHub پیوند دهد. ورودیهای نادرست باعث fail closed میشوند. استثناها نمیتوانند یک آزمون نامزد حذفشده یا diffای را که `.skip`/`.todo` اضافه میکند، نادیده بگیرند؛ تضعیف assertion و دیگر روشهای masking همچنان تحت مالکیت مستقل
گیت مسدودکنندهٔ `check:test-masking` باقی میمانند.

### کار: `lint`

در هر PR به `main` اجرا میشود. در صورت شکست، ادغام را مسدود میکند.

| اسکریپت (`npm run ...`)           | اعتبارسنجیها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | مسدودکننده                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | نسخهٔ Node.js در محدودهٔ پشتیبانیشده قرار دارد                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | بله                                        |
| `check:cycles`                    | واردکردنهای حلقوی در سراسر `src/` + `open-sse/` (مبتنی بر AST، با resolve شدن `paths` در tsconfig). اجرای مستقل هر زمان چرخهای وجود داشته باشد، با کد خروجی 1 خاتمه مییابد (از #15281 بهصورت fail-closed) و SCCها را فهرست میکند. `check:cycles:ratchet` (آنچه CI اجرا میکند) زمانی مسدود میشود که تعداد از سقف `metrics.cycles` در `quality-baseline.json` بیشتر شود — در حال حاضر 14، با `direction: down`، بنابراین فقط میتواند کاهش یابد (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                             | بله (ratchet)                              |
| `check:boundary`                  | وابستگی `open-sse → src`: واردکردنهای یکتای فایلبهفایل از موتور به برنامه (`scripts/quality/measure-boundary.mjs`)؛ فهرست یالها، backlog اصلاحی v4 core/module-split است. اجرای مستقل = گزارش اطلاعرسانی (همانند `quality:boundary`). `check:boundary:ratchet` (آنچه CI اجرا میکند و در حلقهٔ ratchet مربوط به دروازههای سریع `quality.yml` نیز قرار دارد) زمانی مسدود میشود که تعداد از سقف `metrics.boundaryOpenSseToSrc` در `quality-baseline.json` بیشتر شود — مقدار اولیه بر اساس اندازهگیری 771، با `direction: down`؛ `--update` فقط آن را کاهش میدهد؛ در PRها نسبت به base محاسبه میشود (`--base-ref`، در ادامه ببینید)                                                                                                                                                                                                                                                                             | بله (ratchet)                              |
| `check:route-validation:t06`      | schemaهای Zod در همهٔ routeها وجود دارند (سیاست Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | بله                                        |
| `check:any-budget:t11`            | تعداد `@ts-expect-error // any` از سهمیه بیشتر نیست (کاتراکا، ردهٔ ۱۱)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                        |
| `check:provider-consistency`      | هر provider در `providers.ts` یک ورودی متناظر در `providerRegistry.ts` دارد (و برعکس، در چارچوب فهرست مجاز)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | بله                                        |
| `check:model-lifecycle`           | سه جدول مسیریابی که بهصورت دستی نگهداری میشوند، با snapshot چرخهٔ عمر ثبتشده (#11503) سازگار باقی میمانند: `FITNESS_TABLE` (`taskFitness.ts`) هیچ شناسهٔ بازنشستهای را که `REGISTRY` بتواند مسیریابی کند امتیازدهی نمیکند؛ هدف هر `BUILT_IN_ALIASES` در `REGISTRY` وجود دارد و در snapshot شناسههای بازنشسته وجود ندارد؛ هر شناسهٔ بازنشستهای که همچنان در `REGISTRY` است، به مقصد دیگری هدایت میشود یا در `allowedRetiredInCatalog` فهرست شده است؛ و هیچ مبدأ یا مقصد `DEFAULT_DEGRADATION_MAP` در آن snapshot بازنشسته نیست. این بررسی ثابت نمیکند که یک مدل در حال حاضر توسط یک upstream فعال ارائه میشود. آفلاین — با `config/quality/model-lifecycle.json` مقایسه میکند؛ این فایل با اجرای دستی `npm run quality:refresh-model-lifecycle` بهروزرسانی میشود (نیازمند شبکه؛ به CI متصل نیست). `allowedRetiredInCatalog` یک ratchet برای کاهش تدریجی موارد است: فقط با یک issue پیگیری، ورودی اضافه کنید. | بله                                        |
| `check:fetch-targets`             | هر `fetch("/api/...")` در `src/` سمت کلاینت به یک `route.ts` واقعی resolve میشود                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | بله                                        |
| `check:deps`                      | همهٔ وابستگیهای قابل نصب با `npm install` در تمام `package.json`های مخزن، در `dependency-allowlist.json` قرار دارند؛ بستههای جدید بدون نسخهٔ ثابت یا slopsquatted علامتگذاری میشوند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | بله                                        |
| `audit:deps`                      | `npm audit` (ریشه + electron) — هیچ هشدار سطح بالا یا بحرانی وجود ندارد (با osv `check:vuln-ratchet` همپوشانی دارد؛ به Backlog عقلانیسازی مراجعه کنید)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | بله                                        |
| `check:lockfile`                  | یکپارچگی `package-lock.json` — رجیستری https، هشهای یکپارچگی، بدون بازنویسی میزبان                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | بله                                        |
| `check:licenses`                  | فهرست مجاز مجوزهای SPDX برای وابستگیهای تولیدی                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | بله                                        |
| `check:tracked-artifacts`         | بدون مصنوعات ساخت / پیوندهای نمادین `node_modules` ثبتشده (همچنین در husky pre-commit اجرا میشود؛ pre-push عمداً سبک است — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | بله                                        |
| `check:ai-attribution`            | بدون trailer از نوع `Co-Authored-By` مربوط به هوش مصنوعی/بات یا پابرگ تولیدشده توسط هوش مصنوعی در commitها، عنوان یا بدنه PR — قانون سخت #16 (در حلقه fast-gates مربوط به PR→`release/**` در `quality.yml` — payload رویداد را میخواند و خارج از PRها کاری انجام نمیدهد — و یک مرحله مخصوص PR در lint در `ci.yml` برای PR→`main`؛ همچنین hook مربوط به husky `commit-msg`؛ همنویسندگان انسانی مجاز هستند؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | هر استثنای Vitest یک issue پیگیری را نام میبرد و در `config/quality/vitest-exclusions.json` ظاهر میشود (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | بله                                        |
| `check:file-size`                 | فایلهای منبع (`.ts`/`.tsx` در `src/`، `open-sse/`، `electron/`، `bin/`) در محدوده `cap` باقی میمانند و فایلهای آزمون (`*.test.ts(x)`) در محدوده `testCap`؛ فایلهای منجمدشده در `file-size-baseline.json` (`frozen` / `testFrozen`) نباید از اندازه ثبتشده خود بزرگتر شوند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بله                                        |
| `check:error-helper`              | پاسخهای خطا در اجراکنندهها/مدیریتکنندهها از `buildErrorBody()` / `sanitizeErrorMessage()` استفاده میکنند (قانون سختگیرانهٔ شمارهٔ ۱۲)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | بله                                        |
| `check:migration-numbering`       | فایلهای SQL مهاجرت بهصورت متوالی شمارهگذاری شدهاند و هیچ شمارهٔ مفقود یا تکراری وجود ندارد                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | بله                                        |
| `check:public-creds`              | هیچ `client_id`/`client_secret` تحت OAuth یا کلید وب Firebase بهصورت literal خارج از `publicCreds.ts` وجود ندارد (قانون سختگیرانهٔ شمارهٔ ۱۱)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | بله                                        |
| `check:db-rules`                  | هیچ SQL خامی خارج از ماژولهای `src/lib/db/` وجود ندارد؛ هیچ import از نوع barrel از `localDb.ts` وجود ندارد (قوانین سختگیرانهٔ شمارهٔ ۲/۵)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | بله                                        |
| `check:known-symbols`             | اجراکنندههای ارائهدهنده، راهبردهای مسیریابی و مترجمهای ثبتشده در جدولهای dispatch با فایلهای موجود روی دیسک مطابقت دارند — هیچ نماد بدون مرجع یا اعلامنشدهای وجود ندارد                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | بله                                        |
| `check:route-guard-membership`    | هر مسیری که یک فرایند فرزند ایجاد میکند، با `isLocalOnlyPath()` دستهبندی میشود (قوانین سختگیرانهٔ شمارهٔ ۱۵/۱۷)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | بله                                        |
| `check:test-discovery`            | هر فایل `*.test.ts` / `*.spec.ts` در مخزن، توسط دستکم یک اجراکنندهٔ آزمون جمعآوری میشود (راچت: فهرست孤孤 در `test-discovery-baseline.json` فقط میتواند کوتاهتر شود)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | بله                                        |
| `check:test-tla-order`            | هیچ فایل `node:test` در زیر `tests/unit` یک آزمون را ثبت نمیکند، به یک `await` در سطح بالا نمیرسد و سپس آزمونهای بیشتری ثبت نمیکند (#18045؛ راچت: `test-tla-order-allowlist.json` فقط میتواند کوتاهتر شود)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | بله                                        |
| `check:agent-skills-sync`         | مصنوعات تولیدشدهٔ مهارتهای عامل با کاتالوگ منبع مطابقت دارند (بدون انحراف)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | لوگوها/داراییهای ارائهدهنده دارای یک مدخل ثبتشدهٔ منشأ هستند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | فایلهای پیکربندی JSON تجزیه میشوند و قوانین lint مخزن را برآورده میکنند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | کامپایل TypeScript بدون خطا (فقط هشدارهای اطلاعرسانی)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | بله                                        |
| `typecheck:noimplicit:core`       | `noImplicitAny` سختگیرانه — رویکرد آیندهنگر؛ بسیاری از نقاط فراخوانی موجود هنوز به حاشیهنویسی نیاز دارند                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **اطلاعرسانی** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` محدودشده به `src/app/(dashboard)/**` (#7033) — فهرست مجاز منتخب ۲۷فایلی `typecheck:core` شامل هیچ TSX مربوط به داشبورد نیست و `next build` نیز هرگز آن را type-check نمیکند (`next.config.mjs` مقدار `ignoreBuildErrors: true` را تنظیم کرده است)، بنابراین رگرسیونهای شناسههای بدون ارجاع در آنجا (#6625/#6909) از دید CI پنهان بودند. تفاوتها با خط مبنای ثابتِ تعداد خطاها بهازای هر فایل/کد TS مقایسه میشوند (`config/quality/dashboard-typecheck-baseline.json`، با همان الگوی اعمال خطاهای قدیمی مانند `check:known-symbols`) — فقط خطاهای NEW فراتر از تعداد ثبتشده در خط مبنا باعث شکست گیت میشوند؛ هنگام رفع یک خطای ازپیشموجود، با `--update` مقدار را کاهش دهید.                                                                                                                                                                                                                           | بله                                        |

### کار: `quality-gate`

پس از `test-coverage` اجرا میشود. در صورت شکست، ادغام را مسدود میکند.

| اسکریپت                      | اعتبارسنجی                                                                                                                                                                     | مسدودکننده            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `quality:collect`            | `quality-metrics.json` را تولید میکند (تعداد هشدارهای ESLint، پوشش حاصل از گزارش ادغامشدهٔ شاردها)                                                                             | بله (پیشنیاز ratchet) |
| `quality:ratchet`            | هیچیک از معیارهای `quality-baseline.json` پسرفت نکردهاند (هشدارهای ESLint ≤ خط مبنا؛ پوشش ≥ خط مبنا)                                                                           | بله                   |
| `check:duplication`          | تکثیر کد (`jscpd@4`) از خط مبنای `quality-baseline.json` فراتر نمیرود                                                                                                          | بله                   |
| `check:complexity`           | پیچیدگی سیکلوماتیک در سطح فایل از سقف فراتر نمیرود (`complexity` هستهٔ ESLint بههمراه `max-lines-per-function`)                                                                | بله                   |
| `check:cognitive-complexity` | ratchet پیچیدگی شناختی (`eslint-plugin-sonarjs`) — یک گذر ESLint جداگانه؛ CI هر دو را در گام واحد `check:complexity-ratchets` ادغامشده اجرا میکند                              | بله                   |
| `check:dead-code`            | ratchet خروجیها / فایلهای بدون استفاده (knip) نسبت به خط مبنا پسرفت نمیکند                                                                                                     | بله                   |
| `check:compression-budget`   | بودجهٔ محک فشردهسازی — کف صرفهجویی توکن بهازای هر موتور نباید پسرفت کند                                                                                                        | بله                   |
| `check:type-coverage`        | ratchet درصد کد دارای نوع (`type-coverage`) پسرفت نمیکند؛ تا حد زیادی جایگزین `typecheck:noimplicit:core` میشود                                                                | بله                   |
| `check:codeql-ratchet`       | تعداد هشدارهای باز CodeQL پسرفت نمیکند (از طریق `gh api` میخواند؛ بدون توکن بهصورت graceful رد میشود) — دورهٔ نوسازی و راهاندازی دستی: بخش «ratchet مربوط به CodeQL» را ببینید | بله                   |

### کار: `quality-extended`

کل کار توصیهای است (`continue-on-error: true`). ratchetهای مبتنی بر npm واقعاً اجرا میشوند؛ اسکنرهای خارجی از طریق `gh release download` نصب میشوند و اگر باینری همچنان وجود نداشته باشد، خودشان اجرا را رد میکنند (با کد خروج ۰).

| اسکریپت                  | اعتبارسنجی                                                                                                                                                                                                    | مسدودکننده                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `check:circular-deps`    | هیچ وابستگی چرخهای وجود ندارد (dpdm)                                                                                                                                                                          | **توصیهای**                                                       |
| `check:bundle-size`      | اندازهٔ باندل از سقف فراتر نمیرود                                                                                                                                                                             | **توصیهای**                                                       |
| `check:secrets`          | اسکن اسرار (gitleaks) — اگر باینری وجود نداشته باشد رد میشود                                                                                                                                                  | **توصیهای**                                                       |
| `check:vuln-ratchet`     | آسیبپذیریهای وابستگی (osv-scanner) پسرفت نمیکنند — اگر باینری وجود نداشته باشد رد میشود                                                                                                                       | **توصیهای**                                                       |
| `check:workflows`        | lint گردشکار (actionlint + zizmor)؛ اسکنرهای مفقود/خراب، گزارشهای نامعتبر یا خط مبنای ratchet مفقود با وضعیت INCOMPLETE شکست میخورند. یافتههای معتبر از سیاست انتخابشدهٔ strict/advisory/ratchet پیروی میکنند | اجرای آن الزامی است؛ ratchet مربوط به zizmor در CI مسدودکننده است |
| `check:openapi-breaking` | تغییرات ناسازگار در قرارداد API عمومی (`openapi.yaml`) در مقایسه با شاخهٔ پایه (oasdiff) — `openapiBreaking=N` را منتشر میکند؛ اگر oasdiff وجود نداشته باشد یا مشخصات پایه قابل resolve نباشد رد میشود        | **توصیهای**                                                       |

### کار: `docs-sync-strict`

در هر PR به `main` اجرا میشود. در صورت شکست، ادغام را مسدود میکند.

| Script                         | اعتبارسنجی                                                                                                                                                                                  | مسدودکننده                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | دروازهٔ فرادستی که ۶ دروازهٔ فرعی زیر را بهترتیب اجرا میکند                                                                                                                                 | بله                       |
| ↳ `check:docs-sync`            | سازگاری نسخهٔ CHANGELOG / OpenAPI / llm.txt                                                                                                                                                 | بله                       |
| ↳ `check:docs-counts`          | شمارشهای موجود در متن (تعداد ارائهدهندگان، تعداد مهاجرتها و غیره) در محدودهٔ ratchet شمارشهای واقعی قرار دارند                                                                              | بله                       |
| ↳ `check:env-doc-sync`         | هر متغیر محیطی در `.env.example` در یک جدول مستندات مستندسازی شده است و برعکس                                                                                                               | بله                       |
| ↳ `check:deprecated-versions`  | هیچ رشتهٔ نسخهٔ منسوخشدهای در مستندات وجود ندارد                                                                                                                                            | بله                       |
| ↳ `check:doc-links`            | پیوندهای داخلی Markdown در مستندات به فایلهای واقعی resolve میشوند (با قالب `[text]`/`(path)`)                                                                                              | بله                       |
| ↳ `check:fabricated-docs`      | مسیرها، متغیرهای محیطی، فرمانهای CLI، نامهای hook و مسیرهای فایلی که در مستندات ذکر شدهاند در codebase وجود دارند. با `--strict` دروازهٔ سخت است؛ بدون این flag بهصورت soft-fail عمل میکند. | بله (با `--strict` در CI) |
| `check:cli-i18n`               | رشتههای فرمان CLI در همهٔ فایلهای locale مربوط به i18n وجود دارند                                                                                                                           | بله                       |
| `check:openapi-coverage`       | مشخصات OpenAPI دستکم حداقلِ ratchetشدهای از مسیرهای واقعی را پوشش میدهد                                                                                                                     | بله                       |
| `check:openapi-security-tiers` | حاشیهنویسیهای سطح امنیتی در `openapi.yaml` با دستهبندیهای `routeGuard.ts` سازگار هستند                                                                                                      | **توصیهای**               |
| `check:openapi-routes`         | هر مسیر در `openapi.yaml` به یک `route.ts` واقعی resolve میشود (برای جلوگیری از hallucination)                                                                                              | بله                       |
| `check:docs-symbols`           | هر ارجاع `/api/...` در `docs/**/*.md` به یک `route.ts` واقعی resolve میشود (برای جلوگیری از hallucination)                                                                                  | بله                       |
| `i18n translation drift`       | کلیدهای ترجمهنشده در فایلهای locale مربوط به i18n — فقط هشدار                                                                                                                               | **توصیهای**               |

دوازده SVG موجود در README در `docs/diagrams/` تولید میشوند (`scripts/docs/gen-readme-<name>.mjs`؛
`npm run docs:readme-diagrams` همهٔ آنها را دوباره تولید میکند). هرکدام یک تست واحد مقایسهٔ بایتی دارند
(`tests/unit/docs/readme-*-svg.test.ts`، job `test-unit`) که وقتی فایل commitشده قدیمی باشد شکست میخورد،
و `check:docs-counts` اعداد canonical را از گرههای `<text>` آنها میخواند — به همین دلیل مرحلهٔ
outline کردن، هر رشتهٔ outlineشده را بهصورت `<text>` نامرئی در فایل نگه میدارد. بررسی اعداد canonical مربوط به SVG فایلهای فهرستشده در
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) را میخواند: `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`، بهعلاوهٔ `public/images/tier-flow-dark.svg` و `tier-flow-light.svg`؛
ادعاهای free-forever، catalog-entry، recurring-pool و scoring-factors نیز
`promise-pillars.svg`، `free-tier-budget.svg` و `strategies-grid.svg` را میخوانند. `free-tier-budget.svg`
اعداد خود را از بارگذارندهٔ زندهٔ catalog دریافت میکند، بنابراین تغییر در `FREE_MODEL_BUDGETS`
یا نام نمایشی یک ارائهدهنده، CI را تا زمانی که آن فایل دوباره تولید نشود قرمز میکند.

### کار: `i18n-ui-coverage`

| Script                            | اعتبارسنجی                                                                                                                                                                         | مسدودکننده  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | پوشش کلیدهای i18n رابط کاربری ≥ 65٪ است                                                                                                                                            | بله         |
| `check-ui-value-drift` (inline)   | بازنویسی یک **value** انگلیسی هیچ ترجمهٔ قدیمیای بر جای نمیگذارد                                                                                                                   | بله         |
| `check-new-key-coverage` (inline) | یک کلید انگلیسی **جدید** در همهٔ localeها ترجمه شده است — وجود نشانگر `__MISSING__:` رد میشود                                                                                      | بله         |
| `check-translation-ratio`         | نسبت ترجمهٔ واقعی در هر locale (مقادیر یکسان با انگلیسی / placeholder / موارد مفقود خارج از allowlist) نباید از `config/quality/i18n-translation-baseline.json` + slack بیشتر باشد | **توصیهای** |

به `fetch-depth: 0` نیاز دارد — دروازهٔ value-drift، `en.json` را با merge base مقایسه میکند.

#### `check-ui-value-drift` — دروازهٔ ترجمهٔ قدیمی

پسرفت i18nای را شناسایی میکند که سایر دروازههای ساختاری قادر به مشاهدهاش نیستند: یک مقدار انگلیسی بازنویسی میشود و ترجمههایی که از انگلیسی _قبلی_ استخراج شدهاند، بهروز نمیشوند؛ بنابراین کاربران غیرانگلیسی همچنان متنی با لحنی مطمئن اما اکنون نادرست میخوانند.

این مشکل واقعاً به محصول راه یافت. `oauthModal.googleOAuthWarning` هنگام اضافهشدن راهنمای ورود Antigravity (#5203) بازنویسی شد؛ **39 مورد از 43 locale** متنی را نگه داشتند که به اپراتورها میگفت «نشانی اینترنتی کامل را کپی کرده و در زیر جایگذاری کنید» — جریانی که برای آن ارائهدهنده امکان تکمیل ندارد. این مشکل تا #8463 شناسایی نشد، زیرا:

- `sync-ui-keys` فقط کلیدهای **غایب** را تکمیل میکند، نه کلیدهایی را که **کهنه** هستند؛
- `check-ui-keys-coverage` وجود کلید را میشمارد، بنابراین ترجمهٔ کهنه بهعنوان پوششیافته امتیاز میگیرد؛
- `check-translation-drift` آینههای مستندات `docs/i18n/<locale>/**.md` را دنبال میکند —
  و هرگز `src/i18n/messages/*.json` را نمیخواند. از همگامسازی مجدد 2026-09، در job `docs-sync-strict` مسدودکننده است: ویرایش یک سند اصلی → `npm run i18n:run -- --files=<doc>` (در سطح بخش و کمهزینه).

**آگاه از تفاوتها، نه متکی به baseline.** این بررسی `en.json` را در نقطهٔ ادغام پایه با درخت کاری مقایسه میکند؛ برای هر کلیدی که مقدار انگلیسی آن تغییر کرده باشد، هر localeای که همچنان ترجمهٔ دستنخورده را نگه داشته باشد، کهنه محسوب میشود. این کار عمداً بدهیهای ازپیشموجود را **منجمد میکند** — یک diff نمیتواند مشخص کند یک ترجمهٔ قدیمی از کدام انگلیسی قدیمی آمده است، بنابراین این دروازه فقط چیزی را ارزیابی میکند که تغییر فعلی آن را لمس کرده است. گزینهٔ جایگزین (یک baseline هش برای هر کلید) به فایلی تولیدشده با حجم حدود 600 KB نیاز داشت، یعنی 3 برابر بزرگترین baseline موجود، و در هر PR مربوط به i18n باعث تغییرات اضافی میشد.

برای برآوردهکردن آن، دو راه وجود دارد:

1. ترجمههای تحتتأثیر را بهروزرسانی کنید، یا
2. آنها را به `__MISSING__:<new english>` تنظیم کنید — در این حالت runtime انگلیسی اصلاحشده را ارائه میدهد (`src/i18n/request.ts::deepMergeFallback`، #7258) و کلید برای ترجمه در صف قرار میگیرد.

اگر **معنای** رشته تغییر کرده است، **تغییر نام کلید** را ترجیح دهید: یک کلید جدید نمیتواند ترجمهای کهنه را به ارث ببرد. الگوی استفادهشده در #8463 همین بود.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

اگر catalog پایه قابل خواندن نباشد، با `SKIP reason=base-unresolved` و کد خروجی 0 خاتمه مییابد (clone کمعمقی که ref پایه را ندارد) و از رفتار `check-openapi-breaking` پیروی میکند.

### Job: `i18n`

ماتریس کامل اعتبارسنجی i18n (یک job برای هر locale). کل job جنبهٔ توصیهای دارد.

| Script                          | Validates                     | Blocking                                          |
| ------------------------------- | ----------------------------- | ------------------------------------------------- |
| `validate_translation.py quick` | کاملبودن ترجمه برای هر locale | **توصیهای** (`continue-on-error: true` در کل job) |

### Job: `pr-test-policy`

فقط روی pull requestها اجرا میشود.

| Script                 | Validates                                                                                                                                            | Blocking |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRهایی که کد production را در `src/`، `open-sse/`، `electron/` یا `bin/` تغییر میدهند باید شامل تست باشند یا تستها را بهروزرسانی کنند (Hard Rule #8) | Yes      |
| `check:test-masking`   | فایلهای تست تغییریافته تعداد assert خالص را کاهش نمیدهند یا tautologyهای `assert.ok(true)` اضافه نمیکنند                                             | Yes      |
| `check:pr-evidence`    | متن PR برای تغییر، شواهد تست/VPS را ذکر میکند (Hard Rule #18 را با جستوجوی متن PR مکانیزه میکند — شکننده است، به Backlog مراجعه کنید)                | Yes      |

### Job: `test-vitest`

پس از `build` اجرا میشود. در صورت شکست، از ادغام جلوگیری میکند.

| Suite            | Validates                                                  | Blocking                                                                                                           |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | سرور MCP (110 ابزار)، autoCombo، cache — اجراکنندهٔ vitest | Yes                                                                                                                |
| `test:vitest:ui` | تستهای مؤلفههای UI — اجراکنندهٔ vitest                     | **مسدودکننده** — شکستهای ازپیشموجود صراحتاً در `vitest.config.ts` مستثنا شدهاند؛ شکستهای جدید باعث شکست job میشوند |

### گردشکارهای شبانه (زمانبندیشده، توصیهای)

اینها طبق یک برنامهٔ cron (و `workflow_dispatch`) اجرا میشوند و هرگز روی PRها اجرا نمیشوند. همهٔ آنها توصیهای هستند.

| Workflow               | Validates                                                                                                                                                        | Blocking   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | آزمونهای ویژگی fast-check با seed تصادفی + تعداد اجرای بالا                                                                                                      | **مشورتی** |
| `nightly-resilience`   | دروازهٔ رشد heap، تزریق خطای آشوب، بارگذاری/آزمون پایداری k6                                                                                                     | **مشورتی** |
| `nightly-llm-security` | محافظ تزریق promptfoo (حالت مسدودسازی) + کاوشگرهای garak (بدون secret ارائهدهنده رد میشود)                                                                       | **مشورتی** |
| `nightly-schemathesis` | fuzzing قرارداد OpenAPI (schemathesis) در برابر OmniRoute زنده با استفاده از `docs/openapi.yaml` — نقض مشخصات / خطاهای 500 مدیریتنشده را آشکار میکند (فاز 8 B.4) | **مشورتی** |
| `nightly-mutation`     | امتیاز آزمون جهش Stryker در مسیر سریع آزمونهای واحد — جهشهای باقیمانده assertهای ضعیف را آشکار میکنند                                                            | **مشورتی** |
| `nightly-compat`       | ماتریس سازگاری موتور Node در سراسر بازههای پشتیبانیشدهٔ `engines.node`                                                                                           | **مشورتی** |

خطمبناهای عملکرد (heap، TTFB، زمان ساخت) ثبت میشوند، اما مبنای مسدودسازی نیستند: به [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) مراجعه کنید (`npm run perf:lts-baseline`).

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

## خطمشی فهرست مجاز

هر دروازهای که نباید بهدلیل تخلفهای ازپیشموجود شکست بخورد، از یک فهرست مجاز ثابت استفاده میکند
(برای مثال، `KNOWN_STALE_DOC_REFS`، `KNOWN_MISSING`، `KNOWN_RAW_SQL`). خطمشی به این صورت است:

**علت ریشهای را برطرف کنید؛ فقط زمانی از فهرست مجاز استفاده کنید که تخلف از قبل وجود داشته باشد و
نتوان آن را در همان PR برطرف کرد.**

هنگام افزودن یک ورودی به فهرست مجاز:

1. دیدگاهی شامل دلیل توجیهی اضافه کنید.
2. به مسئلهٔ پیگیری ارجاع دهید (برای مثال، `// #3498 — قابلیت فاز ۲، هنوز پیادهسازی نشده است`).
3. ورودی را در همان PR که تخلف را برطرف میکند حذف کنید — ورودی منسوخی که دیگر
   یک تخلف فعال را نادیده نمیگیرد، خود یک نقص است (اجرای منسوخ 6A.3 پس از
   پیادهسازی، دروازه را بهدلیل ورودی یتیمشدهٔ فهرست مجاز ناموفق خواهد کرد).

برای سریعتر پاسشدن آزمونها، ورودی به فهرست مجاز اضافه **نکنید**. دروازهای سبز با فهرست مجازی که پیوسته
بزرگتر میشود، برداشتی کاذب از کیفیت ایجاد میکند.

### وقتی یک دروازه روی PR شما شکست میخورد

1. **خروجی دروازه را با دقت بخوانید** — دقیقاً به شما میگوید کدام فایل یا نماد
   قانون را نقض کرده است.
2. **تخلف را برطرف کنید** — بیشتر دروازهها بررسیهای قطعیِ سیستم فایل هستند که بهمحض
   صحیحشدن کد پاس میشوند.
3. **اگر تخلف از قبل وجود داشته است** (یعنی شما آن را ایجاد نکردهاید، اما دروازه اکنون
   آن را پوشش میدهد): یک ورودی فهرست مجاز همراه با دیدگاه توجیهی و یک مسئلهٔ پیگیری اضافه کنید.
4. **اگر دروازه از نوع ضامندار است** (پوشش، هشدارهای ESLint، تکرار، پیچیدگی):
   تغییر شما معیار را بدتر کرده است. مشکل زیربنایی را برطرف کنید، یا (بهندرت) اگر تغییر
   عمدی است و افت معیار پذیرفتنی است، `npm run quality:ratchet -- --update` را اجرا کنید
   — اما دلیل آن را در توضیحات PR مستند کنید.
5. **دروازههای مشورتی** (`continue-on-error: true`) صرفاً اطلاعرسان هستند — ادغام را
   مسدود نمیکنند، اما در خلاصهٔ CI ظاهر میشوند. بااینحال آنها را برطرف کنید.

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

## فهرست معوقهی منطقیسازی (بازبینی ROI — فاز 9 موج 3)

این فهرست در 2026-06-17 با `ci.yml` تطبیق داده شد (نسخهی قبلی
`audit:deps`، `check:tracked-artifacts`، `check:lockfile`، `check:licenses`،
`check:dead-code`، `check:cognitive-complexity`، `check:type-coverage`،
`check:codeql-ratchet` و `check:pr-evidence` را از قلم انداخته بود). بازبینی ROI مجموعهی
تطبیقدادهشده، گزینههای زیر را برای منطقیسازی مشخص کرد. **ادغامها تغییرات مکانیکی CI
هستند؛ تغییر وضعیتها/حذفها تصمیمهای سیاستی محفوظ برای اپراتورند.** هنوز هیچیک از موارد
زیر اعمال نشده است.

**موارد دیگری که در بالا مستند نشدهاند** (مشورتی، با سیگنال ضعیف): job مربوط به `docs-lint`
(markdownlint + Vale، با `continue-on-error` برای کل job) و workflowهای مستقل اسکنر
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. مقدار `semgrepFindings: 0` در
`quality-baseline.json` وجود دارد، اما در `ci.yml` به یک ضامن افزایشی مسدودکننده متصل
نیست — این معیار در حال حاضر بدون استفاده مانده است.

### ادغام / حذف موارد تکراری (مکانیکی، کمریسکتر)

هر گزینه در 2026-06-17 در برابر وضعیت زندهی gate اعتبارسنجی شد (اعتماد، همراه با راستیآزمایی)؛
مشخص شد چندین ادغام «بدیهی» بدهی پنهان دارند و جایگزینهای مستقیم و **پاکی نیستند**.

- **`check:docs-sync` دو بار اجرا میشود** — یک بار بهصورت مستقل در job مربوط به `lint` و بار دیگر درون `check:docs-all` (`docs-sync-strict`) و hook مربوط به pre-commit در husky. ✅ **انجام شد** — فراخوانی مستقل از `lint` حذف شد.
- **اسکن CVE** — ❌ **ادغام پاکی نیست.** `audit:deps` در صورت وجود هر CVE با شدت بالا/بحرانی، قاطعانه شکست میخورد؛ `check:vuln-ratchet` (osv) تنها در صورت وجود یک _پسرفت_ نسبت به خط مبنا شکست میخورد (در حال حاضر 1 مورد MODERATE). معناشناسی آنها متفاوت است — حذف `audit:deps` باعث از دست رفتن gate مطلق مربوط به شدت بالا/بحرانی میشود. هر دو حفظ شوند.
- **تشخیص چرخه** — ✅ **انجام شد** (#15159 G-01/G-02). متن قدیمی این بخش، `check:cycles` را gate «سبز و گزینششده» مینامید و مسدودکننده ماندن آن را با این استدلال توجیه میکرد که `check:circular-deps` (dpdm) تعداد 91 چرخه گزارش میدهد. آن وضعیت سبز، یک **سبز کاذب** بود: `check:cycles` تعداد 5 زیرشاخه (450 فایل) را اسکن میکرد، تنها با `import|export … from` ایستا تطبیق مییافت و همهی specifierهای `@/` و `@omniroute/open-sse/` را کنار میگذاشت؛ بنابراین نمیتوانست چرخههای import پویا + alias را که در مخزن غالب بودند ببیند. اصلاح شد: اکنون gate در `src` + `open-sse` پیمایش میکند (5023 فایل)، specifierها را از AST مربوط به TypeScript جمعآوری میکند (بنابراین `import("…")` محاسبه میشود، اما `typeof import("…")` در جایگاه type محاسبه نمیشود) و `paths` مربوط به tsconfig را resolve میکند. این gate **14** چرخه پیدا میکند، نه 0. از آنجا که 14 چرخهی ازپیشموجود را نمیتوان در یک PR مربوط به gate اصلاح کرد، اکنون `check:cycles` یک **ضامن افزایشی** است (`--ratchet`، سقف `metrics.cycles.value = 14` در `quality-baseline.json`، با `direction: down`) — هرگونه _پسرفت_ را مسدود میکند و تعداد چرخهها فقط میتواند کاهش یابد. CI دستور `npm run check:cycles:ratchet` را اجرا میکند. کاهش تدریجی همراه با **A-01** انجام میشود. `check:circular-deps` (dpdm) بهعنوان دیدگاه دوم و گستردهتر، مشورتی باقی میماند.
- **پیچیدگی** — ✅ **انجام شد** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): یک پیمایش ESLint، با شمارش بر اساس ruleId تا خطوط مبنای cyclomatic+max-lines و cognitive مستقل بمانند؛ `check:complexity` / `check:cognitive-complexity` منفرد برای اجرای محلی `--update` باقی میمانند.
- **ضد توهمزایی `/api`** — ✅ **انجام شد** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): یک فهرستبرداری FS از `src/app/api`؛ openapi-routes + docs-symbols همچنان مستقل گزارش میدهند؛ موارد منفرد برای اجراهای محلی باقی میمانند.
- **`check:node-runtime` در 11 job اجرا میشود** — ⚠️ **ROI پایین.** هرکدام runner جداگانهای دارند و بررسی کمتر از 1 ثانیه طول میکشد؛ صرفهجویی کل حدود 10 ثانیه است، در مقابل از دست دادن یک محافظ ارزان برای هر job. ارزش آشفتگی ناشی از تغییر را ندارد.
- **`typecheck:noimplicit:core` در lint مربوط به CI** — ✅ **از job مربوط به lint حذف شد** (مشورتی و دارای `continue-on-error` بود)؛ سطح type مسدودکننده عبارت است از `typecheck:core` + `check:type-coverage`. اسکریپت محلی حفظ شد.

### تغییر وضعیت / تصمیمگیری (سیاست اپراتور)

- `check:openapi-security-tiers` (مشورتی) — ❌ **نمیتوان وضعیت آن را بهصورت پاک تغییر داد.** با کد 0 خارج میشود، اما هشدار میدهد که چندین route مربوط به `traffic-inspector` ذیل `LOCAL_ONLY_API_PREFIXES` فاقد annotation مربوط به `x-loopback-only: true` هستند. اعمال اجباری آن مستلزم افزودن این annotationها به `openapi.yaml` است.
- `typecheck:noimplicit:core` (مشورتی) — تا حد زیادی تحت پوشش ضامن افزایشی مسدودکنندهی `check:type-coverage` قرار دارد. آن را به ضامن افزایشی تبدیل کنید یا دومین اجرای زائد `tsc` را حذف کنید.
- `test:vitest:ui` (اکنون **مسدودکننده**) — شکستهای ازپیشموجود در `vitest.config.ts` با commentهای ردیابی `// #8618` صراحتاً مستثنا شدهاند؛ شکستهای جدید باعث شکست job میشوند.
- `check:secrets` (gitleaks، ضامن افزایشی مسدودکننده که روی 3 مثبت کاذب مستندشده ثابت شده است) — آن 3 مورد را در allowlist قرار دهید تا به 0 برسد، یا آن را به حالت مشورتی تنزل دهید. با secret-scanning بومی GitHub و `check:public-creds` همپوشانی دارد.
- `check:pr-evidence` (مسدودکننده، متن بدنهی PR را با grep بررسی میکند) — ریسک مثبت کاذب بالایی دارد؛ حذف آن اجرای Hard Rule #18 را تضعیف میکند، بنابراین این مورد واقعاً یک تصمیم سیاستی است.
- `semgrep` (مستقل و مشورتی) — برای خانوادههای OWASP با CodeQL همپوشانی دارد؛ خط مبنای آن را به یک ضامن افزایشی متصل کنید یا حذفش کنید.

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
