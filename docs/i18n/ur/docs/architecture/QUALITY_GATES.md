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

CI اور Quality Gates ورک فلوز میں سے ہر ایک ایک مستحکم فیصلہ جاری کرتا ہے: `Gate / CI` اور
`Gate / Quality`۔ ان کی ورژن شدہ منظوری پالیسی ہر اپ اسٹریم جاب کو
لازمی یا مشاورتی کے طور پر درج کرتی ہے۔ کسی قابل اطلاق لازمی جاب کا کامیاب ہونا ضروری ہے:
غائب، منسوخ، چھوڑے گئے، زیر التوا اور نامعلوم نتائج PASS ثابت نہیں کر سکتے۔ صرف دستاویزات
یا صرف کیٹلاگ کی درست درجہ بندی کسی کوڈ لین کو ناقابل اطلاق بنا سکتی ہے؛
ڈرافٹ PR منظور شدہ امیدوار نہیں ہے۔ `hotfix` لیبل ثبوت کی شرط ختم نہیں کرتا۔

دونوں ورک فلوز main/release برانچز میں آنے والے PRs، `main` پر پُشز، دستی dispatch
اور merge-group ایونٹس کا احاطہ کرتے ہیں۔ Push، dispatch اور merge-group مکمل انتخاب چلاتے ہیں۔
`release/**` پر پُشز انہیں شروع نہیں کرتیں (2026-10-18): ہر تبدیلی اپنے PR پر پہلے ہی میٹرکس چلا چکی ہوتی ہے
اور ضم شدہ امتزاج Release-Green کی ذمہ داری ہے (`docs/ops/RUNNER_BOX.md` → Hosted لین)۔ Forks
اور merge groups ان جابز کے لیے hosted runners استعمال کرتے ہیں جو بصورت دیگر self-hosted
runners منتخب کرتی ہیں؛ رول آؤٹ سے پہلے hosted کی کافی گنجائش کی تصدیق ضروری ہے۔

ہر JSON رسید چیک آؤٹ کردہ SHA، ورک فلو رن اور کوشش کی شناخت کرتی ہے۔
CLI چیک آؤٹ/ایونٹ SHA کے عدم تطابق کو مسترد کرتی ہے۔ ورک فلو ٹیسٹس پالیسی کی رکنیت کو
فیصلہ دینے والی جاب کی `needs` فہرست سے منسلک کرتے ہیں، تاکہ کوئی نئی یا ہٹائی گئی لین خاموشی سے غائب نہ ہو سکے۔
رسیدیں اپنے متعلقہ ورک فلو کا احاطہ کرتی ہیں، اشاعت، تعیناتی، یا کسی موجودہ
مشاورتی اسکینر کی داخلی کارروائیوں کا نہیں۔ برانچ قواعد میں دونوں چیک نام فعال کرنا
ایک علیحدہ انتظامی تبدیلی ہے؛ ان جابز کو شامل کرنا بذات خود کسی برانچ کو محفوظ نہیں بناتا۔

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

### Release PR کا تیز راستہ (`quality.yml`)

`.github/workflows/quality.yml`، main/release PRs، `main` پر pushes، dispatch اور merge groups میں CI کی تکمیل کرتی ہے۔ PRs میں path-filtered تیز رفتار جانچیں استعمال ہوتی ہیں۔ مستقل طور پر غیر فعال duplicate build ہٹا دی گئی ہے؛ اصل build/package/boot جانچیں CI میں برقرار ہیں۔

| Job                                              | دائرۂ کار                                                                                                                                                                                                                    | رکاوٹ بننے والا |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs؛ API docs refs اور docs-all                                                                                                                                                                                    | ہاں             |
| `Fast Quality Gates`                             | Code PRs؛ static checks، typecheck، dashboard typecheck، متاثرہ unit tests                                                                                                                                                   | ہاں             |
| `Forgotten sibling tests`                        | Code PRs؛ تبدیل شدہ modules کو static consumers اور ممکنہ sibling tests سے منسلک کیا جاتا ہے؛ barrel اور dynamic-import paths کو مشاورتی diagnostics کے طور پر رپورٹ کیا جاتا ہے، ساتھ ہی حوالہ شدہ allowlist exceptions بھی | **مشاورتی**     |
| `Vitest (fast-path)`                             | Code PRs؛ تیز رفتار vitest suite                                                                                                                                                                                             | ہاں             |
| `Unit Tests fast-path`                           | Code PRs؛ 4-shard unit suite                                                                                                                                                                                                 | ہاں             |
| `No new ESLint warnings`                         | Code PRs؛ suppressions سے آگاہ lint guard                                                                                                                                                                                    | ہاں، forks سمیت |
| `Merge integrity (changelog + generated skills)` | غیر draft PRs؛ changelog اور generated skill کی ہم آہنگی                                                                                                                                                                     | ہاں، forks سمیت |

#### بھولے ہوئے sibling tests کی رپورٹ

`npm run check:forgotten-sibling-tests`، test-impact map کے پسِ پشت موجود import resolver کو دوبارہ استعمال کرتی ہے۔
ہر تبدیل شدہ production module کے لیے، جب ممکنہ test، pull-request diff میں موجود نہ ہو تو یہ متعین
`changed module/symbol -> static consumer -> candidate sibling test` سلسلوں کی رپورٹ دیتی ہے۔ Markdown summary اور JSON نتیجے کو کسی بھی blocking rollout سے پہلے calibration کے لیے
`forgotten-sibling-tests` workflow artifact کے طور پر محفوظ رکھا جاتا ہے۔

Barrel re-exports اور dynamic imports صرف resolution diagnostics ہیں؛ یہ کبھی بھی blocking finding پیدا نہیں کرتے۔ نظرثانی شدہ exceptions
`config/quality/forgotten-sibling-allowlist.json` میں موجود ہوتے ہیں۔ ہر entry میں consumer اور ممکنہ
test کا نام، ایک مخصوص rationale، اور GitHub issue یا pull request کا link ہونا ضروری ہے۔ غلط ساخت والی entries
محفوظ انداز میں ناکام ہوتی ہیں۔ Exceptions کسی حذف شدہ ممکنہ test یا ایسے diff کو suppress نہیں کر سکتیں جو `.skip`/`.todo` شامل کرے؛
assertion کی کمزوری اور دیگر masking کی ذمہ داری، آزادانہ طور پر blocking
`check:test-masking` gate کے پاس رہتی ہے۔

### Job: `lint`

`main` کے لیے ہر PR پر چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| اسکرپٹ (`npm run ...`)            | توثیق کرتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | روکنے والا                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js کا ورژن معاونت یافتہ حد کے اندر ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `check:cycles`                    | تمام `src/` + `open-sse/` میں دائروی imports (AST پر مبنی، tsconfig کے `paths` حل شدہ)۔ جب بھی کوئی cycle موجود ہو، bare کمانڈ 1 کے ساتھ خارج ہوتی ہے (#15281 سے fail-closed) اور SCCs کی فہرست دیتی ہے۔ `check:cycles:ratchet` (جو CI چلاتا ہے) اس وقت روکتا ہے جب تعداد `quality-baseline.json` میں `metrics.cycles` کی بالائی حد سے تجاوز کرے — فی الحال 14، `direction: down`، لہٰذا یہ صرف کم ہو سکتی ہے (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں (ratchet)                           |
| `check:boundary`                  | `open-sse → src` coupling: engine سے app میں منفرد file-to-file imports (`scripts/quality/measure-boundary.mjs`؛ edge list، v4 core/module-split اصلاحی backlog ہے)۔ bare کمانڈ = مشاورتی رپورٹ (`quality:boundary` جیسی)۔ `check:boundary:ratchet` (جو CI چلاتا ہے، اور `quality.yml` کے fast-gates ratchet loop میں بھی شامل ہے) اس وقت روکتا ہے جب تعداد `quality-baseline.json` میں `metrics.boundaryOpenSseToSrc` کی بالائی حد سے تجاوز کرے — ناپی گئی قدر 771 پر ابتدائی طور پر مقرر، `direction: down`؛ `--update` اسے صرف کم کرتا ہے؛ PRs پر base-relative (`--base-ref`، ذیل میں دیکھیں)                                                                                                                                                                                                                                                                                                                                                 | ہاں (ratchet)                           |
| `check:route-validation:t06`      | تمام routes پر Zod schemas موجود ہیں (Tier 6 پالیسی)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ہاں                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` کی تعداد بجٹ سے تجاوز نہیں کرتی (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ہاں                                     |
| `check:provider-consistency`      | `providers.ts` میں موجود ہر provider کے لیے `providerRegistry.ts` میں مماثل اندراج موجود ہے (اور اس کے برعکس بھی، allowlist کے اندر)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ہاں                                     |
| `check:model-lifecycle`           | ہاتھ سے برقرار رکھے جانے والے تین routing tables، چیک اِن کیے گئے lifecycle snapshot (#11503) کے ساتھ ہم آہنگ رہتے ہیں: `FITNESS_TABLE` (`taskFitness.ts`) کسی ایسے retired id کو اسکور نہیں کرتا جسے `REGISTRY` route کر سکتا ہو؛ ہر `BUILT_IN_ALIASES` target، `REGISTRY` میں موجود اور retired-id snapshot سے غیر موجود ہے؛ `REGISTRY` میں اب بھی موجود ہر retired id کو forward کیا گیا ہے یا `allowedRetiredInCatalog` میں درج کیا گیا ہے؛ اور `DEFAULT_DEGRADATION_MAP` کا کوئی source یا target اس snapshot میں retired کے طور پر ظاہر نہیں ہوتا۔ اس سے یہ ثابت نہیں ہوتا کہ کوئی model فی الحال کسی فعال upstream کے ذریعے فراہم کیا جا رہا ہے۔ آف لائن — `config/quality/model-lifecycle.json` کے ساتھ موازنہ کرتا ہے، جسے `npm run quality:refresh-model-lifecycle` کے ذریعے دستی طور پر تازہ کیا جاتا ہے (نیٹ ورک؛ CI میں شامل نہیں)۔ `allowedRetiredInCatalog` ایک burn-down ratchet ہے: اندراج صرف tracking issue کے ساتھ شامل کریں۔ | ہاں                                     |
| `check:fetch-targets`             | client-side `src/` میں موجود ہر `fetch("/api/...")` ایک حقیقی `route.ts` تک resolve ہوتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ہاں                                     |
| `check:deps`                      | repo کے ہر `package.json` میں موجود تمام `npm install` کے قابل dependencies، `dependency-allowlist.json` میں شامل ہیں؛ نئے unpinned یا slopsquatted packages کو نشان زد کیا جاتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ہاں                                     |
| `audit:deps`                      | پانچوں آزاد lockfiles (root، Electron، OpenCode plugins v1/v2 اور provider) کا npm audit۔ Critical advisories عمل روک دیتی ہیں؛ high advisories نمایاں warnings کے طور پر برقرار رہتی ہیں۔ غائب/ناکام audits کو INCOMPLETE سمجھا جاتا ہے اور وہ عمل روک دیتی ہیں؛ ہر scope کے lock hashes اور reports محفوظ رکھے جاتے ہیں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `check:lockfile`                  | `package-lock.json` کی سالمیت — https رجسٹری، سالمیت ہیشز، کوئی ہوسٹ اوور رائیڈز نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ہاں                                     |
| `check:licenses`                  | پروڈکشن ڈیپینڈنسیز کے لیے SPDX لائسنس کی اجازت یافتہ فہرست                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `check:tracked-artifacts`         | کوئی بلڈ آرٹیفیکٹس / کمٹ شدہ `node_modules` سِم لنکس نہیں (husky پری کمٹ میں بھی چلتا ہے؛ پری پش جان بوجھ کر ہلکا رکھا گیا ہے — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ہاں                                     |
| `check:ai-attribution`            | PR کمٹس، عنوان یا متن میں کوئی AI/بوٹ `Co-Authored-By` ٹریلر یا AI جنریشن فوٹر نہیں — سخت اصول #16 (`quality.yml` کے PR→`release/**` فاسٹ گیٹس لوپ میں — ایونٹ پے لوڈ پڑھتا ہے، غیر PR صورتوں میں کوئی کارروائی نہیں کرتا — اور PR→`main` کے لیے `ci.yml` لنٹ میں صرف PR کا ایک مرحلہ؛ نیز husky کا `commit-msg` ہُک؛ انسانی شریک مصنفین کی اجازت ہے؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | ہر Vitest اخراج کسی ٹریکنگ مسئلے کا ذکر کرتا ہے اور `config/quality/vitest-exclusions.json` میں موجود ہے (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ہاں                                     |
| `check:file-size`                 | سورس فائلیں (`src/`، `open-sse/`، `electron/`، `bin/` میں `.ts`/`.tsx`) `cap` کے اندر اور ٹیسٹ فائلیں (`*.test.ts(x)`) `testCap` کے اندر رہیں؛ `file-size-baseline.json` میں منجمد فائلیں (`frozen` / `testFrozen`) اپنے ریکارڈ شدہ سائز سے زیادہ نہیں بڑھنی چاہییں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ہاں                                     |
| `check:error-helper`              | executors/handlers میں خرابی کے جوابات `buildErrorBody()` / `sanitizeErrorMessage()` استعمال کرتے ہیں (سخت اصول #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ہاں                                     |
| `check:migration-numbering`       | Migration SQL فائلیں تسلسل کے ساتھ نمبر شدہ ہیں، کوئی خلا یا نقل نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ہاں                                     |
| `check:public-creds`              | `publicCreds.ts` سے باہر کوئی لفظی OAuth `client_id`/`client_secret` یا Firebase Web کلیدیں موجود نہیں (سخت اصول #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ہاں                                     |
| `check:db-rules`                  | `src/lib/db/` ماڈیولز سے باہر کوئی خام SQL نہیں؛ `localDb.ts` سے کوئی barrel-imports نہیں (سخت اصول #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `check:known-symbols`             | اپنی dispatch tables میں رجسٹر شدہ provider executors، routing strategies، اور translators ڈسک پر موجود فائلوں سے مطابقت رکھتے ہیں — کوئی غیر منسلک یا غیر اعلان شدہ symbols نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ہاں                                     |
| `check:route-guard-membership`    | child process شروع کرنے والا ہر route، `isLocalOnlyPath()` کے ذریعے درجہ بند ہے (سخت اصول #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ہاں                                     |
| `check:test-discovery`            | repo میں موجود ہر `*.test.ts` / `*.spec.ts` فائل کو کم از کم ایک ٹیسٹ رنر جمع کرتا ہے (ریچیٹ: `test-discovery-baseline.json` میں یتیم فائلوں کی فہرست صرف مختصر ہو سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ہاں                                     |
| `check:test-tla-order`            | `tests/unit` کے تحت کوئی `node:test` فائل پہلے ٹیسٹ رجسٹر نہیں کرتی، پھر اعلیٰ سطح کے `await` تک نہیں پہنچتی، اور اس کے بعد مزید ٹیسٹ رجسٹر نہیں کرتی (#18045؛ ریچیٹ: `test-tla-order-allowlist.json` صرف مختصر ہو سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ہاں                                     |
| `check:agent-skills-sync`         | تیار کردہ ایجنٹ اسکلز کے نوادرات اپنے ماخذ کیٹلاگ سے مطابقت رکھتے ہیں (کوئی انحراف نہیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | پرووائیڈر لوگوز/اثاثوں کے ساتھ ماخذ کی درج شدہ اندراج موجود ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON کنفیگریشن فائلیں درست طور پر پارس ہوتی ہیں اور repo کے لنٹ قواعد پر پوری اترتی ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | TypeScript کمپائلیشن بغیر کسی خرابی کے (صرف مشاورتی انتباہات)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ہاں                                     |
| `typecheck:noimplicit:core`       | سخت `noImplicitAny` — مستقبل پر مرکوز؛ پہلے سے موجود بہت سے کال مقامات کو اب بھی تشریحات درکار ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **مشاورتی** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` کو `src/app/(dashboard)/**` تک محدود کرتا ہے (#7033) — `typecheck:core` کی منتخب کردہ 27 فائلوں کی اجازت فہرست میں کوئی dashboard TSX شامل نہیں ہے، اور `next build` بھی کبھی اس کی ٹائپ چیکنگ نہیں کرتا (`next.config.mjs` میں `ignoreBuildErrors: true` مقرر ہے)، لہٰذا وہاں orphaned-identifier کی رجریشنز (#6625/#6909) CI کو نظر نہیں آتی تھیں۔ ایک منجمد، فی فائل/فی TS کوڈ تعداد کی baseline (`config/quality/dashboard-typecheck-baseline.json`، وہی stale-enforcement طرز جو `check:known-symbols` میں ہے) کے مقابلے میں فرق دیکھتا ہے — صرف baseline تعداد سے زیادہ نئی خرابیاں gate کو ناکام کرتی ہیں؛ جب پہلے سے موجود خرابی درست ہو جائے تو `--update` کے ساتھ حد کو کم کریں۔                                                                                                                                                                                                                                                  | ہاں                                     |

### جاب: `quality-gate`

`test-coverage` کے بعد چلتی ہے۔ ناکامی کی صورت میں merge کو روکتی ہے۔

| اسکرپٹ                       | توثیق                                                                                                                                                                                     | لازمی                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `quality:collect`            | `quality-metrics.json` بناتا ہے (ESLint انتباہات کی تعداد، ضم شدہ shard رپورٹ سے coverage)                                                                                                | ہاں (ratchet سے پہلے) |
| `quality:ratchet`            | `quality-baseline.json` میں ہر metric کی حالت خراب نہیں ہوئی (ESLint انتباہات ≤ baseline؛ coverage ≥ baseline)                                                                            | ہاں                   |
| `check:duplication`          | کوڈ کی نقل (jscpd@4)، `quality-baseline.json` میں baseline سے زیادہ نہیں ہے                                                                                                               | ہاں                   |
| `check:complexity`           | فائل کی سطح پر cyclomatic complexity مقررہ حد سے زیادہ نہیں ہے (بنیادی ESLint `complexity` + `max-lines-per-function`)                                                                    | ہاں                   |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — علیحدہ ESLint مرحلہ؛ CI دونوں کو ضم کر کے واحد `check:complexity-ratchets` مرحلے کے طور پر چلاتا ہے                              | ہاں                   |
| `check:dead-code`            | غیر استعمال شدہ exports / فائلوں کا ratchet (knip)، baseline کے مقابلے میں خراب نہیں ہوا                                                                                                  | ہاں                   |
| `check:compression-budget`   | Compression benchmark کا بجٹ — فی engine token-savings کی کم از کم حدود میں کمی نہیں ہونی چاہیے                                                                                           | ہاں                   |
| `check:type-coverage`        | ٹائپ شدہ فیصد کا ratchet (`type-coverage`) خراب نہیں ہوا؛ بڑی حد تک `typecheck:noimplicit:core` کا احاطہ کرتا ہے                                                                          | ہاں                   |
| `check:codeql-ratchet`       | کھلے CodeQL alerts کی تعداد میں اضافہ نہیں ہوا (`gh api` کے ذریعے پڑھتا ہے؛ token کے بغیر بخوبی skip کرتا ہے) — refresh کی تکرار اور دستی trigger کے لیے: ذیل میں "CodeQL ratchet" دیکھیں | ہاں                   |

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

### جاب: `docs-sync-strict`

`main` یا `release/**` کی طرف جانے والی pull requests کے لیے یہ جاب صرف ان امیدواروں پر چلتی ہے جو ڈرافٹ نہیں ہیں (یا قابلِ اعتماد قطار میں ہیں) اور دستاویزات یا کوڈ کی تبدیلیوں کے طور پر درجہ بند ہیں۔ یہ PR کے علاوہ CI کے دیگر واقعات پر بھی چلتی ہے؛ اس ورک فلو کا push ٹرگر صرف `main` کا احاطہ کرتا ہے، `release/**` کا نہیں۔ ایسا مرحلہ جو غیر صفر ایگزٹ کوڈ کے ساتھ ختم ہو، جاب کو روکتا ہے؛ صرف رپورٹ کیے جانے والے نتائج اور ذیل میں درج استثنا اسے نہیں روکتے۔

| اسکرپٹ                         | توثیق                                                                                                                                                                                                                                                                                                      | بلاکنگ                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | میٹا گیٹ جو ذیل کے 7 ذیلی گیٹس کو یکے بعد دیگرے چلاتا ہے                                                                                                                                                                                                                                                   | ہاں                                                                                                            |
| ↳ `check:docs-sync`            | پیکیج/OpenAPI/CHANGELOG کے ورژنز کی مطابقت، `llm.txt` کی بالکل مطابق آئینہ نقول، ترجمہ شدہ CHANGELOG کے حصوں اور حجم کے غیر متبدل اصول، اور ایسی نقل شدہ دستاویزات کی عدم موجودگی جن کی جگہ دوسری دستاویزات لے چکی ہیں                                                                                     | ہاں                                                                                                            |
| ↳ `check:docs-frontmatter`     | کمپائل شدہ دستاویزی صفحات میں درست فرنٹ میٹر عنوانات موجود ہوتے ہیں                                                                                                                                                                                                                                        | ہاں                                                                                                            |
| ↳ `check:docs-counts`          | زیادہ اعتماد والے شمار کے غیر متبدل اصول سختی سے نافذ ہوتے ہیں؛ فائلوں کی تعداد کی تخمینی جانچیں صرف تنبیہ کرتی ہیں، الا یہ کہ اسکرپٹ کو `--strict` دیا جائے (CI کا میٹا گیٹ یہ فلیگ نہیں دیتا)                                                                                                            | سخت درجہ روکتا ہے؛ نرم درجہ مشاورتی ہے                                                                         |
| ↳ `check:env-doc-sync`         | نظرانداز کیے جانے والے، صرف دستاویزات میں موجود، اور صرف ماحول میں موجود عناصر کی واضح استثنائی فہرستیں لاگو کرنے کے بعد، ماخذ کوڈ میں پڑھے جانے والے ماحولیاتی متغیرات، `.env.example` اور `docs/reference/ENVIRONMENT.md` باہم مطابقت رکھتے ہیں                                                          | ہاں، دستاویزات میں درج استثنائی فہرستوں سے باہر                                                                |
| ↳ `check:deprecated-versions`  | محفوظ تاریخی سیاق و سباق سے باہر ممکنہ طور پر پرانے ورژنز اور پرانی اپ ڈیٹ تاریخوں کی رپورٹ دیتا ہے، جبکہ نظرانداز کردہ دستاویزات کو خارج کرتا ہے                                                                                                                                                          | CI کی موجودہ ترتیب میں مشاورتی (`--strict` نہیں دیا جاتا)                                                      |
| ↳ `check:doc-links`            | دستاویزات میں داخلی markdown لنکس حقیقی فائلوں تک پہنچتے ہیں (`[text]`/`(path)` فارم)                                                                                                                                                                                                                      | ہاں                                                                                                            |
| ↳ `check:fabricated-docs`      | دستاویزات میں مذکور routes، env vars، CLI commands، hook names اور file paths کوڈ بیس میں موجود ہیں۔ `--strict` کے ذریعے سخت گیٹ؛ فلیگ کے بغیر نرم ناکامی۔                                                                                                                                                 | ہاں (CI میں `--strict` کے ذریعے)                                                                               |
| `check:cli-i18n`               | CLI میں استعمال ہونے والی `t()` کلیدیں `en` میں موجود ہیں؛ `pt-BR` ہر اعلیٰ سطح کے حصے کو برقرار رکھتا ہے؛ `zh-CN` اور `zh-TW` میں `en` کی ہر کلید موجود ہے                                                                                                                                                | ہاں                                                                                                            |
| `check:openapi-coverage`       | OpenAPI spec حقیقی routes کی کم از کم ratcheted حد کا احاطہ کرتی ہے                                                                                                                                                                                                                                        | ہاں                                                                                                            |
| `check:openapi-security-tiers` | اعلان کردہ `x-loopback-only`/`x-always-protected` تشریحات کی تائید `routeGuard.ts` سے ہونی چاہیے؛ پارسر کی غلطیاں اور آگے کی سمت جانچ میں عدم مطابقت روکتی ہے۔ صرف مقامی رسائی والے سابقوں کے تحت غائب `x-loopback-only` کی الٹی جانچ تنبیہ کرتی ہے، اور صرف پیٹرن سے متعین روٹس اس الٹی جانچ سے خارج ہیں۔ | پارسر/آگے کی سمت جانچیں روکتی ہیں؛ الٹی جانچ مشاورتی ہے                                                        |
| `check:openapi-routes`         | جواز کے ساتھ درج `KNOWN_STALE_SPEC` استثنائی فہرست لاگو کرنے کے بعد، `openapi.yaml` میں ہر `/api...` پاتھ پیرامیٹرز کے فرق سے قطع نظر حقیقی روٹ سے مطابقت رکھتا ہے؛ استثنائی فہرست کے پرانے اندراجات بھی ناکامی کا باعث بنتے ہیں                                                                           | ہاں                                                                                                            |
| `check:docs-symbols`           | ایسی مستند بنیادی دستاویزات میں جو آئینہ نقول نہیں ہیں، اندرونی `/api/...` URL حوالے حقیقی روٹ یا روٹس کے خاندان سے مطابقت رکھتے ہیں؛ پراکسی/اپ اسٹریم/پلیس ہولڈر/فائل کے حوالے اور جواز والے `KNOWN_STALE_DOC_REFS` اندراجات خارج ہیں، اور استثنائی فہرست کے پرانے اندراجات ناکامی کا باعث بنتے ہیں       | ہاں                                                                                                            |
| `i18n translation drift`       | بنیادی ترجمہ شدہ دستاویزات کے ماخذ/ہدف ہیش `.i18n-state.json` سے مطابقت رکھتے ہیں۔ PR صرف نئی متعارف کردہ ماخذ کی عدم مطابقت، غائب ہدف یا ہدف ہیش کی عدم مطابقت پر ناکام ہوتے ہیں؛ PR کے علاوہ جانچیں سخت ہیں۔ PR میں وراثت میں ملی عدم مطابقت اور پرانے اہداف کے ماخذ ہیش تنبیہات ہیں۔                    | PR کی نئی عدم مطابقت اور PR کے علاوہ سخت جانچوں کی عدم مطابقت روکتی ہے؛ وراثت میں ملی/پرانی صورتیں مشاورتی ہیں |

`docs/diagrams/` کے تحت README کی بارہ SVG فائلیں `scripts/docs/gen-readme-<name>.mjs` سے بنائی جاتی ہیں؛ `npm run docs:readme-diagrams` ان سب کو دوبارہ بناتا ہے۔
ہر فائل کا بائٹ بہ بائٹ موازنہ کرنے والا یونٹ ٹیسٹ ہے (`tests/unit/docs/readme-*-svg.test.ts`، `test-unit` جاب)، جو ریپوزٹری میں کمیٹ کی گئی فائل پرانی ہونے پر ناکام ہوتا ہے۔
`check:docs-counts` ان کے `<text>` نوڈز سے مستند اعداد پڑھتا ہے، اسی لیے اعداد کو کبھی آؤٹ لائن پاتھ میں تبدیل نہیں کیا جاتا۔
SVG کے مستند اعداد کی جانچ `SVG_DIAGRAM_FILES` میں (`scripts/check/check-docs-counts-sync.mjs`) درج فائلیں پڑھتی ہے: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`۔
ہمیشہ مفت فراہم کنندگان، کیٹلاگ اندراجات، بار بار تجدید ہونے والے پولز اور اسکورنگ عوامل کے دعووں کی جانچ بھی `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` پڑھتی ہے۔
`free-tier-budget.svg` موجودہ کیٹلاگ لوڈر سے اعداد لیتا ہے، اس لیے `FREE_MODEL_BUDGETS` یا کسی فراہم کنندہ کے نمائشی نام میں تبدیلی CI کو اس وقت تک ناکام کرتی ہے جب تک وہ فائل دوبارہ نہ بنائی جائے۔

### جاب: `i18n-ui-coverage`

| اسکرپٹ                              | توثیق                                                                                                                                                                            | مسدود کنندہ |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (اِن لائن) | UI i18n کلیدوں کی کوریج ≥ 65% ہے                                                                                                                                                 | ہاں         |
| `check-ui-value-drift` (اِن لائن)   | دوبارہ لکھی گئی انگریزی **قدر** اپنے پیچھے کوئی فرسودہ ترجمہ نہیں چھوڑتی                                                                                                         | ہاں         |
| `check-new-key-coverage` (اِن لائن) | ایک **نئی** انگریزی کلید کا ہر locale میں ترجمہ موجود ہے — `__MISSING__:` مارکر مسترد کر دیا جاتا ہے                                                                             | ہاں         |
| `check-translation-ratio`           | فی locale حقیقی ترجمے کا تناسب (انگریزی سے مماثل / placeholder / allowlist سے باہر غائب leaves) `config/quality/i18n-translation-baseline.json` + slack سے تجاوز نہیں کرنا چاہیے | **مشاورتی** |

`fetch-depth: 0` درکار ہے — value-drift گیٹ `en.json` کا merge base کے مقابلے میں diff لیتا ہے۔

#### `check-ui-value-drift` — فرسودہ ترجمے کا گیٹ

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

جب base catalog پڑھا نہ جا سکے (base ref کے بغیر shallow
clone)، تو `SKIP reason=base-unresolved` کے ساتھ 0 پر exit کرتا ہے، بالکل `check-openapi-breaking` کی طرح۔

### Job: `i18n`

مکمل i18n validation matrix (ہر locale کے لیے ایک job)۔ پوری job مشاورتی ہے۔

| اسکرپٹ                          | توثیق                    | مسدود کنندہ                                         |
| ------------------------------- | ------------------------ | --------------------------------------------------- |
| `validate_translation.py quick` | فی locale ترجمے کی تکمیل | **مشاورتی** (پوری job پر `continue-on-error: true`) |

### Job: `pr-test-policy`

صرف pull requests پر چلتا ہے۔

| اسکرپٹ                 | توثیق                                                                                                                                          | مسدود کنندہ |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | وہ PRs جو `src/`، `open-sse/`، `electron/`، یا `bin/` میں production code تبدیل کرتے ہیں، لازماً tests شامل یا update کریں (سخت اصول #8)       | ہاں         |
| `check:test-masking`   | تبدیل شدہ test files خالص assert count کم نہیں کرتیں اور نہ ہی `assert.ok(true)` جیسی tautologies شامل کرتی ہیں                                | ہاں         |
| `check:pr-evidence`    | PR body میں تبدیلی کے لیے test/VPS evidence کا حوالہ موجود ہے (PR prose میں grep کر کے سخت اصول #18 کو خودکار بناتا ہے — نازک، Backlog دیکھیں) | ہاں         |

### Job: `test-vitest`

`build` کے بعد چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| مجموعہ           | توثیق کرتا ہے                                    | بلاک کرنے والا                                                                                                                        |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP سرور (110 ٹولز)، autoCombo، کیش — vitest رنر | ہاں                                                                                                                                   |
| `test:vitest:ui` | UI کمپوننٹ ٹیسٹس — vitest رنر                    | **بلاک کرنے والا** — پہلے سے موجود ناکامیاں `vitest.config.ts` میں واضح طور پر خارج کی گئی ہیں؛ نئی ناکامیاں جاب کو ناکام کر دیتی ہیں |

### رات کے ورک فلوز (شیڈول شدہ، مشاورتی)

یہ cron شیڈول (اور `workflow_dispatch`) پر چلتے ہیں، PRs پر کبھی نہیں۔ یہ سب مشاورتی ہیں۔

| ورک فلو                | توثیق کرتا ہے                                                                                                                                                                     | بلاک کرنے والا |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | بے ترتیب سیڈ اور زیادہ رن تعداد کے ساتھ fast-check پراپرٹی ٹیسٹس                                                                                                                  | **مشاورتی**    |
| `nightly-resilience`   | ہیپ میں اضافے کا گیٹ، chaos فالٹ انجیکشن، k6 لوڈ/سوک                                                                                                                              | **مشاورتی**    |
| `nightly-llm-security` | promptfoo انجیکشن گارڈ (بلاک موڈ) + garak پروبز (فراہم کنندہ کا سیکرٹ نہ ہونے پر چھوڑ دیے جاتے ہیں)                                                                               | **مشاورتی**    |
| `nightly-schemathesis` | `docs/openapi.yaml` استعمال کرتے ہوئے فعال OmniRoute کے خلاف OpenAPI کنٹریکٹ فزنگ (schemathesis) — اسپیک کی خلاف ورزیاں / غیر سنبھالی گئی 500 خرابیاں سامنے لاتا ہے (مرحلہ 8 B.4) | **مشاورتی**    |
| `nightly-mutation`     | تیز یونٹ لین پر Stryker میوٹیشن ٹیسٹنگ اسکور — باقی رہ جانے والے میوٹنٹس کمزور assertions کو ظاہر کرتے ہیں                                                                        | **مشاورتی**    |
| `nightly-compat`       | تعاون یافتہ `engines.node` رینجز میں Node انجن کی مطابقت کا میٹرکس                                                                                                                | **مشاورتی**    |

کارکردگی کی بنیادی قدریں (ہیپ، TTFB، بلڈ ٹائم) ریکارڈ کی جاتی ہیں، گیٹ نہیں کی جاتیں: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) دیکھیں (`npm run perf:lts-baseline`)۔

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
- **مشاورتی** — عالمی مجموعہ بمقابلہ منجمد بنیادی حد۔ وراثت میں ملنے والا انحراف کبھی کسی بے قصور PR کو ناکام نہیں کرتا؛
  ریلیز مفاہمت کے وقت انحراف دوبارہ منجمد کیا جاتا ہے اور headroom جاب اس کی نگرانی کرتا ہے۔

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
2. `package.json` میں `"check:<name>": "node scripts/check/check-<name>.mjs"` شامل کریں۔
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
