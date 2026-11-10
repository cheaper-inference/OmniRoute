# Quality Gates Reference (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

یہ دستاویز OmniRoute میں تمام CI کوالٹی گیٹس کے لیے مستند حوالہ ہے۔
یہ ہر گیٹ، اس کی توثیق کے دائرے، اس کے چلنے والے CI جاب، آیا یہ
ratchet baseline یا pass/fail پالیسی استعمال کرتا ہے، اور آیا یہ بلڈ کو روکتا ہے یا صرف مشاورتی ہے، کی وضاحت کرتی ہے۔

مختصر خلاصے اور allowlist پالیسی کے لیے `AGENTS.md` میں
"کوالٹی گیٹس اور Ratchets" سیکشن دیکھیں۔ اسی نظام کے تنقیدی جائزے، پختگی کی درجہ بندی، اور
ٹول سے غیر وابستہ نقل کے منصوبے کے لیے
[کوالٹی گیٹ پلے بُک](../ops/QUALITY_GATE_PLAYBOOK.md) دیکھیں۔

---

## گیٹ انوینٹری اور ایگزیکیوشن پروفائلز

### امیدوار داخلہ

CI اور کوالٹی گیٹس کے ورک فلو سے ہر ایک ایک مستحکم فیصلے کا اخراج کرتا ہے: `Gate / CI` اور `Gate / Quality`۔ ان کی ورژن شدہ داخلہ پالیسی ہر اپ اسٹریم ملازمت کو ضرورت یا مشورے کے مطابق شمار کرتی ہے۔ ایک قابل اطلاق مطلوبہ کام کامیاب ہونا چاہیے: غائب، منسوخ، نظر انداز، زیر التواء اور نامعلوم نتائج PASS قائم نہیں کر سکتے۔ ایک درست دستاویزات صرف یا صرف کیٹلاگ کی درجہ بندی ایک کوڈ لین کو ناقابل اطلاق بنا سکتی ہے۔ ایک عام مسودہ PR قبول شدہ امیدوار نہیں ہے۔ `hotfix` لیبل ثبوت سے دستبردار نہیں ہوتا ہے۔

دونوں ورک فلو PRs main/release برانچوں میں ڈھانپتے ہیں، `main` کو دھکیلتے ہیں، دستی ڈسپیچ اور ضم کرنے والے گروپ ایونٹس۔ پش، ڈسپیچ اور ضم کرنے والے گروپ مکمل انتخاب کو چلاتے ہیں۔ قابل اعتماد مرجیفائی قطار کا مسودہ قابل اطلاق `full-code`/`full-code-e2e` جابز بھی چلاتا ہے۔ عام PRs انہیں چھوڑ دیں۔ دستی انضمام سے پہلے، عین امیدوار پر مکمل ڈسپیچ چلائیں۔ `release/**` کو دھکیلنے سے یہ ورک فلوز شروع نہیں ہوتے ہیں۔ ریلیز-گرین ضم شدہ بیس کا الگ سے مشاہدہ کرتا ہے (`docs/ops/RUNNER_BOX.md` → ہوسٹڈ لین)۔ فورکس اور انضمام گروپ ملازمتوں کے لیے ہوسٹڈ رنر کا استعمال کرتے ہیں جو بصورت دیگر خود میزبان رنرز کو منتخب کرتے ہیں۔ رول آؤٹ سے پہلے کافی میزبانی کی صلاحیت کی تصدیق ہونی چاہیے۔

ہر JSON رسید چیک آؤٹ SHA، ورک فلو چلانے اور کوشش کی نشاندہی کرتی ہے۔ CLI ایک checkout/event SHA مماثلت کو مسترد کرتا ہے۔ ورک فلو ٹیسٹ پالیسی کی رکنیت کو فیصلے کی نوکری کی `needs` فہرست سے منسلک کرتے ہیں لہذا ایک نئی یا ہٹائی گئی لین خاموشی سے غائب نہیں ہوسکتی ہے۔ رسیدیں ان کے اپنے ورک فلو کا احاطہ کرتی ہیں، نہ کہ اشاعت، تعیناتی، یا موجودہ ایڈوائزری اسکینر کے اندرونی حصے۔ برانچ رولز میں مطلوبہ قابل اطلاق چیک کرنا ایک الگ انتظامی تبدیلی ہے۔ ان کی ملازمتوں کی وضاحت خود کسی شاخ کی حفاظت نہیں کرتی ہے۔

`API Route Typecheck` ایک آزاد ورک فلو چیک ہے، جو مجموعی فیصلوں اور مقامی مکمل مبصر کے جامد پروفائل دونوں سے باہر ہے۔ درست امیدوار کے لیے الگ سے اس کے نتائج کا معائنہ کریں۔ `.github/workflows/api-route-typecheck.yml` PRs پر `main` یا `release/**` میں چلتا ہے، یا تو برانچ فیملی، مینوئل ڈسپیچ، اور `checks_requested` قسم کے `merge_group` ایونٹس کو دھکیلتا ہے۔ اس میں کوئی پاتھ فلٹر نہیں ہے۔ گروپس کو ضم کریں `merge_group.head_sha` چیک کریں ؛ دیگر واقعات `github.sha` کو چیک کریں۔ تمام واقعات ایک ہی API تشخیصی گیٹ اور گیٹ یونٹ ٹیسٹ استعمال کرتے ہیں۔ PR بیس ری ٹارگٹس نئے چیک کی درخواست کرتے ہیں۔ body/title ترامیم صرف مشاہدے کا نام `Admission not requested / API Route Typecheck` استعمال کرتی ہیں اور داخلہ چیک کی جگہ نہیں لے سکتی ہیں۔

### منظوری ریڈیوسر میں محفوظ ثبوت

`scripts/quality/validate-release-acceptance.mjs` فراہم کردہ پلان اور اس کے
مینی فیسٹس کو مختصر کرتا ہے؛ یہ ثابت نہیں کرتا کہ پلان مکمل ریلیز پائپ لائن کا احاطہ کرتا ہے۔
اس کی رپورٹس واضح طور پر `releaseAcceptance: false` مقرر کرتی ہیں، حتیٰ کہ جب وہ پلان
`VERIFIED` ہو۔ `release-acceptance.yml` ورک فلو اب بھی حقیقی build، package، boot یا promotion
رسیدوں کی بجائے shadow fixtures استعمال کرتا ہے۔

CLI کو محفوظ ثبوت کی تصدیق کے لیے `--evidence-root` درکار ہے۔ فائلیں
`<evidence-root>/<artifact_id>/<member>` کے طور پر resolve ہوتی اور SHA-256 سے hash کی جاتی ہیں۔ ثبوت کے بغیر PASS ریکارڈ،
غائب یا تبدیل شدہ فائل، غیر محفوظ پاتھ یا symlink تصدیق کو روکتا ہے۔
غائب فائلیں خالی مگر کامیاب لاگز کے مساوی نہیں ہیں۔ موجودہ SHA/run/attempt جانچیں آزاد رہتی ہیں:
مماثل bytes کسی فرسودہ رسید کو قابل قبول نہیں بنا سکتے۔ فائل کی سالمیت، نفاذ کی اصالت
یا artifact promotion کا ثبوت نہیں ہے۔

### DAST تصدیق شدہ CI بلڈ استعمال کرتا ہے

لازمی `dast-smoke` CI جاب، `build` کے بعد `.github/workflows/dast-smoke.yml` کو بلاتی ہے۔ یہ بلڈ جیسے ہی کوڈ/ڈرافٹ انتخاب کی پابند ہے، جس میں معاونت یافتہ fork PRs، release ہدف والی PRs اور مرج گروپ شامل ہیں۔ غائب، ناکام، منسوخ یا غیر متوقع طور پر چھوڑی گئی DAST جاب، `Gate / CI` کو روکتی ہے۔ دوبارہ قابل استعمال ورک فلو کا الگ PR/dispatch ٹرگر نہیں؛ دستی تصدیق CI کا dispatch استعمال کرتی ہے تاکہ بلڈ اور صارف ایک ہی اجرا میں رہیں۔

`scripts/ci/next-build-provenance.mjs` مکمل Next آرٹیفیکٹ کو tar ڈائجسٹ، ریپوزٹری/واقعہ/اجرا، پیدا کنندہ کی کوشش، head/base/checkout/tree، ورک فلو شناختوں، lockfile، عین Node ورژن/ABI، پلیٹ فارم اور بنڈلر سے باندھتا ہے۔ DAST ناقابل تبدیلی آرٹیفیکٹ ID کو `needs.build.outputs` سے منتخب کرتا، ڈاؤن لوڈ ڈائجسٹ کی تصدیق لازم کرتا، اور `scripts/ci/unpack-ci-build.py` کے ذریعے صرف دو اجازت یافتہ ارکان نکالنے سے پہلے ZIP کا ہیش خود حساب کرکے پیدا کنندہ کے ڈائجسٹ سے ملاتا ہے۔ Next درخت نکالنے سے پہلے مینی فیسٹ اور tar آرکائیو بھی پیدا کنندہ کے آزاد آؤٹ پٹس سے ملنے چاہییں۔ یہ کبھی شاخ کا تازہ ترین کامیاب بلڈ نہیں ڈھونڈتا۔ جزوی دوبارہ اجرا اسی پیدا کنندہ کی کوشش استعمال کرسکتا ہے، جب ID اور تمام ان پٹس اب بھی ملتے ہوں؛ ثبوت کا ریکارڈ دونوں کوششیں درج کرتا ہے۔

صارف hosted Linux رنر پر رہتا ہے، ریپوزٹری کی صرف پڑھنے کی اجازت کے ساتھ اور ریپوزٹری رازوں کے بغیر۔ یہ پیدا کنندہ کا عین Node ورژن نصب کرکے `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` کے ساتھ CLI بناتا ہے۔ `scripts/build/standaloneInput.mjs` کسی متبادل بلڈ سے پہلے غائب standalone سرور کو مسترد کرتا ہے؛ عام مقامی CLI بلڈ اپنا موجودہ متبادل راستہ رکھتے ہیں۔ سرور کی تیاری، Schemathesis اور promptfoo سب کو جاب کی غیر تبدیل شدہ 25 منٹ کی حد میں کامیاب ہونا چاہیے۔ ماخذ کا ریکارڈ ان پٹ کی شناخت اور بائٹس ثابت کرتا ہے، کامیاب DAST اسکین نہیں۔ آرٹیفیکٹ کی میعاد ختم ہونا، رنر میں تعطل یا اسکینر کی ناکامی نامکمل یا ناکام ثبوت رہتی ہے؛ مشاورتی ریپر اسے PASS نہیں بنا سکتا۔

### UI نفاذ کی گنجائش

CI مکمل UI فہرست کو چار `test-vitest` میٹرکس shards کے طور پر چلاتا ہے، ہر shard میں زیادہ سے زیادہ
دو workers اور موجودہ 15 منٹ کی جاب ڈیڈ لائن کے ساتھ۔ پہلا shard
MCP/autoCombo Vitest سویٹ بھی چلاتا ہے۔ لازمی جاب کا نتیجہ ہر میٹرکس حصے کا احاطہ کرتا ہے؛ کسی
ایک shard کی ناکامی یا منسوخی امیدوار کی منظوری ثابت نہیں کر سکتی۔

رات کا observer ہر UI shard کے لیے ایک علیحدہ، بعینہٖ امیدوار کی رسید محفوظ رکھتا ہے،
جس میں پہلی رسید کے اندر MCP نفاذ بھی شامل ہے۔ چاروں رسیدیں، لاگز اور مماثل
نفاذی شناختیں درکار ہیں۔ مقامی `npm run test:vitest:ui` اب بھی مکمل
سویٹ منتخب کرتا ہے؛ ایک `--shard` رن صرف جزوی ثبوت ہے۔

### یونٹ کوریج کی جمع آوری

بارہ یونٹ shards اپنے موجودہ ٹیسٹ نفاذ کے دوران V8 کوریج جمع کرتے ہیں۔ ایک کامیاب
shard اصل فائلوں کو کسی درمیانی Istanbul رپورٹ کے بغیر سکیڑنے کے لیے
`scripts/ci/compact-v8-coverage.mjs` چلاتا ہے۔ آخری Coverage جاب امیدوار SHA، runtime،
source root اور data hashes کے مقابل تمام بارہ manifests کی تصدیق کرتی ہے، پھر c8 کے رپورٹرز اور موجودہ
کوریج حدیں چلاتی ہے۔ Inputs میں c8 کی عالمی filename ترتیب برقرار رہتی ہے؛ فی shard پیشگی ادغام
مخلوط function/block کوریج کے لیے غیر محفوظ ہے۔ غائب، ناقص یا غیر موافق shards منظوری کو ناکام بنا دیتے ہیں۔
ناکام test shards خام تشخیصی کوریج کو علیحدہ محفوظ رکھتے ہیں؛ وہ آخری merge میں شامل نہیں ہو سکتی۔

### یونٹ عمل درآمد کی پیش رفت کی رسیدیں

مشترکہ `test:unit:ci:shard` کمانڈ `scripts/ci/unit-progress-reporter.mjs` کے ذریعے `primary`، `dashboard` اور `serial` مراحل کو ریکارڈ کرتی ہے۔ معمول کی ٹیسٹ رپورٹ بدستور دستیاب رہتی ہے۔ صرف میٹا ڈیٹا پر مشتمل ایک علیحدہ رسید ہر فائل کے آغاز اور تکمیل کو ریکارڈ کرتی ہے، جبکہ 30 سیکنڈ کا ہارٹ بیٹ ان فائلوں اور ان کے گزرے ہوئے وقت کی فہرست دیتا ہے جو اب بھی فعال ہیں۔ یہ صرف اجازت یافتہ عمل درآمد میٹا ڈیٹا ریکارڈ کرتی ہے؛ ٹیسٹ کی تفصیلات، آؤٹ پٹ، خرابیوں کا متن اور مکمل ماحول سیریلائز نہیں کیے جاتے۔

CI، JSONL فائلوں کو `unit-progress-ci-<run>-<attempt>-<shard>` کے نام سے محفوظ رکھتا ہے۔ جاب کا ٹائم آؤٹ بعد میں ہونے والے اپ لوڈ کو روک سکتا ہے؛ پہلے سے خارج کیے گئے ہارٹ بیٹس تشخیصی ثبوت کے طور پر باقی رہتے ہیں۔ ہارٹ بیٹس کی عدم موجودگی کسی مسدود یا ختم شدہ رنر پراسیس کی عکاسی بھی کر سکتی ہے۔ یہ رسیدیں موجودہ ٹیسٹ انتخاب، ہم وقتی اجرا، آخری مهلتوں اور اخراجی اسٹیٹس کو برقرار رکھتی ہیں؛ یہ امیدوار کی منظوری کے فیصلے نہیں ہیں۔

### جامد اسکین کی فہرست

ورژن شدہ npm-alias فہرست اور static-scan رکنیت
`config/quality/gate-manifest.json` میں موجود ہیں۔ اسکرپٹ ناموں اور عین commands کی
`package.json` کے مقابل تصدیق کے لیے `npm run check:gate-manifest` چلائیں؛ اضافے، اخراج اور
command drift مقامی hook اور CI میں change-classification جابز، دونوں کو ناکام بنا دیتے ہیں۔
کوئی alias نہ workflow جاب ہے، نہ matrix instance، اور نہ test case: ان شماروں کو
باہم قابل تبادلہ کے طور پر پیش نہیں کرنا چاہیے۔

منتخب aliases کو چلائے بغیر ان کا معائنہ کرنے کے لیے
`npm run quality:scan -- --list` یا `npm run quality:scan:fast -- --list` استعمال کریں۔
runner npm entrypoint کو استعمال کرتا ہے، اس لیے اس کا runtime محفوظ رہتا ہے، بشمول جہاں ترتیب دیا گیا ہو وہاں Bun۔
manifest ان پروفائلز سے باہر aliases کو علیحدہ طور پر چلائے جانے والے aliases کے طور پر درج کرتا ہے، اور
read-only scan پروفائلز میں maintenance commands ممنوع ہیں۔

یہ پروفائلز صرف static scan کا احاطہ کرتے ہیں۔ یہ product tests،
coverage، packaging، external checks یا کسی امیدوار کی مکمل release acceptance کی تصدیق نہیں کرتے۔
Workflow admission منسلک `config/quality/admission-policy.json` اور
`scripts/quality/admission-verdict.mjs` استعمال کرتا ہے۔ Release-observer پروفائلز علیحدہ رہتے ہیں؛
ان کی قابل اطلاق جانچوں اور رسیدوں کا آزادانہ معائنہ کریں۔ مکمل observer کی static
commands کا اعلان `config/quality/release-green-static-profile.json` میں کیا گیا ہے، جن میں
`audit:deps`، mutation-test selection اور translation checks شامل ہیں۔ loader، npm
commands کی package.json اور ماڈل شدہ CI/Quality اعلانات کے مقابل تصدیق کرتا ہے؛ یہ shell tokens کو arguments کے طور پر چلانے کے بجائے
drift کو مسترد کرتا ہے۔ لازمی scanner کا SKIP/INCOMPLETE output
PASS ثابت نہیں کر سکتا۔ پروفائل اپنے external exclusions درج کرتا ہے اور
hosted coverage، test matrices، package یا deployment evidence کی جگہ نہیں لیتا۔ ذیل کی نثری فہرست
ایک حوالہ ہے، یہ ثبوت نہیں کہ کوئی gate حقیقتاً چلا تھا۔

Scripts، `scripts/check/` (پالیسی گیٹس) اور `scripts/quality/` (ratchet engine) کے تحت موجود ہیں۔
CI کے لیے حتمی ماخذ `.github/workflows/ci.yml` ہے۔

### شائع شدہ بیس دستاویزات صحت

`.github/workflows/i18n-base-health.yml` `main` اور `release/v*` کو منتخب کرنے کے بعد اور دستی ترسیل پر دستاویزات کی صحت کا مشاہدہ کرتا ہے۔ اس کے فلٹرز دستاویزات، روٹ مارک ڈاؤن، `llm.txt`، ترجمہ state/configuration اور متعلقہ i18n ٹولنگ کا احاطہ کرتے ہیں۔ واحد `Published base documentation health` کام میزبان Ubuntu اور پانچ منٹ کی آخری تاریخ کا استعمال کرتا ہے۔ یہ صرف پڑھنے کی توثیق کرتا ہے اور انحصار کی تنصیب، ترجمہ یا ریاست کو اپنانے کے بغیر تشخیصی رسید لکھتا ہے۔

`scripts/i18n/check-base-health.mjs` کو صفر سورس-ہیش، گمشدہ ہدف، ہدف-ہیش، باسی-ترجمہ اور سیکشن-کیشے کی عدم مطابقت کی ضرورت ہے۔ یہ موجودہ بنیادی document/locale دائرہ کار اور اس کے ریکارڈ شدہ ثبوت کی بھی توثیق کرتا ہے۔ غلط سیاق و سباق، نامکمل کوریج یا مداخلت شدہ چیکر `INCOMPLETE` پیدا کرتا ہے؛ تصدیق شدہ بڑھے `FAIL` پیدا کرتا ہے۔ دونوں ایک ناکام خارجی حیثیت واپس کرتے ہیں۔ رسید SHA، ورک فلو، چلانے اور کوشش کرنے کی پابند ہے، اور اسے `i18n-base-health-<sha>-<run>-<attempt>` کے طور پر برقرار رکھا جاتا ہے۔

یہ شائع شدہ بنیاد کا ایک آزاد مشاہدہ ہے۔ یہ PR یا ضم گروپ ایونٹ، ایک مطلوبہ PR چیک، ایک npm عرف یا جامد اسکین پروفائل ممبر شامل نہیں کرتا ہے۔ بنیادی چیکر تمام پانچ کلاسوں کو مطلق موڈ میں بھی روکتا ہے۔ عام PR تیاری داخلہ سے الگ رہتی ہے۔ ایک کامیاب اپ لوڈ صحت کے ناکام نتائج کو PASS میں نہیں بدل سکتا۔

ایک عام PR `--preflight` `--baseline-evidence` کے ذریعے تیار کردہ بیس رپورٹ کے ساتھ استعمال کرتا ہے۔ یہ انگریزی ماخذ کو صرف اسی صورت میں زیر التواء چھوڑ سکتا ہے جب مکمل ترجمہ ریکارڈ اور اصل ہدف بائٹس اس عین بنیاد سے تبدیل نہ ہوں۔ نئے ٹارگٹ یا سیکشن کیشے کی عدم مطابقتیں اب بھی مسدود ہیں، اور نامکمل شواہد تیاری کی اجازت نہیں دے سکتے۔ رپورٹ `preparationPending` اور `mergeReady` الگ الگ ظاہر کرتی ہے: کامیاب تیاری زیر التواء ترجمے کو ضم کرنے کے لیے تیار نہیں کرتی ہے۔ داخلے سے پہلے کمپوزڈ امیدوار میں متاثرہ آئینے کو تازہ کریں۔ قابل اعتماد مرجائف قطار امیدوار، `merge_group`، برانچ پُشز اور دستی CI رنز بغیر `--warn` یا وراثتی ناکامی کی معافی کے مطلق چیکر کا استعمال کرتے ہیں۔ گمشدہ ٹارگٹ ہیشز اور حذف شدہ ریکارڈ شدہ بنیادی فائلوں کے ذریعہ کم کردہ دائرہ کار کامیاب مطلق فیصلہ نہیں دے سکتا۔

### جاری کریں PR فاسٹ پاتھ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs پر CI مکمل کرتا ہے، `main` کو دھکیلتا ہے، گروپ بھیجتا ہے اور انضمام کرتا ہے۔ PRs راستے سے فلٹر شدہ تیز جانچ کا استعمال کرتا ہے۔ مستقل طور پر غیر فعال ڈپلیکیٹ تعمیر کو ہٹا دیا گیا تھا۔ اصلی build/package/boot چیک CI میں ہی رہتے ہیں۔

| جاب                                              | دائرہ کار                                                                                                                                                                                                                         | بلاک کرنا          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs اور docs-all                                                                                                                                                                                         | جی ہاں             |
| `Fast Quality Gates`                             | کوڈ PRs; جامد چیک، ٹائپ چیک، ڈیش بورڈ ٹائپ چیک، متاثرہ یونٹ ٹیسٹ                                                                                                                                                                  | جی ہاں             |
| `Forgotten sibling tests`                        | کوڈ PRs; تبدیل شدہ ماڈیولز کو مستحکم صارفین اور امیدوار بہن بھائیوں کے ٹیسٹوں کا پتہ لگایا گیا ہے۔ بیرل اور ڈائنامک امپورٹ پاتھز کو ایڈوائزری ڈائیگنوسٹکس کے طور پر رپورٹ کیا جاتا ہے، جن میں حوالہ جات کی فہرست میں مستثنیات ہیں | **ایڈوائزری**      |
| `No new ESLint warnings`                         | کوڈ PRs; دبانے سے آگاہ لنٹ گارڈ                                                                                                                                                                                                   | جی ہاں، کانٹے سمیت |
| `Merge integrity (changelog + generated skills)` | غیر مسودہ PRs; چینج لاگ اور جنریٹڈ اسکل سنک                                                                                                                                                                                       | جی ہاں، کانٹے سمیت |

#### بھولے بھائی کے ٹیسٹ رپورٹ

`npm run check:forgotten-sibling-tests` ٹیسٹ-امپیکٹ میپ کے پیچھے امپورٹ ریزولور کو دوبارہ استعمال کرتا ہے۔ ہر تبدیل شدہ پروڈکشن ماڈیول کے لیے، جب امیدوار ٹیسٹ پل کی درخواست کے فرق سے غیر حاضر ہوتا ہے تو یہ ڈیٹرمنسٹک `changed module/symbol -> static consumer -> candidate sibling test` چینز کی اطلاع دیتا ہے۔ مارک ڈاؤن کا خلاصہ اور JSON نتیجہ کسی بھی بلاکنگ رول آؤٹ سے پہلے کیلیبریشن کے لیے `forgotten-sibling-tests` ورک فلو آرٹفیکٹ کے طور پر برقرار رکھا جاتا ہے۔

بیرل کی دوبارہ برآمدات اور متحرک درآمدات صرف ریزولیوشن تشخیص ہیں۔ وہ کبھی بھی بلاکنگ فائنڈنگ نہیں بناتے ہیں۔ جائزہ شدہ مستثنیات `config/quality/forgotten-sibling-allowlist.json` میں رہتے ہیں۔ ہر اندراج کو صارف اور امیدوار کے ٹیسٹ کا نام دینا چاہیے، ایک مخصوص دلیل دینا چاہیے، اور GitHub مسئلے یا پل کی درخواست کو لنک کرنا چاہیے۔ غلط اندراجات ناکام ہو گئے بند ہو گئے۔ مستثنیات حذف شدہ امیدوار ٹیسٹ یا `.skip`/`.todo` کو شامل کرنے والے فرق کو دبا نہیں سکتے۔ دعویٰ کمزور ہونا اور دیگر ماسکنگ آزادانہ طور پر بلاک کرنے والے `check:test-masking` گیٹ کی ملکیت رہتی ہے۔

### Job: `lint`

`main` کے لیے ہر PR پر چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| اسکرپٹ (`npm run ...`)            | توثیق کرتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | روکنے والا                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | Node.js کا ورژن معاونت یافتہ حد کے اندر ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:cycles`                    | تمام `src/` + `open-sse/` میں دائروی imports (AST پر مبنی، tsconfig کے `paths` حل شدہ)۔ جب بھی کوئی cycle موجود ہو، bare کمانڈ 1 کے ساتھ خارج ہوتی ہے (#15281 سے fail-closed) اور SCCs کی فہرست دیتی ہے۔ `check:cycles:ratchet` (جو CI چلاتا ہے) اس وقت روکتا ہے جب تعداد `quality-baseline.json` میں `metrics.cycles` کی بالائی حد سے تجاوز کرے — فی الحال 14، `direction: down`، لہٰذا یہ صرف کم ہو سکتی ہے (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ہاں (ratchet)                           |
| `check:boundary`                  | `open-sse → src` coupling: engine سے app میں منفرد file-to-file imports (`scripts/quality/measure-boundary.mjs`؛ edge list، v4 core/module-split اصلاحی backlog ہے)۔ bare کمانڈ = مشاورتی رپورٹ (`quality:boundary` جیسی)۔ `check:boundary:ratchet` (جو CI چلاتا ہے، اور `quality.yml` کے fast-gates ratchet loop میں بھی شامل ہے) اس وقت روکتا ہے جب تعداد `quality-baseline.json` میں `metrics.boundaryOpenSseToSrc` کی بالائی حد سے تجاوز کرے — ناپی گئی قدر 771 پر ابتدائی طور پر مقرر، `direction: down`؛ `--update` اسے صرف کم کرتا ہے؛ PRs پر base-relative (`--base-ref`، ذیل میں دیکھیں)                                                                                                                                                                                                                                                                                                                                                                                                                                    | ہاں (ratchet)                           |
| `check:route-validation:t06`      | تمام routes پر Zod schemas موجود ہیں (Tier 6 پالیسی)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ہاں                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` کی تعداد بجٹ سے تجاوز نہیں کرتی (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:provider-consistency`      | `providers.ts` میں موجود ہر provider کے لیے `providerRegistry.ts` میں مماثل اندراج موجود ہے (اور اس کے برعکس بھی، allowlist کے اندر)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ہاں                                     |
| `check:model-lifecycle`           | ہاتھ سے برقرار رکھے جانے والے تین routing tables، چیک اِن کیے گئے lifecycle snapshot (#11503) کے ساتھ ہم آہنگ رہتے ہیں: `FITNESS_TABLE` (`taskFitness.ts`) کسی ایسے retired id کو اسکور نہیں کرتا جسے `REGISTRY` route کر سکتا ہو؛ ہر `BUILT_IN_ALIASES` target، `REGISTRY` میں موجود اور retired-id snapshot سے غیر موجود ہے؛ `REGISTRY` میں اب بھی موجود ہر retired id کو forward کیا گیا ہے یا `allowedRetiredInCatalog` میں درج کیا گیا ہے؛ اور `DEFAULT_DEGRADATION_MAP` کا کوئی source یا target اس snapshot میں retired کے طور پر ظاہر نہیں ہوتا۔ اس سے یہ ثابت نہیں ہوتا کہ کوئی model فی الحال کسی فعال upstream کے ذریعے فراہم کیا جا رہا ہے۔ آف لائن — `config/quality/model-lifecycle.json` کے ساتھ موازنہ کرتا ہے، جسے `npm run quality:refresh-model-lifecycle` کے ذریعے دستی طور پر تازہ کیا جاتا ہے (نیٹ ورک؛ CI میں شامل نہیں)۔ `allowedRetiredInCatalog` ایک burn-down ratchet ہے: اندراج صرف tracking issue کے ساتھ شامل کریں۔                                                                                    | ہاں                                     |
| `check:fetch-targets`             | client-side `src/` میں موجود ہر `fetch("/api/...")` ایک حقیقی `route.ts` تک resolve ہوتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:deps`                      | repo کے ہر `package.json` میں موجود تمام `npm install` کے قابل dependencies، `dependency-allowlist.json` میں شامل ہیں؛ نئے unpinned یا slopsquatted packages کو نشان زد کیا جاتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں                                     |
| `audit:deps`                      | پانچوں آزاد lockfiles (root، Electron، OpenCode plugins v1/v2 اور provider) کا npm audit۔ Critical advisories عمل روک دیتی ہیں؛ high advisories نمایاں warnings کے طور پر برقرار رہتی ہیں۔ غائب/ناکام audits کو INCOMPLETE سمجھا جاتا ہے اور وہ عمل روک دیتی ہیں؛ ہر scope کے lock hashes اور reports محفوظ رکھے جاتے ہیں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:lockfile`                  | `package-lock.json` کی سالمیت — https رجسٹری، سالمیت ہیشز، کوئی ہوسٹ اوور رائیڈز نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ہاں                                     |
| `check:licenses`                  | پروڈکشن ڈیپینڈنسیز کے لیے SPDX لائسنس کی اجازت یافتہ فہرست                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:tracked-artifacts`         | کوئی بلڈ آرٹیفیکٹس / کمٹ شدہ `node_modules` سِم لنکس نہیں (husky پری کمٹ میں بھی چلتا ہے؛ پری پش جان بوجھ کر ہلکا رکھا گیا ہے — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ہاں                                     |
| `check:ai-attribution`            | PR کمٹس، عنوان یا متن میں کوئی AI/بوٹ `Co-Authored-By` ٹریلر یا AI جنریشن فوٹر نہیں — سخت اصول #16 (`quality.yml` کے PR→`release/**` فاسٹ گیٹس لوپ میں — ایونٹ پے لوڈ پڑھتا ہے، غیر PR صورتوں میں کوئی کارروائی نہیں کرتا — اور PR→`main` کے لیے `ci.yml` لنٹ میں صرف PR کا ایک مرحلہ؛ نیز husky کا `commit-msg` ہُک؛ انسانی شریک مصنفین کی اجازت ہے؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | ہر Vitest اخراج کسی ٹریکنگ مسئلے کا ذکر کرتا ہے اور `config/quality/vitest-exclusions.json` میں موجود ہے (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ہاں                                     |
| `check:file-size`                 | سورس فائلیں (`src/`، `open-sse/`، `electron/`، `bin/` میں `.ts`/`.tsx`) `cap` کے اندر اور ٹیسٹ فائلیں (`*.test.ts(x)`) `testCap` کے اندر رہیں؛ `file-size-baseline.json` میں منجمد فائلیں (`frozen` / `testFrozen`) اپنے ریکارڈ شدہ سائز سے زیادہ نہیں بڑھنی چاہییں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں                                     |
| `check:error-helper`              | executors/handlers میں خرابی کے جوابات `buildErrorBody()` / `sanitizeErrorMessage()` استعمال کرتے ہیں (سخت اصول #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ہاں                                     |
| `check:migration-numbering`       | Migration SQL فائلیں تسلسل کے ساتھ نمبر شدہ ہیں، کوئی خلا یا نقل نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ہاں                                     |
| `check:public-creds`              | `publicCreds.ts` سے باہر کوئی لفظی OAuth `client_id`/`client_secret` یا Firebase Web کلیدیں موجود نہیں (سخت اصول #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ہاں                                     |
| `check:db-rules`                  | `src/lib/db/` ماڈیولز سے باہر کوئی خام SQL نہیں؛ `localDb.ts` سے کوئی barrel-imports نہیں (سخت اصول #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:known-symbols`             | اپنی dispatch tables میں رجسٹر شدہ provider executors، routing strategies، اور translators ڈسک پر موجود فائلوں سے مطابقت رکھتے ہیں — کوئی غیر منسلک یا غیر اعلان شدہ symbols نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ہاں                                     |
| `check:route-guard-membership`    | child process شروع کرنے والا ہر route، `isLocalOnlyPath()` کے ذریعے درجہ بند ہے (سخت اصول #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ہاں                                     |
| `check:test-discovery`            | repo میں موجود ہر `*.test.ts` / `*.spec.ts` فائل کو کم از کم ایک ٹیسٹ رنر جمع کرتا ہے (ریچیٹ: `test-discovery-baseline.json` میں یتیم فائلوں کی فہرست صرف مختصر ہو سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:test-tla-order`            | `tests/unit` کے تحت کوئی `node:test` فائل پہلے ٹیسٹ رجسٹر نہیں کرتی، پھر اعلیٰ سطح کے `await` تک نہیں پہنچتی، اور اس کے بعد مزید ٹیسٹ رجسٹر نہیں کرتی (#18045؛ ریچیٹ: `test-tla-order-allowlist.json` صرف مختصر ہو سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:agent-skills-sync`         | تیار کردہ ایجنٹ اسکلز کے نوادرات اپنے ماخذ کیٹلاگ سے مطابقت رکھتے ہیں (کوئی انحراف نہیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | پرووائیڈر لوگوز/اثاثوں کے ساتھ ماخذ کی درج شدہ اندراج موجود ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON کنفیگریشن فائلیں درست طور پر پارس ہوتی ہیں اور repo کے لنٹ قواعد پر پوری اترتی ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript کمپائلیشن بغیر کسی خرابی کے (صرف مشاورتی انتباہات)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `typecheck:noimplicit:core`       | سخت `noImplicitAny` — مستقبل پر مرکوز؛ پہلے سے موجود بہت سے کال مقامات کو اب بھی تشریحات درکار ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **مشاورتی** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` کو `src/app/(dashboard)/**` تک محدود کرتا ہے (#7033) — `typecheck:core` کی منتخب کردہ 27 فائلوں کی اجازت فہرست میں کوئی dashboard TSX شامل نہیں ہے، اور `next build` بھی کبھی اس کی ٹائپ چیکنگ نہیں کرتا (`next.config.mjs` میں `ignoreBuildErrors: true` مقرر ہے)، لہٰذا وہاں orphaned-identifier کی رجریشنز (#6625/#6909) CI کو نظر نہیں آتی تھیں۔ ایک منجمد، فی فائل/فی TS کوڈ تعداد کی baseline (`config/quality/dashboard-typecheck-baseline.json`، وہی stale-enforcement طرز جو `check:known-symbols` میں ہے) کے مقابلے میں فرق دیکھتا ہے — صرف baseline تعداد سے زیادہ نئی خرابیاں gate کو ناکام کرتی ہیں؛ جب پہلے سے موجود خرابی درست ہو جائے تو `--update` کے ساتھ حد کو کم کریں۔                                                                                                                                                                                                                                                                                                                                     | ہاں                                     |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`، `open-sse`، `packages`، `bin`، `scripts`، `electron/**/*.d.ts`) کے تحت پوری ایپلیکیشن کی پروڈکشن قسم کی جانچ؛ یہ دائرہ `typecheck:core` کی 27 فائلوں کی اجازت فہرست اور ڈیش بورڈ گیٹ کی حدود میں شامل نہیں۔ `config/quality/build-typecheck-baseline.json` کے خلاف فرق نکالا جاتا ہے؛ فی (فائل، کوڈ) شمار میں نیا یا بڑھا ہوا شمار ناکامی کا باعث بنتا ہے، جبکہ کم شمار آپ سے حد کم کرنے کا تقاضا کرتا ہے۔ اگر رَن میں کوئی نیا یا بڑھا ہوا جوڑا موجود ہو تو `--update` انکار کر دیتا ہے، جب تک `--force-regressions` نہ دیا جائے، اور نئی خاموش کی گئی فائل پر بھی انکار کرتا ہے جب تک `--force-nocheck` نہ دیا جائے؛ اس طرح گرین نتیجہ حاصل کرنے کے لیے بنیادی لکیر کو وسیع کرنا اور مستقل خاموشی دینا دو الگ دانستہ اقدامات ہیں۔ محض `--force` مسترد کر دیا جاتا ہے۔ بلڈ کے دائرے کو `@ts-nocheck` کے لیے `config/quality/ts-nocheck-baseline.json` کے خلاف بھی اسکین کیا جاتا ہے، کیونکہ اسے استعمال کرنے والی فائل کسی بھی تشخیصی نتیجے کی اطلاع نہیں دیتی اور بصورتِ دیگر ہر گیٹ سے پوشیدہ رہتی۔ | ہاں                                     |

#### دو قسم کی جانچ کے پروگرام مختلف جوابات دیتے ہیں

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) اور `check:build-typecheck` مختلف اختیارات کے تحت مختلف پروگرام
کمپائل کرتے ہیں، اور ایک ہی فائل ایک میں بالکل صاف جبکہ دوسرے میں خرابیوں سے بھری
ہو سکتی ہے۔

`tsconfig.build.json` میں `"strict": false` مقرر ہے، اس لیے `noImplicitAny` بند ہے۔
کور کنفیگ سخت تر اختیارات کے ساتھ منتخب کردہ 27 فائلوں کی اجازت فہرست کو کمپائل کرتا
ہے اور ہر اندراج کے امپورٹ گراف کی پیروی کرتا ہے، اس لیے بلڈ پروگرام میں کبھی ظاہر نہ
ہونے والی فائلوں کی بھی وہاں جانچ ہوتی ہے۔

فائل ٹائپ شدہ ہے یا نہیں، یہ فیصلہ کرتے وقت اس نتیجے کی اہمیت ہے: `check:build-typecheck`
کے تحت **صفر تشخیصی نتائج کا مطلب صفر نہیں** ہوتا۔ 26 فائلوں سے `@ts-nocheck` ہٹانے پر
معلوم ہوا کہ بلڈ پروگرام میں ان میں سے 23 صاف تھیں؛ ان میں سے سولہ نے سخت پروگرام میں
تقریباً 120 implicit-any خرابیوں کو ظاہر کیا۔ کسی فائل کو صاف قرار دینے سے پہلے دونوں
کی جانچ کریں۔

### جاب: `quality-gate`

`test-coverage` کے بعد چلتی ہے۔ ناکامی کی صورت میں merge کو روکتی ہے۔

| اسکرپٹ                       | توثیق                                                                                                                                                        | لازمی                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `quality:collect`            | `quality-metrics.json` بناتا ہے (ESLint انتباہات کی تعداد، ضم شدہ shard رپورٹ سے coverage)                                                                   | ہاں (ratchet سے پہلے) |
| `quality:ratchet`            | `quality-baseline.json` میں ہر metric کی حالت خراب نہیں ہوئی (ESLint انتباہات ≤ baseline؛ coverage ≥ baseline)                                               | ہاں                   |
| `check:duplication`          | کوڈ کی نقل (jscpd@4)، `quality-baseline.json` میں baseline سے زیادہ نہیں ہے                                                                                  | ہاں                   |
| `check:complexity`           | فائل کی سطح پر cyclomatic complexity مقررہ حد سے زیادہ نہیں ہے (بنیادی ESLint `complexity` + `max-lines-per-function`)                                       | ہاں                   |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — علیحدہ ESLint مرحلہ؛ CI دونوں کو ضم کر کے واحد `check:complexity-ratchets` مرحلے کے طور پر چلاتا ہے | ہاں                   |
| `check:dead-code`            | غیر استعمال شدہ exports / فائلوں کا ratchet (knip)، baseline کے مقابلے میں خراب نہیں ہوا                                                                     | ہاں                   |
| `check:compression-budget`   | Compression benchmark کا بجٹ — فی engine token-savings کی کم از کم حدود میں کمی نہیں ہونی چاہیے                                                              | ہاں                   |
| `check:type-coverage`        | ٹائپ شدہ فیصد کا ratchet (`type-coverage`) خراب نہیں ہوا؛ بڑی حد تک `typecheck:noimplicit:core` کا احاطہ کرتا ہے                                             | ہاں                   |

### جابز: `codeql-scan` اور `codeql-admission`

`codeql-scan` تمام ترتیب شدہ تجزیاتی زمرے پیدا کرتا ہے۔ اس جاب کی کامیابی کے بعد `codeql-admission` اس کے عین اپ لوڈز اور امیدوار کے انتباہات کی بڑھوتری روکنے والی حد کو جانچتا ہے۔ دونوں `Gate / CI` کی لازمی dependencies ہیں، صرف دستاویز بدلنے والے امیدواروں کے لیے بھی۔ انتظامی فعالیت اور canary کے تقاضے نیچے "CodeQL کی بڑھوتری روکنے والی حد" میں بیان ہیں۔

| اسکرپٹ                 | کیا جانچتا ہے                                                                                                                                                                                      | روکنے والا |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | انتباہات کی حد کی جانچ سے پہلے امیدوار ref/SHA اور تمام ترتیب شدہ تجزیاتی زمرے تازہ ہونے چاہییں؛ غائب ثبوت راستہ روکتا ہے۔ عمومی فہرست الگ رہتی ہے — نیچے "CodeQL کی بڑھوتری روکنے والی حد" دیکھیں | ہاں        |

### جاب: `quality-extended`

یہ جاب قابل اطلاق candidates کو روکتی ہے۔ Bundle size، secret findings، vulnerability
findings، workflow findings اور OpenAPI تبدیلیوں کو لازمی ratchets کے ذریعے جانچا جاتا ہے۔
Circular-dependency diagnostics صرف مشاورتی رہتے ہیں۔ Scanner کی تنصیب لازمی ہے:
`scripts/ci/install-quality-scanners.sh` مقررہ versions فراہم کرتا ہے اور تنصیب
کی ناکامیوں کو آگے منتقل کرتا ہے۔ غائب tools، غلط reports یا غائب baselines کی وجہ سے
لازمی scanner gate نامکمل رہتا ہے۔

| اسکرپٹ                   | توثیق                                                                                                                                                                                             | بلاکنگ                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | کوئی گردشی انحصارات نہیں (dpdm)                                                                                                                                                                   | **مشاورتی**                                   |
| `check:bundle-size`      | بنڈل کا حجم مقررہ حد سے زیادہ نہیں؛ پیمائش دستیاب نہ ہو تو ناکامی ہوتی ہے                                                                                                                         | **--ratchet کے ساتھ بلاکنگ**                  |
| `check:secrets`          | Gitleaks کے نتائج میں تنزلی نہیں ہوتی؛ لازمی اسکینز، ٹولز/سورس/بیس لائن کی عدم موجودگی، ناکام اسکینز اور غلط رپورٹس کو مسترد کرتے ہیں                                                             | **--ratchet کے ساتھ بلاکنگ**                  |
| `check:vuln-ratchet`     | انحصارات کی کمزوریوں میں تنزلی نہیں ہوتی؛ لازمی اسکینز، ٹولز کی عدم موجودگی، غلط رپورٹس یا غائب بیس لائنز کو مسترد کرتے ہیں                                                                       | **--ratchet کے ساتھ بلاکنگ**                  |
| `check:workflows`        | ورک فلو لنٹ (actionlint + zizmor)؛ غائب/خراب اسکینرز، غلط رپورٹس یا غائب ratchet بیس لائن INCOMPLETE کے طور پر ناکام ہوتے ہیں۔ درست نتائج منتخب کردہ سخت/مشاورتی/ratchet پالیسی کی پیروی کرتے ہیں | عمل درآمد لازمی؛ CI میں zizmor ratchet بلاکنگ |
| `check:openapi-breaking` | پن کیے گئے ایونٹ کمٹس کے مقابل عوامی API معاہدہ (PR merge-base، push before، merge-group base؛ شیڈول شدہ/دستی checkout کے لیے پہلے first parent)؛ لازمی پیمائش بند حالت میں ناکام ہوتی ہے         | **--ratchet کے ساتھ بلاکنگ**                  |

### ملازمت: `docs-sync-strict`

`main` یا `release/**` کو پل کی درخواستوں کے لیے، یہ جاب صرف نان ڈرافٹ (یا قابل بھروسہ قطار) امیدواروں کے لیے چلتا ہے جنہیں دستاویزات یا کوڈ میں تبدیلی کے طور پر درجہ بندی کیا گیا ہے۔ یہ نان PR CI ایونٹس پر بھی چلتا ہے۔ اس ورک فلو کا پش ٹرگر صرف `main` کا احاطہ کرتا ہے، `release/**` نہیں۔ غیر صفر سے باہر نکلنے والا قدم کام کو روکتا ہے۔ صرف رپورٹ کے نتائج اور ذیل میں دستاویزی استثنیٰ ایسا نہیں کرتا ہے۔

| اسکرپٹ                         | توثیق                                                                                                                                                                                                                                                                                                                                                                                                                       | بلاکنگ                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | میٹا گیٹ جو ذیل کے 7 ذیلی گیٹس کو یکے بعد دیگرے چلاتا ہے                                                                                                                                                                                                                                                                                                                                                                    | ہاں                                                                                                                                |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG ورژن کی مستقل مزاجی، عین مطابق `llm.txt` آئینے، ترجمہ شدہ CHANGELOG section/size انویریئنٹس، اور سپرسیڈ ڈپلیکیٹ دستاویزات کی عدم موجودگی                                                                                                                                                                                                                                                          | جی ہاں                                                                                                                             |
| ↳ `check:docs-frontmatter`     | مرتب شدہ دستاویزات کے صفحات میں درست فرنٹ میٹر ٹائٹلز ہوتے ہیں۔                                                                                                                                                                                                                                                                                                                                                             | جی ہاں                                                                                                                             |
| ↳ `check:docs-counts`          | اعلیٰ اعتماد کی گنتی ناگوار سخت ہوتی ہے۔ ہیورسٹک فائل کاؤنٹ چیک صرف انتباہ دیتے ہیں جب تک کہ اسکرپٹ کو `--strict` موصول نہ ہو ( CI میٹا گیٹ اسے پاس نہیں کرتا ہے)                                                                                                                                                                                                                                                           | سخت ٹائر بلاکنگ؛ نرم درجے کی ایڈوائزری                                                                                             |
| ↳ `check:env-doc-sync`         | ماخذ env ریڈز، `.env.example`، اور `docs/reference/ENVIRONMENT.md` واضح نظر انداز، صرف دستاویز، اور صرف env کی اجازت دینے والی فہرستوں کے بعد متفق ہیں                                                                                                                                                                                                                                                                      | ہاں، دستاویزی اجازت یافتہ فہرستوں سے باہر                                                                                          |
| ↳ `check:deprecated-versions`  | محفوظ تاریخی سیاق و سباق اور باسی اپ ڈیٹ کی تاریخوں سے باہر ممکنہ باسی ورژن کی رپورٹ کرتا ہے، نظر انداز شدہ دستاویزات کو چھوڑ کر                                                                                                                                                                                                                                                                                            | موجودہ CI وائرنگ میں ایڈوائزری (`--strict` پاس نہیں ہے)                                                                            |
| ↳ `check:doc-links`            | دستاویزات میں داخلی مارک ڈاؤن لنکس اصلی فائلوں کو حل کرتے ہیں (`[text]`/`(path)` فارم)                                                                                                                                                                                                                                                                                                                                      | جی ہاں                                                                                                                             |
| ↳ `check:fabricated-docs`      | روٹس، env vars، CLI کمانڈز، ہک کے نام، اور دستاویزات میں درج فائل پاتھ کوڈ بیس میں موجود ہیں۔ `--strict` کے ذریعے سخت گیٹ؛ بغیر جھنڈے کے نرم فیل۔                                                                                                                                                                                                                                                                           | ہاں ( CI میں `--strict` کے ذریعے)                                                                                                  |
| `check:cli-i18n`               | CLI میں استعمال ہونے والی `t()` کلیدیں `en` میں موجود ہیں؛ `pt-BR` ہر اعلیٰ سطح کے حصے کو برقرار رکھتا ہے؛ `zh-CN` اور `zh-TW` میں `en` کی ہر کلید موجود ہے                                                                                                                                                                                                                                                                 | ہاں                                                                                                                                |
| `check:openapi-coverage`       | OpenAPI spec حقیقی routes کی کم از کم ratcheted حد کا احاطہ کرتی ہے                                                                                                                                                                                                                                                                                                                                                         | ہاں                                                                                                                                |
| `check:openapi-security-tiers` | اعلان کردہ `x-loopback-only`/`x-always-protected` تشریحات کی تائید `routeGuard.ts` سے ہونی چاہیے؛ پارسر کی غلطیاں اور آگے کی سمت جانچ میں عدم مطابقت روکتی ہے۔ صرف مقامی رسائی والے سابقوں کے تحت غائب `x-loopback-only` کی الٹی جانچ تنبیہ کرتی ہے، اور صرف پیٹرن سے متعین روٹس اس الٹی جانچ سے خارج ہیں۔                                                                                                                  | پارسر/آگے کی سمت جانچیں روکتی ہیں؛ الٹی جانچ مشاورتی ہے                                                                            |
| `check:openapi-routes`         | جواز کے ساتھ درج `KNOWN_STALE_SPEC` استثنائی فہرست لاگو کرنے کے بعد، `openapi.yaml` میں ہر `/api...` پاتھ پیرامیٹرز کے فرق سے قطع نظر حقیقی روٹ سے مطابقت رکھتا ہے؛ استثنائی فہرست کے پرانے اندراجات بھی ناکامی کا باعث بنتے ہیں                                                                                                                                                                                            | ہاں                                                                                                                                |
| `check:docs-symbols`           | ایسی مستند بنیادی دستاویزات میں جو آئینہ نقول نہیں ہیں، اندرونی `/api/...` URL حوالے حقیقی روٹ یا روٹس کے خاندان سے مطابقت رکھتے ہیں؛ پراکسی/اپ اسٹریم/پلیس ہولڈر/فائل کے حوالے اور جواز والے `KNOWN_STALE_DOC_REFS` اندراجات خارج ہیں، اور استثنائی فہرست کے پرانے اندراجات ناکامی کا باعث بنتے ہیں                                                                                                                        | ہاں                                                                                                                                |
| `i18n translation drift`       | مکمل داخلہ کے لیے صفر ماخذ، گمشدہ ہدف، ٹارگٹ ہیش، باسی ترجمہ اور سیکشن کیشے میں تضادات کی ضرورت ہوتی ہے۔ عام PR تیاری بالکل وراثت میں ملنے والے ثبوت یا صرف انگریزی میں زیر التواء تبدیلی کو برقرار رکھ سکتی ہے جس میں کوئی تبدیلی نہیں کی گئی مکمل حالت اور ہدف بائٹس کے ساتھ؛ اس کی رپورٹ الگ سے انضمام کی تیاری کا اعلان کرتی ہے۔ گمشدہ ٹارگٹ ہیشز اور نامکمل بنیاد ثبوت بلاک۔ غیر حاضر میراثی سیکشن کیش ناکامی نہیں ہے۔ | تمام پانچ کلاسز queue/base کے داخلہ کو روکتی ہیں۔ عام تیاری کی اجازت صرف وراثتی یا انگریزی میں صرف زیر التواء کام کو ثابت کرتی ہے۔ |

`docs/diagrams/` کے تحت بارہ README SVGs پیدا ہوتے ہیں (`scripts/docs/gen-readme-<name>.mjs`؛ `npm run docs:readme-diagrams` ان سب کو دوبارہ تخلیق کرتا ہے)۔ ہر ایک کا بائٹ کمپیئر یونٹ ٹیسٹ (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ہوتا ہے جو اس وقت ناکام ہوجاتا ہے جب کمٹڈ فائل باسی ہوتی ہے، اور `check:docs-counts` اپنے `<text>` نوڈس — سے کینونیکل نمبر پڑھتا ہے جس کی وجہ سے آؤٹ لائننگ مرحلہ فائل میں ہر آؤٹ لائن سٹرنگ کو پوشیدہ `<text>` کے طور پر رکھتا ہے۔ SVG کینونیکل نمبرز چیک `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) میں درج فائلوں کو پڑھتا ہے: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, علاوہ `public/images/tier-flow-dark.svg` اور `tier-flow-light.svg`؛ فری-ایور، کیٹلاگ-انٹری، ریکرنگ پول اور اسکورنگ فیکٹرز کے دعوے `promise-pillars.svg`، `free-tier-budget.svg` اور `strategies-grid.svg` بھی پڑھتے ہیں۔ `free-tier-budget.svg` لائیو کیٹلاگ لوڈر سے اپنے اعداد و شمار کھینچتا ہے، لہذا `FREE_MODEL_BUDGETS` یا فراہم کنندہ کے ڈسپلے نام میں تبدیلی CI اس وقت تک سرخ کر دیتی ہے جب تک کہ فائل دوبارہ نہیں بن جاتی۔

### جاب: `i18n-ui-coverage`

| اسکرپٹ                              | توثیق                                                                                                                                                                            | مسدود کنندہ     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (اِن لائن) | UI i18n کلیدوں کی کوریج ≥ 65% ہے                                                                                                                                                 | ہاں             |
| `check-ui-value-drift` (اِن لائن)   | دوبارہ لکھی گئی انگریزی **قدر** اپنے پیچھے کوئی فرسودہ ترجمہ نہیں چھوڑتی                                                                                                         | ہاں             |
| `check-new-key-coverage` (اِن لائن) | ایک **نئی** انگریزی کلید کا ہر locale میں ترجمہ موجود ہے — `__MISSING__:` مارکر مسترد کر دیا جاتا ہے                                                                             | ہاں             |
| `check-translation-ratio`           | فی locale حقیقی ترجمے کا تناسب (انگریزی سے مماثل / placeholder / allowlist سے باہر غائب leaves) `config/quality/i18n-translation-baseline.json` + slack سے تجاوز نہیں کرنا چاہیے | **مسدود کنندہ** |

`fetch-depth: 0` درکار ہے — value-drift گیٹ `en.json` کا merge base کے مقابلے میں diff لیتا ہے۔

#### `check-ui-value-drift` — پرانے ترجمے کا گیٹ

یہ اس واحد i18n regression کو پکڑتا ہے جسے دوسرے گیٹس ساختی طور پر نہیں دیکھ سکتے: کسی انگریزی قدر کو
دوبارہ لکھ دیا جاتا ہے اور _پچھلی_ انگریزی سے اخذ کردہ تراجم وہیں رہ جاتے ہیں، لہٰذا
غیر انگریزی صارفین پراعتماد انداز میں لکھی ہوئی مگر اب غلط عبارت پڑھتے رہتے ہیں۔

یہ مسئلہ واقعی ریلیز ہوا تھا۔ `oauthModal.googleOAuthWarning` کو اس وقت دوبارہ لکھا گیا جب Antigravity
login helper شامل کیا گیا (#5203)؛ **43 میں سے 39 locales** میں ایسا متن برقرار رہا جو آپریٹرز سے کہتا تھا کہ "مکمل
URL کاپی کریں اور اسے نیچے پیسٹ کریں" — ایسا flow جو اس provider کے لیے مکمل ہی نہیں ہو سکتا۔ یہ
#8463 تک نظر انداز رہا کیونکہ:

- `sync-ui-keys` صرف ان کلیدوں کو backfill کرتا ہے جو **موجود نہیں**، ان کو کبھی نہیں جو **فرسودہ** ہیں؛
- `check-ui-keys-coverage` کلید کی _موجودگی_ شمار کرتا ہے، اس لیے فرسودہ ترجمہ بھی covered شمار ہوتا ہے؛
- `check-translation-drift`، `docs/i18n/<locale>/**.md` دستاویزی mirrors کو track کرتا ہے —
  یہ کبھی بھی `src/i18n/messages/*.json` نہیں پڑھتا۔ 2026-09 کی دوبارہ sync کے بعد سے job `docs-sync-strict` میں blocking:
  کسی core doc میں ترمیم کریں → `npm run i18n:run -- --files=<doc>` (section-level، کم خرچ)۔

**Diff-aware، baseline-backed نہیں۔** یہ merge base پر موجود `en.json` کا working tree سے
موازنہ کرتا ہے؛ ہر اس کلید کے لیے جس کی انگریزی قدر تبدیل ہوئی ہو، کوئی بھی locale جس میں
غیر تبدیل شدہ ترجمہ اب بھی موجود ہو، فرسودہ ہے۔ یہ دانستہ طور پر **پہلے سے موجود قرض کو منجمد** کرتا ہے — کوئی diff
یہ ظاہر نہیں کر سکتا کہ ایک طویل عرصے سے موجود ترجمہ کس پرانی انگریزی سے آیا تھا، اس لیے گیٹ
صرف اسی چیز کا جائزہ لیتا ہے جسے موجودہ تبدیلی چھوتی ہے۔ متبادل (فی کلید hash baseline) کے لیے
تقریباً 600 KB کی generated file درکار ہوتی، جو سب سے بڑے موجودہ baseline سے 3× بڑی ہوتی اور ہر i18n PR پر تبدیل ہوتی۔

اسے مطمئن کرنے کے دو طریقے ہیں:

1. متاثرہ تراجم کو update کریں، یا
2. انہیں `__MISSING__:<new english>` پر set کریں — اس کے بعد runtime درست انگریزی پیش کرتا ہے
   (`src/i18n/request.ts::deepMergeFallback`، #7258) اور کلید ترجمے کے لیے queue ہو جاتی ہے۔

اگر string کا **مفہوم** تبدیل ہوا ہے تو **کلید کا نام تبدیل کرنے** کو ترجیح دیں: نئی کلید
فرسودہ ترجمہ وراثت میں نہیں لے سکتی۔ #8463 میں یہی pattern استعمال کیا گیا۔

```bash
npm run i18n:check-value-drift          # سخت (CI یہی چلاتا ہے)
npm run i18n:check-value-drift:warn     # صرف رپورٹ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ویلیو ڈرفٹ اور نئی کلید کے گیٹس
`scripts/i18n/resolve-ui-diff-base.mjs` سے ایک ہی ناقابلِ تغیر موازنہ استعمال کرتے ہیں۔ ورک فلو دونوں جانچوں کو یکساں بیس، بیس ٹِپ اور
امیدوار SHAs فراہم کرتا ہے۔ PR/بیس-ری ٹارگٹ، پُش اور مرج-گروپ رنز اپنے ایونٹ
کانٹیکسٹ کو استعمال کرتے ہیں۔ امیدوار برانچ کو ڈسپیچ کرنے کے لیے اس کا عین اوپن PR یا واضح
`i18n_base_sha` اِن پٹ درکار ہے۔ اس اِن پٹ کے بغیر `main` یا `release/vX.Y.Z` کا
ڈسپیچ یا شیڈیولڈ مشاہدہ آخری کمٹ کا اس کے پہلے پیرنٹ سے موازنہ کرتا ہے؛ یہ
وراثت میں ملنے والے تمام ترجماتی قرض کا آڈٹ نہیں ہے۔ مقامی طور پر چلانے کے لیے ایک واضح موازناتی بیس
درکار ہے، مثلاً اوپر دی گئی `BASE_REF` کمانڈ۔

غائب یا مبہم موازناتی کانٹیکسٹ، ناقابلِ مطالعہ یا غلط مطلوبہ کیٹلاگ، اور
تبدیل شدہ امیدوار کے نتیجے میں ایگزٹ کوڈ **2** کے ساتھ `INCOMPLETE` حاصل ہوتا ہے، بشمول وارن موڈ۔
کیٹلاگ پڑھنے کے لیے `scripts/i18n/read-ui-catalog.mjs` استعمال ہوتا ہے؛ پڑھنے میں ناکامیوں کو
خالی آبجیکٹس سے تبدیل نہیں کیا جاتا۔ نہ تو غیر دستیاب بیس اور نہ ہی نامکمل اِن پٹ PASS ثابت کرتا ہے۔

### ملازمت: `i18n`

مکمل i18n توثیق میٹرکس (ایک کام فی لوکل)۔ پورا کام مشورتی ہے۔

| اسکرپٹ                          | تصدیق کرتا ہے۔          | بلاک کرنا                                              |
| ------------------------------- | ----------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | ترجمہ کی تکمیل فی لوکیل | **ایڈوائزری** (پورے کام پر `continue-on-error: true` ) |

### ملازمت: `pr-test-policy`

صرف پل کی درخواستوں پر چلتا ہے۔

| اسکرپٹ                 | تصدیق کرتا ہے۔                                                                                                                               | بلاک کرنا |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs جو `src/`، `open-sse/`، `electron/`، یا `bin/` میں پروڈکشن کوڈ کو تبدیل کرتا ہے اس میں ٹیسٹ شامل کرنا یا اپ ڈیٹ کرنا چاہیے (ہارڈ رول #8) | جی ہاں    |
| `check:test-masking`   | تبدیل شدہ ٹیسٹ فائلیں خالص دعویٰ کی تعداد کو کم نہیں کرتی ہیں یا `assert.ok(true)` tautologies کو شامل نہیں کرتی ہیں۔                        | جی ہاں    |
| `check:pr-evidence`    | PR باڈی تبدیلی کے لیے test/VPS ثبوت کا حوالہ دیتی ہے ( PR prose — نازک کو گریپ کرکے ہارڈ رول #18 میکانائز کرتا ہے، بیکلاگ دیکھیں)            | جی ہاں    |

### Job: `test-vitest`

`changes` درجہ بندی جاب درکار ہے۔ قابلِ اطلاق میٹرکس شارڈز کی ناکامی پر مرج مسدود ہو جاتا ہے۔

| مجموعہ           | توثیق کرتا ہے                                    | بلاک کرنے والا                                                                                                                        |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP سرور (110 ٹولز)، autoCombo، کیش — vitest رنر | ہاں                                                                                                                                   |
| `test:vitest:ui` | UI کمپوننٹ ٹیسٹس — vitest رنر                    | **بلاک کرنے والا** — پہلے سے موجود ناکامیاں `vitest.config.ts` میں واضح طور پر خارج کی گئی ہیں؛ نئی ناکامیاں جاب کو ناکام کر دیتی ہیں |

### نائٹ ورک فلو (شیڈول، ایڈوائزری)

یہ کرون شیڈول (اور `workflow_dispatch`) پر چلتے ہیں، کبھی PRs پر نہیں۔ سب مشورے ہیں۔

| ورک فلو                | تصدیق کرتا ہے۔                                                                                                                                                    | بلاک کرنا     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | رینڈم سیڈ + ہائی رن گنتی کے ساتھ پراپرٹی کے ٹیسٹوں کو تیزی سے چیک کریں۔                                                                                           | **ایڈوائزری** |
| `nightly-resilience`   | ہیپ گروتھ گیٹ، افراتفری فالٹ انجیکشن، k6 load/soak                                                                                                                | **ایڈوائزری** |
| `nightly-llm-security` | promptfoo انجیکشن گارڈ (بلاک موڈ) + garak پروبس (ایک فراہم کنندہ کے راز کے بغیر چھوڑ دیا گیا)                                                                     | **ایڈوائزری** |
| `nightly-schemathesis` | OpenAPI کنٹریکٹ fuzzing (schemathesis) `docs/openapi.yaml` — کا استعمال کرتے ہوئے ایک لائیو OmniRoute کے خلاف سرفیس spec violations / unhandled 500s (Fase 8 B.4) | **ایڈوائزری** |
| `nightly-mutation`     | تیز رفتار یونٹ لین — پر اسٹرائیکر میوٹیشن ٹیسٹنگ سکور زندہ بچ جانے والے اتپریورتیوں کی سطح کے کمزور دعوے                                                          | **ایڈوائزری** |
| `nightly-compat`       | تعاون یافتہ `engines.node` رینجز میں نوڈ انجن کمپیٹیبلٹی میٹرکس                                                                                                   | **ایڈوائزری** |

کارکردگی کی بنیادی خطوط (ہیپ، TTFB، بلڈ ٹائم) ریکارڈ کی جاتی ہیں، گیٹڈ نہیں: دیکھیں [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)۔

---

## رفتار کا مرحلہ (2026-08-30 → v4.0 LTS): ہر بنیادی حد میں 20% نرمی

مالک کا فیصلہ (2026-08-30): v4.0 کی ماڈیولرائزیشن تک، تکنیکی قرض کی حد برقرار رکھنے کے مقابلے میں ریلیز کی رفتار زیادہ اہم ہے۔ ہر **عددی** ریچٹ بنیادی حد کو ایک قابلِ آڈٹ مرحلے میں 20% نرم کیا گیا، اور اس مرحلے کا اعلان `config/quality/quality-baseline.json` میں کیا گیا ہے:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| کیا تبدیل ہوا                                                                                                                                                                                     | کہاں                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — کم بہتر ہونے والی گنتیاں ×1.2، زیادہ بہتر ہونے والی فیصدیں ÷1.2 (کوریج کی کم از کم حد 60 برقرار، `eslintErrors` بدستور 0، `eslintWarnings` 0 → منجمد suppression گنتی کا 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` نوٹ میں ہر پہلے → بعد کی قدر درج ہے)             |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                  | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`، `testCap`، ہر `frozen[*]` / `testFrozen[*]` سطر کی حد ×1.2                                                                                                                                 | `file-size-baseline.json`                                                                              |
| فی فائل / فی TS کوڈ گنتیاں ×1.2                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                               | `scripts/check/check-openapi-coverage.mjs`                                                             |
| جب `_policy.requireTighten === false` ہو تو `--require-tighten` صرف مشاورتی رہتا ہے                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| رات کا `bank-ratchet-shrinks` موقوف ہے (یہ ناپی گئی کمی کو محفوظ کر کے اضافی گنجائش ختم کر دیتا)                                                                                                  | `.github/workflows/nightly-release-green.yml`                                                          |

اجازت فہرستیں (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) بجٹ **نہیں** ہیں اور انہیں تبدیل نہیں کیا گیا۔ پاس/فیل پالیسی گیٹس (راز، SQL قواعد،
دستاویزات/ماحول کا معاہدہ، i18n برابری، یونٹ ٹیسٹس) میں کوئی تبدیلی نہیں — ناکام ٹیسٹ اب بھی ناکام ٹیسٹ ہی ہے۔

**ٹولنگ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ایک مرتبہ کی جانے والی
  نرمی (`scripts/quality/relax-baselines.mjs`)؛ ایک ہی نوٹ کے ساتھ دوسری بار چلنے سے انکار کرتی ہے۔
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  ہر عددی گیٹ کو اسی طرح ناپتا ہے جیسے CI ناپتا ہے اور ہر گیٹ کی باقی ماندہ گنجائش دکھاتا ہے
  (`scripts/quality/baseline-headroom.mjs`)۔ رات کا `baseline-headroom` جاب جدول کو ورک فلو رَن کے خلاصے میں شائع کرتا ہے اور اپنی JSON/Markdown رپورٹ
  `baseline-headroom-<run_id>` کے نام سے اپ لوڈ کرتا ہے، جسے 90 دن تک برقرار رکھا جاتا ہے۔ انتباہی اور نازک قطاریں ان گیٹس کی نشاندہی کرتی ہیں
  جو اپنی حد کے 10% کے اندر ہوں یا پہلے ہی اسے عبور کر چکے ہوں۔ بجٹ استعمال ہونے کی پیشگی تنبیہ کے طور پر ان رپورٹس کا جائزہ لیں؛
  متعلقہ گیٹ کے `_rebaseline_*` نوٹس دیکھیں۔ یہ جاب اب کوئی مستقل مسئلہ تخلیق یا اپ ڈیٹ نہیں کرتا؛ #12149 میں پچھلی رپورٹوں کی تاریخ محفوظ ہے۔

**نئے کوڈ کا موڈ (Clean-as-You-Code) — 2026-08-30 سے، صرف PR تیز راستے کے لیے**

`pull_request` ایونٹس پر `quality.yml`، `check:file-size`،
`check:complexity-ratchets` اور `check:dead-code` کو `--base-ref <PR base SHA>` فراہم کرتا ہے۔ `check:complexity-ratchets` اور
`check:dead-code` کے لیے گیٹ HEAD کا merge-base کے ساتھ موازنہ **صرف ان فائلوں تک محدود رکھ کر کرتا ہے جنہیں PR نے تبدیل کیا**
(`scripts/check/newCodeMode.mjs`: merge-base کو عارضی
`git worktree` میں عملی شکل دی جاتی ہے، ESLint/knip وہاں اور HEAD پر چلائے جاتے ہیں، اور فی فائل گنتیوں کا فرق نکالا جاتا ہے):

- **روکنے والا** — PR نے تبدیل کردہ فائلوں میں cyclomatic/cognitive خلاف ورزیاں یا dead exports شامل کیے
  (لاگ میں `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **مشاورتی** — عالمی مجموعہ بمقابلہ منجمد بنیادی خط۔ وراثتی انحراف کبھی کسی بے قصور PR کو
  سرخ نشان زد نہیں کرتا؛ اس انحراف کو ریلیز کی تطبیق کے وقت مرمت کے لیے ٹریک کیا جاتا ہے اور
  ہیڈ روم جاب اس کی نگرانی کرتی ہے۔

`check:file-size` بنیادی ریفرنس کو اپنی شرائط کے مطابق استعمال کرتا ہے (`scripts/check/check-file-size.mjs`, #8522):
یہ درخت میں موجود ہر سورس اور ٹیسٹ فائل کی جانچ کرتا ہے، `git show` کے ذریعے PR کی بنیادی حالت پر ہر فائل کی سطروں کی تعداد پڑھتا ہے،
اور کسی فائل کو صرف تب ناکام کرتا ہے جب وہ اپنی بنیادی حد کی زیادہ بڑی بالائی حد
(`frozen` / `testFrozen`، یا بنیادی حد سے باہر فائل کے لیے `cap` / `testCap`) اور اپنے بنیادی حجم دونوں سے بڑھ جائے۔
لہٰذا بنیادی حالت میں پہلے ہی منحرف فائل کبھی کسی بے قصور PR کو ناکام نہیں کرتی۔

`check:boundary:ratchet` اپنے واحد عدد پر بھی یہی اصول لاگو کرتا ہے
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ایونٹس پر
`quality.yml` کے fast-gates اور `ci.yml` کا lint job، دونوں PR base SHA فراہم کرتے ہیں، base commit
کی پیمائش `git archive` export سے کی جاتی ہے، اور PR صرف اس وقت ناکام ہوتا ہے جب اس کی `open-sse → src` edge
تعداد `metrics.boundaryOpenSseToSrc` اور base پر موجود تعداد میں سے بڑی قدر سے تجاوز کرے۔ حد سے زیادہ
base drift کی اطلاع دی جاتی ہے (`base drift herdado`) لیکن اس سے کسی بے قصور PR کو کبھی سرخ نہیں کیا جاتا؛ push → main
مطلق حد برقرار رکھتا ہے، اور ایسا base SHA جسے resolve نہ کیا جا سکے، warning کے ساتھ اسی حد پر واپس آ جاتا ہے۔

`workflow_dispatch` runs، release-green sweep اور nightly headroom job کے پاس کوئی PR base
نہیں ہوتا اور وہ مطلق (global) موازنہ برقرار رکھتے ہیں۔ Coverage، duplication اور type-coverage فی الحال global
رہتے ہیں (ان کے tools کم لاگت میں per-file diff تیار نہیں کرتے) — یہی طریقہ اپنانے کے امیدوار ہیں۔

**v4.0 پر phase بند کرنا (LTS = پہلے سے زیادہ سخت، نہ کہ "معمول پر واپسی")**

1. خالص `release/v4.0.0` tip پر: ریکارڈ کے لیے `npm run quality:headroom --json`، پھر
   `npm run quality:ratchet -- --update`، `check:file-size --update`،
   `check:complexity-ratchets --update`، `check:dead-code --update`، ہر typecheck gate کا
   `--update` — ہر baseline ناپی گئی قدر تک کم ہو جاتا ہے۔
2. `quality-baseline.json` سے `_policy` حذف کریں (`--require-tighten` اور nightly
   banking کو دوبارہ فعال کرتا ہے)، `check-openapi-coverage.mjs` میں `THRESHOLD = 36` (یا اس سے زیادہ) بحال کریں۔
3. جہاں modularization مؤثر رہی ہو وہاں ناپی گئی قدر سے بھی زیادہ سخت کریں: file-size `cap` دوبارہ 1000
   (یا 800)، coverage floors میں +5، modularized packages کے لیے dead exports کی تعداد 0۔

## ریچیٹ بیس لائن (`quality-baseline.json`)

ریچیٹ انجن (`scripts/quality/check-quality-ratchet.mjs`)، `quality-baseline.json`
کو پڑھتا ہے اور اس کا تازہ جمع کردہ `quality-metrics.json` کے ساتھ موازنہ کرتا ہے۔ کوئی بھی میٹرک جو
اپنے ایپسیلون سے زیادہ تنزلی کا شکار ہو، بلڈ کو ناکام کر دیتا ہے۔

فی الحال ٹریک کیے جانے والے میٹرکس:

| میٹرک                 | سمت    | مطلب                                      |
| --------------------- | ------ | ----------------------------------------- |
| `eslintWarnings`      | `down` | ESLint انتباہات کی تعداد بڑھنی نہیں چاہیے |
| `coverage.statements` | `up`   | اسٹیٹمنٹ کوریج کم نہیں ہونی چاہیے         |
| `coverage.lines`      | `up`   | لائن کوریج کم نہیں ہونی چاہیے             |
| `coverage.functions`  | `up`   | فنکشن کوریج کم نہیں ہونی چاہیے            |
| `coverage.branches`   | `up`   | برانچ کوریج کم نہیں ہونی چاہیے            |

حقیقی بہتری کے بعد بیس لائن اپ ڈیٹ کرنے کے لیے:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` فلیگ موجودہ پیمائش شدہ اقدار کو `quality-baseline.json` میں لکھتا ہے۔
اس فائل کو اس تبدیلی کے ساتھ کمٹ کریں جس نے میٹرک کو بہتر بنایا ہے۔ ایسی PR جو
بیس لائن اپ ڈیٹ کیے بغیر کسی میٹرک کو بہتر بنائے، اسے `--require-tighten` پکڑ لے گا (مرحلہ 6A.5،
نفاذ زیرِ التوا ہے)۔

### CodeQL شافٹ: امیدوار داخلہ اور ذخیرہ انوینٹری

CI ایک واضح انحصاری سلسلہ کے ذریعے امیدوار CodeQL داخلہ کا مالک ہے: `codeql-scan` `codeql.yml` میں چار زبانوں کے میٹرکس کو کال کرتا ہے، پھر `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` چلاتا ہے۔ `Gate / CI` دونوں نتائج درکار ہیں۔ معیار اپنی عددی جانچ کو برقرار رکھتا ہے لیکن پروڈیوسر کے ختم ہونے سے پہلے اسکینر سے استفسار نہیں کرتا ہے۔ صرف `Gate / Quality` امیدواروں کا مکمل داخلہ نہیں ہے۔ CodeQL صرف دستاویزات کے امیدواروں کے لیے ضروری ہے۔

`config/quality/codeql-admission-policy.json` میں پالیسی ایکشنز، C/C++، JavaScript/TypeScript اور Python، استفسار سویٹ ڈیفالٹ، ریموٹ تھریٹ ماڈل اور بلڈ موڈ کوئی نہیں منتخب کرتی ہے۔ پروڈیوسر پری فلائٹ ایک زیر التواء ایکٹیویشن ریکارڈ کو مسترد کرتا ہے اور واضح ہدف کی فہرست سے باہر شاخیں کرتا ہے۔ موجودہ اہداف اہم ہیں اور release/v3.8.54. کنٹریکٹ ٹیسٹ اس محدود فہرست اور مینٹیننس پش ٹرگر کا پیکیج ورژن کے ساتھ موازنہ کرتے ہیں۔ اگلی ریلیز آن بورڈنگ کا جائزہ لینے کی ضرورت ہے۔ CI کی موجودہ وسیع تر ریلیز PR ٹرگر کو برقرار رکھا جاتا ہے، لیکن بغیر بورڈ شدہ ہدف HOLD بغیر پیمائش کے PASS حاصل کرنے کے بجائے نکالنے سے پہلے رپورٹ کرتا ہے۔

ہر میٹرکس جاب اپنے اصل SARIF اپ لوڈ ID، زبان، زمرہ، چلانے اور کوشش، کالر ورک فلو کی شناخت، ایونٹ ref/head/base/merge SHA اور پالیسی ہیش کو ریکارڈ کرتا ہے۔ منحصر ملازمت صرف اس رن کی رسیدیں ڈاؤن لوڈ کرتی ہے اور آرٹفیکٹ ڈائجسٹ کی توثیق کرتی ہے۔ اس کے لیے چاروں زمروں، ایک کامیاب پروڈیوسر اور ہر درست اپ لوڈ کی مکمل پروسیسنگ کی ضرورت ہے۔ یہ API کا sarif_id فلٹر استعمال کرتا ہے، برانچ پر پایا جانے والا تازہ ترین تجزیہ نہیں۔ جزوی طور پر دوبارہ دوڑنا ایک ہی دوڑ اور امیدوار کی سابقہ کوشش سے کامیاب زمرے دوبارہ استعمال کر سکتا ہے، پیداواری کوشش کو محفوظ رکھتے ہوئے؛ ایک ناکام موجودہ پروڈیوسر پچھلے سبز ثبوت کو دوبارہ استعمال نہیں کرسکتا۔

CodeQL ایکشن پروسیسنگ کا انتظار کرتا ہے، لیکن اس کا پن لگا ہوا عمل انتباہ کر سکتا ہے اور سٹیٹس پڑھنے کی ناکامی یا تھکے ہوئے انتظار کے بعد جاری رکھ سکتا ہے۔ اس لیے داخلہ دوبارہ پروسیسنگ کی تصدیق کرتا ہے۔ گمشدہ زمرے، زیر التواء پروسیسنگ، ناکام یا منسوخ شدہ جابز، باسی شناخت، نامکمل صفحہ بندی یا غیر دستیاب APIs HOLD پیدا کرتا ہے اور باہر نکلتا ہے۔ ایک غیر اسکین شدہ PR پاس نہیں ہو سکتا کیونکہ ایک الرٹ استفسار 0 واپس آیا۔ `metrics.codeqlAlerts.value` کے اوپر ایک پیمائش شدہ شمار 1 سے باہر نکلتا ہے۔ بیس لائن کو کسی اور برانچ کے انتباہات کو جذب کرنے کے لیے نہیں اٹھایا گیا ہے۔ [اپ لوڈ کی حیثیت اور تجزیہ تلاش کریں](https://docs.github.com/en/rest/code-scanning/code-scanning) ۔

رسید ریکارڈز IDs، زمرہ جات، ٹول ورژنز، ref/SHA، بیس لائن اور الرٹ نمبرز کو اپ لوڈ اور تجزیہ کرتی ہے۔ SARIF identity/result گنتی، کم از کم اصول شمار اور عین مطابق الرٹ مثالیں لازمی رہیں۔ قبول کرنے سے پہلے PR/analysis شناختوں کی دوبارہ جانچ پڑتال کی جاتی ہے۔ یہ چیک ترتیب شدہ زمرہ کی کوریج قائم کرتے ہیں، ہر نکالی گئی سورس فائل کی انوینٹری نہیں۔ C/C++ no-build ایکسٹرکشن میں پروجیکٹ کی تعمیر کے دوران تیار کردہ کوڈ شامل نہیں ہوتا ہے۔ ماخذ کے اخراج کو ابھی بھی نظرثانی کی ضرورت ہے، اور تعاون کنندہ کے انتساب کو تقابلی عین مطابق ثبوت کی ضرورت ہے۔

`codeql-maintenance.yml` PR/main پروڈیوسرز کو نقل کیے بغیر فعال ریلیز پش اسکین اور ہفتہ وار شیڈول فراہم کرتا ہے۔ `nightly-codeql-inventory.yml` ذخیرے کی وسیع بیس لائن کو `--strict-measurement` کے ساتھ الگ رکھتا ہے اور پیمائش کے دستیاب نہ ہونے پر ناکامی ہوتی ہے۔ مقامی وراثت کے کلکٹر کی شاندار اسکپ امیدواروں کا داخلہ نہیں ہے۔ تصدیق شدہ کم عالمی گنتی کے بعد سختی ایک واضح `--update` بنی ہوئی ہے۔

ڈیفالٹ سیٹ اپ کے کنفیگر ہونے کے دوران ایڈوانسڈ ورک فلو شائع نہیں ہونا چاہیے: GitHub اس امتزاج کو مسترد کرتا ہے۔ اس کی ورژن شدہ پالیسی اس وقت تک زیر التواء رہتی ہے جب تک کہ نظرثانی شدہ انتظامی منتقلی کو واپس نہیں پڑھا جاتا۔ اشاعت سے پہلے، ایک آپریٹر پن ریپوزٹری، head/base/tree، policy/patch/rollback ہیشز اور سیٹ اپ کی حالت کا مشاہدہ کرتا ہے۔ `node scripts/quality/codeql-producer.mjs verify-admin-readback` فراہم کردہ متوقع اور حقیقی JSON ریکارڈز کو چیک کرتا ہے۔ یہ ایک تکنیکی گارڈ ہے، آپریٹر کی منظوری یا نئے ریڈ بیکس حاصل کرنے کا متبادل نہیں۔ PR ٹوکن کبھی بھی انتظامیہ تک رسائی کی درخواست نہیں کرتا ہے۔ رول آؤٹ اور اسکینر کی کسی بھی تبدیلی کے لیے علیحدہ ریڈ بیک پلس اصلی PR، فورک اور ضم گروپ مطابقت کے ثبوت کی ضرورت ہوتی ہے۔

فورکس ہوسٹڈ رنرز کا استعمال کرتے ہیں، مستقل اسناد کے بغیر چیک آؤٹ، پروڈیوسر میں کوئی پروجیکٹ install/build نہیں، اور وراثت میں ملنے والے ذخیرہ کے راز نہیں۔ GitHub اپنے کم فورک ٹوکن کے ساتھ pull_request ایونٹ کے لیے SARIF اپ لوڈ کی حمایت کرتا ہے۔ پہلی بار شراکت پر عملدرآمد کی منظوری GitHub پالیسی برقرار ہے۔ غیر بھروسہ مند کوڈ کو چلانے کے لیے کبھی پل_ریکوسٹ_ٹارگٹ کا استعمال نہ کریں۔ منتقلی کو مکمل کرنے پر غور کرنے سے پہلے اصل ٹوکن اجازتوں، analysis_key اور کنٹرولڈ کینری میں تمام زمرے کے ماحول کی تصدیق کریں۔ [فورک اپ لوڈ کے قوانین](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible) ، [متضاد سیٹ اپ موڈز](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows) ۔

**برطرفی آپریٹر کی کال ہے (سخت اصول #14)** برخاستگی کے تبصرے میں تکنیکی جواز کو ریکارڈ کیے بغیر — کبھی بھی CodeQL الرٹ کو مسترد نہیں کرتا ہے: `won't fix` اپ اسٹریم پروٹوکول کی ضرورت کے لیے، `used in tests` ٹیسٹ فکسچر کے لیے، `false positive` سینیٹائزر کے لیے CodeQL نہیں دیکھ سکتا (نظیر: `docs/security/ERROR_SANITIZATION.md`)۔

---

## ٹیسٹ دوبارہ چلانے کی پالیسی (WS5.4, v3.8.49)

دوبارہ چلانا ہر رنر کے لیے الگ ہے، کبھی بھی عالمی عمومی پالیسی نہیں — عمومی دوبارہ چلانے کی پالیسی حقیقی ریگریشنز کو
غیر مرئی فلیکس میں بدل دیتی ہے:

| رنر              | پالیسی                                                                                                                    | وجہ                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | صرف CI میں `retries: 1`، اور `trace: on-first-retry` کے ساتھ                                                              | براؤزر/نیٹ ورک کی ٹائمنگ حقیقی طور پر غیر تعینیتی ہے؛ ٹریس کے ساتھ ایک بار دوبارہ چلانا فلیک کو قابلِ تشخیص آرٹیفیکٹ بنا دیتا ہے |
| Vitest           | کوئی عالمی دوبارہ کوشش نہیں۔ ثابت شدہ فلیکی ٹیسٹ کو واضح فی ٹیسٹ دوبارہ کوشش ملتی ہے (diff میں نمایاں، PR میں زیرِ جائزہ) | قرنطینہ فہرست کو repo میں رکھتا ہے، کبھی مبہم نہیں ہونے دیتا                                                                     |
| node:test (unit) | کبھی بھی دوبارہ کوشش نہیں                                                                                                 | فلیکی یونٹ ٹیسٹ خود ٹیسٹ میں ایک بگ ہے — اسے درست کریں، دوبارہ چلا کر قسمت نہ آزمائیں                                            |

فلیک ٹیلی میٹری دستیاب ہونے کے بعد ہدفی SLOs (WS5.2/5.3): فی ٹیسٹ <1% فلیک شرح
("ابھی درست کریں" کی حد)، فی پائپ لائن ≥95% کامیابی کی شرح۔ صنعتی حوالہ جاتی اقدار —
اپنی پیمائشوں کے مطابق دوبارہ کیلیبریٹ کریں۔

## ریلیز کی سطح پر ریچیٹ ڈرفٹ (WS5.5, v3.8.49)

جب کوئی ریچیٹ (فائل سائز، پیچیدگی، eslint انتباہات) خالص ریلیز
ٹِپ پر ریگریس ہو — یعنی مرجز کے **امتزاج** نے اسے ریگریس کیا ہو، اور کوئی ایک PR اپنی
برانچ پر اکیلے اس ریگریشن کو دوبارہ پیدا نہ کرے — تو اس کی اصلاح **ریلیز کیپٹن کی ذمہ داری ہے، ایک بار، ریلیز
برانچ پر**: extraction/refactor کو ترجیح دیں؛ صرف دستاویزی جواز کے اندراج کے ساتھ rebaseline کریں۔
امتزاجی ڈرفٹ کو کبھی بھی کسی معاون کے PR پر نہ ڈالیں، اور کبھی بھی فی PR rebaseline
نہ کریں (یہ حقیقی ریگریشنز کو چھپاتا ہے)۔ پہلے امتیاز کریں: یہ فرض کرنے سے پہلے کہ آپ کے PR نے
مسئلہ پیدا کیا ہے، ایک probe worktree میں خالص ٹِپ کے خلاف سرخ نتیجہ دوبارہ پیدا کریں۔

## ریچیٹ کی کمیوں کو محفوظ کرنا — تنزلی کی سمت (#8584)

ریچیٹ صرف نصف خودکار ہے، اور وہ بھی غلط نصف۔ حد کو **بڑھانا** ایک
دستی JSON ترمیم ہے جس میں دس سیکنڈ لگتے ہیں اور یہ سرخ PR کو بحال کرنے کا تیز ترین طریقہ ہے۔
حد کو **کم کرنے** کے لیے کسی کو `--update` چلانا اور نتیجہ commit کرنا پڑتا ہے — اور جب تک
`bank-ratchet-shrinks` جاب شامل نہیں ہوئی، کوئی workflow اسے نہیں چلاتا تھا۔ ناپا گیا نتیجہ
(2026-07-25): 18 منجمد فائلیں پہلے ہی نئی فائل کی 800 لائنوں والی حد پر یا اس سے کم تھیں، بدترین
132× پر (`src/shared/validation/schemas.ts`، 19 لائنوں کے لیے 2,523 کی حد)؛
پیچیدگی کی بالائی حد تقریباً 37 rebaseline نوٹس کے دوران `1794 → 2169` تک پہنچ گئی، جس میں ٹھیک ایک
کمی (−1) ہوئی؛ اور "اگلے دور میں `--update` کے ذریعے سخت کریں" 31 بار لکھا گیا اور
ایک بار اس پر عمل ہوا۔ جو حد اسے جائز بنانے والے کوڈ سے زیادہ دیر باقی رہے، وہ خاموشی سے ہر مکمل شدہ
تقسیمِ نو کو اس شخص کے لیے نمو کی گنجائش میں بدل دیتی ہے جو اگلی بار فائل میں ترمیم کرے۔

`nightly-release-green.yml` → جاب **`bank-ratchet-shrinks`** اس چکر کو مکمل کرتی ہے:

|               |                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| چلتی ہے       | `schedule` (3×/دن) + `workflow_dispatch` — دانستہ طور پر **نہیں** `push`                                     |
| ناپتی ہے      | بلند ترین `release/vX.Y.Z`، وہی resolution + injection guard جو `release-green` میں ہے                       |
| لکھتی ہے      | `check:file-size --update` اور `check:complexity-ratchets --update` (دونوں ساخت کے لحاظ سے صرف کمی کرتے ہیں) |
| تصدیق کرتی ہے | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| فراہم کرتی ہے | ریلیز برانچ کے خلاف ہمیشہ تازہ ایک PR — force-update شدہ، کبھی غیر ضروری تکرار نہیں                          |

محفوظ کرنا فی push کے بجائے بیچز میں کیا جاتا ہے کیونکہ اس کے لیے کم تاخیر کی کوئی ضرورت نہیں
(8 گھنٹوں کے اندر محفوظ کی گئی کمی قابلِ قبول ہے)، جبکہ فی merge چلانے سے merge مہمات کے دوران
PR برانچ بار بار دوبارہ بنتی اور ہر بار مکمل ESLint واک کی لاگت آتی۔ تشخیص
push (`release-green`) پر ہی رہتی ہے؛ صرف محفوظ کرنے کا عمل بیچز میں ہوتا ہے۔

### حفاظتی تصدیق کار

یہ جاب بغیر نگرانی کے baselines میں لکھتی ہے، اس لیے `verify-ratchet-bank.mjs` ہی اسے
قابلِ قبول بناتا ہے۔ یہ `--update` کے بعد کے tree کا `HEAD` کے ساتھ diff لیتا ہے اور **کسی بھی commit
کے وجود میں آنے سے پہلے جاب ختم کر دیتا ہے** — کوئی PR نہیں کھولتا — جب تک ہر تبدیلی ان میں سے کوئی ایک نہ ہو:

- `frozen` / `testFrozen` کی عددی قدر **کم** کی گئی ہو یا **ہٹائی** گئی ہو
- `complexity-baseline.json` → `count` **کم** کیا گیا ہو
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **کم** کیا گیا ہو

کوئی بھی دوسری چیز ناکام ہوتی ہے: عدد بڑھانا، اندراج شامل کرنا، `cap`/`testCap` تبدیل کرنا، یا
`_rebaseline_*` نوٹ حذف کرنا/دوبارہ لکھنا (یہ نوٹس اس امر کا آڈٹ ٹریل ہیں کہ ہر
بالائی حد کیوں موجود ہے اور فائل کے اندراجات والے اسی `frozen` آبجیکٹ میں محفوظ ہوتے ہیں)۔
جو bot حد بڑھا سکے، وہ موجودہ صورتِ حال سے قطعی طور پر بدتر ہوگا۔ ریگریشن
گارڈ: `tests/unit/verify-ratchet-bank.test.ts`۔

یہ جاب کبھی بھی `release/*` پر push نہیں کرتی — PR کو ایک انسان merge کرتا ہے، لہٰذا غلط پیمائش
بغیر جائزے کے شامل نہیں ہو سکتی۔

## الاؤ لسٹ پالیسی

ہر وہ گیٹ جو پہلے سے موجود خلاف ورزیوں کی وجہ سے ناکام نہیں ہو سکتا، ایک منجمد الاؤ لسٹ استعمال کرتا ہے
(مثلاً، `KNOWN_STALE_DOC_REFS`، `KNOWN_MISSING`، `KNOWN_RAW_SQL`)۔ پالیسی یہ ہے:

**بنیادی وجہ کو درست کریں؛ الاؤ لسٹ صرف اسی وقت استعمال کریں جب خلاف ورزی پہلے سے موجود ہو اور
اسی PR میں درست نہ کی جا سکے۔**

الاؤ لسٹ میں اندراج شامل کرتے وقت:

1. جواز کے ساتھ ایک تبصرہ شامل کریں۔
2. ٹریکنگ مسئلے کا حوالہ دیں (مثلاً، `// #3498 — Phase 2 feature, not yet implemented`)۔
3. خلاف ورزی درست کرنے والے اسی PR میں اندراج ہٹا دیں — ایسا فرسودہ اندراج جو اب کسی فعال خلاف ورزی
   کو دباتا نہیں ہے، بذاتِ خود ایک نقص ہے (لاوارث الاؤ لسٹ اندراج پر 6A.3 کی فرسودہ نفاذ کی جانچ،
   نافذ ہونے کے بعد گیٹ کو ناکام کر دے گی)۔

ٹیسٹوں کو زیادہ تیزی سے پاس کروانے کے لیے الاؤ لسٹ میں اندراجات شامل **نہ** کریں۔ بڑھتی ہوئی
الاؤ لسٹ کے ساتھ سبز گیٹ معیار کا جھوٹا احساس ہے۔

### جب آپ کے PR پر کوئی گیٹ ناکام ہو

1. **گیٹ کا آؤٹ پٹ غور سے پڑھیں** — یہ آپ کو بالکل بتاتا ہے کہ کس فائل یا علامت نے
   اصول کی خلاف ورزی کی ہے۔
2. **خلاف ورزی درست کریں** — زیادہ تر گیٹس تعین پذیر فائل سسٹم جانچیں ہیں جو کوڈ درست ہوتے ہی
   پاس ہو جاتی ہیں۔
3. **اگر خلاف ورزی پہلے سے موجود ہے** (یعنی، آپ نے اسے متعارف نہیں کرایا لیکن گیٹ اب
   اس کا احاطہ کرتا ہے): جواز کے تبصرے اور ٹریکنگ مسئلے کے ساتھ الاؤ لسٹ میں اندراج شامل کریں۔
4. **اگر گیٹ ریچٹ ہے** (کوریج، ESLint انتباہات، نقل، پیچیدگی):
   آپ کی تبدیلی نے میٹرک کو بدتر کیا ہے۔ بنیادی مسئلہ درست کریں، یا (شاذ و نادر) اگر تبدیلی
   دانستہ ہے اور میٹرک کی تنزلی قابلِ قبول ہے تو `npm run quality:ratchet -- --update` چلائیں —
   لیکن PR کی تفصیل میں اس کی وجہ درج کریں۔
5. **مشاورتی گیٹس** (`continue-on-error: true`) معلوماتی ہوتے ہیں — یہ
   مرج کو نہیں روکتے، لیکن CI خلاصے میں ظاہر ہوتے ہیں۔ پھر بھی انہیں درست کریں۔

---

## نیا گیٹ شامل کرنا

1. `scripts/check/check-<name>.mjs` (یا `.ts`) بنائیں۔ پالیسی گیٹس 0/1 کے ساتھ خارج ہوتے ہیں۔
   Ratchet طرز کے گیٹس `collect-metrics.mjs` کے ذریعے `quality-metrics.json` میں ایک میٹرک خارج کرتے ہیں۔
2. `package.json` میں `"check:<name>": "node scripts/check/check-<name>.mjs"` شامل کریں، اور
   عرف اور اس کی عین کمانڈ کو `config/quality/gate-manifest.json` میں ہم وقت کریں۔
   موجودہ توثیقی عرف کو تبدیل یا حذف کرتے وقت بھی یہی ہم وقتی لاگو کریں۔
   `npm run check:gate-manifest` چلائیں؛ پری کمیٹ ہُک اور CI تبدیلی کی درجہ بندی
   اس معاہدے کو نافذ کرتے ہیں۔
3. اسے `.github/workflows/ci.yml` میں مناسب جاب کے تحت مربوط کریں
   (پالیسی → `lint` یا `docs-sync-strict`؛ ratchet → `quality-gate`)۔
4. اگر اس کی الاؤ لسٹ ہے، تو `scripts/check/lib/allowlist.mjs` سے
   `reportStaleEntries()` لاگو کریں تاکہ فرسودہ اندراجات خودکار طور پر شناخت ہو سکیں۔
5. گیٹ کی شناختی منطق کا احاطہ کرنے والا ٹیسٹ `tests/unit/build/` میں لکھیں۔
6. اس دستاویز کو اپ ڈیٹ کریں (متعلقہ جاب ٹیبل میں ایک قطار شامل کریں)۔

---

## ایجنٹ ٹولنگ: LSP-in-the-loop (اختیاری)

CI گیٹس کے علاوہ، OmniRoute ایک **اختیاری** `agent-lsp` اسکیفولڈ فراہم کرتا ہے
(پروجیکٹ سطح کی `.mcp.json`، Fase 7 Task 15)۔ کوڈنگ ایجنٹس کے لیے TypeScript لینگویج سرور
دستیاب کرنے کی خاطر `.mcp.json` بنائیں، تاکہ وہ کوڈ لکھنے سے **پہلے** علامات /
تشخیصی معلومات حل کریں — یہ `typecheck:core` کا compile-before-claim معاون ہے
جو "خود ساختہ علامت" کی خرابیوں کو ماخذ ہی پر کم کرتا ہے۔ اسے دانستہ طور پر
خودکار طور پر لوڈ نہیں کیا جاتا (آپ MCP↔LSP برج منتخب اور تصدیق کرتے ہیں)؛ کوئی خراب اندراج صرف
کنکشن کی خرابی لاگ کرتا ہے اور کبھی بھی سیشنز کو متاثر نہیں کرتا۔

---

## معقولیت سازی کا بیک لاگ (ROI جائزہ — مرحلہ 9، لہر 3)

اس فہرست کا 2026-06-17 کو `ci.yml` کے ساتھ تقابل اور تطبیق کی گئی تھی (پچھلے ورژن میں
`audit:deps`، `check:tracked-artifacts`، `check:lockfile`، `check:licenses`،
`check:dead-code`، `check:cognitive-complexity`، `check:type-coverage`،
`check:codeql-ratchet`، `check:pr-evidence` شامل نہیں تھے)۔ تطبیق شدہ مجموعے کے ROI جائزے
نے معقولیت سازی کے درج ذیل امیدواروں کی نشان دہی کی۔ **انضمام میکانکی CI
تبدیلیاں ہیں؛ تبدیلیاں/اخراج پالیسی فیصلے ہیں جو آپریٹر کے لیے مختص ہیں۔** ذیل میں دی گئی کوئی چیز
ابھی لاگو نہیں کی گئی۔

**اوپر یہ بھی غیر دستاویزی ہیں** (مشاورتی، کم مؤثر اشارہ): `docs-lint` جاب (markdownlint + Vale، پوری جاب `continue-on-error`) اور الگ اسکینر ورک فلو `semgrep.yml` / `scorecard.yml`۔ CodeQL میں اب `Gate / CI` کے تحت لازم پیدا کنندہ اور داخلہ جابز ہیں، اوپر بیان کردہ فعالیت کی شرطوں کے تابع۔ `semgrepFindings: 0`، `quality-baseline.json` میں ہے مگر `ci.yml` میں روکنے والی بڑھوتری حد سے منسلک نہیں — یہ میٹرک فی الحال غیر مربوط ہے۔

### انضمام / نقل کا خاتمہ (میکانکی، کم خطرہ)

ہر امیدوار کی 2026-06-17 کو فعال گیٹ کی حالت کے مقابل توثیق کی گئی (اعتماد کریں، مگر تصدیق بھی کریں)؛
کئی "واضح" انضمامات میں چھپا ہوا قرض نکلا اور وہ **صاف متبادل** نہیں ہیں۔

- **`check:docs-sync` دو مرتبہ چلتا ہے** — `lint` جاب میں الگ سے، اور پھر `check:docs-all` (`docs-sync-strict`) کے اندر اور husky pre-commit ہُک میں۔ ✅ **مکمل** — الگ `lint` اجرا ہٹا دیا گیا۔
- **CVE اسکیننگ** — ❌ **صاف انضمام نہیں ہے۔** `audit:deps` تمام پانچ lockfiles میں سنگین ایڈوائزریز اور نامکمل آڈٹس کو روکتا ہے، جبکہ موجودہ پالیسی کے تحت شدید ایڈوائزریز کو تنبیہات کے طور پر رپورٹ کرتا ہے؛ `check:vuln-ratchet` (osv) صرف چیک اِن شدہ بیس لائن کے مقابلے میں کسی _تنزلی_ پر ناکام ہوتا ہے اور ضرورت کے وقت غائب پیمائشوں کو مسترد کرتا ہے۔ معنویات مختلف ہیں — `audit:deps` کو ہٹانے سے مطلق سنگین گیٹ اور پیکیج آڈٹ کی آزاد رسیدیں ضائع ہو جائیں گی۔ دونوں برقرار رکھیں۔
- **سائیکل کی تشخیص** — ✅ **مکمل** (#15159 G-01/G-02)۔ یہاں موجود پرانا متن `check:cycles` کو "سبز، منتخب" گیٹ قرار دیتا تھا اور اسے بلاکنگ رکھنے کا جواز یہ دیتا تھا کہ `check:circular-deps` (dpdm) نے 91 سائیکل رپورٹ کیے۔ وہ سبز حالت ایک **غلط سبز** تھی: `check:cycles` نے 5 ذیلی ڈائریکٹریاں (450 فائلیں) اسکین کیں، صرف جامد `import|export … from` کو میچ کیا، اور ہر `@/` اور `@omniroute/open-sse/` اسپیسیفائر کو خارج کر دیا، اس لیے یہ dynamic-import + alias سائیکلز نہیں دیکھ سکتا تھا جو ریپو پر غالب تھے۔ درست کر دیا گیا: گیٹ اب `src` + `open-sse` (5023 فائلیں) میں چلتا ہے، TypeScript AST سے اسپیسیفائرز جمع کرتا ہے (لہٰذا `import("…")` شمار ہوتا ہے جبکہ type-position `typeof import("…")` نہیں ہوتا)، اور tsconfig `paths` کو resolve کرتا ہے۔ اسے 0 نہیں بلکہ **14** سائیکل ملتے ہیں۔ چونکہ پہلے سے موجود 14 سائیکلز کو گیٹ PR میں درست نہیں کیا جا سکتا، اس لیے `check:cycles` اب ایک **ریچٹ** ہے (`--ratchet`، `quality-baseline.json` میں حد `metrics.cycles.value = 14`، `direction: down`) — یہ کسی بھی _تنزلی_ کو روکتا ہے اور تعداد صرف کم ہو سکتی ہے۔ CI میں `npm run check:cycles:ratchet` چلتا ہے۔ کمی کا عمل **A-01** کے ساتھ جاری رہے گا۔ `check:circular-deps` (dpdm) وسیع تر دوسری رائے کے طور پر مشاورتی حیثیت میں برقرار رہے گا۔
- **پیچیدگی** — ✅ **مکمل** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ایک ESLint واک، ruleId کے لحاظ سے گنتی تاکہ cyclomatic+max-lines اور cognitive بیس لائنز آزاد رہیں؛ انفرادی `check:complexity` / `check:cognitive-complexity` مقامی `--update` کے لیے برقرار ہیں۔
- **`/api` ضدِ واہمہ** — ✅ **مکمل** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` کی ایک FS انوینٹری، openapi-routes + docs-symbols اب بھی آزادانہ طور پر رپورٹ کرتے ہیں؛ انفرادی چیکس مقامی اجرا کے لیے برقرار ہیں۔
- **`check:node-runtime` 11 جابز میں چلتا ہے** — ⚠️ **کم ROI۔** ہر ایک الگ رنر ہے اور چیک <1s ہے؛ کل بچت تقریباً 10s ہے، جس کے مقابلے میں ایک سستا فی جاب حفاظتی چیک ضائع ہوگا۔ تبدیلی کی زحمت کے قابل نہیں۔
- **CI lint پر `typecheck:noimplicit:core`** — ✅ **lint جاب سے ہٹا دیا گیا** (یہ مشاورتی `continue-on-error` تھا)؛ بلاکنگ ٹائپ سطح `typecheck:core` + `check:type-coverage` ہے۔ مقامی اسکرپٹ برقرار رکھا گیا۔

### تبدیل کریں / فیصلہ کریں (آپریٹر پالیسی)

- `check:openapi-security-tiers` (مشاورتی) — ❌ **صاف طور پر تبدیل نہیں کیا جا سکتا۔** یہ 0 کے ساتھ خارج ہوتا ہے، مگر تنبیہ کرتا ہے کہ `LOCAL_ONLY_API_PREFIXES` کے تحت کئی `traffic-inspector` روٹس میں `x-loopback-only: true` تشریح موجود نہیں۔ اسے نافذ کرنے کے لیے پہلے `openapi.yaml` میں وہ تشریحات شامل کرنا ضروری ہے۔
- `typecheck:noimplicit:core` (مشاورتی) — بڑی حد تک بلاکنگ `check:type-coverage` ریچٹ میں شامل ہے۔ اسے ریچٹ میں تبدیل کریں یا فالتو دوسرے `tsc` پاس کو ہٹا دیں۔
- `test:vitest:ui` (اب **بلاکنگ**) — پہلے سے موجود ناکامیاں `vitest.config.ts` میں `// #8618` ٹریکنگ تبصروں کے ساتھ واضح طور پر خارج کی گئی ہیں؛ نئی ناکامیاں جاب کو ناکام کرتی ہیں۔
- `check:secrets` (gitleaks، بلاکنگ ریچٹ) — موجودہ حد `quality-baseline.json` میں `metrics.secretFindings` ہے۔ ہر استثنا کے لیے `.gitleaks.toml` میں ایک معقول اندراج درکار ہے؛ غیر دستیاب پیمائش INCOMPLETE ہے۔ یہ اسکین GitHub کی مقامی secret scanning اور `check:public-creds` کی تکمیل کرتا ہے۔
- `check:pr-evidence` (بلاکنگ، PR-body نثر میں grep کرتا ہے) — غلط مثبت نتائج کا زیادہ خطرہ؛ اسے ہٹانے سے Hard Rule #18 کا نفاذ کمزور ہوتا ہے، اس لیے یہ واقعی ایک پالیسی فیصلہ ہے۔
- `semgrep` (مشاورتی، الگ) — OWASP خاندانوں کے لیے CodeQL سے متجاوز ہوتا ہے؛ اس کی بیس لائن کو ریچٹ سے منسلک کریں یا اسے ہٹا دیں۔

---

## متعلقہ دستاویزات

- سپلائی چین (provenance، SBOM، Trivy، Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — کلیدی مجموعوں کی برابری کا گیٹ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`، جاب `i18n-ui-coverage`)۔
ہر `src/i18n/messages/<locale>.json` کے leaf key سیٹ کا `en.json` سے موازنہ کرتا ہے اور
کسی بھی غیر موجود یا اضافی leaf پر ناکام ہو جاتا ہے، خواہ key کب بھی شامل کی گئی ہو۔ `__MISSING__:`
placeholders موجود شمار ہوتے ہیں (ان کا مواد ratio gate کا معاملہ ہے)۔ یہ دو diff-based/percentage
گیٹس کا مکمل متمم ہے: `check-ui-keys-coverage` ہر locale کے لیے 80 % کی کم از کم حد نافذ کرتا ہے
(~13,000 میں سے 43 غیر موجود keys کے باوجود یہ 99.7 % دکھاتا ہے) اور `check-new-key-coverage`
صرف ان keys کا جائزہ لیتا ہے جو کوئی PR، `en.json` میں شامل کرتا ہے۔ کسی locale batch کو اس دن کے
`en.json` سے تیار کیا جاتا ہے جس دن اس کی branch بنائی جاتی ہے، اور وہ کئی دن تک ترجمہ کرتا رہتا ہے
جبکہ base میں نئی keys شامل ہوتی رہتی ہیں؛ batch PR خود کوئی key شامل نہیں کرتا، اس لیے دونوں ہم مرتبہ
گیٹس خاموش رہے جب batch 1 (#13044) نو locales میں 43 keys کی کمی کے ساتھ اور batch 2 (#13660)
آٹھ locales میں 10 keys کی کمی کے ساتھ ضم ہوئے (2026-09-15)۔ سرخ نتیجہ درست کرنے کے لیے
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` استعمال کریں؛ ایک `extra`
leaf کا مطلب ہے کہ source نے اسے ہٹا دیا ہے — اسے locale سے حذف کریں۔ `--warn` ناکام کیے بغیر
رپورٹ کرتا ہے۔ `--catalog=cli` یہی موازنہ `bin/cli/locales` پر چلاتا ہے
(`npm run i18n:check-keys:cli`)؛ دونوں مراحل جاب `i18n-ui-coverage` میں موجود ہیں۔

#### `check-new-key-coverage` — نئی key کا i18n گیٹ

`check-ui-value-drift` کا ہم مرتبہ۔ وہ اس وقت پکڑتا ہے جب کسی انگریزی value کو **دوبارہ لکھا گیا**
ہو مگر اس کے تراجم پیچھے رہ گئے ہوں؛ یہ اس وقت پکڑتا ہے جب کوئی انگریزی key **شامل کی گئی** ہو
مگر بعض locales کو وہ کبھی موصول نہ ہوئی ہو۔

`check-ui-keys-coverage` اس زمرے کو نہیں دیکھ سکتا: یہ ہر locale کے لیے percentage کی کم از کم حد
نافذ کرتا ہے، اور ~13,000 میں سے گیارہ غیر موجود keys کے باوجود coverage 99.9% رہتی ہے۔ فی زبان
percentage یہ ظاہر نہیں کر سکتا کہ "یہ feature بغیر ترجمے کے جاری ہوا" — کسی نئے locale میں پورا
feature بغیر متن کے شامل ہو سکتا ہے اور عدد میں کوئی تبدیلی بھی نہیں آتی۔

اس میں درج واقعہ یہ ہے: Orchestration Canvas کے Phase 3 نے اپنی گیارہ keys کا ان 42 locales میں
ترجمہ کیا جو اس وقت موجود تھے۔ چند گھنٹے بعد EU-language batch (#13044) نے repo کو 51 locales تک
پہنچا دیا، اور نو نئے locales (`el`، `et`، `ga`، `hr`، `lt`، `lv`، `mt`، `sl`، `sr`) کو وہ keys
کبھی موصول نہیں ہوئیں۔ `deepMergeFallback` کسی غیر موجود key کی جگہ انگریزی استعمال کرتا ہے، لہٰذا
ناکامی کی صورت خالی UI کے بجائے غیر مترجم UI تھی — حقیقی، اور ساختاً خاموش۔

اپنے ہم مرتبہ کی طرح یہ بھی **diff-aware** ہے، جو merge base پر موجود انگریزی کا working tree سے
موازنہ کرتا ہے، اس لیے پہلے سے موجود خلا منجمد رہتے ہیں اور گیٹ کو فعال کرنے کے لیے کسی migration
کی ضرورت نہیں پڑی۔

**ایک `__MISSING__:<english>` marker اسے پورا نہیں کرتا (2026-09-17 سے)۔** پہلے یہ دستاویزی
التوا کا طریقہ تھا — runtime درست انگریزی پر fallback کرتا ہے — یہاں تک کہ 2026-09-16 کو آٹھ
feature PRs نے 61 keys شامل کیں اور ترجمہ کرنے کے بجائے تمام 65 locales میں marker لگا دیا: اس
گیٹ نے ہر ایک کو قبول کیا، PRs کو کسی چیز نے نہیں روکا، اور پھر blocking real-translation ratio gate
release tip پر سب کے لیے ناکام ہو گیا (pt-BR 3.2 % > 2.5 % + 0.5)۔ اب marker کو غیر موجود ترجمہ
سمجھا جاتا ہے۔ سرخ نتیجہ درست کرنے کے لیے
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` استعمال
کریں، یا `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`، detached-safe،
جو `OMNIROUTE_TRANSLATION_*` env کے بغیر شروع ہونے سے انکار کرتا ہے) کے ذریعے تمام locales کو
متوازی طور پر ترجمہ کریں۔ ایسی key جسے لازماً انگریزی ہی رہنا ہو (کسی pinned product/engine/flag
کا نام)، اسے `scripts/i18n/untranslatable-keys.json` میں ہونا چاہیے، marker کے پیچھے کبھی نہیں۔
`vi` میں markers مکمل طور پر ممنوع ہیں (`tests/unit/i18n-vi-completeness.test.ts`)۔

#### `check-vitest-exclusions` — مؤخر شدہ tests کا گیٹ

`vitest.config.ts` کی `exclude` فہرست میں موجود file ایسا test ہے جو نہیں چلتا، مگر tree پڑھنے والے
کو یہ coverage جیسا دکھائی دیتا ہے۔ باسٹھ files اس comment کے پیچھے جمع ہو گئیں:
`// #8618 — pre-existing failure; remove this exclusion when fixed`۔ Issue #8618 کو
2026-08-11 کو بند کر دیا گیا جبکہ اس کی زیر نگرانی فہرست 45 entries سے بڑھ کر 62 ہو گئی، اور ہر
نئی entry کو ایک بند issue کی جانب اشارہ کرنے والا comment وراثت میں ملا۔ جب بالآخر فہرست کو
file بہ file ناپا گیا (#13204)، تو **62 میں سے 51 موجودہ tree پر source میں کسی تبدیلی کے بغیر
کامیاب ہوئیں**۔

گیٹ کا تقاضا ہے کہ ہر وہ exclusion جو کسی حقیقی file تک resolve ہو، (a) کسی tracking issue کا نام
دے اور (b) اپنی ناپی گئی status کے ساتھ `config/quality/vitest-exclusions.json` میں موجود ہو، تاکہ
نیا exclusion شامل کرنا 60-entry array میں محض ایک اور سطر بننے کے بجائے ایک مخصوص file میں
قابلِ جائزہ diff ہو۔ یہ جان بوجھ کر excluded tests کو دوبارہ نہیں چلاتا — اس میں ~10 منٹ لگتے ہیں
اور یہ کام کسی periodic job میں ہونا چاہیے؛ inventory ریکارڈ کرتی ہے کہ ہر ایک کی آخری پیمائش کب
کی گئی تھی۔
