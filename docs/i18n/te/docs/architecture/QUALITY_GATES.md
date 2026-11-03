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

## Gate జాబితా మరియు అమలు ప్రొఫైళ్లు

### అభ్యర్థి చేర్పు

CI మరియు Quality Gates వర్క్ఫ్లోలు ఒక్కొక్కటి స్థిరమైన తీర్పును అందిస్తాయి: `Gate / CI` మరియు
`Gate / Quality`. వాటి వెర్షన్ చేసిన చేర్పు విధానం ప్రతి అప్స్ట్రీమ్ జాబ్ను తప్పనిసరి లేదా
సలహాత్మకంగా పేర్కొంటుంది. వర్తించే తప్పనిసరి జాబ్ విజయవంతం కావాలి: లేని, రద్దైన,
దాటవేయబడిన, పెండింగ్లో ఉన్న మరియు తెలియని ఫలితాలు PASSను స్థాపించలేవు. చెల్లుబాటు అయ్యే
docs-only లేదా catalog-only వర్గీకరణ కోడ్ లేన్ను వర్తించనిదిగా చేయవచ్చు;
డ్రాఫ్ట్ PR ఆమోదించబడిన అభ్యర్థి కాదు. `hotfix` లేబుల్ ఆధారాలను మినహాయించదు.

రెండు వర్క్ఫ్లోలు main/release బ్రాంచ్లలోకి PRలు, `main`కి pushes, manual dispatch
మరియు merge-group ఈవెంట్లను కవర్ చేస్తాయి. Push, dispatch మరియు merge-group పూర్తి
ఎంపికను అమలు చేస్తాయి. `release/**`కి pushes వీటిని ప్రారంభించవు (2026-10-18): ప్రతి
మార్పు ఇప్పటికే దాని PRలో మ్యాట్రిక్స్ను అమలు చేసింది, అలాగే merge అయిన కలయిక
Release-Green పని (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkలు మరియు merge groups
సాధారణంగా self-hosted రన్నర్లను ఎంచుకునే జాబ్ల కోసం hosted రన్నర్లను ఉపయోగిస్తాయి;
రోలౌట్కు ముందు తగిన hosted సామర్థ్యం ధృవీకరించాలి.

ప్రతి JSON రసీదు checkout చేసిన SHA, వర్క్ఫ్లో రన్ మరియు ప్రయత్నాన్ని గుర్తిస్తుంది.
CLI checkout/event SHA అసమ్మతిని తిరస్కరిస్తుంది. కొత్త లేదా తొలగించిన లేన్ నిశ్శబ్దంగా
కనుమరుగవకుండా ఉండేందుకు, వర్క్ఫ్లో పరీక్షలు policy సభ్యత్వాన్ని verdict జాబ్ యొక్క
`needs` జాబితాకు అనుసంధానిస్తాయి. రసీదులు వాటి స్వంత వర్క్ఫ్లోను కవర్ చేస్తాయి,
ప్రచురణ, డిప్లాయ్మెంట్ లేదా ఇప్పటికే ఉన్న సలహాత్మక స్కానర్ అంతర్గతాలను కాదు. రెండు
చెక్ పేర్లను బ్రాంచ్ నియమాల్లో సక్రియం చేయడం ప్రత్యేక పరిపాలనా మార్పు; ఈ జాబ్లను
జోడించడం మాత్రమే బ్రాంచ్ను రక్షించదు.

### స్థిర స్కాన్ జాబితా

వెర్షన్ చేసిన npm-alias జాబితా మరియు స్థిర-స్కాన్ సభ్యత్వం
`config/quality/gate-manifest.json`లో ఉంటాయి. `package.json`కు వ్యతిరేకంగా
స్క్రిప్ట్ పేర్లు మరియు ఖచ్చితమైన కమాండ్లను ధృవీకరించడానికి
`npm run check:gate-manifest`ను అమలు చేయండి; చేర్పులు, తొలగింపులు మరియు
కమాండ్లో మార్పులు స్థానిక హుక్ మరియు CIలోని మార్పు-వర్గీకరణ జాబ్లు రెండింటినీ
విఫలమయ్యేలా చేస్తాయి. Alias అనేది వర్క్ఫ్లో జాబ్, మ్యాట్రిక్స్ ఇన్స్టాన్స్ లేదా
టెస్ట్ కేసు కాదు: ఈ గణనలను పరస్పరం మార్పిడి చేయగలవిగా చూపకూడదు.

ఎంపిక చేసిన aliasలను అమలు చేయకుండా పరిశీలించడానికి
`npm run quality:scan -- --list` లేదా `npm run quality:scan:fast -- --list`
ఉపయోగించండి. రన్నర్ npm ఎంట్రీపాయింట్ను ప్రారంభిస్తుంది, కాబట్టి దాని runtime
(కాన్ఫిగర్ చేసిన చోట Bunతో సహా) సంరక్షించబడుతుంది. ఈ ప్రొఫైల్లకు వెలుపల ఉన్న
aliasలను వేరుగా ప్రారంభించాల్సినవిగా manifest నమోదు చేస్తుంది, అలాగే
maintenance కమాండ్లు read-only scan ప్రొఫైల్లలో నిషేధించబడ్డాయి.

ఈ ప్రొఫైల్లు స్థిర స్కాన్ను మాత్రమే కవర్ చేస్తాయి. అవి ప్రొడక్ట్ టెస్ట్లు,
కవరేజ్, ప్యాకేజింగ్, బాహ్య తనిఖీలు లేదా అభ్యర్థి యొక్క పూర్తి release acceptanceను
ధృవీకరించవు. వర్క్ఫ్లో చేర్పు అనుసంధానించబడిన
`config/quality/admission-policy.json` మరియు `scripts/quality/admission-verdict.mjs`ను
ఉపయోగిస్తుంది. Release-observer ప్రొఫైల్లు వేరుగా ఉంటాయి; వాటి వర్తించే తనిఖీలు
మరియు రసీదులను స్వతంత్రంగా పరిశీలించండి. దిగువ గద్య జాబితా ఒక సూచన మాత్రమే,
ఒక gate వాస్తవంగా అమలైందనే రుజువు కాదు.

స్క్రిప్ట్లు policy gates కోసం `scripts/check/` కింద, ratchet engine కోసం
`scripts/quality/` కింద ఉంటాయి. CIకి ప్రామాణిక మూలం `.github/workflows/ci.yml`.

### Release PR వేగవంతమైన మార్గం (`quality.yml`)

`.github/workflows/quality.yml` main/release PRలు, `main`కి pushes,
dispatch మరియు merge groupsపై CIకి తోడ్పడుతుంది. PRలు path-filtered fast checksను
ఉపయోగిస్తాయి. శాశ్వతంగా నిలిపివేయబడిన duplicate build తొలగించబడింది; నిజమైన
build/package/boot తనిఖీలు CIలోనే ఉన్నాయి.

| జాబ్                                             | పరిధి                                                                                                                                                                                                      | నిరోధకత            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRలు; API docs refs మరియు docs-all                                                                                                                                                               | అవును              |
| `Fast Quality Gates`                             | Code PRలు; స్థిర తనిఖీలు, typecheck, dashboard typecheck, ప్రభావిత unit tests                                                                                                                              | అవును              |
| `Forgotten sibling tests`                        | Code PRలు; స్థిర వినియోగదారులకు అనుసంధానించిన మారిన మాడ్యూల్లు మరియు అభ్యర్థి sibling tests; barrel మరియు dynamic-import మార్గాలు సలహాత్మక నిర్ధారణలుగా నివేదించబడతాయి, సూచించబడిన allowlist మినహాయింపులతో | **సలహాత్మక**       |
| `Vitest (fast-path)`                             | Code PRలు; వేగవంతమైన vitest suite                                                                                                                                                                          | అవును              |
| `Unit Tests fast-path`                           | Code PRలు; 4-shard unit suite                                                                                                                                                                              | అవును              |
| `No new ESLint warnings`                         | Code PRలు; suppressions-aware lint guard                                                                                                                                                                   | అవును, forksతో సహా |
| `Merge integrity (changelog + generated skills)` | Draft కాని PRలు; changelog మరియు generated skill sync                                                                                                                                                      | అవును, forksతో సహా |

#### Forgotten sibling tests నివేదిక

`npm run check:forgotten-sibling-tests` test-impact map వెనుక ఉన్న import resolverను మళ్లీ ఉపయోగిస్తుంది.
మార్చబడిన ప్రతి production module కోసం, candidate
test pull-request diffలో లేనప్పుడు, ఇది deterministic
`changed module/symbol -> static consumer -> candidate sibling test` చైన్లను నివేదిస్తుంది. Markdown సారాంశం మరియు JSON ఫలితం
ఏదైనా blocking rolloutకు ముందు calibration కోసం
`forgotten-sibling-tests` workflow artifactగా నిల్వ చేయబడతాయి.

Barrel re-exports మరియు dynamic imports resolution diagnosticsకు మాత్రమే; అవి ఎప్పుడూ
blocking findingను సృష్టించవు. సమీక్షించబడిన మినహాయింపులు
`config/quality/forgotten-sibling-allowlist.json`లో ఉంటాయి. ప్రతి ఎంట్రీలో consumer మరియు candidate
test పేర్లు, నిర్దిష్ట కారణం, అలాగే GitHub issue లేదా pull requestకు
లింక్ ఉండాలి. తప్పుగా రూపొందిన ఎంట్రీలు fail closed అవుతాయి. మినహాయింపులు తొలగించబడిన candidate testను లేదా `.skip`/`.todo`ను జోడించే diffను
అణచివేయలేవు; assertion weakening మరియు ఇతర masking స్వతంత్రంగా blocking అయ్యే
`check:test-masking` gate బాధ్యతలోనే ఉంటాయి.

### పని: `lint`

ప్రతి PR `main`కి వచ్చినప్పుడు అమలవుతుంది. విఫలమైతే mergeను నిరోధిస్తుంది.

| స్క్రిప్ట్ (`npm run ...`)        | ధృవీకరించేది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | నిరోధకం                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js సంస్కరణ మద్దతు ఉన్న పరిధిలో ఉందా                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | అవును                                     |
| `check:cycles`                    | మొత్తం `src/` + `open-sse/` అంతటా వృత్తాకార దిగుమతులు (AST-ఆధారితం, tsconfig `paths` పరిష్కరించబడతాయి). ఏదైనా cycle ఉన్నప్పుడు Bare ఎల్లప్పుడూ 1తో నిష్క్రమిస్తుంది ( #15281 నుండి fail-closed) మరియు SCCలను జాబితా చేస్తుంది. `check:cycles:ratchet` (CI అమలు చేసేది) `quality-baseline.json`లోని `metrics.cycles` పరిమితిని మించినప్పుడు నిరోధిస్తుంది — ప్రస్తుతం 14, `direction: down`, కాబట్టి ఇది తగ్గడం మాత్రమే సాధ్యం (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                    | అవును (ratchet)                           |
| `check:boundary`                  | `open-sse → src` coupling: engine నుండి appలోకి జరిగే ప్రత్యేక file-to-file దిగుమతులు (`scripts/quality/measure-boundary.mjs`; edge జాబితా v4 core/module-split remediation backlog). Bare = advisory report (`quality:boundary` వలెనే). `check:boundary:ratchet` (CI అమలు చేసేది, `quality.yml` fast-gates ratchet loopలో కూడా ఉంటుంది) `quality-baseline.json`లోని `metrics.boundaryOpenSseToSrc` పరిమితిని మించినప్పుడు నిరోధిస్తుంది — కొలిచిన 771 వద్ద ప్రారంభించబడింది, `direction: down`; `--update` దాన్ని తగ్గించడం మాత్రమే చేస్తుంది; PRలపై base-relative (`--base-ref`, దిగువ చూడండి)                                                                                                                                                                                                                                                                    | అవును (ratchet)                           |
| `check:route-validation:t06`      | అన్ని routesలో Zod schemas ఉన్నాయా (Tier 6 విధానం)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | అవును                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` కౌంట్ బడ్జెట్ను మించదు (టియర్ 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | అవును                                     |
| `check:provider-consistency`      | `providers.ts`లోని ప్రతి providerకు `providerRegistry.ts`లో సరిపోలే ఎంట్రీ ఉంటుంది (మరియు దీనికి విరుద్ధంగా, allowlist పరిధిలో)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | అవును                                     |
| `check:model-lifecycle`           | చేతితో నిర్వహించే మూడు routing పట్టికలు చెక్-ఇన్ చేసిన lifecycle snapshot (#11503)తో స్థిరంగా ఉంటాయి: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` రూట్ చేయగల retired idలకు స్కోర్ ఇవ్వదు; ప్రతి `BUILT_IN_ALIASES` target `REGISTRY`లో ఉంటుంది మరియు retired-id snapshotలో ఉండదు; `REGISTRY`లో ఇంకా ఉన్న ప్రతి retired id forward చేయబడుతుంది లేదా `allowedRetiredInCatalog`లో జాబితా చేయబడుతుంది; అలాగే `DEFAULT_DEGRADATION_MAP`లోని source లేదా target ఏదీ ఆ snapshotలో retiredగా ఉండదు. మోడల్ ప్రస్తుతం live upstream ద్వారా అందించబడుతుందనే విషయాన్ని ఇది నిరూపించదు. ఆఫ్లైన్ — `config/quality/model-lifecycle.json`తో పోల్చుతుంది; దీన్ని `npm run quality:refresh-model-lifecycle`తో (నెట్వర్క్ అవసరం; CIలో అనుసంధానించబడలేదు) చేతితో రిఫ్రెష్ చేస్తారు. `allowedRetiredInCatalog` అనేది burn-down ratchet: tracking issue ఉన్నప్పుడే ఎంట్రీని జోడించండి. | అవును                                     |
| `check:fetch-targets`             | క్లయెంట్-సైడ్ `src/`లోని ప్రతి `fetch("/api/...")` నిజమైన `route.ts`కు resolve అవుతుంది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | అవును                                     |
| `check:deps`                      | రిపోజిటరీలోని ప్రతి `package.json`లోని అన్ని `npm install` చేయగల deps `dependency-allowlist.json`లో ఉంటాయి; కొత్త unpinned లేదా slopsquatted ప్యాకేజీలు ఫ్లాగ్ చేయబడతాయి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | అవును                                     |
| `audit:deps`                      | `npm audit` (root + electron) — high/critical advisories ఏవీ ఉండకూడదు (osv `check:vuln-ratchet`తో కొంతవరకు మిళితం అవుతుంది; Rationalization Backlog చూడండి)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | అవును                                     |
| `check:lockfile`                  | `package-lock.json` సమగ్రత — https రిజిస్ట్రీ, సమగ్రత హ్యాష్లు, హోస్ట్ ఓవర్రైడ్లు లేవు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | అవును                                     |
| `check:licenses`                  | ప్రొడక్షన్ డిపెండెన్సీల కోసం SPDX లైసెన్స్ అనుమతి జాబితా                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | అవును                                     |
| `check:tracked-artifacts`         | బిల్డ్ ఆర్టిఫాక్ట్లు / కమిట్ చేసిన `node_modules` సింబాలిక్ లింక్లు లేవు (husky pre-commitలో కూడా నడుస్తుంది; pre-push ఉద్దేశపూర్వకంగా తేలికగా ఉంటుంది — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | అవును                                     |
| `check:ai-attribution`            | PR కమిట్లు, శీర్షిక లేదా బాడీలో AI/bot `Co-Authored-By` ట్రైలర్ లేదా AI-జనరేషన్ ఫుటర్ ఉండకూడదు — హార్డ్ రూల్ #16 (`quality.yml`లోని PR→`release/**` కోసం fast-gates లూప్లో — ఈవెంట్ పేలోడ్ను చదువుతుంది, PRలు కానప్పుడు no-op — అలాగే PR→`main` కోసం `ci.yml` lintలో PR-మాత్రమే స్టెప్; అలాగే husky `commit-msg` హుక్లో; మానవ సహ-రచయితలు అనుమతించబడతారు; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | ప్రతి Vitest మినహాయింపు ఒక ట్రాకింగ్ ఇష్యూను పేర్కొని, `config/quality/vitest-exclusions.json`లో కనిపించాలి (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | అవును                                     |
| `check:file-size`                 | సోర్స్ ఫైళ్లు (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`లో) `cap` పరిమితిలో ఉండాలి మరియు టెస్ట్ ఫైళ్లు (`*.test.ts(x)`) `testCap` పరిమితిలో ఉండాలి; `file-size-baseline.json`లో ఫ్రీజ్ చేసిన ఫైళ్లు (`frozen` / `testFrozen`) నమోదు చేసిన పరిమాణాన్ని మించకూడదు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | అవును                                     |
| `check:error-helper`              | executors/handlersలోని ఎర్రర్ ప్రతిస్పందనలు `buildErrorBody()` / `sanitizeErrorMessage()`ను ఉపయోగిస్తాయి (కఠిన నియమం #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | అవును                                     |
| `check:migration-numbering`       | Migration SQL ఫైళ్లు వరుస సంఖ్యలతో క్రమబద్ధంగా ఉంటాయి; ఖాళీలు లేదా నకిలీలు ఉండవు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | అవును                                     |
| `check:public-creds`              | `publicCreds.ts` వెలుపల అక్షరాలుగా ఉన్న OAuth `client_id`/`client_secret` లేదా Firebase Web కీలు లేవు (కఠిన నియమం #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | అవును                                     |
| `check:db-rules`                  | `src/lib/db/` మాడ్యూళ్ల వెలుపల ముడి SQL లేదు; `localDb.ts` నుండి బారెల్-ఇంపోర్ట్లు లేవు (కఠిన నియమాలు #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | అవును                                     |
| `check:known-symbols`             | వాటి డిస్పాచ్ పట్టికల్లో నమోదు చేసిన Provider executors, routing strategies మరియు translators డిస్క్లోని ఫైళ్లతో సరిపోలుతాయి — అనాథగా ఉన్న లేదా ప్రకటించని symbols లేవు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | అవును                                     |
| `check:route-guard-membership`    | child processను ప్రారంభించే ప్రతి routeను `isLocalOnlyPath()` ద్వారా వర్గీకరిస్తారు (కఠిన నియమాలు #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | అవును                                     |
| `check:test-discovery`            | రిపోజిటరీలోని ప్రతి `*.test.ts` / `*.spec.ts` ఫైల్ను కనీసం ఒక టెస్ట్ రన్నర్ సేకరిస్తుంది (ర్యాచెట్: `test-discovery-baseline.json` లోని అనాథల జాబితా తగ్గడం మాత్రమే సాధ్యం)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | అవును                                     |
| `check:test-tla-order`            | `tests/unit` కింద ఉన్న ఏ `node:test` ఫైల్ కూడా టెస్ట్ను నమోదు చేసి, టాప్-లెవెల్ `await` ను చేరుకుని, ఆ తర్వాత మరిన్ని టెస్ట్లను నమోదు చేయదు (#18045; ర్యాచెట్: `test-tla-order-allowlist.json` తగ్గడం మాత్రమే సాధ్యం)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | అవును                                     |
| `check:agent-skills-sync`         | రూపొందించిన agent-skills ఆర్టిఫాక్ట్లు వాటి మూల కేటలాగ్తో సరిపోలాలి (ఎటువంటి వ్యత్యాసం ఉండకూడదు)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | ప్రొవైడర్ లోగోలు/ఆస్తులకు నమోదు చేయబడిన మూలాధార ఎంట్రీ ఉండాలి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON కాన్ఫిగరేషన్ ఫైళ్లు పార్స్ చేయబడాలి మరియు రిపోజిటరీ లింట్ నియమాలను పాటించాలి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | లోపాలు లేకుండా TypeScript కంపైలేషన్ (సూచనాత్మక హెచ్చరికలు మాత్రమే)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | అవును                                     |
| `typecheck:noimplicit:core`       | కఠినమైన `noImplicitAny` — భవిష్యత్ దిశగా; ఇప్పటికే ఉన్న అనేక కాల్ సైట్లకు ఇంకా అనోటేషన్లు అవసరం                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **సూచనాత్మక** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ను `src/app/(dashboard)/**` పరిధిలో అమలు చేస్తుంది (#7033) — `typecheck:core` యొక్క ఎంపిక చేసిన 27-ఫైల్ allowlistలో ఎలాంటి dashboard TSX లేదు, అలాగే `next build` కూడా దీనిపై type-check చేయదు (`next.config.mjs` లో `ignoreBuildErrors: true` సెట్ చేయబడింది). అందువల్ల అక్కడి orphaned-identifier regressions (#6625/#6909) CIకి కనిపించలేదు. ప్రతి ఫైల్/TS కోడ్ గణనకు స్థిరపరచిన baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`లోని stale-enforcement విధానాన్నే అనుసరిస్తుంది)తో తేడాలను తనిఖీ చేస్తుంది — baselineలో ఉన్న గణనను మించిన NEW errors మాత్రమే gateను విఫలమయ్యేలా చేస్తాయి; ముందే ఉన్న error పరిష్కరించబడినప్పుడు `--update`తో ratchet down చేయండి.                                                                                                                                                      | అవును                                     |

### పని: `quality-gate`

`test-coverage` తర్వాత అమలవుతుంది. విఫలమైతే mergeను నిరోధిస్తుంది.

| Script                       | ధృవీకరించేది                                                                                                                                                                              | నిరోధకం                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | `quality-metrics.json`ను ఉత్పత్తి చేస్తుంది (ESLint warning count, merged shard report నుండి coverage)                                                                                    | అవును (ratchetకు upstream) |
| `quality:ratchet`            | `quality-baseline.json`లోని ప్రతి metric regress కాలేదని నిర్ధారిస్తుంది (ESLint warnings ≤ baseline; coverage ≥ baseline)                                                                | అవును                      |
| `check:duplication`          | Code duplication (jscpd@4) `quality-baseline.json`లోని baselineను మించదు                                                                                                                  | అవును                      |
| `check:complexity`           | ఫైల్-స్థాయి cyclomatic complexity capను మించదు (core ESLint `complexity` + `max-lines-per-function`)                                                                                      | అవును                      |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — ప్రత్యేక ESLint pass; CIలో రెండింటినీ ఒకే `check:complexity-ratchets` stepగా merge చేస్తుంది                                     | అవును                      |
| `check:dead-code`            | ఉపయోగించని exports / files ratchet (knip) baselineతో పోలిస్తే regress కాదు                                                                                                                | అవును                      |
| `check:compression-budget`   | Compression benchmark budget — ప్రతి engineకు token-savings floors regress కాకూడదు                                                                                                        | అవును                      |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regress కాదు; ఇది `typecheck:noimplicit:core`ను చాలా వరకు subsume చేస్తుంది                                                                       | అవును                      |
| `check:codeql-ratchet`       | Open CodeQL alert count regress కాదు (`gh api` ద్వారా చదువుతుంది; token లేకపోతే సున్నితంగా skip అవుతుంది) — refresh cadence మరియు manual trigger కోసం దిగువన ఉన్న "CodeQL ratchet" చూడండి | అవును                      |

### పని: `quality-extended`

మొత్తం job advisory (`continue-on-error: true`). npm-ఆధారిత ratchets నిజంగా అమలవుతాయి; బాహ్య scanners `gh release download` ద్వారా install అవుతాయి మరియు binary ఇంకా అందుబాటులో లేకపోతే self-skip (exit 0) చేస్తాయి.

| Script                   | ధృవీకరించేది                                                                                                                                                                                                                  | నిరోధకం                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:circular-deps`    | Circular dependencies లేవు (dpdm)                                                                                                                                                                                             | **సలహా మాత్రమే**                        |
| `check:bundle-size`      | Bundle size capను మించదు                                                                                                                                                                                                      | **సలహా మాత్రమే**                        |
| `check:secrets`          | Secret scanning (gitleaks) — binary అందుబాటులో లేకపోతే skip చేస్తుంది                                                                                                                                                         | **సలహా మాత్రమే**                        |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) regress కావు — binary అందుబాటులో లేకపోతే skip చేస్తుంది                                                                                                                              | **సలహా మాత్రమే**                        |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanners లేకపోవడం/పాడై ఉండటం, చెల్లని reports లేదా ratchet baseline లేకపోవడం INCOMPLETEగా విఫలమవుతాయి. చెల్లుబాటు అయ్యే findings ఎంచుకున్న strict/advisory/ratchet policyని అనుసరిస్తాయి | అమలు అవసరం; CIలో zizmor ratchet నిరోధకం |
| `check:openapi-breaking` | Base branchతో పోల్చిన public API contract (`openapi.yaml`)లో Breaking changes (oasdiff) — `openapiBreaking=N`ను ఉత్పత్తి చేస్తుంది; oasdiff లేకపోతే లేదా base specను resolve చేయలేకపోతే skip అవుతుంది                         | **సలహా మాత్రమే**                        |

### పని: `docs-sync-strict`

`main`కు చేసే ప్రతి PRపై అమలవుతుంది. విఫలమైతే mergeను నిరోధిస్తుంది.

| స్క్రిప్ట్                     | ధృవీకరించేది                                                                                                                                                   | నిరోధకం                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | దిగువనున్న 6 ఉప-గేట్లను వరుసగా నడిపించే మెటా-గేట్                                                                                                              | అవును                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt వెర్షన్ల స్థిరత్వం                                                                                                               | అవును                        |
| ↳ `check:docs-counts`          | గద్యంలోని లెక్కలు (ప్రొవైడర్ల సంఖ్య, మైగ్రేషన్ల సంఖ్య మొదలైనవి) వాస్తవ లెక్కల ర్యాచెట్ విండో పరిధిలో ఉన్నాయో లేదో                                              | అవును                        |
| ↳ `check:env-doc-sync`         | `.env.example` లోని ప్రతి env var డాక్స్ పట్టికలో డాక్యుమెంట్ చేయబడిందో, అలాగే దానికి విరుద్ధంగా కూడా ఉందో లేదో                                                | అవును                        |
| ↳ `check:deprecated-versions`  | డాక్స్లో deprecated వెర్షన్ స్ట్రింగ్లు ఏవీ లేవు                                                                                                               | అవును                        |
| ↳ `check:doc-links`            | డాక్స్లోని అంతర్గత Markdown లింక్లు వాస్తవ ఫైళ్లకు పరిష్కరించబడుతున్నాయో లేదో (`[text]`/`(path)` రూపం)                                                         | అవును                        |
| ↳ `check:fabricated-docs`      | డాక్స్లో సూచించిన routes, env vars, CLI commands, hook names, file paths కోడ్బేస్లో ఉన్నాయో లేదో. `--strict` ద్వారా హార్డ్ గేట్; ఫ్లాగ్ లేకుండా సాఫ్ట్-ఫెయిల్. | CIలో `--strict` ద్వారా అవును |
| `check:cli-i18n`               | CLI కమాండ్ స్ట్రింగ్లు అన్ని i18n locale ఫైళ్లలో ఉన్నాయో లేదో                                                                                                  | అవును                        |
| `check:openapi-coverage`       | OpenAPI స్పెక్ వాస్తవ routesలో కనీసం ర్యాచెట్ చేసిన దిగువ పరిమితిని కవర్ చేస్తుందో లేదో                                                                        | అవును                        |
| `check:openapi-security-tiers` | `openapi.yaml` లోని Security tier annotations `routeGuard.ts` వర్గీకరణలతో స్థిరంగా ఉన్నాయో లేదో                                                                | **సలహా మాత్రమే**             |
| `check:openapi-routes`         | `openapi.yaml` లోని ప్రతి path వాస్తవ `route.ts` కు పరిష్కరించబడుతుందో లేదో (హాల్యూసినేషన్-నిరోధకం)                                                            | అవును                        |
| `check:docs-symbols`           | `docs/**/*.md` లోని ప్రతి `/api/...` సూచన వాస్తవ `route.ts` కు పరిష్కరించబడుతుందో లేదో (హాల్యూసినేషన్-నిరోధకం)                                                 | అవును                        |
| `i18n translation drift`       | i18n locale ఫైళ్లలో అనువదించని కీలు — హెచ్చరిక మాత్రమే                                                                                                         | **సలహా మాత్రమే**             |

`docs/diagrams/` కింద ఉన్న పన్నెండు README SVGలు జనరేట్ చేయబడతాయి (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` వాటన్నింటినీ మళ్లీ జనరేట్ చేస్తుంది). ప్రతి దానికి ఒక byte-compare యూనిట్ టెస్ట్ ఉంటుంది
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), కమిట్ చేసిన ఫైల్ పాతదిగా ఉన్నప్పుడు అది విఫలమవుతుంది, మరియు
`check:docs-counts` వాటి `<text>` నోడ్ల నుంచి canonical సంఖ్యలను చదువుతుంది — అందుకే outlining దశ ఫైల్లో outlined చేసిన ప్రతి స్ట్రింగ్ను
కనిపించని `<text>` గా ఉంచుతుంది. SVG canonical-numbers చెక్
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) లో జాబితా చేసిన ఫైళ్లను చదువుతుంది: `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, అలాగే `public/images/tier-flow-dark.svg` మరియు `tier-flow-light.svg`; `free-forever`, `catalog-entry`,
`recurring-pool` మరియు `scoring-factors` క్లెయిమ్లు కూడా
`promise-pillars.svg`, `free-tier-budget.svg` మరియు `strategies-grid.svg` ను చదువుతాయి. `free-tier-budget.svg`
తన గణాంకాలను live catalog loader నుంచి పొందుతుంది, కాబట్టి `FREE_MODEL_BUDGETS` లేదా
provider display name లో మార్పు చేసినప్పుడు ఆ ఫైల్ను మళ్లీ జనరేట్ చేసే వరకు CI రెడ్ అవుతుంది.

### Job: `i18n-ui-coverage`

| స్క్రిప్ట్                        | ధృవీకరించేది                                                                                                                                                                     | నిరోధకం          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | UI i18n కీ కవరేజ్ ≥ 65% ఉందో లేదో                                                                                                                                                | అవును            |
| `check-ui-value-drift` (inline)   | తిరిగి వ్రాయబడిన ఇంగ్లీష్ **విలువ** వెనుక పాత అనువాదం మిగలలేదో లేదో                                                                                                              | అవును            |
| `check-new-key-coverage` (inline) | ఒక **కొత్త** ఇంగ్లీష్ కీ ప్రతి localeలో అనువదించబడిందో లేదో — `__MISSING__:` marker తిరస్కరించబడుతుంది                                                                           | అవును            |
| `check-translation-ratio`         | ప్రతి localeకి వాస్తవ-అనువాద నిష్పత్తి (ఇంగ్లీష్తో సమానమైనవి / placeholder / allowlist వెలుపల ఉన్న missing) `config/quality/i18n-translation-baseline.json` + slack ను మించకూడదు | **సలహా మాత్రమే** |

`fetch-depth: 0` అవసరం — value-drift గేట్ merge baseతో `en.json` ను diff చేస్తుంది.

#### `check-ui-value-drift` — పాత అనువాదాల గేట్

ఇతర గేట్లు నిర్మాణపరంగా గుర్తించలేని ఒక i18n రిగ్రెషన్ను ఇది గుర్తిస్తుంది: ఒక English విలువను తిరిగి రాసినప్పుడు, _మునుపటి_ English ఆధారంగా రూపొందిన అనువాదాలు అలాగే మిగిలిపోతాయి. దాంతో non-English వినియోగదారులు నమ్మకం కలిగించేలా ఉన్నప్పటికీ, ఇప్పుడు తప్పైన కాపీని చదువుతూనే ఉంటారు.

ఇది నిజంగానే షిప్ అయింది. Antigravity లాగిన్ హెల్పర్ వచ్చినప్పుడు `oauthModal.googleOAuthWarning` తిరిగి రాయబడింది (#5203); **43 లో 39 లోకేల్స్** ఆపరేటర్లకు "పూర్తి URLని కాపీ చేసి క్రింద పేస్ట్ చేయండి" అని చెప్పే టెక్స్ట్ను అలాగే ఉంచాయి — ఆ ప్రొవైడర్కు పూర్తికాని ఫ్లో. #8463 వరకు ఇది ఎవరికీ కనిపించలేదు, కారణాలు:

- `sync-ui-keys` **లేని** కీలను మాత్రమే తిరిగి నింపుతుంది, **stale** కీలను ఎప్పుడూ కాదు;
- `check-ui-keys-coverage` కీ _ఉనికిని_ లెక్కిస్తుంది, కాబట్టి stale అనువాదం coveredగా స్కోర్ అవుతుంది;
- `check-translation-drift` `docs/i18n/<locale>/**.md` డాక్యుమెంటేషన్ మిర్రర్లను ట్రాక్ చేస్తుంది —
  ఇది `src/i18n/messages/*.json`ను ఎప్పుడూ చదవదు. 2026-09లో మళ్లీ సింక్ చేసినప్పటి నుంచి `docs-sync-strict` జాబ్లో బ్లాక్ చేస్తుంది: ఒక కోర్ డాక్ను ఎడిట్ చేసిన తర్వాత → `npm run i18n:run -- --files=<doc>` (సెక్షన్-స్థాయి, తక్కువ ఖర్చు).

**Diff-aware, baseline-backed కాదు.** ఇది merge baseలోని `en.json`ను working treeతో పోలుస్తుంది; English విలువ మారిన ప్రతి కీకి, ఇంకా మార్చకుండా ఉన్న అనువాదం ఉన్న ఏ లోకేల్ అయినా staleగా పరిగణించబడుతుంది. ఇది ముందే ఉన్న రుణాన్ని ఉద్దేశపూర్వకంగా **ఫ్రీజ్ చేస్తుంది** — చాలా కాలంగా ఉన్న అనువాదం ఏ పాత English నుంచి వచ్చిందో diff ద్వారా తెలుసుకోవడం సాధ్యం కాదు, కాబట్టి ప్రస్తుత మార్పు తాకిన వాటినే గేట్ నిర్ణయిస్తుంది. ప్రత్యామ్నాయం (ప్రతి కీకి hash baseline) కోసం సుమారు 600 KB పరిమాణం గల generated file అవసరం, ఇది ఇప్పటికే ఉన్న అతిపెద్ద baseline కంటే 3× పెద్దది, అలాగే ప్రతి i18n PRలో మార్పులకు గురవుతుంది.

దీన్ని సంతృప్తిపరచడానికి రెండు మార్గాలు ఉన్నాయి:

1. ప్రభావిత అనువాదాలను నవీకరించండి, లేదా
2. వాటిని `__MISSING__:<new english>`గా సెట్ చేయండి — అప్పుడు runtime సరిచేసిన Englishను అందిస్తుంది
   (`src/i18n/request.ts::deepMergeFallback`, #7258), అలాగే ఆ కీ అనువాదం కోసం క్యూ అవుతుంది.

స్ట్రింగ్ యొక్క **అర్థం** మారితే, **కీ పేరు మార్చడాన్ని** ప్రాధాన్యంగా ఎంచుకోండి: కొత్త కీ stale అనువాదాన్ని వారసత్వంగా పొందదు. #8463 ఉపయోగించిన పద్ధతి ఇదే.

```bash
npm run i18n:check-value-drift          # కఠినమైనది (CI అమలు చేసేది)
npm run i18n:check-value-drift:warn     # నివేదిక మాత్రమే
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

బేస్ క్యాటలాగ్ను చదవలేనప్పుడు (బేస్ ref లేని shallow clone), `check-openapi-breaking` మాదిరిగానే
`SKIP reason=base-unresolved`తో 0ను exit codeగా ఇస్తుంది.

### జాబ్: `i18n`

పూర్తి i18n ధృవీకరణ మ్యాట్రిక్స్ (ప్రతి లోకేల్కు ఒక జాబ్). మొత్తం జాబ్ సలహా మాత్రమే.

| స్క్రిప్ట్                      | ధృవీకరించేది                   | బ్లాకింగ్                                                  |
| ------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| `validate_translation.py quick` | ప్రతి లోకేల్లో అనువాద సంపూర్ణత | **సలహా మాత్రమే** (మొత్తం జాబ్పై `continue-on-error: true`) |

### జాబ్: `pr-test-policy`

Pull requestలపై మాత్రమే అమలవుతుంది.

| స్క్రిప్ట్             | ధృవీకరించేది                                                                                                                                                           | బ్లాకింగ్ |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, లేదా `bin/`లో production codeను మార్చే PRలు తప్పనిసరిగా టెస్ట్లను చేర్చాలి లేదా నవీకరించాలి (Hard Rule #8)                           | అవును     |
| `check:test-masking`   | మార్చిన టెస్ట్ ఫైళ్లు net assert countను తగ్గించవు లేదా `assert.ok(true)` tautologyలను జోడించవు                                                                        | అవును     |
| `check:pr-evidence`    | మార్పుకు సంబంధించిన test/VPS ఆధారాలను PR bodyలో పేర్కొంటుంది (PR proseను grep చేయడం ద్వారా Hard Rule #18ను యాంత్రీకరిస్తుంది — లోపాలకు గురయ్యే విధానం, Backlog చూడండి) | అవును     |

### జాబ్: `test-vitest`

`build` తర్వాత అమలవుతుంది. విఫలమైతే mergeను బ్లాక్ చేస్తుంది.

| సూట్             | ధృవీకరించేది                                             | బ్లాకింగ్                                                                                                                      |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | అవును                                                                                                                          |
| `test:vitest:ui` | UI component tests — vitest runner                       | **బ్లాకింగ్** — ముందే ఉన్న వైఫల్యాలను `vitest.config.ts`లో స్పష్టంగా మినహాయించారు; కొత్త వైఫల్యాలు జాబ్ను విఫలమయ్యేలా చేస్తాయి |

### రాత్రివేళ వర్క్ఫ్లోలు (షెడ్యూల్డ్, సలహా మాత్రమే)

ఇవి cron షెడ్యూల్లో (మరియు `workflow_dispatch`) అమలవుతాయి, PRలపై ఎప్పుడూ అమలుకావు. ఇవన్నీ సలహా మాత్రమే.

| వర్క్ఫ్లో              | ధృవీకరించేది                                                                                                                                                      | నిరోధకం          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | యాదృచ్ఛిక సీడ్ + అధిక రన్ కౌంట్తో fast-check ప్రాపర్టీ పరీక్షలు                                                                                                   | **సలహా మాత్రమే** |
| `nightly-resilience`   | హీప్-గ్రోత్ గేట్, చావోస్ ఫాల్ట్-ఇంజెక్షన్, k6 లోడ్/సోక్                                                                                                           | **సలహా మాత్రమే** |
| `nightly-llm-security` | promptfoo ఇంజెక్షన్ గార్డ్ (బ్లాక్ మోడ్) + garak ప్రోబులు (ప్రొవైడర్ సీక్రెట్ లేకుండా దాటవేయబడతాయి)                                                               | **సలహా మాత్రమే** |
| `nightly-schemathesis` | లైవ్ OmniRouteపై `docs/openapi.yaml`ను ఉపయోగించి OpenAPI కాంట్రాక్ట్ ఫజింగ్ (schemathesis) — స్పెక్ ఉల్లంఘనలు / హ్యాండిల్ చేయని 500లను వెలికితీస్తుంది (దశ 8 B.4) | **సలహా మాత్రమే** |
| `nightly-mutation`     | వేగవంతమైన యూనిట్ లేన్పై Stryker మ్యూటేషన్-టెస్టింగ్ స్కోర్ — బతికి ఉన్న మ్యూటెంట్లు బలహీనమైన అసర్ట్లను వెలికితీస్తాయి                                             | **సలహా మాత్రమే** |
| `nightly-compat`       | మద్దతు ఉన్న `engines.node` పరిధుల అంతటా Node ఇంజిన్ అనుకూలత మ్యాట్రిక్స్                                                                                          | **సలహా మాత్రమే** |

పనితీరు బేస్లైన్లు (హీప్, TTFB, బిల్డ్ సమయం) నమోదు చేయబడతాయి, కానీ గేట్ చేయబడవు: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) చూడండి.

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
