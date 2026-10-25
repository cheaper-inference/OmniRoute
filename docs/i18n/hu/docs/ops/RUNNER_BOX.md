# Self-Hosted Runner Box Operations (.113 pool) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

A saját üzemeltetésű pool a **.113** gépen (`tomni-proxmox-113`) fut. 2026-10-18 óta minden
OmniRoute-runnernek **egyetlen szerepe**, egy címkéje, valamint a munkaterhelés mért igényeihez
méretezett memória- és CPU-kerete van. A Turbopack-hely annyi erőforrást kap, amennyire a buildnek
szüksége van; a többi hely a mért csúcsterheléséhez van méretezve. A gépen csak akkor történik
túlfoglalás, amikor egy Turbopack-build egy Release-Green webpack-builddel és egy lintfeladattal
esik egybe; ezt a gazdagép swapja (16 GB) kezeli, és mivel a pull requestek buildjei hosztolt
runnereken futnak, a Turbopack-hely az idő nagy részében üresjáratban van:

| runner               | címke          | szerep                                                                                                                                                | `MemoryHigh` / `MemoryMax` | `CPUQuota`      |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack-buildek: `ci.yml` `Build` (csak push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, az éjszakai a11y-build | 56 GB / 60 GB (swap 0)     | 1600 %          |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack-build                                                                                         | 20 GB / 24 GB (swap 4 GB)  | 800 %           |
| `omniroute-113-2`    | `omni-light`   | éjszakai futások (Schemathesis, promptfoo, garak, k6) és a `quality.yml` `lint-guard`                                                                 | 12 GB / 16 GB (swap 4 GB)  | 600 %           |
| `omniroute-113`      | `omni-light`   | ugyanaz a pool, mint fent                                                                                                                             | 8 GB / 12 GB               | 400 %           |
| OmniHeuris, OmniMind | (saját repóik) | csak Dependabot (egyenként 155 MB-os csúcs, 2026-10-18)                                                                                               | 4 GB / 6 GB                | egyenként 200 % |

Mérés időpontja: 2026-10-18:

| erőforrás | érték                   | mit jelent ez az ütemezés szempontjából                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 mag**      | egy Turbopack production build korlátozás nélkül 49 GB-os csúcsot ért el (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8 alatt önmagában a fordítási fázis ~40 GB-ot foglal (36 GB RSS a `next-build` folyamatban, valamint 17 loader worker egyenként 3 GB-tal, mérve: 2026-10-18); egy webpack-build ~14–16 GB-ot használ. Egy Turbopack- és egy webpack-build együtt elfér; két Turbopack-build nem |
| swap      | 16 GB                   | az `omniroute-113-5` kikapcsolt swappal (`MemorySwapMax=0`) fut, így egy elszabadult buildet a korlátjánál leállít a rendszer ahelyett, hogy a gépet swapelésre kényszerítené                                                                                                                                                                                                                                       |
| `/tmp`    | **12 GB tmpfs = RAM**   | minden, amit itt tárolunk, memóriát foglal; a maradványokat 3 óra után eltávolítja a rendszer                                                                                                                                                                                                                                                                                                                       |
| CPU       | 60-as terhelés 32 magon | a kvóták előtt egy Turbopack-build (~1166 % CPU) és az ugyanazon a gépen futó coverage tesztcsomag együtt kiéheztette a többi listener heartbeatjeit (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                          |
| runnerek  | **6 listener**          | 4 OmniRoute + OmniHeuris + OmniMind; az `omniroute-113-3/-4/-7/-8` le van tiltva (a `systemctl enable --now` paranccsal bármelyik újra bekapcsolható)                                                                                                                                                                                                                                                               |

A korlátok az egyes unitok `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
fájljában találhatók (a korábbi értékeket az `override.conf.bak-20261018` őrzi), és futás közben,
újraindítás nélkül lettek alkalmazva a
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` paranccsal, így egyetlen
futó feladatot sem érintettek. A címkék szintén futás közben módosíthatók a runners API-n keresztül
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`).

## A takarító telepítése (egyszeri alkalommal, a gépen)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): 30 percenként, naplózás a /var/log/runner-janitor.log fájlba
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Az `lsof` kötelező: a takarító a megnyitott fájlok egyetlen pillanatfelvételével
ellenőrzi, hogy egy elérési út nincs használatban, mielőtt eltávolítaná; az eszköz
nélkül semmit sem távolít el, és ezt jelzi is (exit 1). Minden módosítást először
a `--dry-run` kapcsolóval próbálj ki — pontosan kiírja, mit tenne, és semmihez sem nyúl.

Minden futáskor a következőket végzi el: eltakarítja a saját maradványainkat
(`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) **3 óra után tmpfs-en**,
illetve 24 óra után a lemezen lévő `_work/_temp` könyvtárból; leállítja a 75 percnél
régebbi `next-build` folyamatokat (egyetlen feladat sem fut ennyi ideig — 2026-08-27-én
az egyik 70 percig futott azután, hogy a GitHub már elveszettnek nyilvánította a
feladatát); eltávolítja azoknak a futtatóknak a 48 óránál régebbi munkapéldányait,
amelyek egysége **le van állítva**; riaszt, ha a lemezhasználat ≥ 85%, a memória PSI
`full/avg60` értéke ≥ 10%, vagy a figyelők száma meghaladja a `MAX_ACTIVE_RUNNERS`
értékét (omniroute/egyéb bontásban). Exit 1 = beavatkozás szükséges; olvasd el a naplót.

A 75 perces szabály nem észleli azt a buildet, amelynek feladatáról a GitHub már
lemondott. Ha a `Runner.Listener` nem tudja megújítani a feladatát, a
`_diag/Runner_*.log` fájlban ez jelenik meg:
`POST request to …/renewjob timed out after 100 seconds`; az API az utolsó sikeres
megújítás után körülbelül tíz perccel `completed` (failure) állapotúnak jelenti a
feladatot, a `next-build` pedig hozzárendelt feladat nélkül tovább fut
(2026-10-18: a #17066 buildje 19:43-kor sikertelen lett, de a buildje öt perccel
később még mindig 40 GB-ot foglalt). Ellenőrizd a refet a legújabb
`_diag/Worker_*.log` fájlban, majd PID alapján csak a build folyamatfájának küldj
SIGTERM jelzést — a `next-build`, az `npm run build`, a `build-next-isolated.mjs`
és a `_work` workerfolyamatok számára. Soha ne nyúlj a `Runner.Listener`,
`RunnerService.js` vagy `Runner.Worker` folyamatokhoz: a worker megszakítottként
jelenti a feladatot, a listener pedig magától újra online állapotba kerül.

## Futtatóegységek: KillMode

A futtató alapértelmezett `KillMode=process` beállítása életben hagyja a
`Runner.Worker → npm → next-build` folyamatláncot az egység leállításakor vagy
újraindításakor — egy árva build hozzárendelt feladat nélkül tovább fogyasztja a
RAM-ot és a CPU-t. Minden OmniRoute-egységhez tartozik egy felülbíráló konfiguráció
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
`KillMode=mixed` beállítással: először SIGTERM jelzést küld a listenernek, majd a
`TimeoutStop` elérésekor SIGKILL jelzést küld a teljes cgroupnak. A beállítás az
egység következő újraindításakor lép életbe — egyszerre **csak egy futtatót indíts
újra, kizárólag akkor, amikor tétlen**, és a tétlenség ellenőrzését, valamint az
újraindítást ugyanabban a parancsban végezd el.

## Üzemeltetési szabályok

- **Egyszerre csak egy Turbopack-build — címkével kikényszerítve.** Minden teljes Turbopack
  `next build` parancsot futtató feladat a `[self-hosted, omni-build]` célra irányul, és csak az
  **`omniroute-113-5`** rendelkezik ezzel a címkével: `ci.yml` `Build`, `npm-publish.yml` `publish`,
  `nightly-v4-build`, `preview-artifact`, az éjszakai a11y-build (#16853), valamint a
  `docker-publish.yml` **amd64** ága (webpack a BuildKiten belül — a Turbopack ott pánikhibával
  leállt, 33253576569-es futás). Az arm64 Docker-ág továbbra is az `ubuntu-24.04-arm` célon marad.
  A `docker-publish` amd64 ága megosztja a `heavy-build-main` konkurenciacsoportot a `ci.yml`
  `Build` feladatával (`cancel-in-progress: false`). A Docker Engine-nek az `omniroute-113-5`
  gépen kell lennie. Egy második Turbopack-hely nem fér bele a 78 GB-ba (2 × 33–37 GB, plusz a
  gép többi terhelése); egy második hely csak webpack-buildekhez biztonságos.
- **A pull requestek Build feladatai hosztolt futtatókon futnak (2026-10-18).** A `ci.yml` `Build`
  csak `push` és `workflow_dispatch` esetén jut el az `omni-build` célra; minden `pull_request`
  (saját eredetű vagy forkból érkező) és `merge_group` Build az `ubuntu-latest` célon, webpackkel
  fut. Amikor minden saját eredetű PR erre a helyre volt irányítva, egy Turbopack-Build 29–58
  percig foglalta azt, 18 Build akár 18 órán át várakozott, és a kiadási ág saját push Buildje
  40 feladatból egyszer kapta meg a helyet. Hosztolt futtatón ugyanez a PR-Build 8–12 percig tart
  a PR többi feladata mellett. A Turbopack, vagyis az `npm-publish` által szállított bundler,
  továbbra is tesztelve van a kiadási ágon az alapértelmezett ág éjszakai a11y-buildje (04:41 UTC),
  minden, a helyet elérő push- vagy dispatch-Build, valamint maga az `npm-publish` által.
  A `tests/unit/build/heavy-build-queue.test.ts` rögzíti a négyfeltételes kaput.
- **Soha ne méretezd a Turbopack-helyet a mért igénye alá.** 2026-10-18-án 18:06-kor a hely
  56G/60G-ről 40G/44G-re lett csökkentve, hogy hely jusson az `omni-release` számára. A fordítási
  fázis a teljes futás alatt elérte a `MemoryHigh` értéket (a memória-PSI `full` értéke 30–43 %
  volt), és az ugyanazt a cgroupot használó `Runner.Listener` nem tudta megújítani a feladatát.
  A tulajdonos 2026-10-17-i 56G/60G értéke még aznap vissza lett állítva. Ez alatt az érték alatt
  a build nem hibával áll le; vergődik, és a feladat elveszik.
- **A Release-Green saját hellyel rendelkezik (2026-10-18).** Addig mindkét Release-Green-validáció
  az `omni-build` célon futott: minden push esetén (~10/óra, egyetlen nap alatt 100 push-futásból
  97-et munka közben megszakítottak), továbbá naponta három, egyenként ~2 órás teljes ellenőrzés
  során (a 05:29-es ellenőrzés 6 órát várt a helyre) — az egyetlen buildhely kapacitása többszörösen
  túl volt terhelve, a saját eredetű PR-Buildek pedig órákig várakoztak. A `release-green` és a
  `main-green` most az `omni-release` célra irányul (kizárólag `omniroute-113-6`),
  `OMNIROUTE_USE_TURBOPACK=0` beállítással, és egy megkezdett futást már nem szakít meg egy újabb
  push (a várakozó hely továbbra is összevonja a beáramló futásokat).
  A `tests/unit/build/runner-capacity-routing.test.ts` rögzíti az útválasztást, a webpackre
  váltást, valamint azt, hogy az `omni-release` célon semmi sem buildelhet Turbopackkel.
- **Könnyű feladatok készlete: `omni-light`.** Az `omniroute-113` és az `omniroute-113-2` futtatja
  azokat az éjszakai feladatokat, amelyekhez csak backendet érintő `next build` szükséges
  (~5–6 GB; webpack), valamint a `quality.yml` `lint-guard` feladatát. Az `omniroute-113`
  `MemoryHigh=4G` beállítással rendelkezett 2026-10-18-ig — a promptfoo-build ott 54 percen át
  memóriavisszanyeréssel küszködött; a 8 GB megszünteti a fojtást.
- **Szándékosan kevesebb listener.** Négy OmniRoute-egységet letiltottunk 2026-08-29-én — minden
  további listener egy újabb fogyasztója a fenti memóriakeretnek. A janitor felső korlátja 6
  (`MAX_ACTIVE_RUNNERS=6` a cronban): a gépen lévő összes `Runner.Listener` példányt számolja,
  az OmniHeuris és az OmniMind pedig további kettőt ad a mi négy példányunkhoz.
- **Soha ne tisztítsd kézzel a `/tmp` vagy az `_work` könyvtárat, amíg bármely runner foglalt.**
  Egy ellenőrzés, majd az attól időben elkülönülő törlés miatt veszítette el egy élő Build-feladat
  az `_work` könyvtárát 2026-08-27-én. A janitor egyetlen lépésben végzi el az ellenőrzést és az
  eltávolítást; bízd rá.
- Egy runner feladat közbeni leállítása megszakítja a feladatot (élőben megfigyelve): a
  `systemctl stop` csak akkor használható, ha a listenernek nincs `Runner.Worker` gyermekfolyamata
  — és mindezt egyetlen parancsban kell elvégezni.
- A workflow-k nem tárolhatnak artefaktumokat a `/tmp` könyvtárban (az RAM-ban van). A letöltés
  célja a `$RUNNER_TEMP` legyen (lemezen található, runnerenként külön) — az 1,3 GB-os
  `next-build` artefaktum tmpfs-re történő letöltése 27–32 percig tartott, míg a lemezről
  történő feltöltése 2 percig.
- A `.15` VPS kizárólag homologációs célú — soha nem futtat CI-runnereket.

## Hosztolt sáv (GitHub által hosztolt futtatók)

A fiók **Pro** csomagot használ: **40 egyidejű hosztolt feladat**, amelyen minden PR-ellenőrzés,
minden push által kiváltott munkafolyamat és a CodeQL alapértelmezett beállítása osztozik. A
2026-10-18-án, egy összevonási kampány során (~10 összevonás/óra a `release/v3.8.52` ágon)
végzett mérés szerint: **2 500 munkafolyamat-futtatás jött létre 24 óra alatt**, 6 óra alatt
44 push érkezett az ágra, és **106 hosztolt feladat állt sorban**, miközben a PR-ellenőrzések
órákig várakoztak, a PR-eket pedig nélkülük vonták össze. Az ágra történő minden push esetén
kilenc munkafolyamat indult el:

| pushonként a `release/v*` ágra               | hosztolt feladatok | eredmény a terhelési hullám alatt                                          | 2026-10-18 óta                                                                    |
| -------------------------------------------- | -----------------: | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `ci.yml` (teljes mátrix)                     |      legfeljebb 30 | a következő push megszakította, egy nap alatt 24-ből 24-et                 | nem indul el `release/**` pushoknál (PR-futtatás + Release-Green)                 |
| `quality.yml`                                |                 ~6 | megszakítva, 23-ból 23                                                     | nem indul el `release/**` pushoknál                                               |
| `Release-Green` `--quick`                    |                  0 | az `omni-build` alatt futott, 100-ból 97 megszakítva                       | `omni-release` hely, soha nincs megszakítva, a függő futtatások összevonódnak     |
| `Lock released branch`, `OpenSSF Scorecard`  |                  2 | pushonként egy sorban álló futtatás                                        | refenként egy futtatás (`tests/unit/build/hosted-lane-concurrency.test.ts`)       |
| `Release acceptance` (árnyékjelentés)        |                  1 | pushonként egy hosztolt `npm ci`, soha nincs megszakítva                   | változatlan — alkalmas lehet egy `paths:` szűrőre                                 |
| `Publish to Docker Hub` → `Deploy to VPS`    |                  2 | pushonként megszakítva; az amd64 ág az `omni-build` erőforrásaiért verseng | változatlan — a tulajdonos telepítési csatornája                                  |
| CodeQL alapértelmezett beállítás (`dynamic`) |                  4 | pushonként `javascript-typescript`, `actions`, `c-cpp`, `python`           | változatlan — Settings → Code security; a `c-cpp`/`python` itt semmit sem vizsgál |

A `tests/unit/build/push-storm-diet.test.ts` rögzíti a `ci.yml` és a `quality.yml` kizárólag
`main` ágra vonatkozó push-eseményindítóját. Mellékhatás: a Codecov többé nem kap alapfeltöltést
minden release push után (a lépés csak tájékoztató jellegű, és `continue-on-error`); a
repozitóriumon belüli lefedettségi kaput és a PR-megjegyzést ez nem érinti.

**A nagyobb saját hosztolású kapacitás nem oldja meg a hosztolt várólista problémáját.** A devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) futtathatna egy futtatót, de az ügynökmunkamenetek már
így is 20–26 között tartják a terhelését, az ügynökkonténerben nincs Docker-démon, és a
telített sáv a hosztolt sáv. Ugyanebben a pillanatban a `.113` gépen 71 GB szabad hely volt,
5–8-as terhelés mellett; annak korlátját a figyelőnkénti fenti memóriakeret jelenti
(legfeljebb 6 figyelő), nem pedig a CPU. A fennmaradó lehetőségek folyamatszervezési jellegűek:
a kampány PR-jeit a Mergify várólistáján keresztül kell integrálni (`label=queue`; a kötegek
egyetlen `merge_group` CI-futtatáson osztoznak a PR-enkénti egy futtatás és a pushonkénti egy
futtatás helyett), csökkenteni kell a CodeQL alapértelmezett beállításában szereplő nyelvek
számát, valamint az általa olvasott fájlok alapján kell szűrni a `release-acceptance.yml`
munkafolyamatot.
