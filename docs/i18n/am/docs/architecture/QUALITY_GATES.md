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

## የጌት ዝርዝር እና የአፈጻጸም መገለጫዎች

### የእጩ ተቀባይነት

የCI እና Quality Gates የሥራ ፍሰቶች እያንዳንዳቸው የማይለዋወጥ ውሳኔ ያወጣሉ፦ `Gate / CI` እና
`Gate / Quality`። በስሪት የተቆጣጠረው የተቀባይነት ፖሊሲያቸው እያንዳንዱን የላይኛው ደረጃ ሥራ
እንደ አስፈላጊ ወይም አማካሪ ይዘረዝራል። ተፈጻሚ የሆነ አስፈላጊ ሥራ መሳካት አለበት፦ የጠፋ፣
የተሰረዘ፣ የታለፈ፣ በመጠባበቅ ላይ ያለ እና ያልታወቀ ውጤት PASS መሆኑን ሊያረጋግጥ አይችልም። ትክክለኛ
docs-only ወይም catalog-only ምደባ የኮድ መስመርን ተፈጻሚ ያልሆነ ሊያደርገው ይችላል፤
ረቂቅ PR ተቀባይነት ያለው እጩ አይደለም። የ`hotfix` መለያ ማስረጃን አያስቀርም።

ሁለቱም የሥራ ፍሰቶች ወደ main/release ቅርንጫፎች የሚገቡ PR-ዎችን፣ ወደ `main` የሚደረጉ pushes፣ በእጅ ማስነሳትን
እና የmerge-group ክስተቶችን ይሸፍናሉ። Push፣ dispatch እና merge-group ሙሉውን ምርጫ ያስኬዳሉ። ወደ
`release/**` የሚደረጉ Pushes አያስጀምሯቸውም (2026-10-18)፦ እያንዳንዱ ለውጥ ማትሪክሱን በPR-ው ላይ አስቀድሞ አስኪዷል
እና የተዋሃደው ጥምረት የRelease-Green ሥራ ነው (`docs/ops/RUNNER_BOX.md` → Hosted lane)። Forks
እና merge groups በሌላ ሁኔታ self-hosted runnersን ለሚመርጡ ሥራዎች hosted runnersን ይጠቀማሉ፤ ከማሰማራት በፊት
በቂ hosted አቅም መኖሩ መረጋገጥ አለበት።

መደበኛ PR ፈጣን ምርጫውን ያስኬዳል። የተቀባይነት ፖሊሲው `full-code` እና `full-code-e2e` መስመሮች
(E2E፣ integration፣ package artifact፣ Electron smoke፣ Bun SQLite፣ ecosystem
እና protocol clients) የሚካሄዱት በMergify queue ረቂቅ ላይ ወይም በሙሉ ማስኬድ ብቻ ነው፦
`gh workflow run ci.yml --ref <branch>`።

### የማዋሃድ ወረፋ

የ`queue` መለያ PR-ን ወደ Mergify queue (`.mergify.yml`) ይልካል። Mergify በ
`mergify/merge-queue/` ቅርንጫፍ ላይ ረቂቅ PR ይከፍታል፣ CI ሙሉውን ምርጫ በዚያ ያስኬዳል፣ እና `Gate / CI`፣ `Gate / Quality` እና `Merge integrity (changelog + generated skills)` ሲያልፉ ዋናው PR ይዋሃዳል።

Mergify የወረፋውን ማጠቃለያ በረቂቁ መግለጫ ውስጥ ይጽፋል፣ እና ሌሎች መተግበሪያዎችም ሊያርትዑት ይችላሉ።
በእንዲህ ያለ ረቂቅ ላይ ያለ የ`pull_request` `edited` ክስተት የራሱን concurrency group
(`-queue-edit-<run_id>`) ስለሚወስድ የረቂቁን እውነተኛ ማስኬድ መሰረዝ አይችልም፣ እንዲሁም ጌቱን እና
ማትሪክሱን ይዘላል። `Merge integrity` ብቻ አሁንም ይሰራል። የታለፈው የጌት ሥራ የተለየ የምርመራ ስም ይይዛል፣
ምክንያቱም Mergify የታለፈ `Gate / CI`ን እንደ ያልተሳካ ምርመራ በማንበብ PR-ን ከወረፋው ያስወጣል።

ከወረፋ ከተወጣ በኋላ push ሁልጊዜ PR-ን እንደገና ወረፋ ውስጥ አያስገባም። `@mergifyio queue` በማለት አስተያየት ይስጡበት።

እያንዳንዱ JSON ደረሰኝ የተፈተሸውን SHA፣ የሥራ ፍሰቱን ማስኬድ እና ሙከራ ይለያል።
CLI-ው በcheckout/event SHA መካከል ያለውን አለመዛመድ ውድቅ ያደርጋል። የሥራ ፍሰት ሙከራዎች የፖሊሲ አባልነትን
ከውሳኔ ሥራው `needs` ዝርዝር ጋር ያስተሳስራሉ፣ በዚህም አዲስ ወይም የተወገደ መስመር በዝምታ ሊጠፋ አይችልም።
ደረሰኞቹ የራሳቸውን የሥራ ፍሰት ይሸፍናሉ እንጂ publicationን፣ deploymentን ወይም
ነባር አማካሪ scanner ውስጣዊ አሠራሮችን አይሸፍኑም። ሁለቱንም የምርመራ ስሞች በቅርንጫፍ ደንቦች ውስጥ ማንቃት
የተለየ አስተዳደራዊ ለውጥ ነው፤ እነዚህን ሥራዎች መጨመር በራሱ ቅርንጫፍን አይጠብቅም።

### የስታቲክ ቅኝት ዝርዝር

በስሪት የተቆጣጠረው የnpm-alias ዝርዝር እና የstatic-scan አባልነት በ
`config/quality/gate-manifest.json` ውስጥ ይገኛሉ። የስክሪፕት ስሞችን እና ትክክለኛ ትዕዛዞችን ከ`package.json` ጋር ለማረጋገጥ `npm run check:gate-manifest`ን ያስኪዱ፤ ጭማሪዎች፣ ማስወገዶች እና
የትዕዛዝ ለውጦች የአካባቢው hookንም ሆነ በCI ውስጥ ያሉትን የለውጥ ምደባ ሥራዎች ያሳክታሉ።
alias የworkflow job፣ matrix instance ወይም test case አይደለም፦ እነዚህ ብዛቶች
እርስ በርስ ተለዋዋጭ እንደሆኑ መቅረብ የለባቸውም።

የተመረጡትን aliases ሳያስኬዱ ለመመርመር `npm run quality:scan -- --list` ወይም `npm run quality:scan:fast -- --list`ን
ይጠቀሙ። runner-ው የnpm entrypointን ይጠራል፣ ስለዚህ runtime-ው (በተዋቀረበት ቦታ Bunን ጨምሮ) ይጠበቃል።
manifest-ው ከእነዚህ መገለጫዎች ውጭ ያሉ aliasesን በተናጠል እንደሚጠሩ ይመዘግባል፣ እና
የጥገና ትዕዛዞች በread-only የቅኝት መገለጫዎች ውስጥ የተከለከሉ ናቸው።

እነዚህ መገለጫዎች የሚሸፍኑት static scanን ብቻ ነው። የምርት ሙከራዎችን፣
coverageን፣ packagingን፣ ውጫዊ ምርመራዎችን ወይም የእጩን ሙሉ የልቀት ተቀባይነት አያረጋግጡም።
የሥራ ፍሰት ተቀባይነት የተያያዘውን `config/quality/admission-policy.json` እና
`scripts/quality/admission-verdict.mjs` ይጠቀማል። የRelease-observer መገለጫዎች ተለይተው ይቆያሉ፤
ተፈጻሚ ምርመራዎቻቸውን እና ደረሰኞቻቸውን በተናጠል ይመርምሩ። ከታች ያለው የጽሑፍ
ዝርዝር ማጣቀሻ እንጂ አንድ ጌት በእውነት መስራቱን የሚያረጋግጥ ማስረጃ አይደለም።

ስክሪፕቶች በ`scripts/check/` (የፖሊሲ ጌቶች) እና `scripts/quality/` (ratchet engine) ስር ይገኛሉ።
የCI ዋና እውነታ ምንጭ `.github/workflows/ci.yml` ነው።

### የRelease PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` በmain/release PR-ዎች፣ ወደ `main` በሚደረጉ pushes፣
dispatch እና merge groups ላይ CIን ያሟላል። PR-ዎች በpath-filtered የተጣሩ ፈጣን ምርመራዎችን ይጠቀማሉ። በቋሚነት
የተሰናከለው የተባዛ build ተወግዷል፤ እውነተኛዎቹ የbuild/package/boot ምርመራዎች በCI ውስጥ ይቆያሉ።
unit suite እና vitest የሚሰሩት በCI ውስጥ ብቻ ነው (`Unit Tests (N/8)` እና `Vitest`)።

| ሥራ                                               | ወሰን                                                                                                   | አጋጅ            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR-ዎች፤ የAPI docs ማጣቀሻዎች እና docs-all                                                         | አዎ             |
| `Fast Quality Gates`                             | Code PR-ዎች፤ static checks፣ typecheck፣ dashboard typecheck፣ የተጎዱ unit tests፣ የተረሱ sibling tests (አማካሪ) |
| `No new ESLint warnings`                         | Code PR-ዎች፤ suppressions-aware lint guard                                                             | አዎ፣ forksን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆኑ PR-ዎች፤ changelog እና generated skill sync                                                     | አዎ፣ forksን ጨምሮ |

#### የተረሱ sibling tests ሪፖርት

`npm run check:forgotten-sibling-tests` እንደ `Fast Quality Gates` አማካሪ ደረጃ የሚሠራ ሲሆን፣ ከሙከራ ተፅዕኖ ካርታው በስተጀርባ ያለውን የimport መፍቻ እንደገና ይጠቀማል።
ለእያንዳንዱ የተቀየረ የምርት ሞጁል፣ የእጩ ሙከራው በpull-request diff ውስጥ በማይኖርበት ጊዜ የማይለዋወጡ
`changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ሪፖርት ያደርጋል። የMarkdown ማጠቃለያው እና የJSON ውጤቱ፣ ማንኛውም የማገድ ሥርዓት ከመተግበሩ በፊት ለማስተካከያ እንደ
`forgotten-sibling-tests` የworkflow artifact ተጠብቀው ይቆያሉ።

የBarrel re-exports እና dynamic imports የመፍታት ምርመራዎች ብቻ ናቸው፤ በፍጹም የሚያግድ ግኝት አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ ግቤት consumer-ውን እና የእጩ ሙከራውን መጥቀስ፣ የተወሰነ ምክንያት መስጠት እና ወደ GitHub issue ወይም pull request ማገናኘት አለበት። በተሳሳተ ቅርጽ የቀረቡ ግቤቶች
ለደኅንነት ሲባል ውድቅ ይደረጋሉ። ልዩ ሁኔታዎች የተሰረዘ የእጩ ሙከራን ወይም `.skip`/`.todo` የሚጨምር diff ሊደብቁ አይችሉም፤
assertion-ን ማዳከም እና ሌሎች መደበቂያዎች በተናጥል የሚያግደው
`check:test-masking` gate ኃላፊነት ሆነው ይቀጥላሉ።

### ሥራ፦ `lint`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሠራል። ካልተሳካ merge እንዳይደረግ ያግዳል።

| ስክሪፕት (`npm run ...`)             | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አጋጅ                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                  |
| `check:cycles`                    | በመላው `src/` + `open-sse/` ያሉ ዑደታዊ ኢምፖርቶችን (በAST ላይ የተመሠረተ፣ የtsconfig `paths` የተፈታ)። ምንም ዓይነት ዑደት በሚኖርበት ጊዜ መሠረታዊው ትዕዛዝ በ1 ይወጣል (ከ#15281 ጀምሮ በጥርጣሬ ጊዜ የሚያግድ) እና SCCዎቹን ይዘረዝራል። `check:cycles:ratchet` (CI የሚያስኬደው) ብዛቱ በ`quality-baseline.json` ውስጥ ያለውን የ`metrics.cycles` ከፍተኛ ገደብ ሲያልፍ ያግዳል — በአሁኑ ጊዜ 14፣ `direction: down` ነው፤ ስለዚህ መቀነስ ብቻ ይችላል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ (ራቼት)                            |
| `check:boundary`                  | የ`open-sse → src` ትስስር፦ ከኤንጂኑ ወደ መተግበሪያው የሚደረጉ ልዩ የፋይል-ወደ-ፋይል ኢምፖርቶች (`scripts/quality/measure-boundary.mjs`፤ የጠርዝ ዝርዝሩ የv4 ኮር/ሞጁል-ክፍፍል ማስተካከያ የሥራ ክምችት ነው)። መሠረታዊ = የምክር ሪፖርት (ከ`quality:boundary` ጋር ተመሳሳይ)። `check:boundary:ratchet` (CI የሚያስኬደው፣ እንዲሁም በ`quality.yml` ፈጣን-ጌቶች ራቼት ዙር ውስጥ ያለው) ብዛቱ በ`quality-baseline.json` ውስጥ ያለውን የ`metrics.boundaryOpenSseToSrc` ከፍተኛ ገደብ ሲያልፍ ያግዳል — በተለካው 771 ላይ ተጀምሯል፣ `direction: down`፤ `--update` የሚያደርገው መቀነስ ብቻ ነው፤ በPRዎች ላይ ከመሠረቱ አንጻር ይለካል (`--base-ref`፣ ከታች ይመልከቱ)                                                                                                                                                                                                                                                               | አዎ (ራቼት)                            |
| `check:route-validation:t06`      | በሁሉም ራውቶች ላይ የZod ስኪማዎች መኖራቸውን (የደረጃ 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                  |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከበጀቱ አያልፍም (ደረጃ 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                  |
| `check:provider-consistency`      | በ`providers.ts` ውስጥ ያለ እያንዳንዱ አቅራቢ በ`providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እና በተቃራኒውም፣ በፈቃድ ዝርዝሩ ወሰን ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                  |
| `check:model-lifecycle`           | በእጅ የሚጠበቁት ሦስቱ የማዘዋወሪያ ሰንጠረዦች ከማከማቻው ውስጥ ከተመዘገበው የሕይወት ዑደት ቅጽበታዊ ገጽታ (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` ሊያዘዋውረው ለሚችል ማንኛውም ጡረታ የወጣ id ነጥብ አይሰጥም፤ እያንዳንዱ የ`BUILT_IN_ALIASES` መድረሻ በ`REGISTRY` ውስጥ ይገኛል እና በጡረታ ከወጡ idዎች ቅጽበታዊ ገጽታ ውስጥ አይገኝም፤ አሁንም በ`REGISTRY` ውስጥ ያለ እያንዳንዱ ጡረታ የወጣ id ወደ ሌላ መድረሻ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ተዘርዝሯል፤ እንዲሁም ምንም የ`DEFAULT_DEGRADATION_MAP` ምንጭ ወይም መድረሻ በዚያ ቅጽበታዊ ገጽታ ውስጥ ጡረታ እንደወጣ አይታይም። ይህ አንድ ሞዴል በአሁኑ ጊዜ በቀጥታ ከሚሠራ የላይኛው አቅራቢ እየቀረበ መሆኑን አያረጋግጥም። ከመስመር ውጭ — በእጅ `npm run quality:refresh-model-lifecycle` በመጠቀም ከሚታደሰው `config/quality/model-lifecycle.json` ጋር ያወዳድራል (አውታረ መረብ ያስፈልጋል፤ ከCI ጋር አልተገናኘም)። `allowedRetiredInCatalog` ቀስ በቀስ የሚቀንስ መቆጣጠሪያ ነው፦ ግቤት የሚጨመረው ከክትትል ጉዳይ ጋር ብቻ ነው። | አዎ                                  |
| `check:fetch-targets`             | በደንበኛ-ወገን `src/` ውስጥ ያለ እያንዳንዱ `fetch("/api/...")` ወደ እውነተኛ `route.ts` ይፈታል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                  |
| `check:deps`                      | በማከማቻው ውስጥ ባሉ ሁሉም `package.json` ፋይሎች ውስጥ በ`npm install` ሊጫኑ የሚችሉ ሁሉም ጥገኞች በ`dependency-allowlist.json` ውስጥ ይገኛሉ፤ አዲስ ስሪታቸው ያልተወሰነ ወይም የslopsquatting ሰለባ የሆኑ ጥቅሎች ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                  |
| `audit:deps`                      | `npm audit` (ሥር + electron) — ከፍተኛ/ወሳኝ ማስጠንቀቂያዎች የሉም (ከosv `check:vuln-ratchet` ጋር ይደራረባል፤ የምክንያታዊነት ማብራሪያ የኋላ ታሪክ ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                  |
| `check:lockfile`                  | `package-lock.json` ሙሉነት — https መዝገብ ቤት፣ የታማኝነት ሃሾች፣ ምንም አስተናጋጅ የሚሻር የለም።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                  |
| `check:licenses`                  | SPDX ፈቃድ ዝርዝር ለምርት ጥገኞች                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                  |
| `check:tracked-artifacts`         | ምንም የግንባታ ቅርሶች/የተፈጸሙ `node_modules` ሲምሊንኮች (እንዲሁም በ husky pre-commit ውስጥ ይሰራል፤ ቅድመ-ግፋ ሆን ተብሎ ቀላል — #6716 ነው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                  |
| `check:ai-attribution`            | ምንም AI/bot `Co-Authored-By` የፊልም ማስታወቂያ ወይም AI-ትውልድ ግርጌ በ PR አላደረገም፣ ርዕስ ወይም አካል — Hard Rule #16 (በ `quality.yml` fast-gates loop ለ PR→ `release/**` — የክስተት ክፍያን ያነብባል፣ ምንም-op off PRs — እና የ PR-ብቻ `main` `ci.yml` lint ለ PR→; እንዲሁም የተፈቀደለት የሰው `commit-msg` ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | እያንዳንዱ Vitest ማግለል የመከታተያ ችግርን ይሰይማል እና በ `config/quality/vitest-exclusions.json` (#13204) ውስጥ ይታያል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                  |
| `check:file-size`                 | የምንጭ ፋይሎች (`.ts`/`.tsx` በ `src/`፣ `open-sse/`፣ `electron/`፣ `bin/`) በ `cap` ውስጥ ይቆዩ እና ፋይሎችን (`*.test.ts(x)`) በ `testCap` ውስጥ ይቆዩ; በ `file-size-baseline.json` (`frozen` / `testFrozen`) የታሰሩ ፋይሎች ከተመዘገበው መጠን ማለፍ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                  |
| `check:error-helper`              | በ executors/handlers ውስጥ ያሉ የተሳሳቱ ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()` (ሀርድ ህግ #12) ይጠቀሙ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                  |
| `check:migration-numbering`       | የስደት SQL ፋይሎች በቅደም ተከተል የተቆጠሩ ናቸው፣ ምንም ክፍተቶች ወይም ብዜቶች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                  |
| `check:public-creds`              | `publicCreds.ts` ውጭ ምንም ቀጥተኛ OAuth `client_id`/`client_secret` ወይም Firebase የድር ቁልፎች የሉም (ከባድ ህግ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                  |
| `check:db-rules`                  | ከ `src/lib/db/` ሞጁሎች ውጭ ምንም ጥሬ SQL የለም; በርሜል-ከ `localDb.ts` አይመጣም (ከባድ ህጎች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                  |
| `check:known-symbols`             | አቅራቢዎች፣ የማዞሪያ ስልቶች እና ተርጓሚዎች በመላኪያ ሰንጠረዦቻቸው ውስጥ የተመዘገቡት በዲስክ — ላይ ካሉ ፋይሎች ጋር ይዛመዳሉ ምንም ወላጅ አልባ ወይም ያልታወቁ ምልክቶች                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                  |
| `check:route-guard-membership`    | የሕፃን ሂደትን የሚፈጥር እያንዳንዱ መንገድ በ `isLocalOnlyPath()` (Hard Rules #15/#17) ተከፋፍሏል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                  |
| `check:test-discovery`            | በሪፖው ውስጥ ያለው እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ ፈታኝ ሯጭ ይሰበሰባል (የሙት ልጅ በ `test-discovery-baseline.json` ውስጥ ያለ የሙት ልጅ ዝርዝር ሊቀንስ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                  |
| `check:test-tla-order`            | በ `tests/unit` ስር ምንም `node:test` ፋይል የለም ፈተናን መዝግቧል፣ ከፍተኛ ደረጃ `await` ላይ ደርሷል፣ ከዚያም የበለጠ ይመዘግባል (#18045; ratchet: `test-tla-order-allowlist.json` የሚቀንስ ብቻ ነው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                  |
| `check:agent-skills-sync`         | የወኪል ክህሎት ቅርሶች ከምንጫቸው ካታሎግ ጋር ይዛመዳሉ (መንሸራተት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | አቅራቢ logos/assets የተቀዳ የፕሮቬንሽን ግቤት ይይዛል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON ማዋቀር ፋይሎችን ይተነትኑ እና repo lint ደንቦችን ያረካሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript ስብስብ ያለ ስህተቶች (የአማካሪ ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                  |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደ ፊት መመልከት; ብዙ ቀደም ብለው የነበሩ የጥሪ ጣቢያዎች አሁንም ማብራሪያ ያስፈልጋቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **ምክር** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` እስከ `src/app/(dashboard)/**` (#7033) — `typecheck:core` የተመረጠ ባለ 27-ፋይል የፈቃድ ዝርዝር የትኛውንም ዳሽቦርድ TSX አያካትትም እና `next build` በጭራሽ አይተይበውም (`next.config.mjs` ያስቀምጣል `ignoreBuildErrors: true`)፣ ስለዚህ እዚያ ያሉ ወላጅ አልባ መለያ ለውጦች (#6625/#6909) ለ CI የማይታዩ ነበሩ። ከቀዘቀዘ per-file/per-TS-code ቆጠራ መነሻ መስመር (`config/quality/dashboard-typecheck-baseline.json`፣ ተመሳሳይ የቆየ የማስፈጸሚያ ጥለት ከ `check:known-symbols`) ጋር ይለያያል — ከመነሻው ቆጠራ ያለፈ NEW ስህተቶች በሩ ወድቋል። ቀደም ሲል የነበረ ስህተት ሲስተካከል በ `--update` ውረድ።                                                                                                                                                                                                                                                                                     | አዎ                                  |
| `check:build-typecheck`           | የሙሉ መተግበሪያ የማምረቻ አይነት በ `tsconfig.build.json` (`src`፣ `open-sse`፣ `packages`፣ `bin`፣ `scripts`፣ `electron/**/*.d.ts`)፣ የገጽታ `typecheck:core` 27-ፋይል ፍቃድ ዝርዝር እና የዳሽቦርድ በር አይሸፍኑም። በ `config/quality/build-typecheck-baseline.json` ላይ ልዩነቶች; አዲስ ወይም ከፍ ያለ በ (ፋይል ፣ ኮድ) ቆጠራ አልተሳካም ፣ ዝቅተኛ ቆጠራ እንድትረዱ ይጠይቅዎታል። `--update` ካልተላለፈ በስተቀር ሩጫው አዲስ ወይም ከፍ ያለ ጥንድ `--force-regressions` እና `--force-nocheck` ካልተላለፈ በቀር አዲስ ጸጥ ያለ ፋይልን እምቢ ይላል፣ ስለዚህ አረንጓዴ ለማግኘት መሰረቱን ማስፋት እና ቋሚ ጸጥታ መስጠት ሁለት የተለያዩ የታሰቡ ድርጊቶች ናቸው። ባዶ `--force` ውድቅ ተደርጓል። እንዲሁም የ `@ts-nocheck` የግንባታ ወሰንን ከ `config/quality/ts-nocheck-baseline.json` ጋር ይቃኛል፣ ምክንያቱም እሱን የሚጠቀም ፋይል ምንም አይነት የምርመራ ውጤት እንደሌለ እና አለበለዚያ ለእያንዳንዱ በር የማይታይ ስለሆነ።                                                                         | አዎ                                  |

#### ሁለት የታይፕ ቼክ ፕሮግራሞች በተለያየ መንገድ ምላሽ ይሰጣሉ

`typecheck:core` እና `check:build-typecheck` በተለያዩ አማራጮች ስር የተለያዩ ፕሮግራሞችን ያጠናቅራሉ, እና አንድ አይነት ፋይል በአንዱ ንጹህ እና በሌላኛው ስህተቶች የተሞላ ሊሆን ይችላል.

`tsconfig.build.json` `"strict": false` ያዘጋጃል፣ ስለዚህ `noImplicitAny` ጠፍቷል። የኮር ማዋቀሪያው የተመረጠ ባለ 27-ፋይል የፈቃድ ዝርዝር ከጠንካራ አማራጮች ጋር ያጠናቅራል እና የእያንዳንዱን የማስመጣት ግራፍ ይከተላል፣ ስለዚህ በግንባታ ፕሮግራሙ ውስጥ የማይታዩ ፋይሎች አሁንም እዚያ ይመለከታሉ።

ፋይል መተየቡን ወይም አለመተየቡን ሲወስኑ ውጤቱ አስፈላጊ ነው፡-** በ `check:build-typecheck` ስር ዜሮ ምርመራ ዜሮ ማለት አይደለም።** . `@ts-nocheck` ከ 26 ፋይሎች ማውጣት 23 ቱ በግንባታ ፕሮግራሙ ውስጥ ንጹህ መሆናቸውን አሳይቷል ። ከእነዚህ ውስጥ አስራ ስድስቱ ወደ 120 የሚጠጉ በተዘዋዋሪ የተከሰቱ ናቸው - ማንኛውም በጥብቅ ስህተት ውስጥ። ንጹህ ፋይል ከመጥራትዎ በፊት ሁለቱንም ያረጋግጡ።

### ሥራ `quality-gate`

ከ `test-coverage` በኋላ ይሮጣል. እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስክሪፕት                        | ያረጋግጣል                                                                                                                       | ማገድ                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `quality:collect`            | Emits `quality-metrics.json` (ESLint የማስጠንቀቂያ ብዛት፣ ከተዋሃደ የሻርድ ዘገባ ሽፋን)                                                       | አዎ (የላይኛው የአይጥ ጅረት) |
| `quality:ratchet`            | በ `quality-baseline.json` ውስጥ ያለው እያንዳንዱ ልኬት ወደ ኋላ አልተመለሰም (ESLint ማስጠንቀቂያዎች ≤ መነሻ፣ ሽፋን ≥ መነሻ)                               | አዎ                  |
| `check:duplication`          | የኮድ ማባዛት (jscpd@4) በ `quality-baseline.json` ውስጥ ከመሠረታዊ መስመር አይበልጥም።                                                         | አዎ                  |
| `check:complexity`           | የፋይል ደረጃ ሳይክሎማቲክ ውስብስብነት ከካፒታው አይበልጥም (ኮር ESLint `complexity` + `max-lines-per-function`)                                    | አዎ                  |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ራትቼት (`eslint-plugin-sonarjs`) — የተለየ ESLint ማለፊያ; CI ሁለቱንም እንደ ነጠላ `check:complexity-ratchets` እርምጃ ያካሂዳል     | አዎ                  |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ ወደ ውጭ የሚላኩ / የፋይል ንክኪ (ኪኒፕ) ከመነሻ መስመር ጋር አይመለሱም።                                                                 | አዎ                  |
| `check:compression-budget`   | የመጨመቂያ ቤንችማርክ በጀት — በእያንዳንዱ ሞተር ቶከን - ቁጠባ ወለሎች ወደ ኋላ መመለስ የለባቸውም                                                             | አዎ                  |
| `check:type-coverage`        | በመቶኛ የተተየበው ራትቼት (`type-coverage`) ወደ ኋላ አይመለስም; በአብዛኛው `typecheck:noimplicit:core` ን ይሸፍናል                                  | አዎ                  |
| `check:codeql-ratchet`       | ክፈት CodeQL ማንቂያ ቆጠራ ወደ ኋላ አይመለስም (በ `gh api` በኩል ይነበባል፤ ያለ ማስመሰያ ዝለል) — አድስ ቃና እና በእጅ ቀስቅሴ፡ ከታች ያለውን "CodeQL ratchet" ይመልከቱ። | አዎ                  |

### ሥራ `quality-extended`

ሙሉው ሥራ አማካሪ ነው (`continue-on-error: true`)። በ npm ላይ የተመሰረቱ ራትኬቶች ለትክክለኛው ይሰራሉ; ውጫዊ ስካነሮቹ በ `gh release download` በኩል ይጭናሉ እና ሁለትዮሽ በማይኖርበት ጊዜ በራስ-ይዘለሉ (መውጫ 0)።

| ስክሪፕት                    | ያረጋግጣል                                                                                                                                                                     | ማገድ                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:circular-deps`    | ምንም ክብ ጥገኞች (ዲፒዲኤም)                                                                                                                                                        | **ምክር**                                    |
| `check:bundle-size`      | የጥቅል መጠን ከካፒታው አይበልጥም።                                                                                                                                                     | **ምክር**                                    |
| `check:secrets`          | ሚስጥራዊ ቅኝት (gitleaks) — ሁለትዮሽ ከሌለ ይዘላል                                                                                                                                      | **ምክር**                                    |
| `check:vuln-ratchet`     | የጥገኛ ተጋላጭነቶች (osv-scanner) ሁለትዮሽ ከሌለ — መዝለልን አያገግምም                                                                                                                        | **ምክር**                                    |
| `check:workflows`        | የስራ ፍሰት lint (አክሽንሊንት + zizmor); missing/broken ስካነሮች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደሉ ratchet መነሻ መስመር እንደ INCOMPLETE አልተሳኩም። ትክክለኛ ግኝቶች የተመረጠውን strict/advisory/ratchet ፖሊሲ ይከተላሉ | ማስፈጸሚያ ያስፈልጋል; zizmor ratchet በ CI ውስጥ ማገድ |
| `check:openapi-breaking` | በሕዝብ API ውል (`openapi.yaml`) ላይ ለውጦችን ማፍረስ ከመሠረቱ ቅርንጫፍ (oasdiff) — `openapiBreaking=N` ያወጣል; oasdiff ከሌለ ወይም የመሠረት ዝርዝር ሁኔታ ካልተፈታ                                          | **ምክር**                                    |

### ሥራ `docs-sync-strict`

በእያንዳንዱ PR እስከ `main` ድረስ ይሰራል። እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስክሪፕት                          | ያረጋግጣል                                                                                                                         | ማገድ                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `check:docs-all`               | ከታች ያሉትን 6 ንዑስ በሮች በቅደም ተከተል የሚያስኬድ ሜታ-ጌት                                                                                      | አዎ                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt ስሪት ወጥነት                                                                                         | አዎ                         |
| ↳ `check:docs-counts`          | በፕሮሴ ውስጥ ያሉ ቆጠራዎች (የአቅራቢዎች ብዛት፣ የፍልሰት ብዛት፣ ወዘተ.) በእውነተኛው ቆጠራዎች የራጭ መስኮት ውስጥ ናቸው።                                               | አዎ                         |
| ↳ `check:env-doc-sync`         | በ `.env.example` ውስጥ ያለው እያንዳንዱ env var በዶክመንቶች ሠንጠረዥ ውስጥ ተመዝግቧል እና በተቃራኒው                                                     | አዎ                         |
| ↳ `check:deprecated-versions`  | በሰነዶች ውስጥ ምንም ያልተቋረጠ የስሪት ሕብረቁምፊዎች የሉም                                                                                         | አዎ                         |
| ↳ `check:doc-links`            | የውስጥ ምልክት ማድረጊያ አገናኞች በሰነዶች ውስጥ ወደ እውነተኛ ፋይሎች (`[text]`/`(path)` ቅጽ) ይፈታሉ                                                      | አዎ                         |
| ↳ `check:fabricated-docs`      | መንገዶች፣ env vars፣ CLI ትዕዛዞች፣ መንጠቆ ስሞች እና በሰነዶች ውስጥ የተጠቀሱ የፋይል መንገዶች በኮድ ቤዝ ውስጥ አሉ። በ `--strict` በኩል ጠንካራ በር; ያለ ባንዲራ ለስላሳ-ውድቀት። | አዎ (በ `--strict` በ CI በኩል) |
| `check:cli-i18n`               | CLI ትዕዛዝ ሕብረቁምፊዎች በሁሉም i18n የአካባቢ ፋይሎች ውስጥ ይገኛሉ                                                                                | አዎ                         |
| `check:openapi-coverage`       | OpenAPI spec ቢያንስ የእውነተኛ መስመሮችን ወለል ይሸፍናል።                                                                                     | አዎ                         |
| `check:openapi-security-tiers` | በ `openapi.yaml` ውስጥ ያሉ የደህንነት ደረጃ ማብራሪያዎች ከ `routeGuard.ts` ምደባዎች ጋር የሚጣጣሙ ናቸው።                                               | **ምክር**                    |
| `check:openapi-routes`         | በ `openapi.yaml` ውስጥ ያለው እያንዳንዱ መንገድ ወደ እውነተኛ `route.ts` (ፀረ-ቅዠት) ያበቃል።                                                        | አዎ                         |
| `check:docs-symbols`           | በ `docs/**/*.md` ውስጥ ያለው እያንዳንዱ `/api/...` ማጣቀሻ ወደ እውነተኛ `route.ts` (ፀረ-ቅዠት) ይፈታል                                              | አዎ                         |
| `i18n translation drift`       | በ i18n የአካባቢ ፋይሎች ውስጥ ያልተተረጎሙ ቁልፎች — ብቻ ያስጠነቅቃል                                                                                | **ምክር**                    |

በ `docs/diagrams/` ስር ያሉት አስራ ሁለቱ README SVGs ይፈጠራሉ (`scripts/docs/gen-readme-<name>.mjs`፣ `npm run docs:readme-diagrams` ሁሉንም ያድሳል)። እያንዳንዳቸው የባይት-ንፅፅር አሃድ ፈተና (`tests/unit/docs/readme-*-svg.test.ts`፣ job `test-unit`) የተፈፀመው ፋይል ጊዜ ያለፈበት ሲሆን ፣ እና `check:docs-counts` ቀኖናዊ ቁጥሮችን ከ `<text>` ኖዶች — ያነባል ለዚህ ነው የማብራሪያው ደረጃ በፋይሉ ውስጥ ያሉትን እያንዳንዱን ሕብረቁምፊዎች የማይታይ `<text>` አድርጎ ያቆየዋል። የ SVG ቀኖናዊ-ቁጥሮች ቼክ በ `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) የተዘረዘሩትን ፋይሎች ያነባል `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` እና `tier-flow-light.svg`; የነጻው-ዘላለም፣ ካታሎግ-መግቢያ፣ ተደጋጋሚ ገንዳ እና የውጤት መስጫ ምክንያቶች የይገባኛል ጥያቄዎችም `promise-pillars.svg`፣ `free-tier-budget.svg` እና `strategies-grid.svg` አንብበዋል። `free-tier-budget.svg` አሃዞቹን ከቀጥታ ካታሎግ ጫኚው ላይ ይሳላል፣ ስለዚህ ወደ `FREE_MODEL_BUDGETS` ወይም ወደ አቅራቢው መቀየር ያ ፋይል እስኪታደስ ድረስ ቀይ CI ያሳያል።

### ሥራ `i18n-ui-coverage`

| ስክሪፕት                               | ያረጋግጣል                                                                                                                                            | ማገድ     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check-ui-keys-coverage` (ውስጥ መስመር) | UI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                          | አዎ      |
| `check-ui-value-drift` (ውስጥ መስመር)   | እንደገና የተጻፈ እንግሊዝኛ** ዋጋ** ከኋላው የቆየ ትርጉም አይተውም።                                                                                                     | አዎ      |
| `check-new-key-coverage` (ውስጥ መስመር) | ሀ** አዲስ** የእንግሊዘኛ ቁልፍ በየአካባቢው — ተተርጉሟል የ `__MISSING__:` ማርከር ውድቅ ተደርጓል                                                                            | አዎ      |
| `check-translation-ratio`           | ትክክለኛ የትርጉም ምጥጥን በየአካባቢው (ከእንግሊዝኛ ጋር ተመሳሳይ / ቦታ ያዥ / ከተፈቀደው ዝርዝር ውጭ የጎደሉ ቅጠሎች) `config/quality/i18n-translation-baseline.json` + slack መብለጥ የለበትም | **ምክር** |

`fetch-depth: 0` — ያስፈልገዋል የእሴት ተንሳፋፊ በር `en.json` ከውህደቱ መሰረት ይለያል።

#### `check-ui-value-drift` — የቆየ-የትርጉም በር

አንዱን i18n regression ይይዛል ሌላኛው በመዋቅራዊ መልኩ በሮች ማየት አይችሉም፡ የእንግሊዘኛ እሴት እንደገና ይፃፋል እና ከ _ቀዳሚ_ እንግሊዘኛ የተገኙት ትርጉሞች ወደ ኋላ ይቆያሉ፣ ስለዚህ እንግሊዛዊ ያልሆኑ ተጠቃሚዎች በልበ ሙሉነት-ቃል ያለው አሁን የተሳሳተ ቅጂ ያነባሉ።

ይህ በእውነቱ ተልኳል። `oauthModal.googleOAuthWarning` እንደገና የተጻፈው Antigravity መግቢያ ረዳት ሲያርፍ (#5203);** 39 ከ 43 አከባቢዎች** ለኦፕሬተሮች "ሙሉውን URL ገልብጠው ከዚህ በታች ለጥፍ" የሚል ጽሁፍ ደጋግሞ ለአገልግሎት አቅራቢው ማጠናቀቅ የማይችል — ። እስከ #8463 ድረስ ሳይስተዋል ቀርቷል ምክንያቱም፡-

- `sync-ui-keys` ያሉትን ቁልፎች ብቻ ነው የሚሞላው።** የለም** ፣ በጭራሽ ያልሆኑት።** የቆየ** ;
- `check-ui-keys-coverage` ቁልፍ _presence_ ይቆጥራል፣ ስለዚህ የቆየ ትርጉም እንደተሸፈነ ይቆጠራል።
- `check-translation-drift` የ `docs/i18n/<locale>/**.md` ሰነዶችን መስተዋቶች ይከታተላል — በጭራሽ `src/i18n/messages/*.json` አያነብም። ከ2026-09 ዳግም ማመሳሰል ጀምሮ በ `docs-sync-strict` ውስጥ ማገድ፡ አንድ ኮር ሰነድ → `npm run i18n:run -- --files=<doc>` (የክፍል-ደረጃ፣ ርካሽ) አርትዕ።

**ልዩነትን የሚያውቅ፣በመነሻ መስመር የተደገፈ አይደለም።** በማዋሃድ ላይ ያለውን `en.json` ከሚሠራው ዛፍ ጋር ያወዳድራል; የእንግሊዘኛ እሴቱ ለተቀየረ ለእያንዳንዱ ቁልፍ፣ አሁንም ያልተነካ ትርጉም የያዘ ማንኛውም አካባቢ የቆየ ነው። ይህ ሆን ተብሎ** ቀድሞ የነበረውን ዕዳ ያቆማል** — a diff ከየትኛው አሮጌ እንግሊዝኛ እንደመጣ ሊገልጽ አይችልም ፣ስለዚህ በሩ የሚዳኘው የአሁኑ ለውጥ የሚነካውን ብቻ ነው። አማራጩ (በየቁልፍ ሀሽ መነሻ መስመር) ~ 600 KB የመነጨ ፋይል፣ 3 × ትልቁ ነባር መነሻ መስመር፣ በእያንዳንዱ i18n PR ያስከፍላል።

እሱን ለማርካት ሁለት መንገዶች:

1. የተጎዱትን ትርጉሞች ማዘመን ወይም
2. የሩጫ ሰዓቱን ወደ `__MISSING__:<new english>` — አስቀምጣቸው ከዚያም የተስተካከለውን እንግሊዝኛ (`src/i18n/request.ts::deepMergeFallback`፣ #7258) እና ለትርጉም ቁልፍ ወረፋዎችን ያገለግላል።

ሕብረቁምፊው ከሆነ** ትርጉም** ተለውጧል, ይመርጣሉ** ቁልፉን እንደገና መሰየም** አዲስ ቁልፍ የቆየ ትርጉም ሊወርስ አይችልም። ያ ጥቅም ላይ የዋለው #8463 ንድፍ ነው።

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

የመሠረት ካታሎግ ሊነበብ በማይችልበት ጊዜ (ጥልቀት የሌለው ክሎሎን ያለ ቤዝ ሪፍ)፣ `check-openapi-breaking` በማንጸባረቅ 0 በ `SKIP reason=base-unresolved` ይወጣል።

### ሥራ `i18n`

ሙሉ i18n የማረጋገጫ ማትሪክስ (በአካባቢው አንድ ሥራ)። ሥራው ሁሉ ምክር ነው።

| ስክሪፕት                           | ያረጋግጣል              | ማገድ                                           |
| ------------------------------- | ------------------- | --------------------------------------------- |
| `validate_translation.py quick` | የትርጉም ምሉዕነት በየአካባቢው | **ምክር** (`continue-on-error: true` በሙሉ ሥራ ላይ) |

### ሥራ `pr-test-policy`

በመጎተት ጥያቄዎች ላይ ብቻ ይሰራል።

| ስክሪፕት                  | ያረጋግጣል                                                                                                         | ማገድ |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | --- |
| `check:pr-test-policy` | PRs በ `src/`፣ `open-sse/`፣ `electron/`፣ ወይም `bin/` ውስጥ የምርት ኮድን የሚቀይር ሙከራዎችን ማካተት ወይም ማዘመን አለበት (Hard Rule #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የፍተሻ ፋይሎች የተጣራ ቁጥርን አይቀንሱም ወይም `assert.ok(true)` tautologiesን አይጨምሩም።                                    | አዎ  |
| `check:pr-evidence`    | PR አካል ለለውጡ test/VPS ማስረጃን ጠቅሷል (mechanizes Hard Rule #18 by grepping PR prose — fragile, Backlogን ይመልከቱ)      | አዎ  |

### ሥራ `test-vitest`

ከ `build` በኋላ ይሮጣል. እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስዊት              | ያረጋግጣል                                               | ማገድ                                                                              |
| ---------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሳሪያዎች) ፣ autoCombo፣ መሸጎጫ — vitest ሯጭ | አዎ                                                                               |
| `test:vitest:ui` | UI ክፍል — vitest ሯጭ ይሞክራል።                            | **ማገድ** — ቅድመ-ነባር ውድቀቶች በ `vitest.config.ts` ውስጥ በግልጽ አይካተቱም; አዲስ ውድቀቶች ሥራውን ያጣሉ |

### የምሽት የስራ ፍሰቶች (መርሃግብር የተያዘለት፣ ምክር)

እነዚህ በ cron መርሐግብር (እና `workflow_dispatch`) ይሰራሉ፣ በጭራሽ በ PRs ላይ። ሁሉም አማካሪዎች ናቸው።

| የስራ ፍሰት                | ያረጋግጣል                                                                                                            | ማገድ     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| `nightly-property`     | በፍጥነት-ቼክ የንብረት ሙከራዎች በዘፈቀደ ዘር + ከፍተኛ ሩጫ ብዛት                                                                       | **ምክር** |
| `nightly-resilience`   | ክምር-የእድገት በር፣ ትርምስ ጥፋት-መርፌ፣ k6 load/soak                                                                          | **ምክር** |
| `nightly-llm-security` | Quickfoo መርፌ ጠባቂ (የማገጃ ሁነታ) + garak መመርመሪያዎች (ያለ አቅራቢ ሚስጥር ተዘሏል)                                                  | **ምክር** |
| `nightly-schemathesis` | `docs/openapi.yaml` — surfaces spec ጥሰቶች/ያልተያዙ 500ዎች (ፋሴ 8 B.4) በመጠቀም የቀጥታ OmniRoute ላይ OpenAPI ውል ማደብዘዝ (መርሃግብር) | **ምክር** |
| `nightly-mutation`     | የስትሮከር ሚውቴሽን መፈተሻ ውጤት በፈጣኑ አሃድ መስመር — በሕይወት የተረፉ ሚውቴሽን ደካማ አስረጂዎች                                                 | **ምክር** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ውስጥ የመስቀለኛ ሞተር ተኳሃኝነት ማትሪክስ                                                            | **ምክር** |

የአፈጻጸም መነሻ መስመሮች (ክምር፣ TTFB፣ የግንባታ ጊዜ) የተመዘገቡ እንጂ የተከለከሉ አይደሉም [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline` ይመልከቱ)።

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
