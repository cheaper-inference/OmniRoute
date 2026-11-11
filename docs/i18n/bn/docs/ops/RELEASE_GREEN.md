# Release-Green: candidate validation and evidence (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

রিলিজ-সবুজ একটি নির্দিষ্ট প্রতিশ্রুতি পর্যবেক্ষণ করে এবং এর বৈধতা ফলাফল রিপোর্ট করে। [কোয়ালিটি গেটস রেফারেন্স](../architecture/QUALITY_GATES.md) বর্তমান CI প্রোফাইল, প্রয়োজনীয় চেক এবং গ্রহণ নীতি সংজ্ঞায়িত করে। সংস্করণযুক্ত [ভর্তি নীতি](../../config/quality/admission-policy.json) হল `Gate / CI` এবং `Gate / Quality` এর জন্য কার্যকরী চুক্তি।

## CI এবং পর্যবেক্ষক সুযোগ

`ci.yml` এবং `quality.yml` কভার অনুরোধগুলি প্রধান এবং প্রকাশ শাখাগুলিতে টেনে আনে। নির্বাচিত প্রোফাইল নির্ধারণ করে কোন চাকরিতে প্রযোজ্য। সম্পূর্ণ CI এমন লেনগুলিও অন্তর্ভুক্ত রয়েছে যা একটি সাধারণ পুল অনুরোধ কার্যকর করে না। একটি দ্রুত পর্যবেক্ষক ফলাফল সেই কাজগুলিকে প্রতিস্থাপন করতে পারে না এবং একটি সম্পূর্ণ ওয়ার্কফ্লো র‍্যাপার এর রসিদগুলিকে প্রতিস্থাপন করতে পারে না।

উৎপাদন বিল্ড CI এর অন্তর্গত। `quality.yml` তে কোনো ডুপ্লিকেট উপদেষ্টা বিল্ড নেই। অনুপস্থিত শিল্পকর্ম, বাতিল কাজ এবং অসম্পূর্ণ পরিমাপ একটি সফল প্রয়োজনীয় চেক স্থাপন করে না। ফলাফল গ্রহণ করার আগে বর্তমান ভিত্তি, প্রধান এবং সম্মিলিত প্রার্থী নিশ্চিত করুন।

## স্থানীয় বৈধতা

নির্ভরতা প্রস্তুত করার পর মালিকানাধীন ওয়ার্কট্রিতে পর্যবেক্ষক চালান। ভারী বৈধতার আগে [ওয়ার্কট্রি এবং রিসোর্স প্রোটোকল](WORKTREE_ISOLATION.md) ব্যবহার করুন।

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

দ্রুত প্রোফাইল আংশিক. সম্পূর্ণ প্রোফাইল তার মডেল করা প্রয়োজনীয়তা পরীক্ষা করে এবং কমান্ড রসিদ সংরক্ষণ করে; এটি প্রযোজ্য হোস্ট করা চেকের জন্য স্থাপনা বা বিকল্প প্রত্যয়িত করে না। প্রতিবেদনটি মেট্রিক ড্রিফ্ট থেকে এক্সিকিউশন ব্যর্থতাকে আলাদা করে। নির্বাচিত নীতি অনুযায়ী প্রয়োজনীয় র্যাচেট ব্লক করা থাকে। শুধুমাত্র একটি উত্তীর্ণ ফলাফল প্রাপ্ত করার জন্য একটি বেসলাইন বাড়াবেন না।

## রাত্রিকালীন এবং ম্যানুয়াল sweeps

রাতের রিলিজ এবং সামঞ্জস্য সমাধানকারীরা একটি ক্যানোনিকাল রিলিজ শাখা নির্বাচন করে। সেই নির্বাচনটি অবশ্যই সেই শাখার সাথে মেলে যেটি কর্মপ্রবাহকে ট্রিগার করেছে এবং স্যুটগুলি ইভেন্টের অপরিবর্তনীয় SHA ব্যবহার করে৷ ম্যানুয়াল সম্পাদনের জন্য, `RELEASE_BRANCH` তে উদ্দিষ্ট রিলিজটি নির্বাচন করুন এবং সেই একই রেফারে প্রেরণ করুন:

```bash
gh workflow run nightly-release-green.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
gh workflow run nightly-compat.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
```

নির্বাচিত কোড কার্যকর করার আগে ক্রস-শাখা প্রেরণ প্রত্যাখ্যান করা হয়। হোস্ট করা প্রধান স্যুট `main` চেকআউট করুন এবং যাচাই করুন যে এটির SHA এখনও ইনস্টলেশনের আগে সমাধান করা লক্ষ্যের সাথে মেলে। রেজোলিউশনের সময় প্রধান চালনা হলে, নতুন প্রতিশ্রুতিতে অসম্পূর্ণ সুইপ পুনরায় চালান। বিভিন্ন প্রার্থীর কাছ থেকে স্যুট রসিদ একত্রিত করবেন না।

## ব্যর্থতা triage এবং পুনরুদ্ধার

একটি ডায়গনিস্টিক সূচক হিসাবে ঘটনাটি ব্যবহার করুন, তারপর সঠিক রান, প্রচেষ্টা, ব্যর্থ পদক্ষেপ এবং আর্টিফ্যাক্ট পরিদর্শন করুন। একজন অবদানকারীকে ব্যর্থতার জন্য দায়ী করার আগে সমতুল্য ভিত্তি এবং প্রার্থীর প্রমাণ তুলনা করুন। অবকাঠামোগত ত্রুটি, উত্তরাধিকারসূত্রে প্রাপ্ত ত্রুটি, প্রার্থীর রিগ্রেশন এবং মুলতুবি অনুমোদনের জন্য বিভিন্ন প্রতিকারের প্রয়োজন।

`/green-prs`, `/sweep-reds`, `/validate-release-green` এবং `/babysit` দক্ষতা প্রমাণ সংগ্রহ করে এবং তাদের নথিভুক্ত সুযোগের অধীনে সমাধান প্রস্তুত করে। কন্ট্রিবিউটর ক্রেডিট রাখুন, বিচ্ছিন্ন মেরামতের শাখা ব্যবহার করুন এবং অনুমোদিত একত্রিত হওয়ার আগে সমস্ত প্রয়োজনীয় চেক যাচাই করুন। পাস করা বর্তমান প্রার্থীর জন্য কোনো স্বয়ংক্রিয় রিবেসলাইন বা ঘটনা বন্ধের বিকল্প নেই।
