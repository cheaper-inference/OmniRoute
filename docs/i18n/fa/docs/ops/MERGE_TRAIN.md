# Merge Queue & Manual Merge-Train Runbook (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## فرود آمدن روی شاخه رهاسازی

omni-queue بر فرودها در `release/vX.Y.Z` حاکم است. قبل از فرود PR `mode` سطح بالا را در `config/merge-queue/config.json` در شاخه پیش فرض بخوانید. [Omni-Queue](OMNI_QUEUE.md) را ببینید.

- **`shadow`** اعتبار سنجی را اجرا می کند و فرود را به ادغام دستی واگذار می کند. `omni-queue` به PR تایید شده در سر نهایی آن اعمال کنید. واجد شرایط بودن را با `npm run queue -- why <PR>` بررسی کنید. منتظر حکم اون سر در `npm run queue -- history --base <branch>`. `would-land` را ادامه دهید. در `culprit-found` یا `would-dequeue`، ادغام را نگه دارید و علت را برطرف کنید.
- **استثناهای سایه** قطاری با CI کامل سبز در برابر نوک پایه فعلی می تواند بدون حکم صف جداگانه حرکت کند. همین استثنا زمانی اعمال می شود که سر PR از قبل حاوی نوک پایه فعلی باشد.
- **`live`** از برچسب `omni-queue` برای شروع فرود استفاده می کند. صف به تنهایی PR را فرود می آورد. دستورات ادغام و فشارهای مستقیم را به صف بگذارید.

هر فرود نیاز به مجوز مالک و بررسی های لازم دارد. استفاده از `omni-queue` فقط پس از مجوز فرود توسط مالک. لمس کردن مسیرهای محافظت شده PRs در صف نیز به تصمیم `protected-approved` مالک برای آن PR نیاز دارد.

مجموعه قوانین "Require green gates on the active release" به `Gate / CI` سبز و `Gate / Quality` روی سر نیاز دارد. هرگز `--admin` برای دور زدن دروازه قرمز استفاده نکنید. بلوکهای فریز آزاد در شاخه یخزده ادغام میشوند. به [قانون سخت 21](HARD_RULES_DETAIL.md) مراجعه کنید. هرگز به درخواست pull برچسب نزنید، ادغام نکنید یا به آن فشار ندهید که جلسه دیگری کار می کند. [قانون سخت 22 را](HARD_RULES_DETAIL.md) ببینید.

## درخواست کشش قطار

1. یک شاخه قطار را در نوک پایه آزادسازی فعلی راه اندازی کنید. هدهای اعضای تایید شده دقیق را با استفاده از commit های ادغام ادغام کنید. با اجتناب از اسکواش و ریبس، سابقه ارتکاب آنها را حفظ کنید.
2. یک درخواست کششی برای شاخه قطار باز کنید. آن PR با CI کامل خود در نوک پایه فعلی تأیید کنید. نوک پایه و سرهای اعضای تایید شده را قبل از فرود دوباره بررسی کنید. هنگامی که نامزد تأیید شده تغییر کرد، قطار و CI آن را تازه کنید.
3. قطار PR با یک تعهد ادغام در حالت صف قابل اجرا فرود آورید. در حالت زنده، روش فرود `merge-ff` صف، تعهدات ادغام را حفظ می کند. سرهای اعضای اصلی از شاخه انتشار قابل دسترسی هستند. GitHub عضو PRs را به عنوان ادغام شده علامت گذاری می کند و commit ها نویسندگان خود را حفظ می کنند.

مصداق عام [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071) است. این 18 عضو PRs را ترکیب کرد و با یک تعهد ادغام در 24-11-2026 فرود آمد.

یک همگامسازی از `main` به شاخه انتشار بعدی نیز از طریق یک commit ادغام فرود میآید. حفظ اصل و نسب `main` برای همگام سازی های بعدی مورد نیاز است. به [جداسازی درخت کاری](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash) مراجعه کنید.

## اعتبار سنج محلی ادغام قطار

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

اعتباردهنده پایه و سرهای PR را می آورد و آنها را در یک درخت کاری یکبار مصرف ترکیب می کند. مجموعه برابری خود را یک بار روی درخت حاصل اجرا می کند. یک تداخل واکشی یا ادغام سر ناموفق آن PR را خارج می کند و اسکریپت با PRs باقی مانده ادامه می یابد.

- **`--plan`** مراحل حالت انتخاب شده را چاپ می کند و بدون ایجاد درخت کاری یا تماس با کنترل از راه دور خارج می شود. آن را با `--fast` ترکیب کنید تا طرح سریع را بررسی کنید.
- **`--fast`** گیتهای استاتیک رایج، فایلهای `node:test` تغییر یافته انتخاب شده را تحت `tests/unit/` و `npm run test:vitest` اجرا میکند. هنگام استفاده از حالت سریع، حداقل یک بار در روز یک اعتبار سنجی کامل محلی را روی نوک انباشته شده اجرا کنید.
- **حالت کامل** فقط دروازه های استاتیک را اضافه می کند و `npm run test:unit` و `npm run test:vitest` را اجرا می کند.

در صورتی که پروب پایه در دسترس باشد، یک گیت استاتیک معیوب روی پایه دست نخورده اجرا می شود. اسکریپت خرابیهای موروثی را گزارش میکند و زمانی ادامه مییابد که هر خط نقض شناسایی شده نیز در پایه ظاهر میشود و تعداد کل افزایش نیافته است.

| خارج شوید | معنی                                                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `0`       | طرح را چاپ کرد یا مجموعه را تکمیل کرد. خلاصه مجموعه هرگونه خرابی استاتیک ارثی و PRs خارج شده را فهرست می کند.                |
| `1`       | آرگومانهای نامعتبر، عدم تسویه حساب Git، پیش از پرواز ناموفق، یا سوار نشدن PR.                                                |
| `2`       | چک مجموعه ناموفق بود و واجد شرایط ارثی نبود. اپراتور می تواند دسته را به دو نیم کند، PR متخلف را خارج کند و دوباره اجرا کند. |

یک مجوز محلی فقط برای پرونده مالک شواهد تشخیصی ارائه می کند. هر فرود همچنان به مجوز مالک، بررسی های مورد نیاز خود، و حکم صف سایه در صورت لزوم نیاز دارد.

## طبقه بندی

- **پر PR.** CI و Quality چک ها را بر اساس مسیرهای تغییر یافته انتخاب می کنند. کد PRs گیتهای با کیفیت سریع و تستهای ضربهخورده را با واحدهای جداگانه و کارهای Vitest در CI اجرا میکند.
- **هر نامزد صف.** CI و Quality نمایه کامل کاندیدای تشکیلدهنده را در مرجع صف آن اجرا میکنند.
- **در هر نوک انتشار.** Release-Green روی فشارهایی که با فیلترهای مسیرش مطابقت دارند، دروازههای سخت سریع اجرا میکند. سه اجرا برنامه ریزی شده در روز از جاروی کامل برای شاخه انتشار استفاده می کنند.
- **در هر انتشار.** ماتریس کامل CI شامل خردههای E2E ، اعتبار سنجی بسته، دود چکمههای tarball و بررسیهای پوشش است. [چک لیست انتشار را](RELEASE_CHECKLIST.md) ببینید.

## پیش نیازهای تسویه حساب تازه برای `merge-train.sh`

پیش از پرواز قبل از ایجاد درخت کار اجرا می شود. وابستگی ها را با `npm ci` نصب کنید. تأیید کنید که `node_modules/.bin/tsc` قابل اجرا است و `node_modules/node_modules` وجود ندارد. بررسی کنید که `node_modules/.bin/bun --version` موفق باشد.

اگر پس از نصب Bun نادیده گرفته شد، `(cd node_modules/bun && node install.js)` را اجرا کنید. ثبات ارائه دهنده و بررسی نمادهای شناخته شده از Bun استفاده می کند. اعتباردهنده `npm run check:cycles:ratchet` به عنوان یک دروازه مسدود کننده اجرا می کند. دستور مستقل `npm run check:cycles` مشاوره ای است.

## تاریخچه

صف ادغام Mergify در 19/11/2026 بازنشسته شد.
