# Self-Hosted Runner Box Operations (.113 pool) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

স্ব-হোস্টেড পুল উপর সঞ্চালিত হয়**.113** বক্স (`tomni-proxmox-113`)। 2026-10-18 থেকে প্রতিটি OmniRoute রানার আছে**একটি ভূমিকা** , একটি লেবেল, এবং একটি memory/CPU বাজেট তার কাজের চাপ পরিমাপ করা হয়েছে। Turbopack স্লট বিল্ডের যা প্রয়োজন তা পায়; অন্যান্য স্লট তাদের পরিমাপ শিখর মাপ করা হয়. একটি Turbopack বিল্ড যখন একটি রিলিজ-গ্রিন ওয়েবপ্যাক বিল্ড এবং একটি লিন্ট কাজের সাথে মিলে যায় তখনই বক্সটি ওভারকমিট করে; হোস্ট সোয়াপ (16 GB) এটি শোষণ করে, এবং যেহেতু পুল-অনুরোধ বিল্ডগুলি হোস্ট করা হয়, তাই Turbopack স্লট বেশিরভাগ সময় নিষ্ক্রিয় থাকে:

| রানার                | লেবেল                           | ভূমিকা                                                                                                                                               | `MemoryHigh` / `MemoryMax` | `CPUQuota`   |
| -------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Turbopack বিল্ড: `ci.yml` `Build` ( শুধুমাত্র push/dispatch ), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, রাতের a11y বিল্ড | 56 GB / 60 GB (সোয়াপ 0)   | 1600 %       |
| `omniroute-113-6`    | `omni-release`                  | রিলিজ-সবুজ (`release-green` + `main-green`), ওয়েবপ্যাক তৈরি                                                                                         | 20 GB / 24 GB (swap 4 GB)  | 800 %        |
| `omniroute-113-2`    | `omni-light`                    | নাইটলিস (স্কিম্যাথিসিস, প্রম্পটফু, গারাক, কে6) এবং `quality.yml` `lint-guard`                                                                        | 12 GB / 16 GB (swap 4 GB)  | 600 %        |
| `omniroute-113`      | `omni-light`                    | উপরের মত একই পুল                                                                                                                                     | 8 GB / 12 GB               | 400 %        |
| OmniHeuris, OmniMind | (তাদের রিপোজ)                   | শুধুমাত্র ডিপেন্ডাবট (পিক 155 MB প্রতিটি, 2026-10-18)                                                                                                | 4 GB / 6 GB                | 200% প্রতিটি |

পরিমাপ 2026-10-18:

| সম্পদ     | মান                                  | সময়সূচীর জন্য এর মানে কি                                                                                                                                                                                                                                                                                                                       |
| --------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 কোর**                   | একটি Turbopack প্রোডাকশন বিল্ড 49 GB আনক্যাপড (`tests/unit/ci-build-bundler-webpack.test.ts`); আগামী 16.3.8-এ একা কম্পাইল ফেজ ~ 40 GB ( `next-build` এ 36 GB RSS প্লাস 3 GB তে 17 লোডার কর্মী, 2026-10-18 পরিমাপ করা হয়েছে); ~ 14–16 GB এ একটি ওয়েবপ্যাক তৈরি। একটি Turbopack + একটি ওয়েবপ্যাক বিল্ড একসাথে ফিট; দুটি Turbopack বিল্ড করে না |
| অদলবদল    | 16 GB                                | `omniroute-113-5` সোয়াপ অফ (`MemorySwapMax=0`) দিয়ে চলে তাই বাক্স অদলবদল করার পরিবর্তে একটি পলাতক বিল্ড তার ক্যাপে কাটা হয়                                                                                                                                                                                                                   |
| `/tmp`    | **12 GB tmpfs = RAM**                | সেখানে পার্ক করা কিছু স্মৃতি আছে; অবশিষ্টাংশ 3 ঘন্টা পরে ঝাড়া হয়                                                                                                                                                                                                                                                                              |
| CPU       | 32 কোরে লোড 60 পর্যবেক্ষণ করা হয়েছে | কোটার আগে, একটি Turbopack বিল্ড (~ 1166 % CPU) এবং একই বাক্সে একটি কভারেজ স্যুট অন্যান্য শ্রোতাদের হৃদস্পন্দনকে ক্ষুধার্ত করে (`The self-hosted runner lost communication`, #16853)                                                                                                                                                             |
| দৌড়বিদ   | **7 জন শ্রোতা** (2026-10-28)         | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` এছাড়াও `omni-build-60gb` বহন করে; `omniroute-113-3/-4/-8` রেপো থেকে মুছে ফেলা হয়েছে (2026-10-28)                                                                                                                                                                                       |

সীমাগুলি প্রতিটি ইউনিটের `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` তে থাকে (আগের মানগুলি `override.conf.bak-20261018` হিসাবে রাখা হয়েছিল) এবং `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — পুনরায় আরম্ভ না করে লাইভ প্রয়োগ করা হয়েছিল, তাই কোনও চলমান কাজ স্পর্শ করা হয়নি। লেবেল রানার API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) মাধ্যমে পরিবর্তন করা হয়, এছাড়াও লাইভ.

## দারোয়ান ইনস্টল করুন (একবার, বাক্সে)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` প্রয়োজন: দারোয়ান প্রমাণ করে যে একটি পথ নিষ্ক্রিয় আছে একটি খোলা ফাইলের একটি স্ন্যাপশট অপসারণের আগে, এবং টুল ছাড়া এটি কিছুই সরায় না এবং তাই বলে (প্রস্থান 1)। `--dry-run` প্রথম — সাথে যেকোন পরিবর্তন করে দেখুন এটি ঠিক কি প্রিন্ট করবে এবং কিছুই স্পর্শ করবে না।

এটি প্রতি রানে কী করে: আমাদের নিজেদের অবশিষ্টাংশ (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) পরে**3 ঘন্টা tmpfs** এবং `_work/_temp` ডিস্কে 24 ঘন্টা; 75 মিনিটের বেশি পুরানো `next-build` এ সতর্কতা এবং এটি চালু রাখে; prunes 48 ঘন্টা পুরানো চেকআউট রানার্স যার ইউনিট হয়**থামানো** ; ডিস্কে সতর্কতা ≥ 85%, মেমরি PSI `full/avg60` ≥ 10%, এবং `MAX_ACTIVE_RUNNERS` থেকে বেশি শ্রোতা (একটি omniroute/other ব্রেকডাউন সহ)। প্রস্থান করুন 1 = মনোযোগ প্রয়োজন; লগ পড়ুন।

একা অতিবাহিত সময় প্রমাণ করে না যে একটি প্রক্রিয়া এতিম। দারোয়ান কখনই বয়সের উপর ভিত্তি করে সংকেত পাঠায় না। বিদ্যমান `ZOMBIE_BUILD_MAX_MIN` এবং `ZOMBIE_BUILD_COMM` পরিবেশের নাম ক্রন কনফিগারেশনের জন্য সমর্থিত থাকে। সন্দেহভাজন অনাথকে পরিষ্কার করার আগে, নিশ্চিত করুন যে এটির সঠিক GitHub কাজ টার্মিনাল এবং সেই কাজের সাথে সম্পর্কিত প্রক্রিয়াগুলি চিহ্নিত করুন। যখন `Runner.Listener` তার কাজ পুনর্নবীকরণ করতে পারে না, `_diag/Runner_*.log` `POST request to …/renewjob timed out after 100 seconds` দেখায়, API শেষ সফল পুনর্নবীকরণের প্রায় দশ মিনিট পরে জব `completed` (ব্যর্থতা) রিপোর্ট করে এবং `next-build` কোন কাজ সংযুক্ত না করে চলতে থাকে (2026-10-18: #17066 এর বিল্ডটি 19:43-এ ব্যর্থ হয়েছিল এবং এর বিল্ডটি GB পাঁচ মিনিট পরেও আটকে ছিল)। নতুন `_diag/Worker_*.log` এ রেফটি নিশ্চিত করুন, তারপর SIGTERM শুধুমাত্র PID — `next-build`, `npm run build`, `build-next-isolated.mjs` এবং `_work` কর্মীদের দ্বারা বিল্ড ট্রি। কখনও `Runner.Listener`, `RunnerService.js` বা `Runner.Worker` স্পর্শ করবেন না: কর্মী কাজটি বাতিল বলে রিপোর্ট করে এবং শ্রোতা নিজেই অনলাইনে ফিরে যায়।

## Runner unit: KillMode

Runner-এর ডিফল্ট `KillMode=process` কোনো unit stop বা restart করা হলে
`Runner.Worker → npm → next-build` চালু রেখে দেয় — কোনো job সংযুক্ত না থাকা অবস্থায়
একটি orphan build RAM এবং CPU ব্যবহার করতে থাকে। প্রতিটি OmniRoute unit-এ
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
পাথে `KillMode=mixed`-সহ একটি drop-in রয়েছে: প্রথমে listener-কে SIGTERM পাঠায়,
এরপর `TimeoutStop`-এ পুরো cgroup-কে SIGKILL পাঠায়। এটি unit-এর পরবর্তী restart-এ
কার্যকর হয় — **একবারে একটি runner, এবং শুধু সেটি idle থাকলেই** restart করুন; idle
check এবং restart একই command-এ রাখুন।

## পরিচালনার নিয়মাবলি

- **একবারে একটি Turbopack build — label দ্বারা বলবৎ।** পূর্ণ Turbopack
  `next build` চালানো প্রতিটি job `[self-hosted, omni-build, omni-build-60gb]`-কে target করে, এবং কেবল **`omniroute-113-5`**-এরই ওই
  label রয়েছে: `ci.yml`-এর `Build`, `npm-publish.yml`-এর `publish`, `nightly-v4-build`, `preview-artifact`,
  nightly a11y build (#16853) এবং `docker-publish.yml`-এর **amd64** (BuildKit-এর ভেতরে webpack —
  সেখানে Turbopack panic করেছিল, run 33253576569)। arm64 Docker leg-টি `ubuntu-24.04-arm`-এই থাকে।
  `docker-publish`-এর amd64, `ci.yml`-এর `Build`-এর সঙ্গে `heavy-build-main` concurrency group
  ভাগ করে (`cancel-in-progress: false`)। Docker Engine অবশ্যই `omniroute-113-5`-এ থাকতে হবে। দ্বিতীয় Turbopack
  slot 78 GB-তে আঁটে না (2 × 33–37 GB এবং box-এর বাকি অংশ); দ্বিতীয় slot কেবল
  webpack build-এর জন্যই নিরাপদ।
- **Pull-request Build-গুলো hosted-এ চলে (2026-10-18)।** `ci.yml`-এর `Build` কেবল
  `push` এবং `workflow_dispatch`-এর জন্য `omni-build`-এ পৌঁছায়; প্রতিটি `pull_request` (নিজস্ব origin বা fork) এবং `merge_group` Build
  webpack-সহ `ubuntu-latest`-এ চলে। প্রতিটি নিজস্ব-origin PR slot-এ route করায়, একটি Turbopack
  Build সেটি 29–58 min ধরে রাখত, 18টি Build সর্বোচ্চ 18 h পর্যন্ত queue-তে ছিল, এবং release line-এর নিজস্ব push Build
  40টি job-এর মধ্যে একবার slot পেয়েছিল। Hosted-এ একই PR Build, PR-এর অন্যান্য
  job-এর পাশাপাশি 8–12 min সময় নেয়। `npm-publish` যে bundler ship করে, সেই Turbopack release line-এ নিয়মিত ব্যবহৃত থাকে
  default branch-এর nightly a11y build (04:41 UTC), slot-এ পৌঁছানো প্রতিটি push বা dispatch Build,
  এবং `npm-publish` নিজেই চালানোর মাধ্যমে। `tests/unit/build/heavy-build-queue.test.ts`
  চার-clause gate-টিকে স্থির রাখে।
- **Turbopack slot-কে কখনোই তার পরিমাপ করা প্রয়োজনের চেয়ে ছোট করবেন না।** 2026-10-18 তারিখে 18:06-এ
  `omni-release`-এর জন্য জায়গা করতে slot-টি 56G/60G থেকে 40G/44G-তে নামানো হয়েছিল। compile phase পুরো
  run জুড়ে `MemoryHigh`-এ আটকে ছিল (memory PSI `full` 30–43 %), এবং একই cgroup ভাগ করা
  `Runner.Listener` তার job renew করতে পারেনি। 2026-10-17-এর মালিকের নির্ধারিত 56G/60G একই
  দিনে পুনরুদ্ধার করা হয়। ওই মানের নিচে build ব্যর্থ হয় না; এটি thrash করে, এবং job-টি হারিয়ে যায়।
- **Release-Green-এর নিজস্ব slot রয়েছে (2026-10-18)।** তার আগে Release-Green-এর উভয় validation
  `omni-build`-এ চলত: প্রতিটি push-এ (~10/hour, এক দিনে 100টি push run-এর মধ্যে 97টি কাজের মাঝপথে cancel হয়েছিল)
  এবং দিনে তিনটি ~2 h পূর্ণ sweep-এ (05:29-এর sweep slot-এর জন্য 6 h অপেক্ষা করেছিল) — একমাত্র build
  slot-এর ধারণক্ষমতার তুলনায় চাহিদা কয়েক গুণ বেশি ছিল এবং নিজস্ব-origin PR Build-গুলোকে ঘণ্টার পর ঘণ্টা অপেক্ষা করতে হতো।
  `release-green` এবং `main-green` এখন `OMNIROUTE_USE_TURBOPACK=0`-সহ
  `omni-release`-কে target করে (শুধু `omniroute-113-6`), এবং শুরু হয়ে যাওয়া run আর নতুন push-এর কারণে cancel হয় না (
  pending slot এখনও অতিরিক্ত run-এর ঝড়কে সংকুচিত করে)। `tests/unit/build/runner-capacity-routing.test.ts`
  routing, webpack switch এবং `omni-release`-এর কোনো কিছুই Turbopack দিয়ে build না হওয়ার শর্ত স্থির রাখে।
- **হালকা pool: `omni-light`।** `omniroute-113` এবং `omniroute-113-2` সেই nightlies চালায়, যেগুলোর
  শুধু backend-এর জন্য `next build` (~5–6 GB; webpack) এবং `quality.yml`-এর `lint-guard` প্রয়োজন। `omniroute-113`-এ
  2026-10-18 পর্যন্ত `MemoryHigh=4G` ছিল — সেখানে promptfoo build memory reclaim করতে করতে 54 minutes
  পার করেছিল; 8 GB throttling দূর করে।
- **ইচ্ছাকৃতভাবেই listener কম রাখা হয়েছে।** 2026-08-29-এ চারটি OmniRoute unit disable করা হয়েছিল — প্রতিটি অতিরিক্ত
  listener উপরের memory budget-এর আরেকজন tenant। janitor ceiling হলো 8 (cron-এ `MAX_ACTIVE_RUNNERS=8`): এটি box-এর
  প্রতিটি `Runner.Listener` গণনা করে, এবং আমাদের পাঁচটির সঙ্গে OmniHeuris + OmniMind আরও দুটি যোগ করে।
- **Unit ও Vitest job হোস্টেডেই থাকে।** `ci.yml` তার unit shard ও Vitest job-কে `[self-hosted, omni-ci]`-এ পাঠায় কেবল তখনই, যখন repository variable `vars.USE_VPS_TEST_RUNNER` হয় `true`, এবং তখনও কেবল একই repository-র `pull_request` run-এর জন্য; fork, `merge_group` ও push `ubuntu-latest`-এই থাকে (`tests/unit/vps-runner-variable-scope.test.ts`)। variable-টি এখন `false`। 2026-10-28-এ তিনটি 4-core `omni-ci` listener-এর `npm ci`-তে 250–270 s লেগেছিল এবং প্রতিটি unit shard 30 মিনিটের job সীমায় পৌঁছে গিয়েছিল, যেখানে একটি হোস্টেড shard-এ লাগে ~634 s; তখন box-এর load ছিল 17–24। listener-গুলো মুছে ফেলা হয়েছে। unit shard-এর উপযোগী আকারের listener ছাড়া variable-টি আবার চালু করবেন না।
- **কোনো runner ব্যস্ত থাকা অবস্থায় কখনোই হাতে `/tmp` বা `_work` পরিষ্কার করবেন না।**
  check ও delete-এর মাঝখানে বিরতিসহ check-then-delete করার কারণেই 2026-08-27-এ চলমান একটি Build job তার
  `_work` হারিয়েছিল। janitor একই step-এ check এবং removal করে;
  কাজটি তাকেই করতে দিন।
- কোনো runner-কে job-এর মাঝখানে থামালে job-টি cancel হয় (সরাসরি পর্যবেক্ষিত): কেবল
  তার listener-এর কোনো `Runner.Worker` child না থাকলেই `systemctl stop` চালান — এবং এটি একটিমাত্র command-এ করুন।
- Workflow-গুলো অবশ্যই `/tmp`-তে artefact জমা করে রাখবে না (এটি RAM)। Download করুন
  `$RUNNER_TEMP`-এ (disk-এ, runner-প্রতি আলাদা) — 1.3 GB-এর `next-build` artefact-টি tmpfs-এ নামতে 27–32
  minutes নিয়েছিল, আর disk থেকে upload করতে 2 minutes লেগেছিল।
- `.15` VPS শুধু homologation-এর জন্য — সেখানে কখনোই CI runner চলে না।

## হোস্টেড লেন (GitHub-হোস্টেড রানার)

repository-টি `cheaper-inference` organization-এর অন্তর্গত, **Team** প্ল্যানে: **60টি সমসাময়িক হোস্টেড জব**, যা organization-এর প্রতিটি repository, প্রতিটি PR চেক, প্রতিটি push-ট্রিগারড workflow এবং CodeQL-এর ডিফল্ট সেটআপের মধ্যে ভাগ করা হয়। নিচের পরিসংখ্যানগুলো **Pro** প্ল্যানে (40টি সমসাময়িক হোস্টেড জব) পরিমাপ করা হয়েছিল। 2026-10-18 তারিখে
একটি merge campaign চলাকালে (`release/v3.8.52`-এ ঘণ্টায় ~10টি merge) পরিমাপ করা হয়েছে: **24 ঘণ্টায়
2,500টি workflow run তৈরি হয়েছে**, 6 ঘণ্টায় branch-টিতে 44টি push হয়েছে, এবং PR চেকগুলো
ঘণ্টার পর ঘণ্টা অপেক্ষা করার সময় **106টি হোস্টেড জব queued ছিল** ও সেগুলো ছাড়াই PR merge করা হয়েছিল।
branch-টিতে প্রতিটি push-এর সময় নয়টি workflow চালু হতো:

| `release/v*`-এ প্রতি push                   |  হোস্টেড জব | চাপের সময় ফলাফল                                                   | 2026-10-18 থেকে                                                                 |
| ------------------------------------------- | ----------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `ci.yml` (সম্পূর্ণ matrix)                  | সর্বোচ্চ 30 | পরবর্তী push-এ বাতিল, এক দিনে 24টির মধ্যে 24টিই                    | `release/**` push-এ শুরু হয় না (PR run + Release-Green)                        |
| `quality.yml`                               |          ~6 | বাতিল, 23টির মধ্যে 23টিই                                           | `release/**` push-এ শুরু হয় না                                                 |
| `Release-Green` `--quick`                   |           0 | `omni-build`-এ চলেছে, 100টির মধ্যে 97টি বাতিল                      | `omni-release` slot, কখনো বাতিল হয় না, pending run একত্রিত হয়                 |
| `Lock released branch`, `OpenSSF Scorecard` |           2 | প্রতি push-এ একটি queued run                                       | প্রতি ref-এ একটি run (`tests/unit/build/hosted-lane-concurrency.test.ts`)       |
| `Release acceptance` (shadow report)        |           1 | প্রতি push-এ একটি হোস্টেড `npm ci`, কখনো বাতিল হয় না              | অপরিবর্তিত — একটি `paths:` filter-এর উপযুক্ত প্রার্থী                           |
| `Publish to Docker Hub` → `Deploy to VPS`   |           2 | প্রতি push-এ বাতিল; amd64 leg `omni-build`-এ প্রতিযোগিতা করে       | অপরিবর্তিত — মালিকের deploy channel                                             |
| CodeQL ডিফল্ট সেটআপ (`dynamic`)             |           4 | প্রতি push-এ `javascript-typescript`, `actions`, `c-cpp`, `python` | অপরিবর্তিত — Settings → Code security; `c-cpp`/`python` এখানে কিছুই scan করে না |

`tests/unit/build/push-storm-diet.test.ts`, `ci.yml` এবং `quality.yml`-এর শুধু-`main`
push trigger স্থিরভাবে নিশ্চিত করে। পার্শ্বপ্রতিক্রিয়া: Codecov আর প্রতি release push-এ base upload
পায় না (ধাপটি কেবল তথ্যমূলক এবং `continue-on-error`); repository-এর অভ্যন্তরীণ coverage gate এবং
PR comment প্রভাবিত হয় না।

**আরও self-hosted capacity হোস্টেড queue-এর সমস্যার সমাধান করে না।** devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB)-এ একটি runner হোস্ট করা সম্ভব, কিন্তু agent session-গুলো
ইতিমধ্যেই এর load 20–26-এ রাখে, agent container-এ কোনো Docker daemon নেই, এবং যে লেনটি
পূর্ণ ক্ষমতায় চলছে সেটি হলো হোস্টেড লেন। একই সময়ে `.113` box-এ 71 GB খালি জায়গা ছিল এবং
load ছিল 5–8; এর সীমাবদ্ধতা CPU নয়, বরং উপরের প্রতি-listener memory budget (সর্বোচ্চ 6টি listener)।
বাকি করণীয়গুলো প্রক্রিয়াভিত্তিক: Mergify queue-এর মাধ্যমে campaign PR merge করুন
(`label=queue`, batch-গুলো প্রতি PR-এ একটি run এবং প্রতি push-এ আরেকটি run-এর পরিবর্তে একটি
`merge_group` CI run ভাগ করে নেয়), CodeQL ডিফল্ট-সেটআপের language-গুলো কমিয়ে দিন, এবং
`release-acceptance.yml` যে file-গুলো পড়ে সেগুলোর ভিত্তিতে এটিকে filter করুন।
