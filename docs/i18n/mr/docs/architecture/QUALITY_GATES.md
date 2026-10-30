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

### उमेदवाराचा प्रवेश

CI आणि Quality Gates वर्कफ्लो प्रत्येकी एक स्थिर निकाल देतात: `Gate / CI` आणि
`Gate / Quality`. त्यांच्या आवृत्तीबद्ध प्रवेश धोरणात प्रत्येक अपस्ट्रीम जॉब
आवश्यक किंवा सल्लागार म्हणून नमूद केला आहे. लागू असलेला आवश्यक जॉब यशस्वी झाला पाहिजे:
गहाळ, रद्द केलेले, वगळलेले, प्रलंबित आणि अज्ञात निकाल PASS सिद्ध करू शकत नाहीत. वैध
केवळ-दस्तऐवज किंवा केवळ-कॅटलॉग वर्गीकरणामुळे कोड लेन अनुपयुक्त ठरू शकते;
मसुदा PR हा स्वीकारलेला उमेदवार नाही. `hotfix` लेबलामुळे पुराव्याची आवश्यकता माफ होत नाही.

दोन्ही वर्कफ्लो main/release शाखांमधील PR, `main` वरील पुश, मॅन्युअल डिस्पॅच
आणि merge-group इव्हेंट समाविष्ट करतात. पुश, डिस्पॅच आणि merge-group संपूर्ण निवड चालवतात.
`release/**` वरील पुश त्यांना सुरू करत नाहीत (2026-10-18): प्रत्येक बदलावर त्याच्या PR मध्ये
मॅट्रिक्स आधीच चालवला गेला आहे आणि विलीन केलेल्या संयोजनाची तपासणी करणे हे Release-Green चे काम आहे
(`docs/ops/RUNNER_BOX.md` → Hosted लेन). फोर्क आणि merge group अशा जॉबसाठी hosted runner
वापरतात जे अन्यथा self-hosted runner निवडतात; रोलआउटपूर्वी पुरेशी hosted क्षमता
सत्यापित केली पाहिजे.

प्रत्येक JSON पावती तपासलेला SHA, वर्कफ्लो रन आणि प्रयत्न ओळखते.
CLI checkout/event SHA विसंगती नाकारते. वर्कफ्लो चाचण्या धोरणातील सदस्यत्व
निकाल देणाऱ्या जॉबच्या `needs` सूचीशी बांधतात, त्यामुळे नवीन किंवा काढलेली लेन नकळत अदृश्य होऊ शकत नाही.
पावत्या त्यांच्या स्वतःच्या कार्यप्रवाहापुरत्याच मर्यादित आहेत; प्रकाशन, उपयोजन किंवा विद्यमान सल्लागार स्कॅनरच्या अंतर्गत बाबी त्यांत समाविष्ट नाहीत. लागू असलेल्या तपासण्या शाखा नियमांमध्ये अनिवार्य करणे हा स्वतंत्र प्रशासकीय बदल आहे; त्यांच्या जॉब्सची व्याख्या केल्यानेच एखाद्या शाखेला संरक्षण मिळत नाही.

`API Route Typecheck` ही दोन्ही एकत्रित निर्णयांपासून आणि स्थानिक पूर्ण निरीक्षकाच्या स्थिर प्रोफाइलपासून स्वतंत्र असलेली कार्यप्रवाह तपासणी आहे. नेमक्या उमेदवारासाठी तिचा निकाल स्वतंत्रपणे तपासा. `.github/workflows/api-route-typecheck.yml` हे `main` किंवा `release/**` मध्ये येणाऱ्या PRs वर, यापैकी कोणत्याही शाखा-कुटुंबात होणाऱ्या pushes वर आणि manual dispatch वर चालते. त्यात कोणताही path filter नाही. PR base retargets नवीन तपासणीची विनंती करतात; body/title मधील संपादने केवळ-निरीक्षण नाव `Admission not requested / API Route Typecheck` वापरतात आणि प्रवेश तपासणीची जागा घेऊ शकत नाहीत. हा कार्यप्रवाह merge-group trigger घोषित करत नाही. ही तपासणी अनिवार्य करणाऱ्या कोणत्याही merge-queue rollout ने प्रथम त्या event साठी तिची अंमलबजावणी स्थापित करणे आवश्यक आहे.

### UI अंमलबजावणी क्षमता

CI संपूर्ण UI इन्व्हेंटरी चार `test-vitest` मॅट्रिक्स शार्ड म्हणून चालवते, प्रत्येकात जास्तीत जास्त
दोन worker आणि विद्यमान 15-मिनिटांची जॉब मर्यादा असते. पहिला शार्ड
MCP/autoCombo Vitest suite देखील चालवतो. आवश्यक जॉब निकालात प्रत्येक मॅट्रिक्स लेग समाविष्ट असतो;
एका शार्डचे अपयश किंवा रद्द होणे उमेदवाराचा प्रवेश सिद्ध करू शकत नाही.

nightly observer प्रत्येक UI शार्डसाठी स्वतंत्र अचूक-उमेदवार पावती राखून ठेवतो,
ज्यात पहिल्या पावतीमधील MCP अंमलबजावणीचाही समावेश असतो. सर्व चार पावत्या, लॉग आणि जुळणाऱ्या
अंमलबजावणी ओळखी आवश्यक आहेत. स्थानिक `npm run test:vitest:ui` अजूनही
संपूर्ण suite निवडते; एक `--shard` रन हा केवळ अपूर्ण पुरावा आहे.

### युनिट कव्हरेज संकलन

बारा युनिट शार्ड त्यांच्या विद्यमान चाचणी अंमलबजावणीदरम्यान V8 कव्हरेज संकलित करतात. यशस्वी
शार्ड मध्यवर्ती Istanbul रिपोर्ट निर्माण न करता मूळ फाइल्स संकुचित करण्यासाठी
`scripts/ci/compact-v8-coverage.mjs` चालवतो. अंतिम Coverage जॉब उमेदवार SHA,
runtime, source root आणि data hash यांच्या संदर्भात सर्व बारा manifest सत्यापित करतो, त्यानंतर c8 चे
reporter आणि विद्यमान कव्हरेज threshold चालवतो. इनपुटमध्ये c8 चा जागतिक filename क्रम कायम ठेवला जातो;
मिश्र function/block कव्हरेजसाठी प्रति-शार्ड पूर्व-विलीनीकरण असुरक्षित आहे. गहाळ, विकृत किंवा विसंगत
शार्डमुळे प्रवेश अयशस्वी होतो. अयशस्वी test shard चे raw diagnostic coverage स्वतंत्रपणे राखले जाते;
ते अंतिम विलीनीकरणात समाविष्ट होऊ शकत नाही.

### युनिट अंमलबजावणीच्या प्रगतीच्या नोंदी

सामायिक `test:unit:ci:shard` कमांड `scripts/ci/unit-progress-reporter.mjs` द्वारे `primary`, `dashboard` आणि `serial`
टप्प्यांची नोंद करते. सामान्य चाचणी अहवाल उपलब्ध राहतो.
केवळ मेटाडेटा असलेली स्वतंत्र नोंद प्रत्येक फाइलचा प्रारंभ आणि पूर्णता नोंदवते,
आणि 30-सेकंदांची हार्टबीट अद्याप सक्रिय असलेल्या फाइल्स व त्यांचा व्यतीत झालेला वेळ दर्शवते. ती
केवळ अनुमत-सूचीतील अंमलबजावणी मेटाडेटा नोंदवते; चाचणी वर्णने, आउटपुट, त्रुटींचा मजकूर आणि संपूर्ण
वातावरण क्रमबद्ध केले जात नाही.

CI आणि Quality JSONL फाइल्स `unit-progress-ci-<run>-<attempt>-<shard>` आणि
`unit-progress-quality-<run>-<attempt>-<shard>` म्हणून राखून ठेवतात. जॉब टाइमआउटमुळे नंतरचे अपलोड रोखले जाऊ शकते;
आधीच पाठवलेल्या हार्टबीट्स निदानात्मक पुरावा म्हणून उपलब्ध राहतात. हार्टबीट्स नसणे हे
अवरोधित किंवा समाप्त झालेल्या रनर प्रक्रियेचेही निदर्शक असू शकते. या नोंदी विद्यमान चाचणी निवड,
समवर्ती अंमलबजावणी, अंतिम मुदती आणि निर्गमन स्थिती जतन करतात; त्या उमेदवार-स्वीकृतीचे निर्णय नाहीत.

### स्वीकृती निकाल एकत्र करणाऱ्या घटकातील जतन केलेले पुरावे

`scripts/quality/validate-release-acceptance.mjs` दिलेली योजना आणि तिचे मॅनिफेस्ट एकत्र करतो; योजना संपूर्ण रिलीज पाइपलाइन व्यापते हे तो सिद्ध करत नाही. योजना `VERIFIED` असली तरी त्याचे अहवाल स्पष्टपणे `releaseAcceptance: false` सेट करतात. `release-acceptance.yml` वर्कफ्लो अजूनही शॅडो टेस्ट फिक्स्चर वापरतो, प्रत्यक्ष बिल्ड, पॅकेज, बूट किंवा प्रमोशनच्या पावत्या नाही.

जतन केलेले पुरावे पडताळण्यासाठी CLI ला `--evidence-root` आवश्यक आहे. फाइल्स `<evidence-root>/<artifact_id>/<member>` या मार्गावर शोधल्या जातात आणि त्यांचा SHA-256 हॅश काढला जातो. पुराव्याविना PASS नोंद, गहाळ किंवा बदललेली फाइल, असुरक्षित मार्ग किंवा सिमलिंक पडताळणी रोखते. गहाळ फाइल्स यशस्वी रनच्या रिकाम्या लॉगसारख्या नाहीत. विद्यमान SHA/run/attempt तपासण्या स्वतंत्र राहतात: बाइट जुळले तरी जुनी पावती वैध होत नाही. फाइलची अखंडता ही प्रत्यक्ष अंमलबजावणीच्या अस्सलपणाचा किंवा आर्टिफॅक्टच्या प्रमोशनचा पुरावा नाही.

### स्थिर स्कॅन इन्व्हेंटरी

आवृत्तीबद्ध npm-alias इन्व्हेंटरी आणि static-scan सदस्यत्व
`config/quality/gate-manifest.json` मध्ये आहे. script नावे आणि अचूक command
`package.json` च्या संदर्भात सत्यापित करण्यासाठी `npm run check:gate-manifest` चालवा; भर, काढणे आणि
command drift यांमुळे स्थानिक hook आणि CI मधील change-classification जॉब दोन्ही अयशस्वी होतात.
alias म्हणजे workflow job, matrix instance किंवा test case नव्हे: या संख्या
परस्परविनिमययोग्य म्हणून सादर करू नयेत.

निवडलेले alias कार्यान्वित न करता तपासण्यासाठी `npm run quality:scan -- --list` किंवा
`npm run quality:scan:fast -- --list` वापरा. runner npm entrypoint वापरतो,
त्यामुळे त्याचा runtime (कॉन्फिगर केलेल्या ठिकाणी Bun सह) जतन केला जातो.
manifest या प्रोफाइलबाहेरील alias स्वतंत्रपणे वापरलेले म्हणून नोंदवतो आणि
read-only scan profile मध्ये maintenance command निषिद्ध आहेत.

ही प्रोफाइल केवळ static scan चा समावेश करतात. ती product test,
coverage, packaging, external check किंवा उमेदवाराची संपूर्ण release acceptance प्रमाणित करत नाहीत.
Workflow admission लिंक केलेले `config/quality/admission-policy.json` आणि
`scripts/quality/admission-verdict.mjs` वापरते. Release-observer प्रोफाइल स्वतंत्र राहतात;
त्यांच्या लागू असलेल्या check आणि receipt स्वतंत्रपणे तपासा. पूर्ण observer चे static
command `config/quality/release-green-static-profile.json` मध्ये घोषित केले आहेत, ज्यामध्ये
`audit:deps`, mutation-test selection आणि translation check यांचा समावेश आहे. loader npm
command चे package.json आणि मॉडेल केलेल्या CI/Quality घोषणांच्या संदर्भात सत्यापन करतो; तो shell token
argument म्हणून कार्यान्वित करण्याऐवजी drift नाकारतो. आवश्यक scanner SKIP/INCOMPLETE output
PASS सिद्ध करू शकत नाही. प्रोफाइल त्याचे external exclusion नोंदवते आणि
hosted coverage, test matrix, package किंवा deployment evidence ची जागा घेत नाही. खालील वर्णनात्मक इन्व्हेंटरी
हा संदर्भ आहे; एखादा gate प्रत्यक्षात चालला याचा पुरावा नाही.

Script `scripts/check/` (policy gate) आणि `scripts/quality/` (ratchet engine) अंतर्गत आहेत.
CI साठी सत्याचा अधिकृत स्रोत `.github/workflows/ci.yml` आहे.

### प्रकाशित-बेस दस्तऐवजीकरणाचे आरोग्य

`.github/workflows/i18n-base-health.yml` हे `main` आणि `release/v*` वर निवडक pushes झाल्यानंतर तसेच manual dispatch केल्यावर दस्तऐवजीकरणाच्या आरोग्याचे निरीक्षण करते. त्याचे filters दस्तऐवजीकरण, root Markdown, `llm.txt`, भाषांतराची स्थिती/कॉन्फिगरेशन आणि संबंधित i18n tooling समाविष्ट करतात. एकमेव `Published base documentation health` job hosted Ubuntu वापरतो आणि त्याची कालमर्यादा पाच मिनिटांची आहे. तो केवळ-वाचन validation करतो आणि dependency installation, भाषांतर किंवा state adoption न करता diagnostic receipt लिहितो.

`scripts/i18n/check-base-health.mjs` साठी source-hash, गहाळ target, target-hash, कालबाह्य भाषांतर आणि section-cache यांशी संबंधित कोणतीही विसंगती नसणे आवश्यक आहे. तो सध्याच्या core document/locale scope चे आणि त्याच्या नोंदवलेल्या provenance चेही validation करतो. अवैध context, अपूर्ण coverage किंवा व्यत्यय आलेला checker यांमुळे `INCOMPLETE` तयार होते; पुष्टी झालेल्या drift मुळे `FAIL` तयार होते. दोन्ही प्रकरणांत अपयश दर्शवणारा exit status परत केला जातो. receipt हे checkout SHA, workflow, run आणि attempt यांच्याशी बांधलेले असते आणि `i18n-base-health-<sha>-<run>-<attempt>` म्हणून जतन केले जाते.

हे प्रकाशित base चे स्वतंत्र निरीक्षण आहे. ते PR किंवा merge-group event, आवश्यक PR check, npm alias किंवा static-scan profile member जोडत नाही. विद्यमान differential PR policy आणि अंतर्निहित checker ची advisory classifications स्वतंत्रच राहतात. यशस्वी upload मुळे अयशस्वी health result चे PASS मध्ये रूपांतर होऊ शकत नाही.

### Release PR जलद मार्ग (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main` वरील पुश,
dispatch आणि merge group साठी CI ला पूरक ठरते. PR path-filtered जलद check वापरतात. कायमस्वरूपी
अक्षम केलेला duplicate build काढून टाकला आहे; वास्तविक build/package/boot check CI मध्ये कायम आहेत.

| कार्य                                            | व्याप्ती                                                                                                                                                                                                | अवरोधक        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | दस्तऐवज/कोड PRs; API दस्तऐवज संदर्भ आणि docs-all                                                                                                                                                        | होय           |
| `Fast Quality Gates`                             | कोड PRs; स्थिर तपासण्या, typecheck, dashboard typecheck, प्रभावित युनिट चाचण्या                                                                                                                         | होय           |
| `Forgotten sibling tests`                        | कोड PRs; बदललेल्या मॉड्यूल्सपासून स्थिर वापरकर्त्यांपर्यंत आणि संभाव्य समकक्ष चाचण्यांपर्यंत मागोवा; barrel आणि dynamic-import मार्ग सल्लात्मक निदान म्हणून नोंदवले जातात, संदर्भित allowlist अपवादांसह | **सल्लात्मक** |
| `Vitest (fast-path)`                             | कोड PRs; जलद vitest संच                                                                                                                                                                                 | होय           |
| `Unit Tests fast-path`                           | कोड PRs; 4-shard युनिट संच                                                                                                                                                                              | होय           |
| `No new ESLint warnings`                         | कोड PRs; suppressions-जाणिवेचा lint संरक्षक                                                                                                                                                             | होय, forks सह |
| `Merge integrity (changelog + generated skills)` | मसुदा नसलेले PRs; changelog आणि व्युत्पन्न skill समक्रमण                                                                                                                                                | होय, forks सह |

#### विसरलेल्या समकक्ष चाचण्यांचा अहवाल

`npm run check:forgotten-sibling-tests` चाचणी-प्रभाव नकाशामागील import resolver चा पुनर्वापर करतो.
प्रत्येक बदललेल्या production मॉड्यूलसाठी, संभाव्य चाचणी
pull-request diff मध्ये अनुपस्थित असल्यास तो निर्धारक
`changed module/symbol -> static consumer -> candidate sibling test` साखळ्या नोंदवतो. कोणतीही अवरोधक अंमलबजावणी सुरू करण्यापूर्वी कॅलिब्रेशनसाठी Markdown सारांश आणि JSON परिणाम
`forgotten-sibling-tests` workflow artifact म्हणून जतन केले जातात.

Barrel re-exports आणि dynamic imports ही केवळ resolution निदाने आहेत; ती कधीही
अवरोधक निष्कर्ष तयार करत नाहीत. पुनरावलोकित अपवाद
`config/quality/forgotten-sibling-allowlist.json` मध्ये असतात. प्रत्येक नोंदीत consumer आणि संभाव्य
चाचणीचे नाव, विशिष्ट कारण आणि GitHub issue किंवा pull request ची लिंक असणे आवश्यक आहे. चुकीच्या स्वरूपातील नोंदींमुळे प्रक्रिया
बंद अवस्थेत अयशस्वी होते. अपवाद हटवलेली संभाव्य चाचणी किंवा `.skip`/`.todo` जोडणारा diff दडपू शकत नाहीत;
assertion कमकुवत करणे आणि इतर masking यांची जबाबदारी स्वतंत्रपणे अवरोधक असलेल्या
`check:test-masking` gate कडेच राहते.

### कार्य: `lint`

`main` साठीच्या प्रत्येक PR वर चालते. अयशस्वी झाल्यास merge अवरोधित करते.

| स्क्रिप्ट (`npm run ...`)         | काय प्रमाणित करते                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | अवरोधक                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js आवृत्ती समर्थित श्रेणीत आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `check:test-tla-order`            | `tests/unit` अंतर्गत कोणतीही `node:test` फाइल चाचणी नोंदवत नाही, शीर्ष-स्तरीय `await` पर्यंत पोहोचत नाही आणि त्यानंतर आणखी चाचण्या नोंदवत नाही (#18045; रॅचेट: `test-tla-order-allowlist.json` केवळ लहान होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | होय                                       |
| `check:cycles`                    | संपूर्ण `src/` + `open-sse/` मधील चक्रीय आयाती (AST-आधारित, tsconfig `paths` निराकरण केलेले). कोणतेही चक्र अस्तित्वात असल्यास मूलभूत आदेश exit 1 करतो (#15281 पासून fail-closed) आणि SCCs सूचीबद्ध करतो. `check:cycles:ratchet` (CI मध्ये चालवले जाणारे) गणना `quality-baseline.json` मधील `metrics.cycles` कमाल मर्यादेपेक्षा जास्त झाल्यास अवरोधित करते — सध्या 14, `direction: down`, त्यामुळे ती केवळ कमी होऊ शकते (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय (रॅचेट)                               |
| `check:boundary`                  | `open-sse → src` युग्मन: इंजिनमधून ॲपमध्ये होणाऱ्या अद्वितीय फाइल-ते-फाइल आयाती (`scripts/quality/measure-boundary.mjs`; एज सूची ही v4 कोअर/मॉड्यूल-विभाजन दुरुस्तीची प्रलंबित कार्यसूची आहे). मूलभूत आदेश = सल्लात्मक अहवाल (`quality:boundary` प्रमाणेच). `check:boundary:ratchet` (CI मध्ये चालवले जाणारे आणि `quality.yml` जलद-गेट्स रॅचेट लूपमध्येही असलेले) गणना `quality-baseline.json` मधील `metrics.boundaryOpenSseToSrc` कमाल मर्यादेपेक्षा जास्त झाल्यास अवरोधित करते — मोजलेल्या 771 वर आरंभिक मूल्य निश्चित केलेले, `direction: down`; `--update` ते केवळ कमी करते; PRs वर आधार-सापेक्ष (`--base-ref`, खाली पाहा)                                                                                                                                                                                                                                                                                                                              | होय (रॅचेट)                               |
| `check:route-validation:t06`      | सर्व routes वर Zod schemas उपस्थित आहेत (स्तर 6 धोरण)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` ची संख्या निर्धारित मर्यादेपेक्षा जास्त नाही (स्तर 11 कात्राका)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय                                       |
| `check:provider-consistency`      | `providers.ts` मधील प्रत्येक provider साठी `providerRegistry.ts` मध्ये जुळणारी नोंद आहे (आणि उलटही, allowlist च्या मर्यादेत)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                       |
| `check:model-lifecycle`           | हाताने देखरेख केल्या जाणाऱ्या तीन routing tables, repository मध्ये नोंदवलेल्या lifecycle snapshot (#11503) शी सुसंगत राहतात: `FITNESS_TABLE` (`taskFitness.ts`) अशा कोणत्याही निवृत्त id ला score देत नाही ज्याकडे `REGISTRY` route करू शकते; प्रत्येक `BUILT_IN_ALIASES` target `REGISTRY` मध्ये उपस्थित आणि retired-id snapshot मध्ये अनुपस्थित असतो; `REGISTRY` मध्ये अजूनही असलेला प्रत्येक निवृत्त id forward केला जातो किंवा `allowedRetiredInCatalog` मध्ये सूचीबद्ध असतो; आणि कोणताही `DEFAULT_DEGRADATION_MAP` source किंवा target त्या snapshot मध्ये निवृत्त म्हणून दिसत नाही. यावरून एखादे model सध्या live upstream द्वारे उपलब्ध केले जात आहे, हे सिद्ध होत नाही. Offline — `config/quality/model-lifecycle.json` शी तुलना करते; ते `npm run quality:refresh-model-lifecycle` वापरून हाताने refresh केले जाते (network; CI मध्ये जोडलेले नाही). `allowedRetiredInCatalog` हा burn-down ratchet आहे: tracking issue असल्याशिवाय नोंद जोडू नका. | होय                                       |
| `check:fetch-targets`             | client-side `src/` मधील प्रत्येक `fetch("/api/...")` प्रत्यक्ष `route.ts` शी resolve होतो                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय                                       |
| `check:deps`                      | repo मधील प्रत्येक `package.json` मध्ये असलेल्या आणि `npm install` करता येणाऱ्या सर्व dependencies `dependency-allowlist.json` मध्ये आहेत; नवीन unpinned किंवा slopsquatted packages flag केले जातात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | होय                                       |
| `audit:deps`                      | सर्व पाच स्वतंत्र lockfiles चे npm audit (root, Electron, OpenCode plugins v1/v2 आणि provider). गंभीर सूचना अवरोधित करतात; उच्च-स्तरीय सूचना दृश्यमान इशारे म्हणून राहतात. गहाळ/अयशस्वी audits अपूर्ण मानले जातात आणि अवरोधित करतात; प्रत्येक scope साठी lock hashes आणि अहवाल जतन केले जातात.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | होय                                       |
| `check:lockfile`                  | `package-lock.json` ची अखंडता — https registry, integrity hashes, कोणतेही host overrides नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | होय                                       |
| `check:licenses`                  | production dependencies साठी SPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `check:tracked-artifacts`         | कोणतेही build artifacts / commit केलेले `node_modules` symlinks नाहीत (husky pre-commit मध्येही चालते; pre-push हेतुपुरस्सर हलके ठेवले आहे — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `check:ai-attribution`            | PR commits, title किंवा body मध्ये कोणताही AI/bot `Co-Authored-By` trailer किंवा AI-generation footer नाही — कठोर नियम #16 (`quality.yml` मधील PR→`release/**` साठीच्या fast-gates loop मध्ये — event payload वाचते, PR नसल्यास काहीही करत नाही — आणि `ci.yml` lint मधील PR→`main` साठीची केवळ-PR step; तसेच husky `commit-msg` hook; मानवी co-authorsना परवानगी आहे; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | प्रत्येक Vitest exclusion मध्ये tracking issue नमूद केलेली असते आणि ते `config/quality/vitest-exclusions.json` मध्ये दिसते (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `check:file-size`                 | स्रोत फाइल्स (`src/`, `open-sse/`, `electron/`, `bin/` मधील `.ts`/`.tsx`) `cap` मर्यादेत आणि चाचणी फाइल्स (`*.test.ts(x)`) `testCap` मर्यादेत राहतात; `file-size-baseline.json` मध्ये स्थिर केलेल्या (`frozen` / `testFrozen`) फाइल्सचा आकार त्यांच्या नोंदवलेल्या आकारापेक्षा वाढू नये                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | होय                                       |
| `check:error-helper`              | एक्झिक्युटर्स/हँडलर्समधील त्रुटी प्रतिसाद `buildErrorBody()` / `sanitizeErrorMessage()` वापरतात (कठोर नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | होय                                       |
| `check:migration-numbering`       | स्थलांतर SQL फाइल्सना कोणतेही क्रमांक वगळले किंवा पुनरावृत्त न करता अनुक्रमे क्रमांक दिलेले असतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | होय                                       |
| `check:public-creds`              | `publicCreds.ts` च्या बाहेर कोणतेही अक्षरशः OAuth `client_id`/`client_secret` किंवा Firebase Web कीज नसतात (कठोर नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | होय                                       |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल्सच्या बाहेर कोणतेही रॉ SQL नसते; `localDb.ts` मधून कोणतेही बॅरल-इम्पोर्ट्स नसतात (कठोर नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | होय                                       |
| `check:known-symbols`             | त्यांच्या डिस्पॅच टेबल्समध्ये नोंदणीकृत प्रोव्हायडर एक्झिक्युटर्स, राउटिंग धोरणे आणि ट्रान्सलेटर्स हे डिस्कवरील फाइल्सशी जुळतात — कोणतीही अनाथ किंवा अघोषित सिम्बॉल्स नसतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                       |
| `check:route-guard-membership`    | चाइल्ड प्रोसेस सुरू करणारा प्रत्येक रूट `isLocalOnlyPath()` द्वारे वर्गीकृत केला जातो (कठोर नियम #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय                                       |
| `check:test-discovery`            | रेपोमधील प्रत्येक `*.test.ts` / `*.spec.ts` फाइल किमान एका टेस्ट रनरद्वारे संकलित केली जाते (रॅचेट: `test-discovery-baseline.json` मधील ऑर्फन यादी केवळ कमी होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                       |
| `check:agent-skills-sync`         | जनरेट केलेले एजंट-स्किल्स आर्टिफॅक्ट्स त्यांच्या स्रोत कॅटलॉगशी जुळतात (कोणतेही विचलन नाही)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | प्रोव्हायडर लोगो/अॅसेट्ससाठी नोंदवलेली उगम नोंद उपलब्ध आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON कॉन्फिगरेशन फाइल्स पार्स होतात आणि रेपोच्या लिंट नियमांची पूर्तता करतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | त्रुटींशिवाय TypeScript संकलन (केवळ सल्लात्मक चेतावण्या)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | होय                                       |
| `typecheck:noimplicit:core`       | कठोर `noImplicitAny` — भविष्याभिमुख; आधीपासून अस्तित्वात असलेल्या अनेक कॉल साइट्सना अजूनही ॲनोटेशन्सची आवश्यकता आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **सल्लात्मक** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` पुरते मर्यादित `tsc` (#7033) — `typecheck:core` च्या काळजीपूर्वक निवडलेल्या 27-फाइल अनुमतीसूचीत कोणतेही dashboard TSX समाविष्ट नाही आणि `next build` देखील त्याची type-checking कधीच करत नाही (`next.config.mjs` मध्ये `ignoreBuildErrors: true` सेट केले आहे), त्यामुळे तेथील अनाथ-आयडेंटिफायर प्रतिगमन (#6625/#6909) CI ला दिसत नव्हते. स्थिर केलेल्या प्रति-फाइल/प्रति-TS-कोड संख्या आधाररेषेशी फरक तपासतो (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` प्रमाणेच कालबाह्यता-अंमलबजावणी नमुना) — आधाररेषेतील संख्येपेक्षा अधिक असलेल्या केवळ नवीन त्रुटींमुळे गेट अयशस्वी होते; आधीपासून अस्तित्वात असलेली त्रुटी दुरुस्त झाल्यावर `--update` वापरून मर्यादा कमी करा.                                                                                                                                                                                                                              | होय                                       |

### जॉब: `quality-gate`

`test-coverage` नंतर चालतो. अयशस्वी झाल्यास मर्ज अवरोधित करतो.

| स्क्रिप्ट                    | सत्यापित करते                                                                                                                                                         | अवरोधक                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `quality:collect`            | `quality-metrics.json` तयार करते (ESLint चेतावणी संख्या, विलीन केलेल्या shard अहवालामधील कव्हरेज)                                                                     | होय (ratchet च्या upstream मध्ये) |
| `quality:ratchet`            | `quality-baseline.json` मधील प्रत्येक मेट्रिकचे प्रतिगमन झालेले नाही (ESLint चेतावण्या ≤ आधाररेषा; कव्हरेज ≥ आधाररेषा)                                                | होय                               |
| `check:duplication`          | कोडची पुनरावृत्ती (jscpd@4) `quality-baseline.json` मधील आधाररेषेपेक्षा अधिक नाही                                                                                     | होय                               |
| `check:complexity`           | फाइल-स्तरीय cyclomatic complexity मर्यादेपेक्षा अधिक नाही (मुख्य ESLint `complexity` + `max-lines-per-function`)                                                      | होय                               |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — स्वतंत्र ESLint फेरी; CI दोन्ही एकत्र करून एकाच `check:complexity-ratchets` टप्प्याच्या रूपात चालवते         | होय                               |
| `check:dead-code`            | न वापरलेल्या exports / फाइल्सचा ratchet (knip) आधाररेषेच्या तुलनेत प्रतिगमन करत नाही                                                                                  | होय                               |
| `check:compression-budget`   | Compression benchmark बजेट — प्रत्येक engine साठी token-savings ची किमान मर्यादा कमी होता कामा नये                                                                    | होय                               |
| `check:type-coverage`        | टाइप केलेल्या टक्केवारीचा ratchet (`type-coverage`) प्रतिगमन करत नाही; मोठ्या प्रमाणावर `typecheck:noimplicit:core` समाविष्ट करतो                                     | होय                               |
| `check:codeql-ratchet`       | उघड्या CodeQL alerts ची संख्या वाढत नाही (`gh api` द्वारे वाचतो; token नसल्यास सुरळीतपणे वगळतो) — refresh cadence आणि manual trigger साठी: खालील "CodeQL ratchet" पहा | होय                               |

### जॉब: `quality-extended`

हा जॉब लागू असलेल्या उमेदवारांना अवरोधित करतो. Bundle आकार, secret निष्कर्ष, vulnerability
निष्कर्ष, workflow निष्कर्ष आणि OpenAPI बदल आवश्यक ratchets वापरून तपासले जातात.
Circular-dependency निदान केवळ सल्लात्मक राहते. Scanner स्थापना आवश्यक आहे:
`scripts/ci/install-quality-scanners.sh` निश्चित केलेल्या आवृत्त्या उपलब्ध करून देते आणि
स्थापना अपयश पुढे प्रसारित करते. साधने अनुपलब्ध असल्यास, अहवाल अवैध असल्यास किंवा आधाररेषा अनुपलब्ध असल्यास
आवश्यक scanner gate अपूर्ण राहते.

| स्क्रिप्ट                | काय सत्यापित करते                                                                                                                                                                                                                         | अवरोधक                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | कोणतीही चक्रीय अवलंबित्वे नाहीत (dpdm)                                                                                                                                                                                                    | **सूचनात्मक**                                     |
| `check:bundle-size`      | बंडलचा आकार कमाल मर्यादा ओलांडत नाही; मापन अनुपलब्ध असल्यास तपासणी अयशस्वी होते                                                                                                                                                           | **--ratchet सह अवरोधक**                           |
| `check:secrets`          | Gitleaks चे निष्कर्ष मागील स्थितीपेक्षा खराब होत नाहीत; आवश्यक स्कॅनमध्ये साधने/स्रोत/बेसलाइन अनुपलब्ध असल्यास, स्कॅन अयशस्वी झाल्यास किंवा अहवाल अवैध असल्यास ते नाकारले जातात                                                           | **--ratchet सह अवरोधक**                           |
| `check:vuln-ratchet`     | अवलंबित्वांमधील असुरक्षा मागील स्थितीपेक्षा खराब होत नाहीत; आवश्यक स्कॅनमध्ये साधने अनुपलब्ध असल्यास, अहवाल अवैध असल्यास किंवा बेसलाइन अनुपलब्ध असल्यास ते नाकारले जातात                                                                  | **--ratchet सह अवरोधक**                           |
| `check:workflows`        | वर्कफ्लो लिंट (actionlint + zizmor); स्कॅनर अनुपलब्ध/बिघडलेले असल्यास, अहवाल अवैध असल्यास किंवा ratchet बेसलाइन अनुपलब्ध असल्यास INCOMPLETE म्हणून तपासणी अयशस्वी होते. वैध निष्कर्ष निवडलेल्या कठोर/सूचनात्मक/ratchet धोरणाचे पालन करतात | अंमलबजावणी आवश्यक; CI मध्ये zizmor ratchet अवरोधक |
| `check:openapi-breaking` | निश्चित केलेल्या इव्हेंट कमिट्सच्या संदर्भात सार्वजनिक API करार (PR merge-base, push before, merge-group base; शेड्यूल केलेल्या/मॅन्युअल checkout साठी first parent); आवश्यक मापन अयशस्वी झाल्यास प्रवेश नाकारला जातो                     | **--ratchet सह अवरोधक**                           |

### जॉब: `docs-sync-strict`

`main` किंवा `release/**` कडे जाणाऱ्या पुल रिक्वेस्टसाठी हा जॉब फक्त मसुदा नसलेल्या (किंवा विश्वसनीय रांगेतील) आणि दस्तऐवजीकरण किंवा कोडमधील बदल म्हणून वर्गीकृत उमेदवारांसाठी चालतो. तो PR व्यतिरिक्त इतर CI घटनांवरही चालतो; या कार्यप्रवाहातील push ट्रिगर फक्त `main` साठी आहे, `release/**` साठी नाही. एखादा टप्पा शून्येतर निर्गमन कोडसह संपल्यास तो जॉबला अवरोधित करतो; केवळ अहवालात दाखवलेले निष्कर्ष आणि खाली नोंदवलेले अपवाद तसे करत नाहीत.

| स्क्रिप्ट                      | काय सत्यापित करते                                                                                                                                                                                                                                                                                                                                                                                                                                  | अवरोधक                                                                                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | खालील 7 उप-गेट्स अनुक्रमे चालवणारे मेटा-गेट                                                                                                                                                                                                                                                                                                                                                                                                        | होय                                                                                                                                            |
| ↳ `check:docs-sync`            | पॅकेज/OpenAPI/CHANGELOG यांच्या आवृत्त्यांची सुसंगती, `llm.txt`च्या तंतोतंत प्रती, अनुवादित CHANGELOGच्या विभागांबाबत व आकाराबाबत अपरिवर्तनीय अटी आणि नवीन दस्तऐवजांनी बदललेल्या जुन्या दुबार दस्तऐवजांची अनुपस्थिती                                                                                                                                                                                                                               | होय                                                                                                                                            |
| ↳ `check:docs-frontmatter`     | संकलित दस्तऐवजीकरण पृष्ठांमध्ये वैध frontmatter शीर्षके आहेत                                                                                                                                                                                                                                                                                                                                                                                       | होय                                                                                                                                            |
| ↳ `check:docs-counts`          | उच्च विश्वासार्हतेच्या मोजणीसंबंधी अपरिवर्तनीय अटी कठोरपणे लागू होतात; फाइल संख्येच्या अंदाजाधारित तपासण्या फक्त इशारा देतात, जोपर्यंत स्क्रिप्टला `--strict` दिले जात नाही (CIचे मेटा-गेट हा फ्लॅग देत नाही)                                                                                                                                                                                                                                      | कठोर स्तर अवरोधक आहे; सौम्य स्तर सल्लात्मक आहे                                                                                                 |
| ↳ `check:env-doc-sync`         | स्पष्ट दुर्लक्ष-यादी, फक्त दस्तऐवजांत असणाऱ्या आणि फक्त पर्यावरणात असणाऱ्या चलांच्या परवानगी-याद्या लागू केल्यानंतर स्रोत कोडमधून वाचली जाणारी पर्यावरणीय चले, `.env.example` आणि `docs/reference/ENVIRONMENT.md` यांच्यात सुसंगती असते                                                                                                                                                                                                            | होय, दस्तऐवजीकृत परवानगी-याद्यांच्या बाहेर                                                                                                     |
| ↳ `check:deprecated-versions`  | दुर्लक्षित दस्तऐवज वगळून, सुरक्षित ऐतिहासिक संदर्भांबाहेरील संभाव्य जुन्या आवृत्त्या आणि जुन्या अद्यतन तारखांची नोंद करते                                                                                                                                                                                                                                                                                                                          | सध्याच्या CI मांडणीत सल्लात्मक (`--strict` दिले जात नाही)                                                                                      |
| ↳ `check:doc-links`            | दस्तऐवजांतील अंतर्गत markdown दुवे वास्तविक फाइल्सकडे निर्देशित होतात (`[text]`/`(path)` स्वरूप)                                                                                                                                                                                                                                                                                                                                                   | होय                                                                                                                                            |
| ↳ `check:fabricated-docs`      | दस्तऐवजांमध्ये उद्धृत केलेले routes, env vars, CLI commands, hook names आणि file paths कोडबेसमध्ये अस्तित्वात आहेत. `--strict` द्वारे कठोर गेट; फ्लॅगशिवाय soft-fail.                                                                                                                                                                                                                                                                              | होय (CI मध्ये `--strict` द्वारे)                                                                                                               |
| `check:cli-i18n`               | CLIमध्ये वापरलेल्या `t()` कळा `en`मध्ये आहेत; `pt-BR` प्रत्येक सर्वोच्च स्तरावरील विभाग राखतो; `zh-CN` आणि `zh-TW` मध्ये `en`ची प्रत्येक कळ आहे                                                                                                                                                                                                                                                                                                    | होय                                                                                                                                            |
| `check:openapi-coverage`       | OpenAPI spec मध्ये वास्तविक routes च्या किमान ratchet केलेल्या मर्यादेइतके routes समाविष्ट आहेत                                                                                                                                                                                                                                                                                                                                                    | होय                                                                                                                                            |
| `check:openapi-security-tiers` | जाहीर केलेल्या `x-loopback-only`/`x-always-protected` भाष्यांना `routeGuard.ts`मध्ये आधार असणे आवश्यक आहे; पार्सरच्या त्रुटी आणि पुढील दिशेच्या तपासणीतील विसंगती अवरोधित करतात. फक्त स्थानिक प्रवेशाच्या उपसर्गांखाली `x-loopback-only` नसल्याची उलट तपासणी इशारा देते, आणि फक्त पॅटर्नद्वारे निश्चित केलेले रूट त्या उलट तपासणीतून वगळले जातात.                                                                                                  | पार्सर आणि पुढील दिशेच्या तपासण्या अवरोधक आहेत; उलट तपासणी सल्लात्मक आहे                                                                       |
| `check:openapi-routes`         | कारणांसह नोंदवलेली `KNOWN_STALE_SPEC` परवानगी-यादी लागू केल्यानंतर, `openapi.yaml`मधील प्रत्येक `/api...` पथ पॅरामीटरमधील फरकांकडे दुर्लक्ष करून वास्तविक रूटशी जुळतो; परवानगी-यादीतील कालबाह्य नोंदींमुळेही तपासणी अयशस्वी होते                                                                                                                                                                                                                   | होय                                                                                                                                            |
| `check:docs-symbols`           | प्रतिरूप नसलेल्या अधिकृत मूळ दस्तऐवजांतील अंतर्गत `/api/...` URL संदर्भ वास्तविक रूट किंवा रूट-समूहाशी जुळतात; प्रॉक्सी/अपस्ट्रीम/प्लेसहोल्डर/फाइल संदर्भ आणि कारणांसह नोंदवलेल्या `KNOWN_STALE_DOC_REFS` नोंदी वगळल्या जातात, तर परवानगी-यादीतील कालबाह्य नोंदी तपासणी अयशस्वी करतात                                                                                                                                                              | होय                                                                                                                                            |
| `i18n translation drift`       | मुख्य दस्तऐवजांचे स्रोत/लक्ष्य हॅश आणि भाषांतराचा उगम तपासते. PR तुलना केवळ तंतोतंत समान वारशाने मिळालेल्या अपयशांना परवानगी देते; स्रोत, अनुपस्थित लक्ष्य, लक्ष्य हॅश, कालबाह्य भाषांतर किंवा विभाग कॅशेमधील नवीन अथवा पडताळणी न झालेल्या विसंगती अडवतात. PR तुलनेबाहेर स्रोत/अनुपस्थित लक्ष्य/लक्ष्य हॅशची अपयशे अडवतात, तर कालबाह्य भाषांतरे आणि विसंगत विभाग कॅशे केवळ इशारे राहतात. जुन्या स्वरूपातील विभाग कॅशे अनुपस्थित असणे हे अपयश नाही. | PRमधील नवीन/पडताळणी न झालेले विचलन अडवते; तंतोतंत समान वारशाने मिळालेले विचलन केवळ इशारा आहे; PRबाहेरील नियम अपयशाच्या प्रकारावर अवलंबून असतात |

### जॉब: `i18n-ui-coverage`

| स्क्रिप्ट                         | काय सत्यापित करते                                                                                                                                                                          | अवरोधक     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n की कव्हरेज ≥ 65% आहे                                                                                                                                                               | होय        |
| `check-ui-value-drift` (इनलाइन)   | पुन्हा लिहिलेले इंग्रजी **मूल्य** कोणतेही कालबाह्य भाषांतर मागे ठेवत नाही                                                                                                                  | होय        |
| `check-new-key-coverage` (इनलाइन) | **नवीन** इंग्रजी की प्रत्येक लोकेलमध्ये भाषांतरित केलेली आहे — `__MISSING__:` मार्कर नाकारला जातो                                                                                          | होय        |
| `check-translation-ratio`         | प्रत्येक लोकेलमधील वास्तविक भाषांतराचे गुणोत्तर (इंग्रजीशी समान / प्लेसहोल्डर / अनुमत सूचीबाहेरील गहाळ लीफ) `config/quality/i18n-translation-baseline.json` + शिथिलता यापेक्षा जास्त नसावे | **अवरोधक** |

`fetch-depth: 0` आवश्यक आहे — मूल्य-ड्रिफ्ट गेट मर्ज बेसशी `en.json` चा फरक तपासते.

#### `check-ui-value-drift` — कालबाह्य भाषांतर गेट

इतर गेट्सना संरचनात्मकदृष्ट्या न दिसणारे एक i18n रिग्रेशन हे पकडते: इंग्रजी मूल्य
पुन्हा लिहिले जाते आणि _मागील_ इंग्रजीवरून तयार केलेली भाषांतरे तशीच राहतात, त्यामुळे
इंग्रजीतर वापरकर्ते खात्रीशीर शब्दांत लिहिलेला, पण आता चुकीचा मजकूर वाचत राहतात.

हे प्रत्यक्षात रिलीज झाले होते. Antigravity लॉगिन हेल्पर आल्यावर (#5203)
`oauthModal.googleOAuthWarning` पुन्हा लिहिले गेले; **43 पैकी 39 लोकेल्समध्ये** ऑपरेटरना
"पूर्ण URL कॉपी करा आणि खाली पेस्ट करा" असे सांगणारा मजकूर कायम राहिला — त्या प्रदात्यासाठी
ही प्रक्रिया पूर्णच होऊ शकत नाही. #8463 पर्यंत हे लक्षात आले नाही, कारण:

- `sync-ui-keys` केवळ **अनुपस्थित** कीज बॅकफिल करते, **कालबाह्य** कीज कधीही नाही;
- `check-ui-keys-coverage` कीची _उपस्थिती_ मोजते, त्यामुळे कालबाह्य भाषांतर कव्हर केलेले म्हणून गणले जाते;
- `check-translation-drift` हे `docs/i18n/<locale>/**.md` दस्तऐवजीकरण मिरर्सचा मागोवा घेते —
  ते `src/i18n/messages/*.json` कधीही वाचत नाही. 2026-09 पुनः-सिंकपासून जॉब
  `docs-sync-strict` मध्ये अवरोधक: मुख्य दस्तऐवज संपादित करा → `npm run i18n:run -- --files=<doc>`
  (विभाग-स्तरीय, कमी खर्चिक).

**फरक-जागरूक, बेसलाइन-आधारित नाही.** हे मर्ज बेसवरील `en.json` ची वर्किंग ट्रीशी
तुलना करते; ज्या प्रत्येक कीचे इंग्रजी मूल्य बदलले आहे, तिच्यासाठी अजूनही न बदललेले
भाषांतर असलेले कोणतेही लोकेल कालबाह्य ठरते. हे जाणीवपूर्वक **आधीपासूनचे तांत्रिक देणे गोठवते** —
दीर्घकाळ अस्तित्वात असलेले भाषांतर कोणत्या जुन्या इंग्रजीतून आले हे फरकातून उघड होऊ शकत नाही,
म्हणून गेट फक्त सध्याच्या बदलाने स्पर्श केलेल्या गोष्टींचेच मूल्यमापन करते. पर्याय म्हणून
(प्रत्येक कीसाठी हॅश बेसलाइन) सुमारे 600 KB आकाराची जनरेट केलेली फाइल लागेल, जी सर्वात मोठ्या
विद्यमान बेसलाइनच्या 3 पट आहे आणि प्रत्येक i18n PR वर बदलत राहील.

हे निकष पूर्ण करण्याचे दोन मार्ग:

1. प्रभावित भाषांतरे अद्ययावत करा, किंवा
2. त्यांना `__MISSING__:<new english>` असे सेट करा — त्यानंतर रनटाइम दुरुस्त केलेले इंग्रजी
   देते (`src/i18n/request.ts::deepMergeFallback`, #7258) आणि की भाषांतरासाठी रांगेत जाते.

स्ट्रिंगचा **अर्थ** बदलला असल्यास, **कीचे नाव बदलण्यास** प्राधान्य द्या: नवीन कीला
कालबाह्य भाषांतर वारशाने मिळू शकत नाही. #8463 मध्ये हाच पॅटर्न वापरला होता.

```bash
npm run i18n:check-value-drift          # कठोर (CI जे चालवते ते)
npm run i18n:check-value-drift:warn     # फक्त अहवाल
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

मूल्य-विचलन आणि नवीन-की गेट्स
`scripts/i18n/resolve-ui-diff-base.mjs` मधील एकच अपरिवर्तनीय तुलना सामायिक करतात. कार्यप्रवाह दोन्ही तपासण्यांना समान बेस, बेस-टिप आणि उमेदवार SHA पाठवतो. PR/बेस-रीटार्गेट, पुश आणि मर्ज-ग्रुप रन त्यांच्या इव्हेंटचा संदर्भ वापरतात. उमेदवार शाखा डिस्पॅच करण्यासाठी तिचा नेमका उघडा PR किंवा स्पष्ट
`i18n_base_sha` इनपुट आवश्यक असतो. त्या इनपुटशिवाय `main` किंवा `release/vX.Y.Z`
चे डिस्पॅच किंवा नियोजित निरीक्षण शेवटच्या कमिटची त्याच्या पहिल्या पॅरेंटशी तुलना करते; हे वारशाने आलेल्या सर्व भाषांतर-प्रलंबिततेचे ऑडिट नाही. स्थानिक इन्व्होकेशनसाठी स्पष्ट तुलना-बेस आवश्यक असतो,
उदाहरणार्थ वरील `BASE_REF` कमांड.

गहाळ किंवा संदिग्ध तुलना-संदर्भ, वाचता न येणारा किंवा अवैध आवश्यक कॅटलॉग आणि
बदललेला उमेदवार यांमुळे, वॉर्न मोडमध्येही, एक्झिट कोड **2** सह `INCOMPLETE` मिळते.
कॅटलॉग वाचण्यासाठी `scripts/i18n/read-ui-catalog.mjs` वापरले जाते; वाचनातील अपयशांच्या जागी
रिक्त ऑब्जेक्ट्स वापरले जात नाहीत. अनुपलब्ध बेस किंवा अपूर्ण इनपुट यांपैकी कोणतेही PASS सिद्ध करत नाही.

### जॉब: `i18n`

संपूर्ण i18n सत्यापन मॅट्रिक्स (प्रत्येक लोकेलसाठी एक जॉब). संपूर्ण जॉब सल्लात्मक आहे.

| स्क्रिप्ट                       | काय सत्यापित करते                     | अवरोधक                                                  |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | प्रत्येक लोकेलसाठी भाषांतराची पूर्णता | **सल्लात्मक** (संपूर्ण जॉबवर `continue-on-error: true`) |

### जॉब: `pr-test-policy`

फक्त पुल रिक्वेस्ट्सवर चालते.

| स्क्रिप्ट              | काय सत्यापित करते                                                                                                                                   | अवरोधक |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, किंवा `bin/` मधील प्रॉडक्शन कोड बदलणाऱ्या PR मध्ये चाचण्या समाविष्ट किंवा अद्ययावत करणे आवश्यक आहे (कठोर नियम #8) | होय    |
| `check:test-masking`   | बदललेल्या चाचणी फाइल्स एकूण अॅसर्ट संख्या कमी करत नाहीत किंवा `assert.ok(true)` सारखी पुनरुक्त विधाने जोडत नाहीत                                    | होय    |
| `check:pr-evidence`    | PR मजकुरात बदलासाठी चाचणी/VPS पुरावे नमूद केलेले आहेत (PR मजकूर grep करून कठोर नियम #18 यांत्रिक करते — नाजूक, Backlog पहा)                         | होय    |

### जॉब: `test-vitest`

`changes` वर्गीकरण job आवश्यक आहे. लागू असलेले matrix shards अयशस्वी झाल्यास merge अवरोधित होते.

| संच              | काय सत्यापित करते                                    | अवरोधक                                                                                                             |
| ---------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP सर्व्हर (110 साधने), autoCombo, कॅश — vitest रनर | होय                                                                                                                |
| `test:vitest:ui` | UI घटक चाचण्या — vitest रनर                          | **अवरोधक** — आधीपासून असलेली अपयशे `vitest.config.ts` मध्ये स्पष्टपणे वगळली आहेत; नवीन अपयशांमुळे जॉब अयशस्वी होतो |

### रात्रीचे कार्यप्रवाह (नियोजित, सल्लात्मक)

हे cron वेळापत्रकानुसार (आणि `workflow_dispatch` द्वारे) चालतात, PR वर कधीही चालत नाहीत. हे सर्व सल्लात्मक आहेत.

| कार्यप्रवाह            | काय सत्यापित करते                                                                                                                                      | अवरोधक        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `nightly-property`     | यादृच्छिक seed आणि उच्च run count सह fast-check प्रॉपर्टी चाचण्या                                                                                      | **सल्लात्मक** |
| `nightly-resilience`   | heap-growth गेट, chaos fault-injection, k6 load/soak                                                                                                   | **सल्लात्मक** |
| `nightly-llm-security` | promptfoo injection guard (block मोड) + garak probes (प्रदाता secret नसल्यास वगळले जातात)                                                              | **सल्लात्मक** |
| `nightly-schemathesis` | `docs/openapi.yaml` वापरून थेट OmniRoute विरुद्ध OpenAPI करार fuzzing (schemathesis) — तपशील-संचाचे उल्लंघन / न हाताळलेले 500s समोर आणते (टप्पा 8 B.4) | **सल्लात्मक** |
| `nightly-mutation`     | जलद unit lane वरील Stryker mutation-testing स्कोअर — टिकून राहिलेले mutants कमकुवत asserts समोर आणतात                                                  | **सल्लात्मक** |
| `nightly-compat`       | समर्थित `engines.node` श्रेणींमधील Node engine सुसंगतता मॅट्रिक्स                                                                                      | **सल्लात्मक** |

कार्यप्रदर्शन आधाररेषा (heap, TTFB, build time) नोंदवल्या जातात, परंतु त्यांवर गेट लावले जात नाही: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) पहा.

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
- **सल्लात्मक** — जागतिक एकूण आणि गोठवलेली आधाररेषा यांतील तुलना. वारशाने आलेले विचलन
  निर्दोष PR ला कधीही लाल ठरवत नाही; त्या विचलनाची नोंद रिलीज समेटाच्या वेळी दुरुस्तीसाठी ठेवली जाते आणि
  हेडरूम जॉबद्वारे त्यावर लक्ष ठेवले जाते.

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

## अनुमतिसूची धोरण

आधीपासून अस्तित्वात असलेल्या उल्लंघनांमुळे अयशस्वी होऊ न शकणारे प्रत्येक गेट स्थिर केलेली अनुमतिसूची वापरते
(उदा., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). धोरण असे आहे:

**मूळ कारण दुरुस्त करा; उल्लंघन आधीपासून अस्तित्वात असेल आणि त्याच PR मध्ये
दुरुस्त करता येत नसेल, तरच अनुमतिसूची वापरा.**

अनुमतिसूचीमध्ये नोंद जोडताना:

1. समर्थनार्थ कारणासह टिप्पणी समाविष्ट करा.
2. ट्रॅकिंग इश्यूचा संदर्भ द्या (उदा., `// #3498 — Phase 2 feature, not yet implemented`).
3. उल्लंघन दुरुस्त करणाऱ्या त्याच PR मध्ये नोंद काढून टाका — जे उल्लंघन यापुढे
   सक्रिय नाही ते दडपणारी कालबाह्य नोंद ही स्वतःच एक त्रुटी आहे (अंमलबजावणी झाल्यानंतर 6A.3 कालबाह्य-अंमलबजावणी
   अनाथ अनुमतिसूची नोंदीमुळे गेट अयशस्वी करेल).

चाचण्या अधिक वेगाने उत्तीर्ण करण्यासाठी अनुमतिसूची नोंदी जोडू **नका**. वाढत्या
अनुमतिसूचीसह हिरवे गेट गुणवत्तेचा खोटा आभास देते.

### तुमच्या PR वर गेट अयशस्वी झाल्यास

1. **गेटचे आउटपुट काळजीपूर्वक वाचा** — कोणत्या फाइलने किंवा चिन्हाने नियमाचे उल्लंघन केले आहे, हे त्यात नेमके सांगितलेले असते.
2. **उल्लंघन दुरुस्त करा** — बहुतांश गेट या निर्धारक फाइलसिस्टम तपासण्या असतात आणि कोड योग्य होताच त्या उत्तीर्ण होतात.
3. **उल्लंघन आधीपासून अस्तित्वात असल्यास** (म्हणजे, तुम्ही ते आणलेले नाही, पण आता गेट त्याची तपासणी करते): समर्थनार्थ कारणाची टिप्पणी आणि ट्रॅकिंग इश्यू देऊन अनुमतिसूचीमध्ये नोंद जोडा.
4. **गेट रॅचेट असल्यास** (कव्हरेज, ESLint इशारे, पुनरावृत्ती, जटिलता):
   तुमच्या बदलामुळे मेट्रिक खराब झाले आहे. मूळ समस्या दुरुस्त करा किंवा, बदल हेतुपुरस्सर असेल आणि मेट्रिकमधील घसरण स्वीकारार्ह असेल तर (क्वचितच)
   `npm run quality:ratchet -- --update` चालवा — पण PR च्या वर्णनात त्याचे कारण नोंदवा.
5. **सल्लात्मक गेट** (`continue-on-error: true`) माहितीपुरते असतात — ते
   मर्ज रोखत नाहीत, पण CI सारांशात दिसतात. तरीही ते दुरुस्त करा.

---

## नवीन गेट जोडणे

1. `scripts/check/check-<name>.mjs` (किंवा `.ts`) तयार करा. धोरण गेट 0/1 एक्झिट करतात.
   रॅचेट-शैलीचे गेट `collect-metrics.mjs` द्वारे `quality-metrics.json` मध्ये मेट्रिक उत्सर्जित करतात.
2. `package.json` मध्ये `"check:<name>": "node scripts/check/check-<name>.mjs"` जोडा आणि
   `config/quality/gate-manifest.json` मधील उपनाव व त्याची तंतोतंत कमांड समक्रमित करा.
   विद्यमान प्रमाणीकरण उपनाव बदलताना किंवा काढून टाकतानाही हेच समक्रमण लागू करा.
   `npm run check:gate-manifest` चालवा; pre-commit hook आणि CI बदल वर्गीकरणाद्वारे
   हा करार लागू केला जातो.
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

## सुसूत्रीकरणाचा अनुशेष (ROI आढावा — टप्पा 9 लाट 3)

ही यादी 2026-06-17 रोजी `ci.yml` शी ताळमेळ करून अद्ययावत करण्यात आली (आधीच्या आवृत्तीत
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` वगळले गेले होते). ताळमेळ केलेल्या संचाच्या ROI आढाव्यातून
खालील सुसूत्रीकरणाचे संभाव्य उमेदवार ओळखले गेले. **विलीनीकरणे ही यांत्रिक CI
बदले आहेत; फ्लिप/वगळण्याचे निर्णय हे ऑपरेटरसाठी राखीव असलेले धोरणात्मक निर्णय आहेत.** खालीलपैकी काहीही
अद्याप लागू केलेले नाही.

**वरील भागात यांचेही दस्तऐवजीकरण झालेले नाही** (सल्लात्मक, कमकुवत संकेत): `docs-lint` जॉब
(markdownlint + Vale, संपूर्ण जॉब `continue-on-error`) आणि स्वतंत्र स्कॅनर वर्कफ्लो
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` हे
`quality-baseline.json` मध्ये आहे, परंतु `ci.yml` मधील ब्लॉकिंग रॅचेटशी जोडलेले नाही — हे मेट्रिक
सध्या अनाथ आहे.

### विलीनीकरण / डिड्युप्लिकेशन (यांत्रिक, कमी जोखीम)

प्रत्येक उमेदवाराची 2026-06-17 रोजी प्रत्यक्ष गेट स्थितीशी पडताळणी करण्यात आली (विश्वास ठेवा, पण पडताळा);
वरकरणी "स्पष्ट" वाटणाऱ्या अनेक विलीनीकरणांमागे प्रत्यक्षात तांत्रिक कर्ज दडलेले होते आणि ती **न थांबता वापरता येण्याजोगी** नाहीत.

- **`check:docs-sync` दोनदा चालते** — `lint` जॉबमध्ये स्वतंत्रपणे आणि पुन्हा `check:docs-all` (`docs-sync-strict`) तसेच husky pre-commit हुकमध्ये. ✅ **पूर्ण** — स्वतंत्र `lint` आवाहन काढून टाकले.
- **CVE स्कॅनिंग** — ❌ **निर्विघ्न विलीनीकरण नाही.** `audit:deps` सर्व पाच lockfiles मधील गंभीर सूचना आणि अपूर्ण ऑडिट ब्लॉक करते, तर सध्याच्या धोरणानुसार उच्च-स्तरीय सूचना इशारे म्हणून नोंदवते; `check:vuln-ratchet` (osv) हे केवळ चेक-इन केलेल्या बेसलाइनच्या तुलनेत _अधोगती_ झाल्यास अपयशी ठरते आणि आवश्यक असताना मापन उपलब्ध नसल्यास ते नाकारते. अर्थविषयक वर्तन वेगळे आहे — `audit:deps` वगळल्यास निरपेक्ष गंभीर गेट आणि स्वतंत्र पॅकेज ऑडिट पावत्या गमावल्या जातील. दोन्ही ठेवा.
- **सायकल शोध** — ✅ **पूर्ण** (#15159 G-01/G-02). येथील जुन्या मजकुरात `check:cycles` ला "हिरवे, निवडक" गेट म्हटले होते आणि `check:circular-deps` (dpdm) ने 91 सायकल नोंदवल्यामुळे ते ब्लॉकिंग ठेवण्याचे समर्थन केले होते. ते हिरवे असणे हे **खोटे हिरवे** होते: `check:cycles` ने 5 उपनिर्देशिका (450 फाइल्स) स्कॅन केल्या, केवळ स्थिर `import|export … from` शी जुळवणी केली आणि प्रत्येक `@/` व `@omniroute/open-sse/` स्पेसिफायर वगळला, त्यामुळे रेपोमध्ये प्रबळ असलेल्या dynamic-import + alias सायकल त्याला दिसू शकत नव्हत्या. दुरुस्ती केली: गेट आता `src` + `open-sse` (5023 फाइल्स) मधून फिरते, TypeScript AST मधून स्पेसिफायर गोळा करते (म्हणून `import("…")` मोजले जाते आणि type-position `typeof import("…")` मोजले जात नाही) आणि tsconfig `paths` निराकरण करते. त्याला 0 नव्हे, तर **14** सायकल सापडतात. आधीपासून अस्तित्वात असलेल्या 14 सायकल एका गेट PR मध्ये दुरुस्त करता येत नसल्यामुळे, `check:cycles` आता **रॅचेट** आहे (`--ratchet`, `quality-baseline.json` मध्ये कमाल मर्यादा `metrics.cycles.value = 14`, `direction: down`) — ते कोणतीही _अधोगती_ ब्लॉक करते आणि संख्या केवळ कमी होऊ शकते. CI मध्ये `npm run check:cycles:ratchet` चालते. टप्प्याटप्प्याने घट **A-01** सोबत केली जाईल. व्यापक दुसरे मत म्हणून `check:circular-deps` (dpdm) सल्लात्मकच राहते.
- **जटिलता** — ✅ **पूर्ण** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint फेरी, ruleId नुसार मोजणी, जेणेकरून cyclomatic+max-lines आणि cognitive बेसलाइन स्वतंत्र राहतील; स्वतंत्र `check:complexity` / `check:cognitive-complexity` स्थानिक `--update` साठी कायम राहतील.
- **`/api` भासविरोधी तपासणी** — ✅ **पूर्ण** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` ची एक FS यादी, openapi-routes + docs-symbols अजूनही स्वतंत्रपणे अहवाल देतात; स्वतंत्र तपासण्या स्थानिक रनसाठी कायम राहतात.
- **`check:node-runtime` 11 जॉबमध्ये चालते** — ⚠️ **कमी ROI.** प्रत्येक स्वतंत्र runner आहे आणि तपासणीस <1s लागतो; स्वस्त per-job संरक्षक गमावण्याच्या बदल्यात एकूण बचत ~10s. या उलथापालथीइतके ते फायदेशीर नाही.
- **CI lint वरील `typecheck:noimplicit:core`** — ✅ **lint जॉबमधून काढले** (ते सल्लात्मक `continue-on-error` होते); ब्लॉकिंग type surface म्हणजे `typecheck:core` + `check:type-coverage`. स्थानिक स्क्रिप्ट कायम ठेवली.

### फ्लिप / निर्णय (ऑपरेटर धोरण)

- `check:openapi-security-tiers` (सल्लात्मक) — ❌ **थेट फ्लिप करता येत नाही.** ते 0 सह बाहेर पडते, परंतु `LOCAL_ONLY_API_PREFIXES` अंतर्गत अनेक `traffic-inspector` रूटमध्ये `x-loopback-only: true` भाष्य नसल्याचा इशारा देते. ते अंमलात आणण्यापूर्वी `openapi.yaml` मध्ये ही भाष्ये जोडणे आवश्यक आहे.
- `typecheck:noimplicit:core` (सल्लात्मक) — ब्लॉकिंग `check:type-coverage` रॅचेटमध्ये याचा बराचसा भाग आधीच समाविष्ट आहे. ते रॅचेटमध्ये फ्लिप करा किंवा अनावश्यक दुसरी `tsc` फेरी वगळा.
- `test:vitest:ui` (आता **ब्लॉकिंग**) — आधीपासून असलेली अपयशे `vitest.config.ts` मध्ये `// #8618` ट्रॅकिंग टिप्पण्यांसह स्पष्टपणे वगळली आहेत; नवीन अपयशांमुळे जॉब अपयशी होतो.
- `check:secrets` (gitleaks, ब्लॉकिंग रॅचेट) — सध्याची कमाल मर्यादा `quality-baseline.json` मधील `metrics.secretFindings` आहे. कोणत्याही अपवादासाठी समर्थनीय `.gitleaks.toml` नोंद आवश्यक आहे; मापन अनुपलब्ध असल्यास स्थिती INCOMPLETE असते. हे स्कॅन GitHub च्या मूळ secret scanning आणि `check:public-creds` ला पूरक आहे.
- `check:pr-evidence` (ब्लॉकिंग, PR-body मधील गद्य मजकुरावर grep करते) — खोट्या सकारात्मक निष्कर्षांचा धोका जास्त आहे; ते वगळल्यास Hard Rule #18 ची अंमलबजावणी कमकुवत होते, त्यामुळे हा खरा धोरणात्मक निर्णय आहे.
- `semgrep` (स्वतंत्र सल्लात्मक तपासणी) — OWASP प्रकारांसाठी CodeQL शी पुनरावृत्ती होते; त्याची बेसलाइन रॅचेटशी जोडा किंवा ते वगळा.

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
