# Self-Hosted Runner Box Operations (.113 pool) (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Pašu mitinātais pūls darbojas **.113** serverī (`tomni-proxmox-113`). Kopš 2026-10-18 katram
OmniRoute izpildītājam ir **viena loma**, viena etiķete un atmiņas/CPU budžets, kas pielāgots tā izmērītajai
darba slodzei. Turbopack slots saņem būvējumam nepieciešamos resursus; pārējie sloti ir pielāgoti to
izmērītajām maksimālajām slodzēm. Servera resursi tiek pārdalīti virs to faktiskās kapacitātes tikai tad, ja Turbopack būvējums sakrīt ar Release-Green
webpack būvējumu un lint darbu; servera mijmaiņas apgabals (16 GB) to absorbē, un, tā kā izvilkšanas pieprasījumu būvējumi darbojas
mitinātā vidē, Turbopack slots lielāko daļu laika ir dīkstāvē:

| izpildītājs          | etiķete           | loma                                                                                                                                                 | `MemoryHigh` / `MemoryMax`    | `CPUQuota`   |
| -------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------ |
| `omniroute-113-5`    | `omni-build`      | Turbopack būvējumi: `ci.yml` `Build` (tikai push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, nakts a11y būvējums | 56 GB / 60 GB (mijmaiņa 0)    | 1600 %       |
| `omniroute-113-6`    | `omni-release`    | Release-Green (`release-green` + `main-green`), webpack būvējums                                                                                     | 20 GB / 24 GB (mijmaiņa 4 GB) | 800 %        |
| `omniroute-113-2`    | `omni-light`      | nakts darbi (Schemathesis, promptfoo, garak, k6) un `quality.yml` `lint-guard`                                                                       | 12 GB / 16 GB (mijmaiņa 4 GB) | 600 %        |
| `omniroute-113`      | `omni-light`      | tas pats pūls, kas norādīts iepriekš                                                                                                                 | 8 GB / 12 GB                  | 400 %        |
| OmniHeuris, OmniMind | (to repozitoriji) | tikai Dependabot (maksimums 155 MB katram, 2026-10-18)                                                                                               | 4 GB / 6 GB                   | 200 % katram |

Mērīts 2026-10-18:

| resurss     | vērtība                           | nozīme plānošanai                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU   | **78 GB / 32 kodoli**             | Turbopack produkcijas būvējums bez ierobežojumiem sasniedza 49 GB maksimumu (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8 versijā kompilēšanas fāze vien aizņem ~40 GB (36 GB RSS procesā `next-build` un 17 ielādētāja darbinātājprocesi ar 3 GB, mērīts 2026-10-18); webpack būvējums aizņem ~14–16 GB. Viens Turbopack un viens webpack būvējums var darboties vienlaikus; divi Turbopack būvējumi nevar |
| mijmaiņa    | 16 GB                             | `omniroute-113-5` darbojas ar izslēgtu mijmaiņu (`MemorySwapMax=0`), tāpēc nekontrolēts būvējums tiek apturēts pie noteiktā ierobežojuma, nevis liek serverim izmantot mijmaiņu                                                                                                                                                                                                                                            |
| `/tmp`      | **12 GB tmpfs = RAM**             | viss, kas tur tiek novietots, aizņem atmiņu; atlikumi tiek iztīrīti pēc 3 h                                                                                                                                                                                                                                                                                                                                                |
| CPU         | novērota slodze 60 uz 32 kodoliem | pirms kvotu ieviešanas viens Turbopack būvējums (~1166 % CPU) kopā ar pārklājuma testu komplektu tajā pašā serverī atņēma resursus pārējo klausītāju sirdspukstiem (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                   |
| izpildītāji | **7 klausītāji** (2026-10-28)     | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` nes arī `omni-build`; `omniroute-113-3/-4/-8` tika dzēsti no repozitorija (2026-10-28)                                                                                                                                                                                                                                                                              |

Ierobežojumi atrodas katras vienības failā `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(iepriekšējās vērtības saglabātas kā `override.conf.bak-20261018`) un tika lietoti darbības laikā ar
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — bez restartēšanas, tāpēc neviens
aktīvais darbs netika ietekmēts. Etiķetes tiek mainītas, izmantojot izpildītāju API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), arī darbības laikā.

## Instalējiet tīrītāju (vienreiz serverī)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): ik pēc 30 minūtēm, žurnāls failā /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` ir obligāts: pirms ceļa dzēšanas tīrītājs ar vienu atvērto failu momentuzņēmumu
pārliecinās, ka tas netiek izmantots; bez šī rīka tas neko nedzēš un par to paziņo
(izejas kods 1). Vispirms izmēģiniet visas izmaiņas ar `--dry-run` — tas precīzi parāda,
ko darītu, taču neko nemaina.

Katrā palaišanas reizē tas veic šādas darbības: iztīra mūsu pašu atlikumus (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) pēc **3 stundām tmpfs** un pēc 24 stundām diska
`_work/_temp` direktorijā; aptur `next-build`, kas darbojas ilgāk par 75 minūtēm (neviens darbs
nedarbojas tik ilgi — 2026-08-27 viens darbojās 70 minūtes pēc tam, kad GitHub tā darbu bija
atzīmējis kā pazudušu); iztīra pirms 48 stundām izveidotās izpildītāju darba kopijas, kuru vienības
ir **apturētas**; brīdina, ja diska aizpildījums ir ≥ 85 %, atmiņas PSI
`full/avg60` ir ≥ 10 % vai klausītāju ir vairāk nekā `MAX_ACTIVE_RUNNERS` (atsevišķi norādot
omniroute un pārējos). Izejas kods 1 = nepieciešama uzmanība; izlasiet žurnālu.

75 minūšu noteikums neaptver būvējumu, kura darbu GitHub jau ir pārtraucis. Ja
`Runner.Listener` nevar atjaunot savu darbu, `_diag/Runner_*.log` ir redzams
`POST request to …/renewjob timed out after 100 seconds`, API aptuveni desmit minūtes
pēc pēdējās veiksmīgās atjaunošanas ziņo, ka darbs ir `completed` (kļūme), bet `next-build`
turpina darboties bez piesaistīta darba (2026-10-18: #17066 būvējums tika atzīmēts kā
neizdevies plkst. 19:43, un piecas minūtes vēlāk tā būvēšanas process joprojām aizņēma
40 GB). Pārbaudiet atsauci jaunākajā `_diag/Worker_*.log`, pēc tam ar SIGTERM apturiet
tikai būvēšanas procesu koku pēc PID — `next-build`, `npm run build`, `build-next-isolated.mjs`
un `_work` darbiniekus. Nekad neaiztieciet `Runner.Listener`, `RunnerService.js` vai
`Runner.Worker`: darbinieks ziņo, ka darbs ir atcelts, un klausītājs pats atkal pāriet
tiešsaistē.

## Izpildītāju vienības: KillMode

Izpildītāja noklusējuma `KillMode=process` pēc vienības apturēšanas vai restartēšanas
atstāj `Runner.Worker → npm → next-build` darbībā — bezsaimnieka būvējums turpina patērēt
RAM un CPU, lai gan tam nav piesaistīts neviens darbs. Katrai OmniRoute vienībai ir
papildkonfigurācijas fails
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
ar `KillMode=mixed`: vispirms klausītājam tiek nosūtīts SIGTERM, bet `TimeoutStop` brīdī
visai cgroup — SIGKILL. Tas stājas spēkā pēc nākamās vienības restartēšanas — restartējiet
**pa vienam izpildītājam, tikai tad, kad tas ir dīkstāvē**, dīkstāves pārbaudi un
restartēšanu izpildot vienā komandā.

## Darbības noteikumi

- **Vienlaikus tikai viens Turbopack būvējums — to nodrošina etiķete.** Katrs darbs, kas izpilda pilnu Turbopack
  `next build`, izmanto `[self-hosted, omni-build]`, un tikai **`omniroute-113-5`** ir piešķirta šī
  etiķete: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  nakts a11y būvējums (#16853) un `docker-publish.yml` **amd64** (webpack BuildKit iekšienē —
  Turbopack tur avarēja, izpilde 33253576569). arm64 Docker posms joprojām darbojas uz `ubuntu-24.04-arm`.
  `docker-publish` amd64 koplieto `heavy-build-main` vienlaicīguma grupu ar `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine jāatrodas uz `omniroute-113-5`. Otra Turbopack
  vieta neietilpst 78 GB apjomā (2 × 33–37 GB un pārējā sistēma); otra vieta ir droša tikai
  webpack būvējumiem.
- **Izvilkšanas pieprasījumu Build darbi darbojas mitinātajā infrastruktūrā (2026-10-18).** `ci.yml` `Build` sasniedz `omni-build` tikai
  `push` un `workflow_dispatch` gadījumā; katrs `pull_request` (no paša repozitorija vai atzarojuma) un `merge_group` Build
  darbojas uz `ubuntu-latest` ar webpack. Kad katrs paša repozitorija PR tika novirzīts uz šo vietu, Turbopack
  Build to aizņēma 29–58 minūtes, 18 Build darbi gaidīja rindā līdz pat 18 stundām, un laidiena līnijas paša push Build
  ieguva šo vietu vienā no 40 darbiem. Mitinātajā infrastruktūrā tas pats PR Build aizņem 8–12 minūtes līdztekus citiem PR
  darbiem. Turbopack — komplektētājs, ko piegādā `npm-publish`, — laidiena līnijā joprojām tiek pārbaudīts ar
  noklusējuma zara nakts a11y būvējumu (04:41 UTC), ar katru push vai manuāli palaistu Build, kas
  sasniedz šo vietu, un ar pašu `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts`
  nostiprina četru nosacījumu vārteju.
- **Nekad nepiešķiriet Turbopack vietai mazāk resursu par izmērīto nepieciešamo apjomu.** 2026-10-18 plkst. 18:06 vietas
  ierobežojumi tika samazināti no 56G/60G līdz 40G/44G, lai atbrīvotu vietu `omni-release`. Kompilēšanas fāze visu
  izpildes laiku atradās pie `MemoryHigh` robežas (atmiņas PSI `full` 30–43 %), un `Runner.Listener`, kas
  koplieto cgroup, nespēja atjaunot sava darba nomu. Īpašnieka 2026-10-17 iestatītie 56G/60G tika atjaunoti
  tajā pašā dienā. Zem šīs vērtības būvējums nebeidzas ar kļūdu; tas pastāvīgi pārlapo atmiņu, un darbs tiek zaudēts.
- **Release-Green ir sava vieta (2026-10-18).** Līdz tam abas Release-Green validācijas darbojās
  uz `omni-build`: pie katra push (~10 stundā; vienā dienā darba gaitā tika atceltas 97 no 100 push izpildēm)
  un trīs pilnas ~2 stundu pārbaudes dienā (05:29 pārbaude uz vietu gaidīja 6 stundas) — vienīgā būvēšanas
  vieta bija vairākkārt pārslogota, un paša repozitorija PR Build darbi gaidīja stundām.
  `release-green` un `main-green` tagad izmanto `omni-release` (tikai `omniroute-113-6`) ar
  `OMNIROUTE_USE_TURBOPACK=0`, un iesākta izpilde vairs netiek atcelta jaunāka push dēļ (gaidošā
  vieta joprojām samazina darbu vētru līdz vienam darbam). `tests/unit/build/runner-capacity-routing.test.ts`
  nostiprina maršrutēšanu, webpack pārslēgu un to, ka nekas uz `omni-release` netiek būvēts ar Turbopack.
- **Vieglo darbu pūls: `omni-light`.** `omniroute-113` un `omniroute-113-2` izpilda nakts darbus, kuriem nepieciešams
  tikai aizmugursistēmai paredzēts `next build` (~5–6 GB; webpack), un `quality.yml` `lint-guard`. `omniroute-113`
  līdz 2026-10-18 bija `MemoryHigh=4G` — promptfoo būvējums tur 54 minūtes centās atbrīvot sev atmiņu;
  8 GB novērš ierobežošanu.
- **Apzināti mazāk klausītāju.** Četras OmniRoute vienības tika atspējotas 2026-08-29 — katrs papildu
  klausītājs ir vēl viens iepriekš minētā atmiņas budžeta patērētājs. Uzkopšanas procesa maksimālā robeža ir 8 (`MAX_ACTIVE_RUNNERS=8` cron konfigurācijā): tas saskaita
  katru `Runner.Listener` šajā serverī, un OmniHeuris + OmniMind mūsu pieciem pievieno vēl divus.
- **Unit un Vitest darbi paliek mitināti.** `ci.yml` sūta savas unit daļas un Vitest darbu uz `[self-hosted, omni-ci]` tikai tad, ja repozitorija mainīgais `vars.USE_VPS_TEST_RUNNER` ir `true`, un arī tad tikai tā paša repozitorija `pull_request` palaidieniem; atzarojumi (forks), `merge_group` un nosūtījumi (push) paliek uz `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Mainīgais ir `false`. 2026-10-28 trīs 4 kodolu `omni-ci` klausītājiem `npm ci` aizņēma 250–270 s, un katra unit daļa sasniedza 30 minūšu darba limitu, salīdzinot ar ~634 s mitinātai daļai, kamēr servera slodze bija 17–24. Klausītāji tika dzēsti. Neieslēdziet mainīgo atkārtoti bez klausītājiem, kuru izmērs atbilst unit daļai.
- **Nekad netīriet `/tmp` vai `_work` manuāli, kamēr kaut viens izpildītājs ir aizņemts.**
  Pārbaude, kam seko dzēšana ar pauzi starp abām darbībām, izraisīja to, ka aktīvs Build darbs 2026-08-27 zaudēja savu
  `_work`. Uzkopšanas process pārbaudi un dzēšanu veic vienā darbībā;
  ļaujiet to izdarīt tam.
- Izpildītāja apturēšana darba laikā atceļ darbu (novērots darbībā): `systemctl stop` izmantojiet tikai
  tad, kad tā klausītājam nav `Runner.Worker` bērnprocesa, — un izdariet to ar vienu komandu.
- Darbplūsmas nedrīkst glabāt artefaktus mapē `/tmp` (tā atrodas RAM). Lejupielādējiet tos uz
  `$RUNNER_TEMP` (diskā, katram izpildītājam atsevišķi) — 1,3 GB `next-build` artefakta nonākšana tmpfs aizņēma 27–32
  minūtes, bet augšupielāde no diska — 2 minūtes.
- `.15` VPS ir paredzēts tikai homologācijai — tajā nekad nedarbojas CI izpildītāji.

## Mitinātā josla (GitHub mitinātie skrējēji)

Repozitorijs pieder organizācijai `cheaper-inference`, uz** Komanda** plāns:** 60 vienlaikus mitinātas darba vietas** , ko koplieto katrs organizācijas repozitorijs, katra PR pārbaude, katra nospiežot darbplūsma un CodeQL noklusējuma iestatīšana. Tālāk norādītie skaitļi tika mērīti uz** Pro** plāns (40 vienlaikus mitinātas darbavietas). Mērīts 2026. 10.18. sapludināšanas kampaņas laikā (~ 10 merges/hour uz `release/v3.8.52`):** 24 stundu laikā izveidotas 2500 darbplūsmas** , 44 grūdieni uz zaru 6 stundās,** Rindā ir 106 mitinātie darbi** kamēr PR čeki gaidīja stundām un PRs tika sapludināti bez tiem. Deviņas darbplūsmas tiek aktivizētas, katru reizi piespiežot filiāli:

| par grūdienu uz `release/v*`                | mitinātas darbavietas | iznākums vētras laikā                                                   | kopš 2026-10-18                                                                  |
| ------------------------------------------- | --------------------: | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ci.yml` (pilna matrica)                    |               līdz 30 | atcelts ar nākamo grūdienu, 24 no 24 dienā                              | nav palaists uz `release/**` grūdieniem (PR run + Release-Green)                 |
| `quality.yml`                               |                    ~6 | atcelts, 23 no 23                                                       | nav iedarbināts uz `release/**` grūdieniem                                       |
| `Release-Green` `--quick`                   |                     0 | skrēja uz `omni-build`, atcēla 97 no 100                                | `omni-release` slots, nekad nav atcelts, gaidot izpildi sakļauj                  |
| `Lock released branch`, `OpenSSF Scorecard` |                     2 | viens skrējiens rindā uz vienu grūdienu                                 | viens skrējiens par atsauci (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (ēnu ziņojums)         |                     1 | viens hosted `npm ci` uz vienu push, nekad atcelts                      | nemainīts — kandidāts `paths:` filtram                                           |
| `Publish to Docker Hub` → `Deploy to VPS`   |                     2 | atcelts uz vienu grūdienu; amd64 leg sacenšas uz `omni-build`           | nemainīgs — īpašnieka izvietošanas kanāls                                        |
| CodeQL noklusējuma iestatīšana (`dynamic`)  |                     4 | `javascript-typescript`, `actions`, `c-cpp`, `python` uz vienu grūdienu | nemainīgs — Iestatījumi → Koda drošība; `c-cpp`/`python` šeit neko neskenē       |

`tests/unit/build/push-storm-diet.test.ts` piesprauž `main` un `ci.yml` -only `quality.yml`. Blakusparādība: Codecov vairs nesaņem bāzes augšupielādi katrā laidiena push (darbība ir informatīva un `continue-on-error`); repo pārklājuma vārti un PR komentārs netiek ietekmēti.

**Lielāka pašizmitinātā jauda neizlabo mitināto rindu.** Devbox (`devbox-vm-06-dev002`, 24 vCPU / 54 GB) varētu mitināt skrējēju, taču aģenta sesijās jau ir slodze 20–26, aģenta konteinerā nav Docker dēmona, un piesātinātā josla ir mitinātā. `.113` kastē tajā pašā brīdī bija 71 GB brīvs un slodze 5–8; tā ierobežojums ir augstākais katra klausītāja atmiņas budžets (6 klausītāji), nevis CPU. Atlikušās sviras ir procesa sviras: nosūtiet kampaņu PRs caur sapludināšanas rindu (`label=queue`, partijas koplieto vienu `merge_group` CI palaišanu, nevis vienu izpildi uz PR plus vienu nospiešanu), sagrieziet CodeQL noklusējuma iestatīšanas valodas un filtrējiet `release-acceptance.yml` pēc failiem, ko tā nolasa.

> **2026-11-19: sapludināšanas rinda ir pārtraukta** (īpašnieka lēmums). `.mergify.yml` vairs nedefinē rindu un noraida sapludināšanas komandas, kas apvieno vai pārraksta vilkšanas pieprasījumu. Laidieni PRs tiek apvienoti ar roku saskaņā ar repozitorija kārtulu kopu "Pieprasīt zaļos vārtus aktīvajā laidienā" (`Gate / CI` + `Gate / Quality`), līdz universālā rinda tiek palaista tiešraides režīmā, un pēc tam ar universālo rindu ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). Iepriekš esošā sapludināšanas svira vairs nepastāv.
