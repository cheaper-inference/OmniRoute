# Self-Hosted Runner Box Operations (.113 pool) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Samostojno gostovana gruča se izvaja na strežniku **.113** (`tomni-proxmox-113`). Od 2026-10-18 ima vsak
izvajalnik OmniRoute **eno vlogo**, eno oznako ter pomnilniško/procesorsko kvoto, prilagojeno izmerjeni
obremenitvi. Reža za Turbopack dobi vire, ki jih zahteva izdelava; druge reže so prilagojene njihovim
izmerjenim konicam. Strežnik vire čezmerno dodeli le, kadar izdelava s Turbopack sovpade z izdelavo
webpack Release-Green in opravilom lint; to obremenitev prevzame izmenjalni prostor gostitelja (16 GB).
Ker se izdelave za zahteve za združitev izvajajo na gostovanih izvajalnikih, je reža za Turbopack večino
časa nedejavna:

| izvajalnik           | oznaka               | vloga                                                                                                                                                 | `MemoryHigh` / `MemoryMax`                 | `CPUQuota`       |
| -------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------- |
| `omniroute-113-5`    | `omni-build`         | izdelave s Turbopack: `ci.yml` `Build` (samo push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, nočna izdelava a11y | 56 GB / 60 GB (brez izmenjalnega prostora) | 1600 %           |
| `omniroute-113-6`    | `omni-release`       | Release-Green (`release-green` + `main-green`), izdelava z webpack                                                                                    | 20 GB / 24 GB (4 GB izmenjalnega prostora) | 800 %            |
| `omniroute-113-2`    | `omni-light`         | nočna opravila (Schemathesis, promptfoo, garak, k6) in `quality.yml` `lint-guard`                                                                     | 12 GB / 16 GB (4 GB izmenjalnega prostora) | 600 %            |
| `omniroute-113`      | `omni-light`         | ista gruča kot zgoraj                                                                                                                                 | 8 GB / 12 GB                               | 400 %            |
| OmniHeuris, OmniMind | (njuna repozitorija) | samo Dependabot (konica 155 MB za vsakega, 2026-10-18)                                                                                                | 4 GB / 6 GB                                | 200 % za vsakega |

Izmerjeno 2026-10-18:

| vir                | vrednost                             | pomen za razporejanje                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU          | **78 GB / 32 jeder**                 | produkcijska izdelava s Turbopack je brez omejitev dosegla konico 49 GB (`tests/unit/ci-build-bundler-webpack.test.ts`); pri Next 16.3.8 že sama faza prevajanja zaseda približno 40 GB (36 GB RSS v `next-build` in 17 nalagalnih delovnih procesov s po 3 GB, izmerjeno 2026-10-18); izdelava z webpack približno 14–16 GB. Ena izdelava s Turbopack in ena z webpack se lahko izvajata hkrati; dve izdelavi s Turbopack ne |
| izmenjalni prostor | 16 GB                                | `omniroute-113-5` se izvaja brez izmenjalnega prostora (`MemorySwapMax=0`), zato se podivjana izdelava prekine ob dosegu omejitve, namesto da bi strežnik začel uporabljati izmenjalni prostor                                                                                                                                                                                                                                |
| `/tmp`             | **12 GB tmpfs = RAM**                | vse, kar je shranjeno tam, zaseda pomnilnik; ostanki se odstranijo po 3 urah                                                                                                                                                                                                                                                                                                                                                  |
| CPU                | opažena obremenitev 60 pri 32 jedrih | pred uvedbo kvot sta ena izdelava s Turbopack (približno 1166 % CPU) in zbirka testov pokritosti na istem strežniku izrinili signale za preverjanje odzivnosti drugih poslušalcev (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                       |
| izvajalniki        | **6 poslušalcev**                    | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` so onemogočeni (`systemctl enable --now` enega znova zažene)                                                                                                                                                                                                                                                                                                  |

Omejitve so določene v datoteki `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
vsake enote (prejšnje vrednosti so shranjene kot `override.conf.bak-20261018`) in so bile uveljavljene
med delovanjem z ukazom `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` —
brez ponovnega zagona, zato nobeno izvajajoče se opravilo ni bilo prizadeto. Oznake se prav tako med
delovanjem spreminjajo prek API-ja za izvajalnike
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`).

## Namestitev čistilnika (enkratno, na strežniku)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): vsakih 30 min, beleženje v /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je obvezen: čistilnik z enim posnetkom odprtih datotek preveri, da pot ni v uporabi, preden jo odstrani; brez tega orodja ne odstrani ničesar in to tudi sporoči (izhodna koda 1). Vsako spremembo najprej preizkusite z `--dry-run` — izpiše natančno, kaj bi izvedel, ne spremeni pa ničesar.

Kaj naredi ob vsakem zagonu: počisti naše lastne ostanke (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) po **3 urah na tmpfs** in po 24 urah na disku v `_work/_temp`; ustavi proces `next-build`, starejši od 75 minut (nobeno opravilo ne teče tako dolgo — 2026-08-27 je eno teklo 70 minut po tem, ko je GitHub njegovo opravilo že razglasil za izgubljeno); odstrani delovne kopije izvajalnikov, stare 48 ur, katerih enota je **ustavljena**; opozori pri zasedenosti diska ≥ 85 %, pomnilniškem PSI `full/avg60` ≥ 10 % in številu poslušalcev, večjem od `MAX_ACTIVE_RUNNERS` (z razčlenitvijo na omniroute/druge). Izhodna koda 1 pomeni, da je potrebna pozornost; preberite dnevnik.

Pravilo 75 minut ne zazna gradnje, nad katero je GitHub že obupal. Ko `Runner.Listener` ne more obnoviti opravila, je v `_diag/Runner_*.log` prikazano `POST request to …/renewjob timed out after 100 seconds`, API pa približno deset minut po zadnji uspešni obnovitvi poroča, da je opravilo `completed` (neuspešno), medtem ko `next-build` še naprej teče brez pripetega opravila (2026-10-18: gradnja za #17066 je bila ob 19:43 označena kot neuspešna, njen proces gradnje pa je pet minut pozneje še vedno zasedal 40 GB). Preverite referenco v najnovejšem `_diag/Worker_*.log`, nato pa po PID-u pošljite SIGTERM samo drevesu gradnje — procesom `next-build`, `npm run build`, `build-next-isolated.mjs` in delovnim procesom v `_work`. Nikoli ne posegajte v `Runner.Listener`, `RunnerService.js` ali `Runner.Worker`: delovni proces sporoči, da je opravilo preklicano, poslušalec pa se sam znova poveže.

## Enote izvajalnikov: KillMode

Privzeti `KillMode=process` izvajalnika pusti procese `Runner.Worker → npm → next-build` žive, ko je enota ustavljena ali znova zagnana — osirotela gradnja še naprej porablja RAM in CPE, ne da bi bila pripeta k opravilu. Vsaka enota OmniRoute vsebuje dopolnilno konfiguracijo (`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`) z nastavitvijo `KillMode=mixed`: najprej pošlje SIGTERM poslušalcu, ob `TimeoutStop` pa SIGKILL celotni kontrolni skupini. Uveljavi se ob naslednjem ponovnem zagonu enote — znova zaženite **po enega izvajalnika naenkrat in samo, ko je nedejaven**, pri čemer morata biti preverjanje nedejavnosti in ponovni zagon izvedena z istim ukazom.

## Pravila delovanja

- **Hkrati se izvaja samo ena gradnja s Turbopackom — to zagotavlja oznaka.** Vsako opravilo, ki izvaja celoten
  `next build` s Turbopackom, cilja na `[self-hosted, omni-build]`, to oznako pa ima samo
  **`omniroute-113-5`**: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  nočna gradnja a11y (#16853) in **amd64** v `docker-publish.yml` (webpack znotraj okolja BuildKit —
  Turbopack se je tam sesul, izvajanje 33253576569). Korak arm64 za Docker ostaja na `ubuntu-24.04-arm`.
  amd64 v `docker-publish` si z opravilom `Build` v `ci.yml` deli skupino sočasnosti `heavy-build-main`
  (`cancel-in-progress: false`). Docker Engine mora biti nameščen na `omniroute-113-5`. Druga reža za
  Turbopack ne gre v 78 GB (2 × 33–37 GB in preostanek sistema); druga reža je varna samo za
  gradnje z webpackom.
- **Gradnje zahtev za poteg se izvajajo na gostovanih izvajalnikih (2026-10-18).** `Build` v `ci.yml` doseže
  `omni-build` samo za `push` in `workflow_dispatch`; vsak `Build` za `pull_request` (iz istega izvora ali razcepa)
  in `merge_group` se izvaja na `ubuntu-latest` z webpackom. Ko je bil vsak PR iz istega izvora usmerjen v režo,
  jo je gradnja s Turbopackom zasedala 29–58 min, 18 gradenj je v čakalni vrsti čakalo do 18 h, lastna potisna
  gradnja izdajne veje pa je režo dobila le enkrat v 40 opravilih. Na gostovanem izvajalniku ista gradnja PR-ja
  traja 8–12 min in se izvaja skupaj z drugimi opravili tega PR-ja. Turbopack, paketirnik, ki ga izdaja
  `npm-publish`, se na izdajni veji še vedno preizkuša z nočno gradnjo a11y privzete veje (04:41 UTC), z vsako
  gradnjo ob potisku ali ročnem zagonu, ki doseže režo, in s samim `npm-publish`.
  `tests/unit/build/heavy-build-queue.test.ts` uveljavlja štiridelni pogoj.
- **Reže za Turbopack nikoli ne nastavite pod njene izmerjene potrebe.** Dne 2026-10-18 ob 18:06 je bila reža
  zmanjšana s 56G/60G na 40G/44G, da bi naredili prostor za `omni-release`. Faza prevajanja je ves čas izvajanja
  ostala na meji `MemoryHigh` (pomnilniški PSI `full` 30–43 %), `Runner.Listener`, ki si deli isto cgroup, pa
  ni mogel obnoviti svojega opravila. Lastnikova nastavitev 56G/60G z dne 2026-10-17 je bila obnovljena še isti
  dan. Pod to vrednostjo gradnja ne spodleti; sistem začne pretirano premeščati pomnilnik in opravilo se izgubi.
- **Release-Green ima lastno režo (2026-10-18).** Do takrat sta se obe preverjanji Release-Green izvajali
  na `omni-build`: ob vsakem potisku (~10/uro, pri čemer je bilo v enem dnevu sredi dela preklicanih 97 od 100
  izvajanj ob potisku) in kot trije približno 2-urni celoviti pregledi na dan (pregled ob 05:29 je na režo čakal
  6 h) — ena sama reža za gradnjo je bila večkratno preobremenjena, gradnje PR-jev iz istega izvora pa so čakale
  več ur. `release-green` in `main-green` zdaj ciljata na `omni-release` (samo `omniroute-113-6`) z
  `OMNIROUTE_USE_TURBOPACK=0`, novejši potisk pa že začetega izvajanja ne prekliče več (čakajoča reža še vedno
  združi naval). `tests/unit/build/runner-capacity-routing.test.ts` uveljavlja usmerjanje, preklop na webpack
  in zahtevo, da se na `omni-release` nič ne gradi s Turbopackom.
- **Lahka gruča: `omni-light`.** `omniroute-113` in `omniroute-113-2` izvajata nočna opravila, ki potrebujejo
  samo zaledni `next build` (~5–6 GB; webpack), in `lint-guard` iz `quality.yml`. `omniroute-113` je imel do
  2026-10-18 nastavitev `MemoryHigh=4G` — gradnja promptfoo je tam vseh 54 minut sproščala pomnilnik; 8 GB
  odpravi omejevanje.
- **Manj poslušalnikov je namernih.** Štiri enote OmniRoute so bile onemogočene 2026-08-29 — vsak dodatni
  poslušalnik je še en porabnik zgornjega pomnilniškega proračuna. Zgornja meja čistilnika je 6
  (`MAX_ACTIVE_RUNNERS=6` v cron): šteje vsak `Runner.Listener` na sistemu, OmniHeuris in OmniMind pa našim
  štirim dodata še dva.
- **Nikoli ročno ne čistite `/tmp` ali `_work`, medtem ko je kateri koli izvajalnik zaposlen.** Preverjanje,
  ki mu po premoru sledi brisanje, je razlog, da je aktivno opravilo `Build` dne 2026-08-27 izgubilo svoj
  `_work`. Čistilnik preverjanje in odstranitev izvede v enem koraku; prepustite mu to.
- Ustavitev izvajalnika sredi opravila prekliče opravilo (opaženo v živo): `systemctl stop` uporabite samo,
  ko njegov poslušalnik nima podrejenega procesa `Runner.Worker` — in to izvedite z enim ukazom.
- Delovni tokovi ne smejo shranjevati artefaktov v `/tmp` (ta je v pomnilniku RAM). Prenesite jih v
  `$RUNNER_TEMP` (na disku, ločeno za vsakega izvajalnika) — 1,3-GB artefakt `next-build` je za zapis na tmpfs
  potreboval 27–32 minut, za nalaganje z diska pa 2 minuti.
- VPS `.15` je namenjen samo homologaciji — nikoli ne izvaja izvajalnikov CI.

## Gostovana steza (izvajalniki, ki jih gosti GitHub)

Račun uporablja paket **Pro**: **40 sočasnih gostovanih opravil**, ki si jih delijo vsa preverjanja PR-jev,
vsi delovni tokovi, sproženi ob potisku, in privzeta nastavitev CodeQL. Meritve 2026-10-18 med
akcijo združevanja (~10 združitev/uro v `release/v3.8.52`): v 24 urah je bilo ustvarjenih **2.500 izvajanj delovnih tokov**,
v 6 urah je bilo v vejo izvedenih 44 potiskov, v čakalni vrsti pa je čakalo **106 gostovanih opravil**, medtem ko so preverjanja PR-jev
čakala več ur, PR-ji pa so bili združeni brez njih. Ob vsakem potisku v vejo se je sprožilo devet delovnih tokov:

| ob vsakem potisku v `release/v*`            | gostovana opravila | rezultat med navalom                                             | od 2026-10-18                                                                          |
| ------------------------------------------- | -----------------: | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ci.yml` (celotna matrika)                  |              do 30 | preklicano ob naslednjem potisku, 24 od 24 v enem dnevu          | se ne zažene ob potiskih v `release/**` (izvajanje PR-ja + Release-Green)              |
| `quality.yml`                               |                 ~6 | preklicano, 23 od 23                                             | se ne zažene ob potiskih v `release/**`                                                |
| `Release-Green` `--quick`                   |                  0 | izvajanje na `omni-build`, preklicanih 97 od 100                 | reža `omni-release`, nikoli preklicano, čakajoča izvajanja se združijo                 |
| `Lock released branch`, `OpenSSF Scorecard` |                  2 | eno izvajanje v čakalni vrsti na potisk                          | eno izvajanje na ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)              |
| `Release acceptance` (vzporedno poročilo)   |                  1 | en gostovani `npm ci` na potisk, nikoli preklican                | nespremenjeno — kandidat za filter `paths:`                                            |
| `Publish to Docker Hub` → `Deploy to VPS`   |                  2 | preklicano ob vsakem potisku; veja amd64 tekmuje na `omni-build` | nespremenjeno — lastnikov kanal za uvajanje                                            |
| Privzeta nastavitev CodeQL (`dynamic`)      |                  4 | `javascript-typescript`, `actions`, `c-cpp`, `python` na potisk  | nespremenjeno — Settings → Code security; `c-cpp`/`python` tukaj ne pregledata ničesar |

`tests/unit/build/push-storm-diet.test.ts` fiksira sprožilec ob potisku, omejen samo na `main`, za `ci.yml` in
`quality.yml`. Stranski učinek: Codecov ob vsakem potisku v izdajo ne prejme več osnovnega nalaganja (korak
je informativen in uporablja `continue-on-error`); preverjanje pokritosti v repozitoriju in komentar PR-ja
ostaneta nespremenjena.

**Več samostojno gostovane zmogljivosti ne odpravi čakalne vrste gostovanih opravil.** Razvojni strežnik
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) bi lahko gostil izvajalnik, vendar seje agentov njegovo obremenitev že
vzdržujejo med 20 in 26, vsebnik agenta nima demona Docker, zasičena pa je gostovana steza.
Strežnik `.113` je imel v istem trenutku 71 GB prostega prostora in obremenitev 5–8; njegova omejitev
je zgoraj navedena količina pomnilnika na poslušalca (največ 6 poslušalcev), ne CPE. Preostali vzvodi
so procesni: PR-je iz akcije združevanja vključujte prek čakalne vrste Mergify (`label=queue`, paketi si
delijo eno izvajanje CI za `merge_group` namesto enega izvajanja na PR in še enega na potisk), zmanjšajte
nabor jezikov v privzeti nastavitvi CodeQL in filtrirajte `release-acceptance.yml` glede na datoteke, ki jih bere.
