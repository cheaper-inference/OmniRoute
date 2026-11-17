# Quality Gates Reference (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

हा दस्तऐवज OmniRoute मधील सर्व CI गुणवत्ता गेट्ससाठी अधिकृत संदर्भ आहे.
यामध्ये प्रत्येक गेट, ते कशाची पडताळणी करते, ते कोणत्या CI जॉबमध्ये चालते, ते
रॅचेट बेसलाइन वापरते की उत्तीर्ण/अनुत्तीर्ण धोरण, आणि ते बिल्ड अवरोधित करते की केवळ सूचनात्मक आहे, याचे वर्णन केले आहे.

संक्षिप्त सारांश आणि अनुमतीसूची धोरणासाठी, `AGENTS.md` मधील
"Quality Gates & Ratchets" विभाग पहा. त्याच प्रणालीचे चिकित्सक मूल्यमापन, परिपक्वता वर्गीकरण आणि
साधन-स्वतंत्र प्रतिकृतीकरण योजना यांसाठी
[गुणवत्ता गेट मार्गदर्शिका](../ops/QUALITY_GATE_PLAYBOOK.md) पहा.

---

## गेट इन्व्हेंटरी आणि अंमलबजावणी प्रोफाइल

### उमेदवार प्रवेश

CI आणि क्वालिटी गेट्स वर्कफ्लो प्रत्येक एक स्थिर निर्णय उत्सर्जित करतात: `Gate / CI` आणि `Gate / Quality`. त्यांचे आवृत्ती केलेले प्रवेश धोरण आवश्यक किंवा सल्लागार म्हणून प्रत्येक अपस्ट्रीम नोकरीची गणना करते. लागू आवश्यक नोकरी यशस्वी होणे आवश्यक आहे: गहाळ, रद्द, वगळलेले, प्रलंबित आणि अज्ञात परिणाम PASS स्थापित करू शकत नाहीत. वैध दस्तऐवज-केवळ किंवा कॅटलॉग-केवळ वर्गीकरण कोड लेन लागू होऊ शकत नाही; मसुदा PR स्वीकृत उमेदवार नाही. `hotfix` लेबल पुरावा माफ करत नाही.

दोन्ही वर्कफ्लो PRs main/release शाखांमध्ये कव्हर करतात, `main` वर ढकलतात, मॅन्युअल डिस्पॅच आणि मर्ज-ग्रुप इव्हेंट्स. पुश, डिस्पॅच आणि मर्ज-ग्रुप पूर्ण निवड चालवा. `release/**` ला पुश केल्याने ते सुरू होत नाही (2026-10-18): प्रत्येक बदलाने आधीच त्याच्या PR वर मॅट्रिक्स चालवले आहे आणि विलीन केलेले संयोजन म्हणजे रिलीज-ग्रीनचे कार्य (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन). फोर्क्स आणि मर्ज गट नोकरीसाठी होस्टेड धावपटू वापरतात जे अन्यथा स्व-होस्ट केलेले धावपटू निवडतात; रोलआउट करण्यापूर्वी पुरेशी होस्ट केलेली क्षमता सत्यापित करणे आवश्यक आहे.

एक सामान्य PR जलद निवड चालवते. प्रवेश धोरणाच्या `full-code` आणि `full-code-e2e` लेन (E2E, इंटिग्रेशन, पॅकेज आर्टिफॅक्ट, Electron स्मोक, Bun SQLite, इकोसिस्टम आणि प्रोटोकॉल क्लायंट) फक्त मर्जिफाय क्यू ड्राफ्टवर किंवा पूर्ण रनवर चालतात: `gh workflow run ci.yml --ref <branch>`.

प्रत्येक JSON पावती चेक-आउट SHA, वर्कफ्लो रन आणि प्रयत्न ओळखते. CLI checkout/event SHA न जुळणे नाकारते. वर्कफ्लो चाचण्या पॉलिसी सदस्यत्वाला निर्णयाच्या नोकरीच्या `needs` सूचीशी जोडतात त्यामुळे नवीन किंवा काढलेली लेन शांतपणे अदृश्य होऊ शकत नाही. पावत्या त्यांचे स्वतःचे कार्यप्रवाह कव्हर करतात, प्रकाशन, उपयोजन किंवा विद्यमान सल्लागार स्कॅनरचे अंतर्गत भाग नाही. शाखेच्या नियमांमध्ये दोन्ही चेक नावे सक्रिय करणे हा एक वेगळा प्रशासकीय बदल आहे; या नोकऱ्या जोडणे स्वतःच एखाद्या शाखेचे संरक्षण करत नाही.

### रांग विलीन करा

`queue` लेबल Mergify रांगेला PR पाठवते (`.mergify.yml`). Mergify `mergify/merge-queue/` शाखेवर PR मसुदा उघडते, CI तेथे पूर्ण निवड चालवते आणि `Gate / CI`, `Gate / Quality` आणि `Merge integrity (changelog + generated skills)` पास झाल्यावर मूळ PR विलीन होते.

Mergify मसुद्याच्या वर्णनामध्ये त्याचा रांगेचा सारांश लिहितो आणि इतर ॲप्स देखील ते संपादित करू शकतात. अशा मसुद्यावरील `pull_request` `edited` इव्हेंट स्वतःचा समवर्ती गट (`-queue-edit-<run_id>`) घेतो त्यामुळे तो मसुद्याचा वास्तविक रन रद्द करू शकत नाही आणि तो गेट आणि मॅट्रिक्स वगळतो. फक्त `Merge integrity` अजूनही चालते. वगळलेल्या गेट जॉबमध्ये वेगळे चेक नाव आहे, कारण Mergify वगळलेले `Gate / CI` अयशस्वी चेक म्हणून वाचते आणि PR ला डेक्यू करते.

dequeue नंतर, पुश नेहमी PR विनंती करत नाही. त्यावर `@mergifyio queue` कमेंट करा.

### स्वीकृती रेड्यूसरमध्ये पुरावा राखून ठेवला

`scripts/quality/validate-release-acceptance.mjs` पुरवठा योजना आणि त्याचे प्रकटीकरण कमी करते; हे स्थापित करत नाही की योजनेत संपूर्ण प्रकाशन पाइपलाइन समाविष्ट आहे. त्याचे अहवाल स्पष्टपणे `releaseAcceptance: false` सेट करतात, जरी ती योजना `VERIFIED` असली तरीही. `release-acceptance.yml` वर्कफ्लो अजूनही शॅडो फिक्स्चर वापरतो, वास्तविक बिल्ड, पॅकेज, बूट किंवा प्रमोशन पावत्या नाही.

ठेवलेल्या पुराव्याची पडताळणी करण्यासाठी CLI `--evidence-root` आवश्यक आहे. फाइल्स `<evidence-root>/<artifact_id>/<member>` म्हणून सोडवल्या जातात आणि SHA-256 म्हणून हॅश केल्या जातात. पुराव्याशिवाय PASS रेकॉर्ड, गहाळ किंवा बदललेली फाइल, असुरक्षित मार्ग किंवा सिमलिंक सत्यापनास प्रतिबंध करते. गहाळ फाइल्स रिकाम्या यशस्वी लॉगच्या समतुल्य नाहीत. विद्यमान SHA/run/attempt चेक स्वतंत्र राहतात: जुळणारे बाइट्स एक शिळी पावती वाचवू शकत नाही. फाइल अखंडता अंमलबजावणीच्या सत्यतेचा किंवा आर्टिफॅक्ट प्रमोशनचा पुरावा नाही.

### स्टॅटिक स्कॅन इन्व्हेंटरी

आवृत्तीत एनपीएम-उर्फ इन्व्हेंटरी आणि स्टॅटिक-स्कॅन सदस्यत्व `config/quality/gate-manifest.json` मध्ये राहतात. स्क्रिप्टची नावे आणि `package.json` विरुद्ध अचूक आदेश प्रमाणित करण्यासाठी `npm run check:gate-manifest` चालवा; ऍडिशन्स, रिमूव्हल्स आणि कमांड ड्रिफ्ट स्थानिक हुक आणि CI मधील बदल-वर्गीकरण कार्य दोन्ही अयशस्वी होतात. उपनाम हे वर्कफ्लो जॉब, मॅट्रिक्स उदाहरण किंवा चाचणी केस नाही: ही संख्या बदलण्यायोग्य म्हणून सादर केली जाऊ नये.

निवडलेल्या उपनामांची अंमलबजावणी न करता त्यांची तपासणी करण्यासाठी `npm run quality:scan -- --list` किंवा `npm run quality:scan:fast -- --list` वापरा. धावपटू npm एंट्रीपॉईंटला आमंत्रित करतो, त्यामुळे त्याचा रनटाइम (जेथे कॉन्फिगर केलेला Bun सह) जतन केला जातो. मॅनिफेस्ट त्या प्रोफाईलच्या बाहेरील उपनाव रेकॉर्ड करतात जसे की स्वतंत्रपणे आवाहन केले जाते आणि केवळ-वाचनीय स्कॅन प्रोफाइलमध्ये देखभाल आदेश निषिद्ध आहेत.

हे प्रोफाइल फक्त स्टॅटिक स्कॅन कव्हर करतात. ते उत्पादन चाचण्या, कव्हरेज, पॅकेजिंग, बाह्य तपासण्या किंवा उमेदवाराची पूर्ण प्रकाशन स्वीकृती प्रमाणित करत नाहीत. वर्कफ्लो प्रवेश लिंक्ड `config/quality/admission-policy.json` आणि `scripts/quality/admission-verdict.mjs` वापरतो. प्रकाशन-निरीक्षक प्रोफाइल वेगळे राहतात; त्यांच्या लागू धनादेश आणि पावत्या स्वतंत्रपणे तपासा. `audit:deps`, उत्परिवर्तन-चाचणी निवड आणि भाषांतर तपासणीसह पूर्ण निरीक्षकांच्या स्थिर आदेश `config/quality/release-green-static-profile.json` मध्ये घोषित केले जातात. लोडर npm आदेशांना package.json आणि मॉडेल केलेल्या CI/Quality घोषणांच्या विरूद्ध प्रमाणित करतो; ते वितर्क म्हणून शेल टोकन कार्यान्वित करण्याऐवजी ड्रिफ्ट नाकारते. आवश्यक स्कॅनर SKIP/INCOMPLETE आउटपुट PASS स्थापित करू शकत नाही. प्रोफाइल त्याच्या बाह्य बहिष्कारांची नोंद करते आणि होस्ट केलेले कव्हरेज, चाचणी मॅट्रिक्स, पॅकेज किंवा उपयोजन पुरावे बदलत नाही. खाली दिलेली गद्य यादी एक संदर्भ आहे, गेट प्रत्यक्षात धावल्याचा पुरावा नाही.

स्क्रिप्ट `scripts/check/` (पॉलिसी गेट्स) आणि `scripts/quality/` (रॅचेट इंजिन) अंतर्गत राहतात. सत्याचा CI स्त्रोत `.github/workflows/ci.yml` आहे.

### PR फास्ट-पाथ रिलीज करा (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs वर CI पूरक आहे, `main` वर ढकलतो, गट पाठवतो आणि विलीन करतो. PRs पथ-फिल्टर केलेल्या जलद तपासण्या वापरतात. कायमस्वरूपी अक्षम केलेली डुप्लिकेट बिल्ड काढली गेली; वास्तविक build/package/boot धनादेश CI मध्येच राहतात. युनिट सूट आणि विटेस्ट फक्त CI (`Unit Tests (N/8)` आणि `Vitest`) मध्ये चालतात.

| नोकरी                                            | व्याप्ती                                                                                                      | अवरोधित करणे   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API डॉक्स रेफ आणि डॉक्स-सर्व                                                                   | होय            |
| `Fast Quality Gates`                             | कोड PRs; स्थिर तपासणी, टाइपचेक, डॅशबोर्ड टाइपचेक, प्रभावित युनिट चाचण्या, विसरलेल्या भावंड चाचण्या (सल्लागार) |
| `No new ESLint warnings`                         | कोड PRs; suppressions-जागरूक लिंट गार्ड                                                                       | होय, काट्यांसह |
| `Merge integrity (changelog + generated skills)` | नॉन-ड्राफ्ट PRs; चेंजलॉग आणि व्युत्पन्न कौशल्य सिंक                                                           | होय, काट्यांसह |

#### विसरलेले भावंड चाचण्या अहवाल

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` ची सल्लागार पायरी म्हणून चालते आणि चाचणी-प्रभाव नकाशाच्या मागे आयात निराकरणकर्ता पुन्हा वापरते. प्रत्येक बदललेल्या उत्पादन मॉड्यूलसाठी, जेव्हा उमेदवार चाचणी पुल-रिक्वेस्ट डिफमधून अनुपस्थित असते तेव्हा ते निर्धारक `changed module/symbol -> static consumer -> candidate sibling test` चेनचा अहवाल देते. मार्कडाउन सारांश आणि JSON परिणाम कोणत्याही ब्लॉकिंग रोलआउटपूर्वी कॅलिब्रेशनसाठी `forgotten-sibling-tests` वर्कफ्लो आर्टिफॅक्ट म्हणून राखून ठेवले आहेत.

बॅरल री-एक्सपोर्ट आणि डायनॅमिक इम्पोर्ट्स फक्त रिझोल्यूशन डायग्नोस्टिक्स आहेत; ते कधीही ब्लॉकिंग शोध तयार करत नाहीत. पुनरावलोकन केलेले अपवाद `config/quality/forgotten-sibling-allowlist.json` मध्ये राहतात. प्रत्येक एंट्रीने ग्राहक आणि उमेदवार चाचणीचे नाव दिले पाहिजे, एक विशिष्ट तर्क द्यावा आणि GitHub समस्या किंवा पुल विनंतीशी लिंक केली पाहिजे. विकृत एंट्री अयशस्वी बंद झाल्या. अपवाद हटवलेली उमेदवार चाचणी किंवा `.skip`/`.todo` जोडणारा फरक दाबू शकत नाही; प्रतिपादन कमकुवत करणे आणि इतर मास्किंग स्वतंत्रपणे ब्लॉक करणाऱ्या `check:test-masking` गेटच्या मालकीचे राहते.

### नोकरी: `lint`

प्रत्येक PR ते `main` वर चालते. अयशस्वी होण्यावर ब्लॉक्स विलीन होतात.

| स्क्रिप्ट (`npm run ...`)         | प्रमाणित करतो                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | अवरोधित करणे                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js आवृत्ती समर्थित श्रेणीमध्ये आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                      |
| `check:cycles`                    | सर्व `src/` + `open-sse/` मध्ये परिपत्रक आयात (AST-आधारित, tsconfig `paths` निराकरण). कोणतेही चक्र अस्तित्वात असताना बेअर 1 मधून बाहेर पडते ( #15281 पासून अयशस्वी-बंद) आणि SCCs ची यादी करते. जेव्हा संख्या `quality-baseline.json` — मध्ये `metrics.cycles` कमाल मर्यादा ओलांडते तेव्हा `check:cycles:ratchet` (काय CI चालते) ब्लॉक करते, `direction: down`, त्यामुळे ते फक्त पडू शकते (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय (रॅचेट)                              |
| `check:boundary`                  | `open-sse → src` कपलिंग: ॲपमध्ये इंजिनमधून अनन्य फाइल-टू-फाईल आयात (`scripts/quality/measure-boundary.mjs`; एज लिस्ट हा v4 core/module-split उपाय अनुशेष आहे). बेअर = सल्लागार अहवाल ( `quality:boundary` सारखाच). `check:boundary:ratchet` (काय CI चालते, `quality.yml` फास्ट-गेट्स रॅचेट लूपमध्ये देखील) ब्लॉक करते जेव्हा मोजणी `quality-baseline.json` — मध्ये `metrics.boundaryOpenSseToSrc` कमाल मर्यादा ओलांडते 771, `direction: down`; `--update` फक्त ते कमी करते; PRs वर बेस-रिलेटिव्ह (`--base-ref`, खाली पहा)                                                                                                                                                                                                                                                                                                                                                                                     | होय (रॅचेट)                              |
| `check:route-validation:t06`      | सर्व मार्गांवर Zod स्कीमा उपस्थित आहेत (टियर 6 धोरण)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | होय                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` संख्या बजेटपेक्षा जास्त नाही (टियर 11 कॅट्राका)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | होय                                      |
| `check:provider-consistency`      | `providers.ts` मधील प्रत्येक प्रदात्याकडे `providerRegistry.ts` मध्ये जुळणारी एंट्री आहे (आणि त्याउलट, अनुमत सूचीमध्ये)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                      |
| `check:model-lifecycle`           | तीन हाताने राखलेले राउटिंग टेबल चेक-इन केलेल्या लाइफसायकल स्नॅपशॉटशी सुसंगत राहतात (#11503): `FITNESS_TABLE` (`taskFitness.ts`) स्कोअर रिटायर्ड आयडी नाही जे `REGISTRY` रूट करू शकते; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` मध्ये उपस्थित आहे आणि सेवानिवृत्त-आयडी स्नॅपशॉटमधून अनुपस्थित आहे; `REGISTRY` मधील प्रत्येक सेवानिवृत्त आयडी `allowedRetiredInCatalog` मध्ये अग्रेषित किंवा सूचीबद्ध केला जातो; आणि त्या स्नॅपशॉटमध्ये कोणतेही `DEFAULT_DEGRADATION_MAP` स्त्रोत किंवा लक्ष्य निवृत्त झालेले दिसत नाही. हे सिद्ध करत नाही की मॉडेल सध्या थेट अपस्ट्रीमद्वारे सर्व्ह केले जात आहे. ऑफलाइन — `config/quality/model-lifecycle.json` शी तुलना करते, `npm run quality:refresh-model-lifecycle` सह हाताने रीफ्रेश केले जाते (नेटवर्क; CI मध्ये वायर्ड नाही). `allowedRetiredInCatalog` हे बर्न-डाउन रॅचेट आहे: फक्त ट्रॅकिंग समस्येसह एंट्री जोडा.                                              | होय                                      |
| `check:fetch-targets`             | क्लायंट-साइड `src/` मधील प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` वर निराकरण करते                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | होय                                      |
| `check:deps`                      | रेपोमधील प्रत्येक `package.json` मधील सर्व `npm install` -able डेप्स `dependency-allowlist.json` मध्ये आहेत; नवीन अनपिन केलेले किंवा स्लॉपक्वॅट केलेले पॅकेज फ्लॅग केले आहेत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | होय                                      |
| `audit:deps`                      | सर्व पाच स्वतंत्र लॉकफाईल्सचे npm ऑडिट (रूट, Electron, OpenCode प्लगइन v1/v2 आणि प्रदाता). गंभीर सल्ला ब्लॉक; उच्च सूचना दृश्यमान इशारे राहतात. Missing/failed ऑडिट INCOMPLETE आणि ब्लॉक आहेत; प्रति-स्कोप लॉक हॅश आणि अहवाल राखून ठेवले आहेत.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                      |
| `check:lockfile`                  | `package-lock.json` इंटिग्रिटी — https रेजिस्ट्री, इंटिग्रिटी हॅश, होस्ट ओव्हरराइड नाही                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                      |
| `check:licenses`                  | उत्पादन अवलंबनांसाठीSPDX परवाना अनुमत यादी                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | होय                                      |
| `check:tracked-artifacts`         | कोणतेही बिल्ड आर्टिफॅक्ट्स / कमिटेड `node_modules` सिमलिंक्स नाहीत (हस्की प्री-कमिटमध्ये देखील चालते; प्री-पुश हे जाणूनबुजून हलके — #6716 आहे)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                      |
| `check:ai-attribution`            | PR कमिट, शीर्षक किंवा बॉडी — हार्ड नियम #16 मध्ये कोणताही AI/bot `Co-Authored-By` ट्रेलर किंवा AI-जनरेशन #14436 नाही ( PR→ `release/**` — साठी `quality.yml` फास्ट-गेट्स लूपमध्ये इव्हेंट पेलोड वाचतो, नो `ci.yml` ऑफ PRs — `main` PR→ `commit-msg` -लेखकांना देखील परवानगी आहे;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | प्रत्येक Vitest वगळण्याला ट्रॅकिंग समस्येचे नाव दिले जाते आणि ते `config/quality/vitest-exclusions.json` (#13204) मध्ये दिसते                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                      |
| `check:file-size`                 | स्त्रोत फाइल्स (`.ts`/`.tsx` `src/` मध्ये , `open-sse/`, `electron/`, `bin/`) `cap` मध्ये राहतात आणि `testCap` मध्ये फाईल्स (`*.test.ts(x)`) चाचणी करतात ; `file-size-baseline.json` (`frozen` / `testFrozen`) मध्ये गोठवलेल्या फाईल्स त्यांच्या रेकॉर्ड केलेल्या आकारापेक्षा वाढू नयेत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                      |
| `check:error-helper`              | executors/handlers मधील त्रुटी प्रतिसाद `buildErrorBody()` / `sanitizeErrorMessage()` (कठीण नियम #12) वापरतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                      |
| `check:migration-numbering`       | स्थलांतर SQL फायली अनुक्रमे क्रमांकित आहेत, कोणतेही अंतर किंवा डुप्लिकेट नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                      |
| `check:public-creds`              | `publicCreds.ts` बाहेर कोणतीही शाब्दिक OAuth `client_id`/`client_secret` किंवा फायरबेस वेब की नाहीत (कठीण नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | होय                                      |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल्सच्या बाहेर रॉ SQL नाही; `localDb.ts` वरून बॅरल-आयात नाही (कठीण नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | होय                                      |
| `check:known-symbols`             | प्रदाता एक्झिक्युटर्स, राउटिंग स्ट्रॅटेजीज आणि त्यांच्या डिस्पॅच टेबलमध्ये नोंदणीकृत अनुवादक डिस्क — अनाथ किंवा अघोषित चिन्हे वरील फाइल्सशी जुळतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | होय                                      |
| `check:route-guard-membership`    | बाल प्रक्रियेला जन्म देणारा प्रत्येक मार्ग `isLocalOnlyPath()` (कठीण नियम #15/#17) द्वारे वर्गीकृत केला जातो.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                      |
| `check:test-discovery`            | रेपो मधील प्रत्येक `*.test.ts` / `*.spec.ts` फाइल किमान एका चाचणी धावपटूद्वारे संकलित केली जाते (रॅचेट: `test-discovery-baseline.json` मधील अनाथांची यादी फक्त लहान होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                      |
| `check:test-tla-order`            | `tests/unit` अंतर्गत कोणतीही `node:test` फाइल चाचणीची नोंदणी करत नाही, उच्च-स्तरीय `await` मारते, नंतर अधिक नोंदणी करते (#18045; ratchet: `test-tla-order-allowlist.json` फक्त संकुचित होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | होय                                      |
| `check:agent-skills-sync`         | व्युत्पन्न एजंट-कौशल्य कलाकृती त्यांच्या स्रोत कॅटलॉगशी जुळतात (कोणताही प्रवाह नाही). रिलीझ मोड प्रत्येक कौशल्य तपासतो; एक वैशिष्ट्य PR (`pr` मोड) केवळ कौशल्ये तपासते ज्याचा व्युत्पन्न केलेला मजकूर तो — संपादित करतो [व्युत्पन्न केलेल्या फाइल्स आणि व्युत्पन्न बेसलाइन](#generated-files-and-derived-baselines-written-at-release) पहा                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | प्रदाता logos/assets कडे रेकॉर्ड केलेली मूळ नोंद आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON कॉन्फिगरेशन फाइल्स पार्स करतात आणि रेपो लिंट नियमांचे समाधान करतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | त्रुटींशिवाय TypeScript संकलन (केवळ सल्लागार इशारे)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | होय                                      |
| `typecheck:noimplicit:core`       | कठोर `noImplicitAny` — अग्रेषित; अनेक पूर्व-अस्तित्वात असलेल्या कॉल साइटना अजूनही भाष्यांची आवश्यकता आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **सल्लागार** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` स्कोप टू `src/app/(dashboard)/**` (#7033) — `typecheck:core` च्या क्युरेटेड 27-फाइल अनुमत यादीमध्ये कोणताही डॅशबोर्ड TSX समाविष्ट नाही, आणि `next build` ते कधीही टाइप-तपासत नाही (`next.config.mjs` सेट करते `ignoreBuildErrors: true`), त्यामुळे अनाथ-आयडेंटिफायर रिग्रेशन्स तेथे (#6625/#6909CI होती. गोठवलेल्या per-file/per-TS-code काउंट बेसलाइनच्या विरुद्ध फरक (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` सारखाच शिळा-अंमलबजावणी नमुना) — बेसलाइन केलेल्या मोजणीच्या पलीकडे फक्त NEW त्रुटी गेट अयशस्वी करतात; पूर्व-अस्तित्वातील त्रुटी निश्चित केल्यावर `--update` सह रॅचेट डाउन करा.                                                                                                                                                                                                                                                                         | होय                                      |
| `check:build-typecheck`           | संपूर्ण ॲप उत्पादन प्रकार तपासा ओवर `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), पृष्ठभाग `typecheck:core` ची 27-फाइल अनुमत सूची आणि डॅशबोर्ड गेट कव्हर करत नाही. `config/quality/build-typecheck-baseline.json` विरुद्ध फरक; नवीन किंवा वाढलेली प्रति-(फाइल, कोड) गणना अयशस्वी होते, कमी संख्या तुम्हाला रॅचेट करण्यास सांगते. `--force-regressions` पास झाल्याशिवाय रनमध्ये नवीन किंवा वाढलेली जोडी असताना `--update` नकार देते आणि `--force-nocheck` पास झाल्याशिवाय नवीन सायलन्स केलेल्या फाईलला नकार देते, त्यामुळे हिरवा होण्यासाठी बेसलाइन रुंद करणे आणि कायमस्वरूपी शांतता मंजूर करणे ही दोन स्वतंत्र कृती आहेत. एक बेअर `--force` नाकारले आहे. `@ts-nocheck` विरुद्ध `config/quality/ts-nocheck-baseline.json` साठी बिल्ड स्कोप देखील स्कॅन करते, कारण ती वापरणारी फाइल कोणत्याही निदानाचा अहवाल देत नाही आणि अन्यथा प्रत्येक गेटसाठी अदृश्य असेल. | होय                                      |

#### दोन टाइपचेक प्रोग्राम वेगळ्या पद्धतीने उत्तर देतात

`typecheck:core` आणि `check:build-typecheck` वेगवेगळ्या पर्यायांतर्गत वेगवेगळे प्रोग्रॅम संकलित करतात आणि तीच फाइल एकामध्ये स्वच्छ आणि दुसऱ्यामध्ये त्रुटींनी भरलेली असू शकते.

`tsconfig.build.json` `"strict": false` सेट करते, म्हणून `noImplicitAny` बंद आहे. कोर कॉन्फिगरेशन कठोर पर्यायांसह क्युरेटेड 27-फाईल अनुमत सूची संकलित करते आणि प्रत्येक एंट्रीच्या आयात आलेखाचे अनुसरण करते, त्यामुळे बिल्ड प्रोग्राममध्ये कधीही न दिसणाऱ्या फाइल्स अजूनही तेथे तपासल्या जातात.

फाइल टाईप केली आहे की नाही हे ठरवताना परिणाम महत्त्वाचा आहे:** `check:build-typecheck` अंतर्गत शून्य निदानाचा अर्थ शून्य असा होत नाही** . 26 फाइल्समधून `@ts-nocheck` काढून टाकल्याने बिल्ड प्रोग्राममध्ये त्यापैकी 23 क्लीन दिसल्या; त्यापैकी सोळा मध्ये सुमारे 120 निहित-कोणत्याही त्रुटी आढळल्या. फाइल क्लीन कॉल करण्यापूर्वी दोन्ही तपासा.

### नोकरी: `quality-gate`

`test-coverage` मागे धावतो. अयशस्वी होण्यावर ब्लॉक्स विलीन होतात.

| स्क्रिप्ट                    | प्रमाणित करतो                                                                                                                                                | अवरोधित करणे            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `quality:collect`            | `quality-metrics.json` उत्सर्जित करते (ESLint चेतावणी संख्या, विलीन केलेल्या शार्ड अहवालाचे कव्हरेज)                                                         | होय (रॅचेटचा अपस्ट्रीम) |
| `quality:ratchet`            | `quality-baseline.json` मधील प्रत्येक मेट्रिक मागे गेला नाही (ESLint चेतावणी ≤ बेसलाइन; कव्हरेज ≥ बेसलाइन)                                                   | होय                     |
| `check:duplication`          | कोड डुप्लिकेशन (jscpd@4) `quality-baseline.json` मध्ये बेसलाइन ओलांडत नाही                                                                                   | होय                     |
| `check:complexity`           | फाइल-स्तरीय सायक्लोमॅटिक जटिलता कॅपपेक्षा जास्त नाही (कोर ESLint `complexity` + `max-lines-per-function`)                                                    | होय                     |
| `check:cognitive-complexity` | संज्ञानात्मक जटिलता रॅचेट (`eslint-plugin-sonarjs`) — वेगळे ESLint पास; CI दोन्ही एकल `check:complexity-ratchets` पायरी म्हणून विलीन केले जातात              | होय                     |
| `check:dead-code`            | न वापरलेली निर्यात / फायली रॅचेट (निप) बेसलाइन विरुद्ध मागे जात नाही                                                                                         | होय                     |
| `check:compression-budget`   | कॉम्प्रेशन बेंचमार्क बजेट — प्रति-इंजिन टोकन-बचत मजले मागे जाऊ नयेत                                                                                          | होय                     |
| `check:type-coverage`        | टक्के-टाइप केलेले रॅचेट (`type-coverage`) मागे जात नाही; मुख्यत्वे `typecheck:noimplicit:core` समाविष्ट करते                                                 | होय                     |
| `check:codeql-ratchet`       | ओपन CodeQL अलर्ट काउंट मागे जात नाही ( `gh api` द्वारे वाचले जाते; टोकनशिवाय ग्रेसफुल वगळा) — रिफ्रेश कॅडेन्स आणि मॅन्युअल ट्रिगर: खाली "CodeQL ratchet" पहा | होय                     |
| `check:type-scale-ratchet`   | किट प्रकार स्केल: 12 px अंतर्गत आकार आणि `src/` मध्ये `font-bold` फक्त खाली जातात (`typeScaleSubFloorSizes`, `typeScaleFontBold`); प्री-कमिट हुक मध्ये देखील | होय                     |

### नोकरी: `quality-extended`

मिश्रित जॉब, नो जॉब-लेव्हल `continue-on-error`: `--ratchet` पास करणारी पायरी `quality-baseline.json` विरुद्ध मोजलेल्या रिग्रेशनवर काम अयशस्वी करते. फक्त `check:circular-deps` आणि स्कॅनर इन्स्टॉल स्टेप सल्लागार आहेत (स्टेप-लेव्हल `continue-on-error: true`). बाह्य स्कॅनर `gh release download` द्वारे स्थापित केले जातात; gitleaks अनुपस्थित असताना `check:secrets` सेल्फ-स्किप (बाहेर पडा 0), तर `check:vuln-ratchet`, `check:workflows` आणि `check:openapi-breaking` अयशस्वी जेव्हा त्यांचे मोजमाप गहाळ होते तेव्हा बंद होते.

| स्क्रिप्ट                | प्रमाणित करतो                                                                                                                                                                                        | अवरोधित करणे                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | गोलाकार अवलंबित्व नाही (dpdm)                                                                                                                                                                        | **सल्लागार**                                        |
| `check:bundle-size`      | बंडलचा आकार टोपीपेक्षा जास्त नाही; एक न मोजता येणारा आकार देखील अयशस्वी होतो                                                                                                                         | **--ratchet सह अवरोधित करणे**                       |
| `check:secrets`          | बायनरी अनुपस्थित असल्यास गुप्त स्कॅनिंग (gitleaks) — वगळते                                                                                                                                           | **--ratchet सह अवरोधित करणे**                       |
| `check:vuln-ratchet`     | अवलंबित्व भेद्यता (ओएसव्ही-स्कॅनर) — `--ratchet` अयशस्वी होत नाही INCOMPLETE (बाहेर पडा 2) जर मोजलेले नसेल तर                                                                                        | **--ratchet सह अवरोधित करणे**                       |
| `check:workflows`        | वर्कफ्लो लिंट (ऍक्शनलिंट + zizmor); missing/broken स्कॅनर, अवैध अहवाल किंवा गहाळ रॅचेट बेसलाइन INCOMPLETE म्हणून अयशस्वी होतात. वैध निष्कर्ष निवडलेल्या strict/advisory/ratchet धोरणाचे अनुसरण करतात | अंमलबजावणी आवश्यक; CI मध्ये zizmor रॅचेट ब्लॉक करणे |
| `check:openapi-breaking` | पिन केलेल्या इव्हेंट कमिट विरुद्ध सार्वजनिक API करार (PR मर्ज-बेस, पुश आधी, मर्ज-ग्रुप बेस; scheduled/manual चेकआउट फर्स्ट पॅरेंट); आवश्यक मापन अयशस्वी बंद                                          | **--ratchet सह अवरोधित करणे**                       |

### नोकरी: `docs-sync-strict`

प्रत्येक PR ते `main` वर चालते. अयशस्वी होण्यावर ब्लॉक्स विलीन होतात.

| स्क्रिप्ट                      | प्रमाणित करतो                                                                                                                                               | अवरोधित करणे                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | मेटा-गेट जे अनुक्रमे खालील 6 उप-गेट्स चालवते                                                                                                                | होय                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI आवृत्ती सुसंगतता; रिलीझ मोड देखील 66 `llm.txt` मिरर आणि अनुवादित CHANGELOG विभाग (PR मोड: मिरर सहमत आहेत)                               | होय                               |
| ↳ `check:docs-counts`          | गद्यातील संख्या (प्रदाता संख्या, स्थलांतर संख्या इ.). दोन मोड: वैशिष्ट्य PRs वर `pr`, इतरत्र `release` — "व्युत्पन्न मूल्ये" पहा                            | होय                               |
| ↳ `check:env-doc-sync`         | `.env.example` मधील प्रत्येक env var हे डॉक्स टेबलमध्ये दस्तऐवजीकरण केले जाते आणि त्याउलट                                                                   | होय                               |
| ↳ `check:deprecated-versions`  | डॉक्समध्ये नापसंत आवृत्ती स्ट्रिंग नाहीत                                                                                                                    | होय                               |
| ↳ `check:doc-links`            | दस्तऐवजातील अंतर्गत मार्कडाउन दुवे वास्तविक फाइल्सचे निराकरण करतात (`[text]`/`(path)` फॉर्म)                                                                | होय                               |
| ↳ `check:fabricated-docs`      | कोडबेसमध्ये मार्ग, env vars, CLI कमांड्स, हुक नेम्स आणि डॉक्समध्ये उद्धृत केलेले फाइल पथ अस्तित्वात आहेत. `--strict` द्वारे हार्ड गेट; ध्वजशिवाय सॉफ्ट-फेल. | होय ( `--strict` द्वारे CI मध्ये) |
| `check:cli-i18n`               | CLI `t()` की `bin/cli/locales/en.json` (दोन्ही मोड) मध्ये अस्तित्वात आहेत; pt-BR / zh-CN / zh-TW पॅरिटी फक्त रिलीज मोडमध्ये `en.json` सह                    | होय                               |
| `check:openapi-coverage`       | OpenAPI spec मध्ये वास्तविक मार्गांचा किमान एक रॅचेटेड मजला समाविष्ट आहे                                                                                    | होय                               |
| `check:openapi-security-tiers` | `openapi.yaml` मधील सुरक्षा स्तरावरील भाष्ये `routeGuard.ts` वर्गीकरणाशी सुसंगत आहेत                                                                        | **सल्लागार**                      |
| `check:openapi-routes`         | `openapi.yaml` मधील प्रत्येक मार्ग वास्तविक `route.ts` (विभ्रमविरोधी) साठी निराकरण करतो                                                                     | होय                               |
| `check:docs-symbols`           | `docs/**/*.md` मधील प्रत्येक `/api/...` संदर्भ वास्तविक `route.ts` (अँटी-हॅल्युसिनेशन) वर निराकरण करतो                                                      | होय                               |
| `i18n translation drift`       | `docs/i18n/**` मिरर वि `.i18n-state.json` — PRs वर सल्लागार (अनुवाद लहरीद्वारे आरसे ताजे होतात), पुशवर कठोर आणि रात्री                                      | **सल्लागार** PRs                  |

#### ट्रान्सलेशन मिरर व्युत्पन्न केलेल्या फायली आहेत (PR मोड वि रिलीज मोड)

वैशिष्ट्य PR केवळ इंग्रजी स्रोत संपादित करते. `docs/i18n/<locale>/**` मिरर (66 `llm.txt` प्रती आणि अनुवादित `CHANGELOG.md` फायलींसह) आणि `.i18n-state.json` भाषांतर लहरी (`docs/i18n-*` / `chore/i18n-*` शाखा, अनुसूचित `i18n-mirror-refresh.yml`) आणि प्रकाशन (`npm run release:sync-changelog-i18n`) द्वारे एका चरणात पुनर्लेखन केले जातात. त्यामुळे मिरर गेट्स दोन मोडमध्ये चालतात, `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, नंतर `OMNIROUTE_GATE_MODE`, नंतर क्रिया इव्हेंट; स्थानिक रन `release` आहे):

- `check:docs-sync` — release mode runs every check. PR mode keeps the package.json/OpenAPI version, the root CHANGELOG headings and the superseded-docs guard, and prints `SKIP reason=pr-mode` for the `llm.txt` mirror copies and the translated CHANGELOG sections — unless the PR writes mirrors: a head branch declared as a writer of the `docs/i18n/**` family in `config/quality/derived-paths/*.json` runs both checks strictly, and, when the diff base resolves, a change whose own diff edits `docs/i18n/<locale>/llm.txt` or `CHANGELOG.md` runs that check strictly. The diff base does not resolve in a depth-1 checkout (the `docs-sync-strict` job), so PR mode also runs one check that needs no base: every `llm.txt` mirror must exist, keep its `---` separator and carry either the root body or the body most mirrors share. A base that moved leaves all mirrors equally stale and passes; a hand edit to one mirror fails. The translated `CHANGELOG.md` files have no such check in a depth-1 PR checkout.
- प्री-कमिट हुक `check-docs-sync.mjs --mode=pr` चालवते: कमिट काय करते यावर न्याय केला जातो. फ्लॅग शिवाय लोकल रन हा रिलीझ मोड असतो आणि रूट `llm.txt` संपादित करणारा एक विलीन केलेला PR लाट रन होईपर्यंत प्रत्येक नंतरच्या कमिटला त्या बेसवर ब्लॉक करेल. हस्की हुक चालवणाऱ्या कोणत्याही मोड-अवेअर गेटसाठी हाच नियम आहे: हुक `--mode=pr` पास करतो आणि कठोर निर्णय रिलीझ-मोड रनसह राहतो (रिलीझ PR, `main` कडे ढकलतो, एक साधा लोकल रन).
- मिरर-सामग्री युनिट चाचण्या (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — रिलीझ मोड प्रत्येक लोकॅलवर दावा करतो. PR मोड `.i18n-state.json` (संपूर्ण-फाइल हॅश, किंवा चाचणी पिन विभागातील रेकॉर्ड केलेले सेक्शन हॅश) नुसार इंग्रजी स्त्रोतासह चालू असलेल्या आरशांनाच ठासून देतो आणि कारणास्तव शिळ्यांना वगळतो. `target_hash` प्रोव्हेन्स चेक प्रत्येक लोकेलसाठी दोन्ही मोडमध्ये चालते. ताजेपणा प्रति `## ` विभाग आहे, युनिट `run-translation.mjs` हॅश; एक लांब विभाग (या फाईलची गेट इन्व्हेंटरी सुमारे अर्धी आहे) म्हणजे त्यातील कोणतेही संपादन ते आरसे शिळे सोडते आणि त्यांचे पीआर-मोड विधान पुढील लहरीपर्यंत वगळले जाते. इंग्रजी स्त्रोतामध्ये यापुढे नसलेला अँकर संपूर्ण-फाइलच्या तुलनेत परत येतो.
- `i18n translation drift` — PRs वर सल्लागार, पुशवर कठोर, नाईटली आणि रिलीझ कट, त्यामुळे शिळा मिरर रिलीजमध्ये पाठवू शकत नाही.

`scripts/i18n/sync-llm-mirrors.mjs` ( `syncLlmMirrors()` म्हणून देखील निर्यात केले जाते, `--dry-run` सह) `llm.txt` मिरर पुन्हा लिहितो; रिलीझ रिफ्रेश, ट्रान्सलेशन वेव्ह आणि शेड्यूल केलेले `i18n-mirror-refresh.yml` ते चालवतात (रिफ्रेश ड्राय रनसह शिळा `llm.txt` मिरर शोधतो, कारण ड्रिफ्ट रिपोर्ट त्यांची यादी करत नाही आणि `check:docs-all` आधी समक्रमित करतो).

`docs/diagrams/` अंतर्गत बारा README SVGs व्युत्पन्न केले जातात (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ते सर्व पुन्हा निर्माण करते). प्रत्येकाची बाइट-तुलना युनिट चाचणी असते (`tests/unit/docs/readme-*-svg.test.ts`, जॉब `test-unit`) जी रिलीझ मोडमध्ये वचनबद्ध फाइल शिळी असताना अपयशी ठरते; PR मध्ये, `check:generated-artifacts` एक SVG PR संपादनांचा न्याय करतो आणि बेसचा ड्रिफ्ट रिलीज रिफ्रेश करण्यासाठी सोडला जातो ( [जनरेट केलेल्या फायली आणि व्युत्पन्न बेसलाइन](#generated-files-and-derived-baselines-written-at-release) पहा) — आणि `check:docs-counts` त्यांच्या `<text>` नोड्स — वरून कॅनॉनिकल नंबर वाचतात ज्यामुळे बाह्यरेखा stqp फाईल प्रत्येक आउटलाइन `<text>` मध्ये ठेवते. SVG कॅनॉनिकल-नंबर चेक `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, प्लस `public/images/tier-flow-dark.svg` आणि `tier-flow-light.svg` मध्ये सूचीबद्ध केलेल्या फाइल्स वाचतो; फ्री-एव्हर, कॅटलॉग-एंट्री, आवर्ती-पूल आणि स्कोअरिंग-फॅक्टर्सचे दावे `promise-pillars.svg`, `free-tier-budget.svg` आणि `strategies-grid.svg` देखील वाचतात. हे जनरेटर काढतात (प्रदाता टोटल, MCP टूल्स, राउटिंग स्ट्रॅटेजीज, फ्री-एव्हर प्रदाते, …) फॅक्ट स्नॅपशॉट `docs/reference/derived-facts.json` द्वारे `scripts/docs/readmeFacts.mjs` मधून येतात, शाब्दिक मधून नाही, त्यामुळे कोणत्याही शाखेवर आकृती पुन्हा तयार केल्याने वचनबद्ध फाइलचे पुनरुत्पादन होते. `free-tier-budget.svg` त्याच स्नॅपशॉटमधून त्याच्या पंक्ती काढते (`code.freeTierBudget`, कॅटलॉग सारांश तथ्य तपासणी रेकॉर्ड), त्यामुळे `FREE_MODEL_BUDGETS` मध्ये बदल CI लाल होण्याऐवजी पुढील रिफ्रेशवर कार्डवर पोहोचतो.

### व्युत्पन्न मूल्ये: `pr` आणि `release` गेट मोड

वैशिष्ट्य PR कधीही मूल्य लिहित नाही जे त्याच्या बेसच्या स्थितीवर अवलंबून असते: प्रदाता, स्थलांतरण, MCP-टूल आणि धोरण संख्या, README SVG संख्या, तथ्ये स्नॅपशॉट. एक पायरी त्या सर्वांची पुनर्गणना करते, `npm run release:refresh-derived`, रिलीझद्वारे चालविली जाते आणि रात्रीच्या वेळी व्युत्पन्न-रिफ्रेश PR. तर** रिलीझ दरम्यान बेस डिझाइननुसार थेट कोडच्या मागे आहे** , आणि एक गेट किंवा चाचणी जी लाइव्ह कोडशी झाडाची तुलना करते ती प्रत्येक PR वर लाल असेल. त्यामुळे व्युत्पन्न मूल्यांचा न्याय करणारे गेट्स दोनपैकी एका मोडमध्ये चालतात, `scripts/check/lib/gateMode.mjs` (पहिला सामना जिंकणे):

1. कमांड लाइनवर `--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` पर्यावरण व्हेरिएबल (`pr` किंवा `release`);
3. स्वयंचलित, GitHub क्रिया इव्हेंटमधून: एक `pull_request` ज्याचे डोके `release/v*` नाही , `merge_group`, किंवा `omni-queue/**` → `pr` वर पुश; बाकी सर्व काही (पुश, शेड्यूल, डिस्पॅच, रिलीज PR `release/v* → main`, कोणतीही लोकल रन) → `release`.

प्रत्येक मोडमध्ये काय `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) अयशस्वी होते:

| मोड       | अपयशी ठरते                                                                                                                                                                                                                                                                                                                                                                                                                 | जिवंत तथ्ये हवी आहेत |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `release` | प्रत्येक तपासणी, झाडापासून गोळा केलेल्या तथ्यांविरुद्ध कठोर समानता (गेटची नेहमीच वागणूक): एक शिळा संख्या, आवृत्ती, कव्हरेज फ्लोअर किंवा SVG नंबर एक STRICT ड्रिफ्ट आहे                                                                                                                                                                                                                                                     | होय                  |
| `pr`      | फक्त जे बदल केले ते PR बेसच्या विरूद्ध समान हक्क एक्स्ट्रॅक्टर्ससह भिन्न होते: (1) एक व्यवस्थापित मूल्य जे त्या चेक आणि फाइलच्या बेसमध्ये अस्तित्वात नव्हते ("PR व्यवस्थापित क्रमांक संपादित केला — मूळ मजकूरावर ओळ पुनर्संचयित केली"); (2) एक आवश्यक दावा बेस वाहून नेला आणि डोके गमावले. सामग्री अपरिवर्तनीय ज्यांना कोणत्याही तथ्यांची आवश्यकता नाही ते प्रकाशन मोडमध्ये चालतात; फक्त-रिलीज चेक सूचीबद्ध आणि वगळले आहेत | नाही                 |

एजंट-सूचना फाइल्स घेऊन जातात** नाही** व्युत्पन्न संख्या अजिबात: `AGENTS.md`, `llm.txt` (आणि त्याच्या `docs/i18n/*/llm.txt` प्रती), bs `AGENTS.md` काटा, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` आणि प्रत्येक `skills/*/SKILL.md` स्त्रोताकडे निर्देश करतात (उदाहरणार्थ `src/shared/constants/routingStrategies.ts` मध्ये `ROUTING_STRATEGY_VALUES` ) आणि त्याऐवजी `npm run facts`. अपरिवर्तनीय "व्युत्पन्न संख्या नाही (एजंट-सूचना फाइल …)" तेथे दोन्ही मोडमध्ये (प्रदाते, स्थलांतर, MCP टूल्स आणि स्कोप, राउटिंग स्ट्रॅटेजीज, स्कोअरिंग घटक, मोड पॅक) अयशस्वी होते, त्यामुळे रिलीझ रिफ्रेशला कधीही इन्स्ट्रक्शन फाइल पुन्हा लिहावी लागत नाही.

`pr` मोडमध्ये लेखक शाखा व्यवस्थापित मूल्ये संपादित करू शकतात: `chore/derived-*` (रात्रीचे रिफ्रेश PR), `release/v*`, आणि भाषांतर लहरी `docs/i18n-*` आणि `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). रांगेतील बॅचेस (`merge_group`, Mergify ड्राफ्ट्स, `omni-queue/**`) पुन्हा ठरवले जात नाहीत: ते गेटची PRs एक-एक करून ठरवतात.

Exit codes: `0` clean · `1` STRICT drift (or soft drift with `--strict`) or a managed-value violation · `2` infrastructure — the code facts could not be collected (the tsx probe failed or timed out; the timeout is `OMNIROUTE_FACTS_TIMEOUT_MS`, default 600000 ms) or, in CI, the PR diff base could not be resolved. An exit 2 is never a documentation divergence: re-run the job or fix the environment.

प्रत्येक मोड कुठे चालतो:

| कुठे                                                                                        | मोड                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| वैशिष्ट्य PR — `ci.yml` जॉब `docs-sync-strict`, `quality.yml` पायरी "दस्तऐवज अचूकता"        | `pr` (स्वयंचलित); नोकरी `BASE_SHA` म्हणून बेस पास करते आणि `fetch-depth: 2` सह चेक आउट करते                                                                                            |
| `merge_group`, `omni-queue/**` उमेदवार, मर्ज ट्रेनची पूर्ण गेट यादी                         | `pr`                                                                                                                                                                                   |
| PR (`release/v* → main`), पुश, शेड्यूल्ड आणि मॅन्युअल रन सोडा                               | `release`                                                                                                                                                                              |
| रिलीज-हिरवा (`scripts/quality/validate-release-green.mjs`)                                  | HARD आयटम `OMNIROUTE_GATE_MODE=pr` सह चालतात ("बेस तुटला का?"); DRIFT आयटम `derived-refresh` `npm run release:refresh-derived -- --check` चालवते (कठोर दृश्य, बेस-लाल कधीही उघडत नाही) |
| रिलीज (`/generate-release` फेज 0a आणि 1; कौशल्य वायरिंग हा वेगळा मालक-मंजूर बदल आहे)        | `npm run release:refresh-derived` व्युत्पन्न फाइल्स लिहितो; रिलीझ PR चे स्वतःचे चेक नंतर `release` मोडमध्ये चालतात                                                                     |
| `nightly-derived-refresh.yml` (दैनिक, सर्वोच्च `release/vX.Y.Z`, रिलीझ-फ्रीझ अंतर्गत वगळले) | `npm run release:refresh-derived -- --profile=nightly`; फरकावर ते `chore/derived-refresh` वरून ONE PR उघडे ठेवते; कधीही विलीन होत नाही                                                 |

त्यामागील आज्ञा:

- `npm run facts` प्रत्येक व्युत्पन्न संख्या JSON (`scripts/release/facts.mjs`) म्हणून मुद्रित करते. `--key=code.mcpTools` एक मूल्य मुद्रित करते, `--snapshot` थेट वृक्षाऐवजी वचनबद्ध स्नॅपशॉट वाचतो. जेव्हा तथ्ये गोळा करता येत नाहीत तेव्हा 2 मधून बाहेर पडा.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) recomputes the derived files in one pass, in this order (step ids for `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (the snapshot), `numbers` (the counts gate's rewrite plan applied to the docs, then carried to their `docs/i18n/` mirrors), `readme-diagrams`, `skills` (generated `SKILL.md`), `e2e-timings` (skipped until the tree ships `syncE2eTimings`), `ui-keys` (prunes keys `en.json` dropped and, with `--rewritten-since=<ref>` — default `origin/main` — re-queues English values rewritten since the last release), `llm-mirrors` and `verify-generated` (after a write, `check:generated-artifacts` and `check:agent-skills-sync` in release mode must pass; skipped in `--check` and when `--only` leaves it out; a failure is exit 2). The `changelog` step is opt-in (`--with-changelog`, release profile only). `--profile=nightly` never touches a version claim. With `-- --check` it writes nothing and exits 1 when any file would change or a managed value needs a manual edit (listing both); exit 2 on an infrastructure failure. `--json` prints the result as JSON.
- `docs/reference/derived-facts.json` हा शेवटचा रिफ्रेश वापरलेल्या तथ्यांचा स्नॅपशॉट आहे. फक्त रिफ्रेश लिहितो. README SVG जनरेटर ते वाचतात आणि PR-टाइम युनिट चाचण्या वचनबद्ध दस्तऐवज आणि जनरेट केलेल्या फाइल्सची तुलना — कधीही थेट कोडसह करतात. सूटची एकल थेट तुलना `tests/unit/check-docs-counts-sync.test.ts` मध्ये "रिलीझ रिफ्रेश चक्र बंद करते" अशी आहे: थेट तथ्यांसह, मेमरीमध्ये लागू केलेल्या रीफ्रेशच्या पुनर्लेखनाच्या योजनेत कोणताही STRICT ड्रिफ्ट नाही तो अहवाल देत नाही आणि पुनर्नियोजनामुळे काहीही बदलत नाही.

स्थानिकरित्या पुनरुत्पादित करण्यासाठी (एक स्थानिक रन डीफॉल्ट `release` वर):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

निराकरण करण्यायोग्य बेसशिवाय ( `BASE_SHA`/`BASE_REF` नाही, स्थानिक `origin/release/v<version>` नाही) स्थानिक `pr` रन चेतावणी प्रिंट करते आणि अयशस्वी होण्याऐवजी भिन्नता वगळते.

### नोकरी: `i18n-ui-coverage`

| स्क्रिप्ट                         | प्रमाणित करतो                                                                                                                                                                    | अवरोधित करणे           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n की कव्हरेज ≥ 65% आहे                                                                                                                                                     | होय (दोन्ही मोड)       |
| `check:ui-icu`                    | प्रत्येक UI कॅटलॉगचा प्रत्येक संदेश `IntlMessageFormat` सह संकलित केला जातो                                                                                                      | होय (दोन्ही मोड)       |
| `check-ui-value-drift` (इनलाइन)   | पुन्हा लिहिलेले इंग्रजी** मूल्य** कोणतेही शिळे भाषांतर मागे ठेवत नाही                                                                                                            | होय (फक्त प्रकाशन मोड) |
| `check-new-key-coverage` (इनलाइन) | ए** नवीन** इंग्रजी की प्रत्येक लोकॅलमध्ये अनुवादित केली जाते — a `__MISSING__:` मार्कर नाकारला जातो                                                                              | होय (फक्त प्रकाशन मोड) |
| `check-key-completeness` (इनलाइन) | प्रत्येक UI कॅटलॉग (आणि, `--catalog=cli` सह, प्रत्येक CLI कॅटलॉग) त्याच्या `en.json` चा मुख्य संच असतो; `pr` मोडमध्ये, प्रत्येक कॅटलॉग PR मर्ज बेसवर स्वतःच्या विरूद्ध बदलला     | होय (दोन्ही मोड)       |
| `check-translation-ratio`         | प्रति लोकॅलचे वास्तविक-अनुवाद गुणोत्तर (एकसारखे-इंग्रजी / प्लेसहोल्डर / अनुमती यादीबाहेरची पाने गहाळ) `config/quality/i18n-translation-baseline.json` + slack पेक्षा जास्त नसावी | होय (फक्त प्रकाशन मोड) |

व्हॅल्यू-ड्रिफ्ट गेट मर्ज बेसच्या विरूद्ध `fetch-depth: 0` — `en.json` आहे.

**दोन मोड (२०२६-११-१३ पासून).** एक वैशिष्ट्य PR `en.json` (आणि `bin/cli/locales/en.json`) मध्ये की जोडते किंवा पुनर्लेखन करते आणि इतर कोणत्याही लोकेलला स्पर्श करत नाही; `check:pr-derived-paths` (नोकरी `pr-test-policy`, फॅमिली `config/quality/derived-paths/translation.json`) PR चे वैशिष्ट्य अयशस्वी होते. इतर लोकॅल्स `release:refresh-derived` द्वारे प्रति रिलीझ एकदा पूर्ण केल्या जातात, ज्याला `scripts/i18n/sync-ui-keys.mjs` मध्ये `syncUiKeys()` म्हणतात (गहाळ की जोडा, सोडलेल्या की छाटणे, `rewrittenSinceRef` सह पुन्हा लिहिलेल्या इंग्रजीचे भाषांतर चिन्हांकित करा, भाषांतर करा), किंवा भाषांतर लहरीद्वारे. गेट्स `scripts/check/lib/gateMode.mjs` वरून मोड वाचतात: `pr` मोडमध्ये (वैशिष्ट्य PRs, `merge_group`, `omni-queue/**`) वरील रिलीज-मोड गेट्स प्रिंट `SKIP reason=pr-mode` आणि बाहेर पडा 0; `release` मोडमध्ये (रिलीझ PR, `main`, `workflow_dispatch`, लोकल रनवर ढकलले जाते) ते पूर्वीप्रमाणेच कडक असतात आणि PR रिलीझवर डिफ-अवेअर असलेल्यांना `BASE_REF=origin/main` मिळते, म्हणून ते सायकल जोडलेल्या किंवा पुन्हा लिहिलेल्या प्रत्येक कीचा न्याय करतात. `--mode=pr` सह स्थानिक पातळीवर वैशिष्ट्य-PR निकालाचे पूर्वावलोकन करा.

PR जो अजूनही `pr` मोडमध्ये लोकॅल कॅटलॉग बदलतो (एक भाषांतर लहर, रिलीझ रिफ्रेश, केवळ भाषांतर निराकरण) वगळले जात नाही: `check-key-completeness` विलीन बेस (`scripts/i18n/lib/touched-catalogs.mjs`) वर त्याच कॅटलॉगच्या विरूद्ध बदललेल्या प्रत्येक कॅटलॉगचा न्याय करतो आणि कॅटलॉग हरवलेल्या कीवर अपयशी ठरतो, की `en.json` `__MISSING__:` बदलते किंवा वास्तविक मजकूर किंवा marzf मध्ये बदलते. असे मूल्य जे यापुढे PR स्पर्श न केलेल्या इंग्रजी स्ट्रिंगच्या placeholders/tags इंटरपोलेट करत नाही. PR मधील नवीन कॅटलॉगमध्ये संपूर्ण `en.json` की संच असणे आवश्यक आहे. हे कॅटलॉगसाठी PR स्पर्श करते, गुणोत्तर आणि CLI-पॅरिटी गेट्स काय पाहतील हे समाविष्ट करते.

लोकेल-पॅरिटी युनिट चाचण्या (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` द्वारे समान मोड फॉलो करतात: `pr` मोडमध्ये ते की-पॅरिटी प्रतिपादने वगळतात आणि रिलीजवर सोडतात ज्यांचे इंग्रजी विलीनीकरण बेसपासून बदलले आहे त्यांची प्लेसहोल्डर पॅरिटी रीफ्रेश केली जाते (प्रत्येक की जेव्हा यूनिट वाचते तेव्हा जॉब तपासू शकत नाही). तो मदतनीस आहे** फक्त** मंजूर मोड-सशर्त वगळा: `check:test-masking` `.skip(` आणि `{ skip: true }` मोजते परंतु ते परत केले जाणारे संगणित `{ skip: "<reason>" }` नाही, म्हणून `tests/unit/locale-parity-mode.test.ts` वापरण्यासाठी परवानगी असलेल्या चाचण्यांची सूची पिन करते — त्या सूचीमध्ये एक पुनरावलोकन केलेले संपादन आहे.

#### `check-ui-value-drift` — शिळा-अनुवाद गेट

एक i18n रीग्रेशन पकडते जे इतर गेट्स संरचनात्मकदृष्ट्या पाहू शकत नाहीत: इंग्रजी मूल्य पुन्हा लिहिले जाते आणि _पूर्वी_ इंग्रजीमधून काढलेले भाषांतर मागे राहतात, त्यामुळे गैर-इंग्रजी वापरकर्ते आत्मविश्वासाने-शब्दयुक्त, आता-चुकीची कॉपी वाचत राहतात.

हे वास्तविक साठी पाठवले. जेव्हा Antigravity लॉगिन मदतनीस उतरला तेव्हा `oauthModal.googleOAuthWarning` पुन्हा लिहिला गेला (#5203);** 43 पैकी 39 लोकल** ऑपरेटरला "संपूर्ण URL कॉपी करा आणि खाली पेस्ट करा" — मजकूर ठेवला जो त्या प्रदात्यासाठी पूर्ण होऊ शकत नाही. #8463 पर्यंत हे कोणाच्या लक्षात आले नाही कारण:

- `sync-ui-keys` फक्त बॅकफिल की आहेत** अनुपस्थित** , जे कधीच नाहीत** शिळा** ;
- `check-ui-keys-coverage` की _उपस्थिती_ मोजते, त्यामुळे शिळे भाषांतर कव्हर केले जाते;
- `check-translation-drift` `docs/i18n/<locale>/**.md` डॉक्युमेंटेशन मिरर — चा मागोवा घेते ते कधीही `src/i18n/messages/*.json` वाचत नाही. हे जॉब `docs-sync-strict` मध्ये चालते: PRs वर सल्लागार, पुशवर कठोर आणि रात्री; भाषांतर लहर मिरर रीफ्रेश करते, वैशिष्ट्य PR नाही.

**फरक-जागरूक, बेसलाइन-बॅक्ड नाही.** हे मर्ज बेसवर `en.json` तुलना कार्यरत झाडाशी करते; प्रत्येक कीसाठी ज्याचे इंग्रजी मूल्य बदलले आहे, कोणतीही लोकॅल अद्याप अस्पृश्य भाषांतर धारण करणारी आहे. हे मुद्दाम** आधीच अस्तित्वात असलेले कर्ज गोठवते** — a diff हे दीर्घकालीन भाषांतर कोणत्या जुन्या इंग्रजीतून आले आहे हे उघड करू शकत नाही, म्हणून गेट फक्त वर्तमान बदल कशाला स्पर्श करतो हे ठरवतो. पर्यायी (प्रति-की हॅश बेसलाइन) साठी ~ 600 KB व्युत्पन्न केलेल्या फाइलची किंमत असेल, 3 × सर्वात मोठी विद्यमान आधाररेखा, प्रत्येक i18n PR वर मंथन होईल.

त्याचे समाधान करण्याचे दोन मार्ग:

1. प्रभावित भाषांतरे अद्यतनित करा, किंवा
2. रनटाइममध्ये त्यांना `__MISSING__:<new english>` — वर सेट करा नंतर दुरुस्त केलेले इंग्रजी (`src/i18n/request.ts::deepMergeFallback`, #7258) आणि भाषांतरासाठी मुख्य रांग देतात.

जर स्ट्रिंग असेल** अर्थ** बदलले, पसंत करा** की चे नाव बदलत आहे** : नवीन की जुन्या भाषांतराचा वारसा घेऊ शकत नाही. तो नमुना #8463 वापरला आहे.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

जेव्हा बेस कॅटलॉग वाचता येत नाही तेव्हा `SKIP reason=base-unresolved` सह 0 मधून बाहेर पडते (बेस रेफशिवाय उथळ क्लोन), मिररिंग `check-openapi-breaking`. फक्त रिलीझ मोड: एक वैशिष्ट्य PR इंग्रजी पुन्हा लिहितो आणि तिथेच थांबते; रिलीझ रिफ्रेश हे मागे सोडलेले भाषांतर चिन्हांकित करते (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, समान `findStaleTranslations`).

### नोकरी: `i18n`

पूर्ण i18n प्रमाणीकरण मॅट्रिक्स (प्रति लोकेल एक काम). संपूर्ण काम सल्लागार आहे.

| स्क्रिप्ट                       | प्रमाणित करतो               | अवरोधित करणे                                             |
| ------------------------------- | --------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | प्रति लोकेल भाषांतर पूर्णता | **सल्लागार** (संपूर्ण कामावर `continue-on-error: true` ) |

### नोकरी: `pr-test-policy`

फक्त पुल विनंत्यांवर चालते.

| स्क्रिप्ट              | प्रमाणित करतो                                                                                                                                        | अवरोधित करणे |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | PRs जे उत्पादन कोड `src/`, `open-sse/`, `electron/` किंवा `bin/` मध्ये बदलतात त्यात चाचण्या समाविष्ट करणे किंवा अपडेट करणे आवश्यक आहे (कठीण नियम #8) | होय          |
| `check:test-masking`   | बदललेल्या चाचणी फायली निव्वळ दावा संख्या कमी करत नाहीत किंवा `assert.ok(true)` tautologies जोडत नाहीत                                                | होय          |
| `check:pr-evidence`    | PR बॉडी बदलासाठी test/VPS पुरावे उद्धृत करते ( PR गद्य — नाजूक ग्रेप करून हार्ड नियम #18 यांत्रिकीकरण करते, बॅकलॉग पहा)                              | होय          |

### नोकरी: `test-vitest`

`build` मागे धावतो. अयशस्वी होण्यावर ब्लॉक्स विलीन होतात.

| सुट              | प्रमाणित करतो                                             | अवरोधित करणे                                                                                                                     |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्व्हर (110 साधने), autoCombo, कॅशे — vitest धावणारा | होय                                                                                                                              |
| `test:vitest:ui` | UI घटक चाचणी — vitest धावपटू                              | **अवरोधित करणे** — पूर्व-अस्तित्वात असलेल्या अपयशांना `vitest.config.ts` मध्ये स्पष्टपणे वगळण्यात आले आहे; नवीन अपयश काम अयशस्वी |

### रात्रीचे वर्कफ्लो (शेड्यूल केलेले, सल्लागार)

हे क्रॉन शेड्यूलवर चालतात (आणि `workflow_dispatch`), कधीही PRs वर नाहीत. सर्व सल्लागार आहेत.

| कार्यप्रवाह            | प्रमाणित करतो                                                                                                                                     | अवरोधित करणे |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | यादृच्छिक बियाणे + उच्च धावसंख्येसह मालमत्ता चाचण्या जलद तपासा                                                                                    | **सल्लागार** |
| `nightly-resilience`   | हीप-ग्रोथ गेट, अराजकता फॉल्ट-इंजेक्शन, k6 load/soak                                                                                               | **सल्लागार** |
| `nightly-llm-security` | promptfoo इंजेक्शन गार्ड (ब्लॉक मोड) + garak प्रोब (प्रदात्याच्या गुप्ततेशिवाय वगळले)                                                             | **सल्लागार** |
| `nightly-schemathesis` | OpenAPI कॉन्ट्रॅक्ट फझिंग (स्कीमॅथेसिस) `docs/openapi.yaml` — पृष्ठभाग स्पेक उल्लंघन / न हाताळलेले 500s वापरून थेट OmniRoute विरुद्ध (Fase 8 B.4) | **सल्लागार** |
| `nightly-mutation`     | स्ट्रायकर उत्परिवर्तन-चाचणी स्कोअर ओव्हर फास्ट युनिट लेन — जिवंत म्युटंट्स पृष्ठभाग कमकुवत दावा                                                   | **सल्लागार** |
| `nightly-compat`       | समर्थित `engines.node` श्रेणींमध्ये नोड इंजिन सुसंगतता मॅट्रिक्स                                                                                  | **सल्लागार** |

कार्यप्रदर्शन बेसलाइन (heap, TTFB, बिल्ड टाइम) रेकॉर्ड केल्या आहेत, गेट केलेले नाहीत: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) पहा.

---

## वेगाचा टप्पा (2026-08-30 → v4.0 LTS): प्रत्येक बेसलाइन 20% ने सैल

मालकाचा निर्णय (2026-08-30): v4.0 चे मॉड्युलरायझेशन पूर्ण होईपर्यंत कर्जाची मर्यादा कायम
ठेवण्यापेक्षा शिपिंगचा वेग अधिक महत्त्वाचा आहे. प्रत्येक **संख्यात्मक** रॅचेट बेसलाइन एका
ऑडिट करता येण्याजोग्या पासमध्ये 20% ने सैल करण्यात आली आहे आणि हा टप्पा
`config/quality/quality-baseline.json` मध्ये घोषित केला आहे:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| काय बदलले                                                                                                                                                                                                                    | कुठे                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — कमी असणे चांगले असलेल्या संख्यांसाठी ×1.2, जास्त असणे चांगले असलेल्या टक्केवारींसाठी ÷1.2 (coverage floor 60 कायम ठेवला, `eslintErrors` 0 राहते, `eslintWarnings` 0 → frozen suppression count च्या 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` नोंदीमध्ये प्रत्येक before → after दिले आहे)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, प्रत्येक `frozen[*]` / `testFrozen[*]` ओळीची मर्यादा ×1.2                                                                                                                                                  | `file-size-baseline.json`                                                                              |
| प्रत्येक फाइलसाठी / प्रत्येक TS-कोडसाठीच्या संख्यात्मक मर्यादा ×1.2                                                                                                                                                          | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` असताना `--require-tighten` सल्लागार स्वरूपाचे होते                                                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nightly `bank-ratchet-shrinks` थांबवले आहे (ते मोजलेली घट नोंदवून headroom पूर्ववत केले असते)                                                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

Allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) हे **बजेट नाहीत** आणि त्यांना स्पर्श केलेला नाही. पास/फेल धोरणाचे गेट (secrets, SQL नियम,
docs/env contract, i18n parity, unit tests) अपरिवर्तित आहेत — लाल टेस्ट अजूनही लाल टेस्टच आहे.

**टूलिंग**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ही
  एकदाच चालणारी सैल प्रक्रिया (`scripts/quality/relax-baselines.mjs`); समान note वापरून
  दुसऱ्यांदा चालवण्यास नकार देते.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI ज्या पद्धतीने करते त्याच पद्धतीने प्रत्येक संख्यात्मक गेटचे मोजमाप करते आणि प्रत्येक गेटसाठी
  उरलेले headroom छापते (`scripts/quality/baseline-headroom.mjs`). nightly `baseline-headroom`
  job workflow run summary मध्ये हे टेबल प्रकाशित करते आणि त्याचा JSON/Markdown अहवाल
  `baseline-headroom-<run_id>` म्हणून अपलोड करते; तो 90 दिवस ठेवला जातो. Warning आणि critical
  ओळी त्यांच्या cap च्या 10% च्या आत असलेले किंवा आधीच त्यापेक्षा जास्त गेलेले गेट ओळखतात.
  बजेट वापरले जात असल्याची पूर्वसूचना म्हणून या अहवालांचे पुनरावलोकन करा; दोषी गेटच्या
  `_rebaseline_*` नोंदी तपासा. Job आता कायमस्वरूपी issue तयार किंवा अद्यतनित करत नाही;
  #12149 पूर्वीच्या अहवालांचा इतिहास जतन करते.

**नवीन-कोड मोड (Clean-as-You-Code) — 2026-08-30 पासून, फक्त PR fast-path**

`pull_request` घटनांवर `quality.yml`, `check:file-size`,
`check:complexity-ratchets` आणि `check:dead-code` यांना `--base-ref <PR base SHA>` देते.
`check:complexity-ratchets` आणि `check:dead-code` साठी गेट merge-base ची तुलना
**PR ने स्पर्श केलेल्या फाइल्सपुरती मर्यादित** करून HEAD शी करते
(`scripts/check/newCodeMode.mjs`: merge-base तात्पुरत्या `git worktree` मध्ये materialize केला
जातो, तेथे आणि HEAD वर ESLint/knip चालवले जातात आणि प्रत्येक फाइलच्या संख्यांची तुलना केली जाते):

- **blocking** — PR ने बदललेल्या फाइल्समध्ये cyclomatic/cognitive violations किंवा dead exports जोडले
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` लॉगमध्ये);
- **advisory** — frozen baseline च्या तुलनेत जागतिक एकूण. वारशाने आलेला drift निरपराध PR ला
  कधीही लाल करत नाही; release reconciliation वेळी drift पुन्हा freeze केला जातो आणि headroom job
  त्यावर लक्ष ठेवते.

`check:file-size` स्वतःच्या नियमांनुसार base ref वापरते
(`scripts/check/check-file-size.mjs`, #8522):
ते tree मधील प्रत्येक source आणि test फाइल तपासते, `git show` वापरून PR base वरील प्रत्येक फाइलची
ओळींची संख्या वाचते आणि फाइल तेव्हाच अयशस्वी ठरवते जेव्हा ती तिच्या baseline ceiling पेक्षा
(`frozen` / `testFrozen`, किंवा baseline बाहेरील फाइलसाठी `cap` / `testCap`) आणि तिच्या base
size पेक्षा मोठ्या असलेल्या मर्यादेच्या पलीकडे वाढते. Base वर आधीच drift झालेली फाइल त्यामुळे
निरपराध PR ला कधीही लाल करत नाही.

`check:boundary:ratchet` हा नियम त्याच्या एकमेव संख्येलाही लागू करतो
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR इव्हेंट्सवर
`quality.yml` मधील fast-gates आणि `ci.yml` मधील lint job, दोन्ही PR चा base SHA पाठवतात,
base commit चे मापन `git archive` export मधून केले जाते, आणि `open-sse → src` edge ची
संख्या `metrics.boundaryOpenSseToSrc` आणि base वरील संख्येपैकी जी मोठी असेल, तिच्यापेक्षा
जास्त झाली तरच PR अयशस्वी ठरतो. Ceiling पेक्षा जास्त असलेला base drift
(`base drift herdado`) नोंदवला जातो, परंतु निर्दोष PR ला कधीही red केले जात नाही; push → main
मध्ये absolute ceiling कायम राहते, आणि निराकरण न होणारा base SHA warning सह त्यावर fallback होतो.

Omni-queue उमेदवार (push to `omni-queue/**`, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) पहा)
याला pull request प्रमाणेच हाताळले जाते: दोन्ही workflows उमेदवाराचा base
(`needs.changes.outputs.candidateBase`) `--base-ref` म्हणून पाठवतात, आणि
`check:ts7-diagnostics-ratchet` देखील त्याच्याविरुद्ध चालते. नवीन code gates पैकी दोन्हीसाठी
तुलनेसाठीचा base हा स्वतः तो SHA असतो, top merge commit चा पहिला parent नसतो; त्यामुळे
batch मधील प्रत्येक pull request चे परीक्षण केले जाते.

`workflow_dispatch` runs, release-green sweep आणि nightly headroom job यांच्याकडे PR base
नसतो आणि ते absolute (global) comparison कायम ठेवतात. Coverage, duplication आणि
type-coverage सध्या globalच राहतात (त्यांची tools per-file diff स्वस्तात तयार करत नाहीत) —
यांनाही याच पद्धतीने हाताळण्यासाठी उमेदवार आहेत.

**v4.0 मध्ये phase बंद करणे (LTS = पूर्वीपेक्षा अधिक कडक, "पुन्हा नेहमीसारखे" नाही)**

1. शुद्ध `release/v4.0.0` tip वर: नोंद म्हणून `npm run quality:headroom --json`, त्यानंतर
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, प्रत्येक typecheck gate चे
   `--update` — प्रत्येक baseline मोजलेल्या मूल्यापर्यंत कमी होतो.
2. `quality-baseline.json` मधून `_policy` हटवा (`--require-tighten` आणि nightly
   banking पुन्हा सक्षम होतात), तसेच `check-openapi-coverage.mjs` मध्ये
   `THRESHOLD = 36` (किंवा त्याहून अधिक) पुनर्स्थापित करा.
3. Modularization मुळे मिळालेल्या सुधारणांपेक्षा पुढे जाऊन कडकपणा वाढवा: file-size `cap`
   पुन्हा 1000 (किंवा 800) करा, coverage floors +5 करा, आणि modularized packages साठी
   dead exports 0 ठेवा.

## रॅचेट बेसलाइन (`quality-baseline.json`)

रॅचेट इंजिन (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` वाचते
आणि त्याची नुकत्याच संकलित केलेल्या `quality-metrics.json` शी तुलना करते. कोणतेही मेट्रिक
त्याच्या epsilon पेक्षा अधिक खराब झाल्यास बिल्ड अयशस्वी होते.

सध्या ट्रॅक केली जाणारी मेट्रिक्स:

| मेट्रिक               | दिशा   | अर्थ                                    |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLint इशाऱ्यांची संख्या वाढता कामा नये |
| `coverage.statements` | `up`   | स्टेटमेंट कव्हरेज कमी होता कामा नये     |
| `coverage.lines`      | `up`   | लाइन कव्हरेज कमी होता कामा नये          |
| `coverage.functions`  | `up`   | फंक्शन कव्हरेज कमी होता कामा नये        |
| `coverage.branches`   | `up`   | ब्रँच कव्हरेज कमी होता कामा नये         |

खरी सुधारणा झाल्यानंतर बेसलाइन अपडेट करण्यासाठी:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` फ्लॅग सध्या मोजलेली मूल्ये `quality-baseline.json` मध्ये लिहितो.
सुधारणा नोंदवणे हे रिलीज/नाइटली काम आहे, फीचर PR चे काम नाही: `--require-tighten`
(टप्पा 6A.5) नोंद न केलेली सुधारणा केवळ रिलीज मोडमध्ये (push, schedule, रिलीज PR,
स्थानिक रन) अयशस्वी ठरवतो. फीचर PR मध्ये (`pr` gate mode) तो सुधारणा माहिती म्हणून
दाखवतो आणि यशस्वी होतो; दोन्ही मोडमध्ये रिग्रेशन अयशस्वी ठरते. वेगाच्या टप्प्यात हे
सर्वत्र सल्लागार स्वरूपाचे आहे (`_policy.requireTighten: false`). [जनरेट केलेल्या फाइल्स आणि रिलीजवेळी लिहिल्या जाणाऱ्या व्युत्पन्न बेसलाइन](#generated-files-and-derived-baselines-written-at-release) पहा.

### CodeQL रॅचेट: रिफ्रेशची वारंवारता आणि मॅन्युअल ट्रिगर

`check:codeql-ratchet` **प्रत्येक PR नुसार नव्हे, तर वेळापत्रकानुसार रिफ्रेश केलेली रिपॉझिटरी स्थिती वाचते.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` मध्ये
`state: configured`, `schedule: weekly` दिसते: हा GitHub चा डिफॉल्ट-सेटअप स्कॅन आहे, प्रत्येक push वरील
विश्लेषण नाही. परिणामतः, अलर्ट्स दुरुस्त करणारा PR मर्ज झाल्यानंतर, पुढील नियोजित स्कॅन होईपर्यंत रॅचेट जुनी,
अधिक संख्या वाचत राहतो — त्यामुळे स्कॅन अद्ययावत होईपर्यंत प्रत्येक उघड्या PR मध्ये, दुरुस्ती करणाऱ्या PR च्या
स्वतःच्या पुढील रनमध्येही, रिग्रेशन नोंदवले जाते.

**मॅन्युअल रिफ्रेश**: `gh workflow run codeql.yml --ref release/vX.Y.Z` विश्लेषण पुन्हा चालवते
आणि काही मिनिटांत अलर्ट्स पुन्हा प्रकाशित करते. आधी `.github/workflows/codeql.yml` वाचा — त्याच्या
शीर्षकात हे **फक्त `workflow_dispatch`** का आहे, हे स्पष्ट केले आहे; कारण ते GitHub च्या
**"default setup" शी संघर्ष करते** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ट्रिगर्स पुन्हा सुरू करण्यासाठी प्रथम **मालकाची कृती आवश्यक आहे**: Settings → Code security →
CodeQL: Default → Advanced. तो स्विच सक्षम केल्याशिवाय `schedule:` ट्रिगर जोडू नका — त्यामुळे
फक्त अयशस्वी रन तयार होतील.

**संख्या कमी झाल्यानंतर बेसलाइन अधिक कडक करा** — `node scripts/check/check-codeql-ratchet.mjs
--update` नवीन मोजलेली संख्या `quality-baseline.json` → `metrics.codeqlAlerts.value` मध्ये लिहिते,
जेणेकरून रॅचेट जुन्या कमाल मर्यादेपर्यंत पुन्हा वाढणारे रिग्रेशन गुपचूप परवानगी देणार नाही. कार्यरत उदाहरण
(2026-09-02/03): PR #12502 ने 7 वास्तविक अलर्ट दुरुस्त केले (मोजलेले उघडे अलर्ट 13 → 6);
PR #12530 ने त्यानुसार स्थिर बेसलाइन 11 → 6 अधिक कडक केली; त्यानंतर उरलेले 6 अलर्ट
प्रत्येक अलर्टसाठी स्वतंत्र कारण देऊन dismiss केले गेले आणि उघडे अलर्ट 0 वर आले.

**Dismissals हा ऑपरेटरचा निर्णय आहे (कठोर नियम #14)** — dismissal comment मध्ये तांत्रिक कारण नोंदवल्याशिवाय
CodeQL अलर्ट कधीही dismiss करू नका: upstream-protocol आवश्यकतेसाठी `won't fix`, टेस्ट फिक्स्चरसाठी
`used in tests`, आणि CodeQL ला न दिसणाऱ्या sanitizer साठी `false positive` (पूर्वदृष्टांत:
`docs/security/ERROR_SANITIZATION.md`).

---

## चाचणी पुनर्प्रयत्न धोरण (WS5.4, v3.8.49)

पुनर्प्रयत्न प्रत्येक रनरसाठी स्वतंत्र आहे, कधीही सर्वांना लागू होणारा जागतिक नियम नाही — सर्वांना लागू होणारा पुनर्प्रयत्न वास्तविक रिग्रेशन्सना
अदृश्य अधूनमधून होणाऱ्या अपयशांमध्ये रूपांतरित करतो:

| रनर              | धोरण                                                                                                                                                        | कारण                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | केवळ CI मध्ये `retries: 1`, तसेच `trace: on-first-retry`                                                                                                    | ब्राउझर/नेटवर्क टाइमिंग खरोखरच अनिर्धारित असते; ट्रेससह एक पुनर्प्रयत्न अधूनमधून होणाऱ्या अपयशाला निदान करता येण्याजोग्या आर्टिफॅक्टमध्ये बदलतो |
| Vitest           | जागतिक पुनर्प्रयत्न नाही. अधूनमधून अपयशी ठरणे सिद्ध झालेल्या चाचणीला स्पष्ट प्रतिचाचणी पुनर्प्रयत्न मिळतो (diff मध्ये दृश्यमान, PR मध्ये पुनरावलोकन केलेला) | यामुळे क्वारंटाइन यादी repo मध्ये राहते, कधीही अपारदर्शक होत नाही                                                                               |
| node:test (unit) | कधीही पुनर्प्रयत्न नाही                                                                                                                                     | अधूनमधून अपयशी होणारी युनिट चाचणी हा चाचणीतील बग आहे — तो दुरुस्त करा, ती चाचणी पुन्हा नशिबावर चालवू नका                                        |

अधूनमधून होणाऱ्या अपयशांची टेलिमेट्री उपलब्ध झाल्यानंतरची लक्ष्यित SLOs (WS5.2/5.3): प्रत्येक चाचणीसाठी <1% अधूनमधून अपयश दर
("आत्ताच दुरुस्त करा" मर्यादा), प्रत्येक पाइपलाइनसाठी ≥95% उत्तीर्ण दर. उद्योगातील संदर्भ मूल्ये —
आमच्या स्वतःच्या मोजमापांनुसार पुन्हा कॅलिब्रेट करा.

## रिलीज-स्तरीय रॅचेट ड्रिफ्ट (WS5.5, v3.8.49)

जेव्हा एखादा रॅचेट (फाइल आकार, जटिलता, eslint इशारे) PURE रिलीज
टिपवर रिग्रेस होतो — म्हणजेच मर्जेसच्या एकत्रित परिणामामुळे तो रिग्रेस झाला आणि कोणताही एक PR स्वतःच्या ब्रँचवर तो
रिग्रेशन पुन्हा निर्माण करत नाही — तेव्हा दुरुस्तीची जबाबदारी **रिलीज कॅप्टनची, एकदाच, रिलीज
ब्रँचवर** असते: एक्स्ट्रॅक्शन/रिफॅक्टरला प्राधान्य द्या; केवळ दस्तऐवजीकृत
समर्थन नोंदीसहच बेसलाइन पुन्हा निश्चित करा. कॉम्बिनेशन ड्रिफ्टचे ओझे कधीही योगदानकर्त्याच्या PR वर टाकू नका आणि
प्रत्येक PR साठी बेसलाइन पुन्हा निश्चित करू नका (त्यामुळे वास्तविक रिग्रेशन्स लपतात). प्रथम फरक ओळखा: तुमच्या PR मुळे ते झाले असे गृहीत धरण्यापूर्वी
प्रोब worktree मध्ये शुद्ध टिपविरुद्ध रेड पुन्हा निर्माण करा.

## निर्मित फाइल्स आणि व्युत्पन्न बेसलाइन (release वेळी लिहिलेल्या)

Plan 2026-11-13 ("व्युत्पन्न संख्या आणि मजकूर केवळ release वेळी सोडवले जातात"): feature PR मध्ये
**स्रोत** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, skill catalog,
free-tier catalog, एक नवीन e2e spec — बदलतो. त्या स्रोतापासून गणना केल्या जाणाऱ्या फाइल्स तो पुन्हा
निर्मित करत नाही आणि मोजलेली सुधारणा baseline मध्ये जमा करत नाही. त्या फाइल्स एकदाच,
release refresh (`release:refresh-derived`) किंवा nightly refresh PR द्वारे पुन्हा लिहिल्या जातात.
यापूर्वी प्रत्येक sibling PR मध्ये स्वतःची पुन्हा-निर्मित प्रत असायची आणि पुढील merge शी conflict
व्हायचा (2026-11-13: 321 पैकी 30 open PRs ने `PROVIDER_REFERENCE.md` पुन्हा लिहिले, तर 26–28 ने README diagrams पुन्हा लिहिले).

**Guard.** `check:pr-derived-paths` (job `pr-test-policy`) अशा feature PR ला अयशस्वी करते जी
`config/quality/derived-paths/` मधील एखाद्या family मधील फाइल बदलते:

| Family      | Files                                                                                                                                                                      | Rewritten by                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; बारा generated README SVGs; `skills/*/references/**`; custom block नसलेल्या `SKILL.md` फाइल्स | `release:refresh-derived` (facts), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                          | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

Writers (`release/v*`, `chore/derived-*`, आणि baselines साठी `chore/bank-ratchet-*`) यांना सूट आहे;
तसेच अशी PR देखील exempt आहे जी केवळ एका family मध्ये आणि तिच्या companions मध्ये बदल करते
(`generated` साठी: generator scripts, त्यांची tests, agent-skill inputs — `src/shared/constants/agentSkills.ts`,
हाताने लिहिलेले `skills/**` docs, `docs/openapi.yaml` — आणि `changelog.d/**`), उदाहरणार्थ
hero layout change सोबत त्याचा regenerated SVG, किंवा ज्या skills fix ची test regenerated
`SKILL.md` फाइल्स वाचते. हाताने लिहिलेला `<!-- skill:custom-start -->` block असलेली
`SKILL.md` ही family मध्ये येत नाही: तिचा custom block feature च्या शेजारी editable राहतो.

**प्रत्येक gate mode नुसार checks** (`scripts/check/lib/gateMode.mjs`; helper
`scripts/check/lib/derivedArtifactScope.mjs`):

| Check                                                                       | `release` (push, schedule, release PR, local)                                         | `pr` (feature PR, queue batch)                                                                                                                                                                            |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                   | प्रत्येक skill generator output शी समान असणे आवश्यक                                   | PR ने ज्या skills मधील generated text (custom block च्या बाहेरील) किंवा `references/` बदलले आहेत फक्त त्या; अन्यथा `SKIP reason=pr-mode`                                                                  |
| `check:generated-artifacts` (README SVGs + e2e timings; needs full history) | प्रत्येक SVG त्याच्या generator शी समान; प्रत्येक spec साठी timings entry असणे आवश्यक | PR ने बदललेले artifacts फक्त; उर्वरित `SKIP reason=pr-mode`; diff base नसल्यास → प्रत्येक artifact चे परीक्षण (fail-closed)                                                                               |
| README SVG byte-compare tests (`tests/unit/docs/readme-*-svg.test.ts`)      | प्रत्येक SVG                                                                          | PR ने बदललेला SVG, base resolve झाल्यासच; `test-unit` च्या shallow PR checkout मध्ये base नसतो, त्यामुळे तेथे test `SKIP reason=base-unresolved` सह वगळली जाते आणि `check:generated-artifacts` तुलना करते |
| e2e timings completeness (`tests/unit/balance-e2e-shards.test.ts`)          | प्रत्येक spec साठी entry असणे आवश्यक                                                  | SVG tests सारखाच नियम (नवीन spec median weight सह चालतो)                                                                                                                                                  |
| `check-quality-ratchet.mjs --require-tighten`                               | bank न केलेली सुधारणा अयशस्वी ठरते (`_policy` असल्यास अपवाद)                          | सुधारणा नोंदवली जाते, कधीही failure होत नाही; regression मात्र अजूनही अयशस्वी ठरते                                                                                                                        |

Release मोडमध्ये या तपासण्यांचे विभाजन करण्यापूर्वीचे verdicts, exit codes आणि messages कायम राहतात; जास्तीत जास्त एक ओळ जोडली जाते, जी resolved mode चे नाव देते (`[agent-skills-sync] mode=release (auto: local run)`).
चाचण्या node:test च्या `{ skip: releaseOnlyUnlessTouched(...) }` पर्यायाद्वारे वगळल्या जातात; `check:test-masking` हा पर्याय report-only block मध्ये सूचीबद्ध करते (`.skip(` किंवा `{ skip: true }` पैकी कोणतेही नसल्यामुळे, हे hard skip म्हणून मोजले जात नाही). `check:generated-artifacts` हा base resolvable असेल तिथे चालतो: job `lint` (`fetch-depth: 0`) मध्ये, `check:agent-skills-sync` नंतर लगेच. स्थानिक पातळीवर, `npm run check:generated-artifacts -- --mode=pr` चालवल्यास PR वर तो step कोणता निर्णय घेतो ते दिसते. `check:docs-counts` मधील provider-total cross-check ("Provider reference total (doc vs live modules)") हा counts gate चा भाग आहे आणि त्या gate च्या स्वतःच्या modes चे अनुसरण करतो.

जाणीवपूर्वक कोणत्याही family मध्ये नाहीत: लोकांनी ठरवलेल्या policy files (`gate-manifest.json`, allowlists, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) आणि एखाद्या feature PR ला code सोबत एकत्र संपादित कराव्या लागू शकणाऱ्या ceilings (`quality-baseline.json` मधील metric entries, typecheck/file-size/complexity baselines, `eslint-suppressions.json` — PR ने frozen violation दुरुस्त केल्यावर pre-commit ESLint run द्वारे pruned). `src/i18n/routeNamespaces.generated.json` ही देखील generated आहे, पण ती feature PRs मध्येच राहते: app ती run time वर import करते, त्यामुळे refresh होईपर्यंत ती थांबू शकत नाही.

## रॅचेटमधील कपात बँक करणे — खालच्या दिशेने (#8584)

रॅचेट केवळ अर्धवट स्वयंचलित आहे आणि स्वयंचलित झालेला भाग चुकीचा आहे. मर्यादा **वाढवणे** हे
दहा सेकंद लागणारे हाताने केलेले JSON संपादन आहे आणि रेड PR अनब्लॉक करण्याचा सर्वांत जलद मार्ग आहे.
मर्यादा **कमी करण्यासाठी** कोणीतरी `--update` चालवून त्याचा परिणाम कमिट करणे आवश्यक आहे — आणि
`bank-ratchet-shrinks` जॉब उपलब्ध होईपर्यंत कोणताही वर्कफ्लो ते चालवत नव्हता. मोजलेला परिणाम
(2026-07-25): 18 फ्रोझन फाइल्स आधीच 800-ओळींच्या नवीन-फाइल मर्यादेवर किंवा त्याखाली होत्या, सर्वांत वाईट
132× वर (`src/shared/validation/schemas.ts`, 19 ओळींसाठी 2,523 ची मर्यादा); जटिलतेची कमाल मर्यादा
~37 बेसलाइन-पुनर्निर्धारण नोंदींमध्ये `1794 → 2169` अशी वाढली आणि त्यात नेमकी एक
घट (−1) झाली; तसेच "पुढील चक्रात `--update` द्वारे कडक करा" असे 31 वेळा लिहिले गेले आणि
एकदाच पाळले गेले. ज्या कोडमुळे मर्यादा मिळाली त्या कोडपेक्षा अधिक काळ टिकणारी मर्यादा, पूर्ण झालेल्या प्रत्येक
विघटनाला, पुढे ती फाइल संपादित करणाऱ्या व्यक्तीसाठी वाढीच्या मुभेत शांतपणे रूपांतरित करते.

`nightly-release-green.yml` → जॉब **`bank-ratchet-shrinks`** हे चक्र पूर्ण करतो:

|         |                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------- |
| चालतो   | `schedule` (3×/दिवस) + `workflow_dispatch` — मुद्दाम **`push` वर नाही**                                 |
| मोजतो   | सर्वोच्च `release/vX.Y.Z`, `release-green` प्रमाणेच रिझोल्यूशन + इंजेक्शन गार्ड                         |
| लिहितो  | `check:file-size --update` आणि `check:complexity-ratchets --update` (दोन्ही रचनेनुसार केवळ कपात करणारे) |
| पडताळतो | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                |
| पाठवतो  | रिलीज ब्रँचविरुद्ध नेहमी अद्ययावत असलेला एक PR — सक्तीने अद्ययावत केला जातो, कधीही स्पॅम केला जात नाही  |

बँकिंग प्रत्येक पुशऐवजी बॅचमध्ये केले जाते, कारण त्यासाठी विलंबाची कोणतीही अट नाही (8 तासांच्या आत
बँक केलेली कपात पुरेशी आहे), तर प्रत्येक मर्जवर चालवल्यास मर्ज मोहिमांदरम्यान PR ब्रँच वारंवार
पुन्हा बिल्ड होईल आणि प्रत्येक वेळी संपूर्ण ESLint वॉकची किंमत मोजावी लागेल. शोध `push` वरच राहतो
(`release-green`); केवळ बँकिंग बॅचमध्ये केले जाते.

### सुरक्षा पडताळक

जॉब देखरेखीशिवाय बेसलाइन्समध्ये लिहितो, त्यामुळे `verify-ratchet-bank.mjs` मुळेच
ते स्वीकारार्ह ठरते. तो `--update` नंतरच्या ट्रीचा `HEAD` विरुद्ध diff घेतो आणि प्रत्येक बदल खालीलपैकी एक नसल्यास
**कोणताही कमिट अस्तित्वात येण्यापूर्वी जॉब रद्द करतो** — कोणताही PR उघडत नाही:

- एखादी `frozen` / `testFrozen` संख्यात्मक नोंद **कमी केलेली** किंवा **काढलेली**
- `complexity-baseline.json` → `count` **कमी केलेला**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **कमी केलेले**

इतर काहीही अपयशी ठरते: संख्या वाढवणे, नोंद जोडणे, `cap`/`testCap` बदलणे किंवा
`_rebaseline_*` नोंद हटवणे/पुन्हा लिहिणे (प्रत्येक कमाल मर्यादा का अस्तित्वात आहे याचा ऑडिट मागोवा या नोंदी आहेत
आणि त्या फाइल नोंदींसोबत त्याच `frozen` ऑब्जेक्टमध्ये साठवल्या जातात).
मर्यादा वाढवू शकणारा बॉट विद्यमान स्थितीपेक्षा निश्चितच अधिक वाईट ठरेल. रिग्रेशन
गार्ड: `tests/unit/verify-ratchet-bank.test.ts`.

जॉब कधीही `release/*` वर पुश करत नाही — मानव PR मर्ज करतो, त्यामुळे चुकीचे मोजमाप
पुनरावलोकनाशिवाय समाविष्ट होऊ शकत नाही.

## अनुमत-सूची धोरण

पूर्व-अस्तित्वात असलेल्या उल्लंघनांवर अपयशी ठरू न शकणारा प्रत्येक गेट स्थिर अनुमत-सूची वापरतो
(उदा., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). धोरण असे आहे:

**मूलभूत कारण दुरुस्त करा; उल्लंघन पूर्व-अस्तित्वात असेल आणि त्याच PR मध्ये
दुरुस्त करता येत नसेल, तेव्हाच अनुमत-सूची वापरा.**

अनुमत-सूचीत नोंद जोडताना:

1. कारण स्पष्ट करणारी टिप्पणी समाविष्ट करा.
2. ट्रॅकिंग इश्यूचा संदर्भ द्या (उदा., `// #3498 — Phase 2 feature, not yet implemented`).
3. उल्लंघन दुरुस्त करणाऱ्या त्याच PR मध्ये नोंद काढून टाका — सक्रिय उल्लंघन दडपून
   ठेवत नसलेली जुनी नोंद स्वतःच एक दोष आहे (अंमलात आल्यानंतर 6A.3 stale-enforcement
   अनाथ अनुमत-सूची नोंदीसाठी गेट अयशस्वी करेल).

चाचण्या लवकर पास व्हाव्यात म्हणून अनुमत-सूची नोंदी जोडू नका. वाढत्या अनुमत-सूचीसह
हिरवा गेट हा गुणवत्तेचा भ्रामक आभास असतो.

### तुमच्या PR मध्ये गेट अयशस्वी झाल्यावर

1. **गेटचे आउटपुट काळजीपूर्वक वाचा** — नियमाचे उल्लंघन करणारी नेमकी फाइल किंवा
   सिम्बॉल ते सांगते.
2. **उल्लंघन दुरुस्त करा** — बहुतेक गेट हे निर्धारक फाइलसिस्टम तपासण्या असतात आणि
   कोड योग्य होताच पास होतात.
3. **उल्लंघन पूर्व-अस्तित्वात असल्यास** (म्हणजे तुम्ही ते आणलेले नाही, परंतु गेट आता
   त्याचा समावेश करते): कारण स्पष्ट करणारी टिप्पणी आणि ट्रॅकिंग इश्यू यांसह अनुमत-सूची
   नोंद जोडा.
4. **गेट रॅचेट असल्यास** (कव्हरेज, ESLint चेतावण्या, डुप्लिकेशन, गुंतागुंत):
   तुमच्या बदलामुळे मेट्रिक खराब झाली आहे. मूलभूत समस्या दुरुस्त करा किंवा
   (क्वचित प्रसंगी) `npm run quality:ratchet -- --update` चालवा, जर बदल हेतुपुरस्सर
   असेल आणि मेट्रिकमधील घसरण स्वीकारार्ह असेल — परंतु PR वर्णनात त्याचे कारण
   नोंदवा.
5. **सल्लागार गेट** (`continue-on-error: true`) माहितीपुरते असतात — ते मर्जला अडथळा
   आणत नाहीत, परंतु CI सारांशात दिसतात. तरीही ते दुरुस्त करा.

---

## नवीन गेट जोडणे

1. `scripts/check/check-<name>.mjs` (किंवा `.ts`) तयार करा. धोरण गेट 0/1 एक्झिट करतात.
   रॅचेट-शैलीचे गेट `collect-metrics.mjs` द्वारे `quality-metrics.json` मध्ये मेट्रिक उत्सर्जित करतात.
2. `package.json` मध्ये `"check:<name>": "node scripts/check/check-<name>.mjs"` जोडा.
3. योग्य जॉबअंतर्गत `.github/workflows/ci.yml` मध्ये ते जोडा
   (धोरण → `lint` किंवा `docs-sync-strict`; रॅचेट → `quality-gate`).
4. त्यात अनुमतसूची असल्यास, कालबाह्य नोंदी आपोआप शोधण्यासाठी
   `scripts/check/lib/allowlist.mjs` मधील `reportStaleEntries()` लागू करा.
5. गेटच्या शोध तर्काला कव्हर करणारी चाचणी `tests/unit/build/` मध्ये लिहा.
6. हा दस्तऐवज अद्ययावत करा (संबंधित जॉब तक्त्यात एक पंक्ती जोडा).

---

## एजंट साधने: LSP-in-the-loop (ऐच्छिक)

CI गेटच्या पलीकडे, OmniRoute मध्ये **ऐच्छिक** `agent-lsp` मूलभूत संरचना
(प्रकल्प-स्तरीय `.mcp.json`, टप्पा 7 कार्य 15) समाविष्ट आहे. कोडिंग एजंटना TypeScript भाषा सर्व्हर उपलब्ध करून देण्यासाठी `.mcp.json`
तयार करा, जेणेकरून ते कोड लिहिण्यापूर्वीच चिन्हे /
निदानांचे निराकरण करतील — स्रोतावरच "कल्पित चिन्ह" त्रुटी कमी करणारा
`typecheck:core` चा संकलन-करा-मग-दावा-करा सहकारी. हे हेतुपुरस्सर
आपोआप लोड केले जात नाही (तुम्ही MCP↔LSP ब्रिज निवडून पडताळता); सदोष नोंद केवळ
कनेक्शन त्रुटी लॉग करते आणि सत्रे कधीही खंडित करत नाही.

---

## तर्कसंगतीकरण अनुशेष (ROI पुनरावलोकन — टप्पा ९ लाट ३)

ही सूची 2026-06-17 रोजी `ci.yml` विरुद्ध समेटण्यात आली (मागील आवृत्तीत
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` समाविष्ट नव्हते). समेटलेल्या संचाच्या ROI पुनरावलोकनात
खालील तर्कसंगतीकरण उमेदवार ओळखले गेले. **विलीनीकरणे यांत्रिक CI
बदल आहेत; फ्लिप/ड्रॉप हे ऑपरेटरसाठी राखीव धोरणात्मक निर्णय आहेत.** खालीलपैकी काहीही अद्याप लागू केलेले नाही.

**वरीलमध्ये आणखी दस्तऐवजीकरण न केलेले** (सल्लागार, कमी सिग्नल): `docs-lint` जॉब
(markdownlint + Vale, संपूर्ण जॉब `continue-on-error`) आणि स्वतंत्र स्कॅनर वर्कफ्लो
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` हे
`quality-baseline.json` मध्ये आहे, परंतु `ci.yml` मधील ब्लॉकिंग रॅचेटशी जोडलेले नाही — हे मेट्रिक
सध्या अनाथ आहे.

### विलीनीकरण / डुप्लिकेशन काढणे (यांत्रिक, कमी जोखीम)

प्रत्येक उमेदवाराची 2026-06-17 रोजी लाइव्ह गेट स्थितीविरुद्ध पडताळणी करण्यात आली (विश्वास ठेवा-पण पडताळा);
अनेक "स्पष्ट" विलीनीकरणांमध्ये अनुशेष लपलेला आढळला आणि ती **स्वच्छ ड्रॉप-इन नाहीत.**

- **`check:docs-sync` दोनदा चालते** — `lint` जॉबमध्ये स्वतंत्रपणे आणि पुन्हा `check:docs-all` (`docs-sync-strict`) तसेच husky pre-commit हुकमध्ये. ✅ **पूर्ण झाले** — स्वतंत्र `lint` invocation काढून टाकले.
- **CVE स्कॅनिंग** — ❌ **स्वच्छ विलीनीकरण नाही.** `audit:deps` सध्याच्या धोरणानुसार सर्व पाच lockfiles मधील गंभीर advisories आणि अपूर्ण audits ब्लॉक करते, तर high advisories ना इशारे म्हणून नोंदवते; `check:vuln-ratchet` (osv) केवळ चेक-इन केलेल्या baseline च्या तुलनेत _regression_ झाल्यास अपयशी ठरते आणि आवश्यक असताना मोजमाप गहाळ असल्यास ते नाकारते. अर्थ वेगळे आहेत — `audit:deps` काढल्यास absolute critical gate आणि स्वतंत्र package audit receipts गमावले जातील. दोन्ही ठेवा.
- **Cycle detection** — ✅ **पूर्ण झाले** (#15159 G-01/G-02). येथील जुना मजकूर `check:cycles` ला "हिरवा, curated" gate म्हणत असे आणि `check:circular-deps` (dpdm) ने 91 cycles नोंदवल्यामुळे त्याला blocking ठेवण्याचे समर्थन करत असे. तो हिरवा रंग **खोटा हिरवा** होता: `check:cycles` ने 5 subdirectories (450 files) स्कॅन केल्या, केवळ static `import|export … from` शी जुळले आणि प्रत्येक `@/` व `@omniroute/open-sse/` specifier काढून टाकला; त्यामुळे repo वर वर्चस्व असलेले dynamic-import + alias cycles ते पाहू शकत नव्हते. दुरुस्ती: gate आता `src` + `open-sse` (5023 files) मधून फिरते, TypeScript AST मधून specifiers गोळा करते (`import("…")` मोजले जाते आणि type-position `typeof import("…")` मोजले जात नाही) आणि tsconfig `paths` resolve करते. यात 0 नव्हे तर **14** cycles आढळतात. Gate PR मध्ये आधीपासून असलेले 14 cycles दुरुस्त करता येत नसल्यामुळे, `check:cycles` आता **ratchet** आहे (`--ratchet`, `quality-baseline.json` मधील ceiling `metrics.cycles.value = 14`, `direction: down`) — ते कोणतीही _regression_ ब्लॉक करते आणि संख्या केवळ कमी होऊ शकते. CI `npm run check:cycles:ratchet` चालवते. Burn-down **A-01** सोबत पुढे नेला जाईल. `check:circular-deps` (dpdm) अधिक व्यापक दुसरे मत म्हणून सल्लागारच राहते.
- **Complexity** — ✅ **पूर्ण झाले** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint walk, ruleId नुसार मोजणी, ज्यामुळे cyclomatic+max-lines आणि cognitive baselines स्वतंत्र राहतात; स्वतंत्र `check:complexity` / `check:cognitive-complexity` स्थानिक `--update` साठी कायम आहेत.
- **`/api` anti-hallucination** — ✅ **पूर्ण झाले** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` ची एक FS inventory, openapi-routes + docs-symbols अजूनही स्वतंत्रपणे अहवाल देतात; स्वतंत्र घटक स्थानिक runs साठी कायम आहेत.
- **`check:node-runtime` 11 jobs मध्ये चालते** — ⚠️ **कमी ROI.** प्रत्येकासाठी स्वतंत्र runner आहे आणि check ला <1s लागतो; स्वस्त per-job guard गमावण्याच्या बदल्यात एकूण बचत ~10s इतकी आहे. त्यामुळे हा बदल करण्याइतका फायदा नाही.
- **CI lint वरील `typecheck:noimplicit:core`** — ✅ **lint job मधून काढले** (ते advisory `continue-on-error` होते); blocking type surface म्हणजे `typecheck:core` + `check:type-coverage`. Local script कायम ठेवली आहे.

### फ्लिप / निर्णय (ऑपरेटर धोरण)

- `check:openapi-security-tiers` (advisory) — ❌ **स्वच्छपणे flip करता येत नाही.** `LOCAL_ONLY_API_PREFIXES` अंतर्गत असलेल्या अनेक `traffic-inspector` routes मध्ये `x-loopback-only: true` annotation नसल्याचा इशारा देत ते exit 0 करते. अंमलबजावणी करण्यापूर्वी `openapi.yaml` मध्ये त्या annotations जोडणे आवश्यक आहे.
- `typecheck:noimplicit:core` (advisory) — blocking `check:type-coverage` ratchet ने मोठ्या प्रमाणात समाविष्ट केलेले आहे. ते ratchet मध्ये flip करा किंवा redundant दुसरा `tsc` pass काढून टाका.
- `test:vitest:ui` (आता **blocking**) — `vitest.config.ts` मध्ये `// #8618` tracking comments सह आधीपासून असलेले failures स्पष्टपणे वगळले आहेत; नवीन failures मुळे job fail होईल.
- `check:secrets` (gitleaks, 3 documented false-positives वर blocking ratchet frozen) — 0 पर्यंत पोहोचण्यासाठी त्या 3 साठी allowlist करा किंवा advisory म्हणून demote करा. GitHub native secret-scanning + `check:public-creds` यांच्याशी overlap आहे.
- `check:pr-evidence` (blocking, PR-body prose मध्ये greps) — false-positive चा धोका जास्त आहे; ते काढल्यास Hard Rule #18 ची अंमलबजावणी कमकुवत होईल, त्यामुळे हा खरोखरच धोरणात्मक निर्णय आहे.
- `semgrep` (advisory standalone) — OWASP families साठी CodeQL सोबत overlap आहे; त्याचा baseline ratchet शी जोडा किंवा काढून टाका.

## संबंधित दस्तऐवजीकरण

- पुरवठा-साखळी (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — की-सेट समतुल्यता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
प्रत्येक `src/i18n/messages/<locale>.json` मधील leaf key संचाची `en.json` सोबत तुलना करते आणि
की कधी जोडली गेली याची पर्वा न करता कोणतीही अनुपस्थित किंवा अतिरिक्त leaf आढळल्यास अयशस्वी होते. `__MISSING__:` placeholders
उपस्थित म्हणून मोजले जातात (त्यांची सामग्री ratio gate च्या कार्यक्षेत्रात येते). हे दोन diff-आधारित/टक्केवारी gates चे
पूर्ण पूरक आहे: `check-ui-keys-coverage` प्रत्येक locale साठी 80 % ची किमान मर्यादा लागू करते (सुमारे
13,000 पैकी 43 अनुपस्थित keys असल्या तरी coverage 99.7 % वाचते) आणि `check-new-key-coverage` फक्त PR ने
`en.json` मध्ये जोडलेल्या keys चे मूल्यांकन करते. Locale batch त्याची branch कापली जाते त्या दिवसाच्या
`en.json` मधून तयार केली जाते आणि base मध्ये keys जोडल्या जात असताना अनेक दिवस भाषांतर करते; batch PR स्वतः
कोणतीही key जोडत नाही, त्यामुळे batch 1 (#13044) नऊ locales मध्ये 43 keys कमी घेऊन आणि batch 2 (#13660) आठ
locales मध्ये 10 keys कमी घेऊन आल्यावरही दोन्ही sibling checks शांत राहिले (2026-09-15). Red status दुरुस्त करण्यासाठी
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` वापरा; `extra` leaf
म्हणजे source मधून ती काढली गेली आहे — `sync-ui-keys` ती काढून टाकते (`--prune-extra`, हा default आहे). `--warn`
अयशस्वी न करता अहवाल देते.
`--catalog=cli` `bin/cli/locales` वर तीच तुलना चालवते (`npm run i18n:check-keys:cli`);
दोन्ही पायऱ्या `i18n-ui-coverage` job मध्ये आहेत. Absolute check फक्त release mode मध्ये आहे: feature PR ला
`SKIP reason=pr-mode` दिसते आणि fix release refresh किंवा translation wave मध्ये चालतो, feature PR मध्ये कधीही नाही;
locale catalogs बदलणाऱ्या PR मध्ये मात्र प्रत्येक catalog चे merge base विरुद्ध स्वतंत्रपणे मूल्यांकन केले जाते
(`i18n-ui-coverage` job अंतर्गत "Two modes" पहा).

#### `check-new-key-coverage` — नवीन-key i18n गेट

`check-ui-value-drift` चे sibling. ते translations मागे ठेवून English value **पुन्हा लिहिली** गेली आहे हे शोधते;
हे काही locales मध्ये English key **जोडली** गेली पण ती पोहोचली नाही हे शोधते.

`check-ui-keys-coverage` हा प्रकार ओळखू शकत नाही: ते प्रत्येक locale साठी टक्केवारीची किमान मर्यादा लागू करते,
आणि सुमारे 13,000 leaves पैकी अकरा keys अनुपस्थित असल्या तरी coverage 99.9% राहते. प्रत्येक भाषेसाठीची टक्केवारी
"हे feature भाषांतराशिवाय release झाले" हे व्यक्त करू शकत नाही — संपूर्ण feature नवीन locale मध्ये मजकुराशिवाय येऊ शकते
आणि संख्या कधीही बदलणार नाही.

यात नोंदवलेली घटना अशी आहे: Orchestration Canvas च्या Phase 3 मध्ये त्या वेळी अस्तित्वात असलेल्या 42 locales मध्ये
त्याच्या अकरा keys चे भाषांतर केले गेले. काही तासांनी EU-language batch (#13044) मुळे repo मध्ये 51 locales झाले,
आणि नव्याने आलेल्या नऊ locales (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ना त्या keys कधीच मिळाल्या नाहीत.
`deepMergeFallback` अनुपस्थित key साठी English वापरते, त्यामुळे failure mode blank UI ऐवजी भाषांतर न झालेले UI होते —
ही वास्तविक आणि रचनेनुसार शांतपणे घडणारी समस्या होती.

त्याच्या sibling प्रमाणे हे **diff-aware** आहे; ते merge base वरील English ची working tree सोबत तुलना करते, त्यामुळे
आधीपासून असलेल्या त्रुटी गोठून राहतात आणि हे gate सुरू करण्यासाठी migration आवश्यक नव्हते.

**`__MISSING__:<english>` marker हे ते समाधान मानत नाही (2026-09-17 पासून).** पूर्वी documented deferral म्हणून
याचा वापर केला जात असे — runtime योग्य English वर fallback करते — पण 2026-09-16 रोजी आठ feature PRs ने 61 keys
जोडल्या आणि भाषांतर करण्याऐवजी सर्व 65 locales मध्ये marker लिहिला: या gate ने प्रत्येक key स्वीकारली, काहीही PRs थांबवू
शकले नाही, आणि नंतर blocking real-translation ratio gate release tip वर सर्वांसाठी अयशस्वी झाले (pt-BR 3.2 % > 2.5 % + 0.5).
आता marker चे मूल्यांकन अनुपस्थित translation म्हणून केले जाते. 2026-11-13 पासून फक्त release mode मध्ये: feature PR ला
`SKIP reason=pr-mode` दिसते आणि release PR (`BASE_REF=origin/main`) वर gate त्या cycle मध्ये जोडलेल्या प्रत्येक key चे मूल्यांकन
करते. Release refresh किंवा translation wave मध्ये red status दुरुस्त करण्यासाठी
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` वापरा, किंवा
सर्व locales समांतरपणे `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
detached-safe, `OMNIROUTE_TRANSLATION_*` env शिवाय सुरू होण्यास नकार देते) चालवा. English मध्येच ठेवायची key
(pinned product/engine/flag name) `scripts/i18n/untranslatable-keys.json` मध्ये असावी, marker मागे कधीही नाही.
`vi` markers वर पूर्णपणे बंदी घालते (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — पार्क केलेल्या test चे gate

`vitest.config.ts` च्या `exclude` list मधील file म्हणजे न चालणारी test आहे आणि tree वाचणाऱ्याला ती coverage सारखी दिसते.
`// #8618 — pre-existing failure; remove this exclusion when fixed` या comment मागे बासष्ट files जमा झाल्या.
`#8618` issue 2026-08-11 रोजी बंद झाले, तेव्हा त्याने मागोवा घेतलेली list 45 entries वरून 62 पर्यंत वाढली होती; प्रत्येक
नवीन entry ला बंद झालेल्या issue कडे निर्देश करणारा comment वारशाने मिळाला. जेव्हा अखेर list चे file-by-file मोजमाप झाले
(#13204), तेव्हा **62 पैकी 51 files सध्याच्या tree विरुद्ध कोणताही source बदल न करता पास झाल्या**.

Gate नुसार प्रत्यक्ष file कडे resolve होणाऱ्या प्रत्येक exclusion ने (a) tracking issue चे नाव द्यावे आणि
(b) `config/quality/vitest-exclusions.json` मध्ये तिच्या measured status सह दिसावे. त्यामुळे एखादी exclusion जोडणे
60-entry array मध्ये आणखी एक line जोडण्याऐवजी dedicated file मध्ये review करता येणारा diff ठरतो. हे जाणूनबुजून excluded
tests पुन्हा चालवत नाही — त्यासाठी सुमारे 10 मिनिटे लागतात आणि ते periodic job मध्ये केले जाते; inventory मध्ये
प्रत्येकाची शेवटची measurement कधी झाली ते नोंदवले जाते.
