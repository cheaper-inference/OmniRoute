# Self-Hosted Runner Box Operations (.113 pool) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Piscina auto-găzduită rulează pe **.113** caseta (`tomni-proxmox-113`). Din 2026-10-18 fiecare alergător OmniRoute are **un singur rol** , o etichetă și un buget memory/CPU dimensionat la volumul de lucru măsurat. Slotul Turbopack primește ceea ce are nevoie construcția; celelalte sloturi sunt dimensionate la vârfurile lor măsurate. Cutia se supraangajează numai atunci când o construcție Turbopack coincide cu o construcție a pachetului web Release-Green și o lucrare de scame; Schimbul de gazdă (16 GB) absoarbe acest lucru și, deoarece Build-urile de solicitare de tip pull rulează găzduite, slotul Turbopack este inactiv de cele mai multe ori:

| runner               | etichetă                        | rol                                                                                                                                                       | `MemoryHigh` / `MemoryMax` | `CPUQuota`   |
| -------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Compilări Turbopack: `ci.yml` `Build` (doar push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, compilarea a11y nocturnă | 56 GB / 60 GB (swap 0)     | 1600 %       |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), compilare webpack                                                                                         | 20 GB / 24 GB (swap 4 GB)  | 800 %        |
| `omniroute-113-2`    | `omni-light`                    | joburi nocturne (Schemathesis, promptfoo, garak, k6) și `quality.yml` `lint-guard`                                                                        | 12 GB / 16 GB (swap 4 GB)  | 600 %        |
| `omniroute-113`      | `omni-light`                    | același pool ca mai sus                                                                                                                                   | 8 GB / 12 GB               | 400 %        |
| OmniHeuris, OmniMind | (recuperările lor)              | Numai Dependabot (vârf 155 MB fiecare, 2026-10-18)                                                                                                        | 4 GB / 6 GB                | 200% fiecare |

Măsurat 2026-10-18:

| resursă    | valoare                              | implicații pentru planificare                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **78 GB / 32 de nuclee**             | o construcție de producție Turbopack a atins vârful la 49 GB nelimitat (`tests/unit/ci-build-bundler-webpack.test.ts`); în Următorul 16.3.8, numai faza de compilare deține ~ 40 GB (36 GB RSS în `next-build` plus 17 lucrători la încărcător la 3 GB, măsurat 2026-10-18); un pachet web construit la ~ 14–16 GB. Un Turbopack + un pachet web se potrivesc împreună; două versiuni Turbopack nu |
| schimb     | 16 GB                                | `omniroute-113-5` rulează cu schimbarea dezactivată (`MemorySwapMax=0`), astfel încât o construcție fugitivă este tăiată la capac în loc să schimbe cutia                                                                                                                                                                                                                                          |
| `/tmp`     | **12 GB tmpfs = RAM**                | orice este stocat acolo ocupă memorie; fișierele rămase sunt eliminate după 3 h                                                                                                                                                                                                                                                                                                                    |
| CPU        | sarcina 60 pe 32 de nuclee observate | înainte de cote, o versiune Turbopack (~ 1166 % CPU) plus o suită de acoperire pe aceeași casetă a înfometat bătăile inimii celorlalți ascultători (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                           |
| alergători | **7 ascultători** (28.10.2026)       | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` poartă, de asemenea, `omni-build`; `omniroute-113-3/-4/-8` au fost șterse din repo (2026-10-28)                                                                                                                                                                                                                                             |

Limitele trăiesc în `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` fiecărei unități (valorile anterioare păstrate ca `override.conf.bak-20261018`) și au fost aplicate live cu `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — fără repornire, deci nu a fost atinsă nicio sarcină de rulare. Etichetele sunt schimbate prin alergătorii API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), de asemenea în direct.

## Instalați procesul de curățare (o singură dată, pe server)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): la fiecare 30 min, jurnal în /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` este obligatoriu: procesul de curățare confirmă că o cale este inactivă printr-un instantaneu al fișierelor deschise înainte de a o elimina, iar fără acest instrument nu elimină nimic și raportează acest lucru (exit 1). Testați mai întâi orice modificare cu `--dry-run` — acesta afișează exact ce ar face și nu modifică nimic.

Ce face la fiecare rulare: curăță propriile noastre fișiere rămase (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) după **3 h pe tmpfs** și 24 h pe discul `_work/_temp`; oprește un `next-build` mai vechi de 75 min (nicio sarcină nu rulează atât de mult — pe 2026-08-27, una a rulat 70 min după ce GitHub declarase sarcina pierdută); elimină checkout-urile mai vechi de 48 h ale runnerilor ale căror unități sunt **oprite**; emite alerte când discul este utilizat în proporție de ≥ 85 %, PSI-ul memoriei `full/avg60` este ≥ 10 % și există mai multe procese listener decât `MAX_ACTIVE_RUNNERS` (cu o defalcare omniroute/altele). Exit 1 = necesită atenție; consultați jurnalul.

Regula de 75 de minute nu detectează o compilare la care GitHub a renunțat deja. Când `Runner.Listener` nu își poate reînnoi sarcina, `_diag/Runner_*.log` afișează `POST request to …/renewjob timed out after 100 seconds`, API-ul raportează sarcina ca `completed` (eșec) la aproximativ zece minute după ultima reînnoire reușită, iar `next-build` continuă să ruleze fără nicio sarcină atașată (2026-10-18: compilarea pentru #17066 a fost marcată ca eșuată la 19:43, iar procesul său de compilare încă ocupa 40 GB cinci minute mai târziu). Confirmați referința în cel mai nou `_diag/Worker_*.log`, apoi trimiteți SIGTERM numai arborelui de procese al compilării, după PID — `next-build`, `npm run build`, `build-next-isolated.mjs` și procesele worker din `_work`. Nu interveniți niciodată asupra `Runner.Listener`, `RunnerService.js` sau `Runner.Worker`: procesul worker raportează sarcina ca anulată, iar procesul listener revine online de la sine.

## Unitățile runnerilor: KillMode

Valoarea implicită `KillMode=process` a runnerului lasă procesele `Runner.Worker → npm → next-build` active când o unitate este oprită sau repornită — o compilare orfană continuă să consume RAM și CPU fără nicio sarcină atașată. Fiecare unitate OmniRoute are un fișier drop-in (`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`) cu `KillMode=mixed`: mai întâi SIGTERM către procesul listener, apoi SIGKILL către întregul cgroup la `TimeoutStop`. Acesta intră în vigoare la următoarea repornire a unității — reporniți **câte un runner pe rând, numai când este inactiv**, efectuând verificarea stării de inactivitate și repornirea în aceeași comandă.

## Reguli de operare

- **O singură compilare Turbopack simultan — impusă prin etichetă.** Fiecare job care rulează un
  `next build` complet cu Turbopack vizează `[self-hosted, omni-build, omni-build-60gb]`, iar numai
  **`omniroute-113-5`** are această etichetă: `ci.yml` `Build`, `npm-publish.yml` `publish`,
  `nightly-v4-build`, `preview-artifact`, compilarea a11y nocturnă (#16853) și
  `docker-publish.yml` **amd64** (webpack în BuildKit — Turbopack a intrat în panică acolo,
  execuția 33253576569). Ramura Docker arm64 rămâne pe `ubuntu-24.04-arm`.
  Ramura amd64 din `docker-publish` folosește același grup de concurență `heavy-build-main` ca
  `ci.yml` `Build` (`cancel-in-progress: false`). Docker Engine trebuie să fie pe
  `omniroute-113-5`. Un al doilea slot Turbopack nu încape în 78 GB (2 × 33–37 GB plus restul
  consumului serverului); un al doilea slot este sigur numai pentru compilări webpack.
- **Compilările pentru cereri de integrare rulează pe infrastructură găzduită (2026-10-18).**
  `ci.yml` `Build` ajunge la `omni-build` numai pentru `push` și `workflow_dispatch`; fiecare
  compilare `pull_request` (din originea proprie sau dintr-un fork) și `merge_group` rulează pe
  `ubuntu-latest` cu webpack. Când fiecare PR din originea proprie era direcționat către slot, o
  compilare Turbopack îl ocupa timp de 29–58 min, 18 compilări au rămas în coadă până la 18 h,
  iar compilarea push a ramurii de lansare a obținut slotul o singură dată din 40 de joburi. Pe
  infrastructura găzduită, aceeași compilare de PR durează 8–12 min alături de celelalte joburi
  ale PR-ului. Turbopack, instrumentul de împachetare livrat de `npm-publish`, continuă să fie
  testat pe ramura de lansare prin compilarea a11y nocturnă a ramurii implicite (04:41 UTC), prin
  fiecare compilare push sau dispatch care ajunge la slot și prin `npm-publish` însuși.
  `tests/unit/build/heavy-build-queue.test.ts` fixează regula cu patru condiții.
- **Nu dimensionați niciodată slotul Turbopack sub necesarul său măsurat.** Pe 2026-10-18 la
  18:06, slotul a fost redus de la 56G/60G la 40G/44G pentru a face loc pentru `omni-release`.
  Faza de compilare a rămas la limita `MemoryHigh` pe întreaga durată a execuției (PSI de memorie
  `full` de 30–43 %), iar `Runner.Listener`, care folosește același cgroup, nu și-a putut reînnoi
  jobul. Configurația proprietarului de 56G/60G din 2026-10-17 a fost restabilită în aceeași zi.
  Sub această valoare, compilarea nu eșuează; intră în thrashing, iar jobul este pierdut.
- **Release-Green are propriul slot (2026-10-18).** Până atunci, ambele validări Release-Green
  rulau pe `omni-build`: la fiecare push (~10/oră, 97 din 100 de execuții push fiind anulate în
  timpul lucrului într-o singură zi) și trei verificări complete de ~2 h pe zi (verificarea de la
  05:29 a așteptat 6 h pentru slot) — unicul slot de compilare era suprasolicitat de câteva ori
  peste capacitate, iar compilările PR-urilor din originea proprie așteptau ore întregi.
  `release-green` și `main-green` vizează acum `omni-release` (numai `omniroute-113-6`) cu
  `OMNIROUTE_USE_TURBOPACK=0`, iar o execuție începută nu mai este anulată de un push mai nou
  (slotul în așteptare continuă să reducă avalanșa).
  `tests/unit/build/runner-capacity-routing.test.ts` fixează rutarea, comutarea la webpack și
  faptul că nimic de pe `omni-release` nu se compilează cu Turbopack.
- **Pool pentru sarcini ușoare: `omni-light`.** `omniroute-113` și `omniroute-113-2` rulează
  joburile nocturne care necesită un `next build` numai pentru backend (~5–6 GB; webpack) și
  `quality.yml` `lint-guard`. `omniroute-113` a avut `MemoryHigh=4G` până la 2026-10-18 —
  compilarea promptfoo a petrecut 54 de minute recuperând memorie acolo; 8 GB elimină limitarea.
- **Mai puține procese listener în mod intenționat.** Patru unități OmniRoute au fost dezactivate
  pe 2026-08-29 — fiecare listener suplimentar este încă un consumator al bugetului de memorie de
  mai sus. Limita serviciului de curățare este 8 (`MAX_ACTIVE_RUNNERS=8` în cron): acesta numără
  fiecare `Runner.Listener` de pe server, iar OmniHeuris + OmniMind adaugă două la cele cinci ale
  noastre.
- **Joburile Unit și Vitest rămân găzduite.** `ci.yml` trimite fragmentele unit și jobul Vitest către
  `[self-hosted, omni-ci]` numai când variabila de depozit `vars.USE_VPS_TEST_RUNNER` este
  `true`, și chiar și atunci doar pentru rulările `pull_request` din același depozit; fork-urile, `merge_group` și push-urile
  rămân pe `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Variabila este
  `false`. Pe 2026-10-28, trei listeneri `omni-ci` cu 4 nuclee au avut nevoie de 250–270 s pentru `npm ci`, iar fiecare
  fragment unit a atins limita de 30 de minute a jobului, față de ~634 s pentru un fragment găzduit, cu serverul la o
  încărcare de 17–24. Listenerii au fost șterși. Nu reactivați variabila fără listeneri dimensionați pentru
  un fragment unit.
- **Nu curățați niciodată manual `/tmp` sau `_work` cât timp vreun runner este ocupat.** O
  verificare urmată de ștergere, cu un interval între cele două operațiuni, este motivul pentru
  care un job `Build` activ și-a pierdut directorul `_work` pe 2026-08-27. Serviciul de curățare
  efectuează verificarea și eliminarea într-un singur pas; lăsați-l să o facă.
- Oprirea unui runner în timpul unui job anulează jobul (observat în timp real): folosiți
  `systemctl stop` numai când listenerul său nu are niciun proces copil `Runner.Worker` — și
  efectuați operațiunea într-o singură comandă.
- Fluxurile de lucru nu trebuie să stocheze artefacte în `/tmp` (acesta se află în RAM).
  Descărcați în `$RUNNER_TEMP` (pe disc, separat pentru fiecare runner) — artefactului
  `next-build` de 1,3 GB i-au trebuit 27–32 de minute pentru a ajunge în tmpfs și 2 minute pentru
  a fi încărcat de pe disc.
- VPS-ul `.15` este destinat exclusiv omologării — nu rulează niciodată runnere CI.

## Culoarul găzduit (agenți de execuție găzduiți de GitHub)

Depozitul aparține organizației `cheaper-inference`, pe planul **Team**: **60 de
joburi găzduite simultan**, partajate de fiecare depozit din organizație, de fiecare verificare PR,
de fiecare flux de lucru declanșat de un push și de configurația implicită CodeQL. Cifrele de mai jos au fost măsurate pe
planul **Pro** (40 de joburi găzduite simultan). Măsurat la 2026-10-18 în timpul unei
campanii de îmbinare (~10 îmbinări/oră pe `release/v3.8.52`): **2.500 de rulări ale fluxurilor de lucru create în
24 h**, 44 de push-uri către ramură în 6 h, **106 joburi găzduite în coadă**, în timp ce verificările PR au așteptat
ore întregi, iar PR-urile au fost îmbinate fără acestea. Nouă fluxuri de lucru au fost declanșate la fiecare push către ramură:

| pentru fiecare push către `release/v*`      | joburi găzduite | rezultat în timpul furtunii                                    | începând cu 2026-10-18                                                            |
| ------------------------------------------- | --------------: | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `ci.yml` (matrice completă)                 |      până la 30 | anulat de următorul push, 24 din 24 într-o zi                  | nu pornește la push-uri către `release/**` (rulare PR + Release-Green)            |
| `quality.yml`                               |              ~6 | anulat, 23 din 23                                              | nu pornește la push-uri către `release/**`                                        |
| `Release-Green` `--quick`                   |               0 | a rulat pe `omni-build`, 97 din 100 anulate                    | slot `omni-release`, nu este anulat niciodată, rularea în așteptare este comasată |
| `Lock released branch`, `OpenSSF Scorecard` |               2 | câte o rulare în coadă pentru fiecare push                     | o rulare per referință (`tests/unit/build/hosted-lane-concurrency.test.ts`)       |
| `Release acceptance` (raport în umbră)      |               1 | câte un `npm ci` găzduit per push, niciodată anulat            | neschimbat — candidat pentru un filtru `paths:`                                   |
| `Publish to Docker Hub` → `Deploy to VPS`   |               2 | anulat la fiecare push; etapa amd64 concurează pe `omni-build` | neschimbat — canalul de implementare al proprietarului                            |
| Configurația implicită CodeQL (`dynamic`)   |               4 | `javascript-typescript`, `actions`, `c-cpp`, `python` per push | neschimbat — Settings → Code security; `c-cpp`/`python` nu scanează nimic aici    |

`tests/unit/build/push-storm-diet.test.ts` fixează declanșatorul la push doar pe `main` pentru `ci.yml` și
`quality.yml`. Efect secundar: Codecov nu mai primește o încărcare de bază la fiecare push către release (pasul
este informativ și folosește `continue-on-error`); pragul de acoperire din depozit și comentariul PR nu sunt
afectate.

**Mai multă capacitate autogăzduită nu rezolvă coada găzduită.** Mașina de dezvoltare
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) ar putea găzdui un agent de execuție, dar sesiunile agenților
îi mențin deja încărcarea la 20–26, containerul agentului nu are un daemon Docker, iar culoarul saturat
este cel găzduit. Mașina `.113` avea 71 GB liberi și o încărcare de 5–8 în același moment; constrângerea
sa este bugetul de memorie per listener menționat mai sus (plafon de 6 listenere), nu procesorul. Pârghiile
rămase țin de proces: integrați PR-urile campaniei prin coada Mergify (`label=queue`, loturile partajează
o singură rulare CI `merge_group` în locul unei rulări per PR plus una per push), reduceți limbajele din
configurația implicită CodeQL și filtrați `release-acceptance.yml` după fișierele pe care le citește.
