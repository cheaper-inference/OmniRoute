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

## የመጭመቂያ ሁነታዎች

### ጠፍቷል

ምንም መጭመቂያ አይተገበርም። ሁሉም መልዕክቶች ሳይለወጡ ያልፋሉ።

### Lite ሁነታ (~15% ቁጠባ፣ <1ms መዘግየት)

በጣም አስተማማኝ ሁነታ — የቅርጸት ማጽዳት። የመሣሪያ-ውጤት መቁረጡ መረጃ ያጠፋል፤ ስለዚህ ነባሪው መንገድ (`allow-lossy`፣ `engine:lite` ወይም በስም የተጠራ የጥምረት ፈቃድ ከሌለ) `compressToolResults: false` እያሄደ ነው፦ ቀደም ያሉ የመሣሪያ ውጤቶች ሳይለወጡ አቅራቢው ዘንድ ይደርሳሉ።

| ቴክኒክ                     | መግለጫ                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| `collapseWhitespace`     | ተከታታይ ባዶ መስመሮችንና የመጨረሻ ክፍተቶችን ማዋሃድ                               |
| `dedupSystemPrompt`      | የተደጋገሙ የሥርዓት መልዕክቶችን ማስወገድ                                       |
| `compressToolResults`    | ቀደም ያሉ የመሣሪያ ውጤቶችን ወደ Lite ገደብ መቁረጥ (መረጃ የሚያጠፋ፦ የጥያቄ ፈቃድ ሲኖር ብቻ) |
| `removeRedundantContent` | የተደጋገሙ መመሪያዎችን ማስወገድ                                             |
| `replaceImageUrls`       | የBase64 ምስል የውሂብ URIዎችን ማሳጠር                                     |

**ለሚከተሉት በጣም ተስማሚ:** ሁልጊዜ ለሚሠራ አጠቃቀም፣ ለደህንነት ወሳኝ የሥራ ፍሰቶች።

### Standard ሁነታ (~30% ቁጠባ)

በ [Caveman](https://github.com/JuliusBrussee/caveman) ተነሳሽነት — ትርጉሙን እየጠበቀ የመሙያ ቃላትንና ረጅም አገላለጾችን ያስወግዳል፦

- የመሙያ ቃላትን ያስወግዳል ("please", "I think", "basically", "actually")
- ረጅም አገላለጾችን ያጠራል ("in order to" → "to", "as a result of" → "because")
- ትሕትናን የሚገልጹ ጥንቃቄያዊ አነጋገሮችን ያስወግዳል ("Would you mind...", "If you could possibly...")
- ለኮድ ጥያቄዎች የተስተካከሉ ከ30 በላይ የregex ሕጎች

**ለሚከተሉት በጣም ተስማሚ:** የዕለት ተዕለት የኮድ ሥራ ፍሰቶች፣ ወጪን ለሚቆጥቡ ቡድኖች።

### Aggressive ሁነታ (~50% ቁጠባ)

ለረጅም ክፍለ-ጊዜዎች የተሻሻለ የታሪክ አስተዳደር፦

- **የመልዕክት እርጅና** — የቆዩ መልዕክቶች በተራ ይጨመቃሉ
- **የመሣሪያ ውጤት መጭመቂያ** — ረጅም የመሣሪያ ውጤቶች ይቆረጣሉ ወይም ይዘለላሉ (የመጀመሪያ/የመጨረሻ መስመሮች፣ በተዛማጅ መስመር ማጣራት፣ የJSON ቁልፍ ማጠር)
- **የመዋቅር ትክክለኛነት ጠባቂዎች** — `tool_use` + `tool_result` ጥንዶች ተጣጥመው እንዲቆዩ ያረጋግጣሉ
- **የአውድ መስኮት ግንዛቤ** — በእያንዳንዱ ሞዴል የተወሰኑ የቶከን ገደቦችን ያከብራል

**ለሚከተሉት በጣም ተስማሚ:** የተራዘሙ የማረም ክፍለ-ጊዜዎች፣ ትልልቅ የኮድ መሠረቶች።

### Ultra ሁነታ (~75% ቁጠባ)

ቶከን ወሳኝ ለሆኑ ሁኔታዎች ከፍተኛ መጭመቂያ፦

- **በሂዩሪስቲክ የሚመራ መቀነስ** — በውጤት ነጥብ መሠረት የሚደረግ የፕሮዝ ቶከን መቀነስ
- **የመዋቅር ጥበቃ** — የተዘጉ የኮድ ብሎኮች፣ ውስጠ-ኮድ፣ URLዎችና መለያዎች በትክክል ተጠብቀውና እንደገና ተገጣጥመው ይቀመጣሉ፤ በፍጹም አይቀነሱም
- **አማራጭ SLM ደረጃ** — ሲዋቀር አንድ ትንሽ የአካባቢ ሞዴል መቀነሱን ሊያሻሽል ይችላል
- ከAggressive ሁነታ ነፃ ነው፦ የመልዕክት እርጅናን፣ የመሣሪያ ውጤት መጭመቂያን ወይም የመጠባበቂያ ማጠቃለያውን አያስኬድም (የSLM ደረጃ አለመሳካት ብቻ የመጠባበቂያ ሂደቱን በAggressive በኩል ሊያስኬድ ይችላል)

**ለሚከተሉት በጣም ተስማሚ:** የአውድ ገደቦችን በተደጋጋሚ ሲያጋጥሙ።

### RTK ሁነታ (60-90% የupstream ክልል)

RTK ሁነታ በኮድ-ኤጀንት ክፍለ-ጊዜዎች ውስጥ ለሚታዩ ረጅም የመሣሪያ ውጤቶች የተመቻቸ ነው፦

- እንደ `git status`፣ `git diff`፣ `git log`፣ የሙከራ አስኬጆች፣ TypeScript/Vite/Webpack ግንባታዎች፣ ESLint/Biome/Prettier፣ npm ኦዲት/መጫኛዎች፣ Docker ሎጎች፣ የመሠረተ-ልማት ውጤቶችና አጠቃላይ የሼል ውጤቶች ያሉ የትዕዛዝ/ውጤት ክፍሎችን ይለያል
- ከ `open-sse/services/compression/engines/rtk/filters/` የJSON ማጣሪያ ጥቅሎችን ይተገብራል
- የRTK TOML ስኪማ v1 ማጣሪያዎችን ከፕሮጀክት ወይም ከአለም አቀፍ `filters.toml` ፋይሎች ያስገባል፤ ይህም የውስጠ-ሙከራ ማረጋገጫንና ለፕሮጀክት ፋይሎች የእምነት ቁጥጥርን ያካትታል
- የውስጠ-ሙከራ ማረጋገጫ ናሙናዎች ያሏቸው 56 አብሮ-የተሰሩ ማጣሪያዎችን ያካትታል
- የANSI ቁጥጥር ቅደም ተከተሎችን፣ የእድገት አሞሌዎችን፣ የተደጋገሙ መስመሮችንና ተግባራዊ ያልሆነ ጫጫታን ያስወግዳል
- አለመሳካቶችን፣ ስህተቶችን፣ ማስጠንቀቂያዎችን፣ የተለወጡ ፋይሎችን፣ ማጠቃለያዎችንና የረጅም ውጤት መጨረሻን ይጠብቃል
- በእምነት የተገደቡ የፕሮጀክት ማጣሪያዎችን፣ አለም አቀፍ ማጣሪያዎችንና አማራጭ የተሰወረ ጥሬ-ውጤት መልሶ ማግኛን ይደግፋል

**ለሚከተሉት በጣም ተስማሚ:** የሼል፣ የግንባታ፣ የሙከራ፣ git፣ grep እና የፋይል-ውጤት ትራንስክሪፕቶች ላሏቸው የኤጀንት ክፍለ-ጊዜዎች።

### Stacked ሁነታ (78-95% ብቁ ክልል)

Stacked ሁነታ በተወሰነ ቅደም ተከተል ብዙ የመጭመቂያ ሞተሮችን ያስኬዳል። ነባሪው የሂደት መስመር፦

```txt
RTK -> Caveman
```

ይህ ቅደም ተከተል ተርሚናል/የመሣሪያ ውጤቶችን መጀመሪያ እንዲጠበቡ ያደርጋል፤ ከዚያም በቀሩት የተፈጥሮ ቋንቋ ጥያቄዎች ላይ የCaveman ትርጉም-ተኮር ማጠራቀሚያን ይተገብራል። የተደራረቡ የሂደት መስመሮች በአለም አቀፍ ደረጃ ወይም ለማዞሪያ ጥምረቶች በተመደቡ የመጭመቂያ ጥምረቶች በኩል ሊዋቀሩ ይችላሉ።

**ለሚከተሉት በጣም ተስማሚ:** ትልልቅ የመሣሪያ ሎጎችን ከሰው መመሪያዎች ወይም ከረዳት ማጠቃለያዎች ጋር የሚያጣምር አውድ።

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

## ማዋቀር

### ዳሽቦርድ

ወደ `Dashboard → Context & Cache` ይሂዱ፦

- **Caveman** — የሁኔታ ምርጫ፣ የቋንቋ ጥቅሎች፣ ቅድመ-ዕይታ እና አለም-አቀፍ ነባሪዎች
- **RTK** — የትዕዛዝ ማጣሪያ ቅድመ-ዕይታ፣ የRTK የደህንነት ቅንብሮች እና የማጣሪያ ካታሎግ
- **Compression Combos** — ለማዞሪያ ጥምረቶች የተመደቡ ስም ያላቸው የሞተር ቧንቧዎች
- **Auto-Trigger Threshold** — የቶከኖች ብዛት ገደቡን ሲያልፍ መጭመቅን በራስ-ሰር ማስነሳት

### በጥምረት ደረጃ መተካት

በ`Dashboard → Context & Cache → Compression Combos` ውስጥ የመጭመቂያ ጥምረትን ለማዞሪያ
ጥምረት ይመድቡ፦

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

ይህ በነጻ/ኮዲንግ አቅራቢዎች ላይ የተደራረበ መጭመቂያን እንዲጠቀሙ፣ በክፍያ ምዝገባዎች ላይ ግን ቀላል ሁነታን
እንዲጠብቁ ያስችላል።

ይህ "Per-Combo Override" ምደባ ከ**routing-combo compression
mode** መተካት (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — የመስኩ ስኪማ
እንዲሁም `rtk`፣ `stacked` እና `omniglyph` ይቀበላል) የተለየ መቆጣጠሪያ ነው — ያ መተካት
ስም ያለውን የመጭመቂያ-ጥምረት ቧንቧ አይመርጥም፤ በቀላሉ በ
`resolveCompressionPlan` የሚመረመረውን `compressionMode` መስክ ብቻ ያዘጋጃል። በጥምረት ካርዱ
(`Dashboard → Combos`) ላይ ወይም፣ ከ#6760 ጀምሮ፣ ከላይ በተገለጸው የቧንቧ ምደባ ማመልከቻ ሳጥን አጠገብ
በ`Dashboard → Context & Cache → Compression Combos` ውስጥ ባለው "Assign to routing" ዝርዝር ውስጥ
ለእያንዳንዱ የማዞሪያ ጥምረት ማዘጋጀት ይቻላል። ሁለቱም ቦታዎች በተመሳሳይ
`PUT /api/combos/{id}` መጨረሻ ነጥብ በኩል ይቀመጣሉ።

### በጥያቄ ደረጃ መተካት

ለአንድ ጥያቄ ብቻ የመጭመቂያ ዕቅዱን ለመተካት `x-omniroute-compression` የጥያቄ ራስጌን ይላኩ። ከሁሉም በላይ
ቅድሚያ አለው — የማዞሪያ-ጥምረት መተካትን፣ ንቁ መገለጫን፣ ራስ-ሰር ማስነሻን እና የፓነሉን Default ያሸንፋል። የማይታወቁ እሴቶች ችላ
ይባላሉ (ጥያቄው ፈጽሞ ውድቅ አይደረግም)፣ እና አለም-አቀፉ ዋና ማብሪያ አሁንም ሁሉንም ነገር ይቆጣጠራል፦ መጭመቅ
በአለም-አቀፍ ደረጃ ሲጠፋ ራስጌው ሊያበራው አይችልም። እሴቶቹ፦

| እሴት           | ተጽዕኖ                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| `off`         | ለዚህ ጥያቄ ምንም መጭመቅ አይደረግም።                                                   |
| `default`     | ከፓነሉ የሚመነጨውን Default መገለጫ ይጠቀማል (ንቁ መገለጫውን ችላ ይላል)። የሚያጡ ሞተሮች እንዳይሠሩ ይተዋሉ። |
| `safe`        | ራስጌውን እንደመተው ተመሳሳይ ውጤት።                                                    |
| `allow-lossy` | የዚህን ጥያቄ ኦፕሬተር ዕቅድ፣ ማጠቃለያዎችን፣ የተዛማጅነት ማጣሪያዎችን እና የቅጥ ዳግም-ጽሑፎችን ጨምሮ ያስቀጥላል። |
| `engine:<id>` | ሲነቃ አንድ ሞተር ብቻ፣ ለምሳሌ `engine:rtk`። ይህ ለዚያ ሞተር በጥያቄ ደረጃ የሚደረግ ፈቃድ ነው።       |
| `<combo>`     | በስም የተሰየመ ጥምረት፣ መጀመሪያ በስም (የፊደል አጻጻፍን ሳይለይ) ከዚያም በመታወቂያ ይዛመዳል።             |

`allow-lossy`፣ `engine:<id>` ወይም ስም ያለው ጥምረት ከሌለ የሚያጡ ሞተሮች አይተገበሩም። የሚያጣ Default፣ ራስ-ሰር ማስነሻ ወይም
የማዞሪያ መተካት ደረጃው ሲቀንስ፣ OmniRoute ከተዋቀረው የተደራረበ ቧንቧ ውስጥ የታወቁትን ኪሳራ-አልባ
ደረጃዎች በተዋቀረው ቅደም ተከተል ያስቀራል። የተዋቀረ ኪሳራ-አልባ ደረጃ ካልተረፈ ብቻ
ወደ `session-dedup → lite` ይመለሳል።

የSettings ፓነል **Effective pipeline** ቅድመ-ዕይታ በመደበኛ ሁኔታ ያለውን ዕቅድ ያሳያል። ራስ-ሰር ማስነሻ ሊሠራ በሚችልበት ጊዜ፣ ያው ቅድመ-ዕይታ
ሁኔታዊ ውጤታማ ቧንቧውንም ያሳያል፣ በዚህም የፓነሉ እና ራስጌ-አልባ የሩጫ ጊዜ መፍትሔ እርስ በርስ ይጣጣማሉ።

የተተገበረው ዕቅድ በ`X-OmniRoute-Compression: <mode>; source=<source>` ምላሽ ራስጌ ውስጥ ይመለሳል፤
`<source>` ከሚከተሉት አንዱ ነው፦ `request-header`፣ `routing-override`፣ `active-profile`፣
`auto-trigger`፣ `default` ወይም `off`።

### API

```bash
# የመጭመቂያ ቅንብሮችን ያግኙ
curl http://localhost:20128/api/settings/compression

# የመጭመቂያ ቅንብሮችን ያዘምኑ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# የተወሰነ RTK/stacked ይዘት ቅድመ-ዕይታ
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# የRTK ማጣሪያ ጥቅሎችን ይዘርዝሩ
curl http://localhost:20128/api/context/rtk/filters

# RTKን በአማራጭ የትዕዛዝ ሜታዳታ በቀጥታ ይፈትሹ
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

## የመጭመቂያ ስታቲስቲክስ

እያንዳንዱ የታመቀ ጥያቄ በአገልጋይ ምዝግብ ማስታወሻዎች ውስጥ ስታቲስቲክስን ያካትታል፡-

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

## የላቀ መጭመቂያ ስርዓቶች

ከላይ ከተገለጹት 7 ሁነታዎች ባሻገር (ምንጩ ደግሞ `codex-responses` እና `omniglyph` ሁነታዎችን ይቀበላል፣ ይህ መመሪያ የማይሸፍነውን)፣ ከታች ያሉት ክፍሎች ከውስጥም ሆነ ከእነዚያ ሁነታዎች ጋር አብረው የሚሰሩ ባህሪያትን ይሸፍናሉ፡ የመሳሪያ ውጤት መጭመቂያ እና ፕሮግረሲቭ እርጅና የአግሪ ሞተር ደረጃዎች 1 እና 2 (አግgressive mode እና `aggressive` ደረጃ የተቆለለ የቧንቧ መስመር)፣ የተቆለለ የቧንቧ መስመር እንዴት እንደሚሰራ መጭመቂያው በርቶ እያለ `aggressive` እና `ultra` ወደ `standard` አቅራቢዎችን መሸጎጫ ዝቅ ያደርጋል፣ እና Caveman Output Mode እና የውጤት ስልቶች መርጠው የገቡ ስርዓት-ፈጣን መመሪያዎች በነባሪነት ጠያቂውን ከመጨመቅ ይልቅ የሞዴሉን ውፅዓት የሚቀርፁ ናቸው።

### መሸጎጫ-አዋቂ መጭመቂያ

አንዳንድ አቅራቢዎች (እንደ Anthropic በፈጣን መሸጎጫ) ድጋፍ** ፈጣን መሸጎጫ** ወጪዎችን እና መዘግየትን ለመቀነስ የጥያቄውን ክፍሎች እንዲሸጎጡ ያስችላቸዋል። መሸጎጥ ሲነቃ፣ ኃይለኛ መጨናነቅ በእርግጥ ይችላል።** ተጎዳ** አፈጻጸሙ የተሸጎጡ ቶከኖችን ስለሚቀይር መሸጎጫውን ዋጋ ስለሚያጠፋ ነው።

የ `cachingAware.ts` ሞጁል ይህንን በ** መሸጎጫ አውድ መፈለግ** እና** የመጨመቂያ ስልቱን ማስተካከል** በዚህ መሠረት.

#### እንዴት እንደሚሰራ

1. **መሸጎጫ አውድ አግኝ** — የጠያቂውን አካል ለ `cache_control` ማርከሮች ይቃኛል።
2. **መሸጎጫ አቅራቢዎችን ይለዩ** — ኢላማ አቅራቢው መሸጎጫን የሚደግፍ መሆኑን ያረጋግጣል
3. **ስልት አስተካክል።** — ለመሸጎጫ አቅራቢዎች `aggressive`/`ultra` ወደ `standard` ያደርጋል
4. **የስርዓት ጥያቄን ዝለል** — የስርዓት መጠየቂያዎች ብዙውን ጊዜ የተሸጎጡ ናቸው፣ ስለዚህ አይጨምቋቸው

የስትራቴጂው አጋዥ እንዲሁ `deterministicOnly` ባንዲራ ይመልሳል፣ ነገር ግን ፕላን ገንቢው ስልቱን ብቻ ይጠቀማል — ምንም ከስር ያለው ባንዲራ የሚያነብ አይደለም።

#### የኮድ ምሳሌ

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### መቼ መጠቀም

መሸጎጫ የሚያውቅ መጭመቅ ነው።** ሁልጊዜ በርቷል** — ምንም ማዋቀር አያስፈልግም። መጭመቅ በበራ ቁጥር ወደ ውስጥ ይገባል እና ዒላማው አቅራቢው ፈጣን መሸጎጫ (Anthropic, OpenAI, ወዘተ.) ይደግፋል; ግልጽ `cache_control` ማርከሮች አያስፈልጉም — መሸጎጫ አቅራቢ ብቻውን ማሽቆልቆሉን ያነሳሳል፣ እና ማርከሮች ብቻውን በጭራሽ አያደርጉትም (ማርከር ማወቂያ መሸጎጫ ቴሌሜትሪ እንጂ የስትራቴጂ ውሳኔ አይደለም።

OpenRouter እንደ መሸጎጫ አቅራቢ የሚቆጠረው ለ `anthropic/*` ሞዴሎች ብቻ ነው Claude ኮድ ጥያቄዎች `cache_control` መግቻ ነጥቦቻቸውን (ቢበዛ 4) ይጠብቃሉ እና ጠባቂው ቅድመ ቅጥያውን ይጠብቃል፣ ሁሉም ሌሎች OpenRouter ቤተሰብ (`openai/`፣ `google/`፣ `qwen/`፣ …) ተራቁተው እና ሳይጠበቁ ይቆያሉ።

### ፕሮግረሲቭ እርጅና

ረጅም ንግግሮች ብዙ የመልእክት ማዞሪያዎችን ይሰበስባሉ፣ ነገር ግን የቆዩ ተራዎች ብዙም ተዛማጅ ይሆናሉ። የ `progressiveAging.ts` ሞጁል** መልእክቶችን በተራ ርቀት ዝቅ ያደርጋል** (ከንግግሩ መጨረሻ የሚለካው ርቀት)። በተላኩ ነባሪዎች (`verbatim: 2, light: 2, moderate: 3`):

- **የመጨረሻዎቹ 2 መዞሪያዎች (ርቀት ≤ 2)** በቃላት ተጠብቆ ቆይቷል
- **ርቀት 3** ዋሻማን መጭመቅ (መሙያ መወገድ)
- **ርቀት 4 +** : ረዳት መልእክቶች ተጠቃለዋል; የተጠቃሚ መልእክቶች ወደ መጀመሪያው መስመር ተቀንሰዋል፣ በ120 ቁምፊዎች ተሸፍነዋል። ሌሎች ሚናዎች አልተነኩም. የስርዓት መጠየቂያዎች፣ ቀድሞ ያረጁ መልእክቶች እና የቅርብ ጊዜ የተጠቃሚዎች መልእክት ርቀቱ ምንም ይሁን ምን ሁልጊዜ በቃል ይቀመጣሉ። ምንም ነገር በትክክል አልተጣለም፣ እና የ `light` ባንድ በተላኩ ነባሪዎች (`light` `verbatim` ጋር እኩል ነው) የማይደረስ ነው።

#### የኮድ ምሳሌ

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### መቼ መጠቀም

ተራማጅ እርጅና ነው።** ሁልጊዜ በርቷል** ለ `aggressive` ሁነታ — የ `compressAggressive()` ደረጃ 2 ነው. አልትራ ሞድ አያስኬደውም። እሱ በተለይ ለሚከተሉት ውጤታማ ነው-

- ረጅም ጊዜ የሚሄዱ የኮድ ማስቀመጫዎች
- የብዙ ቀን ውይይቶች
- ከብዙ የመሳሪያ ጥሪዎች ጋር ወኪላዊ የስራ ፍሰቶች

### Caveman ውፅዓት ሁነታ

Caveman ውፅዓት ሁነታ ይጨምራል** የስርዓት ፈጣን መመሪያዎች** ሞዴሉን እራሱ ለተጨባጭ ውፅዓት — `lite` ደረጃ ሙሉ ዓረፍተ ነገሮችን የሚይዝ አጭር መልሶችን ይጠይቃል፣ `full` "እንደ ስማርት ዋሻ ሰው ምላሽ እንዲሰጥ" ይጠይቃል፣ እና `ultra` የቴሌግራፊክ ውፅዓት ይጠይቃል። መመሪያዎች ብቻ ይጠይቃሉ, ዋስትና ሊሰጡ አይችሉም. ጥያቄዎች በ `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ይቀበላሉ `open-sse/handlers/chatCore.ts` በመጀመሪያ ምርጫውን የሚፈታው ከኋላ-ኮምፓት shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`) ነው፣ እሱም፣ `outputStyles` ባዶ ሲሆን፣ የነቃ `cavemanOutputMode` ወደ `terse-prose` የውጤት ዘይቤ `cavemanOutputMode.intensity` ላይ ያዘጋጃል (ከዚህ በታች Back-compat ይመልከቱ)። ባዶ ያልሆነ `outputStyles` ምርጫ እንደዚያው ጥቅም ላይ ይውላል፣ እና `cavemanOutputMode.enabled` እና `intensity` ከዚያ ምንም ውጤት አይኖራቸውም፣ `autoClarity` መቀየሪያው አሁንም ይሠራል። `outputMode.ts` የመመሪያ ጽሑፎችን (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`)፣ የይዘት ማለፊያ እና መርፌ የሚጠቀመውን የምደባ አጋዥ ይይዛል። የራሱ `applyCavemanOutputMode()` ኢንጀክተር የምርት ደዋይ የለውም።

#### እንዴት እንደሚሰራ

ይህ ሁነታ ግቤትን አይጨምቀውም. በስርዓት መጠየቂያው ላይ የማስተማሪያ እገዳን ይጨምራል (ከዚህ በታች መርፌ እንዴት እንደሚሰራ ይመልከቱ) እና ለጥያቄው የተመረጠው ማንኛውም የግቤት መጭመቂያ ሁነታ አሁንም በኋላ ይሠራል ፣ አሁን እገዳውን በተሸከመው አካል ላይ። እያንዳንዱ ደረጃ የሚያበቃው ከተጋራው የድንበር አንቀጽ በፊት፣ የእንግሊዝ `full` ደረጃ እንዲህ ይነበባል፡-

> "እንደ ብልጥ ዋሻ ሰው ምላሽ ይስጡ. መጣጥፎችን (a/an/the), መሙያ (just/really/basically/actually/simply), አስደሳች ነገሮች, አጥር. ቁርጥራጮች OK. አጭር ተመሳሳይ ቃላት (ትልቅ አይደለም, አስተካክል አይተገበርም). ሁሉንም ቴክኒካዊ ንጥረ ነገሮች, ኮድ, ስህተቶች, URLs, መለያዎች በትክክል ያስቀምጡ. "

ይህ በተለይ ለሚከተሉት በጥሩ ሁኔታ ይሰራል-

- ኮድ ማመንጨት (ተርሰር ውፅዓት = ያነሱ ቶከኖች)
- ፈጣን ጥያቄ እና መልስ (የተብራራ ማብራሪያ አያስፈልግም)
- ባች ማቀነባበር (የፍተሻውን መጠን ከፍ አድርግ)

#### መቼ መጠቀም

Caveman ውፅዓት ሁነታ ነው** መርጦ መግባት** . ከታመቀ ጋር (`enabled: true`, በ Compression Settings ገጽ ላይ ዋናው መቀያየር), በ `cavemanOutputMode.enabled` ያብሩት; `intensity` `lite`፣ `full` ወይም `ultra` ይመርጣል

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

የጨመቅ ጥምር** የውጤት ሁነታ** መቀያየር (`outputMode`፣ ደረጃ በ `outputModeIntensity`) ኮምቦ ለሚመለከቷቸው ጥያቄዎች አንድ አይነት ማብሪያ / ማጥፊያ ያዘጋጃል፣ እና `omniroute_set_compression_engine` MCP መሳሪያው በቦሊያን `outputMode` ክርክር በኩል ይጽፋል። ባዶ ያልሆነ `outputStyles` ምርጫ ከዚህ መቀየሪያ ይቀድማል። በዳሽቦርዱ ውስጥ፣ የንቃት** ተራ ፕሮዝ** የውጤት ዘይቤ ተመሳሳይ ብሎክ ያስገባል (ከዚህ በታች የውጤት ቅጦችን ይመልከቱ)።

### የውጤት ቅጦች (ካታሎግ)

ከላይ Caveman ውፅዓት ሁነታ ነው** የቆየ ነጠላ-ቅጥ መንገድ** . ደረጃ 4 በጥቅል ወደሚችሉ የውጤት ቅጦች ካታሎግ አቅርቧል `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. እያንዳንዱ ዘይቤ ሞዴሉን ራሱ በርካሽ ውፅዓት እንዲጠይቅ የሚጠይቅ ስርዓት-አፋጣኝ መመሪያ ነው። ቅጦች አንድ ላይ ሊነቁ እና በካታሎግ ቅደም ተከተል ሊከተቡ ይችላሉ።

| ቅጥ                     | `id`            | ምን ያደርጋል                                                                                                                                                                                      | የትምህርት ቋንቋዎች                                  |
| ---------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| ተራ ፕሮዝ                 | `terse-prose`   | ዝቃን filler/articles/hedging; ቴክኒካዊ ንጥረ ነገሮችን በትክክል ያቆዩ። ከዋሻ ሰው ውፅዓት ሁነታ ጋር ተመሳሳይ ጽሑፍ (የተጣቀሰ እንጂ እንደገና አልተተየበም)።                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ያነሰ ኮድ                 | `less-code`     | YAGNI መሰላል፡ ትንሹ የስራ ለውጥ፣ ምንም ያልተጠየቁ ማጠቃለያዎች የሉም።                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (ሰነፍ ሲኒየር ዴቪ) | `ponytail`      | "ምርጡ ኮድ በፍፁም ያልተፃፈ ኮድ ነው"፡ እንደገና ተጠቀም > rewrite፣ root cause > ምልክት፣ በጣም አጭር የስራ ልዩነት።                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ADHD አለኝ (ድርጊት-መጀመሪያ)  | `i-have-adhd`   | እርምጃ መጀመሪያ (command/path/snippet ከስድ ፅሁፍ በፊት)፣ በቁጥር የተደረደሩ ደረጃዎች፣ ONE ኮንክሪት ቀጣይ ደረጃ፣ ምንም preamble/recap/closers. ከ [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) የተወሰደ።   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| አንቲስሎፕ UI ማጣሪያ         | `antislop-ui`   | እያንዳንዱ የእይታ ቴክኒክ የዓላማ ፈተናን ማለፍ አለበት (ተዋረድ፣ ማንነት፣ ተነባቢነት)። ምንም ነባሪ gradients/glass/glow የለም፣ የታሸገ ቤተ-ስዕል፣ ምንም የአብነት አቀማመጦች የሉም። ሁለቱም ጸረ-ስላፕ ቅጦች ምንም-ሙት-መቆጣጠሪያዎች/ምንም-የተሰራ-የይገባኛል ጥያቄ ወሰን ይጨምራሉ። | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| አንቲስሎፕ ቅጂ እና የሰው ማጣሪያ  | `antislop-copy` | የተወሰነ ቅጂ (ምንም ኢም ዳሽ፣ አጠቃላይ CTAs፣ buzzwords፣ chatbot closers፣ የፈለሰፉ እውነታዎች) እና የሰዎች ደንቦች WCAG AA ንፅፅር፣ የሚታይ ትኩረት፣ የቁልፍ ሰሌዳ መድረስ፣ empty/loading/error ግዛቶች፣ የሞባይል ዳግም ፍሰት።                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ቴርስ CJK (文言)         | `terse-cjk`     | `full`/`ultra` መልስ በክላሲካል ቻይንኛ (文言); `lite` ያለ ተግባር ቃላት፣ አስደሳች ነገሮች ወይም ማስዋቢያዎች አጫጭር መልሶችን ብቻ ይጠይቃል።                                                                                        | zh (አካባቢ-የተከለለ፣ ከታች ይመልከቱ)                    |

እያንዳንዱ ዘይቤ ሦስት የጥንካሬ ደረጃዎች — `lite`፣ `full`፣ `ultra` — ይልካል እና እያንዳንዱ ደረጃ የሚጨርሰው በተጋራው የድንበር አንቀጽ (`SHARED_BOUNDARIES` in `outputMode.ts`) ነው፣ እሱም የኮድ ብሎኮችን፣ የፋይል መንገዶችን፣ ትዕዛዞችን፣ ስህተቶችን እና URLs በትክክል ያስቀምጣል። የ `terse-prose` እና `terse-cjk` ደረጃ ጽሑፎች ለዚያ ዝርዝር መለያዎችን ይጨምራሉ።

`terse-cjk` በሁለት ቦታዎች ላይ ወደ `zh` አከባቢ-የተገባ ነው። የመጭመቂያ ቅንጅቶች ገጹ ረድፉን የሚዘረዝረው ዳሽቦርዱ UI ቋንቋ ቻይንኛ ሲሆን (`zh-CN` ወይም `zh-TW`) ሲሆን `applyOutputStyles()` የሚያስገባው የጥያቄው መፍትሄ የተገኘ ቋንቋ ሲሆን (ከዚህ በታች ያለውን የቋንቋ ምርጫ ይመልከቱ) `zh` ነው። ረድፉን መደበቅ የተቀመጠ `terse-cjk` ምርጫን አያጸዳውም፡ ቅንጅቶቹ API ማንኛውንም የቅጥ መታወቂያ ይቀበላል እና ሌሎች ቅጦችን በገጹ ላይ ማስቀመጥ ያስቀምጣል። በተጠየቀ ጊዜ፣ የ `applyOutputStyles()` ቋንቋ ፍተሻ ብቸኛው የአካባቢ በር ነው።

#### መርፌ እንዴት እንደሚሰራ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ምርጫውን በካታሎግ ላይ ይፈታል (የማይታወቁ መታወቂያዎች እና የአካባቢ-ተዛማጅ ቅጦች ተጥለዋል ፣ በጭራሽ ስህተት የለም ፣ ምንም አይነት ዘይቤ የማይፈታ ምርጫ አካል ሳይለወጥ ፣ እንደ `no_styles` ተዘለለ) ፣ የተመረጠውን መመሪያ በካታሎግ ቅደም ተከተል ያጣምራል ፣ የድንበር አንቀጽን ይጨምራል።** አንድ ጊዜ** (ከደህንነት አንቀጽ፣ `SAFETY_BOUNDARIES` ወይም ትርጉሙ፣ `less-code` ወይም `ponytail` ሲመረጥ) እና እገዳውን በነጠላ idempotency ማርከር (`[OmniRoute Output Styles]`) ይጀምራል፣ ስለዚህ እንደገና ማመልከት ምንም-op ነው። የተፈታው ቋንቋ (ከዚህ በታች ያለውን የቋንቋ ምርጫ ይመልከቱ) ትርጉም ሲኖረው፣ ከእንግሊዝኛ ይልቅ የተተረጎመው መመሪያ ነው የሚወጋው።

On a body with a non-empty `messages` array, the idempotency check runs before the content bypass: when the `[OmniRoute Output Styles]` marker is already in the top-level `system` field (a string or a content-block array) or in a system message with string content, the body is left unchanged as `already_applied` and no keyword check runs. Otherwise a content bypass (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) checks the text of the last three messages, whatever their role, and skips the styles for the whole turn when that text matches its security, irreversible-action or clarification keywords, or an order-sensitive sequence: `first`, `then`, `after that`, `before`, `rollback` or `backup` followed within 240 characters by `delete`, `drop`, `migrate`, `deploy` or `release`. The bypass runs while the **Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, on by default) is on; turning the toggle off skips the keyword check.

ማለፊያው መዞሪያው እንዲያልፍ ሲፈቅድ፣ `placeSystemInstruction()` (ተመሳሳይ ፋይል)፣ አዲስ `messages[0]` ፈጽሞ የማይፈጥር፣ እገዳውን በመጀመሪያዎቹ ውስጥ ያስቀምጣቸዋል፡-

1. የሕብረቁምፊ ይዘት ያለው መሪ የስርዓት መልእክት፡ እገዳው ከጽሑፉ በኋላ ተያይዟል።
2. ከፍተኛ-ደረጃ `system` መስክ፡ እገዳው ከሕብረቁምፊ ጽሑፍ በኋላ ተያይዟል ወይም እንደ አዲስ የጽሑፍ እገዳ ወደ የይዘት ማገድ ድርድር ታክሏል።
3. የመጀመሪያው በኋላ የስርዓት መልእክት ከሕብረቁምፊ ይዘት ጋር፡ እገዳው ከጽሑፉ በኋላ ተያይዟል።
4. ከላይ ከተጠቀሱት ውስጥ አንዳቸውም አይደሉም: እገዳው በ `messages` መጨረሻ ላይ ወደ አዲስ የስርዓት መልእክት ይገባል.

`messages` አደራደር በሌለው አካል ላይ (ወይም በባዶ)፣ ምንም የይዘት ማለፊያ አይሄድም እና ከፍተኛ ደረጃ ያለው `system` መስክ አይመከርም። ማገጃው የተገጠመለት ከሕብረቁምፊ `instructions` መስክ ጽሑፍ በኋላ ነው፣ያ መስክ አስቀድሞ `[OmniRoute Output Styles]` ማርከርን ካልያዘ በስተቀር፣በዚህ ሁኔታ አካሉ ሳይቀየር `already_applied` ሆኖ ይቀራል። አካሉ ሕብረቁምፊ `instructions` መስክ ከሌለው ነገር ግን `input` (ሕብረቁምፊ ወይም ድርድር) ሲይዝ እገዳው `instructions` ይሆናል፣ ይህም መስክ የተያዘውን ማንኛውንም የሕብረቁምፊ ያልሆነ እሴት ይተካል። ሕብረቁምፊ `instructions` መስክ ወይም ሕብረቁምፊ ወይም ድርድር `input` የሌለው አካል ሳይለወጥ ይቀራል እና `no_messages` ሆኖ ይዘላል.

#### እንዴት ማንቃት እንደሚቻል

በዳሽቦርዱ ውስጥ፡-** የማመቅ አውድ → የማመቂያ ቅንጅቶች** (`/dashboard/context/settings`)፣ የውጤት ቅጦች ክፍል፡- አንድ ረድፍ በስታይል ከ on/off መቀያየር እና ደረጃ መራጭ ጋር። መጭመቂያው ራሱ በርቶ ሳለ ቅጦች መርፌ (የገጹ ዋና መቀየሪያ፣ `enabled`)። የ** ራስ-ግልጽነት ማለፊያ** መቀያየር በ ላይ ነው።** ዋሻማን** ገጽ (`/dashboard/context/caveman`)፣ በውስጡ** የውጤት ሁነታ** ካርድ. ፕሮግራማዊ በሆነ መንገድ፣ የማመቅ አወቃቀሩ ምርጫውን እንደሚከተለው ይቀጥላል፡-

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat `outputStyles` ባዶ ሳለ፣ የድሮው `cavemanOutputMode.enabled` ካርታ ወደ `terse-prose` በ `cavemanOutputMode.intensity` ያዘጋጃል። ከዚያም እገዳው በ `[OmniRoute Output Styles]` ማርከር ይጀምራል፣ የትሩፋት `applyCavemanOutputMode()` ኢንጀክተር `[OmniRoute Caveman Output Mode]` በፃፈበት። ከጠቋሚው በታች፣ ጽሑፉ በ en፣ pt-BR፣ es፣ de, fr, it, ru, id እና vi ውስጥ ካለው የርስት መርፌ ጋር ይዛመዳል፤ በጃ እና zh ከድንበር አንቀፅ በፊት አንድ ተጨማሪ ቦታ ይይዛል። `terse-prose` ወደ pt-BR, es, de, fr, it, ru, zh, ja, id እና vi ይተረጎማል, ስለዚህ የተፈታ ቋንቋ `hu` የሆነ ጥያቄ የቅርስ ኢንጀክተሩ የሃንጋሪውን የተጠቀመበት የእንግሊዝኛ ጽሑፍ ያገኛል።

የውጤት አይነት የቋንቋ ምርጫ (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): `languageConfig.enabled` ሲበራ፣ `autoDetect` በጥያቄው `messages` ድርድር ውስጥ የቅርብ ጊዜውን የተጠቃሚ መልእክት ናሙና ያሳያል (የሕብረቁምፊ ይዘት ወይም የይዘቱ ክፍሎቹ `text` ) እና በላዩ ላይ የ Caveman ሞተር መፈለጊያ (`detectCompressionLanguage()`) ያስኬዳል። ፈላጊው ከሃን ቁምፊዎች ጋር ለጽሑፍ `zh` ይመልሳል እና ምንም ካና የለም; ያለበለዚያ የትኛውንም `it`፣ `pt-BR`፣ `es`፣ `de`፣ `fr`፣ `ru`፣ `ja`፣ `hu` እና `id` በጣም ፍንጭ ያለው ይመልሳል ፣ እና `en` ምንም ተዛማጅ — ጽሑፍ ካልመድበው እንግሊዘኛ ያገኛል ፣ በጭራሽ `defaultLanguage`፣ እና `vi` በጭራሽ አይታወቅም ምንም እንኳን የስታይል መርከብ `vi` ጽሑፍ። ምላሾች API አካል ተራውን በ `input` ይጠብቃል፣ ይህም ለናሙና አልተወሰደም፣ ስለዚህ `defaultLanguage` ያገኛል፣ ከዚያም እንግሊዝኛ። በ `messages` ውስጥ ምንም የተጠቃሚ መልእክት ጽሑፍ ከሌለው ወይም `autoDetect` ጠፍቶ ከሆነ `defaultLanguage` ይተገበራል ፣ ከዚያ እንግሊዝኛ። `languageConfig.enabled` ጠፍቶ፣ ቋንቋው እንግሊዘኛ — ነው የማመቂያ ጥምር ለጥያቄው እስካልተተገበረ ድረስ (ለጥያቄው ማዘዋወር ጥምር የተመደበ ጥምር፣ ወይም ነባሪው መጭመቂያ ኮምቦ chatCore አብሮ በተሰራው ለተደራራቢ ቧንቧው ተመልሶ ይወድቃል)፡ ጥምር መተግበር ለጥያቄው `languageConfig.enabled` ያበራና `defaultLanguage` ከጥምርው የዋጋ ጥቅል ያዘጋጃል (በሌላ መልኩ አንዱ የተቀመጠ የቋንቋ ጥቅል ከሆነ) የ combo የመጀመሪያ ጥቅል፣ ወደ `en` ነባሪ የሆነ፣ የተቀመጠ `autoDetect` (በነባሪ) አሁንም ተፈጻሚ ይሆናል። የ Caveman ግቤት ሞተር የደንብ-ጥቅል ቋንቋውን በተለየ መልኩ — በእያንዳንዱ የጽሑፍ ክፍል ይመርጣል እና በራስ-አግኝቶ በ `enabledPacks` ላይ ይከፈታል።

× ቋንቋ ማትሪክስ በ `tests/unit/compression/output-styles-i18n-matrix.test.ts` ተሰክቷል፡ እያንዳንዱ ካታሎግ ዘይቤ በፈተናው `BASELINE_LANGUAGES` ውስጥ መግባት ያስፈልገዋል። የአካባቢ-ጋቴድ ያልሆነ ዘይቤ pt-BR ትርጉም መላክ አለበት (አካባቢያዊ-gated `terse-cjk` ከዚህ ህግ ነፃ ነው) በ `KNOWN_ENGLISH_ONLY` ውስጥ ካልተዘረዘረ በስተቀር፣ ምንም አይነት ትርጉም የሌላቸው ቅጦች ብቻ ሊይዝ ይችላል — ምንም አይነት ትርጉም ያለው የተዘረዘረ ዘይቤ ፈተናውን ወድቋል። እና አንድ ስታይል `BASELINE_LANGUAGES` መግቢያው የዘረዘረውን ቋንቋ ሲያጣ ፈተናውን ይወድቃል። ቅጥ ለመጨመር [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) ን ይመልከቱ።

### የመሳሪያ ውጤት መጨናነቅ

`compressToolResult()` በ `open-sse/services/compression/toolResultCompressor.ts` የመሳሪያ ውጤት ጽሑፍን ይጭናል።** 5 ስልቶች** . በዚህ ቅደም ተከተል ይሞክራቸዋል፣ እና የመጀመሪያው የነቃ ስልት ከይዘቱ ጋር የሚዛመድበትን ውጤት ይወስናል፡

1. **`fileContent`** የ 3 ወይም ከዚያ በላይ መስመሮች ይዘት ቢያንስ አንድ መስመር፣ መሪ መግባቱን ችላ በማለት በ `import `፣ `export `፣ `function `፣ `class `፣ `const `፣ `let `፣ `var ` ወይም `return ` (ቁልፍ ቃሉ እና ቦታ) ፣ ወይም በ `if`፣ `for` ወይም `while` በ `(` ወይም ` (` የተከተለ ፣ መካከለኛው 2 እና የመጨረሻ 2 ያለው።
2. **`grepSearch`** : ቅርጹ ቢያንስ አንድ መስመር ያለው ይዘት `<path>:<digits>:`, ከመጀመሪያው ኮሎን በፊት ያለው ጽሑፍ ምንም ነጭ ቦታ የሌለው, እነዚያን መስመሮች ብቻ የሚይዝ, ቢበዛ 30, ተጨማሪ ተጨማሪ ግጥሚያዎች እና የተጣጣሙ ፋይሎች ዝርዝር ይቆጥራሉ; ሁሉም ሌላ መስመር ተጥሏል. ስልቱን ለመቀስቀስ አንድ እንደዚህ አይነት መስመር በቂ ነው፣ ስለዚህ እንደ `12:30:45` ባሉ የጊዜ ማህተም የሚጀምር የምዝግብ ማስታወሻ መስመርም ይቆጥራል።
3. **`shellOutput`** : የ ANSI CSI ቅደም ተከተል የያዘ (`ESC[` ከዚያም አሃዞች ወይም ሴሚኮሎን ከዚያም ፊደል፣ እንደ ቀለም ኮድ) ወይም `$` ተከትሎ በጽሁፉ ውስጥ የትኛውም ቦታ ላይ ነጭ ቦታ ያለው ውፅዓት እነዚያን ቅደም ተከተሎች ያጣል (ሌሎች ማምለጫዎች፣ እንደ `ESC[?25l` ወይም የ OSC መስኮት ርዕስ ቅደም ተከተል ተቀምጠዋል) እና የመጨረሻዎቹን 50 መስመሮች ያቆያል፣ መስመርም ተደገመ። ይህ ቼክ `json` እና `errorMessage` በፊት ስለሚሄድ፣ `shellOutput` በሚበራበት ጊዜ JSON ወይም የስህተት ውፅዓት እንደዚህ አይነት `$` ያለው በጭራሽ አይደርስባቸውም።
4. **`json`** ፦ JSON ከ2,000 ቁምፊዎች በላይ የሚጫነው በ `{` ወይም `[` የሚጀምር (ከአማራጭ ነጭ ቦታ በኋላ) እና መተንተን ተጠቃሏል፡ ከ 7 በላይ እቃዎች ድርድር የመጀመሪያውን 5 እና የመጨረሻ 2 እቃዎችን እና አጠቃላይ ቁጥሩን ያቆያል እና እቃው የመጀመሪያውን 20 ቁልፎችን ይይዛል በእያንዳንዱ ጎጆ እቃ ወይም የድርድር እሴት ይተካዋል እና በ `{…N keys}` ይተካዋል `_remaining_<N>_keys` ማርከር ቁልፎቹን መቁጠር ከመጀመሪያው 20 በላይ ተጥሏል። ስኩላር እሴቶች ሙሉ በሙሉ ይገለበጣሉ፣ ስለዚህ 20 ቁልፎች ወይም ከዚያ ያነሰ ነገር ያለ ምንም የጎጆ እሴት እንደገና ገብቷል — አንድ የተቀነሰ ሰው ቁምፊዎችን ያገኛል እና ሳይለወጥ ይቆያል።
5. **`errorMessage`** : በየትኛውም ቦታ እና በማንኛውም የፊደል መያዣ, `error:`, `error ` (በቦታ የተከተለው ቃል, እንደ `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ወይም `traceback` የመጀመሪያውን መስመር, ቀጣዩን 10 መስመሮችን እና የመጨረሻውን 3 ይይዛል, በመካከላቸው ባሉ መስመሮች ምትክ `… [N frames elided] …` ምልክት ያለው. ምልክት ማድረጊያው የሚመጣው ከ13 በላይ መስመሮች የመጀመሪያውን መስመር ሲከተሉ ብቻ ነው፣ ስለዚህ የ14 መስመሮች ወይም ከዚያ ያነሰ የስህተት ውጤት አያጥርም (በ12 ወይም 13 መስመር የመጨረሻዎቹ 3 ተደጋጋሚ መስመሮች ቀደም ብለው ተቀምጠዋል)።

አንድ ስትራቴጂ ከተመሳሰለ በኋላ፣ ምንም እንኳን ምንም የማያድን፣ የኋለኞቹ ስልቶች አልተሞከሩም። የማዛመጃው ስልት ምንም የሚገመቱ ምልክቶችን ( ÷ 4 ርዝመት፣ የተጠቀለለ) — ለምሳሌ ኮድ መሰል ፋይል 25 መስመር ወይም ከዚያ ያነሰ፣ ወይም JSON ድርድር ከ2,000 በላይ ቁምፊዎች ያለው 7 ንጥሎች ወይም ያነሰ — የጥቃት ሞተሩ ዋናውን የመሳሪያውን ውጤት ያስቀምጣል፡ ሁለቱም ደዋዮች (`compressAggressive()` እና `compressAnthropicToolResultBlock()`) አሁንም `compressToolResult()` `saved` በታች ይሆናሉ። የስትራቴጂው ውጤት. የመሳሪያ-ውጤት ደረጃ የመጨረሻው ቃል አይደለም፡የኤንጂኑ መውደቅ ማጠቃለያ አሁንም `tool` ወይም `function` መልእክትን ከ8,192 ቁምፊዎች (`maxTokensPerMessage`, 2,048, times 4) ማሳጠር ይችላል።

#### መቼ መጠቀም

የመሳሪያው ውጤት መጭመቅ የጨረር ሞተር (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`) ደረጃ 1 ነው፣ ስለዚህ በአግረሲቭ ሁነታ እና በ `aggressive` ደረጃ በተቆለለ የቧንቧ መስመር ይሰራል። የOpenAI-ቅርጽ `tool` እና `function` መልዕክቶችን እና በ Anthropic `tool_result` ውስጥ ያለውን ጽሑፍ ያጨቃል። እያንዳንዱ ስልት በ `aggressive.toolStrategies` ስር የራሱ ማብሪያ / ማጥፊያ አለው ፣ ሁሉም በነባሪ። በዳሽቦርዱ ውስጥ፣ ማብሪያዎቹ በዋሻማን ገጽ ውስጥ ናቸው።** የላቀ** መጭመቂያው ሲበራ ይመልከቱ እና ነባሪው ሁነታ ኃይለኛ ነው።

### የተቆለለ የቧንቧ መስመር

የተቆለለ ሁነታ ይሰራል** በርካታ ሞተሮች በቅደም ተከተል** — ብዙውን ጊዜ RTK መጀመሪያ (ከ60-90% ቁጠባዎች በመሳሪያ ውፅዓት)፣ ከዚያም Caveman በቀሪው ጽሁፍ (~ 46% የግብዓት ቁጠባዎች)። የተቀናበረ፣ ያ ነው።** 78-95% ብቁ ክልል** (ከላይ ያለውን የቁጠባ ሂሳብ ይመልከቱ) `1 - (1 - 0.60..0.90) × (1 - 0.46)` አማካይ ≈ 89% ነው።

#### እንዴት እንደሚሰራ

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### መቼ መጠቀም

ለተደራራቢ ሁነታ ተጠቀም ለ፡-

- መሣሪያ-ከባድ የሥራ ፍሰቶች (ወኪል ኮድ ማድረግ፣ ምርምር)
- ወጪ ቆጣቢ ባች ሂደት
- ከፍተኛ የማስመሰያ ቁጠባ ሲያስፈልግ

የተደራረቡ የቧንቧ መስመሮች የሚዋቀሩት በአለምአቀፍ `stackedPipeline` መጭመቂያ መቼት ነው፣ ወይም በተሰየመ የመጭመቂያ ኮምቦ ለመዘዋወር ኮምቦ በተሰየመ (ከላይ ያለውን የፐር-ኮምቦ መሻርን ይመልከቱ) — በራስ-ኮምቦ `modePack` በኩል አይደለም (ያ መስክ የራስ-ኮምቦ ሞዴል ምርጫን ብቻ ይመዝናል እና `stacked` የሚሰራ የጥቅል ስም አይደለም)።

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
