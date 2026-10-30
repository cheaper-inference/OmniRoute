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

### ઉમેદવાર સ્વીકૃતિ

CI અને Quality Gates વર્કફ્લો દરેક એક સ્થિર નિર્ણય આપે છે: `Gate / CI` અને
`Gate / Quality`. તેમની વર્ઝનવાળી સ્વીકૃતિ નીતિ દરેક અપસ્ટ્રીમ જોબને
ફરજિયાત અથવા સલાહરૂપ તરીકે સૂચિબદ્ધ કરે છે. લાગુ પડતી ફરજિયાત જોબ સફળ થવી આવશ્યક છે:
ગેરહાજર, રદ કરાયેલ, છોડાયેલ, બાકી અને અજ્ઞાત પરિણામો PASS સ્થાપિત કરી શકતાં નથી. માન્ય
માત્ર-દસ્તાવેજો અથવા માત્ર-કૅટલૉગ વર્ગીકરણ કોઈ કોડ લેનને લાગુ ન પડતી બનાવી શકે છે;
ડ્રાફ્ટ PR સ્વીકૃત ઉમેદવાર નથી. `hotfix` લેબલ પુરાવાની આવશ્યકતા દૂર કરતું નથી.

બંને વર્કફ્લો main/release બ્રાન્ચમાં જતા PR, `main` પરના પુશ, મેન્યુઅલ ડિસ્પેચ
અને મર્જ-ગ્રુપ ઇવેન્ટ્સને આવરે છે. પુશ, ડિસ્પેચ અને મર્જ-ગ્રુપ સંપૂર્ણ પસંદગી ચલાવે છે.
`release/**` પરના પુશ તેમને શરૂ કરતા નથી (2026-10-18): દરેક ફેરફારે તેના PR પર મેટ્રિક્સ
પહેલેથી જ ચલાવ્યું છે અને મર્જ કરાયેલ સંયોજન Release-Greenની જવાબદારી છે
(`docs/ops/RUNNER_BOX.md` → Hosted લેન). ફોર્ક્સ અને મર્જ ગ્રુપ્સ એવી જોબ્સ માટે હોસ્ટેડ
રનર્સનો ઉપયોગ કરે છે જે અન્યથા સેલ્ફ-હોસ્ટેડ રનર્સ પસંદ કરે છે; રોલઆઉટ પહેલાં પૂરતી
હોસ્ટેડ ક્ષમતા ચકાસવી આવશ્યક છે.

દરેક JSON રસીદ ચેકઆઉટ કરાયેલ SHA, વર્કફ્લો રન અને પ્રયાસને ઓળખાવે છે.
CLI ચેકઆઉટ/ઇવેન્ટ SHA અસંગતતાને નકારે છે. વર્કફ્લો ટેસ્ટ્સ નીતિ સભ્યપદને
નિર્ણય જોબની `needs` સૂચિ સાથે બાંધે છે, જેથી નવી અથવા દૂર કરાયેલી લેન મૌનપણે
અદૃશ્ય ન થઈ શકે. રસીદો ફક્ત તેમના પોતાના વર્કફ્લોને આવરે છે; પ્રકાશન, ડિપ્લોયમેન્ટ અથવા હાલના એડવાઇઝરી સ્કેનરની આંતરિક કાર્યપ્રણાલીને નહીં. લાગુ પડતી તપાસોને બ્રાન્ચ નિયમોમાં આવશ્યક બનાવવી એ એક અલગ વહીવટી ફેરફાર છે; ફક્ત તેમની જોબ્સ વ્યાખ્યાયિત કરવાથી બ્રાન્ચ સુરક્ષિત થતી નથી.

`API Route Typecheck` એ એક સ્વતંત્ર વર્કફ્લો તપાસ છે, જે બંને સંકલિત ચુકાદાઓ અને સ્થાનિક સંપૂર્ણ નિરીક્ષકની સ્ટેટિક પ્રોફાઇલની બહાર છે. ચોક્કસ ઉમેદવાર માટે તેના પરિણામનું અલગથી નિરીક્ષણ કરો. `.github/workflows/api-route-typecheck.yml`, `main` અથવા `release/**` માં આવતી PRs, બંનેમાંથી કોઈપણ બ્રાન્ચ ફેમિલી પર થતા પુશ અને મેન્યુઅલ ડિસ્પેચ વખતે ચાલે છે. તેમાં કોઈ પાથ ફિલ્ટર નથી. PR બેઝને ફરી લક્ષિત કરવાથી નવી તપાસની વિનંતી થાય છે; બોડી/શીર્ષકમાં કરાયેલા ફેરફારો ફક્ત નિરીક્ષણ માટેના નામ `Admission not requested / API Route Typecheck` નો ઉપયોગ કરે છે અને એડમિશન તપાસને બદલી શકતા નથી. વર્કફ્લો મર્જ-ગ્રુપ ટ્રિગર જાહેર કરતું નથી. આ તપાસ આવશ્યક બનાવતા કોઈપણ મર્જ-ક્યૂ રોલઆઉટે પહેલાં તે ઇવેન્ટ માટે તેનું એક્ઝિક્યુશન સ્થાપિત કરવું આવશ્યક છે.

### UI એક્ઝિક્યુશન ક્ષમતા

CI સંપૂર્ણ UI ઇન્વેન્ટરીને ચાર `test-vitest` મેટ્રિક્સ શાર્ડ તરીકે ચલાવે છે, દરેકમાં
વધુમાં વધુ બે વર્કર્સ અને હાલની 15-મિનિટની જોબ સમયમર્યાદા હોય છે. પ્રથમ શાર્ડ
MCP/autoCombo Vitest સ્યુટ પણ ચલાવે છે. ફરજિયાત જોબ પરિણામ દરેક મેટ્રિક્સ લેગને આવરે છે;
એક શાર્ડની નિષ્ફળતા અથવા રદ થવું ઉમેદવાર સ્વીકૃતિ સ્થાપિત કરી શકતું નથી.

નાઇટલી ઑબ્ઝર્વર દરેક UI શાર્ડ માટે અલગ ચોક્કસ-ઉમેદવાર રસીદ જાળવી રાખે છે,
જેમાં પ્રથમ રસીદમાં MCP એક્ઝિક્યુશનનો પણ સમાવેશ થાય છે. ચારેય રસીદો, લૉગ્સ અને મેળ ખાતી
એક્ઝિક્યુશન ઓળખો આવશ્યક છે. સ્થાનિક `npm run test:vitest:ui` હજી પણ સંપૂર્ણ
સ્યુટ પસંદ કરે છે; એક `--shard` રન માત્ર આંશિક પુરાવો છે.

### યુનિટ કવરેજ સંગ્રહ

બાર યુનિટ શાર્ડ્સ તેમના હાલના ટેસ્ટ એક્ઝિક્યુશન દરમિયાન V8 કવરેજ એકત્રિત કરે છે. સફળ
શાર્ડ મધ્યવર્તી Istanbul રિપોર્ટ જનરેટ કર્યા વિના મૂળ ફાઇલોને સંકુચિત કરવા માટે
`scripts/ci/compact-v8-coverage.mjs` ચલાવે છે. અંતિમ Coverage જોબ ઉમેદવાર SHA,
રનટાઇમ, સોર્સ રૂટ અને ડેટા હૅશ સામે તમામ બાર મેનિફેસ્ટ ચકાસે છે, ત્યારબાદ c8ના
રિપોર્ટર્સ અને હાલની કવરેજ થ્રેશોલ્ડ્સ ચલાવે છે. ઇનપુટ્સ c8નો વૈશ્વિક ફાઇલનામ ક્રમ
જાળવી રાખે છે; મિશ્ર ફંક્શન/બ્લોક કવરેજ માટે પ્રતિ-શાર્ડ પૂર્વ-મર્જિંગ અસુરક્ષિત છે.
ગેરહાજર, ખોટા બંધારણવાળા અથવા અસંગત શાર્ડ્સ સ્વીકૃતિ નિષ્ફળ કરે છે.
નિષ્ફળ ટેસ્ટ શાર્ડ્સ કાચું નિદાનાત્મક કવરેજ અલગથી જાળવી રાખે છે; તે અંતિમ મર્જમાં
દાખલ થઈ શકતું નથી.

### યુનિટ એક્ઝિક્યુશન પ્રગતિની રસીદો

શેર કરાયેલ `test:unit:ci:shard` કમાન્ડ `scripts/ci/unit-progress-reporter.mjs` દ્વારા `primary`, `dashboard` અને `serial` તબક્કાઓને રેકોર્ડ કરે છે. સામાન્ય ટેસ્ટ રિપોર્ટ ઉપલબ્ધ રહે છે. માત્ર મેટાડેટા ધરાવતી એક અલગ રસીદ દરેક ફાઇલની શરૂઆત અને પૂર્ણતાને રેકોર્ડ કરે છે, અને 30-સેકન્ડનું હાર્ટબીટ હજી સક્રિય રહેલી ફાઇલો તથા તેમનો વીતી ગયેલો સમય દર્શાવે છે. તે માત્ર મંજૂર સૂચિમાં સમાવિષ્ટ એક્ઝિક્યુશન મેટાડેટાને જ રેકોર્ડ કરે છે; ટેસ્ટનાં વર્ણનો, આઉટપુટ, એરર બોડી અને સંપૂર્ણ એન્વાયર્નમેન્ટને સિરિયલાઇઝ કરવામાં આવતાં નથી.

CI અને Quality JSONL ફાઇલોને `unit-progress-ci-<run>-<attempt>-<shard>` અને `unit-progress-quality-<run>-<attempt>-<shard>` તરીકે જાળવી રાખે છે. જોબ ટાઇમઆઉટ પછીના અપલોડને અટકાવી શકે છે; અગાઉથી ઉત્સર્જિત થયેલાં હાર્ટબીટ નિદાનાત્મક પુરાવા તરીકે રહે છે. હાર્ટબીટની ગેરહાજરી અવરોધાયેલ અથવા સમાપ્ત કરાયેલી રનર પ્રક્રિયા પણ સૂચવી શકે છે. આ રસીદો હાલની ટેસ્ટ પસંદગી, સમકાલીનતા, સમયમર્યાદાઓ અને એક્ઝિટ સ્ટેટસને જાળવી રાખે છે; તે ઉમેદવાર-પ્રવેશના નિર્ણયો નથી.

### સ્વીકૃતિના પરિણામો એકત્ર કરતા મોડ્યુલમાં જાળવેલા પુરાવા

`scripts/quality/validate-release-acceptance.mjs` આપેલી યોજના અને તેના મેનિફેસ્ટના પરિણામો એકત્ર કરે છે; યોજના સમગ્ર રિલીઝ પાઇપલાઇનને આવરે છે તે સ્થાપિત કરતું નથી. યોજના `VERIFIED` હોય ત્યારે પણ તેના અહેવાલો સ્પષ્ટપણે `releaseAcceptance: false` સેટ કરે છે. `release-acceptance.yml` વર્કફ્લો હજુ શેડો ટેસ્ટ ફિક્સચર વાપરે છે, વાસ્તવિક બિલ્ડ, પેકેજ, બૂટ અથવા પ્રમોશનની રસીદો નહીં.

જાળવેલા પુરાવા ચકાસવા CLI માટે `--evidence-root` જરૂરી છે. ફાઇલો `<evidence-root>/<artifact_id>/<member>` પાથ પરથી શોધાય છે અને તેમનો SHA-256 હેશ ગણાય છે. પુરાવા વિનાનો PASS રેકોર્ડ, ગાયબ અથવા બદલાયેલી ફાઇલ, અસુરક્ષિત પાથ અથવા સિમલિંક ચકાસણી સફળ થવા દેતાં નથી. ગાયબ ફાઇલો સફળ રનના ખાલી લૉગ સમાન નથી. હાલની SHA/run/attempt તપાસો સ્વતંત્ર રહે છે: બાઇટ સરખા હોવા છતાં જૂની રસીદ માન્ય બનતી નથી. ફાઇલની અખંડિતતા અમલની અસલિયત અથવા આર્ટિફેક્ટના પ્રમોશનનો પુરાવો નથી.

### સ્ટેટિક સ્કેન ઇન્વેન્ટરી

વર્ઝનવાળી npm-alias ઇન્વેન્ટરી અને સ્ટેટિક-સ્કેન સભ્યપદ
`config/quality/gate-manifest.json`માં રહે છે. `package.json` સામે સ્ક્રિપ્ટ નામો
અને ચોક્કસ કમાન્ડ્સ માન્ય કરવા માટે `npm run check:gate-manifest` ચલાવો; ઉમેરાઓ,
દૂર કરવું અને કમાન્ડમાં ફેરફાર સ્થાનિક હૂક અને CIમાં ફેરફાર-વર્ગીકરણ જોબ્સ બંનેને
નિષ્ફળ કરે છે. એલિયાસ કોઈ વર્કફ્લો જોબ, મેટ્રિક્સ ઇન્સ્ટન્સ અથવા ટેસ્ટ કેસ નથી:
આ ગણતરીઓને પરસ્પર વિનિમયક્ષમ તરીકે રજૂ કરવી જોઈએ નહીં.

પસંદ કરાયેલા એલિયાસ ચલાવ્યા વિના તપાસવા માટે
`npm run quality:scan -- --list` અથવા `npm run quality:scan:fast -- --list`
નો ઉપયોગ કરો. રનર npm એન્ટ્રીપોઇન્ટને બોલાવે છે, તેથી તેનો રનટાઇમ
(જ્યાં ગોઠવેલું હોય ત્યાં Bun સહિત) જળવાય છે. મેનિફેસ્ટ આ પ્રોફાઇલ્સની બહારના
એલિયાસને અલગથી બોલાવવામાં આવતા તરીકે નોંધે છે અને ફક્ત-વાંચન સ્કેન પ્રોફાઇલ્સમાં
જાળવણી કમાન્ડ્સ પ્રતિબંધિત છે.

આ પ્રોફાઇલ્સ ફક્ત સ્ટેટિક સ્કેનને આવરે છે. તેઓ પ્રોડક્ટ ટેસ્ટ્સ,
કવરેજ, પૅકેજિંગ, બાહ્ય ચેક્સ અથવા ઉમેદવારની સંપૂર્ણ રિલીઝ સ્વીકૃતિને પ્રમાણિત કરતા નથી.
વર્કફ્લો સ્વીકૃતિ લિંક કરેલ `config/quality/admission-policy.json` અને
`scripts/quality/admission-verdict.mjs`નો ઉપયોગ કરે છે. રિલીઝ-ઑબ્ઝર્વર પ્રોફાઇલ્સ અલગ રહે છે;
તેમના લાગુ પડતા ચેક્સ અને રસીદો સ્વતંત્ર રીતે તપાસો. સંપૂર્ણ ઑબ્ઝર્વરના સ્ટેટિક
કમાન્ડ્સ `config/quality/release-green-static-profile.json`માં જાહેર કરાયેલા છે, જેમાં
`audit:deps`, મ્યુટેશન-ટેસ્ટ પસંદગી અને અનુવાદ ચેક્સનો સમાવેશ થાય છે. લોડર npm
કમાન્ડ્સને package.json અને મોડેલ કરાયેલ CI/Quality ઘોષણાઓ સામે માન્ય કરે છે; તે શેલ
ટોકન્સને આર્ગ્યુમેન્ટ્સ તરીકે ચલાવવાને બદલે ફેરફારને નકારે છે. ફરજિયાત સ્કેનરનું SKIP/INCOMPLETE આઉટપુટ
PASS સ્થાપિત કરી શકતું નથી. પ્રોફાઇલ તેના બાહ્ય બાકાતોને નોંધે છે અને
હોસ્ટેડ કવરેજ, ટેસ્ટ મેટ્રિસિસ, પૅકેજ અથવા ડિપ્લોયમેન્ટ પુરાવાનું સ્થાન લેતું નથી.
નીચેની ગદ્ય ઇન્વેન્ટરી એક સંદર્ભ છે, કોઈ ગેટ ખરેખર ચાલ્યો હોવાનો પુરાવો નહીં.

સ્ક્રિપ્ટ્સ `scripts/check/` (નીતિ ગેટ્સ) અને `scripts/quality/` (રૅચેટ એન્જિન)
હેઠળ રહે છે. CI માટેનું સત્યનું અધિકૃત સ્રોત `.github/workflows/ci.yml` છે.

### પ્રકાશિત-બેઝ દસ્તાવેજીકરણની સ્થિતિ

`.github/workflows/i18n-base-health.yml` પસંદ કરેલા `main` અને `release/v*` પરના પુશ પછી તથા મેન્યુઅલ ડિસ્પેચ પર દસ્તાવેજીકરણની સ્થિતિનું નિરીક્ષણ કરે છે. તેના ફિલ્ટર્સ દસ્તાવેજીકરણ, રૂટ Markdown, `llm.txt`, અનુવાદની સ્થિતિ/રૂપરેખાંકન અને સંબંધિત i18n સાધનોને આવરી લે છે. એકમાત્ર `Published base documentation health` જોબ હોસ્ટેડ Ubuntu અને પાંચ મિનિટની સમયમર્યાદાનો ઉપયોગ કરે છે. તે માત્ર-વાંચન માન્યતા કરે છે અને ડિપેન્ડન્સી ઇન્સ્ટોલેશન, અનુવાદ અથવા સ્થિતિ અપનાવ્યા વિના ડાયગ્નોસ્ટિક રસીદ લખે છે.

`scripts/i18n/check-base-health.mjs` માટે શૂન્ય સોર્સ-હૅશ, ગેરહાજર-ટાર્ગેટ, ટાર્ગેટ-હૅશ, જૂના-અનુવાદ અને સેક્શન-કૅશ અસંગતતાઓ હોવી જરૂરી છે. તે વર્તમાન કોર દસ્તાવેજ/લોકેલ વ્યાપ અને તેના નોંધાયેલા ઉદ્ભવને પણ માન્ય કરે છે. અમાન્ય સંદર્ભ, અપૂર્ણ કવરેજ અથવા વિક્ષેપિત ચેકર `INCOMPLETE` ઉત્પન્ન કરે છે; પુષ્ટિ થયેલ વિચલન `FAIL` ઉત્પન્ન કરે છે. બંને નિષ્ફળતા દર્શાવતું એક્ઝિટ સ્ટેટસ પરત કરે છે. રસીદ ચેકઆઉટ SHA, વર્કફ્લો, રન અને પ્રયાસ સાથે બંધાયેલી છે તથા `i18n-base-health-<sha>-<run>-<attempt>` તરીકે જાળવી રાખવામાં આવે છે.

આ પ્રકાશિત બેઝનું સ્વતંત્ર નિરીક્ષણ છે. તે PR અથવા મર્જ-ગ્રૂપ ઇવેન્ટ, આવશ્યક PR ચેક, npm ઉપનામ અથવા સ્ટેટિક-સ્કૅન પ્રોફાઇલ સભ્ય ઉમેરતું નથી. હાલની ડિફરન્શિયલ PR નીતિ અને મૂળભૂત ચેકરના સલાહાત્મક વર્ગીકરણો અલગ રહે છે. સફળ અપલોડ નિષ્ફળ થયેલા હેલ્થ પરિણામને PASSમાં ફેરવી શકતું નથી.

### રિલીઝ PR ફાસ્ટ-પાથ (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main` પરના પુશ,
ડિસ્પેચ અને મર્જ ગ્રુપ્સ પર CIને પૂરક બને છે. PR પાથ-ફિલ્ટર કરેલા ઝડપી ચેક્સનો ઉપયોગ કરે છે.
કાયમી રીતે અક્ષમ કરાયેલ ડુપ્લિકેટ બિલ્ડ દૂર કરવામાં આવ્યું હતું; વાસ્તવિક
બિલ્ડ/પૅકેજ/બૂટ ચેક્સ CIમાં યથાવત્ રહે છે.

| જોબ                                              | વ્યાપ                                                                                                                                                                                                                         | અવરોધક         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | દસ્તાવેજો/કોડ PRs; API દસ્તાવેજ સંદર્ભો અને docs-all                                                                                                                                                                          | હા             |
| `Fast Quality Gates`                             | કોડ PRs; સ્ટેટિક તપાસો, પ્રકાર તપાસ, ડૅશબોર્ડ પ્રકાર તપાસ, અસરગ્રસ્ત યુનિટ પરીક્ષણો                                                                                                                                           | હા             |
| `Forgotten sibling tests`                        | કોડ PRs; બદલાયેલા મોડ્યુલોને સ્ટેટિક ઉપભોક્તાઓ અને સંભવિત સિબ્લિંગ પરીક્ષણો સુધી ટ્રેસ કરવામાં આવે છે; બેરલ અને ડાયનેમિક-ઇમ્પોર્ટ પાથ્સને સંદર્ભિત allowlist અપવાદો સાથે સલાહકારી ડાયગ્નોસ્ટિક્સ તરીકે રિપોર્ટ કરવામાં આવે છે | **સલાહકારી**   |
| `Vitest (fast-path)`                             | કોડ PRs; ઝડપી vitest સ્યુટ                                                                                                                                                                                                    | હા             |
| `Unit Tests fast-path`                           | કોડ PRs; 4-શાર્ડ યુનિટ સ્યુટ                                                                                                                                                                                                  | હા             |
| `No new ESLint warnings`                         | કોડ PRs; suppression-સજાગ lint ગાર્ડ                                                                                                                                                                                          | હા, forks સહિત |
| `Merge integrity (changelog + generated skills)` | નોન-ડ્રાફ્ટ PRs; changelog અને જનરેટ કરેલી skillનું સમન્વયન                                                                                                                                                                   | હા, forks સહિત |

#### ભૂલી જવાયેલા સિબ્લિંગ પરીક્ષણોનો રિપોર્ટ

`npm run check:forgotten-sibling-tests` પરીક્ષણ-અસર નકશા પાછળના import resolverનો ફરીથી ઉપયોગ કરે છે.
દરેક બદલાયેલા production module માટે, જ્યારે સંભવિત પરીક્ષણ pull-request diffમાં ગેરહાજર હોય ત્યારે તે નિર્ધારિત
`changed module/symbol -> static consumer -> candidate sibling test` શ્રેણીઓનો રિપોર્ટ કરે છે. કોઈપણ અવરોધક અમલીકરણ પહેલાં માપાંકન માટે Markdown સારાંશ અને JSON પરિણામને
`forgotten-sibling-tests` workflow artifact તરીકે જાળવી રાખવામાં આવે છે.

Barrel re-exports અને dynamic imports માત્ર resolution diagnostics છે; તેઓ ક્યારેય
અવરોધક તારણ બનાવતા નથી. સમીક્ષા કરેલા અપવાદો
`config/quality/forgotten-sibling-allowlist.json`માં રહે છે. દરેક એન્ટ્રીમાં consumer અને candidate
testનું નામ, ચોક્કસ તર્ક અને GitHub issue અથવા pull requestની લિંક હોવી આવશ્યક છે. ખામીયુક્ત એન્ટ્રીઓ
સુરક્ષાત્મક રીતે નિષ્ફળ થાય છે. અપવાદો કાઢી નાખેલા candidate test અથવા `.skip`/`.todo` ઉમેરતા diffને દબાવી શકતા નથી;
assertion weakening અને અન્ય masking સ્વતંત્ર રીતે અવરોધક
`check:test-masking` gateના કાર્યક્ષેત્રમાં રહે છે.

### જોબ: `lint`

`main` માટેના દરેક PR પર ચાલે છે. નિષ્ફળતા થાય તો mergeને અવરોધે છે.

| સ્ક્રિપ્ટ (`npm run ...`)         | શું માન્ય કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | અવરોધક                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js વર્ઝન સમર્થિત શ્રેણીમાં છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                        |
| `check:test-tla-order`            | `tests/unit` હેઠળની કોઈપણ `node:test` ફાઇલ ટેસ્ટ રજિસ્ટર કર્યા પછી ટોપ-લેવલ `await` સુધી પહોંચી અને ત્યારબાદ વધુ ટેસ્ટ રજિસ્ટર કરતી નથી (#18045; રૅચેટ: `test-tla-order-allowlist.json` માત્ર નાનું થઈ શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | હા                                        |
| `check:cycles`                    | સમગ્ર `src/` + `open-sse/` માં સર્ક્યુલર ઇમ્પોર્ટ્સ (AST-આધારિત, tsconfig `paths` ઉકેલાયેલા). કોઈપણ સાયકલ અસ્તિત્વમાં હોય ત્યારે બેર કમાન્ડ 1 સાથે બહાર નીકળે છે (#15281થી fail-closed) અને SCCની યાદી આપે છે. `check:cycles:ratchet` (જે CI ચલાવે છે) ત્યારે અવરોધે છે જ્યારે ગણતરી `quality-baseline.json` માંની `metrics.cycles` મર્યાદાને વટાવે — હાલમાં 14, `direction: down`, તેથી તે માત્ર ઘટી શકે છે (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                        | હા (રૅચેટ)                                |
| `check:boundary`                  | `open-sse → src` કપલિંગ: એન્જિનમાંથી ઍપમાં થતા અનન્ય ફાઇલ-થી-ફાઇલ ઇમ્પોર્ટ્સ (`scripts/quality/measure-boundary.mjs`; એજ સૂચિ v4 કોર/મોડ્યુલ-સ્પ્લિટ સુધારણા બૅકલૉગ છે). બેર કમાન્ડ = સલાહકારી રિપોર્ટ (`quality:boundary` જેવો જ). `check:boundary:ratchet` (જે CI ચલાવે છે અને `quality.yml` ફાસ્ટ-ગેટ્સ રૅચેટ લૂપમાં પણ છે) ત્યારે અવરોધે છે જ્યારે ગણતરી `quality-baseline.json` માંની `metrics.boundaryOpenSseToSrc` મર્યાદાને વટાવે — માપેલા 771 પર સીડ કરેલું, `direction: down`; `--update` તેને માત્ર ઘટાડે છે; PRમાં બેઝ-રિલેટિવ (`--base-ref`, નીચે જુઓ)                                                                                                                                                                                                                                                                                                                    | હા (રૅચેટ)                                |
| `check:route-validation:t06`      | બધા routes પર Zod schemas હાજર છે (Tier 6 નીતિ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | હા                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` ની સંખ્યા બજેટ કરતાં વધુ નથી (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | હા                                        |
| `check:provider-consistency`      | `providers.ts` માંના દરેક provider માટે `providerRegistry.ts` માં મેળ ખાતી entry છે (અને તેનાથી વિપરીત પણ, allowlist ની મર્યાદામાં)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                        |
| `check:model-lifecycle`           | હાથથી જાળવવામાં આવતા ત્રણ routing tables, ચેક-ઇન કરેલા lifecycle snapshot (#11503) સાથે સુસંગત રહે છે: `FITNESS_TABLE` (`taskFitness.ts`) એવા કોઈ નિવૃત્ત id ને score આપતું નથી જેને `REGISTRY` route કરી શકે; દરેક `BUILT_IN_ALIASES` target `REGISTRY` માં હાજર છે અને retired-id snapshot માં ગેરહાજર છે; `REGISTRY` માં હજુ રહેલો દરેક નિવૃત્ત id forward કરાયેલો છે અથવા `allowedRetiredInCatalog` માં સૂચિબદ્ધ છે; અને કોઈ `DEFAULT_DEGRADATION_MAP` source કે target તે snapshot માં નિવૃત્ત તરીકે દેખાતો નથી. આ સાબિત કરતું નથી કે કોઈ model હાલમાં live upstream દ્વારા serve કરવામાં આવે છે. Offline — `config/quality/model-lifecycle.json` સાથે તુલના કરે છે, જેને `npm run quality:refresh-model-lifecycle` વડે હાથથી refresh કરવામાં આવે છે (network; CI સાથે જોડાયેલું નથી). `allowedRetiredInCatalog` એ burn-down ratchet છે: માત્ર tracking issue સાથે જ entry ઉમેરો. | હા                                        |
| `check:fetch-targets`             | client-side `src/` માંનું દરેક `fetch("/api/...")` વાસ્તવિક `route.ts` પર resolve થાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | હા                                        |
| `check:deps`                      | repo માંના દરેક `package.json` ની તમામ `npm install` કરી શકાય તેવી deps `dependency-allowlist.json` માં છે; નવા unpinned અથવા slopsquatted packages ને flag કરવામાં આવે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | હા                                        |
| `audit:deps`                      | તમામ પાંચ સ્વતંત્ર lockfiles (root, Electron, OpenCode plugins v1/v2 અને provider)નું npm audit. ગંભીર advisories અવરોધે છે; ઉચ્ચ advisories દૃશ્યમાન ચેતવણીઓ તરીકે રહે છે. ગુમ થયેલા/નિષ્ફળ auditsને INCOMPLETE ગણવામાં આવે છે અને તે અવરોધે છે; દરેક scope માટેના lock hashes અને reports જાળવી રાખવામાં આવે છે.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                        |
| `check:lockfile`                  | `package-lock.json`ની અખંડિતતા — https registry, integrity hashes, કોઈ host overrides નહીં                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | હા                                        |
| `check:licenses`                  | production dependencies માટે SPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                        |
| `check:tracked-artifacts`         | કોઈ build artifacts / commit કરેલી `node_modules` symlinks નહીં (husky pre-commitમાં પણ ચાલે છે; pre-pushને ઇરાદાપૂર્વક હળવું રાખવામાં આવ્યું છે — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                        |
| `check:ai-attribution`            | PR commits, title અથવા bodyમાં કોઈ AI/bot `Co-Authored-By` trailer અથવા AI-generation footer નહીં — કડક નિયમ #16 (`quality.yml`ના PR→`release/**` માટેના fast-gates loopમાં — event payload વાંચે છે, PR ન હોય ત્યારે કોઈ કામગીરી કરતું નથી — અને PR→`main` માટે `ci.yml` lintમાં માત્ર-PR step; husky `commit-msg` hookમાં પણ; માનવીય co-authors માન્ય છે; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | દરેક Vitest exclusionમાં tracking issueનો ઉલ્લેખ હોવો જોઈએ અને તે `config/quality/vitest-exclusions.json`માં દેખાવું જોઈએ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                        |
| `check:file-size`                 | સોર્સ ફાઇલો (`src/`, `open-sse/`, `electron/`, `bin/` માં `.ts`/`.tsx`) `cap`ની અને ટેસ્ટ ફાઇલો (`*.test.ts(x)`) `testCap`ની મર્યાદામાં રહે છે; `file-size-baseline.json` (`frozen` / `testFrozen`) માં સ્થિર કરેલી ફાઇલો તેમના નોંધાયેલા કદ કરતાં વધવી જોઈએ નહીં                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                        |
| `check:error-helper`              | એક્ઝિક્યુટર્સ/હેન્ડલર્સમાં ભૂલ પ્રતિસાદો `buildErrorBody()` / `sanitizeErrorMessage()`નો ઉપયોગ કરે છે (કડક નિયમ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                        |
| `check:migration-numbering`       | માઇગ્રેશન SQL ફાઇલો ક્રમિક રીતે ક્રમાંકિત છે, કોઈ ખાલી ક્રમ કે ડુપ્લિકેટ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | હા                                        |
| `check:public-creds`              | `publicCreds.ts`ની બહાર કોઈ શાબ્દિક OAuth `client_id`/`client_secret` અથવા Firebase Web કી નથી (કડક નિયમ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                        |
| `check:db-rules`                  | `src/lib/db/` મોડ્યુલોની બહાર કોઈ રૉ SQL નથી; `localDb.ts`માંથી કોઈ બેરલ-ઇમ્પોર્ટ નથી (કડક નિયમો #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા                                        |
| `check:known-symbols`             | તેમની ડિસ્પેચ કોષ્ટકોમાં નોંધાયેલા પ્રોવાઇડર એક્ઝિક્યુટર્સ, રાઉટિંગ વ્યૂહરચનાઓ અને ટ્રાન્સલેટર્સ ડિસ્ક પરની ફાઇલો સાથે મેળ ખાય છે — કોઈ અનાથ અથવા અઘોષિત સિમ્બોલ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                        |
| `check:route-guard-membership`    | ચાઇલ્ડ પ્રોસેસ શરૂ કરતો દરેક રૂટ `isLocalOnlyPath()` દ્વારા વર્ગીકૃત થયેલો છે (કડક નિયમો #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                        |
| `check:test-discovery`            | રેપોમાંની દરેક `*.test.ts` / `*.spec.ts` ફાઇલ ઓછામાં ઓછા એક ટેસ્ટ રનર દ્વારા એકત્રિત કરવામાં આવે છે (રૅચેટ: `test-discovery-baseline.json` માંની અનાથ ફાઇલોની યાદી ફક્ત ઘટી શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                        |
| `check:agent-skills-sync`         | જનરેટ કરેલી એજન્ટ-સ્કિલ્સ આર્ટિફેક્ટ્સ તેમના સ્રોત કૅટલૉગ સાથે મેળ ખાય છે (કોઈ વિસંગતિ નથી)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | પ્રોવાઇડર લોગો/એસેટ્સ સાથે નોંધાયેલી ઉત્પત્તિની એન્ટ્રી જોડાયેલી છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON કૉન્ફિગ ફાઇલોનું પાર્સિંગ સફળ થાય છે અને તે રેપોના લિન્ટ નિયમોનું પાલન કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | ભૂલો વિના TypeScript કમ્પાઇલેશન (ફક્ત સલાહાત્મક ચેતવણીઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | હા                                        |
| `typecheck:noimplicit:core`       | કડક `noImplicitAny` — ભવિષ્યલક્ષી; અગાઉથી અસ્તિત્વમાં રહેલી ઘણી કૉલ સાઇટ્સને હજુ પણ ઍનોટેશન્સની જરૂર છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **સલાહાત્મક** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` સુધી મર્યાદિત `tsc` (#7033) — `typecheck:core` ની કાળજીપૂર્વક પસંદ કરેલી 27-ફાઇલની મંજૂરીસૂચિમાં કોઈ પણ ડૅશબોર્ડ TSX સામેલ નથી, અને `next build` પણ ક્યારેય તેનું ટાઇપ-ચેકિંગ કરતું નથી (`next.config.mjs` માં `ignoreBuildErrors: true` સેટ થયેલું છે), તેથી ત્યાંના અનાથ-આઇડેન્ટિફાયર રિગ્રેશન્સ (#6625/#6909) CI ને દેખાતા નહોતા. સ્થિર કરેલી પ્રતિ-ફાઇલ/પ્રતિ-TS-કોડ ગણતરીની બેઝલાઇન (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` જેવી જ સ્ટેલ-એન્ફોર્સમેન્ટ પેટર્ન) સામે તફાવતો તપાસે છે — બેઝલાઇન કરેલી ગણતરી કરતાં માત્ર નવી ભૂલો જ ગેટને નિષ્ફળ બનાવે છે; પહેલેથી રહેલી ભૂલ સુધારવામાં આવે ત્યારે `--update` વડે બેઝલાઇન ઘટાડો.                                                                                                                                                                                         | હા                                        |

### જૉબ: `quality-gate`

`test-coverage` પછી ચાલે છે. નિષ્ફળતા પર મર્જને અવરોધે છે.

| સ્ક્રિપ્ટ                    | શું માન્ય કરે છે                                                                                                                                                                 | અવરોધક                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | `quality-metrics.json` ઉત્પન્ન કરે છે (ESLint ચેતવણીઓની સંખ્યા, મર્જ કરેલા શાર્ડ રિપોર્ટમાંથી કવરેજ)                                                                             | હા (રૅચેટના અપસ્ટ્રીમમાં) |
| `quality:ratchet`            | `quality-baseline.json` માંનું દરેક મેટ્રિક રિગ્રેસ થયું નથી (ESLint ચેતવણીઓ ≤ બેઝલાઇન; કવરેજ ≥ બેઝલાઇન)                                                                         | હા                        |
| `check:duplication`          | કોડ ડુપ્લિકેશન (jscpd@4) `quality-baseline.json` માંની બેઝલાઇનને ઓળંગતું નથી                                                                                                     | હા                        |
| `check:complexity`           | ફાઇલ-સ્તરની સાઇક્લોમેટિક જટિલતા મર્યાદાને ઓળંગતી નથી (કોર ESLint `complexity` + `max-lines-per-function`)                                                                        | હા                        |
| `check:cognitive-complexity` | કૉગ્નિટિવ જટિલતા રૅચેટ (`eslint-plugin-sonarjs`) — અલગ ESLint પાસ; CI બંનેને મર્જ કરીને એકમાત્ર `check:complexity-ratchets` સ્ટેપ તરીકે ચલાવે છે                                 | હા                        |
| `check:dead-code`            | બિનઉપયોગી એક્સપોર્ટ્સ / ફાઇલોનું રૅચેટ (knip) બેઝલાઇનની સરખામણીએ રિગ્રેસ થતું નથી                                                                                                | હા                        |
| `check:compression-budget`   | કમ્પ્રેશન બેન્ચમાર્ક બજેટ — પ્રતિ-એન્જિન ટોકન-બચતની ન્યૂનતમ મર્યાદાઓ રિગ્રેસ થવી જોઈએ નહીં                                                                                       | હા                        |
| `check:type-coverage`        | ટાઇપ કરેલી ટકાવારીનું રૅચેટ (`type-coverage`) રિગ્રેસ થતું નથી; મોટા ભાગે `typecheck:noimplicit:core` ને આવરી લે છે                                                              | હા                        |
| `check:codeql-ratchet`       | ખુલ્લી CodeQL ચેતવણીઓની સંખ્યા રિગ્રેસ થતી નથી (`gh api` મારફતે વાંચે છે; ટોકન વિના સુચારુ રીતે સ્કિપ કરે છે) — રિફ્રેશ આવર્તન અને મેન્યુઅલ ટ્રિગર માટે: નીચે "CodeQL રૅચેટ" જુઓ | હા                        |

### જૉબ: `quality-extended`

આ જૉબ લાગુ પડતા ઉમેદવારોને અવરોધે છે. બંડલનું કદ, સિક્રેટ સંબંધિત તારણો, વલ્નરેબિલિટી
તારણો, વર્કફ્લો તારણો અને OpenAPI ફેરફારો જરૂરી રૅચેટ્સ વડે તપાસવામાં આવે છે.
સર્ક્યુલર-ડિપેન્ડન્સી ડાયગ્નોસ્ટિક્સ માત્ર સલાહરૂપ રહે છે. સ્કૅનરની ઇન્સ્ટોલેશન જરૂરી છે:
`scripts/ci/install-quality-scanners.sh` પિન કરેલી આવૃત્તિઓ પ્રોવિઝન કરે છે અને
ઇન્સ્ટોલેશનની નિષ્ફળતાઓને આગળ પ્રસારિત કરે છે. ગેરહાજર ટૂલ્સ, અમાન્ય રિપોર્ટ્સ અથવા ગેરહાજર બેઝલાઇન્સ
જરૂરી સ્કૅનર ગેટને અધૂરું રાખે છે.

| સ્ક્રિપ્ટ                | ચકાસે છે                                                                                                                                                                                                         | અવરોધક                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | કોઈ ચક્રીય નિર્ભરતાઓ નથી (dpdm)                                                                                                                                                                                  | **સલાહરૂપ**                                 |
| `check:bundle-size`      | બંડલનું કદ નિર્ધારિત મર્યાદાથી વધતું નથી; માપ ઉપલબ્ધ ન હોય તો ચકાસણી નિષ્ફળ થાય છે                                                                                                                               | **--ratchet સાથે અવરોધક**                   |
| `check:secrets`          | Gitleaksનાં તારણોમાં પ્રતિકૂળ ફેરફાર થતો નથી; આવશ્યક સ્કૅન ગુમ થયેલાં સાધનો/સ્રોત/બેઝલાઇન, નિષ્ફળ સ્કૅન અને અમાન્ય રિપોર્ટને નકારે છે                                                                            | **--ratchet સાથે અવરોધક**                   |
| `check:vuln-ratchet`     | નિર્ભરતાની નબળાઈઓમાં પ્રતિકૂળ ફેરફાર થતો નથી; આવશ્યક સ્કૅન ગુમ થયેલાં સાધનો, અમાન્ય રિપોર્ટ અથવા ગુમ થયેલી બેઝલાઇનને નકારે છે                                                                                    | **--ratchet સાથે અવરોધક**                   |
| `check:workflows`        | વર્કફ્લો લિન્ટ (actionlint + zizmor); ગુમ થયેલાં/ખામીયુક્ત સ્કૅનર, અમાન્ય રિપોર્ટ અથવા ગુમ થયેલી ratchet બેઝલાઇન INCOMPLETE તરીકે નિષ્ફળ થાય છે. માન્ય તારણો પસંદ કરેલી strict/advisory/ratchet નીતિને અનુસરે છે | અમલીકરણ આવશ્યક; CIમાં zizmor ratchet અવરોધક |
| `check:openapi-breaking` | પિન કરેલાં ઇવેન્ટ કમિટ સામે સાર્વજનિક API કરાર (PR merge-base, push પહેલાં, merge-group base; scheduled/manual checkout માટે first parent); આવશ્યક માપ બંધ સ્થિતિમાં નિષ્ફળ થાય છે                               | **--ratchet સાથે અવરોધક**                   |

### જોબ: `docs-sync-strict`

`main` અથવા `release/**` માટેની પુલ રિક્વેસ્ટમાં આ જોબ ફક્ત એવા ઉમેદવારો માટે ચાલે છે જે ડ્રાફ્ટ નથી (અથવા વિશ્વસનીય કતારમાં છે) અને જેમને દસ્તાવેજીકરણ અથવા કોડના ફેરફારો તરીકે વર્ગીકૃત કરવામાં આવ્યા છે. તે PR સિવાયની CI ઘટનાઓમાં પણ ચાલે છે; આ વર્કફ્લોનો push ટ્રિગર ફક્ત `main`ને આવરી લે છે, `release/**`ને નહીં. કોઈ પગલું શૂન્ય સિવાયના એક્ઝિટ કોડ સાથે પૂરું થાય તો તે જોબને અવરોધે છે; ફક્ત અહેવાલમાં દર્શાવાતા તારણો અને નીચે નોંધેલા અપવાદો તેને અવરોધતા નથી.

| સ્ક્રિપ્ટ                      | ચકાસે છે                                                                                                                                                                                                                                                                                                                                                                                                                                          | અવરોધક                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | નીચેના 7 પેટા-ગેટ ક્રમિક રીતે ચલાવતું મેટા-ગેટ                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                                                                                                                                    |
| ↳ `check:docs-sync`            | પેકેજ/OpenAPI/CHANGELOGની આવૃત્તિઓમાં સુસંગતતા, `llm.txt`ની અક્ષરશઃ સમાન નકલો, અનુવાદિત CHANGELOGના વિભાગો અને કદ માટેની અપરિવર્તનીય શરતો, તથા નવા દસ્તાવેજોથી બદલાઈ ગયેલા જૂના ડુપ્લિકેટ દસ્તાવેજોની ગેરહાજરી                                                                                                                                                                                                                                    | હા                                                                                                                                                    |
| ↳ `check:docs-frontmatter`     | કમ્પાઇલ કરેલાં દસ્તાવેજીકરણ પૃષ્ઠોમાં માન્ય frontmatter શીર્ષકો છે                                                                                                                                                                                                                                                                                                                                                                                | હા                                                                                                                                                    |
| ↳ `check:docs-counts`          | ઉચ્ચ વિશ્વસનીયતાવાળી ગણતરીની અપરિવર્તનીય શરતો કડક રીતે લાગુ થાય છે; ફાઇલોની સંખ્યાની અંદાજ આધારિત ચકાસણીઓ ફક્ત ચેતવણી આપે છે, સિવાય કે સ્ક્રિપ્ટને `--strict` આપવામાં આવે (CIનું મેટા-ગેટ આ ફ્લૅગ આપતું નથી)                                                                                                                                                                                                                                      | કડક સ્તર અવરોધક છે; નરમ સ્તર સલાહરૂપ છે                                                                                                               |
| ↳ `check:env-doc-sync`         | સ્પષ્ટ અવગણના-યાદી, ફક્ત દસ્તાવેજોમાં હોય તેવા અને ફક્ત પર્યાવરણમાં હોય તેવા ચલોની મંજૂરી-યાદીઓ લાગુ કર્યા પછી સ્રોત કોડમાં વાંચાતા પર્યાવરણ ચલો, `.env.example` અને `docs/reference/ENVIRONMENT.md` એકબીજા સાથે સુસંગત હોય છે                                                                                                                                                                                                                    | હા, દસ્તાવેજીકૃત મંજૂરી-યાદીઓની બહાર                                                                                                                  |
| ↳ `check:deprecated-versions`  | અવગણેલા દસ્તાવેજોને બાકાત રાખીને, સલામત ઐતિહાસિક સંદર્ભોની બહાર સંભવિત જૂની આવૃત્તિઓ અને જૂની અપડેટ તારીખોની જાણ કરે છે                                                                                                                                                                                                                                                                                                                           | હાલની CI ગોઠવણીમાં સલાહરૂપ (`--strict` આપવામાં આવતું નથી)                                                                                             |
| ↳ `check:doc-links`            | દસ્તાવેજોમાંની આંતરિક markdown લિંક્સ વાસ્તવિક ફાઇલો તરફ દોરી જાય છે (`[text]`/`(path)` સ્વરૂપ)                                                                                                                                                                                                                                                                                                                                                   | હા                                                                                                                                                    |
| ↳ `check:fabricated-docs`      | દસ્તાવેજોમાં ઉલ્લેખિત routes, env vars, CLI commands, hook names અને file paths કોડબેઝમાં અસ્તિત્વ ધરાવે છે. `--strict` દ્વારા કડક ગેટ; ફ્લૅગ વિના soft-fail.                                                                                                                                                                                                                                                                                     | હા (CIમાં `--strict` દ્વારા)                                                                                                                          |
| `check:cli-i18n`               | CLIમાં વપરાતી `t()` કીઝ `en`માં છે; `pt-BR` દરેક ટોચના સ્તરનો વિભાગ જાળવે છે; `zh-CN` અને `zh-TW`માં `en`ની દરેક કી છે                                                                                                                                                                                                                                                                                                                            | હા                                                                                                                                                    |
| `check:openapi-coverage`       | OpenAPI spec વાસ્તવિક routesના ઓછામાં ઓછા ratcheted floorને આવરી લે છે                                                                                                                                                                                                                                                                                                                                                                            | હા                                                                                                                                                    |
| `check:openapi-security-tiers` | જાહેર કરેલા `x-loopback-only`/`x-always-protected` ઍનોટેશન્સને `routeGuard.ts`માં આધાર મળવો જોઈએ; પાર્સરની ભૂલો અને આગળની દિશાની ચકાસણીમાં અસંગતતાઓ અવરોધે છે. ફક્ત સ્થાનિક ઍક્સેસ માટેના ઉપસર્ગો હેઠળ `x-loopback-only` ગાયબ છે કે નહીં તેની વિપરીત દિશાની ચકાસણી ચેતવણી આપે છે, અને ફક્ત પેટર્નથી નિર્ધારિત રૂટ્સ તે વિપરીત ચકાસણીમાંથી બાકાત રહે છે.                                                                                           | પાર્સર અને આગળની દિશાની ચકાસણીઓ અવરોધક છે; વિપરીત ચકાસણી સલાહરૂપ છે                                                                                   |
| `check:openapi-routes`         | કારણ સાથે નોંધેલી `KNOWN_STALE_SPEC` મંજૂરી-યાદી લાગુ કર્યા પછી `openapi.yaml`માંનો દરેક `/api...` પાથ પરિમાણોના તફાવતોને અવગણીને વાસ્તવિક રૂટ સાથે મેળ ખાય છે; મંજૂરી-યાદીની હવે લાગુ ન પડતી નોંધો પણ નિષ્ફળતા લાવે છે                                                                                                                                                                                                                           | હા                                                                                                                                                    |
| `check:docs-symbols`           | નકલરૂપ ન હોય તેવા અધિકૃત મૂળ દસ્તાવેજોના આંતરિક `/api/...` URL સંદર્ભો વાસ્તવિક રૂટ અથવા રૂટ-સમૂહ સાથે મેળ ખાય છે; પ્રોક્સી/અપસ્ટ્રીમ/પ્લેસહોલ્ડર/ફાઇલ સંદર્ભો અને કારણ સાથે નોંધેલી `KNOWN_STALE_DOC_REFS` નોંધો બાકાત છે, અને મંજૂરી-યાદીની હવે લાગુ ન પડતી નોંધો નિષ્ફળતા લાવે છે                                                                                                                                                              | હા                                                                                                                                                    |
| `i18n translation drift`       | મુખ્ય દસ્તાવેજોના સ્રોત/લક્ષ્ય હૅશ અને અનુવાદની ઉત્પત્તિ તપાસે છે. PR સરખામણીમાં માત્ર બરાબર એકસરખી વારસામાં મળેલી નિષ્ફળતાઓને મંજૂરી મળે છે; સ્રોત, ગેરહાજર લક્ષ્ય, લક્ષ્ય હૅશ, જૂનો અનુવાદ અથવા વિભાગ કૅશની નવી કે ચકાસણી વગરની અસંગતતાઓ અવરોધે છે. PR સરખામણીની બહાર સ્રોત/ગેરહાજર લક્ષ્ય/લક્ષ્ય હૅશની નિષ્ફળતાઓ અવરોધે છે, જ્યારે જૂના અનુવાદો અને અસંગત વિભાગ કૅશ માત્ર ચેતવણીરૂપ રહે છે. જૂના બંધારણનો વિભાગ કૅશ ગેરહાજર હોવો નિષ્ફળતા નથી. | PRમાં નવું/ચકાસણી વગરનું વિચલન અવરોધે છે; બરાબર એકસરખું વારસામાં મળેલું વિચલન માત્ર ચેતવણીરૂપ છે; PRની બહારના નિયમો નિષ્ફળતાના પ્રકાર પર આધાર રાખે છે |

### જોબ: `i18n-ui-coverage`

| સ્ક્રિપ્ટ                         | શું માન્ય કરે છે                                                                                                                                                                  | અવરોધક     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (ઇનલાઇન) | UI i18n કી કવરેજ ≥ 65% છે                                                                                                                                                         | હા         |
| `check-ui-value-drift` (ઇનલાઇન)   | ફરી લખાયેલું અંગ્રેજી **મૂલ્ય** કોઈ જૂનો અનુવાદ પાછળ છોડતું નથી                                                                                                                   | હા         |
| `check-new-key-coverage` (ઇનલાઇન) | **નવી** અંગ્રેજી કીનો દરેક લોકેલમાં અનુવાદ થયેલો છે — `__MISSING__:` માર્કર નકારવામાં આવે છે                                                                                      | હા         |
| `check-translation-ratio`         | લોકેલ દીઠ વાસ્તવિક-અનુવાદનો ગુણોત્તર (અંગ્રેજી-સમાન / પ્લેસહોલ્ડર / અનુમતિસૂચિની બહારની ગુમ એન્ટ્રીઓ) `config/quality/i18n-translation-baseline.json` + છૂટ કરતાં વધુ ન હોવો જોઈએ | **અવરોધક** |

`fetch-depth: 0` જરૂરી છે — મૂલ્ય-ડ્રિફ્ટ ગેટ `en.json`ને મર્જ બેઝ સામે ડિફ કરે છે.

#### `check-ui-value-drift` — જૂના-અનુવાદનો ગેટ

આ તે એક i18n રિગ્રેશનને પકડે છે જેને અન્ય ગેટ માળખાકીય રીતે જોઈ શકતા નથી: કોઈ અંગ્રેજી મૂલ્ય
ફરી લખાય અને _અગાઉના_ અંગ્રેજીમાંથી મેળવેલા અનુવાદો એમ જ રહી જાય, જેથી
બિન-અંગ્રેજી વપરાશકર્તાઓ આત્મવિશ્વાસપૂર્વક લખાયેલી, પણ હવે ખોટી નકલ વાંચતા રહે છે.

આ ખરેખર રિલીઝ થયું હતું. Antigravity લૉગિન સહાયક ઉમેરાયો ત્યારે (#5203)
`oauthModal.googleOAuthWarning` ફરી લખવામાં આવ્યું હતું; **43માંથી 39 લોકેલમાં** ઑપરેટરોને "સંપૂર્ણ
URL કૉપિ કરીને નીચે પેસ્ટ કરો" કહેતો ટેક્સ્ટ યથાવત્ રહ્યો — તે પ્રદાતા માટે આ પ્રવાહ પૂર્ણ થઈ શકતો નથી. તે
#8463 સુધી ધ્યાનમાં આવ્યું નહોતું, કારણ કે:

- `sync-ui-keys` માત્ર **ગેરહાજર** કીઓને બેકફિલ કરે છે, **જૂની** કીઓને ક્યારેય નહીં;
- `check-ui-keys-coverage` કીની _હાજરી_ ગણે છે, તેથી જૂનો અનુવાદ આવરી લેવાયેલ તરીકે ગણાય છે;
- `check-translation-drift` `docs/i18n/<locale>/**.md` દસ્તાવેજીકરણ મિરર્સને ટ્રૅક કરે છે —
  તે ક્યારેય `src/i18n/messages/*.json` વાંચતું નથી. 2026-09ના પુનઃ-સિંકથી job `docs-sync-strict`માં અવરોધક:
  મુખ્ય દસ્તાવેજ સંપાદિત કરો → `npm run i18n:run -- --files=<doc>` (વિભાગ-સ્તરનું, સસ્તું).

**ડિફ-સચેત, બેઝલાઇન-આધારિત નહીં.** તે મર્જ બેઝ પરના `en.json`ની વર્કિંગ ટ્રી સાથે
સરખામણી કરે છે; જે દરેક કીનું અંગ્રેજી મૂલ્ય બદલાયું હોય, તેના માટે હજુ પણ
અસ્પર્શિત અનુવાદ ધરાવતો કોઈપણ લોકેલ જૂનો ગણાય છે. આ ઇરાદાપૂર્વક **અગાઉથી હાજર ઋણને સ્થિર કરે છે** — ડિફ
એ જાહેર કરી શકતું નથી કે લાંબા સમયથી હાજર અનુવાદ કયા જૂના અંગ્રેજીમાંથી આવ્યો હતો, તેથી ગેટ
માત્ર વર્તમાન ફેરફાર જે વસ્તુઓને સ્પર્શે છે તેનું મૂલ્યાંકન કરે છે. વિકલ્પ (પ્રતિ-કી હૅશ બેઝલાઇન) માટે
લગભગ 600 KBની જનરેટ કરેલી ફાઇલની જરૂર પડે, જે હાલની સૌથી મોટી બેઝલાઇનથી 3× મોટી હોય અને દરેક i18n PRમાં બદલાતી રહે.

તેને સંતોષવાના બે માર્ગ છે:

1. અસરગ્રસ્ત અનુવાદોને અપડેટ કરો, અથવા
2. તેમને `__MISSING__:<new english>` પર સેટ કરો — ત્યારબાદ રનટાઇમ સુધારેલું અંગ્રેજી આપે છે
   (`src/i18n/request.ts::deepMergeFallback`, #7258) અને કી અનુવાદ માટે કતારમાં જાય છે.

જો સ્ટ્રિંગનો **અર્થ** બદલાયો હોય, તો **કીનું નામ બદલવાનું** પસંદ કરો: નવી કીને
જૂનો અનુવાદ વારસામાં મળી શકતો નથી. #8463માં આ જ પેટર્ન વપરાયું હતું.

```bash
npm run i18n:check-value-drift          # કડક (CI જે ચલાવે છે)
npm run i18n:check-value-drift:warn     # માત્ર અહેવાલ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

મૂલ્ય-વિચલન અને નવી-કી ગેટ્સ `scripts/i18n/resolve-ui-diff-base.mjs`માંથી એક જ અપરિવર્તનીય સરખામણી શેર કરે છે. વર્કફ્લો બંને ચકાસણીઓને સમાન બેઝ, બેઝ-ટિપ અને ઉમેદવાર SHA આપે છે. PR/બેઝ-રીટાર્ગેટ, પુશ અને મર્જ-ગ્રુપ રન તેમના ઇવેન્ટ સંદર્ભનો ઉપયોગ કરે છે. ઉમેદવાર બ્રાન્ચને ડિસ્પેચ કરવા માટે તેનો ચોક્કસ ખુલ્લો PR અથવા સ્પષ્ટ `i18n_base_sha` ઇનપુટ આવશ્યક છે. તે ઇનપુટ વિના `main` અથવા `release/vX.Y.Z`નું ડિસ્પેચ અથવા શેડ્યૂલ કરેલું અવલોકન છેલ્લા કમિટની તેના પ્રથમ પેરેન્ટ સાથે સરખામણી કરે છે; તે વારસામાં મળેલા તમામ અનુવાદ ઋણનું ઑડિટ નથી. સ્થાનિક ઇન્વોકેશન માટે સ્પષ્ટ સરખામણી બેઝ આવશ્યક છે, ઉદાહરણ તરીકે ઉપરનો `BASE_REF` કમાન્ડ.

ખૂટતો અથવા અસ્પષ્ટ સરખામણી સંદર્ભ, વાંચી ન શકાય તેવી અથવા અમાન્ય આવશ્યક કેટલૉગ, અને બદલાયેલ ઉમેદવાર, વૉર્ન મોડ સહિત, એક્ઝિટ કોડ **2** સાથે `INCOMPLETE` ઉત્પન્ન કરે છે. કેટલૉગ વાંચવા માટે `scripts/i18n/read-ui-catalog.mjs`નો ઉપયોગ થાય છે; વાંચન નિષ્ફળતાઓને ખાલી ઑબ્જેક્ટથી બદલવામાં આવતી નથી. અનુપલબ્ધ બેઝ કે અધૂરું ઇનપુટ—બેમાંથી કોઈ પણ PASS સ્થાપિત કરતું નથી.

### જોબ: `i18n`

સંપૂર્ણ i18n માન્યતા મેટ્રિક્સ (દરેક લોકેલ દીઠ એક જોબ). આખો જોબ સલાહરૂપ છે.

| સ્ક્રિપ્ટ                       | શું માન્ય કરે છે           | અવરોધક                                               |
| ------------------------------- | -------------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | લોકેલ દીઠ અનુવાદની પૂર્ણતા | **સલાહરૂપ** (સમગ્ર જોબ પર `continue-on-error: true`) |

### જોબ: `pr-test-policy`

માત્ર પુલ રિક્વેસ્ટ્સ પર ચાલે છે.

| સ્ક્રિપ્ટ              | શું માન્ય કરે છે                                                                                                                | અવરોધક |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, અથવા `bin/`માં પ્રોડક્શન કોડ બદલતા PRમાં ટેસ્ટ સામેલ અથવા અપડેટ હોવા આવશ્યક છે (કડક નિયમ #8)  | હા     |
| `check:test-masking`   | બદલાયેલી ટેસ્ટ ફાઇલો નેટ અસર્ટ ગણતરી ઘટાડતી નથી અથવા `assert.ok(true)` ટૉટોલૉજી ઉમેરતી નથી                                      | હા     |
| `check:pr-evidence`    | PR બોડી ફેરફાર માટે ટેસ્ટ/VPS પુરાવાનો ઉલ્લેખ કરે છે (PR ગદ્યને grep કરીને કડક નિયમ #18ને સ્વચાલિત કરે છે — નાજુક, Backlog જુઓ) | હા     |

### જોબ: `test-vitest`

`changes` વર્ગીકરણ જોબ જરૂરી છે. લાગુ પડતા મેટ્રિક્સ શાર્ડ્સ નિષ્ફળ જાય તો મર્જ અવરોધાય છે.

| સુટ              | ચકાસે છે                                           | અવરોધક                                                                                                                                       |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP સર્વર (110 ટૂલ્સ), autoCombo, કૅશ — vitest રનર | હા                                                                                                                                           |
| `test:vitest:ui` | UI કમ્પોનન્ટ પરીક્ષણો — vitest રનર                 | **અવરોધક** — અગાઉથી અસ્તિત્વમાં રહેલી નિષ્ફળતાઓને `vitest.config.ts`માં સ્પષ્ટપણે બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ જોબને નિષ્ફળ બનાવે છે |

### રાત્રિકાલીન વર્કફ્લો (નિર્ધારિત, સલાહરૂપ)

આ cron શેડ્યૂલ પર (અને `workflow_dispatch` દ્વારા) ચાલે છે, PR પર ક્યારેય નહીં. બધા સલાહરૂપ છે.

| વર્કફ્લો               | ચકાસે છે                                                                                                                                                            | અવરોધક      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | રૅન્ડમ સીડ + ઉચ્ચ રન ગણતરી સાથેના fast-check પ્રોપર્ટી પરીક્ષણો                                                                                                     | **સલાહરૂપ** |
| `nightly-resilience`   | હીપ-વૃદ્ધિ ગેટ, કેઓસ ફૉલ્ટ-ઇન્જેક્શન, k6 લોડ/સોક                                                                                                                    | **સલાહરૂપ** |
| `nightly-llm-security` | promptfoo ઇન્જેક્શન ગાર્ડ (બ્લોક મોડ) + garak પ્રોબ્સ (પ્રોવાઇડર સિક્રેટ વિના છોડવામાં આવે છે)                                                                      | **સલાહરૂપ** |
| `nightly-schemathesis` | `docs/openapi.yaml`નો ઉપયોગ કરીને લાઇવ OmniRoute સામે OpenAPI કોન્ટ્રાક્ટ ફઝિંગ (schemathesis) — સ્પેક ઉલ્લંઘનો / હેન્ડલ ન થયેલી 500 ભૂલો દર્શાવે છે (તબક્કો 8 B.4) | **સલાહરૂપ** |
| `nightly-mutation`     | ઝડપી યુનિટ લેન પર Stryker મ્યુટેશન-ટેસ્ટિંગ સ્કોર — બચી ગયેલા મ્યુટન્ટ્સ નબળા અસર્ટ્સ દર્શાવે છે                                                                    | **સલાહરૂપ** |
| `nightly-compat`       | સમર્થિત `engines.node` રેન્જોમાં Node એન્જિન સુસંગતતા મેટ્રિક્સ                                                                                                     | **સલાહરૂપ** |

પર્ફોર્મન્સ બેઝલાઇન (હીપ, TTFB, બિલ્ડ સમય) રેકોર્ડ કરવામાં આવે છે, પરંતુ ગેટ કરવામાં આવતી નથી: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) જુઓ.

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

**ઉપર દસ્તાવેજીકૃત ન કરેલું પણ** (સલાહરૂપ, ઓછો સંકેત): `docs-lint` જૉબ
(markdownlint + Vale, સમગ્ર જૉબ `continue-on-error`) અને સ્વતંત્ર સ્કેનર વર્કફ્લો
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json`માં છે, પરંતુ `ci.yml`માં તેને બ્લૉકિંગ રૅચેટ સાથે જોડવામાં આવ્યું નથી — આ મેટ્રિક
હાલમાં અનાથ છે.

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
