# Self-Hosted Runner Box Operations (.113 pool) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

स्व-होस्टेड पूल **.113** मेसिन (`tomni-proxmox-113`) मा चल्छ। 2026-10-18 देखि प्रत्येक
OmniRoute रनरसँग **एउटा भूमिका**, एउटा लेबल, र त्यसको कार्यभारमा मापन गरिएको आवश्यकताअनुसारको मेमोरी/CPU बजेट
छ। Turbopack स्लटले बिल्डलाई आवश्यक पर्ने स्रोत पाउँछ; अन्य स्लटहरू तिनको
मापन गरिएका उच्चतम खपतअनुसार आकार निर्धारण गरिएका छन्। Turbopack बिल्ड, Release-Green
webpack बिल्ड र lint job एकै समयमा पर्दा मात्र मेसिनले क्षमताभन्दा बढी स्रोत प्रतिबद्ध गर्छ;
होस्ट swap (16 GB) ले त्यसलाई सम्हाल्छ, र pull-request का बिल्डहरू hosted मा चल्ने भएकाले
Turbopack स्लट अधिकांश समय निष्क्रिय रहन्छ:

| रनर                  | लेबल           | भूमिका                                                                                                                                             | `MemoryHigh` / `MemoryMax` | `CPUQuota`     |
| -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack बिल्डहरू: `ci.yml` `Build` (push/dispatch मात्र), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, रातिको a11y बिल्ड | 56 GB / 60 GB (swap 0)     | 1600 %         |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack बिल्ड                                                                                      | 20 GB / 24 GB (swap 4 GB)  | 800 %          |
| `omniroute-113-2`    | `omni-light`   | रातिका job हरू (Schemathesis, promptfoo, garak, k6) र `quality.yml` `lint-guard`                                                                   | 12 GB / 16 GB (swap 4 GB)  | 600 %          |
| `omniroute-113`      | `omni-light`   | माथिको जस्तै पूल                                                                                                                                   | 8 GB / 12 GB               | 400 %          |
| OmniHeuris, OmniMind | (तिनका repos)  | Dependabot मात्र (प्रत्येकको उच्चतम खपत 155 MB, 2026-10-18)                                                                                        | 4 GB / 6 GB                | प्रत्येक 200 % |

2026-10-18 मा मापन गरिएको:

| स्रोत     | मान                      | scheduling का लागि यसको अर्थ                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 कोर**       | सीमा नलगाइएको Turbopack production build को उच्चतम खपत 49 GB पुगेको थियो (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8 मा compile phase ले मात्र ~40 GB ओगट्छ (`next-build` मा 36 GB RSS र 3 GB का 17 loader workers, 2026-10-18 मा मापन गरिएको); webpack बिल्डले ~14–16 GB। एउटा Turbopack र एउटा webpack बिल्ड सँगै अटाउँछन्; दुईवटा Turbopack बिल्ड अटाउँदैनन् |
| swap      | 16 GB                    | `omniroute-113-5` swap बन्द (`MemorySwapMax=0`) गरेर चल्छ, त्यसैले नियन्त्रणबाहिर गएको बिल्डले पूरै मेसिनलाई swap गराउनुको सट्टा आफ्नो सीमामा पुगेपछि काटिन्छ                                                                                                                                                                                                                    |
| `/tmp`    | **12 GB tmpfs = RAM**    | त्यहाँ राखिएको कुनै पनि कुरा मेमोरीमै रहन्छ; बाँकी रहेका फाइलहरू 3 h पछि हटाइन्छन्                                                                                                                                                                                                                                                                                               |
| CPU       | 32 कोरमा load 60 देखिएको | quota हरू लागू गर्नुअघि, एउटै मेसिनमा एउटा Turbopack बिल्ड (~1166 % CPU) र coverage suite चल्दा अन्य listeners का heartbeats का लागि स्रोत पुगेको थिएन (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                     |
| रनरहरू    | **6 listeners**          | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` निष्क्रिय छन् (`systemctl enable --now` ले एउटालाई पुनः सक्रिय गर्छ)                                                                                                                                                                                                                                             |

सीमाहरू प्रत्येक unit को `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
मा छन् (अघिल्ला मानहरू `override.conf.bak-20261018` का रूपमा राखिएका छन्) र
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` मार्फत चलिरहेकै अवस्थामा लागू गरिएका थिए — restart गरिएन, त्यसैले
चलिरहेको कुनै पनि job प्रभावित भएन। लेबलहरू runners API मार्फत
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) परिवर्तन गरिन्छन्, त्यो पनि चलिरहेकै अवस्थामा।

## janitor स्थापना गर्नुहोस् (एक पटक, मेसिनमा)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): प्रत्येक 30 मिनेटमा, /var/log/runner-janitor.log मा लग गर्नुहोस्
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` आवश्यक छ: janitor ले कुनै पथ हटाउनुअघि खुला फाइलहरूको एउटा स्न्यापसटबाट त्यो निष्क्रिय रहेको प्रमाणित गर्छ, र यो उपकरण नभएमा यसले केही पनि हटाउँदैन र त्यसबारे जानकारी दिन्छ
(exit 1)। कुनै पनि परिवर्तनलाई पहिले `--dry-run` सँग प्रयास गर्नुहोस् — यसले आफूले के गर्ने थियो ठ्याक्कै प्रिन्ट गर्छ र कुनै कुरा छुँदैन।

यसले प्रत्येक पटक चल्दा गर्ने काम: **tmpfs मा 3 घण्टा** र डिस्कको
`_work/_temp` मा 24 घण्टापछि हाम्रै बाँकी रहेका फाइलहरू (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) सफा गर्छ; 75 मिनेटभन्दा पुरानो `next-build` समाप्त गर्छ (कुनै पनि job त्यति लामो चल्दैन — 2026-08-27 मा GitHub ले त्यसको job हराएको घोषणा गरिसकेपछि एउटा 70 मिनेटसम्म चलेको थियो); unit **रोकिएका** runner हरूका 48 घण्टा पुराना checkout हरू हटाउँछ; डिस्क ≥ 85 %, memory PSI
`full/avg60` ≥ 10 %, र listener हरूको सङ्ख्या `MAX_ACTIVE_RUNNERS` भन्दा बढी हुँदा (omniroute/other विवरणसहित) सतर्क गराउँछ। Exit 1 = ध्यान आवश्यक; लग पढ्नुहोस्।

75-मिनेटको नियमले GitHub ले पहिले नै त्यागिसकेको build समात्दैन। जब
`Runner.Listener` ले आफ्नो job नवीकरण गर्न सक्दैन, `_diag/Runner_*.log` मा
`POST request to …/renewjob timed out after 100 seconds` देखिन्छ, API ले अन्तिम सफल नवीकरणको करिब दस मिनेटपछि job लाई `completed`
(failure) भनी रिपोर्ट गर्छ, र कुनै job संलग्न नभए पनि `next-build` चलिरहन्छ
(2026-10-18: #17066 को Build 19:43 मा असफल भएको थियो र पाँच मिनेटपछि पनि त्यसको build ले
40 GB ओगटिरहेको थियो)। सबैभन्दा नयाँ `_diag/Worker_*.log` मा ref पुष्टि गर्नुहोस्, त्यसपछि
PID का आधारमा build tree लाई मात्र SIGTERM पठाउनुहोस् — `next-build`, `npm run build`, `build-next-isolated.mjs` र
`_work` worker हरू। `Runner.Listener`, `RunnerService.js` वा `Runner.Worker` लाई कहिल्यै नछुनुहोस्:
worker ले job रद्द भएको रिपोर्ट गर्छ र listener आफैं फेरि अनलाइन हुन्छ।

## Runner unit हरू: KillMode

Runner को पूर्वनिर्धारित `KillMode=process` ले unit रोकिँदा वा पुनः सुरु हुँदा
`Runner.Worker → npm → next-build` लाई चलिरहन दिन्छ — कुनै job संलग्न नभएको orphan build ले RAM र
CPU खाइरहन्छ। प्रत्येक OmniRoute unit मा
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
`KillMode=mixed` भएको drop-in हुन्छ: पहिले listener लाई SIGTERM, त्यसपछि
`TimeoutStop` मा सम्पूर्ण cgroup लाई SIGKILL। यो unit को अर्को restart मा लागू हुन्छ — निष्क्रियता जाँच र restart एउटै command मा राखेर, **एक पटकमा एउटा runner मात्र र निष्क्रिय हुँदा मात्र** restart गर्नुहोस्।

## सञ्चालन नियमहरू

- **एक पटकमा एउटा मात्र Turbopack बिल्ड — लेबलद्वारा लागू गरिएको।** पूर्ण Turbopack
  `next build` चलाउने प्रत्येक job ले `[self-hosted, omni-build]` लाई लक्षित गर्छ, र त्यो
  लेबल **`omniroute-113-5`** मा मात्र छ: `ci.yml` को `Build`, `npm-publish.yml` को `publish`, `nightly-v4-build`, `preview-artifact`,
  nightly a11y बिल्ड (#16853) र `docker-publish.yml` को **amd64** (BuildKit भित्र webpack —
  त्यहाँ Turbopack क्र्यास भएको थियो, run 33253576569)। arm64 Docker चरण `ubuntu-24.04-arm` मै रहन्छ।
  `docker-publish` को amd64 ले `ci.yml` को `Build` सँग `heavy-build-main` concurrency group
  साझा गर्छ (`cancel-in-progress: false`)। Docker Engine `omniroute-113-5` मा हुनैपर्छ। दोस्रो Turbopack
  स्लट 78 GB मा अट्दैन (2 × 33–37 GB र मेसिनका बाँकी प्रक्रियाहरू); दोस्रो स्लट webpack
  बिल्डहरूका लागि मात्र सुरक्षित हुन्छ।
- **Pull-request बिल्डहरू hosted मा चल्छन् (2026-10-18)।** `ci.yml` को `Build` ले
  `push` र `workflow_dispatch` का लागि मात्र `omni-build` प्रयोग गर्छ; प्रत्येक `pull_request` (आफ्नै origin वा fork)
  र `merge_group` बिल्ड webpack सहित `ubuntu-latest` मा चल्छ। आफ्नै origin का प्रत्येक PR लाई स्लटमा पठाउँदा,
  एउटा Turbopack बिल्डले त्यसलाई 29–58 मिनेटसम्म ओगट्थ्यो, 18 वटा बिल्ड 18 घण्टासम्म लाममा बसेका थिए,
  र release line को आफ्नै push बिल्डले 40 वटा job मा एक पटक मात्र स्लट पाएको थियो। Hosted मा उही PR बिल्डले,
  PR का अन्य job सँगसँगै चल्दा, 8–12 मिनेट लिन्छ। `npm-publish` ले पठाउने bundler Turbopack को परीक्षण
  release line मा default branch को nightly a11y बिल्ड (04:41 UTC), स्लटसम्म पुग्ने प्रत्येक push वा dispatch बिल्ड,
  र `npm-publish` आफैँद्वारा भइरहन्छ। `tests/unit/build/heavy-build-queue.test.ts`
  ले चार-सर्तीय gate लाई स्थिर गर्छ।
- **Turbopack स्लटलाई यसको मापन गरिएको आवश्यकताभन्दा कहिल्यै सानो नबनाउनुहोस्।** 2026-10-18 मा 18:06 बजे
  `omni-release` का लागि ठाउँ बनाउन स्लटलाई 56G/60G बाट 40G/44G मा घटाइएको थियो। compile चरण पूरै
  run भरि `MemoryHigh` मै रह्यो (memory PSI `full` 30–43 %), र उही cgroup साझा गर्ने
  `Runner.Listener` ले आफ्नो job नवीकरण गर्न सकेन। 2026-10-17 मा मालिकले सेट गरेको 56G/60G
  सोही दिन पुनर्स्थापित गरियो। त्यो मानभन्दा तल बिल्ड fail हुँदैन; यो thrash हुन्छ, र job हराउँछ।
- **Release-Green को आफ्नै स्लट छ (2026-10-18)।** त्यसअघि दुवै Release-Green validation
  `omni-build` मा चल्थे: प्रत्येक push मा (~10/hour, एक दिनमा 100 मध्ये 97 वटा push run कामकै बीचमा cancel भए)
  र दिनमा तीनवटा ~2 h का पूर्ण sweep मा (05:29 को sweep ले स्लटका लागि 6 h पर्खियो) — एकल build
  स्लटको क्षमताभन्दा कैयौँ गुणा बढी माग थियो र आफ्नै origin का PR बिल्डहरूले घण्टौँ पर्खन्थे।
  `release-green` र `main-green` ले अब `OMNIROUTE_USE_TURBOPACK=0` सहित
  `omni-release` (`omniroute-113-6` मात्र) लाई लक्षित गर्छन्, र सुरु भइसकेको run अब नयाँ push का कारण cancel हुँदैन
  (pending स्लटले अझै पनि एकैचोटि आउने अत्यधिक run हरूलाई समेट्छ)। `tests/unit/build/runner-capacity-routing.test.ts`
  ले routing, webpack switch र `omni-release` मा कुनै पनि बिल्ड Turbopack प्रयोग गरेर नबन्ने कुरा
  स्थिर गर्छ।
- **हलुका pool: `omni-light`।** `omniroute-113` र `omniroute-113-2` ले
  backend-only `next build` आवश्यक पर्ने nightly हरू (~5–6 GB; webpack) र `quality.yml` को `lint-guard` चलाउँछन्।
  `omniroute-113` मा 2026-10-18 सम्म `MemoryHigh=4G` थियो — promptfoo बिल्डले त्यहाँ 54 मिनेटसम्म
  memory reclaim गर्दै अघि बढ्नुपर्यो; 8 GB ले throttling हटाउँछ।
- **जानीजानी थोरै listener राखिएका छन्।** 2026-08-29 मा चारवटा OmniRoute unit अक्षम पारिएका थिए — प्रत्येक अतिरिक्त
  listener माथिको memory budget को अर्को tenant हो। सफाइ प्रक्रियाको अधिकतम सीमा 6 हो (`MAX_ACTIVE_RUNNERS=6` cron मा): यसले
  मेसिनमा भएका प्रत्येक `Runner.Listener` गन्छ, र OmniHeuris + OmniMind ले हाम्रा चारवटामा थप दुईवटा जोड्छन्।
- **कुनै पनि runner व्यस्त हुँदा `/tmp` वा `_work` लाई हातैले कहिल्यै सफा नगर्नुहोस्।**
  जाँच र मेटाइबीच अन्तर राखेर पहिले जाँच्ने अनि मेटाउने प्रक्रियाकै कारण 2026-08-27 मा चलिरहेको Build job ले आफ्नो
  `_work` गुमाएको थियो। सफाइ प्रक्रियाले जाँच र हटाउने काम एउटै चरणमा गर्छ;
  त्यसैलाई गर्न दिनुहोस्।
- job चलिरहेकै बेला runner रोक्दा job cancel हुन्छ (प्रत्यक्ष रूपमा देखिएको): यसको listener सँग
  `Runner.Worker` child नभएको अवस्थामा मात्र `systemctl stop` चलाउनुहोस् — र यो एउटै command मा गर्नुहोस्।
- Workflow हरूले artefact लाई `/tmp` मा राखेर छोड्नु हुँदैन (यो RAM हो)। तिनलाई
  `$RUNNER_TEMP` मा download गर्नुहोस् (डिस्कमा, प्रत्येक runner का लागि छुट्टै) — 1.3 GB को `next-build`
  artefact लाई tmpfs मा पुग्न 27–32 मिनेट लागेको थियो भने डिस्कबाट upload गर्न 2 मिनेट लागेको थियो।
- `.15` VPS अनुरूपता प्रमाणीकरणका लागि मात्र हो — यसले कहिल्यै CI runner चलाउँदैन।

## होस्टेड लेन (GitHub-होस्टेड रनरहरू)

खाता **Pro** योजनामा छ: **एकैपटक चल्ने 40 होस्टेड जबहरू**, जुन प्रत्येक PR जाँच,
प्रत्येक push-ट्रिगर गरिएको workflow र CodeQL को पूर्वनिर्धारित सेटअपद्वारा साझा गरिन्छ। 2026-10-18 मा
एउटा merge अभियानका क्रममा मापन गर्दा (`release/v3.8.52` मा ~10 merges/hour): **24 h मा
2,500 workflow रनहरू सिर्जना भए**, 6 h मा शाखामा 44 वटा push भए, र PR जाँचहरू
घण्टौँसम्म पर्खिरहँदा तथा तिनबिनै PR हरू merge गरिँदा **106 होस्टेड जबहरू queue मा थिए**।
शाखामा हुने प्रत्येक push मा नौवटा workflow ट्रिगर भए:

| `release/v*` मा प्रत्येक push का लागि       | होस्टेड जबहरू | चापको समयमा परिणाम                                                     | 2026-10-18 देखि                                                                        |
| ------------------------------------------- | ------------: | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ci.yml` (पूर्ण matrix)                     |     अधिकतम 30 | अर्को push द्वारा रद्द, एक दिनमा 24 मध्ये 24                           | `release/**` push मा सुरु हुँदैन (PR रन + Release-Green)                               |
| `quality.yml`                               |            ~6 | रद्द, 23 मध्ये 23                                                      | `release/**` push मा सुरु हुँदैन                                                       |
| `Release-Green` `--quick`                   |             0 | `omni-build` मा चल्यो, 100 मध्ये 97 रद्द                               | `omni-release` स्लट, कहिल्यै रद्द हुँदैन, पेन्डिङ रनहरू एकमा समेटिन्छन्                |
| `Lock released branch`, `OpenSSF Scorecard` |             2 | प्रत्येक push का लागि एउटा queued रन                                   | प्रत्येक ref मा एउटा रन (`tests/unit/build/hosted-lane-concurrency.test.ts`)           |
| `Release acceptance` (shadow रिपोर्ट)       |             1 | प्रत्येक push मा एउटा होस्टेड `npm ci`, कहिल्यै रद्द भएन               | अपरिवर्तित — `paths:` फिल्टरका लागि सम्भावित उम्मेदवार                                 |
| `Publish to Docker Hub` → `Deploy to VPS`   |             2 | प्रत्येक push मा रद्द; amd64 leg ले `omni-build` मा प्रतिस्पर्धा गर्छ  | अपरिवर्तित — मालिकको deploy च्यानल                                                     |
| CodeQL पूर्वनिर्धारित सेटअप (`dynamic`)     |             4 | प्रत्येक push मा `javascript-typescript`, `actions`, `c-cpp`, `python` | अपरिवर्तित — Settings → Code security; `c-cpp`/`python` ले यहाँ केही पनि scan गर्दैनन् |

`tests/unit/build/push-storm-diet.test.ts` ले `ci.yml` र
`quality.yml` को `main`-मात्र push ट्रिगरलाई स्थिर गर्छ। यसको अतिरिक्त प्रभाव: अब प्रत्येक release push मा Codecov ले
base upload प्राप्त गर्दैन (यो चरण सूचनामूलक छ र `continue-on-error` छ); repository भित्रको coverage gate र PR comment
अप्रभावित छन्।

**थप self-hosted क्षमताले hosted queue को समस्या समाधान गर्दैन।** devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) ले एउटा runner होस्ट गर्न सक्थ्यो, तर agent session हरूले पहिल्यै
यसको load 20–26 मा राख्छन्, agent container मा Docker daemon छैन, र saturated lane
होस्टेड lane नै हो। त्यही समयमा `.113` box मा 71 GB खाली थियो र load 5–8 थियो; यसको सीमा
माथिको प्रति-listener memory budget हो (अधिकतम 6 listener), CPU होइन। बाँकी उपायहरू
प्रक्रियासम्बन्धी हुन्: अभियानका PR हरूलाई Mergify queue मार्फत land गर्ने (`label=queue`, batch हरूले
प्रत्येक PR का लागि एउटा रन र प्रत्येक push का लागि अर्को रन चलाउनुको सट्टा एउटै `merge_group` CI रन साझा गर्छन्), CodeQL
पूर्वनिर्धारित सेटअपका language हरू घटाउने, र `release-acceptance.yml` ले पढ्ने file हरूअनुसार त्यसलाई filter गर्ने।
