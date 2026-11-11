# Release-Green: candidate validation and evidence (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

रिलीज़-ग्रीन एक विशिष्ट प्रतिबद्धता का अवलोकन करता है और उसके सत्यापन परिणामों की रिपोर्ट करता है। [क्वालिटी गेट्स संदर्भ](../architecture/QUALITY_GATES.md) वर्तमान CI प्रोफाइल, आवश्यक जांच और स्वीकृति नीति को परिभाषित करता है। `config/quality/admission-policy.json` में संस्करणित प्रवेश नीति `Gate / CI` और `Gate / Quality` के लिए निष्पादन योग्य अनुबंध है।

## CI और पर्यवेक्षक दायरा

`ci.yml` और `quality.yml` मुख्य और रिलीज़ शाखाओं में पुल अनुरोधों को कवर करते हैं। चयनित प्रोफ़ाइल निर्धारित करती है कि कौन सी नौकरियाँ लागू होंगी। पूर्ण CI वे लेन भी शामिल हैं जिन्हें सामान्य पुल अनुरोध निष्पादित नहीं करता है। एक त्वरित पर्यवेक्षक परिणाम उन नौकरियों को प्रतिस्थापित नहीं कर सकता है, और एक पूर्ण वर्कफ़्लो रैपर इसकी प्राप्तियों को प्रतिस्थापित नहीं कर सकता है।

उत्पादन निर्माण CI का है। `quality.yml` में कोई डुप्लिकेट एडवाइजरी बिल्ड नहीं है। गुम कलाकृतियाँ, रद्द किया गया कार्य और अपूर्ण माप सफल आवश्यक जाँच स्थापित नहीं करते हैं। परिणाम स्वीकार करने से पहले वर्तमान आधार, प्रमुख और संयुक्त उम्मीदवार की पुष्टि करें।

## स्थानीय सत्यापन

ऑब्जर्वर की निर्भरताएँ तैयार करने के बाद उसे स्वामित्व वाली वर्कट्री में चलाएँ। भारी सत्यापन से पहले `docs/ops/WORKTREE_ISOLATION.md` में वर्कट्री और संसाधन प्रोटोकॉल का पालन करें।

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

त्वरित प्रोफ़ाइल आंशिक है. पूर्ण प्रोफ़ाइल इसकी मॉडल की गई आवश्यकताओं की जांच करती है और कमांड प्राप्तियों को संरक्षित करती है; यह लागू होस्टेड चेक के लिए तैनाती या प्रतिस्थापन को प्रमाणित नहीं करता है। रिपोर्ट निष्पादन विफलता को मीट्रिक बहाव से अलग करती है। आवश्यक शाफ़्ट चयनित नीति के अनुसार अवरुद्ध रहते हैं। केवल उत्तीर्ण परिणाम प्राप्त करने के लिए आधार रेखा न बढ़ाएं।

## रात्रिकालीन और मैन्युअल सफाई

रात्रिकालीन रिलीज़ और संगतता रिज़ॉल्वर एक कैनोनिकल रिलीज़ शाखा का चयन करते हैं। वह चयन उस शाखा से मेल खाना चाहिए जिसने वर्कफ़्लो को ट्रिगर किया, और सुइट्स ईवेंट के अपरिवर्तनीय SHA उपयोग करते हैं। मैन्युअल निष्पादन के लिए, `release_branch` में इच्छित रिलीज़ का चयन करें और उसी संदर्भ पर भेजें:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

चयनित कोड निष्पादित करने से पहले क्रॉस-ब्रांच प्रेषण अस्वीकार कर दिया जाता है। होस्ट किए गए मुख्य सुइट्स `main` चेकआउट करें और सत्यापित करें कि इसका SHA अभी भी इंस्टॉलेशन से पहले हल किए गए लक्ष्य से मेल खाता है। यदि रिज़ॉल्यूशन के दौरान मुख्य चाल चलती है, तो नए कमिट पर अपूर्ण स्वीप को फिर से चलाएँ। विभिन्न उम्मीदवारों से प्राप्त सुइट रसीदों को संयोजित न करें।

## विफलता ट्राइएज और पुनर्प्राप्ति

घटना को डायग्नोस्टिक इंडेक्स के रूप में उपयोग करें, फिर सटीक रन, प्रयास, असफल चरण और आर्टिफैक्ट का निरीक्षण करें। किसी योगदानकर्ता पर विफलता का आरोप लगाने से पहले समकक्ष आधार और उम्मीदवार के साक्ष्य की तुलना करें। बुनियादी ढाँचे की त्रुटियाँ, विरासत में मिली खामियाँ, उम्मीदवार का प्रतिगमन और लंबित अनुमोदनों के लिए अलग-अलग उपचार की आवश्यकता होती है।

`/green-prs`, `/sweep-reds`, `/validate-release-green` और `/babysit` कौशल साक्ष्य एकत्र करते हैं और अपने दस्तावेजी दायरे के तहत सुधार तैयार करते हैं। योगदानकर्ता का श्रेय बनाए रखें, पृथक मरम्मत शाखाओं का उपयोग करें, और अधिकृत विलय से पहले सभी आवश्यक जांचों को सत्यापित करें। उत्तीर्ण वर्तमान उम्मीदवार के लिए कोई स्वचालित रीबेसलाइन या घटना समापन विकल्प नहीं।
