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

CI اور کوالٹی گیٹس کے ورک فلو سے ہر ایک ایک مستحکم فیصلے کا اخراج کرتا ہے: `Gate / CI` اور `Gate / Quality`۔ ان کی ورژن شدہ داخلہ پالیسی ہر اپ اسٹریم ملازمت کو ضرورت یا مشورے کے مطابق شمار کرتی ہے۔ ایک قابل اطلاق مطلوبہ کام کامیاب ہونا چاہیے: غائب، منسوخ، نظر انداز، زیر التواء اور نامعلوم نتائج PASS قائم نہیں کر سکتے۔ ایک درست دستاویزات صرف یا صرف کیٹلاگ کی درجہ بندی ایک کوڈ لین کو ناقابل اطلاق بنا سکتی ہے۔ ایک مسودہ PR قبول شدہ امیدوار نہیں ہے۔ `hotfix` لیبل ثبوت سے دستبردار نہیں ہوتا ہے۔

دونوں ورک فلوز PRs main/release شاخوں میں ڈھانپتے ہیں، `main` کی طرف دھکیلتے ہیں، دستی ڈسپیچ اور ضم کرنے والے گروپ ایونٹس۔ پش، ڈسپیچ اور ضم کرنے والے گروپ مکمل انتخاب کو چلاتے ہیں۔ `release/**` کو دھکیلنے سے وہ شروع نہیں ہوتے ہیں (2026-10-18): ہر تبدیلی نے پہلے سے ہی اپنے PR پر میٹرکس چلایا ہے اور ضم شدہ مجموعہ ریلیز-گرین کا کام ہے (`docs/ops/RUNNER_BOX.md` → ہوسٹڈ لین)۔ فورکس اور انضمام گروپ ملازمتوں کے لیے ہوسٹڈ رنرز کا استعمال کرتے ہیں جو بصورت دیگر خود میزبان رنرز کو منتخب کرتے ہیں۔ رول آؤٹ سے پہلے کافی میزبانی کی صلاحیت کی تصدیق ہونی چاہیے۔

ایک عام PR تیزی سے انتخاب چلاتا ہے۔ داخلہ پالیسی کی `full-code` اور `full-code-e2e` لین (E2E, integration , package artifact , Electron smoke , Bun SQLite, ایکو سسٹم اور پروٹوکول کلائنٹس ) صرف Mergify قطار کے مسودے پر چلتے ہیں یا مکمل طور پر چلتے ہیں: `gh workflow run ci.yml --ref <branch>`۔

ہر JSON رسید چیک آؤٹ SHA، ورک فلو چلانے اور کوشش کی نشاندہی کرتی ہے۔ CLI ایک checkout/event SHA مماثلت کو مسترد کرتا ہے۔ ورک فلو ٹیسٹ پالیسی کی رکنیت کو فیصلے کی نوکری کی `needs` فہرست سے منسلک کرتے ہیں لہذا ایک نئی یا ہٹائی گئی لین خاموشی سے غائب نہیں ہوسکتی ہے۔ رسیدیں ان کے اپنے ورک فلو کا احاطہ کرتی ہیں، نہ کہ اشاعت، تعیناتی، یا موجودہ ایڈوائزری اسکینر کے اندرونی حصے۔ برانچ رولز میں دونوں چیک ناموں کو چالو کرنا ایک الگ انتظامی تبدیلی ہے۔ ان ملازمتوں کو شامل کرنا خود ایک برانچ کی حفاظت نہیں کرتا ہے۔

### قطار کو ضم کریں۔

`queue` لیبل Mergify قطار (`.mergify.yml`) میں PR بھیجتا ہے۔ Mergify `mergify/merge-queue/` برانچ پر ایک ڈرافٹ PR کھولتا ہے، CI وہاں مکمل انتخاب چلاتا ہے، اور `Gate / CI`، `Gate / Quality` اور `Merge integrity (changelog + generated skills)` پاس ہونے پر اصل PR ضم ہو جاتا ہے۔

Mergify اپنی قطار کا خلاصہ ڈرافٹ کی تفصیل میں لکھتا ہے، اور دیگر ایپس بھی اس میں ترمیم کر سکتی ہیں۔ اس طرح کے ڈرافٹ پر ایک `pull_request` `edited` ایونٹ اپنا کنکرنسی گروپ (`-queue-edit-<run_id>`) لیتا ہے لہذا یہ ڈرافٹ کے حقیقی رن کو منسوخ نہیں کر سکتا، اور یہ گیٹ اور میٹرکس کو چھوڑ دیتا ہے۔ صرف `Merge integrity` اب بھی چلتا ہے۔ سکپڈ گیٹ جاب میں ایک مختلف چیک کا نام ہوتا ہے، کیونکہ Mergify ایک skipped `Gate / CI` ناکام چیک کے طور پر پڑھتا ہے اور PR کو dequeues کرتا ہے۔

dequeue کے بعد، ایک دھکا ہمیشہ PR کی درخواست نہیں کرتا ہے۔ اس پر `@mergifyio queue` تبصرہ کریں۔

### جامد اسکین انوینٹری

ورژن شدہ npm-alias انوینٹری اور static-scan کی رکنیت `config/quality/gate-manifest.json` میں رہتی ہے۔ اسکرپٹ کے ناموں اور `package.json` کے خلاف عین حکموں کی توثیق کرنے کے لیے `npm run check:gate-manifest` چلائیں۔ اضافہ، ہٹانا اور کمانڈ ڈرفٹ مقامی ہک اور CI میں تبدیلی کی درجہ بندی دونوں کاموں کو ناکام بنا دیتے ہیں۔ عرف ایک ورک فلو جاب، میٹرکس مثال یا ٹیسٹ کیس نہیں ہے: ان شماروں کو قابل تبادلہ کے طور پر پیش نہیں کیا جانا چاہیے۔

`npm run quality:scan -- --list` یا `npm run quality:scan:fast -- --list` استعمال کریں تاکہ منتخب کردہ عرفی ناموں کو عمل میں لائے بغیر ان کا معائنہ کریں۔ رنر این پی ایم انٹری پوائنٹ کو طلب کرتا ہے، لہذا اس کا رن ٹائم (بشمول Bun جہاں کنفیگر کیا گیا ہے) محفوظ رہتا ہے۔ مینی فیسٹ ان پروفائلز کے باہر عرفی ناموں کو ریکارڈ کرتا ہے جیسا کہ الگ سے درخواست کی گئی ہے، اور دیکھ بھال کے احکام صرف پڑھنے کے لیے اسکین پروفائلز میں منع ہیں۔

یہ پروفائلز صرف جامد اسکین کا احاطہ کرتے ہیں۔ وہ پروڈکٹ ٹیسٹ، کوریج، پیکیجنگ، بیرونی چیک یا امیدوار کی مکمل ریلیز قبولیت کی تصدیق نہیں کرتے ہیں۔ ورک فلو داخلہ منسلک `config/quality/admission-policy.json` اور `scripts/quality/admission-verdict.mjs` استعمال کرتا ہے۔ ریلیز مبصر پروفائلز الگ الگ رہتے ہیں؛ ان کے قابل اطلاق چیکوں اور رسیدوں کا آزادانہ طور پر معائنہ کریں۔ نیچے دی گئی نثر کی فہرست ایک حوالہ ہے، اس بات کا ثبوت نہیں کہ واقعی ایک گیٹ چلا۔

اسکرپٹ `scripts/check/` (پالیسی گیٹس) اور `scripts/quality/` (ریچیٹ انجن) کے تحت رہتے ہیں۔ CI سچائی کا ذریعہ `.github/workflows/ci.yml` ہے۔

### جاری کریں PR فاسٹ پاتھ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs پر CI تکمیل کرتا ہے، `main`، ڈسپیچ اور ضم گروپوں کو دھکیلتا ہے۔ PRs پاتھ فلٹرڈ فاسٹ چیک کا استعمال کرتا ہے۔ مستقل طور پر غیر فعال ڈپلیکیٹ تعمیر کو ہٹا دیا گیا تھا۔ اصلی build/package/boot چیک CI میں ہی رہتے ہیں۔ یونٹ سویٹ اور ویٹسٹ صرف CI (`Unit Tests (N/8)` اور `Vitest`) میں چلتے ہیں۔

| جاب                                              | دائرہ کار                                                                                          | بلاک کرنا          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs اور docs-all                                                          | جی ہاں             |
| `Fast Quality Gates`                             | کوڈ PRs; جامد چیک، ٹائپ چیک، ڈیش بورڈ ٹائپ چیک، متاثرہ یونٹ ٹیسٹ، بھولے ہوئے بھائی کے ٹیسٹ (مشورہ) |
| `No new ESLint warnings`                         | کوڈ PRs; دبانے سے آگاہ لنٹ گارڈ                                                                    | جی ہاں، کانٹے سمیت |
| `Merge integrity (changelog + generated skills)` | غیر مسودہ PRs; چینج لاگ اور جنریٹڈ اسکل سنک                                                        | جی ہاں، کانٹے سمیت |

#### بھولے بھائی کے ٹیسٹ رپورٹ

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` کے ایک مشاورتی قدم کے طور پر چلتا ہے اور ٹیسٹ-امپیکٹ میپ کے پیچھے امپورٹ ریزولور کو دوبارہ استعمال کرتا ہے۔ ہر تبدیل شدہ پروڈکشن ماڈیول کے لیے، جب امیدوار ٹیسٹ پل-ریکوسٹ ڈِف سے غیر حاضر ہوتا ہے تو یہ ڈیٹرمنسٹک `changed module/symbol -> static consumer -> candidate sibling test` چینز کی اطلاع دیتا ہے۔ مارک ڈاؤن کا خلاصہ اور JSON نتیجہ کسی بھی بلاکنگ رول آؤٹ سے پہلے کیلیبریشن کے لیے `forgotten-sibling-tests` ورک فلو آرٹفیکٹ کے طور پر برقرار رکھا جاتا ہے۔

بیرل کی دوبارہ برآمدات اور متحرک درآمدات صرف قرارداد کی تشخیص ہیں۔ وہ کبھی بھی بلاکنگ فائنڈنگ نہیں بناتے ہیں۔ جائزہ لیا مستثنیات `config/quality/forgotten-sibling-allowlist.json` میں رہتے ہیں۔ ہر اندراج کے لیے صارف اور امیدوار کے ٹیسٹ کا نام ہونا چاہیے، ایک مخصوص دلیل دینا چاہیے، اور GitHub ایشو کو لنک کرنا چاہیے یا پل کی درخواست دینا چاہیے۔ غلط اندراجات ناکام ہو گئے بند ہو گئے۔ مستثنیات حذف شدہ امیدوار ٹیسٹ یا `.skip`/`.todo` کو شامل کرنے والے فرق کو دبا نہیں سکتے۔ دعوی کو کمزور کرنا اور دیگر ماسکنگ آزادانہ طور پر بلاک کرنے والے `check:test-masking` گیٹ کی ملکیت رہتی ہے۔

### ملازمت: `lint`

ہر PR سے `main` پر چلتا ہے۔ ناکامی پر بلاکس مل جاتے ہیں۔

| اسکرپٹ (`npm run ...`)            | تصدیق کرتا ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | بلاک کرنا                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js ورژن تعاون یافتہ رینج کے اندر ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | جی ہاں                                    |
| `check:cycles`                    | تمام `src/` + `open-sse/` میں سرکلر درآمدات (AST پر مبنی، tsconfig `paths` حل شدہ)۔ جب بھی کوئی سائیکل موجود ہو تو 1 سے باہر نکلتا ہے ( #15281 کے بعد سے ناکام بند) اور SCCs کی فہرست دیتا ہے۔ `check:cycles:ratchet` (کیا CI چلتا ہے) بلاک ہوجاتا ہے جب `quality-baseline.json` — میں گنتی `metrics.cycles` حد سے بڑھ جاتی ہے فی الحال 14, `direction: down`، لہذا یہ صرف گر سکتا ہے (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ہاں (شخص)                                 |
| `check:boundary`                  | `open-sse → src` کپلنگ: ایپ میں انجن سے فائل سے فائل کی منفرد درآمدات (`scripts/quality/measure-boundary.mjs`؛ ایج لسٹ v4 core/module-split remediation backlog ہے)۔ بیئر = ایڈوائزری رپورٹ ( `quality:boundary` کی طرح)۔ `check:boundary:ratchet` (کیا CI چلتا ہے، `quality.yml` فاسٹ گیٹس ریچیٹ لوپ میں بھی) بلاک کرتا ہے جب گنتی `quality-baseline.json` — میں `metrics.boundaryOpenSseToSrc` حد سے تجاوز کر جاتی ہے جس کی پیمائش 771، `direction: down` پر ہوتی ہے۔ `--update` صرف اسے کم کرتا ہے۔ PRs پر بنیادی رشتہ دار (`--base-ref`، نیچے دیکھیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں (شخص)                                 |
| `check:route-validation:t06`      | Zod اسکیما تمام راستوں پر موجود ہیں (ٹائیر 6 پالیسی)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | جی ہاں                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` تعداد بجٹ سے زیادہ نہیں ہے (ٹیر 11 کیٹراکا)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | جی ہاں                                    |
| `check:provider-consistency`      | `providers.ts` میں ہر فراہم کنندہ کے پاس `providerRegistry.ts` میں ایک مماثل اندراج ہے (اور اس کے برعکس، اجازت دی گئی فہرست میں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | جی ہاں                                    |
| `check:model-lifecycle`           | تین ہاتھ سے دیکھ بھال کرنے والی روٹنگ ٹیبلز چیک ان لائف سائیکل اسنیپ شاٹ (#11503) کے ساتھ مطابقت رکھتی ہیں : `FITNESS_TABLE` (`taskFitness.ts`) اسکور کوئی ریٹائرڈ آئی ڈی نہیں ہے جسے `REGISTRY` روٹ کر سکتا ہے۔ ہر `BUILT_IN_ALIASES` ہدف `REGISTRY` میں موجود ہے اور ریٹائرڈ آئی ڈی اسنیپ شاٹ سے غائب ہے۔ `REGISTRY` میں موجود ہر ریٹائرڈ آئی ڈی کو فارورڈ یا `allowedRetiredInCatalog` میں درج کیا جاتا ہے؛ اور اس سنیپ شاٹ میں کوئی `DEFAULT_DEGRADATION_MAP` سورس یا ہدف ریٹائرڈ نظر نہیں آتا۔ اس سے یہ ثابت نہیں ہوتا ہے کہ فی الحال کسی ماڈل کو لائیو اپ اسٹریم کے ذریعے پیش کیا جاتا ہے۔ آف لائن — کا موازنہ `config/quality/model-lifecycle.json` سے ہوتا ہے، `npm run quality:refresh-model-lifecycle` کے ساتھ ہاتھ سے تازہ کیا جاتا ہے (نیٹ ورک؛ CI میں وائرڈ نہیں ہوتا)۔ `allowedRetiredInCatalog` ایک برن ڈاؤن ریچیٹ ہے: صرف ٹریکنگ ایشو کے ساتھ اندراج شامل کریں۔                                                                                                                                  | جی ہاں                                    |
| `check:fetch-targets`             | کلائنٹ سائڈ `src/` میں ہر `fetch("/api/...")` حقیقی `route.ts` پر حل کرتا ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | جی ہاں                                    |
| `check:deps`                      | ریپو میں ہر `package.json` کے تمام `npm install` -able ڈیپس `dependency-allowlist.json` میں ہیں؛ نئے ان پن یا ڈھلوان والے پیکجز کو جھنڈا لگا دیا گیا ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | جی ہاں                                    |
| `audit:deps`                      | `npm audit` (root + electron) — no high/critical ایڈوائزریز (overlaps osv `check:vuln-ratchet`؛ ریشنلائزیشن بیکلاگ دیکھیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | جی ہاں                                    |
| `check:lockfile`                  | `package-lock.json` انٹیگریٹی — https رجسٹری، انٹیگریٹی ہیشز، کوئی میزبان اوور رائیڈز نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | جی ہاں                                    |
| `check:licenses`                  | پیداوار کے انحصار کے لیے SPDX لائسنس کی اجازت کی فہرست                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | جی ہاں                                    |
| `check:tracked-artifacts`         | کوئی تعمیراتی نمونے / کمٹڈ `node_modules` symlinks نہیں (ہسکی پری کمٹ میں بھی چلتا ہے؛ پری پش جان بوجھ کر ہلکا ہے — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | جی ہاں                                    |
| `check:ai-attribution`            | PR کمٹ، ٹائٹل یا باڈی — ہارڈ رول #16 میں کوئی AI/bot `Co-Authored-By` ٹریلر یا AI- جنریشن فوٹر نہیں ہے ( PR→ `release/**` — کے لیے `quality.yml` فاسٹ `commit-msg` لوپ میں ایونٹ کا پے لوڈ پڑھتا ہے، no-op off PRs — → `ci.yml` PR `main` شریک مصنفین کی بھی اجازت ہے #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | ہر Vitest اخراج ایک ٹریکنگ ایشو کا نام دیتا ہے اور `config/quality/vitest-exclusions.json` (#13204) میں ظاہر ہوتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | جی ہاں                                    |
| `check:file-size`                 | سورس فائلز (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` کے اندر رہتی ہیں اور ٹیسٹ فائلیں (`*.test.ts(x)`) `testCap` کے اندر ; `file-size-baseline.json` (`frozen` / `testFrozen`) میں منجمد فائلوں کو ان کے ریکارڈ شدہ سائز سے آگے نہیں بڑھنا چاہئے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | جی ہاں                                    |
| `check:error-helper`              | executors/handlers میں خرابی کے جوابات `buildErrorBody()` / `sanitizeErrorMessage()` استعمال کرتے ہیں (سخت اصول #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | جی ہاں                                    |
| `check:migration-numbering`       | منتقلی SQL فائلوں کو ترتیب وار نمبر دیا گیا ہے، کوئی خلا یا نقل نہیں ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | جی ہاں                                    |
| `check:public-creds`              | `publicCreds.ts` باہر کوئی لفظی OAuth `client_id`/`client_secret` یا Firebase ویب کیز نہیں ہیں (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | جی ہاں                                    |
| `check:db-rules`                  | `src/lib/db/` ماڈیولز کے باہر کوئی خام SQL نہیں؛ `localDb.ts` سے کوئی بیرل درآمد نہیں (ہارڈ رولز #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | جی ہاں                                    |
| `check:known-symbols`             | پرووائیڈر ایگزیکیوٹرز، روٹنگ کی حکمت عملی، اور ٹرانسلیٹر ان کے ڈسپیچ ٹیبلز میں رجسٹرڈ ڈسک — پر موجود فائلوں سے مماثل نہیں ہیں کوئی یتیم یا غیر اعلانیہ علامتیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | جی ہاں                                    |
| `check:route-guard-membership`    | ہر وہ راستہ جو بچے کے عمل کو جنم دیتا ہے `isLocalOnlyPath()` (سخت اصول #15/#17) کے ذریعہ درجہ بندی کیا جاتا ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | جی ہاں                                    |
| `check:test-discovery`            | ریپو میں ہر `*.test.ts` / `*.spec.ts` فائل کم از کم ایک ٹیسٹ رنر کے ذریعہ جمع کی جاتی ہے (ratchet: `test-discovery-baseline.json` میں یتیم کی فہرست صرف سکڑ سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | جی ہاں                                    |
| `check:test-tla-order`            | `tests/unit` کے تحت کوئی `node:test` فائل ٹیسٹ کا اندراج نہیں کرتی، ایک اعلیٰ سطحی `await` سے ٹکراتی ہے، پھر مزید رجسٹر کرتی ہے (#18045؛ ratchet: `test-tla-order-allowlist.json` صرف سکڑ سکتا ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | جی ہاں                                    |
| `check:agent-skills-sync`         | تیار کردہ ایجنٹ کی مہارت کے نمونے ان کے ماخذ کیٹلاگ سے ملتے ہیں (کوئی بہاؤ نہیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | فراہم کنندہ logos/assets ایک ریکارڈ شدہ پرووینس اندراج رکھتا ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON config فائلوں کو پارس کرتی ہے اور ریپو لنٹ کے قواعد کو پورا کرتی ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | غلطیوں کے بغیر TypeScript تالیف (صرف مشاورتی انتباہات)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | جی ہاں                                    |
| `typecheck:noimplicit:core`       | سخت `noImplicitAny` — آگے نظر; بہت سی پہلے سے موجود کال سائٹس کو اب بھی تشریحات کی ضرورت ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **ایڈوائزری** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` اسکوپ ٹو `src/app/(dashboard)/**` (#7033) — `typecheck:core` کی کیوریٹڈ 27 فائل کی اجازت دینے والی فہرست میں کوئی بھی ڈیش بورڈ TSX شامل نہیں ہے، اور `next build` اسے کبھی بھی ٹائپ نہیں کرتا ہے یا تو (`next.config.mjs` سیٹ کرتا ہے `ignoreBuildErrors: true`)، اس لیے وہاں یتیم شناخت کنندہ ریگریشنز (#6625/#6909 to CI) ایک منجمد per-file/per-TS-code کاؤنٹ بیس لائن کے خلاف فرق (`config/quality/dashboard-typecheck-baseline.json`، `check:known-symbols` جیسا باسی نافذ کرنے والا پیٹرن ) — صرف NEW غلطیاں بیس لائن کی گنتی سے آگے گیٹ کو ناکام بناتی ہیں۔ پہلے سے موجود غلطی کو ٹھیک ہونے پر `--update` کے ساتھ ratchet down کریں۔                                                                                                                                                                                                                                                                                                                                                                | جی ہاں                                    |
| `check:build-typecheck`           | پوری ایپ پروڈکشن کی قسم چیک اوور `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) کی سطح `typecheck:core` کی 27 فائل کی اجازت دینے والی فہرست اور ڈیش بورڈ گیٹ کا احاطہ نہیں کرتا ہے۔ `config/quality/build-typecheck-baseline.json` خلاف اختلاف؛ ایک نئی یا بڑھائی گئی فی (فائل، کوڈ) کی گنتی ناکام ہو جاتی ہے، کم گنتی آپ سے شائستگی کے لیے کہتی ہے۔ `--update` انکار کرتا ہے جب تک کہ رن میں ایک نیا یا اٹھایا ہوا جوڑا شامل ہوتا ہے جب تک کہ `--force-regressions` کو پاس نہیں کیا جاتا ہے، اور ایک نئی خاموش فائل سے انکار کرتا ہے جب تک کہ `--force-nocheck` کو پاس نہیں کیا جاتا ہے، لہذا سبز ہونے کے لئے بیس لائن کو وسیع کرنا اور مستقل خاموشی دینا دو الگ الگ جان بوجھ کر کام ہیں۔ ایک ننگی `--force` مسترد کر دیا جاتا ہے. `config/quality/ts-nocheck-baseline.json` کے خلاف `@ts-nocheck` کی تعمیر کی گنجائش کو بھی اسکین کرتا ہے، کیونکہ اس کا استعمال کرنے والی فائل کسی بھی طرح کی تشخیص کی اطلاع نہیں دیتی ہے اور بصورت دیگر ہر گیٹ پر پوشیدہ ہوگی۔ | جی ہاں                                    |

#### دو ٹائپ چیک پروگرام مختلف طریقے سے جواب دیتے ہیں۔

`typecheck:core` اور `check:build-typecheck` مختلف آپشنز کے تحت مختلف پروگراموں کو مرتب کرتے ہیں، اور ایک ہی فائل ایک میں صاف اور دوسری میں غلطیوں سے بھری ہوسکتی ہے۔

`tsconfig.build.json` سیٹ کرتا ہے `"strict": false`، تو `noImplicitAny` آف ہے۔ بنیادی تشکیل سخت اختیارات کے ساتھ ایک کیوریٹڈ 27 فائل کی اجازت کی فہرست مرتب کرتی ہے اور ہر اندراج کے درآمدی گراف کی پیروی کرتی ہے، لہذا وہ فائلیں جو کبھی بھی تعمیراتی پروگرام میں ظاہر نہیں ہوتی ہیں ان کی جانچ پڑتال کی جاتی ہے۔

یہ فیصلہ کرتے وقت نتیجہ اہمیت رکھتا ہے کہ آیا فائل ٹائپ کی گئی ہے:** `check:build-typecheck` کے تحت صفر کی تشخیص کا مطلب صفر نہیں ہے۔** . 26 فائلوں سے `@ts-nocheck` ہٹانے سے ان میں سے 23 کو بلڈ پروگرام میں صاف دکھایا گیا۔ ان میں سے سولہ میں تقریباً 120 مضمر غلطیاں سامنے آئیں۔ فائل کو صاف کرنے سے پہلے دونوں کو چیک کریں۔

### ملازمت: `quality-gate`

`test-coverage` کے پیچھے بھاگتا ہے۔ ناکامی پر بلاکس مل جاتے ہیں۔

| اسکرپٹ                       | تصدیق کرتا ہے۔                                                                                                                                                  | بلاک کرنا                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Emits `quality-metrics.json` (ESLint وارننگ شمار، ضم شدہ شارڈ رپورٹ سے کوریج)                                                                                   | ہاں (شخص کے اوپر کی طرف) |
| `quality:ratchet`            | `quality-baseline.json` میں ہر میٹرک پیچھے نہیں گیا ہے (ESLint وارننگز ≤ بیس لائن؛ کوریج ≥ بیس لائن)                                                            | جی ہاں                   |
| `check:duplication`          | کوڈ کی نقل (jscpd@4) `quality-baseline.json` میں بیس لائن سے زیادہ نہیں ہے۔                                                                                     | جی ہاں                   |
| `check:complexity`           | فائل کی سطح کی سائکلومیٹک پیچیدگی کیپ سے زیادہ نہیں ہے (کور ESLint `complexity` + `max-lines-per-function`)                                                     | جی ہاں                   |
| `check:cognitive-complexity` | سنجشتھاناتمک پیچیدگی شافٹ (`eslint-plugin-sonarjs`) — علیحدہ ESLint پاس؛ CI دونوں کو سنگل `check:complexity-ratchets` قدم کے طور پر ضم کر دیتا ہے۔              | جی ہاں                   |
| `check:dead-code`            | غیر استعمال شدہ برآمدات / فائلوں کا شارٹ (نیپ) بیس لائن کے مقابلے میں پیچھے نہیں ہٹتا ہے۔                                                                       | جی ہاں                   |
| `check:compression-budget`   | کمپریشن بینچ مارک بجٹ — فی انجن ٹوکن سیونگ فلورز کو پیچھے نہیں ہٹنا چاہیے۔                                                                                      | جی ہاں                   |
| `check:type-coverage`        | فیصد ٹائپ شدہ شافٹ (`type-coverage`) پیچھے نہیں ہٹتا ہے۔ بڑی حد تک `typecheck:noimplicit:core` کو شامل کرتا ہے۔                                                 | جی ہاں                   |
| `check:codeql-ratchet`       | اوپن CodeQL الرٹ کاؤنٹ پیچھے نہیں ہٹتا ہے ( `gh api` کے ذریعے پڑھتا ہے؛ ٹوکن کے بغیر گریسفل اسکپ) — ریفریش کیڈینس اور مینوئل ٹرگر: نیچے "CodeQL ratchet" دیکھیں | جی ہاں                   |

### ملازمت: `quality-extended`

پورا کام مشاورتی ہے (`continue-on-error: true`)۔ npm پر مبنی ratchets اصلی کے لیے چلتے ہیں۔ بیرونی اسکینرز `gh release download` کے ذریعے انسٹال ہوتے ہیں اور سیلف اسکپ (ایگزٹ 0) کے ذریعے جب بائنری ابھی تک غیر موجود ہوتی ہے۔

| اسکرپٹ                   | تصدیق کرتا ہے۔                                                                                                                                                                                        | بلاک کرنا                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | کوئی سرکلر انحصار نہیں (dpdm)                                                                                                                                                                         | **ایڈوائزری**                                       |
| `check:bundle-size`      | بنڈل کا سائز ٹوپی سے زیادہ نہیں ہے۔                                                                                                                                                                   | **ایڈوائزری**                                       |
| `check:secrets`          | خفیہ اسکیننگ (gitleaks) — اگر بائنری غیر حاضر ہو تو چھوڑ دیتا ہے۔                                                                                                                                     | **ایڈوائزری**                                       |
| `check:vuln-ratchet`     | انحصار کی کمزوریاں (osv-scanner) اگر بائنری غیر حاضر ہوں تو — skips کو پیچھے نہیں ہٹاتے                                                                                                               | **ایڈوائزری**                                       |
| `check:workflows`        | ورک فلو لنٹ (ایکشن لِنٹ + زیزمر)؛ missing/broken سکینر، غلط رپورٹس یا لاپتہ ratchet بیس لائن INCOMPLETE کے طور پر فیل ہو جاتے ہیں۔ درست نتائج منتخب strict/advisory/ratchet پالیسی کی پیروی کرتے ہیں۔ | پھانسی کی ضرورت ہے؛ CI میں zizmor ratchet بلاک کرنا |
| `check:openapi-breaking` | عوامی API معاہدہ (`openapi.yaml`) بمقابلہ بیس برانچ ( oasdiff ) — میں تبدیلیاں `openapiBreaking=N` خارج کرتی ہیں ؛ اگر oasdiff غیر حاضر یا بنیادی قیاس ناقابل حل ہو تو اسے چھوڑ دیتا ہے۔              | **ایڈوائزری**                                       |

### ملازمت: `docs-sync-strict`

ہر PR سے `main` پر چلتا ہے۔ ناکامی پر بلاکس مل جاتے ہیں۔

| اسکرپٹ                         | تصدیق کرتا ہے۔                                                                                                                                     | بلاک کرنا                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | میٹا گیٹ جو ترتیب وار نیچے 6 ذیلی دروازے چلاتا ہے۔                                                                                                 | جی ہاں                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt ورژن کی مستقل مزاجی                                                                                                  | جی ہاں                            |
| ↳ `check:docs-counts`          | نثر میں شمار (فراہم کرنے والے کی گنتی، نقل مکانی کی گنتی، وغیرہ) حقیقی شماروں کی ریکیٹ ونڈو کے اندر ہوتے ہیں۔                                      | جی ہاں                            |
| ↳ `check:env-doc-sync`         | `.env.example` میں ہر env var کو ڈاکس ٹیبل میں دستاویز کیا جاتا ہے، اور اس کے برعکس                                                                | جی ہاں                            |
| ↳ `check:deprecated-versions`  | دستاویزات میں کوئی فرسودہ ورژن کی تاریں نہیں ہیں۔                                                                                                  | جی ہاں                            |
| ↳ `check:doc-links`            | دستاویزات میں داخلی مارک ڈاؤن لنکس اصلی فائلوں کو حل کرتے ہیں (`[text]`/`(path)` فارم)                                                             | جی ہاں                            |
| ↳ `check:fabricated-docs`      | روٹس، env vars، CLI کمانڈز، ہک کے نام، اور دستاویزات میں درج فائل پاتھ کوڈ بیس میں موجود ہیں۔ `--strict` کے ذریعے ہارڈ گیٹ؛ بغیر جھنڈے کے نرم فیل۔ | ہاں ( `--strict` میں CI کے ذریعے) |
| `check:cli-i18n`               | CLI کمانڈ سٹرنگز تمام i18n لوکل فائلوں میں موجود ہیں۔                                                                                              | جی ہاں                            |
| `check:openapi-coverage`       | OpenAPI spec کم از کم حقیقی راستوں کی ایک کھردری منزل کا احاطہ کرتا ہے۔                                                                            | جی ہاں                            |
| `check:openapi-security-tiers` | `openapi.yaml` میں حفاظتی درجے کی تشریحات `routeGuard.ts` درجہ بندی کے ساتھ مطابقت رکھتی ہیں۔                                                      | **ایڈوائزری**                     |
| `check:openapi-routes`         | `openapi.yaml` میں ہر راستہ ایک حقیقی `route.ts` (اینٹی ہیلوسینیشن) کو حل کرتا ہے                                                                  | جی ہاں                            |
| `check:docs-symbols`           | `docs/**/*.md` میں ہر `/api/...` حوالہ حقیقی `route.ts` (اینٹی ہیلوسینیشن) کو حل کرتا ہے۔                                                          | جی ہاں                            |
| `i18n translation drift`       | i18n لوکل فائلوں میں غیر ترجمہ شدہ چابیاں — صرف انتباہ کرتی ہیں۔                                                                                   | **ایڈوائزری**                     |

`docs/diagrams/` کے تحت بارہ README SVGs پیدا ہوتے ہیں (`scripts/docs/gen-readme-<name>.mjs`؛ `npm run docs:readme-diagrams` ان سب کو دوبارہ تخلیق کرتا ہے)۔ ہر ایک کا بائٹ کمپیئر یونٹ ٹیسٹ (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ہوتا ہے جو اس وقت ناکام ہو جاتا ہے جب کمٹڈ فائل باسی ہوتی ہے، اور `check:docs-counts` اپنے `<text>` نوڈس — سے کینونیکل نمبر پڑھتا ہے جس کی وجہ سے آؤٹ لائننگ سٹیپ فائل میں ہر آؤٹ لائن سٹرنگ کو پوشیدہ `<text>` کے طور پر رکھتا ہے۔ SVG کینونیکل نمبر چیک `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) میں درج فائلوں کو پڑھتا ہے: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` اور `tier-flow-light.svg`; فری-ایور، کیٹلاگ-انٹری، ریکرنگ پول اور اسکورنگ فیکٹرز کے دعوے `promise-pillars.svg`، `free-tier-budget.svg` اور `strategies-grid.svg` بھی پڑھتے ہیں۔ `free-tier-budget.svg` لائیو کیٹلاگ لوڈر سے اپنے اعداد و شمار کھینچتا ہے، لہذا `FREE_MODEL_BUDGETS` یا فراہم کنندہ کے ڈسپلے نام میں تبدیلی CI سرخ کردیتی ہے جب تک کہ اس فائل کو دوبارہ تخلیق نہ کیا جائے۔

### ملازمت: `i18n-ui-coverage`

| اسکرپٹ                             | تصدیق کرتا ہے۔                                                                                                                                                                      | بلاک کرنا     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (ان لائن) | UI i18n کلیدی کوریج ≥ 65% ہے                                                                                                                                                        | جی ہاں        |
| `check-ui-value-drift` (ان لائن)   | دوبارہ لکھی ہوئی انگریزی** قدر** کوئی باسی ترجمہ پیچھے نہیں چھوڑتا                                                                                                                  | جی ہاں        |
| `check-new-key-coverage` (ان لائن) | اے** نیا** انگریزی کلید کا ترجمہ ہر زبان میں کیا جاتا ہے — a `__MISSING__:` مارکر مسترد کر دیا جاتا ہے۔                                                                             | جی ہاں        |
| `check-translation-ratio`          | حقیقی ترجمہ کا تناسب فی لوکیل (ایک جیسی سے انگریزی / پلیس ہولڈر / اجازت کی فہرست سے باہر غائب پتے) `config/quality/i18n-translation-baseline.json` + slack سے زیادہ نہیں ہونا چاہئے | **ایڈوائزری** |

`fetch-depth: 0` — کی ضرورت ہے ویلیو ڈرفٹ گیٹ انضمام کی بنیاد کے خلاف `en.json` میں فرق کرتا ہے۔

#### `check-ui-value-drift` — باسی ترجمہ گیٹ

ایک i18n رجعت کو پکڑتا ہے جسے دوسرے دروازے ساختی طور پر نہیں دیکھ سکتے ہیں: ایک انگریزی قدر دوبارہ لکھی جاتی ہے اور _previous_انگریزی سے اخذ کردہ ترجمے پیچھے رہتے ہیں، اس لیے غیر انگریزی استعمال کنندہ اعتماد سے پڑھتے رہتے ہیں، اب غلط نقل۔

یہ اصلی کے لئے بھیج دیا گیا ہے۔ `oauthModal.googleOAuthWarning` دوبارہ لکھا گیا جب Antigravity لاگ ان مددگار اترا (#5203);** 43 میں سے 39 مقامات** آپریٹرز کو "مکمل URL کاپی کریں اور اسے نیچے — کریں" کے لیے متن کو جاری رکھا ہے جو کہ اس فراہم کنندہ کے لیے مکمل نہیں ہو سکتا۔ یہ #8463 تک کسی کا دھیان نہیں گیا کیونکہ:

- `sync-ui-keys` صرف بیک فلز چابیاں ہیں جو ہیں۔** غیر حاضر** , وہ کبھی نہیں ہیں** باسی** ;
- `check-ui-keys-coverage` کلیدی _موجودگی_ کو شمار کرتا ہے، لہذا ایک باسی ترجمہ اسکور کے طور پر احاطہ کرتا ہے؛
- `check-translation-drift` `docs/i18n/<locale>/**.md` دستاویزات کو ٹریک کرتا ہے — یہ کبھی نہیں پڑھتا `src/i18n/messages/*.json`۔ 2026-09 کی دوبارہ مطابقت پذیری کے بعد سے جاب `docs-sync-strict` میں بلاک کرنا: ایک بنیادی دستاویز → `npm run i18n:run -- --files=<doc>` میں ترمیم کریں (سیکشن لیول، سستا)۔

**اختلاف سے آگاہ، بیس لائن کی حمایت یافتہ نہیں۔** یہ کام کرنے والے درخت سے مرج بیس پر `en.json` موازنہ کرتا ہے۔ ہر اس کلید کے لیے جس کی انگریزی کی قدر بدل گئی ہے، کوئی بھی مقامی زبان جس میں ابھی تک اچھوت ترجمہ ہے وہ باسی ہے۔ یہ جان بوجھ کر** پہلے سے موجود قرض کو منجمد کرتا ہے۔** — a diff یہ ظاہر نہیں کر سکتا کہ کون سی پرانی انگریزی کا دیرینہ ترجمہ آیا ہے، اس لیے گیٹ صرف وہی فیصلہ کرتا ہے جو موجودہ تبدیلی کو چھوتی ہے۔ متبادل (ایک فی کلید ہیش بیس لائن) کی لاگت ایک ~ 600 KB فائل ہوگی، 3 × سب سے بڑی موجودہ بیس لائن، ہر i18n PR پر منتھنی۔

اسے مطمئن کرنے کے دو طریقے:

1. متاثرہ تراجم کو اپ ڈیٹ کریں، یا
2. رن ٹائم انہیں `__MISSING__:<new english>` — پر سیٹ کریں پھر درست انگریزی (`src/i18n/request.ts::deepMergeFallback`, #7258) اور ترجمے کے لیے کلیدی قطاریں پیش کریں۔

اگر تار کی** معنی** تبدیل، ترجیح** کلید کا نام تبدیل کرنا** : ایک نئی کلید باسی ترجمہ کی وارث نہیں ہو سکتی۔ یہی پیٹرن #8463 استعمال ہوتا ہے۔

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

`SKIP reason=base-unresolved` کے ساتھ 0 سے باہر نکلتا ہے جب بیس کیٹلاگ کو نہیں پڑھا جا سکتا ہے (بیس ریف کے بغیر اتلی کلون)، `check-openapi-breaking` کی عکس بندی کر رہا ہے۔

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

### ملازمت: `test-vitest`

`build` کے پیچھے بھاگتا ہے۔ ناکامی پر بلاکس مل جاتے ہیں۔

| سویٹ             | تصدیق کرتا ہے۔                                     | بلاک کرنا                                                                                                                             |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP سرور (129 ٹولز)، autoCombo، cache — vitest رنر | جی ہاں                                                                                                                                |
| `test:vitest:ui` | UI جزو — vitest رنر کا ٹیسٹ کرتا ہے۔               | **بلاک کرنا** — پہلے سے موجود ناکامیوں کو `vitest.config.ts` میں واضح طور پر خارج کر دیا گیا ہے۔ نئی ناکامیاں کام کو ناکام بناتی ہیں۔ |

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

ہر وہ گیٹ جو پہلے سے موجود خلاف ورزیوں پر ناکام نہیں ہو سکتا، ایک منجمد الاؤ لسٹ استعمال کرتا ہے
(مثلاً، `KNOWN_STALE_DOC_REFS`، `KNOWN_MISSING`، `KNOWN_RAW_SQL`)۔ پالیسی یہ ہے:

**بنیادی وجہ کو درست کریں؛ الاؤ لسٹ صرف اس وقت استعمال کریں جب خلاف ورزی پہلے سے موجود ہو اور
اسی PR میں درست نہ کی جا سکے۔**

الاؤ لسٹ میں کوئی اندراج شامل کرتے وقت:

1. جواز کے ساتھ ایک تبصرہ شامل کریں۔
2. ٹریکنگ ایشو کا حوالہ دیں (مثلاً، `// #3498 — فیز 2 کی خصوصیت، ابھی نافذ نہیں کی گئی`)۔
3. خلاف ورزی درست کرنے والے اسی PR میں اندراج ہٹا دیں — ایک فرسودہ اندراج جو اب
   کسی فعال خلاف ورزی کو نہیں دباتا، بذاتِ خود ایک نقص ہے (نافذ ہونے کے بعد 6A.3 stale-enforcement
   کسی یتیم الاؤ لسٹ اندراج پر گیٹ کو ناکام کر دے گا)۔

ٹیسٹس کو زیادہ تیزی سے پاس کرانے کے لیے الاؤ لسٹ میں اندراجات **شامل نہ کریں**۔ بڑھتی ہوئی
الاؤ لسٹ کے ساتھ سبز گیٹ معیار کا جھوٹا احساس دیتا ہے۔

### جب آپ کے PR پر کوئی گیٹ ناکام ہو

1. **گیٹ کا آؤٹ پٹ غور سے پڑھیں** — یہ آپ کو بالکل بتاتا ہے کہ کس فائل یا علامت نے
   اصول کی خلاف ورزی کی۔
2. **خلاف ورزی درست کریں** — زیادہ تر گیٹس قطعی فائل سسٹم چیکس ہیں جو کوڈ درست ہوتے ہی
   پاس ہو جاتے ہیں۔
3. **اگر خلاف ورزی پہلے سے موجود ہے** (یعنی، آپ نے اسے متعارف نہیں کرایا لیکن اب گیٹ
   اس کا احاطہ کرتا ہے): جواز کے تبصرے اور ٹریکنگ ایشو کے ساتھ الاؤ لسٹ میں ایک اندراج شامل کریں۔
4. **اگر گیٹ ratchet ہے** (کوریج، ESLint تنبیہات، تکرار، پیچیدگی):
   آپ کی تبدیلی نے میٹرک کو بدتر کر دیا ہے۔ بنیادی مسئلہ درست کریں، یا (شاذ و نادر) اگر تبدیلی
   دانستہ ہے اور میٹرک میں تنزلی قابلِ قبول ہے تو `npm run quality:ratchet -- --update`
   چلائیں — لیکن PR کی تفصیل میں وجہ درج کریں۔
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

## معقولیت سازی کا بیک لاگ (ROI جائزہ — مرحلہ 9 لہر 3)

اس فہرست کا 2026-06-17 کو `ci.yml` کے مقابل موازنہ کر کے تطبیق کی گئی (پچھلے ورژن میں
`audit:deps`، `check:tracked-artifacts`، `check:lockfile`، `check:licenses`،
`check:dead-code`، `check:cognitive-complexity`، `check:type-coverage`،
`check:codeql-ratchet`، `check:pr-evidence` شامل نہیں تھے)۔ تطبیق شدہ مجموعے کے ROI جائزے
نے معقولیت سازی کے درج ذیل امیدواروں کی نشاندہی کی۔ **انضمام محض میکانکی CI
تبدیلیاں ہیں؛ پلٹانا/حذف کرنا پالیسی فیصلے ہیں جو آپریٹر کے لیے محفوظ ہیں۔** ذیل میں سے کچھ بھی
ابھی لاگو نہیں کیا گیا۔

**اوپر یہ بھی دستاویزی شکل میں درج نہیں** (مشاورتی، کم سگنل): `docs-lint` جاب
(markdownlint + Vale، پوری جاب پر `continue-on-error`) اور علیحدہ اسکینر ورک فلوز
`semgrep.yml` / `codeql.yml` / `scorecard.yml`۔ `semgrepFindings: 0`
`quality-baseline.json` میں موجود ہے لیکن `ci.yml` میں کسی بلاکنگ ریچٹ سے منسلک نہیں — یہ میٹرک
فی الحال غیر مربوط ہے۔

### انضمام / نقل کا خاتمہ (میکانکی، کم خطرہ)

ہر امیدوار کی 2026-06-17 کو فعال گیٹ کی حالت کے مقابل توثیق کی گئی (اعتماد کریں مگر تصدیق بھی کریں)؛
کئی "واضح" انضمامات میں چھپا ہوا قرض سامنے آیا اور وہ **صاف ستھرے براہِ راست متبادل نہیں** ہیں۔

- **`check:docs-sync` دو بار چلتا ہے** — `lint` جاب میں علیحدہ طور پر اور دوبارہ `check:docs-all` (`docs-sync-strict`) اور husky pre-commit ہک کے اندر۔ ✅ **مکمل** — علیحدہ `lint` اجرا ہٹا دیا گیا۔
- **CVE اسکیننگ** — ❌ **صاف انضمام نہیں۔** `audit:deps` کسی بھی high/critical CVE پر قطعی طور پر ناکام ہو جاتا ہے؛ `check:vuln-ratchet` (osv) صرف بنیادی خط کے مقابل کسی _تنزلی_ پر ناکام ہوتا ہے (فی الحال 1 MODERATE)۔ معنویات مختلف ہیں — `audit:deps` حذف کرنے سے مطلق high/critical گیٹ ختم ہو جائے گا۔ دونوں برقرار رکھیں۔
- **چکر کی کھوج** — ✅ **مکمل** (#15159 G-01/G-02)۔ یہاں موجود پرانے متن نے `check:cycles` کو "سبز، منتخب" گیٹ کہا تھا اور اسے بلاکنگ رکھنے کا جواز یہ دیا تھا کہ `check:circular-deps` (dpdm) نے 91 چکروں کی اطلاع دی۔ وہ سبز حالت ایک **غلط سبز حالت** تھی: `check:cycles` نے 5 ذیلی ڈائریکٹریاں (450 فائلیں) اسکین کیں، صرف جامد `import|export … from` سے مطابقت کی، اور ہر `@/` اور `@omniroute/open-sse/` تخصیص کار کو خارج کر دیا، اس لیے یہ ان dynamic-import + alias چکروں کو نہیں دیکھ سکتا تھا جو ریپو میں غالب تھے۔ درست کر دیا گیا: گیٹ اب `src` + `open-sse` (5023 فائلیں) میں چلتا ہے، TypeScript AST سے تخصیص کار جمع کرتا ہے (لہٰذا `import("…")` شمار ہوتا ہے جبکہ ٹائپ پوزیشن میں `typeof import("…")` شمار نہیں ہوتا)، اور tsconfig `paths` کو حل کرتا ہے۔ اسے 0 نہیں بلکہ **14** چکر ملتے ہیں۔ چونکہ گیٹ PR میں پہلے سے موجود 14 چکروں کو درست نہیں کیا جا سکتا، اس لیے `check:cycles` اب ایک **ریچٹ** ہے (`--ratchet`، `quality-baseline.json` میں حد `metrics.cycles.value = 14`، `direction: down`) — یہ کسی بھی _تنزلی_ کو روکتا ہے اور تعداد صرف کم ہو سکتی ہے۔ CI میں `npm run check:cycles:ratchet` چلتا ہے۔ مرحلہ وار کمی **A-01** کے ساتھ آگے بڑھے گی۔ `check:circular-deps` (dpdm) ایک وسیع تر ثانوی رائے کے طور پر مشاورتی رہے گا۔
- **پیچیدگی** — ✅ **مکمل** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ایک ESLint واک، `ruleId` کے لحاظ سے شمار، تاکہ cyclomatic+max-lines اور cognitive بنیادی خطوط آزاد رہیں؛ انفرادی `check:complexity` / `check:cognitive-complexity` مقامی `--update` کے لیے برقرار ہیں۔
- **`/api` اینٹی ہیلوسینیشن** — ✅ **مکمل** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` کی ایک FS فہرست سازی، openapi-routes + docs-symbols اب بھی آزادانہ طور پر رپورٹ کرتے ہیں؛ انفرادی چیکس مقامی اجرا کے لیے برقرار ہیں۔
- **`check:node-runtime` 11 جابز میں چلتا ہے** — ⚠️ **کم ROI۔** ہر ایک الگ رنر ہے اور چیک <1s ہے؛ کل بچت ~10s ہے، جبکہ اس کے بدلے ہر جاب کا ایک سستا حفاظتی چیک ختم ہو جائے گا۔ اتنی تبدیلی کے قابل نہیں۔
- **CI lint پر `typecheck:noimplicit:core`** — ✅ **lint جاب سے ہٹا دیا گیا** (یہ مشاورتی `continue-on-error` تھا)؛ بلاکنگ ٹائپ سطح `typecheck:core` + `check:type-coverage` ہے۔ مقامی اسکرپٹ برقرار رکھا گیا۔

### پلٹائیں / فیصلہ کریں (آپریٹر پالیسی)

- `check:openapi-security-tiers` (مشاورتی) — ❌ **صاف طور پر پلٹنے کے قابل نہیں۔** یہ 0 کے ساتھ خارج ہوتا ہے لیکن خبردار کرتا ہے کہ `LOCAL_ONLY_API_PREFIXES` کے تحت کئی `traffic-inspector` روٹس میں `x-loopback-only: true` تشریح موجود نہیں۔ اسے نافذ کرنے کے لیے پہلے `openapi.yaml` میں یہ تشریحات شامل کرنا ضروری ہے۔
- `typecheck:noimplicit:core` (مشاورتی) — بڑی حد تک بلاکنگ `check:type-coverage` ریچٹ میں شامل ہے۔ اسے ریچٹ میں تبدیل کریں یا فالتو دوسرے `tsc` پاس کو حذف کریں۔
- `test:vitest:ui` (اب **بلاکنگ**) — پہلے سے موجود ناکامیاں `vitest.config.ts` میں `// #8618` ٹریکنگ تبصروں کے ساتھ واضح طور پر خارج کی گئی ہیں؛ نئی ناکامیاں جاب کو ناکام کر دیتی ہیں۔
- `check:secrets` (gitleaks، 3 دستاویزی false-positives پر منجمد بلاکنگ ریچٹ) — 0 تک پہنچنے کے لیے ان 3 کو allowlist کریں، یا اسے مشاورتی درجے پر لے جائیں۔ یہ GitHub کی مقامی secret-scanning + `check:public-creds` سے متجاوز ہے۔
- `check:pr-evidence` (بلاکنگ، PR-body نثر میں grep کرتا ہے) — false-positive کا زیادہ خطرہ؛ اسے حذف کرنے سے Hard Rule #18 کا نفاذ کمزور ہو جائے گا، اس لیے یہ حقیقی پالیسی فیصلہ ہے۔
- `semgrep` (مشاورتی علیحدہ ورک فلو) — OWASP خاندانوں کے لیے CodeQL سے متجاوز ہے؛ اس کے بنیادی خط کو کسی ریچٹ سے منسلک کریں یا حذف کر دیں۔

---

## متعلقہ دستاویزات

- سپلائی چین (ماخذ، SBOM، Trivy، Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — کلیدی مجموعوں کی یکسانیت کا گیٹ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`، جاب `i18n-ui-coverage`)۔
ہر `src/i18n/messages/<locale>.json` کے آخری درجے کے کلیدی مجموعے کا `en.json` سے موازنہ کرتا ہے اور
کسی بھی غائب یا اضافی آخری کلید پر ناکام ہو جاتا ہے، چاہے وہ کلید کب بھی شامل کی گئی ہو۔ `__MISSING__:`
پلیس ہولڈرز کو موجود شمار کیا جاتا ہے (ان کا مواد تناسب والے گیٹ کا معاملہ ہے)۔ یہ اختلاف پر مبنی/فی صد والے
دونوں گیٹس کا قطعی تکملہ ہے: `check-ui-keys-coverage` ہر لوکیل کے لیے 80 % کی کم از کم حد نافذ کرتا ہے
(~13,000 میں سے 43 غائب کلیدیں بھی 99.7 % دکھاتی ہیں)، جبکہ `check-new-key-coverage` صرف ان کلیدوں کا
جائزہ لیتا ہے جو کوئی PR، `en.json` میں شامل کرتا ہے۔ لوکیل بیچ اس دن کے `en.json` سے تیار کیا جاتا ہے
جس دن اس کی برانچ بنائی جاتی ہے، اور کئی دن تک ترجمہ جاری رہتا ہے جبکہ بیس میں نئی کلیدیں شامل ہوتی رہتی ہیں؛
بیچ PR خود کوئی کلید شامل نہیں کرتا، اس لیے جب بیچ 1 (#13044) نو لوکیلز میں 43 کلیدوں کی کمی کے ساتھ
اور بیچ 2 (#13660) آٹھ لوکیلز میں 10 کلیدوں کی کمی کے ساتھ ضم ہوئے (2026-09-15)، تو دونوں ہم رتبہ گیٹس
خاموش رہے۔ ناکامی کو
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` سے درست کریں؛ ایک `extra`
آخری کلید کا مطلب ہے کہ ماخذ نے اسے حذف کر دیا ہے — اسے لوکیل سے بھی حذف کریں۔ `--warn` ناکام ہوئے بغیر
رپورٹ کرتا ہے۔ `--catalog=cli` یہی موازنہ `bin/cli/locales` پر چلاتا ہے
(`npm run i18n:check-keys:cli`)؛ دونوں مراحل جاب `i18n-ui-coverage` میں موجود ہیں۔

#### `check-new-key-coverage` — نئی کلید کا i18n گیٹ

`check-ui-value-drift` کا ہم رتبہ۔ وہ ایسی انگریزی قدر پکڑتا ہے جسے **دوبارہ لکھا گیا**
ہو مگر اس کے تراجم پیچھے رہ گئے ہوں؛ یہ ایسی انگریزی کلید پکڑتا ہے جسے **شامل کیا گیا**
ہو مگر بعض لوکیلز کو کبھی نہ ملی ہو۔

`check-ui-keys-coverage` اس صورت کو نہیں دیکھ سکتا: یہ ہر لوکیل کے لیے فی صد کی کم از کم حد نافذ کرتا ہے،
اور ~13,000 آخری کلیدوں میں سے گیارہ غائب کلیدیں بھی کوریج کو 99.9% پر رکھتی ہیں۔ فی زبان فی صد
یہ ظاہر نہیں کر سکتا کہ "یہ فیچر بغیر ترجمے کے جاری ہوا" — کسی نئے لوکیل میں ایک پورا فیچر بغیر کسی
متن کے شامل ہو سکتا ہے اور پھر بھی یہ عدد تبدیل نہیں ہوتا۔

جس واقعے کو یہ محفوظ کرتا ہے: Orchestration Canvas کے Phase 3 نے اپنی گیارہ کلیدوں کا ترجمہ ان
42 لوکیلز میں کیا جو اس وقت موجود تھے۔ چند گھنٹے بعد EU زبانوں کے بیچ (#13044) نے ریپو کو
51 لوکیلز تک پہنچا دیا، اور نو نئے لوکیلز (`el`، `et`، `ga`، `hr`، `lt`، `lv`، `mt`، `sl`، `sr`) کو
وہ کلیدیں کبھی نہیں ملیں۔ `deepMergeFallback` غائب کلید کی جگہ انگریزی استعمال کرتا ہے، اس لیے
خرابی کی صورت خالی UI کے بجائے غیر مترجم UI تھی — حقیقی، اور ساختی طور پر خاموش۔

اپنے ہم رتبہ کی طرح یہ بھی **اختلاف سے آگاہ** ہے، اور مرج بیس پر موجود انگریزی کا ورکنگ ٹری سے
موازنہ کرتا ہے، اس لیے پہلے سے موجود خلا منجمد رہتے ہیں اور گیٹ کو فعال کرنے کے لیے کسی منتقلی کی
ضرورت نہیں پڑی۔

**ایک `__MISSING__:<english>` مارکر اسے مطمئن نہیں کرتا (2026-09-17 سے)۔** پہلے یہ دستاویزی
التوا کا طریقہ تھا — رن ٹائم درست انگریزی پر واپس آ جاتا ہے — یہاں تک کہ 2026-09-16 کو آٹھ فیچر PRs
نے 61 کلیدیں شامل کیں اور ترجمہ کرنے کے بجائے تمام 65 لوکیلز میں مارکر لگا دیا: اس گیٹ نے ہر ایک کو
قبول کر لیا، کسی چیز نے PRs کو نہیں روکا، اور پھر بلاک کرنے والا حقیقی ترجمے کے تناسب کا گیٹ ریلیز ٹِپ
پر سب کے لیے ناکام ہو گیا (pt-BR 3.2 % > 2.5 % + 0.5)۔ اب مارکر کو غائب ترجمہ سمجھا جاتا ہے۔
ناکامی کو
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` سے،
یا تمام لوکیلز کو متوازی طور پر `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`، detached حالت میں محفوظ، `OMNIROUTE_TRANSLATION_*` env کے
بغیر شروع ہونے سے انکار کرتا ہے) کے ذریعے درست کریں۔ جو کلید لازماً انگریزی میں رہنی چاہیے
(کسی پروڈکٹ/انجن/فلیگ کا مقررہ نام)، اسے `scripts/i18n/untranslatable-keys.json` میں ہونا چاہیے،
کبھی بھی مارکر کے پیچھے نہیں۔ `vi` مارکرز پر مکمل پابندی عائد کرتا ہے
(`tests/unit/i18n-vi-completeness.test.ts`)۔

#### `check-vitest-exclusions` — مؤخر شدہ ٹیسٹ کا گیٹ

`vitest.config.ts` کی `exclude` فہرست میں موجود فائل ایسا ٹیسٹ ہے جو چلتا نہیں، مگر ٹری پڑھنے والے کو
وہ کوریج کی طرح نظر آتا ہے۔ باسٹھ فائلیں اس تبصرے کے پیچھے جمع ہو گئیں:
`// #8618 — پہلے سے موجود ناکامی؛ درست ہونے پر یہ اخراج ہٹا دیں`۔ ایشو #8618 کو
2026-08-11 کو بند کر دیا گیا، جبکہ اس کی زیرِ نگرانی فہرست 45 اندراجات سے بڑھ کر 62 ہو گئی، اور ہر
نئے اندراج کو ایک بند شدہ ایشو کی طرف اشارہ کرنے والا تبصرہ ورثے میں ملا۔ جب بالآخر فہرست کی ہر فائل
کو الگ الگ ناپا گیا (#13204)، تو **62 میں سے 51 موجودہ ٹری پر ماخذ میں کسی تبدیلی کے بغیر کامیاب ہوئیں**۔

گیٹ کا تقاضا ہے کہ حقیقی فائل پر منتج ہونے والا ہر اخراج (a) کسی ٹریکنگ ایشو کا نام دے اور
(b) اپنی پیمائش شدہ حالت کے ساتھ `config/quality/vitest-exclusions.json` میں موجود ہو، تاکہ نیا اخراج
شامل کرنا 60 اندراجات والی صف میں محض ایک اور سطر کے بجائے مخصوص فائل میں قابلِ جائزہ اختلاف ہو۔
یہ دانستہ طور پر خارج شدہ ٹیسٹس دوبارہ نہیں چلاتا — اس میں ~10 منٹ لگتے ہیں اور یہ کام دورانی جاب
کا ہے؛ انوینٹری ریکارڈ کرتی ہے کہ ہر ایک کی آخری پیمائش کب ہوئی تھی۔
