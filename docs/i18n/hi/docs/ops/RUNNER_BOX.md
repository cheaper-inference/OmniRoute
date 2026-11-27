# Self-Hosted Runner Box Operations (.113 pool) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

सेल्फ़-होस्टेड पूल **.113** मशीन (`tomni-proxmox-113`) पर चलता है। 2026-10-18 से प्रत्येक
OmniRoute रनर की **एक भूमिका**, एक लेबल और उसके वर्कलोड के मापे गए उपयोग के अनुरूप मेमोरी/CPU बजट
है। Turbopack स्लॉट को बिल्ड की आवश्यकतानुसार संसाधन मिलते हैं; अन्य स्लॉट अपने
मापे गए अधिकतम उपयोग के अनुसार आकारित हैं। मशीन केवल तभी क्षमता से अधिक संसाधन आवंटित करती है, जब कोई Turbopack बिल्ड, Release-Green
webpack बिल्ड और lint जॉब एक साथ चलते हैं; होस्ट swap (16 GB) इसे संभाल लेता है, और क्योंकि pull-request बिल्ड
होस्टेड रनर पर चलते हैं, इसलिए Turbopack स्लॉट अधिकांश समय निष्क्रिय रहता है:

| रनर                  | लेबल           | भूमिका                                                                                                                                              | `MemoryHigh` / `MemoryMax` | `CPUQuota`     |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack बिल्ड: `ci.yml` `Build` (केवल push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, रात्रिकालीन a11y बिल्ड | 56 GB / 60 GB (swap 0)     | 1600 %         |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack बिल्ड                                                                                       | 20 GB / 24 GB (swap 4 GB)  | 800 %          |
| `omniroute-113-2`    | `omni-light`   | रात्रिकालीन जॉब (Schemathesis, promptfoo, garak, k6) और `quality.yml` `lint-guard`                                                                  | 12 GB / 16 GB (swap 4 GB)  | 600 %          |
| `omniroute-113`      | `omni-light`   | ऊपर वाला ही पूल                                                                                                                                     | 8 GB / 12 GB               | 400 %          |
| OmniHeuris, OmniMind | (उनके repos)   | केवल Dependabot (प्रत्येक का अधिकतम उपयोग 155 MB, 2026-10-18)                                                                                       | 4 GB / 6 GB                | प्रत्येक 200 % |

2026-10-18 को मापा गया:

| संसाधन    | मान                          | शेड्यूलिंग के लिए इसका अर्थ                                                                                                                                                                                                                                                                                                                                                   |
| --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 कोर**           | बिना सीमा वाले Turbopack production बिल्ड का अधिकतम उपयोग 49 GB था (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8 पर केवल compile चरण ही ~40 GB बनाए रखता है (`next-build` में 36 GB RSS और 3 GB वाले 17 loader workers, 2026-10-18 को मापा गया); webpack बिल्ड का उपयोग ~14–16 GB था। एक Turbopack + एक webpack बिल्ड साथ चल सकते हैं; दो Turbopack बिल्ड नहीं |
| swap      | 16 GB                        | `omniroute-113-5` swap बंद (`MemorySwapMax=0`) रखकर चलता है, ताकि अनियंत्रित बिल्ड मशीन को swap में धकेलने के बजाय अपनी सीमा पर समाप्त कर दिया जाए                                                                                                                                                                                                                            |
| `/tmp`    | **12 GB tmpfs = RAM**        | यहाँ रखी गई कोई भी चीज़ मेमोरी का उपयोग करती है; बची हुई फ़ाइलें 3 घंटे बाद हटा दी जाती हैं                                                                                                                                                                                                                                                                                   |
| CPU       | 32 कोर पर load 60 देखा गया   | quotas से पहले, इसी मशीन पर एक Turbopack बिल्ड (~1166 % CPU) और coverage suite ने अन्य listeners के heartbeats को संसाधनों से वंचित कर दिया था (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                          |
| रनर       | **7 listeners** (2026-10-28) | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` पर `omni-build` भी है; `omniroute-113-3/-4/-8` को रिपॉज़िटरी से हटा दिया गया (2026-10-28)                                                                                                                                                                                                                              |

सीमाएँ प्रत्येक unit की `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` में हैं
(पिछले मान `override.conf.bak-20261018` के रूप में रखे गए हैं) और उन्हें
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` के साथ लाइव लागू किया गया था—कोई restart नहीं हुआ, इसलिए किसी
चल रहे जॉब पर प्रभाव नहीं पड़ा। लेबल runners API के माध्यम से बदले जाते हैं (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), और यह भी लाइव होता है।

## जनिटर इंस्टॉल करें (एक बार, मशीन पर)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): हर 30 मिनट में, लॉग /var/log/runner-janitor.log में
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` आवश्यक है: जनिटर किसी पथ को हटाने से पहले खुली फ़ाइलों के एक snapshot से यह साबित करता है कि वह निष्क्रिय है, और इस टूल के बिना वह कुछ भी नहीं हटाता तथा इसकी सूचना देता है (exit 1)। किसी भी बदलाव को पहले `--dry-run` के साथ आज़माएँ — यह ठीक वही प्रिंट करता है जो वह करेगा और किसी चीज़ को छूता नहीं है।

हर रन में यह क्या करता है: **tmpfs पर 3 घंटे** और डिस्क के `_work/_temp` पर 24 घंटे बाद हमारे अपने बचे हुए अवशेषों (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) को साफ़ करता है; 75 मिनट से पुराने `next-build` को समाप्त करता है (कोई जॉब इतनी देर नहीं चलता — 2026-08-27 को GitHub द्वारा उसका जॉब गुम घोषित किए जाने के बाद भी एक जॉब 70 मिनट तक चला था); उन रनरों के 48 घंटे पुराने checkouts हटाता है जिनकी यूनिट **रुकी हुई** है; डिस्क ≥ 85 %, memory PSI `full/avg60` ≥ 10 %, और `MAX_ACTIVE_RUNNERS` से अधिक listeners होने पर चेतावनी देता है (omniroute/अन्य के विवरण सहित)। Exit 1 = ध्यान देने की आवश्यकता है; लॉग पढ़ें।

75-मिनट का नियम उस बिल्ड को नहीं पकड़ता जिसका जॉब GitHub पहले ही छोड़ चुका है। जब `Runner.Listener` अपने जॉब का नवीनीकरण नहीं कर पाता, तो `_diag/Runner_*.log` में `POST request to …/renewjob timed out after 100 seconds` दिखाई देता है, API अंतिम सफल नवीनीकरण के लगभग दस मिनट बाद जॉब को `completed` (विफलता) रिपोर्ट करता है, और `next-build` बिना किसी संलग्न जॉब के चलता रहता है (2026-10-18: #17066 का Build 19:43 पर विफल हुआ था और पाँच मिनट बाद भी उसका बिल्ड 40 GB घेरे हुए था)। नवीनतम `_diag/Worker_*.log` में ref की पुष्टि करें, फिर केवल बिल्ड ट्री को PID के आधार पर SIGTERM भेजें — `next-build`, `npm run build`, `build-next-isolated.mjs` और `_work` workers। `Runner.Listener`, `RunnerService.js` या `Runner.Worker` को कभी न छुएँ: worker जॉब को रद्द हुआ रिपोर्ट करता है और listener अपने-आप फिर से ऑनलाइन हो जाता है।

## रनर यूनिट्स: KillMode

रनर का डिफ़ॉल्ट `KillMode=process`, किसी यूनिट को रोकने या पुनः आरंभ करने पर `Runner.Worker → npm → next-build` को चालू छोड़ देता है — कोई अनाथ बिल्ड बिना संलग्न जॉब के RAM और CPU का उपयोग करता रहता है। प्रत्येक OmniRoute यूनिट में एक drop-in (`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`) होता है, जिसमें `KillMode=mixed` सेट है: पहले listener को SIGTERM, फिर `TimeoutStop` पर पूरे cgroup को SIGKILL। यह यूनिट के अगले पुनः आरंभ पर प्रभावी होता है — निष्क्रियता की जाँच और पुनः आरंभ को एक ही कमांड में रखते हुए, **एक समय में केवल एक रनर और केवल उसके निष्क्रिय होने पर** पुनः आरंभ करें।

## संचालन नियम

- **एक समय में केवल एक Turbopack बिल्ड — लेबल द्वारा लागू।** पूर्ण Turbopack
  `next build` चलाने वाला प्रत्येक जॉब `[self-hosted, omni-build]` को लक्षित करता है, और केवल **`omniroute-113-5`** पर वह
  लेबल है: `ci.yml` का `Build`, `npm-publish.yml` का `publish`, `nightly-v4-build`, `preview-artifact`,
  रात्रिकालीन a11y बिल्ड (#16853) और `docker-publish.yml` का **amd64** (BuildKit के भीतर webpack —
  वहाँ Turbopack पैनिक हुआ था, रन 33253576569)। arm64 Docker चरण `ubuntu-24.04-arm` पर ही रहता है।
  `docker-publish` का amd64, `ci.yml` के `Build` के साथ `heavy-build-main` concurrency group साझा करता है
  (`cancel-in-progress: false`)। Docker Engine का `omniroute-113-5` पर होना आवश्यक है। दूसरा Turbopack
  स्लॉट 78 GB में फ़िट नहीं होता (2 × 33–37 GB और साथ में मशीन का शेष लोड); दूसरा स्लॉट केवल
  webpack बिल्ड के लिए सुरक्षित है।
- **पुल-रिक्वेस्ट Builds होस्टेड रनर पर चलते हैं (2026-10-18)।** `ci.yml` का `Build` केवल
  `push` और `workflow_dispatch` के लिए `omni-build` तक पहुँचता है; प्रत्येक `pull_request` (अपने origin या fork से) और `merge_group` Build
  webpack के साथ `ubuntu-latest` पर चलता है। अपने origin की प्रत्येक PR को स्लॉट पर भेजने के कारण, एक Turbopack
  Build ने उसे 29–58 मिनट तक व्यस्त रखा, 18 Builds अधिकतम 18 घंटे तक कतार में रहे, और release line के अपने push Build को
  40 जॉब में केवल एक बार स्लॉट मिला। होस्टेड रनर पर वही PR Build, PR के अन्य
  जॉब के साथ 8–12 मिनट लेता है। `npm-publish` द्वारा भेजा जाने वाला बंडलर Turbopack, release line पर
  default branch के रात्रिकालीन a11y बिल्ड (04:41 UTC), स्लॉट तक पहुँचने वाले प्रत्येक push या dispatch Build,
  और स्वयं `npm-publish` द्वारा लगातार परखा जाता है। `tests/unit/build/heavy-build-queue.test.ts`
  चार-शर्तों वाले गेट को सुनिश्चित करता है।
- **Turbopack स्लॉट का आकार उसकी मापी गई आवश्यकता से कभी कम न करें।** 2026-10-18 को 18:06 बजे
  `omni-release` के लिए जगह बनाने हेतु स्लॉट को 56G/60G से घटाकर 40G/44G कर दिया गया था। compile चरण अपने
  पूरे रन के दौरान `MemoryHigh` पर अटका रहा (memory PSI `full` 30–43 %), और उसी cgroup को साझा करने वाला
  `Runner.Listener` अपने जॉब को नवीनीकृत नहीं कर सका। 2026-10-17 का स्वामी-निर्धारित 56G/60G
  उसी दिन बहाल कर दिया गया। इस मान से नीचे बिल्ड विफल नहीं होता; वह thrash करता है, और जॉब खो जाता है।
- **Release-Green का अपना स्लॉट है (2026-10-18)।** तब तक दोनों Release-Green validations
  `omni-build` पर चलते थे: प्रत्येक push पर (~10/घंटा, एक दिन में 100 push रन में से 97 काम के बीच में रद्द हुए)
  और दिन में तीन ~2 घंटे के पूर्ण sweeps (05:29 वाले sweep ने स्लॉट के लिए 6 घंटे प्रतीक्षा की) — एकमात्र build
  स्लॉट पर उसकी क्षमता से कई गुना अधिक भार था और अपने origin की PR Builds को घंटों प्रतीक्षा करनी पड़ती थी।
  `release-green` और `main-green` अब `OMNIROUTE_USE_TURBOPACK=0` के साथ `omni-release`
  (केवल `omniroute-113-6`) को लक्षित करते हैं, और शुरू हुआ रन अब किसी नए push द्वारा रद्द नहीं किया जाता (लंबित
  स्लॉट अब भी आने वाले जॉब की बाढ़ को समेट देता है)। `tests/unit/build/runner-capacity-routing.test.ts`
  routing, webpack switch और इस बात को सुनिश्चित करता है कि `omni-release` पर कुछ भी Turbopack से बिल्ड न हो।
- **हल्का पूल: `omni-light`।** `omniroute-113` और `omniroute-113-2` वे रात्रिकालीन जॉब चलाते हैं जिन्हें
  केवल backend वाला `next build` (~5–6 GB; webpack) और `quality.yml` का `lint-guard` चाहिए। `omniroute-113`
  पर 2026-10-18 तक `MemoryHigh=4G` था — promptfoo बिल्ड वहाँ 54 मिनट तक reclaim करते हुए आगे बढ़ता रहा;
  8 GB throttling समाप्त कर देता है।
- **जानबूझकर कम listeners।** 2026-08-29 को चार OmniRoute units अक्षम किए गए थे — प्रत्येक अतिरिक्त
  listener ऊपर दिए गए memory budget का एक और tenant है। janitor की अधिकतम सीमा 8 है (cron में `MAX_ACTIVE_RUNNERS=8`): यह
  मशीन पर प्रत्येक `Runner.Listener` की गणना करता है, और हमारे पाँच के अतिरिक्त OmniHeuris + OmniMind दो और जोड़ते हैं।
- **Unit और Vitest जॉब होस्टेड ही रहते हैं।** `ci.yml` अपने unit shards और Vitest जॉब को
  `[self-hosted, omni-ci]` पर केवल तभी भेजता है जब रिपॉज़िटरी वेरिएबल `vars.USE_VPS_TEST_RUNNER`
  `true` हो, और तब भी केवल उसी रिपॉज़िटरी के `pull_request` रन के लिए; forks, `merge_group` और पुश
  `ubuntu-latest` पर ही रहते हैं (`tests/unit/vps-runner-variable-scope.test.ts`)। वेरिएबल
  `false` है। 2026-10-28 को तीन 4-कोर `omni-ci` listeners ने `npm ci` में 250–270 s लिए और हर
  unit shard 30-मिनट की जॉब सीमा तक पहुँच गया, जबकि होस्टेड shard में ~634 s लगते हैं; उस समय मशीन का load
  17–24 था। listeners हटा दिए गए। unit shard के अनुरूप आकार वाले listeners के बिना वेरिएबल को
  फिर से चालू न करें।
- **किसी भी runner के व्यस्त रहने के दौरान `/tmp` या `_work` को कभी हाथ से साफ़ न करें।**
  जाँच और deletion के बीच अंतराल वाले check-then-delete के कारण 2026-08-27 को एक सक्रिय Build जॉब ने अपना
  `_work` खो दिया था। janitor जाँच और removal को एक ही चरण में करता है;
  उसे ही यह करने दें।
- किसी runner को जॉब के बीच में रोकने से जॉब रद्द हो जाता है (प्रत्यक्ष रूप से देखा गया): `systemctl stop` केवल
  तभी चलाएँ जब उसके listener की कोई `Runner.Worker` child process न हो — और इसे एक ही command में करें।
- Workflows को artefacts `/tmp` में नहीं रखने चाहिए (यह RAM है)। उन्हें
  `$RUNNER_TEMP` में डाउनलोड करें (डिस्क पर, प्रत्येक runner के लिए अलग) — 1.3 GB के `next-build` artefact को tmpfs पर उतरने में 27–32
  मिनट लगे, जबकि डिस्क से upload होने में 2 मिनट लगे।
- `.15` VPS केवल homologation के लिए है — उस पर CI runners कभी नहीं चलते।

## होस्टेड लेन (GitHub-होस्टेड धावक)

रिपॉजिटरी `cheaper-inference` संगठन से संबंधित है** टीम** योजना:** 60 समवर्ती होस्ट की गई नौकरियाँ** , संगठन में प्रत्येक रिपॉजिटरी, प्रत्येक PR चेक, प्रत्येक पुश-ट्रिगर वर्कफ़्लो और CodeQL के डिफ़ॉल्ट सेटअप द्वारा साझा किया जाता है। नीचे दिए गए आंकड़ों को पर मापा गया था** प्रो** योजना (40 समवर्ती होस्ट की गई नौकरियाँ)। मर्ज अभियान के दौरान 2026-10-18 को मापा गया (~ 10 merges/hour on `release/v3.8.52`):** 24 घंटे में 2,500 वर्कफ़्लो रन बनाए गए** , 6 घंटे में शाखा पर 44 धक्के,** 106 होस्ट की गई नौकरियाँ कतार में हैं** जबकि PR चेक घंटों तक इंतजार करते रहे और PRs उनके बिना ही मर्ज कर दिया गया। शाखा में प्रत्येक धक्का पर नौ वर्कफ़्लो सक्रिय किए गए:

| `release/v*` को प्रति धक्का                 | होस्ट की गई नौकरियाँ | तूफान के तहत परिणाम                                               | 2026-10-18 से                                                                     |
| ------------------------------------------- | -------------------: | ----------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `ci.yml` (पूर्ण मैट्रिक्स)                  |                30 तक | अगले पुश द्वारा रद्द कर दिया गया, एक दिन में 24 में से 24         | `release/**` पुश पर प्रारंभ नहीं हुआ (PR run + रिलीज़-ग्रीन)                      |
| `quality.yml`                               |                   ~6 | रद्द, 23 में से 23                                                | `release/**` पुश पर प्रारंभ नहीं हुआ                                              |
| `Release-Green` `--quick`                   |                    0 | `omni-build` पर चला, 100 में से 97 रद्द कर दिया                   | `omni-release` स्लॉट, कभी रद्द नहीं किया गया, लंबित रन ढह गया                     |
| `Lock released branch`, `OpenSSF Scorecard` |                    2 | प्रति धक्का एक कतारबद्ध रन                                        | प्रति रेफरी एक रन (`tests/unit/build/hosted-lane-concurrency.test.ts`)            |
| `Release acceptance` (छाया रिपोर्ट)         |                    1 | प्रति पुश एक होस्ट किया गया `npm ci`, कभी रद्द नहीं किया गया      | `paths:` फ़िल्टर के लिए अपरिवर्तित — उम्मीदवार                                    |
| `Publish to Docker Hub` → `Deploy to VPS`   |                    2 | प्रति धक्का रद्द; Amd64 लेग `omni-build` पर प्रतिस्पर्धा करता है  | अपरिवर्तित — स्वामी का परिनियोजन चैनल                                             |
| CodeQL डिफ़ॉल्ट सेटअप (`dynamic`)           |                    4 | `javascript-typescript`, `actions`, `c-cpp`, `python` प्रति धक्का | अपरिवर्तित — सेटिंग्स → कोड सुरक्षा; `c-cpp`/`python` यहां कुछ भी स्कैन नहीं करता |

`tests/unit/build/push-storm-diet.test.ts` `ci.yml` और `quality.yml` के `main` -only पुश ट्रिगर को पिन करता है। दुष्प्रभाव: कोडकोव को अब प्रति रिलीज़ पुश आधार अपलोड प्राप्त नहीं होता है (कदम सूचनात्मक और `continue-on-error` है); इन-रेपो कवरेज गेट और PR टिप्पणी अप्रभावित हैं।

**अधिक स्व-होस्टेड क्षमता होस्ट की गई कतार को ठीक नहीं करती है।** डेवबॉक्स (`devbox-vm-06-dev002`, 24 vCPU / 54 GB) एक धावक की मेजबानी कर सकता है, लेकिन एजेंट सत्र पहले से ही 20-26 पर अपना लोड रखता है, एजेंट कंटेनर में कोई Docker डेमॉन नहीं है, और संतृप्त लेन होस्ट की गई है। `.113` बॉक्स में 71 GB मुफ़्त था और उसी क्षण 5-8 लोड था; इसकी बाधा उपरोक्त प्रति-श्रोता मेमोरी बजट है (छह श्रोता), न कि CPU। शेष लीवर प्रक्रिया वाले हैं: मर्जिफाई कतार के माध्यम से भूमि अभियान PRs (`label=queue`, बैच प्रति PR प्लस एक रन प्रति पुश के बजाय एक `merge_group` CI रन साझा करते हैं), CodeQL डिफ़ॉल्ट-सेटअप भाषाओं को ट्रिम करें, और `release-acceptance.yml` को पढ़ने वाली फ़ाइलों के अनुसार फ़िल्टर करें।

> **2026-11-19: मर्जिफाई मर्ज कतार समाप्त हो गई है** (मालिक का निर्णय). `.mergify.yml` अब एक कतार को परिभाषित नहीं करता है और मर्जिफाई कमांड को अस्वीकार कर देता है जो पुल अनुरोध को मर्ज या फिर से लिखता है। रिलीज़ PRs रिपॉजिटरी नियम के तहत हाथ से मर्ज किया जाता है "सक्रिय रिलीज़ पर ग्रीन गेट्स की आवश्यकता है" (`Gate / CI` + `Gate / Quality`) जब तक ओमनी-क्यू लाइव मोड में नहीं चलता है, और उसके बाद ओमनी-क्यू के माध्यम से ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) )। उपरोक्त मर्जिफाई लीवर अब मौजूद नहीं है।
