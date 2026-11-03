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

## የGate እቃ ዝርዝር እና የአፈጻጸም መገለጫዎች

### የእጩ መቀበያ

የCI እና የQuality Gates የሥራ ፍሰቶች የተረጋጋ ውሳኔ ይሰጣሉ፦ `Gate / CI` እና
`Gate / Quality`። ስሪት የተሰጠው የመቀበያ ፖሊሲያቸው እያንዳንዱን የላይኛው ደረጃ ሥራ
እንደሚያስፈልግ ወይም እንደምክር ይዘረዝራል። ተፈጻሚ የሆነ አስፈላጊ ሥራ ስኬታማ መሆን
አለበት፦ የጎደለ፣ የተሰረዘ፣ የተዘለለ፣ በመጠባበቅ ላይ ያለ እና ያልታወቀ ውጤት PASS
ሊያረጋግጥ አይችልም። ትክክለኛ የሰነዶች-ብቻ ወይም የካታሎግ-ብቻ ምደባ የኮድ መስመርን
ተፈጻሚ እንዳይሆን ሊያደርግ ይችላል፤ የረቂቅ PR ተቀባይነት ያለው እጩ አይደለም።
የ`hotfix` መለያ ማስረጃን አያስቀርም።

ሁለቱም የሥራ ፍሰቶች ወደ main/release ቅርንጫፎች የሚደረጉ PRs፣ ወደ
`main` የሚደረጉ pushes፣ በእጅ የሚጀመር ማስነሻ
እና merge-group ክስተቶችን ይሸፍናሉ። Push፣ dispatch እና merge-group ሙሉውን ምርጫ ያስኬዳሉ።
ወደ `release/**` የሚደረጉ pushes እነሱን አያስጀምሩም (2026-10-18)፦ እያንዳንዱ ለውጥ
በPR ላይ ማትሪክሱን አስቀድሞ አስኬዷል፣ እና የተዋሃደው ጥምረት የRelease-Green ሥራ ነው
(`docs/ops/RUNNER_BOX.md` → የHosted መስመር)። Forks
እና merge groups በአማራጭ self-hosted
runners የሚመርጡ ሥራዎች ላይ hosted runners ይጠቀማሉ፤ ከማስጀመሩ በፊት በቂ የhosted አቅም
መኖሩ መረጋገጥ አለበት።

እያንዳንዱ JSON ደረሰኝ የተፈተሸውን SHA፣ የሥራ ፍሰት ሩጫ እና ሙከራ ይለያል።
CLI የcheckout/event SHA አለመመሳሰልን ውድቅ ያደርጋል። የሥራ ፍሰት ሙከራዎች የፖሊሲ
አባልነትን ከውሳኔ ሥራው `needs` ዝርዝር ጋር ያስማማሉ፤ ስለዚህ አዲስ ወይም የተወገደ
መስመር በዝምታ ሊጠፋ አይችልም። ደረሰኞቹ የራሳቸውን የሥራ ፍሰት ይሸፍናሉ፤
ህትመትን፣ ማሰማራትን ወይም ያለ አማካሪ ስካነር ውስጣዊ አሠራርን አይሸፍኑም።
ሁለቱንም የምርመራ ስሞች በቅርንጫፍ ደንቦች ውስጥ ማንቃት የተለየ የአስተዳደር ለውጥ ነው፤
እነዚህን ሥራዎች መጨመር ብቻውን ቅርንጫፍን አይጠብቅም።

### የስታቲክ ስካን እቃ ዝርዝር

ስሪት የተሰጠው የnpm-alias እቃ ዝርዝር እና የስታቲክ-ስካን አባልነት በ
`config/quality/gate-manifest.json` ውስጥ ይገኛሉ። የስክሪፕት ስሞችን እና ከ
`package.json` ጋር የሚዛመዱ ትክክለኛ ትእዛዞችን ለማረጋገጥ `npm run check:gate-manifest` ያስኪዱ፤
መጨመር፣ ማስወገድ እና የትእዛዝ መለዋወጥ የአካባቢያዊ hook እና በCI ውስጥ ያሉ የለውጥ-ምደባ
ሥራዎችን ሁለቱንም ያሳካል። አሊያስ የሥራ ፍሰት ሥራ፣ የማትሪክስ ምሳሌ ወይም የሙከራ
ጉዳይ አይደለም፤ እነዚህ ቁጥሮች እርስ በርስ የሚተካኩ እንደሆኑ መቅረብ የለባቸውም።

የተመረጡትን አሊያሶች ሳያስኬዱ ለመመርመር `npm run quality:scan -- --list` ወይም
`npm run quality:scan:fast -- --list` ይጠቀሙ። ሩነሩ የnpm መግቢያ ነጥቡን ያስኬዳል፤
ስለዚህ የሩጫ ጊዜው (በተዋቀረበት ቦታ Bunን ጨምሮ) ይጠበቃል። ማኒፌስቱ ከእነዚህ
መገለጫዎች ውጭ ያሉ አሊያሶችን በተናጠል እንደሚጠሩ ይመዘግባል፤ እና የጥገና ትእዛዞች
በንባብ-ብቻ የስካን መገለጫዎች ውስጥ የተከለከሉ ናቸው።

እነዚህ መገለጫዎች የስታቲክ ስካንን ብቻ ይሸፍናሉ። የምርት ሙከራዎችን፣ ሽፋንን፣
ጥቅል ማዘጋጀትን፣ ውጫዊ ምርመራዎችን ወይም የእጩውን ሙሉ የልቀት ተቀባይነት
አያረጋግጡም። የሥራ ፍሰት መቀበያ የተገናኘውን
`config/quality/admission-policy.json` እና `scripts/quality/admission-verdict.mjs` ይጠቀማል።
የRelease-observer መገለጫዎች የተለዩ ሆነው ይቆያሉ፤ ተፈጻሚ የሆኑ ምርመራዎቻቸውን
እና ደረሰኞቻቸውን በተናጠል ይመርምሩ። ከታች ያለው የማብራሪያ እቃ ዝርዝር
ማጣቀሻ እንጂ አንድ Gate በእርግጥ እንደተሰራ ማረጋገጫ አይደለም።

ስክሪፕቶች በ `scripts/check/` (የፖሊሲ Gateዎች) እና
`scripts/quality/` (የratchet ሞተር) ስር ይገኛሉ።
የCI ዋና የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የRelease PR ፈጣን መንገድ (`quality.yml`)

`.github/workflows/quality.yml` በmain/release PRs፣ ወደ `main` በሚደረጉ pushes፣
dispatch እና merge groups ላይ CIን ያጠናክራል። PRs የመንገድ-ማጣሪያ ያላቸው
ፈጣን ምርመራዎችን ይጠቀማሉ። በቋሚነት የተሰናከለው የተደጋጋሚ ግንባታ ተወግዷል፤
እውነተኛው የግንባታ/ጥቅል/ማስነሻ ምርመራ በCI ውስጥ እንደቀድሞ ይቀራል።

| ሥራ                                               | ወሰን                                                                                                                                              | እገዳ            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `Docs Gates (fast-path)`                         | የሰነዶች/ኮድ PRs፤ የAPI ሰነዶች ማጣቀሻዎች እና docs-all                                                                                                       | አዎ             |
| `Fast Quality Gates`                             | የኮድ PRs፤ የስታቲክ ምርመራዎች፣ typecheck፣ የዳሽቦርድ typecheck፣ እና ተጽዕኖ የደረሰባቸው የአሃድ ሙከራዎች                                                                   | አዎ             |
| `Forgotten sibling tests`                        | የኮድ PRs፤ የተለወጡ ሞጁሎች ከስታቲክ ተጠቃሚዎች እና ከእጩ ተመሳሳይ ሞጁል ሙከራዎች ጋር ይከተላሉ፤ barrel እና dynamic-import መንገዶች ከተጠቀሱ የallowlist ልዩ ፈቃዶች ጋር እንደ ምክራዊ ምርመራ ይዘገባሉ | **ምክራዊ**       |
| `Vitest (fast-path)`                             | የኮድ PRs፤ ፈጣን የvitest ስብስብ                                                                                                                        | አዎ             |
| `Unit Tests fast-path`                           | የኮድ PRs፤ በ4-shard የተከፈለ የአሃድ ሙከራ ስብስብ                                                                                                            | አዎ             |
| `No new ESLint warnings`                         | የኮድ PRs፤ ማፈኛዎችን የሚያስተውል የlint መከላከያ                                                                                                              | አዎ፣ forksን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆኑ PRs፤ የለውጥ መዝገብ እና የተመነጩ ክህሎቶች ማመሳሰል                                                                                                     | አዎ፣ forksን ጨምሮ |

#### የተረሱ ተመሳሳይ ሞጁል ሙከራዎች ሪፖርት

`npm run check:forgotten-sibling-tests` ከtest-impact map ጀርባ ያለውን የማስመጫ ፈቺ እንደገና ይጠቀማል።
ለእያንዳንዱ የተለወጠ የምርት ሞጁል፣ እጩው ሙከራ
በpull request የለውጥ ዝርዝር ውስጥ ከሌለ፣ የሚወሰኑ የ
`changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ያሳያል። የMarkdown ማጠቃለያው እና የJSON ውጤቱ ከማንኛውም እገዳ በፊት ለማስተካከያ እንደ
`forgotten-sibling-tests` workflow artifact ይቀመጣሉ።

የBarrel re-export እና dynamic import የመፍትሔ ምርመራዎች ብቻ ናቸው፤ እነሱ በፍጹም
የሚያግድ ግኝት አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ
`config/quality/forgotten-sibling-allowlist.json` ውስጥ ይገኛሉ። እያንዳንዱ ግቤት ተጠቃሚውን እና እጩውን
ሙከራ መጥቀስ፣ የተወሰነ ምክንያት መስጠት እና ወደ GitHub issue ወይም pull request ማገናኘት አለበት። በስህተት የተፃፉ ግቤቶች እንዳይፈቀዱ ይደረጋል። ልዩ ሁኔታዎች የተሰረዘ እጩ ሙከራን ወይም `.skip`/`.todo` የሚጨምር የለውጥ ዝርዝርን ማስቀረት አይችሉም፤ የማረጋገጫ ኃይል መቀነስና ሌሎች የመሸፈኛ ዘዴዎች በተናጠል እገዳ በሚያደርገው `check:test-masking` gate ኃላፊነት ስር ይቆያሉ።

### ስራ፡ `lint`

ወደ `main` በሚደረግ እያንዳንዱ PR ላይ ይሰራል። ካልተሳካ ውህደትን ያግዳል።

| ስክሪፕት (`npm run ...`)             | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ማገጃ                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                   |
| `check:cycles`                    | በሁሉም `src/` + `open-sse/` ላይ ያሉ ክብ ማስመጣቶች (በAST ላይ የተመሠረተ፣ የtsconfig `paths` ተፈትተዋል)። Bare ማንኛውም ክብ ማስመጣት ባለበት ጊዜ 1 ይመልሳል (ከ #15281 ጀምሮ በfail-closed ምክንያት) እና SCCs ይዘረዝራል። `check:cycles:ratchet` (CI የሚያስኬደው) ቁጥሩ በ `quality-baseline.json` ውስጥ ካለው `metrics.cycles` ጣሪያ ሲበልጥ ያግዳል — በአሁኑ ጊዜ 14 ነው፣ `direction: down` ስለሆነም መቀነስ ብቻ ይችላል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                               | አዎ (ratchet)                         |
| `check:boundary`                  | `open-sse → src` ጥገኝነት፦ ከኤንጂኑ ወደ መተግበሪያው የሚደረጉ ልዩ ከፋይል-ወደ-ፋይል ማስመጣቶች (`scripts/quality/measure-boundary.mjs`፤ የጠርዝ ዝርዝሩ የv4 ኮር/ሞጁል-መከፋፈል ማስተካከያ የሚጠብቀው የሥራ ዝርዝር ነው)። Bare = የምክር ሪፖርት (ከ `quality:boundary` ጋር ተመሳሳይ)። `check:boundary:ratchet` (CI የሚያስኬደው፣ እንዲሁም በ `quality.yml` ፈጣን-ጌቶች ratchet ዙር ውስጥ ያለው) ቁጥሩ በ `quality-baseline.json` ውስጥ ካለው `metrics.boundaryOpenSseToSrc` ጣሪያ ሲበልጥ ያግዳል — በተለካው 771 ላይ ተመሥርቷል፣ `direction: down` ነው፤ `--update` ጣሪያውን ዝቅ ማድረግ ብቻ ይችላል፤ በPR ላይ ከመነሻው ጋር ተዛማጅ ነው (`--base-ref`፣ ከታች ይመልከቱ)                                                                                                                                                                                                          | አዎ (ratchet)                         |
| `check:route-validation:t06`      | በሁሉም መንገዶች ላይ የZod ስኪማዎች መኖራቸውን (የTier 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                   |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከበጀት አይበልጥም (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                   |
| `check:provider-consistency`      | በ`providers.ts` ውስጥ ያለ እያንዳንዱ provider በ`providerRegistry.ts` ውስጥ ተመሳሳይ ግቤት አለው (እና በተቃራኒው፣ በallowlist ውስጥ እስካለ ድረስ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                   |
| `check:model-lifecycle`           | በእጅ የሚጠበቁት ሦስቱ የሞዴል ማዘዣ ሰንጠረዦች በተረጋገጠው የሕይወት ዑደት ቅጽበታዊ ምስል (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`) ምንም የተሰናበተ id አያስመዘግብም፣ `REGISTRY` ሊያዘዋውረው የሚችል ከሆነ፤ እያንዳንዱ `BUILT_IN_ALIASES` ዒላማ በ`REGISTRY` ውስጥ ይገኛል እና ከተሰናበቱ id-ዎች ቅጽበታዊ ምስል ውስጥ አይገኝም፤ አሁንም በ`REGISTRY` ውስጥ ያለ እያንዳንዱ የተሰናበተ id ወደ ሌላ ቦታ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ይዘረዘራል፤ እና ምንም `DEFAULT_DEGRADATION_MAP` ምንጭ ወይም ዒላማ በዚያ ቅጽበታዊ ምስል ውስጥ እንደተሰናበተ አይታይም። ይህ ሞዴል በአሁኑ ጊዜ በሕያው upstream እየቀረበ መሆኑን አያረጋግጥም። ከመስመር ውጭ — ከ`config/quality/model-lifecycle.json` ጋር ያወዳድራል፤ ይህም በእጅ በ`npm run quality:refresh-model-lifecycle` ይታደሳል (አውታረ መረብ፤ በ CI ውስጥ አልተገናኘም)። `allowedRetiredInCatalog` የቀሪ ሥራ መቀነሻ መመዘኛ ነው፦ ግቤት የሚጨመረው የክትትል ጉዳይ ካለ ብቻ ነው። | አዎ                                   |
| `check:fetch-targets`             | በclient-side `src/` ውስጥ ያለ እያንዳንዱ `fetch("/api/...")` ወደ እውነተኛ `route.ts` ይመራል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                   |
| `check:deps`                      | በማከማቻው ውስጥ ባሉ እያንዳንዱ `package.json` ውስጥ የሚገኙ በ`npm install` ሊጫኑ የሚችሉ ሁሉም deps በ`dependency-allowlist.json` ውስጥ አሉ፤ አዲስ ያልተመረጡ ወይም slopsquatted ፓኬጆች ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                   |
| `audit:deps`                      | `npm audit` (root + electron) — ከፍተኛ/ወሳኝ ማስጠንቀቂያዎች የሉም (ከ osv `check:vuln-ratchet` ጋር ይደራረባል፤ Rationalization Backlog ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                   |
| `check:lockfile`                  | `package-lock.json` ጽኑነት — https መዝገብ፣ የጽኑነት ሃሽዎች፣ ምንም የአስተናጋጅ ማሻሻያዎች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                   |
| `check:licenses`                  | ለምርት ጥገኞች የSPDX ፈቃድ የሚፈቀዱ ዝርዝር                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                   |
| `check:tracked-artifacts`         | ምንም የግንባታ ቅርሶች / በማጠራቀሚያው ውስጥ የተፈጸሙ `node_modules` ሲምሊንኮች የሉም (በhusky pre-commit ውስጥም ይሰራል፤ pre-push ሆን ተብሎ ቀላል ነው — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                   |
| `check:ai-attribution`            | በPR commits፣ ርዕስ ወይም ይዘት ውስጥ ምንም የAI/bot `Co-Authored-By` መጨረሻ መለያ ወይም የAI ማመንጨት ግርጌ የለም — ጠንካራ ደንብ #16 (በ `quality.yml` fast-gates loop ለPR→`release/**` ውስጥ — የevent payload ያነባል፣ ከPR ውጭ ምንም አያደርግም — እና በ `ci.yml` lint ውስጥ ለPR→`main` ብቻ የሚሰራ ደረጃ፤ እንዲሁም የhusky `commit-msg` hook፤ የሰው ተባባሪ ደራሲዎች ይፈቀዳሉ፤ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | እያንዳንዱ የVitest ማግለያ የመከታተያ ጉዳይ ስም ይጠቅሳል እና በ `config/quality/vitest-exclusions.json` ውስጥ ይታያል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                   |
| `check:file-size`                 | የምንጭ ፋይሎች (`.ts`/`.tsx` በ `src/`፣ `open-sse/`፣ `electron/`፣ `bin/` ውስጥ) በ `cap` ገደብ ውስጥ ይቆያሉ፣ እና የሙከራ ፋይሎች (`*.test.ts(x)`) በ `testCap` ውስጥ ይቆያሉ፤ በ `file-size-baseline.json` ውስጥ የቀዘቀዙ ፋይሎች (`frozen` / `testFrozen`) ከተመዘገበው መጠናቸው በላይ ማደግ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                   |
| `check:error-helper`              | በ executors/handlers ውስጥ ያሉ የስህተት ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()` ይጠቀማሉ (ጠንካራ ደንብ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                   |
| `check:migration-numbering`       | የMigration SQL ፋይሎች በተከታታይ ቁጥር ተሰይመዋል፤ ክፍተት ወይም ድግግሞሽ የለም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                   |
| `check:public-creds`              | ከ `publicCreds.ts` ውጭ ምንም ቀጥተኛ OAuth `client_id`/`client_secret` ወይም Firebase Web ቁልፎች የሉም (ጠንካራ ደንብ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                   |
| `check:db-rules`                  | ከ `src/lib/db/` ሞጁሎች ውጭ ጥሬ SQL የለም፤ ከ `localDb.ts` የbarrel-import አጠቃቀም የለም (ጠንካራ ደንቦች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                   |
| `check:known-symbols`             | በ dispatch tables ውስጥ የተመዘገቡ የProvider executors፣ routing strategies እና translators በዲስክ ላይ ካሉ ፋይሎች ጋር ይጣጣማሉ — የተተዉ ወይም ያልታወጁ ምልክቶች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                   |
| `check:route-guard-membership`    | የልጅ ሂደት የሚያስነሳ እያንዳንዱ route በ `isLocalOnlyPath()` ይመደባል (ጠንካራ ደንቦች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ                                   |
| `check:test-discovery`            | Repon ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ የሙከራ አሂያጅ ይሰበሰባል (ratchet፦ በ`test-discovery-baseline.json` ውስጥ ያለው የብቸኛ ፋይሎች ዝርዝር መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Yes                                  |
| `check:test-tla-order`            | በ`tests/unit` ስር ያለ ምንም `node:test` ፋይል ሙከራ አይመዘግብም፣ የከፍተኛ-ደረጃ `await` አይደርስበትም፣ ከዚያም ተጨማሪ ሙከራ አይመዘግብም (#18045፤ ratchet፦ `test-tla-order-allowlist.json` መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Yes                                  |
| `check:agent-skills-sync`         | የተፈጠሩ የagent-skills ቅርሶች ከምንጭ ካታሎጋቸው ጋር ይጣጣማሉ (ልዩነት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | የአቅራቢዎች አርማዎች/ንብረቶች የተመዘገበ የመነሻ መረጃ እንዳላቸው ያረጋግጣሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | የJSON ውቅረት ፋይሎች ይተነተናሉ እና የrepon የlint ደንቦችን ያሟላሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | ያለምንም ስህተት የTypeScript ማጠናቀር (የምክር ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Yes                                  |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊት ለሚደረግ ማሻሻያ፤ ብዙ አስቀድመው ያሉ የጥሪ ቦታዎች አሁንም ማብራሪያዎችን ያስፈልጋቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **የምክር** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` በ`src/app/(dashboard)/**` ላይ የተገደበ የአይነት ምርመራ (#7033) — `typecheck:core` የመረጣቸው 27 ፋይሎች የdashboard TSX ፋይሎችን አያካትቱም፣ እንዲሁም `next build` የአይነት ምርመራ በፍጹም አያካሂድም (`next.config.mjs` `ignoreBuildErrors: true` ያዘጋጃል)፤ ስለዚህ እዚያ የሚፈጠሩ የተለዩ መለያ መለያ-ማጣቀሻ መመለሶች (#6625/#6909) በCI አይታዩም ነበር። ከተቀዘቀዘ የፋይል-በፋይል/የTS-ኮድ-በኮድ ብዛት መነሻ መረጃ (`config/quality/dashboard-typecheck-baseline.json`፣ ከ`check:known-symbols` ጋር ተመሳሳይ የድሮ ማስፈጸሚያ አቀራረብ) ጋር ያነጻጽራል — ከመነሻ ብዛቱ በላይ የሚጨመሩ አዳዲስ ስህተቶች ብቻ የመቆጣጠሪያውን መስፈርት እንዳያልፍ ያደርጋሉ፤ አስቀድሞ የነበረ ስህተት ሲስተካከል `--update` በመጠቀም መስፈርቱን ዝቅ ያድርጉ።                                                                                                                                                             | አዎ                                   |

### ሥራ፦ `quality-gate`

ከ`test-coverage` በኋላ ይሰራል። ስህተት ሲኖር ውህደትን ያግዳል።

| ስክሪፕት                        | የሚያረጋግጠው                                                                                                                                 | ማገድ                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | `quality-metrics.json` ያወጣል (የESLint ማስጠንቀቂያዎች ብዛት፣ ከተዋሃደ የshard ሪፖርት የተገኘ ሽፋን)                                                          | አዎ (የratchet አስቀድሞ የሚያስፈልገው) |
| `quality:ratchet`            | በ`quality-baseline.json` ውስጥ ያለ እያንዳንዱ መለኪያ እንዳልተበላሸ ያረጋግጣል (የESLint ማስጠንቀቂያዎች ≤ መነሻ መረጃ፤ ሽፋን ≥ መነሻ መረጃ)                                 | አዎ                           |
| `check:duplication`          | የኮድ ድግግሞሽ (jscpd@4) በ`quality-baseline.json` ውስጥ ካለው መነሻ መረጃ አይበልጥም                                                                      | አዎ                           |
| `check:complexity`           | በፋይል ደረጃ ያለ የሳይክሎማቲክ ውስብስብነት ከገደቡ አይበልጥም (የcore ESLint `complexity` + `max-lines-per-function`)                                          | አዎ                           |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ratchet (`eslint-plugin-sonarjs`) — የተለየ የESLint ማለፊያ፤ CI ሁለቱንም እንደ አንድ የ`check:complexity-ratchets` ደረጃ ያዋሃዳል             | አዎ                           |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ የውጪ ምልክቶች / ፋይሎች ratchet (knip) ከመነሻ መረጃው ጋር ሲነጻጸር አይበላሽም                                                                    | አዎ                           |
| `check:compression-budget`   | የመጭመቂያ ቤንችማርክ በጀት — በእያንዳንዱ ሞተር የቶከን-ቁጠባ ዝቅተኛ ደረጃዎች አይበላሹም                                                                               | አዎ                           |
| `check:type-coverage`        | መቶኛ የተጻፈበት ratchet (`type-coverage`) አይበላሽም፤ በአብዛኛው `typecheck:noimplicit:core`ን ይተካል                                                    | አዎ                           |
| `check:codeql-ratchet`       | የተከፈቱ የCodeQL ማንቂያዎች ብዛት አይበላሽም (`gh api`ን በመጠቀም ያነባል፤ ቶከን ከሌለ በረጋ ሁኔታ ይዘላል) — የማደሻ ዑደትና በእጅ የሚደረግ ማስነሻ፦ ከታች ያለውን “CodeQL ratchet” ይመልከቱ | አዎ                           |

### ሥራ፦ `quality-extended`

ሙሉው ሥራ ምክረ ሀሳብ ብቻ ነው (`continue-on-error: true`)። በnpm ላይ የተመሰረቱ ratchet ምርመራዎች በትክክል ይሰራሉ፤ ውጫዊ ስካነሮቹ በ`gh release download` ይጫናሉ እና ባይነሪ ፋይሉ ካልተገኘ በራሳቸው ይዘላሉ (exit 0)።

| ስክሪፕት                    | የሚያረጋግጠው                                                                                                                                                                  | ማገድ                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | ምንም የክብ ጥገኝነቶች የሉም (dpdm)                                                                                                                                                 | **ምክረ ሀሳብ ብቻ**                                |
| `check:bundle-size`      | የbundle መጠን ከገደቡ አይበልጥም                                                                                                                                                   | **ምክረ ሀሳብ ብቻ**                                |
| `check:secrets`          | ሚስጥሮችን መፈለግ (gitleaks) — ባይነሪ ፋይሉ ከሌለ ይዘላል                                                                                                                                | **ምክረ ሀሳብ ብቻ**                                |
| `check:vuln-ratchet`     | የጥገኝነት ተጋላጭነቶች (osv-scanner) አይበላሹም — ባይነሪ ፋይሉ ከሌለ ይዘላል                                                                                                                   | **ምክረ ሀሳብ ብቻ**                                |
| `check:workflows`        | የworkflow ሊንት (actionlint + zizmor)፤ የጎደሉ/የተበላሹ ስካነሮች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደለ ratchet መነሻ መረጃ እንደ INCOMPLETE ተቆጥረው ይሳካሉ። ትክክለኛ ግኝቶች የተመረጠውን ጥብቅ/ምክረ ሀሳብ/ratchet ፖሊሲ ይከተላሉ | አፈጻጸም ያስፈልጋል፤ zizmor ratchet በCI ውስጥ የሚያግድ ነው |
| `check:openapi-breaking` | በመነሻ ቅርንጫፉ ላይ ካለው የህዝብ API ውል (`openapi.yaml`) ጋር ሲነጻጸር የሚከሰቱ ለውጦች (oasdiff) — `openapiBreaking=N` ያወጣል፤ oasdiff ከሌለ ወይም የመነሻ መግለጫው ሊፈታ ካልቻለ ይዘላል                         | **ምክረ ሀሳብ ብቻ**                                |

### ሥራ፦ `docs-sync-strict`

በ`main` ላይ ለሚደረግ እያንዳንዱ PR ይሰራል። ስህተት ሲኖር ውህደትን ያግዳል።

| Script                         | Validates                                                                                                                             | Blocking                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | ከታች ያሉትን 6 ንዑስ-መቆጣጠሪያዎች በተከታታይ የሚያስኬድ ሜታ-መቆጣጠሪያ                                                                                       | አዎ                       |
| ↳ `check:docs-sync`            | የCHANGELOG / OpenAPI / llm.txt የስሪት ወጥነት                                                                                              | አዎ                       |
| ↳ `check:docs-counts`          | በጽሑፍ ውስጥ ያሉ ቆጠራዎች (የአቅራቢዎች ብዛት፣ የማሻገሪያዎች ብዛት፣ ወዘተ) ከእውነተኛ ቆጠራዎች የratchet መስኮት ውስጥ ናቸው                                                 | አዎ                       |
| ↳ `check:env-doc-sync`         | በ`.env.example` ውስጥ ያለ እያንዳንዱ env var በሰነዶች ሰንጠረዥ ውስጥ ተገልጿል፣ እንዲሁም በተቃራኒው                                                             | አዎ                       |
| ↳ `check:deprecated-versions`  | በሰነዶች ውስጥ የተቋረጡ የስሪት ሕብረቁምፊዎች የሉም                                                                                                     | አዎ                       |
| ↳ `check:doc-links`            | በሰነዶች ውስጥ ያሉ የውስጥ markdown አገናኞች ወደ እውነተኛ ፋይሎች ይደርሳሉ (`[text]`/`(path)` ቅርጽ)                                                          | አዎ                       |
| ↳ `check:fabricated-docs`      | በሰነዶች የተጠቀሱ መንገዶች፣ env vars፣ CLI ትዕዛዞች፣ የhook ስሞች እና የፋይል መንገዶች በኮድቤዝ ውስጥ አሉ። በ`--strict` ጠንካራ መቆጣጠሪያ ነው፤ ያለ ባንዲራው ግን ለስላሳ ውድቀት ይሰጣል። | አዎ (በCI ውስጥ በ`--strict`) |
| `check:cli-i18n`               | CLI የትዕዛዝ ሕብረቁምፊዎች በሁሉም i18n የቋንቋ ፋይሎች ውስጥ አሉ                                                                                         | አዎ                       |
| `check:openapi-coverage`       | OpenAPI መግለጫው ከእውነተኛ መንገዶች የratchet ዝቅተኛ ደረጃ ቢያንስ ይሸፍናል                                                                               | አዎ                       |
| `check:openapi-security-tiers` | በ`openapi.yaml` ውስጥ ያሉ የደህንነት ደረጃ ማብራሪያዎች ከ`routeGuard.ts` ምደባዎች ጋር ወጥነት አላቸው                                                         | **ምክረ ሃሳብ**              |
| `check:openapi-routes`         | በ`openapi.yaml` ውስጥ ያለ እያንዳንዱ ዱካ ወደ እውነተኛ `route.ts` ይደርሳል (ፀረ-ቅዠት)                                                                   | አዎ                       |
| `check:docs-symbols`           | በ`docs/**/*.md` ውስጥ ያለ እያንዳንዱ `/api/...` ማጣቀሻ ወደ እውነተኛ `route.ts` ይደርሳል (ፀረ-ቅዠት)                                                      | አዎ                       |
| `i18n translation drift`       | በi18n የቋንቋ ፋይሎች ውስጥ ያልተተረጎሙ ቁልፎች — ማስጠንቀቂያ ብቻ                                                                                         | **ምክረ ሃሳብ**              |

በ`docs/diagrams/` ስር ያሉት አስራ ሁለቱ README SVGዎች የሚመነጩ ናቸው (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ሁሉንም እንደገና ያመነጫል)። እያንዳንዱ የባይት-ንጽጽር የክፍል ሙከራ አለው
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`)፤ ይህም በcommit የተደረገው ፋይል ጊዜው ያለፈበት ሲሆን ይወድቃል፣ እና
`check:docs-counts` ቀኖናዊ ቁጥሮችን ከ`<text>` ኖዶቻቸው ያነባል — ለዚህም ነው የአወቃቀር እርምጃው
እያንዳንዱን የተዋቀረ ሕብረቁምፊ በፋይሉ ውስጥ እንደ የማይታይ `<text>` እንዲቆይ የሚያደርገው። የSVG ቀኖናዊ-ቁጥሮች ማረጋገጫ በ
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) የተዘረዘሩትን ፋይሎች ያነባል፦ `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`፣ እንዲሁም `public/images/tier-flow-dark.svg` እና `tier-flow-light.svg`፤
የfree-forever፣ catalog-entry፣ recurring-pool እና scoring-factors ይዘቶችም ከ
`promise-pillars.svg`, `free-tier-budget.svg` እና `strategies-grid.svg` ያነባሉ። `free-tier-budget.svg`
አሃዞቹን ከቀጥታ የካታሎግ ጫኚ ይወስዳል፤ ስለዚህ በ`FREE_MODEL_BUDGETS` ወይም በአቅራቢ ማሳያ ስም ላይ የሚደረግ ለውጥ ያ ፋይል እንደገና እስኪመነጭ ድረስ CI እንዲወድቅ ያደርጋል።

### Job: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                  | Blocking    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | የUI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                                  | አዎ          |
| `check-ui-value-drift` (inline)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ምንም የቆየ ትርጉም እንዳይተው ያረጋግጣል                                                                                                      | አዎ          |
| `check-new-key-coverage` (inline) | አዲስ የእንግሊዝኛ ቁልፍ በእያንዳንዱ የቋንቋ አካባቢ ተተርጉሟል — `__MISSING__:` ምልክት አይቀበልም                                                                                      | አዎ          |
| `check-translation-ratio`         | በየቋንቋው ያለው የእውነተኛ-ትርጉም ጥምርታ (ከእንግሊዝኛ ጋር ተመሳሳይ / placeholder / የጎደለ እሴት ከተፈቀደው ዝርዝር ውጭ) ከ`config/quality/i18n-translation-baseline.json` + slack መብለጥ የለበትም | **ምክረ ሃሳብ** |

`fetch-depth: 0` ያስፈልጋል — የእሴት-መንሸራተት መቆጣጠሪያው `en.json` ን ከmerge base ጋር ያነጻጽራል።

#### `check-ui-value-drift` — የቆየ-ትርጉም መቆጣጠሪያ

ሌሎቹ መከላከያዎች በመዋቅራዊ ሁኔታ ሊያዩት የማይችሉትን አንድ የi18n መመለስ ስህተት ይይዛል፦ የእንግሊዝኛ እሴት እንደገና ሲጻፍ ከ_ቀድሞው_ የእንግሊዝኛ እሴት የተመነጩ ትርጉሞች ከኋላ ይቀራሉ፤ በዚህም
እንግሊዝኛ ያልሆኑ ተጠቃሚዎች በራስ መተማመን የተጻፈ ቢመስልም አሁን ስህተት የሆነ ጽሑፍ ማንበባቸውን ይቀጥላሉ።

ይህ በእውነት ተልኳል። `oauthModal.googleOAuthWarning` የAntigravity
የመግቢያ እገዛ መሳሪያ ሲጨመር (#5203) እንደገና ተጻፈ፤ **ከ43 አካባቢዎች 39ኙ** ኦፕሬተሮች "ሙሉውን URL በመቅዳት ከዚህ በታች ይለጥፉ" የሚል ጽሑፍ እንዲያዩ አድርገዋል — ለዚያ አቅራቢ ሊጠናቀቅ የማይችል የስራ ፍሰት። እስከ #8463 ድረስ ሳይታወቅ ቆይቷል፣ ምክንያቱም፦

- `sync-ui-keys` የሚመልሰው የሌሉ ቁልፎችን **ብቻ** ነው፤ ያረጁ ቁልፎችን በፍጹም አይመልስም፤
- `check-ui-keys-coverage` የቁልፍ _መኖርን_ ይቆጥራል፤ ስለዚህ ያረጀ ትርጉም እንደተሸፈነ ይቆጠራል፤
- `check-translation-drift` የ`docs/i18n/<locale>/**.md` የሰነድ መስታወቶችን ይከታተላል — `src/i18n/messages/*.json` በፍጹም አያነብም። ከ2026-09 ዳግም ማመሳሰል ጀምሮ በ`docs-sync-strict` ስራ ውስጥ ማገጃ ሆኗል፦ ዋና ሰነድ ሲያርትዑ → `npm run i18n:run -- --files=<doc>` (በክፍል ደረጃ፣ ዝቅተኛ ወጪ)።

**ልዩነትን የሚያውቅ፣ በመነሻ መሠረት ያልተደገፈ።** በመዋሃድ መነሻ ላይ ያለውን `en.json` ከስራ ዛፉ ጋር ያነጻጽራል፤ የእንግሊዝኛ እሴቱ ለተቀየረበት እያንዳንዱ ቁልፍ፣ አንድ አካባቢ አሁንም ያልተነካ ትርጉም ከያዘ ያ ትርጉም ያረጀ ነው። ይህ አስቀድሞ የነበረውን **ዕዳ ሆን ብሎ ያቆማል** — አንድ ልዩነት የቆየ ትርጉም ከየትኛው የቀድሞ እንግሊዝኛ እንደመጣ ሊያሳይ አይችልም፤ ስለዚህ መከላከያው የሚፈርደው የአሁኑ ለውጥ በሚነካው ላይ ብቻ ነው። አማራጩ (በቁልፍ ደረጃ የሚያስፈልግ የhash መነሻ መረጃ) ወደ 600 KB የሚጠጋ የተመነጨ ፋይል ያስከፍላል፤ ይህም አሁን ካለው ትልቁ መነሻ መረጃ 3 እጥፍ ሲሆን በእያንዳንዱ i18n PR ላይ ይለዋወጣል።

እሱን ለማሟላት ሁለት መንገዶች አሉ፦

1. የተጎዱ ትርጉሞችን ያዘምኑ፣ ወይም
2. ወደ `__MISSING__:<new english>` ያዘጋጁዋቸው — ከዚያ የማስኬጃ ስርዓቱ የተስተካከለውን እንግሊዝኛ ያቀርባል
   (`src/i18n/request.ts::deepMergeFallback`, #7258) እና ቁልፉ ለትርጉም ወረፋ ውስጥ ይገባል።

የሕብረቁምፊው **ትርጉም** ከተቀየረ፣ **ቁልፉን እንደገና መሰየምን** ይመርጡ፦ አዲስ ቁልፍ ያረጀ ትርጉም ሊወርስ አይችልም። ይህ #8463 የተጠቀመበት ንድፍ ነው።

```bash
npm run i18n:check-value-drift          # ጥብቅ (CI የሚያስኬደው)
npm run i18n:check-value-drift:warn     # ሪፖርት ብቻ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

መነሻ ካታሎጉ ሊነበብ በማይችልበት ጊዜ (የመነሻ ref የሌለው ጥልቀት የሌለው clone) `SKIP reason=base-unresolved` በማለት 0 ይመልሳል፤ ይህም `check-openapi-breaking` እንደሚያደርገው ነው።

### ስራ፦ `i18n`

ሙሉ የi18n ማረጋገጫ ማትሪክስ (ለእያንዳንዱ አካባቢ አንድ ስራ)። ሙሉው ስራ ምክረ ሀሳብ ብቻ ነው።

| ስክሪፕት                           | የሚያረጋግጠው                | ማገጃ                                                |
| ------------------------------- | ----------------------- | -------------------------------------------------- |
| `validate_translation.py quick` | በእያንዳንዱ አካባቢ የትርጉም ሙሉነት | **ምክረ ሀሳብ** (`continue-on-error: true` በሙሉ ስራው ላይ) |

### ስራ፦ `pr-test-policy`

በpull request ላይ ብቻ ይሰራል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                   | ማገጃ |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | --- |
| `check:pr-test-policy` | በ`src/`, `open-sse/`, `electron/` ወይም `bin/` ውስጥ የምርት ኮድ የሚቀይሩ PRs ሙከራዎችን ማካተት ወይም ማዘመን አለባቸው (ጠንካራ ሕግ #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የሙከራ ፋይሎች አጠቃላይ የassert ብዛትን እንደማይቀንሱ ወይም `assert.ok(true)` የሚሉ ተዘዋዋሪ አረጋጋጮችን እንደማይጨምሩ               | አዎ  |
| `check:pr-evidence`    | የPR ጽሑፉ ለለውጡ የሙከራ/VPS ማስረጃ እንደሚጠቅስ (ጠንካራ ሕግ #18ን በPR ጽሑፍ ውስጥ በመፈለግ ተግባራዊ ያደርጋል — ተሰባሪ፣ Backlogን ይመልከቱ)     | አዎ  |

### ስራ፦ `test-vitest`

ከ`build` በኋላ ይሰራል። ካልተሳካ መዋሃድን ያግዳል።

| ስብስብ             | የሚያረጋግጠው                                                | ማገጃ                                                                                     |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሳሪያዎች)፣ autoCombo፣ መሸጎጫ — vitest runner | አዎ                                                                                      |
| `test:vitest:ui` | የUI ክፍል ሙከራዎች — vitest runner                           | **ማገጃ** — አስቀድሞ የነበሩ አለመሳካቶች በ`vitest.config.ts` ውስጥ በግልጽ ተገልለዋል፤ አዲስ አለመሳካቶች ስራውን ያሳጣሉ |

### የሌሊት የስራ ፍሰቶች (በመርሐ ግብር የሚሰሩ፣ ምክረ ሀሳብ)

እነዚህ በcron መርሐ ግብር (እና `workflow_dispatch`) ይሰራሉ፤ በPRs ላይ በፍጹም አይሰሩም። ሁሉም ምክረ ሀሳብ ብቻ ናቸው።

| የሥራ ፍሰት                | የሚያረጋግጠው                                                                                                                          | ማገድ         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | የfast-check የንብረት ሙከራዎች በዘፈቀደ ዘር + ከፍተኛ የሩጫ ብዛት                                                                                   | **ምክረ ሀሳብ** |
| `nightly-resilience`   | የheap እድገት መግቢያ፣ የchaos ስህተት-ማስገባት፣ k6 ጭነት/የጽናት ሙከራ                                                                               | **ምክረ ሀሳብ** |
| `nightly-llm-security` | የpromptfoo ማስገባት መከላከያ (የማገጃ ሁነታ) + የgarak መመርመሪያዎች (የአቅራቢ ሚስጥር ከሌለ ይዘለላሉ)                                                        | **ምክረ ሀሳብ** |
| `nightly-schemathesis` | የOpenAPI ውል fuzzing (schemathesis) በቀጥታ በሚሰራ OmniRoute ላይ `docs/openapi.yaml`ን በመጠቀም — የዝርዝር መጣስ / ያልተስተናገዱ 500s ያሳያል (ደረጃ 8 B.4) | **ምክረ ሀሳብ** |
| `nightly-mutation`     | በfast unit lane ላይ የStryker mutation-testing ውጤት — በሕይወት የሚቆዩ mutants ደካማ ማረጋገጫዎችን ያሳያሉ                                           | **ምክረ ሀሳብ** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ላይ የNode engine ተኳሃኝነት ማትሪክስ                                                                           | **ምክረ ሀሳብ** |

የአፈጻጸም መነሻ መለኪያዎች (heap፣ TTFB፣ የbuild ጊዜ) ይመዘገባሉ፣ እንጂ እንደ መስፈርት አይወሰኑም፦ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)ን ይመልከቱ (`npm run perf:lts-baseline`)።

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
