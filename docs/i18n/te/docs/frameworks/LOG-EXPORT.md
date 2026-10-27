# Log export (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute కాల్ లాగ్లను బాహ్య అనలిటిక్స్ స్టోర్కు నిరంతరంగా, ఇంక్రిమెంటల్గా ఎగుమతి చేయడం.

Logs డ్యాష్బోర్డ్ ట్యాబ్ అభ్యర్థన చరిత్రను SQLite (`call_logs`)లో ఉంచుతుంది; ఇది
రోటేషన్ మరియు రిటెన్షన్ ద్వారా పరిమితం చేయబడుతుంది. లాగ్ ఎగుమతి అదే రికార్డ్ సమితిని షెడ్యూల్ ప్రకారం బయటకు పంపుతుంది, తద్వారా అది
స్థానిక డేటాబేస్ కంటే ఎక్కువకాలం నిలిచి, ఇతర డేటాతో జాయిన్ చేయబడగలదు. BigQuery మొదటి గమ్యస్థానం;
పైప్లైన్ ఒక రిజిస్ట్రీ కాబట్టి, మరిన్ని గమ్యస్థానాలను అదనంగా జోడించవచ్చు.

---

## 1. ఇది ఎలా పనిచేస్తుంది

```
server (configను decrypt చేసి validate చేయడం, cursorను reconcile చేయడం)
  → IPC ప్రారంభం → వేరుచేయబడిన exportChild OS process
    → read-only storage.sqlite → భాగస్వామ్య call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server cursorను persist చేస్తుంది → ack IPC
          → తదుపరి batch; done IPC → server విజయాన్ని నమోదు చేస్తుంది
```

- **షెడ్యూల్** — ఒక `JobRegistry` cron job, `log_export`, డిఫాల్ట్గా `0 * * * *` (ప్రతి గంటకు,
  UTC). `src/lib/initCloudSync.ts`లో నమోదు చేయబడుతుంది; `OMNIROUTE_LOG_EXPORT_CRON`తో మార్చవచ్చు.
  ప్రతి tick, **ప్రారంభించబడిన** ప్రతి destinationను వరుసగా drain చేస్తుంది.
- **కర్సర్** — SQLite యొక్క implicit `call_logs.rowid`, ప్రతి destinationకు
  `log_export_destinations.cursor_row_id`లో persist చేయబడుతుంది. `timestamp`ను ఉద్దేశపూర్వకంగా cursorగా ఉపయోగించరు:
  callers తమ సొంత విలువను అందించవచ్చు, కాబట్టి ఆలస్యమైన request, దాని తర్వాత ప్రారంభమైన వేగవంతమైన request
  అనంతరం వ్రాయబడవచ్చు; timestamp cursor దానిని దాటవేస్తుంది.
- **బ్యాచింగ్** — ప్రతి requestకు `batch_size` rows (డిఫాల్ట్ 500), ప్రతి runకు
  `max_rows_per_run` rows (డిఫాల్ట్ 10000); దీనివల్ల పెద్ద backlog ఒకే runను block చేయకుండా
  అనేక ticksలో drain అవుతుంది.
- **డెలివరీ** — `send()` resolve అయిన తర్వాత మాత్రమే cursor ముందుకు కదులుతుంది. విఫలమైన batch
  cursorను ఉన్న చోటే ఉంచుతుంది, కాబట్టి తదుపరి runలో అవే rows మళ్లీ ప్రయత్నించబడతాయి. హామీ
  true exactly-once కాదు; at-least-onceతో పాటు destination-side de-duplication: BigQuery ప్రతి
  rowకు call-log id ఆధారంగా key ఇస్తుంది, దాని సొంత dedup windowలో best-effort ప్రాతిపదికన దాన్ని గౌరవిస్తుంది.
- **ఓవర్ల్యాప్ గార్డ్** — cron tick మరియు `POST .../run` ఒకేసారి ప్రారంభం కావచ్చు. ఇప్పటికే
  drain అవుతున్న destinationను రెండుసార్లు drain చేయకుండా దాటవేస్తుంది (run resultలో `skipped: true`);
  అందువల్ల concurrent run ఒక batchను మళ్లీ పంపడం లేదా cursorను వెనక్కి వ్రాయడం చేయలేదు.
- **పర్జ్ రికవరీ** — `cursor_row_id`, `MAX(rowid)` కంటే పైకి వెళ్లిపోతే (మొత్తం table
  purge చేయబడి rowids మళ్లీ ప్రారంభమైతే), runner శాశ్వతంగా ఏమీ గుర్తించలేని స్థితిలో ఉండకుండా 0కు rewind అవుతుంది.

### వేరుచేయబడిన runner మరియు పరిమితులు

Nodeలో ప్రతి destination run ఒక ప్రత్యేకమైన, స్వల్పకాలిక OS child processను (`child_process`
తో IPC, `worker_threads` కాదు) ప్రారంభిస్తుంది. Body reads, payload JSON parsing/serialization, destination
`prepare()` మరియు destination network I/O అన్నీ server యొక్క event loopలో కాకుండా అందులోనే run అవుతాయి.
IPC ద్వారా configuration మరియు చిన్న progress messages మాత్రమే వెళ్తాయి; export చేసిన records ఎప్పుడూ
serverకు తిరిగి రావు. cron job మరియు Run now route ఒకే public result మరియు overlap guardను కొనసాగిస్తాయి.

Child, server resolve చేసిన `DATA_DIR/storage.sqlite`ను `node:sqlite` ఉపయోగించి read-onlyగా తెరుస్తుంది;
`busy_timeout=5000` మరియు `query_only=ON`తో. ఇది ఏ DB singletonను import చేయదు, అలాగే
migrations, backups లేదా SQLite updates ఏవీ నిర్వహించదు. Missing/corrupt artifact bookkeeping (corrupt-artifact
UPDATEతో సహా) dashboard detail pathలో మాత్రమే ఉంటుంది. రెండు paths ఒక pure detail resolverను
పంచుకుంటాయి; export asynchronous filesystem reads మరియు అదే artifact → legacy inline → legacy disk → none
resolution క్రమాన్ని ఉపయోగిస్తుంది. Child తన readerను తెరిచినప్పుడు run గరిష్ఠ insertion rowid యొక్క snapshotను
తీసుకుంటుంది; తర్వాతి inserts తదుపరి run కోసం వేచి ఉంటాయి. ఇది insertion boundary మాత్రమే,
దీర్ఘకాలిక SQLite transaction కాదు: network waits సమయంలో WAL writers మరియు checkpoints స్వేచ్ఛగా కొనసాగుతాయి.
ఇప్పటికే ఉన్న rowsకు updates/deletions ఈ boundary వల్ల freeze కావు.

అంగీకరించిన ప్రతి batch తర్వాత, child acknowledgement కోసం వేచి ఉంటుంది. Server మొదట
`advanceLogExportCursor`తో cursorను persist చేసి, తర్వాత `ack` పంపుతుంది; దానికి ముందు తదుపరి batch ప్రారంభం కాదు.
send failure, crash లేదా timeout, ఆ batchను ముందుకు జరపకుండా failureను నమోదు చేస్తుంది. గతంలో
acknowledge చేసిన batches committedగానే ఉంటాయి; acknowledgement అందని ఒక్క batch మాత్రమే మళ్లీ పంపబడవచ్చు.
`done` అందిన తర్వాత మరియు child cleanగా exit అయిన తర్వాత మాత్రమే success నమోదు అవుతుంది. Failures childను
SIGTERMతో terminate చేస్తాయి, 500 ms తర్వాత SIGKILLకు escalation చేస్తాయి, అలాగే runner process closure కోసం వేచి ఉంటుంది.

| Environment variable                          | డిఫాల్ట్ | ఉద్దేశ్యం                              |
| --------------------------------------------- | -------- | -------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | ప్రతి destinationకు wall-clock పరిమితి |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Child V8 old-space పరిమితి, MBలో       |

చెల్లని/ధనాత్మకం కాని/integer కాని విలువలకు defaults ఉపయోగించబడతాయి. Heap setting మొత్తం
RSS పరిమితి కాదు; చాలా పెద్ద batches ఇప్పటికీ child memoryని పూర్తిగా వినియోగించి runను సురక్షితంగా విఫలం చేయవచ్చు.
1024 MB default, bodies ప్రారంభించి ఉన్నప్పుడు 512 KiB artifactsతో కూడిన default 500-row batchకు,
BigQuery యొక్క byte-chunked JSON serializationతో సహా, అదనపు స్థలాన్ని ఉంచుతుంది. ఇది
10000-row bodies batchను సురక్షితంగా చేయదు. V8 heap exhaustion పరిష్కార సూచనతో కూడిన failureను నమోదు చేస్తుంది:
batch sizeను తగ్గించండి లేదా `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`ను పెంచండి; cursor చివరిగా
acknowledge చేసిన batch వద్దే ఉంటుంది. Historical inline/disk bodies ఆధునిక artifact cap పరిధిలోకి రావు.
Operators RSSను విడిగా పరిగణనలోకి తీసుకోవాలి, ముఖ్యంగా memory-limited containersలో.

Child resolve చేసిన `DATA_DIR`, `NODE_ENV`, explicit `TZ` (legacy filename
local-time resolution), ఉన్నప్పుడు `ELECTRON_RUN_AS_NODE`, అలాగే కింది outbound inputsను మాత్రమే inherit చేస్తుంది:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (మరియు వాటి lowercase రూపాలు),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Global Undici dispatcher, `NO_PROXY`తో సహా server యొక్క pure environment-proxy resolution మరియు local-host
bypass rulesను పంచుకుంటుంది; ఇది `proxyFetch.ts`ను లేదా దాని DB/feature flagsను import చేయదు.
Forward చేసిన output మరియు నమోదు చేసిన errorsలో proxy credentials redacted చేయబడతాయి. Destination credentials
ఒక్క start IPC messageలో మాత్రమే ప్రయాణిస్తాయి, argv లేదా environmentలో ఎప్పుడూ కాదు; output/error forwardingకు
prefix జోడించి sanitize చేస్తారు. ప్రతి cron runలో Node యొక్క SQLite warning పునరావృతం కాకుండా ఉండటానికి
child exec argumentsలో `ExperimentalWarning` మాత్రమే disable చేయబడుతుంది; ఇతర warning types కనిపిస్తూనే ఉంటాయి.

గమ్యస్థాన మాడ్యూల్లను Next.js/సర్వర్కు-మాత్రమే పరిమితమైన డిపెండెన్సీలు లేకుండా ఇంపోర్ట్ చేయగలగాలి. ఇప్పటికే ఉన్న
BigQuery అమలు ఆ ఒప్పందాన్ని పాటిస్తోంది. యాక్సెస్-టోకెన్ క్యాష్లు చైల్డ్
రన్ వరకు మాత్రమే ఉంటాయి, రన్ల మధ్య కొనసాగవు. Node మద్దతు ఉన్న రన్టైమ్ (`package.json` engines), అయితే READMEలోని Bun
ఇన్స్టాలేషన్ విభాగం మరియు `Dockerfile.bun` కూడా `bun:sqlite` (`src/lib/db/core.ts` / అడాప్టర్లు) ఉపయోగించే ప్రొడక్షన్ అనుకూలత మార్గాన్ని
ప్రచారం చేస్తాయి. అందువల్ల Bun కింద, ఎక్స్పోర్ట్లు మునుపటి
ఇన్-ప్రాసెస్ మార్గాన్ని కొనసాగిస్తాయి మరియు ఒకసారి మాత్రమే హెచ్చరికను జారీ చేస్తాయి: చైల్డ్ హీప్/టైమ్అవుట్ ఐసోలేషన్ అందుబాటులో లేదు. ఈవెంట్-లూప్ మరియు OOM ఐసోలేషన్ కోసం
Node ఉపయోగించండి; ఇక్కడ Bunను కేవలం డెవలప్మెంట్ కోసం మాత్రమే ఉద్దేశించినదిగా పరిగణించరు.

`includeBodies` ప్రారంభించినప్పుడు, గంటకొకసారి పేలోడ్ బ్యాక్లాగ్ను పోగుచేయడానికి బదులుగా
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` వంటి నిమిష-స్థాయి షెడ్యూల్కు ప్రాధాన్యం ఇవ్వండి.
బ్యాచ్ మరియు రో పరిమితులు ఇప్పటికీ ప్రతి రన్ను నియంత్రిస్తాయి. ప్రతి రన్లో ప్రతి గమ్యస్థానానికి ప్రాసెస్ స్టార్టప్ ఖర్చు ఉంటుంది;
ఇది మొత్తం CPU వినియోగాన్ని తగ్గించడం కోసం కాకుండా, సర్వర్ ఈవెంట్-లూప్ ఐసోలేషన్ కోసం స్వల్ప స్టార్టప్ ఖర్చును అంగీకరిస్తుంది.

### పేలోడ్లు (ప్రాంప్ట్లు మరియు కంప్లీషన్లు)

డిఫాల్ట్గా, ఎక్స్పోర్ట్లో Logs **జాబితా** చూపించే సారాంశ ఫీల్డ్లు మాత్రమే ఉంటాయి. **ప్రాంప్ట్లు మరియు ప్రతిస్పందనలను ఎక్స్పోర్ట్ చేయండి** (`includeBodies`)ను
ఆన్ చేస్తే, ప్రతి కాల్ కోసం Logs **వివరాల**
పేన్ చూపించేవి కూడా అదనంగా పంపబడతాయి:

| ఫీల్డ్                           | అందులో ఉండేది                                            |
| -------------------------------- | -------------------------------------------------------- |
| `request_body` / `response_body` | డ్యాష్బోర్డ్ రెండర్ చేసిన విధంగా కాల్ పేలోడ్లు           |
| `pipeline_route_decision`        | రౌటర్ ఎంచుకున్న టార్గెట్ మరియు మోడల్                     |
| `pipeline_client_request`        | క్లయింట్ పంపినట్లుగానే ఉన్న ముడి రిక్వెస్ట్              |
| `pipeline_openai_request`        | అంతర్గత OpenAI ఆకృతిలోకి అనువదించిన తర్వాతది             |
| `pipeline_provider_request`      | ప్రొవైడర్ డైలెక్ట్లో వాస్తవంగా అప్స్ట్రీమ్కు పంపినది     |
| `pipeline_provider_response`     | ముడి అప్స్ట్రీమ్ ప్రతిస్పందన                             |
| `pipeline_client_response`       | కాలర్కు తిరిగి అందించినది                                |
| `pipeline_error`                 | విఫలమైన కాల్కు సంబంధించిన పైప్లైన్-స్థాయి ఎర్రర్ వివరాలు |
| `bodies_truncated`               | పైనున్న ఏదైనా ఫీల్డ్ `maxBodyBytes`ను చేరినప్పుడు True   |

ఇది ప్రాంప్ట్ కంటెంట్, కాబట్టి ఇది **డిఫాల్ట్గా ఆఫ్లో ఉంటుంది** మరియు ఉద్దేశపూర్వకంగా ప్రతి గమ్యస్థానానికి విడిగా ఎంచుకునే ఎంపిక.
ఎక్స్పోర్ట్ మరియు `getCallLogById` ఒకే వివరాల
రిజల్యూషన్ను పంచుకుంటాయి కాబట్టి, డ్యాష్బోర్డ్ చూపించేదే పంపబడుతుంది: పేలోడ్లు రాయబడే సమయానికే
PII-శుద్ధి చేయబడి, సీక్రెట్లు తొలగించబడతాయి; అలాగే `noLog` API కీతో చేసిన కాల్
ఏ పేలోడ్నూ నిల్వ చేయదు, కాబట్టి ఎక్స్పోర్ట్ చేయడానికి ఏమీ ఉండదు.

పేలోడ్లు ప్రతి రోకు ఫైల్సిస్టమ్ ఆర్టిఫాక్ట్ నుండి చదవబడతాయి, కాబట్టి వాటిని అభ్యర్థించిన గమ్యస్థానాల కోసం మాత్రమే
హైడ్రేషన్ అమలవుతుంది. ఆర్టిఫాక్ట్ లేకపోయినా లేదా పాడైపోయినా, బ్యాచ్ విఫలమై కర్సర్ నిలిచిపోవడానికి బదులుగా
null పేలోడ్లతో దాని సారాంశం ఎక్స్పోర్ట్ అవుతుంది.

`maxBodyBytes` (డిఫాల్ట్ 262144) ప్రతి ఫీల్డ్ను పరిమితం చేస్తుంది. పొడవైన పేలోడ్లు తొలగించబడటానికి బదులుగా
**కుదించబడతాయి** — కత్తిరించిన ప్రాంప్ట్ కూడా "ఏమి అడిగారు" అనే ప్రశ్నకు సమాధానం ఇస్తుంది — మరియు ఆ రో
`bodies_truncated`తో ఫ్లాగ్ చేయబడుతుంది. స్ట్రీమ్ చేసిన చంక్-వారీ డెల్టాలు ఎక్స్పోర్ట్ చేయబడవు; సమీకరించిన ప్రతిస్పందన
ఇప్పటికే `pipeline_provider_response` మరియు `pipeline_client_response`లో ఉంటుంది.

---

## 2. ఫైళ్లు

| భాగం                        | స్థానం                                       |
| --------------------------- | -------------------------------------------- |
| గమ్యస్థాన కాంట్రాక్ట్       | `src/lib/logExport/types.ts`                 |
| రిజిస్ట్రీ                  | `src/lib/logExport/registry.ts`              |
| సీక్రెట్ నిర్వహణ            | `src/lib/logExport/secrets.ts`               |
| రన్నర్ (పేరెంట్ IPC)        | `src/lib/logExport/runner.ts`                |
| ప్రాసెస్ జీవితచక్రం         | `src/lib/logExport/childRunner.ts`           |
| చైల్డ్ ఎంట్రీ               | `src/lib/logExport/exportChild.ts`           |
| రీడ్-ఓన్లీ ఓపెనర్           | `src/lib/db/logExportReadOnly.ts`            |
| భాగస్వామ్య క్వెరీ/మ్యాపింగ్ | `src/lib/usage/callLogExportQueries.ts`      |
| వివరాల రిజాల్వర్            | `src/lib/usage/callLogDetailResolver.ts`     |
| API ప్రొజెక్షన్             | `src/lib/logExport/presenter.ts`             |
| BigQuery గమ్యస్థానం         | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA ప్రమాణీకరణ        | `src/lib/logExport/googleServiceAccount.ts`  |
| కాల్-లాగ్ మూలం              | `src/lib/usage/callLogExportSource.ts`       |
| స్థిర నిల్వ                 | `src/lib/db/logExportDestinations.ts`        |
| Cron జాబ్                   | `src/lib/jobs/logExportJob.ts`               |
| REST లేయర్                  | `src/app/api/log-export/`                    |
| డ్యాష్బోర్డ్ పేజీ           | `src/app/(dashboard)/dashboard/log-export/`  |

స్కీమా: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

అన్ని రూట్లు నిర్వహణ ప్రామాణీకరణను ఉపయోగిస్తాయి (`requireManagementAuth`). సీక్రెట్లు ఎప్పుడూ తిరిగి ఇవ్వబడవు:
నిల్వ చేసిన సీక్రెట్ అక్షరాలా `__stored__`గా తిరిగి వస్తుంది, అప్డేట్లో అదే విలువను తిరిగి పంపితే
నిల్వ చేసిన క్రెడెన్షియల్ అలాగే ఉంచబడుతుంది.

సీక్రెట్ను ప్రకటించే రకానికి చెందిన గమ్యస్థానాన్ని సృష్టించడం లేదా అప్డేట్ చేయడం కోసం **తప్పనిసరిగా
`STORAGE_ENCRYPTION_KEY` అవసరం**. అది లేకపోతే `encrypt()` ఎలాంటి హెచ్చరిక లేకుండా విలువను యథాతథంగా పంపిస్తుంది, కాబట్టి క్రెడెన్షియల్ను
SQLiteలో ప్లెయిన్టెక్స్ట్గా ఉంచడానికి బదులుగా రైట్ 400తో తిరస్కరించబడుతుంది (Telegram webhook కూడా
ఇదే రక్షణను వర్తింపజేస్తుంది).

| పద్ధతి   | పాత్                                     | ఉద్దేశ్యం                                               |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | గమ్యస్థాన రకాలు + వాటి కాన్ఫిగ్ ఫీల్డ్ జాబితా           |
| `GET`    | `/api/log-export/destinations`           | గమ్యస్థానాల జాబితా (సీక్రెట్లు దాచబడతాయి)               |
| `POST`   | `/api/log-export/destinations`           | గమ్యస్థానాన్ని సృష్టించడం                               |
| `GET`    | `/api/log-export/destinations/{id}`      | ఒకదాన్ని చదవడం                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | పేరు / ఎనేబుల్డ్ స్థితి / కాన్ఫిగ్ / బ్యాచింగ్ అప్డేట్  |
| `DELETE` | `/api/log-export/destinations/{id}`      | తొలగించడం                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | క్రెడెన్షియల్లను పరీక్షించడం, ఏమీ రాయకపోవడం             |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ఇప్పుడు ఖాళీ చేయడం, షెడ్యూల్ చేసిన రన్కు సమానమైన పాత్   |
| `GET`    | `/api/log-export/status`                 | Cron స్థితి, ఇటీవలి రన్లు, ప్రతి లక్ష్యానికి బ్యాక్లాగ్ |

`GET /api/log-export/types` UIని సాధారణీకరించడానికి ఉపయోగపడుతుంది: తిరిగి వచ్చిన ఫీల్డ్ డిస్క్రిప్టర్ల ఆధారంగా
డ్యాష్బోర్డ్ ఫారం రెండర్ చేయబడుతుంది, కాబట్టి కొత్త గమ్యస్థానం కోసం UI మార్పు అవసరం లేదు.

---

## 4. BigQuery గమ్యస్థానం

కాన్ఫిగ్ కీలు (`type: "bigquery"`):

| కీ                   | గమనికలు                                                                               |
| -------------------- | ------------------------------------------------------------------------------------- |
| `projectId`          | డేటాసెట్ను కలిగి ఉన్న GCP ప్రాజెక్ట్                                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                       |
| `tableId`            | `[A-Za-z0-9_]+`                                                                       |
| `location`           | డేటాసెట్ను సృష్టించాల్సి వచ్చినప్పుడు మాత్రమే ఉపయోగించబడుతుంది (డిఫాల్ట్ `EU`)        |
| `serviceAccountJson` | సర్వీస్-అకౌంట్ కీ. సీక్రెట్: నిల్వలో ఎన్క్రిప్ట్ చేయబడుతుంది, ఎప్పుడూ తిరిగి ఇవ్వబడదు |
| `autoCreate`         | మొదటి ఎగుమతిలో డేటాసెట్ మరియు టేబుల్ను సృష్టిస్తుంది (డిఫాల్ట్ `true`)                |

సర్వీస్ అకౌంట్కు లక్ష్య టేబుల్పై `bigquery.tables.updateData` అవసరం, అలాగే
`autoCreate` ఆన్లో ఉన్నప్పుడు `bigquery.datasets.create` / `bigquery.tables.create` అవసరం.

కాన్ఫిగర్ చేసిన బ్యాచ్ ఒక **కర్సర్** యూనిట్, HTTP యూనిట్ కాదు: `send()` దాన్ని గరిష్ఠంగా 500 వరుసలతో కూడిన
insertAll కాల్లుగా విభజిస్తుంది, కాబట్టి పెద్ద `batch_size` BigQuery యొక్క 10 MB అభ్యర్థన పరిమితిని
అధిగమించదు. తాత్కాలిక స్థితుల (408/429/500/502/503/504) కోసం అవే insertIdsను మళ్లీ ఉపయోగిస్తూ,
ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్తో గరిష్ఠంగా మూడుసార్లు మళ్లీ ప్రయత్నించబడుతుంది; ప్రామాణీకరణ మరియు స్కీమా వైఫల్యాలు
రన్ను వృథా చేయకుండా మొదటి ప్రయత్నంలోనే త్రో చేస్తాయి.

కొన్ని క్షణాల క్రితం సృష్టించిన టేబుల్ ఇంకా స్ట్రీమింగ్ ఎండ్పాయింట్కు కనిపించదు, అందువల్ల అది
కొన్ని సెకన్లపాటు 404తో సమాధానం ఇస్తుంది. ఆ 404 కోసం మళ్లీ ప్రయత్నించబడుతుంది, కానీ **ఈ రన్ టేబుల్ను సృష్టించినప్పుడు మాత్రమే** —
నిజంగా లేని టేబుల్ అయితే వెంటనే విఫలమవుతుంది. ఇటీవల తొలగించిన టేబుల్ పేరుతోనే దాన్ని మళ్లీ సృష్టిస్తే,
BigQuery కొన్ని నిమిషాలపాటు స్ట్రీమింగ్ ఇన్సర్ట్లను తిరస్కరిస్తుందని గమనించండి; ఇది తొలగించి-మళ్లీ-సృష్టించే
విధానం యొక్క లక్షణం, కాబట్టి టేబుల్ను తొలగించి తిరిగి జోడించడానికి బదులుగా కొత్త టేబుల్ పేరును ఉపయోగించడం మంచిది.

**పాక్షిక వైఫల్యం, ఖాళీ కాని `insertErrors[]`తో HTTP 200గా వస్తుంది.** ఇది వైఫల్యంగా పరిగణించబడి
త్రో చేయబడుతుంది; BigQuery ఎప్పుడూ అంగీకరించని వరుసలను దాటి కర్సర్ ముందుకు వెళ్లకుండా ఆపేది ఇదే;
`tests/unit/log-export-bigquery.test.ts` ఈ ప్రవర్తనను నిర్దిష్టంగా స్థిరపరుస్తుంది.

ట్రాన్స్పోర్ట్ సాధారణ REST — స్వీయ-సంతకం చేసిన RS256 అసర్షన్ను
`https://oauth2.googleapis.com/token` వద్ద యాక్సెస్ టోకెన్ కోసం మార్పిడి చేసి, ఆపై వరుసలను `tabledata.insertAll`కు పంపుతారు. ఏ Google SDKను
చేర్చరు. యాక్సెస్ టోకెన్లు ప్రతి (సర్వీస్ అకౌంట్, స్కోప్) కోసం ప్రాసెస్లోనే క్యాష్ చేయబడతాయి.

సృష్టించిన టేబుల్లో Logs ట్యాబ్లోని ప్రతి ఫీల్డ్కు ఒక కాలమ్తో పాటు `exported_at` ఉంటుంది, అలాగే కాల్ లాగ్లు
వాస్తవంగా క్వెరీ చేయబడే విధానానికి అనుగుణంగా అమర్చబడుతుంది:

- **`timestamp`పై రోజు-వారీగా పార్టిషన్ చేయబడుతుంది**, కాబట్టి తేదీ పరిధికి పరిమితమైన క్వెరీ ఆ రోజులను మాత్రమే స్కాన్ చేస్తుంది.
- **`api_key_name`, `provider`, `model`, `status` ఆధారంగా క్లస్టర్ చేయబడుతుంది** (అదే క్రమంలో), కాబట్టి దాన్ని
  ఎవరు అమలు చేశారు, ఎక్కడికి వెళ్లింది లేదా విఫలమైందా అనే వాటి ఆధారంగా ఫిల్టర్ చేసినప్పుడు ప్రతి పార్టిషన్లోని బ్లాక్లు తొలగించబడతాయి. BigQuery
  గరిష్ఠంగా నాలుగు క్లస్టరింగ్ కాలమ్లను అనుమతిస్తుంది మరియు వాటి క్రమం ముఖ్యం: `api_key_name`పై మాత్రమే ఉన్న ఫిల్టర్
  తొలగింపును చేస్తుంది, `status`పై మాత్రమే ఉన్న ఫిల్టర్ అలా చేయదు.
- **`partitionExpirationDays` ద్వారా ఐచ్ఛిక పార్టిషన్ నిలుపుదల** (`0` అన్నింటినీ ఉంచుతుంది), ఇది
  టేబుల్ సృష్టించబడినప్పుడు వర్తింపజేయబడుతుంది.

రెండు సెట్టింగ్లు సృష్టించే సమయంలో వర్తిస్తాయి. ఇప్పటికే ఉన్న పట్టిక తన ప్రస్తుత లేఅవుట్నే కొనసాగిస్తుంది, కాబట్టి
వాటిని స్వీకరించాలనుకుంటే గమ్యాన్ని కొత్త పట్టిక idకి సూచించండి.

`tests/unit/log-export-bigquery.test.ts` మ్యాపర్ మరియు పట్టిక స్కీమా ఒకదానితో మరొకటి సమకాలీకరించబడి ఉండేలా నిర్ధారిస్తుంది,
కాబట్టి కొత్త కాల్-లాగ్ కాలమ్ ఎగుమతి చేసే క్రమంలో నిశ్శబ్దంగా తొలగించబడదు.

బ్యాచ్లు అడ్డు వరుసల సంఖ్య మరియు సీరియలైజ్ చేసిన బైట్లు **రెండింటి** ఆధారంగా భాగాలుగా విభజించబడతాయి. పేలోడ్లను
ఎగుమతి చేసినప్పుడు అడ్డు వరుసల సంఖ్య మాత్రమే సరిపోదు: ప్రాంప్ట్లను కలిగిన 500 అడ్డు వరుసలు పదుల మెగాబైట్ల పరిమాణంలో ఉండవచ్చు,
అలాగే 10 MB కంటే ఎక్కువ పరిమాణం గల అభ్యర్థనను insertAll తిరస్కరిస్తుంది. 500 అడ్డు వరుసలు లేదా 9 MB వద్ద—ఏది ముందుగా వస్తే అక్కడ—భాగాలు ముగుస్తాయి.

---

## 5. డెస్టినేషన్ను జోడించడం

1. `LogExportDestinationType`ను ఎగుమతి చేసే `src/lib/logExport/destinations/<name>.ts`ను సృష్టించండి:
   ఇందులో Zod `configSchema`, UI కోసం `fields` డిస్క్రిప్టర్ అరే, `secretFields`, అలాగే
   `test()` / `prepare()` / `send(records)`ను అందించే `createClient(config)` ఉండాలి.
2. దీన్ని `src/lib/logExport/registry.ts`లోని `DESTINATIONS` అరేకు జోడించండి.
3. `tests/unit/` కింద పరీక్షలను రాయండి.

మొత్తం మార్పు ఇంతే: పర్సిస్టెన్స్, cron జాబ్, REST లేయర్, సీక్రెట్ ఎన్క్రిప్షన్, అలాగే
డ్యాష్బోర్డ్ ఫారమ్—అన్నీ రిజిస్ట్రీని చదువుతాయి.

కొత్త డెస్టినేషన్కు రెండు నియమాలు:

- పాక్షిక వైఫల్యం సంభవించినప్పుడు `send()` **తప్పనిసరిగా throw చేయాలి**. అది విజయవంతంగా రిజాల్వ్ కావడం అంటే "డెస్టినేషన్లో ఈ వరుసలు ఉన్నాయి" అని అర్థం,
  మరియు కర్సర్ వాటిని దాటి శాశ్వతంగా ముందుకు కదులుతుంది.
- వినియోగదారు అందించిన URLను స్వీకరించే డెస్టినేషన్, fetch చేయడానికి ముందు దాన్ని
  వెబ్హుక్లు చేసే విధంగానే `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) ద్వారా ధ్రువీకరించాలి.
  BigQueryకు ఇది అవసరం లేదు: దాని హోస్ట్లు స్థిరమైనవి.

---

## 6. దీన్ని నిర్వహించడం

- **డ్యాష్బోర్డ్**: Integrations → Log export. ఒక డెస్టినేషన్ను జోడించి, వరుసలను రాయకుండానే క్రెడెన్షియల్స్ను తనిఖీ చేయడానికి **Test**ను అమలు చేసి, ఆపై దాన్ని ప్రారంభించండి.
- **బ్యాక్లాగ్**: ప్రతి డెస్టినేషన్ కార్డ్ పెండింగ్ వరుసలను, కర్సర్ను చూపుతుంది; `GET
/api/log-export/status` కూడా అవే గణాంకాలతో పాటు చివరి 20 జాబ్ రన్లను అందిస్తుంది.
- **ఒక డెస్టినేషన్ విఫలమైనా మిగిలినవి విఫలం కావు** — రన్ సారాంశం ప్రతి డెస్టినేషన్ స్థితిని
  `last_status` / `last_error`లో నమోదు చేస్తుంది, అలాగే జాబ్ రన్ చరిత్ర సమగ్ర ఫలితాన్ని భద్రపరుస్తుంది.
- **డెస్టినేషన్ను తొలగిస్తే దాని కర్సర్ కూడా తొలగించబడుతుంది.** దాన్ని మళ్లీ జోడిస్తే, నిల్వలో ఉన్న అత్యంత పాత
  కాల్ లాగ్ నుండి ప్రారంభమవుతుంది; ఫలితంగా డెస్టినేషన్లో ఇప్పటికే ఉన్న వరుసలు మళ్లీ పంపబడవచ్చు. BigQueryలో ప్రతి వరుసకు సంబంధించిన
  `insertId` దీన్ని BigQuery స్వంత డీ-డూప్లికేషన్ విండోలో మాత్రమే నివారిస్తుంది; కాబట్టి డెస్టినేషన్ను తొలగించడం కంటే
  నిలిపివేయడానికే ప్రాధాన్యం ఇవ్వండి.
