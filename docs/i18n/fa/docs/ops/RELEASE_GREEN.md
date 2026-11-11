# Release-Green: candidate validation and evidence (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green یک commit خاص را مشاهده می کند و نتایج اعتبارسنجی آن را گزارش می دهد. [مرجع Quality Gates](../architecture/QUALITY_GATES.md) نمایه های فعلی CI ، چک های مورد نیاز و خط مشی پذیرش را تعریف می کند. [خط مشی پذیرش](../../config/quality/admission-policy.json) نسخه شده، قرارداد قابل اجرا برای `Gate / CI` و `Gate / Quality` است.

## CI و محدوده ناظر

پوشش `ci.yml` و `quality.yml` درخواست ها را به شاخه های اصلی و انتشار می کشاند. نمایه انتخاب شده تعیین می کند که کدام مشاغل اعمال می شوند. Full CI همچنین شامل خطوطی است که درخواست کشش معمولی آنها را اجرا نمی کند. یک نتیجه ناظر سریع نمی تواند جایگزین آن کارها شود و یک بسته بندی گردش کار تکمیل شده نمی تواند جایگزین رسیدهای آن شود.

ساخت تولید متعلق به CI است. هیچ ساخت مشاوره ای تکراری در `quality.yml` وجود ندارد. مصنوعات مفقود، کار لغو شده و اندازهگیریهای ناقص، بررسی مورد نیاز موفقیتآمیز را ایجاد نمیکنند. قبل از پذیرش نتایج، پایه فعلی، رئیس و نامزد ترکیبی را تأیید کنید.

## اعتبار سنجی محلی

مشاهدهگر را پس از آمادهسازی وابستگیهای آن، در یک درخت کاری متعلق به آن اجرا کنید. قبل از اعتبارسنجی سنگین از [درخت کاری و پروتکل منبع](WORKTREE_ISOLATION.md) استفاده کنید.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

نمایه سریع جزئی است. نمایه کامل الزامات مدل شده خود را بررسی می کند و رسیدهای فرمان را حفظ می کند. این استقرار یا جایگزینی برای چک های میزبانی قابل اجرا را تأیید نمی کند. این گزارش شکست اجرا را از رانش متریک متمایز می کند. جغجغه های مورد نیاز طبق خط مشی انتخاب شده همچنان مسدود هستند. یک خط مبنا را صرفاً برای به دست آوردن یک نتیجه گذرا مطرح نکنید.

## جاروهای شبانه و دستی

حلکنندههای انتشار شبانه و سازگاری، یک شاخه انتشار متعارف را انتخاب میکنند. آن انتخاب باید با شاخه ای که جریان کار را راه اندازی کرده است مطابقت داشته باشد و مجموعه ها از SHA تغییرناپذیر رویداد استفاده می کنند. برای اجرای دستی، نسخه مورد نظر را در `release_branch` انتخاب کنید و در همان مرجع ارسال کنید:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

قبل از اجرای کد انتخابی، ارسال بین شاخه ای رد می شود. مجموعههای اصلی میزبانی شده، `main` را بررسی کرده و بررسی کنید که SHA آن همچنان با هدف حلشده مطابقت دارد قبل از نصب. اگر اصلی در حین تفکیک حرکت کرد، Sweep ناقص را در commit جدید دوباره اجرا کنید. رسیدهای مجموعه از نامزدهای مختلف را ترکیب نکنید.

## تریاژ شکست و بازیابی

از حادثه به عنوان یک شاخص تشخیصی استفاده کنید، سپس اجرای دقیق، تلاش، مرحله شکست و مصنوع را بررسی کنید. قبل از نسبت دادن یک شکست به مشارکت کننده، شواهد پایه و کاندید معادل را مقایسه کنید. خطاهای زیرساخت، نقایص موروثی، رگرسیون نامزدها و تأییدیه های معلق نیاز به راه حل های متفاوتی دارند.

مهارتهای `/green-prs`، `/sweep-reds`، `/validate-release-green` و `/babysit` شواهدی را جمعآوری میکنند و در محدوده مستند خود، راهحلهایی را آماده میکنند. اعتبار مشارکتکننده را حفظ کنید، از شعبههای تعمیر جدا شده استفاده کنید و همه بررسیهای لازم را قبل از ادغام مجاز تأیید کنید. هیچ بازپایه خودکار یا بسته شدن حادثه جایگزین نامزد فعلی نمی شود.
