# Self-Hosted Runner Box Operations (.113 pool) (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

በራስ የሚስተናገደው ፑል በ**.113** ማሽን (`tomni-proxmox-113`) ላይ ይሰራል። ከ2026-10-18 ጀምሮ እያንዳንዱ
የOmniRoute runner **አንድ ሚና**፣ አንድ label እና በworkload መለኪያው መሠረት የተመደበ የmemory/CPU በጀት
አለው። የTurbopack ስሎት ለbuild የሚያስፈልገውን ያገኛል፤ ሌሎቹ ስሎቶች ደግሞ በተለኩት
ከፍተኛ አጠቃቀሞቻቸው መሠረት መጠናቸው ተወስኗል። ማሽኑ overcommit የሚያደርገው የTurbopack build ከRelease-Green
webpack build እና lint job ጋር ሲገጣጠም ብቻ ነው፤ የhost swap (16 GB) ይህን ይሸፍናል፣ እና የpull-request Builds
በhosted runner ላይ ስለሚሰሩ የTurbopack ስሎቱ አብዛኛውን ጊዜ ስራ ፈት ነው፦

| runner               | label          | ሚና                                                                                                                                            | `MemoryHigh` / `MemoryMax` | `CPUQuota`   |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| `omniroute-113-5`    | `omni-build`   | የTurbopack builds፦ `ci.yml` `Build` (ለpush/dispatch ብቻ)፣ Docker amd64፣ `npm-publish`፣ `nightly-v4-build`፣ `preview-artifact`፣ የምሽቱ a11y build | 56 GB / 60 GB (swap 0)     | 1600 %       |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`)፣ webpack build                                                                                 | 20 GB / 24 GB (swap 4 GB)  | 800 %        |
| `omniroute-113-2`    | `omni-light`   | የምሽት ስራዎች (Schemathesis፣ promptfoo፣ garak፣ k6) እና `quality.yml` `lint-guard`                                                                  | 12 GB / 16 GB (swap 4 GB)  | 600 %        |
| `omniroute-113`      | `omni-light`   | ከላይ ካለው ጋር ተመሳሳይ ፑል                                                                                                                           | 8 GB / 12 GB               | 400 %        |
| OmniHeuris, OmniMind | (የእነሱ repos)   | Dependabot ብቻ (እያንዳንዱ ከፍተኛው 155 MB፣ 2026-10-18)                                                                                               | 4 GB / 6 GB                | እያንዳንዱ 200 % |

በ2026-10-18 የተለካ፦

| ሀብት       | ዋጋ                        | ለስራ መርሐግብር ያለው ትርጉም                                                                                                                                                                                                                                                                                                                                                 |
| --------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 cores**      | ያልተገደበ የTurbopack production build ከፍተኛው 49 GB ደርሷል (`tests/unit/ci-build-bundler-webpack.test.ts`)፤ በNext 16.3.8 ላይ compile phase ብቻውን ~40 GB ይይዛል (በ`next-build` ውስጥ 36 GB RSS፣ በተጨማሪም እያንዳንዳቸው 3 GB የሚጠቀሙ 17 loader workers፣ በ2026-10-18 የተለካ)፤ አንድ webpack build ~14–16 GB ይጠቀማል። አንድ Turbopack እና አንድ webpack build በአንድነት ይበቃሉ፤ ሁለት Turbopack builds ግን አይበቁም |
| swap      | 16 GB                     | `omniroute-113-5` swap ጠፍቶ (`MemorySwapMax=0`) ይሰራል፤ ስለዚህ ከቁጥጥር ውጭ የሆነ build ማሽኑን swap ከማስገባት ይልቅ በተወሰነለት ገደብ ላይ ይቋረጣል                                                                                                                                                                                                                                              |
| `/tmp`    | **12 GB tmpfs = RAM**     | እዚያ የተቀመጠ ማንኛውም ነገር memory ይጠቀማል፤ የቀሩ ፋይሎች ከ3 h በኋላ ይጸዳሉ                                                                                                                                                                                                                                                                                                            |
| CPU       | በ32 cores ላይ load 60 ታይቷል | quotas ከመደረጋቸው በፊት፣ አንድ Turbopack build (~1166 % CPU) ከcoverage suite ጋር በተመሳሳይ ማሽን ላይ ሲሰራ የሌሎቹን listeners heartbeats ሀብት አሳጥቷል (`The self-hosted runner lost communication`፣ #16853)                                                                                                                                                                               |
| runners   | **6 listeners**           | 4 OmniRoute + OmniHeuris + OmniMind፤ `omniroute-113-3/-4/-7/-8` ተሰናክለዋል (`systemctl enable --now` አንዱን መልሶ ያስነሳል)                                                                                                                                                                                                                                                   |

ገደቦቹ በእያንዳንዱ unit `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` ውስጥ ይገኛሉ
(የቀድሞ ዋጋዎች እንደ `override.conf.bak-20261018` ተቀምጠዋል)፣ እና
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` በመጠቀም ስርዓቱ እየሰራ ተተግብረዋል — restart አልተደረገም፣ ስለዚህ
እየሰራ ያለ job አልተነካም። Labels በrunners API በኩል
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) ይቀየራሉ፣ ይህም ስርዓቱ እየሰራ ይከናወናል።

## ጽዳት አስተዳዳሪውን ይጫኑ (አንድ ጊዜ፣ በማሽኑ ላይ)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root)፦ በየ30 ደቂቃው፣ ወደ /var/log/runner-janitor.log መዝግብ
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` ያስፈልጋል፦ ጽዳት አስተዳዳሪው አንድን ዱካ ከማስወገዱ በፊት የተከፈቱ
ፋይሎችን አንድ ጊዜ በመመልከት ዱካው ስራ ፈት መሆኑን ያረጋግጣል፤ ይህ መሣሪያ ከሌለ
ምንም ነገር አያስወግድም፣ ይህንንም ይገልጻል
(exit 1)። ማንኛውንም ለውጥ በመጀመሪያ በ`--dry-run` ይሞክሩ — ምን እንደሚያደርግ
በትክክል ያትማል፣ ምንም ነገርም አይለውጥም።

በእያንዳንዱ አሂድ የሚያደርገው፦ የራሳችንን ቅሪቶች (`runner-*`፣ `omniroute-*`፣
`next-build*`፣ `e2e-build.tar.gz`) **በtmpfs ላይ ከ3 ሰዓት** እና በዲስክ
`_work/_temp` ላይ ከ24 ሰዓት በኋላ ያጸዳል፤ ከ75 ደቂቃ በላይ የቆየ `next-build`ን
ያቋርጣል (ምንም job ይህን ያህል ጊዜ አይሰራም — በ2026-08-27 GitHub የእሱ job
እንደጠፋ ካወጀ በኋላ አንዱ ለ70 ደቂቃ ሰርቷል)፤ unit-ቸው **የቆመ**
runner-ዎችን ከ48 ሰዓት በላይ የቆዩ checkouts ይቀንሳል፤ የዲስክ አጠቃቀም ≥ 85 %፣
የማህደረ ትውስታ PSI `full/avg60` ≥ 10 %፣ እና የlisteners ብዛት ከ`MAX_ACTIVE_RUNNERS`
ሲበልጥ (ከomniroute/other ዝርዝር ክፍፍል ጋር) ማንቂያ ይሰጣል። Exit 1 = ትኩረት
ያስፈልጋል፤ log-ውን ያንብቡ።

የ75 ደቂቃው ሕግ GitHub አስቀድሞ ተስፋ የቆረጠበትን build አይይዝም።
`Runner.Listener` job-ውን ማደስ ሳይችል ሲቀር፣ `_diag/Runner_*.log` ውስጥ
`POST request to …/renewjob timed out after 100 seconds` ይታያል፣ API-ው ከመጨረሻው
የተሳካ renewal በኋላ በአስር ደቂቃ ገደማ job-ውን `completed`
(failure) ብሎ ያሳውቃል፣ እና `next-build` ምንም job ሳይያያዝበት መስራቱን ይቀጥላል
(2026-10-18፦ የ#17066 Build በ19:43 እንዳልተሳካ ተመዝግቦ ነበር፣ ነገር ግን build-ው
ከአምስት ደቂቃ በኋላም 40 GB ይዞ ነበር)። በአዲሱ `_diag/Worker_*.log` ውስጥ
ref-ውን ያረጋግጡ፣ ከዚያ የbuild tree-ውን ብቻ በPID SIGTERM ይላኩ — `next-build`፣
`npm run build`፣ `build-next-isolated.mjs` እና የ`_work` workers። `Runner.Listener`፣
`RunnerService.js` ወይም `Runner.Worker`ን በፍጹም አይንኩ፦ worker-ው job-ው
እንደተሰረዘ ሪፖርት ያደርጋል፣ listener-ውም በራሱ እንደገና online ይሆናል።

## የRunner units፦ KillMode

የrunner-ው ነባሪ `KillMode=process`፣ unit ሲቆም ወይም እንደገና ሲጀምር
`Runner.Worker → npm → next-build`ን እንደተነሳ ይተዋል — ወላጅ አልባ build ምንም
job ሳይያያዝበት RAM እና CPU መጠቀሙን ይቀጥላል። እያንዳንዱ OmniRoute unit
`KillMode=mixed` ያለው drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
ይዟል፦ መጀመሪያ SIGTERM ወደ listener-ው፣ ከዚያ `TimeoutStop` ላይ SIGKILL ወደ
ጠቅላላው cgroup ይላካል። ይህ በunit-ው ቀጣይ restart ላይ ተግባራዊ ይሆናል —
**አንድ runner በአንድ ጊዜ፣ ስራ ፈት ሲሆን ብቻ**፣ የስራ ፈትነት ማረጋገጫውን
እና restart-ውን በአንድ command ውስጥ በማድረግ እንደገና ያስጀምሩ።

## የአሠራር ደንቦች

- **በአንድ ጊዜ አንድ Turbopack build ብቻ — በlabel የተገደበ።** ሙሉ Turbopack
  `next build` የሚያስኬድ እያንዳንዱ job `[self-hosted, omni-build]`ን ዒላማ ያደርጋል፣ እና ያንን
  label የያዘው **`omniroute-113-5`** ብቻ ነው፦ `ci.yml` `Build`፣ `npm-publish.yml` `publish`፣ `nightly-v4-build`፣ `preview-artifact`፣
  የሌሊቱ a11y build (#16853) እና `docker-publish.yml` **amd64** (በBuildKit ውስጥ webpack —
  Turbopack በዚያ ወድቋል፣ run 33253576569)። የarm64 Docker leg በ`ubuntu-24.04-arm` ላይ ይቆያል።
  `docker-publish` amd64 የ`heavy-build-main` concurrency groupን ከ`ci.yml` `Build`
  (`cancel-in-progress: false`) ጋር ይጋራል። Docker Engine በ`omniroute-113-5` ላይ መኖር አለበት። ሁለተኛ Turbopack
  slot በ78 GB ውስጥ አይበቃም (2 × 33–37 GB እና የማሽኑ ቀሪ ሂደቶች)፤ ሁለተኛ slot ደህንነቱ የተጠበቀው
  ለwebpack builds ብቻ ነው።
- **የPull-request Builds በhosted runners ላይ ይሰራሉ (2026-10-18)።** `ci.yml` `Build` ወደ`omni-build` የሚደርሰው
  ለ`push` እና `workflow_dispatch` ብቻ ነው፤ እያንዳንዱ `pull_request` (ከራሳችን originም ሆነ ከfork) እና `merge_group` Build
  በ`ubuntu-latest` ላይ በwebpack ይሰራል። ከራሳችን origin የሆነ እያንዳንዱ PR ወደslot ሲመራ፣ አንድ Turbopack
  Build slotን ለ29–58 ደቂቃ ይዞ ቆይቷል፣ 18 Builds እስከ18 ሰዓት በqueue ውስጥ ጠብቀዋል፣ እና የrelease line የራሱ push Build
  ከ40 jobs ውስጥ slotን ያገኘው አንድ ጊዜ ብቻ ነበር። በhosted runner ላይ ይኸው PR Build ከPRው ሌሎች
  jobs ጎን ለጎን 8–12 ደቂቃ ይወስዳል። `npm-publish` የሚያቀርበው bundler የሆነው Turbopack በrelease line ላይ
  አሁንም ይፈተናል፦ በdefault branch የሌሊት a11y build (04:41 UTC)፣ slotን
  በሚደርስ እያንዳንዱ push ወይም dispatch Build፣ እና በ`npm-publish` ራሱ። `tests/unit/build/heavy-build-queue.test.ts`
  ባለአራት ደንብ gateን እንዳይለወጥ ያረጋግጣል።
- **የTurbopack slotን መጠን ከተለካው ፍላጎቱ በታች ፈጽሞ አታድርጉ።** በ2026-10-18 18:06 ላይ slot
  ለ`omni-release` ቦታ ለመስጠት ከ56G/60G ወደ40G/44G ዝቅ ተደርጓል። የcompile ደረጃው በጠቅላላው
  የማስኬጃ ጊዜ `MemoryHigh` ላይ ተጣብቆ ቆይቷል (memory PSI `full` 30–43 %)፣ እና
  cgroupን የሚጋራው `Runner.Listener` jobውን ማደስ አልቻለም። የownerው የ2026-10-17 56G/60G ቅንብር በዚያው
  ቀን ተመልሷል። ከዚህ ዋጋ በታች buildው አይወድቅም፤ ከፍተኛ የmemory መጋፋት ውስጥ ይገባል፣ እና jobው ይጠፋል።
- **Release-Green የራሱ slot አለው (2026-10-18)።** እስከዚያ ጊዜ ድረስ ሁለቱም Release-Green validations
  በ`omni-build` ላይ ይሰሩ ነበር፦ በእያንዳንዱ push (~10/hour፣ በአንድ ቀን ከ100 push runs 97ቱ በሥራ መሃል ተሰርዘዋል)
  እና በቀን ሦስት ~2 h ሙሉ sweeps (የ05:29 sweep slotን ለ6 ሰዓት ጠብቋል) — ብቸኛው build
  slot ከአቅሙ በብዙ እጥፍ በላይ ተጭኖ ነበር፣ እና ከራሳችን origin የሆኑ PR Builds ለሰዓታት ጠብቀዋል።
  `release-green` እና `main-green` አሁን `OMNIROUTE_USE_TURBOPACK=0` በመጠቀም
  `omni-release`ን (`omniroute-113-6` ብቻ) ዒላማ ያደርጋሉ፣ እና የተጀመረ run ከእንግዲህ በአዲስ push አይሰረዝም (በpending ላይ ያለው
  slot ግን አሁንም የተደራራቢ runs ጎርፍን ያዋህዳል)። `tests/unit/build/runner-capacity-routing.test.ts`
  routingን፣ የwebpack switchን እና በ`omni-release` ላይ ምንም ነገር በTurbopack እንደማይገነባ እንዳይለወጥ ያረጋግጣል።
- **ቀላል pool፦ `omni-light`።** `omniroute-113` እና `omniroute-113-2` backend-only
  `next build` (~5–6 GB፤ webpack) የሚፈልጉትን የሌሊት runs እና `quality.yml` `lint-guard`ን ያስኬዳሉ። `omniroute-113`
  እስከ2026-10-18 ድረስ `MemoryHigh=4G` ነበረው — promptfoo build በዚያ ላይ ለ54 ደቂቃ
  memoryን በተደጋጋሚ እየመለሰ በችግር አልፏል፤ 8 GB throttlingን ያስወግዳል።
- **ሆን ተብሎ ያነሱ listeners።** አራት OmniRoute units በ2026-08-29 disabled ተደርገዋል — እያንዳንዱ ተጨማሪ
  listener ከላይ ባለው የmemory budget ላይ ሌላ tenant ነው። የjanitor ከፍተኛ ገደብ 6 ነው (`MAX_ACTIVE_RUNNERS=6` በcron ውስጥ)፦ በማሽኑ ላይ ያለውን
  እያንዳንዱን `Runner.Listener` ይቆጥራል፣ እና OmniHeuris + OmniMind በእኛ አራት ላይ ሁለት ይጨምራሉ።
- **ማንኛውም runner ሥራ ላይ እያለ `/tmp`ን ወይም `_work`ን በእጅ ፈጽሞ አታጽዱ።** በማረጋገጥ እና በመሰረዝ መካከል ክፍተት ያለው
  check-then-delete በ2026-08-27 በሥራ ላይ የነበረ Build job `_work`ውን
  እንዲያጣ ያደረገው ምክንያት ነው። janitorው ማረጋገጡን እና ማስወገዱን በአንድ እርምጃ ያከናውናል፤
  እሱ እንዲያደርገው ይተዉት።
- runnerን በjob መሃል ማቆም jobውን ይሰርዛል (በቀጥታ የታየ)፦ `systemctl stop`ን የlistenerው
  `Runner.Worker` child በማይኖረው ጊዜ ብቻ ያስኪዱ — እና ይህንን በአንድ command ያድርጉ።
- Workflows artefactsን በ`/tmp` ውስጥ ማቆየት የለባቸውም (እሱ RAM ነው)። ወደ
  `$RUNNER_TEMP` (በdisk ላይ፣ ለእያንዳንዱ runner የተለየ) ያውርዱ — 1.3 GB የሆነው `next-build` artefact በtmpfs ላይ ለመቀመጥ 27–32
  ደቂቃ፣ ከdisk ላይ upload ለመደረግ ደግሞ 2 ደቂቃ ወስዷል።
- `.15` VPS ለhomologation ብቻ ነው — CI runnersን ፈጽሞ አያስኬድም።

## የተስተናገደ መስመር (በGitHub የሚስተናገዱ runners)

መለያው በ**Pro** ዕቅድ ላይ ነው፦ **40 በአንድ ጊዜ የሚሰሩ የተስተናገዱ jobs** አሉት፤ እነዚህም በእያንዳንዱ PR ፍተሻ፣
በእያንዳንዱ በpush በሚነሳ workflow እና በCodeQL ነባሪ ቅንብር መካከል ይጋራሉ። በ2026-10-18 በአንድ
የማዋሃድ ዘመቻ ወቅት (~10 merges/hour በ`release/v3.8.52`) የተለካው፦ በ
24 h ውስጥ **2,500 workflow runs ተፈጥረዋል**፣ በ6 h ውስጥ ወደ branch 44 pushes ተደርገዋል፣
PR ፍተሻዎች ለሰዓታት ሲጠብቁ **106 hosted jobs ወረፋ ይዘዋል**፣ እና PR-ዎች ያለእነሱ
ተዋህደዋል። ወደ branch በተደረገ እያንዳንዱ push ላይ ዘጠኝ workflows ተነስተዋል፦

| በእያንዳንዱ push ወደ `release/v*`                | የተስተናገዱ jobs | በውድቀት ማዕበሉ ወቅት የነበረው ውጤት                                           | ከ2026-10-18 ጀምሮ                                                          |
| ------------------------------------------- | -----------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `ci.yml` (ሙሉ matrix)                        |       እስከ 30 | በሚቀጥለው push ተሰርዟል፣ በአንድ ቀን ውስጥ 24 ከ24                              | በ`release/**` pushes ላይ አልተጀመረም (PR run + Release-Green)                 |
| `quality.yml`                               |           ~6 | ተሰርዟል፣ 23 ከ23                                                      | በ`release/**` pushes ላይ አልተጀመረም                                          |
| `Release-Green` `--quick`                   |            0 | በ`omni-build` ላይ ሰርቷል፣ 97 ከ100 ተሰርዟል                               | `omni-release` slot፣ ፈጽሞ አይሰረዝም፣ pending run ይጠቀለላል                      |
| `Lock released branch`, `OpenSSF Scorecard` |            2 | በእያንዳንዱ push አንድ run ወረፋ ይዟል                                       | በእያንዳንዱ ref አንድ run (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (የshadow ሪፖርት)         |            1 | በእያንዳንዱ push አንድ የተስተናገደ `npm ci`፣ ፈጽሞ አልተሰረዘም                     | አልተለወጠም — ለ`paths:` filter እጩ ነው                                         |
| `Publish to Docker Hub` → `Deploy to VPS`   |            2 | በእያንዳንዱ push ተሰርዟል፤ amd64 leg በ`omni-build` ላይ ይወዳደራል              | አልተለወጠም — የባለቤቱ deploy ቻናል                                               |
| CodeQL ነባሪ ቅንብር (`dynamic`)                 |            4 | በእያንዳንዱ push `javascript-typescript`፣ `actions`፣ `c-cpp`፣ `python` | አልተለወጠም — Settings → Code security፤ `c-cpp`/`python` እዚህ ምንም አይቃኙም       |

`tests/unit/build/push-storm-diet.test.ts` የ`ci.yml` እና
`quality.yml` የ`main`-ብቻ push triggerን ያረጋግጣል። የጎንዮሽ ውጤት፦ Codecov ከእንግዲህ በእያንዳንዱ release push የbase upload
አያገኝም (ደረጃው ለመረጃ ብቻ ነው እና `continue-on-error` ተደርጎለታል)፤ በrepository ውስጥ ያለው coverage gate እና PR comment
አልተነኩም።

**ተጨማሪ self-hosted capacity የhosted queueን አያስተካክልም።** devbox
(`devbox-vm-06-dev002`፣ 24 vCPU / 54 GB) runner ማስተናገድ ይችላል፣ ነገር ግን agent sessions አስቀድመው
loadን በ20–26 ያቆዩታል፣ agent container Docker daemon የለውም፣ እና ሙሉ በሙሉ የተጨናነቀው መስመር
hosted የሆነው ነው። በዚያው ጊዜ `.113` box 71 GB ነፃ ቦታ እና 5–8 load ነበረው፤ ገደቡ
ከላይ ያለው የእያንዳንዱ listener የmemory budget ነው (ከፍተኛው 6 listeners)፣ CPU አይደለም። የቀሩት መፍትሔዎች
የሂደት ለውጦች ናቸው፦ የዘመቻ PR-ዎችን በMergify queue (`label=queue`) በኩል ማዋሃድ፣ batches
ለእያንዳንዱ PR አንድ run እና ለእያንዳንዱ push አንድ run ከመፍጠር ይልቅ አንድ `merge_group` CI run
ይጋራሉ፤ የCodeQL ነባሪ-ቅንብር languagesን መቀነስ፣ እና `release-acceptance.yml`ን በሚያነባቸው files መሠረት ማጣራት።
