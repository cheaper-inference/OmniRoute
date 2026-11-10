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

### প্রার্থী ভর্তি

CI এবং কোয়ালিটি গেটস ওয়ার্কফ্লো প্রতিটি একটি স্থিতিশীল রায় নির্গত করে: `Gate / CI` এবং `Gate / Quality`। তাদের সংস্করণযুক্ত ভর্তি নীতি প্রয়োজনীয় বা উপদেষ্টা হিসাবে প্রতিটি আপস্ট্রিম কাজের গণনা করে। একটি প্রযোজ্য প্রয়োজনীয় কাজ অবশ্যই সফল হবে: অনুপস্থিত, বাতিল, এড়িয়ে যাওয়া, মুলতুবি এবং অজানা ফলাফল PASS প্রতিষ্ঠা করতে পারে না। একটি বৈধ ডক্স-শুধু বা ক্যাটালগ-শুধু শ্রেণীবিভাগ একটি কোড লেনকে অপ্রযোজ্য করে তুলতে পারে; একটি সাধারণ খসড়া PR একজন গৃহীত প্রার্থী নয়। একটি `hotfix` লেবেল প্রমাণ ত্যাগ করে না।

উভয় কর্মপ্রবাহই PRs main/release শাখায় ঢেকে দেয়, `main` তে ঠেলে দেয়, ম্যানুয়াল ডিসপ্যাচ এবং মার্জ-গ্রুপ ইভেন্ট। পুশ, ডিসপ্যাচ এবং মার্জ-গ্রুপ সম্পূর্ণ নির্বাচন চালান। একটি বিশ্বস্ত Mergify কিউ ড্রাফ্ট প্রযোজ্য `full-code`/`full-code-e2e` কাজ চালায়; সাধারণ PRs তাদের এড়িয়ে যান। একটি ম্যানুয়াল মার্জ করার আগে, সঠিক প্রার্থীর উপর একটি সম্পূর্ণ প্রেরণ চালান। `release/**` তে ঠেলে এই কর্মপ্রবাহ শুরু করে না; রিলিজ-সবুজ আলাদাভাবে একত্রিত বেস পর্যবেক্ষণ করে (`docs/ops/RUNNER_BOX.md` → হোস্টেড লেন)। ফর্কস এবং মার্জ গ্রুপগুলি কাজের জন্য হোস্ট করা রানার ব্যবহার করে যা অন্যথায় স্ব-হোস্টেড রানারদের নির্বাচন করে; রোলআউট করার আগে পর্যাপ্ত হোস্ট করা ক্ষমতা অবশ্যই যাচাই করা উচিত।

প্রতিটি JSON রসিদ চেক-আউট SHA, ওয়ার্কফ্লো চালানো এবং প্রচেষ্টা চিহ্নিত করে। CLI একটি checkout/event SHA অমিল প্রত্যাখ্যান করে। কার্যপ্রবাহ পরীক্ষাগুলি নীতি সদস্যতাকে রায় কাজের `needs` তালিকার সাথে আবদ্ধ করে যাতে একটি নতুন বা সরানো লেন নীরবে অদৃশ্য হয়ে যেতে পারে না। রসিদগুলি তাদের নিজস্ব কর্মপ্রবাহকে কভার করে, প্রকাশনা, স্থাপনা বা বিদ্যমান উপদেষ্টা স্ক্যানারের অভ্যন্তরীণ অংশ নয়। শাখার নিয়মে প্রয়োজনীয় প্রযোজ্য চেক করা একটি পৃথক প্রশাসনিক পরিবর্তন; তাদের কাজ সংজ্ঞায়িত করা নিজেই একটি শাখাকে রক্ষা করে না।

`API Route Typecheck` হল একটি স্বাধীন ওয়ার্কফ্লো চেক, সমষ্টিগত রায় এবং স্থানীয় সম্পূর্ণ পর্যবেক্ষকের স্ট্যাটিক প্রোফাইল উভয়ের বাইরে। সঠিক প্রার্থীর জন্য আলাদাভাবে এর ফলাফল পরিদর্শন করুন। `.github/workflows/api-route-typecheck.yml` PRs তে `main` বা `release/**` তে চলে, যে কোনো একটি শাখা পরিবার, ম্যানুয়াল প্রেরন এবং `checks_requested` টাইপের `merge_group` ইভেন্টগুলিতে ঠেলে দেয়। এর কোনো পাথ ফিল্টার নেই। গ্রুপ একত্রিত করুন `merge_group.head_sha` চেক আউট; অন্যান্য ইভেন্ট `github.sha` চেক আউট. সমস্ত ইভেন্ট একই API ডায়াগনস্টিক গেট এবং গেট ইউনিট পরীক্ষা ব্যবহার করে। PR বেস রিটার্গেট একটি নতুন চেকের অনুরোধ করে; body/title সম্পাদনা শুধুমাত্র পর্যবেক্ষণের নাম `Admission not requested / API Route Typecheck` ব্যবহার করে এবং ভর্তি চেক প্রতিস্থাপন করতে পারে না।

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

### DAST যাচাইকৃত CI build ব্যবহার করে

বাধ্যতামূলক CI job `dast-smoke`, `build`-এর পরে `.github/workflows/dast-smoke.yml` ডাকে। এটি build-এর একই code/draft নির্বাচন অনুসরণ করে; সমর্থিত fork PR, release-target PR ও merge group-ও অন্তর্ভুক্ত। অনুপস্থিত, ব্যর্থ, বাতিল বা অপ্রত্যাশিতভাবে বাদ পড়া DAST job `Gate / CI` আটকে দেয়। পুনর্ব্যবহারযোগ্য workflow-এর স্বাধীন PR/dispatch trigger নেই; manual validation CI dispatch ব্যবহার করে, যাতে build ও consumer একই run-এ থাকে।

`scripts/ci/next-build-provenance.mjs` সম্পূর্ণ Next artifact-কে tar digest, repository/event/run, producer attempt, head/base/checkout/tree, workflow identity, lockfile, সঠিক Node version/ABI, platform ও bundler-এর সঙ্গে বাঁধে। DAST অপরিবর্তনীয় artifact ID বেছে নেয় `needs.build.outputs` থেকে, download digest যাচাই বাধ্যতামূলক করে এবং `scripts/ci/unpack-ci-build.py` দিয়ে অনুমোদিত দুটি member বের করার আগে স্বাধীনভাবে ZIP hash গণনা করে producer digest-এর সঙ্গে মেলায়। Next tree বের করার আগে manifest ও tar archive-ও producer-এর স্বাধীন output-এর সঙ্গে মিলতে হবে। এটি কখনো branch-এর সর্বশেষ সফল build খোঁজে না। ID ও সব input মিলতে থাকলে partial rerun একই producer attempt পুনর্ব্যবহার করতে পারে; receipt দুটি attempt-ই রাখে।

Consumer hosted Linux runner-এ থাকে, repository-তে শুধু পড়ার অনুমতি ও কোনো repository secret ছাড়া। এটি producer-এর সঠিক Node version বসিয়ে `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` দিয়ে CLI তৈরি করে। `scripts/build/standaloneInput.mjs` যেকোনো fallback build-এর আগে অনুপস্থিত standalone server প্রত্যাখ্যান করে; স্বাভাবিক স্থানীয় CLI build তাদের বর্তমান fallback রাখে। Server readiness, Schemathesis ও promptfoo সবাইকে job-এর অপরিবর্তিত 25 মিনিট সীমায় সফল হতে হবে। Provenance receipt input-এর পরিচয় ও byte প্রমাণ করে, সফল DAST scan নয়। Artifact-এর মেয়াদ শেষ হওয়া, runner থামা বা scanner ব্যর্থ হওয়া অসম্পূর্ণ বা ব্যর্থ প্রমাণই থাকে; advisory wrapper দিয়ে তা PASS হয় না।

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

### ইউনিট এক্সিকিউশনের অগ্রগতি রসিদ

শেয়ার করা `test:unit:ci:shard` কমান্ডটি `scripts/ci/unit-progress-reporter.mjs`-এর মাধ্যমে `primary`, `dashboard` এবং `serial`
পর্যায়গুলো রেকর্ড করে। স্বাভাবিক টেস্ট রিপোর্টটি উপলভ্য থাকে। একটি পৃথক, শুধু-মেটাডেটাসংবলিত রসিদ প্রতিটি ফাইলের শুরু ও সমাপ্তি রেকর্ড করে,
এবং ৩০-সেকেন্ডের একটি হার্টবিট তখনও সক্রিয় থাকা ফাইলগুলো ও সেগুলোর অতিবাহিত সময়ের তালিকা দেয়। এটি
শুধু অনুমোদিত এক্সিকিউশন মেটাডেটা রেকর্ড করে; টেস্টের বিবরণ, আউটপুট, ত্রুটির মূল অংশ এবং সম্পূর্ণ
এনভায়রনমেন্ট সিরিয়ালাইজ করা হয় না।

CI JSONL ফাইলগুলি `unit-progress-ci-<run>-<attempt>-<shard>` নামে সংরক্ষণ করে। কোনো জব টাইমআউট পরবর্তী আপলোডটি বাধাগ্রস্ত করতে পারে;
ইতিমধ্যে নির্গত হার্টবিটগুলো ডায়াগনস্টিক প্রমাণ হিসেবে থেকে যায়। হার্টবিট অনুপস্থিত থাকলে তা
ব্লক হওয়া বা সমাপ্ত করে দেওয়া রানার প্রসেসকেও নির্দেশ করতে পারে। এই রসিদগুলো বিদ্যমান টেস্ট নির্বাচন,
কনকারেন্সি, সময়সীমা এবং এক্সিট স্ট্যাটাস অপরিবর্তিত রাখে; এগুলো প্রার্থী-গ্রহণসংক্রান্ত সিদ্ধান্ত নয়।

### Static scan inventory

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

### প্রকাশিত-বেস ডকুমেন্টেশন স্বাস্থ্য

`main` এবং `release/v*` তে নির্বাচিত ঠেলে এবং ম্যানুয়াল প্রেরণের পরে`.github/workflows/i18n-base-health.yml` ডকুমেন্টেশন স্বাস্থ্য পর্যবেক্ষণ করে। এর ফিল্টারগুলি ডকুমেন্টেশন, রুট মার্কডাউন, `llm.txt`, অনুবাদ state/configuration এবং প্রাসঙ্গিক i18n টুলিং কভার করে। একক `Published base documentation health` কাজ হোস্টেড উবুন্টু এবং পাঁচ মিনিটের সময়সীমা ব্যবহার করে। এটি শুধুমাত্র-পঠন বৈধতা সঞ্চালন করে এবং নির্ভরতা ইনস্টলেশন, অনুবাদ বা রাষ্ট্র গ্রহণ ছাড়াই একটি ডায়াগনস্টিক রসিদ লিখে।

`scripts/i18n/check-base-health.mjs` জন্য শূন্য উৎস-হ্যাশ, অনুপস্থিত-লক্ষ্য, লক্ষ্য-হ্যাশ, বাসি-অনুবাদ এবং বিভাগ-ক্যাশে অসঙ্গতি প্রয়োজন। এটি বর্তমান মূল document/locale স্কোপ এবং এর রেকর্ডকৃত উদ্ভবকেও যাচাই করে। অবৈধ প্রসঙ্গ, অসম্পূর্ণ কভারেজ বা বাধাপ্রাপ্ত চেকার `INCOMPLETE` তৈরি করে; নিশ্চিত ড্রিফট `FAIL` তৈরি করে। উভয়ই একটি ব্যর্থ প্রস্থান অবস্থা ফিরিয়ে দেয়। রসিদ SHA চেকআউট করতে বাধ্য, কর্মপ্রবাহ, রান এবং প্রচেষ্টা, এবং `i18n-base-health-<sha>-<run>-<attempt>` হিসাবে রাখা হয়।

এটি প্রকাশিত বেসের একটি স্বাধীন পর্যবেক্ষণ। এটি একটি PR বা মার্জ-গ্রুপ ইভেন্ট, একটি প্রয়োজনীয় PR চেক, একটি npm উপনাম বা একটি স্ট্যাটিক-স্ক্যান প্রোফাইল সদস্য যোগ করে না। অন্তর্নিহিত পরীক্ষকটি পরম মোডে সমস্ত পাঁচটি ক্লাস ব্লক করে। সাধারণ PR প্রস্তুতি ভর্তি থেকে আলাদা থাকে। একটি সফল আপলোড একটি ব্যর্থ স্বাস্থ্য ফলাফলকে PASS তে পরিণত করতে পারে না।

একটি সাধারণ PR `--baseline-evidence` দ্বারা তৈরি একটি বেস রিপোর্ট সহ `--preflight` ব্যবহার করে। সম্পূর্ণ অনুবাদ রেকর্ড এবং প্রকৃত লক্ষ্য বাইটগুলি সেই সঠিক ভিত্তি থেকে অপরিবর্তিত থাকলেই এটি একটি ইংরেজি উৎস মুলতুবি রেখে যেতে পারে। নতুন লক্ষ্য বা বিভাগ-ক্যাশে অসঙ্গতি এখনও অবরুদ্ধ, এবং অসম্পূর্ণ প্রমাণ প্রস্তুতি অনুমোদন করতে পারে না। প্রতিবেদনটি `preparationPending` এবং `mergeReady` আলাদাভাবে প্রকাশ করে: সফল প্রস্তুতি মুলতুবি অনুবাদগুলিকে একত্রিত করার জন্য প্রস্তুত করে না। ভর্তির আগে কম্পোজড প্রার্থীর প্রভাবিত আয়না রিফ্রেশ করুন। বিশ্বস্ত মার্জিফাই কিউ প্রার্থী, `merge_group`, শাখা পুশ এবং ম্যানুয়াল CI রানগুলি `--warn` বা উত্তরাধিকার-ব্যর্থতার ক্ষমা ছাড়াই পরম চেকার ব্যবহার করে। অনুপস্থিত লক্ষ্য হ্যাশ এবং মুছে ফেলা রেকর্ড করা মূল ফাইল দ্বারা একটি সুযোগ হ্রাস একটি সফল পরম রায় দিতে পারে না।

### মুক্তি PR দ্রুত-পথ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs তে CI পরিপূরক, `main` তে ঠেলে, প্রেরন এবং গ্রুপ একত্রিত করে। PRs পাথ-ফিল্টার করা দ্রুত চেক ব্যবহার করে। স্থায়ীভাবে অক্ষম ডুপ্লিকেট বিল্ড সরানো হয়েছে; আসল build/package/boot চেক CI এ থাকে।

| চাকরি                                            | ব্যাপ্তি                                                                                                                                                                                                              | ব্লকিং          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API ডক্স রেফ এবং ডক্স-সমস্ত                                                                                                                                                                            | হ্যাঁ           |
| `Fast Quality Gates`                             | কোড PRs; স্ট্যাটিক চেক, টাইপচেক, ড্যাশবোর্ড টাইপচেক, প্রভাবিত ইউনিট পরীক্ষা                                                                                                                                           | হ্যাঁ           |
| `Forgotten sibling tests`                        | কোড PRs; পরিবর্তিত মডিউল স্ট্যাটিক ভোক্তা এবং প্রার্থী ভাইবোন পরীক্ষায় চিহ্নিত করা হয়েছে; ব্যারেল এবং ডায়নামিক-ইমপোর্ট পাথগুলি উপদেষ্টা ডায়গনিস্টিক হিসাবে রিপোর্ট করা হয়, উল্লেখিত অনুমোদিত তালিকা ব্যতিক্রম সহ | **উপদেষ্টা**    |
| `No new ESLint warnings`                         | কোড PRs; দমন-সচেতন লিন্ট গার্ড                                                                                                                                                                                        | হ্যাঁ, কাঁটা সহ |
| `Merge integrity (changelog + generated skills)` | অ-খসড়া PRs; চেঞ্জলগ এবং জেনারেটেড স্কিল সিঙ্ক                                                                                                                                                                        | হ্যাঁ, কাঁটা সহ |

#### ভুলে যাওয়া ভাইবোনের পরীক্ষার রিপোর্ট

`npm run check:forgotten-sibling-tests` পরীক্ষা-প্রভাব মানচিত্রের পিছনে আমদানি সমাধানকারী পুনরায় ব্যবহার করে। প্রতিটি পরিবর্তিত উত্পাদন মডিউলের জন্য, এটি নির্ধারক `changed module/symbol -> static consumer -> candidate sibling test` চেইন রিপোর্ট করে যখন প্রার্থী পরীক্ষাটি পুল-অনুরোধের পার্থক্য থেকে অনুপস্থিত থাকে। মার্কডাউন সারাংশ এবং JSON ফলাফল যেকোন ব্লকিং রোলআউটের আগে ক্রমাঙ্কনের জন্য `forgotten-sibling-tests` ওয়ার্কফ্লো আর্টিফ্যাক্ট হিসাবে ধরে রাখা হয়।

ব্যারেল পুনরায় রপ্তানি এবং গতিশীল আমদানি শুধুমাত্র রেজোলিউশন ডায়াগনস্টিক; তারা কখনই একটি ব্লকিং ফাইন্ডিং তৈরি করে না। পর্যালোচনা করা ব্যতিক্রমগুলি `config/quality/forgotten-sibling-allowlist.json` তে লাইভ। প্রতিটি এন্ট্রিকে অবশ্যই ভোক্তা এবং প্রার্থীর পরীক্ষার নাম দিতে হবে, একটি নির্দিষ্ট যুক্তি দিতে হবে এবং একটি GitHub সমস্যা বা পুল অনুরোধ লিঙ্ক করতে হবে। বিকৃত এন্ট্রি ব্যর্থ হয়েছে বন্ধ. ব্যতিক্রমগুলি মুছে ফেলা প্রার্থীর পরীক্ষা বা `.skip`/`.todo` যোগ করে এমন একটি পার্থক্যকে দমন করতে পারে না; দাবি দুর্বল করা এবং অন্যান্য মাস্কিং স্বাধীনভাবে ব্লক করা `check:test-masking` গেট দ্বারা মালিকানাধীন থাকে।

### Job: `lint`

`main`-এ যাওয়া প্রতিটি PR-এ চলে। ব্যর্থ হলে merge block করে।

| স্ক্রিপ্ট (`npm run ...`)         | যা যাচাই করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ব্লকিং                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js সংস্করণটি সমর্থিত সীমার মধ্যে রয়েছে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | হ্যাঁ                                       |
| `check:cycles`                    | সম্পূর্ণ `src/` + `open-sse/` জুড়ে সার্কুলার ইমপোর্ট (AST-ভিত্তিক, tsconfig `paths` সমাধান করা হয়েছে)। কোনো সাইকেল থাকলেই মূল কমান্ড exit 1 করে (fail-closed, #15281 থেকে) এবং SCC-গুলো তালিকাভুক্ত করে। `check:cycles:ratchet` (যা CI চালায়) তখন ব্লক করে, যখন সংখ্যা `quality-baseline.json`-এর `metrics.cycles` ঊর্ধ্বসীমা ছাড়িয়ে যায় — বর্তমানে 14, `direction: down`, তাই এটি কেবল কমতে পারে (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ (র্যাচেট)                             |
| `check:boundary`                  | `open-sse → src` কাপলিং: ইঞ্জিন থেকে অ্যাপে অনন্য ফাইল-টু-ফাইল ইমপোর্ট (`scripts/quality/measure-boundary.mjs`; এজ তালিকাটি v4 কোর/মডিউল-বিভাজন সংশোধনের ব্যাকলগ)। মূল কমান্ড = পরামর্শমূলক প্রতিবেদন (`quality:boundary`-এর মতোই)। `check:boundary:ratchet` (যা CI চালায় এবং `quality.yml` fast-gates র্যাচেট লুপেও রয়েছে) তখন ব্লক করে, যখন সংখ্যা `quality-baseline.json`-এর `metrics.boundaryOpenSseToSrc` ঊর্ধ্বসীমা ছাড়িয়ে যায় — পরিমাপকৃত 771 দিয়ে প্রাথমিক মান নির্ধারিত, `direction: down`; `--update` কেবল এটিকে কমায়; PR-এ বেস-রিলেটিভ (`--base-ref`, নিচে দেখুন)                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ (র্যাচেট)                             |
| `check:route-validation:t06`      | সব রুটে Zod স্কিমা উপস্থিত রয়েছে (Tier 6 নীতি)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any`-এর সংখ্যা বাজেট অতিক্রম করে না (Tier 11 গেট)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:provider-consistency`      | `providers.ts`-এর প্রতিটি provider-এর জন্য `providerRegistry.ts`-এ একটি মিলে যাওয়া এন্ট্রি রয়েছে (এবং বিপরীতটিও, allowlist-এর সীমার মধ্যে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | হ্যাঁ                                       |
| `check:model-lifecycle`           | হাতে রক্ষণাবেক্ষণ করা তিনটি routing table, check-in করা lifecycle snapshot-এর (#11503) সঙ্গে সামঞ্জস্যপূর্ণ থাকে: `FITNESS_TABLE` (`taskFitness.ts`) এমন কোনো অবসরপ্রাপ্ত id-কে স্কোর করে না, যেটিতে `REGISTRY` route করতে পারে; প্রতিটি `BUILT_IN_ALIASES` target `REGISTRY`-তে উপস্থিত এবং অবসরপ্রাপ্ত-id snapshot-এ অনুপস্থিত; `REGISTRY`-তে এখনও থাকা প্রতিটি অবসরপ্রাপ্ত id forward করা হয়েছে অথবা `allowedRetiredInCatalog`-এ তালিকাভুক্ত; এবং কোনো `DEFAULT_DEGRADATION_MAP` source বা target ওই snapshot-এ অবসরপ্রাপ্ত হিসেবে উপস্থিত নেই। এটি প্রমাণ করে না যে কোনো model বর্তমানে সক্রিয় upstream দ্বারা পরিবেশিত হচ্ছে। Offline — `config/quality/model-lifecycle.json`-এর সঙ্গে তুলনা করে, যা `npm run quality:refresh-model-lifecycle` দিয়ে হাতে refresh করা হয় (network; CI-এর সঙ্গে সংযুক্ত নয়)। `allowedRetiredInCatalog` একটি burn-down ratchet: কেবল tracking issue থাকলেই একটি এন্ট্রি যোগ করুন।                                                                                           | হ্যাঁ                                       |
| `check:fetch-targets`             | client-side `src/`-এর প্রতিটি `fetch("/api/...")` একটি বাস্তব `route.ts`-এ resolve করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                       |
| `check:deps`                      | repo-র প্রতিটি `package.json` জুড়ে `npm install`-যোগ্য সব deps `dependency-allowlist.json`-এ রয়েছে; নতুন unpinned বা slopsquatted package-কে চিহ্নিত করা হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `audit:deps`                      | পাঁচটি স্বতন্ত্র lockfile-এর (root, Electron, OpenCode plugins v1/v2 এবং provider) npm audit। Critical advisory block করে; high advisory দৃশ্যমান warning হিসেবে থাকে। অনুপস্থিত/ব্যর্থ audit-গুলো INCOMPLETE এবং block করে; প্রতিটি scope-এর lock hash ও report সংরক্ষণ করা হয়।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                       |
| `check:lockfile`                  | `package-lock.json`-এর অখণ্ডতা — https রেজিস্ট্রি, অখণ্ডতা হ্যাশ, কোনো হোস্ট ওভাররাইড নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | হ্যাঁ                                       |
| `check:licenses`                  | প্রোডাকশন ডিপেন্ডেন্সিগুলোর জন্য SPDX লাইসেন্স অনুমোদন-তালিকা                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                       |
| `check:tracked-artifacts`         | কোনো বিল্ড আর্টিফ্যাক্ট / কমিট করা `node_modules` সিমলিংক নেই (husky pre-commit-এও চলে; pre-push ইচ্ছাকৃতভাবে হালকা — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | হ্যাঁ                                       |
| `check:ai-attribution`            | PR কমিট, শিরোনাম বা বডিতে কোনো AI/bot `Co-Authored-By` ট্রেইলার বা AI-জেনারেশন ফুটার নেই — কঠোর নিয়ম #16 (`quality.yml`-এর PR→`release/**`-এর fast-gates লুপে — ইভেন্ট পেলোড পড়ে, PR না হলে কিছুই করে না — এবং `ci.yml` lint-এ PR→`main`-এর জন্য শুধুমাত্র PR-ভিত্তিক একটি ধাপ; এছাড়াও husky `commit-msg` হুক; মানব সহ-লেখক অনুমোদিত; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | প্রতিটি Vitest এক্সক্লুশনে একটি ট্র্যাকিং ইস্যুর উল্লেখ থাকে এবং সেটি `config/quality/vitest-exclusions.json`-এ উপস্থিত থাকে (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | হ্যাঁ                                       |
| `check:file-size`                 | সোর্স ফাইলগুলো (`src/`, `open-sse/`, `electron/`, `bin/`-এর `.ts`/`.tsx`) `cap`-এর মধ্যে এবং টেস্ট ফাইলগুলো (`*.test.ts(x)`) `testCap`-এর মধ্যে থাকে; `file-size-baseline.json`-এ ফ্রিজ করা ফাইলগুলো (`frozen` / `testFrozen`) তাদের রেকর্ড করা আকারের চেয়ে বড় হওয়া চলবে না                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `check:error-helper`              | executors/handlers-এ ত্রুটি প্রতিক্রিয়াগুলো `buildErrorBody()` / `sanitizeErrorMessage()` ব্যবহার করে (কঠোর নিয়ম #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                       |
| `check:migration-numbering`       | Migration SQL ফাইলগুলো কোনো ফাঁক বা সদৃশ নম্বর ছাড়াই ধারাবাহিকভাবে নম্বরযুক্ত                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                       |
| `check:public-creds`              | `publicCreds.ts`-এর বাইরে কোনো আক্ষরিক OAuth `client_id`/`client_secret` বা Firebase Web কী নেই (কঠোর নিয়ম #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | হ্যাঁ                                       |
| `check:db-rules`                  | `src/lib/db/` মডিউলগুলোর বাইরে কোনো raw SQL নেই; `localDb.ts` থেকে কোনো barrel-import নেই (কঠোর নিয়ম #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | হ্যাঁ                                       |
| `check:known-symbols`             | dispatch table-এ নিবন্ধিত provider executor, routing strategy এবং translator-গুলো ডিস্কে থাকা ফাইলগুলোর সঙ্গে মেলে—কোনো অনাথ বা অঘোষিত symbol নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                       |
| `check:route-guard-membership`    | child process তৈরি করে এমন প্রতিটি route `isLocalOnlyPath()` দ্বারা শ্রেণিবদ্ধ (কঠোর নিয়ম #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ                                       |
| `check:test-discovery`            | রিপোর প্রতিটি `*.test.ts` / `*.spec.ts` ফাইল অন্তত একটি টেস্ট রানার দ্বারা সংগ্রহ করা হয় (র্যাচেট: `test-discovery-baseline.json`-এর অনাথ তালিকা কেবল ছোট হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                       |
| `check:test-tla-order`            | `tests/unit`-এর অধীনে কোনো `node:test` ফাইল একটি টেস্ট নিবন্ধন করে, টপ-লেভেল `await`-এ পৌঁছায়, তারপর আরও টেস্ট নিবন্ধন করে না (#18045; র্যাচেট: `test-tla-order-allowlist.json` কেবল ছোট হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | হ্যাঁ                                       |
| `check:agent-skills-sync`         | জেনারেট করা এজেন্ট-স্কিলস আর্টিফ্যাক্টগুলো তাদের সোর্স ক্যাটালগের সঙ্গে মেলে (কোনো বিচ্যুতি নেই)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | প্রোভাইডারের লোগো/অ্যাসেটগুলোর জন্য একটি নথিভুক্ত উৎস-তথ্য এন্ট্রি রয়েছে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON কনফিগ ফাইলগুলো পার্স হয় এবং রিপোর লিন্ট নিয়ম পূরণ করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | ত্রুটি ছাড়া TypeScript কম্পাইলেশন (শুধু পরামর্শমূলক সতর্কতা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                       |
| `typecheck:noimplicit:core`       | কঠোর `noImplicitAny` — ভবিষ্যৎমুখী; আগে থেকে থাকা অনেক কল সাইটে এখনও অ্যানোটেশন প্রয়োজন                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **পরামর্শমূলক** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`-এ সীমাবদ্ধ `tsc` (#7033) — `typecheck:core`-এর বাছাইকৃত 27-ফাইলের অনুমোদন তালিকায় কোনো dashboard TSX অন্তর্ভুক্ত নেই এবং `next build`-ও কখনো এটিকে টাইপ-চেক করে না (`next.config.mjs`-এ `ignoreBuildErrors: true` সেট করা আছে), তাই সেখানকার অনাথ-আইডেন্টিফায়ার রিগ্রেশনগুলো (#6625/#6909) CI-এর কাছে অদৃশ্য ছিল। একটি স্থিরীকৃত প্রতি-ফাইল/প্রতি-TS-কোড ত্রুটি-সংখ্যার বেসলাইনের (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`-এর মতো একই অচলতা-প্রয়োগের প্যাটার্ন) সঙ্গে পার্থক্য নির্ণয় করে — বেসলাইনে থাকা সংখ্যার অতিরিক্ত কেবল নতুন ত্রুটিগুলোই গেটকে ব্যর্থ করে; আগে থেকে থাকা কোনো ত্রুটি ঠিক হলে `--update` দিয়ে র্যাচেট কমান।                                                                                                                                                                                                                                                                                                                 | হ্যাঁ                                       |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`)-এর ওপর সম্পূর্ণ-app production type check; surface `typecheck:core`-এর ২৭-ফাইলের allowlist এবং dashboard gate যেসব অংশ কভার করে না, সেগুলোও এতে অন্তর্ভুক্ত। `config/quality/build-typecheck-baseline.json`-এর সঙ্গে পার্থক্য নির্ণয় করে; per-(file, code) count নতুন হলে বা বাড়লে ব্যর্থ হয়, কমলে আপনাকে ratchet করতে বলে। রান চলাকালে নতুন বা বাড়ানো কোনো pair থাকলে `--update` প্রত্যাখ্যাত হয়, যদি না `--force-regressions` পাস করা হয়; এবং নতুন করে নীরব করা কোনো file থাকলে `--force-nocheck` পাস না করা পর্যন্ত প্রত্যাখ্যাত হয়—অতএব green পাওয়ার জন্য baseline বিস্তৃত করা এবং স্থায়ী silence মঞ্জুর করা দুটি পৃথক, সচেতন কাজ। সাধারণ `--force` প্রত্যাখ্যাত হয়। এছাড়াও build scope-এ `@ts-nocheck` ব্যবহারের জন্য `config/quality/ts-nocheck-baseline.json`-এর বিরুদ্ধে scan করে, কারণ এটি ব্যবহার করা file কোনো diagnostic-ই রিপোর্ট করে না এবং অন্যথায় প্রতিটি gate-এর কাছেই অদৃশ্য থেকে যেত। | হ্যাঁ                                       |

#### দুটি typecheck program ভিন্নভাবে উত্তর দেয়

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) এবং `check:build-typecheck` ভিন্ন options-এর অধীনে ভিন্ন
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

`test-coverage`-এর পরে চলে। ব্যর্থ হলে মার্জ অবরুদ্ধ করে।

| স্ক্রিপ্ট                    | যা যাচাই করে                                                                                                                                  | অবরোধকারী                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` তৈরি করে (ESLint সতর্কতার সংখ্যা, একীভূত শার্ড রিপোর্ট থেকে কভারেজ)                                                    | হ্যাঁ (র্যাচেটের আপস্ট্রিম) |
| `quality:ratchet`            | `quality-baseline.json`-এর প্রতিটি মেট্রিকের অবনতি হয়নি (ESLint সতর্কতা ≤ বেসলাইন; কভারেজ ≥ বেসলাইন)                                         | হ্যাঁ                       |
| `check:duplication`          | কোডের পুনরাবৃত্তি (jscpd@4) `quality-baseline.json`-এর বেসলাইন অতিক্রম করে না                                                                 | হ্যাঁ                       |
| `check:complexity`           | ফাইল-স্তরের সাইক্লোম্যাটিক জটিলতা সীমা অতিক্রম করে না (মূল ESLint `complexity` + `max-lines-per-function`)                                    | হ্যাঁ                       |
| `check:cognitive-complexity` | কগনিটিভ জটিলতার র্যাচেট (`eslint-plugin-sonarjs`) — পৃথক ESLint পাস; CI উভয়টিকে একীভূত করে একক `check:complexity-ratchets` ধাপ হিসেবে চালায় | হ্যাঁ                       |
| `check:dead-code`            | অব্যবহৃত এক্সপোর্ট/ফাইলের র্যাচেট (knip) বেসলাইনের তুলনায় খারাপ হয় না                                                                       | হ্যাঁ                       |
| `check:compression-budget`   | কম্প্রেশন বেঞ্চমার্ক বাজেট — প্রতি-ইঞ্জিন টোকেন-সাশ্রয়ের ন্যূনতম সীমার অবনতি হওয়া চলবে না                                                   | হ্যাঁ                       |
| `check:type-coverage`        | টাইপযুক্ত শতাংশের র্যাচেট (`type-coverage`) খারাপ হয় না; এটি মূলত `typecheck:noimplicit:core`-কে অন্তর্ভুক্ত করে                             | হ্যাঁ                       |

### Jobs: `codeql-scan` ও `codeql-admission`

`codeql-scan` কনফিগার করা সব analysis category তৈরি করে। কাজটি সফল হলে `codeql-admission` তার নির্দিষ্ট upload ও candidate alert ratchet যাচাই করে। দুটিই `Gate / CI`-এর বাধ্যতামূলক dependency, শুধু docs বদলানো candidate-এর ক্ষেত্রেও। প্রশাসনিক activation ও canary-এর শর্ত নিচের "CodeQL ratchet" অংশে আছে।

| Script                 | কী যাচাই করে                                                                                                                                                                           | বাধা দেয় |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Alert ratchet-এর আগে candidate ref/SHA ও সব configured analysis category বর্তমান হতে হবে; প্রমাণ অনুপস্থিত থাকলে বাধা দেয়। Global inventory আলাদা থাকে — নিচের "CodeQL ratchet" দেখুন | হ্যাঁ     |

### Job: `quality-extended`

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

### চাকরি: `docs-sync-strict`

`main` বা `release/**` তে পুল অনুরোধের জন্য, এই কাজটি শুধুমাত্র ডকুমেন্টেশন বা কোড পরিবর্তন হিসাবে শ্রেণীবদ্ধ নন-ড্রাফ্ট (বা বিশ্বস্ত সারি) প্রার্থীদের জন্য চলে। এটি নন-পিআর CI ইভেন্টেও চলে; এই কর্মপ্রবাহের পুশ ট্রিগার শুধুমাত্র `main` কভার করে, `release/**` নয়। একটি পদক্ষেপ যা অ-শূন্য থেকে প্রস্থান করে কাজ ব্লক করে; রিপোর্ট শুধুমাত্র অনুসন্ধান এবং নীচে নথিভুক্ত ছাড় না.

| স্ক্রিপ্ট                      | যা যাচাই করে                                                                                                                                                                                                                                                                                                                                                                                                                                             | ব্লকিং                                                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | নিচের ৭টি উপ-গেট ধারাবাহিকভাবে চালানো মেটা-গেট                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                                                                                                                                 |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG সংস্করণের সামঞ্জস্য, সঠিক `llm.txt` আয়না, অনুবাদিত CHANGELOG section/size ইনভেরিয়েন্টস, এবং স্থানান্তরিত ডুপ্লিকেট নথির অনুপস্থিতি                                                                                                                                                                                                                                                                                           | হ্যাঁ                                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | সংকলিত ডকুমেন্টেশন পৃষ্ঠাগুলি বৈধ ফ্রন্টম্যাটার শিরোনাম বহন করে                                                                                                                                                                                                                                                                                                                                                                                          | হ্যাঁ                                                                                                                                                 |
| ↳ `check:docs-counts`          | উচ্চ আত্মবিশ্বাস গণনা invariants কঠোর; হিউরিস্টিক ফাইল-কাউন্ট চেক শুধুমাত্র সতর্ক করে যদি না স্ক্রিপ্ট `--strict` পায় ( CI মেটা-গেট এটি পাস করে না)                                                                                                                                                                                                                                                                                                     | কঠোর স্তর অবরোধ; নরম স্তরের পরামর্শ                                                                                                                   |
| ↳ `check:env-doc-sync`         | সোর্স env রিডস, `.env.example` এবং `docs/reference/ENVIRONMENT.md` স্পষ্ট উপেক্ষা, ডক-অনলি, এবং শুধুমাত্র env-অনুমোদিত তালিকার পরে সম্মত হয়                                                                                                                                                                                                                                                                                                             | হ্যাঁ, নথিভুক্ত অনুমোদিত তালিকার বাইরে                                                                                                                |
| ↳ `check:deprecated-versions`  | নিরাপদ ঐতিহাসিক প্রেক্ষাপট এবং বাসি আপডেট তারিখের বাইরে সম্ভাব্য বাসি সংস্করণ রিপোর্ট করে, উপেক্ষা করা ডক্স বাদ দিয়ে                                                                                                                                                                                                                                                                                                                                    | বর্তমান CI ওয়্যারিং-এ পরামর্শ (`--strict` পাস করা হয়নি)                                                                                             |
| ↳ `check:doc-links`            | ডক্সে অভ্যন্তরীণ মার্কডাউন লিঙ্কগুলি বাস্তব ফাইলগুলিতে সমাধান করে (`[text]`/`(path)` ফর্ম)                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                                                                                                                                 |
| ↳ `check:fabricated-docs`      | রুট, env vars, CLI কমান্ড, হুকের নাম এবং ডক্সে উদ্ধৃত ফাইল পাথ কোডবেসে বিদ্যমান। `--strict` এর মাধ্যমে হার্ড গেট; পতাকা ছাড়া soft-fail.                                                                                                                                                                                                                                                                                                                 | হ্যাঁ ( CI তে `--strict` এর মাধ্যমে)                                                                                                                  |
| `check:cli-i18n`               | CLI-তে ব্যবহৃত `t()` কী-গুলো `en`-এ আছে; `pt-BR` প্রতিটি শীর্ষস্তরের বিভাগ ধরে রাখে; `zh-CN` ও `zh-TW`-এ `en`-এর প্রতিটি কী আছে                                                                                                                                                                                                                                                                                                                          | হ্যাঁ                                                                                                                                                 |
| `check:openapi-coverage`       | OpenAPI spec বাস্তব routes-এর অন্তত ratchet-নির্ধারিত ন্যূনতম সীমা কভার করে                                                                                                                                                                                                                                                                                                                                                                              | হ্যাঁ                                                                                                                                                 |
| `check:openapi-security-tiers` | ঘোষিত `x-loopback-only`/`x-always-protected` অ্যানোটেশনের সমর্থন `routeGuard.ts`-এ থাকতে হবে; পার্সারের ত্রুটি ও সামনের দিকের যাচাইয়ে অমিল বাধা দেয়। কেবল স্থানীয় ব্যবহারের উপসর্গগুলোর অধীনে `x-loopback-only` অনুপস্থিত কি না, তার বিপরীতমুখী যাচাই কেবল সতর্ক করে; শুধু প্যাটার্ন দিয়ে নির্ধারিত রুটগুলো এই বিপরীতমুখী যাচাই থেকে বাদ যায়।                                                                                                       | পার্সার ও সামনের দিকের যাচাই বাধা দেয়; বিপরীতমুখী যাচাই পরামর্শমূলক                                                                                  |
| `check:openapi-routes`         | যুক্তিসহ নির্ধারিত `KNOWN_STALE_SPEC` অনুমোদন-তালিকা প্রয়োগের পর, `openapi.yaml`-এর প্রতিটি `/api...` পাথ প্যারামিটারের পার্থক্য উপেক্ষা করে একটি বাস্তব রুটের সঙ্গে মেলে; অনুমোদন-তালিকার অচল এন্ট্রিও যাচাই ব্যর্থ করে                                                                                                                                                                                                                                | হ্যাঁ                                                                                                                                                 |
| `check:docs-symbols`           | প্রতিলিপি নয় এমন প্রামাণ্য নথির অভ্যন্তরীণ `/api/...` URL উল্লেখগুলো বাস্তব রুট বা রুট-পরিবারের সঙ্গে মেলে; প্রক্সি/আপস্ট্রিম/স্থানধারক/ফাইলের উল্লেখ এবং যুক্তিসহ রাখা `KNOWN_STALE_DOC_REFS` এন্ট্রি বাদ যায়, আর অনুমোদন-তালিকার অচল এন্ট্রি যাচাই ব্যর্থ করে                                                                                                                                                                                        | হ্যাঁ                                                                                                                                                 |
| `i18n translation drift`       | সম্পূর্ণ ভর্তির জন্য শূন্য উৎস, অনুপস্থিত-লক্ষ্য, লক্ষ্য-হ্যাশ, বাসি-অনুবাদ এবং বিভাগ-ক্যাশে অসঙ্গতি প্রয়োজন। সাধারণ PR প্রস্তুতি সঠিক উত্তরাধিকারসূত্রে প্রাপ্ত প্রমাণ বা অপরিবর্তিত সম্পূর্ণ অবস্থা এবং টার্গেট বাইটের সাথে শুধুমাত্র ইংরেজী মুলতুবি পরিবর্তন ধরে রাখতে পারে; এর রিপোর্ট আলাদাভাবে একত্রীকরণ প্রস্তুতি ঘোষণা করে। অনুপস্থিত লক্ষ্য হ্যাশ এবং অসম্পূর্ণ ভিত্তি প্রমাণ ব্লক. একটি অনুপস্থিত উত্তরাধিকার বিভাগ ক্যাশে একটি ব্যর্থতা নয়. | সমস্ত পাঁচটি ক্লাস queue/base ভর্তি ব্লক করে; সাধারণ প্রস্তুতির অনুমতি শুধুমাত্র উত্তরাধিকারসূত্রে প্রাপ্ত বা ইংরেজি-শুধুমাত্র মুলতুবি কাজ প্রমাণ করে |

`docs/diagrams/` অধীনে বারোটি README SVGs তৈরি হয় (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` তাদের সকলকে পুনরুত্পাদন করে)। প্রতিটির একটি বাইট-তুলনা ইউনিট পরীক্ষা রয়েছে (`tests/unit/docs/readme-*-svg.test.ts`, জব `test-unit`) যা প্রতিশ্রুতিবদ্ধ ফাইলটি বাসি হয়ে গেলে ব্যর্থ হয় এবং `check:docs-counts` তাদের `<text>` নোড — থেকে ক্যানোনিকাল সংখ্যাগুলি পড়ে যার কারণে রূপরেখার ধাপটি ফাইলের প্রতিটি রূপরেখা স্ট্রিংকে অদৃশ্য `<text>` হিসাবে রাখে। SVG ক্যানোনিকাল-সংখ্যার চেক `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, প্লাস `public/images/tier-flow-dark.svg` এবং `tier-flow-light.svg`; ফ্রি-এভার, ক্যাটালগ-এন্ট্রি, রিকারিং-পুল এবং স্কোরিং-ফ্যাক্টর দাবিগুলিও `promise-pillars.svg`, `free-tier-budget.svg` এবং `strategies-grid.svg` পড়ে। `free-tier-budget.svg` লাইভ ক্যাটালগ লোডার থেকে এর পরিসংখ্যান আঁকে, তাই `FREE_MODEL_BUDGETS` বা প্রদানকারীর ডিসপ্লে নাম পরিবর্তন করা হলে সেই ফাইলটি পুনরায় জেনারেট না হওয়া পর্যন্ত CI লাল হয়ে যায়।

### কাজ: `i18n-ui-coverage`

| স্ক্রিপ্ট                         | যা যাচাই করে                                                                                                                                                                                     | ব্লকিং     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check-ui-keys-coverage` (ইনলাইন) | UI i18n কী কভারেজ ≥ 65%                                                                                                                                                                          | হ্যাঁ      |
| `check-ui-value-drift` (ইনলাইন)   | পুনর্লিখিত ইংরেজি **মানের** কোনো অচল অনুবাদ অবশিষ্ট নেই                                                                                                                                          | হ্যাঁ      |
| `check-new-key-coverage` (ইনলাইন) | একটি **নতুন** ইংরেজি কী প্রতিটি লোকেলে অনূদিত — একটি `__MISSING__:` মার্কার প্রত্যাখ্যাত হয়                                                                                                     | হ্যাঁ      |
| `check-translation-ratio`         | প্রতি লোকেলে প্রকৃত-অনুবাদের অনুপাত (ইংরেজির সঙ্গে অভিন্ন / প্লেসহোল্ডার / অনুমোদন-তালিকার বাইরে অনুপস্থিত লিফ) অবশ্যই `config/quality/i18n-translation-baseline.json` + স্ল্যাক অতিক্রম করবে না | **ব্লকিং** |

`fetch-depth: 0` প্রয়োজন — ভ্যালু-ড্রিফ গেটটি মার্জ বেসের বিপরীতে `en.json`-এর ডিফ করে।

#### `check-ui-value-drift` — পুরোনো-অনুবাদ গেট

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

মানের বিচ্যুতি এবং নতুন-কী গেট—উভয়ই `scripts/i18n/resolve-ui-diff-base.mjs` থেকে পাওয়া একই অপরিবর্তনীয় তুলনা শেয়ার করে। ওয়ার্কফ্লোটি উভয় পরীক্ষায় একই base, base-tip এবং candidate SHA পাঠায়। PR/base-retarget, push এবং merge-group রানগুলো তাদের event context ব্যবহার করে। কোনো candidate branch dispatch করতে হলে সেটির সঠিক open PR অথবা স্পষ্ট `i18n_base_sha` ইনপুট প্রয়োজন। ওই ইনপুট ছাড়া `main` বা `release/vX.Y.Z`-এর dispatch বা scheduled observation শেষ commit-টিকে তার first parent-এর সঙ্গে তুলনা করে; এটি উত্তরাধিকারসূত্রে পাওয়া সমস্ত translation debt-এর audit নয়। স্থানীয়ভাবে invocation-এর জন্য একটি স্পষ্ট comparison base প্রয়োজন, যেমন উপরের `BASE_REF` command।

অনুপস্থিত বা দ্ব্যর্থক comparison context, পড়া যায় না বা অবৈধ এমন আবশ্যিক catalog এবং পরিবর্তিত candidate-এর ফলে exit code **2** সহ `INCOMPLETE` হয়—warn mode-এও। Catalog পড়তে `scripts/i18n/read-ui-catalog.mjs` ব্যবহার করা হয়; read failure-এর পরিবর্তে empty object ব্যবহার করা হয় না। unavailable base বা incomplete input—কোনোটিই PASS প্রতিষ্ঠা করে না।

### জব: `i18n`

সম্পূর্ণ i18n যাচাইকরণ ম্যাট্রিক্স (প্রতি লোকেলে একটি জব)। পুরো জবটি পরামর্শমূলক।

| স্ক্রিপ্ট                       | যা যাচাই করে                     | ব্লকিং                                               |
| ------------------------------- | -------------------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | প্রতি লোকেলে অনুবাদের সম্পূর্ণতা | **পরামর্শমূলক** (পুরো জবে `continue-on-error: true`) |

### জব: `pr-test-policy`

শুধু পুল রিকোয়েস্টে চলে।

| স্ক্রিপ্ট              | যা যাচাই করে                                                                                                                                         | ব্লকিং |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | যেসব PR `src/`, `open-sse/`, `electron/`, অথবা `bin/`-এর প্রোডাকশন কোড পরিবর্তন করে, সেগুলোতে অবশ্যই টেস্ট যোগ বা হালনাগাদ করতে হবে (হার্ড রুল #8)   | হ্যাঁ  |
| `check:test-masking`   | পরিবর্তিত টেস্ট ফাইলগুলো মোট অ্যাসার্টের নিট সংখ্যা কমায় না বা `assert.ok(true)`-এর মতো স্বতঃসিদ্ধ অ্যাসারশন যোগ করে না                             | হ্যাঁ  |
| `check:pr-evidence`    | PR-এর বডিতে পরিবর্তনের জন্য টেস্ট/VPS প্রমাণ উল্লেখ করা হয়েছে (PR-এর গদ্য grep করে হার্ড রুল #18 যান্ত্রিকভাবে প্রয়োগ করে — ভঙ্গুর, ব্যাকলগ দেখুন) | হ্যাঁ  |

### কাজ: `test-vitest`

`changes` শ্রেণিবিন্যাস জবটি প্রয়োজন। প্রযোজ্য ম্যাট্রিক্স শার্ড ব্যর্থ হলে মার্জ ব্লক করে।

| স্যুট            | যা যাচাই করে                                             | ব্লকিং                                                                                                                   |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP সার্ভার (110টি টুল), autoCombo, ক্যাশ — vitest রানার | হ্যাঁ                                                                                                                    |
| `test:vitest:ui` | UI কম্পোনেন্ট টেস্ট — vitest রানার                       | **ব্লকিং** — আগে থেকে থাকা ব্যর্থতাগুলো `vitest.config.ts`-এ স্পষ্টভাবে বাদ দেওয়া হয়েছে; নতুন ব্যর্থতায় জব ব্যর্থ হয় |

### রাত্রিকালীন ওয়ার্কফ্লো (নির্ধারিত, পরামর্শমূলক)

এগুলো cron সময়সূচিতে (এবং `workflow_dispatch`-এ) চলে, PR-এ কখনো নয়। সবগুলোই পরামর্শমূলক।

| ওয়ার্কফ্লো            | যা যাচাই করে                                                                                                                                                           | ব্লকিং          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | একটি র্যান্ডম সিড + উচ্চ রান কাউন্টসহ fast-check প্রপার্টি টেস্ট                                                                                                       | **পরামর্শমূলক** |
| `nightly-resilience`   | হিপ-বৃদ্ধি গেট, ক্যাওস ফল্ট-ইনজেকশন, k6 লোড/সোক                                                                                                                        | **পরামর্শমূলক** |
| `nightly-llm-security` | promptfoo ইনজেকশন গার্ড (ব্লক মোড) + garak প্রোব (প্রোভাইডার সিক্রেট না থাকলে এড়িয়ে যাওয়া হয়)                                                                      | **পরামর্শমূলক** |
| `nightly-schemathesis` | `docs/openapi.yaml` ব্যবহার করে একটি সচল OmniRoute-এর বিরুদ্ধে OpenAPI কনট্র্যাক্ট ফাজিং (schemathesis) — স্পেসিফিকেশন লঙ্ঘন / অনিয়ন্ত্রিত 500 প্রকাশ করে (ধাপ 8 B.4) | **পরামর্শমূলক** |
| `nightly-mutation`     | দ্রুত ইউনিট লেনের ওপর Stryker মিউটেশন-টেস্টিং স্কোর — টিকে থাকা মিউট্যান্টগুলো দুর্বল অ্যাসার্ট প্রকাশ করে                                                             | **পরামর্শমূলক** |
| `nightly-compat`       | সমর্থিত `engines.node` রেঞ্জগুলো জুড়ে Node ইঞ্জিনের সামঞ্জস্য ম্যাট্রিক্স                                                                                             | **পরামর্শমূলক** |

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
- **পরামর্শমূলক** — গ্লোবাল মোট বনাম স্থিরীকৃত বেসলাইন। উত্তরাধিকারসূত্রে পাওয়া ড্রিফট কখনোই
  কোনো নির্দোষ PR-কে লাল হিসেবে চিহ্নিত করে না; রিলিজ সমন্বয়ের সময় মেরামতের জন্য ড্রিফটটি ট্র্যাক করা হয় এবং
  হেডরুম জব দ্বারা পর্যবেক্ষণ করা হয়।

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

### CodeQL র্যাচেট: প্রার্থী ভর্তি এবং সংগ্রহস্থল ইনভেন্টরি

CI একটি স্পষ্ট নির্ভরতা চেইনের মাধ্যমে প্রার্থী CodeQL ভর্তির মালিক: `codeql-scan` `codeql.yml` তে চার-ভাষা ম্যাট্রিক্সকে কল করে, তারপর `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` চালায়। `Gate / CI` উভয় ফলাফল প্রয়োজন. গুণমান তার নিজস্ব সাংখ্যিক চেক ধরে রাখে কিন্তু প্রযোজক শেষ হওয়ার আগে স্ক্যানারকে জিজ্ঞাসা করে না; শুধুমাত্র `Gate / Quality` সম্পূর্ণ প্রার্থী ভর্তি নয়. শুধুমাত্র ডক্স-প্রার্থীদের জন্য CodeQL আবশ্যক।

`config/quality/codeql-admission-policy.json` এর নীতি অ্যাকশন, C/C++, JavaScript/TypeScript এবং Python, ক্যোয়ারী স্যুট ডিফল্ট, রিমোট থ্রেট মডেল এবং বিল্ড মোড কোনোটিই নির্বাচন করে না। প্রযোজক প্রিফ্লাইট একটি মুলতুবি অ্যাক্টিভেশন রেকর্ড প্রত্যাখ্যান করে এবং সুস্পষ্ট লক্ষ্য তালিকার বাইরে শাখা প্রত্যাখ্যান করে। বর্তমান লক্ষ্যগুলি প্রধান এবং release/v3.8.54. চুক্তি পরীক্ষাগুলি এই সসীম তালিকা এবং রক্ষণাবেক্ষণ পুশ ট্রিগারকে প্যাকেজ সংস্করণের সাথে তুলনা করে; পরবর্তী রিলিজ অনবোর্ডিং পর্যালোচনা করা প্রয়োজন. CI এর বিদ্যমান বৃহত্তর রিলিজ PR ট্রিগার বজায় রাখা হয়েছে, কিন্তু একটি অ-বোর্ডড টার্গেট একটি অপরিমাপিত PASS পাওয়ার পরিবর্তে নিষ্কাশনের আগে HOLD রিপোর্ট করে।

প্রতিটি ম্যাট্রিক্স কাজ তার প্রকৃত SARIF আপলোড ID, ভাষা, বিভাগ, রান এবং প্রচেষ্টা, কলার ওয়ার্কফ্লো পরিচয়, ইভেন্ট ref/head/base/merge SHA এবং নীতি হ্যাশ রেকর্ড করে। নির্ভরশীল চাকরি শুধুমাত্র এই রানের রসিদগুলি ডাউনলোড করে এবং আর্টিফ্যাক্ট ডাইজেস্টগুলিকে যাচাই করে৷ এটির জন্য চারটি বিভাগ প্রয়োজন, একজন সফল প্রযোজক এবং প্রতিটি সঠিক আপলোডের সম্পূর্ণ প্রক্রিয়াকরণ। এটি API এর sarif_id ফিল্টার ব্যবহার করে, একটি শাখায় পাওয়া সর্বশেষ বিশ্লেষণ নয়। আংশিক পুনঃরান একই দৌড় এবং প্রার্থীর পূর্ববর্তী প্রচেষ্টা থেকে সফল বিভাগগুলি পুনঃব্যবহার করতে পারে, উত্পাদন প্রচেষ্টা সংরক্ষণ করে; একজন ব্যর্থ বর্তমান প্রযোজক পূর্ববর্তী সবুজ প্রমাণ পুনরায় ব্যবহার করতে পারে না।

CodeQL অ্যাকশন প্রক্রিয়াকরণের জন্য অপেক্ষা করে, কিন্তু এর পিন করা বাস্তবায়ন সতর্ক করতে পারে এবং স্ট্যাটাস-রিড ব্যর্থতা বা ক্লান্ত অপেক্ষার পরে চালিয়ে যেতে পারে। ভর্তি তাই আবার প্রক্রিয়াকরণ যাচাই. অনুপস্থিত বিভাগ, মুলতুবি প্রক্রিয়াকরণ, ব্যর্থ বা বাতিল করা কাজ, বাসি পরিচয়, অসম্পূর্ণ পৃষ্ঠা সংখ্যা বা অনুপলব্ধ APIs HOLD উত্পাদন করে এবং প্রস্থান 2। একটি স্বাধীন স্ক্যানার কর্মপ্রবাহের জন্য কোন নির্দিষ্ট অপেক্ষা অবশিষ্ট নেই। একটি আনস্ক্যান করা PR পাস করতে পারে না কারণ একটি সতর্কতা ক্যোয়ারী 0 রিটার্ন করেছে। `metrics.codeqlAlerts.value` উপরে একটি পরিমাপ করা গণনা 1 থেকে বের হয়; বেসলাইন অন্য শাখার সতর্কতা শোষণ করার জন্য উত্থাপিত হয় না। [স্থিতি এবং বিশ্লেষণ লুকআপ আপলোড করুন](https://docs.github.com/en/rest/code-scanning/code-scanning) ।

রসিদ IDs, বিভাগ, টুল সংস্করণ, ref/SHA, বেসলাইন এবং সতর্কতা নম্বর আপলোড এবং বিশ্লেষণ করে। SARIF identity/result গণনা, ন্যূনতম নিয়ম গণনা এবং সঠিক সতর্কতা দৃষ্টান্তগুলি বাধ্যতামূলক। PR/analysis পরিচয়গুলি গ্রহণ করার আগে পুনরায় পরীক্ষা করা হয়। এই চেকগুলি কনফিগার করা বিভাগ কভারেজ স্থাপন করে, প্রতিটি নিষ্কাশিত উৎস ফাইলের একটি তালিকা নয়। C/C++ নো-বিল্ড নিষ্কাশন একটি প্রকল্প নির্মাণের সময় উত্পন্ন কোড অন্তর্ভুক্ত করে না। উত্স বর্জনের এখনও পর্যালোচনা প্রয়োজন, এবং অবদানকারী অ্যাট্রিবিউশনের তুলনামূলক সঠিক-বেস প্রমাণ প্রয়োজন।

`codeql-maintenance.yml` PR/main প্রযোজকদের নকল না করে সক্রিয়-রিলিজ পুশ স্ক্যান এবং সাপ্তাহিক সময়সূচী সরবরাহ করে। `nightly-codeql-inventory.yml` রিপোজিটরি-ওয়াইড বেসলাইন আলাদা রাখে, `--strict-measurement` সহ এবং পরিমাপ অনুপলব্ধ হলে একটি ব্যর্থতা। স্থানীয় উত্তরাধিকার সংগ্রাহকের করুণাময় এড়িয়ে যাওয়া প্রার্থী ভর্তি নয়। একটি যাচাইকৃত নিম্ন বৈশ্বিক গণনার পরে কঠোর করা একটি সুস্পষ্ট `--update` রয়ে গেছে।

ডিফল্ট সেটআপ কনফিগার করার সময় উন্নত ওয়ার্কফ্লো প্রকাশ করা উচিত নয়: GitHub সেই সমন্বয় প্রত্যাখ্যান করে। পর্যালোচনা করা প্রশাসনিক রূপান্তরটি পুনরায় পড়া না হওয়া পর্যন্ত এর সংস্করণযুক্ত নীতিটি মুলতুবি থাকে৷ প্রকাশের আগে, একটি অপারেটর পিন সংগ্রহস্থল, head/base/tree, policy/patch/rollback হ্যাশ এবং পর্যবেক্ষণ করা সেটআপ অবস্থা; `node scripts/quality/codeql-producer.mjs verify-admin-readback` সরবরাহকৃত প্রত্যাশিত এবং প্রকৃত JSON রেকর্ড পরীক্ষা করে। এটি একটি প্রযুক্তিগত প্রহরী, অপারেটরের অনুমোদন বা নতুন রিডব্যাক আনার জন্য প্রতিস্থাপন নয়। PR টোকেন কখনই প্রশাসনের অ্যাক্সেসের অনুরোধ করে না। রোলআউট এবং যেকোনো স্ক্যানার পরিবর্তনের জন্য আলাদা রিডব্যাক প্লাস রিয়েল PR, ফর্ক এবং মার্জ-গ্রুপ সামঞ্জস্যের প্রমাণ প্রয়োজন।

ফর্কগুলি হোস্ট করা রানার ব্যবহার করে, ক্রমাগত শংসাপত্র ছাড়াই চেকআউট করে, প্রযোজকের মধ্যে কোনও প্রকল্প install/build নেই, এবং কোনও উত্তরাধিকার সূত্রে পাওয়া তথ্য নেই৷ GitHub তার হ্রাসকৃত ফর্ক টোকেন সহ pull_request ইভেন্টের জন্য SARIF আপলোড সমর্থন করে; প্রথমবার অবদান সম্পাদন অনুমোদন GitHub নীতি অবশেষ. অবিশ্বস্ত কোড চালানোর জন্য কখনোই pull_request_target ব্যবহার করবেন না। মাইগ্রেশন সম্পূর্ণ বিবেচনা করার আগে নিয়ন্ত্রিত ক্যানারিতে প্রকৃত টোকেন অনুমতি, বিশ্লেষণ_কি এবং সমস্ত বিভাগের পরিবেশ নিশ্চিত করুন। [ফর্ক আপলোড নিয়ম](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [বিরোধপূর্ণ সেটআপ মোড](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows) ।

**বরখাস্ত হল অপারেটরের কল (হার্ড রুল #14)** বরখাস্তের মন্তব্যে প্রযুক্তিগত যুক্তি রেকর্ড না করে — কখনই CodeQL সতর্কতা খারিজ করে না: একটি আপস্ট্রিম-প্রটোকল প্রয়োজনীয়তার জন্য `won't fix`, একটি পরীক্ষার ফিক্সচারের জন্য `used in tests`, একটি স্যানিটাইজারের জন্য `false positive` CodeQL দেখতে পারে না (নজির: `docs/security/ERROR_SANITIZATION.md`)।

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
2. `package.json`-এ `"check:<name>": "node scripts/check/check-<name>.mjs"` যোগ করুন এবং
   `config/quality/gate-manifest.json`-এ অ্যালিয়াস ও এর সঠিক কমান্ডটি সিঙ্ক্রোনাইজ করুন।
   বিদ্যমান কোনো ভ্যালিডেশন অ্যালিয়াস পরিবর্তন বা অপসারণের সময়ও একইভাবে সিঙ্ক্রোনাইজ করুন।
   `npm run check:gate-manifest` চালান; pre-commit hook এবং CI পরিবর্তন শ্রেণিবিন্যাস
   এই চুক্তিটি প্রয়োগ করে।
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

**উপরেও নথিভুক্ত হয়নি** (advisory, কম signal): `docs-lint` job (markdownlint + Vale, পুরো job `continue-on-error`) এবং স্বাধীন scanner workflow `semgrep.yml` / `scorecard.yml`। CodeQL এখন `Gate / CI`-এ বাধ্যতামূলক producer ও admission job রাখে, উপরোক্ত activation শর্তসাপেক্ষে। `semgrepFindings: 0` আছে `quality-baseline.json`-এ, কিন্তু `ci.yml`-এর blocking ratchet-এ যুক্ত নেই — metric এখন সংযোগহীন।

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
