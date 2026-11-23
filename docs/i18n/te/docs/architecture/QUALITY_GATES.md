# Quality Gates Reference (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ఈ డాక్యుమెంట్ OmniRouteలోని అన్ని CI నాణ్యత గేట్లకు ప్రామాణిక సూచన.
ఇది ప్రతి గేట్ను, అది వేటిని ధ్రువీకరిస్తుందో, ఏ CI జాబ్లో అమలవుతుందో, అది
ratchet baseline లేదా pass/fail విధానాన్ని ఉపయోగిస్తుందో, అలాగే అది బిల్డ్ను నిరోధిస్తుందా లేదా కేవలం సలహాపూర్వకమా అనేది వివరిస్తుంది.

సంక్షిప్త సారాంశం మరియు allowlist విధానం కోసం, `AGENTS.md`లోని
"Quality Gates & Ratchets" విభాగాన్ని చూడండి. ఇదే సిస్టమ్కు సంబంధించిన కీలక అంచనా, పరిపక్వత వర్గీకరణ మరియు
సాధనంతో సంబంధం లేని పునరుత్పాదక ప్రణాళిక కోసం,
[నాణ్యత గేట్ ప్లేబుక్](../ops/QUALITY_GATE_PLAYBOOK.md) చూడండి.

---

## గేట్ ఇన్వెంటరీ మరియు అమలు ప్రొఫైల్లు

### అభ్యర్థి అనుమతి

CI మరియు Quality Gates వర్క్ఫ్లోలు ఒక్కొక్కటి స్థిరమైన తీర్పును వెలువరిస్తాయి: `Gate / CI` మరియు
`Gate / Quality`. వాటి వెర్షన్ చేయబడిన అనుమతి విధానం ప్రతి అప్స్ట్రీమ్ జాబ్ను
తప్పనిసరి లేదా సలహాపూర్వకమైనదిగా పేర్కొంటుంది. వర్తించే తప్పనిసరి జాబ్ తప్పనిసరిగా విజయవంతం కావాలి:
లేని, రద్దయిన, దాటవేయబడిన, పెండింగ్లో ఉన్న మరియు తెలియని ఫలితాలు PASSను నిర్ధారించలేవు. చెల్లుబాటు అయ్యే
docs-only లేదా catalog-only వర్గీకరణ ఒక కోడ్ లేన్ను వర్తించనిదిగా చేయగలదు;
డ్రాఫ్ట్ PR ఆమోదించబడిన అభ్యర్థి కాదు. `hotfix` లేబుల్ ఆధారాల అవసరాన్ని మినహాయించదు.

రెండు వర్క్ఫ్లోలు PRలను, main/release బ్రాంచ్లకు పుష్లను, మాన్యువల్ డిస్పాచ్ను మరియు
merge-group ఈవెంట్లను కవర్ చేస్తాయి. పుష్, డిస్పాచ్ మరియు merge-group పూర్తి ఎంపికను అమలు చేస్తాయి. సాధారణంగా self-hosted
రన్నర్లను ఎంచుకునే జాబ్ల కోసం ఫోర్క్లు మరియు merge groupలు hosted రన్నర్లను ఉపయోగిస్తాయి;
రోలౌట్కు ముందు తగినంత hosted సామర్థ్యం ఉందో ధృవీకరించాలి.

ప్రతి JSON రసీదు చెక్అవుట్ చేసిన SHA, వర్క్ఫ్లో రన్ మరియు ప్రయత్నాన్ని గుర్తిస్తుంది.
చెక్అవుట్/event SHA సరిపోలకపోతే CLI తిరస్కరిస్తుంది. కొత్త లేదా తొలగించిన లేన్ నిశ్శబ్దంగా అదృశ్యం కాకుండా,
వర్క్ఫ్లో పరీక్షలు విధాన సభ్యత్వాన్ని తీర్పు జాబ్ యొక్క `needs` జాబితాతో అనుసంధానిస్తాయి.
రసీదులు వాటి స్వంత వర్క్ఫ్లోను కవర్ చేస్తాయి; ప్రచురణ, డిప్లాయ్మెంట్ లేదా ఇప్పటికే ఉన్న
సలహాపూర్వక స్కానర్ అంతర్గత అంశాలను కాదు. బ్రాంచ్ నియమాల్లో రెండు చెక్ పేర్లను సక్రియం చేయడం
ప్రత్యేక పరిపాలనా మార్పు; ఈ జాబ్లను జోడించడం మాత్రమే బ్రాంచ్ను రక్షించదు.

### స్టాటిక్ స్కాన్ ఇన్వెంటరీ

వెర్షన్ చేయబడిన npm-alias ఇన్వెంటరీ మరియు స్టాటిక్-స్కాన్ సభ్యత్వం
`config/quality/gate-manifest.json`లో ఉంటాయి. స్క్రిప్ట్ పేర్లు మరియు ఖచ్చితమైన కమాండ్లను
`package.json`తో పోల్చి ధృవీకరించడానికి `npm run check:gate-manifest`ను అమలు చేయండి; జోడింపులు, తొలగింపులు మరియు
కమాండ్ మార్పులు స్థానిక హుక్ మరియు CIలోని మార్పు-వర్గీకరణ జాబ్లు రెండింటినీ విఫలం చేస్తాయి.
alias అనేది వర్క్ఫ్లో జాబ్, మ్యాట్రిక్స్ ఇన్స్టాన్స్ లేదా టెస్ట్ కేస్ కాదు: ఈ సంఖ్యలను
పరస్పరం మార్చుకోదగినవిగా చూపకూడదు.

ఎంచుకున్న aliasలను అమలు చేయకుండా పరిశీలించడానికి `npm run quality:scan -- --list` లేదా
`npm run quality:scan:fast -- --list`ను ఉపయోగించండి. రన్నర్ npm ఎంట్రీపాయింట్ను అమలు చేస్తుంది,
కాబట్టి దాని రన్టైమ్ (కాన్ఫిగర్ చేసిన చోట Bunతో సహా) యథాతథంగా ఉంటుంది.
ఆ ప్రొఫైల్ల వెలుపల ఉన్న aliasలను విడిగా అమలు చేసినవిగా మానిఫెస్ట్ నమోదు చేస్తుంది, అలాగే
read-only స్కాన్ ప్రొఫైల్లలో నిర్వహణ కమాండ్లు నిషేధించబడ్డాయి.

ఈ ప్రొఫైల్లు స్టాటిక్ స్కాన్ను మాత్రమే కవర్ చేస్తాయి. అవి ఉత్పత్తి పరీక్షలు,
కవరేజ్, ప్యాకేజింగ్, బాహ్య చెక్లు లేదా అభ్యర్థి యొక్క పూర్తి విడుదల ఆమోదాన్ని ధృవీకరించవు.
వర్క్ఫ్లో అనుమతి అనుసంధానించబడిన `config/quality/admission-policy.json` మరియు
`scripts/quality/admission-verdict.mjs`ను ఉపయోగిస్తుంది. Release-observer ప్రొఫైల్లు వేరుగానే ఉంటాయి;
వాటికి వర్తించే చెక్లు మరియు రసీదులను స్వతంత్రంగా పరిశీలించండి. దిగువనున్న గద్య
ఇన్వెంటరీ ఒక సూచన మాత్రమే, గేట్ వాస్తవంగా అమలైందని నిరూపించే ఆధారం కాదు.

స్క్రిప్ట్లు `scripts/check/` (విధాన గేట్లు) మరియు `scripts/quality/` (రాచెట్ ఇంజిన్) కింద ఉంటాయి.
CIకి ప్రామాణిక మూలం `.github/workflows/ci.yml`.

### విడుదల PR వేగవంతమైన మార్గం (`quality.yml`)

`.github/workflows/quality.yml` main/release PRలు, రక్షిత-బ్రాంచ్
పుష్లు, డిస్పాచ్ మరియు merge groupలపై CIకి అనుబంధంగా పనిచేస్తుంది. PRలు పాత్-ఫిల్టర్ చేసిన వేగవంతమైన చెక్లను ఉపయోగిస్తాయి. శాశ్వతంగా
నిలిపివేయబడిన నకిలీ బిల్డ్ తొలగించబడింది; నిజమైన build/package/boot చెక్లు CIలోనే ఉన్నాయి.

| జాబ్                                             | పరిధి                                                                                                                                                                                                                       | నిరోధక స్థితి        |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRలు; API docs refs మరియు docs-all                                                                                                                                                                                | అవును                |
| `Fast Quality Gates`                             | Code PRలు; స్టాటిక్ చెక్లు, typecheck, dashboard typecheck, ప్రభావిత unit tests                                                                                                                                             | అవును                |
| `Forgotten sibling tests`                        | Code PRలు; మార్చిన మాడ్యూల్ల నుంచి స్టాటిక్ వినియోగదారులు మరియు అభ్యర్థి sibling tests వరకు ట్రేస్ చేయడం; barrel మరియు dynamic-import పాత్లు, సూచించబడిన allowlist మినహాయింపులతో సలహాపూర్వక డయాగ్నస్టిక్లుగా నివేదించబడతాయి | **సలహాపూర్వకం**      |
| `Vitest (fast-path)`                             | Code PRలు; వేగవంతమైన vitest సూట్                                                                                                                                                                                            | అవును                |
| `Unit Tests fast-path`                           | Code PRలు; 4-shard unit సూట్                                                                                                                                                                                                | అవును                |
| `No new ESLint warnings`                         | Code PRలు; suppressionలను పరిగణనలోకి తీసుకునే lint గార్డ్                                                                                                                                                                   | అవును, ఫోర్క్లతో సహా |
| `Merge integrity (changelog + generated skills)` | డ్రాఫ్ట్ కాని PRలు; changelog మరియు రూపొందించిన skill sync                                                                                                                                                                  | అవును, ఫోర్క్లతో సహా |

#### మరచిపోయిన sibling tests నివేదిక

`npm run check:forgotten-sibling-tests` టెస్ట్-ఇంపాక్ట్ మ్యాప్ వెనుక ఉన్న import resolverను మళ్లీ ఉపయోగిస్తుంది.
మార్చిన ప్రతి ప్రొడక్షన్ మాడ్యూల్ కోసం, అభ్యర్థి టెస్ట్
pull-request diffలో లేనప్పుడు, ఇది నిర్ధారితమైన
`changed module/symbol -> static consumer -> candidate sibling test` గొలుసులను నివేదిస్తుంది. ఏదైనా నిరోధక రోలౌట్కు ముందు క్రమాంకనం కోసం
Markdown సారాంశం మరియు JSON ఫలితం `forgotten-sibling-tests` వర్క్ఫ్లో ఆర్టిఫాక్ట్గా నిల్వ చేయబడతాయి.

Barrel re-exportలు మరియు dynamic importలు కేవలం resolution diagnostics మాత్రమే; అవి ఎప్పుడూ
blocking findingను సృష్టించవు. సమీక్షించిన మినహాయింపులు
`config/quality/forgotten-sibling-allowlist.json`లో ఉంటాయి. ప్రతి entry తప్పనిసరిగా consumer మరియు candidate
testను పేర్కొనాలి, నిర్దిష్టమైన కారణాన్ని ఇవ్వాలి, అలాగే GitHub issue లేదా pull requestకు link చేయాలి. తప్పుగా రూపొందించిన entryలు
fail closed అవుతాయి. మినహాయింపులు తొలగించిన candidate testను లేదా `.skip`/`.todo`ను జోడించే diffను అణచివేయలేవు;
assertion బలహీనపరచడం మరియు ఇతర masking చర్యలు స్వతంత్రంగా blockingగా ఉండే
`check:test-masking` gate పరిధిలోనే ఉంటాయి.

### Job: `lint`

`main`కు వచ్చే ప్రతి PRపై అమలవుతుంది. విఫలమైతే mergeను నిరోధిస్తుంది.

| Script (`npm run ...`)            | ధ్రువీకరించేది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blocking                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js version మద్దతు ఉన్న rangeలో ఉంది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | అవును                                     |
| `check:cycles`                    | `src/` + `open-sse/` అంతటా circular importలు (AST-ఆధారితం, tsconfig `paths` resolve చేయబడతాయి). ఏదైనా cycle ఉన్నప్పుడల్లా bare command 1తో exit అవుతుంది (#15281 నుండి fail-closed) మరియు SCCలను జాబితా చేస్తుంది. `check:cycles:ratchet` (CI అమలు చేసేది) `quality-baseline.json`లోని `metrics.cycles` ceilingను count మించినప్పుడు నిరోధిస్తుంది — ప్రస్తుతం 14, `direction: down`, కాబట్టి అది తగ్గడం మాత్రమే సాధ్యం (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                | అవును (ratchet)                           |
| `check:boundary`                  | `open-sse → src` coupling: engine నుండి appలోకి వచ్చే ప్రత్యేకమైన file-to-file importలు (`scripts/quality/measure-boundary.mjs`; edge list అనేది v4 core/module-split remediation backlog). Bare = advisory report (`quality:boundary` మాదిరిగానే). `check:boundary:ratchet` (CI అమలు చేసేది, అలాగే `quality.yml` fast-gates ratchet loopలో కూడా ఉంటుంది) count `quality-baseline.json`లోని `metrics.boundaryOpenSseToSrc` ceilingను మించినప్పుడు నిరోధిస్తుంది — కొలిచిన 771తో seed చేయబడింది, `direction: down`; `--update` దానిని తగ్గించడం మాత్రమే చేస్తుంది; PRలపై base-relative (`--base-ref`, క్రింద చూడండి)                                                                                                                                                                                                                                                                       | అవును (ratchet)                           |
| `check:route-validation:t06`      | అన్ని routeలపై Zod schemaలు ఉన్నాయి (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | అవును                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` సంఖ్య బడ్జెట్ను మించదు (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | అవును                                     |
| `check:provider-consistency`      | `providers.ts`లోని ప్రతి ప్రొవైడర్కు `providerRegistry.ts`లో సరిపోలే ఎంట్రీ ఉంటుంది (మరియు allowlist పరిధిలో దీనికి విరుద్ధంగా కూడా)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | అవును                                     |
| `check:model-lifecycle`           | చేతితో నిర్వహించే మూడు రూటింగ్ పట్టికలు చెక్-ఇన్ చేసిన లైఫ్సైకిల్ స్నాప్షాట్తో (#11503) స్థిరంగా ఉంటాయి: `FITNESS_TABLE` (`taskFitness.ts`)లో `REGISTRY` రూట్ చేయగల రిటైర్డ్ id ఏదీ స్కోర్ చేయబడదు; ప్రతి `BUILT_IN_ALIASES` లక్ష్యం `REGISTRY`లో ఉంటుంది మరియు రిటైర్డ్-id స్నాప్షాట్లో ఉండదు; `REGISTRY`లో ఇప్పటికీ ఉన్న ప్రతి రిటైర్డ్ id ఫార్వర్డ్ చేయబడుతుంది లేదా `allowedRetiredInCatalog`లో జాబితా చేయబడుతుంది; అలాగే ఆ స్నాప్షాట్లో రిటైర్డ్గా కనిపించే సోర్స్ లేదా టార్గెట్ ఏదీ `DEFAULT_DEGRADATION_MAP`లో ఉండదు. ప్రస్తుతం ఒక మోడల్ను లైవ్ అప్స్ట్రీమ్ సర్వ్ చేస్తోందని ఇది నిరూపించదు. ఆఫ్లైన్ — చేతితో `npm run quality:refresh-model-lifecycle` (నెట్వర్క్; CIకి అనుసంధానించబడలేదు) ఉపయోగించి రిఫ్రెష్ చేసే `config/quality/model-lifecycle.json`తో పోలుస్తుంది. `allowedRetiredInCatalog` అనేది బర్న్-డౌన్ రాచెట్: ట్రాకింగ్ ఇష్యూ ఉన్నప్పుడు మాత్రమే ఎంట్రీని జోడించండి. | అవును                                     |
| `check:fetch-targets`             | క్లయింట్-సైడ్ `src/`లోని ప్రతి `fetch("/api/...")` నిజమైన `route.ts`కు రిజాల్వ్ అవుతుంది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | అవును                                     |
| `check:deps`                      | రెపోలోని ప్రతి `package.json`లో `npm install` చేయగల అన్ని డిపెండెన్సీలు `dependency-allowlist.json`లో ఉంటాయి; కొత్తగా పిన్ చేయని లేదా slopsquatted ప్యాకేజీలు ఫ్లాగ్ చేయబడతాయి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | అవును                                     |
| `audit:deps`                      | `npm audit` (రూట్ + electron) — అధిక/క్రిటికల్ అడ్వైజరీలు లేవు (osv `check:vuln-ratchet`తో అతివ్యాప్తి చెందుతుంది; Rationalization Backlog చూడండి)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | అవును                                     |
| `check:lockfile`                  | `package-lock.json` సమగ్రత — https రిజిస్ట్రీ, సమగ్రత హ్యాష్లు, హోస్ట్ ఓవర్రైడ్లు ఉండకూడదు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | అవును                                     |
| `check:licenses`                  | ప్రొడక్షన్ డిపెండెన్సీల కోసం SPDX లైసెన్స్ అనుమతి జాబితా                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | అవును                                     |
| `check:tracked-artifacts`         | బిల్డ్ ఆర్టిఫాక్ట్లు / కమిట్ చేసిన `node_modules` సింబాలిక్ లింక్లు ఉండకూడదు (husky pre-commitలో కూడా అమలవుతుంది; pre-push ఉద్దేశపూర్వకంగానే తేలికగా ఉంటుంది — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | అవును                                     |
| `check:ai-attribution`            | PR కమిట్లు, శీర్షిక లేదా బాడీలో AI/బాట్ `Co-Authored-By` ట్రైలర్ లేదా AI-జనరేషన్ ఫుటర్ ఉండకూడదు — కఠిన నియమం #16 (`quality.yml`లోని PR→`release/**` fast-gates లూప్లో — ఈవెంట్ పేలోడ్ను చదువుతుంది, PRలు కానప్పుడు ఏమీ చేయదు — అలాగే PR→`main` కోసం `ci.yml` lintలో PR-మాత్రమే అమలయ్యే దశ; husky `commit-msg` హుక్ కూడా; మానవ సహ-రచయితలకు అనుమతి ఉంది; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | ప్రతి Vitest మినహాయింపు ఒక ట్రాకింగ్ ఇష్యూను పేర్కొనాలి మరియు `config/quality/vitest-exclusions.json`లో కనిపించాలి (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | అవును                                     |
| `check:file-size`                 | సోర్స్ ఫైల్లు (`src/`, `open-sse/`, `electron/`, `bin/`లోని `.ts`/`.tsx`) `cap` పరిధిలోనూ, టెస్ట్ ఫైల్లు (`*.test.ts(x)`) `testCap` పరిధిలోనూ ఉండాలి; `file-size-baseline.json`లో ఫ్రీజ్ చేసిన ఫైల్లు (`frozen` / `testFrozen`) వాటి నమోదిత పరిమాణాన్ని మించి పెరగకూడదు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | అవును                                     |
| `check:error-helper`              | ఎగ్జిక్యూటర్లు/హ్యాండ్లర్లలోని ఎర్రర్ ప్రతిస్పందనలు `buildErrorBody()` / `sanitizeErrorMessage()`ను ఉపయోగిస్తాయి (కఠిన నియమం #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | అవును                                     |
| `check:migration-numbering`       | మైగ్రేషన్ SQL ఫైల్లు ఖాళీలు లేదా నకళ్లు లేకుండా వరుసగా సంఖ్యీకరించబడ్డాయి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | అవును                                     |
| `check:public-creds`              | `publicCreds.ts` వెలుపల లిటరల్ OAuth `client_id`/`client_secret` లేదా Firebase Web కీలు లేవు (కఠిన నియమం #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | అవును                                     |
| `check:db-rules`                  | `src/lib/db/` మాడ్యూల్ల వెలుపల ముడి SQL లేదు; `localDb.ts` నుండి బ్యారెల్-ఇంపోర్ట్లు లేవు (కఠిన నియమాలు #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | అవును                                     |
| `check:known-symbols`             | వాటి డిస్పాచ్ పట్టికలలో నమోదు చేయబడిన ప్రొవైడర్ ఎగ్జిక్యూటర్లు, రూటింగ్ వ్యూహాలు మరియు ట్రాన్స్లేటర్లు డిస్క్లోని ఫైల్లతో సరిపోలుతాయి — అనాథ లేదా ప్రకటించని సింబల్లు లేవు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | అవును                                     |
| `check:route-guard-membership`    | చైల్డ్ ప్రాసెస్ను ప్రారంభించే ప్రతి రూట్ `isLocalOnlyPath()` ద్వారా వర్గీకరించబడుతుంది (కఠిన నియమాలు #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | అవును                                     |
| `check:test-discovery`            | repoలోని ప్రతి `*.test.ts` / `*.spec.ts` ఫైల్ కనీసం ఒక test runner ద్వారా సేకరించబడుతుంది (ర్యాచెట్: `test-discovery-baseline.json`లోని అనాథ ఫైళ్ల జాబితా కేవలం తగ్గగలదు)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | అవును                                     |
| `check:agent-skills-sync`         | రూపొందించబడిన agent-skills ఆర్టిఫాక్ట్లు వాటి మూల catalogతో సరిపోలుతాయి (వ్యత్యాసం ఉండదు)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Provider logoలు/assetలు నమోదు చేయబడిన మూలాధార ఎంట్రీని కలిగి ఉంటాయి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON config ఫైళ్లు సరిగ్గా parse అవుతాయి మరియు repo lint నియమాలను పాటిస్తాయి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | లోపాలు లేకుండా TypeScript compilation (సలహా హెచ్చరికలు మాత్రమే)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | అవును                                     |
| `typecheck:noimplicit:core`       | కఠినమైన `noImplicitAny` — భవిష్యత్తును దృష్టిలో ఉంచుకున్నది; ముందుగా ఉన్న అనేక call siteలకు ఇంకా annotationలు అవసరం                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **సలహాత్మకం** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`కు పరిమితమైన `tsc` (#7033) — `typecheck:core`లోని జాగ్రత్తగా ఎంపిక చేసిన 27-ఫైళ్ల allowlistలో ఎటువంటి dashboard TSX లేదు, అలాగే `next build` కూడా దానిని ఎప్పుడూ type-check చేయదు (`next.config.mjs`లో `ignoreBuildErrors: true` సెట్ చేయబడింది), కాబట్టి అక్కడి అనాథ identifier regressionలు (#6625/#6909) CIకి కనిపించలేదు. స్థిరీకరించిన ప్రతి-ఫైల్/ప్రతి-TS-code count baselineతో (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`లో ఉన్నదే stale-enforcement నమూనా) తేడాలు పోల్చబడతాయి — baseline countను మించిన కొత్త లోపాలు మాత్రమే gateను విఫలం చేస్తాయి; ముందుగా ఉన్న లోపం పరిష్కరించబడినప్పుడు `--update`తో baselineను క్రమంగా తగ్గించండి.                                                                                                                                                                                    | అవును                                     |

### Job: `quality-gate`

`test-coverage` తర్వాత అమలవుతుంది. విఫలమైతే విలీనాన్ని నిరోధిస్తుంది.

| స్క్రిప్ట్                   | ధృవీకరించేది                                                                                                                                                                                                               | నిరోధించేది                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | `quality-metrics.json`ను ఉత్పత్తి చేస్తుంది (ESLint హెచ్చరికల సంఖ్య, విలీనం చేసిన షార్డ్ నివేదిక నుండి కవరేజ్)                                                                                                             | అవును (ratchetకు అప్స్ట్రీమ్) |
| `quality:ratchet`            | `quality-baseline.json`లోని ప్రతి మెట్రిక్ క్షీణించలేదని నిర్ధారిస్తుంది (ESLint హెచ్చరికలు ≤ బేస్లైన్; కవరేజ్ ≥ బేస్లైన్)                                                                                                 | అవును                         |
| `check:duplication`          | కోడ్ నకిలీకరణ (jscpd@4), `quality-baseline.json`లోని బేస్లైన్ను మించదని నిర్ధారిస్తుంది                                                                                                                                    | అవును                         |
| `check:complexity`           | ఫైల్-స్థాయి సైక్లోమాటిక్ సంక్లిష్టత పరిమితిని మించదని నిర్ధారిస్తుంది (కోర్ ESLint `complexity` + `max-lines-per-function`)                                                                                                | అవును                         |
| `check:cognitive-complexity` | కాగ్నిటివ్ సంక్లిష్టత ratchet (`eslint-plugin-sonarjs`) — ప్రత్యేక ESLint పాస్; CI రెండింటినీ కలిపి ఒకే `check:complexity-ratchets` దశగా అమలు చేస్తుంది                                                                    | అవును                         |
| `check:dead-code`            | ఉపయోగించని ఎక్స్పోర్ట్లు / ఫైళ్ల ratchet (knip), బేస్లైన్తో పోలిస్తే క్షీణించలేదని నిర్ధారిస్తుంది                                                                                                                         | అవును                         |
| `check:compression-budget`   | కంప్రెషన్ బెంచ్మార్క్ బడ్జెట్ — ఒక్కో ఇంజిన్కు సంబంధించిన టోకెన్-పొదుపు కనిష్ఠ స్థాయిలు క్షీణించకూడదు                                                                                                                      | అవును                         |
| `check:type-coverage`        | టైప్ చేసిన శాతం ratchet (`type-coverage`) క్షీణించలేదని నిర్ధారిస్తుంది; ఇది ఎక్కువగా `typecheck:noimplicit:core`ను తనలో కలుపుకుంటుంది                                                                                     | అవును                         |
| `check:codeql-ratchet`       | తెరిచి ఉన్న CodeQL హెచ్చరికల సంఖ్య క్షీణించలేదని నిర్ధారిస్తుంది (`gh api` ద్వారా చదువుతుంది; టోకెన్ లేకుంటే సునాయాసంగా దాటవేస్తుంది) — రిఫ్రెష్ వ్యవధి మరియు మాన్యువల్ ట్రిగ్గర్ కోసం దిగువన ఉన్న "CodeQL ratchet" చూడండి | అవును                         |

### జాబ్: `quality-extended`

మొత్తం జాబ్ సలహాపూర్వకమైనది (`continue-on-error: true`). npm-ఆధారిత ratchetలు
వాస్తవంగా అమలవుతాయి; బాహ్య స్కానర్లు `gh release download` ద్వారా ఇన్స్టాల్ అవుతాయి మరియు
బైనరీ అప్పటికీ అందుబాటులో లేకపోతే స్వయంగా దాటవేస్తాయి (exit 0).

| స్క్రిప్ట్               | ధృవీకరించేది                                                                                                                                                                                                                                   | నిరోధించేది                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | సర్క్యులర్ డిపెండెన్సీలు లేవని నిర్ధారిస్తుంది (dpdm)                                                                                                                                                                                          | **సలహాపూర్వకం**                                   |
| `check:bundle-size`      | బండిల్ పరిమాణం పరిమితిని మించదని నిర్ధారిస్తుంది                                                                                                                                                                                               | **సలహాపూర్వకం**                                   |
| `check:secrets`          | రహస్యాల స్కానింగ్ (gitleaks) — బైనరీ లేకుంటే దాటవేస్తుంది                                                                                                                                                                                      | **సలహాపూర్వకం**                                   |
| `check:vuln-ratchet`     | డిపెండెన్సీ దుర్బలతలు (osv-scanner) క్షీణించలేదని నిర్ధారిస్తుంది — బైనరీ లేకుంటే దాటవేస్తుంది                                                                                                                                                 | **సలహాపూర్వకం**                                   |
| `check:workflows`        | వర్క్ఫ్లో లింట్ (actionlint + zizmor); స్కానర్లు లేకపోయినా/పనిచేయకపోయినా, నివేదికలు చెల్లకపోయినా లేదా ratchet బేస్లైన్ లేకపోయినా INCOMPLETEగా విఫలమవుతుంది. చెల్లుబాటు అయ్యే ఫలితాలు ఎంచుకున్న strict/advisory/ratchet విధానాన్ని అనుసరిస్తాయి | అమలు తప్పనిసరి; CIలో zizmor ratchet నిరోధిస్తుంది |
| `check:openapi-breaking` | పబ్లిక్ API ఒప్పందంలో (`openapi.yaml`) బేస్ బ్రాంచ్తో పోలిస్తే బ్రేకింగ్ మార్పులు (oasdiff) — `openapiBreaking=N`ను ఉత్పత్తి చేస్తుంది; oasdiff లేకుంటే లేదా బేస్ స్పెక్ను పరిష్కరించలేకపోతే దాటవేస్తుంది                                      | **సలహాపూర్వకం**                                   |

### జాబ్: `docs-sync-strict`

`main`కు సంబంధించిన ప్రతి PRలో అమలవుతుంది. విఫలమైతే విలీనాన్ని నిరోధిస్తుంది.

| స్క్రిప్ట్                     | ధృవీకరించేది                                                                                                                                                         | నిరోధించేది                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | దిగువనున్న 6 ఉప-గేట్లను వరుసగా అమలు చేసే మెటా-గేట్                                                                                                                   | అవును                          |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt సంస్కరణల స్థిరత్వం                                                                                                                     | అవును                          |
| ↳ `check:docs-counts`          | గద్యంలో పేర్కొన్న సంఖ్యలు (ప్రొవైడర్ల సంఖ్య, మైగ్రేషన్ల సంఖ్య మొదలైనవి) వాస్తవ సంఖ్యల రాచెట్ పరిధిలో ఉంటాయి                                                          | అవును                          |
| ↳ `check:env-doc-sync`         | `.env.example`లోని ప్రతి env var ఒక డాక్యుమెంటేషన్ పట్టికలో నమోదు చేయబడి ఉంటుంది, అలాగే దీనికి విరుద్ధంగా కూడా                                                       | అవును                          |
| ↳ `check:deprecated-versions`  | డాక్యుమెంటేషన్లో నిలిపివేయబడిన సంస్కరణ స్ట్రింగ్లు ఉండవు                                                                                                             | అవును                          |
| ↳ `check:doc-links`            | డాక్యుమెంటేషన్లోని అంతర్గత markdown లింక్లు వాస్తవ ఫైల్లకు పరిష్కారమవుతాయి (`[text]`/`(path)` రూపం)                                                                  | అవును                          |
| ↳ `check:fabricated-docs`      | డాక్యుమెంటేషన్లో పేర్కొన్న రూట్లు, env varలు, CLI కమాండ్లు, హుక్ పేర్లు, ఫైల్ పాత్లు కోడ్బేస్లో ఉంటాయి. `--strict` ద్వారా హార్డ్ గేట్; ఫ్లాగ్ లేకుండా సాఫ్ట్-ఫెయిల్. | అవును (CIలో `--strict` ద్వారా) |
| `check:cli-i18n`               | CLI కమాండ్ స్ట్రింగ్లు అన్ని i18n locale ఫైల్లలో ఉంటాయి                                                                                                              | అవును                          |
| `check:openapi-coverage`       | OpenAPI స్పెక్ వాస్తవ రూట్లలో కనీసం రాచెట్ చేయబడిన కనిష్ఠ పరిమితినైనా కవర్ చేస్తుంది                                                                                 | అవును                          |
| `check:openapi-security-tiers` | `openapi.yaml`లోని భద్రతా స్థాయి అనోటేషన్లు `routeGuard.ts` వర్గీకరణలకు అనుగుణంగా ఉంటాయి                                                                             | **సలహాత్మకం**                  |
| `check:openapi-routes`         | `openapi.yaml`లోని ప్రతి పాత్ వాస్తవ `route.ts`కు పరిష్కారమవుతుంది (కల్పిత సమాచారం నిరోధం)                                                                           | అవును                          |
| `check:docs-symbols`           | `docs/**/*.md`లోని ప్రతి `/api/...` ప్రస్తావన వాస్తవ `route.ts`కు పరిష్కారమవుతుంది (కల్పిత సమాచారం నిరోధం)                                                           | అవును                          |
| `i18n translation drift`       | i18n locale ఫైల్లలో అనువదించని కీలు — హెచ్చరిక మాత్రమే                                                                                                               | **సలహాత్మకం**                  |

### జాబ్: `i18n-ui-coverage`

| స్క్రిప్ట్                         | ధృవీకరించేది                                                                                                                                                                       | నిరోధించేది   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (ఇన్లైన్) | UI i18n కీ కవరేజ్ ≥ 65%                                                                                                                                                            | అవును         |
| `check-ui-value-drift` (ఇన్లైన్)   | తిరిగి వ్రాయబడిన ఆంగ్ల **విలువ** పాత అనువాదాన్ని మిగలనివ్వదు                                                                                                                       | అవును         |
| `check-new-key-coverage` (ఇన్లైన్) | ఒక **కొత్త** ఆంగ్ల కీ ప్రతి localeలో అనువదించబడుతుంది — `__MISSING__:` మార్కర్ తిరస్కరించబడుతుంది                                                                                  | అవును         |
| `check-translation-ratio`          | ప్రతి localeకు వాస్తవ-అనువాద నిష్పత్తి (అనుమతి జాబితాకు వెలుపల ఆంగ్లంతో సమానమైన / ప్లేస్హోల్డర్ / లేని లీవ్లు) `config/quality/i18n-translation-baseline.json` + slackను మించకూడదు | **సలహాత్మకం** |

దీనికి `fetch-depth: 0` అవసరం — value-drift గేట్ merge baseతో `en.json`ను diff చేస్తుంది.

#### `check-ui-value-drift` — పాత-అనువాద గేట్

ఇతర గేట్లు నిర్మాణాత్మకంగా గుర్తించలేని ఒక i18n రిగ్రెషన్ను ఇది గుర్తిస్తుంది: ఒక ఆంగ్ల విలువ
తిరిగి వ్రాయబడినా, _మునుపటి_ ఆంగ్లం ఆధారంగా రూపొందించిన అనువాదాలు అలాగే మిగిలిపోతాయి; ఫలితంగా
ఆంగ్లేతర వినియోగదారులు నమ్మకంగా వ్రాసినప్పటికీ ఇప్పుడు తప్పుగా ఉన్న పాఠ్యాన్నే చదువుతూ ఉంటారు.

ఇది వాస్తవంగా విడుదలైంది. Antigravity login helper వచ్చినప్పుడు (#5203)
`oauthModal.googleOAuthWarning` తిరిగి వ్రాయబడింది; **43 localeలలో 39** ఆపరేటర్లకు "పూర్తి URLను
కాపీ చేసి దిగువన పేస్ట్ చేయండి" అని చెప్పే పాఠ్యాన్నే ఉంచాయి — ఆ ప్రొవైడర్కు పూర్తి చేయడం సాధ్యం కాని ఫ్లో ఇది. ఈ కారణాల వల్ల
#8463 వరకు ఇది గుర్తించబడలేదు:

- `sync-ui-keys` **లేని** కీలను మాత్రమే బ్యాక్ఫిల్ చేస్తుంది, **పాతబడిన** కీలను ఎప్పుడూ చేయదు;
- `check-ui-keys-coverage` కీ _ఉనికిని_ లెక్కిస్తుంది, కాబట్టి పాత అనువాదం కూడా కవర్ అయినట్లు స్కోర్ పొందుతుంది;
- `check-translation-drift` అనేది `docs/i18n/<locale>/**.md` డాక్యుమెంటేషన్ మిర్రర్లను ట్రాక్ చేస్తుంది —
  ఇది `src/i18n/messages/*.json`ను ఎప్పుడూ చదవదు. 2026-09 రీ-సింక్ నుండి `docs-sync-strict` జాబ్లో నిరోధించబడుతోంది:
  ఒక ప్రధాన డాక్యుమెంట్ను సవరించండి → `npm run i18n:run -- --files=<doc>` (విభాగ-స్థాయి, తక్కువ వ్యయం).

**డిఫ్ను పరిగణనలోకి తీసుకునేది, బేస్లైన్పై ఆధారపడేది కాదు.** ఇది merge base వద్ద ఉన్న `en.json`ను
working treeతో పోలుస్తుంది; ఇంగ్లీష్ విలువ మారిన ప్రతి కీకి, ఇప్పటికీ మార్చని
అనువాదాన్ని కలిగి ఉన్న ఏ locale అయినా కాలం చెల్లినదిగా పరిగణించబడుతుంది. ఇది ఉద్దేశపూర్వకంగా **ముందే ఉన్న బకాయిని స్థిరీకరిస్తుంది** — చాలా కాలంగా ఉన్న అనువాదం ఏ పాత ఇంగ్లీష్ నుంచి వచ్చిందో
డిఫ్ వెల్లడించలేదు, కాబట్టి ప్రస్తుత మార్పు తాకిన వాటిని మాత్రమే gate అంచనా వేస్తుంది.
ప్రత్యామ్నాయం (ప్రతి-కీ hash baseline) కోసం ~600 KB generated file అవసరమవుతుంది,
ఇది ప్రస్తుతం ఉన్న అతిపెద్ద baseline కంటే 3× పెద్దది, అలాగే ప్రతి i18n PRలో మార్పులకు గురవుతుంది.

దీనిని సంతృప్తిపరచడానికి రెండు మార్గాలు:

1. ప్రభావిత అనువాదాలను నవీకరించండి, లేదా
2. వాటిని `__MISSING__:<new english>`కు సెట్ చేయండి — అప్పుడు runtime సరిచేసిన ఇంగ్లీష్ను అందిస్తుంది
   (`src/i18n/request.ts::deepMergeFallback`, #7258), అలాగే ఆ కీ అనువాదం కోసం క్యూలో చేరుతుంది.

స్ట్రింగ్ యొక్క **అర్థం** మారితే, **కీ పేరును మార్చడానికి** ప్రాధాన్యం ఇవ్వండి: కొత్త కీ
కాలం చెల్లిన అనువాదాన్ని వారసత్వంగా పొందలేదు. #8463లో ఉపయోగించిన నమూనా ఇదే.

```bash
npm run i18n:check-value-drift          # కఠినమైనది (CI అమలు చేసేది)
npm run i18n:check-value-drift:warn     # నివేదిక మాత్రమే
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

base catalogను చదవలేనప్పుడు (base ref లేని shallow
clone), `check-openapi-breaking`ను అనుకరిస్తూ, `SKIP reason=base-unresolved`తో 0 స్థితిలో నిష్క్రమిస్తుంది.

### జాబ్: `i18n`

పూర్తి i18n ధృవీకరణ మ్యాట్రిక్స్ (ప్రతి localeకు ఒక జాబ్). మొత్తం జాబ్ సలహాపూర్వకమైనది.

| స్క్రిప్ట్                      | ధృవీకరించేది                   | నిరోధించేది                                               |
| ------------------------------- | ------------------------------ | --------------------------------------------------------- |
| `validate_translation.py quick` | ప్రతి localeకు అనువాద సంపూర్ణత | **సలహాపూర్వకం** (మొత్తం జాబ్పై `continue-on-error: true`) |

### జాబ్: `pr-test-policy`

pull requestలపై మాత్రమే అమలవుతుంది.

| స్క్రిప్ట్             | ధృవీకరించేది                                                                                                                                                | నిరోధించేది |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, లేదా `bin/`లో production codeను మార్చే PRలు తప్పనిసరిగా testsను చేర్చాలి లేదా నవీకరించాలి (కఠిన నియమం #8)                 | అవును       |
| `check:test-masking`   | మారిన test files నికర assert సంఖ్యను తగ్గించవు లేదా `assert.ok(true)` tautologiesను జోడించవు                                                                | అవును       |
| `check:pr-evidence`    | PR body మార్పుకు సంబంధించిన test/VPS ఆధారాలను పేర్కొంటుంది (PR proseను grep చేయడం ద్వారా కఠిన నియమం #18ను యాంత్రీకరిస్తుంది — సున్నితమైనది, Backlog చూడండి) | అవును       |

### జాబ్: `test-vitest`

`build` తర్వాత అమలవుతుంది. విఫలమైతే mergeను నిరోధిస్తుంది.

| సూట్             | ధృవీకరించేది                                             | నిరోధించేది                                                                                                                     |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | అవును                                                                                                                           |
| `test:vitest:ui` | UI component tests — vitest runner                       | **నిరోధిస్తుంది** — ముందే ఉన్న వైఫల్యాలు `vitest.config.ts`లో స్పష్టంగా మినహాయించబడ్డాయి; కొత్త వైఫల్యాలు జాబ్ను విఫలం చేస్తాయి |

### రాత్రివేళ workflows (షెడ్యూల్ చేయబడినవి, సలహాపూర్వకమైనవి)

ఇవి cron scheduleపై (మరియు `workflow_dispatch` ద్వారా) అమలవుతాయి, PRలపై ఎప్పుడూ అమలవవు. అన్నీ సలహాపూర్వకమైనవే.

| Workflow               | ధృవీకరించేది                                                                                                                                           | నిరోధించేది     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `nightly-property`     | యాదృచ్ఛిక seed + అధిక run countతో fast-check property tests                                                                                            | **సలహాపూర్వకం** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                  | **సలహాపూర్వకం** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret లేకపోతే దాటవేయబడతాయి)                                                           | **సలహాపూర్వకం** |
| `nightly-schemathesis` | `docs/openapi.yaml`ను ఉపయోగించి live OmniRouteపై OpenAPI contract fuzzing (schemathesis) — spec ఉల్లంఘనలు / నిర్వహించని 500లను బయటపెడుతుంది (దశ 8 B.4) | **సలహాపూర్వకం** |
| `nightly-mutation`     | వేగవంతమైన unit laneపై Stryker mutation-testing score — నిలిచిపోయిన mutants బలహీనమైన assertsను బయటపెడతాయి                                               | **సలహాపూర్వకం** |
| `nightly-compat`       | మద్దతు ఉన్న `engines.node` పరిధులలో Node engine compatibility matrix                                                                                   | **సలహాపూర్వకం** |

Performance baselines (heap, TTFB, build time) నమోదు చేయబడతాయి, కానీ gate చేయబడవు: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) చూడండి.

---

## వేగ దశ (2026-08-30 → v4.0 LTS): ప్రతి బేస్లైన్ 20% సడలించబడింది

యజమాని నిర్ణయం (2026-08-30): v4.0 మాడ్యులరైజేషన్ వరకు, సాంకేతిక రుణాన్ని అదుపులో ఉంచడం కంటే
విడుదల వేగమే ముఖ్యం. ప్రతి **సంఖ్యాత్మక** రాచెట్ బేస్లైన్ ఒకే
ఆడిట్ చేయదగిన పాస్లో 20% సడలించబడింది, అలాగే ఈ దశ `config/quality/quality-baseline.json`లో ప్రకటించబడింది:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| ఏమి మారింది                                                                                                                                                                                                  | ఎక్కడ                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — తక్కువగా ఉంటే మెరుగైన గణనలు ×1.2, ఎక్కువగా ఉంటే మెరుగైన శాతాలు ÷1.2 (కవరేజ్ కనిష్ఠం 60గా ఉంచబడింది, `eslintErrors` 0గానే ఉంటుంది, `eslintWarnings` 0 → స్థిరీకరించిన సప్రెషన్ గణనలో 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` గమనిక ప్రతి ముందు → తర్వాత విలువను జాబితా చేస్తుంది) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                    |
| `cap`, `testCap`, ప్రతి `frozen[*]` / `testFrozen[*]` లైన్ పరిమితి ×1.2                                                                                                                                      | `file-size-baseline.json`                                                                                  |
| ఒక్కో ఫైల్ / ఒక్కో TS కోడ్ గణనలు ×1.2                                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`     |
| `THRESHOLD` 36 → 30                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                                 |
| `_policy.requireTighten === false`గా ఉన్నప్పుడు `--require-tighten` సలహాపూర్వకంగా మారుతుంది                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                                |
| రాత్రివేళ అమలయ్యే `bank-ratchet-shrinks` నిలిపివేయబడుతుంది (అది కొలిచిన తగ్గింపును బ్యాంక్ చేసి, అదనపు వెసులుబాటును రద్దు చేసేది)                                                                            | `.github/workflows/nightly-release-green.yml`                                                              |

అనుమతి జాబితాలు (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) బడ్జెట్లు **కావు**, కాబట్టి వాటిని మార్చలేదు. పాస్/ఫెయిల్ విధాన గేట్లు (రహస్యాలు, SQL నియమాలు,
డాక్స్/env ఒప్పందం, i18n సమానత్వం, యూనిట్ పరీక్షలు) మారలేదు — విఫలమైన పరీక్ష ఇప్పటికీ విఫలమైన పరీక్షగానే ఉంటుంది.

**టూలింగ్**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ఒకసారి మాత్రమే చేసే
  సడలింపు (`scripts/quality/relax-baselines.mjs`); అదే గమనికతో రెండోసారి అమలు కావడానికి నిరాకరిస్తుంది.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI కొలిచే విధంగానే ప్రతి సంఖ్యాత్మక గేట్ను కొలిచి, ఒక్కో గేట్కు మిగిలిన వెసులుబాటును ముద్రిస్తుంది
  (`scripts/quality/baseline-headroom.mjs`). రాత్రివేళ అమలయ్యే `baseline-headroom` జాబ్
  వర్క్ఫ్లో రన్ సారాంశంలో పట్టికను ప్రచురించి, దాని JSON/Markdown నివేదికను
  `baseline-headroom-<run_id>`గా అప్లోడ్ చేస్తుంది; అది 90 రోజుల పాటు నిల్వ ఉంటుంది. హెచ్చరిక మరియు కీలక వరుసలు
  తమ పరిమితికి 10% లోపు ఉన్న లేదా ఇప్పటికే దాన్ని మించిన గేట్లను గుర్తిస్తాయి. బడ్జెట్లు
  వినియోగించబడుతున్నాయనే ముందస్తు హెచ్చరికగా ఈ నివేదికలను సమీక్షించండి; సమస్యాత్మక గేట్కు చెందిన `_rebaseline_*`
  గమనికలను పరిశీలించండి. ఈ జాబ్ ఇకపై శాశ్వత ఇష్యూను సృష్టించదు లేదా నవీకరించదు; మునుపటి నివేదిక
  చరిత్రను #12149 భద్రపరుస్తుంది.

**కొత్త-కోడ్ మోడ్ (Clean-as-You-Code) — 2026-08-30 నుండి, PR వేగవంతమైన మార్గానికి మాత్రమే**

`pull_request` ఈవెంట్లపై `quality.yml`, `check:file-size`,
`check:complexity-ratchets` మరియు `check:dead-code`కు `--base-ref <PR base SHA>`ను పంపుతుంది. `check:complexity-ratchets` మరియు
`check:dead-code` కోసం, గేట్ HEADను merge-baseతో **PR మార్చిన ఫైల్లకే
పరిమితం చేసి** పోలుస్తుంది (`scripts/check/newCodeMode.mjs`: merge-baseను తాత్కాలిక
`git worktree`లో సృష్టిస్తారు, ESLint/knipను అక్కడ మరియు HEADపై అమలు చేసి, ఒక్కో ఫైల్ గణనల మధ్య తేడాను లెక్కిస్తారు):

- **నిరోధకం** — PR, తాను మార్చిన ఫైల్లలో సైక్లోమాటిక్/కాగ్నిటివ్ ఉల్లంఘనలు లేదా డెడ్ ఎక్స్పోర్ట్లను జోడించింది
  (లాగ్లో `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **సలహాపూర్వకం** — స్థిరీకరించిన బేస్లైన్తో పోల్చిన గ్లోబల్ మొత్తం. వారసత్వంగా వచ్చిన డ్రిఫ్ట్ కారణంగా సంబంధం లేని
  PR ఎప్పుడూ విఫలం కాదు; విడుదల సమన్వయం సమయంలో డ్రిఫ్ట్ మళ్లీ స్థిరీకరించబడుతుంది, అలాగే headroom జాబ్ దాన్ని పర్యవేక్షిస్తుంది.

`check:file-size` బేస్ రెఫ్ను తన స్వంత నియమాల ప్రకారం ఉపయోగిస్తుంది (`scripts/check/check-file-size.mjs`, #8522):
ఇది ట్రీలోని ప్రతి సోర్స్ మరియు టెస్ట్ ఫైల్ను తనిఖీ చేసి, PR బేస్ వద్ద ప్రతి ఫైల్ లైన్ గణనను
`git show`తో చదువుతుంది; ఆ ఫైల్ తన బేస్లైన్ గరిష్ఠ పరిమితి
(`frozen` / `testFrozen`, లేదా బేస్లైన్లో లేని ఫైల్కు `cap` / `testCap`) మరియు దాని బేస్
పరిమాణంలో పెద్దదాన్ని మించి పెరిగినప్పుడు మాత్రమే విఫలమవుతుంది. కాబట్టి బేస్లో ఇప్పటికే డ్రిఫ్ట్ అయిన ఫైల్ కారణంగా సంబంధం లేని PR ఎప్పుడూ విఫలం కాదు.

`check:boundary:ratchet` తన ఏకైక సంఖ్యకు కూడా ఇదే నియమాన్ని వర్తింపజేస్తుంది
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ఈవెంట్లలో
`quality.yml` ఫాస్ట్-గేట్లు మరియు `ci.yml` lint జాబ్ రెండూ PR బేస్ SHAను అందిస్తాయి, బేస్ కమిట్ను
`git archive` ఎక్స్పోర్ట్ నుండి కొలుస్తారు, అలాగే దాని `open-sse → src` ఎడ్జ్ల సంఖ్య
`metrics.boundaryOpenSseToSrc` మరియు బేస్లోని సంఖ్యలో పెద్దదాన్ని మించినప్పుడు మాత్రమే PR విఫలమవుతుంది. సీలింగ్కు
మించిన బేస్ డ్రిఫ్ట్ నివేదించబడుతుంది (`base drift herdado`), కానీ దాని వల్ల నిర్దోషమైన PR ఎప్పటికీ విఫలం కాదు; push → main
సంపూర్ణ సీలింగ్ను కొనసాగిస్తుంది, అలాగే పరిష్కరించలేని బేస్ SHA ఒక హెచ్చరికతో తిరిగి దానినే ఉపయోగిస్తుంది.

`workflow_dispatch` రన్లు, release-green స్వీప్ మరియు nightly headroom జాబ్కు PR బేస్ ఉండదు,
కాబట్టి అవి సంపూర్ణ (గ్లోబల్) పోలికనే కొనసాగిస్తాయి. కవరేజ్, డూప్లికేషన్ మరియు టైప్-కవరేజ్ ప్రస్తుతానికి గ్లోబల్గానే
ఉంటాయి (వాటి టూల్స్ తక్కువ ఖర్చుతో ప్రతి-ఫైల్ diffను ఉత్పత్తి చేయవు) — ఇదే విధానాన్ని వర్తింపజేయడానికి ఇవి అభ్యర్థులు.

**v4.0 వద్ద దశను ముగించడం (LTS = మునుపటి కంటే కఠినమైనది, "తిరిగి సాధారణ స్థితికి" కాదు)**

1. స్వచ్ఛమైన `release/v4.0.0` tipపై: రికార్డ్ కోసం `npm run quality:headroom --json`, ఆపై
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ప్రతి typecheck గేట్కు చెందిన
   `--update` — ప్రతి బేస్లైన్ కొలిచిన విలువకు తగ్గుతుంది.
2. `quality-baseline.json` నుండి `_policy`ని తొలగించండి (`--require-tighten` మరియు nightly
   bankingను మళ్లీ సక్రియం చేస్తుంది), `check-openapi-coverage.mjs`లో `THRESHOLD = 36`ను (లేదా అంతకంటే ఎక్కువను) పునరుద్ధరించండి.
3. మాడ్యులరైజేషన్ ఫలించిన చోట కొలిచిన విలువ కంటే మరింత కఠినతరం చేయండి: file-size `cap`ను తిరిగి 1000కు
   (లేదా 800కు), coverage floorsను +5కు, మాడ్యులరైజ్ చేసిన ప్యాకేజీలకు dead exportsను 0కు సెట్ చేయండి.

## రాచెట్ బేస్లైన్ (`quality-baseline.json`)

రాచెట్ ఇంజిన్ (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json`ను చదివి,
కొత్తగా సేకరించిన `quality-metrics.json`తో దాన్ని పోలుస్తుంది. ఏదైనా మెట్రిక్ దాని ఎప్సిలాన్ను
మించి దిగజారితే, బిల్డ్ విఫలమవుతుంది.

ప్రస్తుతం ట్రాక్ చేస్తున్న మెట్రిక్లు:

| మెట్రిక్              | దిశ    | అర్థం                            |
| --------------------- | ------ | -------------------------------- |
| `eslintWarnings`      | `down` | ESLint హెచ్చరికల సంఖ్య పెరగకూడదు |
| `coverage.statements` | `up`   | స్టేట్మెంట్ కవరేజ్ తగ్గకూడదు     |
| `coverage.lines`      | `up`   | లైన్ కవరేజ్ తగ్గకూడదు            |
| `coverage.functions`  | `up`   | ఫంక్షన్ కవరేజ్ తగ్గకూడదు         |
| `coverage.branches`   | `up`   | బ్రాంచ్ కవరేజ్ తగ్గకూడదు         |

వాస్తవమైన మెరుగుదల తర్వాత బేస్లైన్ను నవీకరించడానికి:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ఫ్లాగ్ ప్రస్తుతం కొలిచిన విలువలను `quality-baseline.json`లో వ్రాస్తుంది.
మెట్రిక్ను మెరుగుపరిచిన మార్పుతో పాటు ఈ ఫైల్ను కమిట్ చేయండి. మెట్రిక్ను మెరుగుపరిచి,
బేస్లైన్ను నవీకరించని PRను `--require-tighten` గుర్తిస్తుంది (దశ 6A.5,
అమలు పెండింగ్లో ఉంది).

### CodeQL రాచెట్: రిఫ్రెష్ తరచుదనం మరియు మాన్యువల్ ట్రిగ్గర్

`check:codeql-ratchet` **షెడ్యూల్ ప్రకారం రిఫ్రెష్ అయ్యే రెపో స్థితిని చదువుతుంది — ప్రతి PRకు కాదు.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` అనేది
`state: configured`, `schedule: weekly` అని నివేదిస్తుంది: ఇది GitHub డిఫాల్ట్-సెటప్ స్కాన్,
ప్రతి పుష్కు జరిగే విశ్లేషణ కాదు. పర్యవసానంగా: అలర్ట్లను సరిచేసే PR మెర్జ్ అయిన తర్వాత,
తదుపరి షెడ్యూల్ చేసిన స్కాన్ అమలయ్యే వరకు రాచెట్ పాత, ఎక్కువ కౌంట్నే చదువుతూ ఉంటుంది —
కాబట్టి స్కాన్ తాజా స్థితిని అందుకునే వరకు, పరిష్కార PRకు సంబంధించిన తదుపరి PRలతో సహా,
తెరిచి ఉన్న ప్రతి PRలోనూ అది రిగ్రెషన్ను నివేదిస్తుంది.

**మాన్యువల్ రిఫ్రెష్**: `gh workflow run codeql.yml --ref release/vX.Y.Z` విశ్లేషణను
మళ్లీ అమలు చేసి, కొన్ని నిమిషాల్లోనే అలర్ట్లను తిరిగి ప్రచురిస్తుంది. ముందుగా
`.github/workflows/codeql.yml`ను చదవండి — GitHub యొక్క "డిఫాల్ట్ సెటప్"తో ఇది విభేదిస్తుంది
కాబట్టే ఇది `workflow_dispatch`కు మాత్రమే పరిమితమైందని దాని హెడర్ వివరిస్తుంది
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` ట్రిగ్గర్లను పునరుద్ధరించడానికి ముందుగా **ఓనర్ చర్య**
అవసరం: Settings → Code security → CodeQL: Default → Advanced. ఆ మార్పు చేయకుండా
`schedule:` ట్రిగ్గర్ను జోడించవద్దు — అది విఫలమయ్యే రన్లను మాత్రమే ఉత్పత్తి చేస్తుంది.

**కౌంట్ తగ్గిన తర్వాత బేస్లైన్ను కఠినతరం చేయండి** —
`node scripts/check/check-codeql-ratchet.mjs --update` కొత్తగా కొలిచిన కౌంట్ను
`quality-baseline.json` → `metrics.codeqlAlerts.value`లో వ్రాస్తుంది, తద్వారా పాత గరిష్ఠ
పరిమితి వరకు తిరిగి రిగ్రెషన్ జరగడాన్ని రాచెట్ నిశ్శబ్దంగా అనుమతించదు. పూర్తి ఉదాహరణ
(2026-09-02/03): PR #12502 7 వాస్తవ అలర్ట్లను సరిచేసింది (కొలిచిన ఓపెన్ అలర్ట్లు
13 → 6); దానికి సరిపోలేలా PR #12530 స్థిరీకరించిన బేస్లైన్ను 11 → 6కు కఠినతరం చేసింది;
ఆపై మిగిలిన 6 అలర్ట్లను ఒక్కో అలర్ట్కు సమర్థనతో డిస్మిస్ చేసి, ఓపెన్ కౌంట్ను 0కు తగ్గించారు.

**డిస్మిసల్లు ఆపరేటర్ నిర్ణయం (కఠిన నియమం #14)** — డిస్మిసల్ కామెంట్లో సాంకేతిక
సమర్థనను నమోదు చేయకుండా CodeQL అలర్ట్ను ఎప్పుడూ డిస్మిస్ చేయవద్దు: అప్స్ట్రీమ్-ప్రోటోకాల్
అవసరానికి `won't fix`, టెస్ట్ ఫిక్చర్కు `used in tests`, CodeQL గుర్తించలేని శానిటైజర్కు
`false positive` (పూర్వ ఉదాహరణ: `docs/security/ERROR_SANITIZATION.md`).

---

## టెస్ట్ రీట్రై విధానం (WS5.4, v3.8.49)

రీట్రై అనేది ప్రతి రన్నర్కు ప్రత్యేకం, ఎప్పుడూ అన్నింటికీ వర్తించే గ్లోబల్ విధానం కాదు — అన్నింటికీ వర్తించే రీట్రై నిజమైన రిగ్రెషన్లను
కనిపించని ఫ్లేక్లుగా మార్చేస్తుంది:

| రన్నర్             | విధానం                                                                                                                                     | కారణం                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)   | CIలో మాత్రమే `retries: 1`, అలాగే `trace: on-first-retry`                                                                                   | బ్రౌజర్/నెట్వర్క్ టైమింగ్ నిజంగానే అనిర్ణీతంగా ఉంటుంది; ట్రేస్తో కూడిన ఒక రీట్రై ఫ్లేక్ను నిర్ధారించగల ఆర్టిఫాక్ట్గా మారుస్తుంది |
| Vitest             | గ్లోబల్ రీట్రై లేదు. ఫ్లేకీ అని నిరూపితమైన టెస్ట్కు స్పష్టమైన ప్రతి-టెస్ట్ రీట్రై లభిస్తుంది (డిఫ్లో కనిపిస్తుంది, PRలో సమీక్షించబడుతుంది) | క్వారంటైన్ జాబితాను రెపోలోనే, ఎప్పుడూ అస్పష్టంగా కాకుండా ఉంచుతుంది                                                               |
| node:test (యూనిట్) | ఎప్పటికీ రీట్రై లేదు                                                                                                                       | ఫ్లేకీ యూనిట్ టెస్ట్ అంటే టెస్ట్లోని బగ్ — దాన్ని సరిచేయండి, మళ్లీ అమలు చేసి ఫలితాన్ని మార్చేందుకు ప్రయత్నించవద్దు               |

ఫ్లేక్ టెలిమెట్రీ అందుబాటులోకి వచ్చిన తర్వాత లక్ష్య SLOలు (WS5.2/5.3): ప్రతి టెస్ట్కు <1% ఫ్లేక్ రేటు
("ఇప్పుడే సరిచేయాలి" థ్రెషోల్డ్), ప్రతి పైప్లైన్కు ≥95% పాస్ రేటు. పరిశ్రమ సూచన విలువలు —
మన స్వంత కొలతల ఆధారంగా మళ్లీ కాలిబ్రేట్ చేయాలి.

## రిలీజ్-స్థాయి రాచెట్ డ్రిఫ్ట్ (WS5.5, v3.8.49)

PURE రిలీజ్ టిప్పై రాచెట్ (ఫైల్ పరిమాణం, సంక్లిష్టత, eslint హెచ్చరికలు) రిగ్రెస్ అయినప్పుడు
— అంటే, మెర్జ్ల కలయిక దానిని రిగ్రెస్ చేసింది, కానీ ఏ ఒక్క PR తన స్వంత బ్రాంచ్పై ఆ
రిగ్రెషన్ను పునరుత్పత్తి చేయలేనప్పుడు — పరిష్కారం **రిలీజ్ కెప్టెన్దే; ఒక్కసారి, రిలీజ్
బ్రాంచ్పై**: ఎక్స్ట్రాక్షన్/రీఫ్యాక్టర్కు ప్రాధాన్యం ఇవ్వండి; డాక్యుమెంట్ చేసిన
సమర్థన ఎంట్రీతో మాత్రమే రీబేస్లైన్ చేయండి. కాంబినేషన్ డ్రిఫ్ట్ను కంట్రిబ్యూటర్ PRపై ఎప్పుడూ
మోపవద్దు, అలాగే ప్రతి PRకు రీబేస్లైన్ చేయవద్దు (అది నిజమైన రిగ్రెషన్లను దాచిపెడుతుంది). ముందుగా
తేడాను నిర్ధారించండి: మీ PR దానికి కారణమని భావించే ముందు ప్రోబ్ వర్క్ట్రీలో ప్యూర్ టిప్కు
వ్యతిరేకంగా రెడ్ను పునరుత్పత్తి చేయండి.

## రాచెట్ తగ్గింపులను బ్యాంక్ చేయడం — దిగువ దిశ (#8584)

రాచెట్ సగం మాత్రమే ఆటోమేటిక్గా ఉంది, అదీ తప్పు సగం. క్యాప్ను **పెంచడం** అనేది
పది సెకన్లు పట్టే మాన్యువల్ JSON ఎడిట్, అలాగే రెడ్ PRను అన్బ్లాక్ చేయడానికి అత్యంత వేగవంతమైన మార్గం.
క్యాప్ను **తగ్గించడానికి** ఎవరైనా `--update`ను అమలు చేసి ఫలితాన్ని కమిట్ చేయాలి — కానీ
`bank-ratchet-shrinks` జాబ్ అందుబాటులోకి వచ్చే వరకు ఏ వర్క్ఫ్లో కూడా దాన్ని అమలు చేయలేదు. కొలిచిన ఫలితం
(2026-07-25): ఇప్పటికే 800-లైన్ కొత్త-ఫైల్ క్యాప్ వద్ద లేదా దాని కంటే తక్కువగా ఉన్న 18 ఫ్రోజెన్ ఫైళ్లు, వాటిలో అత్యంత దారుణమైనది
132× వద్ద (`src/shared/validation/schemas.ts`, 2,523 క్యాప్ను కలిగి ఉన్న 19 లైన్లు);
~37 రీబేస్లైన్ నోట్లలో కేవలం ఒక తగ్గింపుతో (−1) సంక్లిష్టత సీలింగ్ `1794 → 2169`కు
పెరిగింది; అలాగే "`--update` ద్వారా తదుపరి సైకిల్లో బిగించాలి" అని 31 సార్లు వ్రాసి,
ఒక్కసారి మాత్రమే పాటించారు. దాన్ని సాధించడానికి కారణమైన కోడ్ కంటే ఎక్కువకాలం నిలిచే క్యాప్,
పూర్తయిన ప్రతి డీకంపోజిషన్ను ఆ ఫైల్ను తదుపరి ఎడిట్ చేసే వ్యక్తికి వృద్ధి అలవెన్స్గా నిశ్శబ్దంగా మారుస్తుంది.

`nightly-release-green.yml` → జాబ్ **`bank-ratchet-shrinks`** ఆ లూప్ను పూర్తి చేస్తుంది:

|                   |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| దీనిపై నడుస్తుంది | `schedule` (రోజుకు 3×) + `workflow_dispatch` — ఉద్దేశపూర్వకంగానే `push`పై **కాదు**                                  |
| కొలుస్తుంది       | అత్యధిక `release/vX.Y.Z`, `release-green`లో ఉన్న అదే రిజల్యూషన్ + ఇంజెక్షన్ గార్డ్తో                                |
| వ్రాస్తుంది       | `check:file-size --update` మరియు `check:complexity-ratchets --update` (రెండూ నిర్మాణపరంగానే తగ్గింపు-మాత్రమే)       |
| ధృవీకరిస్తుంది    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| పంపిస్తుంది       | రిలీజ్ బ్రాంచ్కు వ్యతిరేకంగా ఎల్లప్పుడూ ప్రస్తుతంగా ఉండే ఒక PR — ఫోర్స్-అప్డేట్ చేయబడుతుంది, ఎప్పుడూ స్పామ్ చేయబడదు |

బ్యాంకింగ్ను ప్రతి పుష్కు కాకుండా బ్యాచ్లుగా చేస్తారు, ఎందుకంటే దానికి లేటెన్సీ అవసరం లేదు (8 గంటల్లో
బ్యాంక్ చేసిన తగ్గింపు సరిపోతుంది), అయితే ప్రతి మెర్జ్కు ఒకసారి రన్ చేస్తే మెర్జ్ క్యాంపెయిన్ల సమయంలో
PR బ్రాంచ్ను పదేపదే రీబిల్డ్ చేయాల్సి వస్తుంది, అలాగే ప్రతిసారీ పూర్తి ESLint వాక్కు ఖర్చు చేయాల్సి వస్తుంది.
డిటెక్షన్ `push`పై (`release-green`) కొనసాగుతుంది; బ్యాంకింగ్ మాత్రమే బ్యాచ్ చేయబడుతుంది.

### భద్రతా వెరిఫైయర్

జాబ్ ఎటువంటి పర్యవేక్షణ లేకుండా బేస్లైన్లకు వ్రాస్తుంది, కాబట్టి దాన్ని ఆమోదయోగ్యంగా చేసేది
`verify-ratchet-bank.mjs`. ఇది `--update` తర్వాతి ట్రీని `HEAD`తో డిఫ్ చేసి, ప్రతి మార్పూ
కిందివాటిలో ఒకటి అయితే తప్ప — ఎటువంటి కమిట్ ఉనికిలోకి రాకముందే **జాబ్ను నిలిపివేస్తుంది**,
ఎలాంటి PRనూ తెరవదు:

- `frozen` / `testFrozen` సంఖ్యాత్మక ఎంట్రీని **తగ్గించడం** లేదా **తొలగించడం**
- `complexity-baseline.json` → `count`ను **తగ్గించడం**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value`ను **తగ్గించడం**

ఇతర ఏదైనా విఫలమవుతుంది: సంఖ్యను పెంచడం, ఎంట్రీని జోడించడం, `cap`/`testCap`ను మార్చడం, లేదా
`_rebaseline_*` నోట్ను తొలగించడం/తిరిగి వ్రాయడం (ప్రతి సీలింగ్ ఎందుకు ఉందో తెలిపే ఆడిట్ ట్రైల్ ఆ నోట్లే,
అవి ఫైల్ ఎంట్రీలు ఉన్న అదే `frozen` ఆబ్జెక్ట్లో నిల్వ చేయబడతాయి).
క్యాప్ను పెంచగల బాట్ ప్రస్తుత స్థితి కంటే ఖచ్చితంగా అధ్వాన్నంగా ఉంటుంది. రిగ్రెషన్
గార్డ్: `tests/unit/verify-ratchet-bank.test.ts`.

జాబ్ ఎప్పుడూ `release/*`కు పుష్ చేయదు — ఒక వ్యక్తి PRను మెర్జ్ చేస్తారు, కాబట్టి తప్పు కొలత
సమీక్షించకుండా చేరదు.

## అనుమతి జాబితా విధానం

ముందుగా ఉన్న ఉల్లంఘనలపై విఫలం కాలేని ప్రతి గేట్ ఒక స్థిరీకరించిన అనుమతి జాబితాను ఉపయోగిస్తుంది
(ఉదా., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). విధానం:

**మూల కారణాన్ని పరిష్కరించండి; ఉల్లంఘన ముందుగా ఉన్నదై, అదే PRలో
పరిష్కరించలేనప్పుడు మాత్రమే అనుమతి జాబితాను ఉపయోగించండి.**

అనుమతి జాబితాకు ఒక నమోదును జోడించేటప్పుడు:

1. సమర్థనతో కూడిన వ్యాఖ్యను చేర్చండి.
2. ట్రాకింగ్ సమస్యను సూచించండి (ఉదా., `// #3498 — దశ 2 ఫీచర్, ఇంకా అమలు చేయలేదు`).
3. ఉల్లంఘనను పరిష్కరించే అదే PRలో నమోదును తొలగించండి — ఇకపై క్రియాశీల ఉల్లంఘనను
   అణచివేయని పాత నమోదు కూడా ఒక లోపమే (అమలు చేసిన తర్వాత 6A.3 పాత-అమలు తనిఖీ
   అనాథ అనుమతి జాబితా నమోదుపై గేట్ను విఫలం చేస్తుంది).

పరీక్షలు వేగంగా ఉత్తీర్ణం కావడానికి అనుమతి జాబితా నమోదులను జోడించవద్దు. పెరుగుతున్న
అనుమతి జాబితాతో కూడిన గ్రీన్ గేట్ నాణ్యతపై తప్పుడు భరోసాను కలిగిస్తుంది.

### మీ PRపై గేట్ విఫలమైనప్పుడు

1. **గేట్ అవుట్పుట్ను జాగ్రత్తగా చదవండి** — ఏ ఫైల్ లేదా సింబల్ నియమాన్ని
   ఉల్లంఘించిందో అది ఖచ్చితంగా తెలియజేస్తుంది.
2. **ఉల్లంఘనను పరిష్కరించండి** — చాలా గేట్లు నిర్దిష్టమైన ఫైల్సిస్టమ్ తనిఖీలు; కోడ్
   సరిగ్గా ఉన్న వెంటనే అవి ఉత్తీర్ణమవుతాయి.
3. **ఉల్లంఘన ముందుగా ఉన్నదైతే** (అంటే, మీరు దాన్ని ప్రవేశపెట్టలేదు కానీ ఇప్పుడు గేట్
   దాన్ని కవర్ చేస్తోంది): సమర్థన వ్యాఖ్య మరియు ట్రాకింగ్ సమస్యతో అనుమతి జాబితా నమోదును జోడించండి.
4. **గేట్ రాచెట్ అయితే** (కవరేజ్, ESLint హెచ్చరికలు, నకిలీకరణ, సంక్లిష్టత):
   మీ మార్పు మెట్రిక్ను దిగజార్చింది. అంతర్లీన సమస్యను పరిష్కరించండి లేదా (అరుదుగా) మార్పు
   ఉద్దేశపూర్వకమైనది మరియు మెట్రిక్ క్షీణత ఆమోదయోగ్యమైనదైతే
   `npm run quality:ratchet -- --update` అమలు చేయండి — అయితే PR వివరణలో కారణాన్ని నమోదు చేయండి.
5. **సలహాత్మక గేట్లు** (`continue-on-error: true`) సమాచార ప్రయోజనం కోసం మాత్రమే — అవి
   విలీనాన్ని నిరోధించవు కానీ CI సారాంశంలో కనిపిస్తాయి. అయినప్పటికీ వాటిని పరిష్కరించండి.

---

## కొత్త గేట్ను జోడించడం

1. `scripts/check/check-<name>.mjs` (లేదా `.ts`) సృష్టించండి. విధాన గేట్లు 0/1తో నిష్క్రమిస్తాయి.
   రాచెట్-శైలి గేట్లు `collect-metrics.mjs` ద్వారా `quality-metrics.json`కు ఒక మెట్రిక్ను విడుదల చేస్తాయి.
2. `package.json`కు `"check:<name>": "node scripts/check/check-<name>.mjs"` జోడించండి.
3. తగిన జాబ్ కింద `.github/workflows/ci.yml`లో దాన్ని అనుసంధానించండి
   (విధానం → `lint` లేదా `docs-sync-strict`; రాచెట్ → `quality-gate`).
4. దానికి అనుమతి జాబితా ఉంటే, పాత నమోదులు స్వయంచాలకంగా గుర్తించబడేలా
   `scripts/check/lib/allowlist.mjs` నుండి `reportStaleEntries()`ను వర్తింపజేయండి.
5. గేట్ గుర్తింపు లాజిక్ను కవర్ చేసే పరీక్షను `tests/unit/build/`లో రాయండి.
6. ఈ పత్రాన్ని నవీకరించండి (సంబంధిత జాబ్ పట్టికకు ఒక వరుసను జోడించండి).

---

## ఏజెంట్ సాధనాలు: LSP-in-the-loop (ఎంపిక ఆధారితం)

CI గేట్లకు అదనంగా, OmniRoute ఒక **ఎంపిక ఆధారిత** `agent-lsp` స్కాఫోల్డ్ను
(ప్రాజెక్ట్-స్థాయి `.mcp.json`, దశ 7 టాస్క్ 15) అందిస్తుంది. కోడింగ్ ఏజెంట్లకు
TypeScript లాంగ్వేజ్ సర్వర్ను అందుబాటులో ఉంచడానికి `.mcp.json`ను సృష్టించండి, తద్వారా అవి కోడ్
రాయడానికి **ముందే** సింబల్లు / డయాగ్నస్టిక్లను పరిష్కరిస్తాయి — ఇది `typecheck:core`కు
కంపైల్-బిఫోర్-క్లెయిమ్ సహచరంగా ఉండి, "కల్పిత సింబల్" దోషాలను వాటి మూలంలోనే తగ్గిస్తుంది. ఇది
ఉద్దేశపూర్వకంగా స్వయంచాలకంగా లోడ్ చేయబడదు (మీరు MCP↔LSP బ్రిడ్జ్ను ఎంచుకుని ధృవీకరిస్తారు);
లోపభూయిష్టమైన నమోదు కేవలం కనెక్షన్ దోషాన్ని లాగ్ చేస్తుంది, సెషన్లను ఎప్పటికీ భంగం చేయదు.

---

## హేతుబద్ధీకరణ బ్యాక్లాగ్ (ROI సమీక్ష — దశ 9 తరంగం 3)

ఈ ఇన్వెంటరీని 2026-06-17న `ci.yml`తో సరిపోల్చి సరిచేశారు (మునుపటి సంస్కరణలో
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` విస్మరించబడ్డాయి). సరిపోల్చిన సమితిపై నిర్వహించిన ROI సమీక్ష
కింది హేతుబద్ధీకరణ అభ్యర్థులను గుర్తించింది. **విలీనాలు యాంత్రిక CI
మార్పులు; మార్చడం/తొలగించడం అనేవి ఆపరేటర్కు కేటాయించిన విధానపరమైన నిర్ణయాలు.** దిగువన ఉన్నవేవీ
ఇంకా వర్తింపజేయబడలేదు.

**పైన డాక్యుమెంట్ చేయనివి కూడా ఉన్నాయి** (సలహాపూర్వకమైనవి, తక్కువ సంకేతం): `docs-lint` జాబ్
(markdownlint + Vale, మొత్తం జాబ్కు `continue-on-error`) మరియు స్వతంత్ర స్కానర్ వర్క్ఫ్లోలు
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `quality-baseline.json`లో
`semgrepFindings: 0` ఉంది, కానీ `ci.yml`లోని బ్లాకింగ్ రాచెట్కు అది అనుసంధానించబడలేదు — ప్రస్తుతం ఈ మెట్రిక్కు
ఏ అనుసంధానమూ లేదు.

### విలీనం / నకిలీల తొలగింపు (యాంత్రికం, తక్కువ ప్రమాదం)

ప్రతి అభ్యర్థినీ 2026-06-17న ప్రత్యక్ష గేట్ స్థితితో పోల్చి ధ్రువీకరించారు (నమ్మండి-కానీ-ధ్రువీకరించండి);
"స్పష్టమైనవి" అనిపించిన అనేక విలీనాలు వాస్తవానికి సాంకేతిక రుణాన్ని దాచిపెట్టాయని తేలింది, కాబట్టి అవి **శుభ్రమైన** ప్రత్యామ్నాయాలు కావు.

- **`check:docs-sync` రెండుసార్లు నడుస్తుంది** — `lint` జాబ్లో స్వతంత్రంగా, అలాగే `check:docs-all` (`docs-sync-strict`)లో మరియు husky pre-commit హుక్లో మరోసారి. ✅ **పూర్తయింది** — స్వతంత్ర `lint` అమలు తొలగించబడింది.
- **CVE స్కానింగ్** — ❌ **శుభ్రమైన విలీనం కాదు.** ఏదైనా అధిక/క్రిటికల్ CVE ఉంటే `audit:deps` పూర్తిగా విఫలమవుతుంది; `check:vuln-ratchet` (osv) మాత్రం బేస్లైన్తో పోలిస్తే _తిరోగమనం_ ఉన్నప్పుడు మాత్రమే విఫలమవుతుంది (ప్రస్తుతం 1 MODERATE). అర్థాలు వేర్వేరు — `audit:deps`ను తొలగిస్తే సంపూర్ణ అధిక/క్రిటికల్ గేట్ కోల్పోతాం. రెండింటినీ ఉంచండి.
- **సైకిల్ గుర్తింపు** — ✅ **పూర్తయింది** (#15159 G-01/G-02). ఇక్కడి పాత పాఠ్యం `check:cycles`ను "గ్రీన్, జాగ్రత్తగా ఎంపిక చేసిన" గేట్గా పేర్కొని, `check:circular-deps` (dpdm) 91 సైకిళ్లను నివేదించినందున దానిని బ్లాకింగ్గా ఉంచడాన్ని సమర్థించింది. ఆ గ్రీన్ ఒక **తప్పుడు గ్రీన్**: `check:cycles` 5 ఉపడైరెక్టరీలను (450 ఫైళ్లు) స్కాన్ చేసింది, స్థిర `import|export … from`తో మాత్రమే సరిపోల్చింది, అలాగే ప్రతి `@/` మరియు `@omniroute/open-sse/` స్పెసిఫైయర్ను వదిలేసింది; అందువల్ల రిపోలో అధికంగా ఉన్న డైనమిక్-import + అలియాస్ సైకిళ్లను అది చూడలేకపోయింది. పరిష్కరించబడింది: ఇప్పుడు గేట్ `src` + `open-sse`లో సంచరిస్తుంది (5023 ఫైళ్లు), TypeScript AST నుంచి స్పెసిఫైయర్లను సేకరిస్తుంది (కాబట్టి `import("…")` లెక్కించబడుతుంది, కానీ టైప్-స్థానంలోని `typeof import("…")` లెక్కించబడదు), అలాగే tsconfig `paths`ను పరిష్కరిస్తుంది. ఇది 0 కాకుండా **14** సైకిళ్లను కనుగొంటుంది. ముందే ఉన్న 14 సైకిళ్లను గేట్ PRలో పరిష్కరించడం సాధ్యం కానందున, `check:cycles` ఇప్పుడు ఒక **రాచెట్** (`--ratchet`, `quality-baseline.json`లో పరిమితి `metrics.cycles.value = 14`, `direction: down`) — ఇది ఏదైనా _తిరోగమనాన్ని_ బ్లాక్ చేస్తుంది, కౌంట్ తగ్గడం మాత్రమే సాధ్యమవుతుంది. CI `npm run check:cycles:ratchet`ను నడుపుతుంది. తగ్గింపు ప్రక్రియ **A-01**తో కలిసి కొనసాగుతుంది. విస్తృతమైన రెండో అభిప్రాయంగా `check:circular-deps` (dpdm) సలహాపూర్వకంగానే ఉంటుంది.
- **సంక్లిష్టత** — ✅ **పూర్తయింది** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ఒక ESLint వాక్, ruleId ఆధారంగా లెక్కిస్తుంది కాబట్టి cyclomatic+max-lines మరియు cognitive బేస్లైన్లు స్వతంత్రంగా ఉంటాయి; స్థానిక `--update` కోసం విడివిడిగా ఉన్న `check:complexity` / `check:cognitive-complexity` అలాగే ఉంటాయి.
- **`/api` యాంటీ-హాల్యూసినేషన్** — ✅ **పూర్తయింది** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`కు ఒకే FS ఇన్వెంటరీ, openapi-routes + docs-symbols ఇప్పటికీ విడివిడిగా నివేదిస్తాయి; స్థానిక అమలుల కోసం విడివిడిగా ఉన్నవి అలాగే ఉంటాయి.
- **`check:node-runtime` 11 జాబ్లలో నడుస్తుంది** — ⚠️ **తక్కువ ROI.** ప్రతి ఒక్కటీ ప్రత్యేక రన్నర్, అలాగే చెక్ <1s; చౌకైన ప్రతి-జాబ్ రక్షణను కోల్పోవడంతో పోలిస్తే మొత్తం ఆదా ~10s మాత్రమే. ఈ మార్పుల కలకలం విలువైనది కాదు.
- **CI lintలో `typecheck:noimplicit:core`** — ✅ **lint జాబ్ నుంచి తొలగించబడింది** (ఇది సలహాపూర్వక `continue-on-error`గా ఉండేది); బ్లాకింగ్ టైప్ సర్ఫేస్ `typecheck:core` + `check:type-coverage`. స్థానిక స్క్రిప్ట్ అలాగే ఉంచబడింది.

### మార్చడం / నిర్ణయించడం (ఆపరేటర్ విధానం)

- `check:openapi-security-tiers` (సలహాపూర్వకం) — ❌ **శుభ్రంగా మార్చడం సాధ్యం కాదు.** ఇది 0తో నిష్క్రమిస్తుంది, కానీ `LOCAL_ONLY_API_PREFIXES` కింద ఉన్న అనేక `traffic-inspector` రూట్లలో `x-loopback-only: true` అనోటేషన్ లేదని హెచ్చరిస్తుంది. దీన్ని అమలు చేయాలంటే ముందుగా ఆ అనోటేషన్లను `openapi.yaml`కు జోడించాలి.
- `typecheck:noimplicit:core` (సలహాపూర్వకం) — బ్లాకింగ్ `check:type-coverage` రాచెట్లో ఇది ఎక్కువగా అంతర్భాగమైంది. దీన్ని రాచెట్గా మార్చండి లేదా అనవసరంగా పునరావృతమయ్యే రెండో `tsc` పాస్ను తొలగించండి.
- `test:vitest:ui` (ఇప్పుడు **బ్లాకింగ్**) — ముందే ఉన్న వైఫల్యాలు `vitest.config.ts`లో `// #8618` ట్రాకింగ్ వ్యాఖ్యలతో స్పష్టంగా మినహాయించబడ్డాయి; కొత్త వైఫల్యాలు జాబ్ను విఫలం చేస్తాయి.
- `check:secrets` (gitleaks, డాక్యుమెంట్ చేసిన 3 తప్పుడు-పాజిటివ్ల వద్ద స్థిరపరచిన బ్లాకింగ్ రాచెట్) — 0కు చేరుకోవడానికి ఆ 3ను అనుమతి జాబితాలో చేర్చండి లేదా సలహాపూర్వక స్థాయికి తగ్గించండి. ఇది GitHub స్థానిక secret-scanning + `check:public-creds`తో అతివ్యాప్తి చెందుతుంది.
- `check:pr-evidence` (బ్లాకింగ్, PR-body గద్యాన్ని greps చేస్తుంది) — తప్పుడు-పాజిటివ్ ప్రమాదం అధికం; దీన్ని తొలగిస్తే Hard Rule #18 అమలు బలహీనపడుతుంది, కాబట్టి ఇది నిజమైన విధానపరమైన నిర్ణయం.
- `semgrep` (సలహాపూర్వక స్వతంత్ర అమలు) — OWASP వర్గాల విషయంలో CodeQLతో అతివ్యాప్తి చెందుతుంది; దాని బేస్లైన్ను రాచెట్కు అనుసంధానించండి లేదా తొలగించండి.

---

## సంబంధిత డాక్యుమెంటేషన్

- సరఫరా-గొలుసు (ప్రోవెనెన్స్, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — కీ-సెట్ సమానత్వ గేట్

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, జాబ్ `i18n-ui-coverage`).
ప్రతి `src/i18n/messages/<locale>.json` యొక్క లీఫ్ కీ సెట్ను `en.json`తో పోల్చి, కీ ఎప్పుడు జోడించబడిందనే దానితో సంబంధం లేకుండా, ఏదైనా లీఫ్ లేకపోయినా లేదా అదనంగా ఉన్నా విఫలమవుతుంది. `__MISSING__:` ప్లేస్హోల్డర్లు
ఉన్నట్లుగానే పరిగణించబడతాయి (వాటి కంటెంట్ను పరిశీలించడం రేషియో గేట్ బాధ్యత). ఇది రెండు
డిఫ్-ఆధారిత/శాతం గేట్లకు సంపూర్ణ పూరకం: `check-ui-keys-coverage` ప్రతి
లొకేల్కు 80 % కనిష్ఠ పరిమితిని అమలు చేస్తుంది (~13,000లో 43 కీలు లేకపోయినా ఇప్పటికీ 99.7 %గా చూపుతుంది), అలాగే `check-new-key-coverage`
ఒక PR `en.json`కు జోడించే కీలను మాత్రమే అంచనా వేస్తుంది. లొకేల్ బ్యాచ్ దాని బ్రాంచ్ సృష్టించబడిన
రోజున ఉన్న `en.json` నుంచి రూపొందించబడుతుంది మరియు బేస్లో కీలు జోడించబడుతూనే ఉండగా అనేక రోజుల పాటు అనువదిస్తుంది; బ్యాచ్ PR స్వయంగా ఏ
కీని జోడించదు, కాబట్టి బ్యాచ్ 1 (#13044) తొమ్మిది
లొకేల్స్లో 43 కీలు తక్కువగా, బ్యాచ్ 2 (#13660) ఎనిమిది లొకేల్స్లో 10 కీలు తక్కువగా విలీనమైనప్పుడు కూడా రెండు సహోదర గేట్లు మౌనంగానే ఉన్నాయి (2026-09-15). ఎర్ర వైఫల్యాన్ని
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`తో పరిష్కరించండి; ఒక `extra` లీఫ్
అంటే సోర్స్ దానిని తొలగించిందని అర్థం — లొకేల్ నుంచి దానిని తొలగించండి. `--warn` విఫలం చేయకుండా నివేదిస్తుంది.
`--catalog=cli` అదే పోలికను `bin/cli/locales`పై అమలు చేస్తుంది (`npm run i18n:check-keys:cli`);
రెండు దశలూ `i18n-ui-coverage` జాబ్లో ఉంటాయి.

#### `check-new-key-coverage` — కొత్త-కీ i18n గేట్

`check-ui-value-drift`కు సహోదర గేట్. అనువాదాలు అలాగే మిగిలిపోయి, ఇంగ్లీష్ విలువ **తిరిగి వ్రాయబడినప్పుడు**
అది గుర్తిస్తుంది; కొన్ని లొకేల్స్కు ఎప్పటికీ అందని ఇంగ్లీష్ కీ **జోడించబడినప్పుడు**
ఇది గుర్తిస్తుంది.

`check-ui-keys-coverage` ఈ వర్గాన్ని గుర్తించలేదు: అది ప్రతి లొకేల్కు శాతం కనిష్ఠ పరిమితిని అమలు చేస్తుంది, అలాగే
~13,000 లీఫ్లలో పదకొండు కీలు లేకపోయినా కవరేజ్ 99.9%గానే ఉంటుంది. ఒక్కో భాషకు ఒక శాతం
"ఈ ఫీచర్ అనువాదం లేకుండా విడుదలైంది" అని వ్యక్తీకరించలేదు — ఒక పూర్తి ఫీచర్ ఎలాంటి
టెక్స్ట్ లేకుండానే కొత్త లొకేల్లో చేరినా ఆ సంఖ్య ఏమాత్రం మారదు.

ఇది సంకేతీకరించిన సంఘటన: Orchestration Canvas యొక్క Phase 3, ఆ సమయంలో ఉన్న 42 లొకేల్స్లో
దాని పదకొండు కీలను అనువదించింది. కొన్ని గంటల తర్వాత EU-భాషల బ్యాచ్ (#13044) రిపోను
51 లొకేల్స్కు తీసుకెళ్లింది, కానీ కొత్తగా వచ్చిన తొమ్మిది లొకేల్స్కు (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) అవి ఎప్పటికీ
అందలేదు. లేని కీకి బదులుగా `deepMergeFallback` ఇంగ్లీష్ను ఉపయోగిస్తుంది, కాబట్టి వైఫల్య స్థితిలో
ఖాళీ UIకి బదులుగా అనువదించని UI కనిపించింది — ఇది వాస్తవమైనదే, అలాగే రూపకల్పన వల్ల మౌనంగా ఉండిపోయింది.

దాని సహోదర గేట్లాగే ఇది కూడా **డిఫ్-అవేర్**, మెర్జ్ బేస్ వద్ద ఉన్న ఇంగ్లీష్ను వర్కింగ్
ట్రీతో పోలుస్తుంది, కాబట్టి ఇప్పటికే ఉన్న లోపాలు అలాగే స్థిరంగా ఉంటాయి మరియు గేట్ను ప్రారంభించడానికి ఎలాంటి మైగ్రేషన్ అవసరం లేదు.

**ఒక `__MISSING__:<english>` మార్కర్ దీనిని సంతృప్తిపరచదు (2026-09-17 నుంచి).** రన్టైమ్ సరైన ఇంగ్లీష్కు ఫాల్బ్యాక్ అవుతుంది కాబట్టి, గతంలో ఇది
డాక్యుమెంట్ చేసిన వాయిదా విధానంగా ఉండేది — 2026-09-16న ఎనిమిది ఫీచర్ PRలు
61 కీలను జోడించి, అనువదించడానికి బదులుగా మొత్తం 65 లొకేల్స్లో మార్కర్ను ముద్రించే వరకు: ఈ
గేట్ వాటన్నింటినీ అంగీకరించింది, PRలను ఏదీ నిరోధించలేదు, ఆపై నిరోధక నిజమైన-అనువాద రేషియో గేట్
రిలీజ్ టిప్ వద్ద అందరికీ విఫలమైంది (pt-BR 3.2 % > 2.5 % + 0.5). ఇప్పుడు మార్కర్ను
లేని అనువాదంగానే పరిగణిస్తారు. ఎర్ర వైఫల్యాన్ని
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`తో, లేదా
`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
డిటాచ్డ్-సేఫ్, `OMNIROUTE_TRANSLATION_*` env లేకుండా ప్రారంభించడానికి నిరాకరిస్తుంది) ద్వారా అన్ని లొకేల్స్ను సమాంతరంగా ప్రాసెస్ చేసి పరిష్కరించండి. ఇంగ్లీష్లోనే ఉండాల్సిన కీ
(పిన్ చేసిన ప్రోడక్ట్/ఇంజిన్/ఫ్లాగ్ పేరు) `scripts/i18n/untranslatable-keys.json`లో ఉండాలి,
మార్కర్ వెనుక ఎప్పుడూ ఉండకూడదు. `vi` మార్కర్లను పూర్తిగా నిషేధిస్తుంది (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — నిలిపి ఉంచిన-టెస్ట్ గేట్

`vitest.config.ts` యొక్క `exclude` జాబితాలోని ఫైల్ అనేది అమలు కాని టెస్ట్, కానీ ట్రీని చదివే వారికి అది
కవరేజ్లా కనిపిస్తుంది. అరవై రెండు ఫైళ్లు
`// #8618 — pre-existing failure; remove this exclusion when fixed` అనే కామెంట్ వెనుక పేరుకుపోయాయి. Issue #8618
2026-08-11న మూసివేయబడింది, కానీ అది ట్రాక్ చేసిన జాబితా 45 ఎంట్రీల నుంచి 62కు పెరిగింది; ప్రతి కొత్త ఎంట్రీ
ముగిసిపోయిన ఇష్యూను సూచించే కామెంట్ను వారసత్వంగా పొందింది. చివరకు జాబితాలోని ప్రతి ఫైల్ను విడివిడిగా కొలిచినప్పుడు (#13204), **62లో 51
ప్రస్తుత ట్రీపై ఎలాంటి సోర్స్ మార్పు లేకుండానే పాస్ అయ్యాయి**.

నిజమైన ఫైల్కు పరిష్కారమయ్యే ప్రతి ఎక్స్క్లూజన్ (a) ఒక ట్రాకింగ్ ఇష్యూను పేర్కొనాలని మరియు
(b) కొలిచిన స్థితితో `config/quality/vitest-exclusions.json`లో కనిపించాలని గేట్ నిర్దేశిస్తుంది, తద్వారా ఒకదాన్ని జోడించడం
60-ఎంట్రీల అరేలో మరో లైన్గా కాకుండా ప్రత్యేక ఫైల్లో సమీక్షించదగిన డిఫ్ అవుతుంది. ఇది ఉద్దేశపూర్వకంగా
ఎక్స్క్లూడ్ చేసిన టెస్ట్లను మళ్లీ అమలు చేయదు — దానికి ~10 నిమిషాలు పడతాయి మరియు అది పీరియాడిక్ జాబ్లో ఉండాలి; ప్రతి టెస్ట్ చివరిసారి ఎప్పుడు కొలవబడిందో
ఇన్వెంటరీ నమోదు చేస్తుంది.
