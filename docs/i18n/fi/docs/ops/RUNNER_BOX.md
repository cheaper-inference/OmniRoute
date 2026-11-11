# Self-Hosted Runner Box Operations (.113 pool) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Itsenäinen uima-allas toimii **.113** laatikko (`tomni-proxmox-113`). Vuodesta 2026-10-18 jokaisella OmniRoute juoksijalla on ollut **yksi rooli** , yksi tarra ja memory/CPU -budjetti, joka on mitoitettu sen työmäärän mukaan. Turbopack paikka saa sen, mitä rakennelma tarvitsee; muut raot mitoitetaan niiden mitattujen huippujen mukaan. Laatikko ylisitoutuu vain, kun Turbopack koonti on sama kuin Release-Green-verkkopaketin koontiversio ja nukkatyö; isäntäswap (16 GB) absorboi tämän, ja koska pull-request Buildit toimivat isännöitynä, Turbopack paikka on käyttämättömänä suurimman osan ajasta:

| juoksija             | etiketti                        | rooli                                                                                                                                                    | `MemoryHigh` / `MemoryMax`  | `CPUQuota`  |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Turbopack -koontiversiot: `ci.yml` `Build` (vain push/dispatch ), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, öinen a11y-versio | 56 GB / 60 GB (vaihto 0)    | 1600 %      |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), verkkopaketin rakennus                                                                                   | 20 GB / 24 GB (vaihda 4 GB) | 800 %       |
| `omniroute-113-2`    | `omni-light`                    | yölehdet (Schemathesis, promptfoo, garak, k6) ja `quality.yml` `lint-guard`                                                                              | 12 GB / 16 GB (vaihto 4 GB) | 600 %       |
| `omniroute-113`      | `omni-light`                    | sama allas kuin yllä                                                                                                                                     | 8 GB / 12 GB                | 400 %       |
| OmniHeuris, OmniMind | (heidän reponsa)                | Vain Dependabot (huippu 155 MB kukin, 18.10.2026)                                                                                                        | 4 GB / 6 GB                 | 200 % kukin |

Mitattu 18.10.2026:

| resurssi  | arvo                              | mitä se tarkoittaa aikataulun suhteen                                                                                                                                                                                                                                                                                                                                              |
| --------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 ydintä**             | Turbopack -tuotannon koonti oli huipussaan 49 GB rajaamaton (`tests/unit/ci-build-bundler-webpack.test.ts`); Seuraavana 16.3.8 pelkkä käännösvaihe sisältää ~ 40 GB (36 GB RSS `next-build` :ssa plus 17 kuormaustyöntekijää 3 GB ssä, mitattuna 2026-10-18); webpack build osoitteessa ~ 14–16 GB. Yksi Turbopack + yksi verkkopaketti sopii yhteen; kaksi Turbopack -versiota ei |
| vaihtaa   | 16 GB                             | `omniroute-113-5` toimii swap off (`MemorySwapMax=0`) - toiminnolla , joten karannut rakenne leikataan laatikon vaihtamisen sijaan                                                                                                                                                                                                                                                 |
| `/tmp`    | **12 GB tmpfs = RAM**             | kaikki sinne pysäköity on muistia; ylijäämät lakaistaan 3 tunnin kuluttua                                                                                                                                                                                                                                                                                                          |
| CPU       | havaittu kuormitus 60 32 ytimessä | ennen kiintiöitä yksi Turbopack -versio (~ 1166 % CPU) ja samassa laatikossa oleva coverage-paketti nälkivät muiden kuuntelijoiden sydämenlyönnit (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                            |
| juoksijat | **7 kuuntelijaa** (28.10.2026)    | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` sisältää myös `omni-build-60gb`:n; `omniroute-113-3/-4/-8` poistettiin reposta (2026-10-28)                                                                                                                                                                                                                                 |

Rajat ovat jokaisen yksikön `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` :ssa (aiemmat arvot pidettiin `override.conf.bak-20261018`) ja niitä sovellettiin reaaliaikaisesti `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — kanssa ilman uudelleenkäynnistystä, joten käynnissä olevaan työhön ei koskettu. Tarrat vaihdetaan juoksijoiden API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) kautta, myös livenä.

## Asenna vahtimestari (kerran, laatikkoon)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` vaaditaan: vahtimestari todistaa polun olevan tyhjäkäynnillä yhdellä avoimien tiedostojen tilannekuvalla ennen sen poistamista, ja ilman työkalua se ei poista mitään ja sanoo niin (exit 1). Kokeile mitä tahansa muutosta `--dry-run` :llä ensin — se tulostaa täsmälleen sen, mitä se tekisi eikä kosketa mitään.

Mitä se tekee joka ajolla: lakaisee omat jäänteet (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) jälkeen **3 tuntia tmpfs:llä** ja 24 tuntia `_work/_temp`-levyllä; hälyttää yli 75 minuuttia vanhemmasta `next-build` ja pitää sen käynnissä; karsii 48 v vanhoja kassoja juoksijoista, joiden yksikkö on **pysähtyi** ; hälytykset levyllä ≥ 85 %, muisti PSI `full/avg60` ≥ 10 % ja enemmän kuuntelijoita kuin `MAX_ACTIVE_RUNNERS` ( omniroute/other erittelyllä). Poistuminen 1 = vaatii huomiota; lue loki.

Pelkästään kulunut aika ei todista, että prosessi on orpo. Talonmies ei koskaan lähetä signaaleja iän perusteella. Nykyisiä `ZOMBIE_BUILD_MAX_MIN` ja `ZOMBIE_BUILD_COMM` -ympäristönimiä tuetaan edelleen cron-kokoonpanoissa. Ennen kuin siivoat epäillyn orvon, varmista, että sen tarkka GitHub -työ on päätelaite ja tunnista kyseiseen työhön kuuluvat prosessit. Kun `Runner.Listener` ei voi uusia tehtäväänsä, `_diag/Runner_*.log` näyttää `POST request to …/renewjob timed out after 100 seconds`, API raportoi työn `completed` (epäonnistuminen) noin kymmenen minuuttia viimeisen onnistuneen uusimisen jälkeen, ja `next-build` jatkaa toimintaansa ilman työtä (2026-10-18: #17066 :n koontiversio epäonnistui klo 19.43 ja sen koontiversio kesti vielä viisi minuuttia 40 GB myöhemmin). Vahvista viite uusimmassa `_diag/Worker_*.log` ssä, sitten SIGTERM vain PID — `next-build`, `npm run build`, `build-next-isolated.mjs` ja `_work` työntekijöiden rakennuspuu. Älä koskaan kosketa `Runner.Listener`, `RunnerService.js` tai `Runner.Worker`:tä: työntekijä ilmoittaa työn peruutetuksi ja kuuntelija palaa verkkoon itsestään.

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
  `next build` -komennon suorittava työ kohdistuu tunnisteisiin `[self-hosted, omni-build, omni-build-60gb]`, ja vain **`omniroute-113-5`** sisältää tämän
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
  kuuntelija kuluttaa osansa edellä mainitusta muistibudjetista. Siivoojan yläraja on 8 (`MAX_ACTIVE_RUNNERS=8` cronissa): se laskee
  kaikki palvelimen `Runner.Listener`-prosessit, ja OmniHeuris sekä OmniMind lisäävät kaksi kuuntelijaa meidän viiden kuuntelijamme lisäksi.
- **Unit- ja Vitest-työt pysyvät GitHub-hostattuina.** `ci.yml` lähettää unit-shardinsa ja Vitest-työn kohteeseen
  `[self-hosted, omni-ci]` vain, kun repositoriomuuttuja `vars.USE_VPS_TEST_RUNNER` on
  `true`, ja silloinkin vain saman repositorion `pull_request`-suorituksille; forkit, `merge_group` ja push-tapahtumat
  pysyvät `ubuntu-latest`-ympäristössä (`tests/unit/vps-runner-variable-scope.test.ts`). Muuttujan arvo on
  `false`. 2026-10-28 kolmelta 4-ytimiseltä `omni-ci`-kuuntelijalta kului 250–270 s komentoon `npm ci`, ja jokainen
  unit-shard osui 30 minuutin työrajaan, kun GitHub-hostattu shard vei noin 634 s, palvelimen kuorman ollessa
  17–24. Kuuntelijat poistettiin. Älä ota muuttujaa takaisin käyttöön ilman kuuntelijoita, jotka on mitoitettu
  unit-shardille.
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

Repositorio kuuluu `cheaper-inference`-organisaatiolle, joka on **Team**-tilauksessa: käytettävissä on **60
samanaikaista GitHub-hostattua työtä**, jotka jaetaan kaikkien organisaation repositorioiden, kaikkien PR-tarkistusten,
kaikkien push-tapahtumien käynnistämien työnkulkujen ja CodeQL:n oletusmäärityksen kesken. Alla olevat luvut mitattiin
**Pro**-tilauksen aikana (40 samanaikaista GitHub-hostattua työtä). Mittauksessa 2026-10-18
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
