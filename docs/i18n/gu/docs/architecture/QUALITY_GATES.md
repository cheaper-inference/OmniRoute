# Quality Gates Reference (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

આ દસ્તાવેજ OmniRoute માંના તમામ CI ગુણવત્તા ગેટ્સ માટેનો અધિકૃત સંદર્ભ છે.
તે દરેક ગેટ, તે શું માન્ય કરે છે, તે કયા CI જોબમાં ચાલે છે, તે
ratchet baseline અથવા pass/fail policy નો ઉપયોગ કરે છે કે કેમ, અને તે બિલ્ડને અવરોધે છે કે માત્ર સલાહકારી છે તે વર્ણવે છે.

ટૂંકા સારાંશ અને allowlist policy માટે, `AGENTS.md` માંનો "Quality Gates & Ratchets" વિભાગ જુઓ.
આ જ સિસ્ટમના નિર્ણાયક મૂલ્યાંકન, પરિપક્વતા વર્ગીકરણ અને ટૂલ-અજ્ઞેયી
પુનરાવર્તન પ્લાન માટે,
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md) જુઓ.

---

## ગેટ ઇન્વેન્ટરી અને એક્ઝેક્યુશન પ્રોફાઇલ્સ

### ઉમેદવાર પ્રવેશ

CI અને ક્વોલિટી ગેટ્સ વર્કફ્લો દરેક એક સ્થિર ચુકાદો બહાર કાઢે છે: `Gate / CI` અને `Gate / Quality`. તેમની આવૃત્તિવાળી પ્રવેશ નીતિ દરેક અપસ્ટ્રીમ જોબને જરૂરી અથવા સલાહકાર તરીકે ગણાવે છે. લાગુ જરૂરી કામ સફળ થવું જોઈએ: ગુમ થયેલ, રદ કરેલ, છોડેલ, બાકી અને અજ્ઞાત પરિણામો PASS સ્થાપિત કરી શકતા નથી. માન્ય દસ્તાવેજ-માત્ર અથવા સૂચિ-માત્ર વર્ગીકરણ કોડ લેનને અયોગ્ય બનાવી શકે છે; ડ્રાફ્ટ PR સ્વીકૃત ઉમેદવાર નથી. `hotfix` લેબલ પુરાવાને માફ કરતું નથી.

બંને વર્કફ્લો PRs main/release શાખાઓમાં આવરી લે છે, `main` પર દબાણ કરે છે, મેન્યુઅલ ડિસ્પેચ અને મર્જ-ગ્રુપ ઇવેન્ટ્સ. પુશ, ડિસ્પેચ અને મર્જ-ગ્રુપ સંપૂર્ણ પસંદગી ચલાવો. `release/**` પર ધકેલવાથી તેઓ શરૂ થતા નથી (2026-10-18): દરેક ફેરફાર પહેલાથી જ તેના PR પર મેટ્રિક્સ ચલાવે છે અને મર્જ કરેલ સંયોજન એ રિલીઝ-ગ્રીનનું કામ છે (`docs/ops/RUNNER_BOX.md` → હોસ્ટેડ લેન). ફોર્ક્સ અને મર્જ જૂથો નોકરીઓ માટે હોસ્ટ કરેલા દોડવીરોનો ઉપયોગ કરે છે જે અન્યથા સ્વ-હોસ્ટેડ દોડવીરો પસંદ કરે છે; રોલઆઉટ પહેલાં પૂરતી હોસ્ટ કરેલી ક્ષમતા ચકાસવી આવશ્યક છે.

એક સામાન્ય PR ઝડપી પસંદગી ચલાવે છે. પ્રવેશ નીતિની `full-code` અને `full-code-e2e` લેન (E2E, એકીકરણ, પેકેજ આર્ટિફેક્ટ, Electron સ્મોક, Bun SQLite, ઇકોસિસ્ટમ અને પ્રોટોકોલ ક્લાયન્ટ્સ) ફક્ત મર્જિફાઇ કતાર ડ્રાફ્ટ પર અથવા સંપૂર્ણ રન પર ચાલે છે: `gh workflow run ci.yml --ref <branch>`.

દરેક JSON રસીદ ચેક-આઉટ SHA, વર્કફ્લો રન અને પ્રયાસને ઓળખે છે. CLI એ checkout/event SHA અસંગતતાને નકારી કાઢે છે. વર્કફ્લો પરીક્ષણો ચુકાદાની નોકરીની `needs` સૂચિ સાથે નીતિ સભ્યપદને જોડે છે જેથી નવી અથવા દૂર કરાયેલ લેન શાંતિપૂર્વક અદૃશ્ય થઈ શકે નહીં. રસીદો તેમના પોતાના વર્કફ્લોને આવરી લે છે, પ્રકાશન, જમાવટ અથવા હાલના સલાહકાર સ્કેનરના આંતરિક ભાગને નહીં. શાખાના નિયમોમાં બંને ચેક નામો સક્રિય કરવા એ એક અલગ વહીવટી ફેરફાર છે; આ નોકરીઓ ઉમેરવાથી શાખાનું રક્ષણ થતું નથી.

### કતાર મર્જ કરો

`queue` લેબલ Mergify કતાર (`.mergify.yml`) પર PR મોકલે છે. Mergify `mergify/merge-queue/` શાખા પર ડ્રાફ્ટ PR ખોલે છે, CI ત્યાં સંપૂર્ણ પસંદગી ચલાવે છે, અને જ્યારે `Gate / CI`, `Gate / Quality` અને `Merge integrity (changelog + generated skills)` પાસ થાય છે ત્યારે મૂળ PR મર્જ થાય છે.

મર્જાઇફ ડ્રાફ્ટના વર્ણનમાં તેની કતારનો સારાંશ લખે છે અને અન્ય એપ્સ પણ તેને સંપાદિત કરી શકે છે. આવા ડ્રાફ્ટ પરની `pull_request` `edited` ઇવેન્ટ તેના પોતાના સહવર્તી જૂથ (`-queue-edit-<run_id>`) લે છે તેથી તે ડ્રાફ્ટના વાસ્તવિક રનને રદ કરી શકતી નથી, અને તે ગેટ અને મેટ્રિક્સને છોડી દે છે. માત્ર `Merge integrity` હજુ પણ ચાલે છે. સ્કીપ કરેલ ગેટ જોબ એક અલગ ચેક નામ ધરાવે છે, કારણ કે મર્ગીફાઈ એ સ્કીપ કરેલ `Gate / CI` નિષ્ફળ ચેક તરીકે વાંચે છે અને PR ને dequeues કરે છે.

ડેક્યુ પછી, દબાણ હંમેશા PR વિનંતી કરતું નથી. તેના પર `@mergifyio queue` કોમેન્ટ કરો.

### સ્વીકૃતિ રીડ્યુસરમાં પુરાવા જાળવી રાખ્યા છે

`scripts/quality/validate-release-acceptance.mjs` પૂરી પાડવામાં આવેલ યોજના અને તેના મેનિફેસ્ટને ઘટાડે છે; તે સ્થાપિત કરતું નથી કે યોજના સંપૂર્ણ પ્રકાશન પાઇપલાઇનને આવરી લે છે. તેના અહેવાલો સ્પષ્ટપણે `releaseAcceptance: false` સેટ કરે છે, પછી ભલે તે યોજના `VERIFIED` હોય. `release-acceptance.yml` વર્કફ્લો હજુ પણ શેડો ફિક્સરનો ઉપયોગ કરે છે, વાસ્તવિક બિલ્ડ, પેકેજ, બૂટ અથવા પ્રમોશન રસીદોનો નહીં.

CLI જાળવી રાખેલા પુરાવા ચકાસવા માટે `--evidence-root` ની જરૂર છે. ફાઇલોને `<evidence-root>/<artifact_id>/<member>` તરીકે ઉકેલવામાં આવે છે અને SHA-256 તરીકે હેશ કરવામાં આવે છે. પુરાવા વિનાનો PASS રેકોર્ડ, ગુમ થયેલ અથવા બદલાયેલ ફાઇલ, અસુરક્ષિત પાથ અથવા સિમલિંક ચકાસણીને અટકાવે છે. ખૂટતી ફાઇલો ખાલી સફળ લોગની સમકક્ષ નથી. હાલની SHA/run/attempt ચેક્સ સ્વતંત્ર રહે છે: મેચિંગ બાઈટ વાસી રસીદને બચાવી શકતા નથી. ફાઇલ અખંડિતતા અમલની અધિકૃતતા અથવા આર્ટિફેક્ટ પ્રમોશનનો પુરાવો નથી.

### સ્ટેટિક સ્કેન ઇન્વેન્ટરી

આવૃત્તિવાળી npm-ઉર્ફે ઇન્વેન્ટરી અને સ્ટેટિક-સ્કેન સભ્યપદ `config/quality/gate-manifest.json` માં રહે છે. સ્ક્રિપ્ટ નામો અને `package.json` સામે ચોક્કસ આદેશોને માન્ય કરવા માટે `npm run check:gate-manifest` ચલાવો; ઉમેરાઓ, દૂર કરવા અને કમાન્ડ ડ્રિફ્ટ સ્થાનિક હૂક અને CI માં ફેરફાર-વર્ગીકરણ જોબ બંનેને નિષ્ફળ કરે છે. ઉપનામ એ વર્કફ્લો જોબ, મેટ્રિક્સ ઇન્સ્ટન્સ અથવા ટેસ્ટ કેસ નથી: આ ગણતરીઓ વિનિમયક્ષમ તરીકે રજૂ થવી જોઈએ નહીં.

પસંદ કરેલ ઉપનામોને અમલમાં મૂક્યા વિના તેનું નિરીક્ષણ કરવા માટે `npm run quality:scan -- --list` અથવા `npm run quality:scan:fast -- --list` ઉપયોગ કરો. રનર એનપીએમ એન્ટ્રી પોઈન્ટને બોલાવે છે, તેથી તેનો રનટાઇમ (જ્યાં રૂપરેખાંકિત કરેલ હોય ત્યાં Bun સહિત) સાચવેલ છે. મેનિફેસ્ટ તે પ્રોફાઇલ્સની બહારના ઉપનામોને અલગથી બોલાવ્યા તરીકે રેકોર્ડ કરે છે, અને જાળવણી આદેશો ફક્ત વાંચવા માટેના સ્કેન પ્રોફાઇલ્સમાં પ્રતિબંધિત છે.

આ પ્રોફાઇલ્સ માત્ર સ્ટેટિક સ્કેનને આવરી લે છે. તેઓ ઉત્પાદન પરીક્ષણો, કવરેજ, પેકેજિંગ, બાહ્ય તપાસો અથવા ઉમેદવારની સંપૂર્ણ પ્રકાશન સ્વીકૃતિને પ્રમાણિત કરતા નથી. વર્કફ્લો પ્રવેશ લિંક કરેલ `config/quality/admission-policy.json` અને `scripts/quality/admission-verdict.mjs` ઉપયોગ કરે છે. પ્રકાશન-નિરીક્ષક પ્રોફાઇલ અલગ રહે છે; તેમના લાગુ પડતા ચેક અને રસીદોનું સ્વતંત્ર રીતે નિરીક્ષણ કરો. સંપૂર્ણ નિરીક્ષકના સ્થિર આદેશો `config/quality/release-green-static-profile.json` માં જાહેર કરવામાં આવે છે, જેમાં `audit:deps`, પરિવર્તન-પરીક્ષણ પસંદગી અને અનુવાદ તપાસનો સમાવેશ થાય છે. લોડર npm આદેશોને package.json અને મોડેલ કરેલ CI/Quality ઘોષણાઓ સામે માન્ય કરે છે; તે દલીલો તરીકે શેલ ટોકન્સ ચલાવવાને બદલે ડ્રિફ્ટને નકારી કાઢે છે. જરૂરી સ્કેનર SKIP/INCOMPLETE આઉટપુટ PASS સ્થાપિત કરી શકતું નથી. પ્રોફાઇલ તેના બાહ્ય બાકાતને રેકોર્ડ કરે છે અને હોસ્ટ કરેલ કવરેજ, ટેસ્ટ મેટ્રિસિસ, પેકેજ અથવા જમાવટ પુરાવાને બદલતું નથી. નીચે આપેલ ગદ્ય ઇન્વેન્ટરી એક સંદર્ભ છે, દરવાજો વાસ્તવમાં દોડ્યો હોવાનો પુરાવો નથી.

સ્ક્રિપ્ટો `scripts/check/` (પોલીસી ગેટ) અને `scripts/quality/` (રેચેટ એન્જિન) હેઠળ રહે છે. સત્યનો CI સ્ત્રોત `.github/workflows/ci.yml` છે.

### રિલીઝ PR ફાસ્ટ-પાથ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs પર CI પૂરક બનાવે છે, `main` પર દબાણ કરે છે, જૂથો મોકલે છે અને મર્જ કરે છે. PRs પાથ-ફિલ્ટર કરેલ ઝડપી તપાસનો ઉપયોગ કરે છે. કાયમી રૂપે અક્ષમ ડુપ્લિકેટ બિલ્ડ દૂર કરવામાં આવ્યું હતું; વાસ્તવિક build/package/boot ચેક CI માં જ રહે છે. યુનિટ સ્યુટ અને વિટેસ્ટ ફક્ત CI (`Unit Tests (N/8)` અને `Vitest`) માં ચાલે છે.

| જોબ                                              | અવકાશ                                                                                                          | બ્લોકીંગ        |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs અને docs-all                                                                      | હા              |
| `Fast Quality Gates`                             | કોડ PRs; સ્ટેટિક ચેક, ટાઇપચેક, ડેશબોર્ડ ટાઇપચેક, અસરગ્રસ્ત યુનિટ ટેસ્ટ, ભૂલી ગયેલા ભાઈ-બહેન પરીક્ષણો (સલાહકાર) |
| `No new ESLint warnings`                         | કોડ PRs; સપ્રેસન્સ-અવેર લિન્ટ ગાર્ડ                                                                            | હા, ફોર્કસ સહિત |
| `Merge integrity (changelog + generated skills)` | બિન-ડ્રાફ્ટ PRs; ચેન્જલોગ અને જનરેટ કરેલ કૌશલ્ય સમન્વયન                                                        | હા, ફોર્કસ સહિત |

#### ભૂલી ગયેલા ભાઈ-બહેનના ટેસ્ટ રિપોર્ટ

`npm run check:forgotten-sibling-tests` એ `Fast Quality Gates` ના સલાહકાર પગલા તરીકે ચાલે છે અને ટેસ્ટ-ઇમ્પેક્ટ મેપ પાછળ આયાત રિઝોલ્વરનો ફરીથી ઉપયોગ કરે છે. દરેક બદલાયેલ ઉત્પાદન મોડ્યુલ માટે, જ્યારે ઉમેદવાર પરીક્ષણ પુલ-રિક્વેસ્ટ ડિફમાંથી ગેરહાજર હોય ત્યારે તે નિર્ણાયક `changed module/symbol -> static consumer -> candidate sibling test` સાંકળોની જાણ કરે છે. માર્કડાઉન સારાંશ અને JSON પરિણામ કોઈપણ બ્લોકિંગ રોલઆઉટ પહેલાં માપાંકન માટે `forgotten-sibling-tests` વર્કફ્લો આર્ટિફેક્ટ તરીકે જાળવી રાખવામાં આવે છે.

બેરલ પુન: નિકાસ અને ગતિશીલ આયાત માત્ર રીઝોલ્યુશન ડાયગ્નોસ્ટિક્સ છે; તેઓ ક્યારેય અવરોધિત શોધ બનાવતા નથી. સમીક્ષા કરેલ અપવાદો `config/quality/forgotten-sibling-allowlist.json` માં રહે છે. દરેક એન્ટ્રીએ ગ્રાહક અને ઉમેદવારની કસોટીનું નામ આપવું જોઈએ, ચોક્કસ તર્ક આપવો જોઈએ અને GitHub ઈશ્યૂ અથવા પુલ વિનંતીને લિંક કરવી જોઈએ. દૂષિત એન્ટ્રીઓ નિષ્ફળ બંધ થઈ. અપવાદો કાઢી નાખેલ ઉમેદવાર પરીક્ષણ અથવા `.skip`/`.todo` ઉમેરતા તફાવતને દબાવી શકતા નથી; દાવો નબળો પડવો અને અન્ય માસ્કિંગ સ્વતંત્ર રીતે અવરોધિત `check:test-masking` ગેટની માલિકીની રહે છે.

### જોબ: `lint`

દરેક PR થી `main` પર ચાલે છે. બ્લોક્સ નિષ્ફળતા પર મર્જ કરે છે.

| સ્ક્રિપ્ટ (`npm run ...`)         | માન્ય કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | બ્લોકીંગ                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js વર્ઝન સપોર્ટેડ રેન્જમાં છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:cycles`                    | સમગ્ર `src/` + `open-sse/` પર પરિપત્ર આયાત (AST-આધારિત, tsconfig `paths` ઉકેલાઈ). જ્યારે પણ કોઈપણ ચક્ર અસ્તિત્વમાં હોય ત્યારે બેર 1 થી બહાર નીકળે છે ( #15281 થી નિષ્ફળ-બંધ) અને SCCs ની યાદી આપે છે. `check:cycles:ratchet` (શું CI ચાલે છે) બ્લોક થાય છે જ્યારે `quality-baseline.json` — માં `metrics.cycles` ટોચમર્યાદા કરતાં વધી જાય છે હાલમાં 14, `direction: down`, તેથી તે માત્ર ઘટી શકે છે (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા (રાચેટ)                              |
| `check:boundary`                  | `open-sse → src` કપલિંગ: એપમાં એન્જિનમાંથી ફાઇલ-ટુ-ફાઇલની અનોખી આયાત (`scripts/quality/measure-boundary.mjs`; એજ લિસ્ટ એ v4 core/module-split રિમેડિયેશન બેકલોગ છે). એકદમ = સલાહકાર અહેવાલ ( `quality:boundary` ની જેમ જ). `check:boundary:ratchet` ( CI શું ચાલે છે, `quality.yml` ફાસ્ટ-ગેટ્સ રેચેટ લૂપમાં પણ) બ્લોક કરે છે જ્યારે 771, `direction: down` પર `quality-baseline.json` — સીડમાં ગણતરી `metrics.boundaryOpenSseToSrc` ટોચમર્યાદા કરતાં વધી જાય છે; `--update` માત્ર તેને ઘટાડે છે; PRs પર બેઝ-રિલેટિવ (`--base-ref`, નીચે જુઓ)                                                                                                                                                                                                                                                                                                                                                                                               | હા (રાચેટ)                              |
| `check:route-validation:t06`      | તમામ માર્ગો પર Zod સ્કીમા હાજર છે (ટાયર 6 નીતિ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | હા                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` ગણતરી બજેટ કરતાં વધી નથી (ટાયર 11 કેટ્રાકા)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:provider-consistency`      | `providers.ts` માં દરેક પ્રદાતા પાસે `providerRegistry.ts` માં મેળ ખાતી એન્ટ્રી છે (અને તેનાથી વિપરીત, મંજૂર સૂચિમાં)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:model-lifecycle`           | ત્રણ હાથથી જાળવવામાં આવેલ રૂટીંગ કોષ્ટકો ચેક-ઇન લાઇફસાઇકલ સ્નેપશોટ (#11503) સાથે સુસંગત રહે છે : `FITNESS_TABLE` (`taskFitness.ts`) સ્કોર્સ કોઈ નિવૃત્ત ID નથી કે જે `REGISTRY` રૂટ કરી શકે; દરેક `BUILT_IN_ALIASES` લક્ષ્ય `REGISTRY` માં હાજર છે અને નિવૃત્ત-આઈડી સ્નેપશોટમાંથી ગેરહાજર છે; `REGISTRY` માં હજુ પણ દરેક નિવૃત્ત આઈડી ફોરવર્ડ અથવા `allowedRetiredInCatalog` માં સૂચિબદ્ધ છે; અને તે સ્નેપશોટમાં કોઈ `DEFAULT_DEGRADATION_MAP` સ્ત્રોત અથવા લક્ષ્ય નિવૃત્ત દેખાતું નથી. આ સાબિત કરતું નથી કે મોડેલ હાલમાં લાઇવ અપસ્ટ્રીમ દ્વારા પીરસવામાં આવે છે. ઑફલાઇન — `config/quality/model-lifecycle.json` સાથે સરખાવે છે, `npm run quality:refresh-model-lifecycle` સાથે હાથથી તાજું કરવામાં આવે છે (નેટવર્ક; CI માં વાયર્ડ નથી). `allowedRetiredInCatalog` એ બર્ન-ડાઉન રેચેટ છે: ફક્ત ટ્રેકિંગ સમસ્યા સાથે એન્ટ્રી ઉમેરો.                                                                                                           | હા                                      |
| `check:fetch-targets`             | ક્લાયંટ-સાઇડ `src/` માં દરેક `fetch("/api/...")` વાસ્તવિક `route.ts` માટે ઉકેલે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:deps`                      | રેપોમાં દરેક `package.json` માં તમામ `npm install` -able ડેપ્સ `dependency-allowlist.json` માં છે; નવા અનપિન કરેલા અથવા સ્લોપક્વેટેડ પેકેજો ફ્લેગ કરેલા                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `audit:deps`                      | તમામ પાંચ સ્વતંત્ર લોકફાઈલો (રુટ, Electron, OpenCode પ્લગઈન્સ v1/v2 અને પ્રદાતા)નું npm ઓડિટ. જટિલ સલાહ બ્લોક; ઉચ્ચ સલાહો દૃશ્યમાન ચેતવણીઓ રહે છે. Missing/failed ઓડિટ INCOMPLETE અને બ્લોક છે; પ્રતિ-સ્કોપ લોક હેશ અને અહેવાલો જાળવી રાખવામાં આવે છે.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:lockfile`                  | `package-lock.json` અખંડિતતા — https રજિસ્ટ્રી, અખંડિતતા હેશ, કોઈ હોસ્ટ ઓવરરાઇડ્સ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:licenses`                  | ઉત્પાદન નિર્ભરતા માટેSPDX લાઇસન્સ મંજૂર સૂચિ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા                                      |
| `check:tracked-artifacts`         | કોઈ બિલ્ડ આર્ટિફેક્ટ્સ / પ્રતિબદ્ધ `node_modules` સિમલિંક્સ નથી (હસ્કી પ્રી-કમિટમાં પણ ચાલે છે; પ્રી-પુશ ઇરાદાપૂર્વક હળવા — #6716 છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:ai-attribution`            | PR કમિટ, શીર્ષક અથવા બોડી — હાર્ડ રૂલ #16 માં કોઈ AI/bot `Co-Authored-By` ટ્રેલર અથવા AI-જનરેશન ફૂટર નથી ( PR→ `release/**` — માટે `quality.yml` ફાસ્ટ-ગેટ્સ લૂપમાં ઇવેન્ટ પેલોડ વાંચે છે, નો- `ci.yml` ઓફ PRs — પીઆર અને સ્ટેપ માટે PR→; હસ્કી`main` હૂક પણ માન્ય `commit-msg` #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | દરેક Vitest બાકાત એક ટ્રેકિંગ સમસ્યાનું નામ આપે છે અને `config/quality/vitest-exclusions.json` (#13204) માં દેખાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | હા                                      |
| `check:file-size`                 | સ્ત્રોત ફાઇલો (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` ની અંદર રહે છે અને `testCap` ની અંદર ફાઇલો (`*.test.ts(x)`) પરીક્ષણ કરે છે ; `file-size-baseline.json` (`frozen` / `testFrozen`) માં સ્થિર થયેલી ફાઇલો તેમના રેકોર્ડ કરેલ કદથી આગળ વધવી જોઈએ નહીં                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | હા                                      |
| `check:error-helper`              | executors/handlers માં ભૂલ પ્રતિસાદો `buildErrorBody()` / `sanitizeErrorMessage()` (હાર્ડ રૂલ #12) નો ઉપયોગ કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:migration-numbering`       | સ્થળાંતર SQL ફાઇલો ક્રમિક રીતે ક્રમાંકિત છે, કોઈ અંતર અથવા ડુપ્લિકેટ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                      |
| `check:public-creds`              | `publicCreds.ts` બહાર કોઈ શાબ્દિક OAuth `client_id`/`client_secret` અથવા ફાયરબેઝ વેબ કી નથી (હાર્ડ રૂલ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | હા                                      |
| `check:db-rules`                  | `src/lib/db/` મોડ્યુલોની બહાર કોઈ કાચો SQL નથી; `localDb.ts` થી કોઈ બેરલ-આયાત નહીં (હાર્ડ રૂલ્સ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:known-symbols`             | પ્રદાતા એક્ઝિક્યુટર્સ, રૂટીંગ વ્યૂહરચના અને તેમના ડિસ્પેચ કોષ્ટકોમાં નોંધાયેલ અનુવાદકો ડિસ્ક પરની ફાઇલો સાથે મેળ ખાતા નથી — નો અનાથ અથવા અઘોષિત પ્રતીકો                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `check:route-guard-membership`    | દરેક રૂટ કે જે બાળક પ્રક્રિયાને જન્મ આપે છે તે `isLocalOnlyPath()` (હાર્ડ રૂલ્સ #15/#17) દ્વારા વર્ગીકૃત કરવામાં આવે છે.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                      |
| `check:test-discovery`            | રેપોમાં દરેક `*.test.ts` / `*.spec.ts` ફાઇલ ઓછામાં ઓછા એક ટેસ્ટ રનર દ્વારા એકત્રિત કરવામાં આવે છે (રેચેટ: `test-discovery-baseline.json` માં અનાથ સૂચિ ફક્ત સંકોચાઈ શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | હા                                      |
| `check:test-tla-order`            | `tests/unit` હેઠળની કોઈ `node:test` ફાઇલ ટેસ્ટ રજીસ્ટર કરતી નથી, ટોપ-લેવલ `await` ને હિટ કરે છે, પછી વધુ નોંધણી કરે છે (#18045; ratchet: `test-tla-order-allowlist.json` માત્ર સંકોચાઈ શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:agent-skills-sync`         | જનરેટ કરેલ એજન્ટ-કૌશલ્ય કલાકૃતિઓ તેમના સ્ત્રોત સૂચિ સાથે મેળ ખાય છે (કોઈ ડ્રિફ્ટ નથી)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | પ્રદાતા logos/assets રેકોર્ડ કરેલ ઉત્પત્તિ એન્ટ્રી ધરાવે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON રૂપરેખા ફાઇલો રેપો લિન્ટ નિયમોને પાર્સ અને સંતોષે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | ભૂલો વિનાTypeScript સંકલન (ફક્ત સલાહકારી ચેતવણીઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | હા                                      |
| `typecheck:noimplicit:core`       | સખત `noImplicitAny` — ફોરવર્ડ-લુકિંગ; ઘણી પૂર્વ-અસ્તિત્વમાં રહેલી કૉલ સાઇટ્સને હજુ પણ એનોટેશનની જરૂર છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **સલાહકાર** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` સ્કોપ ટુ `src/app/(dashboard)/**` (#7033) — `typecheck:core` ની ક્યુરેટેડ 27-ફાઇલની મંજૂરી સૂચિમાં કોઈપણ ડેશબોર્ડ TSX શામેલ નથી, અને `next build` ક્યારેય તેને ટાઇપ-ચેક કરતું નથી (`next.config.mjs` સેટ કરે છે `ignoreBuildErrors: true`), તેથી અનાથ-ઓળખકર્તા રીગ્રેસન ત્યાં (#6625/#6909CI. સ્થિર per-file/per-TS-code કાઉન્ટ બેઝલાઈન સામે તફાવત (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` જેવી જ વાસી-અમલીકરણ પેટર્ન) — બેઝલાઈન ગણતરીની બહાર માત્ર NEW ભૂલો ગેટને નિષ્ફળ કરે છે; જ્યારે પૂર્વ-અસ્તિત્વમાં રહેલી ભૂલને ઠીક કરવામાં આવે ત્યારે `--update` સાથે રેચેટ ડાઉન કરો.                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), સપાટી `typecheck:core` ની 27-ફાઇલની અનુમતિ સૂચિ અને ડેશબોર્ડ ગેટ પર સંપૂર્ણ-એપ ઉત્પાદન પ્રકાર તપાસો અને ડેશબોર્ડ ગેટ આવરી લેતા નથી. `config/quality/build-typecheck-baseline.json` સામે તફાવત; નવી અથવા વધેલી પ્રતિ-(ફાઇલ, કોડ) ગણતરી નિષ્ફળ જાય છે, ઓછી ગણતરી તમને રેચેટ કરવાનું કહે છે. `--update` એ ઇનકાર કરે છે જ્યારે રનમાં નવી અથવા ઉભી કરેલી જોડી હોય છે સિવાય કે `--force-regressions` પસાર થાય છે, અને જ્યાં સુધી `--force-nocheck` પસાર ન થાય ત્યાં સુધી નવી સાયલન્સ ફાઇલનો ઇનકાર કરે છે, તેથી લીલો મેળવવા માટે બેઝલાઇનને પહોળી કરવી અને કાયમી મૌન આપવી એ બે અલગ-અલગ ઇરાદાપૂર્વકના કાર્યો છે. એકદમ `--force` નકારવામાં આવે છે. `config/quality/ts-nocheck-baseline.json` સામે `@ts-nocheck` માટે બિલ્ડ સ્કોપ પણ સ્કેન કરે છે, કારણ કે તેનો ઉપયોગ કરતી ફાઇલ કોઈ ડાયગ્નોસ્ટિક્સની જાણ કરતી નથી અને અન્યથા દરેક ગેટ માટે અદ્રશ્ય હશે. | હા                                      |

#### બે ટાઇપચેક પ્રોગ્રામ અલગ રીતે જવાબ આપે છે

`typecheck:core` અને `check:build-typecheck` અલગ-અલગ વિકલ્પો હેઠળ અલગ-અલગ પ્રોગ્રામ્સ કમ્પાઈલ કરે છે, અને એક જ ફાઈલ એકમાં ક્લીન અને બીજીમાં ભૂલોથી ભરેલી હોઈ શકે છે.

`tsconfig.build.json` `"strict": false` સેટ કરે છે, તેથી `noImplicitAny` બંધ છે. મુખ્ય રૂપરેખા સખત વિકલ્પો સાથે ક્યુરેટેડ 27-ફાઇલની મંજૂરી સૂચિનું સંકલન કરે છે અને દરેક એન્ટ્રીના આયાત ગ્રાફને અનુસરે છે, તેથી બિલ્ડ પ્રોગ્રામમાં ક્યારેય દેખાતી નથી તેવી ફાઇલો હજુ પણ ત્યાં તપાસવામાં આવે છે.

ફાઇલ ટાઇપ કરવામાં આવી છે કે કેમ તે નક્કી કરતી વખતે પરિણામ મહત્વપૂર્ણ છે:** `check:build-typecheck` હેઠળ શૂન્ય ડાયગ્નોસ્ટિક્સનો અર્થ શૂન્ય નથી** . 26 ફાઈલોમાંથી `@ts-nocheck` કાઢી નાખવાથી તેમાંથી 23 બિલ્ડ પ્રોગ્રામમાં સ્વચ્છ દેખાય છે; તેમાંથી સોળમાં લગભગ 120 ગર્ભિત-કડકમાં કોઈપણ ભૂલો સામે આવી. ફાઇલને ક્લીન કરતા પહેલા બંને તપાસો.

### જોબ: `quality-gate`

`test-coverage` પછી ચાલે છે. બ્લોક્સ નિષ્ફળતા પર મર્જ કરે છે.

| સ્ક્રિપ્ટ                    | માન્ય કરે છે                                                                                                                                                | બ્લોકીંગ               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | `quality-metrics.json` બહાર કાઢે છે (ESLint ચેતવણી ગણતરી, મર્જ કરેલ શાર્ડ રિપોર્ટમાંથી કવરેજ)                                                               | હા (રેચેટની અપસ્ટ્રીમ) |
| `quality:ratchet`            | `quality-baseline.json` માં દરેક મેટ્રિક રીગ્રેસ થયું નથી (ESLint ચેતવણીઓ ≤ બેઝલાઇન; કવરેજ ≥ બેઝલાઇન)                                                       | હા                     |
| `check:duplication`          | કોડ ડુપ્લિકેશન (jscpd@4) `quality-baseline.json` માં બેઝલાઈન કરતાં વધી જતું નથી                                                                             | હા                     |
| `check:complexity`           | ફાઇલ-સ્તરની સાયક્લોમેટિક જટિલતા કેપ (કોર ESLint `complexity` + `max-lines-per-function`) કરતાં વધી નથી                                                      | હા                     |
| `check:cognitive-complexity` | જ્ઞાનાત્મક જટિલતા રેચેટ (`eslint-plugin-sonarjs`) — અલગ ESLint પાસ; CI રન બંનેને સિંગલ `check:complexity-ratchets` સ્ટેપ તરીકે મર્જ કરે છે                  | હા                     |
| `check:dead-code`            | બિનઉપયોગી નિકાસ/ફાઈલો રેચેટ (નીપ) બેઝલાઈન વિરુદ્ધ રીગ્રેસ થતી નથી                                                                                           | હા                     |
| `check:compression-budget`   | કમ્પ્રેશન બેન્ચમાર્ક બજેટ — પ્રતિ-એન્જિન ટોકન-બચત માળખું ફરી ન જવું જોઈએ                                                                                    | હા                     |
| `check:type-coverage`        | ટકા-ટાઈપ કરેલ રેચેટ (`type-coverage`) રીગ્રેસ થતું નથી; મોટાભાગે `typecheck:noimplicit:core` ને સમાવે છે                                                    | હા                     |
| `check:codeql-ratchet`       | ઓપન CodeQL એલર્ટ કાઉન્ટ રીગ્રેસ થતું નથી ( `gh api` દ્વારા વાંચે છે; ટોકન વગર ગ્રેસફુલ-સ્કિપ) — રિફ્રેશ કેડન્સ અને મેન્યુઅલ ટ્રિગર: નીચે "CodeQL રેચેટ" જુઓ | હા                     |

### જોબ: `quality-extended`

આખું કામ સલાહકારી છે (`continue-on-error: true`). એનપીએમ-આધારિત રેચેટ્સ વાસ્તવિક માટે ચાલે છે; જ્યારે બાઈનરી હજુ પણ ગેરહાજર હોય ત્યારે બાહ્ય સ્કેનર્સ `gh release download` અને સેલ્ફ-સ્કીપ (એક્ઝિટ 0) દ્વારા ઇન્સ્ટોલ કરે છે.

| સ્ક્રિપ્ટ                | માન્ય કરે છે                                                                                                                                                                                             | બ્લોકીંગ                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:circular-deps`    | કોઈ પરિપત્ર અવલંબન નથી (dpdm)                                                                                                                                                                            | **સલાહકાર**                             |
| `check:bundle-size`      | બંડલનું કદ કેપ કરતાં વધી જતું નથી                                                                                                                                                                        | **સલાહકાર**                             |
| `check:secrets`          | જો બાઈનરી ગેરહાજર હોય તો સિક્રેટ સ્કેનિંગ (gitleaks) — સ્કીપ્સ કરે છે                                                                                                                                    | **સલાહકાર**                             |
| `check:vuln-ratchet`     | નિર્ભરતા નબળાઈઓ (ઓએસવી-સ્કેનર) જો માપી ન હોય તો — `--ratchet` INCOMPLETE જાય છે (એક્ઝિટ 2)                                                                                                               | **સલાહકાર**                             |
| `check:workflows`        | વર્કફ્લો લિન્ટ (એક્શનલિન્ટ + ઝિઝમોર); missing/broken સ્કેનર્સ, અમાન્ય અહેવાલો અથવા ગુમ થયેલ રેચેટ બેઝલાઇન INCOMPLETE તરીકે નિષ્ફળ થાય છે. માન્ય તારણો પસંદ કરેલ strict/advisory/ratchet નીતિને અનુસરે છે | અમલ જરૂરી; CI માં ઝિઝમોર રેચેટ બ્લોકિંગ |
| `check:openapi-breaking` | પિન કરેલ ઇવેન્ટ કમિટ્સ સામે જાહેર API કરાર (PR મર્જ-બેઝ, પુશ પહેલા, મર્જ-ગ્રુપ બેઝ; scheduled/manual ચેકઆઉટ ફર્સ્ટ પેરેન્ટ); જરૂરી માપન નિષ્ફળ જાય છે                                                    | **--ratchet સાથે અવરોધિત કરવું**        |

### જોબ: `docs-sync-strict`

દરેક PR થી `main` પર ચાલે છે. બ્લોક્સ નિષ્ફળતા પર મર્જ કરે છે.

| સ્ક્રિપ્ટ                      | માન્ય કરે છે                                                                                                                                                 | બ્લોકીંગ                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `check:docs-all`               | મેટા-ગેટ જે અનુક્રમે નીચેના 6 પેટા-ગેટ ચલાવે છે                                                                                                              | હા                             |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt સંસ્કરણ સુસંગતતા                                                                                                               | હા                             |
| ↳ `check:docs-counts`          | ગદ્યમાં ગણતરીઓ (પ્રદાતાની સંખ્યા, સ્થળાંતર ગણતરી, વગેરે) વાસ્તવિક ગણતરીઓની રેચેટ વિંડોની અંદર છે                                                             | હા                             |
| ↳ `check:env-doc-sync`         | `.env.example` માં દરેક env var દસ્તાવેજ કોષ્ટકમાં દસ્તાવેજીકૃત થયેલ છે, અને ઊલટું                                                                           | હા                             |
| ↳ `check:deprecated-versions`  | દસ્તાવેજમાં કોઈ નાપસંદ સંસ્કરણ સ્ટ્રિંગ્સ નથી                                                                                                                | હા                             |
| ↳ `check:doc-links`            | ડૉક્સમાં આંતરિક માર્કડાઉન લિંક્સ વાસ્તવિક ફાઇલો (`[text]`/`(path)` ફોર્મ) સાથે ઉકેલે છે                                                                      | હા                             |
| ↳ `check:fabricated-docs`      | રૂટ્સ, env vars, CLI આદેશો, હૂક નામો અને દસ્તાવેજમાં ટાંકવામાં આવેલ ફાઇલ પાથ કોડબેઝમાં અસ્તિત્વ ધરાવે છે. `--strict` દ્વારા સખત દરવાજો; ધ્વજ વિના સોફ્ટ-ફેલ. | હા ( CI માં `--strict` દ્વારા) |
| `check:cli-i18n`               | CLI આદેશ શબ્દમાળાઓ તમામ i18n લોકેલ ફાઇલોમાં હાજર છે                                                                                                          | હા                             |
| `check:openapi-coverage`       | OpenAPI સ્પેક વાસ્તવિક રૂટના ઓછામાં ઓછા એક રેચેટેડ ફ્લોરને આવરી લે છે                                                                                        | હા                             |
| `check:openapi-security-tiers` | `openapi.yaml` માં સુરક્ષા સ્તરની ટીકાઓ `routeGuard.ts` વર્ગીકરણ સાથે સુસંગત છે                                                                              | **સલાહકાર**                    |
| `check:openapi-routes`         | `openapi.yaml` માં દરેક માર્ગ વાસ્તવિક `route.ts` (વિરોધી આભાસ) તરફ સંકલ્પ કરે છે                                                                            | હા                             |
| `check:docs-symbols`           | `docs/**/*.md` માં દરેક `/api/...` સંદર્ભ વાસ્તવિક `route.ts` (વિરોધી ભ્રમણા) ને ઉકેલે છે                                                                    | હા                             |
| `i18n translation drift`       | i18n લોકેલ ફાઇલોમાં અનઅનુવાદિત કીઓ — માત્ર ચેતવણી આપે છે                                                                                                     | **સલાહકાર**                    |

`docs/diagrams/` હેઠળ બાર README SVGs જનરેટ થાય છે (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` તે બધાને ફરીથી બનાવે છે). દરેક પાસે બાઈટ-સરખામણી યુનિટ ટેસ્ટ (`tests/unit/docs/readme-*-svg.test.ts`, જોબ `test-unit`) હોય છે જે જ્યારે પ્રતિબદ્ધ ફાઇલ વાસી હોય ત્યારે નિષ્ફળ જાય છે અને `check:docs-counts` તેમના `<text>` નોડ્સ — માંથી પ્રમાણભૂત નંબરો વાંચે છે તેથી જ આઉટલાઇનિંગ સ્ટેપ ફાઇલમાં દરેક આઉટલાઇન સ્ટ્રિંગને અદ્રશ્ય `<text>` તરીકે રાખે છે. SVG કેનોનિકલ-નંબર ચેક `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) માં સૂચિબદ્ધ ફાઇલોને વાંચે છે: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, વત્તા `public/images/tier-flow-dark.svg` અને `tier-flow-light.svg`; ફ્રી-એવર, કૅટેલોગ-એન્ટ્રી, રિકરિંગ-પૂલ અને સ્કોરિંગ-ફેક્ટર્સના દાવાઓ પણ `promise-pillars.svg`, `free-tier-budget.svg` અને `strategies-grid.svg` વાંચે છે. `free-tier-budget.svg` લાઇવ કેટલોગ લોડરમાંથી તેના આંકડાઓ દોરે છે, તેથી `FREE_MODEL_BUDGETS` અથવા પ્રદાતા ડિસ્પ્લે નામમાં ફેરફાર જ્યાં સુધી તે ફાઇલ ફરીથી જનરેટ ન થાય ત્યાં સુધી CI લાલ કરે છે.

### જોબ: `i18n-ui-coverage`

| સ્ક્રિપ્ટ                         | માન્ય કરે છે                                                                                                                                                                  | બ્લોકીંગ    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (ઇનલાઇન) | UI i18n કી કવરેજ ≥ 65% છે                                                                                                                                                     | હા          |
| `check-ui-value-drift` (ઇનલાઇન)   | પુનઃલેખિત અંગ્રેજી** મૂલ્ય** કોઈ વાસી અનુવાદ પાછળ છોડતો નથી                                                                                                                   | હા          |
| `check-new-key-coverage` (ઇનલાઇન) | એ** નવું** અંગ્રેજી કી દરેક લોકેલમાં અનુવાદિત થાય છે — અને `__MISSING__:` માર્કર નકારવામાં આવે છે                                                                             | હા          |
| `check-translation-ratio`         | લોકેલ દીઠ વાસ્તવિક-અનુવાદ ગુણોત્તર (સમાન-થી-અંગ્રેજી / પ્લેસહોલ્ડર / મંજૂર સૂચિની બહાર ખૂટે છે) `config/quality/i18n-translation-baseline.json` + સ્લૅક કરતાં વધુ ન હોવો જોઈએ | **સલાહકાર** |

વેલ્યુ-ડ્રિફ્ટ ગેટ `en.json` બેઝ સામે `fetch-depth: 0` — ની જરૂર છે.

#### `check-ui-value-drift` — વાસી-અનુવાદ દ્વાર

એક i18n રીગ્રેસન કેચ કરે છે જે અન્ય દરવાજા માળખાકીય રીતે જોઈ શકતા નથી: અંગ્રેજી મૂલ્ય ફરીથી લખવામાં આવે છે અને _અગાઉના_ અંગ્રેજીમાંથી તારવેલા અનુવાદો પાછળ રહે છે, તેથી બિન-અંગ્રેજી વપરાશકર્તાઓ વિશ્વાસપૂર્વક-શબ્દવાળી, હવે-ખોટી નકલ વાંચતા રહે છે.

આ વાસ્તવિક માટે મોકલવામાં આવ્યું છે. જ્યારે Antigravity લૉગિન હેલ્પર ઉતર્યો ત્યારે `oauthModal.googleOAuthWarning` ફરીથી લખવામાં આવ્યું હતું (#5203);** 43 લોકેલમાંથી 39** ઑપરેટરોને "સંપૂર્ણ URL કૉપિ કરો અને તેને નીચે પેસ્ટ કરો" — લખાણ રાખ્યું કે જે તે પ્રદાતા માટે પૂર્ણ ન થઈ શકે. તે #8463 સુધી કોઈનું ધ્યાન ગયું ન હતું કારણ કે:

- `sync-ui-keys` ફક્ત બેકફિલ્સ કી છે જે છે** ગેરહાજર** , તે ક્યારેય નહીં** વાસી** ;
- `check-ui-keys-coverage` કી _પ્રેઝન્સ_ની ગણતરી કરે છે, તેથી વાસી અનુવાદ આવરી લેવામાં આવે છે.
- `check-translation-drift` `docs/i18n/<locale>/**.md` દસ્તાવેજીકરણ મિરર્સ — ને ટ્રેક કરે છે તે ક્યારેય `src/i18n/messages/*.json` વાંચતું નથી. 2026-09 રી-સિંક થી જોબ `docs-sync-strict` માં અવરોધિત: મુખ્ય દસ્તાવેજ → `npm run i18n:run -- --files=<doc>` (વિભાગ-સ્તર, સસ્તું) સંપાદિત કરો.

**ડિફ-અવેર, બેઝલાઇન-બેક્ડ નથી.** તે વર્કિંગ ટ્રી સામે મર્જ બેઝ પર `en.json` તુલના કરે છે; દરેક કી માટે જેની અંગ્રેજી કિંમત બદલાઈ ગઈ છે, કોઈપણ લોકેલ હજુ પણ અસ્પૃશ્ય અનુવાદ ધરાવે છે તે વાસી છે. આ જાણી જોઈને** પૂર્વ-અસ્તિત્વમાં રહેલું દેવું સ્થિર કરે છે** — a diff એ સ્પષ્ટ કરી શકતું નથી કે લાંબા સમયથી ચાલતું ભાષાંતર કયા જૂના અંગ્રેજીમાંથી આવ્યું છે, તેથી દરવાજો ફક્ત વર્તમાન ફેરફારને સ્પર્શે છે તે નક્કી કરે છે. વૈકલ્પિક (એક કી હેશ બેઝલાઇન) માટે ~ 600 KB જનરેટેડ ફાઇલનો ખર્ચ થશે, 3 × સૌથી મોટી હાલની બેઝલાઇન, દરેક i18n PR પર મંથન.

તેને સંતોષવાની બે રીતો:

1. અસરગ્રસ્ત અનુવાદોને અપડેટ કરો, અથવા
2. તેમને રનટાઇમ `__MISSING__:<new english>` — પર સેટ કરો પછી સુધારેલ અંગ્રેજી (`src/i18n/request.ts::deepMergeFallback`, #7258) અને અનુવાદ માટે કી કતાર આપે છે.

જો શબ્દમાળા છે** અર્થ** બદલાયેલ, પસંદ કરો** કીનું નામ બદલીને** : નવી કી વાસી અનુવાદને વારસામાં મેળવી શકતી નથી. તે પેટર્ન #8463 વપરાય છે.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

જ્યારે બેઝ કેટલોગ વાંચી શકાતો નથી ત્યારે `SKIP reason=base-unresolved` સાથે 0 થી બહાર નીકળે છે (બેઝ રેફ વગર છીછરા ક્લોન), મિરરિંગ `check-openapi-breaking`.

### જોબ: `i18n`

સંપૂર્ણ i18n માન્યતા મેટ્રિક્સ (લોકેલ દીઠ એક જોબ). આખું કામ સલાહકારી છે.

| સ્ક્રિપ્ટ                       | માન્ય કરે છે             | બ્લોકીંગ                                              |
| ------------------------------- | ------------------------ | ----------------------------------------------------- |
| `validate_translation.py quick` | લોકેલ દીઠ અનુવાદ પૂર્ણતા | **સલાહકાર** (સમગ્ર કામ પર `continue-on-error: true` ) |

### જોબ: `pr-test-policy`

પુલ વિનંતીઓ પર જ ચાલે છે.

| સ્ક્રિપ્ટ              | માન્ય કરે છે                                                                                                                                    | બ્લોકીંગ |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRs કે જે `src/`, `open-sse/`, `electron/`, અથવા `bin/` માં પ્રોડક્શન કોડ બદલે છે તેમાં પરીક્ષણો શામેલ અથવા અપડેટ કરવા આવશ્યક છે (હાર્ડ રૂલ #8) | હા       |
| `check:test-masking`   | બદલાયેલી ટેસ્ટ ફાઇલો ચોખ્ખી એસ્ર્ટ કાઉન્ટને ઘટાડતી નથી અથવા `assert.ok(true)` ટૉટોલોજિસ ઉમેરતી નથી                                              | હા       |
| `check:pr-evidence`    | PR બોડી ફેરફાર માટે test/VPS પુરાવા ટાંકે છે ( — PR નાજુકને ગ્રિપ કરીને હાર્ડ નિયમ #18 ને મિકેનાઇઝ કરે છે, બેકલોગ જુઓ)                          | હા       |

### જોબ: `test-vitest`

`build` પછી ચાલે છે. બ્લોક્સ નિષ્ફળતા પર મર્જ કરે છે.

| સ્યુટ            | માન્ય કરે છે                                         | બ્લોકીંગ                                                                                                                                     |
| ---------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP સર્વર (110 સાધનો), autoCombo, cache — vitest રનર | હા                                                                                                                                           |
| `test:vitest:ui` | UI ઘટક — vitest રનરનું પરીક્ષણ કરે છે                | **બ્લોકીંગ** — પૂર્વ-અસ્તિત્વમાં રહેલી નિષ્ફળતાઓને સ્પષ્ટપણે `vitest.config.ts` માં બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ કામને નિષ્ફળ કરે છે |

### રાત્રિના કાર્યપ્રવાહ (સુનિશ્ચિત, સલાહકાર)

આ ક્રોન શેડ્યૂલ (અને `workflow_dispatch`) પર ચાલે છે, ક્યારેય PRs પર નથી. બધા સલાહકારી છે.

| વર્કફ્લો               | માન્ય કરે છે                                                                                                                                        | બ્લોકીંગ    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | રેન્ડમ સીડ + હાઇ રન કાઉન્ટ સાથે પ્રોપર્ટી ટેસ્ટની ઝડપી તપાસ કરો                                                                                     | **સલાહકાર** |
| `nightly-resilience`   | હીપ-ગ્રોથ ગેટ, કેઓસ ફોલ્ટ-ઇન્જેક્શન, k6 load/soak                                                                                                   | **સલાહકાર** |
| `nightly-llm-security` | promptfoo ઈન્જેક્શન ગાર્ડ (બ્લોક મોડ) + ગારક પ્રોબ્સ (પ્રોઇડર સિક્રેટ વગર છોડવામાં આવ્યું)                                                          | **સલાહકાર** |
| `nightly-schemathesis` | OpenAPI કોન્ટ્રાક્ટ ફઝિંગ (સ્કિમેથેસિસ) `docs/openapi.yaml` — સપાટી સ્પેક ઉલ્લંઘન / અનહેન્ડલ્ડ 500s (ફેઝ 8 B.4) નો ઉપયોગ કરીને જીવંત OmniRoute સામે | **સલાહકાર** |
| `nightly-mutation`     | સ્ટ્રાઈકર મ્યુટેશન-ટેસ્ટિંગ સ્કોર ઓવર ધ ફાસ્ટ યુનિટ લેન — સર્વાઈવિંગ મ્યુટન્ટ્સ સપાટીના નબળા દાવાઓ                                                  | **સલાહકાર** |
| `nightly-compat`       | સપોર્ટેડ `engines.node` રેન્જમાં નોડ એન્જિન સુસંગતતા મેટ્રિક્સ                                                                                      | **સલાહકાર** |

પર્ફોર્મન્સ બેઝલાઇન્સ (હીપ, TTFB, બિલ્ડ ટાઇમ) રેકોર્ડ કરવામાં આવે છે, ગેટેડ નથી: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) જુઓ.

---

## વેલોસિટી તબક્કો (2026-08-30 → v4.0 LTS): દરેક બેઝલાઇનમાં 20% છૂટછાટ

માલિકનો નિર્ણય (2026-08-30): v4.0 મોડ્યુલરાઇઝેશન સુધી, ટેક્નિકલ દેવાની મર્યાદા જાળવવા કરતાં
રિલીઝની ઝડપ વધુ મહત્વપૂર્ણ છે. દરેક **આંકડાકીય** રૅચેટ બેઝલાઇનને એક જ
ઑડિટ કરી શકાય તેવા પાસમાં 20% છૂટછાટ આપવામાં આવી અને તબક્કો `config/quality/quality-baseline.json`માં જાહેર કરવામાં આવ્યો છે:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| શું બદલાયું                                                                                                                                                                                             | ક્યાં                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ઓછું-હોય-તે-વધુ-સારું ગણતરીઓ ×1.2, વધુ-હોય-તે-વધુ-સારું ટકાવારીઓ ÷1.2 (કવરેજ ફ્લોર 60 જાળવ્યો, `eslintErrors` 0 જ રહે છે, `eslintWarnings` 0 → ફ્રીઝ કરેલી suppression ગણતરીના 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` નોંધ દરેક પહેલાં → પછીની કિંમત સૂચવે છે)         |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, દરેક `frozen[*]` / `testFrozen[*]` લાઇન મર્યાદા ×1.2                                                                                                                                  | `file-size-baseline.json`                                                                              |
| પ્રતિ-ફાઇલ / પ્રતિ-TS-કોડ ગણતરીઓ ×1.2                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` હોય ત્યારે `--require-tighten` માત્ર સલાહરૂપ બને છે                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| રાત્રિકાલીન `bank-ratchet-shrinks` થોભે છે (તે માપવામાં આવેલ ઘટાડો બેંક કરીને વધારાની ક્ષમતા રદ કરી દેત)                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

અનુમતિ સૂચિઓ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) બજેટ **નથી** અને તેમને સ્પર્શવામાં આવી નથી. પાસ/નિષ્ફળતા નીતિ ગેટ્સ (સિક્રેટ્સ, SQL નિયમો,
docs/env કરાર, i18n સમાનતા, યુનિટ ટેસ્ટ્સ) યથાવત છે — લાલ ટેસ્ટ હજુ પણ લાલ ટેસ્ટ જ છે.

**ટૂલિંગ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — એક-વખતની
  છૂટછાટ (`scripts/quality/relax-baselines.mjs`); સમાન નોંધ સાથે બીજી વાર ચલાવવાનો ઇનકાર કરે છે.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI જે રીતે માપે છે તે જ રીતે દરેક આંકડાકીય ગેટ માપે છે અને પ્રતિ ગેટ બાકી રહેલી વધારાની ક્ષમતા
  પ્રિન્ટ કરે છે (`scripts/quality/baseline-headroom.mjs`). રાત્રિકાલીન `baseline-headroom` જૉબ
  વર્કફ્લો રન સારાંશમાં કોષ્ટક પ્રકાશિત કરે છે અને તેના JSON/Markdown અહેવાલને
  `baseline-headroom-<run_id>` તરીકે અપલોડ કરે છે, જે 90 દિવસ માટે જાળવવામાં આવે છે. ચેતવણી અને ગંભીર પંક્તિઓ
  પોતાની મર્યાદાના 10%ની અંદર અથવા તેનાથી પહેલેથી ઉપર રહેલા ગેટ્સ ઓળખાવે છે. બજેટ વપરાઈ રહ્યાં હોવાની
  આગોતરી ચેતવણી તરીકે આ અહેવાલોની સમીક્ષા કરો; જવાબદાર ગેટની `_rebaseline_*` નોંધો તપાસો. જૉબ હવે
  કાયમી ઇશ્યૂ બનાવતી કે અપડેટ કરતી નથી; #12149 અગાઉના અહેવાલનો ઇતિહાસ સાચવે છે.

**નવા-કોડનો મોડ (Clean-as-You-Code) — 2026-08-30થી, ફક્ત PR ફાસ્ટ-પાથ**

`pull_request` ઇવેન્ટ્સ પર `quality.yml`, `check:file-size`,
`check:complexity-ratchets` અને `check:dead-code`ને `--base-ref <PR base SHA>` પાસ કરે છે. `check:complexity-ratchets` અને
`check:dead-code` માટે ગેટ HEADની સરખામણી merge-base સાથે **ફક્ત PRએ સ્પર્શેલી ફાઇલો સુધી મર્યાદિત રાખીને**
કરે છે (`scripts/check/newCodeMode.mjs`: merge-baseને કામચલાઉ
`git worktree`માં મટિરિયલાઇઝ કરવામાં આવે છે, ESLint/knip ત્યાં અને HEAD પર ચાલે છે અને પ્રતિ-ફાઇલ ગણતરીઓનો તફાવત કાઢવામાં આવે છે):

- **અવરોધક** — PRએ બદલેલી ફાઇલોમાં cyclomatic/cognitive ઉલ્લંઘનો અથવા dead exports ઉમેર્યા
  (લૉગમાં `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **સલાહરૂપ** — ફ્રીઝ કરેલી બેઝલાઇનની સરખામણીમાં વૈશ્વિક કુલ. વારસામાં મળેલ drift ક્યારેય
  નિર્દોષ PRને લાલ કરતું નથી; રિલીઝ સમાધાન વખતે driftને ફરીથી ફ્રીઝ કરવામાં આવે છે અને headroom જૉબ દ્વારા તેનું નિરીક્ષણ થાય છે.

`check:file-size` base refનો પોતાની શરતો મુજબ ઉપયોગ કરે છે (`scripts/check/check-file-size.mjs`, #8522):
તે ટ્રીમાંની દરેક સોર્સ અને ટેસ્ટ ફાઇલ તપાસે છે, `git show` વડે PR base પરની દરેક ફાઇલની લાઇન ગણતરી વાંચે છે
અને ફાઇલ ત્યારે જ નિષ્ફળ કરે છે જ્યારે તે પોતાની બેઝલાઇન સીલિંગ
(`frozen` / `testFrozen`, અથવા બેઝલાઇનની બહારની ફાઇલ માટે `cap` / `testCap`) અને પોતાની base
સાઇઝમાંથી જે વધુ હોય તેને પાર કરીને વધે. તેથી base પર પહેલેથી drift થયેલી ફાઇલ ક્યારેય નિર્દોષ PRને લાલ કરતી નથી.

`check:boundary:ratchet` તેના એકમાત્ર આંકડા પર પણ એ જ નિયમ લાગુ કરે છે
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ઇવેન્ટ્સ પર
`quality.yml` ફાસ્ટ-ગેટ્સ અને `ci.yml` lint જોબ બંને PR બેઝ SHA પાસ કરે છે, બેઝ કમિટને
`git archive` એક્સપોર્ટમાંથી માપવામાં આવે છે, અને PR ત્યારે જ નિષ્ફળ જાય છે જ્યારે તેની `open-sse → src` એજ
સંખ્યા `metrics.boundaryOpenSseToSrc` અને બેઝ પરની સંખ્યા, એ બેમાંથી મોટી સંખ્યાને વટાવે. મહત્તમ મર્યાદાથી
ઉપરના બેઝ ડ્રિફ્ટની જાણ (`base drift herdado`) કરવામાં આવે છે, પરંતુ તેના કારણે નિર્દોષ PR ક્યારેય નિષ્ફળ થતો નથી; push → main
નિરપેક્ષ મહત્તમ મર્યાદા જાળવી રાખે છે, અને ઉકેલી ન શકાય એવો બેઝ SHA ચેતવણી સાથે તેના પર પાછો ફરે છે.

`workflow_dispatch` રન્સ, રિલીઝ-ગ્રીન સ્વીપ અને રાત્રિકાલીન હેડરૂમ જોબ પાસે કોઈ PR બેઝ નથી
અને તેઓ નિરપેક્ષ (વૈશ્વિક) સરખામણી જાળવી રાખે છે. કવરેજ, ડુપ્લિકેશન અને ટાઇપ-કવરેજ હમણાં માટે વૈશ્વિક જ રહે છે
(તેમનાં ટૂલ્સ ઓછા ખર્ચે પ્રતિ-ફાઇલ ડિફ આપતાં નથી) — આ જ પદ્ધતિ માટેના સંભવિત ઉમેદવારો.

**v4.0 પર ફેઝ સમાપ્ત કરવો (LTS = પહેલાં કરતાં વધુ કડક, "ફરી સામાન્ય સ્થિતિમાં" નહીં)**

1. શુદ્ધ `release/v4.0.0` ટિપ પર: રેકોર્ડ માટે `npm run quality:headroom --json`, ત્યારબાદ
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, દરેક typecheck ગેટનું
   `--update` — દરેક બેઝલાઇન માપેલા મૂલ્ય સુધી નીચે આવે છે.
2. `quality-baseline.json`માંથી `_policy` કાઢી નાખો (`--require-tighten` અને રાત્રિકાલીન
   બેન્કિંગને ફરી સક્રિય કરે છે), `check-openapi-coverage.mjs`માં `THRESHOLD = 36` (અથવા વધુ) પુનઃસ્થાપિત કરો.
3. જ્યાં મોડ્યુલરાઇઝેશનથી લાભ થયો હોય ત્યાં માપેલા મૂલ્યથી પણ વધુ કડક બનાવો: file-size `cap`ને પાછો 1000
   (અથવા 800) કરો, કવરેજ ફ્લોરમાં +5 ઉમેરો, મોડ્યુલરાઇઝ કરેલા પેકેજો માટે ડેડ એક્સપોર્ટ્સ 0 રાખો.

## રૅચેટ બેઝલાઇન (`quality-baseline.json`)

રૅચેટ એન્જિન (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` વાંચે છે
અને તેની તાજા એકત્રિત કરેલા `quality-metrics.json` સાથે સરખામણી કરે છે. કોઈપણ મેટ્રિક તેના એપ્સિલોનથી
વધુ ખરાબ થાય તો બિલ્ડ નિષ્ફળ જાય છે.

હાલમાં ટ્રૅક કરવામાં આવતા મેટ્રિક્સ:

| મેટ્રિક               | દિશા   | અર્થ                                |
| --------------------- | ------ | ----------------------------------- |
| `eslintWarnings`      | `down` | ESLint ચેતવણીઓની સંખ્યા વધવી ન જોઈએ |
| `coverage.statements` | `up`   | સ્ટેટમેન્ટ કવરેજ ઘટવું ન જોઈએ       |
| `coverage.lines`      | `up`   | લાઇન કવરેજ ઘટવું ન જોઈએ             |
| `coverage.functions`  | `up`   | ફંક્શન કવરેજ ઘટવું ન જોઈએ           |
| `coverage.branches`   | `up`   | બ્રાન્ચ કવરેજ ઘટવું ન જોઈએ          |

વાસ્તવિક સુધારા પછી બેઝલાઇન અપડેટ કરવા માટે:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ફ્લૅગ હાલના માપેલા મૂલ્યો `quality-baseline.json`માં લખે છે.
મેટ્રિકમાં સુધારો કરનાર ફેરફારની સાથે આ ફાઇલ કમિટ કરો. બેઝલાઇન અપડેટ કર્યા વિના
મેટ્રિકમાં સુધારો કરતી PRને `--require-tighten` દ્વારા પકડવામાં આવશે (તબક્કો 6A.5,
અમલીકરણ બાકી છે).

### CodeQL રૅચેટ: રિફ્રેશની આવર્તનતા અને મેન્યુઅલ ટ્રિગર

`check:codeql-ratchet` **રિપોઝિટરીની સ્થિતિ વાંચે છે, જે શેડ્યૂલ મુજબ રિફ્રેશ થાય છે — દરેક PR દીઠ નહીં.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` આ અહેવાલ આપે છે:
`state: configured`, `schedule: weekly`: આ GitHubનું ડિફૉલ્ટ-સેટઅપ સ્કૅન છે, દરેક પુશ દીઠ થતું
વિશ્લેષણ નથી. પરિણામે: ચેતવણીઓને સુધારતી PR મર્જ થયા પછી, રૅચેટ આગામી નિર્ધારિત સ્કૅન
ચાલે ત્યાં સુધી જૂની, વધુ ઊંચી સંખ્યા વાંચતું રહે છે — તેથી સ્કૅન અપડેટ થાય ત્યાં સુધી તે
દરેક ખુલ્લી PR પર, સુધારો કરનાર PRની પોતાની અનુગામી PR સહિત, રિગ્રેશનનો અહેવાલ આપે છે.

**મેન્યુઅલ રિફ્રેશ**: `gh workflow run codeql.yml --ref release/vX.Y.Z` વિશ્લેષણ ફરી ચલાવે છે
અને થોડી મિનિટોમાં ચેતવણીઓ ફરી પ્રકાશિત કરે છે. પહેલાં `.github/workflows/codeql.yml`
વાંચો — તેનું હેડર સમજાવે છે કે તે માત્ર `workflow_dispatch` માટે જ છે, **કારણ કે તે
GitHubના "ડિફૉલ્ટ સેટઅપ" સાથે સંઘર્ષ કરે છે** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ટ્રિગર્સ પુનઃસ્થાપિત કરવા માટે પહેલાં **માલિકની કાર્યવાહી** જરૂરી છે: Settings → Code security →
CodeQL: Default → Advanced. આ સ્વિચ કર્યા વિના `schedule:` ટ્રિગર ઉમેરશો નહીં — તે
ફક્ત નિષ્ફળ રન ઉત્પન્ન કરશે.

**સંખ્યા ઘટ્યા પછી બેઝલાઇનને કડક બનાવો** — `node scripts/check/check-codeql-ratchet.mjs
--update` નવી માપેલી સંખ્યાને `quality-baseline.json` →
`metrics.codeqlAlerts.value`માં લખે છે, જેથી રૅચેટ જૂની મહત્તમ મર્યાદા સુધી પાછા જતા
રિગ્રેશનને ચૂપચાપ મંજૂરી ન આપે. કાર્યરત ઉદાહરણ (2026-09-02/03): PR #12502એ 7 વાસ્તવિક
ચેતવણીઓ સુધારી (13 → 6 માપેલી ખુલ્લી); PR #12530એ સ્થિર કરેલી બેઝલાઇનને 11 → 6 સુધી
કડક બનાવી જેથી તે મેળ ખાય; ત્યારબાદ બાકીની 6 ચેતવણીઓ દરેક ચેતવણી માટેના કારણ સાથે
નકારીને ખુલ્લી ચેતવણીઓની સંખ્યા 0 કરવામાં આવી.

**ચેતવણીઓને નકારવાનો નિર્ણય ઑપરેટરનો છે (કડક નિયમ #14)** — નકારવાની ટિપ્પણીમાં
તકનીકી કારણ નોંધ્યા વિના ક્યારેય CodeQL ચેતવણી નકારશો નહીં: અપસ્ટ્રીમ-પ્રોટોકોલની
જરૂરિયાત માટે `won't fix`, ટેસ્ટ ફિક્સચર માટે `used in tests`, અને CodeQL જોઈ ન શકે
એવા સેનિટાઇઝર માટે `false positive` (પૂર્વદૃષ્ટાંત: `docs/security/ERROR_SANITIZATION.md`).

---

## ટેસ્ટ રીટ્રાય નીતિ (WS5.4, v3.8.49)

રીટ્રાય દરેક રનર દીઠ છે, ક્યારેય વૈશ્વિક બ્લેન્કેટ નથી — બ્લેન્કેટ રીટ્રાય વાસ્તવિક રિગ્રેશન્સને
અદૃશ્ય ફ્લેક્સમાં ફેરવે છે:

| રનર              | નીતિ                                                                                                                      | કારણ                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | માત્ર CIમાં `retries: 1`, અને સાથે `trace: on-first-retry`                                                                | બ્રાઉઝર/નેટવર્ક ટાઇમિંગ ખરેખર અનિર્ધારિત હોય છે; ટ્રેસ સાથેનો એક રીટ્રાય ફ્લેકને નિદાન કરી શકાય તેવી આર્ટિફેક્ટમાં ફેરવે છે |
| Vitest           | કોઈ વૈશ્વિક રીટ્રાય નહીં. સાબિત થયેલા ફ્લેકી ટેસ્ટને સ્પષ્ટ પ્રતિ-ટેસ્ટ રીટ્રાય મળે છે (diffમાં દૃશ્યમાન, PRમાં સમીક્ષિત) | ક્વોરન્ટીન સૂચિને repoમાં રાખે છે, ક્યારેય અપારદર્શક નહીં                                                                   |
| node:test (unit) | ક્યારેય કોઈ રીટ્રાય નહીં                                                                                                  | ફ્લેકી યુનિટ ટેસ્ટ એ ટેસ્ટમાં રહેલી બગ છે — તેને સુધારો, તેને ફરીથી ચલાવી નસીબ અજમાવશો નહીં                                 |

ફ્લેક ટેલિમેટ્રી ઉપલબ્ધ થયા પછીના લક્ષિત SLOs (WS5.2/5.3): પ્રતિ ટેસ્ટ <1% ફ્લેક દર
("હમણાં સુધારો" થ્રેશોલ્ડ), પ્રતિ પાઇપલાઇન ≥95% પાસ દર. ઉદ્યોગના સંદર્ભ મૂલ્યો —
આપણા પોતાના માપનોની સરખામણીએ ફરીથી કેલિબ્રેટ કરો.

## રિલીઝ-સ્તરનું રૅચેટ ડ્રિફ્ટ (WS5.5, v3.8.49)

જ્યારે કોઈ રૅચેટ (ફાઇલ-કદ, જટિલતા, eslint ચેતવણીઓ) શુદ્ધ રિલીઝ
ટિપ પર રિગ્રેસ થાય — એટલે કે, મર્જોના સંયોજને તેમાં રિગ્રેશન કર્યું હોય અને કોઈ એક PR પોતાની
બ્રાન્ચ પર સ્વતંત્ર રીતે રિગ્રેશન પુનઃઉત્પન્ન ન કરતો હોય — ત્યારે તેને સુધારવાની જવાબદારી
**રિલીઝ કૅપ્ટનની છે, એક વખત, રિલીઝ બ્રાન્ચ પર**: એક્સ્ટ્રેક્શન/રિફેક્ટરને પ્રાધાન્ય આપો;
માત્ર દસ્તાવેજીકૃત વાજબીપણાની એન્ટ્રી સાથે જ રિબેઝલાઇન કરો. સંયોજનથી થતા ડ્રિફ્ટને ક્યારેય
યોગદાનકર્તાના PR પર ન ધકેલો અને પ્રતિ-PR રિબેઝલાઇન ક્યારેય ન કરો (તે વાસ્તવિક રિગ્રેશન્સ છુપાવે છે).
પહેલા ભેદ પારખો: તમારા PRને કારણ માનતા પહેલાં પ્રોબ worktreeમાં શુદ્ધ ટિપ સામેની
લાલ સ્થિતિ પુનઃઉત્પન્ન કરો.

## રૅચેટના ઘટાડાને બેન્ક કરવું — નીચેની દિશા (#8584)

રૅચેટ માત્ર અર્ધ-સ્વચાલિત છે અને એ પણ ખોટો અર્ધભાગ છે. કૅપને **વધારવી** એ
દસ સેકન્ડ લેતો મેન્યુઅલ JSON ફેરફાર છે અને લાલ PRને અનબ્લોક કરવાની સૌથી ઝડપી રીત છે.
કૅપને **ઘટાડવા** માટે કોઈએ `--update` ચલાવીને પરિણામ કમિટ કરવું પડે છે — અને
`bank-ratchet-shrinks` જૉબ આવ્યા પહેલાં કોઈ workflow તેને ચલાવતું નહોતું. માપવામાં આવેલ પરિણામ
(2026-07-25): 800-લાઇનની નવી-ફાઇલ કૅપ જેટલી કે તેનાથી ઓછી લાઇન ધરાવતી 18 ફ્રોઝન ફાઇલો,
જેમાં સૌથી ખરાબ 132× હતી (`src/shared/validation/schemas.ts`, 19 લાઇન્સ માટે 2,523ની કૅપ);
જટિલતાની મહત્તમ મર્યાદા લગભગ 37 રિબેઝલાઇન નોંધો દરમિયાન `1794 → 2169` સુધી વધી, જેમાં
બરાબર એક ઘટાડો (−1) હતો; અને "આગલા ચક્રમાં `--update` દ્વારા કડક કરો" 31 વખત લખાયું અને
એક વખત અમલમાં મુકાયું. જે કૅપ તેને વાજબી બનાવનાર કોડ કરતાં વધુ સમય ટકી રહે છે, તે પૂર્ણ થયેલા
દરેક વિઘટનને ત્યારબાદ ફાઇલ સંપાદિત કરનાર માટે ચૂપચાપ વૃદ્ધિની છૂટમાં ફેરવે છે.

`nightly-release-green.yml` → જૉબ **`bank-ratchet-shrinks`** તે ચક્રને પૂર્ણ કરે છે:

|          |                                                                                                           |
| -------- | --------------------------------------------------------------------------------------------------------- |
| ચાલે છે  | `schedule` (દિવસમાં 3×) + `workflow_dispatch` — ઇરાદાપૂર્વક **`push` નહીં**                               |
| માપે છે  | સૌથી ઉચ્ચ `release/vX.Y.Z`, `release-green` જેવી જ રિઝોલ્યુશન + ઇન્જેક્શન ગાર્ડ                           |
| લખે છે   | `check:file-size --update` અને `check:complexity-ratchets --update` (બંને બંધારણ મુજબ માત્ર ઘટાડો કરે છે) |
| ચકાસે છે | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                  |
| મોકલે છે | રિલીઝ બ્રાન્ચ સામે હંમેશા અદ્યતન રહેતો એક PR — ફોર્સ-અપડેટ થાય છે, ક્યારેય સ્પૅમ થતો નથી                  |

બેન્કિંગ પ્રતિ-push કરવાને બદલે બૅચમાં થાય છે, કારણ કે તેની કોઈ લેટન્સી આવશ્યકતા નથી
(8 કલાકની અંદર બેન્ક થયેલો ઘટાડો સ્વીકાર્ય છે), જ્યારે પ્રતિ-મર્જ રન મર્જ અભિયાનો દરમિયાન
PR બ્રાન્ચને વારંવાર ફરીથી બિલ્ડ કરશે અને દરેક વખતે સંપૂર્ણ ESLint વૉકનો ખર્ચ કરશે.
શોધ `push` (`release-green`) પર ચાલુ રહે છે; માત્ર બેન્કિંગ બૅચમાં થાય છે.

### સુરક્ષા ચકાસણીકાર

જૉબ કોઈ દેખરેખ વિના બેઝલાઇન્સમાં લખે છે, તેથી `verify-ratchet-bank.mjs` જ તેને
સ્વીકાર્ય બનાવે છે. તે `HEAD` સામે `--update` પછીના ટ્રીનો diff કરે છે અને જ્યાં સુધી
દરેક ફેરફાર નીચેનામાંથી કોઈ એક ન હોય ત્યાં સુધી **કોઈ કમિટ અસ્તિત્વમાં આવે તે પહેલાં જ જૉબને
અબોર્ટ કરે છે** — અને કોઈ PR ખોલતું નથી:

- `frozen` / `testFrozen` સંખ્યાત્મક એન્ટ્રી **ઘટાડવામાં** અથવા **દૂર કરવામાં** આવી હોય
- `complexity-baseline.json` → `count` **ઘટાડવામાં** આવ્યું હોય
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **ઘટાડવામાં** આવ્યું હોય

બીજું કંઈપણ નિષ્ફળ જાય છે: સંખ્યા વધારવી, એન્ટ્રી ઉમેરવી, `cap`/`testCap` બદલવું અથવા
`_rebaseline_*` નોંધ કાઢી નાખવી/ફરી લખવી (આ નોંધો દરેક મહત્તમ મર્યાદા શા માટે અસ્તિત્વમાં છે
તેની ઑડિટ ટ્રેઇલ છે અને ફાઇલ એન્ટ્રીઓ સાથે એ જ `frozen` ઑબ્જેક્ટમાં સંગ્રહિત છે).
કૅપ વધારી શકે તેવો બૉટ વર્તમાન સ્થિતિ કરતાં નિશ્ચિતપણે વધુ ખરાબ હશે. રિગ્રેશન
ગાર્ડ: `tests/unit/verify-ratchet-bank.test.ts`.

જૉબ ક્યારેય `release/*` પર push કરતી નથી — કોઈ માનવી PR મર્જ કરે છે, તેથી ખોટું માપન
સમીક્ષા વિના સામેલ થઈ શકતું નથી.

## મંજૂર સૂચિ નીતિ

દરેક ગેટ કે જે પહેલાથી અસ્તિત્વમાં રહેલા ઉલ્લંઘનો પર નિષ્ફળ ન થઈ શકે તે સ્થિર મંજૂરી સૂચિનો ઉપયોગ કરે છે (દા.ત., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). નીતિ છે:

**મૂળ કારણને ઠીક કરો; મંજૂર સૂચિનો ઉપયોગ ફક્ત ત્યારે જ કરો જ્યારે ઉલ્લંઘન પહેલાથી અસ્તિત્વમાં હોય અને તે જ PR માં સુધારી ન શકાય.**

મંજૂર સૂચિમાં એન્ટ્રી ઉમેરતી વખતે:

1. વાજબીતા સાથે ટિપ્પણી શામેલ કરો.
2. ટ્રેકિંગ સમસ્યાનો સંદર્ભ લો (દા.ત., `// #3498 — Phase 2 feature, not yet implemented`).
3. એ જ PR માં એન્ટ્રીને દૂર કરો જે ઉલ્લંઘનને ઠીક કરે છે — એક જૂની એન્ટ્રી કે જે સક્રિય ઉલ્લંઘનને લાંબા સમય સુધી દબાવી શકતી નથી તે પોતે જ એક ખામી છે (6A.3 વાસી-અમલીકરણ એકવાર અમલમાં આવ્યા પછી અનાથ મંજૂર સૂચિની એન્ટ્રી પર ગેટને નિષ્ફળ કરશે).

કરો** નથી** પરીક્ષણો ઝડપથી પાસ કરવા માટે મંજૂર સૂચિમાં પ્રવેશો ઉમેરો. વધતી જતી મંજૂર સૂચિ સાથેનો લીલો દરવાજો એ ગુણવત્તાની ખોટી સમજ છે.

### જ્યારે તમારા PR પર ગેટ નિષ્ફળ જાય છે

1. **ગેટ આઉટપુટ કાળજીપૂર્વક વાંચો** — તે તમને બરાબર કહે છે કે કઈ ફાઇલ અથવા પ્રતીકે નિયમનું ઉલ્લંઘન કર્યું છે.
2. **ઉલ્લંઘનને ઠીક કરો** — મોટાભાગના દરવાજા નિર્ધારિત ફાઇલસિસ્ટમ તપાસો છે જે કોડ સાચો હોય કે તરત જ પસાર થાય છે.
3. **જો ઉલ્લંઘન પહેલાથી અસ્તિત્વમાં છે** (એટલે કે, તમે તેનો પરિચય આપ્યો નથી પરંતુ ગેટ હવે તેને આવરી લે છે): વાજબી ટિપ્પણી અને ટ્રેકિંગ સમસ્યા સાથે મંજૂરી સૂચિમાં પ્રવેશ ઉમેરો.
4. **જો દરવાજો રેચેટ છે** (કવરેજ, ESLint ચેતવણીઓ, ડુપ્લિકેશન, જટિલતા): તમારા ફેરફારથી મેટ્રિક વધુ ખરાબ થઈ ગયું છે. અંતર્ગત સમસ્યાને ઠીક કરો, અથવા (ભાગ્યે જ) `npm run quality:ratchet -- --update` ચલાવો જો ફેરફાર ઇરાદાપૂર્વક કરવામાં આવ્યો હોય અને મેટ્રિક ડિગ્રેડેશન સ્વીકાર્ય — છે પરંતુ શા માટે PR વર્ણનમાં દસ્તાવેજ કરો.
5. **સલાહકાર દરવાજા** (`continue-on-error: true`) માહિતીપ્રદ — છે તેઓ મર્જને અવરોધિત કરતા નથી પરંતુ CI સારાંશમાં દેખાય છે. કોઈપણ રીતે તેમને ઠીક કરો.

---

## નવો ગેટ ઉમેરવો

1. `scripts/check/check-<name>.mjs` (અથવા `.ts`) બનાવો. નીતિ ગેટ 0/1 સાથે બહાર નીકળે છે.
   રૅચેટ-શૈલીના ગેટ `collect-metrics.mjs` મારફતે `quality-metrics.json`માં મેટ્રિક લખે છે.
2. `package.json`માં `"check:<name>": "node scripts/check/check-<name>.mjs"` ઉમેરો.
3. તેને યોગ્ય જોબ હેઠળ `.github/workflows/ci.yml`માં જોડો
   (નીતિ → `lint` અથવા `docs-sync-strict`; રૅચેટ → `quality-gate`).
4. જો તેની પાસે મંજૂર-યાદી હોય, તો `scripts/check/lib/allowlist.mjs`માંથી
   `reportStaleEntries()` લાગુ કરો જેથી જૂની એન્ટ્રીઓ આપમેળે શોધાય.
5. ગેટના શોધ-તર્કને આવરી લેતું પરીક્ષણ `tests/unit/build/`માં લખો.
6. આ દસ્તાવેજ અપડેટ કરો (સંબંધિત જોબ ટેબલમાં એક પંક્તિ ઉમેરો).

---

## એજન્ટ ટૂલિંગ: LSP-ઇન-ધ-લૂપ (વૈકલ્પિક)

CI ગેટ ઉપરાંત, OmniRoute એક **વૈકલ્પિક** `agent-lsp` સ્કેફોલ્ડ પ્રદાન કરે છે
(પ્રોજેક્ટ-સ્તરનું `.mcp.json`, Fase 7 Task 15). કોડિંગ એજન્ટો માટે TypeScript ભાષા સર્વર
ઉપલબ્ધ કરાવવા `.mcp.json` બનાવો, જેથી તેઓ કોડ લખતા **પહેલાં** સિમ્બલ /
ડાયગ્નોસ્ટિક્સનું નિરાકરણ કરે — આ `typecheck:core`નું કમ્પાઇલ-બિફોર-ક્લેમ સાથી છે,
જે "કલ્પિત સિમ્બલ" ભૂલોને તેમના સ્ત્રોતે જ ઘટાડે છે. તેને ઇરાદાપૂર્વક આપમેળે લોડ કરવામાં
આવતું નથી (તમે MCP↔LSP બ્રિજ પસંદ કરીને ચકાસો છો); ખામીયુક્ત એન્ટ્રી માત્ર કનેક્શન ભૂલને
લૉગ કરે છે અને ક્યારેય સેશનોને વિક્ષેપિત કરતી નથી.

---

## તર્કસંગતીકરણ બેકલોગ (ROI સમીક્ષા — ફેસ 9 ઓંડા 3)

2026-06-17ના રોજ આ ઇન્વેન્ટરીનું `ci.yml` સામે સમાધાન કરવામાં આવ્યું હતું (અગાઉના સંસ્કરણમાં `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` ને બાદ કરવામાં આવ્યું હતું). સમાધાન કરેલ સમૂહની ROI સમીક્ષાએ નીચેના તર્કસંગત ઉમેદવારોને ઓળખ્યા.** મર્જ એ યાંત્રિક CI ફેરફારો છે; flips/drops એ ઓપરેટર માટે આરક્ષિત નીતિ વિષયક નિર્ણયો છે.** હજુ સુધી નીચે કંઈપણ લાગુ કરવામાં આવ્યું નથી.

**ઉપર પણ બિનદસ્તાવેજીકૃત** (સલાહકાર, લો સિગ્નલ): `docs-lint` જોબ (માર્કડાઉનલિન્ટ + વેલે, સંપૂર્ણ જોબ `continue-on-error`) અને સ્ટેન્ડઅલોન સ્કેનર વર્કફ્લો `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` `quality-baseline.json` માં છે પરંતુ `ci.yml` — માં બ્લોકીંગ રેચેટ સાથે જોડાયેલ નથી મેટ્રિક હાલમાં અનાથ છે.

### મર્જ / ડીડઅપ (મિકેનિકલ, ઓછું જોખમ)

દરેક ઉમેદવારને 2026-06-17ના રોજ લાઇવ ગેટ સ્ટેટ સામે માન્ય કરવામાં આવ્યા હતા (વિશ્વાસ-પરંતુ-ચકાસો); દેવું છુપાવવા માટે ઘણા "સ્પષ્ટ" મર્જ થયા છે અને છે** નથી** ડ્રોપ-ઇન્સ સાફ કરો.

- **`check:docs-sync` બે વાર ચાલે છે** `lint` જોબમાં — સ્ટેન્ડઅલોન અને ફરીથી `check:docs-all` (`docs-sync-strict`) અને હસ્કી પ્રી-કમિટ હૂકની અંદર. ✅**DONE** — સ્ટેન્ડઅલોન `lint` વિનંતી દૂર કરવામાં આવી.
- **CVE સ્કેનિંગ** — ❌**NOT સ્વચ્છ મર્જ.** `audit:deps` વર્તમાન નીતિ હેઠળ ચેતવણીઓ તરીકે ઉચ્ચ સલાહકારની જાણ કરતી વખતે, તમામ પાંચ લોકફાઈલોમાં જટિલ સલાહ અને અપૂર્ણ ઓડિટને અવરોધે છે; `check:vuln-ratchet` (osv) માત્ર ચેક-ઇન બેઝલાઇન વિરુદ્ધ _regression_ પર નિષ્ફળ જાય છે અને જ્યારે જરૂરી હોય ત્યારે ખૂટતા માપને નકારે છે. વિવિધ સિમેન્ટિક્સ — ડ્રોપિંગ `audit:deps` સંપૂર્ણ નિર્ણાયક ગેટ અને સ્વતંત્ર પેકેજ ઓડિટ રસીદો ગુમાવશે. બંને રાખો.
- **ચક્ર શોધ** — ✅**DONE** (#15159 G-01/G-02). અહીંના જૂના લખાણને `check:cycles` "ધ ગ્રીન, ક્યુરેટેડ" ગેટ કહેવામાં આવે છે અને તેને અવરોધિત રાખવાનું વાજબી છે કારણ કે `check:circular-deps` (dpdm) એ 91 ચક્રની જાણ કરી હતી. તે લીલા એ** ખોટા લીલા** : `check:cycles` 5 સબડાયરેક્ટરીઓ (450 ફાઇલો) સ્કેન કરી, માત્ર સ્થિર `import|export … from` સાથે મેળ ખાતી, અને દરેક `@/` અને `@omniroute/open-sse/` સ્પષ્ટકર્તાને છોડી દીધું, તેથી તે રેપો પર પ્રભુત્વ ધરાવતા ડાયનેમિક-ઇમ્પોર્ટ + ઉર્ફે ચક્રને જોઈ શકતું નથી. સ્થિર: ગેટ હવે `src` + `open-sse` (5023 ફાઇલો) પર ચાલે છે, TypeScript AST માંથી સ્પષ્ટીકરણો એકત્રિત કરે છે (જેથી `import("…")` ગણાય છે અને ટાઇપ-પોઝિશન `typeof import("…")` નથી), અને tsconfig `paths` ને ઉકેલે છે. તે શોધે છે** 14** ચક્ર, 0 નહીં. કારણ કે 14 પૂર્વ-અસ્તિત્વમાં રહેલા ચક્રને ગેટ PR માં નિશ્ચિત કરી શકાતા નથી, `check:cycles` હવે એ છે** રેચેટ** (`--ratchet`, `quality-baseline.json`, `direction: down` માં સીલિંગ `metrics.cycles.value = 14` ) — તે કોઈપણ _રીગ્રેસન_ ને અવરોધે છે અને ગણતરી માત્ર ઘટી શકે છે. CI `npm run check:cycles:ratchet` ચલાવે છે. સાથે બર્ન-ડાઉન સવારી**A-01** . `check:circular-deps` (dpdm) વ્યાપક બીજા અભિપ્રાય તરીકે સલાહકાર રહે છે.
- **જટિલતા** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): એક ESLint વોક, ruleId દ્વારા ગણવામાં આવે છે તેથી સાયક્લોમેટિક + મહત્તમ-રેખાઓ અને જ્ઞાનાત્મક આધારરેખાઓ સ્વતંત્ર રહે છે; વ્યક્તિગત `check:complexity` / `check:cognitive-complexity` સ્થાનિક `--update` માટે રહે છે.
- **`/api` વિરોધી આભાસ** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` ની એક FS ઇન્વેન્ટરી , ઓપનએપી-રાઉટ્સ + ડૉક્સ-સિમ્બોલ હજુ પણ સ્વતંત્ર રીતે રિપોર્ટ કરે છે; વ્યક્તિઓ સ્થાનિક રન માટે રહે છે.
- **`check:node-runtime` 11 નોકરીઓમાં ચાલે છે** — ⚠️** ઓછી ROI.** દરેક એક અલગ રનર છે અને ચેક < 1s છે; કુલ બચત ~ 10s, નોકરી દીઠ સસ્તા ગાર્ડ ગુમાવવા સામે. મંથન કરવા યોગ્ય નથી.
- **`typecheck:noimplicit:core` પર CI લિન્ટ** — ✅** લિન્ટ જોબમાંથી દૂર** (સલાહકારી `continue-on-error` હતી); બ્લોકીંગ પ્રકારની સપાટી `typecheck:core` + `check:type-coverage` છે. સ્થાનિક સ્ક્રિપ્ટ જાળવી રાખી.

### ફ્લિપ / નક્કી કરો (ઓપરેટર નીતિ)

- `check:openapi-security-tiers` (સલાહકાર) — ❌**NOT સ્વચ્છ રીતે ફ્લિપેબલ.** તે 0 થી બહાર નીકળે છે પરંતુ ચેતવણી આપે છે કે `LOCAL_ONLY_API_PREFIXES` હેઠળના કેટલાક `traffic-inspector` રૂટમાં `x-loopback-only: true` એનોટેશનનો અભાવ છે. તેને લાગુ કરવા માટે તે ટીકાઓને પહેલા `openapi.yaml` માં ઉમેરવાની જરૂર છે.
- `typecheck:noimplicit:core` (સલાહકાર) — મોટાભાગે બ્લોકીંગ `check:type-coverage` રેચેટ દ્વારા સમાવિષ્ટ છે. રેચેટ પર ફ્લિપ કરો અથવા રીડન્ડન્ટ સેકન્ડ `tsc` પાસ છોડો.
- `test:vitest:ui` (હવે** અવરોધિત** ) — પૂર્વ-અસ્તિત્વમાં રહેલી નિષ્ફળતાઓને `// #8618` ટ્રેકિંગ ટિપ્પણીઓ સાથે `vitest.config.ts` માં સ્પષ્ટપણે બાકાત રાખવામાં આવે છે; નવી નિષ્ફળતાઓ કામને નિષ્ફળ કરે છે.
- `check:secrets` (gitleaks, બ્લોકીંગ રેચેટ 3 દસ્તાવેજીકૃત ખોટા-પોઝિટિવ્સ પર સ્થિર થાય છે) — 3 ને 0 સુધી પહોંચવાની મંજૂરી આપે છે, અથવા સલાહકારમાં ઘટાડો કરે છે. GitHub નેટિવ સિક્રેટ-સ્કેનિંગ + `check:public-creds` ને ઓવરલેપ કરે છે.
- `check:pr-evidence` (અવરોધિત, greps PR-બોડી ગદ્ય) — ઉચ્ચ ખોટા-પોઝિટિવ જોખમ; જો છોડવામાં આવે તો હાર્ડ નિયમ #18 અમલીકરણને નબળું પાડે છે, તેથી આ એક વાસ્તવિક નીતિ કૉલ છે.
- `semgrep` (સલાહકાર સ્ટેન્ડઅલોન) OWASP પરિવારો માટે — CodeQL ને ઓવરલેપ કરે છે; તેની બેઝલાઇનને રેચેટ અથવા ડ્રોપ પર વાયર કરો.

---

## સંબંધિત દસ્તાવેજીકરણ

- સપ્લાય-ચેઇન (પ્રોવેનન્સ, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — કી-સેટ સમાનતા ગેટ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, જોબ `i18n-ui-coverage`).
દરેક `src/i18n/messages/<locale>.json`ના લીફ કી સેટની `en.json` સાથે તુલના કરે છે અને
કી ક્યારે ઉમેરાઈ હતી તેની પરવા કર્યા વિના, કોઈપણ ગેરહાજર અથવા વધારાની લીફ મળતાં નિષ્ફળ જાય છે.
`__MISSING__:` પ્લેસહોલ્ડર્સ હાજર ગણાય છે (તેમની સામગ્રી રેશિયો ગેટનો વિષય છે). આ બે
ડિફ-આધારિત/ટકાવારી ગેટ્સનું સંપૂર્ણ પૂરક છે: `check-ui-keys-coverage` દરેક locale માટે
80 %ની લઘુતમ મર્યાદા લાગુ કરે છે (~13,000માંથી 43 કી ગેરહાજર હોય તો પણ 99.7 % દર્શાય છે)
અને `check-new-key-coverage` માત્ર PR દ્વારા `en.json`માં ઉમેરાયેલી કીનું મૂલ્યાંકન કરે છે.
locale બૅચ તેની બ્રાન્ચ કાપવામાં આવે તે દિવસના `en.json` પરથી જનરેટ થાય છે અને બેઝમાં
કી ઉમેરાતી રહે ત્યારે ઘણા દિવસો સુધી અનુવાદ કરે છે; બૅચ PR પોતે કોઈ કી ઉમેરતો નથી, તેથી
બૅચ 1 (#13044) નવ localesમાં 43 કી ઓછી અને બૅચ 2 (#13660) આઠમાં 10 કી ઓછી સાથે
મર્જ થયા ત્યારે (2026-09-15) બંને સહગેટ મૌન રહ્યાં. લાલ નિષ્ફળતા સુધારવા માટે
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ચલાવો; `extra` લીફનો
અર્થ છે કે સ્રોતમાંથી તે દૂર કરવામાં આવી છે — તેને localeમાંથી કાઢી નાખો. `--warn` નિષ્ફળ કર્યા
વિના અહેવાલ આપે છે. `--catalog=cli` એ જ તુલના `bin/cli/locales` પર ચલાવે છે
(`npm run i18n:check-keys:cli`); બંને પગલાં જોબ `i18n-ui-coverage`માં છે.

#### `check-new-key-coverage` — નવી-કી i18n ગેટ

`check-ui-value-drift`નું સહગેટ. તે એવા અંગ્રેજી મૂલ્યને પકડે છે જે **ફરી લખાયું** હોય
પરંતુ તેના અનુવાદો પાછળ રહી ગયા હોય; આ ગેટ એવી અંગ્રેજી કીને પકડે છે જે **ઉમેરાઈ** હોય
પરંતુ કેટલાક localesને ક્યારેય મળી ન હોય.

`check-ui-keys-coverage` આ પ્રકારની સમસ્યા જોઈ શકતું નથી: તે દરેક locale માટે ટકાવારીની
લઘુતમ મર્યાદા લાગુ કરે છે, અને ~13,000 લીફમાંથી અગિયાર કી ગેરહાજર હોય તો કવરેજ 99.9% રહે છે.
ભાષા દીઠ ટકાવારીથી "આ સુવિધા અનુવાદ વિના રિલીઝ થઈ" વ્યક્ત કરી શકાતું નથી — નવી localeમાં
સમગ્ર સુવિધા કોઈપણ ટેક્સ્ટ વિના ઉમેરાઈ શકે છે અને આ આંકડો ક્યારેય બદલાતો નથી.

તે જે ઘટનાને અંકિત કરે છે: Orchestration Canvasના તબક્કા 3માં તે સમયે અસ્તિત્વ ધરાવતા
42 localesમાં તેની અગિયાર કીનો અનુવાદ કરવામાં આવ્યો હતો. થોડા કલાકો પછી EU-ભાષા બૅચ
(#13044) રિપોઝિટરીને 51 locales સુધી લઈ ગઈ, અને નવ નવા locales (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`)ને એ કી ક્યારેય મળી નહીં. ગેરહાજર કી માટે `deepMergeFallback`
અંગ્રેજી મૂકે છે, તેથી નિષ્ફળતાનું સ્વરૂપ ખાલી UIને બદલે અનુવાદ વિનાનું UI હતું — વાસ્તવિક,
અને રચનાત્મક રીતે મૌન.

તેના સહગેટની જેમ આ પણ **ડિફ-અવેર** છે, જે મર્જ બેઝ પરના અંગ્રેજીની વર્કિંગ ટ્રી સાથે
તુલના કરે છે, તેથી અગાઉથી અસ્તિત્વ ધરાવતી ખામીઓ સ્થિર રહે છે અને ગેટ ચાલુ કરવા માટે કોઈ
માઇગ્રેશનની જરૂર પડી નહોતી.

**`__MISSING__:<english>` માર્કર તેને સંતોષતું નથી (2026-09-17થી).** અગાઉ તે દસ્તાવેજીકૃત
મુલતવીકરણ હતું — રનટાઇમ યોગ્ય અંગ્રેજી પર ફૉલબૅક કરે છે — પરંતુ 2026-09-16ના આઠ ફીચર
PRએ 61 કી ઉમેરી અને અનુવાદ કરવાને બદલે તમામ 65 localesમાં માર્કર મૂકી દીધું: આ ગેટે
દરેકને સ્વીકારી લીધું, PRને કંઈએ અવરોધ્યો નહીં, અને ત્યારબાદ અવરોધક વાસ્તવિક-અનુવાદ રેશિયો
ગેટ દરેક માટે રિલીઝ ટિપ પર નિષ્ફળ ગયો (pt-BR 3.2 % > 2.5 % + 0.5). હવે માર્કરને ગેરહાજર
અનુવાદ તરીકે મૂલવવામાં આવે છે. લાલ નિષ્ફળતા સુધારવા માટે
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ચલાવો,
અથવા `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe,
`OMNIROUTE_TRANSLATION_*` env વિના શરૂ થવાનો ઇનકાર કરે છે) વડે તમામ localesને સમાંતરમાં
ચલાવો. જે કી અંગ્રેજીમાં જ રહેવી આવશ્યક હોય (નિશ્ચિત કરેલું પ્રોડક્ટ/એન્જિન/ફ્લૅગ નામ) તે
`scripts/i18n/untranslatable-keys.json`માં હોવી જોઈએ, માર્કર પાછળ ક્યારેય નહીં. `vi`માં
માર્કર્સ પર સંપૂર્ણ પ્રતિબંધ છે (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — સ્થગિત-ટેસ્ટ ગેટ

`vitest.config.ts`ની `exclude` સૂચિમાં રહેલી ફાઇલ એવો ટેસ્ટ છે જે ચાલતો નથી, અને ટ્રી
વાંચનારને તે કવરેજ જેવો દેખાય છે. બાસઠ ફાઇલો
`// #8618 — pre-existing failure; remove this exclusion when fixed` ટિપ્પણી પાછળ એકઠી થઈ.
Issue #8618ને 2026-08-11ના રોજ બંધ કરવામાં આવ્યો હતો, જ્યારે તે ટ્રૅક કરતી સૂચિ 45 એન્ટ્રીથી
વધીને 62 થઈ ગઈ હતી, અને દરેક નવી એન્ટ્રીને બંધ થઈ ચૂકેલા issue તરફ નિર્દેશ કરતી ટિપ્પણી
વારસામાં મળી હતી. આખરે જ્યારે સૂચિને ફાઇલ દીઠ માપવામાં આવી (#13204), ત્યારે **62માંથી 51
ફાઇલો વર્તમાન ટ્રી સામે કોઈપણ સ્રોત ફેરફાર વિના પાસ થઈ**.

ગેટ માટે જરૂરી છે કે વાસ્તવિક ફાઇલમાં રિઝોલ્વ થતું દરેક exclusion (a) ટ્રૅકિંગ issueનું નામ આપે
અને (b) તેની માપેલી સ્થિતિ સાથે `config/quality/vitest-exclusions.json`માં દેખાય, જેથી એક વધુ
લાઇન 60-એન્ટ્રીવાળા ઍરેમાં ઉમેરવાને બદલે exclusion ઉમેરવું સમર્પિત ફાઇલમાં સમીક્ષા કરી શકાય
તેવું ડિફ બને. તે ઇરાદાપૂર્વક બાકાત રાખેલા ટેસ્ટ ફરી ચલાવતું નથી — તેમાં ~10 મિનિટ લાગે છે
અને તે આવર્તક જોબમાં હોવું જોઈએ; ઇન્વેન્ટરી દરેકને છેલ્લે ક્યારે માપવામાં આવ્યું હતું તે નોંધે છે.
