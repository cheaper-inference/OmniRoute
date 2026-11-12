# Release-Green: candidate validation and evidence (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

መልቀቅ-አረንጓዴ አንድ የተወሰነ ቃል ኪዳን ይመለከታል እና የማረጋገጫ ውጤቶቹን ሪፖርት ያደርጋል። [የጥራት ጌትስ ማመሳከሪያ](../architecture/QUALITY_GATES.md) የአሁኑን CI መገለጫዎች፣ አስፈላጊ ቼኮች እና ተቀባይነት ፖሊሲን ይገልጻል። በ `config/quality/admission-policy.json` ውስጥ ያለው የመግቢያ ፖሊሲ ለ `Gate / CI` እና `Gate / Quality` ተፈጻሚነት ያለው ውል ነው።

## CI እና የተመልካቾች ወሰን

`ci.yml` እና `quality.yml` ሽፋን ጥያቄዎችን ወደ ዋና እና የመልቀቅ ቅርንጫፎች ይጎትታሉ። የተመረጠው መገለጫ የትኞቹ ስራዎች እንደሚተገበሩ ይወስናል. ሙሉ CI እንዲሁ ተራ የመሳብ ጥያቄ የማያስፈጽምባቸውን መስመሮችን ያካትታል። ፈጣን የተመልካች ውጤት እነዚያን ስራዎች መተካት አይችልም, እና የተጠናቀቀ የስራ ፍሰት መጠቅለያ ደረሰኞችን መተካት አይችልም.

የምርት ግንባታው የ CI ነው። በ `quality.yml` ውስጥ የተባዛ የምክር ግንባታ የለም። የጠፉ ቅርሶች፣ የተሰረዙ ስራዎች እና ያልተሟሉ መለኪያዎች የተሳካ ተፈላጊ ቼክ አያዘጋጁም። ውጤቱን ከመቀበልዎ በፊት የአሁኑን መሠረት, ራስ እና ጥምር እጩ ያረጋግጡ.

## የአካባቢ ማረጋገጫ

ጥገኛዎቹን ካዘጋጁ በኋላ ተመልካቹን በባለቤትነት ባለው የሥራ ዛፍ ውስጥ ያሂዱ። ከከባድ ማረጋገጫ በፊት በ `docs/ops/WORKTREE_ISOLATION.md` ውስጥ ያለውን የስራ ዛፍ እና የንብረት ፕሮቶኮል ይከተሉ።

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

ፈጣን መገለጫው ከፊል ነው። ሙሉ መገለጫው የተቀረጹ መስፈርቶችን ይፈትሻል እና የትዕዛዝ ደረሰኞችን ያቆያል; ለሚመለከተው የተስተናገዱ ቼኮች ማሰማራትን ወይም ምትክን አያረጋግጥም። ሪፖርቱ የማስፈጸሚያ ውድቀትን ከሜትሪክ ተንሸራታች ይለያል። በተመረጠው መመሪያ መሰረት የሚፈለጉ ራችቶች እንደታገዱ ይቆያሉ። የማለፊያ ውጤት ለማግኘት ብቻ መነሻ መስመር አያድርጉ።

## በምሽት እና በእጅ መጥረግ

የምሽት ልቀት እና ተኳኋኝነት ፈላጊዎች ቀኖናዊ ልቀት ቅርንጫፍን ይመርጣሉ። ያ ምርጫ የስራ ሂደቱን ከቀሰቀሰው ቅርንጫፍ ጋር መዛመድ አለበት፣ እና ስዊቶች የዝግጅቱን የማይለዋወጥ SHA ይጠቀማሉ። ለእጅ አፈጻጸም የታሰበውን በ `release_branch` ውስጥ ይምረጡ እና በዚያው ማጣቀሻ ላይ ይላኩ፡-

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

የተመረጠውን ኮድ ከመተግበሩ በፊት የቅርንጫፍ ተሻጋሪ መላክ ውድቅ ተደርጓል። የተስተናገዱ ዋና ዋና ክፍሎች `main` ይፈትሹ እና SHA አሁንም ከመጫኑ በፊት ከተፈታው ዒላማ ጋር እንደሚመሳሰል ያረጋግጡ። በመፍትሔው ጊዜ ዋናው የሚንቀሳቀስ ከሆነ፣ ያልተሟላውን መጥረግ በአዲሱ ቁርጠኝነት እንደገና ያካሂዱ። ከተለያዩ እጩዎች የተሰበሰቡ ደረሰኞችን አያጣምሩ።

## አለመሳካት መለየት እና መልሶ ማግኘት

ክስተቱን እንደ የመመርመሪያ መረጃ ጠቋሚ ይጠቀሙ፣ ከዚያ ትክክለኛውን ሩጫ፣ ሙከራ፣ ያልተሳካ ደረጃ እና አርቲፊሻልን ይመርምሩ። ለአስተዋጽዖ አበርካች አለመሳካቱን ከማመልከትዎ በፊት ተመጣጣኝ መሠረት እና የእጩ ማስረጃን ያወዳድሩ። የመሠረተ ልማት ስሕተቶች፣ የተወረሱ ጉድለቶች፣ የእጩዎች መሻሻሎች እና በመጠባበቅ ላይ ያሉ ማፅደቆች የተለያዩ መፍትሄዎችን ይፈልጋሉ።

የ `/green-prs`፣ `/sweep-reds`፣ `/validate-release-green` እና `/babysit` ችሎታዎች ማስረጃዎችን ይሰበስባሉ እና በሰነድ ወሰን ስር ማስተካከያዎችን ያዘጋጃሉ። የአስተዋጽዖ አበርካች ክሬዲት ያቆዩ፣ የተለዩ የጥገና ቅርንጫፎችን ይጠቀሙ እና ሁሉንም አስፈላጊ ቼኮች ከተፈቀደው ውህደት በፊት ያረጋግጡ። ምንም አውቶማቲክ የዳግም መስመር ወይም የአጋጣሚ መዝጊያ የአሁኑ እጩ ምትክ የለም።
