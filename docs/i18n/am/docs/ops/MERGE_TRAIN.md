# Merge Queue & Manual Merge-Train Runbook (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## በመልቀቂያ ቅርንጫፍ ላይ ማረፊያ

ሁሉን አቀፍ ወረፋ ወደ `release/vX.Y.Z` ማረፍን ይቆጣጠራል። PR ከማረፍዎ በፊት የከፍተኛ ደረጃ `mode` በ `config/merge-queue/config.json` በነባሪ ቅርንጫፍ ላይ ያንብቡ። [Omni-Queue](OMNI_QUEUE.md) ን ይመልከቱ።

- **`shadow`** ማረጋገጫን ያካሂዳል እና ማረፊያን ወደ በእጅ ውህደት ይተዋል ። በመጨረሻው ራስ ላይ ለተፈቀደው PR `omni-queue` ተግብር። ብቁነትን በ `npm run queue -- why <PR>` ያረጋግጡ። በ `npm run queue -- history --base <branch>` ውስጥ ለዚያ ጭንቅላት ፍርዱን ይጠብቁ. `would-land` ላይ ይቀጥሉ። በ `culprit-found` ወይም `would-dequeue` ላይ ውህደቱን ይያዙ እና ምክንያቱን ያስተካክሉ።
- **ጥላ የማይካተቱ.** አሁን ካለው የመሠረት ጫፍ ጋር አረንጓዴ ሙሉ CI ባቡር ያለ የተለየ የወረፋ ፍርድ መቀጠል ይችላል። የ PR ጭንቅላት ቀድሞውኑ የአሁኑን የመሠረት ጫፍ ሲይዝ ተመሳሳይ ልዩ ሁኔታ ይሠራል።
- **`live`** ማረፊያን ለማነሳሳት የ `omni-queue` መለያን ይጠቀማል። ወረፋው ብቻውን PR ያርፋል። የውህደት ትዕዛዞችን እና ቀጥታ ግፊቶችን ወደ ወረፋው ይተው።

እያንዳንዱ ማረፊያ የባለቤቱን ፍቃድ እና የሚመለከታቸው አስፈላጊ ቼኮች ያስፈልገዋል። `omni-queue` ተግብር ባለቤቱ ለማረፍ ፍቃድ ከሰጠ በኋላ ነው። በተሰለፉ PRs የተጠበቁ መንገዶችን መንካት ለዚያ PR የባለቤቱን `protected-approved` ውሳኔ ያስፈልገዋል።

"በነቃ ልቀቶች ላይ አረንጓዴ በሮች ያስፈልጉ" lawset አረንጓዴ `Gate / CI` እና `Gate / Quality` በጭንቅላቱ ላይ ያስፈልገዋል። ቀይ በርን ለማለፍ `--admin` በጭራሽ አይጠቀሙ። የተለቀቀው የቀዘቀዘ ብሎኮች ወደ በረዶው ቅርንጫፍ ይዋሃዳሉ። [ከባድ ህግ 21](HARD_RULES_DETAIL.md) ይመልከቱ. ሌላ ክፍለ-ጊዜ እየሰራ መሆኑን ለመጎተት ጥያቄ በጭራሽ አይሰይሙ፣ አያዋህዱ ወይም አይግፉ። [ከባድ ህግ 22](HARD_RULES_DETAIL.md) ይመልከቱ.

## የባቡር መጎተት ጥያቄ

1. አሁን ባለው የመልቀቂያ መሠረት ጫፍ ላይ የባቡር ቅርንጫፍ ይጀምሩ። የውህደት ቃልን በመጠቀም ትክክለኛ የጸደቁ አባላትን ጭንቅላት ያዋህዱ። ስኳሽ እና ዳግም መሰረትን በማስወገድ የቁርጠኝነት ታሪካቸውን ይንከባከቡ።
2. ለባቡር ቅርንጫፍ አንድ የመጎተት ጥያቄ ይክፈቱ። ያንን PR አሁን ባለው የመሠረት ጫፍ ላይ በራሱ ሙሉ CI ያረጋግጡ። ከማረፍዎ በፊት የመሠረት ጫፍን እና የጸደቁትን አባል ራሶች እንደገና ያረጋግጡ። የተረጋገጠው እጩ ሲቀየር ባቡሩን እና CI ውን ያድሱ።
3. ባቡሩን PR በሚመለከተው የወረፋ ሁነታ ከመዋሃድ ጋር ያርፉ። በቀጥታ ሁነታ፣ የወረፋው `merge-ff` ማረፊያ ዘዴ የውህደቱን ስራዎች ይጠብቃል። የመጀመሪያዎቹ አባል ራሶች ከሚለቀቀው ቅርንጫፍ ሊደረስባቸው የሚችሉ ይሆናሉ። GitHub አባል PRs እንደተዋሃደ ያመላክታል እና ድርጅቶቹ ደራሲዎቻቸውን ያቆያሉ።

የአደባባይ ምሳሌ [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071) ነው። 18 አባል PRs በማጣመር በ2026-11-24 ላይ ከውህደት ቃል ጋር አረፈ።

`main` ወደ ቀጣዩ የመልቀቂያ ቅርንጫፍ የማመሳሰል መልሶ ማመሳሰል እንዲሁ በውህደት ቃል ውስጥ ይደርሳል። ለኋለኞቹ አመሳስል-ኋላዎች `main` ዘርን መጠበቅ ያስፈልጋል። [Worktree ማግለል](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash) ይመልከቱ.

## የአካባቢው የውህደት ባቡር አረጋጋጭ

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

አረጋጋጭው የመሠረቱን እና PR ራሶችን ያመጣና ሊጣል በሚችል የስራ ዛፍ ውስጥ ያዋህዳቸዋል። በተፈጠረው ዛፍ ላይ የፓሪቲ ስብስብ አንድ ጊዜ ይሰራል። ያልተሳካ ጭንቅላት ማምጣት ወይም ማዋሃድ PR ያስወጣል እና ስክሪፕቱ ከቀረው PRs ጋር ይቀጥላል።

- **`--plan`** የተመረጠውን ሁነታ ደረጃዎች ያትማል እና የስራ ዛፍ ሳይፈጥር ወይም የርቀት መቆጣጠሪያውን ሳያገኝ ይወጣል። ፈጣን እቅድን ለመመርመር ከ `--fast` ጋር ያዋህዱት.
- **`--fast`** የተለመዱትን የማይንቀሳቀሱ በሮች፣ የተመረጡት የተቀየሩ `node:test` ፋይሎችን በ `tests/unit/` እና `npm run test:vitest` ያካሂዳል። ፈጣን ሁነታን ሲጠቀሙ በተጠራቀመ ጫፍ ላይ ቢያንስ በቀን አንድ ጊዜ ሙሉ የአካባቢ ማረጋገጫን ያሂዱ።
- **ሙሉ ሁነታ** ሙሉ-ብቻ የማይንቀሳቀሱ በሮች ይጨምራል እና `npm run test:unit` እና `npm run test:vitest` ያካሂዳል።

የመሠረት መርማሪው ካለ ያልተነካ የማይንቀሳቀስ በር ባልተነካው መሠረት ላይ እንደገና ይካሄዳል። ስክሪፕቱ የተወረሱ ውድቀቶችን ሪፖርት ያደርጋል እና እያንዳንዱ የታወቀ የጥሰት መስመር በመሠረቱ ላይ ሲታይ እና አጠቃላይ ቆጠራው ካላደገ ይቀጥላል።

| ውጣ  | ትርጉም                                                                                             |
| --- | ------------------------------------------------------------------------------------------------ |
| `0` | እቅዱን ታትሟል ወይም ክፍሉን አጠናቅቋል። የስብስብ ማጠቃለያው ማንኛውንም የተወረሱ የማይንቀሳቀሱ ውድቀቶችን እና የወጡ PRs ይዘረዝራል።          |
| `1` | ልክ ያልሆኑ ነጋሪ እሴቶች፣ የጂት ቼክአውት የለም፣ ያልተሳካ ቅድመ በረራ፣ ወይም ምንም PR አልተሳፈረም።                              |
| `2` | የስብስብ ቼክ አልተሳካም እና እንደ ውርስ ብቁ አይደለም። ኦፕሬተሩ ባችውን ለሁለት ከፍለው፣ የሚያስከፋውን PR ማስወጣት እና እንደገና ማስኬድ ይችላል። |

የአካባቢ ማለፊያ ለባለቤቱ ዶሴ ብቻ የምርመራ ማስረጃን ያቀርባል። እያንዳንዱ ማረፊያ አሁንም የባለቤት ፍቃድ፣ የራሱ አስፈላጊ ፍተሻዎች እና የጥላ ወረፋ ብይን ሲተገበር ይፈልጋል።

## እርከን

- **በ PR.** CI እና ጥራት በተቀየሩት መንገዶች ላይ ተመስርተው ቼኮችን ይምረጡ። ኮድ PRs ፈጣን ጥራት ያላቸውን በሮች እና ተጽዕኖ ያላቸው ሙከራዎችን ያካሂዳል፣ የተለየ አሃድ እና Vitest ስራዎች በ CI ውስጥ።
- **በወረፋ እጩ።** CI እና ጥራት ለተቀናበረው እጩ ሙሉ ፕሮፋይሉን በወረፋው ማጣቀሻ ላይ ያካሂዳሉ።
- **በእያንዳንዱ ልቀት ጠቃሚ ምክር።** መልቀቂያ-አረንጓዴው ከመንገድ ማጣሪያዎቹ ጋር በሚዛመዱ ግፊቶች ላይ ፈጣን ጠንካራ በሮችን ያስኬዳል። በቀን ሶስት የታቀዱ ሩጫዎች ለመልቀቂያው ቅርንጫፍ ሙሉውን መጥረግ ይጠቀማሉ።
- **በየመለቀቁ።** ሙሉው CI ማትሪክስ E2E ሻርዶችን፣ የጥቅል ማረጋገጫን፣ የታርቦል ቡት ጭስ እና የሽፋን ቼኮችን ያካትታል። [የመልቀቂያ ማረጋገጫ ዝርዝሩን](RELEASE_CHECKLIST.md) ይመልከቱ።

## ለ `merge-train.sh` አዲስ-ቼክአውት ቅድመ ሁኔታዎች

ቅድመ በረራው የስራ ዛፎችን ከመፍጠሩ በፊት ይሰራል። ጥገኞችን በ `npm ci` ይጫኑ። `node_modules/.bin/tsc` ሊተገበር የሚችል እና `node_modules/node_modules` እንደሌለ ያረጋግጡ። `node_modules/.bin/bun --version` እንደተሳካ ያረጋግጡ።

የ Bun postinstall ከተዘለለ `(cd node_modules/bun && node install.js)` ን ያሂዱ። የአቅራቢው ወጥነት እና የታወቁ ምልክቶች ቼኮች Bun ይጠቀማሉ። አረጋጋጩ `npm run check:cycles:ratchet` እንደ ማገጃ በር ይሰራል። ራሱን የቻለ `npm run check:cycles` ትዕዛዝ አማካሪ ነው።

## ታሪክ

የ Mergify ውህደት ወረፋ በ2026-11-19 ጡረታ ወጥቷል።
