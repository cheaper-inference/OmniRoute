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

### उम्मेदवार स्वीकृति

CI र Quality Gates कार्यप्रवाहहरू प्रत्येकले एउटा स्थिर निर्णय उत्सर्जन गर्छन्: `Gate / CI` र
`Gate / Quality`। तिनको संस्करणीकृत स्वीकृति नीतिले प्रत्येक अपस्ट्रिम कार्यलाई
आवश्यक वा परामर्शात्मकका रूपमा सूचीबद्ध गर्छ। लागू हुने आवश्यक कार्य सफल हुनैपर्छ:
हराएको, रद्द भएको, छोडिएको, विचाराधीन र अज्ञात परिणामहरूले PASS स्थापित गर्न सक्दैनन्। एउटा मान्य
कागजात-मात्र वा क्याटलग-मात्र वर्गीकरणले कोड लेनलाई लागू नहुने बनाउन सक्छ;
मस्यौदा PR स्वीकृत उम्मेदवार होइन। `hotfix` लेबलले प्रमाणको आवश्यकता हटाउँदैन।

दुवै कार्यप्रवाहले main/release शाखाहरूमा जाने PRहरू, `main` मा हुने push, म्यानुअल dispatch
र merge-group घटनाहरू समेट्छन्। Push, dispatch र merge-group ले पूर्ण चयन चलाउँछन्। `release/**`
मा हुने push ले तिनलाई सुरु गर्दैनन् (2026-10-18): प्रत्येक परिवर्तनले पहिले नै आफ्नो PR मा म्याट्रिक्स
चलाइसकेको हुन्छ र मर्ज गरिएको संयोजन Release-Green को जिम्मेवारी हो (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन)। Fork
र merge group हरूले अन्यथा self-hosted runner चयन गर्ने कार्यहरूका लागि होस्टेड runner प्रयोग गर्छन्;
रोलआउटअघि पर्याप्त होस्टेड क्षमता प्रमाणित गर्नुपर्छ।

प्रत्येक JSON रसिदले checkout गरिएको SHA, कार्यप्रवाह run र प्रयास पहिचान गर्छ।
CLI ले checkout/event SHA बेमेल अस्वीकार गर्छ। कार्यप्रवाह परीक्षणहरूले नीतिको सदस्यतालाई
निर्णय कार्यको `needs` सूचीसँग बाँध्छन्, ताकि नयाँ वा हटाइएको लेन चुपचाप हराउन नसकोस्।
रसिदहरूले आफ्नै कार्यप्रवाह समेट्छन्, प्रकाशन, deployment वा विद्यमान
परामर्शात्मक scanner का आन्तरिक पक्षहरू होइन। शाखा नियमहरूमा दुवै check नाम सक्रिय गर्नु
छुट्टै प्रशासनिक परिवर्तन हो; यी कार्यहरू थप्दैमा शाखा आफैं सुरक्षित हुँदैन।

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

### Release PR द्रुत-पथ (`quality.yml`)

`.github/workflows/quality.yml` ले main/release PR हरू, `main` मा हुने push,
dispatch र merge group हरूमा CI लाई पूरक बनाउँछ। PR हरूले path-filtered द्रुत जाँचहरू प्रयोग गर्छन्। स्थायी रूपमा
निष्क्रिय पारिएको दोहोरिएको build हटाइएको छ; वास्तविक build/package/boot जाँचहरू CI मै रहन्छन्।

| कार्य                                            | दायरा                                                                                                                                                                                                             | अवरोधक         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR हरू; API docs सन्दर्भहरू र docs-all                                                                                                                                                                  | हो             |
| `Fast Quality Gates`                             | Code PR हरू; स्थिर जाँचहरू, typecheck, dashboard typecheck, प्रभावित unit tests                                                                                                                                   | हो             |
| `Forgotten sibling tests`                        | Code PR हरू; परिवर्तन गरिएका modules बाट static consumers र सम्भावित sibling tests सम्म ट्रेस गरिन्छ; barrel र dynamic-import paths लाई सल्लाहकारी निदानका रूपमा रिपोर्ट गरिन्छ, सन्दर्भित allowlist अपवादहरूसहित | **सल्लाहकारी** |
| `Vitest (fast-path)`                             | Code PR हरू; द्रुत vitest suite                                                                                                                                                                                   | हो             |
| `Unit Tests fast-path`                           | Code PR हरू; 4-shard unit suite                                                                                                                                                                                   | हो             |
| `No new ESLint warnings`                         | Code PR हरू; suppressions-aware lint guard                                                                                                                                                                        | हो, forks सहित |
| `Merge integrity (changelog + generated skills)` | Non-draft PR हरू; changelog र generated skill sync                                                                                                                                                                | हो, forks सहित |

#### छुटेका sibling tests को रिपोर्ट

`npm run check:forgotten-sibling-tests` ले test-impact map पछाडिको import resolver पुनः प्रयोग गर्छ।
प्रत्येक परिवर्तन गरिएको production module का लागि, सम्भावित
test pull-request diff मा नभएमा यसले निर्धार्य
`changed module/symbol -> static consumer -> candidate sibling test` श्रृङ्खलाहरू रिपोर्ट गर्छ। Markdown सारांश र JSON नतिजालाई
कुनै पनि अवरोधक rollout अघि calibration का लागि `forgotten-sibling-tests` workflow artifact का रूपमा सुरक्षित राखिन्छ।

Barrel re-exports र dynamic imports resolution diagnostics मात्र हुन्; तिनले कहिल्यै
अवरोधक finding सिर्जना गर्दैनन्। समीक्षा गरिएका अपवादहरू
`config/quality/forgotten-sibling-allowlist.json` मा रहन्छन्। प्रत्येक entry ले consumer र candidate
test को नाम उल्लेख गर्नुपर्छ, विशिष्ट rationale दिनुपर्छ, र GitHub issue वा pull request मा link गर्नुपर्छ। विकृत entries
fail closed हुन्छन्। अपवादहरूले मेटाइएको candidate test वा `.skip`/`.todo` थप्ने diff लाई suppress गर्न सक्दैनन्;
assertion कमजोर पार्ने र अन्य masking को जिम्मेवारी स्वतन्त्र रूपमा अवरोधक रहेको
`check:test-masking` gate मै रहन्छ।

### कार्य: `lint`

`main` तर्फको प्रत्येक PR मा चल्छ। असफल भएमा merge रोक्छ।

| स्क्रिप्ट (`npm run ...`)         | प्रमाणीकरण गर्ने विषय                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | अवरोधक                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js को संस्करण समर्थित दायराभित्र छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हो                                          |
| `check:cycles`                    | सम्पूर्ण `src/` + `open-sse/` मा चक्रीय आयातहरू (AST-आधारित, tsconfig `paths` समाधान गरिएको)। कुनै पनि चक्र हुँदा प्रत्यक्ष रूपमा चलाइएको जाँचले 1 सहित अन्त्य गर्छ (#15281 देखि fail-closed) र SCC हरूको सूची देखाउँछ। `check:cycles:ratchet` (जुन CI ले चलाउँछ) ले गणना `quality-baseline.json` मा रहेको `metrics.cycles` सीमाभन्दा बढी हुँदा अवरुद्ध गर्छ — हाल 14, `direction: down`, त्यसैले यो घट्न मात्र सक्छ (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हो (र्याचेट)                                |
| `check:boundary`                  | `open-sse → src` युग्मन: इन्जिनबाट एपमा हुने अद्वितीय फाइल-देखि-फाइल आयातहरू (`scripts/quality/measure-boundary.mjs`; किनाराहरूको सूची v4 कोर/मोड्युल-विभाजन सुधारको बाँकी कार्यसूची हो)। प्रत्यक्ष रूपमा चलाइएको जाँच = परामर्शात्मक प्रतिवेदन (`quality:boundary` सरह)। `check:boundary:ratchet` (जुन CI ले चलाउँछ र `quality.yml` को fast-gates र्याचेट लूपमा पनि छ) ले गणना `quality-baseline.json` मा रहेको `metrics.boundaryOpenSseToSrc` सीमाभन्दा बढी हुँदा अवरुद्ध गर्छ — मापन गरिएको 771 बाट प्रारम्भ गरिएको, `direction: down`; `--update` ले यसलाई घटाउन मात्र सक्छ; PR हरूमा आधार-सापेक्ष (`--base-ref`, तल हेर्नुहोस्)                                                                                                                                                                                                                                                                             | हो (र्याचेट)                                |
| `check:route-validation:t06`      | सबै रुटहरूमा Zod स्किमाहरू उपस्थित छन् (टियर 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हो                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` को सङ्ख्याले बजेट नाघ्दैन (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                          |
| `check:provider-consistency`      | `providers.ts` मा भएका प्रत्येक प्रदायकको `providerRegistry.ts` मा मिल्दो प्रविष्टि छ (र उल्टो पनि, अनुमति सूचीभित्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                          |
| `check:model-lifecycle`           | हातैले मर्मत गरिने तीनवटा राउटिङ तालिकाहरू चेक-इन गरिएको जीवनचक्र स्न्यापसट (#11503) सँग सुसङ्गत रहन्छन्: `FITNESS_TABLE` (`taskFitness.ts`) ले `REGISTRY` ले राउट गर्न सक्ने कुनै पनि निवृत्त id लाई स्कोर गर्दैन; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` मा उपस्थित र निवृत्त-id स्न्यापसटमा अनुपस्थित हुन्छ; `REGISTRY` मा अझै रहेका प्रत्येक निवृत्त id लाई फर्वार्ड गरिएको वा `allowedRetiredInCatalog` मा सूचीबद्ध गरिएको हुन्छ; र कुनै पनि `DEFAULT_DEGRADATION_MAP` स्रोत वा लक्ष्य उक्त स्न्यापसटमा निवृत्त देखिँदैन। यसले कुनै मोडेललाई हाल प्रत्यक्ष अपस्ट्रिमद्वारा सेवा दिइँदै छ भन्ने प्रमाणित गर्दैन। अफलाइन — `config/quality/model-lifecycle.json` सँग तुलना गर्छ, जसलाई `npm run quality:refresh-model-lifecycle` प्रयोग गरी हातैले ताजा गरिन्छ (नेटवर्क; CI मा जडान गरिएको छैन)। `allowedRetiredInCatalog` एक क्रमशः घटाइने र्याचेट हो: ट्र्याकिङ इस्युसहित मात्र प्रविष्टि थप्नुहोस्। | हो                                          |
| `check:fetch-targets`             | क्लाइन्ट-साइड `src/` मा भएको प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` मा रिजोल्भ हुन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                          |
| `check:deps`                      | रिपोजिटरीका प्रत्येक `package.json` मा रहेका सबै `npm install` गर्न सकिने निर्भरताहरू `dependency-allowlist.json` मा छन्; नयाँ अनपिन गरिएका वा slopsquatted प्याकेजहरू चिन्हित गरिन्छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हो                                          |
| `audit:deps`                      | पाँचवटै स्वतन्त्र लकफाइल (रुट, Electron, OpenCode plugins v1/v2 र प्रदायक) को npm अडिट। गम्भीर एडभाइजरीहरूले अवरोध गर्छन्; उच्च-स्तरका एडभाइजरीहरू देखिने चेतावनीका रूपमा रहन्छन्। छुटेका/असफल अडिटहरू INCOMPLETE हुन्छन् र अवरोध गर्छन्; प्रत्येक स्कोपका लक ह्यास र रिपोर्टहरू सुरक्षित राखिन्छन्।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हो                                          |
| `check:lockfile`                  | `package-lock.json` को अखण्डता — https रजिस्ट्री, अखण्डता ह्यासहरू, होस्ट ओभरराइडहरू निषेध                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हो                                          |
| `check:licenses`                  | उत्पादन निर्भरताहरूका लागि SPDX इजाजतपत्र अनुमति-सूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                          |
| `check:tracked-artifacts`         | कुनै बिल्ड आर्टिफ्याक्ट / कमिट गरिएका `node_modules` सिमलिङ्कहरू छैनन् (husky pre-commit मा पनि चल्छ; pre-push जानाजानी हल्का राखिएको छ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                          |
| `check:ai-attribution`            | PR कमिटहरू, शीर्षक वा मुख्य भागमा AI/bot `Co-Authored-By` ट्रेलर वा AI-उत्पादन फुटर निषेध — कठोर नियम #16 (`quality.yml` को PR→`release/**` का लागि fast-gates लूपमा — इभेन्ट पेलोड पढ्छ, PR बाहिर कुनै कार्य गर्दैन — र `ci.yml` lint मा PR→`main` का लागि PR-मात्र चरण; साथै husky `commit-msg` हुक; मानव सह-लेखकहरूलाई अनुमति छ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | प्रत्येक Vitest बहिष्करणले ट्र्याकिङ इस्यु उल्लेख गर्छ र `config/quality/vitest-exclusions.json` मा देखा पर्छ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हो                                          |
| `check:file-size`                 | स्रोत फाइलहरू (`src/`, `open-sse/`, `electron/`, `bin/` मा रहेका `.ts`/`.tsx`) `cap` भित्र र परीक्षण फाइलहरू (`*.test.ts(x)`) `testCap` भित्र रहन्छन्; `file-size-baseline.json` मा स्थिर गरिएका फाइलहरू (`frozen` / `testFrozen`) तिनको अभिलिखित आकारभन्दा ठूला हुनु हुँदैन                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                          |
| `check:error-helper`              | executors/handlers मा त्रुटि प्रतिक्रियाहरूले `buildErrorBody()` / `sanitizeErrorMessage()` प्रयोग गर्छन् (कडा नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हो                                          |
| `check:migration-numbering`       | Migration SQL फाइलहरू क्रमिक रूपमा नम्बर गरिएका छन्, कुनै खाली क्रम वा दोहोरिएका नम्बर छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                          |
| `check:public-creds`              | `publicCreds.ts` बाहिर कुनै पनि प्रत्यक्ष OAuth `client_id`/`client_secret` वा Firebase Web कुञ्जीहरू छैनन् (कडा नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हो                                          |
| `check:db-rules`                  | `src/lib/db/` मोड्युलहरू बाहिर कुनै raw SQL छैन; `localDb.ts` बाट कुनै barrel-imports छैनन् (कडा नियमहरू #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                          |
| `check:known-symbols`             | आफ्ना dispatch tables मा दर्ता भएका provider executors, routing strategies, र translators डिस्कमा रहेका फाइलहरूसँग मेल खान्छन् — कुनै अनाथ वा घोषणा नगरिएका symbols छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हो                                          |
| `check:route-guard-membership`    | child process सुरु गर्ने प्रत्येक route लाई `isLocalOnlyPath()` द्वारा वर्गीकृत गरिएको छ (कडा नियमहरू #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                          |
| `check:test-discovery`            | repo मा रहेको प्रत्येक `*.test.ts` / `*.spec.ts` फाइल कम्तीमा एउटा test runner द्वारा सङ्कलित हुन्छ (ratchet: `test-discovery-baseline.json` मा रहेको orphan सूची घट्न मात्र सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                          |
| `check:test-tla-order`            | `tests/unit` अन्तर्गतको कुनै पनि `node:test` फाइलले test दर्ता गरेर top-level `await` सामना गरेपछि थप test दर्ता गर्दैन (#18045; ratchet: `test-tla-order-allowlist.json` घट्न मात्र सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हो                                          |
| `check:agent-skills-sync`         | उत्पन्न गरिएका agent-skills artifacts तिनको source catalog सँग मेल खान्छन् (कुनै drift छैन)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Provider का logos/assets सँग अभिलेख गरिएको provenance entry हुन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON config फाइलहरू parse हुन्छन् र repo का lint नियमहरू पूरा गर्छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | त्रुटिविनाको TypeScript compilation (सल्लाहात्मक चेतावनीहरू मात्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                          |
| `typecheck:noimplicit:core`       | कडा `noImplicitAny` — भविष्य-उन्मुख; पहिलेबाट रहेका धेरै call sites लाई अझै annotations आवश्यक छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **सल्लाहात्मक** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` मा सीमित `tsc` (#7033) — `typecheck:core` को सावधानीपूर्वक चयन गरिएको 27-फाइल allowlist मा कुनै पनि dashboard TSX समावेश छैन, र `next build` ले पनि यसलाई कहिल्यै type-check गर्दैन (`next.config.mjs` ले `ignoreBuildErrors: true` सेट गर्छ), त्यसैले त्यहाँका orphaned-identifier regression हरू (#6625/#6909) CI का लागि अदृश्य थिए। स्थिर गरिएको प्रति-फाइल/प्रति-TS-code गणना baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` कै जस्तो stale-enforcement ढाँचा) सँग diff गर्छ — baseline गरिएको गणनाभन्दा बाहिरका नयाँ त्रुटिहरूले मात्र gate असफल गराउँछन्; पहिलेबाट रहेको त्रुटि समाधान हुँदा `--update` प्रयोग गरी ratchet घटाउनुहोस्।                                                                                                                                                                                                      | हो                                          |

### Job: `quality-gate`

`test-coverage` पछि चल्छ। असफल भएमा merge रोक्छ।

| Script                       | प्रमाणीकरण                                                                                                                                                              | रोक्ने                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` उत्सर्जन गर्छ (ESLint चेतावनी गणना, merged shard report बाट coverage)                                                                            | हो (ratchet भन्दा upstream) |
| `quality:ratchet`            | `quality-baseline.json` मा रहेको प्रत्येक metric मा regression भएको छैन (ESLint चेतावनी ≤ baseline; coverage ≥ baseline)                                                | हो                          |
| `check:duplication`          | Code duplication (jscpd@4) ले `quality-baseline.json` मा रहेको baseline नाघ्दैन                                                                                         | हो                          |
| `check:complexity`           | फाइल-स्तरीय cyclomatic complexity ले cap नाघ्दैन (core ESLint `complexity` + `max-lines-per-function`)                                                                  | हो                          |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — छुट्टै ESLint pass; CI ले दुवैलाई एउटै `check:complexity-ratchets` step का रूपमा merge गरी चलाउँछ              | हो                          |
| `check:dead-code`            | प्रयोग नगरिएका exports / files को ratchet (knip) baseline को तुलनामा regress हुँदैन                                                                                     | हो                          |
| `check:compression-budget`   | Compression benchmark budget — प्रति-engine token-savings का न्यूनतम सीमा regress हुनु हुँदैन                                                                           | हो                          |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regress हुँदैन; यसले धेरै हदसम्म `typecheck:noimplicit:core` लाई समेट्छ                                                         | हो                          |
| `check:codeql-ratchet`       | खुला CodeQL alert को गणना regress हुँदैन (`gh api` मार्फत पढ्छ; token नभएमा graceful-skip) — refresh cadence र manual trigger का लागि: तलको "CodeQL ratchet" हेर्नुहोस् | हो                          |

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

### कार्य: `docs-sync-strict`

`main` वा `release/**` का pull request मा, यो कार्य मस्यौदा नभएका (वा विश्वसनीय लाइनमा रहेका) र दस्तावेज वा कोड परिवर्तन भनेर वर्गीकृत उम्मेदवारमा मात्र चल्छ। यो PR बाहेकका CI घटनामा पनि चल्छ; यस workflow को push trigger ले `main` मात्र समेट्छ, `release/**` होइन। शून्यभन्दा फरक exit code सहित सकिने चरणले कार्य रोक्छ; तलका रिपोर्ट मात्र गरिने निष्कर्ष र अभिलेखित छुटहरूले रोक्दैनन्।

| स्क्रिप्ट                      | प्रमाणीकरण                                                                                                                                                                                                                                                                                                      | अवरोध गर्ने                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `check:docs-all`               | तलका 7 वटा उप-गेटहरू क्रमिक रूपमा चलाउने मेटा-गेट                                                                                                                                                                                                                                                               | हो                                                                                 |
| ↳ `check:docs-sync`            | प्याकेज/OpenAPI/CHANGELOG संस्करणको एकरूपता, `llm.txt` का हुबहु प्रतिलिपिहरू, अनुवादित CHANGELOG का खण्ड/आकारसम्बन्धी स्थिर नियमहरू र प्रतिस्थापन भइसकेका दोहोरिएका दस्तावेजहरूको अनुपस्थिति                                                                                                                    | हो                                                                                 |
| ↳ `check:docs-frontmatter`     | कम्पाइल गरिएका दस्तावेज पृष्ठहरूमा मान्य frontmatter शीर्षकहरू हुन्छन्                                                                                                                                                                                                                                          | हो                                                                                 |
| ↳ `check:docs-counts`          | उच्च विश्वसनीयताका गणनासम्बन्धी स्थिर नियमहरू कडा हुन्छन्; स्क्रिप्टले `--strict` नपाएसम्म फाइल सङ्ख्याका heuristic जाँचले चेतावनी मात्र दिन्छन् (CI meta-gate ले यो पठाउँदैन)                                                                                                                                  | कडा तहले रोक्छ; नरम तह सल्लाहात्मक हो                                              |
| ↳ `check:env-doc-sync`         | स्पष्ट ignore, doc-only र env-only अनुमति सूची लागू गरेपछि स्रोत कोडमा env पढाइ, `.env.example` र `docs/reference/ENVIRONMENT.md` एकअर्कासँग मिल्छन्                                                                                                                                                            | हो, अभिलेखित अनुमति सूचीबाहिर                                                      |
| ↳ `check:deprecated-versions`  | बेवास्ता गरिएका दस्तावेजबाहेक, सुरक्षित ऐतिहासिक सन्दर्भभन्दा बाहिरका सम्भावित पुराना संस्करण र पुराना अद्यावधिक मिति रिपोर्ट गर्छ                                                                                                                                                                              | हालको CI जडानमा सल्लाहात्मक (`--strict` पठाइँदैन)                                  |
| ↳ `check:doc-links`            | कागजातहरूमा भएका आन्तरिक markdown link हरू वास्तविक फाइलमा resolve हुन्छन् (`[text]`/`(path)` स्वरूप)                                                                                                                                                                                                           | हो                                                                                 |
| ↳ `check:fabricated-docs`      | कागजातहरूमा उल्लेख गरिएका route, env var, CLI command, hook का नाम र file path हरू codebase मा अवस्थित छन्। `--strict` मार्फत hard gate; flag बिना soft-fail।                                                                                                                                                   | हो (CI मा `--strict` मार्फत)                                                       |
| `check:cli-i18n`               | प्रयोग भएका CLI `t()` key हरू `en` मा छन्; `pt-BR` ले सबै माथिल्लो तहका खण्ड राख्छ; `zh-CN` र `zh-TW` मा `en` का सबै key हरू छन्                                                                                                                                                                                | हो                                                                                 |
| `check:openapi-coverage`       | OpenAPI specification ले वास्तविक route हरूको कम्तीमा ratchet गरिएको न्यूनतम सीमा समेट्छ                                                                                                                                                                                                                        | हो                                                                                 |
| `check:openapi-security-tiers` | घोषित `x-loopback-only`/`x-always-protected` annotation लाई `routeGuard.ts` ले समर्थन गर्नुपर्छ; parser त्रुटि र अगाडितर्फको जाँचका असङ्गतिले रोक्छन्। local-only prefix अन्तर्गत हराएका `x-loopback-only` का लागि उल्टो जाँचले चेतावनी दिन्छ; pattern बाट मात्र परिभाषित route हरू यस उल्टो जाँचबाट बाहिर छन्। | Parser/अगाडितर्फका जाँचले रोक्छन्; उल्टो जाँच सल्लाहात्मक हो                       |
| `check:openapi-routes`         | औचित्यसहितको `KNOWN_STALE_SPEC` अनुमति सूची लागू गरेपछि `openapi.yaml` को प्रत्येक `/api...` path parameter को नाममा निर्भर नभई वास्तविक route सँग मिल्छ; अनुमति सूचीका पुराना entry ले पनि असफलता ल्याउँछन्                                                                                                    | हो                                                                                 |
| `check:docs-symbols`           | मिरर नभएका आधिकारिक दस्तावेजका आन्तरिक `/api/...` URL सन्दर्भ वास्तविक route वा route परिवारसँग मिल्छन्; proxy/upstream/placeholder/फाइल सन्दर्भ र औचित्यसहितका `KNOWN_STALE_DOC_REFS` entry बाहिर राखिन्छन्, र अनुमति सूचीका पुराना entry ले असफलता ल्याउँछन्                                                  | हो                                                                                 |
| `i18n translation drift`       | अनुवादित दस्तावेजको मुख्य समूहका source/target hash `.i18n-state.json` सँग मिल्छन्। नयाँ थपिएको source drift, हराएको target वा target-hash drift ले मात्र PR असफल हुन्छ; PR बाहेकका जाँच कडा हुन्छन्। PR ले पहिलेबाट पाएको drift र पुराना target का source hash चेतावनी हुन्।                                   | नयाँ PR/PR बाहेकको कडा drift ले रोक्छ; पहिलेबाट पाइएको/पुरानो drift सल्लाहात्मक हो |

`docs/diagrams/` अन्तर्गतका बाह्र README SVG `scripts/docs/gen-readme-<name>.mjs` बाट बनाइन्छन्; `npm run docs:readme-diagrams` ले ती सबैलाई फेरि बनाउँछ।
प्रत्येकको बाइट-बाइट तुलना गर्ने युनिट परीक्षण हुन्छ (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` कार्य), जुन रिपोजिटरीमा कमिट गरिएको फाइल पुरानो हुँदा असफल हुन्छ।
`check:docs-counts` ले तिनका `<text>` नोडबाट आधिकारिक सङ्ख्या पढ्छ, त्यसैले अङ्कलाई कहिल्यै आउटलाइन पाथमा रूपान्तरण गरिँदैन।
SVG आधिकारिक सङ्ख्याको जाँचले `SVG_DIAGRAM_FILES` मा (`scripts/check/check-docs-counts-sync.mjs`) सूचीकृत फाइलहरू पढ्छ: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`।
सधैँ निःशुल्क प्रदायक, क्याटलग प्रविष्टि, आवर्ती पूल र स्कोरिङ कारकसम्बन्धी दाबीको जाँचले पनि `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` पढ्छ।
`free-tier-budget.svg` ले हालको क्याटलग लोडरबाट सङ्ख्या लिन्छ, त्यसैले `FREE_MODEL_BUDGETS` वा प्रदायकको प्रदर्शन नाममा परिवर्तन हुँदा उक्त फाइल फेरि नबनाइएसम्म CI असफल हुन्छ।

### कार्य: `i18n-ui-coverage`

| स्क्रिप्ट                         | प्रमाणीकरण                                                                                                                                                                            | अवरोधक          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुञ्जी कभरेज ≥ 65% छ                                                                                                                                                          | हो              |
| `check-ui-value-drift` (इनलाइन)   | पुनर्लेखित अङ्ग्रेजी **मान** ले कुनै पुरानो अनुवाद बाँकी छोड्दैन                                                                                                                      | हो              |
| `check-new-key-coverage` (इनलाइन) | एउटा **नयाँ** अङ्ग्रेजी कुञ्जी प्रत्येक लोकेलमा अनुवाद गरिएको छ — `__MISSING__:` मार्कर अस्वीकार गरिन्छ                                                                               | हो              |
| `check-translation-ratio`         | प्रत्येक लोकेलको वास्तविक-अनुवाद अनुपात (अङ्ग्रेजीसँग समान / प्लेसहोल्डर / अनुमति-सूचीबाहिर छुटेका मानहरू) `config/quality/i18n-translation-baseline.json` + छुटभन्दा बढी हुनु हुँदैन | **सल्लाहात्मक** |

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

बेस क्याटलग पढ्न नसक्दा (बेस रेफ नभएको श्यालो
क्लोन), `check-openapi-breaking` जस्तै, `SKIP reason=base-unresolved` सहित 0 मा समाप्त हुन्छ।

### कार्य: `i18n`

पूर्ण i18n प्रमाणीकरण म्याट्रिक्स (प्रत्येक लोकेलका लागि एउटा कार्य)। सम्पूर्ण कार्य सल्लाहात्मक हो।

| स्क्रिप्ट                       | प्रमाणीकरण                      | अवरोधक                                                       |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | प्रत्येक लोकेलको अनुवाद पूर्णता | **सल्लाहात्मक** (सम्पूर्ण कार्यमा `continue-on-error: true`) |

### कार्य: `pr-test-policy`

पुल रिक्वेस्टहरूमा मात्र चल्छ।

| स्क्रिप्ट              | प्रमाणीकरण                                                                                                                                               | अवरोधक |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, वा `bin/` मा उत्पादन कोड परिवर्तन गर्ने PR हरूले परीक्षण समावेश वा अद्यावधिक गर्नुपर्छ (कडा नियम #8)                   | हो     |
| `check:test-masking`   | परिवर्तन गरिएका परीक्षण फाइलहरूले खुद assert सङ्ख्या घटाउँदैनन् वा `assert.ok(true)` जस्ता स्वयंसिद्ध कथनहरू थप्दैनन्                                    | हो     |
| `check:pr-evidence`    | PR को मुख्य भागले परिवर्तनका लागि परीक्षण/VPS प्रमाण उल्लेख गर्छ (PR को गद्यमा खोजी गरेर कडा नियम #18 लाई स्वचालित बनाउँछ — कमजोर छ, ब्याकलग हेर्नुहोस्) | हो     |

### कार्य: `test-vitest`

`build` पछि चल्छ। असफल भएमा मर्जलाई अवरुद्ध गर्छ।

| सुइट             | प्रमाणीकरण गर्छ                                         | अवरोधक                                                                                                              |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्भर (110 उपकरणहरू), autoCombo, क्यास — vitest रनर | हो                                                                                                                  |
| `test:vitest:ui` | UI कम्पोनेन्ट परीक्षणहरू — vitest रनर                   | **अवरोधक** — पहिलेदेखिका विफलताहरू `vitest.config.ts` मा स्पष्ट रूपमा बहिष्कृत छन्; नयाँ विफलताले कार्य विफल बनाउँछ |

### रात्रिकालीन कार्यप्रवाहहरू (तालिकाबद्ध, परामर्शात्मक)

यी cron तालिकामा (र `workflow_dispatch` मार्फत) चल्छन्, PR हरूमा कहिल्यै चल्दैनन्। सबै परामर्शात्मक हुन्।

| कार्यप्रवाह            | प्रमाणीकरण गर्छ                                                                                                                                                               | अवरोधक           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | अनियमित seed + उच्च run count सहितका fast-check property परीक्षणहरू                                                                                                           | **परामर्शात्मक** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                         | **परामर्शात्मक** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (प्रदायकको secret नभएमा छोडिन्छ)                                                                                        | **परामर्शात्मक** |
| `nightly-schemathesis` | `docs/openapi.yaml` प्रयोग गरी सक्रिय OmniRoute विरुद्ध OpenAPI contract fuzzing (schemathesis) — specification उल्लङ्घनहरू / ह्यान्डल नगरिएका 500 हरू उजागर गर्छ (चरण 8 B.4) | **परामर्शात्मक** |
| `nightly-mutation`     | द्रुत unit lane मा Stryker mutation-testing score — बाँचेका mutants ले कमजोर assertions उजागर गर्छन्                                                                          | **परामर्शात्मक** |
| `nightly-compat`       | समर्थित `engines.node` दायराहरूमा Node engine अनुकूलता matrix                                                                                                                 | **परामर्शात्मक** |

कार्यसम्पादन आधाररेखाहरू (heap, TTFB, build time) अभिलेख गरिन्छन्, gate गरिँदैनन्: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) हेर्नुहोस्।

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
- **परामर्शात्मक** — फ्रिज गरिएको आधाररेखासँग विश्वव्यापी कुलको तुलना। विरासतमा आएको विचलनले निर्दोष
  PR लाई कहिल्यै रातो बनाउँदैन; रिलिज मिलानका बेला विचलनलाई पुनः फ्रिज गरिन्छ र हेडरुम कार्यले निगरानी गर्छ।

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

### CodeQL र्याचेट: रिफ्रेस आवृत्ति र म्यानुअल ट्रिगर

`check:codeql-ratchet` ले **तालिकाअनुसार रिफ्रेस हुने रिपोको अवस्था पढ्छ — प्रत्येक PR मा होइन।**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ले
`state: configured`, `schedule: weekly` रिपोर्ट गर्छ: यो GitHub को default-setup स्क्यान हो,
प्रत्येक push को विश्लेषण होइन। परिणामस्वरूप: अलर्टहरू समाधान गर्ने PR मर्ज भएपछि, र्याचेटले
अर्को निर्धारित स्क्यान नचल्दासम्म पुरानै, बढी सङ्ख्या पढिरहन्छ — त्यसैले स्क्यान अद्यावधिक
नहुञ्जेल समाधान गर्ने PR कै पछिल्ला PR हरूसहित प्रत्येक खुला PR मा यसले रिग्रेसन रिपोर्ट गर्छ।

**म्यानुअल रिफ्रेस**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ले विश्लेषण पुनः चलाउँछ
र केही मिनेटभित्र अलर्टहरू पुनः प्रकाशित गर्छ। पहिले `.github/workflows/codeql.yml`
पढ्नुहोस् — यसको हेडरले यो `workflow_dispatch`-मात्र हुनुको कारण **GitHub को "default setup"
सँग द्वन्द्व हुनु** हो भनेर व्याख्या गर्छ (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)। `push`/`pull_request`/
`schedule` ट्रिगरहरू पुनर्स्थापना गर्न पहिले **मालिकको कार्य** आवश्यक हुन्छ: Settings → Code security →
CodeQL: Default → Advanced। त्यो स्विच नगरी `schedule:` ट्रिगर नथप्नुहोस् — त्यसले
असफल रनहरू मात्र उत्पादन गर्नेछ।

**सङ्ख्या घटेपछि आधाररेखा कस्नुहोस्** — `node scripts/check/check-codeql-ratchet.mjs
--update` ले नयाँ मापन गरिएको सङ्ख्या `quality-baseline.json` →
`metrics.codeqlAlerts.value` मा लेख्छ, जसले गर्दा र्याचेटले पुरानो अधिकतम सीमासम्मको रिग्रेसनलाई
चुपचाप अनुमति दिँदैन। कार्य गरिएको उदाहरण (2026-09-02/03): PR #12502 ले 7 वटा वास्तविक अलर्ट
समाधान गर्यो (मापन गरिएका खुला अलर्ट 13 → 6); PR #12530 ले त्यससँग मिलाउन स्थिर आधाररेखा 11 → 6
मा कस्यो; त्यसपछि बाँकी 6 वटालाई प्रत्येक अलर्टको औचित्यसहित खारेज गरेर खुला अलर्टको सङ्ख्या 0
मा झारियो।

**खारेजी अपरेटरको निर्णय हो (कडा नियम #14)** — खारेजी टिप्पणीमा प्राविधिक औचित्य अभिलेख नगरी
CodeQL अलर्ट कहिल्यै खारेज नगर्नुहोस्: upstream-protocol आवश्यकताका लागि `won't fix`,
परीक्षण फिक्स्चरका लागि `used in tests`, र CodeQL ले देख्न नसक्ने sanitizer का लागि
`false positive` (नजिर: `docs/security/ERROR_SANITIZATION.md`)।

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
2. `package.json` मा `"check:<name>": "node scripts/check/check-<name>.mjs"` थप्नुहोस्।
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

**माथि दस्तावेजीकरण नगरिएका अन्य कुराहरू पनि** (परामर्शात्मक, न्यून संकेत): `docs-lint` कार्य
(markdownlint + Vale, सम्पूर्ण कार्यमा `continue-on-error`) र स्वतन्त्र स्क्यानर कार्यप्रवाहहरू
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0`
`quality-baseline.json` मा छ, तर `ci.yml` मा अवरोधक र्याचेटसँग जोडिएको छैन — यो मेट्रिक
हाल अनाथ छ।

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
