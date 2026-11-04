# Self-Hosted Runner Box Operations (.113 pool) (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Savarankiškai talpinamas telkinys veikia **.113** serveryje (`tomni-proxmox-113`). Nuo 2026-10-18 kiekviena
OmniRoute vykdyklė turi **vieną vaidmenį**, vieną žymą ir atminties / CPU biudžetą, parinktą pagal
išmatuotus jos darbo krūvio poreikius. Turbopack vietai skiriama tiek išteklių, kiek reikia komponavimui;
kitų vietų ištekliai parinkti pagal išmatuotas didžiausias apkrovas. Serverio ištekliai viršijami tik tada,
kai Turbopack komponavimas sutampa su Release-Green webpack komponavimu ir lint užduotimi; tai
kompensuoja pagrindinio kompiuterio sukeitimo sritis (16 GB), o kadangi ištraukimo užklausų komponavimai
vykdomi talpinamose vykdyklėse, Turbopack vieta didžiąją laiko dalį nenaudojama:

| vykdyklė             | žyma           | vaidmuo                                                                                                                                                       | `MemoryHigh` / `MemoryMax`      | `CPUQuota` |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack komponavimai: `ci.yml` `Build` (tik push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, naktinis a11y komponavimas | 56 GB / 60 GB (sukeitimas 0)    | 1600 %     |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack komponavimas                                                                                          | 20 GB / 24 GB (sukeitimas 4 GB) | 800 %      |
| `omniroute-113-2`    | `omni-light`   | naktinės užduotys (Schemathesis, promptfoo, garak, k6) ir `quality.yml` `lint-guard`                                                                          | 12 GB / 16 GB (sukeitimas 4 GB) | 600 %      |
| `omniroute-113`      | `omni-light`   | tas pats telkinys kaip pirmiau                                                                                                                                | 8 GB / 12 GB                    | 400 %      |
| OmniHeuris, OmniMind | (jų saugyklos) | tik Dependabot (kiekvienos didžiausias naudojimas – 155 MB, 2026-10-18)                                                                                       | 4 GB / 6 GB                     | po 200 %   |

Išmatuota 2026-10-18:

| išteklius  | reikšmė                             | ką tai reiškia planuojant užduotis                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **78 GB / 32 branduoliai**          | neapribotas Turbopack produkcinis komponavimas pasiekė 49 GB (`tests/unit/ci-build-bundler-webpack.test.ts`); naudojant Next 16.3.8 vien kompiliavimo etapas užima ~40 GB (36 GB RSS procese `next-build` ir 17 įkėliklio darbininkų po 3 GB, išmatuota 2026-10-18); webpack komponavimas – ~14–16 GB. Vienas Turbopack ir vienas webpack komponavimas telpa kartu; du Turbopack komponavimai – ne |
| sukeitimas | 16 GB                               | `omniroute-113-5` veikia be sukeitimo (`MemorySwapMax=0`), todėl nevaldomas komponavimo procesas nutraukiamas pasiekęs ribą, užuot privertęs visą serverį naudoti sukeitimo sritį                                                                                                                                                                                                                  |
| `/tmp`     | **12 GB tmpfs = RAM**               | viskas, kas ten laikoma, naudoja atmintį; likučiai pašalinami po 3 val.                                                                                                                                                                                                                                                                                                                            |
| CPU        | 32 branduoliuose stebėta 60 apkrova | prieš nustatant kvotas vienas Turbopack komponavimas (~1166 % CPU) kartu su aprėpties testų rinkiniu tame pačiame serveryje neleido kitų klausytojų gyvybingumo signalams laiku pasiekti serverio (`The self-hosted runner lost communication`, #16853)                                                                                                                                            |
| vykdyklės  | **7 klausytojai** (2026-10-28)      | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` taip pat turi `omni-build`; `omniroute-113-3/-4/-8` buvo ištrinti iš saugyklos (2026-10-28)                                                                                                                                                                                                                                                 |

Ribos saugomos kiekvieno vieneto faile `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(ankstesnės reikšmės išsaugotos kaip `override.conf.bak-20261018`) ir buvo pritaikytos veikiančioje
sistemoje naudojant `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — be
paleidimo iš naujo, todėl nebuvo paveikta nė viena vykdoma užduotis. Žymos taip pat keičiamos veikiančioje
sistemoje per vykdyklių API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`).

## Įdiekite valymo priemonę (vieną kartą serveryje)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): kas 30 min., žurnalą rašyti į /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` yra būtinas: prieš pašalindama kelią valymo priemonė patvirtina, kad jis
nenaudojamas, padarydama vieną atidarytų failų momentinę kopiją, o be šio įrankio
ji nieko nepašalina ir apie tai praneša (exit 1). Bet kokį pakeitimą pirmiausia
išbandykite su `--dry-run` — bus tiksliai parodyta, kas būtų atlikta, nieko
nekeičiant.

Kas atliekama kiekvieno paleidimo metu: išvalomi mūsų pačių likučiai (`runner-*`,
`omniroute-*`, `next-build*`, `e2e-build.tar.gz`), senesni nei **3 val. tmpfs
sistemoje** ir 24 val. disko kataloge `_work/_temp`; nutraukiamas senesnis nei
75 min. `next-build` procesas (jokia užduotis netrunka taip ilgai — 2026-08-27
viena jų veikė 70 min. po to, kai GitHub paskelbė užduotį prarasta); pašalinamos
48 val. senumo vykdyklių, kurių vienetas yra **sustabdytas**, darbinės kopijos;
įspėjama, kai disko naudojimas ≥ 85 %, atminties PSI `full/avg60` ≥ 10 % arba
klausytojų yra daugiau nei `MAX_ACTIVE_RUNNERS` (atskirai nurodant omniroute ir
kitus). Exit 1 = reikia dėmesio; skaitykite žurnalą.

75 minučių taisyklė neaptinka komponavimo proceso, kurio užduoties GitHub jau
atsisakė. Kai `Runner.Listener` negali atnaujinti savo užduoties,
`_diag/Runner_*.log` rodo `POST request to …/renewjob timed out after 100 seconds`,
API maždaug po dešimties minučių nuo paskutinio sėkmingo atnaujinimo praneša, kad
užduotis yra `completed` (nesėkminga), o `next-build` toliau veikia be susietos
užduoties (2026-10-18: #17066 komponavimo užduotis buvo pažymėta kaip nesėkminga
19:43, o jos komponavimo procesas po penkių minučių vis dar naudojo 40 GB).
Patvirtinkite ref naujausiame `_diag/Worker_*.log`, tada pagal PID išsiųskite
SIGTERM tik komponavimo procesų medžiui — `next-build`, `npm run build`,
`build-next-isolated.mjs` ir `_work` darbininkams. Niekada nelieskite
`Runner.Listener`, `RunnerService.js` ar `Runner.Worker`: darbininkas praneša, kad
užduotis atšaukta, o klausytojas pats vėl prisijungia.

## Vykdyklių vienetai: KillMode

Numatytasis vykdyklės `KillMode=process` palieka
`Runner.Worker → npm → next-build` veikti, kai vienetas sustabdomas arba
paleidžiamas iš naujo — našlaičiu likęs komponavimo procesas toliau naudoja RAM ir
CPU, nors su juo nesusieta jokia užduotis. Kiekvienas OmniRoute vienetas turi
papildomą konfigūraciją
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
su `KillMode=mixed`: pirmiausia klausytojui siunčiamas SIGTERM, o pasiekus
`TimeoutStop` visai cgroup siunčiamas SIGKILL. Ji įsigalioja kitą kartą paleidus
vienetą iš naujo — iš naujo paleiskite **po vieną vykdyklę, tik kai ji
nenaudojama**, o nenaudojimo patikrą ir paleidimą iš naujo atlikite ta pačia
komanda.

## Eksploatavimo taisyklės

- **Vienu metu vykdomas tik vienas Turbopack komponavimas — tai užtikrinama žyma.** Kiekviena užduotis, vykdanti visą Turbopack
  `next build`, naudoja `[self-hosted, omni-build]`, o šią žymą turi tik **`omniroute-113-5`**:
  `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  naktinis a11y komponavimas (#16853) ir `docker-publish.yml` **amd64** (webpack sistemoje BuildKit —
  ten Turbopack užstrigo su kritine klaida, vykdymas 33253576569). arm64 Docker etapas lieka `ubuntu-24.04-arm`.
  `docker-publish` amd64 dalijasi `heavy-build-main` lygiagretumo grupe su `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine turi veikti serveryje `omniroute-113-5`. Antram Turbopack
  lizdui 78 GB nepakanka (2 × 33–37 GB ir likusioms serverio reikmėms); antras lizdas saugus tik
  webpack komponavimams.
- **Ištraukimo užklausų komponavimai vykdomi prieglobos infrastruktūroje (2026-10-18).** `ci.yml` `Build` pasiekia `omni-build` tik per
  `push` ir `workflow_dispatch`; kiekvienos `pull_request` (iš savo ar atskiros repozitorijos) ir `merge_group` komponavimas
  vykdomas `ubuntu-latest` aplinkoje su webpack. Kai kiekviena savo repozitorijos PR buvo nukreipiama į šį lizdą, Turbopack
  komponavimas jį užimdavo 29–58 min., 18 komponavimų eilėje laukė iki 18 val., o pačios leidimo šakos `push` komponavimas
  gavo lizdą vieną kartą iš 40 užduočių. Prieglobos infrastruktūroje tas pats PR komponavimas trunka 8–12 min. ir vykdomas kartu su kitomis
  PR užduotimis. Turbopack, t. y. `npm-publish` platinamas paketų kūrimo įrankis, leidimo šakoje ir toliau tikrinamas
  naktiniu numatytosios šakos a11y komponavimu (04:41 UTC), kiekvienu lizdą pasiekiančiu `push` ar rankiniu komponavimu
  ir pačiu `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts`
  įtvirtina keturių sąlygų vartus.
- **Niekada neskirkite Turbopack lizdui mažiau išteklių, nei rodo išmatuotas poreikis.** 2026-10-18 18:06 lizdo ribos buvo
  sumažintos nuo 56G/60G iki 40G/44G, kad atsirastų vietos `omni-release`. Visą vykdymo laiką kompiliavimo etapas laikėsi ties
  `MemoryHigh` riba (atminties PSI `full` 30–43 %), o tą pačią cgroup naudojantis `Runner.Listener`
  negalėjo pratęsti savo užduoties nuomos. Tą pačią dieną buvo atkurti savininko 2026-10-17 nustatyti 56G/60G.
  Nustačius mažesnę reikšmę, komponavimas nesibaigia klaida — sistema pradeda intensyviai perkėlinėti atminties puslapius, o užduotis prarandama.
- **Release-Green turi atskirą lizdą (2026-10-18).** Iki tol abi Release-Green patikros buvo vykdomos
  `omni-build`: po kiekvieno `push` (~10 per valandą, per vieną dieną 97 iš 100 `push` vykdymų atšaukti darbo metu)
  ir trys ~2 val. trukmės visapusiški patikrinimai per dieną (05:29 patikrinimas lizdo laukė 6 val.) — vienintelis komponavimo
  lizdas buvo apkrautas kelis kartus daugiau, nei galėjo apdoroti, o savo repozitorijos PR komponavimai laukė valandų valandas.
  `release-green` ir `main-green` dabar naudoja `omni-release` (tik `omniroute-113-6`) su
  `OMNIROUTE_USE_TURBOPACK=0`, o pradėtas vykdymas nebėra atšaukiamas dėl naujesnio `push` (laukiantis
  lizdas vis tiek sutraukia užduočių antplūdį). `tests/unit/build/runner-capacity-routing.test.ts`
  įtvirtina maršruto parinkimą, webpack perjungiklį ir tai, kad `omni-release` aplinkoje niekas nekomponuojama naudojant Turbopack.
- **Lengvųjų užduočių telkinys: `omni-light`.** `omniroute-113` ir `omniroute-113-2` vykdo naktines užduotis, kurioms reikia
  tik galinės sistemos `next build` (~5–6 GB; webpack), ir `quality.yml` `lint-guard`. `omniroute-113`
  iki 2026-10-18 turėjo `MemoryHigh=4G` — promptfoo komponavimas ten 54 minutes sunkiai atlaisvindavo atmintį;
  8 GB pašalina šį ribojimą.
- **Klausymosi procesų sąmoningai mažiau.** Keturi OmniRoute vienetai buvo išjungti 2026-08-29 — kiekvienas papildomas
  klausymosi procesas yra dar vienas pirmiau nurodyto atminties biudžeto naudotojas. Valymo užduoties viršutinė riba yra 8 (`MAX_ACTIVE_RUNNERS=8` cron užduotyje): ji skaičiuoja
  kiekvieną serveryje veikiantį `Runner.Listener`, o OmniHeuris ir OmniMind prie mūsų penkių prideda dar du.
- **Unit ir Vitest užduotys lieka priglobtose vykdyklėse.** `ci.yml` siunčia savo unit skeveldras ir Vitest užduotį į
  `[self-hosted, omni-ci]` tik tada, kai saugyklos kintamasis `vars.USE_VPS_TEST_RUNNER` yra
  `true`, ir net tada tik tos pačios saugyklos `pull_request` vykdymams; atšakos (fork), `merge_group` ir push įvykiai
  lieka `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Kintamojo reikšmė yra
  `false`. 2026-10-28 trims 4 branduolių `omni-ci` klausytojams `npm ci` užtruko 250–270 s, o kiekviena
  unit skeveldra pasiekė 30 minučių užduoties ribą, palyginti su ~634 s priglobtai skeveldrai, kai serverio apkrova buvo
  17–24. Klausytojai buvo ištrinti. Neįjunkite kintamojo vėl be klausytojų, kurių dydis tinkamas
  unit skeveldrai.
- **Niekada nevalykite `/tmp` ar `_work` rankiniu būdu, kol bent vienas vykdytojas užimtas.**
  Patikrinimas ir po tam tikros pauzės atliekamas šalinimas lėmė, kad aktyvi `Build` užduotis
  2026-08-27 prarado savo `_work`. Valymo užduotis patikrą ir šalinimą atlieka vienu veiksmu;
  palikite tai jai.
- Vykdytojo sustabdymas užduoties metu ją atšaukia (stebėta realioje sistemoje): `systemctl stop` vykdykite tik
  tada, kai jo klausymosi procesas neturi antrinio `Runner.Worker` proceso — ir atlikite tai viena komanda.
- Darbo eigos neturi laikyti artefaktų `/tmp` (tai yra RAM). Atsisiųskite į
  `$RUNNER_TEMP` (diske, atskirai kiekvienam vykdytojui) — 1.3 GB `next-build` artefakto įrašymas į tmpfs užtruko 27–32
  minutes, o jo įkėlimas iš disko — 2 minutes.
- `.15` VPS skirtas tik homologacijai — jame niekada nevykdomi CI vykdytojai.

## Priglobtų vykdyklių kanalas („GitHub“ priglobti vykdykliai)

Saugykla priklauso organizacijai `cheaper-inference`, kuri naudoja **Team** planą: **60
vienu metu vykdomų priglobtų užduočių**, kuriomis dalijasi visos organizacijos saugyklos, visos PR patikros,
visos `push` įvykio paleidžiamos darbo eigos ir numatytoji „CodeQL“ konfigūracija. Toliau pateikti skaičiai išmatuoti naudojant
**Pro** planą (40 vienu metu vykdomų priglobtų užduočių). Išmatuota 2026-10-18 per
sujungimų kampaniją (~10 sujungimų per valandą šakoje `release/v3.8.52`): per
24 val. **sukurta 2 500 darbo eigų vykdymų**, per 6 val. į šaką atlikti 44 `push`, **106 priglobtos užduotys laukė eilėje**, o PR patikros
laukė valandų valandas ir PR buvo sujungiami be jų. Kiekvienas `push` į šaką paleisdavo devynias darbo eigas:

| per vieną `push` į `release/v*`               | priglobtos užduotys | rezultatas apkrovos metu                                                       | nuo 2026-10-18                                                                           |
| --------------------------------------------- | ------------------: | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `ci.yml` (visa matrica)                       |              iki 30 | atšaukė kitas `push`, 24 iš 24 per dieną                                       | nepaleidžiama atliekant `push` į `release/**` (PR vykdymas + Release-Green)              |
| `quality.yml`                                 |                  ~6 | atšaukta, 23 iš 23                                                             | nepaleidžiama atliekant `push` į `release/**`                                            |
| `Release-Green` `--quick`                     |                   0 | vykdyta aplinkoje `omni-build`, atšaukta 97 iš 100                             | `omni-release` vieta, niekada neatšaukiama, laukiantis vykdymas sujungiamas              |
| `Lock released branch`, `OpenSSF Scorecard`   |                   2 | po vieną eilėje laukiantį vykdymą kiekvienam `push`                            | vienas vykdymas kiekvienai nuorodai (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (šešėlinė ataskaita)     |                   1 | po vieną priglobtą `npm ci` kiekvienam `push`, niekada neatšaukiama            | nepakeista — tinka pritaikyti `paths:` filtrą                                            |
| `Publish to Docker Hub` → `Deploy to VPS`     |                   2 | atšaukiama po kiekvieno `push`; amd64 etapas konkuruoja aplinkoje `omni-build` | nepakeista — savininko diegimo kanalas                                                   |
| Numatytoji „CodeQL“ konfigūracija (`dynamic`) |                   4 | `javascript-typescript`, `actions`, `c-cpp`, `python` kiekvienam `push`        | nepakeista — Settings → Code security; `c-cpp`/`python` čia nieko nenuskaito             |

`tests/unit/build/push-storm-diet.test.ts` užfiksuoja, kad `ci.yml` ir
`quality.yml` `push` paleidiklis veiktų tik šakoje `main`. Šalutinis poveikis: „Codecov“ nebegauna bazinio įkėlimo po kiekvieno `push` į leidimo šaką (šis
žingsnis yra informacinis ir naudoja `continue-on-error`); saugykloje esantis aprėpties slenkstis ir PR komentaras
lieka nepaveikti.

**Didesni savarankiškai priglobti pajėgumai neišsprendžia priglobtų užduočių eilės problemos.** Kūrimo kompiuteryje
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) būtų galima priglobti vykdyklį, tačiau agentų seansai jau
palaiko 20–26 apkrovą, agento konteineryje nėra „Docker“ tarnybos, o perpildytas būtent
priglobtų vykdyklių kanalas. Tuo pačiu metu `.113` kompiuteryje buvo 71 GB laisvos vietos ir 5–8 apkrova; jį riboja
pirmiau nurodytas vienam klausytojui tenkančios atminties biudžetas (ne daugiau kaip 6 klausytojai), o ne CPU. Likusios priemonės
yra procesinės: kampanijos PR sujungti per „Mergify“ eilę (`label=queue`; paketai bendrai naudoja
vieną `merge_group` CI vykdymą, užuot vykdžius po vieną kiekvienam PR ir dar po vieną kiekvienam `push`), sumažinti numatytosios „CodeQL“
konfigūracijos kalbų skaičių ir filtruoti `release-acceptance.yml` pagal failus, kuriuos ji skaito.
