# Self-Hosted Runner Box Operations (.113 pool) (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

مجموعهٔ self-hosted روی سرور **.113** (`tomni-proxmox-113`) اجرا میشود. از 2026-10-18، هر
runner در OmniRoute دارای **یک نقش**، یک label و بودجهٔ حافظه/CPU متناسب با بار کاری
اندازهگیریشدهٔ خود است. اسلات Turbopack منابع موردنیاز build را دریافت میکند؛ اسلاتهای دیگر براساس
بیشینهٔ مصرف اندازهگیریشدهٔ خود تخصیص یافتهاند. سرور تنها زمانی بیشتخصیص دارد که یک build با Turbopack
همزمان با یک build با webpack در Release-Green و یک job مربوط به lint اجرا شود؛ swap میزبان (16 GB)
این وضعیت را پوشش میدهد و چون Buildهای pull request بهصورت hosted اجرا میشوند، اسلات Turbopack
بیشتر اوقات بیکار است:

| runner               | label            | نقش                                                                                                                                              | `MemoryHigh` / `MemoryMax` | `CPUQuota`        |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ----------------- |
| `omniroute-113-5`    | `omni-build`     | buildهای Turbopack: `ci.yml` `Build` (فقط push/dispatch)، Docker amd64، `npm-publish`، `nightly-v4-build`، `preview-artifact`، build شبانهٔ a11y | 56 GB / 60 GB (swap 0)     | 1600 %            |
| `omniroute-113-6`    | `omni-release`   | Release-Green (`release-green` + `main-green`)، build با webpack                                                                                 | 20 GB / 24 GB (swap 4 GB)  | 800 %             |
| `omniroute-113-2`    | `omni-light`     | jobهای شبانه (Schemathesis، promptfoo، garak، k6) و `quality.yml` `lint-guard`                                                                   | 12 GB / 16 GB (swap 4 GB)  | 600 %             |
| `omniroute-113`      | `omni-light`     | همان مجموعهٔ بالا                                                                                                                                | 8 GB / 12 GB               | 400 %             |
| OmniHeuris, OmniMind | (مخزنهای خودشان) | فقط Dependabot (بیشینهٔ مصرف هرکدام 155 MB، 2026-10-18)                                                                                          | 4 GB / 6 GB                | 200 % برای هرکدام |

اندازهگیریشده در 2026-10-18:

| منبع      | مقدار                        | مفهوم آن برای زمانبندی                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 هسته**          | یک build پروداکشن با Turbopack بدون محدودیت به بیشینهٔ 49 GB رسید (`tests/unit/ci-build-bundler-webpack.test.ts`)؛ در Next 16.3.8، مرحلهٔ compile بهتنهایی حدود 40 GB اشغال میکند (36 GB از RSS در `next-build` بهعلاوهٔ 17 worker مربوط به loader با 3 GB، اندازهگیریشده در 2026-10-18)؛ یک build با webpack حدود 14–16 GB مصرف میکند. یک build با Turbopack بههمراه یک build با webpack همزمان قابل اجرا هستند؛ دو build با Turbopack قابل اجرا نیستند |
| swap      | 16 GB                        | `omniroute-113-5` با swap غیرفعال (`MemorySwapMax=0`) اجرا میشود تا یک build مهارنشده بهجای درگیرکردن swap کل سرور، هنگام رسیدن به سقف خود متوقف شود                                                                                                                                                                                                                                                                                                     |
| `/tmp`    | **12 GB tmpfs = RAM**        | هر چیزی که در آن قرار گیرد، حافظه مصرف میکند؛ باقیماندهها پس از 3 ساعت پاکسازی میشوند                                                                                                                                                                                                                                                                                                                                                                    |
| CPU       | بار 60 روی 32 هسته مشاهده شد | پیش از اعمال quotaها، یک build با Turbopack (حدود 1166 % CPU) بههمراه یک مجموعهتست coverage روی همان سرور، heartbeatهای listenerهای دیگر را از منابع محروم کرد (`The self-hosted runner lost communication`، #16853)                                                                                                                                                                                                                                     |
| runnerها  | **7 listener** (2026-10-28)  | 5 مورد OmniRoute به‌علاوهٔ OmniHeuris و OmniMind؛ `omniroute-113-7` برچسب `omni-build` را نیز دارد؛ `omniroute-113-3/-4/-8` از مخزن حذف شدند (2026-10-28)                                                                                                                                                                                                                                                                                                |

محدودیتها در `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` مربوط به هر unit
قرار دارند (مقادیر قبلی با نام `override.conf.bak-20261018` نگهداری شدهاند) و بهصورت زنده با
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` اعمال شدند — بدون restart،
بنابراین هیچ job در حال اجرایی تحت تأثیر قرار نگرفت. labelها نیز از طریق API مربوط به runnerها
تغییر داده میشوند (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) و این کار نیز بهصورت زنده انجام میشود.

## نصب پاکساز (یکبار، روی سرور)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): هر ۳۰ دقیقه، ثبت گزارش در /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

وجود `lsof` الزامی است: پاکساز پیش از حذف یک مسیر، با گرفتن یک اسنپشات از فایلهای
باز، بیاستفاده بودن آن را اثبات میکند؛ بدون این ابزار چیزی را حذف نمیکند و این موضوع را
اعلام میکند (خروجی 1). هر تغییری را ابتدا با `--dry-run` امتحان کنید — دقیقاً کارهایی را که
انجام خواهد داد چاپ میکند و به چیزی دست نمیزند.

کاری که در هر اجرا انجام میدهد: باقیماندههای خودمان (`runner-*`، `omniroute-*`،
`next-build*`، `e2e-build.tar.gz`) را پس از **۳ ساعت روی tmpfs** و ۲۴ ساعت روی
`_work/_temp` دیسکی پاکسازی میکند؛ یک `next-build` قدیمیتر از ۷۵ دقیقه را میبندد
(هیچ jobای اینقدر طول نمیکشد — در 2026-08-27، پس از آنکه GitHub، job مربوطه را
ازدسترفته اعلام کرده بود، یکی از آنها ۷۰ دقیقه اجرا شد)؛ checkoutهای ۴۸ساعتهٔ runnerهایی
را که unit آنها **متوقف است** حذف میکند؛ و دربارهٔ استفاده از دیسک ≥ ۸۵٪، مقدار
`full/avg60` در PSI حافظه ≥ ۱۰٪ و بیشتر بودن تعداد listenerها از
`MAX_ACTIVE_RUNNERS` (با تفکیک omniroute/other) هشدار میدهد. خروجی 1 = نیازمند
رسیدگی؛ گزارش را بخوانید.

قانون ۷۵ دقیقهای، buildای را که GitHub قبلاً از آن صرفنظر کرده است شناسایی نمیکند. وقتی
`Runner.Listener` نمیتواند job خود را تمدید کند، `_diag/Runner_*.log` پیام
`POST request to …/renewjob timed out after 100 seconds` را نشان میدهد، API حدود ده دقیقه
پس از آخرین تمدید موفق، وضعیت job را `completed` (ناموفق) گزارش میکند و `next-build` بدون
هیچ job متصلی به اجرا ادامه میدهد (2026-10-18: Build مربوط به #17066 در ساعت 19:43
ناموفق شد و build آن پنج دقیقه بعد همچنان ۴۰ GB را اشغال کرده بود). ref را در جدیدترین
`_diag/Worker_*.log` تأیید کنید، سپس فقط درخت build را براساس PID با SIGTERM خاتمه دهید —
`next-build`، `npm run build`، `build-next-isolated.mjs` و workerهای `_work`. هرگز به
`Runner.Listener`، `RunnerService.js` یا `Runner.Worker` دست نزنید: worker لغو شدن job
را گزارش میکند و listener خودش دوباره آنلاین میشود.

## unitهای Runner: KillMode

مقدار پیشفرض `KillMode=process` در runner باعث میشود هنگام توقف یا راهاندازی مجدد یک
unit، زنجیرهٔ `Runner.Worker → npm → next-build` زنده بماند — یک build یتیم، بدون
هیچ job متصلی، همچنان RAM و CPU مصرف میکند. هر unit مربوط به OmniRoute یک drop-in
در مسیر
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
با `KillMode=mixed` دارد: ابتدا SIGTERM برای listener و سپس در زمان `TimeoutStop`،
SIGKILL برای کل cgroup ارسال میشود. این تنظیم در راهاندازی مجدد بعدی unit اعمال میشود —
هر بار **فقط یک runner و تنها زمانی که بیکار است** راهاندازی مجدد شود؛ بررسی بیکار بودن
و راهاندازی مجدد را در یک فرمان انجام دهید.

## قواعد عملیاتی

- **در هر لحظه فقط یک build با Turbopack — اجباری از طریق label.** هر job که یک
  `next build` کامل با Turbopack اجرا میکند، `[self-hosted, omni-build]` را هدف میگیرد و فقط
  **`omniroute-113-5`** دارای این label است: `ci.yml` `Build`، `npm-publish.yml` `publish`،
  `nightly-v4-build`، `preview-artifact`، build شبانهٔ a11y (#16853) و **amd64** در
  `docker-publish.yml` (webpack درون BuildKit — اجرای 33253576569 در آنجا باعث panic در
  Turbopack شد). شاخهٔ arm64 مربوط به Docker روی `ubuntu-24.04-arm` باقی میماند.
  amd64 در `docker-publish` گروه concurrency با نام `heavy-build-main` را با `Build` در
  `ci.yml` به اشتراک میگذارد (`cancel-in-progress: false`). Docker Engine باید روی
  `omniroute-113-5` باشد. یک جایگاه دوم Turbopack در 78 GB جا نمیشود (2 × 33–37 GB بهعلاوهٔ
  باقی بار سیستم)؛ جایگاه دوم فقط برای buildهای webpack امن است.
- **Buildهای pull request روی runner میزبانیشده اجرا میشوند (2026-10-18).** `Build` در
  `ci.yml` فقط برای `push` و `workflow_dispatch` به `omni-build` میرسد؛ `Build` مربوط به هر
  `pull_request` (از مبدأ خود پروژه یا fork) و `merge_group` روی `ubuntu-latest` و با webpack
  اجرا میشود. وقتی هر PR از مبدأ خود پروژه به این جایگاه هدایت میشد، یک Build با Turbopack
  آن را بهمدت 29–58 دقیقه اشغال میکرد، 18 Build تا 18 ساعت در صف میماندند و Build مربوط
  به push خود خط انتشار فقط در یکی از 40 job به جایگاه دسترسی پیدا کرد. همان Build مربوط به
  PR روی runner میزبانیشده، در کنار سایر jobهای PR، 8–12 دقیقه طول میکشد. Turbopack، یعنی
  bundler منتشرشده توسط `npm-publish`، همچنان در خط انتشار آزمایش میشود: از طریق build شبانهٔ
  a11y روی شاخهٔ پیشفرض (04:41 UTC)، هر Build ناشی از push یا dispatch که به جایگاه برسد،
  و خود `npm-publish`. فایل `tests/unit/build/heavy-build-queue.test.ts` گیت چهارشرطی را
  تثبیت میکند.
- **هرگز جایگاه Turbopack را کوچکتر از نیاز اندازهگیریشدهٔ آن تنظیم نکنید.** در
  2026-10-18 ساعت 18:06، جایگاه از 56G/60G به 40G/44G کاهش یافت تا برای `omni-release`
  فضا ایجاد شود. مرحلهٔ compile در تمام مدت اجرای خود روی `MemoryHigh` ماند (مقدار `full`
  در memory PSI برابر 30–43 % بود) و `Runner.Listener` که cgroup مشترکی با آن داشت، نتوانست
  job خود را تمدید کند. تنظیم 56G/60G مالک که در 2026-10-17 اعمال شده بود، همان روز بازگردانده
  شد. پایینتر از این مقدار، build شکست نمیخورد؛ دچار thrashing میشود و job از دست میرود.
- **Release-Green جایگاه اختصاصی خود را دارد (2026-10-18).** تا آن زمان، هر دو اعتبارسنجی
  Release-Green روی `omni-build` اجرا میشدند: با هر push (حدود 10 بار در ساعت؛ 97 مورد از
  100 اجرای push در یک روز هنگام انجام کار لغو شدند) و سه پیمایش کامل حدوداً 2 ساعته در روز
  (پیمایش 05:29 برای دسترسی به جایگاه 6 ساعت منتظر ماند) — ظرفیت تنها جایگاه build چندین
  برابر بیش از حد اشغال شده بود و Buildهای PR از مبدأ خود پروژه ساعتها منتظر میماندند.
  اکنون `release-green` و `main-green`، `omni-release` را هدف میگیرند (فقط
  `omniroute-113-6`) و از `OMNIROUTE_USE_TURBOPACK=0` استفاده میکنند؛ همچنین اجرای آغازشده
  دیگر با push جدیدتر لغو نمیشود (جایگاه pending همچنان هجوم اجراها را ادغام میکند).
  `tests/unit/build/runner-capacity-routing.test.ts` مسیریابی، سوییچ webpack و این شرط را
  تثبیت میکند که هیچچیز روی `omni-release` با Turbopack build نشود.
- **pool سبک: `omni-light`.** `omniroute-113` و `omniroute-113-2` اجراهای شبانهای را انجام
  میدهند که به یک `next build` فقط برای backend نیاز دارند (حدود 5–6 GB؛ با webpack)،
  بههمراه `lint-guard` در `quality.yml`. برای `omniroute-113` تا
  2026-10-18 مقدار `MemoryHigh=4G` تنظیم شده بود — build مربوط به promptfoo بهمدت 54 دقیقه تحت بازیابی مداوم حافظه
  پیش رفت؛ 8 GB این throttling را برطرف میکند.
- **تعداد کمتر listenerها عمدی است.** چهار unit مربوط به OmniRoute در 2026-08-29 غیرفعال
  شدند — هر listener اضافی، مصرفکنندهٔ دیگری برای بودجهٔ حافظهٔ بالا است. سقف نظافتگر 8
  است (`MAX_ACTIVE_RUNNERS=8` در cron): این مقدار همهٔ `Runner.Listener`های روی سیستم را
  میشمارد و OmniHeuris + OmniMind نیز دو مورد به پنج مورد ما اضافه میکنند.
- **کارهای Unit و Vitest میزبانی‌شده باقی می‌مانند.** `ci.yml` شاردهای unit و کار Vitest خود را فقط زمانی به `[self-hosted, omni-ci]` می‌فرستد که متغیر مخزن `vars.USE_VPS_TEST_RUNNER` برابر `true` باشد، و حتی در آن صورت فقط برای اجراهای `pull_request` از همان مخزن؛ forkها، `merge_group` و pushها روی `ubuntu-latest` می‌مانند (`tests/unit/vps-runner-variable-scope.test.ts`). این متغیر `false` است. در 2026-10-28 سه listener چهارهسته‌ای `omni-ci` برای `npm ci` بین 250 تا 270 ثانیه زمان گرفتند و هر شارد unit به سقف 30 دقیقه‌ای کار رسید، در حالی که یک شارد میزبانی‌شده حدود 634 ثانیه طول می‌کشد؛ بار سیستم در آن زمان 17 تا 24 بود. این listenerها حذف شدند. تا زمانی که listenerهایی متناسب با یک شارد unit وجود ندارد، این متغیر را دوباره روشن نکنید.
- **هنگامی که هر runner مشغول است، هرگز `/tmp` یا `_work` را دستی پاک نکنید.** انجام
  بررسی و سپس حذف با فاصلهٔ زمانی میان این دو، باعث شد یک job فعال Build در 2026-08-27
  دایرکتوری `_work` خود را از دست بدهد. نظافتگر بررسی و حذف را در یک مرحله انجام میدهد؛
  اجازه دهید خودش این کار را انجام دهد.
- متوقفکردن runner در میانهٔ job باعث لغو job میشود (بهصورت زنده مشاهده شده است):
  `systemctl stop` را فقط زمانی اجرا کنید که listener آن هیچ فرزند `Runner.Worker`ای نداشته
  باشد — و این کار را با یک command انجام دهید.
- workflowها نباید آرتیفکتها را در `/tmp` نگه دارند (این مسیر در RAM است). آنها را در
  `$RUNNER_TEMP` دانلود کنید (برای هر runner روی دیسک قرار دارد) — انتقال آرتیفکت 1.3 GB
  با نام `next-build` به tmpfs حدود 27–32 دقیقه طول کشید، درحالیکه upload آن از دیسک
  2 دقیقه زمان برد.
- VPS با آدرس `.15` فقط برای homologation است — هرگز runnerهای CI را اجرا نمیکند.

## مسیر میزبانیشده (اجراکنندههای میزبانیشده توسط GitHub)

این مخزن متعلق به سازمان `cheaper-inference` و روی طرح **Team** است: **60 کار میزبانی‌شدهٔ همزمان** که میان همهٔ مخزن‌های سازمان، همهٔ بررسی‌های PR، همهٔ گردش‌کارهای فعال‌شده با push و پیکربندی پیش‌فرض CodeQL مشترک‌اند. ارقام زیر روی طرح **Pro** (40 کار میزبانی‌شدهٔ همزمان) اندازه‌گیری شده‌اند. طبق اندازهگیری در 2026-10-18 طی یک
کارزار ادغام (~10 ادغام در ساعت روی `release/v3.8.52`): در مدت
24 ساعت **2,500 اجرای گردشکار ایجاد شد**، طی 6 ساعت 44 بار push به شاخه انجام شد و درحالیکه بررسیهای PR
ساعتها منتظر ماندند و PRها بدون آنها ادغام شدند، **106 کار میزبانیشده در صف قرار گرفت**. در هر push به این شاخه، نُه گردشکار اجرا میشد:

| بهازای هر push به `release/v*`              | کارهای میزبانیشده | نتیجه در زمان هجوم                                                     | از 2026-10-18                                                                         |
| ------------------------------------------- | ----------------: | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `ci.yml` (ماتریس کامل)                      |             تا 30 | با push بعدی لغو شد؛ 24 مورد از 24 مورد در یک روز                      | در pushهای `release/**` آغاز نمیشود (اجرای PR + Release-Green)                        |
| `quality.yml`                               |                ~6 | لغو شد؛ 23 مورد از 23 مورد                                             | در pushهای `release/**` آغاز نمیشود                                                   |
| `Release-Green` `--quick`                   |                 0 | روی `omni-build` اجرا شد؛ 97 مورد از 100 مورد لغو شد                   | شکاف `omni-release`، هرگز لغو نمیشود، اجرای معلق ادغام میشود                          |
| `Lock released branch`، `OpenSSF Scorecard` |                 2 | بهازای هر push یک اجرا در صف قرار گرفت                                 | یک اجرا بهازای هر ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)            |
| `Release acceptance` (گزارش سایه)           |                 1 | بهازای هر push یک `npm ci` میزبانیشده؛ هرگز لغو نشد                    | بدون تغییر — نامزد استفاده از فیلتر `paths:`                                          |
| `Publish to Docker Hub` → `Deploy to VPS`   |                 2 | بهازای هر push لغو شد؛ بخش amd64 روی `omni-build` رقابت میکند          | بدون تغییر — کانال استقرار مالک                                                       |
| پیکربندی پیشفرض CodeQL (`dynamic`)          |                 4 | بهازای هر push، `javascript-typescript`، `actions`، `c-cpp` و `python` | بدون تغییر — Settings → Code security؛ `c-cpp`/`python` در اینجا چیزی را اسکن نمیکنند |

`tests/unit/build/push-storm-diet.test.ts` محرک push صرفاً برای `main` در `ci.yml` و
`quality.yml` را تثبیت میکند. پیامد جانبی: Codecov دیگر بهازای هر push انتشار، بارگذاری پایه دریافت نمیکند (این
مرحله صرفاً اطلاعرسانی است و `continue-on-error` دارد)؛ دروازهٔ پوشش درون مخزن و دیدگاه PR
تحت تأثیر قرار نمیگیرند.

**ظرفیت بیشترِ خودمیزبانیشده، صف میزبانیشده را اصلاح نمیکند.** devbox
(`devbox-vm-06-dev002`، 24 vCPU / 54 GB) میتواند میزبان یک اجراکننده باشد، اما نشستهای عامل از قبل
بار آن را روی 20 تا 26 نگه میدارند، کانتینر عامل فاقد daemon مربوط به Docker است و مسیر اشباعشده
همان مسیر میزبانیشده است. دستگاه `.113` در همان لحظه 71 GB فضای آزاد و بار 5 تا 8 داشت؛ محدودیت آن
بودجهٔ حافظه بهازای هر listener ذکرشده در بالا است (حداکثر 6 listener)، نه CPU. اهرمهای باقیمانده
فرایندی هستند: PRهای کارزار را از طریق صف Mergify ادغام کنید (`label=queue`، دستهها بهجای یک اجرا برای هر PR
بهعلاوهٔ یک اجرا برای هر push، یک اجرای CI مشترک `merge_group` دارند)، زبانهای پیکربندی پیشفرض CodeQL
را کاهش دهید و `release-acceptance.yml` را بر اساس فایلهایی که میخواند فیلتر کنید.
