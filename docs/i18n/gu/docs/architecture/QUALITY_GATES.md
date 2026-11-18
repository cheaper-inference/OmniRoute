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

CI અને ક્વોલિટી ગેટ્સ વર્કફ્લો દરેક એક સ્થિર ચુકાદો બહાર કાઢે છે: `Gate / CI` અને `Gate / Quality`. તેમની આવૃત્તિવાળી એડમિશન પોલિસી દરેક અપસ્ટ્રીમ જોબને જરૂરી અથવા એડવાઇઝરી તરીકે ગણાવે છે. લાગુ જરૂરી કામ સફળ થવું જોઈએ: ગુમ થયેલ, રદ કરેલ, છોડેલ, બાકી અને અજ્ઞાત પરિણામો PASS સ્થાપિત કરી શકતા નથી. માન્ય દસ્તાવેજ-માત્ર અથવા સૂચિ-માત્ર વર્ગીકરણ કોડ લેનને અયોગ્ય બનાવી શકે છે; ડ્રાફ્ટ PR સ્વીકૃત ઉમેદવાર નથી. `hotfix` લેબલ પુરાવાને માફ કરતું નથી.

બંને વર્કફ્લો PRs main/release શાખાઓમાં આવરી લે છે, `main` પર દબાણ કરે છે, મેન્યુઅલ ડિસ્પેચ અને મર્જ-ગ્રુપ ઇવેન્ટ્સ. પુશ, ડિસ્પેચ અને મર્જ-ગ્રુપ સંપૂર્ણ પસંદગી ચલાવો. `release/**` પર ધકેલવાથી તેઓ શરૂ થતા નથી (2026-10-18): દરેક ફેરફાર પહેલાથી જ તેના PR પર મેટ્રિક્સ ચલાવે છે અને મર્જ કરેલ સંયોજન એ રિલીઝ-ગ્રીનનું કામ છે (`docs/ops/RUNNER_BOX.md` → હોસ્ટેડ લેન). ફોર્ક્સ અને મર્જ જૂથો નોકરીઓ માટે હોસ્ટ કરેલા દોડવીરોનો ઉપયોગ કરે છે જે અન્યથા સ્વ-હોસ્ટેડ દોડવીરોને પસંદ કરે છે; રોલઆઉટ પહેલાં પૂરતી હોસ્ટ કરેલ ક્ષમતા ચકાસવી આવશ્યક છે.

એક સામાન્ય PR ઝડપી પસંદગી ચલાવે છે. પ્રવેશ નીતિની `full-code` અને `full-code-e2e` લેન (E2E, એકીકરણ, પેકેજ આર્ટિફેક્ટ, Electron સ્મોક, Bun SQLite, ઇકોસિસ્ટમ અને પ્રોટોકોલ ક્લાયન્ટ્સ) ફક્ત મર્જિફાઇ કતાર ડ્રાફ્ટ પર અથવા સંપૂર્ણ રન પર ચાલે છે: `gh workflow run ci.yml --ref <branch>`.

દરેક JSON રસીદ ચેક-આઉટ SHA, વર્કફ્લો રન અને પ્રયાસને ઓળખે છે. CLI એ checkout/event SHA અસંગતતાને નકારી કાઢે છે. વર્કફ્લો પરીક્ષણો નીતિ સભ્યપદને ચુકાદાની નોકરીની `needs` સૂચિ સાથે જોડે છે જેથી નવી અથવા દૂર કરાયેલ લેન શાંતિપૂર્વક અદૃશ્ય થઈ શકે નહીં. રસીદો તેમના પોતાના વર્કફ્લોને આવરી લે છે, પ્રકાશન, જમાવટ અથવા હાલના સલાહકાર સ્કેનરના આંતરિક ભાગને નહીં. શાખાના નિયમોમાં બંને ચેક નામોને સક્રિય કરવું એ એક અલગ વહીવટી ફેરફાર છે; આ નોકરીઓ ઉમેરવાથી શાખાનું રક્ષણ થતું નથી.

### કતાર મર્જ કરો

`queue` લેબલ Mergify કતાર (`.mergify.yml`) પર PR મોકલે છે. Mergify `mergify/merge-queue/` શાખા પર ડ્રાફ્ટ PR ખોલે છે, CI ત્યાં સંપૂર્ણ પસંદગી ચલાવે છે, અને જ્યારે `Gate / CI`, `Gate / Quality` અને `Merge integrity (changelog + generated skills)` પાસ થાય છે ત્યારે મૂળ PR મર્જ થાય છે.

મર્જાઇફ ડ્રાફ્ટના વર્ણનમાં તેની કતારનો સારાંશ લખે છે અને અન્ય એપ્સ પણ તેને સંપાદિત કરી શકે છે. આવા ડ્રાફ્ટ પરની `pull_request` `edited` ઇવેન્ટ તેના પોતાના સહવર્તી જૂથ (`-queue-edit-<run_id>`) લે છે તેથી તે ડ્રાફ્ટના વાસ્તવિક રનને રદ કરી શકતી નથી, અને તે ગેટ અને મેટ્રિક્સને છોડી દે છે. માત્ર `Merge integrity` હજુ પણ ચાલે છે. સ્કીપ કરેલ ગેટ જોબ એક અલગ ચેક નામ ધરાવે છે, કારણ કે મર્ગીફાઈ એ સ્કીપ કરેલ `Gate / CI` નિષ્ફળ ચેક તરીકે વાંચે છે અને PR ને dequeues કરે છે.

ડેક્યુ પછી, દબાણ હંમેશા PR વિનંતી કરતું નથી. તેના પર `@mergifyio queue` કોમેન્ટ કરો.

### સ્વીકૃતિ રીડ્યુસરમાં પુરાવા જાળવી રાખ્યા છે

`scripts/quality/validate-release-acceptance.mjs` પૂરી પાડવામાં આવેલ યોજના અને તેના મેનિફેસ્ટને ઘટાડે છે; તે સ્થાપિત કરતું નથી કે યોજના સંપૂર્ણ પ્રકાશન પાઇપલાઇનને આવરી લે છે. તેના અહેવાલો સ્પષ્ટપણે `releaseAcceptance: false` સેટ કરે છે, પછી ભલે તે યોજના `VERIFIED` હોય. `release-acceptance.yml` વર્કફ્લો હજુ પણ શેડો ફિક્સરનો ઉપયોગ કરે છે, વાસ્તવિક બિલ્ડ, પેકેજ, બૂટ અથવા પ્રમોશન રસીદોનો નહીં.

CLI જાળવી રાખેલા પુરાવા ચકાસવા માટે `--evidence-root` ની જરૂર છે. ફાઇલોને `<evidence-root>/<artifact_id>/<member>` તરીકે ઉકેલવામાં આવે છે અને SHA-256 તરીકે હેશ કરવામાં આવે છે. પુરાવા વિનાનો PASS રેકોર્ડ, ગુમ થયેલ અથવા બદલાયેલ ફાઇલ, અસુરક્ષિત પાથ અથવા સિમલિંક ચકાસણીને અટકાવે છે. ખૂટતી ફાઇલો ખાલી સફળ લોગની સમકક્ષ નથી. હાલની SHA/run/attempt ચેક્સ સ્વતંત્ર રહે છે: મેચિંગ બાઈટ વાસી રસીદને બચાવી શકતા નથી. ફાઇલ અખંડિતતા અમલની અધિકૃતતા અથવા આર્ટિફેક્ટ પ્રમોશનનો પુરાવો નથી.

### સ્ટેટિક સ્કેન ઇન્વેન્ટરી

સંસ્કરણિત npm-ઉર્ફે ઇન્વેન્ટરી અને સ્ટેટિક-સ્કેન સભ્યપદ `config/quality/gate-manifest.json` માં રહે છે. સ્ક્રિપ્ટ નામો અને `package.json` સામે ચોક્કસ આદેશોને માન્ય કરવા માટે `npm run check:gate-manifest` ચલાવો; ઉમેરાઓ, દૂર કરવા અને કમાન્ડ ડ્રિફ્ટ સ્થાનિક હૂક અને CI માં ફેરફાર-વર્ગીકરણ જોબ્સ બંનેને નિષ્ફળ કરે છે. ઉપનામ એ વર્કફ્લો જોબ, મેટ્રિક્સ ઇન્સ્ટન્સ અથવા ટેસ્ટ કેસ નથી: આ ગણતરીઓ વિનિમયક્ષમ તરીકે રજૂ થવી જોઈએ નહીં.

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
| `check:model-lifecycle`           | ત્રણ હાથથી જાળવવામાં આવેલ રૂટીંગ કોષ્ટકો ચેક-ઇન લાઇફસાઇકલ સ્નેપશોટ (#11503) સાથે સુસંગત રહે છે : `FITNESS_TABLE` (`taskFitness.ts`) સ્કોર્સ કોઈ નિવૃત્ત ID નથી કે જે `REGISTRY` રૂટ કરી શકે; દરેક `BUILT_IN_ALIASES` લક્ષ્ય `REGISTRY` માં હાજર છે અને નિવૃત્ત-આઈડી સ્નેપશોટમાંથી ગેરહાજર છે; `REGISTRY` માં હજુ પણ દરેક નિવૃત્ત આઈડી ફોરવર્ડ અથવા `allowedRetiredInCatalog` માં સૂચિબદ્ધ છે; અને તે સ્નેપશોટમાં કોઈ `DEFAULT_DEGRADATION_MAP` સ્ત્રોત અથવા લક્ષ્ય નિવૃત્ત દેખાતા નથી. આ સાબિત કરતું નથી કે મોડેલ હાલમાં લાઇવ અપસ્ટ્રીમ દ્વારા પીરસવામાં આવે છે. ઑફલાઇન — `config/quality/model-lifecycle.json` સાથે સરખાવે છે, `npm run quality:refresh-model-lifecycle` સાથે હાથથી તાજું કરવામાં આવે છે (નેટવર્ક; CI માં વાયર્ડ નથી). `allowedRetiredInCatalog` એ બર્ન-ડાઉન રેચેટ છે: ફક્ત ટ્રેકિંગ સમસ્યા સાથે એન્ટ્રી ઉમેરો.                                                                                                            | હા                                      |
| `check:fetch-targets`             | ક્લાયંટ-સાઇડ `src/` માં દરેક `fetch("/api/...")` વાસ્તવિક `route.ts` માટે ઉકેલે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:deps`                      | રેપોમાં દરેક `package.json` માં તમામ `npm install` -able ડેપ્સ `dependency-allowlist.json` માં છે; નવા અનપિન કરેલા અથવા સ્લોપક્વેટેડ પેકેજો ફ્લેગ કરેલા                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `audit:deps`                      | તમામ પાંચ સ્વતંત્ર લોકફાઈલો (રુટ, Electron, OpenCode પ્લગઈન્સ v1/v2 અને પ્રદાતા)નું npm ઓડિટ. જટિલ સલાહ બ્લોક; ઉચ્ચ સલાહો દૃશ્યમાન ચેતવણીઓ રહે છે. Missing/failed ઓડિટ INCOMPLETE અને બ્લોક છે; પ્રતિ-સ્કોપ લોક હેશ અને અહેવાલો જાળવી રાખવામાં આવે છે.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:lockfile`                  | `package-lock.json` અખંડિતતા — https રજિસ્ટ્રી, અખંડિતતા હેશ, કોઈ હોસ્ટ ઓવરરાઇડ્સ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:licenses`                  | ઉત્પાદન નિર્ભરતા માટેSPDX લાઇસન્સ મંજૂર સૂચિ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા                                      |
| `check:tracked-artifacts`         | કોઈ બિલ્ડ આર્ટિફેક્ટ્સ / પ્રતિબદ્ધ `node_modules` સિમલિંક્સ નથી (હસ્કી પ્રી-કમિટમાં પણ ચાલે છે; પ્રી-પુશ ઇરાદાપૂર્વક હળવા — #6716 છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:ai-attribution`            | PR કમિટ, શીર્ષક અથવા બોડી — હાર્ડ રૂલ #16 માં કોઈ AI/bot `Co-Authored-By` ટ્રેલર અથવા AI-જનરેશન ફૂટર નથી ( PR→ `release/**` — માટે `quality.yml` ફાસ્ટ-ગેટ્સ લૂપમાં ઇવેન્ટ પેલોડ વાંચે છે, નો- `ci.yml` ઓફ PRs — પીઆર અને સ્ટેપ માટે PR→; હસ્કી`main` હૂક પણ માન્ય `commit-msg` #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | દરેક Vitest બાકાત ટ્રેકિંગ સમસ્યાને નામ આપે છે અને `config/quality/vitest-exclusions.json` (#13204) માં દેખાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | હા                                      |
| `check:file-size`                 | સ્ત્રોત ફાઇલો (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` ની અંદર રહે છે અને `testCap` ની અંદર ફાઇલો (`*.test.ts(x)`) પરીક્ષણ કરે છે ; `file-size-baseline.json` (`frozen` / `testFrozen`) માં સ્થિર થયેલી ફાઇલો તેમના રેકોર્ડ કરેલ કદથી આગળ વધવી જોઈએ નહીં                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | હા                                      |
| `check:error-helper`              | executors/handlers માં ભૂલ પ્રતિસાદો `buildErrorBody()` / `sanitizeErrorMessage()` (હાર્ડ રૂલ #12) નો ઉપયોગ કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:migration-numbering`       | સ્થળાંતર SQL ફાઇલો ક્રમિક રીતે ક્રમાંકિત છે, કોઈ અંતર અથવા ડુપ્લિકેટ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                      |
| `check:public-creds`              | `publicCreds.ts` બહાર કોઈ શાબ્દિક OAuth `client_id`/`client_secret` અથવા ફાયરબેઝ વેબ કી નથી (હાર્ડ રૂલ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | હા                                      |
| `check:db-rules`                  | `src/lib/db/` મોડ્યુલોની બહાર કોઈ કાચો SQL નથી; `localDb.ts` થી કોઈ બેરલ-આયાત નહીં (હાર્ડ રૂલ્સ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:known-symbols`             | પ્રદાતા એક્ઝિક્યુટર્સ, રૂટીંગ વ્યૂહરચના અને તેમના ડિસ્પેચ કોષ્ટકોમાં નોંધાયેલ અનુવાદકો ડિસ્ક પરની ફાઇલો સાથે મેળ ખાતા નથી — નો અનાથ અથવા અઘોષિત પ્રતીકો                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `check:route-guard-membership`    | દરેક રૂટ કે જે બાળક પ્રક્રિયાને જન્મ આપે છે તે `isLocalOnlyPath()` (હાર્ડ રૂલ્સ #15/#17) દ્વારા વર્ગીકૃત કરવામાં આવે છે.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                      |
| `check:test-discovery`            | રેપોમાં દરેક `*.test.ts` / `*.spec.ts` ફાઇલ ઓછામાં ઓછા એક ટેસ્ટ રનર દ્વારા એકત્રિત કરવામાં આવે છે (રેચેટ: `test-discovery-baseline.json` માં અનાથ સૂચિ ફક્ત સંકોચાઈ શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | હા                                      |
| `check:test-tla-order`            | `tests/unit` હેઠળની કોઈ `node:test` ફાઇલ ટેસ્ટ રજીસ્ટર કરતી નથી, ટોપ-લેવલ `await` ને હિટ કરે છે, પછી વધુ નોંધણી કરે છે (#18045; ratchet: `test-tla-order-allowlist.json` માત્ર સંકોચાઈ શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:agent-skills-sync`         | જનરેટ કરેલ એજન્ટ-કૌશલ્ય કલાકૃતિઓ તેમના સ્ત્રોત સૂચિ (કોઈ ડ્રિફ્ટ) સાથે મેળ ખાય છે. રીલીઝ મોડ દરેક કૌશલ્યને તપાસે છે; ફીચર PR (`pr` મોડ) ફક્ત તે જ કૌશલ્યોને તપાસે છે જેના જનરેટ કરેલ ટેક્સ્ટ તે — ને સંપાદિત કરે છે [જનરેટેડ ફાઈલો અને તારવેલી બેઝલાઈન](#generated-files-and-derived-baselines-written-at-release) જુઓ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | પ્રદાતા logos/assets રેકોર્ડ કરેલ ઉત્પત્તિ એન્ટ્રી ધરાવે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON રૂપરેખા ફાઇલો રેપો લિન્ટ નિયમોને પાર્સ અને સંતોષે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | ભૂલો વિનાTypeScript સંકલન (ફક્ત સલાહકારી ચેતવણીઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | હા                                      |
| `typecheck:noimplicit:core`       | સખત `noImplicitAny` — ફોરવર્ડ-લુકિંગ; ઘણી પૂર્વ-અસ્તિત્વમાં રહેલી કૉલ સાઇટ્સને હજુ પણ એનોટેશનની જરૂર છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **સલાહકાર** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` સ્કોપ ટુ `src/app/(dashboard)/**` (#7033) — `typecheck:core` ની ક્યુરેટેડ 27-ફાઇલની મંજૂરી સૂચિમાં કોઈપણ ડેશબોર્ડ TSX શામેલ નથી, અને `next build` ક્યારેય તેને ટાઇપ-ચેક કરતું નથી (`next.config.mjs` સેટ કરે છે `ignoreBuildErrors: true`), તેથી અનાથ-ઓળખકર્તા રીગ્રેસન ત્યાં (#6625/#6909CI. સ્થિર per-file/per-TS-code કાઉન્ટ બેઝલાઈન સામે તફાવત (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` જેવી જ વાસી-અમલીકરણ પેટર્ન) — બેઝલાઈન ગણતરીની બહાર માત્ર NEW ભૂલો ગેટને નિષ્ફળ કરે છે; જ્યારે પૂર્વ-અસ્તિત્વમાં રહેલી ભૂલને ઠીક કરવામાં આવે ત્યારે `--update` સાથે રેચેટ ડાઉન કરો.                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), સપાટી `typecheck:core` ની 27-ફાઇલની અનુમતિ સૂચિ અને ડેશબોર્ડ ગેટ પર સંપૂર્ણ-એપ ઉત્પાદન પ્રકાર તપાસો અને ડેશબોર્ડ ગેટ આવરી લેતા નથી. `config/quality/build-typecheck-baseline.json` સામે તફાવત; નવી અથવા વધેલી પ્રતિ-(ફાઇલ, કોડ) ગણતરી નિષ્ફળ જાય છે, ઓછી ગણતરી તમને રેચેટ કરવાનું કહે છે. `--update` એ ઇનકાર કરે છે જ્યારે રનમાં નવી અથવા ઉભી કરેલી જોડી હોય છે સિવાય કે `--force-regressions` પસાર થાય છે, અને જ્યાં સુધી `--force-nocheck` પસાર ન થાય ત્યાં સુધી નવી સાયલન્સ ફાઇલનો ઇનકાર કરે છે, તેથી લીલો મેળવવા માટે બેઝલાઇનને પહોળી કરવી અને કાયમી મૌન આપવી એ બે અલગ-અલગ ઇરાદાપૂર્વકના કાર્યો છે. એકદમ `--force` નકારવામાં આવે છે. `config/quality/ts-nocheck-baseline.json` સામે `@ts-nocheck` માટે બિલ્ડ સ્કોપ પણ સ્કેન કરે છે, કારણ કે તેનો ઉપયોગ કરતી ફાઇલ કોઈ ડાયગ્નોસ્ટિક્સની જાણ કરતી નથી અને અન્યથા દરેક ગેટ માટે અદ્રશ્ય હશે. | હા                                      |

#### બે ટાઇપચેક પ્રોગ્રામ અલગ રીતે જવાબ આપે છે

`typecheck:core` અને `check:build-typecheck` અલગ-અલગ વિકલ્પો હેઠળ અલગ-અલગ પ્રોગ્રામ્સ કમ્પાઈલ કરે છે, અને એક જ ફાઈલ એકમાં ક્લીન અને બીજીમાં ભૂલોથી ભરેલી હોઈ શકે છે.

`tsconfig.build.json` `"strict": false` સેટ કરે છે, તેથી `noImplicitAny` બંધ છે. મુખ્ય રૂપરેખા સખત વિકલ્પો સાથે ક્યુરેટેડ 27-ફાઇલની મંજૂરી સૂચિનું સંકલન કરે છે અને દરેક એન્ટ્રીના આયાત ગ્રાફને અનુસરે છે, તેથી બિલ્ડ પ્રોગ્રામમાં ક્યારેય દેખાતી નથી તેવી ફાઇલો હજુ પણ ત્યાં તપાસવામાં આવે છે.

ફાઇલ ટાઇપ કરવામાં આવી છે કે કેમ તે નક્કી કરતી વખતે પરિણામ મહત્વપૂર્ણ છે:** `check:build-typecheck` હેઠળ શૂન્ય ડાયગ્નોસ્ટિક્સનો અર્થ શૂન્ય નથી** . 26 ફાઈલોમાંથી `@ts-nocheck` કાઢી નાખવાથી તેમાંથી 23 બિલ્ડ પ્રોગ્રામમાં સ્વચ્છ દેખાઈ; તેમાંથી સોળમાં લગભગ 120 ગર્ભિત-કડકમાં કોઈપણ ભૂલો સામે આવી. ફાઇલને ક્લીન કરતા પહેલા બંને તપાસો.

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
| `check:compression-budget`   | કમ્પ્રેશન બેન્ચમાર્ક બજેટ — પ્રતિ-એન્જિન ટોકન-બચત માળખું રીગ્રેસ થવું જોઈએ નહીં                                                                             | હા                     |
| `check:type-coverage`        | ટકા-ટાઈપ કરેલ રેચેટ (`type-coverage`) રીગ્રેસ થતું નથી; મોટે ભાગે `typecheck:noimplicit:core` સબસ્યુમ કરે છે                                                | હા                     |
| `check:codeql-ratchet`       | ઓપન CodeQL એલર્ટ કાઉન્ટ રીગ્રેસ થતું નથી ( `gh api` દ્વારા વાંચે છે; ટોકન વગર ગ્રેસફુલ-સ્કિપ) — રિફ્રેશ કેડન્સ અને મેન્યુઅલ ટ્રિગર: નીચે "CodeQL રેચેટ" જુઓ | હા                     |
| `check:type-scale-ratchet`   | કિટ પ્રકાર સ્કેલ: 12 px હેઠળના કદ અને `src/` માં `font-bold` માત્ર નીચે જાય છે (`typeScaleSubFloorSizes`, `typeScaleFontBold`); પ્રી-કમિટ હૂકમાં પણ         | હા                     |

### જોબ: `quality-extended`

મિશ્ર જોબ, કોઈ જોબ-લેવલ `continue-on-error` વગર : એક પગલું જે `--ratchet` પસાર કરે છે તે માપેલ રીગ્રેશન વિ `quality-baseline.json` પર કામને નિષ્ફળ કરે છે. ફક્ત `check:circular-deps` અને સ્કેનર ઇન્સ્ટોલ પગલું સલાહકારી છે (સ્ટેપ-લેવલ `continue-on-error: true`). બાહ્ય સ્કેનર્સ `gh release download` દ્વારા ઇન્સ્ટોલ કરે છે; જ્યારે gitleaks ગેરહાજર હોય ત્યારે `check:secrets` સેલ્ફ-સ્કીપ્સ (એક્ઝિટ 0), જ્યારે `check:vuln-ratchet`, `check:workflows` અને `check:openapi-breaking` ફેલ બંધ થાય છે જ્યારે તેમનું માપ ખૂટે છે.

| સ્ક્રિપ્ટ                | માન્ય કરે છે                                                                                                                                                                                             | બ્લોકીંગ                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:circular-deps`    | કોઈ પરિપત્ર અવલંબન નથી (dpdm)                                                                                                                                                                            | **સલાહકાર**                             |
| `check:bundle-size`      | બંડલનું કદ કેપ કરતાં વધી જતું નથી; માપી ન શકાય તેવું કદ પણ નિષ્ફળ જાય છે                                                                                                                                 | **--ratchet સાથે અવરોધિત કરવું**        |
| `check:secrets`          | જો બાઈનરી ગેરહાજર હોય તો સિક્રેટ સ્કેનિંગ (gitleaks) — સ્કીપ્સ                                                                                                                                           | **--ratchet સાથે અવરોધિત કરવું**        |
| `check:vuln-ratchet`     | નિર્ભરતા નબળાઈઓ (ઓએસવી-સ્કેનર) જો માપી ન હોય તો — `--ratchet` INCOMPLETE જાય છે (એક્ઝિટ 2)                                                                                                               | **--ratchet સાથે અવરોધિત કરવું**        |
| `check:workflows`        | વર્કફ્લો લિન્ટ (એક્શનલિન્ટ + ઝિઝમોર); missing/broken સ્કેનર્સ, અમાન્ય અહેવાલો અથવા ગુમ થયેલ રેચેટ બેઝલાઇન INCOMPLETE તરીકે નિષ્ફળ જાય છે. માન્ય તારણો પસંદ કરેલ strict/advisory/ratchet નીતિને અનુસરે છે | અમલ જરૂરી; CI માં ઝિઝમોર રેચેટ બ્લોકિંગ |
| `check:openapi-breaking` | પિન કરેલ ઇવેન્ટ કમિટ્સ સામે જાહેર API કરાર (PR મર્જ-બેઝ, પુશ પહેલા, મર્જ-ગ્રુપ બેઝ; scheduled/manual ચેકઆઉટ ફર્સ્ટ પેરેન્ટ); જરૂરી માપન નિષ્ફળ જાય છે                                                    | **--ratchet સાથે અવરોધિત કરવું**        |

### જોબ: `docs-sync-strict`

દરેક PR થી `main` પર ચાલે છે. બ્લોક્સ નિષ્ફળતા પર મર્જ કરે છે.

| સ્ક્રિપ્ટ                      | માન્ય કરે છે                                                                                                                                             | બ્લોકીંગ                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | મેટા-ગેટ જે અનુક્રમે નીચેના 6 પેટા-ગેટ ચલાવે છે                                                                                                          | હા                             |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI સંસ્કરણ સુસંગતતા; રિલીઝ મોડ પણ 66 `llm.txt` મિરર્સ અને અનુવાદિત CHANGELOG વિભાગો (PR મોડ: મિરર્સ સંમત છે)                            | હા                             |
| ↳ `check:docs-counts`          | ગદ્યમાં ગણતરીઓ (પ્રદાતાની સંખ્યા, સ્થળાંતર ગણતરી, વગેરે). બે સ્થિતિઓ: લક્ષણ PRs પર `pr`, `release` અન્યત્ર — નીચે "ઉત્પન્ન મૂલ્યો" જુઓ                   | હા                             |
| ↳ `check:env-doc-sync`         | `.env.example` માં દરેક env var દસ્તાવેજ કોષ્ટકમાં દસ્તાવેજીકૃત થયેલ છે, અને ઊલટું                                                                       | હા                             |
| ↳ `check:deprecated-versions`  | દસ્તાવેજમાં કોઈ નાપસંદ સંસ્કરણ સ્ટ્રિંગ્સ નથી                                                                                                            | હા                             |
| ↳ `check:doc-links`            | ડૉક્સમાં આંતરિક માર્કડાઉન લિંક્સ વાસ્તવિક ફાઇલો (`[text]`/`(path)` ફોર્મ) સાથે ઉકેલે છે                                                                  | હા                             |
| ↳ `check:fabricated-docs`      | રૂટ્સ, env vars, CLI આદેશો, હૂક નામો, અને દસ્તાવેજમાં દર્શાવેલ ફાઇલ પાથ કોડબેઝમાં અસ્તિત્વ ધરાવે છે. `--strict` દ્વારા સખત દરવાજો; ધ્વજ વિના નરમ-નિષ્ફળ. | હા ( CI માં `--strict` દ્વારા) |
| `check:cli-i18n`               | CLI `t()` કીઓ `bin/cli/locales/en.json` (બંને મોડ) માં અસ્તિત્વમાં છે; માત્ર રિલીઝ મોડમાં `en.json` સાથે pt-BR/zh-CN/zh-TW પેરિટી                        | હા                             |
| `check:openapi-coverage`       | OpenAPI સ્પેક વાસ્તવિક રૂટના ઓછામાં ઓછા એક રેચેટેડ ફ્લોરને આવરી લે છે                                                                                    | હા                             |
| `check:openapi-security-tiers` | `openapi.yaml` માં સુરક્ષા સ્તરની ટીકાઓ `routeGuard.ts` વર્ગીકરણ સાથે સુસંગત છે                                                                          | **સલાહકાર**                    |
| `check:openapi-routes`         | `openapi.yaml` માં દરેક માર્ગ વાસ્તવિક `route.ts` (વિરોધી આભાસ) તરફ સંકલ્પ કરે છે                                                                        | હા                             |
| `check:docs-symbols`           | `docs/**/*.md` માં દરેક `/api/...` સંદર્ભ વાસ્તવિક `route.ts` (વિરોધી આભાસ) માટે ઉકેલે છે                                                                | હા                             |
| `i18n translation drift`       | `docs/i18n/**` મિરર્સ વિ `.i18n-state.json` — સલાહકાર PRs પર (અરીસા અનુવાદ તરંગ દ્વારા તાજું થાય છે), દબાણ પર કડક અને રાત્રિના સમયે                      | **સલાહકાર** PRs પર             |

#### ટ્રાન્સલેશન મિરર્સ વ્યુત્પન્ન ફાઇલો છે (PR મોડ વિ રિલીઝ મોડ)

એક લક્ષણ PR માત્ર અંગ્રેજી સ્ત્રોતોને સંપાદિત કરે છે. `docs/i18n/<locale>/**` મિરર્સ (66 `llm.txt` નકલો અને અનુવાદિત `CHANGELOG.md` ફાઇલો સહિત) અને `.i18n-state.json` અનુવાદ તરંગ (`docs/i18n-*` / `chore/i18n-*` શાખાઓ, સુનિશ્ચિત `i18n-mirror-refresh.yml`) અને પ્રકાશન (`npm run release:sync-changelog-i18n`) દ્વારા એક પગલામાં ફરીથી લખવામાં આવે છે. તેથી મિરર ગેટ્સ બે મોડમાં ચાલે છે, જે `scripts/check/lib/gateMode.mjs` દ્વારા ઉકેલાય છે (`--mode=pr|release`, પછી `OMNIROUTE_GATE_MODE`, પછી એક્શન ઇવેન્ટ; સ્થાનિક રન `release` છે):

- `check:docs-sync` — release mode runs every check. PR mode keeps the package.json/OpenAPI version, the root CHANGELOG headings and the superseded-docs guard, and prints `SKIP reason=pr-mode` for the `llm.txt` mirror copies and the translated CHANGELOG sections — unless the PR writes mirrors: a head branch declared as a writer of the `docs/i18n/**` family in `config/quality/derived-paths/*.json` runs both checks strictly, and, when the diff base resolves, a change whose own diff edits `docs/i18n/<locale>/llm.txt` or `CHANGELOG.md` runs that check strictly. The diff base does not resolve in a depth-1 checkout (the `docs-sync-strict` job), so PR mode also runs one check that needs no base: every `llm.txt` mirror must exist, keep its `---` separator and carry either the root body or the body most mirrors share. A base that moved leaves all mirrors equally stale and passes; a hand edit to one mirror fails. The translated `CHANGELOG.md` files have no such check in a depth-1 PR checkout.
- પ્રી-કમિટ હૂક `check-docs-sync.mjs --mode=pr` ચલાવે છે: કમિટ શું કરે છે તેના આધારે નક્કી કરવામાં આવે છે. ફ્લેગ વિના લોકલ રન એ રીલીઝ મોડ છે, અને એક મર્જ કરેલ PR કે જે રૂટ `llm.txt` ને સંપાદિત કરે છે તે દરેક પછીના કમિટને તે આધાર પર અવરોધિત કરશે જ્યાં સુધી વેવ ચાલી ન જાય. હસ્કી હૂક ચાલે છે તે કોઈપણ મોડ-અવેર ગેટ માટે સમાન નિયમ ધરાવે છે: હૂક `--mode=pr` પસાર કરે છે, અને કડક ચુકાદો રિલીઝ-મોડ રન સાથે રહે છે (રિલીઝ PR, `main` પર દબાણ કરે છે, એક સાદા સ્થાનિક રન).
- મિરર-સામગ્રી એકમ પરીક્ષણો (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — રીલીઝ મોડ દરેક લોકેલ પર ભાર મૂકે છે. PR મોડ `.i18n-state.json` (સંપૂર્ણ-ફાઇલ હેશ, અથવા ટેસ્ટ પિન વિભાગના રેકોર્ડ કરેલ સેક્શન હેશ) અનુસાર અંગ્રેજી સ્ત્રોત સાથે વર્તમાનમાં હોય તેવા અરીસાઓ પર જ ભાર મૂકે છે અને વાસી મુદ્દાઓને કારણ સાથે છોડી દે છે. `target_hash` પ્રોવેનન્સ ચેક બંને મોડમાં દરેક લોકેલ માટે ચાલે છે. તાજગી `## ` વિભાગ દીઠ છે, એકમ `run-translation.mjs` હેશ; એક લાંબો વિભાગ (આ ફાઈલની ગેટ ઈન્વેન્ટરી લગભગ અડધી છે) એટલે કે તેમાં કોઈપણ સંપાદન તે અરીસાઓને વાસી છોડી દે છે, અને તેમના PR-મોડના નિવેદનો આગામી તરંગ સુધી અવગણવામાં આવે છે. એક એન્કર જે અંગ્રેજી સ્ત્રોતમાં હવે સમાવિષ્ટ નથી તે સંપૂર્ણ-ફાઈલની તુલનામાં પાછો આવે છે.
- `i18n translation drift` — એડવાઈઝરી PRs પર, પુશ પર કડક, નાઈટલી અને રિલીઝ કટ, તેથી વાસી અરીસો રિલીઝમાં મોકલી શકાતો નથી.

`scripts/i18n/sync-llm-mirrors.mjs` ( `syncLlmMirrors()` તરીકે પણ નિકાસ થાય છે, `--dry-run` સાથે) `llm.txt` મિરર્સને ફરીથી લખે છે; રીલીઝ રીફ્રેશ, ટ્રાન્સલેશન વેવ અને શેડ્યુલ કરેલ `i18n-mirror-refresh.yml` તેને ચલાવે છે (રીફ્રેશ વાસી `llm.txt` મિરર્સને ડ્રાય રન સાથે શોધી કાઢે છે, કારણ કે ડ્રિફ્ટ રિપોર્ટ તેમને સૂચિબદ્ધ કરતું નથી, અને `check:docs-all` પહેલાં તેમને સમન્વયિત કરે છે).

`docs/diagrams/` હેઠળ બાર README SVGs જનરેટ થાય છે (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` તે બધાને ફરીથી બનાવે છે). દરેક પાસે બાઈટ-સરખામણી યુનિટ ટેસ્ટ (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) હોય છે જે જ્યારે પ્રતિબદ્ધ ફાઇલ રીલીઝ મોડમાં વાસી હોય ત્યારે નિષ્ફળ જાય છે; PR માં, `check:generated-artifacts` એ SVG PR સંપાદનોનો ન્યાય કરે છે અને બેઝના ડ્રિફ્ટને રિલીઝ રિફ્રેશ કરવા માટે છોડી દેવામાં આવે છે (જુઓ [જનરેટેડ ફાઇલો અને વ્યુત્પન્ન બેઝલાઇન્સ](#generated-files-and-derived-baselines-written-at-release) ) — અને `check:docs-counts` તેમના `<text>` નોડ્સ — માંથી પ્રમાણભૂત નંબરો વાંચે છે તેથી જ આઉટલાઇનિંગ stqp ફાઇલમાં દરેક સ્ટેપમાં આઉટલાઇનિંગ `<text>` આઉટલાઈન રાખે છે. SVG પ્રમાણભૂત-નંબર ચેક `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, વત્તા `public/images/tier-flow-dark.svg` અને `tier-flow-light.svg` માં સૂચિબદ્ધ ફાઇલોને વાંચે છે; ફ્રી-એવર, કૅટેલોગ-એન્ટ્રી, રિકરિંગ-પૂલ અને સ્કોરિંગ-ફેક્ટર્સ ક્લેમ પણ `promise-pillars.svg`, `free-tier-budget.svg` અને `strategies-grid.svg` વાંચે છે. આ જનરેટરો જે ગણતરીઓ દોરે છે (પ્રદાતા કુલ, MCP ટૂલ્સ, રૂટીંગ વ્યૂહરચના, ફ્રી-એવર પ્રદાતાઓ, …) `scripts/docs/readmeFacts.mjs` દ્વારા ફેક્ટ્સ સ્નેપશોટ `docs/reference/derived-facts.json` માંથી આવે છે, શાબ્દિક માંથી નહીં, તેથી કોઈપણ શાખા પર ડાયાગ્રામને ફરીથી બનાવવું પ્રતિબદ્ધ ફાઇલનું પુનઃઉત્પાદન કરે છે. `free-tier-budget.svg` એ જ સ્નેપશોટમાંથી તેની પંક્તિઓ દોરે છે (`code.freeTierBudget`, કેટલોગ સારાંશ ફેક્ટ્સ પ્રોબ રેકોર્ડ્સ), તેથી `FREE_MODEL_BUDGETS` માં ફેરફાર CI લાલ થવાને બદલે આગલા રિફ્રેશ સમયે કાર્ડ સુધી પહોંચે છે.

### વ્યુત્પન્ન મૂલ્યો: `pr` અને `release` ગેટ મોડ્સ

એક લક્ષણ PR ક્યારેય એવું મૂલ્ય લખતું નથી કે જે તેના આધારની સ્થિતિ પર આધારિત હોય: પ્રદાતા, સ્થળાંતર, MCP-ટૂલ અને વ્યૂહરચના ગણતરીઓ, README SVG નંબર્સ, ફેક્ટ્સ સ્નેપશોટ. એક પગલું તે બધાની પુનઃગણતરી કરે છે, `npm run release:refresh-derived`, પ્રકાશન દ્વારા ચલાવવામાં આવે છે અને રાત્રિના સમયે મેળવેલા-રિફ્રેશ PR દ્વારા. તેથી** પ્રકાશનો વચ્ચે આધાર ડિઝાઇન દ્વારા લાઇવ કોડની પાછળ છે** , અને એક ગેટ અથવા ટેસ્ટ કે જે લાઇવ કોડ સાથે વૃક્ષની તુલના કરે છે તે દરેક PR પર પ્રદાતા ઉમેર્યા પછી લાલ હશે. તેથી તારવેલા મૂલ્યોને જજ કરતા દરવાજા બેમાંથી એક મોડમાં ચાલે છે, જે `scripts/check/lib/gateMode.mjs` (પ્રથમ મેચ જીત) દ્વારા ઉકેલાય છે:

1. આદેશ વાક્ય પર `--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` પર્યાવરણ ચલ (`pr` અથવા `release`);
3. ઓટોમેટિક, GitHub એક્શન ઇવેન્ટમાંથી: એક `pull_request` કે જેનું માથું `release/v*` નથી , `merge_group`, અથવા `omni-queue/**` → `pr` પર દબાણ ; બાકીનું બધું (પુશ, શેડ્યૂલ, ડિસ્પેચ, રિલીઝ PR `release/v* → main`, કોઈપણ સ્થાનિક રન) → `release`.

દરેક મોડમાં શું `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) નિષ્ફળ જાય છે:

| મોડ       | નિષ્ફળ જાય છે                                                                                                                                                                                                                                                                                                                                                                                                     | જીવંત તથ્યોની જરૂર છે |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `release` | દરેક ચેક, વૃક્ષમાંથી એકત્રિત કરાયેલી હકીકતો સામે કડક સમાનતા (ગેટ હંમેશા રહેતું વર્તન): વાસી ગણતરી, સંસ્કરણ, કવરેજ ફ્લોર અથવા SVG નંબર એ STRICT ડ્રિફ્ટ છે                                                                                                                                                                                                                                                         | હા                    |
| `pr`      | માત્ર જે ફેરફાર કર્યો હતો તે જ દાવા એક્સ્ટ્રાક્ટર્સ સાથે PR બેઝ સામે તફાવત હતો: (1) એક વ્યવસ્થાપિત મૂલ્ય કે જે તે ચેક અને ફાઇલ માટેના આધારમાં અસ્તિત્વમાં ન હતું ("PR એ મેનેજ કરેલ નંબર — બેઝ ટેક્સ્ટમાં પુનઃસ્થાપિત કર્યો"); (2) એક આવશ્યક દાવો આધાર લઈ ગયો અને માથું ખોવાઈ ગયું. કન્ટેન્ટ ઇન્વેરિઅન્ટ્સ કે જેને કોઈ તથ્યોની જરૂર નથી તે રિલીઝ મોડમાં ચાલે છે; રીલીઝ-ઓન્લી ચેક્સ સૂચિબદ્ધ છે અને છોડવામાં આવે છે | ના                    |

એજન્ટ-સૂચના ફાઇલો વહન કરે છે** ના** વ્યુત્પન્ન ગણતરી બિલકુલ: `AGENTS.md`, `llm.txt` (અને તેની `docs/i18n/*/llm.txt` નકલો), bs `AGENTS.md` ફોર્ક, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` અને દરેક `skills/*/SKILL.md` સ્ત્રોત તરફ નિર્દેશ કરે છે (ઉદાહરણ તરીકે `src/shared/constants/routingStrategies.ts` માં `ROUTING_STRATEGY_VALUES` ) અને તેના બદલે `npm run facts`. અપરિવર્તક "કોઈ વ્યુત્પન્ન ગણતરીઓ (એજન્ટ-સૂચના ફાઇલ …)" ત્યાં ગણતરીમાં નિષ્ફળ જાય છે (પ્રદાતાઓ, સ્થળાંતર, MCP ટૂલ્સ અને સ્કોપ્સ, રૂટીંગ વ્યૂહરચનાઓ, સ્કોરિંગ પરિબળો, મોડ પેક) બંને સ્થિતિઓમાં, તેથી રિલીઝ રિફ્રેશને ક્યારેય સૂચના ફાઇલને ફરીથી લખવાની જરૂર નથી.

`pr` મોડમાં લેખક શાખાઓ સંચાલિત મૂલ્યોને સંપાદિત કરી શકે છે: `chore/derived-*` (રાઇટલી રિફ્રેશ PR), `release/v*`, અને અનુવાદ તરંગો `docs/i18n-*` અને `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). કતાર બૅચેસ (`merge_group`, મર્જિફાઇ ડ્રાફ્ટ્સ, `omni-queue/**`) ને ફરીથી નક્કી કરવામાં આવતાં નથી: તેઓ એક પછી એક પહેલાથી જ નક્કી કરેલા ગેટનો PRs કરે છે.

Exit codes: `0` clean · `1` STRICT drift (or soft drift with `--strict`) or a managed-value violation · `2` infrastructure — the code facts could not be collected (the tsx probe failed or timed out; the timeout is `OMNIROUTE_FACTS_TIMEOUT_MS`, default 600000 ms) or, in CI, the PR diff base could not be resolved. An exit 2 is never a documentation divergence: re-run the job or fix the environment.

જ્યાં દરેક મોડ ચાલે છે:

| જ્યાં                                                                                                | મોડ                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| લક્ષણ PR — `ci.yml` જોબ `docs-sync-strict`, `quality.yml` પગલું "દસ્તાવેજ ચોકસાઈ"                    | `pr` (ઓટોમેટિક); જોબ આધારને `BASE_SHA` તરીકે પાસ કરે છે અને `fetch-depth: 2` સાથે ચેક આઉટ કરે છે                                                                                                     |
| `merge_group`, `omni-queue/**` ઉમેદવારો, મર્જ ટ્રેનની સંપૂર્ણ ગેટ સૂચિ                               | `pr`                                                                                                                                                                                                 |
| PR (`release/v* → main`), પુશ, સુનિશ્ચિત અને મેન્યુઅલ રન રિલીઝ કરો                                   | `release`                                                                                                                                                                                            |
| રિલીઝ-ગ્રીન (`scripts/quality/validate-release-green.mjs`)                                           | HARD વસ્તુઓ `OMNIROUTE_GATE_MODE=pr` સાથે ચાલે છે ("શું આધાર તૂટી ગયો?"); DRIFT આઇટમ `derived-refresh` `npm run release:refresh-derived -- --check` ચલાવે છે (કડક દૃશ્ય, ક્યારેય બેઝ-રેડ ખોલતું નથી) |
| રિલીઝ (`/generate-release` તબક્કાઓ 0a અને 1; કૌશલ્ય વાયરિંગ એ અલગ માલિક દ્વારા મંજૂર થયેલ ફેરફાર છે) | `npm run release:refresh-derived` વ્યુત્પન્ન ફાઇલો લખે છે; રિલીઝ PR ના પોતાના ચેક પછી `release` મોડમાં ચાલે છે                                                                                       |
| `nightly-derived-refresh.yml` (દૈનિક, સૌથી વધુ `release/vX.Y.Z`, રિલીઝ-ફ્રીઝ હેઠળ છોડવામાં આવે છે)   | `npm run release:refresh-derived -- --profile=nightly`; તફાવત પર તે `chore/derived-refresh` થી ONE PR ખુલ્લું રાખે છે; ક્યારેય મર્જ થતું નથી                                                         |

તેની પાછળના આદેશો:

- `npm run facts` દરેક વ્યુત્પન્ન સંખ્યાને JSON (`scripts/release/facts.mjs`) તરીકે છાપે છે. `--key=code.mcpTools` એક મૂલ્ય છાપે છે, `--snapshot` જીવંત વૃક્ષને બદલે પ્રતિબદ્ધ સ્નેપશોટ વાંચે છે. જ્યારે હકીકતો એકત્રિત કરી શકાતી નથી ત્યારે 2 થી બહાર નીકળો.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) recomputes the derived files in one pass, in this order (step ids for `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (the snapshot), `numbers` (the counts gate's rewrite plan applied to the docs, then carried to their `docs/i18n/` mirrors), `readme-diagrams`, `skills` (generated `SKILL.md`), `e2e-timings` (skipped until the tree ships `syncE2eTimings`), `ui-keys` (prunes keys `en.json` dropped and, with `--rewritten-since=<ref>` — default `origin/main` — re-queues English values rewritten since the last release), `llm-mirrors` and `verify-generated` (after a write, `check:generated-artifacts` and `check:agent-skills-sync` in release mode must pass; skipped in `--check` and when `--only` leaves it out; a failure is exit 2). The `changelog` step is opt-in (`--with-changelog`, release profile only). `--profile=nightly` never touches a version claim. With `-- --check` it writes nothing and exits 1 when any file would change or a managed value needs a manual edit (listing both); exit 2 on an infrastructure failure. `--json` prints the result as JSON.
- `docs/reference/derived-facts.json` એ હકીકતનો સ્નેપશોટ છે જેનો ઉપયોગ છેલ્લે રીફ્રેશ કરવામાં આવ્યો હતો. રિફ્રેશ જ તેને લખે છે. README SVG જનરેટર તેને વાંચે છે, અને PR-ટાઇમ યુનિટ પરીક્ષણો પ્રતિબદ્ધ દસ્તાવેજો અને જનરેટ કરેલી ફાઇલોની તેની સાથે — ક્યારેય લાઇવ કોડ સાથે સરખામણી કરે છે. સ્યુટની સિંગલ લાઇવ સરખામણી `tests/unit/check-docs-counts-sync.test.ts` માં "રીલીઝ રીફ્રેશ ક્લોઝ ધ સાયકલ" છે: જીવંત તથ્યો સાથે, મેમરીમાં લાગુ કરાયેલ રીફ્રેશની પુનઃલેખન યોજના કોઈ STRICT ડ્રિફ્ટ છોડતી નથી જે તે જાણ કરતું નથી, અને પુનઃ આયોજન કંઈપણ બદલતું નથી.

સ્થાનિક રીતે પુનઃઉત્પાદન કરવા માટે ( `release` માટે સ્થાનિક રન ડિફોલ્ટ છે):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

ઉકેલી શકાય તેવા આધાર વિના (કોઈ `BASE_SHA`/`BASE_REF`, કોઈ સ્થાનિક `origin/release/v<version>` નથી) સ્થાનિક `pr` રન ચેતવણી છાપે છે અને નિષ્ફળ થવાને બદલે તફાવતને છોડી દે છે.

### જોબ: `i18n-ui-coverage`

| સ્ક્રિપ્ટ                         | માન્ય કરે છે                                                                                                                                                                  | બ્લોકીંગ              |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `check-ui-keys-coverage` (ઇનલાઇન) | UI i18n કી કવરેજ ≥ 65% છે                                                                                                                                                     | હા (બંને સ્થિતિઓ)     |
| `check:ui-icu`                    | દરેક UI કેટલોગનો દરેક સંદેશ `IntlMessageFormat` સાથે સંકલિત થાય છે                                                                                                            | હા (બંને સ્થિતિઓ)     |
| `check-ui-value-drift` (ઇનલાઇન)   | પુનઃલેખિત અંગ્રેજી** મૂલ્ય** કોઈ વાસી અનુવાદ પાછળ છોડતો નથી                                                                                                                   | હા (ફક્ત પ્રકાશન મોડ) |
| `check-new-key-coverage` (ઇનલાઇન) | એ** નવું** અંગ્રેજી કી દરેક લોકેલમાં અનુવાદિત થાય છે — અને `__MISSING__:` માર્કર નકારવામાં આવે છે                                                                             | હા (ફક્ત પ્રકાશન મોડ) |
| `check-key-completeness` (ઇનલાઇન) | દરેક UI કૅટેલોગ (અને, `--catalog=cli` સાથે, દરેક CLI કૅટેલોગ) તેના `en.json` ના કી સમૂહને બરાબર વહન કરે છે; `pr` મોડમાં, દરેક કેટલોગ PR મર્જ બેઝ પર પોતાની સામે બદલાઈ જાય છે  | હા (બંને સ્થિતિઓ)     |
| `check-translation-ratio`         | લોકેલ દીઠ વાસ્તવિક-અનુવાદ ગુણોત્તર (સમાન-થી-અંગ્રેજી / પ્લેસહોલ્ડર / મંજૂર સૂચિની બહાર ખૂટે છે) `config/quality/i18n-translation-baseline.json` + સ્લૅક કરતાં વધુ ન હોવો જોઈએ | હા (ફક્ત પ્રકાશન મોડ) |

મર્જ બેઝ સામે વેલ્યુ-ડ્રિફ્ટ ગેટ `fetch-depth: 0` — `en.json` જરૂર છે.

**બે મોડ્સ (2026-11-13 થી).** એક લક્ષણ PR `en.json` (અને `bin/cli/locales/en.json`) માં કી ઉમેરે છે અથવા ફરીથી લખે છે અને અન્ય કોઈ લોકેલને સ્પર્શતું નથી; `check:pr-derived-paths` (job `pr-test-policy`, family `config/quality/derived-paths/translation.json`) PR જે કરે છે તે સુવિધાને નિષ્ફળ કરે છે. અન્ય લોકેલ્સ `release:refresh-derived` દ્વારા એક વાર રીલીઝમાં પૂર્ણ થાય છે, જે `scripts/i18n/sync-ui-keys.mjs` માં `syncUiKeys()` કહે છે (ખુટતી ચાવીઓ ઉમેરો, છોડેલી ચાવીઓ, પુનઃલેખિત અંગ્રેજીના અનુવાદોને `rewrittenSinceRef` સાથે ચિહ્નિત કરો, અનુવાદ કરો), અથવા અનુવાદ તરંગ દ્વારા. ગેટ્સ `scripts/check/lib/gateMode.mjs` થી મોડ વાંચે છે: `pr` મોડમાં ( ફિચર PRs, `merge_group`, `omni-queue/**`) `SKIP reason=pr-mode` અને બહાર નીકળો 0 ઉપરના રિલીઝ-મોડ ગેટ્સ; `release` મોડમાં (રીલીઝ PR, `main`, `workflow_dispatch`, લોકલ રન પર દબાણ કરે છે) તેઓ પહેલાની જેમ કડક હોય છે, અને રિલીઝ PR પર ડિફ-અવેરને `BASE_REF=origin/main` મળે છે, તેથી તેઓ દરેક કીને ઉમેરે છે અથવા ફરીથી લખે છે તેનું મૂલ્યાંકન કરે છે. `--mode=pr` સાથે સ્થાનિક રીતે સુવિધા-PR ચુકાદાનું પૂર્વાવલોકન કરો.

એક PR કે જે હજુ પણ `pr` મોડમાં લોકેલ કેટલોગને બદલે છે (એક અનુવાદ તરંગ, રીલીઝ રીફ્રેશ, અનુવાદ-માત્ર ફિક્સ) છોડવામાં આવતું નથી: `check-key-completeness` મર્જ બેઝ (`scripts/i18n/lib/touched-catalogs.mjs`) પર સમાન કેટલોગ સામે બદલાયેલ દરેક કેટલોગને ન્યાય આપે છે અને સૂચિ ખોવાઈ ગયેલી કી પર નિષ્ફળ જાય છે, કી `en.json` લખાણમાં ફેરવાય છે અથવા વાસ્તવિક અનુવાદમાં `__MISSING__:` અથવા માર્કરનો અભાવ છે. એક મૂલ્ય કે જે અંગ્રેજી શબ્દમાળાના placeholders/tags હવે PR ને સ્પર્શતું નથી. PR માં નવા કૅટેલોગમાં આખો `en.json` કી સેટ હોવો જોઈએ. તે આવરી લે છે, કેટેલોગ માટે PR સ્પર્શે છે, ગુણોત્તર અને CLI-પેરિટી ગેટ્સ શું જોશે.

લોકેલ-પેરિટી એકમ પરીક્ષણો (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` દ્વારા સમાન મોડ્સને અનુસરે છે: `pr` મોડમાં તેઓ કી-પેરિટી નિવેદનોને છોડી દે છે અને રીલીઝ પર છોડે છે તે કીની પ્લેસહોલ્ડર પેરિટીને તાજું કરે છે જેની અંગ્રેજી મર્જ બેઝથી બદલાઈ ગઈ છે (દરેક કી જ્યારે તે એકમ વાંચી શકતી નથી ત્યારે જોબ ચેક કરી શકતી નથી). તે મદદગાર છે** માત્ર** મંજૂર મોડ-શરતી અવગણો: `check:test-masking` `.skip(` અને `{ skip: true }` ની ગણતરી કરે છે પરંતુ તે જે કમ્પ્યુટેડ `{ skip: "<reason>" }` આપે છે તેને નહીં, તેથી `tests/unit/locale-parity-mode.test.ts` તેનો ઉપયોગ કરવા માટે માન્ય પરીક્ષણોની સૂચિને પિન કરે છે — એ યાદીમાં એક રિવ્યુ કરેલ સંપાદન છે.

#### `check-ui-value-drift` — વાસી-અનુવાદ દ્વાર

એક i18n રીગ્રેસન કેચ કરે છે જે અન્ય દરવાજા માળખાકીય રીતે જોઈ શકતા નથી: અંગ્રેજી મૂલ્ય ફરીથી લખવામાં આવે છે અને _અગાઉના_ અંગ્રેજીમાંથી તારવેલા અનુવાદો પાછળ રહે છે, તેથી બિન-અંગ્રેજી વપરાશકર્તાઓ વિશ્વાસપૂર્વક-શબ્દવાળી, હવે-ખોટી નકલ વાંચતા રહે છે.

આ વાસ્તવિક માટે મોકલવામાં આવ્યું છે. જ્યારે Antigravity લૉગિન હેલ્પર ઉતર્યો ત્યારે `oauthModal.googleOAuthWarning` ફરીથી લખવામાં આવ્યું હતું (#5203);** 43 લોકેલમાંથી 39** ઑપરેટરોને "સંપૂર્ણ URL કૉપિ કરો અને તેને નીચે પેસ્ટ કરો" — લખાણ રાખ્યું કે જે તે પ્રદાતા માટે પૂર્ણ ન થઈ શકે. તે #8463 સુધી કોઈનું ધ્યાન ગયું ન હતું કારણ કે:

- `sync-ui-keys` ફક્ત બેકફિલ્સ કી છે જે છે** ગેરહાજર** , તે ક્યારેય નહીં** વાસી** ;
- `check-ui-keys-coverage` કી _હાજરી_ની ગણતરી કરે છે, તેથી વાસી અનુવાદ આવરી લેવામાં આવે છે;
- `check-translation-drift` `docs/i18n/<locale>/**.md` દસ્તાવેજીકરણ મિરર્સ — ને ટ્રેક કરે છે તે ક્યારેય `src/i18n/messages/*.json` વાંચતું નથી. તે જોબ `docs-sync-strict` માં ચાલે છે: PRs પર સલાહ, દબાણ પર કડક અને રાત્રે; અનુવાદ તરંગ અરીસાઓને તાજું કરે છે, PR લક્ષણને નહીં.

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

જ્યારે બેઝ કેટલોગ વાંચી શકાતો નથી ત્યારે `SKIP reason=base-unresolved` સાથે 0 થી બહાર નીકળે છે (બેઝ રેફ વગર છીછરા ક્લોન), મિરરિંગ `check-openapi-breaking`. ફક્ત રીલીઝ મોડ: એક લક્ષણ PR અંગ્રેજીને ફરીથી લખે છે અને ત્યાં અટકે છે; રીલીઝ રીફ્રેશ એ તેના પાછળના અનુવાદોને ચિહ્નિત કરે છે (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, સમાન `findStaleTranslations`).

### જોબ: `i18n`

સંપૂર્ણ i18n માન્યતા મેટ્રિક્સ (લોકેલ દીઠ એક જોબ). આખું કામ સલાહભર્યું છે.

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
| `nightly-llm-security` | promptfoo ઈન્જેક્શન ગાર્ડ (બ્લોક મોડ) + ગારક પ્રોબ્સ (પ્રોઇડર સિક્રેટ વિના છોડવામાં આવ્યું)                                                         | **સલાહકાર** |
| `nightly-schemathesis` | OpenAPI કોન્ટ્રાક્ટ ફઝિંગ (સ્કિમેથેસિસ) `docs/openapi.yaml` — સપાટી સ્પેક ઉલ્લંઘન / અનહેન્ડલ્ડ 500s (ફેઝ 8 B.4) નો ઉપયોગ કરીને જીવંત OmniRoute સામે | **સલાહકાર** |
| `nightly-mutation`     | સ્ટ્રાઈકર મ્યુટેશન-ટેસ્ટિંગ સ્કોર ઓવર ધ ફાસ્ટ યુનિટ લેન — સર્વાઈવિંગ મ્યુટન્ટ્સ સપાટીના નબળા દાવાઓ                                                  | **સલાહકાર** |
| `nightly-compat`       | સપોર્ટેડ `engines.node` રેન્જમાં નોડ એન્જિન સુસંગતતા મેટ્રિક્સ                                                                                      | **સલાહકાર** |

પર્ફોર્મન્સ બેઝલાઇન્સ (હીપ, TTFB, બિલ્ડ ટાઇમ) રેકોર્ડ કરવામાં આવે છે, ગેટેડ નથી: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) જુઓ.

---

## વેગ તબક્કો (2026-08-30 → v4.0 LTS): દરેક આધારરેખા 20% દ્વારા ઢીલી

માલિકનો નિર્ણય (2026-08-30): v4.0 મોડ્યુલરાઇઝેશન સુધી, શિપિંગ સ્પીડ ડેટ લાઇનને પકડી રાખવા કરતાં વધુ મહત્વ ધરાવે છે. દરેક** સંખ્યાત્મક** એક ઓડિટેબલ પાસમાં રેચેટ બેઝલાઇન 20% દ્વારા ઢીલી કરવામાં આવી હતી, અને તબક્કો `config/quality/quality-baseline.json` માં જાહેર કરવામાં આવ્યો છે:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| શું બદલાયું                                                                                                                                                                           | જ્યાં                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — લોઅર-ઇઝ-બેટર કાઉન્ટ્સ × 1.2, ઉચ્ચ-છે-વધુ સારી ટકાવારી ÷ 1.2 (કવરેજ ફ્લોર 60 રાખવામાં આવ્યો, `eslintErrors` સ્ટે 0, `eslintWarnings` 0 → 20% સ્થિર સપ્રેસન કાઉન્ટ) | `quality-baseline.json` (`_relax_velocity_2026_08_30` નોંધ દરેક પછી → પહેલાં યાદી આપે છે)              |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                      | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, દરેક `frozen[*]` / `testFrozen[*]` લાઇન કેપ × 1.2                                                                                                                   | `file-size-baseline.json`                                                                              |
| પ્રતિ-ફાઇલ / પ્રતિ-TS-કોડની ગણતરી × 1.2                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                   | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` સલાહકાર બને છે જ્યારે `_policy.requireTighten === false`                                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| રાત્રિના `bank-ratchet-shrinks` વિરામ (તે માપેલા સંકોચનને બેંક કરશે અને હેડરૂમને પૂર્વવત્ કરશે)                                                                                       | `.github/workflows/nightly-release-green.yml`                                                          |

મંજૂર સૂચિઓ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) છે** નથી** બજેટ અને સ્પર્શ કરવામાં આવ્યો ન હતો. Pass/fail પોલિસી ગેટ્સ (રહસ્યો, SQL નિયમો, docs/env કોન્ટ્રાક્ટ, i18n પેરિટી, યુનિટ ટેસ્ટ) યથાવત છે — એ રેડ ટેસ્ટ હજુ પણ રેડ ટેસ્ટ છે.

**ટૂલિંગ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ધ વન-શોટ છૂટછાટ (`scripts/quality/relax-baselines.mjs`); એક જ નોંધ સાથે બે વાર ચલાવવાનો ઇનકાર કરે છે.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — દરેક આંકડાકીય ગેટને CI જે રીતે માપે છે અને બાકીના હેડરૂમ પ્રતિ ગેટ (`scripts/quality/baseline-headroom.mjs`) છાપે છે. રાત્રિનું `baseline-headroom` જોબ વર્કફ્લો રન સારાંશમાં કોષ્ટક પ્રકાશિત કરે છે અને તેના JSON/Markdown રિપોર્ટને `baseline-headroom-<run_id>` તરીકે અપલોડ કરે છે, જે 90 દિવસ માટે જાળવી રાખવામાં આવે છે. ચેતવણી અને નિર્ણાયક પંક્તિઓ તેમની કેપના 10% ની અંદર અથવા તેની ઉપર પહેલાથી જ દરવાજાને ઓળખે છે. આ અહેવાલોની સમીક્ષા કરો જે બજેટના વપરાશ માટે પ્રારંભિક ચેતવણી તરીકે છે; વાંધાજનક ગેટની `_rebaseline_*` નોંધોની તપાસ કરો. જોબ હવે કાયમી સમસ્યાનું સર્જન કે અપડેટ કરતું નથી; #12149 અગાઉના અહેવાલ ઇતિહાસને સાચવે છે.

**2026-08-30 થી નવો-કોડ મોડ (ક્લીન-એઝ-યુ-કોડ) —, ફક્ત PR ફાસ્ટ-પાથ**

`pull_request` ઇવેન્ટ્સ પર `quality.yml` `--base-ref <PR base SHA>` ને `check:file-size`, `check:complexity-ratchets` અને `check:dead-code` માં પસાર કરે છે. `check:complexity-ratchets` અને `check:dead-code` માટે ગેટ HEAD મર્જ-બેઝ સાથે સરખાવે છે** PR જે ફાઈલોને સ્પર્શ કરે છે તે માટે પ્રતિબંધિત છે** (`scripts/check/newCodeMode.mjs`: મર્જ-બેઝ એક ફેંકી દેનારી `git worktree` માં સાકાર થાય છે, ESLint/knip ત્યાં ચાલે છે અને HEAD પર, પ્રતિ-ફાઇલ ગણતરીઓ અલગ પડે છે):

- **અવરોધિત** — ધ PR એ બદલાયેલ ફાઇલોમાં cyclomatic/cognitive ઉલ્લંઘન અથવા મૃત નિકાસ ઉમેર્યા છે (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` લોગમાં);
- **સલાહકાર** — વૈશ્વિક કુલ વિ. સ્થિર આધારરેખા. વારસાગત ડ્રિફ્ટ ક્યારેય નિર્દોષ PR ને લાલ કરતું નથી; રીલીઝ સમાધાન સમયે ડ્રિફ્ટ ફરીથી સ્થિર થાય છે અને હેડરૂમ જોબ દ્વારા જોવામાં આવે છે.

`check:file-size` તેની પોતાની શરતો પર આધાર રેફનો ઉપયોગ કરે છે (`scripts/check/check-file-size.mjs`, #8522): તે વૃક્ષમાંના દરેક સ્ત્રોત અને પરીક્ષણ ફાઇલને તપાસે છે, `git show` સાથે PR બેઝ પર દરેકની લાઇનની ગણતરી વાંચે છે, અને ફાઇલ ત્યારે જ નિષ્ફળ જાય છે જ્યારે તે તેની બેઝલાઇન સીલિંગ (`frozen` / `testFrozen`/ `cap` / `testCap` ) માટે બેઝ લાઇનની બહાર વધે છે. કદ એક ફાઇલ કે જે પહેલાથી જ આધાર પર વહી ગઈ છે તેથી નિર્દોષ PR ક્યારેય લાલ કરતી નથી.

`check:boundary:ratchet` તેના સિંગલ નંબર પર સમાન નિયમ લાગુ કરે છે (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ઇવેન્ટ્સ પર `quality.yml` ફાસ્ટ-ગેટ્સ અને `ci.yml` લિન્ટ જોબ બંને PR બેઝ SHA પાસ કરે છે, બેઝ કમિટને `git archive` નિકાસમાંથી માપવામાં આવે છે, અને PR ત્યારે જ નિષ્ફળ જાય છે જ્યારે તેની `open-sse → src` એજ કાઉન્ટ મોટા `metrics.boundaryOpenSseToSrc` ગણતરી કરતા વધી જાય છે. ટોચમર્યાદા ઉપર બેઝ ડ્રિફ્ટની જાણ કરવામાં આવે છે (`base drift herdado`) પરંતુ તે ક્યારેય નિર્દોષ PR ને લાલ કરતું નથી; push → મુખ્ય સંપૂર્ણ ટોચમર્યાદાને જાળવી રાખે છે, અને એક વણઉકેલાયેલ આધાર SHA ચેતવણી સાથે તેની પાસે પાછો આવે છે.

એક સર્વશ્રેષ્ઠ-કતાર ઉમેદવાર ( `omni-queue/**` પર દબાણ, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) જુઓ) પુલ વિનંતી જેવી જ સારવાર મેળવે છે: બંને વર્કફ્લો ઉમેદવાર આધાર (`needs.changes.outputs.candidateBase`) ને `--base-ref` તરીકે પાસ કરે છે, અને `check:ts7-diagnostics-ratchet` તેની સામે પણ ચાલે છે. બે નવા-કોડ ગેટ માટે સરખામણીનો આધાર એ છે કે SHA પોતે, ટોચના મર્જ કમિટના પ્રથમ પેરેન્ટ નથી, તેથી બેચની દરેક પુલ વિનંતીનો નિર્ણય કરવામાં આવે છે.

`workflow_dispatch` રન, રીલીઝ-ગ્રીન સ્વીપ અને રાત્રિના હેડરૂમ જોબમાં કોઈ PR આધાર નથી અને સંપૂર્ણ (વૈશ્વિક) સરખામણી રાખે છે. કવરેજ, ડુપ્લિકેશન અને ટાઈપ-કવરેજ અત્યારે વૈશ્વિક રહે છે (તેમના સાધનો સસ્તામાં પ્રતિ-ફાઈલ તફાવત પેદા કરતા નથી) સમાન સારવાર માટે — ઉમેદવારો.

**v4.0 પર તબક્કો બંધ કરી રહ્યા છીએ (LTS = પહેલા કરતાં વધુ કડક, "પાછા સામાન્ય પર" નહીં)**

1. શુદ્ધ `release/v4.0.0` ટિપ પર: રેકોર્ડ માટે `npm run quality:headroom --json`, પછી `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, દરેક ટાઇપચેક ગેટની `--update` — દરેક બેઝલાઇન માપેલા મૂલ્ય સુધી જાય છે.
2. `quality-baseline.json` માંથી `_policy` કાઢી નાખો ( `--require-tighten` ફરીથી શસ્ત્રો અને રાત્રિ બેંકિંગ ), `check-openapi-coverage.mjs` માં `THRESHOLD = 36` (અથવા ઉચ્ચતર) પુનઃસ્થાપિત કરો.
3. જ્યાં મોડ્યુલરાઈઝેશન ચૂકવવામાં આવ્યું છે તે માપન કરતાં વધુ કડક કરો: ફાઈલ-સાઈઝ `cap` પાછું 1000 (અથવા 800), કવરેજ ફ્લોર + 5, મોડ્યુલરાઈઝ્ડ પેકેજો માટે ડેડ એક્સપોર્ટ્સ 0.

## રેચેટ બેઝલાઇન (`quality-baseline.json`)

રેચેટ એન્જીન (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` વાંચે છે અને તાજા એકત્રિત કરાયેલા `quality-metrics.json` સાથે તેની સરખામણી કરે છે. કોઈપણ મેટ્રિક જે તેના એપ્સીલોનથી આગળ વધે છે તે બિલ્ડને નિષ્ફળ કરે છે.

વર્તમાન ટ્રેક કરેલ મેટ્રિક્સ:

| મેટ્રિક               | દિશા   | અર્થ                                  |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | ESLint ચેતવણીની સંખ્યા વધવી જોઈએ નહીં |
| `coverage.statements` | `up`   | નિવેદન કવરેજ ઘટવું જોઈએ નહીં          |
| `coverage.lines`      | `up`   | લાઇન કવરેજ ઘટવું જોઈએ નહીં            |
| `coverage.functions`  | `up`   | કાર્ય કવરેજ ઘટવું જોઈએ નહીં           |
| `coverage.branches`   | `up`   | બ્રાન્ચ કવરેજ ઘટવું જોઈએ નહીં         |

વાસ્તવિક સુધારણા પછી આધારરેખા અપડેટ કરવા માટે:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ધ્વજ વર્તમાન માપેલ મૂલ્યોને `quality-baseline.json` માં લખે છે. બૅન્કિંગ અને સુધારણા એ release/nightly કાર્ય છે, PR's: `--require-tighten` (Fase 6A.5) માત્ર રિલીઝ મોડ (પુશ, શેડ્યૂલ, રિલીઝ PR, સ્થાનિક રન) માં બિન-બેન્ક્ડ સુધારણાને નિષ્ફળ કરે છે. ફિચર PR (`pr` ગેટ મોડ) માં તે સુધારણાને માહિતી તરીકે છાપે છે અને પસાર થાય છે; રીગ્રેસન બંને સ્થિતિઓમાં નિષ્ફળ જાય છે. વેગ તબક્કા દરમિયાન તે સર્વત્ર સલાહભર્યું છે (`_policy.requireTighten: false`). [જનરેટ કરેલી ફાઇલો અને વ્યુત્પન્ન બેઝલાઇન](#generated-files-and-derived-baselines-written-at-release) જુઓ.

### CodeQL રેચેટ: તાજું કેડન્સ અને મેન્યુઅલ ટ્રિગર

`check:codeql-ratchet` વાંચે છે** રેપો સ્ટેટ, શેડ્યૂલ PR પર રિફ્રેશ કરેલું — દીઠ નહીં.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` અહેવાલ આપે છે `state: configured`, `schedule: weekly`: GitHub નું ડિફોલ્ટ-સેટઅપ સ્કેન, પ્રતિ-પુશ વિશ્લેષણ નહીં. પરિણામ: PR પછી જે FIXES ચેતવણીઓ મર્જ થાય છે, જ્યાં સુધી આગામી સુનિશ્ચિત સ્કેન — ન ચાલે ત્યાં સુધી રેચેટ જૂની, ઉચ્ચ ગણતરી વાંચવાનું ચાલુ રાખે છે જેથી તે સ્કેન પકડે ત્યાં સુધી દરેક ઓપન PR પર રીગ્રેશનની જાણ કરે છે, જેમાં PR ના પોતાના ફોલો-અપ્સનો સમાવેશ થાય છે.

**મેન્યુઅલ રિફ્રેશ** : `gh workflow run codeql.yml --ref release/vX.Y.Z` પૃથ્થકરણને ફરીથી ચલાવે છે અને મિનિટોમાં ચેતવણીઓ પુનઃપ્રકાશિત કરે છે. `.github/workflows/codeql.yml` પહેલા — વાંચો તેનું હેડર સમજાવે છે કે તે `workflow_dispatch` -only છે** કારણ કે તે GitHub ના "ડિફોલ્ટ સેટઅપ" સાથે વિરોધાભાસી છે** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`) `push`/`pull_request`/ `schedule` ટ્રિગર્સને પુનઃસ્થાપિત કરવા માટે એક જરૂરી છે** પ્રથમ માલિકની ક્રિયા** : સેટિંગ્સ → કોડ સુરક્ષા → CodeQL: ડિફોલ્ટ → એડવાન્સ્ડ. તે સ્વિચ — વિના `schedule:` ટ્રિગર ઉમેરશો નહીં તે ફક્ત નિષ્ફળ રન બનાવશે.

**ગણતરી ઘટ્યા પછી આધારરેખાને સજ્જડ કરો** — `node scripts/check/check-codeql-ratchet.mjs --update` નવી માપેલી ગણતરીને `quality-baseline.json` → `metrics.codeqlAlerts.value` માં લખે છે, તેથી રેચેટ ચુપચાપ જૂની ટોચમર્યાદા સુધી રીગ્રેશનની પરવાનગી આપતું નથી. કાર્ય કરેલ ઉદાહરણ (2026-09-02/03): PR #12502 નિશ્ચિત 7 વાસ્તવિક ચેતવણીઓ (13 → 6 માપેલ ખુલ્લું); PR #12530 એ સ્થિર બેઝલાઇન 11 → 6 ને મેચ કરવા માટે કડક બનાવ્યું; બાકીના 6ને પછી પ્રતિ-ચેતવણીના સમર્થન સાથે 0 ઓપન સુધી બરતરફ કરવામાં આવ્યા હતા.

**બરતરફી એ ઓપરેટરનો કોલ છે (હાર્ડ રૂલ #14)** — બરતરફીની ટિપ્પણીમાં તકનીકી સમર્થનને રેકોર્ડ કર્યા વિના CodeQL ચેતવણીને ક્યારેય બરતરફ કરતું નથી: અપસ્ટ્રીમ-પ્રોટોકોલ આવશ્યકતા માટે `won't fix`, ટેસ્ટ ફિક્સ્ચર માટે `used in tests`, સેનિટાઇઝર માટે `false positive` CodeQL જોઈ શકતું નથી (અગાઉ: `docs/security/ERROR_SANITIZATION.md`).

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

## જનરેટેડ ફાઇલો અને વ્યુત્પન્ન બેઝલાઇન્સ (પ્રકાશન સમયે લખાયેલ)

યોજના 2026-11-13 ("ઉત્પાદિત નંબરો અને પાઠો ફક્ત પ્રકાશન સમયે ઉકેલાયા"): એક લક્ષણ PR ફેરફાર કરે છે** સ્ત્રોત** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, કૌશલ્ય સૂચિ, ફ્રી-ટાયર કેટલોગ, નવી e2e સ્પેક. તે તે સ્ત્રોતમાંથી ગણતરી કરેલ ફાઈલોને પુનઃજનરેટ કરતું નથી, અને તે માપેલ સુધારણાને આધારરેખામાં બેંક કરતું નથી. તે ફાઇલો એકવાર ફરીથી લખવામાં આવે છે, રીલીઝ રીફ્રેશ (`release:refresh-derived`) દ્વારા અથવા રાત્રિના રીફ્રેશ PR દ્વારા. આ પહેલાં, દરેક ભાઈ-બહેન PR તેની પોતાની પુનર્જીવિત નકલ લઈ જતા હતા અને આગામી મર્જ સાથે વિરોધાભાસી હતા (2026-11-13: 321 માંથી 30 ઓપન PRs રિરોટ `PROVIDER_REFERENCE.md`, 26-28 એ README ડાયાગ્રામ ફરીથી લખ્યા હતા).

**રક્ષક.** `check:pr-derived-paths` (જોબ `pr-test-policy`) એ PR સુવિધાને નિષ્ફળ કરે છે જે `config/quality/derived-paths/` માં કુટુંબની ફાઇલને સ્પર્શે છે :

| કુટુંબ      | ફાઇલો                                                                                                                                                                         | દ્વારા ફરીથી લખાયેલ                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; બાર જનરેટેડ README SVGs; `skills/*/references/**`; `SKILL.md` ફાઈલો કે જેમાં કોઈ કસ્ટમ બ્લોક નથી | `release:refresh-derived` (તથ્યો), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                             | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

લેખકો (`release/v*`, `chore/derived-*`, અને `chore/bank-ratchet-*` આધારરેખા માટે) મુક્તિ છે; તેથી એક PR કે જે ફક્ત એક જ કુટુંબ વત્તા તેના સાથીઓને બદલે છે ( `generated` માટે : જનરેટર સ્ક્રિપ્ટ્સ, તેમના પરીક્ષણો, એજન્ટ-કૌશલ્ય ઇનપુટ્સ — `src/shared/constants/agentSkills.ts`, હાથથી લખેલા `skills/**` દસ્તાવેજો, `docs/openapi.yaml` — અને `changelog.d/**`), દા.ત. એક હીરો લેઆઉટ કે જેના કૌશલ્ય સાથે તેની SVG ફેરફાર કરવામાં આવે છે અથવા તેને સુધારે છે. પુનર્જીવિત `SKILL.md` ફાઇલો. હાથથી લખેલા `<!-- skill:custom-start -->` બ્લોક સાથેનો `SKILL.md` પરિવારમાં નથી: તેનો કસ્ટમ બ્લોક સુવિધાની બાજુમાં સંપાદનયોગ્ય રહે છે.

**ગેટ મોડ દીઠ ચેક** (`scripts/check/lib/gateMode.mjs`; મદદગાર `scripts/check/lib/derivedArtifactScope.mjs`):

| તપાસો                                                                         | `release` (પુશ, શેડ્યૂલ, રિલીઝ PR, સ્થાનિક)                         | `pr` (સુવિધા PR, કતાર બેચ)                                                                                                                                                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                     | દરેક કૌશલ્ય જનરેટર આઉટપુટ સમાન હોવું જોઈએ                           | ફક્ત તે જ કૌશલ્યો કે જેના દ્વારા ટેક્સ્ટ જનરેટ કરવામાં આવે છે (કસ્ટમ બ્લોકની બહાર) અથવા `references/` ધ PR સંપાદનો; અન્યથા `SKIP reason=pr-mode`                                                                    |
| `check:generated-artifacts` (README SVGs + e2e સમય; સંપૂર્ણ ઇતિહાસની જરૂર છે) | દરેક SVG તેના જનરેટરની બરાબર છે; દરેક સ્પેકમાં સમયની એન્ટ્રી હોય છે | માત્ર કલાકૃતિઓ જ PR સંપાદિત કરે છે; બાકીના `SKIP reason=pr-mode`; નો ડિફ બેઝ → દરેક આર્ટિફેક્ટ નક્કી કરવામાં આવે છે (નિષ્ફળ-બંધ)                                                                                    |
| README SVG બાઈટ-સરખામણી પરીક્ષણો (`tests/unit/docs/readme-*-svg.test.ts`)     | દરેક SVG                                                            | માત્ર એક SVG PR સંપાદન કરે છે, જ્યારે આધાર ઉકેલે છે; `test-unit` ના છીછરા PR ચેકઆઉટનો કોઈ આધાર નથી, તેથી ત્યાં `SKIP reason=base-unresolved` અને `check:generated-artifacts` સાથેની કસોટી સરખામણીની માલિકી ધરાવે છે |
| e2e સમય પૂર્ણતા (`tests/unit/balance-e2e-shards.test.ts`)                     | દરેક સ્પેકમાં એન્ટ્રી હોય છે                                        | SVG પરીક્ષણો જેવો જ નિયમ (એક નવું સ્પેક સરેરાશ વજન સાથે ચાલે છે)                                                                                                                                                    |
| `check-quality-ratchet.mjs --require-tighten`                                 | બિન-બેંક સુધારણા નિષ્ફળ જાય છે (સિવાય કે `_policy`)                 | સુધારણાની જાણ થઈ, ક્યારેય નિષ્ફળતા નહીં; રીગ્રેશન હજુ પણ નિષ્ફળ જાય છે                                                                                                                                              |

રીલીઝ મોડ ચુકાદાઓ, એક્ઝિટ કોડ્સ અને સંદેશાઓને રાખે છે જે આ ચેક વિભાજન પહેલા હતા; રિઝોલ્યુડ મોડ (`[agent-skills-sync] mode=release (auto: local run)`) ને નામ આપીને વધુમાં વધુ એક લીટી ઉમેરવામાં આવે છે. પરીક્ષણો node:test ના `{ skip: releaseOnlyUnlessTouched(...) }` વિકલ્પ દ્વારા અવગણવામાં આવે છે, જે `check:test-masking` માત્ર રિપોર્ટ બ્લોકમાં સૂચિબદ્ધ કરે છે (તે `.skip(` કે `{ skip: true }` નથી, તેથી તે હાર્ડ સ્કીપ તરીકે ગણવામાં આવતું નથી). `check:generated-artifacts` ચાલે છે જ્યાં આધાર ઉકેલી શકાય છે: જોબ `lint` (`fetch-depth: 0`), `check:agent-skills-sync` પછી તરત જ. સ્થાનિક રીતે, `npm run check:generated-artifacts -- --mode=pr` બતાવે છે કે તે પગલું PR પર શું નક્કી કરે છે. `check:docs-counts` ની પ્રદાતા-કુલ ક્રોસ-ચેક ("પ્રોવાઇડર રેફરન્સ ટોટલ (ડૉક વિ લાઇવ મોડ્યુલ્સ)") કાઉન્ટ્સ ગેટનો ભાગ છે અને તે ગેટના પોતાના મોડને અનુસરે છે.

કુટુંબમાં નહીં, હેતુસર: લોકો દ્વારા નક્કી કરવામાં આવેલી પોલિસી ફાઇલો (`gate-manifest.json`, મંજૂર સૂચિઓ, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) અને સીલિંગ એક ફીચર PR ને કોડ (`quality-baseline.json` મેટ્રિક એન્ટ્રીઝ, typecheck/file-size/complexity બેઝલાઇન્સ, `eslint-suppressions.json` — જ્યારે ESLint a pre- PR દ્વારા કાપવામાં આવે છે ત્યારે ઉલ્લંઘન). `src/i18n/routeNamespaces.generated.json` પણ જનરેટ થાય છે પરંતુ તે PRs સુવિધામાં રહે છે : એપ તેને રન ટાઈમ પર આયાત કરે છે, તેથી તે રિફ્રેશની રાહ જોઈ શકતી નથી.

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

દરેક ગેટ કે જે પહેલાથી અસ્તિત્વમાં રહેલા ઉલ્લંઘનો પર નિષ્ફળ ન થઈ શકે તે સ્થિર અનુમતિ સૂચિનો ઉપયોગ કરે છે (દા.ત., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). નીતિ છે:

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

દરેક ઉમેદવારને 2026-06-17ના રોજ લાઇવ ગેટ સ્ટેટ સામે માન્ય કરવામાં આવ્યા હતા (વિશ્વાસ-પરંતુ-ચકાસણી); દેવું છુપાવવા માટે ઘણા "સ્પષ્ટ" મર્જ થયા છે અને છે** નથી** ડ્રોપ-ઇન્સ સાફ કરો.

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

- સપ્લાય-ચેઈન (પ્રોવેનન્સ, SBOM, ટ્રીવી, સ્કોરકાર્ડ): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — કી-સેટ પેરિટી ગેટ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, જોબ `i18n-ui-coverage`). દરેક `src/i18n/messages/<locale>.json` ના લીફ કી સેટને `en.json` સાથે સરખાવે છે અને કોઈપણ ગેરહાજર અથવા વધારાના પાંદડા પર નિષ્ફળ જાય છે, ચાવી ક્યારે ઉમેરવામાં આવી હતી તે ધ્યાનમાં લીધા વગર. `__MISSING__:` પ્લેસહોલ્ડર્સ હાજર તરીકે ગણાય છે (તેમની સામગ્રી એ રેશિયો ગેટનો વ્યવસાય છે). તે બે diff-based/percentage ગેટનું સંપૂર્ણ પૂરક છે: `check-ui-keys-coverage` લોકેલ દીઠ 80 % ફ્લોર લાગુ કરે છે ( ~ 13,000 માંથી 43 ગેરહાજર કી હજુ પણ 99.7 % વાંચે છે) અને `check-new-key-coverage` માત્ર PR એ `en.json` માં ઉમેરે છે તે જ ચાવીઓ નક્કી કરે છે. એક લોકેલ બેચ જે દિવસે તેની શાખા કાપવામાં આવે છે તે દિવસના `en.json` થી જનરેટ થાય છે અને દિવસો સુધી ભાષાંતર કરે છે જ્યારે આધાર ચાવીઓ ઉમેરતો રહે છે; બેચ PR પોતે કોઈ કી ઉમેરતી નથી, તેથી જ્યારે બેચ 1 (#13044) નવ લોકેલમાં 43 કી અને બેચ 2 (#13660) 10 કી આઠમાં ટૂંકી આવી ત્યારે બંને ભાઈ-બહેન ચૂપ રહ્યા (2026-09-15). `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` સાથે લાલ ફિક્સ કરો; એક `extra` લીફ એટલે કે સ્ત્રોતે તેને — `sync-ui-keys` ડ્રોપ કર્યું (`--prune-extra`, ડિફોલ્ટ). `--warn` નિષ્ફળ થયા વિના અહેવાલ આપે છે. `--catalog=cli` `bin/cli/locales` (`npm run i18n:check-keys:cli`) પર સમાન સરખામણી કરે છે; બંને પગલાં જોબ `i18n-ui-coverage` માં રહે છે. સંપૂર્ણ તપાસ ફક્ત રીલીઝ મોડ છે: એક લક્ષણ PR `SKIP reason=pr-mode` જુએ છે અને ફિક્સ રીલીઝ રીફ્રેશ અથવા અનુવાદ તરંગમાં ચાલે છે, PR લક્ષણમાં ક્યારેય નહીં; PR કે જે લોકેલ કેટલોગમાં ફેરફાર કરે છે તેમાંના દરેકને બદલે મર્જ બેઝ સામે નિર્ણય લેવામાં આવે છે (જોબ `i18n-ui-coverage` હેઠળ "બે સ્થિતિઓ" જુઓ).

#### `check-new-key-coverage` — નવી-કી i18n ગેટ

`check-ui-value-drift` ની બહેન. તે એક અંગ્રેજી મૂલ્ય ધરાવે છે જે હતું** ફરીથી લખાયેલ** જ્યારે તેના અનુવાદો પાછળ રહી ગયા હતા; આ એક અંગ્રેજી કી પકડે છે જે હતી** ઉમેર્યું** જ્યારે કેટલાક સ્થાનિકોએ તે ક્યારેય પ્રાપ્ત કર્યું નથી.

`check-ui-keys-coverage` આ વર્ગને જોઈ શકતું નથી: તે લોકેલ દીઠ ટકાવારી માળખું લાગુ કરે છે, અને ~ 13,000 માંથી અગિયાર ગેરહાજર કી 99.9% પર કવરેજ છોડે છે. ભાષા દીઠ ટકાવારી "આ સુવિધાને અનઅનુવાદિત મોકલેલ" — વ્યક્ત કરી શકતી નથી, સમગ્ર સુવિધા નવા લોકેલમાં કોઈ ટેક્સ્ટ વિના ઉતરી શકે છે અને નંબરને ક્યારેય ખસેડી શકતી નથી.

તે જે ઘટનાને એન્કોડ કરે છે: ઓર્કેસ્ટ્રેશન કેનવાસના તબક્કો 3 એ તે સમયે અસ્તિત્વમાં રહેલા 42 લોકેલમાં તેની અગિયાર કીનો અનુવાદ કર્યો. કલાકો પછી EU-ભાષાની બેચ (#13044) રેપોને 51 લોકેલ પર લઈ ગઈ, અને નવ નવા આવનારાઓ (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) તેમને ક્યારેય પ્રાપ્ત કરી શક્યા નહીં. `deepMergeFallback` એ ગેરહાજર કી માટે અંગ્રેજીને બદલે છે, તેથી નિષ્ફળતા મોડ ખાલી UI — વાસ્તવિકને બદલે અનઅનુવાદિત UI હતો અને બાંધકામ દ્વારા શાંત હતો.

તે તેના ભાઈની જેમ છે** ભિન્ન-જાણ** , વર્કિંગ ટ્રી સામે મર્જ બેઝ પર અંગ્રેજીની સરખામણી કરો, જેથી પહેલાથી અસ્તિત્વમાં રહેલા ગાબડાઓ સ્થિર રહે છે અને ગેટને ચાલુ કરવા માટે કોઈ સ્થળાંતરની જરૂર નથી.

**`__MISSING__:<english>` માર્કર તેને સંતુષ્ટ કરતું નથી (2026-09-17 થી).** 2026-09-16 ના રોજ આઠ ફીચર PRs સુધી 61 કી ઉમેરી અને તમામ 65 લોકેલમાં માર્કર સ્ટેમ્પ કર્યા ત્યાં સુધી તે દસ્તાવેજીકૃત ડિફરલ — તરીકે ઉપયોગમાં લેવાતો હતો જ્યારે રનટાઈમ અંગ્રેજી — ઠીક કરવા માટે પાછો આવે છે: આ ગેટ દરેકને સ્વીકારે છે, કંઈપણ PRs ને અવરોધિત કરતું નથી, અને દરેક ટીપીઆરટીઓ રીલીઝ માટે બ્લોકીંગ નિષ્ફળ થયું હતું. 3.2 % > 2.5 % + 0.5). માર્કરને હવે ગેરહાજર અનુવાદ તરીકે ગણવામાં આવે છે. રીલીઝ મોડ ફક્ત 2026-11-13 થી: એક લક્ષણ PR જુએ છે `SKIP reason=pr-mode`, અને રીલીઝ PR (`BASE_REF=origin/main`) પર ગેટ ચક્રમાં ઉમેરવામાં આવેલી દરેક કીને ન્યાય આપે છે. રીલીઝ રીફ્રેશમાં લાલ અથવા `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` સાથે અનુવાદ તરંગને ઠીક કરો, અથવા `npm run i18n:translate-new-keys` સાથે સમાંતર તમામ લોકેલ (`scripts/i18n/translate-new-keys.sh`, ડિટેચ્ડ-સેફ, `OMNIROUTE_TRANSLATION_*` env વિના પ્રારંભ કરવાનો ઇનકાર કરે છે). એક કી કે જે અંગ્રેજીમાં રહેવી જોઈએ (એક પિન કરેલ product/engine/flag નામ) `scripts/i18n/untranslatable-keys.json` માં છે, ક્યારેય માર્કર પાછળ નથી. `vi` માર્કર્સ પર સંપૂર્ણ પ્રતિબંધ મૂકે છે (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — પાર્ક કરેલ-ટેસ્ટ ગેટ

`vitest.config.ts` ની `exclude` સૂચિમાંની ફાઇલ એ એક પરીક્ષણ છે જે ચાલતું નથી, અને તે વૃક્ષ વાંચનારને કવરેજ જેવું લાગે છે. ટિપ્પણી `// #8618 — pre-existing failure; remove this exclusion when fixed` પાછળ 62 ફાઇલો એકઠી થઈ. ઇશ્યૂ #8618 2026-08-11 ના રોજ બંધ કરવામાં આવ્યો હતો જ્યારે તેણે ટ્રેક કરેલી સૂચિ 45 એન્ટ્રીઓથી વધીને 62 થઈ ગઈ હતી, દરેક નવી એન્ટ્રીને મૃત મુદ્દા પર નિર્દેશ કરતી ટિપ્પણી વારસામાં મળી હતી. જ્યારે સૂચિ આખરે ફાઇલ દ્વારા માપવામાં આવી હતી (#13204),** 62માંથી 51 વર્તમાન વૃક્ષ સામે કોઈ સ્ત્રોતમાં ફેરફાર કર્યા વિના પસાર થયા** .

ગેટને દરેક બાકાતની જરૂર છે જે વાસ્તવિક ફાઇલને (a) ટ્રેકિંગ સમસ્યાને નામ આપવા માટે અને (b) `config/quality/vitest-exclusions.json` માં તેની માપેલી સ્થિતિ સાથે દેખાય છે, તેથી 60-એન્ટ્રી એરેમાં વધુ એક લાઇનને બદલે સમર્પિત ફાઇલમાં એકને ઉમેરવા એ સમીક્ષાયોગ્ય તફાવત છે. તે ઇરાદાપૂર્વક બાકાત કરાયેલા — પરીક્ષણોને ફરીથી ચલાવતું નથી કે જેની કિંમત ~ 10 મિનિટ છે અને તે સામયિક નોકરીમાં છે; ઇન્વેન્ટરી રેકોર્ડ કરે છે જ્યારે દરેકને છેલ્લે માપવામાં આવ્યું હતું.
