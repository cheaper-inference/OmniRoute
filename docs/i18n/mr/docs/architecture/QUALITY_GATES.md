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

## गेट इन्व्हेंटरी आणि एक्झिक्युशन प्रोफाइल

### उमेदवार प्रवेश

CI आणि Quality Gates वर्कफ्लो प्रत्येकी एक स्थिर निकाल देतात: `Gate / CI` आणि
`Gate / Quality`. त्यांचे आवृत्तीबद्ध प्रवेश धोरण प्रत्येक अपस्ट्रीम जॉबची गणना
आवश्यक (required) किंवा सल्लागार (advisory) म्हणून करते. लागू असलेला आवश्यक जॉब यशस्वी झालाच पाहिजे: हरवलेले (missing),
रद्द (cancelled), वगळलेले (skipped), प्रलंबित (pending) आणि अज्ञात (unknown) निकाल PASS स्थापित करू शकत नाहीत. वैध
केवळ-दस्तऐवज (docs-only) किंवा केवळ-कॅटलॉग (catalog-only) वर्गीकरण कोड लेन लागू नसलेली ठरवू शकते;
मसुदा (draft) PR हा स्वीकृत उमेदवार नसतो. `hotfix` लेबल पुराव्यापासून सूट देत नाही.

दोन्ही वर्कफ्लो main/release शाखांकडे जाणारे PR, `main` वरील पुश, मॅन्युअल डिस्पॅच
आणि मर्ज-ग्रुप इव्हेंट समाविष्ट करतात. पुश, डिस्पॅच आणि मर्ज-ग्रुप संपूर्ण निवड चालवतात.
`release/**` वरील पुश त्यांना सुरू करत नाहीत (2026-10-18): प्रत्येक बदलाने आधीच त्याच्या PR वर मॅट्रिक्स
चालवलेला असतो आणि विलीन केलेले संयोजन हे Release-Green चे काम आहे (`docs/ops/RUNNER_BOX.md` → Hosted लेन). फोर्क
आणि मर्ज ग्रुप, अन्यथा self-hosted रनर निवडणाऱ्या जॉबसाठी hosted रनर
वापरतात; रोलआउटपूर्वी पुरेशी hosted क्षमता सत्यापित करणे आवश्यक आहे.

प्रत्येक JSON पावती चेक-आउट केलेला SHA, वर्कफ्लो रन आणि प्रयत्न (attempt) ओळखते.
CLI चेकआउट/इव्हेंट SHA विसंगती नाकारते. वर्कफ्लो चाचण्या धोरण सदस्यत्वाला
निकाल जॉबच्या `needs` यादीशी बांधतात, जेणेकरून नवीन किंवा काढून टाकलेली लेन शांतपणे अदृश्य होऊ शकत नाही.
या पावत्या त्यांच्या स्वतःच्या वर्कफ्लोचा समावेश करतात — प्रकाशन, तैनाती (deployment) किंवा
विद्यमान सल्लागार स्कॅनरच्या अंतर्गत घटकांचा नाही. शाखा नियमांमध्ये दोन्ही चेक नावे सक्रिय करणे हा एक
स्वतंत्र प्रशासकीय बदल आहे; हे जॉब जोडण्याने स्वतःच शाखा संरक्षित होत नाही.

### स्टॅटिक स्कॅन इन्व्हेंटरी

आवृत्तीबद्ध npm-उपनाम इन्व्हेंटरी आणि स्टॅटिक-स्कॅन सदस्यत्व
`config/quality/gate-manifest.json` मध्ये असते. `package.json` शी स्क्रिप्ट नावे आणि अचूक कमांड
प्रमाणित करण्यासाठी `npm run check:gate-manifest` चालवा; जोड, काढून टाकणे आणि
कमांड ड्रिफ्ट लोकल हुक आणि CI मधील बदल-वर्गीकरण जॉब दोन्हींना अयशस्वी करतात.
उपनाम (alias) म्हणजे वर्कफ्लो जॉब, मॅट्रिक्स इन्स्टन्स किंवा टेस्ट केस नव्हे: या संख्या
परस्परविनिमय म्हणून सादर करू नयेत.

निवडलेल्या उपनामांची, ते अंमलात न आणता, तपासणी करण्यासाठी `npm run quality:scan -- --list`
किंवा `npm run quality:scan:fast -- --list` वापरा. रनर
npm एंट्रीपॉइंट आवाहन करतो, म्हणून त्याचे रनटाइम (कॉन्फिगर केलेल्या ठिकाणी Bun सह) टिकून राहते.
मॅनिफेस्ट त्या प्रोफाइलच्या बाहेरील उपनामांना स्वतंत्रपणे आवाहित म्हणून नोंदवतो, आणि
केवळ-वाचन स्कॅन प्रोफाइलमध्ये मेंटेनन्स कमांड निषिद्ध असतात.

या प्रोफाइल केवळ स्टॅटिक स्कॅनचा समावेश करतात. त्या उत्पादन चाचण्या,
कव्हरेज, पॅकेजिंग, बाह्य तपासण्या किंवा उमेदवाराचा संपूर्ण रिलीज स्वीकार प्रमाणित करत नाहीत.
वर्कफ्लो प्रवेश लिंक केलेले `config/quality/admission-policy.json` आणि
`scripts/quality/admission-verdict.mjs` वापरते. रिलीज-ऑब्झर्व्हर प्रोफाइल स्वतंत्र राहतात;
त्यांच्या लागू तपासण्या आणि पावत्या स्वतंत्रपणे तपासा. खालील गद्य
इन्व्हेंटरी हा संदर्भ आहे — गेट प्रत्यक्षात चालला होता याचा पुरावा नव्हे.

स्क्रिप्ट `scripts/check/` (धोरण गेट) आणि `scripts/quality/` (रॅचेट इंजिन) खाली असतात.
CI चा सत्य स्रोत `.github/workflows/ci.yml` आहे.

### रिलीज PR फास्ट-पाथ (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main` वरील पुश,
डिस्पॅच आणि मर्ज ग्रुपवर CI ला पूरक ठरते. PR पाथ-फिल्टर केलेल्या जलद तपासण्या
वापरतात. कायमस्वरूपी अक्षम केलेले डुप्लिकेट बिल्ड काढून टाकण्यात आले; खऱ्या बिल्ड/पॅकेज/बूट
तपासण्या CI मध्ये राहतात.

| जॉब                                              | व्याप्ती                                                                                                                                                                                            | अवरोधक       |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `Docs Gates (fast-path)`                         | दस्तऐवज/कोड PR; API दस्तऐवज संदर्भ आणि docs-all                                                                                                                                                     | हो           |
| `Fast Quality Gates`                             | कोड PR; स्टॅटिक तपासण्या, टाइपचेक, डॅशबोर्ड टाइपचेक, प्रभावित युनिट चाचण्या                                                                                                                         | हो           |
| `Forgotten sibling tests`                        | कोड PR; बदललेली मॉड्यूल्स स्टॅटिक ग्राहकांपर्यंत आणि उमेदवार सिब्लिंग चाचण्यांपर्यंत ट्रेस केलेली; बॅरल आणि डायनॅमिक-इम्पोर्ट पथ, संदर्भित allowlist अपवादांसह, सल्लागार निदान म्हणून नोंदवले जातात | **सल्लागार** |
| `Vitest (fast-path)`                             | कोड PR; जलद vitest सूट                                                                                                                                                                              | हो           |
| `Unit Tests fast-path`                           | कोड PR; 4-शार्ड युनिट सूट                                                                                                                                                                           | हो           |
| `No new ESLint warnings`                         | कोड PR; suppressions-जागरूक lint गार्ड                                                                                                                                                              | हो, फोर्कसह  |
| `Merge integrity (changelog + generated skills)` | मसुदा नसलेले PR; changelog आणि जनरेट केलेल्या skill चे सिंक                                                                                                                                         | हो, फोर्कसह  |

#### विसरलेल्या सिब्लिंग चाचण्यांचा (Forgotten sibling tests) अहवाल

`npm run check:forgotten-sibling-tests` हे test-impact map मागील import resolver पुन्हा वापरते. प्रत्येक बदललेल्या production module साठी, candidate test pull-request diff मध्ये अनुपस्थित असताना ते deterministic `changed module/symbol -> static consumer -> candidate sibling test` chains नोंदवते. Markdown सारांश आणि JSON निकाल कोणत्याही blocking rollout पूर्वी calibration साठी `forgotten-sibling-tests` workflow artifact म्हणून जतन केले जातात.

Barrel re-exports आणि dynamic imports हे केवळ resolution diagnostics आहेत; ते कधीही blocking finding तयार करत नाहीत. पुनरावलोकन केलेले अपवाद `config/quality/forgotten-sibling-allowlist.json` मध्ये ठेवलेले असतात. प्रत्येक entry ने consumer आणि candidate test चे नाव द्यावे, विशिष्ट कारण सांगावे आणि GitHub issue किंवा pull request शी लिंक करावे. चुकीच्या स्वरूपातील entries fail closed होतात. अपवाद deleted candidate test किंवा `.skip`/`.todo` जोडणारा diff दाबवू शकत नाहीत; assertion weakening आणि इतर masking हे स्वतंत्रपणे blocking असलेल्या `check:test-masking` gate च्या अखत्यारीत राहतात.

### जॉब: `lint`

`main` वरील प्रत्येक PR वर चालते. अयशस्वी झाल्यास merge अवरोधित करते.

| स्क्रिप्ट (`npm run ...`)         | तपासते                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | अवरोधक                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js आवृत्ती समर्थित श्रेणीमध्ये आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | होय                                       |
| `check:cycles`                    | संपूर्ण `src/` + `open-sse/` मधील सर्क्युलर इम्पोर्ट्स (AST-आधारित, tsconfig `paths` रिझॉल्व्ह केलेले). कोणतीही सायकल अस्तित्वात असल्यास Bare 1 ने बाहेर पडते (#15281 पासून fail-closed) आणि SCCs सूचीबद्ध करते. `check:cycles:ratchet` (जे CI चालवते) मोजमाप `quality-baseline.json` मधील `metrics.cycles` मर्यादा ओलांडल्यास अवरोधित करते — सध्या 14, `direction: down`, म्हणून ती फक्त कमीच होऊ शकते (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | होय (ratchet)                             |
| `check:boundary`                  | `open-sse → src` कपलिंग: इंजिनमधून अॅपमध्ये जाणारे युनिक फाइल-ते-फाइल इम्पोर्ट्स (`scripts/quality/measure-boundary.mjs`; एज सूची ही v4 core/module-split रेमेडिएशन बॅकलॉग आहे). Bare = सल्लागार अहवाल (`quality:boundary` प्रमाणेच). `check:boundary:ratchet` (जे CI चालवते, तसेच `quality.yml` fast-gates ratchet लूपमध्येही आहे) मोजमाप `quality-baseline.json` मधील `metrics.boundaryOpenSseToSrc` मर्यादा ओलांडल्यास अवरोधित करते — मोजलेल्या 771 वर सीड केलेले, `direction: down`; `--update` ती फक्त कमीच करते; PRs वर base-relative (`--base-ref`, खाली पहा)                                                                                                                                                                                                                                                                                                                                 | होय (ratchet)                             |
| `check:route-validation:t06`      | सर्व रूट्सवर Zod स्कीमा उपस्थित आहेत (Tier 6 धोरण)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` ची संख्या बजेट ओलांडत नाही (Tier 11 रॅचेट)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                       |
| `check:provider-consistency`      | `providers.ts` मधील प्रत्येक प्रोव्हायडरची `providerRegistry.ts` मध्ये जुळणारी नोंद असते (आणि उलटपणे, allowlist च्या आत)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | होय                                       |
| `check:model-lifecycle`           | हाताने सांभाळली जाणारी तीन रूटिंग टेबल्स चेक-इन केलेल्या लाइफसायकल स्नॅपशॉटशी (#11503) सुसंगत राहतात: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` रूट करू शकणाऱ्या कोणत्याही निवृत्त (retired) आयडीला स्कोअर देत नाही; प्रत्येक `BUILT_IN_ALIASES` टार्गेट `REGISTRY` मध्ये उपस्थित असते आणि निवृत्त-आयडी स्नॅपशॉटमध्ये नसते; `REGISTRY` मध्ये अजूनही असलेला प्रत्येक निवृत्त आयडी फॉरवर्ड केला जातो किंवा `allowedRetiredInCatalog` मध्ये सूचीबद्ध असतो; आणि त्या स्नॅपशॉटमध्ये कोणताही `DEFAULT_DEGRADATION_MAP` स्रोत किंवा टार्गेट निवृत्त दिसत नाही. हे सिद्ध करत नाही की एखादे मॉडेल सध्या लाइव्ह अपस्ट्रीमद्वारे दिले जात आहे. ऑफलाइन — `config/quality/model-lifecycle.json` शी तुलना करते, जे `npm run quality:refresh-model-lifecycle` ने हाताने रिफ्रेश केले जाते (नेटवर्क; CI मध्ये जोडलेले नाही). `allowedRetiredInCatalog` हा बर्न-डाउन रॅचेट आहे: फक्त ट्रॅकिंग इश्यूसहच नोंद जोडा. | होय                                       |
| `check:fetch-targets`             | क्लायंट-साइड `src/` मधील प्रत्येक `fetch("/api/...")` खऱ्या `route.ts` शी जुळतो                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | होय                                       |
| `check:deps`                      | रेपोमधील प्रत्येक `package.json` मधील सर्व `npm install`-योग्य डिपेंडन्सी `dependency-allowlist.json` मध्ये आहेत; नवीन अनपिन किंवा slopsquat केलेली पॅकेजेस फ्लॅग केली जातात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `audit:deps`                      | `npm audit` (root + electron) — उच्च/गंभीर अॅडव्हायझरी नाहीत (osv `check:vuln-ratchet` शी अतिव्याप्त; Rationalization Backlog पहा)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय                                       |
| `check:lockfile`                  | `package-lock.json` अखंडता — https रजिस्ट्री, integrity हॅशेस, होस्ट ओव्हरराइड्स नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | होय                                       |
| `check:licenses`                  | प्रोडक्शन डिपेंडन्सीजसाठी SPDX परवाना अनुमतिसूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | होय                                       |
| `check:tracked-artifacts`         | बिल्ड आर्टिफॅक्ट्स / कमिट केलेले `node_modules` सिम्लिंक्स नाहीत (husky pre-commit मध्येही चालते; pre-push जाणीवपूर्वक हलके ठेवले आहे — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                       |
| `check:ai-attribution`            | PR कमिट्स, शीर्षक किंवा बॉडीमध्ये AI/बॉट `Co-Authored-By` ट्रेलर किंवा AI-जनरेटेड फूटर नाही — कठोर नियम #16 (PR→`release/**` साठी `quality.yml` फास्ट-गेट्स लूपमध्ये — इव्हेंट पेलोड वाचते, PR खेळत नसताना नो-ऑप — आणि PR→`main` साठी `ci.yml` लिंटमध्ये PR-ओनली स्टेप; तसेच husky `commit-msg` हुक; मानवी सह-लेखकांना परवानगी आहे; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | प्रत्येक Vitest वगळणीमध्ये ट्रॅकिंग इश्यूचे नाव असते आणि ती `config/quality/vitest-exclusions.json` मध्ये दिसते (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | होय                                       |
| `check:file-size`                 | सोर्स फाइल्स (`src/`, `open-sse/`, `electron/`, `bin/` मधील `.ts`/`.tsx`) `cap` च्या आत राहतात आणि टेस्ट फाइल्स (`*.test.ts(x)`) `testCap` च्या आत; `file-size-baseline.json` मध्ये गोठवलेल्या फाइल्स (`frozen` / `testFrozen`) त्यांच्या नोंदवलेल्या आकारापेक्षा वाढू नयेत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | होय                                       |
| `check:error-helper`              | executors/handlers मधील त्रुटी प्रतिसाद `buildErrorBody()` / `sanitizeErrorMessage()` वापरतात (कठोर नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | होय                                       |
| `check:migration-numbering`       | Migration SQL फाइल्स सलग क्रमांकित आहेत; कोणतेही अंतर नाहीत किंवा डुप्लिकेट नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | होय                                       |
| `check:public-creds`              | `publicCreds.ts` बाहेर कोणतेही शाब्दिक OAuth `client_id`/`client_secret` किंवा Firebase Web कीज नाहीत (कठोर नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                       |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल्सबाहेर कोणतेही कच्चे SQL नाही; `localDb.ts` मधून barrel-imports नाहीत (कठोर नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | होय                                       |
| `check:known-symbols`             | Provider executors, routing strategies आणि translators त्यांच्या dispatch tables मध्ये नोंदणीकृत आहेत ते डिस्कवरील फाइल्सशी जुळतात — कोणतीही अनाथ किंवा न घोषित केलेली symbols नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                       |
| `check:route-guard-membership`    | चाइल्ड प्रोसेस स्पॉन करणारा प्रत्येक रूट `isLocalOnlyPath()` द्वारे वर्गीकृत आहे (कठोर नियम #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                       |
| `check:test-discovery`            | रेपोमधील प्रत्येक `*.test.ts` / `*.spec.ts` फाइल किमान एका टेस्ट रनरद्वारे गोळा केली जाते (रॅचेट: `test-discovery-baseline.json` मधील अनाथ यादी फक्त कमीच होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | होय                                       |
| `check:agent-skills-sync`         | जनरेट केलेले agent-skills आर्टिफॅक्ट्स त्यांच्या स्रोत कॅटलॉगशी जुळतात (ड्रिफ्ट नाही)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                           |
| `check:provider-asset-provenance` | प्रदाता लोगो/अॅसेट्ससाठी नोंदवलेली प्रोव्हेनन्स एन्ट्री असते                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                           |
| `lint:json`                       | JSON कॉन्फिग फाइल्स पार्स होतात आणि रेपो लिंट नियमांचे पालन करतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                           |
| `typecheck:core`                  | TypeScript कंपायलेशन त्रुटींशिवाय (फक्त सल्लामसलत चेतावण्या)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                       |
| `typecheck:noimplicit:core`       | कठोर `noImplicitAny` — भविष्याभिमुख; अनेक आधीपासूनच्या कॉल साइट्सना अजूनही अॅनोटेशन्सची आवश्यकता आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **सल्लामसलत** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` वर स्कोप केलेले `tsc` (#7033) — `typecheck:core` च्या क्युरेट केलेल्या 27-फाइल अलाऊलिस्टमध्ये कोणतेही डॅशबोर्ड TSX नाही, आणि `next build` देखील त्याचे कधीही टाइप-चेक करत नाही (`next.config.mjs` मध्ये `ignoreBuildErrors: true` सेट केलेले आहे), म्हणून तिथील अनाथ-आयडेंटिफायर रिग्रेशन्स (#6625/#6909) CI ला दिसत नव्हते. गोठवलेल्या प्रति-फाइल/प्रति-TS-कोड संख्या बेसलाइनशी डिफ करते (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` प्रमाणेच स्टेल-एनफोर्समेंट पॅटर्न) — बेसलाइन केलेल्या संख्येच्या पलीकडच्या फक्त नवीन त्रुटी गेट अयशस्वी करतात; आधीपासूनची त्रुटी दुरुस्त झाल्यावर `--update` सह खाली रॅचेट करा.                                                                                                                                                                                                                        | होय                                       |

### जॉब: `quality-gate`

`test-coverage` नंतर चालते. अयशस्वी झाल्यास मर्ज अवरोधित करते.

| स्क्रिप्ट                    | प्रमाणित करते                                                                                                                                                | अवरोधक                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `quality:collect`            | `quality-metrics.json` उत्सर्जित करते (ESLint चेतावणी संख्या, विलीन शार्ड अहवालातील कव्हरेज)                                                                 | होय (रॅचेटच्या अपस्ट्रीम) |
| `quality:ratchet`            | `quality-baseline.json` मधील प्रत्येक मेट्रिक घटलेला नाही (ESLint चेतावण्या ≤ बेसलाइन; कव्हरेज ≥ बेसलाइन)                                                    | होय                       |
| `check:duplication`          | कोड डुप्लिकेशन (jscpd@4) `quality-baseline.json` मधील बेसलाइन ओलांडत नाही                                                                                    | होय                       |
| `check:complexity`           | फाइल-स्तरीय सायक्लोमॅटिक कॉम्प्लेक्सिटी मर्यादा ओलांडत नाही (कोर ESLint `complexity` + `max-lines-per-function`)                                             | होय                       |
| `check:cognitive-complexity` | कॉग्निटिव्ह कॉम्प्लेक्सिटी रॅचेट (`eslint-plugin-sonarjs`) — स्वतंत्र ESLint पास; CI दोन्ही एकत्रित करून एकच `check:complexity-ratchets` पायरी म्हणून चालवते | होय                       |
| `check:dead-code`            | न वापरलेले एक्सपोर्ट्स / फाइल्स रॅचेट (knip) बेसलाइनच्या तुलनेत घटत नाही                                                                                     | होय                       |
| `check:compression-budget`   | कॉम्प्रेशन बेंचमार्क बजेट — प्रति-इंजिन टोकन-बचत किमान पातळी घटू नये                                                                                         | होय                       |
| `check:type-coverage`        | पर्सेंट-टाइप्ड रॅचेट (`type-coverage`) घटत नाही; बहुतांश `typecheck:noimplicit:core` ला समाविष्ट करते                                                        | होय                       |
| `check:codeql-ratchet`       | खुल्या CodeQL अलर्टची संख्या वाढत नाही (`gh api` द्वारे वाचते; टोकनशिवाय सुषम-वगळणी) — रिफ्रेश वेळापत्रक आणि मॅन्युअल ट्रिगर: खालील "CodeQL रॅचेट" पहा       | होय                       |

### जॉब: `quality-extended`

संपूर्ण जॉब सल्लामसलत आहे (`continue-on-error: true`). npm-आधारित रॅचेट्स खरोखर चालतात;
बाह्य स्कॅनर्स `gh release download` द्वारे इन्स्टॉल होतात आणि बायनरी अजूनही अनुपलब्ध
असल्यास स्वतः-वगळतात (exit 0).

| स्क्रिप्ट                | प्रमाणित करते                                                                                                                                                                                     | अवरोधक                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | सर्क्युलर डिपेंडन्सी नाहीत (dpdm)                                                                                                                                                                 | **सल्लामसलत**                                   |
| `check:bundle-size`      | बंडल आकार मर्यादा ओलांडत नाही                                                                                                                                                                     | **सल्लामसलत**                                   |
| `check:secrets`          | सीक्रेट स्कॅनिंग (gitleaks) — बायनरी अनुपलब्ध असल्यास वगळते                                                                                                                                       | **सल्लामसलत**                                   |
| `check:vuln-ratchet`     | डिपेंडन्सी भेद्यता (osv-scanner) वाढत नाहीत — बायनरी अनुपलब्ध असल्यास वगळते                                                                                                                       | **सल्लामसलत**                                   |
| `check:workflows`        | वर्कफ्लो लिंट (actionlint + zizmor); गहाळ/बिघडलेले स्कॅनर्स, अवैध अहवाल किंवा गहाळ रॅचेट बेसलाइन INCOMPLETE म्हणून अयशस्वी होतात. वैध निष्कर्ष निवडलेल्या कठोर/सल्लामसलत/रॅचेट धोरणाचे पालन करतात | अंमलबजावणी आवश्यक; CI मध्ये zizmor रॅचेट अवरोधक |
| `check:openapi-breaking` | सार्वजनिक API करारात (`openapi.yaml`) बेस ब्रँचच्या तुलनेत ब्रेकिंग बदल (oasdiff) — `openapiBreaking=N` उत्सर्जित करते; oasdiff अनुपलब्ध असल्यास किंवा बेस स्पेक अनिर्णेय असल्यास वगळते           | **सल्लामसलत**                                   |

### जॉब: `docs-sync-strict`

`main` वरील प्रत्येक PR वर चालते. अयशस्वी झाल्यास मर्ज अवरोधित करते.

| स्क्रिप्ट                      | काय सत्यापित करते                                                                                                                                          | अवरोधक                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | खालील 6 उप-गेट्स क्रमाने चालवणारे मेटा-गेट                                                                                                                 | होय                              |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt आवृत्ती सुसंगतता                                                                                                             | होय                              |
| ↳ `check:docs-counts`          | गद्यातील संख्या (प्रोव्हायडर संख्या, माइग्रेशन संख्या इ.) खऱ्या संख्यांच्या रॅचेट विंडोमध्ये आहेत                                                          | होय                              |
| ↳ `check:env-doc-sync`         | `.env.example` मधील प्रत्येक env var डॉक्स टेबलमध्ये नोंदवलेला आहे, आणि उलटही                                                                              | होय                              |
| ↳ `check:deprecated-versions`  | डॉक्समध्ये कोणतेही अप्रचलित आवृत्ती स्ट्रिंग्ज नाहीत                                                                                                       | होय                              |
| ↳ `check:doc-links`            | डॉक्समधील अंतर्गत मार्कडाउन लिंक्स खऱ्या फाइल्सकडे नेतात (`[text]`/`(path)` स्वरूपात)                                                                      | होय                              |
| ↳ `check:fabricated-docs`      | डॉक्समध्ये उल्लेखलेले रूट्स, env vars, CLI कमांड्स, हुक नावे आणि फाइल पथ्स कोडबेसमध्ये अस्तित्वात आहेत. `--strict` द्वारे हार्ड गेट; फ्लॅगशिवाय सॉफ्ट-फेल. | होय (CI मध्ये `--strict` द्वारे) |
| `check:cli-i18n`               | CLI कमांड स्ट्रिंग्ज सर्व i18n लोकेल फाइल्समध्ये उपस्थित आहेत                                                                                              | होय                              |
| `check:openapi-coverage`       | OpenAPI स्पेसिफिकेशन खऱ्या रूट्सचा किमान रॅचेट केलेला आधार कव्हर करते                                                                                      | होय                              |
| `check:openapi-security-tiers` | `openapi.yaml` मधील सिक्युरिटी टियर भाष्ये `routeGuard.ts` वर्गीकरणांशी सुसंगत आहेत                                                                        | **सल्लामसलत**                    |
| `check:openapi-routes`         | `openapi.yaml` मधील प्रत्येक पथ खऱ्या `route.ts` कडे नेतो (अँटी-हॅल्युसिनेशन)                                                                              | होय                              |
| `check:docs-symbols`           | `docs/**/*.md` मधील प्रत्येक `/api/...` संदर्भ खऱ्या `route.ts` कडे नेतो (अँटी-हॅल्युसिनेशन)                                                               | होय                              |
| `i18n translation drift`       | i18n लोकेल फाइल्समधील अननुवादित की — फक्त चेतावणी                                                                                                          | **सल्लामसलत**                    |

### जॉब: `i18n-ui-coverage`

| स्क्रिप्ट                         | काय सत्यापित करते                                                                                                                                                                 | अवरोधक        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | UI i18n की कव्हरेज ≥ 65% आहे                                                                                                                                                      | होय           |
| `check-ui-value-drift` (inline)   | पुन्हा लिहिलेली इंग्रजी **व्हॅल्यू** मागे कोणतेही कालबाह्य भाषांतर सोडत नाही                                                                                                      | होय           |
| `check-new-key-coverage` (inline) | **नवीन** इंग्रजी की प्रत्येक लोकेलमध्ये अनुवादित आहे — `__MISSING__:` मार्कर नाकारला जातो                                                                                         | होय           |
| `check-translation-ratio`         | प्रति-लोकेल खरे-भाषांतर गुणोत्तर (इंग्रजीशी-सारखेच / प्लेसहोल्डर / allowlist च्या बाहेर राहिलेले गहाळ) `config/quality/i18n-translation-baseline.json` + slack पेक्षा जास्त नसावे | **सल्लामसलत** |

`fetch-depth: 0` आवश्यक आहे — व्हॅल्यू-ड्रिफ्ट गेट `en.json` ची merge base विरुद्ध तुलना करते.

#### `check-ui-value-drift` — कालबाह्य-भाषांतर गेट

इतर गेट्स रचनात्मकदृष्ट्या पाहू शकत नाहीत अशा एका i18n प्रतिगमनाला पकडते: इंग्रजी व्हॅल्यू
पुन्हा लिहिली जाते आणि _मागील_ इंग्रजीमधून तयार झालेली भाषांतरे मागे राहतात, त्यामुळे
इंग्रजी नसलेले वापरकर्ते आत्मविश्वासाने लिहिलेला, आता चुकीचा मजकूर वाचत राहतात.

हे खरोखरच प्रकाशित झाले. Antigravity लॉगिन हेल्पर आल्यावर (#5203)
`oauthModal.googleOAuthWarning` पुन्हा लिहिले गेले; **43 पैकी 39 लोकेल्स** मध्ये ऑपरेटर्सना
"पूर्ण URL कॉपी करा आणि खाली पेस्ट करा" असे सांगणारा मजकूर राहिला — त्या प्रोव्हायडरसाठी
पूर्ण होऊच शकत नसलेला फ्लो. #8463 पर्यंत हे लक्षात आले नाही कारण:

- `sync-ui-keys` फक्त **अनुपस्थित** असलेल्या की भरते, **कालबाह्य** की कधीही नाही;
- `check-ui-keys-coverage` कीची _उपस्थिती_ मोजते, त्यामुळे कालबाह्य भाषांतर कव्हर झालेले म्हणून गणले जाते;
- `check-translation-drift` `docs/i18n/<locale>/**.md` दस्तऐवज मिरर ट्रॅक करते —
  ते कधीही `src/i18n/messages/*.json` वाचत नाही. 2026-09 री-सिंकपासून `docs-sync-strict` जॉबमध्ये
  अवरोधक: कोअर डॉक संपादित करा → `npm run i18n:run -- --files=<doc>` (विभाग-स्तर, स्वस्त).

**डिफ-आधारित, बेसलाइन-आधारित नाही.** हे मर्ज बेसवरील `en.json` ची वर्किंग ट्रीशी तुलना करते; ज्या प्रत्येक कीचे इंग्रजी मूल्य बदलले आहे, त्यासाठी हात लागलेला नसलेला अनुवाद अजूनही धारण करणारे कोणतेही लोकॅल कालबाह्य आहे. हे जाणीवपूर्वक **पूर्वीची थकबाकी गोठवते** — डिफ हे उघड करू शकत नाही की दीर्घकालीन अनुवाद कोणत्या जुन्या इंग्रजीतून आला, म्हणून गेट फक्त सध्याचा बदल ज्याला स्पर्श करतो त्याचाच विचार करते. पर्यायी मार्गाने (प्रति-की हॅश बेसलाइन) ~600 KB जनरेट केलेली फाइल लागेल, जी विद्यमान सर्वात मोठ्या बेसलाइनच्या 3× पट आहे आणि प्रत्येक i18n PR वर सतत बदलेल.

ते पूर्ण करण्याचे दोन मार्ग:

1. प्रभावित अनुवाद अपडेट करा, किंवा
2. त्यांना `__MISSING__:<new english>` वर सेट करा — रनटाइम नंतर दुरुस्त केलेले इंग्रजी पुरवते
   (`src/i18n/request.ts::deepMergeFallback`, #7258) आणि की अनुवादासाठी रांगेत उभी राहते.

जर स्ट्रिंगचा **अर्थ** बदलला असेल, तर **कीचे नाव बदलणे** पसंत करा: नवीन की कालबाह्य अनुवाद वारशाने घेऊ शकत नाही. हा #8463 ने वापरलेला पॅटर्न आहे.

```bash
npm run i18n:check-value-drift          # कठोर (CI जे चालवते)
npm run i18n:check-value-drift:warn     # फक्त अहवाल
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

बेस कॅटलॉग वाचता येत नसेल तेव्हा (बेस रेफशिवाय शॅलो क्लोन) `SKIP reason=base-unresolved` सह 0 ने बाहेर पडते, `check-openapi-breaking` ची नक्कल करते.

### जॉब: `i18n`

संपूर्ण i18n वैधीकरण मॅट्रिक्स (प्रत्येक लोकॅलसाठी एक जॉब). संपूर्ण जॉब सल्लामसलत आहे.

| स्क्रिप्ट                       | पडताळणी                           | ब्लॉकिंग                                                |
| ------------------------------- | --------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | प्रत्येक लोकॅलसाठी अनुवाद पूर्णता | **सल्लामसलत** (संपूर्ण जॉबवर `continue-on-error: true`) |

### जॉब: `pr-test-policy`

फक्त पुल रिक्वेस्टवर चालते.

| स्क्रिप्ट              | पडताळणी                                                                                                                                         | ब्लॉकिंग |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, किंवा `bin/` मधील प्रोडक्शन कोड बदलणाऱ्या PR ने चाचण्या समाविष्ट कराव्यात किंवा अपडेट कराव्यात (कठोर नियम #8) | होय      |
| `check:test-masking`   | बदललेल्या टेस्ट फाइल्स निव्वळ असर्ट संख्या कमी करत नाहीत किंवा `assert.ok(true)` टॉटॉलॉजी जोडत नाहीत                                            | होय      |
| `check:pr-evidence`    | PR बॉडी बदलासाठी टेस्ट/VPS पुरावा उद्धृत करते (PR मजकूर ग्रेप करून कठोर नियम #18 ला यांत्रिक बनवते — तकलादू, बॅकलॉग पहा)                        | होय      |

### जॉब: `test-vitest`

`build` नंतर चालते. अयशस्वी झाल्यास मर्ज ब्लॉक करते.

| सूट              | पडताळणी                                               | ब्लॉकिंग                                                                                                          |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्व्हर (110 टूल्स), autoCombo, कॅशे — vitest रनर | होय                                                                                                               |
| `test:vitest:ui` | UI कंपोनंट टेस्ट्स — vitest रनर                       | **ब्लॉकिंग** — पूर्व-विद्यमान अपयशे `vitest.config.ts` मध्ये स्पष्टपणे वगळलेली आहेत; नवीन अपयशे जॉब अयशस्वी करतात |

### नाइटली वर्कफ्लो (शेड्यूल केलेले, सल्लामसलत)

हे cron शेड्यूलवर (आणि `workflow_dispatch`) चालतात, कधीही PR वर नाही. सर्व सल्लामसलत आहेत.

| वर्कफ्लो               | पडताळणी                                                                                                                                                   | ब्लॉकिंग      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | रँडम सीड + उच्च रन काउंटसह fast-check प्रॉपर्टी टेस्ट्स                                                                                                   | **सल्लामसलत** |
| `nightly-resilience`   | हीप-वाढ गेट, चैओस फॉल्ट-इंजेक्शन, k6 लोड/सोक                                                                                                              | **सल्लामसलत** |
| `nightly-llm-security` | promptfoo इंजेक्शन गार्ड (ब्लॉक मोड) + garak प्रोब्स (प्रोव्हायडर सिक्रेटशिवाय वगळलेले)                                                                   | **सल्लामसलत** |
| `nightly-schemathesis` | `docs/openapi.yaml` वापरून लाइव्ह OmniRoute विरुद्ध OpenAPI कॉन्ट्रॅक्ट फझिंग (schemathesis) — स्पेसिफिकेशन उल्लंघने / अनहँडल्ड 500 उघड करते (Fase 8 B.4) | **सल्लामसलत** |
| `nightly-mutation`     | फास्ट युनिट लेनवरील Stryker म्युटेशन-टेस्टिंग स्कोअर — टिकून राहिलेले म्युटंट्स कमकुवत असर्ट्स उघड करतात                                                  | **सल्लामसलत** |
| `nightly-compat`       | समर्थित `engines.node` रेंजेसमध्ये Node इंजिन सुसंगतता मॅट्रिक्स                                                                                          | **सल्लामसलत** |

परफॉर्मन्स बेसलाइन्स (हीप, TTFB, बिल्ड वेळ) नोंदवल्या जातात, गेट केल्या जात नाहीत: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) पहा (`npm run perf:lts-baseline`).

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

## अनुमतसूची धोरण

पूर्वीपासून अस्तित्वात असलेल्या उल्लंघनांवर अपयशी होऊ न शकणारा प्रत्येक गेट गोठवलेली अनुमतसूची वापरतो
(उदा., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). धोरण असे आहे:

**मूळ कारण दुरुस्त करा; उल्लंघन पूर्वीपासून अस्तित्वात असेल आणि त्याच PR मध्ये
दुरुस्त करता येत नसेल, तेव्हाच अनुमतसूची वापरा.**

अनुमतसूचीत नोंद जोडताना:

1. कारणमीमांसेसह टिप्पणी समाविष्ट करा.
2. ट्रॅकिंग इश्यूचा संदर्भ द्या (उदा., `// #3498 — टप्पा 2 वैशिष्ट्य, अद्याप अंमलात आणलेले नाही`).
3. उल्लंघन दुरुस्त करणाऱ्या त्याच PR मध्ये नोंद काढून टाका — जे कोणतेही सक्रिय उल्लंघन यापुढे
   दडपत नाही अशी कालबाह्य नोंद ही स्वतःच एक त्रुटी आहे (अंमलबजावणी झाल्यानंतर 6A.3 कालबाह्य-अंमलबजावणी
   अनाथ अनुमतसूची नोंदीवर गेट अपयशी करेल).

चाचण्या अधिक लवकर उत्तीर्ण करण्यासाठी अनुमतसूची नोंदी जोडू **नका**. वाढत्या
अनुमतसूचीसह हिरवा गेट गुणवत्तेबद्दलचा खोटा दिलासा आहे.

### तुमच्या PR वर गेट अपयशी झाल्यास

1. **गेटचे आउटपुट काळजीपूर्वक वाचा** — कोणत्या फाइलने किंवा चिन्हाने नियमाचे उल्लंघन केले आहे, हे ते नेमकेपणाने सांगते.
2. **उल्लंघन दुरुस्त करा** — बहुतांश गेट या निर्धारक फाइलसिस्टम तपासण्या आहेत ज्या कोड योग्य होताच उत्तीर्ण होतात.
3. **उल्लंघन पूर्वीपासून अस्तित्वात असल्यास** (म्हणजे, तुम्ही ते आणलेले नाही, पण आता गेटने ते
   कव्हर केले आहे): कारणमीमांसा टिप्पणी आणि ट्रॅकिंग इश्यूसह अनुमतसूची नोंद जोडा.
4. **गेट रॅचेट असल्यास** (कव्हरेज, ESLint चेतावण्या, पुनरावृत्ती, गुंतागुंत):
   तुमच्या बदलामुळे मेट्रिक खालावले आहे. मूळ समस्या दुरुस्त करा, किंवा बदल हेतुपुरस्सर असेल आणि मेट्रिकमधील
   घसरण स्वीकारार्ह असेल तर (क्वचितच) `npm run quality:ratchet -- --update` चालवा —
   पण PR वर्णनात त्याचे कारण नमूद करा.
5. **सल्लागार गेट** (`continue-on-error: true`) माहितीपर असतात — ते मर्ज रोखत नाहीत,
   पण CI सारांशात दिसतात. तरीही ते दुरुस्त करा.

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

## सुसूत्रीकरण अनुशेष (ROI पुनरावलोकन — टप्पा 9 लाट 3)

ही सूची 2026-06-17 रोजी `ci.yml` च्या तुलनेत समेट करण्यात आली होती (आधीच्या आवृत्तीमध्ये
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` वगळले गेले होते). समेट केलेल्या संचाच्या ROI पुनरावलोकनाने
खालील सुसूत्रीकरण उमेदवार ओळखले. **विलीनीकरणे ही यांत्रिक CI
बदल आहेत; फ्लिप/वगळण्याचे निर्णय हे ऑपरेटरसाठी राखीव धोरणात्मक निर्णय आहेत.** खालीलपैकी काहीही
अद्याप लागू केलेले नाही.

**वर दस्तऐवजीकरण न केलेले आणखी घटक** (सल्लात्मक, कमी संकेत): `docs-lint` जॉब
(markdownlint + Vale, संपूर्ण जॉब `continue-on-error`) आणि स्वतंत्र स्कॅनर वर्कफ्लो
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` हे
`quality-baseline.json` मध्ये आहे, परंतु `ci.yml` मधील ब्लॉकिंग रॅचेटशी जोडलेले नाही — हे मेट्रिक
सध्या अनाथ आहे.

### विलीनीकरण / डिड्युप्लिकेशन (यांत्रिक, कमी जोखीम)

प्रत्येक उमेदवाराची 2026-06-17 रोजी प्रत्यक्ष गेट स्थितीच्या तुलनेत पडताळणी करण्यात आली (विश्वास ठेवा, पण पडताळा);
अनेक "सुस्पष्ट" विलीनीकरणांमध्ये तांत्रिक ऋण दडलेले असल्याचे आढळले आणि ती **स्वच्छ थेट पर्याय** नाहीत.

- **`check:docs-sync` दोनदा चालते** — `lint` जॉबमध्ये स्वतंत्रपणे आणि पुन्हा `check:docs-all` (`docs-sync-strict`) तसेच husky pre-commit हुकमध्ये. ✅ **पूर्ण** — स्वतंत्र `lint` आवाहन काढून टाकले.
- **CVE स्कॅनिंग** — ❌ **स्वच्छ विलीनीकरण नाही.** कोणत्याही उच्च/गंभीर CVE वर `audit:deps` हार्ड-फेल होते; `check:vuln-ratchet` (osv) फक्त आधाररेषेच्या तुलनेत _प्रतिगमन_ झाल्यास अपयशी होते (सध्या 1 MODERATE). अर्थभेद आहेत — `audit:deps` वगळल्यास निरपेक्ष उच्च/गंभीर गेट नष्ट होईल. दोन्ही ठेवा.
- **चक्र शोध** — ✅ **पूर्ण** (#15159 G-01/G-02). येथील जुन्या मजकुराने `check:cycles` ला "हिरवा, निवडक" गेट म्हटले होते आणि `check:circular-deps` (dpdm) ने 91 चक्रे नोंदवल्यामुळे ते ब्लॉकिंग ठेवण्याचे समर्थन केले होते. तो हिरवा निकाल **खोटा हिरवा** होता: `check:cycles` ने 5 उपनिर्देशिका (450 फाइल्स) स्कॅन केल्या, फक्त स्थिर `import|export … from` जुळवले आणि प्रत्येक `@/` व `@omniroute/open-sse/` स्पेसिफायर वगळला, त्यामुळे रेपोमध्ये प्रबळ असलेली डायनॅमिक-import + alias चक्रे त्याला दिसू शकली नाहीत. दुरुस्त केले: गेट आता `src` + `open-sse` (5023 फाइल्स) मधून जाते, TypeScript AST मधून स्पेसिफायर संकलित करते (म्हणून `import("…")` मोजले जाते आणि type-position `typeof import("…")` मोजले जात नाही), तसेच tsconfig `paths` रिजॉल्व्ह करते. त्याला 0 नव्हे, तर **14** चक्रे आढळतात. आधीपासून अस्तित्वात असलेली 14 चक्रे गेट PR मध्ये दुरुस्त करता येत नसल्यामुळे, `check:cycles` आता **रॅचेट** आहे (`--ratchet`, `quality-baseline.json` मध्ये कमाल मर्यादा `metrics.cycles.value = 14`, `direction: down`) — ते कोणतेही _प्रतिगमन_ ब्लॉक करते आणि संख्या फक्त कमी होऊ शकते. CI मध्ये `npm run check:cycles:ratchet` चालते. कमी करण्याचे काम **A-01** सोबत केले जाईल. व्यापक दुसरे मत म्हणून `check:circular-deps` (dpdm) सल्लात्मक राहते.
- **गुंतागुंत** — ✅ **पूर्ण** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint वॉक, ruleId नुसार मोजणी, जेणेकरून cyclomatic+max-lines आणि cognitive आधाररेषा स्वतंत्र राहतील; स्थानिक `--update` साठी स्वतंत्र `check:complexity` / `check:cognitive-complexity` कायम राहतात.
- **`/api` भ्रम-विरोधी तपासणी** — ✅ **पूर्ण** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` ची एक FS सूची, openapi-routes + docs-symbols अजूनही स्वतंत्रपणे अहवाल देतात; स्थानिक रनसाठी स्वतंत्र तपासण्या कायम राहतात.
- **`check:node-runtime` 11 जॉबमध्ये चालते** — ⚠️ **कमी ROI.** प्रत्येक स्वतंत्र रनर आहे आणि तपासणी <1s आहे; स्वस्त प्रति-जॉब संरक्षक गमावण्याच्या बदल्यात एकूण बचत ~10s. या उलथापालथीची किंमत योग्य नाही.
- **CI lint वरील `typecheck:noimplicit:core`** — ✅ **lint जॉबमधून काढले** (पूर्वी सल्लात्मक `continue-on-error` होते); ब्लॉकिंग प्रकार-पृष्ठभाग म्हणजे `typecheck:core` + `check:type-coverage`. स्थानिक स्क्रिप्ट कायम ठेवली.

### फ्लिप / निर्णय (ऑपरेटर धोरण)

- `check:openapi-security-tiers` (सल्लात्मक) — ❌ **स्वच्छपणे फ्लिप करता येत नाही.** ते 0 सह बाहेर पडते, परंतु `LOCAL_ONLY_API_PREFIXES` अंतर्गत अनेक `traffic-inspector` रूट्समध्ये `x-loopback-only: true` भाष्य नसल्याची चेतावणी देते. त्याची अंमलबजावणी करण्यासाठी आधी `openapi.yaml` मध्ये ही भाष्ये जोडावी लागतील.
- `typecheck:noimplicit:core` (सल्लात्मक) — ब्लॉकिंग `check:type-coverage` रॅचेटमध्ये मोठ्या प्रमाणावर समाविष्ट आहे. रॅचेटमध्ये फ्लिप करा किंवा अनावश्यक दुसरा `tsc` पास वगळा.
- `test:vitest:ui` (आता **ब्लॉकिंग**) — आधीपासून अस्तित्वात असलेली अपयशे `vitest.config.ts` मध्ये `// #8618` ट्रॅकिंग टिप्पण्यांसह स्पष्टपणे वगळली आहेत; नवीन अपयशांमुळे जॉब अपयशी होतो.
- `check:secrets` (gitleaks, 3 दस्तऐवजीकृत चुकीच्या-सकारात्मक निकालांवर गोठवलेले ब्लॉकिंग रॅचेट) — 0 पर्यंत पोहोचण्यासाठी त्या 3 निकालांना allowlist मध्ये जोडा किंवा सल्लात्मक स्तरावर अवनत करा. GitHub चे मूळ secret-scanning + `check:public-creds` यांच्याशी आच्छादित होते.
- `check:pr-evidence` (ब्लॉकिंग, PR-body मधील गद्य मजकुरावर grep करते) — चुकीच्या-सकारात्मक निकालांचा उच्च धोका; वगळल्यास कठोर नियम #18 ची अंमलबजावणी कमकुवत होते, त्यामुळे हा खरोखरच धोरणात्मक निर्णय आहे.
- `semgrep` (स्वतंत्र सल्लात्मक) — OWASP कुटुंबांसाठी CodeQL शी आच्छादित होते; त्याची आधाररेषा रॅचेटशी जोडा किंवा वगळा.

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
