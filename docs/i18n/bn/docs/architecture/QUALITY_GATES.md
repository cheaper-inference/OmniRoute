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

### প্রার্থী ভর্তি (Candidate admission)

CI এবং Quality Gates ওয়ার্কফ্লো প্রত্যেকে একটি স্থিতিশীল রায় (verdict) প্রদান করে: `Gate / CI` এবং
`Gate / Quality`। এদের সংস্করণযুক্ত ভর্তি নীতি প্রতিটি আপস্ট্রিম জবকে required বা advisory
হিসেবে তালিকাভুক্ত করে। একটি প্রযোজ্য required জব অবশ্যই সফল হতে হবে: missing,
cancelled, skipped, pending এবং unknown ফলাফল PASS প্রতিষ্ঠা করতে পারে না। একটি বৈধ
docs-only বা catalog-only শ্রেণীবিন্যাস কোড লেনকে অপ্রযোজ্য করে তুলতে পারে;
একটি draft PR গৃহীত প্রার্থী নয়। একটি `hotfix` লেবেল প্রমাণের (evidence) প্রয়োজনীয়তা মওকুফ করে না।

উভয় ওয়ার্কফ্লোই main/release ব্রাঞ্চে PR, `main`-এ push, manual dispatch
এবং merge-group ইভেন্ট কভার করে। Push, dispatch এবং merge-group সম্পূর্ণ নির্বাচন চালায়।
`release/**`-এ push এগুলো শুরু করে না (2026-10-18): প্রতিটি পরিবর্তন ইতিমধ্যে তার PR-এ
ম্যাট্রিক্স চালিয়েছে এবং মার্জ করা সমন্বয়টি Release-Green-এর কাজ (`docs/ops/RUNNER_BOX.md` → Hosted lane)। Fork
এবং merge group-গুলো এমন জবের জন্য hosted runner ব্যবহার করে যেগুলো অন্যথায় self-hosted
runner নির্বাচন করত; রোলআউটের আগে পর্যাপ্ত hosted ক্ষমতা যাচাই করতে হবে।

প্রতিটি JSON রসিদ (receipt) চেকআউট করা SHA, ওয়ার্কফ্লো রান এবং attempt শনাক্ত করে।
CLI একটি checkout/event SHA অমিল (mismatch) প্রত্যাখ্যান করে। ওয়ার্কফ্লো টেস্টগুলো নীতির সদস্যতাকে
verdict জবের `needs` তালিকার সাথে যুক্ত করে, যাতে একটি নতুন বা সরানো লেন নীরবে হারিয়ে যেতে না পারে।
রসিদগুলো তাদের নিজস্ব ওয়ার্কফ্লো কভার করে, প্রকাশনা (publication), ডিপ্লয়মেন্ট বা
বিদ্যমান advisory স্ক্যানারের অভ্যন্তরীণ বিষয় কভার করে না। ব্রাঞ্চ নিয়মে উভয় চেক নাম সক্রিয় করা একটি
পৃথক প্রশাসনিক পরিবর্তন; এই জবগুলো যোগ করা নিজে থেকেই একটি ব্রাঞ্চ সুরক্ষিত করে না।

### স্ট্যাটিক স্ক্যান ইনভেন্টরি

সংস্করণযুক্ত npm-alias ইনভেন্টরি এবং স্ট্যাটিক-স্ক্যান সদস্যতা
`config/quality/gate-manifest.json`-এ থাকে। স্ক্রিপ্ট নাম এবং সঠিক কমান্ডগুলো `package.json`-এর
বিপরীতে যাচাই করতে `npm run check:gate-manifest` চালান; সংযোজন, অপসারণ এবং
কমান্ড ড্রিফ্ট (drift) স্থানীয় হুক এবং CI-এর change-classification জব উভয়ই ব্যর্থ করে।
একটি alias কোনো ওয়ার্কফ্লো জব, ম্যাট্রিক্স ইনস্ট্যান্স বা টেস্ট কেস নয়: এই সংখ্যাগুলোকে
পরস্পরবিনিমেয় হিসেবে উপস্থাপন করা যাবে না।

নির্বাচিত alias-গুলো কার্যকর না করেই পরিদর্শন করতে `npm run quality:scan -- --list` বা
`npm run quality:scan:fast -- --list` ব্যবহার করুন। রানারটি npm
এন্ট্রিপয়েন্ট আহ্বান করে, তাই এর রানটাইম (যেখানে কনফিগার করা আছে সেখানে Bun সহ) সংরক্ষিত থাকে।
ম্যানিফেস্ট সেই প্রোফাইলগুলোর বাইরের alias-গুলোকে আলাদাভাবে আহূত (separately invoked) হিসেবে রেকর্ড করে,
এবং read-only স্ক্যান প্রোফাইলে রক্ষণাবেক্ষণ কমান্ড নিষিদ্ধ।

এই প্রোফাইলগুলো শুধুমাত্র স্ট্যাটিক স্ক্যান কভার করে। এরা প্রোডাক্ট টেস্ট,
কভারেজ, প্যাকেজিং, বাহ্যিক চেক বা কোনো প্রার্থীর সম্পূর্ণ রিলিজ গ্রহণযোগ্যতা প্রত্যয়িত করে না।
ওয়ার্কফ্লো ভর্তি সংযুক্ত `config/quality/admission-policy.json` এবং
`scripts/quality/admission-verdict.mjs` ব্যবহার করে। Release-observer প্রোফাইলগুলো পৃথক থাকে;
তাদের প্রযোজ্য চেক এবং রসিদ স্বাধীনভাবে পরিদর্শন করুন। নীচের গদ্য
ইনভেন্টরি একটি রেফারেন্স, কোনো গেট প্রকৃতপক্ষে চলেছিল তার প্রমাণ নয়।

স্ক্রিপ্টগুলো `scripts/check/` (নীতি গেট) এবং `scripts/quality/` (ratchet ইঞ্জিন) এর অধীনে থাকে।
CI-এর সত্যের উৎস হলো `.github/workflows/ci.yml`।

### রিলিজ PR ফাস্ট-পাথ (`quality.yml`)

`.github/workflows/quality.yml` main/release PR, `main`-এ push,
dispatch এবং merge group-এ CI-কে সম্পূরক করে। PR-গুলো path-filtered দ্রুত চেক ব্যবহার করে। স্থায়ীভাবে
নিষ্ক্রিয় করা ডুপ্লিকেট বিল্ড সরিয়ে দেওয়া হয়েছে; প্রকৃত build/package/boot চেকগুলো CI-তেই রয়ে গেছে।

| জব                                               | সুযোগ (Scope)                                                                                                                                                                                               | ব্লকিং         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR; API docs রেফারেন্স এবং docs-all                                                                                                                                                               | হ্যাঁ          |
| `Fast Quality Gates`                             | Code PR; স্ট্যাটিক চেক, typecheck, ড্যাশবোর্ড typecheck, প্রভাবিত unit টেস্ট                                                                                                                                | হ্যাঁ          |
| `Forgotten sibling tests`                        | Code PR; পরিবর্তিত মডিউলগুলো স্ট্যাটিক কনজিউমার এবং সম্ভাব্য sibling টেস্টে ট্রেস করা; barrel এবং dynamic-import পাথগুলো advisory ডায়াগনস্টিক হিসেবে রিপোর্ট করা হয়, রেফারেন্স করা allowlist ব্যতিক্রম সহ | **Advisory**   |
| `Vitest (fast-path)`                             | Code PR; দ্রুত vitest স্যুট                                                                                                                                                                                 | হ্যাঁ          |
| `Unit Tests fast-path`                           | Code PR; 4-shard unit স্যুট                                                                                                                                                                                 | হ্যাঁ          |
| `No new ESLint warnings`                         | Code PR; suppressions-সচেতন lint গার্ড                                                                                                                                                                      | হ্যাঁ, fork সহ |
| `Merge integrity (changelog + generated skills)` | Non-draft PR; changelog এবং generated skill সিঙ্ক                                                                                                                                                           | হ্যাঁ, fork সহ |

#### Forgotten sibling tests রিপোর্ট

`npm run check:forgotten-sibling-tests` টেস্ট-ইমপ্যাক্ট ম্যাপের অন্তর্নিহিত ইমপোর্ট রিজলভারটি পুনর্ব্যবহার করে।
প্রতিটি পরিবর্তিত প্রোডাকশন মডিউলের জন্য, ক্যান্ডিডেট টেস্টটি পুল-রিকোয়েস্ট ডিফে অনুপস্থিত থাকলে, এটি ডিটার্মিনিস্টিক
`changed module/symbol -> static consumer -> candidate sibling test` চেইন রিপোর্ট করে।
Markdown সারসংক্ষেপ এবং JSON ফলাফল যেকোনো ব্লকিং রোলআউটের আগে ক্যালিব্রেশনের উদ্দেশ্যে
`forgotten-sibling-tests` ওয়ার্কফ্লো আর্টিফ্যাক্ট হিসেবে সংরক্ষিত থাকে।

Barrel রি-এক্সপোর্ট এবং ডায়নামিক ইমপোর্ট শুধুমাত্র রেজোলিউশন ডায়াগনস্টিকস; এরা কখনোই ব্লকিং ফাইন্ডিং তৈরি করে না। পর্যালোচিত ব্যতিক্রমগুলো থাকে
`config/quality/forgotten-sibling-allowlist.json`-এ। প্রতিটি এন্ট্রিতে অবশ্যই কনজিউমার এবং ক্যান্ডিডেট
টেস্টের নাম উল্লেখ করতে হবে, একটি নির্দিষ্ট যুক্তি দিতে হবে, এবং একটি GitHub ইস্যু বা পুল রিকোয়েস্ট লিংক করতে হবে। গঠনগত ত্রুটিযুক্ত এন্ট্রিগুলো ফেইল-ক্লোজড হয়। ব্যতিক্রম দিয়ে মুছে ফেলা ক্যান্ডিডেট টেস্ট বা `.skip`/`.todo` যোগ করা ডিফকে দমন করা যায় না;
অ্যাসারশন দুর্বলকরণ এবং অন্যান্য মাস্কিং স্বতন্ত্রভাবে ব্লকিং করা
`check:test-masking` গেটের দায়িত্বেই থাকে।

### জব: `lint`

`main`-এ প্রতিটি PR-এ চলে। ব্যর্থ হলে মার্জ ব্লক করে।

| স্ক্রিপ্ট (`npm run ...`)         | যা যাচাই করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ব্লকিং                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js সংস্করণ সমর্থিত সীমার মধ্যে রয়েছে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:cycles`                    | সম্পূর্ণ `src/` + `open-sse/` জুড়ে সার্কুলার ইমপোর্ট (AST-ভিত্তিক, tsconfig `paths` রিজলভ করা)। Bare যেকোনো সাইকেল থাকলেই exit 1 করে (#15281 থেকে ফেইল-ক্লোজড) এবং SCC-গুলো তালিকাভুক্ত করে। `check:cycles:ratchet` (যা CI চালায়) ব্লক করে যখন সংখ্যা `quality-baseline.json`-এর `metrics.cycles` সিলিং অতিক্রম করে — বর্তমানে 14, `direction: down`, তাই এটি শুধু কমতে পারে (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ (ratchet)                             |
| `check:boundary`                  | `open-sse → src` কাপলিং: ইঞ্জিন থেকে অ্যাপে অনন্য ফাইল-টু-ফাইল ইমপোর্ট (`scripts/quality/measure-boundary.mjs`; এজ তালিকাটি v4 core/module-split রেমেডিয়েশন ব্যাকলগ)। Bare = পরামর্শমূলক রিপোর্ট (`quality:boundary`-এর মতোই)। `check:boundary:ratchet` (যা CI চালায়, এছাড়াও `quality.yml` fast-gates ratchet লুপেও রয়েছে) ব্লক করে যখন সংখ্যা `quality-baseline.json`-এর `metrics.boundaryOpenSseToSrc` সিলিং অতিক্রম করে — পরিমাপকৃত 771-এ সিড করা, `direction: down`; `--update` শুধু এটি কমায়; PR-গুলোতে base-relative (`--base-ref`, নিচে দেখুন)                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ (ratchet)                             |
| `check:route-validation:t06`      | সমস্ত রুটে Zod স্কিমা উপস্থিত (Tier 6 নীতি)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` সংখ্যা বাজেট অতিক্রম করে না (Tier 11 র্যাচেট)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ                                       |
| `check:provider-consistency`      | `providers.ts`-এ প্রতিটি provider-এর `providerRegistry.ts`-এ একটি সামঞ্জস্যপূর্ণ এন্ট্রি রয়েছে (এবং বিপরীতভাবেও, allowlist-এর মধ্যে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                       |
| `check:model-lifecycle`           | হাতে-রক্ষণাবেক্ষণ করা তিনটি রাউটিং টেবিল চেক-ইন করা লাইফসাইকেল স্ন্যাপশটের (#11503) সাথে সামঞ্জস্যপূর্ণ থাকে: `FITNESS_TABLE` (`taskFitness.ts`) এমন কোনো retired id-কে স্কোর করে না যা `REGISTRY` রাউট করতে পারে; প্রতিটি `BUILT_IN_ALIASES` টার্গেট `REGISTRY`-তে উপস্থিত এবং retired-id স্ন্যাপশটে অনুপস্থিত; `REGISTRY`-তে এখনও থাকা প্রতিটি retired id ফরওয়ার্ড করা হয়েছে অথবা `allowedRetiredInCatalog`-এ তালিকাভুক্ত; এবং কোনো `DEFAULT_DEGRADATION_MAP` সোর্স বা টার্গেট সেই স্ন্যাপশটে retired হিসেবে দেখা যায় না। এটি প্রমাণ করে না যে কোনো মডেল বর্তমানে একটি লাইভ আপস্ট্রিম দ্বারা পরিবেশিত হচ্ছে। অফলাইন — `config/quality/model-lifecycle.json`-এর সাথে তুলনা করে, যা হাতে `npm run quality:refresh-model-lifecycle` দিয়ে রিফ্রেশ করা হয় (নেটওয়ার্ক; CI-তে সংযুক্ত নয়)। `allowedRetiredInCatalog` হলো একটি burn-down র্যাচেট: শুধুমাত্র একটি ট্র্যাকিং ইস্যু সহ এন্ট্রি যোগ করুন। | হ্যাঁ                                       |
| `check:fetch-targets`             | ক্লায়েন্ট-সাইড `src/`-এ প্রতিটি `fetch("/api/...")` একটি প্রকৃত `route.ts`-এ রিজলভ হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ                                       |
| `check:deps`                      | রেপোর প্রতিটি `package.json` জুড়ে সমস্ত `npm install`-যোগ্য ডিপেন্ডেন্সি `dependency-allowlist.json`-এ রয়েছে; নতুন আনপিন করা বা slopsquat করা প্যাকেজগুলো ফ্ল্যাগ করা হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `audit:deps`                      | `npm audit` (root + electron) — কোনো high/critical অ্যাডভাইজরি নেই (osv `check:vuln-ratchet`-এর সাথে ওভারল্যাপ করে; Rationalization Backlog দেখুন)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `check:lockfile`                  | `package-lock.json` ইন্টিগ্রিটি — https রেজিস্ট্রি, ইন্টিগ্রিটি হ্যাশ, কোনো হোস্ট ওভাররাইড নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                       |
| `check:licenses`                  | প্রোডাকশন ডিপেন্ডেন্সিগুলোর জন্য SPDX লাইসেন্স অ্যালাউলিস্ট                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `check:tracked-artifacts`         | কোনো বিল্ড আর্টিফ্যাক্ট / কমিট করা `node_modules` সিমলিংক নেই (husky pre-commit-এও চলে; pre-push ইচ্ছাকৃতভাবে হালকা রাখা হয়েছে — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                       |
| `check:ai-attribution`            | PR কমিট, টাইটেল বা বডিতে কোনো AI/bot `Co-Authored-By` ট্রেইলার বা AI-জেনারেশন ফুটার নেই — হার্ড রুল #16 (PR→`release/**`-এর জন্য `quality.yml` fast-gates লুপে — ইভেন্ট পেলোড পড়ে, PR-এর বাইরে no-op — এবং PR→`main`-এর জন্য `ci.yml` lint-এ একটি PR-অনলি স্টেপ; এছাড়া husky `commit-msg` হুক; মানব সহ-লেখকদের অনুমতি আছে; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | প্রতিটি Vitest এক্সক্লুশন একটি ট্র্যাকিং ইস্যুর নাম উল্লেখ করে এবং `config/quality/vitest-exclusions.json`-এ উপস্থিত থাকে (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `check:file-size`                 | সোর্স ফাইলগুলো (`src/`, `open-sse/`, `electron/`, `bin/`-এ `.ts`/`.tsx`) `cap`-এর মধ্যে থাকে এবং টেস্ট ফাইলগুলো (`*.test.ts(x)`) `testCap`-এর মধ্যে থাকে; `file-size-baseline.json`-এ ফ্রোজন করা ফাইলগুলো (`frozen` / `testFrozen`) তাদের রেকর্ড করা সাইজের বাইরে বাড়তে পারবে না                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                       |
| `check:error-helper`              | এক্সিকিউটর/হ্যান্ডলারগুলোতে এরর রেসপন্সগুলো `buildErrorBody()` / `sanitizeErrorMessage()` ব্যবহার করে (কঠোর নিয়ম #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | হ্যাঁ                                       |
| `check:migration-numbering`       | মাইগ্রেশন SQL ফাইলগুলো ক্রমানুসারে নম্বরযুক্ত, কোনো ফাঁক বা ডুপ্লিকেট নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | হ্যাঁ                                       |
| `check:public-creds`              | `publicCreds.ts`-এর বাইরে কোনো আক্ষরিক OAuth `client_id`/`client_secret` বা Firebase Web কী নেই (কঠোর নিয়ম #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | হ্যাঁ                                       |
| `check:db-rules`                  | `src/lib/db/` মডিউলগুলোর বাইরে কোনো কাঁচা SQL নেই; `localDb.ts` থেকে কোনো barrel-import নেই (কঠোর নিয়ম #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                       |
| `check:known-symbols`             | তাদের ডিসপ্যাচ টেবিলে নিবন্ধিত প্রোভাইডার এক্সিকিউটর, রাউটিং স্ট্র্যাটেজি এবং ট্রান্সলেটরগুলো ডিস্কের ফাইলগুলোর সাথে মেলে — কোনো অনাথ বা অঘোষিত প্রতীক নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:route-guard-membership`    | প্রতিটি রুট যা চাইল্ড প্রসেস তৈরি করে তা `isLocalOnlyPath()` দ্বারা শ্রেণীবদ্ধ (কঠোর নিয়ম #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ                                       |
| `check:test-discovery`            | রিপোতে প্রতিটি `*.test.ts` / `*.spec.ts` ফাইল অন্তত একটি টেস্ট রানার দ্বারা সংগ্রহ করা হয় (র্যাচেট: `test-discovery-baseline.json`-এ অনাথ তালিকা কেবল সংকুচিত হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                       |
| `check:test-tla-order`            | `tests/unit`-এর অধীনে এমন কোনো `node:test` ফাইল নেই যা একটি টেস্ট নিবন্ধন করে, শীর্ষ-স্তরের `await`-এ পৌঁছে, তারপর আরও নিবন্ধন করে (#18045; র্যাচেট: `test-tla-order-allowlist.json` কেবল সংকুচিত হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `check:agent-skills-sync`         | জেনারেট করা agent-skills আর্টিফ্যাক্ট তাদের সোর্স ক্যাটালগের সাথে মেলে (কোনো ড্রিফট নেই)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | প্রোভাইডার লোগো/অ্যাসেটে একটি রেকর্ডকৃত প্রোভেন্যান্স এন্ট্রি থাকে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON কনফিগ ফাইল পার্স হয় এবং রিপোর লিন্ট নিয়ম পূরণ করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | TypeScript কম্পাইলেশন ত্রুটি ছাড়া (কেবল পরামর্শমূলক সতর্কতা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | হ্যাঁ                                       |
| `typecheck:noimplicit:core`       | কঠোর `noImplicitAny` — ভবিষ্যৎমুখী; অনেক পূর্ব-বিদ্যমান কল সাইটে এখনও অ্যানোটেশন প্রয়োজন                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **পরামর্শমূলক** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`-এ সীমাবদ্ধ `tsc` (#7033) — `typecheck:core`-এর নির্বাচিত ২৭টি ফাইলের অনুমতিতালিকায় কোনো dashboard TSX অন্তর্ভুক্ত নেই, এবং `next build`ও এটি কখনো টাইপ-চেক করে না (`next.config.mjs`-এ `ignoreBuildErrors: true` সেট করা), তাই সেখানকার orphaned-identifier রিগ্রেশনগুলো (#6625/#6909) CI-তে অদৃশ্য ছিল। একটি হিমায়িত প্রতি-ফাইল/প্রতি-TS-কোড গণনা বেসলাইনের (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`-এর মতোই stale-enforcement প্যাটার্ন) বিপরীতে তুলনা করে — শুধুমাত্র বেসলাইনকৃত গণনার বাইরের নতুন ত্রুটিগুলোই গেট ব্যর্থ করে; পূর্ব-বিদ্যমান ত্রুটি ঠিক হলে `--update` দিয়ে র্যাচেট নিচে নামান।                                                                                                                                                                                                                                      | হ্যাঁ                                       |

### জব: `quality-gate`

`test-coverage`-এর পরে চলে। ব্যর্থতায় মার্জ ব্লক করে।

| স্ক্রিপ্ট                    | যাচাই করে                                                                                                                                                                   | ব্লকিং                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` নির্গত করে (ESLint সতর্কতা সংখ্যা, মার্জ করা শার্ড রিপোর্ট থেকে কভারেজ)                                                                              | হ্যাঁ (র্যাচেটের আপস্ট্রিম) |
| `quality:ratchet`            | `quality-baseline.json`-এর প্রতিটি মেট্রিক রিগ্রেস হয়নি (ESLint সতর্কতা ≤ বেসলাইন; কভারেজ ≥ বেসলাইন)                                                                       | হ্যাঁ                       |
| `check:duplication`          | কোড ডুপ্লিকেশন (jscpd@4) `quality-baseline.json`-এর বেসলাইন অতিক্রম করে না                                                                                                  | হ্যাঁ                       |
| `check:complexity`           | ফাইল-স্তরের সাইক্লোম্যাটিক জটিলতা সীমা অতিক্রম করে না (কোর ESLint `complexity` + `max-lines-per-function`)                                                                  | হ্যাঁ                       |
| `check:cognitive-complexity` | কগনিটিভ জটিলতা র্যাচেট (`eslint-plugin-sonarjs`) — পৃথক ESLint পাস; CI উভয়কে মার্জ করে একক `check:complexity-ratchets` ধাপ হিসেবে চালায়                                   | হ্যাঁ                       |
| `check:dead-code`            | অব্যবহৃত এক্সপোর্ট / ফাইল র্যাচেট (knip) বেসলাইনের তুলনায় রিগ্রেস করে না                                                                                                   | হ্যাঁ                       |
| `check:compression-budget`   | কম্প্রেশন বেঞ্চমার্ক বাজেট — প্রতি-ইঞ্জিন টোকেন-সাশ্রয়ের সর্বনিম্ন সীমা রিগ্রেস হতে পারবে না                                                                               | হ্যাঁ                       |
| `check:type-coverage`        | শতাংশ-টাইপকৃত র্যাচেট (`type-coverage`) রিগ্রেস করে না; বড় অংশে `typecheck:noimplicit:core`-কে অন্তর্ভুক্ত করে                                                             | হ্যাঁ                       |
| `check:codeql-ratchet`       | খোলা CodeQL সতর্কতার সংখ্যা রিগ্রেস করে না (`gh api` দিয়ে পড়ে; টোকেন ছাড়া নির্বিঘ্নে এড়িয়ে যায়) — রিফ্রেশ ক্যাডেন্স ও ম্যানুয়াল ট্রিগার: নিচে "CodeQL র্যাচেট" দেখুন | হ্যাঁ                       |

### জব: `quality-extended`

পুরো জবটি পরামর্শমূলক (`continue-on-error: true`)। npm-ভিত্তিক র্যাচেটগুলো প্রকৃতপক্ষে চলে; বহিরাগত স্ক্যানারগুলো `gh release download` দিয়ে ইনস্টল হয় এবং বাইনারি এখনো অনুপস্থিত থাকলে নিজে থেকে এড়িয়ে যায় (exit 0)।

| স্ক্রিপ্ট                | যাচাই করে                                                                                                                                                                                                  | ব্লকিং                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | কোনো সার্কুলার নির্ভরতা নেই (dpdm)                                                                                                                                                                         | **পরামর্শমূলক**                             |
| `check:bundle-size`      | বান্ডেলের আকার সীমা অতিক্রম করে না                                                                                                                                                                         | **পরামর্শমূলক**                             |
| `check:secrets`          | সিক্রেট স্ক্যানিং (gitleaks) — বাইনারি অনুপস্থিত থাকলে এড়িয়ে যায়                                                                                                                                        | **পরামর্শমূলক**                             |
| `check:vuln-ratchet`     | নির্ভরতার দুর্বলতা (osv-scanner) রিগ্রেস করে না — বাইনারি অনুপস্থিত থাকলে এড়িয়ে যায়                                                                                                                     | **পরামর্শমূলক**                             |
| `check:workflows`        | ওয়ার্কফ্লো লিন্ট (actionlint + zizmor); অনুপস্থিত/ভাঙা স্ক্যানার, অবৈধ রিপোর্ট বা অনুপস্থিত র্যাচেট বেসলাইন INCOMPLETE হিসেবে ব্যর্থ হয়। বৈধ ফলাফলগুলো নির্বাচিত strict/advisory/ratchet নীতি অনুসরণ করে | সম্পাদন আবশ্যক; zizmor র্যাচেট CI-তে ব্লকিং |
| `check:openapi-breaking` | পাবলিক API কন্ট্রাক্টে (`openapi.yaml`) বেস ব্রাঞ্চের তুলনায় ব্রেকিং পরিবর্তন (oasdiff) — `openapiBreaking=N` নির্গত করে; oasdiff অনুপস্থিত থাকলে বা বেস স্পেসিফিকেশন সমাধানযোগ্য না হলে এড়িয়ে যায়     | **পরামর্শমূলক**                             |

### জব: `docs-sync-strict`

`main`-এ প্রতিটি PR-এ চলে। ব্যর্থতায় মার্জ ব্লক করে।

| স্ক্রিপ্ট                      | যাচাই করে                                                                                                                               | ব্লকিং                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | মেটা-গেট যা নীচের ৬টি সাব-গেট ক্রমানুসারে চালায়                                                                                        | হ্যাঁ                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt সংস্করণ সামঞ্জস্য                                                                                         | হ্যাঁ                            |
| ↳ `check:docs-counts`          | গদ্যের সংখ্যাগুলি (প্রোভাইডার সংখ্যা, মাইগ্রেশন সংখ্যা ইত্যাদি) প্রকৃত সংখ্যার ratchet উইন্ডোর মধ্যে রয়েছে                             | হ্যাঁ                            |
| ↳ `check:env-doc-sync`         | `.env.example`-এর প্রতিটি env ভেরিয়েবল একটি ডক্স টেবিলে নথিভুক্ত, এবং বিপরীতভাবেও                                                      | হ্যাঁ                            |
| ↳ `check:deprecated-versions`  | ডক্সে কোনো অপ্রচলিত সংস্করণ স্ট্রিং নেই                                                                                                 | হ্যাঁ                            |
| ↳ `check:doc-links`            | ডক্সের অভ্যন্তরীণ মার্কডাউন লিংকগুলি প্রকৃত ফাইলে রিজলভ হয় (`[text]`/`(path)` ফর্ম)                                                    | হ্যাঁ                            |
| ↳ `check:fabricated-docs`      | ডক্সে উদ্ধৃত রুট, env ভেরিয়েবল, CLI কমান্ড, হুক নাম এবং ফাইল পাথ কোডবেসে বিদ্যমান। `--strict` দিয়ে হার্ড গেট; ফ্ল্যাগ ছাড়া সফট-ফেইল। | হ্যাঁ (CI-তে `--strict` মাধ্যমে) |
| `check:cli-i18n`               | CLI কমান্ড স্ট্রিংগুলি সব i18n লোকেল ফাইলে উপস্থিত                                                                                      | হ্যাঁ                            |
| `check:openapi-coverage`       | OpenAPI স্পেক প্রকৃত রুটের একটি ratcheted ন্যূনতম সীমা কভার করে                                                                         | হ্যাঁ                            |
| `check:openapi-security-tiers` | `openapi.yaml`-এর সিকিউরিটি টিয়ার অ্যানোটেশনগুলি `routeGuard.ts` ক্লাসিফিকেশনের সাথে সামঞ্জস্যপূর্ণ                                    | **পরামর্শমূলক**                  |
| `check:openapi-routes`         | `openapi.yaml`-এর প্রতিটি পাথ একটি প্রকৃত `route.ts`-এ রিজলভ হয় (অ্যান্টি-হ্যালুসিনেশন)                                                | হ্যাঁ                            |
| `check:docs-symbols`           | `docs/**/*.md`-এর প্রতিটি `/api/...` রেফারেন্স একটি প্রকৃত `route.ts`-এ রিজলভ হয় (অ্যান্টি-হ্যালুসিনেশন)                               | হ্যাঁ                            |
| `i18n translation drift`       | i18n লোকেল ফাইলে অননুবাদিত কী — শুধুমাত্র সতর্কতা                                                                                       | **পরামর্শমূলক**                  |

`docs/diagrams/`-এর অধীনে বারোটি README SVG জেনারেট করা হয় (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` সবগুলি পুনরায় জেনারেট করে)। প্রতিটির একটি বাইট-তুলনা ইউনিট টেস্ট রয়েছে
(`tests/unit/docs/readme-*-svg.test.ts`, জব `test-unit`) যা কমিট করা ফাইল পুরানো হলে ব্যর্থ হয়,
এবং `check:docs-counts` তাদের `<text>` নোড থেকে ক্যানোনিক্যাল সংখ্যাগুলি পড়ে — এজন্যই
সংখ্যাগুলি কখনও পাথে আউটলাইন করা হয় না। SVG ক্যানোনিক্যাল-সংখ্যা চেকটি
`SVG_DIAGRAM_FILES`-এ তালিকাভুক্ত ফাইলগুলি পড়ে (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, এছাড়া `public/images/tier-flow-dark.svg` এবং `tier-flow-light.svg`;
free-forever, catalog-entry, recurring-pool এবং scoring-factors দাবিগুলিও
`promise-pillars.svg`, `free-tier-budget.svg` এবং `strategies-grid.svg` পড়ে। `free-tier-budget.svg`
লাইভ ক্যাটালগ লোডার থেকে এর পরিসংখ্যান আঁকে, তাই `FREE_MODEL_BUDGETS`-এ বা কোনো
প্রোভাইডার ডিসপ্লে নামে পরিবর্তন করলে ফাইলটি পুনর্জেনারেট না করা পর্যন্ত CI লাল হয়ে থাকে।

### জব: `i18n-ui-coverage`

| স্ক্রিপ্ট                         | যাচাই করে                                                                                                                                                                               | ব্লকিং          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (ইনলাইন) | UI i18n কী কভারেজ ≥ ৬৫%                                                                                                                                                                 | হ্যাঁ           |
| `check-ui-value-drift` (ইনলাইন)   | পুনর্লিখিত ইংরেজি **মান** পেছনে কোনো পুরানো অনুবাদ ফেলে রাখে না                                                                                                                         | হ্যাঁ           |
| `check-new-key-coverage` (ইনলাইন) | একটি **নতুন** ইংরেজি কী প্রতিটি লোকেলে অনুবাদিত — একটি `__MISSING__:` মার্কার প্রত্যাখ্যাত হয়                                                                                          | হ্যাঁ           |
| `check-translation-ratio`         | প্রতি লোকেলে প্রকৃত-অনুবাদ অনুপাত (allowlist-এর বাইরে ইংরেজির-সাথে-অভিন্ন / প্লেসহোল্ডার / অনুপস্থিত লিফ) `config/quality/i18n-translation-baseline.json` + স্ল্যাক অতিক্রম করা যাবে না | **পরামর্শমূলক** |

`fetch-depth: 0` প্রয়োজন — value-drift গেটটি merge base-এর বিপরীতে `en.json` ডিফ করে।

#### `check-ui-value-drift` — পুরানো-অনুবাদ গেট

অন্য গেটগুলো কাঠামোগতভাবে যে একমাত্র i18n রিগ্রেশন দেখতে পায় না, এটি সেটিই ধরে: একটি ইংরেজি মান পুনর্লিখিত হয় এবং _পূর্ববর্তী_ ইংরেজি থেকে উদ্ভূত অনুবাদগুলো পিছিয়ে থেকে যায়, ফলে অ-ইংরেজি ব্যবহারকারীরা আত্মবিশ্বাসী ভঙ্গিতে লেখা, এখন-ভুল কপি পড়তে থাকেন।

এটি সত্যিই শিপ হয়েছিল। Antigravity লগইন হেল্পার যুক্ত হওয়ার সময় (#5203) `oauthModal.googleOAuthWarning` পুনর্লিখিত হয়েছিল; **43টি লোকেলের মধ্যে 39টি** অপারেটরদের "সম্পূর্ণ URL কপি করে নিচে পেস্ট করুন" বলা টেক্সট ধরে রেখেছিল — একটি ফ্লো যা সেই প্রোভাইডারের জন্য সম্পন্ন হতে পারে না। #8463 পর্যন্ত এটি অলক্ষিত ছিল, কারণ:

- `sync-ui-keys` শুধুমাত্র **অনুপস্থিত** কীগুলো ব্যাকফিল করে, **বাসি** কীগুলো কখনোই নয়;
- `check-ui-keys-coverage` কী-এর _উপস্থিতি_ গণনা করে, তাই একটি বাসি অনুবাদ কভারড হিসেবে গণ্য হয়;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ডকুমেন্টেশন মিররগুলো ট্র্যাক করে — এটি কখনোই `src/i18n/messages/*.json` পড়ে না। 2026-09 রি-সিঙ্কের পর থেকে `docs-sync-strict` জবে ব্লকিং: একটি কোর ডক সম্পাদনা করুন → `npm run i18n:run -- --files=<doc>` (সেকশন-স্তরীয়, সাশ্রয়ী)।

**ডিফ-সচেতন, বেসলাইন-নির্ভর নয়।** এটি মার্জ বেসে `en.json`-কে ওয়ার্কিং ট্রির সাথে তুলনা করে; যে প্রতিটি কী-এর ইংরেজি মান পরিবর্তিত হয়েছে, তার জন্য অপরিবর্তিত অনুবাদ ধরে রাখা যেকোনো লোকেলই বাসি। এটি ইচ্ছাকৃতভাবে **পূর্ব-বিদ্যমান ঋণকে স্থির করে** — একটি ডিফ প্রকাশ করতে পারে না যে একটি দীর্ঘদিনের অনুবাদ কোন পুরনো ইংরেজি থেকে এসেছে, তাই গেটটি শুধুমাত্র বর্তমান পরিবর্তন যা স্পর্শ করে তা-ই বিচার করে। বিকল্পটি (প্রতি-কী হ্যাশ বেসলাইন) খরচ করত একটি ~600 KB জেনারেট করা ফাইল, বিদ্যমান সবচেয়ে বড় বেসলাইনের 3×, প্রতিটি i18n PR-এ চার্ন সহ।

এটি মেনে চলার দুটি উপায়:

1. ক্ষতিগ্রস্ত অনুবাদগুলো আপডেট করুন, অথবা
2. সেগুলোকে `__MISSING__:<new english>` সেট করুন — রানটাইম তখন সংশোধিত ইংরেজি পরিবেশন করে (`src/i18n/request.ts::deepMergeFallback`, #7258) এবং কীটি অনুবাদের কিউতে যায়।

স্ট্রিংয়ের **অর্থ** পরিবর্তিত হয়ে থাকলে, **কী রিনেম করা**-কেই অগ্রাধিকার দিন: একটি নতুন কী বাসি অনুবাদ উত্তরাধিকারসূত্রে পেতে পারে না। #8463 এই প্যাটার্নটিই ব্যবহার করেছিল।

```bash
npm run i18n:check-value-drift          # কঠোর (CI যেটি চালায়)
npm run i18n:check-value-drift:warn     # শুধুমাত্র রিপোর্ট
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

বেস ক্যাটালগ পড়া না গেলে (বেস রেফ ছাড়া শ্যালো ক্লোন) `SKIP reason=base-unresolved` সহ 0 এক্সিট করে, `check-openapi-breaking`-এর মতোই।

### জব: `i18n`

সম্পূর্ণ i18n ভ্যালিডেশন ম্যাট্রিক্স (প্রতি লোকেলে একটি জব)। পুরো জবটি পরামর্শদায়ক।

| স্ক্রিপ্ট                       | যা যাচাই করে                     | ব্লকিং                                                |
| ------------------------------- | -------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | প্রতি লোকেলে অনুবাদের সম্পূর্ণতা | **পরামর্শদায়ক** (পুরো জবে `continue-on-error: true`) |

### জব: `pr-test-policy`

শুধুমাত্র পুল রিকোয়েস্টে চলে।

| স্ক্রিপ্ট              | যা যাচাই করে                                                                                                                                       | ব্লকিং |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, বা `bin/`-এ প্রোডাকশন কোড পরিবর্তন করে এমন PR-গুলোতে অবশ্যই টেস্ট অন্তর্ভুক্ত বা আপডেট থাকতে হবে (কঠোর নিয়ম #8) | হ্যাঁ  |
| `check:test-masking`   | পরিবর্তিত টেস্ট ফাইলগুলো নেট অ্যাসার্ট সংখ্যা কমায় না বা `assert.ok(true)` টটোলজি যোগ করে না                                                      | হ্যাঁ  |
| `check:pr-evidence`    | PR বডিতে পরিবর্তনের জন্য টেস্ট/VPS প্রমাণ উদ্ধৃত করা আছে (PR প্রোজ গ্রেপ করে কঠোর নিয়ম #18-কে যান্ত্রিকীকরণ করে — ভঙ্গুর, ব্যাকলগ দেখুন)          | হ্যাঁ  |

### জব: `test-vitest`

`build`-এর পরে চলে। ব্যর্থতায় মার্জ ব্লক করে।

| স্যুট            | যা যাচাই করে                                             | ব্লকিং                                                                                                                 |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP সার্ভার (110টি টুল), autoCombo, ক্যাশ — vitest রানার | হ্যাঁ                                                                                                                  |
| `test:vitest:ui` | UI কম্পোনেন্ট টেস্ট — vitest রানার                       | **ব্লকিং** — পূর্ব-বিদ্যমান ব্যর্থতাগুলো `vitest.config.ts`-এ স্পষ্টভাবে বাদ দেওয়া হয়েছে; নতুন ব্যর্থতা জব ফেল করায় |

### নাইটলি ওয়ার্কফ্লো (নির্ধারিত, পরামর্শদায়ক)

এগুলো ক্রন সিডিউলে (এবং `workflow_dispatch`) চলে, PR-এ কখনোই নয়। সবগুলোই পরামর্শদায়ক।

| ওয়ার্কফ্লো            | যাচাই করে                                                                                                                                                               | ব্লকিং          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | র্যান্ডম সিড + উচ্চ রান সংখ্যা সহ fast-check প্রপার্টি টেস্ট                                                                                                            | **পরামর্শমূলক** |
| `nightly-resilience`   | হিপ-গ্রোথ গেট, ক্যাওস ফল্ট-ইনজেকশন, k6 লোড/সোক                                                                                                                          | **পরামর্শমূলক** |
| `nightly-llm-security` | promptfoo ইনজেকশন গার্ড (ব্লক মোড) + garak প্রোব (প্রোভাইডার সিক্রেট ছাড়া এড়িয়ে যায়)                                                                                | **পরামর্শমূলক** |
| `nightly-schemathesis` | `docs/openapi.yaml` ব্যবহার করে একটি লাইভ OmniRoute-এর বিরুদ্ধে OpenAPI কন্ট্রাক্ট ফাজিং (schemathesis) — স্পেক লঙ্ঘন / আনহ্যান্ডল্ড 500 ত্রুটি প্রকাশ করে (Fase 8 B.4) | **পরামর্শমূলক** |
| `nightly-mutation`     | দ্রুত ইউনিট লেনের উপর Stryker মিউটেশন-টেস্টিং স্কোর — টিকে থাকা মিউট্যান্টগুলো দুর্বল অ্যাসার্ট প্রকাশ করে                                                              | **পরামর্শমূলক** |
| `nightly-compat`       | সমর্থিত `engines.node` রেঞ্জ জুড়ে Node ইঞ্জিন কম্প্যাটিবিলিটি ম্যাট্রিক্স                                                                                              | **পরামর্শমূলক** |

পারফরম্যান্স বেসলাইন (হিপ, TTFB, বিল্ড সময়) রেকর্ড করা হয়, গেট করা হয় না: দেখুন [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)।

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
