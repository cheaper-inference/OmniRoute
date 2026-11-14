# Contributing to OmniRoute (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## అభివృద్ధి సెటప్

### అవసరమైనవి

- **Node.js** `>=22.22.2 <23`, లేదా `>=24.0.0 <27` (సిఫార్సు: 24 LTS)
- **npm** 10+

> **Node 24తో Windows:** ప్రస్తుత 24 LTS ప్యాచ్ విడుదలను ఉపయోగించండి (కనీసం 24.20.0).
> మునుపటి విడుదలలు `--test-force-exit` ప్రాసెస్ను మూసివేసినప్పుడు విజయవంతమైన పరీక్షల తర్వాత
> నిలిచిపోవచ్చు. Node యొక్క [Windows libuv పరిష్కారం](https://github.com/nodejs/node/pull/61999) ఈ
> రన్టైమ్ క్రాష్ను పరిష్కరిస్తుంది; పరీక్ష assertions మరియు runner exit checksను ప్రారంభించినట్లుగానే ఉంచండి.

> **npm v11+ వినియోగదారులు (Node 24+):** `npm install` తర్వాత, native modules ఇన్స్టాల్ అయ్యాయో ధృవీకరించండి:
> `node -e "require('better-sqlite3')"`. ఇది `MODULE_NOT_FOUND`తో విఫలమైతే,
> `npm approve-scripts better-sqlite3 && npm install` అమలు చేయండి. [ట్రబుల్షూటింగ్](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module) చూడండి.

- **Git**

### క్లోన్ చేసి ఇన్స్టాల్ చేయడం

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### పర్యావరణ వేరియబుల్స్

```bash
# టెంప్లేట్ నుండి మీ .env ను సృష్టించండి
cp .env.example .env

# అవసరమైన సీక్రెట్లను రూపొందించండి
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

అభివృద్ధి కోసం ప్రధాన వేరియబుల్స్:

| వేరియబుల్              | అభివృద్ధి డిఫాల్ట్       | వివరణ                    |
| ---------------------- | ------------------------ | ------------------------ |
| `PORT`                 | `20128`                  | సర్వర్ పోర్ట్            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ఫ్రంట్ఎండ్ కోసం బేస్ URL |
| `JWT_SECRET`           | (పై విధంగా రూపొందించండి) | JWT సంతకం సీక్రెట్       |
| `INITIAL_PASSWORD`     | `CHANGEME`               | మొదటి లాగిన్ పాస్వర్డ్   |
| `APP_LOG_LEVEL`        | `info`                   | లాగ్ వివరణాత్మకత స్థాయి  |

### డ్యాష్బోర్డ్ సెట్టింగ్లు

డ్యాష్బోర్డ్లో పర్యావరణ వేరియబుల్స్ ద్వారా కూడా కాన్ఫిగర్ చేయగల ఫీచర్ల కోసం UI టాగిళ్లు అందుబాటులో ఉంటాయి:

| సెట్టింగ్ స్థానం    | టాగిల్             | వివరణ                                       |
| ------------------- | ------------------ | ------------------------------------------- |
| Settings → Advanced | Debug Mode         | డీబగ్ రిక్వెస్ట్ లాగ్లను ప్రారంభించండి (UI) |
| Settings → General  | Sidebar Visibility | సైడ్బార్ విభాగాలను చూపించండి/దాచండి         |

ఈ సెట్టింగ్లు డేటాబేస్లో నిల్వ చేయబడతాయి మరియు పునఃప్రారంభాల మధ్య కొనసాగుతాయి. సెట్ చేసినప్పుడు, ఇవి env var డిఫాల్ట్లను అధిగమిస్తాయి.

### స్థానికంగా అమలు చేయడం

```bash
# అభివృద్ధి మోడ్ (హాట్ రీలోడ్)
npm run dev

# ప్రొడక్షన్ బిల్డ్
npm run build    # next build → .build/next/ తర్వాత assembleStandalone → dist/
npm run start

# కాంట్రిబ్యూటర్ మార్పుల కోసం వేగవంతమైన బ్యాకెండ్/API-మాత్రమే కంపైల్
npm run build:contributor

# విడుదల బిల్డ్ (క్లీన్ రీబిల్డ్ + HEAD సెంటినల్ — డిప్లాయ్కు అవసరం)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA ను రాస్తుంది

# సాధారణ పోర్ట్ కాన్ఫిగరేషన్
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

కాంట్రిబ్యూటర్ బిల్డ్ కంపైల్-మాత్రమే ధృవీకరణను నిర్వహిస్తుంది: ఇది standalone
డిస్ట్రిబ్యూషన్ను అసెంబుల్ చేయదు లేదా ఐచ్ఛిక native ప్యాకేజింగ్ ఆస్తులను బిల్డ్ చేయదు. డిప్లాయ్ చేయగల బండిల్ను
ధృవీకరించాల్సినప్పుడు సాధారణ ప్రొడక్షన్ బిల్డ్ను ఉపయోగించండి.

### బిల్డ్ అవుట్పుట్ లేఅవుట్

| డైరెక్టరీ | విషయాలు                                                                               | ట్రాక్ చేయబడిందా |
| --------- | ------------------------------------------------------------------------------------- | ---------------- |
| `src/`    | అప్లికేషన్ సోర్స్ (TypeScript / TSX)                                                  | అవును            |
| `.build/` | మధ్యంతర ఫైళ్లు — `next build` అవుట్పుట్ (gitignored, `distDir = .build/next`)         | కాదు             |
| `dist/`   | డిప్లాయ్ చేయగల బండిల్ — `assembleStandalone` ద్వారా అసెంబుల్ చేయబడుతుంది (gitignored) | కాదు             |

బిల్డ్ పైప్లైన్ ఒకే పాస్లో జరుగుతుంది:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js అవుట్పుట్)
  └─ assembleStandalone()                 (standalone + static + public + native assets ను కాపీ చేస్తుంది)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` అదనంగా ముందుగా రెండు డైరెక్టరీలను శుభ్రపరుస్తుంది మరియు
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`)ను డిప్లాయ్ సమగ్రత సెంటినల్గా రాస్తుంది.

`npm run build:contributor` బ్యాకెండ్-మాత్రమే బిల్డ్ ప్రొఫైల్ను ఉపయోగిస్తుంది. ఇది బిల్డ్ చేస్తున్నప్పుడు
డ్యాష్బోర్డ్ UI ఫైళ్లకు తాత్కాలిక స్టబ్లను సృష్టిస్తుంది, API రూట్ హ్యాండ్లర్లను ఉంచుతుంది మరియు
బిల్డ్ పూర్తయిన తర్వాత అసలు ఫైళ్లను పునరుద్ధరిస్తుంది. డ్యాష్బోర్డ్ UIపై ప్రభావం చూపే మార్పుల కోసం లేదా
పూర్తి విడుదల ధృవీకరణ కోసం `npm run build` ఉపయోగించండి; కాంట్రిబ్యూటర్ ప్రొఫైల్ విడుదల బిల్డ్కు ప్రత్యామ్నాయం కాదు.

> **VPS డిప్లాయ్ గమనిక:** రిమోట్ ఇమేజ్ డైరెక్టరీ `/usr/lib/node_modules/omniroute/app/`
> మారదు. డిప్లాయ్ స్కిల్లు `dist/`లోని విషయాలను దీనిలోకి rsync చేస్తాయి.
> రిపాజిటరీలోని బిల్డ్ అవుట్పుట్ పాత్ మాత్రమే మారింది (`app/` → `dist/`).

డిఫాల్ట్ URLలు:

- **డ్యాష్బోర్డ్**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git వర్క్ఫ్లో

> ⚠️ **`main`కు నేరుగా ఎప్పటికీ కమిట్ చేయవద్దు.** ఎల్లప్పుడూ ఫీచర్ బ్రాంచ్లను ఉపయోగించండి.
>
> **PR బేస్:** సక్రియంగా ఉన్న `release/vX.Y.Z` బ్రాంచ్ను లక్ష్యంగా చేసుకోండి (`main`ను కాదు). ప్రతి విడుదలకు ఒక బ్రాంచ్ + విడుదల సమయంలో ట్యాగ్ మోడల్ గురించి తెలుసుకోవడానికి
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) చూడండి.

```bash
# సక్రియంగా ఉన్న విడుదల తాజా స్థితి నుండి బ్రాంచ్ను సృష్టించండి (ఉదాహరణ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... మార్పులు చేయండి ...
git commit -m "feat: మీ మార్పును వివరించండి"
git push -u origin feat/your-feature-name
# base = release/v3.8.49తో ఒక Pull Requestను తెరవండి
```

### బ్రాంచ్ నామకరణం

| ప్రిఫిక్స్  | ఉద్దేశ్యం                    |
| ----------- | ---------------------------- |
| `feat/`     | కొత్త ఫీచర్లు                |
| `fix/`      | బగ్ పరిష్కారాలు              |
| `refactor/` | కోడ్ పునర్వ్యవస్థీకరణ        |
| `docs/`     | డాక్యుమెంటేషన్ మార్పులు      |
| `test/`     | టెస్ట్ల చేర్పులు/పరిష్కారాలు |
| `chore/`    | టూలింగ్, CI, డిపెండెన్సీలు   |

### కమిట్ సందేశాలు

[Conventional Commits](https://www.conventionalcommits.org/)ను అనుసరించండి:

```
feat: ప్రొవైడర్ కాల్ల కోసం సర్క్యూట్ బ్రేకర్ను జోడించండి
fix: JWT సీక్రెట్ ధ్రువీకరణ ఎడ్జ్ కేసును పరిష్కరించండి
docs: PII రక్షణతో SECURITY.mdను నవీకరించండి
test: పరిశీలనీయత యూనిట్ టెస్ట్లను జోడించండి
refactor(db): రేట్ లిమిట్ టేబుల్లను ఏకీకృతం చేయండి
```

స్కోప్లు (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## పరీక్షలను అమలు చేయడం

```bash
# అన్ని పరీక్షలు (యూనిట్ + vitest + ఎకోసిస్టమ్ + e2e)
npm run test:all

# ఒకే పరీక్ష ఫైల్ (Node.js స్థానిక టెస్ట్ రన్నర్ — చాలా పరీక్షలు దీన్నే ఉపయోగిస్తాయి)
node --import tsx/esm --test tests/unit/your-file.test.ts

# మీ మార్పు ప్రభావితం చేసిన యూనిట్ పరీక్షలు మాత్రమే (CI గేట్లో ఉన్న అదే TIA సెలెక్టర్, #8084)
npm run test:scoped            # చివరి కమిట్లోని మార్పులు (లేదా వర్కింగ్ ట్రీలోనివి)
npm run test:scoped:staged     # స్టేజ్ చేసిన మార్పులు మాత్రమే — ప్రీ-కమిట్ అమలుతో బాగా సరిపోతుంది
npm run test:scoped:full       # ముందుగా ఇంపోర్ట్-గ్రాఫ్ మ్యాప్ను మళ్లీ నిర్మిస్తుంది (ఫైళ్లను జోడించిన/తరలించిన తర్వాత)
# Exit 1 + "పూర్తి సూట్ను అమలు చేయండి" అంటే హబ్ ఫైల్ (tsconfig, package.json, …) లేదా
# మ్యాప్ చేయని సోర్స్ మారిందని అర్థం — సెలెక్టర్ సురక్షితంగా విఫలమవుతుంది, అది ఎప్పుడూ నిశ్శబ్దంగా దాటవేయదు.

# Vitest (MCP సర్వర్, autoCombo, క్యాష్)
npm run test:vitest

# E2E పరీక్షలు (Playwright అవసరం)
npm run test:e2e

# ప్రోటోకాల్ క్లయింట్ల E2E (MCP ట్రాన్స్పోర్ట్లు, A2A)
npm run test:protocols:e2e

# ఎకోసిస్టమ్ అనుకూలత పరీక్షలు
npm run test:ecosystem

# కవరేజ్ గేట్: స్టేట్మెంట్లు/లైన్లు/ఫంక్షన్లు/బ్రాంచ్లకు 60%
npm run test:coverage
npm run coverage:report

# లింట్ + ఫార్మాట్ తనిఖీ
npm run lint
npm run check

# గేట్ చేయబడిన వాస్తవ అప్స్ట్రీమ్ కాంబో స్మోక్ పరీక్ష (VPS యాక్సెస్ + వాస్తవ ప్రొవైడర్ క్రెడిట్లు అవసరం)
# వాస్తవ ప్రొవైడర్లను ఉపయోగిస్తుంది — కొంత ఖర్చవుతుంది. CIలో ఎప్పుడూ అమలు కాదు. గేట్ లేకపోతే సజావుగా దాటవేస్తుంది.
# అవసరం: ssh root@192.168.0.15 యాక్సెస్ (VPS నుండి రీడ్-ఓన్లీ DB స్నాప్షాట్ను సోర్స్ చేస్తుంది).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS లైవ్ స్మోక్ పరీక్ష — సాధారణ Node ESM స్క్రిప్ట్లు, లైవ్ .15 సర్వర్ను నేరుగా ఉపయోగిస్తాయి.
# అవసరం: ssh root@192.168.0.15 యాక్సెస్ (SSH sqlite ద్వారా కాంబోలు సృష్టించబడతాయి/తొలగించబడతాయి).
# వాస్తవ ప్రొవైడర్లను ఉపయోగిస్తుంది (స్వల్ప ఖర్చు). __live_test__* కాంబోలను మాత్రమే సృష్టిస్తుంది/తొలగిస్తుంది. CIలో ఎప్పుడూ అమలు కాదు.
# .15లో REQUIRE_API_KEY=false కాబట్టి API కీ అవసరం లేదు, అయితే సెట్ చేసి ఉంటే COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEYలను గౌరవిస్తుంది.
npm run test:combo:live:vps              # 7 HTTP సందర్భాలు (ప్రాధాన్యత/రౌండ్-రాబిన్/వెయిటెడ్/ఖర్చు/ఫ్యూజన్/ఆటో + హెల్త్)
npm run test:combo:live:vps:failover     # వాస్తవ క్రాస్-ప్రొవైడర్ ఫెయిల్ఓవర్ సందర్భాన్ని జోడిస్తుంది (మొత్తం 8)
```

కవరేజ్ గమనికలు:

- `npm run test:coverage` ప్రధాన యూనిట్ టెస్ట్ సూట్కు సంబంధించిన సోర్స్ కవరేజ్ను కొలుస్తుంది, `tests/**`ను మినహాయిస్తుంది మరియు `open-sse/**`ను చేర్చుతుంది
- పుల్ రిక్వెస్ట్లు స్టేట్మెంట్లు/లైన్లు/ఫంక్షన్లు/బ్రాంచ్ల కవరేజ్ గేట్ను **60%+** వద్ద తప్పనిసరిగా కొనసాగించాలి
- ఒక PR `src/`, `open-sse/`, `electron/` లేదా `bin/`లోని ప్రొడక్షన్ కోడ్ను మార్చితే, అదే PRలో ఆటోమేటెడ్ పరీక్షలను జోడించాలి లేదా నవీకరించాలి
- `npm run coverage:report` తాజా కవరేజ్ అమలు నుంచి వివరణాత్మకమైన ఫైల్-వారీ నివేదికను ముద్రిస్తుంది
- `npm run test:coverage:legacy` చారిత్రక పోలిక కోసం పాత మెట్రిక్ను అలాగే ఉంచుతుంది
- దశలవారీ కవరేజ్ మెరుగుదల రోడ్మ్యాప్ కోసం `docs/ops/COVERAGE_PLAN.md`ను చూడండి

### పుల్ రిక్వెస్ట్ అవసరాలు

PRను తెరవడానికి ముందు, మీరు మార్చిన అంశానికి సంబంధించిన కేంద్రీకృత లూప్ను అమలు చేయడానికి
[కాంట్రిబ్యూషన్ గోల్డెన్ పాత్](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)ను ఉపయోగించండి. పూర్తి యూనిట్ సూట్ (4 CI షార్డ్లు), Vitest, **60%+** కవరేజ్ గేట్ మరియు
ప్రొడక్షన్ బిల్డ్ CI బాధ్యత — వాటిని స్థానికంగా అమలు చేయడం వల్ల PR తనిఖీలు ఇప్పటికే ఇవ్వని అదనపు సంకేతమేదీ లభించదు,
అలాగే చిన్న మెషీన్లలో అది హోస్ట్ను పూర్తిగా వినియోగించవచ్చు (#8084):

- మీ మార్పును కవర్ చేసే టెస్ట్ ఫైళ్లను అమలు చేయండి: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint`ను అమలు చేయండి
- ప్రొడక్షన్ కోడ్ మారినప్పుడల్లా అదే PRలో ఆటోమేటెడ్ పరీక్షలను చేర్చండి లేదా నవీకరించండి
- `node:test` ఫైళ్లలో, ప్రతి టాప్-లెవల్ `await`ను (`await import(...)` వంటిది) మొదటి `test()` / `describe()`కు ముందు ఉంచండి: `--test-force-exit` కింద, దాని తర్వాత నమోదు చేసిన పరీక్షలు నిశ్శబ్దంగా అసలు అమలు కాకపోవచ్చు (#18045; `npm run check:test-tla-order` ద్వారా అమలు చేయబడుతుంది)
- ప్రొడక్షన్ కోడ్ మారినప్పుడు, మార్చిన లేదా జోడించిన టెస్ట్ ఫైళ్లను PR వివరణలో చేర్చండి
- CIలో ప్రాజెక్ట్ సీక్రెట్లు కాన్ఫిగర్ చేసి ఉన్నప్పుడు, PRలో SonarQube ఫలితాన్ని తనిఖీ చేయండి

ప్రస్తుత పరీక్ష స్థితి: వీటిని కవర్ చేస్తున్న **122 యూనిట్ టెస్ట్ ఫైళ్లు**:

- ప్రొవైడర్ ట్రాన్స్లేటర్లు మరియు ఫార్మాట్ మార్పిడి
- రేట్ లిమిటింగ్, సర్క్యూట్ బ్రేకర్ మరియు స్థితిస్థాపకత
- సెమాంటిక్ క్యాష్, ఐడెంపొటెన్సీ, పురోగతి ట్రాకింగ్
- డేటాబేస్ ఆపరేషన్లు మరియు స్కీమా (21 DB మాడ్యూల్లు)
- OAuth ఫ్లోలు మరియు ప్రామాణీకరణ
- API ఎండ్పాయింట్ ధ్రువీకరణ (Zod v4)
- MCP సర్వర్ టూల్స్ మరియు స్కోప్ అమలు
- మెమరీ మరియు స్కిల్స్ సిస్టమ్లు

---

## కోడ్ శైలి

- **ESLint** — కమిట్ చేసే ముందు `npm run lint` అమలు చేయండి
- **Prettier** — కమిట్ సమయంలో `lint-staged` ద్వారా స్వయంచాలకంగా ఫార్మాట్ చేయబడుతుంది (2 స్పేస్లు, సెమీకోలన్లు, డబుల్ కోట్లు, 100 అక్షరాల వెడల్పు, es5 ట్రైలింగ్ కామాలు)
- **TypeScript** — మొత్తం `src/` కోడ్ `.ts`/`.tsx` ఉపయోగిస్తుంది; `open-sse/` `.ts`/`.js` ఉపయోగిస్తుంది; TSDocతో (`@param`, `@returns`, `@throws`) డాక్యుమెంట్ చేయండి
- **`eval()` వద్దు** — ESLint `no-eval`, `no-implied-eval`, `no-new-func`లను అమలు చేస్తుంది
- **Zod ధ్రువీకరణ** — అన్ని API ఇన్పుట్ ధ్రువీకరణల కోసం Zod v4 స్కీమాలను ఉపయోగించండి
- **నామకరణం**: ఫైళ్లు = camelCase/kebab-case, కాంపోనెంట్లు = PascalCase, స్థిరాంకాలు = UPPER_SNAKE

### లోపాల నిర్వహణ / ఖాళీ catch బ్లాక్లు

ఎప్పుడూ `catch`ను వివరణ లేకుండా వదిలివేయవద్దు. దాన్ని రెండు వర్గాల్లో ఒకదానిగా వర్గీకరించండి ("SSE స్ట్రీమ్లలో లోపాలను ఎప్పుడూ నిశ్శబ్దంగా విస్మరించవద్దు" అనే కఠిన నియమాన్ని ఆచరణలో పెడుతుంది):

- **ఉద్దేశపూర్వకం (మన స్వంత సాధ్యమైనంత-ఉత్తమమైన క్లీనప్/టెలిమెట్రీ)** — ఇక్కడ వైఫల్యం సంభవించడం ఊహించదగినది మరియు హానిరహితమైనది; ఒక-లైన్ కారణ వివరణ కామెంట్ను జోడించండి, లాగింగ్ చేయవద్దు (ప్రతి అభ్యర్థనపై లాగింగ్ చేయడం వల్ల ఏర్పడే అనవసర సందడిని ఈ నియమం నివారిస్తుంది).

  ```ts
  } catch {} // క్లయింట్ డిస్కనెక్ట్ అయిన తర్వాత ఇప్పటికే మూసివేయబడిన కంట్రోలర్ను మూసివేయడం ఊహించదగినదే
  ```

- **లాగ్ చేయాలి (బాహ్య/కాలర్ అందించిన కోడ్, లేదా విస్మరించడం వల్ల కంట్రోల్ ఫ్లో మారినప్పుడు)** — `catch`ను ఉంచండి (అది స్ట్రీమ్ను విచ్ఛిన్నం చేయనివ్వవద్దు), కానీ వైఫల్యాన్ని గుర్తించగలిగేలా సందర్భోచితమైన `console.debug`/`warn`ను విడుదల చేయండి.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

అమలు చేసిన ఉదాహరణల కోసం `open-sse/utils/stream.ts` మరియు `open-sse/utils/streamHandler.ts` చూడండి.

---

## ప్రాజెక్ట్ నిర్మాణం

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## కొత్త ప్రొవైడర్ను జోడించడం

### దశ 1: ప్రొవైడర్ స్థిరాంకాలను నమోదు చేయండి

`src/shared/constants/providers.ts`కు జోడించండి — మాడ్యూల్ లోడ్ సమయంలో Zod ద్వారా ధృవీకరించబడుతుంది.

### దశ 2: ఎగ్జిక్యూటర్ను జోడించండి (కస్టమ్ లాజిక్ అవసరమైతే)

బేస్ ఎగ్జిక్యూటర్ను విస్తరిస్తూ `open-sse/executors/your-provider.ts`లో ఎగ్జిక్యూటర్ను సృష్టించండి.

### దశ 3: ట్రాన్స్లేటర్ను జోడించండి (OpenAI కాని ఫార్మాట్ అయితే)

`open-sse/translator/`లో రిక్వెస్ట్/రెస్పాన్స్ ట్రాన్స్లేటర్లను సృష్టించండి.

### దశ 4: OAuth కాన్ఫిగరేషన్ను జోడించండి (OAuth ఆధారితమైతే)

`src/lib/oauth/constants/oauth.ts`లో OAuth క్రెడెన్షియల్స్ను, `src/lib/oauth/services/`లో సర్వీస్ను జోడించండి.

అప్స్ట్రీమ్ ప్రొవైడర్ తన పబ్లిక్ CLI / బ్రౌజర్ బండిల్లో పబ్లిక్ OAuth client_id/secret లేదా Firebase Web API కీని పంపిణీ చేస్తే, దానిని స్ట్రింగ్ లిటరల్గా **ఎంబెడ్ చేయవద్దు**. `open-sse/utils/publicCreds.ts`లోని `resolvePublicCred()`ను ఉపయోగించి, `EMBEDDED_DEFAULTS`కు మాస్క్ చేసిన బైట్ ఎంట్రీని జోడించండి. పూర్తి తప్పనిసరి వర్క్ఫ్లో [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)లో డాక్యుమెంట్ చేయబడింది.

హ్యాండ్లర్లు/ఎగ్జిక్యూటర్లలో, క్లయింట్కు చేరే ఎర్రర్ సందేశాలు తప్పనిసరిగా `open-sse/utils/error.ts`లోని `buildErrorBody()` / `sanitizeErrorMessage()` ద్వారా వెళ్లాలి — ముడి `err.stack` లేదా `err.message`ను Response బాడీలో ఎప్పుడూ ఉంచవద్దు. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)ను చూడండి.

### దశ 5: మోడళ్లను నమోదు చేయండి

`open-sse/config/providerRegistry.ts`లో మోడల్ నిర్వచనాలను జోడించండి.

### దశ 6: టెస్ట్లను జోడించండి

కనీసం కింది అంశాలను కవర్ చేసే యూనిట్ టెస్ట్లను `tests/unit/`లో రాయండి:

- ప్రొవైడర్ నమోదు
- రిక్వెస్ట్/రెస్పాన్స్ అనువాదం
- ఎర్రర్ నిర్వహణ

---

## పుల్ రిక్వెస్ట్ చెక్లిస్ట్

- [ ] పరీక్షలు విజయవంతమయ్యాయి (`npm test`)
- [ ] లింటింగ్ విజయవంతమైంది (`npm run lint`)
- [ ] బిల్డ్ విజయవంతమైంది (`npm run build`)
- [ ] కొత్త పబ్లిక్ ఫంక్షన్లు మరియు ఇంటర్ఫేస్ల కోసం TypeScript టైప్లు జోడించబడ్డాయి
- [ ] హార్డ్కోడ్ చేసిన సీక్రెట్లు లేదా ఫాల్బ్యాక్ విలువలు లేవు
- [ ] పబ్లిక్ అప్స్ట్రీమ్ క్రెడెన్షియల్స్ను లిటరల్స్గా కాకుండా `resolvePublicCred()` ద్వారా పొందుపరిచారు ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) చూడండి)
- [ ] ఎర్రర్ రెస్పాన్స్లు `buildErrorBody()` / `sanitizeErrorMessage()` ద్వారా పంపబడతాయి — రెస్పాన్స్ బాడీలలో ముడి స్టాక్ ట్రేస్లు ఉండవు ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) చూడండి)
- [ ] షెల్ కమాండ్లు (`exec` / `spawn`) రన్టైమ్ విలువలను స్ట్రింగ్ ఇంటర్పోలేషన్ ద్వారా కాకుండా `env` ద్వారా పంపుతాయి
- [ ] అన్ని ఇన్పుట్లు Zod స్కీమాలతో ధ్రువీకరించబడ్డాయి
- [ ] వినియోగదారులకు కనిపించే మార్పుల కోసం `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` కింద చేంజ్లాగ్ **ఫ్రాగ్మెంట్** జోడించబడింది ([`changelog.d/README.md`](./changelog.d/README.md) చూడండి) — `CHANGELOG.md`ను నేరుగా సవరించవద్దు; ఫ్రాగ్మెంట్లు విడుదల సమయంలో సమీకరించబడతాయి మరియు PRల మధ్య ఎప్పటికీ విభేదించవు
- [ ] డాక్యుమెంటేషన్ నవీకరించబడింది (వర్తిస్తే)
- [ ] కొత్త CodeQL / Secret-Scanning అలర్ట్లు ఏవీ తెరవబడలేదు లేదా ప్రతి అలర్ట్ను సంబంధిత `docs/security/` డాక్యుమెంట్ను సూచించే సాంకేతిక సమర్థనతో డిస్మిస్ చేశారు
- [ ] చైల్డ్ ప్రాసెస్లను ప్రారంభించే రూట్లు (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts`లో `isLocalOnlyPath()`గా వర్గీకరించబడ్డాయి — [కఠిన నియమం #15](docs/security/ROUTE_GUARD_TIERS.md) చూడండి
- [ ] కమిట్ సందేశాలలో AI/బాట్ `Co-authored-by` ట్రైలర్లు లేవు (కఠిన నియమం #16) — తిరిగి ఉపయోగించిన పనికి చెందిన మానవ సహకారులకు ప్రామాణిక `Co-authored-by: Name <email>` ట్రైలర్లతో క్రెడిట్ ఇవ్వబడింది

---

## విడుదల చేయడం

విడుదలలు `/generate-release` వర్క్ఫ్లో ద్వారా నిర్వహించబడతాయి. కొత్త GitHub Release సృష్టించబడినప్పుడు, ప్యాకేజీ GitHub Actions ద్వారా **స్వయంచాలకంగా npmకు ప్రచురించబడుతుంది**.

VPS డిప్లాయ్మెంట్ల కోసం, `npm run build` కాకుండా `npm run build:release` ఉపయోగించండి — ఇది పూర్తిగా
మళ్లీ బిల్డ్ చేసి, బండిల్ను `dist/`లో సమీకరించి, `dist/BUILD_SHA` సెంటినెల్ను వ్రాస్తుంది.
ఆ తర్వాత `dist/`ను రిమోట్ `app/` డైరెక్టరీకి rsync చేసే `/deploy-vps-*-cc` స్కిల్లను ఉపయోగించండి.

---

## సహాయం పొందడం

- **ఆర్కిటెక్చర్**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) చూడండి
- **API రిఫరెన్స్**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) చూడండి
- **భద్రతా డాక్యుమెంటేషన్**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ఆపరేషన్స్ డాక్యుమెంటేషన్**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **సమస్యలు**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
