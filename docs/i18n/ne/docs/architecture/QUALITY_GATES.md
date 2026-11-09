# Quality Gates Reference (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

यो दस्तावेज OmniRoute का सबै CI गुणस्तर गेटहरूको आधिकारिक सन्दर्भ हो।
यसले प्रत्येक गेट, त्यसले के प्रमाणीकरण गर्छ, त्यो कुन CI job मा चल्छ, त्यसले
ratchet baseline वा pass/fail नीति प्रयोग गर्छ कि गर्दैन, र त्यसले build रोक्छ वा केवल सल्लाहकारी हो भन्ने वर्णन गर्छ।

छोटो सारांश र allowlist नीतिका लागि `AGENTS.md` को "Quality Gates & Ratchets" खण्ड
हेर्नुहोस्। यही प्रणालीको महत्त्वपूर्ण मूल्याङ्कन, परिपक्वता वर्गीकरण, र उपकरण-निरपेक्ष
पुनरावृत्ति योजनाका लागि
[गुणस्तर गेट प्लेबुक](../ops/QUALITY_GATE_PLAYBOOK.md) हेर्नुहोस्।

---

## गेट सूची र कार्यान्वयन प्रोफाइलहरू

### उम्मेदवार भर्ना

CI र क्वालिटी गेट्स कार्यप्रवाहले प्रत्येक स्थिर निर्णय उत्सर्जन गर्दछ: `Gate / CI` र `Gate / Quality`। तिनीहरूको संस्करण भर्ना नीतिले प्रत्येक अपस्ट्रीम कार्यलाई आवश्यक वा सल्लाहकारको रूपमा गणना गर्दछ। एक लागू आवश्यक काम सफल हुनुपर्दछ: हराएको, रद्द गरिएको, छोडिएको, पेन्डिङ र अज्ञात परिणामहरूले PASS स्थापना गर्न सक्दैन। वैध कागजात-मात्र वा क्याटलग-मात्र वर्गीकरणले कोड लेनलाई लागू नहुन सक्छ; साधारण ड्राफ्ट PR स्वीकृत उम्मेदवार होइन। एक `hotfix` लेबल प्रमाण माफ गर्दैन।

दुबै कार्यप्रवाहले PRs main/release शाखाहरूमा कभर गर्दछ, `main` मा पुश, म्यानुअल डिस्प्याच र मर्ज-समूह घटनाहरू। पुश, डिस्प्याच र मर्ज-समूह पूर्ण चयन चलाउनुहोस्। एक विश्वसनीय Mergify लाम मस्यौदाले लागू `full-code`/`full-code-e2e` कार्यहरू पनि चलाउँछ; साधारण PRs तिनीहरूलाई छोड्नुहोस्। म्यानुअल मर्ज गर्नु अघि, सही उम्मेद्वारमा पूर्ण प्रेषण चलाउनुहोस्। `release/**` मा धकेल्दा यी कार्यप्रवाहहरू सुरु हुँदैन; रिलीज-ग्रीनले मर्ज गरिएको आधारलाई छुट्टै अवलोकन गर्दछ (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन)। फोर्क्स र मर्ज समूहहरूले कामका लागि होस्टेड धावकहरू प्रयोग गर्छन् जसले अन्यथा स्व-होस्ट गरिएका धावकहरू चयन गर्छन्; रोलआउट गर्नु अघि पर्याप्त होस्ट गरिएको क्षमता प्रमाणित गरिनु पर्छ।

एक साधारण PR छिटो चयन चलाउँछ। भर्ना नीतिको `full-code` र `full-code-e2e` लेनहरू (E2E, एकीकरण, प्याकेज आर्टिफ्याक्ट, Electron धुवाँ, Bun SQLite, इकोसिस्टम र प्रोटोकल क्लाइन्टहरू) केवल मर्जिफाइ क्यु ड्राफ्टमा वा पूर्ण रूपमा चल्छन्: `gh workflow run ci.yml --ref <branch>`।

प्रत्येक JSON रसिदले चेक-आउट SHA, कार्यप्रवाह रन र प्रयास पहिचान गर्दछ। CLI ले checkout/event SHA बेमेललाई अस्वीकार गर्दछ। कार्यप्रवाह परीक्षणहरूले नीति सदस्यतालाई निर्णय कार्यको `needs` सूचीमा बाँध्न्छन् त्यसैले नयाँ वा हटाइएको लेन चुपचाप हराउन सक्दैन। रसिदहरूले तिनीहरूको आफ्नै कार्यप्रवाहलाई कभर गर्दछ, प्रकाशन, तैनाती, वा अवस्थित सल्लाहकार स्क्यानरको आन्तरिकहरू। शाखा नियमहरूमा आवश्यक लागू चेकहरू बनाउनु एक अलग प्रशासनिक परिवर्तन हो; तिनीहरूको कामहरू परिभाषित गर्नु आफैंले शाखालाई सुरक्षित गर्दैन।

`API Route Typecheck` एक स्वतन्त्र कार्यप्रवाह जाँच हो, दुबै समग्र निर्णय र स्थानीय पूर्ण पर्यवेक्षकको स्थिर प्रोफाइल बाहिर। सटीक उम्मेद्वारको लागि यसको नतिजा छुट्टै निरीक्षण गर्नुहोस्। `.github/workflows/api-route-typecheck.yml` PRs मा `main` वा `release/**` मा चल्छ, शाखा परिवार, म्यानुअल प्रेषण, र `checks_requested` प्रकारको `merge_group` घटनाहरूमा धकेल्छ। यसमा कुनै पथ फिल्टर छैन। समूहहरू मर्ज गर्नुहोस् `merge_group.head_sha` जाँच गर्नुहोस्; अन्य घटनाहरू `github.sha` जाँच गर्नुहोस्। सबै घटनाहरूले एउटै API डायग्नोस्टिक गेट र गेट एकाइ परीक्षणहरू प्रयोग गर्छन्। PR आधार पुन: लक्ष्यले नयाँ चेक अनुरोध गर्दछ; body/title सम्पादनहरूले अवलोकन-मात्र नाम `Admission not requested / API Route Typecheck` प्रयोग गर्दछ र प्रवेश जाँचलाई प्रतिस्थापन गर्न सक्दैन।

### स्वीकृति reducer मा कायम राखिएको प्रमाण

`scripts/quality/validate-release-acceptance.mjs` ले प्रदान गरिएको योजना र त्यसका
manifest हरूलाई reduce गर्छ; यसले उक्त योजनाले पूर्ण release pipeline समेट्छ भनेर स्थापित गर्दैन।
त्यसका report हरूले योजना `VERIFIED` हुँदा पनि स्पष्ट रूपमा `releaseAcceptance: false`
सेट गर्छन्। `release-acceptance.yml` कार्यप्रवाहले अझै पनि वास्तविक build, package, boot
वा promotion रसिदहरू होइन, shadow fixture हरू प्रयोग गर्छ।

CLI लाई कायम राखिएको प्रमाण प्रमाणित गर्न `--evidence-root` आवश्यक हुन्छ। फाइलहरू
`<evidence-root>/<artifact_id>/<member>` का रूपमा resolve गरिन्छन् र SHA-256 का रूपमा hash गरिन्छन्। प्रमाणविनाको PASS record,
हराएको वा परिवर्तन भएको फाइल, असुरक्षित path वा symlink ले
प्रमाणीकरण रोक्छ। हराएका फाइलहरू खाली सफल log बराबर होइनन्। विद्यमान
SHA/run/attempt जाँचहरू स्वतन्त्र रहन्छन्: मिल्ने byte हरूले पुरानो
रसिदलाई मान्य बनाउन सक्दैनन्। फाइल अखण्डता कार्यान्वयनको प्रामाणिकता वा artifact promotion को प्रमाण होइन।

### DAST ले प्रमाणित CI build प्रयोग गर्छ

अनिवार्य CI job `dast-smoke` ले `build` पछि `.github/workflows/dast-smoke.yml` बोलाउँछ। यसले build कै code/draft छनोट पालना गर्छ, जसमा समर्थित fork PR, release-target PR र merge group पर्छन्। हराएको, असफल, रद्द वा अप्रत्याशित रूपमा छोडिएको DAST job ले `Gate / CI` रोक्छ। पुनःप्रयोगयोग्य workflow को स्वतन्त्र PR/dispatch trigger छैन; manual validation ले CI dispatch प्रयोग गर्छ, जसले build र consumer एउटै run मा राख्छ।

`scripts/ci/next-build-provenance.mjs` ले पूरा Next artifact लाई tar digest, repository/event/run, producer attempt, head/base/checkout/tree, workflow identity, lockfile, ठ्याक्कै Node version/ABI, platform र bundler सँग बाँध्छ। DAST ले अपरिवर्तनीय artifact ID `needs.build.outputs` बाट छान्छ, download digest प्रमाणीकरण अनिवार्य गर्छ र `scripts/ci/unpack-ci-build.py` बाट स्वीकृत दुई member निकाल्नुअघि ZIP hash आफैँ गणना गरी producer digest सँग मिलाउँछ। Next tree निकाल्नुअघि manifest र tar archive पनि producer का स्वतन्त्र output सँग मिल्नुपर्छ। यसले branch को पछिल्लो सफल build कहिल्यै खोज्दैन। ID र सबै input अझै मिल्दा partial rerun ले त्यही producer attempt पुनःप्रयोग गर्न सक्छ; receipt ले दुवै attempt राख्छ।

Consumer hosted Linux runner मा रहन्छ, repository पढ्ने अधिकारमात्र र repository secret बिना। यसले producer को ठ्याक्कै Node version स्थापित गरेर `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` सहित CLI बनाउँछ। `scripts/build/standaloneInput.mjs` ले कुनै fallback build अघि हराएको standalone server अस्वीकार गर्छ; साधारण स्थानीय CLI build ले आफ्नो विद्यमान fallback राख्छन्। Server readiness, Schemathesis र promptfoo सबै job को नफेरिएको 25 मिनेट सीमाभित्र सफल हुनुपर्छ। Provenance receipt ले input को पहिचान र byte प्रमाणित गर्छ, सफल DAST scan होइन। Artifact को म्याद सकिनु, runner रोकिनु वा scanner असफल हुनु अधुरो वा असफल प्रमाण नै रहन्छ; advisory wrapper ले त्यसलाई PASS बनाउन सक्दैन।

### UI कार्यान्वयन क्षमता

CI ले पूर्ण UI सूचीलाई चारवटा `test-vitest` matrix shard का रूपमा चलाउँछ, प्रत्येकमा बढीमा
प्रति shard दुई worker र विद्यमान 15-मिनेटको कार्य समयसीमा हुन्छ। पहिलो shard ले
MCP/autoCombo Vitest suite पनि चलाउँछ। आवश्यक कार्य परिणामले प्रत्येक matrix leg समेट्छ;
एउटा shard को असफलता वा रद्दीकरणले उम्मेदवार स्वीकृति स्थापित गर्न सक्दैन।

रात्रिकालीन observer ले प्रत्येक UI shard का लागि छुट्टै exact-candidate रसिद कायम राख्छ,
जसमा पहिलो रसिदभित्र MCP कार्यान्वयन पनि समावेश हुन्छ। चारैवटा रसिद, log र मेल खाने
कार्यान्वयन पहिचानहरू आवश्यक हुन्छन्। स्थानीय `npm run test:vitest:ui` ले अझै पनि
पूर्ण suite चयन गर्छ; एउटा `--shard` run आंशिक प्रमाण मात्र हो।

### Unit coverage सङ्कलन

बाह्रवटा unit shard ले आफ्ना विद्यमान परीक्षण कार्यान्वयनका क्रममा V8 coverage सङ्कलन गर्छन्। सफल
shard ले मध्यवर्ती Istanbul report उत्पन्न नगरी मूल फाइलहरू संकुचित गर्न
`scripts/ci/compact-v8-coverage.mjs` चलाउँछ। अन्तिम Coverage कार्यले उम्मेदवार SHA,
runtime, source root र data hash विरुद्ध सबै बाह्र manifest प्रमाणित गर्छ, त्यसपछि c8 का reporter
र विद्यमान coverage threshold हरू चलाउँछ। Input हरूले c8 को global filename क्रम कायम राख्छन्;
मिश्रित function/block coverage का लागि प्रति-shard पूर्व-मर्जिङ असुरक्षित हुन्छ।
हराएका, विकृत वा असंगत shard हरूले स्वीकृति असफल गराउँछन्।
असफल test shard हरूले raw diagnostic coverage छुट्टै कायम राख्छन्; त्यो अन्तिम merge मा प्रवेश गर्न सक्दैन।

### एकाइ कार्यान्वयन प्रगति रसिदहरू

साझा `test:unit:ci:shard` आदेशले `scripts/ci/unit-progress-reporter.mjs` मार्फत `primary`, `dashboard` र `serial`
चरणहरू अभिलेख गर्छ। सामान्य परीक्षण प्रतिवेदन उपलब्ध नै रहन्छ।
एउटा छुट्टै, मेटाडेटा-मात्र भएको रसिदले प्रत्येक फाइलको सुरुआत र समाप्ति अभिलेख गर्छ,
र ३०-सेकेन्डको हार्टबिटले अझै सक्रिय रहेका फाइलहरू र तिनको बितेको समय सूचीबद्ध गर्छ। यसले
अनुमति-सूचीमा भएका कार्यान्वयन मेटाडेटा मात्र अभिलेख गर्छ; परीक्षण विवरण, आउटपुट, त्रुटिका मुख्य भाग र पूर्ण
वातावरणलाई क्रमबद्ध गरिँदैन।

CI ले JSONL फाइलहरू `unit-progress-ci-<run>-<attempt>-<shard>` नाममा राख्छ। कार्यको समयसीमाका कारण पछिको अपलोड रोकिन सक्छ;
पहिले नै उत्सर्जित हार्टबिटहरू निदानात्मक प्रमाणका रूपमा रहन्छन्। हार्टबिटहरू नहुनुले
अवरुद्ध वा समाप्त गरिएको रनर प्रक्रियालाई पनि जनाउन सक्छ। यी रसिदहरूले विद्यमान परीक्षण छनोट,
समवर्तीता, समयसीमा र निकास स्थिति सुरक्षित राख्छन्; यी उम्मेदवार-स्वीकृतिसम्बन्धी निर्णयहरू होइनन्।

### Merge queue

`queue` लेबलले PR लाई Mergify queue (`.mergify.yml`) मा पठाउँछ। Mergify ले
`mergify/merge-queue/` branch मा draft PR खोल्छ, CI ले त्यहाँ पूर्ण छनोट चलाउँछ, र
`Gate / CI`, `Gate / Quality` तथा `Merge integrity (changelog + generated skills)` सफल भएपछि मूल PR merge हुन्छ।

Mergify ले आफ्नो queue summary draft को description मा लेख्छ, र अन्य app हरूले पनि यसलाई सम्पादन गर्न सक्छन्।
यस्तो draft मा हुने `pull_request` `edited` event ले आफ्नै concurrency group
(`-queue-edit-<run_id>`) लिन्छ, जसले गर्दा draft को वास्तविक run रद्द गर्न सक्दैन, र यसले gate तथा
matrix छोड्छ। केवल `Merge integrity` अझै चल्छ। छोडिएको gate job को check name फरक हुन्छ,
किनभने Mergify ले छोडिएको `Gate / CI` लाई असफल check का रूपमा पढ्छ र PR लाई queue बाट हटाउँछ।

Queue बाट हटाइएपछि, push ले सधैँ PR लाई पुनः queue मा राख्दैन। त्यसमा `@mergifyio queue` comment गर्नुहोस्।

### Static scan सूची

संस्करणीकृत npm-alias सूची र static-scan सदस्यता
`config/quality/gate-manifest.json` मा छन्। `package.json` विरुद्ध script नाम र ठ्याक्कै command हरू
प्रमाणित गर्न `npm run check:gate-manifest` चलाउनुहोस्; थप, हटाइ वा
command drift ले स्थानीय hook र CI का change-classification कार्यहरू दुवै असफल गराउँछ।
एउटा alias कार्यप्रवाह job, matrix instance वा test case होइन: यी गणनाहरूलाई
परस्पर विनिमेयका रूपमा प्रस्तुत गर्नु हुँदैन।

चयन गरिएका alias हरूलाई कार्यान्वयन नगरी निरीक्षण गर्न `npm run quality:scan -- --list` वा
`npm run quality:scan:fast -- --list` प्रयोग गर्नुहोस्। Runner ले
npm entrypoint आह्वान गर्छ, त्यसैले यसको runtime (कन्फिगर गरिएको ठाउँमा Bun सहित) सुरक्षित रहन्छ।
Manifest ले ती profile बाहिरका alias हरूलाई छुट्टै आह्वान गरिएका रूपमा अभिलेख गर्छ, र
read-only scan profile हरूमा maintenance command हरू निषेधित छन्।

यी profile हरूले static scan मात्र समेट्छन्। तिनले product test,
coverage, packaging, बाह्य check वा उम्मेदवारको पूर्ण release acceptance प्रमाणित गर्दैनन्।
कार्यप्रवाह स्वीकृतिले लिंक गरिएको `config/quality/admission-policy.json` र
`scripts/quality/admission-verdict.mjs` प्रयोग गर्छ। Release-observer profile हरू छुट्टै रहन्छन्;
तिनका लागू हुने check र रसिदहरू स्वतन्त्र रूपमा निरीक्षण गर्नुहोस्। पूर्ण observer का static
command हरू `config/quality/release-green-static-profile.json` मा घोषणा गरिएका छन्, जसमा
`audit:deps`, mutation-test चयन र translation check हरू समावेश छन्। Loader ले npm
command हरूलाई package.json र मोडल गरिएका CI/Quality घोषणाहरू विरुद्ध प्रमाणित गर्छ; यसले shell token हरूलाई argument का रूपमा कार्यान्वयन गर्नुको सट्टा drift अस्वीकार गर्छ।
आवश्यक scanner को SKIP/INCOMPLETE output ले PASS स्थापित गर्न सक्दैन।
Profile ले आफ्ना बाह्य अपवर्जनहरू अभिलेख गर्छ र hosted coverage, test matrix,
package वा deployment प्रमाणलाई प्रतिस्थापन गर्दैन। तलको गद्य सूची एउटा सन्दर्भ हो,
कुनै gate वास्तवमै चलेको प्रमाण होइन।

Script हरू `scripts/check/` (नीति gate हरू) र `scripts/quality/` (ratchet engine) अन्तर्गत छन्।
CI को आधिकारिक स्रोत `.github/workflows/ci.yml` हो।

### प्रकाशित-आधार दस्तावेज स्वास्थ्य

`.github/workflows/i18n-base-health.yml` ले `main` र `release/v*` मा चयन गरिएका पुशहरू, र म्यानुअल डिस्प्याच पछि कागजात स्वास्थ्य अवलोकन गर्दछ। यसको फिल्टरहरूले कागजातहरू, रूट मार्कडाउन, `llm.txt`, अनुवाद state/configuration र सान्दर्भिक i18n टूलिङलाई कभर गर्दछ। एकल `Published base documentation health` कार्यले होस्ट गरिएको Ubuntu र पाँच-मिनेट समय सीमा प्रयोग गर्दछ। यसले पढ्ने-मात्र प्रमाणीकरण गर्छ र निर्भरता स्थापना, अनुवाद वा राज्य अपनाउने बिना नैदानिक रसिद लेख्छ।

`scripts/i18n/check-base-health.mjs` शून्य स्रोत-ह्यास, छुटेको-लक्ष्य, लक्ष्य-ह्यास, बासी-अनुवाद र खण्ड-क्यास असंगतिहरू चाहिन्छ। यसले हालको कोर document/locale स्कोप र यसको रेकर्ड गरिएको प्रोभेन्सन्सलाई पनि प्रमाणित गर्दछ। अवैध सन्दर्भ, अपूर्ण कभरेज वा बाधा परीक्षकले `INCOMPLETE` उत्पादन गर्छ; पुष्टि गरिएको बहावले `FAIL` उत्पादन गर्दछ। दुबै असफल निकास स्थिति फर्काउँछन्। रसिद चेकआउट SHA, कार्यप्रवाह, रन र प्रयास गर्न बाध्य छ, र `i18n-base-health-<sha>-<run>-<attempt>` को रूपमा राखिएको छ।

यो प्रकाशित आधार को एक स्वतन्त्र अवलोकन हो। यसले PR वा मर्ज-समूह घटना, आवश्यक PR जाँच, एक npm उपनाम वा स्थिर-स्क्यान प्रोफाइल सदस्य थप्दैन। अन्तर्निहित परीक्षकले सबै पाँच कक्षाहरूलाई निरपेक्ष मोडमा रोक्छ। साधारण PR तयारी भर्नाबाट अलग रहन्छ। सफल अपलोडले असफल स्वास्थ्य परिणामलाई PASS मा बदल्न सक्दैन।

एक साधारण PR `--baseline-evidence` द्वारा उत्पन्न आधार रिपोर्टको साथ `--preflight` प्रयोग गर्दछ। पूर्ण अनुवाद रेकर्ड र वास्तविक लक्ष्य बाइटहरू त्यो सटीक आधारबाट अपरिवर्तित हुँदा मात्र यसले अंग्रेजी स्रोत पेन्डिङ छोड्न सक्छ। नयाँ लक्ष्य वा खण्ड-क्यास असंगतिहरू अझै पनि रोक्छन्, र अपूर्ण प्रमाणले तयारीलाई अधिकृत गर्न सक्दैन। रिपोर्टले `preparationPending` र `mergeReady` अलग-अलग उजागर गर्दछ: सफल तयारीले पेन्डिङ अनुवादहरूलाई मर्ज गर्न तयार गर्दैन। भर्ना हुनु अघि कम्पोज गरिएको उम्मेदवारमा प्रभावित मिररहरू ताजा गर्नुहोस्। विश्वसनीय Mergify लाम उम्मेद्वार, `merge_group`, शाखा पुशहरू र म्यानुअल CI रनहरूले `--warn` वा वंशानुगत-विफलता क्षमा बिना, निरपेक्ष जाँचकर्ता प्रयोग गर्दछ। हराएको लक्ष्य ह्यासहरू र मेटाइएका रेकर्ड कोर फाइलहरू द्वारा घटाइएको दायराले सफल निरपेक्ष निर्णय उत्पादन गर्न सक्दैन।

### PR द्रुत मार्ग (`quality.yml`) जारी गर्नुहोस्

`.github/workflows/quality.yml` main/release PRs मा CI पूरक बनाउँछ, `main` मा धकेल्छ, प्रेषण र समूहहरू मर्ज गर्दछ। PRs पथ-फिल्टर गरिएको द्रुत जाँचहरू प्रयोग गर्दछ। स्थायी रूपमा असक्षम डुप्लिकेट निर्माण हटाइयो; वास्तविक build/package/boot चेकहरू CI मा रहन्छ। एकाइ सुइट र vitest CI (`Unit Tests (N/8)` र `Vitest`) मा मात्र चल्छ।

| जागिर                                            | स्कोप                                                                                                                                                                                                             | अवरुद्ध गर्दै     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API कागजात refs र कागजात-सबै                                                                                                                                                                       | हो                |
| `Fast Quality Gates`                             | कोड PRs; स्थिर जाँच, टाइपचेक, ड्यासबोर्ड टाइपचेक, प्रभावित इकाई परीक्षणहरू                                                                                                                                        | हो                |
| `Forgotten sibling tests`                        | कोड PRs; स्थिर उपभोक्ताहरू र उम्मेदवार भाइबहिनी परीक्षणहरूमा ट्रेस गरिएका मोड्युलहरू परिवर्तन गरियो; ब्यारेल र डायनामिक-आयात पथहरू सल्लाहकार निदानको रूपमा रिपोर्ट गरिएको छ, सन्दर्भित अनुमति सूची अपवादहरूको साथ | **सल्लाहकार**     |
| `No new ESLint warnings`                         | कोड PRs; दमन-सचेत लिन्ट गार्ड                                                                                                                                                                                     | हो, फोर्कहरू सहित |
| `Merge integrity (changelog + generated skills)` | गैर-ड्राफ्ट PRs; changelog र उत्पन्न कौशल सिंक                                                                                                                                                                    | हो, फोर्कहरू सहित |

#### बिर्सिएको भाइबहिनी परीक्षण रिपोर्ट

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` को सल्लाहकार चरणको रूपमा चल्छ र परीक्षण-प्रभाव नक्सा पछाडि आयात समाधानकर्ता पुन: प्रयोग गर्दछ। प्रत्येक परिवर्तन गरिएको उत्पादन मोड्युलको लागि, यसले निर्धारक `changed module/symbol -> static consumer -> candidate sibling test` चेनहरू रिपोर्ट गर्दछ जब उम्मेद्वार परीक्षण पुल-अनुरोध भिन्नताबाट अनुपस्थित हुन्छ। मार्कडाउन सारांश र JSON नतिजा कुनै पनि अवरुद्ध रोलआउट अघि क्यालिब्रेसनको लागि `forgotten-sibling-tests` कार्यप्रवाह कलाकृतिको रूपमा राखिएको छ।

ब्यारेल पुन: निर्यात र गतिशील आयात मात्र संकल्प निदान हो; तिनीहरूले कहिल्यै अवरोध खोज सिर्जना गर्दैनन्। समीक्षा गरिएका अपवादहरू `config/quality/forgotten-sibling-allowlist.json` मा लाइभ छन्। प्रत्येक प्रविष्टिले उपभोक्ता र उम्मेद्वार परीक्षणको नाम दिनु पर्छ, एक विशिष्ट तर्क दिनुहोस्, र GitHub मुद्दा वा पुल अनुरोध लिङ्क गर्नुहोस्। विकृत प्रविष्टिहरू असफल बन्द। अपवादहरूले मेटाइएको उम्मेद्वार परीक्षण वा `.skip`/`.todo` थप्ने भिन्नतालाई दबाउन सक्दैन; दाबी कमजोर र अन्य मास्किङ स्वतन्त्र रूपमा अवरुद्ध `check:test-masking` गेटको स्वामित्वमा रहन्छ।

### कार्य: `lint`

`main` तर्फको प्रत्येक PR मा चल्छ। असफल भएमा merge रोक्छ।

| स्क्रिप्ट (`npm run ...`)         | प्रमाणीकरण गर्ने विषय                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | अवरोधक                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js को संस्करण समर्थित दायराभित्र छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हो                                          |
| `check:cycles`                    | सम्पूर्ण `src/` + `open-sse/` मा चक्रीय आयातहरू (AST-आधारित, tsconfig `paths` समाधान गरिएको)। कुनै पनि चक्र हुँदा प्रत्यक्ष रूपमा चलाइएको जाँचले 1 सहित अन्त्य गर्छ (#15281 देखि fail-closed) र SCC हरूको सूची देखाउँछ। `check:cycles:ratchet` (जुन CI ले चलाउँछ) ले गणना `quality-baseline.json` मा रहेको `metrics.cycles` सीमाभन्दा बढी हुँदा अवरुद्ध गर्छ — हाल 14, `direction: down`, त्यसैले यो घट्न मात्र सक्छ (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हो (र्याचेट)                                |
| `check:boundary`                  | `open-sse → src` युग्मन: इन्जिनबाट एपमा हुने अद्वितीय फाइल-देखि-फाइल आयातहरू (`scripts/quality/measure-boundary.mjs`; किनाराहरूको सूची v4 कोर/मोड्युल-विभाजन सुधारको बाँकी कार्यसूची हो)। प्रत्यक्ष रूपमा चलाइएको जाँच = परामर्शात्मक प्रतिवेदन (`quality:boundary` सरह)। `check:boundary:ratchet` (जुन CI ले चलाउँछ र `quality.yml` को fast-gates र्याचेट लूपमा पनि छ) ले गणना `quality-baseline.json` मा रहेको `metrics.boundaryOpenSseToSrc` सीमाभन्दा बढी हुँदा अवरुद्ध गर्छ — मापन गरिएको 771 बाट प्रारम्भ गरिएको, `direction: down`; `--update` ले यसलाई घटाउन मात्र सक्छ; PR हरूमा आधार-सापेक्ष (`--base-ref`, तल हेर्नुहोस्)                                                                                                                                                                                                                                                                                                                              | हो (र्याचेट)                                |
| `check:route-validation:t06`      | सबै रुटहरूमा Zod स्किमाहरू उपस्थित छन् (टियर 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` को सङ्ख्याले बजेट नाघ्दैन (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हो                                          |
| `check:provider-consistency`      | `providers.ts` मा भएका प्रत्येक प्रदायकको `providerRegistry.ts` मा मिल्दो प्रविष्टि छ (र उल्टो पनि, अनुमति सूचीभित्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हो                                          |
| `check:model-lifecycle`           | हातैले मर्मत गरिने तीनवटा राउटिङ तालिकाहरू चेक-इन गरिएको जीवनचक्र स्न्यापसट (#11503) सँग सुसङ्गत रहन्छन्: `FITNESS_TABLE` (`taskFitness.ts`) ले `REGISTRY` ले राउट गर्न सक्ने कुनै पनि निवृत्त id लाई स्कोर गर्दैन; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` मा उपस्थित र निवृत्त-id स्न्यापसटमा अनुपस्थित हुन्छ; `REGISTRY` मा अझै रहेका प्रत्येक निवृत्त id लाई फर्वार्ड गरिएको वा `allowedRetiredInCatalog` मा सूचीबद्ध गरिएको हुन्छ; र कुनै पनि `DEFAULT_DEGRADATION_MAP` स्रोत वा लक्ष्य उक्त स्न्यापसटमा निवृत्त देखिँदैन। यसले कुनै मोडेललाई हाल प्रत्यक्ष अपस्ट्रिमद्वारा सेवा दिइँदै छ भन्ने प्रमाणित गर्दैन। अफलाइन — `config/quality/model-lifecycle.json` सँग तुलना गर्छ, जसलाई `npm run quality:refresh-model-lifecycle` प्रयोग गरी हातैले ताजा गरिन्छ (नेटवर्क; CI मा जडान गरिएको छैन)। `allowedRetiredInCatalog` एक क्रमशः घटाइने र्याचेट हो: ट्र्याकिङ इस्युसहित मात्र प्रविष्टि थप्नुहोस्।                                                  | हो                                          |
| `check:fetch-targets`             | क्लाइन्ट-साइड `src/` मा भएको प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` मा रिजोल्भ हुन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | हो                                          |
| `check:deps`                      | रिपोजिटरीका प्रत्येक `package.json` मा रहेका सबै `npm install` गर्न सकिने निर्भरताहरू `dependency-allowlist.json` मा छन्; नयाँ अनपिन गरिएका वा slopsquatted प्याकेजहरू चिन्हित गरिन्छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हो                                          |
| `audit:deps`                      | पाँचवटै स्वतन्त्र लकफाइल (रुट, Electron, OpenCode plugins v1/v2 र प्रदायक) को npm अडिट। गम्भीर एडभाइजरीहरूले अवरोध गर्छन्; उच्च-स्तरका एडभाइजरीहरू देखिने चेतावनीका रूपमा रहन्छन्। छुटेका/असफल अडिटहरू INCOMPLETE हुन्छन् र अवरोध गर्छन्; प्रत्येक स्कोपका लक ह्यास र रिपोर्टहरू सुरक्षित राखिन्छन्।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                          |
| `check:lockfile`                  | `package-lock.json` को अखण्डता — https रजिस्ट्री, अखण्डता ह्यासहरू, होस्ट ओभरराइडहरू निषेध                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हो                                          |
| `check:licenses`                  | उत्पादन निर्भरताहरूका लागि SPDX इजाजतपत्र अनुमति-सूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हो                                          |
| `check:tracked-artifacts`         | कुनै बिल्ड आर्टिफ्याक्ट / कमिट गरिएका `node_modules` सिमलिङ्कहरू छैनन् (husky pre-commit मा पनि चल्छ; pre-push जानाजानी हल्का राखिएको छ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                          |
| `check:ai-attribution`            | PR कमिटहरू, शीर्षक वा मुख्य भागमा AI/bot `Co-Authored-By` ट्रेलर वा AI-उत्पादन फुटर निषेध — कठोर नियम #16 (`quality.yml` को PR→`release/**` का लागि fast-gates लूपमा — इभेन्ट पेलोड पढ्छ, PR बाहिर कुनै कार्य गर्दैन — र `ci.yml` lint मा PR→`main` का लागि PR-मात्र चरण; साथै husky `commit-msg` हुक; मानव सह-लेखकहरूलाई अनुमति छ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | प्रत्येक Vitest बहिष्करणले ट्र्याकिङ इस्यु उल्लेख गर्छ र `config/quality/vitest-exclusions.json` मा देखा पर्छ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                          |
| `check:file-size`                 | स्रोत फाइलहरू (`src/`, `open-sse/`, `electron/`, `bin/` मा रहेका `.ts`/`.tsx`) `cap` भित्र र परीक्षण फाइलहरू (`*.test.ts(x)`) `testCap` भित्र रहन्छन्; `file-size-baseline.json` मा स्थिर गरिएका फाइलहरू (`frozen` / `testFrozen`) तिनको अभिलिखित आकारभन्दा ठूला हुनु हुँदैन                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                          |
| `check:error-helper`              | executors/handlers मा त्रुटि प्रतिक्रियाहरूले `buildErrorBody()` / `sanitizeErrorMessage()` प्रयोग गर्छन् (कडा नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हो                                          |
| `check:migration-numbering`       | Migration SQL फाइलहरू क्रमिक रूपमा नम्बर गरिएका छन्, कुनै खाली क्रम वा दोहोरिएका नम्बर छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                          |
| `check:public-creds`              | `publicCreds.ts` बाहिर कुनै पनि प्रत्यक्ष OAuth `client_id`/`client_secret` वा Firebase Web कुञ्जीहरू छैनन् (कडा नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हो                                          |
| `check:db-rules`                  | `src/lib/db/` मोड्युलहरू बाहिर कुनै raw SQL छैन; `localDb.ts` बाट कुनै barrel-imports छैनन् (कडा नियमहरू #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                          |
| `check:known-symbols`             | आफ्ना dispatch tables मा दर्ता भएका provider executors, routing strategies, र translators डिस्कमा रहेका फाइलहरूसँग मेल खान्छन् — कुनै अनाथ वा घोषणा नगरिएका symbols छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हो                                          |
| `check:route-guard-membership`    | child process सुरु गर्ने प्रत्येक route लाई `isLocalOnlyPath()` द्वारा वर्गीकृत गरिएको छ (कडा नियमहरू #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | हो                                          |
| `check:test-discovery`            | repo मा रहेको प्रत्येक `*.test.ts` / `*.spec.ts` फाइल कम्तीमा एउटा test runner द्वारा सङ्कलित हुन्छ (ratchet: `test-discovery-baseline.json` मा रहेको orphan सूची घट्न मात्र सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                          |
| `check:test-tla-order`            | `tests/unit` अन्तर्गतको कुनै पनि `node:test` फाइलले test दर्ता गरेर top-level `await` सामना गरेपछि थप test दर्ता गर्दैन (#18045; ratchet: `test-tla-order-allowlist.json` घट्न मात्र सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हो                                          |
| `check:agent-skills-sync`         | उत्पन्न गरिएका agent-skills artifacts तिनको source catalog सँग मेल खान्छन् (कुनै drift छैन)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Provider का logos/assets सँग अभिलेख गरिएको provenance entry हुन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON config फाइलहरू parse हुन्छन् र repo का lint नियमहरू पूरा गर्छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | त्रुटिविनाको TypeScript compilation (सल्लाहात्मक चेतावनीहरू मात्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                          |
| `typecheck:noimplicit:core`       | कडा `noImplicitAny` — भविष्य-उन्मुख; पहिलेबाट रहेका धेरै call sites लाई अझै annotations आवश्यक छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **सल्लाहात्मक** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` मा सीमित `tsc` (#7033) — `typecheck:core` को सावधानीपूर्वक चयन गरिएको 27-फाइल allowlist मा कुनै पनि dashboard TSX समावेश छैन, र `next build` ले पनि यसलाई कहिल्यै type-check गर्दैन (`next.config.mjs` ले `ignoreBuildErrors: true` सेट गर्छ), त्यसैले त्यहाँका orphaned-identifier regression हरू (#6625/#6909) CI का लागि अदृश्य थिए। स्थिर गरिएको प्रति-फाइल/प्रति-TS-code गणना baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` कै जस्तो stale-enforcement ढाँचा) सँग diff गर्छ — baseline गरिएको गणनाभन्दा बाहिरका नयाँ त्रुटिहरूले मात्र gate असफल गराउँछन्; पहिलेबाट रहेको त्रुटि समाधान हुँदा `--update` प्रयोग गरी ratchet घटाउनुहोस्।                                                                                                                                                                                                                                                       | हो                                          |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) माथिको सम्पूर्ण app production type check, जसलाई `typecheck:core` को 27-file अनुमति-सूची र dashboard gate ले समेट्दैनन्। `config/quality/build-typecheck-baseline.json` सँग diff गरिन्छ; नयाँ वा बढेको प्रति-(file, code) गणनाले असफल गराउँछ, घटेको गणनाले तपाईंलाई यसलाई घटाउन अनुरोध गर्छ। रनमा नयाँ वा बढेको pair हुँदा `--update` अस्वीकार हुन्छ, जबसम्म `--force-regressions` पास गरिएको हुँदैन, र नयाँ रूपमा मौन गरिएको file पनि `--force-nocheck` पास नगरिएसम्म अस्वीकार हुन्छ; त्यसैले सफल परिणाम पाउन baseline फराकिलो बनाउनु र स्थायी मौनता प्रदान गर्नु दुई छुट्टाछुट्टै जानाजानी गरिने कार्य हुन्। खाली `--force` अस्वीकार गरिन्छ। `@ts-nocheck` प्रयोग गर्ने file ले कुनै पनि diagnostic रिपोर्ट नगर्ने भएकाले र अन्यथा प्रत्येक gate बाट अदृश्य हुने भएकाले, यसले build scope लाई `config/quality/ts-nocheck-baseline.json` विरुद्ध स्क्यान पनि गर्छ। | हो                                          |

#### दुई typecheck कार्यक्रमले फरक-फरक उत्तर दिन्छन्

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) र `check:build-typecheck` ले फरक विकल्पअन्तर्गत फरक
program compile गर्छन्, र एउटै file एउटा program मा त्रुटिरहित तथा अर्कोमा
त्रुटिले भरिएको हुन सक्छ।

`tsconfig.build.json` ले `"strict": false` सेट गर्छ, त्यसैले `noImplicitAny` बन्द
हुन्छ। core config ले कडा विकल्पसहित छनोट गरिएको 27-file अनुमति-सूची compile गर्छ
र प्रत्येक entry को import graph पछ्याउँछ, त्यसैले build program मा कहिल्यै नदेखिने
file हरू पनि त्यहाँ जाँचिन्छन्।

कुनै file typed छ कि छैन भन्ने मूल्याङ्कन गर्दा यसको परिणाम महत्त्वपूर्ण हुन्छ:
`check:build-typecheck` अन्तर्गत **शून्य diagnostics** हुनु भनेको **शून्य**
होइन। 26 वटा file बाट `@ts-nocheck` हटाउँदा build program मा तीमध्ये 23 वटा
त्रुटिरहित देखिए; तीमध्ये सोह्रवटाले strict program मा करिब 120 implicit-any
त्रुटि देखाए। कुनै file लाई clean भन्नुअघि दुवै जाँच गर्नुहोस्।

### Job: `quality-gate`

`test-coverage` पछि चल्छ। असफल भएमा merge रोक्छ।

| Script                       | प्रमाणीकरण                                                                                                                                                 | रोक्ने                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` उत्सर्जन गर्छ (ESLint चेतावनी गणना, merged shard report बाट coverage)                                                               | हो (ratchet भन्दा upstream) |
| `quality:ratchet`            | `quality-baseline.json` मा रहेको प्रत्येक metric मा regression भएको छैन (ESLint चेतावनी ≤ baseline; coverage ≥ baseline)                                   | हो                          |
| `check:duplication`          | Code duplication (jscpd@4) ले `quality-baseline.json` मा रहेको baseline नाघ्दैन                                                                            | हो                          |
| `check:complexity`           | फाइल-स्तरीय cyclomatic complexity ले cap नाघ्दैन (core ESLint `complexity` + `max-lines-per-function`)                                                     | हो                          |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — छुट्टै ESLint pass; CI ले दुवैलाई एउटै `check:complexity-ratchets` step का रूपमा merge गरी चलाउँछ | हो                          |
| `check:dead-code`            | प्रयोग नगरिएका exports / files को ratchet (knip) baseline को तुलनामा regress हुँदैन                                                                        | हो                          |
| `check:compression-budget`   | Compression benchmark budget — प्रति-engine token-savings का न्यूनतम सीमा regress हुनु हुँदैन                                                              | हो                          |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regress हुँदैन; यसले धेरै हदसम्म `typecheck:noimplicit:core` लाई समेट्छ                                            | हो                          |

### Jobs: `codeql-scan` र `codeql-admission`

`codeql-scan` ले configured analysis category सबै बनाउँछ। त्यो job सफल भएपछि `codeql-admission` ले त्यसकै ठ्याक्कै upload र candidate alert ratchet प्रमाणित गर्छ। दुवै `Gate / CI` का अनिवार्य dependency हुन्, docs मात्र बदल्ने candidate का लागि पनि। प्रशासनिक activation र canary आवश्यकता तल "CodeQL ratchet" मा वर्णित छन्।

| Script                 | के प्रमाणित गर्छ                                                                                                                                                           | रोक्ने |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:codeql-ratchet` | Alert ratchet अघि candidate ref/SHA र configured analysis category सबै हालका हुनुपर्छ; प्रमाण नहुँदा रोक्छ। Global inventory छुट्टै रहन्छ — तल "CodeQL ratchet" हेर्नुहोस् | हो     |

### Job: `quality-extended`

यो job ले लागू हुने candidates लाई रोक्छ। Bundle size, secret findings, vulnerability
findings, workflow findings र OpenAPI changes लाई आवश्यक ratchets मार्फत जाँचिन्छ।
Circular-dependency diagnostics भने advisory नै रहन्छन्। Scanner installation आवश्यक छ:
`scripts/ci/install-quality-scanners.sh` ले pinned versions provision गर्छ र
installation failures लाई propagate गर्छ। उपकरणहरू नभएमा, reports अमान्य भएमा वा baselines नभएमा
आवश्यक scanner gate INCOMPLETE रहन्छ।

| स्क्रिप्ट                | प्रमाणीकरण                                                                                                                                                                                                                 | अवरोध गर्ने                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | कुनै चक्रीय निर्भरता छैन (dpdm)                                                                                                                                                                                            | **सल्लाहात्मक**                                        |
| `check:bundle-size`      | बन्डलको आकार सीमाभन्दा बढी हुँदैन; मापन उपलब्ध नभएमा असफल हुन्छ                                                                                                                                                            | **--ratchet सँग अवरोध गर्ने**                          |
| `check:secrets`          | Gitleaks का निष्कर्षहरू प्रतिगमन हुँदैनन्; आवश्यक स्क्यानहरूले उपकरण/स्रोत/आधाररेखा नभएको, असफल स्क्यान र अमान्य रिपोर्टहरू अस्वीकार गर्छन्                                                                                | **--ratchet सँग अवरोध गर्ने**                          |
| `check:vuln-ratchet`     | निर्भरता कमजोरीहरू प्रतिगमन हुँदैनन्; आवश्यक स्क्यानहरूले उपकरण नभएको, अमान्य रिपोर्ट वा आधाररेखा नभएको अवस्था अस्वीकार गर्छन्                                                                                             | **--ratchet सँग अवरोध गर्ने**                          |
| `check:workflows`        | कार्यप्रवाह lint (actionlint + zizmor); स्क्यानर नभएको/बिग्रिएको, अमान्य रिपोर्ट वा ratchet आधाररेखा नभएको अवस्था INCOMPLETE का रूपमा असफल हुन्छ। मान्य निष्कर्षहरूले चयन गरिएको strict/advisory/ratchet नीति पालना गर्छन् | कार्यान्वयन आवश्यक; CI मा zizmor ratchet ले अवरोध गर्छ |
| `check:openapi-breaking` | पिन गरिएका event commit हरू विरुद्ध सार्वजनिक API अनुबन्ध (PR merge-base, push before, merge-group base; scheduled/manual checkout को first parent); आवश्यक मापन अनुपलब्ध भएमा असफल हुन्छ                                  | **--ratchet सँग अवरोध गर्ने**                          |

### काम: `docs-sync-strict`

`main` वा `release/**` मा पुल अनुरोधहरूको लागि, यो काम कागजात वा कोड परिवर्तनहरूको रूपमा वर्गीकृत गैर-ड्राफ्ट (वा विश्वसनीय लाम) उम्मेद्वारहरूको लागि मात्र चल्छ। यो गैर-PR CI घटनाहरूमा पनि चल्छ; यो कार्यप्रवाहको पुश ट्रिगरले `main` मात्र कभर गर्दछ, `release/**` होइन। गैर-शून्य बाहिर निस्कने एक कदमले कामलाई रोक्छ; रिपोर्ट-मात्र निष्कर्षहरू र तलका दस्तावेज छूटहरू छैनन्।

| स्क्रिप्ट                      | प्रमाणीकरण                                                                                                                                                                                                                                                                                                                                                                                         | अवरोध गर्ने                                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | तलका 7 वटा उप-गेटहरू क्रमिक रूपमा चलाउने मेटा-गेट                                                                                                                                                                                                                                                                                                                                                  | हो                                                                                                                     |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG संस्करण स्थिरता, सटीक `llm.txt` मिररहरू, अनुवादित CHANGELOG section/size अपरिवर्तनीय, र सुपरसेड डुप्लिकेट कागजातहरूको अनुपस्थिति                                                                                                                                                                                                                                         | हो                                                                                                                     |
| ↳ `check:docs-frontmatter`     | संकलित कागजात पृष्ठहरूमा मान्य फ्रन्टमेटर शीर्षकहरू छन्                                                                                                                                                                                                                                                                                                                                            | हो                                                                                                                     |
| ↳ `check:docs-counts`          | उच्च-विश्वास गणना अपरिवर्तनीयहरू कडा छन्; स्क्रिप्टले `--strict` प्राप्त नगरेसम्म heuristic फाइल-गणना जाँचहरूले मात्र चेतावनी दिन्छ ( CI मेटा-गेटले यसलाई पास गर्दैन)                                                                                                                                                                                                                              | कडा टियर अवरुद्ध; नरम स्तरीय सल्लाह                                                                                    |
| ↳ `check:env-doc-sync`         | स्रोत env पढ्छ, `.env.example`, र `docs/reference/ENVIRONMENT.md` स्पष्ट बेवास्ता, कागजात-मात्र, र env-मात्र अनुमति सूचीहरू पछि सहमत छन्।                                                                                                                                                                                                                                                          | हो, कागजात अनुमति सूची बाहिर                                                                                           |
| ↳ `check:deprecated-versions`  | बेवास्ता गरिएका कागजातहरू बाहेक सुरक्षित ऐतिहासिक सन्दर्भहरू र बासी अपडेट मितिहरू बाहिर सम्भावित बासी संस्करणहरू रिपोर्ट गर्दछ।                                                                                                                                                                                                                                                                    | हालको CI तारिङमा सल्लाहकार (`--strict` पास गरिएको छैन)                                                                 |
| ↳ `check:doc-links`            | कागजातहरूमा आन्तरिक मार्कडाउन लिङ्कहरू वास्तविक फाइलहरूमा समाधान गर्दछ (`[text]`/`(path)` फारम)                                                                                                                                                                                                                                                                                                    | हो                                                                                                                     |
| ↳ `check:fabricated-docs`      | मार्गहरू, env vars, CLI आदेशहरू, हुक नामहरू, र कागजातहरूमा उद्धृत फाइल मार्गहरू कोडबेसमा अवस्थित छन्। `--strict` मार्फत कडा गेट; झण्डा बिना सफ्ट-फेल।                                                                                                                                                                                                                                              | हो ( CI मा `--strict` मार्फत)                                                                                          |
| `check:cli-i18n`               | प्रयोग भएका CLI `t()` key हरू `en` मा छन्; `pt-BR` ले सबै माथिल्लो तहका खण्ड राख्छ; `zh-CN` र `zh-TW` मा `en` का सबै key हरू छन्                                                                                                                                                                                                                                                                   | हो                                                                                                                     |
| `check:openapi-coverage`       | OpenAPI specification ले वास्तविक route हरूको कम्तीमा ratchet गरिएको न्यूनतम सीमा समेट्छ                                                                                                                                                                                                                                                                                                           | हो                                                                                                                     |
| `check:openapi-security-tiers` | घोषित `x-loopback-only`/`x-always-protected` annotation लाई `routeGuard.ts` ले समर्थन गर्नुपर्छ; parser त्रुटि र अगाडितर्फको जाँचका असङ्गतिले रोक्छन्। local-only prefix अन्तर्गत हराएका `x-loopback-only` का लागि उल्टो जाँचले चेतावनी दिन्छ; pattern बाट मात्र परिभाषित route हरू यस उल्टो जाँचबाट बाहिर छन्।                                                                                    | Parser/अगाडितर्फका जाँचले रोक्छन्; उल्टो जाँच सल्लाहात्मक हो                                                           |
| `check:openapi-routes`         | औचित्यसहितको `KNOWN_STALE_SPEC` अनुमति सूची लागू गरेपछि `openapi.yaml` को प्रत्येक `/api...` path parameter को नाममा निर्भर नभई वास्तविक route सँग मिल्छ; अनुमति सूचीका पुराना entry ले पनि असफलता ल्याउँछन्                                                                                                                                                                                       | हो                                                                                                                     |
| `check:docs-symbols`           | मिरर नभएका आधिकारिक दस्तावेजका आन्तरिक `/api/...` URL सन्दर्भ वास्तविक route वा route परिवारसँग मिल्छन्; proxy/upstream/placeholder/फाइल सन्दर्भ र औचित्यसहितका `KNOWN_STALE_DOC_REFS` entry बाहिर राखिन्छन्, र अनुमति सूचीका पुराना entry ले असफलता ल्याउँछन्                                                                                                                                     | हो                                                                                                                     |
| `i18n translation drift`       | पूर्ण प्रवेशको लागि शून्य स्रोत, छुटेको लक्ष्य, लक्ष्य-ह्यास, बासी-अनुवाद र खण्ड-क्यास असंगतिहरू आवश्यक पर्दछ। साधारण PR तयारीले सही वंशानुगत प्रमाण वा अपरिवर्तित पूर्ण अवस्था र लक्ष्य बाइट्सको साथ अङ्ग्रेजी-मात्र पेन्डिङ परिवर्तन राख्न सक्छ; यसको प्रतिवेदनले छुट्टै मर्जरको तयारीको घोषणा गर्दछ। हराएको लक्ष्य ह्यास र अपूर्ण आधार प्रमाण ब्लक। एक अनुपस्थित लिगेसी खण्ड क्यास विफलता होइन। | सबै पाँच कक्षाहरू queue/base प्रवेश रोक्छन्; साधारण तयारी अनुमति मात्र वंशानुगत वा अंग्रेजी-मात्र पेन्डिङ काम प्रमाणित |

`docs/diagrams/` अन्तर्गत बाह्र README SVGs उत्पन्न हुन्छन् (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ती सबैलाई पुन: उत्पन्न गर्दछ)। प्रत्येकसँग बाइट-तुलना एकाइ परीक्षण (`tests/unit/docs/readme-*-svg.test.ts`, कार्य `test-unit`) हुन्छ जुन प्रतिबद्ध फाइल बासी हुँदा असफल हुन्छ, र `check:docs-counts` तिनीहरूको `<text>` नोडहरू — बाट क्यानोनिकल नम्बरहरू पढ्छ जसको कारणले गर्दा रूपरेखा चरणले फाइलमा प्रत्येक रूपरेखा स्ट्रिङलाई अदृश्य `<text>` रूपमा राख्छ। SVG क्यानोनिकल-नम्बरहरूको जाँचले `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) मा सूचीबद्ध फाइलहरू पढ्छ: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, प्लस `public/images/tier-flow-dark.svg` र `tier-flow-light.svg`; नि: शुल्क-सदाका लागि, क्याटलग-प्रविष्टि, पुनरावर्ती-पूल र स्कोरिङ-कारक दावीहरू पनि `promise-pillars.svg`, `free-tier-budget.svg` र `strategies-grid.svg` पढ्छन्। `free-tier-budget.svg` लाइभ क्याटलग लोडरबाट यसको तथ्याङ्कहरू कोर्छ, त्यसैले `FREE_MODEL_BUDGETS` वा प्रदायकको प्रदर्शन नाममा परिवर्तन गर्दा त्यो फाइल पुन: उत्पन्न नभएसम्म CI रातो हुन्छ।

### Job: `i18n-ui-coverage`

| स्क्रिप्ट                         | प्रमाणीकरण                                                                                                                                                                            | अवरोधक     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुञ्जी कभरेज ≥ 65% छ                                                                                                                                                          | हो         |
| `check-ui-value-drift` (इनलाइन)   | पुनर्लेखित अङ्ग्रेजी **मान** ले कुनै पुरानो अनुवाद बाँकी छोड्दैन                                                                                                                      | हो         |
| `check-new-key-coverage` (इनलाइन) | एउटा **नयाँ** अङ्ग्रेजी कुञ्जी प्रत्येक लोकेलमा अनुवाद गरिएको छ — `__MISSING__:` मार्कर अस्वीकार गरिन्छ                                                                               | हो         |
| `check-translation-ratio`         | प्रत्येक लोकेलको वास्तविक-अनुवाद अनुपात (अङ्ग्रेजीसँग समान / प्लेसहोल्डर / अनुमति-सूचीबाहिर छुटेका मानहरू) `config/quality/i18n-translation-baseline.json` + छुटभन्दा बढी हुनु हुँदैन | **अवरोधक** |

`fetch-depth: 0` आवश्यक हुन्छ — मान-ड्रिफ्ट गेटले `en.json` लाई मर्ज बेससँग तुलना गर्छ।

#### `check-ui-value-drift` — पुरानो-अनुवाद गेट

अन्य गेटहरूले संरचनात्मक रूपमा देख्न नसक्ने एउटै i18n रिग्रेसन यसले समात्छ: एउटा अङ्ग्रेजी मान
पुनर्लेखन गरिन्छ र _अघिल्लो_ अङ्ग्रेजीबाट बनाइएका अनुवादहरू यथावत् रहन्छन्, जसका कारण
गैर-अङ्ग्रेजी प्रयोगकर्ताहरूले आत्मविश्वासपूर्ण शैलीमा लेखिएको, तर अहिले गलत भइसकेको पाठ पढिरहन्छन्।

यो वास्तवमै रिलिज भएको थियो। Antigravity लगइन हेल्पर थपिँदा (#5203)
`oauthModal.googleOAuthWarning` पुनर्लेखन गरिएको थियो; **43 मध्ये 39 लोकेलहरूमा** अपरेटरहरूलाई "सम्पूर्ण
URL प्रतिलिपि गरेर तल टाँस्नुहोस्" भन्ने पाठ यथावत् रह्यो — त्यो प्रदायकका लागि पूरा हुनै नसक्ने प्रवाह।
यो #8463 सम्म थाहा भएन, किनभने:

- `sync-ui-keys` ले **अनुपस्थित** कुञ्जीहरू मात्र ब्याकफिल गर्छ, **पुराना** कुञ्जीहरू कहिल्यै गर्दैन;
- `check-ui-keys-coverage` ले कुञ्जीको _उपस्थिति_ गणना गर्छ, त्यसैले पुरानो अनुवादलाई पनि समेटिएको मानिन्छ;
- `check-translation-drift` ले `docs/i18n/<locale>/**.md` दस्तावेजीकरण मिररहरू ट्र्याक गर्छ —
  यसले `src/i18n/messages/*.json` कहिल्यै पढ्दैन। 2026-09 पुनः-सिङ्कदेखि job `docs-sync-strict` मा अवरोधक:
  मुख्य दस्तावेज सम्पादन गर्नुहोस् → `npm run i18n:run -- --files=<doc>` (खण्ड-स्तरीय, सस्तो)।

**डिफ-सचेत, बेसलाइनमा आधारित होइन।** यसले मर्ज बेसमा रहेको `en.json` लाई कार्यरत
ट्रीसँग तुलना गर्छ; अङ्ग्रेजी मान परिवर्तन भएको प्रत्येक कुञ्जीका लागि, कुनै लोकेलमा नछोइएको
अनुवाद अझै बाँकी छ भने त्यो पुरानो हो। यसले जानाजानी **पहिलेदेखिको ऋणलाई स्थिर राख्छ** — एउटा डिफले
लामो समयदेखि रहेको अनुवाद कुन पुरानो अङ्ग्रेजीबाट आएको हो भन्ने देखाउन सक्दैन, त्यसैले गेटले
हालको परिवर्तनले छोएका कुराहरूलाई मात्र मूल्याङ्कन गर्छ। यसको विकल्प (प्रति-कुञ्जी ह्यास बेसलाइन) का लागि
करिब 600 KB को उत्पन्न फाइल चाहिन्थ्यो, जुन सबैभन्दा ठूलो विद्यमान बेसलाइनभन्दा 3× ठूलो हुन्थ्यो र प्रत्येक i18n PR मा परिवर्तन भइरहन्थ्यो।

यसलाई पूरा गर्ने दुई तरिका छन्:

1. प्रभावित अनुवादहरू अद्यावधिक गर्नुहोस्, वा
2. तिनलाई `__MISSING__:<new english>` मा सेट गर्नुहोस् — त्यसपछि रनटाइमले सच्याइएको अङ्ग्रेजी
   (`src/i18n/request.ts::deepMergeFallback`, #7258) उपलब्ध गराउँछ र कुञ्जीलाई अनुवादका लागि लाममा राखिन्छ।

यदि स्ट्रिङको **अर्थ** परिवर्तन भएको छ भने, **कुञ्जीको नाम परिवर्तन गर्नुलाई** प्राथमिकता दिनुहोस्: नयाँ कुञ्जीले
पुरानो अनुवाद इनहेरिट गर्न सक्दैन। #8463 ले यही ढाँचा प्रयोग गरेको थियो।

```bash
npm run i18n:check-value-drift          # कडा (CI ले चलाउने)
npm run i18n:check-value-drift:warn     # रिपोर्ट मात्र
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

मान-परिवर्तन र नयाँ-कुञ्जी गेटहरूले
`scripts/i18n/resolve-ui-diff-base.mjs` बाट एउटै अपरिवर्तनीय तुलना साझा गर्छन्। कार्यप्रवाहले दुवै जाँचमा एउटै आधार, आधार-टिप र
उम्मेदवार SHA हरू पठाउँछ। PR/आधार-पुनर्लक्ष्यीकरण, push र merge-group रनहरूले तिनको घटना
सन्दर्भ प्रयोग गर्छन्। उम्मेदवार शाखा डिस्प्याच गर्न त्यसको ठ्याक्कै खुला PR वा स्पष्ट
`i18n_base_sha` इनपुट आवश्यक हुन्छ। त्यो इनपुटविना `main` वा `release/vX.Y.Z` को
डिस्प्याच वा निर्धारित अवलोकनले अन्तिम कमिटलाई त्यसको पहिलो प्यारेन्टसँग तुलना गर्छ; यो
वंशानुगत सबै अनुवाद ऋणको अडिट होइन। स्थानीय आह्वानका लागि स्पष्ट तुलना आधार आवश्यक हुन्छ,
उदाहरणका लागि माथिको `BASE_REF` कमान्ड।

हराएको वा अस्पष्ट तुलना सन्दर्भ, पढ्न नसकिने वा अमान्य आवश्यक क्याटलग, र
परिवर्तित उम्मेदवारले warn मोडमा समेत निकास कोड **2** सहित `INCOMPLETE` उत्पन्न गर्छन्।
क्याटलग पढ्न `scripts/i18n/read-ui-catalog.mjs` प्रयोग गरिन्छ; पढ्ने क्रममा भएका विफलताहरूलाई
खाली अब्जेक्टहरूले प्रतिस्थापन गरिँदैन। अनुपलब्ध आधार वा अपूर्ण इनपुटमध्ये कुनैले पनि PASS स्थापित गर्दैन।

### Job: `i18n`

पूर्ण i18n प्रमाणीकरण म्याट्रिक्स (प्रत्येक लोकेलका लागि एउटा job)। सम्पूर्ण job सल्लाहात्मक हो।

| स्क्रिप्ट                       | प्रमाणीकरण गर्ने कुरा        | ब्लकिङ                                                      |
| ------------------------------- | ---------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | प्रति लोकेल अनुवादको पूर्णता | **सल्लाहात्मक** (सम्पूर्ण job मा `continue-on-error: true`) |

### Job: `pr-test-policy`

pull request हरूमा मात्र चल्छ।

| स्क्रिप्ट              | प्रमाणीकरण गर्ने कुरा                                                                                                                                     | ब्लकिङ |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, वा `bin/` मा उत्पादन कोड परिवर्तन गर्ने PR हरूले परीक्षणहरू समावेश वा अद्यावधिक गर्नुपर्छ (कडा नियम #8)                 | हो     |
| `check:test-masking`   | परिवर्तन गरिएका परीक्षण फाइलहरूले कुल assert सङ्ख्या घटाउँदैनन् वा `assert.ok(true)` जस्ता स्वतःसिद्ध कथनहरू थप्दैनन्                                     | हो     |
| `check:pr-evidence`    | PR को मुख्य भागले परिवर्तनका लागि परीक्षण/VPS प्रमाण उद्धृत गर्छ (PR को गद्यमा grep गरेर कडा नियम #18 लाई यान्त्रिकीकरण गर्छ — नाजुक, Backlog हेर्नुहोस्) | हो     |

### कार्य: `test-vitest`

`changes` वर्गीकरण कार्य आवश्यक हुन्छ। लागू हुने म्याट्रिक्स शार्डहरू असफल भएमा मर्ज रोकिन्छ।

| सुइट             | प्रमाणीकरण गर्छ                                         | अवरोधक                                                                                                              |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्भर (110 उपकरणहरू), autoCombo, क्यास — vitest रनर | हो                                                                                                                  |
| `test:vitest:ui` | UI कम्पोनेन्ट परीक्षणहरू — vitest रनर                   | **अवरोधक** — पहिलेदेखिका विफलताहरू `vitest.config.ts` मा स्पष्ट रूपमा बहिष्कृत छन्; नयाँ विफलताले कार्य विफल बनाउँछ |

### रात्रिकालीन workflows (तालिकाबद्ध, सल्लाहात्मक)

यी cron तालिकामा (र `workflow_dispatch` बाट) चल्छन्, PR हरूमा कहिल्यै चल्दैनन्। सबै सल्लाहात्मक हुन्।

| कार्यप्रवाह            | प्रमाणीकरण गर्ने विषयहरू                                                                                                                                                                     | अवरोधक           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | अनियमित सिड र उच्च रन सङ्ख्यासहितका fast-check प्रोपर्टी परीक्षणहरू                                                                                                                          | **परामर्शात्मक** |
| `nightly-resilience`   | हिप-वृद्धि गेट, केओस फल्ट-इन्जेक्सन, k6 लोड/सोक परीक्षण                                                                                                                                      | **परामर्शात्मक** |
| `nightly-llm-security` | promptfoo इन्जेक्सन गार्ड (ब्लक मोड) + garak प्रोबहरू (प्रदायकको गोप्य मान उपलब्ध नभए छाडिन्छ)                                                                                               | **परामर्शात्मक** |
| `nightly-schemathesis` | `docs/openapi.yaml` प्रयोग गरी सञ्चालनमा रहेको OmniRoute विरुद्ध OpenAPI कन्ट्र्याक्ट फजिङ (schemathesis) — स्पेसिफिकेसन उल्लङ्घनहरू / ह्यान्डल नगरिएका 500 त्रुटिहरू उजागर गर्छ (चरण 8 B.4) | **परामर्शात्मक** |
| `nightly-mutation`     | द्रुत युनिट लेनमा Stryker म्युटेसन-परीक्षण स्कोर — बाँकी रहेका म्युटेन्टहरूले कमजोर एसर्टहरू उजागर गर्छन्                                                                                    | **परामर्शात्मक** |
| `nightly-compat`       | समर्थित `engines.node` दायराहरूमा Node इन्जिन अनुकूलता म्याट्रिक्स                                                                                                                           | **परामर्शात्मक** |

कार्यसम्पादन आधाररेखाहरू (हिप, TTFB, बिल्ड समय) रेकर्ड गरिन्छन्, गेट गरिँदैनन्: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) हेर्नुहोस्।

---

## गति चरण (2026-08-30 → v4.0 LTS): प्रत्येक आधाररेखा 20% ले खुकुलो पारियो

स्वामित्वकर्ताको निर्णय (2026-08-30): v4.0 मोड्युलराइजेसनसम्म, प्राविधिक ऋणको सीमा कायम राख्नुभन्दा
रिलिज गर्ने गति बढी महत्त्वपूर्ण छ। प्रत्येक **सङ्ख्यात्मक** र्याचेट आधाररेखालाई एउटै
लेखापरीक्षणयोग्य प्रक्रियामा 20% ले खुकुलो पारियो, र चरणलाई `config/quality/quality-baseline.json` मा घोषणा गरिएको छ:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| के परिवर्तन भयो                                                                                                                                                                                           | कहाँ                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — कम हुनु राम्रो हुने गणना ×1.2, बढी हुनु राम्रो हुने प्रतिशत ÷1.2 (कभरेजको न्यूनतम सीमा 60 नै राखियो, `eslintErrors` 0 मै रहन्छ, `eslintWarnings` 0 → फ्रिज गरिएको सप्रेसन गणनाको 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` टिप्पणीमा परिवर्तनअघिको प्रत्येक मान → परिवर्तनपछिको मान सूचीबद्ध छ) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                                    |
| `cap`, `testCap`, प्रत्येक `frozen[*]` / `testFrozen[*]` लाइन सीमा ×1.2                                                                                                                                   | `file-size-baseline.json`                                                                                                  |
| प्रति-फाइल / प्रति-TS-कोड गणना ×1.2                                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`                     |
| `THRESHOLD` 36 → 30                                                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                                                 |
| `_policy.requireTighten === false` हुँदा `--require-tighten` परामर्शात्मक हुन्छ                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                                                |
| रात्रिकालीन `bank-ratchet-shrinks` रोकिएको छ (यसले मापन गरिएको घटाइलाई सञ्चित गरेर अतिरिक्त क्षमतालाई उल्ट्याउने थियो)                                                                                    | `.github/workflows/nightly-release-green.yml`                                                                              |

अनुमति सूचीहरू (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **बजेट होइनन्** र तिनलाई छोइएको छैन। पास/फेल नीति गेटहरू (गोप्य जानकारी, SQL नियमहरू,
कागजात/env अनुबन्ध, i18n समानता, युनिट परीक्षणहरू) अपरिवर्तित छन् — रातो परीक्षण अझै पनि रातो परीक्षण नै हो।

**उपकरणहरू**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — एकपटक मात्र गरिने
  खुकुलोपन (`scripts/quality/relax-baselines.mjs`); एउटै टिप्पणीका साथ दोस्रो पटक चल्न अस्वीकार गर्छ।
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI ले गरेकै तरिकाले प्रत्येक सङ्ख्यात्मक गेट मापन गर्छ र प्रति गेट बाँकी अतिरिक्त क्षमता देखाउँछ
  (`scripts/quality/baseline-headroom.mjs`)। रात्रिकालीन `baseline-headroom` कार्यले
  कार्यप्रवाह रनको सारांशमा तालिका प्रकाशित गर्छ र यसको JSON/Markdown प्रतिवेदनलाई
  `baseline-headroom-<run_id>` का रूपमा अपलोड गर्छ, जुन 90 दिनसम्म राखिन्छ। चेतावनी र गम्भीर अवस्थाका पङ्क्तिहरूले
  आफ्नो अधिकतम सीमाको 10% भित्र रहेका वा त्यसलाई पहिल्यै नाघिसकेका गेटहरू पहिचान गर्छन्। बजेट खपत भइरहेको
  प्रारम्भिक चेतावनीका रूपमा यी प्रतिवेदनहरू समीक्षा गर्नुहोस्; समस्या भएको गेटका `_rebaseline_*` टिप्पणीहरू निरीक्षण गर्नुहोस्। यो कार्यले अब
  स्थायी मुद्दा सिर्जना वा अद्यावधिक गर्दैन; #12149 ले पहिलेको प्रतिवेदन इतिहास सुरक्षित राख्छ।

**नयाँ-कोड मोड (Clean-as-You-Code) — 2026-08-30 देखि, PR द्रुत-मार्गमा मात्र**

`pull_request` घटनाहरूमा `quality.yml` ले `check:file-size`,
`check:complexity-ratchets` र `check:dead-code` लाई `--base-ref <PR base SHA>` पठाउँछ। `check:complexity-ratchets` र
`check:dead-code` का लागि गेटले HEAD लाई मर्ज-बेससँग **PR ले छोएका फाइलहरूमा मात्र सीमित गरेर**
तुलना गर्छ (`scripts/check/newCodeMode.mjs`: मर्ज-बेसलाई अस्थायी
`git worktree` मा मूर्त रूप दिइन्छ, त्यहाँ र HEAD मा ESLint/knip चलाइन्छ, अनि प्रति-फाइल गणनाहरूको भिन्नता निकालिन्छ):

- **अवरोधक** — PR ले परिवर्तन गरेका फाइलहरूमा साइक्लोमेटिक/कग्निटिभ उल्लङ्घनहरू वा डेड एक्सपोर्टहरू थप्यो
  (लगमा `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **परामर्शात्मक** — विश्वव्यापी कुल बनाम स्थिर गरिएको आधाररेखा। वंशानुगत विचलनले निर्दोष
  PR लाई कहिल्यै रातो बनाउँदैन; विचलनलाई रिलीज मिलानका बेला सुधार गर्न ट्र्याक गरिन्छ र
  हेडरुम कार्यद्वारा निगरानी गरिन्छ।

`check:file-size` ले आधार सन्दर्भलाई आफ्नै नियमअनुसार प्रयोग गर्छ (`scripts/check/check-file-size.mjs`, #8522):
यसले ट्रीमा भएका प्रत्येक स्रोत र परीक्षण फाइल जाँच्छ, `git show` मार्फत PR आधारमा प्रत्येकको लाइन सङ्ख्या पढ्छ,
र कुनै फाइल यसको आधाररेखा उच्चतम सीमा
(`frozen` / `testFrozen`, वा आधाररेखाबाहिरको फाइलका लागि `cap` / `testCap`) र यसको आधार आकारमध्ये ठूलो मानभन्दा
बढ्दा मात्र असफल गराउँछ। त्यसैले आधारमै पहिल्यै विचलित भएको फाइलले निर्दोष PR लाई कहिल्यै रातो बनाउँदैन।

`check:boundary:ratchet` ले आफ्नो एकल सङ्ख्यामा पनि यही नियम लागू गर्छ
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR घटनाहरूमा
`quality.yml` का द्रुत गेटहरू र `ci.yml` को lint job दुवैले PR को base SHA पठाउँछन्, base commit लाई
`git archive` export बाट मापन गरिन्छ, र PR को `open-sse → src` edge
गणना `metrics.boundaryOpenSseToSrc` र base मा रहेको गणनामध्ये ठूलोभन्दा बढी हुँदा मात्र PR असफल हुन्छ। ceiling
भन्दा माथिको base drift रिपोर्ट गरिन्छ (`base drift herdado`), तर यसले निर्दोष PR लाई कहिल्यै असफल बनाउँदैन; push → main
ले निरपेक्ष ceiling कायम राख्छ, र समाधान गर्न नसकिने base SHA चेतावनीसहित त्यसैमा fallback हुन्छ।

`workflow_dispatch` run हरू, release-green sweep र nightly headroom job सँग PR base हुँदैन
र तिनले निरपेक्ष (global) तुलना कायम राख्छन्। Coverage, duplication र type-coverage हाललाई global नै
रहन्छन् (तिनका tools ले कम लागतमा per-file diff उत्पादन गर्दैनन्) — यिनमा पनि यही व्यवहार लागू गर्न सकिन्छ।

**v4.0 मा phase बन्द गर्ने प्रक्रिया (LTS = पहिलेभन्दा कडा, "फेरि सामान्य अवस्थामा" होइन)**

1. शुद्ध `release/v4.0.0` tip मा: अभिलेखका लागि `npm run quality:headroom --json`, त्यसपछि
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, प्रत्येक typecheck gate को
   `--update` — हरेक baseline मापन गरिएको मानसम्म घट्छ।
2. `quality-baseline.json` बाट `_policy` मेटाउनुहोस् (`--require-tighten` र nightly
   banking पुनः सक्रिय हुन्छन्), `check-openapi-coverage.mjs` मा `THRESHOLD = 36` (वा सोभन्दा बढी) पुनर्स्थापना गर्नुहोस्।
3. modularization बाट लाभ भएका ठाउँमा मापन गरिएको मानभन्दा पनि कडा बनाउनुहोस्: file-size `cap` लाई फेरि 1000
   (वा 800), coverage floors लाई +5, र modularized packages का लागि dead exports लाई 0 बनाउनुहोस्।

## र्याचेट आधाररेखा (`quality-baseline.json`)

र्याचेट इन्जिन (`scripts/quality/check-quality-ratchet.mjs`) ले `quality-baseline.json`
पढ्छ र त्यसलाई भर्खरै सङ्कलन गरिएको `quality-metrics.json` सँग तुलना गर्छ। आफ्नो इप्सिलनभन्दा
बढी पछाडि गएको कुनै पनि मेट्रिकले बिल्ड असफल गराउँछ।

हाल ट्र्याक गरिएका मेट्रिकहरू:

| मेट्रिक               | दिशा   | अर्थ                                  |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | ESLint चेतावनीको सङ्ख्या बढ्नु हुँदैन |
| `coverage.statements` | `up`   | स्टेटमेन्ट कभरेज घट्नु हुँदैन         |
| `coverage.lines`      | `up`   | लाइन कभरेज घट्नु हुँदैन               |
| `coverage.functions`  | `up`   | फङ्सन कभरेज घट्नु हुँदैन              |
| `coverage.branches`   | `up`   | ब्रान्च कभरेज घट्नु हुँदैन            |

वास्तविक सुधारपछि आधाररेखा अद्यावधिक गर्न:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` फ्ल्यागले हाल मापन गरिएका मानहरू `quality-baseline.json` मा लेख्छ।
मेट्रिक सुधार गर्ने परिवर्तनसँगै यो फाइल कमिट गर्नुहोस्। मेट्रिक सुधार गर्ने तर
आधाररेखा अद्यावधिक नगर्ने PR लाई `--require-tighten` ले समात्नेछ (चरण 6A.5,
कार्यान्वयन हुन बाँकी)।

### CodeQL र्याचेट: उम्मेद्वार प्रवेश र भण्डार सूची

CI स्पष्ट निर्भरता श्रृंखला मार्फत उम्मेद्वार CodeQL भर्नाको स्वामित्व लिन्छ: `codeql-scan` `codeql.yml` मा चार-भाषा म्याट्रिक्सलाई कल गर्छ, त्यसपछि `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` चलाउँछ। `Gate / CI` दुबै नतिजा चाहिन्छ। गुणस्तरले यसको आफ्नै संख्यात्मक जाँचहरू राख्छ तर निर्माता समाप्त हुनु अघि स्क्यानरलाई क्वेरी गर्दैन; `Gate / Quality` मात्र पूर्ण उम्मेदवार भर्ना होइन। CodeQL कागजात-मात्र उम्मेद्वारहरूमा आवश्यक रहन्छ।

`config/quality/codeql-admission-policy.json` मा नीतिले कार्यहरू, C/C++, JavaScript/TypeScript र पाइथन, क्वेरी सुइट डिफल्ट, रिमोट खतरा मोडेल र निर्माण मोड कुनै पनि चयन गर्दैन। निर्माता preflight ले एक पेन्डिङ सक्रियता रेकर्ड अस्वीकार गर्दछ र स्पष्ट लक्ष्य सूची बाहिर शाखाहरू। हालका लक्ष्यहरू मुख्य हुन् र release/v3.8.54. अनुबंध परीक्षणहरूले यो सीमित सूची र मर्मत पुश ट्रिगरलाई प्याकेज संस्करणसँग तुलना गर्दछ; अर्को रिलीजलाई अनबोर्डिङको समीक्षा गर्न आवश्यक छ। CI को अवस्थित फराकिलो रिलीज PR ट्रिगर कायम राखिएको छ, तर एक अनबोर्ड गरिएको लक्ष्यले मापन नगरिएको PASS प्राप्त गर्नु भन्दा निकासी अघि HOLD रिपोर्ट गर्दछ।

प्रत्येक म्याट्रिक्स कार्यले यसको वास्तविक SARIF अपलोड ID, भाषा, कोटी, रन र प्रयास, कलर कार्यप्रवाह पहिचान, घटना ref/head/base/merge SHA र नीति ह्यास रेकर्ड गर्दछ। आश्रित कामले यस रनको रसिदहरू मात्र डाउनलोड गर्छ र कलाकृति डाइजेस्टहरू प्रमाणित गर्दछ। यसलाई सबै चार कोटिहरू, एक सफल निर्माता र प्रत्येक सटीक अपलोडको पूरा प्रशोधन आवश्यक छ। यसले API को sarif_id फिल्टर प्रयोग गर्दछ, शाखामा फेला परेको पछिल्लो विश्लेषण होइन। आंशिक पुनरुत्थानले समान रन र उम्मेद्वारको अघिल्लो प्रयासबाट सफल कोटीहरू पुन: प्रयोग गर्न सक्छ, उत्पादन गर्ने प्रयासलाई सुरक्षित राख्दै; असफल वर्तमान उत्पादकले अघिल्लो हरियो प्रमाण पुन: प्रयोग गर्न सक्दैन।

CodeQL कार्य प्रक्रियाको लागि पर्खन्छ, तर यसको पिन गरिएको कार्यान्वयनले स्थिति-पढ्न असफलता वा थकित पर्खाइ पछि चेतावनी दिन र जारी राख्न सक्छ। प्रवेश यसैले पुन: प्रशोधन प्रमाणित गर्दछ। छुटेका कोटिहरू, पेन्डिङ प्रोसेसिङ, असफल वा रद्द गरिएका कामहरू, बासी पहिचान, अपूर्ण पृष्ठांकन वा अनुपलब्ध APIs HOLD उत्पादन गर्छ र 2 बाहिर निस्कन्छ। स्वतन्त्र स्क्यानर कार्यप्रवाहको लागि कुनै निश्चित प्रतीक्षा बाँकी छैन। एक स्क्यान नगरिएको PR पास हुन सक्दैन किनभने चेतावनी क्वेरी 0 फर्कियो। `metrics.codeqlAlerts.value` माथिको मापन गणना 1 बाहिर निस्कन्छ; आधार रेखा अर्को शाखाको अलर्टहरू अवशोषित गर्न उठाइएको छैन। [स्थिति र विश्लेषण लुकअप अपलोड गर्नुहोस्](https://docs.github.com/en/rest/code-scanning/code-scanning) ।

रसिदले IDs, कोटीहरू, उपकरण संस्करणहरू, ref/SHA, आधार रेखा र अलर्ट नम्बरहरू अपलोड र विश्लेषण गर्दछ। SARIF identity/result गणना, न्यूनतम नियम गणनाहरू र सटीक चेतावनी उदाहरणहरू अनिवार्य रहन्छन्। PR/analysis पहिचान स्वीकार गर्नु अघि पुन: जाँच गरिन्छ। यी जाँचहरूले कन्फिगर गरिएको श्रेणी कभरेज स्थापना गर्दछ, प्रत्येक निकालिएको स्रोत फाइलको सूची होइन। C/C++ नो-बिल्ड एक्स्ट्र्याक्सनले परियोजना निर्माण गर्दा उत्पन्न भएको कोड समावेश गर्दैन। स्रोत बहिष्करणहरूलाई अझै पनि समीक्षाको आवश्यकता छ, र योगदानकर्ता एट्रिब्युसनलाई तुलनात्मक सटीक-आधार प्रमाण चाहिन्छ।

`codeql-maintenance.yml` PR/main उत्पादकहरूको नक्कल नगरी सक्रिय-रिलीज पुश स्क्यान र साप्ताहिक तालिका आपूर्ति गर्दछ। `nightly-codeql-inventory.yml` रिपोजिटरी-वाइड बेसलाइनलाई `--strict-measurement` र मापन अनुपलब्ध हुँदा असफलताको साथ अलग राख्छ। स्थानीय लिगेसी कलेक्टरको आकर्षक स्किप उम्मेदवार प्रवेश होइन। प्रमाणित कम विश्वव्यापी गणना पछि कडाई एक स्पष्ट `--update` रहन्छ।

पूर्वनिर्धारित सेटअप कन्फिगर हुँदा उन्नत कार्यप्रवाह प्रकाशित हुनु हुँदैन: GitHub त्यो संयोजन अस्वीकार गर्दछ। समीक्षा गरिएको प्रशासनिक संक्रमण फिर्ता नपढेसम्म यसको संस्करण नीति पेन्डिङ रहन्छ। प्रकाशन अघि, एक अपरेटर पिन भण्डार, head/base/tree, policy/patch/rollback ह्यास र अवलोकन सेटअप स्थिति; `node scripts/quality/codeql-producer.mjs verify-admin-readback` आपूर्ति गरिएको अपेक्षित र वास्तविक JSON रेकर्डहरू जाँच गर्दछ। यो प्राविधिक गार्ड हो, अपरेटरको स्वीकृति वा ताजा रिडब्याकहरू ल्याउनको लागि प्रतिस्थापन होइन। PR टोकनले कहिले पनि प्रशासन पहुँच अनुरोध गर्दैन। रोलआउट र कुनै पनि स्क्यानर परिवर्तनको लागि छुट्टै रिडब्याक प्लस वास्तविक PR, फोर्क र मर्ज-समूह अनुकूलता प्रमाण चाहिन्छ।

फोर्कहरूले होस्टेड रनरहरू प्रयोग गर्दछ, निरन्तर प्रमाणहरू बिना चेकआउट, निर्मातामा कुनै परियोजना install/build छैन, र कुनै इनहेरिटेड रिपोजिटरी गोप्य छैन। GitHub यसको कम फोर्क टोकनको साथ पुल_request घटनाको लागि SARIF अपलोड समर्थन गर्दछ; पहिलो पटक योगदान कार्यान्वयन अनुमोदन GitHub नीति रहन्छ। अविश्वसनीय कोड कार्यान्वयन गर्न pull_request_target कहिल्यै प्रयोग नगर्नुहोस्। वास्तविक टोकन अनुमतिहरू, analysis_key र नियन्त्रित क्यानरीमा सबै श्रेणी वातावरणहरू माइग्रेसन पूरा भएको विचार गर्नु अघि पुष्टि गर्नुहोस्। [फोर्क अपलोड नियमहरू](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [विवादित सेटअप मोडहरू](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows) ।

**बर्खास्तहरू अपरेटरको कल हुन् (हार्ड नियम #14)** — खारेज टिप्पणीमा प्राविधिक औचित्य रेकर्ड नगरी CodeQL अलर्टलाई कहिल्यै खारेज गर्दैन: अपस्ट्रिम-प्रोटोकल आवश्यकताको लागि `won't fix`, परीक्षण फिक्स्चरको लागि `used in tests`, सेनिटाइजरको लागि `false positive` CodeQL देख्न सक्दैन (पूर्व: `docs/security/ERROR_SANITIZATION.md`)।

---

## परीक्षण पुनःप्रयास नीति (WS5.4, v3.8.49)

पुनःप्रयास प्रत्येक रनरका लागि छुट्टाछुट्टै हुन्छ, कहिल्यै पनि विश्वव्यापी रूपमा लागू हुँदैन — सबैमा लागू हुने पुनःप्रयासले वास्तविक रिग्रेसनहरूलाई
अदृश्य फ्लेकहरूमा बदल्छ:

| रनर              | नीति                                                                                                                                | किन                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | CI मा मात्र `retries: 1`, साथै `trace: on-first-retry`                                                                              | ब्राउजर/नेटवर्कको समय निर्धारण वास्तवमै अनिश्चित हुन्छ; ट्रेससहितको एउटा पुनःप्रयासले फ्लेकलाई निदान गर्न सकिने आर्टिफ्याक्टमा बदल्छ |
| Vitest           | विश्वव्यापी पुनःप्रयास हुँदैन। फ्लेकी प्रमाणित परीक्षणले स्पष्ट प्रतिपरीक्षण पुनःप्रयास पाउँछ (diff मा देखिने, PR मा समीक्षा गरिने) | क्वारेन्टिन सूचीलाई repo मै राख्छ, कहिल्यै अपारदर्शी बनाउँदैन                                                                        |
| node:test (unit) | कहिल्यै पुनःप्रयास हुँदैन                                                                                                           | फ्लेकी युनिट परीक्षण भनेको परीक्षणमै भएको बग हो — त्यसलाई सुधार्नुहोस्, फेरि चलाएर भाग्य नजाँच्नुहोस्                                |

फ्लेक टेलिमेट्री उपलब्ध भएपछि लक्षित SLO हरू (WS5.2/5.3): प्रत्येक परीक्षणमा <1% फ्लेक दर
("अहिले नै सुधार्नुहोस्" सीमा), प्रत्येक पाइपलाइनमा ≥95% उत्तीर्ण दर। उद्योगका सन्दर्भ मानहरू —
हाम्रै मापनहरूअनुसार पुनःक्यालिब्रेट गर्नुहोस्।

## रिलिज-स्तरीय र्याचेट ड्रिफ्ट (WS5.5, v3.8.49)

जब कुनै र्याचेट (फाइल आकार, जटिलता, eslint चेतावनीहरू) शुद्ध रिलिज
टिपमा रिग्रेस हुन्छ — अर्थात्, मर्जहरूको संयोजनले त्यसलाई रिग्रेस गराएको हो र कुनै एकल PR ले आफ्नै
ब्रान्चमा उक्त रिग्रेसन पुनरुत्पादन गर्दैन — तब सुधारको जिम्मेवारी **रिलिज क्याप्टेनको हुन्छ, एकपटक,
रिलिज ब्रान्चमा**: एक्स्ट्र्याक्सन/रिफ्याक्टरलाई प्राथमिकता दिनुहोस्; दस्तावेजीकृत
औचित्य प्रविष्टिसहित मात्र पुनःबेसलाइन गर्नुहोस्। संयोजन ड्रिफ्टलाई योगदानकर्ताको PR माथि कहिल्यै नथोपर्नुहोस्, र प्रत्येक
PR का लागि पुनःबेसलाइन कहिल्यै नगर्नुहोस् (त्यसले वास्तविक रिग्रेसनहरू लुकाउँछ)। पहिले छुट्याएर पहिचान गर्नुहोस्: तपाईंको PR ले यो निम्त्याएको हो भनी मान्नुअघि
प्रोब worktree मा शुद्ध टिपविरुद्ध असफलता पुनरुत्पादन गर्नुहोस्।

## र्याचेटका कमीहरू सञ्चित गर्ने — घट्दो दिशा (#8584)

र्याचेट आधा मात्र स्वचालित छ, र त्यो गलत आधा हो। क्याप **बढाउनु** भनेको
दस सेकेन्ड लाग्ने म्यानुअल JSON सम्पादन हो र असफल PR लाई अवरोधमुक्त गर्ने सबैभन्दा छिटो तरिका हो।
क्याप **घटाउन** कसैले `--update` चलाएर नतिजा commit गर्नुपर्छ — र
`bank-ratchet-shrinks` job उपलब्ध नहुँदासम्म कुनै workflow ले यसलाई चलाउँदैनथ्यो। मापन गरिएको परिणाम
(2026-07-25): 18 वटा frozen फाइलहरू पहिले नै 800-लाइनको नयाँ-फाइल क्यापमा वा त्यसभन्दा तल थिए, सबैभन्दा खराब
132× मा (`src/shared/validation/schemas.ts`, 19 लाइनले 2,523 को क्याप बोकेको); जटिलता
सीमा ~37 वटा पुनःबेसलाइन नोटहरूमा `1794 → 2169` पुग्यो, जसमा ठ्याक्कै एकपटक मात्र
कमी (−1) भयो; र "अर्को चक्रमा `--update` मार्फत कस्नुहोस्" 31 पटक लेखियो तर
एकपटक मात्र पालना गरियो। जुन कोडका कारण क्याप तय भएको थियो, त्यो कोडभन्दा लामो समयसम्म क्याप कायम रहँदा सम्पन्न गरिएको हरेक
विघटन चुपचाप उक्त फाइल अर्को पटक सम्पादन गर्ने व्यक्तिका लागि वृद्धि अनुमतिमा बदलिन्छ।

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ले त्यो चक्र पूरा गर्छ:

|               |                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| चल्छ          | `schedule` (दिनमा 3×) + `workflow_dispatch` — जानाजानी `push` मा **होइन**                                  |
| मापन गर्छ     | उच्चतम `release/vX.Y.Z`, `release-green` कै जस्तो रिजोल्युसन + इन्जेक्सन गार्ड                             |
| लेख्छ         | `check:file-size --update` र `check:complexity-ratchets --update` (दुवै संरचनागत रूपमा घटाउन मात्र मिल्ने) |
| प्रमाणित गर्छ | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                   |
| पठाउँछ        | रिलिज ब्रान्चविरुद्ध सधैँ अद्यावधिक रहने एउटा PR — बलपूर्वक अद्यावधिक गरिने, कहिल्यै स्प्याम नगरिने        |

सञ्चय प्रत्येक push मा नगरी ब्याचमा गरिन्छ, किनकि यसमा विलम्बसम्बन्धी कुनै आवश्यकता हुँदैन (8h भित्र
सञ्चित गरिएको कमी पर्याप्त हुन्छ), तर प्रत्येक merge मा चलाउँदा merge अभियानका क्रममा PR ब्रान्च बारम्बार
पुनर्निर्माण हुन्थ्यो र हरेक पटक पूर्ण ESLint वाकको लागत लाग्थ्यो। पहिचान भने
push (`release-green`) मै रहन्छ; सञ्चय मात्र ब्याचमा गरिन्छ।

### सुरक्षा प्रमाणक

job ले मानवीय हस्तक्षेपबिना baselines मा लेख्छ, त्यसैले `verify-ratchet-bank.mjs` ले
त्यसलाई स्वीकार्य बनाउँछ। यसले `--update` पछिको tree लाई `HEAD` सँग diff गर्छ र हरेक परिवर्तन निम्नमध्ये एउटा नभएसम्म
**कुनै commit बन्नुअघि नै job रोक्छ** — र कुनै PR खोल्दैन:

- `frozen` / `testFrozen` को सङ्ख्यात्मक प्रविष्टि **घटाइएको** वा **हटाइएको**
- `complexity-baseline.json` → `count` **घटाइएको**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **घटाइएको**

अरू कुनै पनि परिवर्तन असफल हुन्छ: सङ्ख्या बढाउने, प्रविष्टि थप्ने, `cap`/`testCap` परिवर्तन गर्ने, वा
`_rebaseline_*` नोट मेटाउने/पुनर्लेखन गर्ने (ती नोटहरू प्रत्येक
सीमा किन अस्तित्वमा छ भन्ने अडिट ट्रेल हुन् र फाइल प्रविष्टिहरू रहेकै `frozen` object भित्र भण्डारण गरिएका हुन्छन्)।
क्याप बढाउन सक्ने bot विद्यमान अवस्थाभन्दा निश्चित रूपमा झन् खराब हुन्थ्यो। रिग्रेसन
गार्ड: `tests/unit/verify-ratchet-bank.test.ts`।

job ले `release/*` मा कहिल्यै push गर्दैन — कुनै मानवले PR merge गर्छ, त्यसैले गलत मापन
समीक्षा नभई समावेश हुन सक्दैन।

## अनुमति-सूची नीति

पहिल्यैदेखि रहेका उल्लङ्घनहरूका कारण असफल हुन नसक्ने प्रत्येक गेटले स्थिर अनुमति-सूची प्रयोग गर्छ
(जस्तै, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। नीति यस्तो छ:

**मूल कारण समाधान गर्नुहोस्; उल्लङ्घन पहिल्यैदेखि रहेको र सोही PR मा समाधान गर्न
नसकिने अवस्थामा मात्र अनुमति-सूची प्रयोग गर्नुहोस्।**

अनुमति-सूचीमा प्रविष्टि थप्दा:

1. औचित्यसहितको टिप्पणी समावेश गर्नुहोस्।
2. ट्र्याकिङ इश्युलाई सन्दर्भ गर्नुहोस् (जस्तै, `// #3498 — Phase 2 feature, not yet implemented`)।
3. उल्लङ्घन समाधान गर्ने सोही PR मा प्रविष्टि हटाउनुहोस् — सक्रिय उल्लङ्घनलाई अब
   नदबाउने पुरानो प्रविष्टि आफैँमा एउटा त्रुटि हो (कार्यान्वयन भएपछि 6A.3 को पुरानो-प्रवर्तनले
   कुनै पनि असम्बद्ध अनुमति-सूची प्रविष्टिका कारण गेट असफल गराउनेछ)।

परीक्षणहरू छिटो पास गराउन अनुमति-सूचीमा प्रविष्टिहरू **नथप्नुहोस्**। बढ्दो अनुमति-सूचीसहितको
हरियो गेटले गुणस्तरको झूटो आभास दिन्छ।

### तपाईंको PR मा गेट असफल हुँदा

1. **गेटको आउटपुट ध्यानपूर्वक पढ्नुहोस्** — कुन फाइल वा प्रतीकले नियम उल्लङ्घन गर्यो भन्ने
   यसले ठ्याक्कै बताउँछ।
2. **उल्लङ्घन समाधान गर्नुहोस्** — अधिकांश गेटहरू निर्धारक फाइल प्रणाली जाँचहरू हुन्, जुन कोड
   सही हुनेबित्तिकै पास हुन्छन्।
3. **यदि उल्लङ्घन पहिल्यैदेखि रहेको हो भने** (अर्थात्, तपाईंले ल्याउनुभएको होइन तर अब गेटले
   त्यसलाई समेट्छ): औचित्यको टिप्पणी र ट्र्याकिङ इश्युसहित अनुमति-सूचीमा प्रविष्टि थप्नुहोस्।
4. **यदि गेट र्याचेट हो भने** (कभरेज, ESLint चेतावनीहरू, दोहोरोपन, जटिलता):
   तपाईंको परिवर्तनले मेट्रिकलाई खराब बनाएको छ। मूल समस्या समाधान गर्नुहोस्, वा परिवर्तन
   जानीजानी गरिएको र मेट्रिकको ह्रास स्वीकार्य भएमा (विरलै) `npm run quality:ratchet -- --update`
   चलाउनुहोस् — तर PR को विवरणमा कारण दस्तावेज गर्नुहोस्।
5. **परामर्शात्मक गेटहरू** (`continue-on-error: true`) जानकारीका लागि हुन् — तिनले
   मर्ज रोक्दैनन्, तर CI सारांशमा देखिन्छन्। तिनलाई पनि समाधान गर्नुहोस्।

---

## नयाँ गेट थप्ने

1. `scripts/check/check-<name>.mjs` (वा `.ts`) सिर्जना गर्नुहोस्। नीति गेटहरू 0/1 निकास गर्छन्।
   र्याचेट-शैलीका गेटहरूले `collect-metrics.mjs` मार्फत `quality-metrics.json` मा मेट्रिक उत्सर्जन गर्छन्।
2. `package.json` मा `"check:<name>": "node scripts/check/check-<name>.mjs"` थप्नुहोस्, र
   `config/quality/gate-manifest.json` मा उपनाम र यसको ठ्याक्कै उही आदेश समक्रमण गर्नुहोस्।
   अवस्थित प्रमाणीकरण उपनाम परिवर्तन गर्दा वा हटाउँदा पनि यही समक्रमण लागू गर्नुहोस्।
   `npm run check:gate-manifest` चलाउनुहोस्; pre-commit hook र CI परिवर्तन वर्गीकरणले
   यो सम्झौता लागू गर्छन्।
3. यसलाई `.github/workflows/ci.yml` मा उपयुक्त जबअन्तर्गत जडान गर्नुहोस्
   (नीति → `lint` वा `docs-sync-strict`; र्याचेट → `quality-gate`)।
4. यसमा अनुमति-सूची छ भने, पुराना प्रविष्टिहरू स्वतः पत्ता लगाउन
   `scripts/check/lib/allowlist.mjs` बाट `reportStaleEntries()` लागू गर्नुहोस्।
5. गेटको पहिचान तर्क समेट्ने परीक्षण `tests/unit/build/` मा लेख्नुहोस्।
6. यो कागजात अद्यावधिक गर्नुहोस् (सान्दर्भिक जब तालिकामा एउटा पङ्क्ति थप्नुहोस्)।

---

## एजेन्ट टुलिङ: LSP-in-the-loop (ऐच्छिक)

CI गेटहरूभन्दा बाहिर, OmniRoute ले **ऐच्छिक** `agent-lsp` स्काफोल्ड
(परियोजना-स्तरीय `.mcp.json`, Fase 7 Task 15) उपलब्ध गराउँछ। कोडिङ एजेन्टहरूलाई TypeScript भाषा सर्भर उपलब्ध गराउन `.mcp.json`
सिर्जना गर्नुहोस्, ताकि तिनले कोड लेख्नुभन्दा **पहिले** प्रतीकहरू /
डायग्नोस्टिक्स समाधान गरून् — यो `typecheck:core` को compile-before-claim सहायक हो,
जसले "आविष्कार गरिएका प्रतीक" त्रुटिहरूलाई स्रोतमै घटाउँछ। यसलाई जानाजानी
स्वतः लोड गरिँदैन (तपाईंले MCP↔LSP ब्रिज छान्नुहुन्छ र प्रमाणीकरण गर्नुहुन्छ); बिग्रिएको प्रविष्टिले
जडान त्रुटि मात्र लग गर्छ र सेसनहरूलाई कहिल्यै बिगार्दैन।

---

## युक्तिसंगतीकरण बाँकी सूची (ROI समीक्षा — चरण 9 लहर 3)

यो सूचीलाई 2026-06-17 मा `ci.yml` सँग मिलान गरिएको थियो (अघिल्लो संस्करणमा
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` छुटेका थिए)। मिलान गरिएको सेटको ROI
समीक्षाले निम्न युक्तिसंगतीकरणका उम्मेदवारहरू पहिचान गर्यो। **मर्जहरू यान्त्रिक CI
परिवर्तनहरू हुन्; फ्लिप/हटाउने निर्णयहरू अपरेटरका लागि सुरक्षित राखिएका नीतिगत निर्णयहरू हुन्।**
तलका कुनै पनि कुरा अहिलेसम्म लागू गरिएको छैन।

**माथि यी पनि दस्तावेजीकृत छैनन्** (advisory, कम signal): `docs-lint` job (markdownlint + Vale, पूरा job `continue-on-error`) र स्वतन्त्र scanner workflow `semgrep.yml` / `scorecard.yml`। CodeQL मा अब `Gate / CI` अन्तर्गत अनिवार्य producer र admission job छन्, माथि वर्णित activation आवश्यकताअनुसार। `semgrepFindings: 0` `quality-baseline.json` मा छ, तर `ci.yml` को blocking ratchet सँग जोडिएको छैन — यो metric अहिले असम्बद्ध छ।

### मर्ज / डिडुप्लिकेसन (यान्त्रिक, कम जोखिम)

हरेक उम्मेदवारलाई 2026-06-17 को प्रत्यक्ष गेट अवस्थाविरुद्ध प्रमाणीकरण गरिएको थियो (विश्वास गर,
तर प्रमाणीकरण पनि गर); धेरै "स्पष्ट" देखिने मर्जहरूले ऋण लुकाएको पाइयो र ती **सफा
प्रतिस्थापनहरू होइनन्**।

- **`check:docs-sync` दुई पटक चल्छ** — `lint` कार्यमा स्वतन्त्र रूपमा र फेरि `check:docs-all` (`docs-sync-strict`) तथा husky pre-commit hook भित्र। ✅ **सम्पन्न** — स्वतन्त्र `lint` आह्वान हटाइयो।
- **CVE स्क्यानिङ** — ❌ **सफा मर्ज होइन।** `audit:deps` ले सबै पाँच lockfile मा गम्भीर परामर्शहरू र अपूर्ण अडिटहरू अवरुद्ध गर्छ, जबकि हालको नीतिअन्तर्गत उच्च-स्तरका परामर्शहरूलाई चेतावनीका रूपमा रिपोर्ट गर्छ; `check:vuln-ratchet` (osv) ले check-in गरिएको baseline को तुलनामा भएको _प्रतिगमन_ मा मात्र असफल हुन्छ र आवश्यक हुँदा छुटेका मापनहरू अस्वीकार गर्छ। अर्थगत व्यवहार फरक छन् — `audit:deps` हटाउँदा निरपेक्ष गम्भीर गेट र स्वतन्त्र package audit रसिदहरू गुम्नेछन्। दुवै राख्नुहोस्।
- **चक्र पहिचान** — ✅ **सम्पन्न** (#15159 G-01/G-02)। यहाँको पुरानो पाठले `check:cycles` लाई "हरियो, क्युरेट गरिएको" गेट भनेको थियो र `check:circular-deps` (dpdm) ले 91 चक्र रिपोर्ट गरेको कारण यसलाई अवरोधक राख्नुपर्ने औचित्य दिएको थियो। त्यो हरियो अवस्था **झूटो हरियो** थियो: `check:cycles` ले 5 उपनिर्देशिका (450 फाइल) स्क्यान गरेको थियो, केवल स्थिर `import|export … from` सँग मिलान गरेको थियो र प्रत्येक `@/` तथा `@omniroute/open-sse/` स्पेसिफायर हटाएको थियो, त्यसैले यसले रिपोजिटरीमा व्याप्त dynamic-import + alias चक्रहरू देख्न सकेन। सुधार गरियो: गेटले अब `src` + `open-sse` (5023 फाइल) मा खोज गर्छ, TypeScript AST बाट स्पेसिफायरहरू सङ्कलन गर्छ (त्यसैले `import("…")` गणना हुन्छ र type-position `typeof import("…")` हुँदैन), र tsconfig `paths` समाधान गर्छ। यसले 0 होइन, **14** चक्र फेला पार्छ। पहिलेदेखि रहेका 14 चक्रलाई gate PR मा सुधार्न नसकिने भएकाले `check:cycles` अब **र्याचेट** हो (`--ratchet`, `quality-baseline.json` मा अधिकतम सीमा `metrics.cycles.value = 14`, `direction: down`) — यसले कुनै पनि _प्रतिगमन_ अवरुद्ध गर्छ र सङ्ख्या घट्न मात्र सक्छ। CI ले `npm run check:cycles:ratchet` चलाउँछ। क्रमिक कटौती **A-01** सँगै अघि बढ्छ। व्यापक दोस्रो रायका रूपमा `check:circular-deps` (dpdm) परामर्शात्मक नै रहन्छ।
- **जटिलता** — ✅ **सम्पन्न** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एउटा ESLint भ्रमण, ruleId अनुसार गणना गरिन्छ ताकि cyclomatic+max-lines र cognitive baseline हरू स्वतन्त्र रहून्; व्यक्तिगत `check:complexity` / `check:cognitive-complexity` स्थानीय `--update` का लागि कायम रहन्छन्।
- **`/api` भ्रम-विरोधी जाँच** — ✅ **सम्पन्न** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` को एउटा FS सूची; openapi-routes + docs-symbols ले अझै स्वतन्त्र रूपमा रिपोर्ट गर्छन्; व्यक्तिगत जाँचहरू स्थानीय सञ्चालनका लागि कायम रहन्छन्।
- **`check:node-runtime` 11 वटा कार्यमा चल्छ** — ⚠️ **न्यून ROI।** प्रत्येक छुट्टै runner हो र जाँच <1s लाग्छ; सस्तो प्रति-कार्य सुरक्षा गुमाउने बदलामा कुल बचत ~10s मात्र हुन्छ। परिवर्तनको झन्झट लायक छैन।
- **CI lint मा `typecheck:noimplicit:core`** — ✅ **lint कार्यबाट हटाइयो** (परामर्शात्मक `continue-on-error` थियो); अवरोधक type surface `typecheck:core` + `check:type-coverage` हो। स्थानीय script कायम राखियो।

### फ्लिप / निर्णय (अपरेटर नीति)

- `check:openapi-security-tiers` (परामर्शात्मक) — ❌ **सफा रूपमा फ्लिप गर्न मिल्दैन।** यो 0 सहित निस्कन्छ, तर `LOCAL_ONLY_API_PREFIXES` अन्तर्गतका धेरै `traffic-inspector` route मा `x-loopback-only: true` annotation नभएको चेतावनी दिन्छ। यसलाई लागू गर्नुअघि `openapi.yaml` मा ती annotation थप्नुपर्छ।
- `typecheck:noimplicit:core` (परामर्शात्मक) — अवरोधक `check:type-coverage` र्याचेटले यसलाई धेरै हदसम्म समेट्छ। र्याचेटमा फ्लिप गर्नुहोस् वा अनावश्यक दोस्रो `tsc` pass हटाउनुहोस्।
- `test:vitest:ui` (अहिले **अवरोधक**) — पहिलेदेखिका विफलताहरू `vitest.config.ts` मा `// #8618` ट्र्याकिङ टिप्पणीहरूसहित स्पष्ट रूपमा बहिष्कृत गरिएका छन्; नयाँ विफलताले कार्य असफल बनाउँछ।
- `check:secrets` (gitleaks, अवरोधक र्याचेट) — हालको अधिकतम सीमा `quality-baseline.json` मा रहेको `metrics.secretFindings` हो। कुनै पनि अपवादका लागि औचित्यपूर्ण `.gitleaks.toml` प्रविष्टि चाहिन्छ; अनुपलब्ध मापन INCOMPLETE हो। स्क्यानले GitHub को मूल secret scanning र `check:public-creds` लाई पूरक गर्छ।
- `check:pr-evidence` (अवरोधक, PR-body गद्यमा greps गर्छ) — गलत-सकारात्मकको उच्च जोखिम; हटाइएमा Hard Rule #18 को कार्यान्वयन कमजोर हुन्छ, त्यसैले यो वास्तविक नीतिगत निर्णय हो।
- `semgrep` (परामर्शात्मक स्वतन्त्र कार्यप्रवाह) — OWASP परिवारहरूका लागि CodeQL सँग ओभरल्याप हुन्छ; यसको baseline लाई र्याचेटसँग जोड्नुहोस् वा हटाउनुहोस्।

---

## सम्बन्धित दस्तावेजीकरण

- आपूर्ति शृङ्खला (उत्पत्ति, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — कुञ्जी-सेट समानता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, कार्य `i18n-ui-coverage`)।
प्रत्येक `src/i18n/messages/<locale>.json` को लीफ कुञ्जी-सेटलाई `en.json` सँग तुलना गर्छ र
कुञ्जी कहिले थपिएको थियो भन्ने कुराको परवाह नगरी कुनै लीफ छुटेमा वा अतिरिक्त भएमा असफल हुन्छ। `__MISSING__:`
प्लेसहोल्डरहरूलाई उपस्थित मानिन्छ (तिनको सामग्री अनुपात गेटको विषय हो)। यो दुईवटा
diff-आधारित/प्रतिशत गेटको पूर्ण पूरक हो: `check-ui-keys-coverage` ले प्रत्येक locale मा 80 % को
न्यूनतम सीमा लागू गर्छ (~13,000 मध्ये 43 कुञ्जी अनुपस्थित हुँदा पनि 99.7 % देखिन्छ) र
`check-new-key-coverage` ले PR ले `en.json` मा थपेका कुञ्जीहरूलाई मात्र मूल्याङ्कन गर्छ। कुनै locale
ब्याचको branch काटिएको दिनको `en.json` बाट त्यो ब्याच सिर्जना गरिन्छ र base मा कुञ्जीहरू थपिँदै गर्दा
अनुवादको काम कैयौँ दिनसम्म चल्छ; ब्याच PR आफैँले कुनै कुञ्जी थप्दैन, त्यसैले ब्याच 1 (#13044)
नौ locale मा 43 कुञ्जी कम र ब्याच 2 (#13660) आठ locale मा 10 कुञ्जी कम भएर समावेश हुँदा पनि
दुवै सहोदर गेट मौन रहे (2026-09-15)। असफलता सच्याउन
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` चलाउनुहोस्; `extra` लीफको
अर्थ स्रोतबाट त्यो हटाइएको हो — locale बाट पनि त्यसलाई मेटाउनुहोस्। `--warn` ले असफल नगराई
रिपोर्ट गर्छ। `--catalog=cli` ले `bin/cli/locales` माथि उही तुलना चलाउँछ
(`npm run i18n:check-keys:cli`); दुवै चरण `i18n-ui-coverage` कार्यमा छन्।

#### `check-new-key-coverage` — नयाँ-कुञ्जी i18n गेट

`check-ui-value-drift` को सहोदर। त्यसले अनुवादहरू अद्यावधिक नगरी छाडिएको अवस्थामा **पुनर्लेखन
गरिएको** अङ्ग्रेजी मान समात्छ; यसले केही locale ले कहिल्यै नपाएको **थपिएको** अङ्ग्रेजी कुञ्जी
समात्छ।

`check-ui-keys-coverage` ले यो वर्ग देख्न सक्दैन: यसले प्रत्येक locale मा प्रतिशतको न्यूनतम सीमा
लागू गर्छ, र ~13,000 मध्ये एघार कुञ्जी अनुपस्थित हुँदा पनि coverage 99.9% नै रहन्छ। प्रत्येक भाषाको
प्रतिशतले "यो सुविधा अनुवाद नभई जारी भयो" भन्ने कुरा व्यक्त गर्न सक्दैन — कुनै पूरै सुविधा नयाँ
locale मा कुनै पाठविनै समावेश हुन सक्छ र सङ्ख्या कहिल्यै परिवर्तन नहुन सक्छ।

यसले अभिलेख गर्ने घटना: Orchestration Canvas को Phase 3 ले त्यस समयमा रहेका 42 locale मा आफ्ना
एघार कुञ्जी अनुवाद गरेको थियो। केही घण्टापछि EU-language ब्याच (#13044) ले repo लाई 51 locale
सम्म पुर्यायो, र नौ नयाँ locale (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ले ती
कुञ्जीहरू कहिल्यै पाएनन्। `deepMergeFallback` ले अनुपस्थित कुञ्जीको सट्टा अङ्ग्रेजी राख्छ, त्यसैले
असफलताको स्वरूप खाली UI नभई अनुवाद नगरिएको UI थियो — वास्तविक, र बनोटकै कारण मौन।

आफ्नो सहोदरजस्तै यो पनि **diff-aware** छ, जसले merge base मा रहेको अङ्ग्रेजीलाई working tree सँग
तुलना गर्छ, त्यसैले पहिलेदेखिका रिक्तताहरू यथावत् रहन्छन् र गेट सक्रिय गर्न कुनै migration आवश्यक
परेन।

**`__MISSING__:<english>` मार्करले यसलाई सन्तुष्ट गर्दैन (2026-09-17 देखि)।** पहिले यो
दस्तावेजीकृत स्थगन-विधि थियो — runtime सही अङ्ग्रेजीमा फर्कन्छ — तर 2026-09-16 मा आठ feature PR ले
61 कुञ्जी थपे र अनुवाद गर्नुको सट्टा सबै 65 locale मा मार्कर राखे: यो गेटले ती सबैलाई स्वीकार गर्यो,
PR हरूलाई केहीले रोकेन, र त्यसपछि blocking real-translation ratio gate सबैका लागि release tip मा
असफल भयो (pt-BR 3.2 % > 2.5 % + 0.5)। अब मार्करलाई अनुपस्थित अनुवादका रूपमा मूल्याङ्कन गरिन्छ।
असफलता सच्याउन
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` चलाउनुहोस्,
वा `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe,
`OMNIROUTE_TRANSLATION_*` env बिना सुरु हुन अस्वीकार गर्छ) मार्फत सबै locale समानान्तर रूपमा
अनुवाद गर्नुहोस्। अङ्ग्रेजीमै रहनुपर्ने कुञ्जी (निश्चित product/engine/flag नाम)
`scripts/i18n/untranslatable-keys.json` मा हुनुपर्छ, मार्कर पछाडि कहिल्यै होइन। `vi` ले मार्करहरू
पूर्ण रूपमा निषेध गर्छ (`tests/unit/i18n-vi-completeness.test.ts`)।

#### `check-vitest-exclusions` — रोकिराखिएका परीक्षणको गेट

`vitest.config.ts` को `exclude` सूचीमा रहेको फाइल नचल्ने परीक्षण हो, र tree पढ्ने व्यक्तिलाई त्यो
coverage जस्तो देखिन्छ। `// #8618 — pre-existing failure; remove this exclusion when fixed`
टिप्पणी पछाडि बयसट्ठी फाइल जम्मा भए। Issue #8618 लाई 2026-08-11 मा बन्द गरिएको थियो, जबकि त्यसले
ट्र्याक गरेको सूची 45 entry बाट 62 सम्म बढ्यो र प्रत्येक नयाँ entry ले निष्क्रिय issue तर्फ
सङ्केत गर्ने टिप्पणी ग्रहण गर्यो। अन्ततः सूचीलाई फाइलअनुसार मापन गर्दा (#13204), **62 मध्ये 51 वटा
हालको tree विरुद्ध कुनै source परिवर्तनविनै सफल भए**।

वास्तविक फाइलमा resolve हुने प्रत्येक exclusion ले (a) tracking issue उल्लेख गर्न र (b) आफ्नो
मापन गरिएको status सहित `config/quality/vitest-exclusions.json` मा देखिन गेटले आवश्यक बनाउँछ,
ताकि एउटा थप्नु भनेको 60-entry array मा अर्को लाइन थप्नुको सट्टा छुट्टै फाइलमा समीक्षा गर्न मिल्ने
diff होस्। यसले जानाजानी excluded परीक्षणहरू पुनः चलाउँदैन — त्यसमा ~10 मिनेट लाग्छ र त्यो आवधिक
कार्यमा पर्छ; प्रत्येकलाई अन्तिम पटक कहिले मापन गरिएको थियो भन्ने inventory ले अभिलेख राख्छ।
