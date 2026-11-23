# 🗜️ Prompt Compression Guide — OmniRoute (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> योग्य कॉन्टेक्स्ट पर स्वचालित रूप से 15-95% बचाएँ। त्वरित अवलोकन के लिए, [README का कम्प्रेशन अनुभाग](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) देखें।

## अवलोकन

OmniRoute एक मॉड्यूलर प्रॉम्प्ट कम्प्रेशन पाइपलाइन लागू करता है, जो अनुरोधों के अपस्ट्रीम प्रदाताओं तक पहुँचने से **पहले ही सक्रिय रूप से** चलती है। इसका अर्थ है कि आपके टोकन की बचत पारदर्शी रूप से होती है — आपके वर्कफ़्लो में किसी बदलाव की आवश्यकता नहीं है।

```
क्लाइंट अनुरोध
  → कम्प्रेशन रणनीति चयनकर्ता
    → कॉम्बो ओवरराइड? → कॉम्बो सेटिंग का उपयोग करें
    → ऑटो-ट्रिगर थ्रेशोल्ड? → ऑटो मोड का उपयोग करें
    → डिफ़ॉल्ट मोड? → ग्लोबल सेटिंग का उपयोग करें
    → बंद? → कम्प्रेशन छोड़ें
  → चयनित कम्प्रेशन मोड
    → बंद: कोई कम्प्रेशन नहीं
    → लाइट: सुरक्षित व्हाइटस्पेस/फ़ॉर्मेटिंग क्लीनअप (~15%)
    → स्टैंडर्ड: Caveman-शैली में फ़िलर हटाना (~30%)
    → एग्रेसिव: हिस्ट्री एजिंग + सारांशीकरण (~50%)
    → अल्ट्रा: ह्यूरिस्टिक प्रूनिंग + कोड-ब्लॉक थिनिंग (~75%)
    → RTK: कमांड-सचेत टर्मिनल/टूल-आउटपुट फ़िल्टरिंग (60-90% अपस्ट्रीम सीमा)
    → स्टैक्ड: क्रमबद्ध मल्टी-इंजन पाइपलाइन, आम तौर पर पहले RTK फिर Caveman (78-95% योग्य सीमा)
  → कम्प्रेस किया गया अनुरोध → प्रदाता
```

---

## कम्प्रेशन मोड

### बंद

कोई कम्प्रेशन लागू नहीं किया जाता। सभी संदेश बिना बदलाव के भेजे जाते हैं।

### लाइट मोड (~15% बचत, <1ms विलंबता)

सबसे सुरक्षित मोड — कोई अर्थगत बदलाव नहीं, केवल फ़ॉर्मेटिंग क्लीनअप:

| तकनीक                    | विवरण                                              |
| ------------------------ | -------------------------------------------------- |
| `collapseWhitespace`     | लगातार खाली पंक्तियों और अंत के स्पेस को मर्ज करें |
| `dedupSystemPrompt`      | डुप्लिकेट सिस्टम संदेश हटाएँ                       |
| `compressToolResults`    | विस्तृत टूल/फ़ंक्शन आउटपुट कम्प्रेस करें           |
| `removeRedundantContent` | दोहराए गए निर्देश हटाएँ                            |
| `replaceImageUrls`       | base64 इमेज डेटा URI को छोटा करें                  |

**इनके लिए सर्वोत्तम:** हमेशा चालू रहने वाला उपयोग, सुरक्षा-महत्वपूर्ण वर्कफ़्लो।

### स्टैंडर्ड मोड (~30% बचत)

[Caveman](https://github.com/JuliusBrussee/caveman) से प्रेरित — अर्थ को सुरक्षित रखते हुए फ़िलर शब्दों और अनावश्यक रूप से विस्तृत वाक्यांशों को हटाता है:

- फ़िलर शब्द हटाता है ("कृपया", "मुझे लगता है", "मूल रूप से", "वास्तव में")
- विस्तृत वाक्यांशों को संक्षिप्त करता है ("ऐसा करने के लिए" → "के लिए", "के परिणामस्वरूप" → "क्योंकि")
- विनम्र अनिश्चितता वाले वाक्यांश हटाता है ("क्या आपको आपत्ति होगी...", "यदि आप संभवतः ऐसा कर सकें...")
- कोडिंग प्रॉम्प्ट के लिए अनुकूलित 30+ regex नियम

**इनके लिए सर्वोत्तम:** दैनिक कोडिंग वर्कफ़्लो, लागत के प्रति सजग टीमें।

### एग्रेसिव मोड (~50% बचत)

लंबे सत्रों के लिए स्मार्ट हिस्ट्री प्रबंधन:

- **संदेश एजिंग** — पुराने संदेश क्रमिक रूप से अधिक कम्प्रेस किए जाते हैं
- **टूल परिणाम कम्प्रेशन** — लंबे टूल आउटपुट को छोटा किया जाता है या हटाया जाता है (पहली/अंतिम पंक्तियाँ,
  मेल खाने वाली पंक्तियों की फ़िल्टरिंग, JSON कुंजी संकुचन)
- **संरचनात्मक अखंडता गार्ड** — सुनिश्चित करते हैं कि `tool_use` + `tool_result` युग्म संगत रहें
- **कॉन्टेक्स्ट विंडो जागरूकता** — प्रत्येक मॉडल की टोकन सीमा का पालन करती है

**इनके लिए सर्वोत्तम:** विस्तारित डीबगिंग सत्र, बड़े कोडबेस।

### अल्ट्रा मोड (~75% बचत)

टोकन-महत्वपूर्ण परिदृश्यों के लिए अधिकतम कम्प्रेशन:

- **ह्यूरिस्टिक प्रूनिंग** — गद्य की स्कोर-आधारित टोकन प्रूनिंग
- **संरचना संरक्षण** — फ़ेंस किए गए कोड ब्लॉक, इनलाइन कोड, URL और आइडेंटिफ़ायर को
  टूम्बस्टोन करके ज्यों का त्यों दोबारा जोड़ा जाता है, उन्हें कभी प्रून नहीं किया जाता
- **वैकल्पिक SLM स्तर** — कॉन्फ़िगर किए जाने पर एक छोटा लोकल मॉडल प्रूनिंग को परिष्कृत कर सकता है
- एग्रेसिव मोड से स्वतंत्र: यह संदेश एजिंग, टूल-परिणाम कम्प्रेशन
  या फ़ॉलबैक सारांशक नहीं चलाता (केवल SLM-स्तर की विफलता ही किसी फ़ॉलबैक पास को
  एग्रेसिव के माध्यम से रूट कर सकती है)

**इनके लिए सर्वोत्तम:** जब आप बार-बार कॉन्टेक्स्ट सीमा तक पहुँच रहे हों।

### RTK मोड (60-90% अपस्ट्रीम सीमा)

RTK मोड को कोडिंग-एजेंट सत्रों में दिखाई देने वाले विस्तृत टूल आउटपुट के लिए अनुकूलित किया गया है:

- `git status`, `git diff`, `git log`, टेस्ट रनर,
  TypeScript/Vite/Webpack बिल्ड, ESLint/Biome/Prettier, npm ऑडिट/इंस्टॉलेशन, Docker लॉग, इन्फ़्रा
  आउटपुट और सामान्य शेल आउटपुट जैसे कमांड/आउटपुट वर्गों का पता लगाता है
- `open-sse/services/compression/engines/rtk/filters/` से JSON फ़िल्टर पैक लागू करता है
- प्रोजेक्ट या ग्लोबल `filters.toml` फ़ाइलों से RTK TOML schema v1 फ़िल्टर आयात करता है, जिसमें इनलाइन-टेस्ट
  सत्यापन और प्रोजेक्ट फ़ाइलों के लिए ट्रस्ट-गेटिंग शामिल है
- इनलाइन सत्यापन नमूनों के साथ 55 अंतर्निहित फ़िल्टर प्रदान करता है
- ANSI नियंत्रण अनुक्रम, प्रोग्रेस बार, दोहराई गई पंक्तियाँ और गैर-कार्रवाई योग्य शोर हटाता है
- विफलताओं, त्रुटियों, चेतावनियों, बदली गई फ़ाइलों, सारांशों और लंबे आउटपुट के अंतिम भाग को सुरक्षित रखता है
- ट्रस्ट-गेटेड प्रोजेक्ट फ़िल्टर, ग्लोबल फ़िल्टर और वैकल्पिक रूप से संपादित रॉ-आउटपुट रिकवरी का समर्थन करता है

**इनके लिए सर्वोत्तम:** शेल, बिल्ड, टेस्ट, git, grep और फ़ाइल-आउटपुट ट्रांसक्रिप्ट वाले एजेंट सत्र।

### स्टैक्ड मोड (78-95% योग्य सीमा)

स्टैक्ड मोड एक नियतात्मक क्रम में कई कम्प्रेशन इंजन चलाता है। डिफ़ॉल्ट पाइपलाइन है:

```txt
RTK -> Caveman
```

यह क्रम पहले टर्मिनल/टूल आउटपुट को संक्षिप्त रखता है, फिर शेष प्राकृतिक-भाषा प्रॉम्प्ट पर Caveman अर्थगत संक्षेपण लागू करता है। स्टैक्ड पाइपलाइन को ग्लोबल रूप से या रूटिंग कॉम्बो को असाइन किए गए कम्प्रेशन कॉम्बो के माध्यम से कॉन्फ़िगर किया जा सकता है।

**इनके लिए सर्वोत्तम:** बड़े टूल लॉग के साथ मानवीय निर्देशों या सहायक सारांशों वाला मिश्रित कॉन्टेक्स्ट।

---

## अपस्ट्रीम बचत का गणित

OmniRoute दो स्रोतों से प्राप्त कम्प्रेशन बचत का दस्तावेज़ीकरण करता है: अपस्ट्रीम प्रोजेक्ट बेंचमार्क और
OmniRoute की अपनी इंजन संरचना।

| स्रोत   | यहाँ उपयोग की गई अपस्ट्रीम README संख्या                                                            |
| ------- | --------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` कम आउटपुट टोकन, `65%` बेंचमार्क औसत आउटपुट बचत, `22-87%` सीमा, और `~46%` इनपुट कम्प्रेशन टूल |
| RTK     | `60-90%` कमांड-आउटपुट बचत; नमूना सत्र में `~118,000 -> ~23,900` टोकन, या `79.7%` बचत (`~80%`)       |

ओवरलैप होने वाले टूल/कॉन्टेक्स्ट पेलोड के लिए, डिफ़ॉल्ट OmniRoute कॉम्बो इंजनों को क्रमबद्ध करता है:

```txt
RTK -> Caveman
```

संयुक्त बचत गुणात्मक होती है, योगात्मक नहीं:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

यह `78-95%` संख्या तब लागू होती है, जब RTK और Caveman दोनों समान इनपुट/कॉन्टेक्स्ट पेलोड को कम कर सकते हैं।
Caveman प्रतिक्रिया आउटपुट मोड अलग है: सक्षम होने पर, Caveman की अपनी आउटपुट बचत (`65%`
औसत, `~75%` प्रमुख आँकड़ा, `22-87%` सीमा) का उपयोग करें। कुल बिलिंग बचत आपके प्रॉम्प्ट/आउटपुट मिश्रण पर निर्भर करती है।

### "पात्र" का वास्तव में क्या अर्थ है

15-95% की प्रमुख सीमा वास्तविक है, लेकिन यह केवल **अनावश्यक रूप से दोहराई गई या अत्यधिक विस्तृत** सामग्री पर लागू होती है — बार-बार आने वाली
त्रुटि पंक्तियाँ, एक बिल्ड लॉग जो उसी चेतावनी को बार-बार दिखाता है, या बहुत बड़ा `grep`/फ़ाइल-रीड डंप। इसका
अर्थ यह **नहीं** है कि प्रत्येक अनुरोध में इतनी बचत होगी।

प्रायोगिक रूप से सत्यापित (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 समान
त्रुटि पंक्तियों वाले Anthropic-आकार के `tool_result` ब्लॉक पर चलाए गए
`stacked` (RTK + Caveman) रन ने **95.93% टोकन बचत / 96.26% कैरेक्टर बचत** दी — जो विज्ञापित
सीमा के ठीक भीतर है। लेकिन सामान्य, गैर-दोहराव वाले टूल आउटपुट (एक साफ़ `grep` मिलान सूची,
एक छोटी फ़ाइल रीड, सामान्य संवादात्मक टेक्स्ट) पर चलाई गई वही पाइपलाइन सही रूप से **लगभग शून्य बचत** देती है, क्योंकि
हटाने के लिए कुछ भी दोहराव वाला नहीं होता और `validateCompression()` (`validation.ts`) ऐसे
पुनर्लेखन को भेजने से मना कर देता है जो कोड ब्लॉक, URLs, शीर्षक, संस्करण, या ALL-CAPS स्थिरांक पहचानकर्ताओं को हटा या बदल सकता हो।

यह अपेक्षित और सुरक्षित व्यवहार है, कोई बग नहीं: ऐसा कोडिंग सत्र जो मुख्यतः साफ़ फ़ाइलों को पढ़ता/grep करता है,
पूर्ण रूप से सक्षम कम्प्रेशन के बावजूद मामूली कुल बचत दिखाएगा, जबकि विफल
लूप या अत्यधिक आउटपुट देने वाले लिंटर का सामना करने वाला सत्र उस ट्रैफ़िक पर पूरी 78-95% सीमा देखेगा। किसी एक सत्र की
कम समग्र बचत प्रतिशत को इस बात का प्रमाण न मानें कि कम्प्रेशन गलत तरीके से कॉन्फ़िगर किया गया है — पहले जाँचें कि
अंतर्निहित टूल आउटपुट वास्तव में दोहराव वाला था या नहीं।

---

## टोकन बचत का विज़ुअलाइज़ेशन

```
कम्प्रेशन के बिना: 47K टोकन LLM को भेजे गए
Lite के साथ:       40K टोकन भेजे गए          (15% बचत — सुरक्षित, हमेशा चालू)
Standard के साथ:   33K टोकन भेजे गए          (30% बचत — caveman-speak नियम)
Aggressive के साथ: 24K टोकन भेजे गए          (50% बचत — एजिंग + सारांश)
Ultra के साथ:      12K टोकन भेजे गए          (75% बचत — ह्यूरिस्टिक प्रूनिंग)
RTK के साथ:        19K-5K टोकन भेजे गए       (कमांड/टूल आउटपुट पर 60-90% बचत)
Stacked के साथ:    10K-2.5K टोकन भेजे गए     (पात्र RTK+Caveman सीमा में 78-95% बचत)
```

---

## कॉन्फ़िगरेशन

### डैशबोर्ड

`Dashboard → Context & Cache` पर जाएँ:

- **Caveman** — मोड चयन, भाषा पैक, पूर्वावलोकन और वैश्विक डिफ़ॉल्ट
- **RTK** — कमांड-फ़िल्टर पूर्वावलोकन, RTK सुरक्षा सेटिंग्स और फ़िल्टर कैटलॉग
- **Compression Combos** — रूटिंग कॉम्बो को असाइन की गई नामित इंजन पाइपलाइन
- **Auto-Trigger Threshold** — टोकन की संख्या थ्रेशोल्ड से अधिक होने पर कम्प्रेशन को स्वचालित रूप से सक्रिय करना

### प्रति-कॉम्बो ओवरराइड

`Dashboard → Context & Cache → Compression Combos` में, किसी रूटिंग कॉम्बो को कम्प्रेशन कॉम्बो असाइन करें:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

इससे आप सशुल्क सब्सक्रिप्शन पर लाइट मोड बनाए रखते हुए मुफ़्त/कोडिंग प्रोवाइडर पर स्टैक्ड कम्प्रेशन का उपयोग कर सकते हैं।

यह "Per-Combo Override" असाइनमेंट **routing-combo compression mode** ओवरराइड (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — फ़ील्ड का स्कीमा `rtk`, `stacked` और `omniglyph` को भी स्वीकार करता है) से अलग नियंत्रण है — वह ओवरराइड किसी नामित कम्प्रेशन-कॉम्बो पाइपलाइन को नहीं चुनता; वह केवल `resolveCompressionPlan` द्वारा उपयोग किए जाने वाले `compressionMode` फ़ील्ड को सेट करता है। इसे कॉम्बो कार्ड (`Dashboard → Combos`) पर या, #6760 से, `Dashboard → Context & Cache → Compression Combos` की "Assign to routing" सूची में प्रति रूटिंग कॉम्बो, ऊपर दस्तावेज़ीकृत पाइपलाइन-असाइनमेंट चेकबॉक्स के ठीक बगल में सेट किया जा सकता है। दोनों इंटरफ़ेस एक ही `PUT /api/combos/{id}` एंडपॉइंट के माध्यम से सेव किए जाते हैं।

### प्रति-अनुरोध ओवरराइड

किसी एक अनुरोध के लिए कम्प्रेशन प्लान को ओवरराइड करने हेतु `x-omniroute-compression` अनुरोध हेडर भेजें। इसकी प्राथमिकता सबसे अधिक होती है — यह रूटिंग-कॉम्बो ओवरराइड, सक्रिय प्रोफ़ाइल, ऑटो-ट्रिगर और पैनल के Default पर प्राथमिकता लेता है। अज्ञात मानों को अनदेखा कर दिया जाता है (अनुरोध कभी अस्वीकार नहीं होता) और वैश्विक मास्टर स्विच अभी भी सब कुछ नियंत्रित करता है: जब कम्प्रेशन वैश्विक रूप से बंद हो, तो हेडर उसे चालू नहीं कर सकता। मान:

| मान           | प्रभाव                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `off`         | इस अनुरोध के लिए कोई कम्प्रेशन नहीं।                                                            |
| `default`     | पैनल से प्राप्त Default प्रोफ़ाइल (सक्रिय प्रोफ़ाइल को अनदेखा करता है)। लॉसी इंजन बंद रहते हैं। |
| `safe`        | हेडर को छोड़ देने के समान: केवल डीडुप और व्हाइटस्पेस फ़ोल्डिंग।                                 |
| `allow-lossy` | सारांश, प्रासंगिकता फ़िल्टर और शैली पुनर्लेखन सहित इस अनुरोध के ऑपरेटर प्लान को बनाए रखें।      |
| `engine:<id>` | सक्षम होने पर एक इंजन, जैसे `engine:rtk`। यह उस इंजन के लिए प्रति-अनुरोध ऑप्ट-इन है।            |
| `<combo>`     | एक नामित कॉम्बो, जिसका मिलान पहले नाम (केस-असंवेदी) से और फिर id से किया जाता है।               |

`allow-lossy`, `engine:<id>` या किसी नामित कॉम्बो के बिना, लॉसी इंजन लागू नहीं किए जाते। कम्प्रेशन चालू होने पर अनुरोध पर अभी भी सेशन डीडुप और व्हाइटस्पेस फ़ोल्डिंग लागू होती है।

लागू किया गया प्लान `X-OmniRoute-Compression: <mode>; source=<source>` रिस्पॉन्स हेडर में वापस भेजा जाता है, जहाँ `<source>`, `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` या `off` में से एक होता है।

### API

```bash
# कम्प्रेशन सेटिंग्स प्राप्त करें
curl http://localhost:20128/api/settings/compression

# कम्प्रेशन सेटिंग्स अपडेट करें
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# किसी विशिष्ट RTK/stacked पेलोड का पूर्वावलोकन करें
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK फ़िल्टर पैक सूचीबद्ध करें
curl http://localhost:20128/api/context/rtk/filters

# वैकल्पिक कमांड मेटाडेटा के साथ सीधे RTK का परीक्षण करें
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## क्या संरक्षित किया जाता है

कंप्रेशन इंजन **हमेशा इन्हें संरक्षित रखता है:**

- ✅ कोड ब्लॉक (फेंस्ड और इनलाइन)
- ✅ URLs और फ़ाइल पाथ
- ✅ JSON संरचनाएँ और संरचित डेटा
- ✅ आइडेंटिफ़ायर्स और संरक्षित तकनीकी टोकन
- ✅ गणितीय व्यंजक
- ✅ टूल/फ़ंक्शन कॉल परिभाषाएँ
- ✅ सिस्टम प्रॉम्प्ट (लाइट मोड में)

RTK रॉ-आउटपुट रिकवरी कुछ भी सहेजे जाने से पहले सामान्य API कुंजियों, बेयरर टोकन, Slack टोकन, AWS एक्सेस कुंजियों,
पासवर्ड, टोकन और सीक्रेट्स को रिडैक्ट करती है।

---

## संपीड़न आँकड़े

प्रत्येक संपीड़ित अनुरोध के आँकड़े सर्वर लॉग में शामिल होते हैं:

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

## चरण रोडमैप

| चरण    | मोड                                                                                                                                     | स्थिति           |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| चरण 1  | बंद, लाइट                                                                                                                               | ✅ जारी किया गया |
| चरण 2  | स्टैंडर्ड, एग्रेसिव, अल्ट्रा                                                                                                            | ✅ जारी किया गया |
| चरण 3  | RTK, स्टैक्ड, कंप्रेशन कॉम्बो                                                                                                           | ✅ जारी किया गया |
| चरण 4  | आउटपुट स्टाइल्स, SLM-स्तरीय अल्ट्रा, मूल्यांकन हार्नेस                                                                                  | ✅ जारी किया गया |
| चरण 4C | अनुकूली कॉन्टेक्स्ट-बजट ("डायल") — कंप्यूट इंजन + API (`contextBudget` on `PUT /api/settings/compression`) + डैशबोर्ड मोड/नीति नियंत्रण | ✅ जारी किया गया |

---

## आभार

स्टैंडर्ड मोड के कंप्रेशन नियम **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) के **[Caveman](https://github.com/JuliusBrussee/caveman)** से प्रेरित हैं — वायरल "जब कम टोकन से काम हो जाए तो अधिक टोकन क्यों उपयोग करें" प्रोजेक्ट। Caveman `~75%` कम आउटपुट टोकन, बेंचमार्क में औसतन `65%` आउटपुट बचत, `22-87%` की आउटपुट रेंज और एक `~46%` इनपुट-कंप्रेशन टूल की रिपोर्ट करता है।

RTK मोड **[RTK AI](https://github.com/rtk-ai)** के **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** से प्रेरित है — टर्मिनल, बिल्ड, टेस्ट, git और टूल-आउटपुट फ़िल्टरिंग के लिए उच्च-प्रदर्शन कमांड-आउटपुट कंप्रेशन प्रोजेक्ट। RTK `60-90%` बचत की रिपोर्ट करता है, और इसके README में दिए गए नमूना सत्र में `~80%` बचत दिखाई गई है।

---

## उन्नत संपीड़न प्रणालियाँ

ऊपर वर्णित 7 मोड के अतिरिक्त (स्रोत `codex-responses` और
`omniglyph` मोड भी स्वीकार करता है, जिन्हें यह मार्गदर्शिका कवर नहीं करती), नीचे दिए गए अनुभाग उन सुविधाओं को कवर करते हैं
जो उन मोड के भीतर या उनके साथ काम करती हैं: Tool Result Compression और Progressive Aging
आक्रामक इंजन के चरण 1 और 2 हैं (Aggressive मोड और स्टैक्ड पाइपलाइन का एक `aggressive`
चरण), Stacked Pipeline वह तरीका है जिससे Stacked मोड चलता है, Cache-Aware Compression
कैशिंग प्रदाताओं के लिए `aggressive` और `ultra` को `standard` में डाउनग्रेड करता है जब संपीड़न
चालू हो, और Caveman Output Mode तथा Output Styles वैकल्पिक सिस्टम-प्रॉम्प्ट निर्देश हैं,
जो डिफ़ॉल्ट रूप से बंद रहते हैं और अनुरोध को संपीड़ित करने के बजाय मॉडल के आउटपुट को आकार देते हैं।

### कैश-जागरूक संपीड़न

कुछ प्रदाता (जैसे प्रॉम्प्ट कैशिंग के साथ Anthropic) **प्रॉम्प्ट कैशिंग** का समर्थन करते हैं,
जिससे वे लागत और विलंबता कम करने के लिए प्रॉम्प्ट के कुछ हिस्सों को कैश कर सकते हैं। जब
कैशिंग सक्षम होती है, तो आक्रामक संपीड़न वास्तव में प्रदर्शन को **नुकसान** पहुँचा सकता है
क्योंकि यह कैश किए गए टोकन बदल देता है, जिससे कैश अमान्य हो जाता है।

`cachingAware.ts` मॉड्यूल **कैशिंग संदर्भ का पता लगाकर** और
उसके अनुसार **संपीड़न रणनीति समायोजित करके** इस समस्या को हल करता है।

#### यह कैसे काम करता है

1. **कैशिंग संदर्भ का पता लगाएँ** — `cache_control` चिह्नकों के लिए अनुरोध बॉडी को स्कैन करता है
2. **कैशिंग प्रदाताओं की पहचान करें** — जाँचता है कि लक्षित प्रदाता कैशिंग का समर्थन करता है या नहीं
3. **रणनीति समायोजित करें** — कैशिंग प्रदाताओं के लिए `aggressive`/`ultra` को `standard` में डाउनग्रेड करता है
4. **सिस्टम प्रॉम्प्ट छोड़ें** — सिस्टम प्रॉम्प्ट आमतौर पर कैश किए जाते हैं, इसलिए उन्हें संपीड़ित न करें

रणनीति सहायक एक `deterministicOnly` फ़्लैग भी लौटाता है, लेकिन योजना निर्माता
केवल रणनीति का उपयोग करता है — वर्तमान में आगे की प्रक्रिया में कोई भी इस फ़्लैग को नहीं पढ़ता।

#### कोड उदाहरण

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← कैश चिह्नक
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### कब उपयोग करें

कैश-जागरूक संपीड़न **हमेशा चालू** रहता है — किसी कॉन्फ़िगरेशन की आवश्यकता नहीं है। यह तब सक्रिय होता है जब
संपीड़न चालू हो और लक्षित प्रदाता प्रॉम्प्ट कैशिंग का समर्थन करता हो (Anthropic, OpenAI,
आदि); स्पष्ट `cache_control` चिह्नकों की आवश्यकता नहीं होती — अकेला कैशिंग प्रदाता ही
डाउनग्रेड को सक्रिय कर देता है, और केवल चिह्नक कभी ऐसा नहीं करते (चिह्नक पहचान कैश
टेलीमेट्री को जानकारी देती है, रणनीति संबंधी निर्णय को नहीं)।

### प्रगतिशील एजिंग

लंबी बातचीत में संदेशों के कई क्रम जमा हो जाते हैं, लेकिन पुराने क्रम कम
प्रासंगिक होते जाते हैं। `progressiveAging.ts` मॉड्यूल **क्रम की दूरी के आधार पर संदेशों को सरल बनाता है**
(दूरी बातचीत के अंत से मापी जाती है)। दिए गए डिफ़ॉल्ट मानों
(`verbatim: 2, light: 2, moderate: 3`) के साथ:

- **अंतिम 2 क्रम (दूरी ≤ 2)**: यथावत रखे जाते हैं
- **दूरी 3**: Caveman संपीड़न (अनावश्यक शब्द हटाना)
- **दूरी 4+**: सहायक के संदेशों का सारांश बनाया जाता है; उपयोगकर्ता के संदेश उनकी पहली
  पंक्ति तक सीमित कर दिए जाते हैं, जिसकी सीमा 120 वर्ण है; अन्य भूमिकाएँ अछूती रहती हैं। सिस्टम प्रॉम्प्ट, पहले से एज किए गए
  संदेश और नवीनतम उपयोगकर्ता संदेश दूरी की परवाह किए बिना हमेशा यथावत रखे जाते हैं।
  कुछ भी पूरी तरह हटाया नहीं जाता, और दिए गए डिफ़ॉल्ट मानों के साथ `light`
  बैंड तक पहुँचना संभव नहीं है (`light`, `verbatim` के बराबर है)।

#### कोड उदाहरण

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 और क्रम ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // अंतिम 3 क्रम: यथावत
  light: 8, // दूरी <= 8: हल्का संपीड़न
  moderate: 20, // दूरी <= 20: caveman संपीड़न
  fullSummary: 5, // प्रकार के लिए आवश्यक, बैंडिंग कोड द्वारा नहीं पढ़ा जाता
  // दूरी > 20: सारांशित (सहायक) / पहली पंक्ति रखी जाती है (उपयोगकर्ता)
});

// saved = बचाए गए टोकन की संख्या
```

#### कब उपयोग करें

प्रगतिशील एजिंग `aggressive` मोड के लिए **हमेशा चालू** रहती है — यह
`compressAggressive()` का चरण 2 है। Ultra मोड इसे नहीं चलाता। यह
विशेष रूप से इनके लिए प्रभावी है:

- लंबे समय तक चलने वाले कोडिंग सत्र
- कई दिनों तक चलने वाली बातचीत
- अनेक टूल कॉल वाले एजेंटिक वर्कफ़्लो

### Caveman आउटपुट मोड

Caveman आउटपुट मोड **सिस्टम प्रॉम्प्ट निर्देश** जोड़ता है, जो मॉडल से ही
संक्षिप्त आउटपुट माँगते हैं — `lite` स्तर पूर्ण वाक्य बनाए रखने वाले संक्षिप्त उत्तर माँगता है, `full`
उससे "चतुर आदिमानव की तरह संक्षिप्त उत्तर देने" को कहता है, और `ultra` टेलीग्राफ़िक आउटपुट माँगता है;
निर्देश केवल अनुरोध करते हैं, वे इसकी गारंटी नहीं दे सकते। अनुरोध इन्हें
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) के माध्यम से प्राप्त करते हैं:
`open-sse/handlers/chatCore.ts` पहले बैक-कम्पैट शिम
(`resolveOutputStyleSelection()` जो
`open-sse/services/compression/outputStyles/backCompat.ts` में है) के साथ चयन का समाधान करता है, जो `outputStyles`
खाली होने पर सक्षम `cavemanOutputMode` को
`cavemanOutputMode.intensity` पर `terse-prose` आउटपुट शैली में मैप करता है (नीचे Back-compat देखें); गैर-रिक्त `outputStyles`
चयन को यथावत उपयोग किया जाता है, और तब `cavemanOutputMode.enabled` तथा `intensity` का कोई
प्रभाव नहीं पड़ता, जबकि इसका `autoClarity` टॉगल फिर भी लागू होता है। `outputMode.ts` में
निर्देश पाठ (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), सामग्री बायपास और
इंजेक्शन द्वारा उपयोग किया जाने वाला प्लेसमेंट सहायक मौजूद है; इसके अपने `applyCavemanOutputMode()` इंजेक्टर का कोई
प्रोडक्शन कॉलर नहीं है।

#### यह कैसे काम करता है

यह मोड इनपुट को संपीड़ित नहीं करता। यह system prompt में एक निर्देश ब्लॉक जोड़ता है
(नीचे इंजेक्शन कैसे काम करता है देखें), और अनुरोध के लिए चुना गया कोई भी इनपुट संपीड़न मोड
इसके बाद भी उस बॉडी पर चलता है जिसमें अब यह ब्लॉक मौजूद है। उस साझा
सीमा खंड से पहले, जिस पर प्रत्येक स्तर समाप्त होता है, अंग्रेज़ी `full` स्तर में लिखा है:

> "चतुर आदिमानव की तरह संक्षिप्त उत्तर दें। उपपद (a/an/the), अनावश्यक शब्द (just/really/basically/actually/simply), शिष्टाचार, अनिश्चितता-सूचक भाषा हटाएँ। वाक्यांश स्वीकार्य हैं। छोटे पर्यायवाची शब्द चुनें (extensive नहीं, big; implement नहीं, fix)। सभी तकनीकी विवरण, code, errors, URLs, identifiers हूबहू रखें।"

यह विशेष रूप से इनके लिए अच्छा काम करता है:

- कोड निर्माण (अधिक संक्षिप्त आउटपुट = कम टोकन)
- त्वरित प्रश्नोत्तर (विस्तृत स्पष्टीकरण की आवश्यकता नहीं)
- बैच प्रोसेसिंग (थ्रूपुट अधिकतम करें)

#### कब उपयोग करें

Caveman आउटपुट मोड **वैकल्पिक** है। संपीड़न चालू होने पर (`enabled: true`, Compression Settings पेज पर मुख्य टॉगल
चालू), इसे `cavemanOutputMode.enabled` से चालू करें; `intensity`
`lite`, `full` या `ultra` चुनता है:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

किसी compression combo का **Output Mode** टॉगल (`outputMode`, स्तर `outputModeIntensity` में)
उन अनुरोधों के लिए वही स्विच सेट करता है जिन पर वह combo लागू होता है, और
`omniroute_set_compression_engine` MCP टूल अपने boolean `outputMode`
आर्ग्युमेंट के माध्यम से इसे लिखता है। गैर-रिक्त `outputStyles` चयन को इस स्विच पर प्राथमिकता मिलती है।
डैशबोर्ड में, **Terse prose** आउटपुट शैली सक्षम करने पर वही ब्लॉक इंजेक्ट होता है (नीचे Output
Styles देखें)।

### आउटपुट शैलियाँ (कैटलॉग)

ऊपर दिया गया Caveman आउटपुट मोड **पुराना एकल-शैली मार्ग** है। Phase 4 ने इसे
संयोज्य आउटपुट शैलियों के कैटलॉग के रूप में सामान्यीकृत किया: `OUTPUT_STYLE_CATALOG`, जो
`open-sse/services/compression/outputStyles/catalog.ts` में है। प्रत्येक शैली एक system-prompt
निर्देश है, जो मॉडल से स्वयं कम खर्चीला आउटपुट माँगता है; शैलियाँ एक साथ सक्षम की जा सकती हैं
और कैटलॉग क्रम में इंजेक्ट होती हैं।

| शैली                          | `id`            | यह क्या करती है                                                                                                                                                                                                                                     | निर्देश की भाषाएँ                             |
| ----------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| संक्षिप्त गद्य                | `terse-prose`   | अनावश्यक शब्द/उपपद/अनिश्चितता-सूचक भाषा हटाती है; तकनीकी विवरण हूबहू रखती है। पुराने caveman आउटपुट मोड वाला वही टेक्स्ट (संदर्भित, दोबारा टाइप नहीं किया गया)।                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| कम कोड                        | `less-code`     | YAGNI क्रम: सबसे छोटा काम करने वाला बदलाव, बिना माँगे abstractions नहीं।                                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (आलसी वरिष्ठ डेवलपर) | `ponytail`      | "सर्वोत्तम कोड वह कोड है जो कभी लिखा ही न जाए": पुनः उपयोग > पुनर्लेखन, मूल कारण > लक्षण, सबसे छोटा काम करने वाला diff।                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| मुझे ADHD है (कार्रवाई-प्रथम) | `i-have-adhd`   | पहले कार्रवाई (गद्य से पहले command/path/snippet), क्रमांकित सीमित चरण, केवल एक ठोस अगला चरण, कोई भूमिका/पुनरावलोकन/समापन नहीं। [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) से अनुकूलित।                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI फ़िल्टर           | `antislop-ui`   | प्रत्येक दृश्य तकनीक को उद्देश्य परीक्षण (पदानुक्रम, पहचान, पठनीयता) पास करना होगा; कोई डिफ़ॉल्ट gradients/glass/glow नहीं, सीमित पैलेट, कोई template layouts नहीं। दोनों antislop शैलियाँ no-dead-controls / no-fabricated-claims सीमा जोड़ती हैं। | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop कॉपी और मानव फ़िल्टर | `antislop-copy` | विशिष्ट कॉपी (कोई em dash, सामान्य CTAs, buzzwords, chatbot समापन या गढ़े हुए तथ्य नहीं), साथ में लोगों के लिए नियम: WCAG AA contrast, दिखाई देने वाला focus, keyboard पहुँच, empty/loading/error अवस्थाएँ, mobile reflow।                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| संक्षिप्त CJK (文言)          | `terse-cjk`     | `full`/`ultra` उत्तर Classical Chinese (文言) में; `lite` केवल function words, शिष्टाचार या अलंकरण के बिना संक्षिप्त उत्तर माँगता है।                                                                                                               | zh (लोकेल-सीमित, नीचे देखें)                  |

हर शैली में तीन intensity स्तर — `lite`, `full`, `ultra` — होते हैं, और हर स्तर
साझा सीमा खंड (`SHARED_BOUNDARIES`, `outputMode.ts` में) पर समाप्त होता है, जो
code blocks, file paths, commands, errors और URLs को हूबहू रखता है। `terse-prose` और
`terse-cjk` स्तरों के टेक्स्ट इस सूची में identifiers भी जोड़ते हैं।

`terse-cjk` दो स्थानों पर `zh` लोकेल तक सीमित है। Compression Settings पेज
इसकी पंक्ति केवल तभी दिखाता है जब डैशबोर्ड UI की भाषा चीनी (`zh-CN` या `zh-TW`) हो, और
`applyOutputStyles()` इसे केवल तभी इंजेक्ट करता है जब अनुरोध की निर्धारित भाषा (नीचे भाषा
चयन देखें) `zh` हो। पंक्ति छिपाने से सहेजा हुआ `terse-cjk` चयन साफ़ नहीं होता:
settings API किसी भी style id को स्वीकार करता है, और पेज पर अन्य शैलियाँ सहेजने से यह बना रहता है। अनुरोध
के समय, `applyOutputStyles()` की भाषा जाँच ही एकमात्र लोकेल गेट है।

#### इंजेक्शन कैसे काम करता है

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) चयन को
कैटलॉग के अनुसार हल करता है (अज्ञात ids और locale से असंगत शैलियाँ हटा दी जाती हैं,
इसे कभी त्रुटि नहीं माना जाता; जिस चयन से कोई शैली प्राप्त नहीं होती, वह body को
अपरिवर्तित छोड़ देता है और `no_styles` के रूप में छोड़ दिया जाता है), चयनित निर्देशों
को कैटलॉग क्रम में जोड़ता है,
सीमाओं वाला खंड **एक बार** जोड़ता है (साथ ही सुरक्षा खंड, `SAFETY_BOUNDARIES` या उसका
अनुवाद, जब `less-code` या `ponytail` चुना गया हो), और block को एकल idempotency marker
(`[OmniRoute Output Styles]`) से शुरू करता है, इसलिए इसे दोबारा लागू करना no-op होता है।
जब हल की गई भाषा (नीचे भाषा चयन देखें) का अनुवाद उपलब्ध होता है, तो अंग्रेज़ी के बजाय
स्थानीयकृत निर्देश डाला जाता है।

गैर-रिक्त `messages` array वाले body पर, idempotency जाँच content bypass से पहले चलती
है: जब `[OmniRoute Output Styles]` marker पहले से शीर्ष-स्तरीय `system` field (एक string
या content-block array) में या string content वाले system message में मौजूद हो, तो body
को `already_applied` के रूप में अपरिवर्तित छोड़ दिया जाता है और कोई keyword जाँच नहीं
चलती। अन्यथा, एक content bypass (`shouldBypassCavemanOutputMode()` जो
`open-sse/services/compression/outputMode.ts` में है) अंतिम तीन messages के text की जाँच
करता है, चाहे उनकी role कुछ भी हो, और जब वह text सुरक्षा, अपरिवर्तनीय कार्रवाई या
स्पष्टीकरण से संबंधित keywords से, या क्रम-संवेदनशील sequence से मेल खाता है, तो पूरे
turn के लिए styles छोड़ देता है: `first`, `then`, `after that`, `before`, `rollback` या
`backup`, जिसके बाद 240 characters के भीतर `delete`, `drop`, `migrate`, `deploy` या
`release` आए। bypass तब चलता है जब **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`, डिफ़ॉल्ट रूप से चालू) चालू हो; toggle बंद करने पर
keyword जाँच छोड़ दी जाती है।

जब bypass turn को आगे जाने देता है, तो `placeSystemInstruction()` (उसी file में), जो
कभी नया `messages[0]` नहीं बनाता, block को निम्न में से मिलने वाले पहले स्थान पर रखता
है:

1. string content वाला आरंभिक system message: block उसके text के बाद जोड़ा जाता है।
2. शीर्ष-स्तरीय `system` field: block को string के text के बाद जोड़ा जाता है, या
   content-block array में नए text block के रूप में जोड़ा जाता है।
3. बाद में आने वाला पहला string content वाला system message: block उसके text के बाद
   जोड़ा जाता है।
4. उपरोक्त में से कोई नहीं: block को `messages` के अंत में एक नए system message में
   रखा जाता है।

`messages` array के बिना (या रिक्त array वाले) body पर कोई content bypass नहीं चलता और
शीर्ष-स्तरीय `system` field नहीं देखी जाती। block को string `instructions` field के
text के बाद जोड़ा जाता है, जब तक उस field में पहले से `[OmniRoute Output Styles]`
marker न हो; उस स्थिति में body को `already_applied` के रूप में अपरिवर्तित छोड़ दिया
जाता है। जब body में string `instructions` field नहीं होती, लेकिन उसमें `input` (एक
string या array) मौजूद होता है, तो block `instructions` बन जाता है और उस field में
मौजूद किसी भी non-string value को प्रतिस्थापित कर देता है। जिस body में न string
`instructions` field हो, न string या array `input`, उसे अपरिवर्तित छोड़ दिया जाता है
और `no_messages` के रूप में छोड़ दिया जाता है।

#### सक्षम करने का तरीका

dashboard में: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles section: प्रत्येक style के लिए एक row,
जिसमें on/off toggle और level selector होता है। compression स्वयं चालू रहने पर styles
डाली जाती हैं (page का master toggle, `enabled`)। **Auto-Clarity Bypass** toggle
**Caveman** page (`/dashboard/context/caveman`) के **Output Mode** card में है।
प्रोग्रामेटिक रूप से, compression config चयन को इस रूप में सहेजता है:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

पिछली संगतता: जब `outputStyles` रिक्त हो, तो legacy
`cavemanOutputMode.enabled` setting, `cavemanOutputMode.intensity` पर `terse-prose`
से map होती है। इसके बाद block `[OmniRoute Output Styles]` marker से शुरू होता है,
जबकि legacy `applyCavemanOutputMode()` injector `[OmniRoute Caveman Output Mode]`
लिखता था। marker के नीचे, text en, pt-BR, es, de, fr, it, ru, id और vi में legacy
injection से मेल खाता है; ja और zh में boundaries clause से पहले एक अतिरिक्त space
होता है। `terse-prose` का pt-BR, es, de, fr, it, ru, zh, ja, id और vi में अनुवाद होता
है, इसलिए जिस request की हल की गई भाषा `hu` है, उसे वहाँ अंग्रेज़ी text मिलता है जहाँ
legacy injector उसका Hungarian text उपयोग करता था।

Output-style भाषा चयन (`resolveOutputStyleLanguage()` जो `outputStyles/apply.ts` में
है): `languageConfig.enabled` चालू होने पर, `autoDetect` request के `messages` array में
text वाले नवीनतम user message (string content, या उसके content parts का `text`) का
sample लेता है और उस पर Caveman engine का detector (`detectCompressionLanguage()`)
चलाता है। detector Han characters और बिना kana वाले text के लिए `zh` लौटाता है; अन्यथा
वह `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` और `id` में से सर्वाधिक hint
matches वाली भाषा लौटाता है, और कोई match न होने पर `en` लौटाता है — जिस text को वह
वर्गीकृत नहीं कर सकता, उसके लिए अंग्रेज़ी मिलती है, `defaultLanguage` कभी नहीं; और
styles में `vi` text शामिल होने के बावजूद `vi` का कभी पता नहीं लगाया जाता। Responses
API body अपने turns को `input` में रखता है, जिसका sample नहीं लिया जाता, इसलिए उसे
`defaultLanguage`, फिर अंग्रेज़ी मिलती है। जब `messages` में किसी user message में
text न हो, या `autoDetect` बंद हो, तो `defaultLanguage` लागू होती है, फिर अंग्रेज़ी।
`languageConfig.enabled` बंद होने पर भाषा अंग्रेज़ी होती है — जब तक request पर कोई
compression combo लागू न हो (request के routing combo को assign किया गया combo, या
built-in stacked pipeline के लिए chatCore द्वारा fallback के रूप में उपयोग किया जाने
वाला default compression combo): combo लागू करने से उस request के लिए
`languageConfig.enabled` चालू हो जाता है और combo के language packs से
`defaultLanguage` set होती है (यदि saved value combo के packs में से एक हो तो वही,
अन्यथा combo का पहला pack, जो डिफ़ॉल्ट रूप से `en` होता है), जबकि saved `autoDetect`
(डिफ़ॉल्ट रूप से चालू) अब भी लागू होता है। Caveman input engine अपने rule-pack की भाषा
अलग तरीके से चुनता है — प्रत्येक text part के अनुसार और, auto-detect बंद होने पर,
`enabledPacks` द्वारा gated।

शैली × भाषा मैट्रिक्स को
`tests/unit/compression/output-styles-i18n-matrix.test.ts` द्वारा निर्धारित किया जाता है: प्रत्येक कैटलॉग शैली के लिए परीक्षण के `BASELINE_LANGUAGES` में एक प्रविष्टि आवश्यक है; जो शैली locale-gated नहीं है, उसके साथ pt-BR अनुवाद दिया जाना चाहिए (locale-gated `terse-cjk` को इस नियम से छूट है), जब तक कि वह `KNOWN_ENGLISH_ONLY` में सूचीबद्ध न हो, जिसमें केवल ऐसी शैलियाँ हो सकती हैं जिनका कोई अनुवाद नहीं है — यदि सूचीबद्ध शैली का कोई भी अनुवाद है, तो परीक्षण विफल हो जाता है; और जब कोई शैली ऐसी भाषा खो देती है जो उसकी `BASELINE_LANGUAGES` प्रविष्टि में सूचीबद्ध है, तो वह परीक्षण में विफल हो जाती है। शैली जोड़ने के लिए,
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) देखें।

### टूल परिणाम संपीड़न

`open-sse/services/compression/toolResultCompressor.ts` में `compressToolResult()`
टूल-परिणाम टेक्स्ट को **5 रणनीतियों** से संपीड़ित करता है। यह उन्हें इसी क्रम में आज़माता है, और जिस पहली सक्षम रणनीति की जाँच सामग्री से मेल खाती है, वही परिणाम निर्धारित करती है:

1. **`fileContent`**: 3 या अधिक पंक्तियों वाली ऐसी सामग्री, जिसमें कम-से-कम एक पंक्ति, आरंभिक इंडेंटेशन को अनदेखा करने पर, `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` या `return ` (कीवर्ड और उसके बाद एक स्पेस) से शुरू होती है, अथवा `if`,
   `for` या `while` के बाद `(` या ` (` आता है, उसकी पहली 20 और अंतिम 5 पंक्तियाँ रखती है तथा हटाए गए मध्य भाग को चिह्नित करती है।
2. **`grepSearch`**: ऐसी सामग्री जिसमें `<path>:<digits>:` के रूप वाली कम-से-कम एक पंक्ति हो,
   जहाँ पहले कोलन से पहले के टेक्स्ट में कोई व्हाइटस्पेस न हो, केवल उन्हीं पंक्तियों को रखती है, अधिकतम 30 तक, और उनके बाद शेष मेलों की संख्या तथा मेल खाने वाली फ़ाइलों की सूची देती है;
   हर दूसरी पंक्ति हटा दी जाती है। रणनीति को सक्रिय करने के लिए ऐसी एक पंक्ति पर्याप्त है, इसलिए
   `12:30:45` जैसे टाइमस्टैम्प से शुरू होने वाली लॉग पंक्ति भी मेल मानी जाती है।
3. **`shellOutput`**: ऐसा आउटपुट जिसमें ANSI CSI अनुक्रम (`ESC[` के बाद अंक या
   सेमीकोलन और फिर एक अक्षर, जैसे रंग कोड में) हो या टेक्स्ट में कहीं भी `$` के बाद व्हाइटस्पेस हो, उन अनुक्रमों को हटा देता है (अन्य एस्केप, जैसे `ESC[?25l` या
   OSC विंडो-शीर्षक अनुक्रम, रखे जाते हैं) और उसकी अंतिम 50 पंक्तियाँ रखता है, जबकि लगातार दोहराई गई पंक्तियों को समेट देता है। क्योंकि यह जाँच `json` और `errorMessage` से पहले चलती है,
   ऐसा JSON या त्रुटि आउटपुट जिसमें ऐसा `$` हो, `shellOutput` चालू रहने पर कभी उन तक नहीं पहुँचता।
4. **`json`**: 2,000 वर्णों से बड़ा ऐसा JSON पेलोड, जो वैकल्पिक व्हाइटस्पेस के बाद `{` या `[` से शुरू होता है और सफलतापूर्वक पार्स होता है, संक्षेपित किया जाता है: 7 से अधिक आइटम वाली सरणी अपने पहले 5 और अंतिम 2 आइटम तथा कुल संख्या रखती है, और ऑब्जेक्ट अपनी पहली 20
   कुंजियाँ रखता है, जहाँ प्रत्येक नेस्टेड ऑब्जेक्ट या सरणी मान को `{…N keys}` प्लेसहोल्डर
   (सरणी के लिए, N उसकी लंबाई है) से बदल दिया जाता है और पहली 20 के बाद हटाई गई कुंजियों की गणना करने वाला `_remaining_<N>_keys` मार्कर जोड़ा जाता है। स्केलर मान पूरे कॉपी किए जाते हैं, इसलिए 20 या उससे कम कुंजियों वाला ऐसा ऑब्जेक्ट जिसमें कोई नेस्टेड मान नहीं है, केवल फिर से इंडेंट किया जाता है — मिनिफ़ाइड ऑब्जेक्ट में वर्ण बढ़ जाते हैं और वह अपरिवर्तित रहता है।
5. **`errorMessage`**: ऐसा आउटपुट जिसमें कहीं भी और अक्षरों के किसी भी केस में `error:`,
   `error ` (शब्द के बाद स्पेस, जैसे `no error found` में), `[error]`,
   `exception:`, `exception `, `[exception]` या `traceback` हो, उसकी पहली पंक्ति,
   अगली 10 पंक्तियाँ और अंतिम 3 पंक्तियाँ रखता है, तथा उनके बीच की पंक्तियों के स्थान पर `… [N frames elided] …` मार्कर लगाता है। मार्कर केवल तभी दिखाई देता है जब पहली पंक्ति के बाद 13 से अधिक पंक्तियाँ हों, इसलिए 14 या उससे कम पंक्तियों वाला त्रुटि आउटपुट छोटा नहीं किया जाता (12 या 13 पंक्तियों पर अंतिम 3 पंक्तियाँ पहले से रखी गई पंक्तियों को दोहराती हैं)।

किसी रणनीति के मेल खाने के बाद, भले ही उससे कुछ भी बचत न हो, बाद की रणनीतियाँ नहीं आज़माई जातीं। जब मेल खाने वाली रणनीति से अनुमानित टोकनों (लंबाई ÷ 4, ऊपर की ओर पूर्णांकित) की कोई बचत नहीं होती —
उदाहरण के लिए 25 या उससे कम पंक्तियों वाली कोड-जैसी फ़ाइल, या 2,000 से अधिक
वर्णों वाली ऐसी JSON सरणी जिसमें 7 या उससे कम आइटम हों — तो aggressive इंजन मूल टूल
परिणाम को रखता है: दोनों कॉलर (`compressAggressive()` और `compressAnthropicToolResultBlock()`)
` saved` 0 या उससे कम होने पर मूल परिणाम रखते हैं, जबकि `compressToolResult()` स्वयं फिर भी
उस रणनीति का आउटपुट लौटाता है। टूल-परिणाम चरण अंतिम निर्णय नहीं है: इंजन का फ़ॉलबैक सारांशकर्ता अब भी 8,192 वर्णों से लंबे `tool` या `function` संदेश (`maxTokensPerMessage`, 2,048, गुणा 4) को छोटा कर सकता है।

#### कब उपयोग करें

टूल परिणाम संपीड़न aggressive इंजन का चरण 1 है (`open-sse/services/compression/aggressive.ts` में `compressAggressive()`), इसलिए यह Aggressive मोड में और स्टैक्ड पाइपलाइन के `aggressive` चरण में चलता है। यह OpenAI-आकार वाले `tool` और `function`
संदेशों तथा Anthropic `tool_result` ब्लॉक के भीतर के टेक्स्ट को संपीड़ित करता है। प्रत्येक रणनीति का `aggressive.toolStrategies` के अंतर्गत अपना स्विच है, और सभी डिफ़ॉल्ट रूप से चालू हैं। डैशबोर्ड में, संपीड़न चालू और डिफ़ॉल्ट मोड Aggressive होने पर स्विच Caveman पृष्ठ के **Advanced** दृश्य में होते हैं।

### स्टैक्ड पाइपलाइन

स्टैक्ड मोड में **कई इंजन क्रम से** चलते हैं — आमतौर पर पहले RTK
(टूल आउटपुट पर 60-90% बचत), फिर शेष टेक्स्ट पर Caveman (~46% इनपुट
बचत)। संयुक्त रूप से, यह **78-95% पात्र सीमा** है (ऊपर Upstream Savings Math
देखें): `1 - (1 - 0.60..0.90) × (1 - 0.46)` का औसत ≈89% है।

#### यह कैसे काम करता है

```
इनपुट (1000 टोकन)
  → RTK (कमांड-सजग फ़िल्टर) → 200 टोकन
    → Caveman (अनावश्यक सामग्री हटाना) → 108 टोकन
  → आउटपुट (108 टोकन, ~89% बचत)
```

#### कब उपयोग करें

स्टैक्ड मोड का उपयोग इनके लिए करें:

- टूल-प्रधान वर्कफ़्लो (एजेंटिक कोडिंग, शोध)
- लागत-संवेदी बैच प्रोसेसिंग
- जब आपको अधिकतम टोकन बचत चाहिए

स्टैक्ड पाइपलाइन को वैश्विक `stackedPipeline` संपीड़न
सेटिंग के माध्यम से, या किसी रूटिंग कॉम्बो को असाइन किए गए नामित संपीड़न कॉम्बो के माध्यम से कॉन्फ़िगर किया जाता है (ऊपर Per-Combo Override देखें) — किसी auto-combo `modePack` के माध्यम से नहीं (वह फ़ील्ड केवल
auto-combo मॉडल चयन के भारों को फिर से समायोजित करता है, और `stacked` एक मान्य पैक नाम नहीं है)।

---

## कंप्रेशन कॉम्बो ओवरराइड

अलग-अलग उपयोग मामलों के लिए व्यवहार को बेहतर ढंग से समायोजित करने हेतु, आप वैश्विक कंप्रेशन मोड को **प्रत्येक कॉम्बो के लिए** ओवरराइड कर सकते हैं:

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

यह इनके लिए उपयोगी है:

- **कोडिंग कॉम्बो**: लंबे सत्रों के लिए `aggressive` मोड का उपयोग करें
- **त्वरित प्रश्नोत्तर कॉम्बो**: तेज़ प्रतिक्रियाओं के लिए `lite` मोड का उपयोग करें
- **अधिक टूल वाले कॉम्बो**: अधिकतम बचत के लिए `stacked` मोड का उपयोग करें
- **प्रोडक्शन कॉम्बो**: कैशिंग प्रदाताओं के लिए ओवरराइड बंद रखें — हमेशा सक्रिय
  कैश-जागरूक समायोजन `aggressive`/`ultra` को स्वचालित रूप से `standard` में डाउनग्रेड कर देता है
  (चयन योग्य `cache-aware` मोड उपलब्ध नहीं है)

---

## यह भी देखें

- [एनवायरनमेंट कॉन्फ़िगरेशन](../reference/ENVIRONMENT.md) — कंप्रेशन एनवायरनमेंट वेरिएबल
- [आर्किटेक्चर गाइड](../architecture/ARCHITECTURE.md) — कंप्रेशन पाइपलाइन की आंतरिक कार्यप्रणाली
- [उपयोगकर्ता गाइड](../guides/USER_GUIDE.md) — कंप्रेशन के साथ शुरुआत करना
- [RTK कंप्रेशन](./RTK_COMPRESSION.md) — RTK फ़िल्टर, ट्रस्ट मॉडल, वेरिफ़ाई गेट, रॉ-आउटपुट रिकवरी
- [कंप्रेशन इंजन](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, डैशबोर्ड
- [कंप्रेशन नियम प्रारूप](./COMPRESSION_RULES_FORMAT.md) — JSON रूल-पैक प्रारूप
- [कंप्रेशन लैंग्वेज पैक](./COMPRESSION_LANGUAGE_PACKS.md) — भाषा-विशिष्ट Caveman नियम
