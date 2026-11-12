# Self-Hosted Runner Box Operations (.113 pool) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Samoobslužný bazén beží na **.113** box (`tomni-proxmox-113`). Od 2026-10-18 má každý bežec OmniRoute**jednu rolu** , jeden štítok a rozpočet memory/CPU dimenzovaný na to, čo merala jeho pracovná záťaž. Slot Turbopack dostane to, čo zostava potrebuje; ostatné sloty sú dimenzované na ich namerané vrcholy. Box sa prekoná iba vtedy, keď sa zostava Turbopack zhoduje so zostavou webového balíka Release-Green a úlohou lint; swap hostiteľa (16 GB) to absorbuje, a keďže zostavy s požiadavkou na stiahnutie bežia hosťované, slot Turbopack je väčšinu času nečinný:

| bežec                | štítok                          | úlohu                                                                                                                                                  | `MemoryHigh` / `MemoryMax`  | `CPUQuota`  |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ----------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Zostavy Turbopack : `ci.yml` `Build` (iba push/dispatch ), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, nočná zostava 11 rokov | 56 GB / 60 GB (swap 0)      | 1600 %      |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), zostava webového balíka                                                                                | 20 GB / 24 GB (výmena 4 GB) | 800 %       |
| `omniroute-113-2`    | `omni-light`                    | nočné (Schemathesis, promptfoo, garak, k6) a `quality.yml` `lint-guard`                                                                                | 12 GB / 16 GB (swap 4 GB)   | 600 %       |
| `omniroute-113`      | `omni-light`                    | rovnaký bazén ako vyššie                                                                                                                               | 8 GB / 12 GB                | 400 %       |
| OmniHeuris, OmniMind | (ich repo)                      | Iba Dependabot (vrchol 155 MB každý, 2026-10-18)                                                                                                       | 4 GB / 6 GB                 | 200 % každý |

Merané 2026-10-18:

| zdroj     | hodnotu                               | čo to znamená pre plánovanie                                                                                                                                                                                                                                                                                                                                                                 |
| --------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 jadier**                 | produkčná zostava Turbopack dosiahla vrchol na 49 GB bez obmedzenia (`tests/unit/ci-build-bundler-webpack.test.ts`); na Next 16.3.8 samotná fáza kompilácie obsahuje ~ 40 GB (36 GB RSS v `next-build` plus 17 pracovníkov nakladača pri 3 GB, merané 2026-10-18); webový balík zostavený na ~ 14–16 GB. Jedna zostava Turbopack + jeden webpack do seba zapadajú; dve zostavy Turbopack nie |
| vymeniť   | 16 GB                                 | `omniroute-113-5` beží s vypnutým swapom (`MemorySwapMax=0`), takže bežiaca zostava je odrezaná na vrchu namiesto výmeny krabice                                                                                                                                                                                                                                                             |
| `/tmp`    | **12 GB tmpfs = RAM**                 | všetko, čo je tam zaparkované, je pamäť; zvyšky sa pozametajú po 3 hodinách                                                                                                                                                                                                                                                                                                                  |
| CPU       | pozorované zaťaženie 60 na 32 jadrách | pred kvótami jedna zostava Turbopack (~ 1166 % CPU) plus súprava pokrytia na rovnakom boxe vyhladovala tlkot srdca ostatných poslucháčov (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                               |
| bežcov    | **7 poslucháčov** (2026-10-28)        | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` tiež nesie `omni-build-60gb`; `omniroute-113-3/-4/-8` boli vymazané z repozitára (2026-10-28)                                                                                                                                                                                                                                         |

Limity platia v `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` každej jednotky (predchádzajúce hodnoty sa uchovávajú ako `override.conf.bak-20261018`) a boli aplikované naživo so `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — bez reštartu, takže sa nedotkla žiadna spustená úloha. Štítky sa menia prostredníctvom bežcov API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), aj naživo.

## Nainštalujte správcu (jednorazovo, na krabici)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Vyžaduje sa `lsof` : správca preukáže, že cesta je nečinná jedným snímkom otvorených súborov pred jej odstránením, a bez nástroja nič neodstráni a povie to (ukončenie 1). Najprv vyskúšajte akúkoľvek zmenu so `--dry-run` — vytlačí presne to, čo by urobil, a ničoho sa nedotkne.

Čo robí pri každom spustení: zametá naše vlastné zvyšky (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) po **3 hodiny na tmpfs** a 24 h na disku `_work/_temp`; upozorňuje na `next-build` starší ako 75 minút a udržiava ho v prevádzke; sušené slivky 48 h staré pokladne bežcov, ktorých jednotka je **zastavil** ; výstrahy na disku ≥ 85 %, pamäť PSI `full/avg60` ≥ 10 % a viac poslucháčov ako `MAX_ACTIVE_RUNNERS` (s členením omniroute/other ). Je potrebná pozornosť výstupu 1 = ; prečítať denník.

Samotný uplynulý čas nedokazuje, že proces je osirelý. Domovník nikdy nevysiela signály na základe veku. Existujúce názvy prostredí `ZOMBIE_BUILD_MAX_MIN` a `ZOMBIE_BUILD_COMM` zostávajú podporované pre konfigurácie cron. Pred vyčistením podozrivej siroty sa uistite, že jej presná úloha GitHub je koncová a identifikujte procesy patriace k tejto úlohe. Keď `Runner.Listener` nemôže obnoviť svoju úlohu, `_diag/Runner_*.log` zobrazí `POST request to …/renewjob timed out after 100 seconds`, API ohlási úlohu `completed` (zlyhanie) asi desať minút po poslednom úspešnom obnovení a `next-build` beží bez pripojenej úlohy (18. 10. 2026: zostavenie #17066 zlyhalo o 19:43 a jeho zostavenie ešte o päť minút držalo 40 GB ). Potvrďte referenciu v najnovšom `_diag/Worker_*.log`, potom SIGTERM iba zostavte strom podľa PID — `next-build`, `npm run build`, `build-next-isolated.mjs` a pracovníkov `_work`. Nikdy sa nedotýkajte `Runner.Listener`, `RunnerService.js` alebo `Runner.Worker`: pracovník nahlási úlohu ako zrušenú a poslucháč sa sám vráti do režimu online.

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
  `next build` s Turbopackom, cieli na `[self-hosted, omni-build, omni-build-60gb]`, pričom tento štítok má iba
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
  ďalší listener je ďalším nájomníkom vyššie uvedeného pamäťového rozpočtu. Limit janitora je 8
  (`MAX_ACTIVE_RUNNERS=8` v crone): počíta každý `Runner.Listener` v systéme a OmniHeuris +
  OmniMind pridávajú k našim piatim ďalšie dva.
- **Úlohy unit a Vitest zostávajú hostované.** `ci.yml` posiela svoje unit shardy a úlohu Vitest na `[self-hosted, omni-ci]` iba vtedy, keď má premenná repozitára `vars.USE_VPS_TEST_RUNNER` hodnotu `true`, a aj vtedy len pre behy `pull_request` z toho istého repozitára; forky, `merge_group` a pushe zostávajú na `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Premenná má hodnotu `false`. Dňa 2026-10-28 trval `npm ci` trom štvorjadrovým listenerom `omni-ci` 250–270 s a každý unit shard narazil na 30-minútový limit úlohy, oproti ~634 s pri hostovanom sharde, pri záťaži servera 17–24. Listenery boli odstránené. Premennú znova nezapínajte bez listenerov dimenzovaných na unit shard.
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

Repozitár patrí organizácii `cheaper-inference` s plánom **Team**: **60 súbežných hostovaných úloh**, ktoré zdieľajú všetky repozitáre organizácie, všetky kontroly PR, všetky pracovné postupy spúšťané pushom aj predvolené nastavenie CodeQL. Nižšie uvedené čísla boli namerané na pláne **Pro** (40 súbežných hostovaných úloh). Merané 2026-10-18 počas
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
