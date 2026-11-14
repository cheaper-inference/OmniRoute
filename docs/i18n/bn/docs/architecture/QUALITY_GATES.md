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

CI এবং কোয়ালিটি গেটস কর্মপ্রবাহ প্রতিটি একটি স্থিতিশীল রায় নির্গত করে: `Gate / CI` এবং `Gate / Quality`। তাদের সংস্করণযুক্ত ভর্তি নীতি প্রয়োজনীয় বা উপদেষ্টা হিসাবে প্রতিটি আপস্ট্রিম কাজের গণনা করে। একটি প্রযোজ্য প্রয়োজনীয় কাজ অবশ্যই সফল হতে হবে: অনুপস্থিত, বাতিল, এড়িয়ে যাওয়া, মুলতুবি এবং অজানা ফলাফল PASS প্রতিষ্ঠা করতে পারে না। একটি বৈধ ডক্স-শুধু বা ক্যাটালগ-শুধু শ্রেণীবিভাগ একটি কোড লেনকে অপ্রযোজ্য করে তুলতে পারে; একটি খসড়া PR একটি গৃহীত প্রার্থী নয়। একটি `hotfix` লেবেল প্রমাণ পরিত্যাগ করে না।

উভয় কর্মপ্রবাহই PRs main/release শাখায় ঢেকে দেয়, `main` এ ঠেলে দেয়, ম্যানুয়াল ডিসপ্যাচ এবং মার্জ-গ্রুপ ইভেন্ট। পুশ, ডিসপ্যাচ এবং মার্জ-গ্রুপ সম্পূর্ণ নির্বাচন চালান। `release/**` এ পুশ করলে সেগুলি শুরু হয় না (2026-10-18): প্রতিটি পরিবর্তন ইতিমধ্যেই তার PR এ ম্যাট্রিক্স চালায় এবং একত্রিত সমন্বয় হল রিলিজ-গ্রীনের কাজ (`docs/ops/RUNNER_BOX.md` → হোস্টেড লেন)। ফর্কস এবং মার্জ গ্রুপগুলি কাজের জন্য হোস্টেড রানার ব্যবহার করে যা অন্যথায় স্ব-হোস্টেড রানারদের নির্বাচন করে; রোলআউট করার আগে পর্যাপ্ত হোস্ট করা ক্ষমতা অবশ্যই যাচাই করা উচিত।

একটি সাধারণ PR দ্রুত নির্বাচন চালায়। ভর্তি নীতির `full-code` এবং `full-code-e2e` লেনগুলি (E2E, ইন্টিগ্রেশন, প্যাকেজ আর্টিফ্যাক্ট, Electron স্মোক, Bun SQLite, ইকোসিস্টেম এবং প্রোটোকল ক্লায়েন্ট) শুধুমাত্র একটি মার্জিফাই কিউ ড্রাফ্টে বা সম্পূর্ণ রানে চলে: `gh workflow run ci.yml --ref <branch>`।

প্রতিটি JSON রসিদ চেক-আউট SHA, ওয়ার্কফ্লো চালানো এবং প্রচেষ্টা চিহ্নিত করে। CLI একটি checkout/event SHA অমিল প্রত্যাখ্যান করে। ওয়ার্কফ্লো পরীক্ষাগুলি নীতি সদস্যতাকে রায় কাজের `needs` তালিকার সাথে আবদ্ধ করে যাতে একটি নতুন বা সরানো লেন নীরবে অদৃশ্য হয়ে যেতে পারে না। রসিদগুলি তাদের নিজস্ব কর্মপ্রবাহকে কভার করে, প্রকাশনা, স্থাপনা বা বিদ্যমান উপদেষ্টা স্ক্যানারের অভ্যন্তরীণ অংশ নয়। শাখা নিয়মে উভয় চেকের নাম সক্রিয় করা একটি পৃথক প্রশাসনিক পরিবর্তন; এই কাজ যোগ করা নিজেই একটি শাখা রক্ষা করে না.

### সারি মার্জ করুন

`queue` লেবেল Mergify কিউতে একটি PR পাঠায় (`.mergify.yml`)। Mergify একটি `mergify/merge-queue/` শাখায় একটি খসড়া PR খোলে, CI সেখানে সম্পূর্ণ নির্বাচন চালায়, এবং `Gate / CI`, `Gate / Quality` এবং `Merge integrity (changelog + generated skills)` পাস করলে আসল PR একত্রিত হয়।

Mergify খসড়ার বিবরণে তার সারির সারাংশ লিখে, এবং অন্যান্য অ্যাপগুলিও এটি সম্পাদনা করতে পারে। এই ধরনের একটি খসড়াতে একটি `pull_request` `edited` ইভেন্ট তার নিজস্ব সমবর্তী গোষ্ঠী (`-queue-edit-<run_id>`) নেয় তাই এটি খসড়াটির আসল রান বাতিল করতে পারে না এবং এটি গেট এবং ম্যাট্রিক্স এড়িয়ে যায়। শুধুমাত্র `Merge integrity` এখনও চলে। বাদ দেওয়া গেট কাজের একটি ভিন্ন চেকের নাম রয়েছে, কারণ Mergify একটি এড়িয়ে যাওয়া `Gate / CI` একটি ব্যর্থ চেক হিসাবে পড়ে এবং PR dequeues করে।

একটি dequeue পরে, একটি ধাক্কা সবসময় PR অনুরোধ করে না। মন্তব্য `@mergifyio queue` এটা.

### স্বীকৃতি হ্রাসকারী প্রমাণ বজায় রাখা

`scripts/quality/validate-release-acceptance.mjs` একটি সরবরাহকৃত পরিকল্পনা এবং এর প্রকাশ হ্রাস করে; এটি স্থাপন করে না যে পরিকল্পনাটি সম্পূর্ণ মুক্তি পাইপলাইনকে কভার করে। এর প্রতিবেদনগুলি স্পষ্টভাবে `releaseAcceptance: false` সেট করে, এমনকি যখন সেই পরিকল্পনাটি `VERIFIED` হয়। `release-acceptance.yml` ওয়ার্কফ্লো এখনও ছায়া ফিক্সচার ব্যবহার করে, বাস্তব বিল্ড, প্যাকেজ, বুট বা প্রচারের রসিদ নয়।

রক্ষিত প্রমাণ যাচাই করার জন্য CLI এর `--evidence-root` প্রয়োজন। ফাইলগুলি `<evidence-root>/<artifact_id>/<member>` হিসাবে সমাধান করা হয় এবং SHA-256হিসাবে হ্যাশ করা হয়। প্রমাণ ছাড়া একটি PASS রেকর্ড, একটি অনুপস্থিত বা পরিবর্তিত ফাইল, একটি অনিরাপদ পথ বা একটি সিমলিংক যাচাইকরণে বাধা দেয়। অনুপস্থিত ফাইলগুলি খালি সফল লগগুলির সমতুল্য নয়৷ বিদ্যমান SHA/run/attempt চেকগুলি স্বাধীন থাকে: ম্যাচিং বাইটগুলি একটি বাসি রসিদ উদ্ধার করতে পারে না। ফাইলের অখণ্ডতা মৃত্যুদন্ডের সত্যতা বা আর্টিফ্যাক্ট প্রচারের প্রমাণ নয়।

### স্ট্যাটিক স্ক্যান ইনভেন্টরি

সংস্করণযুক্ত npm-alias ইনভেন্টরি এবং স্ট্যাটিক-স্ক্যান সদস্যতা `config/quality/gate-manifest.json` তে লাইভ। স্ক্রিপ্টের নাম এবং `package.json` বিরুদ্ধে সঠিক কমান্ড যাচাই করতে `npm run check:gate-manifest` চালান; সংযোজন, অপসারণ এবং কমান্ড ড্রিফ্ট স্থানীয় হুক এবং CI এ পরিবর্তন-শ্রেণীবিভাগের কাজ উভয়ই ব্যর্থ করে। একটি উপনাম একটি ওয়ার্কফ্লো কাজ, ম্যাট্রিক্স উদাহরণ বা পরীক্ষার ক্ষেত্রে নয়: এই গণনাগুলিকে বিনিময়যোগ্য হিসাবে উপস্থাপন করা উচিত নয়৷

`npm run quality:scan -- --list` বা `npm run quality:scan:fast -- --list` ব্যবহার করে নির্বাচিত উপনামগুলি কার্যকর না করেই পরিদর্শন করুন৷ রানার এনপিএম এন্ট্রিপয়েন্টকে আহ্বান করে, তাই এর রানটাইম (যেখানে কনফিগার করা Bun সহ) সংরক্ষিত থাকে। ম্যানিফেস্ট সেই প্রোফাইলগুলির বাইরের উপনামগুলিকে আলাদাভাবে আহ্বান করা হিসাবে রেকর্ড করে, এবং রক্ষণাবেক্ষণ আদেশগুলি শুধুমাত্র-পঠনযোগ্য স্ক্যান প্রোফাইলগুলিতে নিষিদ্ধ৷

এই প্রোফাইলগুলি শুধুমাত্র স্ট্যাটিক স্ক্যান কভার করে। তারা পণ্য পরীক্ষা, কভারেজ, প্যাকেজিং, বাহ্যিক চেক বা প্রার্থীর সম্পূর্ণ রিলিজ গ্রহণযোগ্যতা প্রত্যয়িত করে না। কর্মপ্রবাহ ভর্তি লিঙ্কযুক্ত `config/quality/admission-policy.json` এবং `scripts/quality/admission-verdict.mjs` ব্যবহার করে। রিলিজ-পর্যবেক্ষক প্রোফাইল আলাদা থাকে; তাদের প্রযোজ্য চেক এবং রসিদ স্বাধীনভাবে পরিদর্শন করুন। সম্পূর্ণ পর্যবেক্ষকের স্ট্যাটিক কমান্ড `config/quality/release-green-static-profile.json` এ ঘোষণা করা হয়, যার মধ্যে `audit:deps`, মিউটেশন-পরীক্ষা নির্বাচন এবং অনুবাদ পরীক্ষা। লোডার package.json এবং মডেল করা CI/Quality ঘোষণার বিরুদ্ধে npm কমান্ড যাচাই করে; এটি আর্গুমেন্ট হিসাবে শেল টোকেন কার্যকর করার পরিবর্তে ড্রিফট প্রত্যাখ্যান করে। প্রয়োজনীয় স্ক্যানার SKIP/INCOMPLETE আউটপুট PASS প্রতিষ্ঠা করতে পারে না। প্রোফাইল তার বাহ্যিক বর্জন রেকর্ড করে এবং হোস্ট করা কভারেজ, টেস্ট ম্যাট্রিক্স, প্যাকেজ বা স্থাপনার প্রমাণ প্রতিস্থাপন করে না। নীচের গদ্য তালিকাটি একটি রেফারেন্স, এটি প্রমাণ নয় যে একটি গেট আসলে দৌড়েছিল।

স্ক্রিপ্টগুলি `scripts/check/` (পলিসি গেট) এবং `scripts/quality/` (র্যাচেট ইঞ্জিন) এর অধীনে থাকে। সত্যের CI উৎস হল `.github/workflows/ci.yml`।

### মুক্তি PR দ্রুত পথ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs এ CI পরিপূরক করে, `main` এ ঠেলে দেয়, গোষ্ঠী প্রেরণ এবং একত্রিত করে। PRs পাথ-ফিল্টার করা দ্রুত চেক ব্যবহার করে। স্থায়ীভাবে অক্ষম ডুপ্লিকেট বিল্ড সরানো হয়েছে; আসল build/package/boot চেক CI এ থাকে। ইউনিট স্যুট এবং ভিটেস্ট শুধুমাত্র CI (`Unit Tests (N/8)` এবং `Vitest`) এ চলে।

| চাকরি                                            | ব্যাপ্তি                                                                                                          | ব্লকিং              |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API ডক্স রেফ এবং ডক্স-সমস্ত                                                                        | হ্যাঁ               |
| `Fast Quality Gates`                             | কোড PRs; স্ট্যাটিক চেক, টাইপচেক, ড্যাশবোর্ড টাইপচেক, প্রভাবিত ইউনিট পরীক্ষা, ভুলে যাওয়া ভাইবোন পরীক্ষা (পরামর্শ) |
| `No new ESLint warnings`                         | কোড PRs; দমন-সচেতন লিন্ট গার্ড                                                                                    | হ্যাঁ, কাঁটাচামচ সহ |
| `Merge integrity (changelog + generated skills)` | অ-খসড়া PRs; চেঞ্জলগ এবং জেনারেটেড স্কিল সিঙ্ক                                                                    | হ্যাঁ, কাঁটাচামচ সহ |

#### ভুলে যাওয়া ভাইবোনের পরীক্ষার রিপোর্ট

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` এর একটি পরামর্শমূলক পদক্ষেপ হিসাবে চলে এবং পরীক্ষা-প্রভাব মানচিত্রের পিছনে আমদানি সমাধানকারীকে পুনরায় ব্যবহার করে। প্রতিটি পরিবর্তিত উত্পাদন মডিউলের জন্য, এটি নির্ধারক `changed module/symbol -> static consumer -> candidate sibling test` চেইন রিপোর্ট করে যখন প্রার্থী পরীক্ষাটি পুল-অনুরোধের পার্থক্য থেকে অনুপস্থিত থাকে। মার্কডাউন সারাংশ এবং JSON ফলাফল যেকোন ব্লকিং রোলআউটের আগে ক্রমাঙ্কনের জন্য `forgotten-sibling-tests` ওয়ার্কফ্লো আর্টিফ্যাক্ট হিসাবে ধরে রাখা হয়।

ব্যারেল পুনরায় রপ্তানি এবং গতিশীল আমদানি শুধুমাত্র রেজোলিউশন ডায়াগনস্টিক; তারা কখনই একটি ব্লকিং ফাইন্ডিং তৈরি করে না। পর্যালোচনা করা ব্যতিক্রমগুলি `config/quality/forgotten-sibling-allowlist.json` তে বাস করে। প্রতিটি এন্ট্রিতে ভোক্তা এবং প্রার্থীর পরীক্ষার নাম দিতে হবে, একটি নির্দিষ্ট যুক্তি দিতে হবে এবং একটি GitHub সমস্যা বা পুল অনুরোধ লিঙ্ক করতে হবে। বিকৃত এন্ট্রি ব্যর্থ হয়েছে বন্ধ. ব্যতিক্রমগুলি মুছে ফেলা প্রার্থীর পরীক্ষা বা `.skip`/`.todo` যোগ করে এমন একটি পার্থক্য দমন করতে পারে না; দাবি দুর্বল করা এবং অন্যান্য মাস্কিং স্বাধীনভাবে ব্লক করা `check:test-masking` গেটের মালিকানাধীন থাকে।

### চাকরি: `lint`

প্রতিটি PR থেকে `main` পর্যন্ত চলে। ব্লকগুলি ব্যর্থতার উপর একত্রিত হয়।

| স্ক্রিপ্ট (`npm run ...`)         | যাচাই করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ব্লকিং                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js সংস্করণটি সমর্থিত পরিসরের মধ্যে রয়েছে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                    |
| `check:cycles`                    | সমস্ত `src/` + `open-sse/` জুড়ে সার্কুলার আমদানি (AST-ভিত্তিক, tsconfig `paths` সমাধান করা হয়েছে)। যখনই কোনো চক্র বিদ্যমান থাকে তখন বেয়ার 1 থেকে প্রস্থান করে ( #15281 থেকে ব্যর্থ-বন্ধ) এবং SCCs তালিকাভুক্ত করে। `check:cycles:ratchet` (কি CI চলে) ব্লক করে যখন গণনা `quality-baseline.json` — এ `metrics.cycles` সিলিং ছাড়িয়ে যায় বর্তমানে 14, `direction: down`, তাই এটি শুধুমাত্র পড়ে যেতে পারে (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | হ্যাঁ (শাক)                              |
| `check:boundary`                  | `open-sse → src` কাপলিং: ইঞ্জিন থেকে অ্যাপে অনন্য ফাইল-টু-ফাইল আমদানি (`scripts/quality/measure-boundary.mjs`; প্রান্ত তালিকা হল v4 core/module-split প্রতিকার ব্যাকলগ)। বেয়ার = উপদেষ্টা প্রতিবেদন ( `quality:boundary` এর মতোই)। `check:boundary:ratchet` (কি CI চলে, `quality.yml` ফাস্ট-গেট র্যাচেট লুপেও) ব্লক করে যখন গণনা 771, `direction: down` এ `quality-baseline.json` — সিলিং-এ `metrics.boundaryOpenSseToSrc` সিলিং ছাড়িয়ে যায়; `--update` শুধুমাত্র এটি কমিয়ে দেয়; PRs এ বেস-রিলেটিভ (`--base-ref`, নীচে দেখুন)                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ (শাক)                              |
| `check:route-validation:t06`      | সমস্ত রুটেZod স্কিমা উপস্থিত (টায়ার 6 নীতি)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` গণনা বাজেটের বেশি নয় (টিয়ার 11 ক্যাট্রাকা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | হ্যাঁ                                    |
| `check:provider-consistency`      | `providers.ts` এর প্রতিটি প্রদানকারীর `providerRegistry.ts` এ একটি ম্যাচিং এন্ট্রি রয়েছে (এবং এর বিপরীতে, অনুমোদিত তালিকার মধ্যে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | হ্যাঁ                                    |
| `check:model-lifecycle`           | তিনটি হাতে রক্ষণাবেক্ষণ করা রাউটিং টেবিল চেক-ইন লাইফসাইকেল স্ন্যাপশট (#11503) এর সাথে সামঞ্জস্যপূর্ণ থাকে : `FITNESS_TABLE` (`taskFitness.ts`) স্কোর কোনো অবসরপ্রাপ্ত আইডি নেই যা `REGISTRY` রুট করতে পারে; প্রতিটি `BUILT_IN_ALIASES` টার্গেট `REGISTRY` এ উপস্থিত এবং অবসরপ্রাপ্ত-আইডি স্ন্যাপশট থেকে অনুপস্থিত; `REGISTRY` এ থাকা প্রতিটি অবসরপ্রাপ্ত আইডি `allowedRetiredInCatalog` এ ফরোয়ার্ড বা তালিকাভুক্ত করা হয়; এবং কোন `DEFAULT_DEGRADATION_MAP` উৎস বা লক্ষ্য সেই স্ন্যাপশটে অবসরপ্রাপ্ত প্রদর্শিত হবে না। এটি প্রমাণ করে না যে একটি মডেল বর্তমানে একটি লাইভ আপস্ট্রিম দ্বারা পরিবেশিত হয়৷ অফলাইন — `config/quality/model-lifecycle.json` সাথে তুলনা করে, `npm run quality:refresh-model-lifecycle` দিয়ে হাতে রিফ্রেশ করা হয় (নেটওয়ার্ক; CI এ তারযুক্ত নয়)। `allowedRetiredInCatalog` হল একটি বার্ন-ডাউন র্যাচেট: শুধুমাত্র একটি ট্র্যাকিং সমস্যা সহ একটি এন্ট্রি যোগ করুন।                                         | হ্যাঁ                                    |
| `check:fetch-targets`             | ক্লায়েন্ট-সাইড `src/` এর প্রতিটি `fetch("/api/...")` একটি বাস্তব `route.ts` তে সমাধান করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                    |
| `check:deps`                      | রেপোতে প্রতিটি `package.json` জুড়ে সমস্ত `npm install` -able deps `dependency-allowlist.json` এ রয়েছে; নতুন আনপিন বা স্লপস্কোয়াট প্যাকেজ পতাকাঙ্কিত                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | হ্যাঁ                                    |
| `audit:deps`                      | সমস্ত পাঁচটি স্বাধীন লকফাইলের npm অডিট (root, Electron, OpenCode প্লাগইন v1/v2 এবং প্রদানকারী)। সমালোচনামূলক পরামর্শ ব্লক; উচ্চ পরামর্শ দৃশ্যমান সতর্কতা অবশেষ. Missing/failed অডিট হল INCOMPLETE এবং ব্লক; প্রতি-স্কোপ লক হ্যাশ এবং রিপোর্ট বজায় রাখা হয়।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                    |
| `check:lockfile`                  | `package-lock.json` integrity — https রেজিস্ট্রি, ইন্টিগ্রিটি হ্যাশ, কোন হোস্ট ওভাররাইড নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                    |
| `check:licenses`                  | উৎপাদন নির্ভরতার জন্য SPDX লাইসেন্স অনুমোদিত তালিকা                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ                                    |
| `check:tracked-artifacts`         | কোন বিল্ড আর্টিফ্যাক্ট / প্রতিশ্রুতিবদ্ধ `node_modules` সিমলিংক নেই (এছাড়াও হাস্কি প্রি-কমিটে চলে; প্রি-পুশ ইচ্ছাকৃতভাবে হালকা — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                    |
| `check:ai-attribution`            | PR কমিট, শিরোনাম বা বডি — হার্ড রুল #16 এ কোন AI/bot `Co-Authored-By` ট্রেলার বা AI-জেনারেশন `commit-msg` নেই ( PR→ `release/**` — #14436 জন্য `quality.yml` ফাস্ট-গেটস লুপে ইভেন্ট পেলোড পড়ে, `ci.yml` -অফ অফ PRs — `main`-এর জন্য একটি ধাপ PR→;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | প্রতিটি Vitest বর্জন একটি ট্র্যাকিং সমস্যার নাম দেয় এবং `config/quality/vitest-exclusions.json` (#13204) এ প্রদর্শিত হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | হ্যাঁ                                    |
| `check:file-size`                 | সোর্স ফাইল (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) `cap` এর মধ্যে থাকে এবং `testCap` মধ্যে পরীক্ষা ফাইল (`*.test.ts(x)`) থাকে ; `file-size-baseline.json` (`frozen` / `testFrozen`) তে হিমায়িত ফাইলগুলি অবশ্যই তাদের রেকর্ড করা আকারের আগে বাড়বে না                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                    |
| `check:error-helper`              | executors/handlers এ ত্রুটির প্রতিক্রিয়া `buildErrorBody()` / `sanitizeErrorMessage()` ব্যবহার করে (হার্ড রুল #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ                                    |
| `check:migration-numbering`       | মাইগ্রেশন SQL ফাইলগুলি ক্রমানুসারে সংখ্যাযুক্ত, কোনও ফাঁক বা সদৃশ নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                    |
| `check:public-creds`              | `publicCreds.ts` এর বাইরে কোন আক্ষরিক OAuth `client_id`/`client_secret` বা ফায়ারবেস ওয়েব কী নেই (হার্ড রুল #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                    |
| `check:db-rules`                  | `src/lib/db/` মডিউলের বাইরে কোন কাঁচা SQL নেই; `localDb.ts` থেকে ব্যারেল-আমদানি নেই (হার্ড রুলস #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | হ্যাঁ                                    |
| `check:known-symbols`             | প্রোভাইডার এক্সিকিউটর, রাউটিং কৌশল এবং অনুবাদক তাদের ডিসপ্যাচ টেবিলে নিবন্ধিত ফাইলের সাথে মেলে ডিস্ক — কোন অনাথ বা অঘোষিত প্রতীক                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | হ্যাঁ                                    |
| `check:route-guard-membership`    | প্রতিটি রুট যা একটি শিশু প্রক্রিয়ার জন্ম দেয় `isLocalOnlyPath()` দ্বারা শ্রেণীবদ্ধ করা হয় (হার্ড রুলস #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                    |
| `check:test-discovery`            | রেপোতে থাকা প্রতিটি `*.test.ts` / `*.spec.ts` ফাইল কমপক্ষে একজন টেস্ট রানার দ্বারা সংগ্রহ করা হয় (র্যাচেট: `test-discovery-baseline.json` এ এতিম তালিকা শুধুমাত্র সঙ্কুচিত হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                    |
| `check:test-tla-order`            | `tests/unit` অধীনে কোনো `node:test` ফাইল একটি পরীক্ষা নিবন্ধন করে না, একটি শীর্ষ-স্তরের `await` আঘাত করে, তারপর আরও নিবন্ধন করে (#18045; ratchet: `test-tla-order-allowlist.json` শুধুমাত্র সঙ্কুচিত হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                    |
| `check:agent-skills-sync`         | জেনারেটেড এজেন্ট-স্কিল আর্টিফ্যাক্টগুলি তাদের উত্স ক্যাটালগের সাথে মেলে (কোন প্রবাহ নেই)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | প্রদানকারী logos/assets একটি নথিভুক্ত উৎস এন্ট্রি বহন করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON কনফিগার ফাইলগুলি পার্স করে এবং রেপো লিন্টের নিয়মগুলি পূরণ করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | ত্রুটি ছাড়াই TypeScript সংকলন (শুধুমাত্র পরামর্শমূলক সতর্কতা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                    |
| `typecheck:noimplicit:core`       | কঠোর `noImplicitAny` — দূরদর্শী; অনেক প্রাক-বিদ্যমান কল সাইটের এখনও টীকা প্রয়োজন                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **উপদেষ্টা** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` স্কোপ টু `src/app/(dashboard)/**` (#7033) — `typecheck:core` এর কিউরেটেড 27-ফাইল অনুমোদন তালিকায় কোনো ড্যাশবোর্ড TSX অন্তর্ভুক্ত নেই, এবং `next build` কখনোই এটি টাইপ-চেক করে না (`next.config.mjs` সেট করে `ignoreBuildErrors: true`), তাই অনাথ-আইডেন্টিফায়ার রিগ্রেশন সেখানে (#6625/#6909CI) একটি হিমায়িত per-file/per-TS-code গণনা বেসলাইনের বিরুদ্ধে পার্থক্য (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` হিসাবে একই বাসি-প্রবর্তন প্যাটার্ন) — শুধুমাত্র বেসলাইন গণনার বাইরে NEW ত্রুটিগুলি গেটকে ব্যর্থ করে; একটি পূর্ব-বিদ্যমান ত্রুটি সংশোধন করা হলে `--update` দিয়ে র্যাচেট ডাউন করুন।                                                                                                                                                                                                                                                                                               | হ্যাঁ                                    |
| `check:build-typecheck`           | পুরো-অ্যাপ প্রোডাকশন টাইপ চেক ওভার `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), পৃষ্ঠ `typecheck:core` এর 27-ফাইল অনুমোদন তালিকা এবং ড্যাশবোর্ড গেট কভার করে না। `config/quality/build-typecheck-baseline.json` বিরুদ্ধে পার্থক্য; একটি নতুন বা উত্থিত প্রতি-(ফাইল, কোড) গণনা ব্যর্থ হয়, একটি নিম্ন গণনা আপনাকে র্যাচেট করতে বলে। `--update` প্রত্যাখ্যান করে যখন রানে একটি নতুন বা উত্থিত জোড়া থাকে যদি না `--force-regressions` পাস হয়, এবং `--force-nocheck` পাস না হওয়া পর্যন্ত একটি নতুন সাইলেন্সড ফাইল প্রত্যাখ্যান করে, তাই সবুজ পেতে বেসলাইনকে প্রশস্ত করা এবং স্থায়ী নীরবতা দেওয়া দুটি পৃথক ইচ্ছাকৃত কাজ। একটি খালি `--force` প্রত্যাখ্যান করা হয়. এছাড়াও `config/quality/ts-nocheck-baseline.json` বিপরীতে `@ts-nocheck` জন্য বিল্ড স্কোপ স্ক্যান করে, কারণ এটি ব্যবহার করা একটি ফাইল কোনও ডায়াগনস্টিক রিপোর্ট করে না এবং অন্যথায় প্রতিটি গেটে অদৃশ্য হয়ে যাবে। | হ্যাঁ                                    |

#### দুটি টাইপচেক প্রোগ্রাম ভিন্নভাবে উত্তর দেয়

`typecheck:core` এবং `check:build-typecheck` বিভিন্ন বিকল্পের অধীনে বিভিন্ন প্রোগ্রাম কম্পাইল করে, এবং একই ফাইল একটিতে পরিষ্কার এবং অন্যটিতে ত্রুটিপূর্ণ হতে পারে।

`tsconfig.build.json` `"strict": false` সেট করে, তাই `noImplicitAny` বন্ধ। মূল কনফিগারেশন কঠোর বিকল্পগুলির সাথে একটি কিউরেটেড 27-ফাইল অনুমোদন তালিকা সংকলন করে এবং প্রতিটি এন্ট্রির আমদানি গ্রাফ অনুসরণ করে, তাই যে ফাইলগুলি বিল্ড প্রোগ্রামে উপস্থিত হয় না সেগুলি এখনও সেখানে চেক করা হয়।

একটি ফাইল টাইপ করা হয়েছে কিনা তা বিচার করার সময় ফলাফল গুরুত্বপূর্ণ:** `check:build-typecheck` অধীনে শূন্য ডায়াগনস্টিক মানে শূন্য নয়** . 26টি ফাইল থেকে `@ts-nocheck` বের করে বিল্ড প্রোগ্রামে তাদের মধ্যে 23টি পরিষ্কার দেখায়; এর মধ্যে ষোলটি প্রায় 120টি অন্তর্নিহিত-কঠোরটিতে যে কোনও ত্রুটি রয়েছে। একটি ফাইল পরিষ্কার কল করার আগে উভয় চেক করুন.

### চাকরি: `quality-gate`

`test-coverage` পরে দৌড়াচ্ছে। ব্লকগুলি ব্যর্থতার উপর একত্রিত হয়।

| স্ক্রিপ্ট                    | যাচাই করে                                                                                                                                                                            | ব্লকিং                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `quality:collect`            | নির্গত `quality-metrics.json` (ESLint সতর্কতা গণনা, মার্জড শার্ড রিপোর্ট থেকে কভারেজ)                                                                                                | হ্যাঁ (র্যাচেটের উজানে) |
| `quality:ratchet`            | `quality-baseline.json` এর প্রতিটি মেট্রিক প্রত্যাবর্তন করেনি (ESLint সতর্কতা ≤ বেসলাইন; কভারেজ ≥ বেসলাইন)                                                                           | হ্যাঁ                   |
| `check:duplication`          | কোড ডুপ্লিকেশন (jscpd@4) `quality-baseline.json` তে বেসলাইন অতিক্রম করে না                                                                                                           | হ্যাঁ                   |
| `check:complexity`           | ফাইল-স্তরের সাইক্লোমেটিক জটিলতা ক্যাপ অতিক্রম করে না (কোর ESLint `complexity` + `max-lines-per-function`)                                                                            | হ্যাঁ                   |
| `check:cognitive-complexity` | জ্ঞানীয় জটিলতা র্যাচেট (`eslint-plugin-sonarjs`) — পৃথক ESLint পাস; CI রান উভয়ই একক `check:complexity-ratchets` ধাপ হিসেবে একত্রিত হয়                                             | হ্যাঁ                   |
| `check:dead-code`            | অব্যবহৃত রপ্তানি / ফাইল র্যাচেট (নিপ) বেসলাইন বনাম রিগ্রেস করে না                                                                                                                    | হ্যাঁ                   |
| `check:compression-budget`   | কম্প্রেশন বেঞ্চমার্ক বাজেট — প্রতি-ইঞ্জিন টোকেন-সঞ্চয় মেঝে প্রত্যাবর্তন করা উচিত নয়                                                                                                | হ্যাঁ                   |
| `check:type-coverage`        | শতাংশ-টাইপড র্যাচেট (`type-coverage`) প্রত্যাবর্তন করে না; মূলত `typecheck:noimplicit:core` সাবসুম করে                                                                               | হ্যাঁ                   |
| `check:codeql-ratchet`       | ওপেন CodeQL সতর্কতা গণনা প্রত্যাবর্তন করে না ( `gh api` মাধ্যমে পড়া হয়; টোকেন ছাড়াই গ্রেসফুল-এড়িয়ে যান) — রিফ্রেশ ক্যাডেন্স এবং ম্যানুয়াল ট্রিগার: নীচে "CodeQL ratchet" দেখুন | হ্যাঁ                   |

### চাকরি: `quality-extended`

সম্পূর্ণ কাজ পরামর্শমূলক (`continue-on-error: true`)। এনপিএম-ভিত্তিক র্যাচেটগুলি বাস্তবে চলে; যখন একটি বাইনারি এখনও অনুপস্থিত থাকে তখন বহিরাগত স্ক্যানারগুলি `gh release download` এবং স্ব-স্কিপ (প্রস্থান 0) এর মাধ্যমে ইনস্টল করে।

| স্ক্রিপ্ট                | যাচাই করে                                                                                                                                                                                               | ব্লকিং                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | কোন সার্কুলার নির্ভরতা নেই (dpdm)                                                                                                                                                                       | **উপদেষ্টা**                                       |
| `check:bundle-size`      | বান্ডিল আকার ক্যাপ অতিক্রম না                                                                                                                                                                           | **উপদেষ্টা**                                       |
| `check:secrets`          | বাইনারি অনুপস্থিত থাকলে সিক্রেট স্ক্যানিং (gitleaks) — এড়িয়ে যায়                                                                                                                                     | **উপদেষ্টা**                                       |
| `check:vuln-ratchet`     | নির্ভরতা দুর্বলতা (ওএসভি-স্ক্যানার) — `--ratchet` INCOMPLETE হিসাবে ব্যর্থ হয় না (প্রস্থান 2) যদি পরিমাপ না করা হয়                                                                                    | **উপদেষ্টা**                                       |
| `check:workflows`        | কর্মপ্রবাহ লিন্ট (অ্যাকশনলিন্ট + zizmor); missing/broken স্ক্যানার, অবৈধ রিপোর্ট বা অনুপস্থিত র্যাচেট বেসলাইন INCOMPLETE হিসাবে ব্যর্থ হয়। বৈধ ফলাফল নির্বাচিত strict/advisory/ratchet নীতি অনুসরণ করে | মৃত্যুদন্ড প্রয়োজন; CI তে zizmor ratchet ব্লক করা |
| `check:openapi-breaking` | পিন করা ইভেন্ট কমিটের বিরুদ্ধে পাবলিক API চুক্তি (PR মার্জ-বেস, পুশ আগে, মার্জ-গ্রুপ বেস; scheduled/manual চেকআউট ফার্স্ট প্যারেন্ট); প্রয়োজনীয় পরিমাপ ব্যর্থ হয় বন্ধ                                | **--ratchet দিয়ে ব্লক করা**                       |

### চাকরি: `docs-sync-strict`

প্রতিটি PR থেকে `main` পর্যন্ত চলে। ব্লকগুলি ব্যর্থতার উপর একত্রিত হয়।

| স্ক্রিপ্ট                      | যাচাই করে                                                                                                                               | ব্লকিং                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:docs-all`               | মেটা-গেট যা ক্রমানুসারে নিচের 6টি সাব-গেট চালায়                                                                                        | হ্যাঁ                                |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt সংস্করণের ধারাবাহিকতা                                                                                     | হ্যাঁ                                |
| ↳ `check:docs-counts`          | গদ্যে গণনা (প্রদানকারীর সংখ্যা, স্থানান্তর গণনা, ইত্যাদি) বাস্তব গণনার র্যাচেট উইন্ডোর মধ্যে রয়েছে                                     | হ্যাঁ                                |
| ↳ `check:env-doc-sync`         | `.env.example` তে প্রতিটি env var একটি ডক্স টেবিলে নথিভুক্ত করা হয় এবং এর বিপরীতে                                                      | হ্যাঁ                                |
| ↳ `check:deprecated-versions`  | ডক্সে কোনো অবচয়িত সংস্করণ স্ট্রিং নেই                                                                                                  | হ্যাঁ                                |
| ↳ `check:doc-links`            | ডক্সে অভ্যন্তরীণ মার্কডাউন লিঙ্কগুলি বাস্তব ফাইলগুলিতে সমাধান করে (`[text]`/`(path)` ফর্ম)                                              | হ্যাঁ                                |
| ↳ `check:fabricated-docs`      | রুট, env vars, CLI কমান্ড, হুকের নাম এবং ডক্সে উদ্ধৃত ফাইল পাথ কোডবেসে বিদ্যমান। `--strict` এর মাধ্যমে শক্ত গেট; পতাকা ছাড়া soft-fail. | হ্যাঁ ( CI তে `--strict` এর মাধ্যমে) |
| `check:cli-i18n`               | CLI কমান্ড স্ট্রিং সমস্ত i18n লোকেল ফাইলে উপস্থিত থাকে                                                                                  | হ্যাঁ                                |
| `check:openapi-coverage`       | OpenAPI স্পেক বাস্তব রুটের অন্তত একটি র্যাচেটেড ফ্লোর কভার করে                                                                          | হ্যাঁ                                |
| `check:openapi-security-tiers` | `openapi.yaml` তে নিরাপত্তা স্তরের টীকাগুলি `routeGuard.ts` শ্রেণীবিভাগের সাথে সামঞ্জস্যপূর্ণ                                           | **উপদেষ্টা**                         |
| `check:openapi-routes`         | `openapi.yaml` এর প্রতিটি পথ একটি বাস্তব `route.ts` প্রতি সংকল্প করে (অ্যান্টি-হ্যালুসিনেশন)                                            | হ্যাঁ                                |
| `check:docs-symbols`           | `docs/**/*.md` তে প্রতিটি `/api/...` রেফারেন্স একটি বাস্তব `route.ts` (অ্যান্টি-হ্যালুসিনেশন) এর প্রতি মীমাংসা করে                      | হ্যাঁ                                |
| `i18n translation drift`       | i18n লোকেল ফাইলে অনূদিত কী শুধুমাত্র সতর্ক —                                                                                            | **উপদেষ্টা**                         |

`docs/diagrams/` অধীনে বারোটি README SVGs তৈরি হয় (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` তাদের সকলকে পুনরুত্থিত করে)। প্রতিটির একটি বাইট-তুলনা ইউনিট পরীক্ষা রয়েছে (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) যা ব্যর্থ হয় যখন প্রতিশ্রুতিবদ্ধ ফাইলটি বাসি হয়ে যায় এবং `check:docs-counts` তাদের `<text>` নোড — থেকে ক্যানোনিকাল সংখ্যাগুলি পড়ে যার কারণে রূপরেখার ধাপটি ফাইলের প্রতিটি রূপরেখা স্ট্রিংকে অদৃশ্য `<text>` হিসাবে রাখে। SVG ক্যানোনিকাল-সংখ্যা চেক `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) তালিকাভুক্ত ফাইলগুলিকে পড়ে: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, প্লাস `public/images/tier-flow-dark.svg` এবং `tier-flow-light.svg`; ফ্রি-এভার, ক্যাটালগ-এন্ট্রি, রেকারিং-পুল এবং স্কোরিং-ফ্যাক্টর দাবিগুলিও `promise-pillars.svg`, `free-tier-budget.svg` এবং `strategies-grid.svg` পড়ে। `free-tier-budget.svg` লাইভ ক্যাটালগ লোডার থেকে এর পরিসংখ্যান আঁকে, তাই `FREE_MODEL_BUDGETS` বা প্রদানকারীর ডিসপ্লে নাম পরিবর্তন করা হলে সেই ফাইলটি পুনরুত্থিত না হওয়া পর্যন্ত CI লাল হয়ে যায়।

### চাকরি: `i18n-ui-coverage`

| স্ক্রিপ্ট                         | যাচাই করে                                                                                                                                                                        | ব্লকিং       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (ইনলাইন) | UI i18n কী কভারেজ ≥ 65%                                                                                                                                                          | হ্যাঁ        |
| `check-ui-value-drift` (ইনলাইন)   | একটি পুনঃলিখিত ইংরেজি** মান** পিছনে কোন বাসি অনুবাদ ছেড়ে যায় না                                                                                                                | হ্যাঁ        |
| `check-new-key-coverage` (ইনলাইন) | ক** নতুন** ইংরেজি কী প্রতিটি লোকেলে অনুবাদ করা হয় — একটি `__MISSING__:` মার্কার প্রত্যাখ্যান করা হয়                                                                            | হ্যাঁ        |
| `check-translation-ratio`         | প্রতি লোকেলে বাস্তব-অনুবাদের অনুপাত (অনুরূপ-থেকে-ইংরেজি/স্থানধারক/অনুমতি তালিকার বাইরে থাকা পাতা) অবশ্যই `config/quality/i18n-translation-baseline.json` + স্ল্যাকের বেশি হবে না | **উপদেষ্টা** |

`fetch-depth: 0` — প্রয়োজন মান-প্রবাহ গেট মার্জ বেসের বিপরীতে `en.json` আলাদা করে।

#### `check-ui-value-drift` — বাসি-অনুবাদ গেট

একটি i18n রিগ্রেশন ক্যাচ করে যা অন্য গেটগুলি কাঠামোগতভাবে দেখতে পায় না: একটি ইংরেজি মান পুনরায় লেখা হয় এবং _আগের_ ইংরেজি থেকে প্রাপ্ত অনুবাদগুলি পিছনে থাকে, তাই অ-ইংরেজি ব্যবহারকারীরা আত্মবিশ্বাসের সাথে-শব্দযুক্ত, এখন-ভুল অনুলিপি পড়তে থাকে।

এই বাস্তব জন্য পাঠানো হয়েছে. `oauthModal.googleOAuthWarning` পুনরায় লেখা হয়েছিল যখন Antigravity লগইন হেল্পার (#5203);** 43টির মধ্যে 39টি লোকেল** টেক্সট অপারেটরদের "সম্পূর্ণ URL অনুলিপি করুন এবং এটি নীচে পেস্ট করুন" — একটি প্রবাহ যা সেই প্রদানকারীর জন্য সম্পূর্ণ করতে পারে না। এটি #8463 পর্যন্ত অলক্ষিত ছিল কারণ:

- `sync-ui-keys` শুধুমাত্র backfills কী যে হয়** অনুপস্থিত** , যারা হয় না** বাসি** ;
- `check-ui-keys-coverage` কী _presence_ গণনা করে, তাই একটি বাসি অনুবাদ কভার হিসাবে স্কোর করে;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ডকুমেন্টেশন মিরর — ট্র্যাক করে এটি কখনই `src/i18n/messages/*.json` পড়ে না। 2026-09 রি-সিঙ্ক থেকে জব `docs-sync-strict` এ ব্লক করা: একটি মূল ডক → `npm run i18n:run -- --files=<doc>` (বিভাগ-স্তর, সস্তা) সম্পাদনা করুন।

**ভিন্ন-সচেতন, বেসলাইন-সমর্থিত নয়।** এটি কার্যকারী গাছের সাথে মার্জ বেসে `en.json` তুলনা করে; প্রতিটি কীর জন্য যার ইংরেজি মান পরিবর্তিত হয়েছে, যে কোনো লোকেল এখনও অস্পর্শিত অনুবাদ ধারণ করে বাসি। ইচ্ছাকৃতভাবে এই** পূর্ব-বিদ্যমান ঋণ জমা করে** — a diff প্রকাশ করতে পারে না যে কোন পুরানো ইংরেজি থেকে একটি দীর্ঘস্থায়ী অনুবাদ এসেছে, তাই গেট শুধুমাত্র বর্তমান পরিবর্তন স্পর্শ করে তা বিচার করে। বিকল্প (একটি প্রতি-কী হ্যাশ বেসলাইন) একটি ~ 600 KB জেনারেট করা ফাইলের জন্য খরচ হবে, 3 × বৃহত্তম বিদ্যমান বেসলাইন, প্রতি i18n PR এ মন্থন।

এটি সন্তুষ্ট করার দুটি উপায়:

1. প্রভাবিত অনুবাদ আপডেট করুন, অথবা
2. রানটাইম এগুলিকে `__MISSING__:<new english>` — এ সেট করুন তারপর সংশোধন করা ইংরেজি (`src/i18n/request.ts::deepMergeFallback`, #7258) এবং অনুবাদের জন্য কী সারিগুলি পরিবেশন করে৷

যদি স্ট্রিং এর** অর্থ** পরিবর্তিত, পছন্দ** কীটির নাম পরিবর্তন করা** : একটি নতুন কী একটি পুরানো অনুবাদের উত্তরাধিকারী হতে পারে না। যে প্যাটার্ন #8463 ব্যবহৃত হয়.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

`SKIP reason=base-unresolved` দিয়ে 0 থেকে প্রস্থান করে যখন বেস ক্যাটালগ পড়া যায় না (বেস রেফ ছাড়া অগভীর ক্লোন), `check-openapi-breaking` মিররিং।

### চাকরি: `i18n`

সম্পূর্ণ i18n বৈধতা ম্যাট্রিক্স (প্রতি লোকেলে একটি কাজ)। পুরো কাজই পরামর্শমূলক।

| স্ক্রিপ্ট                       | যাচাই করে                      | ব্লকিং                                                   |
| ------------------------------- | ------------------------------ | -------------------------------------------------------- |
| `validate_translation.py quick` | প্রতি লোকেলে অনুবাদ সম্পূর্ণতা | **উপদেষ্টা** (পুরো কাজের উপর `continue-on-error: true` ) |

### চাকরি: `pr-test-policy`

শুধুমাত্র টান অনুরোধে চলে।

| স্ক্রিপ্ট              | যাচাই করে                                                                                                                                        | ব্লকিং |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `check:pr-test-policy` | PRs যা `src/`, `open-sse/`, `electron/`, বা `bin/` তে প্রোডাকশন কোড পরিবর্তন করে অবশ্যই পরীক্ষাগুলি অন্তর্ভুক্ত বা আপডেট করতে হবে (হার্ড রুল #8) | হ্যাঁ  |
| `check:test-masking`   | পরিবর্তিত পরীক্ষার ফাইলগুলি নেট অ্যাসার্টের সংখ্যা কমায় না বা `assert.ok(true)` টাউটোলজি যোগ করে না                                             | হ্যাঁ  |
| `check:pr-evidence`    | PR বডি পরিবর্তনের জন্য test/VPS প্রমাণ উদ্ধৃত করে ( — গদ্য PR ভঙ্গুরকে গ্রেপ করে হার্ড রুল #18 যান্ত্রিক করে, ব্যাকলগ দেখুন)                     | হ্যাঁ  |

### চাকরি: `test-vitest`

`build` পরে দৌড়াচ্ছে। ব্লকগুলি ব্যর্থতার উপর একত্রিত হয়।

| স্যুট            | যাচাই করে                                                 | ব্লকিং                                                                                                               |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP সার্ভার (110 টুলস), autoCombo, ক্যাশে — ভিটেস্ট রানার | হ্যাঁ                                                                                                                |
| `test:vitest:ui` | UI কম্পোনেন্ট — ভিটেস্ট রানার পরীক্ষা করে                 | **ব্লকিং** — প্রাক-বিদ্যমান ব্যর্থতাগুলি স্পষ্টভাবে `vitest.config.ts` এ বাদ দেওয়া হয়েছে; নতুন ব্যর্থতা কাজ ব্যর্থ |

### রাত্রিকালীন কর্মপ্রবাহ (নির্ধারিত, পরামর্শমূলক)

এগুলি একটি ক্রোন সময়সূচীতে (এবং `workflow_dispatch`) চলে, PRs এ কখনই নয়। সব উপদেশমূলক.

| কর্মপ্রবাহ             | যাচাই করে                                                                                                                                          | ব্লকিং       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | একটি এলোমেলো বীজ + উচ্চ রান গণনা সহ দ্রুত-চেক সম্পত্তি পরীক্ষা                                                                                     | **উপদেষ্টা** |
| `nightly-resilience`   | হিপ-গ্রোথ গেট, ক্যাওস ফল্ট-ইনজেকশন, k6 load/soak                                                                                                   | **উপদেষ্টা** |
| `nightly-llm-security` | promptfoo ইনজেকশন গার্ড (ব্লক মোড) + garak প্রোব (একটি প্রদানকারী গোপন ছাড়া এড়িয়ে যাওয়া)                                                       | **উপদেষ্টা** |
| `nightly-schemathesis` | OpenAPI কন্ট্রাক্ট ফাজিং (স্কিম্যাথিসিস) একটি লাইভ OmniRoute ব্যবহার করে `docs/openapi.yaml` — সারফেস স্পেক লঙ্ঘন / আনহ্যান্ডেলড 500s (Fase 8 B.4) | **উপদেষ্টা** |
| `nightly-mutation`     | দ্রুত ইউনিট লেনের উপর স্ট্রাইকার মিউটেশন-পরীক্ষার স্কোর — বেঁচে থাকা মিউট্যান্টদের পৃষ্ঠের দুর্বল দাবি                                             | **উপদেষ্টা** |
| `nightly-compat`       | সমর্থিত `engines.node` রেঞ্জ জুড়ে নোড ইঞ্জিন সামঞ্জস্যপূর্ণ ম্যাট্রিক্স                                                                           | **উপদেষ্টা** |

পারফরমেন্স বেসলাইন (হিপ, TTFB, বিল্ড টাইম) রেকর্ড করা হয়েছে, গেটেড নয়: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) দেখুন।

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

## অনুমোদিত নীতি

প্রাক-বিদ্যমান লঙ্ঘনের ক্ষেত্রে ব্যর্থ হতে পারে না এমন প্রতিটি গেট একটি হিমায়িত অনুমোদিত তালিকা ব্যবহার করে (যেমন, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)। নীতি হল:

**মূল কারণ ঠিক করুন; লঙ্ঘন পূর্ব-বিদ্যমান এবং একই PR তে ঠিক করা না গেলেই অনুমোদন তালিকা ব্যবহার করুন।**

অনুমতি তালিকায় একটি এন্ট্রি যোগ করার সময়:

1. যুক্তি সহ একটি মন্তব্য অন্তর্ভুক্ত করুন.
2. ট্র্যাকিং সমস্যা উল্লেখ করুন (যেমন, `// #3498 — Phase 2 feature, not yet implemented`)।
3. একই PR তে এন্ট্রিটি সরান যা লঙ্ঘন — একটি স্থির এন্ট্রি যা আর একটি সক্রিয় লঙ্ঘনকে দমন করে না তা নিজেই একটি ত্রুটি (6A.3 বাসি-প্রবর্তন একবার প্রয়োগ করা হলে অনাথ অনুমোদন তালিকাভুক্ত এন্ট্রির গেটটি ব্যর্থ হবে)৷

করবেন** না** পরীক্ষাগুলি দ্রুত পাস করার জন্য অনুমোদিত তালিকার এন্ট্রি যোগ করুন। একটি ক্রমবর্ধমান অনুমোদিত তালিকা সহ একটি সবুজ গেট মানের একটি মিথ্যা ধারণা।

### যখন একটি গেট আপনার PR উপর ব্যর্থ হয়

1. **গেট আউটপুট সাবধানে পড়ুন** — এটি আপনাকে বলে যে কোন ফাইল বা প্রতীকটি নিয়ম লঙ্ঘন করেছে।
2. **লঙ্ঘন ঠিক করুন** — বেশিরভাগ গেট হল ডিটারমিনিস্টিক ফাইল সিস্টেম চেক যা কোড সঠিক হওয়ার সাথে সাথে পাস করে।
3. **যদি লঙ্ঘন পূর্ব থেকে বিদ্যমান থাকে** (অর্থাৎ, আপনি এটি প্রবর্তন করেননি কিন্তু গেট এখন এটিকে কভার করে): একটি ন্যায্যতা মন্তব্য এবং একটি ট্র্যাকিং সমস্যা সহ একটি অনুমোদন তালিকা এন্ট্রি যোগ করুন।
4. **যদি গেট একটি র্যাচেট হয়** (কভারেজ, ESLint সতর্কতা, অনুলিপি, জটিলতা): আপনার পরিবর্তন মেট্রিককে আরও খারাপ করেছে। অন্তর্নিহিত সমস্যাটি ঠিক করুন, অথবা (কদাচিৎ) `npm run quality:ratchet -- --update` চালান যদি পরিবর্তনটি ইচ্ছাকৃত হয় এবং মেট্রিক অবক্ষয় — গ্রহণযোগ্য হয় তবে কেন PR বিবরণে নথিভুক্ত করুন।
5. **উপদেষ্টা গেট** (`continue-on-error: true`) হল তথ্যমূলক — তারা একত্রীকরণকে ব্লক করে না কিন্তু CI সারাংশে উপস্থিত হয়। যেভাবেই হোক তাদের ঠিক করুন।

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

## যৌক্তিককরণ ব্যাকলগ (ROI পর্যালোচনা — Fase 9 Onda 3)

এই ইনভেন্টরিটি 2026-06-17 তারিখে `ci.yml` এর সাথে মিলিত হয়েছিল (পূর্ববর্তী সংস্করণে `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` বাদ দেওয়া হয়েছিল)। সমঝোতা সেটের একটি ROI পর্যালোচনা নিম্নলিখিত যুক্তিবাদী প্রার্থীদের চিহ্নিত করেছে।** মার্জগুলি হল যান্ত্রিক CI পরিবর্তন; flips/drops হল অপারেটরের জন্য সংরক্ষিত নীতিগত সিদ্ধান্ত।** নীচের কিছুই এখনও প্রয়োগ করা হয় না.

**এছাড়াও উপরে অনথিভুক্ত** (পরামর্শ, কম সংকেত): `docs-lint` জব (মার্কডাউনলিন্ট + ভ্যালে, পুরো কাজ `continue-on-error`) এবং স্বতন্ত্র স্ক্যানার ওয়ার্কফ্লো `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` `quality-baseline.json` এ আছে কিন্তু `ci.yml` — এ ব্লকিং র্যাচেটের সাথে সংযুক্ত নয় মেট্রিকটি বর্তমানে অনাথ।

### মার্জ / ডিডআপ (যান্ত্রিক, কম ঝুঁকি)

2026-06-17 তারিখে প্রতিটি প্রার্থীকে লাইভ গেট স্টেটের বিরুদ্ধে যাচাই করা হয়েছিল (ট্রাস্ট-বাট-ভেরিফাই); ঋণ আড়াল করতে বেশ কিছু "স্পষ্ট" একত্রীকরণ পরিণত হয়েছে এবং হয়** না** পরিষ্কার ড্রপ-ইন।

- **`check:docs-sync` দুবার রান করে** — `lint` কাজের মধ্যে স্বতন্ত্র এবং আবার `check:docs-all` (`docs-sync-strict`) এবং husky প্রি-কমিট হুকের ভিতরে। ✅**DONE** — স্বতন্ত্র `lint` আহ্বান সরানো হয়েছে।
- **CVE স্ক্যানিং** — ❌**NOT একটি পরিষ্কার মার্জ।** `audit:deps` সমস্ত পাঁচটি লকফাইল জুড়ে সমালোচনামূলক পরামর্শ এবং অসম্পূর্ণ অডিট ব্লক করে, বর্তমান নীতির অধীনে সতর্কতা হিসাবে উচ্চ পরামর্শের প্রতিবেদন করার সময়; `check:vuln-ratchet` (osv) শুধুমাত্র একটি _regression_ বনাম চেক-ইন বেসলাইনে ব্যর্থ হয় এবং প্রয়োজনে অনুপস্থিত পরিমাপ প্রত্যাখ্যান করে। বিভিন্ন শব্দার্থবিদ্যা — ড্রপিং `audit:deps` নিখুঁত গুরুত্বপূর্ণ গেট এবং স্বাধীন প্যাকেজ অডিট রসিদ হারাবে। দুটোই রাখুন।
- **চক্র সনাক্তকরণ** — ✅**DONE** (#15159 G-01/G-02) এখানে পুরানো পাঠ্যটিকে `check:cycles` "সবুজ, কিউরেটেড" গেট বলা হয়েছে এবং এটিকে ব্লক করা যুক্তিযুক্ত কারণ `check:circular-deps` (dpdm) 91টি চক্র রিপোর্ট করেছে। সেই সবুজ ছিল ক** মিথ্যা সবুজ** : `check:cycles` 5টি সাবডিরেক্টরি (450 ফাইল) স্ক্যান করেছে, শুধুমাত্র স্ট্যাটিক `import|export … from` সাথে মিলেছে, এবং প্রতিটি `@/` এবং `@omniroute/open-sse/` স্পেসিফায়ার বাদ দিয়েছে, তাই এটি গতিশীল-আমদানি + উপনাম চক্রগুলি দেখতে পারেনি যা রেপোতে আধিপত্য বিস্তার করে। স্থির: গেটটি এখন `src` + `open-sse` (5023 ফাইল) চলে, TypeScript AST থেকে স্পেসিফায়ার সংগ্রহ করে (তাই `import("…")` গণনা করে এবং টাইপ-পজিশন `typeof import("…")` করে না), এবং tsconfig `paths` সমাধান করে। এটি খুঁজে পায়** 14** চক্র, 0 নয়। কারণ 14টি পূর্ব-বিদ্যমান চক্র একটি গেট PR এ স্থির করা যায় না, `check:cycles` এখন একটি** শাপলা** (`--ratchet`, `quality-baseline.json` তে সিলিং `metrics.cycles.value = 14`, `direction: down`) — এটি যেকোন _রিগ্রেশন_কে ব্লক করে এবং গণনা শুধুমাত্র পড়ে যেতে পারে। CI `npm run check:cycles:ratchet` চালায়। সঙ্গে বার্ন-ডাউন রাইডস**A-01** . `check:circular-deps` (dpdm) বৃহত্তর দ্বিতীয় মতামত হিসাবে পরামর্শমূলক থাকে।
- **জটিলতা** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): একটি ESLint হাঁটা, ruleId দ্বারা গণনা করা হয় তাই সাইক্লোমেটিক + সর্বোচ্চ-রেখা এবং জ্ঞানীয় বেসলাইনগুলি স্বাধীন থাকে; পৃথক `check:complexity` / `check:cognitive-complexity` স্থানীয় `--update` জন্য থাকবে।
- **`/api` বিরোধী হ্যালুসিনেশন** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` এর একটি FS তালিকা, openapi-রুট + ডক্স-প্রতীক এখনও স্বাধীনভাবে রিপোর্ট করে; ব্যক্তিরা স্থানীয় রানের জন্য রয়ে গেছে।
- **11টি চাকরিতে`check:node-runtime` চলে** — ⚠️** কম ROI.** প্রতিটি একটি পৃথক রানার এবং চেক হল < 1s; মোট সঞ্চয় ~ 10s, একটি সস্তা প্রতি-জব গার্ড হারানোর বিরুদ্ধে। মন্থন মূল্য নয়.
- **CI lint উপর `typecheck:noimplicit:core`** — ✅** লিন্ট কাজ থেকে সরানো হয়েছে** (পরামর্শমূলক `continue-on-error` ছিল); ব্লকিং টাইপ পৃষ্ঠ হল `typecheck:core` + `check:type-coverage`. স্থানীয় স্ক্রিপ্ট বজায় রাখা.

### ফ্লিপ / সিদ্ধান্ত (অপারেটর নীতি)

- `check:openapi-security-tiers` (পরামর্শ) — ❌**NOT পরিষ্কারভাবে flippable.** এটি 0 থেকে প্রস্থান করে তবে সতর্ক করে যে `LOCAL_ONLY_API_PREFIXES` অধীনে বেশ কয়েকটি `traffic-inspector` রুটে `x-loopback-only: true` টীকা নেই। এটি কার্যকর করার জন্য প্রথমে `openapi.yaml` এ সেই টীকাগুলি যোগ করা প্রয়োজন।
- `typecheck:noimplicit:core` (পরামর্শমূলক) — মূলত ব্লকিং `check:type-coverage` র্যাচেট দ্বারা অন্তর্ভুক্ত। একটি র্যাচেটে ফ্লিপ করুন বা অপ্রয়োজনীয় দ্বিতীয় `tsc` পাসটি ফেলে দিন।
- `test:vitest:ui` (এখন** ব্লক করা** `vitest.config.ts` — `// #8618` নতুন ব্যর্থতা কাজ ব্যর্থ.
- `check:secrets` (gitleaks, ব্লকিং র্যাচেট 3 নথিভুক্ত মিথ্যা-পজিটিভ এ হিমায়িত) — 3-কে 0-এ পৌঁছানোর অনুমতি দেয়, অথবা উপদেষ্টা থেকে অবনমন করে। GitHub নেটিভ সিক্রেট-স্ক্যানিং + `check:public-creds` ওভারল্যাপ করে।
- `check:pr-evidence` (ব্লকিং, greps PR-বডি গদ্য) — উচ্চ মিথ্যা-ইতিবাচক ঝুঁকি; বাদ দিলে হার্ড রুল #18 এনফোর্সমেন্টকে দুর্বল করে, তাই এটি একটি প্রকৃত নীতি কল।
- `semgrep` (পরামর্শ স্বতন্ত্র) OWASP পরিবারের জন্য — ওভারল্যাপ করে CodeQL ; একটি র্যাচেট বা ড্রপ তার বেসলাইন তারের.

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
