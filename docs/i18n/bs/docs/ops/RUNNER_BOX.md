# Self-Hosted Runner Box Operations (.113 pool) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Samostalno hostovani skup izvršava se na serveru **.113** (`tomni-proxmox-113`). Od 2026-10-18 svaki
OmniRoute runner ima **jednu ulogu**, jednu oznaku i memorijski/CPU budžet prilagođen izmjerenom
radnom opterećenju. Turbopack slot dobija resurse potrebne za build; ostali slotovi dimenzionirani su prema
izmjerenim vršnim vrijednostima. Server prekoračuje raspoložive resurse samo kada se Turbopack build poklopi s Release-Green
webpack buildom i lint zadatkom; swap hosta (16 GB) to apsorbuje, a pošto se buildovi za pull requestove
izvršavaju na hostovanim runnerima, Turbopack slot je većinu vremena neaktivan:

| runner               | oznaka                 | uloga                                                                                                                                            | `MemoryHigh` / `MemoryMax` | `CPUQuota`     |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`           | Turbopack buildovi: `ci.yml` `Build` (samo push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, noćni a11y build | 56 GB / 60 GB (swap 0)     | 1600 %         |
| `omniroute-113-6`    | `omni-release`         | Release-Green (`release-green` + `main-green`), webpack build                                                                                    | 20 GB / 24 GB (swap 4 GB)  | 800 %          |
| `omniroute-113-2`    | `omni-light`           | noćni zadaci (Schemathesis, promptfoo, garak, k6) i `quality.yml` `lint-guard`                                                                   | 12 GB / 16 GB (swap 4 GB)  | 600 %          |
| `omniroute-113`      | `omni-light`           | isti skup kao iznad                                                                                                                              | 8 GB / 12 GB               | 400 %          |
| OmniHeuris, OmniMind | (njihovi repozitoriji) | samo Dependabot (vršna vrijednost 155 MB za svaki, 2026-10-18)                                                                                   | 4 GB / 6 GB                | 200 % za svaki |

Izmjereno 2026-10-18:

| resurs    | vrijednost                              | šta to znači za raspoređivanje                                                                                                                                                                                                                                                                                                                                                                |
| --------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 jezgre**                   | Turbopack produkcijski build dostigao je vršnih 49 GB bez ograničenja (`tests/unit/ci-build-bundler-webpack.test.ts`); na Next 16.3.8 sama faza kompajliranja zauzima ~40 GB (36 GB RSS u `next-build` plus 17 loader workera po 3 GB, izmjereno 2026-10-18); webpack build zauzima ~14–16 GB. Jedan Turbopack + jedan webpack build mogu se zajedno izvršavati; dva Turbopack builda ne mogu |
| swap      | 16 GB                                   | `omniroute-113-5` radi s isključenim swapom (`MemorySwapMax=0`), tako da se nekontrolisani build prekida kada dostigne svoje ograničenje umjesto da prebaci server na swap                                                                                                                                                                                                                    |
| `/tmp`    | **12 GB tmpfs = RAM**                   | sve što se tamo smjesti zauzima memoriju; preostale datoteke uklanjaju se nakon 3 h                                                                                                                                                                                                                                                                                                           |
| CPU       | zabilježeno opterećenje 60 na 32 jezgre | prije uvođenja kvota, jedan Turbopack build (~1166 % CPU) zajedno s paketom testova pokrivenosti na istom serveru blokirao je heartbeat signale ostalih listenera (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                       |
| runneri   | **7 listenera** (2026-10-28)            | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` nosi i `omni-build`; `omniroute-113-3/-4/-8` su obrisani iz repozitorija (2026-10-28)                                                                                                                                                                                                                                                  |

Ograničenja se nalaze u `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` svake jedinice
(prethodne vrijednosti sačuvane su kao `override.conf.bak-20261018`) i primijenjena su uživo pomoću
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — bez ponovnog pokretanja, tako da nijedan
aktivni zadatak nije bio pogođen. Oznake se mijenjaju putem runners API-ja (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), također uživo.

## Instalirajte janitor (jednokratno, na serveru)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): svakih 30 min, zapis u /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je obavezan: janitor pomoću jednog snimka otvorenih datoteka potvrđuje da
putanja nije aktivna prije nego što je ukloni, a bez tog alata ne uklanja ništa i
to prijavljuje (izlazni kod 1). Svaku promjenu prvo isprobajte s `--dry-run` — ispisuje
tačno šta bi uradio i ne mijenja ništa.

Šta radi pri svakom pokretanju: čisti naše vlastite ostatke (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) nakon **3 h na tmpfs-u** i 24 h na disku u
`_work/_temp`; prekida `next-build` stariji od 75 min (nijedan posao ne traje toliko —
2026-08-27 jedan je radio 70 min nakon što je GitHub proglasio njegov posao izgubljenim);
uklanja checkout direktorije starije od 48 h za runnere čija je jedinica **zaustavljena**;
upozorava kada je disk popunjen ≥ 85 %, memorijski PSI `full/avg60` ≥ 10 % i kada ima
više listenera nego što određuje `MAX_ACTIVE_RUNNERS` (s podjelom na omniroute/ostale).
Izlazni kod 1 = potrebna je pažnja; pročitajte zapisnik.

Pravilo od 75 minuta ne otkriva build od čijeg je posla GitHub već odustao. Kada
`Runner.Listener` ne može obnoviti svoj posao, `_diag/Runner_*.log` prikazuje
`POST request to …/renewjob timed out after 100 seconds`, API prijavljuje posao kao `completed`
(neuspješan) otprilike deset minuta nakon posljednje uspješne obnove, a `next-build` nastavlja raditi
bez povezanog posla (2026-10-18: build za #17066 označen je neuspješnim u 19:43, a njegov build je
pet minuta kasnije još uvijek zauzimao 40 GB). Potvrdite ref u najnovijem `_diag/Worker_*.log`, zatim
pošaljite SIGTERM samo stablu build procesa prema PID-u — `next-build`, `npm run build`, `build-next-isolated.mjs` i
`_work` workerima. Nikada ne dirajte `Runner.Listener`, `RunnerService.js` ili `Runner.Worker`: worker
prijavljuje posao kao otkazan, a listener se sam vraća online.

## Runner jedinice: KillMode

Zadani `KillMode=process` runnera ostavlja `Runner.Worker → npm → next-build`
aktivnim kada se jedinica zaustavi ili ponovo pokrene — napušteni build nastavlja trošiti RAM i
CPU bez povezanog posla. Svaka OmniRoute jedinica ima drop-in konfiguraciju
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
s `KillMode=mixed`: prvo šalje SIGTERM listeneru, a zatim SIGKILL cijeloj cgroup grupi pri
`TimeoutStop`. Stupa na snagu pri sljedećem ponovnom pokretanju jedinice — ponovo pokrećite **jedan runner
odjednom, samo kada nije aktivan**, pri čemu provjera neaktivnosti i ponovno pokretanje moraju biti u istoj naredbi.

## Operativna pravila

- **Jedan Turbopack build istovremeno — nametnuto oznakom.** Svaki posao koji pokreće puni Turbopack
  `next build` cilja `[self-hosted, omni-build]`, a samo **`omniroute-113-5`** ima tu
  oznaku: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  noćni a11y build (#16853) i `docker-publish.yml` **amd64** (webpack unutar BuildKita —
  Turbopack je tamo panično prekinuo rad, pokretanje 33253576569). Dockerova arm64 grana ostaje na `ubuntu-24.04-arm`.
  `docker-publish` amd64 dijeli konkurentnu grupu `heavy-build-main` s `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine mora biti na `omniroute-113-5`. Drugi Turbopack
  slot ne stane u 78 GB (2 × 33–37 GB plus ostatak sistema); drugi slot siguran je samo za
  webpack buildove.
- **Buildovi zahtjeva za spajanje pokreću se na hostovanoj infrastrukturi (2026-10-18).** `ci.yml` `Build` doseže `omni-build` samo za
  `push` i `workflow_dispatch`; svaki `pull_request` (iz vlastitog izvora ili forka) i `merge_group` Build
  pokreće se na `ubuntu-latest` s webpackom. Kada je svaki PR iz vlastitog izvora bio usmjeren na taj slot, Turbopack
  Build ga je zauzimao 29–58 min, 18 Buildova čekalo je u redu do 18 h, a vlastiti push Build
  linije izdanja dobio je slot jednom u 40 poslova. Na hostovanoj infrastrukturi isti PR Build traje 8–12 min uz ostale
  poslove tog PR-a. Turbopack, bundler koji `npm-publish` isporučuje, nastavlja se testirati na liniji izdanja kroz
  noćni a11y build zadane grane (04:41 UTC), kroz svaki push ili dispatch Build koji
  dosegne slot i kroz sam `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts`
  fiksira uslov s četiri klauzule.
- **Nikada ne dimenzionirajte Turbopack slot ispod njegove izmjerene potrebe.** Dana 2026-10-18 u 18:06 slot je
  smanjen s 56G/60G na 40G/44G kako bi se napravilo mjesta za `omni-release`. Faza kompajliranja bila je na
  `MemoryHigh` tokom cijelog pokretanja (memorijski PSI `full` 30–43 %), a `Runner.Listener`, koji
  dijeli cgroup, nije mogao obnoviti svoj posao. Vlasnikove vrijednosti 56G/60G od 2026-10-17 vraćene su
  istog dana. Ispod te vrijednosti build ne pada; počinje intenzivno koristiti resurse, a posao se gubi.
- **Release-Green ima vlastiti slot (2026-10-18).** Do tada su se obje Release-Green validacije
  pokretale na `omni-build`: pri svakom pushu (~10/sat, 97 od 100 push pokretanja otkazano je usred rada u jednom danu)
  i tri potpuna prolaza od ~2 h dnevno (prolaz u 05:29 čekao je 6 h na slot) — jedini build
  slot bio je višestruko preopterećen, a PR Buildovi iz vlastitog izvora čekali su satima.
  `release-green` i `main-green` sada ciljaju `omni-release` (samo `omniroute-113-6`) uz
  `OMNIROUTE_USE_TURBOPACK=0`, a započeto pokretanje više se ne otkazuje zbog novijeg pusha (
  slot na čekanju i dalje sažima navalu). `tests/unit/build/runner-capacity-routing.test.ts`
  fiksira usmjeravanje, prebacivanje na webpack i činjenicu da ništa na `omni-release` ne gradi pomoću Turbopacka.
- **Laki skup: `omni-light`.** `omniroute-113` i `omniroute-113-2` pokreću noćne poslove kojima je
  potreban samo backend `next build` (~5–6 GB; webpack) i `quality.yml` `lint-guard`. `omniroute-113`
  je imao `MemoryHigh=4G` do 2026-10-18 — promptfoo build se tamo 54 minute probijao kroz povrat memorije;
  8 GB uklanja ograničavanje.
- **Namjerno manje listenera.** Četiri OmniRoute jedinice onemogućene su 2026-08-29 — svaki dodatni
  listener još je jedan korisnik prethodno navedenog memorijskog budžeta. Gornja granica janitora je 8 (`MAX_ACTIVE_RUNNERS=8` u cronu): on broji
  svaki `Runner.Listener` na sistemu, a OmniHeuris + OmniMind dodaju dva na naših pet.
- **Unit i Vitest poslovi ostaju hostovani.** `ci.yml` šalje svoje unit shardove i Vitest posao na
  `[self-hosted, omni-ci]` samo kada je varijabla repozitorija `vars.USE_VPS_TEST_RUNNER`
  `true`, i tada samo za `pull_request` izvršavanja iz istog repozitorija; forkovi, `merge_group` i slanja izmjena
  ostaju na `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Varijabla je
  `false`. Dana 2026-10-28 tri `omni-ci` listenera sa 4 jezgre trebala su 250–270 s za `npm ci`, a svaki
  unit shard dostigao je ograničenje posla od 30 minuta, naspram ~634 s za hostovani shard, uz opterećenje sistema
  17–24. Listeneri su obrisani. Ne uključujte ponovo varijablu bez listenera dimenzioniranih za
  unit shard.
- **Nikada nemojte ručno čistiti `/tmp` ili `_work` dok je bilo koji runner zauzet.**
  Provjera pa brisanje s razmakom između ta dva koraka razlog je zbog kojeg je aktivni Build posao izgubio svoj
  `_work` 2026-08-27. Janitor obavlja provjeru i uklanjanje u jednom koraku;
  prepustite to njemu.
- Zaustavljanje runnera usred posla otkazuje posao (opaženo uživo): `systemctl stop` koristite samo
  kada njegov listener nema podređeni proces `Runner.Worker` — i uradite to jednom naredbom.
- Tokovi rada ne smiju smještati artefakte u `/tmp` (on je u RAM-u). Preuzimajte u
  `$RUNNER_TEMP` (na disku, zasebno za svaki runner) — artefaktu `next-build` od 1.3 GB trebalo je 27–32
  minute da se smjesti na tmpfs i 2 minute da se otpremi s diska.
- VPS `.15` namijenjen je samo homologaciji — na njemu se nikada ne pokreću CI runneri.

## Hostovana traka (izvršioci koje hostuje GitHub)

Repozitorij pripada organizaciji `cheaper-inference`, na **Team** planu: **60
istovremenih hostovanih poslova**, koje dijele svi repozitoriji u organizaciji, sve PR provjere,
svi radni tokovi pokrenuti slanjem izmjena i zadana postavka za CodeQL. Brojke u nastavku izmjerene su na
**Pro** planu (40 istovremenih hostovanih poslova). Izmjereno 2026-10-18 tokom
kampanje spajanja (~10 spajanja/sat na `release/v3.8.52`): **2.500 izvršavanja radnih tokova kreirano je
za 24 h**, 44 slanja izmjena na granu za 6 h, **106 hostovanih poslova na čekanju**, dok su PR provjere čekale
satima, a PR-ovi su spajani bez njih. Devet radnih tokova pokretalo se pri svakom slanju izmjena na granu:

| po slanju izmjena na `release/v*`           | hostovani poslovi | ishod tokom navale                                                      | od 2026-10-18                                                                        |
| ------------------------------------------- | ----------------: | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `ci.yml` (puna matrica)                     |             do 30 | otkazano sljedećim slanjem izmjena, 24 od 24 u jednom danu              | ne pokreće se pri slanjima na `release/**` (PR izvršavanje + Release-Green)          |
| `quality.yml`                               |                ~6 | otkazano, 23 od 23                                                      | ne pokreće se pri slanjima na `release/**`                                           |
| `Release-Green` `--quick`                   |                 0 | izvršeno na `omni-build`, otkazano 97 od 100                            | `omni-release` mjesto, nikad se ne otkazuje, objedinjuje izvršavanja na čekanju      |
| `Lock released branch`, `OpenSSF Scorecard` |                 2 | jedno izvršavanje na čekanju po slanju izmjena                          | jedno izvršavanje po ref-u (`tests/unit/build/hosted-lane-concurrency.test.ts`)      |
| `Release acceptance` (izvještaj u sjeni)    |                 1 | jedan hostovani `npm ci` po slanju izmjena, nikad se ne otkazuje        | nepromijenjeno — kandidat za `paths:` filter                                         |
| `Publish to Docker Hub` → `Deploy to VPS`   |                 2 | otkazano po slanju izmjena; amd64 dio se nadmeće na `omni-build`        | nepromijenjeno — vlasnikov kanal za implementaciju                                   |
| Zadana postavka za CodeQL (`dynamic`)       |                 4 | `javascript-typescript`, `actions`, `c-cpp`, `python` po slanju izmjena | nepromijenjeno — Settings → Code security; `c-cpp`/`python` ovdje ništa ne skeniraju |

`tests/unit/build/push-storm-diet.test.ts` učvršćuje okidač za slanje izmjena samo na `main` za `ci.yml` i
`quality.yml`. Nuspojava: Codecov više ne prima osnovno otpremanje pri svakom slanju izmjena za izdanje (taj
korak je informativan i koristi `continue-on-error`); provjera pokrivenosti unutar repozitorija i PR komentar
nisu pogođeni.

**Dodatni samostalno hostovani kapacitet ne rješava red čekanja hostovane trake.** Razvojni računar
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) mogao bi hostovati izvršioca, ali sesije agenata već
održavaju njegovo opterećenje na 20–26, kontejner agenta nema Docker demon, a zasićena je
hostovana traka. `.113` računar je u istom trenutku imao 71 GB slobodnog prostora i opterećenje 5–8; njegovo
ograničenje je prethodno navedeni memorijski budžet po slušaocu (najviše 6 slušalaca), a ne CPU. Preostale
mogućnosti su procesne: spojiti PR-ove kampanje putem Mergify reda (`label=queue`, grupe dijele
jedno `merge_group` CI izvršavanje umjesto jednog izvršavanja po PR-u plus jednog po slanju izmjena), smanjiti broj jezika
u zadanoj postavci za CodeQL i filtrirati `release-acceptance.yml` prema datotekama koje čita.
