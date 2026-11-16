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

প্রতিটি JSON রসিদ চেক-আউট SHA, ওয়ার্কফ্লো রান এবং প্রচেষ্টা চিহ্নিত করে। CLI একটি checkout/event SHA অমিল প্রত্যাখ্যান করে। ওয়ার্কফ্লো পরীক্ষাগুলি নীতি সদস্যতাকে রায় কাজের `needs` তালিকার সাথে আবদ্ধ করে যাতে একটি নতুন বা সরানো লেন নীরবে অদৃশ্য হয়ে যেতে পারে না। রসিদগুলি তাদের নিজস্ব কর্মপ্রবাহকে কভার করে, প্রকাশনা, স্থাপনা বা বিদ্যমান উপদেষ্টা স্ক্যানারের অভ্যন্তরীণ অংশ নয়। শাখা নিয়মে উভয় চেকের নাম সক্রিয় করা একটি পৃথক প্রশাসনিক পরিবর্তন; এই কাজ যোগ করা নিজেই একটি শাখা রক্ষা করে না.

### সারি মার্জ করুন

`queue` লেবেল Mergify কিউতে একটি PR পাঠায় (`.mergify.yml`)। Mergify একটি `mergify/merge-queue/` শাখায় একটি খসড়া PR খোলে, CI সেখানে সম্পূর্ণ নির্বাচন চালায়, এবং `Gate / CI`, `Gate / Quality` এবং `Merge integrity (changelog + generated skills)` পাস করলে আসল PR একত্রিত হয়।

Mergify খসড়ার বিবরণে তার সারির সারাংশ লেখে, এবং অন্যান্য অ্যাপগুলিও এটি সম্পাদনা করতে পারে। এই ধরনের একটি খসড়াতে একটি `pull_request` `edited` ইভেন্ট তার নিজস্ব সমবর্তী গোষ্ঠী (`-queue-edit-<run_id>`) নেয় তাই এটি খসড়াটির আসল রান বাতিল করতে পারে না এবং এটি গেট এবং ম্যাট্রিক্স এড়িয়ে যায়। শুধুমাত্র `Merge integrity` এখনও চলে। বাদ দেওয়া গেট কাজের একটি ভিন্ন চেকের নাম রয়েছে, কারণ Mergify একটি এড়িয়ে যাওয়া `Gate / CI` একটি ব্যর্থ চেক হিসাবে পড়ে এবং PR dequeues করে।

একটি dequeue পরে, একটি ধাক্কা সবসময় PR অনুরোধ করে না। মন্তব্য `@mergifyio queue` এটা.

### স্বীকৃতি হ্রাসকারী প্রমাণ বজায় রাখা

`scripts/quality/validate-release-acceptance.mjs` একটি সরবরাহকৃত পরিকল্পনা এবং এর প্রকাশ হ্রাস করে; এটি স্থাপন করে না যে পরিকল্পনাটি সম্পূর্ণ মুক্তি পাইপলাইনকে কভার করে। এর প্রতিবেদনগুলি স্পষ্টভাবে `releaseAcceptance: false` সেট করে, এমনকি যখন সেই পরিকল্পনাটি `VERIFIED` হয়। `release-acceptance.yml` ওয়ার্কফ্লো এখনও ছায়া ফিক্সচার ব্যবহার করে, বাস্তব বিল্ড, প্যাকেজ, বুট বা প্রচারের রসিদ নয়।

রক্ষিত প্রমাণ যাচাই করার জন্য CLI এর `--evidence-root` প্রয়োজন। ফাইলগুলি `<evidence-root>/<artifact_id>/<member>` হিসাবে সমাধান করা হয় এবং SHA-256হিসাবে হ্যাশ করা হয়। প্রমাণ ছাড়া একটি PASS রেকর্ড, একটি অনুপস্থিত বা পরিবর্তিত ফাইল, একটি অনিরাপদ পথ বা একটি সিমলিংক যাচাইকরণে বাধা দেয়। অনুপস্থিত ফাইলগুলি খালি সফল লগগুলির সমতুল্য নয়৷ বিদ্যমান SHA/run/attempt চেকগুলি স্বাধীন থাকে: ম্যাচিং বাইটগুলি একটি বাসি রসিদ উদ্ধার করতে পারে না। ফাইলের অখণ্ডতা মৃত্যুদন্ডের সত্যতা বা আর্টিফ্যাক্ট প্রচারের প্রমাণ নয়।

### স্ট্যাটিক স্ক্যান ইনভেন্টরি

সংস্করণযুক্ত npm-alias ইনভেন্টরি এবং স্ট্যাটিক-স্ক্যান সদস্যতা `config/quality/gate-manifest.json` তে লাইভ। `package.json` বিরুদ্ধে স্ক্রিপ্টের নাম এবং সঠিক কমান্ড যাচাই করতে `npm run check:gate-manifest` চালান; সংযোজন, অপসারণ এবং কমান্ড ড্রিফ্ট স্থানীয় হুক এবং CI এ পরিবর্তন-শ্রেণীবিভাগের কাজ উভয়ই ব্যর্থ করে। একটি উপনাম একটি ওয়ার্কফ্লো কাজ, ম্যাট্রিক্স উদাহরণ বা পরীক্ষার ক্ষেত্রে নয়: এই গণনাগুলিকে বিনিময়যোগ্য হিসাবে উপস্থাপন করা উচিত নয়৷

`npm run quality:scan -- --list` বা `npm run quality:scan:fast -- --list` ব্যবহার করে নির্বাচিত উপনামগুলি কার্যকর না করেই পরিদর্শন করুন৷ রানার npm এন্ট্রিপয়েন্টকে আহ্বান করে, তাই এর রানটাইম (যেখানে কনফিগার করা Bun সহ) সংরক্ষিত থাকে। ম্যানিফেস্ট সেই প্রোফাইলগুলির বাইরের উপনামগুলিকে আলাদাভাবে আহ্বান করা হিসাবে রেকর্ড করে, এবং রক্ষণাবেক্ষণ আদেশগুলি শুধুমাত্র পঠনযোগ্য স্ক্যান প্রোফাইলগুলিতে নিষিদ্ধ৷

এই প্রোফাইলগুলি শুধুমাত্র স্ট্যাটিক স্ক্যান কভার করে। তারা পণ্য পরীক্ষা, কভারেজ, প্যাকেজিং, বাহ্যিক চেক বা প্রার্থীর সম্পূর্ণ রিলিজ গ্রহণযোগ্যতা প্রত্যয়িত করে না। কর্মপ্রবাহ ভর্তি লিঙ্কযুক্ত `config/quality/admission-policy.json` এবং `scripts/quality/admission-verdict.mjs` ব্যবহার করে। রিলিজ-পর্যবেক্ষক প্রোফাইল আলাদা থাকে; তাদের প্রযোজ্য চেক এবং রসিদ স্বাধীনভাবে পরিদর্শন করুন। সম্পূর্ণ পর্যবেক্ষকের স্ট্যাটিক কমান্ড `config/quality/release-green-static-profile.json` এ ঘোষণা করা হয়, যার মধ্যে `audit:deps`, মিউটেশন-পরীক্ষা নির্বাচন এবং অনুবাদ পরীক্ষা। লোডার package.json এবং মডেল করা CI/Quality ঘোষণার বিরুদ্ধে npm কমান্ড যাচাই করে; এটি আর্গুমেন্ট হিসাবে শেল টোকেন কার্যকর করার পরিবর্তে ড্রিফ্ট প্রত্যাখ্যান করে। প্রয়োজনীয় স্ক্যানার SKIP/INCOMPLETE আউটপুট PASS প্রতিষ্ঠা করতে পারে না। প্রোফাইলটি তার বাহ্যিক বর্জন রেকর্ড করে এবং হোস্ট করা কভারেজ, টেস্ট ম্যাট্রিক্স, প্যাকেজ বা স্থাপনার প্রমাণ প্রতিস্থাপন করে না। নীচের গদ্য তালিকাটি একটি রেফারেন্স, এটি প্রমাণ নয় যে একটি গেট আসলে দৌড়েছিল।

স্ক্রিপ্টগুলি `scripts/check/` (পলিসি গেট) এবং `scripts/quality/` (র্যাচেট ইঞ্জিন) এর অধীনে থাকে। সত্যের CI উৎস হল `.github/workflows/ci.yml`।

### মুক্তি PR দ্রুত পথ (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs এ CI পরিপূরক করে, `main` এ ঠেলে দেয়, দল প্রেরণ করে এবং একত্রিত করে। PRs পাথ-ফিল্টার করা দ্রুত চেক ব্যবহার করে। স্থায়ীভাবে অক্ষম ডুপ্লিকেট বিল্ড সরানো হয়েছে; আসল build/package/boot চেক CI এ থাকে। ইউনিট স্যুট এবং ভিটেস্ট শুধুমাত্র CI (`Unit Tests (N/8)` এবং `Vitest`) এ চলে।

| চাকরি                                            | ব্যাপ্তি                                                                                                          | ব্লকিং          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API ডক্স রেফ এবং ডক্স-সমস্ত                                                                        | হ্যাঁ           |
| `Fast Quality Gates`                             | কোড PRs; স্ট্যাটিক চেক, টাইপচেক, ড্যাশবোর্ড টাইপচেক, প্রভাবিত ইউনিট পরীক্ষা, ভুলে যাওয়া ভাইবোন পরীক্ষা (পরামর্শ) |
| `No new ESLint warnings`                         | কোড PRs; দমন-সচেতন লিন্ট গার্ড                                                                                    | হ্যাঁ, কাঁটা সহ |
| `Merge integrity (changelog + generated skills)` | অ-খসড়া PRs; চেঞ্জলগ এবং জেনারেটেড স্কিল সিঙ্ক                                                                    | হ্যাঁ, কাঁটা সহ |

#### ভুলে যাওয়া ভাইবোনের পরীক্ষার রিপোর্ট

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` এর একটি পরামর্শমূলক পদক্ষেপ হিসাবে চলে এবং পরীক্ষা-প্রভাব মানচিত্রের পিছনে আমদানি সমাধানকারী পুনরায় ব্যবহার করে। প্রতিটি পরিবর্তিত উৎপাদন মডিউলের জন্য, এটি নির্ধারক `changed module/symbol -> static consumer -> candidate sibling test` চেইন রিপোর্ট করে যখন প্রার্থী পরীক্ষাটি পুল-অনুরোধের পার্থক্য থেকে অনুপস্থিত থাকে। মার্কডাউন সারাংশ এবং JSON ফলাফল যেকোন ব্লকিং রোলআউটের আগে ক্রমাঙ্কনের জন্য `forgotten-sibling-tests` ওয়ার্কফ্লো আর্টিফ্যাক্ট হিসাবে ধরে রাখা হয়।

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
| `check:model-lifecycle`           | তিনটি হাতে রক্ষণাবেক্ষণ করা রাউটিং টেবিল চেক-ইন লাইফসাইকেল স্ন্যাপশট (#11503) এর সাথে সামঞ্জস্যপূর্ণ থাকে : `FITNESS_TABLE` (`taskFitness.ts`) স্কোর কোনো অবসরপ্রাপ্ত আইডি নেই যা `REGISTRY` রুট করতে পারে; প্রতিটি `BUILT_IN_ALIASES` টার্গেট `REGISTRY` এ উপস্থিত এবং অবসরপ্রাপ্ত-আইডি স্ন্যাপশট থেকে অনুপস্থিত; `REGISTRY` এ থাকা প্রতিটি অবসরপ্রাপ্ত আইডি `allowedRetiredInCatalog` এ ফরোয়ার্ড বা তালিকাভুক্ত করা হয়েছে; এবং সেই স্ন্যাপশটে কোন `DEFAULT_DEGRADATION_MAP` উৎস বা লক্ষ্য অবসরপ্রাপ্ত দেখা যায় না। এটি প্রমাণ করে না যে একটি মডেল বর্তমানে একটি লাইভ আপস্ট্রিম দ্বারা পরিবেশিত হয়৷ অফলাইন — `config/quality/model-lifecycle.json` সাথে তুলনা করে, `npm run quality:refresh-model-lifecycle` দিয়ে হাতে রিফ্রেশ করা হয় (নেটওয়ার্ক; CI এ তারযুক্ত নয়)। `allowedRetiredInCatalog` হল একটি বার্ন-ডাউন র্যাচেট: শুধুমাত্র একটি ট্র্যাকিং সমস্যা সহ একটি এন্ট্রি যোগ করুন।                                          | হ্যাঁ                                    |
| `check:fetch-targets`             | ক্লায়েন্ট-সাইড `src/` এর প্রতিটি `fetch("/api/...")` একটি বাস্তব `route.ts` তে সমাধান করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | হ্যাঁ                                    |
| `check:deps`                      | রেপোর প্রতিটি `package.json` জুড়ে সমস্ত `npm install` -able deps `dependency-allowlist.json` এ রয়েছে; নতুন আনপিন বা স্লপস্কোয়াট প্যাকেজ পতাকাঙ্কিত                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                    |
| `audit:deps`                      | সমস্ত পাঁচটি স্বাধীন লকফাইলের npm অডিট (root, Electron, OpenCode প্লাগইন v1/v2 এবং প্রদানকারী)। সমালোচনামূলক পরামর্শ ব্লক; উচ্চ পরামর্শ দৃশ্যমান সতর্কতা অবশেষ. Missing/failed অডিট হল INCOMPLETE এবং ব্লক; প্রতি-স্কোপ লক হ্যাশ এবং রিপোর্ট বজায় রাখা হয়।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | হ্যাঁ                                    |
| `check:lockfile`                  | `package-lock.json` integrity — https রেজিস্ট্রি, ইন্টিগ্রিটি হ্যাশ, কোন হোস্ট ওভাররাইড নেই                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | হ্যাঁ                                    |
| `check:licenses`                  | উৎপাদন নির্ভরতার জন্য SPDX লাইসেন্স অনুমোদিত তালিকা                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | হ্যাঁ                                    |
| `check:tracked-artifacts`         | কোন বিল্ড আর্টিফ্যাক্ট / প্রতিশ্রুতিবদ্ধ `node_modules` সিমলিংক নেই (এছাড়াও হাস্কি প্রি-কমিটে চলে; প্রি-পুশ ইচ্ছাকৃতভাবে হালকা — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | হ্যাঁ                                    |
| `check:ai-attribution`            | PR কমিট, শিরোনাম বা বডি — হার্ড রুল #16 এ কোন AI/bot `Co-Authored-By` ট্রেলার বা AI-জেনারেশন `commit-msg` নেই ( PR→ `release/**` — #14436 জন্য `quality.yml` ফাস্ট-গেটস লুপে ইভেন্ট পেলোড পড়ে, `ci.yml` -অফ অফ PRs — `main`-এর জন্য একটি ধাপ PR→;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | প্রতিটি Vitest বর্জন একটি ট্র্যাকিং সমস্যার নাম দেয় এবং `config/quality/vitest-exclusions.json` (#13204) এ প্রদর্শিত হয়                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | হ্যাঁ                                    |
| `check:file-size`                 | সোর্স ফাইল (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) `cap` এর মধ্যে থাকে এবং `testCap` মধ্যে পরীক্ষা ফাইল (`*.test.ts(x)`) থাকে ; `file-size-baseline.json` (`frozen` / `testFrozen`) তে হিমায়িত ফাইলগুলি অবশ্যই তাদের রেকর্ড করা আকারের আগে বাড়বে না                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                    |
| `check:error-helper`              | executors/handlers তে ত্রুটির প্রতিক্রিয়া `buildErrorBody()` / `sanitizeErrorMessage()` ব্যবহার করে (হার্ড রুল #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | হ্যাঁ                                    |
| `check:migration-numbering`       | মাইগ্রেশন SQL ফাইলগুলি ক্রমানুসারে সংখ্যাযুক্ত, কোনও ফাঁক বা সদৃশ নেই৷                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | হ্যাঁ                                    |
| `check:public-creds`              | `publicCreds.ts` এর বাইরে কোন আক্ষরিক OAuth `client_id`/`client_secret` বা ফায়ারবেস ওয়েব কী নেই (হার্ড রুল #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                    |
| `check:db-rules`                  | `src/lib/db/` মডিউলের বাইরে কোন কাঁচা SQL নেই; `localDb.ts` থেকে ব্যারেল-আমদানি নেই (হার্ড রুলস #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | হ্যাঁ                                    |
| `check:known-symbols`             | প্রোভাইডার এক্সিকিউটর, রাউটিং কৌশল এবং অনুবাদক তাদের ডিসপ্যাচ টেবিলে নিবন্ধিত ফাইলের সাথে মেলে ডিস্ক — কোন অনাথ বা অঘোষিত প্রতীক                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | হ্যাঁ                                    |
| `check:route-guard-membership`    | প্রতিটি রুট যা একটি শিশু প্রক্রিয়ার জন্ম দেয় `isLocalOnlyPath()` দ্বারা শ্রেণীবদ্ধ করা হয় (হার্ড রুলস #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | হ্যাঁ                                    |
| `check:test-discovery`            | রেপোতে থাকা প্রতিটি `*.test.ts` / `*.spec.ts` ফাইল কমপক্ষে একজন টেস্ট রানার দ্বারা সংগ্রহ করা হয় (র্যাচেট: `test-discovery-baseline.json` এ এতিম তালিকা শুধুমাত্র সঙ্কুচিত হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | হ্যাঁ                                    |
| `check:test-tla-order`            | `tests/unit` অধীনে কোনো `node:test` ফাইল একটি পরীক্ষা নিবন্ধন করে না, একটি শীর্ষ-স্তরের `await` আঘাত করে, তারপর আরও নিবন্ধন করে (#18045; ratchet: `test-tla-order-allowlist.json` শুধুমাত্র সঙ্কুচিত হতে পারে)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                    |
| `check:agent-skills-sync`         | জেনারেটেড এজেন্ট-স্কিল আর্টিফ্যাক্টগুলি তাদের উত্স ক্যাটালগের সাথে মেলে (কোন প্রবাহ নেই)। রিলিজ মোড প্রতিটি দক্ষতা পরীক্ষা করে; একটি বৈশিষ্ট্য PR (`pr` মোড) শুধুমাত্র সেই দক্ষতাগুলি পরীক্ষা করে যার জেনারেট করা টেক্সট এটি — এডিট করে [জেনারেটেড ফাইল এবং প্রাপ্ত বেসলাইন](#generated-files-and-derived-baselines-written-at-release) দেখুন                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | প্রদানকারী logos/assets একটি নথিভুক্ত উৎস এন্ট্রি বহন করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON কনফিগার ফাইলগুলি পার্স করে এবং রেপো লিন্টের নিয়মগুলি পূরণ করে                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | ত্রুটি ছাড়াই TypeScript সংকলন (শুধুমাত্র পরামর্শমূলক সতর্কতা)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | হ্যাঁ                                    |
| `typecheck:noimplicit:core`       | কঠোর `noImplicitAny` — দূরদর্শী; অনেক প্রাক-বিদ্যমান কল সাইটের এখনও টীকা প্রয়োজন                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **উপদেষ্টা** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` স্কোপ টু `src/app/(dashboard)/**` (#7033) — `typecheck:core` এর কিউরেটেড 27-ফাইল অনুমোদন তালিকায় কোনো ড্যাশবোর্ড TSX অন্তর্ভুক্ত নেই, এবং `next build` কখনোই এটি টাইপ-চেক করে না (`next.config.mjs` সেট করে `ignoreBuildErrors: true`), তাই অনাথ-আইডেন্টিফায়ার রিগ্রেশন সেখানে (#6625/#6909CI) একটি হিমায়িত per-file/per-TS-code গণনা বেসলাইনের বিরুদ্ধে পার্থক্য (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` হিসাবে একই বাসি-প্রবর্তন প্যাটার্ন) — শুধুমাত্র বেসলাইন গণনার বাইরে NEW ত্রুটিগুলি গেটকে ব্যর্থ করে; একটি পূর্ব-বিদ্যমান ত্রুটি সংশোধন করা হলে `--update` দিয়ে র্যাচেট ডাউন করুন।                                                                                                                                                                                                                                                                                               | হ্যাঁ                                    |
| `check:build-typecheck`           | পুরো-অ্যাপ প্রোডাকশন টাইপ চেক ওভার `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), পৃষ্ঠ `typecheck:core` এর 27-ফাইল অনুমোদন তালিকা এবং ড্যাশবোর্ড গেট কভার করে না। `config/quality/build-typecheck-baseline.json` বিরুদ্ধে পার্থক্য; একটি নতুন বা উত্থিত প্রতি-(ফাইল, কোড) গণনা ব্যর্থ হয়, একটি নিম্ন গণনা আপনাকে র্যাচেট করতে বলে। `--update` প্রত্যাখ্যান করে যখন রানে একটি নতুন বা উত্থিত জোড়া থাকে যদি না `--force-regressions` পাস হয়, এবং `--force-nocheck` পাস না হওয়া পর্যন্ত একটি নতুন সাইলেন্সড ফাইল প্রত্যাখ্যান করে, তাই সবুজ পেতে বেসলাইনকে প্রশস্ত করা এবং স্থায়ী নীরবতা দেওয়া দুটি পৃথক ইচ্ছাকৃত কাজ। একটি খালি `--force` প্রত্যাখ্যান করা হয়. এছাড়াও `config/quality/ts-nocheck-baseline.json` বিপরীতে `@ts-nocheck` জন্য বিল্ড স্কোপ স্ক্যান করে, কারণ এটি ব্যবহার করা একটি ফাইল কোনও ডায়াগনস্টিক রিপোর্ট করে না এবং অন্যথায় প্রতিটি গেটে অদৃশ্য হয়ে যাবে। | হ্যাঁ                                    |

#### দুটি টাইপচেক প্রোগ্রাম ভিন্নভাবে উত্তর দেয়

`typecheck:core` এবং `check:build-typecheck` বিভিন্ন বিকল্পের অধীনে বিভিন্ন প্রোগ্রাম কম্পাইল করে এবং একই ফাইল একটিতে পরিষ্কার এবং অন্যটিতে ত্রুটিপূর্ণ হতে পারে।

`tsconfig.build.json` `"strict": false` সেট করে, তাই `noImplicitAny` বন্ধ। মূল কনফিগারেশন কঠোর বিকল্পগুলির সাথে একটি কিউরেটেড 27-ফাইল অনুমোদন তালিকা সংকলন করে এবং প্রতিটি এন্ট্রির আমদানি গ্রাফ অনুসরণ করে, তাই যে ফাইলগুলি বিল্ড প্রোগ্রামে উপস্থিত হয় না সেগুলি এখনও সেখানে চেক করা হয়।

একটি ফাইল টাইপ করা হয়েছে কিনা তা বিচার করার সময় ফলাফল গুরুত্বপূর্ণ:** `check:build-typecheck` অধীনে শূন্য ডায়াগনস্টিক মানে শূন্য নয়** . 26টি ফাইল থেকে `@ts-nocheck` বের করে বিল্ড প্রোগ্রামে তাদের মধ্যে 23টি পরিষ্কার দেখায়; এর মধ্যে ষোলটি প্রায় 120টি অন্তর্নিহিত-কঠোরটিতে যেকোন ত্রুটি রয়েছে। একটি ফাইল পরিষ্কার কল করার আগে উভয় চেক করুন.

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
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI সংস্করণের ধারাবাহিকতা; রিলিজ মোড এছাড়াও 66 `llm.txt` মিরর এবং অনুবাদিত CHANGELOG বিভাগ (PR মোড: মিরর সম্মত)        | হ্যাঁ                                |
| ↳ `check:docs-counts`          | গদ্যে গণনা (প্রদানকারীর সংখ্যা, স্থানান্তর গণনা, ইত্যাদি)। দুটি মোড: `pr` বৈশিষ্ট্য PRs, `release` অন্যত্র — নীচে "উত্পন্ন মান" দেখুন   | হ্যাঁ                                |
| ↳ `check:env-doc-sync`         | `.env.example` তে প্রতিটি env var একটি ডক্স টেবিলে নথিভুক্ত করা হয় এবং এর বিপরীতে                                                      | হ্যাঁ                                |
| ↳ `check:deprecated-versions`  | ডক্সে কোনো অবচয়িত সংস্করণ স্ট্রিং নেই                                                                                                  | হ্যাঁ                                |
| ↳ `check:doc-links`            | ডক্সে অভ্যন্তরীণ মার্কডাউন লিঙ্কগুলি বাস্তব ফাইলগুলিতে সমাধান করে (`[text]`/`(path)` ফর্ম)                                              | হ্যাঁ                                |
| ↳ `check:fabricated-docs`      | রুট, env vars, CLI কমান্ড, হুকের নাম এবং ডক্সে উদ্ধৃত ফাইল পাথ কোডবেসে বিদ্যমান। `--strict` এর মাধ্যমে শক্ত গেট; পতাকা ছাড়া soft-fail. | হ্যাঁ ( CI তে `--strict` এর মাধ্যমে) |
| `check:cli-i18n`               | CLI `t()` কী `bin/cli/locales/en.json` তে বিদ্যমান (উভয় মোড); শুধুমাত্র রিলিজ মোডে `en.json` সহ pt-BR/zh-CN/zh-TW প্যারিটি             | হ্যাঁ                                |
| `check:openapi-coverage`       | OpenAPI স্পেক বাস্তব রুটের অন্তত একটি র্যাচেটেড ফ্লোর কভার করে                                                                          | হ্যাঁ                                |
| `check:openapi-security-tiers` | `openapi.yaml` তে নিরাপত্তা স্তরের টীকাগুলি `routeGuard.ts` শ্রেণীবিভাগের সাথে সামঞ্জস্যপূর্ণ                                           | **উপদেষ্টা**                         |
| `check:openapi-routes`         | `openapi.yaml` এর প্রতিটি পথ একটি বাস্তব `route.ts` প্রতি সংকল্প করে (অ্যান্টি-হ্যালুসিনেশন)                                            | হ্যাঁ                                |
| `check:docs-symbols`           | `docs/**/*.md` তে প্রতিটি `/api/...` রেফারেন্স একটি বাস্তব `route.ts` (অ্যান্টি-হ্যালুসিনেশন) এর প্রতি মীমাংসা করে                      | হ্যাঁ                                |
| `i18n translation drift`       | `docs/i18n/**` মিরর বনাম `.i18n-state.json` — PRs এ পরামর্শ (আয়না অনুবাদ তরঙ্গ দ্বারা সতেজ হয়), ধাক্কা এবং রাতের বেলায় কঠোর          | **উপদেষ্টা** PRs                     |

#### অনুবাদ আয়নাগুলি প্রাপ্ত ফাইলগুলি (PR মোড বনাম রিলিজ মোড)

একটি বৈশিষ্ট্য PR শুধুমাত্র ইংরেজি উত্স সম্পাদনা করে। `docs/i18n/<locale>/**` মিরর (66 `llm.txt` কপি এবং অনূদিত `CHANGELOG.md` ফাইল সহ) এবং `.i18n-state.json` অনুবাদ তরঙ্গ (`docs/i18n-*` / `chore/i18n-*` শাখা, নির্ধারিত `i18n-mirror-refresh.yml`) এবং প্রকাশ (`npm run release:sync-changelog-i18n`) দ্বারা এক ধাপে পুনর্লিখন করা হয়। তাই মিরর গেট দুটি মোডে চলে, `scripts/check/lib/gateMode.mjs` দ্বারা সমাধান করা হয় (`--mode=pr|release`, তারপর `OMNIROUTE_GATE_MODE`, তারপর অ্যাকশন ইভেন্ট; একটি স্থানীয় রান হল `release`):

- `check:docs-sync` — রিলিজ মোড প্রতিটি চেক চালায়। PR মোড package.json/OpenAPI সংস্করণ, রুট CHANGELOG শিরোনাম এবং সুপারসেড-ডক্স গার্ড রাখে এবং `llm.txt` মিরর কপিগুলির জন্য `SKIP reason=pr-mode` প্রিন্ট করে এবং অনূদিত CHANGELOG বিভাগ — যদি না PR মিরর লেখে: একটি প্রধান শাখা `docs/i18n/**` এর লেখক হিসাবে ঘোষিত হয়, যখন `config/quality/derived-paths/*.json` ফ্যামিলিতে কঠোরভাবে কাজ করে, উভয়ই পরীক্ষা করে একটি পরিবর্তন যার নিজস্ব পার্থক্য `docs/i18n/<locale>/llm.txt` বা `CHANGELOG.md` সম্পাদনা করে তা কঠোরভাবে পরীক্ষা করে। ডিফ বেস একটি depth-1 চেকআউটে ( `docs-sync-strict` জব) সমাধান করে না, তাই PR মোড এমন একটি চেকও চালায় যার কোন ভিত্তির প্রয়োজন নেই: প্রতিটি `llm.txt` আয়না অবশ্যই থাকতে হবে, এর `---` বিভাজক রাখতে হবে এবং মূল বডি বা বেশিরভাগ আয়না শেয়ার করে বডি বহন করে। একটি ভিত্তি যা সরানো সমস্ত আয়নাকে সমানভাবে বাসি ছেড়ে দেয় এবং পাস করে; একটি আয়না একটি হাত সম্পাদনা ব্যর্থ হয়. অনূদিত `CHANGELOG.md` ফাইলগুলির একটি depth-1 PR চেকআউটে এমন কোন চেক নেই।
- প্রি-কমিট হুক `check-docs-sync.mjs --mode=pr` চালায়: একটি কমিট কি করে তার উপর বিচার করা হয়। পতাকা ছাড়া একটি স্থানীয় রান হল রিলিজ মোড, এবং একটি মার্জড PR যা রুট `llm.txt` সম্পাদনা করে তরঙ্গটি না চলা পর্যন্ত সেই বেসটিতে প্রতিটি পরবর্তী কমিট ব্লক করবে। একই নিয়ম যেকোন মোড-সচেতন গেট একটি হাস্কি হুক রানের জন্য ধারণ করে: হুক `--mode=pr` পাস করে, এবং কঠোর রায় রিলিজ-মোড রানের সাথে থাকে (রিলিজ PR, `main` তে ঠেলে, একটি সাধারণ স্থানীয় রান)।
- মিরর-কন্টেন্ট ইউনিট পরীক্ষা (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — রিলিজ মোড প্রতিটি লোকেলে জোর দেয়। PR মোড `.i18n-state.json` (পুরো-ফাইল হ্যাশ, বা পরীক্ষার পিন বিভাগের রেকর্ডকৃত সেকশন হ্যাশ) অনুসারে ইংরেজি উৎসের সাথে বর্তমান থাকা আয়নাগুলিকে জোর করে এবং একটি কারণ সহ বাসিগুলিকে এড়িয়ে যায়। উভয় মোডে প্রতিটি লোকেলের জন্য `target_hash` প্রোভেন্যান্স চেক চালানো হয়। সতেজতা প্রতি `## ` বিভাগে, ইউনিট `run-translation.mjs` হ্যাশ; একটি দীর্ঘ অংশ (এই ফাইলের গেট ইনভেন্টরি এটির প্রায় অর্ধেক) মানে এতে যে কোনও সম্পাদনা সেই আয়নাগুলিকে বাসি করে দেয় এবং তাদের পিআর-মোড দাবিগুলি পরবর্তী তরঙ্গ পর্যন্ত এড়িয়ে যায়। ইংরেজি উৎসের একটি অ্যাঙ্কর যা আর ধারণ করে না পুরো-ফাইলের তুলনাতে ফিরে আসে।
- `i18n translation drift` — PRs এর উপর পরামর্শ, ধাক্কার উপর কঠোর, রাত্রিকালীন এবং রিলিজ কাট, তাই একটি বাসি আয়না রিলিজে পাঠানো যাবে না।

`scripts/i18n/sync-llm-mirrors.mjs` (এছাড়াও `syncLlmMirrors()` হিসাবে রপ্তানি করা হয়, `--dry-run` সহ) `llm.txt` মিররগুলিকে পুনর্লিখন করে; রিলিজ রিফ্রেশ, অনুবাদ তরঙ্গ এবং নির্ধারিত `i18n-mirror-refresh.yml` এটি চালায় (রিফ্রেশ একটি ড্রাই রানের সাথে বাসি `llm.txt` মিরর সনাক্ত করে, যেহেতু ড্রিফ্ট রিপোর্ট তাদের তালিকাভুক্ত করে না এবং `check:docs-all` আগে তাদের সিঙ্ক করে)।

`docs/diagrams/` অধীনে বারোটি README SVGs তৈরি হয় (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` তাদের সকলকে পুনরুত্পাদন করে)। প্রতিটির একটি বাইট-তুলনা ইউনিট পরীক্ষা রয়েছে (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) যা ব্যর্থ হয় যখন প্রতিশ্রুতিবদ্ধ ফাইলটি রিলিজ মোডে বাসি হয়; একটি PR এ, `check:generated-artifacts` একটি SVG PR সম্পাদনাগুলি বিচার করে এবং বেসের ড্রিফ্টটি রিলিজ রিফ্রেশের জন্য ছেড়ে দেওয়া হয় (দেখুন [জেনারেটেড ফাইল এবং প্রাপ্ত বেসলাইন](#generated-files-and-derived-baselines-written-at-release) ) — এবং `check:docs-counts` তাদের `<text>` নোড — থেকে ক্যানোনিকাল সংখ্যাগুলি পড়ে যার কারণে আউটলাইন করা `<text>` ফাইলের প্রতিটি ধাপে আউটলাইন করা হয়। SVG ক্যানোনিকাল-সংখ্যার চেক `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, প্লাস `public/images/tier-flow-dark.svg` এবং `tier-flow-light.svg`; ফ্রি-এভার, ক্যাটালগ-এন্ট্রি, রেকারিং-পুল এবং স্কোরিং-ফ্যাক্টর দাবিগুলিও `promise-pillars.svg`, `free-tier-budget.svg` এবং `strategies-grid.svg` পড়ে। এই জেনারেটরগুলি যে গণনাগুলি আঁকেন (প্রোভাইডার মোট, MCP টুলস, রাউটিং কৌশল, ফ্রি-অস্থায়ী প্রদানকারী, …) ফ্যাক্ট স্ন্যাপশট `docs/reference/derived-facts.json` `scripts/docs/readmeFacts.mjs` মাধ্যমে আসে, লিটারাল থেকে নয়, তাই যে কোনও শাখায় একটি ডায়াগ্রাম পুনরুত্পাদন করা প্রতিশ্রুতিবদ্ধ ফাইলটি পুনরুত্পাদন করে। `free-tier-budget.svg` একই স্ন্যাপশট থেকে তার সারিগুলি আঁকে (`code.freeTierBudget`, ক্যাটালগ সারাংশ তথ্য অনুসন্ধানের রেকর্ড), তাই `FREE_MODEL_BUDGETS` এ পরিবর্তন CI লাল করার পরিবর্তে পরবর্তী রিফ্রেশে কার্ডে পৌঁছায়।

### প্রাপ্ত মান: `pr` এবং `release` গেট মোড

একটি বৈশিষ্ট্য PR কখনই এমন একটি মান লেখে না যা তার ভিত্তির অবস্থার উপর নির্ভর করে: প্রদানকারী, মাইগ্রেশন, MCP- টুল এবং কৌশল গণনা, README SVG সংখ্যা, তথ্যের স্ন্যাপশট। এক ধাপ তাদের সবগুলোকে পুনরায় গণনা করে, `npm run release:refresh-derived`, রিলিজ দ্বারা পরিচালিত হয় এবং রাত্রিকালীন উদ্ভূত-রিফ্রেশ PR দ্বারা। তাই** রিলিজের মধ্যে বেস ডিজাইন দ্বারা লাইভ কোডের পিছনে থাকে** , এবং একটি গেট বা পরীক্ষা যা লাইভ কোডের সাথে গাছের তুলনা করে একটি ভাইবোন একটি প্রদানকারী যোগ করার পরে প্রতিটি PR এ লাল হবে। যে গেটগুলি প্রাপ্ত মান বিচার করে তাই দুটি মোডের একটিতে চলে, `scripts/check/lib/gateMode.mjs` দ্বারা সমাধান করা হয় (প্রথম ম্যাচে জয়):

1. কমান্ড লাইনে`--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` পরিবেশ পরিবর্তনশীল (`pr` বা `release`);
3. স্বয়ংক্রিয়, GitHub অ্যাকশন ইভেন্ট থেকে: একটি `pull_request` যার মাথা `release/v*` নয় , একটি `merge_group`, বা `omni-queue/**` → `pr` তে ধাক্কা ; অন্য সবকিছু (ধাক্কা, সময়সূচী, প্রেরণ, রিলিজ PR `release/v* → main`, যেকোনো স্থানীয় রান) → `release`।

কি `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) প্রতিটি মোডে ব্যর্থ হয়:

| মোড       | ব্যর্থ হয়                                                                                                                                                                                                                                                                                                                                                                                                                         | লাইভ ফ্যাক্ট দরকার |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `release` | প্রতিটি চেক, গাছ থেকে সংগৃহীত তথ্যের বিরুদ্ধে কঠোর সমতা (গেটের সর্বদা যে আচরণ ছিল): একটি বাসি গণনা, সংস্করণ, কভারেজ ফ্লোর বা SVG সংখ্যা একটি STRICT ড্রিফট                                                                                                                                                                                                                                                                         | হ্যাঁ              |
| `pr`      | শুধুমাত্র পরিবর্তনটি যা করেছে, একই দাবি নিষ্কাশনকারীর সাথে PR বেসের সাথে ভিন্ন: (1) একটি পরিচালিত মান যা সেই চেক এবং ফাইলের জন্য বেসে বিদ্যমান ছিল না ("PR একটি পরিচালিত সংখ্যা সম্পাদনা করেছে — বেস টেক্সটে লাইন পুনরুদ্ধার করেছে"); (2) একটি প্রয়োজনীয় দাবি বেস বহন এবং মাথা হারিয়ে. যে বিষয়বস্তু পরিবর্তনের জন্য কোন তথ্যের প্রয়োজন নেই সেগুলি রিলিজ মোডের মতো চলে; শুধুমাত্র রিলিজ চেক তালিকাভুক্ত এবং এড়িয়ে যাওয়া হয় | না                 |

এজেন্ট-নির্দেশ ফাইল বহন** না** প্রাপ্ত গণনা মোটেও: `AGENTS.md`, `llm.txt` (এবং এর `docs/i18n/*/llm.txt` কপি), bs `AGENTS.md` কাঁটা, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` এবং প্রতিটি `skills/*/SKILL.md` উৎসের দিকে নির্দেশ করে (উদাহরণস্বরূপ `src/shared/constants/routingStrategies.ts` তে `ROUTING_STRATEGY_VALUES` ) এবং পরিবর্তে `npm run facts` । অপরিবর্তনীয় "কোনও প্রাপ্ত গণনা (এজেন্ট-নির্দেশনা ফাইল …)" সেখানে একটি গণনা ব্যর্থ করে (প্রোভাইডার, মাইগ্রেশন, MCP টুলস এবং স্কোপ, রাউটিং কৌশল, স্কোরিং ফ্যাক্টর, মোড প্যাক) উভয় মোডে, তাই রিলিজ রিফ্রেশকে কখনই একটি নির্দেশ ফাইল পুনরায় লিখতে হবে না।

`pr` মোডে লেখক শাখাগুলি পরিচালিত মানগুলি সম্পাদনা করতে পারে: `chore/derived-*` (রাত্রিকালীন রিফ্রেশ PR), `release/v*` এবং অনুবাদ তরঙ্গ `docs/i18n-*` এবং `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`)। সারি ব্যাচগুলি (`merge_group`, মার্জিফাই ড্রাফ্টস, `omni-queue/**`) আবার বিচার করা হয় না: তারা PRs গেটটি ইতিমধ্যেই একে একে বিচার করেছে।

Exit codes: `0` clean · `1` STRICT drift (or soft drift with `--strict`) or a managed-value violation · `2` infrastructure — the code facts could not be collected (the tsx probe failed or timed out; the timeout is `OMNIROUTE_FACTS_TIMEOUT_MS`, default 600000 ms) or, in CI, the PR diff base could not be resolved. An exit 2 is never a documentation divergence: re-run the job or fix the environment.

যেখানে প্রতিটি মোড চলে:

| যেখানে                                                                                               | মোড                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ফিচার PR — `ci.yml` জব `docs-sync-strict`, `quality.yml` ধাপ "ডক্স সঠিকতা"                           | `pr` (স্বয়ংক্রিয়); কাজটি `BASE_SHA` হিসাবে বেস পাস করে এবং `fetch-depth: 2` দিয়ে চেক আউট করে                                                                                                       |
| `merge_group`, `omni-queue/**` প্রার্থী, মার্জ ট্রেনের পুরো গেটের তালিকা                             | `pr`                                                                                                                                                                                                  |
| রিলিজ PR (`release/v* → main`), পুশ, নির্ধারিত এবং ম্যানুয়াল রান                                    | `release`                                                                                                                                                                                             |
| রিলিজ-সবুজ (`scripts/quality/validate-release-green.mjs`)                                            | HARD আইটেমগুলি `OMNIROUTE_GATE_MODE=pr` দিয়ে চলে ("বেসটি কি ভেঙে গেছে?"); DRIFT আইটেম `derived-refresh` `npm run release:refresh-derived -- --check` চালায় (কঠোর দৃষ্টিভঙ্গি, কখনই বেস-লাল খোলে না) |
| রিলিজ (`/generate-release` পর্যায় 0a এবং 1; দক্ষতা ওয়্যারিং একটি পৃথক মালিক-অনুমোদিত পরিবর্তন)     | `npm run release:refresh-derived` প্রাপ্ত ফাইলগুলি লেখে; রিলিজ PR এর নিজস্ব চেক তারপর `release` মোডে চালানো হয়                                                                                       |
| `nightly-derived-refresh.yml` (দৈনিক, সর্বোচ্চ `release/vX.Y.Z`, রিলিজ-ফ্রিজের অধীনে এড়িয়ে যাওয়া) | `npm run release:refresh-derived -- --profile=nightly`; একটি পার্থক্যে এটি `chore/derived-refresh` থেকে ONE PR খোলা রাখে; কখনো একত্রিত হয় না                                                         |

এর পিছনের আদেশগুলি:

- `npm run facts` প্রতিটি প্রাপ্ত নম্বর JSON (`scripts/release/facts.mjs`) হিসাবে মুদ্রণ করে। `--key=code.mcpTools` একটি মান প্রিন্ট করে, `--snapshot` লাইভ ট্রির পরিবর্তে প্রতিশ্রুতিবদ্ধ স্ন্যাপশট পড়ে। 2 থেকে প্রস্থান করুন যখন তথ্য সংগ্রহ করা যাবে না।
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) প্রাপ্ত ফাইলগুলিকে একটি পাসে পুনরায় গণনা করে, এই ক্রমে ( `--only=` জন্য ধাপ আইডি): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (স্ন্যাপশট), `numbers` (গণনা গেটের পুনর্লিখনের পরিকল্পনা ডক্সে প্রয়োগ করা হয়, তারপর তাদের `docs/i18n/`, `readme-diagrams`) , ), `skills` (গাছ `syncE2eTimings` পাঠানো পর্যন্ত এড়িয়ে `SKILL.md`), `e2e-timings` (প্রুনস `en.json` `ui-keys` করা হয়েছে এবং, `--rewritten-since=<ref>` — ডিফল্ট `origin/main` — শেষ রিলিজ থেকে পুনরায় লেখা ইংরেজি মান পুনঃ-সারির সাথে), `llm-mirrors` এবং `verify-generated` (একটি লেখার পরে, `check:generated-artifacts` এবং `check:agent-skills-sync` এক্স রিলিজ করার সময় অবশ্যই পাস করতে হবে; `--check` এটিকে ছেড়ে দেয়; একটি ব্যর্থতা হল প্রস্থান 2) `--only` `changelog` ধাপটি অপ্ট-ইন (`--with-changelog`, শুধুমাত্র প্রকাশ প্রোফাইল)। `--profile=nightly` কখনই একটি সংস্করণ দাবি স্পর্শ করে না। `-- --check` সাথে এটি কিছুই লেখে না এবং 1 থেকে প্রস্থান করে যখন কোনো ফাইল পরিবর্তন হবে বা একটি পরিচালিত মান একটি ম্যানুয়াল সম্পাদনা প্রয়োজন (উভয় তালিকাভুক্ত); একটি পরিকাঠামো ব্যর্থতার উপর প্রস্থান 2. `--json` ফলাফলটি JSON হিসাবে প্রিন্ট করে।
- `docs/reference/derived-facts.json` হল সর্বশেষ রিফ্রেশ ব্যবহার করা তথ্যের স্ন্যাপশট। শুধুমাত্র রিফ্রেশ এটা লিখে. README SVG জেনারেটররা এটি পড়ে, এবং PR-টাইম ইউনিট পরীক্ষাগুলি প্রতিশ্রুতিবদ্ধ ডক্স এবং জেনারেট করা ফাইলগুলির সাথে — কখনও লাইভ কোডের সাথে তুলনা করে। স্যুটের একক লাইভ তুলনা হল `tests/unit/check-docs-counts-sync.test.ts` তে "রিলিজ রিফ্রেশ চক্র বন্ধ করে" : লাইভ ফ্যাক্ট সহ, মেমরিতে প্রয়োগ করা রিফ্রেশের পুনর্লিখনের পরিকল্পনাটি রিপোর্ট করে না এমন কোন STRICT ড্রিফট রাখে না, এবং পুনঃপরিকল্পনা কিছুই পরিবর্তন করে না।

স্থানীয়ভাবে পুনরুত্পাদন করতে (একটি স্থানীয় রান ডিফল্ট `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

একটি সমাধানযোগ্য বেস ছাড়া ( `BASE_SHA`/`BASE_REF` নেই, স্থানীয় `origin/release/v<version>` নেই) একটি স্থানীয় `pr` রান একটি সতর্কতা প্রিন্ট করে এবং ব্যর্থ হওয়ার পরিবর্তে পার্থক্যটি এড়িয়ে যায়।

### চাকরি: `i18n-ui-coverage`

| স্ক্রিপ্ট                         | যাচাই করে                                                                                                                                                                        | ব্লকিং                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check-ui-keys-coverage` (ইনলাইন) | UI i18n কী কভারেজ ≥ 65%                                                                                                                                                          | হ্যাঁ (উভয় মোড)            |
| `check:ui-icu`                    | প্রতিটি UI ক্যাটালগের প্রতিটি বার্তা `IntlMessageFormat` দিয়ে সংকলিত হয়                                                                                                        | হ্যাঁ (উভয় মোড)            |
| `check-ui-value-drift` (ইনলাইন)   | একটি পুনঃলিখিত ইংরেজি** মান** পিছনে কোন বাসি অনুবাদ ছেড়ে যায় না                                                                                                                | হ্যাঁ (শুধুমাত্র রিলিজ মোড) |
| `check-new-key-coverage` (ইনলাইন) | ক** নতুন** ইংরেজি কী প্রতিটি লোকেলে অনুবাদ করা হয় — একটি `__MISSING__:` মার্কার প্রত্যাখ্যান করা হয়                                                                            | হ্যাঁ (শুধুমাত্র রিলিজ মোড) |
| `check-key-completeness` (ইনলাইন) | প্রতিটি UI ক্যাটালগ (এবং, `--catalog=cli` সহ, প্রতিটি CLI ক্যাটালগ) ঠিক তার `en.json` এর কী সেট বহন করে; `pr` মোডে, প্রতিটি ক্যাটালগ PR মার্জ বেসে নিজের বিরুদ্ধে পরিবর্তিত হয়  | হ্যাঁ (উভয় মোড)            |
| `check-translation-ratio`         | প্রতি লোকেলে বাস্তব-অনুবাদের অনুপাত (অনুরূপ-থেকে-ইংরেজি/স্থানধারক/অনুমতি তালিকার বাইরে থাকা পাতা) অবশ্যই `config/quality/i18n-translation-baseline.json` + স্ল্যাকের বেশি হবে না | হ্যাঁ (শুধুমাত্র রিলিজ মোড) |

`fetch-depth: 0` — প্রয়োজন মান-প্রবাহ গেট মার্জ বেসের বিপরীতে `en.json` আলাদা করে।

**দুটি মোড (2026-11-13 থেকে)।** একটি বৈশিষ্ট্য PR `en.json` (এবং `bin/cli/locales/en.json`) এ কীগুলি যোগ করে বা পুনর্লিখন করে এবং অন্য কোনও লোকেল স্পর্শ করে না; `check:pr-derived-paths` (job `pr-test-policy`, family `config/quality/derived-paths/translation.json`) একটি ফিচার PR ব্যর্থ করে যা করে। অন্যান্য লোকেলগুলি `release:refresh-derived` দ্বারা রিলিজ প্রতি একবার সম্পূর্ণ হয়, যা `scripts/i18n/sync-ui-keys.mjs` এ `syncUiKeys()` বলে (অনুপস্থিত কীগুলি যোগ করুন, বাদ দেওয়াগুলিকে ছাঁটাই করুন, `rewrittenSinceRef` দিয়ে পুনঃলিখিত ইংরেজির অনুবাদগুলি চিহ্নিত করুন , অনুবাদ করুন), বা একটি অনুবাদ তরঙ্গ দ্বারা। গেটগুলি `scripts/check/lib/gateMode.mjs` থেকে মোড পড়ে: `pr` মোডে (ফিচার PRs, `merge_group`, `omni-queue/**`) রিলিজ-মোড গেটগুলি `SKIP reason=pr-mode` এবং প্রিন্ট 0 এর উপরে; `release` মোডে (রিলিজ PR, `main`, `workflow_dispatch`, লোকাল রানে ঠেলে দেয়) তারা আগের মতোই কঠোর, এবং PR রিলিজে ডিফ-অ্যায়াররা `BASE_REF=origin/main` পায়, তাই তারা চক্রটি যোগ করা বা পুনরায় লেখা প্রতিটি কী বিচার করে। স্থানীয়ভাবে `--mode=pr` দিয়ে বৈশিষ্ট্য-পিআর রায়ের পূর্বরূপ দেখুন।

একটি PR যা এখনও `pr` মোডে লোকেল ক্যাটালগ পরিবর্তন করে (একটি অনুবাদ তরঙ্গ, রিলিজ রিফ্রেশ, একটি অনুবাদ-শুধুমাত্র সংশোধন) বাদ দেওয়া হয় না: `check-key-completeness` প্রতিটি ক্যাটালগকে বিচার করে যা এটি মার্জ বেসে একই ক্যাটালগের বিপরীতে পরিবর্তিত হয় (`scripts/i18n/lib/touched-catalogs.mjs`) এবং ক্যাটালগ হারিয়ে যাওয়া একটি কীতে ব্যর্থ হয়, একটি কী `en.json` টেক্সটে পরিণত হয় বা বাস্তবে অনুবাদের অভাব হয়, একটি `__MISSING__:` টেক্সট একটি মান যা PR স্পর্শ করেনি এমন একটি ইংরেজি স্ট্রিং এর placeholders/tags আর ইন্টারপোলেট করে না। PR তে নতুন একটি ক্যাটালগ অবশ্যই পুরো `en.json` কী সেট বহন করবে। এটি কভার করে, ক্যাটালগগুলির জন্য একটি PR স্পর্শ করে, অনুপাত এবং CLI-প্যারিটি গেটগুলি কী দেখতে পাবে৷

লোকেল-প্যারিটি ইউনিট পরীক্ষাগুলি (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` এর মাধ্যমে একই মোড অনুসরণ করে: `pr` মোডে তারা কী-প্যারিটি দাবিগুলি এড়িয়ে যায় এবং রিলিজে চলে যায় সেই কীগুলির প্লেসহোল্ডার প্যারিটি রিফ্রেশ করে যার ইংরেজি মার্জ বেস থেকে পরিবর্তিত হয়েছে (প্রত্যেকটি কাজটি যখন ইউনিট-কে পড়তে পারে না)। যে সাহায্যকারী হয়** শুধুমাত্র** মঞ্জুরিকৃত মোড-কন্ডিশনাল স্কিপ: `check:test-masking` `.skip(` এবং `{ skip: true }` গণনা করে কিন্তু গণনা করা `{ skip: "<reason>" }` নয়, তাই `tests/unit/locale-parity-mode.test.ts` এটি ব্যবহার করার জন্য অনুমোদিত পরীক্ষার তালিকা পিন করে — সেই তালিকায় একটি পর্যালোচনা করা সম্পাদনা।

#### `check-ui-value-drift` — বাসি-অনুবাদ গেট

একটি i18n রিগ্রেশন ক্যাচ করে যা অন্য গেটগুলি কাঠামোগতভাবে দেখতে পায় না: একটি ইংরেজি মান পুনরায় লেখা হয় এবং _আগের_ ইংরেজি থেকে প্রাপ্ত অনুবাদগুলি পিছনে থাকে, তাই অ-ইংরেজি ব্যবহারকারীরা আত্মবিশ্বাসের সাথে-শব্দযুক্ত, এখন-ভুল অনুলিপি পড়তে থাকে।

এই বাস্তব জন্য পাঠানো হয়েছে. `oauthModal.googleOAuthWarning` পুনরায় লেখা হয়েছিল যখন Antigravity লগইন হেল্পার (#5203);** 43টির মধ্যে 39টি লোকেল** টেক্সট অপারেটরদের "সম্পূর্ণ URL অনুলিপি করুন এবং এটি নীচে পেস্ট করুন" — একটি প্রবাহ যা সেই প্রদানকারীর জন্য সম্পূর্ণ করতে পারে না। এটি #8463 পর্যন্ত অলক্ষিত ছিল কারণ:

- `sync-ui-keys` শুধুমাত্র backfills কী যে হয়** অনুপস্থিত** , যারা হয় না** বাসি** ;
- `check-ui-keys-coverage` কী _presence_ গণনা করে, তাই একটি বাসি অনুবাদ কভার হিসাবে স্কোর করে;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ডকুমেন্টেশন মিরর — ট্র্যাক করে এটা কখনো `src/i18n/messages/*.json` পড়ে না। এটি কাজ `docs-sync-strict` এ চলে: PRs এর পরামর্শ, ধাক্কা এবং রাতের বেলায় কঠোর; অনুবাদ তরঙ্গ আয়না রিফ্রেশ করে, বৈশিষ্ট্য PR নয়।

**ভিন্ন-সচেতন, বেসলাইন-সমর্থিত নয়।** এটি কার্যকারী গাছের সাথে মার্জ বেসে `en.json` তুলনা করে; প্রতিটি কীর জন্য যার ইংরেজি মান পরিবর্তিত হয়েছে, যে কোনো লোকেল এখনও অস্পর্শিত অনুবাদ ধারণ করে বাসি। ইচ্ছাকৃতভাবে এই** পূর্ব-বিদ্যমান ঋণ জমা করে** — a diff প্রকাশ করতে পারে না কোন পুরানো ইংরেজি থেকে দীর্ঘস্থায়ী অনুবাদ এসেছে, তাই গেট বিচার করে শুধু বর্তমান পরিবর্তনটি কী স্পর্শ করে। বিকল্প (একটি প্রতি-কী হ্যাশ বেসলাইন) একটি ~ 600 KB জেনারেট করা ফাইলের জন্য খরচ হবে, 3 × বৃহত্তম বিদ্যমান বেসলাইন, প্রতি i18n PR এ মন্থন।

এটি সন্তুষ্ট করার দুটি উপায়:

1. প্রভাবিত অনুবাদ আপডেট করুন, অথবা
2. রানটাইম এগুলিকে `__MISSING__:<new english>` — এ সেট করুন তারপর সংশোধন করা ইংরেজি (`src/i18n/request.ts::deepMergeFallback`, #7258) এবং অনুবাদের জন্য কী সারিগুলি পরিবেশন করে৷

যদি স্ট্রিং এর** অর্থ** পরিবর্তিত, পছন্দ** কীটির নাম পরিবর্তন করা** : একটি নতুন কী একটি পুরানো অনুবাদের উত্তরাধিকারী হতে পারে না। যে প্যাটার্ন #8463 ব্যবহৃত হয়.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

`SKIP reason=base-unresolved` দিয়ে 0 থেকে প্রস্থান করে যখন বেস ক্যাটালগ পড়া যায় না (বেস রেফ ছাড়া অগভীর ক্লোন), মিররিং `check-openapi-breaking`। শুধুমাত্র রিলিজ মোড: একটি বৈশিষ্ট্য PR ইংরেজি পুনরায় লিখতে এবং সেখানে থামে; রিলিজ রিফ্রেশ এটি পিছনে রেখে যাওয়া অনুবাদগুলিকে চিহ্নিত করে (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, same `findStaleTranslations`)।

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

## বেগ ফেজ (2026-08-30 → v4.0 LTS): প্রতিটি বেসলাইন 20% দ্বারা শিথিল

মালিকের সিদ্ধান্ত (2026-08-30): v4.0 মডুলারাইজেশন পর্যন্ত, শিপিং গতি ঋণের লাইন ধরে রাখার চেয়ে বেশি গুরুত্বপূর্ণ। প্রতিটি** সংখ্যাসূচক** র্যাচেট বেসলাইন একটি নিরীক্ষণযোগ্য পাসে 20% দ্বারা শিথিল করা হয়েছিল, এবং ফেজটি `config/quality/quality-baseline.json` তে ঘোষণা করা হয়েছে:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| কি পরিবর্তন                                                                                                                                                                | যেখানে                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — নিম্ন-ই-ভাল-উন্নত গণনা × 1.2, উচ্চ-এ-ভাল শতাংশ ÷ 1.2 (কভারেজ ফ্লোর 60 রাখা হয়েছে, `eslintErrors` থাকে 0, `eslintWarnings` 0 → হিমায়িত দমন গণনার 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` নোট প্রতিটি → পরে তালিকা করে)                    |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, প্রতি `frozen[*]` / `testFrozen[*]` লাইন ক্যাপ × 1.2                                                                                                     | `file-size-baseline.json`                                                                              |
| প্রতি-ফাইল / প্রতি-টিএস-কোড গণনা × 1.2                                                                                                                                     | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` উপদেষ্টা হয়ে ওঠে যখন `_policy.requireTighten === false`                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| রাত্রিকালীন `bank-ratchet-shrinks` বিরতি (এটি পরিমাপ করা সঙ্কুচিত হবে এবং হেডরুমকে পূর্বাবস্থায় ফিরিয়ে আনবে)                                                             | `.github/workflows/nightly-release-green.yml`                                                          |

অনুমোদিত তালিকা (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) হল৷** না** বাজেট এবং স্পর্শ করা হয়নি. Pass/fail পলিসি গেটস (গোপন, SQL নিয়ম, docs/env চুক্তি, i18n প্যারিটি, ইউনিট পরীক্ষা) অপরিবর্তিত — একটি লাল পরীক্ষা এখনও একটি লাল পরীক্ষা।

**টুলিং**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — এক-শট শিথিলকরণ (`scripts/quality/relax-baselines.mjs`); একই নোট দিয়ে দুবার চালাতে অস্বীকার করে।
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — প্রতিটি সাংখ্যিক গেট পরিমাপ করে যেভাবে CI করে এবং বাকি হেডরুম প্রতি গেটে (`scripts/quality/baseline-headroom.mjs`) প্রিন্ট করে। রাত্রিকালীন `baseline-headroom` জব ওয়ার্কফ্লো রান সারাংশে টেবিলটি প্রকাশ করে এবং 90 দিনের জন্য ধরে রাখা `baseline-headroom-<run_id>` হিসাবে তার JSON/Markdown রিপোর্ট আপলোড করে। সতর্কতা এবং সমালোচনামূলক সারিগুলি তাদের ক্যাপের 10% এর মধ্যে বা ইতিমধ্যে এটির উপরে গেট সনাক্ত করে। এই প্রতিবেদনগুলিকে বাজেটের খরচের জন্য প্রাথমিক সতর্কতা হিসাবে পর্যালোচনা করুন; আপত্তিকর গেটের `_rebaseline_*` নোটগুলি পরিদর্শন করুন। চাকরি আর স্থায়ী সমস্যা তৈরি বা আপডেট করে না; #12149 আগের প্রতিবেদনের ইতিহাস সংরক্ষণ করে।

**2026-08-30 থেকে নতুন-কোড মোড (ক্লিন-এজ-ইউ-কোড) —, শুধুমাত্র PR ফাস্ট-পাথ**

`pull_request` ইভেন্টে `quality.yml` `--base-ref <PR base SHA>` থেকে `check:file-size`, `check:complexity-ratchets` এবং `check:dead-code` পাস করে। `check:complexity-ratchets` এবং `check:dead-code` জন্য গেটটি HEAD মার্জ-বেসের সাথে তুলনা করে** PR স্পর্শ করা ফাইলগুলিতে সীমাবদ্ধ** (`scripts/check/newCodeMode.mjs`: মার্জ-বেসটি একটি নিক্ষেপযোগ্য `git worktree` এ বাস্তবায়িত হয়, ESLint/knip সেখানে চালানো হয় এবং HEAD এ, প্রতি-ফাইলের সংখ্যা ভিন্ন হয়):

- **ব্লক করা** — PR ফাইলে cyclomatic/cognitive লঙ্ঘন বা মৃত রপ্তানি যোগ করেছে এটি পরিবর্তিত হয়েছে (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` লগে);
- **উপদেশ** — গ্লোবাল টোটাল বনাম হিমায়িত বেসলাইন। উত্তরাধিকারসূত্রে প্রাপ্ত ড্রিফ্ট কখনোই নির্দোষ PR লাল করে না; ড্রিফট রিলিজ মিলন এ পুনরায় হিমায়িত করা হয় এবং হেডরুম কাজ দ্বারা প্রেক্ষিত.

`check:file-size` তার নিজস্ব শর্তে বেস রেফ ব্যবহার করে (`scripts/check/check-file-size.mjs`, #8522): এটি গাছের প্রতিটি উত্স এবং পরীক্ষার ফাইল পরীক্ষা করে, `git show` দিয়ে PR বেসে প্রতিটির লাইন গণনা পড়ে এবং একটি ফাইল শুধুমাত্র তখনই ব্যর্থ হয় যখন এটি তার বেসলাইন সিলিং (`frozen` / `testFrozen` `cap` `testCap` লাইনের বাইরে) এবং ফাইলের বেস লাইনের বাইরে চলে যায়। আকার একটি ফাইল যা ইতিমধ্যে ভিত্তির উপর প্রবাহিত হয়েছে তাই কখনও একটি নির্দোষ PR লাল করে না।

`check:boundary:ratchet` তার একক সংখ্যার জন্য একই নিয়ম প্রয়োগ করে (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR ইভেন্টে `quality.yml` ফাস্ট-গেট এবং `ci.yml` lint জব উভয়ই PR বেস SHA পাস করে, বেস কমিট একটি `git archive` রপ্তানি থেকে পরিমাপ করা হয়, এবং PR শুধুমাত্র তখনই ব্যর্থ হয় যখন এর `open-sse → src` প্রান্ত গণনা `metrics.boundaryOpenSseToSrc` এর বৃহৎ সংখ্যার উপর নির্ভর করে। ছাদের উপরে বেস ড্রিফ্ট রিপোর্ট করা হয়েছে (`base drift herdado`) কিন্তু কখনোই একটি নির্দোষ PR লাল করে না; push → main পরম সিলিং রাখে, এবং একটি অমীমাংসিত ভিত্তি SHA একটি সতর্কতা সহ এটিতে ফিরে আসে।

একজন ওমনি-কিউ প্রার্থী ( `omni-queue/**` এ একটি ধাক্কা, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) দেখুন) একটি টান অনুরোধের মতো একই আচরণ পায়: উভয় কর্মপ্রবাহ প্রার্থীর ভিত্তি (`needs.changes.outputs.candidateBase`) `--base-ref` হিসাবে পাস করে এবং `check:ts7-diagnostics-ratchet` এর বিরুদ্ধেও চলে। দুটি নতুন-কোড গেটের জন্য তুলনামূলক ভিত্তি হল যে SHA নিজেই, শীর্ষ মার্জ কমিটের প্রথম প্যারেন্ট নয়, তাই ব্যাচের প্রতিটি পুল অনুরোধ বিচার করা হয়।

`workflow_dispatch` রান, রিলিজ-গ্রিন সুইপ এবং রাতের হেডরুম কাজের কোন PR বেস নেই এবং পরম (গ্লোবাল) তুলনা রাখুন। কভারেজ, ডুপ্লিকেশন এবং টাইপ-কভারেজ আপাতত বিশ্বব্যাপী থাকবে (তাদের সরঞ্জামগুলি সস্তায় প্রতি-ফাইলের পার্থক্য তৈরি করে না) একই চিকিত্সার জন্য — প্রার্থীরা।

**v4.0-এ ফেজ বন্ধ করা হচ্ছে (LTS = আগের চেয়ে শক্ত, "স্বাভাবিক অবস্থায় ফিরে" নয়)**

1. বিশুদ্ধ `release/v4.0.0` টিপে: রেকর্ডের জন্য `npm run quality:headroom --json`, তারপর `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, প্রতিটি টাইপচেক গেটের `--update` — প্রতিটি বেসলাইন পরিমাপ করা মানতে নেমে যায়।
2. `quality-baseline.json` থেকে `_policy` মুছুন (পুনরায় অস্ত্র `--require-tighten` এবং রাতের ব্যাঙ্কিং), `check-openapi-coverage.mjs` এ `THRESHOLD = 36` (বা উচ্চতর) পুনরুদ্ধার করুন।
3. যেখানে মডুলারাইজেশন অর্থ প্রদান করেছে তা পরিমাপের বাইরে শক্ত করুন: ফাইলের আকার `cap` 1000 (বা 800), কভারেজ ফ্লোর + 5, মডুলারাইজড প্যাকেজের জন্য মৃত রপ্তানি 0।

## র্যাচেট বেসলাইন (`quality-baseline.json`)

র্যাচেট ইঞ্জিন (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` পড়ে এবং তা নতুন সংগৃহীত `quality-metrics.json` সাথে তুলনা করে। যে কোনো মেট্রিক যা এর এপসিলনের বাইরে চলে যায় তা বিল্ডে ব্যর্থ হয়।

বর্তমান ট্র্যাক করা মেট্রিক্স:

| মেট্রিক               | দিকনির্দেশনা | অর্থ                                        |
| --------------------- | ------------ | ------------------------------------------- |
| `eslintWarnings`      | `down`       | ESLint সতর্কতা সংখ্যা অবশ্যই বৃদ্ধি পাবে না |
| `coverage.statements` | `up`         | বিবৃতি কভারেজ পড়া উচিত নয়                 |
| `coverage.lines`      | `up`         | লাইন কভারেজ পড়া উচিত নয়                   |
| `coverage.functions`  | `up`         | ফাংশন কভারেজ পড়া উচিত নয়                  |
| `coverage.branches`   | `up`         | শাখা কভারেজ পড়া উচিত নয়                   |

প্রকৃত উন্নতির পরে বেসলাইন আপডেট করতে:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` পতাকা বর্তমান পরিমাপ করা মানগুলিকে `quality-baseline.json` এ লেখে। ব্যাঙ্কিং একটি উন্নতি release/nightly কাজ, একটি বৈশিষ্ট্য নয় PR's: `--require-tighten` (Fase 6A.5) শুধুমাত্র রিলিজ মোডে (ধাক্কা, সময়সূচী, রিলিজ PR, স্থানীয় রান) একটি আন-ব্যাঙ্কড উন্নতি ব্যর্থ করে। একটি বৈশিষ্ট্য PR (`pr` গেট মোড) এটি তথ্য হিসাবে উন্নতি প্রিন্ট করে এবং পাস করে; একটি রিগ্রেশন উভয় মোডে ব্যর্থ হয়। বেগ পর্যায়ে এটি সর্বত্র উপদেশমূলক (`_policy.requireTighten: false`)। [জেনারেটেড ফাইল এবং প্রাপ্ত বেসলাইন](#generated-files-and-derived-baselines-written-at-release) দেখুন।

### CodeQL ratchet: ক্যাডেন্স এবং ম্যানুয়াল ট্রিগার রিফ্রেশ করুন

`check:codeql-ratchet` পড়ে** রেপো স্টেট, একটি সময়সূচীতে রিফ্রেশ করা হয়েছে — প্রতি PR নয়।** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` রিপোর্ট করে `state: configured`, `schedule: weekly`: GitHub এর ডিফল্ট-সেটআপ স্ক্যান, প্রতি-পুশ বিশ্লেষণ নয়। ফলাফল: একটি PR পরে যে FIXES সতর্কতাগুলি একত্রিত হয়, র্যাচেটটি পুরানো, উচ্চ গণনা পড়তে থাকে যতক্ষণ না পরবর্তী নির্ধারিত স্ক্যানটি — চালানো হয় তাই এটি স্ক্যানটি ধরা না হওয়া পর্যন্ত PR এর নিজস্ব ফলো-আপ ফিক্সিং সহ প্রতিটি খোলা PR তে একটি রিগ্রেশন রিপোর্ট করে।

**ম্যানুয়াল রিফ্রেশ** : `gh workflow run codeql.yml --ref release/vX.Y.Z` বিশ্লেষণটি পুনরায় চালায় এবং কয়েক মিনিটের মধ্যে সতর্কতা পুনরায় প্রকাশ করে। `.github/workflows/codeql.yml` প্রথমে — পড়ুন এর হেডার ব্যাখ্যা করে যে এটি `workflow_dispatch` -only** কারণ এটি GitHub এর "ডিফল্ট সেটআপ" এর সাথে বিরোধপূর্ণ** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`) `push`/`pull_request`/ `schedule` ট্রিগার পুনরুদ্ধার করার জন্য একটি প্রয়োজন** মালিকের পদক্ষেপ প্রথমে** : সেটিংস → কোড নিরাপত্তা → CodeQL: ডিফল্ট → উন্নত। — সুইচ ছাড়া একটি `schedule:` ট্রিগার যোগ করবেন না এটি শুধুমাত্র ব্যর্থ রান তৈরি করবে।

**গণনা কমে যাওয়ার পরে বেসলাইনটি শক্ত করুন** — `node scripts/check/check-codeql-ratchet.mjs --update` নতুন পরিমাপ করা গণনাকে `quality-baseline.json` → `metrics.codeqlAlerts.value` তে লেখে, তাই র্যাচেট নীরবে পুরানো সিলিং পর্যন্ত রিগ্রেশনের অনুমতি দেয় না। কাজের উদাহরণ (2026-09-02/03): PR #12502 স্থির 7 বাস্তব সতর্কতা (13 → 6 মাপা খোলা); PR #12530 হিমায়িত বেসলাইন 11 → 6 কে মেলাতে শক্ত করেছে; অবশিষ্ট 6টি তখন প্রতি-সতর্কতার ন্যায্যতা দিয়ে বরখাস্ত করা হয়েছিল 0 খোলা পর্যন্ত।

**বরখাস্ত হল অপারেটরের আহ্বান (হার্ড রুল #14)** বরখাস্তের মন্তব্যে প্রযুক্তিগত যুক্তি রেকর্ড না করে — কখনই একটি CodeQL সতর্কতা খারিজ করে না: একটি আপস্ট্রিম-প্রটোকল প্রয়োজনীয়তার জন্য `won't fix`, একটি পরীক্ষার ফিক্সচারের জন্য `used in tests`, একটি স্যানিটাইজারের জন্য `false positive` CodeQL দেখতে পারে না (নজির: `docs/security/ERROR_SANITIZATION.md`)।

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

## উত্পন্ন ফাইল এবং প্রাপ্ত বেসলাইন (রিলিজে লিখিত)

পরিকল্পনা 2026-11-13 ("উত্পন্ন সংখ্যা এবং পাঠ্যগুলি শুধুমাত্র প্রকাশের সময় সমাধান করা হয়েছে"): একটি বৈশিষ্ট্য PR পরিবর্তন করে** উৎস** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, দক্ষতার ক্যাটালগ, মুক্ত-স্তরের ক্যাটালগ, একটি নতুন e2e বিশেষত্ব৷ এটি সেই উত্স থেকে গণনা করা ফাইলগুলিকে পুনরুত্পাদন করে না এবং এটি একটি বেসলাইনে পরিমাপিত উন্নতিকে ব্যাঙ্ক করে না। রিলিজ রিফ্রেশ (`release:refresh-derived`) বা রাতের রিফ্রেশ PR দ্বারা এই ফাইলগুলি একবার পুনরায় লেখা হয়। এর আগে, প্রতিটি ভাইবোন PR তার নিজস্ব পুনরুত্পাদিত অনুলিপি বহন করত এবং পরবর্তী একত্রিতকরণের সাথে বিরোধিতা করত (2026-11-13: 321 এর 30 খোলা PRs পুনঃলিখন `PROVIDER_REFERENCE.md`, 26-28 README ডায়াগ্রাম পুনর্লিখন)।

**প্রহরী।** `check:pr-derived-paths` (জব `pr-test-policy`) একটি বৈশিষ্ট্য PR ব্যর্থ করে যা `config/quality/derived-paths/` এ একটি পরিবারের একটি ফাইল স্পর্শ করে:

| পরিবার      | ফাইল                                                                                                                                                                        | দ্বারা পুনরায় লিখিত                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; বারো জেনারেটেড README SVGs; `skills/*/references/**`; `SKILL.md` ফাইলগুলির কোন কাস্টম ব্লক নেই | `release:refresh-derived` (তথ্য), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                           | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                    |

লেখকরা (`release/v*`, `chore/derived-*`, এবং `chore/bank-ratchet-*` বেসলাইনের জন্য) অব্যাহতিপ্রাপ্ত; তাই একটি PR যা শুধুমাত্র একটি পরিবার এবং তার সঙ্গীদের পরিবর্তন করে ( `generated` জন্য: জেনারেটর স্ক্রিপ্ট, তাদের পরীক্ষা, এজেন্ট-স্কিল ইনপুট — `src/shared/constants/agentSkills.ts`, হাতে লেখা `skills/**` ডক্স, `docs/openapi.yaml` — এবং `changelog.d/**`), যেমন একজন নায়ক SVG পরিবর্তন করে যার দক্ষতার সাথে পুনরায় পরীক্ষা করা হয় পুনরায় তৈরি করা `SKILL.md` ফাইল। একটি হাতে লেখা `<!-- skill:custom-start -->` ব্লক সহ একটি `SKILL.md` পরিবারে নেই: এর কাস্টম ব্লক একটি বৈশিষ্ট্যের পাশে সম্পাদনাযোগ্য থাকে।

**চেক, গেট মোড প্রতি** (`scripts/check/lib/gateMode.mjs`; সাহায্যকারী `scripts/check/lib/derivedArtifactScope.mjs`):

| চেক করুন                                                                       | `release` (ধাক্কা, সময়সূচী, মুক্তি PR, স্থানীয়)                        | `pr` (ফিচার PR, কিউ ব্যাচ)                                                                                                                                                                                                |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                      | প্রতিটি দক্ষতা অবশ্যই জেনারেটরের আউটপুটের সমান হবে                       | শুধুমাত্র দক্ষতা যার তৈরি টেক্সট (কাস্টম ব্লকের বাইরে) অথবা `references/` PR সম্পাদনা; অন্যথায় `SKIP reason=pr-mode`                                                                                                     |
| `check:generated-artifacts` (README SVGs + e2e সময়; সম্পূর্ণ ইতিহাস প্রয়োজন) | প্রতিটি SVG তার জেনারেটরের সমান; প্রতিটি স্পেকের একটি টাইমিং এন্ট্রি আছে | শুধুমাত্র শিল্পকর্ম PR সম্পাদনা করে; বাকি `SKIP reason=pr-mode`; নো ডিফ বেস → প্রতিটি আর্টিফ্যাক্ট বিচার করা হয় (ব্যর্থ-বন্ধ)                                                                                            |
| README SVG বাইট-তুলনা পরীক্ষা (`tests/unit/docs/readme-*-svg.test.ts`)         | প্রতিটি SVG                                                              | শুধুমাত্র একটি SVG PR সম্পাদনা করে, যখন বেস সমাধান হয়; `test-unit` এর অগভীর PR চেকআউটের কোনো ভিত্তি নেই, তাই সেখানে `SKIP reason=base-unresolved` এবং `check:generated-artifacts` সাথে পরীক্ষা এড়িয়ে যায় তুলনার মালিক |
| e2e সময় সম্পূর্ণতা (`tests/unit/balance-e2e-shards.test.ts`)                  | প্রতিটি স্পেকের একটি এন্ট্রি আছে                                         | SVG পরীক্ষার মতো একই নিয়ম (একটি নতুন স্পেস মাঝারি ওজনের সাথে চলে)                                                                                                                                                        |
| `check-quality-ratchet.mjs --require-tighten`                                  | ব্যাঙ্কবিহীন উন্নতি ব্যর্থ হয় (যদি না `_policy`)                        | উন্নতি রিপোর্ট করা হয়েছে, কখনও ব্যর্থ হয় না; একটি রিগ্রেশন এখনও ব্যর্থ হয়                                                                                                                                              |

রিলিজ মোড বিভক্ত হওয়ার আগে এই চেকগুলির রায়, প্রস্থান কোড এবং বার্তাগুলি রাখে; সমাধানকৃত মোড (`[agent-skills-sync] mode=release (auto: local run)`) নামকরণ করে সর্বাধিক একটি লাইন যোগ করা হয়। পরীক্ষাগুলি node:test-এর `{ skip: releaseOnlyUnlessTouched(...) }` বিকল্পের মাধ্যমে এড়িয়ে যায়, যা `check:test-masking` শুধুমাত্র রিপোর্টের ব্লকে তালিকাভুক্ত করে (এটি `.skip(` বা `{ skip: true }` নয়, তাই এটি একটি হার্ড স্কিপ হিসাবে গণনা করা হয় না)। `check:generated-artifacts` চলে যেখানে ভিত্তিটি সমাধানযোগ্য: জব `lint` (`fetch-depth: 0`), `check:agent-skills-sync` ঠিক পরে। স্থানীয়ভাবে, `npm run check:generated-artifacts -- --mode=pr` দেখায় একটি PR এ সেই পদক্ষেপটি কী বিচার করে। `check:docs-counts` এর প্রোভাইডার-টোটাল ক্রস-চেক ("প্রোভাইডার রেফারেন্স টোটাল (ডক বনাম লাইভ মডিউল)") কাউন্টস গেটের অংশ এবং সেই গেটের নিজস্ব মোড অনুসরণ করে।

একটি পরিবারে নয়, উদ্দেশ্যমূলকভাবে: লোকেদের দ্বারা সিদ্ধান্ত নেওয়া নীতি ফাইলগুলি (`gate-manifest.json`, অনুমোদিত তালিকা, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) এবং সিলিং একটি বৈশিষ্ট্য PR কোডের সাথে একত্রে সম্পাদনা করতে হতে পারে (`quality-baseline.json` মেট্রিক এন্ট্রি, typecheck/file-size/complexity বেসলাইন, `eslint-suppressions.json` — pruned by ESLint a pre-com- PR দ্বারা pruned লঙ্ঘন)। `src/i18n/routeNamespaces.generated.json` ও জেনারেট করা হয় কিন্তু PRs বৈশিষ্ট্যে থাকে : অ্যাপটি রান টাইমে এটি আমদানি করে, তাই এটি রিফ্রেশের জন্য অপেক্ষা করতে পারে না।

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
4. **যদি গেট একটি র্যাচেট হয়** (কভারেজ, ESLint সতর্কতা, সদৃশতা, জটিলতা): আপনার পরিবর্তন মেট্রিককে আরও খারাপ করেছে। অন্তর্নিহিত সমস্যাটি ঠিক করুন, অথবা (কদাচিৎ) `npm run quality:ratchet -- --update` চালান যদি পরিবর্তনটি ইচ্ছাকৃত হয় এবং মেট্রিক অবক্ষয় — গ্রহণযোগ্য হয় তবে কেন PR বিবরণে নথিভুক্ত করুন।
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

**এছাড়াও উপরে অনথিভুক্ত** (পরামর্শ, কম সংকেত): `docs-lint` জব (মার্কডাউনলিন্ট + ভ্যালে, পুরো কাজ `continue-on-error`) এবং স্বতন্ত্র স্ক্যানার ওয়ার্কফ্লো `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` `quality-baseline.json` এ আছে কিন্তু `ci.yml` — এ ব্লকিং র্যাচেটের সাথে তার যুক্ত নয় মেট্রিকটি বর্তমানে অনাথ।

### মার্জ / ডিডআপ (যান্ত্রিক, কম ঝুঁকি)

2026-06-17 তারিখে প্রতিটি প্রার্থীকে লাইভ গেট স্টেটের বিরুদ্ধে যাচাই করা হয়েছিল (ট্রাস্ট-বাট-ভেরিফাই); ঋণ লুকানোর জন্য বেশ কয়েকটি "স্পষ্ট" একত্রীকরণ পরিণত হয়েছে এবং হয়** না** পরিষ্কার ড্রপ-ইন।

- **`check:docs-sync` দুবার রান করে** — `lint` কাজের মধ্যে স্বতন্ত্র এবং আবার `check:docs-all` (`docs-sync-strict`) এবং husky প্রি-কমিট হুকের ভিতরে। ✅**DONE** — স্বতন্ত্র `lint` আহ্বান সরানো হয়েছে।
- **CVE স্ক্যানিং** — ❌**NOT একটি পরিষ্কার মার্জ।** `audit:deps` সমস্ত পাঁচটি লকফাইল জুড়ে সমালোচনামূলক পরামর্শ এবং অসম্পূর্ণ অডিট ব্লক করে, বর্তমান নীতির অধীনে সতর্কতা হিসাবে উচ্চ পরামর্শের প্রতিবেদন করার সময়; `check:vuln-ratchet` (osv) শুধুমাত্র একটি _regression_ বনাম চেক-ইন বেসলাইনে ব্যর্থ হয় এবং প্রয়োজনে অনুপস্থিত পরিমাপ প্রত্যাখ্যান করে। বিভিন্ন শব্দার্থবিদ্যা — ড্রপিং `audit:deps` নিখুঁত গুরুত্বপূর্ণ গেট এবং স্বাধীন প্যাকেজ অডিট রসিদ হারাবে। দুটোই রাখুন।
- **চক্র সনাক্তকরণ** — ✅**DONE** (#15159 G-01/G-02) এখানে পুরানো পাঠ্যটিকে `check:cycles` "সবুজ, কিউরেটেড" গেট বলা হয়েছে এবং এটিকে ব্লক করা যুক্তিযুক্ত কারণ `check:circular-deps` (dpdm) 91টি চক্রের প্রতিবেদন করেছে। সেই সবুজ ছিল ক** মিথ্যা সবুজ** : `check:cycles` 5টি সাবডিরেক্টরি (450 ফাইল) স্ক্যান করেছে, শুধুমাত্র স্ট্যাটিক `import|export … from` সাথে মিলেছে, এবং প্রতিটি `@/` এবং `@omniroute/open-sse/` স্পেসিফায়ার বাদ দিয়েছে, তাই এটি গতিশীল-আমদানি + উপনাম চক্রগুলি দেখতে পারেনি যা রেপোতে আধিপত্য বিস্তার করে। স্থির: গেটটি এখন `src` + `open-sse` (5023 ফাইল) চলে, TypeScript AST থেকে স্পেসিফায়ার সংগ্রহ করে (তাই `import("…")` গণনা করে এবং টাইপ-পজিশন `typeof import("…")` করে না), এবং tsconfig `paths` সমাধান করে। এটি খুঁজে পায়** 14** চক্র, 0 নয়। কারণ 14টি পূর্ব-বিদ্যমান চক্র একটি গেট PR এ স্থির করা যায় না, `check:cycles` এখন একটি** শাপলা** (`--ratchet`, `quality-baseline.json` তে সিলিং `metrics.cycles.value = 14`, `direction: down`) — এটি যেকোন _রিগ্রেশন_কে ব্লক করে এবং গণনা শুধুমাত্র পড়ে যেতে পারে। CI `npm run check:cycles:ratchet` চালায়। সঙ্গে বার্ন-ডাউন রাইডস**A-01** . `check:circular-deps` (dpdm) বৃহত্তর দ্বিতীয় মতামত হিসাবে পরামর্শমূলক থাকে।
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

- সাপ্লাই-চেইন (প্রোভেনেন্স, SBOM, Trivy, স্কোরকার্ড): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — কী-সেট প্যারিটি গেট

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, জব `i18n-ui-coverage`)। প্রতিটি `src/i18n/messages/<locale>.json` এর লিফ কী সেটকে `en.json` সাথে তুলনা করে এবং কোন অনুপস্থিত বা অতিরিক্ত পাতায় ব্যর্থ হয়, চাবিটি কখন যোগ করা হয়েছিল তা নির্বিশেষে। `__MISSING__:` স্থানধারক উপস্থিত হিসাবে গণনা করে (তাদের বিষয়বস্তু হল অনুপাত গেটের ব্যবসা)। এটি দুটি diff-based/percentage গেটের পরম পরিপূরক: `check-ui-keys-coverage` প্রতি লোকেলে একটি 80% ফ্লোর প্রয়োগ করে ( ~ 13,000 এর মধ্যে 43টি অনুপস্থিত কী এখনও 99.7 % পড়ে) এবং `check-new-key-coverage` শুধুমাত্র একটি PR `en.json` এ যোগ করা কীগুলি বিচার করে। একটি লোকেল ব্যাচ তৈরি করা হয় যেদিনের `en.json` থেকে এর শাখা কাটা হয় এবং কয়েক দিনের জন্য অনুবাদ করা হয় যখন বেস কী যোগ করতে থাকে; ব্যাচ PR নিজেই কোন চাবি যোগ করে না, তাই উভয় ভাইবোন নীরব ছিলেন যখন ব্যাচ 1 (#13044) নয়টি লোকেলে 43 কী শর্ট এবং ব্যাচ 2 (#13660) 10 কী আটটিতে ছোট (2026-09-15)। `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` দিয়ে একটি লাল ঠিক করুন; একটি `extra` পাতা মানে উৎস এটি — `sync-ui-keys` ড্রপ এটি (`--prune-extra`, ডিফল্ট)। `--warn` ব্যর্থ না হয়ে রিপোর্ট করে। `--catalog=cli` একই তুলনা চালায় `bin/cli/locales` (`npm run i18n:check-keys:cli`); উভয় ধাপই জব `i18n-ui-coverage` এ বাস করে। সম্পূর্ণ চেক শুধুমাত্র রিলিজ মোড: একটি বৈশিষ্ট্য PR `SKIP reason=pr-mode` দেখে এবং ফিক্সটি রিলিজ রিফ্রেশ বা অনুবাদ তরঙ্গে চলে, কখনও PR বৈশিষ্ট্যে নয়; একটি PR যা লোকেল ক্যাটালগ পরিবর্তন করে তাদের প্রত্যেকের পরিবর্তে মার্জ বেসের বিরুদ্ধে বিচার করা হয়েছে (জব `i18n-ui-coverage` অধীনে "দুটি মোড" দেখুন)।

#### `check-new-key-coverage` — নতুন-কী i18n গেট

`check-ui-value-drift` এর ভাইবোন। যে এক একটি ইংরেজি মান ধরা যে ছিল** পুনরায় লিখিত** যদিও এর অনুবাদগুলি পিছনে ফেলে রাখা হয়েছিল; এই এক একটি ইংরেজি কী ধরা যে ছিল** যোগ করা হয়েছে** যখন কিছু লোকেল এটা পায়নি।

`check-ui-keys-coverage` এই শ্রেণীটি দেখতে পারে না: এটি প্রতি লোকেলে একটি শতাংশ ফ্লোর প্রয়োগ করে এবং 99.9% এ ~ 13,000 পাতার কভারেজের মধ্যে এগারোটি অনুপস্থিত কী। ভাষা প্রতি শতাংশে "এই বৈশিষ্ট্যটি অনুবাদ ছাড়াই পাঠানো হয়েছে" প্রকাশ করতে পারে না — একটি সম্পূর্ণ বৈশিষ্ট্য একটি নতুন লোকেলে কোনও পাঠ্য ছাড়াই অবতরণ করতে পারে এবং সংখ্যাটি কখনই সরাতে পারে না।

ঘটনাটি এটি এনকোড করে: অর্কেস্ট্রেশন ক্যানভাসের ফেজ 3টি সেই সময়ে বিদ্যমান 42টি লোকেলে এর এগারোটি কী অনুবাদ করেছে। কয়েক ঘন্টা পরে ইইউ-ভাষা ব্যাচ (#13044) রেপোটিকে 51 টি লোকেলে নিয়ে যায় এবং নয়জন নতুনরা (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) তাদের কখনই গ্রহণ করেনি৷ `deepMergeFallback` একটি অনুপস্থিত কী-এর জন্য ইংরেজিকে প্রতিস্থাপন করে, তাই ব্যর্থতার মোডটি ফাঁকা UI — বাস্তবের পরিবর্তে অঅনুবাদিত UI ছিল এবং নির্মাণের মাধ্যমে নীরব।

এটি তার ভাইবোনের মতো** diff-সচেতন** , কার্যকারী গাছের সাথে মার্জ বেসে ইংরাজী তুলনা করে, তাই পূর্ব-বিদ্যমান ফাঁকগুলি হিমায়িত থাকে এবং গেটটি চালু করার জন্য কোন স্থানান্তরের প্রয়োজন হয় না।

**একটি `__MISSING__:<english>` চিহ্নিতকারী এটিকে সন্তুষ্ট করে না (2026-09-17 থেকে)।** 2026-09-16 তারিখে আটটি বৈশিষ্ট্য PRs পর্যন্ত 61টি কী যোগ করে এবং মার্কারটিকে অনুবাদের পরিবর্তে সমস্ত 65টি লোকেলে স্ট্যাম্প করা পর্যন্ত রানটাইমটি ইংরেজি — সংশোধনের জন্য ডকুমেন্টেড ডিফারাল — হিসাবে ব্যবহৃত হত: এই গেটটি প্রত্যেককে গ্রহণ করেছে, কিছুই PRs কে ব্লক করেনি, এবং ব্লক করা ব্যর্থ হয়েছে তারপরে প্রতি BR রিলিজের জন্য টিআইপিটিও ট্রান্সলেশন ব্যর্থ হয়েছে। 3.2 % > 2.5 % + 0.5)। একটি চিহ্নিতকারীকে এখন অনুপস্থিত অনুবাদ হিসাবে বিচার করা হয়। রিলিজ মোড শুধুমাত্র 2026-11-13 থেকে: একটি বৈশিষ্ট্য PR `SKIP reason=pr-mode` দেখে, এবং রিলিজ PR (`BASE_REF=origin/main`) এ গেট চক্রের যোগ করা প্রতিটি কী বিচার করে। রিলিজ রিফ্রেশে একটি লাল বা `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` এর সাথে একটি অনুবাদ তরঙ্গ, বা `npm run i18n:translate-new-keys` এর সমান্তরালে সমস্ত লোকেল ঠিক করুন (`scripts/i18n/translate-new-keys.sh`, বিচ্ছিন্ন-নিরাপদ, `OMNIROUTE_TRANSLATION_*` env ছাড়া শুরু করতে অস্বীকার করে)। একটি কী যা অবশ্যই ইংরেজিতে থাকতে হবে (একটি পিন করা product/engine/flag নাম) `scripts/i18n/untranslatable-keys.json` এর অন্তর্গত, কখনও মার্কারের পিছনে নয়। `vi` সরাসরি মার্কার নিষিদ্ধ করে (`tests/unit/i18n-vi-completeness.test.ts`)।

#### `check-vitest-exclusions` — পার্ক করা-পরীক্ষার গেট

`vitest.config.ts` এর `exclude` তালিকার একটি ফাইল হল একটি পরীক্ষা যা চালানো হয় না, এবং যে কেউ গাছটি পড়ে তার জন্য এটি কভারেজের মতো দেখায়। `// #8618 — pre-existing failure; remove this exclusion when fixed` মন্তব্যের পেছনে বাষট্টিটি ফাইল জমে আছে। ইস্যু #8618 2026-08-11 তারিখে বন্ধ করা হয়েছিল যখন এটি ট্র্যাক করা তালিকাটি 45 এন্ট্রি থেকে 62 এ বেড়েছে, প্রতিটি নতুন একটি মৃত সমস্যার দিকে ইঙ্গিত করে একটি মন্তব্য উত্তরাধিকারসূত্রে পেয়েছে। যখন তালিকাটি অবশেষে ফাইল দ্বারা ফাইল পরিমাপ করা হয়েছিল (#13204),** 62 টির মধ্যে 51টি কোন উৎস পরিবর্তন ছাড়াই বর্তমান গাছের বিপরীতে পাস করেছে** .

গেটটির জন্য প্রতিটি বর্জন প্রয়োজন যা একটি বাস্তব ফাইলের সমাধান করে (a) একটি ট্র্যাকিং সমস্যা নামকরণ এবং (b) `config/quality/vitest-exclusions.json` তে তার পরিমাপিত স্থিতি সহ প্রদর্শিত হয়, তাই একটি 60-এন্ট্রি অ্যারেতে আরও একটি লাইনের পরিবর্তে একটি ডেডিকেটেড ফাইলে একটি পর্যালোচনাযোগ্য পার্থক্য। এটি ইচ্ছাকৃতভাবে বাদ দেওয়া পরীক্ষাগুলি পুনরায় চালায় না যে — ~ মিনিট খরচ করে এবং একটি পর্যায়ক্রমিক কাজের অন্তর্গত; জায় রেকর্ড যখন প্রতিটি শেষ পরিমাপ করা হয়েছিল.
