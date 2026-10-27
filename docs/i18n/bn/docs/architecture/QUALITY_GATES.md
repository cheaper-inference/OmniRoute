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

CI এবং Quality Gates ওয়ার্কফ্লো—প্রতিটি একটি স্থিতিশীল সিদ্ধান্ত প্রকাশ করে: `Gate / CI` এবং
`Gate / Quality`। এগুলোর সংস্করণযুক্ত গ্রহণ নীতিতে প্রতিটি আপস্ট্রিম জবকে
আবশ্যিক বা পরামর্শমূলক হিসেবে তালিকাভুক্ত করা হয়। প্রযোজ্য কোনো আবশ্যিক জব অবশ্যই সফল হতে হবে:
অনুপস্থিত, বাতিল, এড়িয়ে যাওয়া, অপেক্ষমাণ এবং অজানা ফলাফল PASS প্রতিষ্ঠা করতে পারে না। বৈধ
শুধু-ডকস বা শুধু-ক্যাটালগ শ্রেণিবিন্যাস একটি কোড লেনকে অপ্রযোজ্য করতে পারে;
কোনো খসড়া PR গ্রহণযোগ্য প্রার্থী নয়। একটি `hotfix` লেবেল প্রমাণের আবশ্যকতা মওকুফ করে না।

উভয় ওয়ার্কফ্লোই main/release ব্রাঞ্চে আসা PR, `main`-এ push, ম্যানুয়াল dispatch
এবং merge-group ইভেন্ট কভার করে। Push, dispatch এবং merge-group পূর্ণ নির্বাচন চালায়। `release/**`-এ
push এগুলো শুরু করে না (2026-10-18): প্রতিটি পরিবর্তন ইতিমধ্যেই তার PR-এ ম্যাট্রিক্স চালিয়েছে
এবং মার্জ করা সমন্বয়টি Release-Green-এর দায়িত্ব (`docs/ops/RUNNER_BOX.md` → হোস্টেড লেন)। Fork
এবং merge group এমন জবের জন্য হোস্টেড runner ব্যবহার করে, যেগুলো অন্যথায় self-hosted
runner নির্বাচন করে; রোলআউটের আগে পর্যাপ্ত হোস্টেড সক্ষমতা যাচাই করতে হবে।

প্রতিটি JSON রসিদ checkout করা SHA, ওয়ার্কফ্লো run এবং attempt শনাক্ত করে।
CLI কোনো checkout/event SHA অমিল প্রত্যাখ্যান করে। ওয়ার্কফ্লো পরীক্ষাগুলো নীতির সদস্যতাকে
সিদ্ধান্ত জবের `needs` তালিকার সঙ্গে আবদ্ধ করে, যাতে নতুন বা সরানো কোনো লেন নীরবে অদৃশ্য হতে না পারে।
রসিদগুলো তাদের নিজস্ব ওয়ার্কফ্লো কভার করে, প্রকাশনা, ডিপ্লয়মেন্ট বা বিদ্যমান
পরামর্শমূলক scanner-এর অভ্যন্তরীণ কার্যক্রম নয়। ব্রাঞ্চের নিয়মে উভয় check name সক্রিয় করা
একটি পৃথক প্রশাসনিক পরিবর্তন; এসব জব যোগ করলেই কোনো ব্রাঞ্চ সুরক্ষিত হয় না।

### গ্রহণযোগ্যতা রিডিউসারে সংরক্ষিত প্রমাণ

`scripts/quality/validate-release-acceptance.mjs` সরবরাহ করা একটি পরিকল্পনা এবং তার
manifest-গুলোকে রিডিউস করে; এটি নিশ্চিত করে না যে পরিকল্পনাটি সম্পূর্ণ release pipeline কভার করে।
এর রিপোর্টগুলো স্পষ্টভাবে `releaseAcceptance: false` নির্ধারণ করে, এমনকি সেই পরিকল্পনা
`VERIFIED` হলেও। `release-acceptance.yml` ওয়ার্কফ্লো এখনও বাস্তব build, package, boot
বা promotion receipt-এর পরিবর্তে shadow fixture ব্যবহার করে।

সংরক্ষিত প্রমাণ যাচাই করতে CLI-এর `--evidence-root` আবশ্যক। ফাইলগুলো
`<evidence-root>/<artifact_id>/<member>` হিসেবে resolve করা হয় এবং SHA-256 দিয়ে hash করা হয়। প্রমাণহীন
কোনো PASS রেকর্ড, অনুপস্থিত বা পরিবর্তিত ফাইল, অনিরাপদ path বা symlink
যাচাইকরণ প্রতিরোধ করে। অনুপস্থিত ফাইল খালি সফল log-এর সমতুল্য নয়। বিদ্যমান
SHA/run/attempt যাচাইগুলো স্বাধীন থাকে: মিলে যাওয়া byte কোনো পুরোনো
রসিদকে গ্রহণযোগ্য করতে পারে না। ফাইলের অখণ্ডতা এক্সিকিউশনের সত্যতা বা artifact promotion-এর প্রমাণ নয়।

### UI এক্সিকিউশন সক্ষমতা

CI সম্পূর্ণ UI ইনভেন্টরিকে চারটি `test-vitest` ম্যাট্রিক্স shard হিসেবে চালায়, প্রতিটি shard-এ সর্বোচ্চ
দুইজন worker এবং বিদ্যমান 15-মিনিটের জব সময়সীমা থাকে। প্রথম shard MCP/autoCombo Vitest suite-ও
চালায়। আবশ্যিক জবের ফলাফল প্রতিটি matrix leg কভার করে; একটি shard-এর ব্যর্থতা
বা বাতিল হওয়া প্রার্থী গ্রহণ প্রতিষ্ঠা করতে পারে না।

nightly observer প্রতিটি UI shard-এর জন্য আলাদা exact-candidate রসিদ সংরক্ষণ করে,
যার মধ্যে প্রথম রসিদে MCP এক্সিকিউশনও অন্তর্ভুক্ত থাকে। চারটি রসিদ, log এবং মিলে যাওয়া
execution identity—সবই আবশ্যক। স্থানীয় `npm run test:vitest:ui` এখনও
সম্পূর্ণ suite নির্বাচন করে; একটি `--shard` run কেবল আংশিক প্রমাণ।

### ইউনিট কভারেজ সংগ্রহ

বারোটি unit shard তাদের বিদ্যমান test execution-এর সময় V8 coverage সংগ্রহ করে। একটি সফল
shard মধ্যবর্তী Istanbul report তৈরি না করেই মূল ফাইলগুলো সংকুচিত করতে
`scripts/ci/compact-v8-coverage.mjs` চালায়। চূড়ান্ত Coverage জব candidate SHA, runtime,
source root এবং data hash-এর বিপরীতে বারোটি manifest-ই যাচাই করে, এরপর c8-এর reporter
এবং বিদ্যমান coverage threshold চালায়। Input-গুলোতে c8-এর global filename order বজায় থাকে;
মিশ্র function/block coverage-এর ক্ষেত্রে প্রতি-shard pre-merging অনিরাপদ।
অনুপস্থিত, বিকৃত বা অসামঞ্জস্যপূর্ণ shard গ্রহণ ব্যর্থ করে। ব্যর্থ test shard-এর raw diagnostic coverage
আলাদাভাবে সংরক্ষিত হয়; এটি চূড়ান্ত merge-এ প্রবেশ করতে পারে না।

### স্ট্যাটিক স্ক্যান ইনভেন্টরি

সংস্করণযুক্ত npm-alias ইনভেন্টরি এবং static-scan সদস্যতা
`config/quality/gate-manifest.json`-এ থাকে। `package.json`-এর বিপরীতে script name এবং সঠিক command
যাচাই করতে `npm run check:gate-manifest` চালান; সংযোজন, অপসারণ এবং
command drift স্থানীয় hook ও CI-এর change-classification job—উভয়ই ব্যর্থ করে।
কোনো alias একটি workflow job, matrix instance বা test case নয়: এই সংখ্যাগুলোকে
পারস্পরিক বিনিময়যোগ্য হিসেবে উপস্থাপন করা যাবে না।

নির্বাচিত alias-গুলো execute না করে পরিদর্শন করতে `npm run quality:scan -- --list` অথবা
`npm run quality:scan:fast -- --list` ব্যবহার করুন। runner npm entrypoint invoke করে,
তাই এর runtime—যেখানে কনফিগার করা আছে সেখানে Bun-সহ—সংরক্ষিত থাকে।
manifest ওই profile-গুলোর বাইরের alias-গুলোকে আলাদাভাবে invoke করা হিসেবে নথিভুক্ত করে এবং
read-only scan profile-এ maintenance command নিষিদ্ধ।

এই profile-গুলো কেবল static scan কভার করে। এগুলো product test,
coverage, packaging, external check বা কোনো প্রার্থীর পূর্ণ release acceptance প্রত্যয়িত করে না।
ওয়ার্কফ্লো গ্রহণ সংযুক্ত `config/quality/admission-policy.json` এবং
`scripts/quality/admission-verdict.mjs` ব্যবহার করে। Release-observer profile আলাদা থাকে;
এগুলোর প্রযোজ্য check এবং receipt স্বাধীনভাবে পরিদর্শন করুন। পূর্ণ observer-এর static
command-গুলো `config/quality/release-green-static-profile.json`-এ ঘোষণা করা আছে, যার মধ্যে
`audit:deps`, mutation-test selection এবং translation check অন্তর্ভুক্ত। loader npm
command-গুলোকে package.json এবং মডেল করা CI/Quality declaration-এর বিপরীতে যাচাই করে; shell token-কে
argument হিসেবে execute করার পরিবর্তে এটি drift প্রত্যাখ্যান করে। আবশ্যিক scanner-এর SKIP/INCOMPLETE output
PASS প্রতিষ্ঠা করতে পারে না। profile তার external exclusion-গুলো নথিভুক্ত করে এবং
hosted coverage, test matrix, package বা deployment evidence-এর বিকল্প নয়। নিচের গদ্যভিত্তিক ইনভেন্টরিটি
একটি রেফারেন্স, কোনো gate বাস্তবে চলেছিল তার প্রমাণ নয়।

Script-গুলো `scripts/check/` (policy gate) এবং `scripts/quality/` (ratchet engine)-এর অধীনে থাকে।
CI-এর সত্যের উৎস হলো `.github/workflows/ci.yml`।

### Release PR দ্রুত-পথ (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main`-এ push,
dispatch এবং merge group-এ CI-এর পরিপূরক হিসেবে কাজ করে। PR-এ path-filtered দ্রুত check ব্যবহৃত হয়। স্থায়ীভাবে
নিষ্ক্রিয় duplicate build সরিয়ে ফেলা হয়েছে; প্রকৃত build/package/boot check-গুলো CI-তেই রয়েছে।

| Job                                              | পরিধি                                                                                                                                                                                                             | বাধ্যতামূলক     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR; API docs ref এবং docs-all                                                                                                                                                                           | হ্যাঁ           |
| `Fast Quality Gates`                             | Code PR; static check, typecheck, dashboard typecheck, প্রভাবিত unit test                                                                                                                                         | হ্যাঁ           |
| `Forgotten sibling tests`                        | Code PR; পরিবর্তিত module থেকে static consumer এবং সম্ভাব্য sibling test পর্যন্ত trace করা হয়; barrel এবং dynamic-import path-গুলো advisory diagnostic হিসেবে report করা হয়, সঙ্গে উল্লেখিত allowlist exception | **পরামর্শমূলক** |
| `Vitest (fast-path)`                             | Code PR; দ্রুত vitest suite                                                                                                                                                                                       | হ্যাঁ           |
| `Unit Tests fast-path`                           | Code PR; 4-shard unit suite                                                                                                                                                                                       | হ্যাঁ           |
| `No new ESLint warnings`                         | Code PR; suppression-aware lint guard                                                                                                                                                                             | হ্যাঁ, fork-সহ  |
| `Merge integrity (changelog + generated skills)` | Non-draft PR; changelog এবং generated skill sync                                                                                                                                                                  | হ্যাঁ, fork-সহ  |

#### ভুলে যাওয়া sibling test-এর report

`npm run check:forgotten-sibling-tests` test-impact map-এর অন্তর্নিহিত import resolver পুনরায় ব্যবহার করে।
প্রতিটি পরিবর্তিত production module-এর জন্য, সম্ভাব্য
test-টি pull-request diff-এ অনুপস্থিত থাকলে এটি নির্ধারিত
`changed module/symbol -> static consumer -> candidate sibling test` chain report করে। যেকোনো বাধ্যতামূলক rollout-এর আগে calibration-এর জন্য Markdown summary এবং JSON result
`forgotten-sibling-tests` workflow artifact হিসেবে সংরক্ষিত থাকে।

Barrel re-export এবং dynamic import কেবল resolution diagnostic; এগুলো কখনোই
বাধ্যতামূলক finding তৈরি করে না। পর্যালোচিত exception-গুলো
`config/quality/forgotten-sibling-allowlist.json`-এ থাকে। প্রতিটি entry-তে consumer এবং সম্ভাব্য
test-এর নাম, একটি সুনির্দিষ্ট rationale এবং একটি GitHub issue বা pull request-এর link থাকতে হবে। ত্রুটিপূর্ণ entry
ডিফল্টভাবে failure ঘটায়। কোনো exception মুছে ফেলা সম্ভাব্য test বা `.skip`/`.todo` যোগ করা diff-কে suppress করতে পারে না;
assertion দুর্বল করা এবং অন্যান্য masking স্বাধীনভাবে বাধ্যতামূলক
`check:test-masking` gate-এর আওতায় থাকে।

### Job: `lint`

`main`-এ যাওয়া প্রতিটি PR-এ চলে। ব্যর্থ হলে merge block করে।

| স্ক্রিপ্ট (`npm run ...`)         | যা যাচাই করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ব্লকিং                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js সংস্করণটি সমর্থিত সীমার মধ্যে রয়েছে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:cycles`                    | সম্পূর্ণ `src/` + `open-sse/` জুড়ে সার্কুলার ইমপোর্ট (AST-ভিত্তিক, tsconfig `paths` সমাধান করা হয়েছে)। কোনো সাইকেল থাকলেই মূল কমান্ড exit 1 করে (fail-closed, #15281 থেকে) এবং SCC-গুলো তালিকাভুক্ত করে। `check:cycles:ratchet` (যা CI চালায়) তখন ব্লক করে, যখন সংখ্যা `quality-baseline.json`-এর `metrics.cycles` ঊর্ধ্বসীমা ছাড়িয়ে যায় — বর্তমানে 14, `direction: down`, তাই এটি কেবল কমতে পারে (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ (র্যাচেট)                             |
| `check:boundary`                  | `open-sse → src` কাপলিং: ইঞ্জিন থেকে অ্যাপে অনন্য ফাইল-টু-ফাইল ইমপোর্ট (`scripts/quality/measure-boundary.mjs`; এজ তালিকাটি v4 কোর/মডিউল-বিভাজন সংশোধনের ব্যাকলগ)। মূল কমান্ড = পরামর্শমূলক প্রতিবেদন (`quality:boundary`-এর মতোই)। `check:boundary:ratchet` (যা CI চালায় এবং `quality.yml` fast-gates র্যাচেট লুপেও রয়েছে) তখন ব্লক করে, যখন সংখ্যা `quality-baseline.json`-এর `metrics.boundaryOpenSseToSrc` ঊর্ধ্বসীমা ছাড়িয়ে যায় — পরিমাপকৃত 771 দিয়ে প্রাথমিক মান নির্ধারিত, `direction: down`; `--update` কেবল এটিকে কমায়; PR-এ বেস-রিলেটিভ (`--base-ref`, নিচে দেখুন)                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ (র্যাচেট)                             |
| `check:route-validation:t06`      | সব রুটে Zod স্কিমা উপস্থিত রয়েছে (Tier 6 নীতি)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | হ্যাঁ                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any`-এর সংখ্যা বাজেট অতিক্রম করে না (Tier 11 গেট)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | হ্যাঁ                                       |
| `check:provider-consistency`      | `providers.ts`-এর প্রতিটি provider-এর জন্য `providerRegistry.ts`-এ একটি মিলে যাওয়া এন্ট্রি রয়েছে (এবং বিপরীতটিও, allowlist-এর সীমার মধ্যে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:model-lifecycle`           | হাতে রক্ষণাবেক্ষণ করা তিনটি routing table, check-in করা lifecycle snapshot-এর (#11503) সঙ্গে সামঞ্জস্যপূর্ণ থাকে: `FITNESS_TABLE` (`taskFitness.ts`) এমন কোনো অবসরপ্রাপ্ত id-কে স্কোর করে না, যেটিতে `REGISTRY` route করতে পারে; প্রতিটি `BUILT_IN_ALIASES` target `REGISTRY`-তে উপস্থিত এবং অবসরপ্রাপ্ত-id snapshot-এ অনুপস্থিত; `REGISTRY`-তে এখনও থাকা প্রতিটি অবসরপ্রাপ্ত id forward করা হয়েছে অথবা `allowedRetiredInCatalog`-এ তালিকাভুক্ত; এবং কোনো `DEFAULT_DEGRADATION_MAP` source বা target ওই snapshot-এ অবসরপ্রাপ্ত হিসেবে উপস্থিত নেই। এটি প্রমাণ করে না যে কোনো model বর্তমানে সক্রিয় upstream দ্বারা পরিবেশিত হচ্ছে। Offline — `config/quality/model-lifecycle.json`-এর সঙ্গে তুলনা করে, যা `npm run quality:refresh-model-lifecycle` দিয়ে হাতে refresh করা হয় (network; CI-এর সঙ্গে সংযুক্ত নয়)। `allowedRetiredInCatalog` একটি burn-down ratchet: কেবল tracking issue থাকলেই একটি এন্ট্রি যোগ করুন। | হ্যাঁ                                       |
| `check:fetch-targets`             | client-side `src/`-এর প্রতিটি `fetch("/api/...")` একটি বাস্তব `route.ts`-এ resolve করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | হ্যাঁ                                       |
| `check:deps`                      | repo-র প্রতিটি `package.json` জুড়ে `npm install`-যোগ্য সব deps `dependency-allowlist.json`-এ রয়েছে; নতুন unpinned বা slopsquatted package-কে চিহ্নিত করা হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                       |
| `audit:deps`                      | পাঁচটি স্বতন্ত্র lockfile-এর (root, Electron, OpenCode plugins v1/v2 এবং provider) npm audit। Critical advisory block করে; high advisory দৃশ্যমান warning হিসেবে থাকে। অনুপস্থিত/ব্যর্থ audit-গুলো INCOMPLETE এবং block করে; প্রতিটি scope-এর lock hash ও report সংরক্ষণ করা হয়।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | হ্যাঁ                                       |
| `check:lockfile`                  | `package-lock.json`-এর অখণ্ডতা — https রেজিস্ট্রি, অখণ্ডতা হ্যাশ, কোনো হোস্ট ওভাররাইড নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ                                       |
| `check:licenses`                  | প্রোডাকশন ডিপেন্ডেন্সিগুলোর জন্য SPDX লাইসেন্স অনুমোদন-তালিকা                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `check:tracked-artifacts`         | কোনো বিল্ড আর্টিফ্যাক্ট / কমিট করা `node_modules` সিমলিংক নেই (husky pre-commit-এও চলে; pre-push ইচ্ছাকৃতভাবে হালকা — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:ai-attribution`            | PR কমিট, শিরোনাম বা বডিতে কোনো AI/bot `Co-Authored-By` ট্রেইলার বা AI-জেনারেশন ফুটার নেই — কঠোর নিয়ম #16 (`quality.yml`-এর PR→`release/**`-এর fast-gates লুপে — ইভেন্ট পেলোড পড়ে, PR না হলে কিছুই করে না — এবং `ci.yml` lint-এ PR→`main`-এর জন্য শুধুমাত্র PR-ভিত্তিক একটি ধাপ; এছাড়াও husky `commit-msg` হুক; মানব সহ-লেখক অনুমোদিত; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | প্রতিটি Vitest এক্সক্লুশনে একটি ট্র্যাকিং ইস্যুর উল্লেখ থাকে এবং সেটি `config/quality/vitest-exclusions.json`-এ উপস্থিত থাকে (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ                                       |
| `check:file-size`                 | সোর্স ফাইলগুলো (`src/`, `open-sse/`, `electron/`, `bin/`-এর `.ts`/`.tsx`) `cap`-এর মধ্যে এবং টেস্ট ফাইলগুলো (`*.test.ts(x)`) `testCap`-এর মধ্যে থাকে; `file-size-baseline.json`-এ ফ্রিজ করা ফাইলগুলো (`frozen` / `testFrozen`) তাদের রেকর্ড করা আকারের চেয়ে বড় হওয়া চলবে না                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                       |
| `check:error-helper`              | executors/handlers-এ ত্রুটি প্রতিক্রিয়াগুলো `buildErrorBody()` / `sanitizeErrorMessage()` ব্যবহার করে (কঠোর নিয়ম #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                       |
| `check:migration-numbering`       | Migration SQL ফাইলগুলো কোনো ফাঁক বা সদৃশ নম্বর ছাড়াই ধারাবাহিকভাবে নম্বরযুক্ত                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                       |
| `check:public-creds`              | `publicCreds.ts`-এর বাইরে কোনো আক্ষরিক OAuth `client_id`/`client_secret` বা Firebase Web কী নেই (কঠোর নিয়ম #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                       |
| `check:db-rules`                  | `src/lib/db/` মডিউলগুলোর বাইরে কোনো raw SQL নেই; `localDb.ts` থেকে কোনো barrel-import নেই (কঠোর নিয়ম #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:known-symbols`             | dispatch table-এ নিবন্ধিত provider executor, routing strategy এবং translator-গুলো ডিস্কে থাকা ফাইলগুলোর সঙ্গে মেলে—কোনো অনাথ বা অঘোষিত symbol নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | হ্যাঁ                                       |
| `check:route-guard-membership`    | child process তৈরি করে এমন প্রতিটি route `isLocalOnlyPath()` দ্বারা শ্রেণিবদ্ধ (কঠোর নিয়ম #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                       |
| `check:test-discovery`            | রিপোর প্রতিটি `*.test.ts` / `*.spec.ts` ফাইল অন্তত একটি টেস্ট রানার দ্বারা সংগ্রহ করা হয় (র্যাচেট: `test-discovery-baseline.json`-এর অনাথ তালিকা কেবল ছোট হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `check:test-tla-order`            | `tests/unit`-এর অধীনে কোনো `node:test` ফাইল একটি টেস্ট নিবন্ধন করে, টপ-লেভেল `await`-এ পৌঁছায়, তারপর আরও টেস্ট নিবন্ধন করে না (#18045; র্যাচেট: `test-tla-order-allowlist.json` কেবল ছোট হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                       |
| `check:agent-skills-sync`         | জেনারেট করা এজেন্ট-স্কিলস আর্টিফ্যাক্টগুলো তাদের সোর্স ক্যাটালগের সঙ্গে মেলে (কোনো বিচ্যুতি নেই)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | প্রোভাইডারের লোগো/অ্যাসেটগুলোর জন্য একটি নথিভুক্ত উৎস-তথ্য এন্ট্রি রয়েছে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON কনফিগ ফাইলগুলো পার্স হয় এবং রিপোর লিন্ট নিয়ম পূরণ করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | ত্রুটি ছাড়া TypeScript কম্পাইলেশন (শুধু পরামর্শমূলক সতর্কতা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `typecheck:noimplicit:core`       | কঠোর `noImplicitAny` — ভবিষ্যৎমুখী; আগে থেকে থাকা অনেক কল সাইটে এখনও অ্যানোটেশন প্রয়োজন                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **পরামর্শমূলক** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`-এ সীমাবদ্ধ `tsc` (#7033) — `typecheck:core`-এর বাছাইকৃত 27-ফাইলের অনুমোদন তালিকায় কোনো dashboard TSX অন্তর্ভুক্ত নেই এবং `next build`-ও কখনো এটিকে টাইপ-চেক করে না (`next.config.mjs`-এ `ignoreBuildErrors: true` সেট করা আছে), তাই সেখানকার অনাথ-আইডেন্টিফায়ার রিগ্রেশনগুলো (#6625/#6909) CI-এর কাছে অদৃশ্য ছিল। একটি স্থিরীকৃত প্রতি-ফাইল/প্রতি-TS-কোড ত্রুটি-সংখ্যার বেসলাইনের (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`-এর মতো একই অচলতা-প্রয়োগের প্যাটার্ন) সঙ্গে পার্থক্য নির্ণয় করে — বেসলাইনে থাকা সংখ্যার অতিরিক্ত কেবল নতুন ত্রুটিগুলোই গেটকে ব্যর্থ করে; আগে থেকে থাকা কোনো ত্রুটি ঠিক হলে `--update` দিয়ে র্যাচেট কমান।                                                                                                                                                                                                                       | হ্যাঁ                                       |

### কাজ: `quality-gate`

`test-coverage`-এর পরে চলে। ব্যর্থ হলে মার্জ অবরুদ্ধ করে।

| স্ক্রিপ্ট                    | যা যাচাই করে                                                                                                                                                                     | অবরোধকারী                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` তৈরি করে (ESLint সতর্কতার সংখ্যা, একীভূত শার্ড রিপোর্ট থেকে কভারেজ)                                                                                       | হ্যাঁ (র্যাচেটের আপস্ট্রিম) |
| `quality:ratchet`            | `quality-baseline.json`-এর প্রতিটি মেট্রিকের অবনতি হয়নি (ESLint সতর্কতা ≤ বেসলাইন; কভারেজ ≥ বেসলাইন)                                                                            | হ্যাঁ                       |
| `check:duplication`          | কোডের পুনরাবৃত্তি (jscpd@4) `quality-baseline.json`-এর বেসলাইন অতিক্রম করে না                                                                                                    | হ্যাঁ                       |
| `check:complexity`           | ফাইল-স্তরের সাইক্লোম্যাটিক জটিলতা সীমা অতিক্রম করে না (মূল ESLint `complexity` + `max-lines-per-function`)                                                                       | হ্যাঁ                       |
| `check:cognitive-complexity` | কগনিটিভ জটিলতার র্যাচেট (`eslint-plugin-sonarjs`) — পৃথক ESLint পাস; CI উভয়টিকে একীভূত করে একক `check:complexity-ratchets` ধাপ হিসেবে চালায়                                    | হ্যাঁ                       |
| `check:dead-code`            | অব্যবহৃত এক্সপোর্ট/ফাইলের র্যাচেট (knip) বেসলাইনের তুলনায় খারাপ হয় না                                                                                                          | হ্যাঁ                       |
| `check:compression-budget`   | কম্প্রেশন বেঞ্চমার্ক বাজেট — প্রতি-ইঞ্জিন টোকেন-সাশ্রয়ের ন্যূনতম সীমার অবনতি হওয়া চলবে না                                                                                      | হ্যাঁ                       |
| `check:type-coverage`        | টাইপযুক্ত শতাংশের র্যাচেট (`type-coverage`) খারাপ হয় না; এটি মূলত `typecheck:noimplicit:core`-কে অন্তর্ভুক্ত করে                                                                | হ্যাঁ                       |
| `check:codeql-ratchet`       | খোলা CodeQL সতর্কতার সংখ্যা বাড়ে না (`gh api` দিয়ে পড়ে; টোকেন না থাকলে সুষ্ঠুভাবে এড়িয়ে যায়) — রিফ্রেশের সময়সূচি ও ম্যানুয়াল ট্রিগারের জন্য নিচের "CodeQL র্যাচেট" দেখুন | হ্যাঁ                       |

### কাজ: `quality-extended`

কাজটি প্রযোজ্য প্রার্থীদের অবরুদ্ধ করে। বান্ডলের আকার, গোপন তথ্যের সন্ধান, দুর্বলতার
সন্ধান, ওয়ার্কফ্লোর সন্ধান এবং OpenAPI পরিবর্তনগুলো আবশ্যিক র্যাচেটের মাধ্যমে পরীক্ষা করা হয়।
সার্কুলার-ডিপেন্ডেন্সি ডায়াগনস্টিক কেবল পরামর্শমূলক থাকে। স্ক্যানার ইনস্টল করা আবশ্যক:
`scripts/ci/install-quality-scanners.sh` পিন করা সংস্করণগুলো প্রস্তুত করে এবং
ইনস্টলেশন ব্যর্থতাগুলো ছড়িয়ে দেয়। অনুপস্থিত টুল, অবৈধ রিপোর্ট বা অনুপস্থিত বেসলাইন
আবশ্যিক স্ক্যানার গেটকে INCOMPLETE অবস্থায় রাখে।

| স্ক্রিপ্ট                | যা যাচাই করে                                                                                                                                                                                                                   | ব্লকিং                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:circular-deps`    | কোনো চক্রাকার নির্ভরতা নেই (dpdm)                                                                                                                                                                                              | **পরামর্শমূলক**                              |
| `check:bundle-size`      | বান্ডলের আকার নির্ধারিত সীমা অতিক্রম করে না; পরিমাপ অনুপলভ্য হলে যাচাই ব্যর্থ হয়                                                                                                                                              | **--ratchet সহ ব্লকিং**                      |
| `check:secrets`          | Gitleaks-এর অনুসন্ধানগুলোর অবনতি হয় না; আবশ্যিক স্ক্যানগুলোতে টুল/সোর্স/বেসলাইন অনুপস্থিত থাকলে, স্ক্যান ব্যর্থ হলে এবং রিপোর্ট অবৈধ হলে তা প্রত্যাখ্যাত হয়                                                                  | **--ratchet সহ ব্লকিং**                      |
| `check:vuln-ratchet`     | ডিপেন্ডেন্সির দুর্বলতাগুলোর অবনতি হয় না; আবশ্যিক স্ক্যানগুলোতে টুল অনুপস্থিত থাকলে, রিপোর্ট অবৈধ হলে অথবা বেসলাইন অনুপস্থিত থাকলে তা প্রত্যাখ্যাত হয়                                                                         | **--ratchet সহ ব্লকিং**                      |
| `check:workflows`        | ওয়ার্কফ্লো লিন্ট (actionlint + zizmor); স্ক্যানার অনুপস্থিত/বিকল হলে, রিপোর্ট অবৈধ হলে অথবা ratchet বেসলাইন অনুপস্থিত থাকলে INCOMPLETE হিসেবে ব্যর্থ হয়। বৈধ অনুসন্ধানগুলো নির্বাচিত strict/advisory/ratchet নীতি অনুসরণ করে | সম্পাদন আবশ্যিক; CI-তে zizmor ratchet ব্লকিং |
| `check:openapi-breaking` | পিন করা ইভেন্ট কমিটগুলোর বিপরীতে পাবলিক API চুক্তি (PR merge-base, push before, merge-group base; নির্ধারিত/ম্যানুয়াল checkout-এর first parent); আবশ্যিক পরিমাপ ব্যর্থ হলে বন্ধ অবস্থায় ব্যর্থ হয়                           | **--ratchet সহ ব্লকিং**                      |

### কাজ: `docs-sync-strict`

`main` বা `release/**`-এ পাঠানো পুল রিকোয়েস্টের ক্ষেত্রে এই জব কেবল খসড়া নয় এমন (অথবা বিশ্বস্ত সারির) প্রার্থীদের জন্য চলে, যেগুলোকে ডকুমেন্টেশন বা কোডের পরিবর্তন হিসেবে শ্রেণিবদ্ধ করা হয়েছে। PR নয় এমন CI ইভেন্টেও এটি চলে; এই ওয়ার্কফ্লোর push ট্রিগার শুধু `main`-এর জন্য, `release/**`-এর জন্য নয়। কোনো ধাপ শূন্য ছাড়া অন্য প্রস্থান কোড দিয়ে শেষ হলে জবটি ব্যর্থ হয়; শুধু প্রতিবেদনে দেখানো ফলাফল ও নিচে নথিভুক্ত ব্যতিক্রমগুলো তা ঘটায় না।

| স্ক্রিপ্ট                      | যা যাচাই করে                                                                                                                                                                                                                                                                                                                                       | ব্লকিং                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | নিচের ৭টি উপ-গেট ধারাবাহিকভাবে চালানো মেটা-গেট                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                                                                                                      |
| ↳ `check:docs-sync`            | প্যাকেজ/OpenAPI/CHANGELOG-এর সংস্করণের সামঞ্জস্য, `llm.txt`-এর হুবহু প্রতিলিপি, অনূদিত CHANGELOG-এর বিভাগ ও আকারের অপরিবর্তনীয় শর্ত এবং নতুন নথি দ্বারা প্রতিস্থাপিত সদৃশ নথির অনুপস্থিতি                                                                                                                                                         | হ্যাঁ                                                                                                                      |
| ↳ `check:docs-frontmatter`     | কম্পাইল করা ডকুমেন্টেশন পৃষ্ঠাগুলোতে বৈধ frontmatter শিরোনাম রয়েছে                                                                                                                                                                                                                                                                                | হ্যাঁ                                                                                                                      |
| ↳ `check:docs-counts`          | উচ্চ নির্ভরযোগ্যতার গণনাসংক্রান্ত অপরিবর্তনীয় শর্তগুলো কঠোরভাবে প্রয়োগ করা হয়; ফাইলের সংখ্যার আনুমানিক যাচাইগুলো কেবল সতর্ক করে, যদি না স্ক্রিপ্টকে `--strict` দেওয়া হয় (CI-এর মেটা-গেট এটি দেয় না)                                                                                                                                          | কঠোর স্তর বাধা দেয়; শিথিল স্তর পরামর্শমূলক                                                                                |
| ↳ `check:env-doc-sync`         | স্পষ্ট উপেক্ষা-তালিকা, শুধু নথিতে থাকা এবং শুধু পরিবেশে থাকা ভেরিয়েবলের অনুমোদন-তালিকা প্রয়োগ করার পর সোর্স কোডে পড়া পরিবেশ ভেরিয়েবল, `.env.example` ও `docs/reference/ENVIRONMENT.md` পরস্পরের সঙ্গে মেলে                                                                                                                                     | হ্যাঁ, নথিভুক্ত অনুমোদন-তালিকার বাইরে                                                                                      |
| ↳ `check:deprecated-versions`  | উপেক্ষিত নথি বাদ দিয়ে, নিরাপদ ঐতিহাসিক প্রসঙ্গের বাইরে সম্ভাব্য পুরোনো সংস্করণ এবং পুরোনো হালনাগাদের তারিখগুলো জানায়                                                                                                                                                                                                                             | বর্তমান CI বিন্যাসে পরামর্শমূলক (`--strict` দেওয়া হয় না)                                                                 |
| ↳ `check:doc-links`            | docs-এর অভ্যন্তরীণ markdown লিংকগুলো বাস্তব ফাইলে resolve হয় (`[text]`/`(path)` রূপ)                                                                                                                                                                                                                                                              | হ্যাঁ                                                                                                                      |
| ↳ `check:fabricated-docs`      | docs-এ উল্লেখিত routes, env vars, CLI commands, hook names এবং file paths কোডবেসে বিদ্যমান। `--strict`-এর মাধ্যমে hard gate; ফ্ল্যাগ ছাড়া soft-fail।                                                                                                                                                                                              | হ্যাঁ (CI-তে `--strict`-এর মাধ্যমে)                                                                                        |
| `check:cli-i18n`               | CLI-তে ব্যবহৃত `t()` কী-গুলো `en`-এ আছে; `pt-BR` প্রতিটি শীর্ষস্তরের বিভাগ ধরে রাখে; `zh-CN` ও `zh-TW`-এ `en`-এর প্রতিটি কী আছে                                                                                                                                                                                                                    | হ্যাঁ                                                                                                                      |
| `check:openapi-coverage`       | OpenAPI spec বাস্তব routes-এর অন্তত ratchet-নির্ধারিত ন্যূনতম সীমা কভার করে                                                                                                                                                                                                                                                                        | হ্যাঁ                                                                                                                      |
| `check:openapi-security-tiers` | ঘোষিত `x-loopback-only`/`x-always-protected` অ্যানোটেশনের সমর্থন `routeGuard.ts`-এ থাকতে হবে; পার্সারের ত্রুটি ও সামনের দিকের যাচাইয়ে অমিল বাধা দেয়। কেবল স্থানীয় ব্যবহারের উপসর্গগুলোর অধীনে `x-loopback-only` অনুপস্থিত কি না, তার বিপরীতমুখী যাচাই কেবল সতর্ক করে; শুধু প্যাটার্ন দিয়ে নির্ধারিত রুটগুলো এই বিপরীতমুখী যাচাই থেকে বাদ যায়। | পার্সার ও সামনের দিকের যাচাই বাধা দেয়; বিপরীতমুখী যাচাই পরামর্শমূলক                                                       |
| `check:openapi-routes`         | যুক্তিসহ নির্ধারিত `KNOWN_STALE_SPEC` অনুমোদন-তালিকা প্রয়োগের পর, `openapi.yaml`-এর প্রতিটি `/api...` পাথ প্যারামিটারের পার্থক্য উপেক্ষা করে একটি বাস্তব রুটের সঙ্গে মেলে; অনুমোদন-তালিকার অচল এন্ট্রিও যাচাই ব্যর্থ করে                                                                                                                          | হ্যাঁ                                                                                                                      |
| `check:docs-symbols`           | প্রতিলিপি নয় এমন প্রামাণ্য নথির অভ্যন্তরীণ `/api/...` URL উল্লেখগুলো বাস্তব রুট বা রুট-পরিবারের সঙ্গে মেলে; প্রক্সি/আপস্ট্রিম/স্থানধারক/ফাইলের উল্লেখ এবং যুক্তিসহ রাখা `KNOWN_STALE_DOC_REFS` এন্ট্রি বাদ যায়, আর অনুমোদন-তালিকার অচল এন্ট্রি যাচাই ব্যর্থ করে                                                                                  | হ্যাঁ                                                                                                                      |
| `i18n translation drift`       | মূল অনূদিত নথিসমূহের উৎস ও লক্ষ্যের হ্যাশ `.i18n-state.json`-এর সঙ্গে মেলে। PR কেবল নতুন করে আনা উৎসের বিচ্যুতি, লক্ষ্য অনুপস্থিতি বা লক্ষ্যের হ্যাশের বিচ্যুতির কারণে ব্যর্থ হয়; PR নয় এমন যাচাইগুলো কঠোর। PR-এ উত্তরাধিকারসূত্রে আসা বিচ্যুতি এবং পুরোনো লক্ষ্যের উৎস-হ্যাশের জন্য সতর্কতা দেওয়া হয়।                                         | PR-এ নতুন বিচ্যুতি ও PR-এর বাইরের কঠোর বিচ্যুতি-যাচাই বাধা দেয়; উত্তরাধিকারসূত্রে আসা বা পুরোনো অবস্থার ফলাফল পরামর্শমূলক |

`docs/diagrams/`-এর বারোটি README SVG `scripts/docs/gen-readme-<name>.mjs` দিয়ে তৈরি হয়; `npm run docs:readme-diagrams` সবগুলো আবার তৈরি করে।
প্রতিটির জন্য বাইট ধরে তুলনা করা একটি ইউনিট টেস্ট আছে (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` জব), যা রিপোজিটরিতে কমিট করা ফাইল পুরোনো হয়ে গেলে ব্যর্থ হয়।
`check:docs-counts` তাদের `<text>` নোড থেকে প্রামাণ্য সংখ্যাগুলো পড়ে; তাই সংখ্যাগুলো কখনো আঁকা পাথের রূপরেখায় রূপান্তর করা হয় না।
SVG-এর প্রামাণ্য সংখ্যার পরীক্ষাটি `SVG_DIAGRAM_FILES`-এ (`scripts/check/check-docs-counts-sync.mjs`) তালিকাভুক্ত ফাইলগুলো পড়ে: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`।
চিরকাল বিনামূল্যের প্রোভাইডার, ক্যাটালগ এন্ট্রি, পুনরাবৃত্ত পুল ও স্কোরিং ফ্যাক্টর সম্পর্কিত দাবিগুলোর পরীক্ষাও `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` পড়ে।
`free-tier-budget.svg` বর্তমান ক্যাটালগ লোডার থেকে সংখ্যা নেয়, তাই `FREE_MODEL_BUDGETS` বা কোনো প্রোভাইডারের প্রদর্শিত নাম বদলালে ফাইলটি আবার তৈরি না করা পর্যন্ত CI ব্যর্থ হয়।

### কাজ: `i18n-ui-coverage`

| স্ক্রিপ্ট                         | যা যাচাই করে                                                                                                                                                                                     | ব্লকিং          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check-ui-keys-coverage` (ইনলাইন) | UI i18n কী কভারেজ ≥ 65%                                                                                                                                                                          | হ্যাঁ           |
| `check-ui-value-drift` (ইনলাইন)   | পুনর্লিখিত ইংরেজি **মানের** কোনো অচল অনুবাদ অবশিষ্ট নেই                                                                                                                                          | হ্যাঁ           |
| `check-new-key-coverage` (ইনলাইন) | একটি **নতুন** ইংরেজি কী প্রতিটি লোকেলে অনূদিত — একটি `__MISSING__:` মার্কার প্রত্যাখ্যাত হয়                                                                                                     | হ্যাঁ           |
| `check-translation-ratio`         | প্রতি লোকেলে প্রকৃত-অনুবাদের অনুপাত (ইংরেজির সঙ্গে অভিন্ন / প্লেসহোল্ডার / অনুমোদন-তালিকার বাইরে অনুপস্থিত লিফ) অবশ্যই `config/quality/i18n-translation-baseline.json` + স্ল্যাক অতিক্রম করবে না | **পরামর্শমূলক** |

`fetch-depth: 0` প্রয়োজন — ভ্যালু-ড্রিফ গেটটি মার্জ বেসের বিপরীতে `en.json`-এর ডিফ করে।

#### `check-ui-value-drift` — অচল-অনুবাদ গেট

এটি সেই একমাত্র i18n রিগ্রেশন শনাক্ত করে, যা অন্য গেটগুলো কাঠামোগতভাবে দেখতে পারে না: কোনো ইংরেজি মান
পুনর্লিখিত হয় এবং _আগের_ ইংরেজি থেকে তৈরি অনুবাদগুলো রয়ে যায়, ফলে
অ-ইংরেজি ব্যবহারকারীরা আত্মবিশ্বাসী ভাষায় লেখা, কিন্তু এখন ভুল, কপি পড়তে থাকেন।

এটি বাস্তবেই রিলিজ হয়েছিল। Antigravity লগইন হেল্পার যুক্ত হওয়ার সময় (#5203)
`oauthModal.googleOAuthWarning` পুনর্লিখিত হয়েছিল; **43টি লোকেলের মধ্যে 39টিতে** অপারেটরদের "সম্পূর্ণ
URL কপি করে নিচে পেস্ট করতে" বলা টেক্সট রয়ে গিয়েছিল — এমন একটি প্রবাহ, যা ওই প্রোভাইডারের ক্ষেত্রে সম্পন্নই হতে পারে না। এটি
#8463 পর্যন্ত নজরে আসেনি, কারণ:

- `sync-ui-keys` শুধু **অনুপস্থিত** কী ব্যাকফিল করে, **অচল** কী কখনো নয়;
- `check-ui-keys-coverage` কী-এর _উপস্থিতি_ গণনা করে, তাই একটি অচল অনুবাদও কভার্ড হিসেবে গণ্য হয়;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ডকুমেন্টেশন মিররগুলো ট্র্যাক করে —
  এটি কখনো `src/i18n/messages/*.json` পড়ে না। 2026-09 পুনঃসিঙ্কের পর থেকে `docs-sync-strict` জবে ব্লকিং:
  কোনো মূল ডক সম্পাদনা করুন → `npm run i18n:run -- --files=<doc>` (সেকশন-লেভেল, কম ব্যয়বহুল)।

**ডিফ-সচেতন, বেসলাইন-সমর্থিত নয়।** এটি মার্জ বেসের `en.json`-কে
ওয়ার্কিং ট্রির সঙ্গে তুলনা করে; যেসব কী-এর ইংরেজি মান পরিবর্তিত হয়েছে, সেগুলোর জন্য কোনো লোকেলে যদি
অপরিবর্তিত অনুবাদ থেকে যায়, সেটি অচল। এটি ইচ্ছাকৃতভাবে **আগে থেকে থাকা ঋণ স্থির করে রাখে** — দীর্ঘদিনের কোনো অনুবাদ
কোন পুরোনো ইংরেজি থেকে এসেছে, তা ডিফ দিয়ে জানা যায় না; তাই গেটটি শুধু বর্তমান পরিবর্তনে স্পর্শ করা বিষয়গুলোই
বিচার করে। বিকল্পটি (প্রতি-কী হ্যাশ বেসলাইন) তৈরি করা হলে একটি ~600 KB জেনারেটেড ফাইল লাগত,
যা বিদ্যমান বৃহত্তম বেসলাইনের 3× এবং প্রতিটি i18n PR-এ পরিবর্তিত হতো।

এটি সন্তুষ্ট করার দুটি উপায়:

1. প্রভাবিত অনুবাদগুলো আপডেট করুন, অথবা
2. সেগুলোকে `__MISSING__:<new english>` হিসেবে সেট করুন — এরপর রানটাইম সংশোধিত ইংরেজি সরবরাহ করে
   (`src/i18n/request.ts::deepMergeFallback`, #7258) এবং কী-টি অনুবাদের সারিতে যুক্ত হয়।

স্ট্রিংটির **অর্থ** পরিবর্তিত হয়ে থাকলে, **কী-এর নাম পরিবর্তন** করাই ভালো: একটি নতুন কী অচল
অনুবাদ উত্তরাধিকারসূত্রে পেতে পারে না। #8463-এ এই প্যাটার্নই ব্যবহার করা হয়েছিল।

```bash
npm run i18n:check-value-drift          # কঠোর (CI যা চালায়)
npm run i18n:check-value-drift:warn     # শুধু রিপোর্ট
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

বেস ক্যাটালগ পড়া না গেলে (বেস ref ছাড়া শ্যালো
ক্লোন), `check-openapi-breaking`-এর আচরণ অনুসরণ করে `SKIP reason=base-unresolved` সহ 0 এক্সিট করে।

### জব: `i18n`

সম্পূর্ণ i18n যাচাইকরণ ম্যাট্রিক্স (প্রতি লোকেলে একটি জব)। পুরো জবটি পরামর্শমূলক।

| স্ক্রিপ্ট                       | যা যাচাই করে                     | ব্লকিং                                               |
| ------------------------------- | -------------------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | প্রতি লোকেলে অনুবাদের সম্পূর্ণতা | **পরামর্শমূলক** (পুরো জবে `continue-on-error: true`) |

### জব: `pr-test-policy`

শুধু পুল রিকোয়েস্টে চলে।

| স্ক্রিপ্ট              | যা যাচাই করে                                                                                                                                             | ব্লকিং |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | যেসব PR `src/`, `open-sse/`, `electron/`, অথবা `bin/`-এর প্রোডাকশন কোড পরিবর্তন করে, সেগুলোতে অবশ্যই টেস্ট অন্তর্ভুক্ত বা আপডেট করতে হবে (কঠোর নিয়ম #8) | হ্যাঁ  |
| `check:test-masking`   | পরিবর্তিত টেস্ট ফাইলগুলো মোট অ্যাসার্টের সংখ্যা কমায় না বা `assert.ok(true)` টটোলজি যোগ করে না                                                          | হ্যাঁ  |
| `check:pr-evidence`    | PR বডিতে পরিবর্তনের জন্য টেস্ট/VPS প্রমাণ উল্লেখ করা হয়েছে (PR-এর গদ্য grep করে কঠোর নিয়ম #18 যান্ত্রিকভাবে প্রয়োগ করে — ভঙ্গুর, Backlog দেখুন)       | হ্যাঁ  |

### জব: `test-vitest`

`build`-এর পরে চলে। ব্যর্থ হলে মার্জ ব্লক করে।

| স্যুট            | যা যাচাই করে                                             | ব্লকিং                                                                                                                   |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP সার্ভার (110টি টুল), autoCombo, ক্যাশ — vitest রানার | হ্যাঁ                                                                                                                    |
| `test:vitest:ui` | UI কম্পোনেন্ট টেস্ট — vitest রানার                       | **ব্লকিং** — আগে থেকে থাকা ব্যর্থতাগুলো `vitest.config.ts`-এ স্পষ্টভাবে বাদ দেওয়া হয়েছে; নতুন ব্যর্থতায় জব ব্যর্থ হয় |

### নাইটলি ওয়ার্কফ্লো (নির্ধারিত, পরামর্শমূলক)

এগুলো cron সময়সূচি অনুযায়ী (এবং `workflow_dispatch`-এর মাধ্যমে) চলে, PR-এ কখনোই চলে না। সবগুলোই পরামর্শমূলক।

| ওয়ার্কফ্লো            | যা যাচাই করে                                                                                                                                                    | ব্লকিং          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | র্যান্ডম সিড ও উচ্চ রান সংখ্যা সহ fast-check প্রপার্টি টেস্ট                                                                                                    | **পরামর্শমূলক** |
| `nightly-resilience`   | হিপ-বৃদ্ধি গেট, ক্যাওস ফল্ট-ইনজেকশন, k6 লোড/সোক                                                                                                                 | **পরামর্শমূলক** |
| `nightly-llm-security` | promptfoo ইনজেকশন গার্ড (ব্লক মোড) + garak প্রোব (প্রোভাইডার সিক্রেট না থাকলে বাদ দেওয়া হয়)                                                                   | **পরামর্শমূলক** |
| `nightly-schemathesis` | `docs/openapi.yaml` ব্যবহার করে লাইভ OmniRoute-এর বিরুদ্ধে OpenAPI কন্ট্র্যাক্ট ফাজিং (schemathesis) — স্পেক লঙ্ঘন / আনহ্যান্ডলড 500 প্রকাশ করে (পর্যায় 8 B.4) | **পরামর্শমূলক** |
| `nightly-mutation`     | দ্রুত ইউনিট লেনের ওপর Stryker মিউটেশন-টেস্টিং স্কোর — টিকে থাকা মিউট্যান্টগুলো দুর্বল অ্যাসার্ট প্রকাশ করে                                                      | **পরামর্শমূলক** |
| `nightly-compat`       | সমর্থিত `engines.node` রেঞ্জজুড়ে Node ইঞ্জিন সামঞ্জস্যতা ম্যাট্রিক্স                                                                                           | **পরামর্শমূলক** |

পারফরম্যান্স বেসলাইনগুলো (হিপ, TTFB, বিল্ড সময়) রেকর্ড করা হয়, গেট করা হয় না: দেখুন [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)।

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

আগে থেকে বিদ্যমান লঙ্ঘনের কারণে ব্যর্থ হতে পারে না—এমন প্রতিটি গেট একটি স্থির অনুমোদিত তালিকা ব্যবহার করে
(যেমন, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। নীতিটি হলো:

**মূল কারণটি সমাধান করুন; কেবল তখনই অনুমোদিত তালিকা ব্যবহার করুন, যখন লঙ্ঘনটি আগে থেকেই বিদ্যমান এবং
একই PR-এ সমাধান করা সম্ভব নয়।**

অনুমোদিত তালিকায় কোনো এন্ট্রি যোগ করার সময়:

1. যৌক্তিকতা ব্যাখ্যা করে একটি মন্তব্য অন্তর্ভুক্ত করুন।
2. ট্র্যাকিং ইস্যুটি উল্লেখ করুন (যেমন, `// #3498 — Phase 2 feature, not yet implemented`)।
3. যে PR-এ লঙ্ঘনটি সমাধান করা হয়, সেই PR-এই এন্ট্রিটি সরিয়ে ফেলুন—যে অচল এন্ট্রি আর কোনো সক্রিয় লঙ্ঘন
   দমন করে না, সেটি নিজেই একটি ত্রুটি (বাস্তবায়িত হওয়ার পর 6A.3 stale-enforcement কোনো অনাথ অনুমোদিত তালিকা এন্ট্রির
   কারণে গেটটিকে ব্যর্থ করবে)।

পরীক্ষাগুলোকে দ্রুত পাস করানোর জন্য অনুমোদিত তালিকায় এন্ট্রি যোগ করবেন **না**। ক্রমবর্ধমান
অনুমোদিত তালিকাসহ একটি সবুজ গেট গুণমান সম্পর্কে ভ্রান্ত ধারণা দেয়।

### আপনার PR-এ কোনো গেট ব্যর্থ হলে

1. **গেটের আউটপুট মনোযোগ দিয়ে পড়ুন**—কোন ফাইল বা সিম্বল নিয়মটি লঙ্ঘন করেছে, তা সেখানে সুনির্দিষ্টভাবে
   বলা থাকে।
2. **লঙ্ঘনটি সমাধান করুন**—বেশিরভাগ গেটই নির্ধারণযোগ্য ফাইলসিস্টেম যাচাই, যা কোড সঠিক হওয়ার সঙ্গে সঙ্গেই
   পাস করে।
3. **লঙ্ঘনটি আগে থেকেই বিদ্যমান হলে** (অর্থাৎ, আপনি এটি প্রবর্তন করেননি, কিন্তু গেটটি এখন
   এটিকে আওতাভুক্ত করছে): যৌক্তিকতার মন্তব্য এবং একটি ট্র্যাকিং ইস্যুসহ অনুমোদিত তালিকায় একটি এন্ট্রি যোগ করুন।
4. **গেটটি র্যাচেট হলে** (কভারেজ, ESLint সতর্কতা, ডুপ্লিকেশন, জটিলতা):
   আপনার পরিবর্তন মেট্রিকটিকে আরও খারাপ করেছে। অন্তর্নিহিত সমস্যাটি সমাধান করুন, অথবা (বিরল ক্ষেত্রে) পরিবর্তনটি
   ইচ্ছাকৃত এবং মেট্রিকের অবনতি গ্রহণযোগ্য হলে `npm run quality:ratchet -- --update` চালান—তবে PR-এর বিবরণে
   কারণটি নথিভুক্ত করুন।
5. **পরামর্শমূলক গেটগুলো** (`continue-on-error: true`) কেবল তথ্যের জন্য—এগুলো মার্জ
   ব্লক করে না, তবে CI সারাংশে দেখা যায়। তবুও এগুলো সমাধান করুন।

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

এই ইনভেন্টরিটি 2026-06-17 তারিখে `ci.yml`-এর সঙ্গে সমন্বয় করা হয়েছিল (আগের সংস্করণে
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` বাদ পড়েছিল)। সমন্বিত সেটটির একটি ROI পর্যালোচনায়
নিচের যৌক্তিকীকরণ প্রার্থীগুলো শনাক্ত হয়েছে। **মার্জগুলো যান্ত্রিক CI
পরিবর্তন; ফ্লিপ/বাদ দেওয়াগুলো অপারেটরের জন্য সংরক্ষিত নীতিগত সিদ্ধান্ত।** নিচের কোনো কিছুই
এখনও প্রয়োগ করা হয়নি।

**উপরেও নথিভুক্ত নয়** (পরামর্শমূলক, কম সংকেত): `docs-lint` জব
(markdownlint + Vale, পুরো জব `continue-on-error`) এবং স্বতন্ত্র স্ক্যানার ওয়ার্কফ্লো
`semgrep.yml` / `codeql.yml` / `scorecard.yml`। `semgrepFindings: 0`
`quality-baseline.json`-এ রয়েছে, কিন্তু `ci.yml`-এ কোনো ব্লকিং র্যাচেটের সঙ্গে সংযুক্ত নয় — মেট্রিকটি
বর্তমানে অনাথ।

### মার্জ / ডিডুপ (যান্ত্রিক, কম ঝুঁকি)

প্রতিটি প্রার্থীকে 2026-06-17 তারিখের সক্রিয় গেট অবস্থার বিপরীতে যাচাই করা হয়েছে (বিশ্বাস করুন, তবে যাচাইও করুন);
কয়েকটি "সুস্পষ্ট" মার্জ বাস্তবে ঋণ আড়াল করছিল এবং সেগুলো **পরিষ্কার ড্রপ-ইন নয়**।

- **`check:docs-sync` দুবার চলে** — `lint` জবে স্বতন্ত্রভাবে এবং আবার `check:docs-all` (`docs-sync-strict`)-এর ভেতরে ও husky pre-commit হুকে। ✅ **সম্পন্ন** — স্বতন্ত্র `lint` ইনভোকেশন সরানো হয়েছে।
- **CVE স্ক্যানিং** — ❌ **পরিষ্কার মার্জ নয়।** `audit:deps` পাঁচটি lockfile জুড়ে সংকটজনক অ্যাডভাইজরি ও অসম্পূর্ণ অডিট ব্লক করে, আর বর্তমান নীতির অধীনে উচ্চ-স্তরের অ্যাডভাইজরিগুলোকে সতর্কতা হিসেবে রিপোর্ট করে; `check:vuln-ratchet` (osv) কেবল চেক-ইন করা বেসলাইনের তুলনায় কোনো _রিগ্রেশন_ হলে ব্যর্থ হয় এবং প্রয়োজনীয় ক্ষেত্রে অনুপস্থিত পরিমাপ প্রত্যাখ্যান করে। অর্থগত আচরণ আলাদা — `audit:deps` বাদ দিলে পরম সংকটজনক গেট এবং স্বাধীন প্যাকেজ অডিট রসিদ হারিয়ে যাবে। দুটিই রাখুন।
- **সাইকেল শনাক্তকরণ** — ✅ **সম্পন্ন** (#15159 G-01/G-02)। এখানকার পুরোনো লেখায় `check:cycles`-কে "সবুজ, বাছাইকৃত" গেট বলা হয়েছিল এবং `check:circular-deps` (dpdm) 91টি সাইকেল রিপোর্ট করায় এটিকে ব্লকিং রাখার যৌক্তিকতা দেখানো হয়েছিল। সেই সবুজ অবস্থা ছিল একটি **মিথ্যা সবুজ**: `check:cycles` 5টি সাবডিরেক্টরি (450টি ফাইল) স্ক্যান করত, কেবল স্ট্যাটিক `import|export … from` মেলাত এবং প্রতিটি `@/` ও `@omniroute/open-sse/` স্পেসিফায়ার বাদ দিত, ফলে রিপোজিটরিতে প্রাধান্য পাওয়া dynamic-import + alias সাইকেলগুলো এটি দেখতে পেত না। সংশোধিত হয়েছে: গেটটি এখন `src` + `open-sse` (5023টি ফাইল) পরিভ্রমণ করে, TypeScript AST থেকে স্পেসিফায়ার সংগ্রহ করে (তাই `import("…")` গণনায় আসে এবং টাইপ-পজিশনের `typeof import("…")` আসে না), এবং tsconfig `paths` রিজলভ করে। এটি 0 নয়, **14টি** সাইকেল খুঁজে পায়। আগে থেকেই থাকা 14টি সাইকেল একটি গেট PR-এ ঠিক করা সম্ভব নয় বলে `check:cycles` এখন একটি **র্যাচেট** (`--ratchet`, `quality-baseline.json`-এ সীমা `metrics.cycles.value = 14`, `direction: down`) — এটি যেকোনো _রিগ্রেশন_ ব্লক করে এবং সংখ্যা কেবল কমতে পারে। CI-তে `npm run check:cycles:ratchet` চলে। ক্রমান্বয়ে কমানোর কাজটি **A-01**-এর সঙ্গে চলবে। বিস্তৃত দ্বিতীয় মতামত হিসেবে `check:circular-deps` (dpdm) পরামর্শমূলক অবস্থায় থাকবে।
- **জটিলতা** — ✅ **সম্পন্ন** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): একটি ESLint পরিভ্রমণ, ruleId অনুযায়ী গণনা—যাতে cyclomatic+max-lines এবং cognitive বেসলাইন স্বাধীন থাকে; স্থানীয় `--update`-এর জন্য পৃথক `check:complexity` / `check:cognitive-complexity` বহাল আছে।
- **`/api` অ্যান্টি-হ্যালুসিনেশন** — ✅ **সম্পন্ন** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-এর একটি FS ইনভেন্টরি, openapi-routes + docs-symbols এখনও স্বাধীনভাবে রিপোর্ট করে; স্থানীয়ভাবে চালানোর জন্য পৃথকগুলো বহাল আছে।
- **`check:node-runtime` 11টি জবে চলে** — ⚠️ **কম ROI।** প্রতিটি পৃথক runner এবং চেকটি <1s; মোট সাশ্রয় ~10s, যার বিপরীতে প্রতি-জবের একটি সস্তা গার্ড হারাতে হবে। এই পরিবর্তনের ঝামেলার উপযুক্ত নয়।
- **CI lint-এ `typecheck:noimplicit:core`** — ✅ **lint জব থেকে সরানো হয়েছে** (পরামর্শমূলক `continue-on-error` ছিল); ব্লকিং টাইপ সারফেস হলো `typecheck:core` + `check:type-coverage`। স্থানীয় স্ক্রিপ্ট বহাল রাখা হয়েছে।

### ফ্লিপ / সিদ্ধান্ত (অপারেটর নীতি)

- `check:openapi-security-tiers` (পরামর্শমূলক) — ❌ **পরিষ্কারভাবে ফ্লিপযোগ্য নয়।** এটি 0 দিয়ে প্রস্থান করে, কিন্তু সতর্ক করে যে `LOCAL_ONLY_API_PREFIXES`-এর অধীনে থাকা কয়েকটি `traffic-inspector` রুটে `x-loopback-only: true` অ্যানোটেশন নেই। এটি বলবৎ করার আগে `openapi.yaml`-এ ওই অ্যানোটেশনগুলো যোগ করতে হবে।
- `typecheck:noimplicit:core` (পরামর্শমূলক) — ব্লকিং `check:type-coverage` র্যাচেটের মাধ্যমে এটি অনেকাংশেই অন্তর্ভুক্ত। এটিকে র্যাচেটে ফ্লিপ করুন অথবা অপ্রয়োজনীয় দ্বিতীয় `tsc` পাসটি বাদ দিন।
- `test:vitest:ui` (এখন **ব্লকিং**) — আগে থেকে থাকা ব্যর্থতাগুলো `vitest.config.ts`-এ `// #8618` ট্র্যাকিং মন্তব্যসহ স্পষ্টভাবে বাদ দেওয়া আছে; নতুন ব্যর্থতায় জব ব্যর্থ হবে।
- `check:secrets` (gitleaks, ব্লকিং র্যাচেট) — বর্তমান সীমা হলো `quality-baseline.json`-এর `metrics.secretFindings`। যেকোনো ব্যতিক্রমের জন্য `.gitleaks.toml`-এ যুক্তিসংগত এন্ট্রি প্রয়োজন; পরিমাপ অনুপলব্ধ হলে অবস্থা INCOMPLETE। স্ক্যানটি GitHub-এর নেটিভ secret scanning এবং `check:public-creds`-এর পরিপূরক।
- `check:pr-evidence` (ব্লকিং, PR-body-এর গদ্য grep করে) — false-positive-এর উচ্চ ঝুঁকি; বাদ দিলে Hard Rule #18-এর প্রয়োগ দুর্বল হয়, তাই এটি সত্যিকারের একটি নীতিগত সিদ্ধান্ত।
- `semgrep` (পরামর্শমূলক স্বতন্ত্র) — OWASP পরিবারগুলোর ক্ষেত্রে CodeQL-এর সঙ্গে ওভারল্যাপ করে; এর বেসলাইনকে একটি র্যাচেটের সঙ্গে সংযুক্ত করুন অথবা বাদ দিন।

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
