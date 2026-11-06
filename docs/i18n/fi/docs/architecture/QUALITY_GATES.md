# Quality Gates Reference (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Tämä asiakirja on kaikkien OmniRouten CI-laatuporttien ensisijainen viite.
Siinä kuvataan jokainen portti, mitä se validoi, missä CI-työssä se suoritetaan, käyttääkö se
ratchet-vertailutasoa vai hyväksy/hylkää-käytäntöä ja estääkö se koontiversion muodostamisen vai onko se neuvoa-antava.

Lyhyt yhteenveto ja sallittujen kohteiden luettelon käytäntö ovat `AGENTS.md`-tiedoston
"Quality Gates & Ratchets" -osiossa. Saman järjestelmän kriittinen arviointi, kypsyysluokitus ja
työkaluista riippumaton toisintamissuunnitelma ovat
[laatuporttien käsikirjassa](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Porttien luettelo ja suoritusprofiilit

### Ehdokkaan hyväksyminen

CI- ja Quality Gates -työnkulut tuottavat kumpikin vakaan tuloksen: `Gate / CI` ja
`Gate / Quality`. Niiden versioitu hyväksymiskäytäntö luettelee jokaisen edeltävän työn
pakollisena tai neuvoa-antavana. Sovellettavan pakollisen työn on onnistuttava: puuttuva,
peruutettu, ohitettu, odottava tai tuntematon tulos ei voi osoittaa PASS-tulosta. Kelvollinen
vain dokumentaatiota tai vain luetteloa koskeva luokitus voi tehdä koodikaistasta soveltumattoman;
luonnos-PR ei ole hyväksytty ehdokas. `hotfix`-tunniste ei poista näyttövaatimusta.

Molemmat työnkulut kattavat main/release-haaroihin kohdistuvat PR:t, `main`-haaraan tehtävät pushit, manuaalisen käynnistyksen
ja merge group -tapahtumat. Push, dispatch ja merge group suorittavat täyden valikoiman. Pushit
`release/**`-haaroihin eivät käynnistä niitä (2026-10-18): jokainen muutos on jo suorittanut matriisin PR:ssä,
ja yhdistetty kokonaisuus kuuluu Release-Greenille (`docs/ops/RUNNER_BOX.md` → Hosted-kaista). Forkit
ja merge groupit käyttävät ylläpidettyjä ajajia töihin, jotka muutoin valitsisivat itse ylläpidetyt
ajajat; ylläpidetyn ympäristön riittävä kapasiteetti on varmistettava ennen käyttöönottoa.

Tavallinen PR suorittaa nopean valikoiman. Hyväksymiskäytännön `full-code`- ja `full-code-e2e`-kaistat
(E2E, integraatio, pakettiartefakti, Electron-savukoe, Bun SQLite, ekosysteemi
ja protokolla-asiakasohjelmat) suoritetaan vain Mergify-jonon luonnoksessa tai täydessä ajossa:
`gh workflow run ci.yml --ref <branch>`.

Jokainen JSON-kuitti yksilöi uloskuitatun SHA:n, työnkulun ajon ja yrityksen.
CLI hylkää uloskuittauksen ja tapahtuman SHA-arvojen ristiriidan. Työnkulun testit sitovat käytännön jäsenyyden
tulostyön `needs`-luetteloon, jotta uusi tai poistettu kaista ei voi kadota huomaamatta.
Kuitit kattavat oman työnkulkunsa, eivät julkaisua, käyttöönottoa tai olemassa olevan
neuvoa-antavan tarkistimen sisäistä toimintaa. Molempien tarkistusnimien ottaminen käyttöön haarasäännöissä on
erillinen hallinnollinen muutos; näiden töiden lisääminen ei itsessään suojaa haaraa.

### Yhdistämisjono

`queue`-tunniste lähettää PR:n Mergify-jonoon (`.mergify.yml`). Mergify avaa luonnos-PR:n
`mergify/merge-queue/`-haarassa, CI suorittaa siinä täyden valikoiman, ja alkuperäinen PR yhdistetään,
kun `Gate / CI`, `Gate / Quality` ja `Merge integrity (changelog + generated skills)` läpäisevät tarkistukset.

Mergify kirjoittaa jonoyhteenvedon luonnoksen kuvaukseen, ja myös muut sovellukset voivat muokata sitä.
Tällaisen luonnoksen `pull_request`-tapahtuma `edited` saa oman rinnakkaisuusryhmänsä
(`-queue-edit-<run_id>`), joten se ei voi peruuttaa luonnoksen varsinaista ajoa, ja se ohittaa portin sekä
matriisin. Vain `Merge integrity` suoritetaan edelleen. Ohitetulla porttityöllä on eri tarkistusnimi,
koska Mergify tulkitsee ohitetun `Gate / CI`-tarkistuksen epäonnistuneeksi ja poistaa PR:n jonosta.

Jonosta poistamisen jälkeen push ei aina lisää PR:ää uudelleen jonoon. Kommentoi siihen `@mergifyio queue`.

### Staattisen tarkistuksen luettelo

Versioitu npm-aliasten luettelo ja staattisten tarkistusten jäsenyys sijaitsevat tiedostossa
`config/quality/gate-manifest.json`. Suorita `npm run check:gate-manifest` vahvistaaksesi
skriptien nimet ja täsmälliset komennot tiedostoa `package.json` vasten; lisäykset, poistot ja
komentojen poikkeamat aiheuttavat virheen sekä paikallisessa koukussa että CI:n muutosluokittelutöissä.
Alias ei ole työnkulkutyö, matriisi-instanssi tai testitapaus: näitä lukumääriä
ei saa esittää keskenään vastaavina.

Käytä komentoa `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list`
tarkastellaksesi valittuja aliaksia suorittamatta niitä. Ajaja kutsuu
npm-aloituskohtaa, joten sen suoritusympäristö (mukaan lukien Bun, jos se on määritetty) säilyy.
Manifesti kirjaa näiden profiilien ulkopuoliset aliakset erikseen kutsuttaviksi, ja
ylläpitokomennot ovat kiellettyjä vain luku -tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen tarkistuksen. Ne eivät varmista tuotetestejä,
kattavuutta, paketointia, ulkoisia tarkistuksia tai ehdokkaan täyttä julkaisuhyväksyntää.
Työnkulun hyväksyntä käyttää linkitettyä tiedostoa `config/quality/admission-policy.json` ja
skriptiä `scripts/quality/admission-verdict.mjs`. Release-observer-profiilit pysyvät erillisinä;
tarkasta niiden sovellettavat tarkistukset ja kuitit erikseen. Alla oleva sanallinen
luettelo on viite, ei todiste portin tosiasiallisesta suorittamisesta.

Skriptit sijaitsevat hakemistoissa `scripts/check/` (käytäntöportit) ja `scripts/quality/` (ratchet-moottori).
CI:n ensisijainen totuuslähde on `.github/workflows/ci.yml`.

### Release-PR:n nopea polku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI:tä main/release-PR:issä, `main`-haaraan tehtävissä pusheissa,
manuaalisessa käynnistyksessä ja merge groupeissa. PR:t käyttävät polkujen mukaan suodatettuja nopeita tarkistuksia. Pysyvästi
käytöstä poistettu päällekkäinen koonti poistettiin; todelliset koonti-, paketointi- ja käynnistystarkistukset säilyvät CI:ssä.
Yksikkötestikokonaisuus ja vitest suoritetaan vain CI:ssä (`Unit Tests (N/8)` ja `Vitest`).

| Työ                                              | Laajuus                                                                                                                                                                      | Estävä                |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Dokumentaatio-/koodi-PR:t; API-dokumentaation viitteet ja kaikki dokumentaatiot                                                                                              | Kyllä                 |
| `Fast Quality Gates`                             | Koodi-PR:t; staattiset tarkistukset, tyyppitarkistus, hallintapaneelin tyyppitarkistus, muutosten kohteena olevat yksikkötestit, unohtuneet rinnakkaistestit (neuvoa-antava) |
| `No new ESLint warnings`                         | Koodi-PR:t; poikkeusten huomioiva lint-varmistus                                                                                                                             | Kyllä, myös forkeissa |
| `Merge integrity (changelog + generated skills)` | Muut kuin luonnos-PR:t; muutoslokin ja generoitujen taitojen synkronointi                                                                                                    | Kyllä, myös forkeissa |

#### Unohtuneiden rinnakkaistestien raportti

`npm run check:forgotten-sibling-tests` suoritetaan `Fast Quality Gates` -työn ohjeellisena vaiheena, ja se käyttää
uudelleen testivaikutuskartan taustalla olevaa tuontien selvitysmekanismia.
Jokaisesta muuttuneesta tuotantomoduulista se raportoi deterministiset
`changed module/symbol -> static consumer -> candidate sibling test` -ketjut, kun ehdokastesti
puuttuu pull requestin diffistä. Markdown-yhteenveto ja JSON-tulos säilytetään
`forgotten-sibling-tests`-työnkulun artefaktina kalibrointia varten ennen estävän tarkistuksen käyttöönottoa.

Barrel-uudelleenviennit ja dynaamiset tuonnit ovat vain selvitysdiagnostiikkaa; ne eivät koskaan luo
estävää havaintoa. Tarkistetut poikkeukset sijaitsevat tiedostossa
`config/quality/forgotten-sibling-allowlist.json`. Jokaisessa merkinnässä on nimettävä kuluttaja ja ehdokastesti,
annettava täsmälliset perustelut sekä linkitettävä GitHub-issueen tai pull requestiin. Virheellisesti muodostetut merkinnät
hylätään. Poikkeukset eivät voi ohittaa poistettua ehdokastestiä tai diffiä, joka lisää `.skip`/`.todo`-merkinnän;
väitteiden heikentäminen ja muu peittely kuuluvat edelleen itsenäisesti estävälle
`check:test-masking`-portille.

### Työ: `lint`

Suoritetaan jokaiselle `main`-haaraan kohdistuvalle pull requestille. Epäonnistuminen estää yhdistämisen.

| Komentosarja (`npm run ...`)      | Tarkistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Estävä                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js-versio on tuetulla versiovälillä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                       |
| `check:cycles`                    | Kehämäiset tuonnit kaikissa `src/`- ja `open-sse/`-hakemistoissa (AST-pohjainen, tsconfig-määrityksen `paths` selvitetään). Pelkkä suoritus päättyy koodilla 1 aina, kun yksikin kehä havaitaan (fail-closed-malli ongelmasta #15281 lähtien), ja luettelee SCC:t. `check:cycles:ratchet` (jonka CI suorittaa) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.cycles`-ylärajan — tällä hetkellä 14, `direction: down`, joten määrä voi vain pienentyä (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä (rajoitin)                            |
| `check:boundary`                  | `open-sse → src` -kytkentä: yksilölliset tiedostojen väliset tuonnit moottorista sovellukseen (`scripts/quality/measure-boundary.mjs`; yhteysluettelo on v4-ytimen ja moduulijaon korjausten työjono). Pelkkä suoritus = neuvoa-antava raportti (sama kuin `quality:boundary`). `check:boundary:ratchet` (jonka CI suorittaa ja joka kuuluu myös `quality.yml`-tiedoston nopeiden tarkistusten rajoitinsilmukkaan) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.boundaryOpenSseToSrc`-ylärajan — alkuarvoksi on asetettu mitattu 771, `direction: down`; `--update` voi vain pienentää sitä; PR-pyynnöissä vertailu tehdään perushaaraan nähden (`--base-ref`, katso alta)                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä (rajoitin)                            |
| `check:route-validation:t06`      | Zod-skeemat ovat käytössä kaikilla reiteillä (tason 6 käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any`-määrä ei ylitä budjettia (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:provider-consistency`      | Jokaisella tiedoston `providers.ts` palveluntarjoajalla on vastaava merkintä tiedostossa `providerRegistry.ts` (ja päinvastoin sallittujen luettelon rajoissa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:model-lifecycle`           | Kolme manuaalisesti ylläpidettävää reititystaulukkoa pysyvät yhdenmukaisina versionhallintaan tallennetun elinkaaren tilannevedoksen kanssa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ei pisteytä mitään poistettua tunnistetta, johon `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES`-kohde on mukana rekisterissä `REGISTRY` eikä sitä ole poistettujen tunnisteiden tilannevedoksessa; jokainen poistettu tunniste, joka on yhä rekisterissä `REGISTRY`, välitetään eteenpäin tai luetellaan kohdassa `allowedRetiredInCatalog`; eikä yksikään `DEFAULT_DEGRADATION_MAP`-lähde tai -kohde näy poistettuna kyseisessä tilannevedoksessa. Tämä ei todista, että aktiivinen ylävirran palvelu tarjoaa mallia tällä hetkellä. Suoritetaan ilman verkkoyhteyttä — vertaa tiedostoon `config/quality/model-lifecycle.json`, joka päivitetään manuaalisesti komennolla `npm run quality:refresh-model-lifecycle` (vaatii verkkoyhteyden; ei ole kytketty CI-putkeen). `allowedRetiredInCatalog` on asteittain tyhjennettävä räikkä: lisää merkintä vain, jos sille on seurantatehtävä.                                                      | Kyllä                                       |
| `check:fetch-targets`             | Jokainen asiakaspuolen hakemistossa `src/` oleva `fetch("/api/...")` viittaa todelliseen `route.ts`-tiedostoon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:deps`                      | Kaikki komennolla `npm install` asennettavat riippuvuudet repositorion jokaisessa `package.json`-tiedostossa ovat tiedostossa `dependency-allowlist.json`; uudet versioon lukitsemattomat tai slopsquatting-tyylisesti nimetyt paketit merkitään                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `audit:deps`                      | `npm audit` (juuri + electron) — ei vakavia tai kriittisiä tietoturvailmoituksia (osittain päällekkäinen osv-tarkistuksen `check:vuln-ratchet` kanssa; katso perustelujen kehitysjono)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                       |
| `check:lockfile`                  | `package-lock.json`-tiedoston eheys — https-rekisteri, eheystiivisteet, ei isäntäkohtaisia ohituksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:licenses`                  | Tuotantoriippuvuuksien SPDX-lisenssien sallittujen luettelo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                       |
| `check:tracked-artifacts`         | Ei koontiartefakteja / versionhallintaan lisättyjä `node_modules`-symbolisia linkkejä (suoritetaan myös huskyn pre-commit-vaiheessa; pre-push on tarkoituksella kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:ai-attribution`            | Ei tekoälyn/botin `Co-Authored-By`-lopputunnistetta tai tekoälyllä luomisesta kertovaa alatunnistetta PR:n commiteissa, otsikossa tai tekstissä — ehdoton sääntö #16 (`quality.yml`-tiedoston nopeiden tarkistusten silmukassa PR→`release/**` — lukee tapahtuman hyötykuorman, ei tee mitään PR:ien ulkopuolella — sekä vain PR:ille tarkoitetussa `ci.yml`-tiedoston lint-vaiheessa PR→`main`; lisäksi huskyn `commit-msg`-hookissa; ihmiskirjoittajat sallitaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Jokainen Vitest-poissulku nimeää seurantaongelman ja esiintyy tiedostossa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Kyllä                                       |
| `check:file-size`                 | Lähdetiedostot (`.ts`/`.tsx` hakemistoissa `src/`, `open-sse/`, `electron/`, `bin/`) pysyvät `cap`-rajan ja testitiedostot (`*.test.ts(x)`) `testCap`-rajan sisällä; tiedostossa `file-size-baseline.json` jäädytetyt tiedostot (`frozen` / `testFrozen`) eivät saa kasvaa tallennettua kokoaan suuremmiksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                       |
| `check:error-helper`              | Suorittimien/käsittelijöiden virhevastaukset käyttävät funktioita `buildErrorBody()` / `sanitizeErrorMessage()` (ehdoton sääntö #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:migration-numbering`       | Migraatioiden SQL-tiedostot on numeroitu juoksevasti ilman puuttuvia tai päällekkäisiä numeroita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `check:public-creds`              | OAuth-arvoille `client_id`/`client_secret` tai Firebase Web -avaimille ei ole literaaleja tiedoston `publicCreds.ts` ulkopuolella (ehdoton sääntö #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                       |
| `check:db-rules`                  | Ei raakaa SQL:ää hakemiston `src/lib/db/` moduulien ulkopuolella; ei koontimoduulituonteja tiedostosta `localDb.ts` (ehdottomat säännöt #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:known-symbols`             | Lähettäjätauluihinsa rekisteröidyt palveluntarjoajien suorittimet, reititysstrategiat ja muuntimet vastaavat levyllä olevia tiedostoja — ei irrallisia tai ilmoittamattomia symboleja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `check:route-guard-membership`    | Jokainen aliprosessin käynnistävä reitti on luokiteltu funktiolla `isLocalOnlyPath()` (ehdottomat säännöt #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                       |
| `check:test-discovery`            | Jokainen repon `*.test.ts`- / `*.spec.ts`-tiedosto kerätään vähintään yhdellä testiajon suorittajalla (ratchet: `test-discovery-baseline.json`-tiedoston orpolista voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `check:test-tla-order`            | Mikään `tests/unit`-hakemiston alla oleva `node:test`-tiedosto ei rekisteröi testiä, kohtaa ylätason `await`-lausetta ja rekisteröi sitten lisää testejä (#18045; ratchet: `test-tla-order-allowlist.json` voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:agent-skills-sync`         | Luodut agenttitaitojen artefaktit vastaavat lähdeluetteloaan (ei poikkeamia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Palveluntarjoajien logoilla/resursseilla on kirjattu alkuperätietomerkintä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON-määritystiedostot jäsentyvät oikein ja täyttävät repon lint-säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript-käännös ilman virheitä (vain neuvoa-antavia varoituksia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — tulevaisuuteen suuntaava; monet olemassa olevat kutsukohdat tarvitsevat edelleen annotaatioita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Ohjeellinen** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, jonka kohteeksi on rajattu `src/app/(dashboard)/**` (#7033) — komennon `typecheck:core` tarkoin valittu 27 tiedoston sallittujen luettelo ei sisällä yhtään koontinäytön TSX-tiedostoa, eikä `next build` myöskään koskaan tee niille tyyppitarkistusta (`next.config.mjs` asettaa arvon `ignoreBuildErrors: true`), joten irrallisiin tunnisteisiin liittyvät regressiot siellä (#6625/#6909) eivät näkyneet CI:ssä. Vertaa jäädytettyyn tiedosto- ja TS-koodikohtaisten määrien perustasoon (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentuneisuuden valvontamalli kuin komennossa `check:known-symbols`) — vain perustason määrän ylittävät UUDET virheet hylkäävät tarkistuksen; alenna perustasoa valitsimella `--update`, kun olemassa oleva virhe korjataan.                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:build-typecheck`           | Koko sovelluksen tuotantotyyppitarkistus tiedoston `tsconfig.build.json` perusteella (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), kattaen alueen, jota komennon `typecheck:core` 27 tiedoston sallittujen luettelo ja koontinäytön tarkistus eivät kata. Vertaa tiedostoon `config/quality/build-typecheck-baseline.json`; uusi tai kasvanut tiedosto- ja koodikohtainen määrä hylätään, kun taas pienempi määrä kehottaa alentamaan perustasoa. `--update` kieltäytyy toimimasta, jos suoritus sisältää uuden tai kasvaneen parin, ellei valitsinta `--force-regressions` anneta, ja kieltäytyy hyväksymästä uutta vaimennettua tiedostoa, ellei valitsinta `--force-nocheck` anneta. Näin perustason laajentaminen tarkistuksen läpäisemiseksi ja pysyvän vaimennuksen salliminen ovat kaksi erillistä, harkittua toimenpidettä. Pelkkä `--force` hylätään. Tarkistaa lisäksi koontialueen `@ts-nocheck`-merkinnät vertaamalla niitä tiedostoon `config/quality/ts-nocheck-baseline.json`, koska sitä käyttävä tiedosto ei ilmoita lainkaan diagnostiikkaa ja jäisi muuten näkymättömäksi kaikille tarkistuksille. | Kyllä                                       |

#### Kaksi tyyppitarkistusohjelmaa antaa erilaiset vastaukset

`typecheck:core` ja `check:build-typecheck` kääntävät eri ohjelmat eri
asetuksilla, ja sama tiedosto voi olla toisessa virheetön ja toisessa täynnä virheitä.

`tsconfig.build.json` asettaa arvon `"strict": false`, joten `noImplicitAny` ei ole käytössä. Ytimen
määritys kääntää tarkoin valitun 27 tiedoston sallittujen luettelon tiukemmilla asetuksilla ja seuraa kunkin
aloituskohdan tuontigraafia, joten myös tiedostot, jotka eivät koskaan esiinny koontiohjelmassa,
tarkistetaan siinä.

Tällä seurauksella on merkitystä arvioitaessa, onko tiedosto tyypitetty: **nolla diagnostiikkailmoitusta
komennolla `check:build-typecheck` ei tarkoita nollaa**. Merkinnän `@ts-nocheck` poistaminen 26
tiedostosta osoitti, että niistä 23 oli virheettömiä koontiohjelmassa; kuudessatoista näistä ilmeni noin
120 implisiittiseen `any`-tyyppiin liittyvää virhettä tiukassa ohjelmassa. Tarkista molemmat ennen kuin toteat tiedoston virheettömäksi.

### Työ: `quality-gate`

Suoritetaan vaiheen `test-coverage` jälkeen. Estää yhdistämisen epäonnistuessaan.

| Skripti                      | Tarkistaa                                                                                                                                                                             | Estävä                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | Tuottaa tiedoston `quality-metrics.json` (ESLint-varoitusten määrä, kattavuus yhdistetystä osaraportista)                                                                             | Kyllä (ennen ratchetia) |
| `quality:ratchet`            | Mikään tiedoston `quality-baseline.json` mittari ei ole heikentynyt (ESLint-varoitukset ≤ perustaso; kattavuus ≥ perustaso)                                                           | Kyllä                   |
| `check:duplication`          | Koodin päällekkäisyys (jscpd@4) ei ylitä tiedostossa `quality-baseline.json` määritettyä perustasoa                                                                                   | Kyllä                   |
| `check:complexity`           | Tiedostotason syklomaattinen kompleksisuus ei ylitä ylärajaa (ESLint-ytimen `complexity` + `max-lines-per-function`)                                                                  | Kyllä                   |
| `check:cognitive-complexity` | Kognitiivisen kompleksisuuden ratchet (`eslint-plugin-sonarjs`) — erillinen ESLint-ajo; CI suorittaa molemmat yhdistettynä yhdeksi `check:complexity-ratchets`-vaiheeksi              | Kyllä                   |
| `check:dead-code`            | Käyttämättömien vientien/tiedostojen ratchet (knip) ei heikkene perustasoon verrattuna                                                                                                | Kyllä                   |
| `check:compression-budget`   | Pakkausvertailun budjetti — moottorikohtaiset tunnussäästöjen vähimmäisrajat eivät saa heikentyä                                                                                      | Kyllä                   |
| `check:type-coverage`        | Tyypitetyn koodin prosenttiosuuden ratchet (`type-coverage`) ei heikkene; korvaa suurelta osin tarkistuksen `typecheck:noimplicit:core`                                               | Kyllä                   |
| `check:codeql-ratchet`       | Avointen CodeQL-hälytysten määrä ei kasva (lukee komennolla `gh api`; ohitetaan hallitusti ilman tunnistetta) — päivitystiheys ja manuaalinen käynnistys: katso alta ”CodeQL-ratchet” | Kyllä                   |

### Työ: `quality-extended`

Koko työ on neuvoa-antava (`continue-on-error: true`). npm-pohjaiset ratchet-tarkistukset suoritetaan
oikeasti; ulkoiset tarkistustyökalut asennetaan komennolla `gh release download`, ja ne ohittavat
tarkistuksen itse (exit 0), jos binääri puuttuu edelleen.

| Skripti                  | Tarkistaa                                                                                                                                                                                                                                                                       | Estävä                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Ei syklisiä riippuvuuksia (dpdm)                                                                                                                                                                                                                                                | **Neuvoa-antava**                                 |
| `check:bundle-size`      | Paketin koko ei ylitä ylärajaa                                                                                                                                                                                                                                                  | **Neuvoa-antava**                                 |
| `check:secrets`          | Salaisuuksien tarkistus (gitleaks) — ohitetaan, jos binääri puuttuu                                                                                                                                                                                                             | **Neuvoa-antava**                                 |
| `check:vuln-ratchet`     | Riippuvuuksien haavoittuvuudet (osv-scanner) eivät lisäänny — ohitetaan, jos binääri puuttuu                                                                                                                                                                                    | **Neuvoa-antava**                                 |
| `check:workflows`        | Työnkulkujen lint-tarkistus (actionlint + zizmor); puuttuvat tai rikkinäiset tarkistustyökalut, virheelliset raportit tai puuttuva ratchet-perustaso aiheuttavat INCOMPLETE-virheen. Kelvollisiin löydöksiin sovelletaan valittua tiukkaa, neuvoa-antavaa tai ratchet-käytäntöä | Suoritus pakollinen; zizmor-ratchet estävä CI:ssä |
| `check:openapi-breaking` | Julkisen API-sopimuksen (`openapi.yaml`) rikkovat muutokset suhteessa perushaaraan (oasdiff) — tuottaa arvon `openapiBreaking=N`; ohitetaan, jos oasdiff puuttuu tai perusmääritystä ei voida selvittää                                                                         | **Neuvoa-antava**                                 |

### Työ: `docs-sync-strict`

Suoritetaan jokaisessa `main`-haaraan kohdistuvassa PR:ssä. Estää yhdistämisen epäonnistuessaan.

| Skripti                        | Tarkistaa                                                                                                                                                                                        | Estävä                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `check:docs-all`               | Metaportti, joka suorittaa alla olevat 6 aliporttia peräkkäin                                                                                                                                    | Kyllä                     |
| ↳ `check:docs-sync`            | CHANGELOGin / OpenAPI:n / llm.txt:n versioiden yhdenmukaisuus                                                                                                                                    | Kyllä                     |
| ↳ `check:docs-counts`          | Tekstin lukumäärät (palveluntarjoajien määrä, migraatioiden määrä jne.) ovat todellisten lukumäärien räikkäikkunan sisällä                                                                       | Kyllä                     |
| ↳ `check:env-doc-sync`         | Jokainen `.env.example`-tiedoston ympäristömuuttuja on dokumentoitu dokumentaation taulukossa ja päinvastoin                                                                                     | Kyllä                     |
| ↳ `check:deprecated-versions`  | Dokumentaatiossa ei ole vanhentuneita vers merkkijonoja                                                                                                                                          | Kyllä                     |
| ↳ `check:doc-links`            | Dokumentaation sisäiset markdown-linkit viittaavat olemassa oleviin tiedostoihin (`[text]`/`(path)`-muoto)                                                                                       | Kyllä                     |
| ↳ `check:fabricated-docs`      | Dokumentaatiossa mainitut reitit, ympäristömuuttujat, CLI-komennot, hook-nimet ja tiedostopolut ovat olemassa koodikannassa. Kova portti `--strict`-valitsimella; pehmeä virhe ilman valitsinta. | Kyllä (`--strict` CI:ssä) |
| `check:cli-i18n`               | CLI-komentomerkkijonot ovat kaikissa i18n-lokaalitiedostoissa                                                                                                                                    | Kyllä                     |
| `check:openapi-coverage`       | OpenAPI-määritys kattaa vähintään räikällä määritetyn todellisten reittien vähimmäismäärän                                                                                                       | Kyllä                     |
| `check:openapi-security-tiers` | `openapi.yaml`-tiedoston suojaustasomerkinnät vastaavat `routeGuard.ts`-tiedoston luokituksia                                                                                                    | **Ohjeellinen**           |
| `check:openapi-routes`         | Jokainen `openapi.yaml`-tiedoston polku viittaa olemassa olevaan `route.ts`-tiedostoon (hallusinaatioiden esto)                                                                                  | Kyllä                     |
| `check:docs-symbols`           | Jokainen `docs/**/*.md`-tiedostojen `/api/...`-viittaus viittaa olemassa olevaan `route.ts`-tiedostoon (hallusinaatioiden esto)                                                                  | Kyllä                     |
| `i18n translation drift`       | Kääntämättömät avaimet i18n-lokaalitiedostoissa — vain varoitus                                                                                                                                  | **Ohjeellinen**           |

Hakemiston `docs/diagrams/` kaksitoista README-SVG-kuvaa luodaan automaattisesti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` luo ne kaikki uudelleen). Jokaisella on tavutasolla vertaileva yksikkötesti
(`tests/unit/docs/readme-*-svg.test.ts`, työ `test-unit`), joka epäonnistuu, kun commitoitu tiedosto on
vanhentunut. Lisäksi `check:docs-counts` lukee kanoniset luvut niiden `<text>`-solmuista — siksi
ääriviivamuunnosvaihe säilyttää jokaisen ääriviivoiksi muunnetun merkkijonon tiedostossa näkymättömänä `<text>`-elementtinä. SVG-kuvien kanonisten lukujen tarkistus lukee luettelossa
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) mainitut tiedostot: `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` sekä `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`;
pysyvästi maksutonta käyttöä, luettelomerkintöjä, toistuvaa poolia ja pisteytystekijöitä koskevat väitteet lukevat myös tiedostot
`promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. `free-tier-budget.svg`
hakee lukunsa käytössä olevasta luettelolataajasta, joten muutos kohteeseen `FREE_MODEL_BUDGETS` tai
palveluntarjoajan näyttönimeen muuttaa CI:n punaiseksi, kunnes kyseinen tiedosto luodaan uudelleen.

### Työ: `i18n-ui-coverage`

| Skripti                             | Tarkistaa                                                                                                                                                                                                                                | Estävä          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (sisäinen) | Käyttöliittymän i18n-avainten kattavuus on ≥ 65 %                                                                                                                                                                                        | Kyllä           |
| `check-ui-value-drift` (sisäinen)   | Uudelleen kirjoitettu englanninkielinen **arvo** ei jätä jälkeensä vanhentunutta käännöstä                                                                                                                                               | Kyllä           |
| `check-new-key-coverage` (sisäinen) | **Uusi** englanninkielinen avain on käännetty jokaisessa lokaalissa — `__MISSING__:`-merkintää ei hyväksytä                                                                                                                              | Kyllä           |
| `check-translation-ratio`           | Oikeiden käännösten suhde lokaaleittain (sallittujen luettelon ulkopuoliset englannin kanssa identtiset / paikkamerkki- / puuttuvat lehdet) ei saa ylittää arvoa `config/quality/i18n-translation-baseline.json` + sallittu liikkumavara | **Ohjeellinen** |

Edellyttää asetusta `fetch-depth: 0` — arvomuutosten portti vertaa `en.json`-tiedostoa yhdistämiskantaan.

#### `check-ui-value-drift` — vanhentuneiden käännösten portti

Havaitsee ainoan i18n-regression, jota muut tarkistukset eivät rakenteensa vuoksi voi havaita: englanninkielinen arvo
kirjoitetaan uudelleen, mutta _aiemmasta_ englanninkielisestä tekstistä johdetut käännökset jäävät ennalleen, joten
muunkieliset käyttäjät lukevat edelleen vakuuttavasti muotoiltua mutta nyt virheellistä tekstiä.

Tämä päätyi oikeasti julkaisuun. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravityn
kirjautumisavustaja lisättiin (#5203); **39 kieliversiota 43:sta** säilytti tekstin, joka kehotti ylläpitäjiä "kopioimaan
koko URL-osoitteen ja liittämään sen alle" — työnkulku, jota ei voi suorittaa loppuun kyseisellä palveluntarjoajalla. Se jäi
huomaamatta aina muutokseen #8463 asti, koska:

- `sync-ui-keys` täydentää vain **puuttuvat** avaimet, ei koskaan **vanhentuneita**;
- `check-ui-keys-coverage` laskee avainten _olemassaolon_, joten vanhentunut käännös tulkitaan katetuksi;
- `check-translation-drift` seuraa dokumentaation peilikopioita kohdassa `docs/i18n/<locale>/**.md` —
  se ei koskaan lue tiedostoja `src/i18n/messages/*.json`. Estävä jobissa `docs-sync-strict` uudelleensynkronoinnista
  2026-09 alkaen: muokkaa ydindokumenttia → `npm run i18n:run -- --files=<doc>` (osiotasoinen, kevyt).

**Diff-tietoinen, ei perustasoon nojaava.** Se vertaa yhdistämiskannan `en.json`-tiedostoa
työpuuhun; jokaiselle avaimelle, jonka englanninkielinen arvo muuttui, kaikki kieliversiot, joissa
muuttamaton käännös on edelleen käytössä, ovat vanhentuneita. Tämä tarkoituksella **jäädyttää olemassa olevan velan** — diff
ei voi paljastaa, mistä vanhasta englanninkielisestä tekstistä pitkään käytössä ollut käännös on peräisin, joten tarkistus arvioi
vain nykyisen muutoksen koskettamia kohtia. Vaihtoehto (avainkohtainen hajautusarvojen perustaso) vaatisi
noin 600 KB:n generoidun tiedoston, joka olisi kolme kertaa suurin nykyinen perustaso ja muuttuisi jokaisessa i18n-PR:ssä.

Tarkistuksen voi läpäistä kahdella tavalla:

1. päivitä kyseiset käännökset tai
2. aseta niiden arvoksi `__MISSING__:<new english>` — suoritusympäristö näyttää tällöin korjatun englanninkielisen tekstin
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ja avain lisätään käännösjonoon.

Jos merkkijonon **merkitys** muuttui, suosi **avaimen nimeämistä uudelleen**: uusi avain ei voi periä
vanhentunutta käännöstä. Muutoksessa #8463 käytettiin tätä mallia.

```bash
npm run i18n:check-value-drift          # tiukka (CI käyttää tätä)
npm run i18n:check-value-drift:warn     # vain raportointi
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Palauttaa arvon 0 ja tekstin `SKIP reason=base-unresolved`, kun perusluetteloa ei voida lukea (matala
klooni ilman perusviitettä), samalla tavoin kuin `check-openapi-breaking`.

### Jobi: `i18n`

Täysi i18n-validointimatriisi (yksi jobi kutakin kieliversiota kohden). Koko jobi on neuvoa-antava.

| Skripti                         | Validoi                                   | Estävyys                                                   |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Käännöksen täydellisyys kieliversioittain | **Neuvoa-antava** (`continue-on-error: true` koko jobissa) |

### Jobi: `pr-test-policy`

Suoritetaan vain pull requesteille.

| Skripti                | Validoi                                                                                                                                                         | Estävyys |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR:ien, jotka muuttavat tuotantokoodia hakemistoissa `src/`, `open-sse/`, `electron/` tai `bin/`, on lisättävä tai päivitettävä testejä (ehdoton sääntö #8)     | Kyllä    |
| `check:test-masking`   | Muutetut testitiedostot eivät vähennä assert-lauseiden nettomäärää eivätkä lisää `assert.ok(true)`-tautologioita                                                | Kyllä    |
| `check:pr-evidence`    | PR:n kuvaus sisältää viittaukset muutoksen testi-/VPS-todisteisiin (automatisoi ehdottoman säännön #18 etsimällä osumia PR:n tekstistä — hauras, katso Backlog) | Kyllä    |

### Jobi: `test-vitest`

Suoritetaan `build`-jobin jälkeen. Virhe estää yhdistämisen.

| Testikokonaisuus | Validoi                                                           | Estävyys                                                                                                                                             |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-palvelin (110 työkalua), autoCombo, välimuisti — vitest-ajaja | Kyllä                                                                                                                                                |
| `test:vitest:ui` | Käyttöliittymäkomponenttien testit — vitest-ajaja                 | **Estävä** — olemassa olevat virheet on nimenomaisesti suljettu pois tiedostossa `vitest.config.ts`; uudet virheet aiheuttavat jobin epäonnistumisen |

### Öiset työnkulut (ajastettuja, neuvoa-antavia)

Nämä suoritetaan cron-aikataulun mukaisesti (sekä komennolla `workflow_dispatch`), eivät koskaan PR:issä. Kaikki ovat neuvoa-antavia.

| Työnkulku              | Validoi                                                                                                                                                                                                 | Estävä            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | fast-check-ominaisuustestit satunnaissiemenellä ja suurella ajomäärällä                                                                                                                                 | **Neuvoa-antava** |
| `nightly-resilience`   | keon kasvun tarkistus, kaaosvikojen injektointi, k6-kuormitus-/kestävyystestaus                                                                                                                         | **Neuvoa-antava** |
| `nightly-llm-security` | promptfoo-injektiosuojaus (estotila) + garak-koetukset (ohitetaan ilman palveluntarjoajan salaisuutta)                                                                                                  | **Neuvoa-antava** |
| `nightly-schemathesis` | OpenAPI-sopimuksen fuzz-testaus (schemathesis) käynnissä olevaa OmniRoutea vasten käyttäen tiedostoa `docs/openapi.yaml` — tuo esiin määrittelyrikkomukset / käsittelemättömät 500-virheet (Fase 8 B.4) | **Neuvoa-antava** |
| `nightly-mutation`     | Stryker-mutaatiotestauksen pistemäärä nopealla yksikkötestauskaistalla — selviytyvät mutantit paljastavat heikot tarkistukset                                                                           | **Neuvoa-antava** |
| `nightly-compat`       | Node-ajoympäristön yhteensopivuusmatriisi tuetuilla `engines.node`-versioalueilla                                                                                                                       | **Neuvoa-antava** |

Suorituskyvyn vertailutasot (keko, TTFB, koontiaika) tallennetaan, mutta niitä ei käytetä estoehtoina: katso [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Nopeusvaihe (2026-08-30 → v4.0 LTS): jokaista vertailutasoa lievennetty 20 %

Omistajan päätös (2026-08-30): v4.0:n modularisointiin asti julkaisunopeus on tärkeämpää
kuin teknisen velan rajan säilyttäminen. Jokaista **numeerista** kiristyvän rajan vertailutasoa lievennettiin 20 %
yhdellä auditoitavalla muutoksella, ja vaihe on määritelty tiedostossa `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mikä muuttui                                                                                                                                                                                                              | Missä                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — pienempi-on-parempi-määrät ×1,2, suurempi-on-parempi-prosentit ÷1,2 (kattavuuden alaraja 60 säilytettiin, `eslintErrors` pysyy arvossa 0, `eslintWarnings` 0 → 20 % jäädytettyjen ohitusten määrästä) | `quality-baseline.json` (`_relax_velocity_2026_08_30`-huomautus luettelee jokaisen ennen → jälkeen -muutoksen) |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                        |
| `cap`, `testCap`, jokainen `frozen[*]`- / `testFrozen[*]`-rivien raja ×1,2                                                                                                                                                | `file-size-baseline.json`                                                                                      |
| tiedostokohtaiset / TS-koodikohtaiset määrät ×1,2                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`         |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                                     |
| `--require-tighten` muuttuu neuvoa-antavaksi, kun `_policy.requireTighten === false`                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                                    |
| öinen `bank-ratchet-shrinks` keskeytetään (se tallentaisi mitatun pienenemisen ja poistaisi liikkumavaran)                                                                                                                | `.github/workflows/nightly-release-green.yml`                                                                  |

Sallittujen poikkeusten luettelot (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **eivät** ole budjetteja, eikä niitä muutettu. Hyväksytty/hylätty-käytäntöportit (salaisuudet, SQL-säännöt,
dokumentaation ja ympäristön välinen sopimus, i18n-yhdenmukaisuus, yksikkötestit) eivät muutu — hylätty testi on edelleen hylätty testi.

**Työkalut**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — kertaluonteinen
  lievennys (`scripts/quality/relax-baselines.mjs`); kieltäytyy suorittamasta toimintoa kahdesti samalla
  huomautuksella.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mittaa jokaisen numeerisen portin samalla tavalla kuin CI ja tulostaa kunkin portin jäljellä olevan liikkumavaran
  (`scripts/quality/baseline-headroom.mjs`). Öinen `baseline-headroom`-työ julkaisee
  taulukon työnkulun suorituksen yhteenvedossa ja lataa sen JSON-/Markdown-raportin artefaktina
  `baseline-headroom-<run_id>`, jota säilytetään 90 päivää. Varoitus- ja kriittiset rivit osoittavat portit,
  jotka ovat enintään 10 %:n päässä ylärajastaan tai jo ylittävät sen. Käytä näitä raportteja varhaisena varoituksena
  budjettien kulumisesta; tarkista kyseisen portin `_rebaseline_*`-huomautukset. Työ ei
  enää luo tai päivitä pysyvää issue-tikettiä; #12149 säilyttää aiemman raporttihistorian.

**Uuden koodin tila (Clean-as-You-Code) — 2026-08-30 alkaen, vain PR-pikapolulla**

`pull_request`-tapahtumissa `quality.yml` välittää parametrin `--base-ref <PR base SHA>` komennoille `check:file-size`,
`check:complexity-ratchets` ja `check:dead-code`. Portit `check:complexity-ratchets` ja
`check:dead-code` vertaavat HEAD-versiota yhdistämiskantaan **rajoittuen PR:n muuttamiin tiedostoihin**
(`scripts/check/newCodeMode.mjs`: yhdistämiskanta luodaan väliaikaiseen
`git worktree` -työpuuhun, ESLint/knip suoritetaan siinä ja HEAD-versiossa, minkä jälkeen tiedostokohtaisia määriä verrataan):

- **estävä** — PR lisäsi syklomaattisen/kognitiivisen kompleksisuuden rikkomuksia tai kuolleita vientejä muuttamiinsa tiedostoihin
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` lokissa);
- **neuvoa-antava** — kokonaismäärä suhteessa jäädytettyyn vertailutasoon. Peritty poikkeama ei koskaan hylkää
  viatonta PR:ää; poikkeama jäädytetään uudelleen julkaisun täsmäytyksessä, ja liikkumavaratarkistus valvoo sitä.

`check:file-size` käyttää kantaviitettä omien sääntöjensä mukaisesti (`scripts/check/check-file-size.mjs`, #8522):
se tarkistaa puun jokaisen lähdekoodi- ja testitiedoston, lukee kunkin rivimäärän PR:n kannassa
komennolla `git show` ja hylkää tiedoston vain, jos se kasvaa suuremmaksi kuin sen vertailutason yläraja
(`frozen` / `testFrozen` tai vertailutason ulkopuolisen tiedoston tapauksessa `cap` / `testCap`) tai sen koko
kannassa sen mukaan, kumpi näistä on suurempi. Tiedosto, joka on jo poikennut kannassa, ei siten koskaan hylkää viatonta PR:ää.

`check:boundary:ratchet` soveltaa samaa sääntöä yksittäiseen lukuarvoonsa
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-tapahtumissa sekä
`quality.yml`-työnkulun nopeat portit että `ci.yml`-työnkulun lint-työ saavat PR:n perushaaran SHA:n, peruscommit
mitataan `git archive` -viennistä, ja PR epäonnistuu vain, kun sen `open-sse → src` -reunojen
määrä ylittää arvosta `metrics.boundaryOpenSseToSrc` ja peruscommitin määrästä suuremman. Raja-arvon
ylittävästä perustason poikkeamasta ilmoitetaan (`peritty perustason poikkeama`), mutta se ei koskaan merkitse viatonta PR:ää epäonnistuneeksi; push → main
säilyttää absoluuttisen raja-arvon, ja perus-SHA, jota ei voida selvittää, käyttää varoituksen kera tätä arvoa varavaihtoehtona.

`workflow_dispatch`-ajot, julkaisun vihreän tilan tarkistusajo ja öinen liikkumavaran tarkistustyö eivät saa PR:n perustasoa,
joten ne säilyttävät absoluuttisen (globaalin) vertailun. Kattavuus, duplikaatio ja tyyppikattavuus pysyvät
toistaiseksi globaaleina (niiden työkalut eivät tuota tiedostokohtaista diffiä edullisesti) — ne ovat ehdokkaita samalle käsittelylle.

**Vaiheen päättäminen versiossa v4.0 (LTS = aiempaa tiukempi, ei "paluu normaaliin")**

1. Puhtaan `release/v4.0.0`-haaran kärjessä: suorita dokumentointia varten `npm run quality:headroom --json`, sitten
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` sekä kunkin tyyppitarkistusportin
   `--update` — jokainen perustaso laskee mitattuun arvoon.
2. Poista `_policy` tiedostosta `quality-baseline.json` (ottaa `--require-tighten`-toiminnon ja öisen
   liikkumavaran kerryttämisen uudelleen käyttöön) ja palauta `THRESHOLD = 36` (tai suurempi) tiedostossa `check-openapi-coverage.mjs`.
3. Tiukenna mitattuja arvoja pidemmälle siellä, missä modularisointi tuotti tulosta: tiedostokoon `cap` takaisin arvoon 1000
   (tai 800), kattavuuden alarajoihin +5 ja kuolleiden vientien määräksi 0 modularisoiduissa paketeissa.

## Ratchet-perustaso (`quality-baseline.json`)

Ratchet-moottori (`scripts/quality/check-quality-ratchet.mjs`) lukee tiedoston `quality-baseline.json`
ja vertaa sitä juuri kerättyyn `quality-metrics.json`-tiedostoon. Jos jokin mittari heikkenee
epsilon-arvoaan enemmän, koonti epäonnistuu.

Tällä hetkellä seurattavat mittarit:

| Mittari               | Suunta | Merkitys                               |
| --------------------- | ------ | -------------------------------------- |
| `eslintWarnings`      | `down` | ESLint-varoitusten määrä ei saa kasvaa |
| `coverage.statements` | `up`   | Lausekattavuus ei saa laskea           |
| `coverage.lines`      | `up`   | Rivikattavuus ei saa laskea            |
| `coverage.functions`  | `up`   | Funktiokattavuus ei saa laskea         |
| `coverage.branches`   | `up`   | Haarakattavuus ei saa laskea           |

Päivitä perustaso aidon parannuksen jälkeen seuraavasti:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update`-valitsin kirjoittaa nykyiset mitatut arvot tiedostoon `quality-baseline.json`.
Commitoi tämä tiedosto yhdessä mittaria parantaneen muutoksen kanssa. PR, joka parantaa
mittaria päivittämättä perustasoa, havaitaan `--require-tighten`-valitsimella (vaihe 6A.5,
toteutus odottaa).

### CodeQL-ratchet: päivitysväli ja manuaalinen käynnistys

`check:codeql-ratchet` lukee **repositoriotilaa, joka päivitetään ajastetusti — ei PR-kohtaisesti.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ilmoittaa
`state: configured`, `schedule: weekly`: kyseessä on GitHubin oletusasetuksen tarkistus, ei jokaisen
pushin yhteydessä suoritettava analyysi. Tästä seuraa, että kun hälytyksiä KORJAAVA PR on yhdistetty,
ratchet lukee edelleen vanhaa, suurempaa määrää seuraavan ajastetun tarkistuksen suorittamiseen asti —
joten se ilmoittaa regressiosta jokaisessa avoimessa PR:ssä, myös korjaavan PR:n omissa
jatkomuutoksissa, kunnes tarkistus saa tilanteen ajan tasalle.

**Manuaalinen päivitys**: `gh workflow run codeql.yml --ref release/vX.Y.Z` suorittaa
analyysin uudelleen ja julkaisee hälytykset uudelleen muutamassa minuutissa. Lue ensin
`.github/workflows/codeql.yml` — sen otsikko selittää, että se käyttää vain
`workflow_dispatch`-käynnistystä, **koska se on ristiriidassa GitHubin oletusasetuksen kanssa**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule`-käynnistysten palauttaminen edellyttää ensin **omistajan toimenpidettä**:
Settings → Code security → CodeQL: Default → Advanced. Älä lisää `schedule:`-käynnistystä ilman tätä
vaihtoa — se tuottaa ainoastaan epäonnistuvia suorituksia.

**Tiukenna perustasoa määrän laskettua** — `node scripts/check/check-codeql-ratchet.mjs
--update` kirjoittaa uuden mitatun määrän tiedostoon `quality-baseline.json` →
`metrics.codeqlAlerts.value`, jotta ratchet ei salli huomaamatta regressiota takaisin
vanhaan ylärajaan. Käytännön esimerkki (2026-09-02/03): PR #12502 korjasi 7 todellista hälytystä
(13 → 6 mitattua avointa hälytystä); PR #12530 tiukensi jäädytettyä perustasoa arvosta 11 arvoon 6
vastaamaan mittaustulosta; jäljellä olevat 6 hälytystä hylättiin tämän jälkeen hälytyskohtaisin
perusteluin, jolloin avoimia hälytyksiä jäi 0.

**Hylkäykset ovat operaattorin päätettävissä (ehdoton sääntö #14)** — älä koskaan hylkää
CodeQL-hälytystä kirjaamatta teknistä perustelua hylkäyskommenttiin: `won't fix`, jos kyseessä
on ylemmän tason protokollavaatimus, `used in tests`, jos kyseessä on testifixture, ja
`false positive`, jos kyseessä on puhdistus, jota CodeQL ei pysty havaitsemaan
(ennakkotapaus: `docs/security/ERROR_SANITIZATION.md`).

---

## Testien uudelleenyrityskäytäntö (WS5.4, v3.8.49)

Uudelleenyritykset määritetään suorittajakohtaisesti, eivät koskaan yleisenä käytäntönä — yleinen uudelleenyritys muuttaa todelliset regressiot
näkymättömiksi satunnaisiksi häiriöiksi:

| Suorittaja               | Käytäntö                                                                                                                                                           | Miksi                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)         | `retries: 1` vain CI:ssä sekä `trace: on-first-retry`                                                                                                              | Selaimen/verkon ajoitus on aidosti epädeterministinen; yksi uudelleenyritys ja jäljitys tekevät satunnaisesta häiriöstä diagnosoitavan artefaktin |
| Vitest                   | EI yleistä uudelleenyritystä. Todistetusti epävakaalle testille määritetään eksplisiittinen testikohtainen uudelleenyritys (näkyy diffissä ja tarkastetaan PR:ssä) | Pitää karanteeniluettelon repossa eikä koskaan läpinäkymättömänä                                                                                  |
| node:test (yksikkötesti) | EI uudelleenyrityksiä koskaan                                                                                                                                      | Epävakaa yksikkötesti on testissä oleva virhe — korjaa se, älä vain suorita sitä uudelleen                                                        |

Tavoiteltavat SLO:t, kun epävakaustelemtria on käytössä (WS5.2/5.3): <1 %:n epävakausaste testiä kohden
(”korjaa nyt” -kynnys), ≥95 %:n läpäisyaste putkea kohden. Toimialan viitearvoja —
kalibroi ne uudelleen omien mittaustemme perusteella.

## Julkaisutason räikän poikkeama (WS5.5, v3.8.49)

Kun räikkä (tiedostokoko, monimutkaisuus, eslint-varoitukset) taantuu PUHTAAN julkaisun
kärjessä — eli yhdistämisten YHDISTELMÄ aiheutti taantuman eikä yksikään PR yksinään toista
taantumaa omassa haarassaan — korjaus kuuluu **julkaisuvastaavalle, kerran,
julkaisuhaarassa**: suosi erottamista/refaktorointia; määritä perustaso uudelleen vain dokumentoidun
perustelumerkinnän kanssa. Älä koskaan siirrä yhdistelmäpoikkeamaa osallistujan PR:ään äläkä koskaan
määritä perustasoa uudelleen PR-kohtaisesti (se piilottaa todelliset regressiot). Tee ensin ero:
toista virhe puhdasta kärkeä vasten erillisessä worktree-työpuussa, ennen kuin oletat PR:si aiheuttaneen sen.

## Räikkärajojen pienennysten tallettaminen — alaspäin suuntautuva liike (#8584)

Räikkä on vain puoliksi automaattinen, ja juuri väärältä puolelta. Ylärajan **nostaminen** on
manuaalinen JSON-muokkaus, joka kestää kymmenen sekuntia ja on nopein tapa vapauttaa virhetilassa oleva PR.
Ylärajan **laskeminen** edellyttää, että joku suorittaa komennon `--update` ja commitoi tuloksen — ja ennen kuin
`bank-ratchet-shrinks`-työ otettiin käyttöön, mikään työnkulku ei tehnyt sitä. Mitattu seuraus
(2026-07-25): 18 jäädytettyä tiedostoa oli jo uusien tiedostojen 800 rivin ylärajan tasolla tai sen alapuolella, pahin
132-kertaisesti (`src/shared/validation/schemas.ts`, 19 rivillä 2 523:n yläraja);
monimutkaisuuden yläraja nousi `1794 → 2169` noin 37 perustason uudelleenmääritysmerkinnän aikana ja laski tasan kerran
(−1); ja ”tiukenna komennolla `--update` seuraavalla kierroksella” kirjoitettiin 31 kertaa mutta toteutettiin
kerran. Yläraja, joka säilyy sen oikeuttaneen koodin jälkeen, muuttaa huomaamatta jokaisen valmiin
pilkkomisen kasvunvaraksi sille, joka muokkaa tiedostoa seuraavaksi.

`nightly-release-green.yml` → työ **`bank-ratchet-shrinks`** sulkee tämän silmukan:

|           |                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| Suoritus  | `schedule` (3×/päivä) + `workflow_dispatch` — tarkoituksella **ei** `push`                                   |
| Mittaus   | korkein `release/vX.Y.Z`, sama ratkaisu- ja injektiosuoja kuin `release-green`                               |
| Kirjoitus | `check:file-size --update` ja `check:complexity-ratchets --update` (molemmat rakenteeltaan vain pienentäviä) |
| Varmistus | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| Toimitus  | yksi aina ajan tasalla oleva PR julkaisuhaaraa vasten — pakkopäivitetään, ei koskaan roskapostiteta          |

Tallettaminen tehdään erissä eikä jokaisen pushin yhteydessä, koska sille ei ole viivevaatimusta (8 tunnin
kuluessa talletettu pienennys riittää), kun taas yhdistämiskohtainen suoritus rakentaisi PR-haaran toistuvasti
uudelleen yhdistämiskampanjoiden aikana ja maksaisi täydestä ESLint-läpikäynnistä joka kerta. Havaitseminen tapahtuu edelleen
pushin yhteydessä (`release-green`); vain tallettaminen tehdään erissä.

### Turvallisuuden varmistin

Työ kirjoittaa perustasoihin ilman valvontaa, joten `verify-ratchet-bank.mjs` tekee
tästä hyväksyttävää. Se vertaa komennon `--update` jälkeistä puuta `HEAD`:iin ja **keskeyttää työn
ennen minkään commitin luomista** — avaamatta PR:ää — ellei jokainen muutos ole jokin seuraavista:

- numeerisen `frozen`- / `testFrozen`-merkinnän **laskeminen** tai **poistaminen**
- `complexity-baseline.json` → `count` **laskettu**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **laskettu**

Kaikki muu epäonnistuu: luvun nostaminen, merkinnän lisääminen, `cap`/`testCap`-arvon muuttaminen tai
`_rebaseline_*`-merkinnän poistaminen/uudelleenkirjoittaminen (nämä merkinnät ovat tarkastusketju sille, miksi kukin
yläraja on olemassa, ja ne tallennetaan samaan `frozen`-objektiin kuin tiedostomerkinnät).
Botti, joka voisi nostaa ylärajaa, olisi ehdottomasti nykytilannetta huonompi. Regressiosuoja:
`tests/unit/verify-ratchet-bank.test.ts`.

Työ ei koskaan pushaa haaraan `release/*` — ihminen yhdistää PR:n, joten virheellinen mittaus
ei voi päätyä mukaan ilman tarkastusta.

## Sallittujen poikkeusten käytäntö

Jokainen tarkistus, joka ei voi epäonnistua ennestään olemassa olevien rikkomusten vuoksi, käyttää jäädytettyä sallittujen poikkeusten luetteloa
(esim. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Käytäntö on:

**Korjaa juurisyy; käytä sallittujen poikkeusten luetteloa vain, kun rikkomus on ollut olemassa jo ennestään eikä sitä voida korjata samassa PR:ssä.**

Kun lisäät merkinnän sallittujen poikkeusten luetteloon:

1. Lisää kommentti, jossa perustelet poikkeuksen.
2. Viittaa seurantatehtävään (esim. `// #3498 — Vaiheen 2 ominaisuus, ei vielä toteutettu`).
3. Poista merkintä samassa PR:ssä, joka korjaa rikkomuksen — vanhentunut merkintä, joka ei enää
   ohita aktiivista rikkomusta, on itsessään virhe (6A.3:n vanhentuneiden sääntöjen valvonta
   hylkää tarkistuksen irrallisen sallittujen poikkeusten merkinnän vuoksi, kun se on toteutettu).

**Älä** lisää sallittujen poikkeusten merkintöjä vain saadaksesi testit läpäistyä nopeammin. Läpäisty tarkistus ja samalla kasvava
sallittujen poikkeusten luettelo luovat väärän käsityksen laadusta.

### Kun tarkistus epäonnistuu PR:ssäsi

1. **Lue tarkistuksen tuloste huolellisesti** — se kertoo täsmälleen, mikä tiedosto tai symboli rikkoi
   sääntöä.
2. **Korjaa rikkomus** — useimmat tarkistukset ovat deterministisiä tiedostojärjestelmän tarkistuksia, jotka läpäistään heti,
   kun koodi on oikein.
3. **Jos rikkomus on ollut olemassa jo ennestään** (eli et aiheuttanut sitä, mutta tarkistus
   kattaa sen nyt): lisää sallittujen poikkeusten merkintä, perustelukommentti ja viittaus seurantatehtävään.
4. **Jos tarkistus on räikkätyyppinen** (kattavuus, ESLint-varoitukset, duplikaatio, kompleksisuus):
   muutoksesi heikensi mittaria. Korjaa taustalla oleva ongelma tai suorita (harvoin)
   `npm run quality:ratchet -- --update`, jos muutos on tarkoituksellinen ja mittarin
   heikkeneminen hyväksyttävää — mutta dokumentoi syy PR:n kuvauksessa.
5. **Neuvoa-antavat tarkistukset** (`continue-on-error: true`) ovat informatiivisia — ne eivät estä
   yhdistämistä, mutta näkyvät CI-yhteenvedossa. Korjaa ne silti.

---

## Uuden tarkistuksen lisääminen

1. Luo `scripts/check/check-<name>.mjs` (tai `.ts`). Käytäntötarkistukset palauttavat lopetuskoodin 0/1.
   Räikkätyyppiset tarkistukset kirjoittavat mittarin tiedostoon `quality-metrics.json` komentosarjan `collect-metrics.mjs` kautta.
2. Lisää `"check:<name>": "node scripts/check/check-<name>.mjs"` tiedostoon `package.json`.
3. Kytke se tiedostossa `.github/workflows/ci.yml` asianmukaiseen työhön
   (käytäntö → `lint` tai `docs-sync-strict`; räikkä → `quality-gate`).
4. Jos sillä on sallittujen poikkeusten luettelo, käytä funktiota `reportStaleEntries()` tiedostosta
   `scripts/check/lib/allowlist.mjs`, jotta vanhentuneet merkinnät havaitaan automaattisesti.
5. Kirjoita hakemistoon `tests/unit/build/` testi, joka kattaa tarkistuksen tunnistuslogiikan.
6. Päivitä tämä asiakirja (lisää rivi asianmukaiseen työtaulukkoon).

---

## Agenttityökalut: LSP osana työnkulkua (valinnainen)

CI-tarkistusten lisäksi OmniRoute sisältää **valinnaisen** `agent-lsp`-rungon
(projektitason `.mcp.json`, vaihe 7, tehtävä 15). Luo `.mcp.json`
ja tuo TypeScript-kielipalvelin ohjelmointiagenttien saataville, jotta ne selvittävät symbolit /
diagnostiikan **ennen** koodin kirjoittamista — se täydentää `typecheck:core`-tarkistusta kääntämällä ennen väitteiden esittämistä
ja vähentää ”keksittyjen symbolien” virheitä niiden alkulähteellä. Sitä ei tarkoituksella
ladata automaattisesti (valitset ja varmennat MCP↔LSP-sillan itse); virheellinen merkintä kirjaa vain
yhteysvirheen lokiin eikä koskaan riko istuntoja.

---

## Rationalisointijono (ROI-katselmointi — vaihe 9, aalto 3)

Tämä luettelo täsmäytettiin `ci.yml`-tiedostoon 2026-06-17 (aiemmasta versiosta puuttuivat
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Täsmäytetyn kokonaisuuden ROI-katselmoinnissa
tunnistettiin seuraavat rationalisointiehdokkaat. **Yhdistämiset ovat mekaanisia CI-muutoksia;
käännöt ja poistot ovat operaattorille varattuja käytäntöpäätöksiä.** Mitään alla olevista
ei ole vielä toteutettu.

**Lisäksi yllä dokumentoimatta** (neuvoa-antavia, signaaliltaan heikkoja): `docs-lint`-työ
(markdownlint + Vale, koko työllä `continue-on-error`) ja erilliset tarkistustyönkulut
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` on
`quality-baseline.json`-tiedostossa, mutta sitä ei ole kytketty estävään räikkään `ci.yml`-tiedostossa — mittari
on tällä hetkellä irrallinen.

### Yhdistäminen / päällekkäisyyksien poisto (mekaaninen, pienempi riski)

Jokainen ehdokas validoitiin aktiivista porttitilaa vasten 2026-06-17 (luota, mutta varmista);
useat ”ilmeiset” yhdistämiset osoittautuivat peittävän velkaa, eivätkä ne ole **suoraan**
korvattavissa.

- **`check:docs-sync` suoritetaan kahdesti** — erillisenä `lint`-työssä ja uudelleen `check:docs-all`-tarkistuksen (`docs-sync-strict`) sekä husky-esitoimituskoukun sisällä. ✅ **VALMIS** — erillinen `lint`-kutsu poistettu.
- **CVE-tarkistus** — ❌ **EI suoraan yhdistettävissä.** `audit:deps` epäonnistuu ehdottomasti minkä tahansa vakavan/kriittisen CVE:n kohdalla; `check:vuln-ratchet` (osv) epäonnistuu vain baselineen nähden tapahtuvasta _regressiosta_ (tällä hetkellä 1 MODERATE). Semantiikka on erilainen — `audit:deps`-tarkistuksen poistaminen poistaisi ehdottoman vakavien/kriittisten haavoittuvuuksien portin. Säilytä molemmat.
- **Syklien tunnistus** — ✅ **VALMIS** (#15159 G-01/G-02). Vanha teksti kutsui `check:cycles`-tarkistusta ”vihreäksi, kuratoiduksi” portiksi ja perusteli sen säilyttämistä estävänä, koska `check:circular-deps` (dpdm) raportoi 91 sykliä. Tuo vihreä tulos oli **väärä positiivinen onnistuminen**: `check:cycles` tarkisti 5 alihakemistoa (450 tiedostoa), tunnisti vain staattiset `import|export … from` -rakenteet ja hylkäsi kaikki `@/`- ja `@omniroute/open-sse/`-määritteet, joten se ei voinut havaita dynaamisten tuontien ja aliasten muodostamia syklejä, jotka hallitsivat tietovarastoa. Korjattu: portti käy nyt läpi `src`- ja `open-sse`-hakemistot (5023 tiedostoa), kerää määritteet TypeScriptin AST:stä (joten `import("…")` lasketaan, mutta tyyppisijainnissa olevaa `typeof import("…")` -rakennetta ei) ja selvittää tsconfigin `paths`-määritykset. Se löytää **14** sykliä, ei 0:aa. Koska 14:ää jo olemassa olevaa sykliä ei voida korjata portin PR:ssä, `check:cycles` on nyt **räikkä** (`--ratchet`, yläraja `metrics.cycles.value = 14` tiedostossa `quality-baseline.json`, `direction: down`) — se estää minkä tahansa _regression_, ja määrä voi vain laskea. CI suorittaa komennon `npm run check:cycles:ratchet`. Velan vähentäminen etenee kohteen **A-01** mukana. `check:circular-deps` (dpdm) säilyy neuvoa-antavana laajempana toisena arviona.
- **Monimutkaisuus** — ✅ **VALMIS** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): yksi ESLint-läpikäynti, laskenta ruleId:n mukaan, jotta syklomaattisen monimutkaisuuden ja enimmäisrivimäärän sekä kognitiivisen monimutkaisuuden baselinet pysyvät erillisinä; yksittäiset `check:complexity` / `check:cognitive-complexity` säilyvät paikallista `--update`-käyttöä varten.
- **`/api`-hallusinaationesto** — ✅ **VALMIS** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): yksi `src/app/api`-hakemiston tiedostojärjestelmäinventaario; openapi-routes ja docs-symbols raportoivat edelleen itsenäisesti; yksittäiset tarkistukset säilyvät paikallisia suorituksia varten.
- **`check:node-runtime` suoritetaan 11 työssä** — ⚠️ **pieni ROI.** Jokainen käyttää erillistä suoritusympäristöä ja tarkistus kestää alle sekunnin; kokonaissäästö olisi noin 10 sekuntia, mutta samalla menetettäisiin edullinen työkohtainen suojaus. Ei muutostyön arvoista.
- **`typecheck:noimplicit:core` CI:n lint-tarkistuksessa** — ✅ **poistettu lint-työstä** (oli neuvoa-antava `continue-on-error`); estävä tyyppipinta muodostuu tarkistuksista `typecheck:core` + `check:type-coverage`. Paikallinen komentosarja säilytetty.

### Käännä / päätä (operaattorin käytäntö)

- `check:openapi-security-tiers` (neuvoa-antava) — ❌ **EI voida siirtää suoraan estäväksi.** Se palauttaa arvon 0, mutta varoittaa, että useilta `LOCAL_ONLY_API_PREFIXES`-määrityksen alaisilta `traffic-inspector`-reiteiltä puuttuu `x-loopback-only: true` -annotaatio. Sen pakottaminen edellyttää näiden annotaatioiden lisäämistä ensin `openapi.yaml`-tiedostoon.
- `typecheck:noimplicit:core` (neuvoa-antava) — estävä `check:type-coverage`-räikkä korvaa sen suurelta osin. Muuta räikäksi tai poista redundantti toinen `tsc`-läpikäynti.
- `test:vitest:ui` (nyt **estävä**) — jo olemassa olevat epäonnistumiset on nimenomaisesti rajattu pois `vitest.config.ts`-tiedostossa `// #8618`-seurantakommenteilla; uudet epäonnistumiset kaatavat työn.
- `check:secrets` (gitleaks, estävä räikkä lukittuna kolmeen dokumentoituun väärään positiiviseen) — lisää nämä 3 sallittujen luetteloon nollatason saavuttamiseksi tai alenna tarkistus neuvoa-antavaksi. Päällekkäinen GitHubin sisäänrakennetun salaisuuksien tarkistuksen ja `check:public-creds`-tarkistuksen kanssa.
- `check:pr-evidence` (estävä, hakee PR-kuvauksen proosasta) — suuri väärien positiivisten riski; poistaminen heikentää ehdottoman säännön nro 18 valvontaa, joten tämä on todellinen käytäntöpäätös.
- `semgrep` (neuvoa-antava erillistarkistus) — päällekkäinen CodeQL:n kanssa OWASP-perheiden osalta; kytke sen baseline räikkään tai poista.

---

## Aiheeseen liittyvä dokumentaatio

- Toimitusketju (alkuperä, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — avainjoukkojen yhtäläisyyden tarkistus

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, työ `i18n-ui-coverage`).
Vertaa jokaisen `src/i18n/messages/<locale>.json`-tiedoston lehtiavainten joukkoa `en.json`-tiedostoon ja epäonnistuu,
jos yksikin lehtiavain puuttuu tai on ylimääräinen riippumatta siitä, milloin avain lisättiin. `__MISSING__:`-paikkamerkit
katsotaan olemassa oleviksi (niiden sisältö kuuluu suhdelukutarkistukselle). Tämä täydentää absoluuttisesti
kahta diff-pohjaista/prosenttipohjaista tarkistusta: `check-ui-keys-coverage` vaatii jokaiselle
kielialueelle vähintään 80 %:n kattavuuden (43 puuttuvaa avainta noin 13 000:sta näyttää edelleen lukeman 99,7 %), ja `check-new-key-coverage` arvioi
vain avaimet, jotka PR lisää `en.json`-tiedostoon. Kielialue-erä luodaan sen päivän `en.json`-tiedostosta,
jona sen haara luodaan, ja käännöstyö jatkuu päiviä samalla, kun pohjahaaraan lisätään avaimia; erän PR ei itse lisää
yhtään avainta, joten kumpikaan rinnakkaistarkistus ei reagoinut, kun erä 1 (#13044) yhdistettiin siten, että yhdeksästä
kielialueesta puuttui 43 avainta, ja erästä 2 (#13660) puuttui 10 avainta kahdeksasta kielialueesta (2026-09-15). Korjaa punainen tulos komennolla
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra`-lehtiavain
tarkoittaa, että lähteestä on poistettu kyseinen avain — poista se kielialueesta. `--warn` raportoi epäonnistumatta.
`--catalog=cli` suorittaa saman vertailun hakemistolle `bin/cli/locales` (`npm run i18n:check-keys:cli`);
molemmat vaiheet ovat työssä `i18n-ui-coverage`.

#### `check-new-key-coverage` — uusien avainten i18n-tarkistus

Tarkistuksen `check-ui-value-drift` rinnakkaistarkistus. Se havaitsee englanninkielisen arvon, joka on **kirjoitettu uudelleen**
mutta jonka käännöksiä ei ole päivitetty; tämä havaitsee englanninkielisen avaimen, joka on **lisätty**
mutta jota jotkin kielialueet eivät koskaan saaneet.

`check-ui-keys-coverage` ei pysty havaitsemaan tätä tapausta: se vaatii prosentuaalisen vähimmäiskattavuuden kielialuekohtaisesti, ja
yksitoista puuttuvaa avainta noin 13 000 avaimesta jättää kattavuudeksi 99,9 %. Kielikohtainen prosenttiluku ei pysty
ilmaisemaan, että ”tämä ominaisuus julkaistiin kääntämättömänä” — kokonainen ominaisuus voidaan lisätä uuteen kielialueeseen ilman
tekstiä lukeman muuttumatta lainkaan.

Tarkistuksen taustalla oleva häiriö: Orchestration Canvasin vaiheessa 3 sen yksitoista avainta käännettiin
kaikille tuolloin olemassa olleille 42 kielialueelle. Tunteja myöhemmin EU-kielten erä (#13044) kasvatti repositorion
51 kielialueeseen, eivätkä yhdeksän uutta tulokasta (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) koskaan
saaneet niitä. `deepMergeFallback` korvaa puuttuvan avaimen englanninkielisellä tekstillä, joten seurauksena oli
kääntämätön eikä tyhjä käyttöliittymä — todellinen ongelma, joka jäi rakenteensa vuoksi huomaamatta.

Rinnakkaistarkistuksensa tavoin tämä on **diff-tietoinen**: se vertaa yhdistämiskannan englanninkielisiä tekstejä työpuuhun,
joten ennestään olemassa olevat puutteet pysyvät jäädytettyinä eikä tarkistuksen käyttöönotto edellyttänyt migraatiota.

**`__MISSING__:<english>`-merkintä ei täytä vaatimusta (2026-09-17 alkaen).** Aiemmin se oli
dokumentoitu lykkäyskeino — suoritusaikainen varajärjestely käyttää oikeaa englanninkielistä tekstiä — kunnes kahdeksan ominaisuus-PR:ää
lisäsi 2026-09-16 yhteensä 61 avainta ja lisäsi merkinnän kaikkiin 65 kielialueeseen kääntämisen sijasta: tämä
tarkistus hyväksyi ne kaikki, mikään ei estänyt PR:iä, ja estävä todellisten käännösten suhdelukutarkistus
epäonnistui sitten julkaisuhaaran kärjessä kaikilla (pt-BR 3,2 % > 2,5 % + 0,5). Merkintä tulkitaan nyt
puuttuvaksi käännökseksi. Korjaa punainen tulos komennolla
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, tai
kaikki kielialueet rinnakkain komennolla `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
toimii irrotetussa tilassa, eikä suostu käynnistymään ilman `OMNIROUTE_TRANSLATION_*`-ympäristömuuttujia). Avain, jonka on pysyttävä
englanninkielisenä (kiinteä tuotteen, moottorin tai lipun nimi), kuuluu tiedostoon `scripts/i18n/untranslatable-keys.json`,
ei koskaan merkinnän taakse. `vi` kieltää merkinnät kokonaan (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — sivuun jätettyjen testien tarkistus

Tiedosto `vitest.config.ts`-tiedoston `exclude`-luettelossa on testi, jota ei suoriteta, vaikka se näyttää
kattavuudelta lähdekoodipuuta lukevalle. Kommentin
`// #8618 — pre-existing failure; remove this exclusion when fixed` taakse kertyi 62 tiedostoa. Ongelma #8618 suljettiin
2026-08-11 samalla, kun sen seuraama luettelo kasvoi 45 merkinnästä 62 merkintään ja jokainen uusi merkintä peri kommentin,
joka viittasi suljettuun ongelmaan. Kun luettelo lopulta mitattiin tiedosto kerrallaan (#13204), **51 tiedostoa 62:sta
läpäisi testit nykyistä lähdekoodipuuta vasten ilman lähdekoodimuutoksia**.

Tarkistus vaatii, että jokainen todelliseen tiedostoon viittaava poissulku (a) nimeää seurantaongelman ja
(b) esiintyy tiedostossa `config/quality/vitest-exclusions.json` mitatun tilansa kanssa, jotta uuden poissulun lisääminen on
tarkasteltava diff sille tarkoitetussa tiedostossa eikä vain jälleen yksi rivi 60 merkinnän taulukossa. Tarkistus ei tarkoituksella
suorita poissuljettuja testejä uudelleen — se maksaa noin 10 minuuttia ja kuuluu säännöllisesti suoritettavaan työhön;
luettelo tallentaa, milloin kukin testi mitattiin viimeksi.
