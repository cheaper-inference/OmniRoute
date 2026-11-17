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

## गेटची सूची आणि अंमलबजावणी प्रोफाइल

### उमेदवार स्वीकृती

CI आणि Quality Gates वर्कफ्लो प्रत्येकी एक स्थिर निकाल देतात: `Gate / CI` आणि
`Gate / Quality`. त्यांच्या आवृत्तीबद्ध स्वीकृती धोरणात प्रत्येक अपस्ट्रीम जॉब आवश्यक
किंवा सल्लागार म्हणून नमूद केलेला आहे. लागू असलेला आवश्यक जॉब यशस्वी झाला पाहिजे:
गहाळ, रद्द केलेले, वगळलेले, प्रलंबित आणि अज्ञात निकाल PASS स्थापित करू शकत नाहीत. वैध
docs-only किंवा catalog-only वर्गीकरणामुळे कोड लेन लागू न होणारी ठरू शकते;
draft PR स्वीकारलेला उमेदवार नाही. `hotfix` लेबल पुराव्याची आवश्यकता माफ करत नाही.

दोन्ही वर्कफ्लो main/release शाखांमध्ये जाणाऱ्या PR, `main` वरील pushes, मॅन्युअल dispatch
आणि merge-group इव्हेंट्स कव्हर करतात. Push, dispatch आणि merge-group पूर्ण निवड चालवतात.
`release/**` वरील pushes त्यांना सुरू करत नाहीत (2026-10-18): प्रत्येक बदलाने त्याच्या PR वर
मॅट्रिक्स आधीच चालवलेली असते आणि विलीन केलेल्या संयोजनाची जबाबदारी Release-Green ची असते
(`docs/ops/RUNNER_BOX.md` → Hosted लेन). Forks आणि merge groups अशा जॉबसाठी hosted runners
वापरतात जे अन्यथा self-hosted runners निवडतात; रोलआउटपूर्वी पुरेशी hosted क्षमता
तपासली पाहिजे.

सामान्य PR जलद निवड चालवतो. स्वीकृती धोरणातील `full-code` आणि `full-code-e2e` लेन्स
(E2E, integration, package artifact, Electron smoke, Bun SQLite, ecosystem
आणि protocol clients) केवळ Mergify queue draft वर किंवा पूर्ण रनमध्ये चालतात:
`gh workflow run ci.yml --ref <branch>`.

प्रत्येक JSON पावती तपासलेल्या checkout SHA, वर्कफ्लो रन आणि प्रयत्नाची ओळख देते.
CLI checkout/event SHA मधील विसंगती नाकारते. नवीन किंवा काढलेली लेन शांतपणे नाहीशी होऊ
नये म्हणून वर्कफ्लो चाचण्या धोरणातील सदस्यत्व verdict जॉबच्या `needs` यादीशी बांधतात.
पावत्या त्यांच्या स्वतःच्या वर्कफ्लोचा समावेश करतात; प्रकाशन, डिप्लॉयमेंट किंवा विद्यमान
सल्लागार स्कॅनरच्या अंतर्गत बाबींचा नाही. शाखा नियमांमध्ये दोन्ही तपासणी नावे सक्रिय करणे
हा स्वतंत्र प्रशासकीय बदल आहे; हे जॉब जोडल्याने शाखेचे संरक्षण आपोआप होत नाही.

### मर्ज रांग

`queue` लेबल PR ला Mergify रांगेत (`.mergify.yml`) पाठवते. Mergify
`mergify/merge-queue/` शाखेवर draft PR उघडते, तिथे CI पूर्ण निवड चालवते आणि
`Gate / CI`, `Gate / Quality` आणि `Merge integrity (changelog + generated skills)` यशस्वी
झाल्यावर मूळ PR विलीन करते.

Mergify आपला रांग सारांश draft च्या वर्णनात लिहिते आणि इतर अॅप्सही ते संपादित करू शकतात.
अशा draft वरील `pull_request` `edited` इव्हेंट स्वतःचा concurrency group
(`-queue-edit-<run_id>`) घेतो, त्यामुळे तो draft च्या वास्तविक रनला रद्द करू शकत नाही,
आणि तो gate व मॅट्रिक्स वगळतो. केवळ `Merge integrity` अजूनही चालतो. वगळलेल्या gate
जॉबचे तपासणी नाव वेगळे असते, कारण Mergify वगळलेले `Gate / CI` अयशस्वी तपासणी म्हणून
वाचते आणि PR रांगेतून काढते.

रांगेतून काढल्यानंतर push PR ला नेहमी पुन्हा रांगेत टाकत नाही. त्यावर
`@mergifyio queue` टिप्पणी करा.

### स्वीकृती reducer मधील जतन केलेले पुरावे

`scripts/quality/validate-release-acceptance.mjs` दिलेला प्लॅन आणि त्याचे
manifests कमी करून निकाल तयार करते; प्लॅनमध्ये संपूर्ण release pipeline समाविष्ट आहे
हे ते स्थापित करत नाही. त्या प्लॅनचा दर्जा `VERIFIED` असला तरी त्याचे अहवाल स्पष्टपणे
`releaseAcceptance: false` सेट करतात. `release-acceptance.yml` वर्कफ्लो अजूनही
प्रत्यक्ष build, package, boot किंवा promotion पावत्यांऐवजी shadow fixtures वापरतो.

जतन केलेले पुरावे पडताळण्यासाठी CLI ला `--evidence-root` आवश्यक आहे. फाइल्स
`<evidence-root>/<artifact_id>/<member>` म्हणून resolve केल्या जातात आणि SHA-256
ने hash केल्या जातात. पुराव्याशिवाय असलेली PASS नोंद, गहाळ किंवा बदललेली फाइल,
असुरक्षित path किंवा symlink पडताळणी रोखते. गहाळ फाइल्स रिकाम्या यशस्वी logs च्या
समतुल्य नाहीत. विद्यमान SHA/run/attempt तपासण्या स्वतंत्र राहतात: जुळणारे bytes
जुनी पावती वाचवू शकत नाहीत. फाइलची अखंडता ही execution authenticity किंवा artifact
promotion चा पुरावा नाही.

### स्थिर स्कॅन सूची

आवृत्तीबद्ध npm-alias inventory आणि static-scan सदस्यत्व
`config/quality/gate-manifest.json` मध्ये आहे. `package.json` विरुद्ध
script names आणि exact commands पडताळण्यासाठी `npm run check:gate-manifest` चालवा;
भर, काढणे आणि command drift यांमुळे स्थानिक hook तसेच CI मधील
change-classification jobs दोन्ही अयशस्वी होतात. Alias हा workflow job, matrix instance
किंवा test case नाही: या मोजण्या परस्पर अदलाबदल करण्याजोग्या म्हणून मांडू नयेत.

निवडलेले aliases चालविल्याशिवाय तपासण्यासाठी `npm run quality:scan -- --list` किंवा
`npm run quality:scan:fast -- --list` वापरा. Runner npm entrypoint invoke करतो, त्यामुळे
त्याचा runtime (कॉन्फिगर केलेले असल्यास Bun सहित) जतन केला जातो. त्या profiles बाहेरील
aliases स्वतंत्रपणे invoke केले जातात असे manifest नोंदवतो आणि read-only scan profiles
मध्ये maintenance commands प्रतिबंधित आहेत.

ही profiles केवळ static scan कव्हर करतात. त्या product tests, coverage, packaging,
external checks किंवा उमेदवाराची संपूर्ण release acceptance प्रमाणित करत नाहीत.
Workflow admission जोडलेल्या `config/quality/admission-policy.json` आणि
`scripts/quality/admission-verdict.mjs` वापरते. Release-observer profiles स्वतंत्र
राहतात; त्यांची लागू तपासणी आणि पावत्या स्वतंत्रपणे तपासा. पूर्ण observer चे static
commands `config/quality/release-green-static-profile.json` मध्ये घोषित केलेले आहेत;
त्यात `audit:deps`, mutation-test selection आणि translation checks समाविष्ट आहेत. Loader
package.json विरुद्ध npm commands आणि मॉडेल केलेल्या CI/Quality declarations पडताळतो;
shell tokens arguments म्हणून execute करण्याऐवजी drift नाकारतो. आवश्यक scanner चे
SKIP/INCOMPLETE output PASS स्थापित करू शकत नाही. Profile आपले external exclusions
नोंदवते आणि hosted coverage, test matrices, package किंवा deployment evidence ची जागा
घेत नाही. खालील prose inventory हा संदर्भ आहे, gate प्रत्यक्ष चालला याचा पुरावा नाही.

Scripts `scripts/check/` (policy gates) आणि `scripts/quality/` (ratchet engine) अंतर्गत
आहेत. CI साठीचा source of truth `.github/workflows/ci.yml` आहे.

### Release PR जलद-मार्ग (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main` वरील pushes,
dispatch आणि merge groups वर CI ला पूरक ठरते. PR साठी path-filtered fast checks वापरल्या
जातात. कायमस्वरूपी अक्षम केलेला duplicate build काढून टाकण्यात आला आहे; प्रत्यक्ष
build/package/boot checks CI मध्येच राहतात. Unit suite आणि vitest केवळ CI मध्ये
(`Unit Tests (N/8)` आणि `Vitest`) चालतात.

| जॉब                                              | व्याप्ती                                                                                                            | अवरोधक           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | दस्तऐवज/कोड PR; API दस्तऐवज संदर्भ आणि docs-all                                                                     | होय              |
| `Fast Quality Gates`                             | कोड PR; स्थिर तपासण्या, typecheck, dashboard typecheck, प्रभावित युनिट चाचण्या, विसरलेल्या सहोदर चाचण्या (सल्लागार) |
| `No new ESLint warnings`                         | कोड PR; suppressions-aware lint guard                                                                               | होय, फोर्क्ससहित |
| `Merge integrity (changelog + generated skills)` | मसुदा नसलेले PR; बदलनोंद आणि व्युत्पन्न कौशल्यांचे समक्रमण                                                          | होय, फोर्क्ससहित |

#### विसरलेल्या सहोदर चाचण्यांचा अहवाल

`npm run check:forgotten-sibling-tests` हे `Fast Quality Gates` मधील सल्लागार पायरी म्हणून चालते आणि
test-impact map मागील import resolver पुन्हा वापरते.
बदललेल्या प्रत्येक production module साठी, pull-request diff मध्ये उमेदवार
चाचणी नसल्यास, ते निर्धारक्षम
`changed module/symbol -> static consumer -> candidate sibling test` साखळ्यांचा अहवाल देते. Markdown सारांश आणि JSON निकाल
कॅलिब्रेशनसाठी कोणतेही blocking rollout करण्यापूर्वी
`forgotten-sibling-tests` workflow artifact म्हणून जतन केले जातात.

Barrel re-exports आणि dynamic imports हे केवळ resolution diagnostics आहेत; ते कधीही
blocking finding तयार करत नाहीत. पुनरावलोकन केलेले अपवाद
`config/quality/forgotten-sibling-allowlist.json` मध्ये असतात. प्रत्येक नोंदीत consumer आणि उमेदवार
चाचणीचे नाव, विशिष्ट कारणमीमांसा आणि GitHub issue किंवा pull request ची लिंक असणे आवश्यक आहे. सदोष नोंदी आढळल्यास प्रक्रिया अपयशी ठरते. अपवाद हटवलेली उमेदवार चाचणी किंवा `.skip`/`.todo` जोडणारा diff दडपू शकत नाहीत;
assertion weakening आणि इतर masking स्वतंत्रपणे blocking असलेल्या
`check:test-masking` gate च्या अखत्यारीत राहतात.

### जॉब: `lint`

`main` वरील प्रत्येक PR वर चालते. अयशस्वी झाल्यास merge अवरोधित करते.

| स्क्रिप्ट (`npm run ...`)         | प्रमाणीकरण                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | अवरोधक                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `check:node-runtime`              | Node.js आवृत्ती समर्थित श्रेणीमध्ये आहे                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | होय                                      |
| `check:cycles`                    | `src/` + `open-sse/` मधील सर्व सर्क्युलर इम्पोर्ट्स (AST-आधारित, tsconfig `paths` चे निराकरण केलेले). कोणताही सायकल अस्तित्वात असल्यास Bare नेहमी 1 ने बाहेर पडते ( #15281 पासून fail-closed) आणि SCCs ची यादी देते. `check:cycles:ratchet` (CI मध्ये चालवले जाते) `quality-baseline.json` मधील `metrics.cycles` कमाल मर्यादा ओलांडल्यास अवरोधित करते — सध्या 14, `direction: down`, त्यामुळे ती फक्त कमी होऊ शकते (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय (रॅचेट)                              |
| `check:boundary`                  | `open-sse → src` कपलिंग: इंजिनमधून ॲपमध्ये होणारे अद्वितीय फाइल-टू-फाइल इम्पोर्ट्स (`scripts/quality/measure-boundary.mjs`; एज सूची ही v4 core/module-split remediation backlog आहे). Bare = सल्लागार अहवाल (`quality:boundary` प्रमाणेच). `check:boundary:ratchet` (CI मध्ये चालवले जाते आणि `quality.yml` fast-gates रॅचेट लूपमध्येही आहे) `quality-baseline.json` मधील `metrics.boundaryOpenSseToSrc` कमाल मर्यादा ओलांडल्यास अवरोधित करते — मोजलेल्या 771 वर प्रारंभ केलेले, `direction: down`; `--update` ही मर्यादा फक्त कमी करते; PR वर base-relative (`--base-ref`, खाली पहा)                                                                                                                                                                                                                                                                                                                                                                                                | होय (रॅचेट)                              |
| `check:route-validation:t06`      | सर्व रूट्सवर Zod स्कीमा उपलब्ध आहेत (Tier 6 धोरण)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | होय                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` ची संख्या बजेटपेक्षा जास्त नाही (Tier 11 कॅटराका)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | होय                                      |
| `check:provider-consistency`      | `providers.ts` मधील प्रत्येक प्रदात्यासाठी `providerRegistry.ts` मध्ये जुळणारी नोंद आहे (आणि उलटही, allowlist च्या मर्यादेत)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                      |
| `check:model-lifecycle`           | हाताने देखरेख केलेले तीन रूटिंग तक्ते कमिट केलेल्या लाइफसायकल स्नॅपशॉटशी (#11503) सुसंगत राहतात: `FITNESS_TABLE` (`taskFitness.ts`) मध्ये `REGISTRY` रूट करू शकणाऱ्या कोणत्याही निवृत्त id साठी स्कोअर नाही; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` मध्ये उपस्थित आहे आणि निवृत्त-id स्नॅपशॉटमध्ये अनुपस्थित आहे; `REGISTRY` मध्ये अद्याप असलेले प्रत्येक निवृत्त id फॉरवर्ड केलेले आहे किंवा `allowedRetiredInCatalog` मध्ये सूचीबद्ध आहे; आणि त्या स्नॅपशॉटमध्ये कोणताही `DEFAULT_DEGRADATION_MAP` स्रोत किंवा लक्ष्य निवृत्त म्हणून दिसत नाही. यावरून एखादे मॉडेल सध्या सक्रिय अपस्ट्रीमद्वारे सेवा दिले जात आहे हे सिद्ध होत नाही. ऑफलाइन — `config/quality/model-lifecycle.json` शी तुलना करते; हे `npm run quality:refresh-model-lifecycle` द्वारे हाताने रीफ्रेश केले जाते (नेटवर्क; CI मध्ये जोडलेले नाही). `allowedRetiredInCatalog` हा बर्न-डाउन रॅचेट आहे: ट्रॅकिंग इश्यू असल्यासच नोंद जोडा.                                                                      | होय                                      |
| `check:fetch-targets`             | क्लायंट-साइड `src/` मधील प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` कडे निराकरण होतो                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | होय                                      |
| `check:deps`                      | रिपॉझिटरीतील प्रत्येक `package.json` मधील `npm install`-द्वारे स्थापित करता येणारी सर्व अवलंबने `dependency-allowlist.json` मध्ये आहेत; नवीन अनपिन केलेली किंवा slopsquatted पॅकेजेस ध्वजांकित केली जातात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | होय                                      |
| `audit:deps`                      | सर्व पाच स्वतंत्र लॉकफाइल्सचे npm ऑडिट (रूट, Electron, OpenCode plugins v1/v2 आणि provider). गंभीर सूचना बिल्ड रोखतात; उच्च-गंभीरतेच्या सूचना दृश्यमान इशारे म्हणून राहतात. गहाळ किंवा अयशस्वी ऑडिट INCOMPLETE मानली जातात आणि बिल्ड रोखतात; प्रत्येक स्कोपचे लॉक हॅश आणि अहवाल जतन केले जातात.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | होय                                      |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, integrity hashes, no host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | होय                                      |
| `check:licenses`                  | SPDX license allowlist for production dependencies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | होय                                      |
| `check:tracked-artifacts`         | No build artifacts / committed `node_modules` symlinks (also runs in husky pre-commit; pre-push is intentionally light — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | होय                                      |
| `check:ai-attribution`            | PR commits, title or body मध्ये AI/bot `Co-Authored-By` trailer किंवा AI-generation footer नाही — कठोर नियम #16 (PR→`release/**` साठी `quality.yml` fast-gates loop मध्ये — event payload वाचते, PR बाहेरील ठिकाणी no-op — आणि PR→`main` साठी `ci.yml` lint मधील केवळ PR-only step; तसेच husky `commit-msg` hook; मानवी सह-लेखकांना परवानगी; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | प्रत्येक Vitest exclusion मध्ये tracking issue नमूद केलेला असतो आणि तो `config/quality/vitest-exclusions.json` मध्ये दिसतो (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | होय                                      |
| `check:file-size`                 | Source files (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` च्या मर्यादेत राहतात आणि test files (`*.test.ts(x)`) `testCap` च्या मर्यादेत राहतात; `file-size-baseline.json` मध्ये गोठवलेल्या (`frozen` / `testFrozen`) files नी त्यांच्या नोंदवलेल्या आकारापेक्षा वाढू नये                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | होय                                      |
| `check:error-helper`              | executors/handlers मधील त्रुटी प्रतिसाद `buildErrorBody()` / `sanitizeErrorMessage()` वापरतात (कठोर नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | होय                                      |
| `check:migration-numbering`       | Migration SQL फायली अनुक्रमिक क्रमांकाने क्रमांकित आहेत; कोणतेही क्रमांक गहाळ किंवा दुबार नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | होय                                      |
| `check:public-creds`              | `publicCreds.ts` बाहेर कोणतेही अक्षरशः OAuth `client_id`/`client_secret` किंवा Firebase Web कळा नाहीत (कठोर नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | होय                                      |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल्सच्या बाहेर कोणतेही raw SQL नाही; `localDb.ts` मधून कोणतेही barrel-imports नाहीत (कठोर नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | होय                                      |
| `check:known-symbols`             | त्यांच्या dispatch tables मध्ये नोंदवलेले provider executors, routing strategies आणि translators डिस्कवरील फायलींशी जुळतात — कोणतेही अनाथ किंवा घोषित न केलेले symbols नाहीत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | होय                                      |
| `check:route-guard-membership`    | child process सुरू करणाऱ्या प्रत्येक route चे `isLocalOnlyPath()` द्वारे वर्गीकरण केलेले आहे (कठोर नियम #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | होय                                      |
| `check:test-discovery`            | रेपोमधील प्रत्येक `*.test.ts` / `*.spec.ts` फाइल किमान एका टेस्ट रनरद्वारे संकलित केली जाते (रॅचेट: `test-discovery-baseline.json` मधील अनाथ यादी केवळ कमी होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | होय                                      |
| `check:test-tla-order`            | `tests/unit` अंतर्गत कोणतीही `node:test` फाइल टेस्ट नोंदवून, टॉप-लेव्हल `await` वर पोहोचून, त्यानंतर आणखी टेस्ट नोंदवत नाही (#18045; रॅचेट: `test-tla-order-allowlist.json` केवळ कमी होऊ शकते)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                      |
| `check:agent-skills-sync`         | जनरेट केलेले agent-skills आर्टिफॅक्ट्स त्यांच्या स्रोत कॅटलॉगशी जुळतात (कोणताही फरक नाही). रिलीज मोड प्रत्येक स्किल तपासतो; फीचर PR (`pr` मोड) केवळ ज्या स्किल्सच्या जनरेट केलेल्या मजकुरात तो बदल करतो त्याच तपासतो — [जनरेट केलेल्या फाइल्स आणि व्युत्पन्न बेसलाइन](#generated-files-and-derived-baselines-written-at-release) पहा                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | प्रोव्हायडर लोगो/अॅसेट्समध्ये नोंदवलेली प्रोव्हेनेन्स नोंद असते                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON कॉन्फिगरेशन फाइल्स पार्स होतात आणि रेपोच्या लिंट नियमांचे पालन करतात                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | त्रुटींशिवाय TypeScript संकलन (केवळ सल्लागार स्वरूपातील इशारे)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | होय                                      |
| `typecheck:noimplicit:core`       | कडक `noImplicitAny` — पुढील दिशेचा; अनेक पूर्व-अस्तित्वातील call sites साठी अजूनही annotations आवश्यक आहेत                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` हे `src/app/(dashboard)/**` पर्यंत मर्यादित आहे (#7033) — `typecheck:core` ची निवडक 27-फाइल allowlist कोणतीही dashboard TSX फाइल समाविष्ट करत नाही आणि `next build` देखील त्यांचा type-check करत नाही (`next.config.mjs` मध्ये `ignoreBuildErrors: true` सेट केलेले आहे), त्यामुळे तेथील orphaned-identifier regressions (#6625/#6909) CI ला दिसत नव्हते. गोठवलेल्या प्रति-फाइल/प्रति-TS-code count baseline विरुद्ध फरक तपासतो (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` प्रमाणेच stale-enforcement pattern) — baselined count पेक्षा जास्त असलेल्या केवळ NEW errors मुळे gate अयशस्वी होतो; पूर्व-अस्तित्वातील error दुरुस्त झाल्यावर `--update` वापरून ratchet down करा.                                                                                                                                                                                                                                                                   | होय                                      |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) वर संपूर्ण-app production type check; `typecheck:core` ची surface 27-फाइल allowlist आणि dashboard gate ज्या भागांना cover करत नाहीत. `config/quality/build-typecheck-baseline.json` विरुद्ध फरक तपासतो; नवीन किंवा वाढलेली प्रति-(file, code) count gate अयशस्वी करते, तर कमी count असल्यास ratchet करण्यास सांगते. Run मध्ये नवीन किंवा वाढलेली pair असल्यास `--force-regressions` न देता `--update` नाकारले जाते, आणि नवीनपणे silenced केलेली file असल्यास `--force-nocheck` न देता ते नाकारले जाते; त्यामुळे green मिळवण्यासाठी baseline विस्तृत करणे आणि कायमस्वरूपी silence मंजूर करणे ही दोन स्वतंत्र जाणीवपूर्वक केलेली कृत्ये आहेत. साधा `--force` नाकारला जातो. तसेच build scope मध्ये `@ts-nocheck` साठी `config/quality/ts-nocheck-baseline.json` विरुद्ध तपासणी केली जाते, कारण ते वापरणारी file कोणतेही diagnostics नोंदवत नाही आणि अन्यथा प्रत्येक gate ला अदृश्य राहील. | होय                                      |

#### दोन typecheck programs वेगवेगळी उत्तरे देतात

`typecheck:core` आणि `check:build-typecheck` वेगवेगळे programs वेगवेगळ्या
options अंतर्गत compile करतात आणि तीच file एका program मध्ये स्वच्छ, तर दुसऱ्यामध्ये
errors ने भरलेली असू शकते.

`tsconfig.build.json` मध्ये `"strict": false` सेट केलेले आहे, त्यामुळे `noImplicitAny`
बंद आहे. Core config अधिक कडक options सह निवडक 27-फाइल allowlist compile करते आणि प्रत्येक
entry च्या import graph चे अनुसरण करते, त्यामुळे build program मध्ये कधीही न दिसणाऱ्या
files देखील तेथे तपासल्या जातात.

File typed आहे की नाही हे ठरवताना हा परिणाम महत्त्वाचा आहे: **`check:build-typecheck`
अंतर्गत शून्य diagnostics म्हणजे शून्य errors असे नाही**. 26 files मधून
`@ts-nocheck` काढल्यावर build program मध्ये त्यांपैकी 23 स्वच्छ असल्याचे दिसले; त्यांपैकी
सोळा files ने strict program मध्ये सुमारे 120 implicit-any errors उघड केले. एखादी file
स्वच्छ म्हणण्यापूर्वी दोन्ही तपासा.

### Job: `quality-gate`

`test-coverage` नंतर चालतो. Failure झाल्यास merge रोखतो.

| Script                       | Validates                                                                                                                                                                      | Blocking                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `quality:collect`            | `quality-metrics.json` तयार करते (ESLint चेतावणींची संख्या, विलीन केलेल्या shard अहवालातील कव्हरेज)                                                                            | होय (ratchet च्या upstream) |
| `quality:ratchet`            | `quality-baseline.json` मधील प्रत्येक मेट्रिकमध्ये regression झालेला नाही (ESLint चेतावण्या ≤ baseline; कव्हरेज ≥ baseline)                                                    | होय                         |
| `check:duplication`          | कोड duplication (jscpd@4) `quality-baseline.json` मधील baseline पेक्षा अधिक नाही                                                                                               | होय                         |
| `check:complexity`           | फाइल-स्तरीय cyclomatic complexity cap पेक्षा अधिक नाही (core ESLint `complexity` + `max-lines-per-function`)                                                                   | होय                         |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — स्वतंत्र ESLint pass; CI दोन्ही एकत्र करून एकच `check:complexity-ratchets` step चालवते                                | होय                         |
| `check:dead-code`            | वापर न केलेले exports / files यांचा ratchet baseline च्या तुलनेत regression दाखवत नाही (knip)                                                                                  | होय                         |
| `check:compression-budget`   | Compression benchmark budget — प्रत्येक engine साठी token-savings floors मध्ये regression झालेला नाही                                                                          | होय                         |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) मध्ये regression झालेला नाही; `typecheck:noimplicit:core` ची मोठ्या प्रमाणात जागा घेतो                                                 | होय                         |
| `check:codeql-ratchet`       | उघड्या CodeQL alerts ची संख्या regression दाखवत नाही (`gh api` द्वारे वाचते; token नसल्यास graceful-skip) — refresh cadence आणि manual trigger साठी खालील "CodeQL ratchet" पहा | होय                         |

### Job: `quality-extended`

संपूर्ण job advisory आहे (`continue-on-error: true`). npm-आधारित ratchets प्रत्यक्षात चालतात; बाह्य scanners `gh release download` द्वारे install होतात आणि binary अद्याप उपलब्ध नसल्यास स्वतः skip करतात (exit 0).

| Script                   | Validates                                                                                                                                                                                                                        | Blocking                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Circular dependencies नाहीत (dpdm)                                                                                                                                                                                               | **Advisory**                                       |
| `check:bundle-size`      | Bundle size cap पेक्षा अधिक नाही                                                                                                                                                                                                 | **Advisory**                                       |
| `check:secrets`          | Secret scanning (gitleaks) — binary उपलब्ध नसल्यास skip करते                                                                                                                                                                     | **Advisory**                                       |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) मध्ये regression झालेला नाही — मोजमाप झाले नसल्यास `--ratchet` INCOMPLETE म्हणून अपयशी ठरते (exit 2)                                                                                    | **Advisory**                                       |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanners गहाळ/बिघडलेले असल्यास, reports अवैध असल्यास किंवा ratchet baseline गहाळ असल्यास INCOMPLETE म्हणून अपयशी ठरते. वैध findings निवडलेल्या strict/advisory/ratchet policy चे पालन करतात | Execution आवश्यक; CI मध्ये zizmor ratchet blocking |
| `check:openapi-breaking` | pinned event commits विरुद्ध Public API contract (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); measurement आवश्यक असल्यास closed fail होते                                             | **Blocking with --ratchet**                        |

### Job: `docs-sync-strict`

`main` वरील प्रत्येक PR वर चालते. अपयश आल्यास merge रोखते.

| Script                         | Validates                                                                                                                                                         | Blocking                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | खालील 6 उप-गेट अनुक्रमाने चालवणारा मेटा-गेट                                                                                                                       | होय                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI आवृत्ती सुसंगतता; रिलीज मोडमध्ये 66 `llm.txt` मिरर आणि भाषांतरित CHANGELOG विभाग देखील (PR मोड: मिररमध्ये सुसंगतता)                           | होय                            |
| ↳ `check:docs-counts`          | गद्यामधील संख्या (provider count, migration count इ.). दोन मोड: feature PR वर `pr`, इतरत्र `release` — खालील "Derived values" पहा                                 | होय                            |
| ↳ `check:env-doc-sync`         | `.env.example` मधील प्रत्येक env var दस्तऐवजातील तक्त्यात नमूद केलेला आहे आणि त्याउलट                                                                             | होय                            |
| ↳ `check:deprecated-versions`  | दस्तऐवजांमध्ये कोणत्याही अप्रचलित आवृत्ती स्ट्रिंग नाहीत                                                                                                          | होय                            |
| ↳ `check:doc-links`            | दस्तऐवजांमधील अंतर्गत markdown दुवे वास्तविक फाइल्सकडे निर्देश करतात (`[text]`/`(path)` स्वरूप)                                                                   | होय                            |
| ↳ `check:fabricated-docs`      | दस्तऐवजांमध्ये संदर्भित routes, env vars, CLI commands, hook names आणि file paths कोडबेसमध्ये अस्तित्वात आहेत. `--strict` द्वारे hard gate; फ्लॅगशिवाय soft-fail. | CI मध्ये `--strict` द्वारे होय |
| `check:cli-i18n`               | CLI `t()` keys `bin/cli/locales/en.json` मध्ये अस्तित्वात आहेत (दोन्ही मोड); release मोडमध्येच pt-BR / zh-CN / zh-TW ची `en.json` सोबत समानता                     | होय                            |
| `check:openapi-coverage`       | OpenAPI spec मध्ये वास्तविक routes पैकी ratcheted floor इतके तरी समाविष्ट आहेत                                                                                    | होय                            |
| `check:openapi-security-tiers` | `openapi.yaml` मधील security tier annotations `routeGuard.ts` वर्गीकरणांशी सुसंगत आहेत                                                                            | **सल्लागार**                   |
| `check:openapi-routes`         | `openapi.yaml` मधील प्रत्येक path वास्तविक `route.ts` कडे निर्देश करतो (anti-hallucination)                                                                       | होय                            |
| `check:docs-symbols`           | `docs/**/*.md` मधील प्रत्येक `/api/...` संदर्भ वास्तविक `route.ts` कडे निर्देश करतो (anti-hallucination)                                                          | होय                            |
| `i18n translation drift`       | `docs/i18n/**` मिरर विरुद्ध `.i18n-state.json` — PR वर सल्लागार (translation wave द्वारे मिरर refresh केले जातात), push आणि nightly वर strict                     | PR वर **सल्लागार**             |

#### भाषांतर मिरर ही derived files आहेत (PR मोड विरुद्ध release मोड)

Feature PR फक्त इंग्रजी स्रोतांमध्ये बदल करते. `docs/i18n/<locale>/**` मिरर (यामध्ये 66
`llm.txt` प्रती आणि भाषांतरित `CHANGELOG.md` फाइल्स समाविष्ट आहेत) तसेच `.i18n-state.json` हे
translation wave (`docs/i18n-*` / `chore/i18n-*` branches, scheduled
`i18n-mirror-refresh.yml`) द्वारे आणि release (`npm run release:sync-changelog-i18n`) द्वारे एका
चरणात पुन्हा लिहिले जातात. त्यामुळे मिरर गेट दोन मोडमध्ये चालतात; हे मोड
`scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, त्यानंतर
`OMNIROUTE_GATE_MODE`, आणि त्यानंतर Actions event; स्थानिक run म्हणजे `release`) द्वारे निश्चित केले जातात:

- `check:docs-sync` — रिलीज मोडमध्ये प्रत्येक तपासणी चालते. PR मोडमध्ये package.json/OpenAPI आवृत्ती,
  रूट CHANGELOG शीर्षके आणि superseded-docs guard ठेवले जातात, तसेच `llm.txt` मिरर प्रती आणि भाषांतरित
  CHANGELOG विभागांसाठी `SKIP reason=pr-mode` छापले जाते —
  जोपर्यंत PR मिरर लिहित नाही: `config/quality/derived-paths/*.json` मध्ये `docs/i18n/**` कुटुंबाचा
  writer म्हणून घोषित केलेली head branch दोन्ही तपासण्या काटेकोरपणे चालवते आणि, diff base
  resolve झाल्यावर, स्वतःच्या diff मध्ये `docs/i18n/<locale>/llm.txt` किंवा `CHANGELOG.md` संपादित करणारा
  बदल ती तपासणी काटेकोरपणे चालवतो. depth-1 checkout (`docs-sync-strict`
  job) मध्ये diff base resolve होत नाही, त्यामुळे PR मोडमध्ये base ची गरज नसलेली एक तपासणीही चालते:
  प्रत्येक `llm.txt` मिरर अस्तित्वात असणे, त्यातील `---` विभाजक कायम ठेवणे आणि रूट body किंवा बहुतेक
  मिररमध्ये समान असलेली body यांपैकी एक धारण करणे आवश्यक आहे. Base बदलल्यामुळे सर्व मिरर समान रीतीने
  जुनाट झाले असल्यास ते यशस्वी ठरते; एका मिररमध्ये हाताने केलेला बदल अयशस्वी ठरतो. depth-1 PR checkout मध्ये
  भाषांतरित `CHANGELOG.md` फाइल्ससाठी अशी कोणतीही तपासणी नाही.
- Pre-commit hook `check-docs-sync.mjs --mode=pr` चालवतो: commit चे मूल्यमापन तो नेमके काय करतो
  यावर केले जाते. Flag शिवाय स्थानिक run हा release मोडमध्ये असतो आणि root `llm.txt` संपादित करणारा
  एक merge केलेला PR त्या base वर पुढील प्रत्येक commit ला wave चालवेपर्यंत अडवेल. Husky hook चालवत असलेल्या
  कोणत्याही mode-aware gate साठीही हाच नियम लागू होतो: hook `--mode=pr` पास करतो आणि काटेकोर
  निकाल release-mode runs कडेच राहतो (release PR, `main` कडे होणारे pushes, साधा स्थानिक run).
- Mirror-content unit tests (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — release मोडमध्ये प्रत्येक locale चे assertions केले जातात. PR मोडमध्ये
  `.i18n-state.json` नुसार English source शी सुसंगत असलेल्या मिररचेच assertions केले जातात
  (संपूर्ण-file hash किंवा test pin करत असलेल्या विभागाचा नोंदवलेला section hash) आणि जुनाट मिरर
  कारणासह वगळले जातात. `target_hash` provenance तपासण्या दोन्ही मोडमध्ये प्रत्येक locale साठी
  चालतात. Freshness प्रत्येक `## ` विभागानुसार असते आणि unit `run-translation.mjs` hash करते;
  मोठा विभाग (या फाइलमधील gate inventory त्यापैकी सुमारे अर्धा आहे) म्हणजे त्यातील कोणताही बदल
  त्या मिररना जुनाट ठेवतो आणि पुढील wave होईपर्यंत त्यांचे PR-mode assertions वगळले जातात. English
  source मध्ये anchor आता नसल्यास संपूर्ण-file comparison कडे fallback केले जाते.
- `i18n translation drift` — PR वर advisory, push, nightly आणि release cut वर strict असते, त्यामुळे
  release मध्ये जुनाट मिरर पाठवला जाऊ शकत नाही.

`scripts/i18n/sync-llm-mirrors.mjs` (`syncLlmMirrors()` म्हणूनही export केलेले, `--dry-run` सह)
`llm.txt` मिरर पुन्हा लिहिते; release refresh, translation wave आणि scheduled
`i18n-mirror-refresh.yml` ते चालवतात (refresh जुनाट `llm.txt` मिरर dry run द्वारे शोधते, कारण
drift report त्यांची यादी करत नाही, आणि `check:docs-all` पूर्वी त्यांना sync करते).

`docs/diagrams/` अंतर्गत असलेले बारा README SVG generate केलेले आहेत
(`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` त्यांना सर्वांना पुन्हा generate करते).
प्रत्येकासाठी byte-compare unit test आहे (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), जो
release मोडमध्ये committed file जुनाट असल्यास अयशस्वी होतो; PR मध्ये `check:generated-artifacts` PR ने
संपादित केलेल्या SVG चे मूल्यमापन करते आणि base चा drift release refresh कडे सोपवला जातो (पहा
[Generated files and derived baselines](#generated-files-and-derived-baselines-written-at-release)) — आणि `check:docs-counts`
`<text>` nodes मधून canonical numbers वाचते — म्हणून outlining step प्रत्येक outlined string फाइलमध्ये
अदृश्य `<text>` म्हणून ठेवतो. SVG canonical-numbers तपासणी
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) मध्ये सूचीबद्ध फाइल्स वाचते:
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, तसेच `public/images/tier-flow-dark.svg` आणि `tier-flow-light.svg`; `free-forever`,
catalog-entry, recurring-pool आणि scoring-factors claims देखील
`promise-pillars.svg`, `free-tier-budget.svg` आणि `strategies-grid.svg` वाचतात. हे
generators ज्या counts रेखाटतात (provider total, MCP tools, routing strategies, free-forever providers, …) ते
`scripts/docs/readmeFacts.mjs` द्वारे facts snapshot `docs/reference/derived-facts.json` मधून येतात,
literals मधून नाहीत, त्यामुळे कोणत्याही branch वर diagram पुन्हा generate केल्यास committed file पुन्हा तयार होते.
`free-tier-budget.svg` त्याच्या rows त्याच snapshot मधून रेखाटते (`code.freeTierBudget`, facts probe ने नोंदवलेला
catalog summary), त्यामुळे `FREE_MODEL_BUDGETS` मधील बदल पुढील refresh वेळी card पर्यंत पोहोचतो,
CI लाल होण्याऐवजी.

### Derived values: `pr` आणि `release` gate modes

Feature PR base च्या स्थितीवर अवलंबून असलेले कोणतेही value लिहित नाही: provider, migration,
MCP-tool आणि strategy counts, README SVG numbers, facts snapshot. एक step हे सर्व पुन्हा मोजतो,
`npm run release:refresh-derived`, जो release आणि nightly
derived-refresh PR द्वारे चालवला जातो. त्यामुळे **releases दरम्यान base live code पेक्षा मागे असतो — हे
जाणीवपूर्वक आहे**, आणि live code शी tree ची तुलना करणारा gate किंवा test sibling ने provider जोडल्यावर
प्रत्येक PR वर red ठरेल. त्यामुळे derived values चे मूल्यमापन करणारे gates
`scripts/check/lib/gateMode.mjs` द्वारे (पहिला match लागू होतो) दोनपैकी एका mode मध्ये चालतात:

1. command line वर `--mode=pr|release`;
2. `OMNIROUTE_GATE_MODE` environment variable (`pr` किंवा `release`);
3. GitHub Actions event वरून automatic: `pull_request` ज्याची head `release/v*` नाही,
   `merge_group`, किंवा `omni-queue/**` कडे होणारा push → `pr`; इतर सर्व (push, schedule,
   dispatch, release PR `release/v* → main`, कोणताही local run) → `release`.

प्रत्येक mode मध्ये `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) कशामुळे अयशस्वी होते:

| पद्धत     | अयशस्वी ठरणारे                                                                                                                                                                                                                                                                                                                                                                                                           | जिवंत तथ्यांची आवश्यकता |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `release` | प्रत्येक तपासणी, ट्रीतून गोळा केलेल्या तथ्यांशी कठोर समानता (गेटचे नेहमीपासूनचे वर्तन): शिळी संख्या, आवृत्ती, कव्हरेजची किमान मर्यादा किंवा SVG संख्या ही STRICT विसंगती आहे                                                                                                                                                                                                                                             | होय                     |
| `pr`      | बदलाने केलेलेच बदल, त्याच दावा-एक्स्ट्रॅक्टर्ससह PR बेसशी तुलना करून: (1) त्या तपासणी आणि फाइलसाठी बेसमध्ये अस्तित्वात नसलेली व्यवस्थापित मूल्ये ("PR ने व्यवस्थापित संख्या संपादित केली — ओळ बेस मजकुरावर पुनर्संचयित करा"); (2) बेसमध्ये असलेला आणि हेडमध्ये गमावलेला आवश्यक दावा. तथ्यांची आवश्यकता नसलेली सामग्री अपरिवर्तनीयता `release` मोडप्रमाणे चालते; फक्त `release` मधील तपासण्या सूचीबद्ध करून वगळल्या जातात | नाही                    |

एजंट-निर्देश फाइल्समध्ये कोणतीही व्युत्पन्न संख्या नसते: `AGENTS.md`, `llm.txt` (आणि त्याच्या
`docs/i18n/*/llm.txt` प्रती), bs `AGENTS.md` फोर्क, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md` आणि प्रत्येक `skills/*/SKILL.md` स्रोताकडे
(उदाहरणार्थ `src/shared/constants/routingStrategies.ts` मधील `ROUTING_STRATEGY_VALUES`) आणि
`npm run facts` कडे निर्देश करतात. "No derived counts (agent-instruction file …)" ही अपरिवर्तनीयता
दोन्ही मोडमध्ये तेथे आढळणारी संख्या (providers, migrations, MCP tools and scopes,
routing strategies, scoring factors, mode packs) अयशस्वी ठरवते; त्यामुळे release refresh ला
निर्देश फाइल पुन्हा लिहिण्याची गरज भासत नाही.

`pr` मोडमध्ये लेखकांच्या शाखा व्यवस्थापित मूल्ये संपादित करू शकतात: `chore/derived-*` (रात्रीचे refresh
PR), `release/v*`, आणि भाषांतराच्या लाटा `docs/i18n-*` व `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). रांगेतील बॅच (`merge_group`, Mergify drafts,
`omni-queue/**`) यांचा पुन्हा निर्णय घेतला जात नाही: गेटने आधीच एकेक करून तपासलेल्या PR ची ते बेरीज करतात.

एक्झिट कोड: `0` स्वच्छ · `1` STRICT विसंगती (`--strict` सह soft drift देखील) किंवा व्यवस्थापित-मूल्य
उल्लंघन · `2` पायाभूत सुविधा — कोड तथ्ये गोळा करता आली नाहीत (tsx probe अयशस्वी झाले किंवा
कालबाह्य झाले; कालबाह्यतेची मर्यादा `OMNIROUTE_FACTS_TIMEOUT_MS`, डीफॉल्ट 600000 ms आहे) किंवा, CI मध्ये, PR diff
बेस निश्चित करता आला नाही. एक्झिट 2 ही कधीही दस्तऐवजीकरणातील तफावत नसते: जॉब पुन्हा चालवा किंवा
पर्यावरण दुरुस्त करा.

प्रत्येक मोड कुठे चालतो:

| कुठे                                                                                                | पद्धत                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Feature PR — `ci.yml` job `docs-sync-strict`, `quality.yml` step "Docs accuracy"                    | `pr` (स्वयंचलित); जॉब बेस `BASE_SHA` म्हणून देतो आणि `fetch-depth: 2` सह checkout करतो                                                                                                           |
| `merge_group`, `omni-queue/**` candidates, merge train ची संपूर्ण गेट सूची                          | `pr`                                                                                                                                                                                             |
| Release PR (`release/v* → main`), pushes, scheduled and manual runs                                 | `release`                                                                                                                                                                                        |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                        | HARD items `OMNIROUTE_GATE_MODE=pr` सह चालतात ("बेसमुळे बिघाड झाला का?"); DRIFT item `derived-refresh` `npm run release:refresh-derived -- --check` चालवतो (कठोर दृश्य, बेस-रेड कधीही उघडत नाही) |
| Release (`/generate-release` phases 0a and 1; skill wiring is a separate owner-approved change)     | `npm run release:refresh-derived` व्युत्पन्न फाइल्स लिहिते; release PR च्या स्वतःच्या तपासण्या त्यानंतर `release` मोडमध्ये चालतात                                                                |
| `nightly-derived-refresh.yml` (दररोज, सर्वोच्च `release/vX.Y.Z`, release-freeze अंतर्गत वगळले जाते) | `npm run release:refresh-derived -- --profile=nightly`; फरक आढळल्यास ते `chore/derived-refresh` कडून एकच PR खुले ठेवते; कधीही merge करत नाही                                                     |

यामागील कमांड्स:

- `npm run facts` प्रत्येक व्युत्पन्न संख्या JSON म्हणून मुद्रित करते (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` एक मूल्य मुद्रित करते, तर `--snapshot` सक्रिय ट्रीऐवजी कमिट केलेला स्नॅपशॉट वाचते. तथ्ये गोळा करता न आल्यास एक्झिट 2.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) व्युत्पन्न फाइल्स एका पासमध्ये, या क्रमाने पुन्हा मोजते (`--only=` साठी स्टेप आयडी): `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (स्नॅपशॉट), `numbers` (काउंट्स गेटची पुनर्लेखन योजना दस्तऐवजांवर लागू केली जाते आणि नंतर त्यांच्या
  `docs/i18n/` मिररमध्ये नेली जाते), `readme-diagrams`, `skills` (व्युत्पन्न `SKILL.md`), `e2e-timings` (ट्रीमध्ये
  `syncE2eTimings` येईपर्यंत वगळले जाते), `ui-keys` (`en.json` मधून काढलेल्या कीज वगळते आणि
  `--rewritten-since=<ref>` — डीफॉल्ट `origin/main` — सह शेवटच्या रिलीजपासून पुन्हा लिहिलेली इंग्रजी मूल्ये
  पुन्हा रांगेत ठेवते), `llm-mirrors` आणि `verify-generated` (लेखनानंतर, रिलीज मोडमध्ये
  `check:generated-artifacts` आणि `check:agent-skills-sync` यशस्वी झाले पाहिजेत; `--check` मध्ये आणि `--only`
  मुळे ते वगळले असल्यास वगळले जाते; अपयश म्हणजे एक्झिट 2). `changelog` स्टेप ऐच्छिक आहे (`--with-changelog`, फक्त रिलीज प्रोफाइलमध्ये). `--profile=nightly`
  कधीही आवृत्तीचा दावा बदलत नाही. `-- --check` सह काहीही लिहिले जात नाही आणि कोणतीही फाइल
  बदलणार असेल किंवा व्यवस्थापित मूल्याला मॅन्युअल संपादन आवश्यक असेल (दोन्हींची सूची देऊन) एक्झिट 1 होते; पायाभूत सुविधांच्या अपयशासाठी एक्झिट 2. `--json` निकाल JSON म्हणून मुद्रित करते.
- `docs/reference/derived-facts.json` हा शेवटच्या रिफ्रेशने वापरलेल्या तथ्यांचा स्नॅपशॉट आहे. तो फक्त रिफ्रेशच लिहिते. README SVG जनरेटर तो वाचतात, आणि PR-वेळेच्या युनिट चाचण्या त्याच्याशी कमिट केलेले दस्तऐवज आणि व्युत्पन्न फाइल्सची तुलना करतात — सक्रिय कोडशी कधीही नाही. सूटमधील एकमेव सक्रिय तुलना म्हणजे `tests/unit/check-docs-counts-sync.test.ts` मधील "रिलीज रिफ्रेश सायकल पूर्ण करते": सक्रिय तथ्यांसह, रिफ्रेशची पुनर्लेखन योजना मेमरीमध्ये लागू केल्यावर ती नोंदवत नसलेला कोणताही STRICT फरक शिल्लक राहत नाही आणि पुन्हा योजना केल्यावर काहीही बदलत नाही.

स्थानिक पातळीवर पुनरुत्पादन करण्यासाठी (स्थानिक रनचा डीफॉल्ट `release` असतो):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # feature PR चे मूल्यमापन कशावर केले जाते
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # रिलीज काय पुन्हा लिहील
```

निराकरण करता येणारा बेस नसल्यास (`BASE_SHA`/`BASE_REF` नाही, तसेच स्थानिक `origin/release/v<version>` नाही), स्थानिक
`pr` रन चेतावणी मुद्रित करून अयशस्वी होण्याऐवजी फरक वगळतो.

### जॉब: `i18n-ui-coverage`

| स्क्रिप्ट                         | पडताळणी                                                                                                                                                                                     | ब्लॉक करणारे         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n की कव्हरेज ≥ 65% आहे                                                                                                                                                                | होय (दोन्ही मोड)     |
| `check:ui-icu`                    | प्रत्येक UI कॅटलॉगमधील प्रत्येक संदेश `IntlMessageFormat` सह कंपाइल होतो                                                                                                                    | होय (दोन्ही मोड)     |
| `check-ui-value-drift` (इनलाइन)   | पुन्हा लिहिलेले इंग्रजी **मूल्य** मागे कोणतेही शिळे भाषांतर ठेवत नाही                                                                                                                       | होय (फक्त रिलीज मोड) |
| `check-new-key-coverage` (इनलाइन) | **नवीन** इंग्रजी कीचे प्रत्येक लोकेलमध्ये भाषांतर केलेले आहे — `__MISSING__:` मार्कर नाकारला जातो                                                                                           | होय (फक्त रिलीज मोड) |
| `check-key-completeness` (इनलाइन) | प्रत्येक UI कॅटलॉग (आणि `--catalog=cli` सह, प्रत्येक CLI कॅटलॉग) त्याच्या `en.json` मधील कीजचा नेमका संच ठेवतो; `pr` मोडमध्ये, PR ने मर्ज बेसच्या तुलनेत स्वतःमध्ये बदललेला प्रत्येक कॅटलॉग | होय (दोन्ही मोड)     |
| `check-translation-ratio`         | प्रत्येक लोकेलमधील वास्तविक-भाषांतर गुणोत्तर (इंग्रजीसारखेच / प्लेसहोल्डर / अनुमतीसूचीबाहेरील गहाळ) `config/quality/i18n-translation-baseline.json` + स्लॅकपेक्षा जास्त नसावे               | होय (फक्त रिलीज मोड) |

`fetch-depth: 0` आवश्यक आहे — मूल्य-फरक गेट `en.json` ची मर्ज बेसशी तुलना करते.

**दोन मोड (2026-11-13 पासून).** फीचर PR `en.json` (आणि
`bin/cli/locales/en.json`) मध्ये कीज जोडतो किंवा पुन्हा लिहितो आणि इतर कोणत्याही लोकेलला स्पर्श करत नाही; `check:pr-derived-paths` (`pr-test-policy` जॉब,
`config/quality/derived-paths/translation.json` फॅमिली) असे करणाऱ्या फीचर PR ला अयशस्वी करते. इतर लोकेल्स प्रत्येक रिलीजमध्ये एकदा
`release:refresh-derived` द्वारे पूर्ण केले जातात, जे `scripts/i18n/sync-ui-keys.mjs` मधील `syncUiKeys()` कॉल करते (गहाळ कीज जोडणे, काढलेल्या कीज वगळणे, पुन्हा लिहिलेल्या इंग्रजीच्या भाषांतरांना `rewrittenSinceRef` ने चिन्हांकित करणे, भाषांतर करणे), किंवा भाषांतर लहरीद्वारे.
गेट्स `scripts/check/lib/gateMode.mjs` मधून मोड वाचतात: `pr` मोडमध्ये (फीचर PR, `merge_group`, `omni-queue/**`) वरील रिलीज-मोड गेट्स
`SKIP reason=pr-mode` मुद्रित करून एक्झिट 0 करतात; `release` मोडमध्ये (रिलीज PR, `main` वरील पुश, `workflow_dispatch`, स्थानिक रन) ते आधीप्रमाणे कठोर असतात, आणि रिलीज PR वर फरक-जागरूक गेट्सना `BASE_REF=origin/main` मिळते, त्यामुळे ते सायकलने जोडलेल्या किंवा पुन्हा लिहिलेल्या प्रत्येक कीचे मूल्यमापन करतात. `--mode=pr` सह फीचर-PR चा निकाल स्थानिक पातळीवर पूर्वावलोकित करा.

`pr` मोडमध्ये locale catalogs मध्ये अजूनही बदल करणारा PR (translation wave, release refresh, translation-only fix) वगळला जात नाही: `check-key-completeness` त्याने बदललेल्या प्रत्येक catalog ची merge base वरील त्याच catalog शी (`scripts/i18n/lib/touched-catalogs.mjs`) तुलना करते आणि catalog मधून गमावलेली key, `en.json` मध्ये नसलेली key, प्रत्यक्ष translation चे `__MISSING__:` marker मध्ये किंवा English text मध्ये रूपांतर, किंवा PR ने न बदललेल्या English string मधील placeholders/tags शी यापुढे interpolation न करणारे value आढळल्यास अपयशी ठरते. PR मध्ये नवीन असलेल्या catalog मध्ये संपूर्ण `en.json` key set असणे आवश्यक आहे. PR ने बदललेल्या catalogs साठी ratio आणि CLI-parity gates काय पाहतील, हे यात समाविष्ट होते.

Locale-parity unit tests (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` द्वारे त्याच modes चे अनुसरण करतात: `pr` मोडमध्ये ते key-parity assertions वगळतात आणि merge base पासून English बदललेल्या keys साठी placeholder parity release refresh कडे सोपवतात (unit-test job च्या shallow checkout ला ती वाचता आली नाही तर प्रत्येक key). हा helper हा **एकमेव मंजूर mode-conditional skip** आहे:
`check:test-masking` `.skip(` आणि `{ skip: true }` मोजते, पण तो परत करत असलेला computed `{ skip: "<reason>" }` मोजत नाही, म्हणून `tests/unit/locale-parity-mode.test.ts` हा वापरण्यास अनुमती असलेल्या tests ची यादी निश्चित करतो — त्यात एखादी भर घालणे म्हणजे त्या यादीत reviewed edit करणे होय.

#### `check-ui-value-drift` — stale-translation gate

इतर gates संरचनात्मकरीत्या पाहू शकत नाहीत असा एकमेव i18n regression शोधते: English value पुन्हा लिहिले जाते आणि मागील English वरून तयार झालेली translations मागे राहतात, त्यामुळे non-English users ना आत्मविश्वासाने लिहिलेला, पण आता चुकीचा मजकूर दिसत राहतो.

हे प्रत्यक्षात घडले आहे. Antigravity login helper आल्यावर (`#5203`) `oauthModal.googleOAuthWarning` पुन्हा लिहिले गेले; **43 पैकी 39 locales** मध्ये operators ना "copy the full URL and paste it below" असे सांगणारा मजकूर राहिला — पण त्या provider साठी हा flow पूर्ण होऊ शकत नाही. #8463 पर्यंत हे लक्षात आले नाही, कारण:

- `sync-ui-keys` फक्त **अनुपस्थित** keys पुन्हा भरते, stale keys नाही;
- `check-ui-keys-coverage` key _presence_ मोजते, त्यामुळे stale translation covered म्हणून मोजली जाते;
- `check-translation-drift` `docs/i18n/<locale>/**.md` documentation mirrors चा मागोवा घेते —
  ते `src/i18n/messages/*.json` कधीही वाचत नाही. हे `docs-sync-strict` job मध्ये चालते: PR वर advisory,
  तर push आणि nightly वर strict; translation wave mirrors refresh करते, feature PR नाही.

**Diff-aware, baseline-backed नाही.** हे merge base वरील `en.json` ची working tree शी तुलना करते; English value बदललेल्या प्रत्येक key साठी, untouched translation ठेवणारा कोणताही locale stale असतो. यामुळे जाणूनबुजून आधीचे debt **freeze** केले जाते — एखादी diff दीर्घकाळ अस्तित्वात असलेली translation कोणत्या जुन्या English वरून आली हे उघड करू शकत नाही, त्यामुळे gate फक्त सध्याच्या बदलाने प्रभावित झालेल्या गोष्टींचे परीक्षण करते. पर्याय म्हणून per-key hash baseline ठेवला असता सुमारे 600 KB ची generated file लागली असती, म्हणजे विद्यमान सर्वात मोठ्या baseline पेक्षा 3× मोठी, आणि प्रत्येक i18n PR मध्ये churn झाला असता.

हे पूर्ण करण्याचे दोन मार्ग:

1. प्रभावित translations अद्ययावत करा, किंवा
2. त्यांना `__MISSING__:<new english>` वर सेट करा — runtime नंतर corrected English पुरवतो
   (`src/i18n/request.ts::deepMergeFallback`, #7258) आणि ती key translation साठी queue मध्ये पाठवतो.

String चा **अर्थ** बदलला असल्यास, key चे नाव बदलणे पसंत करा: नवीन key stale translation वारशाने घेऊ शकत नाही. #8463 ने हाच pattern वापरला.

```bash
npm run i18n:check-value-drift          # strict (CI काय चालवते)
npm run i18n:check-value-drift:warn     # फक्त अहवाल
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Base catalog वाचता न आल्यास (base ref शिवाय shallow clone), `check-openapi-breaking` प्रमाणे, `SKIP reason=base-unresolved` सह exit 0 करते. फक्त release mode: feature PR English पुन्हा लिहून तिथेच थांबतो; release refresh मागे राहिलेल्या translations चिन्हांकित करते (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, तेच `findStaleTranslations`).

### Job: `i18n`

संपूर्ण i18n validation matrix (प्रत्येक locale साठी एक job). संपूर्ण job advisory आहे.

| Script                          | Validates                                     | Blocking                                                |
| ------------------------------- | --------------------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | प्रत्येक locale साठी translation completeness | **Advisory** (संपूर्ण job वर `continue-on-error: true`) |

### Job: `pr-test-policy`

फक्त pull requests वर चालते.

| Script                 | Validates                                                                                                                                           | Blocking |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, किंवा `bin/` मधील production code बदलणाऱ्या PR मध्ये tests समाविष्ट किंवा अद्ययावत असणे आवश्यक आहे (Hard Rule #8) | Yes      |
| `check:test-masking`   | बदललेल्या test files net assert count कमी करत नाहीत किंवा `assert.ok(true)` tautologies जोडत नाहीत                                                  | Yes      |
| `check:pr-evidence`    | PR body मध्ये बदलासाठी test/VPS evidence चा उल्लेख आहे (PR prose मध्ये grep करून Hard Rule #18 mechanize करते — fragile, Backlog पाहा)              | Yes      |

### Job: `test-vitest`

`build` नंतर चालते. अपयश झाल्यास merge थांबवते.

| Suite            | काय तपासते                                           | अवरोधक                                                                                                            |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, कॅशे — vitest रनर | होय                                                                                                               |
| `test:vitest:ui` | UI घटक चाचण्या — vitest रनर                          | **अवरोधक** — `vitest.config.ts` मध्ये आधीपासूनच्या अपयशांना स्पष्टपणे वगळले आहे; नवीन अपयशांमुळे जॉब अयशस्वी होतो |

### रात्रीचे वर्कफ्लो (शेड्यूलनुसार, सल्लागार)

हे cron शेड्यूलवर (आणि `workflow_dispatch` वर) चालतात, PR वर कधीही चालत नाहीत. हे सर्व सल्लागार आहेत.

| वर्कफ्लो               | काय तपासते                                                                                                                                               | अवरोधक       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | यादृच्छिक seed + मोठ्या रन संख्येसह fast-check प्रॉपर्टी चाचण्या                                                                                         | **सल्लागार** |
| `nightly-resilience`   | heap-growth गेट, chaos fault-injection, k6 लोड/soak                                                                                                      | **सल्लागार** |
| `nightly-llm-security` | promptfoo injection guard (block मोड) + garak probes (provider secret शिवाय वगळले जाते)                                                                  | **सल्लागार** |
| `nightly-schemathesis` | थेट OmniRoute विरुद्ध OpenAPI contract fuzzing (schemathesis), `docs/openapi.yaml` वापरून — spec उल्लंघने / हाताळले न गेलेले 500s उघड करते (टप्पा 8 B.4) | **सल्लागार** |
| `nightly-mutation`     | fast unit lane वरील Stryker mutation-testing स्कोअर — टिकून राहिलेले mutants कमकुवत asserts दर्शवतात                                                     | **सल्लागार** |
| `nightly-compat`       | समर्थित `engines.node` श्रेणींमध्ये Node engine सुसंगतता मॅट्रिक्स                                                                                       | **सल्लागार** |

कामगिरीची बेसलाइन (heap, TTFB, build time) नोंदवली जाते, परंतु त्यावर गेट लावले जात नाही: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) पहा.

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
