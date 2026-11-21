# Self-Hosted Runner Box Operations (.113 pool) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Fond samostatně hostovaných runnerů běží na serveru **.113** (`tomni-proxmox-113`). Od 2026-10-18 má každý
runner OmniRoute **jednu roli**, jeden štítek a paměťový/CPU rozpočet dimenzovaný podle naměřené
zátěže. Slot pro Turbopack dostává prostředky, které sestavení potřebuje; ostatní sloty jsou dimenzovány podle svých
naměřených maxim. K překročení kapacity serveru dochází pouze tehdy, když se sestavení Turbopack překrývá se sestavením
webpack pro Release-Green a úlohou lint; odkládací prostor hostitele (16 GB) tuto situaci absorbuje, a protože sestavení pro pull requesty běží
na hostovaných runnerech, je slot pro Turbopack většinu času nečinný:

| runner               | štítek              | role                                                                                                                                                   | `MemoryHigh` / `MemoryMax` | `CPUQuota`  |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ----------- |
| `omniroute-113-5`    | `omni-build`        | sestavení Turbopack: `ci.yml` `Build` (pouze push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, noční sestavení a11y | 56 GB / 60 GB (swap 0)     | 1600 %      |
| `omniroute-113-6`    | `omni-release`      | Release-Green (`release-green` + `main-green`), sestavení webpack                                                                                      | 20 GB / 24 GB (swap 4 GB)  | 800 %       |
| `omniroute-113-2`    | `omni-light`        | noční úlohy (Schemathesis, promptfoo, garak, k6) a `quality.yml` `lint-guard`                                                                          | 12 GB / 16 GB (swap 4 GB)  | 600 %       |
| `omniroute-113`      | `omni-light`        | stejný fond jako výše                                                                                                                                  | 8 GB / 12 GB               | 400 %       |
| OmniHeuris, OmniMind | (jejich repozitáře) | pouze Dependabot (maximum 155 MB každý, 2026-10-18)                                                                                                    | 4 GB / 6 GB                | 200 % každý |

Naměřeno 2026-10-18:

| prostředek | hodnota                            | význam pro plánování                                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **78 GB / 32 jader**               | produkční sestavení Turbopack bez omezení dosáhlo maxima 49 GB (`tests/unit/ci-build-bundler-webpack.test.ts`); v Next 16.3.8 samotná fáze kompilace zabírá ~40 GB (36 GB RSS v `next-build` plus 17 loader workerů po 3 GB, naměřeno 2026-10-18); sestavení webpack přibližně 14–16 GB. Jedno sestavení Turbopack + jedno sestavení webpack se vejdou současně; dvě sestavení Turbopack nikoli |
| swap       | 16 GB                              | `omniroute-113-5` běží s vypnutým swapem (`MemorySwapMax=0`), takže nekontrolovaně rostoucí sestavení je ukončeno při dosažení limitu, místo aby donutilo celý server swapovat                                                                                                                                                                                                                  |
| `/tmp`     | **12 GB tmpfs = RAM**              | vše, co je tam uloženo, zabírá paměť; zbytky jsou odstraněny po 3 h                                                                                                                                                                                                                                                                                                                             |
| CPU        | zaznamenána zátěž 60 na 32 jádrech | před zavedením kvót jedno sestavení Turbopack (~1166 % CPU) spolu se sadou testů pokrytí na stejném serveru připravily heartbeaty ostatních listenerů o prostředky (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                        |
| runnery    | **7 listenerů** (2026-10-28)       | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` nese také `omni-build`; `omniroute-113-3/-4/-8` byly z repozitáře odstraněny (2026-10-28)                                                                                                                                                                                                                                                |

Limity jsou uloženy pro každou jednotku v `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(předchozí hodnoty jsou zachovány jako `override.conf.bak-20261018`) a byly aplikovány za běhu pomocí
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — bez restartu, takže žádná
běžící úloha nebyla ovlivněna. Štítky se mění prostřednictvím API runnerů (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), rovněž za běhu.

## Instalace úklidového skriptu (jednorázově na serveru)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): každých 30 minut, protokolovat do /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je vyžadován: úklidový skript před odstraněním ověří nečinnost cesty pomocí jednoho snímku
otevřených souborů; bez tohoto nástroje nic neodstraní, oznámí to
a skončí s kódem 1. Každou změnu nejprve vyzkoušejte s `--dry-run` — vypíše přesně, co by
provedl, a nic nezmění.

Co dělá při každém spuštění: odstraňuje naše vlastní pozůstatky (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) po **3 h na tmpfs** a po 24 h na diskovém
`_work/_temp`; ukončuje `next-build` starší než 75 min (žádná úloha neběží tak dlouho — dne
2026-08-27 jedna běžela 70 min poté, co GitHub označil její úlohu za ztracenou); promazává 48 h staré
pracovní kopie runnerů, jejichž jednotka je **zastavená**; upozorňuje na využití disku ≥ 85 %, PSI paměti
`full/avg60` ≥ 10 % a větší počet listenerů než `MAX_ACTIVE_RUNNERS` (s rozdělením na
omniroute/ostatní). Kód ukončení 1 = je nutný zásah; přečtěte si protokol.

Pravidlo 75 minut nezachytí sestavení, nad jehož úlohou už GitHub zlomil hůl. Když
`Runner.Listener` nemůže obnovit svou úlohu, `_diag/Runner_*.log` zobrazí
`POST request to …/renewjob timed out after 100 seconds`, API nahlásí úlohu jako `completed`
(neúspěšnou) přibližně deset minut po posledním úspěšném obnovení a `next-build` pokračuje v běhu
bez připojené úlohy (2026-10-18: sestavení #17066 bylo v 19:43 označeno jako neúspěšné a jeho proces
sestavení ještě o pět minut později zabíral 40 GB). Ověřte ref v nejnovějším `_diag/Worker_*.log` a poté
pomocí PID odešlete SIGTERM pouze stromu sestavení — `next-build`, `npm run build`, `build-next-isolated.mjs` a
workerům v `_work`. Nikdy nezasahujte do `Runner.Listener`, `RunnerService.js` ani `Runner.Worker`:
worker nahlásí úlohu jako zrušenou a listener se sám znovu připojí.

## Jednotky runnerů: KillMode

Výchozí nastavení runneru `KillMode=process` ponechá procesy `Runner.Worker → npm → next-build`
spuštěné i po zastavení nebo restartování jednotky — osiřelé sestavení nadále spotřebovává RAM a
CPU bez připojené úlohy. Každá jednotka OmniRoute obsahuje doplňkovou konfiguraci
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
s `KillMode=mixed`: nejprve odešle SIGTERM listeneru a při
`TimeoutStop` odešle SIGKILL celé cgroup. Nastavení se projeví při příštím restartování jednotky — restartujte **vždy pouze jeden runner,
a to jen tehdy, když je nečinný**, přičemž kontrolu nečinnosti a restart proveďte stejným příkazem.

## Provozní pravidla

- **Současně probíhá pouze jedno sestavení Turbopack — vynuceno štítkem.** Každá úloha, která spouští úplné sestavení Turbopack
  `next build`, cílí na `[self-hosted, omni-build]` a tento štítek má pouze
  **`omniroute-113-5`**: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  noční sestavení a11y (#16853) a **amd64** v `docker-publish.yml` (webpack uvnitř BuildKit —
  Turbopack tam havaroval, běh 33253576569). Větev Dockeru pro arm64 zůstává na `ubuntu-24.04-arm`.
  `docker-publish` pro amd64 sdílí skupinu souběžnosti `heavy-build-main` s úlohou `Build` v `ci.yml`
  (`cancel-in-progress: false`). Docker Engine musí být na `omniroute-113-5`. Druhý slot pro Turbopack
  se do 78 GB nevejde (2 × 33–37 GB plus zbytek systému); druhý slot je bezpečný pouze pro
  sestavení pomocí webpack.
- **Sestavení pull requestů běží na hostovaných runnerech (2026-10-18).** `Build` v `ci.yml` se dostane na `omni-build` pouze pro
  `push` a `workflow_dispatch`; každé sestavení `pull_request` (z vlastního původu nebo forku) a `merge_group`
  běží na `ubuntu-latest` s webpack. Když byl každý PR z vlastního původu směrován do tohoto slotu, sestavení Turbopack
  jej drželo 29–58 min, 18 sestavení čekalo ve frontě až 18 h a vlastní sestavení po pushi na
  vydávací větvi získalo slot jednou ze 40 úloh. Na hostovaném runneru trvá stejné sestavení PR 8–12 min vedle ostatních
  úloh daného PR. Turbopack, bundler dodávaný prostřednictvím `npm-publish`, se na vydávací větvi nadále
  testuje pomocí nočního sestavení a11y výchozí větve (04:41 UTC), pomocí každého sestavení po pushi nebo ručním spuštění,
  které získá slot, a samotným `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts`
  fixuje tuto podmínku se čtyřmi klauzulemi.
- **Nikdy nenastavujte slot Turbopack pod jeho naměřené požadavky.** Dne 2026-10-18 v 18:06 byl slot
  snížen z 56G/60G na 40G/44G, aby se uvolnilo místo pro `omni-release`. Fáze kompilace byla po
  celou dobu běhu na limitu `MemoryHigh` (paměťový PSI `full` 30–43 %) a proces `Runner.Listener`, který
  sdílí stejný cgroup, nedokázal obnovit svou úlohu. Původní nastavení vlastníka 56G/60G z 2026-10-17 bylo obnoveno
  ještě tentýž den. Pod touto hodnotou sestavení neselže; začne neefektivně přesouvat data mezi pamětí a diskem
  a úloha se ztratí.
- **Release-Green má vlastní slot (2026-10-18).** Do té doby obě validace Release-Green běžely
  na `omni-build`: při každém pushi (~10/hod., 97 ze 100 běhů po pushi bylo během jediného dne zrušeno uprostřed práce)
  a třikrát denně při úplných průchodech trvajících ~2 h (průchod v 05:29 čekal na slot 6 h) — jediný slot pro sestavení
  byl několikanásobně přetížen a sestavení PR z vlastního původu čekala celé hodiny.
  `release-green` a `main-green` nyní cílí na `omni-release` (pouze `omniroute-113-6`) s
  `OMNIROUTE_USE_TURBOPACK=0` a již spuštěný běh už není rušen novějším pushem (čekající slot stále
  slučuje příval požadavků). `tests/unit/build/runner-capacity-routing.test.ts`
  fixuje směrování, přepnutí na webpack a skutečnost, že se na `omni-release` nic nesestavuje pomocí Turbopack.
- **Lehký fond: `omni-light`.** `omniroute-113` a `omniroute-113-2` spouštějí noční úlohy, které potřebují
  pouze backendové sestavení `next build` (~5–6 GB; webpack), a `lint-guard` z `quality.yml`. `omniroute-113`
  měl až do 2026-10-18 nastaveno `MemoryHigh=4G` — sestavení promptfoo se tam po dobu 54 minut prodíralo
  opakovaným uvolňováním paměti; 8 GB toto omezování odstraňuje.
- **Záměrně méně listenerů.** Čtyři jednotky OmniRoute byly 2026-08-29 deaktivovány — každý další
  listener je dalším spotřebitelem výše uvedeného paměťového rozpočtu. Limit janitoru je 8 (`MAX_ACTIVE_RUNNERS=8` v cron): počítá
  každý proces `Runner.Listener` na serveru a OmniHeuris + OmniMind přidávají dva k našim pěti.
- **Úlohy unit a Vitest zůstávají hostované.** `ci.yml` posílá své unit shardy a úlohu Vitest na `[self-hosted, omni-ci]` pouze tehdy, když má proměnná repozitáře `vars.USE_VPS_TEST_RUNNER` hodnotu `true`, a i tehdy jen pro běhy `pull_request` ze stejného repozitáře; forky, `merge_group` a pushe zůstávají na `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Proměnná má hodnotu `false`. Dne 2026-10-28 trval `npm ci` třem čtyřjádrovým listenerům `omni-ci` 250–270 s a každý unit shard narazil na 30minutový limit úlohy, oproti ~634 s u hostovaného shardu, při zátěži serveru 17–24. Listenery byly odstraněny. Proměnnou znovu nezapínejte bez listenerů dimenzovaných na unit shard.
- **Nikdy ručně nečistěte `/tmp` ani `_work`, když je kterýkoli runner zaneprázdněný.** Postup
  zkontrolovat-a-poté-smazat s prodlevou mezi oběma kroky způsobil, že živá úloha `Build` přišla
  2026-08-27 o svůj adresář `_work`. Janitor provádí kontrolu i odstranění v jednom kroku;
  nechte to na něm.
- Zastavení runneru uprostřed úlohy tuto úlohu zruší (ověřeno za běhu): `systemctl stop` používejte pouze
  tehdy, když jeho listener nemá podřízený proces `Runner.Worker` — a proveďte to jediným příkazem.
- Workflow nesmí ukládat artefakty do `/tmp` (je v paměti RAM). Stahujte je do
  `$RUNNER_TEMP` (na disku, samostatně pro každý runner) — uložení 1,3GB artefaktu `next-build` na tmpfs trvalo 27–32
  minut, zatímco jeho nahrání z disku trvalo 2 minuty.
- VPS `.15` je určen výhradně pro homologaci — nikdy na něm neběží CI runnery.

## Hostovaná dráha (běžci hostovaní na GitHubu)

Úložiště patří organizaci `cheaper-inference`, na** Tým** plán:** 60 souběžně hostovaných úloh** , sdílené každým úložištěm v organizaci, každou kontrolou PR, každým pracovním postupem spouštěným push a výchozím nastavením CodeQL. Níže uvedená čísla byla naměřena na** Pro** plán (40 souběžně hostovaných úloh). Měřeno 2026-10-18 během slučovací kampaně (~ 10 merges/hour na `release/v3.8.52`):** Za 24 hodin bylo vytvořeno 2 500 pracovních postupů** , 44 zatlačení na větev za 6 h,** 106 hostovaných úloh ve frontě** zatímco kontroly PR čekaly hodiny a PRs byly sloučeny bez nich. Devět pracovních postupů spuštěných při každém zatlačení na pobočku:

| za stisknutí `release/v*`                   | hostované úlohy | výsledek pod bouří                                                 | od 18.10.2026                                                                   |
| ------------------------------------------- | --------------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `ci.yml` (úplná matice)                     |           do 30 | zrušeno dalším stisknutím, 24 z 24 za den                          | nespuštěno na `release/**` push (PR spustit + Release-Green)                    |
| `quality.yml`                               |              ~6 | zrušeno, 23 z 23                                                   | nezačal na pushech `release/**`                                                 |
| `Release-Green` `--quick`                   |               0 | běžel na `omni-build`, zrušeno 97 ze 100                           | `omni-release` slot, nikdy nezrušen, čekající běh kolabuje                      |
| `Lock released branch`, `OpenSSF Scorecard` |               2 | jedno spuštění ve frontě na jedno stisknutí                        | jeden běh na referenci (`tests/unit/build/hosted-lane-concurrency.test.ts`)     |
| `Release acceptance` (stínová zpráva)       |               1 | jeden hostovaný `npm ci` na push, nikdy zrušen                     | nezměněný — kandidát na filtr `paths:`                                          |
| `Publish to Docker Hub` → `Deploy to VPS`   |               2 | zrušeno po stisknutí; amd64 leg soutěží na `omni-build`            | nezměněný distribuční kanál vlastníka —                                         |
| výchozí nastavení CodeQL (`dynamic`)        |               4 | `javascript-typescript`, `actions`, `c-cpp`, `python` za stisknutí | beze změny — Nastavení → Zabezpečení kódu; `c-cpp`/`python` zde nic nenaskenuje |

`tests/unit/build/push-storm-diet.test.ts` připíná spoušť `main` -only `ci.yml` a `quality.yml`. Vedlejší efekt: Codecov již nedostává základní upload za vydání push (krok je informativní a `continue-on-error`); brána pokrytí in-repo a komentář PR nejsou ovlivněny.

**Větší kapacita vlastního hostování neopraví hostovanou frontu.** Devbox (`devbox-vm-06-dev002`, 24 vCPU / 54 GB) by mohl hostit běžce, ale relace agenta si již udržují zátěž na 20–26, kontejner agenta nemá žádného démona Docker a saturovaný pruh je hostovaný. Krabice `.113` měla 71 GB volného a zatížení 5–8 ve stejném okamžiku; jeho omezením je výše rozpočtu paměti na posluchače (strop 6 posluchačů), nikoli CPU. Zbývající páky jsou procesní: přiložte kampaň PRs přes frontu Mergify (`label=queue`, dávky sdílejí jedno spuštění `merge_group` CI místo jednoho spuštění na PR plus jedno na push), ořízněte jazyky výchozího nastavení CodeQL a filtrujte `release-acceptance.yml` podle souborů, které čte.

> **2026-11-19: fronta sloučení Mergify je vyřazena** (rozhodnutí vlastníka). `.mergify.yml` již nedefinuje frontu a odmítá příkazy Mergify, které slučují nebo přepisují požadavek na stažení. Vydání PRs jsou sloučena ručně pod sadou pravidel úložiště "Vyžadovat zelené brány u aktivního vydání" (`Gate / CI` + `Gate / Quality`), dokud omni-queue běží v živém režimu, a poté prostřednictvím omni-queue ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). Páka Sloučit výše již neexistuje.
