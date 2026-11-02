# 🗜️ Prompt Compression Guide — OmniRoute (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> पात्र संदर्भावर स्वयंचलितपणे 15-95% बचत करा. झटपट आढाव्यासाठी, [README मधील Compression विभाग](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) पहा.

## आढावा

OmniRoute एक मॉड्युलर प्रॉम्प्ट कॉम्प्रेशन पाइपलाइन कार्यान्वित करते, जी विनंत्या अपस्ट्रीम प्रदात्यांपर्यंत पोहोचण्यापूर्वीच **सक्रियपणे** चालते. याचा अर्थ तुमची टोकन बचत पारदर्शकपणे होते — तुमच्या कार्यप्रवाहात कोणतेही बदल करण्याची आवश्यकता नाही.

```
क्लायंट विनंती
  → कॉम्प्रेशन धोरण निवडक
    → कॉम्बो ओव्हरराइड? → कॉम्बो सेटिंग वापरा
    → स्वयंचलित-ट्रिगर मर्यादा? → स्वयंचलित मोड वापरा
    → डीफॉल्ट मोड? → जागतिक सेटिंग वापरा
    → Off? → कॉम्प्रेशन वगळा
  → निवडलेला कॉम्प्रेशन मोड
    → Off: कॉम्प्रेशन नाही
    → Lite: सुरक्षित व्हाइटस्पेस/फॉरमॅटिंग स्वच्छता (~15%)
    → Standard: Caveman-शैलीतील अनावश्यक शब्द काढणे (~30%)
    → Aggressive: इतिहासाचे कालबाह्यीकरण + सारांशीकरण (~50%)
    → Ultra: ह्युरिस्टिक छाटणी + कोड-ब्लॉक विरळ करणे (~75%)
    → RTK: कमांड-जागरूक टर्मिनल/टूल-आउटपुट फिल्टरिंग (60-90% अपस्ट्रीम श्रेणी)
    → Stacked: क्रमबद्ध मल्टी-इंजिन पाइपलाइन, सहसा आधी RTK आणि नंतर Caveman (78-95% पात्र श्रेणी)
  → कॉम्प्रेस केलेली विनंती → प्रदाता
```

---

## संक्षेपण मोड्स

### बंद

कोणतेही संक्षेपण लागू केले जात नाही. सर्व संदेश न बदलता पुढे जातात.

### लाइट मोड (~15% बचत, <1ms विलंब)

सर्वात सुरक्षित मोड — अर्थात शून्य बदल, फक्त फॉरमॅटिंगची सफाई:

| तंत्र                    | वर्णन                                                  |
| ------------------------ | ------------------------------------------------------ |
| `collapseWhitespace`     | सलग रिकाम्या ओळी आणि शेवटच्या रिकाम्या जागा विलीन करते |
| `dedupSystemPrompt`      | डुप्लिकेट सिस्टम संदेश काढून टाकते                     |
| `compressToolResults`    | वर्बोज टूल/फंक्शन आउटपुट संक्षेपित करते                |
| `removeRedundantContent` | वारंवार आलेल्या सूचना काढून टाकते                      |
| `replaceImageUrls`       | base64 इमेज डेटा URI लहान करते                         |

**यासाठी सर्वोत्तम:** नेहमी चालू ठेवलेला वापर, सुरक्षितता-गंभीर वर्कफ्लो.

### स्टँडर्ड मोड (~30% बचत)

[Caveman](https://github.com/JuliusBrussee/caveman) पासून प्रेरित — अर्थ टिकवत ठेवत भरेचड शब्द आणि वर्बोज वाक्यरचना काढून टाकते:

- भरेचड शब्द काढून टाकते ("please", "I think", "basically", "actually")
- वर्बोज वाक्यांश संक्षिप्त करते ("in order to" → "to", "as a result of" → "because")
- विनम्र टाळाटाळ काढून टाकते ("Would you mind...", "If you could possibly...")
- कोडिंग प्रॉम्प्टसाठी ट्यून केलेले 30+ regex नियम

**यासाठी सर्वोत्तम:** दैनंदिन कोडिंग वर्कफ्लो, खर्च-जागरूक टीम्स.

### अॅग्रेसिव्ह मोड (~50% बचत)

लांब सेशन्ससाठी स्मार्ट हिस्टरी व्यवस्थापन:

- **मेसेज एजिंग** — जुने संदेश क्रमाक्रमाने अधिक संक्षेपित होतात
- **टूल रिझल्ट कॉम्प्रेशन** — लांब टूल आउटपुट छाटले किंवा कमी केले जातात (पहिल्या/शेवटच्या
  ओळी, मॅच-लाइन फिल्टरिंग, JSON की कॉम्पॅक्शन)
- **स्ट्रक्चरल इंटेग्रिटी गार्ड्स** — `tool_use` + `tool_result` जोड्या सुसंगत राहतात याची खात्री करतात
- **कॉन्टेक्स्ट विंडो अवेअरनेस** — प्रत्येक मॉडेलच्या टोकन मर्यादांचा सन्मान करते

**यासाठी सर्वोत्तम:** विस्तारित डीबगिंग सेशन्स, मोठे कोडबेस.

### अल्ट्रा मोड (~75% बचत)

टोकन-गंभीर परिस्थितींसाठी कमाल संक्षेपण:

- **ह्युरिस्टिक प्रुनिंग** — गद्य मजकुराचे स्कोअर-आधारित टोकन प्रुनिंग
- **स्ट्रक्चर प्रिझर्व्हेशन** — फेन्स्ड कोड ब्लॉक्स, इनलाइन कोड, URL आणि आयडेंटिफायर्स
  टोम्बस्टोन केले जातात आणि शब्दशः पुन्हा जोडले जातात, कधीही प्रुन केले जात नाहीत
- **पर्यायी SLM टियर** — कॉन्फिगर केल्यावर छोटे लोकल मॉडेल प्रुनिंग अधिक परिष्कृत करू शकते
- अॅग्रेसिव्ह मोडपासून स्वतंत्र: ते मेसेज एजिंग, टूल-रिझल्ट कॉम्प्रेशन किंवा फॉलबॅक
  समरायझर चालवत नाही (फक्त SLM-टियर अयशस्वी झाल्यासच फॉलबॅक पास अॅग्रेसिव्हमधून
  रूट होऊ शकतो)

**यासाठी सर्वोत्तम:** जेव्हा तुम्ही वारंवार कॉन्टेक्स्ट मर्यादांना तोंड देत असता.

### RTK मोड (60-90% अपस्ट्रीम रेंज)

RTK मोड कोडिंग-एजंट सेशन्समध्ये दिसणाऱ्या वर्बोज टूल आउटपुटसाठी ऑप्टिमाइझ केला आहे:

- `git status`, `git diff`, `git log`, टेस्ट रनर्स, TypeScript/Vite/Webpack बिल्ड्स,
  ESLint/Biome/Prettier, npm audit/इन्स्टॉल्स, Docker लॉग्स, इन्फ्रा आउटपुट आणि जनरल
  शेल आउटपुट यांसारखे कमांड/आउटपुट वर्ग ओळखते
- `open-sse/services/compression/engines/rtk/filters/` मधील JSON फिल्टर पॅक्स लागू करते
- प्रोजेक्ट किंवा ग्लोबल `filters.toml` फाइल्समधून RTK TOML schema v1 फिल्टर्स इम्पोर्ट करते,
  प्रोजेक्ट फाइल्ससाठी इनलाइन-टेस्ट व्हॅलिडेशन आणि ट्रस्ट-गेटिंगसह
- इनलाइन व्हेरिफाय सॅम्पल्ससह 56 बिल्ट-इन फिल्टर्स देते
- ANSI कंट्रोल सीक्वेन्सेस, प्रोग्रेस बार्स, वारंवार ओळी आणि नॉन-अॅक्शनेबल नॉइज काढून टाकते
- फेल्युर्स, एरर्स, वॉर्निंग्ज, बदललेल्या फाइल्स, सारांश आणि लांब आउटपुटचा शेवटचा भाग जतन करते
- ट्रस्ट-गेटेड प्रोजेक्ट फिल्टर्स, ग्लोबल फिल्टर्स आणि पर्यायी रिडॅक्टेड रॉ-आउटपुट रिकव्हरीला सपोर्ट करते

**यासाठी सर्वोत्तम:** शेल, बिल्ड, टेस्ट, git, grep आणि फाइल-आउटपुट ट्रान्सक्रिप्ट्स असलेली एजंट सेशन्स.

### स्टॅक्ड मोड (78-95% पात्र रेंज)

स्टॅक्ड मोड अनेक संक्षेपण इंजिन निर्धारित क्रमाने चालवते. डीफॉल्ट पाइपलाइन अशी आहे:

```txt
RTK -> Caveman
```

हा क्रम प्रथम टर्मिनल/टूल आउटपुट संक्षिप्त ठेवतो, नंतर उरलेल्या नैसर्गिक-भाषा प्रॉम्प्टवर
Caveman सिमँटिक कंडेन्सेशन लागू करतो. स्टॅक्ड पाइपलाइन्स ग्लोबली किंवा रूटिंग कॉम्बोजना
नेमलेल्या कॉम्प्रेशन कॉम्बोजद्वारे कॉन्फिगर करता येतात.

**यासाठी सर्वोत्तम:** मोठे टूल लॉग्स तसेच मानवी सूचना किंवा असिस्टंट सारांश असलेले मिश्र कॉन्टेक्स्ट.

---

## अपस्ट्रीम बचतीचे गणित

OmniRoute दोन स्रोतांमधून मिळणाऱ्या कॉम्प्रेशन बचतीचे दस्तऐवजीकरण करते: अपस्ट्रीम प्रकल्पांचे बेंचमार्क आणि
OmniRoute ची स्वतःची इंजिन रचना.

| स्रोत   | येथे वापरलेली अपस्ट्रीम README मधील संख्या                                                                      |
| ------- | --------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` कमी आउटपुट टोकन, बेंचमार्कमधील सरासरी आउटपुट बचत `65%`, `22-87%` श्रेणी आणि `~46%` इनपुट कॉम्प्रेशन साधन |
| RTK     | कमांड-आउटपुटमध्ये `60-90%` बचत; नमुना सत्रात `~118,000 -> ~23,900` टोकन, म्हणजे `79.7%` बचत (`~80%`)            |

एकमेकांवर आच्छादित होणाऱ्या टूल/कॉन्टेक्स्ट पेलोडसाठी, डीफॉल्ट OmniRoute कॉम्बो इंजिने एकावर एक लावतो:

```txt
RTK -> Caveman
```

एकत्रित बचत गुणाकारात्मक आहे, बेरीजात्मक नाही:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

जेव्हा RTK आणि Caveman दोन्ही एकाच इनपुट/कॉन्टेक्स्ट पेलोडचा आकार कमी करू शकतात, तेव्हा ती `78-95%` संख्या लागू होते.
Caveman चा प्रतिसाद आउटपुट मोड स्वतंत्र आहे: तो सक्षम केलेला असताना, Caveman ची स्वतःची आउटपुट बचत (`65%`
सरासरी, `~75%` प्रमुख दावा, `22-87%` श्रेणी) वापरा. एकूण बिलिंग बचत तुमच्या प्रॉम्प्ट/आउटपुट मिश्रणावर अवलंबून असते.

### "पात्र" असण्याचा नेमका अर्थ काय

15-95% ही प्रमुख श्रेणी वास्तविक आहे, परंतु ती फक्त **पुनरावृत्ती असलेल्या किंवा अनावश्यकरीत्या विस्तृत** मजकुरालाच लागू होते — वारंवार येणाऱ्या
त्रुटी ओळी, तोच इशारा सतत दाखवणारा बिल्ड लॉग, अतिमोठा `grep`/फाइल-रीड डंप. याचा अर्थ
प्रत्येक विनंतीमध्ये इतकी बचत होते असा **नाही**.

प्रत्यक्ष प्रयोगाद्वारे पडताळलेले (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 एकसारख्या
त्रुटी ओळी असलेला Anthropic-स्वरूपाचा `tool_result` ब्लॉक `stacked` (RTK + Caveman) पद्धतीने चालवल्यावर
**95.93% टोकन बचत / 96.26% अक्षर बचत** मिळाली — म्हणजे ती जाहीर केलेल्या श्रेणीत ठामपणे येते.
परंतु हीच पाइपलाइन सामान्य, पुनरावृत्ती नसलेल्या टूल आउटपुटवर (स्वच्छ `grep` जुळणी सूची,
लहान फाइल रीड, सामान्य संभाषणात्मक मजकूर) चालवल्यावर योग्यरीत्या **जवळपास शून्य बचत** मिळते, कारण
काढून टाकण्यासारखी कोणतीही पुनरावृत्ती नसते आणि कोड ब्लॉक, URLs, शीर्षके, आवृत्त्या किंवा ALL-CAPS स्थिरांक आयडेंटिफायर
काढून टाकणारे अथवा बदलणारे पुनर्लेखन पाठवण्यास `validateCompression()` (`validation.ts`) नकार देते.

हे अपेक्षित आणि सुरक्षित वर्तन आहे, बग नाही: बहुतांश वेळा स्वच्छ फाइल्स वाचणारे/grep करणारे कोडिंग सत्र
कॉम्प्रेशन पूर्णपणे सक्षम असतानाही मर्यादित एकूण बचत दर्शवेल, तर अयशस्वी होणाऱ्या
लूपला किंवा अतिशय बोलक्या लिंटरला सामोरे जाणाऱ्या सत्रात त्या ट्रॅफिकवर पूर्ण 78-95% श्रेणीतील बचत दिसेल. कॉम्प्रेशन चुकीच्या पद्धतीने कॉन्फिगर केले आहे याचा पुरावा म्हणून
एकाच सत्रातील कमी एकत्रित बचत टक्केवारी वापरू नका — आधी मूळ
टूल आउटपुटमध्ये खरोखर पुनरावृत्ती होती का ते तपासा.

---

## टोकन बचतीचे दृश्यरूप

```
कॉम्प्रेशनशिवाय:      LLM कडे 47K टोकन पाठवले
Lite सह:              40K टोकन पाठवले          (15% बचत — सुरक्षित, नेहमी सक्रिय)
Standard सह:          33K टोकन पाठवले          (30% बचत — Caveman-शैलीचे नियम)
Aggressive सह:        24K टोकन पाठवले          (50% बचत — एजिंग + सारांशीकरण)
Ultra सह:             12K टोकन पाठवले          (75% बचत — ह्युरिस्टिक छाटणी)
RTK सह:               19K-5K टोकन पाठवले       (कमांड/टूल आउटपुटवर 60-90% बचत)
Stacked सह:           10K-2.5K टोकन पाठवले     (पात्र RTK+Caveman सामग्रीवर 78-95% बचतीची श्रेणी)
```

---

## कॉन्फिगरेशन

### डॅशबोर्ड

`Dashboard → Context & Cache` येथे जा:

- **Caveman** — मोड निवड, भाषा पॅक्स, पूर्वावलोकन आणि जागतिक डीफॉल्ट्स
- **RTK** — कमांड-फिल्टर पूर्वावलोकन, RTK सुरक्षा सेटिंग्ज आणि फिल्टर कॅटलॉग
- **Compression Combos** — रूटिंग कॉम्बोंना नियुक्त केलेल्या नामांकित इंजिन पाइपलाइन्स
- **Auto-Trigger Threshold** — टोकन संख्या मर्यादेपेक्षा जास्त झाल्यास कॉम्प्रेशन स्वयंचलितपणे सुरू करा

### प्रत्येक कॉम्बोसाठी ओव्हरराइड

`Dashboard → Context & Cache → Compression Combos` मध्ये, रूटिंग कॉम्बोला कॉम्प्रेशन कॉम्बो नियुक्त करा:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

यामुळे सशुल्क सबस्क्रिप्शन्सवर लाइट मोड कायम ठेवताना विनामूल्य/कोडिंग प्रोव्हायडर्सवर स्टॅक्ड कॉम्प्रेशन वापरता येते.

हे "Per-Combo Override" असाइनमेंट **routing-combo compression mode** ओव्हरराइडपेक्षा (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — या फील्डचे स्कीमा `rtk`, `stacked` आणि `omniglyph` देखील स्वीकारते) वेगळे नियंत्रण आहे — ते ओव्हरराइड नामांकित कॉम्प्रेशन-कॉम्बो पाइपलाइन निवडत नाही; ते केवळ `resolveCompressionPlan` द्वारे तपासले जाणारे `compressionMode` फील्ड सेट करते. ते कॉम्बो कार्डवर (`Dashboard → Combos`) किंवा #6760 पासून, वर दस्तऐवजीकरण केलेल्या पाइपलाइन-असाइनमेंट चेकबॉक्सच्या अगदी शेजारी `Dashboard → Context & Cache → Compression Combos` वरील "Assign to routing" सूचीमध्ये प्रत्येक रूटिंग कॉम्बोसाठी सेट करता येते. दोन्ही ठिकाणांवरील बदल समान `PUT /api/combos/{id}` एंडपॉइंटद्वारे कायम ठेवले जातात.

### प्रत्येक विनंतीसाठी ओव्हरराइड

एका विनंतीसाठी कॉम्प्रेशन प्लॅन ओव्हरराइड करण्याकरिता `x-omniroute-compression` विनंती हेडर पाठवा. त्याला सर्वोच्च प्राधान्य आहे — तो रूटिंग-कॉम्बो ओव्हरराइड, सक्रिय प्रोफाइल, ऑटो-ट्रिगर आणि पॅनेल Default यांवर मात करतो. अज्ञात मूल्यांकडे दुर्लक्ष केले जाते (विनंती कधीही नाकारली जात नाही) आणि जागतिक मास्टर स्विच तरीही सर्व गोष्टी नियंत्रित करतो: कॉम्प्रेशन जागतिक स्तरावर बंद असताना, हेडर ते सुरू करू शकत नाही. मूल्ये:

| मूल्य         | परिणाम                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `off`         | या विनंतीसाठी कॉम्प्रेशन नाही.                                                                   |
| `default`     | पॅनेलमधून मिळालेले Default प्रोफाइल (सक्रिय प्रोफाइलकडे दुर्लक्ष करते). लॉसी इंजिने बंदच राहतात. |
| `safe`        | हेडर वगळण्यासारखेच: केवळ डीडुप आणि व्हाइटस्पेस फोल्डिंग.                                         |
| `allow-lossy` | सारांश, प्रासंगिकता फिल्टर्स आणि शैली पुनर्लेखनांसह या विनंतीचा ऑपरेटर प्लॅन कायम ठेवा.          |
| `engine:<id>` | सक्षम असताना एकच इंजिन, उदा. `engine:rtk`. त्या इंजिनसाठी हा प्रत्येक विनंतीनुसार ऑप्ट-इन आहे.   |
| `<combo>`     | नामांकित कॉम्बो, प्रथम नावानुसार (केस-असंवेदनशील), नंतर आयडीनुसार जुळवला जातो.                   |

`allow-lossy`, `engine:<id>` किंवा नामांकित कॉम्बोशिवाय, लॉसी इंजिने लागू केली जात नाहीत. कॉम्प्रेशन सुरू असताना विनंतीवर तरीही सेशन डीडुप आणि व्हाइटस्पेस फोल्डिंग लागू होते.

लागू केलेला प्लॅन `X-OmniRoute-Compression: <mode>; source=<source>` प्रतिसाद हेडरमध्ये परत दिला जातो, जिथे `<source>` हे `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` किंवा `off` यांपैकी एक असते.

### API

```bash
# कॉम्प्रेशन सेटिंग्ज मिळवा
curl http://localhost:20128/api/settings/compression

# कॉम्प्रेशन सेटिंग्ज अद्ययावत करा
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# विशिष्ट RTK/stacked पेलोडचे पूर्वावलोकन करा
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK फिल्टर पॅक्सची सूची मिळवा
curl http://localhost:20128/api/context/rtk/filters

# पर्यायी कमांड मेटाडेटासह RTK ची थेट चाचणी करा
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## काय संरक्षित केले जाते

कॉम्प्रेशन इंजिन **नेहमी जतन करते:**

- ✅ कोड ब्लॉक्स (फेन्स्ड आणि इनलाइन)
- ✅ URLs आणि फाइल पाथ्स
- ✅ JSON संरचना आणि संरचित डेटा
- ✅ आयडेंटिफायर्स आणि संरक्षित तांत्रिक टोकन्स
- ✅ गणितीय अभिव्यक्ती
- ✅ टूल/फंक्शन कॉलच्या व्याख्या
- ✅ सिस्टम प्रॉम्प्ट्स (लाइट मोडमध्ये)

काहीही कायमस्वरूपी साठवण्यापूर्वी RTK रॉ-आउटपुट रिकव्हरी सामान्य API कीज, बेअरर टोकन्स, Slack टोकन्स, AWS अॅक्सेस कीज,
पासवर्ड्स, टोकन्स आणि सिक्रेट्स लपवते.

---

## कॉम्प्रेशनची आकडेवारी

प्रत्येक कॉम्प्रेस केलेल्या विनंतीची आकडेवारी सर्व्हर लॉग्समध्ये समाविष्ट असते:

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

## टप्प्यांचा रोडमॅप

| टप्पा    | मोड्स                                                                                                                                              | स्थिती       |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| टप्पा 1  | Off, Lite                                                                                                                                          | ✅ जारी केले |
| टप्पा 2  | Standard, Aggressive, Ultra                                                                                                                        | ✅ जारी केले |
| टप्पा 3  | RTK, Stacked, Compression Combos                                                                                                                   | ✅ जारी केले |
| टप्पा 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                        | ✅ जारी केले |
| टप्पा 4C | अॅडॅप्टिव्ह कॉन्टेक्स्ट-बजेट ("डायल") — कंप्यूट इंजिन + API (`PUT /api/settings/compression` वरील `contextBudget`) + डॅशबोर्ड मोड/पॉलिसी नियंत्रणे | ✅ जारी केले |

---

## आभार

Standard मोडचे कॉम्प्रेशन नियम **[JuliusBrussee](https://github.com/JuliusBrussee)** यांच्या **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) पासून प्रेरित आहेत — हा व्हायरल "अनेक टोकन्स कशाला वापरायचे, जेव्हा काही टोकन्सने काम होते" प्रकल्प आहे. Caveman नुसार `~75%` कमी आउटपुट टोकन्स, बेंचमार्कमध्ये सरासरी `65%` आउटपुट बचत, `22-87%` आउटपुट श्रेणी आणि `~46%` इनपुट-कॉम्प्रेशन टूल मिळते.

RTK मोड **[RTK AI](https://github.com/rtk-ai)** यांच्या **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** पासून प्रेरित आहे — टर्मिनल, बिल्ड, टेस्ट, git आणि टूल-आउटपुट फिल्टरिंगसाठीचा उच्च-कार्यक्षमता कमांड-आउटपुट कॉम्प्रेशन प्रकल्प. RTK नुसार `60-90%` बचत होते, तर त्याच्या README मधील नमुना सत्रात `~80%` बचत दाखवली आहे.

---

## प्रगत संक्षेपण प्रणाली

वर वर्णन केलेल्या 7 मोड्सव्यतिरिक्त (स्रोत `codex-responses` आणि
`omniglyph` मोड्सदेखील स्वीकारतो, परंतु या मार्गदर्शकामध्ये ते समाविष्ट केलेले नाहीत), खालील विभागांमध्ये
त्या मोड्समध्ये किंवा त्यांच्यासोबत कार्य करणारी वैशिष्ट्ये समाविष्ट आहेत: Tool Result Compression आणि Progressive Aging
या आक्रमक इंजिनच्या पायऱ्या 1 आणि 2 आहेत (Aggressive मोड आणि स्टॅक केलेल्या
पाइपलाइनची `aggressive` पायरी), Stacked Pipeline ही Stacked मोड चालण्याची पद्धत आहे, Cache-Aware Compression
कॅशिंग प्रदात्यांसाठी संक्षेपण सुरू असताना `aggressive` आणि `ultra` यांना `standard` पर्यंत
खाली आणते, आणि Caveman Output Mode व Output Styles या ऐच्छिक प्रणाली-प्रॉम्प्ट सूचना आहेत,
ज्या डीफॉल्टनुसार बंद असतात आणि विनंती संक्षेपित करण्याऐवजी मॉडेलचे आउटपुट घडवतात.

### कॅश-जागरूक संक्षेपण

काही प्रदाते (उदा. प्रॉम्प्ट कॅशिंगसह Anthropic) **प्रॉम्प्ट कॅशिंगला**
समर्थन देतात, ज्यामुळे खर्च आणि विलंब कमी करण्यासाठी ते प्रॉम्प्टचे काही भाग कॅश करू शकतात. जेव्हा
कॅशिंग सक्षम असते, तेव्हा आक्रमक संक्षेपण प्रत्यक्षात कार्यप्रदर्शनाला **हानी पोहोचवू** शकते,
कारण ते कॅश केलेली टोकन्स बदलते आणि त्यामुळे कॅश अवैध होते.

`cachingAware.ts` मॉड्यूल **कॅशिंग संदर्भ शोधून** आणि
त्यानुसार **संक्षेपण धोरण समायोजित करून** ही समस्या सोडवते.

#### हे कसे कार्य करते

1. **कॅशिंग संदर्भ शोधणे** — विनंती बॉडीमध्ये `cache_control` मार्कर्स शोधते
2. **कॅशिंग प्रदाते ओळखणे** — लक्ष्य प्रदाता कॅशिंगला समर्थन देतो का ते तपासते
3. **धोरण समायोजित करणे** — कॅशिंग प्रदात्यांसाठी `aggressive`/`ultra` यांना `standard` पर्यंत खाली आणते
4. **सिस्टम प्रॉम्प्ट वगळणे** — सिस्टम प्रॉम्प्ट्स सहसा कॅश केलेले असतात, त्यामुळे ते संक्षेपित करू नका

धोरण सहाय्यक एक `deterministicOnly` फ्लॅगदेखील परत करतो, परंतु प्लॅन बिल्डर केवळ
धोरण वापरतो — सध्या पुढील प्रक्रियेत कुठेही हा फ्लॅग वाचला जात नाही.

#### कोड उदाहरण

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← कॅश मार्कर
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### कधी वापरावे

कॅश-जागरूक संक्षेपण **नेहमी सुरू असते** — कोणत्याही संरचनेची आवश्यकता नाही. जेव्हा
संक्षेपण सुरू असते आणि लक्ष्य प्रदाता प्रॉम्प्ट कॅशिंगला समर्थन देतो (Anthropic, OpenAI,
इत्यादी), तेव्हा ते सक्रिय होते; स्पष्ट `cache_control` मार्कर्स आवश्यक नसतात — केवळ कॅशिंग प्रदाता
असल्याने डाउनग्रेड सुरू होते, आणि केवळ मार्कर्स असल्याने ते कधीही सुरू होत नाही (मार्कर शोध
धोरणात्मक निर्णयाऐवजी कॅश टेलिमेट्रीसाठी माहिती पुरवतो).

### प्रगतीशील एजिंग

दीर्घ संभाषणांमध्ये अनेक संदेश-फेऱ्या जमा होतात, परंतु जुन्या फेऱ्या कमी
संबंधित होत जातात. `progressiveAging.ts` मॉड्यूल **फेरीच्या अंतरानुसार संदेशांचे तपशील कमी करते**
(अंतर संभाषणाच्या शेवटापासून मोजले जाते). पुरवलेल्या डीफॉल्ट्ससह
(`verbatim: 2, light: 2, moderate: 3`):

- **शेवटच्या 2 फेऱ्या (अंतर ≤ 2)**: जशाच्या तशा ठेवल्या जातात
- **अंतर 3**: Caveman संक्षेपण (अनावश्यक मजकूर काढणे)
- **अंतर 4+**: सहाय्यकाच्या संदेशांचा सारांश केला जातो; वापरकर्त्याचे संदेश त्यांच्या पहिल्या
  ओळीपुरते कमी केले जातात, कमाल मर्यादा 120 वर्ण; इतर भूमिका बदलल्या जात नाहीत. सिस्टम प्रॉम्प्ट्स, आधीच एजिंग
  केलेले संदेश आणि वापरकर्त्याचा सर्वात अलीकडील संदेश अंतर कितीही असले तरी नेहमी जशाच्या तशा ठेवले जातात.
  काहीही पूर्णपणे वगळले जात नाही, आणि पुरवलेल्या डीफॉल्ट्ससह `light`
  बँडपर्यंत पोहोचता येत नाही (`light` हे `verbatim` च्या बरोबरीचे आहे).

#### कोड उदाहरण

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... आणखी 50 फेऱ्या ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // शेवटच्या 3 फेऱ्या: जशाच्या तशा
  light: 8, // अंतर <= 8: हलके संक्षेपण
  moderate: 20, // अंतर <= 20: caveman संक्षेपण
  fullSummary: 5, // प्रकारासाठी आवश्यक, बँडिंग कोडद्वारे वाचले जात नाही
  // अंतर > 20: सारांशित (assistant) / पहिली ओळ ठेवली जाते (user)
});

// saved = वाचवलेल्या टोकन्सची संख्या
```

#### कधी वापरावे

प्रगतीशील एजिंग `aggressive` मोडसाठी **नेहमी सुरू असते** — ही
`compressAggressive()` ची पायरी 2 आहे. Ultra मोड ते चालवत नाही. हे विशेषतः
खालील बाबींसाठी प्रभावी आहे:

- दीर्घकाळ चालणारी कोडिंग सत्रे
- अनेक दिवसांची संभाषणे
- अनेक टूल कॉल्स असलेले एजंटिक कार्यप्रवाह

### Caveman आउटपुट मोड

Caveman आउटपुट मोड अशा **सिस्टम प्रॉम्प्ट सूचना** जोडतो ज्या मॉडेललाच
संक्षिप्त आउटपुट देण्यास सांगतात — `lite` स्तर पूर्ण वाक्ये कायम ठेवून संक्षिप्त उत्तरे देण्यास सांगतो, `full`
त्याला "हुशार आदिमानवासारखे संक्षिप्त उत्तर द्या" असे सांगतो, आणि `ultra` तारसंदेशासारखे आउटपुट देण्यास सांगतो;
सूचना केवळ विनंती करतात, त्याची हमी देऊ शकत नाहीत. विनंत्यांना त्या
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) द्वारे मिळतात:
`open-sse/handlers/chatCore.ts` प्रथम बॅकवर्ड-कम्पॅटिबिलिटी शिमसह निवड निश्चित करते
(`open-sse/services/compression/outputStyles/backCompat.ts` मधील `resolveOutputStyleSelection()`), जे `outputStyles`
रिक्त असताना, सक्षम केलेल्या `cavemanOutputMode` ला
`cavemanOutputMode.intensity` वरील `terse-prose` आउटपुट शैलीशी मॅप करते (खालील बॅकवर्ड-कम्पॅटिबिलिटी पहा); रिक्त नसलेली `outputStyles`
निवड जशी आहे तशी वापरली जाते, आणि त्यानंतर `cavemanOutputMode.enabled` व `intensity` यांचा कोणताही
परिणाम होत नाही, तर त्याचे `autoClarity` टॉगल मात्र लागू राहते. `outputMode.ts` मध्ये
सूचनांचा मजकूर (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), आशय बायपास आणि
इंजेक्शनद्वारे वापरला जाणारा स्थाननिश्चिती सहाय्यक आहे; त्याच्या स्वतःच्या `applyCavemanOutputMode()` इंजेक्टरला कोणताही
प्रॉडक्शन कॉलर नाही.

#### हे कसे कार्य करते

हा मोड इनपुट संक्षिप्त करत नाही. तो system prompt मध्ये एक सूचना ब्लॉक जोडतो
(खालील इंजेक्शन कसे कार्य करते ते पाहा), आणि विनंतीसाठी निवडलेला कोणताही इनपुट संक्षिप्तीकरण मोड
नंतरही, आता हा ब्लॉक असलेल्या मुख्य मजकुरावर चालतो. प्रत्येक स्तराच्या शेवटी येणाऱ्या सामायिक
मर्यादा कलमाच्या आधी, इंग्रजी `full` स्तरामध्ये असे लिहिले आहे:

> "हुशार आदिमानवासारखे संक्षिप्त उत्तर द्या. उपपदे (a/an/the), निरर्थक भर (just/really/basically/actually/simply), औपचारिक सौजन्य, संदिग्ध भाषा वगळा. वाक्यांश चालतील. लहान समानार्थी शब्द वापरा (extensive ऐवजी big, implement ऐवजी fix). सर्व तांत्रिक आशय, कोड, त्रुटी, URLs, identifiers तंतोतंत ठेवा."

हे विशेषतः पुढील गोष्टींसाठी चांगले कार्य करते:

- कोड निर्मिती (अधिक संक्षिप्त आउटपुट = कमी टोकन)
- जलद प्रश्नोत्तरे (सविस्तर स्पष्टीकरणांची गरज नाही)
- बॅच प्रक्रिया (थ्रूपुट कमाल करा)

#### कधी वापरावे

आदिमानव आउटपुट मोड **ऐच्छिक** आहे. संक्षिप्तीकरण सुरू असताना (`enabled: true`, Compression Settings पृष्ठावरील मुख्य टॉगल
सुरू), तो `cavemanOutputMode.enabled` वापरून सुरू करा; `intensity`
`lite`, `full` किंवा `ultra` निवडते:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

संक्षिप्तीकरण कॉम्बोचा **आउटपुट मोड** टॉगल (`outputMode`, `outputModeIntensity` मधील स्तर)
तो कॉम्बो ज्या विनंत्यांना लागू होतो त्यांच्यासाठी हाच स्विच सेट करतो, आणि
`omniroute_set_compression_engine` MCP साधन त्याच्या boolean `outputMode`
युक्तिवादाद्वारे तो लिहिते. रिक्त नसलेल्या `outputStyles` निवडीला या स्विचपेक्षा प्राधान्य मिळते.
डॅशबोर्डमध्ये, **संक्षिप्त गद्य** आउटपुट शैली सक्षम केल्यास हाच ब्लॉक इंजेक्ट होतो (खालील आउटपुट
शैली पाहा).

### आउटपुट शैली (कॅटलॉग)

वरील आदिमानव आउटपुट मोड हा **जुना एकल-शैली मार्ग** आहे. Phase 4 ने त्याचे
संयोजनीय आउटपुट शैलींच्या कॅटलॉगमध्ये सामान्यीकरण केले: `open-sse/services/compression/outputStyles/catalog.ts` मधील
`OUTPUT_STYLE_CATALOG`. प्रत्येक शैली ही system-prompt सूचना आहे जी मॉडेललाच कमी खर्चिक आउटपुट देण्यास
सांगते; शैली एकत्रितपणे सक्षम करता येतात आणि कॅटलॉग क्रमाने इंजेक्ट केल्या जातात.

| शैली                            | `id`            | ती काय करते                                                                                                                                                                                                                                              | सूचनांच्या भाषा                               |
| ------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| संक्षिप्त गद्य                  | `terse-prose`   | निरर्थक भर/उपपदे/संदिग्ध भाषा वगळा; तांत्रिक आशय तंतोतंत ठेवा. जुन्या आदिमानव आउटपुट मोडसारखाच मजकूर (पुन्हा टाइप न करता संदर्भित).                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| कमी कोड                         | `less-code`     | YAGNI श्रेणी: सर्वांत लहान कार्यरत बदल, न मागितलेली अमूर्तता नाही.                                                                                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| पोनीटेल (आळशी वरिष्ठ विकसक)     | `ponytail`      | "सर्वोत्तम कोड म्हणजे कधीही न लिहिलेला कोड": पुनर्वापर > पुनर्लेखन, मूळ कारण > लक्षण, सर्वांत लहान कार्यरत diff.                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| मला ADHD आहे (कृती-प्रथम)       | `i-have-adhd`   | आधी कृती (गद्यापूर्वी command/path/snippet), क्रमांकित मर्यादित पायऱ्या, एकच ठोस पुढील पाऊल, प्रस्तावना/सारांश/समारोप नाही. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) वरून रूपांतरित.                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI फिल्टर              | `antislop-ui`   | प्रत्येक दृश्य तंत्राने उद्देश चाचणी उत्तीर्ण केली पाहिजे (श्रेणीक्रम, ओळख, वाचनीयता); डीफॉल्ट gradients/glass/glow नाहीत, मर्यादित पॅलेट, टेम्पलेट मांडणी नाही. दोन्ही antislop शैली निष्क्रिय नियंत्रणे नसावीत / बनावट दावे नसावेत अशी मर्यादा जोडतात. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop मजकूर आणि मानवी फिल्टर | `antislop-copy` | विशिष्ट मजकूर (em dash, सर्वसाधारण CTAs, buzzwords, chatbot समारोप, बनवलेली तथ्ये नाहीत) तसेच लोकांसाठी नियम: WCAG AA contrast, दृश्यमान focus, keyboard पोहोच, रिक्त/loading/error अवस्था, mobile reflow.                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| संक्षिप्त CJK (文言)            | `terse-cjk`     | `full`/`ultra` उत्तर Classical Chinese (文言) मध्ये; `lite` फक्त कार्यात्मक शब्द, औपचारिक सौजन्य किंवा अलंकरण नसलेली संक्षिप्त उत्तरे मागते.                                                                                                             | zh (locale-gated, खाली पाहा)                  |

प्रत्येक शैलीसोबत तीन तीव्रता स्तर मिळतात — `lite`, `full`, `ultra` — आणि प्रत्येक स्तर
सामायिक मर्यादा कलमाने (`outputMode.ts` मधील `SHARED_BOUNDARIES`) संपतो, जे
कोड ब्लॉक, फाइल पथ, आदेश, त्रुटी आणि URLs तंतोतंत ठेवते. `terse-prose` आणि
`terse-cjk` स्तरांचे मजकूर त्या यादीत identifiers जोडतात.

`terse-cjk` हे दोन ठिकाणी `zh` साठी locale-gated आहे. Compression Settings पृष्ठावर
डॅशबोर्ड UI भाषा चिनी (`zh-CN` किंवा `zh-TW`) असेल तेव्हाच त्याची ओळ दाखवली जाते, आणि
विनंतीची निर्धारित भाषा (खालील भाषा निवड पाहा) `zh` असेल तेव्हाच
`applyOutputStyles()` ते इंजेक्ट करते. ओळ लपवल्याने जतन केलेली `terse-cjk` निवड साफ होत नाही:
settings API कोणताही शैली id स्वीकारते, आणि पृष्ठावर इतर शैली जतन केल्याने ती टिकून राहते. विनंतीच्या
वेळी, `applyOutputStyles()` ची भाषा तपासणी हेच एकमेव locale gate आहे.

#### इंजेक्शन कसे कार्य करते

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) निवडीचे कॅटलॉगशी निराकरण करते (अज्ञात ids आणि locale न जुळणाऱ्या शैली वगळल्या जातात, त्या कधीही त्रुटी मानल्या जात नाहीत; ज्या निवडीचे निराकरण कोणत्याही शैलीत होत नाही ती body अपरिवर्तित ठेवते आणि `no_styles` म्हणून वगळली जाते), निवडलेल्या सूचना कॅटलॉगच्या क्रमाने जोडते,
boundaries clause **फक्त एकदाच** जोडते (तसेच `less-code` किंवा `ponytail` निवडले असल्यास safety clause, `SAFETY_BOUNDARIES` किंवा त्याचे भाषांतर) आणि block ची सुरुवात एकाच idempotency marker ने (`[OmniRoute Output Styles]`) करते, त्यामुळे ते पुन्हा लागू करणे no-op असते. निराकरण केलेल्या भाषेसाठी (खालील Language selection पाहा) भाषांतर उपलब्ध असल्यास, इंग्रजीऐवजी स्थानिकीकरण केलेली सूचना अंतर्भूत केली जाते.

रिक्त नसलेला `messages` array असलेल्या body वर, idempotency तपासणी content bypass च्या आधी चालते: `[OmniRoute Output Styles]` marker आधीच top-level `system` field मध्ये (string किंवा content-block array) किंवा string content असलेल्या system message मध्ये असल्यास, body `already_applied` म्हणून अपरिवर्तित ठेवली जाते आणि keyword तपासणी चालत नाही.
अन्यथा content bypass (`open-sse/services/compression/outputMode.ts` मधील `shouldBypassCavemanOutputMode()`) शेवटच्या तीन messages चा मजकूर तपासतो, त्यांची role कोणतीही असो, आणि तो मजकूर त्यातील security, irreversible-action किंवा clarification keywords शी जुळल्यास, किंवा क्रम-संवेदनशील sequence शी जुळल्यास संपूर्ण turn साठी styles वगळतो: `first`, `then`, `after that`, `before`, `rollback` किंवा `backup`, आणि त्यानंतर 240 characters च्या आत `delete`, `drop`, `migrate`, `deploy` किंवा `release`. **Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, default ने on) सुरू असताना bypass चालतो; toggle बंद केल्यास keyword तपासणी वगळली जाते.

bypass ने turn पुढे जाऊ दिल्यावर, `placeSystemInstruction()` (त्याच file मधील), जे कधीही नवीन `messages[0]` तयार करत नाही, त्याला सापडणाऱ्या खालीलपैकी पहिल्या ठिकाणी block ठेवते:

1. string content असलेला सुरुवातीचा system message: त्याच्या मजकुरानंतर block जोडला जातो.
2. top-level `system` field: string च्या मजकुरानंतर block जोडला जातो किंवा content-block array मध्ये नवीन text block म्हणून तो जोडला जातो.
3. string content असलेला नंतरचा पहिला system message: त्याच्या मजकुरानंतर block जोडला जातो.
4. वरीलपैकी काहीही नसल्यास: `messages` च्या शेवटी नवीन system message मध्ये block ठेवला जातो.

`messages` array नसलेल्या (किंवा रिकामा array असलेल्या) body वर कोणताही content bypass चालत नाही आणि top-level `system` field विचारात घेतला जात नाही. string `instructions` field च्या मजकुरानंतर block जोडला जातो, जोपर्यंत त्या field मध्ये आधीच `[OmniRoute Output Styles]` marker नसतो; तो असल्यास body `already_applied` म्हणून अपरिवर्तित ठेवली जाते. body मध्ये string `instructions` field नसला, पण `input` (string किंवा array) असल्यास, त्या field मध्ये पूर्वी असलेली कोणतीही non-string value बदलून block हे `instructions` बनते. string `instructions` field किंवा string अथवा array `input` यांपैकी काहीही नसलेली body अपरिवर्तित ठेवली जाते आणि `no_messages` म्हणून वगळली जाते.

#### सक्षम कसे करावे

dashboard मध्ये: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles विभाग: प्रत्येक style साठी on/off toggle आणि level selector असलेली एक row. compression स्वतः सुरू असताना (page चा master toggle, `enabled`) styles अंतर्भूत होतात. **Auto-Clarity Bypass** toggle **Caveman** page (`/dashboard/context/caveman`) वरील त्याच्या **Output Mode** card मध्ये आहे. Programmatically, compression config निवड पुढीलप्रमाणे कायम साठवते:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: `outputStyles` रिकामे असताना, legacy `cavemanOutputMode.enabled` setting हे `cavemanOutputMode.intensity` वरील `terse-prose` शी map होते. त्यानंतर block ची सुरुवात `[OmniRoute Output Styles]` marker ने होते, तर legacy `applyCavemanOutputMode()` injector ने `[OmniRoute Caveman Output Mode]` लिहिले होते. marker च्या खाली, en, pt-BR, es, de, fr, it, ru, id आणि vi मध्ये मजकूर legacy injection शी जुळतो; ja आणि zh मध्ये boundaries clause च्या आधी एक अतिरिक्त space असतो. `terse-prose` चे pt-BR, es, de, fr, it, ru, zh, ja, id आणि vi मध्ये भाषांतर होते, त्यामुळे ज्या request ची निराकरण केलेली भाषा `hu` आहे तिला इंग्रजी मजकूर मिळतो, जिथे legacy injector ने Hungarian मजकूर वापरला होता.

Output-style भाषा निवड (`outputStyles/apply.ts` मधील `resolveOutputStyleLanguage()`): `languageConfig.enabled` on असताना, `autoDetect` request च्या `messages` array मधील मजकूर असलेल्या सर्वात अलीकडील user message चा sample घेतो (string content किंवा त्याच्या content parts मधील `text`) आणि त्यावर Caveman engine चा detector (`detectCompressionLanguage()`) चालवतो. Han characters असलेल्या आणि kana नसलेल्या मजकुरासाठी detector `zh` परत करतो; अन्यथा `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` आणि `id` यांपैकी ज्यात सर्वाधिक hint matches आहेत ती भाषा परत करतो, आणि काहीही जुळत नसल्यास `en` परत करतो — ज्याचे वर्गीकरण करता येत नाही अशा मजकुरासाठी English मिळते, `defaultLanguage` कधीही नाही, आणि styles मध्ये `vi` मजकूर समाविष्ट असला तरी `vi` कधीही detect होत नाही. Responses API body आपले turns `input` मध्ये ठेवते, ज्याचा sample घेतला जात नाही, त्यामुळे तिला `defaultLanguage`, आणि नंतर English मिळते. `messages` मधील कोणत्याही user message मध्ये मजकूर नसल्यास, किंवा `autoDetect` off असल्यास, `defaultLanguage` लागू होते आणि त्यानंतर English लागू होते. `languageConfig.enabled` off असल्यास, भाषा English असते — request ला compression combo लागू होत नसेल तरच (request च्या routing combo ला नियुक्त केलेला combo, किंवा built-in stacked pipeline साठी chatCore fallback म्हणून वापरत असलेला default compression combo): combo लागू केल्याने त्या request साठी `languageConfig.enabled` on होते आणि combo च्या language packs मधून `defaultLanguage` सेट होते (जतन केलेली value combo च्या packs पैकी एक असल्यास ती; अन्यथा combo चा पहिला pack, जो default ने `en` असतो), तर जतन केलेले `autoDetect` (default ने on) तरीही लागू होते. Caveman input engine त्याच्या rule-pack ची भाषा वेगळ्या प्रकारे निवडते — प्रत्येक text part नुसार आणि auto-detect off असताना, `enabledPacks` नुसार gated पद्धतीने.

शैली × भाषा मॅट्रिक्स
`tests/unit/compression/output-styles-i18n-matrix.test.ts` द्वारे निश्चित केला आहे: प्रत्येक कॅटलॉग शैलीसाठी चाचणीच्या `BASELINE_LANGUAGES` मध्ये नोंद आवश्यक आहे; locale-gated नसलेल्या शैलीसह pt-BR भाषांतर दिलेले असणे आवश्यक आहे (locale-gated `terse-cjk` ला या नियमातून सूट आहे), जोपर्यंत ती `KNOWN_ENGLISH_ONLY` मध्ये सूचीबद्ध केलेली नाही. त्यात फक्त अजिबात भाषांतरे नसलेल्या शैलीच असू शकतात — सूचीबद्ध शैलीचे कोणतेही भाषांतर असल्यास चाचणी अयशस्वी होते; तसेच एखाद्या शैलीने तिच्या `BASELINE_LANGUAGES` नोंदीत सूचीबद्ध केलेली भाषा गमावल्यास चाचणी अयशस्वी होते. शैली जोडण्यासाठी,
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) पहा.

### टूल परिणाम कॉम्प्रेशन

`open-sse/services/compression/toolResultCompressor.ts` मधील `compressToolResult()`
**5 धोरणांचा** वापर करून टूल-परिणाम मजकूर कॉम्प्रेस करते. ती खालील क्रमाने त्यांचा प्रयत्न करते आणि ज्या पहिल्या सक्षम धोरणाची तपासणी सामग्रीशी जुळते, ते परिणाम ठरवते:

1. **`fileContent`**: 3 किंवा अधिक ओळींची अशी सामग्री, ज्यात अग्रभागी असलेले इंडेंटेशन दुर्लक्षित केल्यानंतर किमान एक ओळ `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` किंवा `return ` (कीवर्ड आणि त्यानंतर स्पेस) ने, किंवा `if`,
   `for` अथवा `while` नंतर `(` किंवा ` (` ने सुरू होते, तिच्या पहिल्या 20 आणि शेवटच्या 5 ओळी ठेवते व वगळलेला मधला भाग चिन्हांकित करते.
2. **`grepSearch`**: `<path>:<digits>:` या स्वरूपाची किमान एक ओळ असलेली सामग्री, ज्यात पहिल्या कोलनपूर्वीच्या मजकुरात whitespace नसते, फक्त अशाच ओळी ठेवते, कमाल 30; त्यानंतर पुढील कोणत्याही जुळण्यांची संख्या आणि जुळलेल्या फाइल्सची सूची देते; इतर प्रत्येक ओळ वगळली जाते. धोरण ट्रिगर करण्यासाठी अशी एक ओळ पुरेशी आहे, त्यामुळे `12:30:45` सारख्या timestamp ने सुरू होणारी लॉग ओळदेखील गणली जाते.
3. **`shellOutput`**: ANSI CSI sequence (`ESC[` आणि त्यानंतर अंक किंवा semicolons आणि मग एक अक्षर, जसे color codes मध्ये असते) किंवा मजकुरात कुठेही `$` नंतर whitespace असलेले आउटपुट त्या sequences काढून टाकते (इतर escapes, जसे `ESC[?25l` किंवा OSC window-title sequence, ठेवले जातात) आणि त्याच्या शेवटच्या 50 ओळी ठेवते; सलग पुनरावृत्त होणाऱ्या ओळी एकत्रित केल्या जातात. ही तपासणी `json` आणि `errorMessage` च्या आधी चालत असल्याने, असा `$` असलेले JSON किंवा error आउटपुट `shellOutput` सुरू असताना त्यांच्यापर्यंत कधीही पोहोचत नाही.
4. **`json`**: पर्यायी whitespace नंतर `{` किंवा `[` ने सुरू होणारा, 2,000 वर्णांपेक्षा मोठा आणि यशस्वीरीत्या parse होणारा JSON payload संक्षिप्त केला जातो: 7 पेक्षा अधिक items असलेल्या array चे पहिले 5 आणि शेवटचे 2 items तसेच त्याची एकूण संख्या ठेवली जाते; आणि object च्या पहिल्या 20 keys ठेवल्या जातात, त्यातील प्रत्येक nested object किंवा array value च्या जागी `{…N keys}` placeholder ठेवला जातो (array साठी N म्हणजे त्याची length), तसेच पहिल्या 20 नंतर वगळलेल्या keys ची संख्या दर्शवणारा `_remaining_<N>_keys` marker ठेवला जातो. Scalar values पूर्णपणे कॉपी केली जातात, त्यामुळे nested values नसलेला 20 किंवा त्यापेक्षा कमी keys चा object फक्त पुन्हा इंडेंट केला जातो — minified object मध्ये वर्ण वाढतात आणि तो अपरिवर्तित राहतो.
5. **`errorMessage`**: कुठेही आणि अक्षरांचे case विचारात न घेता `error:`,
   `error ` (`no error found` मधीलप्रमाणे शब्दानंतर स्पेस), `[error]`,
   `exception:`, `exception `, `[exception]` किंवा `traceback` असलेले आउटपुट त्याची पहिली ओळ, पुढील 10 ओळी आणि शेवटच्या 3 ओळी ठेवते; त्यांच्यामधील ओळींच्या जागी `… [N frames elided] …` marker ठेवला जातो. पहिल्या ओळीनंतर 13 पेक्षा अधिक ओळी असतील, तेव्हाच marker दिसतो; त्यामुळे 14 किंवा त्यापेक्षा कमी ओळींचे error आउटपुट संक्षिप्त केले जात नाही (12 किंवा 13 ओळी असल्यास शेवटच्या 3 ओळी आधीच ठेवलेल्या ओळींची पुनरावृत्ती करतात).

एखादे धोरण जुळल्यानंतर, त्यातून काहीही बचत होत नसली तरी नंतरची धोरणे वापरून पाहिली जात नाहीत. जुळणारे धोरण कोणतेही अंदाजित tokens वाचवत नसल्यास (length ÷ 4, वरच्या पूर्णांकापर्यंत round केलेले) — उदाहरणार्थ, 25 किंवा त्यापेक्षा कमी ओळींची code-सदृश file, किंवा 7 किंवा त्यापेक्षा कमी items असलेला 2,000 वर्णांपेक्षा मोठा JSON array — aggressive engine मूळ tool result ठेवते: दोन्ही callers (`compressAggressive()` आणि `compressAnthropicToolResultBlock()`) `saved` 0 किंवा त्यापेक्षा कमी असल्यास मूळ परिणाम ठेवतात, तर `compressToolResult()` स्वतः अजूनही त्या धोरणाचे आउटपुट परत करते. tool-result पायरी अंतिम निर्णय नसते: engine चा fallback summarizer अजूनही 8,192 वर्णांपेक्षा मोठा `tool` किंवा `function` message (`maxTokensPerMessage`, 2,048, गुणिले 4) संक्षिप्त करू शकतो.

#### कधी वापरावे

Tool result compression ही aggressive engine ची पायरी 1 आहे (`open-sse/services/compression/aggressive.ts` मधील `compressAggressive()`), त्यामुळे ती Aggressive mode मध्ये आणि stacked pipeline मधील `aggressive` पायरीमध्ये चालते. ती OpenAI-आकाराचे `tool` आणि `function` messages तसेच Anthropic `tool_result` blocks मधील मजकूर कॉम्प्रेस करते. प्रत्येक धोरणासाठी `aggressive.toolStrategies` अंतर्गत स्वतंत्र switch आहे आणि सर्व switches default ने सुरू असतात. dashboard मध्ये, compression सुरू असताना आणि default mode Aggressive असताना switches Caveman page च्या **Advanced** view मध्ये असतात.

### स्टॅक्ड पाइपलाइन

stacked mode मध्ये **एकामागून एक अनेक engines** चालतात — सामान्यतः प्रथम RTK
(tool output वर 60-90% बचत), त्यानंतर उर्वरित मजकुरावर Caveman (~46% input
बचत). एकत्रितपणे, ही **78-95% पात्र श्रेणी** आहे (वरील Upstream Savings Math पहा): `1 - (1 - 0.60..0.90) × (1 - 0.46)` ची सरासरी ≈89% आहे.

#### हे कसे कार्य करते

```
इनपुट (1000 tokens)
  → RTK (command-जाणणारा filter) → 200 tokens
    → Caveman (अनावश्यक मजकूर काढणे) → 108 tokens
  → आउटपुट (108 tokens, ~89% बचत)
```

#### कधी वापरावे

stacked mode यासाठी वापरा:

- Tool-केंद्रित workflows (agentic coding, संशोधन)
- खर्चाबाबत संवेदनशील batch processing
- तुम्हाला कमाल token बचत आवश्यक असताना

Stacked pipelines या global `stackedPipeline` compression setting द्वारे किंवा routing combo ला नेमलेल्या नामांकित compression combo द्वारे configure केल्या जातात (वरील Per-Combo Override पहा) — auto-combo `modePack` द्वारे नाही (ते field केवळ auto-combo model selection चे weights बदलते आणि `stacked` हे वैध pack name नाही).

---

## कॉम्प्रेशन कॉम्बो ओव्हरराइड्स

वेगवेगळ्या वापराच्या परिस्थितींनुसार वर्तन अधिक अचूकपणे समायोजित करण्यासाठी तुम्ही जागतिक कॉम्प्रेशन मोड **प्रत्येक कॉम्बोसाठी** ओव्हरराइड करू शकता:

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

हे पुढील गोष्टींसाठी उपयुक्त आहे:

- **कोडिंग कॉम्बो**: दीर्घ सत्रांसाठी `aggressive` मोड वापरा
- **झटपट प्रश्नोत्तर कॉम्बो**: जलद प्रतिसादांसाठी `lite` मोड वापरा
- **अधिक टूल्स वापरणारे कॉम्बो**: कमाल बचतीसाठी `stacked` मोड वापरा
- **प्रॉडक्शन कॉम्बो**: कॅशिंग प्रोव्हायडर्ससाठी ओव्हरराइड बंद ठेवा — नेहमी सक्रिय असलेले कॅश-जागरूक समायोजन `aggressive`/`ultra` ला आपोआप `standard` पर्यंत कमी करते
  (निवडता येण्याजोगा `cache-aware` मोड उपलब्ध नाही)

---

## हे देखील पहा

- [एन्व्हायर्नमेंट कॉन्फिग](../reference/ENVIRONMENT.md) — कॉम्प्रेशन एन्व्हायर्नमेंट व्हेरिएबल्स
- [आर्किटेक्चर मार्गदर्शक](../architecture/ARCHITECTURE.md) — कॉम्प्रेशन पाइपलाइनची अंतर्गत रचना
- [वापरकर्ता मार्गदर्शक](../guides/USER_GUIDE.md) — कॉम्प्रेशन वापरण्यास सुरुवात करणे
- [RTK कॉम्प्रेशन](./RTK_COMPRESSION.md) — RTK फिल्टर्स, विश्वास मॉडेल, पडताळणी गेट, रॉ-आउटपुट पुनर्प्राप्ती
- [कॉम्प्रेशन इंजिन्स](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, डॅशबोर्ड
- [कॉम्प्रेशन नियमांचे स्वरूप](./COMPRESSION_RULES_FORMAT.md) — JSON रूल-पॅक स्वरूप
- [कॉम्प्रेशन भाषा पॅक्स](./COMPRESSION_LANGUAGE_PACKS.md) — भाषाविशिष्ट Caveman नियम
