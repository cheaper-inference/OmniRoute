# Self-Hosted Runner Box Operations (.113 pool) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Samostojni bazen deluje na **.113** škatla (`tomni-proxmox-113`). Od 2026-10-18 ima vsak tekač OmniRoute**eno vlogo** , ena oznaka in proračun memory/CPU, ki ustreza izmerjeni delovni obremenitvi. Reža Turbopack dobi tisto, kar potrebuje zgradba; druge reže so dimenzionirane glede na njihove izmerjene vrhove. Škatla se preveč zaveže le, če zgradba Turbopack sovpada z zgradbo spletnega paketa Release-Green in opravilom lint; zamenjava gostitelja (16 GB) to absorbira in ker se zgradbe z zahtevo po vleku izvajajo gostovano, je reža Turbopack večino časa nedejavna:

| tekač                | oznaka                          | vlogo                                                                                                                                               | `MemoryHigh` / `MemoryMax`    | `CPUQuota` |
| -------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Zgradbe Turbopack : `ci.yml` `Build` (samo push/dispatch ), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, nočna zgradba a11y | 56 GB / 60 GB (zamenjaj 0)    | 1600 %     |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), izdelava spletnega paketa                                                                           | 20 GB / 24 GB (zamenjaj 4 GB) | 800 %      |
| `omniroute-113-2`    | `omni-light`                    | nightlies (Schemathesis, promptfoo, garak, k6) in `quality.yml` `lint-guard`                                                                        | 12 GB / 16 GB (zamenjaj 4 GB) | 600 %      |
| `omniroute-113`      | `omni-light`                    | isti bazen kot zgoraj                                                                                                                               | 8 GB / 12 GB                  | 400 %      |
| OmniHeuris, OmniMind | (njihov repo)                   | Samo Dependabot (največji 155 MB vsak, 2026-10-18)                                                                                                  | 4 GB / 6 GB                   | 200 % vsak |

Izmerjeno 2026-10-18:

| vir       | vrednost                             | kaj to pomeni za načrtovanje                                                                                                                                                                                                                                                                                                                                                                    |
| --------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 jeder**                 | proizvodna zgradba Turbopack je dosegla vrh pri 49 GB uncapped (`tests/unit/ci-build-bundler-webpack.test.ts`); v naslednjem 16.3.8 samo faza prevajanja vsebuje ~ 40 GB (36 GB RSS v `next-build` plus 17 delavcev nakladalnika pri 3 GB, merjeno 2026-10-18); izdelava spletnega paketa pri ~ 14–16 GB. Ena Turbopack + ena zgradba spletnega paketa ustreza skupaj; dve zgradbi Turbopack ne |
| zamenjava | 16 GB                                | `omniroute-113-5` deluje z izklopljeno zamenjavo (`MemorySwapMax=0`), tako da je pobegla zgradba odrezana na zgornjem delu namesto zamenjave škatle                                                                                                                                                                                                                                             |
| `/tmp`    | **12 GB tmpfs = RAM**                | vse, kar je tam parkirano, je spomin; ostanke pometemo po 3 urah                                                                                                                                                                                                                                                                                                                                |
| CPU       | obremenitev 60 na 32 opaženih jedrih | pred kvotami je ena zgradba Turbopack (~ 1166 % CPU) in paket pokritosti na istem polju izstradala srčni utrip drugih poslušalcev (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                         |
| tekači    | **7 poslušalcev** (28.10.2026)       | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` nosi tudi `omni-build-60gb`; `omniroute-113-3/-4/-8` so bili izbrisani iz repo (2026-10-28)                                                                                                                                                                                                                                              |

Omejitve so v živo v `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` vsake enote (prejšnje vrednosti so bile ohranjene kot `override.conf.bak-20261018`) in so bile uporabljene v živo z `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — brez ponovnega zagona, tako da ni bilo dotaknjeno nobeno delujoče opravilo. Oznake se menjajo preko tekačev API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), tudi v živo.

## Namestite hišnika (enkrat, na škatli)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Potreben je `lsof` : hišnik dokaže, da je pot nedejavna z enim posnetkom odprtih datotek, preden jo odstrani, brez orodja pa ne odstrani ničesar in to pove (izhod 1). Najprej poskusite s kakršno koli spremembo `--dry-run` — natisne natanko tisto, kar bi naredil, in se ne dotakne ničesar.

Kaj naredi ob vsakem zagonu: pomete naše ostanke (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`)**3 ure na tmpfs** in 24 h na disku `_work/_temp`; opozarja na `next-build` starejše od 75 minut, in ga ohranja v delovanju; obrezuje 48 h-stare odjave tekačev, katerih enota je **ustavil** ; opozorila na disku ≥ 85 %, pomnilnik PSI `full/avg60` ≥ 10 % in več poslušalcev kot `MAX_ACTIVE_RUNNERS` (z razčlenitvijo omniroute/other ). Izhod 1 = potrebna pozornost; preberite dnevnik.

Samo pretečeni čas ne dokazuje, da je proces osirotel. Hišnik nikoli ne pošilja signalov glede na starost. Obstoječa imena okolja `ZOMBIE_BUILD_MAX_MIN` in `ZOMBIE_BUILD_COMM` ostajajo podprta za konfiguracije cron. Preden očistite domnevno osirotelo, potrdite, da je njegovo točno opravilo GitHub terminalsko, in identificirajte procese, ki pripadajo temu opravilu. Ko `Runner.Listener` ne more obnoviti svojega opravila, `_diag/Runner_*.log` prikaže `POST request to …/renewjob timed out after 100 seconds`, API poroča o opravilu `completed` (napaka) približno deset minut po zadnji uspešni obnovi, `next-build` pa nadaljuje z izvajanjem brez priloženega opravila (2026-10-18: Build of #17066 ni uspelo ob 19:43 in njegova gradnja je še vedno držala 40 GB pet minut kasneje). Potrdite ref v najnovejšem `_diag/Worker_*.log`, nato SIGTERM samo gradbeno drevo z PID — `next-build`, `npm run build`, `build-next-isolated.mjs` in delavci `_work`. Nikoli se ne dotikajte `Runner.Listener`, `RunnerService.js` ali `Runner.Worker`: delavec prijavi delo kot preklicano in poslušalec se sam vrne na splet.

## Enote izvajalnikov: KillMode

Privzeti `KillMode=process` izvajalnika pusti procese `Runner.Worker → npm → next-build` žive, ko je enota ustavljena ali znova zagnana — osirotela gradnja še naprej porablja RAM in CPE, ne da bi bila pripeta k opravilu. Vsaka enota OmniRoute vsebuje dopolnilno konfiguracijo (`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`) z nastavitvijo `KillMode=mixed`: najprej pošlje SIGTERM poslušalcu, ob `TimeoutStop` pa SIGKILL celotni kontrolni skupini. Uveljavi se ob naslednjem ponovnem zagonu enote — znova zaženite **po enega izvajalnika naenkrat in samo, ko je nedejaven**, pri čemer morata biti preverjanje nedejavnosti in ponovni zagon izvedena z istim ukazom.

## Pravila delovanja

- **Hkrati se izvaja samo ena gradnja s Turbopackom — to zagotavlja oznaka.** Vsako opravilo, ki izvaja celoten
  `next build` s Turbopackom, cilja na `[self-hosted, omni-build, omni-build-60gb]`, to oznako pa ima samo
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

## Gostovana steza (izvajalniki, ki jih gosti GitHub)

Repozitorij pripada organizaciji `cheaper-inference`, ki uporablja paket **Team**: **60
sočasnih gostovanih opravil**, ki si jih delijo vsi repozitoriji v organizaciji, vsa preverjanja PR-jev,
vsi delovni tokovi, sproženi ob potisku, in privzeta nastavitev CodeQL. Spodnje številke so bile izmerjene na
paketu **Pro** (40 sočasnih gostovanih opravil). Meritve 2026-10-18 med
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
