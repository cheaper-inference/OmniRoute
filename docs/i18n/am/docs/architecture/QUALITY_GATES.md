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

## የጌቶች ዝርዝር እና የአፈጻጸም መገለጫዎች

### የእጩ ተቀባይነት

የCI እና Quality Gates የሥራ ፍሰቶች እያንዳንዳቸው የማይለዋወጥ ውሳኔ ያወጣሉ፦ `Gate / CI` እና
`Gate / Quality`። ስሪት ያለው የተቀባይነት ፖሊሲያቸው እያንዳንዱን ቀዳሚ ሥራ
እንደ አስፈላጊ ወይም አማካሪ ይዘረዝራል። ተፈጻሚ የሆነ አስፈላጊ ሥራ መሳካት አለበት፤ የጎደሉ፣
የተሰረዙ፣ የተዘለሉ፣ በመጠባበቅ ላይ ያሉ እና ያልታወቁ ውጤቶች PASSን ማረጋገጥ አይችሉም። ትክክለኛ
የdocs-only ወይም catalog-only ምደባ የኮድ መስመርን ተፈጻሚ ያልሆነ ሊያደርገው ይችላል፤
ረቂቅ PR ተቀባይነት ያለው እጩ አይደለም። የ`hotfix` መለያ ማስረጃን አያስቀርም።

ሁለቱም የሥራ ፍሰቶች ወደ main/release ቅርንጫፎች የሚገቡ PRዎችን፣ ወደ `main` የሚደረጉ pushesን፣ በእጅ ማስነሳትን
እና የmerge-group ክስተቶችን ይሸፍናሉ። Push፣ dispatch እና merge-group ሙሉውን ምርጫ ያስኬዳሉ። ወደ
`release/**` የሚደረጉ pushes እነዚህን አያስጀምሩም (2026-10-18)፦ እያንዳንዱ ለውጥ matrixን በPRው ላይ አስቀድሞ አስኪዷል
እና የተዋሃደው ጥምረት የRelease-Green ሥራ ነው (`docs/ops/RUNNER_BOX.md` → Hosted መስመር)። Forks
እና merge groups፣ በሌላ ሁኔታ self-hosted runnersን ለሚመርጡ ሥራዎች hosted runnersን ይጠቀማሉ፤ ከማሰማራት በፊት
በቂ hosted አቅም መኖሩ መረጋገጥ አለበት።

እያንዳንዱ JSON ደረሰኝ የcheckout የተደረገውን SHA፣ የሥራ ፍሰቱን run እና attempt ይለያል።
CLIው በcheckout/event SHA መካከል ያለን አለመዛመድ ውድቅ ያደርጋል። የሥራ ፍሰት ሙከራዎች የፖሊሲ አባልነትን
ከውሳኔ ሥራው `needs` ዝርዝር ጋር ያስተሳስራሉ፤ በዚህም አዲስ ወይም የተወገደ መስመር ያለማስጠንቀቂያ ሊጠፋ አይችልም።
ደረሰኞቹ የሚሸፍኑት የራሳቸውን የሥራ ፍሰት ብቻ ነው፤ ህትመትን፣ ማሰማራትን ወይም የነባር የማማከሪያ ስካነርን ውስጣዊ አሠራር አይሸፍኑም። ተፈጻሚነት ያላቸውን ፍተሻዎች በቅርንጫፍ ደንቦች ውስጥ አስገዳጅ ማድረግ
የተለየ አስተዳደራዊ ለውጥ ነው፤ የሥራዎቻቸውን ትርጉም መወሰን ብቻውን ቅርንጫፍን አይጠብቅም።

`API Route Typecheck` ከሁለቱም ድምር ውሳኔዎች
እና ከአካባቢያዊው ሙሉ ታዛቢ የማይለወጥ መገለጫ ውጭ የሆነ ገለልተኛ የሥራ ፍሰት ፍተሻ ነው። ለትክክለኛው
ዕጩ ውጤቱን በተናጠል ይመርምሩ። `.github/workflows/api-route-typecheck.yml` ወደ `main` ወይም
`release/**` በሚገቡ PR-ዎች፣ ወደ ከሁለቱ የቅርንጫፍ ቤተሰቦች በአንዱ በሚደረጉ push-ዎች እና በእጅ ማስኬድ ላይ ይሠራል። የመንገድ ማጣሪያ የለውም።
የPR መሠረትን ወደ ሌላ ዒላማ መቀየር አዲስ ፍተሻ ይጠይቃል፤ የይዘት/ርዕስ አርትዖቶች ለምልከታ ብቻ የሆነውን
`Admission not requested / API Route Typecheck` ስም ይጠቀማሉ እና የመግቢያ ፍተሻውን ሊተኩ አይችሉም።
የሥራ ፍሰቱ የውህደት-ቡድን ቀስቃሽ አይገልጽም። ይህን ፍተሻ አስገዳጅ የሚያደርግ
ማንኛውም የውህደት-ወረፋ ሥራ ላይ ማዋል፣ መጀመሪያ ለዚያ ክስተት መፈጸሙን ማረጋገጥ አለበት።

### የUI አፈጻጸም አቅም

CI ሙሉውን የUI ዝርዝር እንደ አራት `test-vitest` matrix shards ያስኬዳል፤ እያንዳንዱም ከሁለት ያልበለጡ
workers እና ነባሩ የ15 ደቂቃ የሥራ ጊዜ ገደብ አለው። የመጀመሪያው shard የMCP/autoCombo Vitest suiteንም ያስኬዳል።
የአስፈላጊው ሥራ ውጤት እያንዳንዱን matrix leg ይሸፍናል፤ የአንድ shard አለመሳካት
ወይም መሰረዝ የእጩ ተቀባይነትን ማረጋገጥ አይችልም።

የሌሊት observer ለእያንዳንዱ UI shard የተለየ ትክክለኛ-እጩ ደረሰኝ ይይዛል፤
በመጀመሪያው ደረሰኝ ውስጥ የMCP አፈጻጸምንም ያካትታል። አራቱም ደረሰኞች፣ logs እና የሚዛመዱ
የአፈጻጸም ማንነቶች ያስፈልጋሉ። የአካባቢው `npm run test:vitest:ui` አሁንም
ሙሉውን suite ይመርጣል፤ አንድ `--shard` run ከፊል ማስረጃ ብቻ ነው።

### የUnit coverage ስብስብ

አሥራ ሁለቱ unit shards በነባሩ የሙከራ አፈጻጸማቸው ወቅት V8 coverageን ይሰበስባሉ። የተሳካ
shard መካከለኛ Istanbul report ሳያመነጭ የመጀመሪያዎቹን ፋይሎች ለማመቅ `scripts/ci/compact-v8-coverage.mjs`ን ያስኬዳል።
የመጨረሻው Coverage ሥራ አሥራ ሁለቱንም manifests ከእጩ SHA፣ runtime፣ source root እና data hashes ጋር ያረጋግጣል፤
ከዚያም የc8 reportersን እና ነባር coverage thresholdsን ያስኬዳል። Inputs የc8ን ዓለም አቀፍ የፋይል ስም ቅደም ተከተል ይጠብቃሉ፤
ለተቀላቀለ function/block coverage በእያንዳንዱ shard ደረጃ ቀድሞ ማዋሃድ አስተማማኝ አይደለም። የጎደሉ፣ የተበላሹ ወይም የማይጣጣሙ shards ተቀባይነትን ያሳክታሉ።
ያልተሳኩ test shards ጥሬ diagnostic coverageን ለብቻው ይይዛሉ፤ ወደ መጨረሻው merge መግባት አይችልም።

### የዩኒት አፈጻጸም ሂደት ደረሰኞች

የጋራው `test:unit:ci:shard` ትዕዛዝ የ`primary`፣ `dashboard` እና `serial`
ደረጃዎችን በ`scripts/ci/unit-progress-reporter.mjs` በኩል ይመዘግባል። መደበኛው የፈተና ሪፖርት እንደቀድሞው
ይገኛል። የሜታዳታ ብቻ የያዘ የተለየ ደረሰኝ የእያንዳንዱን ፋይል መጀመር እና ማጠናቀቅ
ይመዘግባል፤ በየ30 ሰከንዱ የሚላክ የልብ ምት ምልክትም አሁንም ንቁ የሆኑትን ፋይሎች እና ያለፈባቸውን ጊዜ ይዘረዝራል።
በፈቃድ ዝርዝር ውስጥ ያለውን የአፈጻጸም ሜታዳታ ብቻ ይመዘግባል፤ የፈተና መግለጫዎች፣ ውጤቶች፣ የስህተት ይዘቶች እና ሙሉው
አካባቢ ወደ ተከታታይ ቅርጽ አይቀየሩም።

CI እና Quality የJSONL ፋይሎቹን እንደ `unit-progress-ci-<run>-<attempt>-<shard>` እና
`unit-progress-quality-<run>-<attempt>-<shard>` ያቆያሉ። የሥራ ጊዜ ማብቂያ በኋላ የሚከናወነውን ሰቀላ ሊያግድ ይችላል፤
አስቀድመው የተላኩ የልብ ምት ምልክቶች እንደ የምርመራ ማስረጃ ይቀራሉ። የጎደሉ የልብ ምት ምልክቶች የታገደ ወይም
የተቋረጠ የማስኬጃ ሂደትንም ሊያመለክቱ ይችላሉ። እነዚህ ደረሰኞች ነባሩን የፈተና ምርጫ፣
በአንድ ጊዜ መከናወን፣ የጊዜ ገደቦች እና የመውጫ ሁኔታ እንዳሉ ይጠብቃሉ፤ የዕጩ ተቀባይነት ውሳኔዎች አይደሉም።

### በተቀባይነት ማጠቃለያ ውስጥ የተያዘ ማስረጃ

`scripts/quality/validate-release-acceptance.mjs` የቀረበውን ዕቅድ እና ማኒፌስቶቹን ያጠቃልላል፤ ዕቅዱ ሙሉውን የrelease ሂደት እንደሚሸፍን አያረጋግጥም። ዕቅዱ `VERIFIED` ቢሆንም ሪፖርቶቹ `releaseAcceptance: false` ብለው በግልጽ ያስቀምጣሉ። የ`release-acceptance.yml` workflow አሁንም የshadow የሙከራ መረጃዎችን ይጠቀማል፤ እውነተኛ የbuild፣ የpackage፣ የboot ወይም የpromotion ደረሰኞችን አይጠቀምም።

CLI የተያዘውን ማስረጃ ለማረጋገጥ `--evidence-root` ይፈልጋል። ፋይሎች እንደ `<evidence-root>/<artifact_id>/<member>` ይፈለጋሉ፣ የSHA-256 hash ደግሞ ይሰላላቸዋል። ማስረጃ የሌለው PASS መዝገብ፣ የጎደለ ወይም የተለወጠ ፋይል፣ ደህንነቱ ያልተጠበቀ መንገድ ወይም ምልክታዊ አገናኝ ማረጋገጥን ይከለክላል። የጎደሉ ፋይሎች ባዶ የሆኑ የተሳኩ logs ጋር እኩል አይደሉም። ነባር የSHA/run/attempt ፍተሻዎች ገለልተኛ ሆነው ይቀጥላሉ፤ የሚዛመዱ bytes ጊዜ ያለፈበትን ደረሰኝ ትክክለኛ ሊያደርጉት አይችሉም። የፋይል ታማኝነት የአፈጻጸም እውነተኛነትን ወይም የartifact promotionን አያረጋግጥም።

### የStatic scan ዝርዝር

ስሪት ያለው የnpm-alias ዝርዝር እና የstatic-scan አባልነት በ
`config/quality/gate-manifest.json` ውስጥ ይገኛሉ። የscript ስሞችን እና ትክክለኛ commandsን ከ`package.json` ጋር ለማረጋገጥ `npm run check:gate-manifest`ን ያስኪዱ፤ መጨመሮች፣ ማስወገዶች እና
የcommand ለውጥ ሁለቱንም የአካባቢ hook እና በCI ውስጥ ያሉትን የchange-classification ሥራዎች ያሳክታሉ።
Alias የworkflow ሥራ፣ matrix instance ወይም test case አይደለም፤ እነዚህ ቆጠራዎች
እርስ በርሳቸው ሊተካኩ እንደሚችሉ ሆነው መቅረብ የለባቸውም።

የተመረጡትን aliases ሳያስኬዱ ለመመርመር `npm run quality:scan -- --list` ወይም `npm run quality:scan:fast -- --list`ን
ይጠቀሙ። Runnerው የnpm entrypointን ስለሚጠራ፣ runtimeው (በተዋቀረበት ቦታ Bunን ጨምሮ) ይጠበቃል።
Manifestው ከእነዚያ profiles ውጭ ያሉ aliasesን በተናጠል እንደሚጠሩ ይመዘግባል፤
maintenance commandsም read-only scan profiles ውስጥ የተከለከሉ ናቸው።

እነዚህ profiles የሚሸፍኑት static scanን ብቻ ነው። የproduct testsን፣
coverageን፣ packagingን፣ external checksን ወይም የእጩን ሙሉ የrelease ተቀባይነት አያረጋግጡም።
የWorkflow ተቀባይነት የተገናኙትን `config/quality/admission-policy.json` እና
`scripts/quality/admission-verdict.mjs` ይጠቀማል። የRelease-observer profiles ተለይተው ይቆያሉ፤
ተፈጻሚ checks እና receiptsን በተናጠል ይመርምሩ። የሙሉው observer static
commands በ`config/quality/release-green-static-profile.json` ውስጥ ተገልጸዋል፤ ይህም
`audit:deps`ን፣ mutation-test ምርጫን እና translation checksን ያካትታል። Loaderው npm
commandsን ከpackage.json እና ሞዴል ከተደረጉ የCI/Quality መግለጫዎች ጋር ያረጋግጣል፤ shell tokensን እንደ arguments ከማስኬድ ይልቅ ለውጥን ውድቅ ያደርጋል። ከአስፈላጊ scanner የሚወጣ SKIP/INCOMPLETE
PASSን ማረጋገጥ አይችልም። Profileው external exclusionsን ይመዘግባል፣ እና
hosted coverageን፣ test matricesን፣ packageን ወይም deployment ማስረጃን አይተካም። ከታች ያለው የጽሑፍ ዝርዝር
ማጣቀሻ እንጂ gate በእርግጥ መስራቱን የሚያረጋግጥ ማስረጃ አይደለም።

Scripts በ`scripts/check/` (policy gates) እና `scripts/quality/` (ratchet engine) ስር ይገኛሉ።
የCI ዋና የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የታተመው መሠረታዊ ሰነድ ጤና

`.github/workflows/i18n-base-health.yml` ወደ `main` እና `release/v*` ከሚደረጉ የተመረጡ
push-ዎች በኋላ፣ እንዲሁም በእጅ ሲጀመር የሰነዶችን ጤና ይከታተላል። ማጣሪያዎቹ ሰነዶችን፣
በroot የሚገኙ Markdown ፋይሎችን፣ `llm.txt`ን፣ የትርጉም ሁኔታ/ውቅርን እና ተዛማጅ የi18n መሣሪያዎችን ይሸፍናሉ።
ብቸኛው `Published base documentation health` job በhosted Ubuntu ላይ ይሠራል እና የአምስት ደቂቃ
ጊዜ ገደብ አለው። ማንበብ ብቻ የሚፈቅድ ማረጋገጫ ያከናውናል፣ እንዲሁም
dependency ሳይጫን፣ ትርጉም ሳያከናውን ወይም ሁኔታን ሳይቀበል የምርመራ ደረሰኝ ይጽፋል።

`scripts/i18n/check-base-health.mjs` ዜሮ የsource hash፣ የጎደለ target፣ የtarget hash፣
ጊዜ ያለፈበት ትርጉም እና የsection cache አለመጣጣሞች እንዳይኖሩ ይጠይቃል። እንዲሁም የአሁኑን ዋና
የሰነድ/locale ወሰን እና የተመዘገበውን ምንጭ ያረጋግጣል። ልክ ያልሆነ context፣ ያልተሟላ coverage
ወይም የተቋረጠ checker `INCOMPLETE` ያስከትላል፤ የተረጋገጠ drift ደግሞ `FAIL` ያስከትላል። ሁለቱም
የውድቀት exit status ይመልሳሉ። ደረሰኙ ከcheckout SHA፣ workflow፣ run እና
attempt ጋር የተሳሰረ ሲሆን፣ እንደ `i18n-base-health-<sha>-<run>-<attempt>` ተይዞ ይቆያል።

ይህ የታተመውን መሠረት በተናጥል የሚከታተል ምልከታ ነው። የPR ወይም
የmerge-group event፣ አስገዳጅ የPR check፣ የnpm alias ወይም የstatic-scan profile አባል አይጨምርም።
ነባሩ የdifferential PR ፖሊሲ እና የመሠረታዊው checker የምክር ምደባዎች
ተለያይተው ይቆያሉ። የተሳካ upload ያልተሳካውን የጤና ውጤት ወደ PASS ሊቀይር አይችልም።

### የRelease PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` በmain/release PRs፣ ወደ `main` በሚደረጉ pushes፣
dispatch እና merge groups ላይ CIን ያሟላል። PRs በpath የተጣሩ ፈጣን checksን ይጠቀማሉ። በቋሚነት
የተሰናከለው የተባዛ build ተወግዷል፤ እውነተኛዎቹ build/package/boot checks በCI ውስጥ ይቆያሉ።

| ተግባር                                             | ወሰን                                                                                                                                                 | አጋጅ            |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | የሰነድ/ኮድ PRዎች፤ የAPI ሰነዶች ማጣቀሻዎች እና docs-all                                                                                                          | አዎ             |
| `Fast Quality Gates`                             | የኮድ PRዎች፤ የማይለወጡ ፍተሻዎች፣ የዓይነት ፍተሻ፣ የዳሽቦርድ ዓይነት ፍተሻ፣ ተጽዕኖ ያረፈባቸው የክፍል ፈተናዎች                                                                          | አዎ             |
| `Forgotten sibling tests`                        | የኮድ PRዎች፤ የተቀየሩ ሞጁሎች እስከ ቋሚ ተጠቃሚዎች እና እጩ ተጓዳኝ ፈተናዎች ድረስ ይከታተላሉ፤ የbarrel እና ተለዋዋጭ-import ዱካዎች ከተጠቀሱ የፈቃድ ዝርዝር ልዩ ሁኔታዎች ጋር እንደ አማካሪ ምርመራዎች ሪፖርት ይደረጋሉ | **አማካሪ**       |
| `Vitest (fast-path)`                             | የኮድ PRዎች፤ ፈጣን የvitest ስብስብ                                                                                                                          | አዎ             |
| `Unit Tests fast-path`                           | የኮድ PRዎች፤ ባለ4-shard የክፍል ፈተና ስብስብ                                                                                                                   | አዎ             |
| `No new ESLint warnings`                         | የኮድ PRዎች፤ ማፈንን የሚያገናዝብ የlint መከላከያ                                                                                                                  | አዎ፣ forksን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆኑ PRዎች፤ changelog እና የተፈጠሩ skills ማመሳሰል                                                                                                      | አዎ፣ forksን ጨምሮ |

#### የተረሱ ተጓዳኝ ፈተናዎች ሪፖርት

`npm run check:forgotten-sibling-tests` ከፈተና-ተጽዕኖ ካርታው በስተጀርባ ያለውን የimport መፍቻ እንደገና ይጠቀማል።
ለእያንዳንዱ የተቀየረ የምርት ሞጁል፣ እጩው ፈተና በpull-request diff ውስጥ ከሌለ ቆራጥ የሆኑ
`changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ሪፖርት ያደርጋል። የMarkdown ማጠቃለያው እና የJSON ውጤቱ
ማንኛውም አጋጅ ማሰማራት ከመደረጉ በፊት ለመለኪያ ማስተካከያ እንደ `forgotten-sibling-tests` የworkflow artifact ተይዘው ይቆያሉ።

የBarrel ዳግም-exports እና ተለዋዋጭ imports የመፍታት ምርመራዎች ብቻ ናቸው፤ አጋጅ ግኝትን ፈጽሞ አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ ግቤት ተጠቃሚውን እና እጩ
ፈተናውን መሰየም፣ የተወሰነ ምክንያት መስጠት እና ወደ GitHub issue ወይም pull request ማገናኘት አለበት። ቅርጸታቸው የተበላሸ ግቤቶች
በነባሪ ውድቀት ያስከትላሉ። ልዩ ሁኔታዎች የተሰረዘ እጩ ፈተናን ወይም `.skip`/`.todo` የሚጨምር diffን ማፈን አይችሉም፤
የማረጋገጫ ማዳከም እና ሌሎች መሸፈኛዎች ራሱን ችሎ አጋጅ በሆነው
`check:test-masking` gate ኃላፊነት ሥር ይቆያሉ።

### ተግባር፦ `lint`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሠራል። ካልተሳካ ውህደትን ያግዳል።

| ስክሪፕት (`npm run ...`)             | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | የሚያግድ                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                       |
| `check:test-tla-order`            | በ`tests/unit` ስር ያለ ምንም `node:test` ፋይል ሙከራ እንዳይመዘግብ፣ ከፍተኛ ደረጃ ላይ ያለ `await` እንዳያጋጥመውና ከዚያም ተጨማሪ ሙከራዎችን እንዳይመዘግብ (#18045፤ ራቼት፦ `test-tla-order-allowlist.json` መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                       |
| `check:cycles`                    | በመላው `src/` + `open-sse/` ውስጥ ያሉ ዑደታዊ imports (በAST ላይ የተመሠረተ፣ የtsconfig `paths` የተፈታ)። ምንም ዑደት በተገኘ ቁጥር Bare በ1 ይወጣል (ከ#15281 ጀምሮ fail-closed) እና SCC-ዎቹን ይዘረዝራል። `check:cycles:ratchet` (CI የሚያስኬደው) ቁጥሩ በ`quality-baseline.json` ውስጥ ካለው የ`metrics.cycles` ከፍተኛ ገደብ ሲበልጥ ያግዳል — በአሁኑ ጊዜ 14፣ `direction: down`፣ ስለዚህ መቀነስ ብቻ ይችላል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ (ራቼት)                                 |
| `check:boundary`                  | `open-sse → src` ትስስር፦ ከኤንጂኑ ወደ መተግበሪያው የሚደረጉ ልዩ የፋይል-ወደ-ፋይል imports (`scripts/quality/measure-boundary.mjs`፤ የedge ዝርዝሩ የv4 core/module-split ማስተካከያ backlog ነው)። Bare = የምክር ሪፖርት (ከ`quality:boundary` ጋር ተመሳሳይ)። `check:boundary:ratchet` (CI የሚያስኬደው፣ እንዲሁም በ`quality.yml` fast-gates ራቼት loop ውስጥ ያለው) ቁጥሩ በ`quality-baseline.json` ውስጥ ካለው የ`metrics.boundaryOpenSseToSrc` ከፍተኛ ገደብ ሲበልጥ ያግዳል — መነሻው በተለካው 771 ላይ ተቀምጧል፣ `direction: down`፤ `--update` ሊቀንሰው ብቻ ይችላል፤ በPR-ዎች ላይ ከbase አንጻር (`--base-ref`፣ ከታች ይመልከቱ)                                                                                                                                                                                                                                              | አዎ (ራቼት)                                 |
| `check:route-validation:t06`      | በሁሉም routes ላይ የZod schemas መኖር (Tier 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                       |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከተፈቀደው ገደብ አይበልጥም (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                       |
| `check:provider-consistency`      | በ`providers.ts` ውስጥ ያለው እያንዳንዱ provider በ`providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እና በተቃራኒውም፣ በallowlist ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                       |
| `check:model-lifecycle`           | በእጅ የሚያዙት ሦስቱ routing tables ከተካተተው lifecycle snapshot (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`)፣ `REGISTRY` ሊመራው የሚችለውን retired id ነጥብ አይሰጥም፤ እያንዳንዱ የ`BUILT_IN_ALIASES` target በ`REGISTRY` ውስጥ ይገኛል እና በretired-id snapshot ውስጥ አይገኝም፤ አሁንም በ`REGISTRY` ውስጥ ያለ እያንዳንዱ retired id ወደ ሌላ ቦታ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ተዘርዝሯል፤ እንዲሁም ምንም የ`DEFAULT_DEGRADATION_MAP` source ወይም target በዚያ snapshot ውስጥ retired ሆኖ አይታይም። ይህ አንድ model በአሁኑ ጊዜ በlive upstream እየቀረበ መሆኑን አያረጋግጥም። Offline — በ`config/quality/model-lifecycle.json` ላይ ካለው ጋር ያነጻጽራል፤ ይህም በእጅ `npm run quality:refresh-model-lifecycle` በመጠቀም ይታደሳል (network፤ ከCI ጋር አልተገናኘም)። `allowedRetiredInCatalog` ቀስ በቀስ የሚቀንስ ratchet ነው፦ ግቤት የሚታከለው ከtracking issue ጋር ብቻ ነው። | አዎ                                       |
| `check:fetch-targets`             | በclient-side `src/` ውስጥ ያለው እያንዳንዱ `fetch("/api/...")` ወደ እውነተኛ `route.ts` ይፈታል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                       |
| `check:deps`                      | በrepo ውስጥ ባለ እያንዳንዱ `package.json` የሚገኙ ሁሉም በ`npm install` ሊጫኑ የሚችሉ deps በ`dependency-allowlist.json` ውስጥ አሉ፤ አዲስ ያልተሰኩ ወይም slopsquatted packages ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                       |
| `audit:deps`                      | የአምስቱም ገለልተኛ lockfile-ዎች (root፣ Electron፣ OpenCode plugins v1/v2 እና provider) npm audit። ወሳኝ ማስጠንቀቂያዎች ያግዳሉ፤ ከፍተኛ ማስጠንቀቂያዎች እንደሚታዩ ማስጠንቀቂያዎች ይቀራሉ። የጎደሉ/ያልተሳኩ audits INCOMPLETE ናቸው እና ያግዳሉ፤ ለእያንዳንዱ scope የሚሆኑ lock hashes እና ሪፖርቶች ይቀመጣሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                       |
| `check:lockfile`                  | የ`package-lock.json` ትክክለኛነት — https registry፣ integrity hashes፣ ምንም host overrides የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                       |
| `check:licenses`                  | ለምርት dependencies የSPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                       |
| `check:tracked-artifacts`         | ምንም build artifacts / የተገቡ `node_modules` symlinks የሉም (እንዲሁም በhusky pre-commit ውስጥ ይሠራል፤ pre-push ሆን ተብሎ ቀላል ተደርጓል — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                       |
| `check:ai-attribution`            | በPR commits፣ title ወይም body ውስጥ የAI/bot `Co-Authored-By` trailer ወይም AI-generation footer የለም — Hard Rule #16 (በ`quality.yml` fast-gates loop ውስጥ ለPR→`release/**` — event payload-ን ያነባል፣ ከPRs ውጭ no-op ነው — እና በ`ci.yml` lint ውስጥ ለPR→`main` የPR-only step፤ እንዲሁም የhusky `commit-msg` hook፤ ሰው co-authors ይፈቀዳሉ፤ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | እያንዳንዱ Vitest exclusion የመከታተያ issue-ን ይጠቅሳል እና በ`config/quality/vitest-exclusions.json` ውስጥ ይገኛል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                       |
| `check:file-size`                 | የምንጭ ፋይሎች (በ`src/`፣ `open-sse/`፣ `electron/`፣ `bin/` ውስጥ ያሉ `.ts`/`.tsx`) በ`cap` ገደብ ውስጥ፣ የሙከራ ፋይሎች (`*.test.ts(x)`) ደግሞ በ`testCap` ገደብ ውስጥ ይቆያሉ፤ በ`file-size-baseline.json` (`frozen` / `testFrozen`) ውስጥ የታገዱ ፋይሎች ከተመዘገበው መጠናቸው በላይ ማደግ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                       |
| `check:error-helper`              | በአስፈጻሚዎች/ተቆጣጣሪዎች ውስጥ ያሉ የስህተት ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()`ን ይጠቀማሉ (ጥብቅ ደንብ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                       |
| `check:migration-numbering`       | የፍልሰት SQL ፋይሎች ያለ ክፍተት ወይም ድግግሞሽ በተከታታይ ቁጥር ይሰጣቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                       |
| `check:public-creds`              | ከ`publicCreds.ts` ውጭ ቃል በቃል የተጻፉ OAuth `client_id`/`client_secret` ወይም Firebase Web ቁልፎች የሉም (ጥብቅ ደንብ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                       |
| `check:db-rules`                  | ከ`src/lib/db/` ሞጁሎች ውጭ ቀጥተኛ SQL የለም፤ ከ`localDb.ts` የቡድን ማስመጣቶች የሉም (ጥብቅ ደንቦች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                       |
| `check:known-symbols`             | በማሰራጫ ሰንጠረዦቻቸው ውስጥ የተመዘገቡ የአቅራቢ አስፈጻሚዎች፣ የማዞሪያ ስልቶች እና ተርጓሚዎች በዲስክ ላይ ካሉት ፋይሎች ጋር ይዛመዳሉ—ያለ ባለቤት ወይም ያልታወጀ ምልክት የለም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                       |
| `check:route-guard-membership`    | የልጅ ሂደትን የሚጀምር እያንዳንዱ route በ`isLocalOnlyPath()` ይመደባል (ጥብቅ ደንቦች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                       |
| `check:test-discovery`            | በrepo ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ test runner ይሰበሰባል (ratchet፦ በ`test-discovery-baseline.json` ውስጥ ያለው የorphan ዝርዝር መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                       |
| `check:agent-skills-sync`         | የተፈጠሩት agent-skills artifacts ከምንጭ catalogቸው ጋር ይዛመዳሉ (ልዩነት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | የprovider logos/assets የተመዘገበ የምንጭ መረጃ ግቤት አላቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | የJSON config ፋይሎች በትክክል parse ይደረጋሉ እና የrepo lint ደንቦችን ያሟላሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | ያለ ስህተት የTypeScript compilation (የምክር ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                       |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊትን ያማከለ፤ ከዚህ ቀደም የነበሩ ብዙ call sites አሁንም annotations ያስፈልጋቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **የምክር ደረጃ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | በ`src/app/(dashboard)/**` ላይ የተገደበ `tsc` (#7033) — የ`typecheck:core` በጥንቃቄ የተመረጠው የ27 ፋይሎች የፈቃድ ዝርዝር ምንም dashboard TSX አያካትትም፣ እንዲሁም `next build` እሱን ፈጽሞ type-check አያደርገውም (`next.config.mjs` `ignoreBuildErrors: true`ን ያቀናብራል)፤ ስለዚህ በዚያ ያሉ የተነጠሉ-መለያ ሪግሬሽኖች (#6625/#6909) ለCI የማይታዩ ነበሩ። ልዩነቶችን ከታሰረ የእያንዳንዱ-ፋይል/የእያንዳንዱ-TS-code ብዛት መነሻ መለኪያ (`config/quality/dashboard-typecheck-baseline.json`፣ ከ`check:known-symbols` ጋር ተመሳሳይ የጊዜ ያለፈበትን የማስገደድ ስርዓተ ጥለት) ጋር ያነጻጽራል — ከመነሻ መለኪያው ብዛት በላይ ያሉ አዲስ ስህተቶች ብቻ gateን ያሳክታሉ፤ ቀድሞ የነበረ ስህተት ሲስተካከል በ`--update` ወደ ታች ያጥብቁት።                                                                                                                                                                                           | አዎ                                       |

### ሥራ፦ `quality-gate`

ከ`test-coverage` በኋላ ይሰራል። ካልተሳካ mergeን ያግዳል።

| Script                       | የሚያረጋግጠው                                                                                                                                            | አጋጅ               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | `quality-metrics.json`ን ያመነጫል (የESLint ማስጠንቀቂያዎች ብዛት፣ ከተዋሃደው shard report የሚገኝ coverage)                                                            | አዎ (ከratchet በፊት) |
| `quality:ratchet`            | በ`quality-baseline.json` ውስጥ ያለ እያንዳንዱ metric ወደ ኋላ አልተመለሰም (የESLint ማስጠንቀቂያዎች ≤ baseline፤ coverage ≥ baseline)                                     | አዎ                |
| `check:duplication`          | የcode ድግግሞሽ (jscpd@4) በ`quality-baseline.json` ውስጥ ካለው baseline አይበልጥም                                                                              | አዎ                |
| `check:complexity`           | የፋይል-ደረጃ cyclomatic complexity ከcap አይበልጥም (ዋናው ESLint `complexity` + `max-lines-per-function`)                                                     | አዎ                |
| `check:cognitive-complexity` | የcognitive complexity ratchet (`eslint-plugin-sonarjs`) — የተለየ ESLint pass፤ CI ሁለቱንም በአንድ `check:complexity-ratchets` ደረጃ ተዋህደው እንዲሰሩ ያደርጋል         | አዎ                |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ exports / ፋይሎች ratchet (knip) ከbaseline አንጻር ወደ ኋላ አይመለስም                                                                               | አዎ                |
| `check:compression-budget`   | የcompression benchmark budget — የእያንዳንዱ-engine token-savings floors ወደ ኋላ መመለስ የለባቸውም                                                               | አዎ                |
| `check:type-coverage`        | የpercent-typed ratchet (`type-coverage`) ወደ ኋላ አይመለስም፤ በአብዛኛው `typecheck:noimplicit:core`ን ይሸፍናል                                                    | አዎ                |
| `check:codeql-ratchet`       | ክፍት የCodeQL alert ብዛት ወደ ኋላ አይመለስም (በ`gh api` ያነባል፤ token ከሌለ ችግር ሳይፈጥር ይዘላል) — የrefresh cadence እና manual trigger፦ ከታች ያለውን "CodeQL ratchet" ይመልከቱ | አዎ                |

### ሥራ፦ `quality-extended`

ሥራው ተግባራዊ የሆኑ ዕጩዎችን ያግዳል። Bundle size፣ secret findings፣ vulnerability
findings፣ workflow findings እና የOpenAPI ለውጦች በአስገዳጅ ratchets ይፈተሻሉ።
የcircular-dependency diagnostics እንደ ምክር ሰጪ ሆነው ይቆያሉ። Scanner installation አስፈላጊ ነው፦
`scripts/ci/install-quality-scanners.sh` የተወሰኑ versionsን ያቀርባል እና የinstallation
አለመሳካቶችን ያስተላልፋል። የጎደሉ tools፣ ልክ ያልሆኑ reports ወይም የጎደሉ baselines
አስገዳጁን scanner gate INCOMPLETE አድርገው ይተዉታል።

| ስክሪፕት                    | የሚያረጋግጠው                                                                                                                                                                  | ማገጃ                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:circular-deps`    | ዑደታዊ ጥገኞች አለመኖራቸውን (dpdm)                                                                                                                                                 | **ምክር ሰጪ**                                 |
| `check:bundle-size`      | የቅርቅብ መጠኑ ከገደቡ እንዳያልፍ፤ መለኪያው የማይገኝ ከሆነ ማረጋገጫው ይወድቃል                                                                                                                       | **ከ--ratchet ጋር አጋጅ**                      |
| `check:secrets`          | የGitleaks ግኝቶች ወደ ኋላ እንዳይመለሱ፤ የግዴታ ቅኝቶች የጎደሉ መሣሪያዎችን/ምንጭን/መነሻ መስመርን፣ ያልተሳኩ ቅኝቶችን እና ልክ ያልሆኑ ሪፖርቶችን ይቀበሉም                                                                  | **ከ--ratchet ጋር አጋጅ**                      |
| `check:vuln-ratchet`     | የጥገኝነት ተጋላጭነቶች ወደ ኋላ እንዳይመለሱ፤ የግዴታ ቅኝቶች የጎደሉ መሣሪያዎችን፣ ልክ ያልሆኑ ሪፖርቶችን ወይም የጎደሉ መነሻ መስመሮችን ይቀበሉም                                                                            | **ከ--ratchet ጋር አጋጅ**                      |
| `check:workflows`        | የየሥራ-ፍሰት lint (actionlint + zizmor)፤ የጎደሉ/የተበላሹ ቃኚዎች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደለ ratchet መነሻ መስመር INCOMPLETE በሚል ያስወድቃሉ። ትክክለኛ ግኝቶች የተመረጠውን strict/advisory/ratchet ፖሊሲ ይከተላሉ | ማስኬድ ግዴታ ነው፤ zizmor ratchet በCI ውስጥ አጋጅ ነው |
| `check:openapi-breaking` | ይፋዊ API ውልን ከተወሰኑ የክስተት commits ጋር ያረጋግጣል (የPR merge-base፣ ከpush በፊት፣ የmerge-group መነሻ፤ ለscheduled/manual checkout መጀመሪያው parent)፤ የግዴታ መለኪያ ከተሳነው በዝግ ሁኔታ ይወድቃል          | **ከ--ratchet ጋር አጋጅ**                      |

### ሥራ፦ `docs-sync-strict`

ወደ `main` ወይም `release/**` ለሚቀርቡ PRዎች፣ ይህ ሥራ የሚሰራው እንደ ሰነድ ወይም የኮድ ለውጦች ለተመደቡ፣ ረቂቅ ላልሆኑ (ወይም በታመነ ወረፋ ውስጥ ላሉ) እጩዎች ብቻ ነው። PR ባልሆኑ የCI ክስተቶችም ላይ ይሰራል፤ የዚህ የሥራ ፍሰት push ቀስቃሽ `main`ን ብቻ ይሸፍናል፣ `release/**`ን አይሸፍንም። ከዜሮ የተለየ የመውጫ ኮድ የሚመልስ ደረጃ ሥራውን ያግዳል፤ ለሪፖርት ብቻ የሚቀርቡ ግኝቶችና ከታች የተመዘገቡ ነፃ የተደረጉ ሁኔታዎች ግን አያግዱም።

| ስክሪፕት                          | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                | ማገጃ                                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `check:docs-all`               | ከታች ያሉትን 7 ንዑስ ማረጋገጫዎች በቅደም ተከተል የሚያስኬድ አጠቃላይ ማረጋገጫ                                                                                                                                                                                                                                                                     | አዎ                                                                                           |
| ↳ `check:docs-sync`            | የፓኬጅ/OpenAPI/CHANGELOG ስሪቶች ወጥነት፣ ትክክለኛ የ`llm.txt` ቅጂዎች፣ የተተረጎመ CHANGELOG ክፍሎችና መጠን የማይለወጡ መስፈርቶች፣ እና በአዲስ የተተኩ ድግግሞሽ ሰነዶች አለመኖራቸው                                                                                                                                                                                      | አዎ                                                                                           |
| ↳ `check:docs-frontmatter`     | የተጠናቀሩ የሰነድ ገጾች ትክክለኛ የfrontmatter ርዕሶች እንዳሏቸው                                                                                                                                                                                                                                                                          | አዎ                                                                                           |
| ↳ `check:docs-counts`          | ከፍተኛ እምነት ያላቸው የብዛት የማይለወጡ መስፈርቶች በጥብቅ ይተገበራሉ፤ በግምት ዘዴ የሚደረጉ የፋይል ብዛት ማረጋገጫዎች ስክሪፕቱ `--strict` ካልተቀበለ ማስጠንቀቂያ ብቻ ይሰጣሉ (የCI አጠቃላይ ማረጋገጫው ይህን አያስተላልፍም)                                                                                                                                                                   | ጥብቅ ደረጃው ያግዳል፤ ለስላሳ ደረጃው ማስጠንቀቂያ ብቻ ይሰጣል                                                     |
| ↳ `check:env-doc-sync`         | በምንጭ ኮድ ውስጥ የአካባቢ ተለዋዋጮች ንባቦች፣ `.env.example` እና `docs/reference/ENVIRONMENT.md`፣ በግልጽ የተዘረዘሩ የመተው፣ በሰነድ ብቻ ያሉና በአካባቢ ብቻ ያሉ ልዩ ፈቃድ ዝርዝሮች ከተተገበሩ በኋላ ይስማማሉ                                                                                                                                                               | አዎ፣ በሰነድ ከተገለጹት ልዩ ፈቃድ ዝርዝሮች ውጭ                                                              |
| ↳ `check:deprecated-versions`  | ችላ የተባሉ ሰነዶችን ሳያካትት፣ ከተገቢ ታሪካዊ አውዶች ውጭ ሊያረጁ የሚችሉ ስሪቶችንና ያረጁ የማዘመኛ ቀኖችን ሪፖርት ያደርጋል                                                                                                                                                                                                                                       | በአሁኑ የCI ቅንብር ማስጠንቀቂያ ብቻ ይሰጣል (`--strict` አይተላለፍም)                                           |
| ↳ `check:doc-links`            | በሰነዶች ውስጥ ያሉ ውስጣዊ markdown አገናኞች ወደ እውነተኛ ፋይሎች መድረሳቸውን (`[text]`/`(path)` ቅርጽ)                                                                                                                                                                                                                                          | አዎ                                                                                           |
| ↳ `check:fabricated-docs`      | በሰነዶች ውስጥ የተጠቀሱ routes፣ env vars፣ CLI commands፣ hook names እና file paths በcodebase ውስጥ መኖራቸውን። በ`--strict` በኩል ጥብቅ ማረጋገጫ፤ flag ከሌለ soft-fail ያደርጋል።                                                                                                                                                                     | አዎ (በCI ውስጥ በ`--strict` በኩል)                                                                 |
| `check:cli-i18n`               | ጥቅም ላይ የዋሉ የCLI `t()` ቁልፎች በ`en` ውስጥ አሉ፤ `pt-BR` እያንዳንዱን የላይኛው ደረጃ ክፍል ይጠብቃል፤ `zh-CN` እና `zh-TW` ሁሉንም የ`en` ቁልፎች ይይዛሉ                                                                                                                                                                                                   | አዎ                                                                                           |
| `check:openapi-coverage`       | የOpenAPI spec ቢያንስ ratchet በተደረገ ዝቅተኛ ወለል መጠን እውነተኛ routes መሸፈኑን                                                                                                                                                                                                                                                        | አዎ                                                                                           |
| `check:openapi-security-tiers` | የታወጁት `x-loopback-only`/`x-always-protected` ማብራሪያዎች በ`routeGuard.ts` መደገፍ አለባቸው፤ የፓርሰርና የወደፊት አቅጣጫ አለመዛመዶች ያግዳሉ። ለአካባቢያዊ ብቻ ቅድመ ቅጥያዎች ስር የጎደለ `x-loopback-only`ን የሚፈትሸው የተቃራኒ አቅጣጫ ማረጋገጫ ማስጠንቀቂያ ይሰጣል፤ በንድፍ ብቻ የተገለጹ መንገዶች ከዚያ የተቃራኒ ፍተሻ ይወገዳሉ።                                                                        | የፓርሰር/የወደፊት አቅጣጫ ማረጋገጫዎች ያግዳሉ፤ የተቃራኒ አቅጣጫ ማረጋገጫው ማስጠንቀቂያ ብቻ ይሰጣል                             |
| `check:openapi-routes`         | ምክንያት የተሰጠበት የ`KNOWN_STALE_SPEC` ልዩ ፈቃድ ዝርዝር ከተተገበረ በኋላ፣ በ`openapi.yaml` ውስጥ ያለ እያንዳንዱ `/api...` ዱካ የፓራሜትር ልዩነቶችን ሳይመለከት ከእውነተኛ መንገድ ጋር ይዛመዳል፤ ያረጁ የልዩ ፈቃድ ዝርዝር ግቤቶችም ማረጋገጫውን ያስወድቃሉ                                                                                                                                    | አዎ                                                                                           |
| `check:docs-symbols`           | በቅጂ ያልሆኑ ቀዳሚ ሰነዶች ውስጥ ያሉ ውስጣዊ የ`/api/...` URL ማጣቀሻዎች ከእውነተኛ መንገድ ወይም የመንገዶች ቤተሰብ ጋር ይዛመዳሉ፤ የproxy/upstream/ቦታ ያዥ/ፋይል ማጣቀሻዎችና ምክንያት የተሰጣቸው የ`KNOWN_STALE_DOC_REFS` ግቤቶች ይገለላሉ፣ ያረጁ የልዩ ፈቃድ ዝርዝር ግቤቶች ግን ማረጋገጫውን ያስወድቃሉ                                                                                                   | አዎ                                                                                           |
| `i18n translation drift`       | የዋና ሰነዶችን የምንጭና የዒላማ ሃሾች እና የትርጉም መነሻ ማስረጃ ይፈትሻል። በPR ንጽጽር ውስጥ የሚፈቀዱት ተመሳሳይ የተወረሱ ስህተቶች ብቻ ናቸው፤ አዲስ ወይም ያልተረጋገጡ የምንጭ፣ የጎደለ ዒላማ፣ የዒላማ ሃሽ፣ ያረጀ ትርጉም ወይም የክፍል መሸጎጫ አለመጣጣሞች ያግዳሉ። ከPR ንጽጽር ውጭ የምንጭ፣ የጎደለ ዒላማ እና የዒላማ ሃሽ ስህተቶች ያግዳሉ፤ ያረጁ ትርጉሞችና የማይጣጣሙ የክፍል መሸጎጫዎች ግን ማስጠንቀቂያ ብቻ ይሰጣሉ። የቀድሞ ቅርጸት የክፍል መሸጎጫ አለመኖር ስህተት አይደለም። | አዲስ/ያልተረጋገጠ የPR ልዩነት ያግዳል፤ ተመሳሳይ የተወረሰ ልዩነት ማስጠንቀቂያ ብቻ ይሰጣል፤ ከPR ውጭ ያሉ ደንቦች በስህተቱ ዓይነት ይወሰናሉ |

### ሥራ፦ `i18n-ui-coverage`

| ስክሪፕት                           | የሚያረጋግጠው                                                                                                                                                 | አጋጅ     |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check-ui-keys-coverage` (ውስጣዊ) | የUI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                                | አዎ      |
| `check-ui-value-drift` (ውስጣዊ)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ጊዜው ያለፈበት ትርጉም እንደማይተው                                                                                                        | አዎ      |
| `check-new-key-coverage` (ውስጣዊ) | **አዲስ** የእንግሊዝኛ ቁልፍ በሁሉም locale መተርጎሙን — የ`__MISSING__:` ምልክት ውድቅ ይደረጋል                                                                                  | አዎ      |
| `check-translation-ratio`       | በእያንዳንዱ locale ያለው የእውነተኛ ትርጉም ጥምርታ (ከእንግሊዝኛ ጋር ተመሳሳይ / ቦታ ያዥ / ከፈቃድ ዝርዝሩ ውጭ የጎደሉ ቅጠሎች) `config/quality/i18n-translation-baseline.json` + ትርፍን ማለፍ የለበትም | **አጋጅ** |

`fetch-depth: 0` ያስፈልገዋል — የእሴት-ለውጥ መግቢያው `en.json`ን ከውህደት መነሻው ጋር ያነጻጽራል።

#### `check-ui-value-drift` — ጊዜው ያለፈበት ትርጉም መግቢያ

ሌሎቹ መግቢያዎች በመዋቅራዊ ሁኔታ ሊያዩት የማይችሉትን አንድ የi18n መመለስ ስህተት ይይዛል፦ አንድ የእንግሊዝኛ እሴት
እንደገና ሲጻፍ እና ከ_ቀድሞው_ እንግሊዝኛ የተገኙት ትርጉሞች ሳይቀየሩ ሲቀሩ፣
እንግሊዝኛ ያልሆነ ቋንቋ ተጠቃሚዎች በልበ ሙሉነት የተጻፈ ነገር ግን አሁን ስህተት የሆነ ጽሑፍ ማንበባቸውን ይቀጥላሉ።

ይህ በእርግጥ ለምርት ተለቋል። የAntigravity
መግቢያ ረዳት ሲጨመር (#5203) `oauthModal.googleOAuthWarning` እንደገና ተጽፎ ነበር፤ **ከ43 locale ውስጥ 39ኙ** ኦፕሬተሮችን "ሙሉውን
URL ቅድተው ከታች እንዲለጥፉት" የሚነግር ጽሑፍ አስቀርተው ነበር — ለዚያ አቅራቢ ሊጠናቀቅ የማይችል ፍሰት። እስከ #8463 ድረስ
ሳይስተዋል የቀረው፦

- `sync-ui-keys` የሚሞላው **የሌሉ** ቁልፎችን ብቻ ነው፤ **ጊዜያቸው ያለፈባቸውን** በፍጹም አይሞላም፤
- `check-ui-keys-coverage` የቁልፍ _መኖርን_ ይቆጥራል፣ ስለዚህ ጊዜው ያለፈበት ትርጉም እንደተሸፈነ ይቆጠራል፤
- `check-translation-drift` የ`docs/i18n/<locale>/**.md` ሰነድ ነጸብራቆችን ይከታተላል —
  `src/i18n/messages/*.json`ን በፍጹም አያነብም። ከ2026-09 ዳግም ማመሳሰል ጀምሮ በ`docs-sync-strict` ሥራ ውስጥ አጋጅ ነው፦ ዋና ሰነድ ያርትዑ → `npm run i18n:run -- --files=<doc>` (በክፍል ደረጃ፣ ዝቅተኛ ወጪ)።

**ልዩነትን የሚያውቅ ነው፣ በመነሻ መረጃ ላይ የተመሠረተ አይደለም።** በውህደት መነሻው ላይ ያለውን `en.json` ከሥራ ዛፉ ጋር ያነጻጽራል፤
የእንግሊዝኛ እሴቱ ለተቀየረ ለእያንዳንዱ ቁልፍ፣ ያልተነካ ትርጉም ይዞ የቀረ ማንኛውም locale
ጊዜው ያለፈበት ነው። ይህ ሆን ብሎ **ቀድሞ የነበረውን ዕዳ ያቆማል** — አንድ ልዩነት
ለረጅም ጊዜ የኖረ ትርጉም ከየትኛው የድሮ እንግሊዝኛ እንደመጣ ሊያሳይ አይችልም፣ ስለዚህ መግቢያው
የአሁኑ ለውጥ የነካውን ብቻ ይፈርዳል። አማራጩ (በቁልፍ የሚዘጋጅ hash መነሻ መረጃ) ወደ
600 KB የሚጠጋ የተፈጠረ ፋይል ያስከፍላል፣ ይህም ካለው ትልቁ መነሻ መረጃ 3× ሲሆን በእያንዳንዱ i18n PR ይለዋወጣል።

መስፈርቱን ለማሟላት ሁለት መንገዶች አሉ፦

1. የተነኩትን ትርጉሞች ያዘምኑ፣ ወይም
2. ወደ `__MISSING__:<new english>` ያቀናብሯቸው — runtime ከዚያ የተስተካከለውን እንግሊዝኛ
   (`src/i18n/request.ts::deepMergeFallback`፣ #7258) ያቀርባል እና ቁልፉ ለትርጉም ወረፋ ይይዛል።

የሕብረቁምፊው **ትርጉም** ከተቀየረ፣ **ቁልፉን እንደገና መሰየምን** ይምረጡ፦ አዲስ ቁልፍ
ጊዜው ያለፈበትን ትርጉም ሊወርስ አይችልም። #8463 የተጠቀመው ንድፍ ይህ ነው።

```bash
npm run i18n:check-value-drift          # ጥብቅ (CI የሚያስኬደው)
npm run i18n:check-value-drift:warn     # ሪፖርት ብቻ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

የእሴት-ለውጥ እና የአዲስ-ቁልፍ መግቢያዎች ከ
`scripts/i18n/resolve-ui-diff-base.mjs` አንድ የማይለወጥ ንጽጽር ይጋራሉ። የሥራ ፍሰቱ ተመሳሳዩን የመሠረት፣ የመሠረት-ጫፍ እና
የእጩ SHAዎችን ለሁለቱም ፍተሻዎች ያስተላልፋል። የPR/መሠረት-ዳግም-ማነጣጠር፣ push እና merge-group አሂዶች የየክስተታቸውን
አውድ ይጠቀማሉ። የእጩ ቅርንጫፍን ለማስጀመር ትክክለኛው ክፍት PR ወይም ግልጽ የሆነው
`i18n_base_sha` ግቤት ያስፈልጋል። ያለዚያ ግቤት `main` ወይም `release/vX.Y.Z`ን በእጅ ማስጀመር ወይም
በጊዜ ሰሌዳ መመልከት የመጨረሻውን commit ከመጀመሪያው parent ጋር ያነጻጽራል፤ ይህ ሁሉንም
የተወረሰ የትርጉም ዕዳ የሚመረምር ኦዲት አይደለም። በአካባቢያዊ ሁኔታ ማስኬድ ግልጽ የሆነ የንጽጽር መሠረትን
ይፈልጋል፤ ለምሳሌ፣ ከላይ ያለውን `BASE_REF` ትእዛዝ።

የጎደለ ወይም አሻሚ የንጽጽር አውድ፣ ሊነበብ የማይችል ወይም ልክ ያልሆነ አስፈላጊ ካታሎግ እና
የተለወጠ እጩ፣ በማስጠንቀቂያ ሁነታም ጭምር፣ `INCOMPLETE`ን ከመውጫ ኮድ **2** ጋር ያስከትላሉ።
የካታሎግ ንባቦች `scripts/i18n/read-ui-catalog.mjs`ን ይጠቀማሉ፤ የንባብ አለመሳካቶች
በባዶ ኦብጀክቶች አይተኩም። የማይገኝ መሠረትም ሆነ ያልተሟላ ግቤት PASSን አያረጋግጥም።

### ሥራ፦ `i18n`

ሙሉ የi18n ማረጋገጫ ማትሪክስ (ለእያንዳንዱ locale አንድ ሥራ)። ሙሉው ሥራ አማካሪ ነው።

| ስክሪፕት                           | የሚያረጋግጠው                      | አጋጅ                                             |
| ------------------------------- | ----------------------------- | ----------------------------------------------- |
| `validate_translation.py quick` | በእያንዳንዱ locale ያለው የትርጉም ሙሉነት | **አማካሪ** (በሙሉው ሥራ ላይ `continue-on-error: true`) |

### ሥራ፦ `pr-test-policy`

በpull request ላይ ብቻ ይሰራል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                         | አጋጅ |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | --- |
| `check:pr-test-policy` | በ`src/`፣ `open-sse/`፣ `electron/` ወይም `bin/` ውስጥ ያለውን የምርት ኮድ የሚቀይሩ PRዎች ሙከራዎችን ማካተት ወይም ማዘመን አለባቸው (ጥብቅ ደንብ #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የሙከራ ፋይሎች የተጣራ assert ብዛትን አይቀንሱም ወይም የ`assert.ok(true)` አላስፈላጊ ድግግሞሾችን አይጨምሩም                             | አዎ  |
| `check:pr-evidence`    | የPR ዋና ጽሑፍ ለለውጡ የሙከራ/VPS ማስረጃን ይጠቅሳል (ጥብቅ ደንብ #18ን የPR ጽሑፍን grep በማድረግ ራስ-ሰር ያደርጋል — ተሰባሪ ነው፣ Backlogን ይመልከቱ)    | አዎ  |

### ሥራ፦ `test-vitest`

የ`changes` ምደባ ሥራን ይፈልጋል። ተፈጻሚ የማትሪክስ ክፍሎች ካልተሳኩ ውህደቱን ያግዳሉ።

| ስብስብ             | የሚያረጋግጠው                                               | አጋጅ                                                                                |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሣሪያዎች)፣ autoCombo፣ መሸጎጫ — vitest አስኪያጅ | አዎ                                                                                 |
| `test:vitest:ui` | የUI ክፍለ አካል ሙከራዎች — vitest አስኪያጅ                       | **አጋጅ** — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በግልጽ ተገልለዋል፤ አዲስ ውድቀቶች ሥራውን ያወድቃሉ |

### የምሽት የሥራ ፍሰቶች (መርሐግብር የተያዘላቸው፣ አማካሪ)

እነዚህ በcron መርሐግብር (እና `workflow_dispatch`) ላይ ይሠራሉ፣ በPRዎች ላይ ፈጽሞ አይሠሩም። ሁሉም አማካሪ ናቸው።

| የሥራ ፍሰት                | የሚያረጋግጠው                                                                                                                                       | አጋጅነት    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | የfast-check ባህሪ ሙከራዎች፣ ከዘፈቀደ መነሻ እና ከፍተኛ የማስኬድ ብዛት ጋር                                                                                          | **አማካሪ** |
| `nightly-resilience`   | የheap እድገት መግቢያ መቆጣጠሪያ፣ የብልሽት ትርምስ ማስገባት፣ የk6 ጭነት/የረጅም ጊዜ ጭነት ሙከራ                                                                              | **አማካሪ** |
| `nightly-llm-security` | የpromptfoo መርፌ ጥቃት መከላከያ (የማገድ ሁነታ) + የgarak ፍተሻዎች (የአቅራቢ ሚስጥር ከሌለ ይዘለላሉ)                                                                      | **አማካሪ** |
| `nightly-schemathesis` | `docs/openapi.yaml`ን በመጠቀም ቀጥታ OmniRoute ላይ የOpenAPI ውል የዘፈቀደ ግብዓት ሙከራ (schemathesis) — የዝርዝር መግለጫ ጥሰቶችን / ያልተያዙ 500 ስህተቶችን ያጋልጣል (Fase 8 B.4) | **አማካሪ** |
| `nightly-mutation`     | በፈጣኑ የunit መስመር ላይ የStryker ሚውቴሽን ሙከራ ውጤት — የተረፉ ሚውታንቶች ደካማ ማረጋገጫዎችን ያጋልጣሉ                                                                     | **አማካሪ** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ሁሉ የNode engine ተኳኋኝነት ማትሪክስ                                                                                        | **አማካሪ** |

የአፈጻጸም መነሻ መለኪያዎች (heap፣ TTFB፣ የግንባታ ጊዜ) ይመዘገባሉ እንጂ እንደ መግቢያ መቆጣጠሪያ አያገለግሉም፦ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)ን ይመልከቱ።

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
- **አማካሪ** — አጠቃላይ ድምሩ ከታሰረው መነሻ መስፈርት ጋር። በውርስ የመጣ ልዩነት ንጹሕ PRን በፍጹም ቀይ አያደርግም፤
  ልዩነቱ በልቀት ማስታረቅ ወቅት እንዲስተካከል ክትትል ይደረግበታል፣ እንዲሁም በትርፍ አቅም
  ሥራው ይከታተላል።

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
2. `"check:<name>": "node scripts/check/check-<name>.mjs"`ን ወደ `package.json` ያክሉ፣ እንዲሁም
   ተለዋጭ ስሙን እና ትክክለኛ ትዕዛዙን በ`config/quality/gate-manifest.json` ውስጥ ያመሳስሉ።
   ነባር የማረጋገጫ ተለዋጭ ስምን ሲቀይሩ ወይም ሲያስወግዱም ተመሳሳይ ማመሳሰልን ይተግብሩ።
   `npm run check:gate-manifest`ን ያስኪዱ፤ የቅድመ-ኮሚት ማያያዣው እና የCI ለውጥ ምደባው
   ይህን ውል ያስፈጽማሉ።
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
