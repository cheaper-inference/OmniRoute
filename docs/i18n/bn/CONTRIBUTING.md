# Contributing to OmniRoute (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## উন্নয়ন সেটআপ

### পূর্বশর্ত

- **Node.js** `>=22.22.2 <23`, বা `>=24.0.0 <27` (প্রস্তাবিত: 24 LTS)
- **npm** 10 +

> **নোড 24 সহ Windows :** বর্তমান 24 LTS প্যাচ রিলিজ ব্যবহার করুন (অন্তত 24.20.0)। `--test-force-exit` প্রক্রিয়াটি বন্ধ করে দিলে পূর্ববর্তী রিলিজগুলি সফল পরীক্ষার পরে বাতিল হতে পারে। নোডের [Windows libuv ফিক্স](https://github.com/nodejs/node/pull/61999) অ্যাড্রেস এই রানটাইম ক্র্যাশ; পরীক্ষার দাবি এবং রানার প্রস্থান চেক সক্রিয় রাখুন।

> **npm v11 + ব্যবহারকারী (নোড 24 +):** `npm install` পরে, যাচাই করুন নেটিভ মডিউল ইনস্টল করা হয়েছে: `node -e "require('better-sqlite3')"`। যদি এটি `MODULE_NOT_FOUND` এর সাথে ব্যর্থ হয়, `npm approve-scripts better-sqlite3 && npm install` চালান। [সমস্যা সমাধান](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module) দেখুন।

- **গিট**

### ক্লোন এবং ইনস্টল করুন

```bash
git clone https://github.com/cheaper-inference/OmniRoute.git
cd OmniRoute
npm install
```

### এনভায়রনমেন্ট ভেরিয়েবল

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

উন্নয়নের জন্য মূল পরিবর্তনশীল:

| পরিবর্তনশীল            | ডেভেলপমেন্ট ডিফল্ট       | বর্ণনা                    |
| ---------------------- | ------------------------ | ------------------------- |
| `PORT`                 | `20128`                  | সার্ভার পোর্ট             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ফ্রন্টএন্ডের জন্য বেস URL |
| `JWT_SECRET`           | (উপরে তৈরি করুন)         | JWT স্বাক্ষর গোপন         |
| `INITIAL_PASSWORD`     | `CHANGEME`               | প্রথম লগইন পাসওয়ার্ড     |
| `APP_LOG_LEVEL`        | `info`                   | verbosity স্তর লগ         |

### ড্যাশবোর্ড সেটিংস

ড্যাশবোর্ড এমন বৈশিষ্ট্যগুলির জন্য UI টগল প্রদান করে যা পরিবেশ ভেরিয়েবলের মাধ্যমেও কনফিগার করা যেতে পারে:

| অবস্থান নির্ধারণ | টগল করুন           | বর্ণনা                            |
| ---------------- | ------------------ | --------------------------------- |
| সেটিংস → উন্নত   | ডিবাগ মোড          | ডিবাগ অনুরোধ লগ সক্রিয় করুন (UI) |
| সেটিংস → সাধারণ  | সাইডবার দৃশ্যমানতা | Show/hide সাইডবার বিভাগ           |

এই সেটিংস ডাটাবেসে সংরক্ষিত থাকে এবং পুনরায় আরম্ভ করার সময় টিকে থাকে, সেট করার সময় env var ডিফল্ট ওভাররাইড করে।

### স্থানীয়ভাবে চলছে

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

অবদানকারী বিল্ড শুধুমাত্র-সংকলন বৈধতা সম্পাদন করে: এটি স্বতন্ত্র বিতরণকে একত্রিত করে না বা ঐচ্ছিক নেটিভ প্যাকেজিং সম্পদ তৈরি করে না। যখন আপনাকে শিপযোগ্য বান্ডেলটি যাচাই করতে হবে তখন নিয়মিত উত্পাদন বিল্ড ব্যবহার করুন।

### আউটপুট লেআউট তৈরি করুন

| ডিরেক্টরি | বিষয়বস্তু                                                          | ট্র্যাক করা হয়েছে |
| --------- | ------------------------------------------------------------------- | ------------------ |
| `src/`    | আবেদনের উৎস (TypeScript / TSX)                                      | হ্যাঁ              |
| `.build/` | মধ্যবর্তী — `next build` আউটপুট (gitigned, `distDir = .build/next`) | না                 |
| `dist/`   | শিপযোগ্য বান্ডিল — `assembleStandalone` দ্বারা একত্রিত (gitigned)   | না                 |

বিল্ড পাইপলাইন একটি একক পাস:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (copies standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` অতিরিক্তভাবে উভয় ডিরেক্টরিই প্রথমে পরিষ্কার করে এবং `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) কে একটি অখণ্ডতা সেন্টিনেল স্থাপন করে।

`npm run build:contributor` ব্যাকএন্ড-শুধু বিল্ড প্রোফাইল ব্যবহার করে। এটি নির্মাণের সময় অস্থায়ীভাবে ড্যাশবোর্ড UI ফাইলগুলিকে স্টাব করে, API রুট হ্যান্ডলারদের রাখে এবং নির্মাণের পরে মূল ফাইলগুলি পুনরুদ্ধার করে। ড্যাশবোর্ড UI প্রভাবিত করে এমন পরিবর্তনের জন্য বা সম্পূর্ণ রিলিজ বৈধতার জন্য `npm run build` ব্যবহার করুন; অবদানকারী প্রোফাইলটি রিলিজ বিল্ডের প্রতিস্থাপন নয়।

> **VPS স্থাপন নোট:** রিমোট ইমেজ ডিরেক্টরি `/usr/lib/node_modules/omniroute/app/` অপরিবর্তিত। ডিপ্লোয় দক্ষতা এটিতে `dist/` এর বিষয়বস্তু rsync করে। শুধুমাত্র ইন-রেপো বিল্ড আউটপুট পাথ সরানো হয়েছে (`app/` → `dist/`)।

ডিফল্ট URLs:

- **ড্যাশবোর্ড** : `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git কর্মপ্রবাহ

> ⚠️ **কখনোই সরাসরি `main`-এ commit করবেন না।** সবসময় feature branch ব্যবহার করুন।
>
> **PR base:** সক্রিয় `release/vX.Y.Z` branch-কে target করুন (`main`-কে নয়)। প্রতি-branch-এ-release + ship-এর-সময়-tag মডেল সম্পর্কে জানতে
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) দেখুন।

```bash
# সক্রিয় release tip থেকে branch তৈরি করুন (উদাহরণ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... পরিবর্তন করুন ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 দিয়ে একটি Pull Request খুলুন
```

### Branch-এর নামকরণ

| Prefix      | উদ্দেশ্য                |
| ----------- | ----------------------- |
| `feat/`     | নতুন feature            |
| `fix/`      | bug fix                 |
| `refactor/` | code পুনর্গঠন           |
| `docs/`     | documentation পরিবর্তন  |
| `test/`     | test সংযোজন/fix         |
| `chore/`    | tooling, CI, dependency |

### Commit message

[Conventional Commits](https://www.conventionalcommits.org/) অনুসরণ করুন:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scope (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## পরীক্ষা চালানো

```bash
# সব পরীক্ষা (unit + vitest + ecosystem + e2e)
npm run test:all

# একটি পরীক্ষা ফাইল (Node.js নেটিভ টেস্ট রানার — অধিকাংশ পরীক্ষায় এটি ব্যবহৃত হয়)
node --import tsx/esm --test tests/unit/your-file.test.ts

# শুধু আপনার পরিবর্তনে প্রভাবিত unit পরীক্ষাগুলো (CI গেটের একই TIA selector, #8084)
npm run test:scoped            # শেষ commit-এর পরিবর্তনগুলো (অথবা working tree)
npm run test:scoped:staged     # শুধু staged পরিবর্তন — pre-commit চালানোর সঙ্গে ভালোভাবে কাজ করে
npm run test:scoped:full       # প্রথমে import-graph map পুনর্নির্মাণ করে (ফাইল যোগ/স্থানান্তরের পর)
# Exit 1 + "সম্পূর্ণ suite চালান" মানে একটি hub ফাইল (tsconfig, package.json, …) অথবা কোনো
# unmapped source পরিবর্তিত হয়েছে — selector নিরাপদভাবে ব্যর্থ হয়, কখনো নীরবে এড়িয়ে যায় না।

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E পরীক্ষা (Playwright প্রয়োজন)
npm run test:e2e

# Protocol client E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility পরীক্ষা
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches-এর 60%
npm run test:coverage
npm run coverage:report

# Lint + format পরীক্ষা
npm run lint
npm run check

# গেটযুক্ত বাস্তব upstream combo smoke পরীক্ষা (VPS access + বাস্তব provider credits প্রয়োজন)
# বাস্তব provider-এ অনুরোধ পাঠায় — সামান্য খরচ হয়। CI-তে কখনো চলে না। গেট না থাকলে নির্বিঘ্নে এড়িয়ে যায়।
# প্রয়োজন: ssh root@192.168.0.15 access (VPS থেকে একটি read-only DB snapshot source করে)।
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — সাধারণ Node ESM script, সরাসরি live .15 server-এ অনুরোধ পাঠায়।
# প্রয়োজন: ssh root@192.168.0.15 access (SSH sqlite-এর মাধ্যমে combo তৈরি/মুছে ফেলা হয়)।
# বাস্তব provider-এ অনুরোধ পাঠায় (সামান্য খরচ)। শুধু __live_test__* combo তৈরি/মুছে ফেলে। CI-তে কখনো চলে না।
# .15-এ REQUIRE_API_KEY=false, তাই API key প্রয়োজন নেই; তবে সেট করা থাকলে COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY মেনে চলে।
npm run test:combo:live:vps              # 7টি HTTP scenario (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # একটি বাস্তব cross-provider failover scenario যোগ করে (মোট 8টি)
```

Coverage সংক্রান্ত নোট:

- `npm run test:coverage` প্রধান unit test suite-এর source coverage পরিমাপ করে, `tests/**` বাদ দেয় এবং `open-sse/**` অন্তর্ভুক্ত করে
- Pull request-গুলোতে statements/lines/functions/branches-এর coverage gate **60%+** রাখতে হবে
- কোনো PR যদি `src/`, `open-sse/`, `electron/`, অথবা `bin/`-এর production code পরিবর্তন করে, তবে একই PR-এ automated test যোগ বা update করতে হবে
- `npm run coverage:report` সর্বশেষ coverage run থেকে বিস্তারিত file-by-file report দেখায়
- `npm run test:coverage:legacy` ঐতিহাসিক তুলনার জন্য পুরোনো metric সংরক্ষণ করে
- পর্যায়ক্রমিক coverage উন্নয়নের roadmap-এর জন্য `docs/ops/COVERAGE_PLAN.md` দেখুন

### Pull Request-এর প্রয়োজনীয়তা

PR খোলার আগে, আপনার পরিবর্তনের জন্য focused loop চালাতে
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ব্যবহার করুন। সম্পূর্ণ unit suite (4টি CI shard), Vitest, **60%+** coverage gate এবং
production build-এর দায়িত্ব CI-এর — এগুলো স্থানীয়ভাবে চালালে PR
check-গুলো ইতিমধ্যেই যে signal দেবে তার বাইরে অতিরিক্ত কোনো signal পাওয়া যায় না, এবং ছোট machine-এ এটি host-কে অতিরিক্ত চাপে ফেলতে পারে (#8084):

- আপনার পরিবর্তন cover করে এমন test file-গুলো চালান: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` চালান
- production code পরিবর্তিত হলে একই PR-এ automated test অন্তর্ভুক্ত বা update করুন
- `node:test` file-এ প্রতিটি top-level `await` (যেমন `await import(...)`) প্রথম `test()` / `describe()`-এর আগে রাখুন: `--test-force-exit`-এর অধীনে এর পরে register হওয়া test নীরবে কখনোই না চলতে পারে (#18045; `npm run check:test-tla-order` দ্বারা প্রয়োগ করা হয়)
- production code পরিবর্তিত হলে PR description-এ পরিবর্তিত বা যোগ করা test file-গুলো অন্তর্ভুক্ত করুন
- CI-তে project secret configure করা থাকলে PR-এর SonarQube result পরীক্ষা করুন

বর্তমান পরীক্ষার অবস্থা: **122টি unit test file**, যেগুলো cover করে:

- Provider translator এবং format conversion
- Rate limiting, circuit breaker এবং resilience
- Semantic cache, idempotency, progress tracking
- Database operation এবং schema (21টি DB module)
- OAuth flow এবং authentication
- API endpoint validation (Zod v4)
- MCP server tool এবং scope enforcement
- Memory এবং Skills system

---

## কোডের স্টাইল

- **ESLint** — কমিট করার আগে `npm run lint` চালান
- **Prettier** — কমিটের সময় `lint-staged`-এর মাধ্যমে স্বয়ংক্রিয়ভাবে ফরম্যাট করা হয় (2টি স্পেস, সেমিকোলন, ডাবল কোট, 100 অক্ষরের প্রস্থ, es5 ট্রেইলিং কমা)
- **TypeScript** — `src/`-এর সব কোডে `.ts`/`.tsx` ব্যবহৃত হয়; `open-sse/`-তে `.ts`/`.js` ব্যবহৃত হয়; TSDoc (`@param`, `@returns`, `@throws`) দিয়ে ডকুমেন্ট করুন
- **কোনো `eval()` নয়** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` প্রয়োগ করে
- **Zod ভ্যালিডেশন** — সব API ইনপুট ভ্যালিডেশনের জন্য Zod v4 স্কিমা ব্যবহার করুন
- **নামকরণ**: ফাইল = camelCase/kebab-case, কম্পোনেন্ট = PascalCase, কনস্ট্যান্ট = UPPER_SNAKE

### ত্রুটি পরিচালনা / খালি catch ব্লক

কোনো `catch` কখনো ব্যাখ্যাহীন রাখবেন না। এটিকে নিচের দুটি বিভাগের একটিতে শ্রেণিবদ্ধ করুন (এটি
"SSE স্ট্রিমে কখনোই নীরবে ত্রুটি উপেক্ষা করবেন না"—এই কঠোর নিয়মটিকে কার্যকর করে):

- **ইচ্ছাকৃত (আমাদের নিজস্ব সর্বোচ্চ-চেষ্টার ক্লিনআপ/টেলিমেট্রি)** — এখানে ব্যর্থতা প্রত্যাশিত এবং
  ক্ষতিহীন; এক লাইনের যৌক্তিকতার মন্তব্য যোগ করুন, কোনো লগিং নয় (প্রতিটি রিকোয়েস্টে লগিংয়ের
  ফলে যে অপ্রয়োজনীয় কোলাহল হয়, এই রীতি তা এড়ায়)।

  ```ts
  } catch {} // ক্লায়েন্ট সংযোগ বিচ্ছিন্ন করার পর ইতোমধ্যে বন্ধ হয়ে যাওয়া কন্ট্রোলার বন্ধ করার চেষ্টা প্রত্যাশিত
  ```

- **লগ করা উচিত (বাহ্যিক/কলার-সরবরাহকৃত কোড, অথবা উপেক্ষা করলে কন্ট্রোল ফ্লো পরিবর্তিত হয়)** — `catch`
  রাখুন (এটিকে কখনোই স্ট্রিম ভাঙতে দেবেন না), তবে প্রাসঙ্গিক `console.debug`/`warn` নির্গত করুন, যাতে
  ব্যর্থতাটি শনাক্ত করা যায়।

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure কলব্যাকে ত্রুটি:", e);
  }
  ```

প্রয়োগ করা উদাহরণের জন্য `open-sse/utils/stream.ts` এবং `open-sse/utils/streamHandler.ts` দেখুন।

---

## প্রকল্পের কাঠামো

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

## নতুন প্রোভাইডার যোগ করা

### ধাপ 1: প্রোভাইডার কনস্ট্যান্ট নিবন্ধন করুন

`src/shared/constants/providers.ts`-এ যোগ করুন — মডিউল লোডের সময় Zod দ্বারা যাচাই করা হয়।

### ধাপ 2: এক্সিকিউটর যোগ করুন (কাস্টম লজিক প্রয়োজন হলে)

বেস এক্সিকিউটরকে এক্সটেন্ড করে `open-sse/executors/your-provider.ts`-এ এক্সিকিউটর তৈরি করুন।

### ধাপ 3: ট্রান্সলেটর যোগ করুন (ফরম্যাট OpenAI-এর না হলে)

`open-sse/translator/`-এ রিকোয়েস্ট/রেসপন্স ট্রান্সলেটর তৈরি করুন।

### ধাপ 4: OAuth কনফিগ যোগ করুন (OAuth-ভিত্তিক হলে)

`src/lib/oauth/constants/oauth.ts`-এ OAuth ক্রেডেনশিয়াল এবং `src/lib/oauth/services/`-এ সার্ভিস যোগ করুন।

যদি আপস্ট্রিম প্রোভাইডার তার পাবলিক CLI / ব্রাউজার বান্ডলের মধ্যে কোনো পাবলিক OAuth client_id/secret বা Firebase Web API কী বিতরণ করে, তাহলে সেটি স্ট্রিং লিটারেল হিসেবে **এম্বেড করবেন না**। `open-sse/utils/publicCreds.ts` থেকে `resolvePublicCred()` ব্যবহার করুন এবং `EMBEDDED_DEFAULTS`-এ একটি মাস্ক করা বাইট এন্ট্রি যোগ করুন। সম্পূর্ণ বাধ্যতামূলক কার্যপ্রবাহটি [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)-এ নথিভুক্ত রয়েছে।

হ্যান্ডলার/এক্সিকিউটরের মধ্যে ক্লায়েন্টের কাছে পৌঁছানো ত্রুটির বার্তাগুলো অবশ্যই `open-sse/utils/error.ts` থেকে `buildErrorBody()` / `sanitizeErrorMessage()`-এর মাধ্যমে পাঠাতে হবে — কোনো Response বডিতে কখনোই কাঁচা `err.stack` বা `err.message` রাখবেন না। [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) দেখুন।

### ধাপ 5: মডেল নিবন্ধন করুন

`open-sse/config/providerRegistry.ts`-এ মডেলের সংজ্ঞা যোগ করুন।

### ধাপ 6: টেস্ট যোগ করুন

`tests/unit/`-এ অন্তত নিম্নলিখিত বিষয়গুলো কভার করে ইউনিট টেস্ট লিখুন:

- প্রোভাইডার নিবন্ধন
- রিকোয়েস্ট/রেসপন্স অনুবাদ
- ত্রুটি পরিচালনা

---

## পুল রিকোয়েস্ট চেকলিস্ট

- [ ] টেস্ট পাস করে (`npm test`)
- [ ] লিন্টিং পাস করে (`npm run lint`)
- [ ] বিল্ড সফল হয় (`npm run build`)
- [ ] নতুন পাবলিক ফাংশন ও ইন্টারফেসের জন্য TypeScript টাইপ যোগ করা হয়েছে
- [ ] কোনো হার্ডকোড করা সিক্রেট বা ফলব্যাক মান নেই
- [ ] পাবলিক আপস্ট্রিম ক্রেডেনশিয়াল `resolvePublicCred()`-এর মাধ্যমে এম্বেড করা হয়েছে ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) দেখুন), কখনোই লিটারেল হিসেবে নয়
- [ ] ত্রুটির রেসপন্স `buildErrorBody()` / `sanitizeErrorMessage()`-এর মাধ্যমে রাউট করা হয় — রেসপন্স বডিতে কোনো অপরিশোধিত স্ট্যাক ট্রেস নেই ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) দেখুন)
- [ ] শেল কমান্ড (`exec` / `spawn`) রানটাইম মান স্ট্রিং ইন্টারপোলেশনের মাধ্যমে নয়, `env`-এর মাধ্যমে পাস করে
- [ ] সব ইনপুট Zod স্কিমা দিয়ে যাচাই করা হয়েছে
- [ ] ব্যবহারকারীর দৃশ্যমান পরিবর্তনের জন্য `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md`-এর অধীনে চেঞ্জলগ **ফ্র্যাগমেন্ট** যোগ করা হয়েছে ([`changelog.d/README.md`](./changelog.d/README.md) দেখুন) — `CHANGELOG.md` সরাসরি সম্পাদনা করবেন **না**; রিলিজের সময় ফ্র্যাগমেন্টগুলো একত্রিত করা হয় এবং PR-গুলোর মধ্যে কখনো দ্বন্দ্ব সৃষ্টি করে না
- [ ] ডকুমেন্টেশন হালনাগাদ করা হয়েছে (প্রযোজ্য হলে)
- [ ] কোনো নতুন CodeQL / Secret-Scanning সতর্কতা খোলা হয়নি, অথবা প্রতিটি সতর্কতা প্রাসঙ্গিক `docs/security/` ডকুমেন্ট উল্লেখ করে কারিগরি যৌক্তিকতাসহ খারিজ করা হয়েছে
- [ ] চাইল্ড প্রসেস চালু করা রাউটগুলো (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts`-এ `isLocalOnlyPath()` হিসেবে শ্রেণিবদ্ধ করা হয়েছে — [কঠোর নিয়ম #15](docs/security/ROUTE_GUARD_TIERS.md) দেখুন
- [ ] কমিট মেসেজে AI/বটের `Co-authored-by` ট্রেলার নেই (কঠোর নিয়ম #16) — যেসব মানব সহযোগীর কাজ পুনর্ব্যবহার করা হয়েছে, তাঁদের স্ট্যান্ডার্ড `Co-authored-by: Name <email>` ট্রেলার দিয়ে কৃতিত্ব দেওয়া হয়েছে

---

## রিলিজ করা

রিলিজগুলো `/generate-release` ওয়ার্কফ্লোর মাধ্যমে পরিচালিত হয়। একটি নতুন GitHub Release তৈরি করা হলে, GitHub Actions-এর মাধ্যমে প্যাকেজটি **স্বয়ংক্রিয়ভাবে npm-এ প্রকাশিত হয়**।

VPS ডিপ্লয়ের জন্য `npm run build:release` ব্যবহার করুন (`npm run build` নয়)—এটি সম্পূর্ণ নতুন করে
বিল্ড করে, বান্ডেলটি `dist/`-এ সংযোজন করে এবং `dist/BUILD_SHA` সেন্টিনেলটি লেখে।
এরপর `/deploy-vps-*-cc` স্কিলগুলো ব্যবহার করুন, যেগুলো rsync-এর মাধ্যমে `dist/`-কে রিমোট `app/` ডিরেক্টরিতে স্থানান্তর করে।

---

## সাহায্য পাচ্ছি

- **স্থাপত্য** : [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) দেখুন
- **API রেফারেন্স** : [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) দেখুন
- **নিরাপত্তা নথি** : [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **অপস ডক্স** : [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ইস্যু** : [github.com/cheaper-inference/OmniRoute/issues](https://github.com/cheaper-inference/OmniRoute/issues)
