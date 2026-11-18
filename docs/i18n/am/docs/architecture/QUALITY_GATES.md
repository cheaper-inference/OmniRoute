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

## የበር ቆጠራ እና የማስፈጸሚያ መገለጫዎች

### የእጩዎች መግቢያ

CI እና የጥራት ጌትስ የስራ ፍሰቶች እያንዳንዳቸው የተረጋጋ ብይን ይሰጣሉ `Gate / CI` እና `Gate / Quality`. የእነርሱ ስሪት ያለው የመግቢያ ፖሊሲ እንደ አስፈላጊነቱ ወይም እንደ ምክር ሁሉንም የወራጅ ስራዎችን ይዘረዝራል። የሚመለከተው አስፈላጊ ሥራ ስኬታማ መሆን አለበት፡ ጠፍቷል፣ የተሰረዘ፣ የተዘለለ፣ በመጠባበቅ ላይ እና ያልታወቁ ውጤቶች PASS መመስረት አይችሉም። የሚሰራ ሰነዶች-ብቻ ወይም ካታሎግ-ብቻ ምደባ የኮድ መስመርን የማይተገበር ያደርገዋል። ረቂቅ PR ተቀባይነት ያለው እጩ አይደለም። የ `hotfix` መለያ ማስረጃን አይተውም።

ሁለቱም የስራ ፍሰቶች PRs ወደ main/release ቅርንጫፎች ይሸፍናሉ፣ ወደ `main` ይገፋሉ፣ በእጅ መላኪያ እና የቡድን ውህደት ክስተቶች። ሙሉ ምርጫውን ይግፉ፣ ይላኩ እና ያዋህዱ። ወደ `release/**` የሚገፋፉ አይጀምራቸውም (2026-10-18)፡ እያንዳንዱ ለውጥ ማትሪክስ ቀድሞውንም በ PR ላይ ሰርቷል እና የተዋሃደው ጥምር የልቀት-አረንጓዴ ስራ ነው (`docs/ops/RUNNER_BOX.md` → የሚስተናገድ ሌይን)። ሹካ እና የተዋሃዱ ቡድኖች በራሳቸው የሚስተናገዱ ሯጮችን ለሚመርጡ ስራዎች የተስተናገዱ ሯጮችን ይጠቀማሉ። ከታቀደው ልቀት በፊት በቂ የተስተናገደ አቅም መረጋገጥ አለበት።

አንድ ተራ PR ፈጣን ምርጫን ያካሂዳል. የ `full-code` እና `full-code-e2e` የመግቢያ ፖሊሲ መስመሮች (E2E፣ ውህደት፣ የጥቅል ቅርስ፣ Electron ጭስ፣ Bun SQLite፣ ምህዳር እና ፕሮቶኮል ደንበኞች) በ Mergify ወረፋ ረቂቅ ወይም ሙሉ ሩጫ ላይ ብቻ ይሰራሉ `gh workflow run ci.yml --ref <branch>`.

እያንዳንዱ JSON ደረሰኝ ተመዝግቦ የወጣውን SHA፣ የስራ ሂደትን እና ሙከራን ይለያል። CLI የ checkout/event SHA አለመዛመድን ውድቅ ያደርጋል። የስራ ፍሰት ፈተናዎች አዲስ ወይም የተወገደ መስመር በፀጥታ እንዳይጠፋ የፖሊሲ አባልነትን ከፍርዱ ስራ `needs` ዝርዝር ጋር ያቆራኛሉ። ደረሰኞቹ የራሳቸውን የስራ ሂደት ይሸፍናሉ እንጂ ማተምን፣ ማሰማራትን ወይም ነባር የአማካሪ ስካነርን ውስጣዊ ነገሮች አይሸፍኑም። በቅርንጫፍ ደንቦች ውስጥ ሁለቱንም የቼክ ስሞች ማግበር የተለየ አስተዳደራዊ ለውጥ ነው; እነዚህን ስራዎች መጨመር እራሱን ቅርንጫፍ አይከላከልም.

### ወረፋ አዋህድ

`queue` መለያው ወደ Mergify ወረፋ (`.mergify.yml`) PR ይልካል። Mergify ረቂቅ PR በ `mergify/merge-queue/` ቅርንጫፍ ላይ ይከፍታል፣ CI ሙሉውን ምርጫ እዚያ ያካሂዳል፣ እና የመጀመሪያው PR `Gate / CI`, `Gate / Quality` እና `Merge integrity (changelog + generated skills)` ሲያልፍ ይዋሃዳሉ።

Mergify የወረፋ ማጠቃለያውን ወደ ረቂቁ መግለጫ ይጽፋል፣ እና ሌሎች መተግበሪያዎችም አርትዖት ሊያደርጉት ይችላሉ። በእንደዚህ አይነት ረቂቅ ላይ `pull_request` `edited` ክስተት የራሱ የሆነ የተጓዳኝ ቡድን (`-queue-edit-<run_id>`) ስለሚወስድ የረቂቁን ትክክለኛ ሩጫ መሰረዝ አይችልም፣ እና በሩን እና ማትሪክስ ይዘላል። አሁንም የሚሄደው `Merge integrity` ብቻ ነው። የተዘለለው የጌት ስራ የተለየ የፍተሻ ስም ይይዛል፣ ምክንያቱም Mergify የተዘለለ `Gate / CI` እንደ ያልተሳካ ቼክ አንብቦ PR ስለሚያጠፋ ነው።

ከውድቀት በኋላ፣ መግፋት ሁል ጊዜ PR አይጠይቅም። በእሱ ላይ `@mergifyio queue` አስተያየት ይስጡ.

### በተቀባይ ተቀባይ ውስጥ የተያዙ ማስረጃዎች

`scripts/quality/validate-release-acceptance.mjs` የቀረበውን እቅድ እና መግለጫዎቹን ይቀንሳል; እቅዱ ሙሉ ለሙሉ የመልቀቂያ ቧንቧን እንደሚሸፍን አያረጋግጥም. የእሱ ሪፖርቶች `releaseAcceptance: false` በግልጽ ያስቀምጣሉ፣ ምንም እንኳን ያ እቅድ `VERIFIED` ቢሆንም። የ `release-acceptance.yml` የስራ ፍሰቱ አሁንም የጥላ ዕቃዎችን ይጠቀማል እንጂ እውነተኛ ግንባታ፣ ጥቅል፣ ቡት ወይም የማስተዋወቂያ ደረሰኞች አይደለም።

የተያዙ ማስረጃዎችን ለማረጋገጥ CLI `--evidence-root` ያስፈልገዋል። ፋይሎች እንደ `<evidence-root>/<artifact_id>/<member>` እና hashed እንደ SHA-256 ተፈትተዋል። የ PASS መዝገብ ያለ ማስረጃ፣ የጠፋ ወይም የተለወጠ ፋይል፣ ደህንነቱ ያልተጠበቀ መንገድ ወይም ሲምሊንክ ማረጋገጥን ይከለክላል። የጎደሉ ፋይሎች ስኬታማ ከሆኑ ምዝግብ ማስታወሻዎች ባዶ ጋር እኩል አይደሉም። አሁን ያሉት SHA/run/attempt ቼኮች ነጻ ሆነው ይቆያሉ፡ ተዛማጅ ባይት የቆየ ደረሰኝን ማዳን አይችልም። የፋይል ታማኝነት የአፈፃፀም ትክክለኛነት ወይም የቅርስ ማስተዋወቅ ማረጋገጫ አይደለም።

### የማይንቀሳቀስ ቅኝት ክምችት

የተሻሻለው npm-alias inventory እና static-scan አባልነት በ `config/quality/gate-manifest.json` ውስጥ ይኖራሉ። የስክሪፕት ስሞችን እና ትክክለኛ ትዕዛዞችን በ `package.json` ላይ ለማረጋገጥ `npm run check:gate-manifest` ያሂዱ; ተጨማሪዎች፣ ማስወገጃዎች እና የትእዛዝ ተንሸራታች የአካባቢ መንጠቆ እና የለውጥ ምደባ ስራዎች በ CI ውስጥ ወድቀዋል። ተለዋጭ ስም የስራ ፍሰት ስራ፣ ማትሪክስ ምሳሌ ወይም የሙከራ ጉዳይ አይደለም፡ እነዚህ ቆጠራዎች ሊለዋወጡ የሚችሉ ሆነው መቅረብ የለባቸውም።

የተመረጡትን ተለዋጭ ስሞች ሳትፈጽም ለመመርመር `npm run quality:scan -- --list` ወይም `npm run quality:scan:fast -- --list` ይጠቀሙ። ሯጩ የ npm መግቢያ ነጥብን ይጠራል፣ ስለዚህ የሩጫ ሰዓቱ (ከተዋቀረ Bun ጨምሮ) ተጠብቆ ይቆያል። አንጸባራቂው ከነዚያ መገለጫዎች ውጭ ተለዋጭ ስሞችን ለብቻው በተጠራ መልኩ ይመዘግባል፣ እና የጥገና ትዕዛዞች በተነባቢ-ብቻ ቅኝት መገለጫዎች የተከለከሉ ናቸው።

እነዚህ መገለጫዎች የማይንቀሳቀስ ቅኝትን ብቻ ይሸፍናሉ። የምርት ሙከራዎችን፣ ሽፋንን፣ ማሸግን፣ የውጭ ቼኮችን ወይም የእጩን ሙሉ ልቀት መቀበልን አያረጋግጡም። የስራ ፍሰት መግቢያ የተገናኘውን `config/quality/admission-policy.json` እና `scripts/quality/admission-verdict.mjs` ይጠቀማል። የመልቀቂያ-ታዛቢ መገለጫዎች ተለይተው ይቀራሉ; የሚመለከታቸውን ቼኮች እና ደረሰኞች በተናጥል ይፈትሹ። የሙሉ ተመልካቾች የማይለዋወጡ ትዕዛዞች `audit:deps`፣ ሚውቴሽን-ሙከራ ምርጫ እና የትርጉም ፍተሻዎችን ጨምሮ በ `config/quality/release-green-static-profile.json` ውስጥ ተገልፀዋል። ጫኚው የ npm ትዕዛዞችን በ package.json እና ሞዴል የተደረገ CI/Quality መግለጫዎችን ያጸናል፤ የሼል ቶከኖችን እንደ ክርክር ከማስፈጸም ይልቅ ተንሸራታትን ውድቅ ያደርጋል። የሚያስፈልግ ስካነር SKIP/INCOMPLETE ውፅዓት PASS መመስረት አይችልም። መገለጫው ውጫዊ ማግለያዎቹን ይመዘግባል እና የተስተናገደ ሽፋን፣ የሙከራ ማትሪክስ፣ ጥቅል ወይም የማሰማራት ማስረጃን አይተካም። ከታች ያለው የስድ መዝገብ ዝርዝር ዋቢ እንጂ በር በትክክል መሮጡን ማረጋገጫ አይደለም።

ስክሪፕቶች በ `scripts/check/` (የፖሊሲ በሮች) እና `scripts/quality/` (የራትቼ ሞተር) ስር ይኖራሉ። CI የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### PR ፈጣን መንገድን ይልቀቁ (`quality.yml`)

`.github/workflows/quality.yml` በ main/release PRs ላይ CI ያሟላል፣ ወደ `main` ይገፋፋል፣ ቡድኖችን ይላካል እና ያዋህዳል። PRs በመንገድ ላይ የተጣሩ ፈጣን ፍተሻዎችን ይጠቀሙ። በቋሚነት የተሰናከለው የተባዛ ግንባታ ተወግዷል; ትክክለኛው build/package/boot ቼኮች በ CI ውስጥ ይቀራሉ። አሃዱ ስብስብ እና vitest የሚሄዱት CI (`Unit Tests (N/8)` እና `Vitest`) ውስጥ ብቻ ነው።

| ኢዮብ                                              | ወሰን                                                                                              | ማገድ           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs እና docs-all                                                         | አዎ            |
| `Fast Quality Gates`                             | ኮድ PRs; የማይለዋወጥ ቼኮች፣ የጽሕፈት መኪና፣ የዳሽቦርድ ታይፕ፣ ተጽዕኖ የተደረገባቸው የክፍል ሙከራዎች፣ የተረሱ የወንድም እህት ሙከራዎች (ምክር) |
| `No new ESLint warnings`                         | ኮድ PRs; ጭቆና-የሚያውቅ lint ጠባቂ                                                                       | አዎ, ሹካዎችን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆነ PRs; changelog እና የመነጨ ችሎታ ማመሳሰል                                                        | አዎ, ሹካዎችን ጨምሮ |

#### የተረሱ ወንድም እህት ፈተናዎች ሪፖርት ያደርጋሉ

`npm run check:forgotten-sibling-tests` እንደ `Fast Quality Gates` የአማካሪ ደረጃ ይሰራል እና የማስመጣት ፈላጊውን ከሙከራ-ተጽእኖ ካርታው ጀርባ እንደገና ይጠቀማል። ለእያንዳንዱ የተለወጠ የምርት ሞጁል፣ የእጩው ፈተና ከመጎተት-ጥያቄ ልዩነት በማይኖርበት ጊዜ ቆራጥ የሆኑ `changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ሪፖርት ያደርጋል። የ Markdown ማጠቃለያ እና JSON ውጤት ከማንኛውም ማገድ መልቀቅ በፊት እንደ `forgotten-sibling-tests` የስራ ፍሰት ቅርስ ሆኖ እንዲቆይ ተደርጓል።

በርሜል እንደገና ወደ ውጭ መላክ እና ተለዋዋጭ ወደ ሀገር ውስጥ መግባቶች የመፍትሄ ምርመራዎች ብቻ ናቸው; የማገድ ግኝትን ፈጽሞ አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ `config/quality/forgotten-sibling-allowlist.json` ውስጥ ይኖራሉ። እያንዳንዱ ግቤት የሸማቹን እና የእጩዎችን ፈተና መሰየም፣ የተለየ ምክንያት መስጠት እና GitHub ጉዳይን ማገናኘት ወይም የመሳብ ጥያቄን ማያያዝ አለበት። የተበላሹ ምዝግቦች አልተዘጉም። ልዩ ሁኔታዎች የተሰረዘ እጩ ፈተናን ወይም `.skip`/`.todo` የሚጨምር ልዩነትን ማፈን አይችሉም። ማዳከም እና ሌሎች ጭንብል መሸፈኛዎች በተናጥል በተዘጋው `check:test-masking` በር ባለቤትነት ይቆያሉ።

### ሥራ `lint`

በእያንዳንዱ PR እስከ `main` ድረስ ይሰራል። እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስክሪፕት (`npm run ...`)             | ያረጋግጣል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ማገድ                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:node-runtime`              | Node.js እትም በሚደገፈው ክልል ውስጥ ነው።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                  |
| `check:cycles`                    | በሁሉም `src/` + `open-sse/` (AST ላይ የተመሰረተ፣ tsconfig `paths` ተፈትቷል) ላይ ክብ ወደ ሀገር ውስጥ የሚያስገባ። ምንም አይነት ዑደት ባለ ቁጥር ባዶ 1 ይወጣል (ከ #15281 ጀምሮ አልተዘጋም) እና SCCs ይዘረዝራል። `check:cycles:ratchet` ( CI ምን ይሰራል) ያግዳል ቁጥሩ በአሁኑ ጊዜ በ `quality-baseline.json` — 14፣ `direction: down` ውስጥ ካለው `metrics.cycles` ጣሪያ ሲያልፍ ይወድቃል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                           | አዎ (አይጥ)                            |
| `check:boundary`                  | `open-sse → src` መጋጠሚያ፡ ልዩ የሆነ የፋይል-ወደ-ፋይል ከኤንጂን ወደ አፕሊኬሽኑ የሚገቡ (`scripts/quality/measure-boundary.mjs`; የዳርቻው ዝርዝር የv4 core/module-split ማሻሻያ የኋላ መዝገብ ነው)። ባሬ = የምክር ሪፖርት (ከ `quality:boundary` ጋር ተመሳሳይ)። `check:boundary:ratchet` (ምን CI ይሰራል, እንዲሁም `quality.yml` fast-gates ratchet loop ውስጥ) ያግዳል ጊዜ ቆጠራ `metrics.boundaryOpenSseToSrc` ጣሪያ በላይ `quality-baseline.json` — ዘር በሚለካው 771, `direction: down`; `--update` ብቻ ዝቅ ያደርገዋል; ቤዝ-ዘመድ በ PRs (`--base-ref`፣ ከታች ይመልከቱ)                                                                                                                                                                                                                           | አዎ (አይጥ)                            |
| `check:route-validation:t06`      | Zod ንድፎች በሁሉም መስመሮች ላይ ይገኛሉ (የደረጃ 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                  |
| `check:any-budget:t11`            | `@ts-expect-error // any` ቆጠራ ከበጀት አይበልጥም (ደረጃ 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                  |
| `check:provider-consistency`      | በ `providers.ts` ውስጥ ያለ እያንዳንዱ አገልግሎት አቅራቢ በ `providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እና በተቃራኒው፣ በተፈቀደ ዝርዝሩ ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                  |
| `check:model-lifecycle`           | ሦስቱ በእጅ የሚያዙ የማዞሪያ ሰንጠረዦች ከተመዘገበው የሕይወት ዑደት ቅጽበታዊ ገጽ እይታ (#11503) ጋር ይጣጣማሉ `FITNESS_TABLE` (`taskFitness.ts`) ምንም የጡረታ መታወቂያ የለውም `REGISTRY` ሊመራው አይችልም። እያንዳንዱ `BUILT_IN_ALIASES` ኢላማ በ `REGISTRY` ውስጥ አለ እና ከጡረታ-መታወቂያ ቅጽበታዊ ገጽ እይታ የለም; አሁንም በ `REGISTRY` ውስጥ ያለ እያንዳንዱ የጡረታ መታወቂያ በ `allowedRetiredInCatalog` ውስጥ ተላልፏል ወይም ተዘርዝሯል; እና ምንም `DEFAULT_DEGRADATION_MAP` ምንጭ ወይም ዒላማ በዚያ ቅጽበተ ፎቶ ላይ ጡረታ የወጣ አይመስልም። ይህ ሞዴል በአሁኑ ጊዜ በቀጥታ የላይ ዥረት አገልግሎት መሰጠቱን አያረጋግጥም። ከመስመር ውጭ — ከ `config/quality/model-lifecycle.json` ጋር ይነጻጸራል፣ በእጅ ይታደሳል `npm run quality:refresh-model-lifecycle` (አውታረ መረብ፣ ወደ CI ያልገባ)። `allowedRetiredInCatalog` የተቃጠለ አይጥ ነው፡ በክትትል ጉዳይ ብቻ ግቤት ያክሉ።                               | አዎ                                  |
| `check:fetch-targets`             | እያንዳንዱ `fetch("/api/...")` በደንበኛ-ጎን `src/` ወደ እውነተኛ `route.ts` ይፈታል።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                  |
| `check:deps`                      | ሁሉም `npm install` -able deps በ repo ውስጥ በእያንዳንዱ `package.json` ውስጥ በ `dependency-allowlist.json` ውስጥ ናቸው; አዲስ ያልተሰካ ወይም የተዘበራረቁ ጥቅሎች ምልክት የተደረገባቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                  |
| `audit:deps`                      | npm ኦዲት የሁሉም አምስቱ ገለልተኛ የመቆለፊያ ፋይሎች (ሥር፣ Electron፣ OpenCode ተሰኪዎች v1/v2 እና አቅራቢ)። ወሳኝ ምክሮች አግድ; ከፍተኛ ምክሮች አሁንም የሚታዩ ማስጠንቀቂያዎች ናቸው። Missing/failed ኦዲቶች INCOMPLETE እና እገዳ ናቸው; በየቦታው የተቆለፉ hashes እና ሪፖርቶች ተጠብቀዋል።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                  |
| `check:lockfile`                  | `package-lock.json` ሙሉነት — https መዝገብ ቤት፣ የታማኝነት ሃሾች፣ ምንም አስተናጋጅ የሚሻር የለም።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                  |
| `check:licenses`                  | SPDX ፈቃድ ዝርዝር ለምርት ጥገኞች                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                  |
| `check:tracked-artifacts`         | ምንም የግንባታ ቅርሶች/የተፈጸሙ `node_modules` ሲምሊንኮች (እንዲሁም በ husky pre-commit ውስጥ ይሰራል፤ ቅድመ-ግፋ ሆን ተብሎ ቀላል — #6716 ነው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                  |
| `check:ai-attribution`            | ምንም AI/bot `Co-Authored-By` የፊልም ማስታወቂያ ወይም AI-ትውልድ ግርጌ በ PR አላደረገም፣ ርዕስ ወይም አካል — Hard Rule #16 (በ `quality.yml` fast-gates loop ለ PR→ `release/**` — የክስተት ክፍያን ያነብባል፣ ምንም-op off PRs — እና የ PR-ብቻ `main` `ci.yml` lint ለ PR→; እንዲሁም የተፈቀደለት የሰው `commit-msg` ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | እያንዳንዱ Vitest ማግለል የመከታተያ ችግርን ይሰይማል እና በ `config/quality/vitest-exclusions.json` (#13204) ውስጥ ይታያል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                  |
| `check:file-size`                 | የምንጭ ፋይሎች (`.ts`/`.tsx` በ `src/`፣ `open-sse/`፣ `electron/`፣ `bin/`) በ `cap` ውስጥ ይቆዩ እና ፋይሎችን (`*.test.ts(x)`) በ `testCap` ውስጥ ይቆዩ; በ `file-size-baseline.json` (`frozen` / `testFrozen`) የታሰሩ ፋይሎች ከተመዘገበው መጠን ማለፍ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                  |
| `check:error-helper`              | በ executors/handlers ውስጥ የተሳሳቱ ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()` (የጠንካራ ህግ #12) ይጠቀሙ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                  |
| `check:migration-numbering`       | የስደት SQL ፋይሎች በቅደም ተከተል የተቆጠሩ ናቸው፣ ምንም ክፍተቶች ወይም ብዜቶች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                  |
| `check:public-creds`              | `publicCreds.ts` ውጪ ምንም ቀጥተኛ OAuth `client_id`/`client_secret` ወይም Firebase የድር ቁልፎች የሉም (ከባድ ህግ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                  |
| `check:db-rules`                  | ከ `src/lib/db/` ሞጁሎች ውጭ ምንም ጥሬ SQL የለም; በርሜል-ከ `localDb.ts` አይመጣም (ከባድ ህጎች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                  |
| `check:known-symbols`             | አቅራቢዎች፣ የማዞሪያ ስልቶች እና ተርጓሚዎች በመላክ ሰንጠረዦቻቸው ውስጥ የተመዘገቡት በዲስክ — ላይ ካሉ ፋይሎች ጋር ይዛመዳሉ ምንም ወላጅ አልባ ወይም ያልታወቁ ምልክቶች                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                  |
| `check:route-guard-membership`    | የሕፃን ሂደትን የሚፈጥር እያንዳንዱ መንገድ በ `isLocalOnlyPath()` (Hard Rules #15/#17) ይከፋፈላል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                  |
| `check:test-discovery`            | በሪፖው ውስጥ ያለው እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ ፈታኝ ሯጭ ይሰበሰባል (የሙት ልጅ በ `test-discovery-baseline.json` ውስጥ ያለ የሙት ልጅ ዝርዝር ሊቀንስ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                  |
| `check:test-tla-order`            | በ `tests/unit` ስር ምንም `node:test` ፋይል የለም ፈተናን መዝግቧል፣ ከፍተኛ ደረጃ `await` ላይ ደርሷል፣ ከዚያም የበለጠ ይመዘግባል (#18045; ratchet: `test-tla-order-allowlist.json` የሚቀንስ ብቻ ነው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | አዎ                                  |
| `check:agent-skills-sync`         | የመነጩ ወኪል-ክህሎት ቅርሶች ከምንጭ ካታሎግ ጋር ይዛመዳሉ (መንሸራተት የለም)። የመልቀቂያ ሁነታ እያንዳንዱን ችሎታ ይፈትሻል; አንድ ባህሪ PR (`pr` ሁነታ) የመነጨውን ጽሑፍ የሚያስተካክለውን ችሎታ ብቻ ይፈትሻል — [የተፈጠሩ ፋይሎችን እና የመነሻ መስመሮችን](#generated-files-and-derived-baselines-written-at-release) ይመልከቱ                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | አቅራቢ logos/assets የተቀዳ የፕሮቨንስ ግቤት ይይዛል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON ማዋቀር ፋይሎችን ይተነትኑ እና repo lint ደንቦችን ያረካሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | TypeScript ስብስብ ያለ ስህተቶች (የአማካሪ ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                  |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደ ፊት መመልከት; ብዙ ቀደም ብለው የነበሩ የጥሪ ጣቢያዎች አሁንም ማብራሪያ ያስፈልጋቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **ምክር** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` እስከ `src/app/(dashboard)/**` (#7033) — `typecheck:core` የተመረጠ ባለ 27-ፋይል የፈቃድ ዝርዝር የትኛውንም ዳሽቦርድ TSX አያካትትም እና `next build` በጭራሽ አይተይበውም (`next.config.mjs` ያስቀምጣል `ignoreBuildErrors: true`)፣ ስለዚህ እዚያ ያሉ ወላጅ አልባ መለያ ለውጦች (#6625/#6909) ለ CI የማይታዩ ነበሩ። ከቀዘቀዘ per-file/per-TS-code ቆጠራ መነሻ መስመር (`config/quality/dashboard-typecheck-baseline.json`፣ ተመሳሳይ የቆየ የማስፈጸሚያ ጥለት ከ `check:known-symbols`) ጋር ይለያያል — ከመነሻው ቆጠራ ያለፈ NEW ስህተቶች በሩ ወድቋል። ቀደም ሲል የነበረ ስህተት ሲስተካከል በ `--update` ውረድ።                                                                                                                                                                                                             | አዎ                                  |
| `check:build-typecheck`           | የሙሉ መተግበሪያ የማምረቻ አይነት በ `tsconfig.build.json` (`src`፣ `open-sse`፣ `packages`፣ `bin`፣ `scripts`፣ `electron/**/*.d.ts`)፣ የገጽታ `typecheck:core` 27-ፋይል ፍቃድ ዝርዝር እና የዳሽቦርድ በር አይሸፍኑም። በ `config/quality/build-typecheck-baseline.json` ላይ ልዩነቶች; አዲስ ወይም ከፍ ያለ በ (ፋይል ፣ ኮድ) ቆጠራ አልተሳካም ፣ ዝቅተኛ ቆጠራ እንድትረዱ ይጠይቅዎታል። `--update` ካልተላለፈ በስተቀር ሩጫው አዲስ ወይም ከፍ ያለ ጥንድ `--force-regressions` እና `--force-nocheck` ካልተላለፈ በቀር አዲስ ጸጥ ያለ ፋይልን እምቢ ይላል፣ ስለዚህ አረንጓዴ ለማግኘት መሰረቱን ማስፋት እና ቋሚ ጸጥታ መስጠት ሁለት የተለያዩ የታሰቡ ድርጊቶች ናቸው። ባዶ `--force` ውድቅ ተደርጓል። እንዲሁም የ `@ts-nocheck` የግንባታ ወሰንን ከ `config/quality/ts-nocheck-baseline.json` ጋር ይቃኛል፣ ምክንያቱም እሱን የሚጠቀም ፋይል ምንም አይነት የምርመራ ውጤት እንደሌለ እና አለበለዚያ ለእያንዳንዱ በር የማይታይ ስለሆነ። | አዎ                                  |

#### ሁለት የታይፕ ቼክ ፕሮግራሞች በተለያየ መንገድ ምላሽ ይሰጣሉ

`typecheck:core` እና `check:build-typecheck` በተለያዩ አማራጮች ስር የተለያዩ ፕሮግራሞችን ያጠናቅራሉ, እና አንድ አይነት ፋይል በአንዱ ንጹህ እና በሌላኛው ስህተቶች የተሞላ ሊሆን ይችላል.

`tsconfig.build.json` `"strict": false` ያዘጋጃል፣ ስለዚህ `noImplicitAny` ጠፍቷል። የኮር ማዋቀሪያው የተመረጠ ባለ 27-ፋይል የፈቃድ ዝርዝር ከጠንካራ አማራጮች ጋር ያጠናቅራል እና የእያንዳንዱን የማስመጣት ግራፍ ይከተላል፣ ስለዚህ በግንባታ ፕሮግራሙ ውስጥ የማይታዩ ፋይሎች አሁንም እዚያ ይመለከታሉ።

ፋይል መተየቡን ወይም አለመተየቡን ሲወስኑ ውጤቱ አስፈላጊ ነው፡-** በ `check:build-typecheck` ስር ዜሮ ምርመራ ዜሮ ማለት አይደለም።** . `@ts-nocheck` ከ 26 ፋይሎች ማውጣት 23 ቱ በግንባታ ፕሮግራሙ ውስጥ ንጹህ መሆናቸውን አሳይቷል ። ከእነዚህ ውስጥ አስራ ስድስቱ ወደ 120 የሚጠጉ በተዘዋዋሪ የተከሰቱ ናቸው - ማንኛውም በጥብቅ ስህተት ውስጥ። ንጹህ ፋይል ከመጥራትዎ በፊት ሁለቱንም ያረጋግጡ።

### ሥራ `quality-gate`

ከ `test-coverage` በኋላ ይሮጣል. እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስክሪፕት                        | ያረጋግጣል                                                                                                                                           | ማገድ                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `quality:collect`            | Emits `quality-metrics.json` (ESLint የማስጠንቀቂያ ብዛት፣ ከተዋሃደ የሻርድ ዘገባ ሽፋን)                                                                           | አዎ (የላይኛው የአይጥ ጅረት) |
| `quality:ratchet`            | በ `quality-baseline.json` ውስጥ ያለው እያንዳንዱ ልኬት ወደ ኋላ አልተመለሰም (ESLint ማስጠንቀቂያዎች ≤ መነሻ፣ ሽፋን ≥ መነሻ)                                                   | አዎ                  |
| `check:duplication`          | የኮድ ማባዛት (jscpd@4) በ `quality-baseline.json` ውስጥ ከመሠረታዊ መስመር አይበልጥም።                                                                             | አዎ                  |
| `check:complexity`           | የፋይል ደረጃ ሳይክሎማቲክ ውስብስብነት ከካፒታው አይበልጥም (ኮር ESLint `complexity` + `max-lines-per-function`)                                                        | አዎ                  |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ራትቼት (`eslint-plugin-sonarjs`) — የተለየ ESLint ማለፊያ; CI ሁለቱንም እንደ ነጠላ `check:complexity-ratchets` እርምጃ ያካሂዳል                         | አዎ                  |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ ወደ ውጭ የሚላኩ / የፋይል ንክኪ (ኪኒፕ) ከመነሻ መስመር ጋር አይመለሱም።                                                                                     | አዎ                  |
| `check:compression-budget`   | የመጨመቂያ ቤንችማርክ በጀት — በእያንዳንዱ ሞተር ቶከን - ቁጠባ ወለሎች ወደ ኋላ መመለስ የለባቸውም                                                                                 | አዎ                  |
| `check:type-coverage`        | በመቶኛ የተተየበው ራትቼት (`type-coverage`) ወደ ኋላ አይመለስም; በአብዛኛው `typecheck:noimplicit:core` ን ይሸፍናል                                                      | አዎ                  |
| `check:codeql-ratchet`       | ክፈት CodeQL ማንቂያ ቆጠራ ወደ ኋላ አይመለስም (በ `gh api` በኩል ይነበባል፤ ያለ ማስመሰያ ዝለል) — አድስ ቃና እና በእጅ ቀስቅሴ፡ ከታች ያለውን "CodeQL ratchet" ይመልከቱ።                     | አዎ                  |
| `check:type-scale-ratchet`   | የኪት አይነት ልኬት፡ ከ12 ፒክስል በታች የሆኑ መጠኖች እና `font-bold` በ `src/` ብቻ ይወርዳሉ (`typeScaleSubFloorSizes`፣ `typeScaleFontBold`); እንዲሁም በቅድመ-ቁርጠኝነት መንጠቆ ውስጥ | አዎ                  |

### ሥራ `quality-extended`

የተቀላቀለ ሥራ፣ ያለ ምንም የሥራ ደረጃ `continue-on-error`: `--ratchet` የሚያልፍ እርምጃ በተለካ ሪግሬሽን vs `quality-baseline.json` ላይ ሥራውን ወድቋል። `check:circular-deps` እና ስካነር የመጫኛ ደረጃ ብቻ አማካሪ ናቸው (የደረጃ-ደረጃ `continue-on-error: true`)። ውጫዊው ስካነሮች በ `gh release download` በኩል ይጫናሉ; `check:secrets` ራስን መዝለል (መውጫ 0) gitleaks በማይኖርበት ጊዜ፣ `check:vuln-ratchet`፣ `check:workflows` እና `check:openapi-breaking` ልኬታቸው ሲጠፋ ይዘጋሉ።

| ስክሪፕት                    | ያረጋግጣል                                                                                                                                                                     | ማገድ                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:circular-deps`    | ምንም ክብ ጥገኞች (ዲፒዲኤም)                                                                                                                                                        | **ምክር**                                    |
| `check:bundle-size`      | የጥቅል መጠን ከካፒታው አይበልጥም; ሊለካ የማይችል መጠንም አይሳካም።                                                                                                                               | **በ --ratchet ማገድ**                        |
| `check:secrets`          | ሚስጥራዊ ቅኝት (gitleaks) — ሁለትዮሽ ከሌለ ይዘላል                                                                                                                                      | **በ --ratchet ማገድ**                        |
| `check:vuln-ratchet`     | የጥገኛ ተጋላጭነቶች (osv-scanner) ወደ ኋላ አይመለሱም — `--ratchet` እንደ INCOMPLETE (መውጫ 2) ካልተመዘነ አይሳካም                                                                                  | **በ --ratchet ማገድ**                        |
| `check:workflows`        | የስራ ፍሰት lint (አክሽንሊንት + zizmor); missing/broken ስካነሮች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደሉ ratchet መነሻ መስመር እንደ INCOMPLETE አልተሳኩም። ትክክለኛ ግኝቶች የተመረጠውን strict/advisory/ratchet ፖሊሲ ይከተላሉ | ማስፈጸሚያ ያስፈልጋል; zizmor ratchet በ CI ውስጥ ማገድ |
| `check:openapi-breaking` | በተሰካ ክስተት ላይ የህዝብ API ውል (PR ውህደት-መሰረታዊ፣ የግፋ በፊት፣ የቡድን መሰረት፣ scheduled/manual ማረጋገጫ የመጀመሪያ ወላጅ) የሚፈለገው መለኪያ አልተዘጋም።                                                        | **በ --ratchet ማገድ**                        |

### ሥራ `docs-sync-strict`

በእያንዳንዱ PR እስከ `main` ድረስ ይሰራል። እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስክሪፕት                          | ያረጋግጣል                                                                                                                         | ማገድ                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `check:docs-all`               | ከታች ያሉትን 6 ንዑስ በሮች በቅደም ተከተል የሚያስኬድ ሜታ-ጌት                                                                                      | አዎ                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI ስሪት ወጥነት; የመልቀቂያ ሁነታ እንዲሁም 66 `llm.txt` መስተዋቶች እና የተተረጎሙ CHANGELOG ክፍሎች (PR ሁነታ: መስተዋቶች ይስማማሉ)             | አዎ                         |
| ↳ `check:docs-counts`          | በፕሮሴ (የአቅራቢዎች ብዛት፣ የፍልሰት ብዛት፣ ወዘተ) ይቆጠራል። ሁለት ሁነታዎች፡- `pr` በባህሪ PRs፣ `release` ሌላ ቦታ — ከታች "የተገኙ እሴቶች" ይመልከቱ                   | አዎ                         |
| ↳ `check:env-doc-sync`         | በ `.env.example` ውስጥ ያለው እያንዳንዱ env var በዶክመንቶች ሠንጠረዥ ውስጥ ተመዝግቧል እና በተቃራኒው                                                     | አዎ                         |
| ↳ `check:deprecated-versions`  | በሰነዶች ውስጥ ምንም ያልተቋረጠ የስሪት ሕብረቁምፊዎች የሉም                                                                                         | አዎ                         |
| ↳ `check:doc-links`            | የውስጥ ምልክት ማድረጊያ አገናኞች በሰነዶች ውስጥ ወደ እውነተኛ ፋይሎች (`[text]`/`(path)` ቅጽ) ይፈታሉ                                                      | አዎ                         |
| ↳ `check:fabricated-docs`      | መንገዶች፣ env vars፣ CLI ትዕዛዞች፣ መንጠቆ ስሞች እና በሰነዶች ውስጥ የተጠቀሱ የፋይል መንገዶች በኮድ ቤዝ ውስጥ አሉ። በ `--strict` በኩል ጠንካራ በር; ያለ ባንዲራ ለስላሳ-ውድቀት። | አዎ (በ `--strict` በ CI በኩል) |
| `check:cli-i18n`               | CLI `t()` ቁልፎች በ `bin/cli/locales/en.json` ውስጥ ይገኛሉ (ሁለቱም ሁነታዎች); pt-BR/zh-CN/zh-TW ከ `en.json` ጋር በመልቀቂያ ሁነታ ብቻ               | አዎ                         |
| `check:openapi-coverage`       | OpenAPI spec ቢያንስ የእውነተኛ መስመሮችን ወለል ይሸፍናል።                                                                                     | አዎ                         |
| `check:openapi-security-tiers` | በ `openapi.yaml` ውስጥ ያሉ የደህንነት ደረጃ ማብራሪያዎች ከ `routeGuard.ts` ምደባዎች ጋር የሚጣጣሙ ናቸው።                                               | **ምክር**                    |
| `check:openapi-routes`         | በ `openapi.yaml` ውስጥ ያለው እያንዳንዱ መንገድ ወደ እውነተኛ `route.ts` (ፀረ-ቅዠት) ያበቃል።                                                        | አዎ                         |
| `check:docs-symbols`           | በ `docs/**/*.md` ውስጥ ያለው እያንዳንዱ `/api/...` ማጣቀሻ ወደ እውነተኛ `route.ts` (ፀረ-ቅዠት) ይፈታል                                              | አዎ                         |
| `i18n translation drift`       | `docs/i18n/**` mirrors vs `.i18n-state.json` — ምክር PRs (መስታወቶች በትርጉም ማዕበል ይታደሳሉ)፣ በግፋ እና በምሽት ላይ ጥብቅ                           | **ምክር** PRs ላይ             |

#### የትርጉም መስተዋቶች የተገኙ ፋይሎች ናቸው (PR mode vs release mode)

አንድ ባህሪ PR የሚያስተካክለው የእንግሊዝኛ ምንጮችን ብቻ ነው። የ `docs/i18n/<locale>/**` መስተዋቶች (66 `llm.txt` ቅጂዎችን እና የተተረጎሙትን `CHANGELOG.md` ፋይሎችን ጨምሮ) እና `.i18n-state.json` በአንድ እርምጃ በትርጉም ማዕበል (`docs/i18n-*` / `chore/i18n-*` ቅርንጫፎች፣ በታቀደው `i18n-mirror-refresh.yml`) እና በመለቀቅ (`npm run release:sync-changelog-i18n`) እንደገና ተጽፈዋል። ስለዚህ የመስተዋቱ በሮች በሁለት ሁነታዎች ይሰራሉ፣ በ `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`፣ ከዚያ `OMNIROUTE_GATE_MODE`፣ ከዚያም የተግባር ክስተት፣ የአካባቢ ሩጫ `release` ነው)፡-

- `check:docs-sync` — የመልቀቂያ ሁነታ እያንዳንዱን ቼክ ይሰራል። PR ሁነታ የ package.json/OpenAPI ሥሪቱን፣ የሥሩ CHANGELOG ርእሶችን እና የሰነዶች ጥበቃን ያቆያል፣ እና `SKIP reason=pr-mode` ለ `llm.txt` መስታወት ቅጂዎች እና የተተረጎሙትን CHANGELOG ክፍሎችን — ያትማል PR መስተዋት ካልፃፈ በቀር `docs/i18n/**` ቤተሰብ ፀሐፊ ተብሎ የሚታወጀው ዋና ቅርንጫፍ ሁለቱን ቼኮች አጥብቆ የሚሠራ ወይም የሚፈታ `docs/i18n/<locale>/llm.txt` ሲለውጥ እና `CHANGELOG.md` `config/quality/derived-paths/*.json` ቼክ በጥብቅ ያካሂዳል. የዲፍ መሰረቱ በ depth-1 ቼክአውት (የ `docs-sync-strict` ስራ) አይፈታም ፣ስለዚህ PR ሁነታ ምንም መሰረት የማይፈልገውን አንድ ቼክ ይሰራል፡እያንዳንዱ `llm.txt` መስታወት መኖር አለበት፣ `---` መለያየቱን ያቆይ እና ስርወ አካሉን ወይም አብዛኛዎቹ መስተዋቶች የሚጋሩትን አካል ይሸከማሉ። የተንቀሳቀሰ መሠረት ሁሉንም መስተዋቶች እኩል ያረጀ እና ያልፋል; በአንድ መስታወት ላይ የተደረገ የእጅ ማረም አልተሳካም። የተተረጎሙት `CHANGELOG.md` ፋይሎች በ depth-1 PR ፍተሻ ውስጥ እንደዚህ ያለ ቼክ የላቸውም።
- ቅድመ ቁርጠኝነት መንጠቆ `check-docs-sync.mjs --mode=pr` ያካሂዳል፡ ቁርጠኝነት የሚፈረደው በሚሰራው ላይ ነው። ያለ ባንዲራ የአካባቢ ሩጫ የመልቀቂያ ሁነታ ነው፣ እና አንድ የተዋሃደ PR ስርወ `llm.txt` የሚያስተካክል ማዕበሉ እስኪሮጥ ድረስ እያንዳንዱን ጊዜ በዚያ መሰረት ይከለክላል። ተመሳሳዩ ህግ ለማንኛውም ሞድ የሚያውቅ በር የ Husky መንጠቆ ይሠራል፡ መንጠቆው `--mode=pr` ያልፋል፣ እና ጥብቅ ፍርዱ የሚለቀቀው ሁነታ በሚሰራበት ጊዜ ይቆያል (የሚለቀቀው PR፣ ወደ `main` ይገፋፋል፣ ግልጽ የሆነ የአካባቢ ሩጫ)።
- የመስታወት-ይዘት አሃድ ሙከራዎች (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — የመልቀቅ ሁነታ እያንዳንዱን አካባቢ ያረጋግጣል. PR ሁነታ በ `.i18n-state.json` (በሙሉ-ፋይል ሃሽ ወይም በክፍል የተቀዳው የፍተሻ ፒን) በእንግሊዝኛው ምንጭ አሁን ያሉትን መስተዋቶች ብቻ ያስረግጣል እና የቆዩትን በምክንያት ይዘላል። የ `target_hash` provenance ፍተሻዎች በሁለቱም ሁነታዎች ለእያንዳንዱ አካባቢ ይሰራሉ። ትኩስነት በ `## ` ክፍል ነው፣ አሃዱ `run-translation.mjs` hashes; ረጅም ክፍል (የዚህ ፋይል የበር ክምችት ግማሹን ያህላል) ማለት በውስጡ ያለው ማንኛውም አርትዖት እነዚያን መስታወቶች ያረጁ እና የPR-mode ማረጋገጫዎቻቸው እስከሚቀጥለው ሞገድ ድረስ ይዘላሉ። የእንግሊዘኛ ምንጭ የሌለው መልህቅ ወደ ሙሉ ፋይል ንጽጽር ይመለሳል።
- `i18n translation drift` — ምክር በ PRs ላይ፣ በመግፋቱ ላይ ጥብቅ፣ በምሽት እና የመልቀቂያው መቆረጥ፣ ስለዚህ የቆየ መስታወት በተለቀቀበት ጊዜ መላክ አይችልም።

`scripts/i18n/sync-llm-mirrors.mjs` (እንዲሁም እንደ `syncLlmMirrors()` ወደ ውጭ ይላካል, ከ `--dry-run` ጋር) የ `llm.txt` መስተዋቶችን እንደገና ይጽፋል; የመልቀቂያው አድስ፣ የትርጉም ሞገድ እና የታቀደው `i18n-mirror-refresh.yml` ያካሂዱት (ማደሱ የቆዩ `llm.txt` መስተዋቶችን በደረቅ ሩጫ ይገነዘባል፣ ተንሳፋፊ ሪፖርቱ ስለማይዘረዝራቸው እና ከ `check:docs-all` በፊት ያመሳስላቸዋል)።

በ `docs/diagrams/` ስር ያሉት አስራ ሁለቱ README SVGs ይፈጠራሉ (`scripts/docs/gen-readme-<name>.mjs`፣ `npm run docs:readme-diagrams` ሁሉንም ያድሳል)። እያንዳንዱ የባይት-ንጽጽር አሃድ ሙከራ (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ያለው የተፈፀመው ፋይል በመልቀቂያ ሁነታ ላይ ሲያልቅ የማይሳካው; በ PR፣ `check:generated-artifacts` አንድ SVG PR አርትዖቶችን ይፈርዳል እና የመሠረቱ ተንሸራታች ለመልቀቂያው እድሳት ይቀራል ( [የተፈጠሩ ፋይሎችን እና የመነሻ መስመሮችን](#generated-files-and-derived-baselines-written-at-release) ይመልከቱ) — እና `check:docs-counts` ቀኖናዊ ቁጥሮችን ከ `<text>` nodes — ያነባሉ ለዚህም ነው የዝርዝር ሂደቱ በፋይሉ ውስጥ ያሉትን እያንዳንዱን ሕብረቁምፊዎች በማይታይ `<text>` ያቆየዋል። የ SVG ቀኖናዊ-ቁጥሮች ቼክ በ `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) የተዘረዘሩትን ፋይሎች ያነባል `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` እና `tier-flow-light.svg` የነጻ-ዘላለም፣ ካታሎግ-ግቤት፣ ተደጋጋሚ ገንዳ እና የውጤት መንስኤዎች የይገባኛል ጥያቄዎች በተጨማሪ `promise-pillars.svg`, `free-tier-budget.svg` እና `strategies-grid.svg` ያንብቡ። እነዚህ ጄነሬተሮች የሚሳሉት ቆጠራዎች (የአቅራቢው ጠቅላላ፣ MCP መሣሪያዎች፣ የማዞሪያ ስልቶች፣ ለዘለዓለም ነጻ የሆኑ አቅራቢዎች፣ …) ከእውነታዎች ቅጽበታዊ ገጽ እይታ `docs/reference/derived-facts.json` እስከ `scripts/docs/readmeFacts.mjs` በኩል የሚመጡት እንጂ ከጥሬ ቃላት አይደሉም፣ ስለዚህ በማንኛውም ቅርንጫፍ ላይ ዲያግራምን እንደገና ማመንጨት የገባውን ፋይል እንደገና ያባዛል። `free-tier-budget.svg` ረድፎቹን ከተመሳሳዩ ቅጽበታዊ ገጽ እይታ ይሳሉ (`code.freeTierBudget`፣ ካታሎግ ማጠቃለያው የእውነታ መመርመሪያ መዝገቦች)፣ ስለዚህ `FREE_MODEL_BUDGETS` ወደ CI ቀይ ከመቀየር ይልቅ በሚቀጥለው ማደስ ካርዱ ላይ ይደርሳል።

### የተገኙ እሴቶች፡ የ `pr` እና `release` በር ሁነታዎች

PR ባህሪ እንደ መነሻው ሁኔታ የሚወሰን እሴትን በጭራሽ አይጽፍም፡ አቅራቢ፣ ፍልሰት፣ MCP-መሳሪያ እና የስትራቴጂ ቆጠራዎች፣ የ README SVG ቁጥሮች፣ የእውነታዎች ቅጽበታዊ ገጽ እይታ። አንድ እርምጃ ሁሉንም ያሰላል፣ `npm run release:refresh-derived`፣ በተለቀቀው እና በምሽት በመነጨ-እድሳት PR የሚተዳደር። ስለዚህ** በተለቀቁት መካከል መሠረቱ ከቀጥታ ኮድ በንድፍ በስተጀርባ ነው።** , እና ዛፉን ከቀጥታ ኮድ ጋር የሚያወዳድረው በር ወይም ፈተና በእያንዳንዱ PR ላይ አንድ ወንድም ወይም እህት አቅራቢ ካከሉ በኋላ ቀይ ይሆናል። የተገኙትን እሴቶች የሚዳኙት በሮች ከሁለቱ ሁነታዎች በአንዱ ይሰራሉ በ `scripts/check/lib/gateMode.mjs` (የመጀመሪያ ግጥሚያ አሸነፈ)

1. `--mode=pr|release` በትእዛዝ መስመር ላይ;
2. የ `OMNIROUTE_GATE_MODE` አካባቢ ተለዋዋጭ (`pr` ወይም `release`);
3. አውቶማቲክ, ከ GitHub ድርጊቶች ክስተት: ጭንቅላቱ `release/v*`, `merge_group`, ወይም ወደ `omni-queue/**` → `pr` የማይገፋ `pull_request` ; ሌላ ሁሉ (ግፋ፣ መርሐግብር፣ መላክ፣ መልቀቂያ PR `release/v* → main`፣ ማንኛውም የአካባቢ ሩጫ) → `release`.

በእያንዳንዱ ሁነታ ምን `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) አልተሳካም፦

| ሁነታ       | አልተሳካም።                                                                                                                                                                                                                                                                              | የቀጥታ እውነታዎችን ይፈልጋል |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `release` | እያንዳንዱ ቼክ፣ ከዛፉ ላይ ከተሰበሰቡት እውነታዎች ጋር ጥብቅ እኩልነት (የበሩ ሁል ጊዜ የነበረው ባህሪ)፡ የቆየ ቆጠራ፣ ስሪት፣ የሽፋን ወለል ወይም SVG ቁጥር የ STRICT ተንሸራታች ነው።                                                                                                                                                          | አዎ                 |
| `pr`      | ለውጡ ያደረገው ብቻ፣ PR መሠረት ከተመሳሳዩ የይገባኛል ጥያቄ አውጪዎች ጋር የሚለያይ፡ (1) ለዚያ ቼክ እና ፋይል መሠረት ላይ ያልነበረ የሚተዳደር እሴት ("PR የሚተዳደር ቁጥርን አስተካክሏል — መስመሩን ወደ መሠረቱ ጽሑፍ ይመልሳል"); (፪) አስፈላጊው የይገባኛል ጥያቄ መሠረቱ ተሸክሞ ጭንቅላቱ ጠፋ። ምንም እውነታ የማያስፈልጋቸው የይዘት ተለዋዋጮች እንደ ልቀት ሁነታ ይሰራሉ። የመልቀቂያ-ብቻ ቼኮች ተዘርዝረዋል እና ተዘልለዋል። | አይ                 |

ወኪሉ-መመሪያው ፋይሎች ተሸክመዋል** አይ** የተገኘው ቆጠራ፡- `AGENTS.md`፣ `llm.txt` (እና `docs/i18n/*/llm.txt` ቅጂዎቹ)፣ BS `AGENTS.md` ሹካ፣ `open-sse/services/AGENTS.md`፣ `src/shared/constants/agentSkills.ts`፣ `skills/README.md` እና እያንዳንዱ `skills/*/SKILL.md` ወደ ምንጩ ያመለክታሉ (ለምሳሌ `ROUTING_STRATEGY_VALUES` በ `src/shared/constants/routingStrategies.ts`) እና በምትኩ `npm run facts` ። የማይለዋወጥ "ምንም የተገኘ ቆጠራዎች (የወኪል-መመሪያ ፋይል ...)" እዛ ቆጠራ አልተሳካም (አቅራቢዎች፣ ፍልሰቶች፣ MCP መሳሪያዎች እና ወሰኖች፣ የማዞሪያ ስልቶች፣ የውጤት ማስመዝገቢያ ሁኔታዎች፣ ሁነታ ጥቅሎች)፣ ስለዚህ የመልቀቂያ እድሳት በጭራሽ የማስተማሪያ ፋይል መፃፍ የለበትም።

በ `pr` ሁነታ የጸሐፊው ቅርንጫፎች የሚተዳደሩ እሴቶችን ሊያርትዑ ይችላሉ `chore/derived-*` (በሌሊት የሚታደሰው PR)፣ `release/v*` እና የትርጉም ሞገዶች `docs/i18n-*` እና `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`)። ወረፋ ባች (`merge_group`፣ Mergify ረቂቆች፣ `omni-queue/**`) እንደገና አይፈረድባቸውም PRs አንድ በአንድ የተፈረደበትን ደጃፍ ያጠቃልላሉ።

የመውጫ ኮዶች `0` ንፁህ · `1` STRICT ተንሸራታች (ወይም ለስላሳ መንሸራተት በ `--strict`) ወይም የሚተዳደር እሴት ጥሰት · `2` መሠረተ ልማት — የኮድ እውነታዎች ሊሰበሰቡ አልቻሉም (የ tsx ምርመራው አልተሳካም ወይም ጊዜው አልፎበታል፤ ጊዜው ያለፈበት `OMNIROUTE_FACTS_TIMEOUT_MS` ነው፣ ነባሪ 600000 ms) ወይም፣ በ CI ውስጥ፣ መሠረቱ PR ሊፈታ አልቻለም። 2 መውጣት በጭራሽ የሰነድ ልዩነት አይደለም፡ ስራውን እንደገና ያስኬዱ ወይም አካባቢውን ያስተካክሉ።

እያንዳንዱ ሁነታ የሚሰራበት:

| የት                                                                                | ሁነታ                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ባህሪ PR — `ci.yml` ሥራ `docs-sync-strict`, `quality.yml` ደረጃ "የሰነዶች ትክክለኛነት"        | `pr` (ራስ-ሰር); ስራው መሰረቱን እንደ `BASE_SHA` ያልፋል እና በ `fetch-depth: 2` ይፈትሻል                                                                                                  |
| `merge_group`, `omni-queue/**` እጩዎች፣ የውህደት ባቡር ሙሉ በር ዝርዝር                         | `pr`                                                                                                                                                                     |
| ልቀቅ PR (`release/v* → main`)፣ መግፋት፣ መርሐግብር የተያዘለት እና በእጅ የሚሰራ                     | `release`                                                                                                                                                                |
| መልቀቅ-አረንጓዴ (`scripts/quality/validate-release-green.mjs`)                         | HARD እቃዎች በ `OMNIROUTE_GATE_MODE=pr` ("መሰረቱ ተበላሽቷል?"); የ DRIFT ንጥል ነገር `derived-refresh` `npm run release:refresh-derived -- --check` ይሰራል (ጥብቅ እይታ፣መሠረተ-ቀይ በጭራሽ አይከፍትም) |
| መልቀቅ (`/generate-release` ደረጃዎች 0a እና 1፣ የክህሎት ሽቦው የተለየ በባለቤት የጸደቀ ለውጥ ነው)        | `npm run release:refresh-derived` የተገኙትን ፋይሎች ይጽፋል; የሚለቀቀው PR የራሱ ቼኮች ከዚያ በ `release` ሁነታ ያሂዱ                                                                            |
| `nightly-derived-refresh.yml` (በየቀኑ፣ ከፍተኛ `release/vX.Y.Z`፣ በመለቀቅ-በቀዝቃዛ ስር የተዘለለ) | `npm run release:refresh-derived -- --profile=nightly`; ልዩነት ላይ ONE PR ከ `chore/derived-refresh` ክፍት ያደርገዋል; መቼም አይዋሃድም።                                                 |

ከኋላው ያሉት ትዕዛዞች፡-

- `npm run facts` እያንዳንዱን የተገኘ ቁጥር እንደ JSON (`scripts/release/facts.mjs`) ያትማል። `--key=code.mcpTools` አንድ እሴት ያትማል፣ `--snapshot` ከቀጥታ ዛፍ ይልቅ የተፈጸመውን ቅጽበታዊ ገጽ እይታ ያነባል። እውነታውን መሰብሰብ በማይቻልበት ጊዜ 2 ውጣ።
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) recomputes the derived files in one pass, in this order (step ids for `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (the snapshot), `numbers` (the counts gate's rewrite plan applied to the docs, then carried to their `docs/i18n/` mirrors), `readme-diagrams`, `skills` (generated `SKILL.md`), `e2e-timings` (skipped until the tree ships `syncE2eTimings`), `ui-keys` (prunes keys `en.json` dropped and, with `--rewritten-since=<ref>` — default `origin/main` — re-queues English values rewritten since the last release), `llm-mirrors` and `verify-generated` (after a write, `check:generated-artifacts` and `check:agent-skills-sync` in release mode must pass; skipped in `--check` and when `--only` leaves it out; a failure is exit 2). The `changelog` step is opt-in (`--with-changelog`, release profile only). `--profile=nightly` never touches a version claim. With `-- --check` it writes nothing and exits 1 when any file would change or a managed value needs a manual edit (listing both); exit 2 on an infrastructure failure. `--json` prints the result as JSON.
- `docs/reference/derived-facts.json` ጥቅም ላይ የዋለው የመጨረሻው ማደስ የእውነታዎች ቅጽበታዊ ገጽ እይታ ነው። ማደስ ብቻ ነው የሚጽፈው። የ README SVG ጀነሬተሮች አንብበውታል፣ እና የPR-time ዩኒት ሙከራዎች የተፈጸሙትን ሰነዶች እና የመነጩ ፋይሎች ከእሱ ጋር — በጭራሽ ከቀጥታ ኮድ ጋር ያወዳድራሉ። የስብስቡ ነጠላ የቀጥታ ንፅፅር በ `tests/unit/check-docs-counts-sync.test.ts` ውስጥ "የልቀት መታደስ ዑደቱን ይዘጋል" ነው፡ ከቀጥታ እውነታዎች ጋር፣ የማደስ ዳግም መፃፍ እቅድ በማህደረ ትውስታ ውስጥ የተተገበረው ምንም STRICT መንቀጥቀጥ አይተወውም፣ እና እንደገና እቅድ ማውጣት ምንም አይቀይረውም።

በአካባቢው ለመራባት (አካባቢያዊ አሂድ ወደ `release` ነባሪዎች)፡-

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

ሊፈታ የሚችል መሠረት ከሌለ ( `BASE_SHA`/`BASE_REF` የለም፣ ምንም የአካባቢ `origin/release/v<version>` የለም) የአካባቢያዊ `pr` ሩጫ ማስጠንቀቂያ ያትማል እና ከመውደቁ ይልቅ ልዩነቱን ይዘላል።

### ሥራ `i18n-ui-coverage`

| ስክሪፕት                               | ያረጋግጣል                                                                                                                                            | ማገድ              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (ውስጥ መስመር) | UI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                          | አዎ (ሁለቱም ሁነታዎች)  |
| `check:ui-icu`                      | እያንዳንዱ UI ካታሎግ መልእክት በ `IntlMessageFormat` ያጠናቅራል።                                                                                                | አዎ (ሁለቱም ሁነታዎች)  |
| `check-ui-value-drift` (ውስጥ መስመር)   | እንደገና የተጻፈ እንግሊዝኛ** ዋጋ** ከኋላው የቆየ ትርጉም አይተውም።                                                                                                     | አዎ (የልቀት ሁነታ ብቻ) |
| `check-new-key-coverage` (ውስጥ መስመር) | ሀ** አዲስ** የእንግሊዘኛ ቁልፍ በየአካባቢው — ተተርጉሟል የ `__MISSING__:` ማርከር ውድቅ ተደርጓል                                                                            | አዎ (የልቀት ሁነታ ብቻ) |
| `check-key-completeness` (ውስጥ መስመር) | እያንዳንዱ UI ካታሎግ (እና፣ ከ `--catalog=cli` ጋር፣ እያንዳንዱ CLI ካታሎግ) `en.json` ቁልፍ ስብስብ በትክክል ይይዛል። በ `pr` ሁነታ፣ እያንዳንዱ ካታሎግ PR በውህደት መሰረት በራሱ ላይ ተቀይሯል።     | አዎ (ሁለቱም ሁነታዎች)  |
| `check-translation-ratio`           | ትክክለኛ የትርጉም ምጥጥን በየአካባቢው (ከእንግሊዝኛ ጋር ተመሳሳይ / ቦታ ያዥ / ከተፈቀደው ዝርዝር ውጭ የጎደሉ ቅጠሎች) `config/quality/i18n-translation-baseline.json` + slack መብለጥ የለበትም | አዎ (የልቀት ሁነታ ብቻ) |

`fetch-depth: 0` — ያስፈልገዋል የእሴት ተንሳፋፊ በር `en.json` ከውህደቱ መሰረት ይለያል።

**ሁለት ሁነታዎች (ከ2026-11-13 ጀምሮ)።** አንድ ባህሪ PR በ `en.json` (እና `bin/cli/locales/en.json`) ውስጥ ቁልፎችን ይጨምራል ወይም እንደገና ይጽፋል እና ሌላ አካባቢ አይነካም; `check:pr-derived-paths` (ስራ `pr-test-policy`፣ ቤተሰብ `config/quality/derived-paths/translation.json`) የሚያደርገውን ባህሪ PR ወድቋል። ሌሎቹ አከባቢዎች የሚጠናቀቁት በ `release:refresh-derived` አንድ ጊዜ ነው፣ እሱም `syncUiKeys()` በ `scripts/i18n/sync-ui-keys.mjs` (የጎደሉትን ቁልፎች ጨምር፣የተጣሉትን መከርከም፣ እንደገና የተፃፈ እንግሊዝኛን በ `rewrittenSinceRef`፣ መተርጎም) ወይም በትርጉም ማዕበል። በሮቹ ሁነታውን ከ `scripts/check/lib/gateMode.mjs` ያነባሉ: በ `pr` ሁነታ (ባህሪ PRs, `merge_group`, `omni-queue/**`) የመልቀቂያ ሁነታ በሮች ከ `SKIP reason=pr-mode` በላይ ያትሙ እና 0 ይውጡ; በ `release` ሁነታ (የሚለቀቀው PR፣ ወደ `main` ይገፋፋል፣ `workflow_dispatch`፣ የአካባቢ ሩጫዎች) ልክ እንደበፊቱ ጥብቅ ናቸው፣ እና በተለቀቀው PR ላይ ልዩ እውቀት ያላቸው `BASE_REF=origin/main` ያገኛሉ፣ ስለዚህ ዑደቱ የተጨመረው ወይም የሚፃፍበትን እያንዳንዱን ቁልፍ ይፈርዳሉ። የባህሪ-PR ብይን ከአካባቢው `--mode=pr` ጋር አስቀድመው ይመልከቱ።

አሁንም የአካባቢ ካታሎጎችን በ `pr` ሁነታ የሚቀይር PR (የትርጉም ሞገድ፣ የተለቀቀው እድሳት፣ የትርጉም-ብቻ ማስተካከያ) አልተዘለለም `check-key-completeness` እያንዳንዱን ካታሎግ የለወጠው በተመሳሳይ ካታሎግ በውህደቱ መሰረት (`scripts/i18n/lib/touched-catalogs.mjs`) ላይ ይፈርዳል እና ካታሎጉ በጠፋ ቁልፍ ላይ አልተሳካም፣ የ `en.json` ቁልፍ ይጎድላል፣ እውነተኛ ትርጉም ወደ እንግሊዝኛ ጽሁፍ የማይለውጠው ወይም ወደ `__MISSING__:` የማይለውጠው። placeholders/tags የእንግሊዝኛ ሕብረቁምፊ PR አልነካም። በ PR ውስጥ አዲስ ካታሎግ ሙሉውን `en.json` ቁልፍ ስብስብ መያዝ አለበት። ያ ለካታሎጎች አንድ PR የሚነካውን ጥምርታ እና የCLI-ተመጣጣኝ በሮች ምን እንደሚያዩ ይሸፍናል።

የአካባቢ-ተመጣጣኝ አሃድ ሙከራዎች (`cli-i18n-catalog`፣ `i18n-pt-br`፣ `i18n-vi-completeness`፣ `i18n-placeholder-parity`) በ `tests/_helpers/localeParityMode.ts` በኩል ተመሳሳይ ሁነታዎችን ይከተላሉ፡ በ `pr` ሁነታ የቁልፍ-ተመጣጣኝ ማረጋገጫዎችን ይዝለሉ እና ለመልቀቅ ይተዋሉ ከውህደት ጀምሮ እንግሊዘኛ የተቀየረባቸውን ቁልፎች እኩልነት ያድሳሉ (የክፍል ሙከራ ስራ ጥልቀት የሌለው ቼክ ማንበብ በማይችልበት ጊዜ እያንዳንዱ ቁልፍ)። ያ ረዳት ነው።** ብቻ** ማዕቀብ ያለበት ሁኔታዊ መዝለል `check:test-masking` `.skip(` እና `{ skip: true }` ይቆጥራል ነገር ግን የተሰላ `{ skip: "<reason>" }` አይመለስም ስለዚህ `tests/unit/locale-parity-mode.test.ts` እንዲጠቀምበት የተፈቀደላቸውን የፈተናዎች ዝርዝር ፒን ያደርጋል — አንዱን ማከል በዚያ ዝርዝር ላይ የተገመገመ አርትዖት ነው።

#### `check-ui-value-drift` — የቆየ-የትርጉም በር

አንዱን i18n regression ይይዛል ሌላኛው በመዋቅራዊ መልኩ በሮች ማየት አይችሉም፡ የእንግሊዘኛ እሴት እንደገና ይፃፋል እና ከ _ቀዳሚ_ እንግሊዘኛ የተገኙት ትርጉሞች ወደ ኋላ ይቆያሉ፣ ስለዚህ እንግሊዛዊ ያልሆኑ ተጠቃሚዎች በልበ ሙሉነት-ቃል ያለው አሁን የተሳሳተ ቅጂ ያነባሉ።

ይህ በእውነቱ ተልኳል። `oauthModal.googleOAuthWarning` እንደገና የተጻፈው Antigravity መግቢያ ረዳት ሲያርፍ (#5203);** 39 ከ 43 አከባቢዎች** ለኦፕሬተሮች "ሙሉውን URL ገልብጠው ከዚህ በታች ለጥፍ" የሚል ጽሁፍ ደጋግሞ ለአገልግሎት አቅራቢው ማጠናቀቅ የማይችል — ። እስከ #8463 ድረስ ሳይስተዋል ቀርቷል ምክንያቱም፡-

- `sync-ui-keys` ያሉትን ቁልፎች ብቻ ነው የሚሞላው።** የለም** ፣ በጭራሽ ያልሆኑት።** የቆየ** ;
- `check-ui-keys-coverage` ቁልፍ _presence_ ይቆጥራል፣ ስለዚህ የቆየ ትርጉም እንደተሸፈነ ይቆጠራል።
- `check-translation-drift` የ `docs/i18n/<locale>/**.md` ሰነዶችን መስተዋቶች ይከታተላል — በጭራሽ `src/i18n/messages/*.json` አያነብም። በስራው ውስጥ ይሰራል `docs-sync-strict`: ምክር በ PRs ላይ, በመግፋት እና በምሽት ላይ ጥብቅ; የትርጉም ሞገድ መስተዋቶቹን ያድሳል, ባህሪው አይደለም PR.

**ልዩነትን የሚያውቅ፣በመነሻ መስመር የተደገፈ አይደለም።** በማዋሃድ ላይ ያለውን `en.json` ከሚሠራው ዛፍ ጋር ያወዳድራል; የእንግሊዘኛ እሴቱ ለተቀየረ ለእያንዳንዱ ቁልፍ፣ አሁንም ያልተነካ ትርጉም የያዘ ማንኛውም አካባቢ የቆየ ነው። ይህ ሆን ተብሎ** ቀድሞ የነበረውን ዕዳ ያቆማል** — a diff ከየትኛው አሮጌ እንግሊዝኛ እንደመጣ ሊገልጽ አይችልም ፣ስለዚህ በሩ የሚዳኘው የአሁኑ ለውጥ የሚነካውን ብቻ ነው። አማራጩ (በየቁልፍ ሀሽ መነሻ መስመር) ~ 600 KB የመነጨ ፋይል፣ 3 × ትልቁ ነባር መነሻ መስመር በእያንዳንዱ i18n PR ያስከፍላል።

እሱን ለማርካት ሁለት መንገዶች:

1. የተጎዱትን ትርጉሞች ማዘመን ወይም
2. የሩጫ ሰዓቱን ወደ `__MISSING__:<new english>` — አስቀምጣቸው ከዚያም የተስተካከለውን እንግሊዝኛ (`src/i18n/request.ts::deepMergeFallback`፣ #7258) እና ለትርጉም ቁልፍ ወረፋዎችን ያገለግላል።

ሕብረቁምፊው ከሆነ** ትርጉም** ተለውጧል, ይመርጣሉ** ቁልፉን እንደገና መሰየም** አዲስ ቁልፍ የቆየ ትርጉም ሊወርስ አይችልም። ያ ጥቅም ላይ የዋለው #8463 ንድፍ ነው።

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

የመሠረት ካታሎግ ሊነበብ በማይችልበት ጊዜ በ `SKIP reason=base-unresolved` 0 ይወጣል (ጥልቀት የሌለው ክሎሎን ያለ ቤዝ ሪፍ)፣ `check-openapi-breaking` በማንፀባረቅ። የመልቀቂያ ሁነታ ብቻ፡ አንድ ባህሪ PR እንግሊዘኛውን እንደገና ይጽፋል እና እዚያ ይቆማል; የተለቀቀው እድሳት የተዋቸውን ትርጉሞች ምልክት ያደርጋል (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`፣ ተመሳሳይ `findStaleTranslations`)።

### ሥራ `i18n`

ሙሉ i18n የማረጋገጫ ማትሪክስ (በአካባቢው አንድ ሥራ)። ሥራው ሁሉ ምክር ነው።

| ስክሪፕት                           | ያረጋግጣል              | ማገድ                                           |
| ------------------------------- | ------------------- | --------------------------------------------- |
| `validate_translation.py quick` | የትርጉም ምሉዕነት በየአካባቢው | **ምክር** (`continue-on-error: true` በሙሉ ሥራ ላይ) |

### ሥራ `pr-test-policy`

በመጎተት ጥያቄዎች ላይ ብቻ ይሰራል።

| ስክሪፕት                  | ያረጋግጣል                                                                                                       | ማገድ |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --- |
| `check:pr-test-policy` | PRs በ `src/`፣ `open-sse/`፣ `electron/` ወይም `bin/` ውስጥ የምርት ኮድ የሚቀይር ሙከራዎችን ማካተት ወይም ማዘመን አለበት (Hard Rule #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የፍተሻ ፋይሎች የተጣራ ቁጥርን አይቀንሱም ወይም `assert.ok(true)` tautologiesን አይጨምሩም።                                  | አዎ  |
| `check:pr-evidence`    | PR አካል ለለውጡ test/VPS ማስረጃን ጠቅሷል (mechanizes Hard Rule #18 by grepping PR prose — fragile, Backlog ይመልከቱ)     | አዎ  |

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

## የፍጥነት ደረጃ (2026-08-30 → v4.0 LTS): እያንዳንዱ መነሻ በ20% ተፈታ

የባለቤት ውሳኔ (2026-08-30)፡ እስከ v4.0 ሞዱላራይዜሽን ድረስ የእዳ መስመሩን ከመያዝ በላይ የመርከብ ፍጥነት አስፈላጊ ነው። እያንዳንዱ** ቁጥር** ratchet መነሻ መስመር በአንድ ኦዲት ሊደረግ በሚችል ማለፊያ በ20% ተፈታ እና ምእራፉ `config/quality/quality-baseline.json` ታውጇል።

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| ምን ተለወጠ                                                                                                                                             | የት                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ዝቅተኛ-የተሻለ ቆጠራዎች × 1.2፣ ከፍተኛ-የተሻለ መቶኛ ÷ 1.2 (የሽፋን ወለል 60 ተቀምጧል፣ `eslintErrors` 0 ይቆያል፣ `eslintWarnings` 0 → 20% የቀዘቀዘው የማፈኛ ብዛት) | `quality-baseline.json` (`_relax_velocity_2026_08_30` ማስታወሻ ከ → በኋላ ይዘረዝራል)                            |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                    | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, እያንዳንዱ `frozen[*]` / `testFrozen[*]` መስመር ቆብ × 1.2                                                                                | `file-size-baseline.json`                                                                              |
| per-file / per-TS-code ቆጠራ × 1.2                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` ምክር ይሆናል `_policy.requireTighten === false` እያለ                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| የማታ `bank-ratchet-shrinks` ባለበት ይቆማል (የተለካውን መጨማደድ ባንክ ያደርግና የጭንቅላት ክፍሉን ይቀልብሰዋል)                                                                   | `.github/workflows/nightly-release-green.yml`                                                          |

ፈቃዶች (`eslint-suppressions.json`፣ `test-masking-allowlist.json`፣ `test-discovery-baseline.json`፣ …) ናቸው።** አይደለም** በጀቶች እና አልተነኩም. Pass/fail የፖሊሲ በሮች (ምስጢሮች፣ SQL ደንቦች፣ docs/env ውል፣ i18n እኩልነት፣ የክፍል ፈተናዎች) አልተለወጡም — ቀይ ፈተና አሁንም ቀይ ፈተና ነው።

**መገልገያ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — የአንድ-ምት ማስታገሻ (`scripts/quality/relax-baselines.mjs`); በተመሳሳዩ ማስታወሻ ሁለት ጊዜ ለመሮጥ ፈቃደኛ አልሆነም።
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — እያንዳንዱን የቁጥር በር የሚለካው CI በሚያደርገው መንገድ ነው እና የቀረውን ዋና ክፍል በበር (`scripts/quality/baseline-headroom.mjs`) ያትማል። የምሽት `baseline-headroom` ስራ ሰንጠረዡን በስራ ሂደት አሂድ ማጠቃለያ ላይ ያትማል እና JSON/Markdown ሪፖርቱን ለ90 ቀናት ያህል `baseline-headroom-<run_id>` ይሰቀላል። ማስጠንቀቂያ እና ወሳኝ ረድፎች በካፒታቸው 10% ውስጥ ወይም ቀድሞውኑ በላዩ ላይ ያሉትን በሮች ይለያሉ። እነዚህን ሪፖርቶች እንደ የበጀት አጠቃቀም የመጀመሪያ ማስጠንቀቂያ ይከልሱ; የአጥቂውን በር `_rebaseline_*` ማስታወሻዎች ይፈትሹ። ሥራው ከአሁን በኋላ ቋሚ ችግር አይፈጥርም ወይም አያዘምንም፤ #12149 የቀደመውን የሪፖርት ታሪክ ይጠብቃል።

**አዲስ ኮድ ሁነታ (እንደ እርስዎ-ኮድ አጽዳ) — ከ2026-08-30፣ PR ፈጣን መንገድ ብቻ**

በ `pull_request` ዝግጅቶች ላይ `quality.yml` `--base-ref <PR base SHA>` ወደ `check:file-size`፣ `check:complexity-ratchets` እና `check:dead-code` ያልፋል። ለ `check:complexity-ratchets` እና `check:dead-code` በሩ HEAD ከውህደት-መሰረት ጋር ያወዳድራል።** PR በነካባቸው ፋይሎች ላይ ብቻ ተገድቧል** (`scripts/check/newCodeMode.mjs`: የውህደቱ መሠረት በተጣለ `git worktree` ውስጥ ተፈጽሟል፣ ESLint/knip እዚያ ይሮጣል እና HEAD ላይ፣ የፋይል ቆጠራው ይለያያል)

- **ማገድ** — የ PR በተለወጠው ፋይሎች ውስጥ cyclomatic/cognitive ጥሰቶችን ወይም የሞተ ወደ ውጭ መላክን አክሏል (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` በምዝግብ ማስታወሻው ውስጥ);
- **ምክር** — ዓለም አቀፋዊው ጠቅላላ ከቀዘቀዘው መነሻ መስመር ጋር ሲነጻጸር። የተወረሰ መንሳፈፍ ንፁህ PR በጭራሽ አይቀላም; ተንሳፋፊው በሚለቀቅበት ጊዜ እንደገና ቀዘቀዘ እና በዋና ክፍል ስራው ይታያል።

`check:file-size` ቤዝ ሪፍ በራሱ ውል ይጠቀማል (`scripts/check/check-file-size.mjs`፣ #8522)፡ በዛፉ ውስጥ ያለውን እያንዳንዱን ምንጭ እና የፈተና ፋይል ይፈትሻል፣ የእያንዳንዱን የመስመር ቆጠራ በ PR ቤዝ በ `git show` ያነባል እና ፋይሉን ከዋናው የመነሻ ጣሪያ (`frozen` / `testFrozen`፣ ወይም `cap` / `testCap` ለፋይሉ ከመነሻው ውጭ ላለው) ሲያድግ ብቻ ነው። አስቀድሞ በመሠረቱ ላይ የተንሰራፋ ፋይል ስለዚህ ንፁህ PR በጭራሽ አይቀላም።

`check:boundary:ratchet` በነጠላ ቁጥሩ (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`) ላይ አንድ አይነት ህግ ነው የሚተገበረው፡ በ PR ክስተቶች ሁለቱም `quality.yml` fast-gates እና `ci.yml` lint job PR base SHA ያልፋሉ፣ ቤዝ ቁርጠኝነት የሚለካው ከ `git archive` ኤክስፖርት ነው፣ እና PR የማይሳካው `open-sse → src` ጠርዝ ቆጠራው `metrics.boundaryOpenSseToSrc` ትልቅ ሲበልጥ እና በመሠረቱ ላይ ያለው ቆጠራ ነው። ከጣሪያው በላይ የመሠረት ተንሸራታች (`base drift herdado`) ሪፖርት ተደርጓል ነገር ግን ንፁህ PR ፈጽሞ አይቀላም; push → ዋና ፍፁም ጣሪያውን ይጠብቃል፣ እና ሊፈታ የማይችል መሰረት SHA በማስጠንቀቂያ ወደ እሱ ይመለሳል።

ሁለንተናዊ ወረፋ እጩ (ወደ `omni-queue/**` ግፋ ፣ [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) ይመልከቱ) እንደ የመጎተቻ ጥያቄ ተመሳሳይ አያያዝ ያገኛል፡ ሁለቱም የስራ ፍሰቶች የእጩውን መሰረት (`needs.changes.outputs.candidateBase`) እንደ `--base-ref` ያልፋሉ፣ እና `check:ts7-diagnostics-ratchet` በሱ ላይ ይሮጣል። ለሁለቱ አዲስ-ኮድ በሮች የንፅፅር መሰረቱ SHA እራሱ ነው እንጂ የበላይ ውህደት የመጀመሪያ ወላጅ አይደለም፣ስለዚህ የቡድኑ ሁሉ የመሳብ ጥያቄ ይፈረድበታል።

`workflow_dispatch` ይሮጣል፣ የተለቀቀው-አረንጓዴ መጥረግ እና የምሽት የጭንቅላት ክፍል ስራ ምንም PR መሰረት የላቸውም እና ፍፁም (አለምአቀፍ) ንፅፅርን ይጠብቁ። ሽፋን፣ ብዜት እና ዓይነት ሽፋን ለአሁኑ ዓለም አቀፋዊ ሆነው ይቆያሉ (መሣሪያዎቻቸው በፋይል ልዩነት በርካሽ አያዘጋጁም) — ለተመሳሳይ ሕክምና እጩዎች።

**ደረጃውን በ v4.0 መዝጋት (LTS = ከበፊቱ የበለጠ ጥብቅ ነው፣ "ወደ መደበኛው መመለስ አይደለም")**

1. በንጹህ `release/v4.0.0` ጫፍ ላይ `npm run quality:headroom --json` ለመዝገቡ፣ ከዚያም `npm run quality:ratchet -- --update`፣ `check:file-size --update`፣ `check:complexity-ratchets --update`፣ `check:dead-code --update`፣ እያንዳንዱ የጽሕፈት መኪና በር `--update` — እያንዳንዱ መነሻ መስመር ወደሚለካው እሴት ይወርዳል።
2. `_policy` ከ `quality-baseline.json` ሰርዝ ( `--require-tighten` እንደገና ማስታጠቅ እና የምሽት ባንክ)፣ `THRESHOLD = 36` (ወይም ከዚያ በላይ) በ `check-openapi-coverage.mjs` ወደነበረበት ይመልሱ።
3. ሞዱላራይዜሽኑ የተከፈለበት ቦታ ከሚለካው በላይ አጥብቅ፡ የፋይል መጠን `cap` ወደ 1000 (ወይም 800)፣ የሽፋን ወለሎች + 5፣ የሞተ ወደ ውጭ መላክ 0 ለሞዱላራይዝድ ፓኬጆች።

## Ratchet Baseline (`quality-baseline.json`)

የራጣው ሞተር (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` ያነብባል እና አዲስ ከተሰበሰበው `quality-metrics.json` ጋር ያወዳድራል። ከኤፒሲሎን በላይ ወደ ኋላ የሚመለስ ማንኛውም መለኪያ ግንባታውን ይሳነዋል።

አሁን ክትትል የሚደረግባቸው መለኪያዎች፡-

| መለኪያ                  | አቅጣጫ   | ትርጉም                          |
| --------------------- | ------ | ----------------------------- |
| `eslintWarnings`      | `down` | ESLint የማስጠንቀቂያ ብዛት ማደግ የለበትም |
| `coverage.statements` | `up`   | መግለጫ ሽፋን መውደቅ የለበትም           |
| `coverage.lines`      | `up`   | የመስመር ሽፋን መውደቅ የለበትም          |
| `coverage.functions`  | `up`   | የተግባር ሽፋን መውደቅ የለበትም          |
| `coverage.branches`   | `up`   | የቅርንጫፍ ሽፋን መውደቅ የለበትም         |

ከእውነተኛ መሻሻል በኋላ የመነሻ መስመሩን ለማዘመን፡-

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ባንዲራ አሁን ያሉትን የሚለኩ እሴቶች ወደ `quality-baseline.json` ይጽፋል። የባንክ ማሻሻያ release/nightly ስራ ነው እንጂ ባህሪ አይደለም PR's `--require-tighten` (Fase 6A.5) ከባንክ ያልተደረገ ማሻሻያ የሚሳነው በመልቀቂያ ሁነታ ብቻ (ግፋ፣ መርሐግብር፣ የተለቀቀው PR፣ የአካባቢ ሩጫዎች) ነው። በባህሪ PR (`pr` በር ሁነታ) ማሻሻያውን እንደ መረጃ ያትማል እና ያልፋል; መመለሻ በሁለቱም ሁነታዎች አይሳካም። በፍጥነት ደረጃ በሁሉም ቦታ ምክር ነው (`_policy.requireTighten: false`)። [የተፈጠሩ ፋይሎችን እና የመነሻ መስመሮችን](#generated-files-and-derived-baselines-written-at-release) ይመልከቱ።

### CodeQL ratchet: አድስ cadence እና በእጅ ቀስቅሴ

`check:codeql-ratchet` ያነባል** repo ሁኔታ፣ በጊዜ መርሐግብር የታደሰ — በአንድ PR አይደለም።** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ሪፖርት ያደርጋል `state: configured`, `schedule: weekly`: GitHub ነባሪ ማዋቀር ቅኝት እንጂ በየግፋ ትንታኔ አይደለም። መዘዝ፡- FIXES የሚያስጠነቅቀው PR ከተዋሃደ በኋላ፣ ራትቼው የድሮውን፣ ከፍተኛ ቁጥርን በማንበብ ቀጣዩ መርሐግብር — እስኪያልቅ ድረስ በእያንዳንዱ ክፍት PR ላይ ሪግረስስ ሪፖርት ያደርጋል፣ የራሱን የ PR ክትትልን ጨምሮ፣ ፍተሻው እስኪያገኝ ድረስ።

**በእጅ አድስ** `gh workflow run codeql.yml --ref release/vX.Y.Z` ትንታኔውን እንደገና ያካሂዳል እና ማንቂያዎችን በደቂቃዎች ውስጥ እንደገና ያሳትማል። `.github/workflows/codeql.yml` መጀመሪያ — አንብብ የራስጌው `workflow_dispatch` -only መሆኑን ያስረዳል።** ምክንያቱም ከ GitHub"ነባሪ ቅንብር" ጋር ስለሚጋጭ ነው።** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`)። `push`/`pull_request`/ `schedule` ቀስቅሴዎችን ወደነበረበት መመለስ አንድ ያስፈልገዋል** መጀመሪያ የባለቤት እርምጃ** ቅንብሮች → ኮድ ደህንነት → CodeQL: ነባሪ → የላቀ። የ `schedule:` ቀስቅሴን ያለዚያ ማብሪያ — ሳትጨምር ያልተሳኩ ሩጫዎችን ብቻ ያመጣል።

**ቆጠራው ከወደቀ በኋላ የመነሻ መስመሩን አጥብቀው ይዝጉ** — `node scripts/check/check-codeql-ratchet.mjs --update` አዲሱን የተለካ ቆጠራ ወደ `quality-baseline.json` → `metrics.codeqlAlerts.value` ይጽፋል፣ ስለዚህ አይጥ በፀጥታ ወደ አሮጌው ጣሪያ እንዲመለስ አይፈቅድም። የተሰራ ምሳሌ (2026-09-02/03): PR #12502 ቋሚ 7 እውነተኛ ማንቂያዎች (13 → 6 የሚለካ ክፍት); PR #12530 የቀዘቀዘውን መነሻ መስመር 11 → 6ን ለማዛመድ አጠበበ፤ የተቀሩት 6 ደግሞ በቅድመ-ማስጠንቀቂያ እስከ 0 ክፍት ሆነው ተሰናብተዋል።

**ማሰናበት የኦፕሬተሩ ጥሪ ነው (Hard Rule #14)** — የ CodeQL ማንቂያን በስንብት አስተያየት ውስጥ ቴክኒካል ማረጋገጫውን ሳይመዘግብ በፍፁም አያሰናብት `won't fix` ለላይ ዥረት-ፕሮቶኮል መስፈርት፣ `used in tests` ለሙከራ መሣሪያ፣ `false positive` ለጽዳት ማጽጃ CodeQL ማየት አይቻልም (ቅድመ ሁኔታ `docs/security/ERROR_SANITIZATION.md`)።

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

## የተፈጠሩ ፋይሎች እና የመነሻ መስመሮች (በተለቀቀው ጊዜ የተጻፈ)

እቅድ 2026-11-13 ("የተገኙ ቁጥሮች እና ጽሑፎች ሲለቀቁ ብቻ ነው የሚፈቱት") PR ባህሪ** ምንጭ** — `src/shared/constants/providers.ts`፣ `docs/openapi.yaml`፣ የክህሎት ካታሎግ፣ የነጻ ደረጃ ካታሎግ፣ አዲስ e2e ዝርዝር። ከዚያ ምንጭ የተሰሉ ፋይሎችን እንደገና አያዳብርም፣ እና የተለካ ማሻሻያ ወደ መነሻ መስመር አያደርግም። እነዚያ ፋይሎች አንድ ጊዜ እንደገና ይጻፋሉ፣ በመልቀቂያ ማደስ (`release:refresh-derived`) ወይም በምሽት አድስ PR። ከዚህ በፊት፣ እያንዳንዱ ወንድም ወይም እህት PR የራሱን የታደሰ ቅጂ ይዞ ከሚቀጥለው ውህደት ጋር ተጋጨ (2026-11-13፡ 30 ከ321 ክፍት PRs እንደገና `PROVIDER_REFERENCE.md`፣ 26–28 README ንድፎችን እንደገና ጻፈ)።

**ጠባቂው.** `check:pr-derived-paths` (ሥራ `pr-test-policy`) `config/quality/derived-paths/` ውስጥ የቤተሰብ ፋይል የሚነካ ባህሪ PR አልተሳካም:

| ቤተሰብ        | ፋይሎች                                                                                                                                                             | በድጋሚ የተፃፈ                                                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; አሥራ ሁለቱ የፈጠሩት README SVGs; `skills/*/references/**`; ብጁ እገዳ የሌላቸው የ `SKILL.md` ፋይሎች | `release:refresh-derived` (እውነታዎች)፣ `gen:provider-reference`፣ `docs:readme-diagrams`፣ `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

ጸሐፊዎች (`release/v*`፣ `chore/derived-*` እና `chore/bank-ratchet-*` ለመሠረታዊ መስመሮች) ነፃ ናቸው። እንደዚሁም አንድ ቤተሰብ ብቻ እና ጓደኞቹን የሚቀይር PR ነው (ለ `generated`: የጄነሬተር ስክሪፕቶች፣ ፈተናዎቻቸው፣ የወኪል ክህሎት ግብአቶች — `src/shared/constants/agentSkills.ts`፣ በእጅ የተጻፈ `skills/**` ሰነዶች፣ `docs/openapi.yaml` — እና `changelog.d/**`)፣ ለምሳሌ የጀግና አቀማመጥ ለውጥ በተሻሻለ SVG፣ ወይም ፈተናው `SKILL.md` ፋይሎችን ያነበበ የክህሎት ማስተካከያ። በእጅ የተጻፈ `<!-- skill:custom-start -->` ብሎክ ያለው `SKILL.md` በቤተሰብ ውስጥ የለም፡ ብጁ ብሎክ ከአንድ ባህሪ ቀጥሎ ሊስተካከል የሚችል ሆኖ ይቆያል።

**ቼኮች፣ በበር ሁነታ** (`scripts/check/lib/gateMode.mjs`; ረዳት `scripts/check/lib/derivedArtifactScope.mjs`):

| ይፈትሹ                                                                 | `release` (ግፋ፣ መርሐግብር፣ PR መልቀቅ፣ አካባቢያዊ)               | `pr` (ባህሪ PR፣ queue batch)                                                                                                                                                       |
| -------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                            | እያንዳንዱ ችሎታ ከጄነሬተር ውፅዓት ጋር እኩል መሆን አለበት።               | የመነጨው ጽሑፍ (ከብጁ ብሎክ ውጭ) ወይም `references/` የ PR አርትዖቶችን ብቻ ችሎታዎች; አለበለዚያ `SKIP reason=pr-mode`                                                                                     |
| `check:generated-artifacts` (README SVGs + e2e ጊዜዎች፤ ሙሉ ታሪክ ያስፈልገዋል) | እያንዳንዱ SVG ከጄነሬተር ጋር እኩል ነው; እያንዳንዱ ዝርዝር የጊዜ ግቤት አለው። | የ PR አርትዖቶች ብቻ ቅርሶቹ; ቀሪው `SKIP reason=pr-mode`; ምንም ልዩነት የለም → እያንዳንዱ ቅርስ ተፈርዶበታል (ያልተዘጋ)                                                                                        |
| README SVG ባይት-አወዳድር ሙከራዎች (`tests/unit/docs/readme-*-svg.test.ts`)  | እያንዳንዱ SVG                                            | አንድ SVG ብቻ የ PR አርትዖቶች፣ መሰረቱ ሲፈታ; የ `test-unit` ጥልቀት የሌለው PR ቼክ መውጣት መሰረት የለውም፣ ስለዚህ እዚያ ፈተናው በ `SKIP reason=base-unresolved` ይዘላል እና `check:generated-artifacts` የንፅፅር ባለቤት ነው። |
| e2e የጊዜ ገደብ (`tests/unit/balance-e2e-shards.test.ts`)                | እያንዳንዱ ዝርዝር መግቢያ አለው።                                 | እንደ SVG ሙከራዎች ተመሳሳይ ህግ (አዲስ ዝርዝር ከመካከለኛው ክብደት ጋር ይሰራል)                                                                                                                           |
| `check-quality-ratchet.mjs --require-tighten`                        | በባንክ ያልተሰራ ማሻሻያ አልተሳካም ( `_policy` ካልሆነ በስተቀር)        | መሻሻል ሪፖርት ተደርጓል, በጭራሽ አልተሳካም; መመለሻ አሁንም አልተሳካም።                                                                                                                                  |

የመልቀቂያ ሁነታ እነዚህ ቼኮች ከመከፋፈላቸው በፊት የነበራቸውን ፍርድ፣ የመውጫ ኮድ እና መልእክቶች ያስቀምጣል። ቢበዛ አንድ መስመር ተጨምሯል, መፍትሄውን ሁነታ (`[agent-skills-sync] mode=release (auto: local run)`) በመሰየም. ፈተናዎቹ በ node: test's `{ skip: releaseOnlyUnlessTouched(...) }` አማራጭ ይዘለላሉ፣ ይህም `check:test-masking` በሪፖርት-ብቻ ብሎክ ውስጥ ይዘረዝራል ( `.skip(` ወይም `{ skip: true }` አይደለም፣ ስለዚህ እንደ ከባድ መዝለል አይቆጠርም)። `check:generated-artifacts` የሚሠራው መሠረቱ ሊፈታ በሚችልበት ቦታ ነው፡ ሥራ `lint` (`fetch-depth: 0`)፣ ልክ `check:agent-skills-sync` በኋላ። በአካባቢው፣ `npm run check:generated-artifacts -- --mode=pr` ይህ እርምጃ በ PR ላይ ምን እንደሚፈርድ ያሳያል። አቅራቢ-ጠቅላላ የዝቅኤል `check:docs-counts` ("የአቅራቢ ማጣቀሻ ድምር (doc vs live modules)") የቆጣሪው በር አካል ነው እና የዚያን በር የራሱ ሁነታዎች ይከተላል።

በቤተሰብ ውስጥ አይደለም፣ ሆን ተብሎ፡ በሰዎች የሚወሰኑ የመመሪያ ሰነዶች (`gate-manifest.json`፣ የፈቃድ ዝርዝሮች፣ `admission-policy.json`፣ `provider-assets-provenance.jsonl`፣ `model-lifecycle.json`) እና ጣሪያዎች አንድ ባህሪ PR ከኮድ ጋር አንድ ላይ ማርትዕ ሊኖርበት ይችላል (`quality-baseline.json` ሜትሪክ ግቤቶች፣ የ typecheck/file-size/complexity መነሻ መስመሮች፣ `eslint-suppressions.json` — በቅድመ ቁርጠኝነት ESLint አሂድ አንድ PR ጥሰትን ሲያስተካክል)። `src/i18n/routeNamespaces.generated.json` እንዲሁ ይፈጠራል ነገር ግን በባህሪው PRs ውስጥ ይቆያል፡ አፕ በሩጫ ሰአት ያስመጣዋል፣ ስለዚህ ለማደስ መጠበቅ አይችልም።

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

## የፈቃድ ዝርዝር መመሪያ

በቅድመ-ነባር ጥሰቶች ላይ የማይወድቅ ማንኛውም በር የታሰረ የፍቃድ ዝርዝር ይጠቀማል (ለምሳሌ፣ `KNOWN_STALE_DOC_REFS`፣ `KNOWN_MISSING`፣ `KNOWN_RAW_SQL`)። ፖሊሲው፡-

**ዋናውን ምክንያት አስተካክል; የተፈቀደ ዝርዝሩን መጠቀም ጥሰቱ አስቀድሞ ሲኖር እና በተመሳሳይ PR ውስጥ ሊስተካከል በማይችልበት ጊዜ ብቻ ነው.**

ወደ የፈቃድ ዝርዝር ግቤት ሲያክሉ፡-

1. ከጽድቁ ጋር አስተያየት ያካትቱ።
2. የመከታተያ ጉዳዩን ያጣቅሱ (ለምሳሌ፣ `// #3498 — Phase 2 feature, not yet implemented`)።
3. ጥሰቱን የሚያስተካክለው በተመሳሳይ PR ውስጥ ያለውን ግቤት አስወግድ — ከአሁን በኋላ ንቁ ጥሰትን የማይፈቅደው የቆየ ግቤት በራሱ ጉድለት ነው (6A.3 የቆየ ማስፈጸሚያ አንድ ጊዜ ወላጅ አልባ በሆነ የፍቃድ ዝርዝር መግቢያ ላይ በሩ አይሳካም)።

መ ስ ራ ት** አይደለም** ፈተናዎች በፍጥነት እንዲያልፉ የፍቃድ ዝርዝር ግቤቶችን ያክሉ። እያደገ የሚሄድ የተፈቀደ ዝርዝር ያለው አረንጓዴ በር የተሳሳተ የጥራት ስሜት ነው።

### PR ላይ በር ሲወድቅ

1. **የበሩን ውጤት በጥንቃቄ ያንብቡ** — የትኛው ፋይል ወይም ምልክት ህጉን እንደጣሰ በትክክል ይነግርዎታል።
2. **ጥሰቱን አስተካክል** — አብዛኞቹ በሮች ኮዱ ልክ እንደ ሆነ ወዲያውኑ የሚያልፍ የፋይል ስርዓት ቼኮች ናቸው።
3. **ጥሰቱ አስቀድሞ ካለ** (ማለትም፣ አላስተዋወቁትም ነገር ግን በሩ አሁን ይሸፍነዋል)፡ የፈቃድ ዝርዝር መግቢያ ከማረጋገጫ አስተያየት እና የመከታተያ ችግር ጋር ያክሉ።
4. **በሩ ራች ከሆነ** (ሽፋን ፣ ESLint ማስጠንቀቂያዎች ፣ ማባዛት ፣ ውስብስብነት)፡ ለውጥህ ልኬቱን አባብሶታል። ዋናውን ጉዳይ አስተካክል ወይም (አልፎ አልፎ) ለውጡ ሆን ተብሎ ከሆነ እና የሜትሪክ ውድቀቱ ተቀባይነት ካለው — ነገር ግን ለምን በ PR መግለጫ ውስጥ ከሆነ `npm run quality:ratchet -- --update` አሂድ።
5. **የምክር በሮች** (`continue-on-error: true`) መረጃዊ — ናቸው ውህደትን አያግዱም ነገር ግን በ CI ማጠቃለያ ላይ ይታያሉ። ለማንኛውም አስተካክላቸው።

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

## የምክንያታዊነት ዳራ (ROI ግምገማ — Fase 9 ኦንዳ 3)

ይህ ክምችት እ.ኤ.አ. በ2026-06-17 ከ `ci.yml` ጋር ታርቋል (የቀደመው እትም `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` ተትቷል )። የታረቀው ስብስብ ROI ግምገማ የሚከተሉትን ምክንያታዊ እጩዎችን ለይቷል።** ውህደቶቹ ሜካኒካል CI ለውጦች; flips/drops ለኦፕሬተር የተቀመጡ የፖሊሲ ውሳኔዎች ናቸው።** ከዚህ በታች ምንም እስካሁን አልተተገበረም።

**እንዲሁም ከላይ ሰነድ አልባ** (አማካሪ፣ ዝቅተኛ ምልክት) `docs-lint` ስራ (markdownlint + Vale፣ ሙሉ ስራ `continue-on-error`) እና ራሱን የቻለ ስካነር የስራ ፍሰቶች `semgrep.yml` / `codeql.yml` / `scorecard.yml`። `semgrepFindings: 0` በ `quality-baseline.json` ውስጥ ነው ነገር ግን በ `ci.yml` — ውስጥ ወደ ማገጃ ራትቼ አልተጣመረም መለኪያው በአሁኑ ጊዜ ወላጅ አልባ ነው።

### አዋህድ/ ተቀናሽ (ሜካኒካል፣ ዝቅተኛ ስጋት)

እያንዳንዱ እጩ በ 2026-06-17 (በመታመን-ግን-አረጋግጥ) ከቀጥታ በር ሁኔታ ጋር የተረጋገጠ ነው; ዕዳን ለመደበቅ ብዙ “ግልጽ” ውህደቶች ተለውጠዋል እና ናቸው።** አይደለም** ንጹህ ነጠብጣብ.

- **`check:docs-sync` ሁለት ጊዜ ይሰራል** — ራሱን የቻለ በ `lint` ስራ እና እንደገና በ `check:docs-all` (`docs-sync-strict`) እና በ husky ቅድመ-ቁርጠኝነት መንጠቆ። ✅**DONE** — ራሱን የቻለ `lint` ጥሪ ተወግዷል።
- **CVE መቃኘት** — ❌**NOT ንጹህ ውህደት.** `audit:deps` ወሳኝ ምክሮችን እና ያልተሟሉ ኦዲቶችን በአምስቱም የመቆለፊያ ፋይሎች ላይ ያግዳል፣ ከፍተኛ ምክሮችን አሁን ባለው ፖሊሲ እንደ ማስጠንቀቂያ ሲዘግብ፣ `check:vuln-ratchet` (osv) በ _regression_ ላይ ብቻ ከተመዘገበው የመነሻ መስመር ጋር ይወድቃል እና በሚፈለግበት ጊዜ የጎደሉትን መለኪያዎች ውድቅ ያደርጋል። የተለያዩ የትርጓሜ ትምህርቶች — መጣል `audit:deps` ፍፁም ወሳኝ በር እና ነፃ የጥቅል ኦዲት ደረሰኞችን ያጣል። ሁለቱንም አቆይ.
- **ዑደት ማወቂያ** — ✅**DONE** (#15159 G-01/G-02) እዚህ ያለው የድሮው ጽሑፍ `check:cycles` "አረንጓዴው ፣የተመረተ" በር ብሎ ጠርቶ እና እንዳይዘጋ መደረጉ ትክክል ነው ምክንያቱም `check:circular-deps` (dpdm) 91 ዑደቶችን ዘግቧል። ያ አረንጓዴው ሀ** የውሸት አረንጓዴ** : `check:cycles` 5 ንኡስ ማውጫዎች (450 ፋይሎች) ተቃኝቷል፣ የማይለዋወጥ `import|export … from` ብቻ ይዛመዳል፣ እና እያንዳንዱን `@/` እና `@omniroute/open-sse/` ገላጭ ስለጣለ ሪፖውን የተቆጣጠሩትን ተለዋዋጭ-ማስመጣት + ተለዋጭ ዑደቶችን ማየት አልቻለም። ተስተካክሏል፡ በሩ አሁን `src` + `open-sse` (5023 ፋይሎች) ይራመዳል፣ ከ TypeScript AST ገላጭዎችን ይሰበስባል (ስለዚህ `import("…")` ይቆጥራል እና የቦታ አቀማመጥ `typeof import("…")` አይሰራም) እና tsconfig `paths` ይፈታል። ያገኛል** 14** ዑደቶች እንጂ 0 አይደሉም። ምክንያቱም 14 ቀድሞ የነበሩት ዑደቶች በ PR በር ውስጥ ሊጠገኑ አይችሉም፣ `check:cycles` አሁን ሀ ነው።** አይጥ** (`--ratchet`፣ ጣሪያ `metrics.cycles.value = 14` በ `quality-baseline.json`፣ `direction: down`) — ማንኛውንም _regression_ን ይከለክላል እና ቁጥሩ ሊወድቅ የሚችለው ብቻ ነው። CI `npm run check:cycles:ratchet` ን ይሰራል። የተቃጠለ-ወደታች የሚጋልቡ**A-01** . `check:circular-deps` (dpdm) እንደ ሰፊው ሁለተኛ አስተያየት አማካሪ ሆኖ ይቆያል።
- **ውስብስብነት** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): አንድ ESLint መራመድ፣ በ ruleId ይቆጠራል ስለዚህ ሳይክሎማቲክ + ከፍተኛ መስመሮች እና የግንዛቤ መነሻ መስመሮች ራሳቸውን ችለው ይቆያሉ፤ የግለሰብ `check:complexity` / `check:cognitive-complexity` ለአካባቢያዊ `--update` ይቀራል።
- **`/api` ፀረ-ቅዠት** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): አንድ FS የ `src/app/api` ክምችት፣ openapi-routes + docs-symbols አሁንም ራሱን ችሎ ሪፖርት ያደርጋል። ግለሰቦች ለአካባቢያዊ ሩጫዎች ይቆያሉ.
- **`check:node-runtime` በ11 ስራዎች ይሰራል** — ⚠️** ዝቅተኛ ROI.** እያንዳንዱ የተለየ ሯጭ እና ቼኩ < 1s ነው; ጠቅላላ ቁጠባ ~ 10s፣ በየሥራው ርካሽ ጠባቂ እንዳያጣ። መቸኮል ዋጋ የለውም።
- **`typecheck:noimplicit:core` on CI lint** — ✅** ከሊንት ሥራ ተወግዷል** (አማካሪ `continue-on-error` ነበር); የማገጃ አይነት ወለል `typecheck:core` + `check:type-coverage` ነው። የአካባቢ ስክሪፕት ተይዟል።

### መገልበጥ / መወሰን (የኦፕሬተር ፖሊሲ)

- `check:openapi-security-tiers` (ምክር) — ❌**NOT በንጽሕና ሊገለበጥ የሚችል.** ከ0 ይወጣል ነገር ግን በ `LOCAL_ONLY_API_PREFIXES` ስር ያሉ በርካታ `traffic-inspector` መስመሮች የ `x-loopback-only: true` ማብራሪያ እንደሌላቸው ያስጠነቅቃል። እሱን ለማስፈጸም መጀመሪያ እነዚያን ማብራሪያዎች ወደ `openapi.yaml` ማከልን ይጠይቃል።
- `typecheck:noimplicit:core` (አማካሪ) — በአብዛኛው የሚሸፈነው በ `check:type-coverage` ratchet በማገድ ነው። ወደ አይጥ ገልብጡ ወይም ተደጋጋሚውን ሁለተኛ `tsc` ይለፉ።
- `test:vitest:ui` (አሁን** ማገድ** ) — ቅድመ-ነባር ውድቀቶች በ `vitest.config.ts` ውስጥ `// #8618` ክትትል አስተያየቶች ጋር በግልጽ አይካተቱም; አዲስ ውድቀቶች ሥራውን ያጣሉ.
- `check:secrets` (gitleaks፣ የማገድ አይጥ በ3 የሐሰት-አዎንታዊ ማስረጃዎች የቀዘቀዘ) — 3ዎቹ 0 እንዲደርሱ ይፍቀዱ ወይም ወደ አማካሪ ዝቅ ያድርጉ። መደራረብ GitHub ቤተኛ ሚስጥራዊ-መቃኘት + `check:public-creds`.
- `check:pr-evidence` (ማገድ, greps PR-body prose) — ከፍተኛ የውሸት-አዎንታዊ አደጋ; ከተወገደ Hard Rule #18 አፈፃፀምን ያዳክማል፣ ስለዚህ ይህ ትክክለኛ የፖሊሲ ጥሪ ነው።
- `semgrep` (የማማከር ብቻውን) — ለ OWASP ቤተሰቦች CodeQL ይደራረባል; የመነሻ መስመሩን ወደ አይጥ ወይም መጣል።

---

## ተዛማጅ ሰነዶች

- የአቅርቦት ሰንሰለት (provenance፣ SBOM፣ Trivy፣ Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — ቁልፍ የተቀመጠ የፓርቲ በር

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, ሥራ `i18n-ui-coverage`). የእያንዳንዱን `src/i18n/messages/<locale>.json` የቅጠል ቁልፍ ስብስብ ከ `en.json` ጋር ያወዳድራል እና ቁልፉ የተጨመረበት ጊዜ ምንም ይሁን ምን በሌለበት ወይም ተጨማሪ ቅጠል ላይ አይሳካም። `__MISSING__:` ቦታ ያዢዎች እንደአሁኑ ይቆጠራሉ (ይዘታቸው የሬሾ ጌት ንግድ ነው)። የሁለቱ diff-based/percentage በሮች ፍፁም ማሟያ ነው `check-ui-keys-coverage` በየአካባቢው 80 % ወለል ያስፈጽማል ( ~ 43 የሌሉ ቁልፎች 13,000 አሁንም 99.7 ይነበባል) እና `check-new-key-coverage` የሚዳኘው PR ወደ `en.json` የሚጨምረውን ቁልፎች ብቻ ነው። የአካባቢ ባች የሚፈጠረው ቅርንጫፉ ከተቆረጠበት ቀን `en.json` ነው እና ለቀናት ሲተረጎም መሰረታዊ ቁልፎችን ሲጨምር; ባች PR በራሱ ምንም ቁልፍ አይጨምርም ስለዚህ ሁለቱም ወንድም እህቶች ባች 1 (#13044) 43 ቁልፎችን በዘጠኝ አከባቢዎች ሲያርፉ እና ባች 2 (#13660) 10 ቁልፎች በስምንት (2026-09-15) ሲያርፉ ዝም አሉ። ቀይ ቀለምን በ `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` አስተካክል; `extra` ቅጠል ማለት ምንጩ ጣለው — `sync-ui-keys` ጣለው (`--prune-extra`፣ ነባሪ) ማለት ነው። `--warn` ሳይሳካለት ሪፖርት ያደርጋል። `--catalog=cli` በ `bin/cli/locales` (`npm run i18n:check-keys:cli`) ላይ ተመሳሳይ ንፅፅር ይሰራል; ሁለቱም ደረጃዎች በሥራ `i18n-ui-coverage` ውስጥ ይኖራሉ. ፍፁም ፍተሻው የመልቀቂያ ሁነታ ብቻ ነው፡ አንድ ባህሪ PR `SKIP reason=pr-mode` ያያል እና ጥገናው በተለቀቀው ማደስ ወይም በትርጉም ሞገድ ውስጥ ይሰራል፣ በጭራሽ በባህሪ PR ውስጥ ይሰራል። የአካባቢ ካታሎጎችን የሚቀይር PR እያንዳንዳቸው በውህደት መሰረት ይዳኛሉ (በስራ `i18n-ui-coverage` ስር "ሁለት ሁነታዎችን" ይመልከቱ)።

#### `check-new-key-coverage` — አዲስ-ቁልፍ i18n በር

የዝቃ `check-ui-value-drift` እህት . ያ ሰው የነበረውን የእንግሊዝኛ እሴት ይይዛል** እንደገና ተፃፈ** የእሱ ትርጉሞች ወደ ኋላ ሲቀሩ; ይህ የእንግሊዝኛ ቁልፍ ይይዛል** ታክሏል** አንዳንድ አከባቢዎች ግን ፈጽሞ አልተቀበሉትም።

`check-ui-keys-coverage` ይህንን ክፍል ማየት አይችልም፡ በየአካባቢው መቶኛን ያስፈጽማል እና ከ ~ 13,000 የማይገኙ አስራ አንድ ቁልፎች 99.9% ሽፋን ይተዋል. በአንድ ቋንቋ መቶኛ "ይህ ባህሪ ሳይተረጎም ተልኳል" — መግለጽ አይችልም አንድ ሙሉ ባህሪ ምንም ጽሑፍ በሌለው አዲስ አካባቢ ውስጥ ሊያርፍ እና ቁጥሩን በፍፁም ማንቀሳቀስ ይችላል።

በኮድ ያስቀመጠው ክስተት፡ የኦርኬስትራ ሸራ ምዕራፍ 3 አስራ አንድ ቁልፎቹን በወቅቱ በነበሩት 42 አከባቢዎች ተርጉሟል። ከሰዓታት በኋላ የአውሮፓ ህብረት ቋንቋ ቡድን (#13044) ሪፖውን ወደ 51 አከባቢዎች ወሰደ እና ዘጠኙ አዲስ መጤዎች (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) በጭራሽ አልተቀበሏቸውም. `deepMergeFallback` እንግሊዘኛን በሌለ ቁልፍ ይተካዋል፣ስለዚህ የውድቀት ሁነታ ከባዶ UI — እውነተኛ ይልቅ UI አልተተረጎመም እና በግንባታ ፀጥታ ነበር።

ልክ እንደ ወንድም እህቱ ነው።** ልዩነትን የሚያውቅ** , እንግሊዘኛን በውህደቱ መሰረት ከሚሰራው ዛፍ ጋር በማነፃፀር ፣ስለዚህ ቀደም ሲል የነበሩት ክፍተቶች በረዶ ሆነው ይቆያሉ እና በሩ ለማብራት ፍልሰት አያስፈልገውም።

**`__MISSING__:<english>` ምልክት አያረካውም (ከ2026-09-17 ጀምሮ)።** በሰነድ የተዘገበው — የሩጫ ሰዓቱ ወደ ትክክለኛው የእንግሊዘኛ — ይመለሳል በ2026-09-16 ስምንት ባህሪ PRs 61 ቁልፎችን ጨምሯል እና ምልክት ማድረጊያውን ወደ ሁሉም 65 አካባቢዎች ከመተርጎም ይልቅ ማህተም አድርጓል፡ ይህ በር ሁሉንም ተቀብሏል፣ ምንም ነገር PRs አልዘጋውም፣ እና የእውነተኛ የትርጉም አካል ጥምርታ መግቢያ በር ላይ እገዳው ወድቋል። 2.5% > + )። ምልክት ማድረጊያ አሁን እንደሌለ ትርጉም ተቆጥሯል። የመልቀቂያ ሁነታ ከ2026-11-13 ጀምሮ ብቻ፡ ባህሪው PR `SKIP reason=pr-mode` ያያል፣ እና በተለቀቀው ላይ PR (`BASE_REF=origin/main`) በሩ የሚዳኘው ዑደቱ የተጨመረውን እያንዳንዱን ቁልፍ ነው። በመልቀቂያው አድስ ውስጥ ቀይ ወይም የትርጉም ማዕበልን ከ `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ጋር አስተካክል ወይም ሁሉንም አከባቢዎች ከ `npm run i18n:translate-new-keys` ጋር በትይዩ (`scripts/i18n/translate-new-keys.sh`፣ የተነጠለ-አስተማማኝ፣ ያለ `OMNIROUTE_TRANSLATION_*` env መጀመር አሻፈረኝ)። እንግሊዘኛ መቆየት ያለበት ቁልፍ (የተሰካ product/engine/flag ስም) በ `scripts/i18n/untranslatable-keys.json` ውስጥ ነው እንጂ ከጠቋሚው ጀርባ በጭራሽ የለም። `vi` ምልክት ማድረጊያዎችን ያግዳል (`tests/unit/i18n-vi-completeness.test.ts`)።

#### `check-vitest-exclusions` — የቆመ-የሙከራ በር

በ `vitest.config.ts`'s `exclude` ዝርዝር ውስጥ ያለ ፋይል የማይሰራ ፈተና ነው፣ እና ዛፉን ላነበበ ሰው ሽፋን ይመስላል። ከአስተያየቱ በስተጀርባ ስልሳ ሁለት ፋይሎች ተከማችተዋል `// #8618 — pre-existing failure; remove this exclusion when fixed`. እትም #8618 እ.ኤ.አ. በ2026-08-11 ተዘግቷል ፣ የተከታተለው ዝርዝር ከ45 ግቤቶች ወደ 62 አድጓል ፣ እያንዳንዱ አዲስ ወደ የሞተ ጉዳይ የሚያመለክት አስተያየት ይወርሳል። ዝርዝሩ በመጨረሻ ፋይል በፋይል ሲለካ (#13204) ፣** ከ 62 ቱ 51 ቱ አሁን ባለው ዛፍ ላይ ምንም ምንጭ ሳይለወጥ አልፏል** .

በሩ ወደ እውነተኛ ፋይል የሚፈታውን (ሀ) የመከታተያ ችግርን ለመሰየም እና (ለ) በ `config/quality/vitest-exclusions.json` ከሚለካው ሁኔታ ጋር የሚመጣ እያንዳንዱን ማግለል ይፈልጋል፣ ስለዚህ አንድ ማከል በ60-የመግቢያ ድርድር ውስጥ ከአንድ ተጨማሪ መስመር ይልቅ በልዩ ፋይል ውስጥ ሊገመገም የሚችል ልዩነት ነው። ሆን ብሎ ~ 10 ደቂቃ የሚያስከፍለውን እና በየጊዜው በሚሰራ ስራ ላይ ያለውን ያልተካተቱትን — ፈተናዎች ዳግም አያሄድም። እያንዳንዱ ለመጨረሻ ጊዜ ሲለካ የእቃው መዛግብት.
