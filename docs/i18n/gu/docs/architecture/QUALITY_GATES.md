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

## ગેટ ઇન્વેન્ટરી અને એક્ઝિક્યુશન પ્રોફાઇલ્સ

### ઉમેદવાર પ્રવેશ

CI અને ગુણવત્તા ગેટ્સ વર્કફ્લો દરેક સ્થિર ચુકાદો બહાર કાઢે છે: `Gate / CI` અને `Gate / Quality`. તેમની આવૃત્તિવાળી એડમિશન પોલિસી દરેક અપસ્ટ્રીમ જોબને જરૂરી અથવા એડવાઇઝરી તરીકે ગણાવે છે. લાગુ પડતી આવશ્યક નોકરી સફળ થવી જોઈએ: ગુમ થયેલ, રદ કરેલ, છોડેલ, બાકી અને અજ્ઞાત પરિણામો PASS સ્થાપિત કરી શકતા નથી. માન્ય દસ્તાવેજ-માત્ર અથવા સૂચિ-માત્ર વર્ગીકરણ કોડ લેનને અયોગ્ય બનાવી શકે છે; સામાન્ય ડ્રાફ્ટ PR સ્વીકૃત ઉમેદવાર નથી. `hotfix` લેબલ પુરાવાને માફ કરતું નથી.

બંને વર્કફ્લો PRs main/release શાખાઓમાં આવરી લે છે, `main` તરફ દબાણ કરે છે, મેન્યુઅલ ડિસ્પેચ અને મર્જ-ગ્રુપ ઇવેન્ટ્સ. પુશ, ડિસ્પેચ અને મર્જ-ગ્રુપ સંપૂર્ણ પસંદગી ચલાવો. વિશ્વસનીય મર્જાઇફ કતાર ડ્રાફ્ટ લાગુ `full-code`/`full-code-e2e` નોકરીઓ પણ ચલાવે છે; સામાન્ય PRs તેમને છોડી દો. મેન્યુઅલ મર્જ કરતા પહેલા, ચોક્કસ ઉમેદવાર પર સંપૂર્ણ ડિસ્પેચ ચલાવો. `release/**` પર દબાણ કરવાથી આ વર્કફ્લો શરૂ થતા નથી; રીલીઝ-ગ્રીન મર્જ કરેલ આધારને અલગથી અવલોકન કરે છે (`docs/ops/RUNNER_BOX.md` → હોસ્ટેડ લેન). ફોર્ક્સ અને મર્જ જૂથો નોકરીઓ માટે હોસ્ટ કરેલા દોડવીરોનો ઉપયોગ કરે છે જે અન્યથા સ્વ-હોસ્ટેડ દોડવીરોને પસંદ કરે છે; રોલઆઉટ પહેલાં પૂરતી હોસ્ટ કરેલ ક્ષમતા ચકાસવી આવશ્યક છે.

દરેક JSON રસીદ ચેક-આઉટ SHA, વર્કફ્લો રન અને પ્રયાસને ઓળખે છે. CLI checkout/event SHA મિસમેચ નકારે છે. વર્કફ્લો પરીક્ષણો ચુકાદાની નોકરીની `needs` સૂચિ સાથે નીતિ સભ્યપદને જોડે છે જેથી નવી અથવા દૂર કરાયેલ લેન શાંતિપૂર્વક અદૃશ્ય થઈ શકે નહીં. રસીદો તેમના પોતાના વર્કફ્લોને આવરી લે છે, પ્રકાશન, જમાવટ અથવા હાલના સલાહકાર સ્કેનરના આંતરિક ભાગને નહીં. શાખાના નિયમોમાં જરૂરી લાગુ પડતા ચેક બનાવવા એ એક અલગ વહીવટી ફેરફાર છે; તેમની નોકરીઓને વ્યાખ્યાયિત કરવાથી શાખાનું રક્ષણ થતું નથી.

`API Route Typecheck` એ એક સ્વતંત્ર વર્કફ્લો તપાસ છે, જે એકંદર ચુકાદાઓ અને સ્થાનિક સંપૂર્ણ નિરીક્ષકની સ્થિર પ્રોફાઇલ બંનેની બહાર છે. ચોક્કસ ઉમેદવાર માટે તેનું પરિણામ અલગથી તપાસો. `.github/workflows/api-route-typecheck.yml` PRs પર `main` અથવા `release/**` માં ચાલે છે, બ્રાન્ચ ફેમિલી, મેન્યુઅલ ડિસ્પેચ અને `merge_group` પ્રકારના `checks_requested` ઇવેન્ટ્સ તરફ દબાણ કરે છે. તેમાં કોઈ પાથ ફિલ્ટર નથી. જૂથોને મર્જ કરો `merge_group.head_sha` તપાસો; અન્ય ઇવેન્ટ્સ `github.sha` તપાસો. બધી ઇવેન્ટ્સ સમાન API ડાયગ્નોસ્ટિક ગેટ અને ગેટ યુનિટ ટેસ્ટનો ઉપયોગ કરે છે. PR બેઝ રીટાર્ગેટ નવા ચેકની વિનંતી કરે છે; body/title સંપાદનો માત્ર અવલોકન નામ `Admission not requested / API Route Typecheck` ઉપયોગ કરે છે અને પ્રવેશ તપાસને બદલી શકતા નથી.

### સ્વીકાર રિડ્યુસરમાં જાળવી રાખેલો પુરાવો

`scripts/quality/validate-release-acceptance.mjs` પૂરી પાડેલી યોજના અને તેના
મેનિફેસ્ટ્સને રિડ્યૂસ કરે છે; તે યોજના સંપૂર્ણ રિલીઝ પાઇપલાઇનને આવરે છે એવું સ્થાપિત કરતું નથી.
તેના અહેવાલો સ્પષ્ટપણે `releaseAcceptance: false` સેટ કરે છે, ભલે તે યોજના
`VERIFIED` હોય. `release-acceptance.yml` વર્કફ્લો હજુ પણ વાસ્તવિક build, package, boot અથવા promotion
રસીદોના બદલે shadow fixtures વાપરે છે.

જાળવી રાખેલા પુરાવાની ચકાસણી કરવા માટે CLI ને `--evidence-root` આવશ્યક છે. ફાઇલોને
`<evidence-root>/<artifact_id>/<member>` તરીકે રિઝોલ્વ કરવામાં આવે છે અને SHA-256 તરીકે હૅશ કરવામાં આવે છે. પુરાવા વિનાનો PASS રેકોર્ડ,
ગેરહાજર અથવા બદલાયેલી ફાઇલ, અસુરક્ષિત પાથ અથવા symlink ચકાસણીને અટકાવે છે.
ગેરહાજર ફાઇલો ખાલી સફળ લૉગ્સની સમકક્ષ નથી. હાલની SHA/run/attempt
ચકાસણીઓ સ્વતંત્ર રહે છે: મેળ ખાતા bytes જૂની રસીદને માન્ય બનાવી શકતા નથી.
ફાઇલની અખંડિતતા એક્ઝિક્યુશનની પ્રામાણિકતા અથવા આર્ટિફેક્ટ પ્રમોશનનો પુરાવો નથી.

### DAST ચકાસાયેલ CI build વાપરે છે

ફરજિયાત CI job `dast-smoke`, `build` પછી `.github/workflows/dast-smoke.yml` બોલાવે છે. તે build જેવી જ code/draft પસંદગી અનુસરે છે, જેમાં સમર્થિત fork PR, release-target PR અને merge groups સામેલ છે. ગાયબ, નિષ્ફળ, રદ થયેલી કે અનપેક્ષિત રીતે છોડાયેલી DAST job `Gate / CI` અટકાવે છે. પુનઃવાપરી શકાય તેવા workflow નું સ્વતંત્ર PR/dispatch trigger નથી; manual validation CI dispatch વાપરે છે જેથી build અને consumer એક જ run માં રહે.

`scripts/ci/next-build-provenance.mjs` આખા Next artifact ને tar digest, repository/event/run, producer attempt, head/base/checkout/tree, workflow identities, lockfile, ચોક્કસ Node version/ABI, platform અને bundler સાથે બાંધે છે. DAST અપરિવર્તનીય artifact ID `needs.build.outputs` માંથી પસંદ કરે છે, download digest ચકાસણી ફરજિયાત બનાવે છે અને `scripts/ci/unpack-ci-build.py` વડે મંજૂર બે members કાઢતાં પહેલાં ZIP hash સ્વતંત્ર રીતે ગણી producer digest સાથે સરખાવે છે. Next tree કાઢતાં પહેલાં manifest અને tar archive પણ producer ના સ્વતંત્ર outputs સાથે મેળ ખાતાં હોવા જોઈએ. તે branch નો સૌથી નવો સફળ build કદી શોધતું નથી. ID અને બધા inputs હજી મળતા હોય તો partial rerun એ જ producer attempt ફરી વાપરી શકે છે; receipt બંને attempts નોંધે છે.

Consumer hosted Linux runner પર રહે છે, repository ની ફક્ત read permission અને repository secrets વિના. તે producer નું ચોક્કસ Node version સ્થાપીને `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` વડે CLI બનાવે છે. `scripts/build/standaloneInput.mjs` કોઈ fallback build પહેલાં ગાયબ standalone server નકારે છે; સામાન્ય સ્થાનિક CLI builds તેમનો હાલનો fallback જાળવે છે. Server readiness, Schemathesis અને promptfoo બધાં job ની અપરિવર્તિત 25 મિનિટની મર્યાદામાં સફળ થવાં જોઈએ. Provenance receipt inputs ની ઓળખ અને bytes સાબિત કરે છે, સફળ DAST scan નહીં. Artifact expiry, runner interruption કે scanner failure અધૂરા કે નિષ્ફળ પુરાવા જ રહે છે; advisory wrapper તેને PASS બનાવી શકતું નથી.

### UI એક્ઝિક્યુશન ક્ષમતા

CI સંપૂર્ણ UI ઇન્વેન્ટરીને ચાર `test-vitest` મેટ્રિક્સ શાર્ડ તરીકે ચલાવે છે, જેમાં દરેક શાર્ડ દીઠ વધુમાં વધુ
બે વર્કર્સ અને હાલની 15-મિનિટની જૉબ સમયમર્યાદા હોય છે. પ્રથમ શાર્ડ
MCP/autoCombo Vitest સ્યુટ પણ ચલાવે છે. આવશ્યક જૉબ પરિણામ દરેક મેટ્રિક્સ લેગને આવરે છે; એક શાર્ડની નિષ્ફળતા
અથવા રદ થવું ઉમેદવારનો સ્વીકાર સ્થાપિત કરી શકતું નથી.

રાત્રિકાલીન ઑબ્ઝર્વર દરેક UI શાર્ડ માટે અલગ exact-candidate રસીદ જાળવે છે,
જેમાં પ્રથમ રસીદમાં MCP એક્ઝિક્યુશનનો સમાવેશ થાય છે. બધી ચાર રસીદો, લૉગ્સ અને મેળ ખાતી
એક્ઝિક્યુશન ઓળખો આવશ્યક છે. સ્થાનિક `npm run test:vitest:ui` હજી પણ
સંપૂર્ણ સ્યુટ પસંદ કરે છે; એક `--shard` રન માત્ર આંશિક પુરાવો છે.

### યુનિટ કવરેજ સંગ્રહ

બાર યુનિટ શાર્ડ તેમના હાલના ટેસ્ટ એક્ઝિક્યુશન દરમિયાન V8 કવરેજ એકત્રિત કરે છે. સફળ
શાર્ડ મધ્યવર્તી Istanbul રિપોર્ટ બનાવ્યા વિના મૂળ ફાઇલોને સંકુચિત કરવા માટે
`scripts/ci/compact-v8-coverage.mjs` ચલાવે છે. અંતિમ Coverage જૉબ ઉમેદવાર SHA,
રનટાઇમ, સોર્સ રૂટ અને ડેટા હૅશ સામે તમામ બાર મેનિફેસ્ટ્સ ચકાસે છે, પછી c8ના રિપોર્ટર્સ અને હાલની
કવરેજ થ્રેશોલ્ડ્સ ચલાવે છે. ઇનપુટ્સ c8નો વૈશ્વિક ફાઇલનામ ક્રમ જાળવે છે; મિશ્ર function/block કવરેજ માટે
દર-શાર્ડ પૂર્વ-મર્જિંગ અસુરક્ષિત છે. ગેરહાજર, ખોટી રચનાવાળા અથવા અસંગત શાર્ડ સ્વીકારને નિષ્ફળ બનાવે છે.
નિષ્ફળ થયેલા ટેસ્ટ શાર્ડ કાચું ડાયગ્નોસ્ટિક કવરેજ અલગથી જાળવે છે; તે અંતિમ મર્જમાં દાખલ થઈ શકતું નથી.

### યુનિટ એક્ઝિક્યુશન પ્રગતિની રસીદો

શેર કરાયેલ `test:unit:ci:shard` કમાન્ડ `scripts/ci/unit-progress-reporter.mjs` દ્વારા `primary`, `dashboard` અને `serial` તબક્કાઓને રેકોર્ડ કરે છે. સામાન્ય ટેસ્ટ રિપોર્ટ ઉપલબ્ધ રહે છે. માત્ર મેટાડેટા ધરાવતી એક અલગ રસીદ દરેક ફાઇલની શરૂઆત અને પૂર્ણતાને રેકોર્ડ કરે છે, અને 30-સેકન્ડનું હાર્ટબીટ હજી સક્રિય રહેલી ફાઇલો તથા તેમનો વીતી ગયેલો સમય દર્શાવે છે. તે માત્ર મંજૂર સૂચિમાં સમાવિષ્ટ એક્ઝિક્યુશન મેટાડેટાને જ રેકોર્ડ કરે છે; ટેસ્ટનાં વર્ણનો, આઉટપુટ, એરર બોડી અને સંપૂર્ણ એન્વાયર્નમેન્ટને સિરિયલાઇઝ કરવામાં આવતાં નથી.

CI JSONL ફાઇલોને `unit-progress-ci-<run>-<attempt>-<shard>` નામે જાળવી રાખે છે. જોબ ટાઇમઆઉટ પછીના અપલોડને અટકાવી શકે છે; અગાઉથી ઉત્સર્જિત થયેલાં હાર્ટબીટ નિદાનાત્મક પુરાવા તરીકે રહે છે. હાર્ટબીટની ગેરહાજરી અવરોધાયેલ અથવા સમાપ્ત કરાયેલી રનર પ્રક્રિયા પણ સૂચવી શકે છે. આ રસીદો હાલની ટેસ્ટ પસંદગી, સમકાલીનતા, સમયમર્યાદાઓ અને એક્ઝિટ સ્ટેટસને જાળવી રાખે છે; તે ઉમેદવાર-પ્રવેશના નિર્ણયો નથી.

### સ્ટેટિક સ્કેન ઇન્વેન્ટરી

વર્ઝનવાળી npm-alias ઇન્વેન્ટરી અને static-scan સભ્યતા
`config/quality/gate-manifest.json`માં રહે છે. `package.json` સામે
સ્ક્રિપ્ટ નામો અને ચોક્કસ કમાન્ડ્સ ચકાસવા માટે `npm run check:gate-manifest` ચલાવો; ઉમેરાઓ, દૂર કરવું અને
કમાન્ડ ડ્રિફ્ટ સ્થાનિક હૂક તથા CIમાં change-classification જૉબ્સ બંનેને નિષ્ફળ બનાવે છે.
એક alias એ વર્કફ્લો જૉબ, મેટ્રિક્સ ઇન્સ્ટન્સ અથવા ટેસ્ટ કેસ નથી: આ ગણતરીઓને
એકબીજાના સ્થાને વાપરી શકાય તેવી રીતે રજૂ કરવી જોઈએ નહીં.

પસંદ કરેલા aliasesને ચલાવ્યા વિના તપાસવા માટે `npm run quality:scan -- --list` અથવા
`npm run quality:scan:fast -- --list`નો ઉપયોગ કરો. રનર
npm એન્ટ્રીપોઇન્ટ ચલાવે છે, તેથી તેનો રનટાઇમ (રૂપરેખાંકિત હોય ત્યાં Bun સહિત) જળવાઈ રહે છે.
મેનિફેસ્ટ આ પ્રોફાઇલ્સની બહારના aliasesને અલગથી ચલાવવામાં આવતા તરીકે નોંધે છે, અને
ફક્ત-વાંચન સ્કેન પ્રોફાઇલ્સમાં મેઇન્ટેનન્સ કમાન્ડ્સ પ્રતિબંધિત છે.

આ પ્રોફાઇલ્સ માત્ર સ્ટેટિક સ્કેનને આવરે છે. તેઓ પ્રોડક્ટ ટેસ્ટ્સ,
કવરેજ, પૅકેજિંગ, બાહ્ય ચેક્સ અથવા ઉમેદવારના સંપૂર્ણ રિલીઝ સ્વીકારને પ્રમાણિત કરતા નથી.
વર્કફ્લો સ્વીકાર લિંક કરેલી `config/quality/admission-policy.json` અને
`scripts/quality/admission-verdict.mjs`નો ઉપયોગ કરે છે. Release-observer પ્રોફાઇલ્સ અલગ રહે છે;
તેમના લાગુ પડતા ચેક્સ અને રસીદોને સ્વતંત્ર રીતે તપાસો. સંપૂર્ણ observerના static
કમાન્ડ્સ `config/quality/release-green-static-profile.json`માં જાહેર કરેલા છે, જેમાં
`audit:deps`, mutation-test પસંદગી અને અનુવાદ ચેક્સનો સમાવેશ થાય છે. લોડર npm
કમાન્ડ્સને package.json અને મોડેલ કરેલી CI/Quality ઘોષણાઓ સામે ચકાસે છે; તે shell tokensને arguments તરીકે ચલાવવાને બદલે
ડ્રિફ્ટને નકારે છે. આવશ્યક સ્કેનર SKIP/INCOMPLETE આઉટપુટ
PASS સ્થાપિત કરી શકતું નથી. પ્રોફાઇલ તેના બાહ્ય બાકાતોને નોંધે છે અને
હોસ્ટેડ કવરેજ, ટેસ્ટ મેટ્રિસિસ, પૅકેજ અથવા ડિપ્લોયમેન્ટ પુરાવાને બદલે નથી. નીચેની ગદ્ય ઇન્વેન્ટરી
એક સંદર્ભ છે, ગેટ વાસ્તવમાં ચાલ્યો હોવાનો પુરાવો નહીં.

સ્ક્રિપ્ટ્સ `scripts/check/` (નીતિ ગેટ્સ) અને `scripts/quality/` (રૅચેટ એન્જિન) હેઠળ રહે છે.
CI માટે સત્યનો સ્રોત `.github/workflows/ci.yml` છે.

### પ્રકાશિત-બેઝ દસ્તાવેજીકરણ આરોગ્ય

`.github/workflows/i18n-base-health.yml`, `main` અને `release/v*` પર પસંદ કરેલા દબાણ પછી અને મેન્યુઅલ ડિસ્પેચ પર દસ્તાવેજીકરણ આરોગ્યનું નિરીક્ષણ કરે છે. તેના ફિલ્ટર્સ દસ્તાવેજીકરણ, રૂટ માર્કડાઉન, `llm.txt`, અનુવાદ state/configuration અને સંબંધિત i18n ટૂલિંગને આવરી લે છે. સિંગલ `Published base documentation health` જોબ હોસ્ટેડ ઉબુન્ટુ અને પાંચ મિનિટની સમયમર્યાદાનો ઉપયોગ કરે છે. તે ફક્ત-વાંચવા માટે માન્યતા કરે છે અને નિર્ભરતા ઇન્સ્ટોલેશન, અનુવાદ અથવા રાજ્ય અપનાવ્યા વિના ડાયગ્નોસ્ટિક રસીદ લખે છે.

`scripts/i18n/check-base-health.mjs` શૂન્ય સ્ત્રોત-હેશ, ખૂટે-લક્ષ્ય, લક્ષ્ય-હેશ, વાસી-અનુવાદ અને વિભાગ-કેશની અસંગતતાઓની જરૂર છે. તે વર્તમાન કોર document/locale અવકાશ અને તેના રેકોર્ડ કરેલ ઉત્પત્તિને પણ માન્ય કરે છે. અમાન્ય સંદર્ભ, અપૂર્ણ કવરેજ અથવા વિક્ષેપિત તપાસકર્તા `INCOMPLETE` ઉત્પન્ન કરે છે; પુષ્ટિ થયેલ ડ્રિફ્ટ `FAIL` ઉત્પન્ન કરે છે. બંને નિષ્ફળ બહાર નીકળવાની સ્થિતિ પરત કરે છે. રસીદ ચેકઆઉટ SHA, વર્કફ્લો, રન અને પ્રયાસ કરવા માટે બંધાયેલ છે, અને `i18n-base-health-<sha>-<run>-<attempt>` તરીકે જાળવી રાખવામાં આવે છે.

આ પ્રકાશિત આધારનું સ્વતંત્ર અવલોકન છે. તે PR અથવા મર્જ-ગ્રુપ ઇવેન્ટ, જરૂરી PR ચેક, npm ઉપનામ અથવા સ્ટેટિક-સ્કેન પ્રોફાઇલ સભ્ય ઉમેરતું નથી. અંતર્ગત તપાસનાર તમામ પાંચ વર્ગોને સંપૂર્ણ મોડમાં પણ અવરોધિત કરે છે. સામાન્ય PR તૈયારી પ્રવેશથી અલગ રહે છે. સફળ અપલોડ નિષ્ફળ સ્વાસ્થ્ય પરિણામને PASS માં ફેરવી શકતું નથી.

એક સામાન્ય PR `--baseline-evidence` દ્વારા જનરેટ કરાયેલ બેઝ રિપોર્ટ સાથે `--preflight` ઉપયોગ કરે છે. તે અંગ્રેજી સ્ત્રોતને માત્ર ત્યારે જ બાકી રાખી શકે છે જ્યારે સંપૂર્ણ અનુવાદ રેકોર્ડ અને વાસ્તવિક લક્ષ્ય બાઇટ્સ તે ચોક્કસ આધારથી અપરિવર્તિત હોય. નવા લક્ષ્ય અથવા વિભાગ-કેશની અસંગતતાઓ હજુ પણ અવરોધિત છે, અને અપૂર્ણ પુરાવા તૈયારીને અધિકૃત કરી શકતા નથી. રિપોર્ટ `preparationPending` અને `mergeReady` અલગથી ઉજાગર કરે છે: સફળ તૈયારી બાકી રહેલા અનુવાદોને મર્જ કરવા માટે તૈયાર કરતી નથી. પ્રવેશ પહેલાં કમ્પોઝ કરેલ ઉમેદવારમાં અસરગ્રસ્ત અરીસાઓ તાજા કરો. વિશ્વાસપાત્ર મર્જિફાઇ કતાર ઉમેદવાર, `merge_group`, બ્રાન્ચ પુશ અને મેન્યુઅલ CI રન `--warn` અથવા વારસાગત-નિષ્ફળતા માફી વિના, સંપૂર્ણ ચેકરનો ઉપયોગ કરે છે. ગુમ થયેલ લક્ષ્ય હેશ અને કાઢી નાખેલી રેકોર્ડ કરેલી કોર ફાઇલો દ્વારા ઘટાડેલ અવકાશ સફળ નિરપેક્ષ ચુકાદો આપી શકતો નથી.

### રિલીઝ PR ફાસ્ટ-પાથ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs પર CI પૂરક બનાવે છે, `main` પર દબાણ કરે છે, જૂથો મોકલે છે અને મર્જ કરે છે. PRs પાથ-ફિલ્ટર કરેલ ઝડપી તપાસનો ઉપયોગ કરે છે. કાયમી રૂપે અક્ષમ ડુપ્લિકેટ બિલ્ડ દૂર કરવામાં આવ્યું હતું; વાસ્તવિક build/package/boot ચેક CI માં રહે છે.

| જોબ                                              | અવકાશ                                                                                                                                                                                                     | બ્લોકીંગ        |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs અને docs-all                                                                                                                                                                 | હા              |
| `Fast Quality Gates`                             | કોડ PRs; સ્ટેટિક ચેક, ટાઇપચેક, ડેશબોર્ડ ટાઇપચેક, અસરગ્રસ્ત યુનિટ ટેસ્ટ                                                                                                                                    | હા              |
| `Forgotten sibling tests`                        | કોડ PRs; બદલાયેલ મોડ્યુલો સ્થિર ગ્રાહકો અને ઉમેદવાર ભાઈ-બહેનના પરીક્ષણો માટે શોધાયેલ છે; બેરલ અને ડાયનેમિક-ઇમ્પોર્ટ પાથને સલાહકારી ડાયગ્નોસ્ટિક્સ તરીકે નોંધવામાં આવે છે, સંદર્ભિત અનુમતિસૂચિ અપવાદો સાથે | **સલાહકાર**     |
| `No new ESLint warnings`                         | કોડ PRs; સપ્રેસન્સ-અવેર લિન્ટ ગાર્ડ                                                                                                                                                                       | હા, ફોર્કસ સહિત |
| `Merge integrity (changelog + generated skills)` | બિન-ડ્રાફ્ટ PRs; ચેન્જલોગ અને જનરેટ કરેલ કૌશલ્ય સમન્વયન                                                                                                                                                   | હા, ફોર્કસ સહિત |

#### ભૂલી ગયેલા ભાઈ-બહેનના ટેસ્ટ રિપોર્ટ

`npm run check:forgotten-sibling-tests` ટેસ્ટ-ઇમ્પેક્ટ મેપ પાછળ આયાત રિઝોલ્વરનો ફરીથી ઉપયોગ કરે છે. દરેક બદલાયેલ ઉત્પાદન મોડ્યુલ માટે, જ્યારે ઉમેદવાર પરીક્ષણ પુલ-રિક્વેસ્ટ ડિફમાંથી ગેરહાજર હોય ત્યારે તે નિર્ણાયક `changed module/symbol -> static consumer -> candidate sibling test` સાંકળોની જાણ કરે છે. માર્કડાઉન સારાંશ અને JSON પરિણામ કોઈપણ બ્લોકિંગ રોલઆઉટ પહેલાં માપાંકન માટે `forgotten-sibling-tests` વર્કફ્લો આર્ટિફેક્ટ તરીકે જાળવી રાખવામાં આવે છે.

બેરલ પુન: નિકાસ અને ગતિશીલ આયાત માત્ર રીઝોલ્યુશન ડાયગ્નોસ્ટિક્સ છે; તેઓ ક્યારેય અવરોધિત શોધ બનાવતા નથી. સમીક્ષા કરેલ અપવાદો `config/quality/forgotten-sibling-allowlist.json` માં જીવંત છે. દરેક એન્ટ્રીએ ઉપભોક્તા અને ઉમેદવારની કસોટીનું નામ આપવું જોઈએ, ચોક્કસ તર્ક આપવો જોઈએ અને GitHub ઈશ્યૂ અથવા પુલ વિનંતીને લિંક કરવી જોઈએ. દૂષિત એન્ટ્રીઓ નિષ્ફળ બંધ થઈ. અપવાદો કાઢી નાખેલ ઉમેદવાર પરીક્ષણ અથવા `.skip`/`.todo` ઉમેરતા તફાવતને દબાવી શકતા નથી; દાવો નબળો પડવો અને અન્ય માસ્કિંગ સ્વતંત્ર રીતે અવરોધિત `check:test-masking` ગેટની માલિકીની રહે છે.

### Job: `lint`

`main` માટેના દરેક PR પર ચાલે છે. નિષ્ફળતા આવે તો mergeને અવરોધે છે.

| સ્ક્રિપ્ટ (`npm run ...`)         | શું માન્ય કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | અવરોધક                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js આવૃત્તિ સમર્થિત શ્રેણીમાં છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | હા                                      |
| `check:cycles`                    | સમગ્ર `src/` + `open-sse/` માં ચક્રીય imports (AST-આધારિત, tsconfig `paths` ઉકેલાયેલા). કોઈપણ cycle અસ્તિત્વમાં હોય ત્યારે Bare exit 1 કરે છે (#15281 થી fail-closed) અને SCCs ની યાદી આપે છે. `check:cycles:ratchet` (જે CI ચલાવે છે) ત્યારે અવરોધે છે જ્યારે સંખ્યા `quality-baseline.json` માંની `metrics.cycles` મર્યાદાને ઓળંગે — હાલમાં 14, `direction: down`, તેથી તે માત્ર ઘટી શકે છે (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા (ratchet)                            |
| `check:boundary`                  | `open-sse → src` coupling: engine માંથી app તરફના અનન્ય file-to-file imports (`scripts/quality/measure-boundary.mjs`; edge list એ v4 core/module-split remediation backlog છે). Bare = સલાહકારી અહેવાલ (`quality:boundary` જેવો જ). `check:boundary:ratchet` (જે CI ચલાવે છે અને `quality.yml` fast-gates ratchet loop માં પણ છે) ત્યારે અવરોધે છે જ્યારે સંખ્યા `quality-baseline.json` માંની `metrics.boundaryOpenSseToSrc` મર્યાદાને ઓળંગે — માપવામાં આવેલા 771 પર seeded, `direction: down`; `--update` તેને માત્ર ઘટાડે છે; PRs પર base-relative (`--base-ref`, નીચે જુઓ)                                                                                                                                                                                                                                                                                                                                                                                  | હા (ratchet)                            |
| `check:route-validation:t06`      | તમામ routes પર Zod schemas હાજર છે (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any`ની સંખ્યા બજેટથી વધતી નથી (ટિયર 11 પ્રવેશદ્વાર)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | હા                                      |
| `check:provider-consistency`      | `providers.ts`માંના દરેક પ્રદાતા માટે `providerRegistry.ts`માં મેળ ખાતી એન્ટ્રી છે (અને તેનાથી વિપરીત પણ, મંજૂરીસૂચિની મર્યાદામાં)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:model-lifecycle`           | હાથથી જાળવવામાં આવતા ત્રણ રૂટિંગ ટેબલ ચેક-ઇન કરેલા લાઇફસાઇકલ સ્નૅપશૉટ (#11503) સાથે સુસંગત રહે છે: `FITNESS_TABLE` (`taskFitness.ts`) એવા કોઈ નિવૃત્ત idને સ્કોર કરતું નથી જેને `REGISTRY` રૂટ કરી શકે; દરેક `BUILT_IN_ALIASES` લક્ષ્ય `REGISTRY`માં હાજર અને નિવૃત્ત-id સ્નૅપશૉટમાં ગેરહાજર છે; `REGISTRY`માં હજુ રહેલા દરેક નિવૃત્ત idને ફૉરવર્ડ કરવામાં આવ્યો છે અથવા `allowedRetiredInCatalog`માં સૂચિબદ્ધ કરવામાં આવ્યો છે; અને `DEFAULT_DEGRADATION_MAP`નો કોઈ સ્રોત કે લક્ષ્ય તે સ્નૅપશૉટમાં નિવૃત્ત તરીકે દેખાતો નથી. આ સાબિત કરતું નથી કે હાલમાં કોઈ મોડેલ લાઇવ અપસ્ટ્રીમ દ્વારા સર્વ કરવામાં આવે છે. ઑફલાઇન — `config/quality/model-lifecycle.json` સાથે સરખામણી કરે છે, જેને `npm run quality:refresh-model-lifecycle` વડે હાથથી રિફ્રેશ કરવામાં આવે છે (નેટવર્ક; CI સાથે જોડાયેલું નથી). `allowedRetiredInCatalog` એક ક્રમશઃ ઘટાડવાનું રૅચેટ છે: ટ્રૅકિંગ ઇશ્યૂ હોય ત્યારે જ એન્ટ્રી ઉમેરો.                                                         | હા                                      |
| `check:fetch-targets`             | ક્લાયન્ટ-સાઇડ `src/`માંનું દરેક `fetch("/api/...")` વાસ્તવિક `route.ts`માં રિઝૉલ્વ થાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:deps`                      | રિપોઝિટરીમાંના દરેક `package.json`માંની `npm install` કરી શકાય તેવી બધી ડિપેન્ડન્સીઓ `dependency-allowlist.json`માં છે; નવી અનપિન કરેલી અથવા સ્લોપસ્ક્વૉટ કરેલી પૅકેજો ફ્લૅગ થાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | હા                                      |
| `audit:deps`                      | પાંચેય સ્વતંત્ર લૉકફાઇલોનું npm ઑડિટ (રૂટ, Electron, OpenCode plugins v1/v2 અને પ્રદાતા). ગંભીર ઍડવાઇઝરીઝ અવરોધે છે; ઉચ્ચ-સ્તરની ઍડવાઇઝરીઝ દૃશ્યમાન ચેતવણીઓ તરીકે રહે છે. ગુમ થયેલા/નિષ્ફળ ઑડિટ્સ INCOMPLETE ગણાય છે અને અવરોધે છે; દરેક સ્કોપના લૉક હૅશ અને રિપોર્ટ્સ જાળવી રાખવામાં આવે છે.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                      |
| `check:lockfile`                  | `package-lock.json` અખંડિતતા — https રજિસ્ટ્રી, અખંડિતતા હૅશ, કોઈ હોસ્ટ ઓવરરાઇડ નહીં                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | હા                                      |
| `check:licenses`                  | પ્રોડક્શન ડિપેન્ડન્સીઓ માટે SPDX લાઇસન્સ મંજૂર-સૂચિ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | હા                                      |
| `check:tracked-artifacts`         | કોઈ બિલ્ડ આર્ટિફેક્ટ્સ / કમિટ કરેલી `node_modules` સિમલિંક્સ નહીં (husky pre-commitમાં પણ ચાલે છે; pre-push ઇરાદાપૂર્વક હળવું છે — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:ai-attribution`            | PR કમિટ્સ, શીર્ષક અથવા બોડીમાં કોઈ AI/bot `Co-Authored-By` ટ્રેલર અથવા AI-જનરેશન ફૂટર નહીં — કડક નિયમ #16 (`quality.yml`ના PR→`release/**` માટેના fast-gates લૂપમાં — ઇવેન્ટ પેલોડ વાંચે છે, PR ન હોય ત્યારે કોઈ કાર્યવાહી કરતું નથી — અને PR→`main` માટે `ci.yml` lintમાં માત્ર-PR સ્ટેપ; તેમજ husky `commit-msg` હૂક; માનવીય સહ-લેખકોને મંજૂરી છે; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | દરેક Vitest અપવાદ ટ્રૅકિંગ ઇશ્યૂનો ઉલ્લેખ કરે અને `config/quality/vitest-exclusions.json`માં દેખાય (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `check:file-size`                 | સોર્સ ફાઇલો (`src/`, `open-sse/`, `electron/`, `bin/`માં `.ts`/`.tsx`) `cap`ની અને ટેસ્ટ ફાઇલો (`*.test.ts(x)`) `testCap`ની મર્યાદામાં રહે; `file-size-baseline.json`માં સ્થિર કરેલી ફાઇલો (`frozen` / `testFrozen`) તેમના નોંધાયેલા કદથી વધુ મોટી ન થવી જોઈએ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                      |
| `check:error-helper`              | executors/handlers માં error responses `buildErrorBody()` / `sanitizeErrorMessage()` નો ઉપયોગ કરે છે (કડક નિયમ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | હા                                      |
| `check:migration-numbering`       | Migration SQL ફાઇલો ક્રમિક રીતે ક્રમાંકિત છે, કોઈ ખાલી ક્રમાંક કે ડુપ્લિકેટ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | હા                                      |
| `check:public-creds`              | `publicCreds.ts` ની બહાર કોઈ literal OAuth `client_id`/`client_secret` અથવા Firebase Web keys નથી (કડક નિયમ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા                                      |
| `check:db-rules`                  | `src/lib/db/` modules ની બહાર કોઈ raw SQL નથી; `localDb.ts` માંથી કોઈ barrel-imports નથી (કડક નિયમો #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:known-symbols`             | તેમની dispatch tables માં નોંધાયેલા provider executors, routing strategies અને translators ડિસ્ક પરની ફાઇલો સાથે મેળ ખાય છે — કોઈ orphaned અથવા undeclared symbols નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:route-guard-membership`    | child process શરૂ કરતો દરેક route `isLocalOnlyPath()` દ્વારા વર્ગીકૃત થયેલો છે (કડક નિયમો #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:test-discovery`            | રેપોમાંની દરેક `*.test.ts` / `*.spec.ts` ફાઇલ ઓછામાં ઓછા એક ટેસ્ટ રનર દ્વારા એકત્રિત થાય છે (રેચેટ: `test-discovery-baseline.json` માં અનાથ ફાઇલોની યાદી માત્ર ઘટી શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:test-tla-order`            | `tests/unit` હેઠળની કોઈપણ `node:test` ફાઇલ ટેસ્ટ રજીસ્ટર કર્યા પછી ટોચ-સ્તરીય `await` સુધી પહોંચીને ત્યારબાદ વધુ ટેસ્ટ રજીસ્ટર કરતી નથી (#18045; રેચેટ: `test-tla-order-allowlist.json` માત્ર ઘટી શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:agent-skills-sync`         | જનરેટ કરેલી એજન્ટ-સ્કિલ્સ આર્ટિફેક્ટ્સ તેમના સ્રોત કેટલોગ સાથે મેળ ખાય છે (કોઈ વિચલન નથી)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | પ્રોવાઇડર લોગો/એસેટ્સ સાથે નોંધાયેલી ઉત્પત્તિ એન્ટ્રી હોય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON કૉન્ફિગ ફાઇલો પાર્સ થાય છે અને રેપોના લિન્ટ નિયમોનું પાલન કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | ભૂલો વિના TypeScript કમ્પાઇલેશન (માત્ર સલાહરૂપ ચેતવણીઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | હા                                      |
| `typecheck:noimplicit:core`       | કડક `noImplicitAny` — ભવિષ્યલક્ષી; ઘણા પૂર્વ-અસ્તિત્વ ધરાવતા કૉલ સાઇટ્સને હજુ પણ એનોટેશન્સની જરૂર છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **સલાહરૂપ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` સુધી મર્યાદિત `tsc` (#7033) — `typecheck:core`ની કાળજીપૂર્વક પસંદ કરેલી 27-ફાઇલની મંજૂરીસૂચિમાં કોઈ dashboard TSX સામેલ નથી, અને `next build` પણ ક્યારેય તેનું type-check કરતું નથી (`next.config.mjs`માં `ignoreBuildErrors: true` સેટ કરેલું છે), તેથી ત્યાંના અનાથ-identifier regression (#6625/#6909) CI માટે અદૃશ્ય હતા. સ્થિર કરેલા પ્રતિ-ફાઇલ/પ્રતિ-TS-code ગણતરી baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` જેવી જ stale-enforcement પૅટર્ન) સામે તફાવત તપાસે છે — baselineમાં રહેલી ગણતરી કરતાં માત્ર નવી ભૂલો જ gateને નિષ્ફળ બનાવે છે; અગાઉથી રહેલી ભૂલ સુધારાય ત્યારે `--update` વડે ratchet ઘટાડો.                                                                                                                                                                                                                                                                               | હા                                      |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) પર સમગ્ર એપ્લિકેશનનું production type check, જેને `typecheck:core` ની 27-ફાઇલની allowlist અને dashboard gate આવરી લેતા નથી. `config/quality/build-typecheck-baseline.json` સામે તફાવત ચકાસવામાં આવે છે; નવી અથવા વધેલી પ્રતિ-(ફાઇલ, code) ગણતરી નિષ્ફળતા લાવે છે, જ્યારે ઓછી ગણતરી તમને ratchet કરવા કહે છે. રનમાં નવી અથવા વધેલી જોડી હોય ત્યારે `--update` ઇનકાર કરે છે, સિવાય કે `--force-regressions` આપવામાં આવે, અને નવી રીતે silenced થયેલી ફાઇલ માટે `--force-nocheck` વિના ઇનકાર કરે છે; તેથી green મેળવવા baseline ને વિસ્તૃત કરવું અને કાયમી silence આપવું બે અલગ, ઇરાદાપૂર્વક કરવાના પગલાં છે. ખાલી `--force` નકારવામાં આવે છે. ઉપરાંત, build scope માં `@ts-nocheck` માટે `config/quality/ts-nocheck-baseline.json` સામે સ્કેન કરવામાં આવે છે, કારણ કે તેનો ઉપયોગ કરતી ફાઇલ કોઈ diagnostics રિપોર્ટ કરતી નથી અને અન્યથા દરેક gate માટે અદૃશ્ય રહેશે. | હા                                      |

#### બે typecheck પ્રોગ્રામ અલગ રીતે જવાબ આપે છે

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) અને `check:build-typecheck` અલગ options હેઠળ અલગ પ્રોગ્રામ્સ
compile કરે છે, અને એ જ ફાઇલ એકમાં સ્વચ્છ પરંતુ બીજામાં errorsથી ભરેલી હોઈ શકે છે.

`tsconfig.build.json` `"strict": false` સેટ કરે છે, તેથી `noImplicitAny` બંધ છે. core
config વધુ કડક options સાથે પસંદ કરેલી 27-ફાઇલની allowlist compile કરે છે અને દરેક
entryના import graph ને અનુસરે છે, તેથી build program માં ક્યારેય દેખાતી ન હોય તેવી
ફાઇલો પણ ત્યાં ચકાસાય છે.

ફાઇલ typed છે કે નહીં તે નક્કી કરતી વખતે આ પરિણામ મહત્વનું છે: **`check:build-typecheck`
હેઠળ zero diagnostics હોવાનો અર્થ zero નથી**. 26 ફાઇલોમાંથી `@ts-nocheck` દૂર કરતાં
build program માં 23 ફાઇલો સ્વચ્છ હોવાનું જણાયું; તેમાંથી સોળ ફાઇલોએ strict પ્રોગ્રામમાં
લગભગ 120 implicit-any errors દર્શાવ્યા. ફાઇલને સ્વચ્છ કહેતાં પહેલાં બંને ચકાસો.

### Job: `quality-gate`

`test-coverage` પછી ચાલે છે. નિષ્ફળતા પર mergeને અવરોધે છે.

| Script                       | શું ચકાસે છે                                                                                                                                        | અવરોધક                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` ઉત્પન્ન કરે છે (ESLint ચેતવણીઓની સંખ્યા, મર્જ કરેલા shard reportમાંથી coverage)                                              | હા (ratchetનું upstream) |
| `quality:ratchet`            | `quality-baseline.json`માં દરેક metricનું regression થયું નથી (ESLint ચેતવણીઓ ≤ baseline; coverage ≥ baseline)                                      | હા                       |
| `check:duplication`          | Code duplication (jscpd@4) `quality-baseline.json`માંના baselineને વટાવતું નથી                                                                      | હા                       |
| `check:complexity`           | ફાઇલ-સ્તરની cyclomatic complexity capને વટાવતી નથી (core ESLint `complexity` + `max-lines-per-function`)                                            | હા                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — અલગ ESLint pass; CI બંનેને એક જ `check:complexity-ratchets` step તરીકે મર્જ કરીને ચલાવે છે | હા                       |
| `check:dead-code`            | વણવપરાયેલા exports / files માટેનું ratchet (knip) baselineની સરખામણીમાં regress થતું નથી                                                            | હા                       |
| `check:compression-budget`   | Compression benchmark budget — પ્રતિ-engine token-savingsની લઘુત્તમ મર્યાદાઓ regress થવી જોઈએ નહીં                                                  | હા                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regress થતું નથી; મોટા ભાગે `typecheck:noimplicit:core`ને સમાવી લે છે                                       | હા                       |

### Jobs: `codeql-scan` અને `codeql-admission`

`codeql-scan` બધી configured analysis categories બનાવે છે. એ job સફળ થયા પછી `codeql-admission` તેના ચોક્કસ uploads અને candidate alert ratchet ચકાસે છે. બંને `Gate / CI` ની ફરજિયાત dependencies છે, ફક્ત docs બદલતા candidates માટે પણ. વહીવટી activation અને canary જરૂરિયાતો નીચે "CodeQL ratchet" માં સમજાવેલી છે.

| Script                 | શું ચકાસે છે                                                                                                                                                                      | રોકે છે |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:codeql-ratchet` | Alert ratchet પહેલાં candidate ref/SHA અને બધી configured analysis categories વર્તમાન હોવી જોઈએ; પુરાવો ન હોય તો રોકે છે. Global inventory અલગ રહે છે — નીચે "CodeQL ratchet" જુઓ | હા      |

### Job: `quality-extended`

આ job લાગુ પડતા candidatesને અવરોધે છે. Bundle size, secret findings, vulnerability
findings, workflow findings અને OpenAPI ફેરફારો આવશ્યક ratchets વડે તપાસવામાં આવે છે.
Circular-dependency diagnostics માત્ર સલાહરૂપ રહે છે. Scanner installation આવશ્યક છે:
`scripts/ci/install-quality-scanners.sh` નિર્ધારિત versions ઉપલબ્ધ કરાવે છે અને
installation failuresને આગળ પ્રસારિત કરે છે. ગેરહાજર tools, અમાન્ય reports અથવા ગેરહાજર baselinesને કારણે
આવશ્યક scanner gate INCOMPLETE રહે છે.

| સ્ક્રિપ્ટ                | શું માન્ય કરે છે                                                                                                                                                                                            | અવરોધક                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:circular-deps`    | કોઈ ચક્રીય નિર્ભરતાઓ નથી (dpdm)                                                                                                                                                                             | **સલાહરૂપ**                             |
| `check:bundle-size`      | બંડલનું કદ મર્યાદાથી વધતું નથી; માપ ઉપલબ્ધ ન હોય તો નિષ્ફળતા થાય છે                                                                                                                                         | **--ratchet સાથે અવરોધક**               |
| `check:secrets`          | Gitleaksનાં તારણોમાં પ્રતિકૂળ ફેરફાર થતો નથી; જરૂરી સ્કૅન ગુમ થયેલાં ટૂલ/સોર્સ/બેઝલાઇન, નિષ્ફળ સ્કૅન અને અમાન્ય રિપોર્ટને નકારે છે                                                                          | **--ratchet સાથે અવરોધક**               |
| `check:vuln-ratchet`     | નિર્ભરતાઓની નબળાઈઓમાં પ્રતિકૂળ ફેરફાર થતો નથી; જરૂરી સ્કૅન ગુમ થયેલાં ટૂલ, અમાન્ય રિપોર્ટ અથવા ગુમ થયેલી બેઝલાઇનને નકારે છે                                                                                 | **--ratchet સાથે અવરોધક**               |
| `check:workflows`        | વર્કફ્લો લિન્ટ (actionlint + zizmor); ગુમ/ખામીયુક્ત સ્કૅનર, અમાન્ય રિપોર્ટ અથવા ગુમ થયેલી રૅચેટ બેઝલાઇનને કારણે INCOMPLETE તરીકે નિષ્ફળતા થાય છે. માન્ય તારણો પસંદ કરેલી કડક/સલાહરૂપ/રૅચેટ નીતિને અનુસરે છે | અમલ જરૂરી; CIમાં zizmor રૅચેટ અવરોધક છે |
| `check:openapi-breaking` | પિન કરેલા ઇવેન્ટ કમિટ્સ સામે જાહેર API કરાર (PR merge-base, push before, merge-group base; શેડ્યૂલ કરેલા/મેન્યુઅલ ચેકઆઉટ માટે પ્રથમ પેરેન્ટ); જરૂરી માપન નિષ્ફળ થાય તો બંધ રીતે નિષ્ફળ થાય છે               | **--ratchet સાથે અવરોધક**               |

### જોબ: `docs-sync-strict`

`main` અથવા `release/**` ને પુલ વિનંતીઓ માટે, આ નોકરી ફક્ત બિન-ડ્રાફ્ટ (અથવા વિશ્વસનીય કતાર) ઉમેદવારો માટે જ ચાલે છે જે દસ્તાવેજીકરણ અથવા કોડ ફેરફારો તરીકે વર્ગીકૃત કરવામાં આવે છે. તે બિન-PR CI ઇવેન્ટ્સ પર પણ ચાલે છે; આ વર્કફ્લોનું પુશ ટ્રિગર માત્ર `main` આવરી લે છે, `release/**` નહીં. એક પગલું જે શૂન્ય સિવાયની બહાર નીકળે છે તે કામને અવરોધે છે; માત્ર અહેવાલ-નિષ્કર્ષો અને નીચે દસ્તાવેજીકૃત મુક્તિ નથી.

| સ્ક્રિપ્ટ                      | શું માન્ય કરે છે                                                                                                                                                                                                                                                                                                                                                                            | અવરોધક                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | નીચેના 7 પેટા-ગેટ ક્રમિક રીતે ચલાવતું મેટા-ગેટ                                                                                                                                                                                                                                                                                                                                              | હા                                                                                                                                           |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG સંસ્કરણ સુસંગતતા, ચોક્કસ `llm.txt` અરીસાઓ, અનુવાદિત CHANGELOG section/size અપરિવર્તન, અને સુપરસેડ ડુપ્લિકેટ દસ્તાવેજોની ગેરહાજરી                                                                                                                                                                                                                                  | હા                                                                                                                                           |
| ↳ `check:docs-frontmatter`     | સંકલિત દસ્તાવેજીકરણ પૃષ્ઠો માન્ય ફ્રન્ટમેટર શીર્ષકો ધરાવે છે                                                                                                                                                                                                                                                                                                                                | હા                                                                                                                                           |
| ↳ `check:docs-counts`          | ઉચ્ચ-આત્મવિશ્વાસની ગણતરીના અનિવાર્ય કડક છે; હ્યુરિસ્ટિક ફાઇલ-કાઉન્ટ ચેક્સ માત્ર ચેતવણી આપે છે સિવાય કે સ્ક્રિપ્ટ `--strict` મેળવે છે ( CI મેટા-ગેટ તેને પસાર કરતું નથી)                                                                                                                                                                                                                     | કડક સ્તર અવરોધિત; નરમ સ્તરની સલાહ                                                                                                            |
| ↳ `check:env-doc-sync`         | સ્ત્રોત env વાંચે છે, `.env.example`, અને `docs/reference/ENVIRONMENT.md` સ્પષ્ટ અવગણના પછી સંમત થાય છે, માત્ર-દસ્તાવેજ, અને માત્ર-માત્ર env-સૂચિઓ                                                                                                                                                                                                                                          | હા, દસ્તાવેજી મંજૂર સૂચિની બહાર                                                                                                              |
| ↳ `check:deprecated-versions`  | અવગણવામાં આવેલા દસ્તાવેજોને બાદ કરતાં, સુરક્ષિત ઐતિહાસિક સંદર્ભો અને વાસી અપડેટ તારીખોની બહાર સંભવિત વાસી સંસ્કરણોની જાણ કરે છે                                                                                                                                                                                                                                                             | વર્તમાન CI વાયરિંગમાં એડવાઈઝરી (`--strict` પાસ થયેલ નથી)                                                                                     |
| ↳ `check:doc-links`            | ડોક્સમાં આંતરિક માર્કડાઉન લિંક્સ વાસ્તવિક ફાઇલો (`[text]`/`(path)` ફોર્મ) સાથે ઉકેલે છે                                                                                                                                                                                                                                                                                                     | હા                                                                                                                                           |
| ↳ `check:fabricated-docs`      | રૂટ્સ, env vars, CLI આદેશો, હૂક નામો અને દસ્તાવેજમાં ટાંકવામાં આવેલ ફાઇલ પાથ કોડબેઝમાં અસ્તિત્વ ધરાવે છે. `--strict` દ્વારા સખત દરવાજો; ધ્વજ વિના નરમ-નિષ્ફળ.                                                                                                                                                                                                                               | હા ( CI માં `--strict` દ્વારા)                                                                                                               |
| `check:cli-i18n`               | CLIમાં વપરાતી `t()` કીઝ `en`માં છે; `pt-BR` દરેક ટોચના સ્તરનો વિભાગ જાળવે છે; `zh-CN` અને `zh-TW`માં `en`ની દરેક કી છે                                                                                                                                                                                                                                                                      | હા                                                                                                                                           |
| `check:openapi-coverage`       | OpenAPI સ્પેક વાસ્તવિક રૂટ્સના ઓછામાં ઓછા રૅચેટ કરેલા લઘુત્તમ સ્તરને આવરી લે છે                                                                                                                                                                                                                                                                                                             | હા                                                                                                                                           |
| `check:openapi-security-tiers` | જાહેર કરેલા `x-loopback-only`/`x-always-protected` ઍનોટેશન્સને `routeGuard.ts`માં આધાર મળવો જોઈએ; પાર્સરની ભૂલો અને આગળની દિશાની ચકાસણીમાં અસંગતતાઓ અવરોધે છે. ફક્ત સ્થાનિક ઍક્સેસ માટેના ઉપસર્ગો હેઠળ `x-loopback-only` ગાયબ છે કે નહીં તેની વિપરીત દિશાની ચકાસણી ચેતવણી આપે છે, અને ફક્ત પેટર્નથી નિર્ધારિત રૂટ્સ તે વિપરીત ચકાસણીમાંથી બાકાત રહે છે.                                     | પાર્સર અને આગળની દિશાની ચકાસણીઓ અવરોધક છે; વિપરીત ચકાસણી સલાહરૂપ છે                                                                          |
| `check:openapi-routes`         | કારણ સાથે નોંધેલી `KNOWN_STALE_SPEC` મંજૂરી-યાદી લાગુ કર્યા પછી `openapi.yaml`માંનો દરેક `/api...` પાથ પરિમાણોના તફાવતોને અવગણીને વાસ્તવિક રૂટ સાથે મેળ ખાય છે; મંજૂરી-યાદીની હવે લાગુ ન પડતી નોંધો પણ નિષ્ફળતા લાવે છે                                                                                                                                                                     | હા                                                                                                                                           |
| `check:docs-symbols`           | નકલરૂપ ન હોય તેવા અધિકૃત મૂળ દસ્તાવેજોના આંતરિક `/api/...` URL સંદર્ભો વાસ્તવિક રૂટ અથવા રૂટ-સમૂહ સાથે મેળ ખાય છે; પ્રોક્સી/અપસ્ટ્રીમ/પ્લેસહોલ્ડર/ફાઇલ સંદર્ભો અને કારણ સાથે નોંધેલી `KNOWN_STALE_DOC_REFS` નોંધો બાકાત છે, અને મંજૂરી-યાદીની હવે લાગુ ન પડતી નોંધો નિષ્ફળતા લાવે છે                                                                                                        | હા                                                                                                                                           |
| `i18n translation drift`       | સંપૂર્ણ પ્રવેશ માટે શૂન્ય સ્રોત, ખૂટે-લક્ષ્ય, લક્ષ્ય-હેશ, વાસી-અનુવાદ અને વિભાગ-કેશની અસંગતતાઓની જરૂર છે. સામાન્ય PR તૈયારી ચોક્કસ વારસાગત પુરાવા અથવા અપરિવર્તિત સંપૂર્ણ સ્થિતિ અને લક્ષ્ય બાઇટ્સ સાથે માત્ર અંગ્રેજી-માત્ર બાકી ફેરફાર જાળવી શકે છે; તેનો અહેવાલ અલગથી મર્જની તૈયારી જાહેર કરે છે. ખૂટે લક્ષ્ય હેશ અને અપૂર્ણ આધાર પુરાવા બ્લોક. ગેરહાજર લેગસી સેક્શન કેશ એ નિષ્ફળતા નથી. | તમામ પાંચ વર્ગો queue/base પ્રવેશને અવરોધે છે; સામાન્ય તૈયારીની પરવાનગી માત્ર વારસામાં મળેલ અથવા માત્ર અંગ્રેજી-માત્ર બાકી કામ પુરવાર કરે છે |

`docs/diagrams/` હેઠળ બાર README SVGs જનરેટ થાય છે (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` તે બધાને ફરીથી બનાવે છે). દરેક પાસે બાઈટ-સરખામણી યુનિટ ટેસ્ટ (`tests/unit/docs/readme-*-svg.test.ts`, જોબ `test-unit`) હોય છે જે પ્રતિબદ્ધ ફાઇલ વાસી હોય ત્યારે નિષ્ફળ જાય છે, અને `check:docs-counts` તેમના `<text>` નોડ્સ — માંથી પ્રમાણભૂત નંબરો વાંચે છે, તેથી જ આઉટલાઇનિંગ સ્ટેપ ફાઇલમાં દરેક આઉટલાઇન સ્ટ્રિંગને અદ્રશ્ય `<text>` તરીકે રાખે છે. SVG કેનોનિકલ-નંબર ચેક `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) માં સૂચિબદ્ધ ફાઇલોને વાંચે છે : `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, વત્તા `public/images/tier-flow-dark.svg` અને `tier-flow-light.svg`; ફ્રી-એવર, કેટલોગ-એન્ટ્રી, રિકરિંગ-પૂલ અને સ્કોરિંગ-પરિબળોના દાવાઓ પણ `promise-pillars.svg`, `free-tier-budget.svg` અને `strategies-grid.svg` વાંચે છે. `free-tier-budget.svg` લાઇવ કેટલોગ લોડરમાંથી તેના આંકડાઓ દોરે છે, તેથી `FREE_MODEL_BUDGETS` અથવા પ્રદાતા ડિસ્પ્લે નામમાં ફેરફાર જ્યાં સુધી તે ફાઇલ ફરીથી જનરેટ ન થાય ત્યાં સુધી CI લાલ કરે છે.

### Job: `i18n-ui-coverage`

| સ્ક્રિપ્ટ                         | શું માન્ય કરે છે                                                                                                                                                                   | અવરોધક     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (ઇનલાઇન) | UI i18n કી કવરેજ ≥ 65% છે                                                                                                                                                          | હા         |
| `check-ui-value-drift` (ઇનલાઇન)   | ફરીથી લખાયેલું અંગ્રેજી **મૂલ્ય** પાછળ કોઈ જૂનો અનુવાદ છોડતું નથી                                                                                                                  | હા         |
| `check-new-key-coverage` (ઇનલાઇન) | **નવી** અંગ્રેજી કી દરેક લોકેલમાં અનુવાદિત છે — `__MISSING__:` માર્કર નકારવામાં આવે છે                                                                                             | હા         |
| `check-translation-ratio`         | લોકેલ દીઠ વાસ્તવિક-અનુવાદ ગુણોત્તર (અંગ્રેજી-સમાન / પ્લેસહોલ્ડર / મંજૂરીસૂચિની બહારની ગુમ થયેલી લીવ્સ) `config/quality/i18n-translation-baseline.json` + છૂટ કરતાં વધુ ન હોવો જોઈએ | **અવરોધક** |

`fetch-depth: 0` જરૂરી છે — વેલ્યૂ-ડ્રિફ ગેટ મર્જ બેઝ સામે `en.json` નો તફાવત જુએ છે.

#### `check-ui-value-drift` — જૂના અનુવાદ માટેનો ગેટ

આ તે એક i18n રિગ્રેશન પકડે છે જેને અન્ય ગેટ માળખાકીય રીતે જોઈ શકતા નથી: અંગ્રેજી મૂલ્ય
ફરીથી લખાય છે અને _પહેલાના_ અંગ્રેજીમાંથી બનેલા અનુવાદો યથાવત્ રહી જાય છે, જેથી
બિન-અંગ્રેજી વપરાશકર્તાઓ આત્મવિશ્વાસપૂર્વક લખાયેલું, પરંતુ હવે ખોટું લખાણ વાંચતા રહે છે.

આ ખરેખર રિલીઝ થઈ ગયું હતું. Antigravity લૉગિન હેલ્પર ઉમેરાયો ત્યારે (#5203)
`oauthModal.googleOAuthWarning` ફરીથી લખવામાં આવ્યું હતું; **43માંથી 39 લોકેલ્સમાં** ઑપરેટરોને "સંપૂર્ણ
URL કૉપી કરીને નીચે પેસ્ટ કરો" એવું કહેતો ટેક્સ્ટ યથાવત્ રહ્યો — એવી પ્રક્રિયા જે તે પ્રદાતા માટે પૂર્ણ થઈ શકતી નથી. તે
#8463 સુધી ધ્યાનમાં આવ્યું નહીં, કારણ કે:

- `sync-ui-keys` માત્ર **ગેરહાજર** કીઓને જ બૅકફિલ કરે છે, **જૂની** કીઓને ક્યારેય નહીં;
- `check-ui-keys-coverage` કીની _હાજરી_ ગણે છે, તેથી જૂનો અનુવાદ પણ આવરી લેવાયેલો ગણાય છે;
- `check-translation-drift` `docs/i18n/<locale>/**.md` દસ્તાવેજીકરણ મિરર્સને ટ્રૅક કરે છે —
  તે ક્યારેય `src/i18n/messages/*.json` વાંચતું નથી. 2026-09ના પુનઃ-સિંકથી `docs-sync-strict` જૉબમાં અવરોધક:
  મુખ્ય દસ્તાવેજ સંપાદિત કરો → `npm run i18n:run -- --files=<doc>` (વિભાગ-સ્તરીય, ઓછા ખર્ચાળ).

**તફાવત-અવેર, બેઝલાઇન-આધારિત નહીં.** તે મર્જ બેઝ પરના `en.json` ની કાર્યરત
ટ્રી સાથે તુલના કરે છે; જે દરેક કીનું અંગ્રેજી મૂલ્ય બદલાયું હોય, તેના માટે કોઈ પણ લોકેલમાં હજી યથાવત્ રહેલો
અનુવાદ જૂનો ગણાય છે. આ ઇરાદાપૂર્વક **પહેલેથી અસ્તિત્વમાં રહેલું દેવું સ્થિર રાખે છે** — લાંબા સમયથી રહેલો
અનુવાદ કયા જૂના અંગ્રેજીમાંથી આવ્યો હતો તે તફાવત બતાવી શકતો નથી, તેથી ગેટ ફક્ત વર્તમાન ફેરફાર જે સ્પર્શે
તેને જ ચકાસે છે. વિકલ્પ (પ્રતિ-કી હૅશ બેઝલાઇન) માટે લગભગ 600 KBની જનરેટ કરેલી ફાઇલ જોઈએ,
જે હાલની સૌથી મોટી બેઝલાઇન કરતાં 3× મોટી છે અને દરેક i18n PR પર બદલાતી રહે.

તેને સંતોષવાના બે માર્ગ છે:

1. અસરગ્રસ્ત અનુવાદો અપડેટ કરો, અથવા
2. તેમને `__MISSING__:<new english>` પર સેટ કરો — પછી રનટાઇમ સુધારેલું અંગ્રેજી આપે છે
   (`src/i18n/request.ts::deepMergeFallback`, #7258) અને કી અનુવાદ માટે કતારમાં ઉમેરાય છે.

જો સ્ટ્રિંગનો **અર્થ** બદલાયો હોય, તો **કીનું નામ બદલવાનું** પસંદ કરો: નવી કી જૂનો
અનુવાદ વારસામાં મેળવી શકતી નથી. #8463માં આ જ પેટર્ન વપરાયું હતું.

```bash
npm run i18n:check-value-drift          # કડક (CI જે ચલાવે છે)
npm run i18n:check-value-drift:warn     # માત્ર અહેવાલ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

મૂલ્ય-વિચલન અને નવી-કી ગેટ્સ `scripts/i18n/resolve-ui-diff-base.mjs`માંથી એક જ અપરિવર્તનીય સરખામણી શેર કરે છે. વર્કફ્લો બંને ચકાસણીઓને સમાન બેઝ, બેઝ-ટિપ અને ઉમેદવાર SHA આપે છે. PR/બેઝ-રીટાર્ગેટ, પુશ અને મર્જ-ગ્રુપ રન તેમના ઇવેન્ટ સંદર્ભનો ઉપયોગ કરે છે. ઉમેદવાર બ્રાન્ચને ડિસ્પેચ કરવા માટે તેનો ચોક્કસ ખુલ્લો PR અથવા સ્પષ્ટ `i18n_base_sha` ઇનપુટ આવશ્યક છે. તે ઇનપુટ વિના `main` અથવા `release/vX.Y.Z`નું ડિસ્પેચ અથવા શેડ્યૂલ કરેલું અવલોકન છેલ્લા કમિટની તેના પ્રથમ પેરેન્ટ સાથે સરખામણી કરે છે; તે વારસામાં મળેલા તમામ અનુવાદ ઋણનું ઑડિટ નથી. સ્થાનિક ઇન્વોકેશન માટે સ્પષ્ટ સરખામણી બેઝ આવશ્યક છે, ઉદાહરણ તરીકે ઉપરનો `BASE_REF` કમાન્ડ.

ખૂટતો અથવા અસ્પષ્ટ સરખામણી સંદર્ભ, વાંચી ન શકાય તેવી અથવા અમાન્ય આવશ્યક કેટલૉગ, અને બદલાયેલ ઉમેદવાર, વૉર્ન મોડ સહિત, એક્ઝિટ કોડ **2** સાથે `INCOMPLETE` ઉત્પન્ન કરે છે. કેટલૉગ વાંચવા માટે `scripts/i18n/read-ui-catalog.mjs`નો ઉપયોગ થાય છે; વાંચન નિષ્ફળતાઓને ખાલી ઑબ્જેક્ટથી બદલવામાં આવતી નથી. અનુપલબ્ધ બેઝ કે અધૂરું ઇનપુટ—બેમાંથી કોઈ પણ PASS સ્થાપિત કરતું નથી.

### જૉબ: `i18n`

સંપૂર્ણ i18n માન્યતા મેટ્રિક્સ (દરેક લોકેલ દીઠ એક જૉબ). આખો જૉબ સલાહાત્મક છે.

| સ્ક્રિપ્ટ                       | શું માન્ય કરે છે           | બ્લૉકિંગ                                             |
| ------------------------------- | -------------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | લોકેલ દીઠ અનુવાદની પૂર્ણતા | **સલાહાત્મક** (આખા જૉબ પર `continue-on-error: true`) |

### જૉબ: `pr-test-policy`

માત્ર પુલ રિક્વેસ્ટ્સ પર ચાલે છે.

| સ્ક્રિપ્ટ              | શું માન્ય કરે છે                                                                                                                   | બ્લૉકિંગ |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, અથવા `bin/`માં પ્રોડક્શન કોડ બદલતા PRsમાં ટેસ્ટ્સ ઉમેરવા અથવા અપડેટ કરવા આવશ્યક છે (કડક નિયમ #8) | હા       |
| `check:test-masking`   | બદલાયેલી ટેસ્ટ ફાઇલો નેટ assert ગણતરી ઘટાડતી નથી અથવા `assert.ok(true)` જેવી નિરર્થક પુનરુક્તિઓ ઉમેરતી નથી                         | હા       |
| `check:pr-evidence`    | PR બૉડી ફેરફાર માટે ટેસ્ટ/VPS પુરાવાનો ઉલ્લેખ કરે છે (PR લખાણમાં grep કરીને કડક નિયમ #18ને યાંત્રિક બનાવે છે — નાજુક, Backlog જુઓ) | હા       |

### જૉબ: `test-vitest`

`changes` વર્ગીકરણ જોબ જરૂરી છે. લાગુ પડતા મેટ્રિક્સ શાર્ડ્સ નિષ્ફળ જાય તો મર્જ અવરોધાય છે.

| સ્યુટ            | શું માન્ય કરે છે                                   | અવરોધક                                                                                                                                         |
| ---------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP સર્વર (110 ટૂલ્સ), autoCombo, કૅશ — vitest રનર | હા                                                                                                                                             |
| `test:vitest:ui` | UI કમ્પોનન્ટ પરીક્ષણો — vitest રનર                 | **અવરોધક** — પહેલેથી અસ્તિત્વમાં રહેલી નિષ્ફળતાઓને `vitest.config.ts` માં સ્પષ્ટપણે બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ જૉબને નિષ્ફળ બનાવે છે |

### રાત્રિના વર્કફ્લોઝ (નિર્ધારિત, સલાહાત્મક)

આ cron શેડ્યૂલ પર (અને `workflow_dispatch` દ્વારા) ચાલે છે, PRs પર ક્યારેય નહીં. બધા સલાહાત્મક છે.

| વર્કફ્લો               | શું માન્ય કરે છે                                                                                                                                                                | અવરોધક      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | રૅન્ડમ સીડ અને ઊંચી રન સંખ્યા સાથેના fast-check પ્રોપર્ટી ટેસ્ટ                                                                                                                 | **સલાહરૂપ** |
| `nightly-resilience`   | હીપ-વૃદ્ધિ ગેટ, કેઓસ ફૉલ્ટ-ઇન્જેક્શન, k6 લોડ/સોક ટેસ્ટ                                                                                                                          | **સલાહરૂપ** |
| `nightly-llm-security` | promptfoo ઇન્જેક્શન ગાર્ડ (બ્લોક મોડ) + garak પ્રોબ્સ (પ્રોવાઇડર સિક્રેટ વિના છોડવામાં આવે છે)                                                                                  | **સલાહરૂપ** |
| `nightly-schemathesis` | `docs/openapi.yaml` નો ઉપયોગ કરીને લાઇવ OmniRoute સામે OpenAPI કોન્ટ્રાક્ટ ફઝિંગ (schemathesis) — સ્પેસિફિકેશનના ઉલ્લંઘનો / હેન્ડલ ન થયેલી 500 ભૂલો ઉજાગર કરે છે (તબક્કો 8 B.4) | **સલાહરૂપ** |
| `nightly-mutation`     | ઝડપી યુનિટ લેન પર Stryker મ્યુટેશન-ટેસ્ટિંગ સ્કોર — ટકી રહેલા મ્યુટન્ટ્સ નબળા અસર્ટ્સ ઉજાગર કરે છે                                                                              | **સલાહરૂપ** |
| `nightly-compat`       | સમર્થિત `engines.node` રેન્જમાં Node એન્જિન સુસંગતતા મેટ્રિક્સ                                                                                                                  | **સલાહરૂપ** |

પ્રદર્શન બેઝલાઇન્સ (હીપ, TTFB, બિલ્ડ સમય) નોંધવામાં આવે છે, પરંતુ ગેટ કરવામાં આવતી નથી: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) જુઓ.

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
- **સલાહરૂપ** — વૈશ્વિક કુલની સ્થિર કરેલી આધારરેખા સાથે સરખામણી. વારસામાં મળેલું વિચલન ક્યારેય
  નિર્દોષ PRને લાલ ચિહ્નિત કરતું નથી; વિચલનને રિલીઝ સમાધાન વખતે સુધારવા માટે ટ્રૅક કરવામાં આવે છે અને
  headroom job દ્વારા તેનું નિરીક્ષણ કરવામાં આવે છે.

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

### CodeQL રેચેટ: ઉમેદવાર પ્રવેશ અને રીપોઝીટરી ઇન્વેન્ટરી

CI સ્પષ્ટ નિર્ભરતા સાંકળ દ્વારા ઉમેદવાર CodeQL પ્રવેશની માલિકી ધરાવે છે: `codeql-scan` `codeql.yml` માં ચાર-ભાષાના મેટ્રિક્સને કૉલ કરે છે, પછી `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` ચલાવે છે. `Gate / CI` બંને પરિણામોની જરૂર છે. ગુણવત્તા તેની પોતાની સંખ્યાત્મક તપાસ જાળવી રાખે છે પરંતુ નિર્માતા સમાપ્ત થાય તે પહેલાં સ્કેનરને પૂછતી નથી; એકલા `Gate / Quality` એ સંપૂર્ણ ઉમેદવાર પ્રવેશ નથી. CodeQL માત્ર ડૉક્સ ઉમેદવારો માટે જરૂરી રહે છે.

`config/quality/codeql-admission-policy.json` માં નીતિ એક્શન્સ, C/C++, JavaScript/TypeScript અને Python, ક્વેરી સ્યુટ ડિફોલ્ટ, રિમોટ થ્રેટ મોડલ અને બિલ્ડ મોડ કંઈ નહીં પસંદ કરે છે. નિર્માતા પ્રીફ્લાઇટ બાકી સક્રિયકરણ રેકોર્ડ અને સ્પષ્ટ લક્ષ્ય સૂચિની બહારની શાખાઓને નકારી કાઢે છે. વર્તમાન લક્ષ્યો મુખ્ય છે અને release/v3.8.54. કરાર પરીક્ષણો આ મર્યાદિત સૂચિ અને જાળવણી પુશ ટ્રિગરને પેકેજ સંસ્કરણ સાથે સરખાવે છે; આગામી પ્રકાશન ઓનબોર્ડિંગની સમીક્ષા કરવાની જરૂર છે. CI નું હાલનું વ્યાપક પ્રકાશન PR ટ્રિગર જાળવી રાખવામાં આવ્યું છે, પરંતુ અનબોર્ડેડ ટાર્ગેટ અમાપિત PASS મેળવવાને બદલે એક્સટ્રક્શન પહેલાં HOLD અહેવાલ આપે છે.

દરેક મેટ્રિક્સ જોબ તેના વાસ્તવિક SARIF અપલોડ ID, ભાષા, શ્રેણી, રન અને પ્રયાસ, કોલર વર્કફ્લો ઓળખ, ઇવેન્ટ ref/head/base/merge SHA અને પોલિસી હેશ રેકોર્ડ કરે છે. આશ્રિત નોકરી ફક્ત આ રનની રસીદો ડાઉનલોડ કરે છે અને આર્ટિફેક્ટ ડાયજેસ્ટને માન્ય કરે છે. તેને તમામ ચાર શ્રેણીઓ, એક સફળ નિર્માતા અને દરેક ચોક્કસ અપલોડની પ્રક્રિયા પૂર્ણ કરવાની જરૂર છે. તે API ના sarif_id ફિલ્ટરનો ઉપયોગ કરે છે, બ્રાન્ચ પર મળેલા નવીનતમ વિશ્લેષણનો નહીં. આંશિક પુનઃઉત્પાદન પ્રયાસને સાચવીને, સમાન દોડ અને ઉમેદવારના અગાઉના પ્રયાસમાંથી સફળ શ્રેણીઓનો ફરીથી ઉપયોગ કરી શકે છે; નિષ્ફળ વર્તમાન નિર્માતા અગાઉના લીલા પુરાવાનો ફરીથી ઉપયોગ કરી શકતા નથી.

CodeQL ક્રિયા પ્રક્રિયા માટે રાહ જુએ છે, પરંતુ તેનું પિન કરેલ અમલીકરણ સ્ટેટસ-રીડ નિષ્ફળતા અથવા થાકેલી રાહ પછી ચેતવણી આપી શકે છે અને ચાલુ રાખી શકે છે. પ્રવેશ તેથી ફરીથી પ્રક્રિયાની ચકાસણી કરે છે. ગુમ થયેલ કેટેગરીઝ, બાકી પ્રક્રિયા, નિષ્ફળ અથવા રદ થયેલ નોકરીઓ, જૂની ઓળખ, અપૂર્ણ પૃષ્ઠ ક્રમાંક અથવા અનુપલબ્ધ APIs HOLD ઉત્પન્ન કરે છે અને બહાર નીકળો 2. સ્વતંત્ર સ્કેનર વર્કફ્લો માટે કોઈ નિશ્ચિત રાહ બાકી નથી. એક અનસ્કેન કરેલ PR પસાર થઈ શકતું નથી કારણ કે ચેતવણી ક્વેરી 0 પરત કરે છે. `metrics.codeqlAlerts.value` ઉપર માપેલ ગણતરી 1 થી બહાર નીકળે છે; આધારરેખા અન્ય શાખાની ચેતવણીઓને શોષવા માટે ઉભી કરવામાં આવતી નથી. [સ્થિતિ અને વિશ્લેષણ લુકઅપ અપલોડ કરો](https://docs.github.com/en/rest/code-scanning/code-scanning).

રસીદ IDs, કેટેગરીઝ, ટૂલ વર્ઝન, ref/SHA, બેઝલાઇન અને ચેતવણી નંબરો અપલોડ અને વિશ્લેષણ કરે છે. SARIF identity/result ગણતરી, લઘુત્તમ નિયમ ગણતરીઓ અને ચોક્કસ ચેતવણી ઉદાહરણો ફરજિયાત રહે છે. PR/analysis ઓળખ સ્વીકારતા પહેલા ફરીથી તપાસવામાં આવે છે. આ તપાસો રૂપરેખાંકિત કેટેગરી કવરેજ સ્થાપિત કરે છે, દરેક એક્સટ્રેક્ટ કરેલ સ્રોત ફાઇલની ઇન્વેન્ટરી નહીં. C/C++ નો-બિલ્ડ એક્સટ્રેક્શનમાં પ્રોજેક્ટ બિલ્ડ દરમિયાન જનરેટ થયેલ કોડનો સમાવેશ થતો નથી. સ્ત્રોત બાકાતને હજુ પણ સમીક્ષાની જરૂર છે, અને યોગદાનકર્તા એટ્રિબ્યુશનને તુલનાત્મક ચોક્કસ-બેઝ પુરાવાની જરૂર છે.

`codeql-maintenance.yml` PR/main ઉત્પાદકોને ડુપ્લિકેટ કર્યા વિના સક્રિય-રિલીઝ પુશ સ્કેન અને સાપ્તાહિક શેડ્યૂલ સપ્લાય કરે છે. `nightly-codeql-inventory.yml` રીપોઝીટરી-વ્યાપી આધારરેખાને `--strict-measurement` સાથે અલગ રાખે છે અને જ્યારે માપન અનુપલબ્ધ હોય ત્યારે નિષ્ફળતા. સ્થાનિક વારસો કલેક્ટરની આકર્ષક અવગણના ઉમેદવાર પ્રવેશ નથી. ચકાસાયેલ નીચી વૈશ્વિક ગણતરી પછી કડક થવું એ સ્પષ્ટ `--update` છે.

જ્યારે ડિફૉલ્ટ સેટઅપ ગોઠવેલું હોય ત્યારે અદ્યતન વર્કફ્લો પ્રકાશિત થવો જોઈએ નહીં: GitHub તે સંયોજનને નકારે છે. જ્યાં સુધી સમીક્ષા કરાયેલ વહીવટી સંક્રમણ પાછું વાંચવામાં ન આવે ત્યાં સુધી તેની આવૃત્તિવાળી નીતિ બાકી રહે છે. પ્રકાશન પહેલાં, ઓપરેટર પિન રિપોઝીટરી, head/base/tree, policy/patch/rollback હેશ અને અવલોકન કરેલ સેટઅપ સ્થિતિ; `node scripts/quality/codeql-producer.mjs verify-admin-readback` પૂરા પાડવામાં આવેલ અપેક્ષિત અને વાસ્તવિક JSON રેકોર્ડ્સ તપાસે છે. આ એક ટેકનિકલ ગાર્ડ છે, ઓપરેટરની મંજૂરી અથવા નવા રીડબેક મેળવવા માટે રિપ્લેસમેન્ટ નથી. PR ટોકન ક્યારેય એડમિનિસ્ટ્રેશન એક્સેસની વિનંતી કરતું નથી. રોલઆઉટ અને કોઈપણ સ્કેનર ફેરફાર માટે અલગ રીડબેક વત્તા વાસ્તવિક PR, ફોર્ક અને મર્જ-ગ્રુપ સુસંગતતા પુરાવા જરૂરી છે.

ફોર્ક્સ હોસ્ટેડ રનર્સનો ઉપયોગ કરે છે, સતત ઓળખપત્રો વિના ચેકઆઉટ, નિર્માતામાં કોઈ પ્રોજેક્ટ install/build નથી અને વારસાગત રિપોઝીટરી રહસ્યો નથી. GitHub તેના ઘટેલા ફોર્ક ટોકન સાથે પુલ_રિક્વેસ્ટ ઇવેન્ટ માટે SARIF અપલોડને સપોર્ટ કરે છે; પ્રથમ વખત યોગદાન અમલીકરણ મંજૂરી GitHub નીતિ રહે છે. અવિશ્વસનીય કોડને એક્ઝિક્યુટ કરવા માટે ક્યારેય pull_request_target નો ઉપયોગ કરશો નહીં. સ્થળાંતર પૂર્ણ થયાનું વિચારતા પહેલા વાસ્તવિક ટોકન પરવાનગીઓ, analysis_key અને નિયંત્રિત કેનેરીમાં તમામ કેટેગરીના વાતાવરણની પુષ્ટિ કરો. [ફોર્ક અપલોડ નિયમો](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [વિરોધાભાસી સેટઅપ મોડ્સ](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**બરતરફી એ ઓપરેટરનો કોલ છે (હાર્ડ રૂલ #14)** — બરતરફી ટિપ્પણીમાં તકનીકી સમર્થનને રેકોર્ડ કર્યા વિના CodeQL ચેતવણીને ક્યારેય બરતરફ કરતું નથી: અપસ્ટ્રીમ-પ્રોટોકોલ આવશ્યકતા માટે `won't fix`, ટેસ્ટ ફિક્સ્ચર માટે `used in tests`, સેનિટાઈઝર માટે `false positive` CodeQL જોઈ શકતું નથી (અગાઉ: `docs/security/ERROR_SANITIZATION.md`).

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

## અનુમતિસૂચિ નીતિ

પહેલેથી અસ્તિત્વમાં રહેલા ઉલ્લંઘનોને કારણે નિષ્ફળ ન થઈ શકે તેવો દરેક ગેટ સ્થિર કરેલી અનુમતિસૂચિનો ઉપયોગ કરે છે
(દા.ત., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). નીતિ આ છે:

**મૂળ કારણને સુધારો; અનુમતિસૂચિનો ઉપયોગ ફક્ત ત્યારે કરો જ્યારે ઉલ્લંઘન પહેલેથી અસ્તિત્વમાં હોય અને
તેને એ જ PRમાં સુધારી ન શકાય.**

અનુમતિસૂચિમાં એન્ટ્રી ઉમેરતી વખતે:

1. વાજબી કારણ દર્શાવતી ટિપ્પણી સામેલ કરો.
2. ટ્રેકિંગ ઇશ્યૂનો સંદર્ભ આપો (દા.ત., `// #3498 — Phase 2 feature, not yet implemented`).
3. ઉલ્લંઘનને સુધારતા એ જ PRમાં એન્ટ્રી દૂર કરો — હવે સક્રિય ઉલ્લંઘનને
   દબાવતી ન હોય તેવી જૂની એન્ટ્રી પોતે જ એક ખામી છે (અમલીકરણ થયા પછી 6A.3નું જૂનું-એન્ફોર્સમેન્ટ
   અનાથ અનુમતિસૂચિ એન્ટ્રીને કારણે ગેટને નિષ્ફળ કરશે).

ટેસ્ટ ઝડપથી પાસ કરાવવા માટે અનુમતિસૂચિમાં એન્ટ્રીઓ **ઉમેરશો નહીં**. સતત વધતી
અનુમતિસૂચિ સાથેનો લીલો ગેટ ગુણવત્તાનો ખોટો અહેસાસ આપે છે.

### જ્યારે તમારા PR પર કોઈ ગેટ નિષ્ફળ જાય

1. **ગેટનું આઉટપુટ ધ્યાનપૂર્વક વાંચો** — તે તમને ચોક્કસપણે જણાવે છે કે કઈ ફાઇલ અથવા સિમ્બલે
   નિયમનું ઉલ્લંઘન કર્યું છે.
2. **ઉલ્લંઘન સુધારો** — મોટાભાગના ગેટ નિર્ધારિત ફાઇલસિસ્ટમ ચકાસણીઓ છે, જે કોડ સાચો થતાં જ
   પાસ થઈ જાય છે.
3. **જો ઉલ્લંઘન પહેલેથી અસ્તિત્વમાં હોય** (એટલે કે, તમે તેને રજૂ કર્યું નથી, પરંતુ હવે ગેટ તેને
   આવરી લે છે): વાજબી કારણ દર્શાવતી ટિપ્પણી અને ટ્રેકિંગ ઇશ્યૂ સાથે અનુમતિસૂચિમાં એન્ટ્રી ઉમેરો.
4. **જો ગેટ રૅચેટ હોય** (કવરેજ, ESLint ચેતવણીઓ, ડુપ્લિકેશન, જટિલતા):
   તમારા ફેરફારે મેટ્રિકને ખરાબ બનાવ્યું છે. મૂળ સમસ્યાને સુધારો, અથવા (ભાગ્યે જ) જો ફેરફાર ઇરાદાપૂર્વકનો હોય અને મેટ્રિકમાં
   ઘટાડો સ્વીકાર્ય હોય તો `npm run quality:ratchet -- --update` ચલાવો — પરંતુ PRના વર્ણનમાં તેનું કારણ નોંધો.
5. **સલાહરૂપ ગેટ** (`continue-on-error: true`) માત્ર માહિતી માટે છે — તે મર્જને અવરોધતા
   નથી, પરંતુ CI સારાંશમાં દેખાય છે. તેમ છતાં તેમને સુધારો.

---

## નવો ગેટ ઉમેરવો

1. `scripts/check/check-<name>.mjs` (અથવા `.ts`) બનાવો. નીતિ ગેટ 0/1 સાથે બહાર નીકળે છે.
   રૅચેટ-શૈલીના ગેટ `collect-metrics.mjs` મારફતે `quality-metrics.json`માં મેટ્રિક લખે છે.
2. `package.json`માં `"check:<name>": "node scripts/check/check-<name>.mjs"` ઉમેરો, અને
   `config/quality/gate-manifest.json`માં ઉપનામ અને તેના ચોક્કસ આદેશને સમન્વયિત કરો.
   અસ્તિત્વમાં રહેલા માન્યતા ઉપનામને બદલતી કે દૂર કરતી વખતે પણ આ જ સમન્વય લાગુ કરો.
   `npm run check:gate-manifest` ચલાવો; pre-commit hook અને CI ફેરફાર વર્ગીકરણ
   આ કરારનું પાલન કરાવે છે.
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

## તર્કસંગતીકરણ બેકલૉગ (ROI સમીક્ષા — તબક્કો 9 તરંગ 3)

આ ઇન્વેન્ટરીનું 2026-06-17ના રોજ `ci.yml` સામે સમાધાન કરવામાં આવ્યું હતું (અગાઉના સંસ્કરણમાં
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` છૂટી ગયા હતા). સમાધાન કરાયેલા સમૂહની ROI સમીક્ષાએ
નીચેના તર્કસંગતીકરણ ઉમેદવારો ઓળખ્યા. **મર્જ યાંત્રિક CI
ફેરફારો છે; ફ્લિપ/ડ્રૉપ એ ઑપરેટર માટે અનામત નીતિગત નિર્ણયો છે.** નીચેનું કંઈપણ
હજુ લાગુ કરવામાં આવ્યું નથી.

**ઉપર આ પણ દસ્તાવેજિત નથી** (advisory, ઓછો signal): `docs-lint` job (markdownlint + Vale, આખો job `continue-on-error`) અને સ્વતંત્ર scanner workflows `semgrep.yml` / `scorecard.yml`. CodeQL પાસે હવે `Gate / CI` હેઠળ ફરજિયાત producer અને admission jobs છે, ઉપરની activation જરૂરિયાતોને આધીન. `semgrepFindings: 0` એ `quality-baseline.json` માં છે, પણ `ci.yml` ના blocking ratchet સાથે જોડાયેલું નથી — metric હાલ અસંબદ્ધ છે.

### મર્જ / ડીડુપ્લિકેશન (યાંત્રિક, ઓછું જોખમ)

દરેક ઉમેદવારને 2026-06-17ના રોજ લાઇવ ગેટ સ્થિતિ સામે માન્ય કરવામાં આવ્યો હતો (વિશ્વાસ કરો, પણ ચકાસો);
કેટલાક "સ્પષ્ટ" મર્જ વાસ્તવમાં છુપાયેલું ઋણ ધરાવતા હોવાનું બહાર આવ્યું અને તે **સ્વચ્છ ડ્રૉપ-ઇન નથી**.

- **`check:docs-sync` બે વખત ચાલે છે** — `lint` જૉબમાં સ્વતંત્ર રીતે અને ફરીથી `check:docs-all` (`docs-sync-strict`)ની અંદર તથા husky pre-commit હૂકમાં. ✅ **પૂર્ણ** — સ્વતંત્ર `lint` ઇન્વોકેશન દૂર કરવામાં આવ્યું.
- **CVE સ્કેનિંગ** — ❌ **સ્વચ્છ મર્જ નથી.** `audit:deps` તમામ પાંચ lockfilesમાં critical advisories અને અધૂરા auditsને બ્લૉક કરે છે, જ્યારે વર્તમાન નીતિ હેઠળ high advisoriesને ચેતવણી તરીકે રિપોર્ટ કરે છે; `check:vuln-ratchet` (osv) માત્ર ચેક-ઇન કરેલી baselineની તુલનામાં થયેલી _પીછેહઠ_ પર નિષ્ફળ જાય છે અને જ્યારે માપન જરૂરી હોય ત્યારે ગુમ થયેલા માપનોને નકારે છે. અર્થભેદ છે — `audit:deps`ને દૂર કરવાથી absolute critical gate અને સ્વતંત્ર package audit receipts ગુમ થશે. બંને રાખો.
- **સાઇકલ શોધ** — ✅ **પૂર્ણ** (#15159 G-01/G-02). અહીંના જૂના લખાણે `check:cycles`ને "લીલું, ક્યુરેટેડ" ગેટ ગણાવ્યું હતું અને `check:circular-deps` (dpdm)એ 91 સાઇકલ રિપોર્ટ કર્યા હોવાથી તેને બ્લૉકિંગ રાખવાનું વાજબી ઠેરવ્યું હતું. એ લીલી સ્થિતિ **ખોટી લીલી સ્થિતિ** હતી: `check:cycles`એ 5 સબડિરેક્ટરી (450 ફાઇલો) સ્કેન કરી હતી, માત્ર સ્થિર `import|export … from`ને મેળ ખાતું હતું અને દરેક `@/` તથા `@omniroute/open-sse/` સ્પેસિફાયર છોડી દીધા હતા, તેથી તે રેપોમાં પ્રભુત્વ ધરાવતી dynamic-import + alias સાઇકલ જોઈ શકતું નહોતું. સુધારાયું: ગેટ હવે `src` + `open-sse` (5023 ફાઇલો)માં ફરે છે, TypeScript ASTમાંથી સ્પેસિફાયર એકત્ર કરે છે (એટલે `import("…")` ગણાય છે અને type-position `typeof import("…")` ગણાતું નથી), અને tsconfig `paths`ને રિઝૉલ્વ કરે છે. તે 0 નહીં, પરંતુ **14** સાઇકલ શોધે છે. ગેટ PRમાં અગાઉથી અસ્તિત્વ ધરાવતી 14 સાઇકલ સુધારી શકાતી ન હોવાથી, `check:cycles` હવે **રૅચેટ** છે (`--ratchet`, `quality-baseline.json`માં ceiling `metrics.cycles.value = 14`, `direction: down`) — તે કોઈપણ _પીછેહઠ_ને બ્લૉક કરે છે અને ગણતરી ફક્ત ઘટી શકે છે. CI `npm run check:cycles:ratchet` ચલાવે છે. ઘટાડો **A-01** સાથે આગળ વધે છે. `check:circular-deps` (dpdm) વ્યાપક બીજા અભિપ્રાય તરીકે સલાહરૂપ રહે છે.
- **જટિલતા** — ✅ **પૂર્ણ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): એક ESLint વૉક, ruleId પ્રમાણે ગણતરી કરે છે જેથી cyclomatic+max-lines અને cognitive baselines સ્વતંત્ર રહે; વ્યક્તિગત `check:complexity` / `check:cognitive-complexity` સ્થાનિક `--update` માટે યથાવત્ રહે છે.
- **`/api` એન્ટિ-હેલ્યુસિનેશન** — ✅ **પૂર્ણ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`ની એક FS ઇન્વેન્ટરી, openapi-routes + docs-symbols હજી પણ સ્વતંત્ર રીતે રિપોર્ટ કરે છે; વ્યક્તિગત ચેક્સ સ્થાનિક રન માટે યથાવત્ રહે છે.
- **`check:node-runtime` 11 જૉબમાં ચાલે છે** — ⚠️ **ઓછો ROI.** દરેક અલગ runner છે અને ચેક <1s છે; સસ્તું per-job guard ગુમાવવાની સામે કુલ બચત ~10s છે. આ ફેરફારનો ઉપદ્રવ યોગ્ય નથી.
- **CI lint પર `typecheck:noimplicit:core`** — ✅ **lint જૉબમાંથી દૂર કર્યું** (તે સલાહરૂપ `continue-on-error` હતું); બ્લૉકિંગ type surface `typecheck:core` + `check:type-coverage` છે. સ્થાનિક સ્ક્રિપ્ટ જાળવી રાખવામાં આવી છે.

### ફ્લિપ / નિર્ણય (ઑપરેટર નીતિ)

- `check:openapi-security-tiers` (સલાહરૂપ) — ❌ **સ્વચ્છ રીતે ફ્લિપ કરી શકાય તેમ નથી.** તે 0 સાથે exit થાય છે, પરંતુ ચેતવણી આપે છે કે `LOCAL_ONLY_API_PREFIXES` હેઠળના કેટલાક `traffic-inspector` routesમાં `x-loopback-only: true` annotation નથી. તેને અમલમાં મૂકવા માટે પહેલાં `openapi.yaml`માં એ annotations ઉમેરવા જરૂરી છે.
- `typecheck:noimplicit:core` (સલાહરૂપ) — મોટા ભાગે બ્લૉકિંગ `check:type-coverage` રૅચેટ હેઠળ આવરી લેવાય છે. તેને રૅચેટમાં ફ્લિપ કરો અથવા વધારાનો બિનજરૂરી બીજો `tsc` પાસ દૂર કરો.
- `test:vitest:ui` (હવે **બ્લૉકિંગ**) — અગાઉથી અસ્તિત્વ ધરાવતી નિષ્ફળતાઓને `vitest.config.ts`માં `// #8618` ટ્રૅકિંગ ટિપ્પણીઓ સાથે સ્પષ્ટપણે બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ જૉબને નિષ્ફળ બનાવે છે.
- `check:secrets` (gitleaks, બ્લૉકિંગ રૅચેટ) — વર્તમાન ceiling `quality-baseline.json`માં `metrics.secretFindings` છે. કોઈપણ અપવાદ માટે ન્યાયસંગત `.gitleaks.toml` એન્ટ્રી જરૂરી છે; અનુપલબ્ધ માપન INCOMPLETE છે. આ સ્કેન GitHub native secret scanning અને `check:public-creds`ને પૂરક છે.
- `check:pr-evidence` (બ્લૉકિંગ, PR-body ગદ્યમાં greps કરે છે) — false-positiveનું ઊંચું જોખમ; તેને દૂર કરવાથી Hard Rule #18નું અમલીકરણ નબળું પડે છે, તેથી આ વાસ્તવિક નીતિગત નિર્ણય છે.
- `semgrep` (સલાહરૂપ સ્વતંત્ર) — OWASP પરિવારો માટે CodeQL સાથે ઓવરલેપ થાય છે; તેની baselineને રૅચેટ સાથે જોડો અથવા તેને દૂર કરો.

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
