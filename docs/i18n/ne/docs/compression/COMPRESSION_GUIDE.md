# 🗜️ Prompt Compression Guide — OmniRoute (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> योग्य कन्टेक्स्टमा स्वचालित रूपमा 15-95% बचत गर्नुहोस्। द्रुत अवलोकनका लागि, [README Compression खण्ड](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) हेर्नुहोस्।

## अवलोकन

OmniRoute ले एउटा मोड्युलर प्रम्प्ट कम्प्रेसन पाइपलाइन कार्यान्वयन गर्छ, जुन अनुरोधहरू अपस्ट्रिम प्रदायकहरूमा पुग्नुअघि नै **सक्रिय रूपमा** चल्छ। यसको अर्थ तपाईंको टोकन बचत पारदर्शी रूपमा हुन्छ — तपाईंको कार्यप्रवाहमा कुनै परिवर्तन आवश्यक पर्दैन।

```
क्लाइन्ट अनुरोध
  → कम्प्रेसन रणनीति चयनकर्ता
    → कम्बो ओभरराइड? → कम्बो सेटिङ प्रयोग गर्नुहोस्
    → स्वतः-ट्रिगर सीमा? → स्वतः मोड प्रयोग गर्नुहोस्
    → पूर्वनिर्धारित मोड? → ग्लोबल सेटिङ प्रयोग गर्नुहोस्
    → बन्द? → कम्प्रेसन छोड्नुहोस्
  → चयन गरिएको कम्प्रेसन मोड
    → बन्द: कम्प्रेसन हुँदैन
    → हल्का: सुरक्षित ह्वाइटस्पेस/ढाँचा सफाइ (~15%)
    → मानक: टुक्रे शैलीका अनावश्यक शब्द हटाउने (~30%)
    → आक्रामक: इतिहासको समयानुसार सङ्कुचन + सारांश (~50%)
    → अल्ट्रा: ह्युरिस्टिक छाँटकाँट + कोड-ब्लक सङ्कुचन (~75%)
    → RTK: कमान्ड-सचेत टर्मिनल/उपकरण-आउटपुट फिल्टरिङ (60-90% अपस्ट्रिम दायरा)
    → स्ट्याक्ड: क्रमबद्ध बहु-इन्जिन पाइपलाइन, सामान्यतया पहिले RTK अनि Caveman (78-95% योग्य दायरा)
  → कम्प्रेस गरिएको अनुरोध → प्रदायक
```

---

## कम्प्रेसन मोडहरू

### बन्द

कुनै कम्प्रेसन लागू हुँदैन। सबै सन्देशहरू परिवर्तन नगरी प्रवाह हुन्छन्।

### Lite मोड (~15% बचत, <1ms विलम्बता)

सबैभन्दा सुरक्षित मोड — फर्म्याटिङ सफाइ। यसको tool-result truncation ले डाटा गुमाउँछ, त्यसैले पूर्वनिर्धारित
मार्ग (`allow-lossy`, `engine:lite` वा named-combo opt-in बिना) मा
`compressToolResults: false` सहित lite चल्छ: अघिल्ला tool results प्रदायकसम्म परिवर्तन नगरी पुग्छन्।

| Technique                | Description                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `collapseWhitespace`     | लगातारका खाली लाइनहरू र अन्त्यका खाली ठाउँहरू मर्ज गर्ने                                   |
| `dedupSystemPrompt`      | दोहोरिएका system messages हटाउने                                                           |
| `compressToolResults`    | अघिल्ला tool results लाई lite cap सम्म छोट्याउने (डाटा गुम्ने: request opt-in हुँदा मात्र) |
| `removeRedundantContent` | दोहोरिएका निर्देशनहरू हटाउने                                                               |
| `replaceImageUrls`       | base64 image data URIs छोट्याउने                                                           |

**यसका लागि उपयुक्त:** सधैँ सक्रिय प्रयोग, सुरक्षा-सम्बन्धी महत्त्वपूर्ण कार्यप्रवाहहरू।

### Standard मोड (~30% बचत)

[Caveman](https://github.com/JuliusBrussee/caveman) बाट प्रेरित — अर्थ कायम राख्दै filler words र verbose phrasing हटाउँछ:

- filler words हटाउँछ ("please", "I think", "basically", "actually")
- verbose phrases सङ्क्षिप्त बनाउँछ ("in order to" → "to", "as a result of" → "because")
- विनम्र hedging हटाउँछ ("Would you mind...", "If you could possibly...")
- coding prompts का लागि अनुकूलित 30+ regex rules

**यसका लागि उपयुक्त:** दैनिक coding workflows, लागतप्रति सचेत टोलीहरू।

### Aggressive मोड (~50% बचत)

लामो सत्रहरूका लागि स्मार्ट history management:

- **Message Aging** — पुराना सन्देशहरू क्रमशः कम्प्रेस हुन्छन्
- **Tool Result Compression** — लामो tool outputs छोट्याइन्छ वा हटाइन्छ (पहिला/अन्तिम लाइनहरू,
  match-line filtering, JSON key compaction)
- **Structural Integrity Guards** — `tool_use` + `tool_result` जोडीहरू सुसंगत रहने सुनिश्चित गर्छ
- **Context Window Awareness** — प्रत्येक मोडेलको token limits को सम्मान गर्छ

**यसका लागि उपयुक्त:** लामो debugging sessions, ठूला codebases।

### Ultra मोड (~75% बचत)

token-आवश्यकता अत्यधिक भएका अवस्थाका लागि अधिकतम कम्प्रेसन:

- **Heuristic Pruning** — prose का tokens लाई score का आधारमा pruning गर्ने
- **Structure Preservation** — fenced code blocks, inline code, URLs र identifiers लाई
  tombstone गरी verbatim रूपमा पुनःजोडिन्छ, कहिल्यै pruning गरिँदैन
- **Optional SLM tier** — कन्फिगर गरिएको अवस्थामा prune सुधार्न सानो local model ले refine गर्न सक्छ
- Aggressive mode बाट स्वतन्त्र: यसले message aging, tool-result compression
  वा fallback summarizer चलाउँदैन (SLM-tier असफलताले मात्र fallback pass लाई
  aggressive मार्फत route गर्न सक्छ)

**यसका लागि उपयुक्त:** context limits बारम्बार पुगिरहेको अवस्थामा।

### RTK मोड (60-90% upstream range)

RTK मोड coding-agent sessions मा देखिने verbose tool outputs का लागि अनुकूलित छ:

- `git status`, `git diff`, `git log`, test runners,
  TypeScript/Vite/Webpack builds, ESLint/Biome/Prettier, npm audit/installs, Docker logs, infra
  output र generic shell output जस्ता command/output classes पहिचान गर्छ
- `open-sse/services/compression/engines/rtk/filters/` बाट JSON filter packs लागू गर्छ
- project वा global `filters.toml` files बाट RTK TOML schema v1 filters आयात गर्छ, inline-test
  validation र project files का लागि trust-gating सहित
- inline verify samples सहित 56 वटा built-in filters उपलब्ध गराउँछ
- ANSI control sequences, progress bars, दोहोरिएका lines र कार्यवाही गर्न नसकिने noise हटाउँछ
- failures, errors, warnings, changed files, summaries र लामो output को tail सुरक्षित राख्छ
- trust-gated project filters, global filters र वैकल्पिक redacted raw-output recovery समर्थन गर्छ

**यसका लागि उपयुक्त:** shell, build, test, git, grep र file-output transcripts भएका agent sessions।

### Stacked मोड (78-95% eligible range)

Stacked मोडले धेरै compression engines लाई निश्चित क्रमअनुसार चलाउँछ। पूर्वनिर्धारित pipeline:

```txt
RTK -> Caveman
```

यस क्रमले पहिले terminal/tool output लाई compact राख्छ, त्यसपछि बाँकी natural-language prompt मा
Caveman semantic condensation लागू गर्छ। Stacked pipelines लाई विश्वव्यापी रूपमा वा routing combos लाई
assigned compression combos मार्फत कन्फिगर गर्न सकिन्छ।

**यसका लागि उपयुक्त:** ठूला tool logs साथै human instructions वा assistant summaries भएको मिश्रित context।

## अपस्ट्रिम बचतको गणना

OmniRoute ले दुई स्रोतबाट हुने कम्प्रेसन बचतको अभिलेख राख्छ: अपस्ट्रिम परियोजनाका बेन्चमार्कहरू र
OmniRoute को आफ्नै इन्जिन संयोजन।

| स्रोत   | यहाँ प्रयोग गरिएको अपस्ट्रिम README को सङ्ख्या                                                         |
| ------- | ------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` कम आउटपुट टोकन, `65%` बेन्चमार्क औसत आउटपुट बचत, `22-87%` दायरा, र `~46%` इनपुट कम्प्रेसन उपकरण |
| RTK     | कमाण्ड-आउटपुटमा `60-90%` बचत; नमुना सत्रमा `~118,000 -> ~23,900` टोकन, अर्थात् `79.7%` बचत (`~80%`)    |

एक-अर्कासँग खप्टिने उपकरण/कन्टेक्स्ट पेलोडहरूका लागि, पूर्वनिर्धारित OmniRoute कम्बोले इन्जिनहरूलाई यसरी स्ट्याक गर्छ:

```txt
RTK -> Caveman
```

संयुक्त बचत गुणात्मक हुन्छ, योगात्मक होइन:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

त्यो `78-95%` सङ्ख्या RTK र Caveman दुवैले एउटै इनपुट/कन्टेक्स्ट पेलोड घटाउन सक्ने अवस्थामा लागू हुन्छ।
Caveman प्रतिक्रिया आउटपुट मोड छुट्टै हो: यो सक्षम हुँदा, Caveman कै आफ्नै आउटपुट बचत (`65%`
औसत, `~75%` प्रमुख आँकडा, `22-87%` दायरा) प्रयोग गर्नुहोस्। कुल बिलिङ बचत तपाईंको प्रम्प्ट/आउटपुट मिश्रणमा निर्भर हुन्छ।

### "योग्य" भन्नाले वास्तवमा के बुझिन्छ

15-95% को प्रमुख दायरा वास्तविक हो, तर यो **अनावश्यक रूपमा दोहोरिएको वा विस्तृत** सामग्रीमा मात्र लागू हुन्छ — दोहोरिएका
त्रुटि पङ्क्तिहरू, एउटै चेतावनी बारम्बार देखाउने बिल्ड लग, आवश्यकताभन्दा ठूलो `grep`/फाइल-रिड डम्प। यसको अर्थ
हरेक अनुरोधले त्यति नै बचत गर्छ भन्ने **होइन**।

प्रयोगात्मक रूपमा प्रमाणित (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 वटा समान
त्रुटि पङ्क्ति समावेश भएको Anthropic-आकारको `tool_result` ब्लकमा चलाइएको `stacked` (RTK + Caveman) रनले
**95.93% टोकन बचत / 96.26% क्यारेक्टर बचत** उत्पन्न गर्यो — जुन विज्ञापित
दायराभित्र स्पष्ट रूपमा पर्छ। तर सामान्य, अनावश्यक दोहोरिन नभएको उपकरण आउटपुट (सफा `grep` मिलान सूची,
छोटो फाइल रिड, सामान्य संवादात्मक पाठ) मा चलाइएको उही पाइपलाइनले सही रूपमा **लगभग शून्य बचत** उत्पन्न गर्छ, किनभने
हटाउनुपर्ने दोहोरिएको सामग्री हुँदैन र `validateCompression()` (`validation.ts`) ले कोड ब्लक, URL, शीर्षक, संस्करण, वा ALL-CAPS स्थिर पहिचानकर्ता हटाउने वा परिवर्तन गर्ने
पुनर्लेखन पठाउन अस्वीकार गर्छ।

यो अपेक्षित, सुरक्षित व्यवहार हो, बग होइन: मुख्यतः सफा फाइलहरू पढ्ने/grep गर्ने कोडिङ सत्रमा
कम्प्रेसन पूर्ण रूपमा सक्षम हुँदा पनि कुल बचत सामान्य हुनेछ, जबकि असफल भइरहने
लुप वा धेरै आउटपुट दिने लिन्टर सामना गर्ने सत्रले त्यस्तो ट्राफिकमा पूर्ण 78-95% दायरा देख्नेछ। एउटै सत्रको
कम समग्र बचत प्रतिशतलाई कम्प्रेसन गलत कन्फिगर भएको प्रमाणका रूपमा प्रयोग नगर्नुहोस् — पहिले अन्तर्निहित
उपकरण आउटपुट वास्तवमै अनावश्यक रूपमा दोहोरिएको थियो कि थिएन जाँच गर्नुहोस्।

---

## टोकन बचतको दृश्यात्मक प्रस्तुति

```
कम्प्रेसनबिना:       LLM मा 47K टोकन पठाइयो
Lite सहित:           40K टोकन पठाइयो          (15% बचत — सुरक्षित, सधैँ सक्रिय)
Standard सहित:       33K टोकन पठाइयो          (30% बचत — caveman-speak नियमहरू)
Aggressive सहित:     24K टोकन पठाइयो          (50% बचत — एजिङ + सारांशकरण)
Ultra सहित:          12K टोकन पठाइयो          (75% बचत — ह्युरिस्टिक प्रुनिङ)
RTK सहित:            19K-5K टोकन पठाइयो       (कमाण्ड/उपकरण आउटपुटमा 60-90% बचत)
Stacked सहित:        10K-2.5K टोकन पठाइयो     (योग्य RTK+Caveman सामग्रीमा 78-95% दायरा)
```

---

## कन्फिगरेसन

### ड्यासबोर्ड

`Dashboard → Context & Cache` मा जानुहोस्:

- **Caveman** — मोड चयन, भाषा प्याकहरू, पूर्वावलोकन, र विश्वव्यापी डिफल्टहरू
- **RTK** — कमान्ड-फिल्टर पूर्वावलोकन, RTK सुरक्षा सेटिङहरू, र फिल्टर क्याटलग
- **Compression Combos** — राउटिङ कम्बोहरूमा तोकिएका नामित इन्जिन पाइपलाइनहरू
- **Auto-Trigger Threshold** — टोकन सङ्ख्या थ्रेसहोल्डभन्दा बढी हुँदा कम्प्रेसन स्वतः सक्रिय गर्ने

### प्रति-कम्बो अधिलेखन

`Dashboard → Context & Cache → Compression Combos` मा राउटिङ
कम्बोलाई कम्प्रेसन कम्बो तोक्नुहोस्:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

यसले तपाईंलाई free/coding प्रदायकहरूमा स्ट्याक गरिएको कम्प्रेसन प्रयोग गर्न दिन्छ, जबकि सशुल्क
सदस्यताहरूमा lite मोड कायम राख्छ।

यो "प्रति-कम्बो अधिलेखन" असाइनमेन्ट **राउटिङ-कम्बो कम्प्रेसन
मोड** अधिलेखन (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — फिल्डको स्किमाले
`rtk`, `stacked` र `omniglyph` पनि स्वीकार गर्छ) भन्दा फरक नियन्त्रण हो — उक्त अधिलेखनले नामित
कम्प्रेसन-कम्बो पाइपलाइन चयन गर्दैन; यसले केवल
`resolveCompressionPlan` द्वारा परामर्श गरिने `compressionMode` फिल्ड सेट गर्छ। यसलाई कम्बो कार्ड
(`Dashboard → Combos`) मा वा #6760 देखि,
`Dashboard → Context & Cache → Compression Combos` को "Assign to routing" सूचीमा प्रति राउटिङ
कम्बो सेट गर्न सकिन्छ, माथि दस्तावेजीकृत पाइपलाइन-असाइनमेन्ट चेकबक्सको ठीक छेउमा।
दुवै सतहहरूले एउटै `PUT /api/combos/{id}` एन्डपोइन्टमार्फत स्थायी रूपमा सुरक्षित गर्छन्।

### प्रति-अनुरोध अधिलेखन

एकल अनुरोधका लागि कम्प्रेसन योजना अधिलेखन गर्न `x-omniroute-compression` अनुरोध हेडर पठाउनुहोस्। यसको
प्राथमिकता सबैभन्दा उच्च हुन्छ — यसले राउटिङ-कम्बो अधिलेखन, सक्रिय प्रोफाइल, स्वतः-ट्रिगर, र प्यानलको
Default लाई समेत अधिलेखन गर्छ। अज्ञात मानहरू बेवास्ता गरिन्छन् (अनुरोध कहिल्यै अस्वीकार हुँदैन) र
विश्वव्यापी मास्टर स्विचले अझै सबै कुरालाई नियन्त्रण गर्छ: कम्प्रेसन विश्वव्यापी रूपमा बन्द हुँदा हेडरले
यसलाई सक्रिय गर्न सक्दैन। मानहरू:

| मान           | प्रभाव                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | यस अनुरोधका लागि कुनै कम्प्रेसन हुँदैन।                                                                        |
| `default`     | प्यानलबाट व्युत्पन्न Default प्रोफाइल (सक्रिय प्रोफाइललाई बेवास्ता गर्छ)। हानियुक्त इन्जिनहरू बन्द नै रहन्छन्। |
| `safe`        | हेडर नदिँदाको जस्तै।                                                                                           |
| `allow-lossy` | सारांश, सान्दर्भिकता फिल्टर, र शैली पुनर्लेखनसहित यस अनुरोधको अपरेटर योजना कायम राख्छ।                         |
| `engine:<id>` | सक्षम गरिएको अवस्थामा एउटा मात्र इन्जिन, जस्तै `engine:rtk`। यो उक्त इन्जिनका लागि प्रति-अनुरोध opt-in हो।     |
| `<combo>`     | नामद्वारा (केस-असंवेदनशील रूपमा) पहिले र त्यसपछि id द्वारा मिलाइएको नामित कम्बो।                               |

`allow-lossy`, `engine:<id>`, वा नामित कम्बोबिना हानियुक्त इन्जिनहरू लागू हुँदैनन्। हानियुक्त
Default, स्वतः-ट्रिगर, वा राउटिङ अधिलेखनलाई डाउनग्रेड गर्दा, OmniRoute ले कन्फिगर गरिएको स्ट्याक गरिएको
पाइपलाइनबाट पहिचान गरिएका हानिरहित चरणहरूलाई कन्फिगर गरिएको क्रममा कायम राख्छ। कन्फिगर गरिएका
कुनै पनि हानिरहित चरण बाँकी नरहेमा मात्र `session-dedup → lite` मा फर्किन्छ।

सेटिङ्स प्यानलको **Effective pipeline** पूर्वावलोकनले सामान्य रूपमा सुरक्षित योजनालाई देखाउँछ।
स्वतः-ट्रिगर चल्न सक्ने अवस्थामा, यही पूर्वावलोकनले यसको ससर्त प्रभावकारी पाइपलाइन पनि देखाउँछ, ताकि
प्यानल र हेडररहित रनटाइम रिजोल्युसन एकरूप रहून्।

लागू गरिएको योजना `X-OmniRoute-Compression: <mode>; source=<source>` प्रतिक्रिया हेडरमा फिर्ता
प्रतिध्वनित गरिन्छ, जहाँ `<source>` यीमध्ये एक हुन्छ: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, वा `off`।

### API

```bash
# कम्प्रेसन सेटिङहरू प्राप्त गर्नुहोस्
curl http://localhost:20128/api/settings/compression

# कम्प्रेसन सेटिङहरू अद्यावधिक गर्नुहोस्
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# निश्चित RTK/stacked पेलोडको पूर्वावलोकन गर्नुहोस्
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK फिल्टर प्याकहरू सूचीबद्ध गर्नुहोस्
curl http://localhost:20128/api/context/rtk/filters

# वैकल्पिक कमान्ड मेटाडेटासहित RTK लाई प्रत्यक्ष परीक्षण गर्नुहोस्
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## के सुरक्षित रहन्छ

कम्प्रेसन इन्जिनले **सधैं निम्न कुराहरू सुरक्षित राख्छ:**

- ✅ कोड ब्लकहरू (फेन्स गरिएको र इनलाइन)
- ✅ URL र फाइल पाथहरू
- ✅ JSON संरचनाहरू र संरचित डेटा
- ✅ पहिचायकहरू र सुरक्षित प्राविधिक टोकनहरू
- ✅ गणितीय अभिव्यक्तिहरू
- ✅ उपकरण/फङ्सन कल परिभाषाहरू
- ✅ प्रणाली प्रम्प्टहरू (लाइट मोडमा)

RTK कच्चा-आउटपुट पुनर्प्राप्तिले कुनै पनि कुरा भण्डारण हुनुअघि सामान्य API कुञ्जीहरू, बियरर टोकनहरू, Slack टोकनहरू, AWS पहुँच कुञ्जीहरू,
पासवर्डहरू, टोकनहरू र गोप्य जानकारीहरू हटाउँछ।

---

## कम्प्रेसन तथ्याङ्क

प्रत्येक कम्प्रेस गरिएको अनुरोधले सर्भर लगहरूमा तथ्याङ्क समावेश गर्छ:

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

## चरणगत कार्ययोजना

| चरण    | मोडहरू                                                                                                                                              | स्थिति         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| चरण 1  | बन्द, लाइट                                                                                                                                          | ✅ जारी गरिएको |
| चरण 2  | मानक, आक्रामक, अल्ट्रा                                                                                                                              | ✅ जारी गरिएको |
| चरण 3  | RTK, स्ट्याक्ड, कम्प्रेसन कम्बोहरू                                                                                                                  | ✅ जारी गरिएको |
| चरण 4  | आउटपुट शैलीहरू, SLM-स्तरीय अल्ट्रा, मूल्याङ्कन हार्नेस                                                                                              | ✅ जारी गरिएको |
| चरण 4C | अनुकूलनशील कन्टेक्स्ट-बजेट ("डायल") — कम्प्युट इन्जिन + API (`PUT /api/settings/compression` मा `contextBudget`) + ड्यासबोर्ड मोड/नीति नियन्त्रणहरू | ✅ जारी गरिएको |

---

## आभार

मानक मोडका कम्प्रेसन नियमहरू **[JuliusBrussee](https://github.com/JuliusBrussee)** को **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — भाइरल "धेरै टोकन किन प्रयोग गर्ने, जब थोरै टोकनले काम गर्छ" परियोजनाबाट प्रेरित छन्। Caveman ले आउटपुट टोकनहरूमा `~75%` कमी, बेन्चमार्कको औसत आउटपुट बचत `65%`, आउटपुट दायरा `22-87%`, र `~46%` इनपुट-कम्प्रेसन उपकरण रिपोर्ट गर्छ।

RTK मोड **[RTK AI](https://github.com/rtk-ai)** को **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — टर्मिनल, बिल्ड, परीक्षण, git, र उपकरण-आउटपुट फिल्टरिङका लागि उच्च-प्रदर्शनयुक्त कमान्ड-आउटपुट कम्प्रेसन परियोजनाबाट प्रेरित छ। RTK ले `60-90%` बचत रिपोर्ट गर्छ, र यसको README को नमुना सत्रले `~80%` बचत देखाउँछ।

---

## उन्नत कम्प्रेसन प्रणालीहरू

माथि वर्णन गरिएको 7 मोडहरू बाहेक (स्रोतले `codex-responses` र `omniglyph` मोडहरू पनि स्वीकार गर्दछ, जुन यस गाइडले कभर गर्दैन), तलका खण्डहरूले ती मोडहरू भित्र वा साथमा काम गर्ने सुविधाहरू कभर गर्दछ: उपकरण परिणाम कम्प्रेसन र प्रगतिशील एजिंग आक्रामक इन्जिनको चरण 1 र 2 हो (आक्रामक मोड र एक `aggressive` पाइप स्ट्याक स्ट्याकको स्ट्याक मोड, स्ट्याकको स्टेप स्टेप लाइन)। क्यास-अवेयर कम्प्रेसनले कम्प्रेसन अन हुँदा क्यासिङ प्रदायकहरूको लागि `aggressive` र `ultra` लाई `standard` मा डाउनग्रेड गर्छ, र केभम्यान आउटपुट मोड र आउटपुट स्टाइलहरू अप्ट-इन प्रणाली-प्रम्प्ट निर्देशनहरू हुन्, पूर्वनिर्धारित रूपमा, जसले अनुरोधलाई कम्प्रेस गर्नुको सट्टा मोडेलको आउटपुटलाई आकार दिन्छ।

### क्यास-अवेयर कम्प्रेसन

केही प्रदायकहरू (जस्तै प्रम्प्ट क्यासिङको साथ Anthropic ) समर्थन** प्रम्प्ट क्यासिङ** , जसले तिनीहरूलाई लागत र विलम्बता कम गर्न प्रम्प्टको भागहरू क्यास गर्न दिन्छ। जब क्यासिङ सक्षम हुन्छ, आक्रामक कम्प्रेसन वास्तवमा हुन सक्छ** चोट** कार्यसम्पादन किनभने यसले क्यास गरिएका टोकनहरू परिवर्तन गर्छ, क्यासलाई अमान्य बनाउँछ।

`cachingAware.ts` मोड्युलले यसलाई समाधान गर्छ** क्यासिङ सन्दर्भ पत्ता लगाउँदै** र** कम्प्रेसन रणनीति समायोजन** तदनुसार।

#### यसले कसरी काम गर्छ

1. **क्यासिङ सन्दर्भ पत्ता लगाउनुहोस्** — `cache_control` मार्करहरूको लागि अनुरोध मुख्य भाग स्क्यान गर्दछ
2. **क्यासिङ प्रदायकहरू पहिचान गर्नुहोस्** — जाँच गर्दछ यदि लक्षित प्रदायकले क्यासिङ समर्थन गर्दछ
3. **रणनीति समायोजन गर्नुहोस्** — क्यासिङ प्रदायकहरूको लागि `aggressive`/`ultra` लाई `standard` लाई डाउनग्रेड गर्छ
4. **प्रणाली प्रम्प्ट छोड्नुहोस्** — प्रणाली प्रम्प्टहरू सामान्यतया क्यास हुन्छन्, त्यसैले तिनीहरूलाई कम्प्रेस नगर्नुहोस्

रणनीति सहयोगीले `deterministicOnly` झण्डा पनि फर्काउँछ, तर योजना निर्माणकर्ताले मात्र रणनीति — उपभोग गर्छ, आज झण्डा पढ्दैन।

#### कोड उदाहरण

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

#### कहिले प्रयोग गर्ने

क्यास-सचेत कम्प्रेसन हो** सधैं** — कुनै कन्फिगरेसन आवश्यक छैन। जब पनि कम्प्रेसन सक्रिय हुन्छ र लक्षित प्रदायकले प्रम्प्ट क्यासिङ (Anthropic, OpenAI, आदि) लाई समर्थन गर्दछ; स्पष्ट `cache_control` मार्करहरू आवश्यक पर्दैन — क्यासिंग प्रदायक एक्लैले डाउनग्रेड ट्रिगर गर्दछ, र मार्करहरूले एक्लै कहिल्यै गर्दैनन् (मार्कर पत्ता लगाउने क्यास टेलिमेट्री फिड गर्दछ, रणनीति निर्णय होइन)।

OpenRouter `anthropic/*` मोडेलहरूका लागि मात्र क्यासिङ प्रदायकको रूपमा गणना गर्दछ: Claude कोड अनुरोधहरूले तिनीहरूको `cache_control` ब्रेकपोइन्टहरू (अधिकतम ४) राख्छन् र गार्डले उपसर्गलाई सुरक्षित राख्छन्, जबकि प्रत्येक अन्य OpenRouter परिवार (`openai/`, `google/`, `qwen/`, …) स्ट्रिप गरिएको र असुरक्षित रहन्छ।

### प्रगतिशील उमेर

लामो कुराकानीले धेरै सन्देश पालोहरू जम्मा गर्छ, तर पुरानो मोडहरू कम सान्दर्भिक हुन्छन्। `progressiveAging.ts` मोड्युल** पालो दूरी द्वारा सन्देशहरू घटाउँछ** (वार्तालापको अन्त्यबाट नापिएको दूरी)। पठाइएका पूर्वनिर्धारितहरूसँग (`verbatim: 2, light: 2, moderate: 3`):

- **अन्तिम २ पालो (दूरी ≤ 2)** : शब्दशः राखियो
- **दूरी ३** : गुफाको कम्प्रेसन (फिलर हटाउने)
- **दूरी 4 +** : सहायक सन्देशहरू सारांशित; प्रयोगकर्ता सन्देशहरू तिनीहरूको पहिलो लाइनमा घटाइयो, 120 क्यारेक्टरहरूमा क्याप गरिएको; अन्य भूमिका अछूत। प्रणाली प्रम्प्टहरू, पहिल्यै पुरानो सन्देशहरू र नवीनतम प्रयोगकर्ता सन्देशहरू सधैं दूरीको पर्वाह नगरी शब्दशः राखिन्छन्। केहि पनि सिधै छोडिएको छैन, र `light` ब्यान्ड पठाइएका पूर्वनिर्धारितहरू (`light` बराबर `verbatim`) सँग पहुँचयोग्य छैन।

#### कोड उदाहरण

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

#### कहिले प्रयोग गर्ने

प्रगतिशील उमेर छ** सधैं** `aggressive` मोड — को लागि यो `compressAggressive()` को चरण 2 हो। अल्ट्रा मोडले यसलाई चलाउँदैन। यो विशेष गरी प्रभावकारी छ:

- लामो समयदेखि चलिरहेको कोडिङ सत्रहरू
- बहु-दिन कुराकानी
- धेरै उपकरण कलहरूको साथ एजेन्टिक कार्यप्रवाह

### Caveman आउटपुट मोड

Caveman आउटपुट मोड थप्छ** प्रणाली शीघ्र निर्देशन** जसले मोडेललाई terse आउटपुट — सोध्छ, `lite` लेभलले संक्षिप्त जवाफहरू सोध्छ जुन पूर्ण वाक्यहरू राख्छ, `full` ले यसलाई "स्मार्ट गुफाको रूपमा terse जवाफ दिनुहोस्", र `ultra` टेलिग्राफिक आउटपुटको लागि सोध्छ; निर्देशनहरू मात्र सोध्छन्, तिनीहरूले यसको ग्यारेन्टी गर्न सक्दैनन्। अनुरोधहरूले तिनीहरूलाई `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) मार्फत प्राप्त गर्दछ: `open-sse/handlers/chatCore.ts` पहिले ब्याक-कम्प्याट शिम (`resolveOutputStyleSelection()` मा `open-sse/services/compression/outputStyles/backCompat.ts`) को साथ चयनलाई समाधान गर्छ, जुन `outputStyles` खाली हुँदा, सक्षम गरिएको `cavemanOutputMode` लाई `cavemanOutputMode.intensity` मा `terse-prose` आउटपुट शैलीमा नक्सा बनाउँछ (ब्याक-कम्प्याट तल हेर्नुहोस्); एक गैर-खाली `outputStyles` चयन जस्तै प्रयोग गरिन्छ, र `cavemanOutputMode.enabled` र `intensity` त्यसपछि कुनै प्रभाव हुँदैन, जबकि यसको `autoClarity` टगल अझै लागू हुन्छ। `outputMode.ts` निर्देशन पाठहरू (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), सामग्री बाइपास र इन्जेक्सन प्रयोग गर्ने प्लेसमेन्ट सहायक राख्छ; यसको आफ्नै `applyCavemanOutputMode()` इन्जेक्टरसँग कुनै उत्पादन कलर छैन।

#### यसले कसरी काम गर्छ

यो मोडले इनपुट कम्प्रेस गर्दैन। यसले प्रणाली प्रम्प्टमा एक निर्देशन ब्लक थप्छ (तलको इन्जेक्शनले कसरी काम गर्छ हेर्नुहोस्), र अनुरोधको लागि चयन गरिएको कुनै पनि इनपुट कम्प्रेसन मोड अझै पछि चल्छ, शरीरमा जुन ब्लक बोक्छ। प्रत्येक तहको साथ समाप्त हुने साझा सीमा खण्डको अगाडि, अंग्रेजी `full` लेभल पढ्छ:

> "स्मार्ट केभम्यान जस्तै terse जवाफ दिनुहोस्। लेखहरू (a/an/the), फिलर (just/really/basically/actually/simply), pleasantries, हेजिङ। टुक्राहरू OK. छोटो समानार्थी शब्दहरू (ठूलो होइन, कार्यान्वयन नगर्नुहोस्) सबै प्राविधिक पदार्थ, कोड, त्रुटिहरू, URLs, identifier राख्नुहोस्।"

यसले विशेष गरी राम्रोसँग काम गर्दछ:

- कोड उत्पादन (terser आउटपुट = थोरै टोकनहरू)
- द्रुत प्रश्नोत्तर (विस्तृत व्याख्याहरूको आवश्यकता छैन)
- ब्याच प्रशोधन (थ्रुपुट अधिकतम गर्नुहोस्)

#### कहिले प्रयोग गर्ने

केभम्यान आउटपुट मोड हो** अप्ट-इन** । कम्प्रेसन अन (`enabled: true`, कम्प्रेसन सेटिङ्हरू पृष्ठमा मास्टर टगल), यसलाई `cavemanOutputMode.enabled` सँग खोल्नुहोस्; `intensity` `lite`, `full` वा `ultra` छान्छ:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

कम्प्रेसन कम्बो** आउटपुट मोड** टगल (`outputMode`, `outputModeIntensity` मा स्तर) ले कम्बोमा लागू हुने अनुरोधहरूको लागि समान स्विच सेट गर्दछ, र `omniroute_set_compression_engine` MCP उपकरणले यसलाई यसको बुलियन `outputMode` तर्क मार्फत लेख्छ। एक गैर-खाली `outputStyles` चयनले यो स्विचमा प्राथमिकता लिन्छ। ड्यासबोर्डमा, सक्षम पार्दै** गद्य गद्य** आउटपुट शैलीले उही ब्लक इन्जेक्ट गर्दछ (तल आउटपुट शैलीहरू हेर्नुहोस्)।

### आउटपुट शैलीहरू (सूची)

गुफामान आउटपुट मोड माथि छ** लिगेसी एकल-शैली मार्ग** । चरण 4 ले यसलाई कम्पोजेबल आउटपुट शैलीहरूको सूचीमा सामान्यीकृत गर्‍यो: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`। प्रत्येक शैली एक प्रणाली-प्रम्प्ट निर्देशन हो जसले सस्तो आउटपुटको लागि मोडेललाई सोध्छ; शैलीहरू सँगै सक्षम गर्न सकिन्छ र क्याटलग क्रममा इन्जेक्सन गरिन्छ।

| शैली                              | `id`            | यसले के गर्छ                                                                                                                                                                                                                                           | निर्देशन भाषाहरू                              |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| गद्य गद्य                         | `terse-prose`   | filler/articles/hedging छोड्नुहोस्; प्राविधिक पदार्थ सटीक राख्नुहोस्। लिगेसी केभम्यान आउटपुट मोडको रूपमा उही पाठ (सन्दर्भित, पुन: टाइप गरिएको छैन)।                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| कम कोड                            | `less-code`     | YAGNI भर्याङ: सबैभन्दा सानो काम परिवर्तन, कुनै अपरिहार्य abstractions।                                                                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| पोनीटेल (आलसी वरिष्ठ देव)         | `ponytail`      | "सबैभन्दा राम्रो कोड भनेको कहिल्यै नलेखिएको कोड हो": पुन: प्रयोग गर्नुहोस् > पुनर्लेखन, मूल कारण > लक्षण, छोटो काम गर्ने भिन्नता।                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| मसँग ADHD (कार्य-पहिलो)           | `i-have-adhd`   | कार्य पहिलो (गद्य अघिcommand/path/snippet ), संख्याबद्ध बाउन्ड स्टेप्स, ONE कंक्रीट अर्को चरण, [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) बाट कुनै preamble/recap/closers. अनुकूलित छैन।                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI फिल्टर                | `antislop-ui`   | प्रत्येक भिजुअल प्रविधिले उद्देश्य परीक्षण (पदानुक्रम, पहिचान, पठनीयता) पास गर्नुपर्छ; कुनै पूर्वनिर्धारित gradients/glass/glow, क्याप प्यालेट, कुनै टेम्प्लेट लेआउट छैन। दुबै एन्टिस्लप शैलीहरूले नो-डेड-नियन्त्रण / नो-फेब्रिकेटेड-दावी सीमा थप्छन्। | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| एन्टिस्लप प्रतिलिपि र मानव फिल्टर | `antislop-copy` | विशिष्ट प्रतिलिपि (नो em ड्यास, जेनेरिक CTAs, buzzwords, च्याटबट क्लोजरहरू, आविष्कार गरिएका तथ्यहरू) प्लस व्यक्ति नियमहरू: WCAG AA कन्ट्रास्ट, दृश्य फोकस, किबोर्ड पहुँच, empty/loading/error राज्यहरू, मोबाइल रिफ्लो।                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                  | `terse-cjk`     | `full`/`ultra` उत्तर शास्त्रीय चिनियाँ (文言); `lite` ले फंक्शन शब्दहरू, pleasantries वा सजावट बिना संक्षिप्त जवाफहरू मात्र सोध्छ।                                                                                                                     | zh (स्थानीय-गेट गरिएको, तल हेर्नुहोस्)        |

प्रत्येक शैलीले तीन तीव्रता स्तरहरू — `lite`, `full`, `ultra` — पठाउँछ र प्रत्येक स्तर साझा सीमा क्लज ( `outputMode.ts` मा`SHARED_BOUNDARIES` ) सँग समाप्त हुन्छ, जसले कोड ब्लकहरू, फाइल मार्गहरू, आदेशहरू, त्रुटिहरू र URLs सही राख्छ। `terse-prose` र `terse-cjk` स्तरका पाठहरूले त्यो सूचीमा पहिचानकर्ताहरू थप्छन्।

`terse-cjk` दुई ठाउँमा `zh` लाई लोकेल-गेट गरिएको छ। ड्यासबोर्ड UI भाषा चिनियाँ (`zh-CN` वा `zh-TW`), र `applyOutputStyles()` ले अनुरोधको समाधान गरिएको भाषा (तलको भाषा चयन हेर्नुहोस्) `zh` भएमा मात्र सङ्कुचन सेटिङ पृष्ठले यसको पङ्क्ति सूचीबद्ध गर्दछ। पङ्क्ति लुकाउनुले बचत गरिएको `terse-cjk` चयनलाई खाली गर्दैन: सेटिङहरू API कुनै पनि शैली आईडी स्वीकार गर्दछ, र पृष्ठमा अन्य शैलीहरू बचत गर्दा यसलाई राख्छ। अनुरोधको समयमा, `applyOutputStyles()` भाषा जाँच मात्र लोकेल गेट हो।

#### कसरी इंजेक्शन काम गर्दछ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ले क्याटलग विरुद्ध चयनलाई समाधान गर्छ (अज्ञात ids र लोकेल-बेमेल शैलीहरू छाडिन्छ, कहिल्यै त्रुटि हुँदैन; कुनै शैलीमा समाधान गर्ने चयनले शरीरलाई अपरिवर्तित छोड्छ, `no_styles` को रूपमा छोडियो), चयन गरिएका निर्देशनहरूलाई क्याटलग क्रममा जोड्छ, सीमाहरू जोड्छ।** एक पटक** (प्लस सेफ्टी क्लज, `SAFETY_BOUNDARIES` वा यसको अनुवाद, जब `less-code` वा `ponytail` चयन गरिन्छ), र एकल idempotency मार्कर (`[OmniRoute Output Styles]`) को साथ ब्लक सुरु हुन्छ, त्यसैले पुन: आवेदन गर्नु नो-अप हो। जब समाधान गरिएको भाषा (तलको भाषा चयन हेर्नुहोस्) को अनुवाद हुन्छ, अंग्रेजीको सट्टा स्थानीयकृत निर्देशन इन्जेक्ट गरिन्छ।

गैर-खाली `messages` एरे भएको शरीरमा, idempotency जाँच सामग्री बाइपास अघि चल्छ: जब `[OmniRoute Output Styles]` मार्कर पहिले नै शीर्ष-स्तर `system` फिल्डमा छ (एक स्ट्रिङ वा सामग्री-ब्लक एरे) वा स्ट्रिङ सामग्रीको साथ प्रणाली सन्देशमा, शरीरलाई `already_applied` को रूपमा अपरिवर्तित छोडिन्छ र कुनै कुञ्जी शब्द जाँच चल्दैन। अन्यथा सामग्री बाइपास (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) ले अन्तिम तीन सन्देशहरूको पाठ जाँच गर्दछ, तिनीहरूको भूमिका जस्तोसुकै भए पनि, र सम्पूर्ण पालोको लागि शैलीहरू छोड्छ जब त्यो पाठले यसको सुरक्षा, अपरिवर्तनीय-कार्य वा स्पष्टीकरण कुञ्जी शब्दहरू, वा अर्डर-संवेदनशील अनुक्रम: `first`, `then`, `after that`, `rollback` `before` पालना गर्नुहोस्। `delete`, `drop`, `migrate`, `deploy` वा `backup` द्वारा `release` वर्णहरू भित्र। बाइपास चलिरहेको बेला** स्वत: स्पष्टता बाइपास** टगल (`cavemanOutputMode.autoClarity`, पूर्वनिर्धारित रूपमा) सक्रिय छ; टगल बन्द गर्नाले कुञ्जी शब्द जाँच छोड्छ।

जब बाइपासले घुम्न दिन्छ, `placeSystemInstruction()` (एउटै फाइल), जसले कहिल्यै नयाँ `messages[0]` सिर्जना गर्दैन, ब्लकलाई यी मध्ये पहिलोमा राख्छ:

1. स्ट्रिङ सामग्रीको साथ एक अग्रणी प्रणाली सन्देश: ब्लक यसको पाठ पछि जोडिएको छ।
2. शीर्ष-स्तर `system` फिल्ड: ब्लक स्ट्रिङको पाठ पछि जोडिएको छ, वा सामग्री-ब्लक एरेमा नयाँ पाठ ब्लकको रूपमा थपिएको छ।
3. स्ट्रिङ सामग्रीको साथ पहिलो पछिको प्रणाली सन्देश: ब्लक यसको पाठ पछि जोडिएको छ।
4. माथिको कुनै पनि छैन: ब्लक `messages` को अन्त्यमा नयाँ प्रणाली सन्देशमा जान्छ।

`messages` एरे बिनाको शरीरमा (वा खाली एक संग), कुनै पनि सामग्री बाइपास चल्दैन र एक शीर्ष-स्तर `system` क्षेत्र परामर्श गरिदैन। स्ट्रिङ `instructions` फिल्डको पाठ पछि ब्लक जोडिएको छ, जबसम्म त्यो फिल्डले `[OmniRoute Output Styles]` मार्कर समावेश गर्दैन, जुन अवस्थामा शरीरलाई `already_applied` को रूपमा अपरिवर्तित छोडिन्छ। जब शरीरमा कुनै स्ट्रिङ `instructions` फिल्ड छैन तर `input` (स्ट्रिङ वा एरे) बोक्छ, ब्लक `instructions` हुन्छ, कुनै पनि गैर-स्ट्रिङ मानलाई प्रतिस्थापन गर्दछ जुन फिल्ड हो। स्ट्रिङ `instructions` फिल्ड वा स्ट्रिङ वा एरे `input` नभएको बडीलाई अपरिवर्तित छोडिन्छ र `no_messages` को रूपमा छोडिन्छ।

#### कसरी सक्षम गर्ने

ड्यासबोर्डमा:** कम्प्रेसन सन्दर्भ → कम्प्रेसन सेटिङहरू** (`/dashboard/context/settings`), आउटपुट शैली खण्ड: on/off टगल र स्तर चयनकर्ताको साथ प्रति शैली एक पङ्क्ति। कम्प्रेसन आफैं सक्रिय हुँदा शैलीहरू इन्जेक्ट गर्दछ (पृष्ठको मास्टर टगल, `enabled`)। द** स्वत: स्पष्टता बाइपास** टगल मा छ** गुफावाला** पृष्ठ (`/dashboard/context/caveman`), यसको मा** आउटपुट मोड** कार्ड। प्रोग्रामेटिक रूपमा, कम्प्रेसन कन्फिगरेसनले चयनलाई यसरी रहन्छ:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

ब्याक-कम्प्याट: `outputStyles` खाली हुँदा, लेगेसी `cavemanOutputMode.enabled` सेटिङ नक्शा `cavemanOutputMode.intensity` मा `terse-prose` मा। त्यसपछि ब्लक `[OmniRoute Output Styles]` मार्करबाट सुरु हुन्छ, जहाँ लिगेसी `applyCavemanOutputMode()` इन्जेक्टरले `[OmniRoute Caveman Output Mode]` लेख्यो। मार्करको तल, पाठ en, pt-BR, es, de, fr, it, ru, id र vi मा लिगेसी इंजेक्शनसँग मेल खान्छ; ja र zh मा यसले सीमा खण्डको अगाडि एउटा अतिरिक्त ठाउँ बोक्छ। `terse-prose` ले pt-BR, es, de, fr, it, ru, zh, ja, id र vi मा अनुवाद गर्दछ, त्यसैले एक अनुरोध जसको समाधान गरिएको भाषा `hu` हो अंग्रेजी पाठ प्राप्त हुन्छ जहाँ विरासत इन्जेक्टरले यसको हंगेरी प्रयोग गरेको थियो।

आउटपुट-शैली भाषा चयन (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): `languageConfig.enabled` अन संग, `autoDetect` अनुरोधको `messages` एरेमा पाठ (स्ट्रिङ सामग्री, वा यसको सामग्री भागहरूको `text` ) रहेको नवीनतम प्रयोगकर्ता सन्देश नमूना गर्दछ र यसमा Caveman इन्जिनको डिटेक्टर (`detectCompressionLanguage()`) चलाउँछ। डिटेक्टरले हान क्यारेक्टरहरू र काना नभएको पाठको लागि `zh` फर्काउँछ; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` पाठ। A Responses API बडीले आफ्नो पालो `input` मा राख्छ, जुन नमूना गरिएको छैन, त्यसैले यो `defaultLanguage` हुन्छ, त्यसपछि अंग्रेजी। जब `messages` मा कुनै प्रयोगकर्ता सन्देश पाठ छैन, वा `autoDetect` बन्द छ, `defaultLanguage` लागू हुन्छ, त्यसपछि अंग्रेजी। `languageConfig.enabled` बन्द हुँदा, भाषा अङ्ग्रेजी — हो जबसम्म कुनै कम्प्रेसन कम्बो अनुरोधमा लागू हुँदैन (अनुरोधको राउटिङ कम्बोमा तोकिएको कम्बो, वा पूर्वनिर्धारित कम्प्रेसन कम्बो chatCore बिल्ट-इन स्ट्याक गरिएको पाइपलाइनको लागि फिर्ता हुन्छ): कम्बो लागू गर्दा त्यो अनुरोधको लागि `languageConfig.enabled` सक्रिय हुन्छ र यसले coqbg भाषाबाट `defaultLanguage` मूल्य सेट गर्छ भने। कम्बोको प्याकहरू मध्ये एक हो, अन्यथा कम्बोको पहिलो प्याक, जुन `en` मा पूर्वनिर्धारित हुन्छ ), जबकि बचत गरिएको `autoDetect` (पूर्वनिर्धारित रूपमा) अझै पनि लागू हुन्छ। केभम्यान इनपुट इन्जिनले यसको नियम-प्याक भाषा फरक रूपमा — प्रति पाठ भाग छान्छ र, `enabledPacks` मा गेट गरिएको स्वत: पत्ता लगाउँदछ।

शैली × भाषा म्याट्रिक्स `tests/unit/compression/output-styles-i18n-matrix.test.ts` द्वारा पिन गरिएको छ: प्रत्येक क्याटलग शैलीलाई परीक्षणको `BASELINE_LANGUAGES` मा प्रविष्टि चाहिन्छ; लोकेल-गेट नभएको शैलीले pt-BR अनुवाद पठाउनु पर्छ (लोकेल-गेट गरिएको `terse-cjk` यस नियमबाट छुट छ) जबसम्म यो `KNOWN_ENGLISH_ONLY` मा सूचीबद्ध गरिएको छैन, जसमा कुनै पनि अनुवाद नभएको — एक सूचीबद्ध शैली हो जुन परीक्षणमा असफल हुन्छ; र शैलीले परीक्षणमा असफल हुन्छ जब यसले यसको `BASELINE_LANGUAGES` प्रविष्टि सूचीमा रहेको भाषा गुमाउँछ। शैली थप्न, [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) हेर्नुहोस्।

### उपकरण परिणाम सङ्कुचन

`open-sse/services/compression/toolResultCompressor.ts` मा`compressToolResult()` उपकरण-परिणाम पाठसँग कम्प्रेस गर्दछ** 5 रणनीतिहरू** । यसले तिनीहरूलाई यस क्रममा प्रयास गर्दछ, र पहिलो सक्षम गरिएको रणनीति जसको सामग्रीसँग मेल खान्छ नतिजा निर्णय गर्दछ:

1. **`fileContent`** : 3 वा बढी रेखाहरूको सामग्री जसमा कम्तिमा एक लाइन, अग्रगामी इन्डेन्टेसनलाई बेवास्ता गर्दै, `import `, `export `, `function `, `class `, `const `, `let `, `var ` वा `return ` (कुञ्जी शब्द थप स्पेस) बाट सुरु हुन्छ, वा `if`, `for` वा यसको `(` वा `while` गर्नुहोस् ` (` पहिलो 20 र अन्तिम 5 रेखाहरू, एलिडेड बीचमा चिन्ह लगाइएको।
2. **`grepSearch`** : `<path>:<digits>:` फारमको कम्तिमा एक लाइन भएको सामग्री, जहाँ पहिलो कोलोन अघिको पाठमा कुनै ह्वाइटस्पेस छैन, ती रेखाहरू मात्र राख्छ, बढीमा 30, त्यसपछि कुनै पनि थप मिल्दोहरूको गणना र मिल्दो फाइलहरूको सूची; प्रत्येक अन्य लाइन छोडिएको छ। यस्तो एउटा लाइन रणनीति ट्रिगर गर्न पर्याप्त छ, त्यसैले `12:30:45` जस्ता टाइमस्ट्याम्पबाट सुरु हुने लग लाइन पनि गणना हुन्छ।
3. **`shellOutput`** : ANSI CSI अनुक्रम समावेश गर्ने आउटपुट (`ESC[` त्यसपछि अंकहरू वा अर्धविराम त्यसपछि अक्षर, रङ कोडहरूमा जस्तै) वा पाठमा जहाँसुकै ह्वाइटस्पेस पछिको `$` ती अनुक्रमहरू गुमाउँछ (अन्य एस्केपहरू, जस्तै `ESC[?25l` वा OSC विन्डो-टाइटल किप ० क्रम, अन्तिममा दोहोर्याइन्छ)। लाइनहरु ध्वस्त भयो। किनभने यो जाँच `json` र `errorMessage` अघि चल्छ, JSON वा त्रुटि आउटपुट जसमा यस्तो `$` समावेश हुन्छ `shellOutput` अन हुँदा तिनीहरूमा कहिल्यै पुग्दैन।
4. **`json`** : एक JSON पेलोड 2,000 क्यारेक्टरहरू जुन `{` वा `[` (वैकल्पिक ह्वाइटस्पेस पछि) बाट सुरु हुन्छ र पार्सहरू संक्षेपमा गरिन्छ: 7 भन्दा बढी वस्तुहरूको एर्रेले यसको पहिलो 5 र अन्तिम 2 वस्तुहरू र यसको कुल गणना राख्छ, र वस्तुले आफ्नो पहिलो 20 कुञ्जीहरू राख्छ, प्रत्येक नेस्टेड वस्तु वा array को लागि `{…N keys}` स्थान (एरे) द्वारा प्रतिस्थापन गर्दछ। लम्बाइ) र एक `_remaining_<N>_keys` मार्कर कुञ्जीहरू गणना गर्दै पहिलो 20 पछि खस्यो। स्केलर मानहरू पूर्ण रूपमा प्रतिलिपि हुन्छन्, त्यसैले कुनै नेस्टेड मानहरू बिना 20 कुञ्जी वा थोरैको वस्तुलाई पुन: इन्डेन्ट गरिएको — मात्र हुन्छ, एक मिनिफाइडले क्यारेक्टरहरू प्राप्त गर्छ र अपरिवर्तित रहन्छ।
5. **`errorMessage`** : जहाँ पनि र कुनै पनि अक्षरको अवस्थामा, `error:`, `error ` (स्पेस पछिको शब्द, `no error found` मा जस्तै), `[error]`, `exception:`, `exception `, `[exception]` वा `traceback` ले आफ्नो पहिलो लाइन, अर्को १० लाइन र अन्तिम ३, बीचमा `… [N frames elided] …` मार्कर राख्छ। मार्कर तब मात्र देखिन्छ जब 13 भन्दा बढी रेखाहरूले पहिलो रेखालाई पछ्याउँछन्, त्यसैले 14 रेखा वा कमको त्रुटि आउटपुट छोटो हुँदैन (12 वा 13 रेखाहरूमा अन्तिम 3 दोहोर्याइएको रेखाहरू पहिले नै राखिएको छ)।

एक रणनीति मेल खाए पछि, कुनै पनि बचत नगर्ने एक पनि, पछिको रणनीतिहरू प्रयास गरिँदैन। जब मिल्दो रणनीतिले कुनै अनुमानित टोकनहरू बचत गर्दैन (लम्बाइ ÷ 4, राउन्ड अप) — उदाहरणका लागि 25 लाइन वा कमको कोड-जस्तै फाइल, वा 7 वस्तुहरू वा कम — भएको 2,000 क्यारेक्टरहरू JSON एरेमा आक्रामक इन्जिनले मूल उपकरणको नतिजा राख्छ:`compressAggressive()` र `compressAnthropicToolResultBlock()` `saved` दुवै मौलिक हुन्छन्। वा तल, जबकि `compressToolResult()` ले अझै पनि त्यो रणनीतिको आउटपुट फर्काउँछ। उपकरण-परिणाम चरण अन्तिम शब्द होइन: इन्जिनको फलब्याक सारांशले अझै पनि 8,192 वर्णहरू (`maxTokensPerMessage`, 2,048, गुणा 4) भन्दा लामो `tool` वा `function` सन्देश छोटो गर्न सक्छ।

#### कहिले प्रयोग गर्ने

उपकरण परिणाम कम्प्रेसन आक्रामक इन्जिनको चरण 1 हो (`compressAggressive()` मा `open-sse/services/compression/aggressive.ts`), त्यसैले यो आक्रामक मोडमा र स्ट्याक्ड पाइपलाइनको `aggressive` चरणमा चल्छ। यसले OpenAI- आकार `tool` र `function` सन्देशहरू र Anthropic `tool_result` ब्लकहरू भित्रको पाठलाई कम्प्रेस गर्दछ। प्रत्येक रणनीतिको `aggressive.toolStrategies` अन्तर्गत आफ्नै स्विच हुन्छ, सबै पूर्वनिर्धारित रूपमा सक्रिय हुन्छन्। ड्यासबोर्डमा, स्विचहरू केभम्यान पृष्ठमा छन्** उन्नत** कम्प्रेसन सक्रिय हुँदा हेर्नुहोस् र पूर्वनिर्धारित मोड आक्रामक छ।

### स्ट्याक्ड पाइपलाइन

स्ट्याक्ड मोड चल्छ** अनुक्रम मा धेरै इन्जिन** — सामान्यतया RTK पहिले (उपकरण आउटपुटमा 60-90% बचत), त्यसपछि बाँकी पाठमा Caveman (~ 46% इनपुट बचत)। रचना, त्यो हो** 78-95% योग्य दायरा** (माथिको अपस्ट्रीम बचत गणित हेर्नुहोस्): `1 - (1 - 0.60..0.90) × (1 - 0.46)` औसत ≈ 89%।

#### यसले कसरी काम गर्छ

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### कहिले प्रयोग गर्ने

यसका लागि स्ट्याक्ड मोड प्रयोग गर्नुहोस्:

- उपकरण-भारी कार्यप्रवाह (एजेन्टिक कोडिङ, अनुसन्धान)
- लागत-संवेदनशील ब्याच प्रशोधन
- जब तपाईलाई अधिकतम टोकन बचत चाहिन्छ

स्ट्याक्ड पाइपलाइनहरू ग्लोबल `stackedPipeline` कम्प्रेसन सेटिङ मार्फत कन्फिगर गरिएका छन्, वा नामित कम्प्रेसन कम्बो मार्फत राउटिङ कम्बोमा तोकिएको छ (माथि प्रति-कम्बो ओभरराइड हेर्नुहोस्) — स्वत-कम्बो `modePack` मार्फत होइन (त्यो फिल्डले मात्र स्वत: कम्बो मोडेल चयनलाई पुन: वजन गर्छ, र `stacked` मान्य pack नाम होइन)।

---

## कम्प्रेसन कम्बो ओभरराइडहरू

फरक प्रयोग अवस्थाहरूका लागि व्यवहारलाई सूक्ष्म रूपमा समायोजन गर्न तपाईंले विश्वव्यापी कम्प्रेसन मोडलाई **प्रत्येक कम्बोअनुसार** ओभरराइड गर्न सक्नुहुन्छ:

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

यो निम्नका लागि उपयोगी छ:

- **कोडिङ कम्बोहरू**: लामा सत्रहरूका लागि `aggressive` मोड प्रयोग गर्नुहोस्
- **द्रुत प्रश्नोत्तर कम्बोहरू**: छिटो प्रतिक्रियाहरूका लागि `lite` मोड प्रयोग गर्नुहोस्
- **धेरै उपकरण प्रयोग हुने कम्बोहरू**: अधिकतम बचतका लागि `stacked` मोड प्रयोग गर्नुहोस्
- **उत्पादन कम्बोहरू**: क्यासिङ प्रदायकहरूका लागि ओभरराइड बन्द राख्नुहोस् — सधैँ सक्रिय रहने
  क्यास-सचेत समायोजनले `aggressive`/`ultra` लाई स्वतः `standard` मा डाउनग्रेड गर्छ
  (छनोट गर्न मिल्ने `cache-aware` मोड छैन)

---

## यो पनि हेर्नुहोस्

- [वातावरण कन्फिगरेसन](../reference/ENVIRONMENT.md) — कम्प्रेसन वातावरण चरहरू
- [आर्किटेक्चर मार्गदर्शिका](../architecture/ARCHITECTURE.md) — कम्प्रेसन पाइपलाइनका आन्तरिक पक्षहरू
- [प्रयोगकर्ता मार्गदर्शिका](../guides/USER_GUIDE.md) — कम्प्रेसन प्रयोग गर्न सुरु गर्ने तरिका
- [RTK कम्प्रेसन](./RTK_COMPRESSION.md) — RTK फिल्टरहरू, विश्वास मोडेल, प्रमाणीकरण गेट, कच्चा आउटपुट पुनःप्राप्ति
- [कम्प्रेसन इन्जिनहरू](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, ड्यासबोर्ड
- [कम्प्रेसन नियमहरूको ढाँचा](./COMPRESSION_RULES_FORMAT.md) — JSON नियम-प्याक ढाँचा
- [कम्प्रेसन भाषा प्याकहरू](./COMPRESSION_LANGUAGE_PACKS.md) — भाषाविशेष Caveman नियमहरू
