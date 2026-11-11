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

የ CI እና የጥራት ጌትስ የስራ ፍሰቶች እያንዳንዳቸው የተረጋጋ ብይን ይሰጣሉ፡- `Gate / CI` እና `Gate / Quality`። የእነርሱ ስሪት ያለው የመግቢያ ፖሊሲ እንደ አስፈላጊነቱ ወይም እንደ ምክር ሁሉንም የወራጅ ስራዎችን ይዘረዝራል። የሚመለከተው አስፈላጊ ሥራ ስኬታማ መሆን አለበት፡ የጠፋ፣ የተሰረዘ፣ የተዘለለ፣ በመጠባበቅ ላይ እና ያልታወቁ ውጤቶች PASS መመስረት አይችሉም። የሚሰራ ሰነዶች-ብቻ ወይም ካታሎግ-ብቻ ምደባ የኮድ መስመርን የማይተገበር ያደርገዋል። አንድ ተራ ረቂቅ PR ተቀባይነት ያለው እጩ አይደለም። የ `hotfix` መሰየሚያ ማስረጃን አያስቀርም።

ሁለቱም የስራ ፍሰቶች PRs ወደ main/release ቅርንጫፎች ይሸፍናሉ፣ ወደ `main` ይገፋሉ፣ በእጅ መላኪያ እና የቡድን ውህደት ክስተቶች። ሙሉ ምርጫውን ይግፉ፣ ይላኩ እና ያዋህዱ። የታመነ Mergify ወረፋ ረቂቅ እንዲሁ የሚመለከታቸውን `full-code`/`full-code-e2e` ስራዎችን ይሰራል። ተራ PRs ይዝለሉዋቸው። በእጅ ከመዋሃድ በፊት፣ በትክክለኛው እጩ ላይ ሙሉ መላኪያ ያሂዱ። ወደ `release/**` የሚገፋፉ እነዚህን የስራ ሂደቶች አይጀምሩም; ልቀት-አረንጓዴ የተዋሃደውን መሰረት ለብቻው ይመለከታል (`docs/ops/RUNNER_BOX.md` → Hosted ሌይን)። ሹካ እና የተዋሃዱ ቡድኖች በራሳቸው የሚስተናገዱ ሯጮችን ለሚመርጡ ስራዎች የተስተናገዱ ሯጮችን ይጠቀማሉ። ከታቀደው ልቀት በፊት በቂ የተስተናገደ አቅም መረጋገጥ አለበት።

አንድ ተራ PR ፈጣን ምርጫን ይሰራል። የ `full-code` እና `full-code-e2e` መስመሮች የመግቢያ ፖሊሲ (E2E፣ ውህደት ፣ የጥቅል አርቲፊክት ፣ Electron ጭስ ፣ Bun SQLite፣ ሥነ ምህዳራዊ እና ፕሮቶኮል ደንበኞች) በ Mergify ወረፋ ረቂቅ ላይ ወይም ሙሉ ሩጫ ላይ ብቻ ነው የሚሰሩት: `gh workflow run ci.yml --ref <branch>`.

እያንዳንዱ JSON ደረሰኝ ተመዝግቦ የወጣውን SHA፣ የስራ ፍሰት ሩጫ እና ሙከራን ይለያል። CLI የ checkout/event SHA አለመዛመድን ውድቅ ያደርጋል። የስራ ፍሰት ፈተናዎች አዲስ ወይም የተወገደ መስመር በፀጥታ እንዳይጠፋ የፖሊሲ አባልነትን ከፍርዱ ሥራ `needs` ዝርዝር ጋር ያቆራኛሉ። ደረሰኞቹ የራሳቸውን የስራ ሂደት ይሸፍናሉ እንጂ ማተምን፣ ማሰማራትን ወይም ነባር የአማካሪ ስካነርን ውስጣዊ ነገሮች አይሸፍኑም። በቅርንጫፍ ደንቦች ውስጥ የሚፈለጉትን የሚመለከታቸው ቼኮች ማድረግ የተለየ አስተዳደራዊ ለውጥ ነው; ሥራቸውን መግለጽ ራሱ ቅርንጫፍን አይከላከልም.

`API Route Typecheck` ከሁለቱም ድምር ውሳኔዎች እና ከአካባቢው ሙሉ ተመልካቾች የማይንቀሳቀስ መገለጫ ውጭ የሆነ ራሱን የቻለ የስራ ፍሰት ፍተሻ ነው። ውጤቱን ለትክክለኛው እጩ በተናጠል ይፈትሹ. `.github/workflows/api-route-typecheck.yml` በ PRs ላይ ወደ `main` ወይም `release/**` ይሰራል፣ ወደ ቅርንጫፍ ቤተሰብ፣ በእጅ መላክ እና `merge_group` አይነት `checks_requested` ክስተቶችን ይገፋል። የመንገድ ማጣሪያ የለውም። ቡድኖችን ማዋሃድ `merge_group.head_sha` ን ይመልከቱ; ሌሎች ክስተቶች `github.sha` ይመልከቱ. ሁሉም ክስተቶች ተመሳሳይ API የምርመራ በር እና የበር ክፍል ሙከራዎችን ይጠቀማሉ። PR ቤዝ ዳግም ታርጌቶች አዲስ ቼክ ይጠይቃሉ; body/title አርትዖቶች የእይታ-ብቻውን `Admission not requested / API Route Typecheck` ስም ይጠቀማሉ እና የመግቢያ ቼክን መተካት አይችሉም።

### በተቀባይ ተቀባይ ውስጥ የተያዙ ማስረጃዎች

`scripts/quality/validate-release-acceptance.mjs` የቀረበውን እቅድ እና መግለጫዎቹን ይቀንሳል; እቅዱ የተጠናቀቀውን የመልቀቂያ ቧንቧ የሚሸፍን መሆኑን አያረጋግጥም. የእሱ ሪፖርቶች በግልጽ `releaseAcceptance: false` አዘጋጅተዋል፣ ምንም እንኳን ያ እቅድ `VERIFIED` ቢሆንም። የ `release-acceptance.yml` የስራ ፍሰቱ አሁንም ቢሆን የጥላ ዕቃዎችን ይጠቀማል እንጂ እውነተኛ ግንባታ፣ ጥቅል፣ ቡት ወይም የማስተዋወቂያ ደረሰኞች አይደለም።

የተያዙ ማስረጃዎችን ለማረጋገጥ CLI `--evidence-root` ያስፈልገዋል። ፋይሎች እንደ `<evidence-root>/<artifact_id>/<member>` ተፈትተዋል እና እንደ SHA-256 የተጠለፉ ናቸው። የ PASS መዝገብ ያለ ማስረጃ፣ የጠፋ ወይም የተለወጠ ፋይል፣ ደህንነቱ ያልተጠበቀ መንገድ ወይም ሲምሊንክ ማረጋገጥን ይከለክላል። የጎደሉ ፋይሎች ስኬታማ ከሆኑ ምዝግብ ማስታወሻዎች ባዶ ጋር እኩል አይደሉም። አሁን ያሉት SHA/run/attempt ቼኮች ነጻ ሆነው ይቆያሉ፡ ተዛማጅ ባይት የቆየ ደረሰኝን ማዳን አይችልም። የፋይል ታማኝነት የአፈፃፀም ትክክለኛነት ወይም የቅርስ ማስተዋወቅ ማረጋገጫ አይደለም።

### DAST የተረጋገጠውን CI ግንባታ ይበላል።

የሚፈለገው `dast-smoke` CI ሥራ ከ `build` በኋላ `.github/workflows/dast-smoke.yml` ይደውላል። ከግንባታው ጋር ተመሳሳይ code/draft ምርጫን ይከተላል፣ የሚደገፍ ሹካ PRs፣ የተለቀቀው ኢላማ PRs እና ቡድኖችን ያዋህዳል። የጠፋ፣ ያልተሳካ፣ የተሰረዘ ወይም ሳይታሰብ የተዘለለ DAST የስራ ብሎኮች `Gate / CI`. እንደገና ጥቅም ላይ ሊውል የሚችል የስራ ፍሰት ምንም ገለልተኛ PR/dispatch ቀስቅሴ የለውም; በእጅ ማረጋገጥ ግንባታው እና ሸማቹ በአንድ ሩጫ እንዲቆዩ CI መላክን ይጠቀማል።

`scripts/ci/next-build-provenance.mjs` ሙሉውን ቀጣይ ቅርስ በታርስ መፍጨት፣ repository/event/run፣ የአምራች ሙከራ፣ head/base/checkout/tree፣ የስራ ፍሰት መታወቂያዎች፣ የመቆለፊያ ፋይል፣ ትክክለኛ መስቀለኛ መንገድ version/ABI፣ መድረክ እና ጥቅል። DAST የማይለወጠውን ቅርስ ID ከ `needs.build.outputs` ይመርጣል፣ የማውረድ መፍጨት ማረጋገጫ ያስፈልገዋል፣ እና ሁለቱን የተፈቀዱ አባላትን በ `scripts/ci/unpack-ci-build.py` ከማውጣቱ በፊት ZIP በፕሮዲዩሰር መፍጨት ላይ ራሱን ችሎ ሃሽቷል። የሚቀጥለው ዛፍ ከመውጣቱ በፊት አንጸባራቂው እና ታር ማህደሩ ከገለልተኛ የአምራች ውጤቶች ጋር መዛመድ አለባቸው። የቅርብ ጊዜውን የተሳካ የቅርንጫፍ ግንባታ በጭራሽ አይፈልግም። የ ID እና ሁሉም ግብዓቶች አሁንም ሲዛመዱ ከፊል ድጋሚ አሂድ ያንን ተመሳሳይ የአምራች ሙከራ እንደገና ሊጠቀምበት ይችላል። ደረሰኙ ሁለቱንም ሙከራዎች ይመዘግባል.

ተገልጋዩ ተነባቢ-ብቻ ማከማቻ ፍቃድ እና ምንም የማጠራቀሚያ ሚስጥር ሳይኖረው በተስተናገደ Linux ሯጭ ላይ ይቆያል። የአምራቹን ትክክለኛ የመስቀለኛ መንገድ ስሪት ይጭናል፣ ከዚያ CLI ከ `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` ጋር ይሰበስባል። `scripts/build/standaloneInput.mjs` ከማንኛውም ውድቀት በፊት የጠፋውን ራሱን የቻለ አገልጋይ ውድቅ ያደርጋል። መደበኛ የአካባቢ CLI ግንቦች ነባሩን ውድቀታቸውን ያቆያል። የአገልጋይ ዝግጁነት፣ Schemathesis እና Quickfoo ሁሉም ባልተለወጠው የ25-ደቂቃ የስራ ገደብ ውስጥ ስኬታማ መሆን አለባቸው። የፕሮቨንስ ደረሰኝ የግቤት ማንነትን እና ባይት ያረጋግጣል እንጂ የተሳካ DAST ቅኝት አይደለም። አርቲፊሻል የአገልግሎት ጊዜው ያለፈበት፣ የሯጭ መቋረጥ ወይም ያልተሳካ ስካነር ያልተሟላ ወይም ያልተሳካ ማስረጃ ሆኖ ይቆያል። በአማካሪ መጠቅለያ በኩል PASS መሆን አይችልም።

### UI የማስፈጸም አቅም

CI ሙሉውን UI ክምችት እንደ አራት `test-vitest` ማትሪክስ ሸርተቴ ያካሂዳል፣ እያንዳንዳቸው ቢበዛ በሻርድ ሁለት ሰራተኞች እና አሁን ያለው የ15-ደቂቃ የስራ ጊዜ ገደብ አለው። የመጀመሪያው ሻርድ የ MCP/autoCombo Vitest ስብስብንም ይሰራል። የሚፈለገው የሥራ ውጤት እያንዳንዱን ማትሪክስ እግር ይሸፍናል; የአንድ ሻርድ ውድቀት ወይም መሰረዝ የእጩ መግቢያን መመስረት አይችልም።

የማታ ታዛቢው በመጀመሪያው ደረሰኝ ላይ MCP አፈፃፀምን ጨምሮ ለእያንዳንዱ UI ሻርድ የተለየ ትክክለኛ የእጩ ደረሰኝ ይይዛል። አራቱም ደረሰኞች፣ ምዝግብ ማስታወሻዎች እና ተዛማጅ የማስፈጸሚያ መታወቂያዎች ያስፈልጋሉ። አካባቢያዊ `npm run test:vitest:ui` አሁንም የተሟላውን ስብስብ ይመርጣል; አንድ `--shard` ሩጫ ከፊል ማስረጃ ብቻ ነው።

### የክፍል ሽፋን መሰብሰብ

አስራ ሁለቱ ክፍል ሻርዶች አሁን ባለው የሙከራ አፈፃፀም የV8 ሽፋን ይሰበስባሉ። የተሳካ ሻርድ መካከለኛ የኢስታንቡል ዘገባ ሳያመነጭ የመጀመሪያዎቹን ፋይሎች ለመጭመቅ `scripts/ci/compact-v8-coverage.mjs` ያስኬዳል። የመጨረሻው የሽፋን ስራ አስራ ሁለቱን መገለጫዎች በእጩ SHA፣ Runtime፣ የምንጭ ስርወ እና ዳታ ሃሽ ላይ ያረጋግጣል፣ ከዚያም የ c8 ዘጋቢዎችን እና ነባር የሽፋን ገደቦችን ያስኬዳል። ግብዓቶች የ c8ን ዓለም አቀፍ የፋይል ስም ቅደም ተከተል ይይዛሉ; በአንድ ሻርድ ቅድመ-ውህደት ለተደባለቀ function/block ሽፋን ደህንነቱ የተጠበቀ ነው። የጎደሉ፣ የተበላሹ ወይም ተኳዃኝ ያልሆኑ ሻርዶች መግባት አልቻሉም። ያልተሳካ የሙከራ ፍርስራሾች ጥሬ የመመርመሪያ ሽፋንን በተናጠል ይይዛሉ; ወደ መጨረሻው ውህደት መግባት አይችልም.

### የክፍል አፈጻጸም ሂደት ደረሰኞች

የተጋራው `test:unit:ci:shard` ትዕዛዝ `primary`፣ `dashboard` እና `serial` ደረጃዎችን በ `scripts/ci/unit-progress-reporter.mjs` ይመዘግባል። የተለመደው የፈተና ዘገባ እንዳለ ይቆያል። የተለየ ሜታዳታ-ብቻ ደረሰኝ የእያንዳንዱን ፋይል መጀመሪያ እና ማጠናቀቅ ይመዘግባል፣ እና የ30 ሰከንድ የልብ ምት ፋይሎቹ አሁንም ንቁ እና ያለፉበትን ጊዜ ይዘረዝራል። የተፈቀደ ዝርዝር ማስፈጸሚያ ሜታዳታን ብቻ ይመዘግባል; የፈተና መግለጫዎች፣ ውፅዓት፣ የስህተት አካላት እና ሙሉ አካባቢው በተከታታይ አልተዘጋጁም።

CI የ JSONL ፋይሎችን እንደ `unit-progress-ci-<run>-<attempt>-<shard>` ያቆያል። አንድ የሥራ ጊዜ ማብቂያ በኋላ ሰቀላ ሊከለክል ይችላል; ቀደም ሲል የወጡ የልብ ምቶች የምርመራ ማስረጃዎች ይቀራሉ። የጠፉ የልብ ምቶች እንዲሁ የታገደ ወይም የተቋረጠ ሯጭ ሂደትን ሊያንፀባርቅ ይችላል። እነዚህ ደረሰኞች ነባሩን የፈተና ምርጫ፣ ተመሳሳይነት፣ የግዜ ገደብ እና የመውጫ ሁኔታን ያቆያሉ። እጩ የመግባት ብይን አይደሉም።

### ወረፋ አዋህድ

የ `queue` መለያው PR ወደ Mergify ወረፋ (`.mergify.yml`) ይልካል። Mergify በ `mergify/merge-queue/` ቅርንጫፍ ላይ PR ረቂቅ ይከፍታል፣ CI ሙሉ ምርጫውን እዚያ ያካሂዳል፣ እና የመጀመሪያው PR `Gate / CI`፣ `Gate / Quality` እና `Merge integrity (changelog + generated skills)` ሲያልፉ ይዋሃዳሉ።

Mergify የወረፋ ማጠቃለያውን ወደ ረቂቁ መግለጫ ይጽፋል። Body/title-only `pull_request` `edited` ክስተቶች አሂድ-ተኮር የሆነ የተመጣጣኝ ቡድን ይጠቀማሉ እና ምደባን፣ የሙከራ ማትሪክቶችን፣ የታማኝነትን ውህደት ወይም የመግቢያ ፍርድን እንደገና አይጀምሩም። የእይታ-ብቻ የፍተሻ ስሞች `Gate / CI` ወይም `Gate / Quality` መተካት አይችሉም። የታለመውን መሠረት የሚቀይር አርትዕ አዲስ እጩ ማረጋገጫ ይጠይቃል።

ከድል በኋላ፣ መግፋት ሁልጊዜ PR አይጠይቅም። በላዩ ላይ `@mergifyio queue` አስተያየት ይስጡ.

### የማይንቀሳቀስ ቅኝት ክምችት

የተሻሻለው npm-alias inventory እና static-scan አባልነት በ `config/quality/gate-manifest.json` ውስጥ በቀጥታ ስርጭት። የስክሪፕት ስሞችን እና ትክክለኛ ትዕዛዞችን በ `package.json` ላይ ለማረጋገጥ `npm run check:gate-manifest` ያሂዱ; ተጨማሪዎች፣ ማስወገጃዎች እና የትዕዛዝ ተንሸራታች የአካባቢ መንጠቆ እና በ CI ውስጥ ያሉ የለውጥ ምደባ ስራዎች ወድቀዋል። ተለዋጭ ስም የስራ ፍሰት ስራ፣ ማትሪክስ ምሳሌ ወይም የሙከራ ጉዳይ አይደለም፡ እነዚህ ቆጠራዎች ሊለዋወጡ የሚችሉ ሆነው መቅረብ የለባቸውም።

የተመረጡትን ተለዋጭ ስሞች ሳትፈጽም ለመመርመር `npm run quality:scan -- --list` ወይም `npm run quality:scan:fast -- --list` ይጠቀሙ። ሯጩ የ npm መግቢያ ነጥብን ይጠራል፣ ስለዚህ የሩጫ ሰዓቱ (የተቀናበረ Bun ጨምሮ) ተጠብቆ ይቆያል። አንጸባራቂው ከነዚያ መገለጫዎች ውጭ ተለዋጭ ስሞችን ለብቻው በተጠራ መልኩ ይመዘግባል፣ እና የጥገና ትዕዛዞች በተነባቢ-ብቻ ቅኝት መገለጫዎች የተከለከሉ ናቸው።

እነዚህ መገለጫዎች የማይንቀሳቀስ ቅኝትን ብቻ ይሸፍናሉ። የምርት ሙከራዎችን፣ ሽፋንን፣ ማሸግን፣ የውጭ ቼኮችን ወይም የእጩን ሙሉ ልቀት መቀበሉን አያረጋግጡም። የስራ ፍሰት መግቢያ የተገናኘውን `config/quality/admission-policy.json` እና `scripts/quality/admission-verdict.mjs` ይጠቀማል። የመልቀቂያ-ታዛቢ መገለጫዎች ተለይተው ይቀራሉ; የሚመለከታቸውን ቼኮች እና ደረሰኞች በተናጥል ይፈትሹ። የሙሉ ታዛቢው የማይለዋወጥ ትዕዛዞች በ `config/quality/release-green-static-profile.json` ውስጥ ይታወቃሉ፣ `audit:deps`፣ ሚውቴሽን-ሙከራ ምርጫ እና የትርጉም ፍተሻዎችን ጨምሮ። ጫኚው የ npm ትዕዛዞችን ከ package.json እና ሞዴል የተደረገው CI/Quality መግለጫዎችን ያጸናል፤ የሼል ቶከኖችን እንደ ክርክሮች ከማስፈጸም ይልቅ መንሸራተትን ውድቅ ያደርጋል። የሚያስፈልግ ስካነር SKIP/INCOMPLETE ውፅዓት PASS መመስረት አይችልም። መገለጫው ውጫዊ ማግለያዎቹን ይመዘግባል እና የተስተናገደ ሽፋን፣ የሙከራ ማትሪክስ፣ ጥቅል ወይም የማሰማራት ማስረጃዎችን አይተካም። ከታች ያለው የስድ መዝገብ ዝርዝር ዋቢ እንጂ በር በትክክል መሮጡን ማረጋገጫ አይደለም።

ስክሪፕቶች በ `scripts/check/` (የፖሊሲ በሮች) እና `scripts/quality/` (የራትኬት ሞተር) ስር ይኖራሉ። የ CI የእውነት ምንጭ `.github/workflows/ci.yml` ነው።

### የታተመ-መሰረታዊ ሰነዶች ጤና

`.github/workflows/i18n-base-health.yml` ወደ `main` እና `release/v*` ከተመረጡ በኋላ እና በእጅ በሚላክበት ጊዜ የሰነድ ጤናን ይመለከታል። ሰነዶቹን ፣ ስርወ ማርክዳውን ፣ `llm.txt`፣ ትርጉም state/configuration እና ተዛማጅ i18n መሳሪያዎችን ያጣራል። ነጠላ `Published base documentation health` ስራ የተስተናገደውን ኡቡንቱን እና የአምስት ደቂቃ የመጨረሻ ቀንን ይጠቀማል። ተነባቢ-ብቻ ማረጋገጫን ያከናውናል እና ያለ ጥገኝነት ጭነት፣ ትርጉም ወይም የግዛት ጉዲፈቻ የምርመራ ደረሰኝ ይጽፋል።

`scripts/i18n/check-base-health.mjs` ዜሮ የምንጭ-ሃሽ፣ የጠፋ-ዒላማ፣ ኢላማ-ሃሽ፣ የቆየ-ትርጓሜ እና የሴክሽን-መሸጎጫ አለመጣጣሞችን ይፈልጋል። እንዲሁም የአሁኑን ኮር document/locale ወሰን እና የተመዘገበውን ትክክለኛነት ያረጋግጣል። ልክ ያልሆነ አውድ፣ ያልተሟላ ሽፋን ወይም የተቋረጠ አረጋጋጭ `INCOMPLETE` ያዘጋጃል፤ የተረጋገጠ ተንሸራታች `FAIL` ይፈጥራል። ሁለቱም ያልተሳካ የመውጫ ሁኔታ ይመለሳሉ። ደረሰኙ SHA፣ የስራ ሂደት፣ መሮጥ እና መሞከሩ የማይቀር ነው እና `i18n-base-health-<sha>-<run>-<attempt>` ሆኖ እንዲቆይ ተደርጓል።

ይህ የታተመው መሠረት ገለልተኛ ምልከታ ነው። የ PR ወይም የውህደት ቡድን፣ የሚፈለግ PR ቼክ፣ npm ተለዋጭ ስም ወይም የማይንቀሳቀስ ፕሮፋይል አባል አይጨምርም። የስር አመልካች እንዲሁ ሁሉንም አምስቱን ክፍሎች በፍፁም ሁነታ ያግዳል። የተለመደው PR ዝግጅት ከመግባት ተለይቶ ይቀራል። የተሳካ ሰቀላ ያልተሳካ የጤና ውጤትን ወደ PASS መቀየር አይችልም።

አንድ ተራ PR `--preflight` በ `--baseline-evidence` የመነጨውን የመሠረት ሪፖርት ይጠቀማል። የተሟላው የትርጉም መዝገብ እና ትክክለኛው የዒላማ ባይት ከዚያ ትክክለኛ መሰረት ሳይለወጥ ሲቀር ብቻ የእንግሊዝኛ ምንጭን በመጠባበቅ ላይ ሊተው ይችላል። አዲስ የዒላማ ወይም የክፍል መሸጎጫ አለመጣጣሞች አሁንም ተዘግተዋል፣ እና ያልተሟሉ ማስረጃዎች ዝግጅትን ሊፈቅዱ አይችሉም። ሪፖርቱ `preparationPending` እና `mergeReady` ለየብቻ አጋልጧል፡ የተሳካ ዝግጅት በመጠባበቅ ላይ ያሉ ትርጉሞችን ለመዋሃድ ዝግጁ አያደርግም። ከመግባትዎ በፊት በተዋቀረው እጩ ውስጥ የተጎዱትን መስተዋቶች ያድሱ። የታመነው Mergify ወረፋ እጩ፣ `merge_group`፣ የቅርንጫፍ ግፊቶች እና በእጅ CI ሩጫዎች ያለ `--warn` ወይም የውርስ-ውርስ-ውድቀት ይቅርታ ፍፁም አረጋጋጭን ይጠቀማሉ። የጠፉ ኢላማ ሃሽ እና በተሰረዙ ዋና ፋይሎች የተቀነሰ ወሰን የተሳካ ፍፁም ፍርድ መስጠት አይችልም።

### PR ፈጣን መንገድን ይልቀቁ (`quality.yml`)

`.github/workflows/quality.yml` በ main/release PRs ላይ CI ያሟላል፣ ወደ `main` ይገፋል፣ ይላካል እና ቡድኖችን ያዋህዳል። PRs በመንገድ ላይ የተጣሩ ፈጣን ፍተሻዎችን ይጠቀማል። በቋሚነት የተሰናከለው የተባዛ ግንባታ ተወግዷል; ትክክለኛው build/package/boot ቼኮች በ CI ውስጥ ይቀራሉ. አሃዱ ስብስብ እና vitest የሚሄዱት በ CI (`Unit Tests (N/12)` እና `Vitest`) ውስጥ ብቻ ነው።

| ኢዮብ                                              | ወሰን                                                                                                                                       | ማገድ           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API ሰነዶች ማጣቀሻዎች እና ሰነዶች-ሁሉም                                                                                                | አዎ            |
| `Fast Quality Gates`                             | ኮድ PRs; የማይለዋወጥ ቼኮች፣ የጽሕፈት መኪና፣ የዳሽቦርድ ዓይነት ቼክ፣ ተጽዕኖ የተደረገባቸው የክፍል ሙከራዎች                                                                  | አዎ            |
| `Forgotten sibling tests`                        | ኮድ PRs; ወደ ቋሚ ሸማቾች እና የእጩ ወንድም እህት ፈተናዎች የተለወጡ ሞጁሎች; በርሜል እና ተለዋዋጭ-አስመጪ ዱካዎች እንደ የአማካሪ ምርመራዎች ሪፖርት ተደርገዋል፣ ከተጠቀሱት የተፈቀደ ዝርዝር ልዩ ሁኔታዎች ጋር። | **ምክር**       |
| `No new ESLint warnings`                         | ኮድ PRs; ጭቆና-የሚያውቅ lint ጠባቂ                                                                                                                | አዎ, ሹካዎችን ጨምሮ |
| `Merge integrity (changelog + generated skills)` | ረቂቅ ያልሆነ PRs; changelog እና የመነጨ ችሎታ ማመሳሰል                                                                                                 | አዎ, ሹካዎችን ጨምሮ |

#### የተረሱ ወንድም እህት ፈተናዎች ሪፖርት ያደርጋሉ

`npm run check:forgotten-sibling-tests` እንደ `Fast Quality Gates` የማማከር ደረጃ ይሰራል እና የማስመጣት መፍቻውን ከሙከራ-ተጽእኖ ካርታው በስተጀርባ ይጠቀማል። ለእያንዳንዱ የተለወጠ የምርት ሞጁል፣ የእጩው ፈተና ከመጎተት-ጥያቄ ልዩነት በማይኖርበት ጊዜ ቆራጥ `changed module/symbol -> static consumer -> candidate sibling test` ሰንሰለቶችን ሪፖርት ያደርጋል። የማርክዳው ማጠቃለያ እና JSON ውጤት ከማናቸውም እገዳዎች በፊት እንደ `forgotten-sibling-tests` የስራ ፍሰት ቅርስ ሆኖ እንዲቆይ ተደርጓል።

በርሜል እንደገና ወደ ውጭ መላክ እና ተለዋዋጭ ወደ አገር ውስጥ መግባቶች የመፍትሄ ምርመራዎች ብቻ ናቸው; የማገድ ግኝትን ፈጽሞ አይፈጥሩም። የተገመገሙ ልዩ ሁኔታዎች በ `config/quality/forgotten-sibling-allowlist.json` ውስጥ ይኖራሉ። እያንዳንዱ ግቤት የሸማቹን እና የእጩዎችን ፈተና መሰየም፣ የተለየ ምክንያት መስጠት እና የ GitHub ጉዳይን ማገናኘት ወይም የመሳብ ጥያቄን ማያያዝ አለበት። የተበላሹ ምዝግቦች አልተዘጉም። ልዩ ሁኔታዎች የተሰረዘ እጩ ፈተናን ወይም `.skip`/`.todo` የሚጨምር ልዩነትን ማፈን አይችሉም። ማዳከም እና ሌሎች መሸፈኛዎች በተናጥል በተዘጋው `check:test-masking` በር ባለቤትነት ይቆያሉ።

### ሥራ `lint`

በእያንዳንዱ PR ወደ `main` ይሰራል። እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስክሪፕት (`npm run ...`)             | ያረጋግጣል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ማገድ                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:node-runtime`              | Node.js ስሪት በሚደገፈው ክልል ውስጥ ነው።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                  |
| `check:cycles`                    | በሁሉም የ `src/` + `open-sse/` (AST ላይ የተመሰረተ፣ tsconfig `paths` ተፈትቷል) በክብ ማስመጣት ማንኛውም ዑደት ባለ ቁጥር ባዶ 1 ይወጣል (ከ #15281 ጀምሮ አልተዘጋም) እና SCCs ይዘረዝራል። `check:cycles:ratchet` ( CI ምን ይሰራል) ያግዳል ቁጥሩ በ `quality-baseline.json` — በአሁኑ ጊዜ 14፣ `direction: down` ውስጥ ካለው `metrics.cycles` ጣሪያ ሲያልፍ ይወድቃል (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ (አይጥ)                            |
| `check:boundary`                  | `open-sse → src` መጋጠሚያ፡ ልዩ የሆነ የፋይል-ወደ-ፋይል ከኤንጂን ወደ አፕሊኬሽኑ ማስመጣት (`scripts/quality/measure-boundary.mjs`፤ የጠርዝ ዝርዝር የv4 core/module-split ማሻሻያ መዝገብ ነው)። ባዶ = የማማከር ሪፖርት (ከ `quality:boundary` ጋር ተመሳሳይ)። `check:boundary:ratchet` (ምን CI ይሰራል, እንዲሁም `quality.yml` ፈጣን-በርቶች ratchet loop ውስጥ) ያግዳል ጊዜ ቆጠራ `metrics.boundaryOpenSseToSrc` ጣሪያ በላይ `quality-baseline.json` — ዘር በመለኪያ 771, `direction: down`; `--update` ብቻ ዝቅ ያደርገዋል; በ PRs ላይ የመሠረት ዘመድ (`--base-ref`፣ ከታች ይመልከቱ)                                                                                                                                                                                                                                              | አዎ (አይጥ)                            |
| `check:route-validation:t06`      | Zod ንድፎች በሁሉም መንገዶች ላይ ይገኛሉ (የደረጃ 6 ፖሊሲ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                  |
| `check:any-budget:t11`            | `@ts-expect-error // any` ቆጠራ ከበጀት አይበልጥም (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                  |
| `check:provider-consistency`      | በ `providers.ts` ውስጥ ያለ እያንዳንዱ አቅራቢ በ `providerRegistry.ts` ውስጥ ተዛማጅ ግቤት አለው (እና በተቃራኒው፣ በተፈቀደ ዝርዝሩ ውስጥ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                  |
| `check:model-lifecycle`           | ሦስቱ በእጅ የሚያዙ የማዞሪያ ሰንጠረዦች ከተመዘገበው የሕይወት ዑደት ቅጽበታዊ ገጽ እይታ (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ምንም አይነት የጡረታ መታወቂያ `REGISTRY` ሊመራው እንደማይችል ይቆያሉ; እያንዳንዱ `BUILT_IN_ALIASES` ኢላማ በ `REGISTRY` ውስጥ አለ እና ከጡረታ-መታወቂያ ቅጽበታዊ ገጽ እይታ የለም፤ በ `REGISTRY` ውስጥ ያለ እያንዳንዱ የጡረታ መታወቂያ በ `allowedRetiredInCatalog` ውስጥ ተላልፏል ወይም ተዘርዝሯል; እና ምንም `DEFAULT_DEGRADATION_MAP` ምንጭ ወይም ዒላማ በዚያ ቅጽበታዊ ፎቶ ላይ ጡረታ የወጣ አይመስልም። ይህ ሞዴል በአሁኑ ጊዜ በቀጥታ የላይ ዥረት አገልግሎት መሰጠቱን አያረጋግጥም። ከመስመር ውጭ — ከ `config/quality/model-lifecycle.json` ጋር ይነጻጸራል፣ ከ `npm run quality:refresh-model-lifecycle` ጋር በእጅ የሚታደስ (አውታረ መረብ፣ ወደ CI ያልተገባ)። `allowedRetiredInCatalog` የተቃጠለ አይጥ ነው፡ ከክትትል ችግር ጋር ብቻ ግቤት ያክሉ።                                               | አዎ                                  |
| `check:fetch-targets`             | እያንዳንዱ `fetch("/api/...")` በደንበኛ-ጎን `src/` ወደ እውነተኛ `route.ts` ይፈታል።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                  |
| `check:deps`                      | በሪፖው ውስጥ በሁሉም `package.json` ሁሉም የ `npm install` -able deps በ `dependency-allowlist.json` ውስጥ ናቸው; አዲስ ያልተሰካ ወይም የተዘበራረቁ ጥቅሎች ምልክት የተደረገባቸው                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                  |
| `audit:deps`                      | npm ኦዲት የሁሉም አምስቱ ገለልተኛ የመቆለፊያ ፋይሎች (ሥር፣ Electron፣ OpenCode ተሰኪዎች v1/v2 እና አቅራቢ)። ወሳኝ ምክሮች አግድ; ከፍተኛ ምክሮች አሁንም የሚታዩ ማስጠንቀቂያዎች ናቸው። Missing/failed ኦዲቶች INCOMPLETE እና አግድ ናቸው; በየቦታው የተቆለፉ hashes እና ሪፖርቶች ተጠብቀዋል።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                  |
| `check:lockfile`                  | `package-lock.json` ታማኝነት — https መዝገብ ቤት፣ የታማኝነት ሃሾች፣ ምንም አስተናጋጅ የሚሻር የለም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                  |
| `check:licenses`                  | ለምርት ጥገኞች SPDX ፍቃድ ዝርዝር                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | አዎ                                  |
| `check:tracked-artifacts`         | ምንም የግንባታ ቅርሶች/የተሰሩ `node_modules` ሲምሊንኮች (እንዲሁም በ husky pre-commit ውስጥ ይሰራል፤ ቅድመ-ግፋ ሆን ተብሎ ቀላል — #6716 ነው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | አዎ                                  |
| `check:ai-attribution`            | በ PR ውስጥ ምንም AI/bot `Co-Authored-By` የፊልም ማስታወቂያ ወይም AI-ትውልድ ግርጌ አይፈጽምም፣ ርዕስ ወይም አካል — Hard Rule #16 (በ `quality.yml` fast-gates loop ለ PR→ `release/**` — የክስተት ክፍያን ያነብባል፣ ከ PRs — `main` `commit-msg` ብቻ እርምጃ `ci.yml` lint ለ PR→ የተፈቀደላቸው ተባባሪ ደራሲዎች ( #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | እያንዳንዱ Vitest ማግለል የመከታተያ ችግርን ይሰይማል እና በ `config/quality/vitest-exclusions.json` (#13204) ውስጥ ይታያል።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | አዎ                                  |
| `check:file-size`                 | የምንጭ ፋይሎች (`.ts`/`.tsx` በ `src/`, `open-sse/`, `electron/`, `bin/`) በ `cap` ውስጥ ይቆያሉ እና ፋይሎችን (`*.test.ts(x)`) በ `testCap` ውስጥ ይቆያሉ; በ `file-size-baseline.json` (`frozen` / `testFrozen`) ውስጥ የታሰሩ ፋይሎች ከተመዘገበው መጠናቸው በላይ ማደግ የለባቸውም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | አዎ                                  |
| `check:error-helper`              | በ executors/handlers ውስጥ የተሳሳቱ ምላሾች `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12) ይጠቀማሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | አዎ                                  |
| `check:migration-numbering`       | የስደት SQL ፋይሎች በቅደም ተከተል የተቆጠሩ ናቸው፣ ምንም ክፍተቶች ወይም ብዜቶች የሉም                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | አዎ                                  |
| `check:public-creds`              | ከ `publicCreds.ts` ውጭ ምንም ቀጥተኛ OAuth `client_id`/`client_secret` ወይም Firebase የድር ቁልፎች የሉም (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                  |
| `check:db-rules`                  | ከ `src/lib/db/` ሞጁሎች ውጭ ምንም ጥሬ SQL የለም; በርሜል-ከ `localDb.ts` አይመጣም (ከባድ ህጎች #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                  |
| `check:known-symbols`             | በመላክ ሠንጠረዦቻቸው ውስጥ የተመዘገቡ የአቅራቢዎች አስፈፃሚዎች፣ የማዞሪያ ስልቶች እና ተርጓሚዎች በዲስክ — ላይ ካሉ ፋይሎች ጋር ይዛመዳሉ ወላጅ አልባ ወይም ያልታወቁ ምልክቶች                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | አዎ                                  |
| `check:route-guard-membership`    | የልጅ ሂደትን የሚፈጥር እያንዳንዱ መንገድ በ `isLocalOnlyPath()` (Hard Rules #15/#17) ተከፋፍሏል።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                  |
| `check:test-discovery`            | በሪፖው ውስጥ ያለው እያንዳንዱ `*.test.ts` / `*.spec.ts` ፋይል ቢያንስ በአንድ ፈታኝ ሯጭ ይሰበሰባል (በ `test-discovery-baseline.json` ውስጥ ያለ የሙት ልጅ ዝርዝር ሊቀንስ የሚችለው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | አዎ                                  |
| `check:test-tla-order`            | በ `tests/unit` ስር ምንም `node:test` ፋይል የለም ፈተናን ያስመዘገበ፣ ከፍተኛ ደረጃ `await` ደርሷል፣ ከዚያም የበለጠ ይመዘግባል (#18045; ratchet: `test-tla-order-allowlist.json` የሚቀነሰው ብቻ ነው)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | አዎ                                  |
| `check:agent-skills-sync`         | የወኪል ክህሎት ቅርሶች ከምንጫቸው ካታሎግ ጋር ይዛመዳሉ (መንሸራተት የለም)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | አቅራቢ logos/assets የተቀዳ የፕሮቬንሽን ግቤት ይይዛል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON ውቅር ፋይሎችን ይተነትኑ እና የሪፖ ሊንት ደንቦችን ያረካሉ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | TypeScript ጥንቅር ያለ ስህተቶች (የአማካሪ ማስጠንቀቂያዎች ብቻ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | አዎ                                  |
| `typecheck:noimplicit:core`       | ጥብቅ `noImplicitAny` — ወደፊት መመልከት; ብዙ ቀደም ሲል የነበሩ የጥሪ ጣቢያዎች አሁንም ማብራሪያ ያስፈልጋቸዋል                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **ምክር** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` እስከ `src/app/(dashboard)/**` (#7033) የሚሸፍነው — `typecheck:core` የተመረጠ ባለ 27-ፋይል የፈቃድ ዝርዝር የትኛውንም ዳሽቦርድ TSX አያካትትም እና `next build` በጭራሽ አይተይበውም (`next.config.mjs` `ignoreBuildErrors: true` ያዘጋጃል) ስለዚህ እዚያ ወላጅ አልባ መለያ ለውጦች (#6625/#6909) ለ CI የማይታዩ ነበሩ። ከቀዘቀዘ per-file/per-TS-code ቆጠራ መነሻ መስመር (`config/quality/dashboard-typecheck-baseline.json`፣ `check:known-symbols` ጋር ተመሳሳይ የቆየ የማስፈጸሚያ ንድፍ) — ብቻ NEW ስህተቶች ከመሠረታዊው ቆጠራ ባለፈ በሩ ወድቋል። ቀደም ሲል የነበረ ስህተት ሲስተካከል ከ `--update` ጋር ውረድ።                                                                                                                                                                                                                               | አዎ                                  |
| `check:build-typecheck`           | የሙሉ መተግበሪያ የማምረቻ አይነት በ `tsconfig.build.json` (`src`፣ `open-sse`፣ `packages`፣ `bin`፣ `scripts`፣ `electron/**/*.d.ts`) ላይ፣ የገጽታ `typecheck:core` 27-ፋይል ፍቃድ ዝርዝር እና የዳሽቦርዱ በር አይሸፍኑም። ከ `config/quality/build-typecheck-baseline.json` ጋር ይለያያል; አዲስ ወይም ከፍ ያለ በ- (ፋይል ፣ ኮድ) ቆጠራ አልተሳካም፣ ዝቅተኛ ቆጠራ እርስዎ እንዲያወጡት ይጠይቅዎታል። `--update` `--force-regressions` በስተቀር ሩጫው አዲስ ወይም ከፍ ያለ ጥንዶችን ሲይዝ እምቢ ይላል እና `--force-nocheck` ካልተላለፈ በስተቀር አዲስ ጸጥ ያለ ፋይልን እምቢ ይላል፣ ስለዚህ አረንጓዴ ለማግኘት የመነሻ መስመሩን ማስፋት እና ቋሚ ጸጥታ መስጠት ሁለት የተለያዩ የታሰቡ ድርጊቶች ናቸው። ባዶ `--force` ውድቅ ተደርጓል። እንዲሁም `@ts-nocheck` የግንባታ ወሰን ከ `config/quality/ts-nocheck-baseline.json` ጋር ይቃኛል፣ ምክንያቱም እሱን የሚጠቀም ፋይል ምንም አይነት የምርመራ ውጤት እንደሌለ እና አለበለዚያ ለእያንዳንዱ በር የማይታይ ስለሆነ። | አዎ                                  |

#### ሁለት የታይፕ ቼክ ፕሮግራሞች በተለያየ መንገድ ምላሽ ይሰጣሉ

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) እና `check:build-typecheck` የተለያዩ ፕሮግራሞችን በተለያዩ አማራጮች ያጠናቅራሉ, እና ተመሳሳይ ፋይል በአንዱ ውስጥ ንጹህ እና በሌላኛው ስህተቶች የተሞላ ሊሆን ይችላል.

`tsconfig.build.json` `"strict": false` ያዘጋጃል፣ ስለዚህ `noImplicitAny` ጠፍቷል። የኮር ማዋቀሪያው የተመረጠ ባለ 27-ፋይል የፈቃድ ዝርዝር ከጠንካራ አማራጮች ጋር ያጠናቅራል እና የእያንዳንዱን የማስመጣት ግራፍ ይከተላል፣ ስለዚህ በግንባታ ፕሮግራሙ ውስጥ የማይታዩ ፋይሎች አሁንም እዚያ ይመለከታሉ።

ፋይል መተየቡን ወይም አለመተየቡን ሲወስኑ ውጤቱ አስፈላጊ ነው፡-**በ `check:build-typecheck` ስር ያለ ዜሮ ምርመራ ዜሮ ማለት አይደለም።** . `@ts-nocheck` ከ 26 ፋይሎች ማውጣት 23 ቱ በግንባታ ፕሮግራሙ ውስጥ ንጹህ መሆናቸውን አሳይቷል ። ከእነዚህ ውስጥ አስራ ስድስቱ ወደ 120 የሚጠጉ በተዘዋዋሪ የተከሰቱ ናቸው - ማንኛውም በጥብቅ ስህተት ውስጥ። ንጹህ ፋይል ከመጥራትዎ በፊት ሁለቱንም ያረጋግጡ።

### ሥራ `quality-gate`

ከ `test-coverage` በኋላ ይሰራል። እገዳዎች ውድቀት ላይ ይቀላቀላሉ.

| ስክሪፕት                        | ያረጋግጣል                                                                                                                   | ማገድ                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `quality:collect`            | Emits `quality-metrics.json` (ESLint የማስጠንቀቂያ ብዛት፣ ከተዋሃደ የሻርድ ዘገባ ሽፋን)                                                   | አዎ (በላይኛው የአይጥ ጅረት) |
| `quality:ratchet`            | በ `quality-baseline.json` ውስጥ ያለው እያንዳንዱ ልኬት ወደ ኋላ አልተመለሰም (ESLint ማስጠንቀቂያዎች ≤ መነሻ፣ ሽፋን ≥ መነሻ)                           | አዎ                  |
| `check:duplication`          | የኮድ ማባዛት (jscpd@4) በ `quality-baseline.json` ውስጥ ከመነሻ መስመር አይበልጥም።                                                       | አዎ                  |
| `check:complexity`           | የፋይል ደረጃ ሳይክሎማቲክ ውስብስብነት ከካፒታል (ኮር ESLint `complexity` + `max-lines-per-function`) አይበልጥም                                | አዎ                  |
| `check:cognitive-complexity` | የግንዛቤ ውስብስብነት ራትቼት (`eslint-plugin-sonarjs`) — የተለየ ESLint ማለፊያ; CI ሁለቱንም እንደ ነጠላ `check:complexity-ratchets` እርምጃ ያካሂዳል | አዎ                  |
| `check:dead-code`            | ጥቅም ላይ ያልዋሉ ወደ ውጭ የሚላኩ / የፋይል ንክኪ (ኪኒፕ) ከመነሻ መስመር ጋር አይመለሱም።                                                             | አዎ                  |
| `check:compression-budget`   | የማመቂያ ቤንችማርክ በጀት — በአንድ ሞተር ማስመሰያ - ቁጠባ ወለሎች ወደ ኋላ መመለስ የለባቸውም                                                           | አዎ                  |
| `check:type-coverage`        | በመቶኛ የተተየበው ራትቼት (`type-coverage`) ወደ ኋላ አይመለስም; `typecheck:noimplicit:core` ን በብዛት ይገዛል።                                | አዎ                  |

### ስራዎች: `codeql-scan` እና `codeql-admission`

`codeql-scan` ሁሉንም የተዋቀሩ የትንታኔ ምድቦችን ያዘጋጃል። ያ ስራ ከተሳካ በኋላ፣ `codeql-admission` ትክክለኛ ሰቀላዎቹን እና የእጩውን ማንቂያ ራት ያረጋግጣል። ሰነዶች ብቻ እጩዎችን ጨምሮ ሁለቱም የ `Gate / CI` ጥገኞች ያስፈልጋሉ። የአስተዳደር ማግበር እና የካናሪ መስፈርቶች ከዚህ በታች በ "CodeQL ratchet" ስር ተገልጸዋል።

| ስክሪፕት                  | ያረጋግጣል                                                                                                                               | ማገድ |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --- |
| `check:codeql-ratchet` | እጩ ref/SHA እና ሁሉም የተዋቀሩ የትንታኔ ምድቦች ከማንቂያው በፊት ወቅታዊ መሆን አለባቸው። የጎደሉ ማስረጃዎች እገዳዎች. የአለምአቀፍ ክምችት የተለየ — ይቀራል ከታች "CodeQL ratchet" ይመልከቱ | አዎ  |

### ሥራ `quality-extended`

ሥራው የሚመለከታቸውን እጩዎችን ያግዳል። የጥቅል መጠን፣ ሚስጥራዊ ግኝቶች፣ የተጋላጭነት ግኝቶች፣ የስራ ፍሰት ግኝቶች እና OpenAPI ለውጦች በሚፈለጉት ራችቶች ተረጋግጠዋል። ክብ ጥገኝነት ምርመራዎች እንደ ምክር ይቀራሉ። ስካነር መጫን ያስፈልጋል `scripts/ci/install-quality-scanners.sh` ድንጋጌዎች የተሰኩ ስሪቶች እና የመጫኛ አለመሳካቶችን ያስፋፋሉ። የጎደሉ መሳሪያዎች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደሉ መነሻ መስመሮች አስፈላጊውን የስካነር በር INCOMPLETE ይተዋል።

| ስክሪፕት                    | ያረጋግጣል                                                                                                                                                                  | ማገድ                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:circular-deps`    | ምንም ክብ ጥገኞች (ዲፒዲኤም)                                                                                                                                                     | **ምክር**                                    |
| `check:bundle-size`      | የጥቅል መጠን ከካፒታው አይበልጥም; የማይገኝ መለኪያ አልተሳካም።                                                                                                                               | **በ --ratchet ማገድ**                        |
| `check:secrets`          | የጊትሌክስ ግኝቶች ወደ ኋላ አይመለሱም; የሚፈለጉ ቅኝቶች የጎደሉትን tools/source/baseline፣ ያልተሳኩ ቅኝቶችን እና ልክ ያልሆኑ ሪፖርቶችን ውድቅ ያደርጋሉ                                                              | **በ --ratchet ማገድ**                        |
| `check:vuln-ratchet`     | የጥገኝነት ድክመቶች ወደ ኋላ አይመለሱም; የሚፈለጉ ቅኝቶች የጎደሉ መሳሪያዎችን፣ ልክ ያልሆኑ ሪፖርቶችን ወይም የጎደሉ የመነሻ መስመሮችን ውድቅ ያደርጋሉ                                                                       | **በ --ratchet ማገድ**                        |
| `check:workflows`        | የስራ ፍሰት lint (አክሽንሊንት + zizmor); missing/broken ስካነሮች፣ ልክ ያልሆኑ ሪፖርቶች ወይም የጎደሉ የአይጥ መነሻ መስመር እንደ INCOMPLETE አልተሳኩም። ትክክለኛ ግኝቶች የተመረጠውን strict/advisory/ratchet ፖሊሲ ይከተላሉ | ማስፈጸሚያ ያስፈልጋል; በ CI ውስጥ zizmor ratchet ማገድ |
| `check:openapi-breaking` | የህዝብ API ውል ከተሰካ ክስተት ጋር (PR ውህደት-መሰረት፣ ፑሽ በፊት፣ የውህደት ቡድን መሰረት፣ scheduled/manual የመጀመሪያ ወላጅ ማረጋገጥ) የሚፈለገው መለኪያ አልተዘጋም።                                                  | **በ --ratchet ማገድ**                        |

### ሥራ `docs-sync-strict`

ለ `main` ወይም `release/**` የመሳብ ጥያቄዎች ይህ ስራ የሚሰራው በሰነድ ወይም በኮድ ለውጦች ለተመደቡ ረቂቅ (ወይም የታመነ ወረፋ) እጩዎች ብቻ ነው። በተጨማሪም ያልሆኑ PR CI ክስተቶች ላይ ይሰራል; የዚህ የስራ ሂደት የግፋ ቀስቅሴ `main` ሳይሆን `release/**` ብቻ ነው የሚሸፍነው። ከዜሮ ውጪ የሚወጣ እርምጃ ስራውን ያግዳል; ሪፖርት-ብቻ ግኝቶች እና ከዚህ በታች የተመዘገቡ ነፃነቶች አያደርጉም።

| ስክሪፕት                          | ያረጋግጣል                                                                                                                                                                                                                                                  | ማገድ                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `check:docs-all`               | ከታች ያሉትን 7 ንዑስ በሮች በቅደም ተከተል የሚያስኬድ ሜታ-ጌት                                                                                                                                                                                                               | አዎ                                                                                          |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG ሥሪት ወጥነት፣ ትክክለኛ `llm.txt` መስተዋቶች፣ የተተረጎመ CHANGELOG section/size ልዩነቶች እና የተባዙ ሰነዶች አለመኖር                                                                                                                                      | አዎ                                                                                          |
| ↳ `check:docs-frontmatter`     | የተጠናቀሩ የሰነድ ገጾች ትክክለኛ የፊት ጉዳይ ርዕሶችን ይይዛሉ                                                                                                                                                                                                                | አዎ                                                                                          |
| ↳ `check:docs-counts`          | ከፍተኛ እምነት ቆጠራ invariants ጥብቅ ናቸው; ሂዩሪስቲክ የፋይል ቆጠራ ቼኮች የሚያስጠነቅቁት ስክሪፕቱ `--strict` እስካልተቀበለ ድረስ ብቻ ነው (የ CI ሜታ በር አያልፈውም)                                                                                                                                 | ጥብቅ ደረጃ ማገድ; ለስላሳ ደረጃ ምክር                                                                   |
| ↳ `check:env-doc-sync`         | ምንጭ env ያነባል፣ `.env.example` እና `docs/reference/ENVIRONMENT.md` በግልፅ ችላ፣ ዶክ-ብቻ እና የኢንቪ-ብቻ የፈቃድ ዝርዝሮች በኋላ ይስማማሉ።                                                                                                                                         | አዎ፣ ከተመዘገቡት የተፈቀደ ዝርዝሮች ውጭ                                                                  |
| ↳ `check:deprecated-versions`  | ችላ የተባሉ ሰነዶችን ሳይጨምር የቆዩ ስሪቶችን ከአስተማማኝ ታሪካዊ አውዶች እና የቆዩ የዝማኔ ቀኖችን ሪፖርት ያደርጋል                                                                                                                                                                             | ምክር አሁን ባለው CI ሽቦ (`--strict` አላለፈም)                                                        |
| ↳ `check:doc-links`            | የውስጥ ምልክት ማድረጊያ አገናኞች በሰነዶች ውስጥ ወደ እውነተኛ ፋይሎች (`[text]`/`(path)` ቅጽ) ይፈታሉ                                                                                                                                                                               | አዎ                                                                                          |
| ↳ `check:fabricated-docs`      | መንገዶች፣ env vars፣ CLI ትዕዛዞች፣ መንጠቆ ስሞች እና በሰነዶች ውስጥ የተጠቀሱ የፋይል መንገዶች በኮድ ቤዝ ውስጥ አሉ። በ `--strict` በኩል ጠንካራ በር; ያለ ባንዲራ ለስላሳ-ውድቀት።                                                                                                                          | አዎ (በ `--strict` በ CI በኩል)                                                                  |
| `check:cli-i18n`               | ያገለገሉ CLI `t()` ቁልፎች በ `en` ውስጥ አሉ; `pt-BR` እያንዳንዱን ከፍተኛ-ደረጃ ክፍል ይይዛል; `zh-CN` እና `zh-TW` እያንዳንዱን ቁልፍ ከ `en` ይይዛሉ                                                                                                                                       | አዎ                                                                                          |
| `check:openapi-coverage`       | OpenAPI spec ቢያንስ የእውነተኛ መስመሮችን ወለል ይሸፍናል።                                                                                                                                                                                                              | አዎ                                                                                          |
| `check:openapi-security-tiers` | የታወቁ `x-loopback-only`/`x-always-protected` ማብራሪያዎች በ `routeGuard.ts` መደገፍ አለባቸው። ተንታኝ እና ወደፊት አለመዛመድ አግድ። ለጎደለ `x-loopback-only` በግልባጭ ማረጋገጥ በአካባቢ-ብቻ ቅድመ ቅጥያዎች ያስጠነቅቃል፣ እና ስርዓተ-ጥለት-ብቻ መስመሮች ከዚያ ተቃራኒ ማለፊያ የተገለሉ ናቸው።                                 | Parser/forward ቼኮች ማገድ; የተገላቢጦሽ ቼክ ምክር                                                      |
| `check:openapi-routes`         | በ `openapi.yaml` ውስጥ ያለው እያንዳንዱ `/api...` ዱካ ከተረጋገጠው `KNOWN_STALE_SPEC` የፈቃድ ዝርዝር በኋላ ወደ እውነተኛው መንገድ ልኬት-በግድየለሽነት ይፈታል። የቆዩ የፈቃድ ዝርዝር ግቤቶች እንዲሁ አልተሳኩም                                                                                                  | አዎ                                                                                          |
| `check:docs-symbols`           | የውስጥ `/api/...` URL ማጣቀሻዎች በቀኖናዊ ያልሆኑ መስታወት ሰነዶች ወደ እውነተኛ መስመር ወይም መስመር ቤተሰብ ይወስዳሉ። proxy/upstream/placeholder/file ማጣቀሻዎች እና ትክክለኛ `KNOWN_STALE_DOC_REFS` ግቤቶች አልተካተቱም እና የቆዩ የፈቃድ ዝርዝር ግቤቶች አልተሳኩም                                                    | አዎ                                                                                          |
| `i18n translation drift`       | ፍፁም ቅበላ ዜሮ ምንጭ፣ የጠፋ ኢላማ፣ ኢላማ-ሃሽ፣ የቆየ-ትርጓሜ እና የሴክሽን መሸጎጫ አለመጣጣሞችን ይፈልጋል። የተለመደው PR ዝግጅት ትክክለኛ የውርስ ማስረጃ ወይም እንግሊዝኛ ብቻ በመጠባበቅ ላይ ያለ ለውጥ ሳይለወጥ የተሟላ ሁኔታ እና የዒላማ ባይት; ሪፖርቱ የውህደት ዝግጁነትን ገልጿል። የጠፋ ኢላማ ሃሽ እና ያልተሟላ የመሠረት ማስረጃ እገዳ። የሌጋሲ ክፍል መሸጎጫ ውድቀት አይደለም። | ሁሉም አምስቱ ክፍሎች queue/base መግቢያን ያግዳሉ; ተራ የዝግጅት ፈቃድ የተረጋገጠ በውርስ ወይም በእንግሊዝኛ ብቻ የሚቆይ ሥራ ብቻ ነው። |

በ `docs/diagrams/` ስር ያሉት አስራ ሁለቱ README SVGs ይፈጠራሉ (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ሁሉንም ያድሳል)። እያንዳንዳቸው የባይት-ንጽጽር አሃድ ሙከራ (`tests/unit/docs/readme-*-svg.test.ts`, ሥራ `test-unit`) የተፈጸመው ፋይል ጊዜ ያለፈበት ሲሆን, እና `check:docs-counts` ቀኖናዊ ቁጥሮችን ከ `<text>` ኖዶቻቸው — ያነባል ለዚህ ነው የማብራሪያው ደረጃ በፋይሉ ውስጥ ያሉትን እያንዳንዱን ሕብረቁምፊዎች እንደ የማይታይ `<text>` ያቆያል. የ SVG ቀኖናዊ-ቁጥሮች ቼክ በ `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, እና `public/images/tier-flow-dark.svg` እና `tier-flow-light.svg` ውስጥ የተዘረዘሩትን ፋይሎች ያነባል; የነፃው ዘላለማዊ፣ ካታሎግ-ግቤት፣ ተደጋጋሚ ገንዳ እና የውጤት መንስኤዎች የይገባኛል ጥያቄዎችም `promise-pillars.svg`፣ `free-tier-budget.svg` እና `strategies-grid.svg` አንብበዋል። `free-tier-budget.svg` አሃዞቹን ከቀጥታ ካታሎግ ጫኚ ላይ ይሳሉ፣ ስለዚህ ወደ `FREE_MODEL_BUDGETS` ወይም ወደ አቅራቢው መቀየር ያ ፋይል እስኪታደስ ድረስ CI ስም ቀይሮታል።

### ሥራ `i18n-ui-coverage`

| ስክሪፕት                               | ያረጋግጣል                                                                                                                                        | ማገድ     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check-ui-keys-coverage` (መስመር ውስጥ) | UI i18n ቁልፍ ሽፋን ≥ 65% ነው                                                                                                                      | አዎ      |
| `check-ui-value-drift` (መስመር ውስጥ)   | እንደገና የተጻፈ እንግሊዝኛ **ዋጋ** ከኋላው የቆየ ትርጉም አይተውም።                                                                                                 | አዎ      |
| `check-new-key-coverage` (መስመር ውስጥ) | ሀ **አዲስ** የእንግሊዘኛ ቁልፍ በየአካባቢው ተተርጉሟል — የ `__MISSING__:` ማርከር ውድቅ ተደርጓል                                                                        | አዎ      |
| `check-translation-ratio`           | ትክክለኛ የትርጉም ምጥጥን በየአካባቢው (ከእንግሊዝኛ ተመሳሳይ / ቦታ ያዥ / ከተፈቀደው ዝርዝር ውጭ የጎደሉ ቅጠሎች) `config/quality/i18n-translation-baseline.json` + ዝግተኛ መብለጥ የለበትም | **ማገድ** |

`fetch-depth: 0` — ያስፈልገዋል የእሴት ተንሸራታች በር `en.json` ከውህደቱ መሰረት ይለያል።

#### `check-ui-value-drift` — የቆየ-የትርጉም በር

አንዱን i18n regression ይይዛል ሌላኛው በመዋቅራዊ መልኩ በሮች ማየት አይችሉም፡ የእንግሊዘኛ እሴት እንደገና ይፃፋል እና ከ _ቀዳሚ_ እንግሊዘኛ የተገኙት ትርጉሞች ወደ ኋላ ይቆያሉ፣ ስለዚህ እንግሊዛዊ ያልሆኑ ተጠቃሚዎች በልበ ሙሉነት-ቃል ያለው አሁን የተሳሳተ ቅጂ ያነባሉ።

ይህ በእውነቱ ተልኳል። `oauthModal.googleOAuthWarning` የ Antigravity መግቢያ ረዳት ሲያርፍ (#5203) እንደገና ተጽፏል;**39 ከ 43 አከባቢዎች** ለኦፕሬተሮች "ሙሉውን URL ገልብጠው ከታች ለጥፍ" — ለዚያ አገልግሎት አቅራቢ ማጠናቀቅ የማይችል ፍሰት እንዲያደርጉ የሚነግራቸው ጽሁፍ ቀጠለ። እስከ #8463 ድረስ ሳይስተዋል ቀርቷል ምክንያቱም፡-

- `sync-ui-keys` ያሉትን ቁልፎች ብቻ ነው የሚሞላው።**የለም** ፣ በጭራሽ ያልሆኑት።**የቆየ** ;
- `check-ui-keys-coverage` ቁልፍ _presence_ ይቆጥራል፣ ስለዚህ የቆየ ትርጉም እንደተሸፈነ ይቆጠራል።
- `check-translation-drift` የ `docs/i18n/<locale>/**.md` ሰነድ መስታወቶችን ይከታተላል — በጭራሽ `src/i18n/messages/*.json` አያነብም። ከ2026-09 ዳግም ማመሳሰል ጀምሮ በስራ `docs-sync-strict` ውስጥ ማገድ፡ አንድ ኮር ሰነድ → `npm run i18n:run -- --files=<doc>` (የክፍል ደረጃ፣ ርካሽ) አርትዕ።

**ልዩነትን የሚያውቅ፣በመነሻ መስመር የተደገፈ አይደለም።** በማዋሃድ ላይ `en.json` ከሚሠራው ዛፍ ጋር ያወዳድራል; የእንግሊዘኛ እሴቱ ለተቀየረ ለእያንዳንዱ ቁልፍ፣ አሁንም ያልተነካ ትርጉም የያዘ ማንኛውም አካባቢ የቆየ ነው። ይህ ሆን ተብሎ **ቀድሞ የነበረውን ዕዳ ያቆማል** — ልዩነት ከየትኛው አሮጌ እንግሊዝኛ እንደመጣ ሊገልጥ አይችልም፣ስለዚህ በሩ የሚዳኘው የአሁኑ ለውጥ የሚነካውን ብቻ ነው። አማራጩ (በየቁልፍ ሃሽ መነሻ መስመር) ~ 600 KB የመነጨ ፋይል፣ 3 × ትልቁ ነባር መነሻ በእያንዳንዱ i18n PR ያስከፍላል።

እሱን ለማርካት ሁለት መንገዶች:

1. የተጎዱትን ትርጉሞች ማዘመን ወይም
2. የሩጫ ሰዓቱን ወደ `__MISSING__:<new english>` — ያዋቅሯቸው ከዚያም የተስተካከለውን እንግሊዝኛ (`src/i18n/request.ts::deepMergeFallback`፣ #7258) እና ለትርጉም ቁልፍ ወረፋዎችን ያገለግላል።

ሕብረቁምፊው ከሆነ **ትርጉም** ተለውጧል, ይመርጣሉ **ቁልፉን እንደገና መሰየም** አዲስ ቁልፍ የቆየ ትርጉም ሊወርስ አይችልም። ያ ጥቅም ላይ የዋለው #8463 ንድፍ ነው።

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

የእሴት ተንሸራታች እና አዲስ-ቁልፍ በሮች ከ `scripts/i18n/resolve-ui-diff-base.mjs` አንድ የማይለወጥ ንፅፅር ይጋራሉ። የስራ ሂደቱ ተመሳሳዩን መሰረት፣ ቤዝ-ጫፍ እና እጩ SHAs ወደ ሁለቱም ቼኮች ያልፋል። PR/base-retarget፣ የግፋ እና የውህደት ቡድን ሩጫዎች የክስተታቸውን አውድ ይጠቀማሉ። የእጩ ቅርንጫፍ መላክ ትክክለኛ ክፍት PR ወይም ግልጽ የሆነ `i18n_base_sha` ግቤት ያስፈልገዋል። ያለዚያ ግብአት የ `main` ወይም `release/vX.Y.Z` መላክ ወይም የታቀደ ምልከታ የመጨረሻውን ቃል ከመጀመሪያው ወላጅ ጋር ያወዳድራል፤ ሁሉንም የተወረሱ የትርጉም ዕዳዎች ኦዲት አይደለም. የአካባቢ ጥሪ ግልጽ የሆነ የንፅፅር መሰረት ያስፈልገዋል፣ ለምሳሌ ከላይ ያለው የ `BASE_REF` ትዕዛዝ።

የጠፋ ወይም አሻሚ የንፅፅር አውድ፣ የማይነበብ ወይም ልክ ያልሆነ ተፈላጊ ካታሎግ እና የተለወጠ እጩ `INCOMPLETE` ከመውጫ ኮድ ጋር ያዘጋጃሉ።**2** በማስጠንቀቂያ ሁነታ ላይ ጨምሮ. ካታሎግ ማንበብ `scripts/i18n/read-ui-catalog.mjs` ይጠቀሙ; የማንበብ አለመሳካቶች በባዶ እቃዎች አይተኩም. የማይገኝ መሰረትም ሆነ ያልተሟላ ግብአት PASS አያቋቁምም።

### ሥራ `i18n`

ሙሉ i18n የማረጋገጫ ማትሪክስ (በአካባቢው አንድ ሥራ)። ሥራው ሁሉ ምክር ነው።

| ስክሪፕት                           | ያረጋግጣል              | ማገድ                                        |
| ------------------------------- | ------------------- | ------------------------------------------ |
| `validate_translation.py quick` | የትርጉም ምሉዕነት በየአካባቢው | **ምክር** (`continue-on-error: true` በሙሉ ሥራ) |

### ሥራ `pr-test-policy`

በመጎተት ጥያቄዎች ላይ ብቻ ይሰራል።

| ስክሪፕት                  | ያረጋግጣል                                                                                                       | ማገድ |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --- |
| `check:pr-test-policy` | በ `src/`፣ `open-sse/`፣ `electron/` ወይም `bin/` ውስጥ የምርት ኮድ የሚቀይር PRs ፈተናዎችን ማካተት ወይም ማዘመን አለበት (Hard Rule #8) | አዎ  |
| `check:test-masking`   | የተቀየሩ የፍተሻ ፋይሎች የተጣራ ቁጥርን አይቀንሱም ወይም `assert.ok(true)` tautologiesን አይጨምሩም።                                  | አዎ  |
| `check:pr-evidence`    | PR አካል ለለውጡ test/VPS ማስረጃዎችን ጠቅሷል ( PR ፕሮዝ — ተሰባሪን በመግጠም Hard Rule #18 ያካሂዳል፣ Backlog ይመልከቱ)                 | አዎ  |

### ሥራ `test-vitest`

የ `changes` ምደባ ስራ ያስፈልገዋል። ተፈፃሚነት ያለው የማትሪክስ ፍንጣሪዎች በውድቀት ላይ ውህደትን ያግዳሉ።

| ስዊት              | ያረጋግጣል                                              | ማገድ                                                                              |
| ---------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `test:vitest`    | MCP አገልጋይ (110 መሳሪያዎች) ፣ autoCombo፣ መሸጎጫ — viest ሯጭ | አዎ                                                                               |
| `test:vitest:ui` | UI ክፍል — viest ሯጭ ይሞክራል።                            | **ማገድ** — ቅድመ-ነባር ውድቀቶች በ `vitest.config.ts` ውስጥ በግልጽ አይካተቱም; አዲስ ውድቀቶች ሥራውን ያጣሉ |

### የምሽት የስራ ፍሰቶች (መርሃግብር የተያዘለት፣ ምክር)

እነዚህ በ ክሮን መርሐግብር (እና `workflow_dispatch`) ይሰራሉ፣ በጭራሽ በ PRs ላይ። ሁሉም አማካሪዎች ናቸው።

| የስራ ፍሰት                | ያረጋግጣል                                                                                                              | ማገድ     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | ------- |
| `nightly-property`     | በፍጥነት-ቼክ የንብረት ሙከራዎች በዘፈቀደ ዘር + ከፍተኛ ሩጫ ብዛት                                                                         | **ምክር** |
| `nightly-resilience`   | ክምር-የእድገት በር፣ ትርምስ ጥፋት-መርፌ፣ k6 load/soak                                                                            | **ምክር** |
| `nightly-llm-security` | Quickfoo መርፌ ጠባቂ (የማገጃ ሁነታ) + ጋራክ መመርመሪያዎች (ያለ አቅራቢ ሚስጥር ተዘሏል)                                                      | **ምክር** |
| `nightly-schemathesis` | `docs/openapi.yaml` — surfaces spec ጥሰቶች/ያልተያዙ 500ዎች (ፋሴ 8 B.4) በመጠቀም የቀጥታ OmniRoute ላይ የ OpenAPI ውል ማደብዘዝ (መርሃግብር) | **ምክር** |
| `nightly-mutation`     | የስትሮከር ሚውቴሽን መፈተሻ ውጤት በፈጣን አሃድ መስመር — በሕይወት የተረፉ ሚውቴሽን ላዩን ደካማ ማረጋገጫዎች                                              | **ምክር** |
| `nightly-compat`       | በሚደገፉት `engines.node` ክልሎች ውስጥ የመስቀለኛ ሞተር ተኳሃኝነት ማትሪክስ                                                              | **ምክር** |

የአፈጻጸም መነሻ መስመሮች (ክምር፣ TTFB፣ የግንባታ ጊዜ) የተመዘገቡ እንጂ የተከለሉ አይደሉም [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) ይመልከቱ።

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
