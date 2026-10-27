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

የCI እና Quality Gates የስራ ፍሰቶች እያንዳንዳቸው የማይለዋወጥ ውሳኔ ያወጣሉ፦ `Gate / CI` እና
`Gate / Quality`። ስሪት ያለው የተቀባይነት ፖሊሲያቸው እያንዳንዱን የላይኛው ደረጃ ስራ
እንደ አስፈላጊ ወይም አማካሪ ይዘረዝራል። ተፈጻሚ የሆነ አስፈላጊ ስራ መሳካት አለበት፦ የጠፋ፣
የተሰረዘ፣ የተዘለለ፣ በመጠባበቅ ላይ ያለ እና ያልታወቀ ውጤት PASSን ማረጋገጥ አይችሉም። ትክክለኛ
docs-only ወይም catalog-only ምደባ አንድን የኮድ መስመር ተፈጻሚ እንዳይሆን ሊያደርግ ይችላል፤
ረቂቅ PR እንደ ተቀባይነት ያገኘ እጩ አይቆጠርም። የ`hotfix` መለያ የማስረጃ መስፈርቱን አያስቀርም።

ሁለቱም የስራ ፍሰቶች ወደ main/release ቅርንጫፎች የሚገቡ PRዎችን፣ ወደ `main` የሚደረጉ pushesን፣ manual dispatchን
እና merge-group ክስተቶችን ይሸፍናሉ። Push፣ dispatch እና merge-group ሙሉውን ምርጫ ያስኬዳሉ። ወደ
`release/**` የሚደረጉ Pushes እነሱን አያስጀምሩም (2026-10-18)፦ እያንዳንዱ ለውጥ ማትሪክሱን አስቀድሞ በPRው
ላይ አስኪዷል፣ እና የተዋሃደው ጥምረት የRelease-Green ስራ ነው (`docs/ops/RUNNER_BOX.md` → Hosted lane)። Forks
እና merge groups፣ አለበለዚያ self-hosted runnersን ለሚመርጡ ስራዎች hosted runnersን ይጠቀማሉ፤ ከመዘርጋቱ
በፊት በቂ hosted አቅም መኖሩ መረጋገጥ አለበት።

እያንዳንዱ JSON ደረሰኝ checked-out SHAን፣ የስራ ፍሰቱን run እና attempt ይለያል።
CLIው በcheckout/event SHA መካከል ያለ አለመዛመድን ውድቅ ያደርጋል። የስራ ፍሰት ሙከራዎች የፖሊሲ አባልነትን
ከውሳኔ ስራው `needs` ዝርዝር ጋር ያስተሳስራሉ፣ ስለዚህ አዲስ ወይም የተወገደ መስመር ሳይታወቅ ሊጠፋ አይችልም።
ደረሰኞቹ የሚሸፍኑት የራሳቸውን የስራ ፍሰት እንጂ ህትመትን፣ ስርጭትን ወይም የአንድ ነባር አማካሪ scanner
ውስጣዊ አሰራርን አይደለም። ሁለቱንም የማረጋገጫ ስሞች በቅርንጫፍ ደንቦች ውስጥ ማንቃት የተለየ አስተዳደራዊ
ለውጥ ነው፤ እነዚህን ስራዎች ማከል በራሱ ቅርንጫፍን አይጠብቅም።

### በተቀባይነት reducer ውስጥ የተያዘ ማስረጃ

`scripts/quality/validate-release-acceptance.mjs` የቀረበለትን እቅድ እና manifests ወደ አጠቃላይ ውጤት ይቀንሳል፤
እቅዱ ሙሉውን የrelease pipeline እንደሚሸፍን አያረጋግጥም። ሪፖርቶቹ እቅዱ
`VERIFIED` በሆነበት ጊዜም እንኳ `releaseAcceptance: false`ን በግልጽ ያዘጋጃሉ። የ`release-acceptance.yml` የስራ ፍሰት
አሁንም እውነተኛ build፣ package፣ boot ወይም promotion ደረሰኞችን ሳይሆን shadow fixturesን ይጠቀማል።

CLIው የተያዘ ማስረጃን ለማረጋገጥ `--evidence-root`ን ይፈልጋል። ፋይሎች
እንደ `<evidence-root>/<artifact_id>/<member>` ተፈልገው በSHA-256 ይሰላሉ። ማስረጃ የሌለው PASS መዝገብ፣
የጠፋ ወይም የተለወጠ ፋይል፣ ደህንነቱ ያልተጠበቀ path ወይም symlink ማረጋገጥን ይከለክላል።
የጠፉ ፋይሎች ባዶ የተሳኩ logs ጋር ተመሳሳይ አይደሉም። ነባር የSHA/run/attempt ማረጋገጫዎች ነጻ ሆነው
ይቀጥላሉ፦ የሚዛመዱ bytes ጊዜው ያለፈበትን ደረሰኝ ማዳን አይችሉም። የፋይል ታማኝነት የአፈጻጸም ትክክለኛነት
ወይም የartifact promotion ማረጋገጫ አይደለም።

### የUI አፈጻጸም አቅም

CI ሙሉውን የUI ዝርዝር እንደ አራት `test-vitest` matrix shards ያስኬዳል፤ እያንዳንዱ shard ቢበዛ
ሁለት workers እና ነባሩ የ15 ደቂቃ የስራ የጊዜ ገደብ አለው። የመጀመሪያው shard የMCP/autoCombo Vitest suiteንም ያስኬዳል።
የሚፈለገው የስራ ውጤት እያንዳንዱን matrix leg ይሸፍናል፤ የአንድ shard አለመሳካት
ወይም መሰረዝ የእጩ ተቀባይነትን ማረጋገጥ አይችልም።

nightly observer የMCP አፈጻጸምን በመጀመሪያው ደረሰኝ ውስጥ ጨምሮ፣ ለእያንዳንዱ UI shard
የተለየ exact-candidate ደረሰኝ ይይዛል። አራቱም ደረሰኞች፣ logs እና የሚዛመዱ
የአፈጻጸም ማንነቶች ያስፈልጋሉ። የአካባቢ `npm run test:vitest:ui` አሁንም ሙሉውን
suite ይመርጣል፤ አንድ የ`--shard` run ከፊል ማስረጃ ብቻ ነው።

### የUnit coverage ስብስብ

አሥራ ሁለቱ unit shards በነባሩ የሙከራ አፈጻጸማቸው ወቅት V8 coverageን ይሰበስባሉ። የተሳካ
shard መካከለኛ Istanbul report ሳያመነጭ የመጀመሪያዎቹን ፋይሎች ለማመቅ `scripts/ci/compact-v8-coverage.mjs`ን ያስኬዳል።
የመጨረሻው Coverage ስራ ሁሉንም አሥራ ሁለት manifests ከእጩው SHA፣ runtime፣ source root እና data hashes አንጻር
ያረጋግጣል፤ ከዚያም የc8 reportersን እና ነባር የcoverage thresholdsን ያስኬዳል። Inputs የc8ን ዓለም አቀፍ
የfilename ቅደም ተከተል ይጠብቃሉ፤ ለተቀላቀለ function/block coverage በእያንዳንዱ shard ቅድመ-ውህደት ደህንነቱ የተጠበቀ
አይደለም። የጠፉ፣ በትክክል ያልተቀረጹ ወይም የማይጣጣሙ shards ተቀባይነትን ያሳጣሉ።
ያልተሳኩ test shards ጥሬ diagnostic coverageን በተለየ ይይዛሉ፤ ወደ መጨረሻው ውህደት መግባት አይችልም።

### የStatic scan ዝርዝር

ስሪት ያለው የnpm-alias ዝርዝር እና static-scan አባልነት በ
`config/quality/gate-manifest.json` ውስጥ ይገኛሉ። የscript ስሞችን እና ትክክለኛ commandsን ከ`package.json` ጋር ለማረጋገጥ
`npm run check:gate-manifest`ን ያስኪዱ፤ ጭማሪዎች፣ ማስወገዶች እና
የcommand መዛባት የአካባቢው hookንም ሆነ በCI ውስጥ ያሉትን change-classification ስራዎች ያሳጣሉ።
አንድ alias የworkflow job፣ matrix instance ወይም test case አይደለም፦ እነዚህ ብዛቶች
እርስ በርሳቸው ተለዋዋጭ እንደሆኑ መቅረብ የለባቸውም።

የተመረጡትን aliases ሳያስኬዱ ለመመርመር `npm run quality:scan -- --list` ወይም `npm run quality:scan:fast -- --list`ን
ይጠቀሙ። runnerው የnpm entrypointን ይጠራል፣ ስለዚህ runtimeው (በተዋቀረበት ቦታ Bunን ጨምሮ) ይጠበቃል።
manifestው ከእነዚህ profiles ውጭ ያሉ aliasesን በተለየ እንደሚጠሩ ይመዘግባል፣ እና
maintenance commands በread-only scan profiles ውስጥ የተከለከሉ ናቸው።

እነዚህ profiles የሚሸፍኑት static scanን ብቻ ነው። የproduct testsን፣
coverageን፣ packagingን፣ external checksን ወይም የአንድ እጩ ሙሉ release acceptanceን አያረጋግጡም።
የWorkflow ተቀባይነት የተገናኙትን `config/quality/admission-policy.json` እና
`scripts/quality/admission-verdict.mjs` ይጠቀማል። Release-observer profiles ተለይተው ይቆያሉ፤
ተፈጻሚ checks እና receipts በተናጠል ይመርምሩ። የሙሉ observerው static
commands `audit:deps`ን፣ mutation-test selectionን እና translation checksን ጨምሮ፣
በ`config/quality/release-green-static-profile.json` ውስጥ ታውጀዋል። loaderው የnpm
commandsን ከpackage.json እና በሞዴል ከተወከሉ CI/Quality declarations ጋር ያረጋግጣል፤ shell tokensን እንደ arguments ከማስኬድ
ይልቅ driftን ውድቅ ያደርጋል። ከአስፈላጊ scanner የሚወጣ SKIP/INCOMPLETE
ውጤት PASSን ማረጋገጥ አይችልም። profileው external exclusionsን ይመዘግባል፣ እና
hosted coverageን፣ test matricesን፣ packageን ወይም deployment evidenceን አይተካም። ከታች ያለው የጽሑፍ ዝርዝር
ማጣቀሻ እንጂ አንድ gate በእውነት እንደተሰራ ማረጋገጫ አይደለም።

Scripts በ`scripts/check/` (policy gates) እና `scripts/quality/` (ratchet engine) ስር ይገኛሉ።
የCI ዋና የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የRelease PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` በ main/release PRs፣ ወደ `main` በሚደረጉ pushes፣
dispatch እና merge groups ላይ CIን ያሟላል። PRs በpath-filtered ፈጣን ፍተሻዎችን ይጠቀማሉ። በቋሚነት
የተሰናከለው የተባዛ build ተወግዷል፤ ትክክለኛዎቹ build/package/boot ፍተሻዎች በCI ውስጥ እንዳሉ ይቀጥላሉ።

| ሥራ                                               | ወሰን                                                                                                                                                                           | አጋጅ            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs፤ API docs refs እና docs-all                                                                                                                                      | አዎ             |
| `Fast Quality Gates`                             | Code PRs፤ static checks፣ typecheck፣ dashboard typecheck፣ ተጽዕኖ ያረፈባቸው unit tests                                                                                               | አዎ             |
| `Forgotten sibling tests`                        | Code PRs፤ የተቀየሩ modules ወደ static consumers እና candidate sibling tests ይከታተላሉ፤ barrel እና dynamic-import paths እንደ አማካሪ diagnostics ሪፖርት ይደረጋሉ፣ ከተጠቀሱት allowlist exceptions ጋር | **አማካሪ**       |
| `Vitest (fast-path)`                             | Code PRs፤ ፈጣን vitest suite                                                                                                                                                    | አዎ             |
| `Unit Tests fast-path`                           | Code PRs፤ ባለ4-shard unit suite                                                                                                                                                | አዎ             |
| `No new ESLint warnings`                         | Code PRs፤ suppressions-aware lint guard                                                                                                                                       | አዎ፣ forksን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs፤ changelog እና generated skill sync                                                                                                                              | አዎ፣ forksን ጨምሮ |

#### የተረሱ sibling tests ሪፖርት

`npm run check:forgotten-sibling-tests` ከtest-impact map ጀርባ ያለውን import resolver እንደገና ይጠቀማል።
ለእያንዳንዱ የተቀየረ production module፣ candidate
test በpull-request diff ውስጥ በማይገኝበት ጊዜ ቋሚ ውጤት የሚሰጡ
`changed module/symbol -> static consumer -> candidate sibling test` chainsን ሪፖርት ያደርጋል። Markdown summary እና JSON result፣
ማንኛውም blocking rollout ከመደረጉ በፊት ለcalibration እንደ `forgotten-sibling-tests` workflow artifact ተጠብቀው ይቆያሉ።

Barrel re-exports እና dynamic imports የresolution diagnostics ብቻ ናቸው፤ blocking finding ፈጽሞ
አይፈጥሩም። የተገመገሙ exceptions በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ entry consumerን እና candidate
testን መጥቀስ፣ ዝርዝር rationale መስጠት፣ እንዲሁም ወደ GitHub issue ወይም pull request ማገናኘት አለበት። ቅርጻቸው የተበላሸ entries
በነባሪነት ውድቀትን ያስከትላሉ። Exceptions የተሰረዘ candidate testን ወይም `.skip`/`.todo`ን የሚጨምር diffን
መደበቅ አይችሉም፤ assertion weakening እና ሌሎች masking በተናጥል blocking በሆነው
`check:test-masking` gate ሥር እንዳሉ ይቀጥላሉ።

### ሥራ፦ `lint`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሰራል። ሲወድቅ mergeን ያግዳል።

| ስክሪፕት (`npm run ...`)             | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አጋጅ                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                      |
| `check:cycles`                    | በሁሉም `src/` + `open-sse/` ውስጥ ያሉ ዑደታዊ imports (በAST ላይ የተመሠረተ፣ የtsconfig `paths` ተፈትተዋል)። ማንኛውም ዑደት በሚኖርበት ጊዜ መሠረታዊው ትዕዛዝ በ1 ይወጣል (ከ#15281 ጀምሮ fail-closed) እና SCCዎቹን ይዘረዝራል። `check:cycles:ratchet` (CI የሚያስኬደው) ብዛቱ በ`quality-baseline.json` ውስጥ ካለው የ`metrics.cycles` ከፍተኛ ገደብ ሲበልጥ ያግዳል — በአሁኑ ጊዜ 14፣ `direction: down`፣ ስለዚህ መቀነስ ብቻ ይችላል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ (ratchet)                            |
| `check:boundary`                  | የ`open-sse → src` ትስስር፦ ከengine ወደ app የሚደረጉ ልዩ ከፋይል-ወደ-ፋይል imports (`scripts/quality/measure-boundary.mjs`፤ የedge ዝርዝሩ የv4 core/module-split ማስተካከያ backlog ነው)። መሠረታዊው = የምክር ሪፖርት (ከ`quality:boundary` ጋር ተመሳሳይ)። `check:boundary:ratchet` (CI የሚያስኬደው፣ እንዲሁም በ`quality.yml` fast-gates ratchet loop ውስጥ ያለው) ብዛቱ በ`quality-baseline.json` ውስጥ ካለው የ`metrics.boundaryOpenSseToSrc` ከፍተኛ ገደብ ሲበልጥ ያግዳል — በተለካው 771 ላይ ተጀምሯል፣ `direction: down`፤ `--update` የሚያደርገው መቀነስ ብቻ ነው፤ በPRዎች ላይ ከbase አንጻር ይሰራል (`--base-ref`፣ ከታች ይመልከቱ)                                                                                                                                                                                                                                                      | አዎ (ratchet)                            |
| `check:route-validation:t06`      | Zod schemas በሁሉም routes ላይ መኖራቸውን (የTier 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                      |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከበጀቱ አያልፍም (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                      |
| `check:provider-consistency`      | በ`providers.ts` ውስጥ ያለ እያንዳንዱ አቅራቢ በ`providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እና በተቃራኒውም፣ በፈቃድ ዝርዝሩ ወሰን ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                      |
| `check:model-lifecycle`           | በእጅ የሚያዙት ሦስቱ የማዞሪያ ሰንጠረዦች በሪፖዚቶሪው ውስጥ ከተካተተው የሕይወት ዑደት ቅጽበታዊ ቅጂ (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`)፣ `REGISTRY` ሊያዞረው ለሚችል ከአገልግሎት የወጣ መለያ ነጥብ አይሰጥም፤ እያንዳንዱ የ`BUILT_IN_ALIASES` ዒላማ በ`REGISTRY` ውስጥ ይገኛል እና ከአገልግሎት የወጡ መለያዎች ቅጽበታዊ ቅጂ ውስጥ አይገኝም፤ አሁንም በ`REGISTRY` ውስጥ ያለ እያንዳንዱ ከአገልግሎት የወጣ መለያ ወደ ሌላ ቦታ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ተዘርዝሯል፤ እንዲሁም የትኛውም የ`DEFAULT_DEGRADATION_MAP` ምንጭ ወይም ዒላማ በዚያ ቅጽበታዊ ቅጂ ውስጥ ከአገልግሎት እንደወጣ አይታይም። ይህ አንድ ሞዴል በአሁኑ ጊዜ ቀጥታ በሚሰራ የላይኛው ምንጭ እየቀረበ መሆኑን አያረጋግጥም። ከመስመር ውጭ — በ`config/quality/model-lifecycle.json` ላይ ያወዳድራል፤ ይህም በእጅ `npm run quality:refresh-model-lifecycle` በመጠቀም ይታደሳል (አውታረ መረብ ይፈልጋል፤ ከCI ጋር አልተያያዘም)። `allowedRetiredInCatalog` ቀስ በቀስ የሚቀንስ መቆጣጠሪያ ነው፦ ግቤት የሚታከለው ከክትትል ጉዳይ ጋር ብቻ ነው። | አዎ                                      |
| `check:fetch-targets`             | በደንበኛ-ወገን `src/` ውስጥ ያለ እያንዳንዱ `fetch("/api/...")` ወደ ትክክለኛ `route.ts` ይፈታል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                      |
| `check:deps`                      | በሪፖዚቶሪው ውስጥ ባለ እያንዳንዱ `package.json` ውስጥ የሚገኙ፣ በ`npm install` ሊጫኑ የሚችሉ ጥገኞች በ`dependency-allowlist.json` ውስጥ ተካትተዋል፤ አዲስ ስሪታቸው ያልተቆለፈ ወይም slopsquatting የተደረገባቸው ጥቅሎች ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `audit:deps`                      | የአምስቱም ነጻ የቁልፍ ፋይሎች (root፣ Electron፣ OpenCode plugins v1/v2 እና provider) የnpm ኦዲት። ወሳኝ የደህንነት ማሳሰቢያዎች ያግዳሉ፤ ከፍተኛ ደረጃ ያላቸው ማሳሰቢያዎች ግን እንደሚታዩ ማስጠንቀቂያዎች ይቀራሉ። የጎደሉ ወይም ያልተሳኩ ኦዲቶች ያልተጠናቀቁ ተብለው ይቆጠራሉ እና ያግዳሉ፤ የእያንዳንዱ ወሰን የቁልፍ ፋይል ሃሾች እና ሪፖርቶች ይቀመጣሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                      |
| `check:lockfile`                  | የ`package-lock.json` ትክክለኛነት — https ሬጂስትሪ፣ የትክክለኛነት ሃሾች፣ የአስተናጋጅ ለውጦች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                      |
| `check:licenses`                  | ለምርት ጥገኛዎች የSPDX ፈቃድ የተፈቀዱ ዝርዝር                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                      |
| `check:tracked-artifacts`         | የግንባታ ቅርሶች / በማከማቻው የተመዘገቡ የ`node_modules` ምሳሌያዊ አገናኞች የሉም (በhusky pre-commit ውስጥም ይሠራል፤ pre-push ሆን ተብሎ ቀላል ተደርጓል — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                      |
| `check:ai-attribution`            | በPR ኮሚቶች፣ ርዕስ ወይም ይዘት ውስጥ የAI/ቦት `Co-Authored-By` መደምደሚያ ወይም የAI-ማመንጨት ግርጌ አይኖርም — ጥብቅ ደንብ #16 (ለPR→`release/**` በ`quality.yml` fast-gates ድግግሞሽ ውስጥ — የክስተቱን payload ያነባል፣ ከPR ውጭ ምንም አያደርግም — እንዲሁም ለPR→`main` በ`ci.yml` lint ውስጥ ያለ PR-ብቻ ደረጃ፤ እንዲሁም የhusky `commit-msg` hook፤ ሰብዓዊ ተባባሪ ደራሲዎች ይፈቀዳሉ፤ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | እያንዳንዱ የVitest ማግለል የክትትል ጉዳይን ይጠቅሳል እና በ`config/quality/vitest-exclusions.json` ውስጥ ይታያል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                      |
| `check:file-size`                 | የምንጭ ፋይሎች (በ`src/`፣ `open-sse/`፣ `electron/`፣ `bin/` ውስጥ ያሉ `.ts`/`.tsx`) በ`cap` ውስጥ፣ የሙከራ ፋይሎች (`*.test.ts(x)`) ደግሞ በ`testCap` ውስጥ ይቆያሉ፤ በ`file-size-baseline.json` ውስጥ የታገዱ ፋይሎች (`frozen` / `testFrozen`) ከተመዘገበው መጠናቸው በላይ ማደግ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                      |
| `check:error-helper`              | በexecutors/handlers ውስጥ ያሉ የስህተት ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()` ይጠቀማሉ (ጥብቅ ደንብ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                      |
| `check:migration-numbering`       | የMigration SQL ፋይሎች ያለ ክፍተት ወይም ድግግሞሽ በቅደም ተከተል ቁጥር ተሰጥቷቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                      |
| `check:public-creds`              | ከ`publicCreds.ts` ውጭ ቀጥተኛ OAuth `client_id`/`client_secret` ወይም Firebase Web ቁልፎች የሉም (ጥብቅ ደንብ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:db-rules`                  | ከ`src/lib/db/` modules ውጭ raw SQL የለም፤ ከ`localDb.ts` barrel-imports የሉም (ጥብቅ ደንቦች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                      |
| `check:known-symbols`             | በdispatch tables ውስጥ የተመዘገቡ provider executors፣ routing strategies እና translators በዲስክ ላይ ካሉት ፋይሎች ጋር ይዛመዳሉ — ወላጅ አልባ ወይም ያልታወጁ symbols የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                      |
| `check:route-guard-membership`    | child process የሚጀምር እያንዳንዱ route በ`isLocalOnlyPath()` ይመደባል (ጥብቅ ደንቦች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                      |
| `check:test-discovery`            | በማከማቻው ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ የሙከራ አስኬጅ ይሰበሰባል (ratchet፦ በ`test-discovery-baseline.json` ውስጥ ያለው የወላጅ አልባ ፋይሎች ዝርዝር መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                      |
| `check:test-tla-order`            | በ`tests/unit` ስር ያለ ምንም `node:test` ፋይል ሙከራ ከመመዝገቡ፣ ከፍተኛ ደረጃ `await` ከማግኘቱ እና ከዚያም ተጨማሪ ሙከራዎችን ከመመዝገቡ አይቀጥልም (#18045፤ ratchet፦ `test-tla-order-allowlist.json` መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                      |
| `check:agent-skills-sync`         | የተፈጠሩት የወኪል-ክህሎት ቅርሶች ከምንጭ ካታሎጋቸው ጋር ይዛመዳሉ (ልዩነት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | የአቅራቢ አርማዎች/ንብረቶች የተመዘገበ የምንጭ መረጃ ግቤት አላቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | የJSON ውቅር ፋይሎች በትክክል ይተነተናሉ እና የማከማቻውን የlint ደንቦች ያሟላሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | ያለ ስህተቶች የTypeScript ማጠናቀር (የምክር ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                      |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊትን ያማከለ፤ ቀድሞ የነበሩ ብዙ የጥሪ ቦታዎች አሁንም ማብራሪያዎችን ይፈልጋሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **የምክር ብቻ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | በ`src/app/(dashboard)/**` ላይ ብቻ የተወሰነ `tsc` (#7033) — የ`typecheck:core` በጥንቃቄ የተመረጠው የ27 ፋይሎች የፈቃድ ዝርዝር ምንም የዳሽቦርድ TSX አያካትትም፣ እንዲሁም `next build` ፈጽሞ የአይነት ማረጋገጫ አያደርግለትም (`next.config.mjs` `ignoreBuildErrors: true`ን ያዘጋጃል)፣ ስለዚህ በዚያ ያሉ የብቸኛ-መለያ ድግግሞሽ ስህተቶች (#6625/#6909) ለCI የማይታዩ ነበሩ። ልዩነቶችን ከተቆለፈ በእያንዳንዱ ፋይል/በእያንዳንዱ TS ኮድ ብዛት መነሻ (`config/quality/dashboard-typecheck-baseline.json`፣ ከ`check:known-symbols` ጋር ተመሳሳይ የጊዜ ያለፈበትን የማስገደድ ንድፍ) ጋር ያነጻጽራል — ከመነሻው ብዛት በላይ ያሉ አዲስ ስህተቶች ብቻ በሩን ያሳንፋሉ፤ አስቀድሞ የነበረ ስህተት ሲስተካከል በ`--update` የመነሻውን ወሰን ወደ ታች ያስተካክሉ።                                                                                                                                                                                                               | አዎ                                      |

### ሥራ፦ `quality-gate`

ከ`test-coverage` በኋላ ይሠራል። ሲወድቅ ውህደትን ያግዳል።

| ስክሪፕት                        | የሚያረጋግጠው                                                                                                                                      | አጋጅ                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `quality:collect`            | `quality-metrics.json`ን ያወጣል (የESLint ማስጠንቀቂያዎች ብዛት፣ ከተዋሃደው የሻርድ ሪፖርት የተገኘ ሽፋን)                                                               | አዎ (ከደረጃ-መቆጣጠሪያው በፊት) |
| `quality:ratchet`            | በ`quality-baseline.json` ውስጥ ያለ እያንዳንዱ መለኪያ አልተባባሰም (የESLint ማስጠንቀቂያዎች ≤ መነሻ፤ ሽፋን ≥ መነሻ)                                                      | አዎ                    |
| `check:duplication`          | የኮድ ድግግሞሽ (jscpd@4) በ`quality-baseline.json` ውስጥ ካለው መነሻ አያልፍም                                                                                | አዎ                    |
| `check:complexity`           | የፋይል-ደረጃ ሳይክሎማቲክ ውስብስብነት ከከፍተኛው ገደብ አያልፍም (ዋናው ESLint `complexity` + `max-lines-per-function`)                                                | አዎ                    |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ደረጃ-መቆጣጠሪያ (`eslint-plugin-sonarjs`) — የተለየ የESLint ሂደት፤ CI ሁለቱንም እንደ አንድ `check:complexity-ratchets` ደረጃ አዋህዶ ያስኬዳል            | አዎ                    |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ ወደ ውጭ የተላኩ ነገሮች / ፋይሎች ደረጃ-መቆጣጠሪያ (knip) ከመነሻው ጋር ሲነጻጸር አይባባስም                                                                    | አዎ                    |
| `check:compression-budget`   | የመጭመቅ መለኪያ የበጀት ገደብ — በእያንዳንዱ ኤንጂን የቶከን ቁጠባ ዝቅተኛ ገደቦች መባባስ የለባቸውም                                                                             | አዎ                    |
| `check:type-coverage`        | በመቶኛ የአይነት ሽፋን ደረጃ-መቆጣጠሪያ (`type-coverage`) አይባባስም፤ በአብዛኛው `typecheck:noimplicit:core`ን ይሸፍናል                                                 | አዎ                    |
| `check:codeql-ratchet`       | የተከፈቱ የCodeQL ማንቂያዎች ብዛት አይባባስም (በ`gh api` በኩል ያነባል፤ ቶከን ከሌለ በስህተት ሳይቋረጥ ይዘለላል) — የማደስ ድግግሞሽንና በእጅ ማስነሳትን በተመለከተ፦ ከታች "CodeQL ratchet"ን ይመልከቱ | አዎ                    |

### ሥራ፦ `quality-extended`

ሥራው ተፈጻሚ የሆኑ ዕጩዎችን ያግዳል። የቅርቅብ መጠን፣ የምስጢር ግኝቶች፣ የተጋላጭነት
ግኝቶች፣ የሥራ ፍሰት ግኝቶች እና የOpenAPI ለውጦች በአስገዳጅ ደረጃ-መቆጣጠሪያዎች ይፈተሻሉ።
የዑደታዊ-ጥገኝነት ምርመራዎች እንደ ምክር ብቻ ይቆያሉ። የስካነር ጭነት አስፈላጊ ነው፦
`scripts/ci/install-quality-scanners.sh` የተወሰኑ ስሪቶችን ያቀርባል እና የጭነት
ውድቀቶችን ያሰራጫል። የጎደሉ መሣሪያዎች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደሉ መነሻዎች
አስገዳጁን የስካነር በር ያልተጠናቀቀ ያደርጉታል።

| ስክሪፕት                    | የሚያረጋግጠው                                                                                                                                                                  | እገዳ                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:circular-deps`    | ዑደታዊ ጥገኞች አለመኖራቸውን (dpdm)                                                                                                                                                 | **አማካሪ**                                   |
| `check:bundle-size`      | የጥቅሉ መጠን ከከፍተኛው ገደብ እንደማያልፍ፤ ልኬቱ የማይገኝ ከሆነ ማረጋገጫው እንደሚወድቅ                                                                                                                 | **ከ--ratchet ጋር አጋጅ**                      |
| `check:secrets`          | የGitleaks ግኝቶች ወደ ኋላ እንደማይሄዱ፤ አስገዳጅ ቅኝቶች የጎደሉ መሣሪያዎችን/ምንጭን/መነሻ መስፈርትን፣ ያልተሳኩ ቅኝቶችን እና ልክ ያልሆኑ ሪፖርቶችን እንደማይቀበሉ                                                             | **ከ--ratchet ጋር አጋጅ**                      |
| `check:vuln-ratchet`     | የጥገኝነት ተጋላጭነቶች ወደ ኋላ እንደማይሄዱ፤ አስገዳጅ ቅኝቶች የጎደሉ መሣሪያዎችን፣ ልክ ያልሆኑ ሪፖርቶችን ወይም የጎደሉ መነሻ መስፈርቶችን እንደማይቀበሉ                                                                       | **ከ--ratchet ጋር አጋጅ**                      |
| `check:workflows`        | የየሥራ ፍሰት ሊንት ማረጋገጫ (actionlint + zizmor)፤ የጎደሉ/የተበላሹ ስካነሮች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደለ የratchet መነሻ መስፈርት እንደ INCOMPLETE ይወድቃሉ። ትክክለኛ ግኝቶች የተመረጠውን ጥብቅ/አማካሪ/ratchet ፖሊሲ ይከተላሉ | ማስኬድ ግዴታ ነው፤ zizmor ratchet በCI ውስጥ አጋጅ ነው |
| `check:openapi-breaking` | በተወሰኑ የክስተት ኮሚቶች ላይ የሕዝብ API ውልን ማረጋገጥ (የPR ውህደት መነሻ፣ ከpush በፊት፣ የmerge-group መነሻ፤ ለታቀደ/በእጅ ማስኬጃ መጀመሪያ የወጣው ዋና ወላጅ)፤ አስገዳጅ ልኬት ካልተሳካ በመዝጋት ይወድቃል                          | **ከ--ratchet ጋር አጋጅ**                      |

### ሥራ፦ `docs-sync-strict`

ወደ `main` ወይም `release/**` ለሚቀርቡ PRዎች፣ ይህ ሥራ የሚሰራው እንደ ሰነድ ወይም የኮድ ለውጦች ለተመደቡ፣ ረቂቅ ላልሆኑ (ወይም በታመነ ወረፋ ውስጥ ላሉ) እጩዎች ብቻ ነው። PR ባልሆኑ የCI ክስተቶችም ላይ ይሰራል፤ የዚህ የሥራ ፍሰት push ቀስቃሽ `main`ን ብቻ ይሸፍናል፣ `release/**`ን አይሸፍንም። ከዜሮ የተለየ የመውጫ ኮድ የሚመልስ ደረጃ ሥራውን ያግዳል፤ ለሪፖርት ብቻ የሚቀርቡ ግኝቶችና ከታች የተመዘገቡ ነፃ የተደረጉ ሁኔታዎች ግን አያግዱም።

| ስክሪፕት                          | የሚያረጋግጠው                                                                                                                                                                                                                                         | እገዳ                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `check:docs-all`               | ከታች ያሉትን 7 ንዑስ ማረጋገጫዎች በቅደም ተከተል የሚያስኬድ አጠቃላይ ማረጋገጫ                                                                                                                                                                                              | አዎ                                                                                 |
| ↳ `check:docs-sync`            | የፓኬጅ/OpenAPI/CHANGELOG ስሪቶች ወጥነት፣ ትክክለኛ የ`llm.txt` ቅጂዎች፣ የተተረጎመ CHANGELOG ክፍሎችና መጠን የማይለወጡ መስፈርቶች፣ እና በአዲስ የተተኩ ድግግሞሽ ሰነዶች አለመኖራቸው                                                                                                               | አዎ                                                                                 |
| ↳ `check:docs-frontmatter`     | የተጠናቀሩ የሰነድ ገጾች ትክክለኛ የfrontmatter ርዕሶች እንዳሏቸው                                                                                                                                                                                                   | አዎ                                                                                 |
| ↳ `check:docs-counts`          | ከፍተኛ እምነት ያላቸው የብዛት የማይለወጡ መስፈርቶች በጥብቅ ይተገበራሉ፤ በግምት ዘዴ የሚደረጉ የፋይል ብዛት ማረጋገጫዎች ስክሪፕቱ `--strict` ካልተቀበለ ማስጠንቀቂያ ብቻ ይሰጣሉ (የCI አጠቃላይ ማረጋገጫው ይህን አያስተላልፍም)                                                                                            | ጥብቅ ደረጃው ያግዳል፤ ለስላሳ ደረጃው ማስጠንቀቂያ ብቻ ይሰጣል                                           |
| ↳ `check:env-doc-sync`         | በምንጭ ኮድ ውስጥ የአካባቢ ተለዋዋጮች ንባቦች፣ `.env.example` እና `docs/reference/ENVIRONMENT.md`፣ በግልጽ የተዘረዘሩ የመተው፣ በሰነድ ብቻ ያሉና በአካባቢ ብቻ ያሉ ልዩ ፈቃድ ዝርዝሮች ከተተገበሩ በኋላ ይስማማሉ                                                                                        | አዎ፣ በሰነድ ከተገለጹት ልዩ ፈቃድ ዝርዝሮች ውጭ                                                    |
| ↳ `check:deprecated-versions`  | ችላ የተባሉ ሰነዶችን ሳያካትት፣ ከተገቢ ታሪካዊ አውዶች ውጭ ሊያረጁ የሚችሉ ስሪቶችንና ያረጁ የማዘመኛ ቀኖችን ሪፖርት ያደርጋል                                                                                                                                                                | በአሁኑ የCI ቅንብር ማስጠንቀቂያ ብቻ ይሰጣል (`--strict` አይተላለፍም)                                 |
| ↳ `check:doc-links`            | በሰነዶች ውስጥ ያሉ የውስጥ markdown አገናኞች ወደ እውነተኛ ፋይሎች እንደሚደርሱ (`[text]`/`(path)` ቅርጽ)                                                                                                                                                                   | አዎ                                                                                 |
| ↳ `check:fabricated-docs`      | በሰነዶች ውስጥ የተጠቀሱ መንገዶች፣ የአካባቢ ተለዋዋጮች፣ የCLI ትዕዛዞች፣ የhook ስሞች እና የፋይል ዱካዎች በኮድ መሠረቱ ውስጥ እንዳሉ። በ`--strict` በኩል ጥብቅ በር፤ ያለ ፍላጉ ለስላሳ ውድቀት።                                                                                                             | አዎ (በCI ውስጥ በ`--strict` በኩል)                                                       |
| `check:cli-i18n`               | ጥቅም ላይ የዋሉ የCLI `t()` ቁልፎች በ`en` ውስጥ አሉ፤ `pt-BR` እያንዳንዱን የላይኛው ደረጃ ክፍል ይጠብቃል፤ `zh-CN` እና `zh-TW` ሁሉንም የ`en` ቁልፎች ይይዛሉ                                                                                                                            | አዎ                                                                                 |
| `check:openapi-coverage`       | የOpenAPI ዝርዝር መግለጫ ቢያንስ በratchet የተወሰነውን ዝቅተኛ የእውነተኛ መንገዶች ብዛት እንደሚሸፍን                                                                                                                                                                           | አዎ                                                                                 |
| `check:openapi-security-tiers` | የታወጁት `x-loopback-only`/`x-always-protected` ማብራሪያዎች በ`routeGuard.ts` መደገፍ አለባቸው፤ የፓርሰርና የወደፊት አቅጣጫ አለመዛመዶች ያግዳሉ። ለአካባቢያዊ ብቻ ቅድመ ቅጥያዎች ስር የጎደለ `x-loopback-only`ን የሚፈትሸው የተቃራኒ አቅጣጫ ማረጋገጫ ማስጠንቀቂያ ይሰጣል፤ በንድፍ ብቻ የተገለጹ መንገዶች ከዚያ የተቃራኒ ፍተሻ ይወገዳሉ። | የፓርሰር/የወደፊት አቅጣጫ ማረጋገጫዎች ያግዳሉ፤ የተቃራኒ አቅጣጫ ማረጋገጫው ማስጠንቀቂያ ብቻ ይሰጣል                   |
| `check:openapi-routes`         | ምክንያት የተሰጠበት የ`KNOWN_STALE_SPEC` ልዩ ፈቃድ ዝርዝር ከተተገበረ በኋላ፣ በ`openapi.yaml` ውስጥ ያለ እያንዳንዱ `/api...` ዱካ የፓራሜትር ልዩነቶችን ሳይመለከት ከእውነተኛ መንገድ ጋር ይዛመዳል፤ ያረጁ የልዩ ፈቃድ ዝርዝር ግቤቶችም ማረጋገጫውን ያስወድቃሉ                                                             | አዎ                                                                                 |
| `check:docs-symbols`           | በቅጂ ያልሆኑ ቀዳሚ ሰነዶች ውስጥ ያሉ ውስጣዊ የ`/api/...` URL ማጣቀሻዎች ከእውነተኛ መንገድ ወይም የመንገዶች ቤተሰብ ጋር ይዛመዳሉ፤ የproxy/upstream/ቦታ ያዥ/ፋይል ማጣቀሻዎችና ምክንያት የተሰጣቸው የ`KNOWN_STALE_DOC_REFS` ግቤቶች ይገለላሉ፣ ያረጁ የልዩ ፈቃድ ዝርዝር ግቤቶች ግን ማረጋገጫውን ያስወድቃሉ                            | አዎ                                                                                 |
| `i18n translation drift`       | የዋና የተተረጎሙ ሰነዶች ምንጭ/ዒላማ ሃሾች ከ`.i18n-state.json` ጋር ይዛመዳሉ። PRዎች የሚወድቁት አዲስ በተጨመረ የምንጭ፣ የጎደለ ዒላማ ወይም የዒላማ ሃሽ ልዩነት ብቻ ነው፤ PR ያልሆኑ ማረጋገጫዎች ጥብቅ ናቸው። በPR የተወረሱ ልዩነቶችና ያረጁ ዒላማዎች የምንጭ ሃሾች ማስጠንቀቂያዎች ናቸው።                                               | በPR ውስጥ አዲስ ልዩነት እና PR ባልሆኑ ጥብቅ ፍተሻዎች ያለ ልዩነት ያግዳሉ፤ የተወረሰ/ያረጀ ልዩነት ማስጠንቀቂያ ብቻ ይሰጣል |

በ`docs/diagrams/` ስር ያሉት የREADME አሥራ ሁለቱ SVGዎች በ`scripts/docs/gen-readme-<name>.mjs` ይመነጫሉ፤ `npm run docs:readme-diagrams` ሁሉንም እንደገና ያመነጫል።
እያንዳንዳቸው ባይት በባይት የሚያነጻጽር የዩኒት ሙከራ አላቸው (`tests/unit/docs/readme-*-svg.test.ts`፣ በ`test-unit` ጆብ)፤ በGit የተመዘገበው ፋይል ሲያረጅ ሙከራው ይወድቃል።
`check:docs-counts` ዋናዎቹን ቁጥሮች ከ`<text>` ኖዶቻቸው ያነባል፤ ስለዚህ ቁጥሮቹ ወደ ቅርጽ መንገዶች ፈጽሞ አይቀየሩም።
የSVG ዋና ቁጥሮች ምርመራ በ`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) የተዘረዘሩትን ፋይሎች ያነባል፦ `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`።
ለዘላለም ነፃ ስለሆኑ አቅራቢዎች፣ የካታሎግ ግቤቶች፣ ተደጋጋሚ ፑሎች እና የነጥብ መስጫ ምክንያቶች የሚደረጉ ማረጋገጫዎችም `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` ያነባሉ።
`free-tier-budget.svg` ቁጥሮቹን ከወቅታዊው ካታሎግ ጫኚ ያገኛል፤ ስለዚህ `FREE_MODEL_BUDGETS` ወይም የአቅራቢ ማሳያ ስም ሲቀየር፣ ያ ፋይል እስኪመነጭ ድረስ CI ይወድቃል።

### ሥራ፦ `i18n-ui-coverage`

| ስክሪፕት                               | የሚያረጋግጠው                                                                                                                                                         | አጋጅ        |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (ውስጠ-መስመር) | የUI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                                        | አዎ         |
| `check-ui-value-drift` (ውስጠ-መስመር)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ከኋላው ጊዜ ያለፈበት ትርጉም እንዳይቀር ያረጋግጣል                                                                                                      | አዎ         |
| `check-new-key-coverage` (ውስጠ-መስመር) | **አዲስ** የእንግሊዝኛ ቁልፍ በእያንዳንዱ አካባቢያዊ ቋንቋ ተተርጉሟል — የ`__MISSING__:` ምልክት ውድቅ ይደረጋል                                                                                   | አዎ         |
| `check-translation-ratio`           | በእያንዳንዱ አካባቢያዊ ቋንቋ ያለው የእውነተኛ ትርጉም ሬሾ (ከእንግሊዝኛ ጋር ተመሳሳይ / ቦታ ያዥ / ከፈቃድ ዝርዝሩ ውጭ የጎደሉ ቅጠሎች) `config/quality/i18n-translation-baseline.json` + የመፍቀጃ ህዳግን ማለፍ የለበትም | **ምክር ሰጪ** |

`fetch-depth: 0` ያስፈልገዋል — የእሴት-ለውጥ መከላከያው `en.json`ን ከውህደት መሠረቱ ጋር ያነጻጽራል።

#### `check-ui-value-drift` — ጊዜ ያለፈበት ትርጉም መከላከያ

ሌሎቹ መከላከያዎች በመዋቅራዊ ሁኔታ ሊያዩት የማይችሉትን አንድ የi18n ወደኋላ መመለስ ይይዛል፦ የእንግሊዝኛ እሴት
እንደገና ሲጻፍ እና ከ_ቀዳሚው_ እንግሊዝኛ የተወሰዱ ትርጉሞች ሳይቀየሩ ሲቀሩ፣
እንግሊዝኛ ያልሆነ ቋንቋ ተጠቃሚዎች በልበ ሙሉነት የተጻፈ፣ አሁን ግን የተሳሳተ ጽሑፍ ማንበባቸውን ይቀጥላሉ።

ይህ በእውነት ወደ ምርት ተለቋል። የAntigravity የመግቢያ አጋዥ ሲጨመር (#5203) `oauthModal.googleOAuthWarning` እንደገና ተጻፈ፤ **ከ43 አካባቢያዊ ቋንቋዎች 39ኙ**
ኦፕሬተሮችን "ሙሉ URLን ቅዱ እና ከታች ለጥፉት" የሚል ጽሑፍ እንዲያነቡ አደረጉ — ለዚያ አቅራቢ መጠናቀቅ የማይችል ፍሰት ነው። ይህ
እስከ #8463 ድረስ ሳይስተዋል ቆየ፣ ምክንያቱም፦

- `sync-ui-keys` **የሌሉ** ቁልፎችን ብቻ ይሞላል፤ **ጊዜ ያለፈባቸውን** ፈጽሞ አይሞላም፤
- `check-ui-keys-coverage` የቁልፍ _መኖርን_ ይቆጥራል፣ ስለዚህ ጊዜ ያለፈበት ትርጉም እንደተሸፈነ ነጥብ ያገኛል፤
- `check-translation-drift` የ`docs/i18n/<locale>/**.md` ሰነድ መስተዋቶችን ይከታተላል —
  `src/i18n/messages/*.json`ን ፈጽሞ አያነብም። ከ2026-09 ዳግም ማመሳሰል ጀምሮ በ`docs-sync-strict` ሥራ ውስጥ አጋጅ ነው፦ ዋና ሰነድ ያርትዑ → `npm run i18n:run -- --files=<doc>` (በክፍል ደረጃ፣ ዝቅተኛ ወጪ)።

**ልዩነትን የሚያውቅ እንጂ በመነሻ መስፈርት ላይ የተመሠረተ አይደለም።** በውህደት መሠረቱ ያለውን `en.json` ከሥራ ዛፉ ጋር ያነጻጽራል፤ የእንግሊዝኛ እሴቱ ለተቀየረ እያንዳንዱ ቁልፍ፣ ያልተነካ ትርጉም እንደያዘ የቀረ ማንኛውም አካባቢያዊ ቋንቋ ጊዜ ያለፈበት ነው። ይህ ሆን ብሎ **ቀድሞ የነበረውን ዕዳ ያቀዘቅዛል** — አንድ ልዩነት
ለረጅም ጊዜ የቆየ ትርጉም ከየትኛው አሮጌ እንግሊዝኛ እንደመጣ ሊያሳይ አይችልም፣ ስለዚህ መከላከያው
የአሁኑ ለውጥ የነካውን ብቻ ይገመግማል። አማራጩ (በእያንዳንዱ ቁልፍ ላይ የተመሠረተ የhash መነሻ መስፈርት) በእያንዳንዱ i18n PR ላይ እየተለዋወጠ፣
ከነባሩ ትልቁ የመነሻ መስፈርት 3× የሆነ ~600 KB የመነጨ ፋይል ያስከፍላል።

ይህን ለማሟላት ሁለት መንገዶች አሉ፦

1. የተነኩትን ትርጉሞች ያዘምኑ፣ ወይም
2. ወደ `__MISSING__:<new english>` ያቀናብሯቸው — ከዚያ የአሂድ ጊዜው የተስተካከለውን እንግሊዝኛ ያቀርባል
   (`src/i18n/request.ts::deepMergeFallback`, #7258) እና ቁልፉ ለትርጉም ወረፋ ይይዛል።

የሕብረቁምፊው **ትርጉም** ከተቀየረ፣ **ቁልፉን እንደገና መሰየምን** ይምረጡ፦ አዲስ ቁልፍ ጊዜ ያለፈበትን ትርጉም ሊወርስ አይችልም። #8463 የተጠቀመው ንድፍ ይህ ነው።

```bash
npm run i18n:check-value-drift          # ጥብቅ (CI የሚያስኬደው)
npm run i18n:check-value-drift:warn     # ሪፖርት ብቻ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

የመሠረት ካታሎጉ ሊነበብ በማይችልበት ጊዜ (የመሠረት ref የሌለው ጥልቀት የሌለው
clone) `SKIP reason=base-unresolved` በማለት በ0 ይወጣል፤ ይህም `check-openapi-breaking`ን ያንጸባርቃል።

### ሥራ፦ `i18n`

ሙሉ የi18n ማረጋገጫ ማትሪክስ (ለእያንዳንዱ አካባቢያዊ ቋንቋ አንድ ሥራ)። ሙሉው ሥራ ምክር ሰጪ ነው።

| ስክሪፕት                           | የሚያረጋግጠው                          | አጋጅ                                               |
| ------------------------------- | --------------------------------- | ------------------------------------------------- |
| `validate_translation.py quick` | በእያንዳንዱ አካባቢያዊ ቋንቋ ያለው የትርጉም ሙሉነት | **ምክር ሰጪ** (በሙሉው ሥራ ላይ `continue-on-error: true`) |

### ሥራ፦ `pr-test-policy`

በpull requestዎች ላይ ብቻ ይሠራል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                          | አጋጅ |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | --- |
| `check:pr-test-policy` | በ`src/`፣ `open-sse/`፣ `electron/` ወይም `bin/` ውስጥ የምርት ኮድን የሚቀይሩ PRዎች ፈተናዎችን ማካተት ወይም ማዘመን አለባቸው (ጥብቅ ደንብ #8)      | አዎ  |
| `check:test-masking`   | የተቀየሩ የፈተና ፋይሎች አጠቃላይ የassert ብዛትን እንዳይቀንሱ ወይም የ`assert.ok(true)` ተደጋጋሚ እውነቶችን እንዳይጨምሩ                            | አዎ  |
| `check:pr-evidence`    | የPR ይዘት ለለውጡ የፈተና/VPS ማስረጃን ይጠቅሳል (የPR ጽሑፍን በgrep በመፈለግ ጥብቅ ደንብ #18ን ወደ ራስ-ሰር ሂደት ይቀይራል — ደካማ ነው፣ Backlogን ይመልከቱ) | አዎ  |

### ሥራ፦ `test-vitest`

ከ`build` በኋላ ይሠራል። ካልተሳካ ውህደትን ያግዳል።

| ስብስብ             | የሚያረጋግጠው                                               | አጋጅ                                                                                |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሣሪያዎች)፣ autoCombo፣ cache — vitest አስኬጅ | አዎ                                                                                 |
| `test:vitest:ui` | የUI ክፍሎች ሙከራዎች — vitest አስኬጅ                           | **አጋጅ** — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በግልጽ ተገልለዋል፤ አዲስ ውድቀቶች ሥራውን ያሳኩታል |

### የሌሊት የሥራ ፍሰቶች (በመርሐግብር የሚሰሩ፣ ምክር ሰጪ)

እነዚህ በcron መርሐግብር (እና `workflow_dispatch`) ይሰራሉ፤ በPRዎች ላይ ፈጽሞ አይሰሩም። ሁሉም ምክር ሰጪ ናቸው።

| የሥራ ፍሰት                | የሚያረጋግጠው                                                                                                                                       | አጋጅነት      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | የfast-check ባህሪ ሙከራዎችን በዘፈቀደ መነሻ እሴት + ከፍተኛ የማስኬጃ ብዛት ያካሂዳል                                                                                    | **ምክር ሰጪ** |
| `nightly-resilience`   | የheap ዕድገት መቆጣጠሪያ፣ የchaos ስህተት ማስገባት፣ የk6 ጭነት/የረጅም ጊዜ ጭነት ሙከራ                                                                                  | **ምክር ሰጪ** |
| `nightly-llm-security` | የpromptfoo የመርፌ ጥቃት መከላከያ (የማገድ ሁነታ) + የgarak መመርመሪያዎች (የአቅራቢ ሚስጥር ከሌለ ይዘለላሉ)                                                                  | **ምክር ሰጪ** |
| `nightly-schemathesis` | `docs/openapi.yaml`ን በመጠቀም በቀጥታ በሚሰራ OmniRoute ላይ የOpenAPI ውል የfuzz ሙከራ (schemathesis) — የዝርዝር መግለጫ ጥሰቶችን / ያልተያዙ 500 ስህተቶችን ያጋልጣል (ደረጃ 8 B.4) | **ምክር ሰጪ** |
| `nightly-mutation`     | በፈጣን የunit መስመር ላይ የStryker ሚውቴሽን-ሙከራ ውጤት — የተረፉ ሚውታንቶች ደካማ ማረጋገጫዎችን ያጋልጣሉ                                                                     | **ምክር ሰጪ** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ላይ የNode engine ተኳኋኝነት ማትሪክስ                                                                                        | **ምክር ሰጪ** |

የአፈጻጸም መነሻ መለኪያዎች (heap፣ TTFB፣ የግንባታ ጊዜ) ይመዘገባሉ እንጂ እንደ ማለፊያ መስፈርት አያገለግሉም፦ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)ን ይመልከቱ።

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

## የፈቃድ ዝርዝር ፖሊሲ

ከዚህ ቀደም በነበሩ ጥሰቶች ምክንያት ሊወድቅ የማይችል እያንዳንዱ ጌት የተወሰነ እና የማይለወጥ የፈቃድ ዝርዝር ይጠቀማል
(ለምሳሌ፣ `KNOWN_STALE_DOC_REFS`፣ `KNOWN_MISSING`፣ `KNOWN_RAW_SQL`)። ፖሊሲው፦

**ዋናውን መንስኤ ያስተካክሉ፤ የፈቃድ ዝርዝሩን ጥሰቱ ከዚህ ቀደም የነበረ እና
በተመሳሳይ PR ውስጥ ሊስተካከል የማይችል ከሆነ ብቻ ይጠቀሙ።**

ወደ የፈቃድ ዝርዝር ግቤት ሲጨምሩ፦

1. ምክንያቱን የሚያብራራ አስተያየት ያካትቱ።
2. የክትትል ጉዳዩን ይጥቀሱ (ለምሳሌ፣ `// #3498 — Phase 2 feature, not yet implemented`)።
3. ጥሰቱን በሚያስተካክለው ተመሳሳይ PR ውስጥ ግቤቱን ያስወግዱ — ንቁ ጥሰትን ከእንግዲህ
   የማያፍን ጊዜ ያለፈበት ግቤት ራሱ ጉድለት ነው (6A.3 የጊዜ ያለፈበት ማስፈጸሚያ ሲተገበር
   ባለቤት በሌለው የፈቃድ ዝርዝር ግቤት ምክንያት ጌቱን ያወድቃል)።

ሙከራዎችን በፍጥነት ለማሳለፍ የፈቃድ ዝርዝር ግቤቶችን **አይጨምሩ**። እያደገ ካለ
የፈቃድ ዝርዝር ጋር አረንጓዴ የሆነ ጌት ስለ ጥራት የተሳሳተ እምነት ይፈጥራል።

### በእርስዎ PR ላይ ጌት ሲወድቅ

1. **የጌቱን ውጤት በጥንቃቄ ያንብቡ** — ደንቡን የጣሰውን ፋይል ወይም ምልክት በትክክል
   ይነግርዎታል።
2. **ጥሰቱን ያስተካክሉ** — አብዛኛዎቹ ጌቶች ኮዱ ትክክል እንደሆነ
   ወዲያውኑ የሚያልፉ፣ ውጤታቸው ሁልጊዜ ተመሳሳይ የሆነ የፋይል ስርዓት ፍተሻዎች ናቸው።
3. **ጥሰቱ ከዚህ ቀደም የነበረ ከሆነ** (ማለትም፣ እርስዎ ያስከተሉት ሳይሆን ጌቱ አሁን
   የሚሸፍነው ከሆነ)፦ ምክንያቱን ከሚያብራራ አስተያየት እና ከክትትል ጉዳይ ጋር የፈቃድ ዝርዝር ግቤት ያክሉ።
4. **ጌቱ ራቼት ከሆነ** (ሽፋን፣ ESLint ማስጠንቀቂያዎች፣ ድግግሞሽ፣ ውስብስብነት)፦
   ለውጥዎ መለኪያውን አባብሶታል። መሠረታዊውን ችግር ያስተካክሉ፣ ወይም (አልፎ አልፎ) ለውጡ
   ሆን ተብሎ የተደረገ እና የመለኪያው መቀነስ ተቀባይነት ያለው ከሆነ
   `npm run quality:ratchet -- --update`ን ያስኪዱ — ነገር ግን ምክንያቱን በPR መግለጫው ውስጥ ይመዝግቡ።
5. **የምክር ጌቶች** (`continue-on-error: true`) ለመረጃ ብቻ ናቸው — ውህደትን
   አያግዱም፣ ነገር ግን በCI ማጠቃለያ ውስጥ ይታያሉ። ያም ሆኖ ያስተካክሏቸው።

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

## የማመቻቸት የኋላ ቀር ሥራዎች (የROI ግምገማ — ደረጃ 9 ሞገድ 3)

ይህ ዝርዝር በ2026-06-17 ከ`ci.yml` ጋር ተመሳክሯል (የቀድሞው ስሪት
`audit:deps`፣ `check:tracked-artifacts`፣ `check:lockfile`፣ `check:licenses`፣
`check:dead-code`፣ `check:cognitive-complexity`፣ `check:type-coverage`፣
`check:codeql-ratchet`፣ `check:pr-evidence`ን አላካተተም ነበር)። የተመሳከረው ስብስብ የROI ግምገማ
የሚከተሉትን የማመቻቸት እጩዎች ለይቷል። **ውህደቶቹ ሜካኒካዊ የCI
ለውጦች ናቸው፤ መቀየሮቹ/ማስወገዶቹ ለኦፕሬተሩ የተተዉ የፖሊሲ ውሳኔዎች ናቸው።** ከታች ያለው ምንም ነገር
እስካሁን ተግባራዊ አልተደረገም።

**በተጨማሪም ከላይ ያልተመዘገቡ** (አማካሪ፣ ዝቅተኛ ምልክት ያላቸው)፦ የ`docs-lint` ሥራ
(markdownlint + Vale፣ ሙሉው ሥራ `continue-on-error`) እና ራሳቸውን የቻሉ የስካነር የሥራ ፍሰቶች
`semgrep.yml` / `codeql.yml` / `scorecard.yml`። `semgrepFindings: 0` በ
`quality-baseline.json` ውስጥ አለ፣ ነገር ግን በ`ci.yml` ውስጥ ከአጋጅ ራቼት ጋር አልተገናኘም — መለኪያው
በአሁኑ ጊዜ የተገለለ ነው።

### ውህደት / ድግግሞሽ ማስወገድ (ሜካኒካዊ፣ ዝቅተኛ አደጋ)

እያንዳንዱ እጩ በ2026-06-17 በነበረው የቀጥታ ጌት ሁኔታ ላይ ተረጋግጧል (እመን፣ ግን አረጋግጥ)፤
በርካታ "ግልጽ" የሚመስሉ ውህደቶች ዕዳን እንደሚደብቁ ታውቋል፣ እና **እንዳሉ በቀጥታ ሊተኩ የሚችሉ አይደሉም**።

- **`check:docs-sync` ሁለት ጊዜ ይሰራል** — በ`lint` ሥራ ውስጥ ራሱን ችሎ እና እንደገና በ`check:docs-all` (`docs-sync-strict`) ውስጥ፣ እንዲሁም በhusky pre-commit hook ውስጥ። ✅ **ተጠናቋል** — በ`lint` ውስጥ ራሱን ችሎ የነበረው ጥሪ ተወግዷል።
- **የCVE ቅኝት** — ❌ **ንጹሕ ውህደት አይደለም።** `audit:deps` በአምስቱም lockfiles ላይ ያሉ ወሳኝ ማስጠንቀቂያዎችን እና ያልተሟሉ ኦዲቶችን ያግዳል፤ በአሁኑ ፖሊሲ ደግሞ ከፍተኛ ማስጠንቀቂያዎችን እንደ ማስጠንቀቂያ ሪፖርት ያደርጋል፤ `check:vuln-ratchet` (osv) የሚከሽፈው በሬፖዚቶሪው ውስጥ ከተመዘገበው baseline አንጻር _ማሽቆልቆል_ ሲኖር ብቻ ሲሆን፣ ሲያስፈልግ የጎደሉ መለኪያዎችንም ውድቅ ያደርጋል። ትርጉማቸው የተለያየ ነው — `audit:deps`ን ማስወገድ ፍጹም የሆነውን ወሳኝ ጌት እና ገለልተኛ የፓኬጅ ኦዲት ደረሰኞችን ያሳጣል። ሁለቱንም አቆዩ።
- **የዑደት ማግኘት** — ✅ **ተጠናቋል** (#15159 G-01/G-02)። እዚህ የነበረው የድሮ ጽሑፍ `check:cycles`ን "አረንጓዴው፣ የተመረጠው" ጌት ብሎ ይጠራው ነበር፤ እንዲሁም `check:circular-deps` (dpdm) 91 ዑደቶችን ሪፖርት ስላደረገ፣ አጋጅ ሆኖ እንዲቀጥል ምክንያት ይሰጥ ነበር። ያ አረንጓዴ ሁኔታ **የሐሰት አረንጓዴ** ነበር፦ `check:cycles` 5 ንዑስ ማውጫዎችን (450 ፋይሎች) ቃኝቷል፣ የማይለወጥ `import|export … from` ብቻ አዛምዷል፣ እና እያንዳንዱን `@/` እና `@omniroute/open-sse/` specifier አስወግዷል፤ በመሆኑም በሬፖው ውስጥ የበዙትን dynamic-import + alias ዑደቶች ማየት አልቻለም። ተስተካክሏል፦ ጌቱ አሁን `src` + `open-sse`ን (5023 ፋይሎች) ይሸፍናል፣ specifiersን ከTypeScript AST ይሰበስባል (ስለዚህ `import("…")` ይቆጠራል፣ በtype-position ያለው `typeof import("…")` ግን አይቆጠርም)፣ እና የtsconfig `paths`ን ይፈታል። 0 ሳይሆን **14** ዑደቶችን ያገኛል። አስቀድመው የነበሩ 14 ዑደቶች በአንድ gate PR ውስጥ ሊስተካከሉ ስለማይችሉ፣ `check:cycles` አሁን **ራቼት** ነው (`--ratchet`፣ በ`quality-baseline.json` ውስጥ ጣሪያው `metrics.cycles.value = 14`፣ `direction: down`) — ማንኛውንም _ማሽቆልቆል_ ያግዳል፣ እና ቁጥሩ ወደ ታች ብቻ ሊሄድ ይችላል። CI `npm run check:cycles:ratchet`ን ያስኬዳል። ቀስ በቀስ የማስወገድ ሥራው ከ**A-01** ጋር ይከናወናል። `check:circular-deps` (dpdm) እንደ ሰፊ ሁለተኛ አስተያየት አማካሪ ሆኖ ይቆያል።
- **ውስብስብነት** — ✅ **ተጠናቋል** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`)፦ አንድ የESLint ቅኝት፣ የcyclomatic+max-lines እና cognitive baselines ገለልተኛ ሆነው እንዲቆዩ በruleId ይቆጥራል፤ የየራሳቸው `check:complexity` / `check:cognitive-complexity` ለአካባቢያዊ `--update` እንዳሉ ይቀጥላሉ።
- **የ`/api` ፀረ-ቅዠት ማረጋገጫ** — ✅ **ተጠናቋል** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`)፦ የ`src/app/api` አንድ የFS ዝርዝር፣ openapi-routes + docs-symbols አሁንም በተናጠል ሪፖርት ያደርጋሉ፤ የየራሳቸው ትእዛዞች ለአካባቢያዊ አስኬዶች እንዳሉ ይቀጥላሉ።
- **`check:node-runtime` በ11 ሥራዎች ውስጥ ይሰራል** — ⚠️ **ዝቅተኛ ROI።** እያንዳንዱ የተለየ runner ነው፣ እና ማረጋገጫው <1s ነው፤ ጠቅላላ ቁጠባው ~10s ሲሆን፣ በምላሹ ርካሽ የሆነ የየሥራው ጥበቃ ይጠፋል። ለውጡ የሚያስከትለው መረበሽ ዋጋ የለውም።
- **በCI lint ላይ `typecheck:noimplicit:core`** — ✅ **ከlint ሥራው ተወግዷል** (አማካሪ `continue-on-error` ነበር)፤ አጋጅ የtype ወሰኑ `typecheck:core` + `check:type-coverage` ነው። አካባቢያዊው script ተጠብቋል።

### መቀየር / መወሰን (የኦፕሬተር ፖሊሲ)

- `check:openapi-security-tiers` (አማካሪ) — ❌ **ያለችግር ሊቀየር አይችልም።** በ`LOCAL_ONLY_API_PREFIXES` ስር ያሉ በርካታ የ`traffic-inspector` routes የ`x-loopback-only: true` annotation እንደሌላቸው በማስጠንቀቅ 0 ይዞ ይወጣል። እሱን ማስገደድ መጀመሪያ እነዚያን annotations ወደ `openapi.yaml` መጨመርን ይጠይቃል።
- `typecheck:noimplicit:core` (አማካሪ) — በአጋጁ `check:type-coverage` ራቼት በአብዛኛው ተሸፍኗል። ወደ ራቼት ቀይሩት ወይም የተደጋገመውን ሁለተኛ `tsc` pass አስወግዱ።
- `test:vitest:ui` (አሁን **አጋጅ**) — አስቀድመው የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በ`// #8618` መከታተያ አስተያየቶች በግልጽ ተገልለዋል፤ አዳዲስ ውድቀቶች ሥራውን ያከሽፋሉ።
- `check:secrets` (gitleaks፣ አጋጅ ራቼት) — የአሁኑ ጣሪያ በ`quality-baseline.json` ውስጥ `metrics.secretFindings` ነው። ማንኛውም ልዩ ሁኔታ በምክንያት የተደገፈ የ`.gitleaks.toml` ግቤት ያስፈልገዋል፤ የማይገኝ መለኪያ INCOMPLETE ነው። ቅኝቱ የGitHubን ቤተኛ secret scanning እና `check:public-creds`ን ያሟላል።
- `check:pr-evidence` (አጋጅ፣ የPR-body ጽሑፍን grep ያደርጋል) — ከፍተኛ የሐሰት-አዎንታዊ ውጤት አደጋ አለው፤ ከተወገደ የHard Rule #18 አስፈጻሚነትን ያዳክማል፣ ስለዚህ ይህ እውነተኛ የፖሊሲ ውሳኔ ነው።
- `semgrep` (ራሱን የቻለ አማካሪ) — በOWASP ምድቦች ላይ ከCodeQL ጋር ይደራረባል፤ baselineውን ከራቼት ጋር ያገናኙ ወይም ያስወግዱት።

---

## ተዛማጅ ሰነዶች

- የአቅርቦት ሰንሰለት (መነሻ፣ SBOM፣ Trivy፣ Scorecard)፦ [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — የቁልፍ ስብስብ እኩልነት መቆጣጠሪያ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`፣ ሥራ `i18n-ui-coverage`)።
የእያንዳንዱን `src/i18n/messages/<locale>.json` የመጨረሻ ቅርንጫፍ ቁልፍ ስብስብ ከ`en.json` ጋር ያወዳድራል፤ እና
ቁልፉ መቼ እንደታከለ ሳይመለከት፣ በማንኛውም የጎደለ ወይም ተጨማሪ የመጨረሻ ቅርንጫፍ ላይ ያሳንፋል። `__MISSING__:` ቦታ ያዥ ምልክቶች
እንደተገኙ ይቆጠራሉ (ይዘታቸው የሬሾ መቆጣጠሪያው ጉዳይ ነው)። ይህ በልዩነት/በመቶኛ ላይ የተመሠረቱትን
ሁለት መቆጣጠሪያዎች ሙሉ በሙሉ ያሟላል፦ `check-ui-keys-coverage` ለእያንዳንዱ
ቋንቋ 80 % ዝቅተኛ ወሰንን ያስገድዳል (ከ~13,000 ቁልፎች 43 ቢጎድሉም አሁንም 99.7 % ተብሎ ይነበባል)፣ `check-new-key-coverage` ደግሞ
PR ወደ `en.json` የሚያክላቸውን ቁልፎች ብቻ ይገመግማል። የቋንቋ ጥቅል ቅርንጫፉ በተፈጠረበት ቀን ከነበረው `en.json`
ይመነጫል፣ እና መሠረታዊው ቅርንጫፍ ቁልፎችን ማከል ሲቀጥል ለቀናት ትርጉም ይሠራል፤ የጥቅሉ PR ራሱ ምንም
ቁልፍ አይጨምርም፣ ስለዚህ ጥቅል 1 (#13044) በዘጠኝ
ቋንቋዎች 43 ቁልፎች ጎድለውት፣ ጥቅል 2 (#13660) ደግሞ በስምንት ቋንቋዎች 10 ቁልፎች ጎድለውት ሲዋሃዱ ሁለቱም ተዛማጅ መቆጣጠሪያዎች ዝም ብለው ቀርተዋል (2026-09-15)። ቀይ ስህተትን በ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ያስተካክሉ፤ `extra` የመጨረሻ ቅርንጫፍ
ማለት ምንጩ እንዳስወገደው ነው — ከቋንቋው ፋይል ይሰርዙት። `--warn` ሳያሳንፍ ሪፖርት ያደርጋል።
`--catalog=cli` ይህንኑ ንጽጽር በ`bin/cli/locales` ላይ ያካሂዳል (`npm run i18n:check-keys:cli`)፤
ሁለቱም ደረጃዎች በ`i18n-ui-coverage` ሥራ ውስጥ ይገኛሉ።

#### `check-new-key-coverage` — የአዲስ ቁልፍ i18n መቆጣጠሪያ

የ`check-ui-value-drift` ተዛማጅ መቆጣጠሪያ። ያኛው የእንግሊዝኛ እሴት **እንደገና ሲጻፍ**
ትርጉሞቹ ሳይሻሻሉ መቅረታቸውን ያገኛል፤ ይህኛው ደግሞ የእንግሊዝኛ ቁልፍ **ሲታከል**
አንዳንድ ቋንቋዎች ቁልፉን ፈጽሞ አለመቀበላቸውን ያገኛል።

`check-ui-keys-coverage` ይህን ዓይነት ሁኔታ ማየት አይችልም፦ ለእያንዳንዱ ቋንቋ የመቶኛ ዝቅተኛ ወሰን ያስገድዳል፣ እና
ከ~13,000 የመጨረሻ ቅርንጫፎች አሥራ አንድ ቁልፎች ቢጎድሉም ሽፋኑ 99.9% ላይ ይቆያል። የእያንዳንዱ ቋንቋ መቶኛ
"ይህ ባህሪ ሳይተረጎም ተለቀቀ" የሚለውን መግለጽ አይችልም — አንድ ሙሉ ባህሪ ምንም
ጽሑፍ ሳይኖረው በአዲስ ቋንቋ ሊካተት እና ቁጥሩን ፈጽሞ ላይቀይር ይችላል።

የሚወክለው ክስተት፦ የOrchestration Canvas ደረጃ 3 አሥራ አንዱን ቁልፎቹን
በወቅቱ በነበሩት 42 ቋንቋዎች ተርጉሟል። ከሰዓታት በኋላ የEU ቋንቋ ጥቅል (#13044) ማከማቻውን
ወደ 51 ቋንቋዎች አሳደገው፣ እና ዘጠኙ አዲስ ቋንቋዎች (`el`፣ `et`፣ `ga`፣ `hr`፣ `lt`፣ `lv`፣ `mt`፣ `sl`፣ `sr`)
እነዚህን ቁልፎች ፈጽሞ አላገኙም። `deepMergeFallback` በጎደለ ቁልፍ ምትክ እንግሊዝኛን ያስገባል፣ ስለዚህ የውድቀቱ ሁኔታ
ባዶ UI ከመሆን ይልቅ ያልተተረጎመ UI ነበር — እውነተኛ ችግር፣ እና በንድፉ ምክንያት ጸጥ ያለ።

እንደ ተዛማጁ መቆጣጠሪያ ሁሉ ይህም **ልዩነትን የሚያውቅ** ነው፤ በመዋሃድ መሠረቱ ላይ ያለውን እንግሊዝኛ ከሥራ
ዛፉ ጋር ያወዳድራል፣ ስለዚህ ቀድሞ የነበሩ ክፍተቶች እንዳሉ ይቀራሉ እና መቆጣጠሪያውን ለማንቃት ምንም የውሂብ ፍልሰት አላስፈለገም።

**የ`__MISSING__:<english>` ምልክት መስፈርቱን አያሟላም (ከ2026-09-17 ጀምሮ)።** ቀደም ሲል በሰነድ የተገለጸው
የማዘግያ ዘዴ ነበር — በሚሠራበት ጊዜ ስርዓቱ ወደ ትክክለኛው እንግሊዝኛ ይመለሳል — ነገር ግን በ
2026-09-16 ስምንት የባህሪ PR-ዎች 61 ቁልፎችን ጨምረው ከመተርጎም ይልቅ በሁሉም 65 ቋንቋዎች ላይ ምልክቱን አስቀመጡ፦ ይህ
መቆጣጠሪያ ሁሉንም ተቀበለ፣ PR-ዎቹን ምንም አላገዳቸውም፣ ከዚያም እገዳ የሚያደርገው የእውነተኛ ትርጉም ሬሾ መቆጣጠሪያ
በልቀቱ የመጨረሻ ስሪት ላይ ለሁሉም አልፏል (pt-BR 3.2 % > 2.5 % + 0.5)። አሁን ምልክት
እንደጎደለ ትርጉም ይቆጠራል። ቀይ ስህተትን በ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ያስተካክሉ፣ ወይም
ሁሉንም ቋንቋዎች በትይዩ በ`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`፣
ከቅርንጫፍ የተለየ ሁኔታን የሚደግፍ፣ የ`OMNIROUTE_TRANSLATION_*` አካባቢ ተለዋዋጮች ከሌሉ መጀመርን የሚከለክል)። በእንግሊዝኛ መቆየት ያለበት ቁልፍ
(ቋሚ የሆነ የምርት/ሞተር/አማራጭ ስም) በ`scripts/i18n/untranslatable-keys.json` ውስጥ መካተት አለበት፣
ፈጽሞ ከምልክት ጀርባ መሆን የለበትም። `vi` ምልክቶችን ሙሉ በሙሉ ይከለክላል (`tests/unit/i18n-vi-completeness.test.ts`)።

#### `check-vitest-exclusions` — የቆሙ ሙከራዎች መቆጣጠሪያ

በ`vitest.config.ts` የ`exclude` ዝርዝር ውስጥ ያለ ፋይል የማይካሄድ ሙከራ ነው፣ እና የፋይል ዛፉን
ለሚያነብ ሰው እንደ ሽፋን ይታያል። ስልሳ ሁለት ፋይሎች ከ
`// #8618 — pre-existing failure; remove this exclusion when fixed` አስተያየት ጀርባ ተከማችተዋል። ችግር #8618 በ
2026-08-11 ተዘግቷል፤ የሚከታተለው ዝርዝር ግን ከ45 ግቤቶች ወደ 62 አድጓል፣ እያንዳንዱ አዲስ ግቤትም ወደተዘጋ
ችግር የሚያመለክት አስተያየት ወርሷል። ዝርዝሩ በመጨረሻ ፋይል በፋይል ሲለካ (#13204)፣ **ከ62ቱ 51ዱ
በምንጭ ላይ ምንም ለውጥ ሳይደረግ በአሁኑ የፋይል ዛፍ ላይ አልፈዋል**።

መቆጣጠሪያው ወደ እውነተኛ ፋይል የሚያመለክት እያንዳንዱ ማግለያ (ሀ) የክትትል ችግርን እንዲጠቅስ እና
(ለ) ከተለካው ሁኔታው ጋር በ`config/quality/vitest-exclusions.json` ውስጥ እንዲታይ ይጠይቃል፤ ስለዚህ አንድ ማግለያ ማከል
ባለ60 ግቤት ድርድር ውስጥ ሌላ መስመር ከመጨመር ይልቅ በተለየ ፋይል ውስጥ ሊገመገም የሚችል ልዩነት ይሆናል። ሆን ብሎ
የተገለሉትን ሙከራዎች እንደገና አያካሂድም — ይህ ~10 ደቂቃዎች ይወስዳል እና የወቅታዊ ሥራ አካል መሆን አለበት፤
የዕቃ ዝርዝሩ እያንዳንዱ ለመጨረሻ ጊዜ መቼ እንደተለካ ይመዘግባል።
