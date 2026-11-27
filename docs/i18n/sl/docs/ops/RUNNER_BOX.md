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
| izvajalniki        | **7 poslušalcev** (2026-10-28)       | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` nosi tudi `omni-build`; `omniroute-113-3/-4/-8` so bili izbrisani iz repozitorija (2026-10-28)                                                                                                                                                                                                                                                                         |

Omejitve so določene v datoteki `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
vsake enote (prejšnje vrednosti so shranjene kot `override.conf.bak-20261018`) in so bile uveljavljene
med delovanjem z ukazom `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` —
brez ponovnega zagona, zato nobeno izvajajoče se opravilo ni bilo prizadeto. Oznake se prav tako med
delovanjem spreminjajo prek API-ja za izvajalnike (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`).

## Namestitev čistilnika (enkratno, na strežniku)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): vsakih 30 min, beleženje v /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
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
  poslušalnik je še en porabnik zgornjega pomnilniškega proračuna. Zgornja meja čistilnika je 8
  (`MAX_ACTIVE_RUNNERS=8` v cron): šteje vsak `Runner.Listener` na sistemu, OmniHeuris in OmniMind pa našim
  petim dodata še dva.
- **Opravila Unit in Vitest ostajajo gostovana.** `ci.yml` pošlje svoje unit drobce in opravilo Vitest na
  `[self-hosted, omni-ci]` samo, kadar je spremenljivka repozitorija `vars.USE_VPS_TEST_RUNNER` nastavljena na
  `true`, in še takrat samo za izvajanja `pull_request` iz istega repozitorija; forki, `merge_group` in potiski
  ostanejo na `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Spremenljivka je nastavljena na
  `false`. 2026-10-28 so trije 4-jedrni poslušalci `omni-ci` za `npm ci` porabili 250–270 s in vsak
  unit drobec je dosegel 30-minutno omejitev opravila, v primerjavi s ~634 s za gostovani drobec, pri obremenitvi
  sistema 17–24. Poslušalci so bili izbrisani. Spremenljivke ne vklopite znova brez poslušalcev, dimenzioniranih za
  en unit drobec.
- **Nikoli ročno ne čistite `/tmp` ali `_work`, medtem ko je kateri koli izvajalnik zaposlen.** Preverjanje,
  ki mu po premoru sledi brisanje, je razlog, da je aktivno opravilo `Build` dne 2026-08-27 izgubilo svoj
  `_work`. Čistilnik preverjanje in odstranitev izvede v enem koraku; prepustite mu to.
- Ustavitev izvajalnika sredi opravila prekliče opravilo (opaženo v živo): `systemctl stop` uporabite samo,
  ko njegov poslušalnik nima podrejenega procesa `Runner.Worker` — in to izvedite z enim ukazom.
- Delovni tokovi ne smejo shranjevati artefaktov v `/tmp` (ta je v pomnilniku RAM). Prenesite jih v
  `$RUNNER_TEMP` (na disku, ločeno za vsakega izvajalnika) — 1,3-GB artefakt `next-build` je za zapis na tmpfs
  potreboval 27–32 minut, za nalaganje z diska pa 2 minuti.
- VPS `.15` je namenjen samo homologaciji — nikoli ne izvaja izvajalnikov CI.

## Gostujoča steza (tekači, ki jih gosti GitHub)

Repozitorij pripada organizaciji `cheaper-inference`, na** Ekipa** načrt:** 60 sočasno gostujočih opravil** , ki ga delijo vsi repozitorij v organizaciji, vsako preverjanje PR, vsak delovni tok, ki ga sproži pritisk, in privzeta nastavitev CodeQL. Spodnje številke so bile izmerjene na** Pro** načrt (40 sočasno gostujočih opravil). Izmerjeno dne 2026-10-18 med združitveno kampanjo (~ 10 merges/hour na `release/v3.8.52`):** 2.500 potekov delovnega toka, ustvarjenih v 24 urah** , 44 poti do poslovalnice v 6 urah,** 106 gostujočih opravil je v čakalni vrsti** medtem ko so pregledi PR čakali ure in PRs so bili združeni brez njih. Devet delovnih tokov, sproženih ob vsakem pritisku v vejo:

| na pritisk na `release/v*`                  | gostujoča delovna mesta | izid pod nevihto                                                 | od 2026-10-18                                                                 |
| ------------------------------------------- | ----------------------: | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `ci.yml` (polna matrika)                    |                   do 30 | preklican z naslednjim pritiskom, 24 od 24 v dnevu               | ni zagnano pri potiskih `release/**` (PR run + Release-Green)                 |
| `quality.yml`                               |                      ~6 | preklicano, 23 od 23                                             | ni zagnano na potiske `release/**`                                            |
| `Release-Green` `--quick`                   |                       0 | potekalo na `omni-build`, preklicanih 97 od 100                  | reža `omni-release`, nikoli preklicana, zagon v teku se zruši                 |
| `Lock released branch`, `OpenSSF Scorecard` |                       2 | en zagon v čakalni vrsti na pritisk                              | ena vožnja na sodnika (`tests/unit/build/hosted-lane-concurrency.test.ts`)    |
| `Release acceptance` (senčno poročilo)      |                       1 | ena gostovana `npm ci` na pritisk, nikoli preklicana             | nespremenjen kandidat — za filter `paths:`                                    |
| `Publish to Docker Hub` → `Deploy to VPS`   |                       2 | preklicano na pritisk; amd64 noga tekmuje na `omni-build`        | nespremenjen kanal za uvedbo lastnika —                                       |
| privzeta nastavitev CodeQL (`dynamic`)      |                       4 | `javascript-typescript`, `actions`, `c-cpp`, `python` na pritisk | nespremenjena — nastavitve → varnost kode; `c-cpp`/`python` skenira nič tukaj |

`tests/unit/build/push-storm-diet.test.ts` pripne `main` -only potisni sprožilec `ci.yml` in `quality.yml`. Stranski učinek: Codecov ne prejme več osnovnega nalaganja na sprostitev (korak je informativen in `continue-on-error`); vrata pokritosti v skladišču in komentarji PR niso prizadeti.

**Večja zmogljivost samostojnega gostovanja ne popravi gostujoče čakalne vrste.** Devbox (`devbox-vm-06-dev002`, 24 vCPU / 54 GB) bi lahko gostil tekača, vendar agentske seje že ohranjajo njegovo obremenitev pri 20–26, vsebnik agenta nima demona Docker in nasičen pas je gostujoči. Škatla `.113` je imela 71 GB prostih in naloženih 5–8 v istem trenutku; njegova omejitev je zgornji proračun pomnilnika na poslušalca (največ 6 poslušalcev), ne CPU. Preostali vzvodi so procesni: prizemljite kampanjo PRs prek čakalne vrste Mergify (`label=queue`, paketi si delijo en zagon `merge_group` CI namesto enega zagona na PR plus enega na pritisk), obrežite jezike privzete nastavitve CodeQL in filtrirajte `release-acceptance.yml` po datotekah, ki jih bere.

> **2026-11-19: čakalna vrsta za spajanje Mergify je umaknjena** (odločitev lastnika). `.mergify.yml` ne definira več čakalne vrste in zavrača ukaze Mergify, ki združijo ali prepišejo zahtevo za vleko. Izdaje PRs so združene ročno pod naborom pravil repozitorija »Zahtevaj zelena vrata pri aktivni izdaji« (`Gate / CI` + `Gate / Quality`), dokler se omni-queue ne zažene v načinu v živo, nato pa prek omni-queue ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). Zgornji vzvod Mergify ne obstaja več.
