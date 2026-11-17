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

## Gate-luettelo ja suoritusprofiilit

### Ehdokkaan hyväksyminen

CI- ja Quality Gates -työnkulut tuottavat kumpikin vakaan päätöksen: `Gate / CI` ja
`Gate / Quality`. Niiden versioitu hyväksymiskäytäntö luettelee jokaisen ylävirran työn
joko pakolliseksi tai ohjeelliseksi. Sovellettavan pakollisen työn on onnistuttava:
puuttuvat, peruutetut, ohitetut, odottavat ja tuntemattomat tulokset eivät voi muodostaa
PASS-tulosta. Kelvollinen vain dokumentaatioon tai luetteloon rajoittuva luokittelu voi
tehdä koodikaistasta soveltumattoman; luonnos-PR ei ole hyväksytty ehdokas. `hotfix`-tunniste
ei vapauta näyttövaatimuksista.

Molemmat työnkulut kattavat PR:t main/release-haaroihin, työnnöt haaraan `main`, manuaalisen
käynnistyksen ja merge-group-tapahtumat. Push-, dispatch- ja merge-group-ajot suorittavat
täyden valinnan. Työnnöt haaroihin `release/**` eivät käynnistä niitä (2026-10-18): jokainen
muutos suoritti matriisin jo PR:nsä yhteydessä, ja yhdistetty yhdistelmä on Release-Greenin
tehtävä (`docs/ops/RUNNER_BOX.md` → Hosted lane). Haarukat ja merge-ryhmät käyttävät hostattuja
suorittimia töille, jotka muuten valitsisivat itseisännöidyt suorittimet; riittävä hostattu
kapasiteetti on varmistettava ennen käyttöönottoa.

Tavallinen PR suorittaa nopean valinnan. Hyväksymiskäytännön `full-code`- ja `full-code-e2e`-kaistat
(E2E, integraatio, pakettivedos, Electron smoke, Bun SQLite, ekosysteemi- ja protokolla-asiakkaat)
suoritetaan vain Mergify-jono-luonnoksessa tai täydellä ajolla:
`gh workflow run ci.yml --ref <branch>`.

Jokainen JSON-kuitti yksilöi uloskirjautuneen SHA:n, työnkulun ajon ja yrityksen.
CLI hylkää uloskirjautumis-/tapahtuma-SHA:n ristiriidan. Työnkulkutestit sitovat käytäntöjäsenyyden
päätöstyön `needs`-luetteloon, joten uusi tai poistettu kaista ei voi kadota huomaamatta.
Kuitit kattavat oman työnkulkunsa, eivät julkaisemista, käyttöönottoa tai olemassa olevan
ohjeellisen tarkistimen sisäistä toimintaa. Molempien tarkistusnimien aktivoiminen haarasäännöissä
on erillinen hallinnollinen muutos; näiden töiden lisääminen ei itsessään suojaa haaraa.

### Yhdistämisjono

`queue`-tunniste lähettää PR:n Mergify-jonoon (`.mergify.yml`). Mergify avaa luonnos-PR:n
haaraan `mergify/merge-queue/`, CI suorittaa siellä täyden valinnan, ja alkuperäinen PR
yhdistetään, kun `Gate / CI`, `Gate / Quality` ja `Merge integrity (changelog + generated skills)`
onnistuvat.

Mergify kirjoittaa jonoyhteenvedon luonnoksen kuvaukseen, ja myös muut sovellukset voivat muokata sitä.
Tällaisen luonnoksen `pull_request` `edited` -tapahtuma saa oman rinnakkaisuusryhmänsä
(`-queue-edit-<run_id>`), joten se ei voi peruuttaa luonnoksen varsinaista ajoa, ja se ohittaa gaten sekä
matriisin. Vain `Merge integrity` suoritetaan edelleen. Ohitettu gate-työ käyttää eri tarkistusnimeä,
koska Mergify tulkitsee ohitetun `Gate / CI` -tarkistuksen epäonnistuneeksi ja poistaa PR:n jonosta.

Jonosta poistamisen jälkeen push ei aina lisää PR:ää uudelleen jonoon. Kommentoi siihen `@mergifyio queue`.

### Hyväksymisen vähentäjään säilytetty näyttö

`scripts/quality/validate-release-acceptance.mjs` vähentää toimitetun suunnitelman ja sen
manifestit; se ei osoita, että suunnitelma kattaa koko julkaisuputken.
Sen raportit asettavat nimenomaisesti arvoksi `releaseAcceptance: false`, vaikka kyseinen suunnitelma olisi
`VERIFIED`. `release-acceptance.yml`-työnkulku käyttää edelleen varjokalusteita, ei
todellisia rakennus-, paketti-, käynnistys- tai edistämiskuitteja.

CLI vaatii säilytetyn näytön tarkistamiseen valitsimen `--evidence-root`. Tiedostot ratkaistaan
muotoon `<evidence-root>/<artifact_id>/<member>` ja niistä lasketaan SHA-256-tiivisteet.
PASS-tietue ilman näyttöä, puuttuva tai muuttunut tiedosto, vaarallinen polku tai symbolinen
linkki estää tarkistuksen. Puuttuvat tiedostot eivät vastaa tyhjiä onnistuneita lokeja.
Olemassa olevat SHA-/run-/attempt-tarkistukset pysyvät riippumattomina: täsmäävät tavut eivät
voi pelastaa vanhentunutta kuittia. Tiedoston eheys ei todista suorituksen aitoutta tai
vedoksen edistämistä.

### Staattisen tarkistuksen luettelo

Versioitu npm-aliasluettelo ja staattisen tarkistuksen jäsenyys sijaitsevat tiedostossa
`config/quality/gate-manifest.json`. Suorita `npm run check:gate-manifest` vahvistaaksesi
komentojen nimet ja täsmälliset komennot `package.json`-tiedostoa vasten; lisäykset, poistot
ja komentojen muuttuminen epäonnistuttavat sekä paikallisen hookin että CI:n muutosluokittelutyöt.
Alias ei ole työnkulun työ, matriisi-instanssi tai testitapaus: näitä määriä ei saa esittää
keskenään vaihdettavina.

Käytä komentoja `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list`
valittujen aliasten tarkastelemiseen suorittamatta niitä. Suorittaja kutsuu npm-syöttöpistettä,
joten sen ajonaikainen ympäristö (mukaan lukien määritetty Bun) säilytetään.
Manifesti tallentaa näiden profiilien ulkopuoliset aliakset erikseen kutsuttavina, ja
ylläpitokomennot ovat kiellettyjä vain luku -tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen tarkistuksen. Ne eivät varmista tuotetestejä,
kattavuutta, paketointia, ulkoisia tarkistuksia tai ehdokkaan täydellistä julkaisuhyväksyntää.
Työnkulun hyväksyminen käyttää linkitettyjä tiedostoja `config/quality/admission-policy.json` ja
`scripts/quality/admission-verdict.mjs`. Release-observer-profiilit pysyvät erillään;
tarkista niiden sovellettavat tarkistukset ja kuitit itsenäisesti. Täyden observerin staattiset
komennot ilmoitetaan tiedostossa `config/quality/release-green-static-profile.json`, mukaan lukien
`audit:deps`, mutaatiotestien valinta ja käännöstarkistukset. Lataaja vahvistaa npm-komennot
`package.json`-tiedostoa vasten sekä mallinnetut CI/Quality-määrittelyt; se hylkää poikkeamat
sen sijaan, että suorittaisi shell-tunnisteita argumentteina. Pakollisen tarkistimen
SKIP/INCOMPLETE-tulos ei voi muodostaa PASS-tulosta. Profiili tallentaa ulkoiset poissulkemisensa
eikä korvaa hostattua kattavuutta, testimatriiseja, paketti- tai käyttöönottonäyttöä. Alla oleva
proosaluettelo on viite, ei todiste siitä, että gate olisi todella suoritettu.

Skriptit sijaitsevat hakemistoissa `scripts/check/` (käytäntögatet) ja `scripts/quality/`
(ratchet-moottori). CI:n totuuden lähde on `.github/workflows/ci.yml`.

### Julkaisu-PR:n nopea polku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI:tä main/release-PR:issä, työnnöissä haaraan `main`,
dispatchissa ja merge-ryhmissä. PR:t käyttävät polkusuodatettuja nopeita tarkistuksia.
Pysyvästi käytöstä poistettu kaksoisrakenne poistettiin; todelliset rakennus-, paketti- ja
käynnistystarkistukset pysyvät CI:ssä. Yksikkötestikokoelma ja vitest suoritetaan vain CI:ssä
(`Unit Tests (N/8)` ja `Vitest`).

| Työ                                              | Soveltamisala                                                                                                                                          | Estää yhdistämisen         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentaatio-/koodimuutokset; API-dokumentaation viittaukset ja docs-all                                                                              | Kyllä                      |
| `Fast Quality Gates`                             | Koodimuutokset; staattiset tarkistukset, tyyppitarkistus, koontinäytön tyyppitarkistus, vaikutetut yksikkötestit, unohtuneet sisartestit (ohjeellinen) |
| `No new ESLint warnings`                         | Koodimuutokset; vaimennukset huomioiva lint-suoja                                                                                                      | Kyllä, myös fork-haaroissa |
| `Merge integrity (changelog + generated skills)` | Ei-luonnosmuutokset; muutosloki ja luotujen taitojen synkronointi                                                                                      | Kyllä, myös fork-haaroissa |

#### Unohtuneiden sisartestien raportti

`npm run check:forgotten-sibling-tests` suoritetaan `Fast Quality Gates` -työn ohjeellisena vaiheena, ja se käyttää uudelleen testivaikutuskartan taustalla olevaa tuontien selvittäjää.
Jokaisesta muuttuneesta tuotantomoduulista se raportoi deterministiset
`changed module/symbol -> static consumer -> candidate sibling test` -ketjut, kun ehdokastesti puuttuu pull requestin diffistä. Markdown-yhteenveto ja JSON-tulos säilytetään
`forgotten-sibling-tests`-työn työnkulkumäärityksen artefaktina kalibrointia varten ennen estävää käyttöönottoa.

Tynnyriuudelleenviennit ja dynaamiset tuonnit ovat vain selvitysdiagnostiikkaa; ne eivät koskaan aiheuta estävää havaintoa. Tarkistetut poikkeukset sijaitsevat tiedostossa
`config/quality/forgotten-sibling-allowlist.json`. Jokaisessa merkinnässä on nimettävä kuluttaja ja ehdokastesti, annettava yksityiskohtainen perustelu ja linkitettävä GitHub-ongelmaan tai pull requestiin. Virheelliset merkinnät estävät toiminnan oletusarvoisesti. Poikkeuksilla ei voi vaimentaa poistettua ehdokastestiä tai diffiä, joka lisää `.skip`-/`.todo`-merkinnän;
assertioiden heikentäminen ja muu peittely kuuluvat erikseen estävän
`check:test-masking`-portin vastuulle.

### Työ: `lint`

Suoritetaan jokaisessa `main`-haaraan kohdistuvassa pull requestissa. Estää yhdistämisen epäonnistuessaan.

| Komentosarja (`npm run ...`)      | Tarkistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Estävä                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js-versio on tuetulla alueella                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `check:cycles`                    | Kaikki `src/` + `open-sse/`-hakemistojen väliset kiertävät tuonnit (AST-pohjaiset, tsconfigin `paths`-määritykset ratkaistu). Pelkkä komento palauttaa aina arvon 1, kun yksikin sykli on olemassa (suljetaan epäonnistumiseen #15281:n jälkeen), ja luettelee SCC:t. `check:cycles:ratchet` (CI:n käyttämä komento) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.cycles`-ylärajan — tällä hetkellä 14, `direction: down`, joten määrä voi vain pienentyä (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä (ratchet)                             |
| `check:boundary`                  | `open-sse → src` -kytkentä: yksilölliset tiedostosta toiseen tapahtuvat tuonnit moottorista sovellukseen (`scripts/quality/measure-boundary.mjs`; reunaluettelo on v4:n ydin/moduulijako-korjausten työlista). Pelkkä komento tuottaa ohjeellisen raportin (sama kuin `quality:boundary`). `check:boundary:ratchet` (CI:n käyttämä komento, myös `quality.yml`-tiedoston fast-gates-ratchet-silmukassa) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.boundaryOpenSseToSrc`-ylärajan — alustava arvo on mitattu 771, `direction: down`; `--update` voi vain pienentää sitä; PR-pyynnöissä suhteessa kantaan (`--base-ref`, katso alta)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä (ratchet)                             |
| `check:route-validation:t06`      | Zod-skeemat ovat käytössä kaikilla reiteillä (tason 6 käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` -määrä ei ylitä budjettia (tason 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:provider-consistency`      | Jokaisella `providers.ts`-tiedoston palveluntarjoajalla on vastaava merkintä `providerRegistry.ts`-tiedostossa (ja päinvastoin sallittujen luettelon puitteissa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:model-lifecycle`           | Kolme manuaalisesti ylläpidettävää reititystaulukkoa pysyvät tarkistetun elinkaaritilannevedoksen (#11503) mukaisina: `FITNESS_TABLE` (`taskFitness.ts`) ei pisteytä käytöstä poistettua tunnistetta, jonka `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES`-kohde on mukana `REGISTRY`-rekisterissä ja puuttuu käytöstä poistettujen tunnisteiden tilannevedoksesta; jokainen käytöstä poistettu tunniste, joka on edelleen `REGISTRY`-rekisterissä, välitetään eteenpäin tai on lueteltu kohteessa `allowedRetiredInCatalog`; eikä mikään `DEFAULT_DEGRADATION_MAP`-lähde tai -kohde esiinny käytöstä poistettuna kyseisessä tilannevedoksessa. Tämä ei todista, että reaaliaikainen ylemmän tason palvelu tarjoaa mallia tällä hetkellä. Offline — vertaa tiedostoon `config/quality/model-lifecycle.json`, joka päivitetään manuaalisesti komennolla `npm run quality:refresh-model-lifecycle` (verkko; ei ole kytketty CI:hin). `allowedRetiredInCatalog` on käytöstä poistamisen vähentämiseen tarkoitettu asteittainen rajoitin: lisää merkintä vain seurantatehtävän yhteydessä.                                                                                      | Kyllä                                       |
| `check:fetch-targets`             | Jokainen asiakaspuolen `src/`-hakemistossa oleva `fetch("/api/...")` ratkaistaan oikeaksi `route.ts`-tiedostoksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:deps`                      | Kaikki repositorion jokaisessa `package.json`-tiedostossa olevat `npm install` -asennettavat riippuvuudet ovat tiedostossa `dependency-allowlist.json`; uudet versioimattomat tai slopsquatatut paketit merkitään                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                       |
| `audit:deps`                      | Kaikkien viiden toisistaan riippumattoman lukitustiedoston (juuri, Electron, OpenCode-laajennukset v1/v2 ja palveluntarjoaja) npm-tarkastus. Kriittiset suositukset estävät toiminnan; korkean vakavuuden suositukset jäävät näkyviksi varoituksiksi. Puuttuvat tai epäonnistuneet tarkastukset ovat INCOMPLETE-tilassa ja estävät toiminnan; käyttöaluekohtaiset lukitustiedostojen tiivisteet ja raportit säilytetään.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                       |
| `check:lockfile`                  | `package-lock.json`-eheys — https-rekisteri, eheystiivisteet, ei isäntäohituksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:licenses`                  | SPDX-käyttöoikeuksien sallittujen luettelo tuotantoriippuvuuksille                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `check:tracked-artifacts`         | Ei koontiversion tuotoksia / commitoituja `node_modules`-symbolisia linkkejä (suoritetaan myös huskyn pre-commit-koukussa; pre-push on tarkoituksella kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                       |
| `check:ai-attribution`            | Ei tekoäly-/botti-`Co-Authored-By`-lisämerkintää tai tekoälyn tuottamaa alatunnistetta PR-commiteissa, otsikossa tai leipätekstissä — tiukka sääntö #16 (PR→`release/**`-kohteisten PR:ien `quality.yml`-työnkulun fast-gates-silmukassa — lukee tapahtumahyötykuorman, ei tee mitään PR:ien ulkopuolella — sekä PR-kohtaisena vaiheena `ci.yml`-lintissä PR→`main`-kohteille; lisäksi huskyn `commit-msg`-koukussa; ihmisten kanssakirjoittajat sallitaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Jokainen Vitestin poissulkeminen nimeää seurantavian ja esiintyy tiedostossa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                       |
| `check:file-size`                 | Lähdetiedostot (`.ts`/`.tsx` hakemistoissa `src/`, `open-sse/`, `electron/`, `bin/`) pysyvät `cap`-rajan sisällä ja testitiedostot (`*.test.ts(x)`) `testCap`-rajan sisällä; `file-size-baseline.json`-tiedostossa jäädytettyjen (`frozen` / `testFrozen`) tiedostojen koko ei saa ylittää niille tallennettua kokoa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                       |
| `check:error-helper`              | Suoritinten/käsittelijöiden virhevastausten tulee käyttää `buildErrorBody()`- ja `sanitizeErrorMessage()`-funktioita (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                       |
| `check:migration-numbering`       | Migraation SQL-tiedostot on numeroitu peräkkäin, eikä välejä tai kaksoiskappaleita ole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:public-creds`              | Julkisia OAuth-`client_id`/`client_secret`-tunnuksia tai Firebase Web -avaimia ei ole kirjaimellisesti muualla kuin tiedostossa `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:db-rules`                  | Raakaa SQL:ää ei ole `src/lib/db/`-moduulien ulkopuolella; `localDb.ts`-tiedostosta ei ole barrel-tuonteja (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                       |
| `check:known-symbols`             | Lähetysmääritystauluissa rekisteröidyt palveluntarjoajien suorittimet, reititysstrategiat ja kääntäjät vastaavat levyllä olevia tiedostoja — irrallisia tai määrittelemättömiä symboleja ei ole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:route-guard-membership`    | Jokainen lapsiprosessin käynnistävä reitti luokitellaan `isLocalOnlyPath()`-funktion avulla (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:test-discovery`            | Jokainen repositorion `*.test.ts`- tai `*.spec.ts`-tiedosto kerätään vähintään yhden testiajon toimesta (ratchet: orpoluettelo tiedostossa `test-discovery-baseline.json` voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Kyllä                                       |
| `check:test-tla-order`            | Mikään `tests/unit`-hakemiston `node:test`-tiedosto ei rekisteröi testiä, suorita ylimmän tason `await`-lauseketta ja rekisteröi sen jälkeen lisää testejä (#18045; ratchet: `test-tla-order-allowlist.json` voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:agent-skills-sync`         | Luodut agenttitaitojen artefaktit vastaavat niiden lähdeluetteloa (ei poikkeamia). Julkaisutila tarkistaa kaikki taidot; ominaisuus-PR (`pr`-tila) tarkistaa vain taidot, joiden luotua tekstiä se muokkaa — katso [Luodut tiedostot ja johdetut perustasot](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Palveluntarjoajien logoilla ja resursseilla on tallennettu alkuperätietomerkintä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | JSON-määritystiedostot jäsentyvät ja täyttävät repositorion lint-säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | TypeScript-käännös ilman virheitä (vain huomautukset ovat ohjeellisia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — ennakoiva; monet olemassa olevat kutsukohdat tarvitsevat edelleen annotaatioita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Ohjeellinen** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, joka kohdistuu polkuun `src/app/(dashboard)/**` (#7033) — `typecheck:core`-tarkistuksen kuratoitu 27 tiedoston sallittujen tiedostojen luettelo ei sisällä yhtäkään dashboardin TSX-tiedostoa, eikä `next build` myöskään koskaan tarkista niiden tyyppejä (`next.config.mjs` määrittää asetuksen `ignoreBuildErrors: true`), joten orvoista tunnisteista johtuvat regressiot siellä (#6625/#6909) jäivät CI:ltä huomaamatta. Vertaa tuloksia jäädytettyyn tiedosto-/TS-koodikohtaiseen määrälähtötilanteeseen (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentuneen lähtötilanteen valvontamalli kuin tarkistuksessa `check:known-symbols`) — vain lähtötilanteen ylittävät UUDET virheet rikkovat portin; pienennä määrää komennolla `--update`, kun olemassa oleva virhe korjataan.                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                       |
| `check:build-typecheck`           | Koko sovelluksen tuotannon tyyppitarkistus `tsconfig.build.json`-asetusten perusteella (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), joita `typecheck:core`-tarkistuksen 27 tiedoston sallittujen tiedostojen luettelo ja dashboard-portti eivät kata. Vertaa tuloksia tiedostossa `config/quality/build-typecheck-baseline.json` olevaan lähtötilanteeseen; uusi tai tiedosto-/koodikohtainen kasvanut määrä rikkoo tarkistuksen, pienempi määrä pyytää pienentämään lähtötilannetta. `--update` kieltäytyy toimimasta, jos ajossa on uusi tai kasvanut pari, ellei välitetä valitsinta `--force-regressions`, ja kieltäytyy myös uudesta hiljennetystä tiedostosta, ellei välitetä valitsinta `--force-nocheck`, joten lähtötilanteen laajentaminen onnistuneen tuloksen saavuttamiseksi ja pysyvän hiljennyksen myöntäminen ovat kaksi erillistä harkittua toimenpidettä. Pelkkä `--force` hylätään. Tarkistus etsii myös koontialueelta `@ts-nocheck`-merkintöjä lähtötilanteeseen `config/quality/ts-nocheck-baseline.json` verraten, koska sitä käyttävä tiedosto ei ilmoita lainkaan diagnooseja ja jäisi muuten kaikkien porttien ulkopuolelle. | Kyllä                                       |

#### Kaksi tyyppitarkistusohjelmaa vastaavat eri tavoin

`typecheck:core` ja `check:build-typecheck` kääntävät eri ohjelmakokonaisuudet eri
asetuksilla, ja sama tiedosto voi olla virheetön toisessa ja täynnä virheitä toisessa.

`tsconfig.build.json` määrittää asetuksen `"strict": false`, joten `noImplicitAny` on
pois käytöstä. Core-määritykset kääntävät kuratoidun 27 tiedoston sallittujen tiedostojen
luettelon tiukemmilla asetuksilla ja seuraavat kunkin kohteen tuontikaaviota, joten myös
tiedostot, joita ei koskaan esiinny koontiohjelmassa, tarkistetaan siellä.

Tällä on merkitystä arvioitaessa, onko tiedosto tyypitetty: **nolla diagnoosia
tarkistuksessa `check:build-typecheck` ei tarkoita nollaa**. Kun `@ts-nocheck` poistettiin
26 tiedostosta, 23 niistä oli koontiohjelmassa virheettömiä; näistä kuusitoista toi
tiukemmassa tarkistuksessa esiin noin 120 implisiittisen any-tyypin virhettä. Tarkista
molemmat, ennen kuin ilmoitat tiedoston olevan virheetön.

### Työ: `quality-gate`

Suoritetaan `test-coverage`-työn jälkeen. Estää yhdistämisen virheen sattuessa.

| Skripti                      | Vahvistaa                                                                                                                                                                                           | Estävä                                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `quality:collect`            | Tuottaa tiedoston `quality-metrics.json` (ESLint-varoitusten määrä, yhdistetystä shard-raportista saatava kattavuus)                                                                                | Kyllä (ratchet-tarkistuksen edeltävä vaihe) |
| `quality:ratchet`            | Mikään tiedoston `quality-baseline.json` mittareista ei ole heikentynyt (ESLint-varoitukset ≤ lähtötaso; kattavuus ≥ lähtötaso)                                                                     | Kyllä                                       |
| `check:duplication`          | Koodin päällekkäisyys (jscpd@4) ei ylitä tiedoston `quality-baseline.json` lähtötasoa                                                                                                               | Kyllä                                       |
| `check:complexity`           | Tiedostotason syklomaattinen kompleksisuus ei ylitä ylärajaa (ESLintin ydinmoduulin `complexity` + `max-lines-per-function`)                                                                        | Kyllä                                       |
| `check:cognitive-complexity` | Kognitiivisen kompleksisuuden ratchet-tarkistus (`eslint-plugin-sonarjs`) — erillinen ESLint-ajo; CI suorittaa molemmat yhdistettynä yhtenä `check:complexity-ratchets`-vaiheena                    | Kyllä                                       |
| `check:dead-code`            | Käyttämättömien vientien / tiedostojen ratchet-tarkistus (knip) ei heikkene lähtötasoon verrattuna                                                                                                  | Kyllä                                       |
| `check:compression-budget`   | Pakkausvertailun budjetti — moottorikohtaiset token-säästöjen vähimmäistasot eivät saa heikentyä                                                                                                    | Kyllä                                       |
| `check:type-coverage`        | Tyypitetyn koodin prosenttiosuuden ratchet-tarkistus (`type-coverage`) ei heikkene; korvaa suurelta osin tarkistuksen `typecheck:noimplicit:core`                                                   | Kyllä                                       |
| `check:codeql-ratchet`       | Avointen CodeQL-hälytysten määrä ei heikkene (luetaan `gh api` -komennon kautta; ohitetaan hallitusti ilman tunnusta) — päivitystiheys ja manuaalinen käynnistys: katso kohta ”CodeQL-ratchet” alla | Kyllä                                       |

### Työ: `quality-extended`

Koko työ on ohjeellinen (`continue-on-error: true`). npm-pohjaiset ratchet-tarkistukset suoritetaan
varsinaisesti; ulkoiset skannerit asennetaan komennolla `gh release download` ja ohitetaan itse (poistumiskoodi 0),
jos binaari puuttuu edelleen.

| Skripti                  | Vahvistaa                                                                                                                                                                                                                                                   | Estävyys                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Ympyräriippuvuuksia ei ole (dpdm)                                                                                                                                                                                                                           | **Ohjeellinen**                                 |
| `check:bundle-size`      | Paketin koko ei ylitä ylärajaa                                                                                                                                                                                                                              | **Ohjeellinen**                                 |
| `check:secrets`          | Salaisuuksien tarkistus (gitleaks) — ohitetaan, jos binaari puuttuu                                                                                                                                                                                         | **Ohjeellinen**                                 |
| `check:vuln-ratchet`     | Riippuvuuksien haavoittuvuudet (osv-scanner) eivät heikkene — `--ratchet` epäonnistuu tilana INCOMPLETE (poistumiskoodi 2), jos mittausta ei ole tehty                                                                                                      | **Ohjeellinen**                                 |
| `check:workflows`        | Työnkulkujen lint-tarkistus (actionlint + zizmor); puuttuvat tai rikkinäiset skannerit, virheelliset raportit tai puuttuva ratchet-lähtötaso aiheuttavat tilan INCOMPLETE. Kelvolliset löydökset noudattavat valittua tiukkaa/ohjeellista/ratchet-käytäntöä | Suoritus vaaditaan; zizmor-ratchet estää CI:ssä |
| `check:openapi-breaking` | Julkinen API-sopimus kiinnitettyjä tapahtumacommitteja vastaan (PR:n merge-base, push-tapahtumaa edeltävä commit, merge-groupin kanta; ajoitetussa/manuaalisessa suorituksessa ensimmäinen yläpuolinen commit); vaadittu mittaus epäonnistuu suljetusti     | **Estävä komennon --ratchet kanssa**            |

### Työ: `docs-sync-strict`

Suoritetaan jokaisella `main`-haaraan kohdistuvalla PR:llä. Epäonnistuminen estää yhdistämisen.

| Komentosarja                   | Vahvistaa                                                                                                                                                                                                                        | Estävä                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:docs-all`               | Metaportti, joka suorittaa alla olevat 6 alitarkistusta järjestyksessä                                                                                                                                                           | Kyllä                                  |
| ↳ `check:docs-sync`            | CHANGELOG- ja OpenAPI-versioiden yhdenmukaisuus; julkaisutyyppisessä tilassa myös 66 `llm.txt` -peiliä ja käännetyt CHANGELOG-osiot (PR-tilassa: peilit täsmäävät)                                                               | Kyllä                                  |
| ↳ `check:docs-counts`          | Proosatekstin lukumäärät (palveluntarjoajien määrä, migraatioiden määrä jne.). Kaksi tilaa: `pr` ominaisuus-PR:issä, `release` muualla — katso alta kohta "Johdetut arvot"                                                       | Kyllä                                  |
| ↳ `check:env-doc-sync`         | Jokainen `.env.example`-tiedoston ympäristömuuttuja on dokumentoitu dokumentaation taulukossa ja päinvastoin                                                                                                                     | Kyllä                                  |
| ↳ `check:deprecated-versions`  | Dokumentaatiossa ei ole vanhentuneita versiomerkkijonoja                                                                                                                                                                         | Kyllä                                  |
| ↳ `check:doc-links`            | Dokumentaation sisäiset markdown-linkit viittaavat olemassa oleviin tiedostoihin (`[text]`/`(path)`-muoto)                                                                                                                       | Kyllä                                  |
| ↳ `check:fabricated-docs`      | Dokumentaatiossa mainitut reitit, ympäristömuuttujat, CLI-komennot, koukkujen nimet ja tiedostopolut ovat olemassa koodikannassa. Tiukka tarkistus `--strict`-valitsimella; ilman valitsinta epäonnistuminen ei estä suoritusta. | Kyllä (CI:ssä `--strict`-valitsimella) |
| `check:cli-i18n`               | CLI:n `t()`-avaimet ovat olemassa tiedostossa `bin/cli/locales/en.json` (molemmissa tiloissa); pt-BR / zh-CN / zh-TW vastaavat `en.json`-tiedostoa vain julkaisutyyppisessä tilassa                                              | Kyllä                                  |
| `check:openapi-coverage`       | OpenAPI-määritys kattaa vähintään todellisten reittien asteittain korotetun vähimmäismäärän                                                                                                                                      | Kyllä                                  |
| `check:openapi-security-tiers` | `openapi.yaml`-tiedoston suojaustason merkinnät ovat yhdenmukaisia `routeGuard.ts`-luokitusten kanssa                                                                                                                            | **Ohjeellinen**                        |
| `check:openapi-routes`         | Jokainen `openapi.yaml`-tiedoston polku vastaa todellista `route.ts`-tiedostoa (hallusinaatioiden torjunta)                                                                                                                      | Kyllä                                  |
| `check:docs-symbols`           | Jokainen `docs/**/*.md`-tiedoston `/api/...`-viittaus vastaa todellista `route.ts`-tiedostoa (hallusinaatioiden torjunta)                                                                                                        | Kyllä                                  |
| `i18n translation drift`       | `docs/i18n/**`-peilit verrattuna `.i18n-state.json`-tiedostoon — PR:issä ohjeellinen (käännösaalto päivittää peilit), push-tapahtumissa ja öisin tiukka                                                                          | **Ohjeellinen** PR:issä                |

#### Käännöspeilit ovat johdettuja tiedostoja (PR-tila vs. julkaisutyyppinen tila)

Ominaisuus-PR muokkaa vain englanninkielisiä lähteitä. `docs/i18n/<locale>/**`-peilit (mukaan lukien 66
`llm.txt`-kopiota ja käännetyt `CHANGELOG.md`-tiedostot) sekä `.i18n-state.json` kirjoitetaan uudelleen
yhdessä vaiheessa käännösaallon toimesta (`docs/i18n-*` / `chore/i18n-*`-haarat, ajoitettu
`i18n-mirror-refresh.yml`) ja julkaisun toimesta (`npm run release:sync-changelog-i18n`). Peilien
tarkistukset suoritetaan siksi kahdessa tilassa, jotka ratkaistaan tiedostossa
`scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, sitten `OMNIROUTE_GATE_MODE`, sitten Actions-tapahtuma; paikallinen suoritus on `release`):

- `check:docs-sync` — julkaisutila suorittaa kaikki tarkistukset. PR-tila säilyttää package.json/OpenAPI-version,
  juuren CHANGELOG-otsikot ja vanhentuneiden dokumenttien suojauksen sekä tulostaa
  `SKIP reason=pr-mode` `llm.txt`-peilikopioille ja käännetyille CHANGELOG-osioille —
  paitsi jos PR kirjoittaa peilikopioita: haara, joka on määritetty `docs/i18n/**`-perheen kirjoittajaksi
  tiedostoissa `config/quality/derived-paths/*.json`, suorittaa molemmat tarkistukset tiukasti, ja kun
  diff-pohja voidaan ratkaista, muutos, jonka oma diff muokkaa tiedostoa `docs/i18n/<locale>/llm.txt`
  tai `CHANGELOG.md`, suorittaa kyseisen tarkistuksen tiukasti. Diff-pohjaa ei voida ratkaista
  depth-1-kloonauksessa (`docs-sync-strict`-työ), joten PR-tila suorittaa myös yhden tarkistuksen,
  joka ei tarvitse pohjaa: jokaisen `llm.txt`-peilikopion on oltava olemassa, säilytettävä
  `---`-erottimensa ja sisällettävä joko juuren sisältö tai useimpien peilikopioiden jakama sisältö.
  Siirtynyt pohja jättää kaikki peilikopiot yhtä lailla vanhentuneiksi, ja tarkistus hyväksytään;
  yhden peilikopion manuaalinen muokkaus aiheuttaa virheen. Käännetyille `CHANGELOG.md`-tiedostoille
  ei ole tällaista tarkistusta depth-1-PR-kloonauksessa.
- Esikäsittelykomento suorittaa `check-docs-sync.mjs --mode=pr`: commit arvioidaan sen tekemien muutosten perusteella.
  Ilman lippua paikallinen suoritus on julkaisutila, ja yksi yhdistetty PR, joka muokkaa juuren `llm.txt`-tiedostoa,
  estäisi kaikki myöhemmät commitit kyseisessä pohjassa, kunnes päivitysaalto olisi suoritettu. Sama sääntö koskee
  kaikkia Husky-komennon suorittamia tilatietoisia tarkistuksia: komento välittää `--mode=pr`, ja tiukka tulos
  säilyy julkaisutilassa suoritettavilla kerroilla (julkaisu-PR, `main`-haaraan tehdyt pushit ja tavallinen
  paikallinen suoritus).
- Peilisisällön yksikkötestit (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — julkaisutila varmistaa jokaisen lokaaliversion. PR-tila varmistaa vain peilikopiot,
  jotka ovat `.i18n-state.json`-tiedoston mukaan ajan tasalla englanninkielisen lähteen kanssa
  (koko tiedoston tiiviste tai testin kiinnittämän osion tallennettu osion tiiviste), ja ohittaa
  vanhentuneet peilikopiot syyn ilmoittaen. `target_hash`-alkuperätarkistukset suoritetaan jokaiselle
  lokaaliversiolle molemmissa tiloissa. Ajantasaisuus määräytyy kunkin `## `-osion perusteella,
  yksikkö `run-translation.mjs` laskee tiivisteet; pitkä osio (tämän tiedoston tarkistusluettelo
  muodostaa siitä noin puolet) tarkoittaa, että mikä tahansa muutos siinä jättää kyseiset peilikopiot
  vanhentuneiksi, ja niiden PR-tilan tarkistukset ohitetaan seuraavaan aaltoon asti. Jos ankkuria
  ei enää ole englanninkielisessä lähteessä, käytetään koko tiedoston vertailua.
- `i18n translation drift` — ohjeellinen PR:issä, tiukka pushien, yöajojen ja julkaisun valmistelun
  yhteydessä, jotta vanhentunut peilikopio ei pääse julkaisuun.

`scripts/i18n/sync-llm-mirrors.mjs` (viedään myös muodossa `syncLlmMirrors()`, parametrilla `--dry-run`)
kirjoittaa `llm.txt`-peilikopiot uudelleen; julkaisun päivitys, käännösaalto ja ajastettu
`i18n-mirror-refresh.yml` suorittavat sen (päivitys tunnistaa vanhentuneet `llm.txt`-peilikopiot
kuiva-ajolla, koska drift-raportti ei luettele niitä, ja synkronoi ne ennen `check:docs-all`-tarkistusta).

`docs/diagrams/`-hakemiston kaksitoista README-SVG:tä luodaan automaattisesti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` luo ne kaikki uudelleen). Jokaisella on tavubvertailuun perustuva yksikkötesti
(`tests/unit/docs/readme-*-svg.test.ts`, työ `test-unit`), joka epäonnistuu, kun commitattu tiedosto on
julkaisutilassa vanhentunut; PR:ssä `check:generated-artifacts` arvioi PR:n muokkaamaa SVG:tä, ja pohjan
ajautuminen jätetään julkaisun päivityksen tehtäväksi (katso [Luodut tiedostot ja johdetut lähtötilanteet](#generated-files-and-derived-baselines-written-at-release)) —
ja `check:docs-counts` lukee kanoniset numerot niiden `<text>`-solmuista — minkä vuoksi ääriviivojen
luontivaihe säilyttää jokaisen ääriviivaksi muunnetun merkkijonon tiedostossa näkymättömänä `<text>`-elementtinä.
SVG:n kanonisten numeroiden tarkistus lukee tiedostot, jotka on lueteltu muuttujassa
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` sekä `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`;
free-forever-, catalog-entry-, recurring-pool- ja scoring-factors-väitteet lukevat lisäksi
tiedostoja `promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. Näiden
generaattorien piirtämät määrät (palveluntarjoajien kokonaismäärä, MCP-työkalut,
reititysstrategiat, free-forever-palveluntarjoajat ja niin edelleen) tulevat faktatilannekuvasta
`docs/reference/derived-facts.json` tiedoston `scripts/docs/readmeFacts.mjs` kautta,
eivät literaaleista, joten kaavion luominen uudelleen millä tahansa haaralla tuottaa commitatun
tiedoston uudelleen. `free-tier-budget.svg` piirtää rivinsä samasta tilannekuvasta
(`code.freeTierBudget`, faktaluotaimen tallentama katalogin yhteenveto), joten muutos muuttujaan
`FREE_MODEL_BUDGETS` päätyy korttiin seuraavan päivityksen yhteydessä sen sijaan, että CI muuttuisi punaiseksi.

### Johdetut arvot: `pr`- ja `release`-tarkistustilat

Ominaisuus-PR ei koskaan kirjoita arvoa, joka riippuu pohjansa tilasta: palveluntarjoajien,
migraatioiden, MCP-työkalujen ja strategioiden määrää, README-SVG-numeroita tai faktatilannekuvaa.
Yksi vaihe laskee ne kaikki uudelleen: `npm run release:refresh-derived`, jonka suorittavat julkaisu
ja öinen johdettujen arvojen päivitys-PR. Siksi **pohja on julkaisujen välillä tarkoituksella
jäljessä aktiivisesta koodista**, ja tarkistus tai testi, joka vertaisi puuta aktiiviseen koodiin,
muuttuisi punaiseksi jokaisessa PR:ssä sen jälkeen, kun rinnakkaisessa PR:ssä lisättiin
palveluntarjoaja. Johdettuja arvoja arvioivat tarkistukset suoritetaan siis yhdessä kahdesta tilasta,
jotka ratkaisee `scripts/check/lib/gateMode.mjs` (ensimmäinen osuma ratkaisee):

1. komentorivin `--mode=pr|release`;
2. ympäristömuuttuja `OMNIROUTE_GATE_MODE` (`pr` tai `release`);
3. automaattisesti GitHub Actions -tapahtuman perusteella: `pull_request`, jonka head ei ole
   `release/v*`, `merge_group` tai push haaraan `omni-queue/**` → `pr`; kaikki muu (push, ajastus,
   dispatch, julkaisu-PR `release/v* → main` ja mikä tahansa paikallinen suoritus) → `release`.

Mitä `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) ilmoittaa virheeksi kummassakin tilassa:

| Tila      | Epäonnistuu                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tarvitsee reaaliaikaiset faktat |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `release` | Jokainen tarkistus, tiukka yhtäsuuruuspuolustarkistus puusta kerättyjä faktoja vastaan (portin aina käyttämä toimintatapa): vanhentunut määrä, versio, kattavuuden vähimmäistaso tai SVG-numero on STRICT-poikkeama                                                                                                                                                                                                                                                      | Kyllä                           |
| `pr`      | Vain muutoksen tekemät asiat, PR:n perustaa vasten diffattuina samoilla väitepoimijoilla: (1) hallittu arvo, jota ei kyseisessä tarkistuksessa ja tiedostossa ollut perustassa ("PR muokkasi hallittua numeroa — palauta rivi perustan tekstiin"); (2) pakollinen väite, joka perustassa oli mutta jonka head-versio menetti. Faktoja tarvitsemattomat sisältöinvariantit suoritetaan kuten `release`-tilassa; vain `release`-tilan tarkistukset luetellaan ja ohitetaan | Ei                              |

Agenttiohjetiedostot eivät sisällä lainkaan johdettuja määriä: `AGENTS.md`, `llm.txt` (ja sen
`docs/i18n/*/llm.txt`-kopiot), bs:n `AGENTS.md`-haara, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md` ja jokainen `skills/*/SKILL.md` viittaavat
lähteeseen (esimerkiksi `ROUTING_STRATEGY_VALUES` tiedostossa `src/shared/constants/routingStrategies.ts`) ja
komentoon `npm run facts`. Invariantti "Ei johdettuja määriä (agenttiohjetiedosto …)" epäonnistuu, jos
siellä on määrä (palveluntarjoajat, migraatiot, MCP-työkalut ja scopet, reititysstrategiat, pisteytystekijät,
tilapaketit) kummassakin tilassa, joten julkaisuvirkistys ei koskaan joudu kirjoittamaan ohjetiedostoa uudelleen.

`pr`-tilassa kirjoittajahaara voi muokata hallittuja arvoja: `chore/derived-*` (öinen virkistys-
PR), `release/v*` ja käännösaallot `docs/i18n-*` ja `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Jonobatchit (`merge_group`, Mergify-luonnokset,
`omni-queue/**`) eivät kuulu uudelleenarviointiin: ne kokoavat yhteen PR:t, jotka portti on jo
arvioinut yksi kerrallaan.

Palautuskoodit: `0` puhdas · `1` STRICT-poikkeama (tai pehmeä poikkeama valitsimella `--strict`) tai hallitun arvon
rikkomus · `2` infrastruktuuri — koodifaktoja ei voitu kerätä (tsx-luotain epäonnistui tai aikakatkaistiin;
aikakatkaisu on `OMNIROUTE_FACTS_TIMEOUT_MS`, oletusarvo 600000 ms) tai CI:ssä PR:n diff-perustaa
ei voitu ratkaista. Palautuskoodi 2 ei ole koskaan dokumentaation eroavuus: suorita työ uudelleen tai korjaa
ympäristö.

Missä kukin tila suoritetaan:

| Missä                                                                                                  | Tila                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ominaisuus-PR — `ci.yml`-työ `docs-sync-strict`, `quality.yml`-vaihe "Docs accuracy"                   | `pr` (automaattinen); työ välittää perustan arvona `BASE_SHA` ja tekee checkoutin arvolla `fetch-depth: 2`                                                                                                            |
| `merge_group`, `omni-queue/**`-ehdokkaat, yhdistämisjunan koko porttiluettelo                          | `pr`                                                                                                                                                                                                                  |
| Julkaisu-PR (`release/v* → main`), pushit, ajastetut ja manuaaliset suoritukset                        | `release`                                                                                                                                                                                                             |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                           | HARD-kohteet suoritetaan arvolla `OMNIROUTE_GATE_MODE=pr` ("rikkoiko perusta?"); DRIFT-kohde `derived-refresh` suorittaa `npm run release:refresh-derived -- --check` (strict-näkymä, ei koskaan avaa base-red-tilaa) |
| Release (`/generate-release`-vaiheet 0a ja 1; taidon kytkentä on erillinen omistajan hyväksymä muutos) | `npm run release:refresh-derived` kirjoittaa johdetut tiedostot; julkaisu-PR:n omat tarkistukset suoritetaan sen jälkeen `release`-tilassa                                                                            |
| `nightly-derived-refresh.yml` (päivittäin, korkein `release/vX.Y.Z`, ohitetaan release-freezen aikana) | `npm run release:refresh-derived -- --profile=nightly`; diff-tilanteessa se pitää yhden PR:n avoinna lähteestä `chore/derived-refresh`; ei koskaan yhdistä                                                            |

Sen taustalla olevat komennot:

- `npm run facts` tulostaa jokaisen johdetun numeron JSON-muodossa (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` tulostaa yhden arvon, `--snapshot` lukee versionhallintaan tallennetun tilannevedoksen
  aktiivisen puun sijaan. Poistumiskoodi on 2, kun tietojen kerääminen ei onnistu.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) laskee johdetut
  tiedostot uudelleen yhdellä kertaa tässä järjestyksessä (vaiheiden tunnisteet `--only=`-valitsimelle): `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (tilannevedos), `numbers` (määrärajoitteen uudelleenkirjoitussuunnitelma
  sovellettuna dokumentaatioon ja sen jälkeen niiden `docs/i18n/`-peileihin),
  `readme-diagrams`, `skills` (luotu `SKILL.md`), `e2e-timings` (ohitetaan, kunnes puu sisältää
  `syncE2eTimings`-toiminnon), `ui-keys` (poistaa avaimet, jotka `en.json` hylkäsi, ja
  `--rewritten-since=<ref>`-valitsimen kanssa — oletuksena `origin/main` — lisää uudelleen jonoon englanninkieliset arvot,
  jotka kirjoitettiin uudelleen viimeisimmän julkaisun jälkeen), `llm-mirrors` ja `verify-generated` (kirjoituksen
  jälkeen `check:generated-artifacts`- ja `check:agent-skills-sync`-tarkistusten on julkaisutilassa läpäistävä;
  ohitetaan `--check`-tilassa ja kun `--only` jättää vaiheen pois; virhe aiheuttaa poistumiskoodin 2).
  `changelog`-vaihe otetaan käyttöön erikseen (`--with-changelog`, vain julkaisuprofiilissa). `--profile=nightly`
  ei koskaan kosketa versioväitettä. Kun käytetään `-- --check`-valitsinta, mitään ei kirjoiteta ja poistumiskoodi
  on 1, jos jokin tiedosto muuttuisi tai hallittu arvo vaatisi manuaalista muokkausta (molemmat luetellaan);
  infrastruktuurivirheestä poistumiskoodi on 2. `--json` tulostaa tuloksen JSON-muodossa.
- `docs/reference/derived-facts.json` on tilannevedos tiedoista, joita viimeisin päivitys käytti. Vain päivitys
  kirjoittaa siihen. README:n SVG-generaattorit lukevat sitä, ja PR-aikaiset yksikkötestit vertaavat versionhallintaan
  tallennettuja dokumentteja ja luotuja tiedostoja siihen — eivät aktiiviseen koodiin. Testikokonaisuuden ainoa aktiivinen
  vertailu on `"the release refresh closes the cycle"` tiedostossa
  `tests/unit/check-docs-counts-sync.test.ts`: aktiivisten tietojen kanssa muistiin sovellettu päivityksen
  uudelleenkirjoitussuunnitelma ei jätä raportoimatta yhtään STRICT-poikkeamaa, ja uudelleensuunnittelu ei muuta mitään.

Toista paikallisesti (paikallinen suoritus käyttää oletuksena `release`-profiilia):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Jos ratkaistavissa olevaa perustaa ei ole (ei `BASE_SHA`- tai `BASE_REF`-muuttujaa eikä paikallista
`origin/release/v<version>`-haaraa), paikallinen `pr`-suoritus tulostaa varoituksen ja ohittaa
erotuksen sen sijaan, että epäonnistuisi.

### Työ: `i18n-ui-coverage`

| Komentosarja                      | Vahvistaa                                                                                                                                                                                                                                    | Estävä                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check-ui-keys-coverage` (inline) | Käyttöliittymän i18n-avainten kattavuus on ≥ 65 %                                                                                                                                                                                            | Kyllä (molemmat tilat)    |
| `check:ui-icu`                    | Jokainen jokaisen käyttöliittymäluettelon viesti kääntyy `IntlMessageFormat`-muotoilulla                                                                                                                                                     | Kyllä (molemmat tilat)    |
| `check-ui-value-drift` (inline)   | Uudelleenkirjoitettu englanninkielinen **arvo** ei jätä vanhentunutta käännöstä                                                                                                                                                              | Kyllä (vain julkaisutila) |
| `check-new-key-coverage` (inline) | **Uusi** englanninkielinen avain on käännetty kaikille alueille — `__MISSING__:`-merkintä hylätään                                                                                                                                           | Kyllä (vain julkaisutila) |
| `check-key-completeness` (inline) | Jokainen käyttöliittymäluettelo (ja `--catalog=cli`-valitsimella jokainen CLI-luettelo) sisältää täsmälleen `en.json`-tiedoston avainjoukon; `pr`-tilassa jokainen PR:n muuttama luettelo verrataan itseensä yhdistämiskohdassa              | Kyllä (molemmat tilat)    |
| `check-translation-ratio`         | Aluekohtainen oikeiden käännösten suhde (englannin kanssa identtiset / paikkamerkit / puuttuvat merkinnät sallittujen poikkeusten ulkopuolella) ei saa ylittää tiedoston `config/quality/i18n-translation-baseline.json` arvoa + joustovaraa | Kyllä (vain julkaisutila) |

Vaatii asetuksen `fetch-depth: 0` — arvoerotusportti vertaa `en.json`-tiedostoa yhdistämiskohdan kanssa.

**Kaksi tilaa (13.11.2026 alkaen).** Ominaisuus-PR lisää tai kirjoittaa uudelleen avaimia tiedostossa `en.json`
(ja tiedostossa `bin/cli/locales/en.json`) eikä muuta muita alueita; `check:pr-derived-paths` (työ
`pr-test-policy`, perhe `config/quality/derived-paths/translation.json`) epäonnistuu, jos ominaisuus-PR tekee niin.
Muut alueet viimeistellään kerran julkaisua kohden komennolla `release:refresh-derived`, joka kutsuu funktiota
`syncUiKeys()` tiedostossa `scripts/i18n/sync-ui-keys.mjs` (lisää puuttuvat avaimet, poistaa hylätyt avaimet,
merkitsee uudelleen kirjoitetun englannin käännökset `rewrittenSinceRef`-arvolla ja kääntää), tai käännösaallon avulla.
Portit lukevat tilan tiedostosta `scripts/check/lib/gateMode.mjs`: `pr`-tilassa (ominaisuus-PR:t,
`merge_group`, `omni-queue/**`) edellä mainitut julkaisutilan portit tulostavat `SKIP reason=pr-mode` ja
poistuvat koodilla 0; `release`-tilassa (julkaisu-PR, työnnöt haaraan `main`, `workflow_dispatch`, paikalliset suoritukset)
ne ovat entiseen tapaan tiukkoja, ja julkaisu-PR:ssä erotustietoiset portit saavat arvon `BASE_REF=origin/main`,
joten ne arvioivat jokaisen syklin lisäämän tai uudelleenkirjoittaman avaimen. Esikatsele ominaisuus-PR:n tulos
paikallisesti valitsimella `--mode=pr`.

PR:ää, joka muuttaa edelleen locale-luetteloita `pr`-tilassa (käännösaalto, julkaisun päivitys tai vain käännöksiin liittyvä korjaus), ei ohiteta: `check-key-completeness` vertaa jokaista sen muuttamaa luetteloa samaan luetteloon merge-basessa (`scripts/i18n/lib/touched-catalogs.mjs`) ja epäonnistuu, jos luettelo on menettänyt avaimen, `en.json`-tiedostosta puuttuu avain, oikea käännös on muuttunut `__MISSING__:`-merkinnäksi tai englanninkieliseksi tekstiksi tai jos arvo ei enää käsittele englanninkielisen merkkijonon paikkamerkkejä/tageja, vaikka PR ei koskenut kyseiseen englanninkieliseen merkkijonoon. PR:ssä uutena lisätyn luettelon on sisällettävä koko `en.json`-avaimisto. Tämä kattaa PR:n koskemien luetteloiden osalta sen, mitä suhde- ja CLI-yhteneväisyystarkistukset näkisivät.

Locale-yhteneväisyyden yksikkötestit (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) noudattavat samoja tiloja tiedoston `tests/_helpers/localeParityMode.ts` kautta: `pr`-tilassa ne ohittavat avainyhteneväisyyttä koskevat tarkistukset ja jättävät julkaisun päivityksen vastuulle niiden avainten paikkamerkkien yhteneväisyyden, joiden englanninkielinen teksti muuttui merge-basesta lähtien (kaikkien avainten osalta, jos yksikkötestityön shallow checkout ei pysty lukemaan sitä). Tämä apufunktio on **ainoa** sallittu tilariippuvainen ohitus: `check:test-masking` laskee `.skip(`-kutsut ja `{ skip: true }` -objektit, mutta ei sen palauttamaa laskettua `{ skip: "<reason>" }` -objektia, joten `tests/unit/locale-parity-mode.test.ts` lukitsee luettelon testeistä, jotka saavat käyttää sitä — uuden testin lisääminen edellyttää tarkistettua muokkausta kyseiseen luetteloon.

#### `check-ui-value-drift` — vanhentuneiden käännösten tarkistus

Havaitsee yhden i18n-regression, jota muut tarkistukset eivät rakenteellisesti pysty näkemään: englanninkielinen arvo kirjoitetaan uudelleen, mutta aiemmasta englanninkielisestä tekstistä johdetut käännökset jäävät ennalleen, jolloin muut kuin englanninkieliset käyttäjät näkevät edelleen vakuuttavasti muotoillun mutta nyt virheellisen tekstin.

Tämä päätyi tuotantoon. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravity-kirjautumisavustin lisättiin (#5203); **39/43 lokaalista** säilytti tekstin, joka kehotti ylläpitäjiä ”kopioimaan koko URL-osoitteen ja liittämään sen alle” — kyseisen palveluntarjoajan kanssa toimimaton työnkulku. Tämä jäi huomaamatta PR:ään #8463 asti, koska:

- `sync-ui-keys` täydentää vain **puuttuvia** avaimia, ei vanhentuneita;
- `check-ui-keys-coverage` laskee avaimen _olemassaolon_, joten vanhentunut käännös tulkitaan katetuksi;
- `check-translation-drift` seuraa dokumentaation peilejä `docs/i18n/<locale>/**.md` —
  se ei koskaan lue tiedostoja `src/i18n/messages/*.json`. Se suoritetaan työssä `docs-sync-strict`: PR:issä ohjeellisena, push-tapahtumissa ja öisin tiukkana; käännösaallon päivitys virkistää peilit, ei ominaisuus-PR:ää.

**Diff-tietoinen, ei baselineen perustuva.** Se vertaa merge-basessa olevaa `en.json`-tiedostoa työpuuhun; jokaisen avaimen kohdalla, jonka englanninkielinen arvo muuttui, mikä tahansa lokaalissa oleva koskemattomana säilynyt käännös on vanhentunut. Tämä jäädyttää tarkoituksella aiemmin olemassa olevan velan — diffistä ei voi päätellä, mistä vanhasta englanninkielisestä tekstistä pitkään olemassa ollut käännös on peräisin, joten tarkistus arvioi vain nykyisen muutoksen koskemia asioita. Vaihtoehtoinen ratkaisu (avainkohtainen hash-baseline) vaatisi noin 600 kt:n generoidun tiedoston, joka olisi kolme kertaa suurin nykyinen baseline ja muuttuisi jokaisessa i18n-PR:ssä.

Sen voi täyttää kahdella tavalla:

1. päivitä kyseiset käännökset tai
2. aseta niiden arvoksi `__MISSING__:<new english>` — runtime tarjoaa tällöin korjatun englanninkielisen tekstin (`src/i18n/request.ts::deepMergeFallback`, #7258), ja avain lisätään käännösjonoon.

Jos merkkijonon **merkitys** muuttui, suosi avaimen **uudelleennimeämistä**: uusi avain ei voi periä vanhentunutta käännöstä. Tätä mallia käytettiin PR:ssä #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Poistuu koodilla 0 ja tulostaa `SKIP reason=base-unresolved`, kun baseline-luetteloa ei voida lukea (shallow clone ilman base-ref-viitettä), samalla tavalla kuin `check-openapi-breaking`. Vain julkaisutilassa: ominaisuus-PR kirjoittaa englanninkielisen tekstin uudelleen ja päättyy siihen; julkaisun päivitys merkitsee sen jälkeensä jättämät käännökset (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, sama `findStaleTranslations`).

### Työ: `i18n`

Täydellinen i18n-validointimatriisi (yksi työ lokaalia kohti). Koko työ on ohjeellinen.

| Skripti                         | Validoi                                | Estävä                                                  |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | Käännösten täydellisyys lokaalia kohti | **Ohjeellinen** (`continue-on-error: true` koko työssä) |

### Työ: `pr-test-policy`

Suoritetaan vain pull requestien yhteydessä.

| Skripti                | Validoi                                                                                                                                                     | Estävä |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | PR:ien, jotka muuttavat tuotantokoodia hakemistoissa `src/`, `open-sse/`, `electron/` tai `bin/`, on sisällettävä tai päivitettävä testejä (kova sääntö #8) | Kyllä  |
| `check:test-masking`   | Muutetut testitiedostot eivät vähennä assert-lauseiden nettomäärää eivätkä lisää `assert.ok(true)` -tautologioita                                           | Kyllä  |
| `check:pr-evidence`    | PR:n kuvaus sisältää muutosta koskevan testi-/VPS-näytön (toteuttaa kovan säännön #18:n etsimällä PR:n tekstistä — hauras, katso Backlog)                   | Kyllä  |

### Työ: `test-vitest`

Suoritetaan `build`-työn jälkeen. Estää yhdistämisen, jos se epäonnistuu.

| Paketti          | Vahvistaa                                                                  | Estävä                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-palvelimen (110 työkalua), autoCombo, välimuistin — vitest-suorittimen | Kyllä                                                                                                                                           |
| `test:vitest:ui` | Käyttöliittymäkomponenttien testit — vitest-suoritin                       | **Estävä** — aiemmin olemassa olevat virheet on nimenomaisesti rajattu pois tiedostossa `vitest.config.ts`; uudet virheet epäonnistuttavat työn |

### Öiset työnkulut (ajastetut, ohjeelliset)

Nämä suoritetaan cron-aikataulun (ja `workflow_dispatch`-toiminnon) mukaan, eivät koskaan PR-pyynnöissä. Kaikki ovat ohjeellisia.

| Työnkulku              | Vahvistaa                                                                                                                                                                                         | Estävä          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check-ominaisuustestit satunnaisella siemenluvulla ja suurella suorituskertamäärällä                                                                                                         | **Ohjeellinen** |
| `nightly-resilience`   | keon kasvun portti, kaaosvikojen injektointi, k6-kuormitus ja -kestotesti                                                                                                                         | **Ohjeellinen** |
| `nightly-llm-security` | promptfoo-injektiosuoja (estotila) sekä garak-luotaimet (ohitetaan ilman palveluntarjoajan salaista arvoa)                                                                                        | **Ohjeellinen** |
| `nightly-schemathesis` | OpenAPI-sopimuksen fuzz-testaus (schemathesis) aktiivista OmniRoutea vastaan käyttäen tiedostoa `docs/openapi.yaml` — tuo esiin määritysrikkomukset / käsittelemättömät 500-virheet (Vaihe 8 B.4) | **Ohjeellinen** |
| `nightly-mutation`     | Stryker-mutaatioiden testauksen pistemäärä nopealla yksikkötestikaistalla — eloon jääneet mutantit paljastavat heikot assertit                                                                    | **Ohjeellinen** |
| `nightly-compat`       | Node-moottorin yhteensopivuusmatriisi tuettujen `engines.node`-alueiden välillä                                                                                                                   | **Ohjeellinen** |

Suorituskyvyn perustasot (keko, TTFB, koontiaika) tallennetaan, mutta niitä ei käytetä portteina: katso [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Nopeusvaihe (2026-08-30 → v4.0 LTS): jokaista perustasoa väljennettiin 20 %

Omistajan päätös (2026-08-30): v4.0:n modulaaristamiseen asti toimitusnopeus on tärkeämpää
kuin velkarajan pitäminen. Jokaista **numeerista** porrastusperustaa väljennettiin 20 % yhdellä
auditoitavalla kertaa, ja vaihe ilmoitetaan tiedostossa `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mitä muuttui                                                                                                                                                                                                                        | Missä                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — pienempi on parempi -määrät ×1.2, suurempi on parempi -prosenttiosuudet ÷1.2 (kattavuuden alaraja 60 säilytettiin, `eslintErrors` pysyy arvossa 0, `eslintWarnings` 0 → 20 % jäädytetystä suppression-määrästä) | `quality-baseline.json` (`_relax_velocity_2026_08_30`-merkintä sisältää kaikki ennen → jälkeen -arvot) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                    | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, jokainen `frozen[*]`- / `testFrozen[*]`-rivin raja ×1.2                                                                                                                                                           | `file-size-baseline.json`                                                                              |
| tiedostokohtaiset / TS-koodikohtaiset määrät ×1.2                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` muuttuu ohjeelliseksi, kun `_policy.requireTighten === false`                                                                                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| öinen `bank-ratchet-shrinks`-ajo keskeytetään (se tallettaisi mitatun pienennyksen ja kumoaisi pelivaran)                                                                                                                           | `.github/workflows/nightly-release-green.yml`                                                          |

Sallittujen luetteloita (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ei** käsitellä budjetteina, eikä niitä muutettu. Hyväksy/hylkää-käytännön portit (salaisuudet, SQL-säännöt,
dokumentaatio-/ympäristösopimus, i18n-pariteetti, yksikkötestit) ovat ennallaan — punainen testi on edelleen punainen testi.

**Työkalut**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — kertaluonteinen
  väljennys (`scripts/quality/relax-baselines.mjs`); kieltäytyy suorittamasta ajoa uudelleen samalla merkinnällä.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mittaa jokaisen numeerisen portin CI:n tapaan ja tulostaa kunkin portin jäljellä olevan pelivaran
  (`scripts/quality/baseline-headroom.mjs`). Öinen `baseline-headroom`-työ julkaisee taulukon työnkulun ajon
  yhteenvedossa ja lataa JSON-/Markdown-raporttinsa nimellä `baseline-headroom-<run_id>`, ja niitä säilytetään
  90 päivän ajan. Varoitus- ja kriittiset rivit osoittavat portit, jotka ovat 10 %:n sisällä rajastaan tai
  jo ylittävät sen. Tarkastele näitä raportteja varhaisena varoituksena budjettien kulumisesta; tarkista
  ongelmallisen portin `_rebaseline_*`-merkinnät. Työ ei enää luo tai päivitä pysyvää issuea; #12149 säilyttää
  aiemman raporttihistorian.

**Uuden koodin tila (Clean-as-You-Code) — 2026-08-30 alkaen, vain PR:n pikapolku**

`pull_request`-tapahtumissa `quality.yml` välittää `--base-ref <PR base SHA>` komennoille
`check:file-size`, `check:complexity-ratchets` ja `check:dead-code`. Komentojen
`check:complexity-ratchets` ja `check:dead-code` osalta portti vertaa HEADia merge-baseen,
**rajoitettuna PR:n muuttamiin tiedostoihin** (`scripts/check/newCodeMode.mjs`: merge-base
materialisoidaan väliaikaiseen `git worktree`-hakemistoon, ESLint/knip suoritetaan siellä ja HEADissa,
ja tiedostokohtaiset määrät erotetaan):

- **estävä** — PR lisäsi syklomaattisia/kognitiivisia rikkomuksia tai kuolleita vientiobjekteja muuttamiinsa tiedostoihin
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` lokissa);
- **ohjeellinen** — globaali kokonaismäärä verrattuna jäädytettyyn perustasoon. Peritty ajautuminen ei koskaan
  merkitse viatonta PR:ää punaiseksi; ajautuminen jäädytetään uudelleen julkaisun täsmäytyksessä ja sitä seurataan
  headroom-työllä.

`check:file-size` käyttää perusviittausta omilla ehdoillaan (`scripts/check/check-file-size.mjs`, #8522):
se tarkistaa kaikki lähde- ja testitiedostot puussa, lukee kunkin rivimäärän PR:n perustasolla komennolla
`git show` ja epäonnistuu tiedoston kohdalla vain, jos se kasvaa suuremmaksi kuin sen perustason yläraja
(`frozen` / `testFrozen` tai `cap` / `testCap` perustason ulkopuoliselle tiedostolle) ja perustason koko.
Perustasolla jo ajautunut tiedosto ei siksi koskaan merkitse viatonta PR:ää punaiseksi.

`check:boundary:ratchet` soveltaa samaa sääntöä yhteen lukuunsa
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-tapahtumissa sekä
`quality.yml`-työnkulun nopeat tarkistukset että `ci.yml`-työnkulun lint-työ välittävät PR:n
perus-SHA:n, peruscommit mitataan `git archive` -viennistä, ja PR epäonnistuu vain, kun sen
`open-sse → src` -reunojen määrä ylittää suuremman arvoista `metrics.boundaryOpenSseToSrc`
ja perustan reunamäärästä. Perustan ylärajan ylittävä poikkeama ilmoitetaan
(`base drift herdado`), mutta viatonta PR:ää ei koskaan merkitä epäonnistuneeksi; push →
main säilyttää absoluuttisen ylärajan, ja ratkaisemattoman perus-SHA:n tapauksessa käytetään
varoituksen kera sitä.

Omni-jonon ehdokas (push kohteeseen `omni-queue/**`, katso
[OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)) käsitellään samalla tavalla kuin pull request:
molemmat työnkulut välittävät ehdokkaan perustan
(`needs.changes.outputs.candidateBase`) parametrina `--base-ref`, ja
`check:ts7-diagnostics-ratchet` suoritetaan myös sitä vasten. Kahden uuden koodin portin
vertailuperustana käytetään kyseistä SHA:ta itsessään, ei ylimmän merge-commitin ensimmäistä
parenttia, joten jokainen erän pull request arvioidaan.

`workflow_dispatch`-ajot, release-green-tarkistus ja öinen headroom-työ eivät käytä PR:n
perustaa, vaan säilyttävät absoluuttisen (globaalin) vertailun. Kattavuus, duplikaatio ja
tyyppikattavuus pysyvät toistaiseksi globaaleina (niiden työkalut eivät tuota tiedostokohtaista
diffiä edullisesti) — ehdokkaita samaan käsittelyyn.

**Vaiheen sulkeminen versiossa v4.0 (LTS = aiempaa tiukempi, ei ”paluu normaaliin”)**

1. Puhtaassa `release/v4.0.0`-kärjessä: `npm run quality:headroom --json` tietueeksi, sitten
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, kunkin tyyppitarkistusportin
   `--update` — jokainen perustaso laskee mitattuun arvoon.
2. Poista `_policy` tiedostosta `quality-baseline.json` (aktivoi uudelleen `--require-tighten` ja öisen
   pankituksen), palauta `THRESHOLD = 36` (tai suurempi) tiedostossa `check-openapi-coverage.mjs`.
3. Tiukenna mitattua tasoa edelleen siellä, missä modulaaristaminen tuotti hyötyä: tiedostokoon
   `cap` takaisin arvoon 1000 (tai 800), kattavuuden alarajat +5, moduloitujen pakettien
   kuolleet viennit arvoon 0.

## Ratchet-perustaso (`quality-baseline.json`)

Ratchet-moottori (`scripts/quality/check-quality-ratchet.mjs`) lukee tiedoston `quality-baseline.json`
ja vertaa sitä juuri kerättyyn tiedostoon `quality-metrics.json`. Mikä tahansa metriikka, joka heikkenee
epsilon-arvoaan enemmän, aiheuttaa koontiversion epäonnistumisen.

Seurattavat metriikat:

| Metriikka             | Suunta | Merkitys                               |
| --------------------- | ------ | -------------------------------------- |
| `eslintWarnings`      | `down` | ESLint-varoitusten määrä ei saa kasvaa |
| `coverage.statements` | `up`   | Lausekattavuus ei saa laskea           |
| `coverage.lines`      | `up`   | Rivikattavuus ei saa laskea            |
| `coverage.functions`  | `up`   | Funktiokattavuus ei saa laskea         |
| `coverage.branches`   | `up`   | Haarakattavuus ei saa laskea           |

Päivitä perustaso aidon parannuksen jälkeen:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Lippu `--update` kirjoittaa nykyiset mitatut arvot tiedostoon `quality-baseline.json`.
Parannuksen kirjaaminen perustasoon kuuluu julkaisu-/yöajotöihin, ei ominaisuus-PR:ään: `--require-tighten`
(Vaihe 6A.5) aiheuttaa kirjaamattoman parannuksen epäonnistumisen vain julkaisutilassa (push, ajoitettu ajo, julkaisu-PR,
paikalliset ajot). Ominaisuus-PR:ssä (`pr`-porttitila) se näyttää parannuksen tiedoksi ja jatkaa onnistuneena;
regressio aiheuttaa epäonnistumisen molemmissa tiloissa. Nopeusvaiheen aikana se on kaikkialla vain ohjeellinen
(`_policy.requireTighten: false`). Lisätietoja on kohdassa
[Luodut tiedostot ja julkaisun yhteydessä kirjoitettavat johdetut perustasot](#generated-files-and-derived-baselines-written-at-release).

### CodeQL-ratchet: päivitystiheys ja manuaalinen käynnistys

`check:codeql-ratchet` lukee **repositorion tilan, joka päivitetään aikataulun mukaan — ei PR-kohtaisesti.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ilmoittaa
`state: configured`, `schedule: weekly`: kyseessä on GitHubin oletusasetusten mukainen tarkistus, ei push-kohtainen
analyysi. Seurauksena on, että alertteja KORJAAVAN PR:n yhdistämisen jälkeen ratchet lukee edelleen vanhempaa,
suurempaa määrää, kunnes seuraava ajoitettu tarkistus suoritetaan — joten se ilmoittaa regressiosta jokaisessa avoimessa
PR:ssä, myös korjaavan PR:n omissa jatkopäivityksissä, kunnes tarkistus saavuttaa ajan tasalle.

**Manuaalinen päivitys**: `gh workflow run codeql.yml --ref release/vX.Y.Z` suorittaa
analyysin uudelleen ja julkaisee alertit uudelleen muutamassa minuutissa. Lue ensin `.github/workflows/codeql.yml` —
sen otsakkeessa selitetään, että se on vain `workflow_dispatch`-käytössä, **koska se on ristiriidassa
GitHubin ”default setup” -asetuksen kanssa** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`-/
`schedule`-laukaisinten palauttaminen edellyttää ensin **omistajan toimenpidettä**: Settings → Code security →
CodeQL: Default → Advanced. Älä lisää `schedule:`-laukaisinta ilman tätä asetuksen vaihtamista — se
tuottaa vain epäonnistuvia ajoja.

**Tiukennetaan perustasoa määrän pienennyttyä** — `node scripts/check/check-codeql-ratchet.mjs
--update` kirjoittaa uuden mitatun määrän tiedostoon `quality-baseline.json` →
`metrics.codeqlAlerts.value`, jotta ratchet ei salli huomaamatta regressiota takaisin vanhaan ylärajaan.
Esimerkki (2026-09-02/03): PR #12502 korjasi 7 todellista alerttia
(mitattu avoimien alerttien määrä 13 → 6); PR #12530 tiukensi jäädytetyn perustason arvosta 11 arvoon 6 vastaamaan
tätä; jäljellä olleet 6 alerttia hylättiin sen jälkeen alerttikohtaisilla perusteluilla, jolloin avoimia jäi 0.

**Hylkäykset ovat operaattorin vastuulla (Kova sääntö #14)** — älä koskaan hylkää CodeQL-alerttia
ilman teknisen perustelun kirjaamista hylkäyskommenttiin: `won't fix` upstream-protokollan vaatimukselle,
`used in tests` testidatalle, `false positive` sanitointikoodille, jota CodeQL ei pysty havaitsemaan
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

## Generoidut tiedostot ja johdetut vertailuarvot (kirjoitetaan julkaisun yhteydessä)

Suunnitelma 2026-11-13 (”johdetut luvut ja tekstit ratkaistaan vasta julkaisun yhteydessä”): ominaisuus-PR muuttaa
**lähdettä** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, taitoluetteloa,
ilmaistason luetteloa ja uutta e2e-määritystä. Se ei generoi lähteestä laskettuja tiedostoja uudelleen
eikä tallenna mitattua parannusta vertailuarvoon. Nämä tiedostot kirjoitetaan kerran julkaisun
päivityksen (`release:refresh-derived`) tai öisen päivitys-PR:n yhteydessä. Aiemmin jokainen sisar-
PR sisälsi oman uudelleen generoidun kopionsa, joka joutui ristiriitaan seuraavan yhdistämisen kanssa
(2026-11-13: 30 avoimesta 321 PR:stä kirjoitti `PROVIDER_REFERENCE.md`:n uudelleen, ja 26–28 kirjoitti README-kaaviot uudelleen).

**Vartiointi.** `check:pr-derived-paths` (työ `pr-test-policy`) epäonnistuu ominaisuus-PR:ssä, joka muuttaa
tiedostoa jossakin hakemistossa `config/quality/derived-paths/` määritellyssä perheessä:

| Perhe       | Tiedostot                                                                                                                                                                                           | Kirjoittaja                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; kaksitoista generoitua README SVG:tä; `skills/*/references/**`; `SKILL.md`-tiedostot, joissa ei ole mukautettua lohkoa | `release:refresh-derived` (faktat), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                                   | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

Kirjoittajat (`release/v*`, `chore/derived-*` ja vertailuarvojen tapauksessa `chore/bank-ratchet-*`) on vapautettu tästä; samoin PR, joka muuttaa vain yhtä perhettä sekä sen oheistiedostoja (perheen `generated` tapauksessa generointiskriptit, niiden testit, agenttitaitojen syötteet — `src/shared/constants/agentSkills.ts`, käsin kirjoitetut `skills/**`-dokumentit, `docs/openapi.yaml` — sekä `changelog.d/**`), esimerkiksi sankariasettelun muutoksen yhdessä uudelleen generoidun SVG:n kanssa tai taitokorjauksen, jonka testi lukee uudelleen generoidut `SKILL.md`-tiedostot. `SKILL.md`, jossa on käsin kirjoitettu `<!-- skill:custom-start -->` -lohko, ei kuulu perheeseen: sen mukautettua lohkoa voi muokata ominaisuuden yhteydessä.

**Tarkistukset porttitilan mukaan** (`scripts/check/lib/gateMode.mjs`; apuohjelma
`scripts/check/lib/derivedArtifactScope.mjs`):

| Tarkistus                                                                       | `release` (push, ajoitus, release-PR, paikallinen)                          | `pr` (ominaisuus-PR, jonopaketointi)                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                       | jokaisen taidon on vastattava generaattorin tulostetta                      | vain ne taidot, joiden generoitu teksti (mukautetun lohkon ulkopuolella) tai `references/`-hakemistoa PR muokkaa; muutoin `SKIP reason=pr-mode`                                                                                        |
| `check:generated-artifacts` (README SVG:t + e2e-ajat; tarvitsee koko historian) | jokainen SVG vastaa generaattoria; jokaisella määrityksellä on aikamerkintä | vain PR:n muokkaamat artefaktit; muiden kohdalla `SKIP reason=pr-mode`; ei diff-pohjaa → jokainen artefakti arvioidaan (fail-closed)                                                                                                   |
| README SVG -tavujen vertailutestit (`tests/unit/docs/readme-*-svg.test.ts`)     | jokainen SVG                                                                | vain PR:n muokkaama SVG, kun pohja voidaan ratkaista; `test-unit`-testin suppeassa PR-checkoutissa ei ole pohjaa, joten testi ohitetaan siellä tilalla `SKIP reason=base-unresolved` ja `check:generated-artifacts` vastaa vertailusta |
| e2e-aikojen täydellisyys (`tests/unit/balance-e2e-shards.test.ts`)              | jokaisella määrityksellä on merkintä                                        | sama sääntö kuin SVG-testeillä (uusi määritys suoritetaan mediaanipainolla)                                                                                                                                                            |
| `check-quality-ratchet.mjs --require-tighten`                                   | tallettamaton parannus epäonnistuu (ellei kyseessä ole `_policy`)           | parannus raportoidaan, mutta se ei koskaan aiheuta epäonnistumista; regressio aiheuttaa edelleen epäonnistumisen                                                                                                                       |

Release-tila säilyttää näiden tarkistusten ennen jakoa käyttämät tuomiot, poistumiskoodit ja viestit; enintään
yksi rivi lisätään ja siinä nimetään ratkaistu tila (`[agent-skills-sync] mode=release (auto: local run)`).
Testit ohitetaan node:testin `{ skip: releaseOnlyUnlessTouched(...) }` -asetuksella, jonka
`check:test-masking` listaa vain raportointia varten tarkoitetussa lohkossa (se ei ole `.skip(` eikä `{ skip: true }`, joten
sitä ei lasketa kovaksi ohitukseksi). `check:generated-artifacts` suoritetaan siellä, missä kanta voidaan ratkaista: työn
`lint` yhteydessä (`fetch-depth: 0`), heti `check:agent-skills-sync`-tarkistuksen jälkeen. Paikallisesti
`npm run check:generated-artifacts -- --mode=pr` näyttää, mitä tämä vaihe arvioi PR:ssä. `check:docs-counts`-tarkistuksen
palveluntarjoajien kokonaismäärän ristivertailu ("Provider reference total (doc vs live modules)") on osa
määrien tarkistusta ja noudattaa kyseisen tarkistuksen omia tiloja.

Ei kuulu tarkoituksella mihinkään perheeseen: ihmisten päättämät käytäntötiedostot (`gate-manifest.json`, sallitut luettelot,
`admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) sekä ylärajat, joita ominaisuus-PR:n
on ehkä muokattava yhdessä koodin kanssa (`quality-baseline.json` -tietueet, tyyppitarkistuksen, tiedostokoon ja
monimutkaisuuden lähtötasot, `eslint-suppressions.json` — joita karsitaan pre-commit-
ESLint-ajossa, kun PR korjaa jäädytetyn rikkomuksen). `src/i18n/routeNamespaces.generated.json` on myös
generoitu, mutta se säilyy ominaisuus-PR:issä: sovellus tuo sen ajonaikaisesti, joten se ei voi odottaa päivitystä.

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

## Sallitun luettelon käytäntö

Jokainen tarkistus, joka ei voi epäonnistua aiemmin esiintyneiden rikkomusten vuoksi, käyttää jäädytettyä sallittua luetteloa
(esim. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Käytäntö on seuraava:

**Korjaa perimmäinen syy; käytä sallittua luetteloa vain, kun rikkomus on peräisin aiemmasta
tilanteesta eikä sitä voida korjata samassa PR:ssä.**

Kun lisäät merkinnän sallittuun luetteloon:

1. Lisää kommentti, joka sisältää perustelun.
2. Viittaa seurantatehtävään (esim. `// #3498 — Phase 2 feature, not yet implemented`).
3. Poista merkintä samassa PR:ssä, jossa rikkomus korjataan — vanhentunut merkintä, joka ei enää
   estä aktiivista rikkomusta, on itsessään virhe (6A.3:n vanhentuneiden merkintöjen tarkistus
   epäonnistuu toteutuksen jälkeen tarkistuksessa orpona olevan sallittuun luetteloon jääneen merkinnän vuoksi).

Älä lisää merkintöjä sallittuun luetteloon saadaksesi testit läpäistyä nopeammin. Vihreä tarkistus kasvavan sallittujen luettelon kanssa antaa väärän
laadun tunteen.

### Kun tarkistus epäonnistuu PR:ssäsi

1. **Lue tarkistuksen tuloste huolellisesti** — se kertoo täsmälleen, mikä tiedosto tai symboli rikkoi
   sääntöä.
2. **Korjaa rikkomus** — useimmat tarkistukset ovat deterministisiä tiedostojärjestelmän tarkistuksia, jotka läpäistään heti,
   kun koodi on oikein.
3. **Jos rikkomus on peräisin aiemmasta tilanteesta** (et siis aiheuttanut sitä, mutta tarkistus kattaa sen nyt): lisää sallittuun luetteloon merkintä, jossa on perustelukommentti ja seurantatehtävä.
4. **Jos kyseessä on asteittain kiristyvä tarkistus** (kattavuus, ESLint-varoitukset, päällekkäisyys, monimutkaisuus):
   muutoksesi heikensi mittaria. Korjaa taustalla oleva ongelma tai (harvoin) suorita
   `npm run quality:ratchet -- --update`, jos muutos on tarkoituksellinen ja mittarin heikkeneminen hyväksyttävää — mutta dokumentoi syy PR-kuvaukseen.
5. **Ohjeelliset tarkistukset** (`continue-on-error: true`) ovat tiedoksi — ne eivät estä
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

## Rationalisointijono (ROI-arvio — vaihe 9, aalto 3)

Tämä luettelo täsmäytettiin tiedostoon `ci.yml` 2026-06-17 (aiemmasta versiosta puuttuivat
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Täsmäytetyn joukon ROI-arviossa
tunnistettiin seuraavat rationalisointiehdokkaat. **Yhdistämiset ovat mekaanisia CI-muutoksia; vaihtamiset ja poistot ovat operaattorille varattuja käytäntöp päätöksiä.** Mitään alla mainittua ei ole vielä otettu käyttöön.

**Myös edellä dokumentoimatta jääneet** (neuvovia, heikon signaalin): `docs-lint`-työ
(markdownlint + Vale, koko työ `continue-on-error`) sekä erilliset skannerien työnkulut
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` on
tiedostossa `quality-baseline.json`, mutta sitä ei ole kytketty estävään ratchetiin tiedostossa `ci.yml` — mittari on tällä hetkellä irrallinen.

### Yhdistäminen / deduplikointi (mekaaninen, pienempi riski)

Jokainen ehdokas validoitiin aktiivista gate-tilaa vasten 2026-06-17 (luota mutta varmista);
useiden ”ilmeisten” yhdistämisten taustalta paljastui velkaa, eivätkä ne ole **suoraan käyttöön otettavia**.

- **`check:docs-sync` suoritetaan kahdesti** — itsenäisesti `lint`-työssä ja uudelleen `check:docs-all`-työn sisällä (`docs-sync-strict`) sekä huskyn pre-commit-hookissa. ✅ **VALMIS** — itsenäinen `lint`-kutsu poistettu.
- **CVE-skannaus** — ❌ **EI suoraan yhdistettävissä.** `audit:deps` estää kriittiset huomautukset ja puutteelliset auditoinnit kaikissa viidessä lock-tiedostossa, kun taas korkeat huomautukset raportoidaan varoituksina nykyisen käytännön mukaisesti; `check:vuln-ratchet` (osv) epäonnistuu vain tarkistettuun baselineen nähden tapahtuvasta _regressiosta_ ja hylkää puuttuvat mittaukset, kun niitä vaaditaan. Semantiikat ovat erilaiset — `audit:deps`-tarkistuksen poistaminen hävittäisi absoluuttisen kriittisten ongelmien eston ja erilliset pakettiauditointien tositteet. Pidä molemmat.
- **Syklien tunnistus** — ✅ **VALMIS** (#15159 G-01/G-02). Vanha teksti kutsui `check:cycles`-tarkistusta ”vihreäksi, kuratoiduksi” gateksi ja perusteli sen estävänä pitämistä, koska `check:circular-deps` (dpdm) raportoi 91 sykliä. Tuo vihreä oli **virheellinen vihreä**: `check:cycles` skannasi 5 alihakemistoa (450 tiedostoa), täsmäsi vain staattisiin `import|export … from` -lausekkeisiin ja ohitti kaikki `@/`- ja `@omniroute/open-sse/`-spesifioijat, joten se ei voinut havaita repositorion dynaamisia tuonti- ja alias-syklejä. Korjattu: gate käy nyt läpi `src`- ja `open-sse`-hakemistot (5023 tiedostoa), kerää spesifioijat TypeScript- AST:stä (joten `import("…")` lasketaan mukaan, mutta tyyppisijainnin `typeof import("…")` ei) ja ratkaisee tsconfigin `paths`-määritykset. Se löytää **14** sykliä, ei nollaa. Koska 14 ennestään olevaa sykliä ei voida korjata gate-PR:ssä, `check:cycles` on nyt **ratchet** (`--ratchet`, raja `metrics.cycles.value = 14` tiedostossa `quality-baseline.json`, `direction: down`) — se estää kaikki _regressiot_, ja määrä voi vain pienentyä. CI suorittaa komennon `npm run check:cycles:ratchet`. Alasajo etenee yhdessä **A-01**:n kanssa. `check:circular-deps` (dpdm) säilyy neuvoa-antavana laajempana toisena mielipiteenä.
- **Monimutkaisuus** — ✅ **VALMIS** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): yksi ESLint-kierros, laskenta `ruleId`-tunnisteen mukaan, jotta syklomaattiset ja enimmäisrivimäärän sekä kognitiivisen monimutkaisuuden baselinet säilyvät itsenäisinä; yksittäiset `check:complexity`- ja `check:cognitive-complexity`-tarkistukset säilyvät paikallista `--update`-ajoa varten.
- **`/api`-hallusinaation esto** — ✅ **VALMIS** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): yksi FS-inventaario hakemistosta `src/app/api`, openapi-reitit ja docs-symbolit raportoivat edelleen itsenäisesti; yksittäiset tarkistukset säilyvät paikallisia ajoja varten.
- **`check:node-runtime` suoritetaan 11 työssä** — ⚠️ **heikko ROI.** Jokainen suoritetaan erillisessä runnerissa ja tarkistus kestää alle sekunnin; kokonaissäästö on noin 10 sekuntia, mutta samalla menetettäisiin halpa työkohtainen suojaus. Muutoksen aiheuttama työ ei ole sen arvoista.
- **`typecheck:noimplicit:core` CI:n lintissä** — ✅ **poistettu lint-työstä** (oli neuvoa-antava `continue-on-error`); estävä tyyppipinta on `typecheck:core` + `check:type-coverage`. Paikallinen skripti säilytetään.

### Vaihda / päätä (operaattorin käytäntö)

- `check:openapi-security-tiers` (neuvoa-antava) — ❌ **ei voida vaihtaa suoraan estäväksi.** Se päättyy koodilla 0, mutta varoittaa, että useilta `traffic-inspector`-reiteiltä `LOCAL_ONLY_API_PREFIXES`-joukossa puuttuu `x-loopback-only: true` -annotaatio. Käytännön valvominen edellyttää, että kyseiset annotaatiot lisätään ensin tiedostoon `openapi.yaml`.
- `typecheck:noimplicit:core` (neuvoa-antava) — estävä `check:type-coverage`-ratchet kattaa sen suurelta osin. Muuta se ratche-tarkistukseksi tai poista ylimääräinen toinen `tsc`-ajo.
- `test:vitest:ui` (nyt **estävä**) — ennestään olevat virheet on nimenomaisesti rajattu pois tiedostossa `vitest.config.ts` kommenteilla `// #8618`, joissa seuranta on merkitty; uudet virheet kaatavat työn.
- `check:secrets` (gitleaks, estävä ratchet jäädytettynä kolmeen dokumentoituun väärään positiiviseen) — salli nämä kolme, jotta määrä saadaan nollaan, tai muuta tarkistus neuvoa-antavaksi. Päällekkäinen GitHubin natiivin secrets-skannauksen ja `check:public-creds`-tarkistuksen kanssa.
- `check:pr-evidence` (estävä, haravoi PR-tekstin proosaa) — suuri väärien positiivisten riski; sen poistaminen heikentäisi Hard Rule #18:n valvontaa, joten kyseessä on aidosti käytäntöä koskeva päätös.
- `semgrep` (itsenäinen, neuvoa-antava) — päällekkäinen CodeQL:n kanssa OWASP-perheiden osalta; kytke sen baseline ratchetiin tai poista se.

## Aiheeseen liittyvä dokumentaatio

- Toimitusketju (alkuperä, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — avainjoukon vastaavuusportti

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, työ `i18n-ui-coverage`).
Vertaa kaikkien `src/i18n/messages/<locale>.json`-tiedostojen lehtiavainten joukkoa tiedostoon
`en.json` ja epäonnistuu, jos yksikin lehti puuttuu tai ylimääräinen lehti löytyy riippumatta siitä,
milloin avain lisättiin. `__MISSING__:`-paikanvaraajat lasketaan olemassa oleviksi (niiden sisältö
kuuluu suhdeportin vastuulle). Se on diff-pohjaisten/prosenttipohjaisten porttien ehdoton
vastakohta: `check-ui-keys-coverage` valvoo 80 %:n vähimmäistasoa kieltä kohden (43 puuttuvaa
avainta noin 13 000:sta tarkoittaa edelleen 99,7 %:n kattavuutta), ja `check-new-key-coverage`
arvioi vain avaimet, jotka PR lisää tiedostoon `en.json`. Lokeraattierä luodaan sen päivän
`en.json`-tiedostosta, jolloin haara luodaan, ja käännöksiä tehdään päivien ajan samalla kun
pohjaan lisätään uusia avaimia; erän PR ei itse lisää avaimia, joten kumpikaan sisarporteista ei
reagoinut, kun erä 1 (#13044) saapui yhdeksään lokeroon 43 avainta lyhyenä ja erä 2 (#13660)
kahdeksaan lokeroon 10 avainta lyhyenä (2026-09-15). Korjaa punaisena näkyvä tarkistus komennolla
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra`-lehti tarkoittaa,
että lähdekoodista se on poistettu — `sync-ui-keys` poistaa sen (`--prune-extra`, oletusarvo).
`--warn` raportoi ilman epäonnistumista.
`--catalog=cli` suorittaa saman vertailun hakemistossa `bin/cli/locales` (`npm run i18n:check-keys:cli`);
molemmat vaiheet ovat työssä `i18n-ui-coverage`. Absoluuttinen tarkistus suoritetaan vain
julkaisutilassa: ominaisuus-PR näkee ilmoituksen `SKIP reason=pr-mode`, ja korjaus suoritetaan
julkaisun päivityksessä tai käännösaallossa, ei koskaan ominaisuus-PR:ssä; PR, joka muuttaa
lokeraattikatalogeja, arvioidaan sen sijaan merge-kantaa vasten (katso työn
`i18n-ui-coverage` kohdasta ”Kaksi tilaa”).

#### `check-new-key-coverage` — uusien avainten i18n-portti

`check-ui-value-drift`-portin sisar. Se havaitsee englanninkielisen arvon, joka **kirjoitettiin
uudelleen**, vaikka sen käännökset jätettiin ennalleen; tämä havaitsee englanninkielisen avaimen,
joka **lisättiin**, vaikka jotkin lokaatit eivät koskaan saaneet sitä.

`check-ui-keys-coverage` ei näe tätä tapausta: se valvoo kielikohtaista prosentuaalista
vähimmäistasoa, ja yksitoista puuttuvaa avainta noin 13 000 lehtiavaimesta pitää kattavuuden
99,9 prosentissa. Kielikohtainen prosentti ei pysty ilmaisemaan, että ”tämä ominaisuus julkaistiin
kääntämättömänä” — kokonainen ominaisuus voi saapua uuteen lokaaliin ilman tekstiä, eikä luku
koskaan muutu.

Sen koodaama tapaus: Orchestration Canvasin vaiheen 3 yksitoista avainta käännettiin tuolloin
olemassa olleisiin 42 lokaliin. Tunteja myöhemmin EU-kielten erä (#13044) kasvatti repositorion
51 lokaaliin, eivätkä yhdeksän uutta (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) koskaan
saaneet näitä avaimia. `deepMergeFallback` korvaa puuttuvan avaimen englanninkielisellä, joten
virhetilanteena oli tyhjän käyttöliittymän sijaan kääntämätön käyttöliittymä — todellinen ja
rakenteensa vuoksi hiljainen.

Sisarporttinsa tavoin tämä on **diff-tietoinen**: se vertaa englanninkielistä sisältöä
merge-kannassa työpuuhun, joten ennestään olemassa olevat puutteet jäädytetään eikä portin
käyttöönotto vaatinut migraatiota.

**`__MISSING__:<english>`-merkintä ei täytä sitä (17.9.2026 alkaen).** Aiemmin se oli
dokumentoitu lykkäys — ajonaikainen toiminta palautuu oikeaan englanninkieliseen tekstiin —
kunnes kahdeksan ominaisuus-PR:ää 16.9.2026 lisäsi 61 avainta ja sijoitti merkinnän kaikkiin
65 lokaaliin kääntämisen sijaan: tämä portti hyväksyi jokaisen, mikään ei estänyt PR:iä, ja
käännösten todellista osuutta valvova estävä suhdeportti epäonnistui sitten julkaisun
tilannevedoksessa kaikkien kohdalla (pt-BR 3,2 % > 2,5 % + 0,5). Merkintä arvioidaan nyt
puuttuvaksi käännökseksi. Vain julkaisutilassa 13.11.2026 alkaen: ominaisuus-PR näkee
`SKIP reason=pr-mode`, ja julkaisu-PR:ssä (`BASE_REF=origin/main`) portti arvioi kaikki avaimet,
jotka sykli lisäsi. Korjaa punaisena näkyvä tarkistus julkaisun päivityksessä tai käännösaallossa
komennolla `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
tai kaikki lokaatit rinnakkain komennolla `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, irrotetun tilan turvallinen, kieltäytyy käynnistymästä ilman
`OMNIROUTE_TRANSLATION_*`-ympäristöä). Avain, jonka on pysyttävä englanninkielisenä
(kiinnitetty tuote-/moottori-/lippunimi), kuuluu tiedostoon
`scripts/i18n/untranslatable-keys.json`, ei koskaan merkinnän taakse. `vi` kieltää merkinnät
kokonaan (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — pysäytettyjen testien portti

`vitest.config.ts`-tiedoston `exclude`-luettelossa oleva tiedosto on testi, jota ei suoriteta, ja
se näyttää kattavuudelta puun lukijalle. Kommentin
`// #8618 — pre-existing failure; remove this exclusion when fixed` taakse kertyi 62 tiedostoa.
Issue #8618 suljettiin 11.8.2026, vaikka sen seuraama luettelo kasvoi 45 merkinnästä 62:een,
ja jokainen uusi merkintä peri kommentin, joka viittasi vanhentuneeseen issueen. Kun luettelo
lopulta mitattiin tiedosto tiedostolta (#13204), **51 näistä 62:sta läpäisi nykyistä puuta vasten
ilman lähdekoodimuutosta**.

Portti edellyttää, että jokainen poissulku, joka viittaa todelliseen tiedostoon, (a) nimeää
seuranta-issuen ja (b) esiintyy tiedostossa `config/quality/vitest-exclusions.json` mitatun
tilansa kanssa, jotta sen lisääminen on tarkistettavissa oleva diff omassa tiedostossaan eikä
yksi rivi lisää 60 merkinnän taulukkoon. Se ei tarkoituksella suorita poissuljettuja testejä
uudelleen — siihen kuluu noin 10 minuuttia ja se kuuluu määräajoin suoritettavaan työhön;
luetteloon tallennetaan, milloin kukin testi viimeksi mitattiin.
