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

### Ehdokas pääsy

Kumpikin CI ja Quality Gates -työnkulku antaa vakaan tuloksen: `Gate / CI` ja `Gate / Quality`. Heidän versioidussaan sisäänpääsykäytännössä luetellaan kaikki alkupään työt tarpeen tai neuvoa-antavan mukaan. Soveltuvan vaaditun työn on onnistuttava: puuttuvat, peruutetut, ohitetut, odottavat ja tuntemattomat tulokset eivät voi määrittää PASS. Kelvollinen vain asiakirjoja tai luetteloita koskeva luokitus voi tehdä koodikaistasta käyttökelvottoman. tavallinen luonnos PR ei ole hyväksytty ehdokas. `hotfix` -merkintä ei luovu todisteista.

Molemmat työnkulut kattavat PRs main/release -haaroihin, työnnät `main` hen, manuaaliset lähetykset ja yhdistämisryhmätapahtumat. Push, lähetä ja yhdistä-ryhmä suorittaa koko valikoiman. Luotettu yhdistämisjonoluonnos suorittaa myös soveltuvia `full-code`/`full-code-e2e` -töitä; tavallinen PRs ohita ne. Ennen manuaalista yhdistämistä suorita täydellinen lähetys täsmälleen ehdokkaalle. Työnnät `release/**` :hen eivät käynnistä näitä työnkulkuja; Release-Green tarkkailee yhdistettyä tukikohtaa erikseen (`docs/ops/RUNNER_BOX.md` → Hosted lane). Haarukat ja yhdistämisryhmät käyttävät isännöityjä juoksijoita töihin, jotka muutoin valitsevat itseisännöidyt juoksijat; riittävä isännöity kapasiteetti on varmistettava ennen käyttöönottoa.

Tavallinen PR suorittaa nopean valinnan. Pääsykäytännön `full-code` ja `full-code-e2e` kaistat (E2E, integraatio, pakettiartefaktti, Electron smoke, Bun SQLite, ekosysteemi- ja protokollaasiakkaat) toimivat vain Mergify-jonon luonnoksessa tai täydessä ajossa: `gh workflow run ci.yml --ref <branch>`.

Jokainen JSON -kuitti tunnistaa uloskirjatun SHA, työnkulun suorituksen ja yrityksen. CLI hylkää checkout/event SHA -epäsopivuuden. Työnkulkutestit sitovat käytäntöjäsenyyden tuomiotyön `needs` luetteloon, joten uusi tai poistettu kaista ei voi kadota hiljaa. Kuitit kattavat heidän oman työnkulkunsa, eivät julkaisua, käyttöönottoa tai olemassa olevan neuvontaskannerin sisäisiä osia. Toimialan säännöissä vaadittujen soveltuvien tarkastusten tekeminen on erillinen hallinnollinen muutos; Heidän työtehtäviensä määritteleminen ei sinänsä suojaa alaa.

`API Route Typecheck` on itsenäinen työnkulun tarkistus, joka ei ole sekä kokonaistuomioiden että paikallisen tarkkailijan staattisen profiilin ulkopuolella. Tarkista sen tulos erikseen tarkan ehdokkaan osalta. `.github/workflows/api-route-typecheck.yml` toimii PRs ssä `main` tai `release/**` muotoon, työntää jompaankumpaan haaraperheeseen, manuaaliseen lähetykseen ja `merge_group` tyyppisiin `checks_requested`-tapahtumiin. Siinä ei ole polkusuodatinta. Yhdistä ryhmät tarkista `merge_group.head_sha`; muut tapahtumat katso `github.sha`. Kaikki tapahtumat käyttävät samoja API -diagnostiikkaportti- ja porttiyksikkötestejä. PR -peruskohteet pyytävät uutta tarkistusta; body/title muokkaukset käyttävät vain havainnointiin tarkoitettua nimeä `Admission not requested / API Route Typecheck`, eivätkä ne voi korvata pääsytarkastusta.

### Säilytetty näyttö hyväksynnän koostajassa

`scripts/quality/validate-release-acceptance.mjs` koostaa sille annetun suunnitelman ja sen
manifestit; se ei osoita, että suunnitelma kattaa koko julkaisuprosessin. Sen raportit asettavat
nimenomaisesti arvoksi `releaseAcceptance: false`, vaikka suunnitelma olisi
`VERIFIED`. `release-acceptance.yml`-työnkulku käyttää edelleen varjofixtureja eikä
todellisia koonti-, paketointi-, käynnistys- tai ylennyskuitteja.

CLI edellyttää `--evidence-root`-valitsinta säilytetyn näytön todentamiseen. Tiedostot ratkaistaan
muodossa `<evidence-root>/<artifact_id>/<member>`, ja niistä lasketaan SHA-256-tiiviste.
PASS-tietue ilman näyttöä, puuttuva tai muuttunut tiedosto, turvaton polku tai symbolinen linkki
estää todentamisen. Puuttuvat tiedostot eivät vastaa tyhjiä onnistuneita lokeja. Nykyiset
SHA-, suoritus- ja yritystarkistukset pysyvät toisistaan riippumattomina: vastaavat tavut eivät
voi pelastaa vanhentunutta kuittia. Tiedoston eheys ei ole todiste suorituksen aitoudesta tai
artefaktin ylennyksestä.

### DAST käyttää varmennettua CI-koontia

Pakollinen CI-työ `dast-smoke` kutsuu työnkulkua `.github/workflows/dast-smoke.yml` työn `build` jälkeen. Se noudattaa koonnin kanssa samaa koodin ja luonnosten valintaa, mukaan lukien tuetut fork-PR:t, julkaisuhaaraan kohdistuvat PR:t ja yhdistämisryhmät. Puuttuva, epäonnistunut, peruttu tai odottamatta ohitettu DAST-työ estää portin `Gate / CI`. Uudelleenkäytettävällä työnkululla ei ole itsenäistä PR- tai manuaalilaukaisinta; manuaalinen varmennus käyttää CI:n käynnistystä, jotta koonti ja kuluttaja pysyvät samassa ajossa.

`scripts/ci/next-build-provenance.mjs` sinetöi koko Next-artefaktin tar-tiivisteellä, tietovarastolla/tapahtumalla/ajolla, tuottajan yrityksellä, head/base/checkout/tree-tiedoilla, työnkulkujen tunnisteilla, lukitustiedostolla, tarkalla Node-versiolla/ABI:lla, alustalla ja niputtajalla. DAST valitsee muuttumattoman artefaktitunnuksen arvosta `needs.build.outputs`, edellyttää lataustiivisteen varmennusta ja laskee ZIP-tiivisteen itsenäisesti tuottajan tiivisteeseen verrattavaksi ennen kahden sallittujen listalla olevan jäsenen purkamista komennolla `scripts/ci/unpack-ci-build.py`. Myös manifestin ja tar-arkiston on vastattava tuottajan itsenäisiä tulosteita ennen Next-puun purkua. Se ei koskaan etsi haaran viimeisintä onnistunutta koontia. Osittainen uusinta voi käyttää samaa tuottajan yritystä, jos sen tunniste ja kaikki syötteet yhä täsmäävät; tosite kirjaa molemmat yritykset.

Kuluttaja pysyy ylläpidetyllä Linux-suorittimella, jolla on tietovarastoon vain lukuoikeus eikä tietovaraston salaisuuksia. Se asentaa tuottajan tarkan Node-version ja kokoaa sitten CLI:n asetuksella `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` hylkää puuttuvan itsenäisen palvelimen ennen mitään varakoontia; tavalliset paikalliset CLI-koonnit säilyttävät nykyisen varamenettelynsä. Palvelimen valmiuden, Schemathesis-tarkistuksen ja promptfoo-tarkistuksen on kaikkien onnistuttava työn muuttumattomassa 25 minuutin aikarajassa. Alkuperätosite todistaa syötteiden identiteetin ja tavut, ei onnistunutta DAST-skannausta. Artefaktin vanheneminen, suorittimen keskeytys tai skannerin epäonnistuminen ovat edelleen puutteellista tai epäonnistunutta näyttöä; neuvoa-antava kääre ei voi muuttaa niitä PASS-tulokseksi.

### Käyttöliittymän suorituskapasiteetti

CI suorittaa käyttöliittymän koko luettelon neljänä `test-vitest`-matriisin sirpaleena,
joista jokaisessa on enintään kaksi workeria sirpaletta kohden sekä nykyinen 15 minuutin
työkohtainen aikaraja. Ensimmäinen sirpale suorittaa myös MCP/autoCombo Vitest -testikokonaisuuden.
Pakollisen työn tulos kattaa matriisin jokaisen osan; yhden sirpaleen epäonnistuminen tai
peruuntuminen ei voi osoittaa ehdokkaan hyväksyntää.

Yöllinen tarkkailija säilyttää erillisen täsmällisen ehdokaskuitin jokaisesta käyttöliittymäsirpaleesta,
mukaan lukien MCP-suoritus ensimmäisessä kuitissa. Kaikki neljä kuittia, lokit ja vastaavat
suoritustunnisteet vaaditaan. Paikallinen `npm run test:vitest:ui` valitsee edelleen koko
testikokonaisuuden; yksi `--shard`-suoritus on vain osittaista näyttöä.

### Yksikkötestien kattavuuden kerääminen

Kaksitoista yksikkötestisirpaletta keräävät V8-kattavuustiedot nykyisen testisuorituksensa aikana.
Onnistunut sirpale suorittaa komentosarjan `scripts/ci/compact-v8-coverage.mjs`, joka pakkaa
alkuperäiset tiedostot luomatta välivaiheen Istanbul-raporttia. Lopullinen Coverage-työ todentaa
kaikki kaksitoista manifestia ehdokkaan SHA:ta, suoritusympäristöä, lähdejuurta ja datatiivisteitä
vasten ja suorittaa sitten c8:n raportoijat sekä nykyiset kattavuuskynnykset. Syötteet säilyttävät
c8:n globaalin tiedostonimijärjestyksen; sirpalekohtainen esiyhdistäminen ei ole turvallista
yhdistetylle funktio-/lohkokattavuudelle. Puuttuvat, virheelliset tai yhteensopimattomat sirpaleet
aiheuttavat hyväksynnän epäonnistumisen. Epäonnistuneet testisirpaleet säilyttävät diagnostiset
raakakattavuustiedot erikseen; niitä ei voi sisällyttää lopulliseen yhdistämiseen.

### Yksikkötestien suorituksen edistymiskuitit

Jaettu `test:unit:ci:shard`-komento kirjaa `primary`-, `dashboard`- ja `serial`-vaiheet `scripts/ci/unit-progress-reporter.mjs`-skriptin avulla. Normaali testiraportti on edelleen saatavilla. Erillinen, vain metatietoja sisältävä kuitti kirjaa kunkin tiedoston suorituksen alkamisen ja valmistumisen, ja 30 sekunnin välein lähetettävä tilapäivitys luettelee yhä aktiiviset tiedostot ja niiden kuluneen suoritusajan. Se kirjaa vain sallittujen tietojen luetteloon sisältyvät suorituksen metatiedot; testien kuvauksia, tulosteita, virheiden sisältöjä ja koko ympäristöä ei serialisoida.

CI säilyttää JSONL-tiedostot nimellä `unit-progress-ci-<run>-<attempt>-<shard>`. Työn aikakatkaisu voi estää myöhemmän latauksen; jo lähetetyt tilapäivitykset säilyvät diagnostisena aineistona. Puuttuvat tilapäivitykset voivat myös viitata estyneeseen tai keskeytettyyn suorittajaprosessiin. Nämä kuitit säilyttävät nykyisen testivalinnan, rinnakkaisuuden, määräajat ja poistumistilan; ne eivät ole päätöksiä ehdokkaan hyväksymisestä.

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

### Staattisten tarkistusten luettelo

Versioitu npm-aliasluettelo ja staattisten tarkistusten jäsenyys sijaitsevat tiedostossa
`config/quality/gate-manifest.json`. Suorita `npm run check:gate-manifest` validoidaksesi
komentosarjojen nimet ja tarkat komennot tiedostoa `package.json` vasten; lisäykset, poistot ja
komentojen muuttuminen aiheuttavat epäonnistumisen sekä paikallisessa hookissa että CI:n
muutosluokittelutöissä. Alias ei ole työnkulkutyö, matriisi-instanssi tai testitapaus: näitä
lukumääriä ei pidä esittää keskenään vaihdettavina.

Käytä komentoa `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list`
tarkastellaksesi valittuja aliaksia suorittamatta niitä. Suoritin kutsuu npm-käynnistyskohtaa,
joten sen suoritusympäristö säilyy, mukaan lukien Bun silloin, kun se on määritetty.
Manifesti kirjaa näiden profiilien ulkopuoliset aliakset erikseen kutsuttaviksi, ja
ylläpitokomennot ovat kiellettyjä vain luku -tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen tarkistuksen. Ne eivät sertifioi tuotetestejä,
kattavuutta, paketointia, ulkoisia tarkistuksia tai ehdokkaan koko julkaisuhyväksyntää.
Työnkulun hyväksyntä käyttää linkitettyä tiedostoa `config/quality/admission-policy.json` ja
komentosarjaa `scripts/quality/admission-verdict.mjs`. Julkaisutarkkailijan profiilit pysyvät
erillisinä; tarkista niiden sovellettavat tarkistukset ja kuitit itsenäisesti. Täyden tarkkailijan
staattiset komennot on määritetty tiedostossa `config/quality/release-green-static-profile.json`,
mukaan lukien `audit:deps`, mutaatiotestien valinta ja käännöstarkistukset. Lataaja validoi
npm-komennot package.json-tiedostoa ja mallinnettuja CI/Quality-määrityksiä vasten; se hylkää
poikkeamat sen sijaan, että suorittaisi komentotulkin tokeneita argumentteina. Pakollisen
skannerin SKIP/INCOMPLETE-tuloste ei voi osoittaa PASS-tilaa. Profiili kirjaa ulkoiset
rajauksensa eikä korvaa isännöityä kattavuutta, testimatriiseja, paketti- tai käyttöönottonäyttöä.
Alla oleva sanallinen luettelo on viite, ei todiste siitä, että portti todella suoritettiin.

Komentosarjat sijaitsevat hakemistoissa `scripts/check/` (käytäntöportit) ja
`scripts/quality/` (ratchet-moottori). CI:n ensisijainen totuuslähde on
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

### Vapauta PR pikapolku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI main/release PRs ssä, siirtää `main` hen, lähettää ja yhdistää ryhmiä. PRs käyttää polkusuodatettuja pikatarkistuksia. Pysyvästi poistettu käytöstä kaksoiskoonnos poistettiin; todelliset build/package/boot -sekit pysyvät CI ssa. Yksikkösarja ja vitest toimivat vain CI kielellä (`Unit Tests (N/8)` ja `Vitest`).

| Job                                              | Laajuus                                                                                                                                                                                                                                              | Estäminen                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ja docs-all                                                                                                                                                                                                             | Kyllä                         |
| `Fast Quality Gates`                             | Koodi PRs; staattiset tarkastukset, tyyppitarkistus, kojelaudan tyyppitarkastus, vaikuttaneiden yksiköiden testit                                                                                                                                    | Kyllä                         |
| `Forgotten sibling tests`                        | Koodi PRs; muuttuneet moduulit, jotka on jäljitetty staattisiin kuluttajiin ja ehdokassisarusten testeihin; tynnyri- ja dynaamisen tuontipolut raportoidaan neuvoa-antavia diagnostiikkatietoja, joihin viitataan sallittujen luettelon poikkeuksina | **neuvoa-antava**             |
| `No new ESLint warnings`                         | Koodi PRs; vaimennustietoinen nukkasuoja                                                                                                                                                                                                             | Kyllä, mukaan lukien haarukat |
| `Merge integrity (changelog + generated skills)` | Ei-luonnos PRs; muutosloki ja luotu taitojen synkronointi                                                                                                                                                                                            | Kyllä, mukaan lukien haarukat |

#### Unohtunut sisarusten testiraportti

`npm run check:forgotten-sibling-tests` toimii `Fast Quality Gates` :n neuvoa-antavana vaiheena ja käyttää uudelleen tuontiratkaisijaa testi-vaikutuskartan takana. Jokaiselle muutetulle tuotantomoduulille se raportoi deterministiset `changed module/symbol -> static consumer -> candidate sibling test` ketjut, kun ehdokastesti puuttuu pull-request diff:stä. Markdown-yhteenveto ja JSON -tulos säilytetään `forgotten-sibling-tests` -työnkulun artefaktina kalibrointia varten ennen estokäyttöönottoa.

Tynnyrijälleenvienti ja dynaaminen tuonti ovat vain resoluutiodiagnostiikkaa; ne eivät koskaan luo estävää löytöä. Arvostellut poikkeukset elävät paikassa `config/quality/forgotten-sibling-allowlist.json`. Jokaisessa merkinnässä on nimettävä kuluttaja- ja ehdokastesti, annettava erityinen perustelu ja linkitettävä GitHub ongelma tai vetopyyntö. Väärin muotoiltujen merkintöjen sulkeminen epäonnistuu. Poikkeukset eivät voi estää poistettua ehdokastestiä tai erotusta, joka lisää `.skip`/`.todo`; väitteen heikennys ja muu peitto jäävät itsenäisesti estävän `check:test-masking` portin omistukseen.

### Työ: `lint`

Suoritetaan jokaiselle `main`-haaraan kohdistuvalle PR:lle. Epäonnistuminen estää yhdistämisen.

| Skripti (`npm run ...`)           | Tarkistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Estävä                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js-versio on tuetulla alueella                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                         |
| `check:cycles`                    | Kehämäiset tuonnit kaikissa hakemistojen `src/` + `open-sse/` tiedostoissa (AST-pohjainen, tsconfigin `paths` selvitetään). Paljas komento päättyy koodilla 1 aina, kun vähintään yksi kehä on olemassa (fail-closed-malli muutoksesta #15281 alkaen), ja luettelee SCC:t. `check:cycles:ratchet` (jonka CI suorittaa) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.cycles`-rajan — tällä hetkellä 14, `direction: down`, joten arvo voi vain pienentyä (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä (räikkä)                                |
| `check:boundary`                  | `open-sse → src` -kytkentä: yksilölliset tiedostojen väliset tuonnit moottorista sovellukseen (`scripts/quality/measure-boundary.mjs`; reunaluettelo on v4:n ytimen/moduulien jaon korjausjono). Paljas komento = neuvoa-antava raportti (sama kuin `quality:boundary`). `check:boundary:ratchet` (jonka CI suorittaa ja joka on myös `quality.yml`-tiedoston nopeiden porttien räikkäsilmukassa) estää etenemisen, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.boundaryOpenSseToSrc`-rajan — alkuarvoksi on asetettu mitattu 771, `direction: down`; `--update` vain pienentää sitä; PR:issä vertailu tehdään kantaan suhteutettuna (`--base-ref`, katso alta)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä (räikkä)                                |
| `check:route-validation:t06`      | Zod-skeemat ovat käytössä kaikilla reiteillä (Tier 6 -käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` -määrä ei ylitä budjettia (taso 11, catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                         |
| `check:provider-consistency`      | Jokaisella tiedoston `providers.ts` palveluntarjoajalla on vastaava merkintä tiedostossa `providerRegistry.ts` (ja päinvastoin sallittujen luettelon rajoissa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                         |
| `check:model-lifecycle`           | Kolme manuaalisesti ylläpidettävää reititystaulukkoa pysyvät yhdenmukaisina versionhallintaan tallennetun elinkaaren tilannevedoksen (#11503) kanssa: `FITNESS_TABLE` (`taskFitness.ts`) ei pisteytä mitään käytöstä poistettua tunnusta, johon `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES`-kohde löytyy rekisteristä `REGISTRY` eikä ole käytöstä poistettujen tunnusten tilannevedoksessa; jokainen rekisterissä `REGISTRY` yhä oleva käytöstä poistettu tunnus ohjataan edelleen tai luetellaan kohdassa `allowedRetiredInCatalog`; eikä mikään `DEFAULT_DEGRADATION_MAP`-lähde tai -kohde näy käytöstä poistettuna kyseisessä tilannevedoksessa. Tämä ei todista, että malli olisi tällä hetkellä saatavilla toimivan ylävirran kautta. Offline — vertaa tiedostoon `config/quality/model-lifecycle.json`, joka päivitetään manuaalisesti komennolla `npm run quality:refresh-model-lifecycle` (vaatii verkon; ei kytketty CI-järjestelmään). `allowedRetiredInCatalog` on asteittain supistettava rajoitin: lisää merkintä vain seurantatehtävän yhteydessä.                                                                                                                                                 | Kyllä                                         |
| `check:fetch-targets`             | Jokainen asiakaspuolen hakemistossa `src/` oleva `fetch("/api/...")` viittaa todelliseen `route.ts`-tiedostoon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                         |
| `check:deps`                      | Kaikki jokaisessa repositorion `package.json`-tiedostossa olevat `npm install` -asennuskelpoiset riippuvuudet sisältyvät tiedostoon `dependency-allowlist.json`; uudet lukitsemattomat tai kirjoitusvirhekalasteluun perustuvat paketit merkitään                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                         |
| `audit:deps`                      | Kaikkien viiden itsenäisen lukitustiedoston (juuri, Electron, OpenCode-liitännäiset v1/v2 ja palveluntarjoaja) npm-tarkastus. Kriittiset tietoturvailmoitukset estävät etenemisen; korkean vakavuuden ilmoitukset jäävät näkyviksi varoituksiksi. Puuttuvat tai epäonnistuneet tarkastukset ovat KESKENERÄISIÄ ja estävät etenemisen; laajuuskohtaiset lukitustiedostojen tiivisteet ja raportit säilytetään.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                         |
| `check:lockfile`                  | `package-lock.json`-tiedoston eheys — https-rekisteri, eheystiivisteet, ei palvelinkohtaisia ohituksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                         |
| `check:licenses`                  | Tuotantoriippuvuuksien SPDX-lisenssien sallittujen luettelo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                         |
| `check:tracked-artifacts`         | Ei koontiartefakteja / versionhallintaan lisättyjä `node_modules`-symbolisia linkkejä (suoritetaan myös huskyn pre-commit-vaiheessa; pre-push on tarkoituksella kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                         |
| `check:ai-attribution`            | Ei tekoälyn/botin `Co-Authored-By`-lopputunnistetta tai tekoälyllä luomisesta kertovaa alatunnistetta PR:n commiteissa, otsikossa tai tekstissä — ehdoton sääntö #16 (`quality.yml`-tiedoston fast-gates-silmukassa PR→`release/**`-tapauksille — lukee tapahtuman hyötykuorman, ei tee mitään PR:ien ulkopuolella — sekä vain PR:ille tarkoitettu vaihe `ci.yml`-tiedoston lint-tarkistuksessa PR→`main`-tapauksille; lisäksi huskyn `commit-msg`-hook; ihmisrinnakkaistekijät ovat sallittuja; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Jokainen Vitest-poissulku nimeää seurantatehtävän ja esiintyy tiedostossa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                         |
| `check:file-size`                 | Lähdekooditiedostot (`.ts`/`.tsx` hakemistoissa `src/`, `open-sse/`, `electron/`, `bin/`) pysyvät `cap`-rajan ja testitiedostot (`*.test.ts(x)`) `testCap`-rajan sisällä; tiedostossa `file-size-baseline.json` jäädytetyt tiedostot (`frozen` / `testFrozen`) eivät saa kasvaa tallennettua kokoaan suuremmiksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                         |
| `check:error-helper`              | Suorittimien/käsittelijöiden virhevastaukset käyttävät funktioita `buildErrorBody()` / `sanitizeErrorMessage()` (ehdoton sääntö #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                         |
| `check:migration-numbering`       | Migraatioiden SQL-tiedostot on numeroitu peräkkäin ilman aukkoja tai päällekkäisyyksiä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Kyllä                                         |
| `check:public-creds`              | Ei literaaleja OAuth-arvoja `client_id`/`client_secret` tai Firebase Web -avaimia tiedoston `publicCreds.ts` ulkopuolella (ehdoton sääntö #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kyllä                                         |
| `check:db-rules`                  | Ei raakaa SQL:ää hakemiston `src/lib/db/` moduulien ulkopuolella; ei barrel-tuonteja tiedostosta `localDb.ts` (ehdottomat säännöt #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                         |
| `check:known-symbols`             | Välitystauluihinsa rekisteröidyt palveluntarjoajien suorittimet, reititysstrategiat ja muuntimet vastaavat levyllä olevia tiedostoja — ei irrallisia tai ilmoittamattomia symboleja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                         |
| `check:route-guard-membership`    | Jokainen aliprosessin käynnistävä reitti on luokiteltu funktiolla `isLocalOnlyPath()` (ehdottomat säännöt #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Kyllä                                         |
| `check:test-discovery`            | Jokainen repositorion `*.test.ts`- / `*.spec.ts`-tiedosto kerätään vähintään yhdellä testiajorilla (räikkä: `test-discovery-baseline.json`-tiedoston orpolista voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                         |
| `check:test-tla-order`            | Yksikään hakemiston `tests/unit` alla oleva `node:test`-tiedosto ei rekisteröi testiä, kohtaa ylätason `await`-lauseketta ja rekisteröi sen jälkeen lisää testejä (#18045; räikkä: `test-tla-order-allowlist.json`-tiedoston sallittujen luettelo voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                         |
| `check:agent-skills-sync`         | Luodut agenttitaitojen artefaktit vastaavat lähdeluetteloaan (ei poikkeamia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Palveluntarjoajien logoilla/resursseilla on kirjattu alkuperätieto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON-määritystiedostot jäsentyvät ja täyttävät repositorion lint-säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript-käännös ilman virheitä (vain neuvoa-antavia varoituksia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                         |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — tulevaisuuteen suuntautuva; monet jo olemassa olevat kutsukohdat tarvitsevat edelleen annotaatioita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Neuvoa-antava** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | Hakemistoon `src/app/(dashboard)/**` rajattu `tsc` (#7033) — `typecheck:core`-komennon tarkkaan valittu 27 tiedoston sallittujen luettelo ei sisällä yhtään hallintapaneelin TSX-tiedostoa, eikä `next build` myöskään koskaan tee niille tyyppitarkistusta (`next.config.mjs` asettaa arvon `ignoreBuildErrors: true`), joten irrallisten tunnisteiden regressiot siellä (#6625/#6909) eivät näkyneet CI:ssä. Vertaa jäädytettyyn tiedostokohtaiseen ja TS-koodikohtaiseen lukumäärien perustasoon (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentuneisuuden valvontamalli kuin komennossa `check:known-symbols`) — vain perustason ylittävät UUDET virheet hylkäävät tarkistuksen; alenna perustasoa valinnalla `--update`, kun aiemmin olemassa ollut virhe korjataan.                                                                                                                                                                                                                                                                                                                                                                                                                                 | Kyllä                                         |
| `check:build-typecheck`           | Koko sovelluksen tuotantotason tyyppitarkistus tiedoston `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) kautta; tarkistuksen piirissä ovat alueet, joita `typecheck:core`-tarkistuksen 27 tiedoston sallittujen tiedostojen luettelo ja dashboard-portti eivät kata. Vertaa tuloksia tiedostoon `config/quality/build-typecheck-baseline.json`; uusi tai tiedosto–koodi-kohtaisen lukumäärän kasvu aiheuttaa portin epäonnistumisen, pienempi lukumäärä pyytää pienentämään lähtötasoa. `--update` kieltäytyy toimimasta, jos suoritus sisältää uuden tai kasvaneen parin, ellei mukana ole `--force-regressions`-valitsinta, ja kieltäytyy myös tiedostosta, jonka tarkistus on hiljennetty uutena, ellei mukana ole `--force-nocheck`-valitsinta. Näin lähtötason laajentaminen vihreän tuloksen saavuttamiseksi ja pysyvän hiljennyksen myöntäminen ovat kaksi erillistä, harkittua toimenpidettä. Pelkkä `--force` hylätään. Lisäksi koontikokonaisuudesta etsitään `@ts-nocheck`-merkintöjä tiedostoa `config/quality/ts-nocheck-baseline.json` vasten, koska sitä käyttävä tiedosto ei ilmoita lainkaan diagnostiikkaa ja jäisi muuten kaikkien porttien ulkopuolelle. | Kyllä                                         |

#### Kaksi tyyppitarkistusohjelmaa antavat erilaiset vastaukset

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ja `check:build-typecheck` kääntävät eri ohjelmat eri asetuksilla,
ja sama tiedosto voi olla toisessa virheetön ja toisessa täynnä virheitä.

`tsconfig.build.json` asettaa arvon `"strict": false`, joten `noImplicitAny` on
pois käytöstä. Core-asetus kääntää kuratoidun 27 tiedoston sallittujen tiedostojen
luettelon tiukemmilla asetuksilla ja seuraa kunkin merkinnän tuontikaaviota, joten
tiedostot, joita ei koskaan esiinny koontiohjelmassa, tarkistetaan silti siellä.

Seurauksella on merkitystä arvioitaessa, onko tiedosto tyypitetty: **nolla
diagnostiikkaa `check:build-typecheck`-tarkistuksessa ei tarkoita nollaa**. Kun
`@ts-nocheck` poistettiin 26 tiedostosta, 23 niistä oli koontiohjelmassa
virheettömiä; kuusitoista niistä toi tiukemmassa ohjelmassa esiin noin 120
implicit-any-virhettä. Tarkista molemmat, ennen kuin kutsut tiedostoa
virheettömäksi.

### Työ: `quality-gate`

Suoritetaan työn `test-coverage` jälkeen. Estää yhdistämisen epäonnistuessaan.

| Skripti                      | Tarkistaa                                                                                                                                                                      | Estävä                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `quality:collect`            | Tuottaa tiedoston `quality-metrics.json` (ESLint-varoitusten määrä, kattavuus yhdistetystä osioiden raportista)                                                                | Kyllä (ennen räikkätarkistusta) |
| `quality:ratchet`            | Yksikään tiedoston `quality-baseline.json` mittari ei ole heikentynyt (ESLint-varoituksia ≤ perustaso; kattavuus ≥ perustaso)                                                  | Kyllä                           |
| `check:duplication`          | Koodin päällekkäisyys (jscpd@4) ei ylitä tiedoston `quality-baseline.json` perustasoa                                                                                          | Kyllä                           |
| `check:complexity`           | Tiedostotason syklomaattinen kompleksisuus ei ylitä enimmäisrajaa (ESLintin ydinmoduulin `complexity` + `max-lines-per-function`)                                              | Kyllä                           |
| `check:cognitive-complexity` | Kognitiivisen kompleksisuuden räikkätarkistus (`eslint-plugin-sonarjs`) — erillinen ESLint-ajo; CI suorittaa molemmat yhdistettynä yhtenä `check:complexity-ratchets`-vaiheena | Kyllä                           |
| `check:dead-code`            | Käyttämättömien vientien/tiedostojen räikkätarkistus (knip) ei heikkene perustasoon verrattuna                                                                                 | Kyllä                           |
| `check:compression-budget`   | Pakkausvertailun budjetti — moottorikohtaiset tunnistesäästöjen vähimmäisrajat eivät saa heikentyä                                                                             | Kyllä                           |
| `check:type-coverage`        | Tyypitetyn osuuden räikkätarkistus (`type-coverage`) ei heikkene; korvaa suurelta osin tarkistuksen `typecheck:noimplicit:core`                                                | Kyllä                           |

### Työt: `codeql-scan` ja `codeql-admission`

`codeql-scan` tuottaa kaikki määritetyt analyysiluokat. Työn onnistuttua `codeql-admission` varmentaa sen täsmälliset lähetykset ja ehdokkaan hälytysten kiristysrajan. Molemmat ovat portin `Gate / CI` pakollisia riippuvuuksia myös vain dokumentaatiota muuttaville ehdokkaille. Hallinnollisen aktivoinnin ja canary-kokeen vaatimukset kuvataan jäljempänä kohdassa ”CodeQL-kiristysraja”.

| Skripti                | Varmentaa                                                                                                                                                                                                                            | Estävä |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `check:codeql-ratchet` | Ehdokkaan ref/SHA ja kaikkien määritettyjen analyysiluokkien on oltava ajantasaisia ennen hälytysten kiristysrajaa; puuttuva näyttö estää etenemisen. Globaali inventaario pysyy erillisenä — katso ”CodeQL-kiristysraja” jäljempänä | Kyllä  |

### Työ: `quality-extended`

Työ estää soveltuvien ehdokkaiden etenemisen. Paketin koko, salaisuuslöydökset, haavoittuvuuslöydökset,
työnkulkulöydökset ja OpenAPI-muutokset tarkistetaan pakollisilla räikkätarkistuksilla.
Kehämäisten riippuvuuksien diagnostiikka on edelleen neuvoa-antava. Tarkistustyökalujen asennus on pakollinen:
`scripts/ci/install-quality-scanners.sh` asentaa kiinnitetyt versiot ja välittää
asennusvirheet eteenpäin. Puuttuvat työkalut, virheelliset raportit tai puuttuvat perustasot jättävät
pakollisen tarkistusportin KESKENERÄISEKSI.

| Komentosarja             | Tarkistaa                                                                                                                                                                                                                                                      | Estävyys                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Ei syklisiä riippuvuuksia (dpdm)                                                                                                                                                                                                                               | **Ohjeellinen**                                  |
| `check:bundle-size`      | Paketin koko ei ylitä ylärajaa; mittauksen epäonnistuminen aiheuttaa hylkäyksen                                                                                                                                                                                | **Estävä --ratchet-valitsimen kanssa**           |
| `check:secrets`          | Gitleaks-havainnot eivät lisäänny; pakolliset tarkistukset hylkäävät puuttuvat työkalut, lähdekoodin tai vertailutason sekä epäonnistuneet tarkistukset ja virheelliset raportit                                                                               | **Estävä --ratchet-valitsimen kanssa**           |
| `check:vuln-ratchet`     | Riippuvuuksien haavoittuvuudet eivät lisäänny; pakolliset tarkistukset hylkäävät puuttuvat työkalut, virheelliset raportit tai puuttuvat vertailutasot                                                                                                         | **Estävä --ratchet-valitsimen kanssa**           |
| `check:workflows`        | Työnkulkujen lint-tarkistus (actionlint + zizmor); puuttuvat tai vialliset tarkistimet, virheelliset raportit tai puuttuva ratchet-vertailutaso aiheuttavat INCOMPLETE-tilan. Kelvollisiin havaintoihin sovelletaan valittua strict/advisory/ratchet-käytäntöä | Suoritus vaaditaan; zizmor-ratchet estävä CI:ssä |
| `check:openapi-breaking` | Julkinen API-sopimus verrattuna kiinnitettyihin tapahtumien committeihin (PR:n merge-base, pushin before, merge-groupin base; ajoitetussa/manuaalisessa ajossa checkout-haaran ensimmäinen ylätaso); pakollisen mittauksen epäonnistuminen estää etenemisen    | **Estävä --ratchet-valitsimen kanssa**           |

### Työ: `docs-sync-strict`

Kun pull request kohdistuu haaraan `main` tai `release/**`, tämä työ suoritetaan vain ehdokkaille, jotka eivät ole luonnoksia (tai jotka tulevat luotetusta jonosta) ja jotka on luokiteltu dokumentaatio- tai koodimuutoksiksi. Työ suoritetaan myös CI-tapahtumissa, jotka eivät liity PR:ään; tämän työnkulun push-käynnistin kattaa vain haaran `main`, ei haaroja `release/**`. Vaihe, jonka paluukoodi on muu kuin nolla, estää työn onnistumisen; pelkästään raportoitavat havainnot ja alla dokumentoidut poikkeukset eivät estä sitä.

| Komentosarja                   | Tarkistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Estävyys                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metaportti, joka suorittaa alla olevat seitsemän aliporttia peräkkäin                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                                                                                                                              |
| ↳ `check:docs-sync`            | Paketin, OpenAPI:n ja CHANGELOGin versioiden yhdenmukaisuus, `llm.txt`-tiedoston täsmälliset peilikopiot, käännetyn CHANGELOGin osio- ja kokoinvariantit sekä korvattujen päällekkäisten dokumenttien puuttuminen                                                                                                                                                                                                                                                                                                                                 | Kyllä                                                                                                                                              |
| ↳ `check:docs-frontmatter`     | Käännetyillä dokumentaatiosivuilla on kelvolliset frontmatter-otsikot                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Kyllä                                                                                                                                              |
| ↳ `check:docs-counts`          | Luotettavat lukumääräinvariantit tarkistetaan tiukasti; heuristiset tiedostomäärien tarkistukset antavat vain varoituksia, ellei skriptille anneta valitsinta `--strict` (CI:n metaportti ei anna sitä)                                                                                                                                                                                                                                                                                                                                           | Tiukka taso on estävä; pehmeä taso on ohjeellinen                                                                                                  |
| ↳ `check:env-doc-sync`         | Lähdekoodissa tehtävät ympäristömuuttujien lukemiset, `.env.example` ja `docs/reference/ENVIRONMENT.md` vastaavat toisiaan, kun on sovellettu nimenomaisia poikkeuslistoja ohitettaville, vain dokumentaatiossa oleville ja vain ympäristössä oleville muuttujille                                                                                                                                                                                                                                                                                | Kyllä, dokumentoitujen poikkeuslistojen ulkopuolella                                                                                               |
| ↳ `check:deprecated-versions`  | Raportoi mahdollisesti vanhentuneet versiot turvallisten historiallisten asiayhteyksien ulkopuolella sekä vanhentuneet päivityspäivämäärät; ohitettavat dokumentit jätetään pois                                                                                                                                                                                                                                                                                                                                                                  | Ohjeellinen nykyisessä CI-kytkennässä (`--strict`-valitsinta ei anneta)                                                                            |
| ↳ `check:doc-links`            | Dokumentaation sisäiset markdown-linkit osoittavat olemassa oleviin tiedostoihin (`[text]`/`(path)`-muodossa)                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä                                                                                                                                              |
| ↳ `check:fabricated-docs`      | Dokumentaatiossa mainitut reitit, ympäristömuuttujat, CLI-komennot, hook-nimet ja tiedostopolut ovat olemassa koodikannassa. Estävä portti `--strict`-valitsimella; ilman valitsinta epäonnistuminen ei estä etenemistä.                                                                                                                                                                                                                                                                                                                          | Kyllä (`--strict` CI:ssä)                                                                                                                          |
| `check:cli-i18n`               | CLI:n käyttämät `t()`-avaimet ovat olemassa kielessä `en`; `pt-BR` säilyttää jokaisen ylimmän tason osion; kielet `zh-CN` ja `zh-TW` sisältävät kaikki kielen `en` avaimet                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                                                                                                                              |
| `check:openapi-coverage`       | OpenAPI-määritys kattaa vähintään ratchet-menetelmällä määritetyn vähimmäisosuuden todellisista reiteistä                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                                                                                                                              |
| `check:openapi-security-tiers` | Ilmoitettujen `x-loopback-only`/`x-always-protected`-annotaatioiden on perustuttava tiedoston `routeGuard.ts` toimintaan; jäsennysvirheet ja eteenpäin suuntautuvan tarkistuksen ristiriidat estävät onnistumisen. Käänteinen tarkistus varoittaa puuttuvasta `x-loopback-only`-annotaatiosta vain paikallisen käytön sallivien etuliitteiden alla, eikä käänteiseen tarkistukseen sisälly vain reittikuvioiden perusteella määriteltyjä reittejä.                                                                                                | Jäsennys- ja eteenpäin suuntautuvat tarkistukset ovat estäviä; käänteinen tarkistus on ohjeellinen                                                 |
| `check:openapi-routes`         | Jokainen tiedoston `openapi.yaml` polku `/api...` vastaa todellista reittiä parametrien eroista riippumatta, kun perusteltua `KNOWN_STALE_SPEC`-poikkeuslistaa on sovellettu; myös poikkeuslistan vanhentuneet merkinnät aiheuttavat epäonnistumisen                                                                                                                                                                                                                                                                                              | Kyllä                                                                                                                                              |
| `check:docs-symbols`           | Kanonisten, muiden kuin peilidokumenttien sisäiset `/api/...`-URL-viittaukset vastaavat todellista reittiä tai reittiperhettä; välityspalvelin-, taustapalvelin-, paikkamerkki- ja tiedostoviittaukset sekä perustellut `KNOWN_STALE_DOC_REFS`-merkinnät jätetään pois, ja vanhentuneet poikkeuslistamerkinnät aiheuttavat epäonnistumisen                                                                                                                                                                                                        | Kyllä                                                                                                                                              |
| `i18n translation drift`       | Tarkistaa keskeisten dokumenttien lähde-/kohdetiivisteet ja käännöksen alkuperän. PR-vertailu sallii vain identtiset perityt virheet; uudet tai varmentamattomat lähteen, puuttuvan kohteen, kohdetiivisteen, vanhentuneen käännöksen tai osiovälimuistin ristiriidat estävät etenemisen. PR-vertailun ulkopuolella lähteen/puuttuvan kohteen/kohdetiivisteen virheet estävät etenemisen, kun taas vanhentuneet käännökset ja ristiriitaiset osiovälimuistit jäävät vain varoituksiksi. Vanhanmuotoisen osiovälimuistin puuttuminen ei ole virhe. | Uusi/varmentamaton PR-poikkeama estää etenemisen; identtinen peritty poikkeama on vain varoitus; PR:n ulkopuoliset säännöt riippuvat virhetyypistä |

`docs/diagrams/`-hakemiston kaksitoista README-SVG:tä luodaan automaattisesti (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` luo ne kaikki uudelleen). Jokaisella on tavukohtainen yksikkötesti (`tests/unit/docs/readme-*-svg.test.ts`, työ `test-unit`), joka epäonnistuu, kun versionhallintaan kirjattu tiedosto on vanhentunut, ja `check:docs-counts` lukee kanoniset luvut niiden `<text>`-solmuista — siksi ääriviivojen muodostusvaihe säilyttää jokaisen ääriviivaksi muunnetun merkkijonon tiedostossa näkymättömänä `<text>`-elementtinä. SVG:n kanonisten lukujen tarkistus lukee `SVG_DIAGRAM_FILES`-muuttujassa luetellut tiedostot (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` sekä `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`; väitteet free-forever-, catalog-entry-, recurring-pool- ja scoring-factors-ominaisuuksista lukevat lisäksi tiedostoista `promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. `free-tier-budget.svg` muodostaa lukunsa reaaliaikaisesta katalogin lataajasta, joten muutos kohteeseen `FREE_MODEL_BUDGETS` tai palveluntarjoajan näyttönimeen rikkoo CI:n, kunnes tiedosto luodaan uudelleen.

### Työ: `i18n-ui-coverage`

| Skripti                             | Tarkistaa                                                                                                                                                                                                                 | Estävä     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (sisäinen) | Käyttöliittymän i18n-avainten kattavuus on ≥ 65 %                                                                                                                                                                         | Kyllä      |
| `check-ui-value-drift` (sisäinen)   | Uudelleenkirjoitettu englanninkielinen **arvo** ei jätä jälkeensä vanhentuneita käännöksiä                                                                                                                                | Kyllä      |
| `check-new-key-coverage` (sisäinen) | **Uusi** englanninkielinen avain on käännetty jokaisella kielialueella — `__MISSING__:`-merkintää ei hyväksytä                                                                                                            | Kyllä      |
| `check-translation-ratio`           | Aitojen käännösten suhde kielialueittain (englannin kanssa identtiset / paikkamerkit / puuttuvat lehdet sallittujen luettelon ulkopuolella) ei saa ylittää arvoa `config/quality/i18n-translation-baseline.json` + jousto | **Estävä** |

Edellyttää asetusta `fetch-depth: 0` — arvojen muuttumisen tarkistus vertaa tiedostoa `en.json` yhdistämiskantaan.

#### `check-ui-value-drift` — vanhentuneiden käännösten tarkistus

Havaitsee yhden i18n-regression, jota muut tarkistukset eivät rakenteellisesti pysty havaitsemaan: englanninkielinen arvo
kirjoitetaan uudelleen, mutta _aiempaan_ englanninkieliseen arvoon perustuvat käännökset jäävät ennalleen, joten
muunkieliset käyttäjät lukevat edelleen vakuuttavasti muotoiltua mutta nyt virheellistä tekstiä.

Tämä päätyi oikeasti julkaisuun. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravity-
kirjautumisavustaja lisättiin (#5203); **39 kielialuetta 43:sta** säilytti tekstin, joka kehotti ylläpitäjiä "kopioimaan
koko URL-osoitteen ja liittämään sen alle" — työnkulku ei voi valmistua kyseisellä palveluntarjoajalla. Ongelmaa
ei huomattu ennen muutosta #8463, koska:

- `sync-ui-keys` täydentää vain **puuttuvat** avaimet, ei koskaan **vanhentuneita**;
- `check-ui-keys-coverage` laskee avaimen _olemassaolon_, joten vanhentunut käännös katsotaan katetuksi;
- `check-translation-drift` seuraa dokumentaation `docs/i18n/<locale>/**.md`-peilejä —
  se ei koskaan lue tiedostoja `src/i18n/messages/*.json`. Estävä työssä `docs-sync-strict` versiosta
  2026-09 tehdystä uudelleensynkronoinnista lähtien: muokkaa ydindokumenttia → `npm run i18n:run -- --files=<doc>` (osiotasoinen ja kevyt).

**Erot huomioiva, ei perustasoon pohjautuva.** Se vertaa yhdistämiskannan tiedostoa `en.json`
työpuuhun; jos englanninkielinen arvo on muuttunut, jokainen kielialue, jossa on edelleen
muuttumaton käännös, katsotaan vanhentuneeksi. Tämä tarkoituksella **jäädyttää olemassa olevan velan** — ero
ei voi paljastaa, mistä vanhasta englanninkielisestä tekstistä pitkään käytössä ollut käännös on peräisin, joten tarkistus arvioi
vain nykyisen muutoksen koskettamia kohtia. Vaihtoehto (avainkohtainen hajautusarvojen perustaso) vaatisi
noin 600 kt:n generoidun tiedoston, joka olisi kolme kertaa suurinta nykyistä perustasoa suurempi ja muuttuisi jokaisessa i18n-PR:ssä.

Tarkistuksen voi läpäistä kahdella tavalla:

1. päivitä asianomaiset käännökset tai
2. aseta niiden arvoksi `__MISSING__:<new english>` — tällöin suoritusympäristö näyttää korjatun englanninkielisen tekstin
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ja avain lisätään käännösjonoon.

Jos merkkijonon **merkitys** muuttui, suosi **avaimen uudelleennimeämistä**: uusi avain ei voi periä
vanhentunutta käännöstä. Muutoksessa #8463 käytettiin tätä mallia.

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

### Työ: `test-vitest`

Edellyttää `changes`-luokittelutyötä. Sovellettavien matriisiosioiden epäonnistuminen estää yhdistämisen.

| Kokonaisuus      | Validoi                                                                | Estävä                                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-palvelin (110 työkalua), autoCombo, välimuisti — vitest-suorittaja | Kyllä                                                                                                                                                         |
| `test:vitest:ui` | Käyttöliittymäkomponenttien testit — vitest-suorittaja                 | **Estävä** — ennestään olemassa olevat virheet on nimenomaisesti suljettu pois tiedostossa `vitest.config.ts`; uudet virheet aiheuttavat työn epäonnistumisen |

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
