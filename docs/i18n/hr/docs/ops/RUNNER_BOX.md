# Self-Hosted Runner Box Operations (.113 pool) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Bazen u vlastitom domaćinstvu radi na **.113** kutija (`tomni-proxmox-113`). Od 2026-10-18 svaki OmniRoute trkač ima **jednu ulogu** , jednu oznaku i proračun memory/CPU a koji odgovara izmjerenom radnom opterećenju. Turbopack utor dobiva ono što je izgradnji potrebno; drugi utori su dimenzionirani prema njihovim izmjerenim vrhovima. Kutija samo pretjera kada se Turbopack build poklapa s Release-Green webpack buildom i lint poslom; host swap (16 GB) apsorbira to, a budući da se Build-request izvode s hostom, Turbopack utor je većinu vremena neaktivan:

| trkač                | označiti                        | uloga                                                                                                                                                | `MemoryHigh` / `MemoryMax`      | `CPUQuota` |
| -------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Turbopack građevine: `ci.yml` `Build` (samo push/dispatch ), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, noćna a11y verzija | 56 GB / 60 GB (zamjena 0)       | 1600 %     |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), webpack build                                                                                        | 20 GB / 24 GB (zamijenite 4 GB) | 800 %      |
| `omniroute-113-2`    | `omni-light`                    | nightlies (Schemathesis, promptfoo, garak, k6) i `quality.yml` `lint-guard`                                                                          | 12 GB / 16 GB (zamijenite 4 GB) | 600 %      |
| `omniroute-113`      | `omni-light`                    | isti bazen kao gore                                                                                                                                  | 8 GB / 12 GB                    | 400 %      |
| OmniHeuris, OmniMind | (njihov repo)                   | Samo Dependabot (vrhunac 155 MB svaki, 2026-10-18)                                                                                                   | 4 GB / 6 GB                     | 200% svaki |

Mjereno 18. listopada 2026.:

| resurs     | vrijednost                         | što to znači za raspoređivanje                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **78 GB / 32 jezgre**              | proizvodna verzija Turbopack dosegla je vrhunac od 49 GB uncapped (`tests/unit/ci-build-bundler-webpack.test.ts`); na Next 16.3.8 sama faza kompajliranja sadrži ~ 40 GB (36 GB RSS u `next-build` plus 17 radnika utovarivača na 3 GB, izmjereno 2026-10-18); izgrađen webpack na ~ 14–16 GB. Jedan Turbopack + jedan webpack build odgovara zajedno; dvije Turbopack verzije ne |
| zamijeniti | 16 GB                              | `omniroute-113-5` radi s isključenom zamjenom (`MemorySwapMax=0`) tako da se runaway build reže na vrhu umjesto zamjene kutije                                                                                                                                                                                                                                                    |
| `/tmp`     | **12 GB tmpfs = RAM**              | sve što je tamo parkirano je memorija; ostaci se pometu nakon 3 h                                                                                                                                                                                                                                                                                                                 |
| CPU        | uočeno opterećenje 60 na 32 jezgre | prije kvota, jedna Turbopack verzija (~ 1166 % CPU) plus paket pokrivenosti na istoj kutiji izgladnjivali su otkucaje srca drugih slušatelja (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                |
| trkači     | **7 slušatelja** (2026-10-28)      | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` nosi i `omni-build-60gb`; `omniroute-113-3/-4/-8` su izbrisani iz repoa (2026-10-28)                                                                                                                                                                                                                                       |

Ograničenja se nalaze u `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` svake jedinice (prethodne vrijednosti zadržane su kao `override.conf.bak-20261018`) i primijenjene su uživo sa `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — bez ponovnog pokretanja, tako da nijedan tekući posao nije dodirnut. Oznake se mijenjaju putem trkača API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), također uživo.

## Instalirajte domara (jednokratno, na kutiji)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Potreban je `lsof` : domar dokazuje da je staza neaktivna jednom snimkom otvorenih datoteka prije nego što je ukloni, a bez alata ne uklanja ništa i to kaže (izlaz 1). Probajte bilo koju promjenu sa `--dry-run` prvo — on ispisuje točno ono što bi napravio i ne dira ništa.

Što radi svaki put: čisti naše vlastite ostatke (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) nakon **3 h na tmpfs** i 24 h na disku `_work/_temp`; upozorava na `next-build` stariji od 75 min i održava ga aktivnim; orezuje 48 h-stare odjave trkača čija je jedinica **zaustavljeno** ; upozorenja na disku ≥ 85 %, memorija PSI `full/avg60` ≥ 10 %, i više slušatelja od `MAX_ACTIVE_RUNNERS` (s omniroute/other kvarom). Izlaz 1 = potrebna pažnja; pročitati dnevnik.

Samo proteklo vrijeme ne dokazuje da je proces siroče. Domar nikada ne šalje signale na temelju godina. Postojeća imena okruženja `ZOMBIE_BUILD_MAX_MIN` i `ZOMBIE_BUILD_COMM` ostaju podržana za cron konfiguracije. Prije čišćenja osumnjičenog siročeta, potvrdite da je njegov točan GitHub posao terminal i identificirajte procese koji pripadaju tom poslu. Kada `Runner.Listener` ne može obnoviti svoj posao, `_diag/Runner_*.log` prikazuje `POST request to …/renewjob timed out after 100 seconds`, API prijavljuje posao `completed` (neuspjeh) oko deset minuta nakon posljednje uspješne obnove, a `next-build` nastavlja raditi bez priloženog posla (2026-10-18: Build of #17066 nije uspio u 19:43 i njegova je gradnja još uvijek držala 40 GB pet minuta kasnije). Potvrdite ref u najnovijem `_diag/Worker_*.log`, zatim SIGTERM samo stablo izgradnje od strane PID — `next-build`, `npm run build`, `build-next-isolated.mjs` i `_work` radnika. Nikad ne dirajte `Runner.Listener`, `RunnerService.js` ili `Runner.Worker`: radnik prijavljuje posao kao otkazan, a slušatelj se sam vraća na mrežu.

## Jedinice runnera: KillMode

Zadani `KillMode=process` runnera ostavlja `Runner.Worker → npm → next-build`
aktivnim kada se jedinica zaustavi ili ponovno pokrene — napušteni build nastavlja trošiti RAM i
CPU bez pridruženog zadatka. Svaka jedinica OmniRoute ima drop-in datoteku
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
s postavkom `KillMode=mixed`: najprije šalje SIGTERM slušaču, a zatim SIGKILL cijeloj kontrolnoj grupi
nakon `TimeoutStop`. Stupa na snagu pri sljedećem ponovnom pokretanju jedinice — ponovno pokrećite **jedan runner
odjednom, samo kada je neaktivan**, pri čemu provjera neaktivnosti i ponovno pokretanje moraju biti u istoj naredbi.

## Pravila rada

- **Istodobno samo jedna Turbopack izgradnja — nametnuto oznakom.** Svaki posao koji pokreće potpuni Turbopack
  `next build` cilja `[self-hosted, omni-build, omni-build-60gb]`, a samo **`omniroute-113-5`** nosi tu
  oznaku: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  noćna a11y izgradnja (#16853) i **amd64** iz `docker-publish.yml` (webpack unutar BuildKita —
  Turbopack se ondje srušio, pokretanje 33253576569). Dockerova arm64 grana ostaje na `ubuntu-24.04-arm`.
  `docker-publish` amd64 dijeli grupu konkurentnosti `heavy-build-main` s poslom `Build` iz `ci.yml`
  (`cancel-in-progress: false`). Docker Engine mora biti na `omniroute-113-5`. Drugo Turbopack
  mjesto ne stane u 78 GB (2 × 33–37 GB plus ostatak sustava); drugo je mjesto sigurno samo za
  webpack izgradnje.
- **Izgradnje zahtjeva za povlačenje izvode se na hostiranoj infrastrukturi (2026-10-18).** `Build` iz `ci.yml` doseže `omni-build` samo za
  `push` i `workflow_dispatch`; svaki `pull_request` (iz vlastitog repozitorija ili forka) i `merge_group` Build
  izvodi se na `ubuntu-latest` uz webpack. Kad je svaki PR iz vlastitog repozitorija bio usmjeren na to mjesto, Turbopack
  Build zauzimao ga je 29–58 min, 18 izgradnji čekalo je u redu do 18 h, a vlastiti push Build
  grane izdanja dobio je mjesto samo jednom u 40 poslova. Na hostiranoj infrastrukturi isti PR Build traje 8–12 min
  usporedno s ostalim poslovima tog PR-a. Turbopack, povezivač koji isporučuje `npm-publish`, i dalje se provjerava na grani izdanja
  noćnom a11y izgradnjom zadane grane (04:41 UTC), svakom push ili dispatch izgradnjom koja
  dosegne to mjesto i samim `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts`
  učvršćuje uvjet od četiri stavke.
- **Nikada ne smanjujte Turbopack mjesto ispod njegove izmjerene potrebe.** Dana 2026-10-18 u 18:06 mjesto je
  smanjeno s 56G/60G na 40G/44G kako bi se napravilo mjesta za `omni-release`. Faza kompilacije bila je na
  vrijednosti `MemoryHigh` tijekom cijelog izvođenja (memorijski PSI `full` 30–43 %), a `Runner.Listener`, koji
  dijeli cgroup, nije mogao obnoviti svoj posao. Vlasnikova postavka 56G/60G od 2026-10-17 vraćena je
  istoga dana. Ispod te vrijednosti izgradnja ne pada; sustav se guši neprestanim premještanjem memorije, a posao se gubi.
- **Release-Green ima vlastito mjesto (2026-10-18).** Do tada su se obje Release-Green provjere izvodile
  na `omni-build`: pri svakom pushu (~10/sat, 97 od 100 push izvođenja otkazano je usred rada u jednom danu)
  i tri potpuna prolaza od ~2 h dnevno (prolaz u 05:29 čekao je 6 h na mjesto) — jedino mjesto za izgradnju
  bilo je višestruko preopterećeno, a PR izgradnje iz vlastitog repozitorija čekale su satima.
  `release-green` i `main-green` sada ciljaju `omni-release` (samo `omniroute-113-6`) uz
  `OMNIROUTE_USE_TURBOPACK=0`, a započeto izvođenje više se ne otkazuje zbog novijeg pusha (mjesto
  na čekanju i dalje sažima navalu). `tests/unit/build/runner-capacity-routing.test.ts`
  učvršćuje usmjeravanje, prebacivanje na webpack i pravilo da se ništa na `omni-release` ne izgrađuje Turbopackom.
- **Lagana skupina: `omni-light`.** `omniroute-113` i `omniroute-113-2` izvode noćne poslove kojima je potrebna
  samo pozadinska `next build` izgradnja (~5–6 GB; webpack) i `lint-guard` iz `quality.yml`. `omniroute-113`
  imao je `MemoryHigh=4G` do 2026-10-18 — promptfoo izgradnja probijala se kroz oslobađanje memorije 54 minute
  na tom sustavu; 8 GB uklanja ograničavanje.
- **Namjerno manje procesa za osluškivanje.** Četiri OmniRoute jedinice onemogućene su 2026-08-29 — svaki dodatni
  proces za osluškivanje još je jedan korisnik gore navedenog memorijskog proračuna. Gornja granica čistača iznosi 8 (`MAX_ACTIVE_RUNNERS=8` u cronu): broji
  svaki `Runner.Listener` na sustavu, a OmniHeuris + OmniMind dodaju još dva uz naših pet.
- **Unit i Vitest poslovi ostaju hostani.** `ci.yml` šalje svoje unit shardove i Vitest posao na `[self-hosted, omni-ci]` samo kada je varijabla repozitorija `vars.USE_VPS_TEST_RUNNER` postavljena na `true`, i tada samo za `pull_request` pokretanja iz istog repozitorija; forkovi, `merge_group` i slanja promjena ostaju na `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Varijabla je `false`. Dana 2026-10-28 tri `omni-ci` osluškivača s po 4 jezgre trebala su 250–270 s za `npm ci`, a svaki unit shard dosegnuo je ograničenje posla od 30 minuta, naspram ~634 s za hostani shard, uz opterećenje sustava od 17–24. Osluškivači su izbrisani. Ne uključujte varijablu ponovno bez osluškivača dimenzioniranih za unit shard.
- **Nikada ručno ne čistite `/tmp` ili `_work` dok je bilo koji runner zauzet.** Provjera
  pa brisanje, s razmakom između tih radnji, razlog je zbog kojeg je aktivni Build posao izgubio svoj
  `_work` 2026-08-27. Čistač obavlja provjeru i uklanjanje u jednom koraku;
  prepustite to njemu.
- Zaustavljanje runnera usred posla otkazuje posao (uočeno uživo): `systemctl stop` koristite samo
  kada njegov proces za osluškivanje nema podređeni proces `Runner.Worker` — i učinite to jednom naredbom.
- Tijekovi rada ne smiju spremati artefakte u `/tmp` (nalazi se u RAM-u). Preuzimajte u
  `$RUNNER_TEMP` (na disku, zasebno za svaki runner) — artefaktu `next-build` od 1.3 GB trebalo je 27–32
  minute da se spremi na tmpfs i 2 minute da se prenese s diska.
- VPS `.15` služi samo za homologaciju — nikada ne izvodi CI runnere.

## Hostana traka (izvršitelji koje hosta GitHub)

Repozitorij pripada organizaciji `cheaper-inference`, na tarifi **Team**: **60 istodobnih hostanih poslova**, koje dijele svi repozitoriji u organizaciji, sve provjere PR-ova, svi radni tijekovi pokrenuti slanjem promjena i zadana konfiguracija CodeQL-a. Brojke u nastavku izmjerene su na tarifi **Pro** (40 istodobnih hostanih poslova). Izmjereno 2026-10-18 tijekom
kampanje spajanja (~10 spajanja/sat na `release/v3.8.52`): **2.500 pokretanja radnih tijekova stvoreno je u
24 h**, 44 slanja promjena na granu u 6 h, a **106 hostanih poslova čekalo je u redu** dok su provjere PR-ova
čekale satima te su PR-ovi spojeni bez njih. Devet radnih tijekova pokrenulo se pri svakom slanju promjena na granu:

| po slanju promjena na `release/v*`          | hostani poslovi | ishod tijekom navale                                            | od 2026-10-18                                                                        |
| ------------------------------------------- | --------------: | --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `ci.yml` (puna matrica)                     |           do 30 | otkazano pri sljedećem slanju, 24 od 24 u jednom danu           | ne pokreće se pri slanju na `release/**` (pokretanje PR-a + Release-Green)           |
| `quality.yml`                               |              ~6 | otkazano, 23 od 23                                              | ne pokreće se pri slanju na `release/**`                                             |
| `Release-Green` `--quick`                   |               0 | izvodilo se na `omni-build`, otkazano 97 od 100                 | utor `omni-release`, nikad se ne otkazuje, pokretanja na čekanju se objedinjuju      |
| `Lock released branch`, `OpenSSF Scorecard` |               2 | jedno pokretanje u redu po slanju                               | jedno pokretanje po referenci (`tests/unit/build/hosted-lane-concurrency.test.ts`)   |
| `Release acceptance` (izvješće u sjeni)     |               1 | jedan hostani `npm ci` po slanju, nikad otkazan                 | nepromijenjeno — kandidat za filtar `paths:`                                         |
| `Publish to Docker Hub` → `Deploy to VPS`   |               2 | otkazano po slanju; grana amd64 natječe se na `omni-build`      | nepromijenjeno — vlasnikov kanal za implementaciju                                   |
| Zadana konfiguracija CodeQL-a (`dynamic`)   |               4 | `javascript-typescript`, `actions`, `c-cpp`, `python` po slanju | nepromijenjeno — Settings → Code security; `c-cpp`/`python` ovdje ništa ne skeniraju |

`tests/unit/build/push-storm-diet.test.ts` fiksira okidač za slanje samo na `main` u datotekama `ci.yml` i
`quality.yml`. Nuspojava: Codecov više ne prima osnovni prijenos za svako slanje na granu izdanja (taj je
korak informativan i koristi `continue-on-error`); provjera pokrivenosti unutar repozitorija i komentar na PR-u
ostaju nepromijenjeni.

**Veći samostalno hostani kapacitet ne rješava red čekanja hostanih poslova.** Razvojno računalo
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) moglo bi ugostiti izvršitelja, ali sesije agenata već
održavaju njegovo opterećenje na 20–26, spremnik agenta nema Dockerov servis, a zasićena je
hostana traka. Računalo `.113` u istom je trenutku imalo 71 GB slobodnog prostora i opterećenje
5–8; njegovo je ograničenje prethodno navedeni memorijski proračun po osluškivaču (najviše 6 osluškivača),
a ne CPU. Preostale su mogućnosti procesne: spajati PR-ove kampanje putem reda Mergify
(`label=queue`, skupine dijele jedno CI pokretanje `merge_group` umjesto jednog pokretanja po PR-u
i još jednog po slanju), smanjiti broj jezika u zadanoj konfiguraciji CodeQL-a te filtrirati
`release-acceptance.yml` prema datotekama koje čita.
