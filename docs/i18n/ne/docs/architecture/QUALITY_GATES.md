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

CI र क्वालिटी गेट्स कार्यप्रवाहहरूले प्रत्येक स्थिर निर्णय उत्सर्जन गर्दछ: `Gate / CI` र `Gate / Quality`। तिनीहरूको संस्करण भर्ना नीतिले प्रत्येक अपस्ट्रीम कार्यलाई आवश्यक वा सल्लाहकारको रूपमा गणना गर्दछ। एक लागू आवश्यक काम सफल हुनुपर्दछ: हराइरहेको, रद्द गरिएको, छोडिएको, पेन्डिङ र अज्ञात परिणामहरूले PASS स्थापना गर्न सक्दैन। वैध कागजात-मात्र वा क्याटलग-मात्र वर्गीकरणले कोड लेनलाई लागू नहुन सक्छ; ड्राफ्ट PR स्वीकार्य उम्मेद्वार होइन। एक `hotfix` लेबल प्रमाण माफ गर्दैन।

दुबै कार्यप्रवाहले PRs main/release शाखाहरूमा कभर गर्दछ, `main` मा पुश, म्यानुअल डिस्प्याच र मर्ज-समूह घटनाहरू। पुश, डिस्प्याच र मर्ज-समूह पूर्ण चयन चलाउनुहोस्। `release/**` मा पुश गर्दा तिनीहरूलाई सुरु गर्दैन (2026-10-18): प्रत्येक परिवर्तनले पहिले नै यसको PR मा म्याट्रिक्स चलाएको छ र मर्ज गरिएको संयोजन रिलीज-ग्रीनको काम हो (`docs/ops/RUNNER_BOX.md` → होस्टेड लेन)। फोर्क्स र मर्ज समूहहरूले कामका लागि होस्टेड धावकहरू प्रयोग गर्छन् जसले अन्यथा स्व-होस्ट गरिएका धावकहरू चयन गर्छन्; रोलआउट गर्नु अघि पर्याप्त होस्ट गरिएको क्षमता प्रमाणित गरिनु पर्छ।

एक साधारण PR छिटो चयन चलाउँछ। भर्ना नीतिको `full-code` र `full-code-e2e` लेनहरू (E2E, एकीकरण, प्याकेज आर्टिफ्याक्ट, Electron धुवाँ, Bun SQLite, इकोसिस्टम र प्रोटोकल क्लाइन्टहरू) केवल मर्जिफाइ क्यु ड्राफ्टमा वा पूर्ण रूपमा चल्छन्: `gh workflow run ci.yml --ref <branch>`।

प्रत्येक JSON रसिदले चेक-आउट SHA, कार्यप्रवाह रन र प्रयास पहिचान गर्दछ। CLI ले checkout/event SHA बेमेललाई अस्वीकार गर्दछ। कार्यप्रवाह परीक्षणहरूले नीति सदस्यतालाई निर्णय कार्यको `needs` सूचीमा बाँध्न्छन् त्यसैले नयाँ वा हटाइएको लेन चुपचाप हराउन सक्दैन। रसिदहरूले तिनीहरूको आफ्नै कार्यप्रवाहलाई कभर गर्दछ, प्रकाशन, तैनाती, वा अवस्थित सल्लाहकार स्क्यानरको आन्तरिकहरू। शाखा नियमहरूमा दुबै चेक नामहरू सक्रिय गर्नु छुट्टै प्रशासनिक परिवर्तन हो; यी कामहरू थप्नु आफैमा शाखाको सुरक्षा गर्दैन।

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

| लिपि (`npm run ...`)              | प्रमाणीकरण गर्दछ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | अवरुद्ध गर्दै                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js संस्करण समर्थित दायरा भित्र छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                        |
| `check:cycles`                    | सबै `src/` + `open-sse/` (AST-आधारित, tsconfig `paths` समाधान गरिएको) मा सर्कुलर आयातहरू। कुनै पनि चक्र अवस्थित हुँदा Bare 1 बाट बाहिर निस्कन्छ ( #15281 देखि असफल बन्द) र SCCs लाई सूचीबद्ध गर्दछ। `check:cycles:ratchet` (के CI चल्छ) ब्लक हुन्छ जब गणना `quality-baseline.json` — हाल 14, `direction: down` मा `metrics.cycles` छत नाघेको छ, त्यसैले यो मात्र खस्न सक्छ (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | हो (रैचेट)                                |
| `check:boundary`                  | `open-sse → src` युग्मन: एपमा इन्जिनबाट फाइल-टु-फाइल आयातहरू (`scripts/quality/measure-boundary.mjs`; किनारा सूची v4 core/module-split remediation ब्याकलग हो)। Bare = सल्लाहकार रिपोर्ट ( `quality:boundary` जस्तै)। `check:boundary:ratchet` (के CI चल्छ, `quality.yml` फास्ट-गेट्स र्याचेट लुपमा पनि) ब्लक हुन्छ जब गणना `quality-baseline.json` — मा `metrics.boundaryOpenSseToSrc` छत नापेको 771 मा `direction: down`; `--update` मात्र यसलाई कम गर्छ; PRs मा आधार-सापेक्ष (`--base-ref`, तल हेर्नुहोस्)                                                                                                                                                                                                                                                                                                                                                        | हो (रैचेट)                                |
| `check:route-validation:t06`      | Zod योजनाहरू सबै मार्गहरूमा उपस्थित छन् (टियर 6 नीति)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` गणना बजेट भन्दा बढी छैन (टियर 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                        |
| `check:provider-consistency`      | `providers.ts` मा प्रत्येक प्रदायकसँग `providerRegistry.ts` मा मिल्दो प्रविष्टि छ (र यसको विपरीत, अनुमति सूची भित्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                        |
| `check:model-lifecycle`           | तीनवटा ह्यान्ड-मेन्टेन राउटिङ तालिकाहरू चेक-इन गरिएको लाइफसायकल स्न्यापसट (#11503) सँग एकरूप रहन्छन् : `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` ले रुट गर्न सक्ने कुनै रिटायर आइडी स्कोर गर्दैन; प्रत्येक `BUILT_IN_ALIASES` लक्ष्य `REGISTRY` मा उपस्थित छ र रिटायर-आईडी स्न्यापसटबाट अनुपस्थित छ; `REGISTRY` मा रहेको प्रत्येक सेवानिवृत्त आईडी `allowedRetiredInCatalog` मा फर्वार्ड वा सूचीबद्ध गरिएको छ; र त्यो स्न्यापसटमा कुनै `DEFAULT_DEGRADATION_MAP` स्रोत वा लक्ष्य रिटायर भएको देखिँदैन। यसले प्रमाणित गर्दैन कि मोडेल हाल लाइभ अपस्ट्रीम द्वारा सेवा गरिएको छ। अफलाइन — `config/quality/model-lifecycle.json` विरुद्ध तुलना गर्दछ, `npm run quality:refresh-model-lifecycle` (नेटवर्क; CI मा तार नभएको) सँग हातले ताजा गरिएको। `allowedRetiredInCatalog` एक बर्न-डाउन र्याचेट हो: ट्र्याकिङ मुद्दाको साथ मात्र प्रविष्टि थप्नुहोस्।               | हो                                        |
| `check:fetch-targets`             | ग्राहक-साइड `src/` मा प्रत्येक `fetch("/api/...")` वास्तविक `route.ts` मा समाधान गर्दछ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                        |
| `check:deps`                      | सबै `npm install` -able deps रेपोमा प्रत्येक `package.json` मा `dependency-allowlist.json` मा छन्; नयाँ अनपिन वा स्लोप्सक्वाटेड प्याकेजहरू झण्डा लगाइयो                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                        |
| `audit:deps`                      | सबै पाँच स्वतन्त्र लकफाइलहरूको npm अडिट (रूट, Electron, OpenCode प्लगइनहरू v1/v2 र प्रदायक)। आलोचनात्मक सल्लाह ब्लक; उच्च सल्लाहहरू देखिने चेतावनीहरू रहन्छन्। Missing/failed अडिटहरू INCOMPLETE र ब्लक हुन्; प्रति-स्कोप लक ह्यासहरू र रिपोर्टहरू राखिएका छन्।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                        |
| `check:lockfile`                  | `package-lock.json` integrity — https रजिस्ट्री, अखण्डता ह्यास, कुनै होस्ट ओभरराइड छैन                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                        |
| `check:licenses`                  | उत्पादन निर्भरताहरूको लागिSPDX लाइसेन्स अनुमति सूची                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | हो                                        |
| `check:tracked-artifacts`         | कुनै निर्माण कलाकृतिहरू / प्रतिबद्ध `node_modules` सिमलिङ्कहरू छैनन् (हस्की प्रि-कमिटमा पनि चल्छ; पूर्व-पुश जानाजानी हल्का — #6716 हो)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                        |
| `check:ai-attribution`            | PR कमिट, शीर्षक वा बडी — हार्ड नियम #16 मा कुनै AI/bot `Co-Authored-By` ट्रेलर वा AI-जेनेरेसन फुटर छैन `commit-msg` PR→ `release/**` — को लागि `quality.yml` फास्ट-गेट्स लुपमा घटना पेलोड पढ्छ, no-op off PRs — -PR र in `ci.yml` PR→; मानव सह `main` लेखकहरूलाई पनि अनुमति दिइएको छ #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | प्रत्येक Vitest बहिष्करणले ट्र्याकिङ समस्याको नाम दिन्छ र `config/quality/vitest-exclusions.json` (#13204) मा देखिन्छ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                        |
| `check:file-size`                 | स्रोत फाइलहरू (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` भित्र र परीक्षण फाइलहरू (`*.test.ts(x)`) `testCap` भित्र रहन्छन् ; `file-size-baseline.json` (`frozen` / `testFrozen`) मा फ्रिज गरिएका फाइलहरू तिनीहरूको रेकर्ड गरिएको आकारभन्दा अघि बढ्नु हुँदैन।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | हो                                        |
| `check:error-helper`              | executors/handlers मा त्रुटि प्रतिक्रियाहरू `buildErrorBody()` / `sanitizeErrorMessage()` प्रयोग गर्दछ (हार्ड नियम #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | हो                                        |
| `check:migration-numbering`       | माइग्रेसन SQL फाइलहरू क्रमिक रूपमा नम्बर गरिएका छन्, कुनै खाली वा नक्कलहरू छैनन्                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                        |
| `check:public-creds`              | `publicCreds.ts` बाहिर कुनै शाब्दिक OAuth `client_id`/`client_secret` वा फायरबेस वेब कुञ्जीहरू छैनन् (हार्ड नियम #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | हो                                        |
| `check:db-rules`                  | `src/lib/db/` मोड्युल बाहिर कुनै कच्चा SQL छैन; `localDb.ts` बाट ब्यारेल-आयात छैन (हार्ड नियम #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                        |
| `check:known-symbols`             | प्रदायक निष्पादकहरू, राउटिंग रणनीतिहरू, र तिनीहरूको प्रेषण तालिकाहरूमा दर्ता गरिएका अनुवादकहरू डिस्क — कुनै अनाथ वा अघोषित प्रतीकहरूमा फाइलहरूसँग मेल खाँदैनन्।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | हो                                        |
| `check:route-guard-membership`    | प्रत्येक मार्ग जसले बच्चा प्रक्रियालाई जन्म दिन्छ `isLocalOnlyPath()` (कडा नियम #15/#17) द्वारा वर्गीकृत गरिन्छ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | हो                                        |
| `check:test-discovery`            | रेपोमा प्रत्येक `*.test.ts` / `*.spec.ts` फाइल कम्तिमा एक परीक्षण धावक द्वारा सङ्कलन गरिन्छ (ratchet: `test-discovery-baseline.json` मा अनाथ सूची मात्र संकुचित हुन सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | हो                                        |
| `check:test-tla-order`            | `tests/unit` अन्तर्गत कुनै `node:test` फाइलले परीक्षण दर्ता गर्दैन, शीर्ष-स्तर `await` मा हिट गर्छ, त्यसपछि थप दर्ता गर्दछ (#18045; ratchet: `test-tla-order-allowlist.json` मात्र संकुचित हुन सक्छ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | हो                                        |
| `check:agent-skills-sync`         | उत्पन्न एजेन्ट-कौशल कलाकृतिहरू तिनीहरूको स्रोत सूचीसँग मेल खान्छ (कुनै बहाव छैन)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | प्रदायक logos/assets ले रेकर्ड गरिएको प्रोभेन्स प्रविष्टि बोक्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON कन्फिगरेसन फाइलहरू पार्स र repo lint नियमहरू सन्तुष्ट                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | त्रुटि बिनाTypeScript संकलन (सल्लाहकारी चेतावनी मात्र)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | हो                                        |
| `typecheck:noimplicit:core`       | कडा `noImplicitAny` — अग्रगामी; धेरै पूर्व-अवस्थित कल साइटहरूलाई अझै एनोटेसनहरू चाहिन्छ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **सल्लाहकार** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core` को क्युरेट गरिएको 27-फाइल अनुमति सूचीमा कुनै पनि ड्यासबोर्ड TSX समावेश छैन, र `next build` यसलाई कहिले पनि टाइप-जाँच गर्दैन (`next.config.mjs` सेट गर्दछ `ignoreBuildErrors: true`), त्यसैले अनाथ-पहिचानकर्ता रिग्रेसनहरू त्यहाँ (#6625/#6909CI. फ्रिज गरिएको per-file/per-TS-code गणना आधार रेखा (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` जस्तै बासी-प्रवर्तन ढाँचा ) NEW — गेट असफल हुन्छन्; पूर्व-अवस्थित त्रुटि फिक्स हुँदा `--update` सँग र्याचेट डाउन।                                                                                                                                                                                                                                                                                                   | हो                                        |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), सतह `typecheck:core` को 27-फाइल अनुमति सूची र ड्यासबोर्ड गेटले कभर गर्दैन। `config/quality/build-typecheck-baseline.json` विरुद्ध भिन्नता; नयाँ वा बढेको प्रति-(फाइल, कोड) गणना असफल हुन्छ, कम गणनाले तपाईंलाई र्याचेट गर्न सोध्छ। रनमा `--force-regressions` पास नभएसम्म नयाँ वा उठाइएको जोडी समावेश हुँदा `--update` अस्वीकार गर्दछ, र `--force-nocheck` पास नभएसम्म नयाँ मौन फाइल अस्वीकार गर्दछ, त्यसैले हरियो प्राप्त गर्न आधाररेखा फराकिलो बनाउन र स्थायी मौन प्रदान गर्नु दुई छुट्टै जानाजानी कार्यहरू हुन्। एक खाली `--force` अस्वीकार गरिएको छ। `config/quality/ts-nocheck-baseline.json` बिरूद्ध `@ts-nocheck` को लागि निर्माण स्कोप पनि स्क्यान गर्दछ, किनकि यसलाई प्रयोग गर्ने फाइलले कुनै पनि निदान रिपोर्ट गर्दैन र अन्यथा प्रत्येक गेटमा अदृश्य हुनेछ। | हो                                        |

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

### काम: `quality-extended`

सम्पूर्ण काम सल्लाहकार (`continue-on-error: true`) हो। npm-आधारित ratchets वास्तविक लागि चल्छ; बाइनरी अझै अनुपस्थित हुँदा बाह्य स्क्यानरहरू `gh release download` र सेल्फ-स्किप (निकास ०) मार्फत स्थापना हुन्छन्।

| लिपि                     | प्रमाणीकरण गर्दछ                                                                                                                                                                                                         | अवरुद्ध गर्दै                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `check:circular-deps`    | कुनै गोलाकार निर्भरता (dpdm)                                                                                                                                                                                             | **सल्लाहकार**                                    |
| `check:bundle-size`      | बन्डल आकार क्याप भन्दा बढी छैन                                                                                                                                                                                           | **सल्लाहकार**                                    |
| `check:secrets`          | बाइनरी अनुपस्थित भएमा गोप्य स्क्यानिङ (gitleaks) — स्किप हुन्छ                                                                                                                                                           | **सल्लाहकार**                                    |
| `check:vuln-ratchet`     | निर्भरता कमजोरीहरू (osv-scanner) — `--ratchet` फेल INCOMPLETE (निकास 2) मापन नगरिएको खण्डमा असफल हुन्छ।                                                                                                                  | **सल्लाहकार**                                    |
| `check:workflows`        | कार्यप्रवाह लिन्ट (एक्शनलिन्ट + zizmor); missing/broken स्क्यानरहरू, अमान्य रिपोर्टहरू वा हराएको र्याचेट आधार रेखा INCOMPLETE को रूपमा असफल हुन्छ। वैध निष्कर्षहरू चयन गरिएको strict/advisory/ratchet नीतिको पालना गर्दछ | कार्यान्वयन आवश्यक; CI मा zizmor ratchet अवरुद्ध |
| `check:openapi-breaking` | पिन गरिएको घटना कमिटहरू विरुद्ध सार्वजनिक API अनुबंध (PR मर्ज-बेस, पुश अघि, मर्ज-समूह आधार; scheduled/manual चेकआउट पहिलो अभिभावक); आवश्यक मापन असफल बन्द                                                                | **--ratchet सँग अवरुद्ध गर्दै**                  |

### काम: `docs-sync-strict`

प्रत्येक PR देखि `main` मा चल्छ। ब्लकहरू विफलतामा मर्ज हुन्छन्।

| लिपि                           | प्रमाणीकरण गर्दछ                                                                                                                                      | अवरुद्ध गर्दै                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | मेटा-गेट जसले क्रमिक रूपमा तल 6 उप-गेटहरू चलाउँछ                                                                                                      | हो                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt संस्करण स्थिरता                                                                                                         | हो                            |
| ↳ `check:docs-counts`          | गद्यमा गणनाहरू (प्रदायक गणना, माइग्रेसन गणना, आदि) वास्तविक गणनाहरूको र्याचेट विन्डो भित्र छन्।                                                       | हो                            |
| ↳ `check:env-doc-sync`         | `.env.example` मा प्रत्येक env var कागजात तालिकामा दस्तावेज गरिएको छ, र यसको विपरित                                                                   | हो                            |
| ↳ `check:deprecated-versions`  | कागजातहरूमा कुनै पनि बहिष्कृत संस्करण स्ट्रिङहरू छैनन्                                                                                                | हो                            |
| ↳ `check:doc-links`            | कागजातहरूमा आन्तरिक मार्कडाउन लिङ्कहरू वास्तविक फाइलहरूमा समाधान गर्दछ (`[text]`/`(path)` फारम)                                                       | हो                            |
| ↳ `check:fabricated-docs`      | मार्गहरू, env vars, CLI आदेशहरू, हुक नामहरू, र कागजातहरूमा उद्धृत फाइल मार्गहरू कोडबेसमा अवस्थित छन्। `--strict` मार्फत कडा गेट; झण्डा बिना सफ्ट-फेल। | हो ( `--strict` मार्फत CI मा) |
| `check:cli-i18n`               | CLI आदेश स्ट्रिङहरू सबै i18n लोकेल फाइलहरूमा उपस्थित छन्                                                                                              | हो                            |
| `check:openapi-coverage`       | OpenAPI spec ले कम्तिमा वास्तविक मार्गहरूको र्याचेटेड फ्लोर कभर गर्दछ                                                                                 | हो                            |
| `check:openapi-security-tiers` | `openapi.yaml` मा सुरक्षा स्तरीय एनोटेसनहरू `routeGuard.ts` वर्गीकरणसँग मिल्दोजुल्दो छन्                                                              | **सल्लाहकार**                 |
| `check:openapi-routes`         | `openapi.yaml` मा हरेक बाटो एक वास्तविक `route.ts` (विरोधी भ्रम) मा समाधान गर्दछ                                                                      | हो                            |
| `check:docs-symbols`           | `docs/**/*.md` मा प्रत्येक `/api/...` सन्दर्भले वास्तविक `route.ts` (विरोधी भ्रम) लाई समाधान गर्दछ।                                                   | हो                            |
| `i18n translation drift`       | i18n लोकेल फाइलहरूमा अनुवाद नगरिएका कुञ्जीहरू — मात्र चेतावनी दिन्छ                                                                                   | **सल्लाहकार**                 |

`docs/diagrams/` अन्तर्गत बाह्र README SVGs उत्पन्न हुन्छ (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ती सबैलाई पुन: उत्पन्न गर्दछ)। प्रत्येकसँग बाइट-तुलना एकाइ परीक्षण (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) हुन्छ जुन प्रतिबद्ध फाइल बासी हुँदा असफल हुन्छ, र `check:docs-counts` तिनीहरूको `<text>` नोडहरू — बाट क्यानोनिकल नम्बरहरू पढ्छ जसका कारण रूपरेखा चरणले फाइलमा प्रत्येक रूपरेखा स्ट्रिङलाई अदृश्य `<text>` रूपमा राख्छ। SVG क्यानोनिकल-नम्बर चेकले `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) मा सूचीबद्ध फाइलहरू पढ्छ: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, प्लस `public/images/tier-flow-dark.svg` र `tier-flow-light.svg`; फ्री-सदाका लागि, क्याटलग-प्रविष्टि, पुनरावर्ती-पूल र स्कोरिङ-कारक दावीहरू पनि `promise-pillars.svg`, `free-tier-budget.svg` र `strategies-grid.svg` पढ्छन्। `free-tier-budget.svg` लाइभ क्याटलग लोडरबाट यसको तथ्याङ्कहरू कोर्छ, त्यसैले `FREE_MODEL_BUDGETS` वा प्रदायकको प्रदर्शन नाममा परिवर्तन गर्दा त्यो फाइल पुन: उत्पन्न नभएसम्म CI रातो हुन्छ।

### काम: `i18n-ui-coverage`

| लिपि                              | प्रमाणीकरण गर्दछ                                                                                                                                                                         | अवरुद्ध गर्दै |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (इनलाइन) | UI i18n कुञ्जी कभरेज ≥ 65% छ                                                                                                                                                             | हो            |
| `check-ui-value-drift` (इनलाइन)   | पुन: लेखिएको अंग्रेजी** मूल्य** कुनै बासी अनुवाद पछि छोड्दैन                                                                                                                             | हो            |
| `check-new-key-coverage` (इनलाइन) | ए** नयाँ** अंग्रेजी कुञ्जी प्रत्येक लोकेलमा अनुवाद गरिएको छ — `__MISSING__:` मार्कर अस्वीकार गरिएको छ                                                                                    | हो            |
| `check-translation-ratio`         | प्रति लोकेल वास्तविक-अनुवाद अनुपात (समान-देखि-अंग्रेजी / प्लेसहोल्डर / अनुमति सूची बाहिर हराइरहेको पातहरू) `config/quality/i18n-translation-baseline.json` + ढिलो भन्दा बढी हुनु हुँदैन। | **सल्लाहकार** |

`fetch-depth: 0` — आवश्यक छ मूल्य-बहाव गेट मर्ज आधार विरुद्ध `en.json` भिन्न हुन्छ।

#### `check-ui-value-drift` — बासी-अनुवाद गेट

एक i18n प्रतिगमनलाई अन्य गेटहरूले संरचनात्मक रूपमा देख्न सक्दैनन्: एक अंग्रेजी मान पुन: लेखिएको छ र _previous_ अंग्रेजीबाट व्युत्पन्न गरिएका अनुवादहरू पछाडि रहन्छन्, त्यसैले गैर-अंग्रेजी प्रयोगकर्ताहरूले आत्मविश्वासपूर्वक-शब्दहरू, अहिले-गलत प्रतिलिपि पढ्न जारी राख्छन्।

यो वास्तविक लागि पठाइयो। `oauthModal.googleOAuthWarning` पुन: लेखिएको थियो जब Antigravity लगइन सहायक अवतरण भयो (#5203);** 43 को 39 लोकेलहरू** अपरेटरहरूलाई "पूरा URL प्रतिलिपि गरेर तल — " भनी पाठ राख्यो जुन त्यो प्रदायकको लागि पूरा हुन सक्दैन। यो #8463 सम्म बेवास्ता भयो किनभने:

- `sync-ui-keys` ले ब्याकफिल कुञ्जीहरू मात्र हुन्** अनुपस्थित** , त्यो कहिल्यै होइन** बासी** ;
- `check-ui-keys-coverage` कुञ्जी _presence_ लाई गणना गर्छ, त्यसैले बासी अनुवादको स्कोर कभर हुन्छ;
- `check-translation-drift` `docs/i18n/<locale>/**.md` कागजातहरू मिररहरू — ट्र्याक गर्दछ यसले `src/i18n/messages/*.json` कहिल्यै पढ्दैन। 2026-09 पुन: सिंक पछि काम `docs-sync-strict` मा अवरुद्ध: कोर कागजात → `npm run i18n:run -- --files=<doc>` (खण्ड-स्तर, सस्तो) सम्पादन गर्नुहोस्।

**फरक-सचेत, आधारभूत-समर्थित होइन।** यसले काम गर्ने रूखसँग मर्ज आधारमा `en.json` तुलना गर्छ; प्रत्येक कुञ्जीको लागि जसको अङ्ग्रेजी मान परिवर्तन भयो, कुनै पनि लोकेलले अझै पनि अछोएको अनुवाद बासी छ। यो जानाजानी** पूर्व अवस्थित ऋण फ्रिज गर्दछ** — a diff ले लामो समयदेखि चलेको अनुवाद कुन पुरानो अङ्ग्रेजीबाट आएको हो भनेर खुलासा गर्न सक्दैन, त्यसैले गेटले हालको परिवर्तनले के छुन्छ भनेर मात्र न्याय गर्छ। वैकल्पिक (एक प्रति-कुञ्जी ह्यास आधार रेखा) को लागत ~ 600 KB उत्पन्न फाइल हुनेछ, 3 × सबैभन्दा ठूलो अवस्थित आधार रेखा, प्रत्येक i18n PR मा मंथन।

यसलाई सन्तुष्ट पार्न दुई तरिकाहरू:

1. प्रभावित अनुवादहरू अपडेट गर्नुहोस्, वा
2. तिनीहरूलाई `__MISSING__:<new english>` — मा रनटाइम सेट गर्नुहोस् त्यसपछि सही अंग्रेजी (`src/i18n/request.ts::deepMergeFallback`, #7258) र अनुवादको लागि कुञ्जी लाइनहरू सेवा गर्दछ।

यदि तार छ** अर्थ** परिवर्तन, प्राथमिकता** कुञ्जी पुन: नामाकरण गर्दै** : नयाँ कुञ्जीले पुरानो अनुवाद इनहेरिट गर्न सक्दैन। त्यो ढाँचा #8463 प्रयोग गरिएको छ।

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

`SKIP reason=base-unresolved` सँग 0 बाहिर निस्कन्छ जब आधार क्याटलग पढ्न सकिँदैन (बेस रेफ बिना उथले क्लोन), मिररिङ `check-openapi-breaking`।

### काम: `i18n`

पूर्ण i18n प्रमाणीकरण म्याट्रिक्स (प्रति लोकेल एक काम)। सम्पूर्ण काम सल्लाह हो।

| लिपि                            | प्रमाणीकरण गर्दछ           | अवरुद्ध गर्दै                                            |
| ------------------------------- | -------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | प्रति लोकेल अनुवाद पूर्णता | **सल्लाहकार** (सम्पूर्ण काममा`continue-on-error: true` ) |

### काम: `pr-test-policy`

पुल अनुरोधमा मात्र चल्छ।

| लिपि                   | प्रमाणीकरण गर्दछ                                                                                                                            | अवरुद्ध गर्दै |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check:pr-test-policy` | PRs जसले `src/`, `open-sse/`, `electron/`, वा `bin/` मा उत्पादन कोड परिवर्तन गर्दछ परीक्षणहरू समावेश वा अद्यावधिक गर्नुपर्छ (हार्ड नियम #8) | हो            |
| `check:test-masking`   | परिवर्तन गरिएका परीक्षण फाइलहरूले शुद्ध दाबी गणना घटाउँदैन वा `assert.ok(true)` tautologies थप गर्दैन                                       | हो            |
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
| `nightly-property`     | अनियमित बीज + उच्च रन गणना संग द्रुत-जाँच सम्पत्ति परीक्षण                                                                                            | **सल्लाहकार** |
| `nightly-resilience`   | हिप-वृद्धि गेट, अराजकता दोष-इंजेक्शन, k6 load/soak                                                                                                    | **सल्लाहकार** |
| `nightly-llm-security` | promptfoo इंजेक्शन गार्ड (ब्लक मोड) + garak प्रोब (प्रदायक गोप्य बिना छोडियो)                                                                         | **सल्लाहकार** |
| `nightly-schemathesis` | OpenAPI अनुबंध फजिङ (स्कीमाथेसिस) प्रत्यक्ष OmniRoute विरुद्ध `docs/openapi.yaml` — सतह विशिष्ट उल्लङ्घनहरू / अनह्यान्डल 500s (Fase 8 B.4) प्रयोग गरी | **सल्लाहकार** |
| `nightly-mutation`     | स्ट्राइकर उत्परिवर्तन-परीक्षण स्कोर फास्ट एकाइ लेन — मा जीवित म्युटेन्टहरू कमजोर दाबीहरू                                                              | **सल्लाहकार** |
| `nightly-compat`       | समर्थित `engines.node` दायराहरूमा नोड इन्जिन अनुकूलता म्याट्रिक्स                                                                                     | **सल्लाहकार** |

कार्यसम्पादन आधार रेखाहरू (heap, TTFB, निर्माण समय) रेकर्ड गरिएको छ, गेट गरिएको छैन: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) हेर्नुहोस्।

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
2. **उल्लङ्घन ठीक गर्नुहोस्** — धेरै जसो गेटहरू निर्धारणवादी फाइल प्रणाली जाँचहरू हुन् जुन कोड सही हुने बित्तिकै पास हुन्छ।
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
