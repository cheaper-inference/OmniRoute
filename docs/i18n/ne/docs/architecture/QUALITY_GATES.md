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

## गेट सूची र कार्यान्वयन प्रोफाइल

### उम्मेदवार भर्ना

CI र क्वालिटी गेट्स कार्यप्रवाहहरूले प्रत्येक स्थिर निर्णय उत्सर्जन गर्दछ: `Gate / CI` र `Gate / Quality`। तिनीहरूको संस्करण भर्ना नीतिले प्रत्येक अपस्ट्रीम कार्यलाई आवश्यक वा सल्लाहकारको रूपमा गणना गर्दछ। एक लागू आवश्यक काम सफल हुनुपर्दछ: हराएको, रद्द गरिएको, छोडिएको, पेन्डिङ र अज्ञात परिणामहरूले PASS स्थापना गर्न सक्दैन। वैध कागजात-मात्र वा क्याटलग-मात्र वर्गीकरणले कोड लेनलाई लागू नहुन सक्छ; ड्राफ्ट PR स्वीकार्य उम्मेद्वार होइन। एक `hotfix` लेबल प्रमाण माफ गर्दैन।

दुबै कार्यप्रवाहले PRs main/release शाखाहरूमा कभर गर्दछ, `main` मा पुश, म्यानुअल डिस्प्याच र मर्ज-समूह घटनाहरू। पुश, डिस्प्याच र मर्ज-समूह पूर्ण चयन चलाउनुहोस्। `release/**` मा पुश गर्दा तिनीहरूलाई सुरु गर्दैन (2026-10-18): प्रत्येक परिवर्तनले पहिले नै यसको PR मा म्याट्रिक्स चलाएको छ र मर्ज गरिएको संयोजन रिलीज-ग्रीनको काम हो (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन)। फोर्क्स र मर्ज समूहहरूले कामका लागि होस्टेड धावकहरू प्रयोग गर्छन् जसले अन्यथा सेल्फ-होस्टेड धावकहरू चयन गर्छन्; रोलआउट गर्नु अघि पर्याप्त होस्ट गरिएको क्षमता प्रमाणित गरिनु पर्छ।

एक साधारण PR छिटो चयन चलाउँछ। भर्ना नीतिको `full-code` र `full-code-e2e` लेनहरू (E2E, एकीकरण, प्याकेज आर्टिफ्याक्ट, Electron धुवाँ, Bun SQLite, इकोसिस्टम र प्रोटोकल क्लाइन्टहरू) केवल मर्जिफाइ क्यु ड्राफ्टमा वा पूर्ण रूपमा चल्छन्: `gh workflow run ci.yml --ref <branch>`।

प्रत्येक JSON रसिदले चेक-आउट SHA, कार्यप्रवाह रन र प्रयास पहिचान गर्दछ। CLI ले checkout/event SHA बेमेललाई अस्वीकार गर्दछ। कार्यप्रवाह परीक्षणहरूले नीति सदस्यतालाई निर्णय कार्यको `needs` सूचीमा बाँध्न्छन् त्यसैले नयाँ वा हटाइएको लेन चुपचाप हराउन सक्दैन। रसिदहरूले तिनीहरूको आफ्नै कार्यप्रवाहलाई कभर गर्दछ, प्रकाशन, तैनाती, वा अवस्थित सल्लाहकार स्क्यानरको आन्तरिक। शाखा नियमहरूमा दुबै चेक नामहरू सक्रिय गर्नु छुट्टै प्रशासनिक परिवर्तन हो; यी कामहरू थप्नु आफैमा शाखाको सुरक्षा गर्दैन।

### लाम मर्ज गर्नुहोस्

`queue` लेबलले PR लाई Mergify कतारमा पठाउँछ (`.mergify.yml`)। Mergify ले `mergify/merge-queue/` शाखामा ड्राफ्ट PR खोल्छ, CI त्यहाँ पूर्ण चयन चलाउँछ, र `Gate / CI`, `Gate / Quality` र `Merge integrity (changelog + generated skills)` पास हुँदा मूल PR मर्ज हुन्छ।

Mergify ले मस्यौदाको विवरणमा आफ्नो लाइन सारांश लेख्छ, र अन्य एपहरूले पनि यसलाई सम्पादन गर्न सक्छन्। यस्तो मस्यौदामा भएको `pull_request` `edited` घटनाले आफ्नै समवर्ती समूह (`-queue-edit-<run_id>`) लिन्छ त्यसैले यसले ड्राफ्टको वास्तविक रन रद्द गर्न सक्दैन, र यसले गेट र म्याट्रिक्स छोड्छ। केवल `Merge integrity` अझै चल्छ। स्किप गरिएको गेट कार्यले फरक चेक नाम बोक्छ, किनभने Mergify ले स्किप गरिएको `Gate / CI` असफल चेकको रूपमा पढ्छ र PR डेक्यु गर्छ।

डेक्यु पछि, धक्काले सधैं PR अनुरोध गर्दैन। यसमा `@mergifyio queue` कमेन्ट गर्नुहोस्।

### स्वीकृति रिड्यूसरमा प्रमाण राखिएको छ

`scripts/quality/validate-release-acceptance.mjs` आपूर्ति योजना र यसको प्रकटीकरण घटाउँछ; यो योजनाले पूर्ण विमोचन पाइपलाइनलाई समेट्छ भनेर स्थापित गर्दैन। यसको रिपोर्टहरूले स्पष्ट रूपमा `releaseAcceptance: false` सेट गर्दछ, त्यो योजना `VERIFIED` भए पनि। `release-acceptance.yml` कार्यप्रवाहले अझै पनि छाया फिक्स्चरहरू प्रयोग गर्दछ, वास्तविक निर्माण, प्याकेज, बुट वा पदोन्नति रसिदहरू होइन।

CLI राखिएको प्रमाण प्रमाणित गर्न `--evidence-root` आवश्यक छ। फाइलहरू `<evidence-root>/<artifact_id>/<member>` को रूपमा समाधान गरिन्छ र SHA-256 को रूपमा ह्यास गरिन्छ। प्रमाण बिनाको PASS रेकर्ड, हराइरहेको वा परिवर्तन गरिएको फाइल, असुरक्षित मार्ग वा सिमलिङ्कले प्रमाणीकरणलाई रोक्छ। छुटेका फाइलहरू खाली सफल लगहरूसँग बराबर छैनन्। अवस्थित SHA/run/attempt जाँचहरू स्वतन्त्र रहन्छन्: मिल्दो बाइटहरूले बासी रसिदलाई बचाउन सक्दैन। फाइल अखण्डता निष्पादन प्रामाणिकता वा कलाकृति पदोन्नति को प्रमाण होइन।

### स्थिर स्क्यान सूची

संस्करण गरिएको npm-alias सूची र स्थिर-स्क्यान सदस्यता `config/quality/gate-manifest.json` मा लाइभ छ। `package.json` विरुद्ध लिपि नामहरू र सही आदेशहरू प्रमाणित गर्न `npm run check:gate-manifest` चलाउनुहोस्; थप, हटाउने र कमाण्ड ड्रिफ्टले CI मा स्थानीय हुक र परिवर्तन-वर्गीकरण कार्यहरू दुवै असफल हुन्छ। उपनाम कार्यप्रवाह कार्य, म्याट्रिक्स उदाहरण वा परीक्षण केस होइन: यी गणनाहरू आदानप्रदान योग्यको रूपमा प्रस्तुत गरिनु हुँदैन।

तिनीहरूलाई कार्यान्वयन नगरी चयन गरिएका उपनामहरू निरीक्षण गर्न `npm run quality:scan -- --list` वा `npm run quality:scan:fast -- --list` प्रयोग गर्नुहोस्। धावकले npm प्रविष्टि बिन्दुलाई आह्वान गर्दछ, त्यसैले यसको रनटाइम (जहाँ कन्फिगर गरिएको Bun सहित) सुरक्षित हुन्छ। म्यानिफेस्टले ती प्रोफाइलहरू बाहिरका उपनामहरूलाई अलग-अलग बोलाइएको रूपमा रेकर्ड गर्दछ, र मर्मत आदेशहरू पढ्न-मात्र स्क्यान प्रोफाइलहरूमा निषेधित छन्।

यी प्रोफाइलहरूले स्थिर स्क्यान मात्र कभर गर्दछ। तिनीहरूले उत्पादन परीक्षण, कभरेज, प्याकेजिङ्ग, बाह्य जाँच वा उम्मेद्वारको पूर्ण रिलीज स्वीकृति प्रमाणित गर्दैनन्। कार्यप्रवाह प्रवेशले लिङ्क गरिएको `config/quality/admission-policy.json` र `scripts/quality/admission-verdict.mjs` प्रयोग गर्दछ। रिलीज-पर्यवेक्षक प्रोफाइलहरू अलग रहन्छन्; तिनीहरूको लागू चेक र रसिदहरू स्वतन्त्र रूपमा निरीक्षण गर्नुहोस्। पूर्ण पर्यवेक्षकको स्थिर आदेशहरू `config/quality/release-green-static-profile.json` मा घोषित गरिन्छ, `audit:deps`, उत्परिवर्तन-परीक्षण चयन र अनुवाद जाँचहरू सहित। लोडरले package.json र मोडेल गरिएको CI/Quality घोषणाहरू विरुद्ध npm आदेशहरू मान्य गर्दछ; यसले तर्कको रूपमा शेल टोकनहरू कार्यान्वयन गर्नुको सट्टा बहावलाई अस्वीकार गर्दछ। आवश्यक स्क्यानर SKIP/INCOMPLETE आउटपुटले PASS स्थापना गर्न सक्दैन। प्रोफाइलले यसको बाह्य बहिष्कारहरू रेकर्ड गर्दछ र होस्ट गरिएको कभरेज, परीक्षण म्याट्रिक्स, प्याकेज वा तैनाती प्रमाणहरू प्रतिस्थापन गर्दैन। तलको गद्य सूची एउटा सन्दर्भ हो, गेट वास्तवमा दौडिएको प्रमाण होइन।

लिपिहरू `scripts/check/` (नीति गेट्स) र `scripts/quality/` (रचेट इन्जिन) अन्तर्गत रहन्छन्। सत्यको CI स्रोत `.github/workflows/ci.yml` हो।

### PR द्रुत मार्ग (`quality.yml`) जारी गर्नुहोस्

`.github/workflows/quality.yml` main/release PRs मा CI पूरक बनाउँछ, `main` मा धकेल्छ, प्रेषण र समूहहरू मर्ज गर्दछ। PRs पथ-फिल्टर गरिएको द्रुत जाँचहरू प्रयोग गर्दछ। स्थायी रूपमा असक्षम डुप्लिकेट निर्माण हटाइयो; वास्तविक build/package/boot चेकहरू CI मा रहन्छ। एकाइ सुइट र vitest CI (`Unit Tests (N/8)` र `Vitest`) मा मात्र चल्छ।

| जागिर                                            | स्कोप                                                                                                                    | अवरुद्ध गर्दै     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API कागजात refs र कागजात-सबै                                                                              | हो                |
| `Fast Quality Gates`                             | कोड PRs; स्थिर जाँचहरू, टाइपचेक, ड्यासबोर्ड टाइपचेक, प्रभावित एकाइ परीक्षणहरू, बिर्सिएका भाइबहिनी परीक्षणहरू (सल्लाहकार) |
| `No new ESLint warnings`                         | कोड PRs; दमन-सचेत लिन्ट गार्ड                                                                                            | हो, फोर्कहरू सहित |
| `Merge integrity (changelog + generated skills)` | गैर-ड्राफ्ट PRs; changelog र उत्पन्न कौशल सिंक                                                                           | हो, फोर्कहरू सहित |

#### बिर्सिएको भाइबहिनी परीक्षण रिपोर्ट

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` को सल्लाहकार चरणको रूपमा चल्छ र परीक्षण-प्रभाव नक्सा पछाडि आयात समाधानकर्ता पुन: प्रयोग गर्दछ। प्रत्येक परिवर्तन गरिएको उत्पादन मोड्युलको लागि, यसले निर्धारक `changed module/symbol -> static consumer -> candidate sibling test` चेनहरू रिपोर्ट गर्दछ जब उम्मेद्वार परीक्षण पुल-अनुरोध भिन्नताबाट अनुपस्थित हुन्छ। मार्कडाउन सारांश र JSON नतिजा कुनै पनि अवरुद्ध रोलआउट अघि क्यालिब्रेसनको लागि `forgotten-sibling-tests` कार्यप्रवाह कलाकृतिको रूपमा राखिएको छ।

ब्यारेल पुन: निर्यात र गतिशील आयात मात्र संकल्प निदान हो; तिनीहरूले कहिल्यै अवरोध खोज सिर्जना गर्दैनन्। समीक्षा गरिएका अपवादहरू `config/quality/forgotten-sibling-allowlist.json` मा लाइभ छन्। प्रत्येक प्रविष्टिले उपभोक्ता र उम्मेदवार परीक्षणको नाम दिनु पर्छ, एक विशिष्ट तर्क दिनुहोस्, र GitHub मुद्दा वा पुल अनुरोध लिङ्क गर्नुहोस्। विकृत प्रविष्टिहरू असफल बन्द। अपवादहरूले मेटाइएको उम्मेद्वार परीक्षण वा `.skip`/`.todo` थप्ने भिन्नतालाई दबाउन सक्दैन; दाबी कमजोर र अन्य मास्किङ स्वतन्त्र रूपमा अवरुद्ध `check:test-masking` गेटको स्वामित्वमा रहन्छ।

### काम: `lint`

प्रत्येक PR देखि `main` मा चल्छ। ब्लकहरू विफलतामा मर्ज हुन्छन्।

| लिपि (`npm run ...`)              | प्रमाणीकरण गर्दछ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | अवरुद्ध गर्दै                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | Node.js संस्करण समर्थित दायरा भित्र छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                     |
| `check:cycles`                    | सबै `src/` + `open-sse/` (AST-आधारित, tsconfig `paths` समाधान गरिएको) मा सर्कुलर आयातहरू। कुनै पनि चक्र अवस्थित हुँदा Bare 1 बाट बाहिर निस्कन्छ ( #15281 देखि असफल बन्द) र SCCs लाई सूचीबद्ध गर्दछ। `check:cycles:ratchet` (के CI चल्छ) ब्लक हुन्छ जब गणना `quality-baseline.json` — हाल 14, `direction: down` मा `metrics.cycles` छत नाघेको छ, त्यसैले यो मात्र खस्न सक्छ (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हो (रैचेट)                             |
| `check:boundary`                  | `open-sse → src` युग्मन: एपमा इन्जिनबाट फाइल-टु-फाइल आयातहरू (`scripts/quality/measure-boundary.mjs`; किनारा सूची v4 core/module-split remediation ब्याकलग हो)। Bare = सल्लाहकार रिपोर्ट ( `quality:boundary` जस्तै)। `check:boundary:ratchet` (के CI चल्छ, `quality.yml` फास्ट-गेट्स र्याचेट लुपमा पनि) ब्लक हुन्छ जब गणना `quality-baseline.json` — मा `metrics.boundaryOpenSseToSrc` छत नापेको 771 मा `direction: down`; `--update` मात्र यसलाई कम गर्छ; PRs मा आधार-सापेक्ष (`--base-ref`, तल हेर्नुहोस्)                                                                                                                                                                                                                                                                                                                                                        | हो (रैचेट)                             |
| `check:route-validation:t06`      | Zod योजनाहरू सबै मार्गहरूमा उपस्थित छन् (टियर 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` गणना बजेट भन्दा बढी छैन (टियर 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                     |
| `check:provider-consistency`      | `providers.ts` मा प्रत्येक प्रदायकसँग `providerRegistry.ts` मा मिल्दो प्रविष्टि छ (र यसको विपरीत, अनुमति सूची भित्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                     |
| `check:model-lifecycle`           | तीनवटा ह्यान्ड-मेन्टेन राउटिङ तालिकाहरू चेक-इन गरिएको लाइफसायकल स्न्यापसट (#11503) सँग एकरूप रहन्छन् : `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` ले रुट गर्न सक्ने कुनै रिटायर आइडी स्कोर गर्दैन; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` मा उपस्थित छ र रिटायर-आईडी स्न्यापसटबाट अनुपस्थित छ; `REGISTRY` मा रहेको प्रत्येक सेवानिवृत्त आईडी `allowedRetiredInCatalog` मा फर्वार्ड वा सूचीबद्ध गरिएको छ; र त्यो स्न्यापसटमा कुनै `DEFAULT_DEGRADATION_MAP` स्रोत वा लक्ष्य रिटायर भएको देखिँदैन। यसले प्रमाणित गर्दैन कि मोडेल हाल प्रत्यक्ष अपस्ट्रीम द्वारा सेवा गरिएको छ। अफलाइन — `config/quality/model-lifecycle.json` विरुद्ध तुलना गर्दछ, `npm run quality:refresh-model-lifecycle` (नेटवर्क; CI मा तार नभएको) सँग हातले ताजा गरिएको। `allowedRetiredInCatalog` एक बर्न-डाउन र्याचेट हो: ट्र्याकिङ मुद्दाको साथ मात्र प्रविष्टि थप्नुहोस्।          | हो                                     |
| `check:fetch-targets`             | ग्राहक-साइड `src/` मा प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` मा समाधान गर्दछ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                     |
| `check:deps`                      | सबै `npm install` -able deps रेपोमा प्रत्येक `package.json` मा `dependency-allowlist.json` मा छन्; नयाँ अनपिन वा स्लोप्सक्वाटेड प्याकेजहरू झण्डा लगाइयो                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                     |
| `audit:deps`                      | सबै पाँच स्वतन्त्र लकफाइलहरूको npm अडिट (रूट, Electron, OpenCode प्लगइनहरू v1/v2 र प्रदायक)। आलोचनात्मक सल्लाह ब्लक; उच्च सल्लाहहरू देखिने चेतावनीहरू रहन्छन्। Missing/failed अडिटहरू INCOMPLETE र ब्लक हुन्; प्रति-स्कोप लक ह्यासहरू र रिपोर्टहरू राखिएका छन्।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                     |
| `check:lockfile`                  | `package-lock.json` integrity — https रजिस्ट्री, इन्टिग्रिटी ह्यास, कुनै होस्ट ओभरराइड छैन                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | हो                                     |
| `check:licenses`                  | उत्पादन निर्भरताहरूको लागिSPDX लाइसेन्स अनुमति सूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                     |
| `check:tracked-artifacts`         | कुनै निर्माण कलाकृतिहरू / प्रतिबद्ध `node_modules` सिमलिङ्कहरू छैनन् (हस्की प्रि-कमिटमा पनि चल्छ; पूर्व-पुश जानाजानी हल्का — #6716 हो)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                     |
| `check:ai-attribution`            | PR कमिट, शीर्षक वा बडी — हार्ड नियम #16 मा कुनै AI/bot `Co-Authored-By` ट्रेलर वा AI-जेनेरेसन फुटर छैन `commit-msg` PR→ `release/**` — को लागि `quality.yml` फास्ट-गेट्स लुपमा घटना पेलोड पढ्छ, no-op off PRs — -PR र in `ci.yml` PR→; मानव सह `main` लेखकहरूलाई पनि अनुमति दिइएको छ #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | प्रत्येक Vitest बहिष्करणले ट्र्याकिङ समस्याको नाम दिन्छ र `config/quality/vitest-exclusions.json` (#13204) मा देखिन्छ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                     |
| `check:file-size`                 | स्रोत फाइलहरू (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` भित्र र परीक्षण फाइलहरू (`*.test.ts(x)`) `testCap` भित्र रहन्छन् ; `file-size-baseline.json` (`frozen` / `testFrozen`) मा फ्रिज गरिएका फाइलहरू तिनीहरूको रेकर्ड गरिएको आकारभन्दा अघि बढ्नु हुँदैन।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | हो                                     |
| `check:error-helper`              | executors/handlers मा त्रुटि प्रतिक्रियाहरू `buildErrorBody()` / `sanitizeErrorMessage()` प्रयोग गर्दछ (हार्ड नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                     |
| `check:migration-numbering`       | माइग्रेसन फाइल नामहरू: पुरानो `001`–`241` शृङ्खलाहरू स्थिर छन् र नयाँ फाइलहरू `YYYYMMDDHHMMSS_<description>.sql` छन्। PR आधारको विरुद्धमा यसले हटाइएको माइग्रेसन, अनुकूलता प्रविष्टि बिना पुन: नामाकरण गरिएको, र अन्तिम स्कीमा कम्युट गर्दैन एक आउट-अफ-अर्डर वा सम्पादनलाई अस्वीकार गर्दछ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:public-creds`              | `publicCreds.ts` बाहिर कुनै शाब्दिक OAuth `client_id`/`client_secret` वा फायरबेस वेब कुञ्जीहरू छैनन् (हार्ड नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                     |
| `check:db-rules`                  | `src/lib/db/` मोड्युल बाहिर कुनै कच्चा SQL छैन; `localDb.ts` बाट ब्यारेल-आयात छैन (हार्ड नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                     |
| `check:known-symbols`             | प्रदायक निष्पादकहरू, राउटिंग रणनीतिहरू, र तिनीहरूको प्रेषण तालिकाहरूमा दर्ता गरिएका अनुवादकहरू डिस्क — कुनै अनाथ वा अघोषित प्रतीकहरूमा फाइलहरूसँग मेल खाँदैनन्।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                     |
| `check:route-guard-membership`    | प्रत्येक मार्ग जसले बच्चा प्रक्रियालाई जन्म दिन्छ `isLocalOnlyPath()` (कडा नियम #15/#17) द्वारा वर्गीकृत गरिन्छ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                     |
| `check:test-discovery`            | रेपोमा प्रत्येक `*.test.ts` / `*.spec.ts` फाइल कम्तिमा एक परीक्षण धावक द्वारा सङ्कलन गरिन्छ (ratchet: `test-discovery-baseline.json` मा अनाथ सूची मात्र संकुचित हुन सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                     |
| `check:test-tla-order`            | `tests/unit` अन्तर्गत कुनै `node:test` फाइलले परीक्षण दर्ता गर्दैन, शीर्ष-स्तर `await` मा हिट गर्छ, त्यसपछि थप दर्ता गर्दछ (#18045; ratchet: `test-tla-order-allowlist.json` मात्र संकुचित हुन सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                     |
| `check:agent-skills-sync`         | उत्पन्न एजेन्ट-कौशल कलाकृतिहरू तिनीहरूको स्रोत सूचीसँग मेल खान्छ (कुनै बहाव छैन)। रिलीज मोडले हरेक कौशल जाँच गर्दछ; एक सुविधा PR (`pr` मोड) ले केवल सीपहरू जाँच गर्दछ जसको उत्पन्न पाठ यसले — लाई सम्पादन गर्दछ [जेनरेट गरिएका फाइलहरू र व्युत्पन्न आधार रेखाहरू](#generated-files-and-derived-baselines-written-at-release) हेर्नुहोस्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | प्रदायक logos/assets ले रेकर्ड गरिएको प्रोभेन्स प्रविष्टि बोक्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON कन्फिगरेसन फाइलहरू पार्स गर्नुहोस् र रेपो लिन्ट नियमहरू पूरा गर्नुहोस्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | त्रुटि बिनाTypeScript संकलन (सल्लाहकारी चेतावनी मात्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                     |
| `typecheck:noimplicit:core`       | कडा `noImplicitAny` — अग्रगामी; धेरै पूर्व-अवस्थित कल साइटहरूलाई अझै एनोटेसनहरू चाहिन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **सल्लाह** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core` को क्युरेट गरिएको 27-फाइल अनुमति सूचीमा कुनै पनि ड्यासबोर्ड TSX समावेश छैन, र `next build` यसलाई कहिले पनि टाइप-जाँच गर्दैन (`next.config.mjs` सेट गर्दछ `ignoreBuildErrors: true`), त्यसैले अनाथ-पहिचानकर्ता रिग्रेसनहरू त्यहाँ (#6625/#6909CI. फ्रिज गरिएको per-file/per-TS-code गणना आधार रेखा (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` जस्तै बासी-प्रवर्तन ढाँचा ) NEW — गेट असफल हुन्छन्; पूर्व-अवस्थित त्रुटि फिक्स हुँदा `--update` सँग र्याचेट डाउन।                                                                                                                                                                                                                                                                                                   | हो                                     |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), सतह `typecheck:core` को 27-फाइल अनुमति सूची र ड्यासबोर्ड गेटले कभर गर्दैन। `config/quality/build-typecheck-baseline.json` विरुद्ध भिन्नता; नयाँ वा बढेको प्रति-(फाइल, कोड) गणना असफल हुन्छ, कम गणनाले तपाईंलाई र्याचेट गर्न सोध्छ। रनमा `--force-regressions` पास नभएसम्म नयाँ वा उठाइएको जोडी समावेश हुँदा `--update` अस्वीकार गर्दछ, र `--force-nocheck` पास नभएसम्म नयाँ मौन फाइल अस्वीकार गर्दछ, त्यसैले हरियो प्राप्त गर्न आधाररेखा फराकिलो बनाउन र स्थायी मौन प्रदान गर्नु दुई छुट्टै जानाजानी कार्यहरू हुन्। एक खाली `--force` अस्वीकार गरिएको छ। `config/quality/ts-nocheck-baseline.json` बिरूद्ध `@ts-nocheck` को लागि निर्माण स्कोप पनि स्क्यान गर्दछ, किनकि यसलाई प्रयोग गर्ने फाइलले कुनै पनि निदान रिपोर्ट गर्दैन र अन्यथा प्रत्येक गेटमा अदृश्य हुनेछ। | हो                                     |

#### दुई टाइपचेक कार्यक्रमहरू फरक जवाफ दिन्छन्

`typecheck:core` र `check:build-typecheck` विभिन्न विकल्पहरू अन्तर्गत विभिन्न कार्यक्रमहरू कम्पाइल गर्दछ, र एउटै फाइल एउटामा सफा र अर्कोमा त्रुटिहरूले भरिएको हुन सक्छ।

`tsconfig.build.json` `"strict": false` सेट गर्छ, त्यसैले `noImplicitAny` बन्द छ। कोर कन्फिगरेसनले कडा विकल्पहरूको साथ क्युरेट गरिएको 27-फाइल अनुमति सूची कम्पाइल गर्छ र प्रत्येक प्रविष्टिको आयात ग्राफलाई पछ्याउँछ, त्यसैले निर्माण कार्यक्रममा कहिल्यै नदेखिने फाइलहरू अझै पनि त्यहाँ जाँच गरिन्छ।

फाइल टाइप गरिएको छ कि छैन भनेर निर्णय गर्दा परिणाम महत्त्वपूर्ण छ:** `check:build-typecheck` अन्तर्गत शून्य निदानको मतलब शून्य होइन** । 26 फाइलहरूबाट `@ts-nocheck` स्ट्रिप गर्दा तिनीहरूमध्ये 23 निर्माण कार्यक्रममा सफा देखियो; ती मध्ये सोह्र 120 निहित - कडा एक मा कुनै त्रुटिहरू देखा पर्यो। फाइल सफा गर्नु अघि दुवै जाँच गर्नुहोस्।

### काम: `quality-gate`

`test-coverage` पछि दौडन्छ। ब्लकहरू विफलतामा मर्ज हुन्छन्।

| लिपि                         | प्रमाणीकरण गर्दछ                                                                                                                                                | अवरुद्ध गर्दै          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | इमिट्स `quality-metrics.json` (ESLint चेतावनी गणना, मर्ज गरिएको शार्ड रिपोर्टबाट कभरेज)                                                                         | हो (रैचेटको अपस्ट्रीम) |
| `quality:ratchet`            | `quality-baseline.json` मा प्रत्येक मेट्रिक रिग्रेस गरिएको छैन (ESLint चेतावनी ≤ आधार रेखा; कभरेज ≥ आधार रेखा)                                                  | हो                     |
| `check:duplication`          | कोड नक्कल (jscpd@4) `quality-baseline.json` मा आधारभूत भन्दा बढी छैन                                                                                            | हो                     |
| `check:complexity`           | फाइल-स्तर चक्रीय जटिलता क्याप (कोर ESLint `complexity` + `max-lines-per-function`) भन्दा बढी हुँदैन                                                             | हो                     |
| `check:cognitive-complexity` | संज्ञानात्मक जटिलता र्याचेट (`eslint-plugin-sonarjs`) — अलग ESLint पास; CI रन दुबैलाई एकल `check:complexity-ratchets` चरणको रूपमा मर्ज गरियो                    | हो                     |
| `check:dead-code`            | प्रयोग नगरिएको निर्यात / फाइलहरू र्याचेट (निप) आधार रेखा बनाम रिग्रेस गर्दैन                                                                                    | हो                     |
| `check:compression-budget`   | कम्प्रेसन बेन्चमार्क बजेट — प्रति-इन्जिन टोकन-बचत फ्लोरहरू रिग्रेस हुनु हुँदैन                                                                                  | हो                     |
| `check:type-coverage`        | प्रतिशत-टाइप गरिएको र्याचेट (`type-coverage`) रिग्रेस गर्दैन; ठूलो मात्रामा `typecheck:noimplicit:core` सब्सम गर्दछ                                             | हो                     |
| `check:codeql-ratchet`       | खुला CodeQL अलर्ट गणना रिग्रेस गर्दैन ( `gh api` मार्फत पढिन्छ; टोकन बिना ग्रेसफुल स्किप) — रिफ्रेस क्याडेन्स र म्यानुअल ट्रिगर: तल "CodeQL ratchet" हेर्नुहोस् | हो                     |
| `check:type-scale-ratchet`   | किट प्रकार स्केल: 12 px मुनिको आकार र `src/` मा `font-bold` मात्र तल जान्छ (`typeScaleSubFloorSizes`, `typeScaleFontBold`); पूर्व प्रतिबद्धता हुकमा पनि         | हो                     |

### काम: `quality-extended`

मिश्रित काम, कुनै काम-स्तर `continue-on-error` बिना: `--ratchet` पास गर्ने एक चरणले मापन गरिएको प्रतिगमन बनाम `quality-baseline.json` मा काम असफल हुन्छ। केवल `check:circular-deps` र स्क्यानर स्थापना चरणहरू सल्लाहकार हुन् (चरण-स्तर `continue-on-error: true`)। बाह्य स्क्यानरहरू `gh release download` मार्फत स्थापना हुन्छ; gitleaks अनुपस्थित हुँदा `check:secrets` सेल्फ-स्किप (निकास 0), जबकि `check:vuln-ratchet`, `check:workflows` र `check:openapi-breaking` असफल बन्द हुँदा तिनीहरूको मापन हराइरहेको छ।

| लिपि                     | प्रमाणीकरण गर्दछ                                                                                                                                                                                                         | अवरुद्ध गर्दै                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `check:circular-deps`    | कुनै गोलाकार निर्भरता (dpdm)                                                                                                                                                                                             | **सल्लाह**                                       |
| `check:bundle-size`      | बन्डल आकार टोपी भन्दा बढी छैन; नाप्न नसकिने साइज पनि असफल हुन्छ                                                                                                                                                          | **--ratchet सँग अवरुद्ध गर्दै**                  |
| `check:secrets`          | बाइनरी अनुपस्थित भएमा गोप्य स्क्यानिङ (gitleaks) — स्किप हुन्छ                                                                                                                                                           | **--ratchet सँग अवरुद्ध गर्दै**                  |
| `check:vuln-ratchet`     | निर्भरता कमजोरीहरू (osv-scanner) — `--ratchet` फेल INCOMPLETE (निकास 2) मापन नगरिएको खण्डमा असफल हुन्छ।                                                                                                                  | **--ratchet सँग अवरुद्ध गर्दै**                  |
| `check:workflows`        | कार्यप्रवाह लिन्ट (एक्शनलिन्ट + zizmor); missing/broken स्क्यानरहरू, अमान्य रिपोर्टहरू वा हराएको र्याचेट आधार रेखा INCOMPLETE को रूपमा असफल हुन्छ। वैध निष्कर्षहरू चयन गरिएको strict/advisory/ratchet नीतिको पालना गर्दछ | कार्यान्वयन आवश्यक; CI मा zizmor ratchet अवरुद्ध |
| `check:openapi-breaking` | पिन गरिएको घटना कमिटहरू विरुद्ध सार्वजनिक API अनुबंध (PR मर्ज-बेस, पुश अघि, मर्ज-समूह आधार; scheduled/manual चेकआउट पहिलो अभिभावक); आवश्यक मापन असफल बन्द                                                                | **--ratchet सँग अवरुद्ध गर्दै**                  |

### काम: `docs-sync-strict`

प्रत्येक PR देखि `main` मा चल्छ। ब्लकहरू विफलतामा मर्ज हुन्छन्।

| लिपि                           | प्रमाणीकरण गर्दछ                                                                                                                                      | अवरुद्ध गर्दै                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | मेटा-गेट जसले क्रमिक रूपमा तल 6 उप-गेटहरू चलाउँछ                                                                                                      | हो                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI संस्करण स्थिरता; रिलीज मोड पनि 66 `llm.txt` मिरर र अनुवादित CHANGELOG खण्डहरू (PR मोड: मिरर सहमत)                                 | हो                            |
| ↳ `check:docs-counts`          | गद्यमा गणना (प्रदायक गणना, माइग्रेसन गणना, आदि)। दुई मोडहरू: सुविधामा `pr` PRs, `release` अन्यत्र — तल "व्युत्पन्न मानहरू" हेर्नुहोस्                 | हो                            |
| ↳ `check:env-doc-sync`         | `.env.example` मा प्रत्येक env var कागजात तालिकामा दस्तावेज गरिएको छ, र यसको विपरित                                                                   | हो                            |
| ↳ `check:deprecated-versions`  | कागजातहरूमा कुनै पनि बहिष्कृत संस्करण स्ट्रिङहरू छैनन्                                                                                                | हो                            |
| ↳ `check:doc-links`            | कागजातहरूमा आन्तरिक मार्कडाउन लिङ्कहरू वास्तविक फाइलहरूमा समाधान गर्दछ (`[text]`/`(path)` फारम)                                                       | हो                            |
| ↳ `check:fabricated-docs`      | मार्गहरू, env vars, CLI आदेशहरू, हुक नामहरू, र कागजातहरूमा उद्धृत फाइल मार्गहरू कोडबेसमा अवस्थित छन्। `--strict` मार्फत कडा गेट; झण्डा बिना सफ्ट-फेल। | हो ( `--strict` मार्फत CI मा) |
| `check:cli-i18n`               | CLI `t()` कुञ्जीहरू `bin/cli/locales/en.json` (दुबै मोड) मा अवस्थित छन्; pt-BR / zh-CN / zh-TW समानता `en.json` को साथ रिलीज मोडमा मात्र              | हो                            |
| `check:openapi-coverage`       | OpenAPI spec ले कम्तिमा वास्तविक मार्गहरूको र्याचेटेड फ्लोर कभर गर्दछ                                                                                 | हो                            |
| `check:openapi-security-tiers` | `openapi.yaml` मा सुरक्षा स्तरीय एनोटेसनहरू `routeGuard.ts` वर्गीकरणसँग मिल्दोजुल्दो छन्                                                              | **सल्लाह**                    |
| `check:openapi-routes`         | `openapi.yaml` मा हरेक बाटो एक वास्तविक `route.ts` (विरोधी भ्रम) मा समाधान गर्दछ                                                                      | हो                            |
| `check:docs-symbols`           | `docs/**/*.md` मा प्रत्येक `/api/...` सन्दर्भले वास्तविक `route.ts` (विरोधी भ्रम) लाई समाधान गर्दछ।                                                   | हो                            |
| `i18n translation drift`       | `docs/i18n/**` मिरर बनाम `.i18n-state.json` — PRs मा सल्लाह (एर्ना अनुवाद तरंग द्वारा ताजा गरिन्छ), धक्का मा कडा र राती                               | **सल्लाह** PRs                |

#### अनुवाद मिररहरू व्युत्पन्न फाइलहरू हुन् (PR मोड बनाम रिलीज मोड)

एक सुविधा PR अंग्रेजी स्रोतहरू मात्र सम्पादन गर्दछ। `docs/i18n/<locale>/**` मिररहरू (66 `llm.txt` प्रतिलिपिहरू र अनुवादित `CHANGELOG.md` फाइलहरू सहित) र `.i18n-state.json` अनुवाद तरंग (`docs/i18n-*` / `chore/i18n-*` शाखाहरू, अनुसूचित `i18n-mirror-refresh.yml`) र रिलीज (`npm run release:sync-changelog-i18n`) द्वारा एक चरणमा पुन: लेखिएका छन्। त्यसकारण मिरर गेटहरू दुई मोडमा चल्छन्, `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, त्यसपछि `OMNIROUTE_GATE_MODE`, त्यसपछि कार्य घटना; स्थानीय रन `release` हो):

- `check:docs-sync` — release mode runs every check. PR mode keeps the package.json/OpenAPI version, the root CHANGELOG headings and the superseded-docs guard, and prints `SKIP reason=pr-mode` for the `llm.txt` mirror copies and the translated CHANGELOG sections — unless the PR writes mirrors: a head branch declared as a writer of the `docs/i18n/**` family in `config/quality/derived-paths/*.json` runs both checks strictly, and, when the diff base resolves, a change whose own diff edits `docs/i18n/<locale>/llm.txt` or `CHANGELOG.md` runs that check strictly. The diff base does not resolve in a depth-1 checkout (the `docs-sync-strict` job), so PR mode also runs one check that needs no base: every `llm.txt` mirror must exist, keep its `---` separator and carry either the root body or the body most mirrors share. A base that moved leaves all mirrors equally stale and passes; a hand edit to one mirror fails. The translated `CHANGELOG.md` files have no such check in a depth-1 PR checkout.
- प्रि-कमिट हुकले `check-docs-sync.mjs --mode=pr` चलाउँछ: एक प्रतिबद्धताले के गर्छ भनेर न्याय गरिन्छ। झण्डा बिना स्थानीय रन रिलिज मोड हो, र रूट `llm.txt` सम्पादन गर्ने एउटा मर्ज गरिएको PR ले लहर नचल्दासम्म त्यो आधारमा प्रत्येक पछिको कमिटलाई रोक्छ। एउटै नियमले कुनै पनि मोड-अवेयर गेटको लागि होल्ड गर्दछ जुन हस्की हुक रन हुन्छ: हुकले `--mode=pr` पास गर्छ, र कडा निर्णय रिलीज-मोड रनहरूसँग रहन्छ (रिलिज PR, `main` मा धकेल्छ, एक सादा स्थानीय रन)।
- मिरर-सामग्री एकाइ परीक्षणहरू (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — रिलीज मोडले प्रत्येक लोकेललाई जोड दिन्छ। PR मोडले `.i18n-state.json` (पूर्ण-फाइल ह्यास, वा परीक्षण पिनको खण्डको रेकर्ड गरिएको खण्ड ह्यास) अनुसार अङ्ग्रेजी स्रोतसँग हालको दर्पणलाई मात्र दाबी गर्छ र बासीलाई कारणसहित छोड्छ। `target_hash` प्रोभेन्स चेक दुबै मोडहरूमा प्रत्येक लोकेलको लागि चल्छ। ताजापन प्रति `## ` खण्ड हो, एकाइ `run-translation.mjs` ह्यास; लामो खण्ड (यस फाइलको गेट इन्भेन्टरी यसको लगभग आधा छ) मतलब यसमा कुनै पनि सम्पादनले ती मिररहरू बासी छोड्छ, र तिनीहरूको PR-मोड दावीहरू अर्को लहर सम्म छोड्छन्। अङ्ग्रेजी स्रोतले अब समावेश नगरेको एंकर सम्पूर्ण फाइल तुलनामा फर्किन्छ।
- `i18n translation drift` — PRs मा सल्लाह, पुशमा कडा, राती र रिलीज कट, त्यसैले बासी ऐना रिलीजमा पठाउन सक्दैन।

`scripts/i18n/sync-llm-mirrors.mjs` ( `syncLlmMirrors()` को रूपमा पनि निर्यात गरिएको, `--dry-run` सँग) `llm.txt` मिररहरू पुन: लेख्छ; रिलीज रिफ्रेस, अनुवाद तरंग र अनुसूचित `i18n-mirror-refresh.yml` ले यसलाई चलाउँछ (रिफ्रेसले ड्राइ रनको साथ बासी `llm.txt` मिररहरू पत्ता लगाउँदछ, किनकि drift रिपोर्टले तिनीहरूलाई सूचीबद्ध गर्दैन, र तिनीहरूलाई `check:docs-all` अघि सिंक गर्दछ)।

`docs/diagrams/` अन्तर्गत बाह्र README SVGs उत्पन्न हुन्छ (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ती सबैलाई पुन: उत्पन्न गर्दछ)। प्रत्येकसँग बाइट-तुलना इकाई परीक्षण (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) हुन्छ जुन प्रतिबद्ध फाइल रिलीज मोडमा बासी हुँदा असफल हुन्छ; PR मा, `check:generated-artifacts` SVG को PR सम्पादनहरू न्याय गर्दछ र आधारको बहाव रिलीज रिफ्रेस गर्न छोडिन्छ ( [जेनरेट गरिएको फाइलहरू र व्युत्पन्न आधाररेखाहरू](#generated-files-and-derived-baselines-written-at-release) हेर्नुहोस्) — र `check:docs-counts` तिनीहरूको `<text>` नोडहरू — बाट क्यानोनिकल नम्बरहरू पढ्छ जसको कारणले गर्दा बाह्यरेखा गरिएको `<text>` फाइलमा प्रत्येक आउटलाइनिंग चरणमा राखिएको छ। SVG क्यानोनिकल-नम्बर चेकले `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) मा सूचीबद्ध फाइलहरू पढ्छ: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, प्लस `public/images/tier-flow-dark.svg` र `tier-flow-light.svg`; फ्री-सदाका लागि, क्याटलग-प्रविष्टि, पुनरावर्ती-पूल र स्कोरिङ-कारक दावीहरू पनि `promise-pillars.svg`, `free-tier-budget.svg` र `strategies-grid.svg` पढ्छन्। यी जेनेरेटरहरूले निकाल्ने गणनाहरू (प्रदायक कुल, MCP उपकरणहरू, राउटिंग रणनीतिहरू, नि: शुल्क-सदाका लागि प्रदायकहरू, ...) तथ्य स्न्यापसट `docs/reference/derived-facts.json` बाट `scripts/docs/readmeFacts.mjs` मार्फत आउँछन्, शाब्दिकबाट होइन, त्यसैले कुनै पनि शाखामा रेखाचित्र पुन: उत्पन्न गर्दा प्रतिबद्ध फाइल पुन: उत्पादन हुन्छ। `free-tier-budget.svg` एउटै स्न्यापसटबाट आफ्नो पङ्क्तिहरू कोर्छ (`code.freeTierBudget`, तथ्याङ्क जाँचको क्याटलग सारांश), त्यसैले `FREE_MODEL_BUDGETS` मा परिवर्तन CI रातो बदल्नुको सट्टा अर्को रिफ्रेसमा कार्डमा पुग्छ।

### व्युत्पन्न मानहरू: `pr` र `release` गेट मोडहरू

एक सुविधा PR कहिल्यै मान लेख्दैन जुन यसको आधारको स्थितिमा निर्भर हुन्छ: प्रदायक, माइग्रेसन, MCP-उपकरण र रणनीति गणनाहरू, README SVG नम्बरहरू, तथ्य स्न्यापसट। एक चरणले ती सबैको पुन: गणना गर्दछ, `npm run release:refresh-derived`, रिलीज द्वारा र रातको व्युत्पन्न-रिफ्रेस PR द्वारा। त्यसैले** रिलीजहरू बीचको आधार डिजाइनद्वारा लाइभ कोडको पछाडि छ** , र लाइभ कोडसँग रूखको तुलना गर्ने गेट वा परीक्षण प्रत्येक PR मा एक प्रदायक थपे पछि रातो हुनेछ। त्यसकारण व्युत्पन्न मानहरूको न्याय गर्ने गेटहरू दुई मोडहरू मध्ये एउटामा चल्छन्, `scripts/check/lib/gateMode.mjs` (पहिलो खेलको जीत):

1. आदेश रेखामा`--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` वातावरण चर (`pr` वा `release`);
3. स्वचालित, GitHub कार्य घटनाबाट: एक `pull_request` जसको टाउको `release/v*` छैन, `merge_group`, वा `omni-queue/**` → `pr` मा पुश; अन्य सबै (पुश, तालिका, प्रेषण, रिलीज PR `release/v* → main`, कुनै पनि स्थानीय रन) → `release`।

कुन `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) प्रत्येक मोडमा असफल हुन्छ:

| मोड       | असफल हुन्छ                                                                                                                                                                                                                                                                                                                                                                      | प्रत्यक्ष तथ्यहरू चाहिन्छ |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `release` | प्रत्येक जाँच, रूखबाट सङ्कलन गरिएका तथ्यहरू विरुद्ध कडा समानता (गेटले सधैं गरेको व्यवहार): बासी गणना, संस्करण, कभरेज फ्लोर वा SVG नम्बर STRICT बहाव हो।                                                                                                                                                                                                                         | हो                        |
| `pr`      | परिवर्तनले मात्र के गर्यो, उही दावी एक्स्ट्रक्टरहरूसँग PR आधार विरुद्ध भिन्न भयो: (1) त्यो चेक र फाइलको लागि आधारमा अवस्थित नभएको व्यवस्थित मान ("PR ले व्यवस्थित नम्बर — लाई आधार पाठमा पुनर्स्थापना गर्यो"); (२) आधार बोकेको र टाउको हराएको आवश्यक दाबी। सामग्री अपरिवर्तनीयहरू जसलाई कुनै तथ्यहरू आवश्यक पर्दैन रिलीज मोडमा चल्छ; रिलीज-मात्र जाँचहरू सूचीबद्ध र छोडिएका छन् | छैन                       |

एजेन्ट-निर्देशन फाइलहरू बोक्छन्** छैन** व्युत्पन्न गणना सबैमा: `AGENTS.md`, `llm.txt` (र यसको `docs/i18n/*/llm.txt` प्रतिलिपिहरू), bs `AGENTS.md` फोर्क, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` र प्रत्येक `skills/*/SKILL.md` ले स्रोतलाई संकेत गर्दछ (उदाहरणका लागि `src/shared/constants/routingStrategies.ts` मा `ROUTING_STRATEGY_VALUES` ) र यसको सट्टा `npm run facts` । अपरिवर्तनीय "कुनै व्युत्पन्न गणनाहरू (एजेन्ट-निर्देशन फाइल ...)" त्यहाँ गणना असफल हुन्छ (प्रदायकहरू, माइग्रेसनहरू, MCP उपकरणहरू र स्कोपहरू, मार्ग रणनीतिहरू, स्कोरिङ कारकहरू, मोड प्याकहरू) दुवै मोडहरूमा, त्यसैले रिलीज रिफ्रेसले कहिल्यै निर्देशन फाइल पुन: लेख्नु पर्दैन।

`pr` मोडमा लेखक शाखाहरूले व्यवस्थित मानहरू सम्पादन गर्न सक्छन्: `chore/derived-*` (राइटली रिफ्रेस PR), `release/v*`, र अनुवाद तरंगहरू `docs/i18n-*` र `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`)। लाम ब्याचहरू (`merge_group`, Mergify ड्राफ्टहरू, `omni-queue/**`) फेरि न्याय गरिँदैनन्: तिनीहरूले पहिले नै एक-एक गरेर न्याय गरिसकिएको गेटलाई PRs ।

Exit codes: `0` clean · `1` STRICT drift (or soft drift with `--strict`) or a managed-value violation · `2` infrastructure — the code facts could not be collected (the tsx probe failed or timed out; the timeout is `OMNIROUTE_FACTS_TIMEOUT_MS`, default 600000 ms) or, in CI, the PR diff base could not be resolved. An exit 2 is never a documentation divergence: re-run the job or fix the environment.

जहाँ प्रत्येक मोड चल्छ:

| कहाँ                                                                                        | मोड                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| फिचर PR — `ci.yml` कार्य `docs-sync-strict`, `quality.yml` चरण "कागजात सटीकता"              | `pr` (स्वचालित); कामले आधारलाई `BASE_SHA` को रूपमा पास गर्छ र `fetch-depth: 2` सँग चेक आउट गर्छ                                                                                               |
| `merge_group`, `omni-queue/**` उम्मेद्वारहरू, मर्ज ट्रेनको पूर्ण गेट सूची                   | `pr`                                                                                                                                                                                          |
| PR (`release/v* → main`), पुश, निर्धारित र म्यानुअल रनहरू रिलीज गर्नुहोस्                   | `release`                                                                                                                                                                                     |
| रिलीज-हरियो (`scripts/quality/validate-release-green.mjs`)                                  | HARD वस्तुहरू `OMNIROUTE_GATE_MODE=pr` सँग चल्छन् ("के आधार टुट्यो?"); DRIFT वस्तु `derived-refresh` चल्छ `npm run release:refresh-derived -- --check` (कडा दृश्य, आधार-रातो कहिल्यै खोल्दैन) |
| रिलीज (`/generate-release` चरणहरू 0a र 1; कौशल तारिङ एक अलग मालिक-अनुमोदित परिवर्तन हो)     | `npm run release:refresh-derived` व्युत्पन्न फाइलहरू लेख्छ; रिलीज PR को आफ्नै चेक त्यसपछि `release` मोडमा चलाउनुहोस्                                                                          |
| `nightly-derived-refresh.yml` (दैनिक, उच्चतम `release/vX.Y.Z`, रिलीज-फ्रिज अन्तर्गत छोडियो) | `npm run release:refresh-derived -- --profile=nightly`; फरकमा यसले ONE PR `chore/derived-refresh` बाट खुला राख्छ; कहिल्यै विलय हुँदैन                                                         |

यसको पछाडि आदेशहरू:

- `npm run facts` प्रत्येक व्युत्पन्न नम्बरलाई JSON (`scripts/release/facts.mjs`) को रूपमा छाप्छ। `--key=code.mcpTools` एउटा मान छाप्छ, `--snapshot` लाइभ रूखको सट्टा प्रतिबद्ध स्न्यापसट पढ्छ। तथ्यहरू सङ्कलन गर्न नसकिने अवस्थामा 2 बाहिर निस्कनुहोस्।
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) ले व्युत्पन्न फाइलहरूलाई एक पासमा पुन: गणना गर्दछ, यस क्रममा ( `--only=` का लागि चरण आईडी): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (स्न्यापसट), `numbers` (काउन्ट गेटको पुनर्लेखन योजना कागजातहरूमा लागू गरियो, त्यसपछि `skills` `docs/i18n/` `readme-diagrams` शिप `SKILL.md` नभएसम्म छोडियो), `e2e-timings` (छाँट्ने कुञ्जीहरू `syncE2eTimings` `en.json` `ui-keys`, `--rewritten-since=<ref>` — पूर्वनिर्धारित `origin/main` — पुन: पङ्क्तिमा`OMNIROUTE_TRANSLATION_*` मानहरू पछिल्लो रिलीजबाट पुन: लेखिएका छन्; मानहरू ब्याकइन्डद्वारा उही रनमा अनुवाद गरिएका छन्, ती कुञ्जीहरू वा वातावरणमा कन्फिगर गरिएका छन्। `.env` इन्जिनले ब्याकएन्ड बिना कहिल्यै `__MISSING__` मार्करहरू लेख्दैन: रिलिज प्रोफाइल असफल हुन्छ, राती कुञ्जीहरू छोड्छ, र Google `--allow-untranslated` उद्देश्यमा लेख्छ), `llm-mirrors` र `verify-generated` (लेखिएपछि, `check:generated-artifacts` र `check:agent-skills-sync` रिलीज मोडमा पास हुनुपर्छ; `--check` मा छोड्नुहोस् र `--only` आउट भएमा; `changelog` चरण अप्ट-इन हो (`--with-changelog`, रिलीज प्रोफाइल मात्र)। `--profile=nightly` संस्करण दाबीलाई कहिल्यै छुँदैन। `-- --check` को साथ यसले केहि पनि लेख्दैन र 1 बाहिर निस्कन्छ जब कुनै फाइल परिवर्तन हुन्छ वा व्यवस्थित मानलाई म्यानुअल सम्पादन चाहिन्छ (दुवैलाई सूचीबद्ध गर्दै); पूर्वाधार विफलतामा 2 बाहिर निस्कनुहोस्। `--json` परिणामलाई JSON को रूपमा छाप्छ।
- `docs/reference/derived-facts.json` पछिल्लो रिफ्रेस प्रयोग गरिएको तथ्यहरूको स्न्यापसट हो। रिफ्रेसले मात्र लेख्छ। README SVG जेनरेटरहरूले यसलाई पढ्छन्, र PR-समय एकाइ परीक्षणहरूले प्रतिबद्ध कागजातहरू र उत्पन्न गरिएका फाइलहरू — सँग कहिल्यै लाइभ कोडसँग तुलना गर्छन्। सुइटको एकल प्रत्यक्ष तुलना `tests/unit/check-docs-counts-sync.test.ts` मा "रिलिज रिफ्रेसले चक्र बन्द गर्दछ" हो: प्रत्यक्ष तथ्यहरूसँग, मेमोरीमा लागू गरिएको STRICT पुनर्लेखन योजनाले रिपोर्ट गर्दैन, र पुन: योजनाले कुनै परिवर्तन गर्दैन।

स्थानीय रूपमा पुन: उत्पादन गर्न (एक स्थानीय रन पूर्वनिर्धारित `release` मा):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

एक समाधानयोग्य आधार बिना (कुनै `BASE_SHA`/`BASE_REF`, कुनै स्थानीय `origin/release/v<version>` छैन) स्थानीय `pr` रनले चेतावनी छाप्छ र असफल हुनुको सट्टा भिन्नता छोड्छ।

### काम: `i18n-ui-coverage`

| लिपि                              | प्रमाणीकरण गर्दछ                                                                                                                                                                         | अवरुद्ध गर्दै        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुञ्जी कभरेज ≥ 65% छ                                                                                                                                                             | हो (दुबै मोडहरू)     |
| `check:ui-icu`                    | प्रत्येक UI क्याटलगको प्रत्येक सन्देश `IntlMessageFormat` सँग कम्पाइल हुन्छ                                                                                                              | हो (दुबै मोडहरू)     |
| `check-ui-value-drift` (इनलाइन)   | पुन: लेखिएको अंग्रेजी** मूल्य** कुनै बासी अनुवाद पछि छोड्दैन                                                                                                                             | हो (रिलिज मोड मात्र) |
| `check-new-key-coverage` (इनलाइन) | ए** नयाँ** अंग्रेजी कुञ्जी प्रत्येक लोकेलमा अनुवाद गरिएको छ — `__MISSING__:` मार्कर अस्वीकार गरिएको छ                                                                                    | हो (रिलिज मोड मात्र) |
| `check-key-completeness` (इनलाइन) | प्रत्येक UI क्याटलग (र, `--catalog=cli` संग, प्रत्येक CLI क्याटलग) ले यसको `en.json` को कुञ्जी सेट ठ्याक्कै बोक्छ; `pr` मोडमा, प्रत्येक क्याटलग PR मर्ज आधारमा आफैंमा परिवर्तन भयो       | हो (दुबै मोडहरू)     |
| `check-translation-ratio`         | प्रति लोकेल वास्तविक-अनुवाद अनुपात (समान-देखि-अंग्रेजी / प्लेसहोल्डर / अनुमति सूची बाहिर हराइरहेको पातहरू) `config/quality/i18n-translation-baseline.json` + ढिलो भन्दा बढी हुनु हुँदैन। | हो (रिलिज मोड मात्र) |

`fetch-depth: 0` — आवश्यक छ मूल्य-बहाव गेट मर्ज आधार विरुद्ध `en.json` भिन्न हुन्छ।

**दुई मोड (२०२६-११-१३ देखि)।** एक सुविधा PR `en.json` (र `bin/cli/locales/en.json`) मा कुञ्जीहरू थप्छ वा पुन: लेख्छ र अन्य कुनै लोकेललाई छुँदैन; `check:pr-derived-paths` (job `pr-test-policy`, family `config/quality/derived-paths/translation.json`) ले PR लाई असफल बनाउँछ। अन्य लोकेलहरू `release:refresh-derived` द्वारा प्रति विमोचन एक पटक पूरा हुन्छन्, जसले `scripts/i18n/sync-ui-keys.mjs` मा `syncUiKeys()` कल गर्छ (हराएको कुञ्जीहरू थप्नुहोस्, छाँट्नेहरू, `rewrittenSinceRef` मार्फत पुन: लेखिएको अंग्रेजीको अनुवाद चिन्ह लगाउनुहोस्, अनुवाद गर्नुहोस्), वा अनुवाद लहरद्वारा। गेटहरूले `scripts/check/lib/gateMode.mjs` बाट मोड पढ्छन्: `pr` मोडमा (फिचर PRs, `merge_group`, `omni-queue/**`) रिलिज-मोड गेटहरू माथि `SKIP reason=pr-mode` र निकास ०; `release` मोडमा (रिलिज PR, pushes to `main`, `workflow_dispatch`, स्थानीय रनहरू) तिनीहरू पहिलेको जस्तै कडा छन्, र रिलीज PR मा भिन्न-अभिज्ञहरूले `BASE_REF=origin/main` प्राप्त गर्छन्, त्यसैले तिनीहरूले प्रत्येक कुञ्जीलाई थपिएको वा पुन: लेखिएको चक्रलाई न्याय गर्छन्। `--mode=pr` को साथ स्थानीय रूपमा सुविधा-PR निर्णय पूर्वावलोकन गर्नुहोस्।

एक PR जसले अझै पनि `pr` मोडमा लोकेल क्याटलगहरू परिवर्तन गर्दछ (एक अनुवाद तरंग, रिलिज रिफ्रेस, अनुवाद-मात्र समाधान) छोडिएको छैन: `check-key-completeness` मर्ज आधारमा उही क्याटलग विरुद्ध परिवर्तन भएको प्रत्येक क्याटलगलाई न्याय गर्दछ (`scripts/i18n/lib/touched-catalogs.mjs`) र क्याटलग हराएको कुञ्जीमा असफल हुन्छ, कुञ्जी `en.json` पाठमा परिणत हुन्छ वा वास्तविक अनुवादमा परिणत हुन्छ, `__MISSING__:` मा परिवर्तन हुन्छ। PR नछोएको अंग्रेजी स्ट्रिङको placeholders/tags अब इन्टरपोलेट गर्ने मान। PR मा नयाँ क्याटलगले सम्पूर्ण `en.json` कुञ्जी सेट बोक्नुपर्छ। यसले कभर गर्दछ, क्याटलगहरूको लागि PR छुन्छ, अनुपात र CLI-समानता गेटहरूले के देख्नेछन्।

लोकेल-समानता एकाइ परीक्षणहरू (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` मार्फत उही मोडहरू पछ्याउँछन्: `pr` मोडमा तिनीहरू कुञ्जी-समानता दावीहरू छोड्छन् र रिलीजमा छोड्छन् जसको अंग्रेजी मर्ज आधारदेखि परिवर्तन भएको कुञ्जीहरूको प्लेसहोल्डर समानता रिफ्रेस हुन्छ (प्रत्येक कुञ्जीले 'एकाइले पढ्दा काम जाँच गर्न सक्दैन)। त्यो सहयोगी हो** मात्र** स्वीकृत मोड-सशर्त स्किप: `check:test-masking` `.skip(` र `{ skip: true }` लाई गणना गर्दछ तर गणना गरिएको `{ skip: "<reason>" }` लाई फिर्ता गर्दैन, त्यसैले `tests/unit/locale-parity-mode.test.ts` यसलाई प्रयोग गर्न अनुमति दिएको परीक्षणहरूको सूची पिन गर्दछ — त्यो सूचीमा समीक्षा गरिएको सम्पादन हो।

#### `check-ui-value-drift` — बासी-अनुवाद गेट

एक i18n प्रतिगमनलाई अन्य गेटहरूले संरचनात्मक रूपमा देख्न सक्दैनन्: एक अंग्रेजी मान पुन: लेखिएको छ र _previous_ अंग्रेजीबाट व्युत्पन्न गरिएका अनुवादहरू पछाडि रहन्छन्, त्यसैले गैर-अंग्रेजी प्रयोगकर्ताहरूले आत्मविश्वासपूर्वक-शब्दहरू, अहिले-गलत प्रतिलिपि पढ्न जारी राख्छन्।

यो वास्तविक लागि पठाइयो। एन्टिग्रेभिटी लगइन सहायक अवतरण गर्दा `oauthModal.googleOAuthWarning` पुन: लेखिएको थियो (#5203);** 43 को 39 लोकेलहरू** "पूर्ण URL प्रतिलिपि गर्नुहोस् र तल टाँस्नुहोस्" — एक प्रवाह जुन त्यो प्रदायकको लागि पूरा हुन सक्दैन भनेर अपरेटरहरूलाई पाठ राख्यो। यो #8463 सम्म बेवास्ता भयो किनभने:

- `sync-ui-keys` ले ब्याकफिल कुञ्जीहरू मात्र हुन्** अनुपस्थित** , त्यो कहिल्यै होइन** बासी** ;
- `check-ui-keys-coverage` कुञ्जी _presence_ लाई गणना गर्दछ, त्यसैले बासी अनुवादले कभर गरेको रूपमा स्कोर गर्दछ;
- `check-translation-drift` `docs/i18n/<locale>/**.md` कागजातहरू मिररहरू — ट्र्याक गर्दछ यसले `src/i18n/messages/*.json` कहिल्यै पढ्दैन। यो काम `docs-sync-strict` मा चल्छ: PRs मा सल्लाह, धक्का मा कडा र राती; अनुवाद तरंगले ऐनालाई ताजा गर्छ, सुविधा PR होइन।

**फरक-सचेत, आधारभूत-समर्थित होइन।** यसले काम गर्ने रूखसँग मर्ज आधारमा `en.json` तुलना गर्छ; प्रत्येक कुञ्जीको लागि जसको अङ्ग्रेजी मान परिवर्तन भयो, कुनै पनि लोकेल अझै पनि अछोइएको अनुवाद बासी छ। यो जानाजानी** पूर्व अवस्थित ऋण फ्रिज गर्दछ** — a diff ले लामो समयदेखि चलेको अनुवाद कुन पुरानो अङ्ग्रेजीबाट आएको हो भनेर खुलासा गर्न सक्दैन, त्यसैले गेटले हालको परिवर्तनले के छुन्छ भनेर मात्र न्याय गर्छ। वैकल्पिक (एक प्रति-कुञ्जी ह्यास आधार रेखा) को लागत ~ 600 KB उत्पन्न फाइल हुनेछ, 3 × सबैभन्दा ठूलो अवस्थित आधार रेखा, प्रत्येक i18n PR मा मंथन।

यसलाई सन्तुष्ट पार्न दुई तरिकाहरू:

1. प्रभावित अनुवादहरू अपडेट गर्नुहोस्, वा
2. तिनीहरूलाई `__MISSING__:<new english>` — मा रनटाइम सेट गर्नुहोस् त्यसपछि सही अंग्रेजी (`src/i18n/request.ts::deepMergeFallback`, #7258) र अनुवादको लागि कुञ्जी लाइनहरू सेवा गर्दछ।

यदि तार छ** अर्थ** परिवर्तन, प्राथमिकता** कुञ्जी पुन: नामाकरण गर्दै** : नयाँ कुञ्जीले पुरानो अनुवाद इनहेरिट गर्न सक्दैन। त्यो ढाँचा #8463 प्रयोग गरिएको छ।

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

`SKIP reason=base-unresolved` सँग 0 बाहिर निस्कन्छ जब आधार क्याटलग पढ्न सकिँदैन (बेस रेफ बिना उथले क्लोन), मिररिङ `check-openapi-breaking`। रिलीज मोड मात्र: एक सुविधा PR ले अंग्रेजीलाई पुन: लेख्छ र त्यहाँ रोकिन्छ; रिलिज रिफ्रेसले पछाडि छोडेका अनुवादहरूलाई चिन्ह लगाउँदछ (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, समान `findStaleTranslations`)।

### काम: `i18n`

पूर्ण i18n प्रमाणीकरण म्याट्रिक्स (प्रति लोकेल एक काम)। सम्पूर्ण काम सल्लाह हो।

| लिपि                            | प्रमाणीकरण गर्दछ           | अवरुद्ध गर्दै                                         |
| ------------------------------- | -------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | प्रति लोकेल अनुवाद पूर्णता | **सल्लाह** (सम्पूर्ण काममा`continue-on-error: true` ) |

### काम: `pr-test-policy`

पुल अनुरोधमा मात्र चल्छ।

| लिपि                   | प्रमाणीकरण गर्दछ                                                                                                                            | अवरुद्ध गर्दै |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check:pr-test-policy` | PRs जसले `src/`, `open-sse/`, `electron/`, वा `bin/` मा उत्पादन कोड परिवर्तन गर्दछ परीक्षणहरू समावेश वा अद्यावधिक गर्नुपर्छ (हार्ड नियम #8) | हो            |
| `check:test-masking`   | परिवर्तन गरिएका परीक्षण फाइलहरूले शुद्ध दाबी गणना घटाउँदैन वा `assert.ok(true)` tautologies थप्दैन                                          | हो            |
| `check:pr-evidence`    | PR बडीले परिवर्तनको लागि test/VPS प्रमाण उद्धृत गर्दछ ( PR गद्य — नाजुक ग्रिप गरेर हार्ड नियम #18 मेकानाइज गर्दछ, ब्याकलग हेर्नुहोस्)       | हो            |

### काम: `test-vitest`

`build` पछि दौडन्छ। ब्लकहरू विफलतामा मर्ज हुन्छन्।

| सुइट             | प्रमाणीकरण गर्दछ                                      | अवरुद्ध गर्दै                                                                                                                 |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP सर्भर (110 उपकरण), autoCombo, क्यास — vitest धावक | हो                                                                                                                            |
| `test:vitest:ui` | UI कम्पोनेन्ट परीक्षण — vitest धावक                   | **अवरुद्ध गर्दै** — पूर्व-अवस्थित विफलताहरू स्पष्ट रूपमा `vitest.config.ts` मा बहिष्कृत छन्; नयाँ असफलताले कामलाई असफल बनाउँछ |

### रातको कार्यप्रवाह (अनुसूचित, सल्लाहकार)

यी क्रोन तालिका (र `workflow_dispatch`) मा चल्छन्, PRs मा कहिल्यै हुँदैन। सबै सल्लाहकार छन्।

| कार्यप्रवाह            | प्रमाणीकरण गर्दछ                                                                                                                                      | अवरुद्ध गर्दै |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | अनियमित बीज + उच्च रन गणना संग द्रुत-जाँच सम्पत्ति परीक्षण                                                                                            | **सल्लाह**    |
| `nightly-resilience`   | हिप-वृद्धि गेट, अराजकता दोष-इंजेक्शन, k6 load/soak                                                                                                    | **सल्लाह**    |
| `nightly-llm-security` | promptfoo इंजेक्शन गार्ड (ब्लक मोड) + garak प्रोब (प्रदायक गोप्य बिना छोडियो)                                                                         | **सल्लाह**    |
| `nightly-schemathesis` | OpenAPI अनुबंध फजिङ (स्कीमाथेसिस) प्रत्यक्ष OmniRoute विरुद्ध `docs/openapi.yaml` — सतह विशिष्ट उल्लङ्घनहरू / अनह्यान्डल 500s (Fase 8 B.4) प्रयोग गरी | **सल्लाह**    |
| `nightly-mutation`     | स्ट्राइकर उत्परिवर्तन-परीक्षण स्कोर फास्ट एकाइ लेन — मा जीवित म्युटेन्टहरू कमजोर दाबीहरू                                                              | **सल्लाह**    |
| `nightly-compat`       | समर्थित `engines.node` दायराहरूमा नोड इन्जिन अनुकूलता म्याट्रिक्स                                                                                     | **सल्लाह**    |

कार्यसम्पादन आधार रेखाहरू (heap, TTFB, निर्माण समय) रेकर्ड गरिएको छ, गेट गरिएको छैन: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) हेर्नुहोस्।

---

## वेग चरण (2026-08-30 → v4.0 LTS): प्रत्येक आधार रेखा 20% द्वारा ढीला

मालिकको निर्णय (2026-08-30): v4.0 मोड्युलराइजेसन सम्म, ढुवानी गति ऋण रेखा होल्ड गर्नु भन्दा बढी महत्त्वपूर्ण छ। हरेक** संख्यात्मक** र्याचेट आधाररेखा एक लेखा योग्य पासमा 20% द्वारा ढीला गरिएको थियो, र चरण `config/quality/quality-baseline.json` मा घोषित गरिएको छ:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| के परिवर्तन भयो                                                                                                                                                        | कहाँ                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — low-is-राम्रो गणना × 1.2, उच्च-is-राम्रो प्रतिशत ÷ 1.2 (कभरेज फ्लोर 60 राखिएको छ, `eslintErrors` रहन्छ 0, `eslintWarnings` 0 → 20% जमेको दमन गणना) | `quality-baseline.json` (`_relax_velocity_2026_08_30` note lists every before → after)                 |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, हरेक `frozen[*]` / `testFrozen[*]` लाइन टोपी × 1.2                                                                                                   | `file-size-baseline.json`                                                                              |
| प्रति-फाइल / प्रति-TS-कोड गणना × 1.2                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` सल्लाहकार बन्छ जबकि `_policy.requireTighten === false`                                                                                             | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| राती `bank-ratchet-shrinks` पजहरू (यसले मापन गरिएको संकुचनलाई बैंक गर्नेछ र हेडरूमलाई पूर्ववत गर्नेछ)                                                                  | `.github/workflows/nightly-release-green.yml`                                                          |

अनुमति सूचीहरू (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) हुन्** होइन** बजेट र छोइएन। Pass/fail नीति गेट्स (गोप्य, SQL नियमहरू, docs/env अनुबंध, i18n समानता, एकाइ परीक्षणहरू) अपरिवर्तित — एक रातो परीक्षण अझै पनि रातो परीक्षण हो।

**उपकरण**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — एक-शट विश्राम (`scripts/quality/relax-baselines.mjs`); एउटै नोटको साथ दुई पटक चल्न अस्वीकार गर्दछ।
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — प्रत्येक संख्यात्मक गेटलाई CI जस्तै मापन गर्छ र बाँकी हेडरूम प्रति गेट (`scripts/quality/baseline-headroom.mjs`) छाप्छ। रातको `baseline-headroom` कार्यले कार्यप्रवाह रन सारांशमा तालिका प्रकाशित गर्दछ र `baseline-headroom-<run_id>` को रूपमा यसको JSON/Markdown रिपोर्ट अपलोड गर्दछ, 90 दिनको लागि राखिएको छ। चेतावनी र आलोचनात्मक पङ्क्तिहरूले तिनीहरूको क्यापको 10% भित्र वा पहिले नै माथि गेटहरू पहिचान गर्दछ। यी प्रतिवेदनहरूलाई बजेट खपत हुने प्रारम्भिक चेतावनीको रूपमा समीक्षा गर्नुहोस्; अपमानजनक गेटको `_rebaseline_*` नोटहरू निरीक्षण गर्नुहोस्। कामले अब स्थायी समस्या सिर्जना वा अद्यावधिक गर्दैन; #12149 अघिल्लो रिपोर्ट इतिहास सुरक्षित गर्दछ।

**नयाँ-कोड मोड (Clean-as-You-Code) — 2026-08-30 देखि, PR द्रुत-मार्ग मात्र**

`pull_request` घटनाहरूमा `quality.yml` `--base-ref <PR base SHA>` `check:file-size`, `check:complexity-ratchets` र `check:dead-code` पास गर्छ। `check:complexity-ratchets` र `check:dead-code` को लागि गेटले HEAD मर्ज-बेससँग तुलना गर्छ।** PR ले छुने फाइलहरूमा सीमित** (`scripts/check/newCodeMode.mjs`: मर्ज-बेस एक थ्रोअवे `git worktree` मा भौतिक बनाइन्छ, ESLint/knip त्यहाँ रन HEAD मा, प्रति-फाइल गणनाहरू भिन्न हुन्छन्):

- **अवरुद्ध** — PR ले cyclomatic/cognitive उल्लङ्घनहरू वा फाइलहरूमा मृत निर्यातहरू यसलाई परिवर्तन गर्यो (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` लगमा);
- **सल्लाहकार** — विश्वव्यापी कुल बनाम जमेको आधार रेखा। वंशाणुगत बहावले निर्दोष PR लाई कहिल्यै रातो गर्दैन; बहाव रिलिज मेलमिलापमा पुन: जमेको छ र हेडरूम कार्य द्वारा हेरिएको छ।

`check:file-size` आधार रेफलाई आफ्नै सर्तहरूमा प्रयोग गर्दछ (`scripts/check/check-file-size.mjs`, #8522): यसले रूखमा प्रत्येक स्रोत र परीक्षण फाइल जाँच गर्दछ, `git show` को साथ PR आधारमा प्रत्येकको लाइन गणना पढ्छ, र फाइल असफल हुन्छ जब यो यसको आधारभूत छतको ठूलो भन्दा अघि बढ्छ (`frozen` / `testFrozen`/ `cap` बाहिर आधारभूत फाइलको लागि)। आकार `testCap` एक फाइल जुन पहिले नै आधारमा बगेको छ त्यसैले निर्दोष PR कहिल्यै रातो गर्दैन।

`check:boundary:ratchet` यसको एकल संख्या (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`) मा समान नियम लागू गर्दछ: PR घटनाहरूमा दुबै `quality.yml` फास्ट-गेट्स र `ci.yml` lint कार्यले PR आधार SHA पास गर्दछ, आधार कमिटलाई `git archive` निर्यातबाट मापन गरिन्छ, र PR असफल हुन्छ जब यसको `open-sse → src` किनारा गणना `metrics.boundaryOpenSseToSrc` मा ठूलो गणना हुन्छ। छत माथि आधार बहाव रिपोर्ट गरिएको छ (`base drift herdado`) तर एक निर्दोष PR कहिल्यै रातो गर्दैन; push → main ले निरपेक्ष छत राख्छ, र एक समाधान गर्न नसकिने आधार SHA चेतावनीको साथ फिर्ता आउँछ।

एक ओम्नी-क्यु उम्मेद्वार ( `omni-queue/**` लाई धक्का, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) हेर्नुहोस्) लाई पुल अनुरोधको रूपमा समान व्यवहार गरिन्छ: दुबै कार्यप्रवाहहरूले उम्मेद्वार आधार (`needs.changes.outputs.candidateBase`) लाई `--base-ref` को रूपमा पास गर्दछ, र `check:ts7-diagnostics-ratchet` यसको विरुद्धमा पनि चल्छ। दुई नयाँ-कोड गेटहरूको लागि तुलनाको आधार भनेको SHA आफैं हो, शीर्ष मर्ज कमिटको पहिलो अभिभावक होइन, त्यसैले ब्याचको प्रत्येक पुल अनुरोधलाई न्याय गरिन्छ।

`workflow_dispatch` रन, रिलिज-ग्रीन स्वीप र रातको हेडरूम कार्यको कुनै PR आधार छैन र निरपेक्ष (ग्लोबल) तुलना राख्नुहोस्। कभरेज, नक्कल र प्रकार-कभरेज अहिलेको लागि विश्वव्यापी रहन्छन् (उनीहरूको उपकरणले सस्तोमा प्रति-फाइल भिन्नता उत्पादन गर्दैन) समान उपचारको लागि — उम्मेद्वारहरू।

**चरण v4.0 मा बन्द गर्दै (LTS = पहिले भन्दा कडा, "सामान्यमा फिर्ता" होइन)**

1. शुद्ध `release/v4.0.0` टिपमा: रेकर्डको लागि `npm run quality:headroom --json`, त्यसपछि `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, प्रत्येक टाइपचेक गेटको `--update` — प्रत्येक आधार रेखा मापन गरिएको मानमा झर्छ।
2. `quality-baseline.json` बाट `_policy` मेटाउनुहोस् (पुनः हतियार `--require-tighten` र राती बैंकिङ), `check-openapi-coverage.mjs` मा `THRESHOLD = 36` (वा उच्च) पुनर्स्थापित गर्नुहोस्।
3. मोड्युलराइजेशनले भुक्तान गरेको मापनभन्दा बाहिर कडा गर्नुहोस्: फाइल-साइज `cap` फिर्ता 1000 (वा 800), कभरेज फ्लोर + 5, मोड्युलराइज्ड प्याकेजहरूको लागि मृत निर्यात 0।

## र्याचेट बेसलाइन (`quality-baseline.json`)

र्याचेट इन्जिन (`scripts/quality/check-quality-ratchet.mjs`) ले `quality-baseline.json` पढ्छ र यसलाई भर्खरै सङ्कलन गरिएको `quality-metrics.json` सँग तुलना गर्छ। कुनै पनि मेट्रिक जुन यसको एप्सिलोन भन्दा बाहिर रिग्रेस हुन्छ निर्माण असफल हुन्छ।

हालको ट्र्याक गरिएको मेट्रिक्स:

| मेट्रिक               | दिशा   | अर्थ                             |
| --------------------- | ------ | -------------------------------- |
| `eslintWarnings`      | `down` | ESLint चेतावनी गणना बढ्नु हुँदैन |
| `coverage.statements` | `up`   | बयान कभरेज घट्नु हुँदैन          |
| `coverage.lines`      | `up`   | लाइन कभरेज घट्नु हुँदैन          |
| `coverage.functions`  | `up`   | प्रकार्य कभरेज घट्नु हुँदैन      |
| `coverage.branches`   | `up`   | शाखा कभरेज घट्नु हुँदैन          |

वास्तविक सुधार पछि आधार रेखा अद्यावधिक गर्न:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` झण्डाले वर्तमान मापन गरिएको मानहरू `quality-baseline.json` मा लेख्छ। बैंकिङ र सुधार भनेको release/nightly काम हो, PR's: `--require-tighten` (Fase 6A.5) ले रिलिज मोड (पुश, तालिका, रिलीज PR, स्थानीय रनहरू) मा मात्र बैंक नगरिएको सुधार असफल हुन्छ। एक सुविधा PR (`pr` गेट मोड) मा यसले सुधारलाई सूचना र पासको रूपमा छाप्छ; रिग्रेसन दुबै मोडमा असफल हुन्छ। वेग चरणको समयमा यो जताततै सल्लाह दिइन्छ (`_policy.requireTighten: false`)। हेर्नुहोस् [उत्पन्न फाइलहरू र व्युत्पन्न आधाररेखाहरू](#generated-files-and-derived-baselines-written-at-release) ।

### CodeQL ratchet: क्याडेन्स र म्यानुअल ट्रिगर रिफ्रेस गर्नुहोस्

`check:codeql-ratchet` पढ्छ** रेपो अवस्था, तालिकामा ताजा गरिएको — प्रति PR होइन।** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` रिपोर्ट गर्दछ `state: configured`, `schedule: weekly`: GitHub को पूर्वनिर्धारित-सेटअप स्क्यान, प्रति-पुश विश्लेषण होइन। नतिजा: PR पछि FIXES अलर्टहरू मर्ज भएपछि, अर्को निर्धारित स्क्यानले — रन नगरेसम्म र्याचेटले पुरानो, उच्च गणना पढिरहन्छ त्यसैले यसले स्क्यान नहुँदासम्म PR को आफ्नै फलो-अपहरू सहित प्रत्येक खुला PR मा रिग्रेसन रिपोर्ट गर्छ।

**म्यानुअल रिफ्रेस** : `gh workflow run codeql.yml --ref release/vX.Y.Z` विश्लेषण पुन: चलाउँछ र मिनेट भित्र अलर्टहरू पुन: प्रकाशित गर्दछ। `.github/workflows/codeql.yml` पहिले — पढ्नुहोस् यसको हेडरले यो `workflow_dispatch` -only हो बताउँछ** किनभने यो GitHub को "पूर्वनिर्धारित सेटअप" सँग विवादित छ।** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`) `push`/`pull_request`/ `schedule` ट्रिगरहरू पुनर्स्थापना गर्न आवश्यक छ** मालिक कार्य पहिले** : सेटिङहरू → कोड सुरक्षा → CodeQL: पूर्वनिर्धारित → उन्नत। त्यो स्विच बिना `schedule:` ट्रिगर थप नगर्नुहोस् — यसले असफल रनहरू मात्र उत्पादन गर्नेछ।

**गणना घटेपछि आधार रेखालाई कडा पार्नुहोस्** — `node scripts/check/check-codeql-ratchet.mjs --update` नयाँ मापन गरिएको गणनालाई `quality-baseline.json` → `metrics.codeqlAlerts.value` मा लेख्छ, त्यसैले र्याचेटले चुपचाप पुरानो छतमा पछाडि फर्कन अनुमति दिँदैन। काम गरिएको उदाहरण (2026-09-02/03): PR #12502 निश्चित 7 वास्तविक अलर्टहरू (13 → 6 मापन खुला); PR #12530 जमेको आधाररेखा 11 → 6 लाई मिलाउन कडा बनायो; बाँकी 6 त्यसपछि प्रति-सूचना औचित्य 0 खुला मा तल खारेज गरियो।

**बर्खास्तहरू अपरेटरको कल हुन् (हार्ड नियम #14)** — खारेज टिप्पणीमा प्राविधिक औचित्य रेकर्ड नगरी CodeQL अलर्टलाई कहिल्यै खारेज गर्दैन: अपस्ट्रीम-प्रोटोकल आवश्यकताको लागि `won't fix`, परीक्षण फिक्स्चरको लागि `used in tests`, सेनिटाइजरको लागि `false positive` CodeQL देख्न सक्दैन (पूर्व: `docs/security/ERROR_SANITIZATION.md`)।

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

## उत्पन्न फाइलहरू र व्युत्पन्न आधाररेखाहरू (रिलिजमा लिखित)

योजना 2026-11-13 ("व्युत्पन्न नम्बरहरू र पाठहरू रिलीजमा मात्र समाधान गरियो"): एक सुविधा PR परिवर्तन गर्दछ** स्रोत** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, कौशल सूची, मुक्त-स्तरीय सूची, नयाँ e2e विशिष्टता। यसले त्यो स्रोतबाट कम्प्युट गरिएका फाइलहरूलाई पुन: उत्पन्न गर्दैन, र यसले आधार रेखामा मापन गरिएको सुधारलाई बैंक गर्दैन। ती फाइलहरू रिलिज रिफ्रेस (`release:refresh-derived`) वा राती रिफ्रेस PR द्वारा एक पटक पुन: लेखिन्छन्। यसअघि, प्रत्येक भाइबहिनी PR आफ्नै पुन: उत्पन्न प्रतिलिपि बोकेका थिए र अर्को मर्जसँग विवादित थिए (2026-11-13: 321 को 30 खुला PRs रिरोट `PROVIDER_REFERENCE.md`, 26-28 ले README रेखाचित्रहरू पुन: लेख्यो)।

**गार्ड।** `check:pr-derived-paths` (job `pr-test-policy`) ले `config/quality/derived-paths/` मा परिवारको फाइल छुने PR सुविधा असफल हुन्छ :

| परिवार      | फाइलहरू                                                                                                                                                                       | द्वारा पुन: लेखिएको                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; बाह्र उत्पन्न README SVGs; `skills/*/references/**`; `SKILL.md` फाइलहरू जसमा कुनै कस्टम ब्लक छैन | `release:refresh-derived` (तथ्य), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                             | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                    |

लेखकहरू (`release/v*`, `chore/derived-*`, र `chore/bank-ratchet-*` आधार रेखाहरूका लागि) छुट छन्; त्यसोभए एक PR हो जसले केवल एक परिवार र यसका साथीहरूलाई परिवर्तन गर्दछ ( `generated` को लागि: जेनेरेटर लिपिहरू, तिनीहरूको परीक्षणहरू, एजेन्ट-कौशल इनपुटहरू — `src/shared/constants/agentSkills.ts`, हातले लेखिएको `skills/**` कागजातहरू, `docs/openapi.yaml` — र `changelog.d/**`), उदाहरणका लागि एक नायक लेआउट जसको SVG पढ्ने सीप परिवर्तन हुन्छ। पुन: उत्पन्न `SKILL.md` फाइलहरू। हातले लेखिएको `<!-- skill:custom-start -->` ब्लक भएको `SKILL.md` परिवारमा छैन: यसको अनुकूलन ब्लक सुविधाको छेउमा सम्पादन योग्य रहन्छ।

अनाथ सफाईलाई परिवारहरूले पनि न्याय गर्दैन: PR `docs/i18n/<locale>/<doc>` मेटाउन सक्छ जब मर्ज आधारमा त्यो ऐना र `<doc>` अब PR को टाउकोमा अवस्थित छैन, र `sources` बाट त्यस्ता कागजातहरू छोड्नको लागि मात्र `.i18n-state.json` सम्पादन गर्न सक्छ। गार्डले ती फाइलहरूलाई `orphan-cleanup` अन्तर्गत सूचीबद्ध गर्दछ। अझै पनि अवस्थित कागजातको ऐना मेटाउँदा उल्लङ्घन रहन्छ: कुनै अन्य पाइपलाइनले त्यो राज्यलाई ट्र्याक गर्दैन, र `llm.txt` र `CHANGELOG.md` मिररहरूको आफ्नै लेखकहरू छन्।

**चेकहरू, प्रति गेट मोड** (`scripts/check/lib/gateMode.mjs`; सहायक `scripts/check/lib/derivedArtifactScope.mjs`):

| जाँच गर्नुहोस्                                                            | `release` (पुश, तालिका, रिलीज PR, स्थानीय)                                | `pr` (सुविधा PR, कतार ब्याच)                                                                                                                                                                                              |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                 | प्रत्येक कौशल जेनेरेटर आउटपुट बराबर हुनुपर्छ                              | केवल सीपहरू जसको पाठ उत्पन्न गरिएको (अनुकूलन ब्लक बाहिर) वा `references/` PR सम्पादनहरू; अन्यथा `SKIP reason=pr-mode`                                                                                                     |
| `check:generated-artifacts` (README SVGs + e2e समय; पूर्ण इतिहास चाहिन्छ) | प्रत्येक SVG यसको जेनरेटर बराबर हुन्छ; प्रत्येक विशिष्टको समय प्रविष्टि छ | केवल कलाकृतिहरू PR ले सम्पादन गर्दछ; बाँकी `SKIP reason=pr-mode`; कुनै फरक आधार → हरेक कलाकृति न्याय गरिएको (असफल-बन्द)                                                                                                   |
| README SVG बाइट तुलना परीक्षण (`tests/unit/docs/readme-*-svg.test.ts`)    | हरेक SVG                                                                  | केवल एक SVG PR सम्पादन गर्दछ, जब आधार समाधान हुन्छ; `test-unit` को shallow PR चेकआउटको कुनै आधार छैन, त्यसैले त्यहाँ `SKIP reason=base-unresolved` र `check:generated-artifacts` सँगको परीक्षणले तुलनाको स्वामित्व लिन्छ। |
| e2e समय पूर्णता (`tests/unit/balance-e2e-shards.test.ts`)                 | प्रत्येक विशिष्टतामा प्रविष्टि छ                                          | SVG परीक्षणहरू जस्तै समान नियम (नयाँ विशिष्टता औसत वजनसँग चल्छ)                                                                                                                                                           |
| `check-quality-ratchet.mjs --require-tighten`                             | बैंकरहित सुधार असफल (जबसम्म `_policy`)                                    | सुधार रिपोर्ट, कहिल्यै असफल; एक प्रतिगमन अझै असफल                                                                                                                                                                         |

रिलिज मोडले निर्णयहरू, निकास कोडहरू र सन्देशहरू राख्छ जुन विभाजन अघि यी जाँचहरू थिए; समाधान गरिएको मोड (`[agent-skills-sync] mode=release (auto: local run)`) नामकरण गर्दै, बढीमा एक लाइन थपिएको छ। परीक्षणहरू node:test को `{ skip: releaseOnlyUnlessTouched(...) }` विकल्प मार्फत छोडिन्छ, जुन `check:test-masking` ले रिपोर्ट-मात्र ब्लकमा सूचीबद्ध गर्दछ (यो न त `.skip(` हो न `{ skip: true }`, त्यसैले यसलाई कडा स्किपको रूपमा गणना गर्दैन)। `check:generated-artifacts` चल्छ जहाँ आधार समाधान गर्न सकिन्छ: job `lint` (`fetch-depth: 0`), `check:agent-skills-sync` पछि। स्थानीय रूपमा, `npm run check:generated-artifacts -- --mode=pr` ले देखाउँछ कि त्यो चरणले PR मा के न्याय गर्छ। `check:docs-counts` को प्रदायक-कुल क्रस-चेक ("प्रदायक सन्दर्भ कुल (कागजात बनाम लाइभ मोड्युलहरू)") गणना गेटको अंश हो र त्यो गेटको आफ्नै मोडहरू पछ्याउँछ।

परिवारमा होइन, उद्देश्यमा: व्यक्तिहरू द्वारा निर्णय गरिएका नीति फाइलहरू (`gate-manifest.json`, अनुमत सूचीहरू, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) र छत एक सुविधा PR ले कोड (`quality-baseline.json` मेट्रिक प्रविष्टिहरू, typecheck/file-size/complexity आधारभूत रेखाहरू, `eslint-suppressions.json` — pruned a PR - ESLint द्वारा प्रिन्ड गर्दा उल्लङ्घन)। `src/i18n/routeNamespaces.generated.json` पनि उत्पन्न गरिएको छ तर सुविधा PRs मा रहन्छ: अनुप्रयोगले यसलाई चलिरहेको समयमा आयात गर्दछ, त्यसैले यो रिफ्रेसको लागि पर्खन सक्दैन।

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

## अनुमोदित नीति

पूर्व-अवस्थित उल्लङ्घनहरूमा असफल हुन नसक्ने प्रत्येक गेटले फ्रिज गरिएको अनुमति सूची (जस्तै, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) प्रयोग गर्दछ। नीति छ:

**मूल कारण ठीक गर्नुहोस्; उल्लङ्घन पूर्व-अवस्थित छ र उही PR मा फिक्स गर्न सकिँदैन भने मात्र अनुमति सूची प्रयोग गर्नुहोस्।**

अनुमति सूचीमा प्रविष्टि थप्दा:

1. औचित्य सहित टिप्पणी समावेश गर्नुहोस्।
2. ट्र्याकिङ मुद्दा सन्दर्भ गर्नुहोस् (जस्तै, `// #3498 — Phase 2 feature, not yet implemented`)।
3. उही PR मा प्रविष्टि हटाउनुहोस् जसले उल्लङ्घन — फिक्स गर्छ जुन सक्रिय उल्लङ्घनलाई अब दबाउन सक्दैन एक बासी प्रविष्टि आफैंमा एक दोष हो (6A.3 बासी-प्रवर्तनले एक पटक लागू गरेपछि अनाथ अनुमति सूची प्रविष्टिमा गेट असफल हुनेछ)।

गर** होइन** परीक्षणहरू छिटो पास गर्न अनुमति सूची प्रविष्टिहरू थप्नुहोस्। बढ्दो अनुमति सूचीको साथ हरियो गेट गुणस्तरको गलत अर्थ हो।

### जब तपाईंको PR मा गेट असफल हुन्छ

1. **गेट आउटपुट ध्यानपूर्वक पढ्नुहोस्** — ले तपाईंलाई कुन फाइल वा प्रतीकले नियम उल्लङ्घन गरेको छ भन्ने कुरा बताउँछ।
2. **उल्लङ्घन ठीक गर्नुहोस्** — धेरै जसो गेटहरू नियतात्मक फाइल प्रणाली जाँचहरू हुन् जुन कोड सही हुने बित्तिकै पास हुन्छ।
3. **यदि उल्लङ्घन पहिले नै अवस्थित छ** (अर्थात्, तपाईंले यो परिचय दिनुभएन तर गेटले अब यसलाई कभर गर्दछ): औचित्य टिप्पणी र ट्र्याकिङ मुद्दाको साथ अनुमति सूची प्रविष्टि थप्नुहोस्।
4. **यदि गेट एक र्याचेट हो** (कभरेज, ESLint चेतावनी, नक्कल, जटिलता): तपाईंको परिवर्तनले मेट्रिकलाई खराब बनायो। अन्तर्निहित समस्या समाधान गर्नुहोस्, वा (विरलै) `npm run quality:ratchet -- --update` चलाउनुहोस् यदि परिवर्तन जानाजानी हो र मेट्रिक डिग्रेडेसन स्वीकार्य — छ तर PR विवरणमा किन कागजात गर्नुहोस्।
5. **सल्लाहकार गेटहरू** (`continue-on-error: true`) जानकारीमूलक — हो तिनीहरू मर्जलाई रोक्दैनन् तर CI सारांशमा देखा पर्दछन्। तिनीहरूलाई जसरी पनि ठीक गर्नुहोस्।

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

## तर्कसंगत ब्याकलग (ROI समीक्षा — Fase 9 Onda 3)

यो सूची 2026-06-17 मा `ci.yml` विरुद्ध मिलाइएको थियो (पूर्व संस्करण `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` हटाइयो)। मेलमिलाप गरिएको सेटको ROI समीक्षाले निम्न तर्कसंगत उम्मेद्वारहरू पहिचान गर्यो।** मर्जहरू मेकानिकल CI परिवर्तनहरू हुन्; flips/drops अपरेटरका लागि आरक्षित नीतिगत निर्णयहरू हुन्।** तलको केहि पनि लागू गरिएको छैन।

**माथिको पनि कागजात नभएको** (सल्लाहकार, कम संकेत): `docs-lint` कार्य (markdownlint + Vale, whole job `continue-on-error`) र स्ट्यान्डअलोन स्क्यानर कार्यप्रवाह `semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0` `quality-baseline.json` मा छ तर `ci.yml` — मा ब्लकिङ र्याचेटमा तार गरिएको छैन मेट्रिक हाल अनाथ छ।

### मर्ज / डिडअप (मेकानिकल, कम जोखिम)

प्रत्येक उम्मेद्वारलाई 2026-06-17 मा लाइभ गेट राज्यको विरुद्धमा मान्यता दिइएको थियो (ट्रस्ट-बट-प्रमाणीकरण); ऋण लुकाउन धेरै "स्पष्ट" मर्जहरू निस्किए र छन्** होइन** ड्रप-इनहरू सफा गर्नुहोस्।

- **`check:docs-sync` दुई पटक चल्छ** `lint` काममा — स्ट्यान्डअलोन र फेरि `check:docs-all` (`docs-sync-strict`) र हस्की प्रि-कमिट हुक भित्र। ✅**DONE** — स्ट्यान्डअलोन `lint` आह्वान हटाइयो।
- **CVE स्क्यानिङ** — ❌**NOT एक सफा मर्ज।** `audit:deps` सबै पाँचवटा लकफाइलहरूमा महत्वपूर्ण सल्लाहहरू र अपूर्ण लेखापरीक्षणहरूलाई रोक्छ, जबकि वर्तमान नीति अन्तर्गत उच्च सल्लाहकारहरूलाई चेतावनीको रूपमा रिपोर्ट गर्दै; `check:vuln-ratchet` (osv) केवल _regression_ बनाम चेक-इन आधाररेखामा असफल हुन्छ र आवश्यक पर्दा छुटेको मापन अस्वीकार गर्दछ। फरक अर्थशास्त्र — छोड्ने `audit:deps` ले निरपेक्ष महत्वपूर्ण गेट र स्वतन्त्र प्याकेज लेखापरीक्षण रसिदहरू गुमाउनेछ। दुवै राख्नुहोस्।
- **साइकल पत्ता लगाउने** — ✅**DONE** (#15159 G-01/G-02)। यहाँ पुरानो पाठले `check:cycles` "हरियो, क्युरेट गरिएको" गेट भनिन्छ र यसलाई अवरुद्ध राख्नु जायज थियो किनभने `check:circular-deps` (dpdm) ले 91 चक्रहरू रिपोर्ट गरेको थियो। त्यो हरियो ए** गलत हरियो** : `check:cycles` ले 5 उपनिर्देशिकाहरू (450 फाइलहरू) स्क्यान गर्यो, स्थिर `import|export … from` सँग मात्र मेल खायो, र प्रत्येक `@/` र `@omniroute/open-sse/` निर्दिष्टकर्तालाई छोडियो, त्यसैले यसले रेपोमा हावी हुने गतिशील-आयात + उपनाम चक्रहरू देख्न सकेन। फिक्स्ड: गेट अब `src` + `open-sse` (5023 फाइलहरू) मा हिंड्छ, TypeScript AST बाट निर्दिष्टकर्ताहरू सङ्कलन गर्दछ (जसकारण `import("…")` गणना र टाइप-स्थिति `typeof import("…")` छैन), र tsconfig `paths` समाधान गर्दछ। फेला पार्छ** १४** चक्र, ० होइन। किनकि 14 पूर्व-अवस्थित चक्रहरू गेट PR मा फिक्स गर्न सकिँदैन, `check:cycles` अब एक हो।** शाफ्ट** (`--ratchet`, `quality-baseline.json` मा छत `metrics.cycles.value = 14`, `direction: down`) — यसले कुनै पनि _regression_ लाई रोक्छ र गणना मात्र घट्न सक्छ। CI `npm run check:cycles:ratchet` चलाउँछ। बर्न-डाउन सवारी संग**A-01** । `check:circular-deps` (dpdm) फराकिलो दोस्रो रायको रूपमा सल्लाहकार रहन्छ।
- **जटिलता** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): एक ESLint हिड्ने, ruleId द्वारा गणना हुन्छ त्यसैले cyclomatic + अधिकतम-लाइनहरू र संज्ञानात्मक आधार रेखाहरू स्वतन्त्र रहन्छन्; व्यक्तिगत `check:complexity` / `check:cognitive-complexity` स्थानीय `--update` को लागी रहन्छ।
- **`/api` विरोधी मतिभ्रम** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` को एक FS सूची, openapi-routes + कागजात-प्रतीकहरू अझै पनि स्वतन्त्र रूपमा रिपोर्ट गर्छन्; व्यक्तिहरू स्थानीय रनका लागि रहन्छन्।
- **`check:node-runtime` 11 कार्यहरूमा चल्छ** — ⚠️** कम ROI।** प्रत्येक एक अलग धावक हो र चेक < 1s हो; कुल बचत ~ 10s, सस्तो प्रति जागिर गार्ड गुमाउनु विरुद्ध। मन्थनको लायक छैन।
- **CI lint मा`typecheck:noimplicit:core`** — ✅** लिन्ट कामबाट हटाइयो** (सल्लाहकार `continue-on-error` थियो); अवरुद्ध प्रकार सतह `typecheck:core` + `check:type-coverage` हो। स्थानीय लिपि राखिएको छ।

### फ्लिप / निर्णय (अपरेटर नीति)

- `check:openapi-security-tiers` (सल्लाहकार) — ❌**NOT सफा फ्लिप योग्य।** यो 0 बाहिर निस्कन्छ तर `LOCAL_ONLY_API_PREFIXES` अन्तर्गत धेरै `traffic-inspector` मार्गहरूमा `x-loopback-only: true` एनोटेसनको कमी रहेको चेतावनी दिन्छ। यसलाई लागू गर्न पहिले ती एनोटेसनहरू `openapi.yaml` मा थप्न आवश्यक छ।
- `typecheck:noimplicit:core` (सल्लाहकार) — ठूलो मात्रामा अवरुद्ध `check:type-coverage` र्याचेट द्वारा समावेश। र्याचेटमा फ्लिप गर्नुहोस् वा अनावश्यक दोस्रो `tsc` पास छोड्नुहोस्।
- `test:vitest:ui` (अहिले** अवरुद्ध** ) — पूर्व-अवस्थित विफलताहरू स्पष्ट रूपमा `// #8618` ट्र्याकिङ टिप्पणीहरूको साथ `vitest.config.ts` मा बहिष्कृत छन्; नयाँ असफलताले कामलाई असफल बनाउँछ।
- `check:secrets` (gitleaks, blocking ratchet at 3 documented false-positives फ्रिज गरिएको) — ले ३ लाई ० मा पुग्न अनुमति दिन्छ, वा सल्लाहकारमा अवमूल्यन गर्दछ। ओभरल्याप GitHub नेटिभ गोप्य स्क्यानिङ + `check:public-creds`।
- `check:pr-evidence` (अवरोधित, greps PR-शरीर गद्य) — उच्च गलत-सकारात्मक जोखिम; यदि छोडियो भने कडा नियम #18 प्रवर्तनलाई कमजोर बनाउँछ, त्यसैले यो एक वास्तविक नीति कल हो।
- `semgrep` (सल्लाहकार स्ट्यान्डअलोन) — OWASP परिवारहरूको लागि CodeQL लाई ओभरल्याप गर्दछ; यसको आधार रेखालाई र्याचेट वा ड्रपमा तार गर्नुहोस्।

---

## सम्बन्धित दस्तावेज

- आपूर्ति श्रृंखला (प्रोभेन्स, SBOM, Trivy, स्कोरकार्ड): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — कुञ्जी-सेट समानता गेट

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, काम `i18n-ui-coverage`)। प्रत्येक `src/i18n/messages/<locale>.json` को पात कुञ्जी सेटलाई `en.json` सँग तुलना गर्छ र कुनै पनि अनुपस्थित वा अतिरिक्त पातमा असफल हुन्छ, चाहे जब कुञ्जी थपिएको थियो। `__MISSING__:` प्लेसहोल्डरहरू वर्तमानको रूपमा गणना गर्छन् (तिनीहरूको सामग्री अनुपात गेटको व्यवसाय हो)। यो दुई diff-based/percentage गेटहरूको पूर्ण पूरक हो: `check-ui-keys-coverage` 80 % फ्लोर प्रति लोकेल लागू गर्दछ ( ~ 13,000 मध्ये 43 अनुपस्थित कुञ्जीहरू अझै 99.7 % पढ्छन्) र `check-new-key-coverage` PR ले `en.json` मा थप्ने कुञ्जीहरूलाई मात्र न्याय गर्दछ। यसको शाखा काटिएको दिनको `en.json` बाट लोकेल ब्याच उत्पन्न हुन्छ र आधारले कुञ्जीहरू थपिरहँदा दिनसम्म अनुवाद गर्छ; ब्याच PR ले कुनै कुञ्जी थप्दैन, त्यसैले ब्याच 1 (#13044) ले नौ स्थानहरूमा 43 कुञ्जीहरू छोटो र ब्याच 2 (#13660) 10 कुञ्जीहरू आठ (2026-09-15) मा छोटो हुँदा दुवै भाइबहिनी चुपचाप बसे। `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` सँग रातो फिक्स गर्नुहोस्; एक `extra` पात भनेको स्रोतले यसलाई छोडेको हो — `sync-ui-keys` यसलाई छोड्छ (`--prune-extra`, पूर्वनिर्धारित)। `--warn` असफल बिना रिपोर्ट। `--catalog=cli` `bin/cli/locales` (`npm run i18n:check-keys:cli`) मा उही तुलना चलाउँछ; दुबै चरणहरू काम `i18n-ui-coverage` मा बस्छन्। निरपेक्ष जाँच रिलीज मोड मात्र हो: एक सुविधा PR ले `SKIP reason=pr-mode` देख्छ र फिक्स रिलिज रिफ्रेस वा अनुवाद तरंगमा चल्छ, PR सुविधामा कहिल्यै हुँदैन; एक PR जसले लोकेल क्याटलगहरू परिवर्तन गर्दछ तिनीहरूमध्ये प्रत्येकलाई मर्ज आधारको सट्टामा न्याय गरिएको छ (कार्य `i18n-ui-coverage` अन्तर्गत "दुई मोडहरू" हेर्नुहोस्)।

#### `check-new-key-coverage` — नयाँ-कुञ्जी i18n गेट

`check-ui-value-drift` को दाजुभाइ। त्यो एक अंग्रेजी मूल्य समात्छ कि थियो** पुन: लेखिएको** जबकि यसको अनुवादहरू पछाडि छोडियो; यसले एउटा अंग्रेजी कुञ्जी समात्छ जुन थियो** थपियो** जबकि केही स्थानीयहरूले यसलाई कहिल्यै प्राप्त गरेनन्।

`check-ui-keys-coverage` यो वर्ग देख्न सक्दैन: यसले प्रति लोकेल प्रतिशत फ्लोर लागू गर्छ, र ~ 13,000 बाट एघार अनुपस्थित कुञ्जीहरू 99.9% मा कभरेज छोड्छ। प्रति भाषा प्रतिशतले "यस सुविधालाई अनुवाद नगरिएको पठाइएको" — व्यक्त गर्न सक्दैन, सम्पूर्ण सुविधाले कुनै पाठ बिना नयाँ लोकेलमा अवतरण गर्न सक्छ र संख्यालाई कहिल्यै सार्न सक्दैन।

यसले सङ्केत गरेको घटना: अर्केस्ट्रेशन क्यानभासको चरण 3 ले त्यस समयमा अवस्थित 42 स्थानहरूमा यसको एघार कुञ्जीहरू अनुवाद गर्यो। घन्टा पछि EU-भाषा ब्याच (#13044) ले 51 लोकेलहरूमा रिपो लियो, र नौ नयाँ आगमनहरू (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ले तिनीहरूलाई कहिल्यै प्राप्त गरेनन्। `deepMergeFallback` अनुपस्थित कुञ्जीको लागि अंग्रेजीलाई प्रतिस्थापन गर्दछ, त्यसैले असफलता मोडलाई खाली UI — वास्तविकको सट्टा अनुवाद नगरिएको UI थियो, र निर्माणद्वारा मौन थियो।

यो आफ्नो दाजुभाइ जस्तै छ** भिन्न-अभिज्ञ** , काम गर्ने रूखको बिरूद्ध मर्ज आधारमा अङ्ग्रेजी तुलना गर्दै, त्यसैले पूर्व-अवस्थित ग्यापहरू स्थिर रहन्छन् र गेटलाई खोल्न कुनै माइग्रेसन आवश्यक पर्दैन।

**एक `__MISSING__:<english>` मार्करले यसलाई सन्तुष्ट गर्दैन (2026-09-17 देखि)।** यो 2026-09-16 मा आठ सुविधा PRs सम्म 61 कुञ्जीहरू थपे र मार्करलाई अनुवादको सट्टामा सबै 65 लोकेलहरूमा स्ट्याम्प गरिएको: यो गेटले सबैलाई स्वीकार गर्‍यो, PRs लाई रोकेको छैन, र प्रत्येक BR रिलिजमा वास्तविक- — लागि ब्लक गर्न असफल भयो। 3.2 % — 2.5 % > + )। मार्करलाई अब अनुपस्थित अनुवादको रूपमा न्याय गरिन्छ। 2026-11-13 देखि मात्र रिलीज मोड: PR ले `SKIP reason=pr-mode` देख्छ, र रिलीजमा PR (`BASE_REF=origin/main`) गेटले चक्र थपिएको प्रत्येक कुञ्जीलाई न्याय गर्दछ। रिलिज रिफ्रेसमा रातो फिक्स गर्नुहोस् वा `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` सँग अनुवाद तरंग, वा `npm run i18n:translate-new-keys` सँग समानान्तरमा सबै लोकेलहरू (`scripts/i18n/translate-new-keys.sh`, पृथक-सुरक्षित, `OMNIROUTE_TRANSLATION_*` env बिना सुरु गर्न अस्वीकार गर्दछ)। एउटा कुञ्जी जुन अङ्ग्रेजीमा रहनुपर्छ (पिन गरिएको product/engine/flag नाम) `scripts/i18n/untranslatable-keys.json` मा पर्छ, मार्करको पछाडि कहिल्यै हुँदैन। `vi` मार्करहरूलाई पूर्ण रूपमा प्रतिबन्धित गर्दछ (`tests/unit/i18n-vi-completeness.test.ts`)।

#### `check-vitest-exclusions` — पार्क गरिएको-परीक्षण गेट

`vitest.config.ts` को `exclude` सूचीमा भएको फाइल एक परीक्षण हो जुन चल्दैन, र यो रूख पढ्ने जो कोहीलाई कभरेज जस्तो देखिन्छ। `// #8618 — pre-existing failure; remove this exclusion when fixed` कमेन्टको पछाडि जम्मा भएका ६२ फाइलहरू। मुद्दा #8618 2026-08-11 मा बन्द गरिएको थियो जबकि यो ट्र्याक गरिएको सूची 45 प्रविष्टिहरू बाट 62 मा बढ्यो, प्रत्येक नयाँले एक मृत मुद्दामा औंल्याउदै टिप्पणी प्राप्त गर्दछ। जब सूची अन्ततः फाइल द्वारा फाइल मापन गरियो (#13204),** 62 मध्ये 51 कुनै स्रोत परिवर्तन बिना हालको रूख विरुद्ध पारित भयो** ।

गेटलाई वास्तविक फाइलमा समाधान गर्ने प्रत्येक बहिष्कार चाहिन्छ (a) ट्र्याकिङ समस्याको नाम दिनुहोस् र (b) `config/quality/vitest-exclusions.json` मा यसको मापन गरिएको स्थितिमा देखा पर्दछ, त्यसैले 60-प्रविष्टि एरेमा एक थप लाइनको सट्टा एक समर्पित फाइलमा समीक्षा गर्न सकिने भिन्नता हो। यसले जानाजानी बहिष्कृत परीक्षणहरू — पुन: चलाउँदैन जुन ~ 10 मिनेट खर्च हुन्छ र आवधिक काममा पर्दछ; प्रत्येक अन्तिम मापन गर्दा सूची रेकर्ड।
