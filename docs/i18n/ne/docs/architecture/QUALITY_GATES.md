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

CI र Quality Gates कार्यप्रवाहहरूले प्रत्येकले स्थिर निर्णय जारी गर्छन्: `Gate / CI` र
`Gate / Quality`। तिनको संस्करणयुक्त स्वीकृति नीतिले प्रत्येक अपस्ट्रीम कामलाई आवश्यक वा
सल्लाहकारका रूपमा सूचीकृत गर्छ। लागू हुने आवश्यक काम सफल हुनुपर्छ: नभएको,
रद्द गरिएको, स्किप गरिएको, पेन्डिङ र अज्ञात परिणामहरूले PASS स्थापित गर्न सक्दैनन्। मान्य
docs-only वा catalog-only वर्गीकरणले कोड लेनलाई लागू नहुने बनाउन सक्छ;
ड्राफ्ट PR स्वीकृत उम्मेदवार होइन। `hotfix` लेबलले प्रमाणसम्बन्धी आवश्यकता माफ गर्दैन।

दुवै कार्यप्रवाहले main/release शाखाहरूमा जाने PR, `main` मा गरिएका पुश,
म्यानुअल डिस्प्याच र merge-group घटनाहरू समेट्छन्। पुश, डिस्प्याच र merge-group ले
पूर्ण चयन चलाउँछन्। `release/**` मा गरिएका पुशले तिनीहरू सुरु गर्दैनन् (2026-10-18):
प्रत्येक परिवर्तनले आफ्नो PR मा म्याट्रिक्स पहिले नै चलाइसकेको हुन्छ र मर्ज गरिएको संयोजन
Release-Green को काम हो (`docs/ops/RUNNER_BOX.md` → Hosted lane)।
फोर्कहरू र merge group ले अन्यथा self-hosted
रनर चयन गर्ने कामहरूका लागि hosted रनर प्रयोग गर्छन्; रोलआउटअघि पर्याप्त hosted क्षमता
प्रमाणित गरिनुपर्छ।

प्रत्येक JSON रसिदले जाँच गरिएको SHA, कार्यप्रवाह रन र प्रयास पहिचान गर्छ।
CLI ले checkout/event SHA नमिले अस्वीकार गर्छ। कार्यप्रवाह परीक्षणहरूले नीति सदस्यतालाई
निर्णय कामको `needs` सूचीसँग बाँध्छन्, त्यसैले नयाँ वा हटाइएको लेन चुपचाप हराउन सक्दैन।
रसिदहरूले आफ्नै कार्यप्रवाह समेट्छन्, प्रकाशन, डिप्लोयमेन्ट वा विद्यमान सल्लाहकार
स्क्यानरका आन्तरिक भागहरू होइन। शाखा नियमहरूमा दुवै जाँच नाम सक्रिय गर्नु छुट्टै
प्रशासनिक परिवर्तन हो; यी कामहरू थप्दैमा शाखा आफैं सुरक्षित हुँदैन।

### स्थिर स्क्यान सूची

संस्करणयुक्त npm-alias सूची र स्थिर-स्क्यान सदस्यता
`config/quality/gate-manifest.json` मा रहन्छ। `package.json` विरुद्ध स्क्रिप्ट नाम
र ठ्याक्कै कमान्डहरू प्रमाणित गर्न `npm run check:gate-manifest` चलाउनुहोस्;
थप, हटाइ र कमान्डमा भएको विचलनले स्थानीय हुक र CI का परिवर्तन-वर्गीकरण कामहरू दुवै
असफल बनाउँछ। एलियास कार्यप्रवाहको काम, म्याट्रिक्स इन्स्ट्यान्स वा परीक्षण केस होइन:
यी गणनाहरूलाई एकअर्काका विनिमेय रूपमा प्रस्तुत गर्नु हुँदैन।

कार्यान्वयन नगरी चयन गरिएका एलियासहरू निरीक्षण गर्न
`npm run quality:scan -- --list` वा `npm run quality:scan:fast -- --list`
प्रयोग गर्नुहोस्। रनरले npm एन्ट्रीपोइन्ट आह्वान गर्छ, त्यसैले यसको रनटाइम
(कन्फिगर गरिएको अवस्थामा Bun समेत) सुरक्षित रहन्छ।
म्यानिफेस्टले ती प्रोफाइलहरूबाहिरका एलियासहरूलाई छुट्टै आह्वान गरिने भनेर अभिलेख गर्छ,
र मर्मतसम्भार कमान्डहरू read-only स्क्यान प्रोफाइलहरूमा निषेधित छन्।

यी प्रोफाइलहरूले स्थिर स्क्यान मात्र समेट्छन्। तिनले उत्पादन परीक्षण,
कभरेज, प्याकेजिङ, बाह्य जाँच वा उम्मेदवारको पूर्ण रिलिज स्वीकृतिलाई प्रमाणित गर्दैनन्।
कार्यप्रवाह स्वीकृतिले सम्बन्धित `config/quality/admission-policy.json` र
`scripts/quality/admission-verdict.mjs` प्रयोग गर्छ। Release-observer प्रोफाइलहरू
छुट्टै रहन्छन्; तिनका लागू हुने जाँच र रसिदहरू स्वतन्त्र रूपमा निरीक्षण गर्नुहोस्।
तलको गद्य सूची सन्दर्भ हो, कुनै गेट वास्तवमै चलेको प्रमाण होइन।

स्क्रिप्टहरू `scripts/check/` (नीति गेटहरू) र `scripts/quality/` (रेटच इन्जिन)
अन्तर्गत रहन्छन्। CI को आधिकारिक स्रोत `.github/workflows/ci.yml` हो।

### रिलिज PR द्रुत-पथ (`quality.yml`)

`.github/workflows/quality.yml` ले main/release का PR, `main` मा गरिएका पुश,
डिस्प्याच र merge group लाई CI को पूरकका रूपमा समेट्छ। PR ले पथ-फिल्टर गरिएका
द्रुत जाँचहरू प्रयोग गर्छन्। स्थायी रूपमा निष्क्रिय गरिएको दोहोरिएको बिल्ड हटाइएको छ;
वास्तविक बिल्ड/प्याकेज/बुट जाँचहरू CI मै रहन्छन्।

| काम                                              | दायरा                                                                                                                                                                                                     | अवरोधक           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | डक्स/कोड PR; API डक्स रेफरेन्स र docs-all                                                                                                                                                                 | हो               |
| `Fast Quality Gates`                             | कोड PR; स्थिर जाँच, टाइपचेक, ड्यासबोर्ड टाइपचेक, प्रभावित युनिट परीक्षणहरू                                                                                                                                | हो               |
| `Forgotten sibling tests`                        | कोड PR; स्थिर उपभोक्ताहरू र उम्मेदवार सिब्लिङ परीक्षणहरूमा ट्रेस गरिएका परिवर्तन गरिएका मोड्युलहरू; barrel र dynamic-import पथहरू सन्दर्भित allowlist अपवादहरूसहित सल्लाहकार निदानका रूपमा रिपोर्ट गरिन्छ | **सल्लाहकार**    |
| `Vitest (fast-path)`                             | कोड PR; द्रुत vitest सुइट                                                                                                                                                                                 | हो               |
| `Unit Tests fast-path`                           | कोड PR; 4-शार्ड युनिट सुइट                                                                                                                                                                                | हो               |
| `No new ESLint warnings`                         | कोड PR; suppressions-aware lint guard                                                                                                                                                                     | हो, फोर्कहरूसहित |
| `Merge integrity (changelog + generated skills)` | गैर-ड्राफ्ट PR; चेन्जलॉग र उत्पन्न स्किल समक्रमण                                                                                                                                                          | हो, फोर्कहरूसहित |

#### बिर्सिएका सिब्लिङ परीक्षणहरूको रिपोर्ट

`npm run check:forgotten-sibling-tests` ले टेस्ट-इम्प्याक्ट नक्साको पछाडि रहेको इम्पोर्ट रिजोल्भर पुनः प्रयोग गर्छ।
प्रत्येक परिवर्तित उत्पादन मोड्युलका लागि, उम्मेदवार टेस्ट पुल-रिक्वेस्ट डिफमा अनुपस्थित हुँदा यसले
निर्धारक `changed module/symbol -> static consumer -> candidate sibling test` श्रृंखलाहरू रिपोर्ट गर्छ।
Markdown सारांश र JSON नतिजा कुनै पनि अवरोध गर्ने रोलआउटअघि क्यालिब्रेसनका लागि
`forgotten-sibling-tests` वर्कफ्लो आर्टिफ्याक्टको रूपमा राखिन्छ।

Barrel पुनः-निर्यात र डायनामिक इम्पोर्टहरू केवल रिजोल्युसन डायग्नोस्टिक्स हुन्; तिनीहरूले कहिल्यै
अवरोध गर्ने फाइन्डिङ सिर्जना गर्दैनन्। समीक्षा गरिएका अपवादहरू
`config/quality/forgotten-sibling-allowlist.json` मा रहन्छन्। प्रत्येक प्रविष्टिले कन्जुमर र उम्मेदवार
टेस्टको नाम दिनुपर्छ, विशिष्ट कारण दिनुपर्छ, र GitHub issue वा pull request लिङ्क गर्नुपर्छ। विकृत
प्रविष्टिहरू fail closed हुन्छन्। अपवादहरूले मेटिएको उम्मेदवार टेस्ट वा `.skip`/`.todo` थप्ने डिफलाई
दबाउन सक्दैनन्; assertion कमजोर बनाउने र अन्य मास्किङ स्वतन्त्र रूपमा अवरोध गर्ने
`check:test-masking` गेटको स्वामित्वमा रहन्छ।

### कार्य: `lint`

`main` मा प्रत्येक PR मा चल्छ। असफल हुँदा मर्ज अवरोध गर्छ।

| स्क्रिप्ट (`npm run ...`)         | जाँच गर्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | अवरोधक                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js संस्करण समर्थित दायराभित्र छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हो                                       |
| `check:cycles`                    | `src/` + `open-sse/` भरका सर्कुलर इम्पोर्टहरू (AST-आधारित, tsconfig `paths` समाधान गरिएको)। कुनै पनि चक्र अवस्थित हुँदा सादा (bare) ले 1 मा एक्जिट गर्छ (fail-closed #15281 देखि) र SCCs सूचीबद्ध गर्छ। `check:cycles:ratchet` (CI ले चलाउने) ले गणना `quality-baseline.json` मा `metrics.cycles` सीमाभन्दा बढ्दा ब्लक गर्छ — हाल 14, `direction: down`, त्यसैले यो घट्न मात्र सक्छ (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो (र्याचेट)                             |
| `check:boundary`                  | `open-sse → src` कपलिङ: इन्जिनबाट एपमा अद्वितीय फाइल-देखि-फाइल इम्पोर्टहरू (`scripts/quality/measure-boundary.mjs`; एज सूची v4 core/module-split सुधार ब्याकलग हो)। सादा = सल्लाहकार रिपोर्ट (`quality:boundary` जस्तै)। `check:boundary:ratchet` (CI ले चलाउने, साथै `quality.yml` fast-gates र्याचेट लूपमा पनि) ले गणना `quality-baseline.json` मा `metrics.boundaryOpenSseToSrc` सीमाभन्दा बढ्दा ब्लक गर्छ — मापिएको 771 मा सिड गरिएको, `direction: down`; `--update` ले यसलाई घटाउँछ मात्र; PRs मा base-relative (`--base-ref`, तल हेर्नुहोस्)                                                                                                                                                                                                                                                                                                                          | हो (र्याचेट)                             |
| `check:route-validation:t06`      | सबै रुटहरूमा Zod स्किमाहरू उपस्थित (Tier 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` गणना बजेट नाघ्दैन (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                       |
| `check:provider-consistency`      | `providers.ts` मा भएको प्रत्येक provider को `providerRegistry.ts` मा मिल्ने entry हुन्छ (र विपरीत पनि, allowlist भित्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                       |
| `check:model-lifecycle`           | हातले मर्मत गरिएका तीनवटा routing तालिकाहरू checked-in lifecycle snapshot (#11503) सँग मिल्दो रहन्छन्: `FITNESS_TABLE` (`taskFitness.ts`) ले `REGISTRY` ले route गर्न सक्ने कुनै पनि retired id लाई score गर्दैन; प्रत्येक `BUILT_IN_ALIASES` target `REGISTRY` मा उपस्थित छ र retired-id snapshot बाट अनुपस्थित छ; `REGISTRY` मा अझै रहेको प्रत्येक retired id forward गरिन्छ वा `allowedRetiredInCatalog` मा सूचीबद्ध गरिन्छ; र कुनै पनि `DEFAULT_DEGRADATION_MAP` source वा target त्यो snapshot मा retired देखिँदैन। यसले कुनै model हाल live upstream बाट serve भइरहेको छ भनी प्रमाणित गर्दैन। Offline — `config/quality/model-lifecycle.json` सँग तुलना गर्छ, जुन `npm run quality:refresh-model-lifecycle` (network; CI मा जोडिएको छैन) द्वारा हातले refresh गरिन्छ। `allowedRetiredInCatalog` एउटा burn-down ratchet हो: tracking issue सहित मात्र entry थप्नुहोस्। | हो                                       |
| `check:fetch-targets`             | client-side `src/` मा भएको प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` मा resolve हुन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                       |
| `check:deps`                      | repo भरिका प्रत्येक `package.json` मा भएका सबै `npm install` गर्न मिल्ने deps `dependency-allowlist.json` मा छन्; नयाँ unpinned वा slopsquatted packages फ्ल्याग गरिन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                       |
| `audit:deps`                      | `npm audit` (root + electron) — कुनै high/critical advisory छैन (osv `check:vuln-ratchet` सँग ओभरल्याप हुन्छ; Rationalization Backlog हेर्नुहोस्)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हो                                       |
| `check:lockfile`                  | `package-lock.json` अखण्डता — https रजिस्ट्री, integrity ह्यासहरू, कुनै host override छैन                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                       |
| `check:licenses`                  | उत्पादन निर्भरताहरूका लागि SPDX लाइसेन्स allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हो                                       |
| `check:tracked-artifacts`         | कुनै build artifact छैनन् / commit गरिएका `node_modules` symlink छैनन् (husky pre-commit मा पनि चल्छ; pre-push जानाजान हल्का छ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                       |
| `check:ai-attribution`            | PR commit, title वा body मा कुनै AI/bot `Co-Authored-By` trailer वा AI-generation footer छैन — Hard Rule #16 (`quality.yml` मा PR→`release/**` का लागि fast-gates loop — event payload पढ्छ, PR बाहेक no-op — र PR→`main` का लागि `ci.yml` lint मा PR-only चरण; साथै husky `commit-msg` hook; मानव सह-लेखकहरूलाई अनुमति छ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हो                                       |
| `check:vitest-exclusions`         | प्रत्येक Vitest बहिष्करणले tracking issue उल्लेख गर्छ र `config/quality/vitest-exclusions.json` मा देखा पर्छ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हो                                       |
| `check:file-size`                 | स्रोत फाइलहरू (`src/`, `open-sse/`, `electron/`, `bin/` मा `.ts`/`.tsx`) `cap` भित्र र test फाइलहरू (`*.test.ts(x)`) `testCap` भित्र रहन्छन्; `file-size-baseline.json` (`frozen` / `testFrozen`) मा फ्रोजन गरिएका फाइलहरू आफ्नो रेकर्ड गरिएको आकारभन्दा बढ्नु हुँदैन                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | हो                                       |
| `check:error-helper`              | executors/handlers मा error responses ले `buildErrorBody()` / `sanitizeErrorMessage()` प्रयोग गर्छ (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हो                                       |
| `check:migration-numbering`       | Migration SQL फाइलहरू क्रमैसँग नम्बर गरिएका छन्, कुनै खाली ठाउँ वा दोहोरो छैन                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                       |
| `check:public-creds`              | `publicCreds.ts` बाहिर कुनै शाब्दिक OAuth `client_id`/`client_secret` वा Firebase Web keys छैनन् (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                       |
| `check:db-rules`                  | `src/lib/db/` modules बाहिर कुनै raw SQL छैन; `localDb.ts` बाट कुनै barrel-imports छैन (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हो                                       |
| `check:known-symbols`             | आफ्ना dispatch tables मा दर्ता भएका provider executors, routing strategies, र translators हरू disk मा भएका फाइलहरूसँग मेल खान्छन् — कुनै orphaned वा undeclared symbols छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                       |
| `check:route-guard-membership`    | child process spawn गर्ने प्रत्येक route लाई `isLocalOnlyPath()` ले वर्गीकृत गर्छ (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                       |
| `check:test-discovery`            | रिपोमा रहेको प्रत्येक `*.test.ts` / `*.spec.ts` फाइल कम्तीमा एउटा टेस्ट रनरद्वारा सङ्कलन गरिन्छ (ratchet: `test-discovery-baseline.json` मा रहेको orphan सूची घट्न मात्र सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                       |
| `check:test-tla-order`            | `tests/unit` मुनि कुनै पनि `node:test` फाइलले टेस्ट दर्ता गरेर, top-level `await` भेटेर, त्यसपछि थप दर्ता गर्दैन (#18045; ratchet: `test-tla-order-allowlist.json` घट्न मात्र सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हो                                       |
| `check:agent-skills-sync`         | उत्पन्न गरिएका agent-skills artifacts तिनीहरूका स्रोत क्याटलगसँग मेल खान्छन् (कुनै drift छैन)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | प्रदायक लोगो/एसेटहरूमा अभिलेख गरिएको provenance प्रविष्टि हुन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON कन्फिग फाइलहरू पार्स हुन्छन् र रिपोका lint नियमहरू पूरा गर्छन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | त्रुटि बिना TypeScript कम्पाइलेसन (advisory चेतावनीहरू मात्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                       |
| `typecheck:noimplicit:core`       | कडा `noImplicitAny` — भविष्यमुखी; धेरै पहिल्यैदेखि रहेका call sites लाई अझै annotations आवश्यक छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` लाई `src/app/(dashboard)/**` मा सीमित गरिएको छ (#7033) — `typecheck:core` को चयनित 27-फाइल allowlist मा कुनै पनि dashboard TSX समावेश छैन, र `next build` ले पनि यसलाई type-check गर्दैन (`next.config.mjs` ले `ignoreBuildErrors: true` सेट गर्छ), त्यसैले त्यहाँका orphaned-identifier regression हरू (#6625/#6909) CI मा अदृश्य थिए। स्थिर प्रति-फाइल/प्रति-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` जस्तै stale-enforcement pattern) सँग diff गरिन्छ — baselined count भन्दा माथिका नयाँ error हरूले मात्र gate fail गराउँछन्; पहिलेदेखिको error समाधान भएपछि `--update` प्रयोग गरेर ratchet down गर्नुहोस्।                                                                                                                                                                                             | हो                                       |

### Job: `quality-gate`

`test-coverage` पछि चल्छ। असफल भएमा merge रोक्छ।

| Script                       | के जाँच गर्छ                                                                                                                                                               | रोक्ने                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` उत्सर्जन गर्छ (ESLint warning count, merged shard report बाट coverage)                                                                              | हो (ratchet को upstream) |
| `quality:ratchet`            | `quality-baseline.json` मा भएका प्रत्येक metric मा regression भएको छैन (ESLint warnings ≤ baseline; coverage ≥ baseline)                                                   | हो                       |
| `check:duplication`          | Code duplication (jscpd@4) `quality-baseline.json` को baseline भन्दा बढी छैन                                                                                               | हो                       |
| `check:complexity`           | फाइल-स्तरीय cyclomatic complexity cap भन्दा बढी छैन (core ESLint `complexity` + `max-lines-per-function`)                                                                  | हो                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — छुट्टै ESLint pass; CI ले दुवैलाई एउटै `check:complexity-ratchets` step का रूपमा चलाउँछ                           | हो                       |
| `check:dead-code`            | प्रयोग नभएका exports / files को ratchet (knip) baseline को तुलनामा regress भएको छैन                                                                                        | हो                       |
| `check:compression-budget`   | Compression benchmark budget — प्रत्येक engine का token-savings floor हरूमा regression भएको छैन                                                                            | हो                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) मा regression भएको छैन; यसले धेरै हदसम्म `typecheck:noimplicit:core` लाई समेट्छ                                                    | हो                       |
| `check:codeql-ratchet`       | खुला CodeQL alert count मा regression भएको छैन (`gh api` मार्फत पढ्छ; token नभए graceful-skip) — refresh cadence र manual trigger का लागि तलको "CodeQL ratchet" हेर्नुहोस् | हो                       |

### Job: `quality-extended`

सम्पूर्ण job advisory हो (`continue-on-error: true`)। npm-आधारित ratchet हरू वास्तविक रूपमा चल्छन्; बाह्य scanner हरू `gh release download` मार्फत install हुन्छन् र binary अझै नभए self-skip (exit 0) गर्छन्।

| Script                   | के जाँच गर्छ                                                                                                                                                                                                           | रोक्ने                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Circular dependencies छैनन् (dpdm)                                                                                                                                                                                     | **Advisory**                                    |
| `check:bundle-size`      | Bundle size cap भन्दा बढी छैन                                                                                                                                                                                          | **Advisory**                                    |
| `check:secrets`          | Secret scanning (gitleaks) — binary नभए skip गर्छ                                                                                                                                                                      | **Advisory**                                    |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) मा regression भएको छैन — binary नभए skip गर्छ                                                                                                                                 | **Advisory**                                    |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanner हरू नभए/बिग्रिएमा, reports अमान्य भएमा वा ratchet baseline नभएमा INCOMPLETE का रूपमा fail हुन्छ। मान्य findings ले चयन गरिएको strict/advisory/ratchet policy पालना गर्छन् | Execution आवश्यक; CI मा zizmor ratchet ले रोक्छ |
| `check:openapi-breaking` | Base branch को तुलनामा public API contract (`openapi.yaml`) मा breaking changes (oasdiff) — `openapiBreaking=N` उत्सर्जन गर्छ; oasdiff नभए वा base spec समाधान गर्न नसकिएमा skip गर्छ                                  | **Advisory**                                    |

### Job: `docs-sync-strict`

`main` मा जाने प्रत्येक PR मा चल्छ। असफल भएमा merge रोक्छ।

| Script                         | प्रमाणीकरण                                                                                                                                         | अवरोधक                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | तलका ६ उप-गेटहरू क्रमिक रूपमा चलाउने मेटा-गेट                                                                                                      | हो                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt संस्करणको सुसंगतता                                                                                                   | हो                           |
| ↳ `check:docs-counts`          | गद्यमा भएका गणनाहरू (प्रदायकको संख्या, माइग्रेसनको संख्या आदि) वास्तविक गणनाहरूको ratchet window भित्र छन्                                         | हो                           |
| ↳ `check:env-doc-sync`         | `.env.example` मा भएका प्रत्येक env var docs तालिकामा दस्तावेजीकृत छन्, र यसको विपरीत                                                              | हो                           |
| ↳ `check:deprecated-versions`  | docs मा कुनै पनि deprecated संस्करण स्ट्रिङ छैन                                                                                                    | हो                           |
| ↳ `check:doc-links`            | docs भित्रका आन्तरिक markdown लिङ्कहरू वास्तविक फाइलहरूमा resolve हुन्छन् (`[text]`/`(path)` ढाँचा)                                                | हो                           |
| ↳ `check:fabricated-docs`      | docs मा उद्धृत routes, env vars, CLI commands, hook names र file paths codebase मा विद्यमान छन्। `--strict` मार्फत hard gate; flag बिना soft-fail। | हो (`--strict` मार्फत CI मा) |
| `check:cli-i18n`               | CLI command strings सबै i18n locale files मा उपस्थित छन्                                                                                           | हो                           |
| `check:openapi-coverage`       | OpenAPI spec ले वास्तविक routes को कम्तीमा ratcheted floor समेट्छ                                                                                  | हो                           |
| `check:openapi-security-tiers` | `openapi.yaml` का security tier annotations `routeGuard.ts` का classifications सँग सुसंगत छन्                                                      | **सल्लाहकार**                |
| `check:openapi-routes`         | `openapi.yaml` मा भएका प्रत्येक path वास्तविक `route.ts` मा resolve हुन्छ (anti-hallucination)                                                     | हो                           |
| `check:docs-symbols`           | `docs/**/*.md` मा भएका प्रत्येक `/api/...` reference वास्तविक `route.ts` मा resolve हुन्छ (anti-hallucination)                                     | हो                           |
| `i18n translation drift`       | i18n locale files मा अनुवाद नगरिएका keys — चेतावनी मात्र                                                                                           | **सल्लाहकार**                |

`docs/diagrams/` अन्तर्गतका बाह्रवटा README SVG हरू generated हुन् (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ले ती सबैलाई पुनः generate गर्छ)। प्रत्येकका लागि byte-compare unit test
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) हुन्छ, जसले committed file पुरानो हुँदा
असफल हुन्छ, र `check:docs-counts` ले तिनका `<text>` nodes बाट canonical numbers पढ्छ — त्यसैले
numbers लाई paths मा कहिल्यै outline गरिँदैन। SVG canonical-numbers check ले
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) मा सूचीबद्ध files पढ्छ:
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, साथै `public/images/tier-flow-dark.svg` र `tier-flow-light.svg`; the
free-forever, catalog-entry, recurring-pool र scoring-factors claims ले पनि
`promise-pillars.svg`, `free-tier-budget.svg` र `strategies-grid.svg` पढ्छन्। `free-tier-budget.svg`
ले live catalog loader बाट आफ्ना figures लिन्छ, त्यसैले `FREE_MODEL_BUDGETS` वा provider display name मा
परिवर्तन हुँदा त्यो file पुनः generate नगरिएसम्म CI रातो हुन्छ।

### Job: `i18n-ui-coverage`

| Script                            | प्रमाणीकरण                                                                                                                                                                                     | अवरोधक        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | UI i18n key coverage ≥ 65% छ                                                                                                                                                                   | हो            |
| `check-ui-value-drift` (inline)   | पुनर्लेखन गरिएको English **value** ले कुनै पुरानो अनुवाद बाँकी राख्दैन                                                                                                                         | हो            |
| `check-new-key-coverage` (inline) | प्रत्येक **नयाँ** English key सबै locale मा अनुवाद गरिएको छ — `__MISSING__:` marker अस्वीकार गरिन्छ                                                                                            | हो            |
| `check-translation-ratio`         | प्रत्येक locale को वास्तविक-अनुवाद अनुपात (identical-to-English / placeholder / missing leaves outside the allowlist) ले `config/quality/i18n-translation-baseline.json` + slack नाघ्नु हुँदैन | **सल्लाहकार** |

`fetch-depth: 0` आवश्यक छ — value-drift gate ले `en.json` लाई merge base विरुद्ध diff गर्छ।

#### `check-ui-value-drift` — पुरानो-अनुवाद gate

अन्य गेटहरूले संरचनागत रूपमा देख्न नसक्ने एउटा i18n regression समात्छ: एउटा अंग्रेजी मान
पुनर्लेखन गरिन्छ र _अघिल्लो_ अंग्रेजीबाट निकालिएका अनुवादहरू पछाडि छुट्छन्, त्यसैले
गैर-अंग्रेजी प्रयोगकर्ताहरूले आत्मविश्वास जगाउने, तर अहिले गलत, प्रतिलिपि पढिरहन्छन्।

यो वास्तवमै उत्पादनमा पठाइएको थियो। Antigravity
लगइन हेल्पर आएपछि `oauthModal.googleOAuthWarning` पुनर्लेखन गरिएको थियो (#5203); **43 मध्ये 39 locale** ले
अझै पनि अपरेटरहरूलाई "पूरा URL प्रतिलिपि गरेर तल टाँस्नुहोस्" भन्ने पाठ देखाइरहेका थिए —
त्यो प्रदायकका लागि पूरा हुनै नसक्ने प्रक्रिया हो। #8463 सम्म यो कसैको ध्यानमा आएन, किनकि:

- `sync-ui-keys` ले **अनुपस्थित** कुञ्जीहरू मात्र पछाडि भर्छ, **बासी** कुञ्जीहरूलाई कहिल्यै भर्दैन;
- `check-ui-keys-coverage` ले कुञ्जीको _उपस्थिति_ गन्छ, त्यसैले बासी अनुवाद पनि कभर भएको देखिन्छ;
- `check-translation-drift` ले `docs/i18n/<locale>/**.md` का दस्तावेजी मिररहरू ट्र्याक गर्छ —
  यसले `src/i18n/messages/*.json` कहिल्यै पढ्दैन। 2026-09 को पुनः-सिंकदेखि `docs-sync-strict` job मा अवरोध हुन्छ:
  मूल दस्तावेज सम्पादन गर्नुहोस् → `npm run i18n:run -- --files=<doc>` (section-स्तरमा, कम लागत)।

**Diff-aware, baseline-backed होइन।** यसले merge base मा रहेको `en.json` लाई working tree सँग तुलना गर्छ;
अंग्रेजी मान परिवर्तन भएको प्रत्येक कुञ्जीका लागि, अझै नछोइएको अनुवाद राख्ने कुनै पनि locale बासी हुन्छ।
यसले जानाजानी **पहिलेदेखिको ऋण स्थिर राख्छ** — लामो समयदेखि रहेको अनुवाद कुन पुरानो अंग्रेजीबाट आएको हो
भन्ने कुरा diff ले प्रकट गर्न सक्दैन, त्यसैले gate ले हालको परिवर्तनले छोएका कुराहरू मात्र मूल्याङ्कन गर्छ।
वैकल्पिक उपाय (प्रत्येक कुञ्जीका लागि hash baseline) ले करिब 600 KB को generated file थप्ने थियो,
जुन हालको सबैभन्दा ठूलो baseline भन्दा 3× ठूलो हो र प्रत्येक i18n PR मा परिवर्तन भइरहन्थ्यो।

यसलाई पूरा गर्ने दुई तरिका छन्:

1. प्रभावित अनुवादहरू अद्यावधिक गर्नुहोस्, वा
2. तिनलाई `__MISSING__:<new english>` मा सेट गर्नुहोस् — runtime ले त्यसपछि सुधारिएको अंग्रेजी
   (`src/i18n/request.ts::deepMergeFallback`, #7258) प्रदान गर्छ र कुञ्जी अनुवादका लागि queue मा जान्छ।

यदि string को **अर्थ** परिवर्तन भएको हो भने, **कुञ्जीको नाम परिवर्तन गर्नुहोस्**: नयाँ कुञ्जीले
बासी अनुवाद प्राप्त गर्न सक्दैन। #8463 मा प्रयोग गरिएको ढाँचा यही हो।

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Base catalog पढ्न नसक्दा (base ref बिनाको shallow clone) `check-openapi-breaking` जस्तै,
`SKIP reason=base-unresolved` सहित 0 exit हुन्छ।

### Job: `i18n`

पूर्ण i18n प्रमाणीकरण matrix (प्रत्येक locale का लागि एउटा job)। सम्पूर्ण job advisory हो।

| Script                          | Validates                           | Blocking                                                 |
| ------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | प्रत्येक locale मा अनुवादको पूर्णता | **Advisory** (सम्पूर्ण job मा `continue-on-error: true`) |

### Job: `pr-test-policy`

Pull request हरूमा मात्र चल्छ।

| Script                 | Validates                                                                                                                                | Blocking |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, वा `bin/` मा production code परिवर्तन गर्ने PR हरूमा tests समावेश वा अद्यावधिक हुनुपर्छ (Hard Rule #8) | Yes      |
| `check:test-masking`   | परिवर्तन गरिएका test file हरूले net assert count घटाउँदैनन् वा `assert.ok(true)` tautology थप्दैनन्                                      | Yes      |
| `check:pr-evidence`    | PR body मा परिवर्तनका लागि test/VPS evidence उल्लेख गरिएको हुन्छ (PR prose मा grep गरेर Hard Rule #18 लागू गर्छ — Backlog हेर्नुहोस्)    | Yes      |

### Job: `test-vitest`

`build` पछि चल्छ। असफल भए merge अवरुद्ध गर्छ।

| Suite            | Validates                                                | Blocking                                                                                                              |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | Yes                                                                                                                   |
| `test:vitest:ui` | UI component tests — vitest runner                       | **Blocking** — पहिलेदेखिका असफलताहरू `vitest.config.ts` मा स्पष्ट रूपमा बहिष्कृत छन्; नयाँ असफलताले job असफल बनाउँछन् |

### Nightly workflows (scheduled, advisory)

यी cron schedule (र `workflow_dispatch`) मा चल्छन्, PR मा कहिल्यै चल्दैनन्। सबै advisory हुन्।

| कार्यप्रवाह            | प्रमाणित गर्छ                                                                                                                                    | अवरोधक        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `nightly-property`     | अनियमित सिड + उच्च रन संख्या सहित fast-check property परीक्षणहरू                                                                                 | **सूचनात्मक** |
| `nightly-resilience`   | हिप-वृद्धि गेट, काओस दोष-इन्जेक्सन, k6 लोड/सोक                                                                                                   | **सूचनात्मक** |
| `nightly-llm-security` | promptfoo इन्जेक्सन गार्ड (ब्लक मोड) + garak प्रोबहरू (प्रदायक गोप्य बिना छोडिन्छ)                                                               | **सूचनात्मक** |
| `nightly-schemathesis` | लाइभ OmniRoute विरुद्ध `docs/openapi.yaml` प्रयोग गर्दै OpenAPI करार फजिङ (schemathesis) — स्पेक उल्लंघन / नसम्हालिएका 500s देखाउँछ (Fase 8 B.4) | **सूचनात्मक** |
| `nightly-mutation`     | छिटो युनिट लेनमा Stryker म्युटेसन-परीक्षण स्कोर — जीवित म्युटेन्टहरूले कमजोर assertहरू देखाउँछन्                                                 | **सूचनात्मक** |
| `nightly-compat`       | समर्थित `engines.node` दायराहरूमा Node इन्जिन अनुकूलता म्याट्रिक्स                                                                               | **सूचनात्मक** |

कार्यसम्पादन आधाररेखाहरू (हिप, TTFB, बिल्ड समय) रेकर्ड गरिन्छ, गेट गरिँदैन: हेर्नुहोस् [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)।

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
2. ट्र्याकिङ इस्यु उल्लेख गर्नुहोस् (जस्तै, `// #3498 — चरण 2 को सुविधा, अझै कार्यान्वयन गरिएको छैन`)।
3. उल्लङ्घन समाधान गर्ने सोही PR मा प्रविष्टि हटाउनुहोस् — अब सक्रिय उल्लङ्घनलाई
   दबाउन नसक्ने पुरानो प्रविष्टि आफैंमा एउटा त्रुटि हो (कार्यान्वयन भएपछि 6A.3 पुरानो-प्रवर्तनले
   अनाथ अनुमति-सूची प्रविष्टिका कारण गेट असफल गराउनेछ)।

परीक्षणहरू छिटो पास गराउन अनुमति-सूचीमा प्रविष्टिहरू **नथप्नुहोस्**। बढ्दो
अनुमति-सूची भएको हरियो गेटले गुणस्तरको झूटो अनुभूति दिन्छ।

### तपाईंको PR मा गेट असफल हुँदा

1. **गेटको आउटपुट ध्यानपूर्वक पढ्नुहोस्** — कुन फाइल वा प्रतीकले नियम उल्लङ्घन गर्यो भन्ने कुरा यसले ठ्याक्कै बताउँछ।
2. **उल्लङ्घन समाधान गर्नुहोस्** — अधिकांश गेटहरू निर्धार्य फाइलसिस्टम जाँच हुन्, जुन कोड सही हुनेबित्तिकै पास हुन्छन्।
3. **उल्लङ्घन पहिल्यैदेखि रहेको भए** (अर्थात्, तपाईंले त्यसलाई ल्याउनुभएको होइन तर अब गेटले
   त्यसलाई समेट्छ): औचित्य टिप्पणी र ट्र्याकिङ इस्युसहित अनुमति-सूचीमा प्रविष्टि थप्नुहोस्।
4. **गेट र्याचेट भए** (कभरेज, ESLint चेतावनीहरू, दोहोरोपन, जटिलता):
   तपाईंको परिवर्तनले मेट्रिक बिगारेको छ। अन्तर्निहित समस्या समाधान गर्नुहोस्, वा (विरलै) परिवर्तन
   जानाजानी गरिएको र मेट्रिकको गिरावट स्वीकार्य भए `npm run quality:ratchet -- --update`
   चलाउनुहोस् — तर PR विवरणमा त्यसको कारण अभिलेख गर्नुहोस्।
5. **परामर्शात्मक गेटहरू** (`continue-on-error: true`) जानकारीमूलक हुन् — तिनले
   मर्ज रोक्दैनन् तर CI सारांशमा देखिन्छन्। तैपनि तिनलाई समाधान गर्नुहोस्।

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

## युक्तिसङ्गतीकरण ब्याकलग (ROI समीक्षा — चरण 9 लहर 3)

यो सूचीलाई 2026-06-17 मा `ci.yml` सँग मिलान गरिएको थियो (अघिल्लो संस्करणमा
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` छुटेका थिए)। मिलान गरिएको सेटको ROI
समीक्षाले निम्न युक्तिसङ्गतीकरणका उम्मेदवारहरू पहिचान गर्यो। **मर्जहरू यान्त्रिक CI
परिवर्तनहरू हुन्; फ्लिप/हटाउने कार्यहरू अपरेटरका लागि आरक्षित नीतिगत निर्णयहरू हुन्।**
तलका कुनै पनि कुरा अहिलेसम्म लागू गरिएको छैन।

**माथि दस्तावेजीकरण नगरिएका थप कुराहरू** (परामर्शात्मक, न्यून सङ्केत): `docs-lint` जब
(markdownlint + Vale, सम्पूर्ण जबमा `continue-on-error`) र छुट्टाछुट्टै स्क्यानर वर्कफ्लोहरू
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0`
`quality-baseline.json` मा छ तर `ci.yml` मा कुनै अवरोधक र्याचेटसँग जोडिएको छैन — यो मेट्रिक
हाल अनाथ छ।

### मर्ज / दोहोरोपन हटाउने (यान्त्रिक, कम जोखिम)

प्रत्येक उम्मेदवारलाई 2026-06-17 को प्रत्यक्ष गेट अवस्थासँग प्रमाणीकरण गरिएको थियो
(विश्वास गर, तर पुष्टि पनि गर); धेरै "स्पष्ट" देखिने मर्जहरूले ऋण लुकाएका रहेछन् र ती
**सफा रूपमा सीधै प्रतिस्थापन गर्न मिल्ने** छैनन्।

- **`check:docs-sync` दुई पटक चल्छ** — `lint` जबमा छुट्टै र फेरि `check:docs-all` (`docs-sync-strict`) तथा husky pre-commit हुकभित्र। ✅ **सम्पन्न** — छुट्टै `lint` आह्वान हटाइयो।
- **CVE स्क्यानिङ** — ❌ **सफा मर्ज होइन।** `audit:deps` ले कुनै पनि उच्च/गम्भीर CVE मा कडा रूपमा असफल गराउँछ; `check:vuln-ratchet` (osv) भने आधाररेखाको तुलनामा _पश्चगमन_ भएमा मात्र असफल हुन्छ (हाल 1 MODERATE)। अर्थविज्ञान फरक छन् — `audit:deps` हटाउँदा निरपेक्ष उच्च/गम्भीर गेट हराउनेछ। दुवै राख्नुहोस्।
- **चक्र पत्ता लगाउने** — ✅ **सम्पन्न** (#15159 G-01/G-02)। यहाँको पुरानो पाठले `check:cycles` लाई "हरियो, छनोट गरिएको" गेट भनेको थियो र `check:circular-deps` (dpdm) ले 91 चक्र रिपोर्ट गरेको कारण यसलाई अवरोधक राख्नुपर्ने औचित्य दिएको थियो। त्यो हरियो अवस्था **झूटो हरियो** थियो: `check:cycles` ले 5 उपनिर्देशिका (450 फाइल) स्क्यान गर्थ्यो, स्थिर `import|export … from` सँग मात्र मिलान गर्थ्यो, र प्रत्येक `@/` तथा `@omniroute/open-sse/` स्पेसिफायर हटाउँथ्यो, त्यसैले यसले रिपोजिटरीमा हाबी भएका dynamic-import + alias चक्रहरू देख्न सक्दैनथ्यो। सुधार गरियो: गेटले अब `src` + `open-sse` (5023 फाइल) मा खोज्छ, TypeScript AST बाट स्पेसिफायरहरू सङ्कलन गर्छ (त्यसैले `import("…")` गणना हुन्छ र type-position `typeof import("…")` हुँदैन), र tsconfig `paths` समाधान गर्छ। यसले 0 होइन, **14** चक्र फेला पार्छ। पहिलेदेखि रहेका 14 चक्रलाई गेट PR मा सुधार्न नसकिने भएकाले, `check:cycles` अब **र्याचेट** हो (`--ratchet`, `quality-baseline.json` मा सीमा `metrics.cycles.value = 14`, `direction: down`) — यसले कुनै पनि _पश्चगमन_ रोक्छ र सङ्ख्या घट्न मात्र सक्छ। CI ले `npm run check:cycles:ratchet` चलाउँछ। क्रमिक न्यूनीकरण **A-01** सँगै अघि बढ्छ। `check:circular-deps` (dpdm) व्यापक दोस्रो रायका रूपमा परामर्शात्मक नै रहन्छ।
- **जटिलता** — ✅ **सम्पन्न** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एउटै ESLint भ्रमण, ruleId अनुसार गणना गरिन्छ ताकि cyclomatic+max-lines र cognitive आधाररेखाहरू स्वतन्त्र रहून्; छुट्टाछुट्टै `check:complexity` / `check:cognitive-complexity` स्थानीय `--update` का लागि कायम छन्।
- **`/api` भ्रम-निरोध** — ✅ **सम्पन्न** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` को एउटै FS सूचीकरण, openapi-routes + docs-symbols ले अझै पनि स्वतन्त्र रूपमा रिपोर्ट गर्छन्; छुट्टाछुट्टै जाँचहरू स्थानीय रनका लागि कायम छन्।
- **`check:node-runtime` 11 जबमा चल्छ** — ⚠️ **न्यून ROI।** प्रत्येक छुट्टै रनर हो र जाँच <1s को छ; सस्तो प्रति-जब सुरक्षा गुमाउनुको सट्टा कुल बचत ~10s मात्र हुन्छ। यस्तो फेरबदल गर्न लायक छैन।
- **CI lint मा `typecheck:noimplicit:core`** — ✅ **lint जबबाट हटाइयो** (परामर्शात्मक `continue-on-error` थियो); अवरोधक type surface `typecheck:core` + `check:type-coverage` हो। स्थानीय स्क्रिप्ट कायम राखिएको छ।

### फ्लिप / निर्णय (अपरेटर नीति)

- `check:openapi-security-tiers` (परामर्शात्मक) — ❌ **सफा रूपमा फ्लिप गर्न मिल्दैन।** यो 0 सहित बाहिरिन्छ तर `LOCAL_ONLY_API_PREFIXES` अन्तर्गतका धेरै `traffic-inspector` रुटहरूमा `x-loopback-only: true` एनोटेसन नभएको चेतावनी दिन्छ। यसलाई लागू गराउन पहिले `openapi.yaml` मा ती एनोटेसनहरू थप्नुपर्छ।
- `typecheck:noimplicit:core` (परामर्शात्मक) — अवरोधक `check:type-coverage` र्याचेटले यसको अधिकांश भाग समेट्छ। यसलाई र्याचेटमा फ्लिप गर्नुहोस् वा अनावश्यक दोस्रो `tsc` पास हटाउनुहोस्।
- `test:vitest:ui` (अहिले **अवरोधक**) — पहिलेदेखिका असफलताहरूलाई `vitest.config.ts` मा `// #8618` ट्र्याकिङ टिप्पणीहरूसहित स्पष्ट रूपमा बहिष्कार गरिएको छ; नयाँ असफलताले जब असफल गराउँछन्।
- `check:secrets` (gitleaks, दस्तावेजीकृत 3 false-positive मा स्थिर गरिएको अवरोधक र्याचेट) — 0 मा पुग्न ती 3 वटालाई allowlist गर्नुहोस्, वा परामर्शात्मकमा घटुवा गर्नुहोस्। GitHub को नेटिभ secret-scanning + `check:public-creds` सँग दोहोरिन्छ।
- `check:pr-evidence` (अवरोधक, PR-body गद्यमा grep गर्छ) — false-positive को उच्च जोखिम; हटाइएमा Hard Rule #18 को कार्यान्वयन कमजोर हुन्छ, त्यसैले यो वास्तविक नीतिगत निर्णय हो।
- `semgrep` (परामर्शात्मक छुट्टै वर्कफ्लो) — OWASP परिवारहरूका लागि CodeQL सँग दोहोरिन्छ; यसको आधाररेखालाई र्याचेटसँग जोड्नुहोस् वा हटाउनुहोस्।

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
