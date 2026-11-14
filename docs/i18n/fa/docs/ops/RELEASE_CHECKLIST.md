# Release Checklist (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **آخرین بهروزرسانی:** 2026-08-28 — v3.8.51
> فرایند انتشار سادهسازیشده که از مهارتهای Claude Code برای خودکارسازی استفاده میکند.
>
> **بین انتشارها صف/شاخه را سبز نگه دارید:** به [RELEASE_GREEN.md](./RELEASE_GREEN.md) مراجعه کنید
> (خانوادهٔ `/green-prs` + `npm run check:release-green` + `/babysit` + اجرای شبانه). اجرای
> دورهای این فرایند — و بهویژه **پیش از** این چکلیست — باعث میشود PR انتشار از ابتدا سبز باشد.

## خلاصه

```bash
# 1. افزایش نسخه + تولید CHANGELOG (مهارت)
/version-bump-cc patch    # یا minor/major

# 2. اجرای دروازهٔ کیفیت بهصورت محلی
npm run check              # lint + تستها
npm run test:coverage      # دروازهٔ کامل پوشش (60/60/60/60)

# 3. ساخت و آزمون دود
npm run build
npm run test:e2e           # اختیاری، اما توصیهشده

# 4. تولید انتشار (مهارت)
/generate-release-cc

# 5. استقرار (مهارت)
/deploy-vps-both-cc        # یا akamai-cc / local-cc

# 6. ثبت شواهد انتشار (مهارت)
/capture-release-evidences-cc
```

## انتشار مورد اعتماد npm (پیشفرض از v3.8.51) — مرحلهای در صورت درخواست، مستقیم بهعنوان راهکار جایگزین

`npm-publish.yml` بهطور پیشفرض از طریق **انتشار مورد اعتماد npm (OIDC)** منتشر میکند:
کار `stage-npm` (میزبانیشده توسط GitHub)، id-token گیتهاب را با یک اعتبارنامهٔ کوتاهعمر npm
برای همان اجرا مبادله میکند — بدون توکن بلندعمر npm در اسرار مخزن، بدون درخواست 2FA و همراه با منشأ قابلاثبات.
اکنون که توکنهای دورزنندهٔ 2FA در حال بازنشستهشدن هستند، این همان سازوکار دورزدن مورد تأیید npm است؛
این روش، ضمن حفظ تضمین WS1.3، فرایند کاملاً خودکاری را که پروژه تا v3.8.48 داشت بازیابی میکند
(یک توکن افشاشده بهتنهایی نمیتواند منتشر کند — زیرا اصلاً توکنی وجود ندارد).

**راهاندازی یکباره (مالک):** npmjs.com → بستهٔ `omniroute` → Settings → _Trusted
Publisher_ → GitHub: مالک `diegosouzapw`، مخزن `OmniRoute`، گردشکار `npm-publish.yml`
(محیط: هیچکدام). تا زمانی که این تنظیم وجود نداشته باشد، گام خودکار با `ENEEDAUTH` شکست میخورد:
دوباره با `publish_mode=staged` (در ادامه) یا `direct` اجرا کنید.

### انتشار مرحلهای (در صورت درخواست — `publish_mode=staged`)

گردشکار npm-publish دیگر مستقیماً منتشر نمیکند: tarball بستهبندیشده را
راهاندازی میکند (`check:pack-boot`) و سپس `npm stage publish` را اجرا میکند — دقیقاً همان بایتها
در رجیستری نگهداری میشوند و تا زمانی که مالک تأیید نکند، **قابل نصب نیستند**. دروازهٔ انسانی 2FA
به بعد از اثبات منتقل شده است، نه پیش از آن.

**فرایند مالک پس از سبزشدن گردشکار:**

1. `npm stage list omniroute` — شناسهٔ مرحله را پیدا کنید (در خلاصهٔ گردشکار نیز نمایش داده میشود).
2. بایتهای مرحلهبندیشده را بررسی کنید (توصیه میشود): `npm stage download <id>`، سپس
   tarball دانلودشده را در یک پیشوند موقت نصب و راهاندازی کنید (`npm run check:pack-boot`
   همان نتیجهگیری pack→install→boot را در CI خودکار میکند).
3. `npm stage approve <id>` — درخواست 2FA همان انتشار است. `npm stage reject <id>` آن را حذف میکند.
4. شبکهٔ ایمنی پس از انتشار: تأییدکنندهٔ پس از انتشار (WS1.4 از برنامهٔ v3.8.49)،
   نسخهٔ منتشرشده را از رجیستری عمومی در یک کانتینر پاک نصب و راهاندازی میکند.

**راهکار اضطراری جایگزین:** `workflow_dispatch` با `publish_mode=direct`،
رفتار قدیمی و فوری `npm publish` را بازمیگرداند (فقط زمانی استفاده کنید که خود مرحلهبندی درست کار نمیکند؛ دلیل را ثبت کنید).

**سختسازی یکباره (مالک، npmjs.com):** Trusted Publisher را برای
`omniroute` در حالت فقط مرحلهای پیکربندی کنید تا یک توکن بلندعمر افشاشده نتواند
از هیچجا مستقیماً `npm publish` را اجرا کند — CI فقط میتواند مرحلهبندی کند؛ تنها 2FA مالک انتشار را انجام میدهد.

**راهنمای عملیاتی آرتیفکت خراب (بدون تغییر):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
واکنش پیشفرض باشد (چند دقیقه، برگشتپذیر)؛ از `npm unpublish` فقط در بازهٔ 72h/بدون وابستگان
استفاده کنید و هرگز آن را نخستین اقدام قرار ندهید. Docker: هرگز یک برچسب نسخه را بازنویسی نکنید — بازگشت
یعنی اشارهدادن دوبارهٔ `latest` به آخرین digest سالم.

**`latest` در Docker Hub (برای هر انتشار پایدار SemVer الزامی است):**
گردشکار `docker-publish` باید **هر دو** برچسب `X.Y.Z` و، هنگامی که
`should-promote-latest.sh` تأیید میکند این نسخه بالاترین SemVer پایدار است، `:latest`
را با **digest یکسان** اعمال کند. پس از پایان کار: digest مربوط به `latest` در Hub با digest نسخهٔ جدید
SemVer برابر است و `last_updated` تغییر کرده است. در حالی که یادداشتهای انتشار دربارهٔ اصلاحاتی صحبت میکنند
که فقط در git وجود دارند، `:latest` را روی یک ساخت قدیمی باقی نگذارید. راهاندازیهای سریع Compose
از `:latest` استفاده میکنند؛ GitOps باید همچنان `X.Y.Z` را پین کند. به
[کانالهای انتشار Docker](../guides/DOCKER_GUIDE.md#release-channels) و #10317 مراجعه کنید.

## مسیر سریع اصلاح فوری (برچسب `hotfix`)

یک PR با برچسب `hotfix` از ماتریس سنگین CI (آزمون E2E با ۹ شارد، رچت پوشش،
quality-gate، quality-extended) عبور میکند و گیتهای سریع و پُرسیگنال را نگه میدارد: ساخت،
شاردهای واحد، یکپارچهسازی، vitest، lint/typecheck، docs-sync، `check:pack-artifact`
و آزمون دودِ راهاندازی tarball (`check:pack-boot`). هدف: سبز شدن در ≤15min بهجای ~33min.

**سیاست ورود — هر چهار مورد الزامیاند (با الگوبرداری از مسیرهای اضطراری Chromium/VS Code/Node):**

1. **شدت**: محیط تولید خراب است — یک آرتیفکت منتشرشده هنگام راهاندازی کرش میکند / یک
   اصلاح امنیتی / همه کاربران نسخه تحت تأثیر هستند. «مهم» بهمعنای «خراب» نیست.
2. **اختیار**: فقط مالک مخزن برچسب `hotfix` را اعمال میکند. خودِ برچسب همان
   تأیید است — هرگز در یک PR کارزاری بهصورت خودسرویس از آن استفاده نکنید.
3. **شواهد**: بدنه PR به اجرای سنگین قبلی که کاملاً سبز بوده است (مجموعهای که
   jobهای ردشده دوباره اعتبارسنجی میکردند) و نیز آزمون خودِ اصلاح که ابتدا شکست خورده و سپس موفق شده، پیوند میدهد.
4. **دامنه**: فقط cherry-pick — حداقل اصلاح ممکن، بدون بازآرایی و بدون تغییرات جانبی.

سطح پوشش/رچت ردشده در اجرای کامل بعدی روی
شاخه انتشار دوباره اعتبارسنجی میشود (سبز ماندن پیوسته انتشار) — این مسیر فقط انتظار را حذف میکند، نه اعتبارسنجی را.
تفاوتهای فقط-آزمون (همه فایلها زیر `tests/` و هیچکدام زیر `tests/e2e/`) بهطور خودکار و
بدون هیچ برچسبی از ماتریس E2E عبور میکنند.

## چک لیست تفصیلی

### پیش از انتشار

- [ ] همه PRs هدف این نسخه با `release/vX.Y.0` ادغام شدند
- [ ] همه موارد Linear/issue باز برای این نسخه بسته شده یا به نقطه عطف بعدی منتقل می شوند
- [ ] CI سبز روی شاخه `release/vX.Y.0`
- [ ] هیچ نشانگر `TODO(release)` در کد: `grep -r "TODO(release)" src/ open-sse/` وجود ندارد
- [ ] تصویر پایه Docker به روز (در حال حاضر `node:24.15.0-trixie-slim`)

### نسخه و تغییرات

- [ ] اجرای `/version-bump-cc <patch|minor|major>` (مهارت کد Claude )
  - برآمدگی `package.json`, `electron/package.json`
  - از آخرین تگ، `CHANGELOG.md` از commit های git بازسازی می کند
  - نشان های README.md را به روز می کند
- [ ] به صورت دستی CHANGELOG.md بررسی کنید و در صورت نیاز پیام های commit را پاک کنید
- [ ] اطمینان حاصل کنید که آخرین بخش semver در `CHANGELOG.md` برابر با نسخه `package.json` است
- [ ] `## [Unreleased]` به عنوان اولین بخش تغییرات برای کارهای آینده نگه دارید
- [ ] به روز رسانی `docs/openapi.yaml` → `info.version` باید با نسخه `package.json` برابری کند

### کیفیت کد

- [ ] خطاهای `npm run lint` — 0 (هشدارها از قبل وجود دارند)
- [ ] `npm run typecheck:core` — پاک
- [ ] `npm run typecheck:noimplicit:core` — تمیز (سخت)
- [ ] `npm run check:cycles:ratchet` — در سقف `metrics.cycles` منجمد ( `check:cycles` خالی از 1 در هر چرخه خارج می شود، #15281)
- [ ] `npm run check:any-budget:t11` — در حد بودجه
- [ ] `npm run check:route-validation:t06` — پاک
- [ ] `npm run check:node-runtime` — کف زمان اجرا پشتیبانی میشود (`>=22.22.2 <23`، `>=24.0.0 <27`، هر `SUPPORTED_NODE_RANGE` در `src/shared/utils/nodeRuntimeSupport.ts`؛ تراز با `package.json` `engines`)

### تست کردن

- [ ] پاس `npm run test:unit` —
- [ ] پاس `npm run test:vitest` — (سرور MCP ، autoCombo، کش)
- [ ] `npm run test:coverage` — gate 60/60/60/60 راضی (statements/lines/functions/branches)
- [ ] پاس `npm run test:integration` — (در صورت تغییر DB / handlers را لمس کنید)
- [ ] پاس `npm run test:combo:matrix` — (ماتریس استراتژی ترکیبی: تصمیمات انتخابی 22 استراتژی مسیریابی عمومی را به طور قطعی ثابت می کند؛ هنگام لمس مسیریابی ترکیبی، وضوح استراتژی یا منطق بازگشتی اجرا می شود)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (دود واقعی بالادستی دردار؛ یک عکس فوری DB فقط خواندنی از VPS `root@192.168.0.15` تهیه میکند؛ به ارائهدهندگان واقعی ضربه میزند، اعتبار هزینه میکند؛ هرگز در CI اجرا نمیشود؛ بدون گیت بهطور تمیز رد میشود)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 سناریو HTTP علیه سرور `.15` زنده از طریق Node ESM ساده؛ به `ssh root@192.168.0.15` نیاز دارد؛ creates/deletes فقط ترکیبهای ترکیبی `__live_test__*` ؛ به ارائهدهندگان واقعی ضربه میزند؛ هرگز در CI اجرا نمیشود)
- [ ] پاس `npm run test:e2e` — (تغییر UI )
- [ ] پاس `npm run test:protocols:e2e` — (تغییر MCP/A2A )
- [ ] پاس `npm run test:ecosystem` —

### قلاب (هاسکی تایید شده)

قلاب هاسکی در `.husky/` زندگی می کنند و به طور خودکار در عملیات git اجرا می شوند.

- **پیش تعهد:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **پیش فشار:** دروازه های قطعی سریع — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (فعال شد 13-06-2026). عمدا `test:unit` استثنا می کند (آهسته؛ تحت پوشش کار CI `test-unit` ).
  - قبل از فشار دادن شاخه های آزاد، `npm run test:unit` به صورت دستی اجرا کنید.

اگر یک قلاب خراب شد: مشکل اساسی را برطرف کنید، با `--no-verify` دور نزنید.

### تعهدات متعارف

همه کامیت های آزادسازی باید از فرمت `type(scope): subject` پیروی کنند.

**انواع معتبر:** `feat`، `fix`، `refactor`، `docs`، `test`، `chore`، `perf`، `style`، `ci`

**دامنه های معتبر:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci` `authz` `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`

تغییرات شکستن: فوتر `BREAKING CHANGE:` یا `!` را بعد از محدوده اضافه کنید (مثلا `feat(api)!: drop /v0`).

### مستندات

- [ ] پاسهای `npm run check:docs-sync` (اجرای خودکار با پیشارتکاب)
- [ ] پاسهای `npm run check:docs-all` (چتر: docs-sync + docs-counts + env-doc-sync + منسوخ شده-نسخههای + doc-links)
- [ ] `npm run check:env-doc-sync` خارج شد 0 کد — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env قرارداد دست نخورده است
- [ ] `npm run check:doc-links` از 0 — خارج می شود، پس از بازسازی، هیچ مرجع نشانه گذاری داخلی شکسته ای وجود ندارد
- [ ] `docs/architecture/ARCHITECTURE.md` برای storage/runtime drift بررسی شد
- [ ] `docs/guides/TROUBLESHOOTING.md` برای env var و عملیات رانش بررسی شد
- [ ] اگر `.env.example` تغییر کرد: `docs/reference/ENVIRONMENT.md` به روز شد
- [ ] اگر ویژگی جدید UI داشته باشد: `docs/guides/USER_GUIDE.md` آن را ذکر می کند
- [ ] اگر ویژگی جدید API دارد: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` به روز شده است
- [ ] اگر ویژگی جدید یک ماژول است: `docs/<MODULE>.md` اختصاصی وجود دارد
- [ ] اگر تغییر تغییر کند: `docs/guides/TROUBLESHOOTING.md` دارای یادداشت مهاجرت است

### i18n

- [ ] `npm run i18n:check` از حالت ترجمه 0 — (`.i18n-state.json`) در هماهنگی با اسناد منبع خارج می شود (هیچ منبع جابجایی در حالت سختگیرانه وجود ندارد؛ توصیه حالت هشدار برای لمس اسناد لحظه آخری قابل قبول است، اما باید قبل از برچسب زدن 0 باشد)
- [ ] `npm run i18n:check-ui-coverage` 0 — در هر منطقه UI در سطح پوشش 80٪ یا بالاتر از آن خارج می شود
- [ ] `npm run i18n:sync-ui:dry` 0 کلید گم شده را در تمام 66 منطقه هدف گزارش می کند (هر محلی به جز منبع `en` )
- [ ] اگر اسناد انگلیسی منبع تغییر کرد، `npm run i18n:run` اجرا کنید ( `OMNIROUTE_TRANSLATION_API_KEY` در `.env` نیاز دارد) قبل از برچسب زدن
- [ ] اگر جزئی باشد، میتوان مشارکتهای ترجمه را به نسخه بعدی موکول کرد (آهنگ در CHANGELOG)

### مهاجرت های پایگاه داده

- [ ] اگر `src/lib/db/migrations/` فایل های جدیدی دارد:
  - [ ] هر هجرت ناتوان است (`CREATE TABLE IF NOT EXISTS`و غیره)
  - [ ] مهاجرت های پیچیده در معاملات
  - [ ] شماره گذاری صحیح (بدون شکاف در ترتیب)
- [ ] تست در نصب تازه: `~/.omniroute/omniroute.db` حذف کنید و `npm run dev` را اجرا کنید
- [ ] آزمایش در نصب موجود: پشتیبان گیری از DB، اجرای مهاجرت، تأیید طرح
- [ ] اگر مهاجرت جداول را بازنویسی کند، فایلهای WAL (`-wal`، `-shm`) به درستی مدیریت میشوند

### کاتالوگ ارائه دهنده (تأیید شده توسط Zod)

- [ ] طرح `src/shared/constants/providers.ts` Zod در زمان بارگذاری معتبر است
  - [ ] همه ارائه دهندگان دارای فیلدهای الزامی هستند (`id`، `label`، `kind`، و غیره)
  - [ ] `freeNote` برای ارائه دهندگان رایگان جدید ارائه شده است
  - [ ] ارائه دهندگان OAuth `oauthConfig` را در `src/lib/oauth/constants/oauth.ts` ثبت کرده اند
- [ ] اگر ارائه دهنده جدید اضافه شود: مجری مربوطه در `open-sse/executors/`
- [ ] اگر فرمت OpenAI نیست: مترجم در `open-sse/translator/`
- [ ] مدل های ثبت شده در `open-sse/config/providerRegistry.ts`
- [ ] تست های واحد در طبقه بندی و مسیریابی ارائه دهنده پوشش `tests/unit/`

### رومیزی (Electron)

اگر `electron/` تغییر کرد:

- [ ] `npm run electron:smoke:packaged` می گذرد
- [ ] ساختها برای حداقل یکی از `:win`، `:mac`، `:linux` آزمایش شدهاند
- [ ] گواهی امضای کد منقضی نشده است (در صورت امضا)
- [ ] نسخه `electron/package.json` با ریشه `package.json` مطابقت دارد
- [ ] بهروزرسانی خودکار نشانگر کانال در صورت انتشار به `stable` بهروزرسانی شد

### Build Layout

مخزن از سه دایرکتوری خروجی مجزا استفاده می کند — هرگز آنها را با هم مخلوط نمی کند:

| دایرکتوری | هدف                                                      | پیگیری شد؟            |
| --------- | -------------------------------------------------------- | --------------------- |
| `src/`    | منبع برنامه (TypeScript / TSX)                           | بله                   |
| `.build/` | ساخت واسطه های خروجی — `next build` (`distDir`)          | نه (نادیده گرفته شده) |
| `dist/`   | بسته npm قابل حمل — مونتاژ شده توسط `assembleStandalone` | نه (نادیده گرفته شده) |

> **یادداشت اپراتور:** فهرست راه دور تصویر VPS `/usr/lib/node_modules/omniroute/app/` باقی می ماند. فقط** در مخزن** خروجی ساخت منتقل شد (`app/` → `dist/`). استقرار مهارتها محتویات `dist/` را در راه دور `app/` dir — بدون تغییر مسیر VPS مورد نیاز است.

**جریان تک ساخت:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

NOT اجرا کنید `npm run build` و به دنبال آن یک `npm run build:cli` جداگانه برای استقرار — استفاده کنید `npm run build:release` که یک بازسازی تمیز نگهبان + در یک دستور انجام می دهد.

### اعتبار سنجی مصنوع

- [ ] `npm run build:release` موفق می شود و `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` تمیز — بدون `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, یا باقی مانده های محلی دیگر
- [ ] `dist/server.js` بعد از ساخت وجود دارد
- [ ] دود بسته بندی شده محلی اختیاری در زمان اجرا: `npm run dev:candidate -- validate` بعد از `npm run dev:candidate -- build` تاربال بسته بندی شده را روی `DATA_DIR` ایزوله چک می کند و `/api/health` + `/v1/models` بررسی می کند ( [به Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) مراجعه کنید)

### برچسب گذاری و انتشار

- [ ] اجرای `/generate-release-cc` (مهارت کد Claude ):
  - تگ `vX.Y.Z` را ایجاد می کند
  - برچسب و شاخه را فشار می دهد
  - انتشار GitHub را با بدنه تغییرات باز می کند
  - نصب کننده های Electron را (در صورت ساخته شدن) وصل می کند
- [ ] یا به صورت دستی:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### مستقر کنید

مهارتهای استقرار با استفاده از نور rsync flow — no `npm pack`، no `npm i -g`:

- [ ] از مهارت استقرار استفاده کنید که با هدف مطابقت دارد:
  - `/deploy-vps-local-cc` — محلی VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — هر دو
- [ ] قبل از استقرار، `dist/BUILD_SHA` == `git rev-parse --short HEAD` را تأیید کنید
- [ ] Build باید در جایی اجرا شود که `node_modules` واقعی است (خروج اصلی یا `npm ci`'d worktree — NOT یک درخت کاری همپیوند شده)
- [ ] نمونه اجرا شده تست دود:
  - باز کردن `/dashboard/health` → چک نسخه رشته مسابقات انتشار
  - درخواست `/v1/chat/completions` را علیه یک ارائه دهنده شناخته شده اجرا کنید
  - بررسی کنید `/api/monitoring/health` کلیدهای مدار `CLOSED` را برمی گرداند
  - تأیید پاسخ حمل و نقل MCP (`/mcp` HTTP، `/mcp-sse` SSE)

### پس از انتشار

- [ ] اجرای `/capture-release-evidences-cc` (مهارت کد Claude )
  - ویژگیهای جدید WebP screenshots/recordings را ضبط میکند
  - به انتشار یادداشت ها / پست وبلاگ پیوست می کند
- [ ] به روز رسانی GitHub Discussions / Discord با اعلام انتشار
- [ ] نقطه عطف باز برای نسخه بعدی
- [ ] اگر مهم است: بحث را پین کنید یا در `news.json` برای بنر درون برنامه پست کنید

### دروازه پرتاب عمومی رادار

اعلام رادار عمداً با `active: false` انجام شده است. پس از اثبات هر مورد زیر، فعال سازی یک تغییر جداگانه است:

- [ ] همه Radar PRs انباشته شده ادغام شده اند و CI نوک انتشار سبز است
- [ ] مسیرهای رادار OSS را با `RADAR_ENABLED` به طور پیشفرض خاموش و خاموش کنید
- [ ] Smoke `GET /planos`، `/termos`، `/privacidade`، و `/reembolso` در میزبان رادار نامگذاری شده
- [ ] ضبط اپراتور identity/contact/address و بررسی قانونی مورد تایید مالک در سرویس خصوصی
- [ ] Stripe Checkout و webhook امضا شده را فقط در حالت آزمایشی تمرین کنید
- [ ] یک تحویل ایمیل رمزگذاری شده تراکنشی را با sender/domain تایید شده انجام دهید
- [ ] بازیابی پشتیبان و یک اجرای تحقیقاتی تحت نظارت و با محدودیت بودجه را اثبات کنید
- [ ] قبل از پذیرش مدارک اهدایی، خط مشی بررسی BRL/PIX را تأیید کنید
- [ ] Checkout عمومی را فقط بعد از گیت های قبلی فعال کنید، سپس `news.json` ID جدید را فعال کنید
- [ ] تأیید کنید که بنر صفحه اصلی از کپی بومیسازی شده استفاده میکند و پس از رد شدن یک ID قدیمی، یک ID جدید دوباره ظاهر میشود.

## آزمون دود سرویسهای تعبیهشده (v3.8.4+)

پیش از انتشار هر نسخهای که شامل تغییرات سرویسهای تعبیهشده است، موارد زیر را بررسی کنید:

### راهاندازی با پایگاهداده تازه (تداخلهای مهاجرت را شناسایی میکند — پس از اصلاح فوری v3.8.4 اضافه شد)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — برای راهاندازی 10 ثانیه صبر کنید
- [ ] دستور `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` باید `"9router"` را برگرداند (نه 404 و نه 500). این مورد تأیید میکند که مهاجرت `071_services.sql` اعمال و ردیف اولیه درج شده است.
- [ ] دستور `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` باید 3 ردیف برگرداند.
- [ ] دستور `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` باید 2 ردیف برگرداند (اعمال شدن `070_webhooks_kind_metadata.sql` را اعتبارسنجی میکند).
- [ ] دستور `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` با موفقیت اجرا شود — از تداخلهای آینده جلوگیری میکند.

### 9Router

- [ ] `POST /api/services/9router/install` در کمتر از 2 دقیقه، کد 200 را همراه با `installedVersion` برگرداند
- [ ] `POST /api/services/9router/start` در کمتر از 30 ثانیه، کد 200 و `state: "running"` را برگرداند
- [ ] `GET /api/services/9router/status` مقدار `health: "healthy"` را گزارش کند
- [ ] `POST /v1/chat/completions` با `"model": "9router/auto/..."` کد 200 را برگرداند (مسیریابی سرتاسری از طریق 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` رابط کاربری بومی 9Router را داخل پراکسی رندر کند (بدون iframe مستقیم `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` مقدار `{ keyRotated: true }` را برگرداند و سرویس بهدرستی راهاندازی مجدد شود
- [ ] `POST /api/services/9router/stop` کد 200 و `state: "stopped"` را برگرداند
- [ ] `GET /api/services/9router/logs?tail=50` جریان SSE را همراه با رویداد `snapshot` شامل خطوط اخیر برگرداند
- [ ] نصب در محیطی که `npm` در PATH آن وجود ندارد، کد 500 را همراه با پیغام خطای مناسب و قابلفهم (بدون ردگیری پشته) برگرداند

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` در کمتر از 2 دقیقه کد 200 را برگرداند
- [ ] `POST /api/services/cliproxy/start` در کمتر از 30 ثانیه، کد 200 و `state: "running"` را برگرداند
- [ ] `GET /api/services/cliproxy/status` مقدار `health: "healthy"` را گزارش کند
- [ ] `POST /api/services/cliproxy/stop` کد 200 و `state: "stopped"` را برگرداند
- [ ] `GET /api/services/cliproxy/logs?tail=50` جریان SSE را برگرداند

### پسرفت امنیتی

- [ ] دستور `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` باید `403 LOCAL_ONLY` را برگرداند
- [ ] دستور `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` باید `403 LOCAL_ONLY` را برگرداند
- [ ] پاسخهای خطای `/api/services/*` نباید شامل `err.stack` یا مسیرهای مطلق فایل باشند

## بررسیهای v3.8.0+

پیش از انتشار هر نسخه v3.8.x، این موارد اضافی را بررسی کنید:

- [ ] `omniroute --tray` در macOS راهاندازی شود (systray2 در `~/.omniroute/runtime/` نصب شده باشد)
- [ ] `omniroute --tray` در Linux راهاندازی شود (به DISPLAY نیاز دارد؛ اگر تنظیم نشده باشد، خطای مناسبی نمایش داده شود)
- [ ] `omniroute --tray` در Windows راهاندازی شود (PowerShell NotifyIcon، بدون فایلهای اجرایی اضافی)
- [ ] `omniroute config tray enable` ورودی شروع خودکار را ایجاد کند؛ غیرفعالسازی آن را حذف کند
- [ ] `npm install -g omniroute@<this-version>` مرحله postinstall را بدون خروج بحرانی اجرا کند
- [ ] مسیر بهروزرسانی وابستگیهای اختیاری را حفظ کند: `omniroute update --apply` و بهروزرسان خودکار
      دستور `npm install -g … --include=optional` را اجرا کنند تا `optionalDependencies` (better-sqlite3،
      keytar، tls-client و پشته SLM مربوط به llmlingua: `@atjsh/llmlingua-2@2.0.5`،
      `js-tiktoken`) پس از بهروزرسانی باقی بمانند. سطح SLM فوقسبک `modelPath` همچنین به مدل
      tinybert نیاز دارد که در نخستین استفاده بهصورت خودکار در `${DATA_DIR}/models/llmlingua` بارگیری میشود. سپس postinstall
      (`scripts/build/colocateOptionals.mjs`) مجموعه وابستگیهای اختیاری SLM را در
      `dist/node_modules` هممکان میکند تا worker دقیقاً یک نمونه `@huggingface/transformers` ^4.2.0
      را resolve کند — رهگیری مستقل فقط transformers را بستهبندی میکند، نه گزینههایی را که بهصورت پویا import شدهاند؛
      بنابراین بدون این کار، worker بسته llmlingua-2 را در برابر transformers ریشه بارگیری میکند
      و سطح SLM بدون اعلام خطا بهصورت fail-open عمل خواهد کرد.
- [ ] `omniroute status` بدون `.env` کار کند (مسیر توکن CLI، فقط loopback)
- [ ] دستور `curl http://localhost:20128/api/shutdown` باید 401 را برگرداند (مسیری که همیشه محافظت میشود)
- [ ] دستور `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` باید 401 را برگرداند (محافظ loopback)
- [ ] زماناجرای SQLite در نخستین اجرا به `bundled` resolve شود (فایل اجرایی بستهبندیشده برای پلتفرم معتبر باشد)
- [ ] وقتی `node_modules/better-sqlite3` حذف میشود، زماناجرای SQLite به `runtime` بازگردد
- [ ] فیلتر هوشمند MCP خروجی واقعی `playwright-mcp browser_snapshot` را فشرده کند (کاهش ≥50٪)
- [ ] هر 10 فایل `skills/omniroute*/SKILL.md` از طریق URL خام GitHub بهصورت عمومی قابل دریافت باشند
- [ ] راهنمای شروع به کار در راهاندازی تازه، مرحله معرفی سطوح «نحوه کار» را نمایش دهد
- [ ] ویجت پوشش سطوح در داشبورد اصلی، تعداد موارد پیکربندیشده/فعال را نمایش دهد

---

## برش 3.9.0 LTS (تمرینشده در 3.8.58)

پس از v3.8.59، نسخه بعدی 3.9.0 است و نوک آن به دو شاخه با عمر طولانی تبدیل میشود:
`stable/v3` (خط v3 LTS، برچسب npm با نام `latest`) و `develop` (نسخه v4 که به 4.0.0 ارتقا مییابد، برچسب npm با نام
`nightly`). مدل شاخه/کانال، انتقال روبهجلو و برچسبها در
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) آمدهاند؛ برنامه در [ROADMAP](../../ROADMAP.md) (فاز 3) قرار دارد. برش فقط یکبار اجرا میشود؛
3.8.58 آن را از ابتدا تا انتها روی یک فورک تمرین میکند و 3.8.59 با
[چکلیست GO/NO-GO](./LTS_GO_NO_GO.md) خاتمه مییابد.

### اجرای آزمایشی (فقط خواندنی، در هر زمان امن)

```bash
npm run release:dry-run-lts-cut                       # برش واقعی: 3.9.0 از HEAD، تگ قبلی v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # ثابتکردن کامیت مبدأ
```

`scripts/release/dry-run-lts-cut.mjs` هیچچیزی را اجرا نمیکند: این اسکریپت git و `gh` را میخواند و
کل توالی را چاپ میکند — پیششرطها (مبدأ resolve میشود، مخزن مبدأ تاریخچه کامل دارد —
یک clone کمعمق نمیتواند `stable/v3` را push کند، سمت دریافتکننده pack را در نخستین
والد graftشده رد میکند؛ بنابراین ابتدا برش را از یک clone کامل انجام دهید یا `git fetch --unshallow origin` را اجرا کنید —
تگ قبلی وجود دارد، `package.json` دارای نسخه هدف است، یک issue با برچسب `release-freeze` باز است، هیچ
issue بازی با عنوان `Release branch not green`
در یک شاخه انتشار موجود وجود ندارد — شاخهای که وجود ندارد وضعیت ناشناخته `?` را گزارش میکند و هرگز
سبز نیست — صف `release` در Mergify پیکربندی شده است (G11: `queue_rules`، `checks_timeout`،
برچسب `queue`)، مجموعهقواعد `release/*` همچنان حذف و force-push را مسدود میکند، و
`stable/v3` و `develop` هنوز وجود ندارند)، دو مرحله شاخه، اینکه کدام triggerهای workflow غیرفعال و
شرطهای `if:` برقرار میشوند (و کدامیک همچنان توسط یک متغیر مخزن محدود میمانند یا
به مخزن canonical مقید هستند)، dist-tagهای مورد انتظار (`latest` ← 3.9.0 و `next` و
`nightly` خالی) و rollback. کد خروج `0` = `RESULT: READY`، کد `1` = شکست یک پیششرط
مسدودکننده (`✗`)، کد `2` = خطای نحوه استفاده. گزینه `--advisory <id,...>` یک بررسی را بدون
پنهانکردن آن به هشدار (`!`) تنزل میدهد.

اجرای آزمایشی برش واقعی را زمانی انجام دهید که freeze انتشار 3.9.0 هنوز برقرار است — شاخهها
پس از تگ و پیش از آنکه فاز 12c وضعیت freeze را بردارد، ایجاد میشوند.

### تمرین 3.8.58 (فقط روی فورک)

```bash
# 1. اجرای آزمایشی روی نوک فعلی با پارامترهای تمرین
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. اجرا در برابر یک remote از نوع FORK (استفاده از origin یا هر remote دیگری که URL آن متعلق به
#    مخزن canonical باشد رد میشود؛ هر مرحله در ترمینال درخواست تأیید میکند)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. workflowهای غیرفعال را در فورک اجرا کنید (در جاهایی که اجرای آزمایشی
#    مقیدبودن به مخزن canonical را گزارش میکند از workflow_dispatch استفاده کنید)، سپس rollback کنید
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

کامیت ارتقای develop با ابزارهای سطحپایین git ساخته میشود (هیچ working treeای تغییر نمیکند) و
همان پنج فایل یک کامیت آغاز چرخه را ارتقا میدهد: `package.json`، `open-sse/package.json`،
`electron/package.json`، `package-lock.json` و `docs/openapi.yaml`. بخش `[4.0.0]`
در CHANGELOG و نسخههای i18n متناظر آن پس از آن روی `develop` و پیش از نخستین
PR این شاخه باز میشوند. اسکریپت هرگز dist-tagهای npm را تغییر نمیدهد — آنها را روی یک پکیج موقت تمرین کنید.

### artifact پیشنمایش PR (یکبار build کنید، همان بایتها را ارتقا دهید)

`.github/workflows/preview-artifact.yml` یک tarball تولید را از head یک PR میسازد و
دقیقاً همان build را اعتبارسنجی میکند (بخش (a) از #8084). فقط PRهای داخل همان مخزن؛ چیزی منتشر نمیشود.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # یا برچسب `preview-artifact` را اضافه کنید
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # نصب نسخه پیشنمایش
```

این اجرا `npm ci`، سپس `npm run build:release` و `npm run check:pack-artifact` را انجام میدهد، tarball را
بستهبندی میکند، `npm run check:pack-boot` را اجرا میکند (secretهای جعلی، پوشه داده موقت)، دوباره بستهبندی میکند و
اگر digest یکسان نباشد شکست میخورد؛ سپس `artifact-identity.json` را ثبت میکند (SHA مربوط به head، SHA
مربوط به base، hash فایل lock، پلتفرم، معماری، ABI مربوط به node، bundler، سیاست build —
`scripts/release/artifact-identity.mjs`) و در یک job جداگانه برای tarball گواهی صادر میکند. ارتقای
یک نسخه پیشنمایش بهمعنای نصب همان tarball است: هرگز آن را دوباره از کد منبع build نکنید.

### برش (3.9.0، پس از GO)

1. GO در [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) ثبت شده است.
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` عبارت `RESULT: READY` را چاپ میکند.
3. شاخهها را بهصورت دستی و با فرمانهایی که اجرای آزمایشی چاپ میکند روی `origin` ایجاد کنید —
   اسکریپت از push کردن به `origin` خودداری میکند. برای استفاده مجدد از یک کامیت develop بازبینیشده،
   ابتدا تمرین `--execute` را روی نوک 3.9.0 و در برابر فورک خود اجرا کنید؛ این کار هر دو SHA را چاپ میکند و
   همان کامیتها را میتوان push کرد:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. پیش از ادغام نخستین PR، از `stable/v3` و `develop` محافظت کنید (مجموعهقواعد + صف ادغام).
5. گردشکارهای غیرفعال با ایجاد شاخه فعال میشوند: `forward-port.yml` (ارسال به
   `stable/v3`)، `validate-stable-pr.yml` (PRهای ارسالشده به `stable/v3`) و `nightly-v4-build.yml`
   (ساخت `develop`). پیش از راهاندازی، راز مخزن `secrets.FORWARD_PORT_TOKEN` را تنظیم کنید (تا CI روی
   PRهای forward-port اجرا شود)؛ انتشار شبانه تا زمانی غیرفعال میماند که مالک، متغیر مخزن
   `vars.NIGHTLY_PUBLISH` را روی `true` تنظیم کند و npm Trusted Publishing فایل
   `nightly-v4-build.yml` را بپذیرد. تعیین کانال در `scripts/release/dist-tag.mjs` انجام میشود؛ همان
   تعیینکنندهای که `npm-publish.yml` استفاده میکند.
6. کانالها را بررسی کنید: `npm view omniroute dist-tags --json` باید `latest` = 3.9.0 را نشان دهد و تا
   زمان انتشار v4 هیچ `next` / `nightly` وجود نداشته باشد.
7. در صورت نیاز، بازگردانی: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   و `npm dist-tag add omniroute@3.8.59 latest`.

---

## بازگردانی

اگر انتشار دارای مشکل بحرانی است:

1. `gh release edit vX.Y.Z --prerelease` (آن را بهعنوان آخرین نسخه علامتگذاری نمیکند)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (فقط اگر هنوز توسط کاربران استفاده نشده است)
3. یا: یک اصلاح فوری روی `release/vX.Y.0` → انتشار اصلاحیه `vX.Y.(Z+1)`
4. فوراً از طریق GitHub Discussions و Discord اطلاعرسانی کنید

## قوانین سختگیرانه

- هرگز مستقیماً در `main` کامیت نکنید
- هرگز از `git push --force` برای شاخههای `main` یا `release/*` استفاده نکنید
- هرگز هوکهای Husky را نادیده نگیرید (`--no-verify`)
- هرگز اطلاعات محرمانه، اعتبارنامهها یا فایلهای `.env` را کامیت نکنید
- پوشش آزمون باید در سطح ≥60/60/60/60 (گزارهها/خطوط/توابع/شاخهها) باقی بماند
- هنگام تغییر کد عملیاتی در `src/`، `open-sse/`، `electron/` یا `bin/`، همیشه آزمونها را اضافه یا بهروزرسانی کنید

## بررسی خودکار همگامسازی

پیش از باز کردن یک PR، محافظ همگامسازی مستندات را بهصورت محلی اجرا کنید:

```bash
npm run check:docs-sync
```

CI نیز این بررسی را در `.github/workflows/ci.yml` (کار lint) اجرا میکند.
