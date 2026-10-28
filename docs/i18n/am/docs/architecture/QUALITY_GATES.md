# Quality Gates Reference (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ይህ ሰነድ በOmniRoute ውስጥ ላሉ ሁሉም የCI ጥራት መግቢያዎች ዋና ማጣቀሻ ነው።
እያንዳንዱን መግቢያ፣ ምን እንደሚያረጋግጥ፣ በየትኛው የCI ሥራ ውስጥ እንደሚሠራ፣
የratchet መነሻ መስመር ወይም የማለፍ/የመውደቅ ፖሊሲ ይጠቀም እንደሆነ፣ እንዲሁም ግንባታውን የሚያግድ ወይም የምክር ብቻ እንደሆነ ይገልጻል።

ለአጭር ማጠቃለያ እና ለፈቃድ ዝርዝር ፖሊሲው፣ በ`AGENTS.md` ውስጥ ያለውን "የጥራት መግቢያዎች እና Ratchets" ክፍል ይመልከቱ።
ለወሳኝ ግምገማው፣ ለብስለት ምደባው፣ እና ከመሣሪያ ነፃ ለሆነው
የተመሳሳይ ሥርዓት ድግግሞሽ ዕቅድ፣
[የጥራት መግቢያ መመሪያ](../ops/QUALITY_GATE_PLAYBOOK.md)ን ይመልከቱ።

---

## የGate ዝርዝር እና የአፈጻጸት profiles

### የእጩ ተቀባይነት

የCI እና Quality Gates workflows እያንዳንዳቸው የረጋ ውሳኔ ያወጣሉ፡ `Gate / CI` እና
`Gate / Quality`። ስሪት ያለው የተቀባይነት ፖሊሲያቸው እያንዳንዱን የupstream job እንደ አስፈላጊ (required) ወይም አማካሪ (advisory) ይዘረዝራል። ተግባራዊ የሆነ አስፈላጊ job መሳካት አለበት፡ የጠፋ (missing)፣ የተሰረዘ (cancelled)፣ የተዘለለ (skipped)፣ በመጠባበቅ ላይ ያለ (pending) እና ያልታወቀ (unknown) ውጤቶች PASS መመስረት አይችሉም። ትክክለኛ የdocs-only ወይም catalog-only ምደባ code laneን ያልተግባራዊ ሊያደርገው ይችላል፤ draft PR የተቀበለ እጩ አይደለም። የ`hotfix` ምልክት (label) ማስረጃ መጠየቅን አይተውም።

ሁለቱም workflows ወደ main/release branches የሚገቡ PRsን፣ ወደ `main` የሚደረጉ pushesን፣ የእጅ dispatchን እና የmerge-group ክስተቶችን ይሸፍናሉ። Push፣ dispatch እና merge-group ሙሉውን ምርጫ ያሂዳሉ። ወደ `release/**` የሚደረጉ pushes አያስነሷቸውም (2026-10-18)፡ እያንዳንዱ ለውጥ matrixን በPRው ላይ አሂዶ አልፏል እና የተዋሃደው ጥምረት የRelease-Green ሥራ ነው (`docs/ops/RUNNER_BOX.md` → Hosted lane)። Forks እና merge groups አለበለዚያ self-hosted runners የሚመርጡ jobs ላይ hosted runners ይጠቀማሉ፤ በቂ hosted አቅም ከrollout በፊት መረጋገጥ አለበት።

እያንዳንዱ የJSON ደረሰኝ የተወሰደውን (checked-out) SHA፣ የworkflow run እና attemptን ይለያል። CLI የcheckout/event SHA ማይመሳሰልን (mismatch) ውድቅ ያደርጋል። የWorkflow ሙከራዎች የፖሊሲ አባልነትን ከውሳኔው job `needs` ዝርዝር ጋር ያያይዛሉ፣ ስለዚህ አዲስ ወይም የተወገደ lane በዝምታ መጥፋት አይችልም። ደረሰኞቹ የራሳቸውን workflow ይሸፍናሉ፣ ማተምን፣ ማሰራጨትን ወይም የነባር advisory scanner ውስጣዊ ክፍሎችን አይደለም። ሁለቱንም የcheck ስሞች በbranch ህጎች ውስጥ ማንቃት የተለየ የአስተዳደር ለውጥ ነው፤ እነዚህን jobs መጨመር በራሱ branchን አይጠብቅም።

### የStatic scan ዝርዝር

ስሪት ያለው የnpm-alias ዝርዝር እና የstatic-scan አባልነት በ`config/quality/gate-manifest.json` ውስጥ ናቸው። የscript ስሞችን እና ትክክለኛ ትእዛዞችን ከ`package.json` ጋር ለማረጋገጥ `npm run check:gate-manifest` ያሂዱ፤ ጭማሪዎች፣ ማነሶች እና የትእዛዝ መሸጋገር (drift) የአካባቢውን hook እና በCI ውስጥ ያሉትን የለውጥ-ምደባ jobs ሁለቱንም ያሳጣሉ። Alias የworkflow job፣ የmatrix instance ወይም test case አይደለም፡ እነዚህ ቆጠራዎች እርስ በርስ እንደሚተካኩ መቅረብ የለባቸውም።

የተመረጡትን aliases ሳያከናውኗቸው ለመፈተሽ `npm run quality:scan -- --list` ወይም `npm run quality:scan:fast -- --list` ይጠቀሙ። Runner የnpm entrypointን ይጠራል፣ ስለዚህ runtimeው (ተዋቅሮባቸው ቦታ Bunን ጨምሮ) ይጠበቃል። Manifest ከእነዚያ profiles ውጭ ያሉትን aliases በተናጠል እንደተጠሩ ይመዘግባል፣ እና የጥገና ትእዛዞች በread-only ስካን profiles ውስጥ ተከልክለዋል።

እነዚህ profiles የstatic scanን ብቻ ይሸፍናሉ። የምርት ሙከራዎችን፣ ሽፋንን (coverage)፣ ጥቅልን (packaging)፣ ውጫዊ ፍተሻዎችን ወይም የእጩን ሙሉ የልቀት ተቀባይነት አያረጋግጡም። የWorkflow ተቀባይነት የተያያዘውን `config/quality/admission-policy.json` እና `scripts/quality/admission-verdict.mjs` ይጠቀማል። የRelease-observer profiles ተነጥለው ይቆያሉ፤ ተግባራዊ የሆኑትን ፍተሻዎቻቸውን እና ደረሰኞቻቸውን በራስ መንገድ ይፈትሹ። ከታች ያለው የጽሑፍ ዝርዝር ማጣቀሻ ነው፣ እንጂ አንድ gate በእውነት እንደሰራ ማስረጃ አይደለም።

Scripts በ`scripts/check/` (የፖሊሲ gates) እና `scripts/quality/` (ratchet ሞተር) ስር ናቸው። የCI የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የRelease PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` በmain/release PRs፣ ወደ `main` pushes፣ dispatch እና merge groups ላይ CIን ያሟላል። PRs በpath የተጣሩ ፈጣን ፍተሻዎችን ይጠቀማሉ። በቋሚነት የተሰናከለው የተደገመ build ተወግዷል፤ እውነተኛዎቹ የbuild/package/boot ፍተሻዎች በCI ውስጥ ይቆያሉ።

| Job                                              | ክልል                                                                                                                                                                 | እገዳ            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | የDocs/code PRs፤ የAPI docs ማጣቀሻዎች እና docs-all                                                                                                                        | አዎ             |
| `Fast Quality Gates`                             | የCode PRs፤ ስታቲክ ፍተሻዎች፣ typecheck፣ የdashboard typecheck፣ የተጎዱ unit ሙከራዎች                                                                                             | አዎ             |
| `Forgotten sibling tests`                        | የCode PRs፤ የተለወጡ ሞጁሎች ወደ ስታቲክ ሸማቾች እና የእጩ sibling ሙከራዎች ተከትለዋል፤ barrel እና dynamic-import መንገዶች ከተጠቀሱ የallowlist ስተቀረቶች ጋር እንደ አማካሪ ምርመራዎች (diagnostics) ይሪፖርት ይደረጋሉ | **አማካሪ**       |
| `Vitest (fast-path)`                             | የCode PRs፤ ፈጣን vitest suite                                                                                                                                         | አዎ             |
| `Unit Tests fast-path`                           | የCode PRs፤ የ4-shard unit suite                                                                                                                                      | አዎ             |
| `No new ESLint warnings`                         | የCode PRs፤ ስገደቦችን (suppressions) የሚገነዘብ lint ጠባቂ                                                                                                                    | አዎ፣ forksን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | draft ያልሆኑ PRs፤ የchangelog እና የgenerated skills ማመሳሰል (sync)                                                                                                        | አዎ፣ forksን ጨምሮ |

#### የተረሱ sibling ሙከራዎች ሪፖርት

`npm run check:forgotten-sibling-tests` የtest-impact mapን የሚያነቃውን import resolver እንደገና ይጠቀማል።
ለእያንዳንዱ የተለወጠ የምርት ሞጁል፣ እጩው ሙከራ ከpull-request diff ላይ ሲጎድል፣
የተወሰኑ `changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ያሳውቃል።
የMarkdown ማጠቃለያው እና የJSON ውጤቱ እንደ `forgotten-sibling-tests` የworkflow artifact ይቀመጣሉ፤
ይህም ማናቸውም የሚከልክል rollout ከመተግበሩ በፊት ለካሊብሬሽን ነው።

Barrel re-exports እና dynamic imports የresolution diagnostics ብቻ ናቸው፤ በጭራሽ
የሚከልክል ግኝት አይፈጥሩም። የተገመገሙ ልወጣዎች በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ ግቤት consumerን እና እጩውን
ሙከራ በስም መጥራት አለበት፣ የተወሰነ ምክንያት መስጠት አለበት፣ እና የGitHub issue ወይም pull request ማገናኘት
አለበት። የተበላሹ ግቤቶች ሁልጊዜ እንደውድቀት ተቆጥረው ይዘጋሉ (fail closed)። ልወጣዎች የተሰረዘ እጩ ሙከራን ወይም
`.skip`/`.todo` የሚጨምር diffን ማገድ አይችሉም፤ የassertion መበልጸግ እና ሌሎች የማስደበቂያ ዘዴዎች
በራሱ በሚከልከል `check:test-masking` gate ኃላፊነት ስር ይቀጥላሉ።

### ስራ፦ `lint`

በወደ `main` የሚላክ እያንዳንድ PR ላይ ይሰራል። ሲወድቅ mergeን ይከልክላል።

| ስክሪፕት (`npm run ...`)             | ያረጋግጣል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አጋዳሪ                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `check:node-runtime`              | የ Node.js ስሪት በሚደገፍ ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                    |
| `check:cycles`                    | በ `src/` + `open-sse/` ሁሉ ውስጥ ያሉ ዑደታዊ ኢምፖርቶችን (AST-መሰረት ያለው, tsconfig `paths` የተፈታ)። ባሁን ሁኔታ ማንኛውም ዑደት ሲኖር 1 ይወጣል (ከ #15281 ጀምሮ fail-closed) እና SCCs ን ይዘረዝራል። `check:cycles:ratchet` (CI የሚያካሂደው) ቆጠራው በ `quality-baseline.json` ውስጥ ያለውን የ `metrics.cycles` ጣሪያ ሲበልጥ ያግዳል — በአሁኑ ጊዜ 14, `direction: down`, ስለዚህ መቀነስ ብቻ ይችላል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                        | አዎ (ratchet)                          |
| `check:boundary`                  | `open-sse → src` ትስስር: ከሞተሩ ወደ አፕሊኬሽኑ ያሉ ልዩ የፋይል-ወደ-ፋይል ኢምፖርቶች (`scripts/quality/measure-boundary.mjs`; የጠርዙ ዝርዝር የ v4 core/module-split እርማት ቀሪ ስራ ነው)። ባሁን ሁኔታ = የምክር ሪፖርት (ከ `quality:boundary` ጋር አንድ አይነት)። `check:boundary:ratchet` (CI የሚያካሂደው, እንዲሁም በ `quality.yml` fast-gates ratchet ዑደት ውስጥ የሚገኝ) ቆጠራው በ `quality-baseline.json` ውስጥ ያለውን የ `metrics.boundaryOpenSseToSrc` ጣሪያ ሲበልጥ ያግዳል — በተለካው 771 ተጀምሯል, `direction: down`; `--update` ዝቅ ማድረግ ብቻ ይችላል; በ PRs ላይ ከ base ጋር በተያያዘ (`--base-ref`, ከታች ይመልከቱ)                                                                                                                                                                                                | አዎ (ratchet)                          |
| `check:route-validation:t06`      | የ Zod schemas በሁሉም routes ላይ መኖራቸውን (Tier 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                    |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ቆጠራ በጀት አያልፍም (ደረጃ 11 ራቸት)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                    |
| `check:provider-consistency`      | በ`providers.ts` ውስጥ ያለ እያንዳንዱ አቅራቢ በ`providerRegistry.ts` ውስጥ የሚጣጣም ግቤት አለው (እና በተቃራኒውም፣ በፍቃድ ዝርዝሩ ገደብ ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                    |
| `check:model-lifecycle`           | በእጅ የሚጠበቁት ሦስቱ የማዘዋወር ሰንጠረዦች ከተመዘገበው የህይወት ዑደት ስናፕሾት (#11503) ጋር አስተሳሰባቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` ማዘዋወር የሚችለውን ምንም የተሰረዘ መለያ ነጥብ አይሰጥም፤ እያንዳንዱ የ`BUILT_IN_ALIASES` ዒላማ በ`REGISTRY` ውስጥ ይገኛል እና ከተሰረዘ-መለያ ስናፕሾት ውጭ ነው፤ በ`REGISTRY` ውስጥ የሚኖር እያንዳንዱ የተሰረዘ መለያ ወደፊት ተልኳል ወይም በ`allowedRetiredInCatalog` ውስጥ ተዘርዝሯል፤ እና ምንም የ`DEFAULT_DEGRADATION_MAP` ምንጭ ወይም ዒላማ በዚያ ስናፕሾት ውስጥ የተሰረዘ አይመስልም። ይህ አንድ ሞዴል በአሁኑ ጊዜ በሚሠራ አፕስትሪም እየተሰጠ መሆኑን አያረጋግጥም። ከመስመር ውጪ — ከ`config/quality/model-lifecycle.json` ጋር ያወዳድራል፣ በ`npm run quality:refresh-model-lifecycle` በእጅ ይታደሳል (ኔትወርክ ይጠይቃል፤ ወደ CI አልተገናኘም)። `allowedRetiredInCatalog` የburn-down ራቸት ነው፦ ግቤት የሚጨምረው በክትትል ጉዳይ (tracking issue) ጋር ብቻ ነው። | አዎ                                    |
| `check:fetch-targets`             | በደንበኛ-ገጽ `src/` ውስጥ ያለ እያንዳንዱ `fetch("/api/...")` ወደ እውነተኛ `route.ts` ይፈታል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                    |
| `check:deps`                      | በሪፖው ውስጥ ባሉት እያንዳንዱ `package.json` `npm install` ሊሆንባቸው የሚችሉ ሁሉም ጥገኞች በ`dependency-allowlist.json` ውስጥ ናቸው፤ አዲስ ያልተቆለፉ ወይም ስሎፕስኳት የተደረገባቸው ፓኬጆች ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                    |
| `audit:deps`                      | `npm audit` (root + electron) — ከፍተኛ/ውሳኝ ማሳወቂያዎች የሉም (ከosv `check:vuln-ratchet` ጋር ይደራረባል፤ የማመጣጠን ተራ-ዝርዝሩን ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                    |
| `check:lockfile`                  | የ`package-lock.json` ታማኝነት — የhttps መዝገብ፣ የታማኝነት ሃሽዎች፣ የአስተናጋጅ ማስተካከያዎች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                    |
| `check:licenses`                  | የSPDX ፈቃድ የተፈቀደ ዝርዝር ለምርት ጥገኞች                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                    |
| `check:tracked-artifacts`         | የግንባታ ውጤቶች የሉም / የተመዘገቡ `node_modules` ሲምሊንኮች የሉም (በhusky pre-commit ውስጥም ይሠራል፤ pre-push ሆን ብሎ ቀላል ነው — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                    |
| `check:ai-attribution`            | በPR መዝገቦች፣ ርዕስ ወይም አካል ውስጥ የAI/ቦት `Co-Authored-By` ተጨማሪ መስመር ወይም የAI-ፍጠር ግርጌ የለም — ጠንካራ ህግ #16 (በ`quality.yml` የፈጣን በሮች ዑደት ውስጥ ለPR→`release/**` — የክስተቱን ጭነት ያነባል፣ ከPR ውጭ ምንም አያደርግም — እና በ`ci.yml` lint ውስጥ ለPR→`main` PR-ብቻ ደረጃ፤ እንዲሁም የhusky `commit-msg` መንጠቆ፤ የሰው ተባባሪ ደራሲዎች ይፈቀዳሉ፤ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                    |
| `check:vitest-exclusions`         | እያንዳንዱ የVitest ማግለል የመከታተያ ጉዳይ ይጠቅሳል እና በ`config/quality/vitest-exclusions.json` ውስጥ ይታያል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                    |
| `check:file-size`                 | የምንጭ ፋይሎች (`.ts`/`.tsx` በ`src/`፣ `open-sse/`፣ `electron/`፣ `bin/` ውስጥ) በ`cap` ውስጥ ይቆያሉ እና የፈተና ፋይሎች (`*.test.ts(x)`) በ`testCap` ውስጥ፤ በ`file-size-baseline.json` (`frozen` / `testFrozen`) የቀዘቀዙ ፋይሎች ከተመዘገበው መጠናቸው ማደግ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                    |
| `check:error-helper`              | በ executors/handlers ውስጥ ያሉ የስህተት ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()` ይጠቀማሉ (ጠንካራ ህግ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                    |
| `check:migration-numbering`       | የማይግሬሽን SQL ፋይሎች በቅደም ተከተል ተቆጥረዋል፣ ክፍተት ወይም ተደጋጋሚ የለም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                    |
| `check:public-creds`              | ከ`publicCreds.ts` ውጭ ቃል በቃል የ OAuth `client_id`/`client_secret` ወይም የ Firebase Web ቁልፎች የሉም (ጠንካራ ህግ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                    |
| `check:db-rules`                  | ከ`src/lib/db/` ሞጁሎች ውጭ ጥሬ SQL የለም፤ ከ`localDb.ts` የሚደረግ barrel-import የለም (ጠንካራ ህጎች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                    |
| `check:known-symbols`             | በ dispatch tables ውስጥ የተመዘገቡ የአቅራቢ አስፈጻሚዎች፣ የመንገድ አሰራር ስልቶች እና ተርጓሚዎች በዲስክ ላይ ካሉት ፋይሎች ጋር ይጣጣማሉ — orphaned ወይም undeclared symbols የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                    |
| `check:route-guard-membership`    | ልጅ ፕሮሰስ የሚፈጥር እያንዳንዱ route በ`isLocalOnlyPath()` ይመደባል (ጠንካራ ህጎች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                    |
| `check:test-discovery`            | በሪፖ ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ የፈተና አስኪያጅ ይሰበሰባል (ratchet: በ`test-discovery-baseline.json` ውስጥ ያለው የተጣሉ ዝርዝር ሊቀንስ ብቻ ነው የሚችለው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                    |
| `check:test-tla-order`            | በ`tests/unit` ስር ያለ ማንኛውም `node:test` ፋይል ፈተና ከመዘገበ በኋላ ወደ የላይኛው ደረጃ `await` ደርሶ ተጨማሪ ፈተናዎችን አይመዘግብም (#18045; ratchet: `test-tla-order-allowlist.json` ሊቀንስ ብቻ ነው የሚችለው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                    |
| `check:agent-skills-sync`         | የተፈጠሩት የagent-skills ውጤቶች ከምንጭ ካታሎጋቸው ጋር ይገጥማሉ (ምንም ልዩነት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | የአቅራቢ ሎጎዎች/አሴቶች የተመዘገበ የመነሻ መረጃ መዝገብ አላቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | የJSON ውቅር ፋይሎች ይተነተናሉ እና የሪፖውን የlint ደንቦች ያሟላሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | የTypeScript ማጠናቀር ያለ ስህተት (የማማከሪያ ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                    |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊት የሚመለከት፤ ብዙ አስቀድመው የነበሩ የጥሪ ቦታዎች አሁንም ማብራሪያ ይፈልጋሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **ማማከሪያ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | ለ `src/app/(dashboard)/**` የተገደበ `tsc` (#7033) — የ `typecheck:core` የተመረጠ የ 27-ፋይል allowlist ምንም dashboard TSX አያካትትም፣ እና `next build` ደግሞ type-check አያደርገውም (`next.config.mjs` `ignoreBuildErrors: true` እንዲሆን ያደርጋል)፣ ስለዚህ እዚያ የሚከሰቱ የ orphaned-identifier እርጅናዎች (#6625/#6909) ለ CI የማይታዩ ነበሩ። ከተቀዘቀዘ የእያንዳንዱ-ፋይል/የእያንዳንዱ-TS-code ቆጠራ baseline (`config/quality/dashboard-typecheck-baseline.json`፣ ከ `check:known-symbols` ጋር ተመሳሳይ የ stale-enforcement አብነት) ጋር ያወዳድራል — ከቀመጠው ቆጠራ በላይ የሚሆኑ አዳዲስ ስህተቶች ብቻ gate ያወድቃሉ፤ ቀደም ሲል የነበረ ስህተት ሲጠገን በ `--update` ዝቅ ያድርጉት።                                                                                                                                                 | አዎ                                    |

### ሥራ: `quality-gate`

ከ `test-coverage` በኋላ ይሰራል። ሲወድቅ merge ይከለክላል።

| ስክሪፕት                        | የሚያረጋግጠው                                                                                                                           | አግድ                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `quality:collect`            | `quality-metrics.json` ያመንጫል (የ ESLint ማስጠንቀቂያ ቆጠራ፣ ከተዋሐደ shard ሪፖርት የሚመነጭ ሽፋን)                                                    | አዎ (ከ ratchet በፊት) |
| `quality:ratchet`            | በ `quality-baseline.json` ውስጥ ያለ እያንዳንዱ metric አልተባላሸም (የ ESLint ማስጠንቀቂያዎች ≤ baseline፤ ሽፋን ≥ baseline)                             | አዎ                 |
| `check:duplication`          | የኮድ ቅጂ (jscpd@4) በ `quality-baseline.json` ውስጥ ካለው baseline አይበልጥም                                                                 | አዎ                 |
| `check:complexity`           | የፋይል-ደረጃ cyclomatic ውስብስብነት ካፕ አይበልጥም (ዋና ESLint `complexity` + `max-lines-per-function`)                                          | አዎ                 |
| `check:cognitive-complexity` | የእውቀታዊ ውስብስብነት ratchet (`eslint-plugin-sonarjs`) — የተለየ ESLint ማለፍ፤ CI ሁለቱንም እንደ አንድ የተዋሐደ `check:complexity-ratchets` ደረጃ ያካሂዳቸዋል | አዎ                 |
| `check:dead-code`            | ያልተጠቀሙ exports / ፋይሎች ratchet (knip) ከ baseline ጋር ሲነጻጸር አይባላሽም                                                                    | አዎ                 |
| `check:compression-budget`   | የ compression benchmark በጀት — በእያንዳንዱ ሞተር የ token-ቁጠባ ዝቅተኛ ገደቦች መባላሽ የለባቸውም                                                        | አዎ                 |
| `check:type-coverage`        | የ percent-typed ratchet (`type-coverage`) አይባላሽም፤ በዋናነት `typecheck:noimplicit:core` ይሸፍናል                                          | አዎ                 |
| `check:codeql-ratchet`       | የክፍት CodeQL ማንቂያዎች ቆጠራ አይባላሽም (በ `gh api` ያነባል፤ token ከጎደለ በሰላም ያለፋል) — የማደስ ድጋሜ እና የእጅ መነሻ፦ ከታች "CodeQL ratchet" ይመልከቱ            | አዎ                 |

### ሥራ: `quality-extended`

መላው ሥራ አማካሪ ነው (`continue-on-error: true`)። npm-ተኮር ratchets በእውነት ይሰራሉ፤ የውጪ ስካነሮች በ `gh release download` ይጫናሉ እና ባይናሪ ገና ከጎደለ ራሳቸውን ያስወግዳሉ (exit 0)።

| ስክሪፕት                    | የሚያረጋግጠው                                                                                                                                                             | አግድ                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:circular-deps`    | ዙራዊ ጥገኛነቶች የሉም (dpdm)                                                                                                                                                | **አማካሪ**                                       |
| `check:bundle-size`      | የ bundle መጠን ካፕ አይበልጥም                                                                                                                                               | **አማካሪ**                                       |
| `check:secrets`          | የምስጢር ስካኒንግ (gitleaks) — ባይናሪ ከጎደለ ያለፋል                                                                                                                              | **አማካሪ**                                       |
| `check:vuln-ratchet`     | የጥገኛ ደህንነት ተጋላጭነቶች (osv-scanner) አይባላሹም — ባይናሪ ከጎደለ ያለፋል                                                                                                             | **አማካሪ**                                       |
| `check:workflows`        | የ workflow lint (actionlint + zizmor)፤ የጎደሉ/የተሰበሩ ስካነሮች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደለ ratchet baseline እንደ INCOMPLETE ይውድቃሉ። ትክክለኛ ግኝቶች የተመረጠውን ጥብቅ/አማካሪ/ratchet ፖሊሲ ይከተላሉ | አፈጻጸም ያስፈልጋል፤ የ zizmor ratchet በ CI ውስጥ አግድ ነው |
| `check:openapi-breaking` | ለሕዝባዊው API ውል (`openapi.yaml`) ከ base branch ጋር ሲነጻጸር የሚመጡ ሰባሪ ለውጦች (oasdiff) — `openapiBreaking=N` ያመንጫል፤ oasdiff ከጎደለ ወይም base spec መፈታት ካልተቻለ ያለፋል                | **አማካሪ**                                       |

### ሥራ: `docs-sync-strict`

ወደ `main` በሚሆን እያንዳንዱ PR ላይ ይሰራል። ሲወድቅ merge ይከለክላል።

| ስክሪፕት                          | የሚያረጋግጥ                                                                                                                                      | ማገድ                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | ከታች ያሉትን 6 ንዑስ ጌቶች በቅደም ተከተል የሚያካሂድ ሜታ-ጌት                                                                                                    | አዎ                       |
| ↳ `check:docs-sync`            | የCHANGELOG / OpenAPI / llm.txt የስሪት ተስማሚነት                                                                                                   | አዎ                       |
| ↳ `check:docs-counts`          | በጽሑፍ ውስጥ ያሉ ቆጠራዎች (የአቅራቢ ቆጠራ፣ የፍልሰት ቆጠራ ወዘተ) በእውነተኛው ቆጠራዎች የራትቸት መስኮት (ratchet window) ውስጥ መሆናቸውን                                            | አዎ                       |
| ↳ `check:env-doc-sync`         | በ`.env.example` ውስጥ ያለ እያንዳንዱ env var በሰነድ ሠንጠረዥ ውስጥ መዘገቡን፣ እና በተቃራኒውን                                                                       | አዎ                       |
| ↳ `check:deprecated-versions`  | በሰነዶች ውስጥ የተተዉ (deprecated) የስሪት ሕብረቁምፎች እንደሌሉ                                                                                               | አዎ                       |
| ↳ `check:doc-links`            | በሰነዶች ውስጥ ያሉ ውስጣዊ የmarkdown አገናኞች ወደ እውነተኛ ፋይሎች መፍታታቸውን (`[text]`/`(path)` ቅጽ)                                                               | አዎ                       |
| ↳ `check:fabricated-docs`      | በሰነዶች ውስጥ የተጠቀሱ መንገዶች (routes)፣ env varዎች፣ የCLI ትእዛዞች፣ የhook ስሞች እና የፋይል መንገዶች በcodebase ውስጥ መኖራቸውን። ጠንካራ ጌት በ`--strict`; ያለ ሰንደቁ soft-fail። | አዎ (በCI ውስጥ በ`--strict`) |
| `check:cli-i18n`               | የCLI ትእዛዝ ሕብረቁምፎች በሁሉም i18n locale ፋይሎች ውስጥ መኖራቸውን                                                                                           | አዎ                       |
| `check:openapi-coverage`       | የOpenAPI spec ቢያንስ የተራትቸት ዝቅተኛ መጠን (ratcheted floor) እውነተኛ መንገዶችን መሸፈኑን                                                                      | አዎ                       |
| `check:openapi-security-tiers` | በ`openapi.yaml` ውስጥ ያሉ የደህንነት ደረጃ ማስታወሻዎች ከ`routeGuard.ts` ምደባዎች ጋር መጣጣማቸውን                                                                  | **ማሳሰቢያ**                |
| `check:openapi-routes`         | በ`openapi.yaml` ውስጥ ያለ እያንዳንዱ መንገድ ወደ እውነተኛ `route.ts` መፍታቱን (ፀር-ህልም / anti-hallucination)                                                   | አዎ                       |
| `check:docs-symbols`           | በ`docs/**/*.md` ውስጥ ያለ እያንዳንዱ `/api/...` ማጣቀሻ ወደ እውነተኛ `route.ts` መፍታቱን (ፀር-ህልም / anti-hallucination)                                        | አዎ                       |
| `i18n translation drift`       | በi18n locale ፋይሎች ውስጥ ያልተተረጎሙ ቁልፎች — ማስጠንቀቂያ ብቻ                                                                                              | **ማሳሰቢያ**                |

በ`docs/diagrams/` ሥር ያሉት አሥራ ሁለቱ የREADME SVGዎች የሚመነጩ ናቸው (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ሁሉንም እንደገና ይመነጫል)። እያንዳንዱ የባይት-ንጽጽር ነጠላ ሙከራ (unit test)
አለው (`tests/unit/docs/readme-*-svg.test.ts`፣ ሥራ `test-unit`) የተካሄደው (committed) ፋይል
የተሻለለ (stale) ሲሆን ይወድቃል፣ እና `check:docs-counts` መሰረታዊ ቁጥሮችን ከ`<text>` nodesዎቻቸው ያነባል — ይኸውም
ቁጥሮቹ በጭራሽ ወደ paths እንዳይቀየሩ (outline) ምክንያት ነው። የSVG መሰረታዊ-ቁጥሮች ምርመራ በ
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) ውስጥ የተዘረዘሩትን ፋይሎች ያነባል፦ `docs/diagrams/readme-hero.svg`፣
`free-tier-budget.svg`፣ `promise-pillars.svg`፣ `comparison-table.svg`፣ `cli-terminal.svg`፣
`tier-cascade.svg`፣ በተጨማሪ `public/images/tier-flow-dark.svg` እና `tier-flow-light.svg`; የ
free-forever፣ catalog-entry፣ recurring-pool እና scoring-factors ክሌሞች እንዲሁም
`promise-pillars.svg`፣ `free-tier-budget.svg` እና `strategies-grid.svg` ያነባሉ። `free-tier-budget.svg`
አኃዞቹን ከቀጥታ ካታሎግ ጫኝ (live catalog loader) ይወስዳል፣ ስለዚህ በ`FREE_MODEL_BUDGETS` ላይ ወይም
በአቅራቢ ማሳያ ስም ላይ ማንኛውም ለውጥ ያ ፋይል እስኪመነጭ ድረስ CIን ቀይ ያደርገዋል።

### ሥራ፦ `i18n-ui-coverage`

| ስክሪፕት                            | የሚያረጋግጥ                                                                                                                                                                 | ማገድ       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check-ui-keys-coverage` (ኢንላይን) | የUI i18n ቁልፍ ሽፋን ≥ 65% መሆኑን                                                                                                                                             | አዎ        |
| `check-ui-value-drift` (ኢንላይን)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ምንም የተሻለለ (stale) ትርጉም እንደማይተው                                                                                                               | አዎ        |
| `check-new-key-coverage` (ኢንላይን) | **አዲስ** የእንግሊዝኛ ቁልፍ በእያንዳንዱ locale መተረጎሙን — `__MISSING__:` ምልክት ውድቅ ይደረጋል                                                                                               | አዎ        |
| `check-translation-ratio`        | በእያንዳንዱ locale የእውነተኛ-ትርጉም መጠን (ከእንግሊዝኛ ጋር አንድ-አይነት የሆኑ / placeholder / missing ቅጠሎች ከallowlist ውጭ) ከ`config/quality/i18n-translation-baseline.json` + slack መብለጥ የለበትም | **ማሳሰቢያ** |

`fetch-depth: 0` ያስፈልጋል — የvalue-drift ጌቱ `en.json`ን ከmerge base ጋር diff ያደርጋል።

#### `check-ui-value-drift` — የተሻለለ-ትርጉም ጌት

ሌሎቹ መቆጣጠሪያዎች (gates) መዋቅራዊ ሆነው ማየት የማይችሉትን አንድ የ i18n ውድቀት ይይዛል፦ የእንግሊዝኛ እሴት እንደገና ይጻፋል እና ከ_ቀዳሚው_ እንግሊዝኛ የተገኙት ትርጉሞች ይቀራሉ፣ ስለዚህ እንግሊዝኛ ያልሆኑ ተጠቃሚዎች በእርግጠኝነት የተጻፈ፣ አሁን ግን የተሳሳተ ጽሑፍ ማንበባቸውን ይቀጥላሉ።

ይህ በእውነት ወደ ምርት ወጥቷል። `oauthModal.googleOAuthWarning` የ Antigravity መግቢያ ረዳት ሲመካ (#5203) እንደገና ተጽፏል፤ **ከ43 ቋንቋዎች (locales) 39ቱ** ኦፔሬተሮችን "ሙሉውን URL ቀድተው ከታች ይለጥፉ" የሚል ጽሑፍ ይዘዋል — ለዚያ አቅራቢ ማጠናቀቅ የማይቻል ፍሰት። እስከ #8463 ድረስ ያለ ማስታወስ ቆይቷል ምክንያቱም፦

- `sync-ui-keys` **የሌሉ** ቁልፎችን ብቻ ይሞላል፣ **የደረደሩን** በጭራሽ አይነካም፤
- `check-ui-keys-coverage` የቁልፍ _መኖርን_ ይቆጥራል፣ ስለዚህ የደረደረ ትርጉም እንደተሸፈነ ይቆጠራል፤
- `check-translation-drift` የ `docs/i18n/<locale>/**.md` የሰነድ መዐቀኒዎችን ይከታተላል — `src/i18n/messages/*.json` ፋይሎችን በጭራሽ አያነብም። ከ 2026-09 ዳግም ማመሳሰል ጀምሮ በ `docs-sync-strict` ስራ ውስጥ ማገድ፦ የውስጣዊ ሰነድ ያርትዑ → `npm run i18n:run -- --files=<doc>` (በክፍል-ደረጃ፣ ቀላል ወጪ የሚጠይቅ)።

**በ diff የሚገነዘብ፣ በቤዝላይን የሚደገፍ አይደለም።** `en.json`ን በ merge base ላይ ከሥራ ዛፍ (working tree) ጋር ያወዳድራል፤ የእንግሊዝኛ እሴቱ ለእያንዳንዱ የተቀየረ ቁልፍ፣ ያልተነካ ትርጉም ያለው ማንኛውም locale የደረደረ ነው። ይህ **ቀድሞ የነበረ ዕዳን** በዓላማ **ያቀዝቅዛል** — diff ረጅም ጊዜ የቆየ ትርጉም ከየትኛው አሮጌ እንግሊዝኛ እንደመጣ ማሳየት አይችልም፣ ስለዚህ መቆጣጠሪያው የአሁኑን ለውጥ የሚነካውን ብቻ ይፈርዳል። አማራጩ (በእያንዳንዱ ቁልፍ hash ቤዝላይን) ~600 KB የተፈጠረ ፋይል ያስወጣል፣ ይህም ከትልቁ ካለው ቤዝላይን 3× ነው፣ እና በእያንዳንዱ የ i18n PR ላይ ይለወጣል።

እሱን ለማሟላት ሁለት መንገዶች አሉ፦

1. የተነኩትን ትርጉሞች ያዘምኑ፣ ወይም
2. እነሱን `__MISSING__:<new english>` ያድርጓቸው — ሰሌዳው (runtime) ከዚያ የተስተካከለውን እንግሊዝኛ ያቀርባል (`src/i18n/request.ts::deepMergeFallback`፣ #7258) እና ቁልፉ ለትርጉም በተራ ይገባል።

የሐረጉ **ትርጉም** ከተቀየረ፣ **ቁልፉን ዳግም መሰየምን** ይምረጡ፦ አዲስ ቁልፍ የደረደረ ትርጉም መውረስ አይችልም። ያ #8463 የተጠቀመው ስርዓት ነው።

```bash
npm run i18n:check-value-drift          # ጥብቅ (CI የሚያሂደው)
npm run i18n:check-value-drift:warn     # ሪፖርት ብቻ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

መሠረታዊው ካታሎግ ማንበብ ሲያልቻል (መሠረታዊ ref የሌለው ሸሊው clone) ከ `SKIP reason=base-unresolved` ጋር 0 ይወጣል፣ `check-openapi-breaking`ን በመመስረት።

### ስራ፦ `i18n`

ሙሉ የ i18n ማረጋገጫ ማትሪክስ (በእያንዳንዱ locale አንድ ስራ)። ሙሉው ስራ ምክር ማቅረቢያ ነው።

| ስክሪፕት                           | የሚያረጋግጠው                 | ማገድ                                                  |
| ------------------------------- | ------------------------ | ---------------------------------------------------- |
| `validate_translation.py quick` | የትርጉም ሙላት በእያንዳንዱ locale | **ምክር ማቅረቢያ** (በሙሉው ስራ ላይ `continue-on-error: true`) |

### ስራ፦ `pr-test-policy`

በ pull requestዎች ላይ ብቻ ይሠራል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                     | ማገድ |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --- |
| `check:pr-test-policy` | በ `src/`፣ `open-sse/`፣ `electron/` ወይም `bin/` ውስጥ የምርት ኮድ የሚቀይሩ PRዎች ምርመራዎችን መያዝ ወይም ማዘመን አለባቸው (ጠንካራ ህግ #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የምርመራ ፋይሎች የጠቅላላ assert ብዛት አይቀንሱም ወይም `assert.ok(true)` እራስ-እውነትዎችን አይጨምሩም                            | አዎ  |
| `check:pr-evidence`    | የ PR አካል ለለውጡ የምርመራ/VPS ማስረጃ ይጠቅሳል (ጠንካራ ህግ #18ን በ PR ጽሑፍ ላይ በመፈለግ ያሜካናይዝ ያደርጋል — ደካማ ነው፣ Backlogን ይመልከቱ)    | አዎ  |

### ስራ፦ `test-vitest`

ከ `build` በኋላ ይሠራል። በውድቀት ላይ mergeን ያግዳል።

| ስብስብ             | የሚያረጋግጠው                                                | ማገድ                                                                                  |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP ሰርቨር (110 መሣሪያዎች)፣ autoCombo፣ cache — የ vitest ማስኪያ | አዎ                                                                                   |
| `test:vitest:ui` | የ UI ክፍል ምርመራዎች — የ vitest ማስኪያ                         | **ማገድ** — ቀድሞ የነበሩ ውድቀቶች በ `vitest.config.ts` ውስጥ በግልጽ ተከልክለዋል፤ አዲስ ውድቀቶች ስራውን ያውድቃሉ |

### የማታ የሥራ ፍሰቶች (የተመርጠ ጊዜ፣ ምክር ማቅረቢያ)

እነዚህ በ cron መርሃ ግብር (እና `workflow_dispatch`) ላይ ይሠራሉ፣ በ PRዎች ላይ በጭራሽ አይደለም። ሁሉም ምክር ማቅረቢያ ናቸው።

| የስራ ፍሰት                | የሚያረጋግጠው                                                                                                                         | ማገዻ      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | የ fast-check ንብረት-ተኮር ሙከራዎች በዘፈቀደ ዘር + ከፍተኛ የሩጫ ቆጠራ                                                                              | **ምክራዊ** |
| `nightly-resilience`   | የ heap እድገት በር፣ chaos ስህተት-መርገጫ፣ k6 ጭነት/soak                                                                                     | **ምክራዊ** |
| `nightly-llm-security` | የ promptfoo መርገጫ ጠባቂ (የማገድ ሁነታ) + የ garak መፈተሻዎች (ያለ አቅራቢ ሚስጥር ይዘለላሉ)                                                            | **ምክራዊ** |
| `nightly-schemathesis` | OpenAPI ኮንትራት fuzzing (schemathesis) በሕያው OmniRoute ላይ `docs/openapi.yaml` በመጠቀም — የስፔክ ጥሰቶችን / ያልተሻገሩ 500ዎችን ይገልጣል (Fase 8 B.4) | **ምክራዊ** |
| `nightly-mutation`     | የ Stryker ሚውቴሽን-ሙከራ ነጥብ በፈጣኑ የክፍል መስመር ላይ — የተረፉ ሚውታንቶች ደካማ assertዎችን ይገልጣሉ                                                      | **ምክራዊ** |
| `nightly-compat`       | የ Node ሞተር ተኳሃኝነት ማትሪክስ በሚደገፉት `engines.node` ክልሎች ላይ                                                                            | **ምክራዊ** |

የአፈጻጸም መነሻዎች (heap፣ TTFB፣ የግንባታ ጊዜ) ይመዘገባሉ እንጂ እንደ በር አይቆጠሩም፦ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) ይመልከቱ።

---

## የVelocity ምዕራፍ (2026-08-30 → v4.0 LTS)፦ እያንዳንዱ baseline በ20% ተለሳልሷል

የባለቤቱ ውሳኔ (2026-08-30)፦ እስከ v4.0 modularization ድረስ የማሰራጨት ፍጥነት
የዕዳውን ወሰን ከማስጠበቅ የበለጠ አስፈላጊ ነው። እያንዳንዱ **ቁጥራዊ** ratchet baseline ኦዲት
ሊደረግበት በሚችል አንድ ዙር በ20% ተለሳልሷል፣ ምዕራፉም በ`config/quality/quality-baseline.json` ውስጥ ታውጇል፦

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| የተለወጠው                                                                                                                                                                                        | ቦታ                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ዝቅተኛ መሆኑ የተሻለ የሆኑ ቆጠራዎች ×1.2፣ ከፍተኛ መሆኑ የተሻለ የሆኑ መቶኛዎች ÷1.2 (የcoverage ዝቅተኛ ወሰን 60 እንዳለ ቆይቷል፣ `eslintErrors` 0 እንደሆነ ይቆያል፣ `eslintWarnings` 0 → ከታገደው suppression ቆጠራ 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` ማስታወሻ እያንዳንዱን ከበፊት → በኋላ ይዘረዝራል)                 |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`፣ `testCap`፣ የእያንዳንዱ `frozen[*]` / `testFrozen[*]` የመስመር ገደብ ×1.2                                                                                                                        | `file-size-baseline.json`                                                                              |
| የእያንዳንዱ ፋይል / የእያንዳንዱ TS ኮድ ቆጠራ ×1.2                                                                                                                                                          | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` ሲሆን `--require-tighten` አማካሪ ይሆናል                                                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| የምሽቱ `bank-ratchet-shrinks` ቆሟል (የተለካውን መቀነስ bank በማድረግ headroomን ይቀለብስ ነበር)                                                                                                                  | `.github/workflows/nightly-release-green.yml`                                                          |

Allowlists (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **በጀቶች አይደሉም** እና አልተነኩም። የማለፍ/የመውደቅ የፖሊሲ በሮች (ምስጢሮች፣ የSQL ደንቦች፣
የdocs/env ውል፣ የi18n እኩልነት፣ unit tests) አልተለወጡም — ያልተሳካ ፈተና አሁንም ያልተሳካ ፈተና ነው።

**መሣሪያዎች**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — የአንድ
  ጊዜ ማላላት (`scripts/quality/relax-baselines.mjs`)፤ በተመሳሳይ ማስታወሻ ሁለት ጊዜ ለመስራት ፈቃደኛ አይሆንም።
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI በሚለካበት መንገድ እያንዳንዱን ቁጥራዊ በር ይለካል፣ ለእያንዳንዱ በር የቀረውን headroomም
  ያትማል (`scripts/quality/baseline-headroom.mjs`)። የምሽቱ `baseline-headroom` job
  ሰንጠረዡን በworkflow run ማጠቃለያ ውስጥ ያትማል፣ የJSON/Markdown ሪፖርቱንም
  እንደ `baseline-headroom-<run_id>` ለ90 ቀናት እንዲቆይ ይሰቅላል። የማስጠንቀቂያ እና የከባድ ሁኔታ ረድፎች
  ከcap በ10% ውስጥ ያሉ ወይም አስቀድመው ያለፉ በሮችን ይለያሉ። በጀቶች እየተጠቀሙ ስለመሆናቸው
  እንደ ቅድመ ማስጠንቀቂያ እነዚህን ሪፖርቶች ይገምግሙ፤ ችግሩ ያለበትን በር `_rebaseline_*` ማስታወሻዎች ይመርምሩ። jobው ከአሁን በኋላ
  ቋሚ issue አይፈጥርም ወይም አያዘምንም፤ #12149 የቀድሞውን የሪፖርት ታሪክ ጠብቆ ያቆያል።

**የአዲስ ኮድ ሁነታ (Clean-as-You-Code) — ከ2026-08-30 ጀምሮ፣ ለPR fast-path ብቻ**

በ`pull_request` events ላይ `quality.yml` `--base-ref <PR base SHA>`ን ለ`check:file-size`፣
`check:complexity-ratchets` እና `check:dead-code` ያስተላልፋል። ለ`check:complexity-ratchets` እና
`check:dead-code` በሩ HEADን ከmerge-base ጋር **PRው በነካቸው ፋይሎች ብቻ በመገደብ** ያወዳድራል
(`scripts/check/newCodeMode.mjs`፦ merge-baseው በጊዜያዊ `git worktree` ውስጥ ይፈጠራል፣
ESLint/knip በዚያ እና በHEAD ላይ ይሰራሉ፣ የእያንዳንዱ ፋይል ቆጠራዎችም diff ይደረጋሉ)፦

- **አጋጅ** — PRው በለወጣቸው ፋይሎች ውስጥ cyclomatic/cognitive ጥሰቶችን ወይም dead exportsን ጨምሯል
  (`complexityNewCode=`፣ `cognitiveComplexityNewCode=`፣ `deadExportsNewCode=` በlog ውስጥ)፤
- **አማካሪ** — ዓለም አቀፉ ጠቅላላ ቁጥር ከታገደው baseline ጋር። በውርስ የመጣ drift ምንም ጥፋት የሌለበትን
  PR ፈጽሞ አያወድቅም፤ driftው በrelease reconciliation ወቅት እንደገና ይታገዳል፣ በheadroom jobም ክትትል ይደረግበታል።

`check:file-size` base refን በራሱ ደንቦች ይጠቀማል (`scripts/check/check-file-size.mjs`፣ #8522)፦
በtreeው ውስጥ ያለውን እያንዳንዱን የsource እና test ፋይል ይፈትሻል፣ በPR base ላይ ያለውን የእያንዳንዱን ፋይል የመስመር ቆጠራ
በ`git show` ያነባል፣ እና አንድ ፋይል ከbaseline ጣሪያው
(`frozen` / `testFrozen`፣ ወይም baselineው ውስጥ ላልሆነ ፋይል `cap` / `testCap`) እና ከbase
መጠኑ መካከል ከፍተኛ ከሆነው በላይ ሲያድግ ብቻ ያወድቀዋል። ስለዚህ በbaseው ላይ አስቀድሞ drift ያደረገ ፋይል ምንም ጥፋት የሌለበትን PR ፈጽሞ አያወድቅም።

`check:boundary:ratchet` ተመሳሳይ ደንብን በአንድ ቁጥሩ ላይ ይተገብራል
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`)፦ በPR ክስተቶች ላይ የ`quality.yml` ፈጣን ማጣሪያዎችም ሆኑ የ`ci.yml` lint ሥራ የPR base SHAን ያስተላልፋሉ፤ base commit ከ`git archive` export ይለካል፤ እና PRው የሚወድቀው የ`open-sse → src` edge ብዛቱ ከ`metrics.boundaryOpenSseToSrc` እና ከbaseው ብዛት መካከል ትልቁን ሲያልፍ ብቻ ነው። ከጣሪያው በላይ ያለ base drift (`base drift herdado`) ሪፖርት ይደረጋል፣ ነገር ግን ጥፋት የሌለበትን PR ፈጽሞ አያወድቅም፤ push → main ፍጹም ጣሪያውን እንደያዘ ይቀጥላል፣ እና ሊፈታ የማይችል base SHA ከማስጠንቀቂያ ጋር ወደዚያው ጣሪያ ይመለሳል።

የ`workflow_dispatch` ሂደቶች፣ release-green sweep እና nightly headroom ሥራ የPR base የላቸውም፣ ስለዚህ ፍጹም (ዓለም አቀፍ) ንጽጽሩን እንደያዙ ይቀጥላሉ። Coverage፣ duplication እና type-coverage ለአሁን ዓለም አቀፍ ሆነው ይቆያሉ (መሣሪያዎቻቸው በፋይል ደረጃ diffን በአነስተኛ ወጪ አያመነጩም) — በተመሳሳይ አያያዝ ሊታከሙ የሚችሉ እጩዎች ናቸው።

**ደረጃውን በv4.0 መዝጋት (LTS = ከበፊቱ የበለጠ ጥብቅ፣ "ወደ መደበኛው መመለስ" አይደለም)**

1. በንጹህ የ`release/v4.0.0` የመጨረሻ commit ላይ፦ ለመዝገብ `npm run quality:headroom --json`ን፣ ከዚያም
   `npm run quality:ratchet -- --update`፣ `check:file-size --update`፣
   `check:complexity-ratchets --update`፣ `check:dead-code --update` እና የእያንዳንዱ typecheck gate
   `--update`ን ያሂዱ — እያንዳንዱ baseline ወደተለካው እሴት ይወርዳል።
2. `_policy`ን ከ`quality-baseline.json` ይሰርዙ (`--require-tighten`ን እና nightly
   bankingን እንደገና ያስታጥቃል)፤ በ`check-openapi-coverage.mjs` ውስጥ `THRESHOLD = 36`ን (ወይም ከዚያ በላይ) ወደነበረበት ይመልሱ።
3. Modularization ውጤት ባስገኘባቸው ቦታዎች ከተለካው በላይ ያጥብቁ፦ የfile-size `cap`ን ወደ 1000
   (ወይም 800) ይመልሱ፣ coverage floorsን +5 ያድርጉ፣ ለmodularized packages የdead exports ብዛትን 0 ያድርጉ።

## የRatchet መነሻ መስመር (`quality-baseline.json`)

የratchet ሞተሩ (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json`ን
በማንበብ አዲስ ከተሰበሰበው `quality-metrics.json` ጋር ያነጻጽረዋል። ከየራሱ epsilon
በላይ የሚያሽቆለቁል ማንኛውም መለኪያ buildን እንዲወድቅ ያደርጋል።

በአሁኑ ጊዜ ክትትል የሚደረግባቸው መለኪያዎች፦

| መለኪያ                  | አቅጣጫ   | ትርጉም                             |
| --------------------- | ------ | -------------------------------- |
| `eslintWarnings`      | `down` | የESLint ማስጠንቀቂያዎች ብዛት መጨመር የለበትም |
| `coverage.statements` | `up`   | የstatement coverage መቀነስ የለበትም   |
| `coverage.lines`      | `up`   | የline coverage መቀነስ የለበትም        |
| `coverage.functions`  | `up`   | የfunction coverage መቀነስ የለበትም    |
| `coverage.branches`   | `up`   | የbranch coverage መቀነስ የለበትም      |

እውነተኛ ማሻሻያ ከተደረገ በኋላ መነሻ መስመሩን ለማዘመን፦

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

የ`--update` flag አሁን የተለኩትን እሴቶች ወደ `quality-baseline.json` ይጽፋል።
ይህን ፋይል መለኪያውን ካሻሻለው ለውጥ ጋር አብረው commit ያድርጉ። መነሻ መስመሩን
ሳያዘምን መለኪያን የሚያሻሽል PR በ`--require-tighten` ይያዛል (ደረጃ 6A.5፣
ትግበራው በመጠባበቅ ላይ ነው)።

### የCodeQL ratchet፦ የማደሻ ድግግሞሽ እና በእጅ ማስጀመር

`check:codeql-ratchet` **በጊዜ ሰሌዳ የሚታደሰውን የrepo ሁኔታ እንጂ በእያንዳንዱ PR የሚታደሰውን አያነብም።**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`
`state: configured`፣ `schedule: weekly` የሚል ውጤት ይሰጣል፦ ይህ የGitHub default-setup scan እንጂ
በእያንዳንዱ push የሚካሄድ analysis አይደለም። ውጤቱም፦ alertsን የሚያስተካክል PR merge ከተደረገ በኋላ፣
ቀጣዩ በጊዜ ሰሌዳ የተያዘ scan እስኪካሄድ ድረስ ratchet የቆየውን ከፍተኛ ብዛት ማንበቡን ይቀጥላል፤
ስለዚህ scanው እስኪያዘምን ድረስ በሁሉም ክፍት PR ላይ፣ የማስተካከያው PR ተከታይ ለውጦችንም ጨምሮ፣
ወደኋላ መመለስ እንዳለ ያሳያል።

**በእጅ ማደስ**፦ `gh workflow run codeql.yml --ref release/vX.Y.Z` analysisን እንደገና
ያስኬድና alertsን በደቂቃዎች ውስጥ እንደገና ያትማል። መጀመሪያ `.github/workflows/codeql.yml`ን
ያንብቡ፤ ራስጌው `workflow_dispatch`-ብቻ የሆነው **ከGitHub "default setup" ጋር ስለሚጋጭ**
መሆኑን ያብራራል (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)። የ`push`/`pull_request`/
`schedule` triggersን መልሶ ማስጀመር በመጀመሪያ **የowner እርምጃ** ይፈልጋል፦ Settings → Code security →
CodeQL: Default → Advanced። ያንን ለውጥ ሳያደርጉ `schedule:` trigger አይጨምሩ፤
ውድቀት የሚያጋጥማቸውን runs ብቻ ይፈጥራል።

**ብዛቱ ከቀነሰ በኋላ መነሻ መስመሩን ያጥብቁ**፦ `node scripts/check/check-codeql-ratchet.mjs
--update` አዲሱን የተለካ ብዛት ወደ `quality-baseline.json` →
`metrics.codeqlAlerts.value` ይጽፋል፤ በዚህም ratchet እንደገና ወደ ቀድሞው ከፍተኛ ገደብ
የሚደረግን ወደኋላ መመለስ በዝምታ እንዳይፈቅድ ያደርጋል። የተሰራ ምሳሌ (2026-09-02/03)፦ PR #12502
7 እውነተኛ alertsን አስተካክሏል (13 → 6 የተለኩ ክፍት alerts)፤ PR #12530 ከዚህ ጋር እንዲዛመድ
የቀዘቀዘውን መነሻ መስመር ከ11 → 6 አጥብቋል፤ ቀሪዎቹ 6 alerts ከዚያ በኋላ ለእያንዳንዱ alert
ምክንያት በመመዝገብ እስከ 0 ክፍት alerts ድረስ dismiss ተደርገዋል።

**Dismissals የoperator ውሳኔ ናቸው (ጥብቅ ደንብ #14)**፦ በdismissal አስተያየቱ ውስጥ ቴክኒካዊ
ምክንያቱን ሳይመዘግቡ የCodeQL alertን በፍጹም dismiss አያድርጉ፦ ለupstream-protocol መስፈርት `won't fix`፣
ለtest fixture `used in tests`፣ CodeQL ማየት ለማይችለው sanitizer `false positive`
(ቀዳሚ ምሳሌ፦ `docs/security/ERROR_SANITIZATION.md`)።

---

## የሙከራ ድጋሚ ማስኬጃ ፖሊሲ (WS5.4, v3.8.49)

ድጋሚ ማስኬድ ለእያንዳንዱ runner የተለየ እንጂ አጠቃላይ የሚሸፍን አይደለም — አጠቃላይ ድጋሚ ማስኬድ እውነተኛ የኋሊት መመለሶችን
ወደማይታዩ አልፎ አልፎ የሚከሰቱ ውድቀቶች ይቀይራቸዋል፦

| Runner           | ፖሊሲ                                                                                                        | ምክንያቱ                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | በCI ውስጥ ብቻ `retries: 1`፣ ከ`trace: on-first-retry` ጋር                                                       | የአሳሽ/አውታረ መረብ ጊዜ በእውነት የማይወሰን ነው፤ አንድ ድጋሚ ማስኬድ ከtrace ጋር አልፎ አልፎ የሚከሰት ውድቀትን ሊመረመር ወደሚችል artifact ይቀይረዋል |
| Vitest           | አጠቃላይ ድጋሚ ማስኬድ የለም። አልፎ አልፎ እንደሚወድቅ የተረጋገጠ ሙከራ ግልጽ የሆነ ለሙከራው-ብቻ ድጋሚ ማስኬጃ ያገኛል (በdiff ውስጥ የሚታይ፣ በPR የሚገመገም) | የለይቶ ማቆያ ዝርዝሩን በrepo ውስጥ ያቆየዋል፣ በፍጹም ድብቅ አይሆንም                                                           |
| node:test (unit) | በፍጹም ድጋሚ ማስኬድ የለም                                                                                          | አልፎ አልፎ የሚወድቅ unit test በሙከራው ውስጥ ያለ bug ነው — ያስተካክሉት፣ እንደገና በዕድል አያስኬዱት                                 |

የአልፎ አልፎ ውድቀት telemetry ከተተገበረ በኋላ የሚፈለጉ SLOs (WS5.2/5.3)፦ ለእያንዳንዱ ሙከራ <1% የአልፎ አልፎ ውድቀት መጠን
("አሁን አስተካክል" ገደብ)፣ ለእያንዳንዱ pipeline ≥95% የማለፍ መጠን። የኢንዱስትሪ ማጣቀሻ እሴቶች —
በራሳችን መለኪያዎች መሠረት እንደገና ይስተካከሉ።

## በልቀት ደረጃ የRatchet መዛባት (WS5.5, v3.8.49)

አንድ ratchet (የፋይል መጠን፣ ውስብስብነት፣ eslint ማስጠንቀቂያዎች) በንጹሕ የልቀት
ጫፍ ላይ ወደኋላ ሲመለስ — ማለትም የmergeዎች **ጥምረት** ወደኋላ እንዲመለስ አድርጎታል፣ እና የትኛውም ነጠላ PR በራሱ branch ላይ
የኋሊት መመለሱን አያስከስተውም — ማስተካከያው የ**release captain ሲሆን፣ አንድ ጊዜ፣ በ
release branch ላይ** መደረግ አለበት፦ extraction/refactorን ይምረጡ፤ rebaseline ማድረግ ያለበት በሰነድ የተመዘገበ
የማስረጃ ግቤት ካለ ብቻ ነው። የጥምረት መዛባትን በአበርካች PR ላይ በፍጹም አይጫኑ፣ እና
ለእያንዳንዱ PR rebaseline በፍጹም አያድርጉ (ያ እውነተኛ የኋሊት መመለሶችን ይደብቃል)። መጀመሪያ ለይተው ይወቁ፦ PRዎ እንዳስከተለው ከመገመትዎ በፊት በprobe worktree ውስጥ
በንጹሑ ጫፍ ላይ ቀዩን ውጤት እንደገና ያስከስቱ።

## የRatchet መቀነሶችን ማከማቸት — ወደታች ያለው አቅጣጫ (#8584)

ratchet በግማሽ ብቻ አውቶማቲክ ነው፣ እሱም የተሳሳተው ግማሽ ነው። capን **ማሳደግ**
አሥር ሰከንድ የሚወስድ በእጅ የሚደረግ JSON አርትዖት ሲሆን ቀይ PRን ለመክፈት ፈጣኑ መንገድ ነው።
አንዱን **መቀነስ** ግን አንድ ሰው `--update`ን አስኪዶ ውጤቱን commit እንዲያደርግ ይጠይቃል — እና
የ`bank-ratchet-shrinks` job እስኪተገበር ድረስ ይህን የሚያስኬድ workflow አልነበረም። የተለካው ውጤት
(2026-07-25)፦ 18 frozen ፋይሎች አስቀድመው ከ800-line የአዲስ ፋይል cap ጋር እኩል ወይም ከዚያ በታች ሲሆኑ፣ ከሁሉ የከፋው
በ132× (`src/shared/validation/schemas.ts`፣ 19 መስመሮች 2,523 capን የተሸከሙ) ነበር፤
የውስብስብነት ጣሪያው በ~37 rebaseline ማስታወሻዎች ውስጥ `1794 → 2169` ከፍ አለ፣ በትክክል አንድ
መቀነስ (−1) ብቻ ነበረው፤ እና "በቀጣዩ ዙር በ`--update` አጥብቅ" 31 ጊዜ ተጽፎ አንድ ጊዜ
ብቻ ተከበረ። ያስገኘው ኮድ ከጠፋ በኋላም የሚቆይ cap እያንዳንዱን የተጠናቀቀ decomposition በጸጥታ
ቀጥሎ ፋይሉን ለሚያርትዕ ሰው የዕድገት ፈቃድ ያደርገዋል።

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ያንን ዑደት ይዘጋል፦

|          |                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------- |
| የሚሰራበት   | `schedule` (3×/day) + `workflow_dispatch` — ሆን ተብሎ **`push` አይደለም**                            |
| የሚለካው    | ከፍተኛውን `release/vX.Y.Z`፣ ከ`release-green` ጋር ተመሳሳይ resolution + injection guard                |
| የሚጽፈው    | `check:file-size --update` እና `check:complexity-ratchets --update` (ሁለቱም በአወቃቀራቸው መቀነስ-ብቻ ናቸው) |
| የሚያረጋግጠው | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                       |
| የሚልከው    | አንድ ሁልጊዜ-ወቅታዊ PR ወደ release branch — በግድ የሚዘምን፣ በፍጹም spam የማይደረግ                               |

ማከማቸቱ ለእያንዳንዱ push ከመሆን ይልቅ በቡድን ይከናወናል፤ ምክንያቱም የlatency መስፈርት የለውም (በ8h ውስጥ
የተከማቸ መቀነስ በቂ ነው)፣ ለእያንዳንዱ merge ማስኬድ ግን በmerge ዘመቻዎች ወቅት PR branchን ደጋግሞ
እንደገና ይገነባ እና በእያንዳንዱ ጊዜ ለሙሉ ESLint ማለፊያ ወጪ ይከፍላል። ማግኘቱ በ
push (`release-green`) ላይ ይቆያል፤ በቡድን የሚከናወነው ማከማቸቱ ብቻ ነው።

### የደህንነት አረጋጋጭ

jobው ያለ ክትትል ወደ baselines ይጽፋል፣ ስለዚህ `verify-ratchet-bank.mjs` ይህን
ተቀባይነት ያለው ያደርገዋል። ከ`--update` በኋላ ያለውን tree ከ`HEAD` ጋር diff ያደርጋል፣ እና እያንዳንዱ ለውጥ
ከሚከተሉት አንዱ ካልሆነ **ምንም commit ከመኖሩ በፊት jobውን ያቋርጣል** — ምንም PR አይከፍትም፦

- የ`frozen` / `testFrozen` ቁጥራዊ ግቤት **የተቀነሰ** ወይም **የተወገደ**
- `complexity-baseline.json` → `count` **የተቀነሰ**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **የተቀነሰ**

ሌላ ማንኛውም ነገር ያወድቃል፦ ቁጥር ማሳደግ፣ ግቤት መጨመር፣ `cap`/`testCap`ን መቀየር፣ ወይም
የ`_rebaseline_*` ማስታወሻን መሰረዝ/እንደገና መጻፍ (እነዚያ ማስታወሻዎች እያንዳንዱ ጣሪያ ለምን
እንደሚኖር የሚገልጹ የኦዲት ዱካዎች ሲሆኑ ከፋይል ግቤቶቹ ጋር በተመሳሳዩ `frozen` object ውስጥ ይቀመጣሉ)።
capን ማሳደግ የሚችል bot ከአሁኑ ሁኔታ በእጅጉ የከፋ ይሆናል። የኋሊት መመለስ
መከላከያ፦ `tests/unit/verify-ratchet-bank.test.ts`።

jobው ወደ `release/*` በፍጹም push አያደርግም — PRን የሚያዋህደው ሰው ነው፣ ስለዚህ የተሳሳተ መለኪያ
ሳይገመገም ሊገባ አይችልም።

## የAllowlist ፖሊሲ

ቀድሞ በነበሩ ጥሰቶች ምክንያት ሊወድቅ የማይችል እያንዳንዱ gate የተወሰነ allowlist
ይጠቀማል (ለምሳሌ፣ `KNOWN_STALE_DOC_REFS`፣ `KNOWN_MISSING`፣ `KNOWN_RAW_SQL`)። ፖሊሲው፦

**ዋናውን መንስኤ ያስተካክሉ፤ allowlistን ጥሰቱ ቀድሞ የነበረ እና
በዚያው PR ውስጥ ሊስተካከል የማይችል ከሆነ ብቻ ይጠቀሙ።**

ወደ allowlist ግቤት ሲጨምሩ፦

1. ምክንያቱን የሚያብራራ አስተያየት ያካትቱ።
2. የክትትል issueውን ይጥቀሱ (ለምሳሌ፣ `// #3498 — የደረጃ 2 ባህሪ፣ እስካሁን አልተተገበረም`)።
3. ጥሰቱን በሚያስተካክለው PR ውስጥ ግቤቱንም ያስወግዱ — ንቁ ጥሰትን ከእንግዲህ
   የማይገታ ያረጀ ግቤት በራሱ ጉድለት ነው (6A.3 stale-enforcement ከተተገበረ በኋላ
   ባለቤት በሌለው allowlist ግቤት ምክንያት gateውን ያሳክታል)።

ሙከራዎችን በፍጥነት ለማሳለፍ የallowlist ግቤቶችን **አይጨምሩ**። እያደገ ያለ allowlist ያለው
አረንጓዴ gate ስለ ጥራት የተሳሳተ እምነት ይፈጥራል።

### በእርስዎ PR ላይ gate ሲወድቅ

1. **የgateውን ውጤት በጥንቃቄ ያንብቡ** — ደንቡን የጣሰው የትኛው ፋይል ወይም symbol እንደሆነ
   በትክክል ይነግርዎታል።
2. **ጥሰቱን ያስተካክሉ** — አብዛኞቹ gates ኮዱ ትክክል እንደሆነ
   የሚያልፉ ተወስነው የሚሠሩ የfilesystem ፍተሻዎች ናቸው።
3. **ጥሰቱ ቀድሞ የነበረ ከሆነ** (ማለትም፣ እርስዎ ያላስገቡት ነገር ግን gateው አሁን
   የሚሸፍነው ከሆነ)፦ የምክንያት አስተያየት እና የክትትል issue ያለው የallowlist ግቤት ያክሉ።
4. **gateው ratchet ከሆነ** (coverage፣ ESLint warnings፣ duplication፣ complexity)፦
   ለውጥዎ መለኪያውን አባብሶታል። መሠረታዊውን ችግር ያስተካክሉ፣ ወይም (አልፎ አልፎ) ለውጡ
   ሆን ተብሎ የተደረገ እና የመለኪያው መቀነስ ተቀባይነት ያለው ከሆነ
   `npm run quality:ratchet -- --update`ን ያስኪዱ — ነገር ግን ምክንያቱን በPR መግለጫው ውስጥ ይመዝግቡ።
5. **የምክር gates** (`continue-on-error: true`) ለመረጃ ብቻ ናቸው — mergeን አያግዱም፣
   ነገር ግን በCI ማጠቃለያው ውስጥ ይታያሉ። ሆኖም ያስተካክሏቸው።

---

## አዲስ Gate ማከል

1. `scripts/check/check-<name>.mjs`ን (ወይም `.ts`) ይፍጠሩ። የፖሊሲ gates በ0/1 ይወጣሉ።
   Ratchet-style gates `collect-metrics.mjs`ን በመጠቀም መለኪያን ወደ `quality-metrics.json` ያስገባሉ።
2. `"check:<name>": "node scripts/check/check-<name>.mjs"`ን ወደ `package.json` ያክሉ።
3. በተገቢው job ስር በ`.github/workflows/ci.yml` ውስጥ ያገናኙት
   (policy → `lint` ወይም `docs-sync-strict`፤ ratchet → `quality-gate`)።
4. allowlist ካለው፣ ያረጁ ግቤቶች በራስ-ሰር እንዲገኙ
   `reportStaleEntries()`ን ከ`scripts/check/lib/allowlist.mjs` ይተግብሩ።
5. የgateውን የማግኘት ሎጂክ የሚሸፍን ሙከራ በ`tests/unit/build/` ውስጥ ይጻፉ።
6. ይህን ሰነድ ያዘምኑ (ወደ ተገቢው የjob ሰንጠረዥ አንድ ረድፍ ያክሉ)።

---

## የAgent መሣሪያዎች፦ LSP-in-the-loop (opt-in)

ከCI gates በተጨማሪ፣ OmniRoute **opt-in** የሆነ `agent-lsp` scaffold
(በፕሮጀክት ደረጃ ያለ `.mcp.json`፣ Fase 7 Task 15) ይዞ ይመጣል። TypeScript language serverን ለcoding agents ለማጋለጥ `.mcp.json`ን
ይፍጠሩ፤ ይህም ኮድ ከመጻፋቸው **በፊት** symbols /
diagnosticsን እንዲፈቱ ያደርጋል — የ"የተፈጠረ symbol" ስህተቶችን ከመነሻቸው የሚቀንስ፣
ከ`typecheck:core` ጋር የሚሠራ compile-before-claim አጋዥ ነው። ሆን ተብሎ
በራስ-ሰር እንዳይጫን ተደርጓል (የMCP↔LSP bridgeን እርስዎ ይመርጣሉ እና ያረጋግጣሉ)፤ የተበላሸ ግቤት የግንኙነት
ስህተትን ብቻ ይመዘግባል እንጂ sessionsን ፈጽሞ አያቋርጥም።

---

## የምክንያታዊ ማድረግ የኋላ ዝርዝር (የROI ግምገማ — ደረጃ 9 ሞገድ 3)

ይህ ንብረት ዝርዝር በ2026-06-17 ከ`ci.yml` ጋር ተመሳክሯል (ቀዳሚው ስሪት
`audit:deps`፣ `check:tracked-artifacts`፣ `check:lockfile`፣ `check:licenses`፣
`check:dead-code`፣ `check:cognitive-complexity`፣ `check:type-coverage`፣
`check:codeql-ratchet`፣ `check:pr-evidence`ን አላካተተም ነበር)። የተመሳከረው ስብስብ የROI ግምገማ
የሚከተሉትን የምክንያታዊ ማድረግ ዕጩዎች ለይቷል። **ውህደቶቹ መካኒካዊ የCI
ለውጦች ናቸው፤ መቀየር/ማስወገድ ውሳኔዎቹ ለኦፕሬተሩ የተተዉ የፖሊሲ ውሳኔዎች ናቸው።** ከታች ካሉት ውስጥ
እስካሁን የተተገበረ የለም።

**ከላይ ያልተመዘገቡ ተጨማሪ ነገሮችም** (አማካሪ፣ ዝቅተኛ ምልክት)፦ የ`docs-lint` ሥራ
(markdownlint + Vale፣ ሙሉው ሥራ `continue-on-error`) እና ራሳቸውን የቻሉ የስካነር የሥራ ፍሰቶች
`semgrep.yml` / `codeql.yml` / `scorecard.yml`። `semgrepFindings: 0` በ
`quality-baseline.json` ውስጥ አለ፣ ነገር ግን በ`ci.yml` ውስጥ ከሚያግድ ራቼት ጋር አልተገናኘም — መለኪያው
በአሁኑ ጊዜ ወላጅ አልባ ነው።

### ማዋሃድ / ብዜት ማስወገድ (መካኒካዊ፣ ዝቅተኛ አደጋ)

እያንዳንዱ ዕጩ በ2026-06-17 በነበረው የቀጥታ ጌት ሁኔታ ላይ ተረጋግጧል (እመን-ግን-አረጋግጥ)፤
በርካታ "ግልጽ" የሚመስሉ ውህደቶች ዕዳን እንደሚደብቁ ታውቋል እና **ንጹሕ** ቀጥተኛ ምትኮች አይደሉም።

- **`check:docs-sync` ሁለት ጊዜ ይሰራል** — በ`lint` ሥራ ውስጥ ራሱን ችሎ እና እንደገና በ`check:docs-all` (`docs-sync-strict`) ውስጥ እንዲሁም በhusky pre-commit hook ውስጥ። ✅ **ተጠናቋል** — ራሱን የቻለው የ`lint` ጥሪ ተወግዷል።
- **የCVE ቅኝት** — ❌ **ንጹሕ ውህደት አይደለም።** `audit:deps` በማንኛውም high/critical CVE ላይ በጥብቅ ይወድቃል፤ `check:vuln-ratchet` (osv) የሚወድቀው ከመነሻ መስመሩ ጋር ሲነጻጸር _መመለስ_ ሲኖር ብቻ ነው (በአሁኑ ጊዜ 1 MODERATE)። የተለያየ ትርጉም አላቸው — `audit:deps`ን ማስወገድ ፍጹሙን high/critical ጌት ያሳጣል። ሁለቱንም አቆዩ።
- **የዑደት ማወቂያ** — ✅ **ተጠናቋል** (#15159 G-01/G-02)። እዚህ የነበረው የድሮ ጽሑፍ `check:cycles`ን "አረንጓዴው፣ በጥንቃቄ የተመረጠው" ጌት ብሎ ጠርቶታል እና `check:circular-deps` (dpdm) 91 ዑደቶችን ስለዘገበ እንደ አጋጅ መቆየቱን አጽድቋል። ያ አረንጓዴ ውጤት **ሐሰተኛ አረንጓዴ** ነበር፦ `check:cycles` 5 ንዑስ ማውጫዎችን (450 ፋይሎች) ቃኝቷል፣ static `import|export … from`ን ብቻ አዛምዷል፣ እና እያንዳንዱን `@/` እና `@omniroute/open-sse/` specifier አስወግዷል፤ ስለዚህ በrepoው ውስጥ የበዙትን dynamic-import + alias ዑደቶች ማየት አልቻለም። ተስተካክሏል፦ ጌቱ አሁን `src` + `open-sse`ን (5023 ፋይሎች) ያስሳል፣ specifierዎችን ከTypeScript AST ይሰበስባል (ስለዚህ `import("…")` ይቆጠራል እና በtype-position ያለ `typeof import("…")` አይቆጠርም)፣ እንዲሁም የtsconfig `paths`ን ይፈታል። 0 ሳይሆን **14** ዑደቶችን ያገኛል። ቀድሞ የነበሩት 14 ዑደቶች በጌት PR ውስጥ ሊስተካከሉ ስለማይችሉ፣ `check:cycles` አሁን **ራቼት** ነው (`--ratchet`፣ በ`quality-baseline.json` ውስጥ ጣሪያው `metrics.cycles.value = 14`፣ `direction: down`) — ማንኛውንም _መመለስ_ ያግዳል እና ቁጥሩ መቀነስ ብቻ ይችላል። CI `npm run check:cycles:ratchet`ን ያስኬዳል። ቀስ በቀስ የማጥፋት ሥራው ከ**A-01** ጋር ይከናወናል። `check:circular-deps` (dpdm) እንደ ሰፊ ሁለተኛ አስተያየት አማካሪ ሆኖ ይቆያል።
- **ውስብስብነት** — ✅ **ተጠናቋል** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`)፦ አንድ የESLint ቅኝት፣ cyclomatic+max-lines እና cognitive መነሻ መስመሮች እርስ በርሳቸው ነጻ ሆነው እንዲቆዩ በruleId ይቆጥራል፤ የተናጠል `check:complexity` / `check:cognitive-complexity` ለአካባቢያዊ `--update` ይቆያሉ።
- **የ`/api` ፀረ-ቅዠት** — ✅ **ተጠናቋል** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`)፦ አንድ የ`src/app/api` FS ንብረት ዝርዝር፣ openapi-routes + docs-symbols አሁንም በተናጠል ሪፖርት ያደርጋሉ፤ የተናጠል ስክሪፕቶቹ ለአካባቢያዊ ማስኬዶች ይቆያሉ።
- **`check:node-runtime` በ11 ሥራዎች ውስጥ ይሰራል** — ⚠️ **ዝቅተኛ ROI።** እያንዳንዱ የተለየ runner ነው እና ፍተሻው <1s ነው፤ ጠቅላላ ቁጠባው ~10s ነው፣ በምላሹ ግን ርካሽ የየሥራውን ጥበቃ ማጣት ይኖራል። የለውጥ ውጣ ውረዱን አያዋጣም።
- **በCI lint ላይ `typecheck:noimplicit:core`** — ✅ **ከlint ሥራ ተወግዷል** (አማካሪ `continue-on-error` ነበር)፤ አጋጁ የtype ወሰን `typecheck:core` + `check:type-coverage` ነው። አካባቢያዊ ስክሪፕቱ ተቀምጧል።

### መቀየር / መወሰን (የኦፕሬተር ፖሊሲ)

- `check:openapi-security-tiers` (አማካሪ) — ❌ **በንጽሕና ሊቀየር አይችልም።** በ0 ይወጣል፣ ነገር ግን በ`LOCAL_ONLY_API_PREFIXES` ስር ያሉ በርካታ `traffic-inspector` መስመሮች የ`x-loopback-only: true` ማብራሪያ እንደሌላቸው ያስጠነቅቃል። ማስገደድ በመጀመሪያ እነዚያን ማብራሪያዎች ወደ`openapi.yaml` መጨመርን ይጠይቃል።
- `typecheck:noimplicit:core` (አማካሪ) — በአብዛኛው በአጋጁ `check:type-coverage` ራቼት ውስጥ ተካቷል። ወደ ራቼት ይቀየር ወይም ተደጋጋሚው ሁለተኛ የ`tsc` ማለፊያ ይወገድ።
- `test:vitest:ui` (አሁን **አጋጅ**) — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በ`// #8618` የክትትል አስተያየቶች በግልጽ ተገልለዋል፤ አዲስ ውድቀቶች ሥራውን ያወድቃሉ።
- `check:secrets` (gitleaks፣ በ3 የተመዘገቡ ሐሰተኛ-አዎንታዊ ውጤቶች ላይ የቀዘቀዘ አጋጅ ራቼት) — 0 ላይ ለመድረስ 3ቱን allowlist ውስጥ ያስገቡ፣ ወይም ወደ አማካሪ ዝቅ ያድርጉት። ከGitHub ቤተኛ secret-scanning + `check:public-creds` ጋር ይደራረባል።
- `check:pr-evidence` (አጋጅ፣ የPR-body ስድ ንባብን በgrep ይፈልጋል) — ከፍተኛ የሐሰት-አዎንታዊ አደጋ አለው፤ ከተወገደ የHard Rule #18 ማስፈጸሚያን ያዳክማል፣ ስለዚህ ይህ እውነተኛ የፖሊሲ ውሳኔ ነው።
- `semgrep` (ራሱን የቻለ አማካሪ) — ለOWASP ቤተሰቦች ከCodeQL ጋር ይደራረባል፤ መነሻ መስመሩን ከራቼት ጋር ያገናኙ ወይም ያስወግዱት።

---

## ተዛማጅ ሰነዶች

- የአቅርቦት ሰንሰለት (provenance፣ SBOM፣ Trivy፣ Scorecard)፦ [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — የቁልፍ-ስብስብ እኩልነት መቆጣጠሪያ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`፣ job `i18n-ui-coverage`)።
የእያንዳንዱን `src/i18n/messages/<locale>.json` የመጨረሻ ደረጃ ቁልፍ ስብስብ ከ`en.json` ጋር ያነጻጽራል፣ እና
ቁልፉ መቼ እንደታከለ ሳይመለከት በማንኛውም የጎደለ ወይም ተጨማሪ የመጨረሻ ደረጃ ቁልፍ ላይ ይወድቃል። `__MISSING__:` ቦታ-ያዥ ምልክቶች
እንዳሉ ይቆጠራሉ (ይዘታቸው የሬሾ መቆጣጠሪያው ጉዳይ ነው)። ይህ በልዩነት/መቶኛ ላይ የተመሠረቱትን
ሁለት መቆጣጠሪያዎች ሙሉ በሙሉ ያሟላል፦ `check-ui-keys-coverage` ለእያንዳንዱ
locale የ80 % ዝቅተኛ ገደብ ያስፈጽማል (ከ~13,000 ውስጥ 43 ቁልፎች ቢጎድሉም አሁንም 99.7 % ይነበባል)፣ እና `check-new-key-coverage`
PR ወደ `en.json` የሚያክላቸውን ቁልፎች ብቻ ይገመግማል። የlocale ቡድን ቅርንጫፉ በተፈጠረበት ቀን ካለው `en.json`
የሚመነጭ ሲሆን፣ base አዳዲስ ቁልፎችን ማከሉን ሲቀጥል ለቀናት ትርጉም ያከናውናል፤ የቡድኑ PR ራሱ
ምንም ቁልፍ አይጨምርም፣ ስለዚህ batch 1 (#13044) በዘጠኝ locales 43 ቁልፎች ጎድለውት
እና batch 2 (#13660) በስምንት locales 10 ቁልፎች ጎድለውት ሲዋሃዱ (2026-09-15) ሁለቱም ተዛማጅ መቆጣጠሪያዎች ዝም ብለው ቀርተዋል። ቀይ ስህተትን በ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ያስተካክሉ፤ `extra` የመጨረሻ ደረጃ ቁልፍ
ምንጩ እንዳስወገደው ያመለክታል — ከlocale ይሰርዙት። `--warn` ሳያወድቅ ሪፖርት ያደርጋል።
`--catalog=cli` በ`bin/cli/locales` ላይ ተመሳሳዩን ንጽጽር ያካሂዳል (`npm run i18n:check-keys:cli`)፤
ሁለቱም ደረጃዎች በjob `i18n-ui-coverage` ውስጥ ይገኛሉ።

#### `check-new-key-coverage` — የአዲስ-ቁልፍ i18n መቆጣጠሪያ

የ`check-ui-value-drift` ተዛማጅ መቆጣጠሪያ ነው። ያኛው፣ ትርጉሞቹ ሳይዘምኑ የቀረ የእንግሊዝኛ እሴት **እንደገና ሲጻፍ**
ይለያል፤ ይህኛው ደግሞ አንዳንድ locales ሳይቀበሉት የቀረ የእንግሊዝኛ ቁልፍ **ሲታከል**
ይለያል።

`check-ui-keys-coverage` ይህን ዓይነት ማየት አይችልም፦ ለእያንዳንዱ locale የመቶኛ ዝቅተኛ ገደብ ያስፈጽማል፣ እና
ከ~13,000 የመጨረሻ ደረጃ ቁልፎች ውስጥ አሥራ አንዱ ቢጎድል ሽፋኑ 99.9% ሆኖ ይቀራል። የእያንዳንዱ ቋንቋ መቶኛ
“ይህ ባህሪ ሳይተረጎም ተለቀቀ” የሚለውን መግለጽ አይችልም — አንድ ሙሉ ባህሪ ምንም
ጽሑፍ ሳይኖረው በአዲስ locale ውስጥ ሊገባ እና ቁጥሩን ፈጽሞ ላይቀይር ይችላል።

ይህ የሚወክለው ክስተት፦ የOrchestration Canvas Phase 3 አሥራ አንዱን ቁልፎች በወቅቱ
በነበሩት 42 locales ተርጉሟል። ከሰዓታት በኋላ የEU-ቋንቋ ቡድን (#13044) repoውን
ወደ 51 locales አሳደገ፣ እና ዘጠኙ አዲስ ገቢዎች (`el`፣ `et`፣ `ga`፣ `hr`፣ `lt`፣ `lv`፣ `mt`፣ `sl`፣ `sr`)
እነዚህን ፈጽሞ አልተቀበሉም። `deepMergeFallback` በጎደለ ቁልፍ ምትክ እንግሊዝኛን ያስገባል፣ ስለዚህ የብልሽቱ ሁኔታ
ባዶ UI ሳይሆን ያልተተረጎመ UI ነበር — እውነተኛ፣ እና በአወቃቀሩ ምክንያት ዝምተኛ።

እንደ ተዛማጅ መቆጣጠሪያው ይህም **ልዩነትን የሚያውቅ** ነው፤ በmerge base ላይ ያለውን እንግሊዝኛ ከworking
tree ጋር ያነጻጽራል፣ ስለዚህ ቀድሞ የነበሩ ክፍተቶች ባሉበት ይቆያሉ እና መቆጣጠሪያውን ለማብራት ምንም migration አላስፈለገም።

**የ`__MISSING__:<english>` ምልክት መስፈርቱን አያሟላም (ከ2026-09-17 ጀምሮ)።** ቀደም ሲል በሰነድ የተገለጸው
የማዘግየት ዘዴ ነበር — runtimeው ወደ ትክክለኛው እንግሊዝኛ ይመለሳል — ነገር ግን በ
2026-09-16 ስምንት የባህሪ PRs 61 ቁልፎችን አክለው ከመተርጎም ይልቅ ምልክቱን በሁሉም 65 locales ውስጥ
አስገብተዋል፦ ይህ መቆጣጠሪያ ሁሉንም ተቀብሏል፣ PRsን ምንም ነገር አላገዳቸውም፣ እና ማገጃው የእውነተኛ-ትርጉም ሬሾ መቆጣጠሪያ
በመቀጠል በrelease tip ላይ ለሁሉም ወደቀ (pt-BR 3.2 % > 2.5 % + 0.5)። አሁን ምልክት
እንደጎደለ ትርጉም ይቆጠራል። ቀይ ስህተትን በ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`፣ ወይም
ሁሉንም locales በአንድ ጊዜ በ`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`፣
detached-safe፣ ያለ `OMNIROUTE_TRANSLATION_*` env መጀመርን የሚከለክል) ያስተካክሉ። በእንግሊዝኛ መቆየት ያለበት
ቁልፍ (የተወሰነ የምርት/engine/flag ስም) በ`scripts/i18n/untranslatable-keys.json` ውስጥ መኖር አለበት፣
ከምልክት ጀርባ ፈጽሞ መሆን የለበትም። `vi` ምልክቶችን ሙሉ በሙሉ ይከለክላል (`tests/unit/i18n-vi-completeness.test.ts`)።

#### `check-vitest-exclusions` — የታገዱ-ፈተናዎች መቆጣጠሪያ

በ`vitest.config.ts` `exclude` ዝርዝር ውስጥ ያለ ፋይል የማይሠራ ፈተና ነው፣ እና treeውን ለሚያነብ ሰው
ሽፋን ያለ ይመስላል። ስልሳ ሁለት ፋይሎች
`// #8618 — ቀድሞ የነበረ ውድቀት፤ ሲስተካከል ይህን exclusion ያስወግዱ` ከሚለው አስተያየት ጀርባ ተከማቹ። Issue #8618 በ
2026-08-11 ተዘግቷል፣ እሱ የሚከታተለው ዝርዝር ግን ከ45 ግቤቶች ወደ 62 አደገ፤ እያንዳንዱ አዲስ ግቤት
ወደተዘጋ issue የሚያመለክት አስተያየት ወርሷል። በመጨረሻ ዝርዝሩ ፋይል በፋይል ሲለካ (#13204)፣ **ከ62ቱ 51ዱ
ምንም የsource ለውጥ ሳይደረግ በአሁኑ tree ላይ አልፈዋል**።

መቆጣጠሪያው ወደ እውነተኛ ፋይል የሚያመለክት እያንዳንዱ exclusion (a) የመከታተያ issue እንዲጠቅስ እና
(b) ከተለካው ሁኔታው ጋር በ`config/quality/vitest-exclusions.json` ውስጥ እንዲታይ ይጠይቃል፤ ስለዚህ አንድ መጨመር
በ60-ግቤት array ውስጥ ሌላ አንድ መስመር ከመሆን ይልቅ በተለየ ፋይል ውስጥ ሊገመገም የሚችል diff ይሆናል። ሆን ብሎ
የተገለሉትን ፈተናዎች እንደገና አያስኬድም — ይህ ~10 ደቂቃዎችን ይወስዳል እና በየጊዜው በሚሠራ job ውስጥ መከናወን አለበት፤
inventoryው እያንዳንዱ ለመጨረሻ ጊዜ መቼ እንደተለካ ይመዘግባል።
