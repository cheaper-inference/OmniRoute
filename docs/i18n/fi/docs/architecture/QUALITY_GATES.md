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

CI- ja Quality Gates -työnkulut tuottavat kumpikin vakaan päätöksen: `Gate / CI` ja
`Gate / Quality`. Niiden versioitu hyväksymiskäytäntö määrittää jokaisen edeltävän työn
pakolliseksi tai neuvoa-antavaksi. Soveltuvan pakollisen työn on onnistuttava: puuttuva,
peruutettu, ohitettu, odottava tai tuntematon tulos ei voi osoittaa PASS-tilaa. Kelvollinen
vain dokumentaatiota tai vain luetteloa koskeva luokitus voi tehdä koodikaistasta soveltumattoman;
luonnostilainen PR ei ole hyväksytty ehdokas. `hotfix`-tunniste ei poista näyttövaatimusta.

Molemmat työnkulut kattavat main/release-haaroihin kohdistuvat PR:t, `main`-haaraan tehtävät
push-toiminnot, manuaaliset käynnistykset ja yhdistämisryhmätapahtumat. Push, käynnistys ja
yhdistämisryhmä suorittavat täyden valinnan. `release/**`-haaroihin tehtävät push-toiminnot
eivät käynnistä niitä (2026-10-18): jokainen muutos on jo suorittanut matriisin PR:nsä yhteydessä,
ja yhdistetty kokonaisuus kuuluu Release-Greenille (`docs/ops/RUNNER_BOX.md` → Isännöity kaista).
Forkit ja yhdistämisryhmät käyttävät isännöityjä ajajia töissä, jotka muutoin valitsisivat itse
isännöidyt ajajat; riittävä isännöity kapasiteetti on varmistettava ennen käyttöönottoa.

Jokainen JSON-kuitti yksilöi uloskuitatun SHA:n, työnkulun suorituksen ja yrityksen.
CLI hylkää uloskuittauksen ja tapahtuman SHA-arvojen ristiriidan. Työnkulkutestit sitovat
käytännön jäsenyyden päätöstyön `needs`-luetteloon, jotta uusi tai poistettu kaista ei voi
kadota huomaamatta. Kuitit kattavat oman työnkulkunsa, eivät julkaisemista, käyttöönottoa tai olemassa olevan neuvoa-antavan skannerin sisäistä toimintaa. Sovellettavien tarkistusten määrittäminen pakollisiksi haarasäännöissä on erillinen hallinnollinen muutos; töiden määrittäminen ei itsessään suojaa haaraa.

`API Route Typecheck` on itsenäinen työnkulun tarkistus, joka ei kuulu kumpaankaan koostettuun lopputulokseen eikä paikallisen täyden tarkkailijan staattiseen profiiliin. Tarkista sen tulos erikseen täsmälliselle ehdokkaalle. `.github/workflows/api-route-typecheck.yml` suoritetaan PR-pyynnöille, joiden kohteena on `main` tai `release/**`, kumpaan tahansa haaraperheeseen tehtäville vienneille sekä manuaalisesta käynnistyksestä. Siinä ei ole polkusuodatinta. PR-pyynnön kohdehaaran vaihtaminen pyytää uuden tarkistuksen; leipätekstin tai otsikon muokkaukset käyttävät vain havainnointiin tarkoitettua nimeä `Admission not requested / API Route Typecheck`, eivätkä ne voi korvata hyväksymistarkistusta. Työnkulku ei määritä yhdistämisryhmän käynnistintä. Jos tämä tarkistus halutaan pakolliseksi yhdistämisjonon käyttöönotossa, sen suorittaminen kyseiselle tapahtumalle on ensin varmistettava.

### Käyttöliittymän suorituskapasiteetti

CI suorittaa koko käyttöliittymäluettelon neljänä `test-vitest`-matriisiosiona, joista
jokaisessa on enintään kaksi työntekijää ja nykyinen 15 minuutin työn määräaika. Ensimmäinen
osio suorittaa myös MCP/autoCombo Vitest -testikokonaisuuden. Pakollisen työn tulos kattaa
matriisin jokaisen osan; yhden osion epäonnistuminen tai peruuttaminen ei voi osoittaa
ehdokkaan hyväksyntää.

Yöllinen tarkkailija säilyttää erillisen täsmällisen ehdokaskuitin kustakin käyttöliittymäosiosta,
mukaan lukien MCP-suorituksen ensimmäisessä kuitissa. Kaikki neljä kuittia, lokit ja vastaavat
suoritustunnisteet vaaditaan. Paikallinen `npm run test:vitest:ui` valitsee edelleen koko
testikokonaisuuden; yksi `--shard`-suoritus on vain osittaista näyttöä.

### Yksikkötestien kattavuuden kerääminen

Kaksitoista yksikkötestiosiota keräävät V8-kattavuuden olemassa olevan testisuorituksensa aikana.
Onnistunut osio suorittaa `scripts/ci/compact-v8-coverage.mjs`-komentosarjan alkuperäisten
tiedostojen pakkaamiseksi luomatta väliaikaista Istanbul-raporttia. Lopullinen Coverage-työ
tarkistaa kaikki kaksitoista manifestia ehdokkaan SHA:ta, suoritusympäristöä, lähdejuurta ja
datan tiivisteitä vasten ja suorittaa sitten c8:n raportointitoiminnot sekä olemassa olevat
kattavuusrajat. Syötteet säilyttävät c8:n yleisen tiedostonimijärjestyksen; osiokohtainen
esiyhdistäminen ei ole turvallista yhdistetylle funktioiden ja lohkojen kattavuudelle.
Puuttuvat, virheelliset tai yhteensopimattomat osiot estävät hyväksynnän. Epäonnistuneet
testiosiot säilyttävät diagnostiikkaan tarkoitetun raakakattavuuden erikseen; sitä ei voi
sisällyttää lopulliseen yhdistämiseen.

### Yksikkötestien suorituksen edistymiskuitit

Jaettu `test:unit:ci:shard`-komento kirjaa `primary`-, `dashboard`- ja `serial`-vaiheet `scripts/ci/unit-progress-reporter.mjs`-skriptin avulla. Normaali testiraportti on edelleen saatavilla. Erillinen, vain metatietoja sisältävä kuitti kirjaa kunkin tiedoston suorituksen alkamisen ja valmistumisen, ja 30 sekunnin välein lähetettävä tilapäivitys luettelee yhä aktiiviset tiedostot ja niiden kuluneen suoritusajan. Se kirjaa vain sallittujen tietojen luetteloon sisältyvät suorituksen metatiedot; testien kuvauksia, tulosteita, virheiden sisältöjä ja koko ympäristöä ei serialisoida.

CI ja Quality säilyttävät JSONL-tiedostot nimillä `unit-progress-ci-<run>-<attempt>-<shard>` ja `unit-progress-quality-<run>-<attempt>-<shard>`. Työn aikakatkaisu voi estää myöhemmän latauksen; jo lähetetyt tilapäivitykset säilyvät diagnostisena aineistona. Puuttuvat tilapäivitykset voivat myös viitata estyneeseen tai keskeytettyyn suorittajaprosessiin. Nämä kuitit säilyttävät nykyisen testivalinnan, rinnakkaisuuden, määräajat ja poistumistilan; ne eivät ole päätöksiä ehdokkaan hyväksymisestä.

### Säilytetyt todisteet hyväksynnän yhteenvetomoduulissa

`scripts/quality/validate-release-acceptance.mjs` kokoaa annetun suunnitelman ja sen manifestit; se ei osoita, että suunnitelma kattaa koko julkaisuputken. Sen raportit asettavat nimenomaisesti arvon `releaseAcceptance: false`, vaikka suunnitelman tila olisi `VERIFIED`. Työnkulku `release-acceptance.yml` käyttää edelleen varjotestidataa eikä todellisia kuitteja koonnista, paketoinnista, käynnistyksestä tai artefaktin siirtämisestä seuraavaan vaiheeseen.

CLI vaatii valitsimen `--evidence-root` säilytettyjen todisteiden tarkistamiseen. Tiedostot etsitään polusta `<evidence-root>/<artifact_id>/<member>`, ja niille lasketaan SHA-256-tiiviste. PASS-tietue ilman todisteita, puuttuva tai muuttunut tiedosto, turvaton polku tai symbolinen linkki estää varmennuksen. Puuttuvat tiedostot eivät vastaa onnistuneiden ajojen tyhjiä lokeja. Nykyiset SHA/run/attempt-tarkistukset pysyvät riippumattomina: samat tavut eivät tee vanhentuneesta kuitista kelvollista. Tiedoston eheys ei todista suorituksen aitoutta eikä artefaktin siirtämistä seuraavaan vaiheeseen.

### Staattisten tarkistusten luettelo

Versioitu npm-aliasluettelo ja staattisten tarkistusten jäsenyys sijaitsevat tiedostossa
`config/quality/gate-manifest.json`. Suorita `npm run check:gate-manifest` vahvistaaksesi
komentosarjojen nimet ja täsmälliset komennot `package.json`-tiedostoa vasten; lisäykset,
poistot ja komentojen poikkeamat aiheuttavat epäonnistumisen sekä paikallisessa koukussa
että CI:n muutosluokittelutöissä. Alias ei ole työnkulkutyö, matriisi-instanssi eikä
testitapaus: näitä lukumääriä ei saa esittää keskenään vaihdettavina.

Käytä komentoa `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list`
tarkastellaksesi valittuja aliaksia suorittamatta niitä. Ajaja kutsuu npm-aloituspistettä,
joten sen suoritusympäristö säilyy, mukaan lukien Bun, kun se on määritetty. Manifesti
kirjaa näiden profiilien ulkopuoliset aliakset erikseen kutsuttaviksi, ja ylläpitokomennot
on kielletty vain luku -tilassa toimivissa tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen tarkistuksen. Ne eivät sertifioi tuotetestejä,
kattavuutta, paketointia, ulkoisia tarkistuksia tai ehdokkaan täydellistä julkaisuhyväksyntää.
Työnkulun hyväksyntä käyttää linkitettyä `config/quality/admission-policy.json`-tiedostoa ja
`scripts/quality/admission-verdict.mjs`-komentosarjaa. Julkaisutarkkailijan profiilit pysyvät
erillisinä; tarkista niiden soveltuvat tarkistukset ja kuitit itsenäisesti. Täyden tarkkailijan
staattiset komennot on määritetty tiedostossa `config/quality/release-green-static-profile.json`,
mukaan lukien `audit:deps`, mutaatiotestien valinta ja käännöstarkistukset. Lataaja tarkistaa
npm-komennot package.json-tiedostoa ja mallinnettuja CI/Quality-määrityksiä vasten; se hylkää
poikkeamat sen sijaan, että suorittaisi komentotulkin tokeneita argumentteina. Pakollisen
tarkistimen SKIP/INCOMPLETE-tuloste ei voi osoittaa PASS-tilaa. Profiili kirjaa ulkoiset
rajauksensa eikä korvaa isännöidyn ympäristön kattavuutta, testimatriiseja, paketti- tai
käyttöönottonäyttöä. Alla oleva sanallinen luettelo on viite, ei todiste siitä, että portti
todella suoritettiin.

Komentosarjat sijaitsevat hakemistoissa `scripts/check/` (käytäntöportit) ja
`scripts/quality/` (räikkämekanismi). CI:n ensisijainen totuuslähde on
`.github/workflows/ci.yml`.

### Julkaistun perustan dokumentaation tila

`.github/workflows/i18n-base-health.yml` tarkkailee dokumentaation tilaa valittujen
`main`- ja `release/v*`-haaroihin tehtyjen puskemisten jälkeen sekä manuaalisesti käynnistettäessä. Sen suodattimet kattavat dokumentaation,
juuritason Markdown-tiedostot, `llm.txt`-tiedoston, käännösten tilan ja määritykset sekä asiaankuuluvat i18n-työkalut.
Ainoa `Published base documentation health` -työ käyttää isännöityä Ubuntua ja viiden minuutin
aikarajaa. Se suorittaa vain luku -muotoisen validoinnin ja kirjoittaa diagnostisen tositteen ilman
riippuvuuksien asennusta, kääntämistä tai tilan käyttöönottoa.

`scripts/i18n/check-base-health.mjs` edellyttää, ettei lähdehajautteissa ole ristiriitoja eikä
puuttuvia kohteita, kohdehajautteiden ristiriitoja, vanhentuneita käännöksiä tai osiovälimuistin epäjohdonmukaisuuksia. Se validoi myös nykyisen ydindokumenttien ja kielialueiden
laajuuden sekä sen tallennetun alkuperän. Virheellinen konteksti, puutteellinen kattavuus
tai keskeytynyt tarkistus tuottaa tuloksen `INCOMPLETE`; vahvistettu poikkeama tuottaa tuloksen `FAIL`. Molemmat
palauttavat epäonnistumista ilmaisevan poistumistilan. Tosite sidotaan uloskuitatun version SHA-tunnisteeseen, työnkulkuun, suoritukseen ja
yritykseen, ja se säilytetään nimellä `i18n-base-health-<sha>-<run>-<attempt>`.

Tämä on julkaistun perustan riippumaton tarkkailu. Se ei lisää PR- tai
merge-group-tapahtumaa, pakollista PR-tarkistusta, npm-aliasta eikä static-scan-profiilin jäsentä.
Nykyinen PR-muutosten käytäntö ja taustalla olevan tarkistimen neuvoa-antavat luokitukset
pysyvät erillisinä. Onnistunut lataus ei voi muuttaa epäonnistunutta tilatulosta tulokseksi PASS.

### Julkaisu-PR:n pikapolku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI:tä main/release-haaroihin kohdistuvissa PR:issä,
`main`-haaraan tehtävissä push-toiminnoissa, manuaalisissa käynnistyksissä ja yhdistämisryhmissä.
PR:t käyttävät polkujen perusteella suodatettuja pikatarkistuksia. Pysyvästi käytöstä poistettu
päällekkäinen koonti poistettiin; varsinaiset koonti-, paketointi- ja käynnistystarkistukset
säilyvät CI:ssä.

| Tehtävä                                          | Laajuus                                                                                                                                                                                                                                                                            | Estävä                |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Dokumentaatio- ja koodimuutosten PR:t; API-dokumentaation viittaukset ja docs-all                                                                                                                                                                                                  | Kyllä                 |
| `Fast Quality Gates`                             | Koodimuutosten PR:t; staattiset tarkistukset, tyyppitarkistus, hallintapaneelin tyyppitarkistus ja muutosten vaikutuspiiriin kuuluvat yksikkötestit                                                                                                                                | Kyllä                 |
| `Forgotten sibling tests`                        | Koodimuutosten PR:t; muuttuneista moduuleista jäljitetään staattiset käyttäjät ja ehdolla olevat rinnakkaistestit; barrel- ja dynaamisten tuontien polut raportoidaan neuvoa-antavina diagnostiikkatietoina, ja viitatut sallittujen poikkeusten luettelon poikkeukset huomioidaan | **Neuvoa-antava**     |
| `Vitest (fast-path)`                             | Koodimuutosten PR:t; nopea vitest-testikokonaisuus                                                                                                                                                                                                                                 | Kyllä                 |
| `Unit Tests fast-path`                           | Koodimuutosten PR:t; neljään osaan jaettu yksikkötestikokonaisuus                                                                                                                                                                                                                  | Kyllä                 |
| `No new ESLint warnings`                         | Koodimuutosten PR:t; vaimennukset huomioiva lint-tarkistus                                                                                                                                                                                                                         | Kyllä, myös forkeissa |
| `Merge integrity (changelog + generated skills)` | Muut kuin luonnos-PR:t; muutoslokin ja luotujen taitojen synkronointi                                                                                                                                                                                                              | Kyllä, myös forkeissa |

#### Unohdettujen rinnakkaistestien raportti

`npm run check:forgotten-sibling-tests` käyttää uudelleen testien vaikutuskartan taustalla olevaa tuontien selvitystoimintoa.
Jokaisesta muuttuneesta tuotantomoduulista se raportoi deterministiset
`changed module/symbol -> static consumer -> candidate sibling test`-ketjut, kun ehdolla oleva
testi puuttuu pull requestin diffistä. Markdown-yhteenveto ja JSON-tulos säilytetään
`forgotten-sibling-tests`-työnkulun artefaktina kalibrointia varten ennen estävän tarkistuksen käyttöönottoa.

Barrel-uudelleenviennit ja dynaamiset tuonnit ovat vain selvitysdiagnostiikkaa; ne eivät koskaan muodosta
estävää havaintoa. Tarkistetut poikkeukset sijaitsevat tiedostossa
`config/quality/forgotten-sibling-allowlist.json`. Jokaisessa merkinnässä on nimettävä käyttäjä ja ehdolla oleva
testi, annettava täsmällinen perustelu sekä linkitettävä GitHub-issueen tai pull requestiin. Virheellisesti muodostetut merkinnät aiheuttavat
tarkistuksen epäonnistumisen. Poikkeuksilla ei voi ohittaa poistettua ehdolla olevaa testiä tai diffiä, joka lisää `.skip`/`.todo`-merkinnän;
väitteiden heikentäminen ja muu peittely kuuluvat itsenäisesti estävälle
`check:test-masking`-tarkistukselle.

### Tehtävä: `lint`

Suoritetaan jokaiselle `main`-haaraan kohdistuvalle PR:lle. Epäonnistuminen estää yhdistämisen.

| Skripti (`npm run ...`)           | Tarkistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Estävä                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js-versio on tuetulla alueella                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                       |
| `check:test-tla-order`            | Yksikään `tests/unit`-hakemiston `node:test`-tiedosto ei rekisteröi testiä, suorita ylätason `await`-lausetta ja rekisteröi sen jälkeen lisää testejä (#18045; räikkä: `test-tla-order-allowlist.json` voi vain pienentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:cycles`                    | Kehämäiset tuonnit koko `src/`- ja `open-sse/`-hakemistoissa (AST-pohjainen, tsconfig-määrityksen `paths` selvitetään). Paljas komento palauttaa poistumiskoodin 1 aina, kun jokin kehä on olemassa (suljetusti epäonnistuva ongelmasta #15281 lähtien), ja luettelee vahvasti yhtenäiset komponentit (SCC). `check:cycles:ratchet` (jonka CI suorittaa) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.cycles`-ylärajan — tällä hetkellä 14, `direction: down`, joten se voi vain laskea (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä (räikkä)                              |
| `check:boundary`                  | `open-sse → src` -kytkentä: yksilölliset tiedostojen väliset tuonnit moottorista sovellukseen (`scripts/quality/measure-boundary.mjs`; reunaluettelo on v4:n ydin-/moduulijaon korjausjono). Paljas komento = neuvoa-antava raportti (sama kuin `quality:boundary`). `check:boundary:ratchet` (jonka CI suorittaa ja joka on myös `quality.yml`-tiedoston nopeiden tarkistusten räikkäsilmukassa) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.boundaryOpenSseToSrc`-ylärajan — alustettu mitattuun arvoon 771, `direction: down`; `--update` vain alentaa sitä; PR-pyynnöissä suhteessa kantaversioon (`--base-ref`, katso alta)                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä (räikkä)                              |
| `check:route-validation:t06`      | Zod-skeemat ovat käytössä kaikilla reiteillä (tason 6 käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any`-merkintöjen määrä ei ylitä budjettia (tason 11 tarkistusportti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                       |
| `check:provider-consistency`      | Jokaisella tiedoston `providers.ts` palveluntarjoajalla on vastaava merkintä tiedostossa `providerRegistry.ts` (ja päinvastoin sallittujen luettelon rajoissa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `check:model-lifecycle`           | Kolme manuaalisesti ylläpidettävää reititystaulukkoa pysyvät yhdenmukaisina versionhallintaan tallennetun elinkaaritilannevedoksen (#11503) kanssa: `FITNESS_TABLE` (`taskFitness.ts`) ei pisteytä yhtäkään käytöstä poistettua tunnistetta, jonka `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES`-kohde on mukana kohteessa `REGISTRY` eikä esiinny käytöstä poistettujen tunnisteiden tilannevedoksessa; jokainen käytöstä poistettu tunniste, joka on edelleen kohteessa `REGISTRY`, uudelleenohjataan tai luetellaan kohdassa `allowedRetiredInCatalog`; eikä yksikään `DEFAULT_DEGRADATION_MAP`-lähde tai -kohde näy käytöstä poistettuna kyseisessä tilannevedoksessa. Tämä ei todista, että käytössä oleva ylävirran palvelu tarjoaa mallia tällä hetkellä. Offline-tarkistus — vertaa tiedostoon `config/quality/model-lifecycle.json`, joka päivitetään manuaalisesti komennolla `npm run quality:refresh-model-lifecycle` (vaatii verkkoyhteyden; ei ole kytketty CI:hin). `allowedRetiredInCatalog` on asteittain pienennettävä rajoitin: lisää merkintä vain, jos sille on seurantatehtävä. | Kyllä                                       |
| `check:fetch-targets`             | Jokainen asiakaspuolen hakemistossa `src/` oleva `fetch("/api/...")` viittaa todelliseen `route.ts`-tiedostoon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                       |
| `check:deps`                      | Kaikki repositorion jokaisen `package.json`-tiedoston komennolla `npm install` asennettavissa olevat riippuvuudet ovat tiedostossa `dependency-allowlist.json`; uudet versioon sitomattomat tai kirjoitusvirhepaketteihin perustuvat riippuvuudet merkitään                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `audit:deps`                      | Kaikkien viiden itsenäisen lukitustiedoston npm-auditointi (juuri, Electron, OpenCode-liitännäiset v1/v2 ja palveluntarjoaja). Kriittiset tietoturvailmoitukset estävät etenemisen; korkean vakavuustason ilmoitukset säilyvät näkyvinä varoituksina. Puuttuvat tai epäonnistuneet auditoinnit merkitään tilaan INCOMPLETE, ja ne estävät etenemisen; laajuuskohtaiset lukitustiedostojen tiivisteet ja raportit säilytetään.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `check:lockfile`                  | `package-lock.json`-tiedoston eheys — https-rekisteri, eheystiivisteet, ei isäntäkohtaisia ohituksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Kyllä                                       |
| `check:licenses`                  | Tuotantoriippuvuuksien SPDX-lisenssien sallittujen luettelo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                       |
| `check:tracked-artifacts`         | Ei koontiartefakteja tai versionhallintaan lisättyjä `node_modules`-symbolisia linkkejä (suoritetaan myös husky pre-commit -vaiheessa; pre-push on tarkoituksella kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `check:ai-attribution`            | Ei tekoälyn tai botin `Co-Authored-By`-lopuketta eikä tekoälyllä luodusta sisällöstä kertovaa alatunnistetta PR:n commiteissa, otsikossa tai tekstissä — ehdoton sääntö #16 (`quality.yml`-tiedoston nopeiden tarkistusten silmukassa PR→`release/**` — lukee tapahtuman hyötykuorman eikä tee mitään PR:ien ulkopuolella — sekä vain PR:ille suoritettavana vaiheena `ci.yml`-tiedoston lint-tarkistuksessa PR→`main`; myös husky `commit-msg` -koukussa; ihmiskirjoittajat sallitaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                             |
| `check:vitest-exclusions`         | Jokainen Vitest-poissulku nimeää seurantaongelman ja esiintyy tiedostossa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                       |
| `check:file-size`                 | Lähdetiedostot (`.ts`/`.tsx` hakemistoissa `src/`, `open-sse/`, `electron/`, `bin/`) pysyvät `cap`-rajan sisällä ja testitiedostot (`*.test.ts(x)`) `testCap`-rajan sisällä; tiedostossa `file-size-baseline.json` jäädytetyt tiedostot (`frozen` / `testFrozen`) eivät saa kasvaa tallennettua kokoaan suuremmiksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                       |
| `check:error-helper`              | Suorittimien/käsittelijöiden virhevastaukset käyttävät funktioita `buildErrorBody()` / `sanitizeErrorMessage()` (ehdoton sääntö nro 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Kyllä                                       |
| `check:migration-numbering`       | Migraatioiden SQL-tiedostot on numeroitu peräkkäin ilman aukkoja tai päällekkäisiä numeroita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                       |
| `check:public-creds`              | Literaaleja OAuth-arvoja `client_id`/`client_secret` tai Firebase Web -avaimia ei ole tiedoston `publicCreds.ts` ulkopuolella (ehdoton sääntö nro 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                       |
| `check:db-rules`                  | Raakaa SQL:ää ei ole moduulien `src/lib/db/` ulkopuolella; koontituonteja tiedostosta `localDb.ts` ei käytetä (ehdottomat säännöt nro 2 ja 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                       |
| `check:known-symbols`             | Välitystauluihinsa rekisteröidyt palveluntarjoajien suorittimet, reititysstrategiat ja muuntimet vastaavat levyllä olevia tiedostoja — irrallisia tai määrittelemättömiä symboleja ei ole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                       |
| `check:route-guard-membership`    | Jokainen aliprosessin käynnistävä reitti on luokiteltu funktiolla `isLocalOnlyPath()` (ehdottomat säännöt #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                       |
| `check:test-discovery`            | Jokainen repositorion `*.test.ts`- / `*.spec.ts`-tiedosto on vähintään yhden testiajon suorittajan keräämä (räikkämekanismi: `test-discovery-baseline.json`-tiedoston orpojen luettelo voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                       |
| `check:agent-skills-sync`         | Luodut agenttitaitojen artefaktit vastaavat lähdeluetteloaan (ei poikkeamia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Palveluntarjoajien logoilla/resursseilla on kirjattu alkuperätieto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON-määritystiedostojen jäsennys onnistuu, ja ne täyttävät repositorion lint-säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript-käännös ilman virheitä (vain ohjeellisia varoituksia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                       |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — tulevaisuuteen suuntautuva; monet olemassa olevat kutsukohdat tarvitsevat edelleen annotaatioita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Ohjeellinen** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, jonka kohteena on `src/app/(dashboard)/**` (#7033) — `typecheck:core`:n kuratoitu 27 tiedoston sallittujen luettelo ei sisällä yhtään hallintapaneelin TSX-tiedostoa, eikä `next build` myöskään koskaan tee sille tyyppitarkistusta (`next.config.mjs` määrittää `ignoreBuildErrors: true`), joten irrallisiin tunnisteisiin liittyvät regressiot siellä (#6625/#6909) eivät näkyneet CI:ssä. Vertaa jäädytettyyn tiedostokohtaiseen ja TS-koodikohtaiseen lukumäärien vertailutasoon (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentuneisuuden valvontamalli kuin komennolla `check:known-symbols`) — vain vertailutasoon sisällytetyn määrän ylittävät UUDET virheet hylkäävät portin; alenna vertailutasoa valitsimella `--update`, kun aiempi virhe on korjattu.                                                                                                                                                                                                                                                                                                                | Kyllä                                       |

### Työ: `quality-gate`

Suoritetaan työn `test-coverage` jälkeen. Estää yhdistämisen epäonnistuessaan.

| Skripti                      | Tarkistaa                                                                                                                                                                            | Estävä                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `quality:collect`            | Tuottaa tiedoston `quality-metrics.json` (ESLint-varoitusten määrä, kattavuus yhdistetystä osaraportista)                                                                            | Kyllä (ennen räikkää) |
| `quality:ratchet`            | Mikään tiedoston `quality-baseline.json` mittari ei ole heikentynyt (ESLint-varoitukset ≤ vertailutaso; kattavuus ≥ vertailutaso)                                                    | Kyllä                 |
| `check:duplication`          | Koodin päällekkäisyys (jscpd@4) ei ylitä tiedostossa `quality-baseline.json` määritettyä vertailutasoa                                                                               | Kyllä                 |
| `check:complexity`           | Tiedostotason syklomaattinen kompleksisuus ei ylitä ylärajaa (ESLint-ytimen `complexity` + `max-lines-per-function`)                                                                 | Kyllä                 |
| `check:cognitive-complexity` | Kognitiivisen kompleksisuuden räikkä (`eslint-plugin-sonarjs`) — erillinen ESLint-ajo; CI suorittaa molemmat yhdistettynä yhtenä `check:complexity-ratchets`-vaiheena                | Kyllä                 |
| `check:dead-code`            | Käyttämättömien vientien/tiedostojen räikkä (knip) ei heikkene vertailutasoon nähden                                                                                                 | Kyllä                 |
| `check:compression-budget`   | Pakkauksen suorituskykytestin budjetti — moottorikohtaiset token-säästöjen vähimmäisrajat eivät saa heikentyä                                                                        | Kyllä                 |
| `check:type-coverage`        | Tyypitetyn osuuden räikkä (`type-coverage`) ei heikkene; korvaa suurelta osin tarkistuksen `typecheck:noimplicit:core`                                                               | Kyllä                 |
| `check:codeql-ratchet`       | Avoimien CodeQL-hälytysten määrä ei kasva (lukee komennolla `gh api`; ohitetaan hallitusti ilman tunnistetta) — päivitystiheys ja manuaalinen käynnistys: katso alta "CodeQL-räikkä" | Kyllä                 |

### Työ: `quality-extended`

Työ estää soveltuvat ehdokkaat. Paketin koko, salaisuuslöydökset, haavoittuvuuslöydökset,
työnkulkulöydökset ja OpenAPI-muutokset tarkistetaan pakollisilla räikillä.
Kehämäisten riippuvuuksien diagnostiikka on edelleen neuvoa-antava. Tarkistustyökalujen asennus on pakollinen:
`scripts/ci/install-quality-scanners.sh` asentaa kiinnitetyt versiot ja välittää
asennusvirheet eteenpäin. Puuttuvat työkalut, virheelliset raportit tai puuttuvat vertailutasot jättävät
pakollisen tarkistusportin tilaan INCOMPLETE.

| Skripti                  | Tarkistaa                                                                                                                                                                                                                                                            | Estävyys                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Ei kehämäisiä riippuvuuksia (dpdm)                                                                                                                                                                                                                                   | **Ohjeellinen**                                 |
| `check:bundle-size`      | Paketin koko ei ylitä ylärajaa; mittauksen puuttuminen aiheuttaa epäonnistumisen                                                                                                                                                                                     | **Estävä valitsimella --ratchet**               |
| `check:secrets`          | Gitleaks-havainnot eivät lisäänny; pakolliset tarkistukset hylkäävät puuttuvat työkalut, lähdekoodin tai vertailutason sekä epäonnistuneet tarkistukset ja virheelliset raportit                                                                                     | **Estävä valitsimella --ratchet**               |
| `check:vuln-ratchet`     | Riippuvuuksien haavoittuvuudet eivät lisäänny; pakolliset tarkistukset hylkäävät puuttuvat työkalut, virheelliset raportit tai puuttuvat vertailutasot                                                                                                               | **Estävä valitsimella --ratchet**               |
| `check:workflows`        | Työnkulkujen lint-tarkistus (actionlint + zizmor); puuttuvat tai rikkinäiset tarkistimet, virheelliset raportit tai puuttuva ratchet-vertailutaso epäonnistuvat tilalla INCOMPLETE. Kelvollisiin havaintoihin sovelletaan valittua strict/advisory/ratchet-käytäntöä | Suoritus vaaditaan; zizmor-ratchet estää CI:ssä |
| `check:openapi-breaking` | Julkisen API-sopimuksen vertailu kiinnitettyihin tapahtumien committeihin (PR:n merge-base, push-tapahtuman before, merge-groupin base; ajastetussa/manuaalisessa ajossa checkoutin ensimmäinen parent); pakollisen mittauksen epäonnistuessa pääsy estetään         | **Estävä valitsimella --ratchet**               |

### Työ: `docs-sync-strict`

Kun pull request kohdistuu haaraan `main` tai `release/**`, tämä työ suoritetaan vain ehdokkaille, jotka eivät ole luonnoksia (tai jotka tulevat luotetusta jonosta) ja jotka on luokiteltu dokumentaatio- tai koodimuutoksiksi. Työ suoritetaan myös CI-tapahtumissa, jotka eivät liity PR:ään; tämän työnkulun push-käynnistin kattaa vain haaran `main`, ei haaroja `release/**`. Vaihe, jonka paluukoodi on muu kuin nolla, estää työn onnistumisen; pelkästään raportoitavat havainnot ja alla dokumentoidut poikkeukset eivät estä sitä.

| Skripti                        | Tarkistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Estävyys                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metaportti, joka suorittaa alla olevat seitsemän aliporttia peräkkäin                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                                                                                                                              |
| ↳ `check:docs-sync`            | Paketin, OpenAPI:n ja CHANGELOGin versioiden yhdenmukaisuus, `llm.txt`-tiedoston täsmälliset peilikopiot, käännetyn CHANGELOGin osio- ja kokoinvariantit sekä korvattujen päällekkäisten dokumenttien puuttuminen                                                                                                                                                                                                                                                                                                                                 | Kyllä                                                                                                                                              |
| ↳ `check:docs-frontmatter`     | Käännetyillä dokumentaatiosivuilla on kelvolliset frontmatter-otsikot                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                                                                                                                              |
| ↳ `check:docs-counts`          | Luotettavat lukumääräinvariantit tarkistetaan tiukasti; heuristiset tiedostomäärien tarkistukset antavat vain varoituksia, ellei skriptille anneta valitsinta `--strict` (CI:n metaportti ei anna sitä)                                                                                                                                                                                                                                                                                                                                           | Tiukka taso on estävä; pehmeä taso on ohjeellinen                                                                                                  |
| ↳ `check:env-doc-sync`         | Lähdekoodissa tehtävät ympäristömuuttujien lukemiset, `.env.example` ja `docs/reference/ENVIRONMENT.md` vastaavat toisiaan, kun on sovellettu nimenomaisia poikkeuslistoja ohitettaville, vain dokumentaatiossa oleville ja vain ympäristössä oleville muuttujille                                                                                                                                                                                                                                                                                | Kyllä, dokumentoitujen poikkeuslistojen ulkopuolella                                                                                               |
| ↳ `check:deprecated-versions`  | Raportoi mahdollisesti vanhentuneet versiot turvallisten historiallisten asiayhteyksien ulkopuolella sekä vanhentuneet päivityspäivämäärät; ohitettavat dokumentit jätetään pois                                                                                                                                                                                                                                                                                                                                                                  | Ohjeellinen nykyisessä CI-kytkennässä (`--strict`-valitsinta ei anneta)                                                                            |
| ↳ `check:doc-links`            | Dokumentaation sisäiset markdown-linkit viittaavat olemassa oleviin tiedostoihin (`[text]`/`(path)`-muodossa)                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                                                                                                                              |
| ↳ `check:fabricated-docs`      | Dokumentaatiossa mainitut reitit, ympäristömuuttujat, CLI-komennot, hook-nimet ja tiedostopolut ovat olemassa koodikannassa. Tiukka portti valitsimella `--strict`; ilman valitsinta epäonnistuminen on pehmeä.                                                                                                                                                                                                                                                                                                                                   | Kyllä (CI:ssä valitsimella `--strict`)                                                                                                             |
| `check:cli-i18n`               | CLI:n käyttämät `t()`-avaimet ovat olemassa kielessä `en`; `pt-BR` säilyttää jokaisen ylimmän tason osion; kielet `zh-CN` ja `zh-TW` sisältävät kaikki kielen `en` avaimet                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                                                                                                                              |
| `check:openapi-coverage`       | OpenAPI-määritys kattaa vähintään ratchet-perustasoisen osuuden todellisista reiteistä                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                                                                                                                              |
| `check:openapi-security-tiers` | Ilmoitettujen `x-loopback-only`/`x-always-protected`-annotaatioiden on perustuttava tiedoston `routeGuard.ts` toimintaan; jäsennysvirheet ja eteenpäin suuntautuvan tarkistuksen ristiriidat estävät onnistumisen. Käänteinen tarkistus varoittaa puuttuvasta `x-loopback-only`-annotaatiosta vain paikallisen käytön sallivien etuliitteiden alla, eikä käänteiseen tarkistukseen sisälly vain reittikuvioiden perusteella määriteltyjä reittejä.                                                                                                | Jäsennys- ja eteenpäin suuntautuvat tarkistukset ovat estäviä; käänteinen tarkistus on ohjeellinen                                                 |
| `check:openapi-routes`         | Jokainen tiedoston `openapi.yaml` polku `/api...` vastaa todellista reittiä parametrien eroista riippumatta, kun perusteltua `KNOWN_STALE_SPEC`-poikkeuslistaa on sovellettu; myös poikkeuslistan vanhentuneet merkinnät aiheuttavat epäonnistumisen                                                                                                                                                                                                                                                                                              | Kyllä                                                                                                                                              |
| `check:docs-symbols`           | Kanonisten, muiden kuin peilidokumenttien sisäiset `/api/...`-URL-viittaukset vastaavat todellista reittiä tai reittiperhettä; välityspalvelin-, taustapalvelin-, paikkamerkki- ja tiedostoviittaukset sekä perustellut `KNOWN_STALE_DOC_REFS`-merkinnät jätetään pois, ja vanhentuneet poikkeuslistamerkinnät aiheuttavat epäonnistumisen                                                                                                                                                                                                        | Kyllä                                                                                                                                              |
| `i18n translation drift`       | Tarkistaa keskeisten dokumenttien lähde-/kohdetiivisteet ja käännöksen alkuperän. PR-vertailu sallii vain identtiset perityt virheet; uudet tai varmentamattomat lähteen, puuttuvan kohteen, kohdetiivisteen, vanhentuneen käännöksen tai osiovälimuistin ristiriidat estävät etenemisen. PR-vertailun ulkopuolella lähteen/puuttuvan kohteen/kohdetiivisteen virheet estävät etenemisen, kun taas vanhentuneet käännökset ja ristiriitaiset osiovälimuistit jäävät vain varoituksiksi. Vanhanmuotoisen osiovälimuistin puuttuminen ei ole virhe. | Uusi/varmentamaton PR-poikkeama estää etenemisen; identtinen peritty poikkeama on vain varoitus; PR:n ulkopuoliset säännöt riippuvat virhetyypistä |

### Työ: `i18n-ui-coverage`

| Skripti                             | Tarkistaa                                                                                                                                                                                                                               | Estävä     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (sisäinen) | Käyttöliittymän i18n-avainten kattavuus on ≥ 65 %                                                                                                                                                                                       | Kyllä      |
| `check-ui-value-drift` (sisäinen)   | Uudelleenkirjoitettu englanninkielinen **arvo** ei jätä jälkeensä vanhentuneita käännöksiä                                                                                                                                              | Kyllä      |
| `check-new-key-coverage` (sisäinen) | **Uusi** englanninkielinen avain on käännetty kaikilla kielialueilla — `__MISSING__:`-merkintää ei hyväksytä                                                                                                                            | Kyllä      |
| `check-translation-ratio`           | Todellisten käännösten osuus kielialueittain (englannin kanssa identtiset / paikkamerkit / sallittujen luettelon ulkopuolelta puuttuvat lehtiarvot) ei saa ylittää arvoa `config/quality/i18n-translation-baseline.json` + liikkumavara | **Estävä** |

Edellyttää asetusta `fetch-depth: 0` — arvon muuttumisen portti vertaa tiedostoa `en.json` yhdistämiskantaan.

#### `check-ui-value-drift` — vanhentuneiden käännösten portti

Havaitsee sen yhden i18n-regression, jota muut portit eivät rakenteellisesti pysty havaitsemaan: englanninkielinen arvo
kirjoitetaan uudelleen, mutta _aiemmasta_ englanninkielisestä arvosta johdetut käännökset jäävät ennalleen, joten
muunkieliset käyttäjät lukevat edelleen vakuuttavasti muotoiltua mutta nyt virheellistä tekstiä.

Tämä päätyi oikeasti julkaisuun. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravityn
kirjautumisavustaja lisättiin (#5203); **39 kielialuetta 43:sta** säilytti tekstin, joka kehotti ylläpitäjiä "kopioimaan
koko URL-osoitteen ja liittämään sen alle" — työnkulku ei voi valmistua kyseisellä palveluntarjoajalla. Ongelmaa
ei huomattu ennen muutosta #8463, koska:

- `sync-ui-keys` täydentää vain **puuttuvat** avaimet, ei koskaan **vanhentuneita**;
- `check-ui-keys-coverage` laskee avaimen _olemassaolon_, joten vanhentunut käännös lasketaan katetuksi;
- `check-translation-drift` seuraa hakemiston `docs/i18n/<locale>/**.md` dokumentaatiopeilejä —
  se ei koskaan lue tiedostoja `src/i18n/messages/*.json`. Estävä työssä `docs-sync-strict` uudelleensynkronoinnista
  2026-09 lähtien: muokkaa ydindokumenttia → `npm run i18n:run -- --files=<doc>` (osiotasoinen ja kevyt).

**Huomioi muutokset, ei perustu perustasoon.** Se vertaa yhdistämiskannan tiedostoa `en.json`
työpuuhun; jokaisen avaimen kohdalla, jonka englanninkielinen arvo muuttui, kaikki kielialueet, joissa on edelleen
muuttamaton käännös, ovat vanhentuneita. Tämä tarkoituksellisesti **jäädyttää olemassa olevan velan** — muutosvertailu
ei voi paljastaa, mistä vanhasta englanninkielisestä arvosta pitkään käytössä ollut käännös on peräisin, joten portti arvioi
vain nykyisen muutoksen koskettamia kohtia. Vaihtoehto (avainkohtainen hajautusarvojen perustaso) vaatisi
noin 600 kt:n generoidun tiedoston, joka olisi kolme kertaa suurinta nykyistä perustasoa suurempi ja muuttuisi jokaisessa i18n-PR:ssä.

Sen voi läpäistä kahdella tavalla:

1. päivitä kyseiset käännökset tai
2. aseta niiden arvoksi `__MISSING__:<new english>` — suoritusympäristö tarjoaa tällöin korjatun englanninkielisen tekstin
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ja avain lisätään käännösjonoon.

Jos merkkijonon **merkitys** muuttui, suosi **avaimen uudelleennimeämistä**: uusi avain ei voi periä
vanhentunutta käännöstä. Tätä mallia käytettiin muutoksessa #8463.

```bash
npm run i18n:check-value-drift          # tiukka (CI käyttää tätä)
npm run i18n:check-value-drift:warn     # vain raportointi
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Arvopoikkeaman ja uusien avainten portit käyttävät samaa muuttumatonta vertailua
tiedostosta `scripts/i18n/resolve-ui-diff-base.mjs`. Työnkulku välittää saman vertailupohjan, pohjan kärjen ja
ehdokkaan SHA-tunnisteet molemmille tarkistuksille. PR:n tai vertailupohjan uudelleenkohdistuksen, push-tapahtuman ja merge group -ajon yhteydessä käytetään kyseisen tapahtuman
kontekstia. Ehdokashaaran manuaalinen käynnistys edellyttää sen täsmällistä avointa PR:ää tai nimenomaista
`i18n_base_sha`-syötettä. `main`- tai `release/vX.Y.Z`-haaran manuaalinen tai ajastettu tarkastelu
ilman kyseistä syötettä vertaa viimeistä committia sen ensimmäiseen vanhempaan; se ei tarkasta
kaikkea periytynyttä käännösvelkaa. Paikallinen suoritus edellyttää nimenomaista vertailupohjaa,
esimerkiksi yllä olevaa `BASE_REF`-komentoa.

Puuttuva tai moniselitteinen vertailukonteksti, lukukelvoton tai virheellinen pakollinen luettelo sekä
suorituksen aikana muuttunut ehdokas tuottavat tuloksen `INCOMPLETE` ja poistumiskoodin **2**, myös varoitustilassa.
Luettelot luetaan tiedostolla `scripts/i18n/read-ui-catalog.mjs`; lukuvirheitä ei korvata
tyhjillä objekteilla. Vertailupohjan puuttuminen tai epätäydellinen syöte eivät kumpikaan tuota tulosta PASS.

### Työ: `i18n`

Täysi i18n-tarkistusmatriisi (yksi työ kielialuetta kohden). Koko työ on neuvoa-antava.

| Skripti                         | Tarkistaa                                 | Estävä                                                    |
| ------------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Käännöksen täydellisyyden kielialueittain | **Neuvoa-antava** (`continue-on-error: true` koko työssä) |

### Työ: `pr-test-policy`

Suoritetaan vain vetopyynnöille.

| Skripti                | Tarkistaa                                                                                                                                                        | Estävä |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | PR:t, jotka muuttavat tuotantokoodia hakemistoissa `src/`, `open-sse/`, `electron/` tai `bin/`, sisältävät uusia tai päivitettyjä testejä (tiukka sääntö #8)     | Kyllä  |
| `check:test-masking`   | Muutetut testitiedostot eivät vähennä assert-lauseiden nettomäärää eivätkä lisää `assert.ok(true)`-tautologioita                                                 | Kyllä  |
| `check:pr-evidence`    | PR:n kuvaus sisältää muutosta koskevaa näyttöä testeistä/VPS:stä (automatisoi tiukan säännön #18 etsimällä ilmauksia PR:n tekstistä — hauras, katso kehitysjono) | Kyllä  |

### Työ: `test-vitest`

Edellyttää `changes`-luokittelutyötä. Sovellettavien matriisiosioiden epäonnistuminen estää yhdistämisen.

| Testikokonaisuus | Validoi                                                                | Estävä                                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-palvelin (110 työkalua), autoCombo, välimuisti — vitest-suorittaja | Kyllä                                                                                                                                                         |
| `test:vitest:ui` | Käyttöliittymäkomponenttien testit — vitest-suorittaja                 | **Estävä** — ennestään olemassa olevat virheet on nimenomaisesti suljettu pois tiedostossa `vitest.config.ts`; uudet virheet aiheuttavat työn epäonnistumisen |

### Öiset työnkulut (ajastetut, neuvoa-antavat)

Nämä suoritetaan cron-aikataulun mukaisesti (ja `workflow_dispatch`-toiminnolla), eivät koskaan PR-pyynnöissä. Kaikki ovat neuvoa-antavia.

| Työnkulku              | Validoi                                                                                                                                                                                                | Estävyys          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `nightly-property`     | fast-check-ominaisuustestit satunnaisella siemenluvulla ja suurella suorituskertojen määrällä                                                                                                          | **Neuvoa-antava** |
| `nightly-resilience`   | keon kasvun tarkistus, kaaospohjainen vikojen injektointi, k6-kuormitus- ja kestotestaus                                                                                                               | **Neuvoa-antava** |
| `nightly-llm-security` | promptfoo-injektiosuojaus (estotila) + garak-tarkistukset (ohitetaan ilman palveluntarjoajan salaisuutta)                                                                                              | **Neuvoa-antava** |
| `nightly-schemathesis` | OpenAPI-sopimuksen fuzz-testaus (schemathesis) käynnissä olevaa OmniRoutea vasten käyttäen tiedostoa `docs/openapi.yaml` — tuo esiin määritysrikkomukset / käsittelemättömät 500-virheet (vaihe 8 B.4) | **Neuvoa-antava** |
| `nightly-mutation`     | Stryker-mutaatiotestauksen pisteet nopean yksikkötestikaistan osalta — selviytyvät mutantit paljastavat heikot varmennukset                                                                            | **Neuvoa-antava** |
| `nightly-compat`       | Node-moottorin yhteensopivuusmatriisi tuettujen `engines.node`-alueiden välillä                                                                                                                        | **Neuvoa-antava** |

Suorituskyvyn perustasot (keko, TTFB, koontiaika) tallennetaan, mutta niitä ei käytetä estokriteereinä: katso [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Nopeusvaihe (2026-08-30 → v4.0 LTS): jokaista vertailutasoa löysättiin 20 %

Omistajan päätös (2026-08-30): v4.0:n modularisointiin asti julkaisunopeus on teknisen velan
rajoittamista tärkeämpää. Jokaista **numeerista** räikkämekanismin vertailutasoa löysättiin 20 %
yhdellä auditoitavalla ajolla, ja vaihe on määritetty tiedostossa `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mikä muuttui                                                                                                                                                                                                                  | Missä                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — pienempi-on-parempi-määrät ×1,2, suurempi-on-parempi-prosenttiosuudet ÷1,2 (kattavuuden alaraja säilyi arvossa 60, `eslintErrors` pysyy arvossa 0, `eslintWarnings` 0 → 20 % jäädytetystä ohitusmäärästä) | `quality-baseline.json` (`_relax_velocity_2026_08_30`-huomautus luettelee kaikki ennen → jälkeen -arvot) |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                  |
| `cap`, `testCap`, jokainen `frozen[*]`- / `testFrozen[*]`-rivikatto ×1,2                                                                                                                                                      | `file-size-baseline.json`                                                                                |
| tiedosto- / TS-koodikohtaiset määrät ×1,2                                                                                                                                                                                     | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`   |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                               |
| `--require-tighten` muuttuu neuvoa-antavaksi, kun `_policy.requireTighten === false`                                                                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                              |
| öinen `bank-ratchet-shrinks` keskeytetään (se tallentaisi mitatun pienenemisen ja poistaisi liikkumavaran)                                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                            |

Sallittujen poikkeusten luettelot (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **eivät** ole budjetteja, eikä niihin koskettu. Hyväksytty/hylätty-käytäntöportit (salaisuudet, SQL-säännöt,
dokumentaation ja ympäristön sopimus, i18n-yhdenmukaisuus, yksikkötestit) eivät muuttuneet — epäonnistunut testi on edelleen epäonnistunut testi.

**Työkalut**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — kertaluonteinen
  löysäys (`scripts/quality/relax-baselines.mjs`); kieltäytyy suorittamasta toimintoa kahdesti samalla
  huomautuksella.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mittaa jokaisen numeerisen portin samalla tavalla kuin CI ja tulostaa kunkin portin jäljellä olevan liikkumavaran
  (`scripts/quality/baseline-headroom.mjs`). Öinen `baseline-headroom`-työ julkaisee
  taulukon työnkulun suorituksen yhteenvedossa ja lataa sen JSON-/Markdown-raportin artefaktina
  `baseline-headroom-<run_id>`, jota säilytetään 90 päivää. Varoitus- ja kriittiset rivit osoittavat portit,
  jotka ovat enintään 10 %:n päässä ylärajastaan tai jo ylittäneet sen. Käytä näitä raportteja varhaisena
  varoituksena budjettien kulumisesta; tarkista kyseisen portin `_rebaseline_*`-huomautukset. Työ ei enää
  luo tai päivitä pysyvää issue-raporttia; #12149 säilyttää aiemman raporttihistorian.

**Uuden koodin tila (Clean-as-You-Code) — 2026-08-30 lähtien, vain PR-pikapolulla**

`pull_request`-tapahtumissa `quality.yml` välittää parametrin `--base-ref <PR base SHA>` tarkistuksille `check:file-size`,
`check:complexity-ratchets` ja `check:dead-code`. Tarkistuksissa `check:complexity-ratchets` ja
`check:dead-code` portti vertaa HEAD-versiota yhdistämiskantaan **rajoitettuna PR:n muuttamiin tiedostoihin**
(`scripts/check/newCodeMode.mjs`: yhdistämiskanta materialisoidaan väliaikaiseen
`git worktree` -työpuuhun, ESLint/knip suoritetaan siinä ja HEAD-versiossa, ja tiedostokohtaisista määristä lasketaan erot):

- **estävä** — PR lisäsi syklomaattisen tai kognitiivisen kompleksisuuden rikkomuksia tai kuolleita vientejä muuttamiinsa tiedostoihin
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` lokissa);
- **ohjeellinen** — globaali kokonaismäärä verrattuna jäädytettyyn perustasoon. Periytynyt poikkeama ei koskaan merkitse
  syytöntä PR:ää punaiseksi; poikkeamaa seurataan korjattavaksi julkaisun täsmäytyksen yhteydessä, ja sitä valvoo
  headroom-työ.

`check:file-size` käyttää kantaviitettä omien sääntöjensä mukaisesti (`scripts/check/check-file-size.mjs`, #8522):
se tarkistaa puun jokaisen lähdekoodi- ja testitiedoston, lukee kunkin rivimäärän PR:n kantaversiossa
komennolla `git show` ja hylkää tiedoston vain, jos se kasvaa suuremmaksi kuin sen vertailutason ylärajan
(`frozen` / `testFrozen` tai vertailutason ulkopuolisen tiedoston tapauksessa `cap` / `testCap`) ja sen
kantakoon suurempi arvo. Tiedosto, joka on jo poikennut kantaversiossa, ei näin ollen koskaan muuta viatonta PR:ää hylätyksi.

`check:boundary:ratchet` soveltaa samaa sääntöä yksittäiseen lukuunsa
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-tapahtumissa sekä
`quality.yml`-pikaportit että `ci.yml`-linttaustyö välittävät PR:n pohjan SHA-tunnisteen, pohjacommit
mitataan `git archive` -viennistä, ja PR epäonnistuu vain, kun sen `open-sse → src`-reunojen
määrä ylittää arvosta `metrics.boundaryOpenSseToSrc` ja pohjan määrästä suuremman. Katon
ylittävä pohjan ajautuminen raportoidaan (`base drift herdado`), mutta se ei koskaan aiheuta
syyttömän PR:n epäonnistumista; push → main säilyttää absoluuttisen katon, ja pohjan SHA-tunniste,
jota ei voida selvittää, käyttää sitä varoituksen kera varavaihtoehtona.

`workflow_dispatch`-ajot, julkaisun vihreän tilan kattava tarkistus ja öinen liikkumavaran tarkistustyö
eivät saa PR-pohjaa ja käyttävät edelleen absoluuttista (globaalia) vertailua. Kattavuus, duplikaatio
ja tyyppikattavuus pysyvät toistaiseksi globaaleina (niiden työkalut eivät tuota tiedostokohtaista
eroa edullisesti) — ne ovat ehdokkaita samanlaiseen käsittelyyn.

**Vaiheen päättäminen versiossa v4.0 (LTS = aiempaa tiukempi, ei "paluu normaaliin")**

1. Puhtaan `release/v4.0.0`-haaran kärjessä: suorita `npm run quality:headroom --json`
   dokumentointia varten, sitten `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` sekä jokaisen tyyppitarkistusportin
   `--update` — jokainen perustaso laskee mitattuun arvoon.
2. Poista `_policy` tiedostosta `quality-baseline.json` (ottaa `--require-tighten`-toiminnon ja öisen
   säästämisen uudelleen käyttöön), palauta `THRESHOLD = 36` (tai suurempi) tiedostossa `check-openapi-coverage.mjs`.
3. Tiukenna mitattua arvoa pidemmälle siellä, missä modularisointi tuotti tulosta: tiedostokoon `cap`
   takaisin arvoon 1000 (tai 800), kattavuuden alarajoihin +5, kuolleiden vientien määräksi 0
   modularisoiduissa paketeissa.

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

**Korjaa perimmäinen syy; käytä sallittujen poikkeusten luetteloa vain, kun rikkomus on ollut olemassa ennestään eikä sitä voida korjata samassa PR:ssä.**

Kun lisäät merkinnän sallittujen poikkeusten luetteloon:

1. Lisää kommentti, jossa perustelet poikkeuksen.
2. Viittaa seurantatehtävään (esim. `// #3498 — Phase 2 feature, not yet implemented`).
3. Poista merkintä samassa PR:ssä, joka korjaa rikkomuksen — vanhentunut merkintä, joka ei enää
   ohita aktiivista rikkomusta, on itsessään virhe (kun kohdan 6A.3 vanhentuneiden valvontasääntöjen tarkistus
   on toteutettu, se hylkää tarkistuksen irrallisen sallittujen poikkeusten merkinnän vuoksi).

**Älä** lisää sallittujen poikkeusten merkintöjä vain saadaksesi testit läpäistyä nopeammin. Vihreä tarkistus ja kasvava
sallittujen poikkeusten luettelo luovat valheellisen kuvan laadusta.

### Kun tarkistus epäonnistuu PR:ssäsi

1. **Lue tarkistuksen tuloste huolellisesti** — se kertoo täsmällisesti, mikä tiedosto tai symboli rikkoi
   sääntöä.
2. **Korjaa rikkomus** — useimmat tarkistukset ovat deterministisiä tiedostojärjestelmätarkistuksia, jotka läpäistään heti,
   kun koodi on kunnossa.
3. **Jos rikkomus on ollut olemassa ennestään** (eli et aiheuttanut sitä, mutta tarkistus
   kattaa sen nyt): lisää sallittujen poikkeusten luetteloon merkintä, jossa on perustelukommentti ja viittaus seurantatehtävään.
4. **Jos tarkistus on yksisuuntaisesti tiukkeneva vertailu** (kattavuus, ESLint-varoitukset, duplikaatio, monimutkaisuus):
   muutoksesi heikensi mittaria. Korjaa taustalla oleva ongelma tai suorita (harvinaisissa tapauksissa)
   `npm run quality:ratchet -- --update`, jos muutos on tarkoituksellinen ja mittarin
   heikentyminen hyväksyttävää — mutta dokumentoi syy PR:n kuvauksessa.
5. **Neuvoa-antavat tarkistukset** (`continue-on-error: true`) ovat vain tiedoksi — ne eivät estä
   yhdistämistä, mutta näkyvät CI-yhteenvedossa. Korjaa ne silti.

---

## Uuden tarkistuksen lisääminen

1. Luo `scripts/check/check-<name>.mjs` (tai `.ts`). Käytäntötarkistukset palauttavat lopetuskoodin 0/1.
   Räikkätyyppiset tarkistukset kirjoittavat mittarin tiedostoon `quality-metrics.json` komentosarjan `collect-metrics.mjs` kautta.
2. Lisää `"check:<name>": "node scripts/check/check-<name>.mjs"` tiedostoon `package.json` ja
   synkronoi alias sekä sen täsmällinen komento tiedostoon `config/quality/gate-manifest.json`.
   Tee sama synkronointi, kun muutat tai poistat olemassa olevan validointialiaksen.
   Suorita `npm run check:gate-manifest`; pre-commit-koukku ja CI:n muutosluokittelu
   valvovat tätä sopimusta.
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

## Rationalisoinnin työjono (ROI-katselmointi — Vaihe 9 Aalto 3)

Tämä luettelo täsmäytettiin `ci.yml`-tiedostoon 2026-06-17 (edellisestä versiosta puuttuivat
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Täsmäytetyn kokonaisuuden ROI-katselmoinnissa
tunnistettiin seuraavat rationalisointiehdokkaat. **Yhdistämiset ovat mekaanisia
CI-muutoksia; tilanvaihdot ja poistot ovat operaattorille varattuja käytäntöpäätöksiä.**
Mitään alla mainittua ei ole vielä otettu käyttöön.

**Yllä dokumentoimatta jäivät myös** (ohjeellisia, heikko signaali): `docs-lint`-työ
(markdownlint + Vale, koko työssä `continue-on-error`) sekä erilliset tarkistustyönkulut
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` on
`quality-baseline.json`-tiedostossa, mutta sitä ei ole kytketty estävään räikkään
`ci.yml`-tiedostossa — metriikka on tällä hetkellä irrallinen.

### Yhdistäminen / päällekkäisyyksien poistaminen (mekaaninen, pienempi riski)

Jokainen ehdokas validoitiin käytössä olevaa porttitilaa vasten 2026-06-17
(luota, mutta varmista); useat ”ilmeiset” yhdistämiset osoittautuivat piilottavan velkaa,
eivätkä ne **ole** ongelmattomia suoria korvaajia.

- **`check:docs-sync` suoritetaan kahdesti** — erikseen `lint`-työssä ja uudelleen osana `check:docs-all`-tarkistusta (`docs-sync-strict`) sekä huskyn pre-commit-koukussa. ✅ **VALMIS** — erillinen `lint`-kutsu poistettu.
- **CVE-tarkistus** — ❌ **EI ongelmattomasti yhdistettävissä.** `audit:deps` estää kriittiset tietoturvavaroitukset ja keskeneräiset auditoinnit kaikissa viidessä lockfile-tiedostossa sekä raportoi nykyisen käytännön mukaisesti korkean vakavuuden varoitukset varoituksina; `check:vuln-ratchet` (osv) epäonnistuu vain, jos sisäänkirjattuun lähtötasoon verrattuna tapahtuu _heikennys_, ja hylkää puuttuvat mittaustulokset silloin, kun niitä vaaditaan. Semantiikat poikkeavat toisistaan — `audit:deps`-tarkistuksen poistaminen menettäisi absoluuttisen kriittisen portin ja riippumattomat pakettiauditoinnin tositteet. Säilytä molemmat.
- **Syklien tunnistus** — ✅ **VALMIS** (#15159 G-01/G-02). Vanha teksti kutsui `check:cycles`-tarkistusta ”vihreäksi, kuratoiduksi” portiksi ja perusteli sen säilyttämistä estävänä sillä, että `check:circular-deps` (dpdm) raportoi 91 sykliä. Tuo vihreä tulos oli **väärä vihreä**: `check:cycles` tarkisti 5 alihakemistoa (450 tiedostoa), tunnisti vain staattiset `import|export … from` -lausekkeet ja ohitti kaikki `@/`- ja `@omniroute/open-sse/`-määritteet, joten se ei voinut havaita repositoriota hallinneita dynaamisten tuontien ja aliasten muodostamia syklejä. Korjattu: portti käy nyt läpi hakemistot `src` + `open-sse` (5023 tiedostoa), kerää määritteet TypeScriptin AST:stä (joten `import("…")` huomioidaan mutta tyyppisijainnissa oleva `typeof import("…")` ei) ja ratkaisee tsconfig-tiedoston `paths`-määritykset. Se löytää **14** sykliä, ei 0:aa. Koska 14:ää ennestään olemassa olevaa sykliä ei voida korjata portin PR:ssä, `check:cycles` on nyt **räikkä** (`--ratchet`, yläraja `metrics.cycles.value = 14` tiedostossa `quality-baseline.json`, `direction: down`) — se estää jokaisen _heikennyksen_, ja määrä voi vain laskea. CI suorittaa komennon `npm run check:cycles:ratchet`. Velan asteittainen purkaminen etenee kohdan **A-01** mukana. `check:circular-deps` (dpdm) säilyy ohjeellisena laajempana toisena arviona.
- **Monimutkaisuus** — ✅ **VALMIS** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): yksi ESLint-läpikäynti, laskenta ruleId:n mukaan, jotta syklomaattisen monimutkaisuuden + rivien enimmäismäärän ja kognitiivisen monimutkaisuuden lähtötasot pysyvät erillisinä; yksittäiset `check:complexity` / `check:cognitive-complexity` säilyvät paikallista `--update`-käyttöä varten.
- **`/api`-hallusinaatioiden esto** — ✅ **VALMIS** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): yksi `src/app/api`-hakemiston tiedostojärjestelmäinventaario; openapi-routes + docs-symbols raportoivat edelleen erikseen; yksittäiset tarkistukset säilyvät paikallisia suorituksia varten.
- **`check:node-runtime` suoritetaan 11 työssä** — ⚠️ **matala ROI.** Jokainen käyttää erillistä suoritusympäristöä ja tarkistus kestää alle sekunnin; kokonaissäästö on noin 10 sekuntia, mutta samalla menetettäisiin edullinen työkohtainen suojaus. Ei muutostyön arvoista.
- **`typecheck:noimplicit:core` CI:n lint-tarkistuksessa** — ✅ **poistettu lint-työstä** (oli ohjeellinen `continue-on-error`); estävä tyyppipinta muodostuu tarkistuksista `typecheck:core` + `check:type-coverage`. Paikallinen skripti säilytettiin.

### Tilanvaihto / päätös (operaattorin käytäntö)

- `check:openapi-security-tiers` (ohjeellinen) — ❌ **EI voida ongelmattomasti muuttaa estäväksi.** Se päättyy koodilla 0, mutta varoittaa, että useilta `LOCAL_ONLY_API_PREFIXES`-määrityksen alaisilta `traffic-inspector`-reiteiltä puuttuu `x-loopback-only: true`-annotaatio. Sen pakottaminen edellyttää ensin näiden annotaatioiden lisäämistä `openapi.yaml`-tiedostoon.
- `typecheck:noimplicit:core` (ohjeellinen) — estävä `check:type-coverage`-räikkä kattaa sen suurelta osin. Muuta räikäksi tai poista redundantti toinen `tsc`-suoritus.
- `test:vitest:ui` (nyt **estävä**) — ennestään olemassa olevat epäonnistumiset on nimenomaisesti suljettu pois `vitest.config.ts`-tiedostossa `// #8618`-seurantakommenteilla; uudet epäonnistumiset kaatavat työn.
- `check:secrets` (gitleaks, estävä räikkä) — nykyinen yläraja on `metrics.secretFindings` tiedostossa `quality-baseline.json`. Jokainen poikkeus tarvitsee perustellun `.gitleaks.toml`-merkinnän; puuttuva mittaustulos on KESKENERÄINEN. Tarkistus täydentää GitHubin natiivia salaisuuksien tunnistusta ja `check:public-creds`-tarkistusta.
- `check:pr-evidence` (estävä, etsii osumia PR-kuvauksen proosasta grepillä) — korkea väärien positiivisten riski; sen poistaminen heikentää ehdottoman säännön nro 18 toimeenpanoa, joten kyseessä on aito käytäntöpäätös.
- `semgrep` (ohjeellinen erillistarkistus) — päällekkäinen CodeQL:n kanssa OWASP-luokkien osalta; kytke sen lähtötaso räikkään tai poista se.

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
