# 🗜️ Prompt Compression Guide — OmniRoute (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> ብቁ በሆነ ኮንቴክስት ላይ 15-95% በራስ-ሰር ይቆጥቡ። ለፈጣን አጠቃላይ እይታ፣ [README Compression ክፍልን](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) ይመልከቱ።

## አጠቃላይ እይታ

OmniRoute ጥያቄዎች ወደ ውጫዊ አቅራቢዎች ከመድረሳቸው **በፊት** በቅድሚያ የሚሠራ ሞዱላር የፕሮምፕት ማመቂያ ፓይፕላይን ይተገብራል። ይህ ማለት የቶክን ቁጠባዎ በማይታይ ሁኔታ ይከናወናል — በየሥራ ፍሰትዎ ላይ ምንም ለውጥ አያስፈልግም።

```
የደንበኛ ጥያቄ
  → የማመቂያ ስትራቴጂ መራጭ
    → የኮምቦ ቅድሚያ መስጫ አለ? → የኮምቦ ቅንብሩን ይጠቀሙ
    → የራስ-ሰር ማስጀመሪያ ገደብ? → ራስ-ሰር ሁነታን ይጠቀሙ
    → ነባሪ ሁነታ? → ዓለም አቀፍ ቅንብሩን ይጠቀሙ
    → ጠፍቷል? → ማመቂያውን ዝለሉ
  → የተመረጠው የማመቂያ ሁነታ
    → ጠፍቷል፦ ምንም ማመቂያ የለም
    → ቀላል፦ ደህንነቱ የተጠበቀ የክፍተት/ቅርጸት ማጽዳት (~15%)
    → መደበኛ፦ የዋሻ-ሰው ንግግር የትርፍ ቃላት ማስወገድ (~30%)
    → ኃይለኛ፦ የታሪክ ማርጀት + ማጠቃለያ (~50%)
    → እጅግ ከፍተኛ፦ በሂዩሪስቲክ መቀነስ + የኮድ ብሎክ ማቅጠን (~75%)
    → RTK፦ ትዕዛዝን የሚያውቅ የተርሚናል/የመሣሪያ ውጤት ማጣሪያ (60-90% የውጫዊ አቅራቢ ክልል)
    → የተደራረበ፦ በቅደም ተከተል የሚሠራ ባለብዙ-ኤንጂን ፓይፕላይን፣ ብዙውን ጊዜ RTK ከዚያ Caveman (78-95% የብቁነት ክልል)
  → የታመቀ ጥያቄ → አቅራቢ
```

---

## የማመቂያ ሁነታዎች

### ጠፍቷል

ምንም ማመቂያ አይተገበርም። ሁሉም መልዕክቶች ሳይለወጡ ያልፋሉ።

### ቀላል ሁነታ (~15% ቁጠባ፣ <1ms መዘግየት)

ከሁሉም የተሻለ ደህንነት ያለው ሁነታ — ምንም የትርጉም ለውጥ የለም፤ የቅርጸት ማጽዳት ብቻ ይከናወናል፦

| ቴክኒክ                     | መግለጫ                                 |
| ------------------------ | ------------------------------------ |
| `collapseWhitespace`     | ተከታታይ ባዶ መስመሮችን እና የመጨረሻ ክፍተቶችን አዋህድ |
| `dedupSystemPrompt`      | የተባዙ የሥርዓት መልዕክቶችን አስወግድ             |
| `compressToolResults`    | ረዣዥም የመሣሪያ/የፋንክሽን ውጤቶችን አመቅ          |
| `removeRedundantContent` | የተደጋገሙ መመሪያዎችን አስወግድ                 |
| `replaceImageUrls`       | የbase64 ምስል ውሂብ URIዎችን አሳጥር          |

**ምርጥ የሚሆነው፦** ሁልጊዜ እንዲሠራ ለማድረግ፣ ደህንነት-ወሳኝ ለሆኑ የሥራ ፍሰቶች።

### መደበኛ ሁነታ (~30% ቁጠባ)

በ[Caveman](https://github.com/JuliusBrussee/caveman) የተነሳሳ — ትርጉሙን እየጠበቀ የትርፍ ቃላትን እና ረዣዥም አገላለጾችን ያስወግዳል፦

- የትርፍ ቃላትን ያስወግዳል ("እባክዎ", "እኔ እንደማስበው", "በመሠረቱ", "በእውነቱ")
- ረዣዥም ሐረጎችን ያሳጥራል ("ለማድረግ በሚል ዓላማ" → "ለማድረግ"፣ "በ... ምክንያት" → "ስለ")
- በትሕትና የተሞላ ማመንታትን ያስወግዳል ("እባክዎ ቢያደርጉ...", "ከቻሉ እባክዎ...")
- ለኮዲንግ ፕሮምፕቶች የተስተካከሉ 30+ regex ደንቦች

**ምርጥ የሚሆነው፦** ለዕለታዊ የኮዲንግ የሥራ ፍሰቶች፣ ወጪን ለሚያገናዝቡ ቡድኖች።

### ኃይለኛ ሁነታ (~50% ቁጠባ)

ለረጅም ክፍለ ጊዜዎች ብልህ የታሪክ አስተዳደር፦

- **የመልዕክት ማርጀት** — የቆዩ መልዕክቶች በደረጃ እየታመቁ ይሄዳሉ
- **የመሣሪያ ውጤት ማመቂያ** — ረዣዥም የመሣሪያ ውጤቶች ይቆረጣሉ ወይም ይተዋሉ (የመጀመሪያ/የመጨረሻ መስመሮች፣
  ተዛማጅ-መስመር ማጣሪያ፣ የJSON ቁልፍ ማጠቃለል)
- **የመዋቅር ታማኝነት ጥበቃዎች** — የ`tool_use` + `tool_result` ጥንዶች ወጥነታቸውን እንዲጠብቁ ያረጋግጣል
- **የኮንቴክስት መስኮት ግንዛቤ** — የእያንዳንዱን ሞዴል የቶክን ገደብ ያከብራል

**ምርጥ የሚሆነው፦** ለረዥም የማረም ክፍለ ጊዜዎች፣ ለትላልቅ የኮድ ማከማቻዎች።

### እጅግ ከፍተኛ ሁነታ (~75% ቁጠባ)

የቶክን ቁጥር ወሳኝ ለሆነባቸው ሁኔታዎች ከፍተኛው ማመቂያ፦

- **በሂዩሪስቲክ መቀነስ** — ነጥብን መሠረት ያደረገ የጽሑፍ ቶክኖችን መቀነስ
- **መዋቅርን መጠበቅ** — በአጥር የተከበቡ የኮድ ብሎኮች፣ የመስመር ውስጥ ኮድ፣ URLዎች እና መለያዎች
  በጊዜያዊ ምልክቶች ተተክተው ከዚያ ሳይለወጡ እንደገና ይያያዛሉ፤ ፈጽሞ አይቀነሱም
- **አማራጭ SLM ደረጃ** — ሲዋቀር አነስተኛ የአካባቢ ሞዴል ቅነሳውን የበለጠ ሊያሻሽል ይችላል
- ከኃይለኛ ሁነታ ነጻ ነው፦ የመልዕክት ማርጀትን፣ የመሣሪያ-ውጤት ማመቂያን
  ወይም የመጠባበቂያ ማጠቃለያ ሰጪውን አያስኬድም (የSLM-ደረጃ ውድቀት ብቻ የመጠባበቂያ ሂደትን
  በኃይለኛ ሁነታ ሊያስኬድ ይችላል)

**ምርጥ የሚሆነው፦** በተደጋጋሚ የኮንቴክስት ገደቦች ላይ ሲደርሱ።

### RTK ሁነታ (60-90% የውጫዊ አቅራቢ ክልል)

RTK ሁነታ በኮዲንግ ወኪል ክፍለ ጊዜዎች ውስጥ ለሚታዩ ረዣዥም የመሣሪያ ውጤቶች የተመቻቸ ነው፦

- እንደ `git status`፣ `git diff`፣ `git log`፣ የሙከራ አስኪያጆች፣
  TypeScript/Vite/Webpack ግንባታዎች፣ ESLint/Biome/Prettier፣ npm ኦዲት/ጭነቶች፣ Docker ሎጎች፣ የመሠረተ ልማት
  ውጤት እና አጠቃላይ የሼል ውጤት ያሉ የትዕዛዝ/ውጤት ምድቦችን ይለያል
- ከ`open-sse/services/compression/engines/rtk/filters/` የJSON ማጣሪያ ጥቅሎችን ይተገብራል
- የRTK TOML schema v1 ማጣሪያዎችን ከፕሮጀክት ወይም ከዓለም አቀፍ `filters.toml` ፋይሎች ያስመጣል፤ የመስመር-ውስጥ ሙከራ
  ማረጋገጫ እና ለፕሮጀክት ፋይሎች በእምነት የሚቆጣጠር መዳረሻ አለው
- 55 አብሮገነብ ማጣሪያዎችን ከመስመር-ውስጥ የማረጋገጫ ናሙናዎች ጋር ይዟል
- የANSI መቆጣጠሪያ ቅደም ተከተሎችን፣ የሂደት አሞሌዎችን፣ የተደጋገሙ መስመሮችን እና እርምጃ የማያስፈልገውን ጫጫታ ያስወግዳል
- ውድቀቶችን፣ ስህተቶችን፣ ማስጠንቀቂያዎችን፣ የተለወጡ ፋይሎችን፣ ማጠቃለያዎችን እና የረዥም ውጤት መጨረሻን ይጠብቃል
- በእምነት የሚቆጣጠሩ የፕሮጀክት ማጣሪያዎችን፣ ዓለም አቀፍ ማጣሪያዎችን እና አማራጭ የተሸፈነ ጥሬ-ውጤት መልሶ ማግኘትን ይደግፋል

**ምርጥ የሚሆነው፦** ሼል፣ ግንባታ፣ ሙከራ፣ git፣ grep እና የፋይል-ውጤት ቅጂዎች ላሏቸው የወኪል ክፍለ ጊዜዎች።

### የተደራረበ ሁነታ (78-95% የብቁነት ክልል)

የተደራረበ ሁነታ ብዙ የማመቂያ ኤንጂኖችን በወሰነ ቅደም ተከተል ያስኬዳል። ነባሪው ፓይፕላይን፦

```txt
RTK -> Caveman
```

ይህ ቅደም ተከተል በመጀመሪያ የተርሚናል/የመሣሪያ ውጤትን አጠቃሎ ይይዛል፤ ከዚያም ቀሪው ተፈጥሯዊ-ቋንቋ ፕሮምፕት ላይ የCaveman የትርጉም ማሳጠሪያን ይተገብራል። የተደራረቡ ፓይፕላይኖች በዓለም አቀፍ ደረጃ ወይም ለራውቲንግ ኮምቦዎች በተመደቡ የማመቂያ ኮምቦዎች በኩል ሊዋቀሩ ይችላሉ።

**ምርጥ የሚሆነው፦** ትላልቅ የመሣሪያ ሎጎችን ከሰው መመሪያዎች ወይም ከረዳት ማጠቃለያዎች ጋር ለያዘ ድብልቅ ኮንቴክስት።

---

## የUpstream ቁጠባ ስሌት

OmniRoute የመጭመቅ ቁጠባዎችን ከሁለት ምንጮች ይመዘግባል፦ የupstream ፕሮጀክት የአፈጻጸም መለኪያዎች እና
የOmniRoute የራሱ የኤንጂን ውህደት።

| ምንጭ     | እዚህ ላይ ጥቅም ላይ የዋለው የUpstream README ቁጥር                                                         |
| ------- | ----------------------------------------------------------------------------------------------- |
| Caveman | `~75%` ያነሱ የውጤት ቶከኖች፣ `65%` የአፈጻጸም መለኪያ አማካይ የውጤት ቁጠባ፣ `22-87%` ክልል፣ እና `~46%` የግብዓት መጭመቂያ መሣሪያ |
| RTK     | `60-90%` የትዕዛዝ ውጤት ቁጠባ፤ የናሙና ክፍለ ጊዜ `~118,000 -> ~23,900` ቶከኖች፣ ወይም `79.7%` ተቆጥቧል (`~80%`)      |

ለተደራራቢ የመሣሪያ/አውድ የውሂብ ጥቅሎች፣ ነባሪው የOmniRoute ጥምረት ኤንጂኖቹን በተከታታይ ያዋህዳል፦

```txt
RTK -> Caveman
```

የተዋሃደው ቁጠባ በማባዛት የሚሰላ እንጂ በመደመር አይደለም፦

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

ያ `78-95%` ቁጥር RTK እና Caveman ሁለቱም ተመሳሳዩን የግብዓት/አውድ የውሂብ ጥቅል መቀነስ ሲችሉ ይሠራል።
የCaveman ምላሽ ውጤት ሁነታ የተለየ ነው፦ ሲነቃ የCavemanን የራሱን የውጤት ቁጠባ (`65%`
አማካይ፣ `~75%` ዋና አኃዝ፣ `22-87%` ክልል) ይጠቀሙ። አጠቃላይ የክፍያ ቁጠባው በprompt/ውጤት ድብልቅዎ ላይ ይወሰናል።

### በእርግጥ "ብቁ" ማለት ምንድን ነው

የ15-95% ዋና የክልል አኃዝ ትክክለኛ ነው፣ ነገር ግን **ተደጋጋሚ ወይም ከመጠን በላይ ዝርዝር** ለሆነ ይዘት ብቻ ይሠራል — ተደጋጋሚ
የስህተት መስመሮች፣ ተመሳሳዩን ማስጠንቀቂያ ደጋግሞ የሚያሳይ build log፣ ወይም ከመጠን በላይ የሆነ `grep`/የፋይል-ንባብ ውጤት። ይህ
**እያንዳንዱ** ጥያቄ ያን ያህል ቁጠባ ያስገኛል ማለት አይደለም።

በተግባር ተረጋግጧል (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`)፦ 300 ተመሳሳይ
የስህተት መስመሮችን በያዘ የAnthropic ቅርጽ `tool_result` ብሎክ ላይ የተካሄደ `stacked` (RTK + Caveman) ሙከራ
**95.93% የቶከን ቁጠባ / 96.26% የቁምፊ ቁጠባ** አስገኝቷል — ይህም በማስታወቂያው ክልል ውስጥ በትክክል
ይገኛል። ነገር ግን ተመሳሳዩ pipeline በመደበኛ፣ ተደጋጋሚ ባልሆነ የመሣሪያ ውጤት (ንጹሕ የ`grep` ተዛማጅ ዝርዝር፣
አጭር የፋይል ንባብ፣ መደበኛ የውይይት ጽሑፍ) ላይ ሲሠራ **ወደ ዜሮ የቀረበ ቁጠባ** በትክክል ያስገኛል፤ ምክንያቱም
የሚወገድ ተደጋጋሚ ነገር የለም፣ እንዲሁም `validateCompression()` (`validation.ts`) የኮድ ብሎኮችን፣ URLsን፣ ርዕሶችን፣ ስሪቶችን ወይም ALL-CAPS የቋሚ መለያዎችን
የሚጥል ወይም የሚቀይር ዳግም ጽሑፍ እንዲላክ አይፈቅድም።

ይህ የሚጠበቅ፣ ደህንነቱ የተጠበቀ ባህሪ እንጂ bug አይደለም፦ በአብዛኛው ንጹሕ ፋይሎችን የሚያነብ/በgrep የሚፈልግ የኮድ ክፍለ ጊዜ
መጭመቅ ሙሉ በሙሉ ቢነቃም መጠነኛ አጠቃላይ ቁጠባ ያሳያል፤ ያልተሳካ የድግግሞሽ
ሂደት ወይም ከመጠን በላይ መልዕክት የሚያወጣ linter ያጋጠመው ክፍለ ጊዜ ግን በዚያ ትራፊክ ላይ ሙሉውን የ78-95% ክልል ያሳያል። የአንድን ክፍለ ጊዜ
ዝቅተኛ የጥቅል ቁጠባ መቶኛ መጭመቁ በተሳሳተ ሁኔታ እንደተዋቀረ ማስረጃ አድርገው አይጠቀሙ — መጀመሪያ መሠረታዊው
የመሣሪያ ውጤት በእርግጥ ተደጋጋሚ እንደነበር ያረጋግጡ።

---

## የቶከን ቁጠባ ምስላዊ ማሳያ

```
ያለ መጭመቅ፦        47K ቶከኖች ወደ LLM ተልከዋል
በLite፦              40K ቶከኖች ተልከዋል          (15% ተቆጥቧል — ደህንነቱ የተጠበቀ፣ ሁልጊዜ የነቃ)
በStandard፦          33K ቶከኖች ተልከዋል          (30% ተቆጥቧል — የcaveman-speak ደንቦች)
በAggressive፦        24K ቶከኖች ተልከዋል          (50% ተቆጥቧል — ማርጀት + ማጠቃለል)
በUltra፦             12K ቶከኖች ተልከዋል          (75% ተቆጥቧል — በግምታዊ ዘዴ መቀነስ)
በRTK፦               19K-5K ቶከኖች ተልከዋል       (በትዕዛዝ/መሣሪያ ውጤት ላይ 60-90% ተቆጥቧል)
በStacked፦           10K-2.5K ቶከኖች ተልከዋል     (ብቁ የሆነ የRTK+Caveman ክልል 78-95%)
```

---

## ውቅር

### ዳሽቦርድ

ወደ `Dashboard → Context & Cache` ይሂዱ፦

- **Caveman** — የሁነታ ምርጫ፣ የቋንቋ ጥቅሎች፣ ቅድመ-እይታ እና ዓለም አቀፍ ነባሪዎች
- **RTK** — የትዕዛዝ ማጣሪያ ቅድመ-እይታ፣ የRTK ደህንነት ቅንብሮች እና የማጣሪያ ካታሎግ
- **Compression Combos** — ለማዘዋወሪያ ጥምረቶች የተመደቡ በስም የሚታወቁ የሞተር ፓይፕላይኖች
- **Auto-Trigger Threshold** — የቶከን ብዛት ከገደቡ ሲበልጥ መጭመቅን በራስ-ሰር ያስጀምራል

### በየጥምረቱ መሻር

በ`Dashboard → Context & Cache → Compression Combos` ውስጥ ለአንድ የማዘዋወሪያ
ጥምረት የመጭመቂያ ጥምረት ይመድቡ፦

```txt
ጥምረት፦ "free-tier-fallback"
  የመጭመቂያ ጥምረት፦ "coding-agent-stack"
  ፓይፕላይን፦ RTK -> Caveman
  ዒላማዎች፦
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

ይህ በክፍያ/ኮዲንግ አቅራቢዎች ላይ የተደራረበ መጭመቅ እንዲጠቀሙ፣ በሚከፈልባቸው
የደንበኝነት ምዝገባዎች ላይ ደግሞ ቀላል ሁነታን እንዲያቆዩ ያስችልዎታል።

ይህ የ"በየጥምረቱ መሻር" ምደባ ከ**የማዘዋወሪያ-ጥምረት መጭመቂያ
ሁነታ** መሻር (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — የመስኩ
ስኪማ `rtk`፣ `stacked` እና `omniglyph`ንም ይቀበላል) የተለየ መቆጣጠሪያ ነው — ያ መሻር በስም
የሚታወቅ የመጭመቂያ-ጥምረት ፓይፕላይን አይመርጥም፤ በ`resolveCompressionPlan`
የሚመረመረውን `compressionMode` መስክ ብቻ ያዘጋጃል። በጥምረት ካርዱ (`Dashboard → Combos`) ላይ ወይም፣ ከ
#6760 ጀምሮ፣ ከላይ ከተመዘገበው የፓይፕላይን-ምደባ ምልክት ሳጥን አጠገብ በ
`Dashboard → Context & Cache → Compression Combos` ውስጥ ባለው የ"Assign to routing" ዝርዝር ላይ ለእያንዳንዱ የማዘዋወሪያ ጥምረት
ሊዘጋጅ ይችላል። ሁለቱም በይነገጾች በተመሳሳዩ `PUT /api/combos/{id}` የመጨረሻ ነጥብ በኩል ያስቀምጣሉ።

### በየጥያቄው መሻር

ለአንድ ጥያቄ የመጭመቂያ ዕቅዱን ለመሻር የ`x-omniroute-compression` የጥያቄ ራስጌን
ይላኩ። ከሁሉ ከፍተኛው ቅድሚያ አለው — የማዘዋወሪያ-ጥምረት መሻርን፣ ንቁውን መገለጫ፣
ራስ-ሰር ማስጀመሪያውን እና የፓነሉን Default ይበልጣል። ያልታወቁ እሴቶች ችላ ይባላሉ (ጥያቄው በፍጹም ውድቅ አይደረግም)፣
እና ዓለም አቀፉ ዋና መቀየሪያ አሁንም ሁሉንም ነገር ይቆጣጠራል፦ መጭመቅ በዓለም አቀፍ ደረጃ ጠፍቶ ሲሆን ራስጌው
ሊያበራው አይችልም። እሴቶች፦

| እሴት           | ውጤት                                                                     |
| ------------- | ----------------------------------------------------------------------- |
| `off`         | ለዚህ ጥያቄ ምንም መጭመቅ አይደረግም።                                                |
| `default`     | ከፓነሉ የሚመነጨው Default መገለጫ (ንቁውን መገለጫ ችላ ይላል)። መረጃ የሚያጡ ሞተሮች እንደጠፉ ይቆያሉ።  |
| `safe`        | ራስጌውን ካለመጨመር ጋር ተመሳሳይ፦ የተደጋጋሚ ይዘት ማስወገድ እና የነጭ ቦታ ማጠፍ ብቻ።               |
| `allow-lossy` | ማጠቃለያዎችን፣ የአግባብነት ማጣሪያዎችን እና የቅጥ ዳግም ጽሑፎችን ጨምሮ የዚህን ጥያቄ ኦፕሬተር ዕቅድ ያቆያል። |
| `engine:<id>` | ከነቃ አንድ ሞተር፣ ለምሳሌ `engine:rtk`። ይህ ለዚያ ሞተር በየጥያቄው የሚደረግ መርጦ መግባት ነው።    |
| `<combo>`     | በመጀመሪያ በስም (የፊደል መጠንን ሳይለይ)፣ ከዚያም በመለያ የሚዛመድ በስም የሚታወቅ ጥምረት።            |

ያለ`allow-lossy`፣ `engine:<id>` ወይም በስም የሚታወቅ ጥምረት፣ መረጃ የሚያጡ ሞተሮች አይተገበሩም።
መጭመቅ በርቶ ሲሆን ጥያቄው አሁንም የክፍለ-ጊዜ ተደጋጋሚ ይዘት ማስወገድ እና የነጭ ቦታ ማጠፍን ያገኛል።

የተተገበረው ዕቅድ በ`X-OmniRoute-Compression: <mode>; source=<source>` የምላሽ
ራስጌ ውስጥ ተመልሶ ይታያል፤ በዚያም `<source>` ከ`request-header`፣ `routing-override`፣ `active-profile`፣
`auto-trigger`፣ `default` ወይም `off` አንዱ ነው።

### API

```bash
# የመጭመቂያ ቅንብሮችን ያግኙ
curl http://localhost:20128/api/settings/compression

# የመጭመቂያ ቅንብሮችን ያዘምኑ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# አንድን የተወሰነ RTK/stacked ፔይሎድ በቅድሚያ ይመልከቱ
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# የRTK ማጣሪያ ጥቅሎችን ይዘርዝሩ
curl http://localhost:20128/api/context/rtk/filters

# RTKን ከአማራጭ የትዕዛዝ ሜታዳታ ጋር በቀጥታ ይሞክሩ
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## ምን ጥበቃ ይደረግለታል

የማመቂያ ሞተሩ **ሁልጊዜ የሚከተሉትን እንዳሉ ይጠብቃል፦**

- ✅ የኮድ ብሎኮች (በአጥር የተከበቡ እና በመስመር ውስጥ ያሉ)
- ✅ URLs እና የፋይል ዱካዎች
- ✅ JSON መዋቅሮች እና የተዋቀረ ውሂብ
- ✅ መለያዎች እና ጥበቃ የተደረገላቸው ቴክኒካዊ ቶከኖች
- ✅ የሒሳብ አገላለጾች
- ✅ የመሣሪያ/ተግባር ጥሪ ትርጓሜዎች
- ✅ የስርዓት ፕሮምፕቶች (በ lite ሁነታ)

የRTK ጥሬ-ውጤት መልሶ ማግኛ፣ ማንኛውም ነገር ከመቀመጡ በፊት የተለመዱ API ቁልፎችን፣ bearer ቶከኖችን፣ Slack ቶከኖችን፣ AWS የመዳረሻ ቁልፎችን፣
የይለፍ ቃላትን፣ ቶከኖችን እና ሚስጥሮችን ይሰውራል።

---

## የመጭመቅ ስታቲስቲክስ

እያንዳንዱ የተጨመቀ ጥያቄ በሰርቨሩ ሎጎች ውስጥ ስታቲስቲክስን ያካትታል፦

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## የደረጃዎች ፍኖተ ካርታ

| ደረጃ    | ሁነታዎች                                                                                                                    | ሁኔታ     |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| ደረጃ 1  | Off, Lite                                                                                                                | ✅ ተለቋል |
| ደረጃ 2  | Standard, Aggressive, Ultra                                                                                              | ✅ ተለቋል |
| ደረጃ 3  | RTK, Stacked, Compression Combos                                                                                         | ✅ ተለቋል |
| ደረጃ 4  | Output Styles, SLM-tier Ultra, eval harness                                                                              | ✅ ተለቋል |
| ደረጃ 4C | አውድ-በጀትን የሚላመድ ("dial") — የስሌት ሞተር + API (`contextBudget` በ`PUT /api/settings/compression` ላይ) + የዳሽቦርድ ሁነታ/ፖሊሲ መቆጣጠሪያዎች | ✅ ተለቋል |

---

## ምስጋናዎች

የStandard ሁነታ የማመቂያ ደንቦች በ**[JuliusBrussee](https://github.com/JuliusBrussee)** ከተፈጠረው **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — በፍጥነት ታዋቂ ከሆነው "ጥቂት ቶከኖች ሥራውን ሲሠሩ ለምን ብዙ ቶከኖችን መጠቀም ያስፈልጋል" ፕሮጀክት — የተነሱ ናቸው። Caveman `~75%` ያነሱ የውጤት ቶከኖች፣ በቤንችማርክ አማካይ `65%` የውጤት ቁጠባ፣ `22-87%` የውጤት ክልል እና `~46%` የግብዓት-ማመቂያ መሣሪያ እንዳሉት ዘግቧል።

የRTK ሁነታ በ**[RTK AI](https://github.com/rtk-ai)** ከተፈጠረው **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — ለተርሚናል፣ build፣ test፣ git እና የመሣሪያ-ውጤት ማጣሪያ የተዘጋጀው ከፍተኛ-አፈጻጸም ያለው የትዕዛዝ-ውጤት ማመቂያ ፕሮጀክት — የተነሳ ነው። RTK `60-90%` ቁጠባ እንዳለው ዘግቧል፤ የREADME ናሙና ክፍለ ጊዜውም `~80%` መቆጠቡን ያሳያል።

---

## የላቁ የማመቅ ስርዓቶች

ከላይ ከተገለጹት 7 ሁነታዎች ባሻገር (ምንጩ በተጨማሪ `codex-responses` እና
`omniglyph` ሁነታዎችን ይቀበላል፤ ይህ መመሪያ ግን አይሸፍናቸውም)፣ ከታች ያሉት ክፍሎች
በእነዚያ ሁነታዎች ውስጥ ወይም ከእነሱ ጎን ለጎን የሚሰሩ ባህሪያትን ይሸፍናሉ፦ Tool Result Compression እና Progressive Aging
የኃይለኛው ሞተር ደረጃ 1 እና 2 ናቸው (Aggressive ሁነታ እና በተደራራቢ ቧንቧ መስመር ውስጥ ያለ `aggressive` ደረጃ)፣
Stacked Pipeline ደግሞ Stacked ሁነታ የሚሰራበት መንገድ ነው፤ Cache-Aware Compression
ማመቅ በርቶ ሳለ ለመሸጎጫ አቅራቢዎች `aggressive` እና `ultra`ን ወደ `standard` ዝቅ ያደርጋል፤
Caveman Output Mode እና Output Styles ደግሞ በነባሪነት የጠፉ፣ በምርጫ የሚነቁ የስርዓት-መጠየቂያ መመሪያዎች ሲሆኑ፣
ጥያቄውን ከማመቅ ይልቅ የሞዴሉን ውጤት ይቀርጻሉ።

### መሸጎጫን የሚያገናዝብ ማመቅ

አንዳንድ አቅራቢዎች (ለምሳሌ Anthropic በመጠየቂያ መሸጎጥ) **የመጠየቂያ መሸጎጥን**
ይደግፋሉ፤ ይህም ወጪንና መዘግየትን ለመቀነስ የመጠየቂያውን ክፍሎች በመሸጎጫ እንዲያስቀምጡ ያስችላቸዋል።
መሸጎጥ ሲነቃ፣ ኃይለኛ ማመቅ በመሸጎጫ የተቀመጡ ቶከኖችን ስለሚቀይርና
መሸጎጫውን ዋጋ ቢስ ስለሚያደርግ፣ አፈጻጸሙን በእርግጥ **ሊጎዳ** ይችላል።

የ`cachingAware.ts` ሞጁል **የመሸጎጫ አውድን በመለየት** እና
በዚያ መሠረት **የማመቅ ስልቱን በማስተካከል** ይህን ችግር ይፈታል።

#### እንዴት እንደሚሰራ

1. **የመሸጎጫ አውድን ይለያል** — የጥያቄውን አካል ለ`cache_control` ምልክቶች ይቃኛል
2. **የመሸጎጫ አቅራቢዎችን ይለያል** — ዒላማው አቅራቢ መሸጎጥን የሚደግፍ መሆኑን ይፈትሻል
3. **ስልቱን ያስተካክላል** — ለመሸጎጫ አቅራቢዎች `aggressive`/`ultra`ን ወደ `standard` ዝቅ ያደርጋል
4. **የስርዓት መጠየቂያውን ይዘላል** — የስርዓት መጠየቂያዎች ብዙውን ጊዜ ይሸጎጣሉ፣ ስለዚህ አያምቃቸውም

የስልት ረዳቱ በተጨማሪ `deterministicOnly` ጠቋሚን ይመልሳል፣ ነገር ግን የዕቅድ ገንቢው
የሚጠቀመው ስልቱን ብቻ ነው — በአሁኑ ጊዜ ከዚያ በኋላ ያለ ምንም ክፍል ጠቋሚውን አያነብም።

#### የኮድ ምሳሌ

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← የመሸጎጫ ምልክት
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### መቼ መጠቀም እንደሚገባ

መሸጎጫን የሚያገናዝብ ማመቅ **ሁልጊዜ እንደበራ ነው** — ምንም ውቅር አያስፈልግም።
ማመቅ በርቶ እና ዒላማው አቅራቢ የመጠየቂያ መሸጎጥን በሚደግፍበት ጊዜ (Anthropic፣ OpenAI፣
ወዘተ) ሁሉ ይሰራል፤ ግልጽ የ`cache_control` ምልክቶች አያስፈልጉም — የመሸጎጫ አቅራቢ ብቻውን
ወደ ዝቅተኛው ስልት መውረድን ያስጀምራል፣ ምልክቶች ብቻቸውን ግን ፈጽሞ አያስጀምሩትም
(የምልክት ማወቂያው የሚመግበው የመሸጎጫ ቴሌሜትሪን እንጂ የስልት ውሳኔውን አይደለም)።

### ቀስ በቀስ ማርጀት

ረጅም ውይይቶች ብዙ የመልዕክት ተራዎችን ያከማቻሉ፣ ነገር ግን የቆዩ ተራዎች
አግባብነታቸው እየቀነሰ ይሄዳል። የ`progressiveAging.ts` ሞጁል **መልዕክቶችን በተራ ርቀት መሠረት ያቃልላል**
(ርቀቱ የሚለካው ከውይይቱ መጨረሻ አንጻር ነው)። በቀረቡት ነባሪ ቅንብሮች
(`verbatim: 2, light: 2, moderate: 3`)፦

- **የመጨረሻዎቹ 2 ተራዎች (ርቀት ≤ 2)**፦ ቃል በቃል ይቀመጣሉ
- **ርቀት 3**፦ Caveman ማመቅ (መሙያ ቃላትን ማስወገድ)
- **ርቀት 4+**፦ የረዳት መልዕክቶች ይጠቃለላሉ፤ የተጠቃሚ መልዕክቶች እስከ 120 ቁምፊዎች
  በሚገደብ ሁኔታ ወደ መጀመሪያ መስመራቸው ይቀነሳሉ፤ ሌሎች ሚናዎች ሳይነኩ ይቀራሉ። የስርዓት መጠየቂያዎች፣
  ቀደም ሲል ያረጁ መልዕክቶች እና የቅርብ ጊዜው የተጠቃሚ መልዕክት ርቀታቸው ምንም ይሁን ምን ሁልጊዜ ቃል በቃል ይቀመጣሉ።
  ምንም ነገር ሙሉ በሙሉ አይጣልም፣ እና በቀረቡት ነባሪዎች (`light` ከ`verbatim` ጋር እኩል ነው)
  የ`light` ወሰን ሊደረስበት አይችልም።

#### የኮድ ምሳሌ

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 ተጨማሪ ተራዎች ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // የመጨረሻዎቹ 3 ተራዎች፦ ቃል በቃል
  light: 8, // ርቀት <= 8፦ ቀላል ማመቅ
  moderate: 20, // ርቀት <= 20፦ caveman ማመቅ
  fullSummary: 5, // በዓይነቱ የሚያስፈልግ፣ በወሰን አከፋፈል ኮዱ የማይነበብ
  // ርቀት > 20፦ ይጠቃለላል (assistant) / የመጀመሪያው መስመር ይቀመጣል (user)
});

// saved = የተቆጠቡ ቶከኖች ብዛት
```

#### መቼ መጠቀም እንደሚገባ

ቀስ በቀስ ማርጀት ለ`aggressive` ሁነታ **ሁልጊዜ እንደበራ ነው** — ይህ የ
`compressAggressive()` ደረጃ 2 ነው። Ultra ሁነታ አያስኬደውም። በተለይ ለሚከተሉት
ውጤታማ ነው፦

- ለረጅም ጊዜ የሚቀጥሉ የኮድ አጻጻፍ ክፍለ ጊዜዎች
- ብዙ ቀናት የሚቆዩ ውይይቶች
- ብዙ የመሣሪያ ጥሪዎች ያሏቸው ወኪላዊ የሥራ ፍሰቶች

### Caveman የውጤት ሁነታ

Caveman የውጤት ሁነታ ሞዴሉ ራሱ አጭር ውጤት እንዲሰጥ የሚጠይቁ
**የስርዓት መጠየቂያ መመሪያዎችን** ያክላል — የ`lite` ደረጃ ሙሉ ዓረፍተ ነገሮችን የሚያቆዩ አጭር መልሶችን ይጠይቃል፣ `full`
ደግሞ "respond terse like smart caveman" ብሎ እንዲመልስ ይጠይቀዋል፣ `ultra` ደግሞ እጅግ አጭር፣ እንደ ቴሌግራፍ ያለ ውጤትን ይጠይቃል፤
መመሪያዎቹ የሚጠይቁ ብቻ ናቸው፣ ውጤቱን ዋስትና ሊሰጡ አይችሉም። ጥያቄዎች እነዚህን በ
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) በኩል ይቀበላሉ፦
`open-sse/handlers/chatCore.ts` በመጀመሪያ ምርጫውን በወደኋላ-ተኳኋኝነት አስተካካዩ
(`resolveOutputStyleSelection()` በ
`open-sse/services/compression/outputStyles/backCompat.ts`) ይወስናል፤ ይህም `outputStyles`
ባዶ ሲሆን፣ የነቃ `cavemanOutputMode`ን በ`cavemanOutputMode.intensity` ደረጃ ወደ `terse-prose` የውጤት ቅጥ
ይመድባል (ከታች ያለውን ወደኋላ-ተኳኋኝነት ይመልከቱ)፤ ባዶ ያልሆነ `outputStyles`
ምርጫ እንዳለ ይጠቀማል፣ ከዚያም `cavemanOutputMode.enabled` እና `intensity` ምንም
ተፅዕኖ አይኖራቸውም፣ የ`autoClarity` መቀያየሪያው ግን አሁንም ተግባራዊ ይሆናል። `outputMode.ts`
የመመሪያ ጽሑፎቹን (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`)፣ የይዘት ማለፊያውን እና
መርፌ ማስገባቱ የሚጠቀምበትን የአቀማመጥ ረዳት ይይዛል፤ የራሱ `applyCavemanOutputMode()` መርፌ አስገቢ ግን
በምርት አካባቢ የሚጠራው አካል የለውም።

#### እንዴት እንደሚሰራ

ይህ ሁነታ ግቤቱን አያመቀውም። ወደ system prompt የመመሪያ ብሎክ ያክላል
(ከታች How injection worksን ይመልከቱ)፣ እና ለጥያቄው የተመረጠ ማንኛውም የግቤት ማመቂያ ሁነታ
ከዚያ በኋላም ብሎኩን አሁን በያዘው ይዘት ላይ ይሠራል። እያንዳንዱ ደረጃ በሚያበቃበት የጋራ
ወሰኖች አንቀጽ በፊት፣ የእንግሊዝኛው `full` ደረጃ እንዲህ ይላል፦

> "እንደ ብልህ ዋሻ-ሰው አጭር መልስ ስጥ። articles (a/an/the)፣ ሙሌት ቃላት (just/really/basically/actually/simply)፣ የጨዋነት አባባሎች፣ ማወላወልን አስወግድ። ያልተሟሉ ሐረጎች ችግር የለባቸውም። አጭር ተመሳሳይ ቃላትን ተጠቀም (big እንጂ extensive አይደለም፣ fix እንጂ implement አይደለም)። ሁሉንም ቴክኒካዊ ይዘት፣ code፣ errors፣ URLs፣ identifiers ሳይለወጡ አቆይ።"

ይህ በተለይ ለሚከተሉት በጥሩ ሁኔታ ይሠራል፦

- ኮድ ማመንጨት (አጭር ውጤት = ጥቂት tokens)
- ፈጣን ጥያቄና መልስ (ሰፊ ማብራሪያዎች አያስፈልጉም)
- ባች ሂደት (የሥራ ፍሰትን ከፍተኛ ማድረግ)

#### መቼ መጠቀም እንደሚገባ

Caveman output mode **በምርጫ የሚነቃ** ነው። ማመቂያው ሲበራ (`enabled: true`፣ በCompression Settings ገጽ ላይ ያለው ዋና መቀያየሪያ)፣ በ`cavemanOutputMode.enabled` ያብሩት፤ `intensity`
`lite`፣ `full` ወይም `ultra`ን ይመርጣል፦

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

የማመቂያ ጥምረት **Output Mode** መቀያየሪያ (`outputMode`፣ ደረጃው በ`outputModeIntensity`)
ያ ጥምረት ለሚተገበርባቸው ጥያቄዎች ተመሳሳይ መቀያየሪያን ያዘጋጃል፣ እና
`omniroute_set_compression_engine` MCP መሣሪያ በboolean `outputMode`
ነጋሪ እሴቱ በኩል ይጽፈዋል። ባዶ ያልሆነ የ`outputStyles` ምርጫ ከዚህ መቀያየሪያ ቅድሚያ ያገኛል። በdashboard ውስጥ፣ የ**Terse prose** output styleን ማንቃት ተመሳሳይ ብሎክን ያስገባል (ከታች Output
Stylesን ይመልከቱ)።

### Output Styles (ካታሎግ)

ከላይ ያለው Caveman output mode **የቆየው ነጠላ-style መንገድ** ነው። Phase 4 ይህን
ወደ ሊጣመሩ የሚችሉ output styles ካታሎግ አጠቃላይ አድርጎታል፦ `OUTPUT_STYLE_CATALOG` በ
`open-sse/services/compression/outputStyles/catalog.ts`። እያንዳንዱ style ሞዴሉ ራሱ አነስተኛ ወጪ ያለው ውጤት እንዲሰጥ የሚጠይቅ system-prompt
መመሪያ ነው፤ styles በአንድ ላይ ሊነቁ ይችላሉ፣ እና በካታሎጉ ቅደም ተከተል ይገባሉ።

| Style                     | `id`            | የሚያደርገው                                                                                                                                                                                                 | የመመሪያ ቋንቋዎች                                   |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| አጭር ስድ ንባብ                | `terse-prose`   | ሙሌት ቃላትን/articles/ማወላወልን ያስወግዳል፤ ቴክኒካዊ ይዘትን ሳይለወጥ ያቆያል። ከቆየው caveman output mode ጋር ተመሳሳይ ጽሑፍ ነው (እንደገና አልተጻፈም፣ በማጣቀሻ ይጠቀማል)።                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ያነሰ ኮድ                    | `less-code`     | YAGNI ደረጃ፦ አነስተኛው የሚሠራ ለውጥ፣ ያልተጠየቁ abstractions አይኖሩም።                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (ሰነፍ senior dev) | `ponytail`      | "ምርጡ ኮድ ፈጽሞ ያልተጻፈው ኮድ ነው"፦ ዳግም መጠቀም > ዳግም መጻፍ፣ ዋና መንስኤ > ምልክት፣ አጭሩ የሚሠራ diff።                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ADHD አለብኝ (እርምጃ-ቀዳሚ)      | `i-have-adhd`   | እርምጃ መጀመሪያ (ከስድ ጽሑፍ በፊት command/path/snippet)፣ ቁጥር ያላቸው የተወሰኑ ደረጃዎች፣ አንድ ተጨባጭ ቀጣይ እርምጃ፣ መግቢያ/ማጠቃለያ/መዝጊያ የለም። ከ[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) የተወሰደ።                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI ማጣሪያ          | `antislop-ui`   | እያንዳንዱ የእይታ ቴክኒክ የዓላማ ፈተናን (ተዋረድ፣ ማንነት፣ ተነባቢነት) ማለፍ አለበት፤ ነባሪ gradients/glass/glow የሉም፣ የተገደበ palette፣ template layouts የሉም። ሁለቱም antislop styles የማይሠሩ controls / የተፈበረኩ የይገባኛል ጥያቄዎች እንዳይኖሩ ወሰን ያክላሉ። | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop የጽሑፍ እና የሰው ማጣሪያ | `antislop-copy` | የተወሰነ ጽሑፍ (em dash፣ አጠቃላይ CTAs፣ buzzwords፣ chatbot መዝጊያዎች፣ የተፈጠሩ እውነታዎች የሉም) ከሰዎች ጋር የተያያዙ ደንቦችን ጨምሮ፦ WCAG AA contrast፣ የሚታይ focus፣ በkeyboard ተደራሽነት፣ empty/loading/error states፣ mobile reflow።        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| አጭር CJK (文言)            | `terse-cjk`     | የ`full`/`ultra` መልስ በClassical Chinese (文言)፤ `lite` የተግባር ቃላት፣ የጨዋነት አባባሎች ወይም ጌጣጌጥ የሌሉትን አጭር መልሶች ብቻ ይጠይቃል።                                                                                          | zh (በlocale የተገደበ፣ ከታች ይመልከቱ)                 |

እያንዳንዱ style ሦስት intensity ደረጃዎችን — `lite`፣ `full`፣ `ultra` — ይዞ ይመጣል፣ እና እያንዳንዱ ደረጃ
በጋራ ወሰኖች አንቀጽ (`SHARED_BOUNDARIES` በ`outputMode.ts`) ያበቃል፤ ይህም
code blocks፣ file paths፣ commands፣ errors እና URLs ሳይለወጡ ያቆያል። የ`terse-prose` እና
`terse-cjk` ደረጃ ጽሑፎች identifiersን ወደዚያ ዝርዝር ያክላሉ።

`terse-cjk` በሁለት ቦታዎች ለ`zh` በlocale የተገደበ ነው። የCompression Settings ገጽ
የdashboard UI ቋንቋ ቻይንኛ (`zh-CN` ወይም `zh-TW`) ሲሆን ብቻ ረድፉን ያሳያል፣ እና
`applyOutputStyles()` የጥያቄው የተወሰነ ቋንቋ (ከታች Language
selectionን ይመልከቱ) `zh` ሲሆን ብቻ ያስገባዋል። ረድፉን መደበቅ የተቀመጠ `terse-cjk` ምርጫን አያጸዳም፦
የsettings API ማንኛውንም style id ይቀበላል፣ እና በገጹ ላይ ሌሎች stylesን ማስቀመጥ ያንን ያቆየዋል። ጥያቄው
በሚሠራበት ጊዜ፣ የ`applyOutputStyles()` ቋንቋ ማረጋገጫ ብቸኛው locale gate ነው።

#### ማስገባቱ እንዴት እንደሚሠራ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ምርጫውን
ከካታሎጉ ጋር ያመሳክራል (ያልታወቁ ids እና ከlocale ጋር የማይዛመዱ styles
ይወገዳሉ፣ ፈጽሞ እንደ ስህተት አይቆጠሩም፤ ወደ ምንም style የማይደርስ ምርጫ bodyውን
ሳይቀይር ይተወዋል፣ እንደ `no_styles` ይዘለላል)፣ የተመረጡትን instructions በካታሎጉ
ቅደም ተከተል ያገናኛል፣
የboundaries clauseን **አንድ ጊዜ** ይጨምራል (እንዲሁም `less-code` ወይም
`ponytail` ሲመረጥ safety clauseን፣ `SAFETY_BOUNDARIES`ን ወይም ትርጉሙን)፣ እና blockውን
በአንድ idempotency marker (`[OmniRoute Output Styles]`) ይጀምራል፤ ስለዚህ እንደገና
መተግበር ምንም ለውጥ አያመጣም። የተወሰነው ቋንቋ (ከታች ያለውን የቋንቋ ምርጫ ይመልከቱ)
ትርጉም ሲኖረው፣ ከእንግሊዝኛው ይልቅ localized instruction ይገባል።

ባዶ ያልሆነ `messages` array ባለው body ላይ idempotency check ከcontent bypass
በፊት ይሰራል፦ `[OmniRoute Output Styles]` marker አስቀድሞ በtop-level
`system` field (string ወይም content-block array) ወይም string content ባለው system
message ውስጥ ካለ፣ bodyው እንደ `already_applied` ሳይቀየር ይቀራል እና ምንም keyword
check አይከናወንም። አለበለዚያ content bypass (`shouldBypassCavemanOutputMode()`
በ`open-sse/services/compression/outputMode.ts`) ሚናቸው ምንም ይሁን ምን የመጨረሻዎቹን
ሦስት messages ጽሑፍ ይመረምራል፣ እና ያ ጽሑፍ ከsecurity፣ irreversible-action ወይም
clarification keywords ጋር ሲዛመድ፣ ወይም በቅደም ተከተል ላይ ጥገኛ ከሆነው ተከታታይ፦
`first`፣ `then`፣ `after that`፣ `before`፣ `rollback` ወይም
`backup`፣ በ240 characters ውስጥ `delete`፣ `drop`፣ `migrate`፣ `deploy` ወይም
`release` ተከትሎት ከመጣ፣ ለመላው turn stylesን ይዘላል። bypassው **Auto-Clarity
Bypass** toggle (`cavemanOutputMode.autoClarity`፣ በነባሪ የበራ) በርቶ ሳለ
ይሰራል፤ toggleውን ማጥፋት keyword checkን ይዘላል።

bypassው turnን ሲያሳልፍ፣ `placeSystemInstruction()` (በዚያው file)፣ ፈጽሞ አዲስ
`messages[0]` የማይፈጥረው፣ blockውን ከሚከተሉት መካከል መጀመሪያ ባገኘው ቦታ ያስቀምጣል፦

1. string content ያለው መሪ system message፦ blockው ከጽሑፉ በኋላ ይጨመራል።
2. top-level `system` field፦ blockው ከstring ጽሑፍ በኋላ ይጨመራል፣ ወይም
   ወደ content-block array እንደ አዲስ text block ይጨመራል።
3. string content ያለው በኋላ የሚገኝ የመጀመሪያው system message፦ blockው ከጽሑፉ
   በኋላ ይጨመራል።
4. ከላይ ካሉት አንዱም ከሌለ፦ blockው በ`messages` መጨረሻ ላይ በአዲስ system message
   ውስጥ ይገባል።

`messages` array በሌለው body ላይ (ወይም ባዶ ከሆነ) ምንም content bypass
አይሰራም እና top-level `system` field አይመረመርም። blockው ከstring
`instructions` field ጽሑፍ በኋላ ይጨመራል፣ fieldው አስቀድሞ
`[OmniRoute Output Styles]` markerን ካልያዘ በስተቀር፤ ከያዘ፣ bodyው እንደ
`already_applied` ሳይቀየር ይቀራል። bodyው string `instructions` field ሳይኖረው
`input` (string ወይም array) ካለው፣ blockው `instructions` ይሆናል፣ ያ field
ይዞት የነበረውን string ያልሆነ value ይተካል። string `instructions` fieldም ሆነ
string ወይም array `input` የሌለው body ሳይቀየር ይቀራል እና እንደ `no_messages`
ይዘለላል።

#### እንዴት ማንቃት እንደሚቻል

በdashboard ውስጥ፦ **Compression Context → Compression Settings**
(`/dashboard/context/settings`)፣ በOutput styles ክፍል፦ ለእያንዳንዱ style አንድ ረድፍ፣
ከon/off toggle እና level selector ጋር። compression ራሱ በርቶ ሳለ (የገጹ master
toggle፣ `enabled`) styles ይገባሉ። **Auto-Clarity Bypass** toggle በ**Caveman**
ገጽ (`/dashboard/context/caveman`)፣ በ**Output Mode** card ውስጥ ይገኛል። በፕሮግራም
ሲደረግ፣ compression config ምርጫውን እንደሚከተለው ያስቀምጣል፦

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

የኋላ-ተኳኋኝነት፦ `outputStyles` ባዶ ሆኖ ሳለ፣ የቆየው
`cavemanOutputMode.enabled` setting ወደ `terse-prose` በ
`cavemanOutputMode.intensity` ይመደባል። ከዚያ blockው በ
`[OmniRoute Output Styles]` marker ይጀምራል፣ የቆየው `applyCavemanOutputMode()`
injector `[OmniRoute Caveman Output Mode]`ን በጻፈበት ቦታ። ከmarkerው በታች፣
ጽሑፉ በen፣ pt-BR፣ es፣ de፣ fr፣ it፣ ru፣ id እና vi ከቆየው injection ጋር
ይዛመዳል፤ በja እና zh ግን ከboundaries clause በፊት አንድ ተጨማሪ space አለው።
`terse-prose` ወደ pt-BR፣ es፣ de፣ fr፣ it፣ ru፣ zh፣ ja፣ id እና vi ይተረጎማል፤
ስለዚህ resolved language `hu` የሆነ request፣ የቆየው injector የሃንጋሪኛ ጽሑፉን
በተጠቀመበት ቦታ የእንግሊዝኛውን ጽሑፍ ያገኛል።

የOutput-style ቋንቋ ምርጫ (`resolveOutputStyleLanguage()` በ
`outputStyles/apply.ts`)፦ `languageConfig.enabled` በርቶ ሳለ፣ `autoDetect`
በrequestው `messages` array ውስጥ ጽሑፍ ካለው የቅርብ ጊዜ user message (string
content፣ ወይም የcontent parts `text`) ናሙና ወስዶ የCaveman engine detectorን
(`detectCompressionLanguage()`) በእሱ ላይ ያስኬዳል። detectorው kana የሌለበት
የHan characters ጽሑፍ `zh`ን ይመልሳል፤ አለበለዚያ ከ`it`፣ `pt-BR`፣ `es`፣
`de`፣ `fr`፣ `ru`፣ `ja`፣ `hu` እና `id` መካከል ብዙ የhint matches ያለውን
ይመልሳል፣ እና ምንም match ከሌለ `en`ን ይመልሳል — ሊመድበው የማይችለው ጽሑፍ
`defaultLanguage`ን ሳይሆን እንግሊዝኛን ያገኛል፣ እና styles የ`vi` ጽሑፍ ቢያካትቱም
`vi` ፈጽሞ አይለይም። የResponses API body turnsን በ`input` ውስጥ ያስቀምጣል፣
እሱም ናሙና አይደረግበትም፤ ስለዚህ `defaultLanguage`ን፣ ከዚያም እንግሊዝኛን
ያገኛል። በ`messages` ውስጥ ምንም user message ጽሑፍ ከሌለው፣ ወይም
`autoDetect` ጠፍቶ ከሆነ፣ `defaultLanguage` ተግባራዊ ይሆናል፣ ከዚያም እንግሊዝኛ።
`languageConfig.enabled` ጠፍቶ ሳለ፣ ቋንቋው እንግሊዝኛ ነው — ለrequestው
compression combo ካልተተገበረ በስተቀር (ለrequestው routing combo የተመደበ combo፣
ወይም chatCore ለbuilt-in stacked pipeline የሚመለስበት default compression combo)፦
comboን መተግበር ለዚያ request `languageConfig.enabled`ን ያበራል እና
`defaultLanguage`ን ከcomboው language packs ያዘጋጃል (የተቀመጠው value ከcomboው
packs አንዱ ከሆነ እሱን፣ አለበለዚያ የcomboውን የመጀመሪያ pack፣ ይህም በነባሪ `en`
ነው)፣ የተቀመጠው `autoDetect` (በነባሪ የበራ) ግን አሁንም ተግባራዊ ይሆናል።
የCaveman input engine የrule-pack ቋንቋውን በተለየ መንገድ ይመርጣል — ለእያንዳንዱ
text part ለየብቻ፣ እና auto-detect ጠፍቶ ሳለ በ`enabledPacks` የተገደበ ሆኖ።

የቅጥ × ቋንቋ ማትሪክሱ በ
`tests/unit/compression/output-styles-i18n-matrix.test.ts` ተወስኗል፦ እያንዳንዱ የካታሎግ ቅጥ በፈተናው `BASELINE_LANGUAGES` ውስጥ
ግቤት ሊኖረው ይገባል፤ በአካባቢያዊ ቋንቋ ያልተገደበ ቅጥ የ
pt-BR ትርጉም አብሮት መቅረብ አለበት (በአካባቢያዊ ቋንቋ የተገደበው `terse-cjk` ከዚህ ደንብ ነፃ ነው)፤ አለበለዚያ በ
`KNOWN_ENGLISH_ONLY` ውስጥ መዘርዘር አለበት፣ ይህም ምንም ትርጉም የሌላቸውን ቅጦች ብቻ ሊይዝ ይችላል —
በዝርዝሩ ውስጥ ያለ ቅጥ ማንኛውም ትርጉም ካለው ፈተናውን አያልፍም፤ እንዲሁም አንድ ቅጥ
በ`BASELINE_LANGUAGES` ግቤቱ ውስጥ ከተዘረዘሩት ቋንቋዎች አንዱን ካጣ ፈተናውን አያልፍም። ቅጥ ለመጨመር
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)ን ይመልከቱ።

### የመሣሪያ ውጤት ማመቅ

በ`open-sse/services/compression/toolResultCompressor.ts` ውስጥ ያለው
`compressToolResult()` የመሣሪያ ውጤት ጽሑፍን በ**5 ስልቶች** ያመቃል። በዚህ ቅደም ተከተል ይሞክራቸዋል፣ እና
ማረጋገጫው ከይዘቱ ጋር የሚዛመደው የመጀመሪያው የነቃ ስልት ውጤቱን ይወስናል፦

1. **`fileContent`**፦ 3 ወይም ከዚያ በላይ መስመሮች ያሉት ይዘት፤ ቢያንስ አንድ መስመር፣
   የመጀመሪያው ገብ ችላ ሲባል፣ በ`import `፣ `export `፣ `function `፣ `class `፣
   `const `፣ `let `፣ `var ` ወይም `return ` (ቁልፍ ቃሉ ከክፍተት ጋር) ወይም በ`if`፣
   `for` ወይም `while` ተጀምሮ `(` ወይም ` (` ሲከተለው፣ የመጀመሪያዎቹን 20 እና የመጨረሻዎቹን 5 መስመሮች ያቆያል፣
   የተዘለለውን መካከለኛ ክፍል በምልክት ያሳያል።
2. **`grepSearch`**፦ ቢያንስ አንድ `<path>:<digits>:` ቅርጽ ያለው መስመር የያዘ ይዘት፤
   ከመጀመሪያው ኮለን በፊት ያለው ጽሑፍ ነጭ ቦታ የሌለው ሲሆን፣ እነዚያን መስመሮች ብቻ እስከ
   30 ድረስ ያቆያል፤ ከዚያም የተጨማሪ ተዛማጆችን ብዛት እና የተዛመዱ ፋይሎችን ዝርዝር ያክላል፤
   ሌሎች መስመሮች በሙሉ ይወገዳሉ። ስልቱን ለማስነሳት አንድ እንደዚህ ያለ መስመር በቂ ነው፤ ስለዚህ
   እንደ `12:30:45` ባለ የጊዜ ማህተም የሚጀምር የምዝግብ መስመርም ይቆጠራል።
3. **`shellOutput`**፦ የANSI CSI ተከታታይ (`ESC[`፣ ከዚያ አሃዞች ወይም
   ሴሚኮሎኖች፣ ከዚያም ፊደል፣ ለምሳሌ በቀለም ኮዶች ውስጥ) ወይም በጽሑፉ ውስጥ በማንኛውም ቦታ
   ነጭ ቦታ የሚከተለው `$` ያለው ውጤት እነዚያን ተከታታዮች ያጣል (እንደ `ESC[?25l` ወይም
   የOSC መስኮት-ርዕስ ተከታታይ ያሉ ሌሎች የማምለጫ ተከታታዮች ይቀመጣሉ) እና የመጨረሻዎቹን 50 መስመሮች ያቆያል፤ ተከታታይ
   የተደጋገሙ መስመሮች ይጠቀለላሉ። ይህ ማረጋገጫ ከ`json` እና `errorMessage` በፊት ስለሚሠራ፣
   እንደዚህ ያለ `$` የያዘ JSON ወይም የስህተት ውጤት `shellOutput` በርቶ ሳለ
   ወደ እነሱ ፈጽሞ አይደርስም።
4. **`json`**፦ ከ2,000 በላይ ቁምፊዎች ያሉት፣ በ`{` ወይም `[` የሚጀምር (ከአማራጭ
   ነጭ ቦታ በኋላ) እና በትክክል የሚተነተን የJSON ጭነት ይጠቃለላል፦ ከ7 በላይ ንጥሎች ያሉት ድርድር
   የመጀመሪያዎቹን 5፣ የመጨረሻዎቹን 2 ንጥሎች እና ጠቅላላ ብዛቱን ያቆያል፤ ኦብጀክት ደግሞ የመጀመሪያዎቹን 20
   ቁልፎች ያቆያል፣ እያንዳንዱን የተከተተ ኦብጀክት ወይም የድርድር እሴት በ`{…N keys}` ቦታ-ያዥ
   (ለድርድር፣ N ርዝመቱ ነው) ይተካል፣ እንዲሁም ከመጀመሪያዎቹ 20 በኋላ የተወገዱትን ቁልፎች
   የሚቆጥር የ`_remaining_<N>_keys` ምልክት ያክላል። ስኬላር እሴቶች ሙሉ በሙሉ ይቀዳሉ፤ ስለዚህ 20 ወይም ከዚያ
   ያነሱ ቁልፎች ያሉትና የተከተቱ እሴቶች የሌሉት ኦብጀክት እንደገና ገብ ብቻ ይደረግለታል — የተቀነሰ ኦብጀክት
   ተጨማሪ ቁምፊዎችን ያገኝና ሳይቀየር ይቀራል።
5. **`errorMessage`**፦ በማንኛውም ቦታና በማንኛውም የፊደል አቀራረብ `error:`፣
   `error ` (ቃሉን የሚከተል ክፍተት፣ እንደ `no error found`)፣ `[error]`፣
   `exception:`፣ `exception `፣ `[exception]` ወይም `traceback` የያዘ ውጤት የመጀመሪያውን መስመር፣
   የሚቀጥሉትን 10 መስመሮች እና የመጨረሻዎቹን 3 ያቆያል፤ በመካከላቸው ባሉት መስመሮች ቦታ
   `… [N frames elided] …` ምልክት ይገባል። ምልክቱ የሚታየው ከመጀመሪያው መስመር በኋላ ከ13 በላይ
   መስመሮች ሲኖሩ ብቻ ነው፤ ስለዚህ 14 ወይም ከዚያ ያነሱ መስመሮች ያሉት የስህተት ውጤት አይነጠፍም
   (12 ወይም 13 መስመሮች ሲኖሩ፣ የመጨረሻዎቹ 3 ቀድሞ የተቀመጡ መስመሮችን ይደግማሉ)።

አንድ ስልት ከተዛመደ በኋላ፣ ምንም ቅናሽ ባያስገኝም እንኳ፣ ተከታዮቹ ስልቶች
አይሞከሩም። የተዛመደው ስልት ምንም የተገመተ ቶከን ባያስቀር (ርዝመት ÷ 4፣ ወደ ላይ የተጠጋጋ) —
ለምሳሌ 25 ወይም ከዚያ ያነሱ መስመሮች ያሉት ኮድ-መሰል ፋይል፣ ወይም ከ2,000
ቁምፊዎች በላይ ሆኖ 7 ወይም ከዚያ ያነሱ ንጥሎች ያሉት የJSON ድርድር — አጥቂው ሞተር ዋናውን የመሣሪያ
ውጤት ያቆያል፦ ሁለቱም ጠሪዎች (`compressAggressive()` እና `compressAnthropicToolResultBlock()`)
`saved` 0 ወይም ከዚያ በታች ሲሆን ዋናውን ያቆያሉ፣ `compressToolResult()` ራሱ ግን
የዚያን ስልት ውጤት አሁንም ይመልሳል። የመሣሪያ-ውጤት ደረጃው የመጨረሻ ውሳኔ አይደለም፦ የሞተሩ
የመጠባበቂያ ማጠቃለያ ሰጪ ከ8,192 ቁምፊዎች በላይ የሆነ `tool` ወይም `function` መልዕክትን
አሁንም ሊያሳጥር ይችላል (`maxTokensPerMessage`፣ 2,048፣ በ4 ተባዝቶ)።

#### መቼ መጠቀም እንደሚገባ

የመሣሪያ ውጤት ማመቅ የአጥቂው ሞተር ደረጃ 1 ነው (`compressAggressive()` በ
`open-sse/services/compression/aggressive.ts` ውስጥ)፤ ስለዚህ በAggressive ሁነታ እና
በተደራረበ ቧንቧ መስመር `aggressive` ደረጃ ውስጥ ይሠራል። የOpenAI ቅርጽ ያላቸውን `tool` እና `function`
መልዕክቶች፣ እንዲሁም በAnthropic `tool_result` ብሎኮች ውስጥ ያለውን ጽሑፍ ያመቃል። እያንዳንዱ ስልት በ
`aggressive.toolStrategies` ሥር የራሱ መቀየሪያ አለው፣ ሁሉም በነባሪነት በርተዋል። በዳሽቦርዱ ውስጥ፣
ማመቅ በርቶና ነባሪ ሁነታው Aggressive ሆኖ ሳለ መቀየሪያዎቹ በCaveman ገጽ **Advanced** ዕይታ ውስጥ ይገኛሉ።

### የተደራረበ ቧንቧ መስመር

የተደራረበው ሁነታ **በርካታ ሞተሮችን በቅደም ተከተል** ያስኬዳል — ብዙውን ጊዜ መጀመሪያ RTK
(በመሣሪያ ውጤት ላይ 60-90% ቅናሽ)፣ ከዚያም በቀሪው ጽሑፍ ላይ Caveman (~46% የግቤት
ቅናሽ)። ሲዋሃዱ፣ ይህ **78-95% ብቁ ክልል** ነው (ከላይ ያለውን Upstream Savings Math
ይመልከቱ)፦ `1 - (1 - 0.60..0.90) × (1 - 0.46)` አማካዩ ≈89% ነው።

#### እንዴት እንደሚሠራ

```
ግቤት (1000 ቶከኖች)
  → RTK (ትዕዛዝ-ተኮር ማጣሪያ) → 200 ቶከኖች
    → Caveman (ትርፍ ጽሑፍ ማስወገድ) → 108 ቶከኖች
  → ውጤት (108 ቶከኖች፣ ~89% ቅናሽ)
```

#### መቼ መጠቀም እንደሚገባ

የተደራረበ ሁነታን ለሚከተሉት ይጠቀሙ፦

- መሣሪያ-ተኮር የሥራ ፍሰቶች (ወኪላዊ ኮድ ማዘጋጀት፣ ምርምር)
- ወጪን ለሚያስቀድም የቡድን ሂደት
- ከፍተኛውን የቶከን ቅናሽ ሲፈልጉ

የተደራረቡ ቧንቧ መስመሮች በዓለም አቀፉ `stackedPipeline` የማመቅ
ቅንብር፣ ወይም ለማዘዋወሪያ ጥምረት በተመደበ ስም ባለው የማመቅ ጥምረት በኩል ይዋቀራሉ (ከላይ
ያለውን Per-Combo Override ይመልከቱ) — በራስ-ሰር ጥምረት `modePack` በኩል አይደለም (ያ መስክ
የራስ-ሰር ጥምረት ሞዴል ምርጫ ክብደቶችን ብቻ እንደገና ያስተካክላል፣ እና `stacked` ትክክለኛ የጥቅል ስም አይደለም)።

---

## የኮምፕሬሽን Combo ልዩ ማስተካከያዎች

ለተለያዩ የአጠቃቀም ሁኔታዎች ባህሪውን በዝርዝር ለማስተካከል፣ አጠቃላይ የኮምፕሬሽን ሁነታውን **ለእያንዳንዱ combo** በተናጠል መተካት ይችላሉ፦

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

ይህ ለሚከተሉት ጠቃሚ ነው፦

- **የኮዲንግ combo-ዎች**፦ ለረጅም ክፍለ ጊዜዎች `aggressive` ሁነታን ይጠቀሙ
- **ፈጣን የጥያቄና መልስ combo-ዎች**፦ ለፈጣን ምላሾች `lite` ሁነታን ይጠቀሙ
- **ብዙ መሣሪያዎችን የሚጠቀሙ combo-ዎች**፦ ከፍተኛውን ቁጠባ ለማግኘት `stacked` ሁነታን ይጠቀሙ
- **የፕሮዳክሽን combo-ዎች**፦ መሸጎጫን ለሚጠቀሙ አቅራቢዎች ልዩ ማስተካከያውን ያጥፉት — ሁልጊዜ የነቃው
  መሸጎጫን ከግምት ውስጥ የሚያስገባ ማስተካከያ `aggressive`/`ultra`ን በራስ-ሰር ወደ `standard` ዝቅ ያደርጋል
  (ሊመረጥ የሚችል `cache-aware` ሁነታ የለም)

---

## በተጨማሪ ይመልከቱ

- [የአካባቢ ውቅር](../reference/ENVIRONMENT.md) — የኮምፕሬሽን የአካባቢ ተለዋዋጮች
- [የሥነ ሕንፃ መመሪያ](../architecture/ARCHITECTURE.md) — የኮምፕሬሽን ቧንቧ መስመር ውስጣዊ አሠራር
- [የተጠቃሚ መመሪያ](../guides/USER_GUIDE.md) — ኮምፕሬሽንን መጠቀም ለመጀመር
- [RTK ኮምፕሬሽን](./RTK_COMPRESSION.md) — የRTK ማጣሪያዎች፣ የእምነት ሞዴል፣ የማረጋገጫ በር፣ ያልተቀነባበረ ውጤት መልሶ ማግኘት
- [የኮምፕሬሽን ሞተሮች](./COMPRESSION_ENGINES.md) — Caveman፣ RTK፣ stacked፣ APIs፣ MCP፣ ዳሽቦርድ
- [የኮምፕሬሽን ደንቦች ቅርጸት](./COMPRESSION_RULES_FORMAT.md) — የJSON rule-pack ቅርጸት
- [የኮምፕሬሽን ቋንቋ ጥቅሎች](./COMPRESSION_LANGUAGE_PACKS.md) — ለቋንቋ የተለዩ የCaveman ደንቦች
