# Self-Hosted Runner Box Operations (.113 pool) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Samostatne hostovaný fond beží na serveri **.113** (`tomni-proxmox-113`). Od 2026-10-18 má každý
runner OmniRoute **jednu úlohu**, jeden štítok a pamäťový/CPU rozpočet nastavený podľa nameranej
záťaže. Slot Turbopack má zdroje potrebné na zostavenie; ostatné sloty sú dimenzované podľa svojich
nameraných špičiek. Server prekračuje dostupnú kapacitu iba vtedy, keď sa zostavenie Turbopack prekrýva
so zostavením webpack pre Release-Green a úlohou lint; túto situáciu absorbuje swap hostiteľa (16 GB),
a keďže zostavenia pre pull requesty bežia na hostovanej infraštruktúre, slot Turbopack je väčšinu času nečinný:

| runner               | štítok           | úloha                                                                                                                                                  | `MemoryHigh` / `MemoryMax` | `CPUQuota`      |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------- |
| `omniroute-113-5`    | `omni-build`     | zostavenia Turbopack: `ci.yml` `Build` (iba push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, nočné zostavenie a11y | 56 GB / 60 GB (swap 0)     | 1600 %          |
| `omniroute-113-6`    | `omni-release`   | Release-Green (`release-green` + `main-green`), zostavenie webpack                                                                                     | 20 GB / 24 GB (swap 4 GB)  | 800 %           |
| `omniroute-113-2`    | `omni-light`     | nočné úlohy (Schemathesis, promptfoo, garak, k6) a `quality.yml` `lint-guard`                                                                          | 12 GB / 16 GB (swap 4 GB)  | 600 %           |
| `omniroute-113`      | `omni-light`     | rovnaký fond ako vyššie                                                                                                                                | 8 GB / 12 GB               | 400 %           |
| OmniHeuris, OmniMind | (ich repozitáre) | iba Dependabot (špička 155 MB pre každý, 2026-10-18)                                                                                                   | 4 GB / 6 GB                | 200 % pre každý |

Merané 2026-10-18:

| zdroj     | hodnota                                | čo to znamená pre plánovanie                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 jadier**                  | produkčné zostavenie Turbopack dosiahlo bez obmedzenia špičku 49 GB (`tests/unit/ci-build-bundler-webpack.test.ts`); v Next 16.3.8 samotná fáza kompilácie zaberá ~40 GB (36 GB RSS v `next-build` plus 17 procesov loadera po 3 GB, merané 2026-10-18); zostavenie webpack približne 14–16 GB. Jedno zostavenie Turbopack a jedno zostavenie webpack sa zmestia súčasne; dve zostavenia Turbopack nie |
| swap      | 16 GB                                  | `omniroute-113-5` beží s vypnutým swapom (`MemorySwapMax=0`), takže nekontrolované zostavenie sa ukončí pri dosiahnutí svojho limitu namiesto toho, aby server začal swapovať                                                                                                                                                                                                                          |
| `/tmp`    | **12 GB tmpfs = RAM**                  | všetko, čo sa tam uloží, zaberá pamäť; zvyšky sa odstraňujú po 3 h                                                                                                                                                                                                                                                                                                                                     |
| CPU       | zaznamenané zaťaženie 60 na 32 jadrách | pred zavedením kvót jedno zostavenie Turbopack (~1166 % CPU) spolu so súpravou testov pokrytia na tom istom serveri pripravili ostatné listenery o heartbeat komunikáciu (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                         |
| runnery   | **6 listenerov**                       | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` sú deaktivované (`systemctl enable --now` jeden z nich znova aktivuje)                                                                                                                                                                                                                                                                 |

Limity sa nachádzajú v súbore `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
každej jednotky (predchádzajúce hodnoty sú uložené ako `override.conf.bak-20261018`) a boli aplikované
za behu pomocou `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — bez
reštartu, takže nebola ovplyvnená žiadna spustená úloha. Štítky sa menia prostredníctvom API runnerov
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), takisto za behu.

## Inštalácia čistiaceho skriptu (jednorazovo, na serveri)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): každých 30 min, zapisovať do /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je povinný: čistiaci skript pred odstránením overí nečinnosť cesty pomocou jednej snímky otvorených
súborov; bez tohto nástroja nič neodstráni a oznámi to
(exit 1). Každú zmenu najprv vyskúšajte s `--dry-run` — vypíše presne, čo by
urobil, a ničoho sa nedotkne.

Čo robí pri každom spustení: odstraňuje naše vlastné zvyšky (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) po **3 h na tmpfs** a po 24 h na disku
v `_work/_temp`; ukončuje proces `next-build` starší ako 75 min (žiadna úloha netrvá tak dlho — dňa
2026-08-27 jedna bežala 70 min po tom, čo GitHub označil jej úlohu za stratenú); odstraňuje 48 h staré
pracovné kópie runnerov, ktorých jednotka je **zastavená**; upozorňuje pri využití disku ≥ 85 %, memory PSI
`full/avg60` ≥ 10 % a pri väčšom počte listenerov, než určuje `MAX_ACTIVE_RUNNERS` (s
rozdelením na omniroute/ostatné). Exit 1 = vyžaduje sa pozornosť; prečítajte si log.

Pravidlo 75 minút nezachytí zostavenie, ktorého úlohu už GitHub vzdal. Keď
`Runner.Listener` nedokáže obnoviť svoju úlohu, `_diag/Runner_*.log` obsahuje
`POST request to …/renewjob timed out after 100 seconds`, API označí úlohu ako `completed`
(neúspešnú) približne desať minút po poslednom úspešnom obnovení a `next-build` naďalej beží
bez pripojenej úlohy (2026-10-18: zostavenie #17066 zlyhalo o 19:43 a jeho proces zostavenia
ešte o päť minút neskôr zaberal 40 GB). Overte ref v najnovšom `_diag/Worker_*.log` a potom
odošlite SIGTERM iba stromu zostavenia podľa PID — procesom `next-build`, `npm run build`, `build-next-isolated.mjs` a
workerom v `_work`. Nikdy sa nedotýkajte procesov `Runner.Listener`, `RunnerService.js` ani `Runner.Worker`:
worker nahlási úlohu ako zrušenú a listener sa sám vráti online.

## Jednotky runnerov: KillMode

Predvolený režim runnera `KillMode=process` ponechá procesy `Runner.Worker → npm → next-build`
spustené aj po zastavení alebo reštartovaní jednotky — osirelé zostavenie naďalej spotrebúva RAM a
CPU bez pripojenej úlohy. Každá jednotka OmniRoute obsahuje doplnkovú konfiguráciu
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
s nastavením `KillMode=mixed`: najprv odošle SIGTERM listeneru a pri
`TimeoutStop` odošle SIGKILL celej cgroup. Nastavenie sa prejaví pri nasledujúcom reštarte jednotky — reštartujte **vždy iba jeden runner,
a len keď je nečinný**, pričom kontrola nečinnosti a reštart musia byť v tom istom príkaze.

## Prevádzkové pravidlá

- **Naraz iba jedno zostavenie Turbopack — vynútené štítkom.** Každá úloha, ktorá spúšťa úplné
  `next build` s Turbopackom, cieli na `[self-hosted, omni-build]`, pričom tento štítok má iba
  **`omniroute-113-5`**: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`,
  `preview-artifact`, nočné zostavenie a11y (#16853) a **amd64** v `docker-publish.yml` (webpack
  v rámci BuildKit — Turbopack tam zlyhal s panic, beh 33253576569). Vetva Docker pre arm64 zostáva
  na `ubuntu-24.04-arm`. `docker-publish` pre amd64 zdieľa skupinu súbežnosti `heavy-build-main`
  s úlohou `Build` v `ci.yml` (`cancel-in-progress: false`). Docker Engine musí byť na
  `omniroute-113-5`. Druhý slot Turbopacku sa nezmestí do 78 GB (2 × 33–37 GB plus zvyšok systému);
  druhý slot je bezpečný iba pre zostavenia webpack.
- **Zostavenia pull requestov bežia na hostovanej infraštruktúre (2026-10-18).** Úloha `Build`
  v `ci.yml` sa dostane na `omni-build` iba pri `push` a `workflow_dispatch`; každé zostavenie
  `pull_request` (z vlastného repozitára aj forku) a `merge_group` beží na `ubuntu-latest`
  s webpackom. Keď bol každý PR z vlastného repozitára smerovaný do tohto slotu, zostavenie
  Turbopack ho obsadilo na 29–58 minút, 18 zostavení čakalo vo fronte až 18 hodín a vlastné
  zostavenie push vetvy vydania získalo slot raz za 40 úloh. Na hostovanej infraštruktúre trvá
  rovnaké zostavenie PR 8–12 minút súbežne s ostatnými úlohami PR. Turbopack, bundler distribuovaný
  prostredníctvom `npm-publish`, sa na vetve vydania naďalej testuje nočným zostavením a11y
  predvolenej vetvy (04:41 UTC), každým zostavením push alebo dispatch, ktoré sa dostane do slotu,
  a samotným `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts` fixuje túto podmienku so
  štyrmi klauzulami.
- **Nikdy nenastavujte slot Turbopacku pod jeho nameranú potrebu.** Dňa 2026-10-18 o 18:06 bol
  slot znížený z 56G/60G na 40G/44G, aby vznikol priestor pre `omni-release`. Fáza kompilácie bola
  počas celého behu na limite `MemoryHigh` (pamäťový PSI `full` 30–43 %) a `Runner.Listener`,
  ktorý zdieľa cgroup, nedokázal obnoviť svoju úlohu. Hodnoty 56G/60G nastavené vlastníkom
  2026-10-17 boli obnovené v ten istý deň. Pod touto hodnotou zostavenie nezlyhá; začne intenzívne
  presúvať pamäť a úloha sa stratí.
- **Release-Green má vlastný slot (2026-10-18).** Dovtedy obe validácie Release-Green bežali na
  `omni-build`: pri každom pushi (~10/hodinu, pričom 97 zo 100 behov push bolo počas jedného dňa
  zrušených uprostred práce) a pri troch úplných kontrolách denne trvajúcich približne 2 hodiny
  (kontrola o 05:29 čakala na slot 6 hodín) — jediný slot na zostavenie bol niekoľkonásobne
  preťažený a zostavenia PR z vlastného repozitára čakali celé hodiny. `release-green` a
  `main-green` teraz cielia na `omni-release` (iba `omniroute-113-6`) s
  `OMNIROUTE_USE_TURBOPACK=0` a spustený beh už nie je zrušený novším pushom (čakajúci slot naďalej
  zlučuje nápor). `tests/unit/build/runner-capacity-routing.test.ts` fixuje smerovanie, prepnutie
  na webpack a overuje, že nič na `omni-release` sa nezostavuje pomocou Turbopacku.
- **Fond ľahkých úloh: `omni-light`.** `omniroute-113` a `omniroute-113-2` spúšťajú nočné úlohy,
  ktoré potrebujú `next build` iba pre backend (~5–6 GB; webpack), a `quality.yml` `lint-guard`.
  `omniroute-113` mal až do 2026-10-18 nastavené `MemoryHigh=4G` — zostavenie promptfoo sa tam
  54 minút prebíjalo opakovaným uvoľňovaním pamäte; 8 GB toto obmedzovanie odstraňuje.
- **Menej listenerov zámerne.** Štyri jednotky OmniRoute boli 2026-08-29 deaktivované — každý
  ďalší listener je ďalším nájomníkom vyššie uvedeného pamäťového rozpočtu. Limit janitora je 6
  (`MAX_ACTIVE_RUNNERS=6` v crone): počíta každý `Runner.Listener` v systéme a OmniHeuris +
  OmniMind pridávajú k našim štyrom ďalšie dva.
- **Nikdy ručne nečistite `/tmp` ani `_work`, keď je ktorýkoľvek runner zaneprázdnený.**
  Kontrola nasledovaná po určitej prestávke odstránením spôsobila, že aktívna úloha `Build`
  prišla 2026-08-27 o svoj adresár `_work`. Janitor vykonáva kontrolu a odstránenie v jednom
  kroku; nechajte to naňho.
- Zastavenie runnera uprostred úlohy túto úlohu zruší (pozorované naživo): `systemctl stop`
  používajte iba vtedy, keď jeho listener nemá podradený proces `Runner.Worker` — a vykonajte to
  jedným príkazom.
- Workflowy nesmú ukladať artefakty do `/tmp` (je v RAM). Sťahujte ich do `$RUNNER_TEMP`
  (na disku, samostatne pre každý runner) — uloženie 1,3 GB artefaktu `next-build` do tmpfs trvalo
  27–32 minút a jeho nahratie z disku 2 minúty.
- VPS `.15` slúži iba na homologizáciu — nikdy na ňom nebežia CI runnery.

## Hostovaný kanál (runnery hostované službou GitHub)

Účet používa plán **Pro**: **40 súbežných hostovaných úloh**, ktoré zdieľajú všetky kontroly PR,
všetky pracovné postupy spúšťané pushom aj predvolené nastavenie CodeQL. Merané 2026-10-18 počas
kampane zlučovania (~10 zlúčení/hodinu na `release/v3.8.52`): **2 500 behov pracovných postupov vytvorených za
24 h**, 44 pushov do vetvy za 6 h, **106 hostovaných úloh vo fronte**, zatiaľ čo kontroly PR čakali
niekoľko hodín a PR boli zlúčené bez nich. Pri každom pushi do vetvy sa spustilo deväť pracovných postupov:

| pri každom pushi do `release/v*`            | hostované úlohy | výsledok počas náporu                                         | od 2026-10-18                                                                |
| ------------------------------------------- | --------------: | ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `ci.yml` (úplná matica)                     |           až 30 | zrušené nasledujúcim pushom, 24 z 24 za deň                   | nespúšťa sa pri pushoch do `release/**` (beh PR + Release-Green)             |
| `quality.yml`                               |              ~6 | zrušené, 23 z 23                                              | nespúšťa sa pri pushoch do `release/**`                                      |
| `Release-Green` `--quick`                   |               0 | bežalo na `omni-build`, zrušených 97 zo 100                   | slot `omni-release`, nikdy sa nezruší, čakajúce behy sa zlúčia               |
| `Lock released branch`, `OpenSSF Scorecard` |               2 | jeden beh vo fronte na každý push                             | jeden beh na referenciu (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (tieňová správa)       |               1 | jedno hostované `npm ci` na každý push, nikdy sa nezruší      | bez zmeny — kandidát na filter `paths:`                                      |
| `Publish to Docker Hub` → `Deploy to VPS`   |               2 | zrušené pri každom pushi; vetva amd64 súťaží o `omni-build`   | bez zmeny — kanál nasadzovania vlastníka                                     |
| Predvolené nastavenie CodeQL (`dynamic`)    |               4 | `javascript-typescript`, `actions`, `c-cpp`, `python` na push | bez zmeny — Settings → Code security; `c-cpp`/`python` tu nič neskenujú      |

`tests/unit/build/push-storm-diet.test.ts` vynucuje spúšťač `ci.yml` a
`quality.yml` pri pushi iba do `main`. Vedľajší účinok: Codecov už nedostáva základné nahratie pri každom pushi do vydávacej vetvy (tento
krok je informačný a používa `continue-on-error`); kontrola pokrytia v repozitári a komentár k PR
zostávajú nedotknuté.

**Väčšia kapacita vlastných runnerov nevyrieši front hostovaných úloh.** Vývojový server
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) by mohol hostovať runner, ale relácie agentov už
udržiavajú jeho záťaž na úrovni 20–26, kontajner agenta nemá démona Docker a preťažený je
hostovaný kanál. Server `.113` mal v rovnakom čase 71 GB voľného priestoru a záťaž 5–8; jeho obmedzením
je vyššie uvedený pamäťový limit na listener (strop 6 listenerov), nie CPU. Zostávajúce možnosti
sú procesné: zlučovať PR kampane prostredníctvom frontu Mergify (`label=queue`, dávky zdieľajú
jeden beh CI `merge_group` namiesto jedného behu na každý PR plus jedného na každý push), obmedziť jazyky
predvoleného nastavenia CodeQL a filtrovať `release-acceptance.yml` podľa súborov, ktoré číta.
