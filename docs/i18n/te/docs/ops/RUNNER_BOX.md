# Self-Hosted Runner Box Operations (.113 pool) (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

స్వీయ-హోస్టెడ్ పూల్ **.113** బాక్స్పై (`tomni-proxmox-113`) నడుస్తుంది. 2026-10-18 నుంచి ప్రతి
OmniRoute runnerకు **ఒక పాత్ర**, ఒక label, అలాగే దాని workloadలో కొలిచిన వినియోగానికి తగిన memory/CPU బడ్జెట్
ఉన్నాయి. Turbopack slotకు buildకు అవసరమైన వనరులు లభిస్తాయి; ఇతర slotల పరిమాణాలు వాటి
కొలిచిన గరిష్ఠ వినియోగాలకు అనుగుణంగా ఉంటాయి. Turbopack build, Release-Green
webpack build, lint job ఒకేసారి జరిగినప్పుడు మాత్రమే బాక్స్ overcommit అవుతుంది; host swap (16 GB) దానిని తట్టుకుంటుంది, అలాగే pull-request Builds
హోస్టెడ్ runnerలపై నడుస్తాయి కాబట్టి Turbopack slot ఎక్కువ సమయం idleగా ఉంటుంది:

| runner               | label          | పాత్ర                                                                                                                                               | `MemoryHigh` / `MemoryMax` | `CPUQuota`        |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack builds: `ci.yml` `Build` (push/dispatch మాత్రమే), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, nightly a11y build | 56 GB / 60 GB (swap 0)     | 1600 %            |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack build                                                                                       | 20 GB / 24 GB (swap 4 GB)  | 800 %             |
| `omniroute-113-2`    | `omni-light`   | nightlies (Schemathesis, promptfoo, garak, k6) మరియు `quality.yml` `lint-guard`                                                                     | 12 GB / 16 GB (swap 4 GB)  | 600 %             |
| `omniroute-113`      | `omni-light`   | పైన పేర్కొన్న అదే పూల్                                                                                                                              | 8 GB / 12 GB               | 400 %             |
| OmniHeuris, OmniMind | (వాటి repos)   | Dependabot మాత్రమే (ఒక్కోదానికి గరిష్ఠంగా 155 MB, 2026-10-18)                                                                                       | 4 GB / 6 GB                | ఒక్కోదానికి 200 % |

2026-10-18న కొలిచినవి:

| వనరు      | విలువ                           | schedulingకు దీని అర్థం                                                                                                                                                                                                                                                                                                                                                               |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 cores**            | పరిమితి విధించని Turbopack production build గరిష్ఠంగా 49 GBకి చేరుకుంది (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8లో compile phase ఒక్కటే ~40 GBను నిలుపుకుంటుంది (`next-build`లో 36 GB RSSతో పాటు 3 GB చొప్పున 17 loader workers, 2026-10-18న కొలిచినవి); webpack build ~14–16 GB. ఒక Turbopack + ఒక webpack build కలిపి సరిపోతాయి; రెండు Turbopack builds సరిపోవు |
| swap      | 16 GB                           | `omniroute-113-5` swap నిలిపివేసి (`MemorySwapMax=0`) నడుస్తుంది, కాబట్టి నియంత్రణ తప్పిన build బాక్స్ను swap చేయించే బదులు దాని పరిమితి వద్ద నిలిపివేయబడుతుంది                                                                                                                                                                                                                       |
| `/tmp`    | **12 GB tmpfs = RAM**           | అక్కడ ఉంచిన ప్రతిదీ memoryని ఉపయోగిస్తుంది; మిగిలిపోయినవి 3 గంటల తర్వాత తొలగించబడతాయి                                                                                                                                                                                                                                                                                                 |
| CPU       | 32 coresపై load 60 గమనించబడింది | quotas అమలు చేయడానికి ముందు, ఒక Turbopack build (~1166 % CPU)తో పాటు అదే బాక్స్పై coverage suite నడవడం వల్ల ఇతర listeners heartbeatలకు వనరులు అందలేదు (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                           |
| runners   | **6 listeners**                 | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` నిలిపివేయబడ్డాయి (`systemctl enable --now` వాటిలో ఒకదాన్ని తిరిగి ప్రారంభిస్తుంది)                                                                                                                                                                                                                                    |

పరిమితులు ప్రతి unitకు చెందిన `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`లో ఉన్నాయి
(మునుపటి విలువలు `override.conf.bak-20261018`గా ఉంచబడ్డాయి), అలాగే అవి
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…`తో ప్రత్యక్షంగా వర్తింపజేయబడ్డాయి — restart చేయలేదు, కాబట్టి
నడుస్తున్న ఏ jobకూ అంతరాయం కలగలేదు. Labelsను runners API ద్వారా
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) ప్రత్యక్షంగానే మార్చారు.

## జానిటర్ను ఇన్స్టాల్ చేయండి (ఒక్కసారి మాత్రమే, మెషీన్పై)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): ప్రతి 30 నిమిషాలకు, /var/log/runner-janitor.logలో లాగ్ చేయండి
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` అవసరం: ఏదైనా పాత్ను తొలగించే ముందు, తెరిచి ఉన్న ఫైళ్ల యొక్క ఒక స్నాప్షాట్తో అది నిష్క్రియంగా ఉందని జానిటర్ నిర్ధారిస్తుంది; ఈ సాధనం లేకపోతే అది ఏదీ తొలగించదు మరియు ఆ విషయాన్ని తెలియజేస్తుంది
(exit 1). ఏ మార్పునైనా ముందుగా `--dry-run`తో ప్రయత్నించండి — అది ఏం చేయబోతుందో సరిగ్గా ప్రింట్ చేస్తుంది
మరియు దేనినీ తాకదు.

ప్రతి రన్లో ఇది చేసేది: **tmpfsపై 3 గంటల** తర్వాత మరియు డిస్క్లోని
`_work/_temp`పై 24 గంటల తర్వాత మన స్వంత అవశేషాలను (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) తొలగిస్తుంది; 75 నిమిషాల కంటే పాతదైన `next-build`ను నిలిపివేస్తుంది (ఏ జాబ్ కూడా అంతసేపు నడవదు —
2026-08-27న GitHub దాని జాబ్ను కోల్పోయినట్లు ప్రకటించిన తర్వాత కూడా ఒకటి 70 నిమిషాలు నడిచింది); యూనిట్ **ఆగిపోయిన** రన్నర్లకు చెందిన 48 గంటల కంటే పాత
చెక్అవుట్లను తొలగిస్తుంది; డిస్క్ ≥ 85 %, మెమరీ PSI
`full/avg60` ≥ 10 %, మరియు `MAX_ACTIVE_RUNNERS` కంటే ఎక్కువ లిసనర్లు ఉన్నప్పుడు హెచ్చరిస్తుంది (omniroute/ఇతర విభజనతో). Exit 1 = శ్రద్ధ అవసరం; లాగ్ను చదవండి.

GitHub ఇప్పటికే వదిలేసిన జాబ్కు చెందిన బిల్డ్ను 75-నిమిషాల నియమం గుర్తించదు.
`Runner.Listener` తన జాబ్ను పునరుద్ధరించలేనప్పుడు, `_diag/Runner_*.log`లో
`POST request to …/renewjob timed out after 100 seconds` కనిపిస్తుంది; చివరిసారిగా విజయవంతంగా పునరుద్ధరించిన దాదాపు పది నిమిషాల తర్వాత API జాబ్ను `completed`
(failure)గా నివేదిస్తుంది, అలాగే ఏ జాబ్ జోడించబడకుండానే `next-build` నడుస్తూనే ఉంటుంది
(2026-10-18: #17066 బిల్డ్ 19:43కు విఫలమైనట్లు గుర్తించబడింది, అయినప్పటికీ దాని బిల్డ్ ఐదు నిమిషాల తర్వాత కూడా
40 GBని ఆక్రమించి ఉంది). అత్యంత కొత్త `_diag/Worker_*.log`లో refను నిర్ధారించి, ఆపై
PID ఆధారంగా బిల్డ్ ట్రీని మాత్రమే SIGTERM చేయండి — `next-build`, `npm run build`, `build-next-isolated.mjs` మరియు
`_work` వర్కర్లు. `Runner.Listener`, `RunnerService.js` లేదా `Runner.Worker`ను ఎన్నడూ తాకవద్దు:
వర్కర్ జాబ్ రద్దయినట్లు నివేదిస్తుంది మరియు లిసనర్ స్వయంగా మళ్లీ ఆన్లైన్లోకి వస్తుంది.

## రన్నర్ యూనిట్లు: KillMode

రన్నర్ డిఫాల్ట్ `KillMode=process`, యూనిట్ ఆపబడినప్పుడు లేదా పునఃప్రారంభించబడినప్పుడు `Runner.Worker → npm → next-build`ను
నడుస్తూనే ఉంచుతుంది — జాబ్ ఏదీ జోడించబడకుండానే అనాథ బిల్డ్ RAM మరియు
CPUని వినియోగిస్తూనే ఉంటుంది. ప్రతి OmniRoute యూనిట్లో
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
వద్ద `KillMode=mixed`తో ఒక drop-in ఉంటుంది: ముందుగా లిసనర్కు SIGTERM, ఆపై
`TimeoutStop` వద్ద మొత్తం cgroupకు SIGKILL. యూనిట్ తదుపరి పునఃప్రారంభమైనప్పుడు ఇది అమల్లోకి వస్తుంది — **ఒకేసారి ఒక రన్నర్ను మాత్రమే,
అది నిష్క్రియంగా ఉన్నప్పుడు మాత్రమే** పునఃప్రారంభించండి; నిష్క్రియ తనిఖీ మరియు పునఃప్రారంభం రెండూ ఒకే కమాండ్లో ఉండాలి.

## నిర్వహణ నియమాలు

- **ఒక సమయంలో ఒక Turbopack బిల్డ్ మాత్రమే — లేబుల్ ద్వారా అమలు చేయబడుతుంది.** పూర్తి Turbopack
  `next build`ను అమలు చేసే ప్రతి జాబ్ `[self-hosted, omni-build]`ను లక్ష్యంగా చేసుకుంటుంది, అలాగే
  **`omniroute-113-5`** మాత్రమే ఆ లేబుల్ను కలిగి ఉంటుంది: `ci.yml`లోని `Build`, `npm-publish.yml`లోని
  `publish`, `nightly-v4-build`, `preview-artifact`, రాత్రివేళ నడిచే a11y బిల్డ్ (#16853), అలాగే
  `docker-publish.yml`లోని **amd64** (BuildKit లోపల webpack — అక్కడ Turbopack పానిక్ అయింది,
  రన్ 33253576569). arm64 Docker దశ `ubuntu-24.04-arm`పైనే ఉంటుంది. `docker-publish`లోని amd64,
  `ci.yml`లోని `Build`తో `heavy-build-main` concurrency సమూహాన్ని పంచుకుంటుంది
  (`cancel-in-progress: false`). Docker Engine తప్పనిసరిగా `omniroute-113-5`లో ఉండాలి. 78 GBలో
  రెండవ Turbopack స్లాట్ సరిపోదు (2 × 33–37 GBతో పాటు మిగతా సిస్టమ్ అవసరాలు); రెండవ స్లాట్
  webpack బిల్డ్లకు మాత్రమే సురక్షితం.
- **Pull-request బిల్డ్లు hostedలో నడుస్తాయి (2026-10-18).** `ci.yml`లోని `Build`, `push` మరియు
  `workflow_dispatch` కోసం మాత్రమే `omni-build`ను చేరుకుంటుంది; ప్రతి `pull_request`
  (సొంత మూలం లేదా fork) మరియు `merge_group` బిల్డ్ webpackతో `ubuntu-latest`లో నడుస్తుంది.
  సొంత మూలంలోని ప్రతి PRను ఆ స్లాట్కు మళ్లించినప్పుడు, ఒక Turbopack బిల్డ్ దాన్ని 29–58 నిమిషాలు
  ఆక్రమించింది, 18 బిల్డ్లు గరిష్ఠంగా 18 గంటల వరకు క్యూలో వేచి ఉన్నాయి, అలాగే release lineకు
  చెందిన push బిల్డ్కు 40 జాబ్లలో ఒక్కసారి మాత్రమే స్లాట్ లభించింది. Hostedలో అదే PR బిల్డ్,
  ఆ PRకు చెందిన ఇతర జాబ్లతో పాటు 8–12 నిమిషాలు పడుతుంది. `npm-publish` పంపిణీ చేసే bundler
  అయిన Turbopack, default branch రాత్రివేళ a11y బిల్డ్ (04:41 UTC), స్లాట్ను చేరుకునే ప్రతి
  push లేదా dispatch బిల్డ్, అలాగే `npm-publish` ద్వారానే release lineలో పరీక్షించబడుతూనే ఉంటుంది.
  `tests/unit/build/heavy-build-queue.test.ts` ఈ నాలుగు-clause gateను స్థిరపరుస్తుంది.
- **Turbopack స్లాట్ పరిమాణాన్ని దాని కొలిచిన అవసరానికి ఎప్పుడూ తగ్గించవద్దు.** 2026-10-18న 18:06కు
  `omni-release` కోసం స్థలం కల్పించేందుకు స్లాట్ను 56G/60G నుంచి 40G/44Gకు తగ్గించారు. compile దశ
  దాని మొత్తం రన్లో `MemoryHigh` వద్దే నిలిచిపోయింది (memory PSI `full` 30–43 %), అలాగే అదే
  cgroupను పంచుకునే `Runner.Listener` తన జాబ్ను పునరుద్ధరించలేకపోయింది. 2026-10-17న యజమాని
  నిర్దేశించిన 56G/60Gను అదే రోజు తిరిగి పునరుద్ధరించారు. ఆ విలువ కంటే తక్కువగా ఉంటే బిల్డ్
  విఫలం కాదు; అది వనరుల కోసం తీవ్రంగా కొట్టుమిట్టాడుతుంది, చివరికి జాబ్ పోతుంది.
- **Release-Greenకు దాని స్వంత స్లాట్ ఉంది (2026-10-18).** అప్పటివరకు రెండు Release-Green
  validations `omni-build`లో నడిచేవి: ప్రతి pushపై (గంటకు ~10, ఒక రోజులోని 100 push రన్లలో
  97 పని మధ్యలోనే రద్దయ్యాయి) మరియు రోజుకు మూడు ~2 గంటల పూర్తి sweeps (05:29 sweep స్లాట్ కోసం
  6 గంటలు వేచి ఉంది) — ఒకే బిల్డ్ స్లాట్పై దాని సామర్థ్యానికి అనేక రెట్లు ఎక్కువ భారం పడింది,
  అలాగే సొంత మూలంలోని PR బిల్డ్లు గంటల తరబడి వేచి ఉన్నాయి. ఇప్పుడు `release-green` మరియు
  `main-green`, `OMNIROUTE_USE_TURBOPACK=0`తో `omni-release`ను (`omniroute-113-6` మాత్రమే)
  లక్ష్యంగా చేసుకుంటాయి; ప్రారంభమైన రన్ను ఇకపై కొత్త push రద్దు చేయదు (pending స్లాట్ ఇప్పటికీ
  ఆ రన్ల ఉద్ధృతిని కుదిస్తుంది). `tests/unit/build/runner-capacity-routing.test.ts` routingను,
  webpack switchను, అలాగే `omni-release`లో ఏదీ Turbopackతో బిల్డ్ కాకూడదనే నియమాన్ని
  స్థిరపరుస్తుంది.
- **తేలికపాటి pool: `omni-light`.** `omniroute-113` మరియు `omniroute-113-2`, backendకు మాత్రమే
  అవసరమైన `next build` (~5–6 GB; webpack) కలిగిన nightly రన్లను, అలాగే `quality.yml`లోని
  `lint-guard`ను నడుపుతాయి. 2026-10-18 వరకు `omniroute-113`లో `MemoryHigh=4G` ఉండేది —
  promptfoo బిల్డ్ అక్కడ 54 నిమిషాలపాటు reclaim చేసుకుంటూ ఎట్టకేలకు పూర్తయింది; 8 GB
  throttlingను తొలగిస్తుంది.
- **ఉద్దేశపూర్వకంగానే తక్కువ listeners.** 2026-08-29న నాలుగు OmniRoute unitsను నిలిపివేశారు —
  ప్రతి అదనపు listener పైన పేర్కొన్న memory budgetలో మరో tenant అవుతుంది. janitor గరిష్ఠ పరిమితి
  6 (cronలో `MAX_ACTIVE_RUNNERS=6`): అది బాక్స్లోని ప్రతి `Runner.Listener`ను లెక్కిస్తుంది,
  అలాగే మా నాలుగింటికి OmniHeuris + OmniMind మరో రెండింటిని జోడిస్తాయి.
- **ఏ runner అయినా busyగా ఉన్నప్పుడు `/tmp` లేదా `_work`ను చేతితో ఎప్పుడూ శుభ్రం చేయవద్దు.**
  తనిఖీ చేయడం, తొలగించడం మధ్య విరామం ఉన్న check-then-delete కారణంగానే 2026-08-27న నడుస్తున్న
  Build జాబ్ తన `_work`ను కోల్పోయింది. janitor తనిఖీని, తొలగింపును ఒకే దశలో చేస్తుంది;
  దానినే చేయనివ్వండి.
- జాబ్ మధ్యలో runnerను ఆపితే ఆ జాబ్ రద్దవుతుంది (ప్రత్యక్షంగా గమనించబడింది): దాని listenerకు
  `Runner.Worker` child లేనప్పుడు మాత్రమే `systemctl stop` చేయండి — అదీ ఒకే commandలో చేయండి.
- Workflows artefactsను `/tmp`లో ఉంచకూడదు (అది RAM). `$RUNNER_TEMP`కు download చేయండి
  (డిస్క్లో, ఒక్కో runnerకు ప్రత్యేకంగా ఉంటుంది) — 1.3 GB `next-build` artefact tmpfsలో
  దిగడానికి 27–32 నిమిషాలు పట్టింది, డిస్క్ నుంచి upload చేయడానికి 2 నిమిషాలు పట్టింది.
- `.15` VPS homologation కోసం మాత్రమే — అక్కడ CI runners ఎప్పుడూ నడవవు.

## హోస్ట్ చేసిన లేన్ (GitHub-హోస్ట్ చేసిన రన్నర్లు)

ఖాతా **Pro** ప్లాన్లో ఉంది: **40 ఏకకాల హోస్ట్ చేసిన జాబ్లు**, ప్రతి PR తనిఖీ,
ప్రతి పుష్-ట్రిగ్గర్ చేసిన వర్క్ఫ్లో మరియు CodeQL డిఫాల్ట్ సెటప్ వీటిని పంచుకుంటాయి. 2026-10-18న
ఒక మెర్జ్ ప్రచారం సమయంలో (~10 మెర్జ్లు/గంట, `release/v3.8.52`పై) కొలిచినవి: **24 hలో
2,500 వర్క్ఫ్లో రన్లు సృష్టించబడ్డాయి**, 6 hలో బ్రాంచ్కు 44 పుష్లు, PR తనిఖీలు
గంటల తరబడి వేచి ఉండగా **106 హోస్ట్ చేసిన జాబ్లు క్యూలో ఉన్నాయి**, మరియు అవి లేకుండానే PRలు మెర్జ్ చేయబడ్డాయి. బ్రాంచ్కు ప్రతి పుష్పై తొమ్మిది వర్క్ఫ్లోలు ప్రారంభమయ్యాయి:

| `release/v*`కు ప్రతి పుష్పై                 | హోస్ట్ చేసిన జాబ్లు | తీవ్ర రద్దీ సమయంలో ఫలితం                                           | 2026-10-18 నుంచి                                                                |
| ------------------------------------------- | ------------------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `ci.yml` (పూర్తి మ్యాట్రిక్స్)              |             30 వరకు | తదుపరి పుష్ ద్వారా రద్దు చేయబడింది, ఒక రోజులో 24లో 24              | `release/**` పుష్లపై ప్రారంభించబడదు (PR రన్ + Release-Green)                    |
| `quality.yml`                               |                  ~6 | రద్దు చేయబడింది, 23లో 23                                           | `release/**` పుష్లపై ప్రారంభించబడదు                                             |
| `Release-Green` `--quick`                   |                   0 | `omni-build`పై నడిచింది, 100లో 97 రద్దు చేయబడ్డాయి                 | `omni-release` స్లాట్, ఎప్పుడూ రద్దు కాదు, పెండింగ్ రన్లు ఒకటిగా కుదించబడతాయి   |
| `Lock released branch`, `OpenSSF Scorecard` |                   2 | ప్రతి పుష్కు క్యూలో ఒక రన్                                         | ప్రతి రిఫ్కు ఒక రన్ (`tests/unit/build/hosted-lane-concurrency.test.ts`)        |
| `Release acceptance` (షాడో రిపోర్ట్)        |                   1 | ప్రతి పుష్కు ఒక హోస్ట్ చేసిన `npm ci`, ఎప్పుడూ రద్దు కాదు          | మార్పు లేదు — `paths:` ఫిల్టర్కు అభ్యర్థి                                       |
| `Publish to Docker Hub` → `Deploy to VPS`   |                   2 | ప్రతి పుష్కు రద్దు; amd64 లెగ్ `omni-build`లో పోటీపడుతుంది         | మార్పు లేదు — యజమాని డిప్లాయ్ ఛానల్                                             |
| CodeQL డిఫాల్ట్ సెటప్ (`dynamic`)           |                   4 | ప్రతి పుష్కు `javascript-typescript`, `actions`, `c-cpp`, `python` | మార్పు లేదు — Settings → Code security; `c-cpp`/`python` ఇక్కడ ఏదీ స్కాన్ చేయవు |

`tests/unit/build/push-storm-diet.test.ts`, `ci.yml` మరియు
`quality.yml` యొక్క `main`-మాత్రమే పుష్ ట్రిగ్గర్ను స్థిరపరుస్తుంది. దుష్ప్రభావం: ప్రతి రిలీజ్ పుష్కు
Codecov ఇకపై బేస్ అప్లోడ్ను స్వీకరించదు (ఈ దశ సమాచార ప్రయోజనానికే మరియు `continue-on-error`);
రిపోజిటరీలోని కవరేజ్ గేట్ మరియు PR వ్యాఖ్యపై ఎలాంటి ప్రభావం లేదు.

**మరింత సెల్ఫ్-హోస్ట్ చేసిన సామర్థ్యం హోస్ట్ చేసిన క్యూను పరిష్కరించదు.** డెవ్బాక్స్
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) ఒక రన్నర్ను హోస్ట్ చేయగలదు, కానీ ఏజెంట్ సెషన్లు ఇప్పటికే
దాని లోడ్ను 20–26 వద్ద ఉంచుతున్నాయి, ఏజెంట్ కంటైనర్లో Docker డీమన్ లేదు, మరియు పూర్తిగా నిండిపోయిన లేన్
హోస్ట్ చేసినదే. అదే సమయంలో `.113` బాక్స్లో 71 GB ఖాళీగా ఉండి, లోడ్ 5–8గా ఉంది; దాని పరిమితి
పైన పేర్కొన్న ఒక్కో లిసనర్ మెమరీ బడ్జెట్ (గరిష్ఠంగా 6 లిసనర్లు), CPU కాదు. మిగిలిన మార్గాలు
ప్రాసెస్కు సంబంధించినవి: ప్రచార PRలను Mergify క్యూ ద్వారా ల్యాండ్ చేయండి (`label=queue`, బ్యాచ్లు
ఒక్కో PRకు ఒక రన్తో పాటు ఒక్కో పుష్కు ఒక రన్కు బదులుగా ఒక `merge_group` CI రన్ను పంచుకుంటాయి),
CodeQL డిఫాల్ట్-సెటప్ భాషలను తగ్గించండి, మరియు అది చదివే ఫైళ్ల ఆధారంగా `release-acceptance.yml`ను
ఫిల్టర్ చేయండి.
