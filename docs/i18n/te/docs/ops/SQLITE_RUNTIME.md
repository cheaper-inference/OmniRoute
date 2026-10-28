# SQLite Runtime Resolution (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ప్రారంభ సమయంలో 5-దశల ప్రత్యామ్నాయ శ్రేణి ద్వారా తన SQLite డ్రైవర్ను పరిష్కరిస్తుంది:

1. **బండిల్ చేయబడిన `better-sqlite3`** (`package.json`లోని `dependencies` ద్వారా)
   — అత్యంత వేగవంతమైనది, స్థానిక బైనరీ; బిల్డ్ సాధనాలు అందుబాటులో ఉన్నప్పుడు `npm install` ద్వారా ఇన్స్టాల్ అవుతుంది.

2. **రన్టైమ్లో ఇన్స్టాల్ చేయబడిన `better-sqlite3`** (`~/.omniroute/runtime/`లో)
   — మొదటిసారి అమలు చేసినప్పుడు అవసరాన్ని బట్టి **లేదా** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ద్వారా ఇన్స్టాల్ అవుతుంది.
   దెబ్బతిన్న లేదా తప్పు ప్లాట్ఫారమ్కు చెందిన బైనరీలను లోడ్ చేయకుండా ఉండేందుకు, లోడ్ చేయడానికి ముందు
   స్థానిక `.node` మ్యాజిక్ బైట్లను (ELF / Mach-O / PE) ధ్రువీకరిస్తుంది.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — స్థానిక బిల్డ్ అవసరం లేదు; రెండు
   better-sqlite3 మార్గాలు విఫలమైనప్పుడు ఉపయోగించబడుతుంది. పరిమిత ఫీచర్ సమితి ఉంటుంది.

4. **`sql.js`** (WASM) — చివరి ప్రత్యామ్నాయం. ప్రతిచోటా పనిచేస్తుంది, కానీ నెమ్మదిగా ఉంటుంది
   మరియు డేటాను సమకాలికంగా కాకుండా నిర్దిష్ట వ్యవధుల్లో రాస్తుంది.

## ఇంత సంక్లిష్టత ఎందుకు?

- **Windows EBUSY**: మునుపటి వెర్షన్కు చెందిన `better_sqlite3.node` అమలులో ఉన్న
  ప్రాసెస్ ద్వారా లాక్ చేయబడితే, `npm install -g omniroute@latest` విఫలం కావచ్చు. `~/.omniroute/runtime/`లోని
  రన్టైమ్ ఇన్స్టాలేషన్ గ్లోబల్ npm క్యాష్ను పక్కదారి పట్టిస్తుంది.
- **బిల్డ్ సాధనాలు లేకపోవడం**: కొన్ని ఎన్విరాన్మెంట్లు (VS Build Tools లేని కార్పొరేట్
  Windows, కనిష్ఠ Docker ఇమేజ్లు) `better-sqlite3`ను కంపైల్ చేయలేవు. రన్టైమ్
  ఇన్స్టాలర్ npm రిజిస్ట్రీ నుండి ముందే బిల్డ్ చేసిన బైనరీని పొందుతుంది; అది విఫలమైనా
  OmniRoute ప్రారంభమయ్యేలా ప్రత్యామ్నాయ డ్రైవర్లు నిర్ధారిస్తాయి.
- **ఎయిర్-గ్యాప్డ్ సిస్టమ్లు**: npm రిజిస్ట్రీని చేరుకోలేకపోతే, `node:sqlite`
  లేదా `sql.js` ప్రాథమిక కార్యాచరణకు హామీ ఇస్తాయి.

## మ్యాజిక్-బైట్ ధ్రువీకరణ

రన్టైమ్లో ఇన్స్టాల్ చేయబడిన `.node` ఫైల్ను లోడ్ చేయడానికి ముందు, OmniRoute మొదటి 8
బైట్లను చదివి, తెలిసిన ప్లాట్ఫారమ్ మ్యాజిక్లతో పోలుస్తుంది:

| ప్లాట్ఫారమ్           | బైట్లు (hex)  | లేబుల్      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

మ్యాజిక్ సరిపోలకపోతే → ఫైల్ విస్మరించబడుతుంది, తదుపరి దశతో ప్రత్యామ్నాయ ప్రక్రియ కొనసాగుతుంది.

## యాక్టివ్ డ్రైవర్ను తనిఖీ చేయడం

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## మాన్యువల్ నియంత్రణ

```bash
# వేగవంతమైన CI ఇన్స్టాలేషన్ల కోసం postinstall వార్మ్-అప్ను దాటవేయండి
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# రన్టైమ్ better-sqlite3ను బలవంతంగా మళ్లీ ఇన్స్టాల్ చేయండి
rm -rf ~/.omniroute/runtime
omniroute  # తదుపరి ప్రారంభంలో మళ్లీ ఇన్స్టాల్ అవుతుంది

# ఏ డ్రైవర్ యాక్టివ్గా ఉందో తనిఖీ చేయండి
omniroute config db-info  # (CLI కమాండ్ ఉంటే)
```

## సమకాలిక నిలిచిపోవడాలను నిర్ధారించడం

`better-sqlite3`తో, సమకాలిక అడాప్టర్ టైమింగ్ను ఎంపిక చేసుకోవడానికి ప్రారంభానికి ముందు
`OMNIROUTE_SQLITE_SLOW_MS=200`ను సెట్ చేయండి. డిఫాల్ట్గా ఇది ఆఫ్లో ఉంటుంది. కనీసం
అన్ని మిల్లీసెకన్లు తీసుకుని పూర్తయిన ఆపరేషన్, ఒక్కో అడాప్టర్కు ప్రతి పది సెకన్లలో
గరిష్ఠంగా ఒక్కసారి `[SQLITE-SLOW]` హెచ్చరికను ఉత్పత్తి చేస్తుంది. హెచ్చరికలో డ్రైవర్,
ఆపరేషన్ వర్గం (`prepare`, `get`, `all`, `run`, `exec`, `pragma`, ట్రాన్సాక్షన్ లేదా నిర్వహణ),
మరియు గడిచిన మిల్లీసెకన్లు మాత్రమే ఉంటాయి: SQL, బైండింగ్లు, వరుసలు, పాత్లు లేదా మినహాయింపు టెక్స్ట్ ఉండవు.

ఇది నిర్ధారణ సహాయకం మాత్రమే; టైమ్అవుట్ లేదా క్వెరీ ఆప్టిమైజేషన్ కాదు. ఎప్పటికీ తిరిగి రాని
ఆపరేషన్ను ఇది నివేదించలేదు, CPU పనిని డిస్క్ నిరీక్షణల నుండి వేరు చేయలేదు, ఖచ్చితమైన
SQLను గుర్తించలేదు లేదా ముడి డ్రైవర్ హ్యాండిల్ ద్వారా నిర్వహించిన ఆపరేషన్లను పరిశీలించలేదు.
అసింక్రోనస్ బ్యాకప్ వ్యవధి ఉద్దేశపూర్వకంగా మినహాయించబడింది; ఇతర SQLite డ్రైవర్లు ఈ
ఐచ్ఛిక ఇన్స్ట్రుమెంటేషన్ పరిధిలో ఉండవు. వేరియబుల్ను నిలిపివేస్తే టైమింగ్ ర్యాపర్లు లేని
అసలు అడాప్టర్ పునరుద్ధరించబడుతుంది. డేటాబేస్ స్కీమా లేదా నిల్వ చేసిన కాన్ఫిగరేషన్లో మార్పులు ఉండవు.

`/healthz` ల్యాగ్ హెచ్చరిక జీవితకాల సగటును కాకుండా, మునుపటి నమూనా నుండి ఈవెంట్-లూప్
గరిష్ఠాన్ని నివేదిస్తుంది. నిలిచిపోవడానికి SQLite లేదా డిస్క్ వైఫల్యమే కారణమని నిర్ధారించే
ముందు, దాని టైమ్స్టాంప్లను నెమ్మది ఆపరేషన్ హెచ్చరికలు మరియు హోస్ట్/స్టోరేజ్ మెట్రిక్లతో
పరస్పరం పోల్చండి.

## సూచన

అమలు:

- `bin/cli/runtime/magicBytes.mjs` — బైనరీ మ్యాజిక్-బైట్ ధ్రువీకరణ సహాయకాలు
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-దశల రన్టైమ్ పరిష్కారకం + అవసరాన్ని బట్టి పనిచేసే ఇన్స్టాలర్
- `bin/cli/runtime/index.mjs` — ప్రారంభ ఆర్కెస్ట్రేటర్ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm పోస్ట్-ఇన్స్టాల్ హుక్ (విఫలమైనా ప్రాణాంతకం కాని వార్మ్-అప్)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ఎక్స్పోర్ట్లు

## ఏకైక-రైటర్ టోపాలజీ (HAకు మద్దతు లేదు)

పైన ఉన్న డ్రైవర్ ప్రత్యామ్నాయ శ్రేణి ఇప్పటికీ **ఒక ప్రాసెస్**లోనే అమలవుతుంది. డిఫాల్ట్ SQLite
OmniRoute ఒక **ఏకైక రైటర్**:

- ఒకే `storage.sqlite` ఫైల్కు రెండు OmniRoute రెప్లికాలను అనుసంధానించవద్దు.
- కంటైనర్ రీస్టార్ట్, Recreate డిప్లాయ్, OOM kill లేదా HEALTHCHECK రీస్టార్ట్ వల్ల
  అమలులో ఉన్న ప్రతి SSE సెషన్ నిలిచిపోతుంది. ప్రామాణిక పాత్లో సెషన్ డ్రెయిన్ లేదు.
- నెమ్మదైన `/healthz`ను నిలిచిపోయినదిగా పరిగణించే ఆర్కెస్ట్రేటర్ లైవ్నెస్, ఏకైక
  రెప్లికాను ముగిస్తుంది. TCP లైవ్నెస్ + HTTP `/healthz` రెడీనెస్కు ప్రాధాన్యం ఇవ్వండి. చూడండి:
  [Docker గైడ్ — లభ్యత](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  మరియు [Kubernetes ప్రోబ్ సిఫార్సులు](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
