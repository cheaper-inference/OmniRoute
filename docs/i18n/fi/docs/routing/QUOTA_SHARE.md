# Quota Sharing Engine (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumenttiviite**: `docs/routing/QUOTA_SHARE.md`
> Osa ryhmää B (suunnitelmat 16 + 22).

---

## Yleiskatsaus

Kiintiönjakojärjestelmä jakaa palveluntarjoajan aikaperusteisen kiintiön (esim. Codexin
5 tunnin ikkuna, Kimin 1500 pyyntöä/h) oikeudenmukaisesti useille API-avaimille, jotka käyttävät
samaa yhteyttä.

**Ratkaistava ongelma:** OmniRoute välittää useiden API-avainten pyynnöt samalle ulkoisen
palveluntarjoajan tilille. Ilman jakologiikkaa avaimen A aiheuttama kuormituspiikki voi kuluttaa
palveluntarjoajan koko tuntikiintiön, jolloin avaimet B ja C estetään, kunnes ikkuna nollautuu.
Järjestelmä estää tämän seuraavasti:

1. Se seuraa kunkin avaimen liukuvaa kulutusta ulottuvuuksittain (%, pyynnöt, tokenit, $).
2. Se käyttää työtä säästävää oikeudenmukaisen jaon algoritmia: avain voi lainata käyttämättömistä
   osuuksista niin kauan kuin globaali varanto ei ole ylikuormittunut.
3. Se panee tuloksen täytäntöön suorituskykykriittisellä polulla (`chatCore.ts`) ennen kuin pyyntö
   saavuttaa ulkoisen suorittajan.

---

## Algoritmi: Fair-Share Work-Conserving

Toteutettu `src/lib/quota/fairShare.ts`.

### Tilat

| Kunto                                      | tila         | Käyttäytyminen                                                                        |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Antelias** | Avain voi lainata globaaliin rajaan asti, josta on vähennetty kulutettu kokonaismäärä |
| `globalUsedPercent >= saturationThreshold` | **Tiukka**   | Täytä yksilöllinen oikeudenmukainen osuus tiukasti                                    |

Oletusarvoinen `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Nämä kaksi tilaa kuvaavat poolia oletuslainaustilassa, `saturation`. `consent` tilassa oleva pooli noudattaa aina tiukkoja sääntöjä, oli kylläisyys mikä tahansa. Katso [Suostuva lainaus (pool-kohtainen osallistuminen)](#consented-lending-per-pool-opt-in).

### Dimensiokohtainen päätös

Jokaiselle poolissa olevalle aktiiviselle ulottuvuudelle moottori laskee:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

`percent` ulottuvuuksille `consumed` tulee sen sijaan attribuutiokirjasta (katso [Prosenttimittasuhteet: attribuutio avainta kohti](#percent-dimensions-per-key-attribution) ).

Sitten:

- **`policy = hard`** : jos `consumed > fairShareAllowed` ja tila on tiukka →** lohko** .
- **`policy = soft`** : jos `consumed > fairShareAllowed` ja tila on tiukka →** rangaista** (priorisoi yhdistelmässä; ei koskaan kovaa estoa).
- **`policy = burst`** : salli, kun globaali liikkumavara on olemassa kohtuullisesta jaosta riippumatta.

### Cap absoluto

`capValue` + `capUnit` allokaatiossa on kova katto, joka on riippumaton tilasta tai käytännöstä. Mikä tahansa ulottuvuus, jossa `consumed >= capValue` aina** lohkot** pyyntö. `percent` korkissa `consumed` on vain avaimelle kuuluva osa.

### Moniulotteinen tarkistus

Pyyntö estetään, jos** mikä tahansa** ulottuvuus uima-altaassa estäisi sen. Mitat ovat riippumattomia — a 5h% uupumus ei vaikuta viikoittain% mittaan.

### Lainaus

Anteliaassa tilassa avain, jonka allokaatio on alikäyttöinen, voi käyttää muiden avainten allokoimattomien osuuksien ylijäämää. Kaava on:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

missä `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` tälle ulottuvuudelle) on aina kova katto.

### Suostuva lainaus (poolikohtainen valinta)

Jokaisella poolilla on lainaustila. `saturation` on oletusarvo ja säilyttää yllä olevat säännöt. `consent` tilassa `hard` -avain välittää osuutensa vain siinä kapasiteetissa, jonka muut avaimet ovat suostuneet lainaamaan. Järjestelmänvalvoja määrittää kunkin poolin tilan. Jokainen avaimenhaltija antaa oman suostumuksensa [lainaussuostumuksella](#lending-consent).

Suostumus on prosenttiosuus 0–100 ja valinnainen määräaika millisekunteina. Avain lainaa sen prosenttiosuuden käyttämättömästä osuudestaan, kun määräaika on tulevaisuudessa.

Yhdelle ulottuvuudelle `L` on tehokas raja: suunnitelman raja kertaa poolin tilit. Portti laskee pyytävälle avaimelle:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` on avaimen paino tai `100 / n` jokaiselle näppäimelle, kun mikään paino ei ole suurempi kuin 0. `lend_k` on avaimen aktiivinen prosenttiosuus ja 0 sen määräajan umpeuduttua. Pyytävän avaimen omaa suostumusta ei koskaan lasketa. `hard` -näppäin hylätään, kun sen kulutus saavuttaa osuutensa plus `borrowAvailable`.

Kapasiteettia, jota ei vaadita allokaatiosta (100 miinus painojen summa), ei voi lainata. Mikään avain ei suostunut lainaamaan sitä.

**Esimerkki.** `L` on 1000.

| Avain | Paino | Jakaa | Kulutettu | Lainaa |
| ----- | ----- | ----- | --------- | ------ |
| A     | 50    | 500   | 530       | 0%     |
| B     | 30    | 300   | 100       | 50%    |
| C     | 0     | 0     | 60        | 0%     |

- B lainaa 50 % tyhjäkäynnistään 200, mikä on 100. C otti jo 60 yli osuutensa. A voi lainata 40.
- A tarjoillaan hintaan 530, ja se hylätään, kun sen kulutus saavuttaa 540.
- Ennen kuin C käytti mitään, kun A oli osuutensa suuruinen tai pienempi, C saattoi lainata 100.
- Ennen kuin C käytti mitään, kun A oli 530, C saattoi lainata 70.

**Paino nolla.** Avaimen, jonka paino on 0, osuus on 0. Se tarjoillaan vain, kun sen kulutus on pienempi kuin muiden lainaaminen. Kun kukaan ei lainaa, se evätään sen ensimmäisestä pyynnöstä.

**Määräajat.** Mikään taustatehtävä ei vanhene suostumusta. Jokainen pyyntö vertaa määräaikaa omaan aikaansa, ja sitä vastaava määräaika on kulunut. Tallennettu määräaika, joka ei ole rajallinen luku tai joka on ylittänyt suurimman `Date` päivämäärän, lasketaan ohitetuksi.

**`soft` ja `burst`.** Lainaus ei rajoita niitä. `soft` avain priorisoidaan, kun sen osuus on ohitettu. `burst` avain kulkee, kun uima-altaalla on tilaa. Altaan katto hylkää silti jokaisen avaimen, kun altaan kokonaismäärä saavuttaa rajansa.

**Pyyntöpolun hinta.** `saturation` -allas ei lue mitään muuta kuin ennen. `consent` poolissa laskettava ulottuvuus lukee muut avaimet vain `hard` avaimelle, joka on sen osuudella tai sen yläpuolella, kun taas toinen avain lainaa. Sitten se lukee yhtä toista avainta kohti rinnakkain. Epäonnistunut luku lasketaan kulutukseksi 0 tälle avaimelle. `percent` mitta ei lisää lukemista, koska merkintäkirja sisältää kaikki avaimet.

**Altaan muokkaaminen.** Muokkaus säilyttää jäljellä olevien avainten suostumuksen. Tämä koskee kohdistamisen muokkauksia, ryhmänlaajuisia korvauksia ja `ensure` kutsuja. Poistettu avain menettää suostumuksensa, ja takaisin lisätty avain alkaa nollasta. Järjestelmänvalvojan reitit palauttavat jokaisen avaimen suostumuksen eivätkä koskaan kirjoita sitä. Poolin vaihtaminen takaisin `saturation` tilaan säilyttää jokaisen tallennetun suostumuksen, jolla ei ole vaikutusta kyseisessä tilassa. Poolin vaihtaminen uudelleen `consent` aktivoi uudelleen tallennetut suostumukset, joiden määräaika ei ole umpeutunut. Avaimenhaltija voi tyhjentää tallennetun suostumuksen kummassa tahansa tilassa.

**Päivitys.** Jos sarakkeet `lending_percent` ja `lending_until` ovat jo olemassa, siirto lisää vain `borrow_mode`, ja tallennetut prosenttiosuudet pysyvät ennallaan. Jokainen allas alkaa `saturation` tilassa. Ota `consent` käyttöön poolia kohden allasvelhossa. Tallennetuista arvoista ei päätetä mitään.

**Rajoitukset.**

- Lainanantaja voi löytää poolin sen katosta ennen kuin se käyttää omaa osuuttaan. Muiden lainaama kapasiteetti lasketaan poolin kokonaismäärään.
- Tarkistus suoritetaan ennen pyyntöä eikä varaa mitään. Samanaikaiset pyynnöt lukevat kulutuksen ennen kuin ne kirjataan, joten lainattua kapasiteettia voidaan käyttää useammin kuin kerran lennon aikana tehtävien pyyntöjen mukaan. `saturation` -tilan jakotarkistuksella on sama ominaisuus.

---

## Liukuvan ikkunan laskuri

Toteutettu tiedostoissa `src/lib/quota/sqliteQuotaStore.ts` ja `redisQuotaStore.ts`.

Kaksi säiliötä kutakin `(apiKeyId, dimensionKey)`-paria kohden:

- `curr`: nykyinen säiliö (`floor(nowMs / windowMs)`)
- `prev`: edellinen säiliö (`curr - 1`)

Efektiivinen liukuva arvo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Tarkkuus**: noin 99 %. Virhe on enintään 1 % ikkunan koosta säiliöiden
rajalla (2 säiliön approksimaatiolle luontainen ominaisuus).

### Samanaikaisuus

SQLite-ajuri: muistissa oleva mutex-lukko kutakin `(apiKeyId | dimensionKey)`-avainta kohden estää
luku–muokkaus–kirjoitus-kilpatilanteen. Malli vastaa tiedoston `src/sse/services/auth.ts` ruuhkapiikkien vastaista toteutusta.

Redis-ajuri: Lua EVAL -komentosarja atomiseen kasvatukseen — suoritetaan yhtenä Redis-komentona.

---

## Ajurit

### SQLite (oletus, ei asennusta)

- Taulu: `quota_consumption` (katso migraatiot `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Soveltuu parhaiten yhden instanssin käyttöönottoihin.
- Kaikki pysyväistallennus tapahtuu nykyisessä OmniRoute SQLite -tietokannassa (`DATA_DIR/storage.sqlite`).

### Redis (valinnainen, useita instansseja)

- Edellyttää `ioredis`-npm-pakettia.
- Laskurit tallennetaan Redisiin; metatiedot (poolit/kiintiövaraukset) säilyvät edelleen SQLitessä.
- Soveltuu parhaiten usean replikan käyttöönottoihin, joissa laskurit on jaettava.

### Ajurin vaihtaminen

Asetuskäyttöliittymän kautta (`/dashboard/settings` → Kiintiötallennus) tai ympäristömuuttujilla:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Tietokanta-asetus ohittaa ympäristömuuttujan. Jos `driver=redis`, mutta URL-osoite puuttuu tai
`ioredis` ei ole asennettuna, tehdas palautuu SQLiteen ja kirjaa varoituksen.

Ajurin valintajärjestys:

1. Tietokanta-asetus `quotaStore.driver`
2. Ympäristömuuttuja `QUOTA_STORE_DRIVER`
3. Oletus: `sqlite`

---

## Moniulotteinen

Uima-altaalla voi olla useita ulottuvuuksia. Jokainen ulottuvuus on itsenäinen:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Esimerkki: Codex suunnitelma** (5h% + viikoittain%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Pyynnön on täytettävä kaikki mitat, jotta se voidaan hyväksyä.

### Prosenttimitat: avainkohtainen attribuutio

Prosenttisuunnitelma raportoi yhden käyttöluvun tiliä ja suunnitelmaikkunaa kohti. Palveluntarjoaja ei anna laskuria API avainta kohti.

Voit jakaa tämän luvun avaimien kesken siten, että jokainen pooli pitää attribuutiokirjaa tiliä ja suunnitelmaa kohti. `src/lib/quota/percentLedger.ts` noudattaa kirjan sääntöjä. `src/lib/quota/percentAttribution.ts` muuttaa kirjan numeroiksi, joita valvonta käyttää. Tuloksena on arvio, joka on rakennettu kunkin avainreitin tokeneista.

#### Lukemat, jotka liikuttavat kirjaa

Kirja liikkuu vain toimittajan omalla luvulla pyydetylle suunnitelmaikkunalle. Nämä yhteydet ilmoittavat yhden:

| Palveluntarjoaja              | Suunnittele ikkunat |
| ----------------------------- | ------------------- |
| ClaudeOAuth -liitännän kautta | `5h`, `weekly`      |
| Codex                         | `5h`, `weekly`      |

Näitä ei lasketa lukemiksi:

- vastaus, jonka palveluntarjoaja asiakas merkitsee vanhentuneeksi
- Claude ikkuna, jonka prosenttiosuutta palveluntarjoaja ei ilmoittanut
- toisen ikkunan kuva tai pahimmassa tapauksessa ikkunoiden välillä
- nopeusrajan otsikon varavalinta
- epäonnistunut luku

Muilla palveluntarjoajilla, mukaan lukien Claude API -avaimella, ei ole kirjaa. Jokaisesta avaimesta veloitetaan 0 prosenttimitoistaan, kuten ennen tätä muutosta.

Lukema jakaa kyllästyssignaalin 30 sekunnin välimuistin. Claude -lukema on päivätty sillä hetkellä, kun luku havaittiin vastausotsikoissa, tai luettu käytön päätepisteestä, kun aika tiedetään. Muut lukemat on päivätty välimuistimerkinnän luomisajankohtaan mennessä.

#### Mitä kirja säilyttää

Jokainen tallennettu pyyntö lisää tunnuksensa kerran laskuriin poolia, tiliä ja avainta kohti. Laskuri vain kasvaa. Kirjassa on kolme asiaa:

- perusviiva: luku, jolloin kirja avattiin tai ikkuna viimeksi kääntyi
- viimeksi käytetty kuva
- per avainta, sen merkkilaskuri samalla hetkellä, jota kutsutaan sen merkiksi

Kirja päivitetään, kun täytäntöönpano tai käyttöreitti laskee tekijän. Kirjoituksia verrataan ja asetetaan versionumeroon. Kirjoittaja, joka epäonnistuu uudelleenlukemisen yhteydessä.

#### Kuinka avaimen osa lasketaan

Kunkin näppäimen osa lasketaan, kun kirjaa luetaan. Kuvion kasvu perusviivasta lähtien jaetaan avainten kesken suhteessa merkinnän jälkeen kullekin reititettyyn tokeneihin.

Together, nämä merkit selittävät korkeintaan yhden pisteen luvusta `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` tokeneita kohti (oletusarvo 1 000). Kasvu, jota he eivät selitä, on ulkoista. Perustaso on myös ulkoinen.

Esimerkiksi kirja avautuu kohdassa 0. Avain A reitittää sitten 900 000 merkkiä ja avain B reitittää 100 000. Lukulla 60 A:n osa on 54 pistettä ja B:n osa 6.

Avaimen merkin alla oleva laskuri on käynnistynyt uudelleen ja laskee kokonaan. Avain ilman merkkiä, kuten avain, joka liittyy pooliin ikkunan keskellä, laskee kaikki merkit. Luku, joka viivästyy tokeneista, aiheuttaa virheen, joka poistuu seuraavassa lukemassa. Se ei kerry.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` luetaan jokaisesta merkinnästä. Arvo, joka ei ole äärellinen luku vähintään 1, putoaa takaisin 1 000:een.

#### Kuinka lukeminen muuttaa kirjan

Ensimmäinen vastaavuussääntö pätee:

1. **Ei vielä kirjaa:** lukeminen avaa kirjan. Sen luku on perusviiva ja jokainen laskuri on merkitty.
2. **Vanhempaa luettavaa:** ennen viimeistä käytettyä lukemaa ei oteta huomioon. Samoin lukema, jonka nollausaika on yli 30 minuuttia aikaisemmin kuin tallennettu.
3. **Uusi palveluntarjoajan ikkuna:** nollausaika yli 30 minuuttia myöhemmin kuin tallennettu aika kääntää kirjaa. Luvusta tulee perusviiva ja jokainen laskuri merkitään uudelleen. Avaimet ilman laskuria poistuvat kirjasta.
4. **Päättynyt ikkuna:** tallennettu nollausaika, joka ei ole lukeman data-ajan jälkeen, tarkoittaa, että ikkuna on päättynyt. Lukeminen kääntää kirjan, oli se sitten mikä tahansa.
5. **Korkeampi luku:** vain viimeinen hahmo liikkuu. Perusviiva ja merkit pysyvät.
6. **Sama luku:** figuuri, perusviiva ja merkit pysyvät. Kirjasta puuttuu vain nollausaika.
7. **Alempi luku:** pienempää lukua ei koskaan sovelleta sellaisenaan. Se kääntää kirjaa vain, kun kolme asiaa pitävät paikkansa. Se on vähintään kaksi minuuttia uudempi kuin viimeksi käytetty lukema. Mikään ei sano, että ikkuna on sama auki. Se on enemmän kuin yksi piste pienempi.

Ikkuna lasketaan samaksi avoimeksi, kun kolme asiaa on voimassa. Molemmat palautusajat ovat tiedossa. Ne ovat 30 minuutin päässä toisistaan. Tallennettu on vielä lukemisen edellä. Alempi luku tuon ikkunan sisällä ei muuta mitään.

Nollausaika tallennetaan vain silloin, kun se on sitä kuljettavan lukeman data-aikaa edellä. Korkeampi luku tallentaa lukemansa nollausajan, kun se on käyttökelpoinen, ja säilyttää tallennetun muutoin. Sama luku kirjaa lukemansa nollausajan vain silloin, kun kirjalla ei ole sitä. Ei se muuta muuta. Pienempi luku, joka ei käännä kirjaa, ei merkitse nollausaikaa.

#### Kun kirjaa käytetään

Lukemisen jälkeen kirjaa käytetään, ellei sen tallennettu nollausaika ole nykyisen ajan jälkeen. Tämä tapaus syntyy, kun juuri ennen nollausta otettu lukema, kuten välimuistista toimitettu lukema, havaitaan heti sen jälkeen.

Ilman käyttökelpoista luettavaa tallennettua kirjaa käytetään vain, kun se voi edelleen olla nykyisen ikkunan kirja. Tämä pätee kahdessa tapauksessa:

- sen nollausaika on tiedossa ja vielä edessä
- siinä ei ole nollausaikaa, ja viimeisin lukema, joka muutti sen, on enintään 15 minuuttia vanha

Muuten mitään ei lueta, kuten silloin, kun kirjaa ei ole. Kirjaa, jonka tallennettu palautusaika on kulunut, ei koskaan veloiteta.

#### Täytäntöönpano

Avaimen kulutus prosenttimittasuhteessa on sen määrätty osa plus osuus ulkoisesta osasta. Ulkoinen osa käyttää ensin kapasiteetin ei allokointivaatimuksia (100 miinus painojen summa). Vain ylijäämä jaetaan avainten kesken painon mukaan.

Tätä kulutusta verrataan avaimen kohtuulliseen osuuteen kuten mihin tahansa muuhun ulottuvuuteen. Tiukka tila käynnistyy silti, kun saturaatiosignaali saavuttaa `QUOTA_SATURATION_THRESHOLD` (oletusarvo 0,5). Jokainen luku skaalataan voimassa olevan rajan mukaan: tilikohtainen raja kerrotaan poolin tilien lukumäärällä.

Absoluuttinen yläraja, jossa on `capUnit: "percent"` laskee vain avaimelle kuuluvan osan, joka on skaalattu samalla tavalla. Ota tilikohtaiseksi rajaksi 100 ja k tiliä. N:n yläraja saavutetaan, kun avaimen osa käyttötilin luvusta saavuttaa N/k pisteet. Jokainen tili verrataan omaan kirjaansa. Esimerkiksi kahdella tilillä 10:n yläraja saavutetaan 5 pisteessä yhden tilin luvusta.

Kun kauppaa ei voida lukea, mitään ei liitetä ja jokaisesta avaimesta veloitetaan 0 kyseisessä ulottuvuudessa. Kun kirjan kirjoittaminen epäonnistuu, merkintä käyttää kirjaa sellaisena kuin se luettiin. Epäonnistunut tunnuksen kirjoitus jättää pyynnön tunnukset pois kirjasta. Mikään näistä virheistä ei estä pyyntöä.

`consent` poolissa lainauskaava käyttää kunkin avaimen kulutusta prosenttimittasuhteessa yllä kuvatulla tavalla. Kun toinen avain lainaa, kirja luetaan kerran ja liitetään jokaiseen avaimeen. Ilman käyttökelpoista kirjaa jokaisesta avaimesta veloitetaan 0. Painollinen avain menee sitten läpi ja avain, jonka paino on 0, kulkee vain, kun toinen avain lainaa.

#### Käyttöreitti

`GET /api/quota/pools/{id}/usage` raportoi samat numerot saman toiminnon kautta. Prosenttiulottuvuus sisältää yhden merkinnän allasyhteyttä kohden `accounts` ssä. Sen huipputason `consumedTotal` ja `perKey` peilaavat ensimmäisen merkinnän.

Reitti käyttää myös nykyistä lukemaa, joten se voi viedä kirjaa eteenpäin pyynnöstä. `internal + external` voi erota `consumedTotal`, kun käyttökelpoista lukemaa ei ole tai kun pienempää lukua ei käytetä.

#### Varastointi ja säilytys

Molemmat kiintiökaupat pitävät kirjan. SQLite:ssa automaattinen tietokannan puhdistus poistaa rivit, joita ei ole päivitetty 60 päivään, kun se on käytössä. Redis:ssä pooliyhteyden kirjat ja laskurit jakavat yhden avaimen. Se vanhenee 60 päivää sen viimeisen tunnuksen kirjoittamisen tai kirjan vaihdon jälkeen. Kirjaa, joka ei muutu, ei kirjoiteta uudelleen, joten raja asetetaan pisimmän suunnitelmaikkunan yläpuolelle. Manuaalinen käyttöhistorian nollaus tyhjentää myös SQLite -kirjat (katso Rajoitukset).

#### Rajoitukset

- Kaikki tilin kasvu perusviivasta lähtien jaetaan kunkin sen jälkeen reititetyn avaimen tunnuksilla. Sillä, milloin tämä kasvu tapahtui, ei ole väliä.
- Joten OmniRoute ulkopuolella tehty käyttö veloitetaan avaimista sen verran, kuin niiden rahakkeet sallivat. Tämä sisältää käytön ennen avaimen ensimmäistä ikkunan pyyntöä, kun kirja oli jo auki.
- Esimerkiksi ulkokäyttö nostaa tiliä 60 pistettä, kun ei ole avainreittejä. Avain reitittää sitten 30 000 merkkiä ja luku saavuttaa 60,6.
- Jos kirja oli auki ennen käyttöä, avaimen osuus on 30 pistettä. Se kantaa myös 7,65 ulkoista käyttöä, neljällä 25 painoisella avaimella.
- Jos kirja avataan tämän käytön jälkeen, 60 pistettä ovat lähtötasoa. Avaimen osa on 0,6 pistettä ja se kantaa 15 ulkoista käyttöä.
- Pyyntö tai käynti käyttöreitillä avaa kirjan. Joten se, lasketaanko tällainen käyttö lähtötilanteeksi, riippuu siitä, milloin kirja avattiin.
- Oletuslattialla avain, joka reitittää 60 000 merkkiä ulkoisessa käytössä nostaa tiliä 60 pistettä saa kaikki 60 omaksi osakseen.
- Kun kerros on 50 000, sen oma osuus on 1,2 pistettä. Muut 58.8 ovat ulkoisia ja niitä ladataan painon mukaan, kuten mikä tahansa ulkoinen käyttö.
- Aseta `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` lähelle sitä, mitä yksi piste maksaa suunnitelmassasi. Ulkoiseen käyttöön sisältyy saman tilin liikenne uima-altaan ulkopuolelta tulevista avaimista.
- Prosenttiraja on voimassa kaikissa tiloissa. Rajoitettu avain voidaan hylätä, kun tili on paljon alle kyllästyskynnyksen.
- Ota 10 ja 12 ulkokäyttökohdan korkki aiemmin ikkunasta. Avaimesta, joka reitittää 20 000 tokenia, hylätään sitten tililuvulla 12,4%.
- Jako on arvio token-määrän mukaan. Pyyntö lasketaan sen kehotetunnuksiksi ja sen valmistumistunnisteiksi. Välimuistin alennukset ja mallihinnat eivät muuta tätä määrää.
- Pyyntö, joka ei pääty tilaan 200, ei tallenna tunnuksia. Esimerkkejä ovat tietovirta, jonka asiakas katkaisee yhteyden, ja ylävirran virhe käytön kulumisen jälkeen.
- Tällaisen pyynnön aiheuttama käyttö veloitetaan avaimista, jotka tallensivat tokeneita, siihen asti, mitä niiden tunnukset sallivat. Loput ovat ulkoisia. Se ei liiku takaisin. Vastaus, joka ei raportoi tunnuksen käyttöä, ei myöskään tallenna tunnuksia.
- Käynnissä olevan pyynnön käyttö voi näkyä toisen aktiivisen avaimen osassa koko pyynnölle. Se siirtyy takaisin vain, kun pyyntö päättyy tilaan 200.
- Käyttö tilillä jo kirjan avautuessa lasketaan ulkoiseksi. Tämä kattaa päivityksen, uuden poolin ja uuden tilin. Käyttö uudessa ikkunassa ennen ensimmäistä lukemaa lasketaan myös ulkoiseksi.
- Jokainen avain alkaa sen paino-osuudella kyseisestä käytöstä, kapasiteetin jälkeen ei allokointivaatimuksia. Kun yksi tili on 85 % ja viisi avainta, joiden paino on 20, jokainen alkaa 17:stä 20:stä käytetystä.
- Poolissa, jossa on useita tilejä, käyttötilin lukua sovelletaan summattuun budjettiin. Tämä ei muutu kirjassa.
- Alempaa lukua palveluntarjoajan avoimeksi ilmoittaman ikkunan sisällä ei käytetä. Nollausaikaa, joka siirtyy taaksepäin yli 30 minuuttia, käsitellään vanhana lukemana.
- Molemmissa tapauksissa kirja säilyttää tilansa, kunnes tallennettu nollausaika kuluu. Sen jälkeen kirjaa ei veloiteta ennen kuin lukeminen kääntää sen.
- Ratkaisu on manuaalinen käyttöhistorian nollaus (`POST /api/settings/purge-usage-history`). Se tyhjentää merkintäkirjat ja niiden merkkilaskurit SQLite -tietokannasta.
- `all` -aika tyhjentää jokaisen kirjan ja laskurin. Lyhyempi aika tyhjentää ensin kirjat, joita ei ole kirjoitettu sen sisällä. Sitten se tyhjentää laskurit, joita ei ole kirjoitettu siihen, vaan vain pooliyhteydelle, jossa ei ole kirjaa jäljellä. Säilytetty kirja merkitsee edelleen jokaisen avaimen laskuriinsa vasten.
- Kirjaa, jonka hahmo ei ole liikkunut, ei kirjoiteta uudelleen, joten lyhyempi jakso voi myös tyhjentää nykyisen ikkunan kirjan. Seuraava lukeminen avaa sitten uuden kirjan nykyisellä luvulla.
- Nollaus ei koske Redis -kiintiökauppaa. Siellä kirja päättyy ikkunaansa tai vanhenee 60 päivää sen viimeisen kirjoituksen jälkeen.
- Kun palveluntarjoaja ei lähetä nollausaikaa, ikkuna, joka nollautuu ja täyttyy vanhan luvun yläpuolelle kahden lukeman välillä, näyttää korkeammalta. Kirja säilyttää vanhan perusviivan ja merkit.
- Lukemat on päivätty paikallisen kellon mukaan. Kun se kulkee palveluntarjoajan edellä tai lähde ilmoittaa nollausajan hieman aikaisemmin, kirja voi saavuttaa eron aikaisin.
- Kasvu tällä lyhyellä aikavälillä jaetaan siihen ohjatuilla tokeneilla. Seuraavan ikkunan ensimmäinen lukema korjaa sen. Kun käännetyssä kirjassa ei ole palautusaikaa, tämä korjaus tarvitsee pienemmän luvun, joka on vähintään kaksi minuuttia uudempi kuin viimeksi käytetty lukema.
- Esineet, jotka jakavat Redis -myymälän päivämäärälukemat omien kellojensa kanssa, joten pidä kellot synkronoituna. Lukemat instanssista, jonka kello kulkee jäljessä, näyttävät vanhemmalta ja jätetään huomiotta.
- Jos käyttökelpoista lukemaa ei saavuteta tallennetun nollausajan jälkeen, avainkohtaisia prosenttiosuuksia ja prosenttirajoituksia ei pakoteta ennen kuin lukema palautuu. Ilman nollausaikaa tämä alkaa 15 minuuttia viimeisen kirjan vaihtaneen lukemisen jälkeen.
- Redis -kaupassa 60 päivää käyttämättömänä ollut kirja voi vanhentua kirjoittajan shekin ja sen kirjoittamisen välillä. Se luodaan sitten uudelleen versiossa, joka on yli 1, mikä on kelvollinen tila.

---

## Paketin selvittäjä

Toteutettu tiedostossa `src/lib/quota/planResolver.ts`.

Prioriteettijärjestys (korkeimmasta matalimpaan):

1. **Manuaalinen tietokantaohitus** — `provider_plans`-taulu, `connectionId`-kohtaisesti.
2. **Tunnettu luettelo** — `src/lib/quota/planRegistry.ts` (vain dataa).
3. **Tyhjä paketti** — ei ulottuvuuksia, manuaalinen määritys vaaditaan.

### Tunnettu luettelo

| Palveluntarjoaja      | Ulottuvuudet                                                  |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, tuntematon), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Ei oletusta — manuaalinen määritys vaaditaan                  |

---

## Putkilinjan integrointi

### PRE koukku (`open-sse/handlers/chatCore.ts`)

Suoritetaan ennen ylävirran suorittajaa, todennus- ja käytäntötarkistusten jälkeen:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Epäonnistunut** : jos `enforceQuotaShare` heittää, pyyntö sallitaan `pino.warn` -lokin avulla. Tämä estää kiintiömoottorivirhettä estämästä kaikkea liikennettä.

**Kun kapasiteetti palaa.** Kieltäytyminen avaimen osuudella tai uima-altaan katolla päättyy jompaankumpaan kahdesta lauseesta molemmissa lainaustavoissa:

- `percent` -ikkuna: `. The <window> window resets at <time>.` Aika on palveluntarjoajan ilmoittama nollaus.
- Laskettava yksikkö: `. Enough <window> usage is expected to clear by <time>.` Aika on yläraja liukuikkunasta, jos näppäin ei lähetä muuta.

`<time>` on ISO 8601 instant UTC:ssä. Kieltäytyminen sisältää sitten `Retry-After`: koko sekuntia siihen hetkeen asti plus yksi. Asiakas, joka odottaa niin kauan, yrittää uudelleen enintään sekunnin kuluttua hetkestä. Kun hetkeä ei tunneta, kieltäytyminen ei sisällä lausetta eikä otsikkoa. Ehdoton enimmäismäärän kieltäminen ei oikeuta kumpaakaan. Julkinen koodi pysyy `quota_share_blocked`.

Jakamisen kieltäminen ei koske jaettua yhteyttä. Se ei aseta jäähdytystä, mallilukkoa tai palveluntarjoajan katkaisijavikaa, ja muita poolin avaimia palvellaan jatkuvasti. Kun jokainen yhdistelmän kohde kieltäytyy osuudestaan avaimesta, yhdistelmä vastaa 429 odottamatta. Sen vastauksessa on vihje `Retry-After`. Upotuspolku lopettaa kieltäytymisensä samaan lauseeseen eikä lähetä `Retry-After`.

### POST -koukku (ennätyskulutus)

Onnistuneen vastauksen jälkeen:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drift muistiinpano** : jos `consume` epäonnistuu jälkivastauksessa, rullaava laskuri laskee alimäärän. Tarjoajan kyllästyssignaali (esim. `anthropic-ratelimit-unified-5h-utilization`) korjaa globaalin arvion seuraavassa pyynnössä.

### Yhdistelmä pehmeä rangaistus (`open-sse/services/combo.ts`)

Kun `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Rangaistus määrätään kaikkien muiden pisteytystekijöiden jälkeen. Se alentaa automaattisen yhdistelmän todennäköisyyttä valita kylläinen näppäin ilman sitä kovaa estämistä.

---

## UI Walkthrough

### `/dashboard/costs/quota-share` — Altaiden pääsivu

Komponentit (kaikki `src/app/(dashboard)/dashboard/costs/quota-share/`:ssa):

| Komponentti            | Tarkoitus                                                                       |
| ---------------------- | ------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Esittelykortti, joka selittää kiintiöiden jakamisen uusille käyttäjille         |
| `CreatePoolModal`      | Luo uusi kiintiövarasto (yhteyden + nimi + alkuvaraukset)                       |
| `PoolCard`             | Poolkohtainen yhteenveto: nimi, yhteys, varausten määrä                         |
| `DimensionBar`         | Mittakohtainen pinottu palkki: kunkin avaimen osuus + maailmanlaajuista käyttöä |
| `AllocationTable`      | Pöytä kulutettu, oikeudenmukainen osuus, deficit/surplus, lainauslippu          |
| `BurnRateChart`        | EMA -polttonopeuden viivakaavio (laiska uudelleenkaaviot `dynamic()` kautta)    |
| `EditAllocationsModal` | Muokkaa poolin allokointipainoja, ylärajoja ja käytäntöjä                       |
| `BorrowModeField`      | Lainaustilan valitsin (`saturation` tai `consent`) ohjatussa toiminnossa        |
| `LendingBadge`         | Vain luku -merkki avaimessa, joka lainaa, vain `consent` poolissa               |

Lainausmerkissä näkyy prosenttiosuus ja, kun se on asetettu, määräaika UTC :ssa ja vyöhyke nimetty. Se arvioi määräajan käyttötilanteen ottamisen ajankohtana. Vanhentunut tai lukukelvoton määräaika näkyy muodossa `lending expired`.

Sivun koukut:

- `usePools` — hakee `GET /api/quota/pools` n 30 sekunnin välein.
- `usePoolUsage` — hakee `GET /api/quota/pools/[id]/usage` pyynnöstä.
- `useLocalStoragePoolMigration` — suoritetaan kerran asennuksessa vanhojen LS -tietojen siirtämiseksi.

Allasvelhon näppäinaskelmassa on `Show usage by member to key holders` laatikko. Se asettaa poolin `memberBreakdown` vaihtoehdon (katso [Jäsenten käyttö](#member-usage) ). Sen alapuolella ohjattu toiminto varoittaa, että joku, joka tietää, mitä yksi näppäin on käytetty, voi sovittaa palkin kyseiseen näppäimeen. Kun ruutu on rastitettu, se sanoo niin, kun vaiheessa luetellaan vähemmän kuin kolme tai enemmän kuin 20 näppäintä, koska palkit pysyvät sitten piilossa. Se laskee vaiheen avaimet eikä voi kertoa, mikä niistä voi tehdä pyyntöjä.

### `/dashboard/costs/quota-share/plans` — Palveluntarjoajan suunnitelman konfigurointi

- `ProviderPlanConfigClient.tsx`: avattava valikko, josta voit valita palveluntarjoajan, tarkastella ratkaistua suunnitelmaa (automaattinen luettelosta tai manuaalinen ohitus) ja muokata mittoja.
- Muutokset kirjoittaa `PUT /api/quota/plans/[connectionId]`.
- Poisto palaa luetteloon tai tyhjään suunnitelmaan.

---

## Itsepalvelukiintiö API (opt-in)

`GET /api/v1/me/quota/{provider}` (myös `/v1/me/quota/{provider}`:ssä) antaa API -avaimenhaltijan lukea omalla avaimellaan, kuinka suuri osa jaetusta tilauksesta on heidän ja mikä estää heitä. Reitti on ohut kuori `src/server/selfService/quotaHandler.ts` päällä; näkymän on rakentanut `src/lib/quota/selfView.ts` ja sen vastaussopimus on `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Käyttöönotto ja todennus

- Ominaisuuden lippu `QUOTA_SELF_PANEL`, oletus `false`. Kun se on pois päältä, reitille saapuva pyyntö saa numeron 404. Kun käytössä on `REQUIRE_API_KEY=true`, asiakkaan API -käytäntö hylkää puuttuvan tai virheellisen avaimen numerolla 401 ennen reitin suorittamista, riippumatta lipusta. Pyyntö, jossa ei ole avainta, mutta sisäänkirjautuneen hallintapaneelin istunto, läpäisee kyseisen käytännön ja saa reitin oman vastauksen. Lippu ratkaisee kuten kaikki muutkin liput (kojelauta tai REST override, sitten samanniminen ympäristömuuttuja); katso [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Kunkin poolin näyttönimi ja kunkin aikataulun nimike palautetaan poolin avaimenhaltijoille täsmälleen sellaisina kuin järjestelmänvalvoja ne kirjoitti. Ennen kuin laitat lipun päälle, tarkista, että ne sopivat näiden avaimenpitäjien luettavaksi.
- Avain luetaan vain otsikoista: `Authorization: Bearer <key>` tai `x-api-key: <key>`. Kun molemmat lähetetään, käytetään ensimmäistä vahvistavaa. Kyselymerkkijonon avain tai eväste ohitetaan. Palvelimen ympäristöavain hylätään (401).
- Avaimeen tarvitaan `self:usage` tähtäin (403 ilman sitä).
- Palveluntarjoajasegmentti leikataan, pienennetään ja tarkistetaan `^[a-z0-9][a-z0-9._-]{0,63}$` (muutoin 400) suhteen. Sen jälkeen se ratkaistaan palveluntarjoajan rekisterin kautta, joten alias, kuten `cc` lukee `claude` poolit. `claude` ja `anthropic` lukevat samoja pooleja.

### Mitä kukin näkyvyys näyttää

| Näkyvyys  | Vaatii                                                                                  | Kentät                                                                                                                                                                                                                                                          |
| --------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oma osuus | `self:usage`                                                                            | `pools[]` (viite, nimi, tarjoaja, käytäntö, paino, yläraja), `dimensions[].yourShare`, `accounts[]` ja `yourShare` ( `percent` -ikkunassa ilman `attributed` ja `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                             |
| Tilitaso  | `self:usage` + `self:account-quota`, ja palveluntarjoaja avaimen `sharedQuotaProviders` | lisää `dimensions[].total`, `accounts[].dimensions[].account` ja `accounts[].modelWindows`, `attributed` ja `external` `percent` -ikkunan `yourShare` -kenttään ja `members` pooliin, jossa jäsenten käyttö on päällä (katso [Jäsenten käyttö](#member-usage) ) |

- `sharedQuotaProviders` on näppäinkohtainen asetus (`PUT /api/keys/[id]/self-service`): `null`, oletusarvo, tarkoittaa jokaista palveluntarjoajaa, jonka avain tavoittaa; `[]` tarkoittaa ei mitään. Kunkin altaan `accountVisible` kertoo, mikä näkyvyys siihen soveltuu.
- Tilipalkit ja malliikkunat näytetään vain niille tileille, joiden yhteyttä avain saattaa käyttää. Kun avaimessa on luettelo sallituista yhteyksistä, sen ulkopuolella oleva tili säilyttää `Account N` merkinnänsä ilman `account` tai `modelWindows`. Tyhjä luettelo tarkoittaa, että rajoituksia ei ole, kuten `/v1/me/status`. Poolin kokonaissumma (`dimensions[].total`) ei riipu tästä luettelosta.
- Pelkästään `self:usage` näkyvät kaksi hahmoa ovat peräisin muiden näppäinten käytöstä. Aikataulubudjetin `exhausted` heijastaa jokaisen kyseisen aikataulun mukaisen avaimen kulutusta. Poolissa, jonka painot ovat kaikki nollia, avaimen `weight` on `100 / number of members`. Molemmat ovat mitä valvonta koskee avainta.
- Poolin tunnistaa vain `ref`, läpinäkymätön arvo, joka on sidottu kutsuvaan avaimeen. Sen näyttönimi (`name`) on mukana järjestelmänvalvojan kirjoittamana. `ref` johdetaan avaimesta ja poolista palvelimen API-avaimen salaisuudella (`API_KEY_SECRET`). Asiakkaat eivät saa säilyttää sitä: se muuttuu, jos salaisuutta käännetään.
- Tilit on lueteltu `Account 1`, `Account 2`, … poolijärjestyksessä. Poolitunnusta, yhteystunnusta, tilin sähköpostiosoitetta tai tilin nimeä ei palauteta, ja vastaus kulkee sopimusskeeman läpi, mikä pudottaa minkä tahansa kentän sen ulkopuolelle.
- Laskettavat yksiköt (`requests`, `tokens`, `usd`) raportoidaan poolin ämpärinä, jota kiintiöportti valvoo: `limit` = suunnitelman raja × -tilit poolissa, `fairShare` = paino / 100 × `limit` (saa jaettuna `fairShare` kun jokainen paino avain on sz) kiintiökauppa, `remaining` `consumed` = = − `consumed` lattialla 0.
- `blocks.schedules` luettelee avaimen aikatauluikkunat (`open`/`closed`, `blackout` tai `outside-window`, `retryAfterSeconds`, varata kerrokset ja onko ikkunan budjetti käytetty); `blocks.modelCaps` luettelee mallikohtaiset tuntirajat kulutuksen kanssa.
- Avain palveluntarjoajan jokaisen poolin ulkopuolella saa 200 `pools: []`:lla; `availableModels` (avain näkee `qtSd/` -tunnukset `/v1/models`:ssä), `expiresAt` ja `apiBaseUrl` ovat edelleen täytettyinä.
- `apiBaseUrl` on `OMNIROUTE_PUBLIC_API_BASE_URL`, sitten `OMNIROUTE_PUBLIC_BASE_URL`, muuten `null`. Se ei koskaan ole pyynnön oma alkuperä.

### `status` ja `reason`

| `status`      | Merkitys                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Nykyinen lukema.                                                                                                                                                                                                                                                                                                                                              |
| `stale`       | Välimuistissa olevan tilin luku on merkitty vanhentuneeksi tai jonka nollausaika on kulunut sen lukemisesta. Numerot säilytetään. Yksi malliikkuna, jonka palautusaika on kulunut, merkitsee koko `modelWindows` ryhmän `stale`. Avaimen omalle osuudelle `percent` ikkunasta: kirja luettiin ilman tilin lukemista portin välimuistista sen vahvistamiseksi. |
| `unavailable` | Ei lukemista; numerot ovat `null`, ei koskaan `0`. `reason` sanoo miksi.                                                                                                                                                                                                                                                                                      |

| `reason`                          | Kun                                                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Kiintiökauppaa ei voitu lukea tai se ei voi lukea merkintäkirjoja.                                                               |
| `percent_attribution_unavailable` | Avaimen oma osuus `percent` -ikkunasta: kyseiselle tilille ja ikkunalle ei ole vielä merkintäkirjaa tai kirjassa ei ole avainta. |
| `percent_window_ended`            | Avaimen oma osuus `percent` -ikkunasta: kirja kuuluu suunnitelmaikkunaan, joka on päättynyt.                                     |
| `account_not_used_by_key`         | Avaimen oma osuus `percent` -ikkunasta: tilin yhteys on avaimen sallittujen yhteyksien ulkopuolella. Sen kirjaa ei lueta.        |
| `window_not_reported`             | Palveluntarjoajan rajoitusten välimuistissa ei ole lukua tälle suunnitelmaikkunalle.                                             |
| `connection_lookup_failed`        | Tilin yhteyttä ei voitu lukea.                                                                                                   |
| `not_supported`                   | OmniRoute ei voi lukea tilin tarjoajan käyttörajoja.                                                                             |
| `fetch_failed`                    | Välimuistissa olevaa lukua ei voitu käyttää ja palveluntarjoajan rajojen päivitys epäonnistui.                                   |
| `not_available`                   | Lukemassa ei ole käyttöikkunoita tai tilillä ei ole lukemaa ollenkaan.                                                           |

Kun kiintiösäilöä ei voida lukea, myös kaupan tukemat kentät `blocks` (aikataulun budjetin `exhausted`, mallin ylärajan `consumed` ja `reached`) ovat myös `null`.

### Lainauksen suostumus

`PATCH /api/v1/me/quota/{provider}` tallentaa kutsuvan avaimen oman suostumuksen yhdelle poolille. Se käyttää `GET`:n lippua, otsikoita ja palveluntarjoajan sääntöjä. `self:usage` alue sallii tämän kirjoittamisen, vaikka sen nimi on vain luku -muotoinen.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` on `ref`, jonka `GET` palauttaa kyseiselle poolille.
- `lendingPercent` on kokonaisluku väliltä 0-100. Arvo 0 tyhjentää suostumuksen ja sen määräajan. Runko, jonka arvo on `lendingPercent` 0, hyväksytään kummassakin tilassa.
- `lendingUntil` on valinnainen: epoch millisekuntia tai `null` ilman määräaikaa. Sen on oltava tulevaisuudessa ja enintään 8640000000000000. Alle 100000000000 arvo luetaan sekunteina ja hylätään.
- Kaikki muut kentät hylätään. Yli 4096 tavua pitempi runko hylätään. Lukeminen pysähtyy tähän kokoon, joten pidempää vartaloa ei koskaan pidetä kokonaisena.

Tarkistukset suoritetaan tämän taulukon järjestyksessä. Jokaisessa kieltäytymisessä käytetään vakiovirhetekstiä, jossa on kiinteä viesti. Jos jokin näistä tarkastuksista kieltäytyy, se ei kirjoita mitään.

| Status | Viesti                                                                                             | Kun                                                                    |
| ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | `QUOTA_SELF_PANEL` lippu on pois päältä.                               |
| 401    | `Valid API key required`                                                                           | Avain puuttuu tai on virheellinen tai se on palvelimen ympäristöavain. |
| 403    | `API key lacks the self:usage scope`                                                               | Avaimesta puuttuu `self:usage`.                                        |
| 400    | `Invalid provider`                                                                                 | Palveluntarjoajan segmentti on virheellinen.                           |
| 429    | `Too many lending changes. Retry later.`                                                           | Avain ylitti rajansa. Vastaus sisältää `Retry-After`.                  |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Runko ei ole JSON, se on liian pitkä tai se ei vastaa kaaviota.        |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Määräaika luetaan sekunteina.                                          |
| 400    | `lendingUntil must be in the future`                                                               | Hakuaika päättyy tai sitä ennen.                                       |
| 404    | `Pool not found`                                                                                   | `ref` ei nimeä mitään tämän avaimen poolia tälle palveluntarjoajalle.  |
| 403    | `Lending is not enabled for this pool`                                                             | Allas on `saturation` tilassa ja `lendingPercent` on yli 0.            |
| 500    | `Failed to build quota view`                                                                       | Mikä tahansa muu epäonnistuminen. Sen syy on kirjattu palvelimelle.    |

Raja on 20 pyyntöä 60 sekunnissa jokaiselle avaimelle. Jokainen palveluntarjoajan tarkastuksen läpäisevä pyyntö lasketaan, myös se, joka hylätään myöhemmin tai joka ei muuta mitään. Sillä on oma laskuri avaimen pyyntönopeusrajan lisäksi.

Pyyntö, joka muuttaa tallennettua suostumusta, kirjoittaa yhden `quota.pool.lending.updated` tarkastustietueen. Se nimeää avaimen vanhoilla ja uusilla arvoilla. Sama kahdesti lähetetty toimielin kirjoittaa kerran ja tarkastaa kerran. Vastaus on 200 täydellä `GET` näkymällä, joka on rakennettu kirjoittamisen jälkeen.

`GET` view raportoi lainaamisesta seuraavasti:

- Jokaisessa poolissa on `borrowMode` (`saturation` tai `consent`) ja avaimen omat `lendingPercent` ja `lendingUntil`.
- `lendingActive` on `true` vain `consent` poolissa, prosenttiosuus yli 0 ja määräaikaa ei saavutettu.
- `consent` poolissa jokainen laskettava `dimensions[].yourShare` sisältää `borrowAvailable`. Sitä avain voi nyt käyttää osuutensa yläpuolella muiden avainten lainaamana.
- `borrowAvailable` käyttää portin kaavaa. Se lukee kaikki muut avaimet, myös silloin, kun avain on osuutensa alla. `hard` -näppäimelle, joka on yksi ylimääräinen luku toista avainta kohti ja laskettava ulottuvuus rinnakkain.
- `borrowAvailable` on `null` `soft` tai `burst` näppäimelle ja `null`, kun luku epäonnistuu.
- `borrowAvailable` on yksi luku kaikille muille avaimille yhdessä. Kahden avaimen joukossa se on toisen avaimen oma figuuri.
- `borrowAvailable` ei ole vielä raportoitu `percent` -ikkunoissa tai `accounts[]` ssä.
- `saturation` -poolissa näkymä ilmoittaa tallennetun suostumuksen `lendingActive: false` llä ja ei `borrowAvailable`.

### Virheet

Jokainen tämän reitin vastaus, onnistuminen tai virhe, sisältää `Cache-Control: no-store`. Kieltäytyminen, joka tapahtuu ennen reitin suorittamista, ei siirrä sitä, esimerkiksi asiakkaan API -käytännön 401 tai IP suodattimen 403. Reitin virheet käyttävät vakiovirhetekstiä, jossa on kiinteä viesti: 400 (virheellinen tarjoaja), 401 (puuttuva tai virheellinen avain), 403 (puuttuva tai virheellinen `self:usage`), 403 (puuttuva 40)4qdf (`Failed to build quota view`) ). 500 kattaa kaikki viat, kun pyyntö saavuttaa reitin, mukaan lukien itse avaimen haun; sen syy kirjataan palvelimelle, eikä sitä koskaan palauteta. `PATCH` :n virheet on lueteltu kohdassa [Lainauslupa](#lending-consent).

### Rajoitukset

- `remaining` on se osa avaimen käypään osuuteen, jota se ei ole käyttänyt. Se ei ole takuu. Avain voidaan silti tarjota sen taakse, kun uima-altaalla on tilaa. Kun poolin kokonaissumma saavuttaa `limit`, kaikki poolin avain hylätään, olipa sen oma `remaining` mikä tahansa, ja avain ilman `self:account-quota` ei näe tätä summaa.
- `remaining` ei ota huomioon allokoinnin absoluuttista `cap` :tä. Täytäntöönpano hylkää avaimen, kun sen oma kulutus korkin yksikön ikkunassa saavuttaa korkin arvon.
- Tilitason palkki tulee palveluntarjoajan rajoitusten välimuistista, ja se voi viivästää täytäntöönpanopäätöstä muutaman minuutin. Lukema, jonka nollausaika on kulunut, ilmoitetaan `stale`.
- Mallikohtaiset ikkunat (`modelWindows`) raportoidaan vain palveluntarjoajille, joilla on suunnitelma-ikkunakartoitus: Claude ja Codex tänään. Muilla palveluntarjoajilla `modelWindows` on edelleen olemassa, kun tilitiedot näytetään, ja `windows` -luettelo on tyhjä.
- Avaimen oma osuus `percent` -ikkunasta on arvio. Se tulee attribuutiokirjasta ja sisältää kaikki rajoitukset, jotka on lueteltu kohdassa "Prosenttimitat: avainkohtainen attribuutio".
- `consumed` on lukujen valvonta verrattuna kohtuulliseen osuuteen. Se on täsmälleen `attributed` plus `external`. `attributed` on osa, jonka kirja antaa avaimen reitittämilleen tokeneille. `external` on avaimen osa tilin käyttöä, jota poolin avaimet eivät ota huomioon.
- Molemmat osat lähetetään vain, kun poolin `accountVisible` on tosi: avaimessa on `self:account-quota` ja palveluntarjoaja on sen `sharedQuotaProviders`. Avain ilman sitä saa `consumed` yksin, samalla `status` ja `reason`.
- Molemmilla osilla ja omalla painollaan pidike voi harjoitella uima-altaan ulkopuolella tapahtuvaa käyttöä altaan avaimista ladattavalla tavalla. Tilin laajuuden omaava haltija näkee jo tilin kokonaissumman.
- Avain, joka ei reitittänyt mitään ikkunassa, voi silti lukea ulkoisen varauksensa `consumed` sta, koska sen määritetty osa on silloin 0.
- Esimerkiksi kirja aukeaa numerosta 0 ja avainten A ja B paino on 50. Avain A reitittää 900 000 merkkiä ja avain B 100 000. Tili saavuttaa sitten 60 % 100:n rajasta. Silloin `attributed` on 54 avaimelle A ja 6 avaimelle B, ja `external` on 0 molemmille.
- Näkymä lukee kirjan eikä koskaan kirjoita sen tilaa. Se ei avaa kirjaa, eikä se koskaan pyydä palveluntarjoajalta lukemista. Redis -kaupassa luku poistaa korvatut versiokentät taustalla, kuten portin lukemat tekevät.
- Osuus on `ok` vain, kun portin välimuisti sisältää tilin lukeman. Ilman sitä se on `stale`, joten poolissa, jossa ei ole viimeaikaista pyyntöä, se näkyy mahdollisesti vanhentuneena.
- Osake ei ole käytettävissä ennen kuin pyyntö menee poolin läpi. Tämä pyyntö avaa kirjan, ja tilin luku sillä hetkellä lasketaan poolin ulkopuoliseksi käytöksi.
- Poolissa, jossa on useita tilejä, jokainen tilimerkintä käyttää kyseisen tilin omaa kirjaa ja yhden tilin rajaa. Täytäntöönpano skaalaa molempia osapuolia tilien lukumäärän mukaan, joten suhde on sama.
- Mallikohtaisissa ikkunoissa ei ole osuutta avaimelle. Kirja ei sisällä mallikohtaisia tietoja.
- Näkymä ei arvioi aikataulun varakerroksia: aikataulu voi näkyä muodossa `open` kun taas pyyntö hylätään syystä `schedule-reserve`.
- Kun kaksi saman avaimen poolia jakavat yhteyden, pakottaminen soveltaa toista niistä ja näkymä luettelee molemmat.
- Epäonnistuneille avainyrityksille ei ole osoitekohtaista rajaa: käänteisen välityspalvelimen takana soittajat voivat jakaa yhden osoitteen (se riippuu siitä, ovatko edelleenlähetetyt asiakasosoitteet luotettavia), joten lukitus voi estää reitin kaikilta avaimenhaltijoilta. Kun `REQUIRE_API_KEY=true`, asiakkaan API -käytäntö hylkää virheellisen avaimen ennen reitin suorittamista, ja tämän käytännön 401 runko tämän reitin sijaan.

### Jäsenten käyttö

Järjestelmänvalvoja voi antaa avainten haltijoille nähdä, kuinka ikkunan käyttö jakautuu poolin jäsenten kesken. Vaihtoehtona on altaan `memberBreakdown`, oletuksena pois päältä. Se asetetaan allasvelhossa tai `PATCH /api/quota/pools/{id}` llä. `GET /api/quota/pools` ja `GET /api/quota/pools/{id}` raportoivat siitä.

Näkymän ulottuvuudessa on `members` vain, kun kaikki nämä pätevät:

- uima-altaan vaihtoehto on päällä
- poolissa on enintään 20 allokoitua avainta, ja vähintään kolme niistä voi tehdä pyyntöjä: aktiivinen, ei peruutettu, ei kielletty ja ei ole vanhentunut
- poolin `accountVisible` on totta: avaimessa on `self:account-quota` ja palveluntarjoaja on `sharedQuotaProviders` ssä
- `percent` -ikkunassa tilin yhteys on yksi, jota avain voi käyttää
- avaimen oma osuus kyseisestä ikkunasta luettiin: sen `status` ei ole `unavailable`

Muuten `members` puuttuu. Se ei ole koskaan tyhjä lista.

- Jokainen siivu on `{ slot, consumed, isYou }`. Vastausskeema hylkää kaikki muut osion ominaisuudet ja luettelon, jossa on yli 20 viipaletta. Viipalet on listattu paikkajärjestyksessä.
- Varattua avainta kohden on yksi osa, mukaan lukien avain, joka ei voi enää tehdä pyyntöjä. Jäsen, jolla ei ole käyttöä, näyttää todellista nollaa.
- Slot 1 on aina kysyvä avain, `isYou` true. Muut korttipaikan numerot ovat avainnoidun tiivisteen rivejä. Se on näppäilty `API_KEY_SECRET` llä ja se kattaa poolin, kyselyavaimen ja jäsenen.
- Joten numerot eivät ole kohdakkain haltioiden välillä. Yhdelle haltijalle ne pysyvät samoina käyntien välillä. Ne voivat muuttua, kun avain liittyy tai poistuu poolista tai kun salaisuutta käännetään.
- Laskettavassa ikkunassa siivu on jäsenen laskuri kiintiökaupassa, sama laskuri kuin sen oma `consumed`.
- `percent` -ikkunassa siivu on jäsenen `attributed` osa, samasta kirjasta, joka luetaan avaimen omana osuutena. Altaan ulkopuolella tehtyä käyttöä ei koskaan jaeta viipaleiksi. Tämä lataus on jaettu painon mukaan, joten sitä kantavat viipaleet näyttäisivät painot.
- Jokainen näkymä lukee yhden arvon toista jäsentä ja laskettavaa ikkunaa kohti rinnakkain. `percent` -ikkunassa siivut eivät maksa muuta kuin osakkeen oman kirjan lukemista. Kun yhtä arvoa ei voida lukea, kyseisessä ikkunassa ei ole `members`, ja avaimen oma osuus säilyy.
- Vaihtoehto ja käytettävien avainten määrä luetaan kerran poolia kohden ja vain avaimelle, joka saattaa nähdä tilitiedot. Epäonnistunut vaihtoehdon tai käytettävien avainten lukumäärän luku poistaa palkit käytöstä kyseiseltä poolilta. Palvelin kirjaa varoituksen lokiin, ja loput näkymästä rakennetaan.

Palkeissa ei ole nimiä tai tunnuksia. He kertovat edelleen avaimenhaltijalle asioita muista jäsenistä:

- Omistajat voivat silti yhdistää viipaleita arvojensa mukaan.
- Vakaa numerointi antaa haltijalle mahdollisuuden seurata yhtä jäsentä ajan mittaan.
- Viipaleiden määrä osoittaa, kuinka monta avainta on varattu pooliin.
- Kolmen avaimen joukossa joku, joka tietää mitä yksi avain käytti, voi kertoa, mitä viimeksi käytetty avain käytti.
- Kun allas putoaa alle kolmen käyttökelpoisen avaimen, palkit katoavat. Aiemmin otetut näkemykset osoittavat edelleen, mitä kukin jäsen käytti.
- Laskettavassa ikkunassa poolien kokonaismäärä, josta on vähennetty viipaleet, voi näyttää sellaisten avainten käytön, joita ei enää ole allokoitu.
- Jäsen, joka näyttää nollan yhdellä tilillä ja käyttää toisella, voi näyttää, mikä jäsen käyttää mitäkin tiliä.
- Laskettavassa poolissa, jossa on `hard` -politiikka, siivu, joka lakkaa kasvamasta jäsenen kohtuullisella osuudella, viittaa kyseisen jäsenen painoon.

### Käyttösarja (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (toimitetaan myös osoitteessa `/v1/me/usage`) palauttaa soittoavaimen omien pyyntöjen käytön ja hinnan: kokonaissummat, yksi merkintä per UTC päivä, per päivä ja malli, per malli ja per tarjoaja. Se jakaa edellä olevan kiintiöreitin lipun, todennussäännöt, `self:usage` -alueen, `Cache-Control: no-store` ja virhekäyttäytymisen. Avain tarkistetaan ennen `range`. Virheet ovat 400 (`Invalid range`), 401 , 403 , 404 ja 500 (`Failed to build usage`).

- `range` on jokin seuraavista: `1d`, `7d`, `30d` (oletus) tai `90d`. Mikä tahansa muu arvo, tyhjä arvo tai toistuva parametri on 400. Joukko pysähtyy kohtaan `90d` puhelun hinnan rajoittamiseksi. Näkymä lukee vain raakaa käyttöhistoriaa, ei koskaan päivittäisiä yhteenvetoja, joissa ei ole avainta.
- Rivit valitaan soittonäppäimen tunnuksella. Avaimen nimi -saraketta ei koskaan täsmää, eikä rivejä, jotka on tallennettu ilman avaimen tunnusta, ei koskaan lasketa.
- Sarjan luominen suorittaa viisi ryhmiteltyä kyselyä ikkunan avaimen riveillä. Rakennettua sarjaa käytetään uudelleen 60 sekuntia näppäintä ja aluetta kohti, eikä uudelleenkäytetty puhelu toimi yhtään. Sen `generatedAt` kertoo ikänsä.
- Ikkuna loppuu, kun sarja on rakennettu. Myöhemmin esimerkiksi kellon vinoon leimattua riviä ei lasketa.
- `coverage.retentionDays` on operaattorin raakakäyttöhistorian säilytysasetus (`retention.usageHistory` tietokannan asetuksissa). `coverage.truncatedByRetention` on tosi, kun pyydetty alue on tätä asetusta pidempi. Se vertaa kahta numeroa eikä tarkista, puuttuuko rivejä todella.
- Palveluntarjoaja palautetaan avaimen omien pyyntöjen mukaisesti tallennettuna. Malli on tallennettu nimi sen viimeisen `/` jälkeen, ja rivit ryhmitellään sen mukaan. Yhdistelmäpyyntö, jonka jokainen kohde hylättiin, tallennetaan reititystunnisteella tarjoajana (yhdistelmänimi, `auto` tai `combo`) ja asiakkaan lähettämä mallimerkkijono. Muut hylätyt pyynnöt, esimerkiksi katkaisijan, mallin jäähtymisen tai kiintiöpysäköinnin aiheuttamat pyynnöt, säilyttävät kohdetoimittajan ja mallin.
- Lukujen ja kustannusten lisäksi vastaus sisältää keskimääräisen viiveen, onnistumisprosentin sekä ensimmäisen ja viimeisen pyynnön ajan.
- `byModel` listaa 50 toimittaja- ja malliparia, joilla on eniten pyyntöjä. Enemmän pareja sen merkintöjen summa ei ole `summary`, ja `summary.uniqueModels` laskee jokaisen tallennetun mallin oikeinkirjoituksen. `byModelTruncated` on tällöin tosi, ja malli, jonka parit putoavat leikkauksen molemmille puolille, näyttää osittaiset summat.
- Kustannuksia on raportoitu kaksi. `costUsd` on laskutettu hinta, kuten käyttöanalytiikka osoittaa. Kiinteähintaiset tilauspalveluntarjoajat, kuten Claude -koodisuunnitelma, laskevat siellä 0 dollaria. `listPriceUsd` on sama käyttöhinta listahintaan, mukaan lukien tilaukset. Pyyntö, jonka mallissa ei ole hintariviä, laskee sen tallennetun hinnan: palveluntarjoajan raportoiman tai pyynnön kirjaamisen yhteydessä lasketun hinnan. Vain pyyntö, jossa ei ole kumpaakaan, laskee 0, ilman merkkiä, joten kokonaissumma voi olla osittainen.
- Vastaussopimus on `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Itsepalvelusivu

Kun `QUOTA_SELF_PANEL` on päällä, `/quota/{provider}` on julkinen sivu. Avaimenhaltija kirjoittaa sinne API avaimen ja näkee palveluntarjoajan avaimen poolit. Kussakin poolissa näkyy yksi kortti per pooliikkuna, jossa poolin käyttö on kaikille ja avaimen oma osuus. Jokaisella poolin tilillä on omat kortit, joissa on tilin käyttö ja avaimen osuus. Tilin käyttö näkyy vain, kun avain saattaa nähdä tilitiedot. Sivulla luetellaan myös kunkin tilin mallikohtaiset rajat ja avaimen oma käyttö. Näkyviin tulee ilmoitus, kun aikataulu estää avaimen juuri nyt. Kortissa luetellaan kaikki avaimen mallikohtaiset korkit sen käytön mukaan ja merkitään saavutetut. `{provider}` on palveluntarjoajan tunnus tai sen alias (`/quota/claude`, `/quota/cc`). Tuntematon toimittaja ja jokainen `/quota/*` polku lipun ollessa pois päältä, vastaa 404. Mukautetun OpenAI- tai Anthropic-yhteensopivan solmun poolilla ei ole sivua. API vastaa edelleen heidän puolestaan.

Sivulla ei ole istuntoa. Avain lähetetään vain `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` ja `GET /api/v1/me/usage` `Authorization` otsikossa, ei koskaan URL ssä. Palvelimen hyväksymä avain säilytetään välilehden `sessionStorage` ssä. "Muista tässä laitteessa" se säilyy sen sijaan `localStorage` muodossa, ja "Unohda avain" poistaa sen molemmista. Avain, jonka palvelin hylkää, poistetaan tallennustilasta.

`consent` tilassa oleva pooli näyttää lainakortin. Siellä avaimenhaltija asettaa lainattavaksi kokonaisen prosenttiosuuden 0-100 avaimen käyttämättömästä osuudesta. Omistaja valitsee myös, kuinka kauan suostumus on voimassa: sammutukseen asti, 1 tunti, 8 tuntia, 24 tuntia, 7 päivää vai 30 päivää. Kesto lasketaan tallennuksen hetkestä. Kun määräaika on voimassa, haltija voi pitää sen sen sijaan. Jos määräaika kuluu ennen Tallenna, kortti ei lähetä mitään ja pyytää toista vaihtoehtoa. 0 %:lla ei lähetetä määräaikaa. Kortti näyttää tallennetun määräajan ja sen aikavyöhykkeen. Suostumus, jonka määräaika on umpeutunut, näytetään päättyneeksi.

`hard` avaimelle kortissa luetellaan myös pooliikkunaa kohti, mitkä muut avaimet lainaavat avaimelle juuri nyt. Jokainen rivi on yksi luku kaikille muille avaimille yhdessä. Kahden avaimen joukossa se on toisen avaimen oma figuuri. Luku, jota näkymä ei raportoi, lukee ei saatavilla, ei nollaksi. `soft` tai `burst` -avaimella kortissa lukee, ettei lukua ole.

`saturation` tilassa oleva pooli, jonka avaimessa on yli 0, näyttää vain noston. Siinä sanotaan, että tallennetulla prosentilla ei ole vaikutusta. Sen Nostopainike lähettää 0 ilman määräaikaa. Pooli `saturation` tilassa, jossa on tallennettu 0, ei näytä lainakorttia. Tallennuksen jälkeen kortti, jota palautettu näkymä ei enää tarvitse, pysyy viestin mukana, kunnes sivun näkymä vaihtuu uudelleen.

Mitään ei tallenneta, ennen kuin pidike paina Tallenna tai Peruuta. Jokainen painallus lähettää yhden `PATCH /api/v1/me/quota/{provider}` -pyynnön, ja toinen painallus ei lähetä mitään, kun ensimmäinen on vireillä. Runko kantaa altaan läpinäkymätöntä `ref` :tä näkymästä, prosenttiosuudesta ja määräajasta. Vastaus on uudelleen rakennettu kiintiönäkymä, ja sivu näyttää sen ilman toista lukua. Kun kaksi tallennusta menevät päällekkäin, sivu lukee kiintiön kerran viimeisen vastauksen jälkeen. Sivu ei säilytä suostumusta selaimen tallennustilassa.

Hylätty muutos selitetään kortilla HTTP -tilasta valitulla tekstillä. Virhetekstiä ei lueta. 401 sanoo, että avainta ei hyväksytty ja lataa kiintiön uudelleen. 403 sanoo, että pooli ei ota lainamuutoksia vastaan, ja 404 sanoo, että pooli on poissa. Molemmat tarjoavat painikkeen, joka lataa kiintiön uudelleen. 400 tai muu 4xx vastaus pyytää haltijaa tarkistamaan prosenttiosuuden ja määräajan. 429 pyytää haltijaa odottamaan, ja sekuntia `Retry-After` kun vastaus antaa heille. 5xx-vastaus, 408 tai verkkovika kertoo, että muutosta ei ehkä ole tallennettu, ja säilyttää kirjoitetut arvot. Sopimuksen ulkopuolinen vastaus lataa kiintiön uudelleen. Epäonnistunut tallennus ei poista avainta itsestään. Kun uudelleenlataus sen jälkeen on hylätty, sivu poistaa avaimen kuten missä tahansa hylätyssä lukemisessa.

Kun avain on hyväksytty, sivulla näkyy myös "Määritä työkalut" -kortti, jossa on kolme välilehteä. "Claude Code" antaa `env` lohkon `~/.claude/settings.json`:lle. "Shell" antaa samat muuttujat kuin `export` rivit. "Claude Desktop" antaa arvot kolmannen osapuolen päättelyikkunalle. Mallit ovat kiintiöosuusmalleja, joita avain voi vaatia kyseiselle tarjoajalle. Jos avaimen mukana ei tule tällaista luetteloa, lohko ottaa sen sijaan käyttöön yhdyskäytävämallin haun. Yhdyskäytävän osoite on julkinen API alkuperä, josta palvelin raportoi (`OMNIROUTE_PUBLIC_API_BASE_URL`, sitten `OMNIROUTE_PUBLIC_BASE_URL`). Kun kumpaakaan ei ole asetettu, kortti näyttää paikkamerkin ja kehottaa haltijaa kysymään järjestelmänvalvojalta. Avain näkyy paikkamerkkinä. "Sisällytä avaimeni" asettaa koko avaimen näytöllä olevaan tekstiin ja siihen, mihin kopiopainike kopioi. Tämä kestää kunnes laatikko tyhjennetään, avain unohdetaan tai vaihdetaan tai sivu jätetään pois. Kortti ei lähetä pyyntöä eikä tarjoa tiedostojen latausta.

API -merkkien lukema `stale` näytetään mahdollisesti vanhentuneena. Lukema, jonka se merkitsee `unavailable`, näytetään syyn kanssa, ei koskaan nollana.

Prosenttisuunnitelmissa sivu nostaa avaimen oman osuuden, kun API ilmoittaa sen. Se sanoo, että luku on arvio ja nimeää sen kaksi osaa. Mallikohtaiset rajat näyttävät vain tilin.

Kun ikkunassa on `members`, sen kortissa näkyy myös palkki, jossa on yksi segmentti jäsentä kohden, paikkajärjestyksessä. Kysyntänäppäimen segmentti käyttää korostusväriä. Muut segmentit kiertävät teeman kaavion värejä. Tekstin selite listaa jokaisen segmentin arvoineen, joten mikään ei riipu väristä. Segmentit on merkitty `You` tai `Member N`, jossa N on paikka.

### Sivulle omistettu portti

`QUOTA_PANEL_PORT` avaa toisen kuuntelijan, joka palvelee vain itsepalvelusivua. Se on pois päältä, ellei muuttujaa ole asetettu. `QUOTA_PANEL_HOST` on sidososoite ja oletuksena on `127.0.0.1`.

Kuuntelija välittää nämä polut pääporttiin ja vastaa 404 jokaiselle muulle polulle:

| Polku                                                                    | Palvelee                                    |
| ------------------------------------------------------------------------ | ------------------------------------------- |
| `/quota/{provider}`                                                      | Sivu                                        |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Kiintiönäkymä sivulla lukee                 |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Sivun lukema käyttösarja                    |
| `/_next/static/`                                                         | Rakennuksen komentosarjat, tyylit ja fontit |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Kuvakkeet                                   |

`GET` ja `HEAD` välitetään ilman runkoa. Välitetään myös yksi pyyntö, jossa on runko: kiintiön katselupolun `PATCH`, jonka sivu lähettää tallentaakseen lainausvalinnan. Mikä tahansa muu menetelmä vastaa 404, paitsi CONNECT pyyntö, jonka yhteys suljetaan ilman vastausta. Kaikki muu kehon ilmoittava pyyntö vastaa 404 ja sen yhteys suljetaan. Päivityspyynnöt hylätään ja niiden yhteys suljetaan. Polku, jossa on pistesegmentti tai fragmenttimerkki, hylätään, kuten API -portissa. Samoin pyyntökohde, jossa on tulostettavan ASCII ulkopuolella oleva merkki. HTTP jäsentäjä vastaa kohteen käsittelemättömään ohjausmerkkiin 400 ennen tämän portin omaa tarkistusta. Pyyntöotsikoita, joita kehys varaa omaan käyttöön, ei välitetä: nimet, jotka alkavat `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` tai `x-next-`, ja nimet `x-matched-path` ja `next-resume`. Pyyntö välitetään ilman niitä. Kojelauta, kirjautumissivu, hallinta API ja päättelyreitit eivät ole saavutettavissa tämän portin kautta.

`PATCH` on oltava `Content-Type: application/json` ilman parametreja tai vain `charset=utf-8` kanssa. Siinä on oltava yksi `Content-Length` välillä 1 - 4096, kirjoitettuna tavallisina numeroina, eikä `Transfer-Encoding`. `PATCH`, joka rikkoo jotakin näistä säännöistä, vastaa 404. Joihinkin väärin muotoiltuihin pituuksiin, kuten etumerkitty tai toistuva, HTTP jäsentäjä vastaa 400 ennen tämän portin omaa tarkistusta. Portti lukee ilmoitetut tavut ennen kuin se ottaa yhteyttä pääporttiin ja odottaa niitä enintään 5 sekuntia. Kappale, joka ei ole siihen mennessä valmis, vastaa 404 ja sen yhteys suljetaan. Mikään ei saavuta pääporttia siinä tapauksessa tai kun asiakas lähtee ensin. Portti välittää täsmälleen ilmoitetut tavut samalla `Content-Length`. Tavut niiden jälkeen luetaan yhteyden seuraavana pyyntönä. Edessä olevan TLS käänteisen välityspalvelimen on välitettävä `Content-Length`, eikä se saa siirtää pyynnön runkoa uudelleen. Pääportti tarkistaa API avaimen `Authorization` otsikossa, kuten `GET`.

404:n runko on `{"error":"not_found","message":"Not found."}`. Epäonnistunut rele vastaa 502 (`api_bridge_unavailable`) tai 504 (`api_bridge_timeout`) ilman `detail` kenttää.

Kuuntelija ei lue `QUOTA_SELF_PANEL`, eikä se avaa sivua. Kun lippu on pois päältä, sivu ja sen API vastaavat 404 pääportissa, ja kuuntelija välittää vastauksen.

Kehityspalvelimen (`next dev`) alla sivu ei muutu interaktiiviseksi tämän portin kautta. Kehityksen hot-reload socket on päivityspyyntö, ja portti hylkää sen. Käytä pääporttia kehittäessäsi.

Portti palvelee tavallista HTTP ja sivu lähettää API -avaimia. Säilytä oletussidososoite ja laita käänteinen välityspalvelin, jossa on TLS sen eteen. Muu kuin takaisinkytkentäosoite kirjaa tämän ilmoituksen:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Paluukumppani, joka ei lähetä edelleenlähetysotsikkoa, lasketaan paikalliseksi pääportissa. Joten välityspalvelimen samassa isännässä on lähetettävä `X-Forwarded-For`. Yksityisen osoitteen välityspalvelimeen luotetaan kyseisessä otsikossa vain `OMNIROUTE_TRUST_PROXY=private` (tai `lan`). Kaikki muut vertaiskäyttäjät raportoidaan sen yhteyden osoitteella, ja sen lähettämät edelleenlähetysotsikot hylätään.

Kuuntelijalla on enintään 256 yhteyttä kerrallaan. Asiakkaalla on 10 sekuntia lähettää pyyntöotsikot ja 30 sekuntia lähettää koko pyyntö. Käyttämättömänä pidetty elossa oleva yhteys sulkeutuu noin 5 sekunnin kuluttua. Yhteys, jossa ei ole toimintaa 60 sekuntiin, suljetaan. Nämä arvot ovat kiinteitä. Aseta yhteys- ja nopeusrajoitukset myös edessä olevalle käänteiselle välityspalvelimelle. Edessä olevan käänteisen välityspalvelimen tulisi pitää ylävirran yhteydet vapaana alle 5 sekuntia tai niitä ei saa käyttää uudelleen. Rele pääporttiin käyttää API -portin (`API_BRIDGE_*`) ylävirran aikakatkaisuja.

Kuuntelija käynnistyy myös, kun `API_PORT` ei ole asetettu. `QUOTA_PANEL_PORT` on oltava portti väliltä 1–65535, joka on kirjoitettu vain numeroin. Sen täytyy poiketa kojelaudan portista ja API portista. Kun reaaliaikainen WebSocket palvelin on päällä, sen on myös oltava erilainen kuin `LIVE_WS_PORT` (oletus 20132). Mikä tahansa muu arvo ei avaa mitään ja kirjaa varoituksen. Varoitus hylätystä arvosta nimeää muuttujan eikä toista arvoa. Jo käytössä oleva portti ei avaa mitään ja kirjaa tämän varoituksen:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Kun `OMNIROUTE_BASE_PATH` on asetettu, kuuntelija odottaa jokaista yllä olevaa polkua kyseisen etuliitteen alla. Käytä samaa `OMNIROUTE_BASE_PATH` tä rakennus- ja suoritusaikana. Kirjoita se johtavalla kauttaviivalla ilman perässä olevaa kauttaviivaa, esimerkiksi `/omniroute`. Toinen muoto, mukaan lukien `/` ja `/omniroute/`, jättää portin pois päältä varoituksen kanssa, vaikka koontiversio hyväksyy nämä muodot. Samoin kantapolku, jonka ensimmäinen segmentti nimeää sovellusreitin: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` tai `connect`, joka tapauksessa.

Rajoitukset:

- `/quota/{provider}/` perässä kauttaviivalla vastaa 404 tässä portissa.
- Palvelutyötä ja verkkosovelluksen luetteloa ei toimiteta tässä portissa.
- Kojelaudassa olevaa mukautettua suosikkikuvaketta ei näytetä tässä portissa.
- Kuvakkeita ei näytetä, kun sovellus toimii peruspolun alla.
- Portti puhuu pelkkää HTTP/1.1.
- Epäonnistunutta sidontaa ei yritetä uudelleen, ennen kuin prosessi käynnistyy uudelleen.
- Kuuntelijalla ei ole yhteyttä tai nopeusrajoitusta asiakasosoitetta kohti.
- Tämä osio ei kata säiliöiden asetuksia.

---

## Ympäristömuuttujat

| Muuttuva                             | Oletus      | Kuvaus                                                                         |
| ------------------------------------ | ----------- | ------------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`    | Käytettävä ohjain: `sqlite` tai `redis`                                        |
| `QUOTA_STORE_REDIS_URL`              | _(tyhjä)_   | Redis URL, esim `redis://localhost:6379`                                       |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`       | 0..1; `>= threshold` aktivoi tiukan tilan                                      |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`      | Tokenit, jotka selittävät enintään yhden pisteen prosenttisuunnitelmaikkunasta |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`       | 0..1; pehmeän politiikan yhdistelmäpisteiden kerroin                           |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`        | Päiviä ennen kuin GC poistaa vanhat `quota_consumption` -kauhat                |
| `QUOTA_PANEL_PORT`                   | _(unset)_   | Oma portti itsepalvelusivulle. Unset tarkoittaa, ettei kuuntelijaa ole.        |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1` | Sidososoite kyseiselle portille                                                |

DB asetukset (`quotaStore.*`) ohittaa env vars.

---

## Vianmääritys

### Redis on määritetty, mutta yhteyttä ei muodosteta

Tarkista, että `ioredis` on asennettu (`npm ls ioredis`) ja että `QUOTA_STORE_REDIS_URL`
on saavutettavissa. Jos yhteyden muodostaminen epäonnistuu, tehdas käyttää SQLitea
varajärjestelmänä (kirjataan `warn`-tasolla).

### `peek` palauttaa vanhentuneen tuloksen / sallii virhetilanteessa

Jos `peek` heittää poikkeuksen, `enforceQuotaShare` käsittelee tuloksen "sallittuna"
(virhetilanteessa salliva toiminta). Selvitä perimmäinen syy tarkistamalla `pino`-lokien
`quota:enforce`- ja `quota:factory`-merkinnät.

### Kulutuslaskurin poikkeama

Jos palveluntarjoajan todellinen käyttö poikkeaa laskureista, se on odotettua —
kahden säiliön liukuvassa ikkunassa on noin 1 %:n virhe ikkunan rajoilla, ja `consume`
suoritetaan vastauksen jälkeen asynkronisesti ilman tuloksen odottamista. Kyllästymissignaali (`saturationSignals.ts`)
lukee palveluntarjoajan todellisen käyttöasteen 30 sekunnin TTL-arvolla ja säätää `globalUsedPercent`-arvoa
sen mukaisesti.

### Poolissa näkyy kulutusnopeudelle "ei tietoja"

`computeBurnRate` edellyttää vähintään kahta historiallista näytettä. Uusissa pooleissa, joissa
`consume`-kutsuja ei ole tehty aiemmin, näkyy `tokensPerSecond: 0` ja `timeToExhaustionMs: null`.

---

## Siirtyminen localStoragesta

Kun `/dashboard/costs/quota-share` ladataan ensimmäisen kerran, koukku `useLocalStoragePoolMigration`
tarkistaa seuraavat ehdot:

1. `localStorage.getItem("omniroute:quota-share:pools")` ei ole tyhjä.
2. `GET /api/quota/pools` palauttaa arvon `[]` (tietokanta on tyhjä).

Jos molemmat ehdot täyttyvät, jokainen vanha pooli lähetetään eräajona osoitteeseen
`POST /api/quota/pools`, minkä jälkeen localStorage-avain poistetaan. Siirtyminen on idempotentti:
ehto 2 estää siirtymisen suorittamisen uudelleen.

---

## Sisäisen strategian luokittelu

`quota-share` on **vain sisäiseen käyttöön tarkoitettu** reititysstrategia (`INTERNAL_ROUTING_STRATEGY_VALUES`
tiedostossa `src/shared/constants/routingStrategies.ts`). Sitä käyttävät yksinomaan järjestelmän
luomat `qtSd/`-pooliyhdistelmät, ja se on tarkoituksella jätetty pois `ROUTING_STRATEGY_VALUES`-arvoista,
jotta se ei koskaan näy käyttäjän valittavissa olevana vaihtoehtona käyttöliittymässä tai API:ssa.

---

## Testin kattavuus

Kaksi kerrosta automatisoitua peittoa toimitetaan kiintiönjakomoottorin kanssa:

| Sviitti             | Komento                                                                | Mitä se kattaa                                                                                                                                                                                                              |
| :------------------ | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yksikkö (29 testiä) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR -ajastin, kyllästysportti, samanaikaisuuden ylärajat, fairShare matematiikka, ruuhkajono                                                                                                                                |
| Integrointimatriisi | `npm run test:combo:matrix`                                            | Päästä päähän -reitityspäätös todellisen yhdistelmäputkilinjan kautta; DRR oikeudenmukaisuus + kyllästymisen priorisointi livesaumojen kautta (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integraatiomatriisi toimii CI ssa kaikkien 22 julkisen strategian rinnalla. Yksikkösarjaa voidaan käyttää itsenäisesti.

---

## DB Schema yhteenveto

Kolme taulukkoa, jotka on lisätty siirroilla `078`, `079` ja `085`:

- `quota_pools` + `quota_allocations` — poolin määritelmät ja avainkohtaiset allokaatiot.
- `quota_consumption` — rullaavat 2 kauhan laskurit per `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuaalisen toimittajasuunnitelman ohitukset (mitat JSON per connectionId).

Kaikki taulukot lisätty idempotentin `CREATE TABLE IF NOT EXISTS` -siirron kautta.

Suostuva lainaus lisää kolme saraketta: `quota_allocations.lending_percent` (kokonaisluku, oletusarvo 0), `quota_allocations.lending_until` (epoch millisekuntia tai `NULL` ilman määräaikaa) ja `quota_pools.borrow_mode` (oletusarvo `saturation`). Sen siirto lisää vain nämä sarakkeet eikä kirjoita olemassa olevaa riviä.

Prosenttimäärittelykirjassa lisätään `quota_percent_ledger` (yksi rivi poolia, tili- ja suunnitelmaikkunaa kohti) ja `quota_percent_ledger_tokens` (yksi tokenlaskuri poolia, tiliä ja API -avainta kohti). `src/lib/db/quotaPercentLedger.ts` lukee ja kirjoittaa niitä.
