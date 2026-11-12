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

Kumpikin CI ja Quality Gates -työnkulku antaa vakaan tuloksen: `Gate / CI` ja `Gate / Quality`. Heidän versioidussaan sisäänpääsykäytännössä luetellaan kaikki alkupään työt tarpeen tai neuvoa-antavan mukaan. Sovellettavan vaaditun työn on onnistuttava: puuttuvat, peruutetut, ohitetut, odottavat ja tuntemattomat tulokset eivät voi määrittää PASS. Kelvollinen vain asiakirjoja tai luetteloita koskeva luokitus voi tehdä koodikaistasta käyttökelvottoman. tavallinen luonnos PR ei ole hyväksytty ehdokas. `hotfix` merkki ei luovu todisteista.

Molemmat työnkulut kattavat PRs main/release -haaroihin, työnnät `main`, manuaalisen lähetyksen ja yhdistämisryhmän tapahtumat. Push, lähetä ja yhdistä ryhmä suorittaa koko valikoiman. Luotettu yhdistämisjonoluonnos suorittaa myös soveltuvia `full-code`/`full-code-e2e` -töitä; tavallinen PRs ohita ne. Ennen manuaalista yhdistämistä suorita täydellinen lähetys tarkalleen ehdokkaalle. Työnnät `release/**` :hen eivät käynnistä näitä työnkulkuja. Release-Green tarkkailee yhdistettyä tukikohtaa erikseen (`docs/ops/RUNNER_BOX.md` → Hosted kaista). Haarukat ja yhdistämisryhmät käyttävät isännöityjä juoksijoita töihin, jotka muutoin valitsevat itseisännöidyt juoksijat; riittävä isännöity kapasiteetti on varmistettava ennen käyttöönottoa.

Tavallinen PR suorittaa nopean valinnan. Pääsykäytännön `full-code` ja `full-code-e2e` kaistat (E2E, integrointi, pakettiartefaktit, Electron savu, Bun SQLite, ekosysteemi- ja protokollaasiakkaat) toimivat vain yhdistämisjonon luonnoksessa tai täydellä ajon: `gh workflow run ci.yml --ref <branch>`.

Jokainen JSON kuitti tunnistaa uloskirjatun SHA, työnkulun suorituksen ja yrityksen. CLI hylkää checkout/event SHA -epäsopivuuden. Työnkulkutestit sitovat käytäntöjäsenyyden tuomiotyön `needs` luetteloon, joten uusi tai poistettu kaista ei voi kadota hiljaa. Kuitit kattavat heidän oman työnkulkunsa, eivät julkaisua, käyttöönottoa tai olemassa olevan neuvontaskannerin sisäisiä osia. Toimialan säännöissä vaadittujen soveltuvien tarkastusten tekeminen on erillinen hallinnollinen muutos; Heidän työtehtäviensä määritteleminen ei sinänsä suojaa alaa.

`API Route Typecheck` on itsenäinen työnkulun tarkistus, joka ei kuulu sekä koottujen tuomioiden että paikallisen täyden tarkkailijan staattisen profiilin ulkopuolelle. Tarkista sen tulos erikseen tarkan ehdokkaan osalta. `.github/workflows/api-route-typecheck.yml` toimii PRs llä `main` ksi tai `release/**`, siirtää jompaankumpaan haaraperheeseen, manuaaliseen lähetykseen ja `merge_group` tyypin `checks_requested`-tapahtumiin. Siinä ei ole polkusuodatinta. Yhdistä ryhmät tarkista `merge_group.head_sha`; muut tapahtumat katso `github.sha`. Kaikki tapahtumat käyttävät samoja API -diagnostiikkaportti- ja porttiyksikkötestejä. PR -peruskohteet pyytävät uutta tarkistusta; body/title muokkauksissa käytetään vain havainnointiin tarkoitettua nimeä `Admission not requested / API Route Typecheck`, eivätkä ne voi korvata pääsytarkastusta.

### Säilytetty todisteet hyväksymisvähentimessä

`scripts/quality/validate-release-acceptance.mjs` vähentää toimitettua suunnitelmaa ja sen manifesteja; se ei osoita, että suunnitelma kattaisi koko päästöputken. Sen raporteissa on nimenomaisesti asetettu `releaseAcceptance: false`, vaikka tämä suunnitelma on `VERIFIED`. `release-acceptance.yml` -työnkulku käyttää edelleen varjolaitteita, ei todellisia koonti-, paketti-, käynnistys- tai promootiokuittauksia.

CLI vaatii `--evidence-root` :tä tarkistamaan säilytetyt todisteet. Tiedostot ratkaistaan `<evidence-root>/<artifact_id>/<member>` nä ja tiivistetään SHA-256:nä. PASS -tietue ilman todisteita, puuttuva tai muutettu tiedosto, vaarallinen polku tai symbolilinkki estää vahvistamisen. Puuttuvat tiedostot eivät vastaa tyhjiä onnistuneita lokeja. Nykyiset SHA/run/attempt tarkistukset pysyvät itsenäisinä: vastaavat tavut eivät voi pelastaa vanhentunutta kuittia. Tiedoston eheys ei ole todiste suorituksen aitoudesta tai artefaktien mainostamisesta.

### DAST kuluttaa vahvistetun CI koontiversion

Vaadittu `dast-smoke` CI -työ kutsuu `.github/workflows/dast-smoke.yml` `build` jälkeen. Se noudattaa samaa code/draft valintaa kuin koontiversio, mukaan lukien tuettu haarukka PRs, julkaisu-kohde PRs ja yhdistämisryhmät. Puuttuva, epäonnistunut, peruutettu tai odottamatta ohitettu DAST -työ estää `Gate / CI`. Uudelleenkäytettävällä työnkululla ei ole itsenäistä PR/dispatch laukaisinta; Manuaalinen validointi käyttää CI:n lähetystä, joten rakennus ja kuluttaja pysyvät yhdessä ajossa.

`scripts/ci/next-build-provenance.mjs` sinetöi koko Next-artefaktin tervatiivisteellä, repository/event/run, tuottajayrityksellä, head/base/checkout/tree, työnkulun tunnistetiedoilla, lukitustiedostolla, tarkalla solmun version/ABI llä, alustalla ja niputtajalla. DAST valitsee muuttumattoman artefaktin ID `needs.build.outputs` stä, vaatii latauksen tiivistelmän vahvistuksen ja tiivistää ZIP itsenäisesti tuottajan tiivistelmää vastaan ennen kuin sen kaksi sallittujen luettelossa olevaa jäsentä purkaa `scripts/ci/unpack-ci-build.py` kautta. Manifestin ja tar-arkiston on myös vastattava riippumattoman tuottajan tuotoksia, ennen kuin Seuraava puu puretaan. Se ei koskaan etsi viimeisintä onnistunutta haarakonversiota. Osittainen uudelleenajo voi käyttää samaa tuottajayritystä uudelleen, kun sen ID ja kaikki syötteet vielä täsmäävät; kuitti kirjaa molemmat yritykset.

Kuluttaja pysyy isännöidyssä Linux runnerissa, jolla on vain luku -käyttöoikeus ja ilman arkiston salaisuuksia. Se asentaa valmistajan tarkan Node-version ja kokoaa sitten CLI `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` kanssa. `scripts/build/standaloneInput.mjs` hylkää puuttuvan erillisen palvelimen ennen varakoontiversiota; normaalit paikalliset CLI koontiversiot säilyttävät nykyisen varaosan. Palvelimen valmiuden, Schemathesisin ja promptfoon on onnistuttava muuttumattoman 25 minuutin työrajan sisällä. Lähtökuitti todistaa syötetyn identiteetin ja tavut, ei onnistuneen DAST skannauksen. Artefaktien vanheneminen, juoksun keskeytys tai vikaantuva skanneri jää puutteelliseksi tai epäonnistuneeksi todisteeksi; siitä ei voi tulla PASS tä neuvoa-antavan kääreen kautta.

### UI suorituskyky

CI suorittaa täyden UI inventaarion neljänä `test-vitest` -matriisin sirpaleena, joissa kussakin on enintään kaksi työntekijää per sirpale ja nykyinen 15 minuutin työmääräaika. Ensimmäinen sirpale käyttää myös MCP/autoCombo Vitest -sarjaa. Vaadittu työn tulos kattaa jokaisen matriisin jalan; yhden sirpaleen epäonnistuminen tai peruuttaminen ei voi vahvistaa ehdokkaan pääsyä.

Yötarkkailija säilyttää erillisen tarkan ehdokaskuitin jokaisesta UI sirpaleesta, mukaan lukien MCP suoritus ensimmäisessä kuitissa. Kaikki neljä kuittia, lokit ja vastaavat suoritustunnisteet vaaditaan. Paikallinen `npm run test:vitest:ui` valitsee silti koko sarjan; yksi `--shard` -ajo on vain osittainen todiste.

### Yksikkökattavuuden kokoelma

Kaksitoista yksikkösirpaleet keräävät V8-peittoalueen olemassa olevan testin suorittamisen aikana. Onnistunut sirpale suorittaa `scripts/ci/compact-v8-coverage.mjs` pakkaamaan alkuperäiset tiedostot ilman Istanbulin väliraporttia. Viimeinen Coverage-työ tarkistaa kaikki kaksitoista manifestia ehdokas SHA, suoritusaikaa, lähdejuurta ja datan hajautusarvoa vastaan ja suorittaa sitten c8:n reportterit ja olemassa olevat kattavuuden kynnykset. Tulot säilyttävät c8:n yleisen tiedostonimijärjestyksen; sirpaittainen esiyhdistäminen ei ole turvallista function/block sekaverkon peitossa. Puuttuvien, väärin muotoiltujen tai yhteensopimattomien sirpaleiden hyväksyminen epäonnistuu. Epäonnistuneet testisirpaleet säilyttävät raa'an diagnostisen kattavuuden erikseen; se ei voi päästä lopulliseen yhdistämiseen.

### Kuitit yksikön toteutuksen edistymisestä

Jaettu `test:unit:ci:shard` -komento tallentaa `primary`, `dashboard` ja `serial` -vaiheet `scripts/ci/unit-progress-reporter.mjs` kautta. Normaali testiraportti on edelleen saatavilla. Erillinen vain metatietoja sisältävä kuitti tallentaa kunkin tiedoston alkamisen ja valmistumisen, ja 30 sekunnin syke näyttää edelleen aktiiviset tiedostot ja niiden kuluneen ajan. Se tallentaa vain sallittujen suoritusten metatiedot; testikuvauksia, tulosteita, virhekappaleita ja koko ympäristöä ei sarjoiteta.

CI säilyttää JSONL tiedostot `unit-progress-ci-<run>-<attempt>-<shard>`. Työn aikakatkaisu voi estää myöhemmän latauksen; jo lähetetyt sydämenlyönnit ovat diagnostisia todisteita. Puuttuvat sydämenlyönnit voivat myös olla estetty tai lopetettu juoksijaprosessi. Nämä kuitit säilyttävät nykyisen testivalinnan, samanaikaisuuden, määräajat ja poistumistilan; ne eivät ole ehdokkaiden hyväksymispäätöksiä.

### Yhdistä jono

`queue` -tunniste lähettää PR n yhdistämisjonoon (`.mergify.yml`). Mergify avaa PR -luonnoksen `mergify/merge-queue/` -haarassa, CI suorittaa täyden valikoiman siellä, ja alkuperäinen PR yhdistetään, kun `Gate / CI`, `Gate / Quality` ja `Merge integrity (changelog + generated skills)` kulkevat.

Mergify kirjoittaa jonon yhteenvedon luonnoksen kuvaukseen. Body/title-only `pull_request` `edited` -tapahtumat käyttävät ajokohtaista samanaikaisuusryhmää eivätkä suorita uudelleen luokittelua, testaa matriiseja, yhdistä eheyttä tai hyväksymispäätöstä. Vain havainnointiin tarkoitettujen tarkistusten nimet eivät voi korvata `Gate / CI` tai `Gate / Quality`. Muokkaus, joka muuttaa kohdepohjaa, vaatii uutta ehdokkaiden vahvistusta.

Jonon lopettamisen jälkeen push ei aina aseta PR uudelleen jonoon. Kommentoi `@mergifyio queue` :tä.

### Staattinen skannausinventaari

Versioitu npm-alias-inventaari ja staattisen skannauksen jäsenyys ovat käytössä `config/quality/gate-manifest.json` ssa. Suorita `npm run check:gate-manifest` vahvistaaksesi skriptien nimet ja tarkat komennot `package.json` vastaan; lisäykset, poistot ja komentojen siirtyminen epäonnistuvat sekä paikallisessa koukussa että muutoksen luokittelussa CI ssä. Alias ei ole työnkulkutyö, matriisi-ilmentymä tai testitapaus: näitä lukuja ei saa esittää keskenään vaihdettavissa olevina.

Käytä `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list` tarkastaaksesi valitut aliakset suorittamatta niitä. Runner kutsuu npm-alkupisteen, joten sen ajonaika (mukaan lukien Bun jos se on määritetty) säilyy. Luettelotietueet kirjaavat näiden profiilien ulkopuoliset aliakset erikseen kutsutuina, ja ylläpitokomennot ovat kiellettyjä vain luku -tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen skannauksen. Ne eivät sertifioi tuotetestejä, kattavuutta, pakkaamista, ulkoisia tarkastuksia tai ehdokkaan täydellistä julkaisun hyväksyntää. Työnkulkuun pääsy käyttää linkitettyjä `config/quality/admission-policy.json` ja `scripts/quality/admission-verdict.mjs`. Julkaisutarkkailijaprofiilit pysyvät erillisinä; tarkastaa sovellettavat sekit ja kuitit itsenäisesti. Täydelliset tarkkailijan staattiset komennot ilmoitetaan `config/quality/release-green-static-profile.json` ssä, mukaan lukien `audit:deps`, mutaatiotestin valinta ja translaatiotarkistukset. Lataaja vahvistaa npm-komennot package.json ja mallinnettujen CI/Quality -määrityksiä vastaan; se hylkää driftin sen sijaan, että suorittaisi komentotulkkimerkkejä argumentteina. Vaadittu skannerin SKIP/INCOMPLETE lähtö ei voi muodostaa PASS. Profiili tallentaa ulkoiset poissulkemisensa, eikä se korvaa isännöityä kattavuutta, testimatriiseja, paketti- tai käyttöönottotodisteita. Alla oleva proosaluettelo on viite, ei todiste siitä, että portti todella juoksi.

Skriptit elävät `scripts/check/` (policy gates) ja `scripts/quality/` (racket engine) alla. CI totuuden lähde on `.github/workflows/ci.yml`.

### Julkaistun dokumentaation kunto

`.github/workflows/i18n-base-health.yml` tarkkailee dokumentaation kuntoa valittujen `main` ja `release/v*` työntöjen jälkeen sekä manuaalisen lähettämisen jälkeen. Sen suodattimet kattavat dokumentaation, root Markdownin, `llm.txt`, käännös- state/configuration ja asiaankuuluvat i18n-työkalut. Yksittäinen `Published base documentation health` -työ käyttää isännöityä Ubuntua ja viiden minuutin määräaikaa. Se suorittaa vain luku -vahvistuksen ja kirjoittaa diagnostisen kuitin ilman riippuvuusasennusta, käännöstä tai tilan hyväksymistä.

`scripts/i18n/check-base-health.mjs` vaatii nolla lähde-hash-, puuttuva-kohde-, kohde-hash-, vanhentuneen käännöksen ja osion välimuistin epäjohdonmukaisuuksia. Se myös vahvistaa nykyisen document/locale ydinalueen ja sen tallennetun alkuperän. Virheellinen konteksti, epätäydellinen kattavuus tai keskeytynyt tarkistus tuottaa `INCOMPLETE`:n; vahvistettu ajautuminen tuottaa `FAIL`. Molemmat palauttavat epäonnistuneen poistumistilan. Kuitti on sidottu kassalle SHA, työnkulkuun, suoritukseen ja yrittämiseen, ja se säilytetään `i18n-base-health-<sha>-<run>-<attempt>`.

Tämä on riippumaton havainto julkaistusta pohjasta. Se ei lisää PR tai merge-group-tapahtumaa, vaadittua PR tarkistusta, npm-aliasta tai staattisen skannauksen profiilijäsentä. Taustalla oleva tarkistustoiminto estää myös kaikki viisi luokkaa absoluuttisessa tilassa. Tavallinen PR valmistelu on erillään sisäänpääsystä. Onnistunut lataus ei voi muuttaa epäonnistunutta kuntotulosta PASS ksi.

Tavallinen PR käyttää `--preflight` `--baseline-evidence`:n luoman perusraportin kanssa. Se voi jättää englanninkielisen lähteen odottamaan vain, jos koko käännöstietue ja todelliset kohdetavut eivät muutu tarkalleen kyseisestä perustasta. Uudet kohde- tai osiovälimuistin epäjohdonmukaisuudet estävät edelleen, eivätkä puutteelliset todisteet voi valtuuttaa valmistelua. Raportissa esitetään `preparationPending` ja `mergeReady` erikseen: onnistunut valmistelu ei tee odottavista käännöksistä valmiita yhdistämään. Päivitä vaikuttaneet peilit kootussa ehdokkaassa ennen pääsyä. Luotettu Mergify-jonoehdokas, `merge_group`, haaratyönnät ja manuaaliset CI ajot käyttävät absoluuttista tarkistusta ilman `--warn` tai perittyjen epäonnistumisten anteeksiantoa. Puuttuvat kohdehajautusarvot ja poistettujen tallennettujen ydintiedostojen vähentämä laajuus eivät voi tuottaa onnistunutta absoluuttista tuomiota.

### Vapauta PR -pikapolku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI main/release PRs ssä, siirtää `main` hen, lähettää ja yhdistää ryhmiä. PRs käyttää polkusuodatettuja pikatarkistuksia. Pysyvästi poistettu käytöstä kaksoiskoonnos poistettiin; todelliset build/package/boot -sekit pysyvät CI ssa. Yksikkösarja ja vitest toimivat vain CI ssä (`Unit Tests (N/12)` ja `Vitest`).

| Job                                              | Laajuus                                                                                                                                                                                                                                              | Estäminen                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ja docs-all                                                                                                                                                                                                             | Kyllä                         |
| `Fast Quality Gates`                             | Koodi PRs; staattiset tarkastukset, tyyppitarkistus, kojelaudan tyyppitarkastus, vaikuttaneiden yksiköiden testit                                                                                                                                    | Kyllä                         |
| `Forgotten sibling tests`                        | Koodi PRs; muuttuneet moduulit, jotka on jäljitetty staattisiin kuluttajiin ja ehdokassisarusten testeihin; tynnyri- ja dynaamisen tuontipolut raportoidaan neuvoa-antavia diagnostiikkatietoja, joihin viitataan sallittujen luettelon poikkeuksina | **neuvoa-antava**             |
| `No new ESLint warnings`                         | Koodi PRs; vaimennustietoinen nukkasuoja                                                                                                                                                                                                             | Kyllä, mukaan lukien haarukat |
| `Merge integrity (changelog + generated skills)` | Ei-luonnos PRs; muutosloki ja luotu taitojen synkronointi                                                                                                                                                                                            | Kyllä, mukaan lukien haarukat |

#### Unohtunut sisarusten testiraportti

`npm run check:forgotten-sibling-tests` toimii `Fast Quality Gates` :n neuvoa-antavana vaiheena ja käyttää uudelleen tuontiratkaisijaa testi-vaikutuskartan takana. Jokaisen muuttuneen tuotantomoduulin kohdalla se raportoi deterministiset `changed module/symbol -> static consumer -> candidate sibling test` ketjut, kun ehdokastesti puuttuu pull-request diff:stä. Markdown-yhteenveto ja JSON tulos säilytetään `forgotten-sibling-tests` -työnkulun artefaktina kalibrointia varten ennen estämisen käyttöönottoa.

Tynnyrijälleenvienti ja dynaaminen tuonti ovat vain resoluutiodiagnostiikkaa; ne eivät koskaan luo estävää löytöä. Arvostellut poikkeukset livenä `config/quality/forgotten-sibling-allowlist.json` ssa. Jokaisen merkinnän on nimettävä kuluttaja- ja ehdokastesti, annettava erityinen perustelu ja linkitettävä GitHub ongelma tai vetopyyntö. Väärin muotoiltujen merkintöjen sulkeminen epäonnistuu. Poikkeukset eivät voi estää poistettua ehdokastestiä tai erotusta, joka lisää `.skip`/`.todo`; väitteen heikennys ja muu peitto jäävät itsenäisesti estävän `check:test-masking` portin omistukseen.

### Työ: `lint`

Toimii jokaisessa PR sta `main`. Lohkot sulautuvat epäonnistuessa.

| Käsikirjoitus (`npm run ...`)     | Vahvistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Estäminen                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js -versio on tuetulla alueella                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                         |
| `check:cycles`                    | Kiertotuonti koko `src/` + `open-sse/` ssä (AST-pohjainen, tsconfig `paths` ratkaistu). Bare poistuu luvusta 1 aina, kun jokin jakso on olemassa (vika-suljettu #15281 lähtien) ja listaa SCCs. `check:cycles:ratchet` (mitä CI suorittaa) estää, kun määrä ylittää `metrics.cycles` -katon `quality-baseline.json` — ssa tällä hetkellä 14, `direction: down`, joten se voi vain pudota (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä (räikkä)                                |
| `check:boundary`                  | `open-sse → src` -kytkentä: ainutlaatuiset tiedostot tiedostot -tuot moottorista sovellukseen (`scripts/quality/measure-boundary.mjs`; reunaluettelo on v4 core/module-split korjausruuhka). Bare = n neuvoa-antava raportti (sama kuin `quality:boundary`). `check:boundary:ratchet` (mitä CI toimii, myös `quality.yml` -pikaporttien räikkäsilmukassa) estää, kun luku ylittää `metrics.boundaryOpenSseToSrc` -katon `quality-baseline.json` ssa — joka on kylvetty mitatulla 771, `direction: down`; `--update` vain alentaa sitä; perussuhteellinen PRs ssä (`--base-ref`, katso alla)                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä (räikkä)                                |
| `check:route-validation:t06`      | Zod -skeemat näkyvät kaikilla reiteillä (Tier 6 -käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` määrä ei ylitä budjettia (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                         |
| `check:provider-consistency`      | Jokaisella `providers.ts` n tarjoajalla on vastaava merkintä `providerRegistry.ts` ssä (ja päinvastoin sallittujen luettelossa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                         |
| `check:model-lifecycle`           | Kolme käsin ylläpidettyä reititystaulukkoa pysyvät yhdenmukaisina sisäänkirjautetun elinkaaren tilannevedoksen (#11503) kanssa: `FITNESS_TABLE` (`taskFitness.ts`) ei saa mitään käytöstä poistettua tunnusta, jonka `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES` kohde on läsnä `REGISTRY` ssä eikä poistuneen id-tilannekuvasta; jokainen eläkkeelle jäänyt tunnus, joka on edelleen `REGISTRY` ssä, välitetään tai luetellaan `allowedRetiredInCatalog` ssa; eikä mikään `DEFAULT_DEGRADATION_MAP` lähde tai kohde näytä poistetulta kyseisessä tilannekuvassa. Tämä ei todista, että mallia palvelee tällä hetkellä suora ylävirtaan. Offline- — vertaa `config/quality/model-lifecycle.json`, joka on päivitetty käsin `npm run quality:refresh-model-lifecycle` :llä (verkko; ei kytketty CI ään). `allowedRetiredInCatalog` on palava räikkä: lisää merkintä vain, jos on seurantaongelma.                                                                                      | Kyllä                                         |
| `check:fetch-targets`             | Jokainen asiakaspuolen `fetch("/api/...")` : `src/` ratkaisee todellisen `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                         |
| `check:deps`                      | Kaikki `npm install` -able -depsit jokaisessa repon `package.json` ssä ovat `dependency-allowlist.json` ssä; uudet irrotetut tai syrjäytyneet paketit merkitty                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                         |
| `audit:deps`                      | npm-tarkastus kaikille viidelle itsenäiselle lukitustiedostolle (root, Electron, OpenCode -laajennukset v1/v2 ja tarjoaja). Kriittisten neuvojen lohko; korkeat neuvot ovat edelleen näkyviä varoituksia. Missing/failed -tarkastukset ovat INCOMPLETE ja lohko; alakohtaiset lukitustiivisteet ja raportit säilytetään.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                         |
| `check:lockfile`                  | `package-lock.json` eheys — https -rekisteri, eheystiivisteet, ei isäntäohjauksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                         |
| `check:licenses`                  | SPDX -lisenssien sallittu luettelo tuotantoriippuvuuksille                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                         |
| `check:tracked-artifacts`         | Ei rakennusartefakteja / sitoutuneita `node_modules` symlinkkejä (toimii myös huskyn ennakkositoutuksessa; pre-push on tarkoituksellisesti kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Kyllä                                         |
| `check:ai-attribution`            | Ei AI/bot `Co-Authored-By` traileri tai tekoälysukupolven alatunniste sisään PR sitoumukset, nimike tai elin — Kova sääntö #16 (kohteessa `quality.yml` pikaporttien silmukka varten PR→ `release/**` — lukee tapahtuman hyötykuorman, no-op off PRs — ja vain PR-askel `ci.yml` nukkaa varten PR→ `main`; myös husky `commit-msg` koukku; ihmisen kanssakirjoittajat sallittu; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Jokainen Vitest poissulkeminen nimeää seurantaongelman ja näkyy `config/quality/vitest-exclusions.json` ssä (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                         |
| `check:file-size`                 | Lähdetiedostot (`.ts`/`.tsx` `src/` ssä, `open-sse/`, `electron/`, `bin/`) pysyvät `cap` ssä ja testitiedostot (`*.test.ts(x)`) `testCap` ssä; `file-size-baseline.json` muotoon jäädytetyt tiedostot (`frozen` / `testFrozen`) eivät saa kasvaa yli tallennettujen kokojensa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                         |
| `check:error-helper`              | Virhevastaukset executors/handlers ssa käyttävät `buildErrorBody()` / `sanitizeErrorMessage()` (kova sääntö #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                         |
| `check:migration-numbering`       | Siirron SQL tiedostot on numeroitu peräkkäin, ei aukkoja tai kaksoiskappaleita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                         |
| `check:public-creds`              | Ei kirjaimellisia OAuth `client_id`/`client_secret` tai Firebase Web -avaimia `publicCreds.ts` ulkopuolella (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                         |
| `check:db-rules`                  | Ei raakaa SQL `src/lib/db/` moduulien ulkopuolella; ei tynnyrituontia `localDb.ts` :ltä (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                         |
| `check:known-symbols`             | Palveluntarjoajan toteuttajat, reititysstrategiat ja heidän lähetystaulukoihinsa rekisteröidyt kääntäjät vastaavat — levyllä olevia tiedostoja, ei orpoja tai ilmoittamattomia symboleja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                         |
| `check:route-guard-membership`    | Jokainen reitti, joka synnyttää lapsiprosessin, luokitellaan `isLocalOnlyPath()` (Hard Rules #15/#17) mukaan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                         |
| `check:test-discovery`            | Jokaisen repossa olevan `*.test.ts` / `*.spec.ts` tiedoston kerää vähintään yksi koeajo (räikkä: orpoluettelo `test-discovery-baseline.json` :ssä voi vain kutistua)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                         |
| `check:test-tla-order`            | Mikään `tests/unit` alla oleva `node:test` -tiedosto ei rekisteröi testiä, osuu huipputason `await` ja rekisteröi sitten lisää (#18045; räikkä: `test-tla-order-allowlist.json` voi vain kutistua)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                         |
| `check:agent-skills-sync`         | Luodut agenttitaitojen artefaktit vastaavat niiden lähdeluetteloa (ei ajautumista)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Palveluntarjoajalla logos/assets on tallennettu alkuperämerkintä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON konfiguraatiotiedostot jäsentävät ja täyttävät repo lint -säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | TypeScript -kokoelma ilman virheitä (vain neuvoa-antavat varoitukset)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                         |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — tulevaisuuteen katsova; monet olemassa olevat soittosivustot tarvitsevat edelleen huomautuksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **neuvoa-antava** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` laajuinen `src/app/(dashboard)/**` (#7033) — `typecheck:core`:n kuratoitu 27 tiedoston sallittu luettelo ei sisällä koontinäyttöä TSX, eikä `next build` myöskään koskaan tyyppitarkista sitä (`next.config.mjs` asettaa `ignoreBuildErrors: true`), joten orpotunnisteiden regressiot siellä (#6625/#6909) olivat CI. Erottaa jäädytettyyn per-file/per-TS-code -laskennan perusviivaan (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentunut täytäntöönpanokuvio kuin `check:known-symbols`) Vain — NEW virheet, jotka ylittävät perusviivan laskennan, epäonnistuvat portissa; räikkä alas `--update` llä, kun olemassa oleva virhe on korjattu.                                                                                                                                                                                                                                                                                                                       | Kyllä                                         |
| `check:build-typecheck`           | Koko sovelluksen tuotannon tyypin tarkistus `tsconfig.build.json` ssa (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), pintaa `typecheck:core`:n 27 tiedoston sallittu luettelo ja kojelaudan portti eivät kata. Erot `config/quality/build-typecheck-baseline.json` tä vastaan; uusi tai korotettu (tiedosto, koodi) -määrä epäonnistuu, pienempi määrä pyytää sinua räikkäämään. `--update` kieltäytyy, kun ajo sisältää uuden tai korotetun parin, ellei `--force-regressions` ole hyväksytty, ja kieltäytyy hiljattain hiljennetystä tiedostosta, ellei `--force-nocheck` ole hyväksytty, joten perusviivan laajentaminen vihreäksi ja pysyvän hiljaisuuden myöntäminen ovat kaksi erillistä tarkoituksellista tekoa. Paljas `--force` hylätään. Tarkistaa myös `@ts-nocheck` :n koontilaajuuden `config/quality/ts-nocheck-baseline.json` vastaan, koska sitä käyttävä tiedosto ei raportoi lainkaan diagnostiikkaa ja olisi muuten näkymätön jokaiselle portille. | Kyllä                                         |

#### Kaksi tyyppitarkistusohjelmaa vastaavat eri tavalla

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ja `check:build-typecheck` kääntävät eri ohjelmia eri vaihtoehdoilla, ja sama tiedosto voi olla toisessa puhdas ja toisessa täynnä virheitä.

`tsconfig.build.json` asettaa `"strict": false`, joten `noImplicitAny` on pois päältä. Ydinkokoonpano kokoaa kuratoidun 27 tiedoston sallittuluettelon, jossa on tiukemmat vaihtoehdot, ja seuraa kunkin merkinnän tuontikaaviota, joten tiedostot, jotka eivät koskaan näy koontiohjelmassa, tarkistetaan edelleen siellä.

Seurauksella on merkitystä arvioitaessa, onko tiedosto kirjoitettu:**nolladiagnostiikka `check:build-typecheck` :ssa ei tarkoita nollaa** . `@ts-nocheck` poistaminen 26 tiedostosta osoitti, että 23 niistä oli puhtaita rakennusohjelmassa; kuusitoista niistä toi esiin noin 120 implisiittistä virhettä tiukassa virheessä. Tarkista molemmat ennen kuin kutsut tiedoston puhtaiksi.

### Työ: `quality-gate`

Toimii `test-coverage` jälkeen. Lohkot sulautuvat epäonnistuessa.

| Käsikirjoitus                | Vahvistaa                                                                                                                                                                  | Estäminen                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Lähettää `quality-metrics.json` (ESLint varoitusmäärä, kattavuus yhdistetystä sirpaleraportista)                                                                           | Kyllä (räikkä ylävirtaan) |
| `quality:ratchet`            | Jokainen `quality-baseline.json` :n mittari ei ole taantunut (ESLint -varoitukset ≤ -perusviiva; kattavuus ≥ perusviiva)                                                   | Kyllä                     |
| `check:duplication`          | Koodin kopiointi (jscpd@4) ei ylitä `quality-baseline.json` n perusviivaa                                                                                                  | Kyllä                     |
| `check:complexity`           | Tiedostotason syklomaattinen monimutkaisuus ei ylitä ylärajaa (ydin ESLint `complexity` + `max-lines-per-function`)                                                        | Kyllä                     |
| `check:cognitive-complexity` | Kognitiivisen monimutkaisuuden räikkä (`eslint-plugin-sonarjs`) — erillinen ESLint pass; CI suorittaa molemmat yhdistettynä yhdeksi `check:complexity-ratchets` -vaiheeksi | Kyllä                     |
| `check:dead-code`            | Käyttämättömät viennit / tiedostot räikkä (knip) ei regressio verrattuna perusviivaan                                                                                      | Kyllä                     |
| `check:compression-budget`   | Pakkauksen vertailubudjetti — moottorikohtaisesti tokenin säästöjen lattiat eivät saa heiketä                                                                              | Kyllä                     |
| `check:type-coverage`        | Prosenttityyppinen räikkä (`type-coverage`) ei regressio; se kattaa suurelta osin `typecheck:noimplicit:core`                                                              | Kyllä                     |

### Työpaikat: `codeql-scan` ja `codeql-admission`

`codeql-scan` tuottaa kaikki määritetyt analyysiluokat. Kun tämä työ onnistuu, `codeql-admission` vahvistaa tarkat latauksensa ja ehdokkaiden hälytysäänen. Molemmat ovat `Gate / CI`:n pakollisia riippuvuuksia, mukaan lukien vain asiakirjat -ehdokkaat. Hallinnolliset aktivointi- ja kanarian vaatimukset on kuvattu alla kohdassa "CodeQL räikkä".

| Käsikirjoitus          | Vahvistaa                                                                                                                                                                                                  | Estäminen |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Ehdokas ref/SHA ja kaikkien määritettyjen analyysikategorioiden on oltava ajan tasalla ennen varoitusräikkä; puuttuvat todisteet. Maailmanlaajuinen varasto pysyy erillisenä —, katso "CodeQL räikkä" alla | Kyllä     |

### Työ: `quality-extended`

Tehtävä estää soveltuvat hakijat. Paketin koko, salaiset havainnot, haavoittuvuuslöydöt, työnkulun havainnot ja OpenAPI muutokset tarkistetaan vaadituilla räikkäpainikkeilla. Kiertoriippuvuuden diagnostiikka on edelleen neuvoa-antavaa. Skannerin asennus vaaditaan: `scripts/ci/install-quality-scanners.sh` tarjoaa kiinnitettyjä versioita ja levittää asennusvirheitä. Puuttuvat työkalut, virheelliset raportit tai puuttuvat perusviivat jättävät vaaditun skannerin portin INCOMPLETE.

| Käsikirjoitus            | Vahvistaa                                                                                                                                                                                                                      | Estäminen                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `check:circular-deps`    | Ei pyöreitä riippuvuuksia (dpdm)                                                                                                                                                                                               | **neuvoa-antava**                         |
| `check:bundle-size`      | Nipun koko ei ylitä korkkia; käytettävissä oleva mittaus epäonnistuu                                                                                                                                                           | **Esto --ratchet**                        |
| `check:secrets`          | Gitleaksin havainnot eivät heikkene; vaaditut tarkistukset hylkäävät puuttuvan tools/source/baseline, epäonnistuneet tarkistukset ja virheelliset raportit                                                                     | **Esto --ratchet**                        |
| `check:vuln-ratchet`     | Riippuvuushaavoittuvuudet eivät heikkene; vaaditut tarkistukset hylkäävät puuttuvat työkalut, virheelliset raportit tai puuttuvat lähtökohdat                                                                                  | **Esto --ratchet**                        |
| `check:workflows`        | työnkulun nukka (actionlint + zizmor); missing/broken skannerit, virheelliset raportit tai puuttuva räikkäperusviiva epäonnistuvat INCOMPLETE:nä. Kelvolliset havainnot noudattavat valittua strict/advisory/ratchet käytäntöä | Toteutus vaaditaan; Zizmor-räikkä esto CI |
| `check:openapi-breaking` | Julkinen API sopimus kiinnitettyjen tapahtumien sitoumuksia vastaan (PR yhdistämiskanta, push ennen, yhdistämisryhmän perusta; scheduled/manual n kassa ensimmäinen vanhempi); vaadittu mittaus epäonnistuu suljettu           | **Esto --ratchet**                        |

### Työ: `docs-sync-strict`

`main` tai `release/**` pyyntöjen osalta tämä työ suoritetaan vain ei-luonnoksille (tai luotetuille jonoille), jotka on luokiteltu dokumentaatioksi tai koodimuutoksiksi. Se toimii myös muissa kuin PR CI -tapahtumissa; tämän työnkulun push-liipaisin kattaa vain `main`, ei `release/**`. Nollasta poikkeava vaihe estää työn; vain raportointia koskevat havainnot ja alla olevat dokumentoidut poikkeukset eivät sitä tee.

| Käsikirjoitus                  | Vahvistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Estäminen                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-portti, joka käyttää alla olevia 7 aliporttia peräkkäin                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                                                                                                                                          |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG versioiden johdonmukaisuus, tarkat `llm.txt` -peilit, käännetyt CHANGELOG section/size invariantit ja korvattujen kaksoiskappaleiden puuttuminen                                                                                                                                                                                                                                                                                                                       | Kyllä                                                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Kootuilla dokumentaatiosivuilla on kelvolliset frontmatter-otsikot                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                                                                                                                                          |
| ↳ `check:docs-counts`          | Korkean luotettavuuden invariantit ovat tiukkoja; heuristiset tiedostomäärän tarkistukset varoittavat vain, ellei komentosarja vastaanota `--strict` ( CI -metaportti ei läpäise sitä)                                                                                                                                                                                                                                                                                                           | Tiukka tason esto; pehmeä tason neuvonta                                                                                                                       |
| ↳ `check:env-doc-sync`         | Lähde env lukee, `.env.example` ja `docs/reference/ENVIRONMENT.md` sopivat nimenomaisten ohitus-, doc-only- ja env-only-sallittujen luetteloiden jälkeen                                                                                                                                                                                                                                                                                                                                         | Kyllä, dokumentoitujen sallittujen luettelojen ulkopuolella                                                                                                    |
| ↳ `check:deprecated-versions`  | Raportoi mahdolliset vanhentuneet versiot turvallisen historiallisen kontekstin ulkopuolella ja vanhentuneet päivityspäivät, huomioimatta jätetyt asiakirjat                                                                                                                                                                                                                                                                                                                                     | Ohje nykyisessä CI johdotuksessa (`--strict` ei ole hyväksytty)                                                                                                |
| ↳ `check:doc-links`            | Dokumenttien sisäiset merkintälinkit ratkaisevat oikeita tiedostoja (`[text]`/`(path)` -lomake)                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                                                                                                                                          |
| ↳ `check:fabricated-docs`      | Docsissa mainitut reitit, env vars, CLI -komennot, koukkujen nimet ja tiedostopolut ovat olemassa koodikannassa. Kova portti `--strict` kautta; pehmeä epäonnistuminen ilman lippua.                                                                                                                                                                                                                                                                                                             | Kyllä ( `--strict` kautta CI ssä)                                                                                                                              |
| `check:cli-i18n`               | Käytetyt CLI `t()` -avaimet ovat olemassa `en` ssä; `pt-BR` säilyttää jokaisen huipputason osan; `zh-CN` ja `zh-TW` sisältävät kaikki `en` n avaimet                                                                                                                                                                                                                                                                                                                                             | Kyllä                                                                                                                                                          |
| `check:openapi-coverage`       | OpenAPI -spesifikaatio kattaa ainakin räikkäkerroksen todellisia reittejä                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                                                                                                                                          |
| `check:openapi-security-tiers` | Ilmoitettujen `x-loopback-only`/`x-always-protected` -merkintöjen on oltava `routeGuard.ts`:n tukena. jäsennys- ja välitysvirheiden lohko. Vain paikallisten etuliitteiden puuttuvan `x-loopback-only` käänteinen tarkistus varoittaa, ja vain kuvion sisältävät reitit suljetaan pois tästä käänteiskierroksesta.                                                                                                                                                                               | Parser/forward tarkistaa eston; käänteinen tarkistus                                                                                                           |
| `check:openapi-routes`         | Jokainen `/api...` polku `openapi.yaml` ssä ratkaisee parametrittoman todellisen reitin perustellun `KNOWN_STALE_SPEC` sallituslistan jälkeen; myös vanhentuneet sallittujen listan merkinnät epäonnistuvat                                                                                                                                                                                                                                                                                      | Kyllä                                                                                                                                                          |
| `check:docs-symbols`           | Sisäiset `/api/...` URL -viitteet kanonisissa ei-peilidokumenteissa ratkaisevat todellisen reitin tai reittiperheen; proxy/upstream/placeholder/file -viittaukset ja tasatut `KNOWN_STALE_DOC_REFS` merkinnät jätetään pois, ja vanhentuneet sallittujen luettelon merkinnät epäonnistuvat                                                                                                                                                                                                       | Kyllä                                                                                                                                                          |
| `i18n translation drift`       | Absoluuttinen hyväksyminen edellyttää nollalähdettä, puuttuvaa kohdetta, kohde-hash-, vanhentunutta käännöstä ja osion välimuistin epäjohdonmukaisuuksia. Tavallinen PR -valmiste voi säilyttää tarkan perityn todisteen tai vain englanninkielisen odottavan muutoksen, jonka täydellinen tila ja kohdetavut eivät muutu; sen raportti ilmoittaa erikseen sulautumisvalmiuden. Puuttuvat kohdehajautuskohdat ja epätäydellinen perustodistuslohko. Puuttuva vanhan osan välimuisti ei ole vika. | Kaikki viisi luokkaa estävät queue/base n pääsyn; tavallinen valmistelu sallii vain todistetusti perinnöllisen tai vain englanninkielisen vireillä olevan työn |

Kaksitoista README SVGs `docs/diagrams/` alla luodaan (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regeneroi ne kaikki). Jokaisella on tavuvertailuyksikkötesti (`tests/unit/docs/readme-*-svg.test.ts`, työ `test-unit`), joka epäonnistuu, kun sitoutunut tiedosto on vanhentunut, ja `check:docs-counts` lukee kanonisia numeroita `<text>` solmuistaan — minkä vuoksi ääriviivat pitää jokaisen tiedoston ääriviivatun merkkijonon näkymättömänä `<text>`. Kanonisten SVG -lukujen tarkistus lukee `SVG_DIAGRAM_FILES` ssä (`scripts/check/check-docs-counts-sync.mjs`) luetellut tiedostot: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` sekä `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`; ikuisesti ilmaista, luetteloon pääsyä, toistuvaa poolia ja pisteytystekijöitä koskevissa väitteissä lukee myös `promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. `free-tier-budget.svg` hakee lukunsa live-luettelolatausohjelmasta, joten muutos `FREE_MODEL_BUDGETS` tai toimittajan näyttönimeen punaistaa CI kunnes tiedosto luodaan uudelleen.

### Työ: `i18n-ui-coverage`

| Käsikirjoitus                     | Vahvistaa                                                                                                                                                                                                            | Estäminen     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | UI i18n avaimen kattavuus on ≥ 65 %                                                                                                                                                                                  | Kyllä         |
| `check-ui-value-drift` (inline)   | Uudelleen kirjoitettu englanti **arvo** ei jätä jälkeenjäänyttä käännöstä                                                                                                                                            | Kyllä         |
| `check-new-key-coverage` (inline) | A **uusi** Englanninkielinen avain käännetään jokaisessa — kielessä, `__MISSING__:` -merkki hylätään                                                                                                                 | Kyllä         |
| `check-translation-ratio`         | Todellinen käännössuhde kielikohtaisesti (identtinen englanniksi / paikkamerkki / puuttuvat lehdet sallittujen luettelon ulkopuolella) ei saa ylittää `config/quality/i18n-translation-baseline.json` + -slack-arvoa | **Estäminen** |

Tarvitsee `fetch-depth: 0` — arvo-drift-portti erottaa `en.json` yhdistämispohjaa vastaan.

#### `check-ui-value-drift` — vanhentunut käännösportti

Saa kiinni yhden i18n-regression, jota muut portit eivät rakenteellisesti näe: englanninkielinen arvo kirjoitetaan uudelleen ja _aiemmasta_ englannin kielestä johdetut käännökset jäävät jäljelle, joten muut kuin englanninkieliset käyttäjät lukevat edelleen luottavaisesti muotoiltua, nyt väärää kopiota.

Tämä toimitettiin todella. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravity -kirjautumisapuohjelma laskeutui (#5203);**39/43 aluetta** piti tekstiä, jossa operaattoreita kehotettiin "kopioimaan koko URL ja liittämään se alle" — kulkua, jota ei voida suorittaa kyseiselle tarjoajalle. Se jäi huomaamatta #8463 asti, koska:

- `sync-ui-keys` täyttää vain ne avaimet, jotka ovat **poissa** , ei koskaan sellaisia, jotka ovat **tunkkainen** ;
- `check-ui-keys-coverage` laskee avaimen _presence_, joten vanhentunut käännös lasketaan katetuksi;
- `check-translation-drift` seuraa `docs/i18n/<locale>/**.md` dokumentaatiota, joka peilaa — se ei koskaan lue `src/i18n/messages/*.json`. Työn `docs-sync-strict` estäminen 2026-09 uudelleensynkronoinnin jälkeen: muokkaa ydinasiakirjaa → `npm run i18n:run -- --files=<doc>` (osiotason, halpa).

**Erotietoinen, ei perustason tukema.** Se vertaa `en.json` ta yhdistämiskannassa työpuuhun; jokaiselle avaimelle, jonka englanninkielinen arvo muuttui, kaikki alueet, joilla on edelleen koskematon käännös, ovat vanhentuneet. Tämä tarkoituksella **jäädyttää olemassa olevan velan** — a diff ei voi paljastaa, mistä vanhasta englannista pitkäaikainen käännös on peräisin, joten portti arvioi vain sen, mitä nykyinen muutos koskettaa. Vaihtoehto (avainkohtainen hash-perusviiva) maksaisi ~ 600 KB luodun tiedoston, joka on 3 × suurin olemassa oleva perusviiva, joka vaihtuisi jokaisessa i18n PR ssä.

Kaksi tapaa tyydyttää se:

1. päivittää käännökset, joihin vaikuttaa, tai
2. aseta ne `__MISSING__:<new english>` :ksi — ajonaika palvelee sitten korjattua englantia (`src/i18n/request.ts::deepMergeFallback`, #7258) ja avainjonoja käännöstä varten.

Jos merkkijono on **merkitys** muuttunut, mieluummin **avaimen uudelleennimeäminen** : uusi avain ei voi periä vanhentunutta käännöstä. Tämä on #8463 n malli.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Arvopoikkeamat ja uudet avaimet jakavat yhden muuttumattoman vertailun `scripts/i18n/resolve-ui-diff-base.mjs` lta. Työnkulku läpäisee saman perus-, peruskärje- ja ehdokas SHAs molempiin tarkistuksiin. PR/base-retarget, push ja merge-group ajot käyttävät tapahtumakontekstiaan. Ehdokashaaran lähettäminen vaatii sen tarkan avoimen PR tai nimenomaisen `i18n_base_sha` syötteen. `main` tai `release/vX.Y.Z` n lähettäminen tai ajoitettu tarkkailu ilman tätä syöttöä vertaa viimeistä toimitusta sen ensimmäiseen päähän; se ei ole kaikkien perittyjen käännösvelkojen tarkastus. Paikallinen kutsu vaatii nimenomaisen vertailupohjan, esimerkiksi yllä olevan `BASE_REF` komennon.

Puuttuva tai epäselvä vertailukonteksti, lukukelvoton tai virheellinen vaadittu luettelo ja muuttunut ehdokas tuottavat `INCOMPLETE` poistumiskoodilla **2** , myös varoitustilassa. Katalogi lukee käyttää `scripts/i18n/read-ui-catalog.mjs`; lukuvirheitä ei korvata tyhjillä objekteilla. Ei käytettävissä oleva tukiasema tai epätäydellinen tulo ei muodosta PASS.

### Työ: `i18n`

Täysi i18n-vahvistusmatriisi (yksi työ maa-aluetta kohden). Koko työ on neuvoa-antavaa.

| Käsikirjoitus                   | Vahvistaa                                | Estäminen                                                 |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Käännöksen täydellisyys kielikohtaisesti | **neuvoa-antava** (`continue-on-error: true` koko työssä) |

### Työ: `pr-test-policy`

Toimii vain vetopyyntöjen yhteydessä.

| Käsikirjoitus          | Vahvistaa                                                                                                                                    | Estäminen |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, jotka muuttavat tuotantokoodia `src/` ssä, `open-sse/`, `electron/` tai `bin/`, on sisällettävä tai päivitettävä testejä (Hard Rule #8) | Kyllä     |
| `check:test-masking`   | Muutetut testitiedostot eivät vähennä väitteiden nettomäärää tai lisää `assert.ok(true)` tautologioita                                       | Kyllä     |
| `check:pr-evidence`    | PR n elin mainitsee test/VPS todisteita muutoksesta (mekanisoi Kovan säännön #18 :n grepping PR -prosen — herkästi, katso Backlog)           | Kyllä     |

### Työ: `test-vitest`

Tarvitsee `changes` -luokitustyön. Sovellettavat matriisin sirpaleiden lohkojen yhdistäminen epäonnistuessa.

| Sviitti          | Vahvistaa                                                          | Estäminen                                                                                                                    |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP palvelin (110 työkalua), autoCombo, välimuisti — vitest runner | Kyllä                                                                                                                        |
| `test:vitest:ui` | UI komponentti testaa — vitest runneria                            | **Estäminen** Aiemmat — -virheet on nimenomaisesti suljettu pois `vitest.config.ts` ssä; uudet epäonnistumiset epäonnistuvat |

### Yötyönkulku (aikataulutettu, neuvoa-antava)

Nämä toimivat cron-aikataululla (ja `workflow_dispatch`), eivät koskaan PRs llä. Kaikki ovat neuvoa-antavia.

| Työnkulku              | Vahvistaa                                                                                                                                                                          | Estäminen         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | pikatarkista ominaisuustestit satunnaisella siemen + korkealla ajomäärällä                                                                                                         | **neuvoa-antava** |
| `nightly-resilience`   | kasan kasvuportti, kaaosvika-injektio, k6 load/soak                                                                                                                                | **neuvoa-antava** |
| `nightly-llm-security` | promptfoo-ruiskutussuoja (estotila) + -garak-anturit (ohitettu ilman palveluntarjoajan salaisuutta)                                                                                | **neuvoa-antava** |
| `nightly-schemathesis` | OpenAPI -sopimusten fuzzing (schemateesi) elävää OmniRoute vastaan käyttämällä `docs/openapi.yaml` — -pintojen spesifikaatioiden rikkomuksia / käsittelemättömiä 500s (Fase 8 B.4) | **neuvoa-antava** |
| `nightly-mutation`     | Stryker-mutaatiotestauksen pisteet nopealla yksikkökaistalla — selviytyneet mutantit pinnalla heikkoja väitteitä                                                                   | **neuvoa-antava** |
| `nightly-compat`       | Solmumoottorin yhteensopivuusmatriisi tuetuilla `engines.node` alueilla                                                                                                            | **neuvoa-antava** |

Suorituskyvyn perusviivat (keko, TTFB, rakennusaika) tallennetaan, ei portitettuja: katso [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL -räikkä: ehdokkaiden pääsy ja arkiston luettelo

CI omistaa ehdokas CodeQL pääsyn nimenomaisen riippuvuusketjun kautta: `codeql-scan` kutsuu nelikielistä matriisia `codeql.yml` ssä, sitten `codeql-admission` suorittaa `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` vaatii molemmat tulokset. Laatu säilyttää omat numeeriset tarkistuksensa, mutta ei kysy skannerilta ennen kuin tuottaja on valmis. Pelkästään `Gate / Quality` ei ole täydellinen ehdokkaan pääsy. CodeQL vaaditaan edelleen vain docs -ehdokkailta.

`config/quality/codeql-admission-policy.json` :n käytäntö valitsee Actions, C/C++, JavaScript/TypeScript ja Python, kyselypaketin oletusarvo, etäuhkamalli ja koontitila ei mitään. Tuottajan esitarkastus hylkää odottavan aktivointitietueen ja haarautuu nimenomaisen kohdeluettelon ulkopuolelle. Nykyiset tavoitteet ovat pää- ja release/v3.8.54. Contract -testit vertaavat tätä rajallista listaa ja ylläpitotyöntölaukaisinta pakettiversioon; seuraavan julkaisun käyttöönotto on tarkistettava. CI:n nykyinen laajemman julkaisun PR laukaisin säilytetään, mutta sisäistämätön kohde raportoi HOLD ennen purkamista sen sijaan, että se hankkisi mittaamattoman PASS.

Jokainen matriisityö tallentaa sen todellisen SARIF -latauksen ID, kielen, kategorian, suorituksen ja yrityksen, soittajan työnkulun identiteetin, tapahtuman ref/head/base/merge SHA ja käytäntöhajautusarvon. Riippuvainen työ lataa vain tämän ajon kuitit ja vahvistaa artefaktien tiivistelmät. Se vaatii kaikki neljä luokkaa, onnistuneen tuottajan ja jokaisen tarkan latauksen käsittelyn. Se käyttää API:n sarif_id-suodatinta, ei viimeisintä haaralta löydettyä analyysiä. Osittaisissa uusinnoissa voidaan käyttää uudelleen onnistuneita luokkia saman ajon ja ehdokkaan aikaisemmasta yrityksestä, jolloin tuotantoyritys säilyy; epäonnistunut nykyinen tuottaja ei voi käyttää uudelleen aikaisempaa vihreää näyttöä.

CodeQL -toiminto odottaa käsittelyä, mutta sen kiinnitetty toteutus voi varoittaa ja jatkaa tilan lukuvirheen tai loppuun kuluneen odotuksen jälkeen. Pääsy varmistaa siten käsittelyn uudelleen. Puuttuvat luokat, odottavat käsittelyt, epäonnistuneet tai peruutetut työt, vanhentunut identiteetti, epätäydellinen sivutus tai käytettävissä oleva APIs tuottavat HOLD ja lopettavat 2. Itsenäisen skannerin työnkulkua ei enää odoteta. Skannaamaton PR ei voi läpäistä, koska hälytyskysely palautti 0. `metrics.codeqlAlerts.value` yläpuolella mitattu määrä poistuu 1; perusviivaa ei nosteta toisen haaran hälytyksiä vastaan. [Latauksen tila ja analyysihaku](https://docs.github.com/en/rest/code-scanning/code-scanning).

Kuitti tallentaa lataamisen ja analysoinnin IDs, luokat, työkaluversiot, ref/SHA, perusviivat ja hälytysnumerot. SARIF identity/result -määrä, vähimmäissääntömäärät ja tarkat hälytysinstanssit ovat edelleen pakollisia. PR/analysis identiteetit tarkistetaan uudelleen ennen hyväksymistä. Nämä tarkistukset määrittävät määritetyn luokan kattavuuden, eivät luetteloa jokaisesta puretusta lähdetiedostosta. C/C++ no-build-purku ei sisällä projektin rakentamisen aikana luotua koodia. Lähteiden poissulkemiset on vielä tarkistettava, ja kirjoittajien ansioksi lukeminen tarvitsee vertailukelpoista tarkan perustan näyttöä.

`codeql-maintenance.yml` toimittaa aktiivisen julkaisun push-skannaukset ja viikoittaisen aikataulun ilman PR/main -tuottajien päällekkäisyyttä. `nightly-codeql-inventory.yml` pitää arkiston laajuisen perusviivan erillään `--strict-measurement` ja epäonnistumisen kanssa, kun mittaus ei ole käytettävissä. Paikallisen perinnön keräilijän siro ohitus ei ole ehdokaspääsy. Kiristys pysyy selvänä `--update` nä todetun alhaisemman globaalin määrän jälkeen.

Lisätyönkulkua ei saa julkaista, kun oletusasetus on määritetty: GitHub hylkää tämän yhdistelmän. Sen versioitu käytäntö jää odottamaan, kunnes tarkistettu hallinnollinen siirtymä on luettu takaisin. Ennen julkaisua operaattori kiinnittää arkiston, head/base/tree, policy/patch/rollback ja havaitun asennuksen tilan; `node scripts/quality/codeql-producer.mjs verify-admin-readback` tarkistaa toimitetut odotetut ja todelliset JSON tietueet. Tämä on tekninen vartija, ei operaattorin hyväksyntä tai korvaa uusien lukujen hakemista. PR -tunnus ei koskaan pyydä järjestelmänvalvojan käyttöoikeuksia. Käyttöönotto ja kaikki skannerin muutokset edellyttävät erillistä lukua sekä todellista PR, haarukka- ja yhdistämisryhmien yhteensopivuustodistusta.

Forksissa käytetään isännöityjä juoksua, kassaa ilman pysyviä valtuustietoja, ei projektin install/build tuottajassa eikä perittyjä arkiston salaisuuksia. GitHub tukee SARIF latausta pull_request-tapahtumassa sen pienennetyllä haarukkatunnisteella; Ensimmäistä kertaa lahjoituksen suorittamisen hyväksyntä on edelleen GitHub käytäntö. Älä koskaan käytä pull_request_target-funktiota epäluotettavan koodin suorittamiseen. Vahvista todelliset tunnuksen käyttöoikeudet, analysointiavain ja kaikki luokkaympäristöt ohjatussa kanariassa, ennen kuin harkitset siirron valmistumista. [Haarukan lataussäännöt](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [ristiriitaiset asetustilat](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Irtisanominen on operaattorin kutsu (Hard Rule #14)** — ei koskaan hylkää CodeQL varoitusta kirjaamatta teknistä perustetta hylkäyskommenttiin: `won't fix` ylävirran protokollavaatimukseen, `used in tests` testilaitteeseen, `false positive` desinfiointilaitteeseen CodeQL ei näe (ennakkotapa: `docs/security/ERROR_SANITIZATION.md`).

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

**Myös edellä dokumentoimattomia** (neuvoa-antavia, heikko signaali): työ `docs-lint` (markdownlint + Vale, koko työ asetuksella `continue-on-error`) ja itsenäiset skannerityönkulut `semgrep.yml` / `scorecard.yml`. CodeQL sisältää nyt pakolliset tuottaja- ja hyväksyntätyöt portin `Gate / CI` alla edellä kuvatuin aktivointiehdoin. `semgrepFindings: 0` on tiedostossa `quality-baseline.json`, mutta sitä ei ole kytketty estävään kiristysrajaan tiedostossa `ci.yml` — mittari on tällä hetkellä orpo.

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
- `check:pr-evidence` (estävä, etsii osumia PR-kuvauksen proosasta grepillä) — korkea väärien positiivisten riski; sen poistaminen heikentää ehdottoman säännön nro #18 toimeenpanoa, joten kyseessä on aito käytäntöpäätös.
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
