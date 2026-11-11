# Self-Hosted Runner Box Operations (.113 pool) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

स्व-होस्ट गरिएको पोखरी मा चल्छ **११३** बक्स (`tomni-proxmox-113`)। 2026-10-18 देखि प्रत्येक OmniRoute धावकसँग छ **एउटा भूमिका** , एउटा लेबल, र memory/CPU बजेटले यसको कामको भार मापन गरेको छ। Turbopack स्लटले निर्माणलाई चाहिने कुरा पाउँछ; अन्य स्लटहरू तिनीहरूको मापन शिखरहरूमा आकार छन्। Turbopack निर्माणले रिलीज-ग्रीन वेबप्याक निर्माण र लिन्ट कार्यसँग मेल खाएमा मात्र बक्सले ओभर कमिट गर्छ; होस्ट स्वैप (16 GB) ले त्यसलाई अवशोषित गर्छ, र पुल-अनुरोध बिल्डहरू होस्ट गरिएको हुनाले, Turbopack स्लट धेरैजसो समय निष्क्रिय हुन्छ:

| धावक                 | लेबल                            | भूमिका                                                                                                                                                   | `MemoryHigh` / `MemoryMax` | `CPUQuota`    |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Turbopack निर्माण गर्दछ: `ci.yml` `Build` (push/dispatch मात्र), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, रातको a11y निर्माण | 56 GB / 60 GB (स्वैप 0)    | 1600 %        |
| `omniroute-113-6`    | `omni-release`                  | रिलीज-हरियो (`release-green` + `main-green`), वेबप्याक निर्माण                                                                                           | 20 GB / 24 GB (स्वैप 4 GB) | 800 %         |
| `omniroute-113-2`    | `omni-light`                    | नाइटलीज (स्कीमाथेसिस, प्रम्प्टफू, गारक, k6) र `quality.yml` `lint-guard`                                                                                 | 12 GB / 16 GB (स्वैप 4 GB) | 600 %         |
| `omniroute-113`      | `omni-light`                    | माथिको जस्तै पोखरी                                                                                                                                       | 8 GB / 12 GB               | 400 %         |
| OmniHeuris, OmniMind | (उनीहरूको रिपोज)                | डिपेन्डाबोट मात्र (उच्चतम 155 MB प्रत्येक, 2026-10-18)                                                                                                   | 4 GB / 6 GB                | 200% प्रत्येक |

2026-10-18 मापन गरिएको:

| स्रोत     | मूल्य                           | अनुसूचीको लागि यसको अर्थ के हो                                                                                                                                                                                                                                                                                                              |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 कोर**              | एक Turbopack उत्पादन निर्माण 49 GB अनक्याप्ड (`tests/unit/ci-build-bundler-webpack.test.ts`) मा उचाईमा छ; अर्को 16.3.8 मा कम्पाइल चरण एक्लै ~ 40 GB ( `next-build` मा 36 GB RSS प्लस 3 GB मा 17 लोडर कामदारहरू, 2026-10-18 मापन); ~ 14-16 GB मा वेबप्याक निर्माण। एक Turbopack + एक वेबप्याक निर्माण सँगै फिट; दुई Turbopack निर्माण गर्दैन |
| स्वैप     | 16 GB                           | `omniroute-113-5` स्वैप अफ (`MemorySwapMax=0`) संग चल्छ त्यसैले बाकस स्वैप गर्नुको सट्टा एक भागेको बिल्ड यसको क्यापमा काटिन्छ।                                                                                                                                                                                                              |
| `/tmp`    | **12 GB tmpfs = RAM**           | त्यहाँ पार्क गरिएको कुनै पनि स्मृति छ; बाँकी ३ घन्टा पछि निकालिन्छ                                                                                                                                                                                                                                                                          |
| CPU       | 32 कोरहरूमा 60 लोड अवलोकन गरियो | कोटा अघि, एक Turbopack निर्माण (~ 1166 % CPU) र एउटै बक्समा कभरेज सुइटले अन्य श्रोताहरूको हृदयको धड्कन (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                |
| धावकहरू   | **7 श्रोताहरू** (२०२६-१०-२८)    | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` `omni-build-60gb` पनि बोक्छ; `omniroute-113-3/-4/-8` रिपोबाट मेटाइयो (2026-10-28)                                                                                                                                                                                                    |

सीमाहरू प्रत्येक एकाइको `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` ( `override.conf.bak-20261018` को रूपमा राखिएको अघिल्लो मानहरू) मा रहन्छन् र `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — रिस्टार्ट नगरी प्रत्यक्ष रूपमा लागू गरिएको थियो, त्यसैले कुनै चलिरहेको कामलाई छोएन। लेबलहरू API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), पनि लाइभ मार्फत परिवर्तन हुन्छन्।

## चौकीदार स्थापना गर्नुहोस् (एक पटक, बक्समा)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` आवश्यक छ: चौकीदारले यसलाई हटाउनु अघि खुला फाइलहरूको एक स्न्यापसटको साथ पथ निष्क्रिय छ भनेर प्रमाणित गर्दछ, र उपकरण बिना यसले केही पनि हटाउँदैन र त्यसो भन्छ (निकास १)। `--dry-run` पहिलो — को साथ कुनै पनि परिवर्तन प्रयास गर्नुहोस् यसले ठ्याक्कै के गर्छ प्रिन्ट गर्दछ र केहि पनि छुँदैन।

यसले प्रत्येक दौडले के गर्छ: हाम्रो आफ्नै अवशेषहरू (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) पछि निकाल्छ।**tmpfs मा 3 घन्टा** र डिस्क `_work/_temp` मा 24 घण्टा; 75 मिनेट भन्दा पुरानो `next-build` मा अलर्ट र यसलाई चलिरहेको राख्छ; धावकहरूको 48 घन्टा पुरानो चेकआउटहरू काँट्छ जसको एकाई हो**रोकियो** ; डिस्क ≥ 85 %, मेमोरी PSI `full/avg60` ≥ 10 %, र `MAX_ACTIVE_RUNNERS` ( omniroute/other ब्रेकडाउनको साथ) भन्दा धेरै श्रोताहरूमा अलर्टहरू। बाहिर निस्कनुहोस् 1 = ध्यान आवश्यक छ; लग पढ्नुहोस्।

बितेको समयले मात्र प्रक्रिया अनाथ छ भनेर प्रमाणित गर्दैन। चौकीदारले उमेरको आधारमा संकेतहरू पठाउँदैन। अवस्थित `ZOMBIE_BUILD_MAX_MIN` र `ZOMBIE_BUILD_COMM` वातावरण नामहरू क्रोन कन्फिगरेसनहरूको लागि समर्थित छन्। शंकास्पद अनाथलाई सफा गर्नु अघि, यसको सही GitHub कार्य टर्मिनल हो भनेर पुष्टि गर्नुहोस् र त्यो कामसँग सम्बन्धित प्रक्रियाहरू पहिचान गर्नुहोस्। जब `Runner.Listener` आफ्नो काम नवीकरण गर्न सक्दैन, `_diag/Runner_*.log` `POST request to …/renewjob timed out after 100 seconds` देखाउँछ, API अन्तिम सफल नवीकरणको करिब दस मिनेट पछि काम `completed` (असफलता) रिपोर्ट गर्छ, र `next-build` कुनै काम संलग्न नगरी चलिरहन्छ (2026-10-18: #17066 को निर्माण 19:43 मा असफल भयो र यसको निर्माण GB 5 मिनेट पछि पनि होल्ड थियो)। नयाँ `_diag/Worker_*.log` मा रेफ पुष्टि गर्नुहोस्, त्यसपछि SIGTERM मात्र PID — `next-build`, `npm run build`, `build-next-isolated.mjs` र `_work` कार्यकर्ताहरू द्वारा निर्माण रूख। `Runner.Listener`, `RunnerService.js` वा `Runner.Worker` लाई कहिल्यै नछुनुहोस्: कार्यकर्ताले काम रद्द भएको रूपमा रिपोर्ट गर्छ र श्रोता आफैं अनलाइन फर्कन्छ।

## Runner unit हरू: KillMode

Runner को पूर्वनिर्धारित `KillMode=process` ले unit रोकिँदा वा पुनः सुरु हुँदा
`Runner.Worker → npm → next-build` लाई चलिरहन दिन्छ — कुनै job संलग्न नभएको orphan build ले RAM र
CPU खाइरहन्छ। प्रत्येक OmniRoute unit मा
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
`KillMode=mixed` भएको drop-in हुन्छ: पहिले listener लाई SIGTERM, त्यसपछि
`TimeoutStop` मा सम्पूर्ण cgroup लाई SIGKILL। यो unit को अर्को restart मा लागू हुन्छ — निष्क्रियता जाँच र restart एउटै command मा राखेर, **एक पटकमा एउटा runner मात्र र निष्क्रिय हुँदा मात्र** restart गर्नुहोस्।

## सञ्चालन नियमहरू

- **एक पटकमा एउटा मात्र Turbopack बिल्ड — लेबलद्वारा लागू गरिएको।** पूर्ण Turbopack
  `next build` चलाउने प्रत्येक job ले `[self-hosted, omni-build, omni-build-60gb]` लाई लक्षित गर्छ, र त्यो
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
  listener माथिको memory budget को अर्को tenant हो। सफाइ प्रक्रियाको अधिकतम सीमा 8 हो (`MAX_ACTIVE_RUNNERS=8` cron मा): यसले
  मेसिनमा भएका प्रत्येक `Runner.Listener` गन्छ, र OmniHeuris + OmniMind ले हाम्रा पाँचवटामा थप दुईवटा जोड्छन्।
- **Unit र Vitest job हरू होस्टेडमै रहन्छन्।** `ci.yml` ले आफ्ना unit shard हरू र Vitest job लाई `[self-hosted, omni-ci]` मा तब मात्र पठाउँछ जब रिपोजिटरी भेरिएबल `vars.USE_VPS_TEST_RUNNER` `true` हुन्छ, र त्यतिबेला पनि एउटै रिपोजिटरीका `pull_request` रनहरूका लागि मात्र; fork हरू, `merge_group` र push हरू `ubuntu-latest` मै रहन्छन् (`tests/unit/vps-runner-variable-scope.test.ts`)। यो भेरिएबल `false` छ। 2026-10-28 मा तीनवटा 4-कोर `omni-ci` listener लाई `npm ci` का लागि 250–270 s लाग्यो र प्रत्येक unit shard ले 30 मिनेटको job सीमा छोयो, जबकि होस्टेड shard लाई ~634 s लाग्छ; त्यसबेला मेसिनको load 17–24 थियो। ती listener हरू मेटाइए। unit shard का लागि उपयुक्त आकारका listener हरू नभई यो भेरिएबल फेरि सक्रिय नगर्नुहोस्।
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

रिपोजिटरी `cheaper-inference` संगठनको हो, जुन **Team** योजनामा छ: **एकैपटक चल्ने 60 होस्टेड जबहरू**, जुन संगठनका प्रत्येक रिपोजिटरी, प्रत्येक PR जाँच, प्रत्येक push-ट्रिगर गरिएको workflow र CodeQL को पूर्वनिर्धारित सेटअपद्वारा साझा गरिन्छ। तलका तथ्याङ्कहरू **Pro** योजनामा (एकैपटक चल्ने 40 होस्टेड जबहरू) मापन गरिएका थिए। 2026-10-18 मा
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
