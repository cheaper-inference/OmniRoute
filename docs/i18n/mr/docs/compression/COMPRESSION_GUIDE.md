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

## संकुचन मोड

### बंद

कोणतेही संकुचन लागू केलेले नाही. सर्व संदेश कोणताही बदल न करता पुढे पाठवले जातात.

### लाइट मोड (~15% बचत, <1ms विलंब)

सर्वात सुरक्षित मोड — फॉरमॅटिंगची स्वच्छता. याच्या टूल-रिझल्ट ट्रंकेशनमध्ये माहिती गमावली जाते, त्यामुळे डीफॉल्ट
मार्ग (`allow-lossy`, `engine:lite` किंवा नावाच्या कॉम्बोची स्पष्ट निवड नसताना) `compressToolResults: false` सह लाइट मोड चालवतो: आधीचे
टूल रिझल्ट्स प्रदात्यापर्यंत कोणताही बदल न करता पोहोचतात.

| तंत्र                    | वर्णन                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | सलग रिकाम्या ओळी आणि शेवटच्या स्पेसेस एकत्र करणे                                                    |
| `dedupSystemPrompt`      | डुप्लिकेट सिस्टम संदेश काढून टाकणे                                                                  |
| `compressToolResults`    | आधीचे टूल रिझल्ट्स लाइट कॅपपर्यंत ट्रंकेट करणे (माहिती गमावली जाते: केवळ विनंतीच्या स्पष्ट निवडीसह) |
| `removeRedundantContent` | पुनरावृत्ती झालेल्या सूचना काढून टाकणे                                                              |
| `replaceImageUrls`       | base64 इमेज डेटा URI लहान करणे                                                                      |

**यासाठी सर्वोत्तम:** नेहमी-सुरू वापर, सुरक्षितता-गंभीर वर्कफ्लो.

### स्टँडर्ड मोड (~30% बचत)

[Caveman](https://github.com/JuliusBrussee/caveman) पासून प्रेरित — अर्थ कायम ठेवून अनावश्यक शब्द आणि अतिविस्तृत मांडणी काढून टाकतो:

- अनावश्यक शब्द काढतो ("please", "I think", "basically", "actually")
- अतिविस्तृत वाक्यरचना संक्षिप्त करतो ("in order to" → "to", "as a result of" → "because")
- नम्र संदिग्धता काढतो ("Would you mind...", "If you could possibly...")
- कोडिंग प्रॉम्प्टसाठी अनुकूल केलेले 30+ regex नियम

**यासाठी सर्वोत्तम:** दैनंदिन कोडिंग वर्कफ्लो, खर्चाबाबत जागरूक टीम्स.

### अॅग्रेसिव्ह मोड (~50% बचत)

दीर्घ सत्रांसाठी स्मार्ट इतिहास व्यवस्थापन:

- **संदेश वृद्धीकरण** — जुने संदेश हळूहळू अधिक संक्षिप्त केले जातात
- **टूल रिझल्ट संकुचन** — मोठे टूल आउटपुट ट्रंकेट किंवा वगळले जातात (पहिल्या/शेवटच्या ओळी,
  मॅच-लाइन फिल्टरिंग, JSON की कॉम्पॅक्शन)
- **स्ट्रक्चरल अखंडता संरक्षक** — `tool_use` + `tool_result` जोड्या सुसंगत राहतील याची खात्री करतो
- **कॉन्टेक्स्ट विंडो जागरूकता** — प्रत्येक मॉडेलच्या टोकन मर्यादांचा आदर करतो

**यासाठी सर्वोत्तम:** विस्तारित डीबगिंग सत्रे, मोठे कोडबेस.

### अल्ट्रा मोड (~75% बचत)

टोकन-गंभीर परिस्थितींसाठी कमाल संकुचन:

- **ह्युरिस्टिक प्रूनिंग** — गद्याचे स्कोअर-आधारित टोकन प्रूनिंग
- **स्ट्रक्चर जतन** — फेन्स्ड कोड ब्लॉक्स, इनलाइन कोड, URLs आणि आयडेंटिफायर्स tombstone करून पुन्हा जशास तसे जोडले जातात; ते कधीही प्रून केले जात नाहीत
- **पर्यायी SLM स्तर** — कॉन्फिगर केल्यावर एक छोटे स्थानिक मॉडेल प्रून सुधारू शकते
- अॅग्रेसिव्ह मोडपासून स्वतंत्र: हे संदेश वृद्धीकरण, टूल-रिझल्ट संकुचन
  किंवा फॉलबॅक समरायझर चालवत नाही (केवळ SLM-स्तरातील अपयशामुळे फॉलबॅक पास अॅग्रेसिव्हमधून जाऊ शकतो)

**यासाठी सर्वोत्तम:** वारंवार कॉन्टेक्स्ट मर्यादा गाठत असताना.

### RTK मोड (अपस्ट्रीम श्रेणीतील 60-90%)

RTK मोड कोडिंग-एजंट सत्रांमध्ये दिसणाऱ्या विस्तृत टूल आउटपुटसाठी अनुकूलित आहे:

- `git status`, `git diff`, `git log`, टेस्ट रनर्स,
  TypeScript/Vite/Webpack बिल्ड्स, ESLint/Biome/Prettier, npm audit/installs, Docker लॉग्स, इन्फ्रा
  आउटपुट आणि सामान्य शेल आउटपुट यांसारखे कमांड/आउटपुट वर्ग ओळखतो
- `open-sse/services/compression/engines/rtk/filters/` मधील JSON फिल्टर पॅक्स लागू करतो
- प्रोजेक्ट किंवा ग्लोबल `filters.toml` फाइल्समधून RTK TOML स्कीमा v1 फिल्टर्स इम्पोर्ट करतो; त्यात इनलाइन-टेस्ट
  व्हॅलिडेशन आणि प्रोजेक्ट फाइल्ससाठी ट्रस्ट-गेटिंग समाविष्ट आहे
- इनलाइन व्हेरिफाय नमुन्यांसह 56 अंगभूत फिल्टर्स पुरवतो
- ANSI कंट्रोल सिक्वेन्सेस, प्रोग्रेस बार्स, पुनरावृत्ती झालेल्या ओळी आणि कृतीस उपयुक्त नसलेला आवाज काढून टाकतो
- अपयश, त्रुटी, इशारे, बदललेल्या फाइल्स, सारांश आणि दीर्घ आउटपुटचा शेवट जतन करतो
- ट्रस्ट-गेटेड प्रोजेक्ट फिल्टर्स, ग्लोबल फिल्टर्स आणि पर्यायी रिडॅक्टेड रॉ-आउटपुट रिकव्हरीला समर्थन देतो

**यासाठी सर्वोत्तम:** शेल, बिल्ड, टेस्ट, git, grep आणि फाइल-आउटपुट ट्रान्सक्रिप्ट्स असलेली एजंट सत्रे.

### स्टॅक्ड मोड (पात्र श्रेणीतील 78-95%)

स्टॅक्ड मोड अनेक संकुचन इंजिन्स एका निर्धारक क्रमाने चालवतो. डीफॉल्ट पाइपलाइन:

```txt
RTK -> Caveman
```

हा क्रम आधी टर्मिनल/टूल आउटपुट संक्षिप्त ठेवतो आणि त्यानंतर उरलेल्या नैसर्गिक-भाषेतील प्रॉम्प्टवर Caveman चे अर्थपूर्ण संक्षिप्तीकरण लागू करतो. स्टॅक्ड पाइपलाइन्स जागतिक पातळीवर किंवा रूटिंग कॉम्बोजना नियुक्त केलेल्या संकुचन कॉम्बोजद्वारे कॉन्फिगर करता येतात.

**यासाठी सर्वोत्तम:** मोठे टूल लॉग्स तसेच मानवी सूचना किंवा असिस्टंट सारांश असलेला मिश्र कॉन्टेक्स्ट.

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

`Dashboard → Context & Cache` वर जा:

- **Caveman** — मोड निवड, भाषा पॅक्स, पूर्वावलोकन आणि जागतिक डीफॉल्ट
- **RTK** — कमांड-फिल्टर पूर्वावलोकन, RTK सुरक्षा सेटिंग्ज आणि फिल्टर कॅटलॉग
- **Compression Combos** — रूटिंग कॉम्बोजना नियुक्त केलेल्या नावाच्या इंजिन पाइपलाइन
- **Auto-Trigger Threshold** — टोकनची संख्या थ्रेशोल्डपेक्षा जास्त झाल्यावर कॉम्प्रेशन आपोआप सक्रिय करणे

### प्रति-कॉम्बो ओव्हरराइड

`Dashboard → Context & Cache → Compression Combos` मध्ये रूटिंग
कॉम्बोला कॉम्प्रेशन कॉम्बो नियुक्त करा:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

यामुळे सशुल्क सबस्क्रिप्शनवर lite मोड ठेवून, मोफत/कोडिंग प्रदात्यांवर स्टॅक केलेले कॉम्प्रेशन वापरता येते.

हे "Per-Combo Override" असाइनमेंट **रूटिंग-कॉम्बो कॉम्प्रेशन
मोड** ओव्हरराइडपेक्षा (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — फील्डच्या स्कीमामध्ये
`rtk`, `stacked` आणि `omniglyph` देखील स्वीकारले जातात) वेगळे नियंत्रण आहे — हा ओव्हरराइड नावाची
कॉम्प्रेशन-कॉम्बो पाइपलाइन निवडत नाही; तो फक्त
`resolveCompressionPlan` द्वारे विचारात घेतले जाणारे `compressionMode` फील्ड सेट करतो. तो कॉम्बो कार्डवर
(`Dashboard → Combos`) किंवा #6760 पासून, वर दस्तऐवजीकरण केलेल्या पाइपलाइन-असाइनमेंट चेकबॉक्सच्या
अगदी शेजारी, `Dashboard → Context & Cache → Compression Combos` मधील "Assign to routing" यादीमध्ये
प्रति रूटिंग कॉम्बो सेट करता येतो. दोन्ही पृष्ठभाग समान `PUT /api/combos/{id}` एंडपॉइंटद्वारे
साठवले जातात.

### प्रति-विनंती ओव्हरराइड

एकाच विनंतीसाठी कॉम्प्रेशन प्लॅन ओव्हरराइड करण्यासाठी `x-omniroute-compression` विनंती हेडर पाठवा. त्याला सर्वाधिक प्राधान्य आहे — ते रूटिंग-कॉम्बो ओव्हरराइड, सक्रिय प्रोफाइल, ऑटो-ट्रिगर आणि पॅनेल Default यांवर मात करते. अज्ञात मूल्ये दुर्लक्षित केली जातात (विनंती कधीही नाकारली जात नाही) आणि जागतिक मास्टर स्विचद्वारे सर्वकाही अद्याप नियंत्रित केले जाते: जागतिक स्तरावर कॉम्प्रेशन बंद असल्यास हेडर ते सुरू करू शकत नाही. मूल्ये:

| मूल्य         | परिणाम                                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| `off`         | या विनंतीसाठी कोणतेही कॉम्प्रेशन नाही.                                                                      |
| `default`     | पॅनेलमधून प्राप्त Default प्रोफाइल (सक्रिय प्रोफाइलकडे दुर्लक्ष करते). Lossy इंजिने बंद ठेवली जातात.        |
| `safe`        | हेडर वगळल्यासारखेच.                                                                                         |
| `allow-lossy` | या विनंतीचा ऑपरेटर प्लॅन कायम ठेवतो, ज्यामध्ये सारांश, प्रासंगिकता फिल्टर आणि शैली पुनर्लेखन समाविष्ट आहेत. |
| `engine:<id>` | सक्षम असताना एकच इंजिन, उदा. `engine:rtk`. हे त्या इंजिनसाठी प्रति-विनंती opt-in आहे.                       |
| `<combo>`     | नावाने जुळणारा नामांकित कॉम्बो (प्रथम केस-असंवेदनशील पद्धतीने, त्यानंतर id नुसार).                          |

`allow-lossy`, `engine:<id>` किंवा नामांकित कॉम्बोशिवाय lossy इंजिने लागू केली जात नाहीत. Lossy Default, ऑटो-ट्रिगर किंवा रूटिंग ओव्हरराइड डाउनग्रेड केल्यावर, OmniRoute कॉन्फिगर केलेल्या स्टॅक केलेल्या पाइपलाइनमधील ओळखल्या गेलेल्या lossless पायऱ्या कॉन्फिगर केलेल्या क्रमाने कायम ठेवते. कॉन्फिगर केलेली कोणतीही lossless पायरी शिल्लक राहत नसेल, तेव्हाच ते `session-dedup → lite` वर परतते.

Settings पॅनेलमधील **Effective pipeline** पूर्वावलोकन सामान्य, स्थिर प्लॅन दाखवते. ऑटो-ट्रिगर चालू शकत असल्यास, त्याच पूर्वावलोकनात त्याचा सशर्त प्रभावी पाइपलाइन प्लॅन देखील दाखवला जातो, ज्यामुळे पॅनेल आणि हेडर-विरहित रनटाइम रिझोल्यूशन समक्रमित राहतात.

लागू केलेला प्लॅन `X-OmniRoute-Compression: <mode>; source=<source>` प्रतिसाद
हेडरमध्ये परत दिला जातो, जिथे `<source>` खालीलपैकी एक असतो: `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` किंवा `off`.

### API

```bash
# कॉम्प्रेशन सेटिंग्ज मिळवा
curl http://localhost:20128/api/settings/compression

# कॉम्प्रेशन सेटिंग्ज अपडेट करा
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# विशिष्ट RTK/stacked पेलोडचे पूर्वावलोकन करा
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK फिल्टर पॅक्सची यादी करा
curl http://localhost:20128/api/context/rtk/filters

# पर्यायी कमांड मेटाडेटासह थेट RTK ची चाचणी करा
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

## प्रगत कॉम्प्रेशन सिस्टम

वर वर्णन केलेल्या 7 मोड्सच्या पलीकडे (स्रोत `codex-responses` आणि `omniglyph` मोड देखील स्वीकारतो, जे हे मार्गदर्शक कव्हर करत नाही), खालील विभाग कव्हर वैशिष्ट्ये आहेत जी त्या मोडच्या आत किंवा बाजूने कार्य करतात: टूल रिझल्ट कॉम्प्रेशन आणि प्रोग्रेसिव्ह एजिंग हे आक्रमक इंजिनचे चरण 1 आणि 2 आहेत (आक्रमक मोड आणि एक `aggressive` स्टेप, स्टॅक, स्टॅक, स्टॅक, स्टॅक, पाइपलाइन) ची पायरी 1 आणि 2. कॅशे-अवेअर कम्प्रेशन कॉम्प्रेशन चालू असताना कॅशिंग प्रदात्यांसाठी `aggressive` आणि `ultra` ते `standard` डाउनग्रेड करते आणि केव्हमॅन आउटपुट मोड आणि आउटपुट स्टाइल्स निवडलेल्या सिस्टम-प्रॉम्प्ट सूचना आहेत, डीफॉल्टनुसार, जे विनंती संकुचित करण्याऐवजी मॉडेलच्या आउटपुटला आकार देतात.

### कॅशे-अवेअर कॉम्प्रेशन

काही प्रदाते (जसे की प्रॉम्प्ट कॅशिंगसह Anthropic ) समर्थन** प्रॉम्प्ट कॅशिंग** , जे त्यांना खर्च आणि विलंब कमी करण्यासाठी प्रॉम्प्टचे भाग कॅशे करू देते. कॅशिंग सक्षम असताना, आक्रमक कॉम्प्रेशन प्रत्यक्षात येऊ शकते** दुखापत** कार्यप्रदर्शन कारण ते कॅश केलेले टोकन बदलते, कॅशे अवैध करते.

`cachingAware.ts` मॉड्यूल हे याद्वारे सोडवते** कॅशिंग संदर्भ शोधत आहे** आणि** कॉम्प्रेशन धोरण समायोजित करणे** त्यानुसार

#### ते कसे कार्य करते

1. **कॅशिंग संदर्भ शोधा** — `cache_control` मार्करसाठी विनंती मुख्य भाग स्कॅन करते
2. **कॅशिंग प्रदाते ओळखा** — लक्ष्य प्रदाता कॅशिंगला समर्थन देत आहे का ते तपासते
3. **धोरण समायोजित करा** — कॅशिंग प्रदात्यांसाठी `aggressive`/`ultra` ते `standard` डाउनग्रेड करते
4. **सिस्टम प्रॉम्प्ट वगळा** — सिस्टीम प्रॉम्प्ट सहसा कॅशे केले जातात, त्यामुळे ते संकुचित करू नका

रणनीती मदतनीस देखील `deterministicOnly` ध्वज परत करतो, परंतु योजना बिल्डर फक्त स्ट्रॅटेजी वापरतो — आज ध्वज वाचत नाही.

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

#### कधी वापरायचे

कॅशे-अवेअर कॉम्प्रेशन आहे** नेहमी चालू** — कॉन्फिगरेशनची आवश्यकता नाही. जेव्हाही कॉम्प्रेशन चालू असते तेव्हा ते सुरू होते आणि लक्ष्य प्रदाता प्रॉम्प्ट कॅशिंग (Anthropic, OpenAI, इ.) चे समर्थन करते; स्पष्ट `cache_control` मार्कर आवश्यक नाहीत — एक कॅशिंग प्रदाता एकटाच डाउनग्रेड ट्रिगर करतो आणि एकटे मार्कर कधीही करत नाहीत (मार्कर शोधणे कॅशे टेलिमेट्री फीड करते, धोरण निर्णय नाही).

OpenRouter गणना फक्त `anthropic/*` मॉडेल्ससाठी कॅशिंग प्रदाता म्हणून केली जाते: Claude कोड विनंत्या त्यांचे `cache_control` ब्रेकपॉइंट्स ठेवतात (जास्तीत जास्त 4) आणि गार्ड उपसर्गाचे संरक्षण करतो, तर इतर प्रत्येक OpenRouter कुटुंब (`openai/`, `google/`, `qwen/`, …) स्ट्रिप केलेले आणि असुरक्षित राहतात.

### प्रगतीशील वृद्धत्व

लांबलचक संभाषणे अनेक संदेश वळणे जमा करतात, परंतु जुनी वळणे कमी प्रासंगिक होतात. `progressiveAging.ts` मॉड्यूल** वळणाच्या अंतराने संदेश कमी करते** (संभाषणाच्या शेवटी मोजलेले अंतर). पाठवलेल्या डीफॉल्टसह (`verbatim: 2, light: 2, moderate: 3`):

- **शेवटची 2 वळणे (अंतर ≤ 2)** : शब्दशः ठेवले
- **अंतर 3** : केव्हमन कॉम्प्रेशन (फिलर काढणे)
- **अंतर 4 +** : सहाय्यक संदेश सारांशित; वापरकर्ता संदेश त्यांच्या पहिल्या ओळीत कमी केले जातात, 120 वर्णांनी मर्यादित केले जातात; इतर भूमिका अस्पर्शित. सिस्टम प्रॉम्प्ट्स, आधीच जुने संदेश आणि नवीनतम वापरकर्ता संदेश नेहमी अंतराची पर्वा न करता शब्दशः ठेवले जातात. काहीही सरळ सोडले जात नाही आणि `light` बँड पाठवलेल्या डीफॉल्टसह अगम्य आहे (`light` समान `verbatim`).

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

#### कधी वापरायचे

प्रगतीशील वृद्धत्व आहे** नेहमी चालू** `aggressive` मोड — साठी हे `compressAggressive()` चे चरण 2 आहे. अल्ट्रा मोड ते चालवत नाही. हे विशेषतः यासाठी प्रभावी आहे:

- दीर्घकाळ चालणारी कोडिंग सत्रे
- अनेक दिवसांची संभाषणे
- अनेक टूल कॉलसह एजंटिक वर्कफ्लो

### केव्हमॅन आउटपुट मोड

केव्हमॅन आउटपुट मोड जोडतो** सिस्टम प्रॉम्प्ट सूचना** जे मॉडेललाच terse आउटपुट — साठी विचारते, `lite` लेव्हल संपूर्ण वाक्ये ठेवणारी संक्षिप्त उत्तरे विचारते, `full` त्याला "स्मार्ट केव्हमॅन सारखे terse प्रतिसाद" देण्यास सांगते आणि `ultra` टेलिग्राफिक आउटपुटसाठी विचारते; सूचना फक्त विचारतात, ते याची हमी देऊ शकत नाहीत. विनंत्या त्या `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) द्वारे प्राप्त होतात : `open-sse/handlers/chatCore.ts` प्रथम बॅक-कॉम्पॅट शिम (`resolveOutputStyleSelection()` मध्ये `open-sse/services/compression/outputStyles/backCompat.ts`) सह निवड निराकरण करते, जे `outputStyles` रिकामे असताना, `cavemanOutputMode.intensity` वर `terse-prose` आउटपुट शैलीमध्ये सक्षम `cavemanOutputMode` मॅप करते (खाली बॅक-कॉम्पॅट पहा); रिक्त नसलेली `outputStyles` निवड आहे तशी वापरली जाते आणि नंतर `cavemanOutputMode.enabled` आणि `intensity` कोणताही परिणाम होत नाही, तर त्याचे `autoClarity` टॉगल अजूनही लागू होते. `outputMode.ts` सूचना मजकूर (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), सामग्री बायपास आणि इंजेक्शन वापरणारे प्लेसमेंट हेल्पर असते; त्याच्या स्वत: च्या `applyCavemanOutputMode()` इंजेक्टरमध्ये उत्पादन कॉलर नाही.

#### ते कसे कार्य करते

हा मोड इनपुट कॉम्प्रेस करत नाही. हे सिस्टम प्रॉम्प्टवर एक सूचना ब्लॉक जोडते (इंजेक्शन कसे कार्य करते ते खाली पहा), आणि विनंतीसाठी निवडलेला कोणताही इनपुट कॉम्प्रेशन मोड त्यानंतरही, आता ब्लॉक असलेल्या मुख्य भागावर चालतो. सामायिक सीमांच्या क्लॉजच्या पुढे, ज्याने प्रत्येक स्तर समाप्त होतो, इंग्रजी `full` स्तर वाचतो:

> "स्मार्ट केव्हमॅन सारखे उत्तर द्या. लेख (a/an/the), फिलर (just/really/basically/actually/simply), pleasantries, हेजिंग टाका. तुकडे OK. लहान समानार्थी शब्द (मोठे नाही, अंमलात आणू नका). सर्व तांत्रिक पदार्थ, कोड, त्रुटी, URLs, exactier ठेवा."

हे विशेषतः यासाठी चांगले कार्य करते:

- कोड जनरेशन (टर्सर आउटपुट = कमी टोकन)
- द्रुत प्रश्नोत्तरे (विस्तृत स्पष्टीकरणाची गरज नाही)
- बॅच प्रोसेसिंग (थ्रूपुट जास्तीत जास्त करा)

#### कधी वापरायचे

केव्हमॅन आउटपुट मोड आहे** निवड करा** . कॉम्प्रेशन चालू करून (`enabled: true`, कॉम्प्रेशन सेटिंग्ज पृष्ठावरील मास्टर टॉगल), ते `cavemanOutputMode.enabled` सह चालू करा; `intensity` `lite`, `full` किंवा `ultra` निवडतो:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

कॉम्प्रेशन कॉम्बो** आउटपुट मोड** टॉगल (`outputMode`, `outputModeIntensity` मधील स्तर ) कॉम्बो लागू होणाऱ्या विनंत्यांसाठी समान स्विच सेट करते आणि `omniroute_set_compression_engine` MCP टूल त्याच्या बुलियन `outputMode` युक्तिवादाद्वारे ते लिहिते. रिकाम्या नसलेल्या `outputStyles` निवडला या स्विचवर प्राधान्य दिले जाते. डॅशबोर्डमध्ये, सक्षम करणे** पद्य गद्य** आउटपुट शैली समान ब्लॉक इंजेक्ट करते (खाली आउटपुट शैली पहा).

### आउटपुट शैली (कॅटलॉग)

वरील केव्हमॅन आउटपुट मोड आहे** वारसा एकल-शैली मार्ग** . फेज 4 ने ते कंपोझेबल आउटपुट शैलींच्या कॅटलॉगमध्ये सामान्यीकृत केले: `OUTPUT_STYLE_CATALOG` मध्ये `open-sse/services/compression/outputStyles/catalog.ts`. प्रत्येक शैली ही एक सिस्टीम-प्रॉम्प्ट सूचना आहे जी स्वतः मॉडेलला स्वस्त आउटपुटसाठी विचारते; शैली एकत्र सक्षम केल्या जाऊ शकतात आणि कॅटलॉग क्रमाने इंजेक्ट केल्या जातात.

| शैली                            | `id`            | ते काय करते                                                                                                                                                                                                                                                           | सूचना भाषा                                    |
| ------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| पद्य गद्य                       | `terse-prose`   | filler/articles/hedging टाका; तांत्रिक पदार्थ अचूक ठेवा. लेगसी केव्हमॅन आउटपुट मोड सारखा मजकूर (संदर्भित, पुन्हा टाइप केलेला नाही).                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| कमी कोड                         | `less-code`     | YAGNI शिडी: सर्वात लहान कार्यरत बदल, कोणतेही अनावश्यक ॲबस्ट्रॅक्शन नाहीत.                                                                                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| पोनीटेल (आळशी ज्येष्ठ देव)      | `ponytail`      | "सर्वोत्तम कोड हा कोड कधीही न लिहिला जातो": पुन्हा वापरा > पुनर्लेखन, मूळ कारण > लक्षण, सर्वात लहान कामकाजाचा फरक.                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| माझ्याकडे ADHD (कृती-प्रथम) आहे | `i-have-adhd`   | क्रिया प्रथम ( गद्याच्या आधीcommand/path/snippet ), क्रमांकित बद्ध पायऱ्या, ONE ठोस पुढील पायरी, [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) वरून preamble/recap/closers. रूपांतरित नाही.                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| अँटिस्लॉप UI फिल्टर             | `antislop-ui`   | प्रत्येक व्हिज्युअल तंत्राने उद्देश चाचणी उत्तीर्ण करणे आवश्यक आहे (पदानुक्रम, ओळख, वाचनीयता); कोणतेही डीफॉल्ट gradients/glass/glow, कॅप्ड पॅलेट नाही, टेम्पलेट लेआउट नाहीत. दोन्ही अँटिस्लॉप शैलींमध्ये नो-डेड-कंट्रोल्स / नो-फॅब्रिकेटेड-क्लेम्सची सीमा जोडली जाते. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| अँटिस्लॉप कॉपी आणि मानवी फिल्टर | `antislop-copy` | विशिष्ट प्रत (नो em डॅश, जेनेरिक CTAs, buzzwords, chatbot closers, invented facts) अधिक लोक नियम: WCAG AA कॉन्ट्रास्ट, दृश्यमान फोकस, कीबोर्ड रीच, empty/loading/error स्टेट्स, मोबाइल रीफ्लो.                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                | `terse-cjk`     | शास्त्रीय चीनी (文言) मध्ये`full`/`ultra` उत्तर; `lite` फंक्शन शब्द, आनंददायी किंवा अलंकार न करता फक्त संक्षिप्त उत्तरे विचारते.                                                                                                                                      | zh (स्थानिक-बंद, खाली पहा)                    |

प्रत्येक शैली तीन तीव्रतेचे स्तर — `lite`, `full`, `ultra` — पाठवते आणि प्रत्येक स्तर सामायिक सीमा क्लॉज ( `outputMode.ts` मध्ये`SHARED_BOUNDARIES` ) सह समाप्त होतो, जे कोड ब्लॉक्स, फाइल पथ, आदेश, त्रुटी आणि URLs अचूक ठेवते. `terse-prose` आणि `terse-cjk` स्तरावरील मजकूर त्या सूचीमध्ये अभिज्ञापक जोडतात.

`terse-cjk` दोन ठिकाणी `zh` ला लोकल-गेट केलेले आहे. जेव्हा डॅशबोर्ड UI भाषा चीनी (`zh-CN` किंवा `zh-TW`) असते तेव्हाच कॉम्प्रेशन सेटिंग्ज पृष्ठ त्याची पंक्ती सूचीबद्ध करते आणि विनंतीची निराकरण केलेली भाषा (खालील भाषा निवड पहा) `zh` असते तेव्हाच `applyOutputStyles()` ती इंजेक्ट करते. पंक्ती लपवल्याने जतन केलेली `terse-cjk` निवड साफ होत नाही: सेटिंग्ज API कोणत्याही शैलीचा आयडी स्वीकारते आणि पृष्ठावरील इतर शैली जतन केल्याने ते कायम राहते. विनंतीच्या वेळी, `applyOutputStyles()` भाषा तपासणी हे एकमेव लोकेल गेट आहे.

#### इंजेक्शन कसे कार्य करते

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) कॅटलॉगच्या विरूद्ध निवडीचे निराकरण करते (अज्ञात आयडी आणि लोकेल-विसंगत शैली टाकल्या जातात, कधीही त्रुटी नाही; शैलीचे निराकरण करणारी निवड मुख्य भागाला अपरिवर्तित ठेवते, `no_styles` म्हणून वगळले जाते), निवडलेल्या सूचना कॅटलॉग क्रमाने जोडते, सीमा क्लॉज जोडते** एकदा** (अधिक सुरक्षितता खंड, `SAFETY_BOUNDARIES` किंवा त्याचे भाषांतर, जेव्हा `less-code` किंवा `ponytail` निवडले जाते), आणि ब्लॉकला सिंगल इडेम्पोटेंसी मार्कर (`[OmniRoute Output Styles]`) ने सुरू करते, त्यामुळे पुन्हा अर्ज करणे एक नो-ऑप आहे. जेव्हा निराकरण केलेल्या भाषेत (खालील भाषा निवड पहा) भाषांतर असते, तेव्हा इंग्रजीऐवजी स्थानिकीकृत सूचना इंजेक्ट केली जाते.

नॉन-रिक्त `messages` ॲरे असलेल्या मुख्य भागावर, सामग्री बायपासच्या आधी idempotency तपासणी चालते: जेव्हा `[OmniRoute Output Styles]` मार्कर आधीपासूनच उच्च-स्तरीय `system` फील्डमध्ये (स्ट्रिंग किंवा सामग्री-ब्लॉक ॲरे) किंवा स्ट्रिंग सामग्रीसह सिस्टम संदेशामध्ये असतो, तेव्हा मुख्य भाग `already_applied` म्हणून अपरिवर्तित ठेवला जातो आणि कीवर्ड चेक रन होत नाही. अन्यथा सामग्री बायपास (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) शेवटच्या तीन संदेशांचा मजकूर तपासतो, त्यांची भूमिका काहीही असो, आणि जेव्हा तो मजकूर त्याच्या सुरक्षिततेशी, अपरिवर्तनीय-क्रिया किंवा स्पष्टीकरण कीवर्डशी किंवा ऑर्डर-संवेदनशील अनुक्रमांशी जुळतो तेव्हा संपूर्ण वळणासाठी शैली वगळते: `first`, `then`, `after that`, `before` किंवा follow `delete`, `drop`, `migrate` `deploy` `rollback` `backup` द्वारे `release` वर्णांच्या आत. बायपास चालत असताना द** स्वयं-स्पष्टता बायपास** टॉगल (`cavemanOutputMode.autoClarity`, डीफॉल्टनुसार) चालू आहे; टॉगल बंद केल्याने कीवर्ड चेक वगळले जाते.

जेव्हा बायपास पुढे जाऊ देतो, तेव्हा `placeSystemInstruction()` (समान फाइल), जी कधीही नवीन `messages[0]` तयार करत नाही, यापैकी पहिल्यामध्ये ब्लॉक ठेवते:

1. स्ट्रिंग सामग्रीसह एक अग्रगण्य प्रणाली संदेश: त्याच्या मजकुरानंतर ब्लॉक जोडला जातो.
2. शीर्ष-स्तरीय `system` फील्ड: ब्लॉक स्ट्रिंगच्या मजकुरानंतर जोडला जातो किंवा सामग्री-ब्लॉक ॲरेमध्ये नवीन मजकूर ब्लॉक म्हणून जोडला जातो.
3. स्ट्रिंग सामग्रीसह पहिला नंतरचा सिस्टम संदेश: त्याच्या मजकुरानंतर ब्लॉक जोडला जातो.
4. वरीलपैकी काहीही नाही: ब्लॉक `messages` च्या शेवटी नवीन सिस्टम संदेशात जातो.

`messages` ॲरे नसलेल्या बॉडीवर (किंवा रिकामे असलेले), कोणतेही कंटेंट बायपास चालत नाही आणि उच्च-स्तरीय `system` फील्डचा सल्ला घेतला जात नाही. स्ट्रिंग `instructions` फील्डच्या मजकुरानंतर ब्लॉक जोडला जातो, जोपर्यंत त्या फील्डमध्ये आधीपासूनच `[OmniRoute Output Styles]` मार्कर नसतो, अशा परिस्थितीत मुख्य भाग `already_applied` म्हणून अपरिवर्तित ठेवला जातो. जेव्हा बॉडीमध्ये कोणतेही स्ट्रिंग `instructions` फील्ड नसते परंतु `input` (स्ट्रिंग किंवा ॲरे) असते, तेव्हा ब्लॉक `instructions` होतो, फील्ड असलेल्या कोणत्याही नॉन-स्ट्रिंग मूल्याच्या जागी. स्ट्रिंग `instructions` फील्ड किंवा स्ट्रिंग किंवा ॲरे `input` नसलेली बॉडी अपरिवर्तित ठेवली जाते आणि `no_messages` म्हणून वगळली जाते.

#### कसे सक्षम करावे

डॅशबोर्डमध्ये:** कॉम्प्रेशन कॉन्टेक्स्ट → कॉम्प्रेशन सेटिंग्ज** (`/dashboard/context/settings`), आउटपुट शैली विभाग: on/off टॉगल आणि लेव्हल सिलेक्टरसह प्रति शैली एक पंक्ती. कंप्रेशन चालू असताना स्टाइल इंजेक्ट करतात (पृष्ठाचे मास्टर टॉगल, `enabled`). द** स्वयं-स्पष्टता बायपास** टॉगल वर आहे** गुहावासी** पृष्ठ (`/dashboard/context/caveman`), त्यात** आउटपुट मोड** कार्ड प्रोग्रॅमॅटिकली, कॉम्प्रेशन कॉन्फिगरेशन याप्रमाणे निवड कायम ठेवते:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

बॅक-कॉम्पॅट: `outputStyles` रिक्त असताना, लेगसी `cavemanOutputMode.enabled` सेटिंग `cavemanOutputMode.intensity` वर `terse-prose` वर नकाशे करते. ब्लॉक नंतर `[OmniRoute Output Styles]` मार्करने सुरू होतो, जिथे `applyCavemanOutputMode()` इंजेक्टरने `[OmniRoute Caveman Output Mode]` लिहिले. मार्करच्या खाली, मजकूर en, pt-BR, es, de, fr, it, ru, id आणि vi मधील लेगसी इंजेक्शनशी जुळतो; ja आणि zh मध्ये सीमा खंडापूर्वी एक अतिरिक्त जागा असते. `terse-prose` भाषांतर pt-BR, es, de, fr, it, ru, zh, ja, id आणि vi मध्ये होते, त्यामुळे ज्या विनंतीची सोडवलेली भाषा `hu` आहे त्याला इंग्रजी मजकूर प्राप्त होतो जेथे लेगसी इंजेक्टरने हंगेरियन भाषेचा वापर केला होता.

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

शैली × भाषा मॅट्रिक्स `tests/unit/compression/output-styles-i18n-matrix.test.ts` द्वारे पिन केलेली आहे: प्रत्येक कॅटलॉग शैलीला चाचणीच्या `BASELINE_LANGUAGES` मध्ये प्रवेश आवश्यक आहे; `KNOWN_ENGLISH_ONLY` मध्ये सूचीबद्ध नसल्याशिवाय लोकेल-गेट नसलेली शैली pt-BR भाषांतर पाठविणे आवश्यक आहे (लोकॅल-गेटेड `terse-cjk` या नियमातून मुक्त आहे) , ज्यात — मध्ये कोणतेही भाषांतर नसलेल्या केवळ शैली असू शकतात ज्यात कोणतेही भाषांतर चाचणीत अपयशी ठरते; आणि शैली चाचणीत अपयशी ठरते जेव्हा ती `BASELINE_LANGUAGES` एंट्री सूचीबद्ध केलेली भाषा गमावते. शैली जोडण्यासाठी, [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) पहा.

### साधन परिणाम संक्षेप

`open-sse/services/compression/toolResultCompressor.ts` मधील `compressToolResult()` टूल-परिणाम मजकूर यासह संकुचित करते** 5 धोरणे** . ते त्यांना या क्रमाने वापरून पाहते आणि प्रथम सक्षम केलेली रणनीती ज्याची तपासणी सामग्रीशी जुळते ते निकाल ठरवते:

1. **`fileContent`** : 3 किंवा अधिक ओळींचा आशय ज्यामध्ये किमान एक ओळ, अग्रगण्य इंडेंटेशनकडे दुर्लक्ष करून, `import `, `export `, `function `, `class `, `const `, `let `, `var ` किंवा `return ` (कीवर्ड अधिक स्पेस) ने सुरू होते किंवा `if`, `for` किंवा त्याचे `(` `while` ` (` पहिल्या 20 आणि शेवटच्या 5 ओळी, ज्यामध्ये एलिडेड मध्य चिन्हांकित आहे.
2. **`grepSearch`** : `<path>:<digits>:` फॉर्मची किमान एक ओळ असलेली सामग्री, जिथे पहिल्या कोलनच्या आधीच्या मजकुरात व्हाइटस्पेस नसते, फक्त त्या ओळी ठेवतात, जास्तीत जास्त 30, त्यानंतर कोणत्याही पुढील जुळण्यांची संख्या आणि जुळलेल्या फायलींची सूची; प्रत्येक दुसरी ओळ टाकली आहे. अशी एक ओळ रणनीती ट्रिगर करण्यासाठी पुरेशी आहे, म्हणून `12:30:45` सारख्या टाइमस्टॅम्पने सुरू होणारी लॉग लाइन देखील मोजली जाते.
3. **`shellOutput`** : आउटपुट ज्यामध्ये ANSI CSI क्रम असतो (`ESC[` नंतर अंक किंवा अर्धविराम नंतर एक अक्षर, जसे की कलर कोडमध्ये) किंवा मजकुरात कोठेही व्हाईटस्पेस नंतर `$` हे क्रम गमावतात (इतर एस्केप, जसे की `ESC[?25l` किंवा OSC विंडो-शीर्षक आणि त्याच्या शेवटच्या 5 रिपीट सीक्वेन्स ठेवल्या जातात) ओळी कोसळल्या. कारण हा चेक `json` आणि `errorMessage` आधी चालतो, JSON किंवा एरर आउटपुट ज्यामध्ये असा `$` असतो `shellOutput` चालू असताना त्यांच्यापर्यंत पोहोचत नाही.
4. **`json`** : `{` किंवा `[` (पर्यायी व्हाईटस्पेस नंतर) ने सुरू होणारे 2,000 वर्णांहून अधिक JSON पेलोड आणि पार्सेस सारांशित केले आहेत: 7 पेक्षा जास्त आयटमचा ॲरे त्याचे पहिले 5 आणि शेवटचे 2 आयटम आणि त्याची एकूण संख्या ठेवते, आणि ऑब्जेक्ट त्याच्या पहिल्या 20 की ठेवते, प्रत्येक नेस्टेड ऑब्जेक्ट किंवा ॲरेच्या जागेसाठी `{…N keys}` (एनक्यूएड) मूल्य (एरे) बदलते. लांबी) आणि एक `_remaining_<N>_keys` मार्कर पहिल्या 20 च्या मागे टाकलेल्या कळा मोजत आहे. स्केलर मूल्ये संपूर्ण कॉपी केली जातात, म्हणून 20 की किंवा त्यापेक्षा कमी नेस्टेड व्हॅल्यू नसलेल्या ऑब्जेक्टला फक्त — पुन्हा इंडेंट केले जाते आणि मिनिफाइड केलेले वर्ण मिळवतात आणि अपरिवर्तित राहतात.
5. **`errorMessage`** : आउटपुट ज्यामध्ये कोठेही आणि कोणत्याही अक्षराच्या केसमध्ये, `error:`, `error ` (स्पेस त्यानंतरचा शब्द, `no error found` प्रमाणे), `[error]`, `exception:`, `exception `, `[exception]` किंवा `traceback` ची पहिली ओळ, पुढील 10 ओळी आणि शेवटची 3, त्यांच्या दरम्यान `… [N frames elided] …` मार्कर ठेवते. पहिल्या ओळीच्या 13 पेक्षा जास्त ओळी आल्यावरच मार्कर दिसून येतो, त्यामुळे 14 किंवा त्यापेक्षा कमी ओळींचे एरर आउटपुट लहान केले जात नाही (12 किंवा 13 ओळींवर शेवटच्या 3 रिपीट ओळी आधीच ठेवल्या आहेत).

एखादी रणनीती जुळल्यानंतर, एकही ज्याने काहीही वाचवले नाही, नंतरच्या धोरणांचा प्रयत्न केला जात नाही. जेव्हा जुळणारी रणनीती अंदाजे टोकन जतन करत नाही (लांबी ÷ 4, राउंड अप) — उदाहरणार्थ 25 किंवा त्यापेक्षा कमी ओळींची कोड-सदृश फाइल, किंवा 7 आयटम किंवा त्यापेक्षा कमी — असलेली 2,000 वर्णांपेक्षा जास्त JSON ॲरे, आक्रमक इंजिन मूळ साधन परिणाम ठेवते: `saved` आणि मूळ दोन्ही (`compressAggressive()` `compressAnthropicToolResultBlock()`) ठेवतात तेव्हा किंवा खाली, `compressToolResult()` स्वतः अजूनही त्या धोरणाचे आउटपुट परत करते. टूल-रिझल्ट पायरी हा शेवटचा शब्द नाही: इंजिनचा फॉलबॅक सारांश अजूनही 8,192 वर्णांपेक्षा मोठा `tool` किंवा `function` संदेश लहान करू शकतो (`maxTokensPerMessage`, 2,048, गुणा 4).

#### कधी वापरायचे

टूल रिझल्ट कॉम्प्रेशन हे ॲग्रेसिव्ह इंजिनचे स्टेप 1 आहे (`compressAggressive()` मधील `open-sse/services/compression/aggressive.ts`), त्यामुळे ते ॲग्रेसिव्ह मोडमध्ये आणि स्टॅक केलेल्या पाइपलाइनच्या `aggressive` स्टेपमध्ये चालते. हे OpenAI-shape `tool` आणि `function` संदेश आणि Anthropic `tool_result` ब्लॉकमधील मजकूर संकुचित करते. प्रत्येक रणनीतीचे `aggressive.toolStrategies` अंतर्गत स्वतःचे स्विच असते, सर्व काही डीफॉल्टनुसार चालू असते. डॅशबोर्डमध्ये, स्विच केव्हमॅन पेजमध्ये आहेत** प्रगत** कॉम्प्रेशन चालू असताना पहा आणि डीफॉल्ट मोड आक्रमक आहे.

### रचलेली पाइपलाइन

स्टॅक केलेला मोड चालतो** अनुक्रमे अनेक इंजिन** — सहसा RTK प्रथम (टूल आउटपुटवर 60-90% बचत), नंतर उर्वरित मजकूरावर Caveman (~ 46% इनपुट बचत). बनलेले, ते आहे** 78-95% पात्र श्रेणी** (वरील अपस्ट्रीम बचत गणित पहा): `1 - (1 - 0.60..0.90) × (1 - 0.46)` सरासरी ≈ 89%.

#### ते कसे कार्य करते

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### कधी वापरायचे

यासाठी स्टॅक केलेला मोड वापरा:

- टूल-हेवी वर्कफ्लो (एजंटिक कोडिंग, संशोधन)
- खर्च-संवेदनशील बॅच प्रक्रिया
- जेव्हा आपल्याला जास्तीत जास्त टोकन बचतीची आवश्यकता असते

स्टॅक केलेल्या पाइपलाइन ग्लोबल `stackedPipeline` कॉम्प्रेशन सेटिंगद्वारे कॉन्फिगर केल्या जातात किंवा राउटिंग कॉम्बोला नियुक्त केलेल्या नामांकित कॉम्प्रेशन कॉम्बोद्वारे (वरील प्रति-कॉम्बो ओव्हरराइड पहा) — ऑटो-कॉम्बो `modePack` द्वारे नाही (ते फील्ड केवळ ऑटो-कॉम्बो मॉडेल निवडीचे पुन्हा वजन करते आणि `stacked` हे वैध पॅक नाव नाही).

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
