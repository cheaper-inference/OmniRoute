# Self-Hosted Runner Box Operations (.113 pool) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Itse ylläpidetty pooli toimii **.113**-palvelimella (`tomni-proxmox-113`). Jokaisella
OmniRoute-suorittajalla on 2026-10-18 lähtien **yksi rooli**, yksi tunniste sekä sen työkuormalle
mitoitettu muisti- ja CPU-budjetti. Turbopack-paikka saa koonnin tarvitsemat resurssit; muut paikat
on mitoitettu niiden mitattujen huippujen mukaan. Palvelimen resurssit ylivarataan vain silloin, kun
Turbopack-koonti osuu samanaikaisesti Release-Green-webpack-koonnin ja lint-työn kanssa; palvelimen
sivutustila (16 GB) tasaa tilanteen. Koska pull request -koonnit suoritetaan ylläpidetyillä
suorittajilla, Turbopack-paikka on suurimman osan ajasta käyttämättömänä:

| suorittaja           | tunniste       | rooli                                                                                                                                                 | `MemoryHigh` / `MemoryMax` | `CPUQuota`     |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack-koonnit: `ci.yml` `Build` (vain push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, yöaikainen a11y-koonti | 56 GB / 60 GB (swap 0)     | 1600 %         |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack-koonti                                                                                        | 20 GB / 24 GB (swap 4 GB)  | 800 %          |
| `omniroute-113-2`    | `omni-light`   | yöajot (Schemathesis, promptfoo, garak, k6) ja `quality.yml`-tiedoston `lint-guard`                                                                   | 12 GB / 16 GB (swap 4 GB)  | 600 %          |
| `omniroute-113`      | `omni-light`   | sama pooli kuin yllä                                                                                                                                  | 8 GB / 12 GB               | 400 %          |
| OmniHeuris, OmniMind | (omat repot)   | vain Dependabot (kummankin huippu 155 MB, 2026-10-18)                                                                                                 | 4 GB / 6 GB                | 200 % kumpikin |

Mitattu 2026-10-18:

| resurssi    | arvo                              | merkitys ajoitukselle                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU   | **78 GB / 32 ydintä**             | Turbopack-tuotantokoonti saavutti ilman rajoitusta 49 GB:n huipun (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8:ssa pelkkä käännösvaihe pitää käytössä ~40 GB (36 GB RSS prosessissa `next-build` sekä 17 lataustyöntekijää 3 GB:lla, mitattu 2026-10-18); webpack-koonti käyttää ~14–16 GB. Yksi Turbopack- ja yksi webpack-koonti mahtuvat ajettaviksi yhdessä; kaksi Turbopack-koontia eivät mahdu |
| swap        | 16 GB                             | `omniroute-113-5` toimii ilman sivutusta (`MemorySwapMax=0`), joten hallitsemattomasti kasvava koonti katkaistaan sen saavuttaessa rajansa sen sijaan, että koko palvelin alkaisi käyttää sivutusta                                                                                                                                                                                                                  |
| `/tmp`      | **12 GB tmpfs = RAM**             | kaikki sinne tallennettu kuluttaa muistia; jäänteet poistetaan 3 tunnin kuluttua                                                                                                                                                                                                                                                                                                                                     |
| CPU         | kuormaksi havaittu 60 32 ytimellä | ennen kiintiöitä yksi Turbopack-koonti (~1166 % CPU) sekä samalla palvelimella ajettu kattavuustestikokonaisuus estivät muita kuuntelijoita lähettämästä heartbeat-signaalejaan (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                |
| suorittajat | **6 kuuntelijaa**                 | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` on poistettu käytöstä (`systemctl enable --now` ottaa yhden takaisin käyttöön)                                                                                                                                                                                                                                                                       |

Rajat sijaitsevat kunkin yksikön tiedostossa `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(aiemmat arvot on säilytetty nimellä `override.conf.bak-20261018`), ja ne otettiin käyttöön ajon aikana komennolla
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — ilman uudelleenkäynnistystä, joten
käynnissä oleviin töihin ei puututtu. Tunnisteet muutetaan runners API:n kautta
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), niin ikään ajon aikana.

## Asenna siivousohjelma (kerran palvelimelle)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): 30 minuutin välein, loki tiedostoon /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` vaaditaan: siivousohjelma varmistaa polun olevan käyttämätön ottamalla yhden tilannekuvan avoimista
tiedostoista ennen polun poistamista. Ilman työkalua se ei poista mitään ja ilmoittaa siitä
(exit 1). Kokeile muutoksia ensin valinnalla `--dry-run` — se tulostaa täsmälleen, mitä se tekisi,
mutta ei muuta mitään.

Mitä se tekee jokaisella suorituskerralla: siivoaa omat jäännöksemme (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`), kun ne ovat olleet **3 h tmpfs:ssä**, ja 24 h levyllä
hakemistossa `_work/_temp`; lopettaa yli 75 minuuttia vanhan `next-build`-prosessin (mikään työ ei kestä niin kauan —
2026-08-27 yksi työ jatkui 70 minuuttia sen jälkeen, kun GitHub oli ilmoittanut työn kadonneeksi); poistaa yli 48 h vanhat
uloskuittaukset suoritusagenteilta, joiden yksikkö on **pysäytetty**; hälyttää, kun levyn käyttöaste on ≥ 85 %, muistin PSI-arvo
`full/avg60` on ≥ 10 % tai kuuntelijoita on enemmän kuin `MAX_ACTIVE_RUNNERS` (eriteltynä
omniroute-/muihin kuuntelijoihin). Exit 1 = toimenpiteitä tarvitaan; lue loki.

75 minuutin sääntö ei havaitse koontia, jonka suhteen GitHub on jo luovuttanut. Kun
`Runner.Listener` ei pysty uusimaan työtään, `_diag/Runner_*.log` näyttää viestin
`POST request to …/renewjob timed out after 100 seconds`, API ilmoittaa työn olevan `completed`
(epäonnistunut) noin kymmenen minuuttia viimeisen onnistuneen uusimisen jälkeen, ja `next-build` jatkaa suorittamista
ilman siihen liitettyä työtä (2026-10-18: työn #17066 koonti merkittiin epäonnistuneeksi klo 19.43, ja sen koonti varasi edelleen
40 Gt muistia viisi minuuttia myöhemmin). Vahvista viite uusimmasta `_diag/Worker_*.log`-tiedostosta ja lähetä sitten
SIGTERM vain koontipuun prosesseille PID:n perusteella — `next-build`, `npm run build`, `build-next-isolated.mjs` ja
`_work`-työprosessit. Älä koskaan koske prosesseihin `Runner.Listener`, `RunnerService.js` tai `Runner.Worker`:
työprosessi ilmoittaa työn peruutetuksi, ja kuuntelija palaa automaattisesti takaisin verkkoon.

## Suoritusagenttiyksiköt: KillMode

Suoritusagentin oletusarvoinen `KillMode=process` jättää ketjun `Runner.Worker → npm → next-build`
käyntiin, kun yksikkö pysäytetään tai käynnistetään uudelleen — orvoksi jäänyt koonti kuluttaa edelleen RAM-muistia ja
suoritinaikaa ilman siihen liitettyä työtä. Jokaisella OmniRoute-yksiköllä on lisämääritystiedosto
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`),
jossa on `KillMode=mixed`: ensin SIGTERM kuuntelijalle ja sitten SIGKILL koko cgroup-ryhmälle
`TimeoutStop`-ajan kohdalla. Se tulee voimaan yksikön seuraavan uudelleenkäynnistyksen yhteydessä — käynnistä uudelleen **yksi suoritusagentti
kerrallaan ja vain sen ollessa käyttämätön** siten, että käyttämättömyystarkistus ja uudelleenkäynnistys ovat samassa komennossa.

## Käyttösäännöt

- **Vain yksi Turbopack-koonti kerrallaan — rajoitus toteutetaan tunnisteella.** Jokainen täydellisen Turbopack-
  `next build` -komennon suorittava työ kohdistuu tunnisteisiin `[self-hosted, omni-build]`, ja vain **`omniroute-113-5`** sisältää tämän
  tunnisteen: `ci.yml`-tiedoston `Build`, `npm-publish.yml`-tiedoston `publish`, `nightly-v4-build`, `preview-artifact`,
  öinen a11y-koonti (#16853) ja `docker-publish.yml`-tiedoston **amd64** (webpack BuildKitin sisällä —
  Turbopack kaatui siellä paniikkivirheeseen, suoritus 33253576569). Dockerin arm64-osuus pysyy ympäristössä `ubuntu-24.04-arm`.
  `docker-publish`-työn amd64-osuus käyttää samaa `heavy-build-main`-rinnakkaisuusryhmää kuin `ci.yml`-tiedoston `Build`
  (`cancel-in-progress: false`). Docker Enginen on oltava palvelimella `omniroute-113-5`. Toinen Turbopack-
  paikka ei mahdu 78 gigatavuun (2 × 33–37 Gt sekä palvelimen muut kuormat); toinen paikka on turvallinen vain
  webpack-koonneille.
- **Vetopyyntöjen koonnit suoritetaan ylläpidetyillä suorittajilla (2026-10-18).** `ci.yml`-tiedoston `Build` käyttää `omni-build`-ympäristöä vain
  `push`- ja `workflow_dispatch`-tapahtumissa; jokaisen `pull_request`-tapahtuman (omasta alkuperästä tai forkista) ja `merge_group`-tapahtuman Build
  suoritetaan ympäristössä `ubuntu-latest` webpackilla. Kun jokainen omasta alkuperästä tullut PR ohjattiin tähän paikkaan, Turbopack-
  Build varasi sen 29–58 minuutiksi, 18 Build-työtä jonotti jopa 18 tuntia, ja julkaisuhaaran oma push-Build
  sai paikan kerran 40 työstä. Ylläpidetyllä suorittajalla sama PR:n Build kestää 8–12 minuuttia PR:n muiden
  töiden rinnalla. Turbopackia, jota `npm-publish` käyttää julkaistavassa paketissa, käytetään edelleen julkaisuhaarassa:
  oletushaaran öisessä a11y-koonnissa (04.41 UTC), jokaisessa paikkaan pääsevässä push- tai dispatch-Buildissa
  sekä itse `npm-publish`-työssä. `tests/unit/build/heavy-build-queue.test.ts`
  lukitsee neliehtoiset pääsyvaatimukset.
- **Älä koskaan mitoita Turbopack-paikkaa mitattua tarvetta pienemmäksi.** 2026-10-18 klo 18.06 paikan
  rajoja pienennettiin arvoista 56G/60G arvoihin 40G/44G, jotta `omni-release`-ympäristölle saatiin tilaa. Käännösvaihe pysyi
  koko suorituksensa ajan `MemoryHigh`-rajalla (muistin PSI:n `full` 30–43 %), eikä saman cgroup-ryhmän jakava
  `Runner.Listener` pystynyt uusimaan työvaraustaan. Omistajan 2026-10-17 määrittämät arvot 56G/60G palautettiin
  samana päivänä. Näitä arvoja pienemmillä rajoilla koonti ei epäonnistu vaan alkaa käyttää resursseja tehottomasti, ja työ menetetään.
- **Release-Greenillä on oma paikkansa (2026-10-18).** Siihen asti molemmat Release-Green-tarkistukset suoritettiin
  `omni-build`-ympäristössä: jokaisella push-tapahtumalla (~10 tunnissa; yhden päivän aikana 97 suoritusta sadasta peruttiin kesken työn)
  sekä kolmessa noin kahden tunnin täydellisessä tarkistuksessa päivässä (klo 05.29 alkanut tarkistus odotti paikkaa kuusi tuntia) —
  yksittäiseen koontipaikkaan kohdistui moninkertainen ylikuormitus, ja omasta alkuperästä tulleiden PR:ien Build-työt odottivat tuntikausia.
  `release-green` ja `main-green` kohdistuvat nyt ympäristöön `omni-release` (vain `omniroute-113-6`) käyttäen asetusta
  `OMNIROUTE_USE_TURBOPACK=0`, eikä aloitettua suoritusta enää peruta uudemman push-tapahtuman vuoksi (odottava
  paikka yhdistää edelleen tapahtumaryöpyn). `tests/unit/build/runner-capacity-routing.test.ts`
  lukitsee reitityksen, webpack-valinnan sekä sen, ettei mikään `omni-release`-ympäristössä käytä koontiin Turbopackia.
- **Kevyt pooli: `omni-light`.** `omniroute-113` ja `omniroute-113-2` suorittavat öiset työt, jotka tarvitsevat
  vain taustajärjestelmän `next build` -koonnin (~5–6 Gt; webpack), sekä `quality.yml`-tiedoston `lint-guard`-työn. Palvelimella `omniroute-113`
  oli `MemoryHigh=4G` päivään 2026-10-18 asti — promptfoo-koonti käytti 54 minuuttia muistinhallinnan aiheuttamaan hidasteluun;
  8 Gt poistaa rajoittamisen.
- **Tarkoituksella vähemmän kuuntelijoita.** Neljä OmniRoute-yksikköä poistettiin käytöstä 2026-08-29 — jokainen ylimääräinen
  kuuntelija kuluttaa osansa edellä mainitusta muistibudjetista. Siivoojan yläraja on 6 (`MAX_ACTIVE_RUNNERS=6` cronissa): se laskee
  kaikki palvelimen `Runner.Listener`-prosessit, ja OmniHeuris sekä OmniMind lisäävät kaksi kuuntelijaa meidän neljämme lisäksi.
- **Älä koskaan siivoa `/tmp`- tai `_work`-hakemistoa käsin, kun jokin suorittaja on varattuna.**
  Tarkistuksen ja poistamisen suorittaminen erikseen niin, että niiden väliin jää tauko, johti käynnissä olevan Build-työn
  `_work`-hakemiston menettämiseen 2026-08-27. Siivooja tekee tarkistuksen ja poiston yhdessä vaiheessa;
  anna sen hoitaa tehtävä.
- Suorittajan pysäyttäminen kesken työn peruu työn (havaittu käytännössä): käytä komentoa `systemctl stop` vain,
  kun sen kuuntelijalla ei ole `Runner.Worker`-lapsiprosessia — ja tee tarkistus sekä pysäytys yhdellä komennolla.
- Työnkulut eivät saa varastoida artefakteja hakemistoon `/tmp` (se sijaitsee RAM-muistissa). Lataa ne hakemistoon
  `$RUNNER_TEMP` (levyllä, suorittajakohtainen) — 1,3 Gt:n `next-build`-artefaktin tallentaminen tmpfs:ään kesti 27–32
  minuuttia, kun taas sen lähettäminen levyltä kesti 2 minuuttia.
- `.15`-VPS on tarkoitettu vain homologointiin — siinä ei koskaan suoriteta CI-suorittajia.

## GitHub-hostattu suorituskaista (GitHub-hosted runners)

Tili on **Pro**-tilauksessa: käytettävissä on **40 samanaikaista GitHub-hostattua työtä**, jotka jaetaan kaikkien PR-tarkistusten,
kaikkien push-tapahtumien käynnistämien työnkulkujen ja CodeQL:n oletusmäärityksen kesken. Mittauksessa 2026-10-18
yhdistämiskampanjan aikana (~10 yhdistämistä tunnissa haarassa `release/v3.8.52`) **2 500 työnkulun suoritusta luotiin
24 tunnissa**, haaraan tehtiin 44 push-tapahtumaa 6 tunnissa ja **106 GitHub-hostattua työtä jäi jonoon**, kun PR-tarkistukset odottivat
tunteja ja PR:t yhdistettiin ilman niitä. Yhdeksän työnkulkua käynnistyi jokaisesta haaraan tehdystä push-tapahtumasta:

| per push kohteeseen `release/v*`            | GitHub-hostattuja töitä | lopputulos ruuhkan aikana                                                              | 2026-10-18 alkaen                                                                  |
| ------------------------------------------- | ----------------------: | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `ci.yml` (koko matriisi)                    |             enintään 30 | seuraava push peruutti, 24/24 yhden päivän aikana                                      | ei käynnistetä `release/**`-push-tapahtumista (PR-suoritus + Release-Green)        |
| `quality.yml`                               |                      ~6 | peruutettiin, 23/23                                                                    | ei käynnistetä `release/**`-push-tapahtumista                                      |
| `Release-Green` `--quick`                   |                       0 | suoritettiin `omni-build`-ympäristössä, 97/100 peruutettiin                            | `omni-release`-paikka, ei koskaan peruuteta, odottavat suoritukset yhdistetään     |
| `Lock released branch`, `OpenSSF Scorecard` |                       2 | yksi jonotettu suoritus kutakin push-tapahtumaa kohden                                 | yksi suoritus viitettä kohden (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (varjoraportti)        |                       1 | yksi GitHub-hostattu `npm ci` kutakin push-tapahtumaa kohden, ei koskaan peruuteta     | ennallaan — ehdokas `paths:`-suodattimelle                                         |
| `Publish to Docker Hub` → `Deploy to VPS`   |                       2 | peruutetaan push-tapahtumakohtaisesti; amd64-osuus kilpailee `omni-build`-ympäristössä | ennallaan — omistajan käyttöönottokanava                                           |
| CodeQL:n oletusmääritys (`dynamic`)         |                       4 | `javascript-typescript`, `actions`, `c-cpp`, `python` kutakin push-tapahtumaa kohden   | ennallaan — Settings → Code security; `c-cpp`/`python` eivät skannaa täällä mitään |

`tests/unit/build/push-storm-diet.test.ts` lukitsee `ci.yml`- ja
`quality.yml`-tiedostojen push-käynnistimen vain `main`-haaraan. Sivuvaikutus: Codecov ei enää vastaanota peruslatausta kustakin julkaisuhaaran push-tapahtumasta (vaihe on
vain informatiivinen ja käyttää `continue-on-error`-asetusta); repositorion sisäinen kattavuusportti ja PR-kommentti
eivät muutu.

**Itse ylläpidetyn kapasiteetin lisääminen ei korjaa GitHub-hostattua jonoa.** Kehityspalvelin
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) voisi isännöidä runneria, mutta agentti-istunnot pitävät jo
sen kuorman tasolla 20–26, agenttisäilössä ei ole Docker-daemonia, ja ylikuormittunut kaista on
GitHub-hostattu. `.113`-palvelimella oli samalla hetkellä 71 GB vapaata tilaa ja kuorma 5–8; sen rajoitteena
on edellä mainittu kuuntelijakohtainen muistibudjetti (enintään 6 kuuntelijaa), ei CPU. Jäljellä olevat keinot
liittyvät prosessiin: yhdistä kampanjan PR:t Mergify-jonon kautta (`label=queue`, jolloin erät jakavat
yhden `merge_group`-CI-suorituksen sen sijaan, että kutakin PR:ää ja push-tapahtumaa kohden tehtäisiin oma suoritus), karsi CodeQL:n
oletusmäärityksen kielet ja suodata `release-acceptance.yml` sen lukemien tiedostojen perusteella.
