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

## గేట్ ఇన్వెంటరీ మరియు ఎగ్జిక్యూషన్ ప్రొఫైల్స్

### అభ్యర్థి ప్రవేశం

CI మరియు క్వాలిటీ గేట్స్ వర్క్ఫ్లోలు ప్రతి ఒక్కటి స్థిరమైన తీర్పును విడుదల చేస్తాయి: `Gate / CI` మరియు `Gate / Quality`. వారి వర్షన్డ్ అడ్మిషన్ పాలసీ ప్రతి అప్స్ట్రీమ్ ఉద్యోగాన్ని అవసరమైన లేదా సలహా ప్రకారం లెక్కిస్తుంది. వర్తించే అవసరమైన ఉద్యోగం తప్పనిసరిగా విజయవంతం కావాలి: తప్పిపోయిన, రద్దు చేయబడిన, దాటవేయబడిన, పెండింగ్ మరియు తెలియని ఫలితాలు PASS స్థాపించలేవు. చెల్లుబాటు అయ్యే డాక్స్-మాత్రమే లేదా కేటలాగ్-మాత్రమే వర్గీకరణ కోడ్ లేన్ను వర్తించదు; డ్రాఫ్ట్ PR ఆమోదించబడిన అభ్యర్థి కాదు. `hotfix` లేబుల్ సాక్ష్యాలను వదులుకోదు.

రెండు వర్క్ఫ్లోలు PRs main/release బ్రాంచ్లుగా కవర్ చేస్తాయి, `main`, మాన్యువల్ డిస్పాచ్ మరియు మెర్జ్-గ్రూప్ ఈవెంట్లకు నెట్టివేస్తాయి. పుష్, డిస్పాచ్ మరియు మెర్జ్-గ్రూప్ పూర్తి ఎంపికను అమలు చేయండి. `release/**` కి పుష్లు వాటిని ప్రారంభించవు (2026-10-18): ప్రతి మార్పు ఇప్పటికే దాని PR లో మ్యాట్రిక్స్ను అమలు చేసింది మరియు విలీనం చేసిన కలయిక విడుదల-గ్రీన్ జాబ్ (`docs/ops/RUNNER_BOX.md` → హోస్ట్ చేసిన లేన్). ఫోర్క్స్ మరియు విలీన సమూహాలు ఉద్యోగాల కోసం హోస్ట్ చేసిన రన్నర్లను ఉపయోగిస్తాయి, లేకపోతే స్వీయ-హోస్ట్ రన్నర్లను ఎంపిక చేస్తారు; రోల్అవుట్కు ముందు తగినంత హోస్ట్ సామర్థ్యం తప్పనిసరిగా ధృవీకరించబడాలి.

ఒక సాధారణ PR వేగవంతమైన ఎంపికను అమలు చేస్తుంది. అడ్మిషన్ పాలసీ యొక్క `full-code` మరియు `full-code-e2e` లేన్లు (E2E, ఇంటిగ్రేషన్, ప్యాకేజీ ఆర్టిఫ్యాక్ట్, Electron స్మోక్, Bun SQLite, ఎకోసిస్టమ్ మరియు ప్రోటోకాల్ క్లయింట్లు) మెర్జిఫై క్యూ డ్రాఫ్ట్లో లేదా పూర్తి రన్లో మాత్రమే అమలవుతాయి: `gh workflow run ci.yml --ref <branch>`.

ప్రతి JSON రసీదు చెక్-అవుట్ SHA, వర్క్ఫ్లో రన్ మరియు ప్రయత్నాన్ని గుర్తిస్తుంది. CLI checkout/event SHA అసమతుల్యతను తిరస్కరిస్తుంది. వర్క్ఫ్లో పరీక్షలు పాలసీ సభ్యత్వాన్ని తీర్పు జాబ్ యొక్క `needs` జాబితాకు బంధిస్తాయి కాబట్టి కొత్త లేదా తీసివేయబడిన లేన్ నిశ్శబ్దంగా అదృశ్యం కాదు. రసీదులు వారి స్వంత వర్క్ఫ్లోను కవర్ చేస్తాయి, ప్రచురణ, విస్తరణ లేదా ఇప్పటికే ఉన్న అడ్వైజరీ స్కానర్ యొక్క అంతర్గత అంశాలను కాదు. శాఖ నియమాలలో రెండు చెక్కుల పేర్లను సక్రియం చేయడం అనేది ఒక ప్రత్యేక పరిపాలనాపరమైన మార్పు; ఈ ఉద్యోగాలను జోడించడం అనేది శాఖను రక్షించదు.

### క్యూను విలీనం చేయండి

> **2026-11-19: Mergify విలీన క్యూ రిటైర్డ్ చేయబడింది** (యజమాని నిర్ణయం). `.mergify.yml` ఇకపై క్యూను నిర్వచించదు మరియు పుల్ అభ్యర్థనను విలీనం చేసే లేదా తిరిగి వ్రాసే Mergify ఆదేశాలను నిరాకరిస్తుంది. omni-queue live మోడ్‌లో అమలయ్యే వరకు విడుదల శాఖకు సంబంధించిన పుల్ అభ్యర్థనలను రిపోజిటరీ రూల్‌సెట్ "Require green gates on the active release" (`Gate / CI` + `Gate / Quality`) ప్రకారం మానవీయంగా విలీనం చేస్తారు. ఆ తర్వాత వాటిని omni-queue ద్వారా విలీనం చేస్తారు ([OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)). దిగువ వివరించిన Mergify డ్రాఫ్ట్ల వర్క్ఫ్లో హ్యాండ్లింగ్ ఇప్పటికీ `ci.yml` మరియు `quality.yml` లోనే ఉంది, అయితే ఇకపై Mergify డ్రాఫ్ట్ తెరవబడదు.

`queue` లేబుల్ మెర్జిఫై క్యూ (`.mergify.yml`)కి PR ని పంపుతుంది. Mergify `mergify/merge-queue/` బ్రాంచ్లో డ్రాఫ్ట్ PR తెరుస్తుంది, CI అక్కడ పూర్తి ఎంపికను అమలు చేస్తుంది మరియు `Gate / CI`, `Gate / Quality` మరియు `Merge integrity (changelog + generated skills)` పాస్ అయినప్పుడు అసలు PR విలీనం అవుతుంది.

Mergify దాని క్యూ సారాంశాన్ని డ్రాఫ్ట్ వివరణలో వ్రాస్తుంది మరియు ఇతర యాప్లు కూడా దీన్ని సవరించగలవు. అటువంటి డ్రాఫ్ట్లోని `pull_request` `edited` ఈవెంట్ దాని స్వంత కాన్కరెన్సీ గ్రూప్ (`-queue-edit-<run_id>`)ని తీసుకుంటుంది కాబట్టి ఇది డ్రాఫ్ట్ యొక్క నిజమైన రన్ను రద్దు చేయదు మరియు ఇది గేట్ మరియు మ్యాట్రిక్స్ను దాటవేస్తుంది. ఇప్పటికీ `Merge integrity` మాత్రమే నడుస్తుంది. దాటవేయబడిన గేట్ జాబ్ వేరే చెక్ పేరును కలిగి ఉంది, ఎందుకంటే Mergify దాటవేయబడిన `Gate / CI` విఫలమైన చెక్గా చదివి PR డీక్యూ చేస్తుంది.

డీక్యూ తర్వాత, ఒక పుష్ ఎల్లప్పుడూ PR రీక్యూ చేయదు. దానిపై `@mergifyio queue` అని వ్యాఖ్యానించండి.

### అంగీకార తగ్గింపులో నిలుపుకున్న సాక్ష్యం

`scripts/quality/validate-release-acceptance.mjs` సరఫరా చేయబడిన ప్రణాళికను మరియు దాని మానిఫెస్ట్లను తగ్గిస్తుంది; ప్లాన్ పూర్తి విడుదల పైప్లైన్ను కవర్ చేస్తుందని నిర్ధారించలేదు. ఆ ప్లాన్ `VERIFIED` అయినప్పుడు కూడా దాని నివేదికలు స్పష్టంగా `releaseAcceptance: false` సెట్ చేస్తాయి. `release-acceptance.yml` వర్క్ఫ్లో ఇప్పటికీ షాడో ఫిక్చర్లను ఉపయోగిస్తుంది, నిజమైన బిల్డ్, ప్యాకేజీ, బూట్ లేదా ప్రమోషన్ రసీదులను కాదు.

నిలుపుకున్న సాక్ష్యాలను ధృవీకరించడానికి CLI `--evidence-root` అవసరం. ఫైల్లు `<evidence-root>/<artifact_id>/<member>` గా పరిష్కరించబడతాయి మరియు SHA-256 గా హ్యాష్ చేయబడ్డాయి. సాక్ష్యం లేని PASS రికార్డ్, తప్పిపోయిన లేదా మార్చబడిన ఫైల్, అసురక్షిత మార్గం లేదా సిమ్లింక్ ధృవీకరణను నిరోధిస్తుంది. తప్పిపోయిన ఫైల్లు విజయవంతమైన లాగ్లను ఖాళీ చేయడానికి సమానం కాదు. ఇప్పటికే ఉన్న SHA/run/attempt తనిఖీలు స్వతంత్రంగా ఉంటాయి: సరిపోలే బైట్లు పాత రసీదుని రక్షించలేవు. ఫైల్ సమగ్రత అనేది ఎగ్జిక్యూషన్ అథెంటిసిటీ లేదా ఆర్టిఫ్యాక్ట్ ప్రమోషన్ యొక్క రుజువు కాదు.

### స్టాటిక్ స్కాన్ ఇన్వెంటరీ

వెర్షన్ చేయబడిన npm-అలియాస్ ఇన్వెంటరీ మరియు స్టాటిక్-స్కాన్ సభ్యత్వం `config/quality/gate-manifest.json` లో ఉన్నాయి. `package.json` కి వ్యతిరేకంగా స్క్రిప్ట్ పేర్లు మరియు ఖచ్చితమైన ఆదేశాలను ధృవీకరించడానికి `npm run check:gate-manifest` అమలు చేయండి; జోడింపులు, తీసివేతలు మరియు కమాండ్ డ్రిఫ్ట్ CI లో స్థానిక హుక్ మరియు మార్పు-వర్గీకరణ ఉద్యోగాలు రెండింటిలోనూ విఫలమవుతాయి. అలియాస్ అనేది వర్క్ఫ్లో జాబ్, మ్యాట్రిక్స్ ఇన్స్టాన్స్ లేదా టెస్ట్ కేస్ కాదు: ఈ గణనలను పరస్పరం మార్చుకోగలిగేలా ప్రదర్శించకూడదు.

ఎంచుకున్న మారుపేర్లను అమలు చేయకుండా తనిఖీ చేయడానికి `npm run quality:scan -- --list` లేదా `npm run quality:scan:fast -- --list` ఉపయోగించండి. రన్నర్ npm ఎంట్రీ పాయింట్ను ప్రేరేపిస్తుంది, కాబట్టి దాని రన్టైమ్ (కాన్ఫిగర్ చేయబడిన Bun తో సహా) భద్రపరచబడుతుంది. మానిఫెస్ట్ రికార్డ్లు ఆ ప్రొఫైల్ల వెలుపల ఉన్న మారుపేర్లను విడివిడిగా ప్రారంభించబడ్డాయి మరియు రీడ్-ఓన్లీ స్కాన్ ప్రొఫైల్లలో నిర్వహణ ఆదేశాలు నిషేధించబడ్డాయి.

ఈ ప్రొఫైల్లు స్టాటిక్ స్కాన్ను మాత్రమే కవర్ చేస్తాయి. వారు ఉత్పత్తి పరీక్షలు, కవరేజ్, ప్యాకేజింగ్, బాహ్య తనిఖీలు లేదా అభ్యర్థి యొక్క పూర్తి విడుదల అంగీకారాన్ని ధృవీకరించరు. వర్క్ఫ్లో అడ్మిషన్ లింక్ చేయబడిన `config/quality/admission-policy.json` మరియు `scripts/quality/admission-verdict.mjs` లను ఉపయోగిస్తుంది. విడుదల-పరిశీలకుల ప్రొఫైల్లు వేరుగా ఉంటాయి; వారి వర్తించే చెక్కులు మరియు రసీదులను స్వతంత్రంగా తనిఖీ చేయండి. `audit:deps`, మ్యుటేషన్-పరీక్ష ఎంపిక మరియు అనువాద తనిఖీలతో సహా పూర్తి పరిశీలకుడి స్టాటిక్ ఆదేశాలు `config/quality/release-green-static-profile.json` లో ప్రకటించబడ్డాయి. లోడర్ package.json మరియు మోడల్ చేయబడిన CI/Quality డిక్లరేషన్లకు వ్యతిరేకంగా npm ఆదేశాలను ధృవీకరిస్తుంది; ఇది షెల్ టోకెన్లను వాదనలుగా అమలు చేయడానికి బదులుగా డ్రిఫ్ట్ను తిరస్కరిస్తుంది. అవసరమైన స్కానర్ SKIP/INCOMPLETE అవుట్పుట్ PASS స్థాపించలేదు. ప్రొఫైల్ దాని బాహ్య మినహాయింపులను రికార్డ్ చేస్తుంది మరియు హోస్ట్ చేసిన కవరేజ్, టెస్ట్ మాత్రికలు, ప్యాకేజీ లేదా విస్తరణ సాక్ష్యాలను భర్తీ చేయదు. దిగువన ఉన్న గద్య జాబితా ఒక సూచన, వాస్తవానికి గేట్ నడిచిందని రుజువు కాదు.

స్క్రిప్ట్లు `scripts/check/` (పాలసీ గేట్లు) మరియు `scripts/quality/` (రాట్చెట్ ఇంజిన్) కింద ఉంటాయి. సత్యం యొక్క CI మూలం `.github/workflows/ci.yml`.

### PR ఫాస్ట్-పాత్ (`quality.yml`)ని విడుదల చేయండి

`.github/workflows/quality.yml` main/release PRలు, `main`కు పుష్లు,
డిస్పాచ్ మరియు merge groupలను CIకి తోడ్పడుతుంది. PRలు పాత్-ఫిల్టర్ చేసిన వేగవంతమైన తనిఖీలను
ఉపయోగిస్తాయి. శాశ్వతంగా డిసేబుల్ చేసిన డూప్లికేట్ బిల్డ్ తొలగించబడింది; నిజమైన build/package/boot
తనిఖీలు CIలోనే ఉంటాయి. యూనిట్ సూట్ మరియు vitest CIలో మాత్రమే అమలవుతాయి
(`Unit Tests (N/8)` మరియు `Vitest`).

| ఉద్యోగం                                          | పరిధి                                                                                                                           | నిరోధించడం           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API డాక్స్ రెఫ్లు మరియు డాక్స్-అన్నీ                                                                             | అవును                |
| `Fast Quality Gates`                             | కోడ్ PRs; స్టాటిక్ చెక్లు, టైప్చెక్, డ్యాష్బోర్డ్ టైప్ చెక్, ఇంపాక్ట్డ్ యూనిట్ పరీక్షలు, మర్చిపోయిన తోబుట్టువుల పరీక్షలు (సలహా) |
| `No new ESLint warnings`                         | కోడ్ PRs; అణచివేతలు-అవగాహన కలిగిన లింట్ గార్డ్                                                                                  | అవును, ఫోర్క్లతో సహా |
| `Merge integrity (changelog + generated skills)` | నాన్-డ్రాఫ్ట్ PRs; చేంజ్లాగ్ మరియు రూపొందించిన నైపుణ్య సమకాలీకరణ                                                                | అవును, ఫోర్క్లతో సహా |

#### మరచిపోయిన తోబుట్టువుల పరీక్షల నివేదిక

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` యొక్క సలహా దశగా నడుస్తుంది మరియు టెస్ట్-ఇంపాక్ట్ మ్యాప్ వెనుక ఉన్న దిగుమతి పరిష్కారాన్ని మళ్లీ ఉపయోగిస్తుంది. ప్రతి మార్చబడిన ఉత్పత్తి మాడ్యూల్ కోసం, అభ్యర్థి పరీక్ష పుల్-రిక్వెస్ట్ తేడాలో లేనప్పుడు నిర్ణీత `changed module/symbol -> static consumer -> candidate sibling test` చైన్లను నివేదిస్తుంది. మార్క్డౌన్ సారాంశం మరియు JSON ఫలితం ఏదైనా నిరోధించే రోల్అవుట్కు ముందు క్రమాంకనం కోసం `forgotten-sibling-tests` వర్క్ఫ్లో ఆర్టిఫ్యాక్ట్గా ఉంచబడతాయి.

బారెల్ రీ-ఎగుమతులు మరియు డైనమిక్ దిగుమతులు రిజల్యూషన్ డయాగ్నస్టిక్స్ మాత్రమే; వారు ఎప్పుడూ నిరోధించే అన్వేషణను సృష్టించలేరు. సమీక్షించబడిన మినహాయింపులు `config/quality/forgotten-sibling-allowlist.json` లో ప్రత్యక్ష ప్రసారం చేయబడ్డాయి. ప్రతి ఎంట్రీ తప్పనిసరిగా వినియోగదారు మరియు అభ్యర్థి పరీక్షకు పేరు పెట్టాలి, నిర్దిష్ట హేతుబద్ధతను అందించాలి మరియు GitHub సమస్యను లింక్ చేయాలి లేదా అభ్యర్థనను లాగాలి. తప్పుగా రూపొందించిన ఎంట్రీలు విఫలమయ్యాయి. మినహాయింపులు తొలగించబడిన అభ్యర్థి పరీక్షను లేదా `.skip`/`.todo` ని జోడించే తేడాను అణచివేయలేవు ; దృఢత్వం బలహీనపడటం మరియు ఇతర మాస్కింగ్ స్వతంత్రంగా నిరోధించే `check:test-masking` గేట్ యాజమాన్యంలో ఉంటాయి.

### ఉద్యోగం: `lint`

ప్రతి PR నుండి `main` వరకు నడుస్తుంది. విఫలమైనప్పుడు బ్లాక్లు విలీనం అవుతాయి.

| స్క్రిప్ట్ (`npm run ...`)        | ధ్రువీకరిస్తుంది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | నిరోధించడం                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js వెర్షన్ మద్దతు ఉన్న పరిధిలో ఉందా                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | అవును                                      |
| `check:cycles`                    | `src/` + `open-sse/` మొత్తంలో సర్క్యులర్ ఇంపోర్ట్లు (AST-ఆధారితం, tsconfig `paths` పరిష్కరించబడతాయి). ఏదైనా సైకిల్ ఉన్నప్పుడు Bare 1తో నిష్క్రమిస్తుంది ( #15281 నుండి fail-closed) మరియు SCCలను జాబితా చేస్తుంది. `check:cycles:ratchet` (CI అమలు చేసేది) `quality-baseline.json`లోని `metrics.cycles` పరిమితిని మించినప్పుడు బ్లాక్ చేస్తుంది — ప్రస్తుతం 14, `direction: down`, కాబట్టి ఇది తగ్గడం మాత్రమే సాధ్యం (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | అవును (రాట్చెట్)                           |
| `check:boundary`                  | `open-sse → src` coupling: ఇంజిన్ నుండి యాప్కు జరిగే ప్రత్యేక ఫైల్-టు-ఫైల్ ఇంపోర్ట్లు (`scripts/quality/measure-boundary.mjs`; ఎడ్జ్ జాబితా v4 core/module-split పరిష్కార బ్యాక్లాగ్). Bare = సలహా నివేదిక (`quality:boundary`తో సమానం). `check:boundary:ratchet` (CI అమలు చేసేది, `quality.yml` fast-gates రాట్చెట్ లూప్లో కూడా ఉంది) `quality-baseline.json`లోని `metrics.boundaryOpenSseToSrc` పరిమితిని మించినప్పుడు బ్లాక్ చేస్తుంది — కొలిచిన 771 వద్ద సీడ్ చేయబడింది, `direction: down`; `--update` దానిని తగ్గించడం మాత్రమే చేస్తుంది; PRలపై బేస్-సంబంధితం (`--base-ref`, క్రింద చూడండి)                                                                                                                                                                                                                                                                                                                                                                                          | అవును (రాట్చెట్)                           |
| `check:route-validation:t06`      | అన్ని రూట్లలో Zod స్కీమాలు ఉన్నాయా (టైర్ 6 విధానం)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | అవును                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` లెక్క బడ్జెట్ను మించదు (టియర్ 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | అవును                                      |
| `check:provider-consistency`      | `providers.ts`లోని ప్రతి providerకు `providerRegistry.ts`లో సరిపోలే ఎంట్రీ ఉంటుంది (మరియు దీనికి విరుద్ధంగానూ, allowlist పరిధిలో)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | అవును                                      |
| `check:model-lifecycle`           | చేతితో నిర్వహించే మూడు routing పట్టికలు చెక్-ఇన్ చేసిన lifecycle snapshot (#11503)తో సమన్వయంగా ఉంటాయి: `FITNESS_TABLE` (`taskFitness.ts`)లో, `REGISTRY` route చేయగలిగే retired idకు స్కోరు ఉండదు; ప్రతి `BUILT_IN_ALIASES` target `REGISTRY`లో ఉంటుంది మరియు retired-id snapshotలో ఉండదు; `REGISTRY`లో ఇంకా ఉన్న ప్రతి retired id forward చేయబడుతుంది లేదా `allowedRetiredInCatalog`లో జాబితా చేయబడుతుంది; అలాగే `DEFAULT_DEGRADATION_MAP`లోని source లేదా target ఏదీ ఆ snapshotలో retiredగా ఉండదు. ప్రస్తుతం ఒక మోడల్ live upstream ద్వారా అందించబడుతోందని ఇది నిరూపించదు. Offline — `config/quality/model-lifecycle.json`తో పోల్చుతుంది; దీన్ని చేతితో `npm run quality:refresh-model-lifecycle` (నెట్వర్క్; CIలో అనుసంధానించబడలేదు) ద్వారా రిఫ్రెష్ చేస్తారు. `allowedRetiredInCatalog` అనేది burn-down ratchet: tracking issue ఉన్నప్పుడే ఎంట్రీని జోడించండి.                                                                                                                         | అవును                                      |
| `check:fetch-targets`             | client-side `src/`లోని ప్రతి `fetch("/api/...")` నిజమైన `route.ts`కు resolve అవుతుంది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | అవును                                      |
| `check:deps`                      | రిపోజిటరీలోని ప్రతి `package.json`లోని అన్ని `npm install`-చేయగల deps `dependency-allowlist.json`లో ఉంటాయి; కొత్త unpinned లేదా slopsquatted packages ఫ్లాగ్ చేయబడతాయి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | అవును                                      |
| `audit:deps`                      | ఐదు స్వతంత్ర lockfileలన్నింటిపై npm audit (root, Electron, OpenCode plugins v1/v2 మరియు provider). Critical advisories బ్లాక్ చేయబడతాయి; high advisories కనిపించే హెచ్చరికలుగా కొనసాగుతాయి. Auditలు లేనప్పుడు లేదా విఫలమైనప్పుడు అవి INCOMPLETEగా పరిగణించబడతాయి మరియు బ్లాక్ చేస్తాయి; ప్రతి scopeకు సంబంధించిన lock hashes మరియు reports భద్రపరచబడతాయి.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | అవును                                      |
| `check:lockfile`                  | `package-lock.json` సమగ్రత — https రిజిస్ట్రీ, సమగ్రత హ్యాష్లు, హోస్ట్ ఓవర్రైడ్లు లేవు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | అవును                                      |
| `check:licenses`                  | ఉత్పత్తి ఆధారితాల కోసం SPDX లైసెన్స్ అనుమతి జాబితా                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | అవును                                      |
| `check:tracked-artifacts`         | బిల్డ్ ఆర్టిఫాక్ట్లు / కమిట్ చేసిన `node_modules` సింబాలిక్ లింక్లు లేవు (husky `pre-commit` లో కూడా నడుస్తుంది; `pre-push` ఉద్దేశపూర్వకంగా తేలికగా ఉంటుంది — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | అవును                                      |
| `check:ai-attribution`            | PR కమిట్లు, శీర్షిక లేదా బాడీలో AI/bot `Co-Authored-By` ట్రైలర్ లేదా AI-జనరేషన్ ఫుటర్ ఉండకూడదు — హార్డ్ నియమం #16 (PR→`release/**` కోసం `quality.yml` ఫాస్ట్-గేట్స్ లూప్లో — ఈవెంట్ పేలోడ్ను చదువుతుంది, PRలు కానివాటిలో ఎటువంటి చర్య ఉండదు — మరియు PR→`main` కోసం `ci.yml` లింట్లో PR-మాత్రమే స్టెప్; అలాగే husky `commit-msg` హుక్లో; మానవ సహ-రచయితలు అనుమతించబడతారు; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | ప్రతి Vitest మినహాయింపు ఒక ట్రాకింగ్ ఇష్యూను పేర్కొని, `config/quality/vitest-exclusions.json` లో కనిపించాలి (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | అవును                                      |
| `check:file-size`                 | సోర్స్ ఫైల్లు (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` పరిమితిలో ఉండాలి మరియు టెస్ట్ ఫైల్లు (`*.test.ts(x)`) `testCap` పరిమితిలో ఉండాలి; `file-size-baseline.json` లో స్తంభింపజేసిన ఫైల్లు (`frozen` / `testFrozen`) తమ నమోదైన పరిమాణాన్ని మించకుండా ఉండాలి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | అవును                                      |
| `check:error-helper`              | executors/handlers లోని ఎర్రర్ ప్రతిస్పందనలు `buildErrorBody()` / `sanitizeErrorMessage()` ను ఉపయోగిస్తాయి (కఠిన నియమం #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | అవును                                      |
| `check:migration-numbering`       | మైగ్రేషన్ ఫైల్ పేర్లు: పాత `001`–`241` సిరీస్ స్తంభింపజేయబడింది మరియు కొత్త ఫైల్లు `YYYYMMDDHHMMSS_<description>.sql`. PR బేస్కు వ్యతిరేకంగా ఇది తీసివేయబడిన మైగ్రేషన్ను తిరస్కరిస్తుంది, అనుకూలత నమోదు లేకుండా పేరు మార్చబడింది మరియు చివరి స్కీమా కమ్యూట్ చేయని ఆర్డర్-ఆఫ్-ఆర్డర్ లేదా ఎడిట్ చేయబడినది                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:public-creds`              | `publicCreds.ts` వెలుపల ఎటువంటి లిటరల్ OAuth `client_id`/`client_secret` లేదా Firebase వెబ్ కీలు ఉండవు (కఠిన నియమం #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | అవును                                      |
| `check:db-rules`                  | `src/lib/db/` మాడ్యూళ్ల వెలుపల raw SQL ఉండదు; `localDb.ts` నుండి barrel-imports ఉండవు (కఠిన నియమాలు #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | అవును                                      |
| `check:known-symbols`             | dispatch tables లో నమోదు చేసిన Provider executors, routing strategies, మరియు translators డిస్క్లోని ఫైళ్లతో సరిపోతాయి — అనాథగా ఉన్న లేదా ప్రకటించని symbols ఉండవు                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | అవును                                      |
| `check:route-guard-membership`    | child process ను ప్రారంభించే ప్రతి route `isLocalOnlyPath()` ద్వారా వర్గీకరించబడుతుంది (కఠిన నియమాలు #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | అవును                                      |
| `check:test-discovery`            | రిపోజిటరీలోని ప్రతి `*.test.ts` / `*.spec.ts` ఫైల్ను కనీసం ఒక టెస్ట్ రన్నర్ సేకరిస్తుంది (ర్యాచెట్: `test-discovery-baseline.json`లోని orphan జాబితా కుదించబడటం మాత్రమే సాధ్యం)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | అవును                                      |
| `check:test-tla-order`            | `tests/unit` కింద ఉన్న ఏ `node:test` ఫైల్ కూడా టెస్ట్ను నమోదు చేసి, top-level `await`ను చేరుకుని, ఆ తర్వాత మరిన్ని టెస్ట్లను నమోదు చేయదు (#18045; ర్యాచెట్: `test-tla-order-allowlist.json` కుదించబడటం మాత్రమే సాధ్యం)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | అవును                                      |
| `check:agent-skills-sync`         | ఉత్పత్తి చేయబడిన ఏజెంట్-నైపుణ్యాల కళాఖండాలు వాటి మూలాధార కేటలాగ్తో సరిపోతాయి (డ్రిఫ్ట్ లేదు). విడుదల మోడ్ ప్రతి నైపుణ్యాన్ని తనిఖీ చేస్తుంది; ఒక ఫీచర్ PR (`pr` మోడ్) — ని సవరించిన టెక్స్ట్ని రూపొందించిన నైపుణ్యాలను మాత్రమే తనిఖీ చేస్తుంది [, రూపొందించిన ఫైల్లు మరియు ఉత్పన్నమైన బేస్లైన్లను](#generated-files-and-derived-baselines-written-at-release) చూడండి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Provider logos/assetsకు నమోదు చేసిన provenance ఎంట్రీ ఉండాలి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON config ఫైళ్లు parse చేయబడాలి మరియు repo lint నియమాలను పాటించాలి                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | లోపాలు లేకుండా TypeScript compilation (సూచనాత్మక warnings మాత్రమే)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | అవును                                      |
| `typecheck:noimplicit:core`       | కఠినమైన `noImplicitAny` — భవిష్యత్ దృష్టితో; ఇప్పటికే ఉన్న అనేక call siteలకు ఇంకా annotations అవసరం                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **సూచనాత్మకం** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` `src/app/(dashboard)/**` పరిధికి పరిమితం చేయబడుతుంది (#7033) — `typecheck:core` యొక్క ఎంపిక చేసిన 27-ఫైల్ allowlistలో ఏ dashboard TSX కూడా లేదు, అలాగే `next build` కూడా దానిపై type-check చేయదు (`next.config.mjs` `ignoreBuildErrors: true`ని సెట్ చేస్తుంది), అందువల్ల అక్కడి orphaned-identifier regressions (#6625/#6909) CIకి కనిపించలేదు. స్థిరపరచిన ప్రతి-ఫైల్/ప్రతి-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`లోని అదే stale-enforcement నమూనా)తో తేడాలను పరిశీలిస్తుంది — baselined countను మించిన **కొత్త** errors మాత్రమే gateను విఫలమయ్యేలా చేస్తాయి; ఇప్పటికే ఉన్న error సరిచేయబడినప్పుడు `--update`తో ratchet down చేయండి.                                                                                                                                                                                                                                                                                    | అవును                                      |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ఉపరితల `typecheck:core` యొక్క 27-ఫైల్ అనుమతి జాబితా మరియు డ్యాష్బోర్డ్ గేట్పై పూర్తి-యాప్ ఉత్పత్తి రకం తనిఖీ. `config/quality/build-typecheck-baseline.json` వ్యతిరేకంగా తేడాలు; కొత్త లేదా పెరిగిన ప్రతి-(ఫైల్, కోడ్) కౌంట్ విఫలమైతే, తక్కువ గణన మిమ్మల్ని రాట్చెట్ చేయమని అడుగుతుంది. `--update` నిరాకరిస్తుంది, అయితే రన్లో `--force-regressions` పాస్ చేయబడితే తప్ప కొత్త లేదా పెంచబడిన జత ఉంటుంది మరియు `--force-nocheck` పాస్ చేయబడితే తప్ప కొత్తగా నిశ్శబ్దం చేయబడిన ఫైల్ను నిరాకరిస్తుంది, కాబట్టి ఆకుపచ్చ రంగులోకి వచ్చేలా బేస్లైన్ను విస్తరించడం మరియు శాశ్వత నిశ్శబ్దాన్ని మంజూరు చేయడం రెండు వేర్వేరు ఉద్దేశపూర్వక చర్యలు. ఒక బేర్ `--force` తిరస్కరించబడింది. `config/quality/ts-nocheck-baseline.json` వ్యతిరేకంగా `@ts-nocheck` కోసం బిల్డ్ స్కోప్ను కూడా స్కాన్ చేస్తుంది, ఎందుకంటే దానిని ఉపయోగించే ఫైల్ ఎటువంటి డయాగ్నస్టిక్లను నివేదించదు మరియు ప్రతి గేట్కు కనిపించదు. | అవును                                      |

#### రెండు టైప్చెక్ ప్రోగ్రామ్లు భిన్నంగా సమాధానం ఇస్తాయి

`typecheck:core` మరియు `check:build-typecheck` వేర్వేరు ఆప్షన్ల క్రింద విభిన్న ప్రోగ్రామ్లను కంపైల్ చేస్తాయి మరియు ఒకే ఫైల్ ఒకదానిలో శుభ్రంగా మరియు మరొకదానిలో పూర్తి ఎర్రర్లతో ఉంటుంది.

`tsconfig.build.json` `"strict": false` సెట్ చేస్తుంది, కాబట్టి `noImplicitAny` ఆఫ్ చేయబడింది. కోర్ కాన్ఫిగర్ కఠినమైన ఎంపికలతో క్యూరేటెడ్ 27-ఫైల్ అనుమతి జాబితాను కంపైల్ చేస్తుంది మరియు ప్రతి ఎంట్రీ యొక్క దిగుమతి గ్రాఫ్ను అనుసరిస్తుంది, కాబట్టి బిల్డ్ ప్రోగ్రామ్లో ఎప్పుడూ కనిపించని ఫైల్లు ఇప్పటికీ అక్కడ తనిఖీ చేయబడతాయి.

ఫైల్ టైప్ చేయబడిందో లేదో నిర్ధారించేటప్పుడు పర్యవసానంగా ముఖ్యమైనది:** `check:build-typecheck` కింద సున్నా డయాగ్నస్టిక్స్ అంటే సున్నా కాదు** . బిల్డ్ ప్రోగ్రామ్లో 26 ఫైల్ల నుండి `@ts-nocheck` తీసివేయడం వాటిలో 23 క్లీన్గా చూపబడింది; వాటిలో పదహారు 120 అవ్యక్తమైన వాటిలో ఏవైనా లోపాలు కనిపించాయి. ఫైల్ను క్లీన్గా పిలవడానికి ముందు రెండింటినీ తనిఖీ చేయండి.

### ఉద్యోగం: `quality-gate`

`test-coverage` తర్వాత నడుస్తుంది. విఫలమైనప్పుడు బ్లాక్లు విలీనం అవుతాయి.

| స్క్రిప్ట్                   | ధ్రువీకరిస్తుంది                                                                                                                                                                            | నిరోధించడం                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | `quality-metrics.json` (ESLint హెచ్చరిక గణన, విలీనమైన షార్డ్ నివేదిక నుండి కవరేజ్)ని విడుదల చేస్తుంది                                                                                       | అవును (రాట్చెట్ అప్స్ట్రీమ్) |
| `quality:ratchet`            | `quality-baseline.json` లోని ప్రతి మెట్రిక్ తిరోగమనం చెందలేదు (ESLint హెచ్చరికలు ≤ బేస్లైన్; కవరేజ్ ≥ బేస్లైన్)                                                                             | అవును                        |
| `check:duplication`          | కోడ్ డూప్లికేషన్ (jscpd@4) `quality-baseline.json` లో బేస్లైన్ను మించదు                                                                                                                     | అవును                        |
| `check:complexity`           | ఫైల్-స్థాయి సైక్లోమాటిక్ సంక్లిష్టత టోపీని మించదు (కోర్ ESLint `complexity` + `max-lines-per-function`)                                                                                     | అవును                        |
| `check:cognitive-complexity` | కాగ్నిటివ్ కాంప్లెక్సిటీ రాట్చెట్ (`eslint-plugin-sonarjs`) — ప్రత్యేక ESLint పాస్; CI రెండూ ఒకే `check:complexity-ratchets` స్టెప్గా విలీనం చేయబడ్డాయి                                     | అవును                        |
| `check:dead-code`            | ఉపయోగించని ఎగుమతులు / ఫైల్ల రాట్చెట్ (నిప్) బేస్లైన్కు వ్యతిరేకంగా తిరోగమనం చేయదు                                                                                                           | అవును                        |
| `check:compression-budget`   | కంప్రెషన్ బెంచ్మార్క్ బడ్జెట్ — పర్-ఇంజిన్ టోకెన్-పొదుపు అంతస్తులు తిరోగమనం చేయకూడదు                                                                                                        | అవును                        |
| `check:type-coverage`        | శాతం-టైప్ చేయబడిన రాట్చెట్ (`type-coverage`) తిరోగమనం చెందదు; ఎక్కువగా `typecheck:noimplicit:core` ఉపసంహరించుకుంటుంది                                                                       | అవును                        |
| `check:codeql-ratchet`       | ఓపెన్ CodeQL హెచ్చరిక గణన తిరోగమనం చెందదు ( `gh api` ద్వారా చదవబడుతుంది; ఆకర్షణీయంగా-టోకెన్ లేకుండా దాటవేయి) — రిఫ్రెష్ కాడెన్స్ మరియు మాన్యువల్ ట్రిగ్గర్: దిగువన "CodeQL రాట్చెట్" చూడండి | అవును                        |
| `check:type-scale-ratchet`   | కిట్ రకం స్కేల్: `src/` లో 12 px మరియు `font-bold` కంటే తక్కువ పరిమాణాలు మాత్రమే తగ్గుతాయి (`typeScaleSubFloorSizes`, `typeScaleFontBold`); ప్రీ-కమిట్ హుక్లో కూడా                          | అవును                        |

### ఉద్యోగం: `quality-extended`

Job-level `continue-on-error` లేకుండా ఉండే mixed job: `--ratchet` pass చేసే step, `quality-baseline.json` తో పోలిస్తే కొలిచిన regression ఉంటే jobను విఫలమయ్యేలా చేస్తుంది. `check:circular-deps` మరియు scanner install step మాత్రమే advisory (step-level `continue-on-error: true`). External scanners `gh release download` ద్వారా install అవుతాయి; gitleaks అందుబాటులో లేకపోతే `check:secrets` self-skip అవుతుంది (exit 0), measurement లేనప్పుడు `check:vuln-ratchet`, `check:workflows` మరియు `check:openapi-breaking` fail closed అవుతాయి.

| స్క్రిప్ట్               | ధ్రువీకరిస్తుంది                                                                                                                                                                                                                      | నిరోధించడం                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:circular-deps`    | వృత్తాకార డిపెండెన్సీలు లేవు (dpdm)                                                                                                                                                                                                   | **సలహా**                                       |
| `check:bundle-size`      | కట్ట పరిమాణం టోపీని మించదు; కొలవలేని పరిమాణం కూడా విఫలమవుతుంది                                                                                                                                                                        | **--ratchet తో నిరోధించడం**                    |
| `check:secrets`          | బైనరీ లేనట్లయితే రహస్య స్కానింగ్ (gitleaks) — దాటవేయబడుతుంది                                                                                                                                                                          | **--ratchet తో నిరోధించడం**                    |
| `check:vuln-ratchet`     | డిపెండెన్సీ వల్నరబిలిటీస్ (osv-స్కానర్) — `--ratchet` విఫలమైతే INCOMPLETE (నిష్క్రమణ 2) గా విఫలమవుతుంది                                                                                                                               | **--ratchet తో నిరోధించడం**                    |
| `check:workflows`        | వర్క్ఫ్లో లింట్ (actionlint + zizmor); missing/broken స్కానర్లు, చెల్లని నివేదికలు లేదా రాట్చెట్ బేస్లైన్ తప్పిపోయినవి INCOMPLETE వలె విఫలమయ్యాయి. చెల్లుబాటు అయ్యే ఫలితాలు ఎంచుకున్న strict/advisory/ratchet విధానాన్ని అనుసరిస్తాయి | అమలు అవసరం; CI లో జిజ్మోర్ రాట్చెట్ నిరోధించడం |
| `check:openapi-breaking` | పిన్ చేయబడిన ఈవెంట్ కమిట్లకు వ్యతిరేకంగా పబ్లిక్ API కాంట్రాక్ట్ (PR విలీనం-బేస్, పుష్ బిఫోర్, మెర్జ్-గ్రూప్ బేస్; scheduled/manual చెక్అవుట్ ఫస్ట్ పేరెంట్); అవసరమైన కొలత విఫలమైంది మూసివేయబడింది                                    | **--ratchet తో నిరోధించడం**                    |

### ఉద్యోగం: `docs-sync-strict`

ప్రతి PR నుండి `main` వరకు నడుస్తుంది. విఫలమైనప్పుడు బ్లాక్లు విలీనం అవుతాయి.

| స్క్రిప్ట్                     | ధ్రువీకరిస్తుంది                                                                                                                                              | నిరోధించడం                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | దిగువ 6 ఉప-గేట్లను వరుసగా నడుపుతున్న మెటా-గేట్                                                                                                                | అవును                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI వెర్షన్ స్థిరత్వం; విడుదల విధానం 66 `llm.txt` అద్దాలు మరియు అనువదించబడిన CHANGELOG విభాగాలు (PR మోడ్: మిర్రర్స్ అంగీకరిస్తాయి)            | అవును                            |
| ↳ `check:docs-counts`          | గద్యంలో గణనలు (ప్రొవైడర్ కౌంట్, మైగ్రేషన్ కౌంట్, మొదలైనవి). రెండు మోడ్లు: `pr` ఫీచర్ PRs, `release` వేరే చోట — క్రింద "ఉత్పన్న విలువలు" చూడండి                | అవును                            |
| ↳ `check:env-doc-sync`         | `.env.example` లోని ప్రతి env var డాక్స్ పట్టికలో డాక్యుమెంట్ చేయబడింది మరియు దీనికి విరుద్ధంగా ఉంటుంది                                                       | అవును                            |
| ↳ `check:deprecated-versions`  | డాక్స్లో నిలిపివేయబడిన సంస్కరణ స్ట్రింగ్లు లేవు                                                                                                               | అవును                            |
| ↳ `check:doc-links`            | డాక్స్లోని అంతర్గత మార్క్డౌన్ లింక్లు నిజమైన ఫైల్లకు పరిష్కరిస్తాయి (`[text]`/`(path)` రూపం)                                                                  | అవును                            |
| ↳ `check:fabricated-docs`      | డాక్స్లో ఉదహరించబడిన రూట్లు, env vars, CLI ఆదేశాలు, హుక్ పేర్లు మరియు ఫైల్ పాత్లు కోడ్బేస్లో ఉన్నాయి. `--strict` ద్వారా హార్డ్ గేట్; జెండా లేకుండా soft-fail. | అవును ( CI లో `--strict` ద్వారా) |
| `check:cli-i18n`               | CLI `t()` కీలు `bin/cli/locales/en.json` (రెండు మోడ్లు)లో ఉన్నాయి; విడుదల మోడ్లో మాత్రమే `en.json` తో pt-BR / zh-CN / zh-TW సమానత్వం                          | అవును                            |
| `check:openapi-coverage`       | OpenAPI స్పెక్ నిజమైన మార్గాలలో కనీసం ఒక రేట్చెట్ ఫ్లోర్ను కవర్ చేస్తుంది                                                                                     | అవును                            |
| `check:openapi-security-tiers` | `openapi.yaml` లోని భద్రతా శ్రేణి ఉల్లేఖనాలు `routeGuard.ts` వర్గీకరణలకు అనుగుణంగా ఉంటాయి                                                                     | **సలహా**                         |
| `check:openapi-routes`         | `openapi.yaml` లోని ప్రతి మార్గం నిజమైన `route.ts` (యాంటీ హాలూసినేషన్)కి పరిష్కరిస్తుంది                                                                      | అవును                            |
| `check:docs-symbols`           | `docs/**/*.md` లోని ప్రతి `/api/...` రిఫరెన్స్ నిజమైన `route.ts` (యాంటీ హాలూసినేషన్)కి పరిష్కరిస్తుంది                                                        | అవును                            |
| `i18n translation drift`       | PRs పై`docs/i18n/**` మిర్రర్స్ vs `.i18n-state.json` — సలహా                                                                                                   | **సలహా** PRs పై                  |

#### అనువాద అద్దాలు ఉత్పన్నమైన ఫైల్లు (PR మోడ్ vs విడుదల మోడ్)

ఒక ఫీచర్ PR ఆంగ్ల మూలాలను మాత్రమే సవరిస్తుంది. `docs/i18n/<locale>/**` అద్దాలు (66 `llm.txt` కాపీలు మరియు అనువదించబడిన `CHANGELOG.md` ఫైల్లతో సహా) మరియు `.i18n-state.json` అనువాద తరంగం (`docs/i18n-*` / `chore/i18n-*` శాఖలు, షెడ్యూల్ చేయబడిన `i18n-mirror-refresh.yml`) మరియు విడుదల (`npm run release:sync-changelog-i18n`) ద్వారా ఒక దశలో తిరిగి వ్రాయబడతాయి. అందువల్ల మిర్రర్ గేట్లు రెండు రీతుల్లో నడుస్తాయి, `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, తర్వాత `OMNIROUTE_GATE_MODE`, ఆపై చర్యల ఈవెంట్; స్థానిక రన్ `release`) ద్వారా పరిష్కరించబడుతుంది:

- `check:docs-sync` — విడుదల మోడ్లో ప్రతి తనిఖీ నడుస్తుంది. PR మోడ్లో package.json/OpenAPI వెర్షన్,
  root CHANGELOG శీర్షికలు మరియు superseded-docs guard అలాగే ఉంటాయి, అలాగే `llm.txt` mirror copies మరియు అనువదించిన CHANGELOG విభాగాల కోసం
  `SKIP reason=pr-mode` ముద్రిస్తుంది — అయితే PR mirrors రాస్తే: `config/quality/derived-paths/*.json`లో
  `docs/i18n/**` family యొక్క writerగా ప్రకటించిన head branch రెండు తనిఖీలను కఠినంగా నడుపుతుంది, మరియు diff base
  resolve అయితే, తన స్వంత diff `docs/i18n/<locale>/llm.txt` లేదా `CHANGELOG.md`ను సవరించే మార్పు సంబంధిత
  తనిఖీని కఠినంగా నడుపుతుంది. depth-1 checkout (`docs-sync-strict` job)లో diff base resolve కాదు, కాబట్టి PR మోడ్కు
  base అవసరం లేని ఒక తనిఖీ కూడా నడుస్తుంది: ప్రతి `llm.txt` mirror ఉండాలి, తన `---` separatorను ఉంచాలి మరియు
  root body లేదా ఎక్కువ mirrors పంచుకునే bodyలో ఏదో ఒకదాన్ని కలిగి ఉండాలి. Base మారితే అన్ని mirrors సమానంగా
  పాతబడినవిగా ఉంటాయి, అయినా తనిఖీ విజయవంతమవుతుంది; ఒక mirrorను చేతితో సవరించినప్పుడు విఫలమవుతుంది. depth-1 PR
  checkoutలో అనువదించిన `CHANGELOG.md` ఫైళ్లకు ఇలాంటి తనిఖీ లేదు.

- pre-commit hook `check-docs-sync.mjs --mode=pr`ను నడుపుతుంది: commit దాని ప్రభావం ఆధారంగా
  తీర్పు పొందుతుంది. Flag లేకుండా local run release modeలో ఉంటుంది, మరియు root `llm.txt`ను సవరించే ఒక merged PR
  wave నడిచే వరకు ఆ baseపై వచ్చే ప్రతి తదుపరి commitను అడ్డుకుంటుంది. Husky hook నడిపే mode-aware gate ఏదైనా
  ఇదే నియమాన్ని అనుసరిస్తుంది: hook `--mode=pr`ను పంపుతుంది, మరియు strict verdict release-mode runsతోనే ఉంటుంది
  (release PR, `main`కు pushes, plain local run).
- మిర్రర్-కంటెంట్ యూనిట్ పరీక్షలు (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — విడుదల మోడ్ ప్రతి లొకేల్ను నిర్ధారిస్తుంది. PR మోడ్ `.i18n-state.json` (పూర్తి-ఫైల్ హాష్ లేదా విభాగం యొక్క రికార్డ్ చేయబడిన విభాగం హాష్ పరీక్ష పిన్స్) ప్రకారం ఆంగ్ల మూలంతో ప్రస్తుత మిర్రర్లను మాత్రమే నిర్ధారిస్తుంది మరియు పాత వాటిని ఒక కారణంతో దాటవేస్తుంది. `target_hash` ప్రోవెన్స్ చెక్లు ప్రతి లొకేల్కు రెండు మోడ్లలో అమలు చేయబడతాయి. తాజాదనం `## ` విభాగానికి, యూనిట్ `run-translation.mjs` హ్యాష్లు; ఒక పొడవైన విభాగం (ఈ ఫైల్ యొక్క గేట్ ఇన్వెంటరీ దానిలో దాదాపు సగం ఉంటుంది) అంటే దానిలోని ఏదైనా సవరణ ఆ అద్దాలను పాతదిగా వదిలివేస్తుంది మరియు వారి PR-మోడ్ వాదనలు తదుపరి వేవ్ వరకు దాటవేయబడతాయి. ఆంగ్ల మూలం ఇకపై లేని యాంకర్ మొత్తం-ఫైల్ పోలికకు తిరిగి వస్తుంది.
- PRs పై`i18n translation drift` — అడ్వైజరీ, పుష్పై కఠినంగా, రాత్రిపూట మరియు విడుదల కట్, కాబట్టి పాత అద్దం విడుదలలో రవాణా చేయబడదు.

`scripts/i18n/sync-llm-mirrors.mjs` (`syncLlmMirrors()`గా కూడా export చేయబడుతుంది, `--dry-run`తో)
`llm.txt` mirrorsను తిరిగి రాస్తుంది; release refresh, translation wave మరియు scheduled
`i18n-mirror-refresh.yml` దీన్ని నడుపుతాయి (refresh stale `llm.txt` mirrorsను dry runతో గుర్తిస్తుంది, ఎందుకంటే
drift report వాటిని జాబితా చేయదు, మరియు `check:docs-all`కు ముందు వాటిని sync చేస్తుంది).

`docs/diagrams/` కింద ఉన్న పన్నెండు README SVGలు generated (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` వాటన్నింటినీ తిరిగి generate చేస్తుంది). ప్రతి దానికి byte-compare unit test
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ఉంటుంది; release modeలో committed file staleగా
ఉన్నప్పుడు అది విఫలమవుతుంది; PRలో, `check:generated-artifacts` PR సవరించే SVGను నిర్ణయిస్తుంది, base యొక్క
driftను release refreshకు వదిలేస్తుంది (చూడండి [Generated files and derived baselines written at release](#generated-files-and-derived-baselines-written-at-release)) — మరియు `check:docs-counts` canonical numbersను వాటి `<text>` nodes నుంచి చదువుతుంది — అందుకే
outlining step ప్రతి outlined stringను invisible `<text>`గా fileలో ఉంచుతుంది. SVG canonical-numbers check
`SVG_DIAGRAM_FILES`లో జాబితా చేసిన ఫైళ్లను చదువుతుంది (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, అలాగే `public/images/tier-flow-dark.svg` మరియు `tier-flow-light.svg`;
free-forever, catalog-entry, recurring-pool మరియు scoring-factors claims కూడా
`promise-pillars.svg`, `free-tier-budget.svg` మరియు `strategies-grid.svg`ను చదువుతాయి. ఈ generators గీసే
counts (provider total, MCP tools, routing strategies, free-forever providers, …) literals నుంచి కాకుండా
`scripts/docs/readmeFacts.mjs` ద్వారా facts snapshot `docs/reference/derived-facts.json` నుంచి వస్తాయి, కాబట్టి
ఏ branchలోనైనా diagramను తిరిగి generate చేస్తే committed file పునరుత్పత్తి అవుతుంది.
`free-tier-budget.svg` తన rowsను కూడా అదే snapshot (`code.freeTierBudget`, facts probe నమోదు చేసే catalog
summary) నుంచి గీస్తుంది, కాబట్టి `FREE_MODEL_BUDGETS`లో మార్పు తదుపరి refreshలో cardకు చేరుతుంది, CI ఎర్రగా మారదు.

### ఉత్పన్నమైన విలువలు: `pr` మరియు `release` గేట్ మోడ్లు

ఫీచర్ PR దాని బేస్ స్థితిపై ఆధారపడి ఉండే విలువను ఎప్పుడూ వ్రాయదు: ప్రొవైడర్, మైగ్రేషన్, MCP-టూల్ మరియు స్ట్రాటజీ గణనలు, README SVG సంఖ్యలు, వాస్తవాల స్నాప్షాట్. ఒక దశ వాటన్నింటినీ రీకంప్యూట్ చేస్తుంది, `npm run release:refresh-derived`, విడుదల ద్వారా మరియు రాత్రిపూట ఉత్పన్నమైన రిఫ్రెష్ PR ద్వారా అమలు చేయబడుతుంది. కాబట్టి** విడుదలల మధ్య బేస్ డిజైన్ ద్వారా లైవ్ కోడ్ వెనుక ఉంటుంది** , మరియు ఒక తోబుట్టువు ప్రొవైడర్ని జోడించిన తర్వాత ట్రీని లైవ్ కోడ్తో పోల్చిన గేట్ లేదా టెస్ట్ ప్రతి PR లో ఎరుపు రంగులో ఉంటుంది. కాబట్టి ఉత్పన్నమైన విలువలను నిర్ధారించే గేట్లు రెండు మోడ్లలో ఒకదానిలో నడుస్తాయి, `scripts/check/lib/gateMode.mjs` ద్వారా పరిష్కరించబడతాయి (మొదటి మ్యాచ్ విజయాలు):

1. కమాండ్ లైన్లో`--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` ఎన్విరాన్మెంట్ వేరియబుల్ (`pr` లేదా `release`);
3. స్వయంచాలకంగా, GitHub చర్యల ఈవెంట్ నుండి: ఒక `pull_request` తల `release/v*` కాదు , ఒక `merge_group`, లేదా `omni-queue/**` → `pr` కి పుష్; మిగతావన్నీ (పుష్, షెడ్యూల్, డిస్పాచ్, విడుదల PR `release/v* → main`, ఏదైనా స్థానిక రన్) → `release`.

ప్రతి మోడ్లో ఏ `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) విఫలమవుతుంది:

| మోడ్      | విఫలమవుతుంది                                                                                                                                                                                                                                                                                                                                                                                                         | ప్రత్యక్ష వాస్తవాలు కావాలి |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `release` | ప్రతి తనిఖీ, చెట్టు నుండి సేకరించిన వాస్తవాలకు వ్యతిరేకంగా ఖచ్చితమైన సమానత్వం (గేట్ ఎల్లప్పుడూ కలిగి ఉండే ప్రవర్తన): పాత గణన, వెర్షన్, కవరేజ్ ఫ్లోర్ లేదా SVG సంఖ్య STRICT డ్రిఫ్ట్                                                                                                                                                                                                                                  | అవును                      |
| `pr`      | అదే క్లెయిమ్ ఎక్స్ట్రాక్టర్లతో PR బేస్కు భిన్నంగా మార్పు చేసినది మాత్రమే: (1) ఆ తనిఖీ మరియు ఫైల్కు బేస్లో లేని నిర్వహించబడే విలువ ("PR సవరించబడిన ఒక మేనేజ్డ్ నంబర్ — లైన్ను బేస్ టెక్స్ట్కి పునరుద్ధరించండి"); (2) అవసరమైన క్లెయిమ్ ఆధారం తీసుకువెళ్లడం మరియు తల కోల్పోయింది. వాస్తవాలు అవసరం లేని కంటెంట్ ఇన్వేరియంట్లు విడుదల మోడ్లో అమలు చేయబడతాయి; విడుదల-మాత్రమే తనిఖీలు జాబితా చేయబడ్డాయి మరియు దాటవేయబడ్డాయి | నం                         |

ఏజెంట్-ఇన్స్ట్రక్షన్ ఫైల్స్ క్యారీ** సంఖ్య** ఉత్పన్నమైన గణన మొత్తం: `AGENTS.md`, `llm.txt` (మరియు దాని `docs/i18n/*/llm.txt` కాపీలు), bs `AGENTS.md` ఫోర్క్, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` మరియు ప్రతి `skills/*/SKILL.md` పాయింట్ మూలానికి (ఉదాహరణకు `src/shared/constants/routingStrategies.ts` లో `ROUTING_STRATEGY_VALUES` ) మరియు బదులుగా `npm run facts`. మార్పులేని "ఉత్పన్న గణనలు లేవు (ఏజెంట్-ఇన్స్ట్రక్షన్ ఫైల్ …)" రెండు మోడ్లలో (ప్రొవైడర్లు, మైగ్రేషన్లు, MCP సాధనాలు మరియు స్కోప్లు, రూటింగ్ వ్యూహాలు, స్కోరింగ్ కారకాలు, మోడ్ ప్యాక్లు) గణనలో విఫలమవుతుంది, కాబట్టి విడుదల రిఫ్రెష్ సూచన ఫైల్ను తిరిగి వ్రాయవలసిన అవసరం లేదు.

`pr` మోడ్లో రైటర్ బ్రాంచ్లు నిర్వహించబడే విలువలను సవరించవచ్చు: `chore/derived-*` (రాత్రిపూట రిఫ్రెష్ PR), `release/v*`, మరియు అనువాద తరంగాలు `docs/i18n-*` మరియు `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). క్యూ బ్యాచ్లు (`merge_group`, మెర్జిఫై డ్రాఫ్ట్లు, `omni-queue/**`) మళ్లీ అంచనా వేయబడవు: అవి PRs గేట్ని ఇప్పటికే ఒక్కొక్కటిగా నిర్ణయించాయి.

నిష్క్రమణ కోడ్లు: `0` క్లీన్ · `1` STRICT డ్రిఫ్ట్ (లేదా `--strict` తో సాఫ్ట్ డ్రిఫ్ట్) లేదా నిర్వహించబడే-విలువ CI· `2` ఇన్ఫ్రాస్ట్రక్చర్ — కోడ్ వాస్తవాలను సేకరించడం సాధ్యం కాలేదు (tsx ప్రోబ్ విఫలమైంది లేదా సమయం ముగిసింది; సమయం ముగిసింది `OMNIROUTE_FACTS_TIMEOUT_MS`, డిఫాల్ట్ 60, 0 PR తేడా బేస్ పరిష్కరించబడలేదు. నిష్క్రమణ 2 ఎప్పుడూ డాక్యుమెంటేషన్ డైవర్జెన్స్ కాదు: ఉద్యోగాన్ని మళ్లీ అమలు చేయండి లేదా పర్యావరణాన్ని పరిష్కరించండి.

ప్రతి మోడ్ ఎక్కడ నడుస్తుంది:

| ఎక్కడ                                                                                                    | మోడ్                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ఫీచర్ PR — `ci.yml` job `docs-sync-strict`, `quality.yml` దశ "డాక్స్ ఖచ్చితత్వం"                         | `pr` (ఆటోమేటిక్); జాబ్ బేస్ను `BASE_SHA` గా దాటి `fetch-depth: 2` తో చెక్ అవుట్ చేస్తుంది                                                                                                                     |
| `merge_group`, `omni-queue/**` అభ్యర్థులు, విలీనం రైలు యొక్క పూర్తి గేట్ జాబితా                          | `pr`                                                                                                                                                                                                          |
| విడుదల PR (`release/v* → main`), పుష్లు, షెడ్యూల్డ్ మరియు మాన్యువల్ పరుగులు                              | `release`                                                                                                                                                                                                     |
| విడుదల-ఆకుపచ్చ (`scripts/quality/validate-release-green.mjs`)                                            | HARD అంశాలు `OMNIROUTE_GATE_MODE=pr` తో నడుస్తాయి ("బేస్ విచ్ఛిన్నమైందా?"); DRIFT అంశం `derived-refresh` `npm run release:refresh-derived -- --check` నడుపుతుంది (కఠినమైన వీక్షణ, బేస్-రెడ్ని ఎప్పుడూ తెరవదు) |
| విడుదల (`/generate-release` దశలు 0a మరియు 1; నైపుణ్యం వైరింగ్ అనేది ఒక ప్రత్యేక యజమాని-ఆమోదించిన మార్పు) | `npm run release:refresh-derived` ఉత్పన్నమైన ఫైల్లను వ్రాస్తుంది; విడుదల PR యొక్క స్వంత తనిఖీలు అప్పుడు `release` మోడ్లో అమలు చేయబడతాయి                                                                       |
| `nightly-derived-refresh.yml` (రోజువారీ, అత్యధిక `release/vX.Y.Z`, విడుదల-ఫ్రీజ్ కింద దాటవేయబడింది)      | `npm run release:refresh-derived -- --profile=nightly`; ఒక తేడాలో ఇది `chore/derived-refresh` నుండి ONE PR తెరిచి ఉంచుతుంది; ఎప్పుడూ విలీనం కాదు                                                              |

దీని వెనుక ఉన్న ఆదేశాలు:

- `npm run facts` ప్రతి ఉత్పన్న సంఖ్యను JSONగా ముద్రిస్తుంది (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` ఒక విలువను ముద్రిస్తుంది, `--snapshot` లైవ్ ట్రీకి బదులుగా
  కమిట్ చేసిన స్నాప్షాట్ను చదువుతుంది. వాస్తవాలను సేకరించలేకపోతే ఎగ్జిట్ 2.

- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) ఉత్పన్న
  ఫైళ్లను ఒకే పాస్లో, ఈ క్రమంలో, మళ్లీ లెక్కిస్తుంది (`--only=` కోసం స్టెప్ ఐడీలు):
  `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (స్నాప్షాట్), `numbers` (కౌంట్స్ గేట్ యొక్క
  రీరైట్ ప్లాన్ను డాక్యుమెంట్లకు వర్తింపజేసి, ఆపై వాటి `docs/i18n/` మిరర్లకు తీసుకెళ్తుంది),
  `readme-diagrams`, `skills` (జనరేట్ చేసిన `SKILL.md`), `e2e-timings` (ట్రీలో
  `syncE2eTimings` వచ్చే వరకు దాటవేయబడుతుంది), `ui-keys` (`en.json` నుంచి తొలగించబడిన
  కీలను తొలగిస్తుంది మరియు `--rewritten-since=<ref>`తో — డిఫాల్ట్ `origin/main` —
  చివరి రిలీజ్ నుంచి రీరైట్ చేయబడిన ఇంగ్లీష్ విలువలను మళ్లీ క్యూలో ఉంచుతుంది),
  `llm-mirrors` మరియు `verify-generated` (రచన తర్వాత, రిలీజ్ మోడ్లో
  `check:generated-artifacts` మరియు `check:agent-skills-sync` విజయవంతం కావాలి;
  `--check`లో మరియు `--only` దానిని చేర్చనప్పుడు దాటవేయబడుతుంది; వైఫల్యం ఎగ్జిట్ 2).
  `changelog` స్టెప్ ఐచ్ఛికం (`--with-changelog`, రిలీజ్ ప్రొఫైల్లో మాత్రమే).
  `--profile=nightly` ఎప్పుడూ వెర్షన్ క్లెయిమ్ను తాకదు. `-- --check`తో ఇది ఏదీ రాయకుండా,
  ఏదైనా ఫైల్ మారే అవకాశం ఉన్నప్పుడు లేదా మేనేజ్ చేయబడిన విలువకు మాన్యువల్ ఎడిట్ అవసరమైనప్పుడు
  రెండింటినీ జాబితా చేస్తూ ఎగ్జిట్ 1తో ముగుస్తుంది; ఇన్ఫ్రాస్ట్రక్చర్ వైఫల్యానికి ఎగ్జిట్ 2.
  `--json` ఫలితాన్ని JSONగా ముద్రిస్తుంది.

  అదే రన్‌లో పరిసరాల ద్వారా లేదా `.env` ద్వారా కాన్ఫిగర్ చేసిన బ్యాకెండ్‌ (కేవలం `OMNIROUTE_TRANSLATION_*` కీలు మాత్రమే చదవబడతాయి) లేదా Google ఇంజిన్ ఆ విలువలను అనువదిస్తుంది. బ్యాకెండ్ లేకపోతే, సాధారణంగా `__MISSING__` మార్కర్లు వ్రాయబడవు: release ప్రొఫైల్ విఫలమవుతుంది, nightly ఆ కీలను దాటవేస్తుంది. `--allow-untranslated` ఇచ్చినప్పుడు మాత్రమే ఆ మార్కర్లు ఉద్దేశపూర్వకంగా వ్రాయబడతాయి.

- `docs/reference/derived-facts.json` అనేది చివరిగా ఉపయోగించిన వాస్తవాల యొక్క స్నాప్షాట్. రిఫ్రెష్ మాత్రమే దానిని వ్రాస్తుంది. README SVG జెనరేటర్లు దీన్ని చదువుతాయి మరియు PR-టైమ్ యూనిట్ పరీక్షలు దానితో కట్టుబడి ఉన్న డాక్స్ మరియు రూపొందించిన ఫైల్లను — లైవ్ కోడ్తో పోల్చవు. సూట్ యొక్క సింగిల్ లైవ్ పోలిక `tests/unit/check-docs-counts-sync.test.ts` లో "విడుదల రిఫ్రెష్ క్లోజ్ ది సైకిల్" : ప్రత్యక్ష వాస్తవాలతో, మెమరీలో వర్తింపజేయబడిన రిఫ్రెష్ రీరైట్ ప్లాన్ రిపోర్ట్ చేయని STRICT డ్రిఫ్ట్ను వదిలివేయదు మరియు రీ-ప్లానింగ్ ఏమీ మార్చదు.

స్థానికంగా పునరుత్పత్తి చేయడానికి (ఒక స్థానిక రన్ డిఫాల్ట్గా `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

పరిష్కరించగల బేస్ లేకుండా ( `BASE_SHA`/`BASE_REF` లేదు, స్థానిక `origin/release/v<version>` లేదు) స్థానిక `pr` రన్ హెచ్చరికను ప్రింట్ చేస్తుంది మరియు విఫలమయ్యే బదులు తేడాను దాటవేస్తుంది.

### ఉద్యోగం: `i18n-ui-coverage`

| స్క్రిప్ట్                         | ధ్రువీకరిస్తుంది                                                                                                                                                                           | నిరోధించడం                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `check-ui-keys-coverage` (ఇన్లైన్) | UI i18n కీ కవరేజ్ ≥ 65%                                                                                                                                                                    | అవును (రెండు మోడ్లు)        |
| `check:ui-icu`                     | ప్రతి UI కేటలాగ్లోని ప్రతి సందేశం `IntlMessageFormat` తో కంపైల్ అవుతుంది                                                                                                                   | అవును (రెండు మోడ్లు)        |
| `check-ui-value-drift` (ఇన్లైన్)   | తిరిగి వ్రాసిన ఇంగ్లీషు** విలువ** పాత అనువాదాన్ని వదిలివేయదు                                                                                                                               | అవును (విడుదల మోడ్ మాత్రమే) |
| `check-new-key-coverage` (ఇన్లైన్) | ఎ** కొత్త** ప్రతి లొకేల్ — లో ఆంగ్ల కీ అనువదించబడుతుంది మరియు `__MISSING__:` మార్కర్ తిరస్కరించబడుతుంది                                                                                    | అవును (విడుదల మోడ్ మాత్రమే) |
| `check-key-completeness` (ఇన్లైన్) | ప్రతి UI కేటలాగ్ (మరియు, `--catalog=cli` తో, ప్రతి CLI కేటలాగ్) ఖచ్చితంగా దాని `en.json` కీ సెట్ను కలిగి ఉంటుంది; `pr` మోడ్లో, ప్రతి కేటలాగ్ PR విలీన స్థావరం వద్ద తనకు తానుగా మార్చుకుంది | అవును (రెండు మోడ్లు)        |
| `check-translation-ratio`          | ప్రతి లొకేల్కు వాస్తవ-అనువాద నిష్పత్తి (ఒకేలా-ఇంగ్లీష్/ప్లేస్హోల్డర్/అనుమత జాబితా వెలుపల ఉన్న లీవ్లు) `config/quality/i18n-translation-baseline.json` + స్లాక్ని మించకూడదు                 | అవును (విడుదల మోడ్ మాత్రమే) |

విలీన స్థావరానికి వ్యతిరేకంగా `fetch-depth: 0` — విలువ-డ్రిఫ్ట్ గేట్ `en.json` తేడా ఉంటుంది.

**రెండు మోడ్లు (2026-11-13 నుంచి).** ఒక ఫీచర్ PR `en.json`లో (మరియు
`bin/cli/locales/en.json`లో) కీలను జోడిస్తుంది లేదా రీరైట్ చేస్తుంది, ఇతర లోకేల్లను తాకదు;
`check:pr-derived-paths` (`pr-test-policy` జాబ్, `config/quality/derived-paths/translation.json`
ఫ్యామిలీ) అలా చేసే ఫీచర్ PRను విఫలమయ్యేలా చేస్తుంది. ఇతర లోకేల్లు ప్రతి రిలీజ్కు ఒకసారి
`release:refresh-derived` ద్వారా పూర్తవుతాయి; ఇది
`scripts/i18n/sync-ui-keys.mjs`లోని `syncUiKeys()`ను పిలుస్తుంది (మిస్సింగ్ కీలను జోడించడం,
తొలగించిన వాటిని తొలగించడం, రీరైట్ చేసిన ఇంగ్లీష్ అనువాదాలను `rewrittenSinceRef`తో గుర్తించడం,
అనువదించడం), లేదా అనువాద వేవ్ ద్వారా పూర్తవుతాయి. గేట్లు మోడ్ను
`scripts/check/lib/gateMode.mjs` నుంచి చదువుతాయి: `pr` మోడ్లో (ఫీచర్ PRలు,
`merge_group`, `omni-queue/**`) పైన పేర్కొన్న రిలీజ్-మోడ్ గేట్లు `SKIP reason=pr-mode`ను
ముద్రించి 0తో ముగుస్తాయి; `release` మోడ్లో (రిలీజ్ PR, `main`కు పుష్లు,
`workflow_dispatch`, స్థానిక రన్లు) అవి మునుపటిలాగే కఠినంగా ఉంటాయి, మరియు రిలీజ్ PRలో
డిఫ్-అవేర్ గేట్లకు `BASE_REF=origin/main` లభిస్తుంది, కాబట్టి అవి సైకిల్ జోడించిన లేదా
రీరైట్ చేసిన ప్రతి కీపై తీర్పు ఇస్తాయి. `--mode=pr`తో ఫీచర్-PR తీర్పును స్థానికంగా
ప్రివ్యూ చేయండి.

`pr` మోడ్లో locale catalogsను ఇప్పటికీ మార్చే PR (translation wave, release refresh, translation-only fix) skip చేయబడదు: `check-key-completeness` మార్చిన ప్రతి catalogను merge base వద్ద ఉన్న అదే catalogతో (`scripts/i18n/lib/touched-catalogs.mjs`) పోల్చి, catalog కోల్పోయిన key, `en.json`లో లేని key, నిజమైన translation `__MISSING__:` markerగా లేదా English textగా మారడం, లేదా PR మార్చని English stringలోని placeholders/tagsను ఇక interpolate చేయని value వంటి వాటిపై విఫలమవుతుంది. PRలో కొత్తగా వచ్చిన catalog మొత్తం `en.json` key setను కలిగి ఉండాలి. PR తాకిన catalogsకు ratio మరియు CLI-parity gates చూసే విషయాలను ఇది కవర్ చేస్తుంది.

లొకేల్-పారిటీ యూనిట్ పరీక్షలు (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` ద్వారా అదే మోడ్లను అనుసరిస్తాయి: `pr` మోడ్లో వారు కీ-పారిటీ ప్రకటనలను దాటవేస్తారు మరియు విలీనమైనప్పటి నుండి ఇంగ్లీష్ మారిన కీల ప్లేస్హోల్డర్ పారిటీని రిఫ్రెష్ చేసి విడుదలకు వదిలివేస్తారు (యూనిట్ బేస్ చదవలేని ప్రతి కీని తనిఖీ చేయడం). ఆ సహాయకుడు** మాత్రమే** మంజూరైన మోడ్-షరతులతో కూడిన స్కిప్: `check:test-masking` `.skip(` మరియు `{ skip: true }` ని గణిస్తుంది కానీ అది తిరిగి ఇచ్చే కంప్యూటెడ్ `{ skip: "<reason>" }` కాదు, కాబట్టి `tests/unit/locale-parity-mode.test.ts` దానిని ఉపయోగించడానికి అనుమతించబడిన పరీక్షల జాబితాను పిన్ చేస్తుంది — జోడించడం ద్వారా ఆ జాబితాకు సమీక్షించిన సవరణ.

#### `check-ui-value-drift` — పాత-అనువాద గేట్

ఇతర గేట్లు నిర్మాణాత్మకంగా చూడలేని ఒక i18n రిగ్రెషన్ను క్యాచ్ చేస్తుంది: ఒక ఆంగ్ల విలువ తిరిగి వ్రాయబడింది మరియు _previous_ ఆంగ్లం నుండి వచ్చిన అనువాదాలు వెనుకబడి ఉంటాయి, కాబట్టి ఆంగ్లేతర వినియోగదారులు నమ్మకంగా పదాలు, ఇప్పుడు తప్పు కాపీని చదువుతూ ఉంటారు.

ఇది వాస్తవంగా రవాణా చేయబడింది. యాంటీగ్రావిటీ లాగిన్ హెల్పర్ ల్యాండ్ అయినప్పుడు `oauthModal.googleOAuthWarning` తిరిగి వ్రాయబడింది (#5203);** 43 లొకేల్లలో 39** "పూర్తి URL ని కాపీ చేసి, దిగువన అతికించండి" — ఆ ప్రొవైడర్కు పూర్తి చేయలేని ప్రవాహాన్ని ఆపరేటర్లకు చెప్పే వచనాన్ని ఉంచింది. ఇది #8463 వరకు గుర్తించబడలేదు ఎందుకంటే:

- `sync-ui-keys` మాత్రమే బ్యాక్ఫిల్స్ కీలు** గైర్హాజరు** , ఎప్పుడూ లేనివి** పాతది** ;
- `check-ui-keys-coverage` కీ _ ఉనికిని గణిస్తుంది, కాబట్టి పాత అనువాదం కవర్ చేయబడినట్లుగా స్కోర్ చేస్తుంది;
- `check-translation-drift` `docs/i18n/<locale>/**.md` డాక్యుమెంటేషన్ను ట్రాక్ చేస్తుంది — అది ఎప్పుడూ `src/i18n/messages/*.json` చదవదు. ఇది జాబ్ `docs-sync-strict` లో నడుస్తుంది: PRs పై సలహా, పుష్ మరియు రాత్రిపూట కఠినంగా ఉంటుంది; అనువాద తరంగం అద్దాలను రిఫ్రెష్ చేస్తుంది, ఫీచర్ PR కాదు.

**డిఫ్-అవేర్, బేస్లైన్-బ్యాక్డ్ కాదు.** ఇది వర్కింగ్ ట్రీకి వ్యతిరేకంగా విలీనం బేస్ వద్ద `en.json` పోలుస్తుంది; ఆంగ్ల విలువ మారిన ప్రతి కీ కోసం, ఇప్పటికీ తాకబడని అనువాదాన్ని కలిగి ఉన్న ఏదైనా లొకేల్ పాతది. ఇది ఉద్దేశపూర్వకంగా** ముందుగా ఉన్న రుణాన్ని స్తంభింపజేస్తుంది** — a diff ఏ పాత ఇంగ్లీషు నుండి దీర్ఘకాల అనువాదం వచ్చిందో వెల్లడించలేదు, కాబట్టి గేట్ ప్రస్తుత మార్పు ఏది తాకిందో మాత్రమే నిర్ణయిస్తుంది. ప్రత్యామ్నాయం (ప్రతి-కీ హాష్ బేస్లైన్) కోసం ~ 600 KB రూపొందించిన ఫైల్, 3 × ఇప్పటికే ఉన్న అతిపెద్ద బేస్లైన్, ప్రతి i18n PR పై చర్నింగ్ అవుతుంది.

దానిని సంతృప్తి పరచడానికి రెండు మార్గాలు:

1. ప్రభావిత అనువాదాలను నవీకరించండి లేదా
2. వాటిని `__MISSING__:<new english>` — కి సెట్ చేయండి రన్టైమ్ ఆపై సరిదిద్దబడిన ఇంగ్లీష్ (`src/i18n/request.ts::deepMergeFallback`, #7258) మరియు అనువాదం కోసం కీ క్యూలను అందిస్తుంది.

స్ట్రింగ్ అయితే** అర్థం** మార్చబడింది, ఇష్టపడతారు** కీ పేరు మార్చడం** : కొత్త కీ పాత అనువాదాన్ని వారసత్వంగా పొందదు. అది ఉపయోగించిన నమూనా #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

బేస్ కేటలాగ్ను చదవలేనప్పుడు `SKIP reason=base-unresolved` తో 0 నుండి నిష్క్రమిస్తుంది (బేస్ రెఫ్ లేకుండా నిస్సార క్లోన్), `check-openapi-breaking` ప్రతిబింబిస్తుంది. విడుదల మోడ్ మాత్రమే: ఒక ఫీచర్ PR ఇంగ్లీషుని తిరిగి వ్రాస్తుంది మరియు అక్కడ ఆగిపోతుంది; విడుదల రిఫ్రెష్ అది వదిలిపెట్టిన అనువాదాలను సూచిస్తుంది (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, అదే `findStaleTranslations`).

### ఉద్యోగం: `i18n`

పూర్తి i18n ధ్రువీకరణ మాత్రిక (ఒక లొకేల్కి ఒక ఉద్యోగం). మొత్తం ఉద్యోగం సలహా.

| స్క్రిప్ట్                      | ధ్రువీకరిస్తుంది                 | నిరోధించడం                                            |
| ------------------------------- | -------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | ప్రతి లొకేల్కు అనువాదం పరిపూర్ణత | **సలహా** (మొత్తం ఉద్యోగంలో`continue-on-error: true` ) |

### ఉద్యోగం: `pr-test-policy`

పుల్ రిక్వెస్ట్లపై మాత్రమే నడుస్తుంది.

| స్క్రిప్ట్             | ధ్రువీకరిస్తుంది                                                                                                                                          | నిరోధించడం |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, లేదా `bin/` లో ప్రొడక్షన్ కోడ్ని మార్చేPRs తప్పనిసరిగా పరీక్షలను చేర్చాలి లేదా నవీకరించాలి (హార్డ్ రూల్ #8)             | అవును      |
| `check:test-masking`   | మార్చబడిన పరీక్ష ఫైల్లు నికర నిర్ధారిత గణనను తగ్గించవు లేదా `assert.ok(true)` టాటాలజీలను జోడించవు                                                         | అవును      |
| `check:pr-evidence`    | PR శరీరం మార్పు కోసం test/VPS సాక్ష్యాన్ని ఉదహరిస్తుంది ( PR గద్యం — ఫ్రాగిల్ను గ్రెప్ చేయడం ద్వారా హార్డ్ రూల్ #18 మెకనైజ్ చేస్తుంది, బ్యాక్లాగ్ చూడండి) | అవును      |

### ఉద్యోగం: `test-vitest`

`build` తర్వాత నడుస్తుంది. విఫలమైనప్పుడు బ్లాక్లు విలీనం అవుతాయి.

| సూట్             | ధ్రువీకరిస్తుంది                                          | నిరోధించడం                                                                                                                      |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP సర్వర్ (110 సాధనాలు), autoCombo, కాష్ — vitest రన్నర్ | అవును                                                                                                                           |
| `test:vitest:ui` | UI భాగం పరీక్షలు — vitest రన్నర్                          | **నిరోధించడం** — ముందుగా ఉన్న వైఫల్యాలు `vitest.config.ts` లో స్పష్టంగా మినహాయించబడ్డాయి; కొత్త వైఫల్యాలు ఉద్యోగంలో విఫలమవుతాయి |

### రాత్రిపూట వర్క్ఫ్లోలు (షెడ్యూల్డ్, సలహా)

ఇవి క్రాన్ షెడ్యూల్లో (మరియు `workflow_dispatch`) నడుస్తాయి, ఎప్పుడూ PRs లో కాదు. అన్నీ సలహాలే.

| వర్క్ఫ్లో              | ధ్రువీకరిస్తుంది                                                                                                                                                         | నిరోధించడం |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `nightly-property`     | యాదృచ్ఛిక సీడ్ + అధిక రన్ కౌంట్తో ప్రాపర్టీ పరీక్షలను వేగంగా తనిఖీ చేయండి                                                                                                | **సలహా**   |
| `nightly-resilience`   | హీప్-గ్రోత్ గేట్, కేయోస్ ఫాల్ట్-ఇంజెక్షన్, k6 load/soak                                                                                                                  | **సలహా**   |
| `nightly-llm-security` | promptfoo ఇంజెక్షన్ గార్డ్ (బ్లాక్ మోడ్) + గరాక్ ప్రోబ్స్ (ప్రొవైడర్ రహస్యం లేకుండా దాటవేయబడింది)                                                                        | **సలహా**   |
| `nightly-schemathesis` | `docs/openapi.yaml` — ఉపరితలాల స్పెక్ ఉల్లంఘనలు / హ్యాండిల్ చేయని 500లు (ఫేజ్ 8 B.4) ఉపయోగించి లైవ్ OmniRoute కి వ్యతిరేకంగాOpenAPI కాంట్రాక్ట్ ఫజ్ చేయడం (స్కీమాథెసిస్) | **సలహా**   |
| `nightly-mutation`     | స్ట్రైకర్ మ్యుటేషన్-టెస్టింగ్ స్కోర్పై ఫాస్ట్ యూనిట్ లేన్ — మనుగడలో ఉన్న మార్పుచెందగలవారు బలహీనమైన వాదనలు                                                                | **సలహా**   |
| `nightly-compat`       | మద్దతు ఉన్న `engines.node` పరిధులలో నోడ్ ఇంజిన్ అనుకూలత మాతృక                                                                                                            | **సలహా**   |

పనితీరు బేస్లైన్లు (కుప్ప, TTFB, నిర్మాణ సమయం) నమోదు చేయబడ్డాయి, గేటెడ్ కాదు: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) చూడండి.

---

## వేగ దశ (2026-08-30 → v4.0 LTS): ప్రతి బేస్లైన్ 20% సడలింపు

యజమాని నిర్ణయం (2026-08-30): v4.0 మాడ్యులరైజేషన్ వరకు, డెట్ పరిమితిని నిలుపుకోవడం కంటే
షిప్పింగ్ వేగానికే ఎక్కువ ప్రాధాన్యం ఉంటుంది. ప్రతి **సంఖ్యాత్మక** ర్యాచెట్ బేస్లైన్ను ఒక
ఆడిట్ చేయగల పాస్లో 20% సడలించారు, మరియు ఈ దశను `config/quality/quality-baseline.json` లో ప్రకటించారు:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| మార్చింది                                                                                                                                                                                               | ఎక్కడ                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — తక్కువైతే మంచిదైన కౌంట్లు ×1.2, ఎక్కువైతే మంచిదైన శాతాలు ÷1.2 (కవరేజ్ కనిష్ఠం 60గానే ఉంది, `eslintErrors` 0గానే ఉంటుంది, `eslintWarnings` 0 → ఫ్రీజ్ చేసిన suppression కౌంట్లో 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` నోట్ ప్రతి before → after విలువను జాబితా చేస్తుంది) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                   |
| `cap`, `testCap`, ప్రతి `frozen[*]` / `testFrozen[*]` లైన్ క్యాప్ ×1.2                                                                                                                                  | `file-size-baseline.json`                                                                                 |
| ప్రతి-ఫైల్ / ప్రతి-TS-కోడ్ కౌంట్లు ×1.2                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`    |
| `THRESHOLD` 36 → 30                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                                |
| `_policy.requireTighten === false` ఉన్నప్పుడు `--require-tighten` సూచనాత్మకంగా మారుతుంది                                                                                                                | `scripts/quality/check-quality-ratchet.mjs`                                                               |
| రాత్రి సమయంలో నడిచే `bank-ratchet-shrinks` పాజ్ అవుతుంది (ఇది కొలిచిన shrinkను బ్యాంక్ చేసి, లభించిన అదనపు వెసులుబాటును రద్దు చేసేది)                                                                   | `.github/workflows/nightly-release-green.yml`                                                             |

అనుమతి జాబితాలు (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) బడ్జెట్లు కావు, వాటిని మార్చలేదు. పాస్/ఫెయిల్ విధాన గేట్లు (secrets, SQL నియమాలు,
docs/env contract, i18n parity, unit tests) మారలేదు — ఎర్రగా ఉన్న టెస్ట్ ఇప్పటికీ ఎర్రగానే ఉంటుంది.

**టూలింగ్**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ఒకసారి మాత్రమే అమలు చేసే
  సడలింపు (`scripts/quality/relax-baselines.mjs`); అదే నోట్తో రెండుసార్లు అమలు చేయడాన్ని నిరాకరిస్తుంది.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI చేసే విధంగానే ప్రతి సంఖ్యాత్మక గేట్ను కొలిచి, ప్రతి గేట్కు మిగిలిన హెడ్రూమ్ను చూపిస్తుంది
  (`scripts/quality/baseline-headroom.mjs`). రాత్రి సమయంలో నడిచే `baseline-headroom` జాబ్
  వర్క్ఫ్లో రన్ సారాంశంలో పట్టికను ప్రచురించి, తన JSON/Markdown నివేదికను
  `baseline-headroom-<run_id>`గా అప్లోడ్ చేస్తుంది; ఇది 90 రోజుల పాటు నిల్వ ఉంటుంది. వార్నింగ్ మరియు
  క్రిటికల్ వరుసలు తమ క్యాప్కు 10% లోపల ఉన్న లేదా ఇప్పటికే దాన్ని మించిన గేట్లను గుర్తిస్తాయి.
  బడ్జెట్లు వినియోగించబడుతున్నాయనే ముందస్తు హెచ్చరికగా ఈ నివేదికలను సమీక్షించండి; సమస్య ఉన్న గేట్లోని
  `_rebaseline_*` నోట్లను పరిశీలించండి. జాబ్ ఇకపై శాశ్వత ఇష్యూను సృష్టించదు లేదా నవీకరించదు;
  #12149 మునుపటి నివేదిక చరిత్రను భద్రపరుస్తుంది.

**కొత్త-కోడ్ మోడ్ (Clean-as-You-Code) — 2026-08-30 నుండి, PR ఫాస్ట్-పాత్కు మాత్రమే**

`pull_request` ఈవెంట్లపై `quality.yml`, `check:file-size`,
`check:complexity-ratchets` మరియు `check:dead-code`లకు `--base-ref <PR base SHA>`ని పంపుతుంది.
`check:complexity-ratchets` మరియు `check:dead-code` కోసం గేట్, merge-baseను **PR మార్చిన ఫైళ్లకు మాత్రమే పరిమితం చేసి**
HEADతో పోలుస్తుంది (`scripts/check/newCodeMode.mjs`: merge-baseను తాత్కాలికంగా తొలగించగలిగే
`git worktree`లో రూపొందించి, అక్కడ మరియు HEADపై ESLint/knipను నడిపి, ప్రతి-ఫైల్ కౌంట్లను తేడా చూపిస్తుంది):

- **నిరోధించే విధంగా** — PR తాను మార్చిన ఫైళ్లలో cyclomatic/cognitive ఉల్లంఘనలు లేదా dead exportsను జోడించింది
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` లాగ్లో కనిపిస్తాయి);
- **సూచనాత్మకంగా** — ఫ్రీజ్ చేసిన బేస్లైన్తో పోల్చిన గ్లోబల్ మొత్తం. వారసత్వంగా వచ్చిన drift ఒక
  నిర్దోషి PRను ఎప్పటికీ ఎర్రగా మార్చదు; release reconciliation సమయంలో driftను మళ్లీ ఫ్రీజ్ చేసి,
  headroom జాబ్ ద్వారా పర్యవేక్షిస్తారు.

`check:file-size` తన స్వంత నియమాల ప్రకారం base refను ఉపయోగిస్తుంది
(`scripts/check/check-file-size.mjs`, #8522):
ఇది ట్రీలోని ప్రతి source మరియు test ఫైల్ను తనిఖీ చేసి, `git show`తో PR base వద్ద ప్రతి ఫైల్ యొక్క
లైన్ కౌంట్ను చదువుతుంది; ఒక ఫైల్ తన బేస్లైన్ సీలింగ్ (`frozen` / `testFrozen`, లేదా బేస్లైన్ వెలుపల ఉన్న
ఫైల్కు `cap` / `testCap`) మరియు తన base sizeలో పెద్దదైన పరిమితిని దాటినప్పుడు మాత్రమే విఫలమవుతుంది.
Baseపైనే ఇప్పటికే drift అయిన ఫైల్ కనుక నిర్దోషి PRను ఎప్పటికీ ఎర్రగా మార్చదు.

`check:boundary:ratchet` అదే నియమాన్ని దాని ఒక్క సంఖ్యకు వర్తింపజేస్తుంది
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ఈవెంట్లలో
`quality.yml` fast-gates మరియు `ci.yml` lint job రెండూ PR base SHAను పాస్ చేస్తాయి, base commitను
`git archive` ఎగుమతి నుంచి కొలుస్తారు, మరియు దాని `open-sse → src` edge
లెక్క `metrics.boundaryOpenSseToSrc` మరియు baseలోని లెక్కలో ఏది పెద్దదో దానిని మించినప్పుడే PR విఫలమవుతుంది.
ceiling కంటే ఎక్కువగా ఉన్న base drift నివేదించబడుతుంది (`base drift herdado`), కానీ నిర్దోషమైన PRకు
ఎప్పుడూ red స్థితి ఇవ్వదు; push → main మాత్రం absolute ceilingను కొనసాగిస్తుంది, మరియు పరిష్కరించలేని
base SHA warningతో దానికి fallback అవుతుంది.

ఒక omni-queue candidate (`omni-queue/**`కి push, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) చూడండి)
pull requestలాగే పరిగణించబడుతుంది: రెండు workflows కూడా candidate baseను
(`needs.changes.outputs.candidateBase`) `--base-ref`గా పాస్ చేస్తాయి, అలాగే `check:ts7-diagnostics-ratchet` కూడా
దానిపై నడుస్తుంది. రెండు కొత్త-code gates కోసం comparison baseగా ఆ SHAనే ఉపయోగిస్తారు; top merge commit యొక్క
మొదటి parentను కాదు, కాబట్టి batchలోని ప్రతి pull requestను మూల్యాంకనం చేస్తారు.

`workflow_dispatch` runs, release-green sweep మరియు nightly headroom jobలకు PR base ఉండదు,
కాబట్టి absolute (global) comparisonను కొనసాగిస్తాయి. Coverage, duplication మరియు type-coverage ప్రస్తుతానికి
globalగానే ఉంటాయి (వాటి tools ప్రతి ఫైల్కు diffను తక్కువ ఖర్చుతో ఉత్పత్తి చేయవు) — అదే విధానానికి
candidateలు.

**v4.0 దశ ముగింపు (LTS = మునుపటి కంటే కఠినం, "మళ్లీ సాధారణ స్థితికి" కాదు)**

1. స్వచ్ఛమైన `release/v4.0.0` tipపై: రికార్డు కోసం `npm run quality:headroom --json` నడిపి, ఆపై
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ప్రతి typecheck gate యొక్క
   `--update` — ప్రతి baseline కొలిచిన విలువకు తగ్గుతుంది.
2. `quality-baseline.json` నుంచి `_policy`ని తొలగించండి (`--require-tighten` మరియు nightly
   bankingను మళ్లీ సక్రియం చేస్తుంది), `check-openapi-coverage.mjs`లో `THRESHOLD = 36` (లేదా అంతకంటే ఎక్కువ)ని
   పునరుద్ధరించండి.
3. modularization వల్ల ప్రయోజనం వచ్చిన చోట కొలిచిన విలువను మించి మరింత కఠినతరం చేయండి: file-size `cap`ను
   తిరిగి 1000కి (లేదా 800కి) తీసుకెళ్లండి, coverage floorsను +5 పెంచండి, modularized packages కోసం dead exportsను 0గా ఉంచండి.

## ర్యాచెట్ బేస్లైన్ (`quality-baseline.json`)

ర్యాచెట్ ఇంజిన్ (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` ను చదివి,
కొత్తగా సేకరించిన `quality-metrics.json` తో దాన్ని పోల్చుతుంది. ఏదైనా మెట్రిక్ దాని ఎప్సిలాన్ను
మించి దిగజారితే బిల్డ్ విఫలమవుతుంది.

ప్రస్తుతం ట్రాక్ చేస్తున్న మెట్రిక్లు:

| మెట్రిక్              | దిశ    | అర్థం                            |
| --------------------- | ------ | -------------------------------- |
| `eslintWarnings`      | `down` | ESLint హెచ్చరికల సంఖ్య పెరగకూడదు |
| `coverage.statements` | `up`   | స్టేట్మెంట్ కవరేజ్ తగ్గకూడదు     |
| `coverage.lines`      | `up`   | లైన్ కవరేజ్ తగ్గకూడదు            |
| `coverage.functions`  | `up`   | ఫంక్షన్ కవరేజ్ తగ్గకూడదు         |
| `coverage.branches`   | `up`   | బ్రాంచ్ కవరేజ్ తగ్గకూడదు         |

నిజమైన మెరుగుదల తర్వాత బేస్లైన్ను నవీకరించడానికి:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ఫ్లాగ్ ప్రస్తుతం కొలిచిన విలువలను `quality-baseline.json` లో రాస్తుంది.
మెరుగుదలను బ్యాంక్ చేయడం విడుదల/రాత్రి పనికి సంబంధించినది, ఫీచర్ PR పని కాదు:
`--require-tighten` (దశ 6A.5) బ్యాంక్ చేయని మెరుగుదలను విడుదల మోడ్లో మాత్రమే
(push, schedule, విడుదల PR, స్థానిక రన్లు) విఫలంగా పరిగణిస్తుంది. ఫీచర్ PRలో (`pr` గేట్ మోడ్)
అది మెరుగుదలను సమాచారంగా చూపించి పాస్ అవుతుంది; రిగ్రెషన్ మాత్రం రెండు మోడ్లలోనూ
విఫలమవుతుంది. వేగ దశలో ఇది ప్రతిచోటా సలహా మాత్రమే
(`_policy.requireTighten: false`). [విడుదల సమయంలో రాసే జనరేటెడ్ ఫైళ్లు మరియు ఉత్పన్న
బేస్లైన్లు](#generated-files-and-derived-baselines-written-at-release) చూడండి.

### CodeQL ర్యాచెట్: రిఫ్రెష్ వ్యవధి మరియు మాన్యువల్ ట్రిగ్గర్

`check:codeql-ratchet` **షెడ్యూల్ ప్రకారం రిఫ్రెష్ అయ్యే రిపోజిటరీ స్థితిని చదువుతుంది — ప్రతి PRకు కాదు.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` లో
`state: configured`, `schedule: weekly` కనిపిస్తుంది: ఇది ప్రతి పుష్కు విశ్లేషణ కాదు, GitHub యొక్క
డిఫాల్ట్-సెటప్ స్కాన్. దీని ఫలితంగా, అలర్ట్లను **సరిచేసే** PR విలీనం అయిన తర్వాత,
తదుపరి షెడ్యూల్ చేసిన స్కాన్ నడిచే వరకు ర్యాచెట్ పాత, ఎక్కువ సంఖ్యను చదువుతూనే ఉంటుంది —
అందువల్ల స్కాన్ తాజా స్థితిని అందుకునే వరకు, సరిచేసే PR యొక్క తదుపరి రన్లతో సహా,
తెరిచి ఉన్న ప్రతి PRలో రిగ్రెషన్ను నివేదిస్తుంది.

**మాన్యువల్ రిఫ్రెష్**: `gh workflow run codeql.yml --ref release/vX.Y.Z` విశ్లేషణను
మళ్లీ నడిపి, కొన్ని నిమిషాల్లో అలర్ట్లను తిరిగి ప్రచురిస్తుంది. ముందుగా
`.github/workflows/codeql.yml` చదవండి — దాని హెడర్ ఇది **`workflow_dispatch`-only** అని వివరిస్తుంది,
ఎందుకంటే ఇది **GitHub యొక్క "default setup"తో విరుద్ధంగా ఉంటుంది**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` ట్రిగ్గర్లను తిరిగి అమలు చేయడానికి ముందుగా **ఓనర్ చర్య అవసరం**:
Settings → Code security → CodeQL: Default → Advanced. ఆ స్విచ్ను మార్చకుండా `schedule:` ట్రిగ్గర్ను
జోడించవద్దు — అది విఫలమైన రన్లను మాత్రమే సృష్టిస్తుంది.

**సంఖ్య తగ్గిన తర్వాత బేస్లైన్ను కఠినతరం చేయండి** — `node scripts/check/check-codeql-ratchet.mjs
--update` కొత్తగా కొలిచిన సంఖ్యను `quality-baseline.json` →
`metrics.codeqlAlerts.value` లో రాస్తుంది, తద్వారా ర్యాచెట్ పాత పరిమితి వరకు మళ్లీ పెరిగే
రిగ్రెషన్ను నిశ్శబ్దంగా అనుమతించదు. ఉదాహరణ (2026-09-02/03): PR #12502 నిజమైన 7 అలర్ట్లను
సరిచేసింది (కొలిచిన ఓపెన్ అలర్ట్లు 13 → 6); సరిపోలేలా PR #12530 స్థిరీకరించిన బేస్లైన్ను
11 → 6కి కఠినతరం చేసింది; ఆపై మిగిలిన 6 అలర్ట్లు ఒక్కొక్క అలర్ట్కు కారణాన్ని పేర్కొంటూ,
ఓపెన్ అలర్ట్లు 0కి తగ్గేలా డిస్మిస్ చేయబడ్డాయి.

**డిస్మిస్ చేయాలా వద్దా అనేది ఆపరేటర్ నిర్ణయం (కఠిన నియమం #14)** — డిస్మిస్ చేసిన వ్యాఖ్యలో
సాంకేతిక కారణాన్ని నమోదు చేయకుండా ఎప్పుడూ CodeQL అలర్ట్ను డిస్మిస్ చేయవద్దు:
అప్స్ట్రీమ్-ప్రోటోకాల్ అవసరానికి `won't fix`, టెస్ట్ ఫిక్చర్కు `used in tests`,
CodeQL గుర్తించలేని శానిటైజర్కు `false positive`
(పూర్వ ఉదాహరణ: `docs/security/ERROR_SANITIZATION.md`).

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

## రూపొందించిన ఫైల్లు మరియు ఉత్పన్నమైన బేస్లైన్లు (విడుదల సమయంలో వ్రాయబడినవి)

ప్రణాళిక 2026-11-13 ("ఉత్పన్నమైన సంఖ్యలు మరియు టెక్స్ట్లు విడుదల సమయంలో మాత్రమే పరిష్కరించబడతాయి"): PR ఫీచర్ని మారుస్తుంది** మూలం** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, స్కిల్ కేటలాగ్, ఫ్రీ-టైర్ కేటలాగ్, కొత్త e2e స్పెక్. ఇది ఆ మూలం నుండి కంప్యూట్ చేయబడిన ఫైల్లను పునరుత్పత్తి చేయదు మరియు ఇది బేస్లైన్లో కొలవబడిన మెరుగుదలని బ్యాంక్ చేయదు. విడుదల రిఫ్రెష్ (`release:refresh-derived`) ద్వారా లేదా రాత్రిపూట రిఫ్రెష్ PR ద్వారా ఆ ఫైల్లు ఒకసారి తిరిగి వ్రాయబడతాయి. దీనికి ముందు, ప్రతి తోబుట్టువుల PR దాని స్వంత పునరుత్పత్తి కాపీని కలిగి ఉంది మరియు తదుపరి విలీనంతో విభేదించింది (2026-11-13: 321 ఓపెన్ PRs లో 30 `PROVIDER_REFERENCE.md` తిరిగి వ్రాసింది , 26–28 README రేఖాచిత్రాలను తిరిగి వ్రాసింది).

**గార్డు.** `check:pr-derived-paths` (ఉద్యోగం `pr-test-policy`) `config/quality/derived-paths/` లోని కుటుంబం యొక్క ఫైల్ను తాకిన ఫీచర్ PR విఫలమైంది:

| కుటుంబం     | ఫైళ్లు                                                                                                                                                                              | తిరిగి వ్రాసేది                                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; ఉత్పత్తి చేయబడిన పన్నెండు README SVGలు; `skills/*/references/**`; కస్టమ్ బ్లాక్ లేని `SKILL.md` ఫైళ్లు | `release:refresh-derived` (facts), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                   | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

రచయితలు (`release/v*`, `chore/derived-*`, మరియు బేస్లైన్ల కోసం `chore/bank-ratchet-*` ) మినహాయింపు; ఒక కుటుంబంతో పాటు దాని సహచరులను మాత్రమే మార్చే PR అంటే ( `generated` కోసం: జనరేటర్ స్క్రిప్ట్లు, వాటి పరీక్షలు, ఏజెంట్-నైపుణ్యం ఇన్పుట్లు — `src/shared/constants/agentSkills.ts`, చేతితో వ్రాసిన `skills/**` డాక్స్, `docs/openapi.yaml` — మరియు `changelog.d/**`), ఉదా. దాని రీడ్ SVG రీడ్ చేసిన రీడ్ రీడ్ చేసిన హీరో పునరుత్పత్తి చేయబడిన `SKILL.md` ఫైళ్లు. చేతితో వ్రాసిన `<!-- skill:custom-start -->` బ్లాక్తో కూడిన `SKILL.md` కుటుంబంలో లేదు: దాని అనుకూల బ్లాక్ ఫీచర్ పక్కన సవరించగలిగేలా ఉంటుంది.

అనాథ క్లీనప్ అనేది కుటుంబాలచే నిర్ణయించబడదు: ఒక PR `docs/i18n/<locale>/<doc>` తొలగించవచ్చు, విలీన ఆధారం అద్దం మరియు `<doc>` ఇకపై PR తలలో లేనప్పుడు మరియు `sources` నుండి అటువంటి పత్రాలను వదలడానికి మాత్రమే `.i18n-state.json` సవరించవచ్చు. గార్డు ఆ ఫైళ్లను `orphan-cleanup` క్రింద జాబితా చేస్తుంది. ఇప్పటికీ ఉన్న పత్రం యొక్క మిర్రర్ను తొలగించడం ఉల్లంఘనగా మిగిలిపోయింది: ఏ ఇతర పైప్లైన్ ట్రాక్లు ఆ పేర్కొనబడలేదు మరియు `llm.txt` మరియు `CHANGELOG.md` మిర్రర్లకు వాటి స్వంత రచయితలు ఉన్నారు.

**తనిఖీలు, ఒక్కో గేట్ మోడ్** (`scripts/check/lib/gateMode.mjs`; సహాయకుడు `scripts/check/lib/derivedArtifactScope.mjs`):

| తనిఖీ చేయండి                                                                | `release` (పుష్, షెడ్యూల్, విడుదల PR, స్థానికం)                         | `pr` (ఫీచర్ PR, క్యూ బ్యాచ్)                                                                                                                                                                                                         |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:agent-skills-sync`                                                   | ప్రతి నైపుణ్యం జనరేటర్ అవుట్పుట్తో సమానంగా ఉండాలి                       | టెక్స్ట్ (కస్టమ్ బ్లాక్ వెలుపల) లేదా `references/` PR సవరణలను రూపొందించిన నైపుణ్యాలు మాత్రమే; లేకపోతే `SKIP reason=pr-mode`                                                                                                          |
| `check:generated-artifacts` (README SVGs + e2e సమయాలు; పూర్తి చరిత్ర అవసరం) | ప్రతి SVG దాని జనరేటర్కు సమానం; ప్రతి స్పెక్కి టైమింగ్స్ ఎంట్రీ ఉంటుంది | PR సవరించిన కళాఖండాలు మాత్రమే; మిగిలిన `SKIP reason=pr-mode`; తేడా లేదు → ప్రతి కళాఖండాన్ని నిర్ధారించారు (విఫలం-మూసివేయబడింది)                                                                                                      |
| README SVG బైట్-పోలిక పరీక్షలు (`tests/unit/docs/readme-*-svg.test.ts`)     | ప్రతి SVG                                                               | ఒక SVG మాత్రమే PR సవరణలు, ఆధారం పరిష్కరించబడినప్పుడు; `test-unit` యొక్క నిస్సారమైన PR చెక్అవుట్కు ఆధారం లేదు, కాబట్టి పరీక్ష `SKIP reason=base-unresolved` తో దాటవేయబడుతుంది మరియు `check:generated-artifacts` పోలికను కలిగి ఉంటుంది |
| e2e సమయాల సంపూర్ణత (`tests/unit/balance-e2e-shards.test.ts`)                | ప్రతి స్పెక్కి ఒక ఎంట్రీ ఉంటుంది                                        | SVG పరీక్షల మాదిరిగానే అదే నియమం (మధ్యస్థ బరువుతో కొత్త స్పెక్ నడుస్తుంది)                                                                                                                                                           |
| `check-quality-ratchet.mjs --require-tighten`                               | అన్-బ్యాంకు మెరుగుదల విఫలమవుతుంది ( `_policy` తప్ప)                     | అభివృద్ధి నివేదించబడింది, ఎప్పుడూ వైఫల్యం కాదు; ఒక తిరోగమనం ఇప్పటికీ విఫలమవుతుంది                                                                                                                                                    |

విభజనకు ముందు ఈ తనిఖీలు కలిగి ఉన్న తీర్పులు, నిష్క్రమణ కోడ్లు మరియు సందేశాలను విడుదల మోడ్ ఉంచుతుంది; గరిష్టంగా ఒక లైన్ జోడించబడింది, పరిష్కరించబడిన మోడ్ (`[agent-skills-sync] mode=release (auto: local run)`) పేరు పెట్టబడుతుంది. పరీక్షలు నోడ్ ద్వారా దాటవేయబడతాయి:పరీక్ష యొక్క `{ skip: releaseOnlyUnlessTouched(...) }` ఎంపిక, ఇది `check:test-masking` నివేదిక-మాత్రమే బ్లాక్లో జాబితా చేస్తుంది (ఇది `.skip(` లేదా `{ skip: true }` కాదు, కాబట్టి ఇది హార్డ్ స్కిప్గా పరిగణించబడదు). `check:generated-artifacts` ఆధారం పరిష్కరించదగిన చోట నడుస్తుంది: జాబ్ `lint` (`fetch-depth: 0`), `check:agent-skills-sync` తర్వాత . స్థానికంగా, `npm run check:generated-artifacts -- --mode=pr` ఒక PR లో ఏ దశను నిర్దేశిస్తుందో చూపిస్తుంది. `check:docs-counts` యొక్క ప్రొవైడర్-మొత్తం క్రాస్-చెక్ ("ప్రొవైడర్ రిఫరెన్స్ టోటల్ (డాక్ vs లైవ్ మాడ్యూల్స్)") అనేది కౌంట్స్ గేట్లో భాగం మరియు ఆ గేట్ యొక్క స్వంత మోడ్లను అనుసరిస్తుంది.

ఒక familyలో ఉద్దేశపూర్వకంగా లేనివి: వ్యక్తులు నిర్ణయించే policy files (`gate-manifest.json`, allowlists,
`admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) మరియు ఒక feature PR codeతో పాటు కలిసి సవరించాల్సి వచ్చే ceilings (`quality-baseline.json` metric entries,
typecheck/file-size/complexity baselines, `eslint-suppressions.json` — ఒక PR frozen violationను పరిష్కరించినప్పుడు pre-commit
ESLint run ద్వారా prune చేయబడుతుంది). `src/i18n/routeNamespaces.generated.json` కూడా generated అయినప్పటికీ feature PRలలోనే ఉంటుంది: app దాన్ని runtimeలో import చేస్తుంది, కాబట్టి refresh వరకు వేచి ఉండలదు】【。

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

ముందుగా ఉన్న ఉల్లంఘనల కారణంగా విఫలం కాని ప్రతి గేట్ ఒక స్థిరీకరించిన అనుమతి జాబితాను ఉపయోగిస్తుంది
(ఉదా., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). విధానం:

**మూల కారణాన్ని సరిచేయండి; ఉల్లంఘన ముందుగానే ఉన్నది మరియు అదే PRలో
సరిచేయడం సాధ్యం కానప్పుడు మాత్రమే అనుమతి జాబితాను ఉపయోగించండి.**

అనుమతి జాబితాకు ఒక ఎంట్రీని జోడించేటప్పుడు:

1. కారణాన్ని వివరిస్తూ ఒక వ్యాఖ్యను చేర్చండి.
2. ట్రాకింగ్ ఇష్యూను సూచించండి (ఉదా., `// #3498 — Phase 2 feature, not yet implemented`).
3. ఉల్లంఘనను సరిచేసే అదే PRలో ఎంట్రీని తొలగించండి — ఇకపై సక్రియ ఉల్లంఘనను
   అణచివేయని పాత ఎంట్రీ కూడా ఒక లోపమే (అమలు చేసిన తర్వాత, ఆర్ఫన్ అయిన అనుమతి జాబితా
   ఎంట్రీపై 6A.3 stale-enforcement గేట్ విఫలమవుతుంది).

పరీక్షలు త్వరగా విజయవంతం కావడానికి అనుమతి జాబితా ఎంట్రీలను జోడించవద్దు. పెరుగుతూ ఉండే
అనుమతి జాబితాతో గ్రీన్ గేట్ నాణ్యతపై తప్పుడు భద్రతాభావాన్ని కలిగిస్తుంది.

### మీ PRలో ఒక గేట్ విఫలమైనప్పుడు

1. **గేట్ అవుట్పుట్ను జాగ్రత్తగా చదవండి** — నియమాన్ని ఉల్లంఘించిన ఖచ్చితమైన ఫైల్ లేదా
   సింబల్ను అది తెలియజేస్తుంది.
2. **ఉల్లంఘనను సరిచేయండి** — చాలా గేట్లు నిర్ణయాత్మక ఫైల్సిస్టమ్ తనిఖీలు; కోడ్
   సరిగ్గా ఉన్న వెంటనే అవి విజయవంతమవుతాయి.
3. **ఉల్లంఘన ముందుగానే ఉన్నదైతే** (అంటే, మీరు దాన్ని ప్రవేశపెట్టలేదు కానీ ఇప్పుడు గేట్
   దాన్ని కవర్ చేస్తోంది): కారణాన్ని వివరించే వ్యాఖ్యతో మరియు ట్రాకింగ్ ఇష్యూతో అనుమతి
   జాబితా ఎంట్రీని జోడించండి.
4. **గేట్ ఒక ర్యాచెట్ అయితే** (కవరేజ్, ESLint హెచ్చరికలు, డూప్లికేషన్, సంక్లిష్టత):
   మీ మార్పు మెట్రిక్ను మరింత దిగజార్చింది. అంతర్లీన సమస్యను సరిచేయండి లేదా
   (అరుదుగా) మార్పు ఉద్దేశపూర్వకమైనదై, మెట్రిక్ దిగజారడం ఆమోదయోగ్యమైతే
   `npm run quality:ratchet -- --update` ను అమలు చేయండి — అయితే PR వివరణలో కారణాన్ని
   నమోదు చేయండి.
5. **సలహా గేట్లు** (`continue-on-error: true`) సమాచార ప్రయోజనాల కోసం మాత్రమే — అవి
   విలీనాన్ని నిరోధించవు, కానీ CI సారాంశంలో కనిపిస్తాయి. అయినప్పటికీ వాటిని కూడా
   సరిచేయండి.

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

ఈ ఇన్వెంటరీని 2026-06-17న `ci.yml`తో సరిపోల్చి ధృవీకరించాము (మునుపటి సంస్కరణలో
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` లేవు). సరిపోల్చి ధృవీకరించిన సెట్పై ROI
సమీక్షలో క్రింది హేతుబద్ధీకరణ అభ్యర్థులు గుర్తించబడ్డారు. **మర్జ్లు యాంత్రిక CI
మార్పులు; ఫ్లిప్లు/డ్రాప్లు ఆపరేటర్కు కేటాయించిన విధాన నిర్ణయాలు.** దిగువ పేర్కొన్న
ఏదీ ఇంకా అమలు కాలేదు.

**పైన ఇంకా డాక్యుమెంట్ చేయనివి** (సలహా మాత్రమే, తక్కువ సంకేత విలువ): `docs-lint` జాబ్
(markdownlint + Vale, మొత్తం జాబ్కు `continue-on-error`) మరియు స్వతంత్ర స్కానర్ వర్క్ఫ్లోలు
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` అనేది
`quality-baseline.json`లో ఉంది, కానీ `ci.yml`లో బ్లాకింగ్ ర్యాచెట్కు అనుసంధానించబడలేదు —
ఈ మెట్రిక్ ప్రస్తుతం అనాథగా ఉంది.

### మర్జ్ / డీడప్ (యాంత్రిక, తక్కువ ప్రమాదం)

ప్రతి అభ్యర్థిని 2026-06-17న అమలులో ఉన్న గేట్ స్థితికి వ్యతిరేకంగా ధృవీకరించాము (నమ్మండి,
కానీ తనిఖీ చేయండి); అనేక “స్పష్టమైన” మర్జ్లు లోపల ఉన్న డెట్ను దాచిపెట్టినట్లు తేలాయి,
కాబట్టి అవి **శుభ్రమైన డ్రాప్-ఇన్లు కావు**.

- **`check:docs-sync` రెండుసార్లు నడుస్తుంది** — `lint` జాబ్లో స్వతంత్రంగా ఒకసారి, అలాగే `check:docs-all` (`docs-sync-strict`)లో మరియు husky ప్రీ-కమిట్ హుక్లో మళ్లీ. ✅ **పూర్తయింది** — స్వతంత్ర `lint` ఇన్వొకేషన్ తొలగించబడింది.
- **CVE స్కానింగ్** — ❌ **శుభ్రమైన మర్జ్ కాదు.** ప్రస్తుత విధానం ప్రకారం `audit:deps` మొత్తం ఐదు లాక్ఫైళ్లలో క్రిటికల్ అడ్వైజరీలు మరియు అసంపూర్ణ ఆడిట్లను బ్లాక్ చేస్తుంది, అయితే హై అడ్వైజరీలను హెచ్చరికలుగా నివేదిస్తుంది; `check:vuln-ratchet` (osv) చెక్-ఇన్ చేసిన బేస్లైన్తో పోలిస్తే _రెగ్రెషన్_ వచ్చినప్పుడు మాత్రమే విఫలమవుతుంది మరియు అవసరమైనప్పుడు కొలతలు లేనివాటిని తిరస్కరిస్తుంది. అర్థాలు వేరు — `audit:deps`ను తొలగిస్తే సంపూర్ణ క్రిటికల్ గేట్ మరియు స్వతంత్ర ప్యాకేజీ ఆడిట్ రసీదులు కోల్పోతాం. రెండింటినీ ఉంచాలి.
- **సైకిల్ గుర్తింపు** — ✅ **పూర్తయింది** (#15159 G-01/G-02). ఇక్కడి పాత వచనం `check:cycles`ను “గ్రీన్, క్యూరేటెడ్” గేట్గా పేర్కొని, `check:circular-deps` (dpdm) 91 సైకిళ్లను నివేదించినందున దానిని బ్లాకింగ్గా ఉంచాలని సమర్థించింది. ఆ గ్రీన్ స్థితి **తప్పుడు గ్రీన్**: `check:cycles` 5 ఉపడైరెక్టరీలను (450 ఫైళ్లు) మాత్రమే స్కాన్ చేసి, స్టాటిక్ `import|export … from`కు మాత్రమే సరిపోల్చింది; ప్రతి `@/` మరియు `@omniroute/open-sse/` స్పెసిఫైయర్ను వదిలివేసింది, అందువల్ల రిపోలో ప్రధానంగా ఉన్న డైనమిక్-ఇంపోర్ట్ + అలియాస్ సైకిళ్లను చూడలేకపోయింది. పరిష్కరించబడింది: గేట్ ఇప్పుడు `src` + `open-sse` (5023 ఫైళ్లు)లో నడిచి, TypeScript AST నుంచి స్పెసిఫైయర్లను సేకరిస్తుంది (`import("…")` లెక్కించబడుతుంది, టైప్-పొజిషన్ `typeof import("…")` లెక్కించబడదు), అలాగే tsconfig `paths`ను రిజాల్వ్ చేస్తుంది. ఇది 0 కాదు, **14** సైకిళ్లను కనుగొంటుంది. గేట్ PRలో ముందే ఉన్న 14 సైకిళ్లను పరిష్కరించలేము కాబట్టి, `check:cycles` ఇప్పుడు **ర్యాచెట్** (`--ratchet`, `quality-baseline.json`లో `metrics.cycles.value = 14` సీలింగ్, `direction: down`) — ఇది ఏ _రెగ్రెషన్_నైనా బ్లాక్ చేస్తుంది మరియు సంఖ్య తగ్గుతూ మాత్రమే ఉండవచ్చు. CI `npm run check:cycles:ratchet`ను నడుపుతుంది. బర్న్-డౌన్ **A-01**తో కొనసాగుతుంది. `check:circular-deps` (dpdm) విస్తృతమైన రెండవ అభిప్రాయంగా సలహా స్థితిలోనే ఉంటుంది.
- **కాంప్లెక్సిటీ** — ✅ **పూర్తయింది** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ఒకే ESLint వాక్, ruleId ఆధారంగా లెక్కింపు చేస్తుంది కాబట్టి cyclomatic+max-lines మరియు cognitive బేస్లైన్లు స్వతంత్రంగా ఉంటాయి; వ్యక్తిగత `check:complexity` / `check:cognitive-complexity`లు స్థానిక `--update` కోసం అలాగే ఉంటాయి.
- **`/api` యాంటీ-హాల్యూసినేషన్** — ✅ **పూర్తయింది** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`పై ఒకే FS ఇన్వెంటరీ; openapi-routes + docs-symbols ఇప్పటికీ స్వతంత్రంగా నివేదిస్తాయి; వ్యక్తిగత కమాండ్లు స్థానిక రన్ల కోసం అలాగే ఉంటాయి.
- **`check:node-runtime` 11 జాబ్లలో నడుస్తుంది** — ⚠️ **తక్కువ ROI.** ప్రతి ఒక్కటి ప్రత్యేక రన్నర్, చెక్ <1s; మొత్తం ఆదా ~10s మాత్రమే, కానీ ప్రతి జాబ్లో ఉండే చవకైన గార్డ్ను కోల్పోతాం. ఈ మార్పు విలువైనది కాదు.
- **CI lintలో `typecheck:noimplicit:core`** — ✅ **lint జాబ్ నుంచి తొలగించబడింది** (ఇది సలహా స్థితిలో `continue-on-error`గా ఉండేది); బ్లాకింగ్ టైప్ ఉపరితలం `typecheck:core` + `check:type-coverage`; స్థానిక స్క్రిప్ట్ ఉంచబడింది.

### ఫ్లిప్ / నిర్ణయించాల్సినవి (ఆపరేటర్ విధానం)

- `check:openapi-security-tiers` (సలహా) — ❌ **శుభ్రంగా ఫ్లిప్ చేయలేం.** `LOCAL_ONLY_API_PREFIXES` కింద ఉన్న అనేక `traffic-inspector` రూట్లలో `x-loopback-only: true` అనోటేషన్ లేదని ఇది 0తో నిష్క్రమించినప్పటికీ హెచ్చరిస్తుంది. అమలు చేయాలంటే ముందుగా ఆ అనోటేషన్లను `openapi.yaml`లో జోడించాలి.
- `typecheck:noimplicit:core` (సలహా) — బ్లాకింగ్ `check:type-coverage` ర్యాచెట్ ద్వారా చాలావరకు కలిసిపోయింది. దీన్ని ర్యాచెట్గా మార్చాలి లేదా పునరావృతమయ్యే రెండవ `tsc` పాస్ను తొలగించాలి.
- `test:vitest:ui` (ఇప్పుడు **బ్లాకింగ్**) — ముందే ఉన్న వైఫల్యాలను `vitest.config.ts`లో `// #8618` ట్రాకింగ్ వ్యాఖ్యలతో స్పష్టంగా మినహాయించారు; కొత్త వైఫల్యాలు జాబ్ను విఫలమయ్యేలా చేస్తాయి.
- `check:secrets` (gitleaks, 3 డాక్యుమెంట్ చేసిన తప్పుడు-పాజిటివ్ల వద్ద బ్లాకింగ్ ర్యాచెట్ స్థిరంగా ఉంది) — 0కి చేరేందుకు ఆ 3ను అలౌలిస్ట్ చేయాలి, లేదా సలహా స్థితికి తగ్గించాలి. GitHub స్థానిక secret-scanning + `check:public-creds`తో ఓవర్ల్యాప్ అవుతుంది.
- `check:pr-evidence` (బ్లాకింగ్, PR-బాడీ వచనాన్ని grep చేస్తుంది) — తప్పుడు-పాజిటివ్ ప్రమాదం అధికం; దీన్ని తొలగిస్తే Hard Rule #18 అమలులో బలహీనత ఏర్పడుతుంది, కాబట్టి ఇది నిజమైన విధాన నిర్ణయం.
- `semgrep` (స్వతంత్ర సలహా) — OWASP కుటుంబాల విషయంలో CodeQLతో ఓవర్ల్యాప్ అవుతుంది; దాని బేస్లైన్ను ర్యాచెట్కు అనుసంధానించాలి లేదా తొలగించాలి.

## संबंधित दस्तावేజీకరణ

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — కీ-సెట్ సమానత్వ గేట్

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
ప్రతి `src/i18n/messages/<locale>.json` యొక్క లీఫ్ కీ-సెట్ను `en.json`తో పోల్చి, కీ ఎప్పుడు జోడించబడిందన్నదితో సంబంధం లేకుండా ఏదైనా లీఫ్ కనిపించకపోయినా లేదా అదనంగా ఉన్నా విఫలమవుతుంది. `__MISSING__:` ప్లేస్హోల్డర్లు ఉన్నట్లుగా పరిగణించబడతాయి (వాటి కంటెంట్ ratio gate యొక్క వ్యాపార నియమం). ఇది రెండు diff-ఆధారిత/శాతాధారిత గేట్లకు పూర్తి పరిపూరకం: `check-ui-keys-coverage` ప్రతి localeకు 80 % కనిష్ఠ పరిమితిని అమలు చేస్తుంది (సుమారు 13,000లో 43 కీలు కనిపించకపోయినా 99.7 %గా ఉంటుంది), మరియు `check-new-key-coverage` `en.json`కు PR జోడించే కీలను మాత్రమే అంచనా వేస్తుంది. ఒక locale బ్యాచ్ తన branch రూపొందించబడిన రోజునాటి `en.json` నుండి రూపొందించబడుతుంది మరియు baseలో కీలు జోడించబడుతూనే ఉన్నా రోజుల పాటు అనువదించబడుతుంది; బ్యాచ్ PR స్వయంగా ఏ కీని జోడించదు, అందువల్ల batch 1 (#13044) తొమ్మిది localesలో 43 కీలు తక్కువగా, batch 2 (#13660) ఎనిమిదింటిలో 10 కీలు తక్కువగా వచ్చినప్పుడు (2026-09-15) రెండు sibling గేట్లు మౌనంగా ఉన్నాయి. ఎరుపు స్థితిని `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`తో సరిచేయండి; `extra` లీఫ్ అంటే source దాన్ని తొలగించిందని అర్థం — `sync-ui-keys` దాన్ని తొలగిస్తుంది (`--prune-extra`, డిఫాల్ట్). `--warn` విఫలం చేయకుండా నివేదిస్తుంది.
`--catalog=cli` ఇదే పోలికను `bin/cli/locales`పై అమలు చేస్తుంది (`npm run i18n:check-keys:cli`); రెండు దశలూ `i18n-ui-coverage` jobలో ఉంటాయి. absolute check release modeలో మాత్రమే అమలవుతుంది: feature PRలో `SKIP reason=pr-mode` కనిపిస్తుంది, మరియు fix release refresh లేదా translation waveలో అమలవుతుంది, feature PRలో కాదు; locale catalogsను మార్చే PRలో వాటిలో ప్రతి ఒక్కటి merge baseకు వ్యతిరేకంగా అంచనా వేయబడుతుంది (job `i18n-ui-coverage` కింద “రెండు మోడ్లు” చూడండి).

#### `check-new-key-coverage` — కొత్త-కీ i18n గేట్

`check-ui-value-drift`కు sibling. అది అనువాదాలను అలాగే ఉంచి English విలువను **తిరిగి వ్రాసినప్పుడు** పట్టుకుంటుంది; ఇది కొన్ని localesకు అందకుండా English కీని **జోడించినప్పుడు** పట్టుకుంటుంది.

`check-ui-keys-coverage` ఈ తరగతిని గుర్తించలదు: ఇది ప్రతి localeకు శాతాధారిత కనిష్ఠ పరిమితిని అమలు చేస్తుంది, మరియు సుమారు 13,000 లీఫ్లలో పదకొండు కీలు కనిపించకపోయినా coverage 99.9%గా ఉంటుంది. ప్రతి భాషకు ఒక శాతం “ఈ feature అనువాదం లేకుండా విడుదలైంది” అనే విషయాన్ని వ్యక్తపరచలదు — ఒక కొత్త localeలో మొత్తం feature ఎలాంటి పాఠ్యం లేకుండా చేరి, సంఖ్యను ఎప్పటికీ మార్చకపోవచ్చు.

ఇది నమోదు చేసే సంఘటన: Orchestration Canvasలోని Phase 3 తన పదకొండు కీలను అప్పటికి ఉన్న 42 localesలో అనువదించింది. కొన్ని గంటల తరువాత EU-language batch (#13044) repoను 51 localesకు తీసుకెళ్లింది, మరియు కొత్తగా చేరిన తొమ్మిది locales (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) వాటిని ఎప్పుడూ పొందలేదు. `deepMergeFallback` కనిపించని కీకి Englishను ప్రత్యామ్నాయంగా ఉపయోగిస్తుంది, కాబట్టి వైఫల్య రూపం ఖాళీ UI కాకుండా అనువాదం లేని UIగా మారింది — ఇది నిజమైనదే, మరియు నిర్మాణపరంగా నిశ్శబ్దంగా ఉంది.

దాని siblingలాగే ఇది **diff-aware**, merge baseలోని Englishను working treeతో పోలుస్తుంది; అందువల్ల ముందే ఉన్న లోపాలు స్థిరంగా ఉంటాయి మరియు దీన్ని ప్రారంభించడానికి migration అవసరం లేదు.

**ఒక `__MISSING__:<english>` marker దీనిని సంతృప్తిపరచదు (2026-09-17 నుండి).** ఇది గతంలో పత్రబద్ధమైన వాయిదా విధానం — runtime సరైన Englishకు fallback అవుతుంది — కానీ 2026-09-16న ఎనిమిది feature PRలు 61 కీలను జోడించి, అనువదించడానికి బదులుగా మొత్తం 65 localesలో markerను ఉంచాయి: ఈ గేట్ ప్రతి దానినీ ఆమోదించింది, ఏదీ PRలను నిలిపివేయలేదు, ఆపై blocking real-translation ratio gate release tipపై అందరికీ విఫలమైంది (pt-BR 3.2 % > 2.5 % + 0.5). ఇప్పుడు markerను కనిపించని అనువాదంగా అంచనా వేస్తారు. 2026-11-13 నుండి release modeలో మాత్రమే: feature PRలో `SKIP reason=pr-mode` కనిపిస్తుంది, మరియు release PRలో (`BASE_REF=origin/main`) cycle జోడించిన ప్రతి కీని గేట్ అంచనా వేస్తుంది. `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`తో release refresh లేదా translation waveలో ఎరుపు స్థితిని సరిచేయండి, లేదా `npm run i18n:translate-new-keys`తో (`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env లేకుండా ప్రారంభించడానికి నిరాకరిస్తుంది) అన్ని localesను సమాంతరంగా అమలు చేయండి. Englishలోనే ఉండాల్సిన కీ (స్థిరమైన product/engine/flag పేరు) `scripts/i18n/untranslatable-keys.json`లో ఉండాలి, ఎప్పుడూ marker వెనుక కాదు. `vi` markersను పూర్తిగా నిషేధిస్తుంది (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — నిలిపివేసిన-టెస్ట్ గేట్

`vitest.config.ts`లోని `exclude` జాబితాలో ఉన్న ఫైల్ అమలు కాని test, మరియు treeను చదివే వారికి అది coverageలా కనిపిస్తుంది. `// #8618 — pre-existing failure; remove this exclusion when fixed` వ్యాఖ్య వెనుక అరవై రెండు ఫైళ్లు పేరుకుపోయాయి. Issue #8618ను 2026-08-11న మూసివేసినప్పటికీ, అది ట్రాక్ చేసిన జాబితా 45 entries నుండి 62కు పెరిగింది; ప్రతి కొత్త entry మూసివేసిన issueను సూచించే వ్యాఖ్యను వారసత్వంగా పొందింది. చివరకు జాబితాను ఒక్కో ఫైల్ చొప్పున కొలిచినప్పుడు (#13204), **source మార్పు లేకుండానే ప్రస్తుత treeకు వ్యతిరేకంగా 62లో 51 విజయవంతమయ్యాయి**.

ప్రతి exclusion నిజమైన ఫైల్కు resolve అయితే (a) tracking issueను పేర్కొనాలి మరియు (b) కొలిచిన statusతో `config/quality/vitest-exclusions.json`లో కనిపించాలి అని గేట్ కోరుతుంది. అందువల్ల ఒకదాన్ని జోడించడం 60-entry arrayలో మరో పంక్తిగా కాకుండా, ప్రత్యేక ఫైల్లో review చేయదగిన diff అవుతుంది. ఇది ఉద్దేశపూర్వకంగా excluded testsను మళ్లీ అమలు చేయదు — దానికి సుమారు 10 నిమిషాలు పడుతుంది మరియు అది periodic jobకు చెందుతుంది; inventory ప్రతి దానిని చివరిసారి ఎప్పుడు కొలిచారో నమోదు చేస్తుంది.
