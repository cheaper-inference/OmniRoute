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

## Gate-inventaario ja suoritusprofiilit

### Ehdokkaiden hyväksyntä

CI- ja Quality Gates -työnkulut tuottavat kumpikin vakaan päätöksen: `Gate / CI` ja
`Gate / Quality`. Niiden versioitu hyväksyntäkäytäntö luettelee jokaisen edeltävän
työn pakolliseksi tai ohjeelliseksi. Sovellettavan pakollisen työn on onnistuttava:
puuttuvat, peruutetut, ohitetut, odottavat ja tuntemattomat tulokset eivät voi muodostaa
PASS-tulosta. Kelvollinen vain dokumentaatiota tai vain luetteloa koskeva luokittelu voi
tehdä koodikaistasta soveltumattoman; luonnos-PR ei ole hyväksytty ehdokas. `hotfix`-tunniste
ei poista näyttövaatimusta.

Molemmat työnkulut kattavat PR:t main-/release-haaroihin, työnnöt haaraan `main`,
manuaaliset käynnistykset ja merge-group-tapahtumat. Push-, dispatch- ja merge-group-ajot
suorittavat koko valinnan. Haaraan `release/**` tehdyt työnnöt eivät käynnistä niitä
(2026-10-18): jokainen muutos suoritti matriisin jo PR:ssään, ja yhdistetty yhdistelmä on
Release-Greenin tehtävä (`docs/ops/RUNNER_BOX.md` → Hosted lane). Haarukat ja
merge-ryhmät käyttävät isännöityjä suorittimia töissä, jotka muutoin valitsisivat
itse isännöidyt suorittimet; riittävä isännöity kapasiteetti on varmistettava ennen
käyttöönottoa.

Jokainen JSON-kuitti yksilöi uloskirjatun SHA:n, työnkulun ajon ja yrityksen.
CLI hylkää uloskirjauksen ja tapahtuman SHA:n välisen ristiriidan. Työnkulkutestit sitovat
käytäntöjäsenyyden päätöstyönkulun `needs`-luetteloon, jotta uusi tai poistettu kaista ei
voi kadota hiljaisesti. Kuitit kattavat oman työnkulkunsa, eivät julkaisua, käyttöönottoa
tai olemassa olevan ohjeellisen skannerin sisäisiä toimintoja. Molempien tarkistusnimien
aktivointi haarasäännöissä on erillinen hallinnollinen muutos; näiden töiden lisääminen ei
itsessään suojaa haaraa.

### Staattisen tarkistuksen inventaario

Versioitu npm-aliaksien inventaario ja staattisen tarkistuksen jäsenyys sijaitsevat tiedostossa
`config/quality/gate-manifest.json`. Suorita `npm run check:gate-manifest` varmistaaksesi
komentosarjojen nimet ja täsmälliset komennot `package.json`-tiedostoa vasten; lisäykset,
poistot ja komentojen poikkeamat aiheuttavat virheen sekä paikallisessa koukussa että CI:n
muutosluokittelutöissä. Alias ei ole työnkulun työ, matriisi-instanssi eikä testitapaus:
näitä määriä ei saa esittää keskenään vaihdettavina.

Käytä komentoja `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list`
valittujen aliasten tarkastelemiseen suorittamatta niitä. Suorittaja kutsuu npm-aloituspistettä,
joten sen suoritusympäristö (mukaan lukien määritetty Bun) säilytetään.
Manifesti tallentaa näiden profiilien ulkopuoliset aliakset erikseen kutsuttaviksi, ja
ylläpitokomennot ovat kiellettyjä vain luku -tilan tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen tarkistuksen. Ne eivät varmista tuotetestejä,
kattavuutta, paketointia, ulkoisia tarkistuksia tai ehdokkaan täydellistä julkaisuhyväksyntää.
Työnkulun hyväksyntä käyttää linkitettyjä tiedostoja `config/quality/admission-policy.json`
ja `scripts/quality/admission-verdict.mjs`. Release-observer-profiilit pysyvät erillisinä;
tarkista niiden sovellettavat tarkistukset ja kuitit itsenäisesti. Alla oleva
proosamuotoinen inventaario on viite, ei todiste siitä, että gate todella suoritettiin.

Skriptit sijaitsevat hakemistoissa `scripts/check/` (käytäntögatet) ja
`scripts/quality/` (ratchet-moottori). CI:n totuuden lähde on `.github/workflows/ci.yml`.

### Release-PR:n nopea polku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI:tä main-/release-PR:issä, työnnöissä haaraan `main`,
dispatch-ajossa ja merge-ryhmissä. PR:t käyttävät polkusuodatettuja nopeita tarkistuksia.
Pysyvästi käytöstä poistettu päällekkäinen build poistettiin; todelliset build-, paketointi- ja
käynnistystarkistukset säilyvät CI:ssä.

| Työ                                              | Laajuus                                                                                                                                                                                                                                                                              | Estävä                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `Docs Gates (fast-path)`                         | Dokumentaatio-/koodipakettien PR:t; API-dokumentaation viittaukset ja kaikki dokumentaatio                                                                                                                                                                                           | Kyllä                   |
| `Fast Quality Gates`                             | Koodipaketin PR:t; staattiset tarkistukset, tyyppitarkistus, koontinäytön tyyppitarkistus, vaikutuksen alaiset yksikkötestit                                                                                                                                                         | Kyllä                   |
| `Forgotten sibling tests`                        | Koodipaketin PR:t; muuttuneet moduulit, jotka jäljitetään staattisiin kuluttajiin ja ehdokkaan sisartesteihin; barrel- ja dynaamisten tuontipolkujen ilmoitukset ovat ohjeellisia diagnostiikkatietoja, ja niihin viitatut sallittujen poikkeusten luettelon poikkeukset huomioidaan | **Ohjeellinen**         |
| `Vitest (fast-path)`                             | Koodipaketin PR:t; nopea vitest-testikokoelma                                                                                                                                                                                                                                        | Kyllä                   |
| `Unit Tests fast-path`                           | Koodipaketin PR:t; neljän sirun yksikkötestikokoelma                                                                                                                                                                                                                                 | Kyllä                   |
| `No new ESLint warnings`                         | Koodipaketin PR:t; vaimennukset huomioiva lint-suoja                                                                                                                                                                                                                                 | Kyllä, myös haarukoille |
| `Merge integrity (changelog + generated skills)` | Muut kuin luonnos-PR:t; muutosloki ja generoitujen taitojen synkronointi                                                                                                                                                                                                             | Kyllä, myös haarukoille |

#### Unohtuneiden sisartestien raportti

`npm run check:forgotten-sibling-tests` käyttää uudelleen testivaikutuskartan taustalla olevaa import-resolveria.
Jokaisesta muuttuneesta tuotantomoduulista se raportoi deterministiset
`changed module/symbol -> static consumer -> candidate sibling test` -ketjut, kun ehdokastesti
puuttuu pull requestin diffistä. Markdown-yhteenveto ja JSON-tulos säilytetään
`forgotten-sibling-tests`-työnkulun artefaktina kalibrointia varten ennen estävän käyttöönoton
aloittamista.

Barrel-uudelleenviennit ja dynaamiset importit ovat vain resoluution diagnostiikkaa; ne eivät koskaan
luo estävää havaintoa. Tarkistetut poikkeukset sijaitsevat tiedostossa
`config/quality/forgotten-sibling-allowlist.json`. Jokaisessa merkinnässä on nimettävä kuluttaja ja ehdokastesti,
annettava täsmällinen perustelu sekä linkitettävä GitHub-issueen tai pull requestiin. Virheelliset merkinnät
estävät oletusarvoisesti toiminnan. Poikkeuksilla ei voi ohittaa poistettua ehdokastestiä tai diffiä, joka lisää
`.skip`- tai `.todo`-määrityksen; väitteiden heikentäminen ja muu peittäminen kuuluvat erikseen estävän
`check:test-masking`-portin vastuulle.

### Työ: `lint`

Suoritetaan jokaisessa `main`-haaraan kohdistuvassa PR:ssä. Estää yhdistämisen virheen sattuessa.

| Komentosarja (`npm run ...`)      | Validoi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Estävä                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js-versio on tuetulla alueella                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `check:cycles`                    | Kaikki `src/` + `open-sse/` -hakemistojen väliset sykliset tuonnit (AST-pohjaiset, tsconfigin `paths`-määritykset ratkaistu). Pelkkä suoritus päättyy aina koodiin 1, kun yksikin sykli on olemassa (suljetusti epäonnistuva toiminta lähtien versiosta #15281), ja luettelee SCC:t. `check:cycles:ratchet` (CI:n suorittama komento) estää suorituksen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.cycles`-ylärajan — tällä hetkellä 14, `direction: down`, joten arvo voi vain laskea (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä (rajoitin)                            |
| `check:boundary`                  | `open-sse → src` -kytkentä: yksilöidyt tiedostoista tiedostoihin suuntautuvat tuonnit moottorista sovellukseen (`scripts/quality/measure-boundary.mjs`; reunaluettelo muodostaa v4-ytimen/moduulijaon korjausjonon). Pelkkä suoritus tuottaa ohjeellisen raportin (sama kuin `quality:boundary`). `check:boundary:ratchet` (CI:n suorittama komento, myös `quality.yml`-tiedoston nopeiden tarkistusten rajoitinsilmukassa) estää suorituksen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.boundaryOpenSseToSrc`-ylärajan — lähtöarvoksi asetettu mitattu 771, `direction: down`; `--update` voi vain pienentää sitä; PR-pyynnöissä vertailu tehdään perustaan nähden (`--base-ref`, katso alta)                                                                                                                                                                                                                                                                                                                                                                | Kyllä (rajoitin)                            |
| `check:route-validation:t06`      | Zod-skeemat ovat käytettävissä kaikilla reiteillä (tason 6 käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any`-määrä ei ylitä budjettia (tason 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `check:provider-consistency`      | Jokaisella tiedoston `providers.ts` providerilla on vastaava merkintä tiedostossa `providerRegistry.ts` (ja päinvastoin, sallittujen listan puitteissa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Kyllä                                       |
| `check:model-lifecycle`           | Kolme manuaalisesti ylläpidettävää reititystaulukkoa pysyvät tarkistettuun elinkaaritilannekuvaan (#11503) nähden yhdenmukaisina: `FITNESS_TABLE` (`taskFitness.ts`) ei pisteytä käytöstä poistettua tunnistetta, jonka `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES`-kohde on `REGISTRY`-rekisterissä eikä käytöstä poistettujen tunnisteiden tilannekuvassa; jokainen `REGISTRY`-rekisterissä edelleen oleva käytöstä poistettu tunniste välitetään eteenpäin tai se on lueteltu `allowedRetiredInCatalog`-luettelossa; eikä mikään `DEFAULT_DEGRADATION_MAP`-lähde tai -kohde esiinny käytöstä poistettuna kyseisessä tilannekuvassa. Tämä ei todista, että aktiivinen ylävirta tarjoaa mallia tällä hetkellä. Offline-tarkistus — vertaa tiedostoon `config/quality/model-lifecycle.json`, joka päivitetään manuaalisesti komennolla `npm run quality:refresh-model-lifecycle` (verkko; ei ole kytketty CI:hin). `allowedRetiredInCatalog` on käytöstä poistamisen vähentämiseen tarkoitettu asteittainen rajoitin: lisää merkintä vain seurantatehtävän yhteydessä. | Kyllä                                       |
| `check:fetch-targets`             | Jokainen asiakaspuolen `src/`-hakemistossa oleva `fetch("/api/...")` ratkaistaan todelliseksi `route.ts`-tiedostoksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:deps`                      | Kaikki repositorion jokaisessa `package.json`-tiedostossa olevat `npm install`-asennettavat riippuvuudet ovat tiedostossa `dependency-allowlist.json`; uudet lukitsemattomat tai slopsquatting-paketit merkitään                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `audit:deps`                      | `npm audit` (juuri + electron) — ei korkean tai kriittisen vakavuusasteen ilmoituksia (päällekkäinen osv-tarkistuksen `check:vuln-ratchet` kanssa; katso Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `check:lockfile`                  | `package-lock.json`-tiedoston eheys — https-rekisteri, eheystiivisteet, ei isäntäkoneen ohituksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `check:licenses`                  | Tuotantoriippuvuuksien SPDX-käyttöoikeusluettelo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `check:tracked-artifacts`         | Ei koontiversion artefakteja / versionhallintaan lisättyjä `node_modules`-symbolisia linkkejä (suoritetaan myös huskyn pre-commit-koukussa; pre-push on tarkoituksella kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `check:ai-attribution`            | Ei tekoälyn/botin `Co-Authored-By`-lisätietoriviä tai tekoälyn tuottamaa alatunnistetta PR-commiteissa, otsikossa tai leipätekstissä — tiukka sääntö #16 (`quality.yml`-tiedoston nopeiden tarkistusten silmukassa PR→`release/**`-kohteille — lukee tapahtuman hyötykuorman, ei tee mitään PR:ien ulkopuolella — sekä vain PR:ille tarkoitettu vaihe `ci.yml`-tiedoston lintissä PR→`main`-kohteille; myös huskyn `commit-msg`-koukussa; ihmisten kanssa tehdyt yhteiscommittaukset sallitaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Jokainen Vitest-poissulku nimeää seurantaongelman ja esiintyy tiedostossa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Kyllä                                       |
| `check:file-size`                 | Lähdetiedostojen (`.ts`/`.tsx` hakemistoissa `src/`, `open-sse/`, `electron/`, `bin/`) on pysyttävä `cap`-rajan sisällä ja testitiedostojen (`*.test.ts(x)`) `testCap`-rajan sisällä; tiedostot, jotka on jäädytetty tiedostossa `file-size-baseline.json` (`frozen` / `testFrozen`), eivät saa kasvaa niille tallennettua kokoa suuremmiksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                       |
| `check:error-helper`              | Executors/handlerien virhevastausten on käytettävä funktioita `buildErrorBody()` / `sanitizeErrorMessage()` (Kova sääntö #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:migration-numbering`       | Siirto-SQL-tiedostot on numeroitu peräkkäin, eikä välejä tai kaksoiskappaleita ole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                       |
| `check:public-creds`              | Kirjaimellisia OAuth-`client_id`-/`client_secret`-arvoja tai Firebase Web -avaimia ei ole `publicCreds.ts`-tiedoston ulkopuolella (Kova sääntö #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `check:db-rules`                  | Raakaa SQL:ää ei ole `src/lib/db/`-moduulien ulkopuolella; `localDb.ts`-tiedostosta ei tehdä barrel-tuonteja (Kovat säännöt #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                       |
| `check:known-symbols`             | Lähetyspöydissä rekisteröidyt palveluntarjoajien suorittajat, reititysstrategiat ja kääntäjät vastaavat levyllä olevia tiedostoja — irrallisia tai ilmoittamattomia symboleja ei ole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:route-guard-membership`    | Jokainen aliprosessin käynnistävä reitti luokitellaan `isLocalOnlyPath()`-funktion avulla (Kovat säännöt #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `check:test-discovery`            | Jokainen repositorion `*.test.ts` / `*.spec.ts` -tiedosto kerätään vähintään yhden test runnerin toimesta (ratchet: kohteiden luettelo tiedostossa `test-discovery-baseline.json` voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                       |
| `check:test-tla-order`            | Yksikään `tests/unit`-hakemiston `node:test`-tiedosto ei rekisteröi testiä, suorita ylätason `await`-lauseketta ja rekisteröi sen jälkeen lisää testejä (#18045; ratchet: `test-tla-order-allowlist.json` voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                       |
| `check:agent-skills-sync`         | Luodut agent-skills-artefaktit vastaavat niiden lähdeluetteloa (ei poikkeamia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Palveluntarjoajien logoilla/resursseilla on tallennettu alkuperätietomerkintä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON-määritystiedostot jäsentyvät ja täyttävät repositorion lint-säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript-käännös ilman virheitä (vain huomautukset ovat sallittuja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — ennakoiva tarkistus; monet aiemmin olemassa olevat kutsukohdat tarvitsevat edelleen tyyppimäärityksiä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Ohjeellinen** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` rajattuna polkuun `src/app/(dashboard)/**` (#7033) — `typecheck:core` -tarkistuksen kuratoitu 27 tiedoston sallittujen tiedostojen luettelo ei sisällä yhtään dashboardin TSX-tiedostoa, eikä `next build` myöskään koskaan tarkista niiden tyyppejä (`next.config.mjs` asettaa arvon `ignoreBuildErrors: true`), joten irrallisten tunnisteiden regressiot siellä (#6625/#6909) jäivät CI:ssä huomaamatta. Erot verrataan jäädytettyyn tiedosto- ja TS-koodikohtaiseen lukumäärän perustasoon (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentuneen valvonnan malli kuin `check:known-symbols`-tarkistuksessa) — vain perustasossa ilmoitetun lukumäärän ylittävät UUDET virheet estävät tarkistuksen läpäisyn; pienennä lukua komennolla `--update`, kun ennalta olemassa oleva virhe korjataan.                                                                                                                                                                                                                                                        | Kyllä                                       |

### Työ: `quality-gate`

Suoritetaan `test-coverage`-työn jälkeen. Estää yhdistämisen epäonnistuessaan.

| Komentosarja                 | Tarkistaa                                                                                                                                                                                        | Estääkö                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `quality:collect`            | Tuottaa tiedoston `quality-metrics.json` (ESLint-varoitusten määrä, yhdistetyn shard-raportin kattavuus)                                                                                         | Kyllä (ratchet-tarkistuksen edeltäjä) |
| `quality:ratchet`            | Jokainen `quality-baseline.json`-tiedoston mittari ei ole heikentynyt (ESLint-varoitukset ≤ perustaso; kattavuus ≥ perustaso)                                                                    | Kyllä                                 |
| `check:duplication`          | Koodin päällekkäisyys (jscpd@4) ei ylitä `quality-baseline.json`-tiedoston perustasoa                                                                                                            | Kyllä                                 |
| `check:complexity`           | Tiedostotason syklomaattinen kompleksisuus ei ylitä ylärajaa (coren ESLint `complexity` + `max-lines-per-function`)                                                                              | Kyllä                                 |
| `check:cognitive-complexity` | Kognitiivisen kompleksisuuden ratchet-tarkistus (`eslint-plugin-sonarjs`) — erillinen ESLint-ajokerta; CI suorittaa molemmat yhdistettynä yhtenä `check:complexity-ratchets`-vaiheena            | Kyllä                                 |
| `check:dead-code`            | Käyttämättömien vientien / tiedostojen ratchet-tarkistus (knip) ei heikkene perustasoon verrattuna                                                                                               | Kyllä                                 |
| `check:compression-budget`   | Pakkausvertailun budjetti — moottorikohtaiset token-säästöjen vähimmäistasot eivät saa heikentyä                                                                                                 | Kyllä                                 |
| `check:type-coverage`        | Tyypitetyn osuuden ratchet-tarkistus (`type-coverage`) ei heikkene; korvaa pitkälti tarkistuksen `typecheck:noimplicit:core`                                                                     | Kyllä                                 |
| `check:codeql-ratchet`       | Avoimien CodeQL-hälytysten määrä ei heikkene (luetaan komennolla `gh api`; ohitetaan hallitusti ilman tunnistetta) — päivitystiheys ja manuaalinen käynnistys: katso alta kohta ”CodeQL-ratchet” | Kyllä                                 |

### Työ: `quality-extended`

Koko työ on neuvoa-antava (`continue-on-error: true`). npm-pohjaiset ratchet-tarkistukset suoritetaan
todella; ulkoiset tarkistimet asennetaan komennolla `gh release download` ja ohitetaan itse (poistumiskoodi 0),
jos binaari puuttuu edelleen.

| Komentosarja             | Tarkistaa                                                                                                                                                                                                                                                            | Estääkö                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | Ympyräriippuvuuksia ei ole (dpdm)                                                                                                                                                                                                                                    | **Neuvoa-antava**                         |
| `check:bundle-size`      | Bundlen koko ei ylitä ylärajaa                                                                                                                                                                                                                                       | **Neuvoa-antava**                         |
| `check:secrets`          | Salaisuuksien tarkistus (gitleaks) — ohitetaan, jos binaari puuttuu                                                                                                                                                                                                  | **Neuvoa-antava**                         |
| `check:vuln-ratchet`     | Riippuvuuksien haavoittuvuudet (osv-scanner) eivät heikkene — ohitetaan, jos binaari puuttuu                                                                                                                                                                         | **Neuvoa-antava**                         |
| `check:workflows`        | Työnkulkujen lint-tarkistus (actionlint + zizmor); puuttuvat tai rikkoutuneet tarkistimet, virheelliset raportit tai puuttuva ratchet-perustaso johtavat INCOMPLETE-tilaan. Kelvolliset löydökset noudattavat valittua tiukkaa, neuvoa-antavaa tai ratchet-käytäntöä | Suoritettava; zizmor-ratchet estää CI:ssä |
| `check:openapi-breaking` | Julkisen API-sopimuksen (`openapi.yaml`) rikkovat muutokset perushaaraan verrattuna (oasdiff) — tuottaa arvon `openapiBreaking=N`; ohitetaan, jos oasdiff puuttuu tai perusmääritystä ei voida ratkaista                                                             | **Neuvoa-antava**                         |

### Työ: `docs-sync-strict`

Suoritetaan jokaisessa `main`-haaraan kohdistuvassa PR:ssä. Estää yhdistämisen epäonnistuessaan.

| Skripti                        | Vahvistaa                                                                                                                                                                                                                     | Estävä                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:docs-all`               | Metatarkistus, joka suorittaa alla olevat 6 alitarkistusta peräkkäin                                                                                                                                                          | Kyllä                                  |
| ↳ `check:docs-sync`            | CHANGELOG- / OpenAPI- / llm.txt-versioiden yhdenmukaisuuden                                                                                                                                                                   | Kyllä                                  |
| ↳ `check:docs-counts`          | Proosassa olevat lukumäärät (palveluntarjoajien määrä, migraatioiden määrä jne.) ovat todellisten lukujen ratchet-ikkunan sisällä                                                                                             | Kyllä                                  |
| ↳ `check:env-doc-sync`         | Jokainen `.env.example`-tiedoston ympäristömuuttuja on dokumentoitu dokumentaatiotaulukossa ja päinvastoin                                                                                                                    | Kyllä                                  |
| ↳ `check:deprecated-versions`  | Dokumentaatiossa ei ole vanhentuneita versiomerkkijonoja                                                                                                                                                                      | Kyllä                                  |
| ↳ `check:doc-links`            | Dokumentaation sisäiset Markdown-linkit viittaavat oikeisiin tiedostoihin (`[text]`/`(path)`-muoto)                                                                                                                           | Kyllä                                  |
| ↳ `check:fabricated-docs`      | Dokumentaatiossa mainitut reitit, ympäristömuuttujat, CLI-komennot, hook-nimet ja tiedostopolut ovat olemassa koodikannassa. `--strict`-valitsimella tarkistus estää suorituksen; ilman valitsinta se antaa vain varoituksen. | Kyllä (`--strict`-valitsimella CI:ssä) |
| `check:cli-i18n`               | CLI-komentomerkkijonot ovat kaikissa i18n-lokaalitiedostoissa                                                                                                                                                                 | Kyllä                                  |
| `check:openapi-coverage`       | OpenAPI-määritys kattaa vähintään todellisten reittien ratchetoidun vähimmäismäärän                                                                                                                                           | Kyllä                                  |
| `check:openapi-security-tiers` | `openapi.yaml`-tiedoston suojaustasomerkinnät ovat yhdenmukaisia `routeGuard.ts`-luokitusten kanssa                                                                                                                           | **Ohjeellinen**                        |
| `check:openapi-routes`         | Jokainen `openapi.yaml`-tiedoston polku vastaa todellista `route.ts`-tiedostoa (hallusinaatioiden esto)                                                                                                                       | Kyllä                                  |
| `check:docs-symbols`           | Jokainen `docs/**/*.md`-tiedostojen `/api/...`-viittaus vastaa todellista `route.ts`-tiedostoa (hallusinaatioiden esto)                                                                                                       | Kyllä                                  |
| `i18n translation drift`       | i18n-lokaalitiedostojen kääntämättömät avaimet — vain varoitus                                                                                                                                                                | **Ohjeellinen**                        |

`docs/diagrams/`-hakemiston kaksitoista README SVG:tä luodaan automaattisesti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` luo ne kaikki uudelleen). Jokaisella niistä on tavumuotovertailuun perustuva yksikkötesti
(`tests/unit/docs/readme-*-svg.test.ts`, työ `test-unit`), joka epäonnistuu, kun versionhallintaan tallennettu tiedosto on vanhentunut, ja
`check:docs-counts` lukee kanoniset luvut niiden `<text>`-solmuista — siksi ääriviivoitusvaihe pitää jokaisen ääriviivoitetun merkkijonon tiedostossa näkymättömänä `<text>`-elementtinä. SVG:n kanonisten lukujen tarkistus lukee tiedostot, jotka on lueteltu muuttujassa
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` sekä `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`;
free-forever-, catalog-entry-, recurring-pool- ja scoring-factors-väitteet lukevat lisäksi
`promise-pillars.svg`-, `free-tier-budget.svg`- ja `strategies-grid.svg`-tiedostoista. `free-tier-budget.svg`
hakee lukunsa aktiivisesta katalogilataajasta, joten muutos kohteessa `FREE_MODEL_BUDGETS` tai palveluntarjoajan näyttönimessä
rikkoo CI:n, kunnes tiedosto luodaan uudelleen.

### Työ: `i18n-ui-coverage`

| Skripti                           | Vahvistaa                                                                                                                                                                                                                                    | Estävä          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Käyttöliittymän i18n-avainten kattavuus on ≥ 65 %                                                                                                                                                                                            | Kyllä           |
| `check-ui-value-drift` (inline)   | Uudelleenkirjoitettu englanninkielinen **arvo** ei jätä jälkeensä vanhentunutta käännöstä                                                                                                                                                    | Kyllä           |
| `check-new-key-coverage` (inline) | **Uusi** englanninkielinen avain on käännetty kaikilla lokaaleilla — `__MISSING__:`-merkintä hylätään                                                                                                                                        | Kyllä           |
| `check-translation-ratio`         | Lokaalikohtainen todellisten käännösten suhde (englannin kanssa identtiset / paikkamerkki- / puuttuvat lehdet sallittujen poikkeusten ulkopuolella) ei saa ylittää tiedoston `config/quality/i18n-translation-baseline.json` arvoa + joustoa | **Ohjeellinen** |

Vaatii `fetch-depth: 0` — arvopoikkeamien tarkistus vertaa `en.json`-tiedostoa yhdistämiskannan kanssa.

#### `check-ui-value-drift` — vanhentuneiden käännösten tarkistus

Havaitsee yhden i18n-regression, jota muut rakenteelliset tarkistukset eivät voi nähdä: englanninkielinen arvo kirjoitetaan uudelleen, ja _edellisestä_ englanninkielisestä versiosta johdetut käännökset jäävät ennalleen, joten muut kuin englanninkieliset käyttäjät lukevat edelleen itsevarmasti muotoiltua mutta nyt virheellistä tekstiä.

Tämä päätyi oikeasti tuotantoon. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravity-kirjautumisapu otettiin käyttöön (#5203); **39/43 lokaalia** säilytti tekstin, joka kehotti ylläpitäjiä ”kopioimaan koko URL-osoitteen ja liittämään sen alle” — kyseisen palveluntarjoajan kanssa toimimaton työnkulku. Se jäi huomaamatta #8463:een asti, koska:

- `sync-ui-keys` täydentää vain **puuttuvat** avaimet, ei vanhentuneita;
- `check-ui-keys-coverage` laskee avaimen _olemassaolon_, joten vanhentunut käännös lasketaan katetuksi;
- `check-translation-drift` seuraa dokumentaation peilejä `docs/i18n/<locale>/**.md` —
  se ei koskaan lue tiedostoja `src/i18n/messages/*.json`. Estävä tarkistus jobissa `docs-sync-strict` uudelleensynkronoinnista `2026-09` lähtien: muokkaa ydindokumenttia → `npm run i18n:run -- --files=<doc>` (osiotasolla, edullisesti).

**Diff-tietoinen, ei baselineen perustuva.** Se vertaa yhdistämiskohdan `en.json`-tiedostoa työpuuhun; jokaiselle avaimelle, jonka englanninkielinen arvo muuttui, lokalisaatio, jossa on edelleen muuttumaton käännös, on vanhentunut. Tämä jäädyttää tarkoituksellisesti **olemassa olevan velan** — diffistä ei voi selvittää, mistä vanhasta englanninkielisestä tekstistä pitkäaikainen käännös on peräisin, joten tarkistus arvioi vain nykyisen muutoksen koskettamia kohtia. Vaihtoehto (avainkohtainen hash-baseline) maksaisi noin 600 kt:n kokoisen generoidun tiedoston, joka olisi 3× suurin olemassa oleva baseline ja muuttuisi jokaisessa i18n-PR:ssä.

Sen voi täyttää kahdella tavalla:

1. päivitä kyseiset käännökset tai
2. aseta niiden arvoksi `__MISSING__:<new english>` — ajonaikainen järjestelmä tarjoaa tällöin korjatun englanninkielisen tekstin
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ja avain lisätään käännösjonoon.

Jos merkkijonon **merkitys** muuttui, suosi **avaimen nimeämistä uudelleen**: uusi avain ei voi periä vanhentunutta käännöstä. Tätä mallia käytettiin kohdassa #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Poistuu koodilla 0 ja tulostaa `SKIP reason=base-unresolved`, kun baseline-katalogia ei voi lukea (pintaklooni ilman base-ref-viitettä), kuten `check-openapi-breaking`.

### Job: `i18n`

Täysi i18n-validointimatriisi (yksi job lokaalia kohden). Koko job on ohjeellinen.

| Komentosarja                    | Validoi                              | Estävyys                                                 |
| ------------------------------- | ------------------------------------ | -------------------------------------------------------- |
| `validate_translation.py quick` | Käännösten kattavuus lokaalia kohden | **Ohjeellinen** (`continue-on-error: true` koko jobissa) |

### Job: `pr-test-policy`

Suoritetaan vain pull requestien yhteydessä.

| Komentosarja           | Validoi                                                                                                                                                    | Estävyys |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | Tuotantokoodia hakemistoissa `src/`, `open-sse/`, `electron/` tai `bin/` muuttavien PR:ien on sisällettävä testejä tai päivitettävä niitä (kova sääntö #8) | Kyllä    |
| `check:test-masking`   | Muutetut testitiedostot eivät pienennä assert-lausekkeiden nettomäärää eivätkä lisää `assert.ok(true)`-tautologioita                                       | Kyllä    |
| `check:pr-evidence`    | PR:n kuvaus sisältää muutosta koskevaa testi-/VPS-näyttöä (toteuttaa kovan säännön #18 hakemalla PR:n proosasta — hauras, katso Backlog)                   | Kyllä    |

### Job: `test-vitest`

Suoritetaan `build`-jobin jälkeen. Estää yhdistämisen epäonnistumisen tapauksessa.

| Testikokonaisuus | Validoi                                                           | Estävyys                                                                                                                                 |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-palvelin (110 työkalua), autoCombo, välimuisti — vitest-ajuri | Kyllä                                                                                                                                    |
| `test:vitest:ui` | Käyttöliittymäkomponenttien testit — vitest-ajuri                 | **Estävä** — olemassa olevat virheet on nimenomaisesti rajattu pois tiedostossa `vitest.config.ts`; uudet virheet epäonnistuttavat jobin |

### Yöajot (ajastetut, ohjeelliset)

Nämä suoritetaan cron-aikataulun mukaisesti (sekä `workflow_dispatch`-käynnistyksellä), eivät koskaan PR:ien yhteydessä. Kaikki ovat ohjeellisia.

| Työnkulku              | Vahvistaa                                                                                                                                                                                              | Estävä          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `nightly-property`     | fast-check-ominaisuustestit satunnaisella siemenluvulla ja suurella suorituskertamäärällä                                                                                                              | **Ohjeellinen** |
| `nightly-resilience`   | keon kasvun raja, kaaosvikojen injektointi, k6-kuormitus- ja kestotesti                                                                                                                                | **Ohjeellinen** |
| `nightly-llm-security` | promptfoo-injektiosuoja (estotila) + garak-luotaukset (ohitetaan ilman palveluntarjoajan salaisuutta)                                                                                                  | **Ohjeellinen** |
| `nightly-schemathesis` | OpenAPI-sopimuksen fuzz-testaus (schemathesis) käynnissä olevaa OmniRoutea vasten käyttäen tiedostoa `docs/openapi.yaml` — tuo esiin määritysrikkomukset / käsittelemättömät 500-virheet (Vaihe 8 B.4) | **Ohjeellinen** |
| `nightly-mutation`     | Stryker-mutaatiotestauksen pistemäärä fast-yksikkötestiväylässä — eloon jääneet mutantit paljastavat heikot assertit                                                                                   | **Ohjeellinen** |
| `nightly-compat`       | Node-moottorin yhteensopivuusmatriisi tuettujen `engines.node`-alueiden välillä                                                                                                                        | **Ohjeellinen** |

Suorituskyvyn perustasot (heap, TTFB, koontiaika) tallennetaan, mutta ne eivät estä etenemistä: katso [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
