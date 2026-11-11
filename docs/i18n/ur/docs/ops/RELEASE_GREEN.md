# Release-Green: candidate validation and evidence (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

ریلیز گرین ایک مخصوص عہد کا مشاہدہ کرتا ہے اور اس کی توثیق کے نتائج کی اطلاع دیتا ہے۔ [کوالٹی گیٹس کا حوالہ](../architecture/QUALITY_GATES.md) موجودہ CI پروفائلز، مطلوبہ چیک اور قبولیت کی پالیسی کی وضاحت کرتا ہے۔ `config/quality/admission-policy.json` میں ورژن شدہ داخلہ پالیسی `Gate / CI` اور `Gate / Quality` کے لیے قابل عمل معاہدہ ہے۔

## CI اور مبصر کا دائرہ کار

`ci.yml` اور `quality.yml` کور پل کی درخواستوں کو مین اور ریلیز برانچوں میں شامل کرتے ہیں۔ منتخب کردہ پروفائل اس بات کا تعین کرتا ہے کہ کون سی ملازمتیں لاگو ہوتی ہیں۔ مکمل CI وہ لینیں بھی شامل ہیں جو ایک عام پل کی درخواست پر عمل نہیں کرتی ہیں۔ ایک فوری مبصر کا نتیجہ ان ملازمتوں کی جگہ نہیں لے سکتا، اور مکمل ورک فلو ریپر اس کی رسیدوں کی جگہ نہیں لے سکتا۔

پیداوار کی تعمیر CI سے تعلق رکھتی ہے۔ `quality.yml` میں کوئی ڈپلیکیٹ ایڈوائزری تعمیر نہیں ہے۔ گمشدہ نمونے، منسوخ شدہ کام اور نامکمل پیمائش ایک کامیاب مطلوبہ چیک قائم نہیں کرتی ہے۔ نتائج کو قبول کرنے سے پہلے موجودہ بنیاد، سربراہ اور مشترکہ امیدوار کی تصدیق کریں۔

## مقامی توثیق

مبصر کو اس کی انحصار تیار کرنے کے بعد کسی ملکیتی ورک ٹری میں چلائیں۔ بھاری توثیق سے پہلے `docs/ops/WORKTREE_ISOLATION.md` میں ورک ٹری اور ریسورس پروٹوکول کی پیروی کریں۔

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

فوری پروفائل جزوی ہے۔ مکمل پروفائل اپنی وضع کردہ ضروریات کو چیک کرتا ہے اور کمانڈ کی رسیدوں کو محفوظ رکھتا ہے۔ یہ تعیناتی کی تصدیق نہیں کرتا ہے یا قابل اطلاق ہوسٹڈ چیکس کا متبادل نہیں ہے۔ رپورٹ عمل درآمد کی ناکامی کو میٹرک ڈرفٹ سے ممتاز کرتی ہے۔ منتخب کردہ پالیسی کے مطابق مطلوبہ ریچٹس مسدود رہتے ہیں۔ صرف پاسنگ نتیجہ حاصل کرنے کے لیے بیس لائن نہ بڑھائیں۔

## رات کے وقت اور دستی جھاڑو

رات کو ریلیز اور مطابقت حل کرنے والے ایک کیننیکل ریلیز برانچ کا انتخاب کرتے ہیں۔ اس انتخاب کو اس برانچ سے مماثل ہونا چاہیے جس نے ورک فلو کو متحرک کیا، اور سوئٹ ایونٹ کے ناقابل تبدیل SHA استعمال کرتے ہیں۔ دستی عملدرآمد کے لیے، `release_branch` میں مطلوبہ ریلیز کو منتخب کریں اور اسی حوالہ پر بھیجیں:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

منتخب شدہ کوڈ پر عمل کرنے سے پہلے کراس برانچ ڈسپیچ کو مسترد کر دیا جاتا ہے۔ میزبانی شدہ مین سویٹس `main` چیک آؤٹ کریں اور تصدیق کریں کہ اس کا SHA انسٹالیشن سے پہلے حل شدہ ہدف سے میل کھاتا ہے۔ اگر ریزولوشن کے دوران اہم حرکتیں ہوتی ہیں تو، نئے کمٹ پر نامکمل سویپ کو دوبارہ چلائیں۔ مختلف امیدواروں سے سوٹ کی رسیدیں یکجا نہ کریں۔

## ناکامی کی آزمائش اور بحالی

واقعہ کو ایک تشخیصی اشاریہ کے طور پر استعمال کریں، پھر درست دوڑ، کوشش، ناکام قدم اور نمونے کا معائنہ کریں۔ شراکت دار سے ناکامی کو منسوب کرنے سے پہلے مساوی بنیاد اور امیدوار کے ثبوت کا موازنہ کریں۔ بنیادی ڈھانچے کی خرابیاں، وراثتی نقائص، امیدواروں کی واپسی اور زیر التوا منظوریوں کے لیے مختلف علاج درکار ہوتے ہیں۔

`/green-prs`، `/sweep-reds`، `/validate-release-green` اور `/babysit` مہارتیں اپنے دستاویزی دائرہ کار کے تحت ثبوت جمع کرتی ہیں اور اصلاحات تیار کرتی ہیں۔ کنٹریبیوٹر کریڈٹ رکھیں، الگ تھلگ مرمت کی شاخیں استعمال کریں، اور کسی مجاز انضمام سے پہلے تمام مطلوبہ چیکس کی تصدیق کریں۔ پاس ہونے والے موجودہ امیدوار کے لیے کوئی خودکار ری بیس لائن یا واقعہ بند ہونے کا متبادل نہیں ہے۔
