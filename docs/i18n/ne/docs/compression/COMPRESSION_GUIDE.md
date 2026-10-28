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

### अफ

कुनै कम्प्रेसन लागू गरिएको छैन। सबै सन्देशहरू अपरिवर्तित रूपमै पास हुन्छन्।

### लाइट मोड (~15% बचत, <1ms लेटेन्सी)

सबैभन्दा सुरक्षित मोड — शून्य सिम्यान्टिक परिवर्तन, केवल फर्म्याटिङ सफाइ:

| प्रविधि                  | विवरण                                             |
| ------------------------ | ------------------------------------------------- |
| `collapseWhitespace`     | क्रमागत खाली लाइनहरू र ट्रेलिङ स्पेसहरू मर्ज गर्छ |
| `dedupSystemPrompt`      | नक्कली सिस्टम सन्देशहरू हटाउँछ                    |
| `compressToolResults`    | वर्बोज टूल/फंक्सन आउटपुटहरू कम्प्रेस गर्छ         |
| `removeRedundantContent` | दोहोरिएका निर्देशनहरू हटाउँछ                      |
| `replaceImageUrls`       | base64 इमेज डेटा URI हरू छोट्याउँछ                |

**उपयुक्त:** सधैं-चालू प्रयोग, सुरक्षा-महत्त्वपूर्ण कार्यप्रवाहहरू।

### स्ट्यान्डर्ड मोड (~30% बचत)

[Caveman](https://github.com/JuliusBrussee/caveman) बाट प्रेरित — अर्थ कायम राख्दै फिलर शब्दहरू र वर्बोज वाक्यांशहरू हटाउँछ:

- फिलर शब्दहरू हटाउँछ ("please", "I think", "basically", "actually")
- वर्बोज वाक्यांशहरू संक्षिप्त गर्छ ("in order to" → "to", "as a result of" → "because")
- विनम्र आलटाल वाक्यांशहरू हटाउँछ ("Would you mind...", "If you could possibly...")
- कोडिङ प्रम्प्टहरूका लागि ट्युन गरिएका 30+ regex नियमहरू

**उपयुक्त:** दैनिक कोडिङ कार्यप्रवाहहरू, लागतप्रति सचेत टोलीहरू।

### एग्रेसिभ मोड (~50% बचत)

लामो सत्रहरूका लागि स्मार्ट इतिहास व्यवस्थापन:

- **सन्देश एजिङ** — पुराना सन्देशहरू क्रमशः बढ्दो रूपमा कम्प्रेस हुँदै जान्छन्
- **टूल नतिजा कम्प्रेसन** — लामो टूल आउटपुटहरू छोट्याइन्छ वा हटाइन्छ (पहिलो/अन्तिम लाइनहरू,
  म्याच-लाइन फिल्टरिङ, JSON key कम्प्याक्सन)
- **संरचनात्मक अखण्डता गार्डहरू** — `tool_use` + `tool_result` जोडीहरू सुसंगत रहने सुनिश्चित गर्छ
- **कन्टेक्स्ट विन्डो जागरूकता** — प्रति-मोडेल टोकन सीमाहरूको पालना गर्छ

**उपयुक्त:** विस्तारित डिबगिङ सत्रहरू, ठूला कोडबेसहरू।

### अल्ट्रा मोड (~75% बचत)

टोकन-महत्त्वपूर्ण परिदृश्यहरूका लागि अधिकतम कम्प्रेसन:

- **ह्युरिस्टिक प्रुनिङ** — गद्यको स्कोर-आधारित टोकन प्रुनिङ
- **संरचना संरक्षण** — fenced कोड ब्लकहरू, इनलाइन कोड, URL हरू र पहिचानकर्ताहरू
  tombstone गरेर हुबहु पुनः जोडिन्छन्; तिनीहरू कहिल्यै प्रुन हुँदैनन्
- **वैकल्पिक SLM तह** — कन्फिगर गरिएको अवस्थामा सानो स्थानीय मोडेलले प्रुनलाई परिष्कृत गर्न सक्छ
- एग्रेसिभ मोडबाट स्वतन्त्र: यसले सन्देश एजिङ, टूल-नतिजा कम्प्रेसन वा फलब्याक सारांशकर्ता
  चलाउँदैन (केवल SLM-तहको असफलताले मात्र फलब्याक पासलाई एग्रेसिभ मार्फत रूट गर्न सक्छ)

**उपयुक्त:** जब तपाईं बारम्बार कन्टेक्स्ट सीमाहरू नाघिरहनुहुन्छ।

### RTK मोड (60-90% अपस्ट्रिम दायरा)

RTK मोड कोडिङ-एजेन्ट सत्रहरूमा देखिने वर्बोज टूल आउटपुटहरूका लागि अप्टिमाइज गरिएको छ:

- `git status`, `git diff`, `git log`, टेस्ट रनरहरू, TypeScript/Vite/Webpack बिल्डहरू,
  ESLint/Biome/Prettier, npm audit/इन्स्टलहरू, Docker लगहरू, इन्फ्रा आउटपुट, र सामान्य
  शेल आउटपुट जस्ता कमान्ड/आउटपुट क्लासहरू पत्ता लगाउँछ
- `open-sse/services/compression/engines/rtk/filters/` बाट JSON फिल्टर प्याकहरू लागू गर्छ
- प्रोजेक्ट वा ग्लोबल `filters.toml` फाइलहरूबाट RTK TOML schema v1 फिल्टरहरू इम्पोर्ट गर्छ,
  इनलाइन-टेस्ट भ्यालिडेसन र प्रोजेक्ट फाइलहरूका लागि ट्रस्ट-गेटिङसहित
- इनलाइन verify नमूनाहरूसहित 56 वटा बिल्ट-इन फिल्टरहरू उपलब्ध गराउँछ
- ANSI कन्ट्रोल सिक्वेन्सहरू, प्रोग्रेस बारहरू, दोहोरिएका लाइनहरू, र कार्यविधिगत रूपमा
  उपयोगी नभएको नोइज हटाउँछ
- फेलियरहरू, एररहरू, चेतावनीहरू, परिवर्तित फाइलहरू, सारांशहरू, र लामो आउटपुटको
  अन्तिम भाग (tail) कायम राख्छ
- ट्रस्ट-गेट गरिएका प्रोजेक्ट फिल्टरहरू, ग्लोबल फिल्टरहरू, र वैकल्पिक redacted
  कच्चा-आउटपुट (raw-output) रिकभरीलाई समर्थन गर्छ

**उपयुक्त:** शेल, बिल्ड, टेस्ट, git, grep, र फाइल-आउटपुट ट्रान्सक्रिप्टहरू भएका एजेन्ट सत्रहरू।

### स्ट्याक्ड मोड (78-95% योग्य दायरा)

स्ट्याक्ड मोडले निर्धारित (deterministic) क्रममा धेरै कम्प्रेसन इन्जिनहरू चलाउँछ। डिफल्ट पाइपलाइन यस्तो छ:

```txt
RTK -> Caveman
```

त्यस क्रमले पहिले टर्मिनल/टूल आउटपुटलाई कम्प्याक्ट बनाउँछ, त्यसपछि बाँकी प्राकृतिक-भाषा
प्रम्प्टमा Caveman सिम्यान्टिक संक्षेपण लागू गर्छ। स्ट्याक्ड पाइपलाइनहरू ग्लोबल रूपमा वा
रूटिङ कम्बोहरूमा तोकिएका कम्प्रेसन कम्बोहरूमार्फत कन्फिगर गर्न सकिन्छ।

**उपयुक्त:** ठूला टूल लगहरूसँगै मानव निर्देशनहरू वा असिस्टेन्ट सारांशहरू मिसिएको कन्टेक्स्ट।

---

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

- **Caveman** — मोड छनोट, भाषा प्याकहरू, पूर्वावलोकन र विश्वव्यापी पूर्वनिर्धारितहरू
- **RTK** — कमाण्ड-फिल्टर पूर्वावलोकन, RTK सुरक्षा सेटिङहरू र फिल्टर सूची
- **Compression Combos** — राउटिङ कम्बोहरूमा तोकिएका नामयुक्त इन्जिन पाइपलाइनहरू
- **Auto-Trigger Threshold** — टोकन सङ्ख्याले थ्रेसहोल्ड नाघ्दा कम्प्रेसन स्वतः सक्रिय गर्ने

### प्रत्येक कम्बोको ओभरराइड

`Dashboard → Context & Cache → Compression Combos` मा, राउटिङ कम्बोलाई एउटा कम्प्रेसन कम्बो तोक्नुहोस्:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

यसले सशुल्क सदस्यताहरूमा लाइट मोड कायम राख्दै निःशुल्क/कोडिङ प्रदायकहरूमा स्ट्याक गरिएको कम्प्रेसन प्रयोग गर्न दिन्छ।

यो "Per-Combo Override" असाइनमेन्ट **routing-combo compression mode** ओभरराइड (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — फिल्डको स्किमाले `rtk`, `stacked` र `omniglyph` पनि स्वीकार गर्छ) भन्दा फरक नियन्त्रण हो — त्यस ओभरराइडले नामयुक्त compression-combo पाइपलाइन चयन गर्दैन; यसले केवल `resolveCompressionPlan` द्वारा प्रयोग गरिने `compressionMode` फिल्ड सेट गर्छ। यसलाई कम्बो कार्ड (`Dashboard → Combos`) मा वा #6760 देखि, माथि दस्तावेजीकरण गरिएको पाइपलाइन-असाइनमेन्ट चेकबक्सको ठीक छेउमा रहेको `Dashboard → Context & Cache → Compression Combos` को "Assign to routing" सूचीमा प्रत्येक राउटिङ कम्बोका लागि सेट गर्न सकिन्छ। दुवै सतहका सेटिङहरू एउटै `PUT /api/combos/{id}` एन्डपोइन्टमार्फत स्थायी रूपमा सुरक्षित हुन्छन्।

### प्रत्येक अनुरोधको ओभरराइड

एउटा अनुरोधका लागि कम्प्रेसन योजना ओभरराइड गर्न `x-omniroute-compression` अनुरोध हेडर पठाउनुहोस्। यसको प्राथमिकता सबैभन्दा उच्च हुन्छ — यसले राउटिङ-कम्बो ओभरराइड, सक्रिय प्रोफाइल, स्वतः-ट्रिगर र प्यानलको Default लाई उछिन्छ। अज्ञात मानहरू बेवास्ता गरिन्छन् (अनुरोध कहिल्यै अस्वीकार गरिँदैन) र विश्वव्यापी मुख्य स्विचले अझै पनि सबै कुरा नियन्त्रण गर्छ: कम्प्रेसन विश्वव्यापी रूपमा बन्द हुँदा, हेडरले यसलाई सक्रिय गर्न सक्दैन। मानहरू:

| मान           | प्रभाव                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `off`         | यस अनुरोधका लागि कम्प्रेसन हुँदैन।                                                                           |
| `default`     | प्यानलबाट व्युत्पन्न Default प्रोफाइल (सक्रिय प्रोफाइललाई बेवास्ता गर्छ)। क्षतियुक्त इन्जिनहरू बन्द रहन्छन्। |
| `safe`        | हेडर नपठाएसरह: डिडुप र ह्वाइटस्पेस फोल्डिङ मात्र।                                                            |
| `allow-lossy` | सारांश, सान्दर्भिकता फिल्टर र शैली पुनर्लेखनसहित यस अनुरोधको अपरेटर योजना कायम राख्छ।                        |
| `engine:<id>` | सक्षम हुँदा एउटा मात्र इन्जिन, जस्तै `engine:rtk`। यो त्यस इन्जिनका लागि प्रत्येक अनुरोधको अप्ट-इन हो।       |
| `<combo>`     | नामद्वारा (केस-असंवेदनशील रूपमा) पहिले र त्यसपछि id द्वारा मिलाइने नामयुक्त कम्बो।                           |

`allow-lossy`, `engine:<id>`, वा नामयुक्त कम्बोबिना क्षतियुक्त इन्जिनहरू लागू हुँदैनन्। कम्प्रेसन सक्रिय हुँदा अनुरोधमा अझै पनि सेसन डिडुप र ह्वाइटस्पेस फोल्डिङ लागू हुन्छ।

लागू गरिएको योजना `X-OmniRoute-Compression: <mode>; source=<source>` प्रतिक्रिया हेडरमा फिर्ता पठाइन्छ, जहाँ `<source>` भनेको `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, वा `off` मध्ये एक हो।

### API

```bash
# कम्प्रेसन सेटिङहरू प्राप्त गर्नुहोस्
curl http://localhost:20128/api/settings/compression

# कम्प्रेसन सेटिङहरू अद्यावधिक गर्नुहोस्
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# कुनै विशिष्ट RTK/stacked पेलोडको पूर्वावलोकन गर्नुहोस्
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK फिल्टर प्याकहरूको सूची प्राप्त गर्नुहोस्
curl http://localhost:20128/api/context/rtk/filters

# वैकल्पिक कमाण्ड मेटाडेटासहित RTK लाई प्रत्यक्ष परीक्षण गर्नुहोस्
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

माथि वर्णन गरिएका 7 मोडहरूभन्दा बाहिर (स्रोतले `codex-responses` र
`omniglyph` मोडहरू पनि स्वीकार गर्छ, जसलाई यो गाइडले समेट्दैन), तलका खण्डहरूले ती
मोडहरूभित्र वा तिनसँगै काम गर्ने सुविधाहरू समेट्छन्: उपकरण परिणाम कम्प्रेसन र प्रगतिशील एजिङ
आक्रामक इन्जिनका चरण 1 र 2 हुन् (आक्रामक मोड र स्ट्याक गरिएको पाइपलाइनको `aggressive`
चरण), स्ट्याक गरिएको पाइपलाइन भनेको स्ट्याक गरिएको मोड सञ्चालन हुने तरिका हो, क्यास-अवेयर कम्प्रेसनले
कम्प्रेसन चालु हुँदा क्यासिङ प्रदायकहरूका लागि `aggressive` र `ultra` लाई `standard` मा
घटाउँछ, र केभम्यान आउटपुट मोड तथा आउटपुट शैलीहरू पूर्वनिर्धारित रूपमा बन्द रहने, अनुरोध कम्प्रेस
गर्नुको सट्टा मोडेलको आउटपुटलाई आकार दिने वैकल्पिक सिस्टम-प्रम्प्ट निर्देशनहरू हुन्।

### क्यास-अवेयर कम्प्रेसन

केही प्रदायकहरूले (जस्तै प्रम्प्ट क्यासिङसहितको Anthropic) **प्रम्प्ट क्यासिङ**
समर्थन गर्छन्, जसले लागत र विलम्बता घटाउन प्रम्प्टका केही भाग क्यास गर्न दिन्छ। जब
क्यासिङ सक्षम हुन्छ, आक्रामक कम्प्रेसनले वास्तवमा कार्यसम्पादनलाई **हानि** पुर्याउन सक्छ,
किनभने यसले क्यास गरिएका टोकनहरू परिवर्तन गरी क्यासलाई अमान्य बनाउँछ।

`cachingAware.ts` मोड्युलले **क्यासिङ सन्दर्भ पहिचान** गरेर र
त्यसअनुसार **कम्प्रेसन रणनीति समायोजन** गरेर यो समस्या समाधान गर्छ।

#### यसले कसरी काम गर्छ

1. **क्यासिङ सन्दर्भ पहिचान गर्ने** — अनुरोध बडीमा `cache_control` मार्करहरू खोज्छ
2. **क्यासिङ प्रदायकहरू पहिचान गर्ने** — लक्षित प्रदायकले क्यासिङ समर्थन गर्छ कि गर्दैन जाँच्छ
3. **रणनीति समायोजन गर्ने** — क्यासिङ प्रदायकहरूका लागि `aggressive`/`ultra` लाई `standard` मा घटाउँछ
4. **सिस्टम प्रम्प्ट छोड्ने** — सिस्टम प्रम्प्टहरू सामान्यतया क्यास गरिन्छन्, त्यसैले तिनलाई कम्प्रेस गर्दैन

रणनीति हेल्परले `deterministicOnly` फ्ल्याग पनि फर्काउँछ, तर योजना निर्माताले
रणनीति मात्र प्रयोग गर्छ — हाल डाउनस्ट्रिममा कुनै पनि चीजले उक्त फ्ल्याग पढ्दैन।

#### कोड उदाहरण

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← क्यास मार्कर
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### कहिले प्रयोग गर्ने

क्यास-अवेयर कम्प्रेसन **सधैँ चालु हुन्छ** — कुनै कन्फिगरेसन आवश्यक पर्दैन। कम्प्रेसन
चालु हुँदा र लक्षित प्रदायकले प्रम्प्ट क्यासिङ (Anthropic, OpenAI,
आदि) समर्थन गर्दा यो सक्रिय हुन्छ; स्पष्ट `cache_control` मार्करहरू आवश्यक पर्दैनन् — क्यासिङ प्रदायक
मात्रैले पनि रणनीति घटाउने कार्य ट्रिगर गर्छ, र मार्करहरूले मात्र कहिल्यै त्यसो गर्दैनन् (मार्कर पहिचानले क्यास
टेलिमेट्रीमा डेटा पठाउँछ, रणनीतिसम्बन्धी निर्णयमा होइन)।

### प्रगतिशील एजिङ

लामा कुराकानीहरूमा धेरै सन्देश टर्नहरू जम्मा हुन्छन्, तर पुराना टर्नहरू कम
सान्दर्भिक हुँदै जान्छन्। `progressiveAging.ts` मोड्युलले **टर्न दूरीअनुसार सन्देशहरूको विवरण घटाउँछ**
(दूरी कुराकानीको अन्त्यबाट मापन गरिन्छ)। वितरण गरिएका पूर्वनिर्धारित मानहरू
(`verbatim: 2, light: 2, moderate: 3`) अनुसार:

- **अन्तिम 2 टर्न (दूरी ≤ 2)**: जस्ताको तस्तै राखिन्छ
- **दूरी 3**: केभम्यान कम्प्रेसन (अनावश्यक शब्द हटाउने)
- **दूरी 4+**: सहायकका सन्देशहरू संक्षेप गरिन्छन्; प्रयोगकर्ताका सन्देशहरू तिनको पहिलो
  पङ्क्तिमा सीमित गरिन्छन्, अधिकतम 120 वर्णसम्म; अन्य भूमिकाहरूलाई नछोइन्छ। सिस्टम प्रम्प्टहरू, पहिले नै एजिङ
  गरिएका सन्देशहरू र पछिल्लो प्रयोगकर्ता सन्देश दूरी जति भए पनि सधैँ जस्ताको तस्तै राखिन्छन्।
  कुनै पनि कुरा पूर्ण रूपमा हटाइँदैन, र वितरण गरिएका पूर्वनिर्धारित मानहरूमा `light`
  ब्यान्डसम्म पुग्न सकिँदैन (`light` र `verbatim` बराबर छन्)।

#### कोड उदाहरण

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... थप 50 टर्न ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // अन्तिम 3 टर्न: जस्ताको तस्तै
  light: 8, // दूरी <= 8: हल्का कम्प्रेसन
  moderate: 20, // दूरी <= 20: केभम्यान कम्प्रेसन
  fullSummary: 5, // प्रकारका लागि आवश्यक, ब्यान्डिङ कोडले नपढ्ने
  // दूरी > 20: संक्षेप गरिने (सहायक) / पहिलो पङ्क्ति राखिने (प्रयोगकर्ता)
});

// saved = बचत गरिएका टोकनहरूको सङ्ख्या
```

#### कहिले प्रयोग गर्ने

प्रगतिशील एजिङ `aggressive` मोडका लागि **सधैँ चालु हुन्छ** — यो
`compressAggressive()` को चरण 2 हो। Ultra मोडले यसलाई सञ्चालन गर्दैन। यो
विशेष रूपमा निम्नका लागि प्रभावकारी छ:

- लामो समयसम्म चल्ने कोडिङ सत्रहरू
- धेरै दिनसम्म चल्ने कुराकानीहरू
- धेरै उपकरण कलहरू भएका एजेन्टिक कार्यप्रवाहहरू

### केभम्यान आउटपुट मोड

केभम्यान आउटपुट मोडले **सिस्टम प्रम्प्ट निर्देशनहरू** थप्छ, जसले मोडेललाई नै
संक्षिप्त आउटपुट दिन अनुरोध गर्छ — `lite` स्तरले पूर्ण वाक्यहरू कायम राख्दै सङ्क्षिप्त उत्तरहरू माग्छ, `full`
ले यसलाई "बुद्धिमान गुफामानवजस्तै छोटो जवाफ दिन" भन्छ, र `ultra` ले टेलिग्राफिक आउटपुट माग्छ;
निर्देशनहरूले अनुरोध मात्र गर्न सक्छन्, यसको प्रत्याभूति दिन सक्दैनन्। अनुरोधहरूले ती निर्देशनहरू
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) मार्फत प्राप्त गर्छन्:
`open-sse/handlers/chatCore.ts` ले पहिले ब्याकवर्ड-कम्प्याटिबिलिटी शिम
(`resolveOutputStyleSelection()` in
`open-sse/services/compression/outputStyles/backCompat.ts`) मार्फत चयन निर्धारण गर्छ, जसले `outputStyles`
खाली हुँदा सक्षम गरिएको `cavemanOutputMode` लाई
`cavemanOutputMode.intensity` मा `terse-prose` आउटपुट शैलीसँग म्याप गर्छ (तलको ब्याकवर्ड-कम्प्याटिबिलिटी हेर्नुहोस्); खाली नभएको `outputStyles`
चयन जस्ताको तस्तै प्रयोग गरिन्छ, र त्यसपछि `cavemanOutputMode.enabled` तथा `intensity` ले कुनै
प्रभाव पार्दैनन्, तर यसको `autoClarity` टगल भने अझै लागू हुन्छ। `outputMode.ts` मा
निर्देशन पाठहरू (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), सामग्री बाइपास र
इन्जेक्सनले प्रयोग गर्ने प्लेसमेन्ट हेल्पर छन्; यसको आफ्नै `applyCavemanOutputMode()` इन्जेक्टरको कुनै
प्रोडक्सन कलर छैन।

#### यसले कसरी काम गर्छ

यो मोडले इनपुट कम्प्रेस गर्दैन। यसले system prompt मा एउटा निर्देशन ब्लक थप्छ
(तलको इन्जेक्सनले कसरी काम गर्छ हेर्नुहोस्), र अनुरोधका लागि चयन गरिएको कुनै पनि input compression मोड
त्यसपछि पनि उक्त ब्लक समावेश भएको body मा चल्छ। प्रत्येक स्तरको अन्त्यमा आउने साझा
boundaries clause भन्दा अगाडि, अङ्ग्रेजी `full` स्तरमा यस्तो लेखिएको हुन्छ:

> "बुद्धिमान गुफामानवजस्तै छोटो जवाफ दिनुहोस्। articles (a/an/the), filler (just/really/basically/actually/simply), शिष्टाचार, र अनिश्चितता जनाउने भाषा हटाउनुहोस्। वाक्यांशहरू स्वीकार्य छन्। छोटा पर्यायवाची प्रयोग गर्नुहोस् (extensive होइन big, implement होइन fix)। सबै प्राविधिक विषयवस्तु, code, errors, URLs, identifiers हुबहु राख्नुहोस्।"

यसले विशेषगरी यी अवस्थामा राम्रो काम गर्छ:

- Code generation (छोटो output = कम tokens)
- द्रुत प्रश्नोत्तर (विस्तृत व्याख्या आवश्यक पर्दैन)
- Batch processing (throughput अधिकतम बनाउनुहोस्)

#### कहिले प्रयोग गर्ने

Caveman output mode **opt-in** हो। compression चालु हुँदा (`enabled: true`, Compression Settings पृष्ठको master toggle
चालु), यसलाई `cavemanOutputMode.enabled` मार्फत चालु गर्नुहोस्; `intensity` ले
`lite`, `full` वा `ultra` चयन गर्छ:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

compression combo को **Output Mode** toggle (`outputMode`, स्तर `outputModeIntensity` मा)
ले उक्त combo लागू हुने अनुरोधहरूका लागि उही switch सेट गर्छ, र
`omniroute_set_compression_engine` MCP tool ले यसको boolean `outputMode`
argument मार्फत यसलाई लेख्छ। खाली नभएको `outputStyles` चयनले यस switch लाई प्राथमिकतामा उछिन्छ। dashboard मा, **Terse prose** output style सक्रिय गर्दा उही ब्लक inject हुन्छ (तलको Output
Styles हेर्नुहोस्)।

### Output Styles (catalog)

माथिको Caveman output mode **legacy single-style path** हो। Phase 4 ले यसलाई
मिलाएर प्रयोग गर्न सकिने output styles को catalog मा सामान्यीकरण गर्यो: `OUTPUT_STYLE_CATALOG`, जुन
`open-sse/services/compression/outputStyles/catalog.ts` मा छ। प्रत्येक style एउटा system-prompt
निर्देशन हो जसले model लाई आफैं कम लागतको output दिन भन्छ; styles सँगै सक्रिय गर्न सकिन्छ
र catalog को क्रमअनुसार inject गरिन्छ।

| Style                             | `id`            | यसले के गर्छ                                                                                                                                                                                                                                                | निर्देशनका भाषाहरू                            |
| --------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| छोटो गद्य                         | `terse-prose`   | filler/articles/hedging हटाउँछ; प्राविधिक विषयवस्तु हुबहु राख्छ। legacy caveman output mode कै पाठ (सन्दर्भ गरिएको, पुनः टाइप नगरिएको)।                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| कम code                           | `less-code`     | YAGNI ladder: काम गर्ने सबैभन्दा सानो परिवर्तन, अनुरोध नगरिएका abstractions नथप्ने।                                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (अल्छी वरिष्ठ developer) | `ponytail`      | "सबैभन्दा राम्रो code भनेको कहिल्यै नलेखिएको code हो": reuse > rewrite, root cause > symptom, काम गर्ने सबैभन्दा छोटो diff।                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| मलाई ADHD छ (कार्य-पहिले)         | `i-have-adhd`   | पहिले कार्य (गद्यभन्दा अगाडि command/path/snippet), सङ्ख्याबद्ध सीमित चरणहरू, एउटा ठोस अर्को चरण, preamble/recap/closers नहुने। [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) बाट अनुकूलित।                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter                | `antislop-ui`   | प्रत्येक visual technique ले उद्देश्य परीक्षण (hierarchy, identity, readability) पास गर्नुपर्छ; default gradients/glass/glow नहुने, सीमित palette, template layouts नहुने। दुवै antislop styles ले no-dead-controls / no-fabricated-claims boundary थप्छन्। | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop copy र human filter      | `antislop-copy` | विशिष्ट copy (em dash, generic CTAs, buzzwords, chatbot closers, आविष्कार गरिएका तथ्यहरू नहुने) र people rules: WCAG AA contrast, देखिने focus, keyboard पहुँच, empty/loading/error states, mobile reflow।                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| छोटो CJK (文言)                   | `terse-cjk`     | `full`/`ultra` उत्तर Classical Chinese (文言) मा; `lite` ले function words, शिष्टाचार वा सजावटबिनाका छोटा उत्तर मात्र माग्छ।                                                                                                                                | zh (locale-gated, तल हेर्नुहोस्)              |

हरेक style मा तीन intensity levels — `lite`, `full`, `ultra` — उपलब्ध छन्, र प्रत्येक level
साझा boundaries clause (`outputMode.ts` मा `SHARED_BOUNDARIES`) सँग अन्त्य हुन्छ, जसले
code blocks, file paths, commands, errors र URLs हुबहु राख्छ। `terse-prose` र
`terse-cjk` level का पाठहरूले उक्त सूचीमा identifiers थप्छन्।

`terse-cjk` दुई ठाउँमा `zh` का लागि locale-gated छ। Compression Settings पृष्ठले
dashboard UI को भाषा Chinese (`zh-CN` वा `zh-TW`) हुँदा मात्र यसको row देखाउँछ, र
`applyOutputStyles()` ले अनुरोधको resolved language (तलको Language
selection हेर्नुहोस्) `zh` हुँदा मात्र यसलाई inject गर्छ। row लुकाउँदा सुरक्षित गरिएको `terse-cjk` चयन हट्दैन:
settings API ले कुनै पनि style id स्वीकार गर्छ, र पृष्ठमा अन्य styles सुरक्षित गर्दा यसलाई कायम राख्छ। अनुरोधको
समयमा, `applyOutputStyles()` को language check नै एक मात्र locale gate हो।

#### इन्जेक्सनले कसरी काम गर्छ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ले चयनलाई
क्याटलगसँग मिलाएर समाधान गर्छ (अज्ञात ids र locale नमिलेका styles हटाइन्छन्,
कहिल्यै त्रुटि हुँदैन; कुनै पनि style मा समाधान नहुने चयनले body लाई अपरिवर्तित
छोड्छ र `no_styles` का रूपमा skip हुन्छ), चयन गरिएका निर्देशनहरूलाई क्याटलगको
क्रममा जोड्छ,
boundaries clause लाई **एक पटक** थप्छ (साथै `less-code` वा `ponytail` चयन गरिएको
अवस्थामा safety clause, `SAFETY_BOUNDARIES` वा यसको अनुवाद पनि थप्छ), र block लाई
एउटै idempotency marker (`[OmniRoute Output Styles]`) बाट सुरु गर्छ, त्यसैले फेरि
apply गर्दा कुनै परिवर्तन हुँदैन। समाधान गरिएको भाषामा (तलको Language selection
हेर्नुहोस्) अनुवाद उपलब्ध हुँदा, अंग्रेजीको सट्टा स्थानीयकृत निर्देशन inject गरिन्छ।

खाली नभएको `messages` array भएको body मा, idempotency जाँच content bypass भन्दा
पहिले चल्छ: `[OmniRoute Output Styles]` marker पहिले नै top-level `system` field
(string वा content-block array) मा वा string content भएको system message मा छ भने,
body लाई `already_applied` का रूपमा अपरिवर्तित छोडिन्छ र keyword जाँच चल्दैन।
अन्यथा content bypass (`open-sse/services/compression/outputMode.ts` मा रहेको
`shouldBypassCavemanOutputMode()`) ले पछिल्ला तीन messages को text, तिनको role
जेसुकै भए पनि, जाँच गर्छ र त्यो text यसको security, irreversible-action वा
clarification keywords सँग मिलेमा, वा क्रम-संवेदनशील sequence मिलेमा, पूरै turn का
लागि styles skip गर्छ: `first`, `then`, `after that`, `before`, `rollback` वा
`backup` पछि 240 characters भित्र `delete`, `drop`, `migrate`, `deploy` वा
`release` आएको हुनुपर्छ। **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`, पूर्वनिर्धारित रूपमा on) on हुँदा bypass चल्छ;
toggle off गर्दा keyword जाँच skip हुन्छ।

Bypass ले turn लाई अघि बढ्न दिएपछि, `placeSystemInstruction()` (सोही file), जसले
कहिल्यै नयाँ `messages[0]` सिर्जना गर्दैन, block लाई आफूले फेला पारेको निम्नमध्ये
पहिलो स्थानमा राख्छ:

1. सुरुमा रहेको string content सहितको system message: block यसको text पछि append
   गरिन्छ।
2. Top-level `system` field: block लाई string को text पछि append गरिन्छ, वा
   content-block array मा नयाँ text block का रूपमा थपिन्छ।
3. त्यसपछि आउने पहिलो string content सहितको system message: block यसको text पछि
   append गरिन्छ।
4. माथिका कुनै पनि नभएमा: block लाई `messages` को अन्त्यमा नयाँ system message भित्र
   राखिन्छ।

`messages` array नभएको (वा खाली array भएको) body मा content bypass चल्दैन र
top-level `system` field हेरिँदैन। Block लाई string `instructions` field को text
पछि append गरिन्छ, जबसम्म त्यस field मा पहिले नै `[OmniRoute Output Styles]`
marker छैन; marker भए body लाई `already_applied` का रूपमा अपरिवर्तित छोडिन्छ।
Body मा string `instructions` field नभए पनि `input` (string वा array) भएमा, block
`instructions` बन्छ र त्यस field मा रहेको कुनै पनि non-string value लाई
प्रतिस्थापन गर्छ। String `instructions` field वा string अथवा array `input` मध्ये
कुनै पनि नभएको body लाई अपरिवर्तित छोडिन्छ र `no_messages` का रूपमा skip गरिन्छ।

#### कसरी सक्षम गर्ने

Dashboard मा: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles section: प्रत्येक style का लागि on/off
toggle र level selector भएको एउटा row। Compression स्वयं on हुँदा (page को master
toggle, `enabled`) styles inject हुन्छन्। **Auto-Clarity Bypass** toggle **Caveman**
page (`/dashboard/context/caveman`) को **Output Mode** card मा छ। Programmatically,
compression config ले चयनलाई यसरी persist गर्छ:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: `outputStyles` खाली रहँदासम्म, पुरानो `cavemanOutputMode.enabled`
setting लाई `cavemanOutputMode.intensity` मा रहेको `terse-prose` सँग map गरिन्छ।
त्यसपछि block `[OmniRoute Output Styles]` marker बाट सुरु हुन्छ, जहाँ पुरानो
`applyCavemanOutputMode()` injector ले `[OmniRoute Caveman Output Mode]` लेख्थ्यो।
Marker मुनिको text en, pt-BR, es, de, fr, it, ru, id र vi मा पुरानो injection सँग
मेल खान्छ; ja र zh मा boundaries clause अघि एउटा अतिरिक्त space हुन्छ।
`terse-prose` लाई pt-BR, es, de, fr, it, ru, zh, ja, id र vi मा अनुवाद गरिन्छ,
त्यसैले समाधान गरिएको भाषा `hu` भएको request ले पुरानो injector ले आफ्नो Hungarian
text प्रयोग गरेको ठाउँमा अंग्रेजी text पाउँछ।

Output-style भाषा चयन (`outputStyles/apply.ts` मा रहेको
`resolveOutputStyleLanguage()`): `languageConfig.enabled` on हुँदा, `autoDetect` ले
request को `messages` array मा text भएको सबैभन्दा पछिल्लो user message (string
content, वा त्यसका content parts को `text`) sample गर्छ र त्यसमा Caveman engine को
detector (`detectCompressionLanguage()`) चलाउँछ। Han characters भएका तर kana नभएका
text का लागि detector ले `zh` फर्काउँछ; अन्यथा `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` र `id` मध्ये सबैभन्दा धेरै hint matches भएको भाषा फर्काउँछ, र
कुनै पनि match नभए `en` फर्काउँछ — यसले classify गर्न नसक्ने text ले English
पाउँछ, `defaultLanguage` कहिल्यै पाउँदैन, र styles सँग `vi` text उपलब्ध भए पनि
`vi` कहिल्यै detect हुँदैन। Responses API body ले आफ्ना turns लाई `input` मा
राख्छ, जसलाई sample गरिँदैन, त्यसैले यसले पहिले `defaultLanguage`, त्यसपछि English
पाउँछ। `messages` मा कुनै user message सँग text नभएमा, वा `autoDetect` off हुँदा,
पहिले `defaultLanguage`, त्यसपछि English लागू हुन्छ। `languageConfig.enabled` off
हुँदा भाषा English हुन्छ — जबसम्म request मा compression combo लागू हुँदैन
(request को routing combo मा assign गरिएको combo, वा built-in stacked pipeline का
लागि chatCore ले fallback गर्ने default compression combo): combo लागू गर्दा त्यस
request का लागि `languageConfig.enabled` on हुन्छ र combo का language packs बाट
`defaultLanguage` set हुन्छ (saved value combo का packs मध्ये एक भए त्यही,
अन्यथा combo को पहिलो pack, जुन पूर्वनिर्धारित रूपमा `en` हुन्छ), जबकि saved
`autoDetect` (पूर्वनिर्धारित रूपमा on) अझै लागू हुन्छ। Caveman input engine ले
आफ्नो rule-pack भाषा फरक तरिकाले छान्छ — प्रत्येक text part अनुसार र auto-detect
off हुँदा `enabledPacks` का आधारमा gated भएर।

शैली × भाषा म्याट्रिक्सलाई
`tests/unit/compression/output-styles-i18n-matrix.test.ts` ले स्थिर गर्छ: प्रत्येक क्याटलग शैलीका लागि परीक्षणको `BASELINE_LANGUAGES` मा एउटा
प्रविष्टि हुनुपर्छ; locale-gated नभएको शैलीले
pt-BR अनुवाद उपलब्ध गराउनैपर्छ (locale-gated `terse-cjk` यस नियमबाट मुक्त छ), जबसम्म त्यो
`KNOWN_ENGLISH_ONLY` मा सूचीबद्ध छैन, जसमा कुनै पनि अनुवाद नभएका शैलीहरू मात्र राख्न पाइन्छ —
सूचीबद्ध शैलीको कुनै अनुवाद भएमा परीक्षण असफल हुन्छ; र कुनै शैलीले आफ्नो `BASELINE_LANGUAGES` प्रविष्टिमा सूचीबद्ध भाषा
गुमाएमा परीक्षण असफल हुन्छ। शैली थप्न,
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) हेर्नुहोस्।

### उपकरण परिणाम सङ्कुचन

`open-sse/services/compression/toolResultCompressor.ts` मा रहेको `compressToolResult()` ले
उपकरण-परिणाम पाठलाई **5 रणनीतिहरू** प्रयोग गरेर सङ्कुचित गर्छ। यसले तिनलाई यही क्रममा प्रयास गर्छ, र
जसको जाँच सामग्रीसँग मेल खान्छ, त्यस्तो पहिलो सक्षम रणनीतिले परिणाम निर्धारण गर्छ:

1. **`fileContent`**: 3 वा बढी पङ्क्ति भएको सामग्री, जसमा कम्तीमा एउटा पङ्क्ति, अगाडिको
   indentation लाई बेवास्ता गर्दा, `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` वा `return ` (keyword पछि एउटा space), वा `if`,
   `for` वा `while` पछि `(` वा ` (` बाट सुरु हुन्छ; यसले सुरुवातका 20 र अन्तिम 5 पङ्क्ति राख्छ र
   हटाइएको बीचको भागलाई चिन्ह लगाउँछ।
2. **`grepSearch`**: `<path>:<digits>:` स्वरूपको कम्तीमा एउटा पङ्क्ति भएको सामग्री,
   जहाँ पहिलो colon अघिको पाठमा whitespace हुँदैन; यसले त्यस्ता पङ्क्तिहरू मात्र, बढीमा
   30 वटासम्म, राख्छ र त्यसपछि बाँकी मेलहरूको सङ्ख्या तथा मेल खाएका फाइलहरूको सूची राख्छ;
   अन्य सबै पङ्क्ति हटाइन्छन्। रणनीति सक्रिय गर्न यस्तो एउटै पङ्क्ति पर्याप्त हुन्छ, त्यसैले
   `12:30:45` जस्तो timestamp बाट सुरु हुने log पङ्क्ति पनि गणना हुन्छ।
3. **`shellOutput`**: ANSI CSI sequence (`ESC[` पछि digits वा
   semicolons र त्यसपछि एउटा letter, color codes मा जस्तै) वा पाठको कुनै पनि ठाउँमा whitespace पछि आउने `$` समावेश भएको
   output ले ती sequences गुमाउँछ (अन्य escapes, जस्तै `ESC[?25l` वा
   OSC window-title sequence, यथावत् राखिन्छन्) र लगातार दोहोरिएका पङ्क्तिहरूलाई एउटामा समेटेर
   अन्तिम 50 पङ्क्ति राख्छ। यो जाँच `json` र `errorMessage` भन्दा अघि चल्ने भएकाले,
   यस्तो `$` समावेश भएको JSON वा error output, `shellOutput` सक्रिय हुँदा, तिनीसम्म कहिल्यै पुग्दैन।
4. **`json`**: 2,000 characters भन्दा लामो, `{` वा `[` बाट सुरु हुने (वैकल्पिक
   whitespace पछि) र parse हुने JSON payload लाई संक्षेप गरिन्छ: 7 भन्दा बढी items भएको array ले
   आफ्नो पहिलो 5 र अन्तिम 2 items तथा कुल सङ्ख्या राख्छ, र object ले आफ्नो पहिलो 20
   keys राख्छ; प्रत्येक nested object वा array value लाई `{…N keys}` placeholder ले
   प्रतिस्थापन गरिन्छ (array का लागि N त्यसको length हो), र पहिलो 20 पछि
   हटाइएका keys गणना गर्ने `_remaining_<N>_keys` marker थपिन्छ। Scalar values पूरै copy गरिन्छन्, त्यसैले
   nested values नभएको 20 वा कम keys को object लाई केवल पुनः indent गरिन्छ — minified object मा
   characters थपिन्छन् र त्यो अपरिवर्तित रहन्छ।
5. **`errorMessage`**: output मा कुनै पनि ठाउँमा र अक्षरको कुनै पनि case मा `error:`,
   `error ` (शब्दपछि space, `no error found` मा जस्तै), `[error]`,
   `exception:`, `exception `, `[exception]` वा `traceback` भएमा यसको पहिलो पङ्क्ति,
   त्यसपछिका 10 पङ्क्ति र अन्तिम 3 पङ्क्ति राखिन्छन्, र तिनको बीचका पङ्क्तिको ठाउँमा
   `… [N frames elided] …` marker राखिन्छ। पहिलो पङ्क्तिपछि 13 भन्दा बढी पङ्क्ति हुँदा मात्र marker
   देखिन्छ, त्यसैले 14 वा कम पङ्क्तिको error output छोटिँदैन (12 वा 13 पङ्क्तिमा
   अन्तिम 3 पङ्क्तिले पहिले नै राखिएका पङ्क्तिहरू दोहोर्याउँछन्)।

कुनै रणनीति मेल खाएपछि, त्यसले केही पनि बचत नगरे पनि, त्यसपछिका रणनीतिहरू
प्रयास गरिँदैनन्। मेल खाने रणनीतिले कुनै अनुमानित tokens (length ÷ 4, माथितिर round गरिएको) बचत नगर्दा —
उदाहरणका लागि 25 वा कम पङ्क्तिको code-जस्तो file, वा 2,000
characters भन्दा लामो तर 7 वा कम items भएको JSON array — aggressive engine ले मूल tool
result नै राख्छ: दुवै callers (`compressAggressive()` र `compressAnthropicToolResultBlock()`) ले
`saved` 0 वा कम हुँदा मूल सामग्री राख्छन्, जबकि `compressToolResult()` स्वयंले अझै पनि
त्यो रणनीतिको output फर्काउँछ। tool-result चरण नै अन्तिम निर्णय होइन:
engine को fallback summarizer ले अझै पनि 8,192 characters भन्दा लामो `tool` वा `function` message
(`maxTokensPerMessage`, 2,048, गुणा 4) छोट्याउन सक्छ।

#### कहिले प्रयोग गर्ने

Tool result compression aggressive engine को चरण 1 हो (`open-sse/services/compression/aggressive.ts` मा रहेको `compressAggressive()`),
त्यसैले यो Aggressive mode मा र stacked pipeline को
`aggressive` चरणमा चल्छ। यसले OpenAI-shape का `tool` र `function`
messages तथा Anthropic का `tool_result` blocks भित्रको पाठ सङ्कुचित गर्छ। प्रत्येक रणनीतिको
`aggressive.toolStrategies` अन्तर्गत आफ्नै switch हुन्छ, र सबै पूर्वनिर्धारित रूपमा सक्रिय हुन्छन्। dashboard मा,
compression सक्रिय हुँदा र default mode Aggressive हुँदा switches Caveman page को **Advanced** view मा हुन्छन्।

### स्ट्याक गरिएको पाइपलाइन

stacked mode ले **क्रमशः धेरै engines** चलाउँछ — सामान्यतया पहिले RTK
(tool output मा 60-90% बचत), त्यसपछि बाँकी पाठमा Caveman (~46% input
बचत)। संयोजन गर्दा त्यो **78-95% योग्य दायरा** हुन्छ (माथिको Upstream Savings Math
हेर्नुहोस्): `1 - (1 - 0.60..0.90) × (1 - 0.46)` को औसत ≈89% हुन्छ।

#### यसले कसरी काम गर्छ

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### कहिले प्रयोग गर्ने

निम्न अवस्थाका लागि stacked mode प्रयोग गर्नुहोस्:

- उपकरण-प्रधान workflows (agentic coding, अनुसन्धान)
- लागत-संवेदनशील batch processing
- जब तपाईंलाई अधिकतम token बचत चाहिन्छ

Stacked pipelines लाई global `stackedPipeline` compression
setting मार्फत, वा routing combo लाई तोकिएको named compression combo मार्फत configure गरिन्छ (माथिको
Per-Combo Override हेर्नुहोस्) — auto-combo `modePack` मार्फत होइन (त्यो field ले
auto-combo model selection लाई मात्र पुनः weight गर्छ, र `stacked` मान्य pack name होइन)।

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
