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

## गेट इन्वेंट्री और निष्पादन प्रोफाइल

### अभ्यर्थी प्रवेश

CI और क्वालिटी गेट्स वर्कफ़्लो प्रत्येक एक स्थिर निर्णय देते हैं: `Gate / CI` और `Gate / Quality`। उनकी संस्करणबद्ध प्रवेश नीति आवश्यकता या सलाह के अनुसार प्रत्येक अपस्ट्रीम नौकरी की गणना करती है। लागू आवश्यक कार्य सफल होना चाहिए: गुम, रद्द, छोड़ा गया, लंबित और अज्ञात परिणाम PASS स्थापित नहीं कर सकते। एक वैध दस्तावेज़-केवल या कैटलॉग-केवल वर्गीकरण एक कोड लेन को अनुपयुक्त बना सकता है; ड्राफ्ट PR एक स्वीकृत उम्मीदवार नहीं है। एक `hotfix` लेबल साक्ष्य को माफ नहीं करता है।

दोनों वर्कफ़्लो PRs main/release शाखाओं में कवर करते हैं, `main` पर पुश करते हैं, मैन्युअल प्रेषण और मर्ज-समूह ईवेंट को कवर करते हैं। पुश, डिस्पैच और मर्ज-ग्रुप पूर्ण चयन चलाते हैं। `release/**` पर पुश करने से वे प्रारंभ नहीं होते (2026-10-18): प्रत्येक परिवर्तन पहले से ही अपने PR पर मैट्रिक्स चलाता है और मर्ज किया गया संयोजन रिलीज़-ग्रीन का काम है (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन)। फोर्क्स और मर्ज समूह नौकरियों के लिए होस्टेड रनर का उपयोग करते हैं जो अन्यथा स्व-होस्टेड रनर का चयन करते हैं; रोलआउट से पहले पर्याप्त होस्ट की गई क्षमता का सत्यापन किया जाना चाहिए।

एक साधारण PR तेज़ चयन चलाता है। प्रवेश नीति की `full-code` और `full-code-e2e` लेन (E2E, इंटीग्रेशन, पैकेज आर्टिफैक्ट, Electron स्मोक, Bun SQLite, इकोसिस्टम और प्रोटोकॉल क्लाइंट) केवल मर्जिफाई कतार ड्राफ्ट पर या पूर्ण रन पर चलती हैं: `gh workflow run ci.yml --ref <branch>`।

प्रत्येक JSON रसीद चेक-आउट SHA, वर्कफ़्लो रन और प्रयास की पहचान करती है। CLI एक checkout/event SHA बेमेल को अस्वीकार करता है। वर्कफ़्लो परीक्षण नीति सदस्यता को निर्णय कार्य की `needs` सूची से जोड़ता है ताकि कोई नया या हटाया गया लेन चुपचाप गायब न हो सके। रसीदें उनके स्वयं के वर्कफ़्लो को कवर करती हैं, न कि प्रकाशन, परिनियोजन, या किसी मौजूदा सलाहकार स्कैनर के आंतरिक भाग को। शाखा नियमों में दोनों चेक नामों को सक्रिय करना एक अलग प्रशासनिक परिवर्तन है; इन नौकरियों को जोड़ने से किसी शाखा की सुरक्षा नहीं होती है।

### कतार मर्ज करें

`queue` लेबल एक PR Mergify कतार (`.mergify.yml`) में भेजता है। मर्जिफ़ाई एक `mergify/merge-queue/` शाखा पर एक ड्राफ्ट PR खोलता है, CI वहां पूर्ण चयन चलाता है, और `Gate / CI`, `Gate / Quality` और `Merge integrity (changelog + generated skills)` पास होने पर मूल PR विलय हो जाता है।

मर्जिफाई ड्राफ्ट के विवरण में अपना कतार सारांश लिखता है, और अन्य ऐप्स भी इसे संपादित कर सकते हैं। ऐसे ड्राफ्ट पर एक `pull_request` `edited` ईवेंट अपना स्वयं का समवर्ती समूह (`-queue-edit-<run_id>`) लेता है, इसलिए यह ड्राफ्ट के वास्तविक रन को रद्द नहीं कर सकता है, और यह गेट और मैट्रिक्स को छोड़ देता है। केवल `Merge integrity` अभी भी चलता है। छोड़े गए गेट जॉब में एक अलग चेक नाम होता है, क्योंकि मर्जिफाई एक छोड़े गए `Gate / CI` एक असफल चेक के रूप में पढ़ता है और PR हटा देता है।

एक डिक्यू के बाद, एक पुश के लिए हमेशा PR आवश्यकता नहीं होती है। इस पर `@mergifyio queue` टिप्पणी करें।

### स्वीकृति रिड्यूसर में साक्ष्य बनाए रखा

`scripts/quality/validate-release-acceptance.mjs` आपूर्ति की गई योजना और उसके मैनिफ़ेस्ट को कम कर देता है; यह स्थापित नहीं करता है कि योजना पूरी रिलीज़ पाइपलाइन को कवर करती है। इसकी रिपोर्ट स्पष्ट रूप से `releaseAcceptance: false` सेट करती है, भले ही वह योजना `VERIFIED` हो। `release-acceptance.yml` वर्कफ़्लो अभी भी छाया फिक्स्चर का उपयोग करता है, वास्तविक बिल्ड, पैकेज, बूट या प्रमोशन रसीदों का नहीं।

CLI रखे गए साक्ष्यों को सत्यापित करने के लिए `--evidence-root` की आवश्यकता होती है। फ़ाइलें `<evidence-root>/<artifact_id>/<member>` के रूप में हल की जाती हैं और SHA-256 के रूप में हैश की जाती हैं। सबूत के बिना एक PASS रिकॉर्ड, एक गुम या बदली हुई फ़ाइल, एक असुरक्षित पथ या एक सिम्लिंक सत्यापन को रोकता है। गुम फ़ाइलें खाली सफल लॉग के बराबर नहीं हैं। मौजूदा SHA/run/attempt चेक स्वतंत्र रहते हैं: मिलान बाइट्स पुरानी रसीद को नहीं बचा सकते। फ़ाइल अखंडता निष्पादन प्रामाणिकता या विरूपण साक्ष्य प्रचार का प्रमाण नहीं है।

### स्थैतिक स्कैन सूची

संस्करणित एनपीएम-उपनाम इन्वेंट्री और स्टेटिक-स्कैन सदस्यता `config/quality/gate-manifest.json` में रहते हैं। `package.json` के विरुद्ध स्क्रिप्ट नामों और सटीक आदेशों को मान्य करने के लिए `npm run check:gate-manifest` चलाएँ; परिवर्धन, निष्कासन और कमांड बहाव CI में स्थानीय हुक और परिवर्तन-वर्गीकरण कार्य दोनों को विफल कर देते हैं। उपनाम कोई वर्कफ़्लो कार्य, मैट्रिक्स उदाहरण या परीक्षण केस नहीं है: इन गणनाओं को विनिमेय के रूप में प्रस्तुत नहीं किया जाना चाहिए।

चयनित उपनामों को निष्पादित किए बिना उनका निरीक्षण करने के लिए `npm run quality:scan -- --list` या `npm run quality:scan:fast -- --list` उपयोग करें। रनर एनपीएम एंट्रीपॉइंट को आमंत्रित करता है, इसलिए इसका रनटाइम (जहां कॉन्फ़िगर किया गया है वहां Bun सहित) संरक्षित है। मेनिफेस्ट उन प्रोफाइलों के बाहर अलग से बुलाए गए उपनामों को रिकॉर्ड करता है, और केवल-पढ़ने के लिए स्कैन प्रोफाइल में रखरखाव आदेश निषिद्ध हैं।

ये प्रोफ़ाइल केवल स्थैतिक स्कैन को कवर करती हैं। वे उत्पाद परीक्षण, कवरेज, पैकेजिंग, बाहरी जांच या उम्मीदवार की पूर्ण रिलीज़ स्वीकृति को प्रमाणित नहीं करते हैं। वर्कफ़्लो प्रवेश लिंक किए गए `config/quality/admission-policy.json` और `scripts/quality/admission-verdict.mjs` उपयोग करता है। रिलीज़-ऑब्जर्वर प्रोफ़ाइल अलग रहती हैं; उनके लागू चेक और रसीदों का स्वतंत्र रूप से निरीक्षण करें। संपूर्ण पर्यवेक्षक के स्थिर आदेश `config/quality/release-green-static-profile.json` में घोषित किए जाते हैं, जिनमें `audit:deps`, उत्परिवर्तन-परीक्षण चयन और अनुवाद जांच शामिल हैं। लोडर package.json और मॉडल किए गए CI/Quality घोषणाओं के विरुद्ध npm कमांड को मान्य करता है; यह शेल टोकन को तर्क के रूप में निष्पादित करने के बजाय बहाव को अस्वीकार करता है। आवश्यक स्कैनर SKIP/INCOMPLETE आउटपुट PASS स्थापित नहीं कर सकता। प्रोफ़ाइल अपने बाहरी बहिष्करणों को रिकॉर्ड करती है और होस्ट किए गए कवरेज, परीक्षण मैट्रिक्स, पैकेज या परिनियोजन साक्ष्य को प्रतिस्थापित नहीं करती है। नीचे दी गई गद्य सूची एक संदर्भ है, इस बात का प्रमाण नहीं कि गेट वास्तव में चलता था।

स्क्रिप्ट `scripts/check/` (पॉलिसी गेट्स) और `scripts/quality/` (रैचेट इंजन) के अंतर्गत रहती हैं। सत्य का CI स्रोत `.github/workflows/ci.yml` है।

### PR फास्ट-पाथ (`quality.yml`) जारी करें

`.github/workflows/quality.yml` main/release PRs पर CI पूरक करता है, `main` की ओर धकेलता है, समूहों को भेजता है और मर्ज करता है। PRs पथ-फ़िल्टर किए गए तेज़ जाँच का उपयोग करें। स्थायी रूप से अक्षम डुप्लिकेट बिल्ड हटा दिया गया था; असली build/package/boot चेक CI में ही रहते हैं। यूनिट सुइट और विटेस्ट केवल CI (`Unit Tests (N/8)` और `Vitest`) में चलते हैं।

| काम                                              | दायरा                                                                                                     | ब्लॉक कर रहा है |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API डॉक्स रेफरी और डॉक्स-सभी                                                               | हाँ             |
| `Fast Quality Gates`                             | कोड PRs; स्थैतिक जाँच, टाइपचेक, डैशबोर्ड टाइपचेक, प्रभावित इकाई परीक्षण, भूले हुए सहोदर परीक्षण (सलाहकार) |
| `No new ESLint warnings`                         | कोड PRs; दमन-जागरूक लिंट गार्ड                                                                            | हाँ, कांटे सहित |
| `Merge integrity (changelog + generated skills)` | गैर-ड्राफ्ट PRs; चेंजलॉग और उत्पन्न कौशल सिंक                                                             | हाँ, कांटे सहित |

#### भूले हुए भाई-बहन की परीक्षण रिपोर्ट

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` के एक सलाहकारी चरण के रूप में चलता है और परीक्षण-प्रभाव मानचित्र के पीछे आयात रिज़ॉल्वर का पुन: उपयोग करता है। प्रत्येक परिवर्तित उत्पादन मॉड्यूल के लिए, यह नियतात्मक `changed module/symbol -> static consumer -> candidate sibling test` श्रृंखलाओं की रिपोर्ट करता है जब उम्मीदवार परीक्षण पुल-अनुरोध अंतर से अनुपस्थित होता है। मार्कडाउन सारांश और JSON परिणाम को किसी भी ब्लॉकिंग रोलआउट से पहले अंशांकन के लिए `forgotten-sibling-tests` वर्कफ़्लो आर्टिफैक्ट के रूप में रखा जाता है।

बैरल पुनः निर्यात और गतिशील आयात केवल रिज़ॉल्यूशन डायग्नोस्टिक्स हैं; वे कभी कोई अवरोधक खोज नहीं बनाते। समीक्षित अपवाद `config/quality/forgotten-sibling-allowlist.json` में रहते हैं। प्रत्येक प्रविष्टि में उपभोक्ता और उम्मीदवार परीक्षण का नाम होना चाहिए, एक विशिष्ट तर्क देना चाहिए, और एक GitHub समस्या या पुल अनुरोध को लिंक करना चाहिए। विकृत प्रविष्टियाँ विफल बंद हो गईं। अपवाद हटाए गए उम्मीदवार परीक्षण या `.skip`/`.todo` जोड़ने वाले अंतर को नहीं दबा सकते; अभिकथन कमजोर करना और अन्य मास्किंग स्वतंत्र रूप से अवरुद्ध `check:test-masking` गेट के स्वामित्व में रहते हैं।

### नौकरी: `lint`

प्रत्येक PR से `main` पर चलता है। असफलता पर ब्लॉक विलीन हो जाते हैं।

| स्क्रिप्ट (`npm run ...`)         | पुष्टि                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ब्लॉक कर रहा है                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js संस्करण समर्थित सीमा के भीतर है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हाँ                                     |
| `check:cycles`                    | संपूर्ण `src/` + `open-sse/` में परिपत्र आयात (एएसटी-आधारित, tsconfig `paths` समाधान)। जब भी कोई चक्र मौजूद होता है तो बेअर 1 से बाहर निकलता है ( #15281 के बाद से विफल-बंद) और SCCs को सूचीबद्ध करता है। `check:cycles:ratchet` (क्या CI चलता है) ब्लॉक हो जाता है जब गिनती `quality-baseline.json` — में `metrics.cycles` सीमा से अधिक हो जाती है वर्तमान में 14, `direction: down`, इसलिए यह केवल गिर सकता है (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हाँ (शाफ़्ट)                            |
| `check:boundary`                  | `open-sse → src` युग्मन: इंजन से ऐप में अद्वितीय फ़ाइल-टू-फ़ाइल आयात (`scripts/quality/measure-boundary.mjs`; एज सूची v4 core/module-split उपचार बैकलॉग है)। नंगे = सलाहकार रिपोर्ट ( `quality:boundary` के समान)। `check:boundary:ratchet` (क्या CI चलता है, `quality.yml` फास्ट-गेट्स रैचेट लूप में भी) ब्लॉक हो जाता है जब गिनती `quality-baseline.json` — में `metrics.boundaryOpenSseToSrc` छत से अधिक हो जाती है जो मापा 771, `direction: down` पर आधारित होती है; `--update` केवल इसे कम करता है; PRs पर आधार-सापेक्ष (`--base-ref`, नीचे देखें)                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हाँ (शाफ़्ट)                            |
| `check:route-validation:t06`      | Zod स्कीमा सभी मार्गों पर मौजूद हैं (टियर 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` गिनती बजट से अधिक नहीं है (टियर 11 कैटराका)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हाँ                                     |
| `check:provider-consistency`      | `providers.ts` में प्रत्येक प्रदाता के पास `providerRegistry.ts` में एक मिलान प्रविष्टि है (और इसके विपरीत, अनुमति सूची के भीतर)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                     |
| `check:model-lifecycle`           | हाथ से बनाए गए तीन रूटिंग टेबल चेक-इन जीवनचक्र स्नैपशॉट (#11503) के अनुरूप रहते हैं: `FITNESS_TABLE` (`taskFitness.ts`) स्कोर कोई सेवानिवृत्त आईडी नहीं है जिसे `REGISTRY` रूट कर सकता है; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` में मौजूद है और सेवानिवृत्त-आईडी स्नैपशॉट से अनुपस्थित है; `REGISTRY` में अभी भी प्रत्येक सेवानिवृत्त आईडी को `allowedRetiredInCatalog` में अग्रेषित या सूचीबद्ध किया गया है; और उस स्नैपशॉट में कोई `DEFAULT_DEGRADATION_MAP` स्रोत या लक्ष्य सेवानिवृत्त नहीं दिखता है। इससे यह साबित नहीं होता है कि एक मॉडल वर्तमान में लाइव अपस्ट्रीम द्वारा परोसा जाता है। ऑफ़लाइन — तुलना `config/quality/model-lifecycle.json` से की जाती है, `npm run quality:refresh-model-lifecycle` (नेटवर्क; CI में वायर्ड नहीं) के साथ हाथ से ताज़ा किया जाता है। `allowedRetiredInCatalog` एक बर्न-डाउन शाफ़्ट है: केवल ट्रैकिंग समस्या के साथ एक प्रविष्टि जोड़ें।                                                                                                                                       | हाँ                                     |
| `check:fetch-targets`             | क्लाइंट-साइड `src/` में प्रत्येक `fetch("/api/...")` एक वास्तविक `route.ts` को हल करता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                     |
| `check:deps`                      | रेपो में प्रत्येक `package.json` में सभी `npm install` -able डिपो `dependency-allowlist.json` में हैं; नए अनपिन किए गए या स्लोपस्क्वाट किए गए पैकेजों को चिह्नित किया गया                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                     |
| `audit:deps`                      | सभी पांच स्वतंत्र लॉकफ़ाइल्स (रूट, Electron, OpenCode प्लगइन्स v1/v2 और प्रदाता) का एनपीएम ऑडिट। महत्वपूर्ण सलाह ब्लॉक; उच्च परामर्श दृश्यमान चेतावनियाँ बने रहते हैं। Missing/failed ऑडिट INCOMPLETE और ब्लॉक हैं; प्रति-स्कोप लॉक हैश और रिपोर्ट बरकरार रखी जाती हैं।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हाँ                                     |
| `check:lockfile`                  | `package-lock.json` अखंडता — https रजिस्ट्री, अखंडता हैश, कोई होस्ट ओवरराइड नहीं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                     |
| `check:licenses`                  | उत्पादन निर्भरता के लिए SPDX लाइसेंस अनुमति सूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                     |
| `check:tracked-artifacts`         | कोई निर्मित कलाकृतियाँ/प्रतिबद्ध `node_modules` सिम्लिंक नहीं (हस्की प्री-कमिट में भी चलता है; प्री-पुश जानबूझकर हल्का — #6716 है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                     |
| `check:ai-attribution`            | PR कमिट, शीर्षक या बॉडी — हार्ड रूल #16 में कोई AI/bot `Co-Authored-By` ट्रेलर या AI-जेनरेशन फ़ुटर नहीं है ( PR→ `release/**` — के लिए `quality.yml` फास्ट-गेट्स लूप में इवेंट पेलोड पढ़ता है, PRs — नो-ऑप ऑफ करता है और PR→ `main` के लिए `ci.yml` लिंट में एक पीआर-केवल चरण; साथ ही; हस्की `commit-msg` हुक; मानव सह-लेखकों की #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | प्रत्येक Vitest बहिष्करण एक ट्रैकिंग समस्या का नाम देता है और `config/quality/vitest-exclusions.json` (#13204) में दिखाई देता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                     |
| `check:file-size`                 | स्रोत फ़ाइलें ( `src/`, `open-sse/`, `electron/`, `bin/` में`.ts`/`.tsx` ) `cap` के भीतर रहती हैं और परीक्षण फ़ाइलें (`*.test.ts(x)`) `testCap` के भीतर रहती हैं; `file-size-baseline.json` (`frozen` / `testFrozen`) में जमी हुई फ़ाइलें अपने रिकॉर्ड किए गए आकार से अधिक नहीं बढ़नी चाहिए                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हाँ                                     |
| `check:error-helper`              | executors/handlers में त्रुटि प्रतिक्रियाएँ `buildErrorBody()` / `sanitizeErrorMessage()` का उपयोग करें (हार्ड नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हाँ                                     |
| `check:migration-numbering`       | माइग्रेशन SQL फ़ाइलें क्रमिक रूप से क्रमांकित हैं, कोई अंतराल या डुप्लिकेट नहीं है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                     |
| `check:public-creds`              | `publicCreds.ts` के बाहर कोई शाब्दिक OAuth `client_id`/`client_secret` या फायरबेस वेब कुंजियाँ नहीं हैं (हार्ड नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हाँ                                     |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल के बाहर कोई कच्चा SQL नहीं; `localDb.ts` से कोई बैरल-आयात नहीं (कठिन नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हाँ                                     |
| `check:known-symbols`             | प्रदाता निष्पादक, रूटिंग रणनीतियाँ, और उनके प्रेषण तालिकाओं में पंजीकृत अनुवादक डिस्क — पर फ़ाइलों से मेल खाते हैं, कोई अनाथ या अघोषित प्रतीक नहीं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                     |
| `check:route-guard-membership`    | प्रत्येक मार्ग जो एक चाइल्ड प्रोसेस को जन्म देता है, उसे `isLocalOnlyPath()` (हार्ड रूल्स #15/#17) द्वारा वर्गीकृत किया जाता है।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                     |
| `check:test-discovery`            | रेपो में प्रत्येक `*.test.ts` / `*.spec.ts` फ़ाइल को कम से कम एक परीक्षण धावक द्वारा एकत्र किया जाता है (शाफ़्ट: `test-discovery-baseline.json` में अनाथ सूची केवल सिकुड़ सकती है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                     |
| `check:test-tla-order`            | `tests/unit` के अंतर्गत कोई `node:test` फ़ाइल एक परीक्षण पंजीकृत नहीं करती है, एक शीर्ष-स्तरीय `await` हिट करती है, फिर अधिक पंजीकृत करती है (#18045; रैचेट: `test-tla-order-allowlist.json` केवल सिकुड़ सकता है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                     |
| `check:agent-skills-sync`         | उत्पन्न एजेंट-कौशल कलाकृतियाँ उनके स्रोत कैटलॉग से मेल खाती हैं (कोई बहाव नहीं)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | प्रदाता logos/assets एक रिकॉर्डेड उद्गम प्रविष्टि रखता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON कॉन्फिग फाइलों को पार्स करता है और रेपो लिंट नियमों को संतुष्ट करता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | त्रुटियों के बिनाTypeScript संकलन (केवल सलाहकार चेतावनियाँ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हाँ                                     |
| `typecheck:noimplicit:core`       | सख्त `noImplicitAny` — दूरंदेशी; कई पहले से मौजूद कॉल साइटों को अभी भी एनोटेशन की आवश्यकता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **सलाहकार** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` दायरा `src/app/(dashboard)/**` (#7033) तक है — `typecheck:core` की क्यूरेटेड 27-फ़ाइल अनुमति सूची में कोई डैशबोर्ड TSX शामिल नहीं है, और `next build` कभी भी इसे टाइप-चेक नहीं करता है (`next.config.mjs` सेट `ignoreBuildErrors: true`), इसलिए वहां अनाथ-पहचानकर्ता प्रतिगमन (#6625/#6909) CI के लिए अदृश्य थे। जमे हुए per-file/per-TS-code गिनती बेसलाइन के खिलाफ कठिनाइयाँ (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` के समान पुराना-प्रवर्तन पैटर्न) — केवल बेसलाइन गिनती से परे NEW त्रुटियां गेट को विफल कर देती हैं; जब पहले से मौजूद त्रुटि ठीक हो जाए तो `--update` के साथ शाफ़्ट डाउन करें।                                                                                                                                                                                                                                                                                                                                                                                      | हाँ                                     |
| `check:build-typecheck`           | संपूर्ण-ऐप उत्पादन प्रकार `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) पर जांच करता है, सतह `typecheck:core` की 27-फ़ाइल अनुमति सूची और डैशबोर्ड गेट को कवर नहीं करता है। `config/quality/build-typecheck-baseline.json` विरुद्ध कठिनाइयाँ; एक नई या बढ़ी हुई प्रति-(फ़ाइल, कोड) गिनती विफल हो जाती है, एक कम गिनती आपको शाफ़्ट करने के लिए कहती है। `--update` तब तक मना कर देता है जब तक रन में एक नई या उभरी हुई जोड़ी शामिल होती है जब तक कि `--force-regressions` पास नहीं हो जाता है, और एक नई साइलेंस की गई फ़ाइल को तब तक मना कर देता है जब तक कि `--force-nocheck` पास नहीं हो जाता है, इसलिए हरा पाने के लिए बेसलाइन को चौड़ा करना और एक स्थायी साइलेंस देना दो अलग-अलग जानबूझकर किए गए कार्य हैं। एक नंगे `--force` अस्वीकार कर दिया गया है। `config/quality/ts-nocheck-baseline.json` के विरुद्ध `@ts-nocheck` के लिए बिल्ड स्कोप को भी स्कैन करता है, क्योंकि इसका उपयोग करने वाली फ़ाइल किसी भी निदान की रिपोर्ट नहीं करती है और अन्यथा हर गेट के लिए अदृश्य होगी। | हाँ                                     |

#### दो टाइपचेक प्रोग्राम अलग-अलग उत्तर देते हैं

`typecheck:core` और `check:build-typecheck` अलग-अलग विकल्पों के तहत अलग-अलग प्रोग्राम संकलित करते हैं, और एक ही फ़ाइल एक में साफ़ हो सकती है और दूसरे में त्रुटियों से भरी हो सकती है।

`tsconfig.build.json` `"strict": false` सेट करता है, इसलिए `noImplicitAny` बंद है। कोर कॉन्फिगरेशन कड़े विकल्पों के साथ एक क्यूरेटेड 27-फ़ाइल अनुमति सूची संकलित करता है और प्रत्येक प्रविष्टि के आयात ग्राफ़ का अनुसरण करता है, इसलिए जो फ़ाइलें बिल्ड प्रोग्राम में कभी दिखाई नहीं देती हैं, उन्हें अभी भी वहां जांचा जाता है।

फ़ाइल टाइप की गई है या नहीं, इसका निर्णय करते समय परिणाम मायने रखता है:** `check:build-typecheck` के अंतर्गत शून्य निदान का मतलब शून्य नहीं है** . 26 फ़ाइलों में से `@ts-nocheck` अलग करने से बिल्ड प्रोग्राम में उनमें से 23 साफ़ दिखाई दीं; उनमें से सोलह में सख्त एक में लगभग 120 अंतर्निहित त्रुटियाँ सामने आईं। किसी फ़ाइल को क्लीन कॉल करने से पहले दोनों की जाँच करें।

### नौकरी: `quality-gate`

`test-coverage` के बाद चलता है. असफलता पर ब्लॉक विलीन हो जाते हैं।

| लिखी हुई कहानी               | पुष्टि                                                                                                                                                              | ब्लॉक कर रहा है           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | `quality-metrics.json` उत्सर्जित करता है (ESLint चेतावनी गिनती, मर्ज किए गए शार्ड रिपोर्ट से कवरेज)                                                                 | हाँ (शाफ़्ट के अपस्ट्रीम) |
| `quality:ratchet`            | `quality-baseline.json` में प्रत्येक मीट्रिक पीछे नहीं गया है (ESLint चेतावनियाँ ≤ बेसलाइन; कवरेज ≥ बेसलाइन)                                                        | हाँ                       |
| `check:duplication`          | कोड दोहराव (jscpd@4) `quality-baseline.json` में बेसलाइन से अधिक नहीं होता है                                                                                       | हाँ                       |
| `check:complexity`           | फ़ाइल-स्तरीय साइक्लोमैटिक जटिलता सीमा से अधिक नहीं है (कोर ESLint `complexity` + `max-lines-per-function`)                                                          | हाँ                       |
| `check:cognitive-complexity` | संज्ञानात्मक जटिलता शाफ़्ट (`eslint-plugin-sonarjs`) — अलग ESLint पास; CI दोनों को एकल `check:complexity-ratchets` चरण के रूप में मर्ज करके चलाता है                | हाँ                       |
| `check:dead-code`            | अप्रयुक्त निर्यात / फ़ाइलें रैचेट (knip) बेसलाइन बनाम वापस नहीं आती है                                                                                              | हाँ                       |
| `check:compression-budget`   | संपीड़न बेंचमार्क बजट — प्रति-इंजन टोकन-बचत फर्श को पीछे नहीं हटना चाहिए                                                                                            | हाँ                       |
| `check:type-coverage`        | प्रतिशत-टाइप किया गया शाफ़्ट (`type-coverage`) पीछे नहीं हटता; काफी हद तक `typecheck:noimplicit:core` को सम्मिलित करता है                                           | हाँ                       |
| `check:codeql-ratchet`       | ओपन CodeQL अलर्ट गिनती वापस नहीं आती है ( `gh api` के माध्यम से पढ़ता है; बिना टोकन के ग्रेसफुल-स्किप) — रिफ्रेश कैडेंस और मैनुअल ट्रिगर: नीचे "CodeQL रैचेट" देखें | हाँ                       |

### नौकरी: `quality-extended`

संपूर्ण कार्य सलाहकारी (`continue-on-error: true`) है। एनपीएम-आधारित रैचेट वास्तविक रूप से चलते हैं; जब बाइनरी अभी भी अनुपस्थित है तो बाहरी स्कैनर `gh release download` और सेल्फ-स्किप (निकास 0) के माध्यम से स्थापित होते हैं।

| लिखी हुई कहानी           | पुष्टि                                                                                                                                                                                                     | ब्लॉक कर रहा है                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | कोई परिपत्र निर्भरता नहीं (डीपीडीएम)                                                                                                                                                                       | **सलाहकार**                                     |
| `check:bundle-size`      | बंडल का आकार टोपी से अधिक नहीं होना चाहिए                                                                                                                                                                  | **सलाहकार**                                     |
| `check:secrets`          | बाइनरी अनुपस्थित होने पर गुप्त स्कैनिंग (gitleaks) — छोड़ देता है                                                                                                                                          | **सलाहकार**                                     |
| `check:vuln-ratchet`     | निर्भरता भेद्यताएँ (ओएसवी-स्कैनर) — वापस नहीं लेती हैं, `--ratchet` मापे न जाने पर INCOMPLETE (निकास 2) के रूप में विफल हो जाता है                                                                         | **सलाहकार**                                     |
| `check:workflows`        | वर्कफ़्लो लिंट (एक्शनलिंट + ज़िज़मोर); missing/broken स्कैनर, अमान्य रिपोर्ट या गुम रैचेट बेसलाइन INCOMPLETE के रूप में विफल हो जाते हैं। वैध निष्कर्ष चयनित strict/advisory/ratchet नीति का पालन करते हैं | निष्पादन आवश्यक; CI में ज़िज़मोर रैचेट ब्लॉकिंग |
| `check:openapi-breaking` | पिन किए गए ईवेंट कमिट के विरुद्ध सार्वजनिक API अनुबंध (PR मर्ज-बेस, पुश बिफोर, मर्ज-ग्रुप बेस; scheduled/manual चेकआउट फर्स्ट पेरेंट); आवश्यक माप विफल हो जाता है बंद हो जाता है                           | **--ratchet के साथ ब्लॉक करना**                 |

### नौकरी: `docs-sync-strict`

प्रत्येक PR से `main` पर चलता है। असफलता पर ब्लॉक विलीन हो जाते हैं।

| लिखी हुई कहानी                 | पुष्टि                                                                                                                                         | ब्लॉक कर रहा है                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:docs-all`               | मेटा-गेट जो नीचे दिए गए 6 उप-द्वारों को क्रमिक रूप से चलाता है                                                                                 | हाँ                                   |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt संस्करण संगति                                                                                                    | हाँ                                   |
| ↳ `check:docs-counts`          | गद्य में गिनती (प्रदाता गिनती, माइग्रेशन गिनती, आदि) वास्तविक गिनती की रैचेट विंडो के भीतर हैं                                                 | हाँ                                   |
| ↳ `check:env-doc-sync`         | `.env.example` में प्रत्येक env var को दस्तावेज़ तालिका में प्रलेखित किया जाता है, और इसके विपरीत                                              | हाँ                                   |
| ↳ `check:deprecated-versions`  | दस्तावेज़ों में कोई अप्रचलित संस्करण स्ट्रिंग नहीं                                                                                             | हाँ                                   |
| ↳ `check:doc-links`            | दस्तावेज़ों में आंतरिक मार्कडाउन लिंक वास्तविक फ़ाइलों को हल करते हैं (`[text]`/`(path)` फॉर्म)                                                | हाँ                                   |
| ↳ `check:fabricated-docs`      | रूट, एनवी वर्, CLI कमांड, हुक नाम और डॉक्स में उद्धृत फ़ाइल पथ कोडबेस में मौजूद हैं। `--strict` के माध्यम से हार्ड गेट; झंडे के बिना नरम-असफल। | हाँ ( CI में `--strict` के माध्यम से) |
| `check:cli-i18n`               | CLI कमांड स्ट्रिंग्स सभी i18n लोकेल फ़ाइलों में मौजूद हैं                                                                                      | हाँ                                   |
| `check:openapi-coverage`       | OpenAPI स्पेक वास्तविक मार्गों के कम से कम एक रैचेटेड फर्श को कवर करता है                                                                      | हाँ                                   |
| `check:openapi-security-tiers` | `openapi.yaml` में सुरक्षा स्तरीय एनोटेशन `routeGuard.ts` वर्गीकरण के अनुरूप हैं                                                               | **सलाहकार**                           |
| `check:openapi-routes`         | `openapi.yaml` में प्रत्येक पथ एक वास्तविक `route.ts` (मतिभ्रम विरोधी) का समाधान करता है                                                       | हाँ                                   |
| `check:docs-symbols`           | `docs/**/*.md` में प्रत्येक `/api/...` संदर्भ एक वास्तविक `route.ts` (मतिभ्रम विरोधी) का समाधान करता है                                        | हाँ                                   |
| `i18n translation drift`       | i18n लोकेल फ़ाइलों में अअनुवादित कुंजियाँ केवल — चेतावनी देती हैं                                                                              | **सलाहकार**                           |

`docs/diagrams/` के अंतर्गत बारह README SVGs उत्पन्न होते हैं (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` उन सभी को पुन: उत्पन्न करता है)। प्रत्येक में एक बाइट-तुलना इकाई परीक्षण (`tests/unit/docs/readme-*-svg.test.ts`, जॉब `test-unit`) होता है जो प्रतिबद्ध फ़ाइल के पुराना होने पर विफल हो जाता है, और `check:docs-counts` अपने `<text>` नोड्स — से कैनोनिकल संख्याओं को पढ़ता है, यही कारण है कि रूपरेखा चरण फ़ाइल में प्रत्येक उल्लिखित स्ट्रिंग को अदृश्य `<text>` के रूप में रखता है। SVG कैनोनिकल-नंबर चेक `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) में सूचीबद्ध फ़ाइलों को पढ़ता है: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, प्लस `public/images/tier-flow-dark.svg` और `tier-flow-light.svg`; निःशुल्क-हमेशा के लिए, कैटलॉग-प्रविष्टि, आवर्ती-पूल और स्कोरिंग-कारक दावे `promise-pillars.svg`, `free-tier-budget.svg` और `strategies-grid.svg` भी पढ़ते हैं। `free-tier-budget.svg` लाइव कैटलॉग लोडर से अपने आंकड़े खींचता है, इसलिए उस फ़ाइल के पुनर्जीवित होने तक `FREE_MODEL_BUDGETS` या प्रदाता डिस्प्ले नाम में परिवर्तन CI लाल कर देता है।

### नौकरी: `i18n-ui-coverage`

| लिखी हुई कहानी                    | पुष्टि                                                                                                                                                                                  | ब्लॉक कर रहा है |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुंजी कवरेज ≥ 65% है                                                                                                                                                            | हाँ             |
| `check-ui-value-drift` (इनलाइन)   | एक पुनः लिखित अंग्रेजी** कीमत** अपने पीछे कोई पुराना अनुवाद नहीं छोड़ता                                                                                                                 | हाँ             |
| `check-new-key-coverage` (इनलाइन) | ए** नया** प्रत्येक स्थान — में अंग्रेजी कुंजी का अनुवाद किया जाता है और `__MISSING__:` मार्कर को अस्वीकार कर दिया जाता है                                                               | हाँ             |
| `check-translation-ratio`         | प्रति स्थान वास्तविक-अनुवाद अनुपात (समान-से-अंग्रेजी / प्लेसहोल्डर / अनुमति सूची के बाहर गायब पत्तियां) `config/quality/i18n-translation-baseline.json` + स्लैक से अधिक नहीं होनी चाहिए | **सलाहकार**     |

`fetch-depth: 0` — की आवश्यकता है, मान-बहाव गेट मर्ज बेस के विरुद्ध `en.json` भिन्न होता है।

#### `check-ui-value-drift` — बासी-अनुवाद गेट

एक i18n प्रतिगमन को पकड़ता है जिसे अन्य द्वार संरचनात्मक रूप से नहीं देख सकते हैं: एक अंग्रेजी मान को फिर से लिखा जाता है और _पिछली_ अंग्रेजी से प्राप्त अनुवाद पीछे रह जाते हैं, इसलिए गैर-अंग्रेजी उपयोगकर्ता आत्मविश्वास से शब्दों वाली, अब-गलत प्रतिलिपि पढ़ते रहते हैं।

यह वास्तव में भेजा गया। जब Antigravity लॉगिन हेल्पर उतरा (#5203) तो `oauthModal.googleOAuthWarning` फिर से लिखा गया;** 43 में से 39 स्थान** पाठ में ऑपरेटरों को "पूर्ण URL की प्रतिलिपि बनाने और इसे नीचे चिपकाने" के लिए कहा गया — एक ऐसा प्रवाह है जो उस प्रदाता के लिए पूरा नहीं हो सकता है। #8463 तक इस पर किसी का ध्यान नहीं गया क्योंकि:

- `sync-ui-keys` केवल उन कुंजियों को बैकफ़िल करता है जो हैं** अनुपस्थित** , वे कभी नहीं हैं जो हैं** बासी** ;
- `check-ui-keys-coverage` कुंजी _उपस्थिति_ को गिनता है, इसलिए पुराना अनुवाद कवर के रूप में स्कोर करता है;
- `check-translation-drift` `docs/i18n/<locale>/**.md` दस्तावेज़ीकरण को ट्रैक करता है, — को प्रतिबिंबित करता है, यह `src/i18n/messages/*.json` कभी नहीं पढ़ता है। 2026-09 के पुन: सिंक के बाद से जॉब `docs-sync-strict` में अवरोधन: एक कोर दस्तावेज़ → `npm run i18n:run -- --files=<doc>` (सेक्शन-स्तर, सस्ता) संपादित करें।

**डिफ-अवेयर, बेसलाइन-समर्थित नहीं।** यह कार्यशील वृक्ष के विरुद्ध मर्ज आधार पर `en.json` तुलना करता है; प्रत्येक कुंजी के लिए जिसका अंग्रेजी मान बदल गया है, कोई भी स्थान जिसका अभी भी अछूता अनुवाद है, बासी है। ये जानबूझकर** पहले से मौजूद ऋण को जमा करता है** — a diff यह नहीं बता सकता कि कौन सी पुरानी अंग्रेज़ी से लंबे समय से अनुवाद किया गया है, इसलिए गेट केवल वही आंकता है जो वर्तमान परिवर्तन को छूता है। विकल्प (एक प्रति-कुंजी हैश बेसलाइन) के लिए एक ~ 600 KB जेनरेट की गई फ़ाइल खर्च होगी, 3 × सबसे बड़ी मौजूदा बेसलाइन, प्रत्येक i18n PR पर मंथन।

इसे संतुष्ट करने के दो तरीके:

1. प्रभावित अनुवादों को अद्यतन करें, या
2. उन्हें रनटाइम पर `__MISSING__:<new english>` — पर सेट करें, फिर सही अंग्रेजी (`src/i18n/request.ts::deepMergeFallback`, #7258) और अनुवाद के लिए मुख्य कतारें परोसें।

यदि स्ट्रिंग है** अर्थ** बदल गया, पसंद है** कुंजी का नाम बदलना** : एक नई कुंजी पुराने अनुवाद को प्राप्त नहीं कर सकती। वह पैटर्न #8463 इस्तेमाल किया गया है।

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

जब आधार कैटलॉग को पढ़ा नहीं जा सकता (आधार रेफरी के बिना उथला क्लोन), `check-openapi-breaking` को प्रतिबिंबित करते हुए, `SKIP reason=base-unresolved` के साथ 0 से बाहर निकलता है।

### नौकरी: `i18n`

पूर्ण i18n सत्यापन मैट्रिक्स (प्रति स्थान एक कार्य)। पूरा काम सलाह का है.

| लिखी हुई कहानी                  | पुष्टि                     | ब्लॉक कर रहा है                                        |
| ------------------------------- | -------------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | प्रति स्थान अनुवाद पूर्णता | **सलाहकार** (पूरे कार्य पर `continue-on-error: true` ) |

### नौकरी: `pr-test-policy`

केवल पुल अनुरोधों पर चलता है।

| लिखी हुई कहानी         | पुष्टि                                                                                                                                 | ब्लॉक कर रहा है |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check:pr-test-policy` | PRs जो `src/`, `open-sse/`, `electron/`, या `bin/` में उत्पादन कोड बदलता है उसे परीक्षण शामिल करना या अद्यतन करना होगा (हार्ड नियम #8) | हाँ             |
| `check:test-masking`   | परिवर्तित परीक्षण फ़ाइलें नेट एसर्ट संख्या को कम नहीं करती हैं या `assert.ok(true)` टॉटोलॉजी नहीं जोड़ती हैं                           | हाँ             |
| `check:pr-evidence`    | PR निकाय परिवर्तन के लिए test/VPS साक्ष्य का हवाला देता है ( PR गद्य — नाजुक को पकड़कर कठिन नियम #18 यंत्रीकृत करता है, बैकलॉग देखें)  | हाँ             |

### नौकरी: `test-vitest`

`build` के बाद चलता है. असफलता पर ब्लॉक विलीन हो जाते हैं।

| सुइट             | पुष्टि                                              | ब्लॉक कर रहा है                                                                                                                             |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्वर (110 उपकरण), autoCombo, कैश — vitest धावक | हाँ                                                                                                                                         |
| `test:vitest:ui` | UI घटक परीक्षण — vitest धावक                        | **ब्लॉक कर रहा है** — पहले से मौजूद विफलताओं को `vitest.config.ts` में स्पष्ट रूप से बाहर रखा गया है; नई असफलताएँ कार्य को विफल कर देती हैं |

### रात्रिकालीन कार्यप्रवाह (अनुसूचित, सलाहकारी)

ये क्रॉन शेड्यूल (और `workflow_dispatch`) पर चलते हैं, कभी PRs पर नहीं। सभी सलाह देने वाले हैं.

| कार्यप्रवाह            | पुष्टि                                                                                                                                                   | ब्लॉक कर रहा है |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | एक यादृच्छिक बीज + उच्च रन गिनती के साथ तेजी से जांच संपत्ति परीक्षण                                                                                     | **सलाहकार**     |
| `nightly-resilience`   | हीप-ग्रोथ गेट, कैओस फॉल्ट-इंजेक्शन, k6 load/soak                                                                                                         | **सलाहकार**     |
| `nightly-llm-security` | प्रॉम्प्टफू इंजेक्शन गार्ड (ब्लॉक मोड) + garak जांच (प्रदाता रहस्य के बिना छोड़ दिया गया)                                                                | **सलाहकार**     |
| `nightly-schemathesis` | `docs/openapi.yaml` — सरफेस स्पेक उल्लंघन / अनहैंडल्ड 500 (फ़ेज़ 8 बी.4) का उपयोग करके एक लाइव OmniRoute के विरुद्ध OpenAPI अनुबंध फ़ज़िंग (स्केमेथेसिस) | **सलाहकार**     |
| `nightly-mutation`     | फास्ट यूनिट लेन — पर स्ट्राइकर उत्परिवर्तन-परीक्षण स्कोर, जीवित उत्परिवर्ती सतह कमजोर दावे                                                               | **सलाहकार**     |
| `nightly-compat`       | समर्थित `engines.node` श्रेणियों में नोड इंजन संगतता मैट्रिक्स                                                                                           | **सलाहकार**     |

प्रदर्शन आधार रेखाएँ (हीप, TTFB, निर्माण समय) रिकॉर्ड की जाती हैं, गेटेड नहीं: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) देखें।

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
- **परामर्शात्मक** — स्थिर की गई बेसलाइन के मुकाबले वैश्विक कुल। विरासत में मिला विचलन किसी
  निर्दोष PR को कभी लाल नहीं करता; रिलीज़ मिलान के समय विचलन फिर से स्थिर किया जाता है और हेडरूम जॉब उसकी निगरानी करता है।

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

## अनुमति सूची नीति

प्रत्येक गेट जो पहले से मौजूद उल्लंघनों पर विफल नहीं हो सकता है, एक जमे हुए अनुमति सूची का उपयोग करता है (उदाहरण के लिए, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। नीति है:

**मूल कारण ठीक करें; अनुमति सूची का उपयोग केवल तभी करें जब उल्लंघन पहले से मौजूद हो और उसे उसी PR में ठीक नहीं किया जा सकता हो।**

किसी अनुमति सूची में प्रविष्टि जोड़ते समय:

1. औचित्य सहित एक टिप्पणी शामिल करें।
2. ट्रैकिंग समस्या का संदर्भ लें (जैसे, `// #3498 — Phase 2 feature, not yet implemented`)।
3. उसी PR में उस प्रविष्टि को हटा दें जो उल्लंघन को ठीक करती है — एक पुरानी प्रविष्टि जो अब सक्रिय उल्लंघन को नहीं दबाती है वह स्वयं एक दोष है (6A.3 बासी-प्रवर्तन एक बार लागू होने के बाद अनाथ अनुमति सूची प्रविष्टि पर गेट को विफल कर देगा)।

करना** नहीं** परीक्षणों को तेजी से पास कराने के लिए अनुमति सूची प्रविष्टियाँ जोड़ें। बढ़ती अनुमति सूची वाला हरा गेट गुणवत्ता की झूठी भावना है।

### जब आपके PR पर कोई गेट विफल हो जाता है

1. **गेट आउटपुट को ध्यान से पढ़ें** — यह आपको बताता है कि किस फ़ाइल या प्रतीक ने नियम का उल्लंघन किया है।
2. **उल्लंघन ठीक करें** — अधिकांश गेट नियतात्मक फ़ाइल सिस्टम जांच हैं जो कोड सही होते ही पास हो जाते हैं।
3. **यदि उल्लंघन पहले से मौजूद है** (यानी, आपने इसे पेश नहीं किया था लेकिन गेट अब इसे कवर करता है): एक औचित्य टिप्पणी और एक ट्रैकिंग मुद्दे के साथ एक अनुमति सूची प्रविष्टि जोड़ें।
4. **यदि गेट एक शाफ़्ट है** (कवरेज, ESLint चेतावनियाँ, दोहराव, जटिलता): आपके परिवर्तन ने मीट्रिक को और खराब कर दिया है। अंतर्निहित समस्या को ठीक करें, या (शायद ही कभी) `npm run quality:ratchet -- --update` चलाएँ यदि परिवर्तन जानबूझकर किया गया है और मीट्रिक गिरावट स्वीकार्य है — लेकिन PR विवरण में दस्तावेज़ क्यों करें।
5. **सलाहकार द्वार** (`continue-on-error: true`) सूचनात्मक — हैं, वे मर्ज को रोकते नहीं हैं बल्कि CI सारांश में दिखाई देते हैं। उन्हें किसी भी तरह ठीक करें.

---

## नया गेट जोड़ना

1. `scripts/check/check-<name>.mjs` (या `.ts`) बनाएँ। नीति गेट 0/1 के साथ समाप्त होते हैं।
   रैचेट-शैली के गेट `collect-metrics.mjs` के माध्यम से `quality-metrics.json` में एक मेट्रिक उत्सर्जित करते हैं।
2. `package.json` में `"check:<name>": "node scripts/check/check-<name>.mjs"` जोड़ें।
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

## युक्तिकरण बैकलॉग (ROI समीक्षा — Fase 9 Onda 3)

इस सूची को 2026-06-17 को `ci.yml` के विरुद्ध समेटा गया था (पूर्व संस्करण `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` को हटा दिया गया था)। समेटे गए सेट की एक ROI समीक्षा ने निम्नलिखित युक्तिकरण उम्मीदवारों की पहचान की।** विलय यांत्रिक CI परिवर्तन हैं; flips/drops ऑपरेटर के लिए आरक्षित नीतिगत निर्णय हैं।** नीचे कुछ भी अभी तक लागू नहीं किया गया है.

**ऊपर भी अप्रलेखित है** (सलाहकार, कम सिग्नल): `docs-lint` जॉब (markdownlint + Vale, संपूर्ण जॉब `continue-on-error`) और स्टैंडअलोन स्कैनर वर्कफ़्लो `semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0` `quality-baseline.json` में है, लेकिन `ci.yml` — में एक अवरुद्ध शाफ़्ट से जुड़ा नहीं है, मीट्रिक वर्तमान में अनाथ है।

### मर्ज / डिडुप (यांत्रिक, कम जोखिम)

प्रत्येक उम्मीदवार को 2026-06-17 (विश्वास-लेकिन-सत्यापित) पर लाइव गेट स्थिति के विरुद्ध मान्य किया गया था; कर्ज़ छुपाने के लिए कई "स्पष्ट" विलय सामने आए और हैं** नहीं** साफ़ ड्रॉप-इन.

- **`check:docs-sync` दो बार चलता है** — स्टैंडअलोन `lint` जॉब में और फिर `check:docs-all` (`docs-sync-strict`) और हस्की प्री-कमिट हुक के अंदर। ✅**DONE** — स्टैंडअलोन `lint` मंगलाचरण हटा दिया गया।
- **CVE स्कैनिंग** — ❌** एक साफ़ मर्ज NOT.** `audit:deps` वर्तमान नीति के तहत चेतावनी के रूप में उच्च सलाह की रिपोर्ट करते हुए, सभी पांच लॉकफ़ाइलों में महत्वपूर्ण सलाह और अपूर्ण ऑडिट को अवरुद्ध करता है; `check:vuln-ratchet` (osv) केवल _regression_ बनाम चेक-इन बेसलाइन पर विफल रहता है और आवश्यकता पड़ने पर लापता माप को अस्वीकार कर देता है। अलग-अलग शब्दार्थ — को छोड़ने से `audit:deps` पूर्ण महत्वपूर्ण गेट और स्वतंत्र पैकेज ऑडिट रसीदें खो देगा। दोनो रख लो।
- **चक्र का पता लगाना** — ✅**DONE** (#15159 G-01/G-02). यहां पुराने पाठ में `check:cycles` "हरा, क्यूरेटेड" गेट कहा गया है और इसे अवरुद्ध रखने को उचित ठहराया गया है क्योंकि `check:circular-deps` (dpdm) ने 91 चक्रों की सूचना दी है। वह हरा एक था** झूठा हरा** : `check:cycles` 5 उपनिर्देशिकाओं (450 फ़ाइलें) को स्कैन किया, केवल स्थिर `import|export … from` मिलान किया, और प्रत्येक `@/` और `@omniroute/open-sse/` विनिर्देशक को हटा दिया, इसलिए यह रेपो पर हावी होने वाले गतिशील-आयात + उपनाम चक्रों को नहीं देख सका। ठीक किया गया: गेट अब `src` + `open-sse` (5023 फ़ाइलें) पर चलता है, TypeScript AST से विनिर्देशक एकत्र करता है (इसलिए `import("…")` गिनती और टाइप-पोजीशन `typeof import("…")` नहीं करता है), और tsconfig `paths` को हल करता है। यह पाता है** 14** चक्र, 0 नहीं। क्योंकि 14 पहले से मौजूद चक्रों को एक गेट PR में तय नहीं किया जा सकता है, `check:cycles` अब एक है** शाफ़्ट** (`--ratchet`, `quality-baseline.json`, `direction: down` में सीलिंग `metrics.cycles.value = 14` ) — यह किसी भी _प्रतिगमन_ को रोकता है और गिनती केवल गिर सकती है। CI `npm run check:cycles:ratchet` चलाता है। जली हुई सवारी के साथ**A-01** . `check:circular-deps` (dpdm) व्यापक दूसरी राय के रूप में सलाहकार बना हुआ है।
- **जटिलता** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint चलना, ruleId द्वारा गिना जाता है ताकि चक्रीय + अधिकतम-रेखाएं और संज्ञानात्मक आधार रेखाएं स्वतंत्र रहें; स्थानीय `--update` के लिए व्यक्तिगत `check:complexity` / `check:cognitive-complexity` रहता है।
- **`/api` विरोधी मतिभ्रम** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` की एक FS सूची, openapi-routes + डॉक्स-प्रतीक अभी भी स्वतंत्र रूप से रिपोर्ट करते हैं; व्यक्ति स्थानीय रन के लिए बने रहते हैं।
- **`check:node-runtime` 11 नौकरियों में चलता है** — ⚠️** कम ROI.** प्रत्येक एक अलग धावक है और चेक < 1s है; प्रति-जॉब सस्ता गार्ड खोने के विरुद्ध कुल बचत ~ 10s। मंथन के लायक नहीं.
- **`typecheck:noimplicit:core` CI लिंट पर** — ✅** लिंट जॉब से हटा दिया गया** (सलाहकार `continue-on-error` था); अवरोधक प्रकार की सतह `typecheck:core` + `check:type-coverage` है। स्थानीय लिपि बरकरार रखी गई.

### पलटें / निर्णय लें (ऑपरेटर नीति)

- `check:openapi-security-tiers` (सलाहकार) — ❌**NOT साफ़-साफ़ फ़्लिप करने योग्य।** यह 0 से बाहर निकलता है लेकिन चेतावनी देता है कि `LOCAL_ONLY_API_PREFIXES` के अंतर्गत कई `traffic-inspector` मार्गों में `x-loopback-only: true` एनोटेशन का अभाव है। इसे लागू करने के लिए पहले उन एनोटेशन को `openapi.yaml` में जोड़ने की आवश्यकता है।
- `typecheck:noimplicit:core` (सलाहकार) — काफी हद तक अवरुद्ध `check:type-coverage` शाफ़्ट द्वारा सम्मिलित किया गया है। शाफ़्ट को पलटें या अनावश्यक दूसरे `tsc` पास को गिरा दें।
- `test:vitest:ui` (अब** अवरुद्ध** ) — पहले से मौजूद विफलताओं को `// #8618` ट्रैकिंग टिप्पणियों के साथ `vitest.config.ts` में स्पष्ट रूप से बाहर रखा गया है; नई असफलताएँ कार्य को विफल कर देती हैं।
- `check:secrets` (gitleaks, 3 प्रलेखित गलत-सकारात्मक पर जमे हुए शाफ़्ट को अवरुद्ध करना) — 0 तक पहुंचने के लिए 3 को अनुमति देता है, या सलाहकार को पदावनत करता है। ओवरलैप्स GitHub नेटिव सीक्रेट-स्कैनिंग + `check:public-creds`।
- `check:pr-evidence` (ब्लॉकिंग, ग्रेप्स पीआर-बॉडी गद्य) — उच्च गलत-सकारात्मक जोखिम; यदि हटा दिया जाता है तो कठोर नियम #18 प्रवर्तन कमजोर हो जाता है, इसलिए यह एक वास्तविक नीति कॉल है।
- `semgrep` (सलाहकार स्टैंडअलोन) — OWASP परिवारों के लिए CodeQL को ओवरलैप करता है; इसकी आधार रेखा को शाफ़्ट या ड्रॉप से तार दें।

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
