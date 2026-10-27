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

### ઉમેદવારની સ્વીકૃતિ

CI અને Quality Gates વર્કફ્લો દરેક એક સ્થિર ચુકાદો આપે છે: `Gate / CI` અને
`Gate / Quality`. તેમની વર્ઝન કરેલી સ્વીકૃતિ નીતિ દરેક અપસ્ટ્રીમ જૉબને
આવશ્યક અથવા સલાહરૂપ તરીકે સૂચિબદ્ધ કરે છે. લાગુ પડતી આવશ્યક જૉબ સફળ થવી આવશ્યક છે:
ગેરહાજર, રદ થયેલા, સ્કિપ થયેલા, બાકી રહેલા અને અજ્ઞાત પરિણામો PASS સ્થાપિત કરી શકતા નથી. માન્ય
માત્ર-દસ્તાવેજો અથવા માત્ર-કૅટલૉગ વર્ગીકરણ કોડ લેનને લાગુ ન પડતી બનાવી શકે છે;
ડ્રાફ્ટ PR સ્વીકૃત ઉમેદવાર નથી. `hotfix` લેબલ પુરાવાની આવશ્યકતા માફ કરતું નથી.

બંને વર્કફ્લો main/release બ્રાન્ચમાં આવતા PR, `main` પરના પુશ, મેન્યુઅલ ડિસ્પેચ
અને merge-group ઇવેન્ટ્સને આવરી લે છે. પુશ, ડિસ્પેચ અને merge-group સંપૂર્ણ પસંદગી ચલાવે છે.
`release/**` પરના પુશ તેમને શરૂ કરતા નથી (2026-10-18): દરેક ફેરફાર તેના PR પર
પહેલેથી જ મેટ્રિક્સમાંથી પસાર થઈ ચૂક્યો હોય છે અને મર્જ કરેલું સંયોજન Release-Greenનું કાર્ય છે
(`docs/ops/RUNNER_BOX.md` → Hosted લેન). ફોર્ક્સ અને merge groups એવી જૉબ્સ માટે hosted runners
વાપરે છે જે અન્યથા self-hosted runners પસંદ કરે છે; રોલઆઉટ પહેલાં પૂરતી hosted ક્ષમતાની
ચકાસણી કરવી આવશ્યક છે.

દરેક JSON રસીદ checkout કરેલ SHA, workflow run અને attempt ઓળખાવે છે.
CLI checkout/event SHA mismatch ને નકારે છે. વર્કફ્લો પરીક્ષણો નીતિના સભ્યપદને
verdict jobની `needs` સૂચિ સાથે બાંધે છે, જેથી નવી અથવા દૂર કરેલી લેન નિઃશબ્દ રીતે અદૃશ્ય ન થઈ શકે.
રસીદો પોતાના વર્કફ્લોને આવરી લે છે, પ્રકાશન, ડિપ્લોયમેન્ટ અથવા હાલના
સલાહરૂપ સ્કેનરની આંતરિક બાબતોને નહીં. બ્રાન્ચ નિયમોમાં બંને ચેક નામ સક્રિય કરવાં એ
અલગ વહીવટી ફેરફાર છે; આ જૉબ્સ ઉમેરવાથી બ્રાન્ચને આપમેળે સુરક્ષા મળતી નથી.

### સ્ટેટિક સ્કૅન ઇન્વેન્ટરી

વર્ઝન કરેલી npm-alias ઇન્વેન્ટરી અને static-scan સભ્યપદ
`config/quality/gate-manifest.json`માં રહે છે. સ્ક્રિપ્ટનાં નામો અને ચોક્કસ કમાન્ડ્સને
`package.json` સામે માન્ય કરવા માટે `npm run check:gate-manifest` ચલાવો; ઉમેરાઓ, દૂર કરવું
અને કમાન્ડમાં વિચલન, બંને સ્થાનિક હૂક અને CIમાં change-classification jobsને નિષ્ફળ કરે છે.
alias એ workflow job, matrix instance અથવા test case નથી: આ ગણતરીઓને
પરસ્પર વિનિમયક્ષમ તરીકે રજૂ કરવી જોઈએ નહીં.

પસંદ કરેલા aliasesને ચલાવ્યા વિના તપાસવા માટે `npm run quality:scan -- --list` અથવા
`npm run quality:scan:fast -- --list` વાપરો. રનર npm entrypointને ચલાવે છે, તેથી તેનો
runtime (જ્યાં ગોઠવાયેલ હોય ત્યાં Bun સહિત) જળવાઈ રહે છે.
મેનિફેસ્ટ આ પ્રોફાઇલ્સની બહારના aliasesને અલગથી ચલાવવામાં આવતા તરીકે નોંધે છે, અને
ફક્ત-વાંચન scan profilesમાં maintenance commands પ્રતિબંધિત છે.

આ પ્રોફાઇલ્સ માત્ર static scanને આવરી લે છે. તેઓ product tests,
coverage, packaging, external checks અથવા ઉમેદવારની સંપૂર્ણ release acceptanceને પ્રમાણિત કરતા નથી.
Workflow admission લિંક કરેલ `config/quality/admission-policy.json` અને
`scripts/quality/admission-verdict.mjs`નો ઉપયોગ કરે છે. Release-observer profiles અલગ રહે છે;
તેમના લાગુ પડતા checks અને receiptsને સ્વતંત્ર રીતે તપાસો. નીચે આપેલી ગદ્યરૂપ
ઇન્વેન્ટરી એક સંદર્ભ છે, ગેટ ખરેખર ચાલ્યો હતો તેનો પુરાવો નહીં.

સ્ક્રિપ્ટ્સ `scripts/check/` (policy gates) અને `scripts/quality/` (ratchet engine) હેઠળ રહે છે.
CI માટે અધિકૃત સ્રોત `.github/workflows/ci.yml` છે.

### Release PR ફાસ્ટ-પાથ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs, `main` પરના pushes,
dispatch અને merge groups માટે CIને પૂરક બને છે. PRs path-filtered ઝડપી checksનો ઉપયોગ કરે છે.
કાયમી રીતે અક્ષમ duplicate build દૂર કરવામાં આવ્યું હતું; વાસ્તવિક build/package/boot checks CIમાં યથાવત્ છે.

| જૉબ                                              | વ્યાપ                                                                                                                                                                                                                      | અવરોધક         |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs અને docs-all                                                                                                                                                                                  | હા             |
| `Fast Quality Gates`                             | Code PRs; static checks, typecheck, dashboard typecheck, અસરગ્રસ્ત unit tests                                                                                                                                              | હા             |
| `Forgotten sibling tests`                        | Code PRs; બદલાયેલા modulesને static consumers અને candidate sibling tests સુધી ટ્રેસ કરવામાં આવે છે; barrel અને dynamic-import pathsને સંદર્ભિત allowlist exceptions સાથે સલાહરૂપ diagnostics તરીકે રિપોર્ટ કરવામાં આવે છે | **સલાહરૂપ**    |
| `Vitest (fast-path)`                             | Code PRs; ઝડપી vitest suite                                                                                                                                                                                                | હા             |
| `Unit Tests fast-path`                           | Code PRs; 4-shard unit suite                                                                                                                                                                                               | હા             |
| `No new ESLint warnings`                         | Code PRs; suppressions-aware lint guard                                                                                                                                                                                    | હા, forks સહિત |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; changelog અને generated skill sync                                                                                                                                                                          | હા, forks સહિત |

#### ભૂલી ગયેલા sibling testsનો રિપોર્ટ

`npm run check:forgotten-sibling-tests` ટેસ્ટ-ઇમ્પેક્ટ મેપ પાછળના ઇમ્પોર્ટ રિઝોલ્વરનો પુનઃઉપયોગ કરે છે.
બદલાયેલા દરેક પ્રોડક્શન મોડ્યુલ માટે, જ્યારે ઉમેદવાર ટેસ્ટ પુલ-રિક્વેસ્ટ ડિફમાં
ગેરહાજર હોય ત્યારે તે નિર્ધારિત
`changed module/symbol -> static consumer -> candidate sibling test` શૃંખલાઓનો અહેવાલ આપે છે. કોઈપણ બ્લોકિંગ રોલઆઉટ પહેલાં કેલિબ્રેશન માટે Markdown સારાંશ અને JSON પરિણામને
`forgotten-sibling-tests` વર્કફ્લો આર્ટિફેક્ટ તરીકે જાળવી રાખવામાં આવે છે.

બેરલ રી-એક્સપોર્ટ્સ અને ડાયનેમિક ઇમ્પોર્ટ્સ માત્ર રિઝોલ્યુશન ડાયગ્નોસ્ટિક્સ છે; તેઓ ક્યારેય
બ્લોકિંગ તારણ બનાવતા નથી. સમીક્ષા કરાયેલા અપવાદો
`config/quality/forgotten-sibling-allowlist.json`માં રહે છે. દરેક એન્ટ્રીમાં કન્ઝ્યુમર અને ઉમેદવાર
ટેસ્ટનું નામ, ચોક્કસ કારણ અને GitHub ઇશ્યૂ અથવા પુલ રિક્વેસ્ટની લિંક હોવી આવશ્યક છે. ખામીયુક્ત એન્ટ્રીઓ
બંધ સ્થિતિમાં નિષ્ફળ જાય છે. અપવાદો કાઢી નાખવામાં આવેલા ઉમેદવાર ટેસ્ટ અથવા `.skip`/`.todo` ઉમેરતા ડિફને દબાવી શકતા નથી;
એસર્શનને નબળું બનાવવું અને અન્ય માસ્કિંગ સ્વતંત્ર રીતે બ્લોકિંગ
`check:test-masking` ગેટના કાર્યક્ષેત્રમાં રહે છે.

### જૉબ: `lint`

`main` માટેની દરેક PR પર ચાલે છે. નિષ્ફળતા આવે તો મર્જને અવરોધે છે.

| સ્ક્રિપ્ટ (`npm run ...`)         | શું માન્ય કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | અવરોધક                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js સંસ્કરણ સમર્થિત શ્રેણીમાં છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:cycles`                    | સમગ્ર `src/` + `open-sse/` માં ચક્રીય imports (AST-આધારિત, tsconfig `paths` ઉકેલાયેલા). કોઈપણ cycle અસ્તિત્વમાં હોય ત્યારે મૂળ સ્ક્રિપ્ટ 1 સાથે બહાર નીકળે છે (#15281થી fail-closed) અને SCCsની યાદી આપે છે. `check:cycles:ratchet` (જે CI ચલાવે છે) ત્યારે અવરોધે છે જ્યારે ગણતરી `quality-baseline.json`માંની `metrics.cycles` મર્યાદા કરતાં વધી જાય — હાલમાં 14, `direction: down`, તેથી તે માત્ર ઘટી શકે છે (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                        | હા (ratchet)                            |
| `check:boundary`                  | `open-sse → src` coupling: engineમાંથી appમાં આવતા અનન્ય file-to-file imports (`scripts/quality/measure-boundary.mjs`; edge સૂચિ v4 core/module-split remediation backlog છે). મૂળ સ્ક્રિપ્ટ = સલાહરૂપ અહેવાલ (`quality:boundary` જેવો જ). `check:boundary:ratchet` (જે CI ચલાવે છે અને `quality.yml` fast-gates ratchet loopમાં પણ છે) ત્યારે અવરોધે છે જ્યારે ગણતરી `quality-baseline.json`માંની `metrics.boundaryOpenSseToSrc` મર્યાદા કરતાં વધી જાય — માપવામાં આવેલા 771 પર પ્રારંભિક રીતે નિર્ધારિત, `direction: down`; `--update` તેને માત્ર ઘટાડે છે; PRs પર base-relative (`--base-ref`, નીચે જુઓ)                                                                                                                                                                                                                                                                | હા (ratchet)                            |
| `check:route-validation:t06`      | તમામ routes પર Zod schemas હાજર છે (Tier 6 નીતિ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` ની સંખ્યા બજેટ કરતાં વધુ નથી (ટિયર 11 કાત્રાકા)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | હા                                      |
| `check:provider-consistency`      | `providers.ts` માંના દરેક પ્રદાતા માટે `providerRegistry.ts` માં મેળ ખાતી એન્ટ્રી છે (અને તેનાથી વિપરીત પણ, મંજૂરીસૂચિની મર્યાદામાં)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:model-lifecycle`           | હાથથી જાળવવામાં આવતા ત્રણ રાઉટિંગ કોષ્ટકો ચેક-ઇન કરેલા લાઇફસાઇકલ સ્નૅપશૉટ (#11503) સાથે સુસંગત રહે છે: `FITNESS_TABLE` (`taskFitness.ts`) એવા કોઈ નિવૃત્ત IDને સ્કોર કરતું નથી જેને `REGISTRY` રૂટ કરી શકે; દરેક `BUILT_IN_ALIASES` લક્ષ્ય `REGISTRY` માં હાજર અને નિવૃત્ત-ID સ્નૅપશૉટમાં ગેરહાજર છે; `REGISTRY` માં હજી રહેલો દરેક નિવૃત્ત ID ફોરવર્ડ કરાયેલો છે અથવા `allowedRetiredInCatalog` માં સૂચિબદ્ધ છે; અને `DEFAULT_DEGRADATION_MAP` નો કોઈ સ્રોત કે લક્ષ્ય તે સ્નૅપશૉટમાં નિવૃત્ત તરીકે દેખાતું નથી. આ સાબિત કરતું નથી કે કોઈ મોડલ હાલમાં જીવંત અપસ્ટ્રીમ દ્વારા સેવા અપાય છે. ઑફલાઇન — `config/quality/model-lifecycle.json` સાથે તુલના કરે છે, જેને `npm run quality:refresh-model-lifecycle` વડે હાથથી રિફ્રેશ કરવામાં આવે છે (નેટવર્ક; CI સાથે જોડાયેલું નથી). `allowedRetiredInCatalog` એ બર્ન-ડાઉન રૅચેટ છે: માત્ર ટ્રૅકિંગ ઇશ્યૂ સાથે જ એન્ટ્રી ઉમેરો. | હા                                      |
| `check:fetch-targets`             | ક્લાયન્ટ-સાઇડ `src/` માંનું દરેક `fetch("/api/...")` વાસ્તવિક `route.ts` પર રિઝોલ્વ થાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા                                      |
| `check:deps`                      | રિપોઝિટરીના દરેક `package.json` માંની બધી `npm install`-યોગ્ય ડિપેન્ડન્સીઓ `dependency-allowlist.json` માં છે; નવી અનપિન કરેલી અથવા સ્લોપસ્ક્વૅટ કરેલી પૅકેજો ફ્લૅગ થાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા                                      |
| `audit:deps`                      | `npm audit` (રૂટ + electron) — કોઈ ઉચ્ચ/ગંભીર ઍડવાઇઝરી નથી (osv `check:vuln-ratchet` સાથે ઓવરલૅપ થાય છે; રૅશનલાઇઝેશન બૅકલૉગ જુઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | હા                                      |
| `check:lockfile`                  | `package-lock.json` અખંડિતતા — https રજિસ્ટ્રી, અખંડિતતા હૅશ, કોઈ હોસ્ટ ઓવરરાઇડ નહીં                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:licenses`                  | પ્રોડક્શન ડિપેન્ડન્સીઓ માટે SPDX લાઇસન્સની મંજૂર સૂચિ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `check:tracked-artifacts`         | કોઈ બિલ્ડ આર્ટિફેક્ટ્સ / કમિટ કરેલી `node_modules` સિમલિંક્સ નહીં (husky pre-commitમાં પણ ચાલે છે; pre-pushને ઇરાદાપૂર્વક હળવું રાખવામાં આવ્યું છે — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | હા                                      |
| `check:ai-attribution`            | PR કમિટ્સ, શીર્ષક અથવા બોડીમાં કોઈ AI/બોટ `Co-Authored-By` ટ્રેલર અથવા AI-જનરેશન ફૂટર નહીં — કઠોર નિયમ #16 (`quality.yml`ના PR→`release/**` માટેના fast-gates લૂપમાં — ઇવેન્ટ પેલોડ વાંચે છે, PR ન હોય ત્યારે કંઈ કરતું નથી — અને PR→`main` માટે `ci.yml` lintમાં માત્ર-PR પગલું; તેમજ husky `commit-msg` હૂક; માનવીય સહ-લેખકોને મંજૂરી છે; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | દરેક Vitest બાકાત રાખવાની નોંધમાં ટ્રૅકિંગ ઇશ્યૂ દર્શાવેલો હોવો જોઈએ અને તે `config/quality/vitest-exclusions.json`માં દેખાવી જોઈએ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | હા                                      |
| `check:file-size`                 | સોર્સ ફાઇલો (`src/`, `open-sse/`, `electron/`, `bin/`માં `.ts`/`.tsx`) `cap`ની મર્યાદામાં અને ટેસ્ટ ફાઇલો (`*.test.ts(x)`) `testCap`ની મર્યાદામાં રહેવી જોઈએ; `file-size-baseline.json`માં ફ્રીઝ કરેલી ફાઇલો (`frozen` / `testFrozen`) તેમના નોંધાયેલા કદથી વધુ વધવી જોઈએ નહીં                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | હા                                      |
| `check:error-helper`              | એક્ઝિક્યુટર્સ/હેન્ડલર્સમાં ભૂલ પ્રતિસાદો `buildErrorBody()` / `sanitizeErrorMessage()` નો ઉપયોગ કરે છે (કડક નિયમ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `check:migration-numbering`       | માઇગ્રેશન SQL ફાઇલોને ક્રમિક રીતે નંબર આપવામાં આવ્યા છે, કોઈ ખાલી જગ્યા કે ડુપ્લિકેટ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | હા                                      |
| `check:public-creds`              | `publicCreds.ts` ની બહાર કોઈ લિટરલ OAuth `client_id`/`client_secret` અથવા Firebase Web કી નથી (કડક નિયમ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:db-rules`                  | `src/lib/db/` મોડ્યુલોની બહાર કોઈ રૉ SQL નથી; `localDb.ts` માંથી કોઈ બેરલ-ઇમ્પોર્ટ નથી (કડક નિયમો #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | હા                                      |
| `check:known-symbols`             | તેમના ડિસ્પેચ કોષ્ટકોમાં નોંધાયેલા પ્રોવાઇડર એક્ઝિક્યુટર્સ, રાઉટિંગ વ્યૂહરચનાઓ અને ટ્રાન્સલેટર્સ ડિસ્ક પરની ફાઇલો સાથે મેળ ખાય છે — કોઈ અનાથ અથવા અઘોષિત સિમ્બોલ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:route-guard-membership`    | ચાઇલ્ડ પ્રોસેસ શરૂ કરતો દરેક રૂટ `isLocalOnlyPath()` દ્વારા વર્ગીકૃત થયેલો છે (કડક નિયમો #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | હા                                      |
| `check:test-discovery`            | રેપોમાંની દરેક `*.test.ts` / `*.spec.ts` ફાઇલ ઓછામાં ઓછા એક ટેસ્ટ રનર દ્વારા એકત્રિત કરવામાં આવે છે (રૅચેટ: `test-discovery-baseline.json` માં અનાથ ફાઇલોની યાદી માત્ર નાની થઈ શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                      |
| `check:test-tla-order`            | `tests/unit` હેઠળની કોઈપણ `node:test` ફાઇલ ટેસ્ટ રજિસ્ટર કર્યા પછી ટોપ-લેવલ `await` સુધી પહોંચીને ત્યારબાદ વધુ ટેસ્ટ રજિસ્ટર કરતી નથી (#18045; રૅચેટ: `test-tla-order-allowlist.json` માત્ર નાની થઈ શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | હા                                      |
| `check:agent-skills-sync`         | જનરેટ કરેલી એજન્ટ-સ્કિલ્સ આર્ટિફેક્ટ્સ તેમના સ્રોત કૅટલૉગ સાથે મેળ ખાય છે (કોઈ વિસંગતિ નથી)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | પ્રોવાઇડરના લોગો/એસેટ્સ માટે નોંધાયેલ ઉદ્ભવની એન્ટ્રી હોય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON કૉન્ફિગ ફાઇલો પાર્સ થાય છે અને રેપોના લિન્ટ નિયમોનું પાલન કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | ભૂલો વિના TypeScript કમ્પાઇલેશન (માત્ર સલાહરૂપ ચેતવણીઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                      |
| `typecheck:noimplicit:core`       | કડક `noImplicitAny` — ભવિષ્યલક્ષી; પહેલાથી અસ્તિત્વમાં રહેલી ઘણી કૉલ સાઇટ્સને હજી પણ ઍનોટેશન્સની જરૂર છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **સલાહરૂપ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` સુધી મર્યાદિત `tsc` (#7033) — `typecheck:core`ની પસંદ કરેલી 27-ફાઇલની મંજૂરી-સૂચિમાં કોઈ dashboard TSX સામેલ નથી અને `next build` પણ ક્યારેય તેનું type-check કરતું નથી (`next.config.mjs`માં `ignoreBuildErrors: true` સેટ છે), તેથી ત્યાંના અનાથ-ઓળખકર્તા રિગ્રેશન્સ (#6625/#6909) CI માટે અદૃશ્ય હતા. સ્થિર કરેલા પ્રતિ-ફાઇલ/પ્રતિ-TS-code ગણતરી બેઝલાઇન (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` જેવી જ stale-enforcement પદ્ધતિ) સામે તફાવત તપાસે છે — બેઝલાઇન કરેલી ગણતરીથી વધુ માત્ર નવી ભૂલો જ ગેટને નિષ્ફળ બનાવે છે; અગાઉથી અસ્તિત્વમાં રહેલી ભૂલ સુધારાય ત્યારે `--update` વડે રૅચેટ ઘટાડો.                                                                                                                                                                                                          | હા                                      |

### કાર્ય: `quality-gate`

`test-coverage` પછી ચાલે છે. નિષ્ફળતા પર મર્જને અવરોધે છે.

| સ્ક્રિપ્ટ                    | શું માન્ય કરે છે                                                                                                                                                                  | અવરોધક                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | `quality-metrics.json` ઉત્પન્ન કરે છે (ESLint ચેતવણીઓની સંખ્યા, મર્જ કરેલા shard રિપોર્ટમાંથી કવરેજ)                                                                              | હા (રૅચેટનું upstream) |
| `quality:ratchet`            | `quality-baseline.json`માંનો દરેક મેટ્રિક પાછો પડ્યો નથી (ESLint ચેતવણીઓ ≤ બેઝલાઇન; કવરેજ ≥ બેઝલાઇન)                                                                              | હા                     |
| `check:duplication`          | કોડ ડુપ્લિકેશન (jscpd@4) `quality-baseline.json`માંની બેઝલાઇનથી વધુ નથી                                                                                                           | હા                     |
| `check:complexity`           | ફાઇલ-સ્તરની cyclomatic complexity મર્યાદાથી વધુ નથી (મુખ્ય ESLint `complexity` + `max-lines-per-function`)                                                                        | હા                     |
| `check:cognitive-complexity` | Cognitive complexity રૅચેટ (`eslint-plugin-sonarjs`) — અલગ ESLint પાસ; CI બંનેને એક જ `check:complexity-ratchets` પગલા તરીકે મર્જ કરીને ચલાવે છે                                  | હા                     |
| `check:dead-code`            | વપરાશમાં ન લેવાતા exports / files રૅચેટ (knip) બેઝલાઇનની સરખામણીએ પાછો પડતો નથી                                                                                                   | હા                     |
| `check:compression-budget`   | કમ્પ્રેશન બેન્ચમાર્ક બજેટ — પ્રતિ-engine token-savingsની ન્યૂનતમ મર્યાદા પાછી પડવી જોઈએ નહીં                                                                                      | હા                     |
| `check:type-coverage`        | ટકાવારી-typed રૅચેટ (`type-coverage`) પાછો પડતો નથી; મોટાભાગે `typecheck:noimplicit:core`ને આવરી લે છે                                                                            | હા                     |
| `check:codeql-ratchet`       | ખુલ્લી CodeQL ચેતવણીઓની સંખ્યા પાછી પડતી નથી (`gh api` દ્વારા વાંચે છે; token વિના સુરક્ષિત રીતે skip કરે છે) — refresh આવર્તન અને મેન્યુઅલ trigger માટે: નીચે "CodeQL રૅચેટ" જુઓ | હા                     |

### કાર્ય: `quality-extended`

આખું કાર્ય સલાહાત્મક છે (`continue-on-error: true`). npm-આધારિત રૅચેટ્સ
વાસ્તવમાં ચાલે છે; બાહ્ય scanners `gh release download` દ્વારા ઇન્સ્ટોલ થાય છે અને
binary હજી પણ ગેરહાજર હોય ત્યારે પોતે skip થાય છે (exit 0).

| સ્ક્રિપ્ટ                | શું માન્ય કરે છે                                                                                                                                                                                           | અવરોધક                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | કોઈ circular dependencies નથી (dpdm)                                                                                                                                                                       | **સલાહાત્મક**                               |
| `check:bundle-size`      | Bundleનું કદ મર્યાદાથી વધુ નથી                                                                                                                                                                             | **સલાહાત્મક**                               |
| `check:secrets`          | Secret scanning (gitleaks) — binary ગેરહાજર હોય તો skip કરે છે                                                                                                                                             | **સલાહાત્મક**                               |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) પાછી પડતી નથી — binary ગેરહાજર હોય તો skip કરે છે                                                                                                                 | **સલાહાત્મક**                               |
| `check:workflows`        | Workflow lint (actionlint + zizmor); ગેરહાજર/ખામીયુક્ત scanners, અમાન્ય reports અથવા ગેરહાજર રૅચેટ બેઝલાઇન INCOMPLETE તરીકે નિષ્ફળ થાય છે. માન્ય તારણો પસંદ કરેલી strict/advisory/ratchet નીતિને અનુસરે છે | અમલીકરણ જરૂરી; CIમાં zizmor રૅચેટ અવરોધક છે |
| `check:openapi-breaking` | મૂળ branchની સરખામણીએ જાહેર API contract (`openapi.yaml`)માં breaking changes (oasdiff) — `openapiBreaking=N` ઉત્પન્ન કરે છે; oasdiff ગેરહાજર હોય અથવા મૂળ spec resolve ન થઈ શકે તો skip કરે છે            | **સલાહાત્મક**                               |

### કાર્ય: `docs-sync-strict`

`main` માટેની દરેક PR પર ચાલે છે. નિષ્ફળતા પર મર્જને અવરોધે છે.

| સ્ક્રિપ્ટ                      | શું ચકાસે છે                                                                                                                                                 | અવરોધક                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `check:docs-all`               | નીચેના 6 ઉપ-ગેટને ક્રમશઃ ચલાવતો મેટા-ગેટ                                                                                                                     | હા                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt સંસ્કરણની સુસંગતતા                                                                                                             | હા                            |
| ↳ `check:docs-counts`          | ગદ્યમાં દર્શાવેલી સંખ્યાઓ (પ્રદાતાઓની સંખ્યા, માઇગ્રેશનની સંખ્યા વગેરે) વાસ્તવિક સંખ્યાઓની રૅચેટ વિન્ડોની અંદર છે                                            | હા                            |
| ↳ `check:env-doc-sync`         | `.env.example` માંનો દરેક env var દસ્તાવેજોના કોષ્ટકમાં દસ્તાવેજીકૃત છે અને તેનાથી ઊલટું પણ સાચું છે                                                         | હા                            |
| ↳ `check:deprecated-versions`  | દસ્તાવેજોમાં કોઈ અવમૂલ્યિત સંસ્કરણ સ્ટ્રિંગ નથી                                                                                                              | હા                            |
| ↳ `check:doc-links`            | દસ્તાવેજોમાંની આંતરિક markdown લિંક્સ વાસ્તવિક ફાઇલો તરફ નિર્દેશ કરે છે (`[text]`/`(path)` સ્વરૂપ)                                                           | હા                            |
| ↳ `check:fabricated-docs`      | દસ્તાવેજોમાં ઉલ્લેખિત રૂટ્સ, env vars, CLI કમાન્ડ્સ, હૂકનાં નામ અને ફાઇલ પાથ કોડબેઝમાં અસ્તિત્વ ધરાવે છે. `--strict` દ્વારા હાર્ડ ગેટ; ફ્લૅગ વિના સોફ્ટ-ફેલ. | હા (CI માં `--strict` દ્વારા) |
| `check:cli-i18n`               | CLI કમાન્ડ સ્ટ્રિંગ્સ બધી i18n લોકેલ ફાઇલોમાં હાજર છે                                                                                                        | હા                            |
| `check:openapi-coverage`       | OpenAPI સ્પેકમાં વાસ્તવિક રૂટ્સની ઓછામાં ઓછી રૅચેટ કરેલી ન્યૂનતમ સંખ્યા આવરી લેવાય છે                                                                        | હા                            |
| `check:openapi-security-tiers` | `openapi.yaml` માંની સુરક્ષા સ્તરની ઍનોટેશન્સ `routeGuard.ts` ના વર્ગીકરણો સાથે સુસંગત છે                                                                    | **સલાહરૂપ**                   |
| `check:openapi-routes`         | `openapi.yaml` માંનો દરેક પાથ વાસ્તવિક `route.ts` તરફ નિર્દેશ કરે છે (ભ્રામક માહિતી-વિરોધી)                                                                  | હા                            |
| `check:docs-symbols`           | `docs/**/*.md` માંનો દરેક `/api/...` સંદર્ભ વાસ્તવિક `route.ts` તરફ નિર્દેશ કરે છે (ભ્રામક માહિતી-વિરોધી)                                                    | હા                            |
| `i18n translation drift`       | i18n લોકેલ ફાઇલોમાં અનુવાદ ન થયેલી કીઝ — માત્ર ચેતવણી                                                                                                        | **સલાહરૂપ**                   |

### જોબ: `i18n-ui-coverage`

| સ્ક્રિપ્ટ                         | શું ચકાસે છે                                                                                                                                                                         | અવરોધક      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check-ui-keys-coverage` (ઇનલાઇન) | UI i18n કી કવરેજ ≥ 65% છે                                                                                                                                                            | હા          |
| `check-ui-value-drift` (ઇનલાઇન)   | ફરી લખાયેલું અંગ્રેજી **મૂલ્ય** કોઈ જૂનો અનુવાદ પાછળ છોડતું નથી                                                                                                                      | હા          |
| `check-new-key-coverage` (ઇનલાઇન) | એક **નવી** અંગ્રેજી કીનો દરેક લોકેલમાં અનુવાદ થયેલો છે — `__MISSING__:` માર્કર નકારવામાં આવે છે                                                                                      | હા          |
| `check-translation-ratio`         | લોકેલ દીઠ વાસ્તવિક અનુવાદનો ગુણોત્તર (અંગ્રેજી સમાન / પ્લેસહોલ્ડર / અનુમતિસૂચિની બહારની ગેરહાજર લીફ્સ) `config/quality/i18n-translation-baseline.json` + છૂટ કરતાં વધારે ન હોવો જોઈએ | **સલાહરૂપ** |

`fetch-depth: 0` જરૂરી છે — વેલ્યૂ-ડ્રિફ્ટ ગેટ મર્જ બેઝ સામે `en.json` નો તફાવત તપાસે છે.

#### `check-ui-value-drift` — જૂના અનુવાદનો ગેટ

આ ગેટ એવી એક i18n રિગ્રેશન પકડે છે જેને અન્ય ગેટ માળખાકીય રીતે જોઈ શકતા નથી: કોઈ અંગ્રેજી મૂલ્ય
ફરી લખાય છે અને _અગાઉના_ અંગ્રેજીમાંથી બનાવેલા અનુવાદો પાછળ રહી જાય છે, જેથી
બિન-અંગ્રેજી વપરાશકર્તાઓ આત્મવિશ્વાસપૂર્વક લખાયેલું, પરંતુ હવે ખોટું લખાણ વાંચવાનું ચાલુ રાખે છે.

આ સમસ્યા ખરેખર રિલીઝ થઈ હતી. Antigravity લૉગિન હેલ્પર ઉમેરાયો ત્યારે (#5203)
`oauthModal.googleOAuthWarning` ફરી લખવામાં આવ્યું હતું; **43 માંથી 39 લોકેલ્સમાં** ઓપરેટરોને "સંપૂર્ણ
URL કૉપિ કરીને નીચે પેસ્ટ કરો" એવું કહેતો ટેક્સ્ટ યથાવત્ રહ્યો — એવી પ્રક્રિયા જે તે પ્રદાતા માટે પૂર્ણ થઈ જ શકતી નથી. આ બાબત
#8463 સુધી ધ્યાનમાં આવી નહોતી, કારણ કે:

- `sync-ui-keys` ફક્ત **ગેરહાજર** કીઝને જ બૅકફિલ કરે છે, **જૂની** કીઝને ક્યારેય નહીં;
- `check-ui-keys-coverage` કીની _હાજરી_ ગણે છે, તેથી જૂના અનુવાદને આવરી લેવાયેલો ગણવામાં આવે છે;
- `check-translation-drift` `docs/i18n/<locale>/**.md` દસ્તાવેજીકરણ મિરર્સને ટ્રૅક કરે છે —
  તે ક્યારેય `src/i18n/messages/*.json` વાંચતું નથી. 2026-09 રિ-સિંકથી જોબ `docs-sync-strict` માં અવરોધક:
  મુખ્ય દસ્તાવેજ સંપાદિત કરો → `npm run i18n:run -- --files=<doc>` (વિભાગ-સ્તરનું, સસ્તું).

**ડિફ-અવેર, બેઝલાઇન-બેક્ડ નહીં.** તે મર્જ બેઝ પરના `en.json`ની વર્કિંગ ટ્રી સાથે
સરખામણી કરે છે; જે દરેક કીનું અંગ્રેજી મૂલ્ય બદલાયું હોય, તેના માટે હજુ પણ
અપરિવર્તિત અનુવાદ ધરાવતી કોઈપણ લોકેલ જૂની ગણાય છે. આ જાણીજોઈને **પહેલેથી અસ્તિત્વમાં રહેલું ઋણ સ્થિર રાખે છે** — ડિફ
એ જાહેર કરી શકતો નથી કે લાંબા સમયથી અસ્તિત્વમાં રહેલો અનુવાદ કયા જૂના અંગ્રેજી લખાણમાંથી આવ્યો હતો, તેથી ગેટ
માત્ર વર્તમાન ફેરફાર જેને સ્પર્શે છે તેનું જ મૂલ્યાંકન કરે છે. વિકલ્પ (પ્રતિ-કી હેશ બેઝલાઇન) માટે
લગભગ 600 KBની જનરેટ થયેલી ફાઇલની જરૂર પડશે, જે અસ્તિત્વમાં રહેલી સૌથી મોટી બેઝલાઇન કરતાં 3× મોટી હશે અને દરેક i18n PR પર બદલાતી રહેશે.

તેને સંતોષવાની બે રીતો છે:

1. અસરગ્રસ્ત અનુવાદો અપડેટ કરો, અથવા
2. તેમને `__MISSING__:<new english>` પર સેટ કરો — ત્યારબાદ રનટાઇમ સુધારેલું અંગ્રેજી
   (`src/i18n/request.ts::deepMergeFallback`, #7258) પ્રદાન કરે છે અને કી અનુવાદ માટે કતારમાં ઉમેરાય છે.

જો સ્ટ્રિંગનો **અર્થ** બદલાયો હોય, તો **કીનું નામ બદલવાનું** પસંદ કરો: નવી કી
જૂનો અનુવાદ વારસામાં મેળવી શકતી નથી. #8463માં આ જ પેટર્નનો ઉપયોગ થયો હતો.

```bash
npm run i18n:check-value-drift          # કડક (CI જે ચલાવે છે)
npm run i18n:check-value-drift:warn     # ફક્ત અહેવાલ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

જ્યારે બેઝ કેટલોગ વાંચી શકાતો નથી (બેઝ ref વિનાનો શેલો
ક્લોન), ત્યારે `SKIP reason=base-unresolved` સાથે 0 એક્ઝિટ કરે છે, જે `check-openapi-breaking`ને પ્રતિબિંબિત કરે છે.

### જોબ: `i18n`

સંપૂર્ણ i18n માન્યતા મેટ્રિક્સ (દરેક લોકેલ માટે એક જોબ). આખી જોબ સલાહરૂપ છે.

| સ્ક્રિપ્ટ                       | શું માન્ય કરે છે                | અવરોધક                                             |
| ------------------------------- | ------------------------------- | -------------------------------------------------- |
| `validate_translation.py quick` | દરેક લોકેલ દીઠ અનુવાદની પૂર્ણતા | **સલાહરૂપ** (આખી જોબ પર `continue-on-error: true`) |

### જોબ: `pr-test-policy`

ફક્ત પુલ રિક્વેસ્ટ્સ પર ચાલે છે.

| સ્ક્રિપ્ટ              | શું માન્ય કરે છે                                                                                                                       | અવરોધક |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, અથવા `bin/`માં પ્રોડક્શન કોડ બદલતા PRમાં પરીક્ષણો સામેલ અથવા અપડેટ થયેલા હોવા જરૂરી છે (કડક નિયમ #8) | હા     |
| `check:test-masking`   | બદલાયેલી ટેસ્ટ ફાઇલો કુલ assert સંખ્યા ઘટાડતી નથી અથવા `assert.ok(true)` જેવી સ્વયંસિદ્ધ અભિવ્યક્તિઓ ઉમેરતી નથી                        | હા     |
| `check:pr-evidence`    | PR બોડી ફેરફાર માટેના ટેસ્ટ/VPS પુરાવાનો ઉલ્લેખ કરે છે (PRના ગદ્યમાં શોધ કરીને કડક નિયમ #18ને યાંત્રિક બનાવે છે — નાજુક, Backlog જુઓ)  | હા     |

### જોબ: `test-vitest`

`build` પછી ચાલે છે. નિષ્ફળતા પર મર્જને અવરોધે છે.

| સ્યુટ            | શું માન્ય કરે છે                                   | અવરોધક                                                                                                                                        |
| ---------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP સર્વર (110 ટૂલ્સ), autoCombo, કૅશ — vitest રનર | હા                                                                                                                                            |
| `test:vitest:ui` | UI કમ્પોનન્ટ પરીક્ષણો — vitest રનર                 | **અવરોધક** — પહેલેથી અસ્તિત્વમાં રહેલી નિષ્ફળતાઓ `vitest.config.ts`માં સ્પષ્ટ રીતે બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ જોબને નિષ્ફળ બનાવે છે |

### રાત્રિકાલીન વર્કફ્લો (નિર્ધારિત, સલાહરૂપ)

આ cron શેડ્યૂલ પર (અને `workflow_dispatch` દ્વારા) ચાલે છે, PR પર ક્યારેય નહીં. બધા સલાહરૂપ છે.

| વર્કફ્લો               | શું માન્ય કરે છે                                                                                                                                                    | અવરોધક      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | રેન્ડમ સીડ + ઊંચી રન સંખ્યા સાથે fast-check પ્રોપર્ટી ટેસ્ટ્સ                                                                                                       | **સલાહરૂપ** |
| `nightly-resilience`   | હીપ-ગ્રોથ ગેટ, કેઓસ ફૉલ્ટ-ઇન્જેક્શન, k6 લોડ/સોક                                                                                                                     | **સલાહરૂપ** |
| `nightly-llm-security` | promptfoo ઇન્જેક્શન ગાર્ડ (બ્લોક મોડ) + garak પ્રોબ્સ (પ્રોવાઇડર સિક્રેટ વિના છોડવામાં આવે છે)                                                                      | **સલાહરૂપ** |
| `nightly-schemathesis` | `docs/openapi.yaml`નો ઉપયોગ કરીને લાઇવ OmniRoute સામે OpenAPI કોન્ટ્રાક્ટ ફઝિંગ (schemathesis) — સ્પેકના ઉલ્લંઘનો / હેન્ડલ ન થયેલા 500s ઉજાગર કરે છે (તબક્કો 8 B.4) | **સલાહરૂપ** |
| `nightly-mutation`     | ઝડપી યુનિટ લેન પર Stryker મ્યુટેશન-ટેસ્ટિંગ સ્કોર — બચી ગયેલા મ્યુટન્ટ્સ નબળા asserts ઉજાગર કરે છે                                                                  | **સલાહરૂપ** |
| `nightly-compat`       | સમર્થિત `engines.node` રેન્જમાં Node એન્જિન સુસંગતતા મેટ્રિક્સ                                                                                                      | **સલાહરૂપ** |

પર્ફોર્મન્સ બેઝલાઇન્સ (હીપ, TTFB, બિલ્ડ સમય) રેકોર્ડ કરવામાં આવે છે, ગેટ કરવામાં આવતી નથી: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) જુઓ.

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

## મંજૂર-યાદી નીતિ

પહેલેથી અસ્તિત્વમાં રહેલા ઉલ્લંઘનોને કારણે નિષ્ફળ ન થઈ શકે તેવો દરેક ગેટ સ્થિર મંજૂર-યાદીનો ઉપયોગ કરે છે
(દા.ત., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). નીતિ આ છે:

**મૂળ કારણ સુધારો; મંજૂર-યાદીનો ઉપયોગ માત્ર ત્યારે જ કરો જ્યારે ઉલ્લંઘન પહેલેથી અસ્તિત્વમાં હોય અને
તેને એ જ PRમાં સુધારી ન શકાય.**

મંજૂર-યાદીમાં એન્ટ્રી ઉમેરતી વખતે:

1. વાજબી કારણ દર્શાવતી ટિપ્પણી સામેલ કરો.
2. ટ્રેકિંગ ઇશ્યૂનો સંદર્ભ આપો (દા.ત., `// #3498 — તબક્કો 2 સુવિધા, હજુ અમલમાં મૂકાઈ નથી`).
3. ઉલ્લંઘન સુધારતા એ જ PRમાં એન્ટ્રી દૂર કરો — હવે કોઈ સક્રિય ઉલ્લંઘનને
   દબાવતી ન હોય તેવી જૂની એન્ટ્રી પોતે જ એક ખામી છે (એકવાર અમલમાં મૂકાયા પછી 6A.3 જૂના-અમલીકરણની તપાસ
   અનાથ મંજૂર-યાદી એન્ટ્રી પર ગેટને નિષ્ફળ કરશે).

પરીક્ષણો ઝડપથી પાસ કરાવવા માટે મંજૂર-યાદી એન્ટ્રીઓ ઉમેરશો **નહીં**. વધતી જતી
મંજૂર-યાદી સાથેનો લીલો ગેટ ગુણવત્તાની ખોટી ખાતરી આપે છે.

### જ્યારે તમારા PR પર કોઈ ગેટ નિષ્ફળ જાય

1. **ગેટનું આઉટપુટ ધ્યાનપૂર્વક વાંચો** — તે તમને ચોક્કસ જણાવે છે કે કઈ ફાઇલ અથવા સિમ્બલે
   નિયમનું ઉલ્લંઘન કર્યું છે.
2. **ઉલ્લંઘન સુધારો** — મોટાભાગના ગેટ નિર્ધારિત ફાઇલસિસ્ટમ તપાસો છે, જે કોડ સાચો
   થતાં જ પાસ થાય છે.
3. **જો ઉલ્લંઘન પહેલેથી અસ્તિત્વમાં હોય** (એટલે કે, તમે તેને રજૂ કર્યું નથી, પરંતુ હવે ગેટ
   તેને આવરે છે): વાજબી કારણ દર્શાવતી ટિપ્પણી અને ટ્રેકિંગ ઇશ્યૂ સાથે મંજૂર-યાદી એન્ટ્રી ઉમેરો.
4. **જો ગેટ રૅચેટ હોય** (કવરેજ, ESLint ચેતવણીઓ, પુનરાવર્તન, જટિલતા):
   તમારા ફેરફારે મેટ્રિકને ખરાબ બનાવ્યું છે. મૂળભૂત સમસ્યા સુધારો અથવા (ભાગ્યે જ)
   જો ફેરફાર ઇરાદાપૂર્વકનો હોય અને મેટ્રિકમાં થયેલો ઘટાડો સ્વીકાર્ય હોય, તો
   `npm run quality:ratchet -- --update` ચલાવો — પરંતુ PRના વર્ણનમાં તેનું કારણ દસ્તાવેજિત કરો.
5. **સલાહકારી ગેટ** (`continue-on-error: true`) માહિતીપ્રદ છે — તે મર્જને અવરોધતા
   નથી, પરંતુ CI સારાંશમાં દેખાય છે. તેમ છતાં તેમને સુધારો.

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

## તર્કસંગતીકરણ બૅકલૉગ (ROI સમીક્ષા — તબક્કો 9 તરંગ 3)

આ ઇન્વેન્ટરીનું 2026-06-17ના રોજ `ci.yml` સામે સમાધાન કરવામાં આવ્યું હતું (અગાઉની આવૃત્તિમાં
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` છૂટી ગયાં હતાં). સમાધાન કરાયેલા સમૂહની ROI સમીક્ષાએ
નીચેના તર્કસંગતીકરણ ઉમેદવારો ઓળખ્યા. **મર્જ યાંત્રિક CI ફેરફારો છે;
ફ્લિપ/ડ્રૉપ ઓપરેટર માટે અનામત નીતિગત નિર્ણયો છે.** નીચેનું કશું હજી
લાગુ કરવામાં આવ્યું નથી.

**ઉપર દસ્તાવેજીકૃત ન થયેલું પણ** (સલાહરૂપ, ઓછો સંકેત): `docs-lint` જોબ
(markdownlint + Vale, સમગ્ર જોબ `continue-on-error`) અને સ્વતંત્ર સ્કૅનર વર્કફ્લો
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json`માં છે, પરંતુ `ci.yml`માં અવરોધક રૅચેટ સાથે જોડાયેલું નથી — મેટ્રિક
હાલમાં અનાથ છે.

### મર્જ / ડિડુપ્લિકેશન (યાંત્રિક, ઓછું જોખમ)

દરેક ઉમેદવારને 2026-06-17ના રોજ લાઇવ ગેટ સ્થિતિ સામે માન્ય કરવામાં આવ્યો હતો (વિશ્વાસ કરો, પણ ચકાસો);
કેટલાક "સ્પષ્ટ" મર્જ હકીકતમાં ટેક્નિકલ ઋણ છુપાવતા હોવાનું બહાર આવ્યું અને તે **સ્વચ્છ ડ્રૉપ-ઇન નથી**.

- **`check:docs-sync` બે વાર ચાલે છે** — `lint` જોબમાં સ્વતંત્ર રીતે અને ફરીથી `check:docs-all` (`docs-sync-strict`) તથા husky pre-commit હૂકની અંદર. ✅ **પૂર્ણ** — સ્વતંત્ર `lint` ઇન્વોકેશન દૂર કરવામાં આવ્યું.
- **CVE સ્કૅનિંગ** — ❌ **સ્વચ્છ મર્જ નથી.** `audit:deps` કોઈપણ high/critical CVE પર હાર્ડ-ફેઇલ થાય છે; `check:vuln-ratchet` (osv) માત્ર બેઝલાઇનની સરખામણીએ _રીગ્રેશન_ પર નિષ્ફળ થાય છે (હાલમાં 1 MODERATE). સિમેન્ટિક્સ અલગ છે — `audit:deps` દૂર કરવાથી નિરપેક્ષ high/critical ગેટ ગુમાવવો પડે. બંને રાખો.
- **સાઇકલ શોધ** — ✅ **પૂર્ણ** (#15159 G-01/G-02). અહીંના જૂના લખાણમાં `check:cycles`ને "લીલું, કાળજીપૂર્વક પસંદ કરેલું" ગેટ કહેવાયું હતું અને તેને અવરોધક રાખવાનું સમર્થન એ આધારે કરાયું હતું કે `check:circular-deps` (dpdm)એ 91 સાઇકલ દર્શાવ્યાં હતાં. એ લીલું પરિણામ **ખોટું લીલું પરિણામ** હતું: `check:cycles`એ 5 સબડિરેક્ટરી (450 ફાઇલ) સ્કૅન કરી હતી, માત્ર સ્થિર `import|export … from` સાથે મેળ સાધ્યો હતો અને દરેક `@/` તથા `@omniroute/open-sse/` સ્પેસિફાયર કાઢી નાખ્યો હતો, તેથી તે રિપોઝિટરીમાં પ્રભુત્વ ધરાવતી dynamic-import + alias સાઇકલ જોઈ શકતું નહોતું. સુધાર્યું: ગેટ હવે `src` + `open-sse` (5023 ફાઇલ)માં ફરે છે, TypeScript ASTમાંથી સ્પેસિફાયર એકત્ર કરે છે (જેથી `import("…")` ગણાય છે અને ટાઇપ-સ્થાનમાં `typeof import("…")` ગણાતું નથી), અને tsconfig `paths`નું રિઝોલ્યુશન કરે છે. તેને 0 નહીં, પરંતુ **14** સાઇકલ મળે છે. અગાઉથી અસ્તિત્વમાં રહેલી 14 સાઇકલને ગેટ PRમાં સુધારી શકાતી ન હોવાથી, `check:cycles` હવે **રૅચેટ** છે (`--ratchet`, `quality-baseline.json`માં ઉચ્ચતમ મર્યાદા `metrics.cycles.value = 14`, `direction: down`) — તે કોઈપણ _રીગ્રેશન_ને અવરોધે છે અને ગણતરી માત્ર ઘટી શકે છે. CI `npm run check:cycles:ratchet` ચલાવે છે. ઘટાડાની કામગીરી **A-01** સાથે આગળ વધે છે. વધુ વ્યાપક બીજા અભિપ્રાય તરીકે `check:circular-deps` (dpdm) સલાહરૂપ રહે છે.
- **જટિલતા** — ✅ **પૂર્ણ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): એક ESLint વૉક, ruleId પ્રમાણે ગણતરી કરે છે જેથી cyclomatic+max-lines અને cognitive બેઝલાઇન સ્વતંત્ર રહે; સ્થાનિક `--update` માટે વ્યક્તિગત `check:complexity` / `check:cognitive-complexity` યથાવત્ રહે છે.
- **`/api` ઍન્ટિ-હેલ્યુસિનેશન** — ✅ **પૂર્ણ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`ની એક FS ઇન્વેન્ટરી, openapi-routes + docs-symbols હજી પણ સ્વતંત્ર રીતે અહેવાલ આપે છે; સ્થાનિક રન માટે વ્યક્તિગત ચેક્સ યથાવત્ રહે છે.
- **`check:node-runtime` 11 જોબમાં ચાલે છે** — ⚠️ **ઓછું ROI.** દરેક અલગ રનર છે અને ચેક <1sનો છે; સસ્તું પ્રતિ-જોબ સુરક્ષા નિયંત્રણ ગુમાવવાની સામે કુલ બચત ~10s છે. આટલી ઉથલપાથલ યોગ્ય નથી.
- **CI lint પર `typecheck:noimplicit:core`** — ✅ **lint જોબમાંથી દૂર કરાયું** (સલાહરૂપ `continue-on-error` હતું); અવરોધક ટાઇપ સપાટી `typecheck:core` + `check:type-coverage` છે. સ્થાનિક સ્ક્રિપ્ટ જાળવી રાખવામાં આવી છે.

### ફ્લિપ / નિર્ણય (ઓપરેટર નીતિ)

- `check:openapi-security-tiers` (સલાહરૂપ) — ❌ **સ્વચ્છ રીતે ફ્લિપ કરી શકાય તેમ નથી.** તે 0 સાથે એક્ઝિટ થાય છે, પરંતુ ચેતવણી આપે છે કે `LOCAL_ONLY_API_PREFIXES` હેઠળના કેટલાક `traffic-inspector` રૂટમાં `x-loopback-only: true` ઍનોટેશન નથી. તેને અમલમાં મૂકતાં પહેલાં `openapi.yaml`માં એ ઍનોટેશન ઉમેરવા જરૂરી છે.
- `typecheck:noimplicit:core` (સલાહરૂપ) — અવરોધક `check:type-coverage` રૅચેટ દ્વારા મોટા ભાગે આવરી લેવાય છે. તેને રૅચેટમાં ફ્લિપ કરો અથવા બિનજરૂરી બીજા `tsc` પાસને દૂર કરો.
- `test:vitest:ui` (હવે **અવરોધક**) — અગાઉથી અસ્તિત્વમાં રહેલી નિષ્ફળતાઓને `vitest.config.ts`માં `// #8618` ટ્રૅકિંગ ટિપ્પણીઓ સાથે સ્પષ્ટ રીતે બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ જોબને નિષ્ફળ બનાવે છે.
- `check:secrets` (gitleaks, 3 દસ્તાવેજીકૃત false-positive પર સ્થિર કરાયેલ અવરોધક રૅચેટ) — 0 સુધી પહોંચવા માટે એ 3ને allowlist કરો અથવા તેને સલાહરૂપ સ્તરે ઉતારો. GitHubના મૂળ secret-scanning + `check:public-creds` સાથે ઓવરલેપ થાય છે.
- `check:pr-evidence` (અવરોધક, PR-bodyના ગદ્યમાં greps કરે છે) — false-positiveનું ઊંચું જોખમ; તેને દૂર કરવાથી Hard Rule #18નો અમલ નબળો પડે છે, તેથી આ ખરેખર નીતિગત નિર્ણય છે.
- `semgrep` (સલાહરૂપ સ્વતંત્ર) — OWASP ફૅમિલી માટે CodeQL સાથે ઓવરલેપ થાય છે; તેની બેઝલાઇનને રૅચેટ સાથે જોડો અથવા તેને દૂર કરો.

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
