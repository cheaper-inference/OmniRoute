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

## Porttien inventaario ja toteutusprofiilit

### Ehdokas pääsy

Kumpikin CI ja Quality Gates -työnkulku antaa vakaan tuloksen: `Gate / CI` ja `Gate / Quality`. Heidän versioidussaan sisäänpääsykäytännössä luetellaan kaikki alkupään työt tarpeen tai neuvoa-antavan mukaan. Soveltuvan vaaditun työn on onnistuttava: puuttuvat, peruutetut, ohitetut, odottavat ja tuntemattomat tulokset eivät voi määrittää PASS. Kelvollinen vain asiakirjoja tai luetteloita koskeva luokitus voi tehdä koodikaistan käyttökelvottomaksi. luonnos PR ei ole hyväksytty ehdokas. `hotfix` -merkintä ei luovu todisteista.

Molemmat työnkulut kattavat PRs main/release -haaroihin, työnnät `main` hen, manuaaliset lähetykset ja yhdistämisryhmätapahtumat. Push, lähetä ja yhdistä ryhmä suorittaa koko valikoiman. Työnnät `release/**` hen eivät käynnistä niitä (18.10.2026): jokainen muutos suoritti jo matriisin PR ssä ja yhdistetty yhdistelmä on Release-Greenin työ (`docs/ops/RUNNER_BOX.md` → Hosted lane). Haarukat ja yhdistämisryhmät käyttävät isännöityjä juoksijoita töihin, jotka muutoin valitsevat itseisännöidyt juoksijat; riittävä isännöity kapasiteetti on varmistettava ennen käyttöönottoa.

Tavallinen PR suorittaa nopean valinnan. Pääsykäytännön `full-code` ja `full-code-e2e` kaistat (E2E, integraatio, pakettiartefaktti, Electron smoke, Bun SQLite, ekosysteemi- ja protokollaasiakkaat) toimivat vain Mergify-jonon luonnoksessa tai täydessä ajossa: `gh workflow run ci.yml --ref <branch>`.

Jokainen JSON -kuitti tunnistaa uloskirjatun SHA, työnkulun suorituksen ja yrityksen. CLI hylkää checkout/event SHA -epäsopivuuden. Työnkulkutestit sitovat käytäntöjäsenyyden tuomiotyön `needs` luetteloon, joten uusi tai poistettu kaista ei voi kadota hiljaa. Kuitit kattavat heidän oman työnkulkunsa, eivät julkaisua, käyttöönottoa tai olemassa olevan neuvontaskannerin sisäisiä osia. Molempien tarkistusnimien aktivointi haarasäännöissä on erillinen hallinnollinen muutos; näiden töiden lisääminen ei sinänsä suojaa haaraa.

### Yhdistä jono

> **2026-11-19: Mergify-yhdistämisjono on poistettu käytöstä** (omistajan päätös). `.mergify.yml` ei enää määritä jonoa ja hylkää Mergify-komennot, jotka yhdistävät tai kirjoittavat uudelleen vetopyynnön. Julkaisuhaaran vetopyynnöt yhdistetään manuaalisesti arkiston sääntöjoukon "Require green gates on the active release" (`Gate / CI` + `Gate / Quality`) alla, kunnes omni-queue toimii live-tilassa ja sen jälkeen omni-queue kautta ([OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)). Alla kuvattu Mergify luonnosten työnkulku on edelleen `ci.yml` ja `quality.yml` muodossa, mutta Mergify-luonnoksia ei enää avata.

`queue` -tunniste lähettää PR n yhdistämisjonoon (`.mergify.yml`). Mergify avaa PR -luonnoksen `mergify/merge-queue/` -haarassa, CI suorittaa siellä täyden valikoiman ja alkuperäinen PR sulautuu, kun `Gate / CI`, `Gate / Quality` ja `Merge integrity (changelog + generated skills)` kulkevat.

Mergify kirjoittaa jonon yhteenvedon luonnoksen kuvaukseen, ja myös muut sovellukset voivat muokata sitä. Tällaisen luonnoksen `pull_request` `edited` -tapahtuma ottaa oman samanaikaisuusryhmänsä (`-queue-edit-<run_id>`), joten se ei voi peruuttaa luonnoksen todellista ajoa ja se ohittaa portin ja matriisin. Vain `Merge integrity` toimii edelleen. Ohitetulla porttityöllä on eri tarkistusnimi, koska Mergify lukee ohitetun `Gate / CI` epäonnistuneena tarkistuksena ja poistaa PR n jonosta.

Jonon poistamisen jälkeen push ei aina lisää PR uudelleen jonoon. Kommentoi `@mergifyio queue` sitä.

### Säilytetty todisteet hyväksymisvähentimessä

`scripts/quality/validate-release-acceptance.mjs` vähentää toimitettua suunnitelmaa ja sen manifesteja; se ei osoita, että suunnitelma kattaisi koko päästöputken. Sen raporteissa on nimenomaisesti asetettu `releaseAcceptance: false`, vaikka suunnitelma olisi `VERIFIED`. `release-acceptance.yml` -työnkulku käyttää edelleen varjolaitteita, ei todellisia koonti-, paketti-, käynnistys- tai promootiokuittauksia.

CLI edellyttää, että `--evidence-root` tarkistaa säilytetyt todisteet. Tiedostot ratkaistaan muodossa `<evidence-root>/<artifact_id>/<member>` ja tiivistetään muodossa SHA-256. PASS -tietue ilman todisteita, puuttuva tai muutettu tiedosto, vaarallinen polku tai symbolilinkki estää vahvistamisen. Puuttuvat tiedostot eivät vastaa tyhjiä onnistuneita lokeja. Nykyiset SHA/run/attempt tarkistukset pysyvät itsenäisinä: vastaavat tavut eivät voi pelastaa vanhentunutta kuittia. Tiedoston eheys ei ole todiste suorituksen aitoudesta tai artefaktien mainostamisesta.

### Staattinen skannausinventaari

Versioitu npm-alias-inventaari ja staattisen skannauksen jäsenyys ovat `config/quality/gate-manifest.json`. Suorita `npm run check:gate-manifest` tarkistaaksesi skriptien nimet ja tarkat komennot `package.json` vastaan; lisäykset, poistot ja komentojen siirtyminen epäonnistuvat sekä paikallisessa koukussa että muutoksen luokittelussa CI ssä. Alias ei ole työnkulkutyö, matriisi-ilmentymä tai testitapaus: näitä lukuja ei saa esittää keskenään vaihdettavissa olevina.

Käytä `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list` komentoa tarkistaaksesi valitut aliakset suorittamatta niitä. Runner kutsuu npm-alkupisteen, joten sen ajonaika (mukaan lukien Bun jos se on määritetty) säilyy. Luettelotietueet kirjaavat näiden profiilien ulkopuoliset aliakset erikseen kutsutuina, ja ylläpitokomennot ovat kiellettyjä vain luku -tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen skannauksen. Ne eivät sertifioi tuotetestejä, kattavuutta, pakkaamista, ulkoisia tarkastuksia tai ehdokkaan täydellistä julkaisun hyväksyntää. Työnkulun sisäänpääsy käyttää linkitettyjä `config/quality/admission-policy.json` ja `scripts/quality/admission-verdict.mjs`. Release-tarkkailijaprofiilit pysyvät erillisinä; tarkastaa sovellettavat sekit ja kuitit itsenäisesti. Täydelliset tarkkailijan staattiset komennot ilmoitetaan `config/quality/release-green-static-profile.json` ssä, mukaan lukien `audit:deps`, mutaatiotestin valinta ja translaatiotarkistukset. Latausohjelma vahvistaa npm-komennot package.json ja mallinnettujen CI/Quality -määrityksiä vastaan; se hylkää driftin sen sijaan, että suorittaisi komentotulkkimerkkejä argumentteina. Vaadittu skannerin SKIP/INCOMPLETE -lähtö ei voi muodostaa PASS. Profiili tallentaa ulkoiset poissulkemisensa, eikä se korvaa isännöityä kattavuutta, testimatriiseja, paketti- tai käyttöönottotodisteita. Alla oleva proosaluettelo on viite, ei todiste siitä, että portti todella juoksi.

Käsikirjoitukset elävät `scripts/check/` (policy Gates) ja `scripts/quality/` (racket engine) alla. CI totuuden lähde on `.github/workflows/ci.yml`.

### Vapauta PR pikapolku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI:tä main/release-PR:issä, työnnöissä haaraan `main`,
dispatch- ja merge group -tapahtumissa. PR:t käyttävät polkusuodatettuja nopeita tarkistuksia.
Pysyvästi käytöstä poistettu päällekkäinen koonti poistettiin; todelliset koonti-, paketointi- ja
käynnistystarkistukset pysyvät CI:ssä. Yksikkötestisarja ja vitest suoritetaan vain CI:ssä
(`Unit Tests (N/8)` ja `Vitest`).

| Job                                              | Laajuus                                                                                                                                            | Estäminen                     |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ja docs-all                                                                                                           | Kyllä                         |
| `Fast Quality Gates`                             | Koodi PRs; staattiset tarkastukset, tyyppitarkistus, kojelaudan tyyppitarkistus, vaikuttaneiden yksiköiden testit, unohdettu sisarustesti (neuvoa) |
| `No new ESLint warnings`                         | Koodi PRs; vaimennustietoinen nukkasuoja                                                                                                           | Kyllä, mukaan lukien haarukat |
| `Merge integrity (changelog + generated skills)` | Ei-luonnos PRs; muutosloki ja luotu taitojen synkronointi                                                                                          | Kyllä, mukaan lukien haarukat |

#### Unohtunut sisarusten testiraportti

`npm run check:forgotten-sibling-tests` toimii `Fast Quality Gates` :n neuvoa-antavana vaiheena ja käyttää uudelleen tuontiselvitystä testi-vaikutuskartan takana. Jokaisen muuttuneen tuotantomoduulin kohdalla se raportoi deterministiset `changed module/symbol -> static consumer -> candidate sibling test` ketjut, kun ehdokastesti puuttuu pull-request diff:stä. Markdown-yhteenveto ja JSON -tulos säilytetään `forgotten-sibling-tests` -työnkulun artefaktina kalibrointia varten ennen estävien käyttöönottoa.

Tynnyrijälleenvienti ja dynaaminen tuonti ovat vain resoluutiodiagnostiikkaa; ne eivät koskaan luo estävää löytöä. Arvostellut poikkeukset elävät paikassa `config/quality/forgotten-sibling-allowlist.json`. Jokaisessa merkinnässä on nimettävä kuluttaja- ja ehdokastesti, annettava erityinen perustelu ja linkitettävä GitHub ongelma tai vetopyyntö. Väärin muotoiltujen merkintöjen sulkeminen epäonnistuu. Poikkeukset eivät voi estää poistettua ehdokastestiä tai erotusta, joka lisää `.skip`/`.todo`; väitteen heikennys ja muu peitto jäävät itsenäisesti estävän `check:test-masking` portin omistukseen.

### Työ: `lint`

Toimii jokaisessa PR - `main`. Lohkot sulautuvat epäonnistuessa.

| Käsikirjoitus (`npm run ...`)     | Vahvistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Estäminen                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js-versio kuuluu tuettuun alueeseen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                       |
| `check:cycles`                    | Kaikki `src/` + `open-sse/` -hakemistojen väliset sykliset tuonnit (AST-pohjainen, tsconfigin `paths`-määritykset ratkaistu). Pelkkä suoritus palauttaa aina arvon 1, kun syklejä on olemassa (epäonnistuu suljetusti julkaisun #15281 jälkeen), ja luettelee SCC:t. `check:cycles:ratchet` (CI:n käyttämä) estää suorituksen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.cycles`-ylärajan — tällä hetkellä 14, `direction: down`, joten se voi vain pienentyä (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä (ratchet)                             |
| `check:boundary`                  | `open-sse → src` -kytkentä: yksilölliset tiedostosta tiedostoon tapahtuvat tuonnit moottorista sovellukseen (`scripts/quality/measure-boundary.mjs`; reunaluettelo on v4-ytimen/moduulijaon korjausvelkalista). Pelkkä suoritus tuottaa ohjeellisen raportin (sama kuin `quality:boundary`). `check:boundary:ratchet` (CI:n käyttämä, myös `quality.yml`-tiedoston fast-gates-ratchet-silmukassa) estää suorituksen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.boundaryOpenSseToSrc`-ylärajan — alustettu mitattuun arvoon 771, `direction: down`; `--update` vain pienentää sitä; PR:issä pohjaan suhteutettu (`--base-ref`, katso alta)                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä (ratchet)                             |
| `check:route-validation:t06`      | Zod-skeemat ovat käytössä kaikilla reiteillä (tason 6 käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` -määrä ei ylitä budjettia (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `check:provider-consistency`      | Jokaisella `providers.ts`-tiedoston palveluntarjoajalla on vastaava merkintä `providerRegistry.ts`-tiedostossa (ja päinvastoin sallittujen luettelon puitteissa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `check:model-lifecycle`           | Kolme manuaalisesti ylläpidettävää reititystaulukkoa pysyvät yhdenmukaisina versionhallintaan kirjatun elinkaarivedoksen (#11503) kanssa: `FITNESS_TABLE` (`taskFitness.ts`) ei pisteytä käytöstä poistettua tunnistetta, jonka `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES`-kohde on `REGISTRY`-rekisterissä eikä käytöstä poistettujen tunnisteiden vedoksessa; jokainen `REGISTRY`-rekisterissä edelleen oleva käytöstä poistettu tunniste välitetään eteenpäin tai on lueteltu kohteessa `allowedRetiredInCatalog`; eikä yksikään `DEFAULT_DEGRADATION_MAP`-lähde tai -kohde esiinny käytöstä poistettuna kyseisessä vedoksessa. Tämä ei todista, että jokin malli olisi tällä hetkellä aktiivisen upstream-palvelun käytettävissä. Offline-tilassa — vertaa tiedostoon `config/quality/model-lifecycle.json`, joka päivitetään manuaalisesti komennolla `npm run quality:refresh-model-lifecycle` (verkko; ei ole kytketty CI:hin). `allowedRetiredInCatalog` on käytöstäpoiston vähentämiseen tarkoitettu asteittainen rajoitin: lisää merkintä vain seurantatehtävän yhteydessä. | Kyllä                                       |
| `check:fetch-targets`             | Jokainen asiakaspuolen `src/`-hakemistossa oleva `fetch("/api/...")` ratkaisee todellisen `route.ts`-tiedoston                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:deps`                      | Kaikki repositorion jokaisessa `package.json`-tiedostossa olevat `npm install` -asennettavat riippuvuudet ovat tiedostossa `dependency-allowlist.json`; uudet lukitsemattomat tai slopsquatting-paketit merkitään                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `audit:deps`                      | Kaikkien viiden erillisen lukitustiedoston `npm audit` (juuri, Electron, OpenCode-laajennukset v1/v2 ja palveluntarjoaja). Kriittiset ilmoitukset estävät etenemisen; korkean vakavuuden ilmoitukset jäävät näkyviksi varoituksiksi. Puuttuvat tai epäonnistuneet auditoinnit ovat PUUTTEELLISIA ja estävät etenemisen; laajuuskohtaiset lukitustiedostojen tiivisteet ja raportit säilytetään.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                       |
| `check:lockfile`                  | `package-lock.json` -eheys — https-rekisteri, eheystiivisteet, ei isäntäohituksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `check:licenses`                  | SPDX-lisenssien sallittujen luettelo tuotantoriippuvuuksille                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                       |
| `check:tracked-artifacts`         | Ei koontiversion artefakteja / commitoituja `node_modules`-symbolisia linkkejä (suoritetaan myös husky pre-commit -vaiheessa; pre-push on tarkoituksella kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Kyllä                                       |
| `check:ai-attribution`            | Ei tekoälyn/botin `Co-Authored-By`-loppumerkintää tai tekoälyn tuottamaa alatunnistetta PR-commiteissa, otsikossa tai leipätekstissä — Kova sääntö #16 (`quality.yml`-tiedoston fast-gates-silmukassa PR→`release/**`-kohteille — lukee tapahtumahyötykuorman, ei tee mitään PR:ien ulkopuolella — sekä vain PR:ille tarkoitetussa vaiheessa `ci.yml`-lintissä PR→`main`-kohteille; lisäksi huskyn `commit-msg`-koukku; ihmiskanssakirjoittajat sallitaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | Jokainen Vitest-poissulkeminen nimeää seurantatehtävän ja esiintyy tiedostossa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                       |
| `check:file-size`                 | Lähdetiedostojen (`.ts`/`.tsx` hakemistoissa `src/`, `open-sse/`, `electron/`, `bin/`) on pysyttävä `cap`-rajan sisällä ja testitiedostojen (`*.test.ts(x)`) `testCap`-rajan sisällä; tiedostot, jotka on jäädytetty tiedostossa `file-size-baseline.json` (`frozen` / `testFrozen`), eivät saa kasvaa tallennettua kokoa suuremmiksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `check:error-helper`              | Virhevastauksissa suorittimissa/käsittelijöissä käytetään `buildErrorBody()` / `sanitizeErrorMessage()` -funktioita (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `check:migration-numbering`       | Siirtotiedostojen nimet: vanha `001`–`241` -sarja on jäädytetty ja uudet tiedostot ovat `YYYYMMDDHHMMSS_<description>.sql`. PR -pohjaa vastaan se hylkää poistetun siirron, uudelleennimetyn siirron ilman yhteensopivuusmerkintää ja epäjärjestyksessä tai muokatun, jonka lopullinen skeema ei siirry.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:public-creds`              | Kirjaimellisia OAuth:n `client_id`-/`client_secret`-arvoja tai Firebase Web -avaimia ei ole `publicCreds.ts`-tiedoston ulkopuolella (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `check:db-rules`                  | Raakaa SQL:ää ei ole `src/lib/db/`-moduulien ulkopuolella; `localDb.ts`-tiedostosta ei tehdä koontituonteja (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:known-symbols`             | Lähetyksen taulukoihin rekisteröidyt palveluntarjoajien suorittimet, reititysstrategiat ja kääntäjät vastaavat levyllä olevia tiedostoja — irrallisia tai määrittelemättömiä symboleja ei ole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:route-guard-membership`    | Jokainen aliprosessin käynnistävä reitti luokitellaan `isLocalOnlyPath()`-funktion avulla (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:test-discovery`            | Jokainen repositorion `*.test.ts`- tai `*.spec.ts`-tiedosto kerätään vähintään yhdellä testiajorilla (kiristyssääntö: `test-discovery-baseline.json`-tiedostossa oleva orpojen tiedostojen luettelo voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                       |
| `check:test-tla-order`            | Yksikään `tests/unit`-hakemiston `node:test`-tiedosto ei rekisteröi testiä, suorita ylimmän tason `await`-kutsua ja rekisteröi sen jälkeen lisää testejä (#18045; kiristyssääntö: `test-tla-order-allowlist.json`-tiedosto voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:agent-skills-sync`         | Luodut agenttitaitojen artefaktit vastaavat niiden lähdeluetteloa (ei ajautumista). Vapautustila tarkistaa jokaisen taidon; ominaisuus PR (`pr` -tila) tarkistaa vain ne taidot, joiden luomaa tekstiä se muokkaa — Katso [Luodut tiedostot ja johdetut perusviivat](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Palveluntarjoajien logoilla/resursseilla on tallennettu alkuperätietomerkintä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON-määritystiedostot jäsentyvät ja täyttävät repositorion lint-säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript-käännös ilman virheitä (vain ohjeellisia varoituksia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — ennakoiva tarkistus; monet aiemmin olemassa olevat kutsukohdat tarvitsevat vielä tyyppimääritykset                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Ohjeellinen** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, jonka laajuus on rajattu kohteeseen `src/app/(dashboard)/**` (#7033) — `typecheck:core`-tarkistuksen kuratoitu 27 tiedoston sallittujen tiedostojen luettelo ei sisällä yhtäkään dashboardin TSX-tiedostoa, eikä `next build` tarkista niiden tyyppejä lainkaan (`next.config.mjs` määrittää asetuksen `ignoreBuildErrors: true`), joten irrallisten tunnisteiden regressiot siellä (#6625/#6909) jäivät CI:ssä huomaamatta. Vertaa tuloksia jäädytettyyn tiedosto-/TS-koodikohtaiseen lukumääräperustaan (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentuneen tilan valvontamalli kuin `check:known-symbols`) — vain perustason ylittävät UUDET virheet epäonnistavat tarkistuksen; vähennä perustasoa komennolla `--update`, kun aiemmin olemassa oleva virhe korjataan.                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `check:build-typecheck`           | Koko sovelluksen tuotannon tyyppitarkistus `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), pinnan `typecheck:core`:n 27 tiedoston sallittujen luettelon ja kojelaudan portti ei kata. Erot `config/quality/build-typecheck-baseline.json` tä vastaan; uusi tai korotettu (tiedosto, koodi) -määrä epäonnistuu, pienempi määrä pyytää sinua räikkäämään. `--update` kieltäytyy, kun ajo sisältää uuden tai korotetun parin, ellei `--force-regressions` ole hyväksytty, ja hylkää hiljattain hiljennetyn tiedoston, ellei `--force-nocheck` ole hyväksytty, joten perusviivan laajentaminen vihreäksi ja pysyvän hiljaisuuden myöntäminen ovat kaksi erillistä tarkoituksellista tekoa. Paljas `--force` hylätään. Tarkistaa myös `@ts-nocheck` :n koontilaajuuden `config/quality/ts-nocheck-baseline.json` vastaan, koska sitä käyttävä tiedosto ei raportoi lainkaan diagnostiikkaa ja olisi muuten näkymätön jokaiselle portille.                                                                                                              | Kyllä                                       |

#### Kaksi tyyppitarkistusohjelmaa vastaavat eri tavalla

`typecheck:core` ja `check:build-typecheck` kääntävät eri ohjelmia eri vaihtoehdoilla, ja sama tiedosto voi olla toisessa puhdas ja toisessa täynnä virheitä.

`tsconfig.build.json` asettaa `"strict": false`, joten `noImplicitAny` on pois päältä. Ydinkokoonpano kokoaa kuratoidun 27 tiedoston sallittuluettelon, jossa on tiukemmat vaihtoehdot, ja seuraa kunkin merkinnän tuontikaaviota, joten tiedostot, jotka eivät koskaan näy koontiohjelmassa, tarkistetaan edelleen siellä.

Seurauksella on merkitystä arvioitaessa, onko tiedosto kirjoitettu:** nolladiagnostiikka `check:build-typecheck` n alla ei tarkoita nollaa** . `@ts-nocheck` poistaminen 26 tiedostosta osoitti, että 23 niistä oli puhtaita rakennusohjelmassa; kuusitoista niistä toi esiin noin 120 implisiittistä virhettä tiukassa virheessä. Tarkista molemmat ennen kuin kutsut tiedoston puhtaiksi.

### Työ: `quality-gate`

Juokse `test-coverage` jälkeen. Lohkot sulautuvat epäonnistuessa.

| Käsikirjoitus                | Vahvistaa                                                                                                                                                                     | Estäminen                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Lähettää `quality-metrics.json` (ESLint varoitusten määrä, kattavuus yhdistetystä sirpaleraportista)                                                                          | Kyllä (räikkä ylävirtaan) |
| `quality:ratchet`            | Jokainen `quality-baseline.json` :n mittari ei ole taantunut (ESLint -varoitukset ≤ -perusviiva; kattavuus ≥ perusviiva)                                                      | Kyllä                     |
| `check:duplication`          | Koodin kopiointi (jscpd@4) ei ylitä `quality-baseline.json` n perusviivaa                                                                                                     | Kyllä                     |
| `check:complexity`           | Tiedostotason syklomaattinen monimutkaisuus ei ylitä ylärajaa (ydin ESLint `complexity` + `max-lines-per-function`)                                                           | Kyllä                     |
| `check:cognitive-complexity` | Kognitiivinen monimutkaisuus räikkä (`eslint-plugin-sonarjs`) — erillinen ESLint pass; CI ajaa molemmat yhdistettynä yhdeksi `check:complexity-ratchets` -vaiheeksi           | Kyllä                     |
| `check:dead-code`            | Käyttämättömät viennit / tiedostot räikkä (knip) ei regressio verrattuna perusviivaan                                                                                         | Kyllä                     |
| `check:compression-budget`   | Puristusvertailubudjetti — moottorikohtaisesti merkkien säästöjen lattiat eivät saa heiketä                                                                                   | Kyllä                     |
| `check:type-coverage`        | Prosenttityyppinen räikkä (`type-coverage`) ei regressio; kattaa suurelta osin `typecheck:noimplicit:core`                                                                    | Kyllä                     |
| `check:codeql-ratchet`       | Avoimen CodeQL -hälytysten määrä ei regressio (lukee `gh api` kautta; siro ohitus ilman merkkiä) — päivityspoljinnopeus ja manuaalinen liipaisin: katso "CodeQL ratchet" alla | Kyllä                     |
| `check:type-scale-ratchet`   | Kitin tyypin asteikko: alle 12 px koot ja `font-bold` `src/` :ssä vain pienenevät (`typeScaleSubFloorSizes`, `typeScaleFontBold`); myös pre-commit-koukussa                   | Kyllä                     |

### Työ: `quality-extended`

Yhdistelmätyö ilman työkohtaisen tason `continue-on-error`-asetusta: `--ratchet`-valitsimen välittävä vaihe
epäonnistuttaa työn, jos mitattu tulos on heikentynyt verrattuna tiedostoon `quality-baseline.json`. Vain `check:circular-deps` ja skannerien
asennusvaihe ovat ohjeellisia (vaihekohtainen `continue-on-error: true`). Ulkoiset skannerit asennetaan
komennolla `gh release download`; `check:secrets` ohittaa itsensä (poistumiskoodi 0), jos gitleaks puuttuu, kun taas
`check:vuln-ratchet`, `check:workflows` ja `check:openapi-breaking` epäonnistuvat suljetusti, jos niiden
mittaustulos puuttuu.

| Käsikirjoitus            | Vahvistaa                                                                                                                                                                                                                         | Estäminen                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | Ei pyöreitä riippuvuuksia (dpdm)                                                                                                                                                                                                  | **neuvoa-antava**                         |
| `check:bundle-size`      | Nipun koko ei ylitä korkkia; myös mittaamaton koko epäonnistuu                                                                                                                                                                    | **Esto --ratchet:lla**                    |
| `check:secrets`          | Salainen skannaus (gitleaks) — ohittaa, jos binääri puuttuu                                                                                                                                                                       | **Esto --ratchet:lla**                    |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) do not regress — `--ratchet` fails as INCOMPLETE (exit 2) if unmeasured                                                                                                                  | **Esto --ratchet:lla**                    |
| `check:workflows`        | työnkulun nukka (actionlint + zizmor); missing/broken skannerit, virheelliset raportit tai puuttuva räikkäperusviiva epäonnistuvat kuin INCOMPLETE. Kelvolliset havainnot noudattavat valittua strict/advisory/ratchet -käytäntöä | Toteutus vaaditaan; zizmor-räikkä esto CI |
| `check:openapi-breaking` | Julkinen API sopimus kiinnitettyjen tapahtumien sitoumuksia vastaan (PR merge-base, push before, merge-group base; scheduled/manual checkout ensimmäinen vanhempi); vaadittu mittaus epäonnistuu suljettu                         | **Esto --ratchet:lla**                    |

### Työ: `docs-sync-strict`

Toimii jokaisessa PR - `main`. Lohkot sulautuvat epäonnistuessa.

| Käsikirjoitus                  | Vahvistaa                                                                                                                                                                              | Estäminen                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | Meta-portti, joka käyttää alla olevia 6 aliporttia peräkkäin                                                                                                                           | Kyllä                             |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI version johdonmukaisuus; vapauttaa myös 66 `llm.txt` -peilit ja käännetyt CHANGELOG -osat (PR -tila: peilit ovat samaa mieltä)                                     | Kyllä                             |
| ↳ `check:docs-counts`          | Laskut proosassa (tarjoajien määrä, siirtolaisuus jne.). Kaksi tilaa: `pr` ominaisuudessa PRs, `release` muualla — katso "Johdetut arvot" alla                                         | Kyllä                             |
| ↳ `check:env-doc-sync`         | Jokainen env var `.env.example` :ssa dokumentoidaan docs-taulukkoon ja päinvastoin                                                                                                     | Kyllä                             |
| ↳ `check:deprecated-versions`  | Asiakirjoissa ei ole vanhentuneiden versioiden merkkijonoja                                                                                                                            | Kyllä                             |
| ↳ `check:doc-links`            | Dokumenttien sisäiset merkintälinkit ratkaisevat oikeita tiedostoja (`[text]`/`(path)` -lomake)                                                                                        | Kyllä                             |
| ↳ `check:fabricated-docs`      | Docsissa mainitut reitit, env vars, CLI -komennot, koukkujen nimet ja tiedostopolut ovat olemassa koodikannassa. Kova portti `--strict` n kautta; pehmeä epäonnistuminen ilman lippua. | Kyllä ( `--strict` kautta CI:ssä) |
| `check:cli-i18n`               | CLI `t()` -näppäimet ovat olemassa `bin/cli/locales/en.json` :ssä (molemmat tilat); pt-BR / zh-CN / zh-TW pariteetti `en.json` kanssa vain vapautustilassa                             | Kyllä                             |
| `check:openapi-coverage`       | OpenAPI spec kattaa ainakin räikkäkerroksen todellisia reittejä                                                                                                                        | Kyllä                             |
| `check:openapi-security-tiers` | Suojaustason merkinnät `openapi.yaml` ssa ovat yhdenmukaisia `routeGuard.ts` -luokituksen kanssa                                                                                       | **neuvoa-antava**                 |
| `check:openapi-routes`         | Jokainen polku `openapi.yaml` päättyy todelliseen `route.ts` :hen (anti-hallusinaatioihin)                                                                                             | Kyllä                             |
| `check:docs-symbols`           | Jokainen `/api/...` -viittaus `docs/**/*.md` :ssä ratkaisee todellisen `route.ts` (anti-hallusinaatiot)                                                                                | Kyllä                             |
| `i18n translation drift`       | `docs/i18n/**` peilit vs `.i18n-state.json` — -neuvonta PRs ssä (käännösaalto virkistää peilit), tiukka työntössä ja öisin                                                             | **neuvoa-antava** PRs             |

#### Käännöspeilit ovat johdettuja tiedostoja (PR -tila vs. vapautustila)

Ominaisuus PR muokkaa vain englanninkielisiä lähteitä. `docs/i18n/<locale>/**` -peilit (mukaan lukien 66 `llm.txt` kopiota ja käännetyt `CHANGELOG.md` tiedostot) ja `.i18n-state.json` kirjoitetaan uudelleen yhdessä vaiheessa käännösaalto (`docs/i18n-*` / `chore/i18n-*` haarat, ajoitettu `i18n-mirror-refresh.yml`) ja julkaisu (`npm run release:sync-changelog-i18n`). Peiliportit toimivat siksi kahdessa tilassa, jotka ratkaistaan `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, sitten `OMNIROUTE_GATE_MODE`, sitten Actions -tapahtuma; paikallinen ajo on `release`):

- `check:docs-sync` — julkaisutila suorittaa kaikki tarkistukset. PR-tila säilyttää package.json/OpenAPI-version,
  juuren CHANGELOG-otsikot ja vanhentuneiden dokumenttien suojauksen sekä tulostaa
  `SKIP reason=pr-mode` kohteille `llm.txt`-peilikopiot ja käännetyt CHANGELOG-osat —
  paitsi jos PR kirjoittaa peilikopioita: haara, joka on määritetty `docs/i18n/**`-perheen kirjoittajaksi
  tiedostoissa `config/quality/derived-paths/*.json`, suorittaa molemmat tarkistukset tiukasti, ja kun
  diff-pohja voidaan ratkaista, muutos, jonka oma diff muokkaa tiedostoa `docs/i18n/<locale>/llm.txt`
  tai `CHANGELOG.md`, suorittaa kyseisen tarkistuksen tiukasti. Diff-pohjaa ei voida ratkaista syvyys-1-kloonauksessa
  (`docs-sync-strict`-työ), joten PR-tila suorittaa myös yhden tarkistuksen, joka ei tarvitse pohjaa:
  jokaisen `llm.txt`-peilikopion on oltava olemassa, säilytettävä `---`-erotin ja sisällettävä joko juuren runko
  tai runko, jonka useimmat peilikopiot jakavat. Siirtynyt pohja jättää kaikki peilikopiot yhtä lailla vanhentuneiksi
  ja tarkistus läpäistään; yhden peilikopion manuaalinen muokkaus aiheuttaa epäonnistumisen. Käännetyillä
  `CHANGELOG.md`-tiedostoilla ei ole tällaista tarkistusta syvyys-1-PR-kloonauksessa.

- Esikäsittelytoiminto suorittaa `check-docs-sync.mjs --mode=pr`: commit arvioidaan sen perusteella, mitä se tekee.
  Ilman lippua paikallinen suoritus on julkaisutila, ja yksi yhdistetty PR, joka muokkaa juuren `llm.txt`-tiedostoa,
  estäisi kaikki myöhemmät commitit kyseisessä pohjassa, kunnes päivitysaalto olisi suoritettu. Sama sääntö koskee
  kaikkia Husky-toiminnon suorittamia tilatietoisia tarkistuksia: toiminto välittää `--mode=pr`, ja tiukka tulos
  säilyy julkaisutilan suorituksissa (julkaisu-PR, työnnöt haaraan `main`, tavallinen paikallinen suoritus).
- Peilisisällön yksikkötestit (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — julkaisutila vahvistaa jokaisen kieli-asetuksen. PR tila vahvistaa vain ne peilit, jotka ovat ajan tasalla englanninkielisestä lähteestä `.i18n-state.json` mukaan (koko tiedoston tiiviste tai osion tallennetut osiot testinastat) ja ohittaa vanhentuneet perustelut. `target_hash` -alkuperätarkistukset suoritetaan jokaiselle maa-alueelle molemmissa tiloissa. Tuoreus on `## ` osuutta kohti, yksikkö `run-translation.mjs` tiivistää; pitkä osa (tämän tiedoston porttivarasto on noin puolet siitä) tarkoittaa, että kaikki siinä olevat muokkaukset jättävät peilit vanhentuneiksi ja niiden PR-tilan väitteet hyppäävät seuraavaan aaltoon. Ankkuri, jota englanninkielinen lähde ei enää sisällä, palaa koko tiedoston vertailuun.
- `i18n translation drift` — neuvoo PRs ssä, tiukka työntö-, yö- ja irrotusleikkauksessa, joten vanhentunutta peiliä ei voi toimittaa irrotuksessa.

`scripts/i18n/sync-llm-mirrors.mjs` (viedään myös muodossa `syncLlmMirrors()`, valitsimella `--dry-run`)
kirjoittaa `llm.txt`-peilikopiot uudelleen; julkaisun päivitys, käännösaalto ja ajastettu
`i18n-mirror-refresh.yml` suorittavat sen (päivitys tunnistaa vanhentuneet `llm.txt`-peilikopiot kuivalla
ajolla, koska drift-raportti ei luettele niitä, ja synkronoi ne ennen `check:docs-all`-tarkistusta).

Kaksitoista README-SVG:tä hakemistossa `docs/diagrams/` luodaan automaattisesti
(`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` luo ne kaikki uudelleen). Jokaisella
on tavuihin perustuva vertailuyksikkötesti (`tests/unit/docs/readme-*-svg.test.ts`, työ `test-unit`), joka
epäonnistuu, kun commit-oitu tiedosto on julkaisutilassa vanhentunut; PR:ssä
`check:generated-artifacts` arvioi PR:n muokkaamaa SVG:tä, ja pohjan drift jätetään julkaisun päivityksen
hoidettavaksi (katso [Luodut tiedostot ja julkaisun yhteydessä kirjoitettavat johdetut perustasot](#generated-files-and-derived-baselines-written-at-release)) — ja `check:docs-counts` lukee kanoniset luvut niiden
`<text>`-solmuista — minkä vuoksi ääriviivojen muodostusvaihe säilyttää jokaisen ääriviivaksi muunnetun
merkkijonon tiedostossa näkymättömänä `<text>`-elementtinä. SVG:n kanonisten lukujen tarkistus lukee
`SVG_DIAGRAM_FILES`-muuttujassa (`scripts/check/check-docs-counts-sync.mjs`) luetellut tiedostot:
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`,
`cli-terminal.svg`, `tier-cascade.svg` sekä `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`;
myös väitteet free-forever-, catalog-entry-, recurring-pool- ja scoring-factors-kohteista lukevat tiedostot
`promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. Näiden luontiohjelmien piirtämät luvut
(tarjoajien kokonaismäärä, MCP-työkalut, reititysstrategiat, free-forever-tarjoajat, …) tulevat faktatilannekuvasta
`docs/reference/derived-facts.json` ohjelman `scripts/docs/readmeFacts.mjs` kautta, eivät literaaleista, joten
kaavion luominen uudelleen millä tahansa haaralla tuottaa commit-oidun tiedoston uudelleen. `free-tier-budget.svg`
piirtää rivinsä samasta tilannekuvasta (`code.freeTierBudget`, faktaluotaimen tallentama katalogin yhteenveto),
joten muutos kohteessa `FREE_MODEL_BUDGETS` saavuttaa kortin seuraavan päivityksen yhteydessä sen sijaan, että
CI muuttuisi punaiseksi.

### Johdetut arvot: `pr` ja `release` -porttimoodit

Ominaisuus PR ei koskaan kirjoita arvoa, joka riippuu sen perustan tilasta: toimittaja, siirto, MCP-työkalu ja strategiamäärät, README SVG -luvut, tosiasioiden tilannekuva. Yksi vaihe laskee ne kaikki uudelleen, `npm run release:refresh-derived`, jotka suoritetaan julkaisun ja öisin derived-refresh PR avulla. Niin** julkaisujen välillä pohja on suunnittelultaan live-koodin takana** , ja portti tai testi, joka vertasi puuta live-koodiin, olisi punainen jokaisessa PR ssä, kun sisarus on lisännyt palveluntarjoajan. Portit, jotka arvioivat johdettuja arvoja, toimivat siten toisessa kahdesta moodista, jotka ratkaistaan `scripts/check/lib/gateMode.mjs` llä (ensimmäisen ottelun voitot):

1. `--mode=pr|release` komentorivillä;
2. `OMNIROUTE_GATE_MODE` -ympäristömuuttuja (`pr` tai `release`);
3. automaattinen, GitHub Actions -tapahtumasta: `pull_request`, jonka pää ei ole `release/v*`, a `merge_group` tai työntö `omni-queue/**` → `pr`; kaikki muu (push, aikataulu, lähetys, julkaisu PR `release/v* → main`, mikä tahansa paikallinen ajo) → `release`.

Mikä `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) epäonnistuu kussakin tilassa:

| tila      | Epäonnistui                                                                                                                                                                                                                                                                                                                                                                                                                          | Tarvitsee eläviä faktoja |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `release` | Jokainen tarkistus, tiukka tasa-arvo puusta kerättyjen tosiseikkojen suhteen (käyttäytyminen, jolla portilla aina oli): vanhentunut määrä, versio, peittokerros tai SVG luku on STRICT poikkeama                                                                                                                                                                                                                                     | Kyllä                    |
| `pr`      | Ainoastaan se, mitä muutos teki, erosi PR perustasta samoilla vaatimuksen poimijoilla: (1) hallittu arvo, jota ei ollut kyseisen shekin ja tiedoston pohjassa ("PR muokkasi hallittua numeroa — palauta rivi perustekstiin"); (2) vaadittu vaatimus, jonka kantaja kantaa ja pää kadonnut. Sisältöinvariantit, jotka eivät tarvitse faktoja, toimivat kuten julkaisutilassa; vain vapautettavat tarkastukset luetellaan ja ohitetaan | Ei                       |

Agentti-ohjetiedostot kuljettavat** ei** johdettu määrä ollenkaan: `AGENTS.md`, `llm.txt` (ja sen `docs/i18n/*/llm.txt` kopiot), bs `AGENTS.md` fork, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` ja jokainen `skills/*/SKILL.md` osoittavat lähteeseen (esim. `ROUTING_STRATEGY_VALUES` `src/shared/constants/routingStrategies.ts`:ssa) ja sen sijaan `npm run facts`. Invariantti "Ei johdettua määrää (agentin ohjetiedosto…)" epäonnistuu laskennassa (palveluntarjoajat, siirrot, MCP työkalut ja -alueet, reititysstrategiat, pisteytystekijät, tilapaketit) molemmissa tiloissa, joten julkaisun päivityksen ei tarvitse koskaan kirjoittaa ohjetiedostoa uudelleen.

`pr` -tilassa kirjoitushaarat voivat muokata hallittuja arvoja: `chore/derived-*` (yöpäivitys PR), `release/v*` ja käännösaaltoja `docs/i18n-*` ja `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). Jonoeriä (`merge_group`, Yhdistä luonnoksia, `omni-queue/**`) ei tuomita uudelleen: ne summaavat PRs jo tuomitun portin yksitellen.

Poistumiskoodit: `0` clean · `1` STRICT drift (tai pehmeä drift `--strict` kanssa) tai hallitun arvon rikkomus · `2` infrastruktuuri — kooditietoja ei voitu kerätä (tsx-anturi epäonnistui tai aikakatkaistiin; aikakatkaisu on `OMNIROUTE_FACTS_TIMEOUT_MS`, oletusarvo 600000 CI tai di, PR base ei voisi olla ratkaistu. Poistuminen 2 ei ole koskaan dokumentaatioero: suorita työ uudelleen tai korjaa ympäristö.

Missä kukin tila toimii:

| Jossa                                                                                                             | tila                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ominaisuus PR — `ci.yml` työ `docs-sync-strict`, `quality.yml` step "Dokumenttien tarkkuus"                       | `pr` (automaattinen); työ läpäisee tukikohdan `BASE_SHA` nä ja kirjautuu ulos `fetch-depth: 2` llä                                                                                                                  |
| `merge_group`, `omni-queue/**` ehdokkaat, yhdistämisjunan täydellinen porttilista                                 | `pr`                                                                                                                                                                                                                |
| Vapauta PR (`release/v* → main`), työnnät, ajoitetut ja manuaaliset ajot                                          | `release`                                                                                                                                                                                                           |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                                      | HARD kohteet suoritetaan `OMNIROUTE_GATE_MODE=pr` :llä ("rikkoutuiko pohja?"); DRIFT kohde `derived-refresh` suorittaa `npm run release:refresh-derived -- --check` (tiukka näkymä, ei koskaan avaa kanta-punaista) |
| Vapautus (`/generate-release` -vaiheet 0a ja 1; taitojohdotus on erillinen omistajan hyväksymä muutos)            | `npm run release:refresh-derived` kirjoittaa johdetut tiedostot; julkaisun PR omat tarkistukset suoritetaan sitten `release` -tilassa                                                                               |
| `nightly-derived-refresh.yml` (päivittäin, korkein `release/vX.Y.Z`, ohitetaan vapautuksen ja jäädytyksen aikana) | `npm run release:refresh-derived -- --profile=nightly`; diffissä se pitää ONE PR auki `chore/derived-refresh` stä; ei koskaan sulaudu yhteen                                                                        |

Sen takana olevat komennot:

- `npm run facts` tulostaa jokaisen johdetun numeron JSON-muodossa (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` tulostaa yhden arvon, `--snapshot` lukee versionhallintaan tallennetun tilannevedoksen
  aktiivisen puun sijaan. Poistuu koodilla 2, jos faktoja ei voida kerätä.

- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) laskee johdetut
  tiedostot uudelleen yhdellä kertaa tässä järjestyksessä (vaiheiden tunnisteet valitsimelle `--only=`):
  `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (tilannevedos), `numbers` (counts-portin
  uudelleenkirjoitussuunnitelma sovelletaan dokumentaatioon ja viedään sen jälkeen niiden
  `docs/i18n/`-peileihin), `readme-diagrams`, `skills` (luotu `SKILL.md`), `e2e-timings` (ohitetaan,
  kunnes puu sisältää `syncE2eTimings`-toiminnon), `ui-keys` (poistaa avaimet, jotka `en.json` hylkäsi,
  ja asettaa valitsimella `--rewritten-since=<ref>` — oletuksena `origin/main` — uudelleen jonoon
  englanninkieliset arvot, jotka on kirjoitettu uudelleen viimeisimmän julkaisun jälkeen),
  `llm-mirrors` ja `verify-generated` (kirjoituksen jälkeen `check:generated-artifacts`
  ja `check:agent-skills-sync` on läpäistävä julkaisutilassa; ohitetaan valitsimella `--check` ja,
  kun `--only` jättää sen pois; virhe palauttaa poistumiskoodin 2). `changelog`-vaihe otetaan
  käyttöön erikseen (`--with-changelog`, vain julkaisuprofiilissa). `--profile=nightly`
  ei koskaan muuta versioväitettä. Yhdessä valitsimen `-- --check` kanssa komento ei kirjoita mitään
  ja palauttaa poistumiskoodin 1, jos jokin tiedosto muuttuisi tai hallinnoitu arvo vaatisi manuaalisen
  muokkauksen (molemmat luetellaan); infrastruktuurivirhe palauttaa poistumiskoodin 2. `--json` tulostaa
  tuloksen JSON-muodossa.

  Samalla ajokerralla arvot kääntää ympäristössä tai `.env`-tiedostossa määritetty taustapalvelu (vain `OMNIROUTE_TRANSLATION_*`-avaimet luetaan) tai Google-moottori. Jos taustapalvelua ei ole, `__MISSING__`-merkintöjä ei kirjoiteta oletuksena. Release-profiili epäonnistuu ja nightly ohittaa avaimet. `--allow-untranslated` kirjoittaa merkinnät vain pyydettäessä.

- `docs/reference/derived-facts.json` on tilannekuva viimeisimmän päivityksen aikana käytetyistä tosiseikoista. Vain päivitys kirjoittaa sen. README SVG -generaattorit lukevat sen, ja PR-aikayksikkötestit vertaavat sitoutuneita asiakirjoja ja sen kanssa luotuja tiedostoja — ei koskaan live-koodiin. Sarjan yksittäinen live-vertailu on "julkaisun päivitys sulkee syklin" `tests/unit/check-docs-counts-sync.test.ts`:ssä: live-faktien kanssa päivityksen muistiin sovellettu uudelleenkirjoitussuunnitelma ei jätä STRICT -ajattelua, jota se ei raportoi, eikä uudelleensuunnittelu muuta mitään.

Toistaaksesi paikallisesti (paikallinen ajo on oletuksena `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Ilman selvitettävää kantaa (ei `BASE_SHA`/`BASE_REF`, ei paikallista `origin/release/v<version>`) paikallinen `pr` -ajo tulostaa varoituksen ja ohittaa eron epäonnistumisen sijaan.

### Työ: `i18n-ui-coverage`

| Käsikirjoitus                     | Vahvistaa                                                                                                                                                                                                     | Estäminen                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n avaimen kattavuus on ≥ 65 %                                                                                                                                                                           | Kyllä (molemmat tilat)    |
| `check:ui-icu`                    | Jokaisen UI -luettelon jokainen viesti koostuu `IntlMessageFormat`                                                                                                                                            | Kyllä (molemmat tilat)    |
| `check-ui-value-drift` (inline)   | Uudelleen kirjoitettu englanti** arvo** ei jätä vanhentunutta käännöstä taakseen                                                                                                                              | Kyllä (vain julkaisutila) |
| `check-new-key-coverage` (inline) | A** uusi** Englanninkielinen avain käännetään jokaisessa — -kielessä `__MISSING__:` -merkki hylätään                                                                                                          | Kyllä (vain julkaisutila) |
| `check-key-completeness` (inline) | Jokaisessa UI -luettelossa (ja `--catalog=cli` kanssa jokainen CLI -luettelossa) on täsmälleen `en.json`-avainsarja; `pr` tilassa jokainen luettelo PR muuttui itseään vastaan yhdistämispohjassa             | Kyllä (molemmat tilat)    |
| `check-translation-ratio`         | Todellinen käännössuhde kielikohtaisesti (identtinen englanniksi / paikkamerkki / puuttuvat lehdet sallittujen luettelon ulkopuolella) ei saa ylittää `config/quality/i18n-translation-baseline.json` + slack | Kyllä (vain julkaisutila) |

Tarvitsee `fetch-depth: 0` — arvon ajautumisen portti eroaa `en.json` yhdistämispohjaa vastaan.

**Kaksi tilaa (13.11.2026 alkaen).** Feature-PR lisää tai kirjoittaa uudelleen avaimia tiedostossa
`en.json` (sekä tiedostossa `bin/cli/locales/en.json`) eikä koske mihinkään muuhun kielialueeseen;
`check:pr-derived-paths` (`pr-test-policy`-työ, perhe `config/quality/derived-paths/translation.json`)
epäonnistuu, jos feature-PR tekee näin. Muut kielialueet viimeistellään kerran julkaisua kohden
komennolla `release:refresh-derived`, joka kutsuu toimintoa `syncUiKeys()` tiedostossa
`scripts/i18n/sync-ui-keys.mjs` (lisää puuttuvat avaimet, poistaa hylätyt avaimet, merkitsee
uudelleenkirjoitettujen englanninkielisten tekstien käännökset arvolla `rewrittenSinceRef`, kääntää),
tai käännösaallon avulla. Portit lukevat tilan tiedostosta `scripts/check/lib/gateMode.mjs`: `pr`-tilassa
(feature-PR:t, `merge_group`, `omni-queue/**`) yllä olevat julkaisutilan portit tulostavat
`SKIP reason=pr-mode` ja poistuvat koodilla 0; `release`-tilassa (julkaisu-PR, työnnöt haaraan `main`,
`workflow_dispatch`, paikalliset ajot) ne ovat entiseen tapaan tiukkoja, ja julkaisu-PR:ssä
eroa hyödyntävät portit saavat arvon `BASE_REF=origin/main`, joten ne tarkistavat jokaisen kierroksen
lisäämän tai uudelleenkirjoittaman avaimen. Esikatsele feature-PR:n tulosta paikallisesti valitsimella
`--mode=pr`.

PR:ää, joka muuttaa edelleen kieliluetteloita `pr`-tilassa (käännösaalto, julkaisuun liittyvä päivitys tai pelkkä käännöskorjaus), ei ohiteta: `check-key-completeness` vertaa jokaista sen muuttamaa luetteloa samaan luetteloon yhdistämiskannassa (`scripts/i18n/lib/touched-catalogs.mjs`) ja epäonnistuu, jos luettelosta puuttuu avain, jota se aiemmin sisälsi, `en.json`-tiedostosta puuttuu avain, oikea käännös on muuttunut `__MISSING__:`-merkinnäksi tai englanninkieliseksi tekstiksi tai arvo ei enää sisällä kaikkia sellaisen englanninkielisen merkkijonon paikkamerkkejä/tageja, jota PR ei muuttanut. PR:ssä uutena lisätyn luettelon on sisällettävä koko `en.json`-avaimisto. Tämä kattaa PR:n koskemien luetteloiden osalta sen, mitä suhde- ja CLI-yhtenevyystarkistukset näkisivät.

Kieli-pariteettiyksikkötestit (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) noudattavat samoja tiloja `tests/_helpers/localeParityMode.ts` kautta: `pr` tilassa ne ohittavat avainpariteettivahvistukset ja jättävät julkaisuun päivittämään niiden avainten paikkamerkkipariteetin, joiden englannin kieli on muuttunut yhdistämispohjan jälkeen (jokainen avain, kun yksikkötestityö ei voi lukea). Tuo auttaja on** vain** sanctioned mode-conditional skip: `check:test-masking` laskee `.skip(` ja `{ skip: true }`, mutta ei laskettua `{ skip: "<reason>" }` jonka se palauttaa, joten `tests/unit/locale-parity-mode.test.ts` kiinnittää luettelon testeistä, jotka saavat käyttää sitä. — n lisääminen on tarkistettu muokkaus luetteloon.

#### `check-ui-value-drift` — vanhentunut käännösportti

Saa kiinni yhden i18n-regression, jota muut portit eivät rakenteellisesti näe: englanninkielinen arvo kirjoitetaan uudelleen ja _aiemmasta_ englannin kielestä johdetut käännökset jäävät jäljelle, joten muut kuin englanninkieliset käyttäjät lukevat edelleen luottavaisesti muotoiltua, nyt väärää kopiota.

Tämä toimitettiin todella. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravity-kirjautumisapuohjelma laskeutui (#5203);** 39/43 aluetta** piti tekstiä, jossa operaattoreita kehotettiin "kopioimaan koko URL ja liittämään se alle" — kulku, jota ei voida suorittaa kyseiselle tarjoajalle. Se jäi huomaamatta #8463 asti, koska:

- `sync-ui-keys` täydentää vain **puuttuvia** avaimia, ei vanhentuneita;

- `check-ui-keys-coverage` laskee avaimen _presence_, joten vanhentunut käännös lasketaan katetuksi;

- `check-translation-drift` seuraa dokumentaation peilejä `docs/i18n/<locale>/**.md` —
  se ei koskaan lue tiedostoja `src/i18n/messages/*.json`. Se suoritetaan työssä `docs-sync-strict`: ohjeellisena PR:issä ja pakottavana push-tapahtumissa sekä öisin; käännösaalto päivittää peilit, ei ominaisuus-PR:ää.

**Muutoksiin perustuva, ei lähtötilaan perustuva.** Se vertaa yhdistämiskannan `en.json`-tiedostoa työpuuhun; jokaisen avaimen osalta, jonka englanninkielinen arvo muuttui, locale, jossa on edelleen muuttamaton käännös, katsotaan vanhentuneeksi. Tämä jäädyttää tarkoituksella aiemman velan — diffistä ei voi päätellä, mihin vanhaan englanninkieliseen tekstiin pitkään olemassa ollut käännös perustui, joten tarkistus arvioi vain sitä, mihin nykyinen muutos vaikuttaa. Vaihtoehtoinen ratkaisu (avainkohtainen tiivisteiden lähtötilanne) vaatisi noin 600 kilotavun kokoisen generoidun tiedoston, joka olisi kolme kertaa suurinta nykyistä lähtötiedostoa suurempi ja muuttuisi jokaisessa i18n-PR:ssä.

Kaksi tapaa tyydyttää se:

1. päivittää käännökset, joihin vaikuttaa, tai

2. aseta niiden arvoksi `__MISSING__:<new english>` — ajonaikainen ympäristö tarjoaa tällöin korjatun englanninkielisen tekstin (`src/i18n/request.ts::deepMergeFallback`, #7258), ja avain lisätään käännösjonoon.

Jos merkkijono on** merkitys** muuttunut, mieluummin** avaimen uudelleennimeäminen** : uusi avain ei voi periä vanhentunutta käännöstä. Tätä mallia #8463 käytettiin.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Poistuu 0:sta `SKIP reason=base-unresolved`, kun perusluetteloa ei voida lukea (matala klooni ilman perusviitettä), peilataan `check-openapi-breaking`. Vain julkaisutila: ominaisuus PR kirjoittaa englannin uudelleen ja pysähtyy siihen; julkaisun päivitys merkitsee sen jättämät käännökset (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, sama `findStaleTranslations`).

### Työ: `i18n`

Täysi i18n-vahvistusmatriisi (yksi työ maa-asetusta kohden). Koko työ on neuvoa-antavaa.

| Käsikirjoitus                   | Vahvistaa                                | Estäminen                                                 |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Käännösten täydellisyys kielikohtaisesti | **neuvoa-antava** (`continue-on-error: true` koko työssä) |

### Työ: `pr-test-policy`

Toimii vain vetopyyntöjen yhteydessä.

| Käsikirjoitus          | Vahvistaa                                                                                                                                   | Estäminen |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, joka muuttaa tuotantokoodia `src/` ssä, `open-sse/`, `electron/` tai `bin/`, on sisällettävä tai päivitettävä testejä (kova sääntö #8) | Kyllä     |
| `check:test-masking`   | Muutetut testitiedostot eivät vähennä väitteiden nettomäärää tai lisää `assert.ok(true)` tautilogioita                                      | Kyllä     |
| `check:pr-evidence`    | PR body lainaa test/VPS todisteita muutoksesta (mekanisoi Hard Rule #18 n greppingillä PR prose — fragile, katso Backlog)                   | Kyllä     |

### Työ: `test-vitest`

Juokse `build` jälkeen. Lohkot sulautuvat epäonnistuessa.

| Sviitti          | Vahvistaa                                                          | Estäminen                                                                                                                        |
| ---------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP palvelin (110 työkalua), autoCombo, välimuisti — vitest runner | Kyllä                                                                                                                            |
| `test:vitest:ui` | UI komponentti testaa — vitest runneria                            | **Estäminen** — olemassa olevat viat on nimenomaisesti suljettu pois `vitest.config.ts`:ssä; uudet epäonnistumiset epäonnistuvat |

### Yötyönkulku (aikataulutettu, neuvoa-antava)

Nämä toimivat cron-aikataululla (ja `workflow_dispatch`), eivät koskaan PRs llä. Kaikki ovat neuvoa-antavia.

| Työnkulku              | Vahvistaa                                                                                                                                                          | Estäminen         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `nightly-property`     | pikatarkista ominaisuustestit satunnaisella siemenmäärällä + korkea ajomäärä                                                                                       | **neuvoa-antava** |
| `nightly-resilience`   | kasan kasvuportti, kaaosvika-injektio, k6 load/soak                                                                                                                | **neuvoa-antava** |
| `nightly-llm-security` | promptfoo-ruiskutussuoja (estotila) + garak -anturit (ohitettu ilman palveluntarjoajan salaisuutta)                                                                | **neuvoa-antava** |
| `nightly-schemathesis` | OpenAPI -sopimus sumea (skeema) elävää OmniRoute vastaan käyttämällä `docs/openapi.yaml` — pintojen spesifikaatiorikkomuksia / käsittelemättömät 500s (Fase 8 B.4) | **neuvoa-antava** |
| `nightly-mutation`     | Stryker-mutaatiotestauksen pisteet nopealla yksikkökaistalla — selviytyneet mutantit pinnalla heikot väitteet                                                      | **neuvoa-antava** |
| `nightly-compat`       | Solmumoottorin yhteensopivuusmatriisi tuetuilla `engines.node` -alueilla                                                                                           | **neuvoa-antava** |

Suorituskyvyn perusviivat (keko, TTFB, rakennusaika) tallennetaan, ei portitettuja: katso [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Luodut tiedostot ja johdetut perusviivat (kirjoitettu julkaisun yhteydessä)

Suunnitelma 2026-11-13 ("johdannaiset numerot ja tekstit ratkaistaan vain julkaisun yhteydessä"): ominaisuus PR muuttaa** lähde** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, taitoluettelo, vapaan tason luettelo, uusi e2e-spesifikaatio. Se ei luo uudelleen tästä lähteestä laskettuja tiedostoja, eikä se tallenna mitattua parannusta lähtötasolle. Nämä tiedostot kirjoitetaan uudelleen kerran, julkaisun päivityksellä (`release:refresh-derived`) tai öisellä päivityksellä PR. Ennen tätä jokainen sisarus PR kantoi oman uudelleen luodun kopionsa ja oli ristiriidassa seuraavan yhdistämisen kanssa (2026-11-13: 30/321 open PRs kirjoiti uudelleen `PROVIDER_REFERENCE.md`, 26-28 kirjoitti README -kaaviot uudelleen).

**Vartija.** `check:pr-derived-paths` (työ `pr-test-policy`) epäonnistuu PR ssä, joka koskettaa perheen tiedostoa `config/quality/derived-paths/` ssä:

| Perhe       | Tiedostot                                                                                                                                                                                           | Kirjoittaja                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; kaksitoista generoitua README SVG:tä; `skills/*/references/**`; `SKILL.md`-tiedostot, joissa ei ole mukautettua lohkoa | `release:refresh-derived` (faktat), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                                   | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

Kirjoittajat (`release/v*`, `chore/derived-*` ja `chore/bank-ratchet-*` perusviivat) ovat vapautettuja; niin on myös PR, joka muuttaa vain yhtä perhettä ja sen kumppaneita ( `generated`:lle: generaattoriskriptit, niiden testit, agenttitaitojen syötteet — `src/shared/constants/agentSkills.ts`, käsin kirjoitetut `skills/**` -dokumentit, `docs/openapi.yaml` — ja `changelog.d/**`), esim. sankarin asettelun muutos sen uudelleen luodulla, tai SVG:llä, jonka uudelleen luodut, tai `SKILL.md` tiedostot. `SKILL.md`, jossa on käsin kirjoitettu `<!-- skill:custom-start -->` lohko, ei kuulu perheeseen: sen mukautettu lohko pysyy muokattavissa ominaisuuden vieressä.

Perheet eivät myöskään arvioi orpojen siivoamista: PR voi poistaa `docs/i18n/<locale>/<doc>`, kun yhdistämiskannassa oli tuo peili, eikä `<doc>` ole enää PR:n päässä, ja voi muokata `.i18n-state.json` vain pudottaakseen tällaiset asiakirjat `sources`-tiedostosta. Vartija luettelee tiedostot `orphan-cleanup` n alla. Edelleen olemassa olevan asiakirjan peilin poistaminen pysyy rikkomuksena: mitään muuta liukuhihnaa ei seuraa, ja `llm.txt` ja `CHANGELOG.md` -peileillä on omat kirjoittajansa.

**Tarkistukset porttikohtaisesti** (`scripts/check/lib/gateMode.mjs`; apulainen `scripts/check/lib/derivedArtifactScope.mjs`):

| Tarkista                                                                               | `release` (push, aikataulu, julkaisu PR, paikallinen)                                            | `pr` (ominaisuus PR, jonoerä)                                                                                                                                                                                |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:agent-skills-sync`                                                              | jokaisen taidon on oltava yhtä suuri kuin generaattorin teho                                     | vain taidot, joiden luomaa tekstiä (muokatun lohkon ulkopuolella) tai `references/` PR muokkaa; muuten `SKIP reason=pr-mode`                                                                                 |
| `check:generated-artifacts` (README SVGs + e2e ajoitukset; tarvitsee täyden historian) | jokainen SVG on yhtä suuri kuin sen generaattori; jokaisessa spesifikaatiossa on ajoitusmerkintä | vain artefaktit, joita PR muokkaa; loput `SKIP reason=pr-mode`; ei eroa pohjaa → jokainen artefakti arvioitu (epäonnistunut suljettu)                                                                        |
| README SVG tavuvertailutestit (`tests/unit/docs/readme-*-svg.test.ts`)                 | jokainen SVG                                                                                     | vain SVG PR muokkaa, kun kanta ratkaisee; `test-unit`:n matalalla PR kassalla ei ole perustaa, joten siellä testi ohittaa `SKIP reason=base-unresolved` llä ja `check:generated-artifacts` omistaa vertailun |
| e2e ajoituksen täydellisyys (`tests/unit/balance-e2e-shards.test.ts`)                  | jokaisessa spesifikaatiossa on merkintä                                                          | sama sääntö kuin SVG -testeissä (uusi spesifikaatio suoritetaan mediaanipainolla)                                                                                                                            |
| `check-quality-ratchet.mjs --require-tighten`                                          | Pankkiton parannus epäonnistuu (ellei `_policy`)                                                 | raportoitu parannus, ei koskaan epäonnistunut; regressio epäonnistuu silti                                                                                                                                   |

Vapautustila säilyttää tuomiot, poistumiskoodit ja viestit, jotka näillä tarkasteilla oli ennen jakoa; lisätään enintään yksi rivi, joka nimeää ratkaistun tilan (`[agent-skills-sync] mode=release (auto: local run)`). Testit ohittavat node:testin `{ skip: releaseOnlyUnlessTouched(...) }` vaihtoehdon, jonka `check:test-masking` listaa vain raportointilohkoon (se ei ole `.skip(` eikä `{ skip: true }`, joten sitä ei lasketa kovaksi ohitukseksi). `check:generated-artifacts` toimii siellä, missä kanta on ratkaistavissa: työ `lint` (`fetch-depth: 0`), heti `check:agent-skills-sync` jälkeen. Paikallisesti `npm run check:generated-artifacts -- --mode=pr` näyttää, mitä tämä askel tuomitsee PR ssä. Palveluntarjoajan kokonaismäärän ristiintarkistus `check:docs-counts` ("Provider reference total (doc vs live moduulit)") on osa laskentaporttia ja seuraa kyseisen portin omia tiloja.

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
