# Log export (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute కాల్ లాగ్‌లను బాహ్య విశ్లేషణల స్టోర్‌కు నిరంతరంగా, ఇంక్రిమెంటల్‌గా ఎగుమతి చేయడం.

లాగ్‌ల డాష్‌బోర్డ్ ట్యాబ్ అభ్యర్థనల చరిత్రను SQLite (`call_logs`)లో ఉంచుతుంది; ఇది
రొటేషన్ మరియు నిలుపుదల పరిమితులకు లోబడి ఉంటుంది. లాగ్ ఎగుమతి అదే రికార్డుల సమితిని షెడ్యూల్ ప్రకారం బయటకు పంపుతుంది, తద్వారా అది
స్థానిక డేటాబేస్ కంటే ఎక్కువ కాలం నిలిచి, ఇతర డేటాతో జాయిన్ చేయబడవచ్చు. BigQuery మొదటి గమ్యస్థానం;
ఈ పైప్‌లైన్ ఒక రిజిస్ట్రీ కాబట్టి, మరిన్ని గమ్యస్థానాలను అదనంగా చేర్చవచ్చు.

---

## 1. ఇది ఎలా పనిచేస్తుంది

```
సర్వర్ (కాన్ఫిగరేషన్‌ను డీక్రిప్ట్ చేసి ధృవీకరించడం, కర్సర్‌ను సమన్వయపరచడం)
  → ప్రారంభ IPC → వేరుచేయబడిన exportChild OS ప్రాసెస్
    → చదవడానికి మాత్రమే storage.sqlite → ఉమ్మడి కాల్-లాగ్ క్వెరీ/మ్యాపింగ్
      → అసింక్రోనస్ ఆర్టిఫాక్ట్ హైడ్రేషన్ → గమ్యస్థానం prepare()/send()
        → బ్యాచ్ IPC → సర్వర్ కర్సర్‌ను శాశ్వతంగా భద్రపరుస్తుంది → ack IPC
          → తదుపరి బ్యాచ్; done IPC → సర్వర్ విజయాన్ని నమోదు చేస్తుంది
```

- **షెడ్యూల్** — ఒక `JobRegistry` cron జాబ్, `log_export`, డిఫాల్ట్‌గా `0 * * * *` (ప్రతి గంటకు,
  UTC). ఇది `src/lib/initCloudSync.ts`లో నమోదు చేయబడుతుంది; `OMNIROUTE_LOG_EXPORT_CRON`తో మార్చవచ్చు.
  ప్రతి టిక్ **ఎనేబుల్ చేయబడిన** ప్రతి గమ్యస్థానంలోని పెండింగ్ రికార్డులను వరుసగా ఎగుమతి చేస్తుంది.
- **కర్సర్** — SQLite యొక్క అంతర్గత `call_logs.rowid`, ప్రతి గమ్యస్థానానికి
  `log_export_destinations.cursor_row_id`లో శాశ్వతంగా భద్రపరచబడుతుంది. ఉద్దేశపూర్వకంగానే `timestamp`ను కర్సర్‌గా ఉపయోగించరు: కాల్ చేసేవారు
  తమ సొంత విలువను ఇవ్వవచ్చు, కాబట్టి ఆలస్యంగా ప్రారంభమైన వేగవంతమైన అభ్యర్థన తర్వాత నెమ్మదైన అభ్యర్థన
  వ్రాయబడవచ్చు; టైమ్‌స్టాంప్ కర్సర్ దానిని దాటవేస్తుంది.
- **బ్యాచింగ్** — ప్రతి అభ్యర్థనకు `batch_size` వరుసలు (డిఫాల్ట్ 500), ప్రతి రన్‌కు `max_rows_per_run` వరుసలు
  (డిఫాల్ట్ 10000), తద్వారా పెద్ద బ్యాక్‌లాగ్ ఒక టిక్‌ను నిరోధించకుండా అనేక టిక్‌లలో ఎగుమతి అవుతుంది.
- **డెలివరీ** — `send()` విజయవంతంగా పూర్తయిన తర్వాత మాత్రమే కర్సర్ ముందుకు కదులుతుంది. బ్యాచ్ విఫలమైతే
  కర్సర్ ఉన్నచోటే ఉంటుంది, కాబట్టి తదుపరి రన్‌లో అదే వరుసలను మళ్లీ ప్రయత్నిస్తారు. హామీ
  కనీసం ఒక్కసారైనా డెలివరీతో పాటు గమ్యస్థానం వైపు డీ-డూప్లికేషన్ మాత్రమే, నిజమైన ఖచ్చితంగా-ఒక్కసారి డెలివరీ కాదు: BigQuery ప్రతి
  వరుసకు కాల్-లాగ్ idని కీగా ఉపయోగిస్తుంది; తన డీడూప్ వ్యవధిలో దానిని సాధ్యమైనంతవరకు గౌరవిస్తుంది.
- **ఓవర్‌ల్యాప్ నిరోధకం** — cron టిక్ మరియు `POST .../run` ఒకేసారి ట్రిగర్ కావచ్చు. ఇప్పటికే
  ఎగుమతి జరుగుతున్న గమ్యస్థానాన్ని రెండుసార్లు ఎగుమతి చేయకుండా దాటవేస్తారు (రన్ ఫలితంలో `skipped: true`),
  కాబట్టి సమాంతర రన్ ఒక బ్యాచ్‌ను మళ్లీ పంపలేదు లేదా కర్సర్‌ను వెనక్కి వ్రాయలేదు.
- **పర్జ్ పునరుద్ధరణ** — `cursor_row_id` విలువ `MAX(rowid)` కంటే ఎక్కువైతే (మొత్తం టేబుల్
  పర్జ్ చేయబడి rowidలు మళ్లీ ప్రారంభమైతే), రన్నర్ శాశ్వతంగా రికార్డులను గుర్తించలేని స్థితిలో ఉండకుండా 0కి వెనక్కి వెళుతుంది.

### వేరుచేయబడిన రన్నర్ మరియు పరిమితులు

Nodeలో ప్రతి గమ్యస్థాన రన్ ప్రత్యేకమైన, స్వల్పకాలిక OS చైల్డ్ ప్రాసెస్‌ను ప్రారంభిస్తుంది (IPCతో కూడిన `child_process`,
`worker_threads` కాదు). బాడీలను చదవడం, పేలోడ్ JSON పార్సింగ్/సీరియలైజేషన్, గమ్యస్థానం యొక్క
`prepare()` మరియు గమ్యస్థాన నెట్‌వర్క్ I/O అన్నీ అక్కడే నడుస్తాయి, సర్వర్ ఈవెంట్ లూప్‌పై కాదు.
కాన్ఫిగరేషన్ మరియు చిన్న ప్రోగ్రెస్ సందేశాలు మాత్రమే IPC ద్వారా వెళతాయి; ఎగుమతి చేసిన రికార్డులు ఎప్పుడూ
సర్వర్‌కు తిరిగి రావు. cron జాబ్ మరియు ఇప్పుడే రన్ చేయి రూట్ అదే పబ్లిక్ ఫలితాన్ని, ఓవర్‌ల్యాప్ నిరోధకాన్ని కొనసాగిస్తాయి.

చైల్డ్, సర్వర్ పరిష్కరించిన `DATA_DIR/storage.sqlite`ను `node:sqlite` ఉపయోగించి చదవడానికి మాత్రమే తెరుస్తుంది,
`busy_timeout=5000` మరియు `query_only=ON`తో. ఇది ఏ DB సింగిల్‌టన్‌నూ ఇంపోర్ట్ చేయదు;
మైగ్రేషన్‌లు, బ్యాకప్‌లు లేదా SQLite అప్‌డేట్‌లు చేయదు. తప్పిపోయిన/పాడైన ఆర్టిఫాక్ట్ బుక్‌కీపింగ్ (పాడైన
ఆర్టిఫాక్ట్ UPDATEతో సహా) డాష్‌బోర్డ్ వివరాల పాత్‌లో మాత్రమే ఉంటుంది. రెండు పాత్‌లూ ఒక ప్యూర్
డీటెయిల్ రిజాల్వర్‌ను పంచుకుంటాయి; ఎగుమతి అసింక్రోనస్ ఫైల్‌సిస్టమ్ రీడ్‌లను మరియు అదే ఆర్టిఫాక్ట్ → లెగసీ
ఇన్‌లైన్ → లెగసీ డిస్క్ → ఏదీ లేదు అనే పరిష్కార క్రమాన్ని ఉపయోగిస్తుంది. చైల్డ్ తన రీడర్‌ను తెరిచినప్పుడు రన్ గరిష్ఠ ఇన్సర్షన్ rowidని
స్నాప్‌షాట్‌గా తీసుకుంటుంది; తర్వాతి ఇన్సర్ట్‌లు తదుపరి రన్ వరకు వేచి ఉంటాయి. ఇది ఇన్సర్షన్
సరిహద్దు మాత్రమే, దీర్ఘకాలిక SQLite ట్రాన్సాక్షన్ కాదు: నెట్‌వర్క్ కోసం వేచి ఉన్నప్పుడు WAL రైటర్‌లు మరియు చెక్‌పాయింట్‌లు స్వేచ్ఛగా పనిచేస్తాయి.
ఇప్పటికే ఉన్న వరుసల అప్‌డేట్‌లు/తొలగింపులు ఈ సరిహద్దు వల్ల నిలిపివేయబడవు.

అంగీకరించబడిన ప్రతి బ్యాచ్ తర్వాత, చైల్డ్ అంగీకార సందేశం కోసం వేచి ఉంటుంది. సర్వర్ ముందుగా
`advanceLogExportCursor`తో కర్సర్‌ను శాశ్వతంగా భద్రపరచి, ఆపై `ack` పంపుతుంది; దానికి ముందు తదుపరి బ్యాచ్ ప్రారంభం కాదు.
పంపడం విఫలమైనా, క్రాష్ అయినా లేదా టైమ్‌అవుట్ అయినా ఆ బ్యాచ్‌ను ముందుకు కదపకుండా వైఫల్యాన్ని నమోదు చేస్తుంది. గతంలో
అంగీకరించబడిన బ్యాచ్‌లు కమిట్ అయి ఉంటాయి; గరిష్ఠంగా అంగీకారం అందని ఒక్క బ్యాచ్ మాత్రమే మళ్లీ పంపబడవచ్చు.
`done` మరియు చైల్డ్ సక్రమంగా నిష్క్రమించిన తర్వాత మాత్రమే విజయం నమోదు చేయబడుతుంది. వైఫల్యాలు చైల్డ్‌ను
SIGTERMతో ముగిస్తాయి; 500 ms తర్వాత SIGKILLకు పెంచుతాయి, మరియు రన్నర్ ప్రాసెస్ మూసివేత కోసం వేచి ఉంటుంది.

| ఎన్విరాన్‌మెంట్ వేరియబుల్                     | డిఫాల్ట్ | ప్రయోజనం                                       |
| --------------------------------------------- | -------- | ---------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | ప్రతి గమ్యస్థానానికి గడిచిన వాస్తవ సమయ పరిమితి |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | MBలో చైల్డ్ V8 old-space పరిమితి               |

చెల్లని/పాజిటివ్ కాని/పూర్ణాంకం కాని విలువలకు డిఫాల్ట్‌లు ఉపయోగించబడతాయి. హీప్ సెట్టింగ్ మొత్తం
RSS పరిమితి కాదు; చాలా పెద్ద బ్యాచ్‌లు ఇప్పటికీ చైల్డ్ మెమరీని ఖాళీ చేసి, రన్‌ను సురక్షితంగా విఫలం చేయవచ్చు.
1024 MB డిఫాల్ట్, బాడీలు ఎనేబుల్ చేయబడిన 512 KiB ఆర్టిఫాక్ట్‌ల డిఫాల్ట్ 500-వరుసల బ్యాచ్‌కు,
BigQuery యొక్క బైట్-చంక్డ్ JSON సీరియలైజేషన్‌తో సహా, అదనపు వెసులుబాటు ఇస్తుంది. ఇది
బాడీలతో కూడిన 10000-వరుసల బ్యాచ్‌ను సురక్షితం చేయదు. V8 హీప్ అయిపోతే చర్య తీసుకోగల వైఫల్య సందేశం నమోదు అవుతుంది: బ్యాచ్
పరిమాణాన్ని తగ్గించండి లేదా `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`ను పెంచండి; కర్సర్ చివరిగా
అంగీకరించబడిన బ్యాచ్ వద్దే ఉంటుంది. పాత ఇన్‌లైన్/డిస్క్ బాడీలు ఆధునిక ఆర్టిఫాక్ట్ పరిమితి పరిధిలోకి రావు.
ఆపరేటర్‌లు RSS కోసం విడిగా వనరులను కేటాయించాలి, ముఖ్యంగా మెమరీ పరిమితి ఉన్న కంటైనర్‌లలో.

చైల్డ్ ప్రాసెస్ పరిష్కరించిన `DATA_DIR`, `NODE_ENV`, స్పష్టంగా సెట్ చేసిన `TZ` (పాత ఫైల్‌పేరు
స్థానిక-సమయ నిర్ధారణ), అందుబాటులో ఉన్నప్పుడు `ELECTRON_RUN_AS_NODE`, అలాగే ఈ అవుట్‌బౌండ్ ఇన్‌పుట్‌లను మాత్రమే వారసత్వంగా పొందుతుంది:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (వాటి చిన్నబడి రూపాలతో సహా),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
గ్లోబల్ Undici డిస్పాచర్, `NO_PROXY`తో సహా సర్వర్ యొక్క పూర్తిగా ఎన్విరాన్‌మెంట్-ఆధారిత ప్రాక్సీ నిర్ధారణ మరియు స్థానిక-హోస్ట్
బైపాస్ నియమాలను పంచుకుంటుంది; ఇది `proxyFetch.ts`ను గానీ దాని DB/ఫీచర్ ఫ్లాగ్‌లను గానీ దిగుమతి చేసుకోదు.
ఫార్వర్డ్ చేసిన అవుట్‌పుట్ మరియు నమోదు చేసిన లోపాల నుంచి ప్రాక్సీ ఆధారాలు తొలగించబడతాయి. గమ్యస్థాన ఆధారాలు
ఒకే ప్రారంభ IPC సందేశంలో మాత్రమే పంపబడతాయి, argv లేదా ఎన్విరాన్‌మెంట్ ద్వారా ఎప్పుడూ పంపబడవు; అవుట్‌పుట్/లోపాల ఫార్వర్డింగ్‌కు
ప్రిఫిక్స్ జోడించి, సున్నితమైన సమాచారం తొలగించబడుతుంది. ప్రతి cron అమలులో Node యొక్క SQLite హెచ్చరిక
పునరావృతం కాకుండా ఉండటానికి చైల్డ్ అమలు ఆర్గ్యుమెంట్‌లలో `ExperimentalWarning` మాత్రమే నిలిపివేయబడుతుంది; ఇతర హెచ్చరిక రకాలు కనిపిస్తూనే ఉంటాయి.

గమ్యస్థాన మాడ్యూల్‌లను Next.js/server-only డిపెండెన్సీలు లేకుండానే దిగుమతి చేసుకోగలగాలి. ప్రస్తుత
BigQuery అమలు ఇప్పటికే ఆ ఒప్పందాన్ని నెరవేరుస్తుంది. యాక్సెస్-టోకెన్ కాష్‌లు చైల్డ్
అమలు వ్యవధిలో మాత్రమే ఉంటాయి, వేర్వేరు అమలుల మధ్య కొనసాగవు. Node మద్దతు ఉన్న రన్‌టైమ్ (`package.json` engines), అయితే READMEలోని Bun
ఇన్‌స్టాలేషన్ విభాగం మరియు `Dockerfile.bun` కూడా
`bun:sqlite` (`src/lib/db/core.ts` / అడాప్టర్‌లు) ఉపయోగించే ప్రొడక్షన్ అనుకూలత మార్గాన్ని సూచిస్తాయి. కాబట్టి Bunలో, ఎగుమతులు మునుపటి
ఇన్-ప్రాసెస్ మార్గాన్ని కొనసాగిస్తూ, ఒక్కసారి హెచ్చరికను ఇస్తాయి: చైల్డ్ హీప్/టైమ్‌అవుట్ వేర్పాటు అందుబాటులో లేదు.
ఈవెంట్-లూప్ మరియు OOM వేర్పాటు కోసం Node ఉపయోగించండి; ఇక్కడ Bunను కేవలం అభివృద్ధి కోసం మాత్రమే ఉద్దేశించినదిగా పరిగణించరు.

`includeBodies` ప్రారంభించినప్పుడు, గంటవారీ పేలోడ్‌ల నిల్వ పేరుకుపోనివ్వకుండా
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` వంటి నిమిషాల స్థాయి షెడ్యూల్‌కు ప్రాధాన్యం ఇవ్వండి.
బ్యాచ్ మరియు వరుస పరిమితులు ఇప్పటికీ ప్రతి అమలును పరిమితం చేస్తాయి. ప్రతి అమలులో ప్రతి గమ్యస్థానానికి
ప్రాసెస్ ప్రారంభ ఖర్చు ఉంటుంది; ఇది మొత్తం CPU వినియోగాన్ని తగ్గించడానికి కాకుండా, కొద్దిపాటి ప్రారంభ ఖర్చుతో సర్వర్ ఈవెంట్-లూప్ వేర్పాటును అందిస్తుంది.

### పేలోడ్‌లు (ప్రాంప్ట్‌లు మరియు పూర్తిచేసిన ప్రతిస్పందనలు)

డిఫాల్ట్‌గా ఎగుమతిలో లాగ్‌ల **జాబితా** చూపించే సారాంశ ఫీల్డ్‌లు మాత్రమే ఉంటాయి.
**ప్రాంప్ట్‌లు మరియు ప్రతిస్పందనలను ఎగుమతి చేయి** (`includeBodies`) ప్రారంభిస్తే, ప్రతి కాల్ కోసం లాగ్‌ల **వివరాల**
పేన్ చూపించే సమాచారం కూడా పంపబడుతుంది:

| ఫీల్డ్                           | దానిలో ఉండే సమాచారం                                         |
| -------------------------------- | ----------------------------------------------------------- |
| `request_body` / `response_body` | డ్యాష్‌బోర్డ్ ప్రదర్శించే రూపంలో కాల్ పేలోడ్‌లు             |
| `pipeline_route_decision`        | రూటర్ ఎంచుకున్న లక్ష్యం మరియు మోడల్                         |
| `pipeline_client_request`        | క్లయింట్ పంపినట్లుగానే ఉన్న ముడి అభ్యర్థన                   |
| `pipeline_openai_request`        | అంతర్గత OpenAI ఆకృతిలోకి మార్చిన తర్వాతి అభ్యర్థన           |
| `pipeline_provider_request`      | ప్రొవైడర్ ఆకృతిలో, వాస్తవంగా అప్‌స్ట్రీమ్‌కు పంపిన అభ్యర్థన |
| `pipeline_provider_response`     | ముడి అప్‌స్ట్రీమ్ ప్రతిస్పందన                               |
| `pipeline_client_response`       | కాల్ చేసినవారికి తిరిగి అందించిన సమాచారం                    |
| `pipeline_error`                 | విఫలమైన కాల్‌కు సంబంధించిన పైప్‌లైన్-స్థాయి లోప వివరాలు     |
| `bodies_truncated`               | పై ఫీల్డ్‌లలో ఏదైనా `maxBodyBytes` పరిమితిని చేరితే True    |

ఇది ప్రాంప్ట్ కంటెంట్ కాబట్టి, **డిఫాల్ట్‌గా నిలిపివేయబడి ఉంటుంది**, ఉద్దేశపూర్వకంగానే ప్రతి గమ్యస్థానానికి విడిగా ఎంచుకోవాలి.
డ్యాష్‌బోర్డ్ చూపించేదే పంపబడుతుంది, ఎందుకంటే ఎగుమతి మరియు `getCallLogById` ఒకే వివరాల
నిర్ధారణ విధానాన్ని పంచుకుంటాయి: పేలోడ్‌లను
వ్రాసేటప్పుడే వాటి నుంచి PII మరియు రహస్య సమాచారం తొలగించబడతాయి, అలాగే
`noLog` API కీతో చేసిన కాల్ ఎటువంటి పేలోడ్‌నూ నిల్వ చేయదు, కాబట్టి ఎగుమతి చేయడానికి ఏమీ ఉండదు.

పేలోడ్‌లు ప్రతి వరుస కోసం ఫైల్‌సిస్టమ్ ఆర్టిఫాక్ట్ నుంచి చదవబడతాయి, కాబట్టి హైడ్రేషన్ కోరిన గమ్యస్థానాలకు
మాత్రమే అది జరుగుతుంది. ఆర్టిఫాక్ట్ లేకపోయినా లేదా పాడైపోయినా, బ్యాచ్‌ను విఫలం చేసి కర్సర్‌ను నిలిచిపోయేలా చేయకుండా,
null పేలోడ్‌లతో దాని సారాంశం ఎగుమతి చేయబడుతుంది.

`maxBodyBytes` (డిఫాల్ట్ 262144) ప్రతి ఫీల్డ్ పరిమాణాన్ని పరిమితం చేస్తుంది. పొడవైన పేలోడ్‌లు **వదిలివేయబడకుండా
కత్తిరించబడతాయి** — కత్తిరించిన ప్రాంప్ట్ కూడా "ఏమి అడిగారు" అనేదానికి సమాధానం ఇస్తుంది — అలాగే ఆ వరుసకు
`bodies_truncated` ఫ్లాగ్ జోడించబడుతుంది. స్ట్రీమ్‌లో చంక్‌లవారీగా వచ్చిన డెల్టాలు ఎగుమతి చేయబడవు; కలిపిన ప్రతిస్పందన
ఇప్పటికే `pipeline_provider_response` మరియు `pipeline_client_response`లో ఉంటుంది.

---

## 2. ఫైళ్లు

| భాగం                       | స్థానం                                       |
| -------------------------- | -------------------------------------------- |
| గమ్యస్థాన ఒప్పందం          | `src/lib/logExport/types.ts`                 |
| రిజిస్ట్రీ                 | `src/lib/logExport/registry.ts`              |
| రహస్యాల నిర్వహణ            | `src/lib/logExport/secrets.ts`               |
| రన్నర్ (పేరెంట్ IPC)       | `src/lib/logExport/runner.ts`                |
| ప్రాసెస్ జీవితచక్రం        | `src/lib/logExport/childRunner.ts`           |
| చైల్డ్ ప్రవేశ స్థానం       | `src/lib/logExport/exportChild.ts`           |
| చదవడానికి మాత్రమే తెరిచేది | `src/lib/db/logExportReadOnly.ts`            |
| ఉమ్మడి క్వెరీ/మ్యాపింగ్    | `src/lib/usage/callLogExportQueries.ts`      |
| వివరాల రిజాల్వర్           | `src/lib/usage/callLogDetailResolver.ts`     |
| API ప్రొజెక్షన్            | `src/lib/logExport/presenter.ts`             |
| BigQuery గమ్యస్థానం        | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA ప్రామాణీకరణ      | `src/lib/logExport/googleServiceAccount.ts`  |
| కాల్-లాగ్ మూలం             | `src/lib/usage/callLogExportSource.ts`       |
| శాశ్వత నిల్వ               | `src/lib/db/logExportDestinations.ts`        |
| క్రాన్ జాబ్                | `src/lib/jobs/logExportJob.ts`               |
| REST పొర                   | `src/app/api/log-export/`                    |
| డ్యాష్‌బోర్డ్ పేజీ         | `src/app/(dashboard)/dashboard/log-export/`  |

స్కీమా: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

అన్ని రూట్‌లకు మేనేజ్‌మెంట్ ప్రామాణీకరణ ఉంటుంది (`requireManagementAuth`). రహస్యాలు ఎప్పుడూ తిరిగి ఇవ్వబడవు:
నిల్వ చేసిన రహస్యానికి బదులుగా అక్షరాలా `__stored__` తిరిగి వస్తుంది, అప్‌డేట్ చేసేటప్పుడు ఆ విలువనే తిరిగి పంపితే
నిల్వ చేసిన క్రెడెన్షియల్ అలాగే ఉంటుంది.

రహస్యాన్ని ప్రకటించే రకానికి చెందిన గమ్యస్థానాన్ని సృష్టించడానికి లేదా అప్‌డేట్ చేయడానికి **`STORAGE_ENCRYPTION_KEY`
అవసరం**. అది లేకపోతే `encrypt()` ఎలాంటి సూచన లేకుండా ఇన్‌పుట్‌ను యథాతథంగా పంపిస్తుంది, కాబట్టి క్రెడెన్షియల్‌ను
SQLiteలో సాధారణ పాఠ్యంగా ఉంచే బదులు, వ్రాత చర్య 400తో తిరస్కరించబడుతుంది (Telegram webhook
వర్తింపజేసే రక్షణ కూడా ఇదే).

| పద్ధతి   | పాత్                                     | ఉద్దేశం                                                                    |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | గమ్యస్థాన రకాలు + వాటి కాన్ఫిగ్ ఫీల్డ్‌ల జాబితా                            |
| `GET`    | `/api/log-export/destinations`           | గమ్యస్థానాల జాబితా (రహస్యాలు దాచబడతాయి)                                    |
| `POST`   | `/api/log-export/destinations`           | గమ్యస్థానాన్ని సృష్టించడం                                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | ఒక గమ్యస్థానాన్ని చదవడం                                                    |
| `PUT`    | `/api/log-export/destinations/{id}`      | పేరు / ప్రారంభ స్థితి / కాన్ఫిగ్ / బ్యాచింగ్‌ను అప్‌డేట్ చేయడం             |
| `DELETE` | `/api/log-export/destinations/{id}`      | తొలగించడం                                                                  |
| `POST`   | `/api/log-export/destinations/{id}/test` | క్రెడెన్షియల్స్‌ను పరీక్షించడం, ఏదీ వ్రాయకపోవడం                            |
| `POST`   | `/api/log-export/destinations/{id}/run`  | షెడ్యూల్ చేసిన రన్ మార్గంలోనే, పెండింగ్‌లో ఉన్నవాటిని ఇప్పుడే ఎగుమతి చేయడం |
| `GET`    | `/api/log-export/status`                 | క్రాన్ స్థితి, ఇటీవలి రన్‌లు, ప్రతి లక్ష్యానికి పెండింగ్‌లో ఉన్న పని       |

`GET /api/log-export/types` వల్లే UI సాధారణీకృతంగా ఉంటుంది: తిరిగి వచ్చిన ఫీల్డ్ వివరణల ఆధారంగా
డ్యాష్‌బోర్డ్ ఫారమ్ రూపొందించబడుతుంది, కాబట్టి కొత్త గమ్యస్థానం కోసం UI మార్పు అవసరం లేదు.

---

## 4. BigQuery గమ్యం

కాన్ఫిగరేషన్ కీలు (`type: "bigquery"`):

| కీ                   | గమనికలు                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `projectId`          | డేటాసెట్ను కలిగి ఉన్న GCP ప్రాజెక్ట్                                                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                  |
| `location`           | డేటాసెట్ను సృష్టించాల్సి వచ్చినప్పుడు మాత్రమే ఉపయోగించబడుతుంది (డిఫాల్ట్ `EU`)                                   |
| `serviceAccountJson` | సర్వీస్-అకౌంట్ కీ. రహస్యం: విశ్రాంతి సమయంలో ఎన్క్రిప్ట్ చేయబడుతుంది, ఎప్పుడూ తిరిగి ఇవ్వబడదు                     |
| `autoCreate`         | లేని డేటాసెట్/టేబుల్ను సృష్టించండి; అవసరాన్ని బట్టి nullable usage-evidence కాలమ్లను జోడించండి (డిఫాల్ట్ `true`) |

సర్వీస్ అకౌంట్కు లక్ష్య టేబుల్పై `bigquery.tables.updateData` అనుమతి అవసరం. అలాగే
`autoCreate` ఆన్లో ఉన్నప్పుడు `bigquery.datasets.create` / `bigquery.tables.create`
అనుమతులు కూడా అవసరం. ఇప్పటికే ఉన్న టేబుల్కు రెండు nullable usage-evidence ఫీల్డ్లను
జోడించడానికి `bigquery.tables.update` కూడా అవసరం. అవసరమైన అనుమతి లేకపోతే ఎగుమతి
విఫలమవుతుంది, దాని cursor ముందుకు కదలదు.

కాన్ఫిగర్ చేసిన బ్యాచ్ ఒక **cursor** యూనిట్, HTTP యూనిట్ కాదు: `send()` దాన్ని గరిష్ఠంగా
500 వరుసల insertAll కాల్స్గా విభజిస్తుంది, కాబట్టి పెద్ద `batch_size` BigQuery యొక్క
10 MB అభ్యర్థన పరిమితిని అధిగమించదు. తాత్కాలిక స్థితులు (408/429/500/502/503/504)
exponential backoffతో గరిష్ఠంగా మూడు సార్లు మళ్లీ ప్రయత్నించబడతాయి; అదే insertIds
తిరిగి ఉపయోగించబడతాయి. ప్రామాణీకరణ మరియు స్కీమా వైఫల్యాలు మొదటి ప్రయత్నంలోనే
ఎగదీయబడతాయి, తద్వారా రన్ వృథా కాదు.

కొద్దిసేపటి క్రితం సృష్టించిన టేబుల్ streaming endpointకు ఇంకా కనిపించకపోవచ్చు; అది
కొన్ని సెకన్ల పాటు 404 సమాధానం ఇస్తుంది. ఆ 404 కోసం మళ్లీ ప్రయత్నించబడుతుంది, అయితే
**ఈ రన్ టేబుల్ను సృష్టించినప్పుడు మాత్రమే** — నిజంగా లేని టేబుల్ అయితే వెంటనే విఫలమవుతుంది.
ఇటీవల తొలగించిన టేబుల్ పేరుతో మళ్లీ టేబుల్ను సృష్టిస్తే BigQuery streaming insertsను
కొన్ని నిమిషాల పాటు తిరస్కరిస్తుందని గమనించండి; ఇది delete-then-recreate లక్షణం. అందువల్ల
టేబుల్ను తొలగించి మళ్లీ జోడించడానికి బదులుగా కొత్త టేబుల్ పేరును ఉపయోగించడం మంచిది.

**పాక్షిక వైఫల్యం HTTP 200తో పాటు ఖాళీ కాని `insertErrors[]`గా వస్తుంది.** ఇది
వైఫల్యంగా పరిగణించబడి ఎగదీయబడుతుంది. BigQuery అంగీకరించని వరుసలను దాటి cursor
ముందుకు కదలకుండా ఆపేది ఇదే; `tests/unit/log-export-bigquery.test.ts` ఈ ప్రవర్తనను
నిర్ధారిస్తుంది.

రవాణా సాధారణ REST — స్వయంగా సంతకం చేసిన RS256 assertionను
`https://oauth2.googleapis.com/token` వద్ద access token కోసం మార్పిడి చేసి, ఆపై వరుసలు
`tabledata.insertAll`కు పంపబడతాయి. Google SDK ఏదీ చేర్చబడదు. Access tokens
ప్రాసెస్లో (service account, scope) జంట ఆధారంగా క్యాష్ చేయబడతాయి.

సృష్టించిన టేబుల్లో Logs ట్యాబ్లోని ప్రతి ఫీల్డ్కు ఒక కాలమ్తో పాటు `exported_at` ఉంటుంది.
ఇది కాల్ లాగ్లను వాస్తవంగా ఎలా ప్రశ్నిస్తారో దానికి అనుగుణంగా అమర్చబడుతుంది:

- **`timestamp`పై రోజు-విభజన**, కాబట్టి తేదీ పరిధితో పరిమితం చేసిన ప్రశ్న ఆ రోజులను మాత్రమే స్కాన్ చేస్తుంది.
- **`api_key_name`, `provider`, `model`, `status` ఆధారంగా క్లస్టర్ చేయబడుతుంది** (ఈ క్రమంలో),
  కాబట్టి ఎవరు అమలు చేశారు, ఎక్కడికి పంపబడింది లేదా అది విఫలమైందా అనే దానిపై ఫిల్టర్ చేయడం
  ప్రతి విభజనలోని బ్లాక్లను తొలగిస్తుంది. BigQuery గరిష్ఠంగా నాలుగు క్లస్టరింగ్ కాలమ్లను
  అనుమతిస్తుంది మరియు క్రమం ముఖ్యం: `api_key_name`పై మాత్రమే ఉన్న ఫిల్టర్ బ్లాక్లను తొలగిస్తుంది,
  `status`పై మాత్రమే ఉన్న ఫిల్టర్ అలా చేయదు.
- `partitionExpirationDays` ద్వారా **ఐచ్ఛిక విభజన నిల్వ కాల పరిమితి** (0 అయితే ప్రతిదీ
  ఉంచబడుతుంది); టేబుల్ సృష్టించబడినప్పుడు ఇది వర్తింపజేయబడుతుంది.

రెండు సెట్టింగ్లు సృష్టించే సమయంలోనే వర్తిస్తాయి. ఇప్పటికే ఉన్న టేబుల్లో దానికి
ఇప్పటికే ఉన్న లేఅవుట్నే కొనసాగుతుంది; కాబట్టి వీటిని స్వీకరించాలనుకుంటే గమ్యాన్ని
కొత్త టేబుల్ IDకి చూపించండి.

`tests/unit/log-export-bigquery.test.ts` mapper మరియు టేబుల్ స్కీమా సమకాలికంగా
ఉండేలా నిర్ధారిస్తుంది, కాబట్టి కొత్త కాల్-లాగ్ కాలమ్ బయటకు పంపే సమయంలో నిశ్శబ్దంగా
తొలగించబడదు.

బ్యాచ్లు **వరుసల సంఖ్య మరియు సీరియలైజ్ చేసిన బైట్లు రెండింటి ఆధారంగా** విభజించబడతాయి.
payloadలు ఎగుమతి చేసినప్పుడు వరుసల సంఖ్య మాత్రమే సరిపోదు: prompts కలిగిన 500 వరుసలు
పదుల మెగాబైట్లుగా మారవచ్చు, మరియు 10 MB కంటే పెద్ద అభ్యర్థనను insertAll తిరస్కరిస్తుంది.
ఏది ముందుగా వస్తే దాని ప్రకారం, 500 వరుసలు లేదా 9 MB వద్ద chunks ముగుస్తాయి.

## 5. OTLP/HTTP ట్రేస్ల గమ్యస్థానం

కాన్ఫిగరేషన్లో `type: "otlp-http"` ఉపయోగించబడుతుంది. ఇది నిల్వ చేసిన కాల్ లాగ్లను ఎగుమతి చేసే
షెడ్యూల్ చేయబడిన, కర్సర్-ఆధారిత ఎగుమతి; ఇది
`open-sse/services/routing/otel.ts` లోని ఉత్తమ-ప్రయత్నం లైవ్ రూటింగ్-ఈవెంట్ సింక్ కాదు. ఇది ఆ సింక్కు సంబంధించిన
ఎన్విరాన్మెంట్ వేరియబుల్స్, టైమర్లు లేదా బఫర్లను చదవదు లేదా మార్చదు. రెండింటినీ ప్రారంభిస్తే, స్వతంత్ర
రెండు రకాల స్పాన్లు ఉత్పత్తి కావచ్చు; ఈ కాల్-లాగ్ స్పాన్లను వేరు చేయడానికి
`omniroute.log-export` ఇన్స్ట్రుమెంటేషన్ స్కోప్ను ఉపయోగించండి.

| Key                      | Default / purpose                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `endpoint`               | అవసరమైన పూర్తి HTTP(S) ట్రేస్ల URL; `/v1/traces` సఫిక్స్ జోడించబడదు                       |
| `headers`                | ఐచ్ఛిక `Name: value` లైన్లు లేదా స్ట్రింగ్ల JSON ఆబ్జెక్ట్; ఎన్క్రిప్ట్ చేయబడుతుంది       |
| `requestHeaderAllowlist` | ఖాళీ (ఆఫ్); స్పాన్ అట్రిబ్యూట్లుగా క్యాప్చర్ చేయాల్సిన క్లయింట్ హెడర్ పేర్లు/ప్రీఫిక్స్లు |
| `serviceName`            | `omniroute`; రిసోర్స్ `service.name`                                                      |
| `langfuseMapping`        | `false`; Langfuse జనరేషన్/సెషన్/యూజర్ అట్రిబ్యూట్లను జోడిస్తుంది                          |
| `identity`               | `pseudonymous`, `keyName`, లేదా `none`                                                    |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                   |
| `timeoutMs`              | ప్రతి HTTP ప్రయత్నానికి `30000`                                                           |
| `environment`            | సెట్ చేయబడదు; ఐచ్ఛిక `langfuse.environment`                                               |

సాధారణ డ్యాష్బోర్డ్ ఈ ఫీల్డ్లను రెండర్ చేస్తుంది. `paths` API అర్రేను లేదా న్యూలైన్లు/కామాలతో
వేరు చేసిన ఖచ్చితమైన పాత్లతో కూడిన టెక్స్ట్ఏరియాను అంగీకరిస్తుంది. స్పష్టంగా అనుమతించకపోతే Embeddings,
rerank మరియు ఇతర పాత్లు స్కిప్ చేయబడతాయి. స్కిప్ చేసిన వరుసలు కూడా కర్సర్ను ముందుకు కదిలిస్తాయి; ఇప్పటికే ఉన్న
రన్నర్లోని `exported`/`exportedTotal` కౌంటర్లు ఆమోదించబడిన స్పాన్లను కాకుండా, ఫిల్టర్ చేసిన వరుసలతో సహా
ప్రాసెస్ చేసిన సోర్స్ వరుసలను లెక్కిస్తాయి. ఫిల్టరింగ్ చైల్డ్లో జరుగుతుంది; దాని
IPC/కర్సర్ కాంట్రాక్ట్ మార్చబడదు.

URL ధృవీకరణ `src/shared/network/outboundUrlGuard.ts` లోని DB-రహిత
`parseAndValidateNonMetadataUrl` హెల్పర్ను ఉపయోగిస్తుంది: `block-metadata` పాలసీ. దీనిలో వెబ్హుక్ వాలిడేటర్కు
ఉన్నట్లే మెటాడేటా/ప్రోటోకాల్/ఎంబెడెడ్-క్రెడెన్షియల్ తనిఖీలు తప్పనిసరిగా ఉంటాయి; ప్రైవేట్ URLలు అనుమతించబడతాయి,
కానీ గ్లోబల్ ఫీచర్-ఫ్లాగ్ ఓవర్రైడ్ లేకుండానే లోకల్హోస్ట్/LAN టార్గెట్లను ఉద్దేశపూర్వకంగా అనుమతిస్తుంది. దీనివల్ల
ప్రైవేట్ HTTP ఎండ్పాయింట్లతో సహా self-hosted Langfuse, Phoenix, Tempo మరియు Collector
ఎండ్పాయింట్లను ఉపయోగించవచ్చు. క్లౌడ్-మెటాడేటా హోస్ట్లు ఎల్లప్పుడూ బ్లాక్ చేయబడతాయి.
రిడైరెక్ట్లను అనుసరించదు, కాబట్టి ఒక కలెక్టర్ క్రెడెన్షియల్లను వేరే హోస్ట్కు రీడైరెక్ట్ చేయలేడు.
ఇప్పటికే ఉన్న లెక్సికల్ URL గార్డ్లాగే, ఇది DNS రిజల్యూషన్ను పిన్ చేయదు; ఆపరేటర్ నియంత్రణలో ఉన్న హోస్ట్లనే
కాన్ఫిగర్ చేయండి. ఎండ్పాయింట్ విశ్వసనీయ నెట్వర్క్లో లేనప్పుడు HTTPSను
ప్రాధాన్యంగా ఉపయోగించండి.

### పేలోడ్ మరియు డెలివరీ

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) అనుమతించబడిన ప్రతి వరుసకు ఒక
CLIENT స్పాన్ను కలిగి ఉంటుంది; దానికి ఆ వరుసలోని ఖచ్చితమైన రిక్వెస్ట్ పాత్ పేరుగా ఉంటుంది. పాత్ పేరు
మోడల్ లేదా ఐడెంటిటీ డేటాను స్పాన్ పేరులో పొందుపరచకుండా Chat Completions, Responses మరియు Messages మధ్య
తేడాను చూపిస్తుంది. రిసోర్స్ అట్రిబ్యూట్లలో `service.name` మరియు ప్యాకేజీ యొక్క `service.version` ఉంటాయి.

సాధారణ చాట్ ప్రయత్న లాగర్ (`open-sse/handlers/chatCore/attemptLogging.ts`) పూర్తయ్యే సమయంలో
`duration = Date.now() - startTime` ను రాస్తుంది మరియు టైమ్స్టాంప్ను అందించదు;
`src/lib/usage/callLogs.ts` లోని `saveCallLogOperation` టైమ్స్టాంప్ను డిఫాల్ట్గా రైట్
(పూర్తయిన) సమయానికి సెట్ చేస్తుంది. అందువల్ల ఎగుమతి end = వరుస టైమ్స్టాంప్ మరియు start = end − duration
(మిల్లీసెకన్లను డెసిమల్ నానోసెకన్లుగా మార్చి)గా సెట్ చేస్తుంది. కాలర్ అందించిన చారిత్రక టైమ్స్టాంప్లను కూడా
end సమయంగా అలాగే భద్రపరుస్తుంది; ప్రతి వరుసకు start/completion విభజన లేదు.
null duration సున్నాగా మారుతుంది. చెల్లని/లేని టైమ్స్టాంప్లు నాన్-డిటర్మినిస్టిక్ స్పాన్లను సృష్టించకుండా
బ్యాచ్ను విఫలమయ్యేలా చేస్తాయి. `ttftMs` nullableగా ఉండి `omniroute.ttft_ms` కు మ్యాప్ అవుతుంది.

అట్రిబ్యూట్లలో `gen_ai.operation.name="chat"`, provider, requested/response model,
ఇన్పుట్/అవుట్పుట్ టోకెన్లు, ఐచ్ఛిక cache-read/cache-creation/reasoning టోకెన్లు, HTTP స్టేటస్,
కాంబో, క్యాష్ సోర్స్, సెషన్ ట్యాగ్ మరియు కోరిలేషన్ ID ఉంటాయి. పూర్ణాంక OTLP విలువలు మరియు టైమ్స్టాంప్లు
డెసిమల్ స్ట్రింగ్లుగా ఉంటాయి; స్ట్రింగ్లు, బూలియన్లు మరియు భిన్న సంఖ్యలు తమ స్థానిక OTLP విలువ
వేరియంట్లను ఉపయోగిస్తాయి. ఎర్రర్ స్పాన్లకు ERROR స్టేటస్ మరియు శుద్ధి చేసిన స్టేటస్ మెసేజ్ ఉంటాయి. కానానికల్
రికార్డ్లో అప్స్ట్రీమ్ హోస్ట్ URL ఉండదు; అందువల్ల `server.address` ను కలెక్టర్ను మోడల్ సర్వర్గా తప్పుగా
గుర్తించకుండా వదిలివేస్తారు. ఖర్చు ఎగుమతి చేయబడదు.

`includeBodies=true` ఉన్నప్పుడు మాత్రమే కంటెంట్ హైడ్రేట్ చేయబడుతుంది. `langfuseMapping=false` తో,
`gen_ai.input.messages` / `gen_ai.output.messages` OmniRoute నిల్వ చేసిన శుద్ధి చేసిన రిక్వెస్ట్/రెస్పాన్స్
బాడీ JSONను (పార్స్ చేయగలిగితే కానానికలైజ్ చేసి) కలిగి ఉంటాయి; ఇవి తిరిగి రూపొందించిన semconv
మెసేజెస్ అర్రే కాదు. క్లిప్ చేసిన/JSON కాని బాడీలు ముడి టెక్స్ట్గా ఉంటాయి. `langfuseMapping=true` తో,
బాడీలు `langfuse.observation.input` / `langfuse.observation.output` గా మాత్రమే పంపబడతాయి;
ప్రతి బాడీ ఒక్కసారి మాత్రమే పంపబడేలా `gen_ai.*.messages` అట్రిబ్యూట్లు వదిలివేయబడతాయి. రెండు మోడ్లు
ఇప్పటికే ఉన్న హైడ్రేషన్ పాత్ నుంచి `maxBodyBytes` ను వారసత్వంగా పొందుతాయి;
క్లిప్పింగ్ను `omniroute.bodies_truncated=true` సూచిస్తుంది.
ఈ గమ్యస్థానం అదనపు పైప్లైన్ స్నాప్షాట్లు లేదా శుద్ధి చేయని ఆర్టిఫ్యాక్ట్ రీడ్లను జోడించదు;
ఐచ్ఛిక రిక్వెస్ట్-హెడర్ క్యాప్చర్ క్రింద వివరించిన ఇప్పటికే ఉన్న హైడ్రేట్ చేసిన క్లయింట్ స్నాప్షాట్ను ఉపయోగిస్తుంది.
బాడీలను ఎగుమతి చేస్తున్నప్పుడు, గంటకొకసారి బ్యాక్లాగ్ పేరుకుపోకుండా
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` వంటి నిమిష స్థాయి క్యాడెన్స్ను ఉపయోగించండి.

### ఐచ్ఛిక క్లయింట్ రిక్వెస్ట్ హెడర్లు

హెడర్ క్యాప్చర్ **డిఫాల్ట్గా ఆఫ్లో ఉంటుంది**. డెస్టినేషన్ కాన్ఫిగ్లో `requestHeaderAllowlist` ను సెట్ చేసి,
**Export prompts and responses** ను ప్రారంభించండి (`includeBodies: true` ను డెస్టినేషన్లో సెట్ చేయండి).
అనుమతి జాబితా API అర్రేను లేదా న్యూలైన్/కామాలతో వేరు చేసిన పేర్లతో కూడిన టెక్స్ట్ఏరియాను అంగీకరిస్తుంది:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

పేర్లు case తేడాను పట్టించుకోకుండా ఖచ్చితంగా సరిపోలాలి; అయితే చివరలో ఉండే ఒకే `*`, ఖాళీ కాని
header-name prefixను ఎంచుకుంటుంది. విడిగా ఉండే `*`, మధ్యలో ఉండే wildcardలు మరియు చెల్లని HTTP header పేర్లు తిరస్కరించబడతాయి.
గరిష్ఠంగా 64 selectorలు ఉండవచ్చు; ప్రతి పేరు/prefix గరిష్ఠంగా 256 ASCII byteలు ఉండవచ్చు.
ఈ setting, exporterను collector వద్ద authenticate చేసే `headers` నుండి వేరుగా ఉంటుంది.

Capture అనేది save చేసిన detailed pipelineలోని
`clientRawRequest` (లేదా పాత `clientRequest`) నుండి populate చేయబడిన `pipeline_client_request`ను మాత్రమే చదువుతుంది. ఇది provider request headerలకు ఎప్పుడూ fallback కాదు.
Request record చేయబడిన సమయంలో detailed pipeline logging enable చేసి ఉండాలి.
`includeBodies` disable అయి ఉంటే, లేదా client-snapshot JSON లేకపోయినా, corrupt అయినా, clip అయినా ఎలాంటి header
attributeలు emit చేయబడవు. `maxBodyBytes`ను పెంచడం export సమయంలో snapshot clippingను నివారించవచ్చు;
అయితే ఎప్పుడూ save చేయని వివరాలను అది restore చేయలేదు. 1 MiB కంటే పెద్ద snapshot లేదా 256 కంటే ఎక్కువ
header entryలు ఉన్న snapshot విస్మరించబడుతుంది. ఇప్పటికే ఉన్న prompt/response export, header captureతో పాటు
enable చేయబడే ఉంటుంది; allowlist headers-only hydration modeను అందించదు.

ఎంచుకున్న valueలు, ఒకే string ఉన్నప్పటికీ, `http.request.header.<full lowercase header name>` OTLP string arrayలుగా మారుతాయి.
ఉదాహరణకు, `X-OmniRoute-Meta-Team: example-team` అనేది
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`తో
`http.request.header.x-omniroute-meta-team`గా మారుతుంది.
పూర్తి prefix అలాగే ఉంచబడుతుంది: ఇవి సాధారణ headerలు మాత్రమే; business-field parsing లేదా
`omniroute.metadata.*` / Langfuse metadata conversion ఉండదు. `langfuseMapping` header
semanticsను మార్చదు. ఎంచుకున్న single-valued `User-Agent`, ప్రామాణిక scalar
`user_agent.original`ను కూడా set చేస్తుంది. ఒక valueలోని commaలు విడగొట్టబడవు. Case variantలు save చేసిన
entry క్రమంలో merge అవుతాయి; ఏదైనా చెల్లని variant ఉంటే, ఆ header మొత్తం omit చేయబడుతుంది. Attributeలు lowercase పేరు ప్రకారం క్రమబద్ధీకరించబడతాయి.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headerలు, auth/token/secret/password/credential
markerలు ఉన్న పేర్లు మరియు అంతర్గత gateway credentialలు ఎంచుకున్నా లేదా storageలో పాక్షికంగా mask చేసినా
ఎల్లప్పుడూ exclude చేయబడతాయి. తెలిసిన credential patternలు shared credential detectorను మళ్లీ ఉపయోగిస్తాయి;
redaction markerలు సురక్షిత valueలుగా export కాకుండా omit చేయబడతాయి.
Stringలు మరియు ఖాళీ కాని string arrayలు మాత్రమే ఆమోదించబడతాయి; numberలు లేదా objectలు coerced చేయబడవు.
చెల్లని పేర్లు, prototype keyలు, control characterలు (horizontal tab మినహా) మరియు malformed Unicode,
batchను fail చేయకుండా లేదా వాటి contentను errorలలో ప్రతిబింబించకుండా విస్మరించబడతాయి.

ప్రతి span గరిష్ఠంగా 32 headerలు, ఒక్కో headerకు 16 valueలు, ఒక్కో valueకు 4096 UTF-8 byteలు,
మరియు capture చేసిన header పేర్లు, valueలన్నింటిలో కలిపి మొత్తం 16384 UTF-8 byteలను capture చేస్తుంది. పరిమితికి మించిన/చెల్లని headerలు
clip చేయబడకుండా పూర్తిగా omit చేయబడతాయి. Selection అనేది operator తీసుకునే privacy నిర్ణయం: సురక్షితంగా కనిపించే పేర్లలో కూడా
వ్యక్తిగత data ఉండవచ్చు; ఈ పరిమితులు/detectorలు సాధారణ PII scrubber కావు.

### డెలివరీ పరిమితులు

Requestలు envelopeతో సహా 500 spanలు మరియు 4 MiB UTF-8 JSONకు పరిమితం చేయబడతాయి.
Cursor batch యొక్క మొదటి requestకు ముందే అనుమతించబడిన ప్రతి span size-check చేయబడుతుంది. పరిమితి కంటే పెద్దదైన ఒక్క
span కూడా ఆ batchలోని ఏ భాగాన్నీ పంపకుండా, `maxBodyBytes`ను తగ్గించాలనే సూచనతో fail అవుతుంది;
అది నిశ్శబ్దంగా drop చేయబడదు. Preflight record referenceలు మరియు byte countలను మాత్రమే ఉంచుకుని,
ప్రతి తాత్కాలిక span/JSONను discard చేస్తుంది; batch యొక్క రెండవ serialized copyని ఉంచకుండా
పరిమిత chunkల కోసం spanలు మళ్లీ build చేయబడతాయి. HTTP 408/429/5xx, network failureలు మరియు timeoutలకు గరిష్ఠంగా
మూడు attemptలు ఉంటాయి, వాటి మధ్య 250/500 ms exponential backoff ఉంటుంది. `Retry-After`లోని secondలు లేదా HTTP dateలు
delayను గరిష్ఠంగా 5 secondల వరకు పొడిగించగలవు. ఇతర statusలు వెంటనే fail అవుతాయి. OTLP 2xx partial rejection కూడా
కోల్పోయిన spanను acknowledge చేయకుండా exception throw చేస్తుంది; ఖాళీ లేదా చెల్లుబాటు అయ్యే JSON acknowledgementలు
64 KiB response-read పరిమితితో ఆమోదించబడతాయి.

Errorలలో exporterకు చెందిన వాస్తవాలు మాత్రమే ఉంటాయి: HTTP status, retry class, attemptలు మరియు పంపిన span
countలు, లేదా స్థిరమైన acknowledgement/network failure పదజాలం. Collector response bodyలు,
partial-success countలు మరియు response headerలు errorలు, logలు లేదా
dashboardలోకి ఎప్పుడూ copy చేయబడవు. Fail అయిన లేదా పాక్షికంగా accept అయిన batch acknowledge చేయబడదు: destination ఆ statusతో
Failingగా చూపబడుతుంది, cursor చివరిగా acknowledge చేసిన batch వద్దే ఉంటుంది, తదుపరి run
అదే rowలను మళ్లీ పంపుతుంది. Collector లేదా configuration సరిచేయబడే వరకు permanent statusలు fail అవుతూనే ఉంటాయి.
Response వివరాల కోసం collector యొక్క సొంత logలను ఉపయోగించండి. Call-log error summaryలు
వాటి ప్రత్యేక redactionను అలాగే ఉంచుకుంటాయి.
`prepare()` ఏదీ provision చేయదు; Test ఖచ్చితంగా `{"resourceSpans":[]}`ను post చేసి,
call-log spanలను రాయకుండా HTTP statusను report చేస్తుంది.

Trace idలు మరియు span idలు వరుసగా
`"omniroute.trace\\0" + callLogId` మరియు `"omniroute.span\\0" + callLogId`పై SHA-256 యొక్క మొదటి 32/16 hex digitలు.
మళ్లీ పంపిన వాటిలో ఒకే idలు ఉంటాయి. ఇది deduplication హామీ కాదు: Langfuse
v4 ingestionతో సహా కొన్ని backendలు ఒకే-id spanలను deduplicate చేయవు. Crash లేదా partial chunk failure వల్ల
acknowledge చేయని ఒక cursor batch మాత్రమే మళ్లీ పంపబడవచ్చు; కేవలం దాని చివరి HTTP chunk మాత్రమే కాకుండా,
ఆ batch మొత్తం duplicate కావచ్చు. ఈ tradeoffను దృష్టిలో ఉంచుకుని cursor batch sizeను ఎంచుకోండి.

### Langfuse ఉదాహరణ

Self-host చేసిన Langfuse instance కోసం ఈ fieldలను configure చేయండి:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Literal `public-key:secret-key` stringను Base64గా మార్చి Authorization valueను స్థానికంగా build చేయండి
(ఉదాహరణకు `Buffer.from(publicKey + ":" + secretKey).toString("base64")`తో).
నిజమైన credentialలను logలు, screenshotలు లేదా issueలలో paste చేయవద్దు. Mapping స్వయంచాలకంగా
`x-langfuse-ingestion-version: 4`ను set చేస్తుంది; Authorization ఇప్పటికీ `headers`లోనే అందించబడుతుంది.
Headerలు మరియు generate చేసిన identity salt రెండూ ఇప్పటికే ఉన్న encrypted secret-field
mechanism మరియు API placeholderలను ఉపయోగిస్తాయి; `STORAGE_ENCRYPTION_KEY` అవసరం.

మ్యాపింగ్లో జనరేషన్ రకం/మోడల్, JSON వినియోగ వివరాలు (input/output/total మరియు అందుబాటులో ఉన్న
cache keys), JSON input/output స్నాప్షాట్లు, ERROR/DEFAULT స్థాయి, శుద్ధి చేసిన
స్థితి సందేశం, ట్రేస్ పేరు, సెషన్ ID, అలాగే provider, అభ్యర్థించిన మోడల్, path, combo, cache
source మరియు status కోసం ఐచ్ఛిక environment మరియు filter చేయగల
`langfuse.observation.metadata.<key>` చేర్చబడ్డాయి. `langfuse.observation.completion_start_time` అనేది
ప్రారంభ సమయానికి సంబంధించిన ISO 8601 విలువ; TTFT తెలిసి, వ్యవధిలోనే ఉన్నప్పుడు మాత్రమే
TTFT జోడించబడుతుంది. ఎటువంటి cost attributes పంపబడవు.

Identity modes `langfuse.user.id` కు వర్తిస్తాయి:

- `pseudonymous` (డిఫాల్ట్): API key యొక్క అంతర్గత id ను ప్రతి destination కు యాదృచ్ఛికంగా
  రూపొందించిన 32-బైట్ salt తో HMAC-SHA256గా మార్చిన విలువ. Salt లేకపోతే సృష్టించే సమయంలో
  రూపొందించబడుతుంది, `identitySalt`గా ఎన్క్రిప్ట్ చేయబడుతుంది, ఎప్పటికీ తిరిగి అందించబడదు,
  అలాగే సవరణల సమయంలో నిలుపుకోబడుతుంది. Raw key ids span attributes లో ఎప్పుడూ ఉంచబడవు.
  Destination యొక్క salt ను మళ్లీ సృష్టించడం/మార్చడం ద్వారా identities మారతాయి.
- `keyName`: కాన్ఫిగర్ చేసిన API key పేరు; ఆ operator labelను ఉద్దేశపూర్వకంగా బహిర్గతం చేస్తుంది.
- `none`: user id ఉండదు. ఉన్నప్పుడు session tags మాత్రం export చేయబడతాయి; ఈ modes
  యాదృచ్ఛిక prompt contentను లేదా operator అందించిన session/correlation labelsను anonymize చేయవు.

### Backfill లేకుండా ప్రారంభించడం

సృష్టించే సమయంలో మాత్రమే **Start from current position (skip existing logs)** ను ప్రారంభించండి లేదా
create API payload యొక్క top level వద్ద `startFromCurrentPosition: true` పంపండి. ఇది
ఇప్పటికే ఉన్న cursor helpersను ఉపయోగించి, ప్రస్తుతం నిల్వలో ఉన్న call-log rowid గరిష్ఠ విలువకు
`cursor_row_id` ను ప్రారంభిస్తుంది; migration అవసరం లేదు. డిఫాల్ట్ false (cursor 0 మరియు నిల్వలో
ఉన్న చరిత్రకు backfill).
ఇది update సమయంలో cursor reset చేసే setting కాదు.

భాగస్వామ్య `ttftMs` జోడింపుతో BigQuery mapper మరియు new-table schemaకు nullable
`ttft_ms` column కూడా జోడించబడుతుంది: ప్రతి canonical record fieldకు ఒక column ఉండాలని దాని
schema test కోరుతుంది. ఇప్పటికే ఉన్న tables మార్పులేకుండా export అవుతూనే ఉంటాయి:
`prepare()` table schemaను చదివి, ఆ column లేనప్పుడు మాత్రమే `ttft_ms` ను వదిలివేస్తుంది.
తదుపరి runలో TTFT పొందడానికి nullable INT64 columnను జోడించండి లేదా కొత్త tableను ఉపయోగించండి.
ఐచ్ఛిక TTFT column schema updateను ప్రారంభించదు. Usage-evidence columns
క్రింది conditional, opt-in compatibility flowను అనుసరిస్తాయి; ఇతర row fields కఠినమైన
schema checkingను కొనసాగిస్తాయి.

---

## 6. గమ్యస్థానాన్ని జోడించడం

1. `LogExportDestinationType`ను ఎగుమతి చేసే `src/lib/logExport/destinations/<name>.ts`ను సృష్టించండి:
   ఒక Zod `configSchema`, UI కోసం ఒక `fields` వివరణాత్మక శ్రేణి, `secretFields`, మరియు
   `test()` / `prepare()` / `send(records)`ను అందించే `createClient(config)`.
2. దాన్ని `src/lib/logExport/registry.ts`లోని `DESTINATIONS` శ్రేణికి జోడించండి.
3. `tests/unit/` కింద పరీక్షలు రాయండి.

చేయాల్సిన మార్పు అంతే: శాశ్వత నిల్వ, cron జాబ్, REST లేయర్, రహస్యాల గుప్తీకరణ మరియు
డాష్‌బోర్డ్ ఫారమ్ అన్నీ రిజిస్ట్రీనే చదువుతాయి.

కొత్త గమ్యస్థానం కోసం రెండు నియమాలు:

- పాక్షిక వైఫల్యం సంభవించినప్పుడు `send()` **తప్పనిసరిగా ఎక్సెప్షన్‌ను విసరాలి**. విజయవంతంగా పూర్తవడం అంటే "ఈ వరుసలు గమ్యస్థానంలో ఉన్నాయి" అని అర్థం,
  అప్పుడు కర్సర్ శాశ్వతంగా వాటిని దాటి ముందుకు కదులుతుంది.
- వినియోగదారు అందించిన URLను స్వీకరించే గమ్యస్థానం, వెబ్‌హుక్‌ల మాదిరిగానే, ఫెచ్ చేయడానికి ముందు
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) ద్వారా దాన్ని ధృవీకరించాలి.
  BigQueryకి ఇది అవసరం లేదు: దాని హోస్ట్‌లు స్థిరాంకాలు.

---

## 7. దీన్ని నిర్వహించడం

- **డాష్బోర్డ్**: ఇంటిగ్రేషన్లు → లాగ్ ఎగుమతి. ఒక గమ్యాన్ని జోడించి, ఆధారాలను
  వరుసలు రాయకుండా తనిఖీ చేయడానికి **Test** ను అమలు చేసి, ఆపై దాన్ని ప్రారంభించండి.
- **బ్యాక్లాగ్**: ప్రతి గమ్య కార్డ్ పెండింగ్లో ఉన్న వరుసలు మరియు కర్సర్ను చూపిస్తుంది; `GET
/api/log-export/status` అదే గణాంకాలతో పాటు చివరి 20 జాబ్ రన్లను అందిస్తుంది.
- **విఫలమయ్యే గమ్యం ఇతర గమ్యాల రన్ను విఫలం చేయదు** — రన్ సారాంశం ప్రతి గమ్యానికి సంబంధించిన
  స్థితిని `last_status` / `last_error` లో నమోదు చేస్తుంది, అలాగే జాబ్ రన్ చరిత్ర సమగ్ర స్థితిని
  నిల్వ ఉంచుతుంది.
- **గమ్యాన్ని తొలగించడం దాని కర్సర్ను కూడా తొలగిస్తుంది.** దాన్ని మళ్లీ జోడిస్తే, అత్యంత పాతగా
  నిల్వ ఉన్న కాల్ లాగ్ నుంచి ప్రారంభమవుతుంది; దీనివల్ల ఆ గమ్యం ఇప్పటికే కలిగి ఉండే వరుసలు
  మళ్లీ పంపబడవచ్చు. BigQueryలో ప్రతి వరుసకు ఉన్న `insertId` దీనిని BigQuery స్వంత
  డీ-డూప్లికేషన్ వ్యవధిలో మాత్రమే నిరోధిస్తుంది, కాబట్టి గమ్యాన్ని తొలగించడం కంటే
  డిసేబుల్ చేయడం మంచిది.

### వినియోగ-ఆధారాల స్కీమా అనుకూలత

కొత్త BigQuery పట్టికల్లో nullable `usage_evidence` (JSON కలిగిన STRING) మరియు
`usage_estimated` (BOOL) ఉంటాయి. `autoCreate` ప్రారంభించబడి ఉంటే, ఇప్పటికే ఉన్న పట్టికకు
ఈ లేని nullable కాలమ్లను మాత్రమే జోడించవచ్చు. ఎగుమతిదారు ఫీల్డ్ మెటాడేటాతో సహా ఇప్పటికే ఉన్న
పూర్తి స్కీమాను సంరక్షించి, తిరిగి పొందిన etagను ఉపయోగించి షరతులతో కూడిన PATCHను
సమర్పిస్తుంది. సమకాలీన స్కీమా మార్పు ఎగుమతిని విఫలం చేస్తుంది; దాని స్థానంలో తదుపరి రన్
పట్టికను మళ్లీ చదువుతుంది.

`autoCreate` డిసేబుల్ చేయబడి ఉంటే, వినియోగ ఆధారాలతో రికార్డులను ఎగుమతి చేయడానికి ముందు
ఈ కాలమ్లను మీరే జోడించండి. స్కీమా/etag మెటాడేటా లేకపోవడం లేదా విఫలమైన అప్డేట్ కూడా
ఆధారాలు కలిగిన ఇన్సర్ట్లను నిరోధిస్తుంది. ఆ విఫలతపై ఎగుమతి కర్సర్ ముందుకు కదలదు మరియు
ఆధారాలు ఎప్పుడూ మౌనంగా తొలగించబడవు. ఎగుమతి నిలిచిపోయిన సమయంలో కూడా స్థానిక లాగ్
నిల్వ వ్యవధి వర్తిస్తుంది, కాబట్టి నిల్వలో ఉన్న మూల వరుసలు గడువు ముగిసేలోపు విఫలతను
పరిష్కరించండి.
