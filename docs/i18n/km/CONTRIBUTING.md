# Contributing to OmniRoute (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

សូមអរគុណចំពោះចំណាប់អារម្មណ៍របស់អ្នកក្នុងការចូលរួមចំណែក! មគ្គុទ្ទេសក៍នេះគ្របដណ្តប់លើអ្វីៗទាំងអស់ដែលអ្នកត្រូវការ ដើម្បីចាប់ផ្តើម។

សម្រាប់លំហូរការងារផ្លូវការតាមការផ្លាស់ប្តូរនីមួយៗ សូមចាប់ផ្តើមជាមួយ
[គន្លងស្តង់ដារសម្រាប់ការចូលរួមចំណែក](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)។ វាផ្គូផ្គងការផ្លាស់ប្តូរលើ provider, routing,
UI/UX, i18n, CLI, មូលដ្ឋានទិន្នន័យ និង build/deploy ទៅនឹងកិច្ចសន្យា ការធ្វើតេស្តជាក់លាក់ វិសាលភាព CI
និងជំហានផ្ទៀងផ្ទាត់របស់វា។

---

## ការរៀបចំបរិស្ថានអភិវឌ្ឍន៍

### តម្រូវការជាមុន

- **Node.js** `>=22.22.2 <23`, ឬ `>=24.0.0 <27` (ណែនាំ៖ 24 LTS)
- **npm** 10+

> **Windows ជាមួយ Node 24៖** ប្រើ patch release បច្ចុប្បន្នរបស់ 24 LTS (យ៉ាងហោចណាស់ 24.20.0)។
> Release ចាស់ៗអាចបញ្ឈប់ដំណើរការបន្ទាប់ពីការធ្វើតេស្តជោគជ័យ នៅពេល `--test-force-exit` បិទ
> process។ [Windows libuv fix](https://github.com/nodejs/node/pull/61999) របស់ Node ដោះស្រាយ
> runtime crash នេះ។ សូមរក្សាការអះអាងក្នុងការធ្វើតេស្ត និងការត្រួតពិនិត្យការចាកចេញរបស់ runner ឱ្យបានបើកដំណើរការ។

> **អ្នកប្រើប្រាស់ npm v11+ (Node 24+)៖** បន្ទាប់ពី `npm install` សូមផ្ទៀងផ្ទាត់ថា native modules ត្រូវបានដំឡើង៖
> `node -e "require('better-sqlite3')"`. ប្រសិនបើវាបរាជ័យដោយមាន `MODULE_NOT_FOUND`,
> ដំណើរការ `npm approve-scripts better-sqlite3 && npm install`។ សូមមើល
> [ការដោះស្រាយបញ្ហា](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)។

- **Git**

### ក្លូន និងដំឡើង

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### អថេរបរិស្ថាន

```bash
# បង្កើត .env របស់អ្នកពីគំរូ
cp .env.example .env

# បង្កើត secrets ដែលត្រូវការ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

អថេរសំខាន់ៗសម្រាប់ការអភិវឌ្ឍន៍៖

| អថេរ                   | តម្លៃលំនាំដើមសម្រាប់ការអភិវឌ្ឍន៍ | សេចក្ដីពិពណ៌នា                 |
| ---------------------- | -------------------------------- | ------------------------------ |
| `PORT`                 | `20128`                          | ច្រក server                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`         | URL មូលដ្ឋានសម្រាប់ frontend   |
| `JWT_SECRET`           | (បង្កើតខាងលើ)                    | secret សម្រាប់ចុះហត្ថលេខា JWT  |
| `INITIAL_PASSWORD`     | `CHANGEME`                       | ពាក្យសម្ងាត់សម្រាប់ការចូលដំបូង |
| `APP_LOG_LEVEL`        | `info`                           | កម្រិតលម្អិតនៃ log             |

### ការកំណត់ផ្ទាំងគ្រប់គ្រង

ផ្ទាំងគ្រប់គ្រងផ្ដល់ toggle ក្នុង UI សម្រាប់មុខងារដែលអាចកំណត់តាមរយៈអថេរបរិស្ថានផងដែរ៖

| ទីតាំងការកំណត់      | Toggle             | សេចក្ដីពិពណ៌នា              |
| ------------------- | ------------------ | --------------------------- |
| Settings → Advanced | Debug Mode         | បើក debug request logs (UI) |
| Settings → General  | Sidebar Visibility | បង្ហាញ/លាក់ផ្នែក sidebar    |

ការកំណត់ទាំងនេះត្រូវបានរក្សាទុកក្នុង database ហើយនៅតែមានបន្ទាប់ពីចាប់ផ្ដើមឡើងវិញ ដោយបដិសេធតម្លៃលំនាំដើមរបស់ env var នៅពេលបានកំណត់។

### ដំណើរការក្នុងមូលដ្ឋាន

```bash
# របៀបអភិវឌ្ឍន៍ (ផ្ទុកឡើងវិញដោយស្វ័យប្រវត្តិ)
npm run dev

# បង្កើត production
npm run build    # next build → .build/next/ បន្ទាប់មក assembleStandalone → dist/
npm run start

# Compile លឿនសម្រាប់ backend/API តែប៉ុណ្ណោះ សម្រាប់ការផ្លាស់ប្ដូររបស់អ្នកចូលរួម
npm run build:contributor

# បង្កើត release (បង្កើតឡើងវិញស្អាត + HEAD sentinel — តម្រូវសម្រាប់ deploy)
npm run build:release   # rm -rf .build dist ហើយ build + សរសេរ dist/BUILD_SHA

# ការកំណត់ច្រកទូទៅ
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Contributor build ធ្វើការផ្ទៀងផ្ទាត់តែការចងក្រងប៉ុណ្ណោះ៖ វាមិន assemble standalone
distribution ឬ build optional native packaging assets ទេ។ ប្រើ production build ធម្មតា នៅពេលអ្នក
ត្រូវការផ្ទៀងផ្ទាត់ shippable bundle។

### ប្លង់លទ្ធផល Build

| ថត        | មាតិកា                                                                     | បានតាមដាន |
| --------- | -------------------------------------------------------------------------- | --------- |
| `src/`    | ប្រភពកម្មវិធី (TypeScript / TSX)                                           | បាទ/ចាស   |
| `.build/` | ឯកសារកណ្ដាល — លទ្ធផល `next build` (gitignored, `distDir = .build/next`)    | ទេ        |
| `dist/`   | bundle ដែលអាចដឹកជញ្ជូនបាន — assemble ដោយ `assembleStandalone` (gitignored) | ទេ        |

បំពង់ Build ដំណើរការតែមួយជំហាន៖

```
npm run build
  └─ next build → .build/next/standalone  (លទ្ធផល Next.js)
  └─ assembleStandalone()                 (ចម្លង standalone + static + public + native assets)
       └─ លទ្ធផល៖ dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` នឹងសម្អាតថតទាំងពីរជាមុនសិន ហើយសរសេរ
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ជា deploy integrity sentinel។

`npm run build:contributor` ប្រើ backend-only build profile។ វាប្ដូរ dashboard UI files ជាបណ្ដោះអាសន្ន
ខណៈពេលកំពុង build រក្សាទុក API route handlers ហើយស្ដារឯកសារដើមឡើងវិញបន្ទាប់ពី build។ ប្រើ `npm run build`
សម្រាប់ការផ្លាស់ប្ដូរដែលប៉ះពាល់ដល់ dashboard UI ឬសម្រាប់ full release validation; contributor profile
មិនមែនជាការជំនួស release build ទេ។

> **ចំណាំអំពី VPS deploy៖** remote image directory `/usr/lib/node_modules/omniroute/app/`
> មិនត្រូវបានផ្លាស់ប្ដូរទេ។ deploy skills ធ្វើ rsync មាតិកានៃ `dist/` ទៅក្នុងវា។
> មានតែ build output path ក្នុង repository ប៉ុណ្ណោះដែលបានផ្លាស់ទី (`app/` → `dist/`)។

URL លំនាំដើម៖

- **ផ្ទាំងគ្រប់គ្រង**៖ `http://localhost:20128/dashboard`
- **API**៖ `http://localhost:20128/v1`

---

## លំហូរការងារ Git

> ⚠️ **កុំ commit ដោយផ្ទាល់ទៅ `main` ឱ្យសោះ។** ត្រូវប្រើ feature branches ជានិច្ច។
>
> **មូលដ្ឋាន PR៖** កំណត់គោលដៅទៅកាន់ branch `release/vX.Y.Z` ដែលកំពុងសកម្ម (មិនមែន `main`)។ សូមមើល
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) សម្រាប់ម៉ូដែល
> release-per-branch + tag-at-ship។

```bash
# បង្កើត branch ពីចំណុចចុងក្រោយនៃ release ដែលកំពុងសកម្ម (ឧទាហរណ៍៖ release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ធ្វើការផ្លាស់ប្ដូរ ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# បើក Pull Request ដោយកំណត់ base = release/v3.8.49
```

### ការដាក់ឈ្មោះ Branch

| បុព្វបទ     | គោលបំណង                       |
| ----------- | ----------------------------- |
| `feat/`     | មុខងារថ្មី                    |
| `fix/`      | ការកែកំហុស                    |
| `refactor/` | ការរៀបចំរចនាសម្ព័ន្ធកូដឡើងវិញ |
| `docs/`     | ការផ្លាស់ប្ដូរឯកសារ           |
| `test/`     | ការបន្ថែម/កែតម្រូវតេស្ត       |
| `chore/`    | ឧបករណ៍, CI, dependencies      |

### សារ Commit

អនុវត្តតាម [Conventional Commits](https://www.conventionalcommits.org/)៖

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8)៖ `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`។

---

## ការដំណើរការតេស្ត

```bash
# តេស្តទាំងអស់ (unit + vitest + ecosystem + e2e)
npm run test:all

# ឯកសារតេស្តតែមួយ (កម្មវិធីដំណើរការតេស្តដើមរបស់ Node.js — តេស្តភាគច្រើនប្រើវា)
node --import tsx/esm --test tests/unit/your-file.test.ts

# ដំណើរការតែ unit tests ដែលរងផលប៉ះពាល់ពីការផ្លាស់ប្តូររបស់អ្នក (ប្រើកម្មវិធីជ្រើសរើស TIA ដូចគ្នានឹងច្រកត្រួតពិនិត្យ CI, #8084)
npm run test:scoped            # ការផ្លាស់ប្តូរនៅក្នុង commit ចុងក្រោយ (ឬ working tree)
npm run test:scoped:staged     # តែការផ្លាស់ប្តូរដែលបាន staged ប៉ុណ្ណោះ — សមស្របសម្រាប់ប្រើជាមួយការដំណើរការ pre-commit
npm run test:scoped:full       # បង្កើតផែនទី import-graph ឡើងវិញជាមុន (បន្ទាប់ពីបន្ថែម/ផ្លាស់ទីឯកសារ)
# Exit 1 + "ដំណើរការ suite ពេញលេញ" មានន័យថាឯកសារមជ្ឈមណ្ឌលមួយ (tsconfig, package.json, …) ឬប្រភព
# ដែលមិនទាន់បានផ្គូផ្គងបានផ្លាស់ប្តូរ — កម្មវិធីជ្រើសរើសបរាជ័យដោយសុវត្ថិភាព ហើយវាមិនដែលរំលងដោយស្ងាត់ៗទេ។

# Vitest (ម៉ាស៊ីនមេ MCP, autoCombo, cache)
npm run test:vitest

# តេស្ត E2E (តម្រូវឱ្យមាន Playwright)
npm run test:e2e

# តេស្ត E2E សម្រាប់ protocol clients (MCP transports, A2A)
npm run test:protocols:e2e

# តេស្តភាពឆបគ្នានៃ ecosystem
npm run test:ecosystem

# ច្រកត្រួតពិនិត្យ coverage៖ 60% សម្រាប់ statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# ពិនិត្យ lint + format
npm run lint
npm run check

# តេស្ត smoke សម្រាប់ combo ជាមួយ upstream ពិតដែលមានច្រកត្រួតពិនិត្យ (តម្រូវឱ្យមានសិទ្ធិចូលប្រើ VPS + credits ពិតរបស់ provider)
# ភ្ជាប់ទៅ provider ពិត — មានការចំណាយបន្តិចបន្តួច។ មិនដំណើរការក្នុង CI ជាដាច់ខាត។ រំលងដោយគ្មានបញ្ហា ប្រសិនបើគ្មានច្រកត្រួតពិនិត្យ។
# តម្រូវឱ្យ៖ មានសិទ្ធិចូលប្រើ ssh root@192.168.0.15 (ទាញយក snapshot នៃ DB ដែលបានតែអានពី VPS)។
RUN_COMBO_LIVE=1 npm run test:combo:live

# តេស្ត smoke ផ្ទាល់លើ VPS ដំណាក់កាលទី 3 — ស្គ្រីប Node ESM ធម្មតា ដែលភ្ជាប់ដោយផ្ទាល់ទៅម៉ាស៊ីនមេ .15 ដែលកំពុងដំណើរការ។
# តម្រូវឱ្យ៖ មានសិទ្ធិចូលប្រើ ssh root@192.168.0.15 (combo ត្រូវបានបង្កើត/លុបចោលតាមរយៈ SSH sqlite)។
# ភ្ជាប់ទៅ provider ពិត (ចំណាយតិចតួច)។ បង្កើត/លុបតែ combo ដែលមានឈ្មោះ __live_test__* ប៉ុណ្ណោះ។ មិនដំណើរការក្នុង CI ជាដាច់ខាត។
# REQUIRE_API_KEY=false នៅលើ .15 ដូច្នេះមិនត្រូវការ API key ទេ ប៉ុន្តែគោរពតាម COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ប្រសិនបើបានកំណត់។
npm run test:combo:live:vps              # សេណារីយ៉ូ HTTP ចំនួន 7 (អាទិភាព/ប្តូរវេន/ទម្ងន់/តម្លៃ/បញ្ចូលគ្នា/ស្វ័យប្រវត្តិ + ស្ថានភាព)
npm run test:combo:live:vps:failover     # បន្ថែមសេណារីយ៉ូ failover ឆ្លង provider ពិតមួយ (សរុប 8)
```

កំណត់សម្គាល់អំពី coverage៖

- `npm run test:coverage` វាស់ source coverage សម្រាប់ suite នៃ unit test ចម្បង ដោយមិនរាប់បញ្ចូល `tests/**` និងរាប់បញ្ចូល `open-sse/**`
- Pull request ត្រូវតែរក្សាច្រកត្រួតពិនិត្យ coverage ឱ្យបាន **60%+** សម្រាប់ statements/lines/functions/branches
- ប្រសិនបើ PR ផ្លាស់ប្តូរកូដ production ក្នុង `src/`, `open-sse/`, `electron/`, ឬ `bin/` វាត្រូវតែបន្ថែម ឬធ្វើបច្ចុប្បន្នភាពតេស្តស្វ័យប្រវត្តិនៅក្នុង PR ដូចគ្នា
- `npm run coverage:report` បង្ហាញរបាយការណ៍លម្អិតតាមឯកសារនីមួយៗពីការដំណើរការ coverage ចុងក្រោយ
- `npm run test:coverage:legacy` រក្សាទុកមាត្រដ្ឋានចាស់សម្រាប់ការប្រៀបធៀបជាប្រវត្តិសាស្ត្រ
- សូមមើល `docs/ops/COVERAGE_PLAN.md` សម្រាប់ផែនការអភិវឌ្ឍការកែលម្អ coverage ជាដំណាក់កាល

### តម្រូវការសម្រាប់ Pull Request

មុនពេលបើក PR សូមប្រើ
[មាគ៌ាស្តង់ដារសម្រាប់ការរួមចំណែក](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ដើម្បីដំណើរការវដ្តដែលផ្តោតលើ
អ្វីដែលអ្នកបានផ្លាស់ប្តូរ។ unit suite ពេញលេញ (CI ចំនួន 4 shards), Vitest, ច្រកត្រួតពិនិត្យ coverage **60%+** និង
production build គឺជាការទទួលខុសត្រូវរបស់ CI — ការដំណើរការពួកវានៅមូលដ្ឋានមិនផ្តល់ព័ត៌មានបន្ថែមដែលការត្រួតពិនិត្យ PR
មិនបានផ្តល់ឱ្យរួចហើយទេ ហើយនៅលើម៉ាស៊ីនតូចៗ វាអាចប្រើប្រាស់ធនធានម៉ាស៊ីនរហូតដល់ពេញ (#8084)៖

- ដំណើរការឯកសារតេស្តដែលគ្របដណ្តប់ការផ្លាស់ប្តូររបស់អ្នក៖ `node --import tsx/esm --test tests/unit/<file>.test.ts`
- ដំណើរការ `npm run lint`
- បន្ថែម ឬធ្វើបច្ចុប្បន្នភាពតេស្តស្វ័យប្រវត្តិនៅក្នុង PR ដូចគ្នា រាល់ពេលដែលកូដ production ផ្លាស់ប្តូរ
- ក្នុងឯកសារ `node:test` ដាក់ `await` កម្រិតកំពូលទាំងអស់ (ដូចជា `await import(...)`) មុន `test()` / `describe()` ដំបូង៖ នៅក្រោម `--test-force-exit` តេស្តដែលបានចុះឈ្មោះបន្ទាប់ពីវា អាចមិនដំណើរការដោយស្ងាត់ៗ (#18045; អនុវត្តដោយ `npm run check:test-tla-order`)
- បញ្ចូលឯកសារតេស្តដែលបានផ្លាស់ប្តូរ ឬបន្ថែមទៅក្នុងសេចក្តីពិពណ៌នា PR នៅពេលកូដ production បានផ្លាស់ប្តូរ
- ពិនិត្យលទ្ធផល SonarQube នៅលើ PR នៅពេលដែល project secrets ត្រូវបានកំណត់រចនាសម្ព័ន្ធក្នុង CI

ស្ថានភាពតេស្តបច្ចុប្បន្ន៖ **ឯកសារ unit test ចំនួន 122** ដែលគ្របដណ្តប់លើ៖

- កម្មវិធីបកប្រែរបស់ provider និងការបម្លែង format
- ការកំណត់អត្រា circuit breaker និងភាពធន់
- Semantic cache, idempotency និងការតាមដានវឌ្ឍនភាព
- ប្រតិបត្តិការ database និង schema (ម៉ូឌុល DB ចំនួន 21)
- លំហូរ OAuth និងការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ
- ការផ្ទៀងផ្ទាត់ API endpoint (Zod v4)
- ឧបករណ៍ម៉ាស៊ីនមេ MCP និងការអនុវត្តដែនសិទ្ធិ
- ប្រព័ន្ធ Memory និង Skills

---

## រចនាប័ទ្មកូដ

- **ESLint** — ដំណើរការ `npm run lint` មុនពេល commit
- **Prettier** — ត្រូវបានធ្វើទ្រង់ទ្រាយដោយស្វ័យប្រវត្តិតាមរយៈ `lint-staged` នៅពេល commit (ចន្លោះ 2, សញ្ញា semicolon, សញ្ញាសម្រង់ទ្វេ, ទទឹង 100 តួអក្សរ, សញ្ញាក្បៀសនៅខាងចុងតាម es5)
- **TypeScript** — កូដទាំងអស់ក្នុង `src/` ប្រើ `.ts`/`.tsx`; `open-sse/` ប្រើ `.ts`/`.js`; សរសេរឯកសារពន្យល់ដោយប្រើ TSDoc (`@param`, `@returns`, `@throws`)
- **ហាមប្រើ `eval()`** — ESLint អនុវត្តច្បាប់ `no-eval`, `no-implied-eval`, `no-new-func`
- **ការផ្ទៀងផ្ទាត់ដោយ Zod** — ប្រើ schema របស់ Zod v4 សម្រាប់ការផ្ទៀងផ្ទាត់ input របស់ API ទាំងអស់
- **ការដាក់ឈ្មោះ**: ឯកសារ = camelCase/kebab-case, component = PascalCase, constant = UPPER_SNAKE

### ការដោះស្រាយកំហុស / ប្លុក catch ទទេ

កុំទុក `catch` ដោយគ្មានការពន្យល់។ ចាត់ថ្នាក់វាទៅក្នុងក្រុមមួយក្នុងចំណោមពីរ (ដើម្បីអនុវត្ត
ច្បាប់តឹងរ៉ឹង «មិនត្រូវលេបកំហុសដោយស្ងៀមស្ងាត់នៅក្នុង SSE stream ឡើយ»)៖

- **ដោយចេតនា (ការសម្អាត/telemetry បែបប្រឹងប្រែងឱ្យអស់ពីលទ្ធភាពរបស់យើងផ្ទាល់)** — ការបរាជ័យនៅទីនេះត្រូវបានរំពឹងទុក និង
  មិនបង្កគ្រោះថ្នាក់ឡើយ; បន្ថែម comment មួយបន្ទាត់ដែលពន្យល់ពីហេតុផល ដោយមិនចាំបាច់ logging (ការធ្វើ logging រាល់ request គឺជា
  ទិន្នន័យរំខានដែលអនុសញ្ញានេះចង់ជៀសវាង)។

  ```ts
  } catch {} // ការបិទ controller ដែលបានបិទរួចហើយ បន្ទាប់ពី client ផ្ដាច់ការតភ្ជាប់ គឺជាអ្វីដែលបានរំពឹងទុក
  ```

- **គួរធ្វើ log (កូដខាងក្រៅ/កូដដែល caller ផ្ដល់ឱ្យ ឬការលេបកំហុសធ្វើឱ្យលំហូរនៃការគ្រប់គ្រងផ្លាស់ប្ដូរ)** — រក្សា
  catch ទុក (កុំឱ្យវាបង្អាក់ stream) ប៉ុន្តែបញ្ចេញ `console.debug`/`warn` ដែលមានបរិបទ ដើម្បីឱ្យ
  អាចស្វែងរកការបរាជ័យបាន។

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

សូមមើល `open-sse/utils/stream.ts` និង `open-sse/utils/streamHandler.ts` សម្រាប់ឧទាហរណ៍ដែលបានអនុវត្ត។

---

## រចនាសម្ព័ន្ធគម្រោង

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

## ការបន្ថែមអ្នកផ្តល់សេវាថ្មី

### ជំហានទី 1៖ ចុះឈ្មោះថេររបស់អ្នកផ្តល់សេវា

បន្ថែមទៅក្នុង `src/shared/constants/providers.ts` — ត្រូវបានផ្ទៀងផ្ទាត់ដោយ Zod នៅពេលផ្ទុកម៉ូឌុល។

### ជំហានទី 2៖ បន្ថែម Executor (ប្រសិនបើត្រូវការឡូជីខលផ្ទាល់ខ្លួន)

បង្កើត executor នៅក្នុង `open-sse/executors/your-provider.ts` ដោយពង្រីកពី executor មូលដ្ឋាន។

### ជំហានទី 3៖ បន្ថែម Translator (ប្រសិនបើមិនមែនជាទម្រង់ OpenAI)

បង្កើត translator សម្រាប់ request/response នៅក្នុង `open-sse/translator/`។

### ជំហានទី 4៖ បន្ថែមការកំណត់រចនាសម្ព័ន្ធ OAuth (ប្រសិនបើផ្អែកលើ OAuth)

បន្ថែមព័ត៌មានសម្ងាត់ OAuth នៅក្នុង `src/lib/oauth/constants/oauth.ts` និងសេវាកម្មនៅក្នុង `src/lib/oauth/services/`។

ប្រសិនបើអ្នកផ្តល់សេវាខាងដើមចែកចាយ OAuth client_id/secret សាធារណៈ ឬ Firebase Web API key នៅក្នុង CLI / browser bundle សាធារណៈរបស់ខ្លួន **កុំ** បង្កប់វាជា string literal។ ប្រើ `resolvePublicCred()` ពី `open-sse/utils/publicCreds.ts` ហើយបន្ថែមធាតុ byte ដែលបានបិទបាំងទៅក្នុង `EMBEDDED_DEFAULTS`។ លំហូរការងារចាំបាច់ពេញលេញត្រូវបានចងក្រងជាឯកសារនៅក្នុង [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)។

នៅខាងក្នុង handlers/executors សារកំហុសដែលទៅដល់ម៉ាស៊ីនភ្ញៀវត្រូវតែឆ្លងកាត់ `buildErrorBody()` / `sanitizeErrorMessage()` ពី `open-sse/utils/error.ts` — កុំដាក់ `err.stack` ឬ `err.message` ដើមនៅក្នុង Response body។ សូមមើល [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)។

### ជំហានទី 5៖ ចុះឈ្មោះម៉ូដែល

បន្ថែមនិយមន័យម៉ូដែលនៅក្នុង `open-sse/config/providerRegistry.ts`។

### ជំហានទី 6៖ បន្ថែមតេស្ត

សរសេរ unit tests នៅក្នុង `tests/unit/` ដែលយ៉ាងហោចណាស់គ្របដណ្តប់លើ៖

- ការចុះឈ្មោះអ្នកផ្តល់សេវា
- ការបម្លែង request/response
- ការដោះស្រាយកំហុស

---

## បញ្ជីត្រួតពិនិត្យ Pull Request

- [ ] ការធ្វើតេស្តជោគជ័យ (`npm test`)
- [ ] ការត្រួតពិនិត្យ Lint ជោគជ័យ (`npm run lint`)
- [ ] ការ Build ជោគជ័យ (`npm run build`)
- [ ] បានបន្ថែម TypeScript types សម្រាប់ public functions និង interfaces ថ្មី
- [ ] មិនមាន secrets ឬ fallback values ដែលសរសេរបង្កប់ដោយផ្ទាល់
- [ ] បានបង្កប់ public upstream credentials តាមរយៈ `resolvePublicCred()` (សូមមើល [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)) ដោយមិនប្រើ literals ជាដាច់ខាត
- [ ] Error responses ត្រូវបានបញ្ជូនតាមរយៈ `buildErrorBody()` / `sanitizeErrorMessage()` — មិនមាន raw stack traces នៅក្នុង response bodies ទេ (សូមមើល [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell commands (`exec` / `spawn`) បញ្ជូន runtime values តាមរយៈ `env` មិនមែនតាមរយៈ string interpolation ទេ
- [ ] inputs ទាំងអស់ត្រូវបានផ្ទៀងផ្ទាត់ដោយប្រើ Zod schemas
- [ ] បានបន្ថែម **fragment** នៃ Changelog នៅក្រោម `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` សម្រាប់ការផ្លាស់ប្តូរដែលប៉ះពាល់ដល់អ្នកប្រើប្រាស់ (សូមមើល [`changelog.d/README.md`](./changelog.d/README.md)) — **កុំ**កែសម្រួល `CHANGELOG.md` ដោយផ្ទាល់; fragments ត្រូវបានបូកបញ្ចូលគ្នានៅពេលចេញផ្សាយ ហើយមិនបង្កឱ្យមាន conflicts រវាង PRs ទេ
- [ ] បានធ្វើបច្ចុប្បន្នភាពឯកសារ (ប្រសិនបើអាចអនុវត្តបាន)
- [ ] មិនបានបង្កើត CodeQL / Secret-Scanning alerts ថ្មី ឬ alert នីមួយៗត្រូវបានបដិសេធដោយមានហេតុផលបច្ចេកទេសយោងទៅឯកសារ `docs/security/` ដែលពាក់ព័ន្ធ
- [ ] Routes ដែលបង្កើត child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) ត្រូវបានចាត់ថ្នាក់ជា `isLocalOnlyPath()` នៅក្នុង `src/server/authz/routeGuard.ts` — សូមមើល [ច្បាប់តឹងរ៉ឹង #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] មិនមាន AI/bot `Co-authored-by` trailers នៅក្នុង commit messages ទេ (ច្បាប់តឹងរ៉ឹង #16) — human collaborators ដែលស្នាដៃរបស់ពួកគេត្រូវបានប្រើឡើងវិញ ត្រូវបានផ្តល់កិត្តិយសដោយប្រើ trailers ស្តង់ដារ `Co-authored-by: Name <email>`

---

## ការចេញផ្សាយ

ការចេញផ្សាយត្រូវបានគ្រប់គ្រងតាមរយៈ workflow `/generate-release`។ នៅពេល GitHub Release ថ្មីត្រូវបានបង្កើត package នឹងត្រូវបាន **បោះពុម្ពផ្សាយទៅ npm ដោយស្វ័យប្រវត្តិ** តាមរយៈ GitHub Actions។

សម្រាប់ការដាក់ឱ្យដំណើរការលើ VPS សូមប្រើ `npm run build:release` (មិនមែន `npm run build` ទេ) — វាធ្វើការស្ថាបនាឡើងវិញពីសូន្យ រៀបចំ bundle ទៅក្នុង `dist/` និងសរសេរ sentinel `dist/BUILD_SHA`។
បន្ទាប់មក ប្រើ skills `/deploy-vps-*-cc` ដែលប្រើ rsync ដើម្បីធ្វើសមកាលកម្ម `dist/` ទៅកាន់ថត `app/` នៅលើម៉ាស៊ីនពីចម្ងាយ។

---

## ការទទួលជំនួយ

- **ស្ថាបត្យកម្ម**៖ សូមមើល [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **ឯកសារយោង API**៖ សូមមើល [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **ឯកសារសុវត្ថិភាព**៖ [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ឯកសារប្រតិបត្តិការ**៖ [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **បញ្ហា**៖ [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
