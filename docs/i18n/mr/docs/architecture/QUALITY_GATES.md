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

दोन्ही वर्कफ्लो PRs main/release शाखांमध्ये कव्हर करतात, `main` वर ढकलतात, मॅन्युअल डिस्पॅच आणि मर्ज-ग्रुप इव्हेंट्स. पुश, डिस्पॅच आणि मर्ज-ग्रुप पूर्ण निवड चालवा. `release/**` ला पुश केल्याने ते सुरू होत नाही (2026-10-18): प्रत्येक बदलाने आधीच त्याच्या PR वर मॅट्रिक्स चालवले आहे आणि विलीन केलेले संयोजन म्हणजे रिलीज-ग्रीनचे कार्य (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन). फोर्क्स आणि मर्ज गट नोकरीसाठी होस्टेड धावपटू वापरतात जे अन्यथा सेल्फ-होस्टेड धावपटू निवडतात; रोलआउट करण्यापूर्वी पुरेशी होस्ट केलेली क्षमता सत्यापित करणे आवश्यक आहे.

एक सामान्य PR जलद निवड चालवते. प्रवेश धोरणाच्या `full-code` आणि `full-code-e2e` लेन (E2E, इंटिग्रेशन, पॅकेज आर्टिफॅक्ट, Electron स्मोक, Bun SQLite, इकोसिस्टम आणि प्रोटोकॉल क्लायंट) फक्त मर्जिफाय क्यू ड्राफ्टवर किंवा पूर्ण रनवर चालतात: `gh workflow run ci.yml --ref <branch>`.

प्रत्येक JSON पावती चेक-आउट SHA, वर्कफ्लो रन आणि प्रयत्न ओळखते. CLI checkout/event SHA न जुळणे नाकारते. वर्कफ्लो चाचण्या पॉलिसी सदस्यत्वाला निर्णयाच्या नोकरीच्या `needs` सूचीशी जोडतात त्यामुळे नवीन किंवा काढलेली लेन शांतपणे अदृश्य होऊ शकत नाही. पावत्या त्यांचे स्वतःचे कार्यप्रवाह कव्हर करतात, प्रकाशन, उपयोजन किंवा विद्यमान सल्लागार स्कॅनरचे अंतर्गत भाग नाही. शाखेच्या नियमांमध्ये दोन्ही चेक नावे सक्रिय करणे हा एक वेगळा प्रशासकीय बदल आहे; या नोकऱ्या जोडणे स्वतःच एखाद्या शाखेचे संरक्षण करत नाही.

### रांग विलीन करा

`queue` लेबल Mergify रांगेला PR पाठवते (`.mergify.yml`). Mergify `mergify/merge-queue/` शाखेवर PR मसुदा उघडते, CI तेथे पूर्ण निवड चालवते आणि `Gate / CI`, `Gate / Quality` आणि `Merge integrity (changelog + generated skills)` पास झाल्यावर मूळ PR विलीन होते.

Mergify मसुद्याच्या वर्णनामध्ये त्याचा रांगेचा सारांश लिहितो आणि इतर ॲप्स देखील ते संपादित करू शकतात. अशा मसुद्यावरील `pull_request` `edited` इव्हेंट स्वतःचा समवर्ती गट (`-queue-edit-<run_id>`) घेतो त्यामुळे तो मसुद्याचा वास्तविक रन रद्द करू शकत नाही आणि तो गेट आणि मॅट्रिक्स वगळतो. फक्त `Merge integrity` अजूनही चालते. वगळलेल्या गेट जॉबमध्ये वेगळे चेक नाव आहे, कारण Mergify वगळलेले `Gate / CI` अयशस्वी चेक म्हणून वाचते आणि PR ला dequeue करते.

dequeue नंतर, पुश नेहमी PR विनंती करत नाही. त्यावर `@mergifyio queue` कमेंट करा.

### स्वीकृती रेड्यूसरमध्ये पुरावा राखून ठेवला

`scripts/quality/validate-release-acceptance.mjs` पुरवठा योजना आणि त्याचे प्रकटीकरण कमी करते; हे स्थापित करत नाही की योजनेत संपूर्ण प्रकाशन पाइपलाइन समाविष्ट आहे. त्याचे अहवाल स्पष्टपणे `releaseAcceptance: false` सेट करतात, जरी ती योजना `VERIFIED` असली तरीही. `release-acceptance.yml` वर्कफ्लो अजूनही शॅडो फिक्स्चर वापरतो, वास्तविक बिल्ड, पॅकेज, बूट किंवा प्रमोशन पावत्या नाही.

ठेवलेल्या पुराव्याची पडताळणी करण्यासाठी CLI `--evidence-root` आवश्यक आहे. फाइल्स `<evidence-root>/<artifact_id>/<member>` म्हणून सोडवल्या जातात आणि SHA-256 म्हणून हॅश केल्या जातात. पुराव्याशिवाय PASS रेकॉर्ड, गहाळ किंवा बदललेली फाइल, असुरक्षित मार्ग किंवा सिमलिंक सत्यापनास प्रतिबंध करते. गहाळ फाइल्स रिकाम्या यशस्वी लॉगच्या समतुल्य नाहीत. विद्यमान SHA/run/attempt धनादेश स्वतंत्र राहतात: जुळणारे बाइट एक शिळी पावती वाचवू शकत नाही. फाईल अखंडता अंमलबजावणीच्या सत्यतेचा किंवा आर्टिफॅक्ट जाहिरातीचा पुरावा नाही.

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

बॅरल री-एक्स्पोर्ट्स आणि डायनॅमिक इंपोर्ट्स फक्त रिझोल्यूशन डायग्नोस्टिक्स आहेत; ते कधीही ब्लॉकिंग शोध तयार करत नाहीत. पुनरावलोकन केलेले अपवाद `config/quality/forgotten-sibling-allowlist.json` मध्ये राहतात. प्रत्येक एंट्रीने ग्राहक आणि उमेदवार चाचणीचे नाव दिले पाहिजे, एक विशिष्ट तर्क द्यावा आणि GitHub समस्या किंवा पुल विनंतीशी लिंक केली पाहिजे. विकृत एंट्री अयशस्वी बंद झाल्या. अपवाद हटवलेली उमेदवार चाचणी किंवा `.skip`/`.todo` जोडणारा फरक दाबू शकत नाही; प्रतिपादन कमकुवत करणे आणि इतर मास्किंग स्वतंत्रपणे ब्लॉक करणाऱ्या `check:test-masking` गेटच्या मालकीचे राहते.

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
| `check:agent-skills-sync`         | व्युत्पन्न केलेल्या एजंट-कौशल्य कलाकृती त्यांच्या स्रोत कॅटलॉगशी जुळतात (कोणताही प्रवाह नाही)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | प्रदाता logos/assets कडे रेकॉर्ड केलेली मूळ नोंद आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON कॉन्फिगरेशन फाइल्स पार्स करतात आणि रेपो लिंट नियमांचे समाधान करतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | त्रुटींशिवाय TypeScript संकलन (केवळ सल्लागार इशारे)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | होय                                      |
| `typecheck:noimplicit:core`       | कठोर `noImplicitAny` — अग्रेषित; अनेक पूर्व-अस्तित्वात असलेल्या कॉल साइट्सना अजूनही भाष्य आवश्यक आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **सल्लागार** (`continue-on-error: true`) |
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
| `quality:collect`            | `quality-metrics.json` उत्सर्जित करते (ESLint चेतावणी संख्या, विलीन केलेल्या शार्ड अहवालातील कव्हरेज)                                                        | होय (रॅचेटचा अपस्ट्रीम) |
| `quality:ratchet`            | `quality-baseline.json` मधील प्रत्येक मेट्रिक मागे गेला नाही (ESLint चेतावणी ≤ बेसलाइन; कव्हरेज ≥ बेसलाइन)                                                   | होय                     |
| `check:duplication`          | कोड डुप्लिकेशन (jscpd@4) `quality-baseline.json` मध्ये बेसलाइन ओलांडत नाही                                                                                   | होय                     |
| `check:complexity`           | फाइल-स्तरीय सायक्लोमॅटिक जटिलता कॅपपेक्षा जास्त नाही (कोर ESLint `complexity` + `max-lines-per-function`)                                                    | होय                     |
| `check:cognitive-complexity` | संज्ञानात्मक जटिलता रॅचेट (`eslint-plugin-sonarjs`) — वेगळे ESLint पास; CI दोन्ही एकल `check:complexity-ratchets` पायरी म्हणून विलीन केले जातात              | होय                     |
| `check:dead-code`            | न वापरलेली निर्यात / फायली रॅचेट (निप) बेसलाइन विरुद्ध मागे जात नाही                                                                                         | होय                     |
| `check:compression-budget`   | कॉम्प्रेशन बेंचमार्क बजेट — प्रति-इंजिन टोकन-बचत मजले मागे जाऊ नयेत                                                                                          | होय                     |
| `check:type-coverage`        | टक्के-टाइप केलेले रॅचेट (`type-coverage`) मागे जात नाही; मुख्यत्वे `typecheck:noimplicit:core` समाविष्ट करते                                                 | होय                     |
| `check:codeql-ratchet`       | ओपन CodeQL अलर्ट काउंट मागे जात नाही ( `gh api` द्वारे वाचले जाते; टोकनशिवाय ग्रेसफुल वगळा) — रिफ्रेश कॅडेन्स आणि मॅन्युअल ट्रिगर: खाली "CodeQL ratchet" पहा | होय                     |

### नोकरी: `quality-extended`

संपूर्ण काम सल्लागार आहे (`continue-on-error: true`). एनपीएम-आधारित रॅचेट्स वास्तविकतेसाठी चालतात; बायनरी अद्याप अनुपस्थित असताना बाह्य स्कॅनर `gh release download` आणि सेल्फ-स्किप (बाहेर पडा 0) द्वारे स्थापित केले जातात.

| स्क्रिप्ट                | प्रमाणित करतो                                                                                                                                                                                        | अवरोधित करणे                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | गोलाकार अवलंबित्व नाही (dpdm)                                                                                                                                                                        | **सल्लागार**                                        |
| `check:bundle-size`      | बंडलचा आकार कॅपपेक्षा जास्त नाही                                                                                                                                                                     | **सल्लागार**                                        |
| `check:secrets`          | बायनरी अनुपस्थित असल्यास गुप्त स्कॅनिंग (gitleaks) — वगळते                                                                                                                                           | **सल्लागार**                                        |
| `check:vuln-ratchet`     | अवलंबित्व भेद्यता (ओएसव्ही-स्कॅनर) — `--ratchet` अयशस्वी होत नाही INCOMPLETE (बाहेर पडा 2) जर मोजलेले नसेल तर                                                                                        | **सल्लागार**                                        |
| `check:workflows`        | वर्कफ्लो लिंट (ऍक्शनलिंट + zizmor); missing/broken स्कॅनर, अवैध अहवाल किंवा गहाळ रॅचेट बेसलाइन INCOMPLETE म्हणून अयशस्वी होतात. वैध निष्कर्ष निवडलेल्या strict/advisory/ratchet धोरणाचे अनुसरण करतात | अंमलबजावणी आवश्यक; CI मध्ये zizmor रॅचेट ब्लॉक करणे |
| `check:openapi-breaking` | पिन केलेल्या इव्हेंट कमिट विरुद्ध सार्वजनिक API करार (PR मर्ज-बेस, पुश आधी, मर्ज-ग्रुप बेस; scheduled/manual चेकआउट फर्स्ट पॅरेंट); आवश्यक मापन अयशस्वी बंद                                          | **--ratchet सह अवरोधित करणे**                       |

### नोकरी: `docs-sync-strict`

प्रत्येक PR ते `main` वर चालते. अयशस्वी होण्यावर ब्लॉक्स विलीन होतात.

| स्क्रिप्ट                      | प्रमाणित करतो                                                                                                                                               | अवरोधित करणे                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | मेटा-गेट जे अनुक्रमे खालील 6 उप-गेट्स चालवते                                                                                                                | होय                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt आवृत्ती सुसंगतता                                                                                                              | होय                               |
| ↳ `check:docs-counts`          | गद्यातील संख्या (प्रदाता संख्या, स्थलांतर संख्या इ.) वास्तविक गणनेच्या रॅचेट विंडोमध्ये आहेत                                                                | होय                               |
| ↳ `check:env-doc-sync`         | `.env.example` मधील प्रत्येक env var हे डॉक्स टेबलमध्ये दस्तऐवजीकरण केले जाते आणि त्याउलट                                                                   | होय                               |
| ↳ `check:deprecated-versions`  | डॉक्समध्ये नापसंत आवृत्ती स्ट्रिंग नाहीत                                                                                                                    | होय                               |
| ↳ `check:doc-links`            | दस्तऐवजातील अंतर्गत मार्कडाउन दुवे वास्तविक फाइल्सचे निराकरण करतात (`[text]`/`(path)` फॉर्म)                                                                | होय                               |
| ↳ `check:fabricated-docs`      | कोडबेसमध्ये मार्ग, env vars, CLI कमांड्स, हुक नेम्स आणि डॉक्समध्ये उद्धृत केलेले फाइल पथ अस्तित्वात आहेत. `--strict` द्वारे हार्ड गेट; ध्वजशिवाय सॉफ्ट-फेल. | होय ( CI मध्ये `--strict` द्वारे) |
| `check:cli-i18n`               | CLI कमांड स्ट्रिंग सर्व i18n लोकॅल फाइल्समध्ये उपस्थित आहेत                                                                                                 | होय                               |
| `check:openapi-coverage`       | OpenAPI spec मध्ये वास्तविक मार्गांचा किमान एक रॅचेटेड मजला समाविष्ट आहे                                                                                    | होय                               |
| `check:openapi-security-tiers` | `openapi.yaml` मधील सुरक्षा स्तरावरील भाष्ये `routeGuard.ts` वर्गीकरणाशी सुसंगत आहेत                                                                        | **सल्लागार**                      |
| `check:openapi-routes`         | `openapi.yaml` मधील प्रत्येक मार्ग वास्तविक `route.ts` (विभ्रमविरोधी) साठी निराकरण करतो                                                                     | होय                               |
| `check:docs-symbols`           | `docs/**/*.md` मधील प्रत्येक `/api/...` संदर्भ वास्तविक `route.ts` (अँटी-हॅल्युसिनेशन) वर निराकरण करतो                                                      | होय                               |
| `i18n translation drift`       | i18n लोकॅल फाइल्समधील अनअनुवादित की फक्त चेतावणी —                                                                                                          | **सल्लागार**                      |

`docs/diagrams/` अंतर्गत बारा README SVGs व्युत्पन्न केले जातात (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ते सर्व पुन्हा निर्माण करते). प्रत्येकाची एक बाइट-तुलना युनिट चाचणी असते (`tests/unit/docs/readme-*-svg.test.ts`, जॉब `test-unit`) जी वचनबद्ध फाइल शिळी असताना अयशस्वी होते आणि `check:docs-counts` त्यांच्या `<text>` नोड्स — वरून कॅनॉनिकल संख्या वाचते, म्हणूनच बाह्यरेखा चरण फाइलमधील प्रत्येक बाह्यरेखा स्ट्रिंग अदृश्य `<text>` म्हणून ठेवते. SVG कॅनॉनिकल-नंबर चेक `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) मध्ये सूचीबद्ध केलेल्या फाइल्स वाचतो: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, प्लस `public/images/tier-flow-dark.svg` आणि `tier-flow-light.svg`; फ्री-एव्हर, कॅटलॉग-एंट्री, आवर्ती-पूल आणि स्कोअरिंग-फॅक्टर्सचे दावे `promise-pillars.svg`, `free-tier-budget.svg` आणि `strategies-grid.svg` देखील वाचतात. `free-tier-budget.svg` लाइव्ह कॅटलॉग लोडरवरून त्याचे आकडे काढते, त्यामुळे `FREE_MODEL_BUDGETS` किंवा प्रदात्याच्या डिस्प्ले नावात बदल केल्याने ती फाइल पुन्हा निर्माण होईपर्यंत CI लाल होते.

### नोकरी: `i18n-ui-coverage`

| स्क्रिप्ट                         | प्रमाणित करतो                                                                                                                                                                    | अवरोधित करणे |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n की कव्हरेज ≥ 65% आहे                                                                                                                                                     | होय          |
| `check-ui-value-drift` (इनलाइन)   | पुन्हा लिहिलेले इंग्रजी** मूल्य** कोणतेही शिळे भाषांतर मागे ठेवत नाही                                                                                                            | होय          |
| `check-new-key-coverage` (इनलाइन) | ए** नवीन** इंग्रजी की प्रत्येक लोकॅलमध्ये अनुवादित केली जाते — a `__MISSING__:` मार्कर नाकारला जातो                                                                              | होय          |
| `check-translation-ratio`         | प्रति लोकॅलचे वास्तविक-अनुवाद गुणोत्तर (एकसारखे-इंग्रजी / प्लेसहोल्डर / अनुमती यादीबाहेरची पाने गहाळ) `config/quality/i18n-translation-baseline.json` + slack पेक्षा जास्त नसावी | **सल्लागार** |

व्हॅल्यू-ड्रिफ्ट गेट मर्ज बेसच्या विरूद्ध `fetch-depth: 0` — `en.json` आहे.

#### `check-ui-value-drift` — शिळा-अनुवाद गेट

एक i18n रीग्रेशन पकडते जे इतर गेट्स संरचनात्मकदृष्ट्या पाहू शकत नाहीत: इंग्रजी मूल्य पुन्हा लिहिले जाते आणि _पूर्वी_ इंग्रजीमधून काढलेले भाषांतर मागे राहतात, त्यामुळे गैर-इंग्रजी वापरकर्ते आत्मविश्वासाने-शब्दयुक्त, आता-चुकीची कॉपी वाचत राहतात.

हे वास्तविक साठी पाठवले. जेव्हा Antigravity लॉगिन मदतनीस उतरला तेव्हा `oauthModal.googleOAuthWarning` पुन्हा लिहिला गेला (#5203);** 43 पैकी 39 लोकल** ऑपरेटरला "पूर्ण URL कॉपी करा आणि खाली पेस्ट करा" — मजकूर ठेवला जो त्या प्रदात्यासाठी पूर्ण होऊ शकत नाही. #8463 पर्यंत हे कोणाच्या लक्षात आले नाही कारण:

- `sync-ui-keys` फक्त बॅकफिल की आहेत** अनुपस्थित** , जे कधीच नाहीत** शिळा** ;
- `check-ui-keys-coverage` की _उपस्थिती_ मोजते, त्यामुळे शिळे भाषांतर कव्हर केले जाते;
- `check-translation-drift` `docs/i18n/<locale>/**.md` डॉक्युमेंटेशन मिरर — चा मागोवा घेते ते कधीही `src/i18n/messages/*.json` वाचत नाही. 2026-09 री-सिंक पासून जॉब `docs-sync-strict` मध्ये अवरोधित करणे: कोर डॉक → `npm run i18n:run -- --files=<doc>` संपादित करा (विभाग-स्तर, स्वस्त).

**फरक-जागरूक, बेसलाइन-बॅक्ड नाही.** हे मर्ज बेसवर `en.json` तुलना कार्यरत झाडाशी करते; प्रत्येक कीसाठी ज्याचे इंग्रजी मूल्य बदलले आहे, कोणतीही लोकॅल अद्याप अस्पृश्य भाषांतर धारण करणारी आहे. हे मुद्दाम** आधीच अस्तित्वात असलेले कर्ज गोठवते** — a diff हे दीर्घकालीन भाषांतर कोणत्या जुन्या इंग्रजीतून आले आहे हे उघड करू शकत नाही, म्हणून गेट फक्त वर्तमान बदल कशाला स्पर्श करतो हे ठरवतो. पर्यायी (प्रति-की हॅश बेसलाइन) साठी ~ 600 KB व्युत्पन्न केलेल्या फाइलची किंमत असेल, 3 × सर्वात मोठी विद्यमान आधाररेखा, प्रत्येक i18n PR वर मंथन होईल.

त्याचे समाधान करण्याचे दोन मार्ग:

1. प्रभावित भाषांतरे अद्यतनित करा, किंवा
2. रनटाइम त्यांना `__MISSING__:<new english>` — वर सेट करा नंतर दुरुस्त केलेले इंग्रजी (`src/i18n/request.ts::deepMergeFallback`, #7258) आणि भाषांतरासाठी मुख्य रांग देतात.

जर स्ट्रिंग असेल** अर्थ** बदलले, पसंत करा** की चे नाव बदलत आहे** : नवीन की जुन्या भाषांतराचा वारसा घेऊ शकत नाही. तो नमुना #8463 वापरला आहे.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

जेव्हा बेस कॅटलॉग वाचता येत नाही तेव्हा `SKIP reason=base-unresolved` सह 0 मधून बाहेर पडते (बेस रेफशिवाय उथळ क्लोन), मिररिंग `check-openapi-breaking`.

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

## वेग टप्पा (2026-08-30 → v4.0 LTS): प्रत्येक आधाररेषा 20% ने शिथिल केली

मालकाचा निर्णय (2026-08-30): v4.0 मॉड्युलरायझेशनपर्यंत, तांत्रिक ऋण मर्यादित ठेवण्यापेक्षा
रिलीजचा वेग अधिक महत्त्वाचा आहे. प्रत्येक **संख्यात्मक** रॅचेट आधाररेषा एका
लेखापरीक्षणयोग्य प्रक्रियेत 20% ने शिथिल केली गेली आणि हा टप्पा `config/quality/quality-baseline.json` मध्ये घोषित केला आहे:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| काय बदलले                                                                                                                                                                                                                    | कुठे                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — कमी असणे चांगले असलेल्या संख्या ×1.2, जास्त असणे चांगले असलेल्या टक्केवाऱ्या ÷1.2 (कव्हरेजची किमान मर्यादा 60 कायम, `eslintErrors` अजूनही 0, `eslintWarnings` 0 → गोठवलेल्या suppression संख्येच्या 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` नोंदीत प्रत्येक आधीचे → नंतरचे मूल्य दिले आहे)   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, प्रत्येक `frozen[*]` / `testFrozen[*]` ओळ मर्यादा ×1.2                                                                                                                                                     | `file-size-baseline.json`                                                                              |
| प्रत्येक फाइलमधील / प्रत्येक TS-कोडमधील संख्या ×1.2                                                                                                                                                                          | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` असताना `--require-tighten` सल्लात्मक होते                                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| रात्रीचे `bank-ratchet-shrinks` थांबते (ते मोजलेली घट नोंदवून उपलब्ध अतिरिक्त मर्यादा रद्द करेल)                                                                                                                             | `.github/workflows/nightly-release-green.yml`                                                          |

अनुमतीसूच्या (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) या अंदाजपत्रके **नाहीत** आणि त्यांना बदललेले नाही. उत्तीर्ण/अनुत्तीर्ण धोरण गेट्स (गुपिते, SQL नियम,
दस्तऐवज/env करार, i18n समतुल्यता, युनिट चाचण्या) अपरिवर्तित आहेत — लाल चाचणी अजूनही लाल चाचणीच आहे.

**साधने**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — एकदाच केली जाणारी
  शिथिलीकरण प्रक्रिया (`scripts/quality/relax-baselines.mjs`); समान नोंदीसह ती दुसऱ्यांदा चालवण्यास नकार देते.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI ज्या पद्धतीने प्रत्येक संख्यात्मक गेट मोजते त्याच पद्धतीने ते मोजते आणि प्रत्येक गेटसाठी उरलेली अतिरिक्त मर्यादा दाखवते
  (`scripts/quality/baseline-headroom.mjs`). रात्रीचे `baseline-headroom` कार्य
  workflow रनच्या सारांशात तक्ता प्रकाशित करते आणि त्याचा JSON/Markdown अहवाल
  `baseline-headroom-<run_id>` म्हणून अपलोड करते, जो 90 दिवस राखून ठेवला जातो. चेतावणी आणि गंभीर पंक्ती
  त्यांच्या कमाल मर्यादेच्या 10% च्या आत असलेले किंवा ती आधीच ओलांडलेले गेट्स ओळखतात. अंदाजपत्रके
  वापरली जात असल्याची पूर्वसूचना म्हणून या अहवालांचे पुनरावलोकन करा; संबंधित गेटच्या `_rebaseline_*` नोंदी तपासा. हे कार्य आता
  कायमस्वरूपी issue तयार किंवा अद्ययावत करत नाही; #12149 मध्ये आधीचा अहवाल इतिहास जतन केलेला आहे.

**नवीन-कोड मोड (Clean-as-You-Code) — 2026-08-30 पासून, केवळ PR जलद मार्ग**

`pull_request` इव्हेंटवर `quality.yml`, `check:file-size`,
`check:complexity-ratchets` आणि `check:dead-code` यांना `--base-ref <PR base SHA>` पाठवते. `check:complexity-ratchets` आणि
`check:dead-code` साठी गेट HEAD ची merge-base शी तुलना करते, पण ती तुलना **PR ने स्पर्श केलेल्या फाइल्सपुरती
मर्यादित असते** (`scripts/check/newCodeMode.mjs`: merge-base एका तात्पुरत्या
`git worktree` मध्ये प्रत्यक्ष तयार केला जातो, ESLint/knip तिथे आणि HEAD वर चालवले जातात आणि प्रत्येक फाइलमधील संख्यांचा diff काढला जातो):

- **अवरोधक** — PR ने बदललेल्या फाइल्समध्ये cyclomatic/cognitive उल्लंघने किंवा dead exports जोडले
  (लॉगमध्ये `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **सल्लात्मक** — गोठवलेल्या आधाररेषेच्या तुलनेत जागतिक एकूण संख्या. वारशाने आलेले विचलन निरपराध
  PR ला कधीही लाल करत नाही; रिलीज सामंजस्याच्या वेळी विचलन पुन्हा गोठवले जाते आणि headroom कार्याद्वारे त्यावर लक्ष ठेवले जाते.

`check:file-size` स्वतःच्या अटींनुसार base ref वापरते (`scripts/check/check-file-size.mjs`, #8522):
ते ट्रीमधील प्रत्येक स्रोत आणि चाचणी फाइल तपासते, `git show` वापरून PR base वरील प्रत्येक फाइलची ओळ संख्या वाचते
आणि एखादी फाइल तिची आधाररेषेची कमाल मर्यादा
(`frozen` / `testFrozen`, किंवा आधाररेषेबाहेरील फाइलसाठी `cap` / `testCap`) आणि तिचा base आकार यांपैकी मोठ्या मूल्यापलीकडे वाढली तरच तिला अनुत्तीर्ण करते.
त्यामुळे base वर आधीच विचलित झालेली फाइल निरपराध PR ला कधीही लाल करत नाही.

`check:boundary:ratchet` हाच नियम त्याच्या एकमेव संख्येला लागू करतो
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR इव्हेंट्सवर
`quality.yml` चे fast-gates आणि `ci.yml` मधील lint job हे दोन्ही PR चा base SHA पाठवतात, base commit चे
मोजमाप `git archive` export मधून केले जाते आणि PR मधील `open-sse → src` edge
ची संख्या `metrics.boundaryOpenSseToSrc` आणि base वरील संख्या यांपैकी मोठ्या संख्येपेक्षा जास्त असेल, तरच PR अयशस्वी होतो. कमाल मर्यादेपेक्षा अधिक असलेला base drift
नोंदवला जातो (`base drift herdado`), पण त्यामुळे निर्दोष PR कधीही अयशस्वी होत नाही; push → main
साठी निरपेक्ष कमाल मर्यादा कायम राहते आणि निराकरण न होऊ शकणाऱ्या base SHA च्या बाबतीत इशाऱ्यासह तिचाच fallback म्हणून वापर केला जातो.

`workflow_dispatch` runs, release-green sweep आणि nightly headroom job यांना PR base
नसतो आणि ते निरपेक्ष (global) तुलना कायम ठेवतात. Coverage, duplication आणि type-coverage सध्या
global राहतात (त्यांची tools कमी खर्चात per-file diff तयार करत नाहीत) — त्यांनाही अशीच पद्धत लागू करता येऊ शकते.

**v4.0 वर टप्पा पूर्ण करणे (LTS = पूर्वीपेक्षा अधिक काटेकोर, "पुन्हा नेहमीसारखे" नव्हे)**

1. शुद्ध `release/v4.0.0` tip वर: नोंदीसाठी `npm run quality:headroom --json`, त्यानंतर
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, प्रत्येक typecheck gate चे
   `--update` — प्रत्येक baseline मोजलेल्या मूल्यापर्यंत खाली येतो.
2. `quality-baseline.json` मधून `_policy` हटवा (`--require-tighten` आणि nightly
   banking पुन्हा सक्रिय होते), `check-openapi-coverage.mjs` मध्ये `THRESHOLD = 36` (किंवा अधिक) पुनर्स्थापित करा.
3. modularization चा फायदा झालेल्या ठिकाणी मोजलेल्या मूल्यापेक्षाही अधिक काटेकोर मर्यादा ठेवा: file-size `cap` पुन्हा 1000
   (किंवा 800), coverage floors +5, modularized packages साठी dead exports 0.

## रॅचेट बेसलाइन (`quality-baseline.json`)

रॅचेट इंजिन (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` वाचते
आणि त्याची नव्याने संकलित केलेल्या `quality-metrics.json` शी तुलना करते. जी कोणतीही मेट्रिक
तिच्या एप्सिलॉनच्या पलीकडे खालावते, ती बिल्ड अयशस्वी करते.

सध्या ट्रॅक केल्या जाणाऱ्या मेट्रिक्स:

| मेट्रिक               | दिशा   | अर्थ                                    |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLint इशाऱ्यांची संख्या वाढता कामा नये |
| `coverage.statements` | `up`   | स्टेटमेंट कव्हरेज कमी होता कामा नये     |
| `coverage.lines`      | `up`   | लाइन कव्हरेज कमी होता कामा नये          |
| `coverage.functions`  | `up`   | फंक्शन कव्हरेज कमी होता कामा नये        |
| `coverage.branches`   | `up`   | ब्रँच कव्हरेज कमी होता कामा नये         |

खरोखर सुधारणा झाल्यानंतर बेसलाइन अद्ययावत करण्यासाठी:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` फ्लॅग सध्याची मोजलेली मूल्ये `quality-baseline.json` मध्ये लिहितो.
मेट्रिक सुधारलेल्या बदलासोबत ही फाइल कमिट करा. मेट्रिक सुधारूनही बेसलाइन
अद्ययावत न करणारा PR `--require-tighten` द्वारे पकडला जाईल (टप्पा 6A.5,
अंमलबजावणी प्रलंबित).

### CodeQL रॅचेट: रीफ्रेश वारंवारता आणि मॅन्युअल ट्रिगर

`check:codeql-ratchet` **रिपॉझिटरीची स्थिती वाचतो, जी ठरावीक वेळापत्रकानुसार रीफ्रेश केली जाते — प्रत्येक PR साठी नाही.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` हे
`state: configured`, `schedule: weekly` नोंदवते: हे GitHub चे default-setup स्कॅन आहे, प्रत्येक पुशवरील
विश्लेषण नाही. परिणामतः: अलर्ट दुरुस्त करणारा PR मर्ज झाल्यानंतर, पुढील नियोजित स्कॅन
चालेपर्यंत रॅचेट जुनी, अधिक संख्या वाचत राहतो — त्यामुळे स्कॅन अद्ययावत होईपर्यंत
तो प्रत्येक खुल्या PR वर, दुरुस्ती करणाऱ्या PR च्या स्वतःच्या पुढील PR सह, रिग्रेशन नोंदवतो.

**मॅन्युअल रीफ्रेश**: `gh workflow run codeql.yml --ref release/vX.Y.Z` विश्लेषण पुन्हा
चालवते आणि काही मिनिटांत अलर्ट पुन्हा प्रकाशित करते. प्रथम `.github/workflows/codeql.yml`
वाचा — त्याच्या हेडरमध्ये स्पष्ट केले आहे की ते केवळ `workflow_dispatch` आहे, **कारण त्याचा
GitHub च्या "default setup" शी संघर्ष होतो** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ट्रिगर पुनर्स्थापित करण्यासाठी प्रथम **मालकाने कृती करणे** आवश्यक आहे: Settings → Code security →
CodeQL: Default → Advanced. तो बदल केल्याशिवाय `schedule:` ट्रिगर जोडू नका — त्यामुळे
केवळ अयशस्वी रन तयार होतील.

**संख्या कमी झाल्यानंतर बेसलाइन अधिक कडक करा** — `node scripts/check/check-codeql-ratchet.mjs
--update` नवीन मोजलेली संख्या `quality-baseline.json` →
`metrics.codeqlAlerts.value` मध्ये लिहिते, त्यामुळे रॅचेट जुन्या कमाल मर्यादेपर्यंतच्या रिग्रेशनला
गुपचूप परवानगी देत नाही. कार्य केलेले उदाहरण (2026-09-02/03): PR #12502 ने 7 वास्तविक अलर्ट
दुरुस्त केले (मोजलेले खुले अलर्ट 13 → 6); त्यानुसार PR #12530 ने गोठवलेली बेसलाइन 11 → 6 अशी
कडक केली; त्यानंतर उरलेले 6 अलर्ट प्रत्येक अलर्टसाठी स्वतंत्र समर्थन नोंदवून डिसमिस केले गेले
आणि खुल्या अलर्टची संख्या 0 झाली.

**डिसमिसल्स हा ऑपरेटरचा निर्णय आहे (कठोर नियम #14)** — डिसमिसल टिप्पणीमध्ये
तांत्रिक समर्थन नोंदवल्याशिवाय CodeQL अलर्ट कधीही डिसमिस करू नका: अपस्ट्रीम-प्रोटोकॉलच्या
आवश्यकतेसाठी `won't fix`, चाचणी फिक्स्चरसाठी `used in tests`, CodeQL ला न दिसणाऱ्या
सॅनिटायझरसाठी `false positive` (पूर्वोदाहरण: `docs/security/ERROR_SANITIZATION.md`).

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

## अनुमत धोरण

प्रत्येक गेट जो आधीपासून अस्तित्वात असलेल्या उल्लंघनांवर अयशस्वी होऊ शकत नाही तो गोठविलेल्या अनुमत सूचीचा वापर करतो (उदा. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). धोरण आहे:

**मूळ कारण निश्चित करा; जेव्हा उल्लंघन आधीच अस्तित्वात असेल आणि त्याच PR मध्ये निश्चित केले जाऊ शकत नाही तेव्हाच अनुमत सूची वापरा.**

अनुमत सूचीमध्ये एंट्री जोडताना:

1. औचित्य सह टिप्पणी समाविष्ट करा.
2. ट्रॅकिंग समस्येचा संदर्भ घ्या (उदा. `// #3498 — Phase 2 feature, not yet implemented`).
3. त्याच PR मधील एंट्री काढून टाका जी उल्लंघनाचे निराकरण करते — ही एक शिळी एंट्री जी यापुढे सक्रिय उल्लंघनास दडपून ठेवत नाही ही एक दोष आहे (6A.3 शिळा-अंमलबजावणी एकदा लागू झाल्यानंतर अनाथ अनुमतीदार एंट्रीवर गेट अयशस्वी होईल).

करा** नाही** चाचण्या जलद उत्तीर्ण होण्यासाठी अनुमत एंट्री जोडा. वाढत्या अनुमत सूचीसह हिरवा गेट हा गुणवत्तेचा चुकीचा अर्थ आहे.

### जेव्हा तुमच्या PR वर गेट अयशस्वी होते

1. **गेट आउटपुट काळजीपूर्वक वाचा** — हे तुम्हाला नेमके कोणत्या फाइल किंवा चिन्हाने नियमाचे उल्लंघन केले आहे ते सांगते.
2. **उल्लंघनाचे निराकरण करा** — बहुतेक गेट्स हे निर्धारक फाइल सिस्टम चेक आहेत जे कोड योग्य होताच पास होतात.
3. **उल्लंघन आधीच अस्तित्वात असल्यास** (म्हणजे, तुम्ही त्याची ओळख करून दिली नाही पण गेट आता ते कव्हर करते): औचित्य टिप्पणी आणि ट्रॅकिंग समस्येसह अनुमती एंट्री जोडा.
4. **जर गेट एक रॅचेट असेल** (कव्हरेज, ESLint चेतावणी, डुप्लिकेशन, जटिलता): तुमच्या बदलामुळे मेट्रिक आणखी वाईट झाले. अंतर्निहित समस्येचे निराकरण करा, किंवा (क्वचितच) बदल हेतुपुरस्सर असल्यास `npm run quality:ratchet -- --update` चालवा आणि मेट्रिक डिग्रेडेशन स्वीकार्य — असेल परंतु PR वर्णनामध्ये का ते दस्तऐवज करा.
5. **सल्लागार गेट्स** (`continue-on-error: true`) माहितीपूर्ण — आहेत ते विलीनीकरण अवरोधित करत नाहीत परंतु CI सारांशात दिसतात. तरीही त्यांचे निराकरण करा.

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

## तर्कशुद्धीकरण अनुशेष (ROI पुनरावलोकन — फेस 9 ओंडा 3)

ही यादी 2026-06-17 रोजी `ci.yml` विरुद्ध समेट केली गेली (पूर्वीच्या आवृत्तीत `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` वगळण्यात आली होती). सामंजस्य संचाच्या ROI पुनरावलोकनाने खालील तर्कसंगत उमेदवार ओळखले.** विलीनीकरण यांत्रिक CI बदल आहेत; flips/drops हे ऑपरेटरसाठी राखीव असलेले धोरणात्मक निर्णय आहेत.** खालील काहीही अद्याप लागू केलेले नाही.

**तसेच वरील अदस्तांकित** (सल्लागार, कमी सिग्नल): `docs-lint` जॉब (मार्कडाउनलिंट + वेले, संपूर्ण जॉब `continue-on-error`) आणि स्टँडअलोन स्कॅनर वर्कफ्लो `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` `quality-baseline.json` मध्ये आहे परंतु `ci.yml` — मधील ब्लॉकिंग रॅचेटशी वायर्ड नाही मेट्रिक सध्या अनाथ आहे.

### मर्ज / डिडअप (यांत्रिक, कमी धोका)

2026-06-17 रोजी प्रत्येक उमेदवाराचे थेट गेट स्टेट विरुद्ध प्रमाणीकरण करण्यात आले (विश्वास-पण-पडताळणी); कर्ज लपविण्यासाठी अनेक "स्पष्ट" विलीनीकरण झाले आणि आहेत** नाही** स्वच्छ ड्रॉप-इन.

- **`check:docs-sync` दोनदा धावतो** `lint` जॉबमध्ये — स्टँडअलोन आणि पुन्हा `check:docs-all` (`docs-sync-strict`) आणि हस्की प्री-कमिट हुकमध्ये. ✅**DONE** — स्टँडअलोन `lint` आवाहन काढले.
- **CVE स्कॅनिंग** — ❌**NOT स्वच्छ विलीनीकरण.** सध्याच्या धोरणांतर्गत उच्च सल्ल्यांचा इशारा म्हणून अहवाल देताना, `audit:deps` सर्व पाच लॉकफाईल्समधील गंभीर सल्ला आणि अपूर्ण ऑडिट अवरोधित करते; `check:vuln-ratchet` (osv) फक्त चेक-इन बेसलाइन विरुद्ध _regression_ वर अपयशी ठरते आणि आवश्यकतेनुसार गहाळ माप नाकारते. भिन्न अर्थशास्त्र — ड्रॉपिंग `audit:deps` परिपूर्ण गंभीर गेट आणि स्वतंत्र पॅकेज ऑडिट पावत्या गमावेल. दोन्ही ठेवा.
- **सायकल ओळख** — ✅**DONE** (#15159 G-01/G-02) येथील जुन्या मजकुराला `check:cycles` "हिरवा, क्युरेटेड" गेट म्हटले आहे आणि ते ब्लॉक करणे उचित आहे कारण `check:circular-deps` (dpdm) ने 91 चक्रे नोंदवली आहेत. ती हिरवी ए** खोटे हिरवे** : `check:cycles` 5 उपनिर्देशिका (450 फाईल्स) स्कॅन केल्या, फक्त स्थिर `import|export … from` शी जुळल्या, आणि प्रत्येक `@/` आणि `@omniroute/open-sse/` स्पेसिफायर टाकला, त्यामुळे ते रेपोवर वर्चस्व गाजवणारे डायनॅमिक-इम्पोर्ट + उर्फ चक्र पाहू शकले नाहीत. निश्चित: गेट आता `src` + `open-sse` (5023 फाइल्स) वर चालते, TypeScript AST वरून स्पेसिफायर गोळा करते (म्हणून `import("…")` मोजले जाते आणि `typeof import("…")` टाइप-पोझिशन करत नाही), आणि tsconfig `paths` निराकरण करते. ते सापडते** 14** चक्र, 0 नाही. कारण 14 पूर्व-अस्तित्वात असलेली चक्रे एका गेट PR मध्ये निश्चित केली जाऊ शकत नाहीत, `check:cycles` आता एक आहे** रॅचेट** (`--ratchet`, `quality-baseline.json` मध्ये `metrics.cycles.value = 14`, `direction: down`) — हे कोणतेही _रिग्रेशन_ अवरोधित करते आणि मोजणी फक्त कमी होऊ शकते. CI `npm run check:cycles:ratchet` चालवतो. सह बर्न-डाउन सवारी**A-01** . `check:circular-deps` (dpdm) व्यापक द्वितीय मत म्हणून सल्लागार राहते.
- **गुंतागुंत** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint चालणे, ruleId द्वारे मोजले जाते त्यामुळे चक्रीय + कमाल-रेषा आणि संज्ञानात्मक आधाररेषा स्वतंत्र राहतात; वैयक्तिक `check:complexity` / `check:cognitive-complexity` स्थानिक `--update` साठी राहतील.
- **`/api` विरोधी मतिभ्रम** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` एक FS यादी, openapi-routes + डॉक्स-प्रतीक अजूनही स्वतंत्रपणे अहवाल देतात; लोक स्थानिक धावांसाठी राहतात.
- **`check:node-runtime` 11 नोकऱ्यांमध्ये चालते** — ⚠️** कमी ROI** प्रत्येक स्वतंत्र धावपटू आहे आणि चेक < 1s आहे; एकूण बचत ~ 10s, स्वस्त प्रति-जॉब गार्ड गमावण्याविरूद्ध. मंथनाची किंमत नाही.
- **`typecheck:noimplicit:core` वर CI लिंट** — ✅** लिंट नोकरीतून काढून टाकले** (सल्लागार `continue-on-error`); ब्लॉकिंग प्रकार पृष्ठभाग `typecheck:core` + `check:type-coverage` आहे. स्थानिक लिपी कायम ठेवली.

### फ्लिप / निर्णय (ऑपरेटर धोरण)

- `check:openapi-security-tiers` (सल्लागार) — ❌**NOT स्वच्छपणे flippable.** ते 0 मधून बाहेर पडते परंतु चेतावणी देते की `LOCAL_ONLY_API_PREFIXES` अंतर्गत अनेक `traffic-inspector` मार्गांमध्ये `x-loopback-only: true` भाष्य नाही. त्याची अंमलबजावणी करण्यासाठी ती भाष्ये प्रथम `openapi.yaml` मध्ये जोडणे आवश्यक आहे.
- `typecheck:noimplicit:core` (सल्लागार) — मोठ्या प्रमाणात ब्लॉकिंग `check:type-coverage` रॅचेटद्वारे समाविष्ट केले जाते. रॅचेटवर फ्लिप करा किंवा अनावश्यक दुसरा `tsc` पास ड्रॉप करा.
- `test:vitest:ui` (आता** अवरोधित करणे** ) — पूर्व-विद्यमान अपयश स्पष्टपणे `// #8618` ट्रॅकिंग टिप्पण्यांसह `vitest.config.ts` मध्ये वगळण्यात आले आहेत; नवीन अपयश काम अयशस्वी.
- `check:secrets` (gitleaks, 3 दस्तऐवजीकरण केलेल्या खोट्या-पॉझिटिव्हवर गोठवलेले रॅचेट ब्लॉक करणे) — 3 ला 0 पर्यंत पोहोचण्याची परवानगी देते किंवा सल्लागारात अवनत करते. GitHub मूळ गुप्त-स्कॅनिंग + `check:public-creds` ओव्हरलॅप करते.
- `check:pr-evidence` (ब्लॉकिंग, greps PR-बॉडी गद्य) — उच्च खोटे-सकारात्मक धोका; वगळल्यास कठोर नियम #18 अंमलबजावणी कमकुवत करते, म्हणून हा एक वास्तविक धोरण कॉल आहे.
- `semgrep` (सल्लागार स्टँडअलोन) OWASP कुटुंबांसाठी — ओव्हरलॅप CodeQL ; त्याच्या बेसलाइनला रॅचेट किंवा ड्रॉपवर वायर करा.

---

## संबंधित दस्तऐवजीकरण

- पुरवठा-साखळी (उत्पत्ती, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — की-संच समानता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, जॉब `i18n-ui-coverage`).
प्रत्येक `src/i18n/messages/<locale>.json` मधील लीफ की-संचाची `en.json` शी तुलना करते आणि
की कधी जोडली गेली याची पर्वा न करता, कोणतीही लीफ अनुपस्थित किंवा अतिरिक्त असल्यास अपयशी ठरते.
`__MISSING__:` प्लेसहोल्डर उपस्थित म्हणून मोजले जातात (त्यांचा मजकूर हा गुणोत्तर गेटचा विषय आहे).
हे दोन diff-आधारित/टक्केवारी गेटचे पूर्णतः पूरक आहे: `check-ui-keys-coverage` प्रत्येक
लोकेलसाठी 80 % ची किमान मर्यादा लागू करते (~13,000 पैकी 43 की अनुपस्थित असल्या तरीही 99.7 %
दिसते) आणि `check-new-key-coverage` फक्त PR ने `en.json` मध्ये जोडलेल्या की तपासते.
लोकेल बॅचची शाखा ज्या दिवशी तयार केली जाते, त्या दिवसाच्या `en.json` वरून ती निर्माण होते आणि
बेसमध्ये नवीन की जोडल्या जात असताना अनेक दिवस भाषांतर सुरू राहते; बॅच PR स्वतः कोणतीही की जोडत
नाही, त्यामुळे बॅच 1 (#13044) नऊ लोकेलमध्ये 43 की कमी असताना आणि बॅच 2 (#13660) आठ लोकेलमध्ये
10 की कमी असताना समाविष्ट झाली, तरी दोन्ही संबंधित गेट शांत राहिले (2026-09-15). लाल स्थितीचे
निराकरण करण्यासाठी `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`
वापरा; `extra` लीफचा अर्थ स्रोतामधून ती काढून टाकली आहे — ती लोकेलमधून हटवा.
`--warn` अपयशी न ठरवता अहवाल देते. `--catalog=cli` हेच तुलनात्मक परीक्षण
`bin/cli/locales` वर चालवते (`npm run i18n:check-keys:cli`); दोन्ही पायऱ्या
`i18n-ui-coverage` जॉबमध्ये आहेत.

#### `check-new-key-coverage` — नवीन-की i18n गेट

`check-ui-value-drift` चे संबंधित गेट. ते इंग्रजी मूल्य **पुन्हा लिहिले** गेले असताना त्याची
भाषांतरे मागे राहिल्याचे शोधते; हे गेट इंग्रजी की **जोडली** गेली असताना काही लोकेलना ती
कधीच मिळाली नसल्याचे शोधते.

`check-ui-keys-coverage` या प्रकारची समस्या शोधू शकत नाही: ते प्रत्येक लोकेलसाठी टक्केवारीची
किमान मर्यादा लागू करते आणि ~13,000 पैकी अकरा की अनुपस्थित असल्या तरी कव्हरेज 99.9% राहते.
प्रत्येक भाषेची टक्केवारी "हे वैशिष्ट्य भाषांतराशिवाय प्रदर्शित झाले" हे व्यक्त करू शकत नाही —
संपूर्ण वैशिष्ट्य मजकुराविना नवीन लोकेलमध्ये दाखल होऊ शकते आणि तरीही आकडा अजिबात बदलत नाही.

हे ज्या घटनेची नोंद ठेवते ती अशी: Orchestration Canvas च्या Phase 3 मधील अकरा कींचे त्या वेळी
अस्तित्वात असलेल्या 42 लोकेलमध्ये भाषांतर झाले. काही तासांनंतर EU-भाषा बॅचने (#13044) रेपोची
लोकेल-संख्या 51 केली आणि नऊ नव्या लोकेलना (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
त्या की कधीच मिळाल्या नाहीत. अनुपस्थित कीसाठी `deepMergeFallback` इंग्रजी मजकूर वापरते,
त्यामुळे अपयशाचा परिणाम रिकाम्या UI ऐवजी भाषांतर न झालेल्या UI च्या स्वरूपात झाला — प्रत्यक्ष,
आणि रचनेनुसार निःशब्द.

त्याच्या संबंधित गेटप्रमाणे हेही **diff-जागरूक** आहे; ते मर्ज बेसवरील इंग्रजीची वर्किंग ट्रीशी
तुलना करते, त्यामुळे आधीपासून असलेल्या त्रुटी तशाच स्थिर राहतात आणि गेट सुरू करण्यासाठी
कोणतेही मायग्रेशन आवश्यक नव्हते.

**`__MISSING__:<english>` मार्कर ही अट पूर्ण करत नाही (2026-09-17 पासून).** पूर्वी तो
दस्तऐवजीकृत स्थगितीचा पर्याय होता — रनटाइम योग्य इंग्रजीवर फॉलबॅक होते — पण 2026-09-16 रोजी
आठ वैशिष्ट्य PR नी 61 की जोडल्या आणि भाषांतर करण्याऐवजी सर्व 65 लोकेलमध्ये मार्कर लावला:
या गेटने प्रत्येक PR स्वीकारला, कोणताही PR रोखला गेला नाही आणि त्यानंतर ब्लॉकिंग
वास्तविक-भाषांतर गुणोत्तर गेट सर्वांसाठी रिलीज टिपवर अपयशी ठरले (pt-BR 3.2 % > 2.5 % + 0.5).
आता मार्करला अनुपस्थित भाषांतर मानले जाते. लाल स्थितीचे निराकरण करण्यासाठी
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
वापरा किंवा `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
डिटॅच्ड-सुरक्षित, `OMNIROUTE_TRANSLATION_*` env शिवाय सुरू होण्यास नकार देते) वापरून सर्व
लोकेलचे समांतर भाषांतर करा. जी की इंग्रजीतच राहणे आवश्यक आहे (पिन केलेले
उत्पादन/इंजिन/फ्लॅग नाव), ती `scripts/i18n/untranslatable-keys.json` मध्ये असली पाहिजे,
मार्करच्या मागे कधीही नाही. `vi` मध्ये मार्करवर पूर्ण बंदी आहे
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — बाजूला ठेवलेल्या चाचण्यांचे गेट

`vitest.config.ts` च्या `exclude` यादीतील फाइल ही न चालणारी चाचणी असते, आणि ट्री वाचणाऱ्या
व्यक्तीला ती कव्हरेजसारखी दिसते. बासष्ट फाइल खालील टिप्पणीच्या मागे जमा झाल्या:
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Issue #8618
2026-08-11 रोजी बंद करण्यात आला, पण त्याने ट्रॅक केलेली यादी 45 नोंदींवरून 62 नोंदींपर्यंत
वाढली; प्रत्येक नवीन नोंदीला बंद झालेल्या issue कडे निर्देश करणारी टिप्पणी वारशाने मिळाली.
शेवटी यादीतील प्रत्येक फाइल स्वतंत्रपणे मोजली गेली तेव्हा (#13204), **62 पैकी 51 फाइल कोणताही
स्रोत-बदल न करता वर्तमान ट्रीवर यशस्वी झाल्या**.

वास्तविक फाइलमध्ये रूपांतरित होणाऱ्या प्रत्येक exclusion ने (a) ट्रॅकिंग issue चे नाव देणे आणि
(b) त्याच्या मोजलेल्या स्थितीसह `config/quality/vitest-exclusions.json` मध्ये दिसणे हे गेट
अनिवार्य करते, जेणेकरून एखादी exclusion जोडणे म्हणजे 60-नोंदींच्या अॅरेमध्ये आणखी एक ओळ
जोडण्याऐवजी स्वतंत्र फाइलमधील पुनरावलोकनयोग्य diff ठरेल. हे मुद्दाम वगळलेल्या चाचण्या पुन्हा
चालवत नाही — त्यासाठी ~10 मिनिटे लागतात आणि ते नियतकालिक जॉबमध्ये असायला हवे; प्रत्येक चाचणी
शेवटची कधी मोजली गेली याची नोंद इन्व्हेंटरीमध्ये असते.
