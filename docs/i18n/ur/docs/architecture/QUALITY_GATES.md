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

## گیٹس کی فہرست اور نفاذی پروفائلز

### امیدوار کی منظوری

CI اور Quality Gates ورک فلو میں سے ہر ایک ایک مستحکم فیصلہ جاری کرتا ہے: `Gate / CI` اور
`Gate / Quality`۔ ان کی ورژن شدہ منظوری پالیسی ہر اَپ اسٹریم جاب کو
لازمی یا مشاورتی کے طور پر درج کرتی ہے۔ کسی قابلِ اطلاق لازمی جاب کا کامیاب ہونا ضروری ہے: غائب،
منسوخ، نظرانداز شدہ، زیرِ التوا اور نامعلوم نتائج PASS ثابت نہیں کر سکتے۔ صرف دستاویزات
یا صرف کیٹلاگ کی درست درجہ بندی کسی کوڈ لین کو ناقابلِ اطلاق بنا سکتی ہے؛
ڈرافٹ PR کو منظور شدہ امیدوار نہیں سمجھا جاتا۔ `hotfix` لیبل ثبوت کی شرط ختم نہیں کرتا۔

دونوں ورک فلو main/release برانچوں میں آنے والے PRs، `main` پر pushes، دستی dispatch
اور merge-group ایونٹس کا احاطہ کرتے ہیں۔ Push، dispatch اور merge-group مکمل انتخاب چلاتے ہیں۔ `release/**`
پر pushes انہیں شروع نہیں کرتے (2026-10-18): ہر تبدیلی پہلے ہی اپنے PR پر میٹرکس چلا چکی ہوتی ہے
اور ضم شدہ مجموعہ Release-Green کی ذمہ داری ہے (`docs/ops/RUNNER_BOX.md` → Hosted لین)۔ Forks
اور merge groups ان جابز کے لیے hosted runners استعمال کرتے ہیں جو بصورتِ دیگر self-hosted
runners منتخب کرتی ہیں؛ rollout سے پہلے کافی hosted گنجائش کی تصدیق ضروری ہے۔

ہر JSON رسید checked-out SHA، workflow run اور attempt کی شناخت کرتی ہے۔
CLI، checkout/event SHA کے عدم تطابق کو مسترد کر دیتا ہے۔ Workflow tests پالیسی کی رکنیت کو
فیصلہ دینے والی جاب کی `needs` فہرست سے منسلک کرتے ہیں تاکہ کوئی نئی یا حذف شدہ لین خاموشی سے غائب نہ ہو سکے۔
رسیدیں اپنے ورک فلو کا احاطہ کرتی ہیں، اشاعت، تعیناتی، یا کسی موجودہ ایڈوائزری اسکینر کے اندرونی حصوں کا نہیں۔ قابل اطلاق چیکس کو برانچ قواعد میں لازمی بنانا ایک علیحدہ انتظامی تبدیلی ہے؛ ان کی جابز کی تعریف بذاتِ خود کسی برانچ کو تحفظ فراہم نہیں کرتی۔

`API Route Typecheck` ایک خود مختار ورک فلو چیک ہے، جو دونوں مجموعی فیصلوں اور مقامی مکمل آبزرور کے جامد پروفائل سے باہر ہے۔ عین امیدوار کے لیے اس کے نتیجے کا علیحدہ معائنہ کریں۔ `.github/workflows/api-route-typecheck.yml`، `main` یا `release/**` میں آنے والی PRs، دونوں میں سے کسی بھی برانچ فیملی پر پشز، اور دستی ڈسپیچ پر چلتا ہے۔ اس میں کوئی پاتھ فلٹر نہیں ہے۔ PR کی بیس کو دوبارہ ہدف بنانے سے ایک نئے چیک کی درخواست ہوتی ہے؛ باڈی/عنوان میں ترامیم صرف مشاہدے کے نام `Admission not requested / API Route Typecheck` کا استعمال کرتی ہیں اور ایڈمیشن چیک کی جگہ نہیں لے سکتیں۔ ورک فلو مرج گروپ ٹرگر کا اعلان نہیں کرتا۔ مرج کیو کا کوئی بھی نفاذ، جس میں یہ چیک درکار ہو، پہلے اس ایونٹ کے لیے اس کا اجرا قائم کرے۔

### UI کے نفاذ کی گنجائش

CI مکمل UI فہرست کو چار `test-vitest` matrix shards کی صورت میں چلاتا ہے، جن میں سے ہر ایک کے پاس زیادہ سے زیادہ
دو workers اور موجودہ 15 منٹ کی job deadline ہوتی ہے۔ پہلا shard
MCP/autoCombo Vitest suite بھی چلاتا ہے۔ لازمی job result ہر matrix leg کا احاطہ کرتا ہے؛ کسی ایک
shard کی ناکامی یا منسوخی امیدوار کی منظوری ثابت نہیں کر سکتی۔

nightly observer ہر UI shard کے لیے الگ exact-candidate رسید برقرار رکھتا ہے،
جس میں پہلی رسید کے اندر MCP execution بھی شامل ہے۔ چاروں رسیدیں، logs اور باہم مطابقت رکھنے والی
execution identities لازمی ہیں۔ مقامی `npm run test:vitest:ui` بدستور
مکمل suite منتخب کرتا ہے؛ صرف ایک `--shard` run جزوی ثبوت ہے۔

### Unit coverage کا حصول

بارہ unit shards اپنی موجودہ test execution کے دوران V8 coverage جمع کرتے ہیں۔ ایک کامیاب
shard، درمیانی Istanbul report بنائے بغیر اصل فائلوں کو compress کرنے کے لیے
`scripts/ci/compact-v8-coverage.mjs` چلاتا ہے۔ آخری Coverage job تمام بارہ manifests کو
candidate SHA، runtime، source root اور data hashes کے مقابل verify کرتی ہے، پھر c8 کے reporters اور موجودہ
coverage thresholds چلاتی ہے۔ Inputs، c8 کی global filename order برقرار رکھتے ہیں؛ mixed function/block coverage
کے لیے per-shard pre-merging غیر محفوظ ہے۔ غائب، خراب ساخت والے یا غیر موافق shards منظوری ناکام کر دیتے ہیں۔
ناکام test shards خام diagnostic coverage کو الگ برقرار رکھتے ہیں؛ اسے final merge میں شامل نہیں کیا جا سکتا۔

### یونٹ عمل درآمد کی پیش رفت کی رسیدیں

مشترکہ `test:unit:ci:shard` کمانڈ `scripts/ci/unit-progress-reporter.mjs` کے ذریعے `primary`، `dashboard` اور `serial` مراحل کو ریکارڈ کرتی ہے۔ معمول کی ٹیسٹ رپورٹ بدستور دستیاب رہتی ہے۔ صرف میٹا ڈیٹا پر مشتمل ایک علیحدہ رسید ہر فائل کے آغاز اور تکمیل کو ریکارڈ کرتی ہے، جبکہ 30 سیکنڈ کا ہارٹ بیٹ ان فائلوں اور ان کے گزرے ہوئے وقت کی فہرست دیتا ہے جو اب بھی فعال ہیں۔ یہ صرف اجازت یافتہ عمل درآمد میٹا ڈیٹا ریکارڈ کرتی ہے؛ ٹیسٹ کی تفصیلات، آؤٹ پٹ، خرابیوں کا متن اور مکمل ماحول سیریلائز نہیں کیے جاتے۔

CI اور Quality، JSONL فائلوں کو `unit-progress-ci-<run>-<attempt>-<shard>` اور `unit-progress-quality-<run>-<attempt>-<shard>` کے طور پر محفوظ رکھتے ہیں۔ جاب کا ٹائم آؤٹ بعد میں ہونے والے اپ لوڈ کو روک سکتا ہے؛ پہلے سے خارج کیے گئے ہارٹ بیٹس تشخیصی ثبوت کے طور پر باقی رہتے ہیں۔ ہارٹ بیٹس کی عدم موجودگی کسی مسدود یا ختم شدہ رنر پراسیس کی عکاسی بھی کر سکتی ہے۔ یہ رسیدیں موجودہ ٹیسٹ انتخاب، ہم وقتی اجرا، آخری مهلتوں اور اخراجی اسٹیٹس کو برقرار رکھتی ہیں؛ یہ امیدوار کی منظوری کے فیصلے نہیں ہیں۔

### قبولیت کے نتائج جمع کرنے والے ماڈیول میں محفوظ شواہد

`scripts/quality/validate-release-acceptance.mjs` فراہم کردہ منصوبے اور اس کے مینی فیسٹس کے نتائج جمع کرتا ہے؛ یہ ثابت نہیں کرتا کہ منصوبہ پوری ریلیز پائپ لائن کا احاطہ کرتا ہے۔ منصوبہ `VERIFIED` ہونے پر بھی اس کی رپورٹس واضح طور پر `releaseAcceptance: false` مقرر کرتی ہیں۔ `release-acceptance.yml` ورک فلو اب بھی shadow ٹیسٹ فکسچر استعمال کرتا ہے، حقیقی build، package، boot یا promotion کی رسیدیں نہیں۔

محفوظ شواہد کی تصدیق کے لیے CLI کو `--evidence-root` درکار ہے۔ فائلیں `<evidence-root>/<artifact_id>/<member>` پاتھ پر تلاش کی جاتی ہیں اور ان کا SHA-256 ہیش نکالا جاتا ہے۔ شواہد کے بغیر PASS ریکارڈ، گم شدہ یا بدلی ہوئی فائل، غیر محفوظ پاتھ یا سِم لنک تصدیق کو روکتا ہے۔ گم شدہ فائلیں کامیاب رن کے خالی لاگز کے برابر نہیں ہیں۔ موجودہ SHA/run/attempt جانچیں آزاد رہتی ہیں: بائٹس یکساں ہونے سے پرانی رسید درست نہیں ہو جاتی۔ فائل کی سالمیت عمل درآمد کی اصلیت یا آرٹی فیکٹ کے promotion کا ثبوت نہیں ہے۔

### Static scan کی فہرست

versioned npm-alias inventory اور static-scan membership
`config/quality/gate-manifest.json` میں موجود ہیں۔ script names اور exact commands کو
`package.json` کے مقابل validate کرنے کے لیے `npm run check:gate-manifest` چلائیں؛ اضافے، اخراج اور
command drift، local hook اور CI کی change-classification jobs دونوں کو ناکام کر دیتے ہیں۔
کوئی alias، workflow job، matrix instance یا test case نہیں ہوتا: ان شماروں کو
باہم قابلِ تبادلہ کے طور پر پیش نہیں کیا جانا چاہیے۔

منتخب aliases کو چلائے بغیر ان کا جائزہ لینے کے لیے `npm run quality:scan -- --list` یا
`npm run quality:scan:fast -- --list` استعمال کریں۔
runner، npm entrypoint کو invoke کرتا ہے، لہٰذا اس کا runtime (بشمول جہاں configured ہو وہاں Bun) برقرار رہتا ہے۔
manifest ان profiles سے باہر کے aliases کو الگ سے invoke شدہ کے طور پر record کرتا ہے، اور
read-only scan profiles میں maintenance commands ممنوع ہیں۔

یہ profiles صرف static scan کا احاطہ کرتے ہیں۔ یہ product tests،
coverage، packaging، external checks یا کسی candidate کی مکمل release acceptance کی تصدیق نہیں کرتے۔
Workflow admission منسلک `config/quality/admission-policy.json` اور
`scripts/quality/admission-verdict.mjs` استعمال کرتی ہے۔ Release-observer profiles الگ رہتے ہیں؛
ان کے applicable checks اور receipts کا آزادانہ جائزہ لیں۔ مکمل observer کے static
commands کا اعلان `config/quality/release-green-static-profile.json` میں کیا گیا ہے، جن میں
`audit:deps`، mutation-test selection اور translation checks شامل ہیں۔ loader، npm
commands کو package.json اور modeled CI/Quality declarations کے مقابل validate کرتا ہے؛ وہ shell tokens کو
arguments کے طور پر execute کرنے کے بجائے drift کو مسترد کرتا ہے۔ لازمی scanner کی SKIP/INCOMPLETE output
PASS ثابت نہیں کر سکتی۔ profile اپنی external exclusions کو record کرتا ہے اور
hosted coverage، test matrices، package یا deployment evidence کی جگہ نہیں لیتا۔ ذیل میں موجود نثری inventory
ایک حوالہ ہے، اس بات کا ثبوت نہیں کہ کوئی gate واقعی چلا تھا۔

Scripts، `scripts/check/` (policy gates) اور `scripts/quality/` (ratchet engine) کے تحت موجود ہیں۔
CI کے لیے اصل ماخذ `.github/workflows/ci.yml` ہے۔

### شائع شدہ بنیادی دستاویزات کی صحت

`.github/workflows/i18n-base-health.yml`، `main` اور `release/v*` پر منتخب pushes کے بعد، اور دستی dispatch پر دستاویزات کی صحت کا مشاہدہ کرتا ہے۔ اس کے filters میں دستاویزات، root Markdown، `llm.txt`، ترجمے کی حالت/تشکیل اور متعلقہ i18n tooling شامل ہیں۔ واحد `Published base documentation health` job میزبانی شدہ Ubuntu استعمال کرتا ہے اور اس کی مہلت پانچ منٹ ہے۔ یہ صرف پڑھنے کی توثیق انجام دیتا ہے اور dependency installation، ترجمے یا state adoption کے بغیر ایک تشخیصی رسید لکھتا ہے۔

`scripts/i18n/check-base-health.mjs` کے لیے ضروری ہے کہ source-hash، missing-target، target-hash، stale-translation اور section-cache سے متعلق کوئی عدم مطابقت موجود نہ ہو۔ یہ موجودہ بنیادی document/locale دائرۂ کار اور اس کے درج شدہ ماخذ کی بھی توثیق کرتا ہے۔ نامعتبر سیاق، نامکمل coverage یا checker میں رکاوٹ `INCOMPLETE` پیدا کرتی ہے؛ تصدیق شدہ drift سے `FAIL` پیدا ہوتا ہے۔ دونوں صورتوں میں ناکامی کا exit status واپس آتا ہے۔ رسید checkout SHA، workflow، run اور attempt سے منسلک ہوتی ہے، اور `i18n-base-health-<sha>-<run>-<attempt>` کے طور پر محفوظ رکھی جاتی ہے۔

یہ شائع شدہ base کا ایک آزاد مشاہدہ ہے۔ یہ کوئی PR یا merge-group event، مطلوبہ PR check، npm alias یا static-scan profile member شامل نہیں کرتا۔ موجودہ differential PR policy اور بنیادی checker's advisory classifications الگ رہتے ہیں۔ کامیاب upload، ناکام health result کو PASS میں تبدیل نہیں کر سکتا۔

### Release PR کا تیز راستہ (`quality.yml`)

`.github/workflows/quality.yml`، main/release PRs، `main` پر pushes،
dispatch اور merge groups کے لیے CI کی تکمیل کرتا ہے۔ PRs، path-filtered تیز checks استعمال کرتے ہیں۔ مستقل طور پر
غیر فعال duplicate build کو ہٹا دیا گیا تھا؛ حقیقی build/package/boot checks بدستور CI میں موجود ہیں۔

| جاب                                              | دائرۂ کار                                                                                                                                                                                                            | رکاوٹ بننے والی |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | دستاویزات/کوڈ کے PRs؛ API دستاویزات کے حوالہ جات اور docs-all                                                                                                                                                        | ہاں             |
| `Fast Quality Gates`                             | کوڈ کے PRs؛ جامد جانچیں، ٹائپ چیک، ڈیش بورڈ ٹائپ چیک، متاثرہ یونٹ ٹیسٹس                                                                                                                                              | ہاں             |
| `Forgotten sibling tests`                        | کوڈ کے PRs؛ تبدیل شدہ ماڈیولز سے جامد صارفین اور ممکنہ sibling ٹیسٹس کا سراغ؛ barrel اور dynamic-import راستوں کو مشاورتی تشخیصی معلومات کے طور پر رپورٹ کیا جاتا ہے، جبکہ حوالہ شدہ allowlist استثنا موجود ہوتے ہیں | **مشاورتی**     |
| `Vitest (fast-path)`                             | کوڈ کے PRs؛ تیز رفتار vitest سوٹ                                                                                                                                                                                     | ہاں             |
| `Unit Tests fast-path`                           | کوڈ کے PRs؛ 4-shard یونٹ سوٹ                                                                                                                                                                                         | ہاں             |
| `No new ESLint warnings`                         | کوڈ کے PRs؛ suppressions سے آگاہ lint محافظ                                                                                                                                                                          | ہاں، forks سمیت |
| `Merge integrity (changelog + generated skills)` | غیر مسودہ PRs؛ changelog اور تیار کردہ skills کی ہم وقت سازی                                                                                                                                                         | ہاں، forks سمیت |

#### بھولے ہوئے sibling ٹیسٹس کی رپورٹ

`npm run check:forgotten-sibling-tests` ٹیسٹ کے اثرات کے نقشے کے پسِ پشت موجود import resolver کو دوبارہ استعمال کرتا ہے۔
ہر تبدیل شدہ production ماڈیول کے لیے، جب ممکنہ
ٹیسٹ pull-request diff میں موجود نہ ہو تو یہ قطعی
`changed module/symbol -> static consumer -> candidate sibling test` سلسلوں کی رپورٹ دیتا ہے۔ کسی بھی blocking rollout سے پہلے calibration کے لیے Markdown خلاصہ اور JSON نتیجہ
`forgotten-sibling-tests` workflow artifact کے طور پر برقرار رکھے جاتے ہیں۔

Barrel re-exports اور dynamic imports صرف resolution کی تشخیصی معلومات ہیں؛ یہ کبھی بھی
blocking finding نہیں بناتے۔ نظرِ ثانی شدہ استثنا
`config/quality/forgotten-sibling-allowlist.json` میں موجود ہوتے ہیں۔ ہر اندراج میں consumer اور candidate
test کا نام، ایک مخصوص وجہ، اور GitHub issue یا pull request کا لنک ہونا ضروری ہے۔ خراب اندراجات fail
closed ہوتے ہیں۔ استثنا حذف شدہ candidate test یا `.skip`/`.todo` شامل کرنے والے diff کو suppress نہیں کر سکتے؛
assertion کو کمزور کرنا اور دیگر masking، آزادانہ طور پر blocking
`check:test-masking` gate کی ذمہ داری رہتے ہیں۔

### جاب: `lint`

`main` کے ہر PR پر چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| اسکرپٹ (`npm run ...`)            | توثیق کرتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | روکنے والا                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | Node.js کا ورژن معاونت یافتہ حد کے اندر ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ہاں                                     |
| `check:test-tla-order`            | `tests/unit` کے تحت کوئی `node:test` فائل کسی ٹیسٹ کو رجسٹر نہیں کرتی، پھر ٹاپ لیول `await` تک نہیں پہنچتی، اور اس کے بعد مزید ٹیسٹ رجسٹر نہیں کرتی (#18045؛ ریچیٹ: `test-tla-order-allowlist.json` صرف سکڑ سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:cycles`                    | پورے `src/` + `open-sse/` میں گردشی امپورٹس (AST پر مبنی، tsconfig کے `paths` حل شدہ)۔ جب بھی کوئی سائیکل موجود ہو، بنیادی کمانڈ 1 کے ساتھ خارج ہوتی ہے (#15281 سے fail-closed) اور SCCs کی فہرست دیتی ہے۔ `check:cycles:ratchet` (جسے CI چلاتا ہے) اس وقت روکتا ہے جب تعداد `quality-baseline.json` میں `metrics.cycles` کی بالائی حد سے تجاوز کرے — فی الحال 14، `direction: down`، لہٰذا یہ صرف کم ہو سکتی ہے (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ہاں (ریچیٹ)                             |
| `check:boundary`                  | `open-sse → src` کپلنگ: انجن سے ایپ میں منفرد فائل بہ فائل امپورٹس (`scripts/quality/measure-boundary.mjs`؛ ایج لسٹ v4 کور/ماڈیول-اسپلٹ تدارکی بیک لاگ ہے)۔ بنیادی کمانڈ = مشاورتی رپورٹ (`quality:boundary` جیسی)۔ `check:boundary:ratchet` (جسے CI چلاتا ہے، اور جو `quality.yml` کے فاسٹ گیٹس ریچیٹ لوپ میں بھی شامل ہے) اس وقت روکتا ہے جب تعداد `quality-baseline.json` میں `metrics.boundaryOpenSseToSrc` کی بالائی حد سے تجاوز کرے — پیمائش شدہ 771 پر ابتدائی قدر مقرر ہے، `direction: down`؛ `--update` اسے صرف کم کرتا ہے؛ PRs پر بیس کے لحاظ سے (`--base-ref`، ذیل میں دیکھیں)                                                                                                                                                                                                                                                                                                                                      | ہاں (ریچیٹ)                             |
| `check:route-validation:t06`      | تمام روٹس پر Zod اسکیمے موجود ہیں (Tier 6 پالیسی)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ہاں                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` کی تعداد بجٹ سے تجاوز نہیں کرتی (Tier 11 کیٹراکا)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ہاں                                     |
| `check:provider-consistency`      | `providers.ts` میں موجود ہر پرووائیڈر کی `providerRegistry.ts` میں مماثل انٹری موجود ہے (اور اس کے برعکس بھی، allowlist کے اندر)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ہاں                                     |
| `check:model-lifecycle`           | ہاتھ سے برقرار رکھی جانے والی تین روٹنگ ٹیبلز، چیک اِن کیے گئے لائف سائیکل اسنیپ شاٹ (#11503) کے ساتھ مطابقت رکھتی ہیں: `FITNESS_TABLE` (`taskFitness.ts`) کسی ایسے ریٹائرڈ id کو اسکور نہیں کرتی جسے `REGISTRY` روٹ کر سکتی ہو؛ ہر `BUILT_IN_ALIASES` ہدف `REGISTRY` میں موجود اور ریٹائرڈ-id اسنیپ شاٹ سے غائب ہے؛ `REGISTRY` میں اب بھی موجود ہر ریٹائرڈ id کو فارورڈ کیا گیا ہے یا `allowedRetiredInCatalog` میں درج کیا گیا ہے؛ اور کوئی `DEFAULT_DEGRADATION_MAP` ماخذ یا ہدف اس اسنیپ شاٹ میں ریٹائرڈ ظاہر نہیں ہوتا۔ اس سے یہ ثابت نہیں ہوتا کہ کوئی ماڈل فی الحال کسی فعال upstream کے ذریعے فراہم کیا جا رہا ہے۔ آف لائن — `config/quality/model-lifecycle.json` سے موازنہ کرتا ہے، جسے `npm run quality:refresh-model-lifecycle` کے ذریعے دستی طور پر ریفریش کیا جاتا ہے (نیٹ ورک؛ CI میں وائر نہیں کیا گیا)۔ `allowedRetiredInCatalog` ایک burn-down ratchet ہے: صرف ٹریکنگ issue کے ساتھ ہی کوئی انٹری شامل کریں۔ | ہاں                                     |
| `check:fetch-targets`             | کلائنٹ سائیڈ `src/` میں موجود ہر `fetch("/api/...")` ایک حقیقی `route.ts` تک resolve ہوتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ہاں                                     |
| `check:deps`                      | ریپو میں ہر `package.json` کے تمام `npm install` کیے جا سکنے والے deps، `dependency-allowlist.json` میں موجود ہیں؛ نئے unpinned یا slopsquatted پیکیجز کو نشان زد کیا جاتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں                                     |
| `audit:deps`                      | تمام پانچ آزاد lockfiles (root، Electron، OpenCode plugins v1/v2 اور provider) کا npm audit۔ سنگین advisories رکاوٹ بنتی ہیں؛ بلند درجے کی advisories نمایاں انتباہات کے طور پر موجود رہتی ہیں۔ غائب/ناکام audits کو INCOMPLETE سمجھا جاتا ہے اور وہ رکاوٹ بنتی ہیں؛ ہر scope کے lock hashes اور reports محفوظ رکھے جاتے ہیں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں                                     |
| `check:lockfile`                  | `package-lock.json` کی سالمیت — https registry، integrity hashes، کوئی host overrides نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ہاں                                     |
| `check:licenses`                  | production dependencies کے لیے SPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:tracked-artifacts`         | کوئی build artifacts / commit شدہ `node_modules` symlinks نہیں (husky pre-commit میں بھی چلتا ہے؛ pre-push جان بوجھ کر ہلکا رکھا گیا ہے — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ہاں                                     |
| `check:ai-attribution`            | PR commits، title یا body میں کوئی AI/bot `Co-Authored-By` trailer یا AI-generation footer نہیں — Hard Rule #16 (`quality.yml` کے PR→`release/**` والے fast-gates loop میں — event payload پڑھتا ہے، PRs کے علاوہ no-op رہتا ہے — اور `ci.yml` lint میں PR→`main` کے لیے صرف PR والا step؛ نیز husky کا `commit-msg` hook؛ انسانی co-authors کی اجازت ہے؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | ہر Vitest exclusion میں tracking issue درج ہو اور وہ `config/quality/vitest-exclusions.json` میں موجود ہو (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ہاں                                     |
| `check:file-size`                 | سورس فائلیں (`src/`، `open-sse/`، `electron/`، `bin/` میں `.ts`/`.tsx`) `cap` کے اندر اور ٹیسٹ فائلیں (`*.test.ts(x)`) `testCap` کے اندر رہتی ہیں؛ `file-size-baseline.json` میں منجمد فائلیں (`frozen` / `testFrozen`) اپنے ریکارڈ شدہ سائز سے تجاوز نہیں کر سکتیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ہاں                                     |
| `check:error-helper`              | executors/handlers میں خرابی کے جوابات `buildErrorBody()` / `sanitizeErrorMessage()` استعمال کرتے ہیں (سخت اصول #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:migration-numbering`       | Migration SQL فائلیں مسلسل نمبروں کے ساتھ ہوتی ہیں، بغیر کسی خلا یا نقل کے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ہاں                                     |
| `check:public-creds`              | `publicCreds.ts` سے باہر کوئی لفظی OAuth `client_id`/`client_secret` یا Firebase Web کلیدیں موجود نہیں ہیں (سخت اصول #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ہاں                                     |
| `check:db-rules`                  | `src/lib/db/` ماڈیولز سے باہر کوئی raw SQL نہیں؛ `localDb.ts` سے کوئی barrel-imports نہیں (سخت اصول #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ہاں                                     |
| `check:known-symbols`             | اپنی dispatch tables میں رجسٹرڈ provider executors، routing strategies، اور translators ڈسک پر موجود فائلوں سے مطابقت رکھتے ہیں—کوئی غیر منسلک یا غیر اعلان شدہ symbols نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ہاں                                     |
| `check:route-guard-membership`    | ہر وہ روٹ جو چائلڈ پروسیس شروع کرتا ہے، `isLocalOnlyPath()` کے ذریعے درجہ بند کیا جاتا ہے (سخت قواعد #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں                                     |
| `check:test-discovery`            | ریپو میں موجود ہر `*.test.ts` / `*.spec.ts` فائل کو کم از کم ایک ٹیسٹ رنر جمع کرتا ہے (ریچیٹ: `test-discovery-baseline.json` میں یتیم فائلوں کی فہرست صرف کم ہو سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ہاں                                     |
| `check:agent-skills-sync`         | تیار کردہ ایجنٹ اسکلز آرٹیفیکٹس اپنے ماخذ کیٹلاگ سے مطابقت رکھتے ہیں (کوئی انحراف نہیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | پرووائیڈر لوگوز/اثاثوں کے ساتھ ماخذ کی ریکارڈ شدہ اندراج موجود ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON کنفیگریشن فائلیں درست طور پر پارس ہوتی ہیں اور ریپو کے لنٹ قواعد پر پورا اترتی ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | TypeScript کمپائلیشن بغیر کسی خرابی کے (صرف مشاورتی انتباہات)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں                                     |
| `typecheck:noimplicit:core`       | سخت `noImplicitAny` — مستقبل پر مرکوز؛ پہلے سے موجود بہت سی کال سائٹس کو اب بھی تشریحات درکار ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **مشاورتی** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` کو `src/app/(dashboard)/**` تک محدود کیا گیا ہے (#7033) — `typecheck:core` کی منتخب کردہ 27 فائلوں کی allowlist میں کوئی dashboard TSX شامل نہیں ہے، اور `next build` بھی کبھی اس کی type-checking نہیں کرتا (`next.config.mjs` میں `ignoreBuildErrors: true` مقرر ہے)، اس لیے وہاں orphaned-identifier regressions (#6625/#6909) CI کو دکھائی نہیں دیتی تھیں۔ ایک منجمد فی فائل/فی TS-code شمار کی baseline (`config/quality/dashboard-typecheck-baseline.json`، وہی stale-enforcement pattern جو `check:known-symbols` میں ہے) کے مقابلے میں diffs — baseline شمار سے زیادہ صرف نئی خرابیاں gate کو ناکام کرتی ہیں؛ جب پہلے سے موجود خرابی درست ہو جائے تو `--update` کے ساتھ ratchet کم کریں۔                                                                                                                                                                                                                         | ہاں                                     |

### Job: `quality-gate`

`test-coverage` کے بعد چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| Script                       | توثیق                                                                                                                                                                                     | Blocking                  |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | `quality-metrics.json` بناتا ہے (ESLint انتباہات کی تعداد، ضم شدہ shard رپورٹ سے coverage)                                                                                                | ہاں (ratchet سے upstream) |
| `quality:ratchet`            | `quality-baseline.json` میں ہر metric کی حالت بدتر نہیں ہوئی (ESLint انتباہات ≤ baseline؛ coverage ≥ baseline)                                                                            | ہاں                       |
| `check:duplication`          | Code duplication (jscpd@4) `quality-baseline.json` میں موجود baseline سے تجاوز نہیں کرتی                                                                                                  | ہاں                       |
| `check:complexity`           | فائل کی سطح کی cyclomatic complexity مقررہ حد سے تجاوز نہیں کرتی (بنیادی ESLint `complexity` + `max-lines-per-function`)                                                                  | ہاں                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — الگ ESLint pass؛ CI دونوں کو واحد `check:complexity-ratchets` مرحلے کے طور پر ملا کر چلاتا ہے                                    | ہاں                       |
| `check:dead-code`            | غیر استعمال شدہ exports / files کا ratchet (knip) baseline کے مقابلے میں بدتر نہیں ہوتا                                                                                                   | ہاں                       |
| `check:compression-budget`   | Compression benchmark budget — ہر engine کے token-savings کی کم از کم حدیں بدتر نہیں ہونی چاہییں                                                                                          | ہاں                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) بدتر نہیں ہوتا؛ بڑی حد تک `typecheck:noimplicit:core` کا احاطہ کرتا ہے                                                                            | ہاں                       |
| `check:codeql-ratchet`       | کھلے CodeQL alerts کی تعداد بدتر نہیں ہوتی (`gh api` کے ذریعے پڑھتا ہے؛ token نہ ہونے پر بخوبی skip کرتا ہے) — refresh cadence اور manual trigger کے لیے: ذیل میں "CodeQL ratchet" دیکھیں | ہاں                       |

### Job: `quality-extended`

یہ job قابل اطلاق candidates کو روکتا ہے۔ Bundle size، secret findings، vulnerability
findings، workflow findings اور OpenAPI تبدیلیوں کو مطلوبہ ratchets کے ساتھ جانچا جاتا ہے۔
Circular-dependency diagnostics بدستور مشاورتی ہیں۔ Scanner کی installation لازمی ہے:
`scripts/ci/install-quality-scanners.sh` مقررہ versions فراہم کرتا ہے اور
installation failures کو آگے منتقل کرتا ہے۔ غائب tools، invalid reports یا غائب baselines کی صورت میں
مطلوبہ scanner gate INCOMPLETE رہتا ہے۔

| اسکرپٹ                   | توثیق                                                                                                                                                                                              | بلاک کرنے کی حالت                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | کوئی دوری انحصارات نہیں (dpdm)                                                                                                                                                                     | **مشاورتی**                                           |
| `check:bundle-size`      | بنڈل کا حجم مقررہ حد سے زیادہ نہیں؛ پیمائش دستیاب نہ ہونے پر ناکامی ہوتی ہے                                                                                                                        | **--ratchet کے ساتھ بلاک کرنے والا**                  |
| `check:secrets`          | Gitleaks کی دریافتوں میں اضافہ نہیں ہوتا؛ لازمی اسکینز گم شدہ ٹولز/ماخذ/بیس لائن، ناکام اسکینز اور غلط رپورٹس کو مسترد کرتے ہیں                                                                    | **--ratchet کے ساتھ بلاک کرنے والا**                  |
| `check:vuln-ratchet`     | انحصارات کی کمزوریوں میں اضافہ نہیں ہوتا؛ لازمی اسکینز گم شدہ ٹولز، غلط رپورٹس یا گم شدہ بیس لائنز کو مسترد کرتے ہیں                                                                               | **--ratchet کے ساتھ بلاک کرنے والا**                  |
| `check:workflows`        | ورک فلو لنٹ (actionlint + zizmor)؛ گم شدہ/خراب اسکینرز، غلط رپورٹس یا گم شدہ ریچٹ بیس لائن INCOMPLETE کے طور پر ناکام ہوتے ہیں۔ درست دریافتیں منتخب کردہ سخت/مشاورتی/ریچٹ پالیسی کی پیروی کرتی ہیں | عمل درآمد لازمی؛ CI میں zizmor ریچٹ بلاک کرنے والا ہے |
| `check:openapi-breaking` | پن شدہ ایونٹ کمیٹس کے مقابل عوامی API معاہدہ (PR مرج بیس، پش سے پہلے، مرج گروپ بیس؛ شیڈول شدہ/دستی چیک آؤٹ کا پہلا پیرنٹ)؛ لازمی پیمائش ناکام ہونے پر رسائی بند رکھتی ہے                           | **--ratchet کے ساتھ بلاک کرنے والا**                  |

### جاب: `docs-sync-strict`

`main` یا `release/**` کی طرف جانے والی pull requests کے لیے یہ جاب صرف ان امیدواروں پر چلتی ہے جو ڈرافٹ نہیں ہیں (یا قابلِ اعتماد قطار میں ہیں) اور دستاویزات یا کوڈ کی تبدیلیوں کے طور پر درجہ بند ہیں۔ یہ PR کے علاوہ CI کے دیگر واقعات پر بھی چلتی ہے؛ اس ورک فلو کا push ٹرگر صرف `main` کا احاطہ کرتا ہے، `release/**` کا نہیں۔ ایسا مرحلہ جو غیر صفر ایگزٹ کوڈ کے ساتھ ختم ہو، جاب کو روکتا ہے؛ صرف رپورٹ کیے جانے والے نتائج اور ذیل میں درج استثنا اسے نہیں روکتے۔

| اسکرپٹ                         | توثیق                                                                                                                                                                                                                                                                                                                                                                                                                         | بلاک کرنے کی حالت                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | میٹا گیٹ جو ذیل کے 7 ذیلی گیٹس کو یکے بعد دیگرے چلاتا ہے                                                                                                                                                                                                                                                                                                                                                                      | ہاں                                                                                                                                     |
| ↳ `check:docs-sync`            | پیکیج/OpenAPI/CHANGELOG کے ورژنز کی مطابقت، `llm.txt` کی بالکل مطابق آئینہ نقول، ترجمہ شدہ CHANGELOG کے حصوں اور حجم کے غیر متبدل اصول، اور ایسی نقل شدہ دستاویزات کی عدم موجودگی جن کی جگہ دوسری دستاویزات لے چکی ہیں                                                                                                                                                                                                        | ہاں                                                                                                                                     |
| ↳ `check:docs-frontmatter`     | کمپائل شدہ دستاویزی صفحات میں درست فرنٹ میٹر عنوانات موجود ہوتے ہیں                                                                                                                                                                                                                                                                                                                                                           | ہاں                                                                                                                                     |
| ↳ `check:docs-counts`          | زیادہ اعتماد والے شمار کے غیر متبدل اصول سختی سے نافذ ہوتے ہیں؛ فائلوں کی تعداد کی تخمینی جانچیں صرف تنبیہ کرتی ہیں، الا یہ کہ اسکرپٹ کو `--strict` دیا جائے (CI کا میٹا گیٹ یہ فلیگ نہیں دیتا)                                                                                                                                                                                                                               | سخت درجہ روکتا ہے؛ نرم درجہ مشاورتی ہے                                                                                                  |
| ↳ `check:env-doc-sync`         | نظرانداز کیے جانے والے، صرف دستاویزات میں موجود، اور صرف ماحول میں موجود عناصر کی واضح استثنائی فہرستیں لاگو کرنے کے بعد، ماخذ کوڈ میں پڑھے جانے والے ماحولیاتی متغیرات، `.env.example` اور `docs/reference/ENVIRONMENT.md` باہم مطابقت رکھتے ہیں                                                                                                                                                                             | ہاں، دستاویزات میں درج استثنائی فہرستوں سے باہر                                                                                         |
| ↳ `check:deprecated-versions`  | محفوظ تاریخی سیاق و سباق سے باہر ممکنہ طور پر پرانے ورژنز اور پرانی اپ ڈیٹ تاریخوں کی رپورٹ دیتا ہے، جبکہ نظرانداز کردہ دستاویزات کو خارج کرتا ہے                                                                                                                                                                                                                                                                             | CI کی موجودہ ترتیب میں مشاورتی (`--strict` نہیں دیا جاتا)                                                                               |
| ↳ `check:doc-links`            | دستاویزات میں اندرونی markdown لنکس حقیقی فائلوں تک پہنچتے ہیں (`[text]`/`(path)` فارم)                                                                                                                                                                                                                                                                                                                                       | ہاں                                                                                                                                     |
| ↳ `check:fabricated-docs`      | دستاویزات میں مذکور روٹس، env vars، CLI کمانڈز، ہک نام اور فائل پاتھ کوڈ بیس میں موجود ہیں۔ `--strict` کے ذریعے سخت گیٹ؛ فلیگ کے بغیر نرم ناکامی۔                                                                                                                                                                                                                                                                             | ہاں (CI میں `--strict` کے ذریعے)                                                                                                        |
| `check:cli-i18n`               | CLI میں استعمال ہونے والی `t()` کلیدیں `en` میں موجود ہیں؛ `pt-BR` ہر اعلیٰ سطح کے حصے کو برقرار رکھتا ہے؛ `zh-CN` اور `zh-TW` میں `en` کی ہر کلید موجود ہے                                                                                                                                                                                                                                                                   | ہاں                                                                                                                                     |
| `check:openapi-coverage`       | OpenAPI اسپیک حقیقی روٹس کی کم از کم ریچٹ شدہ زیریں حد کا احاطہ کرتا ہے                                                                                                                                                                                                                                                                                                                                                       | ہاں                                                                                                                                     |
| `check:openapi-security-tiers` | اعلان کردہ `x-loopback-only`/`x-always-protected` تشریحات کی تائید `routeGuard.ts` سے ہونی چاہیے؛ پارسر کی غلطیاں اور آگے کی سمت جانچ میں عدم مطابقت روکتی ہے۔ صرف مقامی رسائی والے سابقوں کے تحت غائب `x-loopback-only` کی الٹی جانچ تنبیہ کرتی ہے، اور صرف پیٹرن سے متعین روٹس اس الٹی جانچ سے خارج ہیں۔                                                                                                                    | پارسر/آگے کی سمت جانچیں روکتی ہیں؛ الٹی جانچ مشاورتی ہے                                                                                 |
| `check:openapi-routes`         | جواز کے ساتھ درج `KNOWN_STALE_SPEC` استثنائی فہرست لاگو کرنے کے بعد، `openapi.yaml` میں ہر `/api...` پاتھ پیرامیٹرز کے فرق سے قطع نظر حقیقی روٹ سے مطابقت رکھتا ہے؛ استثنائی فہرست کے پرانے اندراجات بھی ناکامی کا باعث بنتے ہیں                                                                                                                                                                                              | ہاں                                                                                                                                     |
| `check:docs-symbols`           | ایسی مستند بنیادی دستاویزات میں جو آئینہ نقول نہیں ہیں، اندرونی `/api/...` URL حوالے حقیقی روٹ یا روٹس کے خاندان سے مطابقت رکھتے ہیں؛ پراکسی/اپ اسٹریم/پلیس ہولڈر/فائل کے حوالے اور جواز والے `KNOWN_STALE_DOC_REFS` اندراجات خارج ہیں، اور استثنائی فہرست کے پرانے اندراجات ناکامی کا باعث بنتے ہیں                                                                                                                          | ہاں                                                                                                                                     |
| `i18n translation drift`       | بنیادی دستاویزات کے ماخذ/ہدف ہیش اور ترجمے کی اصل کی جانچ کرتا ہے۔ PR موازنہ صرف بالکل یکساں ورثے میں ملی ناکامیوں کی اجازت دیتا ہے؛ ماخذ، غائب ہدف، ہدف ہیش، متروک ترجمے یا سیکشن کیش کی نئی یا غیر تصدیق شدہ بے قاعدگیاں روکتی ہیں۔ PR موازنے سے باہر ماخذ/غائب ہدف/ہدف ہیش کی ناکامیاں روکتی ہیں، جبکہ متروک تراجم اور غیر مطابق سیکشن کیش صرف انتباہ رہتے ہیں۔ پرانے فارمیٹ کے سیکشن کیش کا موجود نہ ہونا ناکامی نہیں ہے۔ | PR میں نیا/غیر تصدیق شدہ انحراف روکتا ہے؛ بالکل یکساں ورثے میں ملا انحراف صرف انتباہ ہے؛ PR سے باہر کے قواعد ناکامی کی قسم پر منحصر ہیں |

### جاب: `i18n-ui-coverage`

| اسکرپٹ                              | توثیق                                                                                                                                                                           | رکاوٹ ڈالنے والا |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (اِن لائن) | UI i18n کلیدوں کی کوریج ≥ 65% ہے                                                                                                                                                | ہاں              |
| `check-ui-value-drift` (اِن لائن)   | دوبارہ لکھی گئی انگریزی **قدر** اپنے پیچھے کوئی فرسودہ ترجمہ نہیں چھوڑتی                                                                                                        | ہاں              |
| `check-new-key-coverage` (اِن لائن) | ایک **نئی** انگریزی کلید کا ہر locale میں ترجمہ کیا گیا ہے — `__MISSING__:` مارکر مسترد کر دیا جاتا ہے                                                                          | ہاں              |
| `check-translation-ratio`           | فی locale حقیقی ترجمے کا تناسب (انگریزی سے مماثل / پلیس ہولڈر / allowlist سے باہر غائب leaves) `config/quality/i18n-translation-baseline.json` + slack سے تجاوز نہیں کرنا چاہیے | **مسدود کنندہ**  |

`fetch-depth: 0` درکار ہے — value-drift gate، merge base کے مقابلے میں `en.json` کا diff کرتا ہے۔

#### `check-ui-value-drift` — فرسودہ ترجمے کا gate

یہ اس واحد i18n regression کو پکڑتا ہے جسے دوسرے gates ساختی طور پر نہیں دیکھ سکتے: کسی انگریزی قدر کو
دوبارہ لکھ دیا جاتا ہے اور _پچھلی_ انگریزی سے اخذ کردہ تراجم بدستور موجود رہتے ہیں، لہٰذا
غیر انگریزی صارفین پُراعتماد انداز میں لکھی گئی مگر اب غلط عبارت پڑھتے رہتے ہیں۔

یہ واقعی پروڈکشن میں جاری ہوا۔ Antigravity لاگ اِن helper آنے پر `oauthModal.googleOAuthWarning`
کو دوبارہ لکھا گیا (#5203)؛ **43 میں سے 39 locales** میں وہ متن برقرار رہا جو operators کو "مکمل
URL کاپی کر کے نیچے پیسٹ کرنے" کا کہتا تھا — ایسا flow جو اس provider کے لیے مکمل نہیں ہو سکتا۔ اس پر
#8463 تک توجہ نہیں گئی، کیونکہ:

- `sync-ui-keys` صرف ان کلیدوں کو backfill کرتا ہے جو **موجود نہیں** ہوتیں، کبھی ان کو نہیں جو **فرسودہ** ہوں؛
- `check-ui-keys-coverage` کلید کی _موجودگی_ شمار کرتا ہے، اس لیے فرسودہ ترجمہ بھی covered شمار ہوتا ہے؛
- `check-translation-drift`، `docs/i18n/<locale>/**.md` دستاویزی mirrors کو ٹریک کرتا ہے —
  یہ کبھی `src/i18n/messages/*.json` نہیں پڑھتا۔ 2026-09 کی re-sync سے job `docs-sync-strict` میں blocking ہے:
  کسی بنیادی doc میں ترمیم کریں → `npm run i18n:run -- --files=<doc>` (section-level، کم خرچ)۔

**Diff-aware، baseline-backed نہیں۔** یہ merge base پر موجود `en.json` کا working tree سے موازنہ کرتا ہے؛
ہر اس کلید کے لیے جس کی انگریزی قدر بدلی ہو، کوئی بھی locale جس میں غیر ترمیم شدہ ترجمہ اب بھی موجود ہو،
فرسودہ ہے۔ یہ جان بوجھ کر **پہلے سے موجود debt کو منجمد** کرتا ہے — diff یہ ظاہر نہیں کر سکتا کہ کوئی
دیرینہ ترجمہ کس پرانی انگریزی سے آیا تھا، اس لیے gate صرف اسی چیز کا فیصلہ کرتا ہے جسے موجودہ تبدیلی
چھوتی ہے۔ متبادل (فی کلید hash baseline) کے لیے تقریباً 600 KB کی generated فائل درکار ہوتی، جو موجودہ
سب سے بڑے baseline سے 3× بڑی ہوتی اور ہر i18n PR پر تبدیل ہوتی۔

اسے مطمئن کرنے کے دو طریقے ہیں:

1. متاثرہ تراجم کو اپ ڈیٹ کریں، یا
2. انہیں `__MISSING__:<new english>` پر سیٹ کریں — پھر runtime درست انگریزی فراہم کرتا ہے
   (`src/i18n/request.ts::deepMergeFallback`، #7258) اور کلید ترجمے کے لیے queue ہو جاتی ہے۔

اگر string کا **مطلب** تبدیل ہوا ہے تو **کلید کا نام بدلنے** کو ترجیح دیں: نئی کلید کسی فرسودہ
ترجمے کی وارث نہیں بن سکتی۔ #8463 میں یہی pattern استعمال کیا گیا۔

```bash
npm run i18n:check-value-drift          # سخت جانچ (CI یہی چلاتا ہے)
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

### Job: `i18n`

مکمل i18n validation matrix (ہر locale کے لیے ایک job)۔ پوری job مشاورتی ہے۔

| اسکرپٹ                          | توثیق                    | رکاوٹ ڈالنے والا                                    |
| ------------------------------- | ------------------------ | --------------------------------------------------- |
| `validate_translation.py quick` | فی locale ترجمے کی تکمیل | **مشاورتی** (پوری job پر `continue-on-error: true`) |

### Job: `pr-test-policy`

صرف pull requests پر چلتا ہے۔

| اسکرپٹ                 | توثیق                                                                                                                                     | رکاوٹ ڈالنے والا |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check:pr-test-policy` | وہ PRs جو `src/`، `open-sse/`، `electron/`، یا `bin/` میں production code تبدیل کرتے ہیں، لازماً tests شامل یا اپ ڈیٹ کریں (Hard Rule #8) | ہاں              |
| `check:test-masking`   | تبدیل شدہ test files مجموعی assert count کم نہ کریں اور `assert.ok(true)` جیسی tautologies شامل نہ کریں                                   | ہاں              |
| `check:pr-evidence`    | PR body تبدیلی کے لیے test/VPS evidence کا حوالہ دے (PR نثر کو grep کر کے Hard Rule #18 کو خودکار بناتا ہے — نازک ہے، Backlog دیکھیں)     | ہاں              |

### Job: `test-vitest`

`changes` درجہ بندی جاب درکار ہے۔ قابلِ اطلاق میٹرکس شارڈز کی ناکامی پر مرج مسدود ہو جاتا ہے۔

| سوٹ              | توثیق کرتا ہے                                    | بلاکنگ                                                                                                                        |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP سرور (110 ٹولز)، autoCombo، کیش — vitest رنر | ہاں                                                                                                                           |
| `test:vitest:ui` | UI کمپوننٹ ٹیسٹس — vitest رنر                    | **بلاکنگ** — پہلے سے موجود ناکامیوں کو `vitest.config.ts` میں واضح طور پر خارج کیا گیا ہے؛ نئی ناکامیاں جاب کو ناکام کرتی ہیں |

### رات کے ورک فلوز (شیڈول شدہ، مشاورتی)

یہ cron شیڈول (اور `workflow_dispatch`) پر چلتے ہیں، PRs پر کبھی نہیں۔ یہ سب مشاورتی ہیں۔

| ورک فلو                | توثیق کرتا ہے                                                                                                                                                                 | بلاکنگ      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | بے ترتیب سیڈ اور زیادہ رن تعداد کے ساتھ fast-check پراپرٹی ٹیسٹس                                                                                                              | **مشاورتی** |
| `nightly-resilience`   | heap-growth گیٹ، chaos fault-injection، k6 لوڈ/soak                                                                                                                           | **مشاورتی** |
| `nightly-llm-security` | promptfoo انجیکشن گارڈ (بلاک موڈ) + garak پروبز (پرووائیڈر سیکرٹ کے بغیر چھوڑ دیے جاتے ہیں)                                                                                   | **مشاورتی** |
| `nightly-schemathesis` | `docs/openapi.yaml` استعمال کرتے ہوئے لائیو OmniRoute کے خلاف OpenAPI کنٹریکٹ فزنگ (schemathesis) — اسپیک کی خلاف ورزیوں / غیر سنبھالی گئی 500s کو ظاہر کرتا ہے (مرحلہ 8 B.4) | **مشاورتی** |
| `nightly-mutation`     | تیز یونٹ لین پر Stryker میوٹیشن ٹیسٹنگ اسکور — بچ جانے والے میوٹنٹس کمزور asserts کو ظاہر کرتے ہیں                                                                            | **مشاورتی** |
| `nightly-compat`       | معاونت یافتہ `engines.node` رینجز میں Node انجن مطابقت میٹرکس                                                                                                                 | **مشاورتی** |

کارکردگی کی بیس لائنز (heap، TTFB، بلڈ ٹائم) ریکارڈ کی جاتی ہیں، گیٹ نہیں کی جاتیں: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) دیکھیں۔

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

### CodeQL ریچیٹ: ریفریش کا دورانیہ اور دستی ٹرگر

`check:codeql-ratchet` **ریپو کی حالت پڑھتا ہے، جسے ایک شیڈول کے مطابق ریفریش کیا جاتا ہے — ہر PR پر نہیں۔**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` یہ رپورٹ کرتا ہے:
`state: configured`، `schedule: weekly`: یہ GitHub کا ڈیفالٹ سیٹ اپ اسکین ہے، نہ کہ ہر پش پر ہونے والا
تجزیہ۔ نتیجہ: انتباہات کو درست کرنے والی PR مرج ہونے کے بعد بھی، ریچیٹ
اگلا طے شدہ اسکین چلنے تک پرانی، زیادہ تعداد پڑھتا رہتا ہے — لہٰذا یہ
ہر کھلی PR، بشمول درستگی کرنے والی PR کے اپنے فالو اپس، پر تنزلی رپورٹ کرتا ہے، جب تک اسکین تازہ حالت تک نہیں پہنچ جاتا۔

**دستی ریفریش**: `gh workflow run codeql.yml --ref release/vX.Y.Z` تجزیہ دوبارہ چلاتا ہے
اور چند منٹوں میں انتباہات دوبارہ شائع کر دیتا ہے۔ پہلے `.github/workflows/codeql.yml`
پڑھیں — اس کا ہیڈر وضاحت کرتا ہے کہ یہ صرف `workflow_dispatch` کے ذریعے چلتا ہے **کیونکہ یہ
GitHub کے "default setup" سے متصادم ہے** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)۔ `push`/`pull_request`/
`schedule` ٹرگرز بحال کرنے کے لیے پہلے **مالک کی کارروائی** درکار ہے: Settings → Code security →
CodeQL: Default → Advanced۔ اس تبدیلی کے بغیر `schedule:` ٹرگر شامل نہ کریں — یہ
صرف ناکام رنز پیدا کرے گا۔

**تعداد کم ہونے کے بعد بیس لائن سخت کریں** — `node scripts/check/check-codeql-ratchet.mjs
--update` نئی پیمائش شدہ تعداد کو `quality-baseline.json` →
`metrics.codeqlAlerts.value` میں لکھتا ہے، تاکہ ریچیٹ خاموشی سے پرانی بالائی حد تک دوبارہ
تنزلی کی اجازت نہ دے۔ عملی مثال (2026-09-02/03): PR #12502 نے 7 حقیقی انتباہات درست کیے
(پیمائش شدہ کھلے انتباہات 13 → 6)؛ PR #12530 نے منجمد بیس لائن کو مطابقت کے لیے 11 → 6 تک سخت کیا؛
اس کے بعد باقی 6 انتباہات کو فی انتباہ جواز کے ساتھ مسترد کر کے کھلی تعداد 0 کر دی گئی۔

**مسترد کرنا آپریٹر کا فیصلہ ہے (سخت اصول #14)** — مسترد کرنے کے تبصرے میں تکنیکی
جواز درج کیے بغیر کبھی بھی CodeQL انتباہ مسترد نہ کریں: اپ اسٹریم پروٹوکول کی ضرورت کے لیے `won't fix`،
ٹیسٹ فکسچر کے لیے `used in tests`، اور ایسے سینیٹائزر کے لیے جسے CodeQL نہیں دیکھ سکتا `false positive`
(نظیر: `docs/security/ERROR_SANITIZATION.md`)۔

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

**اوپر یہ بھی غیر دستاویزی ہے** (مشاورتی، کم سگنل): `docs-lint` جاب
(markdownlint + Vale، پوری جاب پر `continue-on-error`) اور الگ اسکینر ورک فلوز
`semgrep.yml` / `codeql.yml` / `scorecard.yml`۔ `semgrepFindings: 0`
`quality-baseline.json` میں موجود ہے، لیکن `ci.yml` میں اسے کسی بلاکنگ ریچٹ سے منسلک نہیں کیا گیا — یہ میٹرک
فی الحال غیر مربوط ہے۔

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
