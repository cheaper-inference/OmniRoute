# Quality Gates Reference (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

यह दस्तावेज़ OmniRoute में सभी CI गुणवत्ता गेट्स के लिए आधिकारिक संदर्भ है।
यह प्रत्येक गेट, उसके द्वारा सत्यापित चीज़ों, वह किस CI जॉब में चलता है, क्या वह
रैचेट बेसलाइन या पास/फेल नीति का उपयोग करता है, और क्या वह बिल्ड को अवरुद्ध करता है या केवल परामर्शात्मक है, इसका वर्णन करता है।

संक्षिप्त सारांश और अनुमतिसूची नीति के लिए, `AGENTS.md` में
"Quality Gates & Ratchets" अनुभाग देखें। इसी सिस्टम के महत्वपूर्ण आकलन, परिपक्वता वर्गीकरण और
टूल-अज्ञेयवादी प्रतिकृति योजना के लिए,
[गुणवत्ता गेट प्लेबुक](../ops/QUALITY_GATE_PLAYBOOK.md) देखें।

---

## गेट इन्वेंटरी और निष्पादन प्रोफ़ाइल

### उम्मीदवार स्वीकृति

CI और Quality Gates वर्कफ़्लो प्रत्येक एक स्थिर निर्णय देते हैं: `Gate / CI` और
`Gate / Quality`। उनकी संस्करणबद्ध स्वीकृति नीति प्रत्येक अपस्ट्रीम जॉब को
आवश्यक या परामर्शात्मक के रूप में सूचीबद्ध करती है। लागू होने वाला आवश्यक जॉब सफल होना चाहिए:
अनुपस्थित, रद्द, छोड़े गए, लंबित और अज्ञात परिणाम PASS स्थापित नहीं कर सकते। एक मान्य
केवल-दस्तावेज़ या केवल-कैटलॉग वर्गीकरण किसी कोड लेन को अनुपयुक्त बना सकता है;
ड्राफ़्ट PR स्वीकृत उम्मीदवार नहीं है। `hotfix` लेबल साक्ष्य की आवश्यकता समाप्त नहीं करता।

दोनों वर्कफ़्लो main/release ब्रांच में आने वाले PR, `main` पर पुश, मैन्युअल डिस्पैच
और मर्ज-ग्रुप इवेंट को कवर करते हैं। पुश, डिस्पैच और मर्ज-ग्रुप पूर्ण चयन चलाते हैं। `release/**`
पर पुश उन्हें शुरू नहीं करते (2026-10-18): प्रत्येक बदलाव ने पहले ही अपने PR पर मैट्रिक्स चलाया है
और मर्ज किया गया संयोजन Release-Green का कार्य है (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन)। फ़ोर्क
और मर्ज ग्रुप उन जॉब के लिए होस्टेड रनर का उपयोग करते हैं जो अन्यथा सेल्फ-होस्टेड
रनर चुनते हैं; रोलआउट से पहले पर्याप्त होस्टेड क्षमता सत्यापित की जानी चाहिए।

प्रत्येक JSON रसीद चेक-आउट किए गए SHA, वर्कफ़्लो रन और प्रयास की पहचान करती है।
CLI चेकआउट/इवेंट SHA बेमेल होने पर अस्वीकार कर देता है। वर्कफ़्लो परीक्षण नीति सदस्यता को
निर्णय जॉब की `needs` सूची से बाँधते हैं, ताकि कोई नई या हटाई गई लेन चुपचाप गायब न हो सके।
रसीदें केवल अपने स्वयं के वर्कफ़्लो को कवर करती हैं, प्रकाशन, डिप्लॉयमेंट या किसी मौजूदा
एडवाइज़री स्कैनर के आंतरिक हिस्सों को नहीं। लागू जाँचों को ब्रांच नियमों में आवश्यक बनाना
एक अलग प्रशासनिक परिवर्तन है; केवल उनके जॉब परिभाषित करना किसी ब्रांच को सुरक्षित नहीं करता।

`API Route Typecheck` एक स्वतंत्र वर्कफ़्लो जाँच है, जो दोनों समेकित निर्णयों
और स्थानीय पूर्ण ऑब्ज़र्वर की स्थिर प्रोफ़ाइल से बाहर है। सटीक
कैंडिडेट के लिए इसके परिणाम का अलग से निरीक्षण करें। `.github/workflows/api-route-typecheck.yml`, `main` या
`release/**` में जाने वाले PR, दोनों में से किसी भी ब्रांच परिवार पर होने वाले पुश और मैन्युअल डिस्पैच पर चलता है। इसमें कोई पाथ फ़िल्टर नहीं है।
PR बेस को पुनः लक्षित करने पर नई जाँच का अनुरोध होता है; बॉडी/शीर्षक के संपादन केवल-ऑब्ज़र्वेशन नाम
`Admission not requested / API Route Typecheck` का उपयोग करते हैं और एडमिशन जाँच को प्रतिस्थापित नहीं कर सकते।
वर्कफ़्लो मर्ज-ग्रुप ट्रिगर घोषित नहीं करता। इस जाँच की आवश्यकता वाले किसी भी मर्ज-क्यू रोलआउट को
पहले उस इवेंट के लिए इसका निष्पादन स्थापित करना होगा।

### UI निष्पादन क्षमता

CI पूरी UI इन्वेंटरी को चार `test-vitest` मैट्रिक्स शार्ड के रूप में चलाता है, जिनमें प्रत्येक के पास अधिकतम
दो वर्कर और मौजूदा 15-मिनट की जॉब समय-सीमा होती है। पहला शार्ड
MCP/autoCombo Vitest सुइट भी चलाता है। आवश्यक जॉब परिणाम प्रत्येक मैट्रिक्स लेग को कवर करता है; किसी
एक शार्ड की विफलता या रद्द होना उम्मीदवार स्वीकृति स्थापित नहीं कर सकता।

नाइटली ऑब्ज़र्वर प्रत्येक UI शार्ड के लिए एक अलग, सटीक-उम्मीदवार रसीद बनाए रखता है,
जिसमें पहली रसीद में MCP निष्पादन भी शामिल है। सभी चार रसीदें, लॉग और मेल खाती
निष्पादन पहचानें आवश्यक हैं। स्थानीय `npm run test:vitest:ui` अब भी
पूरा सुइट चुनता है; एक `--shard` रन केवल आंशिक साक्ष्य है।

### यूनिट कवरेज संग्रह

बारह यूनिट शार्ड अपने मौजूदा परीक्षण निष्पादन के दौरान V8 कवरेज एकत्र करते हैं। एक सफल
शार्ड किसी मध्यवर्ती Istanbul रिपोर्ट को उत्पन्न किए बिना मूल फ़ाइलों को संपीड़ित करने के लिए
`scripts/ci/compact-v8-coverage.mjs` चलाता है। अंतिम Coverage जॉब उम्मीदवार SHA, रनटाइम,
सोर्स रूट और डेटा हैश के विरुद्ध सभी बारह मैनिफ़ेस्ट सत्यापित करता है, फिर c8 के रिपोर्टर और मौजूदा
कवरेज थ्रेशोल्ड चलाता है। इनपुट c8 के वैश्विक फ़ाइलनाम क्रम को बनाए रखते हैं; मिश्रित फ़ंक्शन/ब्लॉक
कवरेज के लिए प्रति-शार्ड पूर्व-मर्जिंग असुरक्षित है। अनुपस्थित, विकृत या असंगत शार्ड स्वीकृति को
विफल कर देते हैं। विफल परीक्षण शार्ड कच्चे डायग्नोस्टिक कवरेज को अलग से बनाए रखते हैं; वह अंतिम मर्ज में
प्रवेश नहीं कर सकता।

### यूनिट निष्पादन प्रगति रसीदें

साझा `test:unit:ci:shard` कमांड `scripts/ci/unit-progress-reporter.mjs` के माध्यम से `primary`, `dashboard` और `serial` चरणों को रिकॉर्ड करता है। सामान्य परीक्षण रिपोर्ट उपलब्ध रहती है। एक अलग, केवल-मेटाडेटा रसीद प्रत्येक फ़ाइल के प्रारंभ और पूर्ण होने को रिकॉर्ड करती है, और 30-सेकंड का हार्टबीट उन फ़ाइलों को सूचीबद्ध करता है जो अभी भी सक्रिय हैं तथा उनका बीता हुआ समय बताता है। यह केवल अनुमत-सूची में शामिल निष्पादन मेटाडेटा रिकॉर्ड करता है; परीक्षण विवरण, आउटपुट, त्रुटि का मुख्य भाग और पूरा एनवायरनमेंट सीरियलाइज़ नहीं किए जाते हैं।

CI और Quality, JSONL फ़ाइलों को `unit-progress-ci-<run>-<attempt>-<shard>` और `unit-progress-quality-<run>-<attempt>-<shard>` के रूप में संरक्षित रखते हैं। जॉब टाइमआउट बाद में होने वाले अपलोड को रोक सकता है; पहले ही उत्सर्जित हार्टबीट नैदानिक साक्ष्य बने रहते हैं। हार्टबीट का अनुपस्थित होना अवरुद्ध या समाप्त हो चुकी रनर प्रक्रिया का संकेत भी हो सकता है। ये रसीदें मौजूदा परीक्षण चयन, समवर्ती निष्पादन, समय-सीमाओं और एग्ज़िट स्थिति को संरक्षित रखती हैं; ये उम्मीदवार-स्वीकृति के निर्णय नहीं हैं।

### स्वीकृति परिणाम संयोजक में सुरक्षित रखे गए साक्ष्य

`scripts/quality/validate-release-acceptance.mjs` दिए गए प्लान और उसके मैनिफेस्ट के परिणामों को जोड़ता है; यह स्थापित नहीं करता कि प्लान पूरी रिलीज़ पाइपलाइन को कवर करता है। प्लान `VERIFIED` होने पर भी इसकी रिपोर्ट स्पष्ट रूप से `releaseAcceptance: false` सेट करती हैं। `release-acceptance.yml` वर्कफ़्लो अभी भी शैडो टेस्ट फ़िक्स्चर उपयोग करता है, वास्तविक बिल्ड, पैकेज, बूट या प्रमोशन की रसीदें नहीं।

सुरक्षित रखे गए साक्ष्यों की पुष्टि के लिए CLI को `--evidence-root` चाहिए। फ़ाइलें `<evidence-root>/<artifact_id>/<member>` पर खोजी जाती हैं और उनका SHA-256 हैश निकाला जाता है। साक्ष्य के बिना PASS रिकॉर्ड, गुम या बदली हुई फ़ाइल, असुरक्षित पाथ या सिमलिंक पुष्टि को रोकता है। गुम फ़ाइलें सफल रन के खाली लॉग के बराबर नहीं हैं। मौजूदा SHA/run/attempt जाँच स्वतंत्र रहती हैं: समान बाइट पुरानी रसीद को वैध नहीं बना सकते। फ़ाइल की अखंडता रन की प्रामाणिकता या आर्टिफ़ैक्ट के प्रमोशन का प्रमाण नहीं है।

### स्टैटिक स्कैन इन्वेंटरी

संस्करणबद्ध npm-एलियस इन्वेंटरी और स्टैटिक-स्कैन सदस्यता
`config/quality/gate-manifest.json` में रहती हैं। `package.json` के विरुद्ध स्क्रिप्ट नामों
और सटीक कमांड को सत्यापित करने के लिए `npm run check:gate-manifest` चलाएँ; जोड़, हटाव और
कमांड विचलन स्थानीय हुक और CI के बदलाव-वर्गीकरण जॉब, दोनों को विफल कर देते हैं।
कोई एलियस वर्कफ़्लो जॉब, मैट्रिक्स इंस्टेंस या टेस्ट केस नहीं होता: इन गणनाओं को
परस्पर विनिमेय के रूप में प्रस्तुत नहीं किया जाना चाहिए।

चयनित एलियस को निष्पादित किए बिना उनका निरीक्षण करने के लिए
`npm run quality:scan -- --list` या `npm run quality:scan:fast -- --list` का उपयोग करें।
रनर npm एंट्रीपॉइंट को इनवोक करता है, इसलिए उसका रनटाइम (जहाँ कॉन्फ़िगर किया गया है वहाँ Bun सहित)
बना रहता है। मैनिफ़ेस्ट उन प्रोफ़ाइल से बाहर के एलियस को अलग से इनवोक किए गए के रूप में दर्ज करता है,
और केवल-पढ़ने योग्य स्कैन प्रोफ़ाइल में रखरखाव कमांड निषिद्ध हैं।

ये प्रोफ़ाइल केवल स्टैटिक स्कैन को कवर करती हैं। ये उत्पाद परीक्षणों,
कवरेज, पैकेजिंग, बाहरी जाँच या किसी उम्मीदवार की पूर्ण रिलीज़ स्वीकृति को प्रमाणित नहीं करतीं।
वर्कफ़्लो स्वीकृति लिंक किए गए `config/quality/admission-policy.json` और
`scripts/quality/admission-verdict.mjs` का उपयोग करती है। रिलीज़-ऑब्ज़र्वर प्रोफ़ाइल अलग रहती हैं;
उनकी लागू जाँचों और रसीदों का स्वतंत्र रूप से निरीक्षण करें। पूर्ण ऑब्ज़र्वर के स्टैटिक
कमांड `config/quality/release-green-static-profile.json` में घोषित हैं, जिनमें
`audit:deps`, म्यूटेशन-टेस्ट चयन और अनुवाद जाँच शामिल हैं। लोडर npm
कमांड को package.json और मॉडल किए गए CI/Quality घोषणाओं के विरुद्ध सत्यापित करता है; यह शेल टोकन को
आर्ग्युमेंट के रूप में निष्पादित करने के बजाय विचलन को अस्वीकार करता है। आवश्यक स्कैनर का SKIP/INCOMPLETE आउटपुट
PASS स्थापित नहीं कर सकता। प्रोफ़ाइल अपने बाहरी अपवर्जनों को दर्ज करती है और
होस्टेड कवरेज, टेस्ट मैट्रिक्स, पैकेज या परिनियोजन साक्ष्य को प्रतिस्थापित नहीं करती। नीचे दी गई गद्य इन्वेंटरी
एक संदर्भ है, इस बात का प्रमाण नहीं कि कोई गेट वास्तव में चला था।

स्क्रिप्ट `scripts/check/` (नीति गेट) और `scripts/quality/` (रैचेट इंजन) के अंतर्गत रहती हैं।
CI का प्रामाणिक स्रोत `.github/workflows/ci.yml` है।

### प्रकाशित बेस दस्तावेज़ीकरण की स्थिति

`.github/workflows/i18n-base-health.yml`, `main` और `release/v*` पर चुनिंदा पुश के बाद तथा मैन्युअल डिस्पैच पर दस्तावेज़ीकरण की स्थिति का निरीक्षण करता है। इसके फ़िल्टर दस्तावेज़ीकरण, रूट Markdown, `llm.txt`, अनुवाद स्थिति/कॉन्फ़िगरेशन और संबंधित i18n टूलिंग को कवर करते हैं। एकमात्र `Published base documentation health` जॉब होस्टेड Ubuntu का उपयोग करता है और इसकी समय-सीमा पाँच मिनट है। यह केवल-पठन सत्यापन करता है और डिपेंडेंसी इंस्टॉलेशन, अनुवाद या स्थिति अपनाए बिना एक डायग्नोस्टिक रसीद लिखता है।

`scripts/i18n/check-base-health.mjs` के लिए आवश्यक है कि source-hash, missing-target, target-hash, stale-translation तथा section-cache से संबंधित कोई असंगति न हो। यह वर्तमान मुख्य दस्तावेज़/लोकेल दायरे और उसके रिकॉर्ड किए गए उद्गम को भी सत्यापित करता है। अमान्य संदर्भ, अपूर्ण कवरेज या बाधित चेकर के परिणामस्वरूप `INCOMPLETE` मिलता है; पुष्टि की गई विसंगति के परिणामस्वरूप `FAIL` मिलता है। दोनों विफलता दर्शाने वाला exit status लौटाते हैं। रसीद checkout SHA, workflow, run और attempt से संबद्ध होती है तथा `i18n-base-health-<sha>-<run>-<attempt>` के रूप में रखी जाती है।

यह प्रकाशित बेस का एक स्वतंत्र निरीक्षण है। यह कोई PR या merge-group event, आवश्यक PR check, npm alias या static-scan profile member नहीं जोड़ता। मौजूदा differential PR policy और अंतर्निहित चेकर के advisory classifications अलग बने रहते हैं। सफल अपलोड, विफल health result को PASS में नहीं बदल सकता।

### रिलीज़ PR फ़ास्ट-पाथ (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main` पर पुश,
डिस्पैच और मर्ज ग्रुप पर CI का पूरक है। PR पाथ-फ़िल्टर की गई तेज़ जाँचों का उपयोग करते हैं। स्थायी रूप से
अक्षम डुप्लिकेट बिल्ड हटा दिया गया था; वास्तविक बिल्ड/package/बूट जाँच CI में बनी रहती हैं।

| जॉब                                              | दायरा                                                                                                                                                                                                                                     | अवरोधक           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | दस्तावेज़/कोड PRs; API दस्तावेज़ संदर्भ और docs-all                                                                                                                                                                                       | हाँ              |
| `Fast Quality Gates`                             | कोड PRs; स्थैतिक जाँच, टाइप जाँच, डैशबोर्ड टाइप जाँच, प्रभावित यूनिट परीक्षण                                                                                                                                                              | हाँ              |
| `Forgotten sibling tests`                        | कोड PRs; बदले गए मॉड्यूल से स्थैतिक उपभोक्ताओं और संभावित सिबलिंग परीक्षणों का पता लगाया जाता है; बैरल और डायनेमिक-इम्पोर्ट पथों को परामर्शात्मक निदान के रूप में रिपोर्ट किया जाता है, साथ ही संदर्भित अनुमति-सूची अपवाद भी दिए जाते हैं | **परामर्शात्मक** |
| `Vitest (fast-path)`                             | कोड PRs; तेज़ vitest सुइट                                                                                                                                                                                                                 | हाँ              |
| `Unit Tests fast-path`                           | कोड PRs; 4-शार्ड यूनिट सुइट                                                                                                                                                                                                               | हाँ              |
| `No new ESLint warnings`                         | कोड PRs; सप्रेशन-जागरूक लिंट गार्ड                                                                                                                                                                                                        | हाँ, फ़ोर्क सहित |
| `Merge integrity (changelog + generated skills)` | गैर-ड्राफ़्ट PRs; चेंजलॉग और जनरेट किए गए स्किल का सिंक                                                                                                                                                                                   | हाँ, फ़ोर्क सहित |

#### भूले गए सिबलिंग परीक्षणों की रिपोर्ट

`npm run check:forgotten-sibling-tests` परीक्षण-प्रभाव मैप के पीछे मौजूद इम्पोर्ट रिज़ॉल्वर का पुनः उपयोग करता है।
हर बदले गए प्रोडक्शन मॉड्यूल के लिए, यह नियतात्मक
`changed module/symbol -> static consumer -> candidate sibling test` शृंखलाओं को तब रिपोर्ट करता है, जब संभावित
परीक्षण पुल रिक्वेस्ट के डिफ़ में अनुपस्थित हो। किसी भी अवरोधक रोलआउट से पहले कैलिब्रेशन के लिए Markdown सारांश और JSON परिणाम को
`forgotten-sibling-tests` वर्कफ़्लो आर्टिफ़ैक्ट के रूप में रखा जाता है।

बैरल री-एक्सपोर्ट और डायनेमिक इम्पोर्ट केवल रिज़ॉल्यूशन निदान हैं; वे कभी भी
अवरोधक निष्कर्ष नहीं बनाते। समीक्षा किए गए अपवाद
`config/quality/forgotten-sibling-allowlist.json` में मौजूद हैं। प्रत्येक प्रविष्टि में उपभोक्ता और संभावित
परीक्षण का नाम, एक विशिष्ट औचित्य और GitHub इश्यू या पुल रिक्वेस्ट का लिंक होना चाहिए। विकृत प्रविष्टियाँ
बंद स्थिति में विफल होती हैं। अपवाद किसी हटाए गए संभावित परीक्षण या `.skip`/`.todo` जोड़ने वाले डिफ़ को दबा नहीं सकते;
असर्शन को कमज़ोर करना और अन्य मास्किंग स्वतंत्र रूप से अवरोधक
`check:test-masking` गेट के अधीन रहते हैं।

### जॉब: `lint`

`main` के लिए प्रत्येक PR पर चलता है। विफलता होने पर मर्ज को अवरुद्ध करता है।

| स्क्रिप्ट (`npm run ...`)         | सत्यापित करता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | अवरोधक                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js संस्करण समर्थित सीमा के भीतर है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                          |
| `check:test-tla-order`            | `tests/unit` के अंतर्गत कोई भी `node:test` फ़ाइल किसी परीक्षण को पंजीकृत करने, शीर्ष-स्तरीय `await` तक पहुँचने, और फिर अन्य परीक्षण पंजीकृत करने का क्रम नहीं अपनाती (#18045; रैचेट: `test-tla-order-allowlist.json` केवल छोटा हो सकता है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                          |
| `check:cycles`                    | संपूर्ण `src/` + `open-sse/` में चक्रीय आयात (AST-आधारित, tsconfig `paths` समाधान सहित)। कोई भी चक्र मौजूद होने पर Bare निकास कोड 1 देता है (fail-closed, #15281 से) और SCC को सूचीबद्ध करता है। `check:cycles:ratchet` (जिसे CI चलाता है) तब अवरोधित करता है जब संख्या `quality-baseline.json` में `metrics.cycles` की अधिकतम सीमा से अधिक हो जाती है — वर्तमान में 14, `direction: down`, इसलिए यह केवल घट सकती है (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ (रैचेट)                                  |
| `check:boundary`                  | `open-sse → src` युग्मन: इंजन से ऐप में अद्वितीय फ़ाइल-से-फ़ाइल आयात (`scripts/quality/measure-boundary.mjs`; किनारों की सूची v4 कोर/मॉड्यूल-विभाजन सुधार बैकलॉग है)। Bare = परामर्शात्मक रिपोर्ट (`quality:boundary` के समान)। `check:boundary:ratchet` (जिसे CI चलाता है और जो `quality.yml` के fast-gates रैचेट लूप में भी है) तब अवरोधित करता है जब संख्या `quality-baseline.json` में `metrics.boundaryOpenSseToSrc` की अधिकतम सीमा से अधिक हो जाती है — मापे गए 771 पर आरंभिक मान निर्धारित, `direction: down`; `--update` इसे केवल घटाता है; PR पर आधार-सापेक्ष (`--base-ref`, नीचे देखें)                                                                                                                                                                                                                                                                                                                         | हाँ (रैचेट)                                  |
| `check:route-validation:t06`      | सभी routes पर Zod schemas मौजूद हैं (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हाँ                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` की संख्या budget से अधिक नहीं है (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हाँ                                          |
| `check:provider-consistency`      | `providers.ts` में मौजूद प्रत्येक provider की `providerRegistry.ts` में संगत entry है (और इसके विपरीत, allowlist के अंतर्गत)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हाँ                                          |
| `check:model-lifecycle`           | हाथ से अनुरक्षित तीन routing tables, checked-in lifecycle snapshot (#11503) के साथ संगत रहती हैं: `FITNESS_TABLE` (`taskFitness.ts`) ऐसे किसी retired id को score नहीं करती जिसे `REGISTRY` route कर सकती है; प्रत्येक `BUILT_IN_ALIASES` target `REGISTRY` में मौजूद और retired-id snapshot में अनुपस्थित है; `REGISTRY` में अभी भी मौजूद प्रत्येक retired id को forward किया गया है या `allowedRetiredInCatalog` में सूचीबद्ध किया गया है; और `DEFAULT_DEGRADATION_MAP` का कोई भी source या target उस snapshot में retired नहीं दिखता। यह सिद्ध नहीं करता कि कोई model वर्तमान में किसी live upstream द्वारा serve किया जा रहा है। Offline — `config/quality/model-lifecycle.json` के साथ तुलना करता है, जिसे `npm run quality:refresh-model-lifecycle` से हाथ से refresh किया जाता है (network; CI में wired नहीं है)। `allowedRetiredInCatalog` एक burn-down ratchet है: कोई entry केवल tracking issue के साथ जोड़ें। | हाँ                                          |
| `check:fetch-targets`             | client-side `src/` में मौजूद प्रत्येक `fetch("/api/...")` किसी वास्तविक `route.ts` पर resolve होता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हाँ                                          |
| `check:deps`                      | repo के प्रत्येक `package.json` में मौजूद सभी `npm install`-योग्य deps, `dependency-allowlist.json` में हैं; नए unpinned या slopsquatted packages को flag किया जाता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | हाँ                                          |
| `audit:deps`                      | सभी पाँच स्वतंत्र lockfiles (root, Electron, OpenCode plugins v1/v2 और provider) का npm audit। Critical advisories अवरोध उत्पन्न करती हैं; high advisories दृश्यमान चेतावनियाँ बनी रहती हैं। अनुपलब्ध/विफल audits को INCOMPLETE माना जाता है और वे अवरोध उत्पन्न करते हैं; प्रत्येक scope के lock hashes और reports सुरक्षित रखे जाते हैं।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                          |
| `check:lockfile`                  | `package-lock.json` की अखंडता — https registry, integrity hashes, कोई host overrides नहीं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                          |
| `check:licenses`                  | production dependencies के लिए SPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हाँ                                          |
| `check:tracked-artifacts`         | कोई build artifacts / committed `node_modules` symlinks नहीं (husky pre-commit में भी चलता है; pre-push को जानबूझकर हल्का रखा गया है — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हाँ                                          |
| `check:ai-attribution`            | PR commits, title या body में कोई AI/bot `Co-Authored-By` trailer या AI-generation footer नहीं — Hard Rule #16 (`quality.yml` के PR→`release/**` fast-gates loop में — event payload पढ़ता है, PRs के बाहर कोई कार्रवाई नहीं करता — और PR→`main` के लिए `ci.yml` lint में केवल-PR step; साथ ही husky `commit-msg` hook; मानव co-authors की अनुमति है; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | प्रत्येक Vitest exclusion में किसी tracking issue का उल्लेख हो और वह `config/quality/vitest-exclusions.json` में मौजूद हो (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हाँ                                          |
| `check:file-size`                 | स्रोत फ़ाइलें (`src/`, `open-sse/`, `electron/`, `bin/` में `.ts`/`.tsx`) `cap` के भीतर और परीक्षण फ़ाइलें (`*.test.ts(x)`) `testCap` के भीतर रहती हैं; `file-size-baseline.json` (`frozen` / `testFrozen`) में फ़्रीज़ की गई फ़ाइलें अपने दर्ज आकार से अधिक नहीं बढ़नी चाहिए                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हाँ                                          |
| `check:error-helper`              | एक्ज़ीक्यूटर/हैंडलर में त्रुटि प्रतिक्रियाएँ `buildErrorBody()` / `sanitizeErrorMessage()` का उपयोग करती हैं (कठोर नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हाँ                                          |
| `check:migration-numbering`       | माइग्रेशन SQL फ़ाइलें क्रमिक रूप से क्रमांकित हैं, जिनमें कोई अंतराल या डुप्लिकेट नहीं है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                          |
| `check:public-creds`              | `publicCreds.ts` के बाहर कोई शाब्दिक OAuth `client_id`/`client_secret` या Firebase Web कुंजियाँ नहीं हैं (कठोर नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                          |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल के बाहर कोई रॉ SQL नहीं है; `localDb.ts` से कोई बैरल-इम्पोर्ट नहीं है (कठोर नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हाँ                                          |
| `check:known-symbols`             | अपनी डिस्पैच तालिकाओं में पंजीकृत प्रोवाइडर एक्ज़ीक्यूटर, रूटिंग रणनीतियाँ और ट्रांसलेटर डिस्क पर मौजूद फ़ाइलों से मेल खाते हैं—कोई अनाथ या अघोषित सिंबल नहीं है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हाँ                                          |
| `check:route-guard-membership`    | चाइल्ड प्रोसेस शुरू करने वाला प्रत्येक रूट `isLocalOnlyPath()` द्वारा वर्गीकृत किया गया है (कठोर नियम #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हाँ                                          |
| `check:test-discovery`            | रेपो में प्रत्येक `*.test.ts` / `*.spec.ts` फ़ाइल कम-से-कम एक टेस्ट रनर द्वारा एकत्र की जाती है (रैचेट: `test-discovery-baseline.json` में ऑर्फ़न सूची केवल छोटी हो सकती है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हाँ                                          |
| `check:agent-skills-sync`         | जनरेट की गई एजेंट-स्किल्स आर्टिफ़ैक्ट्स अपनी स्रोत कैटलॉग से मेल खाती हैं (कोई विचलन नहीं)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | प्रोवाइडर लोगो/एसेट्स के लिए रिकॉर्ड की गई उत्पत्ति प्रविष्टि मौजूद है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON कॉन्फ़िगरेशन फ़ाइलें पार्स होती हैं और रेपो के लिंट नियमों को पूरा करती हैं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | त्रुटियों के बिना TypeScript संकलन (केवल परामर्शात्मक चेतावनियाँ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                          |
| `typecheck:noimplicit:core`       | सख्त `noImplicitAny` — भविष्य-उन्मुख; पहले से मौजूद कई कॉल साइट्स में अभी भी एनोटेशन की आवश्यकता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **परामर्शात्मक** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` तक सीमित `tsc` (#7033) — `typecheck:core` की सावधानीपूर्वक चुनी गई 27-फ़ाइलों की अनुमति-सूची में कोई भी डैशबोर्ड TSX शामिल नहीं है, और `next build` भी कभी इसका टाइप-जाँच नहीं करता (`next.config.mjs` में `ignoreBuildErrors: true` सेट है), इसलिए वहाँ की ऑर्फ़न-आइडेंटिफ़ायर रिग्रेशन (#6625/#6909) CI को दिखाई नहीं देती थीं। फ़्रीज़ किए गए प्रति-फ़ाइल/प्रति-TS-कोड गणना बेसलाइन (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` के समान स्टेल-एनफ़ोर्समेंट पैटर्न) के विरुद्ध अंतर देखता है — बेसलाइन की गई गणना से अधिक केवल नई त्रुटियाँ ही गेट को विफल करती हैं; जब कोई पहले से मौजूद त्रुटि ठीक हो जाए, तो `--update` के साथ सीमा कम करें।                                                                                                                                                                                                                 | हाँ                                          |

### जॉब: `quality-gate`

`test-coverage` के बाद चलता है। विफलता पर मर्ज को अवरुद्ध करता है।

| स्क्रिप्ट                    | सत्यापन                                                                                                                                                                                   | अवरोधक                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` उत्सर्जित करता है (ESLint चेतावनी गणना, मर्ज की गई शार्ड रिपोर्ट से कवरेज)                                                                                         | हाँ (रैचेट का अपस्ट्रीम) |
| `quality:ratchet`            | `quality-baseline.json` में प्रत्येक मेट्रिक रिग्रेस नहीं हुई है (ESLint चेतावनियाँ ≤ बेसलाइन; कवरेज ≥ बेसलाइन)                                                                           | हाँ                      |
| `check:duplication`          | कोड डुप्लिकेशन (jscpd@4) `quality-baseline.json` में दी गई बेसलाइन से अधिक नहीं है                                                                                                        | हाँ                      |
| `check:complexity`           | फ़ाइल-स्तरीय साइक्लोमैटिक जटिलता सीमा से अधिक नहीं है (कोर ESLint `complexity` + `max-lines-per-function`)                                                                                | हाँ                      |
| `check:cognitive-complexity` | कॉग्निटिव जटिलता रैचेट (`eslint-plugin-sonarjs`) — अलग ESLint पास; CI दोनों को एकल `check:complexity-ratchets` चरण के रूप में मर्ज करके चलाता है                                          | हाँ                      |
| `check:dead-code`            | अप्रयुक्त एक्सपोर्ट / फ़ाइल रैचेट (knip) बेसलाइन की तुलना में रिग्रेस नहीं होता                                                                                                           | हाँ                      |
| `check:compression-budget`   | कम्प्रेशन बेंचमार्क बजट — प्रति-इंजन टोकन-बचत की न्यूनतम सीमाएँ रिग्रेस नहीं होनी चाहिए                                                                                                   | हाँ                      |
| `check:type-coverage`        | प्रतिशत-टाइप्ड रैचेट (`type-coverage`) रिग्रेस नहीं होता; यह अधिकांशतः `typecheck:noimplicit:core` को समाहित करता है                                                                      | हाँ                      |
| `check:codeql-ratchet`       | खुले CodeQL अलर्ट की संख्या रिग्रेस नहीं होती (`gh api` के माध्यम से पढ़ता है; टोकन के बिना सुचारु रूप से स्किप करता है) — रीफ़्रेश आवृत्ति और मैन्युअल ट्रिगर: नीचे "CodeQL रैचेट" देखें | हाँ                      |

### जॉब: `quality-extended`

यह जॉब लागू होने वाले उम्मीदवारों को अवरुद्ध करता है। बंडल आकार, सीक्रेट निष्कर्ष, भेद्यता
निष्कर्ष, वर्कफ़्लो निष्कर्ष और OpenAPI परिवर्तनों की जाँच आवश्यक रैचेट के साथ की जाती है।
सर्कुलर-डिपेंडेंसी डायग्नोस्टिक्स केवल परामर्शात्मक बने रहते हैं। स्कैनर इंस्टॉलेशन आवश्यक है:
`scripts/ci/install-quality-scanners.sh` पिन किए गए संस्करणों की व्यवस्था करता है और
इंस्टॉलेशन विफलताओं को आगे प्रसारित करता है। अनुपलब्ध टूल, अमान्य रिपोर्ट या अनुपलब्ध बेसलाइन
आवश्यक स्कैनर गेट को INCOMPLETE स्थिति में छोड़ देते हैं।

| स्क्रिप्ट                | सत्यापन                                                                                                                                                                                                      | अवरोधक                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:circular-deps`    | कोई चक्रीय निर्भरता नहीं (dpdm)                                                                                                                                                                              | **परामर्शात्मक**                            |
| `check:bundle-size`      | बंडल का आकार निर्धारित सीमा से अधिक नहीं है; माप उपलब्ध न होने पर जाँच विफल हो जाती है                                                                                                                       | **--ratchet के साथ अवरोधक**                 |
| `check:secrets`          | Gitleaks निष्कर्षों में प्रतिगमन नहीं होता; आवश्यक स्कैन अनुपलब्ध टूल/स्रोत/बेसलाइन, विफल स्कैन और अमान्य रिपोर्ट को अस्वीकार करते हैं                                                                       | **--ratchet के साथ अवरोधक**                 |
| `check:vuln-ratchet`     | निर्भरता संबंधी कमजोरियों में प्रतिगमन नहीं होता; आवश्यक स्कैन अनुपलब्ध टूल, अमान्य रिपोर्ट या अनुपलब्ध बेसलाइन को अस्वीकार करते हैं                                                                         | **--ratchet के साथ अवरोधक**                 |
| `check:workflows`        | वर्कफ़्लो लिंट (actionlint + zizmor); अनुपलब्ध/खराब स्कैनर, अमान्य रिपोर्ट या अनुपलब्ध रैचेट बेसलाइन INCOMPLETE के रूप में विफल होती हैं। मान्य निष्कर्ष चयनित सख्त/परामर्शात्मक/रैचेट नीति का पालन करते हैं | निष्पादन आवश्यक; CI में zizmor रैचेट अवरोधक |
| `check:openapi-breaking` | पिन किए गए इवेंट कमिट के विरुद्ध सार्वजनिक API अनुबंध (PR merge-base, push before, merge-group base; निर्धारित/मैन्युअल चेकआउट का पहला पैरेंट); आवश्यक माप बंद-सुरक्षित ढंग से विफल होता है                  | **--ratchet के साथ अवरोधक**                 |

### जॉब: `docs-sync-strict`

`main` या `release/**` को लक्षित पुल रिक्वेस्ट के लिए यह जॉब केवल ऐसे प्रत्याशियों पर चलता है जो ड्राफ़्ट नहीं हैं (या विश्वसनीय कतार में हैं) और जिन्हें दस्तावेज़ीकरण या कोड में बदलाव के रूप में वर्गीकृत किया गया है। यह PR के अलावा अन्य CI घटनाओं पर भी चलता है; इस वर्कफ़्लो का push ट्रिगर केवल `main` को कवर करता है, `release/**` को नहीं। कोई चरण शून्य से भिन्न निकास कोड के साथ समाप्त होता है तो वह जॉब को अवरुद्ध करता है; केवल रिपोर्ट किए जाने वाले निष्कर्ष और नीचे दर्ज अपवाद ऐसा नहीं करते।

| स्क्रिप्ट                      | सत्यापन                                                                                                                                                                                                                                                                                                                                                                                                                                                      | अवरोधक                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | मेटा-गेट, जो नीचे दिए गए 7 उप-गेट क्रमिक रूप से चलाता है                                                                                                                                                                                                                                                                                                                                                                                                     | हाँ                                                                                                                                           |
| ↳ `check:docs-sync`            | पैकेज/OpenAPI/CHANGELOG के संस्करणों में संगति, `llm.txt` की हूबहू प्रतियाँ, अनूदित CHANGELOG के अनुभागों और आकार से जुड़ी अपरिवर्तनीय शर्तें, और नए दस्तावेज़ों द्वारा प्रतिस्थापित पुराने डुप्लिकेट दस्तावेज़ों की अनुपस्थिति                                                                                                                                                                                                                              | हाँ                                                                                                                                           |
| ↳ `check:docs-frontmatter`     | संकलित दस्तावेज़ीकरण पृष्ठों में मान्य फ्रंटमैटर शीर्षक होते हैं                                                                                                                                                                                                                                                                                                                                                                                             | हाँ                                                                                                                                           |
| ↳ `check:docs-counts`          | उच्च विश्वसनीयता वाली गणना की अपरिवर्तनीय शर्तें सख्ती से लागू होती हैं; फ़ाइलों की संख्या की अनुमान-आधारित जाँचें केवल चेतावनी देती हैं, जब तक कि स्क्रिप्ट को `--strict` न दिया जाए (CI का मेटा-गेट यह फ़्लैग नहीं देता)                                                                                                                                                                                                                                   | कठोर स्तर अवरोधक है; शिथिल स्तर परामर्शात्मक है                                                                                               |
| ↳ `check:env-doc-sync`         | स्पष्ट उपेक्षा-सूची, केवल दस्तावेज़ों में मौजूद और केवल परिवेश में मौजूद चरों की अनुमति-सूचियाँ लागू करने के बाद स्रोत कोड में पढ़े जाने वाले परिवेश चर, `.env.example` और `docs/reference/ENVIRONMENT.md` एक-दूसरे से मेल खाते हैं                                                                                                                                                                                                                          | हाँ, दस्तावेज़ित अनुमति-सूचियों के बाहर                                                                                                       |
| ↳ `check:deprecated-versions`  | उपेक्षित दस्तावेज़ों को छोड़कर, सुरक्षित ऐतिहासिक संदर्भों के बाहर संभावित पुराने संस्करणों और पुरानी अद्यतन तिथियों की सूचना देता है                                                                                                                                                                                                                                                                                                                        | वर्तमान CI विन्यास में परामर्शात्मक (`--strict` नहीं दिया जाता)                                                                               |
| ↳ `check:doc-links`            | दस्तावेज़ों में आंतरिक markdown लिंक वास्तविक फ़ाइलों पर समाधान करते हैं (`[text]`/`(path)` प्रारूप)                                                                                                                                                                                                                                                                                                                                                         | हाँ                                                                                                                                           |
| ↳ `check:fabricated-docs`      | दस्तावेज़ों में उल्लिखित रूट, env vars, CLI कमांड, हुक नाम और फ़ाइल पथ कोडबेस में मौजूद हैं। `--strict` के माध्यम से हार्ड गेट; फ़्लैग के बिना सॉफ्ट-फेल।                                                                                                                                                                                                                                                                                                    | हाँ (CI में `--strict` के माध्यम से)                                                                                                          |
| `check:cli-i18n`               | CLI में इस्तेमाल की गई `t()` कुंजियाँ `en` में मौजूद हैं; `pt-BR` हर शीर्ष-स्तरीय अनुभाग बनाए रखता है; `zh-CN` और `zh-TW` में `en` की हर कुंजी मौजूद है                                                                                                                                                                                                                                                                                                      | हाँ                                                                                                                                           |
| `check:openapi-coverage`       | OpenAPI विनिर्देश वास्तविक रूट के कम-से-कम रैचेट किए गए न्यूनतम स्तर को कवर करता है                                                                                                                                                                                                                                                                                                                                                                          | हाँ                                                                                                                                           |
| `check:openapi-security-tiers` | घोषित `x-loopback-only`/`x-always-protected` एनोटेशन का समर्थन `routeGuard.ts` में होना चाहिए; पार्सर की त्रुटियाँ और आगे की दिशा में जाँच की असंगतियाँ अवरुद्ध करती हैं। केवल स्थानीय पहुँच वाले उपसर्गों के अंतर्गत `x-loopback-only` की अनुपस्थिति की विपरीत जाँच चेतावनी देती है, और केवल पैटर्न से निर्धारित रूट उस विपरीत जाँच से बाहर रहते हैं।                                                                                                       | पार्सर और आगे की दिशा की जाँचें अवरोधक हैं; विपरीत जाँच परामर्शात्मक है                                                                       |
| `check:openapi-routes`         | औचित्य सहित दी गई `KNOWN_STALE_SPEC` अनुमति-सूची लागू करने के बाद, `openapi.yaml` का प्रत्येक `/api...` पथ पैरामीटर के अंतर की परवाह किए बिना किसी वास्तविक रूट से मेल खाता है; अनुमति-सूची की अप्रासंगिक हो चुकी प्रविष्टियाँ भी जाँच विफल करती हैं                                                                                                                                                                                                         | हाँ                                                                                                                                           |
| `check:docs-symbols`           | प्रतिलिपि न होने वाले प्रामाणिक दस्तावेज़ों के आंतरिक `/api/...` URL संदर्भ किसी वास्तविक रूट या रूट-समूह से मेल खाते हैं; प्रॉक्सी/अपस्ट्रीम/प्लेसहोल्डर/फ़ाइल संदर्भ और औचित्य सहित दी गई `KNOWN_STALE_DOC_REFS` प्रविष्टियाँ बाहर रखी जाती हैं, और अनुमति-सूची की अप्रासंगिक हो चुकी प्रविष्टियाँ जाँच विफल करती हैं                                                                                                                                      | हाँ                                                                                                                                           |
| `i18n translation drift`       | मुख्य दस्तावेज़ों के स्रोत/लक्ष्य हैश और अनुवाद की उत्पत्ति जाँचता है। PR तुलना केवल हूबहू समान विरासत में मिली विफलताओं की अनुमति देती है; स्रोत, अनुपस्थित लक्ष्य, लक्ष्य हैश, पुराने अनुवाद या अनुभाग कैश की नई या अप्रमाणित असंगतियाँ रोकती हैं। PR तुलना के बाहर स्रोत/अनुपस्थित लक्ष्य/लक्ष्य हैश की विफलताएँ रोकती हैं, जबकि पुराने अनुवाद और असंगत अनुभाग कैश केवल चेतावनी बने रहते हैं। पुराने प्रारूप का अनुभाग कैश अनुपस्थित होना विफलता नहीं है। | PR में नया/अप्रमाणित विचलन रोकता है; हूबहू समान विरासत में मिला विचलन केवल चेतावनी है; PR के बाहर के नियम विफलता के प्रकार पर निर्भर करते हैं |

### जॉब: `i18n-ui-coverage`

| स्क्रिप्ट                         | सत्यापित करता है                                                                                                                                                                              | अवरोधक     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुंजी कवरेज ≥ 65% है                                                                                                                                                                  | हाँ        |
| `check-ui-value-drift` (इनलाइन)   | दोबारा लिखा गया अंग्रेज़ी **मान** कोई पुराना अनुवाद पीछे नहीं छोड़ता                                                                                                                          | हाँ        |
| `check-new-key-coverage` (इनलाइन) | एक **नई** अंग्रेज़ी कुंजी का हर लोकेल में अनुवाद किया गया है — `__MISSING__:` मार्कर अस्वीकार कर दिया जाता है                                                                                 | हाँ        |
| `check-translation-ratio`         | प्रति लोकेल वास्तविक-अनुवाद अनुपात (अंग्रेज़ी के समान / प्लेसहोल्डर / अनुमत-सूची से बाहर अनुपलब्ध प्रविष्टियाँ) `config/quality/i18n-translation-baseline.json` + छूट से अधिक नहीं होना चाहिए | **अवरोधक** |

`fetch-depth: 0` आवश्यक है — मान-ड्रिफ्ट गेट मर्ज बेस के विरुद्ध `en.json` का अंतर देखता है।

#### `check-ui-value-drift` — पुराने अनुवाद का गेट

यह उस एक i18n रिग्रेशन को पकड़ता है जिसे अन्य गेट संरचनात्मक रूप से नहीं देख सकते: किसी अंग्रेज़ी मान
को दोबारा लिखा जाता है और _पिछले_ अंग्रेज़ी मान से बने अनुवाद पीछे छूट जाते हैं, इसलिए
गैर-अंग्रेज़ी उपयोगकर्ता आत्मविश्वास से लिखी गई, पर अब गलत सामग्री पढ़ते रहते हैं।

यह वास्तव में रिलीज़ में पहुँच गया था। Antigravity लॉगिन हेल्पर आने पर (#5203)
`oauthModal.googleOAuthWarning` को दोबारा लिखा गया था; **43 में से 39 लोकेल** में ऐसा टेक्स्ट बना रहा जो ऑपरेटरों से
"पूरा URL कॉपी करके नीचे पेस्ट करने" को कहता था — एक ऐसा प्रवाह जो उस प्रदाता के लिए पूरा नहीं हो सकता।
#8463 तक इस पर ध्यान नहीं गया, क्योंकि:

- `sync-ui-keys` केवल **अनुपस्थित** कुंजियों को बैकफ़िल करता है, **पुरानी** कुंजियों को कभी नहीं;
- `check-ui-keys-coverage` कुंजी की _उपस्थिति_ गिनता है, इसलिए पुराने अनुवाद को भी कवर्ड माना जाता है;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` दस्तावेज़ीकरण मिरर को ट्रैक करता है —
  यह कभी भी `src/i18n/messages/*.json` नहीं पढ़ता। 2026-09 के पुनः-सिंक के बाद से जॉब `docs-sync-strict` में अवरोधक:
  किसी मुख्य दस्तावेज़ को संपादित करें → `npm run i18n:run -- --files=<doc>` (सेक्शन-स्तरीय, कम खर्चीला)।

**अंतर-जागरूक, बेसलाइन-समर्थित नहीं।** यह मर्ज बेस पर मौजूद `en.json` की तुलना
वर्किंग ट्री से करता है; जिन कुंजियों का अंग्रेज़ी मान बदला है, उनके लिए कोई भी ऐसा लोकेल पुराना माना जाता है जिसमें
अनछुआ अनुवाद अभी भी मौजूद हो। यह जानबूझकर **पहले से मौजूद ऋण को स्थिर रखता है** — अंतर
यह नहीं बता सकता कि कोई लंबे समय से मौजूद अनुवाद किस पुराने अंग्रेज़ी टेक्स्ट से आया था, इसलिए गेट केवल
वर्तमान परिवर्तन द्वारा छुई गई सामग्री का आकलन करता है। विकल्प (प्रति-कुंजी हैश बेसलाइन) के लिए
लगभग 600 KB की जनरेट की गई फ़ाइल चाहिए होगी, जो सबसे बड़ी मौजूदा बेसलाइन से 3× बड़ी है और हर i18n PR पर बदलती रहेगी।

इसे संतुष्ट करने के दो तरीके हैं:

1. प्रभावित अनुवादों को अपडेट करें, या
2. उन्हें `__MISSING__:<new english>` पर सेट करें — इसके बाद रनटाइम सही किया गया अंग्रेज़ी टेक्स्ट दिखाता है
   (`src/i18n/request.ts::deepMergeFallback`, #7258) और कुंजी अनुवाद के लिए कतारबद्ध हो जाती है।

यदि स्ट्रिंग का **अर्थ** बदल गया है, तो **कुंजी का नाम बदलना** बेहतर है: नई कुंजी
पुराना अनुवाद इनहेरिट नहीं कर सकती। #8463 में इसी पैटर्न का उपयोग किया गया था।

```bash
npm run i18n:check-value-drift          # सख्त (CI यही चलाता है)
npm run i18n:check-value-drift:warn     # केवल रिपोर्ट
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

वैल्यू-ड्रिफ्ट और नई-कुंजी गेट
`scripts/i18n/resolve-ui-diff-base.mjs` से प्राप्त एक ही अपरिवर्तनीय तुलना साझा करते हैं। वर्कफ़्लो दोनों जाँचों को समान बेस, बेस-टिप और
कैंडिडेट SHA प्रदान करता है। PR/बेस-रीटार्गेट, पुश और मर्ज-ग्रुप रन अपने इवेंट
कॉन्टेक्स्ट का उपयोग करते हैं। किसी कैंडिडेट ब्रांच को डिस्पैच करने के लिए उसका सटीक खुला PR या स्पष्ट
`i18n_base_sha` इनपुट आवश्यक है। उस इनपुट के बिना `main` या `release/vX.Y.Z` का
डिस्पैच या शेड्यूल किया गया अवलोकन अंतिम कमिट की तुलना उसके पहले पैरेंट से करता है; यह
सभी विरासत में मिले अनुवाद ऋण का ऑडिट नहीं है। स्थानीय इनवोकेशन के लिए एक स्पष्ट तुलना बेस आवश्यक है,
उदाहरण के लिए ऊपर दिया गया `BASE_REF` कमांड।

अनुपलब्ध या अस्पष्ट तुलना कॉन्टेक्स्ट, अपठनीय या अमान्य आवश्यक कैटलॉग, और
बदला हुआ कैंडिडेट, वॉर्न मोड सहित, एग्ज़िट कोड **2** के साथ `INCOMPLETE` उत्पन्न करते हैं।
कैटलॉग को पढ़ने के लिए `scripts/i18n/read-ui-catalog.mjs` का उपयोग किया जाता है; पढ़ने में विफलताओं को
खाली ऑब्जेक्ट से प्रतिस्थापित नहीं किया जाता। न तो अनुपलब्ध बेस और न ही अधूरा इनपुट PASS स्थापित करता है।

### जॉब: `i18n`

पूर्ण i18n सत्यापन मैट्रिक्स (प्रति लोकेल एक जॉब)। पूरा जॉब परामर्शात्मक है।

| स्क्रिप्ट                       | सत्यापित करता है              | अवरोधक                                                   |
| ------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | प्रति लोकेल अनुवाद की पूर्णता | **परामर्शात्मक** (पूरे जॉब पर `continue-on-error: true`) |

### जॉब: `pr-test-policy`

केवल पुल अनुरोधों पर चलता है।

| स्क्रिप्ट              | सत्यापित करता है                                                                                                                            | अवरोधक |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, या `bin/` में प्रोडक्शन कोड बदलने वाले PR में परीक्षण शामिल या अपडेट होने चाहिए (कठोर नियम #8)            | हाँ    |
| `check:test-masking`   | बदली गई परीक्षण फ़ाइलें शुद्ध अभिकथन संख्या कम नहीं करतीं या `assert.ok(true)` जैसी पुनरुक्तियाँ नहीं जोड़तीं                               | हाँ    |
| `check:pr-evidence`    | PR बॉडी परिवर्तन के लिए परीक्षण/VPS साक्ष्य उद्धृत करती है (PR गद्य को grep करके कठोर नियम #18 को स्वचालित बनाता है — नाज़ुक, बैकलॉग देखें) | हाँ    |

### जॉब: `test-vitest`

`changes` वर्गीकरण जॉब आवश्यक है। लागू मैट्रिक्स शार्ड विफल होने पर मर्ज को रोकते हैं।

| सूट              | सत्यापित करता है                                 | अवरोधक                                                                                                                           |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्वर (110 टूल), autoCombo, कैश — vitest रनर | हाँ                                                                                                                              |
| `test:vitest:ui` | UI कंपोनेंट परीक्षण — vitest रनर                 | **अवरोधक** — पहले से मौजूद विफलताओं को `vitest.config.ts` में स्पष्ट रूप से बाहर रखा गया है; नई विफलताएँ जॉब को विफल कर देती हैं |

### रात्रिकालीन वर्कफ़्लो (शेड्यूल किए गए, परामर्शात्मक)

ये cron शेड्यूल (और `workflow_dispatch`) पर चलते हैं, PR पर कभी नहीं। ये सभी परामर्शात्मक हैं।

| वर्कफ़्लो              | सत्यापित करता है                                                                                                                                                                        | अवरोधक           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | रैंडम सीड और उच्च रन संख्या के साथ fast-check प्रॉपर्टी परीक्षण                                                                                                                         | **परामर्शात्मक** |
| `nightly-resilience`   | हीप-वृद्धि गेट, कैओस फ़ॉल्ट-इंजेक्शन, k6 लोड/सोक                                                                                                                                        | **परामर्शात्मक** |
| `nightly-llm-security` | promptfoo इंजेक्शन गार्ड (ब्लॉक मोड) + garak प्रोब (प्रोवाइडर सीक्रेट के बिना छोड़े जाते हैं)                                                                                           | **परामर्शात्मक** |
| `nightly-schemathesis` | `docs/openapi.yaml` का उपयोग करके लाइव OmniRoute के विरुद्ध OpenAPI कॉन्ट्रैक्ट फ़ज़िंग (schemathesis) — स्पेसिफ़िकेशन उल्लंघनों / अनहैंडल्ड 500 त्रुटियों को उजागर करता है (चरण 8 B.4) | **परामर्शात्मक** |
| `nightly-mutation`     | तेज़ यूनिट लेन पर Stryker म्यूटेशन-परीक्षण स्कोर — जीवित बचे म्यूटेंट कमज़ोर असर्शन को उजागर करते हैं                                                                                   | **परामर्शात्मक** |
| `nightly-compat`       | समर्थित `engines.node` रेंज में Node इंजन संगतता मैट्रिक्स                                                                                                                              | **परामर्शात्मक** |

प्रदर्शन बेसलाइन (हीप, TTFB, बिल्ड समय) रिकॉर्ड किए जाते हैं, गेट नहीं किए जाते: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) देखें।

---

## वेलोसिटी चरण (2026-08-30 → v4.0 LTS): प्रत्येक बेसलाइन में 20% की ढील

स्वामी का निर्णय (2026-08-30): v4.0 मॉड्यूलराइज़ेशन तक, तकनीकी ऋण की सीमा बनाए रखने की तुलना में
रिलीज़ की गति अधिक महत्वपूर्ण है। प्रत्येक **संख्यात्मक** रैचेट बेसलाइन को एक ही
ऑडिट-योग्य प्रक्रिया में 20% ढील दी गई, और चरण को `config/quality/quality-baseline.json` में घोषित किया गया है:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| क्या बदला                                                                                                                                                                                            | कहाँ                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — कम होना बेहतर वाले काउंट ×1.2, अधिक होना बेहतर वाले प्रतिशत ÷1.2 (कवरेज न्यूनतम सीमा 60 रखी गई, `eslintErrors` 0 ही रहा, `eslintWarnings` 0 → स्थिर किए गए सप्रेशन काउंट का 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` नोट प्रत्येक पहले → बाद का मान सूचीबद्ध करता है) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                     | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, प्रत्येक `frozen[*]` / `testFrozen[*]` लाइन सीमा ×1.2                                                                                                                              | `file-size-baseline.json`                                                                              |
| प्रति-फ़ाइल / प्रति-TS-कोड काउंट ×1.2                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                  | `scripts/check/check-openapi-coverage.mjs`                                                             |
| जब `_policy.requireTighten === false` हो, तब `--require-tighten` केवल परामर्शात्मक हो जाता है                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| रात्रिकालीन `bank-ratchet-shrinks` रोक दिया जाता है (यह मापी गई कमी को जमा करके अतिरिक्त गुंजाइश समाप्त कर देता)                                                                                     | `.github/workflows/nightly-release-green.yml`                                                          |

अनुमति-सूचियाँ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) बजट **नहीं** हैं और उन्हें बदला नहीं गया। पास/फ़ेल नीति गेट (सीक्रेट, SQL नियम,
दस्तावेज़/एनवायरनमेंट अनुबंध, i18n समानता, यूनिट टेस्ट) अपरिवर्तित हैं — लाल टेस्ट अब भी लाल टेस्ट ही है।

**टूलिंग**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — एकबारगी
  ढील (`scripts/quality/relax-baselines.mjs`); समान नोट के साथ दूसरी बार चलने से इनकार करता है।
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  प्रत्येक संख्यात्मक गेट को उसी प्रकार मापता है जैसे CI मापता है और प्रति गेट बची हुई गुंजाइश प्रिंट करता है
  (`scripts/quality/baseline-headroom.mjs`)। रात्रिकालीन `baseline-headroom` जॉब
  वर्कफ़्लो रन सारांश में तालिका प्रकाशित करता है और अपनी JSON/Markdown रिपोर्ट को
  `baseline-headroom-<run_id>` के रूप में अपलोड करता है, जिसे 90 दिनों तक रखा जाता है। चेतावनी और गंभीर पंक्तियाँ उन गेटों की पहचान करती हैं
  जो अपनी सीमा के 10% के भीतर हैं या पहले ही उसे पार कर चुके हैं। बजट के इस्तेमाल की शुरुआती चेतावनी के रूप में
  इन रिपोर्टों की समीक्षा करें; संबंधित गेट के `_rebaseline_*` नोट देखें। यह जॉब अब
  कोई स्थायी इश्यू बनाता या अपडेट नहीं करता; #12149 पुराने रिपोर्ट इतिहास को सुरक्षित रखता है।

**नए-कोड का मोड (Clean-as-You-Code) — 2026-08-30 से, केवल PR फ़ास्ट-पाथ**

`pull_request` इवेंट पर `quality.yml`, `check:file-size`,
`check:complexity-ratchets` और `check:dead-code` को `--base-ref <PR base SHA>` पास करता है। `check:complexity-ratchets` और
`check:dead-code` के लिए गेट, HEAD की तुलना मर्ज-बेस से **केवल PR द्वारा बदली गई फ़ाइलों तक सीमित रहते हुए**
करता है (`scripts/check/newCodeMode.mjs`: मर्ज-बेस को अस्थायी
`git worktree` में साकार किया जाता है, ESLint/knip को वहाँ और HEAD पर चलाया जाता है, और प्रति-फ़ाइल काउंट का अंतर निकाला जाता है):

- **अवरोधक** — PR ने अपनी बदली हुई फ़ाइलों में साइक्लोमैटिक/कॉग्निटिव उल्लंघन या मृत एक्सपोर्ट जोड़े
  (लॉग में `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **परामर्शात्मक** — वैश्विक कुल बनाम स्थिर की गई आधार-रेखा। विरासत में मिला विचलन किसी
  निर्दोष PR को कभी विफल नहीं करता; विचलन को रिलीज़ सामंजस्य के समय सुधारने के लिए ट्रैक किया जाता है और
  हेडरूम जॉब द्वारा इसकी निगरानी की जाती है।

`check:file-size` बेस रेफ़रेंस का उपयोग अपनी शर्तों पर करता है (`scripts/check/check-file-size.mjs`, #8522):
यह ट्री की प्रत्येक सोर्स और टेस्ट फ़ाइल की जाँच करता है, `git show` से PR बेस पर प्रत्येक फ़ाइल की लाइन संख्या
पढ़ता है, और किसी फ़ाइल को केवल तभी विफल करता है जब वह अपनी बेसलाइन अधिकतम सीमा
(`frozen` / `testFrozen`, या बेसलाइन से बाहर की फ़ाइल के लिए `cap` / `testCap`) और अपने बेस
आकार में से बड़े मान को पार कर जाती है। इसलिए बेस पर पहले ही विचलित हो चुकी फ़ाइल किसी निर्दोष PR को कभी लाल नहीं करती।

`check:boundary:ratchet` अपने एकल संख्या पर भी यही नियम लागू करता है
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR इवेंट पर
`quality.yml` के फ़ास्ट-गेट और `ci.yml` की lint जॉब, दोनों PR का बेस SHA पास करते हैं, बेस कमिट
को `git archive` एक्सपोर्ट से मापा जाता है, और PR केवल तभी विफल होता है जब उसकी `open-sse → src`
एज संख्या `metrics.boundaryOpenSseToSrc` और बेस की संख्या में से बड़ी संख्या से अधिक हो जाती है। सीलिंग
से अधिक बेस ड्रिफ़्ट की रिपोर्ट की जाती है (`base drift herdado`), लेकिन इससे कोई निर्दोष PR कभी विफल
नहीं होता; push → main निरपेक्ष सीलिंग बनाए रखता है, और ऐसा बेस SHA जिसे रिज़ॉल्व नहीं किया जा सकता,
चेतावनी के साथ उसी सीलिंग पर फ़ॉलबैक करता है।

`workflow_dispatch` रन, release-green स्वीप और nightly headroom जॉब में कोई PR बेस नहीं होता
और वे निरपेक्ष (ग्लोबल) तुलना बनाए रखते हैं। फ़िलहाल कवरेज, डुप्लिकेशन और type-coverage भी ग्लोबल
बने रहते हैं (उनके टूल कम लागत में प्रति-फ़ाइल diff उत्पन्न नहीं करते) — इन्हें भी यही ट्रीटमेंट देने
पर विचार किया जा सकता है।

**v4.0 पर चरण को समाप्त करना (LTS = पहले से अधिक सख़्त, न कि "फिर से सामान्य")**

1. शुद्ध `release/v4.0.0` टिप पर: रिकॉर्ड के लिए `npm run quality:headroom --json`, फिर
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, और प्रत्येक typecheck गेट का
   `--update` चलाएँ — हर बेसलाइन मापे गए मान तक गिर जाती है।
2. `quality-baseline.json` से `_policy` हटाएँ (`--require-tighten` और nightly
   बैंकिंग को फिर से सक्रिय करता है), और `check-openapi-coverage.mjs` में `THRESHOLD = 36`
   (या अधिक) पुनर्स्थापित करें।
3. जहाँ मॉड्यूलराइज़ेशन लाभदायक रहा, वहाँ मापे गए मान से भी अधिक सख़्ती करें: file-size `cap` को
   वापस 1000 (या 800) पर लाएँ, coverage floors में +5 करें, और मॉड्यूलराइज़ किए गए पैकेजों के लिए
   dead exports को 0 करें।

## रैचेट बेसलाइन (`quality-baseline.json`)

रैचेट इंजन (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` को पढ़ता है
और उसकी तुलना नए एकत्र किए गए `quality-metrics.json` से करता है। कोई भी मेट्रिक जो अपने एप्सिलॉन
से अधिक खराब होता है, बिल्ड को विफल कर देता है।

वर्तमान में ट्रैक किए जा रहे मेट्रिक्स:

| मेट्रिक               | दिशा   | अर्थ                                         |
| --------------------- | ------ | -------------------------------------------- |
| `eslintWarnings`      | `down` | ESLint चेतावनियों की संख्या बढ़नी नहीं चाहिए |
| `coverage.statements` | `up`   | स्टेटमेंट कवरेज कम नहीं होना चाहिए           |
| `coverage.lines`      | `up`   | लाइन कवरेज कम नहीं होना चाहिए                |
| `coverage.functions`  | `up`   | फ़ंक्शन कवरेज कम नहीं होना चाहिए             |
| `coverage.branches`   | `up`   | ब्रांच कवरेज कम नहीं होना चाहिए              |

वास्तविक सुधार के बाद बेसलाइन अपडेट करने के लिए:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` फ़्लैग वर्तमान मापे गए मानों को `quality-baseline.json` में लिखता है।
इस फ़ाइल को उस परिवर्तन के साथ कमिट करें जिसने मेट्रिक में सुधार किया है। ऐसा PR जो बेसलाइन
अपडेट किए बिना किसी मेट्रिक में सुधार करता है, उसे `--require-tighten` द्वारा पकड़ा जाएगा (चरण 6A.5,
कार्यान्वयन लंबित है)।

### CodeQL रैचेट: रीफ़्रेश आवृत्ति और मैन्युअल ट्रिगर

`check:codeql-ratchet` **रेपो की स्थिति पढ़ता है, जिसे निर्धारित समय-सारणी पर रीफ़्रेश किया जाता है — प्रत्येक PR पर नहीं।**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` से
`state: configured`, `schedule: weekly` रिपोर्ट होता है: यह GitHub का डिफ़ॉल्ट-सेटअप स्कैन है, प्रत्येक पुश पर होने वाला
विश्लेषण नहीं। परिणाम: अलर्ट ठीक करने वाला कोई PR मर्ज होने के बाद भी रैचेट पुराने, अधिक काउंट को
तब तक पढ़ता रहता है जब तक अगला निर्धारित स्कैन नहीं चलता — इसलिए स्कैन के अद्यतित होने तक यह
हर खुले PR पर, यहाँ तक कि सुधार करने वाले PR के अपने फ़ॉलो-अप पर भी, रिग्रेशन रिपोर्ट करता है।

**मैन्युअल रीफ़्रेश**: `gh workflow run codeql.yml --ref release/vX.Y.Z` विश्लेषण को फिर से चलाता है
और कुछ ही मिनटों में अलर्ट दोबारा प्रकाशित करता है। पहले `.github/workflows/codeql.yml` पढ़ें
— इसका हेडर बताता है कि यह केवल `workflow_dispatch` है, **क्योंकि यह GitHub के "default setup" से
टकराता है** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)। `push`/`pull_request`/
`schedule` ट्रिगर बहाल करने के लिए पहले **स्वामी द्वारा कार्रवाई** आवश्यक है: Settings → Code security →
CodeQL: Default → Advanced। वह बदलाव किए बिना `schedule:` ट्रिगर न जोड़ें — इससे केवल
विफल रन उत्पन्न होंगे।

**काउंट घटने के बाद बेसलाइन को कसें** — `node scripts/check/check-codeql-ratchet.mjs
--update` नए मापे गए काउंट को `quality-baseline.json` →
`metrics.codeqlAlerts.value` में लिखता है, ताकि रैचेट चुपचाप पुराने अधिकतम स्तर तक वापस होने वाले
रिग्रेशन की अनुमति न दे। व्यावहारिक उदाहरण (2026-09-02/03): PR #12502 ने 7 वास्तविक अलर्ट ठीक किए
(13 → 6 मापे गए खुले अलर्ट); PR #12530 ने मिलान के लिए स्थिर बेसलाइन को 11 → 6 तक कसा; इसके बाद
शेष 6 को प्रत्येक अलर्ट के लिए औचित्य देकर खारिज किया गया, जिससे खुले अलर्ट की संख्या 0 हो गई।

**अलर्ट खारिज करना ऑपरेटर का निर्णय है (कठोर नियम #14)** — खारिज करने वाली टिप्पणी में
तकनीकी औचित्य दर्ज किए बिना कभी भी CodeQL अलर्ट खारिज न करें: अपस्ट्रीम-प्रोटोकॉल आवश्यकता के लिए
`won't fix`, टेस्ट फ़िक्स्चर के लिए `used in tests`, और ऐसे सैनिटाइज़र के लिए जिसे CodeQL नहीं देख सकता
`false positive` (पूर्व उदाहरण: `docs/security/ERROR_SANITIZATION.md`)।

---

## टेस्ट रीट्राई नीति (WS5.4, v3.8.49)

रीट्राई प्रत्येक रनर के लिए अलग है, कभी भी वैश्विक रूप से लागू नहीं होता — सभी पर लागू रीट्राई वास्तविक रिग्रेशन को
अदृश्य फ्लेक्स में बदल देता है:

| रनर              | नीति                                                                                                                                              | कारण                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | केवल CI में `retries: 1`, साथ में `trace: on-first-retry`                                                                                         | ब्राउज़र/नेटवर्क टाइमिंग वास्तव में अनिर्धारित होती है; ट्रेस के साथ एक रीट्राई फ्लेक को निदान-योग्य आर्टिफ़ैक्ट में बदल देता है |
| Vitest           | कोई वैश्विक रीट्राई नहीं। प्रमाणित रूप से फ्लेकी टेस्ट को स्पष्ट प्रति-टेस्ट रीट्राई मिलता है (diff में दिखाई देता है, PR में समीक्षा की जाती है) | क्वारंटीन सूची को repo में रखता है, कभी भी अपारदर्शी नहीं होने देता                                                              |
| node:test (unit) | कभी भी कोई रीट्राई नहीं                                                                                                                           | फ्लेकी यूनिट टेस्ट, टेस्ट में मौजूद बग है — उसे ठीक करें, दोबारा चलाकर किस्मत न आज़माएँ                                          |

फ्लेक टेलीमेट्री उपलब्ध होने के बाद लक्षित SLOs (WS5.2/5.3): प्रति टेस्ट <1% फ्लेक दर
("अभी ठीक करें" सीमा), प्रति पाइपलाइन ≥95% पास दर। उद्योग के संदर्भ मान —
हमारे अपने मापों के आधार पर पुनः कैलिब्रेट करें।

## रिलीज़-स्तरीय रैचेट ड्रिफ्ट (WS5.5, v3.8.49)

जब कोई रैचेट (फ़ाइल आकार, जटिलता, eslint चेतावनियाँ) शुद्ध रिलीज़
टिप पर रिग्रेस करता है — अर्थात, मर्जों के संयोजन ने उसे रिग्रेस किया हो और कोई भी अकेला PR अपनी
शाखा पर उस रिग्रेशन को पुनरुत्पादित न करता हो — तो उसे ठीक करने की ज़िम्मेदारी **रिलीज़ कैप्टन की है, एक बार,
रिलीज़ शाखा पर**: निष्कर्षण/रिफ़ैक्टर को प्राथमिकता दें; केवल दस्तावेज़ीकृत
औचित्य प्रविष्टि के साथ ही रीबेसलाइन करें। संयोजन से आए ड्रिफ्ट को कभी भी किसी योगदानकर्ता के PR पर न डालें, और कभी भी
प्रति-PR रीबेसलाइन न करें (यह वास्तविक रिग्रेशन को छिपाता है)। पहले अंतर स्पष्ट करें: यह मानने से पहले कि आपके PR ने इसे उत्पन्न किया है,
किसी प्रोब worktree में शुद्ध टिप के विरुद्ध विफलता को पुनरुत्पादित करें।

## रैचेट संकुचन को संचित करना — नीचे की दिशा (#8584)

रैचेट केवल आधा स्वचालित है, और वह भी गलत आधा। किसी सीमा को **बढ़ाना** एक
मैन्युअल JSON संपादन है जिसमें दस सेकंड लगते हैं और जो विफल PR को अनब्लॉक करने का सबसे तेज़ तरीका है।
किसी सीमा को **घटाने** के लिए किसी व्यक्ति को `--update` चलाकर परिणाम कमिट करना पड़ता है — और
`bank-ratchet-shrinks` जॉब आने तक किसी भी वर्कफ़्लो ने इसे नहीं चलाया। मापा गया परिणाम
(2026-07-25): 18 फ़्रीज़ की गई फ़ाइलें पहले से ही नई फ़ाइलों के लिए निर्धारित 800-पंक्ति सीमा पर या उससे नीचे थीं, जिनमें सबसे खराब
132× पर थी (`src/shared/validation/schemas.ts`, 19 पंक्तियों के लिए 2,523 की सीमा);
जटिलता की अधिकतम सीमा लगभग 37 रीबेसलाइन नोट्स के दौरान `1794 → 2169` तक बढ़ी, जिसमें ठीक एक
कमी (−1) हुई; और "अगले चक्र में `--update` के माध्यम से कसें" 31 बार लिखा गया और
एक बार पालन किया गया। जिस कोड के कारण कोई सीमा निर्धारित हुई थी, उसके समाप्त होने के बाद भी यदि वह सीमा बनी रहती है, तो वह चुपचाप
हर पूर्ण हो चुके विघटन को उस व्यक्ति के लिए वृद्धि की छूट में बदल देती है जो अगली बार फ़ाइल संपादित करता है।

`nightly-release-green.yml` → जॉब **`bank-ratchet-shrinks`** उस चक्र को पूरा करता है:

|                  |                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| चलता है          | `schedule` (3×/दिन) + `workflow_dispatch` — जानबूझकर **`push` पर नहीं**                                          |
| मापता है         | उच्चतम `release/vX.Y.Z`, `release-green` के समान रिज़ॉल्यूशन + इंजेक्शन गार्ड                                    |
| लिखता है         | `check:file-size --update` और `check:complexity-ratchets --update` (दोनों संरचना के अनुसार केवल संकुचन करते हैं) |
| सत्यापित करता है | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| भेजता है         | रिलीज़ शाखा के विरुद्ध एक हमेशा अद्यतित PR — बलपूर्वक अपडेट किया जाता है, कभी स्पैम नहीं किया जाता               |

संचयन प्रति-पुश के बजाय बैच में किया जाता है क्योंकि इसकी कोई विलंबता आवश्यकता नहीं है (8 घंटे के भीतर संचित
संकुचन पर्याप्त है), जबकि प्रति-मर्ज रन, मर्ज अभियानों के दौरान PR शाखा को बार-बार
पुनर्निर्मित करेगा और हर बार पूर्ण ESLint स्कैन की लागत उठाएगा। पहचान `push` (`release-green`) पर ही रहती है;
केवल संचयन बैच में किया जाता है।

### सुरक्षा सत्यापक

जॉब बिना निगरानी के बेसलाइन में लिखता है, इसलिए `verify-ratchet-bank.mjs` ही इसे
स्वीकार्य बनाता है। यह `--update` के बाद वाले ट्री की तुलना `HEAD` से करता है और **कोई भी कमिट बनने से
पहले जॉब को निरस्त कर देता है** — कोई PR नहीं खोलता — जब तक कि प्रत्येक बदलाव निम्न में से कोई एक न हो:

- किसी `frozen` / `testFrozen` संख्यात्मक प्रविष्टि को **घटाया** या **हटाया** गया हो
- `complexity-baseline.json` → `count` को **घटाया** गया हो
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` को **घटाया** गया हो

बाकी हर चीज़ विफल होती है: किसी संख्या को बढ़ाना, प्रविष्टि जोड़ना, `cap`/`testCap` बदलना, या
किसी `_rebaseline_*` नोट को हटाना/दोबारा लिखना (ये नोट इस बात का ऑडिट ट्रेल हैं कि प्रत्येक
अधिकतम सीमा क्यों मौजूद है और इन्हें फ़ाइल प्रविष्टियों वाले उसी `frozen` ऑब्जेक्ट में संग्रहीत किया जाता है)।
सीमा बढ़ा सकने वाला बॉट मौजूदा स्थिति से भी स्पष्ट रूप से बदतर होगा। रिग्रेशन
गार्ड: `tests/unit/verify-ratchet-bank.test.ts`।

जॉब कभी भी `release/*` पर पुश नहीं करता — कोई मानव PR को मर्ज करता है, इसलिए कोई गलत माप
बिना समीक्षा के शामिल नहीं हो सकता।

## अनुमति-सूची नीति

पहले से मौजूद उल्लंघनों पर विफल न हो सकने वाला प्रत्येक गेट एक स्थिर अनुमति-सूची
(जैसे, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) का उपयोग करता है। नीति यह है:

**मूल कारण ठीक करें; अनुमति-सूची का उपयोग केवल तभी करें, जब उल्लंघन पहले से मौजूद हो और
उसे उसी PR में ठीक न किया जा सके।**

अनुमति-सूची में कोई प्रविष्टि जोड़ते समय:

1. औचित्य सहित एक टिप्पणी शामिल करें।
2. ट्रैकिंग इश्यू का संदर्भ दें (जैसे, `// #3498 — Phase 2 feature, not yet implemented`)।
3. उल्लंघन ठीक करने वाले उसी PR में प्रविष्टि हटा दें — कोई पुरानी प्रविष्टि, जो अब
   किसी सक्रिय उल्लंघन को दबाती नहीं है, स्वयं एक दोष है (लागू हो जाने के बाद 6A.3 का पुराना-प्रवर्तन
   किसी अनाथ अनुमति-सूची प्रविष्टि पर गेट को विफल कर देगा)।

परीक्षणों को जल्दी पास कराने के लिए अनुमति-सूची में प्रविष्टियाँ **न जोड़ें**। बढ़ती हुई
अनुमति-सूची के साथ हरा गेट गुणवत्ता का झूठा आभास देता है।

### जब आपके PR पर कोई गेट विफल हो

1. **गेट आउटपुट ध्यान से पढ़ें** — यह आपको ठीक-ठीक बताता है कि किस फ़ाइल या प्रतीक ने
   नियम का उल्लंघन किया है।
2. **उल्लंघन ठीक करें** — अधिकांश गेट नियतात्मक फ़ाइल-सिस्टम जाँच हैं, जो कोड सही होते ही
   पास हो जाती हैं।
3. **यदि उल्लंघन पहले से मौजूद है** (अर्थात, आपने इसे उत्पन्न नहीं किया, लेकिन अब गेट
   इसे कवर करता है): औचित्य वाली टिप्पणी और ट्रैकिंग इश्यू के साथ अनुमति-सूची में एक प्रविष्टि जोड़ें।
4. **यदि गेट एक रैचेट है** (कवरेज, ESLint चेतावनियाँ, दोहराव, जटिलता):
   आपके बदलाव ने मेट्रिक को खराब किया है। अंतर्निहित समस्या ठीक करें, या (बहुत कम मामलों में)
   यदि बदलाव जानबूझकर किया गया है और मेट्रिक में गिरावट स्वीकार्य है, तो
   `npm run quality:ratchet -- --update` चलाएँ — लेकिन PR विवरण में इसका कारण दर्ज करें।
5. **परामर्शात्मक गेट** (`continue-on-error: true`) केवल जानकारी के लिए हैं — वे मर्ज को
   अवरुद्ध नहीं करते, लेकिन CI सारांश में दिखाई देते हैं। फिर भी उन्हें ठीक करें।

---

## नया गेट जोड़ना

1. `scripts/check/check-<name>.mjs` (या `.ts`) बनाएँ। नीति गेट 0/1 के साथ समाप्त होते हैं।
   रैचेट-शैली के गेट `collect-metrics.mjs` के माध्यम से `quality-metrics.json` में एक मेट्रिक उत्सर्जित करते हैं।
2. `package.json` में `"check:<name>": "node scripts/check/check-<name>.mjs"` जोड़ें, और
   `config/quality/gate-manifest.json` में उपनाम तथा उसके सटीक कमांड को सिंक्रोनाइज़ करें।
   किसी मौजूदा सत्यापन उपनाम को बदलते या हटाते समय भी यही सिंक्रोनाइज़ेशन लागू करें।
   `npm run check:gate-manifest` चलाएँ; प्री-कमिट हुक और CI परिवर्तन वर्गीकरण
   इस अनुबंध को लागू करते हैं।
3. इसे `.github/workflows/ci.yml` में उपयुक्त जॉब के अंतर्गत जोड़ें
   (नीति → `lint` या `docs-sync-strict`; रैचेट → `quality-gate`)।
4. यदि इसमें अनुमतिसूची है, तो `scripts/check/lib/allowlist.mjs` से
   `reportStaleEntries()` लागू करें, ताकि अप्रचलित प्रविष्टियों का स्वतः पता लगाया जा सके।
5. गेट के पहचान तर्क को कवर करने वाला परीक्षण `tests/unit/build/` में लिखें।
6. इस दस्तावेज़ को अपडेट करें (संबंधित जॉब तालिका में एक पंक्ति जोड़ें)।

---

## एजेंट टूलिंग: LSP-इन-द-लूप (ऑप्ट-इन)

CI गेट से आगे, OmniRoute एक **ऑप्ट-इन** `agent-lsp` स्कैफ़ोल्ड प्रदान करता है
(प्रोजेक्ट-स्तरीय `.mcp.json`, Fase 7 Task 15)। कोडिंग एजेंटों के लिए TypeScript भाषा सर्वर
उपलब्ध कराने हेतु `.mcp.json` बनाएँ, ताकि वे कोड लिखने से **पहले** प्रतीकों /
डायग्नोस्टिक्स का समाधान करें — यह `typecheck:core` का कंपाइल-बिफोर-क्लेम सहयोगी है,
जो "गढ़े गए प्रतीक" संबंधी त्रुटियों को उनके स्रोत पर ही कम करता है। इसे जानबूझकर
स्वतः लोड नहीं किया जाता (आप MCP↔LSP ब्रिज चुनते और सत्यापित करते हैं); कोई खराब प्रविष्टि केवल
कनेक्शन त्रुटि लॉग करती है और कभी भी सत्रों को बाधित नहीं करती।

---

## युक्तिसंगतीकरण बैकलॉग (ROI समीक्षा — चरण 9 तरंग 3)

इस इन्वेंटरी का 2026-06-17 को `ci.yml` के साथ मिलान किया गया था (पिछले संस्करण में
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` छूट गए थे)। मिलान किए गए सेट की ROI समीक्षा
ने निम्नलिखित युक्तिसंगतीकरण उम्मीदवारों की पहचान की। **मर्ज यांत्रिक CI
बदलाव हैं; फ्लिप/ड्रॉप नीतिगत निर्णय हैं जो ऑपरेटर के लिए आरक्षित हैं।** नीचे दिया गया
कुछ भी अभी लागू नहीं किया गया है।

**ऊपर इसका भी दस्तावेज़ीकरण नहीं किया गया है** (परामर्शात्मक, कम संकेत): `docs-lint` जॉब
(markdownlint + Vale, पूरा जॉब `continue-on-error`) और स्वतंत्र स्कैनर वर्कफ़्लो
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0`,
`quality-baseline.json` में है, लेकिन `ci.yml` में किसी अवरोधक रैचेट से जुड़ा नहीं है — यह मेट्रिक
फिलहाल अनाथ है।

### मर्ज / डीडुप्लिकेशन (यांत्रिक, कम जोखिम)

प्रत्येक उम्मीदवार को 2026-06-17 को सक्रिय गेट स्थिति के विरुद्ध सत्यापित किया गया था (भरोसा करें, लेकिन सत्यापित भी करें);
कई "स्पष्ट" मर्ज वास्तव में छिपे हुए ऋण वाले निकले और वे **स्वच्छ ड्रॉप-इन नहीं** हैं।

- **`check:docs-sync` दो बार चलता है** — `lint` जॉब में स्वतंत्र रूप से और फिर `check:docs-all` (`docs-sync-strict`) तथा husky pre-commit हुक के भीतर। ✅ **पूर्ण** — स्वतंत्र `lint` इनवोकेशन हटा दिया गया।
- **CVE स्कैनिंग** — ❌ **स्वच्छ मर्ज नहीं है।** `audit:deps` सभी पाँच lockfiles में गंभीर एडवाइज़री और अधूरे ऑडिट को अवरुद्ध करता है, जबकि मौजूदा नीति के अंतर्गत उच्च-स्तरीय एडवाइज़री को चेतावनियों के रूप में रिपोर्ट करता है; `check:vuln-ratchet` (osv) केवल तभी विफल होता है, जब चेक-इन किए गए बेसलाइन की तुलना में कोई _प्रतिगमन_ हो, और आवश्यक होने पर अनुपलब्ध मापों को अस्वीकार करता है। अर्थविज्ञान अलग हैं — `audit:deps` को हटाने से निरपेक्ष गंभीरता गेट और स्वतंत्र पैकेज ऑडिट रसीदें खो जाएँगी। दोनों को बनाए रखें।
- **चक्र पहचान** — ✅ **पूर्ण** (#15159 G-01/G-02)। यहाँ पुराने पाठ में `check:cycles` को "हरित, क्यूरेटेड" गेट कहा गया था और इसे अवरोधक बनाए रखने का औचित्य यह बताया गया था कि `check:circular-deps` (dpdm) ने 91 चक्र रिपोर्ट किए थे। वह हरित स्थिति **भ्रामक हरित** थी: `check:cycles` ने 5 उप-डायरेक्टरी (450 फ़ाइलें) स्कैन कीं, केवल स्थिर `import|export … from` का मिलान किया, और प्रत्येक `@/` तथा `@omniroute/open-sse/` स्पेसिफ़ायर को छोड़ दिया, इसलिए वह उन डायनेमिक-इम्पोर्ट + एलियास चक्रों को नहीं देख सका जो रेपो में प्रमुख थे। इसे ठीक कर दिया गया है: गेट अब `src` + `open-sse` (5023 फ़ाइलें) में चलता है, TypeScript AST से स्पेसिफ़ायर एकत्र करता है (इसलिए `import("…")` गिना जाता है और टाइप-पोज़िशन `typeof import("…")` नहीं), और tsconfig `paths` को रिज़ॉल्व करता है। यह 0 नहीं, बल्कि **14** चक्र ढूँढ़ता है। चूँकि पहले से मौजूद 14 चक्रों को किसी गेट PR में ठीक नहीं किया जा सकता, इसलिए `check:cycles` अब एक **रैचेट** है (`--ratchet`, `quality-baseline.json` में अधिकतम सीमा `metrics.cycles.value = 14`, `direction: down`) — यह किसी भी _प्रतिगमन_ को अवरुद्ध करता है और संख्या केवल घट सकती है। CI, `npm run check:cycles:ratchet` चलाता है। क्रमिक कमी **A-01** के साथ आगे बढ़ेगी। व्यापक द्वितीय राय के रूप में `check:circular-deps` (dpdm) परामर्शात्मक बना रहेगा।
- **जटिलता** — ✅ **पूर्ण** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint वॉक, ruleId के अनुसार गणना करता है ताकि cyclomatic+max-lines और cognitive बेसलाइन स्वतंत्र रहें; अलग-अलग `check:complexity` / `check:cognitive-complexity` स्थानीय `--update` के लिए बने रहेंगे।
- **`/api` एंटी-हैलुसिनेशन** — ✅ **पूर्ण** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` की एक FS इन्वेंटरी, openapi-routes + docs-symbols अब भी स्वतंत्र रूप से रिपोर्ट करते हैं; अलग-अलग जाँच स्थानीय रन के लिए बनी रहेंगी।
- **`check:node-runtime` 11 जॉब में चलता है** — ⚠️ **कम ROI।** प्रत्येक अलग रनर है और जाँच <1s की है; कुल बचत ~10s है, जबकि इससे हर जॉब के लिए एक सस्ता सुरक्षा उपाय हट जाएगा। इतना बदलाव उचित नहीं है।
- **CI lint पर `typecheck:noimplicit:core`** — ✅ **lint जॉब से हटा दिया गया** (यह परामर्शात्मक `continue-on-error` था); अवरोधक टाइप सतह `typecheck:core` + `check:type-coverage` है। स्थानीय स्क्रिप्ट बनाए रखी गई है।

### फ्लिप / निर्णय (ऑपरेटर नीति)

- `check:openapi-security-tiers` (परामर्शात्मक) — ❌ **स्वच्छ रूप से फ्लिप नहीं किया जा सकता।** यह 0 के साथ समाप्त होता है, लेकिन चेतावनी देता है कि `LOCAL_ONLY_API_PREFIXES` के अंतर्गत कई `traffic-inspector` रूट में `x-loopback-only: true` एनोटेशन नहीं है। इसे लागू करने के लिए पहले `openapi.yaml` में वे एनोटेशन जोड़ने होंगे।
- `typecheck:noimplicit:core` (परामर्शात्मक) — यह बड़े स्तर पर अवरोधक `check:type-coverage` रैचेट में समाहित है। इसे रैचेट में फ्लिप करें या अनावश्यक दूसरे `tsc` पास को हटा दें।
- `test:vitest:ui` (अब **अवरोधक**) — पहले से मौजूद विफलताओं को `vitest.config.ts` में `// #8618` ट्रैकिंग टिप्पणियों के साथ स्पष्ट रूप से बाहर रखा गया है; नई विफलताएँ जॉब को विफल करेंगी।
- `check:secrets` (gitleaks, अवरोधक रैचेट) — वर्तमान अधिकतम सीमा `quality-baseline.json` में `metrics.secretFindings` है। किसी भी अपवाद के लिए `.gitleaks.toml` में उचित औचित्य वाली प्रविष्टि आवश्यक है; अनुपलब्ध माप INCOMPLETE है। यह स्कैन GitHub की मूल secret scanning और `check:public-creds` का पूरक है।
- `check:pr-evidence` (अवरोधक, PR-body गद्य पर grep करता है) — गलत-सकारात्मक परिणामों का उच्च जोखिम; इसे हटाने से Hard Rule #18 का प्रवर्तन कमजोर पड़ता है, इसलिए यह वास्तव में नीतिगत निर्णय है।
- `semgrep` (परामर्शात्मक स्वतंत्र जाँच) — OWASP श्रेणियों के लिए CodeQL के साथ ओवरलैप करता है; इसके बेसलाइन को किसी रैचेट से जोड़ें या इसे हटा दें।

---

## संबंधित दस्तावेज़

- सप्लाई-चेन (उद्गम, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — कुंजी-समुच्चय समानता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, जॉब `i18n-ui-coverage`)।
यह प्रत्येक `src/i18n/messages/<locale>.json` के लीफ़ कुंजी-समुच्चय की तुलना `en.json` से करता है और
कोई भी लीफ़ अनुपस्थित या अतिरिक्त होने पर विफल हो जाता है, भले ही कुंजी कब जोड़ी गई हो। `__MISSING__:`
प्लेसहोल्डर उपस्थित माने जाते हैं (उनकी सामग्री अनुपात गेट का विषय है)। यह दो
डिफ़-आधारित/प्रतिशत गेटों का पूर्ण पूरक है: `check-ui-keys-coverage` प्रत्येक
लोकेल के लिए न्यूनतम 80 % लागू करता है (~13,000 में से 43 अनुपस्थित कुंजियाँ होने पर भी 99.7 % दिखता है) और `check-new-key-coverage`
केवल उन कुंजियों का आकलन करता है जिन्हें कोई PR `en.json` में जोड़ता है। किसी लोकेल बैच को उस दिन के `en.json` से जनरेट किया जाता है
जिस दिन उसकी ब्रांच बनाई जाती है, और वह कई दिनों तक अनुवाद करता रहता है जबकि बेस में नई कुंजियाँ जुड़ती रहती हैं; बैच PR स्वयं
कोई कुंजी नहीं जोड़ता, इसलिए जब बैच 1 (#13044) नौ लोकेल में 43 कुंजियाँ कम लेकर
और बैच 2 (#13660) आठ लोकेल में 10 कुंजियाँ कम लेकर मर्ज हुए (2026-09-15), तब दोनों संबंधित गेट मौन रहे। विफलता को ठीक करने के लिए
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` चलाएँ; कोई `extra` लीफ़
यह दर्शाता है कि स्रोत ने उसे हटा दिया है — उसे लोकेल से हटाएँ। `--warn` विफल हुए बिना रिपोर्ट करता है।
`--catalog=cli`, `bin/cli/locales` पर वही तुलना चलाता है (`npm run i18n:check-keys:cli`);
दोनों चरण जॉब `i18n-ui-coverage` में हैं।

#### `check-new-key-coverage` — नई-कुंजी i18n गेट

`check-ui-value-drift` का संबंधित गेट। वह ऐसी अंग्रेज़ी वैल्यू पकड़ता है जिसे **फिर से लिखा गया**
लेकिन जिसके अनुवाद पीछे छूट गए; यह ऐसी अंग्रेज़ी कुंजी पकड़ता है जिसे **जोड़ा गया**
लेकिन जिसे कुछ लोकेल ने कभी प्राप्त नहीं किया।

`check-ui-keys-coverage` इस श्रेणी को नहीं देख सकता: यह प्रत्येक लोकेल के लिए प्रतिशत की न्यूनतम सीमा लागू करता है, और
~13,000 में से ग्यारह अनुपस्थित कुंजियाँ होने पर कवरेज 99.9% रहता है। प्रति भाषा कोई प्रतिशत
यह व्यक्त नहीं कर सकता कि "यह फ़ीचर बिना अनुवाद के जारी हुआ" — किसी नए लोकेल में पूरा फ़ीचर बिना किसी
टेक्स्ट के आ सकता है और संख्या में कोई बदलाव नहीं होगा।

वह घटना जिसे यह निरूपित करता है: Orchestration Canvas के Phase 3 ने अपनी ग्यारह कुंजियों का
उस समय मौजूद 42 लोकेल में अनुवाद किया। कुछ घंटों बाद EU-भाषा बैच (#13044) ने रेपो में
लोकेल की संख्या 51 कर दी, और नौ नए लोकेल (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ने उन्हें कभी
प्राप्त नहीं किया। किसी अनुपस्थित कुंजी के लिए `deepMergeFallback` अंग्रेज़ी का उपयोग करता है, इसलिए विफलता के परिणामस्वरूप
रिक्त UI के बजाय अनुवाद-रहित UI दिखा — यह वास्तविक था और संरचनागत रूप से मौन रहा।

अपने संबंधित गेट की तरह यह भी **डिफ़-सजग** है, जो मर्ज बेस पर अंग्रेज़ी की तुलना कार्यशील
ट्री से करता है, इसलिए पहले से मौजूद अंतर स्थिर रहते हैं और गेट को सक्षम करने के लिए किसी माइग्रेशन की आवश्यकता नहीं पड़ी।

**कोई `__MISSING__:<english>` मार्कर इसकी शर्त पूरी नहीं करता (2026-09-17 से)।** पहले यह
दस्तावेज़ित स्थगन था — रनटाइम सही अंग्रेज़ी पर फ़ॉलबैक करता है — लेकिन 2026-09-16 के आठ फ़ीचर PR ने
61 कुंजियाँ जोड़ीं और अनुवाद करने के बजाय सभी 65 लोकेल में मार्कर लगा दिया: इस
गेट ने उन सभी को स्वीकार कर लिया, किसी भी चीज़ ने PR को नहीं रोका, और फिर अवरोधक वास्तविक-अनुवाद अनुपात गेट
रिलीज़ टिप पर सभी के लिए विफल हो गया (pt-BR 3.2 % > 2.5 % + 0.5)। अब मार्कर को
अनुपस्थित अनुवाद माना जाता है। विफलता को ठीक करने के लिए
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` चलाएँ, या
`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
डिटैच्ड-सुरक्षित, `OMNIROUTE_TRANSLATION_*` env के बिना शुरू होने से इनकार करता है) के साथ सभी लोकेल पर समानांतर रूप से चलाएँ। ऐसी कुंजी जिसे
अंग्रेज़ी में ही रहना चाहिए (कोई पिन किया हुआ उत्पाद/इंजन/फ़्लैग नाम), उसे `scripts/i18n/untranslatable-keys.json` में रखा जाना चाहिए,
किसी मार्कर के पीछे कभी नहीं। `vi` मार्करों को पूरी तरह प्रतिबंधित करता है (`tests/unit/i18n-vi-completeness.test.ts`)।

#### `check-vitest-exclusions` — स्थगित-परीक्षण गेट

`vitest.config.ts` की `exclude` सूची में मौजूद फ़ाइल ऐसा परीक्षण है जो चलता नहीं है, लेकिन ट्री पढ़ने वाले व्यक्ति को वह
कवरेज जैसा दिखता है। बासठ फ़ाइलें इस टिप्पणी के पीछे एकत्र हो गईं:
`// #8618 — pre-existing failure; remove this exclusion when fixed`। Issue #8618 को
2026-08-11 को बंद कर दिया गया, जबकि उसके द्वारा ट्रैक की जाने वाली सूची 45 प्रविष्टियों से बढ़कर 62 हो गई; हर नई प्रविष्टि को
एक बंद हो चुके issue की ओर इंगित करने वाली टिप्पणी विरासत में मिली। जब अंततः सूची को फ़ाइल-दर-फ़ाइल मापा गया (#13204), तो **62 में से 51
फ़ाइलें बिना किसी स्रोत परिवर्तन के वर्तमान ट्री पर सफल रहीं**।

गेट के लिए आवश्यक है कि वास्तविक फ़ाइल में रिज़ॉल्व होने वाला प्रत्येक एक्सक्लूज़न (a) किसी ट्रैकिंग issue का नाम दे और
(b) अपनी मापी गई स्थिति सहित `config/quality/vitest-exclusions.json` में दिखाई दे, ताकि किसी एक्सक्लूज़न को जोड़ना
60-प्रविष्टियों वाली ऐरे में एक और पंक्ति जोड़ने के बजाय किसी समर्पित फ़ाइल में समीक्षा योग्य डिफ़ हो। यह जानबूझकर
एक्सक्लूड किए गए परीक्षणों को दोबारा नहीं चलाता — इसमें ~10 मिनट लगते हैं और यह आवधिक जॉब का कार्य है;
इन्वेंटरी दर्ज करती है कि प्रत्येक को अंतिम बार कब मापा गया था।
