# Release-Green: candidate validation and evidence (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green tarkkailee tiettyä sitoumusta ja raportoi sen validointitulokset. [Quality Gates -viite](../architecture/QUALITY_GATES.md) määrittelee nykyiset CI profiilit, vaaditut tarkastukset ja hyväksymiskäytännöt. Versioitu [pääsykäytäntö](../../config/quality/admission-policy.json) on suoritettava sopimus `Gate / CI` ja `Gate / Quality`.

## CI ja tarkkailijan laajuus

`ci.yml` ja `quality.yml` -kansi vetävät pyynnöt pää- ja vapautushaaroihin. Valittu profiili määrittää, mitkä työpaikat ovat voimassa. Full CI sisältää myös kaistat, joita tavallinen vetopyyntö ei suorita. Nopea tarkkailijatulos ei voi korvata näitä töitä, eikä valmis työnkulun kääre voi korvata kuittejaan.

Tuotantorakennus kuuluu CI. `quality.yml` ssä ei ole päällekkäistä neuvoa-antavaa koontiversiota. Puuttuvat esineet, peruutetut työt ja epätäydelliset mittaukset eivät takaa onnistunutta vaadittua tarkistusta. Vahvista nykyinen tukikohta, pää ja yhdistetty ehdokas ennen tulosten hyväksymistä.

## Paikallinen vahvistus

Aja tarkkailija omistamassasi työpuussa valmisteltuasi sen riippuvuudet. Käytä [työpuu- ja resurssiprotokollaa](WORKTREE_ISOLATION.md) ennen raskasta validointia.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Pikaprofiili on osittainen. Täysi profiili tarkistaa mallinnetut vaatimukset ja säilyttää komentokuitit; se ei sertifioi käyttöönottoa tai korvaa sovellettavia isännöityjä tarkastuksia. Raportti erottaa suoritusvirheen metrisestä ajautumisesta. Vaaditut räikkäät estävät edelleen valitun käytännön mukaisesti. Älä nosta perusviivaa vain saadaksesi ohimenevän tuloksen.

## Lakaisu iltaisin ja käsin

Iltaiset julkaisut ja yhteensopivuuden ratkaisejat valitsevat kanonisen julkaisuhaaran. Tämän valinnan on vastattava työnkulun käynnistävää haaraa, ja sviitit käyttävät tapahtuman muuttumatonta SHA. Manuaalista suorittamista varten valitse aiottu julkaisu `release_branch` ssä ja lähetä samaan viitenumeroon:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Haarojen välinen lähetys hylätään ennen valitun koodin suorittamista. Isännöity pääsarja tarkistaa `main` ja varmistaa, että sen SHA vastaa edelleen ratkaistua kohdetta ennen asennusta. Jos pääliikkeitä ratkaisemisen aikana, suorita epätäydellinen pyyhkäisy uudelleen uudelle vahvistukselle. Älä yhdistä eri ehdokkaiden sarjakuitteja.

## Epäonnistumisen triage ja toipuminen

Käytä tapausta diagnostiikkaindeksinä ja tarkasta sitten tarkka ajo, yritys, epäonnistunut vaihe ja artefakti. Vertaa vastaavia perus- ja ehdokastodisteita ennen kuin luet epäonnistumisen osallistujan syyksi. Infrastruktuurivirheet, periytyneet viat, ehdokasregressiot ja odottavat hyväksynnät vaativat erilaisia korjaustoimenpiteitä.

`/green-prs`, `/sweep-reds`, `/validate-release-green` ja `/babysit` -taidot keräävät todisteita ja valmistelevat korjauksia dokumentoidussa laajuudessaan. Säilytä avustaja, käytä erillisiä korjaushaaroja ja tarkista kaikki vaaditut tarkistukset ennen valtuutettua yhdistämistä. Mikään automaattinen uudelleenlähtökohta tai tapahtuman sulkeminen ei korvaa ohittavaa nykyistä ehdokasta.
