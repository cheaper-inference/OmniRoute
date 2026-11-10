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

### የእጩዎች መግቢያ

የ CI እና የጥራት ጌትስ የስራ ፍሰቶች እያንዳንዳቸው የተረጋጋ ብይን ይሰጣሉ፡- `Gate / CI` እና `Gate / Quality`። የእነርሱ ስሪት ያለው የመግቢያ ፖሊሲ እንደ አስፈላጊነቱ ወይም እንደ ምክር ሁሉንም የወራጅ ስራዎችን ይዘረዝራል። የሚመለከተው አስፈላጊ ሥራ ስኬታማ መሆን አለበት፡ የጠፋ፣ የተሰረዘ፣ የተዘለለ፣ በመጠባበቅ ላይ እና ያልታወቁ ውጤቶች PASS መመስረት አይችሉም። የሚሰራ ሰነዶች-ብቻ ወይም ካታሎግ-ብቻ ምደባ የኮድ መስመርን የማይተገበር ያደርገዋል። አንድ ተራ ረቂቅ PR ተቀባይነት ያለው እጩ አይደለም። የ `hotfix` መሰየሚያ ማስረጃን አያስቀርም።

ሁለቱም የስራ ፍሰቶች PRs ወደ main/release ቅርንጫፎች ይሸፍናሉ፣ ወደ `main` ይገፋሉ፣ በእጅ መላኪያ እና የቡድን ውህደት ክስተቶች። ሙሉ ምርጫውን ይግፉ፣ ይላኩ እና ያዋህዱ። የታመነ Mergify ወረፋ ረቂቅ እንዲሁ የሚመለከታቸውን `full-code`/`full-code-e2e` ስራዎችን ይሰራል። ተራ PRs ይዝለሉዋቸው። በእጅ ከመዋሃድ በፊት፣ በትክክለኛው እጩ ላይ ሙሉ መላኪያ ያሂዱ። ወደ `release/**` የሚገፋፉ እነዚህን የስራ ሂደቶች አይጀምሩም; ልቀት-አረንጓዴ የተዋሃደውን መሰረት ለብቻው ይመለከታል (`docs/ops/RUNNER_BOX.md` → Hosted ሌይን)። ሹካ እና የተዋሃዱ ቡድኖች በራሳቸው የሚስተናገዱ ሯጮችን ለሚመርጡ ስራዎች የተስተናገዱ ሯጮችን ይጠቀማሉ። ከታቀደው ልቀት በፊት በቂ የተስተናገደ አቅም መረጋገጥ አለበት።

እያንዳንዱ JSON ደረሰኝ ተመዝግቦ የወጣውን SHA፣ የስራ ፍሰት ሩጫ እና ሙከራን ይለያል። CLI የ checkout/event SHA አለመዛመድን ውድቅ ያደርጋል። የስራ ፍሰት ፈተናዎች አዲስ ወይም የተወገደ መስመር በፀጥታ እንዳይጠፋ የፖሊሲ አባልነትን ከፍርዱ ሥራ `needs` ዝርዝር ጋር ያቆራኛሉ። ደረሰኞቹ የራሳቸውን የስራ ሂደት ይሸፍናሉ እንጂ ማተምን፣ ማሰማራትን ወይም ነባር የአማካሪ ስካነርን ውስጣዊ ነገሮች አይሸፍኑም። በቅርንጫፍ ደንቦች ውስጥ የሚፈለጉትን የሚመለከታቸው ቼኮች ማድረግ የተለየ አስተዳደራዊ ለውጥ ነው; ሥራቸውን መግለጽ ራሱ ቅርንጫፍን አይከላከልም.

`API Route Typecheck` ከሁለቱም ድምር ውሳኔዎች እና ከአካባቢው ሙሉ ተመልካቾች የማይንቀሳቀስ መገለጫ ውጭ የሆነ ራሱን የቻለ የስራ ፍሰት ፍተሻ ነው። ውጤቱን ለትክክለኛው እጩ በተናጠል ይፈትሹ. `.github/workflows/api-route-typecheck.yml` በ PRs ላይ ወደ `main` ወይም `release/**` ይሰራል፣ ወደ ቅርንጫፍ ቤተሰብ፣ በእጅ መላክ እና `merge_group` አይነት `checks_requested` ክስተቶችን ይገፋል። የመንገድ ማጣሪያ የለውም። ቡድኖችን ማዋሃድ `merge_group.head_sha` ን ይመልከቱ; ሌሎች ክስተቶች `github.sha` ይመልከቱ. ሁሉም ክስተቶች ተመሳሳይ API የምርመራ በር እና የበር ክፍል ሙከራዎችን ይጠቀማሉ። PR ቤዝ ዳግም ታርጌቶች አዲስ ቼክ ይጠይቃሉ; body/title አርትዖቶች የእይታ-ብቻውን `Admission not requested / API Route Typecheck` ስም ይጠቀማሉ እና የመግቢያ ቼክን መተካት አይችሉም።

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

### DAST የተረጋገጠውን የCI ግንባታ ይጠቀማል

አስገዳጁ የCI ስራ `dast-smoke` ከ`build` በኋላ `.github/workflows/dast-smoke.yml`ን ይጠራል። እንደ ግንባታው ተመሳሳይ የኮድ/ረቂቅ ምርጫ ይከተላል፤ የሚደገፉ fork PRዎች፣ releaseን የሚያነጣጥሩ PRዎችና የውህደት ቡድኖችም ይካተታሉ። የጎደለ፣ የከሸፈ፣ የተሰረዘ ወይም ባልተጠበቀ ሁኔታ የተዘለለ DAST ስራ `Gate / CI`ን ይዘጋል። ዳግም የሚጠቀሙበት ፍሰት የራሱ PR/dispatch ማስነሻ የለውም፤ የእጅ ማረጋገጫ CI dispatchን ይጠቀማል፣ ስለዚህ ግንባታና ተጠቃሚው በአንድ ሩጫ ይቆያሉ።

`scripts/ci/next-build-provenance.mjs` ሙሉውን Next ቅርስ ከtar ሃሽ፣ ማከማቻ/ክስተት/ሩጫ፣ አምራች ሙከራ፣ head/base/checkout/tree፣ የፍሰት መለያዎች፣ lockfile፣ ትክክለኛው Node ስሪት/ABI፣ መድረክና bundler ጋር ያስተሳስራል። DAST የማይለወጠውን የቅርስ ID ከ`needs.build.outputs` ይመርጣል፣ የወረደውን ሃሽ ማረጋገጥ ይጠይቃል፣ እና በ`scripts/ci/unpack-ci-build.py` በኩል የተፈቀዱ ሁለት አባላትን ከመክፈቱ በፊት ZIP ሃሽን በራሱ አስልቶ ከአምራቹ ሃሽ ጋር ያነጻጽራል። Next ዛፍ ከመከፈቱ በፊት ማኒፌስቱና tar ማህደሩም ከአምራቹ ገለልተኛ ውጤቶች ጋር መመሳሰል አለባቸው። በቅርንጫፉ ላይ የመጨረሻውን የተሳካ ግንባታ ፈጽሞ አይፈልግም። IDና ሁሉም ግብዓቶች አሁንም ከተመሳሰሉ፣ ከፊል ዳግም ሩጫ ያንኑ የአምራች ሙከራ ሊጠቀም ይችላል፤ የማስረጃ መዝገቡ ሁለቱንም ሙከራዎች ይይዛል።

ተጠቃሚው ማከማቻውን የማንበብ ፈቃድ ብቻ ባለው አስተናጋጅ Linux runner ላይ፣ ያለ ማከማቻ ምስጢሮች ይቆያል። የአምራቹን ትክክለኛ Node ስሪት ይጭናል፣ ከዚያ CLIን በ`OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` ይገነባል። `scripts/build/standaloneInput.mjs` ማንኛውም አማራጭ ግንባታ ከመጀመሩ በፊት የጎደለ standalone serverን ይከለክላል፤ መደበኛ አካባቢያዊ CLI ግንባታዎች ያላቸውን አማራጭ ይጠብቃሉ። የserver ዝግጁነት፣ Schemathesisና promptfoo ሁሉም በማይለወጠው የ25 ደቂቃ የስራ ገደብ ውስጥ መሳካት አለባቸው። የመነሻ መዝገብ የግብዓት መለያና ባይቶችን ያረጋግጣል፣ የተሳካ DAST ቅኝትን አይደለም። የቅርስ ጊዜ ማለፍ፣ runner መቋረጥ ወይም scanner መክሸፍ ያልተሟላ ወይም የከሸፈ ማስረጃ ነው፤ አማካሪ wrapper ይህን PASS ሊያደርገው አይችልም።

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

### የዩኒት አፈጻጸም ሂደት ደረሰኞች

የጋራው `test:unit:ci:shard` ትዕዛዝ የ`primary`፣ `dashboard` እና `serial`
ደረጃዎችን በ`scripts/ci/unit-progress-reporter.mjs` በኩል ይመዘግባል። መደበኛው የፈተና ሪፖርት እንደቀድሞው
ይገኛል። የሜታዳታ ብቻ የያዘ የተለየ ደረሰኝ የእያንዳንዱን ፋይል መጀመር እና ማጠናቀቅ
ይመዘግባል፤ በየ30 ሰከንዱ የሚላክ የልብ ምት ምልክትም አሁንም ንቁ የሆኑትን ፋይሎች እና ያለፈባቸውን ጊዜ ይዘረዝራል።
በፈቃድ ዝርዝር ውስጥ ያለውን የአፈጻጸም ሜታዳታ ብቻ ይመዘግባል፤ የፈተና መግለጫዎች፣ ውጤቶች፣ የስህተት ይዘቶች እና ሙሉው
አካባቢ ወደ ተከታታይ ቅርጽ አይቀየሩም።

CI የJSONL ፋይሎቹን በ`unit-progress-ci-<run>-<attempt>-<shard>` ስም ያቆያል። የሥራ ጊዜ ማብቂያ በኋላ የሚከናወነውን ሰቀላ ሊያግድ ይችላል፤
አስቀድመው የተላኩ የልብ ምት ምልክቶች እንደ የምርመራ ማስረጃ ይቀራሉ። የጎደሉ የልብ ምት ምልክቶች የታገደ ወይም
የተቋረጠ የማስኬጃ ሂደትንም ሊያመለክቱ ይችላሉ። እነዚህ ደረሰኞች ነባሩን የፈተና ምርጫ፣
በአንድ ጊዜ መከናወን፣ የጊዜ ገደቦች እና የመውጫ ሁኔታ እንዳሉ ይጠብቃሉ፤ የዕጩ ተቀባይነት ውሳኔዎች አይደሉም።

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

### የታተመ-መሰረታዊ ሰነዶች ጤና

`.github/workflows/i18n-base-health.yml` ወደ `main` እና `release/v*` ከተመረጡ በኋላ እና በእጅ በሚላክበት ጊዜ የሰነድ ጤናን ይመለከታል። ሰነዶቹን ፣ ስርወ ማርክዳውን ፣ `llm.txt`፣ ትርጉም state/configuration እና ተዛማጅ i18n መሳሪያዎችን ያጣራል። ነጠላ `Published base documentation health` ስራ የተስተናገደውን ኡቡንቱን እና የአምስት ደቂቃ የመጨረሻ ቀንን ይጠቀማል። ተነባቢ-ብቻ ማረጋገጫን ያከናውናል እና ያለ ጥገኝነት ጭነት፣ ትርጉም ወይም የግዛት ጉዲፈቻ የምርመራ ደረሰኝ ይጽፋል።

`scripts/i18n/check-base-health.mjs` ዜሮ የምንጭ-ሃሽ፣ የጠፋ-ዒላማ፣ ኢላማ-ሃሽ፣ የቆየ-ትርጓሜ እና የሴክሽን-መሸጎጫ አለመጣጣሞችን ይፈልጋል። እንዲሁም የአሁኑን ኮር document/locale ወሰን እና የተመዘገበውን ትክክለኛነት ያረጋግጣል። ልክ ያልሆነ አውድ፣ ያልተሟላ ሽፋን ወይም የተቋረጠ አረጋጋጭ `INCOMPLETE` ያዘጋጃል፤ የተረጋገጠ ተንሸራታች `FAIL` ይፈጥራል። ሁለቱም ያልተሳካ የመውጫ ሁኔታን ይመለሳሉ። ደረሰኙ SHA፣ የስራ ሂደት፣ መሮጥ እና መሞከሩ የማይቀር ነው እና `i18n-base-health-<sha>-<run>-<attempt>` ሆኖ እንዲቆይ ተደርጓል።

ይህ የታተመው መሠረት ገለልተኛ ምልከታ ነው። የ PR ወይም የውህደት ቡድን፣ የሚፈለግ PR ቼክ፣ npm ተለዋጭ ስም ወይም የማይንቀሳቀስ ፕሮፋይል አባል አይጨምርም። የስር አመልካች እንዲሁ ሁሉንም አምስቱን ክፍሎች በፍፁም ሁነታ ያግዳል። የተለመደው PR ዝግጅት ከመግባት ተለይቶ ይቀራል። የተሳካ ሰቀላ ያልተሳካ የጤና ውጤትን ወደ PASS መቀየር አይችልም።

አንድ ተራ PR `--preflight` በ `--baseline-evidence` የመነጨውን የመሠረት ሪፖርት ይጠቀማል። የተሟላው የትርጉም መዝገብ እና ትክክለኛው የዒላማ ባይት ከዚያ ትክክለኛ መሰረት ሳይለወጥ ሲቀር ብቻ የእንግሊዝኛ ምንጭን በመጠባበቅ ላይ ሊተው ይችላል። አዲስ የዒላማ ወይም የክፍል መሸጎጫ አለመጣጣሞች አሁንም ተዘግተዋል፣ እና ያልተሟሉ ማስረጃዎች ዝግጅትን ሊፈቅዱ አይችሉም። ሪፖርቱ `preparationPending` እና `mergeReady` ለየብቻ አጋልጧል፡ የተሳካ ዝግጅት በመጠባበቅ ላይ ያሉ ትርጉሞችን ለመዋሃድ ዝግጁ አያደርግም። ከመግባትዎ በፊት በተዋቀረው እጩ ውስጥ የተጎዱትን መስተዋቶች ያድሱ። የታመነው Mergify ወረፋ እጩ፣ `merge_group`፣ የቅርንጫፍ ግፊቶች እና በእጅ CI ሩጫዎች ያለ `--warn` ወይም የውርስ-ውርስ-ውድቀት ይቅርታ ፍፁም አረጋጋጭን ይጠቀማሉ። የጠፉ ኢላማ ሃሽ እና በተሰረዙ ዋና ፋይሎች የተቀነሰ ወሰን የተሳካ ፍፁም ፍርድ መስጠት አይችልም።

### PR ፈጣን መንገድን ይልቀቁ (`quality.yml`)

`.github/workflows/quality.yml` በ main/release PRs ላይ CI ያሟላል፣ ወደ `main` ይገፋል፣ ይላካል እና ቡድኖችን ያዋህዳል። PRs በመንገድ ላይ የተጣሩ ፈጣን ፍተሻዎችን ይጠቀማል። በቋሚነት የተሰናከለው የተባዛ ግንባታ ተወግዷል; ትክክለኛው build/package/boot ቼኮች በ CI ውስጥ ይቀራሉ.

| ኢዮብ                                              | ወሰን                                                                                                                                       | ማገድ           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs እና docs-all                                                                                                  | አዎ            |
| `Fast Quality Gates`                             | ኮድ PRs; የማይለዋወጥ ቼኮች፣ የጽሕፈት መኪና፣ የዳሽቦርድ ዓይነት ቼክ፣ ተጽዕኖ የተደረገባቸው የክፍል ሙከራዎች                                                                  | አዎ            |
| `Forgotten sibling tests`                        | ኮድ PRs; ወደ ቋሚ ሸማቾች እና የእጩ ወንድም እህት ፈተናዎች የተለወጡ ሞጁሎች; በርሜል እና ተለዋዋጭ-አስመጪ ዱካዎች እንደ የአማካሪ ምርመራዎች ሪፖርት ተደርገዋል፣ ከተጠቀሱት የተፈቀደ ዝርዝር ልዩ ሁኔታዎች ጋር። | **ምክር**       |
| `No new ESLint warnings`                         | ኮድ PRs; ጭቆና-የሚያውቅ lint ጠባቂ                                                                                                                | አዎ, ሹካዎችን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆነ PRs; changelog እና የመነጨ ችሎታ ማመሳሰል                                                                                                 | አዎ, ሹካዎችን ጨምሮ |

#### የተረሱ ወንድም እህት ፈተናዎች ሪፖርት ያደርጋሉ

`npm run check:forgotten-sibling-tests` ከሙከራ-ተፅእኖ ካርታ በስተጀርባ ያለውን የማስመጣት መፍትሄን እንደገና ይጠቀማል። ለእያንዳንዱ የተለወጠ የምርት ሞጁል፣ የእጩው ፈተና ከመጎተት-ጥያቄ ልዩነት በማይኖርበት ጊዜ ቆራጥ `changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ሪፖርት ያደርጋል። የMarkdown ማጠቃለያ እና JSON ውጤት ከማንኛውም የማገድ ልቀት በፊት እንደ `forgotten-sibling-tests` የስራ ፍሰት ቅርስ ተጠብቀዋል።

በርሜል እንደገና ወደ ውጭ መላክ እና ተለዋዋጭ ወደ አገር ውስጥ መግባቶች የመፍትሄ ምርመራዎች ብቻ ናቸው; የማገድ ግኝትን ፈጽሞ አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ `config/quality/forgotten-sibling-allowlist.json` ውስጥ ይኖራሉ። እያንዳንዱ ግቤት የሸማቹን እና የእጩዎችን ፈተና መሰየም፣ የተለየ ምክንያት መስጠት እና የ GitHub ጉዳይን ማገናኘት ወይም የመሳብ ጥያቄን ማያያዝ አለበት። የተበላሹ ምዝግቦች አልተዘጉም። ልዩ ሁኔታዎች የተሰረዘ እጩ ፈተናን ወይም `.skip`/`.todo` የሚጨምር ልዩነትን ማፈን አይችሉም። ማዳከም እና ሌሎች መሸፈኛዎች በተናጥል በተዘጋው `check:test-masking` በር ባለቤትነት ይቆያሉ።

### ሥራ፦ `lint`

ወደ `main` በሚቀርብ እያንዳንዱ PR ላይ ይሰራል። ሲወድቅ mergeን ያግዳል።

| ስክሪፕት (`npm run ...`)             | የሚያረጋግጠው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አጋጅ                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | የNode.js ስሪት በሚደገፈው ክልል ውስጥ መሆኑን                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                      |
| `check:cycles`                    | በሁሉም `src/` + `open-sse/` ውስጥ ያሉ ዑደታዊ imports (በAST ላይ የተመሠረተ፣ የtsconfig `paths` ተፈትተዋል)። ማንኛውም ዑደት በሚኖርበት ጊዜ መሠረታዊው ትዕዛዝ በ1 ይወጣል (ከ#15281 ጀምሮ fail-closed) እና SCCዎቹን ይዘረዝራል። `check:cycles:ratchet` (CI የሚያስኬደው) ብዛቱ በ`quality-baseline.json` ውስጥ ካለው የ`metrics.cycles` ከፍተኛ ገደብ ሲበልጥ ያግዳል — በአሁኑ ጊዜ 14፣ `direction: down`፣ ስለዚህ መቀነስ ብቻ ይችላል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                 | አዎ (ratchet)                            |
| `check:boundary`                  | የ`open-sse → src` ትስስር፦ ከengine ወደ app የሚደረጉ ልዩ ከፋይል-ወደ-ፋይል imports (`scripts/quality/measure-boundary.mjs`፤ የedge ዝርዝሩ የv4 core/module-split ማስተካከያ backlog ነው)። መሠረታዊው = የምክር ሪፖርት (ከ`quality:boundary` ጋር ተመሳሳይ)። `check:boundary:ratchet` (CI የሚያስኬደው፣ እንዲሁም በ`quality.yml` fast-gates ratchet loop ውስጥ ያለው) ብዛቱ በ`quality-baseline.json` ውስጥ ካለው የ`metrics.boundaryOpenSseToSrc` ከፍተኛ ገደብ ሲበልጥ ያግዳል — በተለካው 771 ላይ ተጀምሯል፣ `direction: down`፤ `--update` የሚያደርገው መቀነስ ብቻ ነው፤ በPRዎች ላይ ከbase አንጻር ይሰራል (`--base-ref`፣ ከታች ይመልከቱ)                                                                                                                                                                                                                                                               | አዎ (ratchet)                            |
| `check:route-validation:t06`      | Zod schemas በሁሉም routes ላይ መኖራቸውን (የTier 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                      |
| `check:any-budget:t11`            | የ`@ts-expect-error // any` ብዛት ከበጀቱ አያልፍም (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                      |
| `check:provider-consistency`      | በ`providers.ts` ውስጥ ያለ እያንዳንዱ አቅራቢ በ`providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እና በተቃራኒውም፣ በፈቃድ ዝርዝሩ ወሰን ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                      |
| `check:model-lifecycle`           | በእጅ የሚያዙት ሦስቱ የማዞሪያ ሰንጠረዦች በሪፖዚቶሪው ውስጥ ከተካተተው የሕይወት ዑደት ቅጽበታዊ ቅጂ (#11503) ጋር ወጥነታቸውን ይጠብቃሉ፦ `FITNESS_TABLE` (`taskFitness.ts`)፣ `REGISTRY` ሊያዞረው ለሚችል ከአገልግሎት የወጣ መለያ ነጥብ አይሰጥም፤ እያንዳንዱ የ`BUILT_IN_ALIASES` ዒላማ በ`REGISTRY` ውስጥ ይገኛል እና ከአገልግሎት የወጡ መለያዎች ቅጽበታዊ ቅጂ ውስጥ አይገኝም፤ አሁንም በ`REGISTRY` ውስጥ ያለ እያንዳንዱ ከአገልግሎት የወጣ መለያ ወደ ሌላ ቦታ ይተላለፋል ወይም በ`allowedRetiredInCatalog` ውስጥ ተዘርዝሯል፤ እንዲሁም የትኛውም የ`DEFAULT_DEGRADATION_MAP` ምንጭ ወይም ዒላማ በዚያ ቅጽበታዊ ቅጂ ውስጥ ከአገልግሎት እንደወጣ አይታይም። ይህ አንድ ሞዴል በአሁኑ ጊዜ ቀጥታ በሚሰራ የላይኛው ምንጭ እየቀረበ መሆኑን አያረጋግጥም። ከመስመር ውጭ — በ`config/quality/model-lifecycle.json` ላይ ያወዳድራል፤ ይህም በእጅ `npm run quality:refresh-model-lifecycle` በመጠቀም ይታደሳል (አውታረ መረብ ይፈልጋል፤ ከCI ጋር አልተያያዘም)። `allowedRetiredInCatalog` ቀስ በቀስ የሚቀንስ መቆጣጠሪያ ነው፦ ግቤት የሚታከለው ከክትትል ጉዳይ ጋር ብቻ ነው።          | አዎ                                      |
| `check:fetch-targets`             | በደንበኛ-ወገን `src/` ውስጥ ያለ እያንዳንዱ `fetch("/api/...")` ወደ ትክክለኛ `route.ts` ይፈታል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                      |
| `check:deps`                      | በሪፖዚቶሪው ውስጥ ባለ እያንዳንዱ `package.json` ውስጥ የሚገኙ፣ በ`npm install` ሊጫኑ የሚችሉ ጥገኞች በ`dependency-allowlist.json` ውስጥ ተካትተዋል፤ አዲስ ስሪታቸው ያልተቆለፈ ወይም slopsquatting የተደረገባቸው ጥቅሎች ምልክት ይደረግባቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                      |
| `audit:deps`                      | የአምስቱም ነጻ የቁልፍ ፋይሎች (root፣ Electron፣ OpenCode plugins v1/v2 እና provider) የnpm ኦዲት። ወሳኝ የደህንነት ማሳሰቢያዎች ያግዳሉ፤ ከፍተኛ ደረጃ ያላቸው ማሳሰቢያዎች ግን እንደሚታዩ ማስጠንቀቂያዎች ይቀራሉ። የጎደሉ ወይም ያልተሳኩ ኦዲቶች ያልተጠናቀቁ ተብለው ይቆጠራሉ እና ያግዳሉ፤ የእያንዳንዱ ወሰን የቁልፍ ፋይል ሃሾች እና ሪፖርቶች ይቀመጣሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | አዎ                                      |
| `check:lockfile`                  | የ`package-lock.json` ትክክለኛነት — https ሬጂስትሪ፣ የትክክለኛነት ሃሾች፣ የአስተናጋጅ ለውጦች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                      |
| `check:licenses`                  | ለምርት ጥገኛዎች የSPDX ፈቃድ የተፈቀዱ ዝርዝር                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                      |
| `check:tracked-artifacts`         | የግንባታ ቅርሶች / በማከማቻው የተመዘገቡ የ`node_modules` ምሳሌያዊ አገናኞች የሉም (በhusky pre-commit ውስጥም ይሠራል፤ pre-push ሆን ተብሎ ቀላል ተደርጓል — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                      |
| `check:ai-attribution`            | በPR ኮሚቶች፣ ርዕስ ወይም ይዘት ውስጥ የAI/ቦት `Co-Authored-By` መደምደሚያ ወይም የAI-ማመንጨት ግርጌ አይኖርም — ጥብቅ ደንብ #16 (ለPR→`release/**` በ`quality.yml` fast-gates ድግግሞሽ ውስጥ — የክስተቱን payload ያነባል፣ ከPR ውጭ ምንም አያደርግም — እንዲሁም ለPR→`main` በ`ci.yml` lint ውስጥ ያለ PR-ብቻ ደረጃ፤ እንዲሁም የhusky `commit-msg` hook፤ ሰብዓዊ ተባባሪ ደራሲዎች ይፈቀዳሉ፤ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | እያንዳንዱ የVitest ማግለል የክትትል ጉዳይን ይጠቅሳል እና በ`config/quality/vitest-exclusions.json` ውስጥ ይታያል (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | አዎ                                      |
| `check:file-size`                 | የምንጭ ፋይሎች (በ`src/`፣ `open-sse/`፣ `electron/`፣ `bin/` ውስጥ ያሉ `.ts`/`.tsx`) በ`cap` ውስጥ፣ የሙከራ ፋይሎች (`*.test.ts(x)`) ደግሞ በ`testCap` ውስጥ ይቆያሉ፤ በ`file-size-baseline.json` ውስጥ የታገዱ ፋይሎች (`frozen` / `testFrozen`) ከተመዘገበው መጠናቸው በላይ ማደግ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                      |
| `check:error-helper`              | በexecutors/handlers ውስጥ ያሉ የስህተት ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()` ይጠቀማሉ (ጥብቅ ደንብ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                      |
| `check:migration-numbering`       | የMigration SQL ፋይሎች ያለ ክፍተት ወይም ድግግሞሽ በቅደም ተከተል ቁጥር ተሰጥቷቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                      |
| `check:public-creds`              | ከ`publicCreds.ts` ውጭ ቀጥተኛ OAuth `client_id`/`client_secret` ወይም Firebase Web ቁልፎች የሉም (ጥብቅ ደንብ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                      |
| `check:db-rules`                  | ከ`src/lib/db/` modules ውጭ raw SQL የለም፤ ከ`localDb.ts` barrel-imports የሉም (ጥብቅ ደንቦች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | አዎ                                      |
| `check:known-symbols`             | በdispatch tables ውስጥ የተመዘገቡ provider executors፣ routing strategies እና translators በዲስክ ላይ ካሉት ፋይሎች ጋር ይዛመዳሉ — ወላጅ አልባ ወይም ያልታወጁ symbols የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                      |
| `check:route-guard-membership`    | child process የሚጀምር እያንዳንዱ route በ`isLocalOnlyPath()` ይመደባል (ጥብቅ ደንቦች #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                      |
| `check:test-discovery`            | በማከማቻው ውስጥ ያለ እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ የሙከራ አስኬጅ ይሰበሰባል (ratchet፦ በ`test-discovery-baseline.json` ውስጥ ያለው የወላጅ አልባ ፋይሎች ዝርዝር መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                      |
| `check:test-tla-order`            | በ`tests/unit` ስር ያለ ምንም `node:test` ፋይል ሙከራ ከመመዝገቡ፣ ከፍተኛ ደረጃ `await` ከማግኘቱ እና ከዚያም ተጨማሪ ሙከራዎችን ከመመዝገቡ አይቀጥልም (#18045፤ ratchet፦ `test-tla-order-allowlist.json` መቀነስ ብቻ ይችላል)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                      |
| `check:agent-skills-sync`         | የተፈጠሩት የወኪል-ክህሎት ቅርሶች ከምንጭ ካታሎጋቸው ጋር ይዛመዳሉ (ልዩነት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | የአቅራቢ አርማዎች/ንብረቶች የተመዘገበ የምንጭ መረጃ ግቤት አላቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | የJSON ውቅር ፋይሎች በትክክል ይተነተናሉ እና የማከማቻውን የlint ደንቦች ያሟላሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | ያለ ስህተቶች የTypeScript ማጠናቀር (የምክር ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | አዎ                                      |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊትን ያማከለ፤ ቀድሞ የነበሩ ብዙ የጥሪ ቦታዎች አሁንም ማብራሪያዎችን ይፈልጋሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **የምክር ብቻ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | በ`src/app/(dashboard)/**` ላይ ብቻ የተወሰነ `tsc` (#7033) — የ`typecheck:core` በጥንቃቄ የተመረጠው የ27 ፋይሎች የፈቃድ ዝርዝር ምንም የዳሽቦርድ TSX አያካትትም፣ እንዲሁም `next build` ፈጽሞ የአይነት ማረጋገጫ አያደርግለትም (`next.config.mjs` `ignoreBuildErrors: true`ን ያዘጋጃል)፣ ስለዚህ በዚያ ያሉ የብቸኛ-መለያ ድግግሞሽ ስህተቶች (#6625/#6909) ለCI የማይታዩ ነበሩ። ልዩነቶችን ከተቆለፈ በእያንዳንዱ ፋይል/በእያንዳንዱ TS ኮድ ብዛት መነሻ (`config/quality/dashboard-typecheck-baseline.json`፣ ከ`check:known-symbols` ጋር ተመሳሳይ የጊዜ ያለፈበትን የማስገደድ ንድፍ) ጋር ያነጻጽራል — ከመነሻው ብዛት በላይ ያሉ አዲስ ስህተቶች ብቻ በሩን ያሳንፋሉ፤ አስቀድሞ የነበረ ስህተት ሲስተካከል በ`--update` የመነሻውን ወሰን ወደ ታች ያስተካክሉ።                                                                                                                                                                                                                        | አዎ                                      |
| `check:build-typecheck`           | በ`tsconfig.build.json` ላይ የሚካሄድ የመላው መተግበሪያ የምርት አይነት ምርመራ (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`)፤ የ`typecheck:core` 27-ፋይል የመፍቀጃ ዝርዝርና dashboard መግቢያ የማይሸፍኑትን ክልል ይሸፍናል። ልዩነቶችን ከ`config/quality/build-typecheck-baseline.json` ጋር ያወዳድራል፤ አዲስ ወይም የጨመረ በ(ፋይል፣ ኮድ) የተከፋፈለ ቁጥር ይወድቃል፣ የቀነሰ ቁጥር ግን መነሻውን ወደታች እንዲያስተካክሉ ይጠይቃል። ሩጫው አዲስ ወይም የጨመረ ጥንድ እስካለው ድረስ `--update` እምቢ ይላል፣ `--force-regressions` ካልተሰጠው በስተቀር፤ እንዲሁም አዲስ ዝም የተባለ ፋይል ካለ `--force-nocheck` ካልተሰጠ ይከለክላል። ስለዚህ አረንጓዴ ሁኔታ ለማግኘት መነሻ መስመሩን ማስፋትና ቋሚ ዝምታን መፍቀድ ሁለት የተለያዩ በሆን ብሎ የሚደረጉ ተግባራት ናቸው። ብቻውን የሚጠቀም `--force` ውድቅ ይደረጋል። እንዲሁም የግንባታ ክልሉን `@ts-nocheck` ከ`config/quality/ts-nocheck-baseline.json` ጋር ይመረምራል፤ ምክንያቱም ይህን የሚጠቀም ፋይል ምንም የምርመራ ውጤት ስለማያቀርብ በሁሉም መግቢያዎች ላይ ሳይታይ ሊቀር ይችላል። | አዎ                                      |

#### ሁለቱ የአይነት ምርመራ ፕሮግራሞች የተለያዩ መልሶችን ይሰጣሉ

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) እና `check:build-typecheck` በተለያዩ አማራጮች ስር የተለያዩ
ፕሮግራሞችን ያጠናቅራሉ፣ እና ያው ፋይል በአንዱ ንጹህ ሆኖ በሌላው
በስህተቶች የተሞላ ሊሆን ይችላል።

`tsconfig.build.json` `"strict": false` ያስቀምጣል፣ ስለዚህ `noImplicitAny` ጠፍቷል። የcore
ውቅረት በእጅ የተመረጠ 27-ፋይል የመፍቀጃ ዝርዝርን በጠንከሩ አማራጮች
ያጠናቅራል፣ እና የእያንዳንዱን ግቤት የማስመጣት ግራፍ ይከተላል፤ ስለዚህ
በግንባታ ፕሮግራሙ ውስጥ ፈጽሞ የማይታዩ ፋይሎች እዚያ አሁንም ይመረመራሉ።

ይህ ውጤት አንድ ፋይል በአይነት የተደራጀ መሆኑን በሚገመግሙበት ጊዜ ጠቃሚ
ነው፦ **በ`check:build-typecheck` ስር ዜሮ ምርመራዎች መኖራቸው ዜሮ ማለት አይደለም**። `@ts-nocheck`ን ከ26
ፋይሎች ማስወገድ 23ቱ በግንባታ ፕሮግራሙ ንጹህ እንደሆኑ አሳየ፤ ከእነዚህ
ውስጥ 16ቱ በጥብቁ ፕሮግራም ውስጥ ወደ 120 የሚጠጉ የimplicit-any ስህተቶችን
አሳዩ። አንድ ፋይል ንጹህ ነው ከማለትዎ በፊት ሁለቱንም ይመርምሩ።

### ሥራ፦ `quality-gate`

ከ`test-coverage` በኋላ ይሠራል። ሲወድቅ ውህደትን ያግዳል።

| ስክሪፕት                        | የሚያረጋግጠው                                                                                                                           | አጋጅ                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `quality:collect`            | `quality-metrics.json`ን ያወጣል (የESLint ማስጠንቀቂያዎች ብዛት፣ ከተዋሃደው የሻርድ ሪፖርት የተገኘ ሽፋን)                                                    | አዎ (ከደረጃ-መቆጣጠሪያው በፊት) |
| `quality:ratchet`            | በ`quality-baseline.json` ውስጥ ያለ እያንዳንዱ መለኪያ አልተባባሰም (የESLint ማስጠንቀቂያዎች ≤ መነሻ፤ ሽፋን ≥ መነሻ)                                           | አዎ                    |
| `check:duplication`          | የኮድ ድግግሞሽ (jscpd@4) በ`quality-baseline.json` ውስጥ ካለው መነሻ አያልፍም                                                                     | አዎ                    |
| `check:complexity`           | የፋይል-ደረጃ ሳይክሎማቲክ ውስብስብነት ከከፍተኛው ገደብ አያልፍም (ዋናው ESLint `complexity` + `max-lines-per-function`)                                     | አዎ                    |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ደረጃ-መቆጣጠሪያ (`eslint-plugin-sonarjs`) — የተለየ የESLint ሂደት፤ CI ሁለቱንም እንደ አንድ `check:complexity-ratchets` ደረጃ አዋህዶ ያስኬዳል | አዎ                    |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ ወደ ውጭ የተላኩ ነገሮች / ፋይሎች ደረጃ-መቆጣጠሪያ (knip) ከመነሻው ጋር ሲነጻጸር አይባባስም                                                         | አዎ                    |
| `check:compression-budget`   | የመጭመቅ መለኪያ የበጀት ገደብ — በእያንዳንዱ ኤንጂን የቶከን ቁጠባ ዝቅተኛ ገደቦች መባባስ የለባቸውም                                                                  | አዎ                    |
| `check:type-coverage`        | በመቶኛ የአይነት ሽፋን ደረጃ-መቆጣጠሪያ (`type-coverage`) አይባባስም፤ በአብዛኛው `typecheck:noimplicit:core`ን ይሸፍናል                                      | አዎ                    |

### ስራዎች፦ `codeql-scan` እና `codeql-admission`

`codeql-scan` የተዋቀሩ የትንተና ምድቦችን ሁሉ ያመነጫል። ይህ ስራ ከተሳካ በኋላ `codeql-admission` ትክክለኛ ሰቀላዎቹንና የእጩውን ማስጠንቀቂያ አለመጨመር ገደብ ያረጋግጣል። ሁለቱም ሰነዶችን ብቻ ለሚቀይሩ እጩዎችም ጨምሮ የ`Gate / CI` አስገዳጅ ጥገኞች ናቸው። የአስተዳደር ማንቃትና canary መስፈርቶች ከታች ባለው "የCodeQL ገደብ" ተገልጸዋል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                                     | ይከለክላል |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:codeql-ratchet` | የማስጠንቀቂያ ገደቡ ከመፈተሹ በፊት የእጩ ref/SHAና ሁሉም ምድቦች ወቅታዊ መሆን አለባቸው፤ የጎደለ ማስረጃ ይከለክላል። አጠቃላይ ዝርዝር ለብቻ ይቆያል — ከታች "የCodeQL ገደብ" ይመልከቱ | አዎ     |

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

### ሥራ `docs-sync-strict`

ለ `main` ወይም `release/**` የመሳብ ጥያቄዎች ይህ ስራ የሚሰራው በሰነድ ወይም በኮድ ለውጦች ለተመደቡ ረቂቅ (ወይም የታመነ ወረፋ) እጩዎች ብቻ ነው። በተጨማሪም ያልሆኑ PR CI ክስተቶች ላይ ይሰራል; የዚህ የስራ ሂደት የግፋ ቀስቅሴ `main` ሳይሆን `release/**` ብቻ ነው የሚሸፍነው። ከዜሮ ውጪ የሚወጣ እርምጃ ስራውን ያግዳል; ሪፖርት-ብቻ ግኝቶች እና ከዚህ በታች የተመዘገቡ ነፃነቶች አያደርጉም።

| ስክሪፕት                          | የሚያረጋግጠው                                                                                                                                                                                                                                                | እገዳ                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `check:docs-all`               | ከታች ያሉትን 7 ንዑስ ማረጋገጫዎች በቅደም ተከተል የሚያስኬድ አጠቃላይ ማረጋገጫ                                                                                                                                                                                                     | አዎ                                                                                          |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG ሥሪት ወጥነት፣ ትክክለኛ `llm.txt` መስተዋቶች፣ የተተረጎመ CHANGELOG section/size ልዩነቶች እና የተባዙ ሰነዶች አለመኖር                                                                                                                                      | አዎ                                                                                          |
| ↳ `check:docs-frontmatter`     | የተጠናቀሩ የሰነድ ገጾች ትክክለኛ የፊት ጉዳይ ርዕሶችን ይይዛሉ                                                                                                                                                                                                                | አዎ                                                                                          |
| ↳ `check:docs-counts`          | ከፍተኛ እምነት ቆጠራ invariants ጥብቅ ናቸው; ሂዩሪስቲክ የፋይል ቆጠራ ቼኮች የሚያስጠነቅቁት ስክሪፕቱ `--strict` እስካልተቀበለ ድረስ ብቻ ነው (የ CI ሜታ በር አያልፈውም)                                                                                                                                 | ጥብቅ ደረጃ ማገድ; ለስላሳ ደረጃ ምክር                                                                   |
| ↳ `check:env-doc-sync`         | ምንጭ env ያነባል፣ `.env.example` እና `docs/reference/ENVIRONMENT.md` በግልፅ ችላ፣ ዶክ-ብቻ እና የኢንቪ-ብቻ የፈቃድ ዝርዝሮች በኋላ ይስማማሉ።                                                                                                                                         | አዎ፣ ከተመዘገቡት የተፈቀደ ዝርዝሮች ውጭ                                                                  |
| ↳ `check:deprecated-versions`  | ችላ የተባሉ ሰነዶችን ሳይጨምር የቆዩ ስሪቶችን ከአስተማማኝ ታሪካዊ አውዶች እና የቆዩ የዝማኔ ቀኖች ውጭ ሪፖርት ያደርጋል                                                                                                                                                                           | ምክር አሁን ባለው CI ሽቦ (`--strict` አላለፈም)                                                        |
| ↳ `check:doc-links`            | የውስጥ ምልክት ማድረጊያ አገናኞች በሰነዶች ውስጥ ወደ እውነተኛ ፋይሎች (`[text]`/`(path)` ቅጽ) ይፈታሉ                                                                                                                                                                               | አዎ                                                                                          |
| ↳ `check:fabricated-docs`      | መንገዶች፣ env vars፣ CLI ትዕዛዞች፣ መንጠቆ ስሞች እና በሰነዶች ውስጥ የተጠቀሱ የፋይል መንገዶች በኮድ ቤዝ ውስጥ አሉ። በ `--strict` በኩል ጠንካራ በር; ያለ ባንዲራ ለስላሳ-ውድቀት።                                                                                                                          | አዎ (በ `--strict` በ CI በኩል)                                                                  |
| `check:cli-i18n`               | ጥቅም ላይ የዋሉ የCLI `t()` ቁልፎች በ`en` ውስጥ አሉ፤ `pt-BR` እያንዳንዱን የላይኛው ደረጃ ክፍል ይጠብቃል፤ `zh-CN` እና `zh-TW` ሁሉንም የ`en` ቁልፎች ይይዛሉ                                                                                                                                   | አዎ                                                                                          |
| `check:openapi-coverage`       | የOpenAPI ዝርዝር መግለጫ ቢያንስ በratchet የተወሰነውን ዝቅተኛ የእውነተኛ መንገዶች ብዛት እንደሚሸፍን                                                                                                                                                                                  | አዎ                                                                                          |
| `check:openapi-security-tiers` | የታወጁት `x-loopback-only`/`x-always-protected` ማብራሪያዎች በ`routeGuard.ts` መደገፍ አለባቸው፤ የፓርሰርና የወደፊት አቅጣጫ አለመዛመዶች ያግዳሉ። ለአካባቢያዊ ብቻ ቅድመ ቅጥያዎች ስር የጎደለ `x-loopback-only`ን የሚፈትሸው የተቃራኒ አቅጣጫ ማረጋገጫ ማስጠንቀቂያ ይሰጣል፤ በንድፍ ብቻ የተገለጹ መንገዶች ከዚያ የተቃራኒ ፍተሻ ይወገዳሉ።        | የፓርሰር/የወደፊት አቅጣጫ ማረጋገጫዎች ያግዳሉ፤ የተቃራኒ አቅጣጫ ማረጋገጫው ማስጠንቀቂያ ብቻ ይሰጣል                            |
| `check:openapi-routes`         | ምክንያት የተሰጠበት የ`KNOWN_STALE_SPEC` ልዩ ፈቃድ ዝርዝር ከተተገበረ በኋላ፣ በ`openapi.yaml` ውስጥ ያለ እያንዳንዱ `/api...` ዱካ የፓራሜትር ልዩነቶችን ሳይመለከት ከእውነተኛ መንገድ ጋር ይዛመዳል፤ ያረጁ የልዩ ፈቃድ ዝርዝር ግቤቶችም ማረጋገጫውን ያስወድቃሉ                                                                    | አዎ                                                                                          |
| `check:docs-symbols`           | በቅጂ ያልሆኑ ቀዳሚ ሰነዶች ውስጥ ያሉ ውስጣዊ የ`/api/...` URL ማጣቀሻዎች ከእውነተኛ መንገድ ወይም የመንገዶች ቤተሰብ ጋር ይዛመዳሉ፤ የproxy/upstream/ቦታ ያዥ/ፋይል ማጣቀሻዎችና ምክንያት የተሰጣቸው የ`KNOWN_STALE_DOC_REFS` ግቤቶች ይገለላሉ፣ ያረጁ የልዩ ፈቃድ ዝርዝር ግቤቶች ግን ማረጋገጫውን ያስወድቃሉ                                   | አዎ                                                                                          |
| `i18n translation drift`       | ፍፁም ቅበላ ዜሮ ምንጭ፣ የጠፋ ኢላማ፣ ኢላማ-ሃሽ፣ የቆየ-ትርጓሜ እና የሴክሽን መሸጎጫ አለመጣጣሞችን ይፈልጋል። የተለመደው PR ዝግጅት ትክክለኛ የውርስ ማስረጃ ወይም እንግሊዝኛ ብቻ በመጠባበቅ ላይ ያለ ለውጥ ሳይለወጥ የተሟላ ሁኔታ እና የዒላማ ባይት; ሪፖርቱ የውህደት ዝግጁነትን ገልጿል። የጠፋ ኢላማ ሃሽ እና ያልተሟላ የመሠረት ማስረጃ እገዳ። የሌጋሲ ክፍል መሸጎጫ ውድቀት አይደለም። | ሁሉም አምስቱ ክፍሎች queue/base መግቢያን ያግዳሉ; ተራ የዝግጅት ፈቃድ የተረጋገጠ በውርስ ወይም በእንግሊዝኛ ብቻ የሚቆይ ሥራ ብቻ ነው። |

በ `docs/diagrams/` ስር ያሉት አስራ ሁለቱ README SVGs ይፈጠራሉ (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ሁሉንም ያድሳል)። እያንዳንዳቸው የባይት-ንጽጽር አሃድ ሙከራ (`tests/unit/docs/readme-*-svg.test.ts`, ሥራ `test-unit`) የተፈጸመው ፋይል ጊዜ ያለፈበት ሲሆን, እና `check:docs-counts` ቀኖናዊ ቁጥሮችን ከ `<text>` ኖዶቻቸው — ያነባል ለዚህ ነው የማብራሪያው ደረጃ በፋይሉ ውስጥ ያሉትን እያንዳንዱን ሕብረቁምፊዎች እንደ የማይታይ `<text>` ያቆያል. የ SVG ቀኖናዊ-ቁጥሮች ቼክ በ `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, እና `public/images/tier-flow-dark.svg` እና `tier-flow-light.svg` ውስጥ የተዘረዘሩትን ፋይሎች ያነባል; የነፃው ዘላለማዊ፣ ካታሎግ-ግቤት፣ ተደጋጋሚ ገንዳ እና የውጤት መንስኤዎች የይገባኛል ጥያቄዎችም `promise-pillars.svg`፣ `free-tier-budget.svg` እና `strategies-grid.svg` አንብበዋል። `free-tier-budget.svg` አሃዞቹን ከቀጥታ ካታሎግ ጫኚ ላይ ይሳሉ፣ ስለዚህ ወደ `FREE_MODEL_BUDGETS` ወይም ወደ አቅራቢው መቀየር ያ ፋይል እስኪታደስ ድረስ CI ስም ቀይሮታል።

### ስራ፦ `i18n-ui-coverage`

| ስክሪፕት                               | የሚያረጋግጠው                                                                                                                                                         | አጋጅ     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check-ui-keys-coverage` (ውስጠ-መስመር) | የUI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                                        | አዎ      |
| `check-ui-value-drift` (ውስጠ-መስመር)   | እንደገና የተጻፈ የእንግሊዝኛ **እሴት** ከኋላው ጊዜ ያለፈበት ትርጉም እንዳይቀር ያረጋግጣል                                                                                                      | አዎ      |
| `check-new-key-coverage` (ውስጠ-መስመር) | **አዲስ** የእንግሊዝኛ ቁልፍ በእያንዳንዱ አካባቢያዊ ቋንቋ ተተርጉሟል — የ`__MISSING__:` ምልክት ውድቅ ይደረጋል                                                                                   | አዎ      |
| `check-translation-ratio`           | በእያንዳንዱ አካባቢያዊ ቋንቋ ያለው የእውነተኛ ትርጉም ሬሾ (ከእንግሊዝኛ ጋር ተመሳሳይ / ቦታ ያዥ / ከፈቃድ ዝርዝሩ ውጭ የጎደሉ ቅጠሎች) `config/quality/i18n-translation-baseline.json` + የመፍቀጃ ህዳግን ማለፍ የለበትም | **አጋጅ** |

`fetch-depth: 0` ያስፈልገዋል — የእሴት-ለውጥ መከላከያው `en.json`ን ከውህደት መሠረቱ ጋር ያነጻጽራል።

#### `check-ui-value-drift` — የአረጀ ትርጉም ጌት

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

ሙሉ የi18n ማረጋገጫ ማትሪክስ (ለእያንዳንዱ አካባቢያዊ ቋንቋ አንድ ሥራ)። መላው ሥራ አማካሪ ነው።

| ስክሪፕት                           | የሚያረጋግጠው               | አጋጅ                                             |
| ------------------------------- | ---------------------- | ----------------------------------------------- |
| `validate_translation.py quick` | በአካባቢያዊ ቋንቋ የትርጉም ሙሉነት | **አማካሪ** (በመላው ሥራ ላይ `continue-on-error: true`) |

### ሥራ፦ `pr-test-policy`

በpull requestዎች ላይ ብቻ ይሠራል።

| ስክሪፕት                  | የሚያረጋግጠው                                                                                                        | አጋጅ |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | --- |
| `check:pr-test-policy` | በ`src/`፣ `open-sse/`፣ `electron/` ወይም `bin/` ውስጥ ያለ የምርት ኮድን የሚቀይሩ PRዎች ሙከራዎችን ማካተት ወይም ማዘመን አለባቸው (ጥብቅ ደንብ #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የሙከራ ፋይሎች የተጣራውን የassert ብዛት እንዳይቀንሱ ወይም `assert.ok(true)` tautologyዎችን እንዳይጨምሩ                           | አዎ  |
| `check:pr-evidence`    | የPR ይዘት ለለውጡ የሙከራ/VPS ማስረጃን ይጠቅሳል (የPR ጽሑፍን በgrep በማድረግ ጥብቅ ደንብ #18ን በራስ-ሰር ያስፈጽማል — ተሰባሪ ነው፣ Backlogን ይመልከቱ)   | አዎ  |

### ሥራ፦ `test-vitest`

የ`changes` ምደባ ሥራን ይፈልጋል። ተፈጻሚ የማትሪክስ ክፍሎች ካልተሳኩ ውህደቱን ያግዳሉ።

| ስብስብ             | የሚያረጋግጠው                                               | አጋጅ                                                                                |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሣሪያዎች)፣ autoCombo፣ cache — vitest አስኬጅ | አዎ                                                                                 |
| `test:vitest:ui` | የUI ክፍሎች ሙከራዎች — vitest አስኬጅ                           | **አጋጅ** — ቀድሞ የነበሩ ውድቀቶች በ`vitest.config.ts` ውስጥ በግልጽ ተገልለዋል፤ አዲስ ውድቀቶች ሥራውን ያሳኩታል |

### የሌሊት የሥራ ፍሰቶች (በጊዜ ሰሌዳ የሚሠሩ፣ አማካሪ)

እነዚህ በcron የጊዜ ሰሌዳ (እና `workflow_dispatch`) ላይ ይሠራሉ፣ በPRዎች ላይ ፈጽሞ አይሠሩም። ሁሉም አማካሪ ናቸው።

| የስራ ፍሰት                | የሚያረጋግጠው                                                                                                                                      | አጋጅ        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | የ fast-check ባህሪ ሙከራዎች፣ በዘፈቀደ seed እና ከፍተኛ የማስኬጃ ብዛት                                                                                          | **ምክር ሰጪ** |
| `nightly-resilience`   | የ heap ዕድገት መቆጣጠሪያ፣ የ chaos ስህተት ማስገባት፣ የ k6 ጭነት/የረጅም ጊዜ ጭነት ሙከራ                                                                              | **ምክር ሰጪ** |
| `nightly-llm-security` | የ promptfoo የጥቃት ግቤት መከላከያ (የማገድ ሁነታ) + የ garak ፍተሻዎች (የአቅራቢ ሚስጥር ከሌለ ይዘለላሉ)                                                                  | **ምክር ሰጪ** |
| `nightly-schemathesis` | `docs/openapi.yaml`ን በመጠቀም በቀጥታ በሚሰራ OmniRoute ላይ የ OpenAPI ውል fuzzing (schemathesis) — የዝርዝር መግለጫ ጥሰቶችን / ያልተያዙ 500 ስህተቶችን ያጋልጣል (ደረጃ 8 B.4) | **ምክር ሰጪ** |
| `nightly-mutation`     | በፈጣኑ የ unit መስመር ላይ የ Stryker mutation-testing ውጤት — ከሙከራው ያለፉ mutants ደካማ ማረጋገጫዎችን ያጋልጣሉ                                                     | **ምክር ሰጪ** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ላይ የ Node engine ተኳኋኝነት matrix                                                                                     | **ምክር ሰጪ** |

የአፈጻጸም መነሻ መለኪያዎች (heap፣ TTFB፣ የ build ጊዜ) ይመዘገባሉ እንጂ እንደ ማለፊያ መስፈርት አይጠቀሙም፦ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)ን ይመልከቱ (`npm run perf:lts-baseline`)።

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

### CodeQL ratchet፡ የእጩ መግቢያ እና የማከማቻ ክምችት

CI ግልጽ በሆነ የጥገኝነት ሰንሰለት እጩ CodeQL መግቢያ ባለቤት ነው `codeql-scan` ባለ አራት ቋንቋ ማትሪክስ በ `codeql.yml` ይደውላል፣ ከዚያ `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` ያስኬዳል። `Gate / CI` ሁለቱንም ውጤቶች ይፈልጋል። ጥራት የራሱን የቁጥር ቼኮች ይይዛል ነገር ግን አምራቹ ሳይጨርስ ስካነሩን አይጠይቅም። `Gate / Quality` ብቻ ሙሉ እጩ መግባት አይደለም። በዶክመንቶች-ብቻ እጩዎች ላይ CodeQL ይቀራል።

በ `config/quality/codeql-admission-policy.json` ውስጥ ያለው ፖሊሲ Actions፣ C/C++፣ JavaScript/TypeScript እና Python፣ መጠይቅ ስዊት ነባሪ፣ የርቀት ስጋት ሞዴል እና የግንባታ ሁነታን አይመርጥም። የአምራች ቅድመ በረራ በመጠባበቅ ላይ ያለ የማግበሪያ ሪኮርድን እና ቅርንጫፎችን ከኢላማ ዝርዝር ውጭ ውድቅ ያደርጋል። አሁን ያሉት ኢላማዎች ዋና ናቸው እና release/v3.8.54. የኮንትራት ሙከራዎች ይህንን የመጨረሻ ዝርዝር እና የጥገና ግፊት ቀስቅሴን ከጥቅል ስሪት ጋር ያወዳድራሉ; የሚቀጥለው ልቀት በመሳፈር ላይ መገምገም አለበት። አሁን ያለው የ CI ሰፊ ልቀት PR ቀስቅሴ እንደቀጠለ ነው፣ነገር ግን ተሳፍሮ የሌለው ኢላማ ያልተለካ PASS ከማግኘት በፊት HOLD ሪፖርት ያደርጋል።

እያንዳንዱ የማትሪክስ ስራ ትክክለኛውን SARIF ሰቀላ ID፣ ቋንቋ፣ ምድብ፣ ሩጫ እና ሙከራ፣ የደዋይ የስራ ፍሰት ማንነትን፣ ክስተት ref/head/base/merge SHA እና የመመሪያ ሃሽ ይመዘግባል። ጥገኛው ስራ የዚህን አሂድ ደረሰኞች ብቻ ያወርዳል እና አርቲፊሻል ማጭበርበሮችን ያረጋግጣል። ሁሉንም አራት ምድቦች፣ የተሳካ አምራች እና የእያንዳንዱን ትክክለኛ ሰቀላ የተጠናቀቀ ሂደት ይፈልጋል። የሚጠቀመው የ API's sarif_id ማጣሪያ ነው እንጂ በቅርንጫፍ ላይ የሚገኘውን የቅርብ ጊዜ ትንታኔ አይደለም። ከፊል ድጋሚ ሩጫዎች ቀደም ሲል ከተመሳሳይ ሩጫ እና እጩ ሙከራ የተሳካ ምድቦችን እንደገና ሊጠቀሙ ይችላሉ ፣ ይህም የማምረት ሙከራውን ይጠብቃል ፣ ያልተሳካ የአሁኑ አምራች ቀዳሚውን አረንጓዴ ማስረጃ እንደገና መጠቀም አይችልም።

የ CodeQL እርምጃ ሂደቱን እስኪያጠናቅቅ ይጠብቃል፣ ነገር ግን የተሰካው ትግበራው ሁኔታን ከተነበበ ውድቀት ወይም ከደከመ ጥበቃ በኋላ ሊያስጠነቅቅ እና ሊቀጥል ይችላል። መግቢያ ስለዚህ ሂደቱን እንደገና ያረጋግጣል። የጎደሉ ምድቦች፣ በመጠባበቅ ላይ ያሉ፣ ያልተሳኩ ወይም የተሰረዙ ስራዎች፣ የቆዩ ማንነት፣ ያልተሟላ የገጽታ መግለጫ ወይም የማይገኝ APIs HOLD ያመርታሉ እና ይውጡ 2. ገለልተኛ ስካነር የስራ ፍሰት የተወሰነ ጊዜ መጠበቅ ይቀራል። ያልተቃኘ PR ማለፍ አይችልም ምክንያቱም የማንቂያ መጠይቅ ስለተመለሰ 0. የተለካ ቆጠራ ከ `metrics.codeqlAlerts.value` በላይ 1 ይወጣል; የሌላ ቅርንጫፍ ማንቂያዎችን ለመምጠጥ መነሻው አልተነሳም. [የሰቀላ ሁኔታ እና የትንታኔ ፍለጋ](https://docs.github.com/en/rest/code-scanning/code-scanning) ።

ደረሰኙ መዝገቦች ሰቀላ እና ትንተና IDs, ምድቦች, የመሣሪያ ስሪቶች, ref/SHA, መነሻ መስመር እና ማንቂያ ቁጥሮች. SARIF identity/result ቆጠራ፣ ዝቅተኛው የደንብ ቆጠራዎች እና ትክክለኛ የማንቂያ አጋጣሚዎች አስገዳጅ ሆነው ይቆያሉ። PR/analysis ማንነቶች ከመቀበላቸው በፊት እንደገና ይጣራሉ። እነዚህ ቼኮች የተዋቀረ የምድብ ሽፋን እንጂ የእያንዳንዱ የተወጣ ምንጭ ፋይል ዝርዝር አይደሉም። C/C++ ምንም-ግንባታ ማውጣት በፕሮጀክት ግንባታ ወቅት የተፈጠረውን ኮድ አያካትትም። የምንጭ ማግለያዎች አሁንም ግምገማ ያስፈልጋቸዋል፣ እና የአስተዋጽዖ አበርካች ባህሪ ተመጣጣኝ ትክክለኛ መሰረት ያለው ማስረጃ ያስፈልገዋል።

`codeql-maintenance.yml` ንቁ የሚለቀቁ የግፋ ስካን እና ሳምንታዊ መርሃ ግብሮችን PR/main አምራቾችን ሳያባዙ ያቀርባል። `nightly-codeql-inventory.yml` የማጠራቀሚያውን ሰፊ መነሻ መስመር ከ `--strict-measurement` እና መለካት በማይቻልበት ጊዜ አለመሳካቱን ይለያል። የአካባቢያዊ ቅርስ ሰብሳቢው ግርማ ሞገስ መዝለል የእጩ መግባት አይደለም። ከተረጋገጠ ዝቅተኛ የአለም ቆጠራ በኋላ ማጥበቅ ግልጽ የሆነ `--update` ነው።

ነባሪ ማዋቀር ሲዋቀር የላቀ የስራ ሂደት መታተም የለበትም GitHub ያንን ጥምር ውድቅ ያደርጋል። የተገመገመው አስተዳደራዊ ሽግግር ተመልሶ እስኪነበብ ድረስ የተሻሻለው ፖሊሲ በመጠባበቅ ላይ ይቆያል። ከመታተሙ በፊት አንድ ኦፕሬተር ማከማቻውን፣ head/base/tree፣ policy/patch/rollback hashes እና የማዋቀር ሁኔታን ይስተካከላል፤ `node scripts/quality/codeql-producer.mjs verify-admin-readback` የሚጠበቀውን እና ትክክለኛ JSON መዝገቦችን ይፈትሻል። ይህ ቴክኒካል ጠባቂ እንጂ የኦፕሬተር ማፅደቅ ወይም አዲስ ንባቦችን ለማምጣት ምትክ አይደለም። የ PR ማስመሰያው የአስተዳደር መዳረሻን በጭራሽ አይጠይቅም። ልቀት እና ማንኛውም የስካነር ለውጥ የተለየ ንባብ እና እውነተኛ PR፣ ሹካ እና የቡድን ውህደት ተኳሃኝነት ማስረጃ ያስፈልጋቸዋል።

ሹካዎች የተስተናገዱ ሯጮችን ይጠቀማሉ፣ ያለማቋረጥ ምስክርነቶችን ይመልከቱ፣ በአምራቹ ውስጥ install/build ፕሮጀክት የለም፣ እና ምንም የተወረሱ የመረጃ ማከማቻ ሚስጥር የለም። GitHub በተቀነሰ ሹካ ማስመሰያ ለ pull_request ክስተት SARIF ሰቀላን ይደግፋል። ለመጀመሪያ ጊዜ አስተዋጽዖ ማስፈጸሚያ ማጽደቅ GitHub ፖሊሲ ይቀራል። የማይታመን ኮድ ለማስፈጸም ፑል_request_ታርትን በጭራሽ አይጠቀሙ። ፍልሰት መጠናቀቁን ከማሰብዎ በፊት ትክክለኛ የማስመሰያ ፈቃዶችን፣ የመተንተን_ቁልፍ እና ሁሉንም የምድቡ አካባቢዎች በቁጥጥር ስር ባለው ካናሪ ያረጋግጡ። [የሹካ ሰቀላ ህጎች](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible) ፣ [የሚጋጩ የማዋቀር ሁነታዎች](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows) ።

**ማሰናበት የኦፕሬተሩ ጥሪ ነው (Hard Rule #14)** — በተሰናበተ አስተያየት ውስጥ የቴክኒክ ማረጋገጫውን ሳይመዘግብ የ CodeQL ማንቂያን በጭራሽ አያሰናብትም፡- `won't fix` ለላይ-ዥረት ፕሮቶኮል መስፈርት፣ `used in tests` ለሙከራ መሣሪያ፣ `false positive` ለጽዳት ማጽጃ CodeQL ማየት አይችልም (ቅድመ ሁኔታ `docs/security/ERROR_SANITIZATION.md`)።

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

**ከላይ ያልተሰነዱትም** (አማካሪ፣ ዝቅተኛ ጠቋሚ)፦ `docs-lint` ስራ (markdownlint + Vale፣ ሙሉ ስራው `continue-on-error`) እና ገለልተኛ የscanner ፍሰቶች `semgrep.yml` / `scorecard.yml`። CodeQL አሁን ከላይ ባሉት የማንቃት መስፈርቶች ስር በ`Gate / CI` ውስጥ አስገዳጅ የአምራችና የተቀባይነት ስራዎች አሉት። `semgrepFindings: 0` በ`quality-baseline.json` ውስጥ አለ፣ ግን በ`ci.yml` ከከልካይ ገደብ ጋር አልተገናኘም — ይህ መለኪያ በአሁኑ ጊዜ ያለ ግንኙነት ነው።

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
