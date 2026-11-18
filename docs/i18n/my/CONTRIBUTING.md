# Contributing to OmniRoute (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

ပါဝင်ကူညီရန် စိတ်ဝင်စားသည့်အတွက် ကျေးဇူးတင်ပါသည်။ ဤလမ်းညွှန်တွင် စတင်ရန် လိုအပ်သမျှအားလုံး ပါဝင်ပါသည်။

ပြောင်းလဲမှုတစ်ခုချင်းစီအတွက် တရားဝင်လုပ်ငန်းစဉ်ကို
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) မှ စတင်ပါ။ ၎င်းတွင် provider၊ routing၊
UI/UX၊ i18n၊ CLI၊ database နှင့် build/deploy ပြောင်းလဲမှုများကို ၎င်းတို့၏ contract များ၊ သီးသန့်အာရုံစိုက်ထားသော test များ၊ CI
လွှမ်းခြုံမှုနှင့် ပြန်လည်ညှိနှိုင်းခြင်းအဆင့်များနှင့် ချိတ်ဆက်ဖော်ပြထားသည်။

---

## ဖွံ့ဖြိုးတိုးတက်ရေး စနစ်ပြင်ဆင်မှု

### လိုအပ်ချက်များ

- **Node.js** `>=22.22.2 <23`, သို့မဟုတ် `>=24.0.0 <27` (အကြံပြုချက်: 24 LTS)
- **npm** 10+

> **Node 24 အသုံးပြုသည့် Windows:** လက်ရှိ 24 LTS patch release (အနည်းဆုံး 24.20.0) ကို အသုံးပြုပါ။
> အစောပိုင်း release များတွင် `--test-force-exit` က process ကိုပိတ်ပြီးနောက် စမ်းသပ်မှုများအောင်မြင်သော်လည်း ရပ်တန့်သွားနိုင်သည်။
> Node ၏ [Windows libuv ပြင်ဆင်ချက်](https://github.com/nodejs/node/pull/61999) သည်
> ဤ runtime crash ကို ဖြေရှင်းပေးသည်။ test assertions နှင့် runner exit checks များကို ဖွင့်ထားပါ။

> **npm v11+ အသုံးပြုသူများ (Node 24+):** `npm install` ပြီးနောက် native modules များ ထည့်သွင်းပြီးကြောင်း အတည်ပြုပါ:
> `node -e "require('better-sqlite3')"`. ၎င်းသည် `MODULE_NOT_FOUND` ဖြင့် မအောင်မြင်ပါက
> `npm approve-scripts better-sqlite3 && npm install` ကို လုပ်ဆောင်ပါ။ [ပြဿနာဖြေရှင်းခြင်း](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module) တွင် ကြည့်ပါ။

- **Git**

### Clone လုပ်ခြင်းနှင့် ထည့်သွင်းခြင်း

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# သင်၏ .env ကို template မှ ဖန်တီးပါ
cp .env.example .env

# လိုအပ်သော secrets များကို ထုတ်လုပ်ပါ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ဖွံ့ဖြိုးတိုးတက်ရေးအတွက် အဓိက variables များ:

| Variable               | Development Default      | ဖော်ပြချက်                 |
| ---------------------- | ------------------------ | -------------------------- |
| `PORT`                 | `20128`                  | Server port                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Frontend အတွက် Base URL    |
| `JWT_SECRET`           | (အထက်တွင် ထုတ်လုပ်ပါ)    | JWT signing secret         |
| `INITIAL_PASSWORD`     | `CHANGEME`               | ပထမဆုံး login password     |
| `APP_LOG_LEVEL`        | `info`                   | Log အသေးစိတ်ဖော်ပြမှုအဆင့် |

### Dashboard Settings

Dashboard တွင် environment variables များမှတစ်ဆင့်လည်း ပြင်ဆင်နိုင်သော feature များအတွက် UI toggles များ ပါဝင်သည်:

| Setting Location    | Toggle             | ဖော်ပြချက်                           |
| ------------------- | ------------------ | ------------------------------------ |
| Settings → Advanced | Debug Mode         | Debug request logs (UI) ကို ဖွင့်ပါ  |
| Settings → General  | Sidebar Visibility | Sidebar sections များကို ပြ/ဖျောက်ပါ |

ဤ settings များကို database တွင် သိမ်းဆည်းထားပြီး restart လုပ်ပြီးနောက်တွင်လည်း ဆက်လက်တည်ရှိသည်။ သတ်မှတ်ထားပါက env var defaults များကို အစားထိုးသည်။

### Local တွင် လုပ်ဆောင်ခြင်း

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ ထို့နောက် assembleStandalone → dist/
npm run start

# Contributor ပြင်ဆင်မှုများအတွက် အမြန် backend/API-only compile
npm run build:contributor

# Release build (သန့်ရှင်းသော rebuild + HEAD sentinel — deploy အတွက် လိုအပ်သည်)
npm run build:release   # rm -rf .build dist ပြီးနောက် build + dist/BUILD_SHA ကို ရေးသားသည်

# အသုံးများသော port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Contributor build သည် compile-only validation ကို လုပ်ဆောင်သည်: standalone
distribution ကို assemble လုပ်ခြင်း သို့မဟုတ် optional native packaging assets များကို build လုပ်ခြင်း မရှိပါ။
ဖြန့်ချိနိုင်သော bundle ကို အတည်ပြုရန်လိုအပ်ပါက ပုံမှန် production build ကို အသုံးပြုပါ။

### Build Output Layout

| Directory | Contents                                                                              | Tracked |
| --------- | ------------------------------------------------------------------------------------- | ------- |
| `src/`    | Application source (TypeScript / TSX)                                                 | Yes     |
| `.build/` | Intermediates — `next build` output (gitignored, `distDir = .build/next`)             | No      |
| `dist/`   | ဖြန့်ချိနိုင်သော bundle — `assembleStandalone` ဖြင့် assemble လုပ်ထားသည် (gitignored) | No      |

Build pipeline သည် single pass ဖြစ်သည်:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (standalone + static + public + native assets များကို ကူးယူသည်)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` သည် ထို့အပြင် directory နှစ်ခုလုံးကို အရင်ရှင်းလင်းပြီး
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ကို deploy integrity sentinel အဖြစ် ရေးသားသည်။

`npm run build:contributor` သည် backend-only build profile ကို အသုံးပြုသည်။ Build လုပ်နေစဉ်
dashboard UI files များကို ယာယီ stub ပြုလုပ်ပြီး API route handlers များကို ထိန်းသိမ်းထားကာ
build ပြီးနောက် မူလ files များကို ပြန်လည်ထားရှိသည်။ Dashboard UI ကို သက်ရောက်မှုရှိသော
ပြင်ဆင်မှုများအတွက် သို့မဟုတ် release validation အပြည့်အစုံအတွက် `npm run build` ကို အသုံးပြုပါ။
Contributor profile သည် release build ကို အစားထိုးရန် မဟုတ်ပါ။

> **VPS deploy မှတ်ချက်:** remote image directory `/usr/lib/node_modules/omniroute/app/`
> သည် မပြောင်းလဲပါ။ Deploy skills များသည် `dist/` ၏ contents များကို ၎င်းထဲသို့ rsync လုပ်သည်။
> Repository အတွင်းရှိ build output path သာ ပြောင်းလဲထားသည် (`app/` → `dist/`)။

ပုံမှန် URLs:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git အလုပ်စီးဆင်းမှု

> ⚠️ **`main` သို့ တိုက်ရိုက် commit လုံးဝ မလုပ်ပါနှင့်။** Feature branch များကို အမြဲအသုံးပြုပါ။
>
> **PR base:** လက်ရှိအသုံးပြုနေသော `release/vX.Y.Z` branch ကို ဦးတည်ပါ (`main` မဟုတ်ပါ)။
> release တစ်ခုလျှင် branch တစ်ခု + ဖြန့်ချိချိန်တွင် tag သတ်မှတ်သည့် ပုံစံအကြောင်း
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) တွင် ကြည့်ပါ။

```bash
# လက်ရှိအသုံးပြုနေသော release ၏ နောက်ဆုံး commit မှ branch ခွဲပါ (ဥပမာ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ပြောင်းလဲမှုများ ပြုလုပ်ပါ ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 ဖြင့် Pull Request တစ်ခု ဖွင့်ပါ
```

### Branch အမည်ပေးခြင်း

| Prefix      | ရည်ရွယ်ချက်                          |
| ----------- | ------------------------------------ |
| `feat/`     | Feature အသစ်များ                     |
| `fix/`      | Bug ပြင်ဆင်မှုများ                   |
| `refactor/` | Code ဖွဲ့စည်းပုံ ပြန်လည်ပြင်ဆင်ခြင်း |
| `docs/`     | Documentation ပြောင်းလဲမှုများ       |
| `test/`     | Test ထည့်သွင်းမှုများ/ပြင်ဆင်မှုများ |
| `chore/`    | Tooling၊ CI၊ dependency များ         |

### Commit Message များ

[Conventional Commits](https://www.conventionalcommits.org/) ကို လိုက်နာပါ။

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scope များ (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`။

---

## စမ်းသပ်မှုများ လုပ်ဆောင်ခြင်း

```bash
# စမ်းသပ်မှုအားလုံး (unit + vitest + ecosystem + e2e)
npm run test:all

# စမ်းသပ်မှုဖိုင်တစ်ခုတည်း (Node.js မူရင်း test runner — စမ်းသပ်မှုအများစုက ဒါကို အသုံးပြုသည်)
node --import tsx/esm --test tests/unit/your-file.test.ts

# သင့်ပြောင်းလဲမှုကြောင့် သက်ရောက်မှုရှိသော unit စမ်းသပ်မှုများသာ (CI gate နှင့်တူညီသော TIA selector၊ #8084)
npm run test:scoped            # နောက်ဆုံး commit အတွင်းရှိ ပြောင်းလဲမှုများ (သို့မဟုတ် working tree)
npm run test:scoped:staged     # staged လုပ်ထားသော ပြောင်းလဲမှုများသာ — pre-commit လုပ်ဆောင်မှုနှင့် တွဲဖက်ရန် သင့်တော်သည်
npm run test:scoped:full       # import-graph မြေပုံကို ဦးစွာ ပြန်လည်တည်ဆောက်သည် (ဖိုင်များ ထည့်သွင်း/ရွှေ့ပြောင်းပြီးနောက်)
# Exit 1 + "suite အပြည့်အစုံကို လုပ်ဆောင်ပါ" ဆိုသည်မှာ hub ဖိုင်တစ်ခု (tsconfig, package.json, …) သို့မဟုတ်
# မြေပုံတွင် မပါဝင်သော source တစ်ခု ပြောင်းလဲထားခြင်းကို ဆိုလိုသည် — selector သည် ဘေးကင်းစွာ ပျက်ကွက်ပြီး တိတ်တဆိတ် ကျော်သွားခြင်း မရှိပါ။

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E စမ်းသပ်မှုများ (Playwright လိုအပ်သည်)
npm run test:e2e

# Protocol client E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem လိုက်ဖက်ညီမှု စမ်းသပ်မှုများ
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches အတွက် 60%
npm run test:coverage
npm run coverage:report

# Lint + format စစ်ဆေးမှု
npm run lint
npm run check

# Gate ဖြင့် ကန့်သတ်ထားသော တကယ့် upstream combo smoke စမ်းသပ်မှု (VPS ဝင်ရောက်ခွင့် + တကယ့် provider credits လိုအပ်သည်)
# တကယ့် provider များကို အသုံးပြုသည် — ကုန်ကျစရိတ် အနည်းငယ်ရှိသည်။ CI တွင် လုံးဝ မလုပ်ဆောင်ပါ။ Gate မရှိပါက ပြဿနာမရှိဘဲ ကျော်သွားသည်။
# လိုအပ်ချက်: ssh root@192.168.0.15 ဝင်ရောက်ခွင့် (VPS မှ read-only DB snapshot တစ်ခုကို ရယူအသုံးပြုသည်)။
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke စမ်းသပ်မှု — ရိုးရိုး Node ESM scripts များဖြစ်ပြီး live .15 server ကို တိုက်ရိုက် အသုံးပြုသည်။
# လိုအပ်ချက်: ssh root@192.168.0.15 ဝင်ရောက်ခွင့် (combo များကို SSH sqlite မှတစ်ဆင့် ဖန်တီး/ဖျက်သိမ်းသည်)။
# တကယ့် provider များကို အသုံးပြုသည် (ကုန်ကျစရိတ်အနည်းငယ်ရှိသည်)။ __live_test__* combo များကိုသာ ဖန်တီး/ဖျက်သည်။ CI တွင် လုံးဝ မလုပ်ဆောင်ပါ။
# .15 တွင် REQUIRE_API_KEY=false ဖြစ်သောကြောင့် API key မလိုအပ်သော်လည်း သတ်မှတ်ထားပါက COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ကို လိုက်နာသည်။
npm run test:combo:live:vps              # HTTP scenario 7 ခု (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # တကယ့် cross-provider failover scenario တစ်ခု ထည့်သွင်းသည် (စုစုပေါင်း 8 ခု)
```

Coverage မှတ်ချက်များ:

- `npm run test:coverage` သည် အဓိက unit test suite အတွက် source coverage ကို တိုင်းတာပြီး `tests/**` ကို ဖယ်ထုတ်ကာ `open-sse/**` ကို ထည့်သွင်းသည်
- Pull request များသည် statements/lines/functions/branches အတွက် coverage gate ကို **60%+** တွင် ထိန်းသိမ်းရမည်
- PR တစ်ခုက `src/`, `open-sse/`, `electron/`, သို့မဟုတ် `bin/` အတွင်းရှိ production code ကို ပြောင်းလဲပါက ထို PR တစ်ခုတည်းအတွင်း automated test များကို ထည့်သွင်း သို့မဟုတ် အပ်ဒိတ်လုပ်ရမည်
- `npm run coverage:report` သည် နောက်ဆုံး coverage လုပ်ဆောင်မှုမှ ဖိုင်တစ်ဖိုင်ချင်းစီအလိုက် အသေးစိတ် report ကို ဖော်ပြသည်
- `npm run test:coverage:legacy` သည် သမိုင်းကြောင်းအလိုက် နှိုင်းယှဉ်ရန် ယခင် metric ကို ထိန်းသိမ်းထားသည်
- အဆင့်လိုက် coverage တိုးတက်ရေး လမ်းပြမြေပုံအတွက် `docs/ops/COVERAGE_PLAN.md` ကို ကြည့်ပါ

### Pull Request လိုအပ်ချက်များ

PR တစ်ခု မဖွင့်မီ သင်ပြောင်းလဲထားသည့်အရာအတွက် အာရုံစိုက်ထားသော လုပ်ငန်းစဉ်ကို လုပ်ဆောင်ရန်
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ကို အသုံးပြုပါ။ Unit suite အပြည့်အစုံ (CI shard 4 ခု)၊ Vitest၊ **60%+** coverage gate နှင့်
production build တို့သည် CI ၏ တာဝန်ဖြစ်သည် — ၎င်းတို့ကို local တွင် လုပ်ဆောင်ခြင်းသည် PR
စစ်ဆေးမှုများက ပေးမည့်အရာထက် ပိုမိုအသုံးဝင်သော အချက်အလက် မပေးသည့်အပြင် စက်ငယ်များတွင် host ကို ဝန်ပိစေနိုင်သည် (#8084):

- သင့်ပြောင်းလဲမှုကို လွှမ်းခြုံသော test file များကို လုပ်ဆောင်ပါ: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` ကို လုပ်ဆောင်ပါ
- Production code ပြောင်းလဲသည့်အခါတိုင်း တူညီသော PR အတွင်း automated test များကို ထည့်သွင်း သို့မဟုတ် အပ်ဒိတ်လုပ်ပါ
- `node:test` ဖိုင်များတွင် top-level `await` တစ်ခုစီ (ဥပမာ `await import(...)`) ကို ပထမဆုံး `test()` / `describe()` မတိုင်မီ ထားပါ: `--test-force-exit` အောက်တွင် ၎င်းနောက်မှ register လုပ်ထားသော စမ်းသပ်မှုများသည် တိတ်တဆိတ် လုံးဝ မလုပ်ဆောင်ဘဲ ဖြစ်နိုင်သည် (#18045; `npm run check:test-tla-order` ဖြင့် စည်းကမ်းသတ်မှတ်ထားသည်)
- Production code ပြောင်းလဲထားပါက ပြောင်းလဲထားသော သို့မဟုတ် ထည့်သွင်းထားသော test file များကို PR ဖော်ပြချက်တွင် ထည့်သွင်းပါ
- Project secrets များကို CI တွင် configure လုပ်ထားသည့်အခါ PR ပေါ်ရှိ SonarQube ရလဒ်ကို စစ်ဆေးပါ

လက်ရှိ စမ်းသပ်မှုအခြေအနေ: အောက်ပါတို့ကို လွှမ်းခြုံထားသော **unit test ဖိုင် 122 ခု**:

- Provider translator များနှင့် format ပြောင်းလဲမှု
- Rate limiting၊ circuit breaker နှင့် resilience
- Semantic cache၊ idempotency နှင့် progress tracking
- Database လုပ်ဆောင်ချက်များနှင့် schema (DB module 21 ခု)
- OAuth flow များနှင့် authentication
- API endpoint validation (Zod v4)
- MCP server tool များနှင့် scope enforcement
- Memory နှင့် Skills system များ

---

## ကုဒ်စတိုင်

- **ESLint** — commit မပြုလုပ်မီ `npm run lint` ကို run ပါ
- **Prettier** — commit ပြုလုပ်ချိန်တွင် `lint-staged` မှတစ်ဆင့် အလိုအလျောက် format လုပ်သည် (space 2 ခု၊ semicolon များ၊ double quote များ၊ စာလုံးအကျယ် 100၊ es5 trailing comma များ)
- **TypeScript** — `src/` ရှိ ကုဒ်အားလုံးသည် `.ts`/`.tsx` ကို အသုံးပြုသည်၊ `open-sse/` သည် `.ts`/`.js` ကို အသုံးပြုသည်၊ TSDoc (`@param`, `@returns`, `@throws`) ဖြင့် documentation ရေးသားပါ
- **`eval()` မသုံးရ** — ESLint က `no-eval`, `no-implied-eval`, `no-new-func` ကို မဖြစ်မနေ လိုက်နာစေသည်
- **Zod validation** — API input validation အားလုံးအတွက် Zod v4 schema များကို အသုံးပြုပါ
- **အမည်ပေးခြင်း**: ဖိုင်များ = camelCase/kebab-case၊ component များ = PascalCase၊ constant များ = UPPER_SNAKE

### Error ကိုင်တွယ်ခြင်း / အလွတ် catch block များ

မည်သည့် `catch` ကိုမျှ ရှင်းလင်းချက်မပါဘဲ မထားပါနှင့်။ ၎င်းကို အောက်ပါ အမျိုးအစားနှစ်မျိုးအနက်
တစ်မျိုးအဖြစ် ခွဲခြားပါ ("SSE stream များတွင် error များကို မည်သည့်အခါမျှ တိတ်တဆိတ် မျိုချမထားရ"
ဟူသော တင်းကျပ်သည့် စည်းမျဉ်းကို လက်တွေ့အသုံးချခြင်းဖြစ်သည်):

- **ရည်ရွယ်ချက်ရှိသော (ကျွန်ုပ်တို့ကိုယ်တိုင်၏ အကောင်းဆုံးကြိုးပမ်းမှု cleanup/telemetry)** — ဤနေရာတွင် failure ဖြစ်ခြင်းကို
  မျှော်လင့်ထားပြီး အန္တရာယ်မရှိပါ၊ အကြောင်းရင်းရှင်းလင်းချက် comment တစ်ကြောင်း ထည့်ပါ၊ logging မပြုလုပ်ပါနှင့်
  (request တိုင်းတွင် logging ပြုလုပ်ခြင်းကြောင့် ဖြစ်ပေါ်လာမည့် မလိုအပ်သော noise ကို ဤသတ်မှတ်ချက်က ရှောင်ရှားပေးသည်)။

  ```ts
  } catch {} // client ချိတ်ဆက်မှုပြတ်တောက်ပြီးနောက် ပိတ်ထားပြီးသား controller ကို ထပ်မံပိတ်ခြင်းမှာ မျှော်လင့်ထားသောအရာဖြစ်သည်
  ```

- **Log ပြုလုပ်သင့်သော (ပြင်ပ/ခေါ်ယူသူက ပေးထားသည့် ကုဒ်၊ သို့မဟုတ် error ကို မျိုချထားခြင်းက control flow ကို ပြောင်းလဲစေသည့်အခါ)** — catch ကို
  ဆက်လက်ထားရှိပါ (stream ကို မည်သည့်အခါမျှ မပျက်စေပါနှင့်)၊ သို့သော် failure ကို ရှာဖွေတွေ့ရှိနိုင်စေရန် ဆက်စပ်အကြောင်းအရာပါသည့်
  `console.debug`/`warn` ကို ထုတ်ပေးပါ။

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

လက်တွေ့အသုံးပြုထားသည့် နမူနာများအတွက် `open-sse/utils/stream.ts` နှင့် `open-sse/utils/streamHandler.ts` ကို ကြည့်ပါ။

---

## စီမံကိန်းဖွဲ့စည်းပုံ

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

## Provider အသစ်တစ်ခု ထည့်သွင်းခြင်း

### အဆင့် 1: Provider Constants များကို စာရင်းသွင်းခြင်း

`src/shared/constants/providers.ts` တွင် ထည့်သွင်းပါ — module ကို load လုပ်ချိန်တွင် Zod ဖြင့် အတည်ပြုစစ်ဆေးပါသည်။

### အဆင့် 2: Executor ထည့်သွင်းခြင်း (စိတ်ကြိုက် logic လိုအပ်ပါက)

အခြေခံ executor ကို တိုးချဲ့ထားသည့် executor ကို `open-sse/executors/your-provider.ts` တွင် ဖန်တီးပါ။

### အဆင့် 3: Translator ထည့်သွင်းခြင်း (OpenAI format မဟုတ်ပါက)

Request/response translator များကို `open-sse/translator/` တွင် ဖန်တီးပါ။

### အဆင့် 4: OAuth Config ထည့်သွင်းခြင်း (OAuth အခြေခံဖြစ်ပါက)

OAuth credentials များကို `src/lib/oauth/constants/oauth.ts` တွင် ထည့်သွင်းပြီး service ကို `src/lib/oauth/services/` တွင် ထည့်သွင်းပါ။

Upstream provider သည် အများသုံး OAuth client_id/secret သို့မဟုတ် Firebase Web API key ကို ၎င်း၏ အများသုံး CLI / browser bundle အတွင်း ဖြန့်ဝေထားပါက၊ ၎င်းကို string literal အဖြစ် **မထည့်သွင်းပါနှင့်**။ `open-sse/utils/publicCreds.ts` မှ `resolvePublicCred()` ကို အသုံးပြုပြီး masked byte entry တစ်ခုကို `EMBEDDED_DEFAULTS` တွင် ထည့်သွင်းပါ။ မဖြစ်မနေလိုက်နာရမည့် workflow အပြည့်အစုံကို [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) တွင် မှတ်တမ်းတင်ထားပါသည်။

Handlers/executors များအတွင်း client ထံရောက်ရှိမည့် error message များသည် `open-sse/utils/error.ts` မှ `buildErrorBody()` / `sanitizeErrorMessage()` ကို ဖြတ်သန်းရမည် — raw `err.stack` သို့မဟုတ် `err.message` ကို Response body ထဲတွင် လုံးဝမထည့်ပါနှင့်။ [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ကို ကြည့်ပါ။

### အဆင့် 5: Models များကို စာရင်းသွင်းခြင်း

Model definition များကို `open-sse/config/providerRegistry.ts` တွင် ထည့်သွင်းပါ။

### အဆင့် 6: Tests များ ထည့်သွင်းခြင်း

အနည်းဆုံး အောက်ပါအကြောင်းအရာများကို စမ်းသပ်ထားသည့် unit tests များကို `tests/unit/` တွင် ရေးသားပါ-

- Provider စာရင်းသွင်းခြင်း
- Request/response ဘာသာပြန်ပြောင်းလဲခြင်း
- Error ကိုင်တွယ်ခြင်း

---

## Pull Request စစ်ဆေးရန်စာရင်း

- [ ] စမ်းသပ်မှုများ အောင်မြင်သည် (`npm test`)
- [ ] Linting စစ်ဆေးမှုများ အောင်မြင်သည် (`npm run lint`)
- [ ] Build ပြုလုပ်မှု အောင်မြင်သည် (`npm run build`)
- [ ] အများသုံး function နှင့် interface အသစ်များအတွက် TypeScript type များ ထည့်သွင်းထားသည်
- [ ] Hardcode လုပ်ထားသော secret သို့မဟုတ် fallback value များ မရှိပါ
- [ ] အများသုံး upstream credential များကို literal များအဖြစ် မသုံးဘဲ `resolvePublicCred()` မှတစ်ဆင့် ထည့်သွင်းထားသည် ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ကို ကြည့်ပါ)
- [ ] Error response များကို `buildErrorBody()` / `sanitizeErrorMessage()` မှတစ်ဆင့် ဖြတ်သန်းစေထားပြီး response body များတွင် မူရင်း stack trace များ မပါဝင်ပါ ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ကို ကြည့်ပါ)
- [ ] Shell command များ (`exec` / `spawn`) သည် runtime value များကို string interpolation မှတစ်ဆင့် မဟုတ်ဘဲ `env` မှတစ်ဆင့် ပေးပို့သည်
- [ ] Input အားလုံးကို Zod schema များဖြင့် စစ်ဆေးအတည်ပြုထားသည်
- [ ] အသုံးပြုသူအပေါ် သက်ရောက်သည့် ပြောင်းလဲမှုများအတွက် Changelog **fragment** ကို `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` အောက်တွင် ထည့်သွင်းထားသည် ([`changelog.d/README.md`](./changelog.d/README.md) ကို ကြည့်ပါ) — `CHANGELOG.md` ကို တိုက်ရိုက် **မပြင်ဆင်ပါနှင့်**၊ fragment များကို release ပြုလုပ်ချိန်တွင် စုစည်းပြီး PR များအကြား conflict မဖြစ်စေပါ
- [ ] Documentation ကို လိုအပ်ပါက အပ်ဒိတ်လုပ်ထားသည်
- [ ] CodeQL / Secret-Scanning alert အသစ်များ မပေါ်လာပါ၊ သို့မဟုတ် alert တစ်ခုချင်းစီကို သက်ဆိုင်ရာ `docs/security/` doc အား ကိုးကားထားသည့် နည်းပညာဆိုင်ရာ အကြောင်းပြချက်ဖြင့် ပယ်ချထားသည်
- [ ] Child process များကို စတင်သည့် route များ (`/api/mcp/`, `/api/cli-tools/runtime/`) ကို `src/server/authz/routeGuard.ts` ရှိ `isLocalOnlyPath()` အဖြစ် သတ်မှတ်ထားသည် — [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md) ကို ကြည့်ပါ
- [ ] Commit message များတွင် AI/bot `Co-authored-by` trailer များ မပါဝင်ပါ (Hard Rule #16) — ပြန်လည်အသုံးပြုထားသော အလုပ်၏ လူသားပူးပေါင်းဆောင်ရွက်သူများကို စံသတ်မှတ်ထားသည့် `Co-authored-by: Name <email>` trailer များဖြင့် အသိအမှတ်ပြုထားသည်

---

## ဖြန့်ချိခြင်း

ဖြန့်ချိမှုများကို `/generate-release` workflow မှတစ်ဆင့် စီမံခန့်ခွဲပါသည်။ GitHub Release အသစ်တစ်ခု ဖန်တီးသည့်အခါ package ကို GitHub Actions မှတစ်ဆင့် **npm သို့ အလိုအလျောက် လွှင့်တင်ပါသည်**။

VPS deploy များအတွက် `npm run build` အစား `npm run build:release` ကို အသုံးပြုပါ — ၎င်းသည် အစမှ ပြန်လည် build လုပ်ခြင်း၊ bundle ကို `dist/` အတွင်း စုစည်းခြင်းနှင့် `dist/BUILD_SHA` sentinel ကို ရေးသားခြင်းတို့ကို လုပ်ဆောင်ပါသည်။
ထို့နောက် `dist/` ကို အဝေးရှိ `app/` directory သို့ rsync လုပ်ပေးသည့် `/deploy-vps-*-cc` skills များကို အသုံးပြုပါ။

---

## အကူအညီရယူခြင်း

- **ဗိသုကာဖွဲ့စည်းပုံ**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) ကို ကြည့်ပါ
- **API ကိုးကားချက်**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) ကို ကြည့်ပါ
- **လုံခြုံရေးဆိုင်ရာ စာရွက်စာတမ်းများ**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **လုပ်ငန်းလည်ပတ်မှုဆိုင်ရာ စာရွက်စာတမ်းများ**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ပြဿနာများ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
