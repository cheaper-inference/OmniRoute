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

## गेट इन्वेंटरी और एक्जीक्यूशन प्रोफ़ाइल

### कैंडिडेट एडमिशन

CI और Quality Gates वर्कफ़्लो प्रत्येक एक स्थिर वर्डिक्ट जारी करते हैं: `Gate / CI` और
`Gate / Quality`। इनकी वर्ज़न-नियंत्रित एडमिशन पॉलिसी हर अपस्ट्रीम जॉब को आवश्यक या
एडवाइज़री के रूप में सूचीबद्ध करती है। किसी भी लागू आवश्यक जॉब को सफल होना चाहिए:
missing, cancelled, skipped, pending और unknown परिणाम PASS स्थापित नहीं कर सकते। कोई
मान्य docs-only या catalog-only वर्गीकरण किसी कोड लेन को लागू से बाहर कर सकता है;
ड्राफ़्ट PR स्वीकृत कैंडिडेट नहीं है। `hotfix` लेबल साक्ष्य से छूट नहीं देता।

दोनों वर्कफ़्लो main/release ब्रांचों को लक्षित PR, `main` पर पुश, मैनुअल डिस्पैच
और मर्ज-ग्रुप इवेंट को कवर करते हैं। पुश, डिस्पैच और मर्ज-ग्रुप पूर्ण चयन चलाते हैं।
`release/**` पर पुश इन्हें शुरू नहीं करते (2026-10-18): हर बदलाव अपने PR पर पहले ही
मैट्रिक्स चला चुका होता है और मर्ज किया गया संयोजन Release-Green का काम है
(`docs/ops/RUNNER_BOX.md` → Hosted lane)। फ़ोर्क और मर्ज ग्रुप उन जॉब के लिए होस्टेड
रनर इस्तेमाल करते हैं जो अन्यथा सेल्फ़-होस्टेड रनर चुनती हैं; रोलआउट से पहले पर्याप्त
होस्टेड क्षमता सत्यापित की जानी चाहिए।

हर JSON रसीद चेक-आउट किए गए SHA, वर्कफ़्लो रन और अटेम्प्ट की पहचान करती है।
CLI चेकआउट/इवेंट SHA मिसमैच को अस्वीकार कर देता है। वर्कफ़्लो टेस्ट पॉलिसी सदस्यता
को वर्डिक्ट जॉब की `needs` सूची से बाँधते हैं, ताकि कोई नई या हटाई गई लेन चुपचाप
गायब न हो सके। रसीदें अपने स्वयं के वर्कफ़्लो को कवर करती हैं — पब्लिकेशन,
डिप्लॉयमेंट या किसी मौजूदा एडवाइज़री स्कैनर की आंतरिक कार्यप्रणाली को नहीं। ब्रांच
नियमों में दोनों चेक नामों को सक्रिय करना एक अलग प्रशासनिक बदलाव है; इन जॉब को जोड़ना
अपने आप किसी ब्रांच को सुरक्षित नहीं करता।

### स्टैटिक स्कैन इन्वेंटरी

वर्ज़न-नियंत्रित npm-एलियास इन्वेंटरी और स्टैटिक-स्कैन सदस्यता
`config/quality/gate-manifest.json` में रहती है। स्क्रिप्ट नामों और सटीक कमांडों को
`package.json` के विरुद्ध सत्यापित करने के लिए `npm run check:gate-manifest` चलाएँ;
जोड़, हटाव और कमांड ड्रिफ़्ट लोकल हुक और CI के चेंज-क्लासिफ़िकेशन जॉब — दोनों को
फेल करा देते हैं। कोई एलियास वर्कफ़्लो जॉब, मैट्रिक्स इंस्टेंस या टेस्ट केस नहीं है:
इन गिनतियों को एक-दूसरे के बदले प्रस्तुत नहीं किया जाना चाहिए।

चुने गए एलियास को बिना चलाए जाँचने के लिए `npm run quality:scan -- --list` या
`npm run quality:scan:fast -- --list` का उपयोग करें। रनर npm एंट्रीपॉइंट को ही
इनवोक करता है, इसलिए उसका रनटाइम (जहाँ कॉन्फ़िगर किया गया हो, वहाँ Bun सहित) बरकरार
रहता है। मैनिफ़ेस्ट उन प्रोफ़ाइल के बाहर के एलियास को अलग से इनवोक किया हुआ दर्ज
करता है, और रीड-ओनली स्कैन प्रोफ़ाइल में मेंटेनेंस कमांड वर्जित हैं।

ये प्रोफ़ाइल केवल स्टैटिक स्कैन को कवर करती हैं। वे प्रोडक्ट टेस्ट, कवरेज, पैकेजिंग,
एक्सटर्नल चेक या किसी कैंडिडेट की पूर्ण रिलीज़ स्वीकृति को प्रमाणित नहीं करतीं।
वर्कफ़्लो एडमिशन लिंक किए गए `config/quality/admission-policy.json` और
`scripts/quality/admission-verdict.mjs` का उपयोग करता है। रिलीज़-ऑब्ज़र्वर प्रोफ़ाइल
अलग रहती हैं; उनके लागू चेक और रसीदों की स्वतंत्र रूप से जाँच करें। नीचे दी गई गद्य
इन्वेंटरी एक संदर्भ है, यह इस बात का प्रमाण नहीं कि कोई गेट वास्तव में चला था।

स्क्रिप्ट `scripts/check/` (पॉलिसी गेट) और `scripts/quality/` (रैचेट इंजन) के अंतर्गत
रहती हैं। CI का सोर्स ऑफ़ ट्रुथ `.github/workflows/ci.yml` है।

### रिलीज़ PR फ़ास्ट-पाथ (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main` पर पुश, डिस्पैच और मर्ज ग्रुप
पर CI का पूरक है। PR पाथ-फ़िल्टर किए गए फ़ास्ट चेक इस्तेमाल करते हैं। स्थायी रूप से
अक्षम किया गया डुप्लिकेट बिल्ड हटा दिया गया है; असली बिल्ड/पैकेज/बूट चेक CI में बने
हुए हैं।

| जॉब                                              | दायरा                                                                                                                                                                                                             | ब्लॉकिंग         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | डॉक्स/कोड PR; API डॉक्स रेफ़रेंस और docs-all                                                                                                                                                                      | हाँ              |
| `Fast Quality Gates`                             | कोड PR; स्टैटिक चेक, टाइपचेक, डैशबोर्ड टाइपचेक, प्रभावित यूनिट टेस्ट                                                                                                                                              | हाँ              |
| `Forgotten sibling tests`                        | कोड PR; बदले गए मॉड्यूल स्टैटिक कंज़्यूमर और कैंडिडेट सिबलिंग टेस्ट तक ट्रेस किए जाते हैं; बैरल और डायनामिक-इम्पोर्ट पाथ संदर्भित अलावलिस्ट अपवादों सहित एडवाइज़री डायग्नोस्टिक्स के रूप में रिपोर्ट किए जाते हैं | **एडवाइज़री**    |
| `Vitest (fast-path)`                             | कोड PR; फ़ास्ट vitest सूट                                                                                                                                                                                         | हाँ              |
| `Unit Tests fast-path`                           | कोड PR; 4-शार्ड यूनिट सूट                                                                                                                                                                                         | हाँ              |
| `No new ESLint warnings`                         | कोड PR; सप्रेशन-अवेयर लिंट गार्ड                                                                                                                                                                                  | हाँ, फ़ोर्क सहित |
| `Merge integrity (changelog + generated skills)` | नॉन-ड्राफ़्ट PR; चेंजलॉग और जनरेटेड स्किल सिंक                                                                                                                                                                    | हाँ, फ़ोर्क सहित |

#### भूले गए सिबलिंग टेस्ट की रिपोर्ट

`npm run check:forgotten-sibling-tests` test-impact मैप के पीछे के import resolver का पुनः उपयोग करता है।
प्रत्येक बदले गए production मॉड्यूल के लिए, जब संभावित (candidate) टेस्ट pull-request diff में मौजूद
नहीं होता, तो यह नियत (deterministic)
`changed module/symbol -> static consumer -> candidate sibling test` श्रृंखलाएँ रिपोर्ट करता है। किसी भी ब्लॉकिंग rollout से पहले कैलिब्रेशन के लिए, Markdown सारांश और JSON परिणाम
`forgotten-sibling-tests` workflow आर्टिफ़ैक्ट के रूप में सुरक्षित रखे जाते हैं।

Barrel re-exports और dynamic imports केवल रिज़ॉल्यूशन डायग्नोस्टिक्स हैं; वे कभी भी
ब्लॉकिंग फ़ाइंडिंग नहीं बनाते। समीक्षित अपवाद
`config/quality/forgotten-sibling-allowlist.json` में रहते हैं। प्रत्येक एंट्री में consumer और संभावित
टेस्ट का नाम, एक विशिष्ट कारण, तथा एक GitHub issue या pull request का लिंक होना आवश्यक है। त्रुटियुक्त एंट्रियाँ fail
closed होती हैं। अपवाद किसी हटाए गए संभावित टेस्ट या ऐसे diff को दबा नहीं सकते जो `.skip`/`.todo` जोड़ता है;
assertion को कमज़ोर करना और अन्य मास्किंग स्वतंत्र रूप से ब्लॉक करने वाले
`check:test-masking` गेट के अधीन रहते हैं।

### जॉब: `lint`

`main` के लिए हर PR पर चलता है। विफलता पर मर्ज को ब्लॉक करता है।

| स्क्रिप्ट (`npm run ...`)         | सत्यापित करता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | अवरोधक                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js संस्करण समर्थित सीमा के भीतर है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                      |
| `check:cycles`                    | पूरे `src/` + `open-sse/` में सर्कुलर इम्पोर्ट (AST-आधारित, tsconfig `paths` रिज़ॉल्व किए गए)। Bare मोड किसी भी साइकिल के मौजूद होने पर exit 1 करता है (#15281 से fail-closed) और SCCs को सूचीबद्ध करता है। `check:cycles:ratchet` (जिसे CI चलाता है) तब ब्लॉक करता है जब संख्या `quality-baseline.json` में `metrics.cycles` की अधिकतम सीमा से अधिक हो जाती है — वर्तमान में 14, `direction: down`, इसलिए यह केवल घट ही सकती है (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हाँ (ratchet)                            |
| `check:boundary`                  | `open-sse → src` कपलिंग: इंजन से ऐप में यूनिक फ़ाइल-से-फ़ाइल इम्पोर्ट (`scripts/quality/measure-boundary.mjs`; एज सूची v4 core/module-split रीमेडिएशन बैकलॉग है)। Bare = एडवाइज़री रिपोर्ट (`quality:boundary` के समान)। `check:boundary:ratchet` (जिसे CI चलाता है, और जो `quality.yml` fast-gates ratchet लूप में भी है) तब ब्लॉक करता है जब संख्या `quality-baseline.json` में `metrics.boundaryOpenSseToSrc` की अधिकतम सीमा से अधिक हो जाती है — मापे गए 771 पर सीड किया गया, `direction: down`; `--update` इसे केवल कम करता है; PRs पर base-relative (`--base-ref`, नीचे देखें)                                                                                                                                                                                                                                                                                                                                                                            | हाँ (ratchet)                            |
| `check:route-validation:t06`      | सभी रूट्स पर Zod स्कीमा मौजूद (Tier 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हाँ                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` की गिनती बजट से अधिक नहीं होती (Tier 11 रैचेट)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हाँ                                      |
| `check:provider-consistency`      | `providers.ts` में प्रत्येक provider की `providerRegistry.ts` में एक मेल खाती प्रविष्टि होती है (और इसका विलोम भी, allowlist के भीतर)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हाँ                                      |
| `check:model-lifecycle`           | तीनों हाथ से maintain की जाने वाली routing tables चेक-इन किए गए lifecycle snapshot (#11503) के साथ सुसंगत बनी रहती हैं: `FITNESS_TABLE` (`taskFitness.ts`) किसी ऐसे retired id को स्कोर नहीं करती जिसे `REGISTRY` route कर सके; प्रत्येक `BUILT_IN_ALIASES` target `REGISTRY` में मौजूद होता है और retired-id snapshot से अनुपस्थित होता है; `REGISTRY` में अभी भी मौजूद प्रत्येक retired id या तो forward किया गया है या `allowedRetiredInCatalog` में सूचीबद्ध है; और उस snapshot में कोई भी `DEFAULT_DEGRADATION_MAP` source या target retired के रूप में दिखाई नहीं देता। यह सिद्ध नहीं करता कि कोई model वर्तमान में किसी live upstream द्वारा serve किया जा रहा है। ऑफ़लाइन — `config/quality/model-lifecycle.json` से तुलना करता है, जिसे हाथ से `npm run quality:refresh-model-lifecycle` (नेटवर्क; CI में wired नहीं) के साथ refresh किया जाता है। `allowedRetiredInCatalog` एक burn-down रैचेट है: प्रविष्टि केवल एक tracking issue के साथ ही जोड़ें। | हाँ                                      |
| `check:fetch-targets`             | client-side `src/` में प्रत्येक `fetch("/api/...")` एक वास्तविक `route.ts` पर resolve होता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                      |
| `check:deps`                      | repo में प्रत्येक `package.json` की सभी `npm install`-able deps `dependency-allowlist.json` में हैं; नए unpinned या slopsquatted packages को flag किया जाता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हाँ                                      |
| `audit:deps`                      | `npm audit` (root + electron) — कोई high/critical advisories नहीं (osv `check:vuln-ratchet` के साथ overlap करता है; Rationalization Backlog देखें)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हाँ                                      |
| `check:lockfile`                  | `package-lock.json` इंटीग्रिटी — https रजिस्ट्री, इंटीग्रिटी हैश, कोई होस्ट ओवरराइड नहीं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हाँ                                      |
| `check:licenses`                  | प्रोडक्शन डिपेंडेंसीज़ के लिए SPDX लाइसेंस अनुमति-सूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | हाँ                                      |
| `check:tracked-artifacts`         | कोई बिल्ड आर्टिफ़ैक्ट / कमिट किए गए `node_modules` सिमलिंक नहीं (husky pre-commit में भी चलता है; pre-push जानबूझकर हल्का रखा गया है — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                      |
| `check:ai-attribution`            | PR कमिट, टाइटल या बॉडी में कोई AI/bot `Co-Authored-By` ट्रेलर या AI-जनरेशन फ़ुटर नहीं — हार्ड नियम #16 (PR→`release/**` के लिए `quality.yml` fast-gates लूप में — इवेंट पेलोड पढ़ता है, PR के बाहर no-op — और PR→`main` के लिए `ci.yml` lint में एक PR-केवल चरण; साथ ही husky `commit-msg` हुक; मानव सह-लेखकों की अनुमति है; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | हर Vitest एक्सक्लूज़न एक ट्रैकिंग इश्यू का नाम देता है और `config/quality/vitest-exclusions.json` में सूचीबद्ध होता है (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                      |
| `check:file-size`                 | स्रोत फ़ाइलें (`src/`, `open-sse/`, `electron/`, `bin/` में `.ts`/`.tsx`) `cap` के भीतर और टेस्ट फ़ाइलें (`*.test.ts(x)`) `testCap` के भीतर रहती हैं; `file-size-baseline.json` में फ़्रोज़न की गई फ़ाइलें (`frozen` / `testFrozen`) अपने दर्ज आकार से बड़ी नहीं होनी चाहिए                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हाँ                                      |
| `check:error-helper`              | एक्ज़िक्यूटर/हैंडलर में त्रुटि प्रतिक्रियाएँ `buildErrorBody()` / `sanitizeErrorMessage()` का उपयोग करती हैं (हार्ड नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                      |
| `check:migration-numbering`       | माइग्रेशन SQL फ़ाइलें क्रमिक रूप से क्रमांकित हैं, कोई अंतराल या डुप्लिकेट नहीं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हाँ                                      |
| `check:public-creds`              | `publicCreds.ts` के बाहर कोई लिटरल OAuth `client_id`/`client_secret` या Firebase वेब कुंजियाँ नहीं (हार्ड नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | हाँ                                      |
| `check:db-rules`                  | `src/lib/db/` मॉड्यूल के बाहर कोई कच्ची SQL नहीं; `localDb.ts` से कोई बैरल-इम्पोर्ट नहीं (हार्ड नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हाँ                                      |
| `check:known-symbols`             | अपनी डिस्पैच तालिकाओं में पंजीकृत प्रोवाइडर एक्ज़िक्यूटर, राउटिंग रणनीतियाँ और ट्रांसलेटर डिस्क पर मौजूद फ़ाइलों से मेल खाते हैं — कोई अनाथ या अघोषित सिंबल नहीं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हाँ                                      |
| `check:route-guard-membership`    | चाइल्ड प्रोसेस स्पॉन करने वाला प्रत्येक रूट `isLocalOnlyPath()` द्वारा वर्गीकृत है (हार्ड नियम #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | हाँ                                      |
| `check:test-discovery`            | रेपो में प्रत्येक `*.test.ts` / `*.spec.ts` फ़ाइल को कम से कम एक टेस्ट रनर द्वारा एकत्र किया जाता है (रैचेट: `test-discovery-baseline.json` में ऑर्फ़न सूची केवल घट सकती है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | हाँ                                      |
| `check:test-tla-order`            | `tests/unit` के अंतर्गत कोई भी `node:test` फ़ाइल ऐसी नहीं है जो टेस्ट रजिस्टर करे, टॉप-लेवल `await` तक पहुँचे, और फिर अधिक टेस्ट रजिस्टर करे (#18045; रैचेट: `test-tla-order-allowlist.json` केवल घट सकती है)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                      |
| `check:agent-skills-sync`         | जनरेट किए गए agent-skills आर्टिफ़ैक्ट अपने स्रोत कैटलॉग से मेल खाते हैं (कोई विचलन नहीं)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | प्रदाता लोगो/एसेट्स के साथ एक दर्ज provenance प्रविष्टि होती है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON कॉन्फ़िग फ़ाइलें पार्स होती हैं और रेपो लिंट नियमों को संतुष्ट करती हैं                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript संकलन बिना त्रुटियों के (केवल सलाहकारी चेतावनियाँ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | हाँ                                      |
| `typecheck:noimplicit:core`       | सख्त `noImplicitAny` — भविष्योन्मुखी; कई पूर्व-मौजूद कॉल साइटों को अभी भी एनोटेशन की आवश्यकता है                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **सलाहकारी** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` तक सीमित `tsc` (#7033) — `typecheck:core` की क्यूरेट की गई 27-फ़ाइल allowlist में कोई भी dashboard TSX शामिल नहीं है, और `next build` भी कभी इसे type-check नहीं करता (`next.config.mjs` में `ignoreBuildErrors: true` सेट है), इसलिए वहाँ orphaned-identifier regressions (#6625/#6909) CI के लिए अदृश्य थे। एक frozen per-file/per-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` जैसा ही stale-enforcement pattern) के विरुद्ध diff करता है — केवल baselined count से अधिक नई errors ही gate को fail करती हैं; जब कोई पूर्व-मौजूद error ठीक हो जाए तो `--update` के साथ ratchet down करें।                                                                                                                                                                                                                                                                                       | हाँ                                      |

### Job: `quality-gate`

`test-coverage` के बाद चलता है। विफलता पर merge को रोकता है।

| Script                       | सत्यापित करता है                                                                                                                                                         | ब्लॉकिंग                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `quality:collect`            | `quality-metrics.json` उत्सर्जित करता है (ESLint warning count, merged shard report से coverage)                                                                         | हाँ (ratchet के upstream) |
| `quality:ratchet`            | `quality-baseline.json` में प्रत्येक metric regressed नहीं हुआ है (ESLint warnings ≤ baseline; coverage ≥ baseline)                                                      | हाँ                       |
| `check:duplication`          | Code duplication (jscpd@4) `quality-baseline.json` में baseline से अधिक नहीं है                                                                                          | हाँ                       |
| `check:complexity`           | File-level cyclomatic complexity सीमा से अधिक नहीं है (core ESLint `complexity` + `max-lines-per-function`)                                                              | हाँ                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — अलग ESLint pass; CI दोनों को एकल `check:complexity-ratchets` step के रूप में merged चलाता है                    | हाँ                       |
| `check:dead-code`            | Unused exports / files ratchet (knip) baseline के मुकाबले regress नहीं होता                                                                                              | हाँ                       |
| `check:compression-budget`   | Compression benchmark budget — per-engine token-savings floors regress नहीं होने चाहिए                                                                                   | हाँ                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regress नहीं होता; काफ़ी हद तक `typecheck:noimplicit:core` को समाहित करता है                                                     | हाँ                       |
| `check:codeql-ratchet`       | Open CodeQL alert count regress नहीं होता (`gh api` के माध्यम से पढ़ता है; token के बिना graceful-skip) — refresh cadence और manual trigger: नीचे "CodeQL ratchet" देखें | हाँ                       |

### Job: `quality-extended`

पूरा job advisory है (`continue-on-error: true`)। npm-आधारित ratchets वास्तव में
चलते हैं; external scanners `gh release download` के माध्यम से install होते हैं और
binary अभी भी अनुपस्थित होने पर self-skip (exit 0) कर जाते हैं।

| Script                   | सत्यापित करता है                                                                                                                                                                                                    | ब्लॉकिंग                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | कोई circular dependencies नहीं (dpdm)                                                                                                                                                                               | **सलाहकार**                                     |
| `check:bundle-size`      | Bundle size सीमा से अधिक नहीं है                                                                                                                                                                                    | **सलाहकार**                                     |
| `check:secrets`          | Secret scanning (gitleaks) — binary अनुपस्थित होने पर skip करता है                                                                                                                                                  | **सलाहकार**                                     |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) regress नहीं होतीं — binary अनुपस्थित होने पर skip करता है                                                                                                                 | **सलाहकार**                                     |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken scanners, invalid reports या missing ratchet baseline INCOMPLETE के रूप में fail होते हैं। Valid findings चयनित strict/advisory/ratchet policy का पालन करती हैं | निष्पादन आवश्यक; CI में zizmor ratchet ब्लॉकिंग |
| `check:openapi-breaking` | public API contract (`openapi.yaml`) में base branch के मुकाबले breaking changes (oasdiff) — `openapiBreaking=N` उत्सर्जित करता है; oasdiff अनुपस्थित होने या base spec unresolvable होने पर skip करता है           | **सलाहकार**                                     |

### Job: `docs-sync-strict`

`main` के लिए प्रत्येक PR पर चलता है। विफलता पर merge को रोकता है।

| स्क्रिप्ट                      | सत्यापित करता है                                                                                                                                        | अवरोधक                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:docs-all`               | मेटा-गेट जो नीचे दिए गए 6 उप-गेटों को क्रमिक रूप से चलाता है                                                                                            | हाँ                                  |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt संस्करण संगति                                                                                                             | हाँ                                  |
| ↳ `check:docs-counts`          | गद्य में दी गई गिनतियाँ (प्रदाता संख्या, माइग्रेशन संख्या, आदि) वास्तविक गिनतियों की रैचेट विंडो के भीतर हैं                                            | हाँ                                  |
| ↳ `check:env-doc-sync`         | `.env.example` में प्रत्येक env var दस्तावेज़ तालिका में प्रलेखित है, और इसका उल्टा भी                                                                  | हाँ                                  |
| ↳ `check:deprecated-versions`  | दस्तावेज़ों में कोई बहिष्कृत (deprecated) संस्करण स्ट्रिंग नहीं                                                                                         | हाँ                                  |
| ↳ `check:doc-links`            | दस्तावेज़ों में आंतरिक मार्कडाउन लिंक वास्तविक फ़ाइलों पर हल होते हैं (`[text]`/`(path)` रूप)                                                           | हाँ                                  |
| ↳ `check:fabricated-docs`      | दस्तावेज़ों में उद्धृत रूट, env vars, CLI कमांड, हुक नाम और फ़ाइल पथ कोडबेस में मौजूद हैं। `--strict` के माध्यम से हार्ड गेट; फ़्लैग के बिना सॉफ्ट-फेल। | हाँ (CI में `--strict` के माध्यम से) |
| `check:cli-i18n`               | CLI कमांड स्ट्रिंग्स सभी i18n लोकेल फ़ाइलों में मौजूद हैं                                                                                               | हाँ                                  |
| `check:openapi-coverage`       | OpenAPI स्पेक वास्तविक रूटों की कम से कम रैचेट की गई न्यूनतम सीमा को कवर करता है                                                                        | हाँ                                  |
| `check:openapi-security-tiers` | `openapi.yaml` में सुरक्षा स्तर एनोटेशन `routeGuard.ts` वर्गीकरणों के अनुरूप हैं                                                                        | **परामर्शी**                         |
| `check:openapi-routes`         | `openapi.yaml` में प्रत्येक पथ एक वास्तविक `route.ts` पर हल होता है (एंटी-हैलूसिनेशन)                                                                   | हाँ                                  |
| `check:docs-symbols`           | `docs/**/*.md` में प्रत्येक `/api/...` संदर्भ एक वास्तविक `route.ts` पर हल होता है (एंटी-हैलूसिनेशन)                                                    | हाँ                                  |
| `i18n translation drift`       | i18n लोकेल फ़ाइलों में अननुवादित कुंजियाँ — केवल चेतावनी                                                                                                | **परामर्शी**                         |

`docs/diagrams/` के तहत बारह README SVG जनरेट किए जाते हैं (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` उन सभी को पुनः जनरेट करता है)। प्रत्येक का एक बाइट-तुलना यूनिट टेस्ट
(`tests/unit/docs/readme-*-svg.test.ts`, जॉब `test-unit`) है जो कमिट की गई फ़ाइल पुरानी होने पर
विफल हो जाता है, और `check:docs-counts` उनके `<text>` नोड्स से कैनोनिकल संख्याएँ पढ़ता है — यही कारण है कि
संख्याएँ कभी भी पथों (paths) में आउटलाइन नहीं की जाती हैं। SVG कैनोनिकल-संख्या जांच
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) में सूचीबद्ध फ़ाइलों को पढ़ती है: `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, साथ ही `public/images/tier-flow-dark.svg` और `tier-flow-light.svg`;
free-forever, catalog-entry, recurring-pool और scoring-factors दावे भी
`promise-pillars.svg`, `free-tier-budget.svg` और `strategies-grid.svg` पढ़ते हैं। `free-tier-budget.svg`
अपने आंकड़े लाइव कैटलॉग लोडर से लेता है, इसलिए `FREE_MODEL_BUDGETS` में या किसी
प्रदाता प्रदर्शन नाम में बदलाव CI को तब तक रेड कर देता है जब तक कि वह फ़ाइल पुनः जनरेट न हो जाए।

### जॉब: `i18n-ui-coverage`

| स्क्रिप्ट                         | सत्यापित करता है                                                                                                                                                                             | अवरोधक       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुंजी कवरेज ≥ 65% है                                                                                                                                                                 | हाँ          |
| `check-ui-value-drift` (इनलाइन)   | पुनः लिखा गया अंग्रेज़ी **मान** कोई पुराना अनुवाद पीछे नहीं छोड़ता                                                                                                                           | हाँ          |
| `check-new-key-coverage` (इनलाइन) | प्रत्येक लोकेल में एक **नई** अंग्रेज़ी कुंजी का अनुवाद होना चाहिए — `__MISSING__:` मार्कर अस्वीकार कर दिया जाता है                                                                           | हाँ          |
| `check-translation-ratio`         | प्रति लोकेल वास्तविक-अनुवाद अनुपात (अंग्रेज़ी के समान / प्लेसहोल्डर / अनुमति सूची के बाहर छूटी हुई कुंजियाँ) `config/quality/i18n-translation-baseline.json` + स्लैक से अधिक नहीं होना चाहिए | **परामर्शी** |

`fetch-depth: 0` की आवश्यकता है — वैल्यू-ड्रिफ्ट गेट `en.json` को मर्ज बेस के विरुद्ध डिफ करता है।

#### `check-ui-value-drift` — पुराने-अनुवाद गेट

वह एकमात्र i18n रिग्रेशन पकड़ता है जिसे अन्य गेट संरचनात्मक रूप से देख ही नहीं सकते: अंग्रेज़ी
मान को फिर से लिख दिया जाता है और _पिछली_ अंग्रेज़ी से बने अनुवाद पीछे रह जाते हैं, जिससे
गैर-अंग्रेज़ी उपयोगकर्ता आत्मविश्वास से लिखा गया, अब-गलत कॉन्टेंट पढ़ते रहते हैं।

यह वास्तव में शिप हो चुका है। `oauthModal.googleOAuthWarning` को तब फिर से लिखा गया जब
Antigravity लॉगिन हेल्पर आया (#5203); **43 में से 39 लोकेल** में ऐसा टेक्स्ट बना रहा जो
ऑपरेटरों से कहता था "पूरा URL कॉपी करें और नीचे पेस्ट करें" — एक ऐसा फ़्लो जो उस प्रदाता
के लिए पूरा हो ही नहीं सकता। यह #8463 तक अनदेखा रहा क्योंकि:

- `sync-ui-keys` केवल उन कुंजियों को बैकफ़िल करता है जो **अनुपस्थित** हैं, कभी भी उन्हें
  नहीं जो **पुरानी (stale)** हैं;
- `check-ui-keys-coverage` कुंजी की _उपस्थिति_ गिनता है, इसलिए पुराना अनुवाद भी कवर किया
  हुआ माना जाता है;
- `check-translation-drift` `docs/i18n/<locale>/**.md` दस्तावेज़ मिरर को ट्रैक करता है —
  यह कभी भी `src/i18n/messages/*.json` नहीं पढ़ता। 2026-09 के पुनः-सिंक के बाद से जॉब
  `docs-sync-strict` में ब्लॉकिंग: कोई कोर दस्तावेज़ संपादित करें →
  `npm run i18n:run -- --files=<doc>` (सेक्शन-स्तरीय, सस्ता)।

**डिफ़-अवेयर, बेसलाइन-समर्थित नहीं।** यह मर्ज बेस पर मौजूद `en.json` की तुलना वर्किंग
ट्री से करता है; जिस कुंजी का अंग्रेज़ी मान बदला है, उसके लिए कोई भी लोकेल जो अछूता
अनुवाद रखे हुए है, पुराना है। यह जानबूझकर **पहले से मौजूद कर्ज़ को फ़्रीज़ करता है** — एक
डिफ़ यह नहीं बता सकता कि कोई पुराना अनुवाद किस पुरानी अंग्रेज़ी से बना था, इसलिए गेट
केवल उसी का मूल्यांकन करता है जिसे वर्तमान परिवर्तन छूता है। विकल्प (प्रति-कुंजी हैश
बेसलाइन) की लागत ~600 KB की जनरेट की गई फ़ाइल होगी, जो सबसे बड़ी मौजूदा बेसलाइन से 3×
बड़ी, और हर i18n PR पर बदलती रहेगी।

इसे पूरा करने के दो तरीके:

1. प्रभावित अनुवादों को अपडेट करें, या
2. उन्हें `__MISSING__:<new english>` पर सेट करें — रनटाइम तब सही की गई अंग्रेज़ी परोसता
   है (`src/i18n/request.ts::deepMergeFallback`, #7258) और कुंजी अनुवाद के लिए कतार में
   चली जाती है।

यदि स्ट्रिंग का **अर्थ** बदल गया है, तो **कुंजी का नाम बदलना** बेहतर है: नई कुंजी पुराना
अनुवाद इनहेरिट नहीं कर सकती। #8463 ने यही पैटर्न इस्तेमाल किया।

```bash
npm run i18n:check-value-drift          # स्ट्रिक्ट (जो CI चलाता है)
npm run i18n:check-value-drift:warn     # केवल रिपोर्ट
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

जब बेस कैटलॉग पढ़ा नहीं जा सकता (बेस रेफ़ के बिना शैलो क्लोन), तो
`SKIP reason=base-unresolved` के साथ 0 पर एग्ज़िट करता है, `check-openapi-breaking`
की तरह।

### जॉब: `i18n`

पूर्ण i18n वैलिडेशन मैट्रिक्स (प्रति लोकेल एक जॉब)। पूरी जॉब एडवाइज़री है।

| स्क्रिप्ट                       | क्या वैलिडेट करता है          | ब्लॉकिंग                                              |
| ------------------------------- | ----------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | प्रति लोकेल अनुवाद की पूर्णता | **एडवाइज़री** (पूरी जॉब पर `continue-on-error: true`) |

### जॉब: `pr-test-policy`

केवल पुल रिक्वेस्ट पर चलता है।

| स्क्रिप्ट              | क्या वैलिडेट करता है                                                                                                                              | ब्लॉकिंग |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, या `bin/` में प्रोडक्शन कोड बदलने वाले PR में टेस्ट शामिल या अपडेट करना आवश्यक है (हार्ड नियम #8)               | हाँ      |
| `check:test-masking`   | बदली गई टेस्ट फ़ाइलें नेट असर्ट संख्या नहीं घटातीं और न ही `assert.ok(true)` टॉटोलॉजी जोड़तीं                                                     | हाँ      |
| `check:pr-evidence`    | PR बॉडी में परिवर्तन के लिए टेस्ट/VPS साक्ष्य का उल्लेख हो (PR के टेक्स्ट को grep करके हार्ड नियम #18 को मशीनीकृत करता है — नाज़ुक, बैकलॉग देखें) | हाँ      |

### जॉब: `test-vitest`

`build` के बाद चलता है। विफलता पर मर्ज को ब्लॉक करता है।

| सुइट             | क्या वैलिडेट करता है                             | ब्लॉकिंग                                                                                                                       |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP सर्वर (110 टूल), autoCombo, कैश — vitest रनर | हाँ                                                                                                                            |
| `test:vitest:ui` | UI कॉम्पोनेंट टेस्ट — vitest रनर                 | **ब्लॉकिंग** — पहले से मौजूद विफलताओं को `vitest.config.ts` में स्पष्ट रूप से बाहर रखा गया है; नई विफलताएँ जॉब को फेल करती हैं |

### नाइटली वर्कफ़्लो (शेड्यूल्ड, एडवाइज़री)

ये क्रॉन शेड्यूल (और `workflow_dispatch`) पर चलते हैं, कभी PR पर नहीं। सभी एडवाइज़री हैं।

| वर्कफ़्लो              | मान्य करता है                                                                                                                                                        | अवरोधन      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | यादृच्छिक सीड + उच्च रन संख्या के साथ fast-check प्रॉपर्टी परीक्षण                                                                                                   | **सलाहकार** |
| `nightly-resilience`   | हीप-ग्रोथ गेट, कैओस फ़ॉल्ट-इंजेक्शन, k6 लोड/सोक                                                                                                                      | **सलाहकार** |
| `nightly-llm-security` | promptfoo इंजेक्शन गार्ड (ब्लॉक मोड) + garak प्रोब (प्रोवाइडर सीक्रेट के बिना स्किप किए जाते हैं)                                                                    | **सलाहकार** |
| `nightly-schemathesis` | `docs/openapi.yaml` का उपयोग करके लाइव OmniRoute के विरुद्ध OpenAPI कॉन्ट्रैक्ट फ़ज़िंग (schemathesis) — स्पेक उल्लंघन / अनहैंडल्ड 500 को उजागर करता है (Fase 8 B.4) | **सलाहकार** |
| `nightly-mutation`     | फ़ास्ट यूनिट लेन पर Stryker म्यूटेशन-टेस्टिंग स्कोर — बचे हुए म्यूटेंट कमज़ोर असर्ट को उजागर करते हैं                                                                | **सलाहकार** |
| `nightly-compat`       | समर्थित `engines.node` रेंज के पार Node इंजन संगतता मैट्रिक्स                                                                                                        | **सलाहकार** |

प्रदर्शन बेसलाइन (हीप, TTFB, बिल्ड समय) दर्ज की जाती हैं, गेट नहीं की जातीं: देखें [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)।

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

## अनुमतिसूची नीति

पहले से मौजूद उल्लंघनों पर विफल न हो सकने वाला प्रत्येक गेट एक स्थिर अनुमतिसूची का उपयोग करता है
(जैसे, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। नीति यह है:

**मूल कारण ठीक करें; अनुमतिसूची का उपयोग केवल तभी करें जब उल्लंघन पहले से मौजूद हो और
उसे उसी PR में ठीक न किया जा सके।**

अनुमतिसूची में कोई प्रविष्टि जोड़ते समय:

1. औचित्य सहित एक टिप्पणी शामिल करें।
2. ट्रैकिंग इश्यू का संदर्भ दें (जैसे, `// #3498 — चरण 2 की सुविधा, अभी तक लागू नहीं की गई`)।
3. उल्लंघन ठीक करने वाले उसी PR में प्रविष्टि हटाएँ — ऐसी अप्रचलित प्रविष्टि, जो अब किसी
   सक्रिय उल्लंघन को दबाती नहीं है, स्वयं एक दोष है (लागू होने के बाद 6A.3 अप्रचलित-प्रवर्तन
   किसी अनाथ अनुमतिसूची प्रविष्टि पर गेट को विफल कर देगा)।

परीक्षणों को जल्दी पास कराने के लिए अनुमतिसूची प्रविष्टियाँ **न जोड़ें**। बढ़ती हुई
अनुमतिसूची के साथ हरा गेट गुणवत्ता का झूठा आभास देता है।

### जब आपके PR पर कोई गेट विफल हो

1. **गेट का आउटपुट ध्यान से पढ़ें** — यह आपको सटीक रूप से बताता है कि किस फ़ाइल या प्रतीक ने
   नियम का उल्लंघन किया।
2. **उल्लंघन ठीक करें** — अधिकांश गेट नियतात्मक फ़ाइल-सिस्टम जाँच हैं, जो कोड सही होते ही
   पास हो जाती हैं।
3. **यदि उल्लंघन पहले से मौजूद है** (अर्थात, आपने इसे प्रस्तुत नहीं किया, लेकिन अब गेट
   इसे कवर करता है): औचित्य वाली टिप्पणी और ट्रैकिंग इश्यू के साथ अनुमतिसूची प्रविष्टि जोड़ें।
4. **यदि गेट रैचेट है** (कवरेज, ESLint चेतावनियाँ, दोहराव, जटिलता):
   आपके बदलाव ने मेट्रिक को खराब किया है। अंतर्निहित समस्या ठीक करें, या (दुर्लभ मामलों में)
   यदि बदलाव जानबूझकर किया गया है और मेट्रिक में गिरावट स्वीकार्य है, तो
   `npm run quality:ratchet -- --update` चलाएँ — लेकिन PR विवरण में इसका कारण दर्ज करें।
5. **परामर्शात्मक गेट** (`continue-on-error: true`) केवल सूचनात्मक होते हैं — वे
   मर्ज को अवरुद्ध नहीं करते, लेकिन CI सारांश में दिखाई देते हैं। फिर भी उन्हें ठीक करें।

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

## युक्तिसंगतीकरण बैकलॉग (ROI समीक्षा — चरण 9 तरंग 3)

इस इन्वेंट्री का मिलान 2026-06-17 को `ci.yml` से किया गया था (पिछले संस्करण में
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` छूट गए थे)। मिलान किए गए सेट की ROI समीक्षा
में निम्नलिखित युक्तिसंगतीकरण उम्मीदवारों की पहचान हुई। **मर्ज यांत्रिक CI
परिवर्तन हैं; फ्लिप/हटाने के निर्णय ऑपरेटर के लिए आरक्षित नीतिगत निर्णय हैं।** नीचे दिया गया
कुछ भी अभी लागू नहीं किया गया है।

**ऊपर ये भी प्रलेखित नहीं हैं** (परामर्शी, कम संकेत): `docs-lint` जॉब
(markdownlint + Vale, पूरे जॉब पर `continue-on-error`) और स्वतंत्र स्कैनर वर्कफ़्लो
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0`
`quality-baseline.json` में है, लेकिन `ci.yml` में किसी अवरोधक रैचेट से जुड़ा नहीं है — यह मेट्रिक
फ़िलहाल अनाथ है।

### मर्ज / डुप्लीकेशन हटाना (यांत्रिक, कम जोखिम)

प्रत्येक उम्मीदवार को 2026-06-17 को लाइव गेट स्थिति के विरुद्ध सत्यापित किया गया था (भरोसा करें, लेकिन सत्यापित भी करें);
कई "स्पष्ट" मर्ज वास्तव में छिपे हुए ऋण वाले निकले और **साफ़-सुथरे प्रत्यक्ष प्रतिस्थापन नहीं** हैं।

- **`check:docs-sync` दो बार चलता है** — `lint` जॉब में स्वतंत्र रूप से और फिर `check:docs-all` (`docs-sync-strict`) तथा husky pre-commit हुक के भीतर। ✅ **पूर्ण** — स्वतंत्र `lint` इनवोकेशन हटा दिया गया।
- **CVE स्कैनिंग** — ❌ **साफ़ मर्ज नहीं है।** `audit:deps` किसी भी high/critical CVE पर हार्ड-फेल होता है; `check:vuln-ratchet` (osv) केवल बेसलाइन की तुलना में किसी _प्रतिगमन_ पर विफल होता है (वर्तमान में 1 MODERATE)। अर्थविज्ञान अलग हैं — `audit:deps` हटाने से निरपेक्ष high/critical गेट समाप्त हो जाएगा। दोनों को रखें।
- **चक्र पहचान** — ✅ **पूर्ण** (#15159 G-01/G-02)। यहाँ पुराने पाठ में `check:cycles` को "हरा, चयनित" गेट कहा गया था और इसे अवरोधक बनाए रखने का औचित्य यह दिया गया था कि `check:circular-deps` (dpdm) ने 91 चक्र रिपोर्ट किए थे। वह हरा परिणाम **भ्रामक रूप से हरा** था: `check:cycles` ने 5 उप-डायरेक्टरियाँ (450 फ़ाइलें) स्कैन कीं, केवल स्थिर `import|export … from` का मिलान किया, और प्रत्येक `@/` तथा `@omniroute/open-sse/` स्पेसिफ़ायर को छोड़ दिया, इसलिए यह उन dynamic-import + alias चक्रों को नहीं देख सका जो रिपॉज़िटरी में प्रमुख थे। सुधार किया गया: गेट अब `src` + `open-sse` (5023 फ़ाइलें) को ट्रैवर्स करता है, TypeScript AST से स्पेसिफ़ायर एकत्र करता है (इसलिए `import("…")` गिना जाता है और टाइप-स्थिति वाला `typeof import("…")` नहीं), और tsconfig `paths` को रिज़ॉल्व करता है। इसे 0 नहीं, बल्कि **14** चक्र मिलते हैं। चूँकि गेट PR में पहले से मौजूद 14 चक्र ठीक नहीं किए जा सकते, इसलिए `check:cycles` अब एक **रैचेट** है (`--ratchet`, `quality-baseline.json` में अधिकतम सीमा `metrics.cycles.value = 14`, `direction: down`) — यह किसी भी _प्रतिगमन_ को रोकता है और संख्या केवल घट सकती है। CI `npm run check:cycles:ratchet` चलाता है। क्रमिक कमी **A-01** के साथ चलेगी। व्यापक द्वितीय राय के रूप में `check:circular-deps` (dpdm) परामर्शी बना रहेगा।
- **जटिलता** — ✅ **पूर्ण** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint ट्रैवर्सल, `ruleId` के आधार पर गणना ताकि cyclomatic+max-lines और cognitive बेसलाइन स्वतंत्र रहें; अलग-अलग `check:complexity` / `check:cognitive-complexity` स्थानीय `--update` के लिए बने रहेंगे।
- **`/api` एंटी-हैलुसिनेशन** — ✅ **पूर्ण** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` की एक FS इन्वेंट्री, openapi-routes + docs-symbols अब भी स्वतंत्र रूप से रिपोर्ट करते हैं; अलग-अलग जाँचें स्थानीय रन के लिए बनी रहेंगी।
- **`check:node-runtime` 11 जॉब में चलता है** — ⚠️ **कम ROI।** प्रत्येक एक अलग रनर है और जाँच <1s की है; सस्ती प्रति-जॉब सुरक्षा खोने के मुकाबले कुल बचत ~10s है। इतने बदलाव के लायक नहीं है।
- **CI lint पर `typecheck:noimplicit:core`** — ✅ **lint जॉब से हटा दिया गया** (यह परामर्शी `continue-on-error` था); अवरोधक टाइप सतह `typecheck:core` + `check:type-coverage` है। स्थानीय स्क्रिप्ट बरकरार रखी गई।

### फ्लिप / निर्णय (ऑपरेटर नीति)

- `check:openapi-security-tiers` (परामर्शी) — ❌ **साफ़ तौर पर फ्लिप करने योग्य नहीं।** यह 0 के साथ समाप्त होता है, लेकिन चेतावनी देता है कि `LOCAL_ONLY_API_PREFIXES` के अंतर्गत कई `traffic-inspector` रूट में `x-loopback-only: true` एनोटेशन नहीं है। इसे लागू करने से पहले उन एनोटेशन को `openapi.yaml` में जोड़ना आवश्यक है।
- `typecheck:noimplicit:core` (परामर्शी) — अवरोधक `check:type-coverage` रैचेट में काफ़ी हद तक समाहित है। इसे रैचेट में फ्लिप करें या अनावश्यक दूसरे `tsc` पास को हटा दें।
- `test:vitest:ui` (अब **अवरोधक**) — पहले से मौजूद विफलताओं को `vitest.config.ts` में `// #8618` ट्रैकिंग टिप्पणियों के साथ स्पष्ट रूप से बाहर रखा गया है; नई विफलताएँ जॉब को विफल करती हैं।
- `check:secrets` (gitleaks, 3 प्रलेखित false-positive पर स्थिर अवरोधक रैचेट) — 0 तक पहुँचने के लिए उन 3 को allowlist करें, या इसे परामर्शी स्तर पर घटाएँ। GitHub की मूल secret-scanning + `check:public-creds` के साथ ओवरलैप करता है।
- `check:pr-evidence` (अवरोधक, PR-body गद्य पर grep करता है) — false-positive का उच्च जोखिम; हटाने पर Hard Rule #18 का प्रवर्तन कमज़ोर होता है, इसलिए यह वास्तव में नीतिगत निर्णय है।
- `semgrep` (परामर्शी स्वतंत्र जाँच) — OWASP श्रेणियों के लिए CodeQL के साथ ओवरलैप करता है; इसकी बेसलाइन को किसी रैचेट से जोड़ें या इसे हटा दें।

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
