# Contributing to OmniRoute (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

ଅବଦାନ ଦେବା ପ୍ରତି ଆପଣଙ୍କ ଆଗ୍ରହ ପାଇଁ ଧନ୍ୟବାଦ! ଆରମ୍ଭ କରିବା ପାଇଁ ଆପଣଙ୍କୁ ଯାହା ଆବଶ୍ୟକ, ଏହି ମାର୍ଗଦର୍ଶିକାରେ ସେସବୁ ଅନ୍ତର୍ଭୁକ୍ତ ଅଛି।

ପ୍ରତ୍ୟେକ ପରିବର୍ତ୍ତନ ପାଇଁ ଆଧିକାରିକ କାର୍ଯ୍ୟପ୍ରବାହ ନିମନ୍ତେ,
[ଅବଦାନର ସୁବର୍ଣ୍ଣ ପଥ](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)ରୁ ଆରମ୍ଭ କରନ୍ତୁ। ଏହା provider, routing,
UI/UX, i18n, CLI, database, ଏବଂ build/deploy ପରିବର୍ତ୍ତନଗୁଡ଼ିକୁ ସେଗୁଡ଼ିକର କଣ୍ଟ୍ରାକ୍ଟ, କେନ୍ଦ୍ରିତ ପରୀକ୍ଷା, CI
କଭରେଜ୍, ଏବଂ ସମନ୍ୱୟ ପଦକ୍ଷେପ ସହିତ ମ୍ୟାପ୍ କରେ।

---

## ବିକାଶ ସେଟଅପ୍।

### ପ୍ରାଥମିକତା

- **Node.js** `>=22.22.2 <23`, କିମ୍ବା `>=24.0.0 <27` (ପରାମର୍ଶିତ: 24 LTS)
- **npm** 10 +

> **ନୋଡ୍ 24 ସହିତ Windows :** ସାମ୍ପ୍ରତିକ 24 LTS ପ୍ୟାଚ୍ ରିଲିଜ୍ ବ୍ୟବହାର କରନ୍ତୁ (ଅତିକମରେ 24.20.0)। `--test-force-exit` ପ୍ରକ୍ରିୟା ବନ୍ଦ କଲାବେଳେ ସଫଳ ପରୀକ୍ଷଣ ପରେ ପୂର୍ବ ପ୍ରକାଶନଗୁଡ଼ିକ ପରିତ୍ୟାଗ କରିପାରେ। ନୋଡର [Windows libuv ଫିକ୍ସ](https://github.com/nodejs/node/pull/61999) ଏହି ଚାଲିବା ସମୟ ଦୁର୍ଘଟଣାକୁ ଠିକଣା କରେ; ପରୀକ୍ଷା ଧାରଣା ଏବଂ ରନର୍ ଏକ୍ଜିଟ୍ ଚେକ୍ ସକ୍ଷମ ରଖନ୍ତୁ।

> **npm v11 + ବ୍ୟବହାରକାରୀ (ନୋଡ୍ 24 +):** `npm install` ପରେ, ସ୍ଥାନୀୟ ମଡ୍ୟୁଲଗୁଡ଼ିକୁ ଯା ify ୍ଚ କରନ୍ତୁ: `node -e "require('better-sqlite3')"`। ଯଦି ଏହା `MODULE_NOT_FOUND` ସହିତ ବିଫଳ ହୁଏ, `npm approve-scripts better-sqlite3 && npm install` ଚଲାନ୍ତୁ। [ତ୍ରୁଟି ନିବାରଣ](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module) ଦେଖନ୍ତୁ।

- **ଗିଟ୍**

### କ୍ଲୋନ୍ ଏବଂ ସଂସ୍ଥାପନ କରନ୍ତୁ।

```bash
git clone https://github.com/cheaper-inference/OmniRoute.git
cd OmniRoute
npm install
```

### ପରିବେଶ ଭେରିଏବଲ୍।

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ବିକାଶ ପାଇଁ ମୁଖ୍ୟ ଭେରିଏବଲ୍:

| ଭେରିଏବଲ୍               | ବିକାଶ ଡିଫଲ୍ଟ।            | ବର୍ଣ୍ଣନା                 |
| ---------------------- | ------------------------ | ------------------------ |
| `PORT`                 | `20128`                  | ସର୍ଭର ପୋର୍ଟ।             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ଫ୍ରଣ୍ଟେଣ୍ଡ ପାଇଁ ଆଧାର URL |
| `JWT_SECRET`           | (ଉପରେ ସୃଷ୍ଟି କରନ୍ତୁ)     | JWT ଦସ୍ତଖତ ରହସ୍ୟ।        |
| `INITIAL_PASSWORD`     | `CHANGEME`               | ପ୍ରଥମେ ଲଗଇନ୍ ପାସୱାର୍ଡ।   |
| `APP_LOG_LEVEL`        | `info`                   | ଲଗ୍ ଭର୍ବୋସିଟି ସ୍ତର।      |

### ଡ୍ୟାସବୋର୍ଡ ସେଟିଂସମୂହ।

ବ features ଶିଷ୍ଟ୍ୟଗୁଡିକ ପାଇଁ ଡ୍ୟାସବୋର୍ଡ UI ଟୋଗଲ୍ ପ୍ରଦାନ କରେ ଯାହା ପରିବେଶ ଭେରିଏବଲ୍ ମାଧ୍ୟମରେ ବିନ୍ୟାସ ହୋଇପାରିବ:

| ଅବସ୍ଥାନ ସେଟିଂ         | ଟୋଗଲ୍ କରନ୍ତୁ।           | ବର୍ଣ୍ଣନା                                          |
| --------------------- | ----------------------- | ------------------------------------------------- |
| ସେଟିଂସମୂହ → ଉନ୍ନତ।    | ତ୍ରୁଟି ନିବାରଣ ଧାରା      | ତ୍ରୁଟି ନିବାରଣ ଅନୁରୋଧ ଲଗଗୁଡ଼ିକୁ ସକ୍ରିୟ କରନ୍ତୁ (UI) |
| ସେଟିଂସମୂହ → ଜେନେରାଲ୍। | ପାର୍ଶ୍ୱ ପଟି ଦୃଶ୍ୟମାନତା। | Show/hide ପାର୍ଶ୍ୱ ପଟି ବିଭାଗଗୁଡିକ।                 |

ଏହି ସେଟିଂସମୂହ ଡାଟାବେସରେ ଗଚ୍ଛିତ ଅଛି ଏବଂ ପୁନ rest ଆରମ୍ଭରେ ରହିଥାଏ, ସେଟ୍ ହେବା ସମୟରେ env var ଡିଫଲ୍ଟକୁ ନବଲିଖନ କରିଥାଏ।

### ସ୍ଥାନୀୟ ଭାବରେ ଚାଲୁଛି।

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Fast backend/API-only compile for contributor changes
npm run build:contributor

# Release build (clean rebuild + HEAD sentinel — required for deploy)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

ସହଯୋଗୀ ବିଲ୍ଡ କେବଳ କମ୍ପାଇଲ୍-ବ valid ଧତା କାର୍ଯ୍ୟ କରିଥାଏ: ଏହା ସ୍ୱତନ୍ତ୍ର ବଣ୍ଟନକୁ ଏକତ୍ର କରେ ନାହିଁ କିମ୍ବା ଇଚ୍ଛାଧୀନ ଦେଶୀ ପ୍ୟାକେଜିଂ ସମ୍ପତ୍ତି ଗଠନ କରେ ନାହିଁ। ଯେତେବେଳେ ତୁମେ ପଠାଯାଉଥିବା ବଣ୍ଡଲକୁ ବ valid ଧ କରିବାକୁ ପଡିବ, ନିୟମିତ ଉତ୍ପାଦନ ନିର୍ମାଣ ବ୍ୟବହାର କର।

### ଆଉଟପୁଟ୍ ଲେଆଉଟ୍ ନିର୍ମାଣ କରନ୍ତୁ।

| ଡିରେକ୍ଟୋରୀ | ବିଷୟବସ୍ତୁ                                                                | ଟ୍ରାକ୍ ହୋଇଛି। |
| ---------- | ------------------------------------------------------------------------ | ------------- |
| `src/`     | ପ୍ରୟୋଗ ଉତ୍ସ (TypeScript / TSX)                                           | ହଁ            |
| `.build/`  | ମଧ୍ୟବର୍ତ୍ତୀ — `next build` ଆଉଟପୁଟ୍ (gitignored, `distDir = .build/next`) | ନା            |
| `dist/`    | `assembleStandalone` (gitignored) ଦ୍ୱାରା ଏକତ୍ରିତ ଶିପପେବଲ୍ ବଣ୍ଡଲ୍ —       | ନା            |

ବିଲ୍ଡ ପାଇପଲାଇନ ହେଉଛି ଗୋଟିଏ ପାସ୍:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (copies standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` ଅତିରିକ୍ତ ଭାବରେ ପ୍ରଥମେ ଉଭୟ ଡିରେକ୍ଟୋରୀକୁ ସଫା କରେ ଏବଂ `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ଏକ ନିୟୋଜନ ଅଖଣ୍ଡତା ସେଣ୍ଟିନେଲ ଭାବରେ ଲେଖେ।

`npm run build:contributor` କେବଳ ବ୍ୟାକେଣ୍ଡ-ନିର୍ମାଣ ପ୍ରୋଫାଇଲ୍ ବ୍ୟବହାର କରେ। ନିର୍ମାଣ ସମୟରେ ଏହା ସାମୟିକ ଭାବରେ ଡ୍ୟାସବୋର୍ଡ UI ଫାଇଲଗୁଡ଼ିକୁ ଷ୍ଟବ୍ କରିଥାଏ, API ରୁଟ୍ ହ୍ୟାଣ୍ଡେଲର୍ଗୁଡ଼ିକୁ ରଖେ ଏବଂ ନିର୍ମାଣ ପରେ ମୂଳ ଫାଇଲଗୁଡ଼ିକୁ ପୁନ ores ସ୍ଥାପନ କରେ। ପରିବର୍ତ୍ତନଗୁଡ଼ିକ ପାଇଁ `npm run build` ବ୍ୟବହାର କରନ୍ତୁ ଯାହା ଡ୍ୟାସବୋର୍ଡ UI ପ୍ରଭାବିତ କରେ କିମ୍ବା ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରକାଶନ ବ valid ଧତା ପାଇଁ; ଅବଦାନକାରୀ ପ୍ରୋଫାଇଲ୍ ରିଲିଜ୍ ବିଲ୍ଡ ପାଇଁ ଏକ ବଦଳ ନୁହେଁ।

> **VPS ନିୟୋଜନ ଟିପ୍ପଣୀ:** ସୁଦୂର ପ୍ରତିଛବି ଡିରେକ୍ଟୋରୀ `/usr/lib/node_modules/omniroute/app/` ଅପରିବର୍ତ୍ତିତ। ନିୟୋଜନ କ skills ଶଳ ଏଥିରେ `dist/` ର ବିଷୟବସ୍ତୁ rsync। କେବଳ ଇନ-ରେପୋ ବିଲ୍ଡ ଆଉଟପୁଟ୍ ପଥ ଘୁଞ୍ଚିଗଲା (`app/` → `dist/`)।

ଡିଫଲ୍ଟ URLs:

- **ଡ୍ୟାସବୋର୍ଡ।** : `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git କାର୍ଯ୍ୟପ୍ରବାହ

> ⚠️ **କେବେବି ସିଧାସଳଖ `main`କୁ commit କରନ୍ତୁ ନାହିଁ।** ସର୍ବଦା feature branch ବ୍ୟବହାର କରନ୍ତୁ।
>
> **PR ଆଧାର:** ସକ୍ରିୟ `release/vX.Y.Z` branchକୁ target କରନ୍ତୁ (`main`କୁ ନୁହେଁ)। ପ୍ରତ୍ୟେକ branch ପାଇଁ release + ship ସମୟରେ tag ମଡେଲ୍ ବିଷୟରେ
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) ଦେଖନ୍ତୁ।

```bash
# ସକ୍ରିୟ releaseର ଶେଷ tipରୁ branch ତିଆରି କରନ୍ତୁ (ଉଦାହରଣ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ପରିବର୍ତ୍ତନ କରନ୍ତୁ ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 ସହିତ ଏକ Pull Request ଖୋଲନ୍ତୁ
```

### Branch ନାମକରଣ

| Prefix      | ଉଦ୍ଦେଶ୍ୟ                 |
| ----------- | ------------------------ |
| `feat/`     | ନୂତନ feature             |
| `fix/`      | Bug ସମାଧାନ               |
| `refactor/` | Code ପୁନର୍ଗଠନ            |
| `docs/`     | Documentation ପରିବର୍ତ୍ତନ |
| `test/`     | Test ଯୋଗ/ସମାଧାନ          |
| `chore/`    | Tooling, CI, dependency  |

### Commit ବାର୍ତ୍ତା

[Conventional Commits](https://www.conventionalcommits.org/) ଅନୁସରଣ କରନ୍ତୁ:

```
feat: provider call ପାଇଁ circuit breaker ଯୋଗ କରନ୍ତୁ
fix: JWT secret validationର edge case ସମାଧାନ କରନ୍ତୁ
docs: PII ସୁରକ୍ଷା ସହିତ SECURITY.md ଅଦ୍ୟତନ କରନ୍ତୁ
test: observability unit test ଯୋଗ କରନ୍ତୁ
refactor(db): rate limit tableଗୁଡ଼ିକୁ ଏକତ୍ର କରନ୍ତୁ
```

Scopeଗୁଡ଼ିକ (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`।

---

## ପରୀକ୍ଷାଗୁଡ଼ିକ ଚଲାଇବା

```bash
# ସମସ୍ତ ପରୀକ୍ଷା (unit + vitest + ecosystem + e2e)
npm run test:all

# ଏକକ ପରୀକ୍ଷା ଫାଇଲ୍ (Node.js ନେଟିଭ୍ ପରୀକ୍ଷା ରନର୍ — ଅଧିକାଂଶ ପରୀକ୍ଷା ଏହାକୁ ବ୍ୟବହାର କରେ)
node --import tsx/esm --test tests/unit/your-file.test.ts

# କେବଳ ଆପଣଙ୍କ ପରିବର୍ତ୍ତନ ଦ୍ୱାରା ପ୍ରଭାବିତ unit ପରୀକ୍ଷାଗୁଡ଼ିକ (CI ଗେଟ୍ ସହିତ ସମାନ TIA ସିଲେକ୍ଟର୍, #8084)
npm run test:scoped            # ଶେଷ commitରେ (କିମ୍ବା working treeରେ) ହୋଇଥିବା ପରିବର୍ତ୍ତନ
npm run test:scoped:staged     # କେବଳ staged ପରିବର୍ତ୍ତନଗୁଡ଼ିକ — pre-commit ରନ୍ ସହିତ ଭଲ ଭାବେ କାମ କରେ
npm run test:scoped:full       # ପ୍ରଥମେ import-graph ମ୍ୟାପ୍ ପୁନଃନିର୍ମାଣ କରେ (ଫାଇଲ୍ ଯୋଡ଼ିବା/ସ୍ଥାନାନ୍ତର କରିବା ପରେ)
# Exit 1 + "ସମ୍ପୂର୍ଣ୍ଣ suite ଚଲାନ୍ତୁ"ର ଅର୍ଥ ହେଉଛି ଗୋଟିଏ hub ଫାଇଲ୍ (tsconfig, package.json, …) କିମ୍ବା
# ମ୍ୟାପ୍ ହୋଇନଥିବା source ପରିବର୍ତ୍ତିତ ହୋଇଛି — ସିଲେକ୍ଟର୍ ନିରାପଦ ଭାବେ ବିଫଳ ହୁଏ, ଏହା କେବେ ମଧ୍ୟ ନିରବରେ ଛାଡ଼ି ଦିଏ ନାହିଁ।

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E ପରୀକ୍ଷାଗୁଡ଼ିକ (Playwright ଆବଶ୍ୟକ)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem ସୁସଙ୍ଗତତା ପରୀକ୍ଷାଗୁଡ଼ିକ
npm run test:ecosystem

# Coverage ଗେଟ୍: statements/lines/functions/branches ପାଇଁ 60%
npm run test:coverage
npm run coverage:report

# Lint + format ଯାଞ୍ଚ
npm run lint
npm run check

# ଗେଟ୍ କରାଯାଇଥିବା ପ୍ରକୃତ-upstream combo smoke (VPS ପ୍ରବେଶ + ପ୍ରକୃତ provider credits ଆବଶ୍ୟକ)
# ପ୍ରକୃତ providersକୁ ଅନୁରୋଧ ପଠାଏ — ଅଳ୍ପ ଖର୍ଚ୍ଚ ହୁଏ। CIରେ କେବେ ମଧ୍ୟ ଚାଲେ ନାହିଁ। ଗେଟ୍ ନଥିଲେ ସ୍ୱଚ୍ଛ ଭାବେ ଛାଡ଼ିଦିଏ।
# ଆବଶ୍ୟକ: ssh root@192.168.0.15 ପ୍ରବେଶ (VPSରୁ ଗୋଟିଏ read-only DB snapshot source କରେ)।
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — ସାଧାରଣ Node ESM scripts, live .15 serverକୁ ସିଧାସଳଖ ଅନୁରୋଧ ପଠାଏ।
# ଆବଶ୍ୟକ: ssh root@192.168.0.15 ପ୍ରବେଶ (SSH sqlite ମାଧ୍ୟମରେ combos ସୃଷ୍ଟି/ବିଲୋପ କରାଯାଏ)।
# ପ୍ରକୃତ providersକୁ ଅନୁରୋଧ ପଠାଏ (ଅଳ୍ପ ଖର୍ଚ୍ଚ)। କେବଳ __live_test__* combos ସୃଷ୍ଟି/ବିଲୋପ କରେ। CIରେ କେବେ ମଧ୍ୟ ଚାଲେ ନାହିଁ।
# .15ରେ REQUIRE_API_KEY=false, ତେଣୁ API key ଆବଶ୍ୟକ ନାହିଁ, କିନ୍ତୁ ସେଟ୍ ହୋଇଥିଲେ COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEYକୁ ସମ୍ମାନ କରେ।
npm run test:combo:live:vps              # 7ଟି HTTP ପରିଦୃଶ୍ୟ (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # ଏକ ପ୍ରକୃତ cross-provider failover ପରିଦୃଶ୍ୟ ଯୋଡ଼େ (ମୋଟ 8ଟି)
```

Coverage ସମ୍ବନ୍ଧୀୟ ଟିପ୍ପଣୀ:

- `npm run test:coverage` ମୁଖ୍ୟ unit test suite ପାଇଁ source coverage ମାପେ, `tests/**`କୁ ବାଦ ଦିଏ ଏବଂ `open-sse/**`କୁ ଅନ୍ତର୍ଭୁକ୍ତ କରେ
- Pull requestsଗୁଡ଼ିକୁ statements/lines/functions/branches ପାଇଁ coverage ଗେଟ୍ **60%+**ରେ ରଖିବାକୁ ହେବ
- ଯଦି କୌଣସି PR `src/`, `open-sse/`, `electron/`, କିମ୍ବା `bin/`ରେ production code ପରିବର୍ତ୍ତନ କରେ, ତେବେ ସେହି PRରେ automated tests ଯୋଡ଼ିବା କିମ୍ବା ଅଦ୍ୟତନ କରିବା ଆବଶ୍ୟକ
- `npm run coverage:report` ସର୍ବଶେଷ coverage runରୁ ବିସ୍ତୃତ file-by-file report ପ୍ରିଣ୍ଟ କରେ
- `npm run test:coverage:legacy` ଐତିହାସିକ ତୁଳନା ପାଇଁ ପୁରୁଣା metricକୁ ସଂରକ୍ଷିତ ରଖେ
- ପର୍ଯ୍ୟାୟକ୍ରମିକ coverage ଉନ୍ନତି roadmap ପାଇଁ `docs/ops/COVERAGE_PLAN.md` ଦେଖନ୍ତୁ

### Pull Request ଆବଶ୍ୟକତାଗୁଡ଼ିକ

ଗୋଟିଏ PR ଖୋଲିବା ପୂର୍ବରୁ, ଆପଣ ଯାହା ପରିବର୍ତ୍ତନ କରିଛନ୍ତି ତାହା ପାଇଁ କେନ୍ଦ୍ରିତ loop ଚଲାଇବାକୁ
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ବ୍ୟବହାର କରନ୍ତୁ। ସମ୍ପୂର୍ଣ୍ଣ unit suite (4ଟି CI shards), Vitest, **60%+** coverage ଗେଟ୍, ଏବଂ
production build ହେଉଛି CIର ଦାୟିତ୍ୱ — ସେଗୁଡ଼ିକୁ ସ୍ଥାନୀୟ ଭାବେ ଚଲାଇଲେ PR
ଯାଞ୍ଚଗୁଡ଼ିକ ପୂର୍ବରୁ ଦେଉନଥିବା କୌଣସି ଅତିରିକ୍ତ ସଙ୍କେତ ମିଳେ ନାହିଁ, ଏବଂ ଛୋଟ machineଗୁଡ଼ିକରେ ଏହା hostକୁ ସନ୍ତୃପ୍ତ କରିପାରେ (#8084):

- ଆପଣଙ୍କ ପରିବର୍ତ୍ତନକୁ cover କରୁଥିବା test files ଚଲାନ୍ତୁ: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` ଚଲାନ୍ତୁ
- production code ପରିବର୍ତ୍ତିତ ହେଲେ ସେହି PRରେ automated tests ଅନ୍ତର୍ଭୁକ୍ତ କିମ୍ବା ଅଦ୍ୟତନ କରନ୍ତୁ
- `node:test` ଫାଇଲ୍ଗୁଡ଼ିକରେ, ପ୍ରତ୍ୟେକ top-level `await` (ଯେପରିକି `await import(...)`)କୁ ପ୍ରଥମ `test()` / `describe()` ପୂର୍ବରୁ ରଖନ୍ତୁ: `--test-force-exit` ଅଧୀନରେ, ଏହା ପରେ register ହୋଇଥିବା tests କେବେ ମଧ୍ୟ ନିରବରେ ଚାଲିନପାରେ (#18045; `npm run check:test-tla-order` ଦ୍ୱାରା ବାଧ୍ୟତାମୂଳକ)
- production code ପରିବର୍ତ୍ତିତ ହେଲେ PR ବର୍ଣ୍ଣନାରେ ପରିବର୍ତ୍ତିତ କିମ୍ବା ଯୋଡ଼ାଯାଇଥିବା test files ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ
- CIରେ project secrets configure ହୋଇଥିଲେ PRରେ SonarQube ଫଳାଫଳ ଯାଞ୍ଚ କରନ୍ତୁ

ବର୍ତ୍ତମାନର test ସ୍ଥିତି: **122ଟି unit test files**, ଯାହା ନିମ୍ନଲିଖିତକୁ cover କରେ:

- Provider translators ଏବଂ format conversion
- Rate limiting, circuit breaker, ଏବଂ resilience
- Semantic cache, idempotency, progress tracking
- Database operations ଏବଂ schema (21ଟି DB modules)
- OAuth flows ଏବଂ authentication
- API endpoint validation (Zod v4)
- MCP server tools ଏବଂ scope enforcement
- Memory ଏବଂ Skills systems

---

## କୋଡ୍ ଶୈଳୀ

- **ESLint** — କମିଟ୍ କରିବା ପୂର୍ବରୁ `npm run lint` ଚଲାନ୍ତୁ
- **Prettier** — କମିଟ୍ ସମୟରେ `lint-staged` ମାଧ୍ୟମରେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଫର୍ମାଟ୍ ହୁଏ (2ଟି ସ୍ପେସ୍, ସେମିକୋଲନ୍, ଡବଲ୍ କୋଟ୍, 100 ଅକ୍ଷର ପ୍ରସ୍ଥ, es5 ଟ୍ରେଲିଂ କମା)
- **TypeScript** — ସମସ୍ତ `src/` କୋଡ୍ `.ts`/`.tsx` ବ୍ୟବହାର କରେ; `open-sse/` `.ts`/`.js` ବ୍ୟବହାର କରେ; TSDoc (`@param`, `@returns`, `@throws`) ସହିତ ଡକ୍ୟୁମେଣ୍ଟ୍ କରନ୍ତୁ
- **`eval()` ନାହିଁ** — ESLint `no-eval`, `no-implied-eval`, `no-new-func`କୁ ବାଧ୍ୟତାମୂଳକ କରେ
- **Zod ବୈଧତା ଯାଞ୍ଚ** — ସମସ୍ତ API ଇନପୁଟ୍ ବୈଧତା ଯାଞ୍ଚ ପାଇଁ Zod v4 ସ୍କିମା ବ୍ୟବହାର କରନ୍ତୁ
- **ନାମକରଣ**: ଫାଇଲ୍ = camelCase/kebab-case, କମ୍ପୋନେଣ୍ଟ୍ = PascalCase, କନଷ୍ଟାଣ୍ଟ୍ = UPPER_SNAKE

### ତ୍ରୁଟି ପରିଚାଳନା / ଖାଲି catch ବ୍ଲକ୍

କୌଣସି `catch`କୁ ବ୍ୟାଖ୍ୟା ବିନା କେବେ ମଧ୍ୟ ଛାଡ଼ନ୍ତୁ ନାହିଁ। ଏହାକୁ ଦୁଇଟି ଶ୍ରେଣୀ ମଧ୍ୟରୁ ଗୋଟିଏରେ ବର୍ଗୀକୃତ କରନ୍ତୁ (ଏହା
"SSE ଷ୍ଟ୍ରିମ୍ରେ କେବେ ମଧ୍ୟ ନିରବରେ ତ୍ରୁଟିଗୁଡ଼ିକୁ ଅଣଦେଖା କରନ୍ତୁ ନାହିଁ" କଠୋର ନିୟମକୁ କାର୍ଯ୍ୟକାରୀ କରେ):

- **ଉଦ୍ଦେଶ୍ୟମୂଳକ (ଆମର ନିଜସ୍ୱ ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ କ୍ଲିନଅପ୍/ଟେଲିମେଟ୍ରି)** — ଏଠାରେ ବିଫଳତା ଆଶାକରାଯାଏ ଏବଂ
  କ୍ଷତିହୀନ; ଗୋଟିଏ ଧାଡ଼ିରେ କାରଣ ସୂଚକ କମେଣ୍ଟ୍ ଯୋଡ଼ନ୍ତୁ, କୌଣସି ଲଗିଂ କରନ୍ତୁ ନାହିଁ (ପ୍ରତ୍ୟେକ ଅନୁରୋଧରେ ଲଗିଂ କରିବାରୁ ସୃଷ୍ଟି ହେଉଥିବା
  ଅନାବଶ୍ୟକ କୋଳାହଳକୁ ଏହି ପ୍ରଥା ଏଡ଼ାଇଥାଏ)।

  ```ts
  } catch {} // କ୍ଲାଏଣ୍ଟ୍ ସଂଯୋଗ ବିଚ୍ଛିନ୍ନ ହେବା ପରେ ପୂର୍ବରୁ ବନ୍ଦ ଥିବା କଣ୍ଟ୍ରୋଲର୍କୁ ବନ୍ଦ କରିବା ଆଶାକରାଯାଏ
  ```

- **ଲଗ୍ କରିବା ଉଚିତ (ବାହ୍ୟ/କଲର୍-ଯୋଗାଇଥିବା କୋଡ୍, କିମ୍ବା ଅଣଦେଖା କରିବା ଦ୍ୱାରା ନିୟନ୍ତ୍ରଣ ପ୍ରବାହ ପରିବର୍ତ୍ତିତ ହେଲେ)** — `catch`କୁ ରଖନ୍ତୁ
  (ଏହାକୁ କେବେ ମଧ୍ୟ ଷ୍ଟ୍ରିମ୍କୁ ଭଙ୍ଗ କରିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ), କିନ୍ତୁ ଏକ ପ୍ରସଙ୍ଗଯୁକ୍ତ `console.debug`/`warn` ନିର୍ଗତ କରନ୍ତୁ, ଯାହାଦ୍ୱାରା
  ବିଫଳତା ଚିହ୍ନଟ କରାଯାଇପାରିବ।

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure କଲ୍ବ୍ୟାକ୍ ତ୍ରୁଟି:", e);
  }
  ```

ପ୍ରୟୋଗ ହୋଇଥିବା ଉଦାହରଣଗୁଡ଼ିକ ପାଇଁ `open-sse/utils/stream.ts` ଏବଂ `open-sse/utils/streamHandler.ts` ଦେଖନ୍ତୁ।

---

## ପ୍ରକଳ୍ପ ଗଠନ

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

## ଏକ ନୂତନ ପ୍ରଦାତା ଯୋଡ଼ିବା

### ପଦକ୍ଷେପ 1: ପ୍ରଦାତା ସ୍ଥିରାଙ୍କଗୁଡ଼ିକ ପଞ୍ଜୀକରଣ କରନ୍ତୁ

`src/shared/constants/providers.ts`ରେ ଯୋଡ଼ନ୍ତୁ — ମଡ୍ୟୁଲ୍ ଲୋଡ୍ ସମୟରେ Zod ଦ୍ୱାରା ବୈଧତା ଯାଞ୍ଚ କରାଯାଏ।

### ପଦକ୍ଷେପ 2: ଏକ୍ସିକ୍ୟୁଟର୍ ଯୋଡ଼ନ୍ତୁ (ଯଦି କଷ୍ଟମ୍ ଲଜିକ୍ ଆବଶ୍ୟକ)

ମୂଳ ଏକ୍ସିକ୍ୟୁଟର୍କୁ ବିସ୍ତାର କରି `open-sse/executors/your-provider.ts`ରେ ଏକ୍ସିକ୍ୟୁଟର୍ ତିଆରି କରନ୍ତୁ।

### ପଦକ୍ଷେପ 3: ଅନୁବାଦକ ଯୋଡ଼ନ୍ତୁ (ଯଦି ଫର୍ମାଟ୍ OpenAI ନୁହେଁ)

`open-sse/translator/`ରେ ଅନୁରୋଧ/ପ୍ରତିକ୍ରିୟା ଅନୁବାଦକ ତିଆରି କରନ୍ତୁ।

### ପଦକ୍ଷେପ 4: OAuth କନ୍ଫିଗ୍ ଯୋଡ଼ନ୍ତୁ (ଯଦି OAuth-ଆଧାରିତ)

`src/lib/oauth/constants/oauth.ts`ରେ OAuth ପରିଚୟପତ୍ର ଏବଂ `src/lib/oauth/services/`ରେ ସେବା ଯୋଡ଼ନ୍ତୁ।

ଯଦି ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରଦାତା ନିଜର ସାର୍ବଜନୀନ CLI / ବ୍ରାଉଜର୍ ବଣ୍ଡଲ୍ ଭିତରେ ଏକ ସାର୍ବଜନୀନ OAuth client_id/ଗୁପ୍ତ ତଥ୍ୟ କିମ୍ବା Firebase Web API କୀ ବିତରଣ କରେ, ତେବେ ଏହାକୁ ଏକ ଷ୍ଟ୍ରିଙ୍ଗ୍ ଲିଟେରାଲ୍ ଭାବେ ଏମ୍ବେଡ୍ **କରନ୍ତୁ ନାହିଁ**। `open-sse/utils/publicCreds.ts`ରୁ `resolvePublicCred()` ବ୍ୟବହାର କରନ୍ତୁ ଏବଂ `EMBEDDED_DEFAULTS`ରେ ଏକ ମାସ୍କ୍ କରାଯାଇଥିବା ବାଇଟ୍ ଏଣ୍ଟ୍ରି ଯୋଡ଼ନ୍ତୁ। ସମ୍ପୂର୍ଣ୍ଣ ବାଧ୍ୟତାମୂଳକ କାର୍ଯ୍ୟପ୍ରବାହ [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)ରେ ଲିପିବଦ୍ଧ ହୋଇଛି।

ହ୍ୟାଣ୍ଡଲର୍/ଏକ୍ସିକ୍ୟୁଟର୍ଗୁଡ଼ିକ ଭିତରେ, କ୍ଲାଏଣ୍ଟ୍କୁ ପହଞ୍ଚୁଥିବା ତ୍ରୁଟି ସନ୍ଦେଶଗୁଡ଼ିକ `open-sse/utils/error.ts`ର `buildErrorBody()` / `sanitizeErrorMessage()` ମାଧ୍ୟମରେ ଯିବା ଆବଶ୍ୟକ — କୌଣସି Response ବଡିରେ କଞ୍ଚା `err.stack` କିମ୍ବା `err.message` କେବେବି ରଖନ୍ତୁ ନାହିଁ। [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ଦେଖନ୍ତୁ।

### ପଦକ୍ଷେପ 5: ମଡେଲ୍ଗୁଡ଼ିକ ପଞ୍ଜୀକରଣ କରନ୍ତୁ

`open-sse/config/providerRegistry.ts`ରେ ମଡେଲ୍ ସଂଜ୍ଞାଗୁଡ଼ିକ ଯୋଡ଼ନ୍ତୁ।

### ପଦକ୍ଷେପ 6: ପରୀକ୍ଷାଗୁଡ଼ିକ ଯୋଡ଼ନ୍ତୁ

ଅତି କମ୍ରେ ନିମ୍ନଲିଖିତ ବିଷୟଗୁଡ଼ିକୁ ଅନ୍ତର୍ଭୁକ୍ତ କରି `tests/unit/`ରେ ୟୁନିଟ୍ ପରୀକ୍ଷା ଲେଖନ୍ତୁ:

- ପ୍ରଦାତା ପଞ୍ଜୀକରଣ
- ଅନୁରୋଧ/ପ୍ରତିକ୍ରିୟା ଅନୁବାଦ
- ତ୍ରୁଟି ପରିଚାଳନା

---

## ପୁଲ୍ ରିକ୍ୱେଷ୍ଟ ଯାଞ୍ଚତାଲିକା

- [ ] ପରୀକ୍ଷଣଗୁଡ଼ିକ ସଫଳ ହୋଇଛି (`npm test`)
- [ ] ଲିଣ୍ଟିଂ ସଫଳ ହୋଇଛି (`npm run lint`)
- [ ] ବିଲ୍ଡ ସଫଳ ହୋଇଛି (`npm run build`)
- [ ] ନୂତନ ସାର୍ବଜନୀନ ଫଙ୍କସନ୍ ଏବଂ ଇଣ୍ଟରଫେସ୍ଗୁଡ଼ିକ ପାଇଁ TypeScript ଟାଇପ୍ ଯୋଡ଼ାଯାଇଛି
- [ ] କୌଣସି ହାର୍ଡକୋଡ୍ କରାଯାଇଥିବା ସିକ୍ରେଟ୍ କିମ୍ବା ଫଲ୍ବ୍ୟାକ୍ ମୂଲ୍ୟ ନାହିଁ
- [ ] ସାର୍ବଜନୀନ ଅପ୍ଷ୍ଟ୍ରିମ୍ କ୍ରେଡେନ୍ସିଆଲ୍ଗୁଡ଼ିକୁ `resolvePublicCred()` ମାଧ୍ୟମରେ ଏମ୍ବେଡ୍ କରାଯାଇଛି ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ଦେଖନ୍ତୁ), କେବେବି ଲିଟେରାଲ୍ ଭାବରେ ନୁହେଁ
- [ ] ତ୍ରୁଟି ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକ `buildErrorBody()` / `sanitizeErrorMessage()` ମାଧ୍ୟମରେ ରୁଟ୍ ହୋଇଛି — ପ୍ରତିକ୍ରିୟା ବଡିରେ କୌଣସି ଅପରିବର୍ତ୍ତିତ ଷ୍ଟାକ୍ ଟ୍ରେସ୍ ନାହିଁ ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ଦେଖନ୍ତୁ)
- [ ] ସେଲ୍ କମାଣ୍ଡଗୁଡ଼ିକ (`exec` / `spawn`) ଷ୍ଟ୍ରିଙ୍ଗ୍ ଇଣ୍ଟରପୋଲେସନ୍ ମାଧ୍ୟମରେ ନୁହେଁ, `env` ମାଧ୍ୟମରେ ରନ୍ଟାଇମ୍ ମୂଲ୍ୟ ପାସ୍ କରନ୍ତି
- [ ] ସମସ୍ତ ଇନ୍ପୁଟ୍କୁ Zod ସ୍କିମା ସହିତ ବୈଧୀକରଣ କରାଯାଇଛି
- [ ] ବ୍ୟବହାରକାରୀଙ୍କୁ ପ୍ରଭାବିତ କରୁଥିବା ପରିବର୍ତ୍ତନଗୁଡ଼ିକ ପାଇଁ `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` ଅଧୀନରେ ଚେଞ୍ଜଲଗ୍ **ଫ୍ରାଗ୍ମେଣ୍ଟ୍** ଯୋଡ଼ାଯାଇଛି ([`changelog.d/README.md`](./changelog.d/README.md) ଦେଖନ୍ତୁ) — `CHANGELOG.md`କୁ ସିଧାସଳଖ ସମ୍ପାଦନା କରନ୍ତୁ **ନାହିଁ**; ରିଲିଜ୍ ସମୟରେ ଫ୍ରାଗ୍ମେଣ୍ଟ୍ଗୁଡ଼ିକୁ ଏକତ୍ର କରାଯାଏ ଏବଂ PRଗୁଡ଼ିକ ମଧ୍ୟରେ କେବେବି ଦ୍ୱନ୍ଦ୍ୱ ସୃଷ୍ଟି ହୁଏ ନାହିଁ
- [ ] ଡକ୍ୟୁମେଣ୍ଟେସନ୍ ଅପଡେଟ୍ କରାଯାଇଛି (ଯଦି ପ୍ରଯୁଜ୍ୟ)
- [ ] କୌଣସି ନୂତନ CodeQL / Secret-Scanning ସତର୍କତା ଖୋଲାଯାଇନାହିଁ, କିମ୍ବା ପ୍ରତ୍ୟେକଟିକୁ ସମ୍ପର୍କିତ `docs/security/` ଡକ୍ୟୁମେଣ୍ଟ୍ ଉଲ୍ଲେଖ କରୁଥିବା ବୈଷୟିକ ଯଥାର୍ଥତା ସହିତ ଖାରଜ କରାଯାଇଛି
- [ ] ଚାଇଲ୍ଡ ପ୍ରୋସେସ୍ ସ୍ପନ୍ କରୁଥିବା ରୁଟ୍ଗୁଡ଼ିକ (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts`ରେ `isLocalOnlyPath()` ଭାବରେ ବର୍ଗୀକୃତ ହୋଇଛି — [କଠୋର ନିୟମ #15](docs/security/ROUTE_GUARD_TIERS.md) ଦେଖନ୍ତୁ
- [ ] କମିଟ୍ ବାର୍ତ୍ତାଗୁଡ଼ିକରେ କୌଣସି AI/ବଟ୍ `Co-authored-by` ଟ୍ରେଲର୍ ନାହିଁ (କଠୋର ନିୟମ #16) — ଯେଉଁ ମାନବ ସହଯୋଗୀଙ୍କ କାର୍ଯ୍ୟ ପୁନଃବ୍ୟବହୃତ ହୋଇଛି, ସେମାନଙ୍କୁ ମାନକ `Co-authored-by: Name <email>` ଟ୍ରେଲର୍ ସହିତ ଶ୍ରେୟ ଦିଆଯାଇଛି

---

## ରିଲିଜ୍ କରିବା

ରିଲିଜ୍ଗୁଡ଼ିକ `/generate-release` ୱର୍କଫ୍ଲୋ ମାଧ୍ୟମରେ ପରିଚାଳିତ ହୁଏ। ଏକ ନୂତନ GitHub Release ସୃଷ୍ଟି ହେଲେ, ପ୍ୟାକେଜ୍ଟି GitHub Actions ମାଧ୍ୟମରେ **ସ୍ୱୟଂଚାଳିତ ଭାବେ npm ରେ ପ୍ରକାଶିତ ହୁଏ**।

VPS ଡିପ୍ଲୟମେଣ୍ଟ ପାଇଁ, `npm run build` ପରିବର୍ତ୍ତେ `npm run build:release` ବ୍ୟବହାର କରନ୍ତୁ — ଏହା ଏକ ସ୍ୱଚ୍ଛ
ପୁନଃବିଲ୍ଡ କରେ, ବଣ୍ଡଲ୍କୁ `dist/` ମଧ୍ୟରେ ଏକତ୍ର କରେ ଏବଂ `dist/BUILD_SHA` ସେଣ୍ଟିନେଲ୍ ଲେଖେ।
ତା’ପରେ `/deploy-vps-*-cc` ସ୍କିଲ୍ଗୁଡ଼ିକ ବ୍ୟବହାର କରନ୍ତୁ, ଯେଉଁଗୁଡ଼ିକ `dist/`କୁ ରିମୋଟ୍ `app/` ଡିରେକ୍ଟୋରୀ ସହିତ rsync କରେ।

---

## ସହାୟତା ପାଇବା

- **ସ୍ଥାପତ୍ୟ** : [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) ଦେଖନ୍ତୁ।
- **API ସନ୍ଦର୍ଭ** : [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) ଦେଖନ୍ତୁ।
- **ସୁରକ୍ଷା ଡକସ୍** : [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ଓପ୍ସ ଡକସ୍।** : [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ସମସ୍ୟାଗୁଡିକ** : [github.com/cheaper-inference/OmniRoute/issues](https://github.com/cheaper-inference/OmniRoute/issues)
