# Quality Gates Reference (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

এই নথিটি OmniRoute-এর সব CI গুণমান গেটের প্রামাণ্য রেফারেন্স।
এতে প্রতিটি গেট, সেটি কী যাচাই করে, কোন CI জবে চলে, এটি র্যাচেট বেসলাইন নাকি
পাস/ফেল নীতি ব্যবহার করে এবং এটি বিল্ড ব্লক করে নাকি কেবল পরামর্শমূলক—এসব বর্ণনা করা হয়েছে।

সংক্ষিপ্ত সারাংশ এবং অনুমোদন-তালিকা নীতির জন্য `AGENTS.md`-এর "Quality Gates & Ratchets"
বিভাগটি দেখুন। একই সিস্টেমের সমালোচনামূলক মূল্যায়ন, পরিপক্বতার শ্রেণিবিন্যাস এবং
টুল-স্বাধীন পুনরাবৃত্তি পরিকল্পনার জন্য
[গুণমান গেট প্লেবুক](../ops/QUALITY_GATE_PLAYBOOK.md) দেখুন।

---

## গেট ইনভেন্টরি এবং এক্সিকিউশন প্রোফাইল

### প্রার্থী গ্রহণ

CI এবং Quality Gates ওয়ার্কফ্লো প্রতিটি একটি স্থিতিশীল verdict নির্গত করে: `Gate / CI` এবং
`Gate / Quality`। তাদের versioned admission policy প্রতিটি upstream job-কে required অথবা advisory
হিসেবে তালিকাভুক্ত করে। প্রযোজ্য required job সফল হতে হবে: অনুপস্থিত, বাতিল, এড়িয়ে যাওয়া, pending
এবং অজানা ফলাফল PASS প্রতিষ্ঠা করতে পারে না। বৈধ docs-only অথবা catalog-only classification একটি
code lane-কে অপ্রযোজ্য করতে পারে; draft PR গ্রহণযোগ্য candidate নয়। `hotfix` label evidence মওকুফ করে না।

উভয় workflow-ই main/release branch-এ PR, `main`-এ push, manual dispatch এবং merge-group event কভার করে। Push, dispatch
এবং merge-group সম্পূর্ণ selection চালায়। `release/**`-এ push এগুলো শুরু করে না (2026-10-18): প্রতিটি change ইতিমধ্যে তার PR-এ matrix চালিয়েছে
এবং merged combination হলো Release-Green-এর কাজ (`docs/ops/RUNNER_BOX.md` → Hosted lane)। Fork এবং merge group এমন job-এর জন্য hosted runner ব্যবহার করে
যেগুলো অন্যথায় self-hosted
runner নির্বাচন করত; rollout-এর আগে পর্যাপ্ত hosted capacity যাচাই করতে হবে।

প্রতিটি JSON receipt-এ checked-out SHA, workflow run এবং attempt শনাক্ত করা হয়।
CLI checkout/event SHA mismatch প্রত্যাখ্যান করে। Workflow tests verdict job-এর `needs` list-এ policy membership-এর সঙ্গে binding করে, যাতে
নতুন বা অপসারিত lane নীরবে অদৃশ্য হয়ে যেতে না পারে। Receipt-গুলো তাদের নিজস্ব workflow কভার করে, publication, deployment অথবা
বিদ্যমান advisory scanner-এর অভ্যন্তরীণ কার্যক্রম নয়। Branch rules-এ উভয় check name সক্রিয় করা একটি পৃথক administrative change;
এই job-গুলো যোগ করলেই কোনো branch সুরক্ষিত হয় না।

### Static scan inventory

Versioned npm-alias inventory এবং static-scan membership
`config/quality/gate-manifest.json`-এ থাকে। `package.json`-এর বিরুদ্ধে
script name এবং exact command যাচাই করতে `npm run check:gate-manifest` চালান; additions, removals এবং
command drift স্থানীয় hook এবং CI-এর change-classification job—উভয়কেই ব্যর্থ করে।
একটি alias workflow job, matrix instance অথবা test case নয়: এই count-গুলোকে interchangeable হিসেবে
উপস্থাপন করা যাবে না।

কোনো alias execute না করে নির্বাচিত alias পরিদর্শন করতে `npm run quality:scan -- --list` অথবা `npm run quality:scan:fast -- --list`
ব্যবহার করুন। Runner npm entrypoint আহ্বান করে, তাই এর runtime (configured থাকলে Bun-সহ) অক্ষুণ্ণ থাকে।
Manifest ওই profile-গুলোর বাইরের alias-গুলোকে separately invoked হিসেবে record করে এবং read-only scan profile-এ
maintenance command নিষিদ্ধ।

এই profile-গুলো কেবল static scan কভার করে। এগুলো product test, coverage, packaging, external check অথবা candidate-এর
পূর্ণ release acceptance certify করে না। Workflow admission linked `config/quality/admission-policy.json` এবং
`scripts/quality/admission-verdict.mjs` ব্যবহার করে। Release-observer profile আলাদা থাকে;
তাদের প্রযোজ্য check এবং receipt স্বাধীনভাবে পরিদর্শন করুন। নিচের prose
inventory একটি reference, কোনো gate আসলেই চলেছে—তার proof নয়।

Script `scripts/check/` (policy gate) এবং `scripts/quality/` (ratchet engine)-এর অধীনে থাকে।
CI-এর source of truth হলো `.github/workflows/ci.yml`।

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main`-এ push,
dispatch এবং merge group-এ CI-এর পরিপূরক হিসেবে কাজ করে। PR-এ path-filtered fast check ব্যবহার করা হয়।
স্থায়ীভাবে disabled duplicate build সরিয়ে ফেলা হয়েছে; প্রকৃত build/package/boot check CI-তে রয়ে গেছে।

| Job                                              | Scope                                                                                                                                                                                       | Blocking             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR; API docs refs এবং docs-all                                                                                                                                                    | Yes                  |
| `Fast Quality Gates`                             | Code PR; static check, typecheck, dashboard typecheck, impacted unit test                                                                                                                   | Yes                  |
| `Forgotten sibling tests`                        | Code PR; static consumer এবং candidate sibling test-এ trace করা changed module; barrel এবং dynamic-import path advisory diagnostic হিসেবে report করা হয়, referenced allowlist exception-সহ | **Advisory**         |
| `Vitest (fast-path)`                             | Code PR; fast vitest suite                                                                                                                                                                  | Yes                  |
| `Unit Tests fast-path`                           | Code PR; 4-shard unit suite                                                                                                                                                                 | Yes                  |
| `No new ESLint warnings`                         | Code PR; suppressions-aware lint guard                                                                                                                                                      | Yes, including forks |
| `Merge integrity (changelog + generated skills)` | Non-draft PR; changelog এবং generated skill sync                                                                                                                                            | Yes, including forks |

#### Forgotten sibling tests report

`npm run check:forgotten-sibling-tests` টেস্ট-ইমপ্যাক্ট ম্যাপের পেছনে থাকা ইমপোর্ট রিজলভারটি পুনরায় ব্যবহার করে।
পরিবর্তিত প্রতিটি প্রোডাকশন মডিউলের জন্য, প্রার্থী টেস্টটি pull-request diff-এ অনুপস্থিত হলে এটি
নির্ধারিত
`changed module/symbol -> static consumer -> candidate sibling test` চেইন রিপোর্ট করে। Markdown সারাংশ এবং JSON ফলাফল
ক্যালিব্রেশনের জন্য `forgotten-sibling-tests` ওয়ার্কফ্লো আর্টিফ্যাক্ট হিসেবে সংরক্ষিত থাকে,
যতক্ষণ না কোনো ব্লকিং রোলআউট করা হয়।

Barrel re-export এবং dynamic import কেবল রেজোলিউশন ডায়াগনস্টিক; এগুলো কখনোই
ব্লকিং ফাইন্ডিং তৈরি করে না। পর্যালোচিত ব্যতিক্রমগুলো থাকে
`config/quality/forgotten-sibling-allowlist.json`-এ। প্রতিটি এন্ট্রিতে অবশ্যই consumer এবং candidate
test-এর নাম, একটি নির্দিষ্ট কারণ, এবং একটি GitHub issue বা pull request-এর লিংক থাকতে হবে। ভুল ফরম্যাটের
এন্ট্রি নিরাপদভাবে ব্যর্থ হয়। ব্যতিক্রম কোনো মুছে ফেলা candidate test বা `.skip`/`.todo` যোগ করা diff
দমন করতে পারে না; assertion দুর্বল করা এবং অন্যান্য masking স্বাধীনভাবে ব্লকিং
`check:test-masking` গেটের অধীনে থাকে।

### Job: `lint`

`main`-এ প্রতিটি PR-এ চলে। ব্যর্থ হলে merge আটকে দেয়।

| Script (`npm run ...`)            | Validates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blocking                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js-এর সংস্করণ সমর্থিত পরিসরের মধ্যে আছে কিনা                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                       |
| `check:cycles`                    | `src/` + `open-sse/`-এর সবকটি জুড়ে সার্কুলার ইমপোর্ট (AST-ভিত্তিক, tsconfig `paths` সমাধান করা হয়েছে)। যেকোনো cycle থাকলেই Bare 1 দিয়ে প্রস্থান করে ( #15281-এর পর থেকে fail-closed) এবং SCC-গুলি তালিকাভুক্ত করে। `check:cycles:ratchet` (CI-তে যা চলে) `quality-baseline.json`-এর `metrics.cycles` ceiling ছাড়িয়ে গেলে ব্লক করে — বর্তমানে 14, `direction: down`, তাই এটি কেবল কমতে পারে (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | হ্যাঁ (ratchet)                             |
| `check:boundary`                  | `open-sse → src` coupling: engine থেকে app-এ unique file-to-file imports (`scripts/quality/measure-boundary.mjs`; edge তালিকাটি v4 core/module-split remediation backlog)। Bare = advisory report ( `quality:boundary`-এর মতোই)। `check:boundary:ratchet` (CI-তে যা চলে, `quality.yml` fast-gates ratchet loop-এও রয়েছে) `quality-baseline.json`-এর `metrics.boundaryOpenSseToSrc` ceiling ছাড়িয়ে গেলে ব্লক করে — মাপা 771-এ seeded, `direction: down`; `--update` কেবল এটি কমাতে পারে; PR-গুলিতে base-relative (`--base-ref`, নিচে দেখুন)                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ (ratchet)                             |
| `check:route-validation:t06`      | সব route-এ Zod schema উপস্থিত আছে কিনা (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` গণনা বাজেটের সীমা অতিক্রম করে না (Tier 11 ক্যাটরাকা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `check:provider-consistency`      | `providers.ts`-এর প্রতিটি provider-এর `providerRegistry.ts`-এ একটি মিলে যাওয়া এন্ট্রি আছে (এবং উল্টোটিও, allowlist-এর মধ্যে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                       |
| `check:model-lifecycle`           | হাতে রক্ষণাবেক্ষণ করা তিনটি routing table চেক-ইন করা lifecycle snapshot (#11503)-এর সঙ্গে সামঞ্জস্যপূর্ণ থাকে: `FITNESS_TABLE` (`taskFitness.ts`) এমন কোনো retired id-এর স্কোর দেয় না যেটি `REGISTRY` route করতে পারে; প্রতিটি `BUILT_IN_ALIASES` target `REGISTRY`-তে উপস্থিত এবং retired-id snapshot-এ অনুপস্থিত; `REGISTRY`-তে থাকা প্রতিটি retired id forward করা হয় অথবা `allowedRetiredInCatalog`-এ তালিকাভুক্ত থাকে; এবং কোনো `DEFAULT_DEGRADATION_MAP` source বা target ওই snapshot-এ retired হিসেবে উপস্থিত নয়। এটি প্রমাণ করে না যে কোনো model বর্তমানে কোনো সক্রিয় upstream দ্বারা পরিবেশিত হচ্ছে। অফলাইন — `config/quality/model-lifecycle.json`-এর সঙ্গে তুলনা করে, যা হাতে `npm run quality:refresh-model-lifecycle` (network; CI-তে সংযুক্ত নয়) দিয়ে refresh করা হয়। `allowedRetiredInCatalog` হলো একটি burn-down ratchet: tracking issue ছাড়া কোনো entry যোগ করবেন না।                                                                                                                     | হ্যাঁ                                       |
| `check:fetch-targets`             | client-side `src/`-এর প্রতিটি `fetch("/api/...")` একটি বাস্তব `route.ts`-এ resolve হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:deps`                      | repository-র প্রতিটি `package.json` জুড়ে `npm install`-যোগ্য সব dependency `dependency-allowlist.json`-এ আছে; নতুন unpinned বা slopsquatted package-কে flag করা হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                       |
| `audit:deps`                      | `npm audit` (root + electron) — কোনো high/critical advisory নেই (osv `check:vuln-ratchet`-এর সঙ্গে overlap করে; Rationalization Backlog দেখুন)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, integrity hashes, no host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ                                       |
| `check:licenses`                  | উৎপাদন নির্ভরতার জন্য SPDX লাইসেন্সের অনুমোদিত তালিকা                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | হ্যাঁ                                       |
| `check:tracked-artifacts`         | কোনো বিল্ড আর্টিফ্যাক্ট / কমিট করা `node_modules` সিমলিংক নেই (এটি husky pre-commit-এও চলে; pre-push ইচ্ছাকৃতভাবে হালকা — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | হ্যাঁ                                       |
| `check:ai-attribution`            | PR কমিট, শিরোনাম বা বডিতে কোনো AI/bot `Co-Authored-By` ট্রেলার বা AI-উৎপাদন ফুটার নেই — কঠোর নিয়ম #16 (`quality.yml`-এর fast-gates লুপে PR→`release/**`-এর জন্য — event payload পড়ে, PR-এর বাইরে no-op — এবং PR→`main`-এর জন্য `ci.yml` lint-এ একটি PR-only ধাপ; এছাড়াও husky `commit-msg` হুক; মানব সহ-লেখক অনুমোদিত; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | প্রতিটি Vitest exclusion-এ একটি tracking issue-এর নাম থাকতে হবে এবং তা `config/quality/vitest-exclusions.json`-এ উপস্থিত থাকতে হবে (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | হ্যাঁ                                       |
| `check:file-size`                 | সোর্স ফাইল (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap`-এর মধ্যে এবং টেস্ট ফাইল (`*.test.ts(x)`) `testCap`-এর মধ্যে থাকতে হবে; `file-size-baseline.json`-এ হিমায়িত (`frozen` / `testFrozen`) ফাইলগুলোর রেকর্ডকৃত আকারের চেয়ে বড় হওয়া চলবে না                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                       |
| `check:error-helper`              | executors/handlers-এর ত্রুটি প্রতিক্রিয়াগুলো `buildErrorBody()` / `sanitizeErrorMessage()` ব্যবহার করে (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `check:migration-numbering`       | Migration SQL ফাইলগুলো ক্রম অনুযায়ী নম্বরযুক্ত, কোনো ফাঁক বা ডুপ্লিকেট নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | হ্যাঁ                                       |
| `check:public-creds`              | `publicCreds.ts`-এর বাইরে কোনো লিটারেল OAuth `client_id`/`client_secret` বা Firebase Web কী নেই (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ                                       |
| `check:db-rules`                  | `src/lib/db/` মডিউলের বাইরে কোনো raw SQL নেই; `localDb.ts` থেকে কোনো barrel-import নেই (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | হ্যাঁ                                       |
| `check:known-symbols`             | তাদের dispatch table-এ নিবন্ধিত Provider executors, routing strategies এবং translators ডিস্কের ফাইলগুলোর সঙ্গে মিলে যায় — কোনো orphaned বা undeclared symbol নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                       |
| `check:route-guard-membership`    | child process চালু করা প্রতিটি route `isLocalOnlyPath()` দ্বারা শ্রেণিবদ্ধ করা হয়েছে (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                       |
| `check:test-discovery`            | রিপোর প্রতিটি `*.test.ts` / `*.spec.ts` ফাইল অন্তত একটি টেস্ট রানার দ্বারা সংগ্রহ করা হয় (র্যাচেট: `test-discovery-baseline.json`-এর অনাথ তালিকা কেবল ছোট হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                       |
| `check:test-tla-order`            | `tests/unit`-এর কোনো `node:test` ফাইল টেস্ট নিবন্ধন করে, টপ-লেভেল `await`-এ পৌঁছায়, তারপর আরও টেস্ট নিবন্ধন করে না (#18045; র্যাচেট: `test-tla-order-allowlist.json` কেবল ছোট হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                       |
| `check:agent-skills-sync`         | জেনারেট করা agent-skills আর্টিফ্যাক্টগুলো তাদের উৎস ক্যাটালগের সঙ্গে মেলে (কোনো বিচ্যুতি নেই)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | প্রোভাইডারের লোগো/অ্যাসেটগুলোর সঙ্গে নথিভুক্ত উৎস-পরিচিতির এন্ট্রি থাকে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON কনফিগারেশন ফাইলগুলো পার্স হয় এবং রিপোর লিন্ট নিয়ম পূরণ করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | কোনো ত্রুটি ছাড়াই TypeScript কম্পাইলেশন (শুধু পরামর্শমূলক সতর্কতা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ                                       |
| `typecheck:noimplicit:core`       | কঠোর `noImplicitAny` — ভবিষ্যৎমুখী; বহু পূর্ববর্তী call site-এ এখনও annotation প্রয়োজন                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **পরামর্শমূলক** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` কেবল `src/app/(dashboard)/**`-এর জন্য প্রযোজ্য (#7033) — `typecheck:core`-এর বাছাই করা ২৭-ফাইলের allowlist-এ কোনো dashboard TSX অন্তর্ভুক্ত নেই, এবং `next build`-ও কখনো এটি type-check করে না (`next.config.mjs`-এ `ignoreBuildErrors: true` সেট করা আছে), ফলে সেখানকার orphaned-identifier regression (#6625/#6909) CI-এর নজরের বাইরে ছিল। একটি স্থির per-file/per-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`-এর মতো একই stale-enforcement pattern)-এর সঙ্গে পার্থক্য নির্ণয় করে — baselined count-এর বাইরে কেবল NEW error-গুলোই gate ব্যর্থ করে; কোনো pre-existing error ঠিক হলে `--update` দিয়ে ratchet down করুন।                                                                                                                                                                                                                                                                                                                              | হ্যাঁ                                       |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`)-এর ওপর সম্পূর্ণ-app production type check; surface `typecheck:core`-এর ২৭-ফাইলের allowlist এবং dashboard gate যেসব অংশ কভার করে না, সেগুলোও এতে অন্তর্ভুক্ত। `config/quality/build-typecheck-baseline.json`-এর সঙ্গে পার্থক্য নির্ণয় করে; per-(file, code) count নতুন হলে বা বাড়লে ব্যর্থ হয়, কমলে আপনাকে ratchet করতে বলে। রান চলাকালে নতুন বা বাড়ানো কোনো pair থাকলে `--update` প্রত্যাখ্যাত হয়, যদি না `--force-regressions` পাস করা হয়; এবং নতুন করে নীরব করা কোনো file থাকলে `--force-nocheck` পাস না করা পর্যন্ত প্রত্যাখ্যাত হয়—অতএব green পাওয়ার জন্য baseline বিস্তৃত করা এবং স্থায়ী silence মঞ্জুর করা দুটি পৃথক, সচেতন কাজ। সাধারণ `--force` প্রত্যাখ্যাত হয়। এছাড়াও build scope-এ `@ts-nocheck` ব্যবহারের জন্য `config/quality/ts-nocheck-baseline.json`-এর বিরুদ্ধে scan করে, কারণ এটি ব্যবহার করা file কোনো diagnostic-ই রিপোর্ট করে না এবং অন্যথায় প্রতিটি gate-এর কাছেই অদৃশ্য থেকে যেত। | হ্যাঁ                                       |

#### দুটি typecheck program ভিন্নভাবে উত্তর দেয়

`typecheck:core` এবং `check:build-typecheck` ভিন্ন options-এর অধীনে ভিন্ন
program compile করে, এবং একই file একটিতে clean হলেও অন্যটিতে error-এ পরিপূর্ণ হতে পারে।

`tsconfig.build.json`-এ `"strict": false` সেট করা আছে, তাই `noImplicitAny` বন্ধ। core
config আরও কঠোর options-সহ বাছাই করা ২৭-ফাইলের allowlist compile করে এবং প্রতিটি
entry-র import graph অনুসরণ করে, ফলে build program-এ কখনো উপস্থিত না হওয়া file-ও
সেখানে checked হয়।

কোনো file typed কি না বিচার করার সময় এর ফল গুরুত্বপূর্ণ: **`check:build-typecheck`-এর
অধীনে zero diagnostics মানেই zero নয়**। ২৬টি file থেকে
`@ts-nocheck` সরিয়ে দেখা গেছে, build program-এ এর মধ্যে ২৩টি clean; এদের ১৬টিতে
strict program-এ প্রায় ১২০টি implicit-any error প্রকাশ পেয়েছে। কোনো file-কে clean
বলার আগে দুটিই check করুন।

### Job: `quality-gate`

`test-coverage`-এর পরে চলে। ব্যর্থ হলে merge আটকে দেয়।

| স্ক্রিপ্ট                    | যাচাই করে                                                                                                                                                                         | ব্লকিং                        |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | `quality-metrics.json` তৈরি করে (ESLint সতর্কতার সংখ্যা, মার্জ করা shard রিপোর্ট থেকে coverage)                                                                                   | হ্যাঁ (`ratchet`-এর upstream) |
| `quality:ratchet`            | `quality-baseline.json`-এর প্রতিটি মেট্রিকে regression ঘটেনি (ESLint সতর্কতা ≤ baseline; coverage ≥ baseline)                                                                     | হ্যাঁ                         |
| `check:duplication`          | কোড duplication (jscpd@4) `quality-baseline.json`-এর baseline অতিক্রম করে না                                                                                                      | হ্যাঁ                         |
| `check:complexity`           | ফাইল-স্তরের cyclomatic complexity cap অতিক্রম করে না (core ESLint `complexity` + `max-lines-per-function`)                                                                        | হ্যাঁ                         |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — আলাদা ESLint pass; CI উভয়টিকে একত্র করে একক `check:complexity-ratchets` ধাপ হিসেবে চালায়                               | হ্যাঁ                         |
| `check:dead-code`            | অব্যবহৃত exports / files-এর ratchet (knip) baseline-এর তুলনায় regression করে না                                                                                                  | হ্যাঁ                         |
| `check:compression-budget`   | Compression benchmark budget — প্রতিটি engine-এর token-savings floor regression করে না                                                                                            | হ্যাঁ                         |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regression করে না; এটি মূলত `typecheck:noimplicit:core`-কে অন্তর্ভুক্ত করে                                                                | হ্যাঁ                         |
| `check:codeql-ratchet`       | খোলা CodeQL alert-এর সংখ্যা regression করে না (`gh api` ব্যবহার করে পড়ে; token ছাড়া graceful-skip করে) — refresh cadence এবং manual trigger-এর জন্য নিচে "CodeQL ratchet" দেখুন | হ্যাঁ                         |

### Job: `quality-extended`

সম্পূর্ণ job-টি advisory (`continue-on-error: true`)। npm-ভিত্তিক ratchet-গুলো
বাস্তবে চলে; external scanner-গুলো `gh release download` ব্যবহার করে install হয় এবং
কোনো binary এখনও অনুপস্থিত থাকলে self-skip করে (exit 0)।

| স্ক্রিপ্ট                | যাচাই করে                                                                                                                                                                                                          | ব্লকিং                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `check:circular-deps`    | কোনো circular dependency নেই (dpdm)                                                                                                                                                                                | **Advisory**                                      |
| `check:bundle-size`      | Bundle size cap অতিক্রম করে না                                                                                                                                                                                     | **Advisory**                                      |
| `check:secrets`          | Secret scanning (gitleaks) — binary অনুপস্থিত থাকলে skip করে                                                                                                                                                       | **Advisory**                                      |
| `check:vuln-ratchet`     | Dependency vulnerability (osv-scanner) regression করে না — binary অনুপস্থিত থাকলে skip করে                                                                                                                         | **Advisory**                                      |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanner অনুপস্থিত/ত্রুটিপূর্ণ, report অবৈধ বা ratchet baseline অনুপস্থিত থাকলে INCOMPLETE হিসেবে ব্যর্থ হয়। বৈধ findings নির্বাচিত strict/advisory/ratchet policy অনুসরণ করে | Execution প্রয়োজন; CI-তে zizmor ratchet blocking |
| `check:openapi-breaking` | Base branch-এর তুলনায় public API contract (`openapi.yaml`)-এ breaking change (oasdiff) — `openapiBreaking=N` emit করে; oasdiff অনুপস্থিত বা base spec resolve করা না গেলে skip করে                                | **Advisory**                                      |

### Job: `docs-sync-strict`

`main`-এ প্রতিটি PR-এ চলে। ব্যর্থ হলে merge ব্লক করে।

| Script                         | Validates                                                                                                                                      | Blocking                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | নিচের ৬টি সাব-গেট ধারাবাহিকভাবে চালানো মেটা-গেট                                                                                                | Yes                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt সংস্করণের সামঞ্জস্য                                                                                              | Yes                        |
| ↳ `check:docs-counts`          | গদ্যে থাকা সংখ্যা (প্রোভাইডার সংখ্যা, মাইগ্রেশন সংখ্যা ইত্যাদি) প্রকৃত সংখ্যার র্যাচেট উইন্ডোর মধ্যে আছে                                       | Yes                        |
| ↳ `check:env-doc-sync`         | `.env.example`-এর প্রতিটি env var একটি ডকুমেন্টেশন টেবিলে নথিভুক্ত আছে এবং উল্টোটাও সত্য                                                       | Yes                        |
| ↳ `check:deprecated-versions`  | ডকুমেন্টেশনে কোনো অবচিত সংস্করণ স্ট্রিং নেই                                                                                                    | Yes                        |
| ↳ `check:doc-links`            | ডকুমেন্টেশনের অভ্যন্তরীণ Markdown লিংকগুলো প্রকৃত ফাইলে রিজলভ হয় (`[text]`/`(path)` ফর্ম)                                                     | Yes                        |
| ↳ `check:fabricated-docs`      | ডকুমেন্টেশনে উদ্ধৃত রুট, env var, CLI কমান্ড, হুকের নাম এবং ফাইল পাথ কোডবেসে বিদ্যমান। `--strict`-এর মাধ্যমে হার্ড গেট; ফ্ল্যাগ ছাড়া সফট-ফেল। | Yes (via `--strict` in CI) |
| `check:cli-i18n`               | CLI কমান্ড স্ট্রিংগুলো সব i18n লোকেল ফাইলে উপস্থিত                                                                                             | Yes                        |
| `check:openapi-coverage`       | OpenAPI স্পেস প্রকৃত রুটগুলোর অন্তত একটি র্যাচেটেড ন্যূনতম অংশ কভার করে                                                                        | Yes                        |
| `check:openapi-security-tiers` | `openapi.yaml`-এর সিকিউরিটি টিয়ার অ্যানোটেশনগুলো `routeGuard.ts`-এর শ্রেণিবিভাগের সঙ্গে সামঞ্জস্যপূর্ণ                                        | **Advisory**               |
| `check:openapi-routes`         | `openapi.yaml`-এর প্রতিটি পাথ একটি প্রকৃত `route.ts`-এ রিজলভ হয় (অ্যান্টি-হ্যালুসিনেশন)                                                       | Yes                        |
| `check:docs-symbols`           | `docs/**/*.md`-এর প্রতিটি `/api/...` রেফারেন্স একটি প্রকৃত `route.ts`-এ রিজলভ হয় (অ্যান্টি-হ্যালুসিনেশন)                                      | Yes                        |
| `i18n translation drift`       | i18n লোকেল ফাইলের অনূদিত নয় এমন কী — শুধু সতর্কতা                                                                                             | **Advisory**               |

`docs/diagrams/`-এর বারোটি README SVG জেনারেটেড (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` এগুলো সব পুনরায় জেনারেট করে)। প্রতিটির একটি বাইট-তুলনা ইউনিট টেস্ট
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) আছে, যা কমিট করা ফাইলটি পুরোনো হলে ব্যর্থ হয়, এবং
`check:docs-counts` তাদের `<text>` নোড থেকে ক্যানোনিক্যাল সংখ্যা পড়ে — এই কারণেই আউটলাইনিং ধাপটি
ফাইলে আউটলাইন করা প্রতিটি স্ট্রিং অদৃশ্য `<text>` হিসেবে রেখে দেয়। SVG ক্যানোনিক্যাল-সংখ্যা চেকটি
`SVG_DIAGRAM_FILES`-এ তালিকাভুক্ত ফাইলগুলো পড়ে (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, পাশাপাশি `public/images/tier-flow-dark.svg` এবং `tier-flow-light.svg`;
free-forever, catalog-entry, recurring-pool এবং scoring-factors দাবিগুলোও
`promise-pillars.svg`, `free-tier-budget.svg` এবং `strategies-grid.svg` পড়ে। `free-tier-budget.svg`
লাইভ ক্যাটালগ লোডার থেকে তার পরিসংখ্যান নেয়, তাই `FREE_MODEL_BUDGETS` বা কোনো
প্রোভাইডারের প্রদর্শন-নামে পরিবর্তন হলে ওই ফাইলটি পুনরায় জেনারেট না করা পর্যন্ত CI লাল হয়।

### কাজ: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                                                 | Blocking     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (inline) | UI i18n কী কভারেজ ≥ 65%                                                                                                                                                                   | Yes          |
| `check-ui-value-drift` (inline)   | পুনর্লিখিত ইংরেজি **value**-এর পেছনে কোনো পুরোনো অনুবাদ অবশিষ্ট নেই                                                                                                                       | Yes          |
| `check-new-key-coverage` (inline) | একটি **নতুন** ইংরেজি কী প্রতিটি লোকেলে অনূদিত — `__MISSING__:` মার্কার প্রত্যাখ্যাত হয়                                                                                                   | Yes          |
| `check-translation-ratio`         | প্রতি লোকেলে প্রকৃত-অনুবাদ অনুপাত (ইংরেজির সঙ্গে অভিন্ন / প্লেসহোল্ডার / অনুমোদিত তালিকার বাইরে অনুপস্থিত) অবশ্যই `config/quality/i18n-translation-baseline.json` + slack অতিক্রম করবে না | **Advisory** |

`fetch-depth: 0` প্রয়োজন — value-drift গেটটি merge base-এর সঙ্গে `en.json`-এর পার্থক্য নির্ণয় করে।

#### `check-ui-value-drift` — পুরোনো-অনুবাদ গেট

অন্য গেটগুলো কাঠামোগতভাবে যে একমাত্র i18n রিগ্রেশনটি দেখতে পায় না, এটি সেটি ধরতে পারে: একটি ইংরেজি মান পুনর্লিখিত হয়, এবং _আগের_ ইংরেজি মান থেকে তৈরি অনুবাদগুলো অপরিবর্তিত থেকে যায়—ফলে অ-ইংরেজি ব্যবহারকারীরা আত্মবিশ্বাসী ভঙ্গিতে লেখা, কিন্তু এখন ভুল কপি পড়তে থাকেন।

এটি সত্যিই প্রোডাকশনে গিয়েছিল। Antigravity লগইন হেল্পার যুক্ত হওয়ার সময় `oauthModal.googleOAuthWarning` পুনর্লিখিত হয়েছিল (#5203); **43টির মধ্যে 39টি লোকেল** অপারেটরদের বলতেই থাকল যে "সম্পূর্ণ URL কপি করে নিচে পেস্ট করুন"—এমন একটি ধাপ, যা ওই প্রোভাইডারের ক্ষেত্রে সম্পন্ন করা সম্ভব নয়। #8463 পর্যন্ত এটি নজরে আসেনি, কারণ:

- `sync-ui-keys` কেবল **অনুপস্থিত** কীগুলো পূরণ করে, **stale** কীগুলো নয়;
- `check-ui-keys-coverage` কী _উপস্থিত_ আছে তা গোনে, তাই stale অনুবাদও কভারড হিসেবে গণ্য হয়;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ডকুমেন্টেশন মিররগুলো ট্র্যাক করে—
  এটি কখনো `src/i18n/messages/*.json` পড়ে না। 2026-09 পুনঃসিঙ্কের পর থেকে `docs-sync-strict` জবে ব্লক করে: একটি মূল ডক সম্পাদনা করুন → `npm run i18n:run -- --files=<doc>` (সেকশন-স্তরের, সাশ্রয়ী)।

**Diff-aware, baseline-backed নয়।** এটি merge base-এর `en.json`-এর সঙ্গে working tree-এর তুলনা করে; যেসব কী-এর ইংরেজি মান পরিবর্তিত হয়েছে, সেসব কীর কোনো লোকেল যদি এখনো অপরিবর্তিত অনুবাদ ধরে রাখে, সেটি stale। এটি ইচ্ছাকৃতভাবে পূর্ব-বিদ্যমান ঋণকে **ফ্রিজ** করে—একটি diff দীর্ঘদিনের কোনো অনুবাদ কোন পুরোনো ইংরেজি মান থেকে এসেছে তা প্রকাশ করতে পারে না, তাই গেটটি কেবল বর্তমান পরিবর্তন যা স্পর্শ করছে সেটিই বিচার করে। বিকল্প হিসেবে প্রতি-কী hash baseline ব্যবহার করলে প্রায় 600 KB-এর একটি generated file লাগত, যা বিদ্যমান বৃহত্তম baseline-এর 3 গুণ, এবং প্রতিটি i18n PR-এ পরিবর্তিত হতো।

এটি পূরণ করার দুটি উপায়:

1. প্রভাবিত অনুবাদগুলো আপডেট করুন, অথবা
2. সেগুলোকে `__MISSING__:<new english>` সেট করুন — runtime তখন সংশোধিত ইংরেজি পরিবেশন করবে
   (`src/i18n/request.ts::deepMergeFallback`, #7258) এবং কীটি অনুবাদের জন্য queue-তে যাবে।

স্ট্রিংটির **অর্থ** পরিবর্তিত হলে, **কীর নাম পরিবর্তন করাকে** অগ্রাধিকার দিন: একটি নতুন কী কোনো stale অনুবাদ উত্তরাধিকারসূত্রে পেতে পারে না। #8463-এ এই প্যাটার্নই ব্যবহার করা হয়েছিল।

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Base catalog পড়া না গেলে (base ref ছাড়া shallow clone), এটি `SKIP reason=base-unresolved` সহ 0 এক্সিট করে, `check-openapi-breaking`-এর আচরণের অনুরূপ।

### কাজ: `i18n`

সম্পূর্ণ i18n validation matrix (প্রতি লোকেলের জন্য একটি job)। পুরো job-টিই advisory।

| Script                          | Validates                        | Blocking                                              |
| ------------------------------- | -------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | প্রতি লোকেলে অনুবাদের সম্পূর্ণতা | **Advisory** (`continue-on-error: true` on whole job) |

### কাজ: `pr-test-policy`

শুধু pull request-এ চলে।

| Script                 | Validates                                                                                                                              | Blocking |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, অথবা `bin/`-এর production code পরিবর্তন করা PR-এ অবশ্যই tests যোগ বা আপডেট থাকতে হবে (Hard Rule #8)  | Yes      |
| `check:test-masking`   | পরিবর্তিত test files net assert count কমায় না বা `assert.ok(true)` tautology যোগ করে না                                               | Yes      |
| `check:pr-evidence`    | PR body-তে পরিবর্তনের test/VPS evidence উল্লেখ আছে (PR prose grep করে Hard Rule #18 যান্ত্রিকভাবে প্রয়োগ করে — ভঙ্গুর, Backlog দেখুন) | Yes      |

### কাজ: `test-vitest`

`build`-এর পরে চলে। ব্যর্থ হলে merge ব্লক করে।

| Suite            | Validates                                                | Blocking                                                                                                                    |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | Yes                                                                                                                         |
| `test:vitest:ui` | UI component tests — vitest runner                       | **Blocking** — `vitest.config.ts`-এ পূর্ব-বিদ্যমান ব্যর্থতাগুলো স্পষ্টভাবে বাদ দেওয়া হয়েছে; নতুন ব্যর্থতা job ব্যর্থ করবে |

### Nightly workflows (scheduled, advisory)

এগুলো cron schedule (এবং `workflow_dispatch`)-এ চলে, কখনো PR-এ নয়। সবগুলোই advisory।

| Workflow               | Validates                                                                                                                                                                     | Blocking        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | একটি র্যান্ডম seed + উচ্চ run count সহ fast-check property test                                                                                                               | **পরামর্শমূলক** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                         | **পরামর্শমূলক** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret ছাড়া এড়িয়ে যাওয়া হয়)                                                                              | **পরামর্শমূলক** |
| `nightly-schemathesis` | `docs/openapi.yaml` ব্যবহার করে একটি সক্রিয় OmniRoute-এর বিরুদ্ধে OpenAPI contract fuzzing (schemathesis) — spec violation / হ্যান্ডেল না-করা 500 শনাক্ত করে (পর্যায় 8 B.4) | **পরামর্শমূলক** |
| `nightly-mutation`     | fast unit lane জুড়ে Stryker mutation-testing score — টিকে থাকা mutant দুর্বল assert শনাক্ত করে                                                                               | **পরামর্শমূলক** |
| `nightly-compat`       | সমর্থিত `engines.node` range জুড়ে Node engine compatibility matrix                                                                                                           | **পরামর্শমূলক** |

Performance baseline (heap, TTFB, build time) রেকর্ড করা হয়, gate করা হয় না: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) দেখুন (`npm run perf:lts-baseline`)।

---

## ভেলোসিটি পর্যায় (2026-08-30 → v4.0 LTS): প্রতিটি বেসলাইন 20% শিথিল করা হয়েছে

মালিকের সিদ্ধান্ত (2026-08-30): v4.0 মডিউলারাইজেশন পর্যন্ত, ঋণের সীমা বজায় রাখার চেয়ে
দ্রুত রিলিজ দেওয়া বেশি গুরুত্বপূর্ণ। প্রতিটি **সংখ্যাসূচক** র্যাচেট বেসলাইন একটি
নিরীক্ষাযোগ্য ধাপে 20% শিথিল করা হয়েছে এবং পর্যায়টি `config/quality/quality-baseline.json`-এ ঘোষণা করা হয়েছে:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| কী পরিবর্তিত হয়েছে                                                                                                                                                                        | কোথায়                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — কম-হওয়া-ভালো গণনা ×1.2, বেশি-হওয়া-ভালো শতাংশ ÷1.2 (কভারেজের নিম্নসীমা 60 রাখা হয়েছে, `eslintErrors` 0-ই থাকে, `eslintWarnings` 0 → স্থিরীকৃত suppression গণনার 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` নোটে প্রতিটি আগে → পরে তালিকাভুক্ত আছে)          |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, প্রতিটি `frozen[*]` / `testFrozen[*]` লাইনসীমা ×1.2                                                                                                                      | `file-size-baseline.json`                                                                              |
| প্রতি-ফাইল / প্রতি-TS-কোড গণনা ×1.2                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` থাকলে `--require-tighten` কেবল পরামর্শমূলক হয়ে যায়                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| রাত্রিকালীন `bank-ratchet-shrinks` বিরতি নেয় (এটি পরিমাপকৃত হ্রাস সংরক্ষণ করে হেডরুম বাতিল করে দিত)                                                                                       | `.github/workflows/nightly-release-green.yml`                                                          |

অনুমোদন-তালিকাগুলো (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **বাজেট নয়** এবং এগুলো পরিবর্তন করা হয়নি। পাস/ফেল নীতির গেটগুলো (গোপন তথ্য, SQL নিয়ম,
docs/env চুক্তি, i18n সামঞ্জস্য, ইউনিট টেস্ট) অপরিবর্তিত — একটি ব্যর্থ টেস্ট এখনও ব্যর্থ টেস্টই।

**টুলিং**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — একবারের
  শিথিলকরণ (`scripts/quality/relax-baselines.mjs`); একই নোট দিয়ে দ্বিতীয়বার চালাতে অস্বীকার করে।
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI যেভাবে করে সেভাবেই প্রতিটি সংখ্যাসূচক গেট পরিমাপ করে এবং প্রতিটি গেটের অবশিষ্ট হেডরুম
  প্রদর্শন করে (`scripts/quality/baseline-headroom.mjs`)। রাত্রিকালীন `baseline-headroom` জবটি
  workflow run summary-তে টেবিলটি প্রকাশ করে এবং এর JSON/Markdown প্রতিবেদন
  `baseline-headroom-<run_id>` হিসেবে আপলোড করে, যা 90 দিন সংরক্ষিত থাকে। সতর্কতা ও সংকটজনক সারিগুলো
  এমন গেট শনাক্ত করে, যেগুলো তাদের সর্বোচ্চ সীমার 10%-এর মধ্যে বা ইতিমধ্যেই সীমা অতিক্রম করেছে।
  বাজেট ব্যবহৃত হওয়ার আগাম সতর্কতা হিসেবে এই প্রতিবেদনগুলো পর্যালোচনা করুন; সংশ্লিষ্ট গেটের
  `_rebaseline_*` নোটগুলো পরীক্ষা করুন। জবটি আর কোনো স্থায়ী issue তৈরি বা হালনাগাদ করে না;
  #12149 আগের প্রতিবেদনের ইতিহাস সংরক্ষণ করে।

**নতুন-কোড মোড (Clean-as-You-Code) — 2026-08-30 থেকে, কেবল PR দ্রুত-পথ**

`pull_request` ইভেন্টে `quality.yml`, `check:file-size`,
`check:complexity-ratchets` এবং `check:dead-code`-এ `--base-ref <PR base SHA>` পাঠায়। `check:complexity-ratchets` এবং
`check:dead-code`-এর ক্ষেত্রে গেটটি merge-base-এর সঙ্গে HEAD-এর তুলনা করে, **শুধু PR-এ
পরিবর্তিত ফাইলগুলোর মধ্যে সীমাবদ্ধ রেখে** (`scripts/check/newCodeMode.mjs`: merge-base-টি একটি অস্থায়ী
`git worktree`-তে বাস্তবায়িত হয়, ESLint/knip সেখানে এবং HEAD-এ চালানো হয়, এবং প্রতি-ফাইল গণনার পার্থক্য নির্ণয় করা হয়):

- **ব্লকিং** — PR-টি পরিবর্তন করা ফাইলগুলোতে cyclomatic/cognitive লঙ্ঘন বা dead export যোগ করেছে
  (লগে `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **পরামর্শমূলক** — স্থিরীকৃত বেসলাইনের তুলনায় সামগ্রিক মোট সংখ্যা। উত্তরাধিকারসূত্রে পাওয়া drift কখনো কোনো
  নির্দোষ PR-কে ব্যর্থ করে না; release reconciliation-এর সময় drift পুনরায় স্থিরীকৃত হয় এবং headroom job দ্বারা পর্যবেক্ষণ করা হয়।

`check:file-size` নিজস্ব নিয়মে base ref ব্যবহার করে (`scripts/check/check-file-size.mjs`, #8522):
এটি ট্রির প্রতিটি source ও test file পরীক্ষা করে, `git show` দিয়ে PR base-এ প্রতিটির লাইনসংখ্যা
পড়ে এবং কোনো ফাইল কেবল তখনই ব্যর্থ করে, যখন সেটি তার baseline ceiling
(`frozen` / `testFrozen`, অথবা baseline-এর বাইরে থাকা কোনো ফাইলের জন্য `cap` / `testCap`) এবং base
size-এর মধ্যে যেটি বড়, সেটি ছাড়িয়ে যায়। ফলে base-এ ইতিমধ্যেই drift করা কোনো ফাইল কখনো নির্দোষ PR-কে ব্যর্থ করে না।

`check:boundary:ratchet` তার একক সংখ্যার ক্ষেত্রেও একই নিয়ম প্রয়োগ করে
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ইভেন্টে
`quality.yml`-এর fast-gate এবং `ci.yml`-এর lint job—উভয়ই PR-এর base SHA পাস করে, base commit-টি
একটি `git archive` export থেকে পরিমাপ করা হয়, এবং PR কেবল তখনই ব্যর্থ হয় যখন তার `open-sse → src` edge-এর
সংখ্যা `metrics.boundaryOpenSseToSrc` ও base-এর সংখ্যার মধ্যে বৃহত্তরটিকে ছাড়িয়ে যায়। ceiling-এর
ওপরের base drift রিপোর্ট করা হয় (`base drift herdado`), কিন্তু এর কারণে কোনো নির্দোষ PR কখনো red হয় না; push → main
absolute ceiling বজায় রাখে, এবং কোনো base SHA resolve করা না গেলে warning-সহ সেটিতেই fallback করে।

`workflow_dispatch` run, release-green sweep এবং nightly headroom job-এর কোনো PR base নেই
এবং এগুলো absolute (global) comparison বজায় রাখে। Coverage, duplication এবং type-coverage আপাতত global-ই
থাকে (তাদের tool-গুলো সাশ্রয়ে per-file diff তৈরি করে না) — এগুলো একই পদ্ধতি প্রয়োগের সম্ভাব্য প্রার্থী।

**v4.0-এ phase সমাপ্ত করা (LTS = আগের চেয়ে কঠোর, "আবার স্বাভাবিক অবস্থায় ফেরা" নয়)**

1. বিশুদ্ধ `release/v4.0.0` tip-এ: রেকর্ডের জন্য `npm run quality:headroom --json`, তারপর
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, প্রতিটি typecheck gate-এর
   `--update` — প্রতিটি baseline পরিমাপ করা মানে নেমে আসে।
2. `quality-baseline.json` থেকে `_policy` মুছে দিন (`--require-tighten` এবং nightly
   banking পুনরায় সক্রিয় করে), `check-openapi-coverage.mjs`-এ `THRESHOLD = 36` (বা তার বেশি) পুনঃস্থাপন করুন।
3. modularization-এর সুফল পাওয়া জায়গাগুলোতে পরিমাপ করা মানের চেয়েও কঠোর করুন: file-size `cap` আবার 1000
   (বা 800), coverage floor +5, modularized package-গুলোর জন্য dead export 0।

## র্যাচেট বেসলাইন (`quality-baseline.json`)

র্যাচেট ইঞ্জিন (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` পড়ে
এবং এটিকে সদ্য সংগৃহীত `quality-metrics.json`-এর সঙ্গে তুলনা করে। কোনো মেট্রিক তার epsilon-এর
সীমা ছাড়িয়ে অবনতি হলে বিল্ড ব্যর্থ হয়।

বর্তমানে ট্র্যাক করা মেট্রিকসমূহ:

| মেট্রিক               | দিক    | অর্থ                                   |
| --------------------- | ------ | -------------------------------------- |
| `eslintWarnings`      | `down` | ESLint সতর্কতার সংখ্যা বাড়তে পারবে না |
| `coverage.statements` | `up`   | স্টেটমেন্ট কভারেজ কমতে পারবে না        |
| `coverage.lines`      | `up`   | লাইন কভারেজ কমতে পারবে না              |
| `coverage.functions`  | `up`   | ফাংশন কভারেজ কমতে পারবে না             |
| `coverage.branches`   | `up`   | ব্রাঞ্চ কভারেজ কমতে পারবে না           |

প্রকৃত উন্নতির পর বেসলাইন আপডেট করতে:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ফ্ল্যাগটি বর্তমানে পরিমাপ করা মানগুলো `quality-baseline.json`-এ লেখে।
যে পরিবর্তনটি মেট্রিকের উন্নতি করেছে, তার সঙ্গে এই ফাইলটিও কমিট করুন। কোনো PR একটি
মেট্রিক উন্নত করলেও বেসলাইন আপডেট না করলে `--require-tighten` সেটি শনাক্ত করবে (ধাপ 6A.5,
বাস্তবায়ন অপেক্ষমাণ)।

### CodeQL র্যাচেট: রিফ্রেশের সময়সূচি ও ম্যানুয়াল ট্রিগার

`check:codeql-ratchet` **রিপোজিটরির অবস্থা পড়ে, যা একটি সময়সূচি অনুযায়ী রিফ্রেশ হয় — প্রতিটি PR-এ নয়।**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` রিপোর্ট করে
`state: configured`, `schedule: weekly`: এটি GitHub-এর default-setup স্ক্যান, প্রতিটি push-এর
বিশ্লেষণ নয়। ফলাফল: অ্যালার্ট সংশোধনকারী কোনো PR মার্জ হওয়ার পরও র্যাচেটটি
পরবর্তী নির্ধারিত স্ক্যান না চলা পর্যন্ত পুরোনো, বেশি সংখ্যাটিই পড়তে থাকে — তাই স্ক্যানটি হালনাগাদ না হওয়া
পর্যন্ত এটি প্রতিটি খোলা PR-এ, এমনকি সংশোধনকারী PR-এর নিজস্ব ফলো-আপগুলোতেও, অবনতি রিপোর্ট করে।

**ম্যানুয়াল রিফ্রেশ**: `gh workflow run codeql.yml --ref release/vX.Y.Z` বিশ্লেষণটি
পুনরায় চালায় এবং কয়েক মিনিটের মধ্যে অ্যালার্ট পুনঃপ্রকাশ করে। প্রথমে `.github/workflows/codeql.yml`
পড়ুন — এর হেডারে ব্যাখ্যা করা হয়েছে যে এটি কেবল `workflow_dispatch` **কারণ এটি
GitHub-এর "default setup"-এর সঙ্গে সংঘর্ষ করে** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)। `push`/`pull_request`/
`schedule` ট্রিগার পুনঃস্থাপন করতে হলে প্রথমে **মালিকের পদক্ষেপ নেওয়া আবশ্যক**: Settings → Code security →
CodeQL: Default → Advanced। ওই পরিবর্তন ছাড়া কোনো `schedule:` ট্রিগার যোগ করবেন না — এটি
শুধু ব্যর্থ রান তৈরি করবে।

**সংখ্যা কমার পর বেসলাইন আরও কঠোর করুন** — `node scripts/check/check-codeql-ratchet.mjs
--update` নতুন পরিমাপ করা সংখ্যাটি `quality-baseline.json` →
`metrics.codeqlAlerts.value`-এ লেখে, ফলে র্যাচেটটি পুরোনো সর্বোচ্চ সীমায় ফিরে যাওয়া কোনো অবনতিকে
নীরবে অনুমতি দেয় না। কার্যকর উদাহরণ (2026-09-02/03): PR #12502 7টি প্রকৃত অ্যালার্ট
সংশোধন করেছে (পরিমাপ করা খোলা অ্যালার্ট 13 → 6); PR #12530 তার সঙ্গে সামঞ্জস্য রাখতে স্থিরীকৃত বেসলাইন 11 → 6-এ কঠোর করেছে; এরপর
অবশিষ্ট 6টি অ্যালার্ট-প্রতি যুক্তিসহ খারিজ করে খোলা অ্যালার্টের সংখ্যা 0-তে নামানো হয়েছিল।

**খারিজ করার সিদ্ধান্ত অপারেটরের (কঠোর নিয়ম #14)** — খারিজের মন্তব্যে প্রযুক্তিগত
যুক্তি নথিবদ্ধ না করে কখনো কোনো CodeQL অ্যালার্ট খারিজ করবেন না: upstream-protocol-এর
প্রয়োজনীয়তার জন্য `won't fix`, টেস্ট ফিক্সচারের জন্য `used in tests`, CodeQL শনাক্ত করতে পারে না এমন
sanitizer-এর জন্য `false positive` (নজির: `docs/security/ERROR_SANITIZATION.md`)।

---

## টেস্ট পুনঃচেষ্টা নীতি (WS5.4, v3.8.49)

পুনঃচেষ্টা প্রতিটি রানারের জন্য আলাদা, কখনোই সর্বব্যাপী বৈশ্বিক নয় — সর্বব্যাপী পুনঃচেষ্টা প্রকৃত রিগ্রেশনকে
অদৃশ্য ফ্লেকে পরিণত করে:

| রানার            | নীতি                                                                                                                              | কারণ                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | শুধু CI-তে `retries: 1`, সঙ্গে `trace: on-first-retry`                                                                            | ব্রাউজার/নেটওয়ার্কের টাইমিং প্রকৃতপক্ষেই অনির্ধারিত; ট্রেসসহ একটি পুনঃচেষ্টা ফ্লেককে নির্ণয়যোগ্য আর্টিফ্যাক্টে পরিণত করে |
| Vitest           | কোনো বৈশ্বিক পুনঃচেষ্টা নয়। প্রমাণিত-ফ্লেকি টেস্টে স্পষ্টভাবে প্রতি-টেস্ট পুনঃচেষ্টা দেওয়া হয় (ডিফে দৃশ্যমান, PR-এ পর্যালোচিত) | কোয়ারেন্টাইন তালিকাটি রিপোতেই থাকে, কখনোই অস্বচ্ছ নয়                                                                     |
| node:test (unit) | কখনোই কোনো পুনঃচেষ্টা নয়                                                                                                         | ফ্লেকি ইউনিট টেস্ট মানে টেস্টেই বাগ আছে — এটি ঠিক করুন, আবার চালিয়ে ভাগ্য পরীক্ষা করবেন না                                |

ফ্লেক টেলিমেট্রি চালু হওয়ার পর লক্ষ্য SLO-গুলো (WS5.2/5.3): প্রতি টেস্টে <1% ফ্লেক হার
("এখনই ঠিক করুন" সীমা), প্রতি পাইপলাইনে ≥95% পাসের হার। শিল্পখাতের রেফারেন্স মান —
আমাদের নিজস্ব পরিমাপের ভিত্তিতে পুনরায় ক্যালিব্রেট করতে হবে।

## রিলিজ-স্তরের র্যাচেট ড্রিফট (WS5.5, v3.8.49)

যখন কোনো র্যাচেট (ফাইলের আকার, জটিলতা, eslint সতর্কতা) বিশুদ্ধ রিলিজ
টিপে রিগ্রেস করে — অর্থাৎ মার্জগুলোর সমন্বয় এটিকে রিগ্রেস করেছে, কিন্তু কোনো একক PR-এর
নিজস্ব ব্রাঞ্চে রিগ্রেশনটি পুনরুৎপাদিত হয় না — তখন সমাধানের দায়িত্ব **একবার, রিলিজ
ব্রাঞ্চে, রিলিজ ক্যাপ্টেনের**: এক্সট্রাকশন/রিফ্যাক্টরকে অগ্রাধিকার দিন; শুধু নথিভুক্ত
যৌক্তিকতার এন্ট্রিসহ পুনরায় বেসলাইন নির্ধারণ করুন। সমন্বয়জনিত ড্রিফট কখনোই কোনো অবদানকারীর PR-এর ওপর
চাপিয়ে দেবেন না এবং প্রতি-PR-এ কখনোই পুনরায় বেসলাইন নির্ধারণ করবেন না (এটি প্রকৃত রিগ্রেশন লুকিয়ে ফেলে)। প্রথমে পার্থক্য নির্ণয় করুন: আপনার PR-কে কারণ ধরে নেওয়ার আগে
একটি প্রোব ওয়ার্কট্রিতে বিশুদ্ধ টিপের বিপরীতে ব্যর্থতা পুনরুৎপাদন করুন।

## র্যাচেট সংকোচন সঞ্চয় — নিম্নমুখী দিক (#8584)

র্যাচেটটি কেবল অর্ধেক স্বয়ংক্রিয়, আর সেটি ভুল অর্ধেক। কোনো সর্বোচ্চ সীমা **বাড়াতে**
দশ সেকেন্ডের একটি ম্যানুয়াল JSON সম্পাদনা লাগে এবং এটি ব্যর্থ PR আনব্লক করার দ্রুততম উপায়।
কোনো সীমা **কমাতে** কাউকে `--update` চালিয়ে ফলাফল কমিট করতে হয় — এবং
`bank-ratchet-shrinks` জবটি আসার আগে পর্যন্ত কোনো ওয়ার্কফ্লো এটি চালাত না। পরিমাপকৃত ফলাফল
(2026-07-25): 18টি ফ্রোজেন ফাইল ইতিমধ্যেই নতুন ফাইলের 800-লাইনের সীমায় বা তার নিচে, সবচেয়ে খারাপটি
132× (`src/shared/validation/schemas.ts`, 19 লাইনের জন্য 2,523 সীমা); প্রায় 37টি পুনঃবেসলাইন নোটজুড়ে
জটিলতার সর্বোচ্চ সীমা `1794 → 2169`-এ পৌঁছেছে, যেখানে কমেছে ঠিক একবার (−1);
এবং "পরবর্তী চক্রে `--update` দিয়ে কঠোর করুন" 31 বার লেখা হলেও মানা হয়েছে
একবার। যে সীমা তার কারণ হওয়া কোডের চেয়েও বেশি সময় টিকে থাকে, সেটি নীরবে প্রতিটি সম্পন্ন
বিভাজনকে পরবর্তীবার ফাইলটি সম্পাদনকারী ব্যক্তির জন্য বৃদ্ধির অনুমতিতে পরিণত করে।

`nightly-release-green.yml` → জব **`bank-ratchet-shrinks`** সেই চক্রটি সম্পূর্ণ করে:

|            |                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| চলে        | `schedule` (দিনে 3×) + `workflow_dispatch`-এ — ইচ্ছাকৃতভাবেই `push`-এ **নয়**                          |
| পরিমাপ করে | সর্বোচ্চ `release/vX.Y.Z`, `release-green`-এর মতো একই রেজোলিউশন + ইনজেকশন গার্ড                        |
| লেখে       | `check:file-size --update` এবং `check:complexity-ratchets --update` (দুটিই নকশাগতভাবে শুধু সংকোচনশীল)  |
| যাচাই করে  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                               |
| সরবরাহ করে | রিলিজ ব্রাঞ্চের বিপরীতে সর্বদা-হালনাগাদ একটি PR — জোরপূর্বক হালনাগাদ করা হয়, কখনোই স্প্যাম করা হয় না |

প্রতি-পুশের বদলে ব্যাচে সঞ্চয় করা হয়, কারণ এর কোনো ল্যাটেন্সির প্রয়োজন নেই (8 ঘণ্টার মধ্যে
সংকোচন সঞ্চিত হলেই যথেষ্ট), অন্যদিকে প্রতি-মার্জ রান মার্জ ক্যাম্পেইনের সময় বারবার
PR ব্রাঞ্চ পুনর্নির্মাণ করত এবং প্রতিবার সম্পূর্ণ ESLint স্ক্যানের খরচ বহন করত। শনাক্তকরণ
`push`-এ (`release-green`) থাকে; শুধু সঞ্চয় ব্যাচে করা হয়।

### নিরাপত্তা যাচাইকারী

জবটি তত্ত্বাবধান ছাড়াই বেসলাইনগুলোতে লেখে, তাই `verify-ratchet-bank.mjs`-ই এটিকে
গ্রহণযোগ্য করে। এটি `HEAD`-এর বিপরীতে `--update`-পরবর্তী ট্রির ডিফ করে এবং প্রতিটি পরিবর্তন নিচের
কোনো একটি না হলে **কোনো কমিট তৈরি হওয়ার আগেই জবটি বাতিল করে** — কোনো PR খোলে না:

- কোনো `frozen` / `testFrozen` সংখ্যাসূচক এন্ট্রি **কমানো** বা **সরানো**
- `complexity-baseline.json` → `count` **কমানো**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **কমানো**

অন্য যেকোনো কিছু ব্যর্থ হয়: কোনো সংখ্যা বাড়ানো, এন্ট্রি যোগ করা, `cap`/`testCap` পরিবর্তন করা, অথবা
কোনো `_rebaseline_*` নোট মুছে ফেলা/পুনর্লিখন করা (এই নোটগুলো প্রতিটি সর্বোচ্চ সীমা কেন রয়েছে তার অডিট ট্রেইল
এবং ফাইল এন্ট্রিগুলোর মতো একই `frozen` অবজেক্টে সংরক্ষিত থাকে)।
যে বট সীমা বাড়াতে পারে, সেটি বর্তমান অবস্থার চেয়ে নিশ্চিতভাবেই খারাপ হবে। রিগ্রেশন
গার্ড: `tests/unit/verify-ratchet-bank.test.ts`।

জবটি কখনোই `release/*`-এ পুশ করে না — একজন মানুষ PR মার্জ করেন, তাই ভুল পরিমাপ
পর্যালোচনা ছাড়া অন্তর্ভুক্ত হতে পারে না।

## অনুমোদিত তালিকা নীতি

পূর্ববর্তী লঙ্ঘনের কারণে ব্যর্থ হতে পারে না—এমন প্রতিটি গেট একটি অপরিবর্তনীয় অনুমোদিত তালিকা ব্যবহার করে
(যেমন, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। নীতিটি হলো:

**মূল কারণটি ঠিক করুন; কেবল তখনই অনুমোদিত তালিকা ব্যবহার করুন, যখন লঙ্ঘনটি পূর্ববর্তী এবং
একই PR-এ ঠিক করা সম্ভব নয়।**

অনুমোদিত তালিকায় কোনো এন্ট্রি যোগ করার সময়:

1. যৌক্তিকতা ব্যাখ্যা করে একটি মন্তব্য অন্তর্ভুক্ত করুন।
2. ট্র্যাকিং ইস্যুর উল্লেখ করুন (যেমন, `// #3498 — পর্যায় ২-এর ফিচার, এখনো বাস্তবায়িত হয়নি`)।
3. যে PR লঙ্ঘনটি ঠিক করে, সেই একই PR-এ এন্ট্রিটি সরিয়ে দিন—যে অচল এন্ট্রি আর কোনো সক্রিয়
   লঙ্ঘন দমন করে না, সেটি নিজেই একটি ত্রুটি (বাস্তবায়িত হলে 6A.3 অচল-প্রয়োগ ব্যবস্থা
   কোনো অনাথ অনুমোদিত তালিকা এন্ট্রি পেলে গেটটিকে ব্যর্থ করবে)।

পরীক্ষা দ্রুত পাস করানোর জন্য অনুমোদিত তালিকায় এন্ট্রি যোগ করবেন **না**। ক্রমবর্ধমান
অনুমোদিত তালিকাসহ একটি সবুজ গেট গুণমান সম্পর্কে মিথ্যা আশ্বাস দেয়।

### আপনার PR-এ কোনো গেট ব্যর্থ হলে

1. **গেটের আউটপুট মনোযোগ দিয়ে পড়ুন**—কোন ফাইল বা সিম্বল নিয়মটি লঙ্ঘন করেছে, তা সেখানে
   নির্দিষ্টভাবে বলা থাকে।
2. **লঙ্ঘনটি ঠিক করুন**—অধিকাংশ গেটই নির্ধারক ফাইলসিস্টেম পরীক্ষা, কোড সঠিক হলেই যেগুলো পাস
   করে।
3. **লঙ্ঘনটি পূর্ববর্তী হলে** (অর্থাৎ, আপনি এটি প্রবর্তন করেননি, কিন্তু গেটটি এখন এটিকে
   আওতাভুক্ত করছে): যৌক্তিকতার মন্তব্য ও একটি ট্র্যাকিং ইস্যুসহ অনুমোদিত তালিকায় একটি এন্ট্রি যোগ করুন।
4. **গেটটি যদি র্যাচেট হয়** (কভারেজ, ESLint সতর্কতা, পুনরাবৃত্তি, জটিলতা):
   আপনার পরিবর্তন মেট্রিকটিকে আরও খারাপ করেছে। অন্তর্নিহিত সমস্যাটি ঠিক করুন, অথবা (খুব কম ক্ষেত্রেই)
   পরিবর্তনটি ইচ্ছাকৃত এবং মেট্রিকের অবনতি গ্রহণযোগ্য হলে
   `npm run quality:ratchet -- --update` চালান—তবে PR-এর বিবরণে কারণটি নথিভুক্ত করুন।
5. **পরামর্শমূলক গেটগুলো** (`continue-on-error: true`) তথ্যগত—এগুলো মার্জ অবরুদ্ধ করে না,
   তবে CI সারাংশে দেখা যায়। তবুও এগুলো ঠিক করুন।

---

## নতুন গেট যোগ করা

1. `scripts/check/check-<name>.mjs` (অথবা `.ts`) তৈরি করুন। নীতি-ভিত্তিক গেটগুলো 0/1 দিয়ে প্রস্থান করে।
   র্যাচেট-ধাঁচের গেটগুলো `collect-metrics.mjs`-এর মাধ্যমে `quality-metrics.json`-এ একটি মেট্রিক নির্গত করে।
2. `package.json`-এ `"check:<name>": "node scripts/check/check-<name>.mjs"` যোগ করুন।
3. উপযুক্ত জবের অধীনে `.github/workflows/ci.yml`-এ এটিকে সংযুক্ত করুন
   (নীতি → `lint` অথবা `docs-sync-strict`; র্যাচেট → `quality-gate`)।
4. এতে অনুমোদিত তালিকা থাকলে, `scripts/check/lib/allowlist.mjs` থেকে
   `reportStaleEntries()` প্রয়োগ করুন, যাতে অচল এন্ট্রিগুলো স্বয়ংক্রিয়ভাবে শনাক্ত হয়।
5. গেটটির শনাক্তকরণ লজিক কভার করে `tests/unit/build/`-এ একটি পরীক্ষা লিখুন।
6. এই নথিটি হালনাগাদ করুন (প্রাসঙ্গিক জব টেবিলে একটি সারি যোগ করুন)।

---

## এজেন্ট টুলিং: LSP-in-the-loop (ঐচ্ছিক)

CI গেটগুলোর পাশাপাশি, OmniRoute একটি **ঐচ্ছিক** `agent-lsp` স্ক্যাফোল্ড সরবরাহ করে
(একটি প্রকল্প-স্তরের `.mcp.json`, Fase 7 Task 15)। কোডিং এজেন্টগুলোর কাছে একটি TypeScript
ল্যাঙ্গুয়েজ সার্ভার উন্মুক্ত করতে `.mcp.json` তৈরি করুন, যাতে তারা কোড লেখার **আগেই** সিম্বল /
ডায়াগনস্টিক সমাধান করতে পারে—এটি `typecheck:core`-এর একটি কম্পাইল-বিফোর-ক্লেইম সহযোগী,
যা উৎসেই "উদ্ভাবিত সিম্বল" ত্রুটি কমায়। এটি ইচ্ছাকৃতভাবে স্বয়ংক্রিয়ভাবে লোড করা হয় না
(আপনিই MCP↔LSP ব্রিজ বেছে নেবেন এবং যাচাই করবেন); কোনো ত্রুটিপূর্ণ এন্ট্রি শুধু একটি
সংযোগ-ত্রুটি লগ করে এবং কখনোই সেশন ব্যাহত করে না।

---

## যৌক্তিকীকরণ ব্যাকলগ (ROI পর্যালোচনা — পর্যায় 9 তরঙ্গ 3)

এই ইনভেন্টরিটি 2026-06-17 তারিখে `ci.yml`-এর সঙ্গে সমন্বয় করা হয়েছে (আগের সংস্করণে
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` বাদ পড়েছিল)। সমন্বয়কৃত সেটটির একটি ROI পর্যালোচনায়
নিচের যৌক্তিকীকরণ প্রার্থীগুলো শনাক্ত হয়েছে। **মার্জগুলো যান্ত্রিক CI
পরিবর্তন; ফ্লিপ/বাদ দেওয়ার সিদ্ধান্তগুলো অপারেটরের জন্য সংরক্ষিত নীতিগত সিদ্ধান্ত।** নিচের কোনো কিছুই
এখনও প্রয়োগ করা হয়নি।

**উপরেও নথিবদ্ধ হয়নি** (পরামর্শমূলক, দুর্বল সংকেত): `docs-lint` জব
(markdownlint + Vale, পুরো জবে `continue-on-error`) এবং স্বতন্ত্র স্ক্যানার ওয়ার্কফ্লো
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `quality-baseline.json`-এ
`semgrepFindings: 0` রয়েছে, কিন্তু `ci.yml`-এ এটি কোনো ব্লকিং র্যাচেটের সঙ্গে সংযুক্ত নয় — মেট্রিকটি
বর্তমানে অনাথ।

### মার্জ / ডিডুপ্লিকেশন (যান্ত্রিক, কম ঝুঁকি)

প্রতিটি প্রার্থীকে 2026-06-17 তারিখে সক্রিয় গেটের অবস্থার বিপরীতে যাচাই করা হয়েছে (বিশ্বাস করুন, তবে যাচাইও করুন);
বেশ কয়েকটি "স্পষ্ট" মার্জ আসলে লুকানো ঋণ আড়াল করছিল এবং সেগুলো **পরিষ্কার ড্রপ-ইন নয়**।

- **`check:docs-sync` দুবার চলে** — `lint` জবে স্বতন্ত্রভাবে এবং আবার `check:docs-all` (`docs-sync-strict`) ও husky pre-commit hook-এর ভেতরে। ✅ **সম্পন্ন** — স্বতন্ত্র `lint` ইনভোকেশন সরানো হয়েছে।
- **CVE স্ক্যানিং** — ❌ **পরিষ্কার মার্জ নয়।** যেকোনো high/critical CVE-তে `audit:deps` হার্ড-ফেইল করে; `check:vuln-ratchet` (osv) কেবল baseline-এর তুলনায় কোনো _রিগ্রেশন_ হলে ব্যর্থ হয় (বর্তমানে 1 MODERATE)। সেমান্টিক্স ভিন্ন — `audit:deps` বাদ দিলে পরম high/critical গেটটি হারিয়ে যাবে। দুটিই রাখুন।
- **চক্র শনাক্তকরণ** — ✅ **সম্পন্ন** (#15159 G-01/G-02)। এখানে পুরোনো লেখায় `check:cycles`-কে "সবুজ, বাছাইকৃত" গেট বলা হয়েছিল এবং `check:circular-deps` (dpdm) 91টি চক্র রিপোর্ট করায় এটিকে ব্লকিং রাখার যৌক্তিকতা দেওয়া হয়েছিল। সেই সবুজ অবস্থা ছিল একটি **মিথ্যা সবুজ**: `check:cycles` 5টি সাবডিরেক্টরি (450টি ফাইল) স্ক্যান করত, শুধু স্থির `import|export … from` মেলাত এবং প্রতিটি `@/` ও `@omniroute/open-sse/` স্পেসিফায়ার বাদ দিত, ফলে রিপোজিটরিতে প্রাধান্য পাওয়া dynamic-import + alias চক্রগুলো এটি দেখতে পারত না। সংশোধন করা হয়েছে: গেটটি এখন `src` + `open-sse` (5023টি ফাইল) অতিক্রম করে, TypeScript AST থেকে স্পেসিফায়ার সংগ্রহ করে (তাই `import("…")` গণনা করা হয়, কিন্তু type-position `typeof import("…")` করা হয় না) এবং tsconfig `paths` রিজলভ করে। এটি 0 নয়, **14টি** চক্র খুঁজে পায়। যেহেতু গেট PR-এ আগে থেকে থাকা 14টি চক্র ঠিক করা সম্ভব নয়, `check:cycles` এখন একটি **র্যাচেট** (`--ratchet`, `quality-baseline.json`-এ সীমা `metrics.cycles.value = 14`, `direction: down`) — এটি যেকোনো _রিগ্রেশন_ ব্লক করে এবং সংখ্যা কেবল কমতে পারে। CI-তে `npm run check:cycles:ratchet` চলে। বার্ন-ডাউন **A-01**-এর সঙ্গে চলবে। বিস্তৃত দ্বিতীয় মতামত হিসেবে `check:circular-deps` (dpdm) পরামর্শমূলক থাকবে।
- **জটিলতা** — ✅ **সম্পন্ন** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): একটি ESLint ওয়াক, ruleId অনুযায়ী গণনা করে যাতে cyclomatic+max-lines এবং cognitive baseline স্বাধীন থাকে; স্থানীয় `--update`-এর জন্য পৃথক `check:complexity` / `check:cognitive-complexity` বজায় রাখা হয়েছে।
- **`/api` অ্যান্টি-হ্যালুসিনেশন** — ✅ **সম্পন্ন** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-এর একটি FS ইনভেন্টরি, openapi-routes + docs-symbols এখনও স্বাধীনভাবে রিপোর্ট করে; স্থানীয় রানের জন্য পৃথকগুলো বজায় রাখা হয়েছে।
- **`check:node-runtime` 11টি জবে চলে** — ⚠️ **কম ROI।** প্রতিটি আলাদা রানার এবং চেকটি <1s; সাশ্রয় মোটামুটি ~10s, যার বিপরীতে একটি সস্তা প্রতি-জব গার্ড হারাতে হবে। পরিবর্তনের ঝামেলা সার্থক নয়।
- **CI lint-এ `typecheck:noimplicit:core`** — ✅ **lint জব থেকে সরানো হয়েছে** (এটি পরামর্শমূলক `continue-on-error` ছিল); ব্লকিং টাইপ সারফেস হলো `typecheck:core` + `check:type-coverage`। স্থানীয় স্ক্রিপ্ট রাখা হয়েছে।

### ফ্লিপ / সিদ্ধান্ত (অপারেটর নীতি)

- `check:openapi-security-tiers` (পরামর্শমূলক) — ❌ **পরিষ্কারভাবে ফ্লিপযোগ্য নয়।** এটি 0 দিয়ে এক্সিট করে, কিন্তু সতর্ক করে যে `LOCAL_ONLY_API_PREFIXES`-এর অধীন কয়েকটি `traffic-inspector` রুটে `x-loopback-only: true` অ্যানোটেশন নেই। এটি বলবৎ করার আগে `openapi.yaml`-এ ওই অ্যানোটেশনগুলো যোগ করতে হবে।
- `typecheck:noimplicit:core` (পরামর্শমূলক) — ব্লকিং `check:type-coverage` র্যাচেট এটিকে অনেকাংশে অন্তর্ভুক্ত করে। এটিকে র্যাচেটে ফ্লিপ করুন অথবা অপ্রয়োজনীয় দ্বিতীয় `tsc` পাসটি বাদ দিন।
- `test:vitest:ui` (এখন **ব্লকিং**) — আগে থেকে থাকা ব্যর্থতাগুলো `vitest.config.ts`-এ `// #8618` ট্র্যাকিং মন্তব্যসহ স্পষ্টভাবে বাদ দেওয়া হয়েছে; নতুন ব্যর্থতা জবটিকে ব্যর্থ করবে।
- `check:secrets` (gitleaks, 3টি নথিবদ্ধ false-positive-এ স্থির করা ব্লকিং র্যাচেট) — 0-তে পৌঁছাতে 3টিকে allowlist করুন, অথবা পরামর্শমূলক স্তরে নামিয়ে দিন। GitHub-এর নেটিভ secret-scanning + `check:public-creds`-এর সঙ্গে ওভারল্যাপ করে।
- `check:pr-evidence` (ব্লকিং, PR-body-এর গদ্য grep করে) — false-positive-এর উচ্চ ঝুঁকি; বাদ দিলে Hard Rule #18-এর প্রয়োগ দুর্বল হবে, তাই এটি সত্যিকারের নীতিগত সিদ্ধান্ত।
- `semgrep` (পরামর্শমূলক স্বতন্ত্র) — OWASP পরিবারগুলোর ক্ষেত্রে CodeQL-এর সঙ্গে ওভারল্যাপ করে; এর baseline-কে একটি র্যাচেটের সঙ্গে সংযুক্ত করুন অথবা বাদ দিন।

---

## সম্পর্কিত ডকুমেন্টেশন

- সাপ্লাই-চেইন (উৎসের প্রমাণ, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — কী-সেট সমতা গেট

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, জব `i18n-ui-coverage`)।
প্রতিটি `src/i18n/messages/<locale>.json`-এর লিফ কী সেটকে `en.json`-এর সঙ্গে তুলনা করে এবং
কোনো লিফ অনুপস্থিত বা অতিরিক্ত হলে ব্যর্থ হয়, কীটি কখন যোগ করা হয়েছিল তা নির্বিশেষে। `__MISSING__:`
প্লেসহোল্ডারকে উপস্থিত হিসেবে গণ্য করা হয় (এর বিষয়বস্তু রেশিও গেটের আওতাধীন)। এটি দুটি
ডিফ-ভিত্তিক/শতাংশ গেটের সম্পূর্ণ পরিপূরক: `check-ui-keys-coverage` প্রতি লোকেলে 80 % ন্যূনতম সীমা
প্রয়োগ করে (~13,000টির মধ্যে 43টি কী অনুপস্থিত থাকলেও ফলাফল 99.7 % দেখায়), আর
`check-new-key-coverage` শুধু কোনো PR-এর মাধ্যমে `en.json`-এ যোগ করা কীগুলো বিচার করে। একটি লোকেল
ব্যাচের ব্রাঞ্চ কাটার দিনের `en.json` থেকে সেটি তৈরি হয় এবং কয়েক দিন ধরে অনুবাদ চলে, যখন বেসে
নতুন কী যোগ হতে থাকে; ব্যাচ PR নিজে কোনো কী যোগ করে না, তাই ব্যাচ 1 (#13044) নয়টি লোকেলে 43টি
কী কম নিয়ে এবং ব্যাচ 2 (#13660) আটটি লোকেলে 10টি কী কম নিয়ে মার্জ হওয়ার সময় উভয় সহযোগী গেটই
নীরব ছিল (2026-09-15)। ব্যর্থতা ঠিক করতে চালান
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; কোনো `extra` লিফের
অর্থ হলো উৎস থেকে সেটি বাদ দেওয়া হয়েছে — লোকেল থেকেও সেটি মুছে দিন। `--warn` ব্যর্থ না করেই
রিপোর্ট করে। `--catalog=cli` একই তুলনা `bin/cli/locales`-এর ওপর চালায়
(`npm run i18n:check-keys:cli`); উভয় ধাপই `i18n-ui-coverage` জবে রয়েছে।

#### `check-new-key-coverage` — নতুন-কী i18n গেট

`check-ui-value-drift`-এর সহযোগী। সেটি এমন কোনো ইংরেজি মান শনাক্ত করে যা **পুনর্লিখিত** হয়েছে,
কিন্তু যার অনুবাদগুলো অপরিবর্তিত রয়ে গেছে; আর এটি এমন কোনো ইংরেজি কী শনাক্ত করে যা **যোগ করা**
হয়েছে, কিন্তু কিছু লোকেল কখনো সেটি পায়নি।

`check-ui-keys-coverage` এই শ্রেণিটি দেখতে পারে না: এটি প্রতি লোকেলে একটি শতাংশভিত্তিক ন্যূনতম
সীমা প্রয়োগ করে, আর ~13,000টি লিফের মধ্যে এগারোটি কী অনুপস্থিত থাকলেও কভারেজ 99.9% থাকে।
ভাষাপ্রতি একটি শতাংশ দিয়ে "এই ফিচারটি অনূদিত না হয়েই প্রকাশিত হয়েছে" প্রকাশ করা যায় না — কোনো
নতুন লোকেলে একটি সম্পূর্ণ ফিচার কোনো টেক্সট ছাড়াই যুক্ত হতে পারে, অথচ সংখ্যাটি একটুও বদলাবে না।

এটি যে ঘটনাটি নথিবদ্ধ করে: Orchestration Canvas-এর Phase 3-এর এগারোটি কী সেই সময়ে বিদ্যমান
42টি লোকেলে অনুবাদ করা হয়েছিল। কয়েক ঘণ্টা পরে EU-ভাষার ব্যাচ (#13044) রিপোজিটরিতে লোকেলের
সংখ্যা 51-এ নিয়ে যায়, এবং নতুন নয়টি লোকেল (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
কখনোই সেগুলো পায়নি। কোনো কী অনুপস্থিত থাকলে `deepMergeFallback` তার জায়গায় ইংরেজি ব্যবহার করে,
তাই ব্যর্থতার ধরনটি ফাঁকা UI নয়, বরং অনূদিত না হওয়া UI ছিল — বাস্তব, এবং নকশাগতভাবেই নীরব।

এর সহযোগীর মতো এটিও **ডিফ-সচেতন**; এটি মার্জ বেসের ইংরেজির সঙ্গে ওয়ার্কিং ট্রির তুলনা করে, তাই
আগে থেকে থাকা ঘাটতিগুলো অপরিবর্তিত থাকে এবং গেটটি চালু করতে কোনো মাইগ্রেশনের প্রয়োজন হয়নি।

**কোনো `__MISSING__:<english>` মার্কার এটি সন্তুষ্ট করে না (2026-09-17 থেকে)।** আগে এটিই ছিল
নথিভুক্তভাবে স্থগিত রাখার পদ্ধতি — রানটাইম সঠিক ইংরেজিতে ফলব্যাক করে — যতক্ষণ না 2026-09-16-এ
আটটি ফিচার PR 61টি কী যোগ করে এবং অনুবাদ করার পরিবর্তে সব 65টি লোকেলে মার্কার বসিয়ে দেয়:
এই গেট প্রতিটিই গ্রহণ করেছিল, কোনো কিছুই PR-গুলোকে আটকে দেয়নি, এবং পরে রিলিজ টিপে সবার জন্য
ব্লকিং প্রকৃত-অনুবাদ রেশিও গেট ব্যর্থ হয়েছিল (pt-BR 3.2 % > 2.5 % + 0.5)। এখন একটি মার্কারকে
অনুপস্থিত অনুবাদ হিসেবে বিচার করা হয়। ব্যর্থতা ঠিক করতে চালান
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, অথবা
সব লোকেলের জন্য সমান্তরালে চালান `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, ডিট্যাচড অবস্থায় নিরাপদ, `OMNIROUTE_TRANSLATION_*` env
ছাড়া শুরু হতে অস্বীকার করে)। যে কী অবশ্যই ইংরেজিতে রাখতে হবে (স্থির করা পণ্য/ইঞ্জিন/ফ্ল্যাগের নাম),
সেটি `scripts/i18n/untranslatable-keys.json`-এ থাকবে, কখনোই কোনো মার্কারের আড়ালে নয়। `vi`-তে
মার্কার সম্পূর্ণ নিষিদ্ধ (`tests/unit/i18n-vi-completeness.test.ts`)।

#### `check-vitest-exclusions` — স্থগিত-টেস্ট গেট

`vitest.config.ts`-এর `exclude` তালিকায় থাকা কোনো ফাইল হলো এমন একটি টেস্ট যা চালানো হয় না, অথচ
ট্রি পড়া ব্যক্তির কাছে সেটিকে কভারেজের অংশ বলে মনে হয়। বাষট্টিটি ফাইল
`// #8618 — pre-existing failure; remove this exclusion when fixed` মন্তব্যটির আড়ালে জমা হয়েছিল।
Issue #8618 2026-08-11 তারিখে বন্ধ করা হয়েছিল, কিন্তু সেটি যে তালিকা ট্র্যাক করত তা 45টি এন্ট্রি
থেকে বেড়ে 62টিতে পৌঁছায়; প্রতিটি নতুন এন্ট্রি একটি বন্ধ হয়ে যাওয়া ইস্যুর দিকে নির্দেশকারী
মন্তব্য উত্তরাধিকারসূত্রে পেয়েছিল। অবশেষে তালিকাটি ফাইল ধরে ধরে পরিমাপ করা হলে (#13204),
**62টির মধ্যে 51টি বর্তমান ট্রির বিপরীতে কোনো সোর্স পরিবর্তন ছাড়াই পাস করেছিল**।

গেটটির শর্ত হলো, বাস্তব কোনো ফাইলে রিজলভ হওয়া প্রতিটি এক্সক্লুশনকে (a) একটি ট্র্যাকিং ইস্যুর নাম
উল্লেখ করতে হবে এবং (b) তার পরিমাপ করা স্ট্যাটাসসহ `config/quality/vitest-exclusions.json`-এ থাকতে
হবে, যাতে নতুন কোনো এক্সক্লুশন যোগ করা 60-এন্ট্রির অ্যারেতে আরেকটি লাইন হওয়ার বদলে একটি নিবেদিত
ফাইলে পর্যালোচনাযোগ্য ডিফ হয়। এটি ইচ্ছাকৃতভাবে বাদ দেওয়া টেস্টগুলো পুনরায় চালায় না — তাতে
~10 মিনিট সময় লাগে এবং সেটি পর্যায়ক্রমিক জবের আওতাধীন; প্রতিটি টেস্ট শেষ কবে পরিমাপ করা হয়েছিল,
ইনভেন্টরিতে তা নথিবদ্ধ থাকে।
